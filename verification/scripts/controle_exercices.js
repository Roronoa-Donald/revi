'use strict';

const fs = require('fs');
const childProcess = require('child_process');
const crypto = require('crypto');
const catalogue = require('/project/server/exercises');
const execution = require('/project/server/services/execution');
const local = require('/project/server/services/execution/local-runner');
const { runTests } = require('/project/server/exercises/runner');

const sample = JSON.parse(fs.readFileSync('/audit/echantillons.json', 'utf8'));
const output = [];

function nativeCommand(command, args, input, timeout = 3000) {
  const result = childProcess.spawnSync(command, args, {
    input,
    encoding: 'utf8',
    timeout,
    maxBuffer: 1024 * 1024,
    cwd: '/tmp',
    env: { PATH: '/node/bin:/usr/bin:/bin', HOME: '/tmp', LANG: 'C.UTF-8' }
  });
  return {
    ok: result.status === 0 && !result.error,
    stdout: result.stdout || '',
    stderr: result.stderr || (result.error ? result.error.message : ''),
    exitCode: result.status,
    status: result.status === 0 && !result.error ? 'success' : 'runtime_error'
  };
}

function mutateAnalysis(code, variant) {
  const lines = code.split('\n');
  const sections = [];
  for (let index = 0; index < lines.length; index++) {
    if (/^\[cas\s*\d+/i.test(lines[index].trim())) sections.push(index);
  }
  if (!sections.length) return { code: code + '\nERREUR', method: 'réponse erronée ajoutée' };
  const section = variant === 1 ? sections[0] : sections[sections.length - 1];
  const end = lines.findIndex((line, index) => index > section && /^\[(?:cas|exemple)/i.test(line.trim()));
  const limit = end === -1 ? lines.length : end;
  const answerIndex = lines.findIndex((line, index) => index > section && index < limit && line.trim() && !line.trim().startsWith('#'));
  if (answerIndex < 0) return { code: code + '\nERREUR', method: 'réponse erronée ajoutée' };
  if (variant === 2) {
    lines.splice(answerIndex, 1);
    return { code: lines.join('\n'), method: 'première ligne du dernier cas omise' };
  }
  const answer = lines[answerIndex];
  const switcher = [
    [/\bOUI\b/i, 'NON'], [/\bNON\b/i, 'OUI'], [/\bVRAI\b/i, 'FAUX'], [/\bFAUX\b/i, 'VRAI'],
    [/\bOK\b/i, 'ERREUR'], [/\bVALIDE\b/i, 'NON_VALIDE'], [/\b\d+\b/, value => String(Number(value) + 1)]
  ];
  const selected = switcher.find(([pattern]) => pattern.test(answer));
  lines[answerIndex] = selected ? answer.replace(selected[0], selected[1]) : `NON ${answer}`;
  return { code: lines.join('\n'), method: 'valeur ou affirmation du premier cas altérée' };
}

function mutateProgram(code, language, variant, exercise) {
  if (language === 'analyse') return mutateAnalysis(code, variant);
  if (language === 'sql') {
    if (variant === 1) {
      const options = [[/\bASC\b/i, 'DESC'], [/\bDESC\b/i, 'ASC'], [/\bWHERE\b/i, 'WHERE NOT'], [/\bCOUNT\s*\(\s*\*\s*\)/i, 'COUNT(NULL)']];
      const selected = options.find(([pattern]) => pattern.test(code));
      return selected ? { code: code.replace(selected[0], selected[1]), method: 'ordre ou filtre inversé' } : { code: code.replace(/;\s*$/, ' LIMIT 1;'), method: 'résultat limité à une ligne' };
    }
    return { code: code.replace(/\bSELECT\b/i, 'SELECT DISTINCT'), method: 'suppression hypothétique des doublons' };
  }
  if (variant === 2) {
    const fixed = String(exercise.tests[0]?.expected || '');
    if (language === 'python') return { code: `print(${JSON.stringify(fixed)}, end='')`, method: 'sortie figée du premier cas' };
    if (language === 'javascript') return { code: `process.stdout.write(${JSON.stringify(fixed)});`, method: 'sortie figée du premier cas' };
    if (language === 'shell') return { code: `printf '%s' ${JSON.stringify(fixed)}`, method: 'sortie figée du premier cas' };
    if (language === 'php') return { code: `<?php echo base64_decode('${Buffer.from(fixed).toString('base64')}');`, method: 'sortie figée du premier cas' };
    if (language === 'c' || language === 'cpp') return { code: `#include <stdio.h>\nint main(void){printf("%s",${JSON.stringify(fixed)});return 0;}`, method: 'sortie figée du premier cas' };
  }
  const lines = code.split('\n');
  const options = [[/\>=/, '>'], [/\<=/, '<'], [/==/, '!='], [/\bASC\b/i, 'DESC'], [/\+\s*1\b/, '- 1'], [/\b\d+\b/, value => String(Number(value) + 1)]];
  for (let index = 0; index < lines.length; index++) {
    const trimmed = lines[index].trim();
    if (!trimmed || /^(#|\/\/|--|\/\*|\*)/.test(trimmed)) continue;
    const selected = options.find(([pattern]) => pattern.test(lines[index]));
    if (selected) {
      lines[index] = lines[index].replace(selected[0], selected[1]);
      return { code: lines.join('\n'), method: 'comparaison ou constante modifiée' };
    }
  }
  return { code: code + '\n', method: 'aucune mutation significative trouvée' };
}

function prepareNative(language, code) {
  if (language === 'python') return { command: '/usr/bin/python3', args: ['-I', '-c', code] };
  if (language === 'javascript') return { command: '/node/bin/node', args: ['--max-old-space-size=96', '-e', code] };
  if (language === 'shell') return { command: '/bin/bash', args: ['-c', code] };
  if (language === 'php') {
    const filename = `/tmp/${crypto.createHash('sha256').update(code).digest('hex').slice(0, 20)}.php`;
    fs.writeFileSync(filename, code);
    return { command: '/project/tools/php-cli/php', args: ['-n', filename] };
  }
  if (language === 'c' || language === 'cpp') {
    const filename = `/tmp/audit-${crypto.createHash('sha256').update(code).digest('hex').slice(0, 20)}`;
    const compiler = language === 'c' ? '/usr/bin/gcc' : '/usr/bin/g++';
    const args = language === 'c' ? ['-x', 'c', '-std=gnu11', '-', '-o', filename, '-lm'] : ['-x', 'c++', '-std=gnu++17', '-', '-o', filename, '-lm'];
    const compiled = nativeCommand(compiler, args, code, 10000);
    if (!compiled.ok) return { compileError: compiled.stderr.slice(0, 300) };
    return { command: filename, args: [] };
  }
  return null;
}

async function grade(exercise, code) {
  let prepared = null;
  if (!['analyse', 'sql'].includes(exercise.language)) {
    prepared = prepareNative(exercise.language, code);
    if (!prepared) return { executed: false, reason: `runtime ${exercise.language} non préparé` };
    if (prepared.compileError) return { executed: true, correct: false, reason: 'erreur de compilation' };
  }
  const result = await runTests(exercise, code, {
    execute: async payload => {
      if (exercise.language === 'analyse') return execution.normalizeResponse(await local.runAnalyse(payload.code, payload.stdin), 'local');
      if (exercise.language === 'sql') return execution.normalizeResponse(await local.runSql(payload.code, payload.stdin, 3000), 'local');
      return nativeCommand(prepared.command, prepared.args, payload.stdin || '');
    }
  });
  return { executed: true, correct: result.ok && result.passed === result.total && !result.stop, passed: result.passed, total: result.total, reason: result.error?.code || result.stop?.reason || '' };
}

async function main() {
  for (const [family, selection] of Object.entries(sample.families)) {
    for (const selected of selection.exercises_20) {
      const exercise = catalogue.getExercise(selected.id);
      const first = mutateProgram(exercise.solution, exercise.language, 1, exercise);
      const second = mutateProgram(exercise.solution, exercise.language, 2, exercise);
      const row = {
        family,
        course: exercise.course,
        id: exercise.id,
        language: exercise.language,
        solution: await grade(exercise, exercise.solution),
        mutant1_method: first.method,
        mutant1: await grade(exercise, first.code),
        mutant2_method: second.method,
        mutant2: await grade(exercise, second.code)
      };
      output.push(row);
      console.log(JSON.stringify(row));
      fs.writeFileSync('/resultats/exercices-sondes.json', JSON.stringify(output, null, 2));
    }
  }
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
