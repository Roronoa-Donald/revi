'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const catalogue = require('/project/server/exercises');
const { runTests } = require('/project/server/exercises/runner');
const selection = JSON.parse(fs.readFileSync('/audit/echantillons.json', 'utf8'));
const oldResults = JSON.parse(fs.readFileSync('/audit/sondes-exercices.json', 'utf8'));
const missingIds = new Set(oldResults.filter(item => !item.solution.executed).map(item => item.id));
const home = '/work';
fs.writeFileSync(path.join(home, 'NuGet.Config'), '<configuration><packageSources><clear /></packageSources></configuration>');
const baseEnv = {
  PATH: '/usr/bin:/bin',
  HOME: home,
  LANG: 'C.UTF-8',
  DOTNET_CLI_HOME: home,
  DOTNET_SKIP_FIRST_TIME_EXPERIENCE: '1',
  DOTNET_CLI_TELEMETRY_OPTOUT: '1',
  DOTNET_NOLOGO: '1',
  DOTNET_MULTILEVEL_LOOKUP: '0',
  NUGET_PACKAGES: path.join(home, 'nuget'),
  POWERSHELL_TELEMETRY_OPTOUT: '1'
};

function execute(command, args, input, timeout = 10000) {
  const result = childProcess.spawnSync(command, args, {
    input,
    encoding: 'utf8',
    timeout,
    maxBuffer: 1024 * 1024,
    cwd: home,
    env: baseEnv
  });
  return {
    ok: result.status === 0 && !result.error,
    stdout: result.stdout || '',
    stderr: result.stderr || (result.error ? result.error.message : ''),
    exitCode: result.status,
    status: result.status === 0 && !result.error ? 'success' : 'runtime_error'
  };
}

