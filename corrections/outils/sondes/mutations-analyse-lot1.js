/*
 * Banc local de variantes d'analyse, sans écriture et sans exécution de code élève.
 *
 * Usage : node corrections/outils/sondes/mutations-analyse-lot1.js [--details] [--id IDENTIFIANT]
 * Les détails contiennent les données et les sorties des tests côté serveur.
 *
 * Le même couple runTests / runAnalyse que rejouer-banc.js corrige chaque
 * référence puis les deux variantes, via la façade réelle qui valide aussi la
 * taille de la requête. Seul le langage « analyse » est admis :
 * la réponse est une chaîne de caractères, jamais du JavaScript, du shell ou
 * un autre programme à exécuter. Aucun fournisseur distant n'est appelé.
 *
 * Deux constructions sont retenues :
 * - une ligne d'un résultat individuel identifié par ses données est omise ;
 *   la seconde erreur est une confusion entre deux catégories explicitement
 *   présentes dans l'énoncé, un décompte décalé d'une unité, ou l'omission de
 *   la première ligne lorsque rien de plus précis n'est justifiable ;
 * - deux champs de résultat distincts peuvent être omis séparément si un même
 *   modèle de sortie les exige et si leurs valeurs ne sont pas des jetons de
 *   données identiques ;
 * - deux cas de classification sont confondus uniquement si leurs réponses
 *   conservent leur structure et les catégories prévues par l'énoncé ;
 * - pour quelques énoncés de calcul identifiés par leur empreinte, une formule
 *   indépendante du comparateur reconstruit l'attendu et deux erreurs précises.
 * - pour les exercices B1 d'algèbre et de statistiques listés ci-dessous,
 *   des oracles arithmétiques reconstruisent les cas de la grille visible ;
 *   l'énoncé et les indices sont figés par empreinte. Les données contrôlées
 *   doivent être reconstructibles et leurs attendus cohérents avant de retenir
 *   deux erreurs numériques distinctes. Un cas au libellé contradictoire ne
 *   sert pas aux variantes ; les écarts d'attendu sont signalés.
 *
 * Le HTML des énoncés est lu avec parse5. Les données, les sujets et les lignes
 * produites doivent se correspondre ; une sortie ambiguë, vide, JSON, un cas
 * dupliqué, une référence divergente ou une mutation hors du cas est exclu.
 * Le rejet n'est compté que si l'exécution réussit et si le correcteur retourne
 * wrong_output sur le cas visé. Une erreur d'exécution ou une mutation invalide
 * ne vaut jamais rejet. Un exercice n'est couvert que si ses deux variantes
 * distinctes sont valides et évaluées, et si sa référence est acceptée.
 *
 * Ces résultats prouvent uniquement le comportement du correcteur sur les
 * cas et les mutations indiqués. Une omission est un contrôle structurel, pas
 * une preuve de compréhension ni une validation indépendante du cours. Les
 * calculs reconstruits contrôlent les formules retenues et les données locales,
 * pas la vérité pédagogique des énoncés. Le comparateur utilise les attendus
 * existants ; aucun verdict ne dispense d'une relecture indépendante.
 * Les grilles donnent des données visibles et les tests sélectionnent des cas :
 * ce banc n'invente pas d'entrées cachées et ne prouve pas un algorithme général.
 * Le correcteur limite chaque soumission aux MAX_TESTS premiers tests.
 */
'use strict';

const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const { runTests, MAX_TESTS } = require('../../../server/exercises/runner');
const execution = require('../../../server/services/execution');
const local = require('../../../server/services/execution/local-runner');

const NUMERIC_CONTRACTS = Object.freeze({
  'al-c1-e1': 'fad7644121f16d08e938e84e4bb444e20e52abd444955d49bbe8fe1f15055b9b',
  'al-c1-e2': 'dadea59e7dad5bb885b8ca15c187c78010576fe1126c33940a0c4e90fae5c46c',
  'al-c1-e3': 'b3a2535d8a74471f86c5a13d2ece2d579f76e965f443901165bd2f4cd678ca9f',
  'al-c3-e1': 'ae25395f3b0fa1759a0d4a44595f1a857483fa92982d21772fe4b76b96709dd1',
  'st-c1-e1': '47b39e6a327c23acff02313b496eba3c436a15f064c361598a02fa74854c3580',
  'st-c1-e2': '1e50609fabb939b8a7f7e4a4d30ad13741d1976205631d653f730d3ea3df48ca',
  'st-c1-e3': '7edbfc133f0eb61a2293552db53dfd579303ddf953d78779859bf5fd4c5269eb',
  'st-c2-e1': '6bd996548cc0f75411f682d13d1b02abc2ed2723ce7fd8023c984cce553d6b5d',
  'st-c2-e3': '7fddaea0bc1b507e8154c4c12381d76160b8d1a1fc34a52c478816804262b407'
});

const B1_ARITHMETIC_CONTRACTS = Object.freeze({
  'al-c2-e1': '5ad4c1dc4c0264bf1d017f53c1350ac9b201fb6fc6185a02f6bf16212026501c',
  'al-c2-e2': '29349fff1b2dbdf3407f594438aeae894cb0f71b5c5d80293aa740268da67c24',
  'al-c3-e2': 'a4e97d6b26d432a7ca352bc1b7632d1445fca934a8089feedae4e191fad4c19c',
  'al-c3-e3': '336da20eb6e2815bbbaa329096512f344be3508e3f9d0a743f8156937af2bfda',
  'al-c4-e1': 'cc8a871b9e1de5a8bef2ead921cc32c4edf60b4a03209cf5f804fe31dba06661',
  'al-c4-e3': '42d4bd6fab0bd952b83a64f2bf16b8ee5f697fa5ec72e7d1958194bed194a3ce',
  'al-c5-e1': 'd603a5ffbea84be10d6e5478feb75c9605614a42bb5cd13de285d96b73d61822',
  'al-c6-e1': '7349e3af0a21bb80ff6acb8c9980b749ab80feef07d60962e9ef41034e7beed3',
  'al-c6-e2': '0e6c7e4ec56e65bf74b7fce972436d54267ceb1f047bc7a1b35610a1696295b1',
  'al-c6-e3': '2c34287e6456043aafbd23197149d787ecc96f572b37ff83ac954aa3871e4f46',
  'st-c2-e2': '54cbe362d7a2d9dc7e3b30e533c968307b4596cea1f9394a452199db3adcc825',
  'st-c3-e1': 'f4f494a79ff173956db2c2b7bbe74258ddcd133158dd9515e19d7fd7d3cf0fe1',
  'st-c3-e2': 'f9804bdef5d067eb7303c0398ad910325f2a201dafabfdd3f508071289eb5467',
  'st-c3-e3': '26e2ef602ba14b7ded2888e93c7613e30fbcbd1b777d420666ceb1b1b6bb19c2',
  'st-c4-e1': 'd316eab2ac1331df85daba44346ab58b6d4801e2a768ede7da725b257dec0091',
  'st-c4-e2': 'ff2bc4f99b5b9f17622246a0f773ffa0f6f67f680e25f09d192a1edcc59777e8',
  'st-c4-e3': '7f71fba9a1029c50ebab1f4d7316e68e01303f5f9bee483dfe18458ad68e85df',
  'st-c5-e1': '297da9405aaf2ddbc71e0969f410cc83e4d2c8255460ee6c7c0673083ac8329d',
  'st-c5-e2': '8fb9bb0f2b8b392fdd6cf0c61be27c469c0e02dadf13660f85dccd74f10a809e',
  'st-c5-e3': 'bd8a6966d4abe1652ca7e113ae26e9099fcb961b3b1845dd1c6d046dd8121173',
  'st-c6-e1': 'da68ad3fb79e4546ff645cb42f956471030cc153e69f30fbe3a8be387d5cc436',
  'st-c6-e2': 'c5ad187f3468f64f49361d9c61071368e87d21de5eb8b15d79fa871a641236f7',
  'st-c6-e3': 'fc3a78d9f50467f7fc1994c9706a6c05edf1e3f5eaa0215cec05e20624d32710'
});

const B1_AMBIGUITIES = Object.freeze({});

const ITEM_NOUNS = [
  'ligne', 'situation', 'actif', 'element', 'front', 'machine', 'etape', 'tache',
  'poste', 'equipement', 'article', 'code', 'entree', 'utilisateur', 'commande',
  'type', 'groupe', 'patient', 'composant', 'disque', 'fichier', 'mot', 'phrase',
  'heure', 'projet', 'chemin', 'flux', 'regle', 'requete', 'evenement', 'trame',
  'port', 'hote', 'host', 'serveur', 'vm', 'service', 'lien', 'processus', 'route',
  'codec', 'role', 'transaction', 'ressource', 'conteneur', 'vlan', 'site', 'switch',
  'message', 'paquet', 'interface', 'variable', 'event', 'domaine', 'enregistrement',
  'segment', 'operation', 'profil', 'donnee', 'module', 'formule', 'cle', 'motif',
  'compte', 'session', 'parametre', 'document', 'champ', 'certificat', 'ip',
  'application', 'test', 'cluster', 'alerte'
];
const ITEM_CLAUSE = new RegExp(`\\bpour\\s+chaque\\s+(${ITEM_NOUNS.join('|')})\\b`, 'i');
const IDENTIFIER_KEYS = [
  'id', 'name', 'nom', 'host', 'machine', 'port', 'session', 'target', 'codec',
  'resource', 'ressource', 'user', 'utilisateur', 'interface', 'vm', 'objet',
  'mat', 'project', 'service', 'client', 'to', 'from', 'alias', 'port_id'
];
const GENERIC_ITEM_UNITS = new Set(['ligne', 'situation', 'element', 'entree', 'enregistrement']);
const INPUT_UNITS = Object.freeze({
  pert_task: ['tache'], task_flow: ['tache'], backlog_item: ['element'],
  member: ['port'], path: ['chemin'], frame: ['trame', 'paquet'],
  dhcp_msg: ['message'], arp_frame: ['paquet', 'trame'], frame_qos: ['paquet', 'trame'],
  packet: ['paquet'], incoming_pkt: ['paquet'], out_pkt: ['paquet'], cert: ['certificat'],
  codec: ['codec'], session: ['session'], projet: ['projet'], item: ['element', 'article'],
  flux: ['flux'], doc: ['document'], alert: ['alerte'], access: ['utilisateur'],
  ping: ['test'], vm: ['vm']
});
const CLASSIFICATION_FIELDS = new Set(['status', 'statut', 'verdict', 'decision', 'categorie', 'category', 'etat', 'state', 'result', 'resultat', 'niveau', 'level', 'severity', 'validite']);
const OUTPUT_IDENTIFIER_FIELDS = new Set([
  ...IDENTIFIER_KEYS, 'adresse', 'ip', 'url', 'packet', 'req', 'item', 'type',
  'protocol', 'proto', 'path', 'tenant', 'resource_id', 'sensor', 'metric', 'request'
]);
const SECTION_HEADER = /^\[(?:cas\s*(\d+)|exemple)\b.*\]$/i;

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function fold(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function collapse(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function htmlEvidence(html) {
  const fragment = parse5.parseFragment(String(html || ''));
  const codes = [];
  function extract(node) {
    if (node.nodeName === '#text') return node.value;
    return (node.childNodes || []).map(extract).join(' ');
  }
  function visit(node) {
    if (node.tagName === 'code') codes.push(collapse(extract(node)));
    for (const child of node.childNodes || []) visit(child);
  }
  visit(fragment);
  const text = collapse(extract(fragment));
  const clauses = [...fold(text).matchAll(new RegExp(ITEM_CLAUSE.source, 'ig'))]
    .map(match => ({ phrase: match[0], unit: match[1], index: match.index }));
  return { text, codes, clauses, clause: clauses[0]?.phrase || null, unit: clauses[0]?.unit || null };
}

function parseSections(source, starter) {
  const lines = String(source || '').replace(/\r\n?/g, '\n').split('\n');
  const sections = new Map();
  let current = null;
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].replace(/\s+$/, '');
    const trimmed = line.trim();
    const heading = SECTION_HEADER.exec(trimmed);
    if (heading) {
      current = null;
      if (heading[1]) {
        const number = Number(heading[1]);
        if (sections.has(number)) sections.get(number).duplicate = true;
        else sections.set(number, { number, heading: trimmed, duplicate: false, rows: [], data: [] });
        current = sections.get(number);
      }
      continue;
    }
    if (!current) continue;
    if (starter) {
      const data = /^\s*#\s*Données\s*:\s*(.*?)\s*$/i.exec(line);
      if (data) current.data.push(data[1]);
    } else if (trimmed && !trimmed.startsWith('#')) {
      current.rows.push({ index, text: line });
    }
  }
  return { lines, sections };
}

