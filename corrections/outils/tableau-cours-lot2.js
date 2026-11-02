'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { COURSES } = require('../../server/courses');
const { getExercise, listExercises, toClient } = require('../../server/exercises');
const { isGradingSuspended } = require('../../server/exercises/grading-policy');
const engine = require('../../assets/js/engines/sql-wasm-engine');
const { comparableStimulus, witnessVisibleInProjection } = require('./sondes/couverture/stimuli');

const root = path.resolve(__dirname, '../..');
const results = path.join(root, 'corrections/resultats');
const read = name => fs.readFileSync(path.join(results, name), 'utf8');
const json = name => JSON.parse(read(name));
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const digest = name => hash(fs.readFileSync(path.join(root, name)));
const safePath = name => {
  const relative = name.replace(/^\/project\//, '');
  const resolved = path.resolve(root, relative);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) throw new Error(`Chemin hors dépôt : ${name}`);
  return resolved;
};
const sourceMatches = (name, expected) => {
  try { return /^[a-f0-9]{64}$/.test(expected) && hash(fs.readFileSync(safePath(name))) === expected; }
  catch { return false; }
};
const allSourcesMatch = sources => Object.entries(sources || {}).length > 0 &&
  Object.entries(sources).every(([name, expected]) => sourceMatches(name, expected));
const combinedSourcesMatch = (names, expected) => {
  try {
    const files = [...new Set(names)].sort().map(name => fs.readFileSync(safePath(`server/exercises/${name}`), 'utf8'));
    return files.length > 0 && hash(files.join('\n')) === expected;
  } catch { return false; }
};
const entries = values => Array.isArray(values) ? values : Object.entries(values || {}).map(([id, value]) => ({ id, ...value }));
const exitOk = name => read(name).trim() === '0';
const notices = [];
const variantProofs = new Map();
const hiddenProofs = new Map();

function add(map, id, origin) {
  if (!map.has(id)) map.set(id, []);
  if (!map.get(id).includes(origin)) map.get(id).push(origin);
}

function admissiblePair(exercise, first, second) {
  return typeof first === 'string' && typeof second === 'string' &&
    comparableStimulus(engine, exercise, first) !== comparableStimulus(engine, exercise, second) &&
    !witnessVisibleInProjection(engine, toClient, exercise, first) &&
    !witnessVisibleInProjection(engine, toClient, exercise, second);
}

const matrixName = 'lot2-matrice-suspendus-v13.json';
const matrix = json(matrixName);
if (!exitOk('lot2-matrice-suspendus-v13.exit.txt') || !exitOk('lot2-matrice-suspendus-v13-verifiee.exit.txt') ||
    matrix.etat !== 'complet' || !allSourcesMatch(matrix.provenance?.fichiers_sha256) ||
    matrix.provenance.sources_modifiees_apres_copie.length) throw new Error('Matrice suspendue sans provenance actuelle.');
for (const entry of matrix.exercices) {
  const exercise = getExercise(entry.id);
  if (!exercise || !entry.corrige.conforme_sur_tous_les_cas) throw new Error(`Référence absente : ${entry.id}`);
  const rejected = new Set(entry.variantes.filter(variant => variant.verdict === 'rejet_mauvaise_sortie').map(variant => variant.numero));
  let found = false;
  for (const pair of entry.temoins_par_paire) {
    if (pair.variantes.length !== 2 || pair.variantes.some(variant => !rejected.has(variant))) continue;
    for (const left of pair.temoins_premiere_seule) for (const right of pair.temoins_seconde_seule) {
      const first = entry.matrice.find(item => item.numero === left);
      const second = entry.matrice.find(item => item.numero === right);
      if (first?.origine !== 'test_cache' || second?.origine !== 'test_cache') continue;
      const firstInput = exercise.tests[first.indice_origine - 1]?.stdin;
      const secondInput = exercise.tests[second.indice_origine - 1]?.stdin;
      if (typeof firstInput !== 'string' || typeof secondInput !== 'string' ||
          hash(firstInput) !== first.entree_sha256 || hash(secondInput) !== second.entree_sha256) continue;
      if (admissiblePair(exercise, firstInput, secondInput)) found = true;
    }
  }
  if (!found) throw new Error(`Paire cachée non établie : ${entry.id}`);
  add(variantProofs, entry.id, matrixName);
  add(hiddenProofs, entry.id, matrixName);
}

