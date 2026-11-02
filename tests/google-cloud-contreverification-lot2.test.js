'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const kit = require('../scripts/course-kit');
const labs = require('../scripts/generate-code-labs');

function elements(node, tag) {
  return [
    ...(node.tagName === tag ? [node] : []),
    ...(node.childNodes || []).flatMap(child => elements(child, tag))
  ];
}

function attribute(node, name) {
  return (node.attrs || []).find(entry => entry.name === name)?.value;
}

test('les liens HTTPS simples des énoncés restent cliquables', () => {
  const fragment = parse5.parseFragment(kit.richHtml('<p>Voir <a href="https://docs.cloud.google.com/architecture/framework/reliability">la source</a>.</p>'));
  const anchors = elements(fragment, 'a');
  assert.equal(anchors.length, 1);
  assert.deepEqual(anchors[0].attrs, [{ name: 'href', value: 'https://docs.cloud.google.com/architecture/framework/reliability' }]);
});

test('les autres attributs et protocoles ne deviennent pas du HTML actif', () => {
  const unsafe = [
    '<a href="javascript:alert(1)">script</a>',
    '<a href="java&#x73;cript:alert(1)">entité</a>',
    '<a href="data:text/html,alert(1)">données</a>',
    '<a href="//example.org/path">protocole relatif</a>',
    '<a href="https://example.org" onclick="alert(1)">attribut</a>',
    '<a href="https://example.org" target="_blank">cible</a>',
    '<a href="https://example.org&#x2f;@attacker.test">entité dans l’URL</a>'
  ];
  for (const input of unsafe) {
    const fragment = parse5.parseFragment(kit.richHtml('<p>' + input + '</p>'));
    assert.equal(elements(fragment, 'a').length, 0, input);
    assert.equal(elements(fragment, 'script').length, 0, input);
  }
});

test('une rupture de ligne ne conserve aucun attribut actif, même dans un lien', () => {
  const unsafe = '<br tabindex="0" autofocus onfocus="window.__probe=1">';
  const renders = [
    kit.richHtml(`<a href="https://example.invalid/">référence${unsafe}suite<br>fin</a>`),
    kit.qcm([{ stem: `référence${unsafe}suite<br>fin`, opts: ['oui', 'non'], correct: 0 }])
  ];
  for (const render of renders) {
    const fragment = parse5.parseFragment(render);
    const breaks = elements(fragment, 'br');
    assert.equal(breaks.length, 1);
    assert.deepEqual(breaks[0].attrs, []);
    assert.equal(elements(fragment, 'script').length, 0);
    for (const anchor of elements(fragment, 'a')) {
      assert.deepEqual(anchor.attrs, [{ name: 'href', value: 'https://example.invalid/' }]);
    }
  }
});

test('les cinq ateliers GCP rendent leurs références comme liens', () => {
  const expected = new Map([
    ['gcp3-c1-e2', 1],
    ['gcp3-c2-e1', 1],
    ['gcp3-c5-e1', 2],
    ['gcp3-c5-e2', 2],
    ['gcp3-c5-e3', 1]
  ]);
  for (const chapter of [1, 2, 5]) {
    const fragment = parse5.parseFragment(labs.renderSection('b3-google-cloud', chapter));
    for (const [id, count] of expected) {
      const lab = elements(fragment, 'div').find(node => attribute(node, 'id') === id);
      if (!lab) continue;
      const brief = elements(lab, 'div').find(node => attribute(node, 'class') === 'lab__brief');
      assert.equal(elements(brief, 'a').length, count, id);
      for (const anchor of elements(brief, 'a')) {
        assert.match(attribute(anchor, 'href'), /^https:\/\/(?:docs\.cloud\.google\.com|cloud\.google\.com)\//);
      }
      expected.delete(id);
    }
  }
  assert.equal(expected.size, 0);
});

test('la présence de zones ne garantit pas seule la haute disponibilité', () => {
  for (const file of [
    'server/content/b3-google-cloud/chapitre1.js',
    'b3-google-cloud/chapitres/chapitre1.html'
  ]) {
    const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.doesNotMatch(text, /pour garantir la haute résilience zonale/);
    assert.doesNotMatch(text, /pour éliminer tout point unique de défaillance/);
    assert.match(text, /ne garantit pas à elle seule la haute disponibilité/);
  }
});

test('le cours distingue zones et centres physiques et ne promet pas une résilience totale', () => {
  const chapter = fs.readFileSync(path.join(__dirname, '../b3-google-cloud/chapitres/chapitre1.html'), 'utf8');
  const exam = fs.readFileSync(path.join(__dirname, '../b3-google-cloud/chapitres/examens.html'), 'utf8');
  assert.match(chapter, /zones peuvent partager un centre de données/);
  assert.match(chapter, /https:\/\/cloud\.google\.com\/about\/locations/);
  assert.doesNotMatch(exam, /garantir une résilience totale aux pannes zonales/);
  assert.match(exam, /viser une meilleure tolérance aux pannes zonales/);
});

test('l’examen distingue les objectifs fictifs des conditions réelles du SLA Compute Engine', () => {
  for (const file of [
    'server/content/b3-google-cloud/pages/examens-exercices.js',
    'b3-google-cloud/chapitres/examens.html'
  ]) {
    const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.match(text, /objectifs fictifs/i);
    assert.match(text, /216 minutes/);
    assert.match(text, /4\.32 minutes/);
    assert.match(text, /ne représentent pas à eux seuls le SLA Compute Engine/i);
    assert.match(text, /https:\/\/cloud\.google\.com\/compute\/sla/);
    assert.doesNotMatch(text, /Mono-Zone \(SLA 99\.5%\)/i);
    assert.doesNotMatch(text, /Multi-Zones \(SLA 99\.99%\)/i);
  }
});
