'use strict';

const { spawnSync } = require('child_process');
const catalogue = require('/project/server/exercises');

const indexed = catalogue.listExercises().filter(exercise =>
  exercise.language === 'shell' && /in_b64=/.test(exercise.solution) && /base64\s*(?:-d|--decode)/.test(exercise.solution)
);

const courses = {};
for (const exercise of indexed) {
  const course = courses[exercise.course] || { scripts: 0, allTestInputsEncoded: 0 };
  course.scripts++;
  const allTestInputsEncoded = exercise.tests.every(test => {
    const normalized = String(test.stdin).replace(/\n+$/, '').replace(/[\t \r]+$/gm, '');
    return exercise.solution.includes(Buffer.from(normalized).toString('base64'));
  });
  if (allTestInputsEncoded) course.allTestInputsEncoded++;
  courses[exercise.course] = course;
}

const samples = [
  {
    id: 'dk2-c1-e1',
    input: 'PID\nCPU_LIMIT\n',
    expected: ['PID -> PRIMITIVE: NAMESPACE', 'CPU_LIMIT -> PRIMITIVE: CGROUP']
  },
  {
    id: 'lx3-c1-e2',
    input: 'VMMAP pid=937 start=00001000 end=00003000 perms=rw-p pathname=[audit]\n',
    expected: ['pid=937', 'size_kb=8', 'wx_violation=NON']
  },
  {
    id: 'gh3-c4-e3',
    input: 'COMMIT_MSG id=999 msg=feat: audit\n',
    expected: ['id=999', 'valid=OUI', 'type=feat', 'scope=NONE', 'breaking=NON']
  }
];

const probes = samples.map(sample => {
  const exercise = catalogue.getExercise(sample.id);
  const independent = !exercise.tests.some(test => String(test.stdin).trimEnd() === sample.input.trimEnd());
  if (!independent) throw new Error('L’entrée synthétique doit être indépendante des tests.');
  const outcome = spawnSync('/bin/bash', ['-c', exercise.solution], {
    input: sample.input,
    encoding: 'utf8',
    timeout: 5000,
    maxBuffer: 1024 * 1024,
    cwd: '/tmp',
    env: { PATH: '/usr/bin:/bin', HOME: '/tmp', LANG: 'C.UTF-8' }
  });
  return {
    id: sample.id,
    input: sample.input.trimEnd(),
    expectedFragments: sample.expected,
    independent,
    executed: outcome.status === 0 && !outcome.error,
    emptyOutput: !(outcome.stdout || '').trim(),
    expectedFragmentsPresent: sample.expected.every(fragment => (outcome.stdout || '').includes(fragment))
  };
});

process.stdout.write(JSON.stringify({ courses, probes }, null, 2) + '\n');
