/**
 * Pages transverses du cours d'Architecture des réseaux B1.
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
    '    <span class="tag tag--time">Architecture des réseaux</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>classer un réseau : LAN contre WAN, workgroup contre client-serveur, PAN à WAN ;</li>',
      '      <li>prévoir la panne : bus fragile, anneau à jeton et double anneau, étoile qui isole ;</li>',
      '      <li>dépanner par couches : les sept couches OSI, câble en 1, commutateur en 2, routeur en 3 ;</li>',
      '      <li>ouvrir une connexion TCP : SYN, SYN-ACK, ACK — et choisir TCP ou UDP selon l\'exigence ;</li>',
      '      <li>lire une adresse : MAC 48 bits non routée, IP réseau + hôte, masque, classes A, B, C ;</li>',
      '      <li>dimensionner un plan d\'adressage : emprunt de bits, nouveau masque, VLSM et CIDR.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Les trois sessions du support « Architecture des réseaux » (Collège de Paris) déroulent les ' +
      'fondamentaux, les topologies et supports, les modèles OSI et TCP/IP, puis l\'adressage et le ' +
      'sous-réseautage. Ce cours en garde l\'esprit et fait manipuler chaque règle <strong>en Bash</strong> : ' +
      'un script qui reproduit l\'analyse exacte du support — classement, panne, handshake, masque — exécuté ' +
      'dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les cas des supports (classes d\'adresses, emprunt de bits, VLSM).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo réseaux</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Architecture des réseaux B1 — OSI, TCP/IP, adressage, sous-réseaux | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du premier câble jusqu\'au plan d\'adressage complet. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur ' +
    '(et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo réseaux</span><br><span class="toc__d">Topologies, sept couches OSI, handshake TCP, classes d\'adresses, sous-réseaux.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le plan d\'adressage du campus.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours d\'Architecture des réseaux B1 : ' + chapterList.length +
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
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une règle d\'adressage devient un calcul automatisé.</p>',
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
      '# Exemple proposé : vérificateur d’adresses IP.',
      '# Le script lit n lignes « adresse classe » et juge chaque adresse.',
      '',
      'read -r n',
      'pour k in $(seq 1 $n); do',
      '  read -r adresse classe',
      '  premier=${adresse%%.*}',
      '  case "$classe" in',
      '    a) echo "$adresse : reseau /8 (classe A)" ;;',
      '    b) echo "$adresse : reseau /16 (classe B)" ;;',
      '    c) echo "$adresse : reseau /24 (classe C)" ;;',
      '  esac',
      'done',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — vérificateur d\'adresses IP</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme du ' +
      'cours (classement de classe, masque, handshake, emprunt de bits), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé lit des couples « adresse classe » et rappelle le masque par défaut de la ' +
      'classe annoncée. Transforme-le : déduis la classe toi-même à partir du premier octet, calcule le nombre ' +
      'd\'hôtes valides, ou remplace tout le script par le mécanisme que tu veux vérifier.</p>',
      '      <p>Dans un vrai réseau, ce contrôle se fera avec un calculateur d\'adressage : la structure du ' +
      'script — lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3',
      '10.0.0.1 a',
      '172.16.0.1 b',
      '192.168.1.10 c</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>10.0.0.1 : reseau /8 (classe A)',
      '172.16.0.1 : reseau /16 (classe B)',
      '192.168.1.10 : reseau /24 (classe C)</pre></div>',
      '    </div>',
      '    <p class="lab__note">Quatre lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai réseau</h2>',
    '  <p>La simulation a une limite assumée : aucun paquet n\'est émis et aucune interface n\'est configurée — ' +
    'le réseau reste du texte structuré. Elle a une force : <strong>toute la logique se vérifie sans risque</strong> ' +
    '— on peut rejouer un calcul de masque autant de fois que nécessaire. Quand le script reproduit les bons ' +
    'réflexes — lire, décider, rapporter — le passage à la configuration réelle est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>bash refuse les décimales</strong> : l\'arithmétique entière only — un calcul de masque passe, un 224,5 pas.</li>',
      '      <li><strong>Découpage d\'octet oublié</strong> : ${adresse%%.*} prend le premier octet ; sans découpage, la classe se devine mal.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit la classe avant l\'adresse, et tout décale.</li>',
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
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Fondamentaux et architectures' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler les réseaux | ' + course.brand,
      description: 'Atelier de scripts du cours d\'Architecture des réseaux B1 : éditeur dans le navigateur, ' +
        'exécution réelle du script Bash, entrée standard, console de sortie et tuteur qui explique les erreurs.',
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo réseaux' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours d\'Architecture des réseaux B1 : notions clés des ' +
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
    '  <h1>Mémo réseaux</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'un dépannage. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Classer un réseau', [
      '<pre><code>portee : PAN (une personne) / LAN (immeuble, campus) /\n',
      '         WLAN (LAN sans fil, 802.11) / MAN (ville) / WAN (pays)\n',
      'gestion: workgroup = chaque poste client ET serveur (max 10 postes)\n',
      '         client-serveur = comptes centralises, cout du serveur\n',
      '\n',
      'specialises : CAN (campus) / SAN (stockage en mode bloc)</code></pre>',
      '<p>Si le réseau tient dans des murs, c\'est un LAN ; s\'il emprunte des liaisons louées, c\'est un WAN.</p>'
    ].join('\n')),

    bloc('Topologies et supports', [
      '<pre><code>bus    : un seul cable, 10Base2, UNE coupure = tout tombe\n',
      'anneau : jeton (Token Ring, 16 Mbit/s), 2 chemins,\n',
      '         double anneau = bascule sur le secondaire\n',
      'etoile : noeud central, coupure = 1 poste isole, beaucoup de cables\n',
      '\n',
      'supports : UTP 100 m (cat 5 : 100 Mbit/s, cat 5e : 1 Gbit/s)\n',
      '           STP blinde (interferences) / fibre (longue distance)\n',
      '           Wi-Fi 802.11 / Bluetooth RFCOMM / CPL domestique</code></pre>',
      '<p>Retenez le comportement en panne : c\'est lui que l\'examen teste.</p>'
    ].join('\n')),

    bloc('Le modèle OSI', [
      '<pre><code>1 physique       : cables, broches, tensions, radio\n',
      '2 liaison        : trame, MAC/LLC, commutateurs\n',
      '3 reseau         : IP, routage, routeurs\n',
      '4 transport      : TCP/UDP, ports\n',
      '5 session        : ouverture, coordination, terminaison du dialogue\n',
      '6 presentation   : format, chiffrement, compression\n',
      '7 application    : navigateur, messagerie, FTP\n',
      '\n',
      'depannage : remonter depuis la couche 1 (cables, alimentation)</code></pre>',
      '<p>Commutateur = couche 2, routeur = couche 3 : l\'inverse est le piège classique.</p>'
    ].join('\n')),

    bloc('TCP/IP et le handshake', [
      '<pre><code>4 couches : acces reseau (OSI 1+2) / internet (OSI 3) /\n',
      '            transport (OSI 4) / application (OSI 5+6+7)\n',
      '\n',
      '802.3 Ethernet filaire : CSMA/CD     802.11 Wi-Fi : CSMA/CA\n',
      '\n',
      'three-way handshake :\n',
      '  1. SYN     client -> serveur, sequence aleatoire A\n',
      '  2. SYN-ACK serveur -> client, ACK = A+1, sequence B\n',
      '  3. ACK     client -> serveur, B+1   (full-duplex etabli)\n',
      '\n',
      'TCP fiable : courriels, web, fichiers   UDP rapide : voix, DNS</code></pre>',
      '<p>Sans les trois étapes, pas de connexion TCP : SYN, SYN-ACK, ACK dans l\'ordre.</p>'
    ].join('\n')),

    bloc('Adressage : MAC, IP, classes', [
      '<pre><code>MAC   : 48 bits = 12 hexa ; 6 OUI fabricant + 6 serie ;\n',
      '        couche 2, JAMAIS routee au-dela du LAN\n',
      'IPv4  : 32 bits, 4 octets ; partie reseau + partie hote\n',
      'IPv6  : 128 bits, 8 groupes hexa\n',
      'ARP   : traduit IP en MAC sur le meme reseau\n',
      '\n',
      'masque : bits a 1 = reseau, bits a 0 = hote\n',
      'classes : A 1-126 /8    B 128-191 /16    C 192-223 /24\n',
      '          D 224-239 multicast   E 240-254 experimental\n',
      '          127 = boucle locale</code></pre>',
      '<p>L\'IP dirige le paquet de réseau en réseau, la MAC de dispositif en dispositif.</p>'
    ].join('\n')),

    bloc('Sous-réseautage : VLSM et CIDR', [
      '<pre><code>emprunt de bits (sur /24) :\n',
      '  sous-reseaux = 2^emprunt        hotes valides = 2^restants - 2\n',
      '  dernier octet du masque : 1 bit=128  2=192  3=224  4=240\n',
      '  prefixe : /24 + emprunt   (3 bits empruntes -> /27)\n',
      '\n',
      'VLSM : masques differents dans un meme reseau\n',
      '       /30 = 2 hotes = liaison point-a-point\n',
      'CIDR : notation /n, fin des classes A-B-C, standard actuel</code></pre>',
      '<p>Les hôtes valides retirent deux adresses : réseau et diffusion — 2^k - 2, jamais 2^k.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Appeler WAN un Wi-Fi de campus : le WLAN reste un réseau local.</li>',
      '    <li>Promettre la continuité de service en bus : une coupure arrête tout.</li>',
      '    <li>Placer le routeur en couche 2 ou le commutateur en couche 3.</li>',
      '    <li>Chercher le chiffrement en couche 7 : il se fait en couche 6.</li>',
      '    <li>Router une adresse MAC : elle s\'arrête au premier routeur.</li>',
      '    <li>Ranger 127 en classe B : c\'est la boucle locale.</li>',
      '    <li>Démarrer un handshake par SYN-ACK : l\'ordre est SYN, SYN-ACK, ACK.</li>',
      '    <li>Choisir TCP pour la voix : le retard de réémission dégrade l\'appel.</li>',
      '    <li>Oublier de retirer 2 aux hôtes : réseau et diffusion ne sont pas attribuables.</li>',
      '    <li>Appliquer le même masque partout quand le VLSM est demandé.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo réseaux — ' + course.brand,
      description: 'Mémo du cours d\'Architecture des réseaux B1 : topologies, modèle OSI, TCP/IP et handshake, ' +
        'adressage MAC/IP et sous-réseautage VLSM/CIDR sur une page.',
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
      intro: 'Sujet type épreuve — fondamentaux, topologies, modèle OSI.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Classer les réseaux',
          text: 'Classer : le réseau d\'une salle de TP ; l\'interconnexion des agences d\'une banque entre deux pays ; le Wi-Fi du campus ; l\'iPhone synchronisé au Mac d\'un étudiant. Puis : une PME de 40 postes doit-elle rester en workgroup ? Justifier.',
          sol: '<strong>Salle de TP : LAN</strong> (immeuble). <strong>Agences entre pays : WAN</strong> (plus de 100 km, liaisons d\'opérateur). <strong>Wi-Fi du campus : WLAN</strong> — réseau local sans fil, pas un WAN. <strong>iPhone + Mac : PAN</strong>. La PME de 40 postes : <strong>non</strong> — en workgroup, chaque poste doit connaître tous les comptes ; dès une dizaine de postes la gestion devient périlleuse : passer en client-serveur (coût du serveur, mais comptes centralisés).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Topologies et supports',
          text: 'Une coupure de câble survient : donner le comportement du réseau en bus, en double anneau, en étoile. Puis conseiller le support : entrepôt très perturbé électromagnétiquement ; liaison entre deux bâtiments distants de 3 km ; poste de comptable standard.',
          sol: '<strong>Bus</strong> : tout le réseau est affecté — topologie fragile. <strong>Double anneau</strong> : les données basculent sur l\'anneau secondaire le temps de la réparation. <strong>Étoile</strong> : un seul poste s\'isole, le reste continue. Supports : <strong>STP blindé</strong> pour l\'entrepôt perturbé ; <strong>fibre optique</strong> pour les 3 km (hors norme UTP 100 m) ; <strong>UTP catégorie 5e</strong> pour le poste standard (1 Gbit/s, moins de 100 m).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Modèle OSI',
          text: 'Ranger : le chiffrement des données ; la table de routage ; les ports TCP ; le câble RJ45 ; la synchronisation du dialogue. Un utilisateur « n\'a plus de réseau » : donner les trois premières vérifications dans l\'ordre OSI.',
          sol: '<strong>Chiffrement : couche 6</strong> (présentation). <strong>Table de routage : couche 3</strong> (réseau). <strong>Ports TCP : couche 4</strong> (transport). <strong>RJ45 : couche 1</strong> (physique). <strong>Synchronisation du dialogue : couche 5</strong> (session). Dépannage : <strong>1)</strong> câbles branchés et alimentation (couche 1) ; <strong>2)</strong> carte réseau et commutateur (couche 2) ; <strong>3)</strong> adresse IP et routage (couche 3) — puis seulement l\'application (7).'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté TCP/IP, adressage et sous-réseautage.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — TCP/IP et handshake',
          text: 'Dérouler le three-way handshake entre un client (séquence A = 1000) et un serveur (séquence B = 5000). Puis choisir TCP ou UDP pour : un courriel ; un appel VoIP ; une requête DNS ; le téléchargement d\'un ISO.',
          sol: '<strong>1. SYN</strong> : client → serveur, séquence 1000. <strong>2. SYN-ACK</strong> : serveur → client, ACK = 1001, séquence 5000. <strong>3. ACK</strong> : client → serveur, 5001 — communication <strong>full-duplex</strong> établie. Courriel : <strong>TCP</strong> (fiabilité). Appel VoIP : <strong>UDP</strong> (temps réel, pertes tolérables). DNS : <strong>UDP</strong> (requête courte, rapide). ISO : <strong>TCP</strong> (aucun octet ne doit manquer).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — MAC, IP, ARP',
          text: 'La machine 192.168.1.10/24 envoie un fichier à 192.168.1.20 puis à 10.0.0.5. Décrire le chemin MAC/IP dans les deux cas. Rappeler pourquoi la MAC n\'apparaît jamais au-delà du premier routeur.',
          sol: 'Vers <strong>192.168.1.20</strong> (même réseau) : ARP traduit l\'IP en MAC locale, envoi direct de station à station. Vers <strong>10.0.0.5</strong> (réseau distant) : l\'émetteur encapsule le paquet avec la <strong>MAC du routeur</strong> ; le routeur désencapsule, lit l\'IP de destination, consulte sa table de routage et <strong>réencapsule</strong> avec la MAC du saut suivant — l\'IP reste constante de bout en bout, la MAC change à chaque saut : elle n\'est jamais routée.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Classes et masque',
          text: 'Donner la classe et le masque par défaut de : 10.20.30.40 ; 172.20.1.1 ; 192.168.10.5 ; 127.0.0.1 ; 225.1.1.1. Puis : dans 255.255.255.0, que marquent les bits à 0 ?',
          sol: '<strong>10.20.30.40 : classe A</strong> (1-126), 255.0.0.0. <strong>172.20.1.1 : classe B</strong> (128-191), 255.255.0.0. <strong>192.168.10.5 : classe C</strong> (192-223), 255.255.255.0. <strong>127.0.0.1 : boucle locale</strong> — pas une classe. <strong>225.1.1.1 : classe D</strong> (224-239), multicast. Les bits à 0 du masque marquent la <strong>partie hôte</strong> — ici le dernier octet.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Sous-réseautage',
          text: 'À partir d\'un /24, on emprunte 3 bits. Donner : le nombre de sous-réseaux, le nombre d\'hôtes valides par sous-réseau, le nouveau masque décimal et la notation CIDR. Mêmes questions en empruntant 2 bits. Quel bloc choisir pour une liaison point-à-point ?',
          sol: '<strong>3 bits</strong> : 2^3 = <strong>8 sous-réseaux</strong> ; 5 bits restants : 2^5 - 2 = <strong>30 hôtes valides</strong> ; masque 11100000 = <strong>255.255.255.224</strong>, soit <strong>/27</strong>. <strong>2 bits</strong> : 4 sous-réseaux ; 2^6 - 2 = 62 hôtes ; masque <strong>255.255.255.192</strong>, <strong>/26</strong>. Liaison point-à-point : <strong>/30</strong> — exactement 2 hôtes valides (2^2 - 2), le plus petit bloc.'
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
    { stem: 'Un réseau limité à un immeuble est…', opts: ['un WAN', 'un LAN', 'un MAN'], correct: 1, exp: 'LAN : salle, classe, campus, PMI.' },
    { stem: 'Dans une étoile, une coupure isole…', opts: ['tout le réseau', 'le nœud central', 'un seul poste'], correct: 2, exp: 'Liaisons point à point : le reste continue.' },
    { stem: 'La longueur maximale d\'un segment UTP est…', opts: ['10 m', '100 m', '1000 m'], correct: 1, exp: '100 mètres ; catégorie 5e pour le gigabit.' },
    { stem: 'Le commutateur travaille en couche…', opts: ['1', '2', '3'], correct: 1, exp: 'Liaison de données ; le routeur, lui, est en couche 3.' },
    { stem: 'Le chiffrement OSI se fait en couche…', opts: ['5', '6', '7'], correct: 1, exp: 'Présentation : formater, chiffrer, compresser.' },
    { stem: 'Le SYN-ACK du handshake porte…', opts: ['ACK = A+1 et une séquence B', 'seulement A+1', 'seulement B'], correct: 0, exp: 'Acquittement du SYN et nouveau numéro de séquence.' },
    { stem: 'La voix sur IP utilise plutôt…', opts: ['TCP', 'UDP', 'ICMP'], correct: 1, exp: 'UDP : rapidité, pertes tolérables.' },
    { stem: 'Une adresse MAC est routée…', opts: ['sur Internet', 'jamais au-delà d\'un routeur', 'dans toute l\'entreprise'], correct: 1, exp: 'Portée : le segment local uniquement.' },
    { stem: 'L\'adresse 172.16.0.1 est de classe…', opts: ['A', 'B', 'C'], correct: 1, exp: 'Premier octet 172 : classe B (128-191).' },
    { stem: 'Emprunter 3 bits à un /24 crée…', opts: ['3 sous-réseaux', '8 sous-réseaux', '30 sous-réseaux'], correct: 1, exp: '2^3 = 8 ; /27, 30 hôtes valides chacun.' }
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
      '<strong>Réserve 15 min de relecture</strong> : classes d\'adresses, masques, ordre du handshake, ' +
      'comportement en panne, 2^k - 2 hôtes valides.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible les calculs de masque et le handshake.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après les présentations « Architecture des réseaux » (Collège de Paris, A. Nadjak Kan\'sam). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours d\'Architecture des réseaux B1 : sujets chronométrés sur les ' +
        'topologies, le modèle OSI, TCP/IP, l\'adressage et le sous-réseautage.',
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
    '  <p class="lead">De la pratique graduée pour consolider chaque session, puis un projet final qui ' +
    'outille le campus entier. Les scripts sont en Bash, comme à l\'atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n lignes « reseau portee » (lan/wan/man/pan/wlan) et affiche la description de chaque réseau, puis le compteur LAN.',
      'Lit n lignes « equipement couche » (osil 1 a 7) et affiche le nom de chaque couche, puis le compteur couche 3.',
      'Lit n lignes « protocole famille » (tcp/udp) et affiche fiable ou rapide, puis les deux compteurs.',
      'Lit n adresses MAC (12 caracteres hexa) et vérifie la longueur : 12 chiffres sinon « invalide ».'
    ], [
      'read -r n',
      'lan=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r reseau portee',
      '  case "$portee" in',
      '    lan) echo "$reseau : local (immeuble, campus)" ; lan=$((lan + 1)) ;;',
      '    wan) echo "$reseau : etendu (villes, pays)" ;;',
      '    man) echo "$reseau : metropolitan (ville)" ;;',
      '    wlan) echo "$reseau : local sans fil (802.11)" ;;',
      '    pan) echo "$reseau : personnel (une personne)" ;;',
      '  esac',
      'done',
      'echo "lan : $lan/$n"',
      '',
      'read -r n',
      'reseau3=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r equipement couche',
      '  case "$couche" in',
      '    1) echo "$equipement : physique" ;;',
      '    2) echo "$equipement : liaison de donnees" ;;',
      '    3) echo "$equipement : reseau" ; reseau3=$((reseau3 + 1)) ;;',
      '    4) echo "$equipement : transport" ;;',
      '    5) echo "$equipement : session" ;;',
      '    6) echo "$equipement : presentation" ;;',
      '    7) echo "$equipement : application" ;;',
      '  esac',
      'done',
      'echo "couche reseau : $reseau3/$n"',
      '',
      'read -r n',
      'tcp=0 ; udp=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r protocole famille',
      '  if [ "$famille" = "tcp" ]; then',
      '    echo "$protocole : fiable (accuses de reception)" ; tcp=$((tcp + 1))',
      '  else',
      '    echo "$protocole : rapide (sans accuse)" ; udp=$((udp + 1))',
      '  fi',
      'done',
      'echo "tcp : $tcp / udp : $udp"',
      '',
      'read -r n',
      'invalides=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r mac',
      '  if [ ${#mac} -eq 12 ]; then',
      '    echo "$mac : valide (48 bits)"',
      '  else',
      '    echo "$mac : invalide" ; invalides=$((invalides + 1))',
      '  fi',
      'done',
      'echo "invalides : $invalides/$n"'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Lit n lignes « adresse octet » (premier octet + classe annoncee a/b/c/d/e) et valide le classement par le premier octet.',
      'Lit n lignes « ip masque » (a ou b) et dit, pour chaque adresse, si elle est dans le meme reseau que la premiere.',
      'Lit n lignes « objet couche » (osil 1 a 7) et place cable, commutateur, routeur, chiffrement, ports dans leur couche.',
      'Lit n lignes « etape handshake » (syn/synack/ack dans l\'ordre) et vérifie la séquence complete.'
    ], [
      'read -r n',
      'justes=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r adresse classe',
      '  premier=${adresse%%.*}',
      '  if [ "$premier" -ge 1 ] &amp;&amp; [ "$premier" -le 126 ]; then reelle=a',
      '  elif [ "$premier" -ge 128 ] &amp;&amp; [ "$premier" -le 191 ]; then reelle=b',
      '  elif [ "$premier" -ge 192 ] &amp;&amp; [ "$premier" -le 223 ]; then reelle=c',
      '  elif [ "$premier" -ge 224 ] &amp;&amp; [ "$premier" -le 239 ]; then reelle=d',
      '  else reelle=e',
      '  fi',
      '  if [ "$reelle" = "$classe" ]; then',
      '    echo "$adresse : classe $reelle confirmee" ; justes=$((justes + 1))',
      '  else',
      '    echo "$adresse : classe $reelle, pas $classe"',
      '  fi',
      'done',
      'echo "classements justes : $justes/$n"',
      '',
      'read -r n',
      'read -r ipref masque',
      'pref=${ipref%%.*}',
      'for ((k=1; k&lt;n; k++)); do',
      '  read -r ip masque',
      '  p=${ip%%.*}',
      '  if [ "$p" = "$pref" ] &amp;&amp; [ "$masque" = "a" ]; then',
      '    echo "$ip : meme reseau /8"',
      '  else',
      '    echo "$ip : reseau different ou masque errone"',
      '  fi',
      'done',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r objet couche',
      '  case "$objet" in',
      '    cable) attendu=1 ;;',
      '    commutateur) attendu=2 ;;',
      '    routeur) attendu=3 ;;',
      '    ports) attendu=4 ;;',
      '    chiffrement) attendu=6 ;;',
      '  esac',
      '  if [ "$couche" = "$attendu" ]; then',
      '    echo "$objet : couche $attendu ok"',
      '  else',
      '    echo "$objet : couche $attendu, pas $couche"',
      '  fi',
      'done',
      '',
      'read -r n',
      'etape=0',
      'for ((k=1; k&lt;=n; k++)); do',
      '  read -r paquet',
      '  case "$k:$paquet" in',
      '    1:syn) etape=$((etape + 1)) ;;',
      '    2:synack) etape=$((etape + 1)) ;;',
      '    3:ack) etape=$((etape + 1)) ;;',
      '  esac',
      'done',
      'if [ "$etape" -eq 3 ]; then',
      '  echo "handshake complet : full-duplex"',
      'else',
      '  echo "handshake incomplete : $etape/3"',
      'fi'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Lit n lignes « poste panne » (bus/anneau/etoile) et simule l\'effet d\'une coupure : tout tombe, bascule, ou un poste isole.',
      'Lit n lignes « service besoin » (fiable/rapide) et tranche TCP ou UDP, puis signale les incoherences (voix en TCP).',
      'Lit « emprunt » puis calcule : sous-reseaux, hotes valides, dernier octet du masque, prefixe CIDR.',
      'Lit « seuil n » puis n lignes « site hotes » et rend le plus petit bloc /n couvrant chaque site (verdict d\'espace perdu).'
    ], [
      'read -r n',
      'graves=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r poste topo',
      '  case "$topo" in',
      '    bus) echo "$poste : tout le reseau tombe" ; graves=$((graves + 1)) ;;',
      '    anneau) echo "$poste : bascule sur l\'anneau secondaire" ;;',
      '    etoile) echo "$poste : un seul poste isole" ;;',
      '  esac',
      'done',
      'echo "pannes totales : $graves/$n"',
      '',
      'read -r n',
      'incoherences=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r service besoin',
      '  case "$besoin" in',
      '    fiable) echo "$service : TCP" ;;',
      '    rapide) echo "$service : UDP" ;;',
      '  esac',
      'done',
      'echo "regle : contrat manquant = TCP, micro-coupure = UDP"',
      '',
      'read -r emprunt',
      'restants=$((8 - emprunt))',
      'sousreseaux=$((1 &lt;&lt; emprunt))',
      'hotestheorique=$((1 &lt;&lt; restants))',
      'hotes=$((hotestheorique - 2))',
      'declare -A valeurs',
      'valeurs[1]=128 ; valeurs[2]=192 ; valeurs[3]=224 ; valeurs[4]=240',
      'masque=${valeurs[$emprunt]}',
      'prefixe=$((24 + emprunt))',
      'echo "sous-reseaux : $sousreseaux"',
      'echo "hotes valides : $hotes"',
      'echo "masque : 255.255.255.$masque"',
      'echo "prefixe : /$prefixe"',
      '',
      'read -r seuil',
      'read -r n',
      'perdu=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r site hotes',
      '  taille=2',
      '  bits=1',
      '  while [ $((taille - 2)) -lt "$hotes" ]; do',
      '    taille=$((taille * 2))',
      '    bits=$((bits + 1))',
      '  done',
      '  prefixe=$((32 - bits))',
      '  capacite=$((taille - 2))',
      '  gaspillage=$((capacite - hotes))',
      '  echo "$site : /$prefixe ($capacite hotes, $gaspillage perdus)"',
      '  perdu=$((perdu + gaspillage))',
      'done',
      'if [ "$perdu" -le "$seuil" ]; then',
      '  echo "plan : acceptable ($perdu adresses perdues)"',
      'else',
      '  echo "plan : a affiner ($perdu adresses perdues)"',
      'fi'
    ].join('\n')),

    '  <h2>Projet intégrateur — « le plan d\'adressage du campus »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit le recensement du campus : d\'abord <code>n_sites</code> sites au format ' +
      '<code>site hotes</code> (nombre de machines à adresser), puis <code>n_tests</code> tests de connectivité ' +
      'au format <code>ip verdict</code> où verdict vaut <code>ok</code> (répond), <code>lent</code> (répond ' +
      'avec perte) ou <code>hs</code> (hors service). Il produit le rapport : pour chaque site, le plus petit ' +
      'bloc couvrant les hôtes (préfixe /n et capacité 2^k - 2) ; puis le diagnostic réseau : chaque <code>hs</code> ' +
      'incrimine la couche 1, chaque <code>lent</code> la couche 3 ; enfin le verdict global : ' +
      '<code>campus prete</code> si tous les tests sont <code>ok</code> et si aucun site ne dépasse 254 hôtes ' +
      '(sinon <code>replanification requise</code>).</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les deux blocs sans mélanger sites et tests.</li>',
      '      <li><strong>Dimensionner</strong> chaque site : plus petit 2^k - 2 couvrant les hôtes.</li>',
      '      <li><strong>Diagnostiquer</strong> chaque test : hs → couche 1, lent → couche 3.</li>',
      '      <li><strong>Agréger</strong> le gaspillage d\'adresses avec des tableaux associatifs.</li>',
      '      <li><strong>Verdict</strong> final au format exact du cahier des charges.</li>',
      '    </ol>',
      '    <p>Contraintes : arithmétique entière (bash refuse les décimales), boucle de dimensionnement, bilan après lecture complète.</p>'
    ].join('\n')),
    box('method', 'Grille d\'auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture des deux blocs et parsing correct <strong>20</strong>' },
        { cls: '', text: 'Dimensionnement de chaque site (plus petit bloc) <strong>20</strong>' },
        { cls: '', text: 'Diagnostic par couche des tests <strong>20</strong>' },
        { cls: '', text: 'Verdict global conforme <strong>20</strong>' },
        { cls: '', text: 'Rapport lisible et formats exacts <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n_sites',
    'declare -A blocs',
    'declare -A gaspillages',
    'depasse=0',
    'for ((k=0; k&lt;n_sites; k++)); do',
    '  read -r site hotes',
    '  if [ "$hotes" -gt 254 ]; then depasse=1 ; fi',
    '  taille=2',
    '  bits=1',
    '  while [ $((taille - 2)) -lt "$hotes" ]; do',
    '    taille=$((taille * 2))',
    '    bits=$((bits + 1))',
    '  done',
    '  prefixe=$((32 - bits))',
    '  capacite=$((taille - 2))',
    '  gaspillage=$((capacite - hotes))',
    '  blocs[$site]=$prefixe',
    '  gaspillages[$site]=$gaspillage',
    '  echo "$site : /$prefixe ($capacite hotes, $gaspillage perdus)"',
    'done',
    'read -r n_tests',
    'l1=0 ; l3=0 ; tout_ok=1',
    'for ((k=0; k&lt;n_tests; k++)); do',
    '  read -r ip verdict',
    '  case "$verdict" in',
    '    ok) echo "$ip : repond" ;;',
    '    lent) echo "$ip : perte, couche 3" ; l3=$((l3 + 1)) ; tout_ok=0 ;;',
    '    hs) echo "$ip : hors service, couche 1" ; l1=$((l1 + 1)) ; tout_ok=0 ;;',
    '  esac',
    'done',
    'total=0',
    'for site in "${!blocs[@]}"; do',
    '  total=$((total + ${gaspillages[$site]}))',
    'done',
    'echo "gaspillage total : $total adresses"',
    'if [ "$tout_ok" = "1" ] &amp;&amp; [ "$depasse" = "0" ]; then',
    '  echo "verdict : campus prete"',
    'else',
    '  echo "verdict : replanification requise"',
    'fi'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine dimensionnement, diagnostic par couche, agrégation du gaspillage ' +
    'et verdict global — les chapitres 1, 3, 5 et 6 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d\'après les présentations « Architecture des réseaux » (Collège de Paris, A. Nadjak Kan\'sam, sessions 1 à 3). ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours d\'Architecture des réseaux B1 : ' +
        'scripts Bash gradués et plan d\'adressage du campus.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours d\'Architecture des réseaux B1 : ' + chapitre.toc +
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
