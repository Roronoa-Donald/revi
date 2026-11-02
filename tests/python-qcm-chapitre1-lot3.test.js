'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const test = require('node:test');

function find(node, predicate, result = []) {
  if (predicate(node)) result.push(node);
  for (const child of node.childNodes || []) find(child, predicate, result);
  return result;
}

function attr(node, name) {
  return (node.attrs || []).find(item => item.name === name)?.value;
}

function text(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
}

test('les réponses du QCM Python chapitre 1 correspondent aux comportements Python testés', () => {
  const script = `
import json
import sys

read_value = input()
try:
    exec('ok = false', {})
except NameError:
    undefined = True
else:
    undefined = False
x = 3
x = x * 2
try:
    15 + '/20'
except TypeError:
    invalid_addition = True
else:
    invalid_addition = False
print(json.dumps([type(7 // 2).__name__, '2' + '3', type(read_value).__name__, undefined,
                  x, f'{3.14159:.2f}', 17 % 5, [100 // 12, 100 % 12],
                  type(None).__name__, f'{15}/20', invalid_addition]))
`;
  const actual = JSON.parse(execFileSync(process.env.PYTHON_BIN || 'python3', ['-I', '-B', '-c', script],
    { input: '123\n', encoding: 'utf8' }));
  assert.deepEqual(actual, ['int', '23', 'str', true, 6, '3.14', 2, [8, 4], 'NoneType', '15/20', true]);
  const document = parse5.parse(fs.readFileSync(path.join(__dirname, '../b1-python/chapitres/chapitre1.html'), 'utf8'));
  const questions = find(document, node => (attr(node, 'class') || '').split(/\s+/).includes('q'));
  const expected = ["<class 'int'>", '23', 'Toujours une chaîne de caractères', 'ok = false', '6',
    '3.14', '%', '8 boîtes, 4 restantes', 'Le type doit être déclaré avant d\'affecter', 'print(f"{n}/20")'];
  assert.equal(questions.length, expected.length);
  for (const [index, question] of questions.entries()) {
    const options = find(question, node => node.tagName === 'button' && attr(node, 'data-correct') === '1');
    assert.equal(options.length, 1, String(index + 1));
    assert.equal(text(options[0]).trim(), expected[index]);
    assert.ok(find(question, node => (attr(node, 'class') || '').split(/\s+/).includes('q__exp'))
      .some(node => text(node).trim()));
  }
});
