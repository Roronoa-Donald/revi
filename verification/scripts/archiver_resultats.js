'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const save = (file, value) => fs.writeFileSync(path.join(root, file), JSON.stringify(value, null, 2) + '\n');
const locations = values => values.map(({ file, line }) => ({ file, line }));
const samples = read('echantillons.json');
const data = read('resultats-automatiques.json');
const browser = read('tmp/navigateur.json');
const formulas = read('tmp/formules.json');
const exerciseResults = read('tmp/exercices-sondes.json');
const probes = read('tmp/sondes-execution.json');
const familySamples = {};
for (const [family, value] of Object.entries(samples.families)) {
  familySamples[family] = {
    course: value.course, chapter1: value.chapter1, random_chapter: value.random_chapter,
    exercises_20: value.exercises_20.map(({ id, course, chapter, language }) => ({ id, course, chapter, language })),
    questions_10: locations(value.questions_10), cards_10: locations(value.cards_10), population: value.population
  };
}
save('echantillons-identifiants.json', { seed: samples.seed, public_pages_60: samples.public_pages_60,
  cards_100: locations(samples.cards_100), families: familySamples });
save('sondes-exercices.json', exerciseResults);
save('balises-30.json', read('tmp/balises-30.json'));
const { input: ignoredInput, ...fractionSummary } = probes.fractions_suivies_de_texte;
save('sondes-execution.json', { ...probes, fractions_suivies_de_texte: fractionSummary });
const selectBrowser = row => ({ file: row.file, httpStatus: row.httpStatus, error: row.error || '',
  h1: row.h1?.length ?? 0, cards: row.cards, cardsFocusable: row.cardsFocusable, questions: row.questions,
  formulaErrors: row.mathErrors?.length ?? 0, scripts: row.scripts?.length ?? 0,
  overflow: row.overflow, imagesWithoutAlt: row.visibleImagesWithoutAlt, pageErrors: row.errors });
const formulaErrors = formulas.errors.map(({ file, line, message }) => ({ file, line, message }));
const fourBands = data.bands.filter(page => page.rows.length === 4);
const duplicatedLowBands = fourBands.filter(page => (page.rows[0].text.match(/<\s*50\s*%/g) || []).length >= 2);
const exactBands = fourBands.filter(page => /^\s*<\s*50\s*%/.test(page.rows[0].text) &&
  /^\s*50\s*[-–]\s*69\s*%/.test(page.rows[1].text) &&
  /^\s*70\s*[-–]\s*94\s*%/.test(page.rows[2].text) && /^\s*≥\s*95\s*%/.test(page.rows[3].text));
save('resultats-tests.json', {
  date: '2026-10-29', summary: data.summary,
  localGit: { branch: 'reparation-k20', head: '463e40b46cf81079ec16de8da49fbdb8f985d877',
    main: 'b533bbda577199d57c3b4ec6e1cfce35478be8d8', added: 306, modified: 1571, deleted: 0 },
  build: { exit: 0, environment: 'copie isolée' },
  test: { passed: 7383, failed: 0, skipped: 0, suites: 14 },
  coursesCheck: { exit: 0, pages: 832, courses: 64 },
  labsCheck: { exit: 0, exercises: 1250, courses: 68 },
  sampledCards: { count: samples.cards_100.length, parserCombinedCount: data.cards.length },
  masteryBands: { detected: fourBands.length, exactLabels: exactBands.length,
    duplicatedLowLabels: duplicatedLowBands.length,
    duplicatedLocations: duplicatedLowBands.map(page => ({ file: page.file, line: page.rows[0].line })) },
  browser: { random: browser.random.map(selectBrowser), targeted: browser.targeted.map(selectBrowser),
    keyboard: browser.keyboard, anchor: browser.anchor },
  formulas: { version: formulas.version, count: formulas.formulas, pages: formulas.pages,
    errors: formulaErrors, doubleCommandCandidates: formulas.suspects.map(({ file, line }) => ({ file, line })) },
  notionComparisons: data.notions.map(({ file, before, after, lost_exact }) =>
    ({ file, before, after, nonMatchingExact: lost_exact.length })),
  chapterWordLossesOver15Percent: data.word_regressions,
  limits: ['Les résultats structuraux ne prouvent pas la validité pédagogique.',
    'Les variantes automatiques ne sont pas toutes sémantiquement incorrectes.',
    'Aucun accès au site déployé et aucun test authentifié avec fournisseur réel.']
});
console.log('Résultats synthétiques conservés ; les copies de travail restent à supprimer.');
