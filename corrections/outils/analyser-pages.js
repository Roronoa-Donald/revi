'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const parse5 = require('parse5');
const acorn = require('acorn');

const root = path.resolve(__dirname, '../..');
const katex = require(path.join(root, 'assets/vendor/katex/katex.min.js'));
const referenceIndex = process.argv.indexOf('--reference');
const reference = referenceIndex < 0 ? null : process.argv[referenceIndex + 1];
if (referenceIndex >= 0 && !reference) throw new Error('Une référence Git est requise après --reference.');

const standardHtml = new Set((
  'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr '
  + 'applet basefont bgsound big center dir font frame frameset keygen listing marquee nobr noembed noframes param plaintext rb rtc strike tt xmp'
).split(/\s+/));
const voidHtml = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
const ignoredDefault = ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option'];
const classesOf = node => (node.attrs || []).find(item => item.name === 'class')?.value.split(/\s+/).filter(Boolean) || [];
const attr = (node, name) => (node.attrs || []).find(item => item.name === name)?.value;
const normalizeText = value => value.replace(/\s+/g, ' ').trim();
const relative = value => value.split(path.sep).join('/');

function git(args, encoding = 'utf8') {
  return execFileSync('git', args, { cwd: root, encoding, maxBuffer: 100 * 1024 * 1024 });
}

const manifest = process.env.REVI_AUDIT_MANIFEST;
if (manifest && reference) throw new Error('Le manifeste local ne peut pas être combiné avec une référence Git.');
const tracked = (manifest ? fs.readFileSync(manifest, 'utf8') :
  reference ? git(['ls-tree', '-rz', '--name-only', reference]) : git(['ls-files', '-z'])).split('\0').filter(Boolean);
if (manifest && tracked.some(file => path.isAbsolute(file) || file.split('/').includes('..'))) {
  throw new Error('Le manifeste contient un chemin hors du projet.');
}
const trackedSet = new Set(tracked);
const pages = tracked.filter(file => file.toLowerCase().endsWith('.html') && !/^(audit|design-audit|tests|verification|corrections)\//.test(file)).sort();
const read = file => reference ? git(['show', `${reference}:${file}`]) : fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => reference ? trackedSet.has(file) : fs.existsSync(path.join(root, file));

function collectSource(html) {
  const records = [];
  const hazards = [];
  const stack = [];
  let tokenizer;
  function endToken(token) {
    const index = stack.map(item => item.name).lastIndexOf(token.tagName);
    if (index >= 0) stack.splice(index);
  }
  function characters(token) {
    if (stack.some(item => item.inert)) return;
    for (const item of stack) if (item.record) item.record.text += token.chars;
  }
  const handler = {
    onStartTag(token) {
      const classes = classesOf(token);
      const type = classes.includes('fc') ? 'carte' : (classes.includes('q') ? 'question' : (classes.includes('opt') ? 'option' : null));
      const context = stack.some(item => item.record && (item.record.type === 'carte' || item.record.type === 'question'));
      if (context && ['title', 'link', 'script', 'style'].includes(token.tagName)) {
        hazards.push({ tag: token.tagName, line: token.location?.startLine || null });
      }
      const record = type ? { type, offset: token.location?.startOffset, line: token.location?.startLine, text: '' } : null;
      if (record) records.push(record);
      if (!voidHtml.has(token.tagName) && !token.selfClosing) {
        stack.push({ name: token.tagName, record, inert: ['script', 'style'].includes(token.tagName) && !context });
      }
      if (!context && token.tagName === 'script') tokenizer.state = parse5.TokenizerMode.SCRIPT_DATA;
      if (!context && token.tagName === 'style') tokenizer.state = parse5.TokenizerMode.RAWTEXT;
      if (!context && ['textarea', 'title'].includes(token.tagName)) tokenizer.state = parse5.TokenizerMode.RCDATA;
    },
    onEndTag: endToken,
    onCharacter: characters,
    onWhitespaceCharacter: characters,
    onNullCharacter: characters,
    onComment() {},
    onDoctype() {},
    onEof() {},
    onParseError() {}
  };
  tokenizer = new parse5.Tokenizer({ sourceCodeLocationInfo: true }, handler);
  tokenizer.write(html, true);
  return { records, hazards };
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value || '';
  if (['script', 'style', 'title', 'link', 'noscript'].includes(node.tagName)) return '';
  return (node.childNodes || []).map(textContent).join('');
}

function mathExpressions(text) {
  const result = [];
  const pairs = [['$$', '$$', true], ['\\[', '\\]', true], ['\\(', '\\)', false], ['$', '$', false]];
  function escaped(index) {
    let slashes = 0;
    while (index > 0 && text[--index] === '\\') slashes++;
    return slashes % 2 === 1;
  }
  for (let position = 0; position < text.length;) {
    const pair = pairs.find(([left]) => text.startsWith(left, position) && !escaped(position));
    if (!pair) { position++; continue; }
    const [left, right, display] = pair;
    let end = position + left.length;
    while (end < text.length && (!text.startsWith(right, end) || escaped(end))) end++;
    if (end >= text.length) { position += left.length; continue; }
    result.push({ expression: text.slice(position + left.length, end), display, position });
    position = end + right.length;
  }
  return result;
}

function walkAst(node, visitor) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') visitor(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => walkAst(child, visitor));
    else if (value && typeof value === 'object') walkAst(value, visitor);
  }
}

