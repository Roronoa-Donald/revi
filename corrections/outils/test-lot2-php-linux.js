'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const parse5 = require('parse5');
const { chromium } = require('playwright-core');

const root = path.resolve(__dirname, '../..');
const phpCardsPath = path.join(root, 'b1-php/chapitres/cartes.html');
const linuxChapterPath = path.join(root, 'b1-linux/chapitres/chapitre1.html');
const linuxExamPath = path.join(root, 'b1-linux/chapitres/simulateur-examen.html');

function findAll(rootNode, predicate) {
  const matches = [];
  const pending = [rootNode];
  while (pending.length) {
    const node = pending.pop();
    if (predicate(node)) matches.push(node);
    pending.push(...(node.childNodes || []));
  }
  return matches;
}

function attribute(node, name) {
  return (node.attrs || []).find(item => item.name === name)?.value;
}

function hasClass(node, name) {
  return (attribute(node, 'class') || '').split(/\s+/).includes(name);
}

function text(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
}

function normalized(node) {
  return text(node).replace(/\s+/g, ' ').trim();
}

function only(nodes, description) {
  assert.equal(nodes.length, 1, `${description} : ${nodes.length} élément(s) trouvé(s)`);
  return nodes[0];
}

function parseFile(filename) {
  return parse5.parse(fs.readFileSync(filename, 'utf8'));
}

function chronology(document) {
  const block = only(findAll(document, node => node.tagName === 'pre' &&
    ['1969', '1984', '1991'].every(year => text(node).includes(year))), 'Frise chronologique');
  const entries = [];
  for (const line of text(block).split('\n')) {
    const match = line.match(/^\s*(\d{4})\s+(.+)$/);
    if (match) {
      entries.push({ year: Number(match[1]), description: match[2].trim() });
    } else if (entries.length && line.trim()) {
      entries[entries.length - 1].description += ` ${line.trim()}`;
    }
  }
  return entries;
}

function assertChronology(entries) {
  function event(year) {
    return only(entries.filter(entry => entry.year === year), `Événement ${year}`).description;
  }
  assert.match(event(1983), /System V.*Release 1/i);
  assert.match(event(1985), /FSF|Free Software Foundation/i);
  assert.doesNotMatch(event(1985), /GPL/i, 'La GPL ne doit pas être attribuée à 1985');
  assert.match(event(1989), /première version.*GPL.*février/i);
  assert.match(event(1991), /Linux/i);
  assert.doesNotMatch(event(1991), /GPL/i, 'Le noyau Linux ne porte pas encore la GPL en 1991');
  assert.match(event(1992), /Linux.*GPL/i);
  const years = entries.map(entry => entry.year);
  assert.ok(years.indexOf(1985) < years.indexOf(1989));
  assert.ok(years.indexOf(1989) < years.indexOf(1991));
  assert.ok(years.indexOf(1991) < years.indexOf(1992));
}

test('F68 — carte expliquée, exemple exact et interpréteur PHP', () => {
  const document = parseFile(phpCardsPath);
  const cards = findAll(document, node => hasClass(node, 'fc'));
  assert.ok(cards.length >= 58, `Le nombre de cartes a diminué : ${cards.length}`);
  const card = only(cards.filter(node => normalized(node).includes('boucles imbriquées')), 'Carte F68');
  const answer = normalized(only(findAll(card, node => hasClass(node, 'fc__back')), 'Réponse F68'));
  assert.match(answer, /chaque tour de la boucle externe/i);
  assert.match(answer, /boucle interne est relancée/i);
  const example = answer.match(/(\d+)\s+tours? externes?\s*×\s*(\d+)\s+tours? internes?\s*=\s*(\d+)\s+tours? internes?/i);
  assert.ok(example, 'La réponse doit donner un exemple chiffré et compter les tours internes');
  const outerCount = Number(example[1]);
  const innerCount = Number(example[2]);
  const expected = Number(example[3]);
  assert.equal(outerCount * innerCount, expected);

  const portablePhp = path.join(root, 'tools/php-cli/php');
  const executable = process.env.PHP_BIN || (fs.existsSync(portablePhp) ? portablePhp : 'php');
  const phpCode = [
    '$total = 0;',
    `for ($outer = 0; $outer < ${outerCount}; $outer++) {`,
    `  for ($inner = 0; $inner < ${innerCount}; $inner++) { $total++; }`,
    '}',
    'echo $total;'
  ].join('\n');
  const execution = spawnSync(executable, ['-r', phpCode], { encoding: 'utf8', timeout: 5000 });
  assert.ifError(execution.error);
  assert.equal(execution.status, 0, execution.stderr);
  assert.equal(execution.stdout.trim(), String(expected), 'Le compteur PHP contredit la carte');
});

