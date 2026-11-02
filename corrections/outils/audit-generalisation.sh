#!/usr/bin/env bash
set -u

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)
temporary_base=$(cd -- "${TMPDIR:-/tmp}" 2>/dev/null && pwd -P) || {
  printf '{"etat":"erreur_infrastructure","raison":"TMPDIR inaccessible","code_sortie":2}\n'
  exit 2
}
if [[ "$temporary_base/" == "$root/"* ]]; then
  printf '{"etat":"erreur_infrastructure","raison":"TMPDIR dans le dépôt interdit","code_sortie":2}\n'
  exit 2
fi
temporary=$(mktemp -d "$temporary_base/revi-generalisation.XXXXXXXX") || {
  printf '{"etat":"erreur_infrastructure","raison":"Création temporaire impossible","code_sortie":2}\n'
  exit 2
}
manual_temporary=$(mktemp -d /tmp/revi-generalisation-manuel.XXXXXXXX) || {
  rm -rf -- "$temporary"
  printf '{"etat":"erreur_infrastructure","raison":"Création temporaire impossible","code_sortie":2}\n'
  exit 2
}
trap 'rm -rf -- "$temporary" "$manual_temporary"' EXIT

bash "$root/corrections/outils/sondes/generalisation/rejouer.sh" --repo "$root" > "$temporary/programmes.json"
programmes_status=$?
bash "$root/corrections/outils/audit-sql-isole.sh" sql-generalisation > "$temporary/sql.json"
sql_status=$?
bash "$root/corrections/outils/audit-sql-isole.sh" sql-b1-fresh > "$temporary/sql-b1.json" 2> "$temporary/sql-b1.stderr"
sql_b1_status=$?
REVI_OUTDIR="$manual_temporary" bash "$root/corrections/outils/sondes/nouvelles-fixtures-suspendus/rejouer.sh" "$root" > "$temporary/manuels.stdout" 2> "$temporary/manuels.stderr"
manual_status=$?

