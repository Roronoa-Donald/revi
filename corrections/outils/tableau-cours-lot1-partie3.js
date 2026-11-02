'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { COURSES } = require('../../server/courses');
const { listExercises } = require('../../server/exercises');
const { isGradingSuspended } = require('../../server/exercises/grading-policy');

const root = path.resolve(__dirname, '../..');
const results = path.join(root, 'corrections/resultats');
const readJson = name => JSON.parse(fs.readFileSync(path.join(results, name), 'utf8'));
const digest = relative => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, relative))).digest('hex');
const sourceMatches = (relative, expected) => {
  try { return typeof expected === 'string' && digest(relative.replace(/^\/project\//, '')) === expected; }
  catch { return false; }
};
const combinedSourcesMatch = (origins, expected) => {
  try {
    const contents = [...new Set(origins)].sort().map(origin =>
      fs.readFileSync(path.join(root, 'server/exercises', origin), 'utf8'));
    return contents.length > 0 && crypto.createHash('sha256').update(contents.join('\n')).digest('hex') === expected;
  } catch { return false; }
};
const allSourcesMatch = hashes => Object.entries(hashes || {}).length > 0 &&
  Object.entries(hashes).every(([relative, expected]) => sourceMatches(relative, expected));
const asList = values => Array.isArray(values) ? values : Object.entries(values || {}).map(([id, value]) => ({ id, ...value }));
const notices = [];
const provenMutants = new Map();

function addCurrent(id, source) {
  if (!provenMutants.has(id)) provenMutants.set(id, []);
  provenMutants.get(id).push(source);
}

const matrixFile = 'matrice-suspendus-lot1-partie3.json';
const matrix = readJson(matrixFile);
if (matrix.etat === 'complet' && allSourcesMatch(matrix.provenance?.fichiers_sha256)) {
  for (const exercise of matrix.exercices) {
    if (exercise.corrige.conforme_sur_tous_les_cas &&
        exercise.variantes.filter(variant => variant.verdict === 'rejet_mauvaise_sortie').length >= 2) {
      addCurrent(exercise.id, matrixFile);
    }
  }
} else notices.push(`${matrixFile} : rapport incomplet ou empreintes non concordantes.`);

const sqlFile = 'variantes-sql-b2b3-final-lot1-partie3.json';
const sql = readJson(sqlFile);
if (sql.sources_stables && allSourcesMatch(sql.empreintes_sources)) {
  for (const exercise of sql.exercices) {
    if (exercise.reference_independante === 'conforme' && exercise.reference_correcteur === 'acceptee' &&
        exercise.variantes.filter(variant => variant.preuve && variant.oracle === 'rejetee' &&
          variant.correcteur === 'rejetee').length >= 2) addCurrent(exercise.id, sqlFile);
  }
} else notices.push(`${sqlFile} : sources modifiées ou empreintes non concordantes.`);

const linuxFile = 'b1-linux-variantes-final-lot1-partie3.json';
const linux = readJson(linuxFile);
if (linux.sources_stables && allSourcesMatch(linux.empreintes_sources)) {
  for (const exercise of linux.exercices) {
    if (exercise.variantes.filter(variant => variant.tests_actifs.etat === 'rejetee' &&
      variant.temoins_inedits.etat === 'rejetee').length >= 2) addCurrent(exercise.id, linuxFile);
  }
} else notices.push(`${linuxFile} : sources modifiées ou empreintes non concordantes.`);

for (const name of ['b1-git-integre-lot1-partie3.json', 'react-b2-lot1-partie3.json']) {
  const report = readJson(name);
  for (const exercise of asList(report.exercices)) {
    const source = exercise.generalisation;
    if (!combinedSourcesMatch(source.modules_source, source.empreinte_source)) {
      notices.push(`${name}, ${exercise.id} : source modifiée.`);
      continue;
    }
    if (exercise.variantes.filter(variant => variant.correcteur.etat === 'rejeté' &&
      (variant.erreur_etablie === true || variant.temoins.some(witness => witness.etat_comparaison === 'incorrect'))).length >= 2) {
      addCurrent(exercise.id, name);
    }
  }
}

for (const name of ['rd_winserver-lot1-partie3-integre.json', 'admin-vm-integre-lot1-partie3.json']) {
  const report = readJson(name);
  for (const exercise of asList(report.exercices)) {
    const matches = exercise.origines ? combinedSourcesMatch(exercise.origines, exercise.source_sha256) :
      sourceMatches(`server/exercises/${exercise.source}`, exercise.source_sha256);
    if (!matches) {
      notices.push(`${name}, ${exercise.id} : source modifiée.`);
      continue;
    }
    const rejected = exercise.candidats.filter(candidate =>
      candidate.actifs?.etat === 'rejeté : mauvaise sortie' ||
      (candidate.nature === 'variante' && candidate.actifs?.etat === 'rejeté' &&
       candidate.actifs.stop?.reason === 'wrong_output'));
    if (rejected.length >= 2) addCurrent(exercise.id, name);
  }
}

const flaskFile = 'flask-variantes-finies-lot1-partie3.json';
const flask = readJson(flaskFile);
if (flask.etat === 'réussi' && flask.sources_stables && allSourcesMatch(flask.empreintes_sources) &&
    flask.huit_scenarios_specifies_conformes && flask.corrige_accepte_par_correcteur &&
    flask.variantes.filter(variant => variant.reussi).length >= 2) addCurrent(flask.id, flaskFile);
else notices.push(`${flaskFile} : preuve incomplète ou empreintes non concordantes.`);

const inventoryLines = fs.readFileSync(path.join(results, 'inventaire-couverture-lot1-partie2.tsv'), 'utf8').trimEnd().split('\n');
const inventoryHeaders = inventoryLines.shift().split('\t');
const inventory = new Map(inventoryLines.map(line => {
  const fields = line.split('\t');
  const record = Object.fromEntries(inventoryHeaders.map((header, index) => [header, fields[index]]));
  return [record.identifiant, record];
}));
const audit = readJson('audit-integrite-final-lot1-partie3.json');
const generalisation = new Map(audit.generalisation.exercices.map(exercise => [exercise.id, exercise]));
const csharpFile = 'generalisation-csharp-final-lot1-partie3.json';
const csharp = readJson(csharpFile);
const csharpCurrent = allSourcesMatch(csharp.sources_sha256) && csharp.sources_modifiees_apres_copie.length === 0;
if (!csharpCurrent) notices.push(`${csharpFile} : sources modifiées ou empreintes non concordantes.`);

const exercises = listExercises();
if (exercises.length !== 1250 || Object.keys(COURSES).length !== 71 ||
    exercises.filter(exercise => exercise.language === 'analyse').length !== 830 ||
    generalisation.size !== exercises.length) throw new Error('Périmètre changé : revue nécessaire.');

const rows = [];
for (const exercise of exercises) {
  const entry = generalisation.get(exercise.id);
  if (!entry || entry.course !== exercise.course || entry.language !== exercise.language) {
    throw new Error(`Fiche absente ou différente du banc : ${exercise.id}`);
  }
  const analysis = exercise.language === 'analyse';
  const knownSqlBase = Boolean(entry.controles.sql.base_initiale_deja_connue);
  let fresh = !analysis && entry.etat === 'réussi' && !knownSqlBase;
  let origin = !analysis && entry.etat === 'réussi' ? 'banc commun' : '';
  let finite = false;
  const cs = csharp.exercices[exercise.id];
  if (!fresh && csharpCurrent && cs && cs.cas.length === 2 && cs.cas.every(sample =>
    sample.nouveaute.valide && sample.reference_verifiee && sample.corrige.etat === 'conforme')) {
    fresh = true;
    origin = 'banc C# complémentaire';
    finite = cs.domaine_fini_ou_atomique_deja_couvert === true;
  }
  const current = provenMutants.get(exercise.id) || [];
  const historical = !analysis && !current.length &&
    Number(inventory.get(exercise.id)?.rejets_recents_attribues_au_moins || 0) >= 2;
  rows.push({ id: exercise.id, course: exercise.course, language: exercise.language, analysis,
    fresh, origin, finite, knownSqlBase, current, historical });
}

const tsv = ['cours\tidentifiant\tlangage\tdeux_entrees_inedites\tprovenance_temoins\tlimite_domaine_fini\tbase_sql_deja_connue\tdeux_variantes_actuelles\tpreuves_variantes_actuelles\tdeux_variantes_historiques\tgrille_formative\tsuspension'];
for (const row of rows.sort((left, right) => left.course.localeCompare(right.course, 'fr') || left.id.localeCompare(right.id, 'fr'))) {
  tsv.push([row.course, row.id, row.language, row.analysis ? 'sans objet' : row.fresh ? 'oui' : 'non établi',
    row.origin, row.finite ? 'oui' : '', row.knownSqlBase ? 'oui' : '',
    row.analysis ? 'sans objet' : row.current.length ? 'oui' : 'non établi', row.current.join('|'),
    row.historical ? 'oui' : '', row.analysis ? 'oui' : 'sans objet',
    isGradingSuspended(row.course) ? 'maintenue' : 'non suspendue'].join('\t'));
}

const lines = [
  '# Lot 1, partie 3 — tableau des 71 cours', '',
  'État local au 30 octobre 2026 ; ce tableau ne lance pas le lot 2. Une ligne par fiche, ses provenances et les limites figurent dans `resultats/etat-exercices-lot1-partie3.tsv`.', '',
  'La colonne « entrées inédites » compte deux entrées nominalement distinctes exécutées avec une référence indépendante. Elle ne prouve ni toutes les classes sémantiques ni l’absence de mémorisation. Les sondes SQL notées † réemploient une base initiale connue : elles ne sont pas comptées comme deux entrées initiales inédites, malgré leurs contrôles nouveaux.', '',
  'Pour les variantes, **A** compte les fiches avec deux variantes rejetées dans une preuve dont les sources contrôlées concordent avec les fichiers actuels ; **H** ajoute des fiches dont les deux rejets sont seulement attribués par l’inventaire de la partie 2. H est historique et ne suffit pas à attester la version actuelle. Les grilles ne sont pas comptées comme code.', '',
  'La mention Formative et la projection sans champ `expected` ont été contrôlées sur les 830 grilles ; cela ne garantit pas que le texte ne permette jamais de déduire ou de retrouver une réponse.', '',
  '| Niveau | Cours | Code | Deux entrées inédites | Deux variantes A + H | Grilles Formative | Notation |',
  '| --- | --- | ---: | ---: | ---: | ---: | --- |'
];

const order = { b1: 1, b2: 2, b3: 3 };
const courses = Object.entries(COURSES).sort(([leftId, left], [rightId, right]) =>
  (order[left.level] || 9) - (order[right.level] || 9) || leftId.localeCompare(rightId, 'fr'));
for (const [id, course] of courses) {
  const group = rows.filter(row => row.course === id);
  const code = group.filter(row => !row.analysis);
  const analyses = group.filter(row => row.analysis);
  const fresh = code.filter(row => row.fresh).length;
  const current = code.filter(row => row.current.length).length;
  const historical = code.filter(row => row.historical).length;
  const flags = (code.some(row => row.finite) ? '*' : '') + (code.some(row => row.knownSqlBase) ? '†' : '');
  const status = isGradingSuspended(id) ? 'suspension maintenue' : code.length ? 'code actif, non suspendu' :
    analyses.length ? 'formative uniquement' : 'aucun exercice du catalogue';
  lines.push(`| ${(course.level || 'service').toUpperCase()} | \`${id}\` | ${code.length} | ${code.length ? `${fresh}/${code.length}${flags}` : '—'} | ${code.length ? `${current} + ${historical}/${code.length}` : '—'} | ${analyses.length ? `${analyses.length}/${analyses.length}` : '—'} | ${status} |`);
}

const pending = rows.filter(row => !row.analysis && !row.fresh);
const finite = rows.filter(row => row.finite);
const exceptions = rows.filter(row => row.knownSqlBase);
lines.push('', `**Périmètre :** ${rows.filter(row => !row.analysis).length} fiches de code, ${rows.filter(row => row.analysis).length} grilles. ${rows.filter(row => row.fresh).length} fiches de code ont deux entrées nominalement inédites ; ${pending.length} restent sans cette preuve.`, '',
  `**Sans deux entrées initiales inédites établies :** ${pending.map(row => `\`${row.id}\``).join(', ') || 'aucun'}.`, '',
  `**Domaine fini (\`*\`).** C# : ${finite.map(row => `\`${row.id}\``).join(', ')} ont deux entrées littéralement nouvelles mais leurs domaines atomiques sont déjà couverts ; l’indépendance de nouvelles catégories n’est pas démontrée.`, '',
  `**†** Base SQL initiale déjà connue : ${exceptions.map(row => `\`${row.id}\``).join(', ') || 'voir le rapport SQL'}.`, '',
  'Les deux divergences C# sur des formats dont l’admissibilité reste à préciser sont détaillées dans `resultats/generalisation-csharp-final-lot1-partie3.json`. La suspension des sept cours n’a pas été levée. Les cours déjà actifs restent actifs : ce tableau ne prononce pas de validation générale de leurs contenus.', '',
  '## Provenance et limites', '',
  '- Généralisation : `resultats/audit-integrite-final-lot1-partie3.json` et, séparément, le banc C# complémentaire. Les copies des différents sous-bancs sont séquentielles, non atomiques.',
  '- Variantes A : matrice suspendue actuelle, variantes SQL B2/B3, et bancs B1 Linux, B1 Git, React, Windows Server, VM et Flask ; noms exacts et empreintes contrôlées par fiche dans le TSV.',
  '- Variantes H : `resultats/inventaire-couverture-lot1-partie2.tsv`, uniquement les rejets récents attribués directement à la fiche ; les agrégats reconstitués ne sont pas comptés.',
  '- Grilles : `resultats/tests-cibles-ultimes-lot1-partie3.txt`. La relecture humaine de `resultats/echantillon-grilles-5pourcent-lot1-partie3.md` reste à effectuer.',
  '- Un résultat non établi ne signifie pas que la fiche est nécessairement incorrecte ; il indique que le critère n’est pas prouvé par les éléments retenus ici.'
);
if (notices.length) lines.push('', '**Réserves de provenance :**', ...notices.map(notice => `- ${notice}`));

fs.writeFileSync(path.join(results, 'etat-exercices-lot1-partie3.tsv'), `${tsv.join('\n')}\n`);
fs.writeFileSync(path.join(root, 'corrections/tableau-cours-lot1-partie3.md'), `${lines.join('\n')}\n`);
console.log(`${courses.length} cours, ${rows.length} fiches ; ${pending.length} fiches de code sans paire d'entrées inédite.`);
console.log(`${provenMutants.size} fiches avec deux variantes actives prouvées ; ${notices.length} réserve(s) de provenance.`);