const sqlName = 'lot2-variantes-sql-courantes.json';
const sql = json(sqlName);
if (!exitOk('lot2-variantes-sql-courantes.exit.txt') || !sql.sources_stables || !allSourcesMatch(sql.empreintes_sources)) {
  throw new Error('Banc SQL sans provenance actuelle.');
}
for (const entry of sql.exercices) {
  const exercise = getExercise(entry.id);
  if (!exercise || entry.reference_independante !== 'conforme' || entry.reference_correcteur !== 'acceptee' ||
      entry.variantes.filter(variant => variant.preuve && variant.oracle === 'rejetee' && variant.correcteur === 'rejetee').length !== 2 ||
      entry.temoins_exclusifs.length !== 2 || !admissiblePair(exercise,
        exercise.tests[entry.temoins_exclusifs[0] - 1]?.stdin, exercise.tests[entry.temoins_exclusifs[1] - 1]?.stdin)) {
    throw new Error(`Paire SQL non établie : ${entry.id}`);
  }
  add(variantProofs, entry.id, sqlName);
  add(hiddenProofs, entry.id, sqlName);
}

const algoName = 'lot2-algo-cinq-variantes.txt';
const algoText = read(algoName);
if (!exitOk('lot2-algo-cinq-variantes.exit.txt') || !read('lot2-algo-cinq-variantes.sha256').trim().split('\n').every(line => {
  const match = line.match(/^([a-f0-9]{64})\s+(.+)$/);
  return match && sourceMatches(match[2], match[1]);
})) throw new Error('Banc algorithmique sans provenance actuelle.');
for (const id of ['algo-c6-e3', 'algo-c9-e1', 'algo-c9-e2', 'algo-c9-e3', 'algo-c10-e3']) {
  const expression = new RegExp(`${id} — deux témoins cachés distincts et croisés : cas (\\d+) et (\\d+)`, 'g');
  const matches = [...algoText.matchAll(expression)];
  const exercise = getExercise(id);
  if (matches.length !== 1 || !exercise || !admissiblePair(exercise,
    exercise.tests[Number(matches[0][1]) - 1]?.stdin, exercise.tests[Number(matches[0][2]) - 1]?.stdin)) {
    throw new Error(`Paire algorithmique non établie : ${id}`);
  }
  add(variantProofs, id, algoName);
  add(hiddenProofs, id, algoName);
}

const linuxName = 'lot2-apres-oracle-linux-variantes.json';
const linux = json(linuxName);
if (linux.sources_stables && allSourcesMatch(linux.empreintes_sources)) {
  for (const entry of linux.exercices) {
    if (entry.variantes.filter(variant => variant.tests_actifs.etat === 'rejetee' &&
      variant.temoins_inedits.etat === 'rejetee').length >= 2) add(variantProofs, entry.id, linuxName);
  }
} else notices.push(`${linuxName} : provenance non concordante.`);

for (const name of ['b1-git-integre-lot1-partie3.json', 'react-b2-lot1-partie3.json']) {
  for (const entry of entries(json(name).exercices)) {
    if (!combinedSourcesMatch(entry.generalisation.modules_source, entry.generalisation.empreinte_source)) {
      notices.push(`${name}, ${entry.id} : source modifiée.`);
      continue;
    }
    if (entry.variantes.filter(variant => variant.correcteur.etat === 'rejeté' &&
      (variant.erreur_etablie === true || variant.temoins.some(witness => witness.etat_comparaison === 'incorrect'))).length >= 2) {
      add(variantProofs, entry.id, name);
    }
  }
}
for (const name of ['rd_winserver-lot1-partie3-integre.json', 'admin-vm-integre-lot1-partie3.json']) {
  for (const entry of entries(json(name).exercices)) {
    const matches = entry.origines ? combinedSourcesMatch(entry.origines, entry.source_sha256) :
      sourceMatches(`server/exercises/${entry.source}`, entry.source_sha256);
    if (!matches) {
      notices.push(`${name}, ${entry.id} : source modifiée.`);
      continue;
    }
    const rejected = entry.candidats.filter(candidate => candidate.actifs?.etat === 'rejeté : mauvaise sortie' ||
      (candidate.nature === 'variante' && candidate.actifs?.etat === 'rejeté' && candidate.actifs.stop?.reason === 'wrong_output'));
    if (rejected.length >= 2) add(variantProofs, entry.id, name);
  }
}
const flaskName = 'flask-variantes-finies-lot1-partie3.json';
const flask = json(flaskName);
if (flask.etat === 'réussi' && flask.sources_stables && allSourcesMatch(flask.empreintes_sources) &&
    flask.huit_scenarios_specifies_conformes && flask.corrige_accepte_par_correcteur &&
    flask.variantes.filter(variant => variant.reussi).length >= 2) add(variantProofs, flask.id, flaskName);