node - "$temporary/programmes.json" "$temporary/sql.json" "$programmes_status" "$sql_status" "$root/corrections/outils/sondes/generalisation/cas.json" "$root/corrections/outils/sondes/generalisation/cas_algo.json" "$temporary/sql-b1.json" "$sql_b1_status" "$root/corrections/outils/sondes/sql-b1-generalisation/exploiter.js" "$temporary/sql-b1.stderr" "$manual_temporary" "$manual_status" "$root/corrections/outils/sondes/nouvelles-fixtures-suspendus/exploiter.js" <<'NODE'
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
let b1 = null;
try {
  const { ids: b1Ids, exploiter } = require(process.argv[10]);
  let b1Raw = null;
  let b1ReadError = '';
  try {
    b1Raw = JSON.parse(fs.readFileSync(process.argv[8], 'utf8'));
  } catch (error) {
    const diagnostic = fs.readFileSync(process.argv[11], 'utf8').trim().slice(0, 1000);
    b1ReadError = `Rapport SQL B1 illisible${diagnostic ? ` : ${diagnostic}` : ''}`;
  }
  b1 = exploiter(b1Raw, Number(process.argv[9]), b1ReadError);
  const programmes = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const sql = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
  const programmesStatus = Number(process.argv[4]);
  const sqlStatus = Number(process.argv[5]);
  const hash = data => crypto.createHash('sha256').update(data).digest('hex');
  const readChecked = (file, expected) => {
    const contents = fs.readFileSync(file);
    if (typeof expected !== 'string' || hash(contents) !== expected) throw new Error(`Fichier du banc modifié : ${path.basename(file)}`);
    return JSON.parse(contents.toString('utf8'));
  };
  const definitions = readChecked(process.argv[6], programmes.versions?.cas_sha256);
  const extraDefinitions = readChecked(process.argv[7], programmes.versions?.cas_algo_sha256);
  const extraFiles = [
    ['cas_algo_b3_1.json', 'algo_b3_1.py'], ['cas_algo_b3_2.json', 'algo_b3_2.py'],
    ['cas_linux_b2.json', 'linux_b2.py'], ['cas_b1_linux.json', 'b1_linux.py'], ['cas_b1_git.json', 'b1_git.py'],
    ['cas_docker_b2.json', 'docker_b2.py'], ['cas_b3_linux.json', 'linux_b3.py'],
    ['cas_b3_github.json', 'b3_github.py'], ['cas_react_b2.json', 'react_b2.py'],
    ['cas_rd_winserver_complement.json', 'rd_winserver.py'], ['cas_admin_vm_complement.json', 'admin_vm.py'],
    ['cas_flask_b2.json', 'flask_b2.py'], ['cas_java_b2.json', 'java_b2.py']
  ];
  const packageDirectory = path.dirname(process.argv[6]);
  const moreDefinitions = extraFiles.flatMap(([file, oracle]) => {
    const record = programmes.versions?.paquets_supplementaires?.[file];
    if (record?.oracle !== oracle || hash(fs.readFileSync(path.join(packageDirectory, oracle))) !== record.oracle_sha256) {
      throw new Error(`Oracle du banc modifié : ${oracle}`);
    }
    return readChecked(path.join(packageDirectory, file), record.cas_sha256).exercices;
  });
  const declared = new Set([...definitions.exercices, ...extraDefinitions.exercices, ...moreDefinitions].map(item => item.id));
  if (![0, 1].includes(programmesStatus) || ![0, 1].includes(sqlStatus) ||
      programmes.code_sortie !== programmesStatus || !Array.isArray(programmes.exercices) ||
      !Array.isArray(sql.cases) || !sql.summary || !sql.sourcesUnchangedDuringRun ||
      sql.summary.exercises !== 36 || sql.summary.scenarios !== sql.cases.length ||
      (sqlStatus === 0) !== (sql.summary.failed === 0 && sql.summary.failedChecks === 0)) {
    throw new Error('Rapport incomplet ou échec d’infrastructure');
  }
  const manualDirectories = fs.readdirSync(process.argv[12], { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^revi-inedits-[A-Za-z0-9]+$/.test(entry.name));
  if (manualDirectories.length !== 1) throw new Error('Rapport des témoins manuels introuvable');
  const manualReport = JSON.parse(fs.readFileSync(path.join(process.argv[12], manualDirectories[0].name, 'rapport.json'), 'utf8'));
  const { exploiter: exploiterManuels } = require(process.argv[14]);
  const manual = exploiterManuels(manualReport, Number(process.argv[13]), programmes.exercices);
  const groups = new Map();
  for (const item of sql.cases) {
    if (!groups.has(item.id)) groups.set(item.id, []);
    groups.get(item.id).push(item);
  }
  if (groups.size !== sql.summary.exercises) throw new Error('Nombre de fiches SQL incohérent');
  const catalogueB1 = programmes.exercices.filter(item => item.course === 'b1-sql');
  if (catalogueB1.length !== b1Ids.length || catalogueB1.some(item => item.language !== 'sql') ||
      b1Ids.some(id => catalogueB1.filter(item => item.id === id).length !== 1)) {
    throw new Error('Catalogue SQL B1 incohérent');
  }
  const b1Groups = new Map(b1.exercices.map(item => [item.id, item]));
  const counts = { 'réussi': 0, 'échoué': 0, 'non évalué': 0 };
  const exercises = programmes.exercices.map(item => {
    const probes = groups.get(item.id) || [];
    const b1Probe = b1Groups.get(item.id);
    const sqlState = b1Probe ? b1Probe.etat :
      probes.length < 2 ? 'non évalué' : probes.every(probe => probe.passed) ? 'réussi' : 'échoué';
    let state = item.etat === 'échoué' || sqlState === 'échoué' ? 'échoué' :
      declared.has(item.id) && item.etat !== 'réussi' ? 'non évalué' :
      item.etat === 'réussi' || sqlState === 'réussi' ? 'réussi' : 'non évalué';
    if (b1Probe && b1Probe.etat !== 'réussi' && state === 'réussi') state = 'non évalué';
    const manualCheck = manual.rows[item.id] || null;
    if (manualCheck?.etat === 'échoué') state = 'échoué';
    if (manualCheck?.etat === 'non évalué' && state === 'réussi') state = 'non évalué';
    counts[state]++;
    const sqlControl = b1Probe ? {
      etat: b1Probe.etat, raison: b1Probe.raison, scenarios: b1Probe.scenarios,
      jeux_prevus: b1Probe.jeux_prevus, tests_observes: b1Probe.tests_observes,
      base_initiale_deja_connue: b1Probe.base_initiale_deja_connue, nom_test: b1Probe.nom_test,
      banc: b1.fichier
    } : {
      etat: sqlState, scenarios: probes.length,
      base_initiale_deja_connue: probes.some(probe => probe.initialNovelty === 'exception-creation-base-vide')
    };
    return {
      id: item.id, course: item.course, language: item.language, etat: state,
      controles: {
        programmes: { etat: item.etat, raison: item.raison },
        sql: sqlControl,
        temoin_manuel: manualCheck
      }
    };
  });
  if (exercises.length !== programmes.catalogue || new Set(exercises.map(item => item.id)).size !== exercises.length ||
      [...groups.keys()].some(id => !exercises.some(item => item.id === id))) {
    throw new Error('Catalogue incohérent');
  }
  const auxiliaryProblem = b1.tests_auxiliaires.some(item => item.etat !== 'réussi');
  const manualOnly = exercises.filter(item => item.etat === 'non évalué' && item.controles.temoin_manuel?.etat === 'réussi').length;
  const status = b1.infrastructure ? 2 :
    counts['échoué'] || counts['non évalué'] || auxiliaryProblem || b1.anomalies.length || Number(process.argv[13]) !== 0 ? 1 : 0;
  console.log(JSON.stringify({
    catalogue: programmes.catalogue, etats: counts, code_sortie: status,
    temoins_manuels: { conformes: manual.counts.conforme || 0, nouveaux_litteralement: manual.novel,
      un_seul_sans_deux_jeux_prouves: manualOnly },
    limites: [
      'Une réussite porte uniquement sur les cas exécutés et ne prouve pas une correction universelle ni l’absence de mémorisation.',
      'Les 72 témoins manuels sont limités chacun à une nouvelle entrée littérale et à un attendu tiré de l’énoncé, sans oracle paramétrique indépendant ; seuls ils ne suffisent pas au statut réussi.',
      'En SQL B1, sq-c2-e1 et sq-c2-e2 utilisent une base initiale vide déjà connue ; les contrôles ultérieurs sont nouveaux.',
      'Trois exercices SQL B2 de création utilisent une base initiale déjà connue et de nouvelles sondes après création ; le détail signale cette exception.',
      'Le banc SQL B1 utilise deux jeux fixes et sql.js ; ses échecs ne précisent pas forcément combien de jeux ont été exécutés.',
      'La limite du sous-rapport programmes sur SQL B1 concerne ce sous-banc, pas le présent rapport agrégé.',
      'Les bancs copient leurs sources séparément et séquentiellement ; leurs copies ne constituent pas un instantané atomique.',
      'Le rapport et les sources des bancs peuvent révéler les cas et résultats ; ils ne garantissent pas leur confidentialité.',
      'Le contrôle des domaines finis reste distinct des cas nominaux inédits.',
      'Les grilles d’analyse et les autres fiches sans oracle paramétrique indépendant restent non évaluées.'
    ],
    programmes, sql, sql_b1: b1, manuels: manualReport, exercices: exercises
  }, null, 2));
  process.exitCode = status;
} catch (error) {
  console.log(JSON.stringify({ etat: 'erreur_infrastructure', raison: error.message, code_sortie: 2, ...(b1 ? { sql_b1: b1 } : {}) }));
  process.exitCode = 2;
}
NODE
