'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const parse5 = require('parse5');
const course = require('../server/content/b3-hacking');
const kit = require('../scripts/course-kit');

test('le sommaire et l’accueil identifient la RFC TCP actuelle et sa date', () => {
  const pages = course.render(kit);
  const walk = node => [node, ...(node.childNodes || []).flatMap(walk)];
  const text = page => walk(parse5.parseFragment(page.body))
    .filter(node => node.nodeName === '#text').map(node => node.value).join(' ').replace(/\s+/g, ' ');
  for (const page of ['index.html', 'sommaire.html']) {
    const content = text(pages[page]);
    assert.match(content, /RFC 9293[^.]{0,90}2022/i);
  }
  const chapter = text(pages['chapitres/chapitre3.html']);
  assert.match(chapter, /RFC 9293[^.]*2022[^.]*RFC 793/i);
});