else notices.push(`${flaskName} : provenance ou preuve incomplète.`);

const historicalLines = read('etat-exercices-lot1-partie3.tsv').trimEnd().split('\n');
const headers = historicalLines.shift().split('\t');
const historical = new Map(historicalLines.map(line => {
  const fields = line.split('\t');
  const row = Object.fromEntries(headers.map((header, index) => [header, fields[index]]));
  return [row.identifiant, row];
}));
const auditName = 'lot2-finale-v13-generalisation.json';
const audit = json(auditName);
const generalisation = new Map(audit.exercices.map(entry => [entry.id, entry]));
const csharpName = 'lot2-csharp-bornes-generalisation-v13.json';
const csharp = json(csharpName);
if (!exitOk('lot2-csharp-bornes-generalisation-v13.exit.txt') || !exitOk('lot2-csharp-bornes-verification-v13.exit.txt') ||
    csharp.etat !== 'termine_sans_divergence' ||
    !allSourcesMatch(csharp.sources_sha256) || csharp.sources_modifiees_apres_copie.length ||
    !csharp.sources_stables_pendant_copie || !csharp.outils.empreintes_stables) {
  throw new Error('Banc C# sans provenance actuelle.');
}
const exercises = listExercises();
if (Object.keys(COURSES).length !== 71 || exercises.length !== 1250 ||
    historical.size !== exercises.length || generalisation.size !== exercises.length) throw new Error('Périmètre modifié.');
const rows = exercises.map(exercise => {
  const entry = generalisation.get(exercise.id);
  const old = historical.get(exercise.id);
  if (!entry || !old || entry.course !== exercise.course || entry.language !== exercise.language ||
      old.cours !== exercise.course || old.langage !== exercise.language) throw new Error(`Fiche incohérente : ${exercise.id}`);
  const analysis = exercise.language === 'analyse';
  const knownSqlBase = Boolean(entry.controles.sql.base_initiale_deja_connue);
  const supplemental = csharp.exercices[exercise.id];
  const csharpFresh = Boolean(supplemental && supplemental.cas.length === 2 && supplemental.cas.every(sample =>
    sample.nouveaute.valide && sample.reference_verifiee && sample.corrige.etat === 'conforme'));
  const fresh = !analysis && ((entry.etat === 'réussi' && !knownSqlBase) || csharpFresh);
  return {
    id: exercise.id, course: exercise.course, language: exercise.language, analysis,
    fresh, freshSource: fresh ? csharpFresh ? csharpName : auditName : '',
    finite: Boolean(csharpFresh && supplemental.domaine_fini_ou_atomique_deja_couvert), knownSqlBase,
    variants: variantProofs.get(exercise.id) || [], hidden: hiddenProofs.get(exercise.id) || [],
    historical: !analysis && !variantProofs.has(exercise.id) &&
      (old.deux_variantes_actuelles === 'oui' || old.deux_variantes_historiques === 'oui'),
    suspended: !analysis && isGradingSuspended(exercise.course, exercise.id)
  };
}).sort((left, right) => left.course.localeCompare(right.course, 'fr') || left.id.localeCompare(right.id, 'fr'));