function isStructuredJson(text) {
  try {
    const value = JSON.parse(text);
    return value !== null && typeof value === 'object';
  } catch {
    return false;
  }
}

function collectSamples(exercise) {
  const starter = parseSections(exercise.starter, true);
  const solution = parseSections(exercise.solution, false);
  const samples = [];
  for (const [index, entry] of (exercise.tests || []).slice(0, MAX_TESTS).entries()) {
    const selector = /^cas\s*:\s*(\d+)$/i.exec(String(entry.stdin || '').trim());
    if (!selector || typeof entry.expected !== 'string') continue;
    const number = Number(selector[1]);
    const input = starter.sections.get(number);
    const output = solution.sections.get(number);
    if (!input || !output || input.duplicate || output.duplicate || input.data.length === 0 || output.rows.length === 0) continue;
    const lines = output.rows.map(row => row.text);
    const response = execution.normalizeOutput(lines.join('\n'));
    if (!response || response !== execution.normalizeOutput(entry.expected) || /\bA_COMPLETER\b/i.test(response)) continue;
    samples.push({ index, number, stdin: entry.stdin, expected: entry.expected, heading: input.heading,
      data: input.data, rows: output.rows, lines, solutionLines: solution.lines });
  }
  return samples;
}

function wordsContain(input, label) {
  const words = collapse(fold(input)).split(' ');
  const wanted = collapse(fold(label)).split(' ');
  return words.some((word, index) => words.slice(index, index + wanted.length).join(' ') === wanted.join(' '));
}

function codeTokens(codes) {
  return new Set(codes.flatMap(code => fold(code).match(/[a-z][a-z0-9_-]*/g) || []));
}

function itemRows(sample, evidence) {
  if (!evidence.clause || isStructuredJson(sample.lines.join('\n'))) return null;
  let data = sample.data;
  if (/^\d+$/.test(data[0]) && Number(data[0]) === data.length - 1) data = data.slice(1);
  if (data.length < 2 || data.length > 40 || sample.lines.length < data.length) return null;
  const rows = [];
  for (let index = 0; index < data.length; index++) {
    const match = /^(\s*([^:]+?)\s*:\s*)(\S.*)$/.exec(sample.lines[index]);
    if (!match) return null;
    const label = collapse(match[2]);
    const ordinal = /^([a-z][a-z_-]*)\s+(\d+)$/i.exec(fold(label));
    const matchesOrdinal = ordinal && evidence.clauses.some(clause => clause.unit === ordinal[1]) && Number(ordinal[2]) === index + 1;
    if (!wordsContain(data[index], label) && !matchesOrdinal) return null;
    rows.push({ prefix: match[1], label, value: match[3], input: data[index], line: sample.lines[index], index });
  }
  if (new Set(rows.map(row => fold(row.label))).size !== rows.length) return null;
  return rows;
}

function confusionMutation(sample, rows, evidence) {
  const tokens = codeTokens(evidence.codes);
  for (let first = 0; first < rows.length; first++) {
    const left = rows[first];
    if (!/^[\p{L}][\p{L}\p{N}_-]*$/u.test(left.value) || !tokens.has(fold(left.value))) continue;
    for (let second = first + 1; second < rows.length; second++) {
      const right = rows[second];
      if (!/^[\p{L}][\p{L}\p{N}_-]*$/u.test(right.value) || !tokens.has(fold(right.value))) continue;
      if (fold(left.value) === fold(right.value)) continue;
      const lines = sample.lines.slice();
      lines[left.index] = left.prefix + right.value;
      return {
        type: 'confusion-categories',
        description: `Attribuer à « ${left.label} » la catégorie « ${right.value} » observée pour « ${right.label} ».`,
        lines,
        evidence: { input: left.input, expectedLine: left.line, replacementLine: lines[left.index], alternativeInput: right.input, alternativeLine: right.line }
      };
    }
  }
  return null;
}

function countMutation(sample, rows, evidence) {
  for (let index = rows.length; index < sample.lines.length; index++) {
    const match = /^(\s*([^:]+?)\s*:\s*)(\d+)(\s*\/\s*)(\d+)\s*$/.exec(sample.lines[index]);
    if (!match) continue;
    const label = collapse(fold(match[2]));
    const value = Number(match[3]);
    const denominator = Number(match[5]);
    if (denominator !== rows.length || value > denominator) continue;
    const template = evidence.codes.some(code => {
      const parts = fold(code).split(':');
      return parts.length === 2 && collapse(parts[0]) === label && /^\s*[xyk]\s*\/\s*n\b/.test(parts[1]);
    });
    if (!template) continue;
    const replacement = value === 0 ? value + 1 : value - 1;
    const lines = sample.lines.slice();
    lines[index] = match[1] + replacement + match[4] + match[5];
    return {
      type: 'erreur-decompte-unite',
      description: `Se tromper d'une unité dans le décompte « ${match[2]} ».`,
      lines,
      evidence: { expectedLine: sample.lines[index], replacementLine: lines[index], elements: rows.length }
    };
  }
  return null;
}

function omission(sample, rowIndex, input, label, position) {
  const lines = sample.lines.slice();
  const removed = lines.splice(rowIndex, 1)[0];
  return {
    type: `omission-${position}`,
    description: `Omettre le résultat associé à la ${position === 'dernier' ? 'dernière' : 'première'} entrée « ${label} ».`,
    lines,
    evidence: { input, omittedLine: removed, label }
  };
}

function labelledCandidate(sample, evidence) {
  const rows = itemRows(sample, evidence);
  if (!rows) return null;
  const last = rows[rows.length - 1];
  const first = rows[0];
  const second = confusionMutation(sample, rows, evidence) || countMutation(sample, rows, evidence)
    || omission(sample, first.index, first.input, first.label, 'premier');
  const rank = second.type === 'confusion-categories' ? 3 : second.type === 'erreur-decompte-unite' ? 2 : 1;
  return {
    method: 'lignes-individuelles',
    rank,
    sample,
    rule: evidence.clause,
    variants: [omission(sample, last.index, last.input, last.label, 'dernier'), second]
  };
}

function linePrefix(line) {
  const match = /^\s*([a-z][a-z0-9_-]*)/i.exec(line);
  return match ? match[1].toLowerCase() : null;
}

function fields(line) {
  const result = new Map();
  for (const match of line.matchAll(/(?:^|[\s|])([a-z][a-z0-9_-]*)\s*[=:]\s*([a-z0-9][a-z0-9_.:@/-]*)(?=$|[\s|])/gi)) {
    const key = match[1].toLowerCase();
    if (result.has(key)) result.set(key, null);
    else result.set(key, match[2]);
  }
  return result;
}

function groupByPrefix(lines) {
  const groups = new Map();
  for (const [index, line] of lines.entries()) {
    const prefix = linePrefix(line);
    if (!prefix) continue;
    if (!groups.has(prefix)) groups.set(prefix, []);
    groups.get(prefix).push({ line, index, fields: fields(line) });
  }
  return groups;
}

function outputClause(evidence, outputPrefix, inputPrefix) {
  const brief = fold(evidence.text);
  const units = INPUT_UNITS[inputPrefix] || [];
  let best = null;
  let position = brief.indexOf(outputPrefix);
  while (position !== -1) {
    for (const clause of evidence.clauses) {
      const distance = position - clause.index;
      if (distance < 0 || distance > 240 || !(GENERIC_ITEM_UNITS.has(clause.unit) || units.includes(clause.unit))) continue;
      if (!best || distance < best.distance) best = { phrase: clause.phrase, distance };
    }
    position = brief.indexOf(outputPrefix, position + outputPrefix.length);
  }
  return best ? best.phrase : null;
}

function keyedCandidate(sample, evidence) {
  if (!evidence.clause || isStructuredJson(sample.lines.join('\n'))) return null;
  const inputGroups = groupByPrefix(sample.data);
  const outputGroups = groupByPrefix(sample.lines);
  for (const [outputPrefix, outputs] of outputGroups) {
    if (outputs.length < 2) continue;
    if (outputs.some((row, index) => index > 0 && row.index !== outputs[index - 1].index + 1)) continue;
    for (const [inputPrefix, inputs] of inputGroups) {
      if (inputs.length !== outputs.length) continue;
      const clause = outputClause(evidence, outputPrefix, inputPrefix);
      if (!clause) continue;
      for (const key of IDENTIFIER_KEYS) {
        const inputValues = inputs.map(row => row.fields.get(key));
        const outputValues = outputs.map(row => row.fields.get(key));
        if (inputValues.some(value => !value) || outputValues.some(value => !value)) continue;
        if (new Set(inputValues).size !== inputs.length || new Set(outputValues).size !== outputs.length) continue;
        if (inputValues.some(value => !outputValues.includes(value))) continue;
        const first = outputs.find(row => row.fields.get(key) === inputValues[0]);
        const last = outputs.find(row => row.fields.get(key) === inputValues[inputValues.length - 1]);
        return {
          method: 'enregistrements-identifies',
          rank: 1,
          sample,
          rule: clause,
          mapping: { inputPrefix, outputPrefix, key, identifiers: inputValues },
          variants: [
            omission(sample, last.index, inputs[inputs.length - 1].line, inputValues[inputValues.length - 1], 'dernier'),
            omission(sample, first.index, inputs[0].line, inputValues[0], 'premier')
          ]
        };
      }
    }
  }
  return null;
}

function differentCases(first, second) {
  return first.stdin !== second.stdin && JSON.stringify(first.data) !== JSON.stringify(second.data);
}

