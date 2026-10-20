/**
 * tests/audit-verification.test.js
 *
 * Banc de test automatisé validant la remédiation complète des défauts
 * d'audit pédagogique et technique :
 * - DoD-1 : Zéro occurrence de "<p class=\"q__stem\">undefined</p>"
 * - DoD-2 : Zéro fuite de prose littérale "\\n" (balises HTML adjacentes à \\n)
 * - DoD-3 : Intégrité conceptuelle du Chapitre 1 de b1-reseaux (ancrage Ausubel, P2P vs Client-Serveur, décompression des acronymes)
 * - DoD-4 : Rendu multiligne correct des blocs de code Docker (<pre><code>)
 * - DoD-5 : Robustesse du helper qcm() dans scripts/course-kit.js
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

function getAllHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'audit' || entry.name === '.taskstate' || entry.name === 'dist') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

describe('Audit Remediation Verification Suite', () => {

  test('DoD-1 : Aucun QCM ne présente un intitulé "undefined"', () => {
    const htmlFiles = getAllHtmlFiles(ROOT);
    assert.ok(htmlFiles.length > 500, `Au moins 500 pages HTML doivent être analysées (trouvé : ${htmlFiles.length})`);

    const faultyFiles = [];
    let totalUndefined = 0;

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('class="q__stem">undefined<')) {
        const count = (content.match(/class="q__stem">undefined</g) || []).length;
        faultyFiles.push({ file: path.relative(ROOT, file), count });
        totalUndefined += count;
      }
    }

    assert.equal(
      totalUndefined,
      0,
      `Détecté ${totalUndefined} QCM avec intitulé undefined dans ${faultyFiles.length} fichiers : ${JSON.stringify(faultyFiles.slice(0, 5))}`
    );
  });

  test('DoD-2 : Aucune fuite d\'échappement "\\n" dans la prose HTML', () => {
    const htmlFiles = getAllHtmlFiles(ROOT);
    const proseLeakPatterns = [
      /\\n<p/g,
      /<\/p>\\n/g,
      /\\n<li/g,
      /<\/li>\\n/g,
      /\\n<div/g,
      /<\/div>\\n/g,
      /\\n<ul/g,
      /<\/ul>\\n/g,
      /\\n<ol/g,
      /<\/ol>\\n/g,
      /\\n<strong>/g,
      /\\n<em>/g,
      /\\n<span>/g
    ];

    const leakReports = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      for (const pattern of proseLeakPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          leakReports.push({
            file: path.relative(ROOT, file),
            pattern: pattern.toString(),
            count: matches.length
          });
        }
      }
    }

    assert.equal(
      leakReports.length,
      0,
      `Détecté ${leakReports.length} fuites d'échappement \\n en prose HTML : ${JSON.stringify(leakReports.slice(0, 5))}`
    );
  });

  test('DoD-3 : Ancrage pédagogique Ausubélien dans b1-reseaux Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b1-reseaux', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b1-reseaux/chapitres/chapitre1.html doit exister');

    const content = fs.readFileSync(ch1Path, 'utf8');

    // 1. Décompression des acronymes fondamentaux
    assert.match(content, /Personal Area Network/i, 'PAN doit être décompressé');
    assert.match(content, /Local Area Network/i, 'LAN doit être décompressé');
    assert.match(content, /Wireless Local Area Network/i, 'WLAN doit être décompressé');
    assert.match(content, /Metropolitan Area Network/i, 'MAN doit être décompressé');
    assert.match(content, /Wide Area Network/i, 'WAN doit être décompressé');
    assert.match(content, /Storage Area Network/i, 'SAN doit être décompressé');

    // 2. Modèles fondamentaux Poste-à-poste vs Client-serveur
    assert.match(content, /Poste-à-poste/i, 'L\'architecture poste-à-poste doit être introduite explicitement');
    assert.match(content, /Client-serveur/i, 'L\'architecture client-serveur doit être introduite explicitement');
    assert.match(content, /pair-à-pair|peer-to-peer/i, 'Le terme P2P / pair-à-pair doit être défini');

    // 3. Typographie soignée & UI Pro Max
    assert.match(content, /box--situation/, 'Une boîte box--situation doit être présente');
    assert.match(content, /box--mnemo/, 'Une boîte box--mnemo doit être présente');
    assert.match(content, /box--pitfall/, 'Une boîte box--pitfall doit être présente');
  });

  test('DoD-3 bis : Ancrage pédagogique rigoureux dans b1-virtualisation Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b1-virtualisation', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b1-virtualisation/chapitres/chapitre1.html doit exister');

    const content = fs.readFileSync(ch1Path, 'utf8');

    // 1. Présence des concepts clés
    assert.match(content, /machines virtuelles/i, 'La notion de machine virtuelle doit être présente');
    assert.match(content, /hyperviseur/i, 'La notion d\'hyperviseur doit être introduite');
    assert.match(content, /consolidation/i, 'La notion de consolidation doit être expliquée');
    assert.match(content, /mono-service/i, 'Le modèle historique mono-service doit être posé');

    // 2. Absence de ton infantile de conte de fées
    assert.doesNotMatch(content, /Il était une fois/i, 'Le ton infantile de conte de fées doit être banni');
  });

  test('DoD-4 : Rendu multiligne non aplati des blocs de code Docker', () => {
    const dockerCh3 = path.join(ROOT, 'docker', 'chapitres', 'chapitre3.html');
    assert.ok(fs.existsSync(dockerCh3), 'docker/chapitres/chapitre3.html doit exister');

    const content = fs.readFileSync(dockerCh3, 'utf8');
    const codeBlocks = content.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/g) || [];
    assert.ok(codeBlocks.length >= 3, `Au moins 3 blocs de code attendus dans docker ch3 (trouvé ${codeBlocks.length})`);

    // Vérifier que le Dockerfile multi-stage a de vrais sauts de ligne
    const multiStageBlock = codeBlocks.find(b => b.includes('AS builder'));
    assert.ok(multiStageBlock, 'Le bloc multi-stage Dockerfile doit être présent');
    assert.ok(multiStageBlock.includes('\n'), 'Le bloc Dockerfile doit comporter de vrais retours chariot');
    assert.ok(!multiStageBlock.includes('\\n'), 'Le bloc Dockerfile ne doit pas contenir de \\n littéraux aplatis');
    assert.match(multiStageBlock, /FROM golang:1\.21-alpine AS builder/);
    assert.match(multiStageBlock, /WORKDIR \/src/);
    assert.match(multiStageBlock, /COPY --from=builder/);
  });

  test('DoD-1 helper : course-kit qcm() supporte indifféremment les schémas de questions', () => {
    const courseKit = require('../scripts/course-kit');
    assert.equal(typeof courseKit.qcm, 'function');

    // Schéma { stem, opts, correct, exp }
    const html1 = courseKit.qcm([
      { stem: 'Question test stem', opts: ['A', 'B'], correct: 0, exp: 'Explication 1' }
    ]);
    assert.match(html1, /Question test stem/);
    assert.doesNotMatch(html1, />undefined</);
    assert.match(html1, /Explication 1/);

    // Schéma { q, choices, answer, explanation }
    const html2 = courseKit.qcm([
      { q: 'Question test q', choices: ['C', 'D'], answer: 1, explanation: 'Explication 2' }
    ]);
    assert.match(html2, /Question test q/);
    assert.doesNotMatch(html2, />undefined</);
    assert.match(html2, /Explication 2/);

    // Schéma { q, options, correct, exp }
    const html3 = courseKit.qcm([
      { q: 'Question test options', options: ['X', 'Y'], correct: 0, exp: 'Explication 3' }
    ]);
    assert.match(html3, /Question test options/);
    assert.doesNotMatch(html3, />undefined</);
  });

  test('DoD-3 ter : Ancrage pédagogique dans b1-admin-windows Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b1-admin-windows', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b1-admin-windows/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /administrateur local/i, 'Compte local doit être ancré');
    assert.match(content, /Active Directory/i, 'Active Directory doit être introduit');
    assert.match(content, /Windows Server 2022 et 2025/i, 'Continuité WS 2022/2025 doit être présente');
  });

  test('DoD-3 quater : Cadrage métier et architecture dans b1-projet Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b1-projet', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b1-projet/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /gestion de stock/i, 'Le cas d\'usage gestion de stock doit être explicité');
    assert.match(content, /architecture.*couches/i, 'L\'architecture en couches doit être justifiée');
    assert.match(content, /Tkinter.*PostgreSQL/i, 'Le découplage IHM et persistance doit être clair');
  });

  test('DoD-3 quinquies : Modèle mental de l\'atelier dans b1-architecture Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b1-architecture', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b1-architecture/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /artisan/i, 'L\'analogie de l\'artisan doit être présente');
    assert.match(content, /établi/i, 'La RAM comme établi de travail immédiat');
    assert.match(content, /armoire de rangement/i, 'Le disque/SSD comme armoire de stockage');
  });

  test('DoD-3 sexies : Modèle systémique et cas pizzeria dans b1-merise Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b1-merise', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b1-merise/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /pizzeria|restaurant/i, 'L\'ancrage pizzeria/restaurant doit être présent');
    assert.match(content, /système opérant/i, 'Le système opérant doit être illustré');
    assert.match(content, /système de décision/i, 'Le système de décision doit être illustré');
    assert.match(content, /système d['’]information/i, 'Le système d\'information doit être illustré');
  });

  test('DoD-3 septies : Ancrage physique du signal dans b1-ccna1 Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b1-ccna1', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b1-ccna1/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /Signal physique/i, 'Le signal physique doit être introduit');
    assert.match(content, /torsade/i, 'La raison d\'être de la torsade doit être expliquée');
    assert.match(content, /parasite|diaphonie|crosstalk/i, 'L\'annulation des parasites doit être expliquée');
  });

  test('DoD-3 octies : Analogie de l\'odomètre dans assembleur Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'assembleur', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'assembleur/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /compteur kilométrique/i, 'L\'analogie du compteur kilométrique doit être présente');
    assert.match(content, /complément à 2/i, 'Le complément à 2 doit être démystifié');
  });

  test('DoD-3 nonies : Analogie Post-it vs étiquette d\'entrepôt dans csharp Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'csharp', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'csharp/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /Post-it/i, 'L\'analogie du Post-it pour les types valeur doit être présente');
    assert.match(content, /étiquette.*meuble.*entrepôt/i, 'L\'analogie de l\'étiquette d\'entrepôt pour les types référence');
  });

  test('DoD-3 decies : Règle 3-2-1-1-0 et continuité moderne dans rd_winserver Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'rd_winserver', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'rd_winserver/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /3-2-1-1-0/i, 'La règle 3-2-1-1-0 anti-ransomware doit être présente');
    assert.match(content, /Windows Server 2022 et 2025/i, 'La continuité moderne doit être posée');
  });

  test('DoD-3 undecies : Rappel 3-Way Handshake et faiblesse stateless dans b3-firewall Chapitre 1', () => {
    const ch1Path = path.join(ROOT, 'b3-firewall', 'chapitres', 'chapitre1.html');
    assert.ok(fs.existsSync(ch1Path), 'b3-firewall/chapitres/chapitre1.html doit exister');
    const content = fs.readFileSync(ch1Path, 'utf8');
    assert.match(content, /3-Way Handshake/i, 'Le rappel de la poignée de main TCP doit être présent');
    assert.match(content, /ESTABLISHED/i, 'L\'état ESTABLISHED doit être nommé');
    assert.match(content, /conntrack/i, 'La table d\'état conntrack doit être expliquée');
  });

});
