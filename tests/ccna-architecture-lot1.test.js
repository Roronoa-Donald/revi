'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const ccna = require('../server/exercises/b1-ccna1');
const architecture = require('../server/exercises/b1-architecture');
const architectureCourse = require('../server/content/b1-architecture');
const architectureChapters = require('../server/content/b1-architecture/chapitres-1-3');
const courseKit = require('../scripts/course-kit');

function exerciseById(catalogue, id) {
  const exercise = catalogue.find(item => item.id === id);
  assert.ok(exercise, `Exercice introuvable : ${id}`);
  assert.equal(exercise.language, 'analyse');
  return exercise;
}

function starterCases(starter) {
  const cases = new Map();
  let current;
  for (const line of starter.split(/\r?\n/)) {
    const header = /^\[Cas\s+(\d+)\s+—\s+(.+)\]$/.exec(line);
    if (header) {
      const key = `cas:${header[1]}`;
      assert.ok(!cases.has(key), `Cas dupliqué : ${key}`);
      current = { label: header[2], data: [] };
      cases.set(key, current);
      continue;
    }
    const datum = /^# Données :\s*(.*)$/.exec(line);
    if (datum) {
      assert.ok(current, 'Donnée sans cas');
      current.data.push(datum[1]);
    }
  }
  assert.ok(cases.size > 0, 'Aucun cas dans la grille');
  return cases;
}

function solutionSections(solution) {
  const sections = new Map();
  let current;
  for (const rawLine of solution.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const example = /^\[Exemple\]$/i.test(line);
    const caseHeader = /^\[Cas\s+(\d+)\s+—\s+(.+)\]$/.exec(line);
    if (example || caseHeader) {
      const key = example ? 'exemple' : `cas:${caseHeader[1]}`;
      assert.ok(!sections.has(key), `Section du corrigé dupliquée : ${key}`);
      current = { label: caseHeader && caseHeader[2], lines: [] };
      sections.set(key, current);
    } else {
      assert.ok(current, 'Réponse sans section de corrigé');
      current.lines.push(line);
    }
  }
  return sections;
}

function inputLines(input) {
  return input.trim().split(/\r?\n/).map(line => line.trim());
}

function countedRows(data, extraLines = 0) {
  assert.match(data[0] || '', /^\d+$/, 'Nombre de lignes invalide');
  const count = Number(data[0]);
  assert.ok(Number.isSafeInteger(count) && count > 0, 'Nombre de lignes hors domaine');
  assert.equal(data.length, count + extraLines + 1, 'Nombre de données incohérent');
  return data.slice(1 + extraLines);
}

function verifyGrid(exercise, evaluate) {
  const cases = starterCases(exercise.starter);
  const sections = solutionSections(exercise.solution);
  assert.equal(exercise.examples.length, 1, `${exercise.id} : un exemple attendu`);
  assert.equal(exercise.tests.length, cases.size, `${exercise.id} : couverture des cas`);
  assert.equal(sections.size, cases.size + 1, `${exercise.id} : sections du corrigé`);

  const example = exercise.examples[0];
  const exampleExpected = evaluate(inputLines(example.stdin));
  assert.equal(example.expected, exampleExpected, `${exercise.id} : exemple`);
  assert.ok(sections.has('exemple'), `${exercise.id} : corrigé de l'exemple`);
  assert.equal(sections.get('exemple').lines.join('\n'), exampleExpected, `${exercise.id} : corrigé de l'exemple`);

  const pending = new Set(cases.keys());
  for (const caseTest of exercise.tests) {
    assert.ok(pending.delete(caseTest.stdin), `${exercise.id} : sélecteur invalide ou dupliqué ${caseTest.stdin}`);
    const caseData = cases.get(caseTest.stdin);
    const section = sections.get(caseTest.stdin);
    assert.ok(section, `${exercise.id} : corrigé manquant pour ${caseTest.stdin}`);
    assert.equal(caseTest.label, caseData.label, `${exercise.id} : intitulé du test`);
    assert.equal(section.label, caseData.label, `${exercise.id} : intitulé du corrigé`);
    const expected = evaluate(caseData.data);
    assert.equal(caseTest.expected, expected, `${exercise.id} : attendu de ${caseTest.stdin}`);
    assert.equal(section.lines.join('\n'), expected, `${exercise.id} : corrigé de ${caseTest.stdin}`);
  }
  assert.equal(pending.size, 0, `${exercise.id} : cas sans test`);
}