function caseConfusion(first, second, firstLine, secondLine, method, rule, type) {
  function variant(sample, alternative, replacement) {
    return {
      type,
      sample,
      description: `Attribuer au ${sample.stdin} la conclusion du ${alternative.stdin}.`,
      lines: [replacement],
      evidence: {
        input: sample.data,
        expectedLine: sample.lines[0],
        replacementLine: replacement,
        alternativeCase: alternative.stdin,
        alternativeInput: alternative.data,
        alternativeLine: alternative.lines[0]
      }
    };
  }
  return {
    method,
    rank: 3.5,
    sample: first,
    rule,
    variants: [variant(first, second, firstLine), variant(second, first, secondLine)]
  };
}

function choiceCandidate(samples, evidence) {
  const codes = new Set(evidence.codes.map(code => collapse(fold(code))));
  const choices = [];
  for (const sample of samples) {
    if (sample.lines.length !== 1) continue;
    const line = sample.lines[0];
    const plain = /^\s*([\p{L}\p{M}][\p{L}\p{M} _-]{0,50})\s*$/u.exec(line);
    const labelled = /^(\s*[\p{L}\p{M}][\p{L}\p{M} _-]{0,32}\s*:\s*)([\p{L}\p{M}][\p{L}\p{M} _-]{0,50})\s*$/u.exec(line);
    const prefix = plain ? '' : labelled?.[1];
    const value = collapse(plain ? plain[1] : labelled?.[2] || '');
    if (prefix === undefined || !value || !(codes.has(fold(value)) || codes.has(collapse(fold(line))))) continue;
    choices.push({ sample, prefix, value });
  }
  for (let first = 0; first < choices.length; first++) {
    for (let second = first + 1; second < choices.length; second++) {
      const left = choices[first];
      const right = choices[second];
      if (!differentCases(left.sample, right.sample) || fold(left.value) === fold(right.value)
        || collapse(fold(left.prefix)) !== collapse(fold(right.prefix))) continue;
      return caseConfusion(left.sample, right.sample, left.prefix + right.value, right.prefix + left.value,
        'choix-categoriels', 'Deux réponses distinctes sont explicitement proposées dans l’énoncé.', 'confusion-choix-cas');
    }
  }
  return null;
}

function pairedCategoriesCandidate(samples, evidence) {
  const tokens = codeTokens(evidence.codes);
  const choices = [];
  for (const sample of samples) {
    if (sample.lines.length !== 1) continue;
    const match = /^(\s*[a-z][a-z0-9_-]*\s*:\s*)([a-z0-9_.-]+)(\s*->\s*)([a-z][a-z0-9_-]*)(\s*\|\s*)([a-z][a-z0-9_-]*)\s*$/i.exec(sample.lines[0]);
    if (!match || !tokens.has(fold(match[4])) || !tokens.has(fold(match[6]))) continue;
    if (!sample.data.some(line => line.split(/[\s=]+/).includes(match[2]))) continue;
    if (!fold(evidence.text).includes(fold(match[1].replace(':', '').trim()))) continue;
    choices.push({ sample, match });
  }
  for (let first = 0; first < choices.length; first++) {
    for (let second = first + 1; second < choices.length; second++) {
      const left = choices[first];
      const right = choices[second];
      if (!differentCases(left.sample, right.sample) || fold(left.match[1]) !== fold(right.match[1])
        || fold(left.match[4]) === fold(right.match[4]) || fold(left.match[6]) === fold(right.match[6])) continue;
      const firstLine = left.match[1] + left.match[2] + left.match[3] + right.match[4] + left.match[5] + right.match[6];
      const secondLine = right.match[1] + right.match[2] + right.match[3] + left.match[4] + right.match[5] + left.match[6];
      return caseConfusion(left.sample, right.sample, firstLine, secondLine, 'categories-couplees',
        'Chaque identifiant est conservé ; les deux catégories associées sont prises ensemble dans un autre cas et figurent dans l’énoncé.',
        'confusion-categories-couplees');
    }
  }
  return null;
}

function strictFields(line) {
  const match = /^\s*([a-z][a-z0-9_-]*):?\s+(.+?)\s*$/i.exec(line);
  if (!match) return null;
  const result = new Map();
  for (const token of match[2].split(/\s+/)) {
    const field = /^([a-z][a-z0-9_-]*)=([a-z0-9][a-z0-9_.:@/-]*)$/i.exec(token);
    if (!field || result.has(field[1].toLowerCase())) return null;
    result.set(field[1].toLowerCase(), { key: field[1], value: field[2], token });
  }
  return { prefix: match[1], fields: result };
}

function fieldChoiceCandidate(samples, evidence) {
  const tokens = codeTokens(evidence.codes);
  const choices = samples.filter(sample => sample.lines.length === 1).map(sample => ({ sample, parsed: strictFields(sample.lines[0]) }))
    .filter(choice => choice.parsed && fold(evidence.text).includes(fold(choice.parsed.prefix)));
  for (let first = 0; first < choices.length; first++) {
    for (let second = first + 1; second < choices.length; second++) {
      const left = choices[first];
      const right = choices[second];
      if (!differentCases(left.sample, right.sample) || fold(left.parsed.prefix) !== fold(right.parsed.prefix)) continue;
      const keys = [...left.parsed.fields.keys()];
      if (keys.join('\0') !== [...right.parsed.fields.keys()].join('\0')) continue;
      for (const key of keys.filter(key => CLASSIFICATION_FIELDS.has(key))) {
        const leftField = left.parsed.fields.get(key);
        const rightField = right.parsed.fields.get(key);
        if (fold(leftField.value) === fold(rightField.value) || !tokens.has(fold(leftField.value)) || !tokens.has(fold(rightField.value))) continue;
        const echoed = (choice, field) => choice.sample.data.some(line => fields(line).get(field) === choice.parsed.fields.get(field).value);
        if (keys.some(other => other !== key && (!echoed(left, other) || !echoed(right, other)))) continue;
        if (left.sample.lines[0].split(leftField.token).length !== 2 || right.sample.lines[0].split(rightField.token).length !== 2) continue;
        const firstLine = left.sample.lines[0].replace(leftField.token, `${leftField.key}=${rightField.value}`);
        const secondLine = right.sample.lines[0].replace(rightField.token, `${rightField.key}=${leftField.value}`);
        return caseConfusion(left.sample, right.sample, firstLine, secondLine, 'champ-categoriel',
          `Le champ « ${key} » est la seule conclusion non recopiée des données ; ses deux valeurs figurent dans l’énoncé.`,
          'confusion-champ-cas');
      }
    }
  }
  return null;
}

