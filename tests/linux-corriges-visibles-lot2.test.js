'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const parse5 = require('parse5');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'b1-linux/exercices/exercices.html'), 'utf8');
const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
const codeBlocks = walk(parse5.parse(html))
  .filter(node => node.tagName === 'code' && node.parentNode?.tagName === 'pre')
  .map(text);
const scriptFor = (index, marker) => {
  const script = codeBlocks[index].split(/\n\s*\n/).find(part => part.includes(marker));
  assert.ok(script, `Corrigé introuvable : ${marker}`);
  return script;
};
const bash = (script, input) => {
  const result = spawnSync('/bin/bash', ['-c', script], { input, encoding: 'utf8', timeout: 5000 });
  assert.equal(result.error, undefined, String(result.error));
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, '');
  return result.stdout.trimEnd();
};
const symbolic = mode => Array.from({ length: 9 }, (_, index) =>
  mode & (1 << (8 - index)) ? 'rwx'[index % 3] : '-').join('');

test('F103 : le corrigé visible reproduit chmod sur les droits, classes et actions', () => {
  const script = scriptFor(1, 'read -r droits modif');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-chmod-lot2-'));
  const file = path.join(directory, 'fichier');
  try {
    fs.writeFileSync(file, '');
    const inputs = [];
    const expected = [];
    for (const mode of [0o000, 0o777, 0o640, 0o125, 0o432]) {
      for (const classe of ['u', 'g', 'o']) {
        for (const action of ['+', '-']) {
          for (const permission of ['r', 'w', 'x']) {
            const modification = classe + action + permission;
            fs.chmodSync(file, mode);
            const real = spawnSync('chmod', [modification, file], { encoding: 'utf8' });
            assert.equal(real.status, 0, real.stderr);
            inputs.push(`${symbolic(mode)} ${modification}`);
            expected.push(symbolic(fs.statSync(file).mode & 0o777));
          }
        }
      }
    }
    assert.deepEqual(bash(script, `${inputs.length}\n${inputs.join('\n')}\n`).split('\n'), expected);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('F104 : le corrigé visible distingue fichier, cible absente et cycle', () => {
  const script = scriptFor(2, 'read -r depart');
  const cases = [
    ['2\nalpha beta\nbeta fichier\n1\nfichier\nalpha\n', 'fichier : fichier'],
    ['2\nalpha beta\nbeta perdu\n1\nfichier\nalpha\n', 'introuvable : perdu'],
    ['2\na b\nb a\n0\na\n', 'boucle : a'],
    ['0\n1\n-n\n-n\n', 'fichier : -n'],
    ['0\n0\nabsent\n', 'introuvable : absent']
  ];
  for (const [input, expected] of cases) assert.equal(bash(script, input), expected);
});

test('F104 : une longue chaîne sans répétition ne devient pas une boucle dans la simulation', () => {
  const script = scriptFor(2, 'read -r depart');
  const links = Array.from({ length: 101 }, (_, index) => `nom${index} nom${index + 1}`);
  const input = `101\n${links.join('\n')}\n1\nnom101\nnom0\n`;
  assert.equal(bash(script, input), 'fichier : nom101');
});
