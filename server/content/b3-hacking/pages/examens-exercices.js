/**
 * Pages « examens » et « exercices » du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Hacking Éthique &amp; Pentest B3</h1>',
    '  <p class="lead">Deux épreuves académiques complètes conformes au niveau Bachelor 3 et aux certifications professionnelles de sécurité offensive (CEH, OSCP, eJPT) : cadre légal, méthodologie PTES, reconnaissance OSINT/DNS, balayage réseau Nmap, OWASP Top 10, exploitation système, élévation de privilèges et rédaction de rapport de pentest.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Cadre Juridique, Méthodologie Offensive &amp; Vulnérabilités Web', [
      '<h4>Partie 1 : Cadre Légal, Éthique &amp; Méthodologie PTES (6 points)</h4>',
      '<ol>',
      '  <li>Citez et expliquez l\'article 323-1 du Code Pénal français relatif à l\'accès frauduleux à un système de traitement automatisé de données (STAD). Quelles sont les peines encourues en cas d\'altération de données ? Pourquoi un ordre oral de son supérieur ne constitue-t-il pas une protection juridique pour l\'auditeur ? (3 pts)</li>',
      '  <li>Distinguez les approches de test d\'intrusion en boîte noire (Black Box), boîte grise (Grey Box) et boîte blanche (White Box). Dans quel contexte opérationnel chaque méthode est-elle préconisée ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Balayage Réseau, Sondes TCP &amp; Analyse Nmap (7 points)</h4>',
      '<ol>',
      '  <li>Expliquez le fonctionnement technique détaillé du scan SYN Stealth (-sS) de Nmap par rapport au scan TCP Connect (-sT). Pourquoi le scan SYN est-il qualifié de "demi-ouvert" et en quoi était-il historiquement plus furtif ? (4 pts)</li>',
      '  <li>Lors d\'un scan Nmap avec l\'option <code>-sA</code> (ACK Scan), une sonde renvoie un paquet TCP avec le drapeau <code>RST</code>. Comment Nmap interprète-t-il cet état et quelle information cela apporte-t-il sur la présence d\'un pare-feu avec état (Stateful Firewall) ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Vulnérabilités Web OWASP &amp; Injections SQL (7 points)</h4>',
      '<ol>',
      '  <li>Détaillez la différence entre une injection SQL in-band de type UNION-based et une injection SQL aveugle basée sur le temps (Time-based Blind SQLi). Pourquoi l\'injection temporelle nécessite-t-elle l\'emploi d\'outils d\'automatisation comme sqlmap ? (4 pts)</li>',
      '  <li>Pourquoi le filtrage par liste noire (Blacklist) de mots-clés SQL (comme <code>SELECT</code> ou <code>OR</code>) est-il totalement inefficace pour contrer les injections SQL ? Quelle est l\'unique mesure de remédiation définitive préconisée par l\'OWASP ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Article 323-1 du Code Pénal (3 pts) :</strong> ' +
      '  L\'article 323-1 réprime le fait d\'accéder ou de se maintenir frauduleusement dans tout ou partie d\'un système de traitement automatisé de données (STAD) (jusqu\'à 3 ans d\'emprisonnement et 100 000 € d\'amende). ' +
      '  Lorsqu\'il en résulte soit la suppression ou la modification de données, soit une altération du fonctionnement du système, la peine est portée à 5 ans d\'emprisonnement et 150 000 € d\'amende. ' +
      '  Un ordre oral n\'a aucune valeur exonératoire : sans convention écrite formelle (lettre de mission signée par le représentant légal de l\'entité propriétaire des systèmes précisant le périmètre exact et les dates), l\'acte est réputé illégal et relève de la responsabilité pénale personnelle de l\'auditeur.</li>',
      '  <li><strong>Typologie des Approches de Pentest (3 pts) :</strong> ' +
      '  - <em>Boîte Noire (Black Box) :</em> Aucune information préalable (seul le nom de l\'entreprise ou le domaine est fourni). Simule la posture d\'un attaquant externe opportuniste. Coûteuse en temps de reconnaissance. ' +
      '  - <em>Boîte Grise (Grey Box) :</em> Accès partiel (compte utilisateur standard, schémas d\'architecture haut niveau). Représente le scénario le plus réaliste et rentable (attaquant ayant compromis un compte ou collaborateur malveillant). ' +
      '  - <em>Boîte Blanche (White Box) :</em> Accès intégral aux codes sources, documentations, configurations réseau et comptes administrateurs. Utilisé pour les audits d\'architecture et revues de code approfondies.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Scan SYN (-sS) vs TCP Connect (-sT) (4 pts) :</strong> ' +
      '  Le scan TCP Connect (<code>-sT</code>) utilise l\'appel système <code>connect()</code> du système d\'exploitation et mène à son terme la poignée de mains 3-way (SYN -&gt; SYN/ACK -&gt; ACK), ce qui déclenche la journalisation immédiate de la session dans les logs applicatifs du serveur cible. ' +
      '  Le scan SYN Stealth (<code>-sS</code>) forge directement les paquets réseau : après réception du SYN/ACK indiquant un port ouvert, Nmap envoie immédiatement un paquet <code>RST</code> (Reset) pour déchirer la connexion sans jamais envoyer le ACK final. La connexion n\'étant jamais finalisée, elle n\'était historiquement pas enregistrée par les daemons applicatifs.</li>',
      '  <li><strong>Interprétation de l\'ACK Scan (-sA) (3 pts) :</strong> ' +
      '  Le paquet ACK est conçu pour accuser réception de données au sein d\'une connexion déjà établie. Face à une sonde ACK isolée sur un port, si aucun pare-feu avec état n\'intercepte le paquet, la pile TCP de l\'hôte cible répond immédiatement par un RST car la connexion n\'existe pas dans sa table de sessions : Nmap classe le port comme <code>UNFILTERED</code>. ' +
      '  Si un pare-feu avec état (Stateful Firewall) est présent, il rejette ou dépose silencieusement (Drop/Timeout) le paquet car il ne correspond à aucune connexion valide existante dans sa table de suivi : Nmap classe le port comme <code>FILTERED</code>. L\'ACK scan sert donc à cartographier le filtrage du pare-feu et non à déterminer l\'ouverture d\'un port.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>SQLi In-band vs Time-based Blind (4 pts) :</strong> ' +
      '  L\'injection in-band (UNION-based) permet d\'afficher directement les données extraites (tables, hashes) au sein même de la réponse HTTP de la page web. ' +
      '  À l\'inverse, dans une injection aveugle temporelle (Time-based Blind), l\'application web ne renvoie aucune donnée ni aucun message d\'erreur SQL : l\'attaquant injecte une fonction conditionnelle provoquant une temporisation (ex: <code>SLEEP(5)</code> ou <code>pg_sleep(5)</code>) lorsque sa supposition sur un caractère est vraie. ' +
      '  L\'extraction nécessitant de tester séquentiellement chaque caractère bit à bit ou lettre par lettre en mesurant les délais de réponse de chaque requête, elle requiert des centaines de requêtes automatisées via des outils comme sqlmap.</li>',
      '  <li><strong>Échec des Listes Noires &amp; Solution Définitive (3 pts) :</strong> ' +
      '  Les listes noires échouent systématiquement car les attaquants exploitent une infinité de variantes d\'obfuscation : variation de casse (<code>sElEcT</code>), encodages multiples (URL, double-URL, hexadécimal), commentaires insérés (<code>SEL/**/ECT</code>) ou fonctions équivalentes. ' +
      '  L\'unique remédiation définitive et universelle est l\'utilisation stricte de <strong>requêtes préparées (Prepared Statements)</strong> avec liaison de paramètres (Parameterized Queries) : le moteur SQL compile la structure syntaxique de la requête avant d\'y injecter les valeurs utilisateur, traitant ces dernières exclusivement comme des données littérales inoffensives et rendant toute modification de l\'arbre syntaxique impossible.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Terminal — Étude de Cas Complète d\'Intrusion &amp; Synthèse Managériale', [
      '<h4>Mise en situation opérationnelle : Scénario "Fintech PayShield"</h4>',
      '<p>Vous réalisez un test d\'intrusion en boîte grise commandité par la direction de la plateforme de paiement <em>PayShield</em>. Le périmètre couvre l\'application web de gestion financière et les serveurs d\'infrastructure associés.</p>',
      '<h4>Question 1 : Reconnaissance DNS &amp; Vulnérabilités de Messagerie (4 points)</h4>',
      '<p>L\'interrogation des enregistrements DNS du domaine révèle :<br>' +
      '<code>v=spf1 mx include:_spf.google.com +all</code><br>' +
      'Aucun enregistrement TXT n\'est présent sur le sous-domaine <code>_dmarc.payshield.com</code>.<br>' +
      'Expliquez en détail le risque d\'usurpation d\'identité (Email Spoofing) encouru par PayShield. Rédigez les enregistrements SPF et DMARC corrigés et sécurisés conformes aux meilleures pratiques.</p>',
      '<h4>Question 2 : Exploitation de Faille Web &amp; Traversée de Répertoire (5 points)</h4>',
      '<p>L\'analyse des paramètres de l\'application web montre qu\'un point d\'accès permet de télécharger des factures : <code>GET /api/download?file=invoice_2026.pdf</code>.<br>' +
      '1. Quel type de vulnérabilité suspectez-vous et quel vecteur d\'attaque testeriez-vous pour lire <code>/etc/passwd</code> ?<br>' +
      '2. Si un filtre bloque la chaîne <code>../</code>, décrivez trois techniques de contournement d\'encodage utilisées par les attaquants.<br>' +
      '3. Comment une telle faille peut-elle évoluer en exécution de code à distance (RCE) via Local File Inclusion (LFI) ?</p>',
      '<h4>Question 3 : Escalade de Privilèges Linux &amp; Persistance (6 points)</h4>',
      '<p>Après obtention d\'un shell initial non privilégié sous le compte <code>www-data</code> :<br>' +
      '1. La commande <code>find / -perm -4000 -type f 2&gt;/dev/null</code> révèle que le binaire <code>/usr/bin/find</code> possède le bit SUID et appartient à <code>root</code>. Donnez la commande exacte permettant d\'obtenir un shell root interactif.<br>' +
      '2. La commande <code>sudo -l</code> indique : <code>(ALL) NOPASSWD: /usr/bin/vim /etc/nginx/sites-available/*</code>. Comment un attaquant peut-il exploiter cette règle pour élever ses privilèges ?<br>' +
      '3. Citez deux mécanismes discrets utilisés par les attaquants pour maintenir leur accès persistant sur le serveur après redémarrage.</p>',
      '<h4>Question 4 : Synthèse Managériale &amp; Matrice de Remédiation (5 points)</h4>',
      '<p>Rédigez l\'Executive Summary (15 à 20 lignes) destiné au Comité de Direction de PayShield. Vous y intégrerez le niveau de risque global qualifié, l\'impact financier et réputationnel potentiel, et un plan d\'action priorisé en 3 phases (Immédiat, Moyen terme, Long terme).</p>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Terminal', [
      '<h4>Corrigé Question 1 : DNS, SPF &amp; DMARC (4 points)</h4>',
      '<ul>',
      '  <li><strong>Risque d\'Usurpation (2 pts) :</strong> ' +
      '  La directive <code>+all</code> en fin d\'enregistrement SPF autorise explicitement n\'importe quel serveur ou adresse IP dans le monde à émettre des emails au nom du domaine <code>payshield.com</code>. De plus, l\'absence totale d\'enregistrement DMARC empêche les serveurs destinataires d\'appliquer une politique de quarantaine ou de rejet en cas d\'échec SPF. ' +
      '  Un attaquant peut donc envoyer des emails d\'ingénierie sociale ou de fraude au président (Business Email Compromise) rigoureusement indistinguables d\'emails légitimes.</li>',
      '  <li><strong>Enregistrements Sécurisés Recommandés (2 pts) :</strong><br>' +
      '  SPF : <code>v=spf1 mx include:_spf.google.com -all</code> (remplacement du mécanisme permissif par un hardfail strict <code>-all</code>).<br>' +
      '  DMARC : <code>v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-reports@payshield.com</code> (politique stricte de rejet immédiat de tout email non aligné).</li>',
      '</ul>',
      '<h4>Corrigé Question 2 : Traversée de Répertoire &amp; LFI (5 points)</h4>',
      '<ul>',
      '  <li><strong>Vecteur d\'Attaque (1.5 pt) :</strong> ' +
      '  Vulnérabilité de traversée de répertoire (Path Traversal / Arbitrary File Read). Vecteur de test : <code>GET /api/download?file=../../../../etc/passwd</code> pour remonter l\'arborescence jusqu\'à la racine du système de fichiers.</li>',
      '  <li><strong>Contournements d\'Encodage (1.5 pt) :</strong> ' +
      '  1. Encodage URL standard : <code>%2e%2e%2f</code> ou encodage des séparateurs <code>..%2f</code> / <code>..%5c</code>.<br>' +
      '  2. Double encodage URL : <code>%252e%252e%252f</code> (si l\'application décode deux fois l\'entrée).<br>' +
      '  3. Séquences imbriquées : <code>....//</code> ou <code>..././</code> (si le filtre supprime <code>../</code> de manière non récursive en une seule passe).</li>',
      '  <li><strong>Évolution vers RCE (2 pts) :</strong> ' +
      '  Si la fonction PHP sous-jacente utilise <code>include()</code> ou <code>require()</code> (LFI) plutôt qu\'un simple <code>file_get_contents()</code>, l\'attaquant peut exécuter du code arbitraire en incluant un fichier contenant du code PHP qu\'il contrôle : empoisonnement des journaux du serveur web (Apache/Nginx Log Poisoning via le User-Agent), inclusion de sessions PHP stockées dans <code>/var/lib/php/sessions/</code>, ou exploitation des wrappers PHP (ex: <code>php://input</code> ou <code>data://text/plain;base64,...</code>).</li>',
      '</ul>',
      '<h4>Corrigé Question 3 : Élévation de Privilèges &amp; Persistance (6 points)</h4>',
      '<ul>',
      '  <li><strong>Exploitation find SUID (2 pts) :</strong> ' +
      '  Le binaire <code>find</code> avec SUID root permet d\'exécuter des commandes système avec l\'option <code>-exec</code> tout en conservant les privilèges effectifs de root :<br>' +
      '  <code>/usr/bin/find . -exec /bin/sh -p \\; -quit</code><br>' +
      '  Le drapeau <code>-p</code> force le shell à ne pas abandonner les privilèges SUID (euid=0), fournissant un accès root immédiat.</li>',
      '  <li><strong>Exploitation sudoers vim (2 pts) :</strong> ' +
      '  L\'éditeur <code>vim</code> dispose d\'une fonctionnalité native d\'exécution de commandes shell depuis son invite interne. En exécutant :<br>' +
      '  <code>sudo /usr/bin/vim /etc/nginx/sites-available/default</code><br>' +
      '  Puis en tapant dans l\'éditeur : <code>:!/bin/sh</code> ou <code>:shell</code>, l\'attaquant fait spawner un shell interactif exécuté sous l\'identité de root avec privilèges complets.</li>',
      '  <li><strong>Mécanismes de Persistance Discrets (2 pts) :</strong> ' +
      '  1. Injection d\'une clé publique SSH contrôlée par l\'attaquant dans <code>/root/.ssh/authorized_keys</code> permettant une connexion SSH directe.<br>' +
      '  2. Création d\'une tâche planifiée dans <code>/etc/cron.d/sys-update</code> ou d\'un service systemd personnalisé (<code>/etc/systemd/system/maintenance.service</code>) exécutant un reverse shell chiffré périodique vers le serveur C2 de l\'attaquant.</li>',
      '</ul>',
      '<h4>Corrigé Question 4 : Synthèse Managériale (5 points)</h4>',
      box('standard', 'Modèle de Synthèse Managériale pour le Comité de Direction', [
        '<p><strong>Rapport d\'Audit de Sécurité — Plateforme PayShield (Niveau de Risque Global : CRITIQUE)</strong></p>',
        '<p>Lors de la mission d\'intrusion réalisée entre le 5 et le 8 octobre 2026, nos équipes ont identifié une chaîne d\'attaque critique permettant à un attaquant externe non authentifié d\'obtenir un contrôle total et persistant sur les serveurs de traitement financier de PayShield. ' +
        'L\'exploitation d\'une vulnérabilité de traversée de répertoire non filtrée a permis la compromission initiale du serveur web, suivie d\'une escalade immédiate vers les privilèges administrateur suprêmes (root) en exploitant des droits SUID et sudoers permissifs. ' +
        'Ce niveau d\'accès permettait l\'extraction intégrale des bases de données de transactions bancaires et l\'interruption du service de paiement, représentant un risque de sanction réglementaire sévère (RGPD/PCI-DSS) et une perte de confiance préjudiciable auprès des partenaires bancaires.</p>',
        '<p><strong>Plan d\'Action et Recommandations Priorisées :</strong></p>',
        '<ul>',
        '  <li><strong>Horizon Immédiat (&lt; 24 h) :</strong> Révocation immédiate du bit SUID sur <code>/usr/bin/find</code>, suppression des directives <code>NOPASSWD:</code> excessives dans <code>/etc/sudoers</code>, et déploiement d\'un patch de validation stricte par liste blanche sur le point d\'accès de téléchargement.</li>',
        '  <li><strong>Horizon Court Terme (&lt; 15 jours) :</strong> Publication d\'enregistrements SPF stricts (<code>-all</code>) et DMARC en mode <code>reject</code> pour neutraliser le risque d\'usurpation d\'email et de fraude au président ; segmentation réseau stricte isolant les serveurs web de la base de données de production.</li>',
        '  <li><strong>Horizon Moyen Terme (&lt; 60 jours) :</strong> Mise en place d\'une revue de code systématique dans la chaîne CI/CD, déploiement d\'un WAF applicatif managé et audit annuel de résilience offensif.</li>',
        '</ul>'
      ])
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'exercices.html', label: 'Voir le catalogue d\'exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs & corrigés — ' + course.brand,
      description: 'Épreuves types du cours Hacking Éthique & Pentest B3 : Contrôle Continu et Examen Terminal corrigés avec barème détaillé.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices' }
  ]);

  const allExos = require('../../../exercises/b3-hacking');

  const exosByChapter = {};
  for (const ex of allExos) {
    if (!exosByChapter[ex.chapter]) exosByChapter[ex.chapter] = [];
    exosByChapter[ex.chapter].push(ex);
  }

  const sectionsHtml = chapterList.map(ch => {
    const list = exosByChapter[ch.n] || [];
    const rows = list.map(ex => [
      '    <tr>',
      '      <td><code>' + ex.id + '</code></td>',
      '      <td><span class="badge badge--dark">' + ex.level.toUpperCase() + '</span></td>',
      '      <td><strong>' + ex.title + '</strong></td>',
      '      <td>' + ex.goal + '</td>',
      '      <td><a class="btn" href="chapitre' + ch.n + '.html#' + ex.id + '">Pratiquer ' + ic('arrow-right') + '</a></td>',
      '    </tr>'
    ].join('\n')).join('\n');

    return [
      '  <section class="section">',
      '    <h2>Module ' + ch.n + ' — ' + ch.title + '</h2>',
      '    <table class="table">',
      '      <thead><tr><th>Identifiant</th><th>Niveau</th><th>Intitulé de l\'exercice</th><th>Compétence visée</th><th>Action</th></tr></thead>',
      '      <tbody>',
      rows,
      '      </tbody>',
      '    </table>',
      '  </section>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Répertoire Exhaustif des 18 Exercices Pratiques — ' + course.brand + '</h1>',
    '  <p class="lead">Catalogue complet des 18 ateliers d’études de cas pratiques répartis sur les 6 modules d\'apprentissage : calculateurs CVSS, validateurs RoE, traceurs Kill Chain, scanners DNS/HTTP, interpréteurs TCP Nmap, détecteurs d\'injections SQL/LFI, auditeurs SUID/sudoers, calculateurs de Buffer Overflow et générateurs de synthèse de pentest.</p>',
    '',
    sectionsHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: '../atelier.html', label: 'Accéder au bac à sable' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices pratiques — ' + course.brand,
      description: 'Répertoire des 18 exercices de code du cours Hacking Éthique & Pentest B3 avec objectifs et liens directs vers les ateliers.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