function exactRatio(numerator, denominator) {
  const whole = numerator / denominator;
  let remainder = numerator % denominator;
  if (remainder === 0n) return String(whole);
  let fraction = '';
  while (remainder !== 0n) {
    remainder *= 10n;
    fraction += String(remainder / denominator);
    remainder %= denominator;
  }
  return `${whole}.${fraction}`;
}

test('F130 : les tâches sont vérifiées dans chacun des deux modèles', () => {
  const exercise = exerciseById(ccna, 'cc-c2-e3');
  const layers = {
    osi: { codage: 'presentation', session: 'session', routage: 'reseau', ports: 'transport', cables: 'physique' },
    tcp5: { codage: 'application', session: 'application', routage: 'internet', ports: 'transport', cables: 'physique' }
  };
  const coverage = new Set();
  verifyGrid(exercise, data => {
    const rows = countedRows(data);
    let correct = 0;
    const output = rows.map(row => {
      const [task, model, layer, extra] = row.split(' ');
      assert.equal(extra, undefined, `Ligne hors format : ${row}`);
      assert.ok(Object.hasOwn(layers, model), `Modèle inconnu : ${model}`);
      assert.ok(Object.hasOwn(layers[model], task), `Tâche inconnue : ${task}`);
      const valid = layers[model][task] === layer;
      if (valid) coverage.add(`${task} ${model}`);
      correct += Number(valid);
      return `${task} : ${valid ? 'conforme' : 'a revoir'}`;
    });
    return [...output, `conformes : ${correct}/${rows.length}`].join('\n');
  });
  for (const task of Object.keys(layers.osi)) {
    assert.ok(coverage.has(`${task} osi`));
    assert.ok(coverage.has(`${task} tcp5`));
  }
});

test('F134 : show version est disponible dans les deux modes EXEC', () => {
  const exercise = exerciseById(ccna, 'cc-c5-e1');
  const permitted = {
    enable: ['user'],
    configure: ['enable'],
    exit: ['user', 'enable', 'config'],
    showversion: ['user', 'enable'],
    reload: ['enable']
  };
  const coverage = new Set();
  verifyGrid(exercise, data => {
    const rows = countedRows(data);
    let correct = 0;
    const output = rows.map(row => {
      const [command, mode, extra] = row.split(' ');
      assert.equal(extra, undefined, `Ligne hors format : ${row}`);
      assert.ok(Object.hasOwn(permitted, command), `Commande inconnue : ${command}`);
      assert.ok(['user', 'enable', 'config'].includes(mode), `Mode inconnu : ${mode}`);
      const valid = permitted[command].includes(mode);
      coverage.add(`${command} ${mode}`);
      correct += Number(valid);
      return `${command} : ${valid ? 'OK' : 'REFUSE'}`;
    });
    return [...output, `valides : ${correct}/${rows.length}`].join('\n');
  });
  for (const combination of ['showversion user', 'showversion enable', 'showversion config', 'reload user', 'reload enable', 'exit user', 'exit config']) {
    assert.ok(coverage.has(combination), `Cas manquant : ${combination}`);
  }
});

