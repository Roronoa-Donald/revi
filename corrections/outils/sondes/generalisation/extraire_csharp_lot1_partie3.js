'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

const root = path.resolve(process.argv[2]);
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const readJson = relative => JSON.parse(read(relative));
const normalize = value => value.replace(/\r\n?/g, '\n').replace(/\s+/gu, ' ').trim();
const sha = value => createHash('sha256').update(value).digest('hex');
const sources = {
  catalogue: read('server/exercises/csharp.js'),
  tests: read('tests/csharp-lot1.test.js'),
  sonde: read('corrections/outils/sondes/sondes-sept-restants.js'),
  ancienBanc: read('corrections/outils/sondes/generalisation/cas.json'),
  anciennesFixtures: read('corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/csharp.json'),
};
const catalogue = require(path.join(root, 'server/exercises/csharp.js'));
const { isGradingSuspended } = require(path.join(root, 'server/exercises/grading-policy.js'));
const fixtures = readJson('corrections/outils/sondes/generalisation/cas_csharp_lot1_partie3.json').exercices;
const anciennesFixtures = JSON.parse(sources.anciennesFixtures);
const complement = readJson('corrections/resultats/generalisation-lot1-partie2-complement.json');
const anciensCasGeneralisation = JSON.parse(sources.ancienBanc).exercices.filter(entry => entry.id.startsWith('csb2-'));

const debuts = [...sources.tests.matchAll(/\bconst\s+witnesses\s*=\s*\{/g)];
if (debuts.length !== 1) throw new Error('Déclaration des témoins historiques ambiguë');
const debut = debuts[0].index;
const fin = /\n[ \t]*};[ \t]*(?:\n|$)/.exec(sources.tests.slice(debut));
if (!fin) throw new Error('Fin des témoins historiques introuvable');
const apres = debut + fin.index + fin[0].length;
const profil = sha(sources.tests.slice(0, debut) + '\n<bloc_dynamique>\n' + sources.tests.slice(apres));
const profilsReconnus = new Set([
  '41645e2fcc51c42afcd4bb213789dc4b8ab81165ceea96416db3384f132c446a',
  '4cbce6b42338a95594cde90372a3458610ab66dd2122a2aa21e6c31447a19817'
]);
if (!profilsReconnus.has(profil)) throw new Error('Profil des tests historiques modifié ; revue manuelle nécessaire');
const temoins = JSON.parse(new vm.Script(sources.tests.slice(debut, apres) + '\nJSON.stringify(witnesses);')
  .runInNewContext(Object.create(null), { timeout: 2000 }));

const ids = catalogue.map(exercise => exercise.id).sort();
if (catalogue.length !== 18 || JSON.stringify(ids) !== JSON.stringify(Object.keys(temoins).sort()) ||
    JSON.stringify(ids) !== JSON.stringify(Object.keys(anciennesFixtures).sort())) {
  throw new Error('Inventaire des exercices ou des témoins historiques incomplet');
}
const suspendus = complement.exercices.filter(exercise => exercise.course === 'csharp' &&
  exercise.etat === 'non évalué' && exercise.controles?.temoin_manuel?.nombre === 1 &&
  exercise.controles?.temoin_manuel?.etat === 'réussi').map(exercise => exercise.id).sort();
if (suspendus.length !== 17 || JSON.stringify(suspendus) !== JSON.stringify(fixtures.map(item => item.id).sort())) {
  throw new Error('Périmètre des 17 exercices suspendus incohérent avec le complément');
}
if (!isGradingSuspended('csharp')) throw new Error('La suspension de la notation C# a changé');

const connus = [];
const historiques = {};
for (const exercise of catalogue) {
  const captures = [];
  for (const [origine, elements] of [['exemple', exercise.examples], ['test', exercise.tests]]) {
    for (const [index, sample] of elements.entries()) {
      if (typeof sample.stdin !== 'string' || typeof sample.expected !== 'string') throw new Error('Cas catalogue incomplet');
      captures.push({ origine, index: index + 1, label: sample.label || sample.note || '', ...sample });
    }
  }
  for (const [origine, sample] of [['temoin_tests', temoins[exercise.id]], ['fixture_partie2', anciennesFixtures[exercise.id]]]) {
    if (!sample || typeof sample.stdin !== 'string' || typeof sample.expected !== 'string') throw new Error('Témoin historique incomplet');
    captures.push({ origine, index: 1, ...sample });
  }
  historiques[exercise.id] = captures;
  for (const sample of captures) connus.push({ id: exercise.id, ...sample });
}
for (const definition of anciensCasGeneralisation) {
  for (const [index, sample] of definition.cas.entries()) {
    connus.push({ id: definition.id, origine: 'generalisation_precedente', index: index + 1, stdin: sample.entree });
  }
}