const result = {
  reference: reference || (manifest ? 'dossier local, inventaire fourni' : 'dossier local'),
  population: { pages: pages.length, parseur: 'parse5 7.3.0', katex: katex.version, analyseurJavaScript: 'acorn 8.16.0' },
  html: { parseErrors: [], unknownElements: [], metadataInCardsOrQuestions: [] },
  equivalence: { source: { carte: 0, question: 0, option: 0 }, dom: { carte: 0, question: 0, option: 0 }, missing: [], textDifferences: [] },
  mathematiques: { formulas: 0, errors: [], warnings: [], mathCalls: 0, unsafeOptions: [], unknownOptions: [], scriptParseErrors: [] },
  liens: { checked: 0, absentFiles: [], absentFragments: [], dynamicSkipped: 0, externalSkipped: 0 },
  limites: [
    'L’égalité source/DOM couvre les classes fc, q et opt ; elle ne prouve pas le sens des contenus ni les composants non couverts.',
    'Les formules sont relevées dans les nœuds texte HTML statiques visibles, pas celles construites dynamiquement par JavaScript.',
    'Les liens vers les routes dynamiques sont exclus ; les fragments absents sont des candidats à confirmer si leur cible est ajoutée par JavaScript.',
    'Les erreurs de parsing et les éléments inconnus sont des diagnostics à qualifier : les éléments personnalisés peuvent être intentionnels.'
  ]
};
const pageIndex = new Map();

