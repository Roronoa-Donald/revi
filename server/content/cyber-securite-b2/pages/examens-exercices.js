/**
 * Pages « examens » et « exercices » du cours « Cybersécurité » B2.
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées de Cybersécurité B2</h1>',
    '  <p class="lead">Deux sujets d’entraînement intensif conformes aux examens officiels de licence informatique B2, accompagnés de leurs corrigés types et grilles d’évaluation détaillées.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Cryptographie &amp; Sécurité Réseau', [
      '<h4>Partie 1 : Questions de cours &amp; Modèle de sécurité (6 points)</h4>',
      '<ol>',
      '  <li>Définissez les trois piliers de la triade CIA et donnez pour chacun un exemple d’attaque qui le compromet (3 pts).</li>',
      '  <li>Pourquoi le chiffrement par flot de Vernam (One-Time Pad) est-il théoriquement inviolable, et quelle contrainte matérielle rend son déploiement à grande échelle impossible ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Analyse d’un scan Nmap &amp; Architecture de filtrage (8 points)</h4>',
      '<p>Un scan Nmap sur l’adresse IP 192.168.10.50 révèle les résultats suivants :</p>',
      '<pre><code>PORT     STATE SERVICE VERSION\n' +
      '21/tcp   open  ftp     vsftpd 2.3.4\n' +
      '22/tcp   open  ssh     OpenSSH 8.9p1\n' +
      '80/tcp   open  http    Apache httpd 2.4.52\n' +
      '445/tcp  open  smb     Microsoft-DS (Samba 3.x)</code></pre>',
      '<ol>',
      '  <li>Identifiez les deux services représentant le risque d’intrusion le plus critique et justifiez votre réponse (3 pts).</li>',
      '  <li>Rédigez les commandes Linux <code>iptables</code> pour bloquer tout accès externe aux ports 21 et 445 tout en autorisant le trafic Web (80, 443) et SSH (22) (5 pts).</li>',
      '</ol>',
      '<h4>Partie 3 : Signature numérique &amp; Intégrité (6 points)</h4>',
      '<p>Une entreprise reçoit un binaire d’installation avec son empreinte SHA-256 et sa signature RSA. ' +
      'Expliquez en 4 étapes comment l’administrateur vérifie que le fichier provient bien de l’éditeur et n’a pas été altéré en transit (6 pts).</p>'
    ].join('\n')),
    '',
    '  <details class="details">',
    '    <summary class="btn btn--primary">' + ic('award') + ' Consulter le corrigé type du Contrôle Continu</summary>',
    '    <div class="details__content">',
    box('accent', 'Corrigé officiel &amp; Barème détaillé du CC', [
      '<p><strong>Partie 1 : Triade CIA &amp; Vernam</strong></p>',
      '<ul>',
      '  <li><strong>Confidentialité</strong> : Seules les entités autorisées accèdent aux données (compromise par écoute réseau sniffing ou fuite de base).</li>',
      '  <li><strong>Intégrité</strong> : Garantie que la donnée n’a pas été altérée (compromise par injection SQL ou empoisonnement DNS/ARP).</li>',
      '  <li><strong>Disponibilité</strong> : Accessibilité continue du service (compromise par ransomware ou attaque DDoS saturante).</li>',
      '  <li><strong>Vernam</strong> : Inviolable car chaque bit de clé est parfaitement aléatoire et utilisé une seule fois (entropie maximale). ' +
      'Contrainte : la clé doit être aussi longue que le message et partagée au préalable sur un canal parfaitement sécurisé.</li>',
      '</ul>',
      '<p><strong>Partie 2 : Analyse Nmap &amp; iptables</strong></p>',
      '<ul>',
      '  <li><strong>Risques critiques</strong> : Le port 21 (vsftpd 2.3.4 contient une célèbre porte dérobée RCE historique) et le port 445 (Samba exposé sur Internet est la cible privilégiée des ransomwares comme WannaCry via SMB).</li>',
      '  <li><strong>Règles iptables</strong> :<pre><code># Politique par défaut restrictive\n' +
      'iptables -P INPUT DROP\n' +
      'iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\n' +
      'iptables -A INPUT -p tcp --dport 22 -j ACCEPT\n' +
      'iptables -A INPUT -p tcp --dport 80 -j ACCEPT\n' +
      'iptables -A INPUT -p tcp --dport 443 -j ACCEPT</code></pre></li>',
      '</ul>',
      '<p><strong>Partie 3 : Vérification de signature</strong></p>',
      '<ol>',
      '  <li>Calcul de l’empreinte locale $H_1 = \\text{SHA-256}(binaire)$.</li>',
      '  <li>Déchiffrement de la signature fournie $s$ avec la clé publique de l’éditeur : $H_2 = s^e \\pmod n$.</li>',
      '  <li>Comparaison : si $H_1 == H_2$, l’authenticité et l’intégrité sont mathématiquement prouvées.</li>',
      '  <li>Vérification du certificat X.509 de l’éditeur auprès d’une autorité de certification (CA) de confiance.</li>',
      '</ol>'
    ].join('\n')),
    '    </div>',
    '  </details>',
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Final — Audit, OWASP &amp; Réponse à Incident', [
      '<h4>Partie 1 : Vulnérabilités Web OWASP (7 points)</h4>',
      '<p>Une application bancaire propose l’URL suivante pour afficher le solde :<br>' +
      '<code>GET /api/v1/compte?id=8842 HTTP/1.1</code><br>' +
      'Un attaquant connecté avec le compte <code>id=1001</code> remplace le paramètre par <code>id=8842</code> et visualise l’intégralité des transactions d’une autre entreprise.</p>',
      '<ol>',
      '  <li>Nommez précisément cette vulnérabilité au classement OWASP et expliquez son mécanisme racine (3 pts).</li>',
      '  <li>Proposez deux contre-mesures architecturales pour éliminer définitivement cette faille (4 pts).</li>',
      '</ol>',
      '<h4>Partie 2 : Règle de détection NIDS Snort (6 points)</h4>',
      '<p>Rédigez une règle Snort complète pour lever une alerte de priorité 1 (sid: 100050) dès qu’un paquet TCP ' +
      'à destination du serveur Web (10.0.0.10, port 80) contient la séquence de caractères <code>/etc/passwd</code> dans son URL ou son corps (6 pts).</p>',
      '<h4>Partie 3 : Réponse à un incident Ransomware (7 points)</h4>',
      '<p>À 03h15 du matin, les postes d’une entreprise affichent une demande de rançon en Bitcoin et les partages réseau sont renommés en <code>.locked</code>. ' +
      'Décrivez les actions immédiates et chronologiques de l’équipe de réponse à incident selon les 4 phases NIST : Confinement, Éradication, Recouvrement, Post-mortem (7 pts).</p>'
    ].join('\n')),
    '',
    '  <details class="details">',
    '    <summary class="btn btn--primary">' + ic('award') + ' Consulter le corrigé type de l’Examen Final</summary>',
    '    <div class="details__content">',
    box('accent', 'Corrigé officiel &amp; Barème détaillé de l’EF', [
      '<p><strong>Partie 1 : Vulnérabilité IDOR (A01:2021 - Broken Access Control)</strong></p>',
      '<ul>',
      '  <li><strong>Mécanisme</strong> : Absence de vérification des droits d’accès au niveau de l’objet demandé. Le serveur fait confiance aveugle à l’ID fourni par le client sans contrôler que le demandeur authentifié en est le détenteur légitime.</li>',
      '  <li><strong>Contre-mesures</strong> : ' +
      '1. Valider l’appartenance dans la couche métier (requête <code>WHERE id = :id AND user_id = :session_user_id</code>).<br>' +
      '2. Remplacer les identifiants numériques séquentiels par des UUID v4 non prédictibles et des jetons de session cryptographiques opaques.</li>',
      '</ul>',
      '<p><strong>Partie 2 : Règle Snort</strong></p>',
      '<pre><code>alert tcp any any -> 10.0.0.10 80 (msg:"ATTACK: Tentative de lecture /etc/passwd"; content:"/etc/passwd"; nocase; priority:1; sid:100050; rev:1;)</code></pre>',
      '<p><strong>Partie 3 : Plan de réponse à incident NIST</strong></p>',
      '<ol>',
      '  <li><strong>Confinement immédiat</strong> : Isoler physiquement les machines infectées du réseau (déconnexion Ethernet, coupure Wi-Fi), bloquer les connexions sortantes vers les serveurs C2 (Command &amp; Control). NE PAS éteindre les machines immédiatement pour préserver la mémoire vive (RAM) pour l’analyse forensic.</li>',
      '  <li><strong>Éradication</strong> : Identifier le patient zéro et le vecteur d’entrée (phishing, faille VPN, RDP exposé). Supprimer les portes dérobées, réinitialiser tous les identifiants Active Directory / LDAP.</li>',
      '  <li><strong>Recouvrement</strong> : Restaurer les données à partir de sauvegardes saines, immuables et déconnectées (hors-ligne 3-2-1). Valider l’intégrité des systèmes avant remise en production progressive.</li>',
      '  <li><strong>Post-mortem</strong> : Rédiger le rapport d’incident, boucher les failles découvertes, enrichir les règles SIEM/EDR et former les collaborateurs.</li>',
      '</ol>'
    ].join('\n')),
    '    </div>',
    '  </details>',
    '',
    chnav({ href: 'formules.html', label: 'Mémento &amp; Formules' }, { href: 'exercices.html', label: 'Voir le catalogue d’exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs &amp; Épreuves — ' + course.brand,
      description: 'Examens blancs corrigés de Cybersécurité B2 : Contrôle Continu et Examen Final avec corrigés types et barèmes.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices de code ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de code' }
  ]);

  const sections = chapterList.map(ch => [
    '  <h2>Module ' + ch.n + ' — ' + ch.title + '</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 1</span><span class="card__num">cs2-c' + ch.n + '-e1</span></div>',
    '      <h4 class="card__title">Exercice 1</h4>',
    '      <p class="card__desc">Atelier d’application directe des concepts du module ' + ch.n + '.</p>',
    '      <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-1">Résoudre dans le chapitre ' + ic('arrow-right') + '</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 2</span><span class="card__num">cs2-c' + ch.n + '-e2</span></div>',
    '      <h4 class="card__title">Exercice 2</h4>',
    '      <p class="card__desc">Approfondissement méthodologique et audit algorithmique.</p>',
    '      <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-2">Résoudre dans le chapitre ' + ic('arrow-right') + '</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 3</span><span class="card__num">cs2-c' + ch.n + '-e3</span></div>',
    '      <h4 class="card__title">Exercice 3</h4>',
    '      <p class="card__desc">Cas d’école avancé ou défi type examen technique de sécurité.</p>',
    '      <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-3">Résoudre dans le chapitre ' + ic('arrow-right') + '</a>',
    '    </div>',
    '  </div>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Cybersécurité B2</h1>',
    '  <p class="lead">Chaque chapitre propose trois exercices d’analyse et d’automatisation de manière méthodique, avec validation instantanée par tests unitaires cachés.</p>',
    '',
    sections,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens' }, { href: 'chapitre1.html', label: 'Commencer au Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Catalogue complet des 18 exercices de programmation et d’audit en Cybersécurité B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