function prepare(language, code, exerciseId, variant) {
  const dir = path.join(home, exerciseId + '-' + variant);
  fs.mkdirSync(dir, { recursive: true });
  if (language === 'powershell') {
    const file = path.join(dir, 'programme.ps1');
    fs.writeFileSync(file, code);
    return { command: '/runtimes/powershell/pwsh', args: ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', file] };
  }
  if (language === 'java') {
    const file = path.join(dir, 'Main.java');
    fs.writeFileSync(file, code);
    const compilation = execute('/runtimes/jdk/bin/javac', ['-encoding', 'UTF-8', '-d', dir, file], '', 30000);
    return compilation.ok
      ? { command: '/runtimes/jdk/bin/java', args: ['-cp', dir, 'Main'] }
      : { compilationError: compilation.stderr.slice(0, 200) };
  }
  if (language === 'csharp') {
    const source = path.join(dir, 'Programme.cs');
    const output = path.join(dir, 'Audit.dll');
    const refs = '/usr/share/dotnet/packs/Microsoft.NETCore.App.Ref/10.0.12/ref/net10.0';
    const compiler = '/usr/share/dotnet/sdk/10.0.401/Roslyn/bincore/csc.dll';
    const response = path.join(dir, 'references.rsp');
    fs.writeFileSync(source, code);
    fs.writeFileSync(response, fs.readdirSync(refs).filter(file => file.endsWith('.dll')).map(file => '-r:' + path.join(refs, file)).join('\n'));
    fs.writeFileSync(path.join(dir, 'Audit.runtimeconfig.json'), JSON.stringify({ runtimeOptions: { tfm: 'net10.0', framework: { name: 'Microsoft.NETCore.App', version: '10.0.12' } } }));
    const compilation = execute('/usr/share/dotnet/dotnet', [compiler, '-nologo', '-nostdlib+', '-target:exe', '-out:' + output, '@' + response, source], '', 30000);
    return compilation.ok
      ? { command: '/usr/share/dotnet/dotnet', args: [output] }
      : { compilationError: (compilation.stderr || compilation.stdout).slice(-300) };
  }
  return { compilationError: 'langage non pris en charge par ce complément' };
}

function mutation(exercise, variant) {
  if (variant === 1) {
    const replacements = [[/>=/, '<'], [/<=/, '>'], [/==/, '!='], [/-eq\b/, '-ne'], [/-gt\b/, '-le'], [/\*\s*2\b/, '* 3']];
    const replacement = replacements.find(([pattern]) => pattern.test(exercise.solution));
    return replacement
      ? { code: exercise.solution.replace(replacement[0], replacement[1]), method: 'comparaison ou constante modifiée' }
      : { code: exercise.solution + '\n', method: 'aucune mutation significative trouvée' };
  }
  const fixed = String(exercise.tests[0]?.expected || '');
  if (exercise.language === 'powershell') return { code: `[Console]::Write('${fixed.replace(/'/g, "''")}')`, method: 'sortie figée du premier cas' };
  if (exercise.language === 'java') return { code: `public class Main { public static void main(String[] args) { System.out.print(${JSON.stringify(fixed)}); } }`, method: 'sortie figée du premier cas' };
  return { code: `using System; class Program { static void Main() { Console.Write(${JSON.stringify(fixed)}); } }`, method: 'sortie figée du premier cas' };
}

async function grade(exercise, code, variant) {
  const prepared = prepare(exercise.language, code, exercise.id, variant);
  if (prepared.compilationError) return { executed: false, correct: false, reason: 'compilation impossible : ' + prepared.compilationError };
  const result = await runTests(exercise, code, {
    execute: async payload => execute(prepared.command, prepared.args, payload.stdin || '')
  });
  return {
    executed: true,
    correct: result.ok && result.passed === result.total && !result.stop,
    passed: result.passed,
    total: result.total,
    reason: result.error?.code || result.stop?.reason || ''
  };
}

function escapedCSharp(input) {
  return input.replace(/\\/g, '\\\\').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/"/g, '\\"');
}

async function main() {
  const rows = [];
  for (const [family, familySample] of Object.entries(selection.families)) {
    for (const selected of familySample.exercises_20.filter(item => missingIds.has(item.id))) {
      const exercise = catalogue.getExercise(selected.id);
      const first = mutation(exercise, 1);
      const second = mutation(exercise, 2);
      const row = {
        family,
        course: exercise.course,
        id: exercise.id,
        language: exercise.language,
        solution: await grade(exercise, exercise.solution, 'solution'),
        mutant1_method: first.method,
        mutant1: await grade(exercise, first.code, 'mutant1'),
        mutant2_method: second.method,
        mutant2: await grade(exercise, second.code, 'mutant2')
      };
      rows.push(row);
      console.log(JSON.stringify(row));
    }
  }
  const csharp = catalogue.listExercises().filter(exercise => exercise.course === 'csharp');
  const csharpAnalysis = csharp.map(exercise => ({
    id: exercise.id,
    allHiddenInputsLiteral: exercise.tests.every(test => exercise.solution.includes(escapedCSharp(test.stdin))),
    literalInputComparisons: (exercise.solution.match(/\binput\s*==\s*"/g) || []).length,
    hasFinalElse: /\belse\s*\{/.test(exercise.solution),
    hasLoop: /\b(?:for|foreach|while)\s*\(/.test(exercise.solution)
  }));
  const example = catalogue.getExercise('csb2-c5-e1');
  const prepared = prepare('csharp', example.solution, example.id, 'nouveau-cas');
  const synthetic = prepared.compilationError ? null : execute(prepared.command, prepared.args, 'FILTER Prix >= 20.0\nArticle Nom=Autre Prix=35.0\n');
  const result = {
    seed: selection.seed,
    isolation: 'processus lancés dans bwrap sans réseau, système hôte en lecture seule',
    rows,
    csharp: {
      catalogueSize: csharp.length,
      allHiddenInputsLiteral: csharpAnalysis.filter(item => item.allHiddenInputsLiteral).length,
      exactlyFourInputComparisons: csharpAnalysis.filter(item => item.literalInputComparisons === 4).length,
      finalElse: csharpAnalysis.filter(item => item.hasFinalElse).length,
      withLoop: csharpAnalysis.filter(item => item.hasLoop).length,
      entries: csharpAnalysis,
      syntheticCase: {
        exercise: example.id,
        validInput: 'FILTER Prix >= 20.0 ; Article Nom=Autre Prix=35.0',
        shouldInclude: 'Autre - 35.00',
        executed: !!synthetic && synthetic.ok,
        outputEmpty: !!synthetic && synthetic.stdout.trim() === '',
        compilationError: prepared.compilationError || ''
      }
    }
  };
  fs.writeFileSync('/work/sondes-complementaires.json', JSON.stringify(result, null, 2));
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