for (const file of pages) {
  const html = read(file);
  const source = collectSource(html);
  const parseErrors = [];
  const document = parse5.parse(html, { sourceCodeLocationInfo: true, onParseError: error => parseErrors.push(error) });
  for (const error of parseErrors) result.html.parseErrors.push({ file, line: error.startLine, code: error.code });
  for (const hazard of source.hazards) result.html.metadataInCardsOrQuestions.push({ file, ...hazard });
  const domRecords = new Map();
  const ids = new Set();
  const links = [];
  const scripts = [];

  function walk(node, ignored, ancestors) {
    const tag = node.tagName;
    const location = node.sourceCodeLocation;
    if (tag && node.namespaceURI === 'http://www.w3.org/1999/xhtml' && !standardHtml.has(tag)) {
      result.html.unknownElements.push({ file, line: location?.startLine || null, tag });
    }
    const classes = classesOf(node);
    const type = classes.includes('fc') ? 'carte' : (classes.includes('q') ? 'question' : (classes.includes('opt') ? 'option' : null));
    if (type) {
      result.equivalence.dom[type]++;
      if (location?.startOffset !== undefined) domRecords.set(`${type}:${location.startOffset}`, normalizeText(textContent(node)));
    }
    const id = attr(node, 'id') || (tag === 'a' ? attr(node, 'name') : undefined);
    if (id) ids.add(id);
    if (tag === 'a' || tag === 'area') {
      const href = attr(node, 'href');
      if (href) links.push({ href, line: location?.startLine || null });
    }
    if (tag === 'script' && !attr(node, 'src') && (!attr(node, 'type') || attr(node, 'type') === 'module')) {
      scripts.push({ code: (node.childNodes || []).map(item => item.value || '').join(''), line: location?.startLine || 1, module: attr(node, 'type') === 'module' });
    }
    const nextIgnored = ignored || ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'svg', 'math'].includes(tag);
    if (node.nodeName === '#text' && !nextIgnored) {
      for (const formula of mathExpressions(node.value || '')) {
        result.mathematiques.formulas++;
        const line = (location?.startLine || 1) + (node.value.slice(0, formula.position).match(/\n/g) || []).length;
        try {
          katex.renderToString(formula.expression, {
            throwOnError: true,
            displayMode: formula.display,
            strict: (code, message) => {
              result.mathematiques.warnings.push({ file, line, expression: formula.expression.slice(0, 160), code, message });
              return 'ignore';
            }
          });
        } catch (error) {
          result.mathematiques.errors.push({ file, line, expression: formula.expression.slice(0, 160), message: error.message });
        }
      }
    }
    for (const child of node.childNodes || []) walk(child, nextIgnored, ancestors.concat(tag || []));
    if (node.content) walk(node.content, nextIgnored, ancestors.concat(tag || []));
  }
  walk(document, false, []);
  for (const record of source.records) {
    result.equivalence.source[record.type]++;
    const key = `${record.type}:${record.offset}`;
    if (!domRecords.has(key)) {
      result.equivalence.missing.push({ file, type: record.type, line: record.line });
    } else {
      const expected = normalizeText(record.text);
      const actual = domRecords.get(key);
      if (expected !== actual) result.equivalence.textDifferences.push({ file, type: record.type, line: record.line, source: expected.slice(0, 140), dom: actual.slice(0, 140) });
    }
  }
  for (const script of scripts) {
    let ast;
    try {
      ast = acorn.parse(script.code, { ecmaVersion: 'latest', sourceType: script.module ? 'module' : 'script', locations: true, allowReturnOutsideFunction: true });
    } catch (error) {
      result.mathematiques.scriptParseErrors.push({ file, line: script.line + (error.loc?.line || 1) - 1, message: error.message });
      continue;
    }
    walkAst(ast, node => {
      if (node.type !== 'CallExpression') return;
      const callee = node.callee;
      const name = callee.type === 'Identifier' ? callee.name : (callee.type === 'MemberExpression' && !callee.computed ? callee.property.name : '');
      if (name !== 'renderMathInElement') return;
      result.mathematiques.mathCalls++;
      const options = node.arguments[1];
      let ignored = ignoredDefault;
      if (options && options.type !== 'ObjectExpression') {
        result.mathematiques.unknownOptions.push({ file, line: script.line + node.loc.start.line - 1, raison: 'options dynamiques' });
        return;
      }
      if (options) {
        const property = options.properties.find(item => !item.computed && (item.key?.name || item.key?.value) === 'ignoredTags');
        if (property) {
          if (property.value.type !== 'ArrayExpression' || property.value.elements.some(item => !item || item.type !== 'Literal' || typeof item.value !== 'string')) {
            result.mathematiques.unknownOptions.push({ file, line: script.line + node.loc.start.line - 1, raison: 'ignoredTags dynamique' });
            return;
          }
          ignored = property.value.elements.map(item => item.value.toLowerCase());
        }
      }
      const missing = ['pre', 'code'].filter(tagName => !ignored.includes(tagName));
      if (missing.length) result.mathematiques.unsafeOptions.push({ file, line: script.line + node.loc.start.line - 1, missing });
    });
  }
  pageIndex.set(file, { ids, links });
}

for (const [file, page] of pageIndex) {
  for (const link of page.links) {
    let url;
    try { url = new URL(link.href, 'https://local.invalid/' + file.split('/').map(encodeURIComponent).join('/')); }
    catch { result.liens.absentFiles.push({ file, line: link.line, href: link.href, raison: 'URL invalide' }); continue; }
    if (url.origin !== 'https://local.invalid') { result.liens.externalSkipped++; continue; }
    let target;
    try { target = decodeURIComponent(url.pathname).replace(/^\/+/, ''); }
    catch { result.liens.absentFiles.push({ file, line: link.line, href: link.href, raison: 'encodage invalide' }); continue; }
    if (target.startsWith('api/')) { result.liens.dynamicSkipped++; continue; }
    if (target.startsWith('_auth/')) target = 'public/' + target.slice('_auth/'.length);
    if (!target || target.endsWith('/')) target += 'index.html';
    result.liens.checked++;
    if (!exists(target)) {
      result.liens.absentFiles.push({ file, line: link.line, href: link.href, target });
      continue;
    }
    if (url.hash && pageIndex.has(target)) {
      let fragment;
      try { fragment = decodeURIComponent(url.hash.slice(1)); } catch { fragment = url.hash.slice(1); }
      if (fragment && !pageIndex.get(target).ids.has(fragment)) result.liens.absentFragments.push({ file, line: link.line, href: link.href, target, fragment });
    }
  }
}

const failures = result.html.parseErrors.length + result.html.unknownElements.length + result.html.metadataInCardsOrQuestions.length + result.equivalence.missing.length + result.equivalence.textDifferences.length + result.mathematiques.errors.length + result.mathematiques.unsafeOptions.length + result.mathematiques.unknownOptions.length + result.mathematiques.scriptParseErrors.length + result.liens.absentFiles.length + result.liens.absentFragments.length + (process.argv.includes('--strict') ? result.mathematiques.warnings.length : 0);
console.log(JSON.stringify(result, null, 2));
process.exitCode = failures ? 1 : 0;