test('F137 : chaque code IPv4 appartient au domaine et suit la table des étapes', () => {
  const exercise = exerciseById(ccna, 'cc-c6-e2');
  const steps = ['svi', 'ipaddress', 'noshutdown', 'gateway', 'nameserver'];
  const domainText = /commande un code parmi ([\s\S]*?)\. Étapes/.exec(exercise.brief);
  assert.ok(domainText, 'Domaine des commandes absent');
  const domain = [...domainText[1].matchAll(/<code>([^<]+)<\/code>/g)].map(match => match[1]);
  assert.deepEqual(domain, steps);
  const hintedSteps = [...exercise.hints[0].matchAll(/(\d)-([a-z]+)/g)];
  assert.deepEqual(hintedSteps.map(match => [Number(match[1]), match[2]]), steps.map((code, index) => [index + 1, code]));

  verifyGrid(exercise, data => {
    const rows = countedRows(data);
    let correct = 0;
    const output = rows.map(row => {
      const match = /^(\d+) ([a-z-]+)$/.exec(row);
      assert.ok(match, `Ligne IPv4 invalide : ${row}`);
      const step = Number(match[1]);
      const command = match[2];
      assert.ok(step >= 1 && step <= steps.length, `Étape hors domaine : ${step}`);
      assert.ok(domain.includes(command), `Commande hors domaine : ${command}`);
      const valid = steps[step - 1] === command;
      correct += Number(valid);
      return `etape ${step} : ${valid ? 'OK' : 'NON'}`;
    });
    return [...output, `justes : ${correct}/${rows.length}`].join('\n');
  });
});

test('F139 : les conversions Ko, Mo et Go conservent les fractions exactes', () => {
  const exercise = exerciseById(architecture, 'ar-c1-e2');
  const exampleInBrief = /(\d+) ko = <code>([0-9.]+)<\/code> mo/.exec(exercise.brief);
  assert.ok(exampleInBrief, 'Exemple décimal absent de la consigne');
  assert.equal(exampleInBrief[2], exactRatio(BigInt(exampleInBrief[1]), 1024n));
  assert.match(exercise.brief, /décimale? exacte?/);
  assert.doesNotMatch(exercise.brief + exercise.hints.join(' '), /division entière|résultat entier/i);
  const covered = new Set();

  verifyGrid(exercise, data => {
    const rows = countedRows(data);
    const output = rows.map(row => {
      const match = /^(\d+) (ko|mo|go)$/.exec(row);
      assert.ok(match, `Taille hors domaine : ${row}`);
      const value = BigInt(match[1]);
      const unit = match[2];
      covered.add(row);
      const converted = unit === 'ko' ? exactRatio(value, 1024n) : String(unit === 'go' ? value * 1024n : value);
      return `${row} : ${converted} mo`;
    });
    return [...output, `conversions : ${rows.length}`].join('\n');
  });
  assert.ok(covered.has('512 ko'), 'La demi-unité doit être couverte');
  assert.ok(covered.has('1 ko'), 'La précision maximale doit être couverte');
});

test('F139 : les codes historiques ne contredisent pas les unités binaires et décimales normalisées', () => {
  const exercise = exerciseById(architecture, 'ar-c1-e2');
  const lesson = architectureChapters[0].sections.find(section => section.title === 'Les unités de mesure');
  assert.match(exercise.brief, /codes historiques[\s\S]*Kio[\s\S]*Mio[\s\S]*Gio/i);
  assert.match(lesson.html, /1 Kio = 1 ?024 octets/);
  assert.match(lesson.html, /1 ko = 1 ?000 octets/);
  const question = architectureChapters[0].questions.find(item => item.q === '1 Mio vaut…');
  assert.ok(question);
  assert.equal(question.opts[question.correct], '1024 Kio');
  const pages = architectureCourse.render(courseKit);
  for (const name of ['chapitres/chapitre1.html', 'chapitres/chapitre2.html', 'chapitres/formules.html', 'chapitres/cartes.html', 'chapitres/simulateur-examen.html']) {
    assert.doesNotMatch(pages[name].body, /1 (?:Ko|Mo|Go|To)\s*=\s*1024\s*(?:octets|Ko|Mo|Go)/i, name);
  }
});