const tsv = ['cours\tidentifiant\tlangage\tdeux_cas_nouveaux\tpreuve_cas_nouveaux\tdomaine_fini_deja_couvert\tbase_sql_initiale_connue\tdeux_caches_croises_etablis\tpreuves_caches\tdeux_variantes_etablies\tpreuves_variantes\tvariantes_historiques_seules\tgrille_formative\tsuspension'];
for (const row of rows) {
  tsv.push([row.course, row.id, row.language, row.analysis ? 'sans objet' : row.fresh ? 'oui' : 'non établi',
    row.freshSource, row.finite ? 'oui' : '', row.knownSqlBase ? 'oui' : '',
    row.analysis ? 'sans objet' : row.hidden.length ? 'oui' : 'non établi', row.hidden.join('|'),
    row.analysis ? 'sans objet' : row.variants.length ? 'oui' : 'non établi', row.variants.join('|'),
    row.historical ? 'oui' : '', row.analysis ? 'oui' : 'sans objet', row.suspended ? 'maintenue' : 'non suspendue'].join('\t'));
}
fs.writeFileSync(path.join(results, 'etat-exercices-lot2.tsv'), `${tsv.join('\n')}\n`);

const lines = [
  '# Lot 2 — état par cours au 30 octobre 2026', '',
  'Périmètre local : 71 cours, 420 fiches de code et 830 grilles d’analyse. L’inventaire par fiche et les provenances sont dans `resultats/etat-exercices-lot2.tsv` ; les listes de lacunes sont dans `resultats/lacunes-couverture-lot2.md`.', '',
  '**Cas nouveaux** : corrigé exécuté sur deux entrées nominalement distinctes, comparées à une référence indépendante, dans le banc commun récent ou le banc C# complémentaire vérifié ; les sondes SQL réutilisant une base initiale connue sont exclues de ce nombre et notées †. Les domaines finis ou atomiques déjà couverts sont notés *. Ce critère ne démontre ni toutes les classes de cas ni l’absence de mémorisation.', '',
  '**Cachés croisés** : au moins deux tests cachés distincts, dont chacun rejette une variante tout en acceptant l’autre, pour une paire de variantes. Le contrôle de visibilité cherche les stimuli complets dans la projection et les exemples : il ne prouve pas un secret cryptographique. Seules les preuves sélectionnées ici sont comptées ; « non établi » n’est pas la preuve de leur absence.', '',
  '**Variantes** : deux variantes rejetées pour mauvaise sortie, avec références et empreintes vérifiées selon les bancs cités dans le TSV. H indique des preuves historiques supplémentaires non revalidées comme actuelles ; elles ne sont pas additionnées aux preuves actuelles.', '',
  '**Grilles** : le nombre indique les fiches de type analyse, non des exercices de code ; leur caractère formatif et la projection sans champ `expected` ont été testés séparément. Une réponse littérale peut néanmoins figurer dans un énoncé. Les suspensions sont lues exercice par exercice dans la politique actuelle.', '',
  '| Niveau | Cours | Code | Deux cas nouveaux | Deux cachés croisés | Deux variantes / H seul | Grilles | Notation locale |',
  '| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |'
];
const order = { b1: 1, b2: 2, b3: 3 };
const courses = Object.entries(COURSES).sort(([leftId, left], [rightId, right]) =>
  (order[left.level] || 9) - (order[right.level] || 9) || leftId.localeCompare(rightId, 'fr'));
