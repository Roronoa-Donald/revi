'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const parse5 = require('parse5');

const root = path.resolve(__dirname, '../..');
const referenceIndex = process.argv.indexOf('--reference');
const reference = referenceIndex < 0 ? null : process.argv[referenceIndex + 1];
if (referenceIndex >= 0 && !reference) throw new Error('Une référence Git est requise.');
const manifest = process.env.REVI_AUDIT_MANIFEST;
const withoutBaseline = process.env.REVI_AUDIT_SANS_BASELINE === '1';
if ((manifest && (!withoutBaseline || reference)) || (withoutBaseline && !manifest)) {
  throw new Error('Le mode sans référence exige un manifeste local sans option --reference.');
}
const dictionary = path.join(root, 'node_modules/dictionary-fr/index');
const segmenter = new Intl.Segmenter('fr', { granularity: 'word' });
const singularForms = new Set('es as peux dois fais sais veux vas prends vois connais réponds utilises effectues écris lis dis suis'.split(' '));
const ignored = new Set(['script', 'style', 'noscript', 'template']);
const textAttributes = new Set(['alt', 'title', 'aria-label', 'placeholder']);

function git(args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 100 * 1024 * 1024 });
}

function listPages(ref) {
  const args = ref ? ['ls-tree', '-rz', '--name-only', ref] : ['ls-files', '-z'];
  const listed = (manifest && !ref ? fs.readFileSync(manifest, 'utf8') : git(args)).split('\0').filter(Boolean);
  if (manifest && listed.some(file => path.isAbsolute(file) || file.split(/[\\/]/).includes('..'))) {
    throw new Error('Le manifeste contient un chemin hors du projet.');
  }
  const pages = listed.filter(file => file.toLowerCase().endsWith('.html') && !/^(audit|design-audit|tests|verification|corrections)\//.test(file)).sort();
  if (manifest && (!pages.length || pages.some(file => !fs.realpathSync(path.join(root, file)).startsWith(root + path.sep)))) {
    throw new Error('Le manifeste est vide ou contient un chemin hors du projet.');
  }
  return pages;
}

function readPage(file, ref) {
  return ref ? git(['show', `${ref}:${file}`]) : fs.readFileSync(path.join(root, file), 'utf8');
}

function vocabulary(ref) {
  const words = new Map();
  const grammar = [];
  const pages = listPages(ref);
  for (const file of pages) {
    const document = parse5.parse(readPage(file, ref), { sourceCodeLocationInfo: true });
    function text(value, line) {
      const tokens = [...segmenter.segment(value)].filter(item => item.isWordLike && /\p{L}/u.test(item.segment));
      for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index].segment.normalize('NFC').toLocaleLowerCase('fr');
        if (!words.has(token)) words.set(token, { occurrences: 0, exemples: [] });
        const entry = words.get(token);
        entry.occurrences++;
        if (entry.exemples.length < 3 && !entry.exemples.some(example => example.fichier === file)) {
          entry.exemples.push({ fichier: file, ligne: line });
        }
        if (token === 'vous' && index + 1 < tokens.length) {
          const next = tokens[index + 1].segment.normalize('NFC').toLocaleLowerCase('fr');
          if (singularForms.has(next)) grammar.push({ fichier: file, ligne: line, extrait: value.trim().slice(0, 300), forme: next });
        }
      }
      const normalized = value.normalize('NFC').toLocaleLowerCase('fr').replace(/\s+/gu, ' ');
      if (normalized.includes('dessinez l’architecture en couches et nomme ') || normalized.includes("dessinez l'architecture en couches et nomme ")) {
        grammar.push({ fichier: file, ligne: line, extrait: value.trim().slice(0, 300), constat: 'F29' });
      }
    }
    function visit(node, skip) {
      const currentSkip = skip || ignored.has(node.tagName);
      if (currentSkip) return;
      if (node.nodeName === '#text') text(node.value || '', node.sourceCodeLocation?.startLine || null);
      for (const attr of node.attrs || []) if (textAttributes.has(attr.name)) text(attr.value, node.sourceCodeLocation?.startLine || null);
      for (const child of node.childNodes || []) visit(child, currentSkip);
    }
    visit(document, false);
  }
  return { pages: pages.length, words, grammar };
}

const baseline = withoutBaseline ? null : vocabulary('main');
const current = vocabulary(reference);
const all = [...current.words.keys()].sort((left, right) => left.localeCompare(right, 'fr'));
const spellable = all.filter(word => /^[\p{L}\p{M}]+$/u.test(word));
const spell = spawnSync('hunspell', ['-d', dictionary, '-l'], {
  input: spellable.join('\n') + '\n', encoding: 'utf8', maxBuffer: 100 * 1024 * 1024, timeout: 120000
});
if (spell.error || spell.status !== 0) throw new Error(`Hunspell indisponible : ${spell.error?.message || spell.stderr}`);
const unknown = [...new Set(spell.stdout.split('\n').map(value => value.trim()).filter(word => word && current.words.has(word)))];
const entries = unknown.map(word => ({ mot: word, nouveauDepuisMain: baseline ? !baseline.words.has(word) : null, ...(current.words.get(word) || { occurrences: null, exemples: [] }) }));
const result = {
  reference: manifest ? 'dossier local, inventaire fourni' : reference || 'dossier local',
  baseline: baseline ? 'main' : null,
  population: { pagesReference: baseline?.pages ?? null, pagesAnalysees: current.pages, motsReference: baseline?.words.size ?? null, motsAnalyses: current.words.size, motsSoumisAHunspell: spellable.length, motsCompositesNonSoumis: all.length - spellable.length },
  dictionnaire: 'Hunspell avec dictionary-fr 3.0.0 (dictionnaire français Grammalecte)',
  nouveauxMots: baseline ? all.filter(word => !baseline.words.has(word)) : null,
  inconnus: entries,
  candidatsVousSingulierEtF29: current.grammar,
  limites: [
    'Les mots techniques, noms propres, autres langues et fragments de notation sont des candidats à qualifier, pas des erreurs établies.',
    'Les mots composites ou contenant des chiffres et apostrophes ne sont pas soumis à Hunspell dans cette mesure afin de ne pas attribuer à tort ses fragments à de nouveaux mots.',
    'Le texte du DOM HTML statique et les attributs lisibles sont contrôlés ; les textes construits dynamiquement par JavaScript et les chaînes non insérées dans les pages ne sont pas exhaustivement couverts.',
    'Hunspell ne démontre ni l’absence de mots coupés ni les accords grammaticaux : le repérage Vous + singulier utilise une liste partielle et F29 est recherché séparément.',
    ...(baseline ? [] : ['La référence main n’a pas été lue : la comparaison de vocabulaire et les nouveautés depuis main ne sont pas évaluées.']),
    'Les nouveaux mots et les candidats linguistiques exigent une relecture humaine ; un zéro de cette recherche partielle ne prouve pas l’absence de fautes.'
  ]
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = !baseline || entries.some(entry => entry.nouveauDepuisMain) || current.grammar.length ? 1 : 0;
