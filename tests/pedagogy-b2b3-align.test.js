'use strict';

/**
 * Lot 4D — Pedagogy-B2B3-Align
 *
 * Vérifie :
 * 1. Le recentrage de `rd_winserver` Ch.5 et Ch.6 sur l'administration Windows Server B2
 *    (GPO avancées, réplication AD multi-sites, 5 rôles FSMO, Hyper-V, wbadmin/BMR/VSS,
 *    FSRM quotas & filtrage de fichiers, WSUS, surveillance d'événements/performances)
 *    sans régression sur les sections vérifiées par les tests existants.
 * 2. La progression spiralaire explicite et la déduplication B1 → B2 → B3 :
 *    - `linux` (B2) vs `b1-linux` (B1)
 *    - `sql` (B2) vs `b3-sql` (B3)
 *    - `b3-firewall` vs `b3-pfsense`
 *    - `b3-cloud-computing` vs `b3-cloud-aws`, `b3-cloud-azure`, `b3-google-cloud`
 * 3. Le bloc automatique « Prérequis recommandés » (`<section class="course-prereqs" ...>`)
 *    dans `scripts/course-kit.js` pour tous les cours B2 et B3.
 * 4. L'absence totale d'emoji dans tous les fichiers du lot.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const kit = require('../scripts/course-kit');
const { COURSES } = require('../server/courses');

function collectText(chapter) {
  const parts = [
    chapter.title || '',
    chapter.short || '',
    chapter.toc || '',
    chapter.situation || '',
    ...(chapter.objectives || []),
    ...(chapter.sections || []).map((s) => `${s.title || ''} ${s.html || ''}`),
    ...(chapter.questions || []).map(
      (q) => `${q.stem || ''} ${(q.opts || []).join(' ')} ${q.exp || ''}`
    ),
    ...(chapter.pitfalls || []),
    ...(chapter.method || []),
    ...(chapter.summary || []),
    ...(chapter.checklist || []),
    ...(chapter.notions || []),
    ...(chapter.flashcards || []).map((f) => `${f.q || ''} ${f.a || ''}`)
  ];
  return parts.join('\n');
}

/* ==========================================================================
 * 1. rd_winserver Ch.5 & Ch.6 — Administration Windows Server B2
 * ========================================================================== */

test('rd_winserver Ch.5 couvre les GPO avancées, la réplication AD multi-sites, les 5 rôles FSMO et Hyper-V', () => {
  const ch4to6 = require('../server/content/rd_winserver/chapitres-4-6');
  const ch5 = ch4to6.find((c) => c.n === 5);
  assert.ok(ch5, 'Le chapitre 5 de rd_winserver doit exister');
  const text = collectText(ch5);

  // GPO avancées
  assert.match(text, /GPO|Group Policy/i);
  assert.match(text, /h[ée]ritage/i);
  assert.match(text, /application forc[ée]e|Enforced/i);
  assert.match(text, /filtrage de s[ée]curit[ée]|Security Filtering/i);
  assert.match(text, /filtre[s]?\s+WMI|WQL/i);

  // Réplication Active Directory multi-sites
  assert.match(text, /r[ée]plication\s+Active Directory\s+multi-sites|multi-sites/i);
  assert.match(text, /KCC|Knowledge Consistency Checker/i);

  // Les 5 rôles FSMO
  assert.match(text, /FSMO/);
  assert.match(text, /Schema Master/i);
  assert.match(text, /Domain Naming Master/i);
  assert.match(text, /RID Master/i);
  assert.match(text, /PDC Emulator/i);
  assert.match(text, /Infrastructure Master/i);

  // Gestion Hyper-V sous Windows Server
  assert.match(text, /Hyper-V/i);
  assert.match(text, /VHDX/i);
});