function chainesLitterales(source) {
  const values = [];
  const expression = /'(?:\\[\s\S]|[^'\\\r\n])*'|"(?:\\[\s\S]|[^"\\\r\n])*"|`(?:\\[\s\S]|[^`\\])*`/g;
  for (const match of source.matchAll(expression)) {
    if (match[0][0] === '`' && match[0].includes('${')) continue;
    try {
      const value = new vm.Script(match[0]).runInNewContext(Object.create(null), { timeout: 50 });
      if (typeof value === 'string') values.push(normalize(value));
    } catch {}
  }
  return values;
}

const litteraux = Object.fromEntries(Object.entries(sources).map(([nom, source]) => [nom, chainesLitterales(source)]));
const casNouveaux = fixtures.flatMap(definition => [
  ...definition.cas.map((sample, index) => ({ id: definition.id, type: 'principal', index: index + 1, stdin: sample.entree })),
  ...(definition.sondes_conditionnelles || []).map((sample, index) => ({
    id: definition.id, type: 'conditionnel', index: index + 1, stdin: sample.entree,
  })),
]);
const exercices = fixtures.map(definition => {
  const exercise = catalogue.find(item => item.id === definition.id);
  if (!exercise || exercise.language !== 'csharp' || typeof exercise.solution !== 'string' ||
      definition.source !== 'csharp.js' || definition.oracle !== definition.id ||
      definition.codec !== 'lignes' || definition.cas.length !== 2) throw new Error('Définition C# invalide');
  function controlerNouveaute(sample, index, type) {
    if (typeof sample.entree !== 'string' || typeof sample.attendu !== 'string' ||
        typeof sample.raison !== 'string' || !sample.raison.trim()) throw new Error('Cas ou justification incomplet');
    const canonical = normalize(sample.entree);
    const doublons = connus.filter(item => normalize(item.stdin) === canonical)
      .map(({ id, origine, index: numero }) => ({ id, origine, index: numero }));
    const autres = casNouveaux.filter(item => (item.id !== definition.id || item.index !== index + 1 || item.type !== type) &&
      normalize(item.stdin) === canonical).map(({ id, type: nature, index: numero }) => ({ id, type: nature, index: numero }));
    const variantes = [sample.entree, JSON.stringify(sample.entree).slice(1, -1),
      sample.entree.replace(/\n/g, '\\n'), Buffer.from(sample.entree, 'utf8').toString('base64')];
    const dansSources = Object.entries(sources).filter(([nom, source]) => {
      return variantes.some(variante => variante && source.includes(variante)) ||
        (canonical && (normalize(source).includes(canonical) || litteraux[nom].some(value => value.includes(canonical))));
    }).map(([nom]) => nom);
    return {
      valide: canonical.length >= 3 && doublons.length === 0 && autres.length === 0 && dansSources.length === 0,
      entree_sha256: sha(sample.entree), doublons, autres_cas_nouveaux: autres, entree_integrale_dans_sources: dansSources,
      limite: 'Égalité textuelle normalisée et représentations littérales recherchées ; ni absence de collision sémantique ni tous les encodages et générateurs ne sont démontrés.',
    };
  }
  const nouveaute = definition.cas.map((sample, index) => controlerNouveaute(sample, index, 'principal'));
  const sondesConditionnelles = (definition.sondes_conditionnelles || []).map((sample, index) => {
    if (typeof sample.hypothese !== 'string' || !sample.hypothese.trim()) throw new Error('Hypothèse de sonde absente');
    return { ...sample, nouveaute: controlerNouveaute(sample, index, 'conditionnel') };
  });
  return {
    id: exercise.id, course: 'csharp', language: 'csharp', solution: exercise.solution,
    solution_sha256: sha(exercise.solution), cas: definition.cas, precision: definition.precision || null,
    nouveaute, sondes_conditionnelles: sondesConditionnelles, historiques: historiques[exercise.id],
  };
});

process.stdout.write(JSON.stringify({
  notation_csharp_suspendue: true,
  profil_tests: { reconnu: true, sha256: profil },
  inventaire: { catalogue: catalogue.length, suspendus: suspendus.length, cas_historiques: connus.length,
    cas_principaux: casNouveaux.filter(item => item.type === 'principal').length,
    sondes_conditionnelles: casNouveaux.filter(item => item.type === 'conditionnel').length,
    nouvelles_entrees: casNouveaux.length },
  exercices,
}));