for (const [id, course] of courses) {
  const group = rows.filter(row => row.course === id);
  const code = group.filter(row => !row.analysis);
  const grids = group.filter(row => row.analysis);
  const suspended = code.filter(row => row.suspended).length;
  const fresh = code.filter(row => row.fresh).length;
  const hidden = code.filter(row => row.hidden.length).length;
  const variants = code.filter(row => row.variants.length).length;
  const historicalOnly = code.filter(row => row.historical).length;
  const status = suspended === code.length && suspended ? `suspendue (${suspended}/${code.length})` : suspended ?
    `suspension partielle (${suspended}/${code.length})` : code.length ? `active (0/${code.length} suspendue)` :
      grids.length ? 'formative uniquement' : 'aucune fiche du catalogue';
  const flags = (code.some(row => row.finite) ? '*' : '') + (code.some(row => row.knownSqlBase) ? '†' : '');
  lines.push(`| ${(course.level || 'service').toUpperCase()} | \`${id}\` | ${code.length} | ${code.length ? `${fresh}/${code.length}${flags}` : '—'} | ${code.length ? `${hidden}/${code.length}` : '—'} | ${code.length ? `${variants}/${code.length} + ${historicalOnly} H` : '—'} | ${grids.length || '—'} | ${status} |`);
}
const code = rows.filter(row => !row.analysis);
const suspended = code.filter(row => row.suspended);
lines.push('', `**Totaux constatés sur ces preuves :** ${code.filter(row => row.fresh).length}/${code.length} fiches avec deux cas nouveaux au sens strict ; ${code.filter(row => row.hidden.length).length}/${code.length} avec une paire cachée croisée retenue ; ${code.filter(row => row.variants.length).length}/${code.length} avec deux variantes rejetées retenues.`, '',
  `**Suspension :** ${suspended.length}/${code.length} fiches ; ${suspended.filter(row => row.hidden.length && row.variants.length).length}/${suspended.length} disposent d’une paire cachée croisée et de deux variantes rejetées dans les preuves retenues. Ces preuves ne valident pas une méthode non observable ni le fournisseur distant.`, '',
  `**† Base SQL initiale connue :** ${code.filter(row => row.knownSqlBase).map(row => `\`${row.id}\``).join(', ')}. Les sondes après création peuvent être nouvelles.`, '',
  `**\* Domaine fini ou atomique déjà couvert :** ${code.filter(row => row.finite).map(row => `\`${row.id}\``).join(', ')}. Les nouvelles entrées ne démontrent pas de nouvelles catégories sémantiques.`, '',
  '**Réserves :** les bancs ont été copiés et exécutés séparément, pas depuis un instantané atomique commun ; la conformité aux empreintes n’assure pas une correction universelle. Les deux sondes C# auparavant conditionnelles sont désormais couvertes par des domaines explicités ; leurs corrigés convergent dans `resultats/lot2-csharp-bornes-generalisation-v13.json`. Les anciennes divergences sont conservées dans `resultats/lot2-csharp-cas-nouveaux.json`.');
if (notices.length) lines.push('', '**Réserves de provenance supplémentaires :**', ...notices.map(notice => `- ${notice}`));
fs.writeFileSync(path.join(root, 'corrections/tableau-cours-lot2.md'), `${lines.join('\n')}\n`);

const gaps = [
  '# Lot 2 — lacunes de couverture par exercice', '',
  'Ces listes concernent les 420 fiches de code. « Non établi » signifie que les preuves retenues ici ne satisfont pas le critère, et non que le test ou la propriété est nécessairement absent. Les 830 fiches d’analyse restent formatives et ne sont pas évaluées comme des programmes ; leurs identifiants figurent dans le TSV.', ''
];
for (const [label, selected] of [
  ['Sans deux cas nouveaux strictement établis', code.filter(row => !row.fresh)],
  ['Sans deux cas cachés croisés établis par les preuves retenues', code.filter(row => !row.hidden.length)],
  ['Sans deux variantes rejetées établies par les preuves retenues', code.filter(row => !row.variants.length)]
]) {
  gaps.push(`## ${label} — ${selected.length}`, '');
  for (const [course] of courses) {
    const group = selected.filter(row => row.course === course);
    if (group.length) gaps.push(`- \`${course}\` (${group.length}) : ${group.map(row => `\`${row.id}\``).join(', ')}.`);
  }
  gaps.push('');
}
fs.writeFileSync(path.join(results, 'lacunes-couverture-lot2.md'), `${gaps.join('\n')}\n`);
console.log(`${courses.length} cours, ${code.length} fiches de code, ${rows.length - code.length} grilles ; ${suspended.length} suspensions.`);
console.log(`Deux cas nouveaux : ${code.filter(row => row.fresh).length} ; cachés croisés : ${hiddenProofs.size} ; deux variantes : ${variantProofs.size}.`);
console.log(`Suspendus avec variantes et témoins cachés croisés : ${suspended.filter(row => row.hidden.length && row.variants.length).length}/${suspended.length}.`);