test('rd_winserver Ch.6 couvre Windows Server Backup (wbadmin, BMR, VSS), FSRM (quotas et filtrage), WSUS et la surveillance', () => {
  const ch4to6 = require('../server/content/rd_winserver/chapitres-4-6');
  const ch6 = ch4to6.find((c) => c.n === 6);
  assert.ok(ch6, 'Le chapitre 6 de rd_winserver doit exister');
  const text = collectText(ch6);

  // Windows Server Backup, wbadmin, Bare-Metal Recovery, VSS
  assert.match(text, /Windows Server Backup/i);
  assert.match(text, /wbadmin/i);
  assert.match(text, /Bare-Metal Recovery|BMR/i);
  assert.match(text, /VSS|Volume Shadow Copy/i);

  // FSRM : quotas et filtrage de fichiers
  assert.match(text, /FSRM|File Server Resource Manager|Gestionnaire de ressources du serveur de fichiers/i);
  assert.match(text, /quota/i);
  assert.match(text, /filtrage de fichiers|File Screening/i);

  // WSUS
  assert.match(text, /WSUS|Windows Server Update Services/i);

  // Surveillance d'événements et de performances
  assert.match(text, /Event Viewer|Get-WinEvent|observateur d’[ée]v[ée]nements/i);
  assert.match(text, /Performance Monitor|PerfMon|compteurs de performance/i);
});

/* ==========================================================================
 * 2. Progression spiralaire & déduplication B1 → B2 → B3
 * ========================================================================== */

