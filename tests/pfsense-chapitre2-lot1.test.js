'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const { getExercise, toClient } = require('../server/exercises');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');
const execution = require('../server/services/execution');

const chapterPath = path.join(__dirname, '../b3-pfsense/chapitres/chapitre2.html');

function walk(node) {
  return [node, ...(node.childNodes || []).flatMap(walk)];
}

function text(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
}

function attr(node, name) {
  return (node.attrs || []).find(attribute => attribute.name === name)?.value;
}

function getLab(id) {
  const document = parse5.parse(fs.readFileSync(chapterPath, 'utf8'));
  const lab = walk(document).find(node => node.tagName === 'div' && attr(node, 'id') === id);
  assert.ok(lab, `${id} : atelier absent de la page`);
  return lab;
}

function gridCases(exercise) {
  const cases = [];
  let current = null;
  for (const line of exercise.starter.split('\n')) {
    const header = /^\[Cas (\d+) — (.+)\]$/.exec(line);
    if (header) {
      current = { number: Number(header[1]), label: header[2], lines: [], placeholders: 0 };
      cases.push(current);
    } else if (current && line.startsWith('# Données : ')) {
      current.lines.push(line.slice('# Données : '.length));
    } else if (current && line === 'A_COMPLETER') {
      current.placeholders++;
    }
  }
  for (const [index, entry] of cases.entries()) {
    assert.equal(entry.number, index + 1, `${exercise.id} : numéro de cas incohérent`);
    assert.ok(entry.lines.length, `${exercise.id} : données absentes`);
    assert.equal(entry.placeholders, 1, `${exercise.id} : zone de réponse incohérente`);
  }
  return cases;
}

function fixtures(exercise) {
  const cases = gridCases(exercise);
  assert.equal(cases.length, exercise.tests.length);
  assert.ok(exercise.tests.length <= MAX_TESTS);
  const inputs = exercise.tests.map((entry, index) => {
    assert.equal(entry.stdin, `cas:${index + 1}`);
    assert.equal(entry.label, cases[index].label);
    return { input: cases[index].lines.join('\n'), expected: entry.expected };
  });
  return [...exercise.examples.map(example => ({ input: example.stdin, expected: example.expected })), ...inputs];
}

function aliasAnswer(input) {
  const aliases = new Map();
  const answers = [];
  for (const line of input.split('\n')) {
    const definition = /^ALIAS_DEF name=(\S+) values=(\S+)$/.exec(line);
    if (definition) {
      aliases.set(definition[1], new Set(definition[2].split(',')));
      continue;
    }
    const check = /^CHECK_ALIAS alias=(\S+) target=(\S+)$/.exec(line);
    assert.ok(check, `Vérification non reconnue : ${line}`);
    assert.ok(aliases.has(check[1]), `Alias non défini : ${check[1]}`);
    const result = aliases.get(check[1]).has(check[2]) ? 'YES' : 'NO';
    answers.push(`ALIAS_RESULT alias=${check[1]} target=${check[2]} match=${result}`);
  }
  return answers.join('\n');
}

function stateAnswer(input, exceedsThreshold = age => age > 30) {
  return input.split('\n').map(line => {
    const entry = /^STATE_ENTRY id=(\S+) proto=(tcp|udp) src=\S+ dst=\S+ state=(\S+) age_sec=(\d+)$/.exec(line);
    assert.ok(entry, `Entrée non reconnue : ${line}`);
    const [, id, proto, state, ageText] = entry;
    const age = Number(ageText);
    let alert;
    if (proto === 'tcp' && state === 'SYN_SENT') {
      alert = exceedsThreshold(age) ? 'HALF_OPEN_ATTACK_SUSPECT' : 'HEALTHY_SESSION';
    } else if (proto === 'tcp' && state === 'ESTABLISHED') {
      alert = 'HEALTHY_SESSION';
    } else if (proto === 'tcp' && ['FIN_WAIT', 'TIME_WAIT'].includes(state)) {
      alert = 'CLOSING_SESSION';
    } else if (proto === 'udp' && state === 'SINGLE') {
      alert = 'STATELESS_UDP';
    } else {
      assert.fail(`Entrée hors modèle : ${line}`);
    }
    return `STATE_DIAG id=${id} proto=${proto} state=${state} alert=${alert}`;
  }).join('\n');
}

