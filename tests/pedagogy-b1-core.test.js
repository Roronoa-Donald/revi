'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const EMOJI_RE = /[\u{1F300}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

describe('Lot 4A — Pedagogy-B1-Core (Phase 4)', () => {
  it('T1 — index.html & portal.css : progression S1/S2, badges prérequis B1 et filtre de semestre', () => {
    const html = read('index.html');
    const css = read('assets/css/portal.css');

    // Barre de filtre de semestre présente avec les 3 boutons requis
    assert.match(html, /id="b1SemesterFilter"/);
    assert.match(html, /data-semester="all"[^>]*>\s*Tous les semestres\s*<\/button>/);
    assert.match(html, /data-semester="s1"[^>]*>\s*Semestre 1 — Fondations\s*<\/button>/);
    assert.match(html, /data-semester="s2"[^>]*>\s*Semestre 2 — Approfondissement\s*<\/button>/);

    const expectedS1 = [
      ['b1-algo', 'Socle fondamental'],
      ['b1-python', 'Co-requis : Algorithmique'],
      ['b1-architecture', 'Socle matériel'],
      ['b1-linux', 'Socle OS'],
      ['b1-prog-web', 'Socle Web'],
      ['b1-algebre', 'Socle Maths'],
      ['b1-bureautique', 'Socle Bureautique'],
      ['b1-fr-pro', 'Socle Communication'],
      ['b1-anglais', 'Socle Langues'],
      ['b1-droit', 'Socle Juridique'],
      ['b1-git', 'Après : Linux Ch.1'],
    ];

    const expectedS2 = [
      ['b1-c-cpp', 'Prérequis : Algorithmique Ch.1–4'],
      ['b1-php', 'Prérequis : Prog. Web &amp; Algo'],
      ['b1-merise', 'Prérequis : Algorithmique'],
      ['b1-sql', 'Prérequis : Merise Ch.1–3'],
      ['b1-reseaux', 'Prérequis : Architecture &amp; binaire'],
      ['b1-ccna1', 'Prérequis : Réseaux B1'],
      ['b1-admin-windows', 'Prérequis : Architecture &amp; Réseaux'],
      ['b1-virtualisation', 'Prérequis : Architecture &amp; Linux'],
      ['b1-cyber', 'Prérequis : Linux &amp; Réseaux'],
      ['b1-stats', 'Prérequis : Algèbre B1'],
      ['b1-robotique', 'Prérequis : C/C++ &amp; Architecture'],
      ['b1-vb-excel', 'Prérequis : Bureautique &amp; Algo'],
      ['b1-projet', 'Synthèse S2 : Git, Merise, SQL, Web'],
    ];

    let lastS1Index = -1;
    for (const [slug, prereq] of expectedS1) {
      const cardRe = new RegExp(
        `<a href="${slug}/(?:index|sommaire)\\.html"[^>]*data-level="b1"[^>]*data-semester="s1"[\\s\\S]*?<span class="card__prereq">${prereq.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>`
      );
      const match = html.match(cardRe);
      assert.ok(match, `La carte S1 ${slug} doit avoir data-semester="s1" et le prérequis « ${prereq} »`);
      const pos = html.search(new RegExp(`href="${slug}/(?:index|sommaire)\\.html"`));
      assert.ok(pos > lastS1Index, `Les cartes S1 doivent suivre l'ordre pédagogique (${slug})`);
      lastS1Index = pos;
    }

    for (const [slug, prereq] of expectedS2) {
      const cardRe = new RegExp(
        `<a href="${slug}/(?:index|sommaire)\\.html"[^>]*data-level="b1"[^>]*data-semester="s2"[\\s\\S]*?<span class="card__prereq">${prereq.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>`
      );
      const match = html.match(cardRe);
      assert.ok(match, `La carte S2 ${slug} doit avoir data-semester="s2" et le prérequis « ${prereq} »`);
      const pos = html.search(new RegExp(`href="${slug}/(?:index|sommaire)\\.html"`));
      assert.ok(pos > lastS1Index, `La carte S2 ${slug} doit apparaître après toutes les cartes S1`);
    }

    // Styles dans portal.css
    assert.match(css, /\.portal-semester-filter\b/);
    assert.match(css, /\.semester-tab\b/);
    assert.match(css, /\.portal-card\s+\.card__prereq\b/);
  });

  it('T2 — b1-c-cpp Ch.1 (§4) : métaphore de la boîte pour &age et retrait du piège prématuré sur les tableaux char/pointeurs', () => {
    const html = read('b1-c-cpp/chapitres/chapitre1.html');
    const sec4Start = html.indexOf('<h2>4.');
    const sec5Start = html.indexOf('<h2>5.');
    assert.ok(sec4Start !== -1 && sec5Start > sec4Start, 'La section 4 doit exister dans b1-c-cpp Ch.1');
    const sec4 = html.slice(sec4Start, sec5Start);

    assert.match(sec4, /scanf\("%d",\s*&amp;age\);/);
    assert.match(sec4, /scanf\("%lf",\s*&amp;prix\);/);
    assert.match(
      sec4,
      /le symbole <code>&amp;<\/code> indique l'adresse de la boîte <code>age<\/code> pour que <code>scanf<\/code> sache dans quel tiroir ranger la valeur saisie \(nous étudierons les adresses mémoire et les chaînes de caractères en détail aux chapitres 6 et 7\)/
    );
    assert.ok(!/converti en pointeur vers son premier/i.test(sec4), 'Pas d’explication prématurée du decay tableau->pointeur en §4');
    assert.ok(!/char\s+(?:nom|prenom)\[50\]/.test(sec4), 'Pas de buffer char[50] prématuré en §4');
    assert.ok(!/%49s/.test(sec4), 'Pas de largeur %49s prématurée en §4');
  });

  it('T3 — b1-python Ch.1 (§2) : métaphore de la boîte étiquetée avant la notion de référence mémoire', () => {
    const html = read('b1-python/chapitres/chapitre1.html');
    const boxIdx = html.indexOf('Imaginez une boîte étiquetée dans laquelle on range une valeur');
    const refIdx = html.indexOf('un nom (une étiquette) qui pointe vers une valeur stockée en mémoire');
    assert.ok(boxIdx !== -1, 'La métaphore « Imaginez une boîte étiquetée dans laquelle on range une valeur... » doit être présente');
    assert.ok(refIdx !== -1, 'La définition « un nom (une étiquette) qui pointe vers une valeur stockée en mémoire » doit être présente');
    assert.ok(boxIdx < refIdx, 'La métaphore de la boîte doit précéder l’explication en termes de référence mémoire');
  });

  it('T4 — b1-algo Ch.9 (§4) : trace visuelle de la pile d’appels (Descente / Remontée) et explication de non-circularité', () => {
    const html = read('b1-algo/chapitres/chapitre9.html');
    assert.match(html, /Descente des appels : Fact\(3\) → 3 \* Fact\(2\) → 3 \* \(2 \* Fact\(1\)\)/);
    assert.match(html, /Remontée des résultats : Fact\(1\)=1 → Fact\(2\)=2 → Fact\(3\)=6/);
    assert.match(html, /définition circulaire/i);
    assert.match(html, /n &lt;= 1/);
  });

  it('T5 — b1-reseaux Ch.6 : formule générale 2^h - 2 d’abord puis encadré « Pour aller plus loin — Cas particuliers avancés (/31 RFC 3021 et /32) »', () => {
    const chapters = require('../server/content/b1-reseaux/chapitres-4-6.js');
    const ch6 = chapters.find((c) => c.n === 6);
    assert.ok(ch6, 'Le chapitre 6 de b1-reseaux doit exister');

    const fullHtml = ch6.sections.map((s) => s.html).join('\n');
    const formulaIdx = fullHtml.indexOf('2^h - 2');
    const advIdx = fullHtml.indexOf('Pour aller plus loin — Cas particuliers avancés (/31 RFC 3021 et /32)');
    const rfcIdx = fullHtml.indexOf('RFC 3021');

    assert.ok(formulaIdx !== -1, 'La formule générale 2^h - 2 doit être enseignée');
    assert.ok(advIdx !== -1, 'La section « Pour aller plus loin — Cas particuliers avancés (/31 RFC 3021 et /32) » doit être présente');
    assert.ok(formulaIdx < advIdx, 'La formule 2^h - 2 doit être présentée avant la section avancée /31 et /32');
    assert.ok(advIdx < rfcIdx, 'L’explication RFC 3021 doit se trouver sous la section avancée');
  });

  it('T6 — b1-algebre Ch.1 : suppression de la référence anticipée au chapitre 4 (espace vectoriel)', () => {
    const chapters = require('../server/content/b1-algebre/chapitres-1-3.js');
    const ch1 = chapters.find((c) => c.n === 1);
    assert.ok(ch1, 'Le chapitre 1 de b1-algebre doit exister');

    const fullHtml = ch1.sections.map((s) => s.html).join('\n');
    assert.ok(!/espace vectoriel/i.test(fullHtml), 'Le chapitre 1 ne doit plus faire référence prématurément à l’espace vectoriel');
    assert.ok(!/chapitre 4/i.test(fullHtml), 'Le chapitre 1 ne doit plus renvoyer au chapitre 4');
    assert.match(fullHtml, /mêmes règles de calcul élémentaires/i);
  });

  it('T7 — Zéro emoji dans tous les fichiers modifiés du Lot 4A', () => {
    const files = [
      'index.html',
      'assets/css/portal.css',
      'b1-c-cpp/chapitres/chapitre1.html',
      'b1-python/chapitres/chapitre1.html',
      'b1-algo/chapitres/chapitre9.html',
      'server/content/b1-reseaux/chapitres-4-6.js',
      'server/content/b1-algebre/chapitres-1-3.js',
    ];
    for (const rel of files) {
      const content = read(rel);
      assert.ok(!EMOJI_RE.test(content), `Aucun emoji autorisé dans ${rel}`);
    }
  });
});