test('linux (B2) inclut un Rappel Express des acquis B1 (b1-linux) au Ch.1 et approfondit systemd, journalctl, LVM, nmcli/ip route, SSH & fail2ban', () => {
  const ch1to3 = require('../server/content/linux/chapitres-1-3');
  const ch4to6 = require('../server/content/linux/chapitres-4-6');
  const ch1Text = collectText(ch1to3[0]);
  const allText = [...ch1to3, ...ch4to6].map(collectText).join('\n');

  assert.match(ch1Text, /Rappel Express des acquis B1/i);
  assert.match(ch1Text, /\/b1-linux\//);

  assert.match(allText, /systemd/i);
  assert.match(allText, /\.timer|timers/i);
  assert.match(allText, /journalctl/i);
  assert.match(allText, /pvcreate/i);
  assert.match(allText, /vgcreate/i);
  assert.match(allText, /lvextend/i);
  assert.match(allText, /nmcli/i);
  assert.match(allText, /ip route/i);
  assert.match(allText, /PermitRootLogin/i);
  assert.match(allText, /fail2ban/i);
});

test('sql (B2) et b3-sql (B3) différencient explicitement leur périmètre dans la progression B1 → B2 → B3', () => {
  const sqlCh1 = require('../server/content/sql/chapitre1');
  const b3SqlCh1 = require('../server/content/b3-sql/chapitre1');
  const sqlText = collectText(sqlCh1);
  const b3SqlText = collectText(b3SqlCh1);

  // sql (B2) renvoie vers B1 (/b1-sql/) et B3 (/b3-sql/) et affiche son périmètre B2
  assert.match(sqlText, /\/b1-sql\//);
  assert.match(sqlText, /\/b3-sql\//);
  assert.match(sqlText, /vues|VIEW/i);
  assert.match(sqlText, /proc[ée]dures stock[ée]es/i);
  assert.match(sqlText, /triggers|d[ée]clencheurs/i);
  assert.match(sqlText, /ACID/);

  // b3-sql (B3) renvoie vers B2 (/sql/) et affiche son périmètre DBA / moteur interne
  assert.match(b3SqlText, /\/sql\//);
  assert.match(b3SqlText, /EXPLAIN ANALYZE/i);
  assert.match(b3SqlText, /Seq Scan/i);
  assert.match(b3SqlText, /Index Scan/i);
  assert.match(b3SqlText, /B-Tree/i);
  assert.match(b3SqlText, /GIN/);
  assert.match(b3SqlText, /BRIN/);
  assert.match(b3SqlText, /MVCC/);
  assert.match(b3SqlText, /WAL/);
  assert.match(b3SqlText, /streaming replication|r[ée]plication en streaming/i);
});

test('b3-firewall et b3-pfsense différencient explicitement architecture multi-zones vs implémentation appliance', () => {
  const fwCh1 = require('../server/content/b3-firewall/chapitre1');
  const pfCh1 = require('../server/content/b3-pfsense/chapitre1');
  const pfCh5 = require('../server/content/b3-pfsense/chapitre5');
  const pfCh6 = require('../server/content/b3-pfsense/chapitre6');

  const fwText = collectText(fwCh1);
  const pfText = [pfCh1, pfCh5, pfCh6].map(collectText).join('\n');
  const pfCh1Text = collectText(pfCh1);

  // b3-firewall : architecture multi-zones, DMZ, Zero Trust, WAF, IDS/IPS Suricata/Snort, nftables/iptables + lien vers /b3-pfsense/
  assert.match(fwText, /\/b3-pfsense\//);
  assert.match(fwText, /DMZ/);
  assert.match(fwText, /Zero Trust/i);
  assert.match(fwText, /WAF/);
  assert.match(fwText, /Suricata/i);
  assert.match(fwText, /Snort/i);
  assert.match(fwText, /nftables/i);
  assert.match(fwText, /iptables/i);

  // b3-pfsense : implémentation appliance pfSense, NAT/Port Forwarding, OpenVPN/IPsec/WireGuard, CARP/pfsync, HAProxy + lien vers /b3-firewall/
  assert.match(pfCh1Text, /\/b3-firewall\//);
  assert.match(pfText, /Port Forwarding/i);
  assert.match(pfText, /OpenVPN/i);
  assert.match(pfText, /IPsec/i);
  assert.match(pfText, /WireGuard/i);
  assert.match(pfText, /CARP/);
  assert.match(pfText, /pfsync/i);
  assert.match(pfText, /HAProxy/i);
});

test('b3-cloud-computing est établi comme socle architectural et b3-cloud-aws / b3-cloud-azure / b3-cloud-google-cloud y renvoient explicitement', () => {
  const ccCh1 = collectText(require('../server/content/b3-cloud-computing/chapitre1'));
  const awsCh1 = collectText(require('../server/content/b3-cloud-aws/chapitre1'));
  const azCh1 = collectText(require('../server/content/b3-cloud-azure/chapitre1'));
  const gcpCh1 = collectText(require('../server/content/b3-google-cloud/chapitre1'));

  // Socle b3-cloud-computing
  assert.match(ccCh1, /IaaS/);
  assert.match(ccCh1, /PaaS/);
  assert.match(ccCh1, /SaaS/);
  assert.match(ccCh1, /responsabilit[ée] partag[ée]e|Shared Responsibility/i);
  assert.match(ccCh1, /FinOps/i);
  assert.match(ccCh1, /Multi-cloud/i);
  assert.match(ccCh1, /\/b3-cloud-aws\//);
  assert.match(ccCh1, /\/b3-cloud-azure\//);
  assert.match(ccCh1, /\/b3-google-cloud\//);

  // Renvois vers /b3-cloud-computing/ et spécificités fournisseurs
  assert.match(awsCh1, /\/b3-cloud-computing\//);
  assert.match(awsCh1, /IAM/);
  assert.match(awsCh1, /VPC/);
  assert.match(awsCh1, /\baws\b/);

  assert.match(azCh1, /\/b3-cloud-computing\//);
  assert.match(azCh1, /Entra ID|RBAC|IAM/i);
  assert.match(azCh1, /VNet/i);
  assert.match(azCh1, /\baz\b/);

  assert.match(gcpCh1, /\/b3-cloud-computing\//);
  assert.match(gcpCh1, /IAM/);
  assert.match(gcpCh1, /VPC/);
  assert.match(gcpCh1, /\bgcloud\b/);
});

/* ==========================================================================
 * 3. Bloc automatique « Prérequis recommandés » dans scripts/course-kit.js
 * ========================================================================== */

test('scripts/course-kit.js définit COURSE_PREREQS pour tous les cours B2 et B3 et injecte <section class="course-prereqs"> sur index.html', () => {
  assert.ok(kit.COURSE_PREREQS, 'kit.COURSE_PREREQS doit être exporté');
  assert.equal(typeof kit.renderPrereqs, 'function', 'kit.renderPrereqs doit être une fonction');
  assert.equal(typeof kit.index, 'function', 'kit.index doit être une fonction');

  const b2b3Slugs = Object.entries(COURSES)
    .filter(([, meta]) => meta.level === 'b2' || meta.level === 'b3')
    .map(([slug]) => slug);

  assert.ok(b2b3Slugs.length >= 45, 'Au moins 45 cours B2/B3 doivent être répertoriés');

  for (const slug of b2b3Slugs) {
    const prereqs = kit.COURSE_PREREQS[slug];
    assert.ok(
      Array.isArray(prereqs) && prereqs.length > 0,
      `COURSE_PREREQS['${slug}'] doit contenir au moins un prérequis B1/B2`
    );
    for (const item of prereqs) {
      assert.ok(item.href && item.href.startsWith('/'), `Lien prérequis invalide pour ${slug}`);
      assert.ok(item.title && item.title.length > 2, `Titre prérequis invalide pour ${slug}`);
    }

    const fakeCourse = {
      id: slug,
      slug,
      brand: slug,
      brandIcon: 'terminal',
      accent: '#1d4ed8',
      accentDeep: '#1e40af',
      accentSoft: '#eff6ff',
      accentBorder: '#bfdbfe',
      storeKey: `test:${slug}`,
      title: `Cours ${slug}`,
      description: `Description ${slug}`,
      chapters: [{ n: 1, title: 'Chapitre 1' }]
    };

    const html = kit.page(fakeCourse, 'index.html', {
      title: fakeCourse.title,
      description: fakeCourse.description,
      active: 'home',
      body: '<h1>Titre</h1>\n<p class="lead">Introduction.</p>'
    });

    assert.match(
      html,
      /<section class="course-prereqs"[^>]*>/,
      `La page index.html de ${slug} doit contenir <section class="course-prereqs">`
    );
    assert.match(html, /Pr[ée]requis recommand[ée]s/);
    assert.ok(
      html.includes(`href="${prereqs[0].href}"`),
      `La page index.html de ${slug} doit contenir un lien cliquable vers ${prereqs[0].href}`
    );
  }
});

/* ==========================================================================
 * 4. Zéro emoji dans les fichiers touchés par le Lot 4D
 * ========================================================================== */

test('Aucun fichier du Lot 4D ne contient d’emoji', () => {
  const files = [
    'scripts/course-kit.js',
    'server/content/rd_winserver/chapitres-4-6.js',
    'server/content/rd_winserver/chapitre5.js',
    'server/content/rd_winserver/chapitre6.js',
    'server/content/linux/chapitres-1-3.js',
    'server/content/linux/chapitres-4-6.js',
    'server/content/sql/chapitre1.js',
    'server/content/b3-sql/chapitre1.js',
    'server/content/b3-firewall/chapitre1.js',
    'server/content/b3-pfsense/chapitre1.js',
    'server/content/b3-pfsense/chapitre5.js',
    'server/content/b3-pfsense/chapitre6.js',
    'server/content/b3-cloud-computing/chapitre1.js',
    'server/content/b3-cloud-aws/chapitre1.js',
    'server/content/b3-cloud-azure/chapitre1.js',
    'server/content/b3-google-cloud/chapitre1.js'
  ];
  const emojiRe = /\p{Emoji_Presentation}|(?![©®™])\p{Extended_Pictographic}/u;
  for (const rel of files) {
    const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.equal(emojiRe.test(src), false, `Emoji détecté dans ${rel}`);
  }
});