function stateSubmission(exercise, exceedsThreshold) {
  return [
    '[Exemple]',
    stateAnswer(exercise.examples[0].stdin, exceedsThreshold),
    ...gridCases(exercise).flatMap(entry => [
      `[Cas ${entry.number} — ${entry.label}]`,
      stateAnswer(entry.lines.join('\n'), exceedsThreshold)
    ])
  ].join('\n');
}

async function evaluate(exercise, submission) {
  return runTests(exercise, submission, { execute: payload => execution.execute(payload) });
}

test('pf3-c2-e1 : consigne complète, rendue sans résidu de balise', () => {
  const exercise = getExercise('pf3-c2-e1');
  const errors = [];
  const source = parse5.parseFragment(exercise.brief, { onParseError: error => errors.push(error) });
  assert.deepEqual(errors, []);
  const lab = getLab(exercise.id);
  const rendered = walk(lab).find(node => attr(node, 'class') === 'lab__brief');
  assert.ok(rendered);
  assert.equal(text(rendered).replace(/\s+/g, ' ').trim(), text(source).replace(/\s+/g, ' ').trim());
  assert.doesNotMatch(text(rendered), /<\/code>/);
  assert.match(text(rendered), /ALIAS_DEF name=<nom> values=<valeur1,valeur2,\.\.\.>/);
  assert.match(text(rendered), /CHECK_ALIAS alias=<nom> target=<valeur>/);
  assert.match(text(rendered), /égalité exacte/i);
  assert.match(text(rendered), /sous-réseaux.*plages/i);
  assert.match(text(rendered), /Saisissez une ligne par vérification/);
});

test('pf3-c2-e1 : exemples, cas et corrigé correspondent aux listes de valeurs', async () => {
  const exercise = getExercise('pf3-c2-e1');
  for (const fixture of fixtures(exercise)) assert.equal(aliasAnswer(fixture.input), fixture.expected);
  const exampleResult = await execution.execute({
    language: 'analyse', code: exercise.solution, stdin: exercise.examples[0].stdin
  });
  assert.equal(exampleResult.stdout, exercise.examples[0].expected);
  const report = await evaluate(exercise, exercise.solution);
  assert.equal(report.ok, true);
  assert.equal(report.passed, exercise.tests.length);
  assert.equal(report.stop, null);
});

test('pf3-c2-e3 : modèle borné et règles de seuil affichées dans la page', () => {
  const exercise = getExercise('pf3-c2-e3');
  const lab = getLab(exercise.id);
  const rendered = walk(lab).find(node => attr(node, 'class') === 'lab__brief');
  assert.ok(rendered);
  const brief = text(rendered).replace(/\s+/g, ' ');
  const errors = [];
  const source = parse5.parseFragment(exercise.brief, { onParseError: error => errors.push(error) });
  assert.deepEqual(errors, []);
  assert.equal(brief.trim(), text(source).replace(/\s+/g, ' ').trim());
  assert.match(brief, /modèle pédagogique/i);
  assert.match(brief, /pas.*sortie.*pfctl/i);
  assert.match(brief, /ne prouve pas.*attaque/i);
  assert.match(brief, /age_sec > 30[\s\S]*?HALF_OPEN_ATTACK_SUSPECT/);
  assert.match(brief, /age_sec <= 30[\s\S]*?HEALTHY_SESSION/);
  assert.match(brief, /hors périmètre/i);
  assert.match(brief, /Saisissez une ligne de résultat par entrée/);
  const starter = walk(lab).find(node => node.tagName === 'script' && attr(node, 'data-lab-starter') !== undefined);
  assert.ok(starter);
  assert.equal(text(starter), exercise.starter);
  assert.match(text(starter), /state=SYN_SENT age_sec=5\b/);
  assert.match(text(starter), /state=SYN_SENT age_sec=30\b/);
  assert.match(text(starter), /state=SYN_SENT age_sec=31\b/);
  assert.equal(toClient(exercise).solution, undefined);
  assert.equal(toClient(exercise).tests, undefined);
});

