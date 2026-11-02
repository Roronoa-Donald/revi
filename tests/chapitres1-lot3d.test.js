'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const catalogue = require('../server/exercises');
const policy = require('../server/exercises/grading-policy');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const cases = exercise => [...exercise.starter.matchAll(/\[Cas (\d+)[^\]]*\]([\s\S]*?)(?=\n\[Cas |$)/gu)]
  .map(match => ({ number: Number(match[1]), data: [...match[2].matchAll(/^# Données : (.*)$/gmu)].map(item => item[1]) }));
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(' ');
const normalize = value => value.replace(/\s+/gu, ' ').trim();
const execute = async ({ code, stdin }) => {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, stdout: result.data.stdout };
};

function networkOracle(id, data) {
  const count = Number(data[0]);
  const rows = data.slice(1).map(row => row.split(' '));
  assert.equal(rows.length, count);
  const names = { p: 'PAN', l: 'LAN', w: 'WLAN', m: 'MAN', g: 'WAN' };
  const output = rows.map(([name, value]) => `${name} : ${id === 're-c1-e1'
    ? (value === 'local' ? 'LAN' : 'WAN')
    : id === 're-c1-e2' ? (value === 'pairapair' ? 'workgroup' : 'client-serveur') : names[value]}`);
  if (id === 're-c1-e1') {
    output.push(`lan : ${rows.filter(row => row[1] === 'local').length}`);
    output.push(`wan : ${rows.filter(row => row[1] === 'etendu').length}`);
  } else if (id === 're-c1-e2') output.push(`centralises : ${rows.some(row => row[1] === 'centralise') ? 'oui' : 'non'}`);
  else output.push(`wlan : ${rows.filter(row => row[1] === 'w').length}/${count}`);
  return output.join('\n');
}

test('les trois grilles réseaux correspondent aux données et ne publient pas leurs attendus complets', async () => {
  for (const id of ['re-c1-e1', 're-c1-e2', 're-c1-e3']) {
    const exercise = catalogue.getExercise(id);
    const visible = catalogue.toClient(exercise);
    const fields = [text(parse5.parseFragment(visible.brief)), visible.starter, ...visible.hints].map(normalize);
    assert.equal(Object.hasOwn(visible, 'tests'), false);
    assert.equal(Object.hasOwn(visible, 'solution'), false);
    for (const expected of [...exercise.tests, ...exercise.examples].map(item => normalize(item.expected))) {
      assert.ok(fields.every(field => !field.includes(expected)), id);
    }
    for (const item of cases(exercise)) {
      const selected = exercise.tests.find(candidate => candidate.stdin === `cas:${item.number}`);
      assert.equal(selected.expected, networkOracle(id, item.data), id);
      assert.equal((await runTests({ ...exercise, tests: [selected] }, exercise.solution, { execute })).passed, 1);
      const lines = selected.expected.split('\n');
      const wrongRows = [...lines];
      wrongRows[0] = wrongRows[0].replace(/: .+$/u, ': type incorrect');
      const wrongCount = [...lines];
      wrongCount[wrongCount.length - 1] = 'bilan incorrect';
      for (const wrong of [wrongRows, wrongCount]) {
        const answer = `[Cas ${item.number}]\n${wrong.join('\n')}`;
        assert.equal((await runTests({ ...exercise, tests: [selected] }, answer, { execute })).passed, 0, id);
      }
    }
  }
});

test('le cours distingue un WLAN des autres réseaux sans fil', () => {
  const chapter = require('../server/content/b1-reseaux/chapitres-1-3')[0];
  const lesson = chapter.sections.map(section => section.html).join(' ');
  assert.match(lesson, /un WLAN est aussi un LAN/i);
  assert.match(lesson, /un PAN peut être sans fil/i);
  assert.match(catalogue.getExercise('re-c1-e3').brief, /décompte concerne uniquement les WLAN/i);
});

test('les limites de l’URL, de l’idempotence et des familles HTTP sont explicites', () => {
  const chapter = require('../server/content/b1-prog-web/chapitres-1-3')[0];
  const lesson = chapter.sections.map(section => section.html).join(' ');
  assert.match(lesson, /une opération particulière peut être idempotente/i);
  assert.match(lesson, /ne prouve ni la cause exacte ni la validité/i);
  assert.match(lesson, /HEAD.*OPTIONS.*TRACE/s);
  const url = catalogue.getExercise('web-c1-e1');
  assert.match(url.brief, /autorité/);
  assert.match(url.brief, /sans fragment ni identifiants/);
  assert.match(catalogue.getExercise('web-c1-e3').brief, /ne garantit pas cette propriété/);
});

test('SQL annonce les requêtes dans les objectifs et Linux signale sa convention', () => {
  const sql = require('../server/content/b1-sql/chapitres-1-3')[0];
  const linux = require('../server/content/b1-linux/chapitres-1-3')[0];
  assert.ok(sql.objectives.some(objective => /SELECT.*DISTINCT.*ORDER BY/.test(objective)));
  assert.match(sql.sections[0].html, /Un tableur peut aussi organiser, filtrer et partager/);
  assert.match(linux.sections.map(section => section.html).join(' '), /Ce n’est pas une normalisation/);
  assert.equal(policy.isGradingSuspended('b1-linux', 'lx-c1-e1'), true);
});

test('le chapitre algorithmique explicite le quotient plancher et la convention de remise', () => {
  const lesson = fs.readFileSync(path.join(__dirname, '../b1-algo/chapitres/chapitre1.html'), 'utf8');
  assert.match(lesson, /-7 \/\/ 4<\/code> vaut <code>-2/);
  assert.match(lesson, /arrondit la remise vers le bas avant de la soustraire/);
  assert.equal(policy.isGradingSuspended('b1-algo', 'algo-c1-e2'), true);
});

test('le cours C distingue pointeur vers le tableau et adresse du scalaire', () => {
  const lesson = fs.readFileSync(path.join(__dirname, '../b1-c-cpp/chapitres/chapitre1.html'), 'utf8');
  assert.match(lesson, /converti en pointeur vers son premier caractère/);
  assert.match(lesson, /comportement indéfini/);
  assert.match(lesson, /combien de conversions ont réussi/);
  const exercise = catalogue.getExercise('c-c1-e1');
  assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), true);
  assert.doesNotMatch(exercise.hints.join(' '), /seule variable/);
});

test('une mutation de la division des minutes est désormais interceptée par la suite de tests', async () => {
  const exercise = catalogue.getExercise('algo-c1-e3');
  assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), true);
  const mutant = exercise.solution.replace('(total % 3600) // 60', '(total % 3600) // 61');
  assert.notEqual(mutant, exercise.solution);
  const provider = async ({ code, stdin }) => {
    const result = spawnSync('/usr/bin/bwrap', [
      '--die-with-parent', '--unshare-all', '--new-session', '--clearenv', '--cap-drop', 'ALL',
      '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
      '--symlink', 'usr/lib', '/lib64', '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
      '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp',
      '/usr/bin/python3', '-I', '-B', '-c', code
    ], { input: stdin, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024 });
    if (result.error) throw result.error;
    return { ok: result.status === 0, status: result.status === 0 ? 'success' : 'runtime_error',
      stdout: result.stdout, stderr: result.stderr, exitCode: result.status };
  };
  const execution = await runTests(exercise, mutant, { execute: provider });
  assert.equal(execution.stop?.reason, 'wrong_output');
});
