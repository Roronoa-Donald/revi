/**
 * Pages transverses du cours de CCNA 1 B1.
 *
 * Elles ne dépendent que du kit de gabarit : accueil, sommaire, atelier,
 * cartes, mémo, examens blancs, exercices. Les chapitres sont composés par
 * `kit.chapter` à partir des données de `chapitres-1-3.js` / `4-6.js`.
 */
'use strict';

const { ic, box, qcm, cards, bands, crumb } = require('../../../scripts/course-kit');

function chnav(back, forward) {
  const links = ['  <div class="chnav">'];
  if (back) links.push('    <a class="btn" href="' + back.href + '">' + ic('arrow-left') + ' ' + back.label + '</a>');
  if (forward) links.push('    <a class="btn btn--primary" href="' + forward.href + '">' + forward.label + ' ' + ic('arrow-right') + '</a>');
  links.push('  </div>');
  return links.join('\n');
}

function disclaimer(course, extra) {
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — ta note réelle dépend aussi de ton travail.\n  ' +
    (extra || '') + 'Sources : ' + course.sources + '.</p>';
}

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const toc = chapterList.map(chapitre =>
    '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
    '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span></span></a>'
  ).join('\n');

  const body = [
    crumb(course, [{ href: '/index.html', label: 'Portail des cours' }, { label: course.brand }]),
    '  <div class="chapmeta">',
    '    <span class="tag">Licence 1 · B1</span>',
    '    <span class="tag tag--time">CCNA 1</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>nommer les composantes du réseau et leurs couches : hub, switch L2/L3, routeur, pare-feu, IDS/IPS ;</li>',
      '      <li>choisir le câble : type de paire torsadée (UTP à SSTP), catégorie selon le débit, fibre optique ;</li>',
      '      <li>ranger les unités de données dans les modèles OSI (7 couches) et TCP/IP (4 et 5 couches) ;</li>',
      '      <li>brocher un lien Ethernet : câble droit ou croisé, champs de la trame 802.3, duplex intégral ;</li>',
      '      <li>dérouler le routage IP : FCS, désencapsulation, table de routage, réencapsulation ;</li>',
      '      <li>prendre la main en CLI : modes, mémoires, sécurisation, SSH, IPv4 de gestion.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Le support « B1-IT : CCNA 1 » (Essowaba AHOULOUMI, d\'après le programme CCNA 200-301) déroule ' +
      'six chapitres : généralités, modèles, Ethernet LAN, WAN et routage, CLI, configuration du commutateur. ' +
      'Ce cours en garde l\'esprit et fait manipuler chaque règle <strong>en Bash</strong> : un script qui ' +
      'reproduit l\'analyse exacte du support — brochages, couches, étapes de routage, escalade des modes — ' +
      'exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les commandes et configurations du support (CLI, SSH, SVI).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo CCNA 1</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'CCNA 1 B1 — réseaux, Ethernet, routage, CLI Cisco | Cours Interactif',
      description: course.description,
      active: null,
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const toc = chapterList.map(chapitre => {
    const lock = chapitre.free
      ? '<br><span class="locknote">Accès libre</span>'
      : '<br><span class="locknote">' + ic('lock') + ' B1 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres, du premier câble jusqu\'au commutateur sécurisé ' +
    'et adressé. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
    'supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo CCNA 1</span><br><span class="toc__d">Composantes, catégories de câbles, couches, trame 802.3, routage, CLI, sécurisation.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le plan de qualification du commutateur.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de CCNA 1 B1 : ' + chapterList.length +
        ' chapitres, exercices Bash exécutables, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de scripts</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Bash derrière. Écris un script, ' +
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une règle de brochage devient un contrôle automatisé.</p>',
    box('objectifs', 'Comment fonctionne l\'atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre script Bash tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>read</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n\'écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l\'éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="shell"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter>#!/bin/bash',
      '# Zone libre : simulez, cassez, recommencez.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : validateur de liaisons Ethernet.',
      '# Le script lit n lignes « liaison brochage » et juge chaque choix.',
      '',
      'read -r n',
      'ok=0',
      'for ((i=0; i<n; i++)); do',
      '  read -r liaison brochage',
      '  case "$liaison" in',
      '    pc-switch|pc-routeur) attendu="droit" ;;',
      '    pc-pc|switch-switch) attendu="croise" ;;',
      '  esac',
      '  if [ "$brochage" = "$attendu" ]; then',
      '    echo "$liaison : conforme" ; ok=$((ok + 1))',
      '  else',
      '    echo "$liaison : a revoir"',
      '  fi',
      'done',
      'echo "conformes : $ok/$n"',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — validateur de liaisons Ethernet</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme du ' +
      'cours (couches OSI, étapes du routage, modes de la CLI, sécurisation), programme-le et teste-le sur des ' +
      'cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé juge chaque liaison selon la règle « droit entre différents, croisé entre ' +
      'copains ». Transforme-le : ajoute les liaisons gigabit, vérifie les catégories de câbles, ou remplace ' +
      'tout le script par le mécanisme que tu veux vérifier.</p>',
      '      <p>Dans une vraie baie de brassage, ce contrôle se fera à l\'étiquetage : la structure du script — ' +
      'lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3',
      'pc-switch droit',
      'switch-switch droit',
      'pc-pc croise</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>pc-switch : conforme',
      'switch-switch : a revoir',
      'pc-pc : conforme',
      'conformes : 2/3</pre></div>',
      '    </div>',
      '    <p class="lab__note">Trois lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai commutateur</h2>',
    '  <p>La simulation a une limite assumée : aucun câble n\'est broché et aucun commutateur Cisco n\'est ' +
    'configuré ici — le réseau reste du texte structuré. Elle a une force : <strong>toute la logique se ' +
    'vérifie sans risque</strong> — on peut rejouer une escalade de modes ou une configuration SSH autant de ' +
    'fois que nécessaire. Quand le script reproduit les bons réflexes — lire, décider, rapporter — le passage ' +
    'à la vraie CLI est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Case incomplet</strong> : la liaison r1-r2 tombe dans le défaut silencieux et sort « a revoir » à tort.</li>',
      '      <li><strong>Compteur dans la boucle</strong> : le bilan s\'affiche à chaque ligne au lieu d\'une seule fois, après.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit le brochage avant la liaison, et tout décale.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l\'atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d\'exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n\'est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d\'exécutions est limité par jour, pour tout le monde. L\'atelier n\'exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Bash corrigés ' +
    'automatiquement dans la page. Une fois l\'atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Généralités et composantes' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler le réseau | ' + course.brand,
      description: 'Atelier de scripts du cours de CCNA 1 B1 : éditeur dans le navigateur, exécution réelle ' +
        'du script Bash, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Clique une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Reviens à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo CCNA 1' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de CCNA 1 B1 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo CCNA 1</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'un déploiement. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Les composantes et les câbles', [
      '<pre><code>roles : hub repete (L1) / switch L2 commute (L2) /\n',
      '        switch L3 route entre VLAN / routeur relie les reseaux\n',
      'securite : pare-feu filtre / IDS alerte / IPS bloque\n',
      '\n',
      'paires torsadees : UTP (rien) / FTP (ecran commun) /\n',
      '  STP (blindage par paire) / SFTP (double) / SSTP (super)\n',
      'categories : cat 3 (16 MHz, 100 Mbit/s) / cat 5e (1 Gbit/s)\n',
      '  cat 6a (500 MHz, 10 Gbit/s) / cat 7 (600 MHz, 10 G, 100 m)\n',
      'fibre : laser -> lumiere -> cellule photoelectrique\n',
      '  attenuation ~0,2 dB/km vers 1550 nm (Beer-Lambert)</code></pre>',
      '<p>Quatre boîtes, quatre degrés d\'intelligence : hub, switch, switch L3, routeur.</p>'
    ].join('\n')),

    bloc('Les modèles TCP/IP et OSI', [
      '<pre><code>TCP/IP 4 : acces reseau / internet / transport / application\n',
      'TCP/IP 5 (actualite) : la PHYSIQUE est separee\n',
      '\n',
      'OSI 7 -> 1 : application (services) / presentation (codage)\n',
      '  session (RPC, NetBIOS) / transport (segments, ports)\n',
      '  reseau (paquets, IP, routeurs) / liaison (trames, switch)\n',
      '  physique (bits, cables, hub)\n',
      '\n',
      'unites : bits (1) / trame (2) / paquet (3) / segment (4)</code></pre>',
      '<p>L\'unité de données trahit la couche : l\'examen la demande dans les deux sens.</p>'
    ].join('\n')),

    bloc('Ethernet : liaisons et trame 802.3', [
      '<pre><code>normes : IEEE 802.3 (Ethernet, 10 Mb/s a 400 Gb/s)\n',
      '  IEEE 802.11 (sans-fil) / SOHO : un appareil fait tout\n',
      '  entreprise : un switch + un AP par etage\n',
      '\n',
      'brochage : NIC emet 1-2, recoit 3-6 ; switch fait l\'inverse\n',
      '  droit = appareils DIFFERENTS (pc-switch)\n',
      '  croise = appareils SIMILAIRES (switch-switch, pc-pc)\n',
      '  1000BASE-T : 4 paires, simultane\n',
      '\n',
      'trame 802.3 : preamble 7 / SFD 1 / MAC dest 6 / MAC src 6 /\n',
      '  type 2 / donnees 46-1500 / FCS 4 (erreurs)\n',
      'duplex integral : emission et reception simultanees</code></pre>',
      '<p>Droit entre différents, croisé entre copains : le brochage suit les rôles.</p>'
    ].join('\n')),

    bloc('WAN et routage IP', [
      '<pre><code>WAN : lignes louees (HDLC, PPP) OU Ethernet WAN (EoMPLS)\n',
      '\n',
      'routage interne, 4 etapes :\n',
      '  1. FCS (erreur -> trame jetee)\n',
      '  2. desencapsulation (l\'en-tete de liaison part)\n',
      '  3. table de routage (meilleure route -> interface + saut)\n',
      '  4. reencapsulation + transmission\n',
      '\n',
      'sous-reseaux : PAS de routeur entre 2 adresses -> meme groupe\n',
      '  au moins UN routeur -> groupes differents\n',
      'en-tete IPv4 : 20 octets, IP source/dest 32 bits INTACTES\n',
      'protocoles de routage : connectees -> annonces -> metrique\n',
      'hote : paquet distant -> routeur par defaut ; ARP -> MAC</code></pre>',
      '<p>L\'en-tête IP voyage intact ; les en-têtes de liaison changent à chaque saut.</p>'
    ].join('\n')),

    bloc('La CLI Cisco', [
      '<pre><code>acces : console (physique) / Telnet (CLAIR, labo) / SSH (chiffre)\n',
      '\n',
      'modes : user EXEC (regarder, reload REFUSEE)\n',
      '  -> enable (privilgie, configure terminal)\n',
      '  -> config globale (s\'applique a l\'Entree !)\n',
      '  -> sous-modes : line con 0, line vty 0 15, interface ...\n',
      '  exit redescend d\'un cran\n',
      '\n',
      'memoires : RAM (running-config) / NVRAM (startup-config)\n',
      '  flash (IOS) / ROM (bootstrap)\n',
      'sauvegarde : copy running-config startup-config\n',
      'repartir de zero : erase startup-config puis reload</code></pre>',
      '<p>User regarde, enable ose, configure change — et on sauvegarde avant de partir.</p>'
    ].join('\n')),

    bloc('Sécuriser et adresser le commutateur', [
      '<pre><code>mots de passe simples : (line) password + login\n',
      'mode enable : enable secret (global)\n',
      'utilisateurs locaux : username nom secret mdp + login local\n',
      '\n',
      'SSH : hostname / ip domain-name / crypto key generate rsa\n',
      '  (>= 768 bits pour SSHv2) / ip ssh version 2 /\n',
      '  transport input ssh (interdit Telnet)\n',
      '\n',
      'IPv4 de gestion : interface vlan 1 (SVI) -> ip address ->\n',
      '  no shutdown -> ip default-gateway -> (fac.) ip name-server\n',
      'ou : ip address dhcp\n',
      '\n',
      'confort : logging synchronous / exec-timeout m s (0 0 = jamais)\n',
      '  / no ip domain-lookup (pas d\'attente DNS)</code></pre>',
      '<p>Sans ip default-gateway, le commutateur ne parle pas hors de son sous-réseau.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre FTP (écran commun) et STP (blindage par paire).</li>',
      '    <li>Poser du cat 3 pour du gigabit : cat 5e minimum, cat 6a pour le 10 G.</li>',
      '    <li>Placer « physique » dans le modèle TCP/IP à 4 couches.</li>',
      '    <li>Confondre segment (4), paquet (3) et trame (2).</li>',
      '    <li>Relier deux commutateurs par un câble droit : c\'est croisé.</li>',
      '    <li>Chercher la route avant de vérifier le FCS.</li>',
      '    <li>Croire que l\'en-tête IP change à chaque saut : il reste intact.</li>',
      '    <li>Utiliser Telnet en production : tout passe en clair.</li>',
      '    <li>Modifier la configuration sans copy running-config startup-config.</li>',
      '    <li>Activer SSH sans crypto key generate rsa : pas de clés, pas de SSH.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo CCNA 1 — ' + course.brand,
      description: 'Mémo du cours de CCNA 1 B1 : composantes et câbles, modèles, Ethernet, routage IP, ' +
        'CLI Cisco et configuration du commutateur sur une page.',
      active: 'formules',
      body
    }
  };
}

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1',
      intro: 'Sujet type épreuve — composantes, câbles, modèles, Ethernet.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Composantes et sécurité',
          text: 'Décrire le rôle du switch L2, du switch L3, du routeur et du hub. Quelle différence entre IDS et IPS ? Entre pare-feu et IDS ?',
          sol: '<strong>Hub</strong> (couche 1) : répète les bits sans cibler. <strong>Switch L2</strong> : commute les trames dans un LAN. <strong>Switch L3</strong> : commutation PLUS routage entre VLAN. <strong>Routeur</strong> : relie des réseaux distincts. <strong>IDS</strong> détecte et alerte (en coupure ou sur hôte, temps réel ou a posteriori) ; <strong>IPS</strong> bloque les menaces. Le <strong>pare-feu</strong> filtre selon des règles ; l\'IDS complète en détectant ce qu\'il ne peut pas attraper.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Câblage',
          text: 'Classer : un câble avec feuille d\'aluminium autour de toutes les paires ; un câble à blindage par paire ; un câble sans blindage. Quel câble pour 1 Gbit/s ? Pour 10 Gbit/s ? Où l\'atténuation de la fibre est-elle minimale ?',
          sol: '<strong>FTP</strong> (écran commun), <strong>STP</strong> (blindage par paire, Token-Ring), <strong>UTP</strong> (téléphonie, domestique). 1 Gbit/s : <strong>cat 5e</strong> (125 MHz). 10 Gbit/s : <strong>cat 6a</strong> (500 MHz) ou cat 7. Fibre : minimum d\'atténuation vers <strong>1550 nm</strong> (~0,2 dB/km), réamplification périodique au-delà.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Modèles',
          text: 'Ranger : ASCII ; RPC ; ports TCP ; trame ; bits. Combien de couches a le modèle TCP/IP d\'actualité ? Que devient le segment en couche 3 ?',
          sol: '<strong>ASCII : couche 6</strong> (présentation) ; <strong>RPC : couche 5</strong> (session) ; <strong>ports : couche 4</strong> (transport) ; <strong>trame : couche 2</strong> ; <strong>bits : couche 1</strong>. Le modèle d\'actualité est <strong>TCP/IP à 5 couches</strong> (physique séparée). En couche 3, le segment devient un <strong>paquet</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Ethernet',
          text: 'Choisir le brochage : PC vers commutateur ; deux commutateurs ; deux PC. Donner les tailles des champs de la trame 802.3. Que fait le pad ?',
          sol: '<strong>PC-switch : câble droit</strong> (appareils différents) ; <strong>switch-switch et PC-PC : câble croisé</strong> (appareils similaires). Trame : préambule 7, SFD 1, MAC destination 6, MAC source 6, type 2, données 46-1500, FCS 4. Le <strong>pad</strong> comble les données quand la charge est inférieure à 46 octets.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté WAN, routage, CLI et configuration.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — WAN et routage',
          text: 'Nommer le protocole de liaison des lignes louées et celui du WAN Ethernet. Dérouler les quatre étapes du routage interne. Que se passe-t-il si le FCS détecte une erreur ?',
          sol: 'Lignes louées : <strong>HDLC</strong> (ou PPP) ; WAN Ethernet : <strong>EoMPLS</strong> (plus d\'actualité). Étapes : <strong>1</strong> vérifier le FCS, <strong>2</strong> désencapsuler (l\'ancien en-tête de liaison part), <strong>3</strong> chercher la meilleure route (table de routage), <strong>4</strong> réencapsuler et transmettre. FCS en erreur : la trame est <strong>jetée</strong> — le routage ne commence pas.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Sous-réseaux',
          text: 'Deux adresses sans routeur entre elles ? Deux adresses séparées par un routeur ? Que contient l\'entrée de la table de routage ? Que fait ARP ?',
          sol: 'Sans routeur : <strong>même groupe</strong> (sous-réseau). Séparées par au moins un routeur : <strong>groupes différents</strong>. L\'entrée de table liste le sous-réseau, l\'<strong>interface sortante</strong> et éventuellement l\'adresse du <strong>saut suivant</strong>. <strong>ARP</strong> apprend dynamiquement la MAC d\'un hôte IP du LAN avant l\'envoi.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — CLI Cisco',
          text: 'Classer console, Telnet et SSH selon le support. Pourquoi reload est-elle refusée en mode user ? Placer running-config, startup-config, IOS et bootstrap dans les quatre mémoires. Quelle commande sauvegarde la configuration ?',
          sol: '<strong>Console : physique</strong> (câble dédié) ; <strong>Telnet : clair</strong> (dangereux en production) ; <strong>SSH : chiffré</strong>. <em>reload</em> est une commande puissante : réservée au <strong>mode enable</strong>. <strong>running-config : RAM</strong> ; <strong>startup-config : NVRAM</strong> ; <strong>IOS : flash</strong> ; <strong>bootstrap : ROM</strong>. Sauvegarde : <strong>copy running-config startup-config</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Configuration du commutateur',
          text: 'Dérouler la sécurisation complète (mots de passe, utilisateurs locaux, SSH), puis la configuration IPv4 de gestion. À quoi servent logging synchronous et exec-timeout 0 0 ?',
          sol: '<strong>Sécurisation</strong> : enable secret (global) ; password + login en line con 0 et line vty 0 15 ; ou username nom secret mdp + login local ; SSH : hostname, ip domain-name, crypto key generate rsa (≥ 768 bits), ip ssh version 2, transport input ssh. <strong>IPv4</strong> : interface vlan 1, ip address, no shutdown, ip default-gateway, (facultatif) ip name-server. <strong>logging synchronous</strong> : les syslog attendent la fin de la sortie ; <strong>exec-timeout 0 0</strong> : jamais déconnecté — pour le laboratoire.'
        }
      ]
    }
  ];

  const itemHtml = (item) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="item__num">' + item.num + '</span><span class="badge">' + item.badge + '</span></div>',
    '    <p>' + item.text + '</p>',
    '    <details><summary>Corrigé</summary><div class="sol">' + item.sol + '</div></details>',
    '  </div>'
  ].join('\n');

  const mastery = [
    { stem: 'Le commutateur de couche 3 sait…', opts: ['répéter les bits', 'router entre VLAN', 'filtrer les ports'], correct: 1, exp: 'Commutation L2 PLUS routage entre VLAN.' },
    { stem: 'L\'IPS se distingue de l\'IDS car il…', opts: ['alerte', 'bloque', 'filtre'], correct: 1, exp: 'Prévention : il répond aux menaces détectées.' },
    { stem: 'Le 10 Gigabit exige au minimum…', opts: ['cat 5e', 'cat 6a', 'cat 3'], correct: 1, exp: 'Cat 6a : 500 MHz, 10 Gbit/s.' },
    { stem: 'Le modèle TCP/IP d\'actualité compte…', opts: ['4 couches', '5 couches', '7 couches'], correct: 1, exp: 'La couche physique est séparée de l\'accès réseau.' },
    { stem: 'Le segment devient un paquet en couche…', opts: ['2', '3', '4'], correct: 1, exp: 'Réseau : adressage logique et routage.' },
    { stem: 'Entre deux PC, le brochage est…', opts: ['droit', 'croisé', 'indifférent'], correct: 1, exp: 'Appareils similaires : paires croisées.' },
    { stem: 'Le champ données de la trame 802.3 fait…', opts: ['1-46 octets', '46-1500 octets', '64-1518 octets'], correct: 1, exp: 'Pad si la charge est sous 46 octets.' },
    { stem: 'Première étape du routage interne :', opts: ['table de routage', 'FCS', 'réencapsulation'], correct: 1, exp: 'Trame erronée = trame jetée.' },
    { stem: 'La startup-config est stockée en…', opts: ['RAM', 'NVRAM', 'flash'], correct: 1, exp: 'RAM : running-config ; flash : IOS.' },
    { stem: 'La clé SSH se génère par…', opts: ['ssh enable', 'crypto key generate rsa', 'login local'], correct: 1, exp: 'Avec hostname et ip domain-name configurés avant.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d\'examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l\'esprit de l\'épreuve (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d\'examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu\'à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : catégories de câbles, unités par couche, brochages, ' +
      'ordre du routage, mémoires, checklist SSH.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final — toutes notions</h2>',
    '  ' + qcm(mastery, { mastery: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % — reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % — refais les exercices des chapitres faibles.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible CLI et configuration du commutateur.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après le support « B1-IT : CCNA 1 » (Essowaba AHOULOUMI, Collège de Paris). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de CCNA 1 B1 : sujets chronométrés sur les composantes, le ' +
        'câblage, les modèles, Ethernet, le routage et la configuration Cisco.',
      active: 'examen',
      body
    }
  };
}

/* ======================== Exercices & projet ======================== */

function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\n'),
    '    </ol>',
    '    <details><summary>Corrections</summary><div class="sol"><pre><code>' + solutions + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque chapitre, puis un projet final qui ' +
    'qualifie un commutateur de bout en bout. Les scripts sont en Bash, comme à l\'atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n lignes « equipement couche » (1/2/3) et valide hub, switch, routeur, puis le compteur couche 2.',
      'Lit n lignes « unite couche » (bits/trame/paquet/segment) et valide le classement, puis le compteur trame.',
      'Lit n lignes « liaison brochage » (droit/croise) et valide selon la règle, puis le compteur croise.',
      'Lit n lignes « memoire contenu » (ram/nvram/flash/rom) et valide le placement, puis le compteur d\'erreurs.'
    ], [
      'read -r n',
      'l2=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r equipement couche',
      '  case "$equipement" in',
      '    hub) attendu=1 ;;',
      '    switch) attendu=2 ;;',
      '    routeur) attendu=3 ;;',
      '  esac',
      '  if [ "$couche" = "$attendu" ]; then',
      '    echo "$equipement : OK"',
      '    [ "$equipement" = "switch" ] &amp;&amp; l2=$((l2 + 1))',
      '  else',
      '    echo "$equipement : KO (couche $attendu)"',
      '  fi',
      'done',
      'echo "switch en couche 2 : $l2"',
      '',
      'read -r n',
      't=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r unite couche',
      '  case "$unite" in',
      '    bits) attendu=1 ;;',
      '    trame) attendu=2 ;;',
      '    paquet) attendu=3 ;;',
      '    segment) attendu=4 ;;',
      '  esac',
      '  if [ "$couche" = "$attendu" ]; then',
      '    echo "$unite : OK"',
      '    [ "$unite" = "trame" ] &amp;&amp; t=$((t + 1))',
      '  else',
      '    echo "$unite : KO (couche $attendu)"',
      '  fi',
      'done',
      'echo "trames justes : $t"',
      '',
      'read -r n',
      'c=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r liaison brochage',
      '  case "$liaison" in',
      '    pc-switch|pc-routeur) attendu="droit" ;;',
      '    pc-pc|switch-switch) attendu="croise" ;;',
      '  esac',
      '  if [ "$brochage" = "$attendu" ]; then',
      '    echo "$liaison : OK"',
      '    [ "$brochage" = "croise" ] &amp;&amp; c=$((c + 1))',
      '  else',
      '    echo "$liaison : KO ($attendu attendu)"',
      '  fi',
      'done',
      'echo "croises justes : $c"',
      '',
      'read -r n',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r memoire contenu',
      '  case "$memoire" in',
      '    ram) attendu="running-config" ;;',
      '    nvram) attendu="startup-config" ;;',
      '    flash) attendu="ios" ;;',
      '    rom) attendu="bootstrap" ;;',
      '  esac',
      '  if [ "$contenu" = "$attendu" ]; then',
      '    echo "$memoire : OK"',
      '  else',
      '    echo "$memoire : KO ($attendu attendu)"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "erreurs : $e/$n"'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Lit n lignes « champ octets » et valide les tailles de la trame 802.3, bornes 46-1500 comprises.',
      'Lit n lignes « etape action » (1 à 4 : fcs/desencapsule/table/encapsule) et valide l\'ordre du routage.',
      'Lit n lignes « commande mode » (enable/configure/exit) et valide l\'escalade des modes.',
      'Lit n lignes « protection commande » et valide la correspondance des sécurisations.'
    ], [
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r champ octets',
      '  case "$champ" in',
      '    preamble) attendu=7 ;;',
      '    sfd) attendu=1 ;;',
      '    mac) attendu=6 ;;',
      '    type) attendu=2 ;;',
      '    fcs) attendu=4 ;;',
      '    donnees)',
      '      if [ "$octets" -ge 46 ] &amp;&amp; [ "$octets" -le 1500 ]; then',
      '        echo "$champ : OK" ; ok=$((ok + 1))',
      '      else',
      '        echo "$champ : KO (46-1500)"',
      '      fi',
      '      continue ;;',
      '  esac',
      '  if [ "$octets" = "$attendu" ]; then',
      '    echo "$champ : OK" ; ok=$((ok + 1))',
      '  else',
      '    echo "$champ : KO ($attendu attendu)"',
      '  fi',
      'done',
      'echo "champs justes : $ok/$n"',
      '',
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r etape action',
      '  case "$etape" in',
      '    1) attendu="fcs" ;;',
      '    2) attendu="desencapsule" ;;',
      '    3) attendu="table" ;;',
      '    4) attendu="encapsule" ;;',
      '  esac',
      '  if [ "$action" = "$attendu" ]; then',
      '    echo "etape $etape : OK" ; ok=$((ok + 1))',
      '  else',
      '    echo "etape $etape : NON"',
      '  fi',
      'done',
      'echo "etapes justes : $ok/$n"',
      '',
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r commande mode',
      '  case "$commande" in',
      '    enable) attendu="enable" ;;',
      '    configure) attendu="config" ;;',
      '    exit) echo "$commande : OK" ; ok=$((ok + 1)) ; continue ;;',
      '  esac',
      '  if [ "$mode" = "$attendu" ]; then',
      '    echo "$commande : OK" ; ok=$((ok + 1))',
      '  else',
      '    echo "$commande : REFUSE"',
      '  fi',
      'done',
      'echo "commandes valides : $ok/$n"',
      '',
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r protection commande',
      '  if [ "$protection" = "$commande" ]; then',
      '    echo "$protection : OK" ; ok=$((ok + 1))',
      '  else',
      '    echo "$protection : ERREUR"',
      '  fi',
      'done',
      'echo "protections conformes : $ok/$n"'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Lit n lignes « adresse voisine » (routeur entre les deux ou pas) et tranche même groupe ou groupes différents.',
      'Lit n lignes « site debit » et conseille la catégorie de câble, puis le budget cat6a.',
      'Lit n lignes « session reglages » (suite s/t/d) et juge le confort de console, premier motif manquant.',
      'Lit « seuil n » puis n lignes « switch score » et rend le verdict de qualification (moyenne entière).'
    ], [
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r adresse voisin',
      '  if [ "$voisin" = "aucun" ]; then verdict="memegroupe" ; else verdict="groupesdifferents" ; fi',
      '  read -r annonce',
      '  if [ "$annonce" = "$verdict" ]; then',
      '    echo "$adresse : conforme" ; ok=$((ok + 1))',
      '  else',
      '    echo "$adresse : a revoir ($verdict)"',
      '  fi',
      'done',
      'echo "regles appliquees : $ok/$n"',
      '',
      'read -r n',
      'budget=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r site debit',
      '  case "$debit" in',
      '    1g) echo "$site : cat5e" ;;',
      '    10g) echo "$site : cat6a" ; budget=$((budget + 1)) ;;',
      '    100m) echo "$site : cat3" ;;',
      '  esac',
      'done',
      'echo "budget cat6a : $budget"',
      '',
      'read -r n',
      'fluides=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r session reglages',
      '  s=0 ; t=0 ; d=0',
      '  for ((j=0; j&lt;${#reglages}; j++)); do',
      '    c=${reglages:$j:1}',
      '    case "$c" in',
      '      s) s=1 ;;',
      '      t) t=1 ;;',
      '      d) d=1 ;;',
      '    esac',
      '  done',
      '  if [ "$s" = "1" ] &amp;&amp; [ "$t" = "1" ] &amp;&amp; [ "$d" = "1" ]; then',
      '    echo "$session : fluide" ; fluides=$((fluides + 1))',
      '  elif [ "$s" = "0" ]; then echo "$session : gene (motif syslog)"',
      '  elif [ "$t" = "0" ]; then echo "$session : gene (motif timeout)"',
      '  else echo "$session : gene (motif dns)"',
      '  fi',
      'done',
      'echo "sessions fluides : $fluides/$n"',
      '',
      'read -r seuil',
      'read -r n',
      'somme=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r switch score',
      '  echo "$switch : score $score"',
      '  somme=$((somme + score))',
      'done',
      'if [ "$n" -gt 0 ]; then moyenne=$((somme / n)) ; else moyenne=0 ; fi',
      'if [ "$moyenne" -ge "$seuil" ]; then echo "verdict : qualifie" ; else echo "verdict : formation requise" ; fi'
    ].join('\n')),

    '  <h2>Projet intégrateur — « la qualification du commutateur »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit le journal de qualification d\'un parc de commutateurs : d\'abord ' +
      '<code>n_switch</code> commutateurs au format <code>switch protections</code> où protections est une ' +
      'suite de lettres sans espace — <code>e</code> = enable secret présent, <code>l</code> = login local, ' +
      '<code>s</code> = SSH (crypto key), <code>i</code> = IPv4 de gestion (SVI + default-gateway), le tiret ' +
      '<code>-</code> = commutateur vierge. Puis <code>n_cables</code> câbles au format <code>liaison ' +
      'brochage</code> (droit/croise). Il affiche pour chaque commutateur <code>switch : securise</code> si ' +
      'les quatre protections sont présentes, sinon <code>switch : echec (manque X)</code> avec la première ' +
      'lettre manquante dans l\'ordre e, l, s, i ; pour chaque câble <code>liaison : conforme</code> ou ' +
      '<code>liaison : a revoir</code> ; enfin le verdict : <code>parc qualifie</code> si tous les ' +
      'commutateurs sont sécurisés et tous les câbles conformes, <code>intervention requise</code> sinon.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les deux blocs sans mélanger commutateurs et câbles.</li>',
      '      <li><strong>Analyser</strong> chaque suite de protections lettre à lettre.</li>',
      '      <li><strong>Valider</strong> chaque câble selon la règle droit/croisé.</li>',
      '      <li><strong>Compter</strong> les échecs avec le premier manque dans l\'ordre.</li>',
      '      <li><strong>Verdict</strong> final au format exact du cahier des charges.</li>',
      '    </ol>',
      '    <p>Contraintes : parsing lettre à lettre, première lettre manquante, bilan après lecture complète.</p>'
    ].join('\n')),
    box('method', 'Grille d\'auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture des deux blocs et parsing correct <strong>20</strong>' },
        { cls: '', text: 'Analyse des protections (premier manque) <strong>20</strong>' },
        { cls: '', text: 'Validation des câbles <strong>20</strong>' },
        { cls: '', text: 'Verdict global conforme <strong>20</strong>' },
        { cls: '', text: 'Rapport lisible et formats exacts <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n_switch',
    'tous_ok=1',
    'for ((k=0; k&lt;n_switch; k++)); do',
    '  read -r switch protections',
    '  e=0 ; l=0 ; s=0 ; i=0',
    '  if [ "$protections" != "-" ]; then',
    '    for ((j=0; j&lt;${#protections}; j++)); do',
    '      c=${protections:$j:1}',
    '      case "$c" in',
    '        e) e=1 ;;',
    '        l) l=1 ;;',
    '        s) s=1 ;;',
    '        i) i=1 ;;',
    '      esac',
    '    done',
    '  fi',
    '  if [ "$e" = "1" ] &amp;&amp; [ "$l" = "1" ] &amp;&amp; [ "$s" = "1" ] &amp;&amp; [ "$i" = "1" ]; then',
    '    echo "$switch : securise"',
    '  elif [ "$e" = "0" ]; then',
    '    echo "$switch : echec (manque e)" ; tous_ok=0',
    '  elif [ "$l" = "0" ]; then',
    '    echo "$switch : echec (manque l)" ; tous_ok=0',
    '  elif [ "$s" = "0" ]; then',
    '    echo "$switch : echec (manque s)" ; tous_ok=0',
    '  else',
    '    echo "$switch : echec (manque i)" ; tous_ok=0',
    '  fi',
    'done',
    'read -r n_cables',
    'cables_ok=1',
    'for ((k=0; k&lt;n_cables; k++)); do',
    '  read -r liaison brochage',
    '  case "$liaison" in',
    '    pc-switch|pc-routeur) attendu="droit" ;;',
    '    pc-pc|switch-switch|routeur-routeur) attendu="croise" ;;',
    '  esac',
    '  if [ "$brochage" = "$attendu" ]; then',
    '    echo "$liaison : conforme"',
    '  else',
    '    echo "$liaison : a revoir" ; cables_ok=0',
    '  fi',
    'done',
    'if [ "$tous_ok" = "1" ] &amp;&amp; [ "$cables_ok" = "1" ]; then',
    '  echo "verdict : parc qualifie"',
    'else',
    '  echo "verdict : intervention requise"',
    'fi'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine parsing lettre à lettre, validation de câbles, comptage du premier ' +
    'manque et verdict global — les chapitres 1, 5 et 6 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d\'après le support « B1-IT : CCNA 1 » (Essowaba AHOULOUMI, Collège de Paris, d\'après le programme CCNA 200-301). ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de CCNA 1 B1 : scripts Bash ' +
        'gradués et qualification du commutateur.',
      active: 'exercices',
      body
    }
  };
}

/* ======================== Assemblage ======================== */

function render(kit, course, chapterList) {
  const pages = {};
  const chaptersWithNav = chapterList.map((chapitre, index) => {
    const next = chapterList[index + 1];
    return Object.assign({}, chapitre, {
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Chapitre ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier de scripts' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours de CCNA 1 B1 : ' + chapitre.toc +
        ' Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés.',
      active: 'ch' + chapitre.n,
      dataChapter: chapitre.n,
      body
    };
  }

  Object.assign(pages, index(course, chapterList));
  Object.assign(pages, sommaire(course, chapterList));
  Object.assign(pages, atelier(course));
  Object.assign(pages, cartes(course, chapterList));
  Object.assign(pages, formules(course));
  Object.assign(pages, examens(course));
  Object.assign(pages, exercices(course));

  return pages;
}

module.exports = { render };