test('pf3-c2-e3 : exemple, trois cas et corrigé respectent le modèle', async () => {
  const exercise = getExercise('pf3-c2-e3');
  const allFixtures = fixtures(exercise);
  assert.equal(exercise.tests.length, 3);
  for (const fixture of allFixtures) assert.equal(stateAnswer(fixture.input), fixture.expected);
  const exampleResult = await execution.execute({
    language: 'analyse', code: exercise.solution, stdin: exercise.examples[0].stdin
  });
  assert.equal(exampleResult.stdout, exercise.examples[0].expected);
  const report = await evaluate(exercise, exercise.solution);
  assert.equal(report.ok, true);
  assert.equal(report.passed, 3);
  assert.equal(report.stop, null);
});

test('pf3-c2 : les réponses cachées ne sont pas exposées dans la page ou la projection', () => {
  for (const id of ['pf3-c2-e1', 'pf3-c2-e3']) {
    const exercise = getExercise(id);
    const rendered = text(getLab(id));
    const client = JSON.stringify(toClient(exercise));
    assert.equal(toClient(exercise).solution, undefined);
    assert.equal(toClient(exercise).tests, undefined);
    for (const entry of exercise.tests) {
      for (const line of entry.expected.split('\n')) {
        assert.ok(!rendered.includes(line), `${id} : réponse cachée présente dans la page`);
        assert.ok(!client.includes(line), `${id} : réponse cachée présente dans la projection`);
      }
    }
  }
});

test('pf3-c2-e3 : deux réponses calculées avec des seuils erronés sont rejetées', async () => {
  const exercise = getExercise('pf3-c2-e3');
  const variants = [
    {
      label: 'seuil inclusif >= 30',
      exceedsThreshold: age => age >= 30,
      witness: 'STATE_ENTRY id=W30 proto=tcp src=10.2.0.1:4100 dst=10.2.0.2:443 state=SYN_SENT age_sec=30',
      expected: 'STATE_DIAG id=W30 proto=tcp state=SYN_SENT alert=HEALTHY_SESSION',
      selector: 'cas:2',
      differingId: '41'
    },
    {
      label: 'seuil retardé > 31',
      exceedsThreshold: age => age > 31,
      witness: 'STATE_ENTRY id=W31 proto=tcp src=10.2.0.3:4101 dst=10.2.0.4:443 state=SYN_SENT age_sec=31',
      expected: 'STATE_DIAG id=W31 proto=tcp state=SYN_SENT alert=HALF_OPEN_ATTACK_SUSPECT',
      selector: 'cas:2',
      differingId: '42'
    }
  ];
  for (const variant of variants) {
    assert.equal(stateAnswer(variant.witness), variant.expected, variant.label);
    assert.notEqual(stateAnswer(variant.witness, variant.exceedsThreshold), variant.expected, variant.label);
    assert.ok(fixtures(exercise).every(fixture => !fixture.input.includes(variant.witness)));
    const submission = stateSubmission(exercise, variant.exceedsThreshold);
    const exampleResult = await execution.execute({
      language: 'analyse', code: submission, stdin: exercise.examples[0].stdin
    });
    assert.equal(exampleResult.stdout, exercise.examples[0].expected, variant.label);
    const report = await evaluate(exercise, submission);
    assert.equal(report.ok, true, variant.label);
    assert.equal(report.stop?.reason, 'wrong_output', variant.label);
    assert.equal(report.stop?.input, variant.selector, variant.label);
    const input = gridCases(exercise)[1].lines.join('\n');
    const expectedLines = stateAnswer(input).split('\n');
    const variantLines = stateAnswer(input, variant.exceedsThreshold).split('\n');
    const differingLines = expectedLines.filter((line, index) => line !== variantLines[index]);
    assert.equal(differingLines.length, 1, variant.label);
    assert.match(differingLines[0], new RegExp(`id=${variant.differingId}\\b`), variant.label);
    assert.equal(report.stop?.actual, variantLines.join('\n'), variant.label);
  }
});
