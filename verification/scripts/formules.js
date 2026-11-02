'use strict';

const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../..');
const katex = require(path.join(root, 'assets/vendor/katex/katex.min.js'));
const data = JSON.parse(fs.readFileSync(0, 'utf8'));
const errors = [];
for (const formula of data.formulas) {
  try {
    katex.renderToString(formula.expression, { throwOnError: true, displayMode: formula.display });
  } catch (error) {
    errors.push({ ...formula, message: error.message });
  }
}
console.log(JSON.stringify({ version: katex.version, formulas: data.formulas.length, pages: new Set(data.formulas.map(item => item.file)).size, errors, suspects: data.suspects }, null, 2));
