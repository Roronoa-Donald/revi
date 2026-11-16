'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const EMOJI_RE = /[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

describe('Lot 4B — Pedagogy-B1-Rebuild (Phase 4)', () => {
  it('T1 — b1-vb-excel : cours complet 6 chapitres conforme au support Dr TCHAZINO', () => {
    const course = require('../server/content/b1-vb-excel');
    assert.equal(course.id, 'b1-vb-excel');
    assert.equal(course.slug, 'vba');
    assert.equal(course.chapters.length, 6);

    const c13 = require('../server/content/b1-vb-excel/chapitres-1-3');
    const c46 = require('../server/content/b1-vb-excel/chapitres-4-6');
    const fullChapters = [].concat(c13, c46);
    assert.equal(fullChapters.length, 6);

    const expectedKeywords = [
      ['VBE', 'Alt+F11', 'macro'],
      ['Application', 'Workbooks', 'Worksheets', 'Range'],
      ['Value', 'Formula', 'Select', 'Workbook_Open'],
      ['Integer', 'Double', 'String', 'Option Explicit', 'Function'],
      ['If', 'Select Case', 'For', 'Do While'],
      ['MsgBox', 'InputBox', 'On Error GoTo', 'UserForm']
    ];

    for (let i = 0; i < 6; i++) {
      const ch = fullChapters[i];
      assert.equal(ch.n, i + 1);
      assert.ok(ch.sections.length >= 3, `Ch.${i + 1} doit avoir au moins 3 sections`);
      assert.equal(ch.questions.length, 8, `Ch.${i + 1} doit avoir 8 questions QCM`);
      assert.ok(ch.flashcards.length >= 4, `Ch.${i + 1} doit avoir au moins 4 cartes mémo`);

      const allHtml = ch.sections.map(s => s.html).join(' ');
      for (const kw of expectedKeywords[i]) {
        assert.ok(allHtml.includes(kw), `Ch.${i + 1} doit contenir la notion clé « ${kw} »`);
      }
    }
  });

  it('T2 — b1-vb-excel : QCM équilibrés (48 questions, max ≤ 35% par indice)', () => {
    const c13 = require('../server/content/b1-vb-excel/chapitres-1-3');
    const c46 = require('../server/content/b1-vb-excel/chapitres-4-6');
    const fullChapters = [].concat(c13, c46);

    const counts = [0, 0, 0, 0];
    let total = 0;
    for (const ch of fullChapters) {
      for (const q of ch.questions) {
        assert.ok(q.exp && q.exp.length >= 10, 'Chaque question doit avoir une explication détaillée');
        counts[q.correct]++;
        total++;
      }
    }
    assert.equal(total, 48);
    for (let idx = 0; idx < 4; idx++) {
      const freq = counts[idx] / total;
      assert.ok(freq <= 0.35, `L'indice ${idx} ne doit pas dépasser 35% (obtenu: ${(freq * 100).toFixed(1)}%)`);
    }
  });

  it('T3 — b1-vb-excel : catalogue de 18 exercices contextualisés avec étapes et takeaway', () => {
    const exercises = require('../server/exercises/b1-vb-excel');
    assert.equal(exercises.length, 18);

    for (let i = 0; i < 18; i++) {
      const ex = exercises[i];
      const ch = Math.floor(i / 3) + 1;
      const exNum = (i % 3) + 1;
      assert.equal(ex.id, `vba-c${ch}-e${exNum}`);
      assert.equal(ex.language, 'analyse');
      assert.ok(ex.title && ex.title.length > 5);
      assert.ok(ex.exampleTitle && ex.exampleTitle.length > 3);
      assert.ok(ex.hints.length >= 3, `Exercice ${ex.id} doit avoir au moins 3 indices`);
      assert.ok(ex.hints.some(h => h.startsWith('Étapes :')), `Exercice ${ex.id} doit avoir un indice avec « Étapes : »`);
      assert.ok(ex.takeaway && ex.takeaway.length >= 20, `Exercice ${ex.id} doit avoir un takeaway`);
      assert.ok(ex.tests.length >= 2, `Exercice ${ex.id} doit avoir au moins 2 tests`);
    }
  });

  it('T4 — b1-virtualisation : enrichissements techniques Type 1/2, vCPU/RAM/VDI, réseaux NAT/Pont, snapshots et TP VirtualBox', () => {
    const course = require('../server/content/b1-virtualisation');
    const c13 = require('../server/content/b1-virtualisation/chapitres-1-3');
    const c46 = require('../server/content/b1-virtualisation/chapitres-4-6');
    const enrichissements = require('../server/content/b1-virtualisation/enrichissements');

    // Ch.1 conserve le récit narratif d'origine sans altération
    const ch1 = c13[0];
    assert.match(ch1.sections[0].html, /serveur fainéant/);
    assert.match(ch1.sections[0].html, /80 % du temps/);

    // Ch.2 à 6 enrichis
    const ch2 = enrichissements.enrich(c13[1]);
    const ch2Html = ch2.sections.map(s => s.html).join(' ');
    assert.match(ch2Html, /type 1/i);
    assert.match(ch2Html, /type 2/i);
    assert.match(ch2Html, /bare metal/i);
    assert.match(ch2Html, /VT-x/);
    assert.match(ch2Html, /AMD-V/);

    const ch3 = enrichissements.enrich(c13[2]);
    const ch3Html = ch3.sections.map(s => s.html).join(' ');
    assert.match(ch3Html, /vCPU/);
    assert.match(ch3Html, /surallocation/i);
    assert.match(ch3Html, /VDI/);
    assert.match(ch3Html, /VMDK/);

    const ch4 = enrichissements.enrich(c46[0]);
    const ch4Html = ch4.sections.map(s => s.html).join(' ');
    assert.match(ch4Html, /NAT/);
    assert.match(ch4Html, /Accès par pont/);
    assert.match(ch4Html, /Réseau interne/);
    assert.match(ch4Html, /Réseau privé hôte/);

    const ch5 = enrichissements.enrich(c46[1]);
    const ch5Html = ch5.sections.map(s => s.html).join(' ');
    assert.match(ch5Html, /Snapshot/i);
    assert.match(ch5Html, /clone complet/i);
    assert.match(ch5Html, /clone lié/i);
    assert.match(ch5Html, /OVA/);

    const ch6 = enrichissements.enrich(c46[2]);
    const ch6Html = ch6.sections.map(s => s.html).join(' ');
    assert.match(ch6Html, /VBoxManage createvm/);
    assert.match(ch6Html, /VBoxManage modifyvm/);
    assert.match(ch6Html, /VBoxManage startvm/);
  });

  it('T5 — Zéro emoji dans tous les fichiers modifiés ou créés du Lot 4B', () => {
    const files = [
      'server/content/b1-vb-excel.js',
      'server/content/b1-vb-excel/chapitres-1-3.js',
      'server/content/b1-vb-excel/chapitres-4-6.js',
      'server/content/b1-vb-excel/pages.js',
      'server/exercises/b1-vb-excel.js',
      'server/content/b1-virtualisation.js',
      'server/content/b1-virtualisation/enrichissements.js'
    ];

    for (const rel of files) {
      const content = read(rel);
      const match = content.match(EMOJI_RE);
      assert.equal(match, null, `Emoji ${match ? match[0] : ''} détecté dans ${rel}`);
    }
  });
});