function outputFields(line) {
  const head = /^\s*([a-z][a-z0-9_-]*):?\s+(.+?)\s*$/i.exec(line);
  if (!head) return null;
  const parsed = [];
  for (const token of head[2].split(/\s+/)) {
    const field = /^([a-z][a-z0-9_-]*)=([^\s"'{}\[\]()<>]+)$/i.exec(token);
    if (!field) return null;
    parsed.push({ key: field[1].toLowerCase(), value: field[2], token });
  }
  if (new Set(parsed.map(field => field.key)).size !== parsed.length) return null;
  return { prefix: head[1], fields: parsed };
}

function escapePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function outputTemplate(evidence, output) {
  const text = fold(evidence.text);
  for (const code of evidence.codes) {
    if (!new RegExp(`^\\s*${escapePattern(output.prefix)}\\b`, 'i').test(code)
      || /[\[\]?]|facultatif|optionnel/i.test(code)) continue;
    const keys = new Set([...code.matchAll(/\b([a-z][a-z0-9_-]*)\s*=/gi)].map(match => match[1].toLowerCase()));
    if (!output.fields.every(field => keys.has(field.key))) continue;
    const content = fold(code);
    let position = text.indexOf(content);
    while (position !== -1) {
      const context = text.slice(Math.max(0, position - 220), position);
      if (/affich|indiqu|sortie|resultat|produi|retourn|gener|ecrivez/.test(context)
        && !/facultatif|optionnel/.test(context)) return code;
      position = text.indexOf(content, position + content.length);
    }
  }
  return null;
}

function removeToken(line, token) {
  const start = line.indexOf(token);
  if (start < 0 || line.indexOf(token, start + token.length) !== -1) return null;
  const before = line.slice(0, start);
  const after = line.slice(start + token.length);
  return after ? before + after.replace(/^[ \t]+/, '') : before.replace(/[ \t]+$/, '');
}

function fieldOmissionCandidate(sample, evidence) {
  if (sample.lines.length !== 1 || isStructuredJson(sample.lines[0])) return null;
  const output = outputFields(sample.lines[0]);
  if (!output || output.fields.length < 3) return null;
  const template = outputTemplate(evidence, output);
  if (!template) return null;
  const removable = output.fields.filter(field => !OUTPUT_IDENTIFIER_FIELDS.has(field.key)
    && !sample.data.some(line => line.split(/[\s=,;]+/).some(token => fold(token) === fold(field.value))));
  if (removable.length < 2) return null;
  const variants = removable.slice(-2).map(field => {
    const replacement = removeToken(sample.lines[0], field.token);
    if (!replacement) return null;
    return {
      type: 'omission-champ-requis',
      description: `Omettre le champ de résultat « ${field.key} » demandé dans le modèle de sortie.`,
      lines: [replacement],
      evidence: { input: sample.data, template, omittedField: field.key, expectedLine: sample.lines[0], replacementLine: replacement }
    };
  });
  if (variants.some(variant => !variant)) return null;
  return {
    method: 'champs-de-resultat',
    rank: 0.5,
    sample,
    rule: 'Les deux champs distincts figurent dans un même modèle de sortie et leurs valeurs ne sont pas des jetons de données identiques.',
    variants
  };
}

function integers(line) {
  if (!/^\s*[+-]?\d+(?:\s+[+-]?\d+)*\s*$/.test(line)) return null;
  const result = line.trim().split(/\s+/).map(Number);
  return result.every(value => Number.isSafeInteger(value) && Math.abs(value) <= 1000000) ? result : null;
}

function scalarLines(data) {
  const parsed = data.map(integers);
  return parsed.every(line => line && line.length === 1) ? parsed.map(line => line[0]) : null;
}

function series(data) {
  const numbers = scalarLines(data);
  if (!numbers || numbers[0] < 2 || numbers[0] !== numbers.length - 1) return null;
  return numbers.slice(1);
}

function arithmeticRows(data) {
  if (!Array.isArray(data) || !data.length || data.length > 2001) return null;
  const rows = data.map(integers);
  if (rows.some(row => !row || row.some(value => Math.abs(value) > 10000))) return null;
  return rows;
}

function sizedMatrix(rows) {
  const dimensions = rows[0];
  if (dimensions.length !== 2) return null;
  const [height, width] = dimensions;
  if (height < 1 || width < 1 || height > 8 || width > 8 || rows.length !== height + 1) return null;
  const matrix = rows.slice(1);
  return matrix.every(row => row.length === width) ? matrix : null;
}

function arithmeticSeries(rows, minimumSize = 2) {
  if (!rows.length || rows[0].length !== 1 || rows[0][0] < minimumSize || rows[0][0] > 1000
    || rows.length !== rows[0][0] + 1 || rows.slice(1).some(row => row.length !== 1)) return null;
  return rows.slice(1).map(row => row[0]);
}

function weightedSeries(rows) {
  if (!rows.length || rows[0].length !== 1 || rows[0][0] < 1 || rows[0][0] > 100
    || rows.length !== rows[0][0] + 1 || rows.slice(1).some(row => row.length !== 2 || row[1] <= 0)) return null;
  return rows.slice(1);
}

function pairedSeries(rows) {
  if (!rows.length || rows[0].length !== 1 || rows[0][0] < 2 || rows[0][0] > 1000
    || rows.length !== 1 + 2 * rows[0][0] || rows.slice(1).some(row => row.length !== 1)) return null;
  const size = rows[0][0];
  return { left: rows.slice(1, size + 1).map(row => row[0]), right: rows.slice(size + 1).map(row => row[0]) };
}

function fixedNumber(value, digits) {
  if (!Number.isFinite(value)) return null;
  const scaled = Math.abs(value) * 10 ** digits;
  if (scaled > 1e9 || Math.abs(scaled - Math.floor(scaled) - 0.5) < Math.max(1e-7, scaled * 1e-12)) return null;
  const formatted = value.toFixed(digits);
  return /^-0(?:\.0+)?$/.test(formatted) ? formatted.slice(1) : formatted;
}

function fixedValues(values, digits, oneLine = false) {
  const formatted = values.map(value => fixedNumber(value, digits));
  if (formatted.some(value => value === null)) return null;
  return oneLine ? [formatted.join(' ')] : formatted;
}

function matrixLines(matrix) {
  return matrix.map(row => row.join(' '));
}

function arithmeticVariant(type, description, lines) {
  return { type, description, lines };
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function variance(values, center = mean(values)) {
  return values.reduce((sum, value) => sum + (value - center) ** 2, 0) / values.length;
}

function pairedMoments(left, right) {
  const leftMean = mean(left);
  const rightMean = mean(right);
  const covariance = left.reduce((sum, value, index) => sum + (value - leftMean) * (right[index] - rightMean), 0) / left.length;
  return { leftMean, rightMean, covariance, leftVariance: variance(left, leftMean), rightVariance: variance(right, rightMean) };
}

function quantile(sorted, probability) {
  const rank = (sorted.length + 1) * probability;
  if (rank < 1 || rank > sorted.length) return null;
  const lower = Math.floor(rank);
  const weight = rank - lower;
  return weight === 0 ? sorted[lower - 1] : sorted[lower - 1] * (1 - weight) + sorted[lower] * weight;
}

function greatestCommonDivisor(left, right) {
  let first = left < 0n ? -left : left;
  let second = right < 0n ? -right : right;
  while (second !== 0n) [first, second] = [second, first % second];
  return first;
}

function exactRank(matrix) {
  const rows = matrix.map(row => row.map(BigInt));
  let pivotRow = 0;
  for (let column = 0; column < rows[0].length && pivotRow < rows.length; column++) {
    const selected = rows.findIndex((row, index) => index >= pivotRow && row[column] !== 0n);
    if (selected < 0) continue;
    [rows[pivotRow], rows[selected]] = [rows[selected], rows[pivotRow]];
    const pivot = rows[pivotRow][column];
    for (let index = pivotRow + 1; index < rows.length; index++) {
      const factor = rows[index][column];
      if (factor === 0n) continue;
      for (let remaining = column + 1; remaining < rows[index].length; remaining++) {
        rows[index][remaining] = rows[index][remaining] * pivot - rows[pivotRow][remaining] * factor;
      }
      rows[index][column] = 0n;
      const divisor = rows[index].reduce(greatestCommonDivisor, 0n);
      if (divisor > 1n) rows[index] = rows[index].map(value => value / divisor);
    }
    pivotRow++;
  }
  return pivotRow;
}

function algebraOracle(id, rows) {
  let expected;
  let formula;
  let alternatives = [];
  if (id === 'al-c2-e1') {
    if (rows.length !== 4 || rows.some(row => row.length !== 2)) return null;
    const left = rows.slice(0, 2);
    const right = rows.slice(2);
    const product = left.map(row => right[0].map((_, column) => row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
    const componentwise = left.map((row, index) => row.map((value, column) => value * right[index][column]));
    const firstTerm = left.map(row => right[0].map(value => row[0] * value));
    expected = matrixLines(product);
    formula = '(A·B)[i,j] = Σ A[i,k]·B[k,j] pour k = 0 et 1.';
    alternatives = [
      arithmeticVariant('produit-terme-a-terme', 'Multiplier les coefficients de même position au lieu des lignes par les colonnes.', matrixLines(componentwise)),
      arithmeticVariant('produit-terme-oublie', 'Oublier le second terme de chaque produit scalaire.', matrixLines(firstTerm))
    ];
  } else if (id === 'al-c2-e2') {
    const matrix = sizedMatrix(rows);
    if (!matrix) return null;
    const transpose = matrix[0].map((_, column) => matrix.map(row => row[column]));
    expected = matrixLines(transpose);
    formula = 'La transposée vérifie T[j,i] = A[i,j], avec dimensions échangées.';
    alternatives = [
      arithmeticVariant('transpose-lignes-inversees', 'Inverser l’ordre des lignes de la transposée.', matrixLines(transpose.slice().reverse())),
      arithmeticVariant('transpose-colonnes-inversees', 'Lire les lignes de la matrice d’origine dans l’ordre inverse.', matrixLines(transpose.map(row => row.slice().reverse())))
    ];
  } else if (id === 'al-c3-e2') {
    if (rows.length !== 2 || rows.some(row => row.length !== 2)) return null;
    const [[upperLeft, upperRight], [lowerLeft, lowerRight]] = rows;
    const determinant = upperLeft * lowerRight - upperRight * lowerLeft;
    formula = 'Si ad−bc ≠ 0, A⁻¹ = [[d, −b], [−c, a]]/(ad−bc) ; sinon la matrice est singulière.';
    if (determinant === 0) expected = ['singuliere'];
    else {
      const adjugate = [[lowerRight, -upperRight], [-lowerLeft, upperLeft]];
      if (adjugate.some(row => row.some(value => value % determinant !== 0))) return null;
      const divide = matrix => matrix.map(row => row.map(value => value / determinant));
      expected = matrixLines(divide(adjugate));
      alternatives = [
        arithmeticVariant('inverse-signes-oublies', 'Oublier de changer les signes hors diagonale.', matrixLines(divide([[lowerRight, upperRight], [lowerLeft, upperLeft]]))),
        arithmeticVariant('inverse-diagonale-non-echangee', 'Oublier d’échanger les deux coefficients diagonaux.', matrixLines(divide([[upperLeft, -upperRight], [-lowerLeft, lowerRight]])))
      ];
    }
  } else if (id === 'al-c3-e3') {
    if (rows.length !== 2 || rows.some(row => row.length !== 3)) return null;
    const [[firstX, firstY, firstResult], [secondX, secondY, secondResult]] = rows;
    const determinant = firstX * secondY - firstY * secondX;
    if (determinant === 0) return null;
    const xNumerator = firstResult * secondY - firstY * secondResult;
    const yNumerator = firstX * secondResult - firstResult * secondX;
    const x = xNumerator / determinant;
    const y = yNumerator / determinant;
    const addedDeterminant = firstX * secondY + firstY * secondX;
    expected = fixedValues([x, y], 2);
    formula = 'Règle de Cramer : x = (ed−bf)/(ad−bc), y = (af−ec)/(ad−bc).';
    alternatives = [
      arithmeticVariant('systeme-coordonnees-inversees', 'Afficher y avant x au lieu de respecter l’ordre demandé.', fixedValues([y, x], 2)),
      arithmeticVariant('systeme-determinant-additionne', 'Additionner ad et bc au lieu de les soustraire dans le déterminant.',
        addedDeterminant === 0 ? null : fixedValues([xNumerator / addedDeterminant, yNumerator / addedDeterminant], 2))
    ];
  } else if (id === 'al-c4-e1') {
    if (rows[0].length !== 1 || rows[1]?.length !== 2) return null;
    const size = rows[0][0];
    if (size < 1 || size > 100 || rows.length !== 2 + 2 * size || rows.slice(2).some(row => row.length !== 1)) return null;
    const [alpha, beta] = rows[1];
    const first = rows.slice(2, 2 + size).map(row => row[0]);
    const second = rows.slice(2 + size).map(row => row[0]);
    expected = [first.map((value, index) => alpha * value + beta * second[index]).join(' ')];
    formula = 'Chaque composante vaut α·u[i] + β·v[i].';
    alternatives = [
      arithmeticVariant('combinaison-coefficients-inverses', 'Appliquer α à v et β à u.', [first.map((value, index) => beta * value + alpha * second[index]).join(' ')]),
      arithmeticVariant('combinaison-coefficient-oublie', 'Oublier le coefficient β devant v.', [first.map((value, index) => alpha * value + second[index]).join(' ')])
    ];
  } else if (id === 'al-c4-e3') {
    if (rows.length !== 3 || rows.some(row => row.length !== 3)) return null;
    const [target, first, second] = rows;
    let pivot = null;
    for (let firstIndex = 0; firstIndex < 3 && !pivot; firstIndex++) {
      for (let secondIndex = firstIndex + 1; secondIndex < 3; secondIndex++) {
        const determinant = first[firstIndex] * second[secondIndex] - first[secondIndex] * second[firstIndex];
        if (determinant !== 0) {
          pivot = { firstIndex, secondIndex, determinant };
          break;
        }
      }
    }
    if (!pivot) return null;
    const { firstIndex, secondIndex, determinant } = pivot;
    const firstNumerator = target[firstIndex] * second[secondIndex] - target[secondIndex] * second[firstIndex];
    const secondNumerator = first[firstIndex] * target[secondIndex] - first[secondIndex] * target[firstIndex];
    if (firstNumerator % determinant || secondNumerator % determinant) return null;
    const firstCoordinate = firstNumerator / determinant;
    const secondCoordinate = secondNumerator / determinant;
    if (target.some((value, index) => value !== firstCoordinate * first[index] + secondCoordinate * second[index])) return null;
    expected = [`${firstCoordinate} ${secondCoordinate}`];
    formula = 'Résoudre deux coordonnées indépendantes de w = a·u + b·v, puis vérifier la troisième.';
    alternatives = [
      arithmeticVariant('coordonnees-inversees', 'Intervertir les coefficients de u et v.', [`${secondCoordinate} ${firstCoordinate}`]),
      arithmeticVariant('coordonnees-sans-determinant', 'Oublier la division par le déterminant du système.', [`${firstNumerator} ${secondNumerator}`])
    ];
  } else if (id === 'al-c5-e1') {
    const matrix = sizedMatrix(rows);
    if (!matrix) return null;
    const rank = exactRank(matrix);
    expected = [String(rank)];
    formula = 'Élimination exacte par pivots entiers ; le rang est le nombre de pivots non nuls.';
    if (matrix.length === 3 && rank === 1 && matrix[0].some(value => value !== 0)
      && matrix.every(row => row.every((value, index) => value === matrix[0][index]))) {
      alternatives = [
        arithmeticVariant('rang-lignes-non-nulles', 'Compter les trois lignes non nulles sans vérifier leur dépendance.', ['3']),
        arithmeticVariant('rang-une-dependance-oubliee', 'Ne reconnaître qu’une seule dépendance entre les trois lignes identiques.', ['2'])
      ];
    }
  } else if (id === 'al-c6-e1') {
    if (rows.length !== 3 || rows.some(row => row.length !== 3)) return null;
    const [[a, b, c], [d, e, f], [g, h, i]] = rows;
    const determinant = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    expected = [String(determinant)];
    formula = 'Développement : a(ei−fh) − b(di−fg) + c(dh−eg).';
    alternatives = [
      arithmeticVariant('determinant-cofacteur-positif', 'Oublier le signe moins du cofacteur central.', [String(a * (e * i - f * h) + b * (d * i - f * g) + c * (d * h - e * g))]),
      arithmeticVariant('determinant-produit-diagonal', 'Multiplier uniquement les coefficients de la diagonale principale.', [String(a * e * i)])
    ];
  } else if (id === 'al-c6-e2') {
    if (rows.length !== 2 || rows.some(row => row.length !== 2)) return null;
    const [[upperLeft, upperRight], [lowerLeft, lowerRight]] = rows;
    const trace = upperLeft + lowerRight;
    const determinant = upperLeft * lowerRight - upperRight * lowerLeft;
    const discriminant = trace ** 2 - 4 * determinant;
    formula = 'Les racines de λ² − trace(A)·λ + det(A) sont ordonnées ; Δ < 0 exclut les racines réelles.';
    if (discriminant < 0) expected = ['pas de valeur propre reelle'];
    else {
      const root = Math.sqrt(discriminant);
      const eigenvalues = [(trace - root) / 2, (trace + root) / 2];
      expected = fixedValues(eigenvalues, 2);
      alternatives = [
        arithmeticVariant('valeurs-propres-ordre-inverse', 'Afficher la plus grande valeur propre avant la plus petite.', fixedValues(eigenvalues.slice().reverse(), 2)),
        arithmeticVariant('valeurs-propres-diagonale', 'Prendre les seuls coefficients diagonaux pour valeurs propres.', fixedValues([upperLeft, lowerRight].sort((left, right) => left - right), 2))
      ];
    }
  } else if (id === 'al-c6-e3') {
    if (rows.length !== 5 || rows[0].length !== 3 || rows[1].length !== 3 || rows.slice(2).some(row => row.length !== 1)) return null;
    const matrix = rows.slice(0, 2);
    const vector = rows.slice(2).map(row => row[0]);
    const product = input => matrix.map(row => row.reduce((sum, value, index) => sum + value * input[index], 0));
    expected = [product(vector).join(' ')];
    formula = 'Chaque coordonnée de f(v) est le produit scalaire d’une ligne de A avec v.';
    alternatives = [
      arithmeticVariant('image-terme-oublie', 'Oublier la troisième composante dans chaque produit scalaire.', [matrix.map(row => row[0] * vector[0] + row[1] * vector[1]).join(' ')]),
      arithmeticVariant('image-coordonnees-inversees', 'Intervertir la première et la troisième coordonnée du vecteur.', [product([vector[2], vector[1], vector[0]]).join(' ')])
    ];
  } else return null;
  return expected ? { expected, formula, alternatives } : null;
}

function statisticsOracle(id, rows) {
  let expected;
  let formula;
  let priority = 0;
  let alternatives = [];
  if (id === 'st-c2-e2') {
    const values = arithmeticSeries(rows);
    if (!values) return null;
    const counts = new Map();
    for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
    const modalities = [...counts.keys()].sort((left, right) => left - right);
    priority = modalities.length;
    const output = (denominator, scale) => {
      const lines = modalities.map(value => {
        const frequency = fixedNumber(scale * counts.get(value) / denominator, 2);
        return frequency === null ? null : `${value} ${frequency}`;
      });
      return lines.includes(null) ? null : lines;
    };
    expected = output(values.length, 100);
    formula = 'Pour chaque modalité croissante : 100 × effectif de la modalité / effectif total.';
    alternatives = [
      arithmeticVariant('frequence-mauvais-denominateur', 'Diviser par le nombre de modalités plutôt que par l’effectif total.', output(modalities.length, 100)),
      arithmeticVariant('frequence-sans-pourcentage', 'Oublier de multiplier les fréquences par 100.', output(values.length, 1))
    ];
  } else if (id === 'st-c3-e1') {
    const values = arithmeticSeries(rows);
    if (!values) return null;
    const sum = values.reduce((total, value) => total + value, 0);
    expected = fixedValues([sum / values.length], 2);
    formula = 'Moyenne = somme des observations / nombre d’observations.';
    alternatives = [
      arithmeticVariant('moyenne-denominateur-n-moins-un', 'Diviser la somme par n−1 au lieu de n.', fixedValues([sum / (values.length - 1)], 2)),
      arithmeticVariant('moyenne-derniere-observation-oubliee', 'Oublier la dernière observation dans la somme sans modifier n.', fixedValues([(sum - values[values.length - 1]) / values.length], 2))
    ];
  } else if (id === 'st-c3-e2' || id === 'st-c4-e3') {
    const entries = weightedSeries(rows);
    if (!entries) return null;
    const count = entries.reduce((sum, entry) => sum + entry[1], 0);
    const weightedSum = entries.reduce((sum, entry) => sum + entry[0] * entry[1], 0);
    const weightedMean = weightedSum / count;
    if (id === 'st-c3-e2') {
      expected = fixedValues([weightedMean], 2);
      formula = 'Moyenne pondérée = Σ valeur × effectif / Σ effectifs.';
      alternatives = [
        arithmeticVariant('moyenne-sans-ponderation', 'Calculer la moyenne simple des modalités en ignorant les effectifs.', fixedValues([mean(entries.map(entry => entry[0]))], 2)),
        arithmeticVariant('moyenne-ponderee-mauvais-denominateur', 'Diviser la somme pondérée par le nombre de modalités.', fixedValues([weightedSum / entries.length], 2))
      ];
    } else {
      const secondMoment = entries.reduce((sum, entry) => sum + entry[0] ** 2 * entry[1], 0) / count;
      const weightedVariance = secondMoment - weightedMean ** 2;
      if (weightedVariance < -1e-8) return null;
      expected = fixedValues([Math.max(0, weightedVariance)], 2);
      formula = 'König pondéré : Σ effectif × valeur² / N − moyenne pondérée².';
      alternatives = [
        arithmeticVariant('variance-ponderee-sans-ponderation', 'Traiter chaque modalité comme si son effectif valait un.', fixedValues([variance(entries.map(entry => entry[0]))], 2)),
        arithmeticVariant('variance-ponderee-moment-non-centre', 'Oublier la soustraction du carré de la moyenne.', fixedValues([secondMoment], 2))
      ];
    }
  } else if (id === 'st-c3-e3') {
    const values = arithmeticSeries(rows);
    if (!values) return null;
    const sorted = values.slice().sort((left, right) => left - right);
    const median = quantile(sorted, 0.5);
    if (median === null) return null;
    const lower = Math.floor((values.length - 1) / 2);
    const upper = Math.ceil((values.length - 1) / 2);
    expected = fixedValues([median], 2);
    formula = 'Trier les valeurs et interpoler au rang (n+1)/2.';
    alternatives = [
      arithmeticVariant('mediane-rang-inferieur', 'Prendre la valeur centrale inférieure sans interpoler.', fixedValues([sorted[lower]], 2)),
      arithmeticVariant('mediane-serie-non-triee', 'Prendre les valeurs centrales avant de trier la série.', fixedValues([(values[lower] + values[upper]) / 2], 2))
    ];
  } else if (id === 'st-c4-e1' || id === 'st-c4-e2') {
    const values = arithmeticSeries(rows);
    if (!values) return null;
    const average = mean(values);
    const populationVariance = variance(values, average);
    if (id === 'st-c4-e1') {
      expected = fixedValues([populationVariance], 2);
      formula = 'Variance de population = Σ(x−moyenne)² / n.';
      alternatives = [
        arithmeticVariant('variance-denominateur-n-moins-un', 'Diviser les écarts quadratiques par n−1.', fixedValues([populationVariance * values.length / (values.length - 1)], 2)),
        arithmeticVariant('variance-confondue-ecart-type', 'Donner l’écart-type à la place de la variance.', fixedValues([Math.sqrt(populationVariance)], 2))
      ];
    } else {
      if (average <= 0) return null;
      const standardDeviation = Math.sqrt(populationVariance);
      expected = fixedValues([standardDeviation, 100 * standardDeviation / average], 2);
      formula = 'σ = √(Σ(x−moyenne)²/n) ; CV = 100 × σ/moyenne, pour une moyenne positive.';
      alternatives = [
        arithmeticVariant('ecart-type-confusion-variance', 'Utiliser la variance au lieu de l’écart-type dans les deux résultats.', fixedValues([populationVariance, 100 * populationVariance / average], 2)),
        arithmeticVariant('variation-sans-pourcentage', 'Oublier le facteur 100 dans le coefficient de variation.', fixedValues([standardDeviation, standardDeviation / average], 2))
      ];
    }
  } else if (id === 'st-c5-e1') {
    if (rows.length !== 1 || rows[0].length !== 3) return null;
    const [minimum, maximum, count] = rows[0];
    if (maximum <= minimum || count < 2 || count > 100) return null;
    const output = (width, offset) => {
      const lines = Array.from({ length: count }, (_, index) => {
        const lower = fixedNumber(minimum + (index + offset) * width, 2);
        const upper = fixedNumber(minimum + (index + offset + 1) * width, 2);
        return lower === null || upper === null ? null : `${lower} ${upper}`;
      });
      return lines.includes(null) ? null : lines;
    };
    const width = (maximum - minimum) / count;
    expected = output(width, 0);
    formula = 'Amplitude = (max−min)/k ; classe i = [min+i·amplitude, min+(i+1)·amplitude].';
    alternatives = [
      arithmeticVariant('classes-denominateur-k-moins-un', 'Diviser l’étendue par k−1 au lieu de k.', output((maximum - minimum) / (count - 1), 0)),
      arithmeticVariant('classes-depart-decale', 'Commencer à min + une amplitude au lieu de min.', output(width, 1))
    ];
  } else if (id === 'st-c5-e2') {
    if (rows[0].length !== 3) return null;
    const [minimum, maximum, count] = rows[0];
    const values = arithmeticSeries(rows.slice(1), 1);
    if (!values || maximum <= minimum || count < 1 || count > 100
      || values.some(value => value < minimum || value > maximum)) return null;
    const widthNumerator = maximum - minimum;
    const correct = Array(count).fill(0);
    const withoutMaximum = Array(count).fill(0);
    const boundaryToPrevious = Array(count).fill(0);
    let hasInternalBoundary = false;
    for (const value of values) {
      const position = (value - minimum) * count;
      const index = Math.min(Math.floor(position / widthNumerator), count - 1);
      correct[index]++;
      if (value !== maximum) withoutMaximum[index]++;
      const previousIndex = value === minimum ? 0 : Math.floor((position + widthNumerator - 1) / widthNumerator) - 1;
      boundaryToPrevious[previousIndex]++;
      if (value > minimum && value < maximum && position % widthNumerator === 0) hasInternalBoundary = true;
    }
    priority = (values.includes(maximum) ? 2 : 0) + (hasInternalBoundary ? 1 : 0);
    expected = [correct.join(' ')];
    formula = 'Classes de largeur (max−min)/k, fermées à gauche ; la dernière inclut max.';
    alternatives = [
      arithmeticVariant('effectifs-maximum-exclu', 'Exclure à tort les observations égales à la borne maximale.', [withoutMaximum.join(' ')]),
      arithmeticVariant('effectifs-borne-interne-precedente', 'Attribuer les bornes internes à la classe précédente.', [boundaryToPrevious.join(' ')])
    ];
  } else if (id === 'st-c5-e3') {
    const values = arithmeticSeries(rows);
    if (!values) return null;
    const sorted = values.slice().sort((left, right) => left - right);
    const firstQuartile = quantile(sorted, 0.25);
    const median = quantile(sorted, 0.5);
    const thirdQuartile = quantile(sorted, 0.75);
    if ([firstQuartile, median, thirdQuartile].includes(null)) return null;
    const minimum = sorted[0];
    const maximum = sorted[sorted.length - 1];
    const empiricalFirst = sorted[Math.ceil(sorted.length * 0.25) - 1];
    const empiricalThird = sorted[Math.ceil(sorted.length * 0.75) - 1];
    const lowerMedian = sorted[Math.floor((sorted.length - 1) / 2)];
    expected = fixedValues([minimum, firstQuartile, median, thirdQuartile, maximum], 2, true);
    formula = 'Trier puis interpoler aux rangs (n+1)·0,25, (n+1)·0,5 et (n+1)·0,75.';
    alternatives = [
      arithmeticVariant('quartiles-sans-interpolation', 'Utiliser les rangs entiers ⌈n/4⌉ et ⌈3n/4⌉ au lieu de la convention demandée.', fixedValues([minimum, empiricalFirst, median, empiricalThird, maximum], 2, true)),
      arithmeticVariant('boite-mediane-inferieure', 'Pour une série paire, prendre la valeur centrale inférieure comme médiane.', fixedValues([minimum, firstQuartile, lowerMedian, thirdQuartile, maximum], 2, true))
    ];
  } else if (id === 'st-c6-e1' || id === 'st-c6-e2' || id === 'st-c6-e3') {
    const pair = pairedSeries(rows);
    if (!pair) return null;
    const moments = pairedMoments(pair.left, pair.right);
    const { covariance, leftMean, rightMean, leftVariance, rightVariance } = moments;
    if (id === 'st-c6-e1') {
      const rawMoment = pair.left.reduce((sum, value, index) => sum + value * pair.right[index], 0) / pair.left.length;
      expected = fixedValues([covariance], 4);
      formula = 'Covariance de population, conformément à l’indice : Σ(x−x̄)(y−ȳ)/n.';
      alternatives = [
        arithmeticVariant('covariance-denominateur-n-moins-un', 'Diviser la somme des écarts croisés par n−1.', fixedValues([covariance * pair.left.length / (pair.left.length - 1)], 4)),
        arithmeticVariant('covariance-non-centree', 'Utiliser la moyenne des produits xy sans soustraire le produit des moyennes.', fixedValues([rawMoment], 4))
      ];
    } else if (id === 'st-c6-e2') {
      if (leftVariance <= 0 || rightVariance <= 0) return null;
      const correlation = covariance / Math.sqrt(leftVariance * rightVariance);
      expected = fixedValues([correlation], 4);
      formula = 'Corrélation = covariance de population / (écart-type de x × écart-type de y).';
      alternatives = [
        arithmeticVariant('correlation-signe-oublie', 'Donner la valeur absolue de la corrélation et perdre son signe.', fixedValues([Math.abs(correlation)], 4)),
        arithmeticVariant('correlation-confondue-pente', 'Diviser la covariance par la variance de x, comme pour une pente.', fixedValues([covariance / leftVariance], 4))
      ];
    } else {
      if (leftVariance <= 0) return null;
      const slope = covariance / leftVariance;
      const intercept = rightMean - slope * leftMean;
      const reversedDenominator = rightVariance > 0 ? covariance / rightVariance : null;
      expected = fixedValues([slope, intercept], 4);
      formula = 'Pente a = cov(x,y)/V(x), ordonnée b = ȳ−a·x̄.';
      alternatives = [
        arithmeticVariant('regression-variance-y', 'Utiliser V(y) au dénominateur de la pente puis recalculer l’ordonnée.', reversedDenominator === null ? null : fixedValues([reversedDenominator, rightMean - reversedDenominator * leftMean], 4)),
        arithmeticVariant('regression-ordonnee-sans-moyenne-x', 'Calculer b = ȳ−a en oubliant le facteur x̄.', fixedValues([slope, rightMean - slope], 4))
      ];
    }
  } else return null;
  return expected ? { expected, formula, alternatives, priority } : null;
}

function arithmeticOracle(exercise, sample) {
  const contract = exercise && B1_ARITHMETIC_CONTRACTS[exercise.id];
  if (!contract || exercise.language !== 'analyse'
    || sha256(JSON.stringify([exercise.brief, exercise.hints])) !== contract) return null;
  const rows = arithmeticRows(sample.data);
  if (!rows) return null;
  const calculation = exercise.id.startsWith('al-') ? algebraOracle(exercise.id, rows) : statisticsOracle(exercise.id, rows);
  if (!calculation) return null;
  const computed = execution.normalizeOutput(calculation.expected.join('\n'));
  if (!computed) return null;
  const seen = new Set([computed]);
  const variants = calculation.alternatives.filter(variant => {
    if (!Array.isArray(variant.lines) || !variant.lines.length
      || variant.lines.some(line => typeof line !== 'string' || !line.trim() || /[\r\n]/.test(line))) return false;
    const output = execution.normalizeOutput(variant.lines.join('\n'));
    if (!output || seen.has(output)) return false;
    seen.add(output);
    return true;
  });
  return {
    computed: calculation.expected,
    formula: calculation.formula,
    priority: calculation.priority || 0,
    matchesExpected: typeof sample.expected === 'string'
      ? computed === execution.normalizeOutput(sample.expected) : null,
    variants
  };
}

function frequencyHeadingWarning(exercise, sample) {
  if (exercise.id !== 'st-c2-e2') return null;
  const match = /\b(un|une|deux|trois|quatre|cinq|six|\d+)(?:\s+seul(?:e)?)?\s+modalites?\b/.exec(fold(sample.heading || ''));
  if (!match) return null;
  const names = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6 };
  const declared = names[match[1]] || Number(match[1]);
  const rows = arithmeticRows(sample.data);
  const values = rows && arithmeticSeries(rows);
  if (!values) return null;
  const observed = new Set(values).size;
  return declared === observed ? null : { id: exercise.id, selector: sample.stdin,
    reason: 'Le libellé du cas et ses données indiquent des nombres de modalités différents.', declared, observed };
}

function auditArithmetic(exercise) {
  const ambiguity = exercise && B1_AMBIGUITIES[exercise.id];
  const contract = exercise && (B1_ARITHMETIC_CONTRACTS[exercise.id] || ambiguity?.hash);
  if (!contract) return null;
  if (exercise.language !== 'analyse' || sha256(JSON.stringify([exercise.brief, exercise.hints])) !== contract) {
    return { status: 'contrat-modifie', cases: [], mismatches: [], warnings: [], nonReconstructible: 0 };
  }
  if (ambiguity) return { status: 'contrat-ambigu', reason: ambiguity.reason, cases: [], mismatches: [], warnings: [], nonReconstructible: 0 };
  const tests = Array.isArray(exercise.tests) ? exercise.tests : [];
  const samples = collectSamples(exercise);
  let nonReconstructible = tests.length - samples.length;
  const cases = [];
  const mismatches = [];
  const warnings = [];
  for (const sample of samples) {
    const oracle = arithmeticOracle(exercise, sample);
    if (!oracle) {
      nonReconstructible++;
      continue;
    }
    const warning = frequencyHeadingWarning(exercise, sample);
    if (warning) warnings.push(warning);
    cases.push({ sample, oracle, eligible: !warning });
    if (!oracle.matchesExpected) {
      mismatches.push({ id: exercise.id, selector: sample.stdin, testIndex: sample.index, expected: sample.expected,
        independentlyComputed: oracle.computed.join('\n'), formula: oracle.formula });
    }
  }
  const incomplete = !tests.length || tests.length > MAX_TESTS || nonReconstructible > 0;
  return { status: mismatches.length ? 'attendu-divergent' : incomplete ? 'cas-non-reconstructible' : 'ok',
    cases, mismatches, warnings, nonReconstructible };
}

function arithmeticCandidate(audit) {
  if (!audit || audit.status !== 'ok') return null;
  const ordered = audit.cases.slice().sort((left, right) => right.oracle.priority - left.oracle.priority || left.sample.index - right.sample.index);
  for (const entry of ordered) {
    const { sample, oracle } = entry;
    if (!entry.eligible || oracle.variants.length < 2) continue;
    return {
      method: 'oracle-arithmetique-b1',
      rank: 5,
      sample,
      rule: oracle.formula,
      variants: oracle.variants.slice(0, 2).map(variant => ({
        ...variant,
        evidence: { input: sample.data, source: 'grille visible', formula: oracle.formula,
          independentlyComputed: oracle.computed, submitted: variant.lines }
      }))
    };
  }
  return null;
}

function numericAnswer(exercise, sample) {
  if (!NUMERIC_CONTRACTS[exercise.id] || sha256(exercise.brief || '') !== NUMERIC_CONTRACTS[exercise.id]) return null;
  const input = sample.data;
  let expected;
  let alternatives;
  let formula;
  if (exercise.id === 'al-c1-e1') {
    const numbers = scalarLines(input);
    if (!numbers || numbers[0] < 2 || numbers.length !== 1 + 2 * numbers[0]) return null;
    const size = numbers[0];
    const left = numbers.slice(1, size + 1);
    const right = numbers.slice(size + 1);
    const correct = left.map((value, index) => value + right[index]);
    if (!right[0] || right[0] === right[1]) return null;
    const subtraction = correct.slice();
    const shifted = correct.slice();
    subtraction[0] = left[0] - right[0];
    shifted[0] = left[0] + right[1];
    expected = [correct.join(' ')];
    alternatives = [
      ['soustraction-composante', 'Soustraire la première composante au lieu de l’additionner.', [subtraction.join(' ')]],
      ['confusion-composantes', 'Additionner la deuxième composante de b à la première de a.', [shifted.join(' ')]]
    ];
    formula = 'Pour chaque indice i : a[i] + b[i].';
  } else if (exercise.id === 'al-c1-e2') {
    const numbers = scalarLines(input);
    if (!numbers || numbers[1] < 2 || numbers.length !== 2 + numbers[1]) return null;
    const factor = numbers[0];
    const values = numbers.slice(2);
    const correct = values.map(value => factor * value);
    if (factor === 1 || !values[1] || factor + values[0] === correct[0]) return null;
    const addition = correct.slice();
    const forgotten = correct.slice();
    addition[0] = factor + values[0];
    forgotten[1] = values[1];
    expected = [correct.join(' ')];
    alternatives = [
      ['addition-scalaire', 'Additionner le scalaire à la première composante.', [addition.join(' ')]],
      ['multiplication-oubliee', 'Oublier la multiplication de la deuxième composante.', [forgotten.join(' ')]]
    ];
    formula = 'Pour chaque indice i : k × v[i].';
  } else if (exercise.id === 'al-c1-e3') {
    const sizeLine = integers(input[0]);
    if (!sizeLine || sizeLine.length !== 1 || sizeLine[0] < 2 || input.length !== sizeLine[0] + 1) return null;
    const matrix = input.slice(1).map(integers);
    const size = sizeLine[0];
    if (matrix.some(row => !row || row.length !== size)) return null;
    const diagonal = matrix.reduce((sum, row, index) => sum + row[index], 0);
    const firstRow = matrix[0].reduce((sum, value) => sum + value, 0);
    const otherDiagonal = matrix.reduce((sum, row, index) => sum + row[size - index - 1], 0);
    expected = [String(diagonal)];
    alternatives = [
      ['somme-premiere-ligne', 'Additionner la première ligne au lieu de la diagonale principale.', [String(firstRow)]],
      ['diagonale-inversee', 'Additionner la diagonale secondaire.', [String(otherDiagonal)]]
    ];
    formula = 'Trace = somme des éléments a[i][i].';
  } else if (exercise.id === 'al-c3-e1') {
    const matrix = input.map(integers);
    if (matrix.length !== 2 || matrix.some(row => !row || row.length !== 2)) return null;
    const [[upperLeft, upperRight], [lowerLeft, lowerRight]] = matrix;
    expected = [String(upperLeft * lowerRight - upperRight * lowerLeft)];
    alternatives = [
      ['signe-determinant', 'Additionner les deux produits au lieu de les soustraire.', [String(upperLeft * lowerRight + upperRight * lowerLeft)]],
      ['produits-lignes', 'Utiliser les produits des lignes au lieu des produits croisés.', [String(upperLeft * upperRight - lowerLeft * lowerRight)]]
    ];
    formula = 'Déterminant = a × d − b × c.';
  } else if (exercise.id === 'st-c1-e1') {
    const values = series(input);
    if (!values) return null;
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    if (minimum === maximum) return null;
    expected = [`${values.length} ${minimum} ${maximum}`];
    alternatives = [
      ['effectif-moins-un', 'Oublier une observation dans l’effectif.', [`${values.length - 1} ${minimum} ${maximum}`]],
      ['inversion-extremes', 'Inverser le minimum et le maximum.', [`${values.length} ${maximum} ${minimum}`]]
    ];
    formula = 'Effectif = nombre de valeurs ; minimum et maximum sont les extrêmes de la série.';
  } else if (exercise.id === 'st-c1-e2') {
    const values = series(input);
    if (!values || values.length < 3) return null;
    const sorted = values.slice().sort((left, right) => left - right);
    expected = [sorted.join(' ')];
    alternatives = [
      ['ordre-decroissant', 'Trier par ordre décroissant au lieu de croissant.', [sorted.slice().reverse().join(' ')]],
      ['observation-oubliee', 'Oublier la dernière observation de la série ordonnée.', [sorted.slice(0, -1).join(' ')]]
    ];
    formula = 'Trier toutes les observations par valeur croissante, sans retirer les doublons.';
  } else if (exercise.id === 'st-c1-e3') {
    const values = series(input);
    if (!values) return null;
    const distinct = new Set(values).size;
    if (distinct < 2 || distinct === values.length) return null;
    expected = [String(distinct)];
    alternatives = [
      ['effectif-au-lieu-modalites', 'Compter les observations au lieu des valeurs distinctes.', [String(values.length)]],
      ['modalite-oubliee', 'Oublier une modalité distincte.', [String(distinct - 1)]]
    ];
    formula = 'Nombre de modalités = nombre de valeurs distinctes.';
  } else if (exercise.id === 'st-c2-e1' || exercise.id === 'st-c2-e3') {
    const values = series(input);
    if (!values) return null;
    const counts = new Map();
    for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
    const modalities = [...counts.keys()].sort((left, right) => left - right);
    if (modalities.length < 3) return null;
    let cumulative = 0;
    expected = modalities.map(value => {
      cumulative += counts.get(value);
      return `${value} ${exercise.id === 'st-c2-e1' ? counts.get(value) : cumulative}`;
    });
    const incorrect = expected.slice();
    if (exercise.id === 'st-c2-e1') {
      if (counts.get(modalities[0]) < 2) return null;
      incorrect[0] = `${modalities[0]} ${counts.get(modalities[0]) - 1}`;
      alternatives = [
        ['effectif-modalite-moins-un', 'Oublier une occurrence de la première modalité.', incorrect],
        ['derniere-modalite-omise', 'Omettre la dernière modalité du tableau.', expected.slice(0, -1)]
      ];
      formula = 'Pour chaque valeur distincte triée : compter ses occurrences.';
    } else {
      incorrect[1] = `${modalities[1]} ${counts.get(modalities[1])}`;
      alternatives = [
        ['effectif-non-cumule', 'Indiquer l’effectif simple de la deuxième modalité au lieu du cumul.', incorrect],
        ['dernier-cumul-omis', 'Omettre la dernière modalité et son cumul.', expected.slice(0, -1)]
      ];
      formula = 'Pour chaque valeur triée : sommer les effectifs jusqu’à cette valeur incluse.';
    }
  } else {
    return null;
  }
  if (!expected || !alternatives || alternatives.length !== 2) return null;
  const expectedText = execution.normalizeOutput(expected.join('\n'));
  if (expectedText !== execution.normalizeOutput(sample.expected)) return null;
  const different = new Set(alternatives.map(item => execution.normalizeOutput(item[2].join('\n'))));
  if (different.size !== 2 || different.has(expectedText) || [...different].some(value => !value)) return null;
  return {
    method: 'calcul-reconstruit',
    rank: 4,
    sample,
    rule: formula,
    variants: alternatives.map(([type, description, lines]) => ({
      type,
      description,
      lines,
      evidence: { input, formula, independentlyComputed: expected, submitted: lines }
    }))
  };
}

function selectCandidate(exercise, arithmeticAudit = auditArithmetic(exercise)) {
  if (arithmeticAudit) return arithmeticCandidate(arithmeticAudit);
  const samples = collectSamples(exercise);
  const contractHash = NUMERIC_CONTRACTS[exercise.id];
  if (contractHash && sha256(exercise.brief || '') === contractHash) {
    for (const sample of samples) {
      const candidate = numericAnswer(exercise, sample);
      if (candidate) return candidate;
    }
  }
  const evidence = htmlEvidence(exercise.brief);
  const candidates = [choiceCandidate(samples, evidence), pairedCategoriesCandidate(samples, evidence), fieldChoiceCandidate(samples, evidence),
    ...samples.flatMap(sample => [labelledCandidate(sample, evidence), keyedCandidate(sample, evidence), fieldOmissionCandidate(sample, evidence)])].filter(Boolean);
  candidates.sort((left, right) => right.rank - left.rank || left.sample.index - right.sample.index);
  return candidates[0] || null;
}

function replaceCaseOutput(sample, lines) {
  if (!Array.isArray(lines) || !lines.length || lines.some(line => typeof line !== 'string' || !line.trim()
    || /[\r\n\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(line)
    || line.trim().startsWith('#') || SECTION_HEADER.test(line.trim()) || /\bA_COMPLETER\b/i.test(line))) {
    return { valid: false, reason: 'réponse vide ou structure de cas invalide' };
  }
  const original = execution.normalizeOutput(sample.lines.join('\n'));
  const mutated = execution.normalizeOutput(lines.join('\n'));
  if (!mutated || original === mutated) return { valid: false, reason: 'mutation identique ou vide' };
  if (isStructuredJson(original)) {
    try {
      const before = JSON.parse(original);
      const after = JSON.parse(mutated);
      if (after === null || typeof after !== 'object' || Array.isArray(before) !== Array.isArray(after)) {
        return { valid: false, reason: 'structure JSON altérée' };
      }
    } catch {
      return { valid: false, reason: 'structure JSON altérée' };
    }
  }
  const code = sample.solutionLines.slice();
  const indices = sample.rows.map(row => row.index);
  if (lines.length === indices.length) {
    for (let index = 0; index < indices.length; index++) code[indices[index]] = lines[index];
  } else {
    if (indices.some((value, index) => index > 0 && value !== indices[index - 1] + 1)) {
      return { valid: false, reason: 'lignes du cas non contiguës' };
    }
    code.splice(indices[0], indices.length, ...lines);
  }
  return { valid: true, code: code.join('\n'), output: mutated };
}

async function evaluate(exercise, submitted, executeOverride) {
  if (!exercise || exercise.language !== 'analyse') throw new Error('Seules les réponses textuelles d’analyse sont autorisées.');
  const calls = [];
  let report;
  try {
    report = await runTests(exercise, submitted, {
      execute: async payload => {
        if (payload.language !== 'analyse') throw new Error('Langage non autorisé dans ce banc.');
        const outcome = executeOverride
          ? await executeOverride(payload)
          : await execution.execute(payload);
        calls.push({
          stdin: payload.stdin,
          ok: Boolean(outcome && outcome.ok === true && outcome.status === 'success' && outcome.exitCode === 0
            && !outcome.compileError && !outcome.stderr),
          status: outcome && outcome.status,
          stdout: String(outcome && outcome.stdout || '')
        });
        return outcome;
      }
    });
  } catch (error) {
    return { state: 'non-evaluee', reason: error.code || error.message, calls, report: null };
  }
  if (!report || report.error || !report.ok || !report.total || calls.some(call => !call.ok)) {
    return { state: 'non-evaluee', reason: report?.error?.code || report?.stop?.reason || 'exécution incomplète', calls, report };
  }
  if (report.stop && report.stop.reason === 'wrong_output') {
    return { state: 'rejetee', reason: 'wrong_output', calls, report };
  }
  if (!report.stop && report.passed === report.total && calls.length === report.total) {
    return { state: 'acceptee', reason: null, calls, report };
  }
  return { state: 'non-evaluee', reason: report.stop?.reason || 'correction incomplète', calls, report };
}

async function assessVariant(exercise, candidate, variant, executeOverride) {
  const sample = variant.sample || candidate.sample;
  const mutation = replaceCaseOutput(sample, variant.lines);
  if (!mutation.valid) return { state: 'invalide', reason: mutation.reason };
  for (const entry of exercise.tests.slice(0, MAX_TESTS)) {
    if (entry.stdin === sample.stdin) continue;
    const before = await local.runAnalyse(exercise.solution, entry.stdin);
    const after = await local.runAnalyse(mutation.code, entry.stdin);
    if (!before.ok || !after.ok || before.data.stdout !== after.data.stdout) {
      return { state: 'invalide', reason: 'un autre cas a été modifié' };
    }
  }
  const outcome = await evaluate(exercise, mutation.code, executeOverride);
  if (outcome.state === 'non-evaluee') return { state: outcome.state, reason: outcome.reason };
  const call = outcome.calls[sample.index];
  if (!call || !call.ok || execution.normalizeOutput(call.stdout) !== mutation.output) {
    return { state: 'non-evaluee', reason: 'cas visé non atteint ou sortie différente de la mutation' };
  }
  if (outcome.state === 'rejetee' && outcome.report.stop.testIndex !== sample.index) {
    return { state: 'non-evaluee', reason: 'rejet sur un autre cas' };
  }
  return { state: outcome.state, reason: outcome.reason, testIndex: sample.index };
}

function historicIds() {
  const filename = path.resolve(__dirname, '../../fixtures/banc-360.json');
  try {
    const raw = fs.readFileSync(filename);
    const fixtures = JSON.parse(raw.toString('utf8')).exercises;
    if (!Array.isArray(fixtures)) throw new Error('banque historique sans exercices');
    const ids = new Set(fixtures.filter(item => item.language === 'analyse' && Array.isArray(item.variants) && item.variants.length === 2).map(item => item.id));
    return { ids, sha256: sha256(raw), available: true };
  } catch {
    return { ids: new Set(), sha256: null, available: false };
  }
}

function snapshot(exercises) {
  return sha256(JSON.stringify(exercises.map(exercise => ({
    id: exercise.id,
    course: exercise.course,
    language: exercise.language,
    title: exercise.title,
    brief: exercise.brief,
    starter: exercise.starter,
    solution: exercise.solution,
    tests: exercise.tests
  }))));
}

function arithmeticSnapshot(exercises) {
  return sha256(JSON.stringify(exercises.filter(exercise => B1_ARITHMETIC_CONTRACTS[exercise.id] || B1_AMBIGUITIES[exercise.id])
    .map(exercise => [exercise.id, exercise.brief, exercise.hints])));
}

async function replay(options = {}) {
  const exercises = (options.exercises || require('../../../server/exercises').listExercises())
    .filter(exercise => exercise.language === 'analyse' && (!options.id || exercise.id === options.id))
    .slice().sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);
  if (options.id && exercises.length === 0) throw new Error(`Exercice d’analyse introuvable : ${options.id}`);
  const historic = historicIds();
  const stats = {
    exercicesAnalyse: exercises.length,
    exercicesAvecTestsAuDelaDeLaLimite: exercises.filter(exercise => exercise.tests.length > MAX_TESTS).length,
    references: { acceptees: 0, rejetees: 0, nonEvaluees: 0 },
    exercicesAvecDeuxVariantesEvaluees: 0,
    exercicesAvecDeuxRejets: 0,
    exercicesNonCouverts: 0,
    variantes: { construites: 0, rejetees: 0, acceptees: 0, nonEvaluees: 0, invalides: 0 },
    oraclesArithmetiquesB1: { exercicesIdentifies: 0, contratsConformes: 0, contratsAmbigus: 0, contratsModifies: 0,
      casReconstruits: 0, casAdmissibles: 0, attendusDifferents: 0, casNonReconstructibles: 0, casAuLibelleContradictoire: 0 },
    methodes: {},
    typesVariantes: {},
    exclusions: {}
  };
  const details = [];
  const excluded = [];
  const arithmeticMismatches = [];
  const gridWarnings = [];
  for (const exercise of exercises) {
    const reference = await evaluate(exercise, exercise.solution);
    const referenceKey = reference.state === 'acceptee' ? 'acceptees' : reference.state === 'rejetee' ? 'rejetees' : 'nonEvaluees';
    stats.references[referenceKey]++;
    const arithmetic = auditArithmetic(exercise);
    if (arithmetic) {
      const counters = stats.oraclesArithmetiquesB1;
      counters.exercicesIdentifies++;
      if (arithmetic.status === 'contrat-modifie') counters.contratsModifies++;
      else if (arithmetic.status === 'contrat-ambigu') counters.contratsAmbigus++;
      else counters.contratsConformes++;
      counters.casReconstruits += arithmetic.cases.length;
      counters.casAdmissibles += arithmetic.cases.filter(entry => entry.eligible).length;
      counters.attendusDifferents += arithmetic.mismatches.length;
      counters.casNonReconstructibles += arithmetic.nonReconstructible;
      counters.casAuLibelleContradictoire += arithmetic.warnings.length;
      arithmeticMismatches.push(...arithmetic.mismatches);
      gridWarnings.push(...arithmetic.warnings);
    }
    let exclusion = null;
    let candidate = null;
    if (reference.state !== 'acceptee') exclusion = 'référence non acceptée';
    else if (arithmetic && arithmetic.status === 'attendu-divergent') exclusion = 'attendu incompatible avec l’oracle arithmétique';
    else if (arithmetic && arithmetic.status === 'contrat-ambigu') exclusion = `contrat ambigu : ${arithmetic.reason}`;
    else if (arithmetic && arithmetic.status === 'contrat-modifie') exclusion = 'contrat arithmétique modifié';
    else if (arithmetic && arithmetic.status === 'cas-non-reconstructible') exclusion = 'cas arithmétique non reconstructible';
    else {
      candidate = selectCandidate(exercise, arithmetic);
      if (!candidate) exclusion = arithmetic ? 'aucune paire arithmétique justifiée' : 'aucune paire justifiée par les règles du banc';
    }
    if (exclusion) {
      stats.exclusions[exclusion] = (stats.exclusions[exclusion] || 0) + 1;
      excluded.push({ id: exercise.id, course: exercise.course, reason: exclusion, reference: reference.state });
      continue;
    }
    const outputs = candidate.variants.map(variant => execution.normalizeOutput(variant.lines.join('\n')));
    const distinct = candidate.variants.length === 2 && new Set(outputs).size === 2;
    const variants = [];
    for (const variant of candidate.variants) {
      stats.variantes.construites++;
      const outcome = distinct ? await assessVariant(exercise, candidate, variant) : { state: 'invalide', reason: 'paire de variantes non distinctes' };
      const key = { rejetee: 'rejetees', acceptee: 'acceptees', 'non-evaluee': 'nonEvaluees', invalide: 'invalides' }[outcome.state];
      stats.variantes[key]++;
      stats.typesVariantes[variant.type] = (stats.typesVariantes[variant.type] || 0) + 1;
      const sample = variant.sample || candidate.sample;
      variants.push({ type: variant.type, description: variant.description, selector: sample.stdin, testIndex: sample.index, evidence: variant.evidence, outcome });
    }
    const covered = distinct && variants.every(variant => ['rejetee', 'acceptee'].includes(variant.outcome.state));
    if (covered) {
      stats.exercicesAvecDeuxVariantesEvaluees++;
      stats.methodes[candidate.method] = (stats.methodes[candidate.method] || 0) + 1;
      if (variants.every(variant => variant.outcome.state === 'rejetee')) stats.exercicesAvecDeuxRejets++;
    } else {
      exclusion = 'mutation invalide ou non évaluée';
      stats.exclusions[exclusion] = (stats.exclusions[exclusion] || 0) + 1;
      excluded.push({ id: exercise.id, course: exercise.course, reason: exclusion, reference: reference.state });
    }
    details.push({
      id: exercise.id,
      course: exercise.course,
      covered,
      method: candidate.method,
      rule: candidate.rule,
      selectors: [...new Set(variants.map(variant => variant.selector))],
      mapping: candidate.mapping || null,
      historicExercise: historic.available ? historic.ids.has(exercise.id) : null,
      reference: reference.state,
      variants
    });
  }
  stats.exercicesNonCouverts = exercises.length - stats.exercicesAvecDeuxVariantesEvaluees;
  const coveredDetails = details.filter(detail => detail.covered);
  return {
    version: 1,
    empreinteCatalogueSha256: snapshot(exercises),
    empreinteContratsArithmetiquesSha256: arithmeticSnapshot(exercises),
    limiteTestsParSoumission: MAX_TESTS,
    statistiques: stats,
    historique: {
      disponible: historic.available,
      empreinteSha256: historic.sha256,
      exercicesAnalyseDansLeCatalogue: historic.available ? exercises.filter(exercise => historic.ids.has(exercise.id)).length : null,
      intersectionAvecCeBanc: historic.available ? coveredDetails.filter(detail => detail.historicExercise).length : null,
      couvertsHorsHistorique: historic.available ? coveredDetails.filter(detail => !detail.historicExercise).length : null,
      precision: 'Intersection d’identifiants uniquement : les variantes historiques ne sont pas rejouées ni ajoutées aux résultats de ce banc.'
    },
    limites: [
      'Une référence acceptée et des variantes rejetées prouvent le comportement du correcteur sur les seuls cas exécutés, pas la validité pédagogique ou factuelle du cours.',
      'Les omissions testent la présence de résultats individuels ou de champs demandés ; elles ne prouvent ni la compréhension, ni le rejet de toutes les autres erreurs.',
      'Les calculs reconstruits vérifient certaines formules sur les données locales, sans constituer une évaluation pédagogique indépendante.',
      'Les nouveaux oracles B1 reconstruisent les données des grilles visibles ; les tests sélectionnent ces cas et ne fournissent pas ici de nouvelles entrées cachées.',
      'Une vérification sur ces cas et variantes ne démontre pas la correction générale d’un algorithme ni le traitement de toutes les données possibles.',
      'Les oracles arithmétiques B1 n’acceptent que des données entières de valeur absolue au plus 10 000 ; les dimensions sont bornées, notamment à 1 000 observations et 100 classes.',
      'Ils écartent aussi notamment les arrondis à mi-chemin et les cas non définis par leur formule, même si un énoncé admet davantage de données.',
      'Un contrat B1 modifié ou ambigu est exclu ; un libellé de cas contradictoire ne sert pas au choix des variantes.',
      `Le correcteur ne lance que les ${MAX_TESTS} premiers tests de chaque exercice ; les tests suivants ne sont pas vérifiés ici.`,
      'Les exercices sans paire justifiée, avec une référence refusée, ou avec une mutation invalide ou non évaluée ne sont pas comptés comme couverts.',
      'Seul le moteur textuel local du langage analyse est utilisé : aucun programme élève, fournisseur distant ou environnement de compilation n’est exécuté.'
    ],
    anomaliesOracles: arithmeticMismatches,
    alertesGrilles: gridWarnings,
    details,
    exclus: excluded
  };
}

async function main(args) {
  let details = false;
  let id = null;
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--details') details = true;
    else if (args[index] === '--id' && args[index + 1]) id = args[++index];
    else throw new Error(`Option inconnue ou incomplète : ${args[index]}`);
  }
  const result = await replay({ id });
  const output = details ? result : Object.fromEntries(Object.entries(result).filter(([key]) => !['details', 'exclus'].includes(key)));
  console.log(JSON.stringify(output, null, 2));
  const stats = result.statistiques;
  if (stats.references.rejetees || stats.references.nonEvaluees || stats.variantes.acceptees
    || stats.variantes.nonEvaluees || stats.variantes.invalides || stats.oraclesArithmetiquesB1.attendusDifferents) process.exitCode = 1;
}

if (require.main === module) {
  main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 2; });
}

module.exports = { arithmeticOracle, assessVariant, auditArithmetic, collectSamples, evaluate, htmlEvidence, numericAnswer, replaceCaseOutput, replay, selectCandidate };
