'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const parse5 = require('parse5');

const root = path.resolve(__dirname, '../..');
const ignoredTags = new Set(['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'svg', 'math']);

function escaped(text, position) {
  let slashes = 0;
  while (position > 0 && text[--position] === '\\') slashes++;
  return slashes % 2 === 1;
}

function findEnd(text, start, delimiter) {
  let depth = 0;
  for (let position = start; position < text.length; position++) {
    if (escaped(text, position)) continue;
    if (depth === 0 && text.startsWith(delimiter, position)) return position;
    if (text[position] === '{') depth++;
    if (text[position] === '}' && depth > 0) depth--;
  }
  return -1;
}

function suspectDollars(text) {
  const candidates = [];
  for (let position = 0; position < text.length;) {
    if (text[position] === '\\' && (text[position + 1] === '[' || text[position + 1] === '(')) {
      const end = findEnd(text, position + 2, text[position + 1] === '[' ? '\\]' : '\\)');
      position = end < 0 ? position + 2 : end + 2;
      continue;
    }
    if (text[position] !== '$' || escaped(text, position)) { position++; continue; }
    const delimiter = text[position + 1] === '$' ? '$$' : '$';
    const end = findEnd(text, position + delimiter.length, delimiter);
    if (end < 0) { position += delimiter.length; continue; }
    if (delimiter === '$' && /^[A-Za-z0-9_({#@?!]$/.test(text[position + 1] || '') &&
        /^[A-Za-z0-9_({#@?!]$/.test(text[end + 1] || '')) candidates.push(position);
    position = end + delimiter.length;
  }
  return candidates;
}

function findCandidates(html) {
  const document = parse5.parse(html, { sourceCodeLocationInfo: true });
  const candidates = [];
  function visit(node, inBody, ignored) {
    const body = inBody || node.tagName === 'body';
    const skip = ignored || ignoredTags.has(node.tagName);
    if (body && !skip && node.nodeName === '#text') {
      for (const position of suspectDollars(node.value)) {
        const preceding = node.value.slice(0, position);
        const lines = preceding.split('\n');
        const location = node.sourceCodeLocation;
        candidates.push({
          line: location ? location.startLine + lines.length - 1 : null,
          column: location ? (lines.length === 1 ? location.startCol + position : lines.at(-1).length + 1) : null
        });
      }
    }
    for (const child of node.childNodes || []) visit(child, body, skip);
  }
  visit(document, false, false);
  return candidates;
}

function main() {
  const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, maxBuffer: 100 * 1024 * 1024 })
    .toString().split('\0').filter(file => file.endsWith('.html') && !/^(audit|design-audit|tests|verification|corrections)\//.test(file));
  let pages = 0;
  const candidates = [];
  for (const file of tracked) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    if (!html.includes('auto-render.min.js')) continue;
    pages++;
    candidates.push(...findCandidates(html).map(candidate => ({ file, ...candidate })));
  }
  console.log(JSON.stringify({
    pagesAvecAutoRendu: pages,
    candidates,
    limites: [
      'Le parseur HTML repère des textes à qualifier, pas leur signification : une formule adjacente à du texte peut être un faux positif.',
      'Les éléments ignorés par KaTeX et les contenus construits dynamiquement par JavaScript ne sont pas analysés.',
      'La liste est un complément au test Chromium ; son absence de candidats ne garantit pas l’absence de toute erreur sémantique.'
    ]
  }, null, 2));
  if (candidates.length) process.exitCode = 1;
}

if (require.main === module) main();
module.exports = { findCandidates, suspectDollars };