test('F68 — réponse visible sur mobile et ordinateur', async context => {
  const executable = process.env.CHROME_BIN || '/usr/bin/chromium';
  if (!fs.existsSync(executable)) {
    context.skip('Navigateur indisponible ; indiquer CHROME_BIN');
    return;
  }
  const browser = await chromium.launch({
    executablePath: executable,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  try {
    for (const width of [320, 375, 560, 1024]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.route(/^https?:/, route => route.abort());
      await page.goto(pathToFileURL(phpCardsPath).href);
      await page.addStyleTag({ path: path.join(root, 'assets/css/tokens.css') });
      await page.addStyleTag({ content: '.fc__in { transition: none !important; }' });
      const card = page.locator('.fc').filter({ hasText: 'boucles imbriquées' });
      assert.equal(await card.count(), 1);
      await card.click();
      assert.ok(await card.evaluate(element => element.classList.contains('is-flipped')));
      const geometry = await card.evaluate(element => {
        const face = element.querySelector('.fc__back');
        const bounds = face.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(face);
        const fragments = Array.from(range.getClientRects());
        return {
          fragmentCount: fragments.length,
          top: Math.min(...fragments.map(fragment => fragment.top)),
          bottom: Math.max(...fragments.map(fragment => fragment.bottom)),
          left: Math.min(...fragments.map(fragment => fragment.left)),
          right: Math.max(...fragments.map(fragment => fragment.right)),
          faceTop: bounds.top,
          faceBottom: bounds.bottom,
          faceLeft: bounds.left,
          faceRight: bounds.right
        };
      });
      assert.ok(geometry.fragmentCount > 0 && geometry.top >= geometry.faceTop && geometry.bottom <= geometry.faceBottom &&
        geometry.left >= geometry.faceLeft && geometry.right <= geometry.faceRight,
        `Texte hors de la carte à ${width} px : ${JSON.stringify(geometry)}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('F92 — frise, exercice, QCM et corrigé cohérents à la source et dans les pages', () => {
  const chapters = require(path.join(root, 'server/content/b1-linux/chapitres-1-3'));
  const chapter = only(chapters.filter(item => item.n === 1), 'Chapitre Linux 1');
  const section = only(chapter.sections.filter(item => item.title.includes('D’UNIX à Linux')), 'Section historique');
  const sourceDocument = parse5.parseFragment(section.html);
  const generatedDocument = parseFile(linuxChapterPath);
  const sourceEntries = chronology(sourceDocument);
  const generatedEntries = chronology(generatedDocument);
  assertChronology(sourceEntries);
  assertChronology(generatedEntries);
  assert.deepEqual(generatedEntries, sourceEntries, 'La frise générée diffère de sa source');
  assert.doesNotMatch(chapter.summary.join(' '), /System V.{0,40}1980/i);
  assert.doesNotMatch(normalized(generatedDocument), /System V.{0,40}1980/i);

  const officialUrls = [
    'https://www.fsf.org/bulletin/2024/fall/tracing-the-fsfs-footsteps',
    'https://www.gnu.org/licenses/old-licenses/gpl-1.0.html',
    'https://bitsavers.computerhistory.org/pdf/att/unix/System_V_Release_1/301-905_UNIX_System_V_Release_1_Users_Manual_Jan83.pdf'
  ];
  for (const document of [sourceDocument, generatedDocument]) {
    const links = findAll(document, node => node.tagName === 'a').map(node => attribute(node, 'href'));
    for (const url of officialUrls) assert.ok(links.includes(url), `Source officielle absente : ${url}`);
  }

  const sourceMethod = only(chapter.method.filter(item => item.includes('Reconstruire la frise')), 'Exercice source');
  const generatedMethod = only(findAll(generatedDocument, node => node.tagName === 'li' &&
    normalized(node).includes('Reconstruire la frise')), 'Exercice généré');
  const methodText = normalized(parse5.parseFragment(sourceMethod));
  assert.equal(normalized(generatedMethod), methodText);
  assert.match(methodText, /1983.*1985.*1989.*1991.*1992/);

  const sourceQuestion = only(chapter.questions.filter(item => item.stem.startsWith('Qui a créé le noyau Linux')), 'QCM source');
  const generatedQuestion = only(findAll(generatedDocument, node => hasClass(node, 'q') &&
    normalized(node).includes(sourceQuestion.stem)), 'QCM généré');
  const generatedExplanation = normalized(only(findAll(generatedQuestion, node => hasClass(node, 'q__exp')), 'Explication du QCM'));
  assert.equal(generatedExplanation, normalized(parse5.parseFragment(sourceQuestion.exp)));
  assert.match(generatedExplanation, /1991.*GPL en 1992/);
  const correctButton = only(findAll(generatedQuestion, node => node.tagName === 'button' &&
    attribute(node, 'data-correct') === '1'), 'Bonne réponse du QCM');
  assert.equal(normalized(correctButton), sourceQuestion.opts[sourceQuestion.correct]);
  assert.equal(normalized(correctButton), 'Linus Torvalds, 1991');

  const course = require(path.join(root, 'server/content/b1-linux'));
  const kit = require(path.join(root, 'scripts/course-kit'));
  const examBody = course.render(kit)['chapitres/simulateur-examen.html'].body;
  const sourceExam = parse5.parseFragment(examBody);
  const generatedExam = parseFile(linuxExamPath);
  const findSolution = document => normalized(only(findAll(document, node => hasClass(node, 'sol') &&
    normalized(node).includes('Torvalds') && normalized(node).includes('1991')), 'Corrigé historique'));
  const solution = findSolution(sourceExam);
  assert.equal(findSolution(generatedExam), solution);
  assert.match(solution, /1991\s*:.*Torvalds.*noyau Linux.*GPL en 1992/);
});

test('F92 — frise et corrigés visibles dans Chromium', async context => {
  const executable = process.env.CHROME_BIN || '/usr/bin/chromium';
  if (!fs.existsSync(executable)) {
    context.skip('Navigateur indisponible ; indiquer CHROME_BIN');
    return;
  }
  const browser = await chromium.launch({
    executablePath: executable,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  try {
    const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
    await page.route(/^https?:/, route => route.abort());
    await page.goto(pathToFileURL(linuxChapterPath).href);
    const timeline = page.locator('pre').filter({ hasText: 'Stallman fonde la FSF' });
    assert.equal(await timeline.count(), 1);
    assert.equal(await timeline.isVisible(), true);
    const lines = (await timeline.innerText()).split('\n');
    const event1985 = lines.find(line => line.trimStart().startsWith('1985'));
    const event1989 = lines.find(line => line.trimStart().startsWith('1989'));
    const event1992 = lines.find(line => line.trimStart().startsWith('1992'));
    assert.match(event1985 || '', /FSF/);
    assert.doesNotMatch(event1985, /GPL/);
    assert.match(event1989 || '', /première version.*GPL.*février/);
    assert.match(event1992 || '', /Linux.*GPL/);

    const question = page.locator('.q').filter({ hasText: 'Qui a créé le noyau Linux, et quand ?' });
    assert.equal(await question.count(), 1);
    await question.locator('button[data-correct="1"]').click();
    const explanation = question.locator('.q__exp');
    assert.equal(await explanation.isVisible(), true);
    assert.match((await explanation.innerText()).replace(/\s+/g, ' '), /1991.*GPL en 1992/);

    await page.goto(pathToFileURL(linuxExamPath).href);
    const detail = page.locator('details').filter({ hasText: 'Torvalds' });
    assert.equal(await detail.count(), 1);
    await detail.locator('summary').click();
    const solution = detail.locator('.sol');
    assert.equal(await solution.isVisible(), true);
    assert.match((await solution.innerText()).replace(/\s+/g, ' '), /1991.*Torvalds.*GPL en 1992/);
    await page.close();
  } finally {
    await browser.close();
  }
});

test('Lot 1 — les sept suspensions de notation restent actives', () => {
  const policy = require(path.join(root, 'server/exercises/grading-policy'));
  for (const course of ['csharp', 'docker', 'b3-linux', 'b3-github', 'b1-sql', 'sql', 'b3-sql']) {
    assert.equal(policy.isGradingSuspended(course), true, `Suspension absente : ${course}`);
  }
});
