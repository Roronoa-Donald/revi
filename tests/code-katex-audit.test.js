'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { findCandidates, suspectDollars } = require('../corrections/outils/verifier-code-katex');

test('le repérage distingue du code non protégé, des formules et des blocs ignorés', () => {
  assert.equal(suspectDollars('Les variables $utilisateur et $groupe.').length, 1);
  assert.equal(suspectDollars('Référence $A$1').length, 1);
  assert.equal(suspectDollars('Formule $x$ puis $y$ et $$a+b$$.').length, 0);
  assert.equal(suspectDollars('$$MT(i)=x$$ où $ES$ est la date et $LF$ la limite.').length, 0);
  assert.equal(suspectDollars('Texte \\$nom et \\$groupe.').length, 0);
  const document = '<!doctype html><html><head><title>$titre $autre</title></head><body>' +
    '<p>$nom puis $groupe</p><pre>$nom $groupe</pre><code>$A$1</code></body></html>';
  assert.equal(findCandidates(document).length, 1);
});