test('F140 : le poids du bit gauche dépend de la longueur réelle', () => {
  const exercise = exerciseById(architecture, 'ar-c2-e1');
  const weight = /bit de gauche a pour poids <code>2\^\(n-(\d+)\)<\/code>/.exec(exercise.brief);
  assert.ok(weight, 'Formule du poids fort absente');
  const offset = Number(weight[1]);
  const lengths = new Set();

  verifyGrid(exercise, data => {
    const rows = countedRows(data);
    const output = rows.map(bits => {
      assert.match(bits, /^[01]{1,10}$/, `Binaire hors domaine : ${bits}`);
      lengths.add(bits.length);
      assert.equal(2 ** (bits.length - offset), 2 ** (bits.length - 1), `Poids fort incorrect pour ${bits}`);
      const decimal = [...bits].reduce((value, bit) => 2 * value + Number(bit), 0);
      return `${bits} : decimal=${decimal}`;
    });
    return [...output, `conversions : ${rows.length}`].join('\n');
  });
  assert.ok(lengths.has(1), 'La borne basse doit être couverte');
  assert.ok(lengths.has(10), 'La borne haute doit être couverte');
});

test('F142 : le décodeur lit a puis b mais adresse les sorties par ba', () => {
  const exercise = exerciseById(architecture, 'ar-c4-e3');
  const mappings = [...exercise.brief.matchAll(/Y([0-3]) pour <code>ba=([01]{2})<\/code>/g)];
  assert.equal(mappings.length, 4, 'Table des adresses incomplète');
  const addresses = new Set();
  for (const mapping of mappings) {
    addresses.add(mapping[2]);
    assert.equal(Number(mapping[1]), parseInt(mapping[2], 2));
  }
  assert.deepEqual([...addresses].sort(), ['00', '01', '10', '11']);
  const indexRule = /<code>indice=(\d+)\*b\+a<\/code>/.exec(exercise.brief);
  assert.ok(indexRule, 'Règle de calcul de l’indice absente');
  const coefficient = Number(indexRule[1]);
  const seen = new Set();

  verifyGrid(exercise, data => {
    const rows = countedRows(data);
    const output = rows.map(row => {
      const match = /^([01]) ([01])$/.exec(row);
      assert.ok(match, `Adresse hors domaine : ${row}`);
      const lowBit = Number(match[1]);
      const highBit = Number(match[2]);
      const index = 2 * highBit + lowBit;
      assert.equal(coefficient * highBit + lowBit, index, `Règle incorrecte pour ${row}`);
      seen.add(row);
      const word = (1 << index).toString(2).padStart(4, '0');
      return `${row} : Y3Y2Y1Y0 = ${word}`;
    });
    return [...output, `decodages : ${rows.length}`].join('\n');
  });
  assert.deepEqual([...seen].sort(), ['0 0', '0 1', '1 0', '1 1']);
});

test('F143 : les états JK découlent de Q initial et de chaque front', () => {
  const exercise = exerciseById(architecture, 'ar-c5-e2');
  const describedInputs = [...exercise.brief.matchAll(/<code>([^<]+)<\/code>/g)].map(match => match[1]);
  assert.deepEqual(describedInputs.slice(0, 3), ['n', 'Q_initial', 'J K']);
  const initialStates = new Set();
  const toggledStates = new Set();
  const transitions = new Set();

  verifyGrid(exercise, data => {
    const rows = countedRows(data, 1);
    assert.match(data[1], /^[01]$/, 'Q initial manquant ou hors domaine');
    let state = Number(data[1]);
    initialStates.add(state);
    const output = rows.map((row, index) => {
      const match = /^([01]) ([01])$/.exec(row);
      assert.ok(match, `Entrée JK hors domaine : ${row}`);
      const set = Number(match[1]);
      const reset = Number(match[2]);
      transitions.add(row);
      if (set === 1 && reset === 1) {
        toggledStates.add(state);
        state = 1 - state;
      } else if (set === 1) {
        state = 1;
      } else if (reset === 1) {
        state = 0;
      }
      return `front ${index + 1} : Q=${state}`;
    });
    return [...output, `etat final : Q=${state}`].join('\n');
  });
  assert.deepEqual([...initialStates].sort(), [0, 1]);
  assert.deepEqual([...toggledStates].sort(), [0, 1]);
  assert.deepEqual([...transitions].sort(), ['0 0', '0 1', '1 0', '1 1']);
});
