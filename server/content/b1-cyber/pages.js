/**
 * Pages transverses du cours de Cybersécurité B1.
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
    '    <span class="tag tag--time">Cybersécurité</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>distinguer cybersécurité et sécurité informatique, et situer ton périmètre ;</li>',
      '      <li>calculer un risque (menace, vulnérabilité, impact) et le classer par niveau ;</li>',
      '      <li>classer une attaque selon la composante CIA qu\'elle viole, puis choisir la défense ;</li>',
      '      <li>raisonner en authentification (facteurs, 2FA) et en chiffrement (symétrique, asymétrique, hachage) ;</li>',
      '      <li>appliquer les modèles de contrôle d\'accès et tenir un cycle de correctifs ;</li>',
      '      <li>trier des alertes, lire un journal et dérouler une réponse d\'incident ;</li>',
      '      <li>citer les obligations RGPD, NIS2, PCI DSS et ISO 27001, et tenir une sauvegarde 3-2-1.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Le support du module déroule la matière en sept thèmes : fondements et vocabulaire, menaces et ' +
      'attaques, authentification et chiffrement, sécurité des systèmes, gestion des incidents, conformité, ' +
      'sensibilisation. Ce cours en garde l\'ordre et fait manipuler chaque mécanisme <strong>en Bash</strong> : ' +
      'un script qui reproduit l\'analyse exacte d\'un analyste, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle dans un vrai terminal.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo cyber</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Cybersécurité B1 — protéger, détecter, répondre | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, de la formule du risque jusqu\'aux référentiels de ' +
    'conformité. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
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
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo cyber</span><br><span class="toc__d">La formule du risque, la triade CIA, l\'authentification, les modèles d\'accès, la réponse aux incidents.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le poste de travail de l\'analyste.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Cybersécurité B1 : ' + chapterList.length +
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
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une règle de sécurité devient un programme.</p>',
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
      '# Exemple proposé : filtre anti-phishing.',
      '# Le script lit n liens, un par ligne, et juge chacun.',
      '',
      'read -r n',
      'for ((i=0; i<n; i++)); do',
      '  read -r lien',
      '  case "$lien" in',
      '    https://*)',
      '      if [[ "$lien" == *@* ]]; then echo "PHISHING : @ dans l\'URL"',
      '      else echo "OK : https et domaine" ; fi ;;',
      '    http://*) echo "SUSPECT : pas de chiffrement" ;;',
      '    *) echo "PHISHING : schéma inconnu" ;;',
      '  esac',
      'done',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — filtre anti-phishing</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme de ' +
      'sécurité (triage d\'alertes, verrouillage de compte, contrôle d\'accès), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé juge des liens : https présent ou non, domaine ou adresse brute, piège @. ' +
      'Ajoute une liste de domaines de confiance, un compteur de liens suspects, ou remplace tout le script ' +
      'par le mécanisme que tu veux vérifier.</p>',
      '      <p>Dans un vrai terminal, ce sera un filtre sur un fichier de liens et <code>grep -E</code> : ' +
      'la structure du script — lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>4',
      'https://portail.univ-exemple.fr',
      'http://portail.univ-exemple.fr',
      'https://portail@univ-exemple.fr',
      'ftp://fichiers.univ-exemple.fr</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>OK : https et domaine',
      'SUSPECT : pas de chiffrement',
      'PHISHING : @ dans l\'URL',
      'PHISHING : schéma inconnu</pre></div>',
      '    </div>',
      '    <p class="lab__note">Cinq lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai terminal</h2>',
    '  <p>La simulation a une limite assumée : aucun pare-feu, aucun compte et aucun journal réel ne sont ' +
    'touchés. Elle a une force : <strong>toute la logique se vérifie sans risque</strong> — on peut rejouer ' +
    'une intrusion simulée autant de fois que nécessaire. Quand le script reproduit les bons réflexes — ' +
    'lire l\'événement, décider, rapporter — le passage aux vrais outils est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Compteur remis à zéro dans la boucle</strong> : chaque alerte repart de zéro et le bilan perd la moitié des événements.</li>',
      '      <li><strong>Cas partiels</strong> : le case ne couvre qu\'un format de lien ou une famille de malware, et le script juge les autres par défaut silencieux.</li>',
      '      <li><strong>Bilan dans la boucle</strong> : le verdict d\'ensemble s\'affiche à chaque ligne au lieu d\'une seule fois, après.</li>',
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
    'que le réflexe de sécurité est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Fondements' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler la sécurité | ' + course.brand,
      description: 'Atelier de scripts du cours de Cybersécurité B1 : éditeur dans le navigateur, exécution ' +
        'réelle du script Bash, entrée standard, console de sortie et tuteur qui explique les erreurs.',
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo cyber' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Cybersécurité B1 : notions clés des ' +
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
    '  <h1>Mémo cyber</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'un poste d\'analyste. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Le risque et la triade CIA', [
      '<pre><code>Risque = Menace x Vulnérabilité x Impact\n',
      '\n',
      'menace        ce qui peut arriver (ransomware, phishing, panne)\n',
      'vulnérabilité la faille par laquelle ça passe (correctif manquant)\n',
      'impact        ce que ça coûte si ça arrive (données, image, légal)\n',
      '\n',
      'C Confidentialité  seul l\'habillé accède (fuite, interception)\n',
      'I Intégrité        rien n\'est modifié à l\'insu (altération, faux ordre)\n',
      'D Disponibilité    le service reste accessible (DDoS, ransomware)\n',
      '\n',
      'une attaque viole toujours au moins une lettre ; la défense aussi\n',
      's\'organise par lettres (chiffrer = C, checksum = I, redondance = D)</code></pre>',
      '<p>Dire « c\'est risqué » ne veut rien dire : chiffrer la formule, ou se taire.</p>'
    ].join('\n')),

    bloc('S\'authentifier et chiffrer', [
      '<pre><code>facteurs       ce que je sais / ce que je possède / ce que je suis\n',
      '2FA            deux facteurs distincts (mot de passe + code) = oui\n',
      '               deux fois le même facteur (mdp + question secrète) = non\n',
      '\n',
      'symétrique     une même clé pour chiffrer et déchiffrer ; rapide ;\n',
      '               problème : transmettre la clé\n',
      'asymétrique   paire publique/privée ; le public chiffre, la privée déchiffre\n',
      'hachage        sens unique, sans clé, empreinte fixe ; = comparaison, pas chiffré\n',
      '\n',
      'mot de passe   long d\'abord ; jamais dans une liste noire ; unique par compte</code></pre>',
      '<p>Chiffrer protège la confidentialité ; hacher prouve l\'intégrité : les deux ne se remplacent pas.</p>'
    ].join('\n')),

    bloc('Contrôler les accès', [
      '<pre><code>DAC   le propriétaire partage (partage Windows classique)\n',
      'MAC   une étiquette décide, l\'utilisateur ne peut rien relâcher (militaire)\n',
      'RBAC  des rôles ; l\'habilité suit la fonction, pas la personne (entreprise)\n',
      'ABAC  des attributs contexte (heure, poste, localisation) dans la décision\n',
      'ACL   liste par ressource : qui a le droit, qui est refusé explicitement\n',
      '\n',
      'principe du moindre privilège : chaque compte reçoit le minimum vital\n',
      'least privilege + révisions périodiques &gt; gros rôles fourre-tout</code></pre>',
      '<p>Un droit donné ne se reprend pas tout seul : réviser les comptes régulièrement.</p>'
    ].join('\n')),

    bloc('Détecter et répondre (ICER)', [
      '<pre><code>SIEM      centralise les logs et fait sauter les alertes (corrélation)\n',
      'log       qui, quoi, quand, d\'où : compter par source avant de conclure\n',
      '\n',
      'I Identification   l\'alerte est qualifiée (vrai incident, périmètre)\n',
      'C Confinement      isoler la machine, couper le compte : stopper la propagation\n',
      'E Éradication      retirer la cause (malware, porte dérobée, correctif)\n',
      'R Rétablissement   restaurer, surveiller de près, reprendre le service\n',
      '\n',
      'post-mortem       cause racine, délai de détection, plan d\'amélioration\n',
      'PCA / PRA         reprendre (RTO) et ne rien perdre au-delà (RPO)</code></pre>',
      '<p>Un compte qui rate trois fois n\'est pas « peut-être une erreur » : c\'est un seuil, et le seuil déclenche.</p>'
    ].join('\n')),

    bloc('Conformité et référentiels', [
      '<pre><code>RGPD      données personnelles : consentement, finalité, durée, droits ;\n',
      '          amende jusqu\'à 20 M€ ou 4 % du CA mondial\n',
      'NIS2      entités essentielles / importantes UE : gouvernance, notification 24 h\n',
      'PCI DSS   données de cartes : segmentation, chiffrement, tests réguliers\n',
      'ISO 27001 SMSI : politique, inventaire des risques, audit interne, amélioration\n',
      '\n',
      '3-2-1     3 copies, 2 supports distincts, 1 hors site ;\n',
      '          une copie, c\'est zéro ; deux supports, c\'est deux fois le même risque\n',
      'correctifs critique 45 jours, sinon 90 ; évaluer (CVSS), fenêtre de déploiement</code></pre>',
      '<p>La conformité n\'empêche pas l\'attaque : elle prouve que la règle existait, a été appliquée et vérifiée.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre sécurité informatique (sous-ensemble technique) et cybersécurité (ensemble).</li>',
      '    <li>Parler de « risque » sans menacer, vulnérabilité ni impact.</li>',
      '    <li>Coller deux facteurs identiques et appeler ça de la 2FA.</li>',
      '    <li>Prendre un hachage pour du chiffrement : le hachage ne se « déchiffre » pas.</li>',
      '    <li>Donner les droits au compte au lieu du rôle (DAC partout, RBAC nulle part).</li>',
      '    <li>Compter les échecs par IP sans <code>declare -A</code> : les cumuls s\'écrasent.</li>',
      '    <li>Purger au lieu de confiner : la preuve disparaît avec le problème.</li>',
      '    <li>Une seule copie de sauvegarde, sur le même disque que la production.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo cyber — ' + course.brand,
      description: 'Mémo du cours de Cybersécurité B1 : risque et triade CIA, authentification et ' +
        'chiffrement, modèles de contrôle d\'accès, détection et réponse, conformité sur une page.',
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
      intro: 'Sujet type épreuve — fondements, menaces, authentification.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Risque',
          text: 'Un serveur de paie est exposé : menace « ransomware » (probabilité 3 sur 3), vulnérabilité « correctif critique manquant » (3 sur 3), impact « arrêt de la paie et obligation de notification » (3 sur 3). Calculer et classer le risque, proposer deux mesures qui font baisser deux termes différents de la formule, et nommer la composante CIA visée par chaque mesure.',
          sol: 'Risque = 3 × 3 × 3 = 27 : niveau <strong>critique</strong> (somme maximale des trois termes).<br>Baisser la vulnérabilité : déployer le correctif sous 45 jours (il est critique). Baisser l\'impact : sauvegarde 3-2-1 hors ligne testée, qui permet de restaurer sans payer. Les deux protègent surtout la <strong>disponibilité</strong> (et la confidentialité pour la sauvegarde chiffrée hors ligne).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — CIA',
          text: 'Classer chaque incident selon la composante CIA violée et donner une contre-mesure : (a) interception d\'un flux non chiffré ; (b) modification d\'un montant dans un ordre de paiement ; (c) ransomware qui rend le partage de fichiers inaccessible ; (d) divulgation d\'un fichier RH par un lien public.',
          sol: '(a) Confidentialité — chiffrer le flux (TLS, VPN). (b) Intégrité — signature/hachage et contrôle des montants anormaux, journal d\'audit. (c) Disponibilité — sauvegardes testées, segmentation pour limiter la propagation. (d) Confidentialité — ACL et liens à durée limitée, revue des partages publics.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — 2FA',
          text: 'Un site propose en deuxième étape au choix : une question secrète, un code par application d\'authentification (TOTP), ou une seconde adresse e-mail. Quelles propositions constituent une vraie 2FA et pourquoi ? Quelle est la faiblesse de la question secrète ?',
          sol: 'Vraie 2FA : le code <strong>TOTP</strong> — « ce que je possède » est un facteur distinct du mot de passe (« ce que je sais »). La seconde adresse e-mail reste « ce que je sais » (le mot de passe de la boîte) : même facteur, donc pas une 2FA. La question secrète est « ce que je sais » aussi, et souvent devinable ou public (réseaux sociaux) : facteur faible et dupliqué.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Phishing',
          text: 'Trois liens : http://portail.univ-exemple.fr ; https://portail@univ-exemple.fr/login ; https://portail.univ-exemple.fr/login. Décrire les indices de phishing, puis donner les trois réflexes de l\'utilisateur avant de saisir ses identifiants.',
          sol: 'Lien 1 : pas de <strong>chiffrement</strong> (http) — tout circule en clair. Lien 2 : le vrai domaine est <strong>univ-exemple.fr après le @</strong> — ce qui précède l\'arobase est un identifiant, technique classique de camouflage. Lien 3 : conforme.<br>Réflexes : lire le domaine de droite à gauche avant le premier « / » ; ne jamais saisir d\'identifiants depuis un lien reçu (taper l\'adresse ou passer par son favori) ; en cas de doute, signaler à l\'équipe sécurité sans cliquer davantage.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté systèmes, incidents et conformité.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Accès',
          text: 'Un dossier médical partagé : le chef de service décide seul des accès (modèle A), l\'armée impose une étiquette « Secret » (modèle B), l\'hôpital attribue des rôles « médecin », « infirmier », « facturation » (modèle C). Nommer les trois modèles, donner le risque principal du modèle A et la règle qui limite chaque compte au minimum.',
          sol: 'A = <strong>DAC</strong> (le propriétaire décide), B = <strong>MAC</strong> (étiquette de sécurité imposée, l\'utilisateur ne relâche rien), C = <strong>RBAC</strong> (l\'habilité suit le rôle).<br>Risque du DAC : le propriétaire accorde trop, à tort, et personne ne le voit — diffusion incontrôlée. Règle du minimum : <strong>moindre privilège</strong> (least privilege), complétée par des révisions périodiques des habilitations.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Journal',
          text: 'Un journal d\'authentification montre : 192.0.2.10 — 3 échecs — puis succès ; 198.51.100.7 — 12 échecs — aucun succès ; 203.0.113.5 — 1 échec. Donner la règle d\'alerte (seuil), le verdict par IP et la première action sur la plus grave.',
          sol: 'Règle : <strong>alerte dès 3 échecs consécutifs par IP</strong> (comptage par IP, via un tableau associatif).<br>192.0.2.10 : franchit le seuil puis réussit — compte compromis probable : <strong>réinitialiser le mot de passe</strong>, révoquer les sessions. 198.51.100.7 : force brute franche — bloquer l\'IP et le compte ciblé. 203.0.113.5 : sous le seuil — journalisé, sans alerte.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — ICER',
          text: 'Un poste de la comptabilité présente les symptômes d\'un ransomware (fichiers renommés, note de rançon). Ordonner les phases I-C-E-R et dire, pour chacune, l\'action concrète sur ce cas. Pourquoi confiner avant d\'éteindre ?',
          sol: '<strong>Identification</strong> : confirmer l\'infection (fichiers chiffrés, note), périmètre (poste, partages atteints). <strong>Confinement</strong> : déconnecter le poste du réseau (et Wi-Fi), suspendre le compte — isoler sans éteindre pour garder la mémoire vive et les preuves. <strong>Éradication</strong> : retirer l\'agent, la persistance, corriger la faille d\'entrée (pièce jointe, RDP exposé). <strong>Rétablissement</strong> : restaurer depuis la sauvegarde saine 3-2-1, surveiller, reprendre le service. Éteindre détruirait des preuves et figerait l\'analyse.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — RGPD',
          text: 'Une entreprise française de 20 millions d\'euros de chiffre d\'affaires subit une fuite de données personnelles par négligence : base de clients non chiffrée sur un partage public. Citer le cadre applicable, calculer l\'amende maximale théorique, et lister trois obligations que la violation révèle comme non respectées.',
          sol: 'Cadre : <strong>RGPD</strong> (fuite de données personnelles). Amende maximale : le plus élevé de 20 M€ et de <strong>4 % du CA mondial</strong> — ici 800 000 €.<br>Obligations manquantes : <strong>protection par défaut</strong> (chiffrement d\'une base personnelle), <strong>limitation des accès</strong> (partage public = moindre privilège absent), <strong>notification</strong> de la violation à la CNIL dans les 72 h avec registre des traitements tenu à jour.'
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
    { stem: 'La sécurité informatique est…', opts: ['un synonyme de cybersécurité', 'un sous-ensemble de la cybersécurité', 'un concurrent de la cybersécurité'], correct: 1, exp: 'La cybersécurité englobe la sécurité informatique et s\'étend aux actifs humains et organisationnels.' },
    { stem: 'Risque = menace × vulnérabilité ×…', opts: ['probabilité', 'impact', 'coût'], correct: 1, exp: 'Les trois termes : ce qui peut arriver, la faille, ce que ça coûte.' },
    { stem: 'Un DDoS viole surtout…', opts: ['la confidentialité', 'l\'intégrité', 'la disponibilité'], correct: 2, exp: 'Le service devient inaccessible : c\'est la lettre D de la triade.' },
    { stem: 'Une vraie 2FA combine…', opts: ['mot de passe + question secrète', 'mot de passe + code sur téléphone', 'deux mots de passe'], correct: 1, exp: 'Deux facteurs distincts : ce que je sais (mot de passe) et ce que je possède (code).' },
    { stem: 'Le hachage sert à…', opts: ['chiffrer des messages', 'vérifier qu\'une donnée est intacte', 'remplacer le mot de passe'], correct: 1, exp: 'Sens unique et sans clé : il prouve l\'intégrité, il ne « déchiffre » pas.' },
    { stem: 'En RBAC, le droit suit…', opts: ['la personne', 'le rôle', 'le propriétaire du fichier'], correct: 1, exp: 'L\'habilité suit la fonction ; changer de poste change les droits.' },
    { stem: 'Un compte échoue 3 fois puis réussit…', opts: ['rien à signaler', 'alerte : compte compromis probable', 'alerte : bloquer l\'IP seulement'], correct: 1, exp: 'Le seuil déclenche ; le succès après les échecs indique une intrusion réussie.' },
    { stem: 'En ICER, isoler la machine se fait à la phase…', opts: ['Identification', 'Confinement', 'Éradication'], correct: 1, exp: 'Confinement : stopper la propagation, en gardant les preuves (ne pas éteindre).' },
    { stem: 'Amende RGPD maximale…', opts: ['20 M€ ou 4 % du CA mondial', '10 M€ ou 2 %', '4 M€ fixes'], correct: 0, exp: 'Le plus élevé des deux plafonds s\'applique aux violations les plus graves.' },
    { stem: 'La règle de sauvegarde 3-2-1 exige…', opts: ['3 mots de passe', '3 copies sur 2 supports dont 1 hors site', '3 serveurs dans la même salle'], correct: 1, exp: 'Trois copies, deux supports distincts, une copie hors site (idéalement hors ligne).' }
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
      '<strong>Réserve 15 min de relecture</strong> : formule du risque chiffrée, lettres CIA nommées, étapes ICER dans l\'ordre.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible 2FA et séquence ICER.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après le support du module. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Cybersécurité B1 : sujets chronométrés sur le risque, la ' +
        'triade CIA, l\'authentification, le contrôle d\'accès, la réponse aux incidents et la conformité.',
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
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un projet final qui ' +
    'outille le poste de travail d\'un analyste. Les scripts sont en Bash, comme à l\'atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n niveaux de risque (sommes de 2 à 6) et affiche le libellé : Faible (2-3), Moyenne (4-5), Critique (6).',
      'Lit n lettres C, I ou D et affiche le nom complet de la composante, puis le compteur de chaque lettre.',
      'Lit n mots de passe et affiche ok si la longueur atteint 12, court sinon.',
      'Lit n liens et affiche https pour ceux qui commencent par https://, suspect sinon.'
    ], [
      'read -r n',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r somme',
      '  if [ "$somme" -le 3 ]; then echo "Faible"',
      '  elif [ "$somme" -le 5 ]; then echo "Moyenne"',
      '  else echo "Critique"; fi',
      'done',
      '',
      'read -r n',
      'c=0 ; i=0 ; d=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r lettre',
      '  case "$lettre" in',
      '    C) echo "confidentialité" ; c=$((c + 1)) ;;',
      '    I) echo "intégrité" ; i=$((i + 1)) ;;',
      '    D) echo "disponibilité" ; d=$((d + 1)) ;;',
      '  esac',
      'done',
      'echo "C : $c"',
      'echo "I : $i"',
      'echo "D : $d"',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r mot',
      '  if [ "${#mot}" -ge 12 ]; then echo "ok" ; else echo "court"; fi',
      'done',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r lien',
      '  case "$lien" in',
      '    https://*) echo "https" ;;',
      '    *) echo "suspect" ;;',
      '  esac',
      'done'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Verrouillage de compte : lit n événements « reussite » ou « echec » et affiche BLOQUE au 3e échec consécutif, sinon ok.',
      'Politique de mots de passe : liste noire (3 mots interdits), longueur au moins 10, aucune répétition du mot précédent.',
      'Confinement : lit n alertes mineure/majeure et affiche l\'action (journaliser, isoler) puis le total d\'alertes majeures.',
      'Guichet 3-2-1 : lit n lignes « copies supports hors_site » et affiche conforme ou la règle manquante.'
    ], [
      'read -r n',
      'echecs=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r evenement',
      '  if [ "$evenement" = "echec" ]; then',
      '    echecs=$((echecs + 1))',
      '    if [ "$echecs" -ge 3 ]; then echo "BLOQUE" ; fi',
      '  else',
      '    echecs=0',
      '    echo "ok"',
      '  fi',
      'done',
      '',
      'read -r n',
      'precedent=""',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r mot',
      '  interdit=0',
      '  if [ "$mot" = "motdepasse" ] || [ "$mot" = "azerty123" ] || [ "$mot" = "123456" ]; then interdit=1; fi',
      '  if [ "$interdit" = "1" ]; then echo "liste noire"',
      '  elif [ "${#mot}" -lt 10 ]; then echo "longueur"',
      '  elif [ "$mot" = "$precedent" ]; then echo "répétition"',
      '  else echo "ok"; fi',
      '  precedent="$mot"',
      'done',
      '',
      'read -r n',
      'majeures=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r gravite',
      '  if [ "$gravite" = "majeure" ]; then',
      '    majeures=$((majeures + 1))',
      '    echo "isoler"',
      '  else',
      '    echo "journaliser"',
      '  fi',
      'done',
      'echo "majeures : $majeures"',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r copies supports hors_site',
      '  if [ "$copies" -lt 3 ]; then echo "manque : copies"',
      '  elif [ "$supports" -lt 2 ]; then echo "manque : supports"',
      '  elif [ "$hors_site" -lt 1 ]; then echo "manque : hors site"',
      '  else echo "conforme"; fi',
      'done'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Corrélation d\'alertes : lit n alertes horodatées et regroupe par actif, puis signale l\'actif avec le plus d\'alertes.',
      'Chaîne d\'attaque : lit n étapes reconnaissance/exploitation/exfiltration et affiche la première étape atteinte et la dernière.',
      'Comparateur de politiques : lit deux politiques (longueur, renouvellement en jours) et affiche celle qui est la plus stricte.',
      'Résumé d\'incident : lit n événements horodatés et calcule la durée entre détection et confinement (fin - début).'
    ], [
      'read -r n',
      'declare -A alertes',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r heure actif',
      '  alertes["$actif"]=$(( ${alertes["$actif"]:-0} + 1 ))',
      'done',
      'max=0 ; pire=""',
      'for actif in "${!alertes[@]}"; do',
      '  if [ "${alertes[$actif]}" -gt "$max" ]; then',
      '    max="${alertes[$actif]}"',
      '    pire="$actif"',
      '  fi',
      'done',
      'echo "pire actif : $pire ($max alertes)"',
      '',
      'read -r n',
      'atteinte=""',
      'derniere=""',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r heure etape',
      '  if [ -z "$atteinte" ]; then atteinte="$etape"; fi',
      '  derniere="$etape"',
      'done',
      'echo "première : $atteinte"',
      'echo "dernière : $derniere"',
      '',
      'read -r n1 l1 j1',
      'read -r n2 l2 j2',
      'if [ "$l1" -gt "$l2" ]; then',
      '  echo "politique 1"',
      'elif [ "$l2" -gt "$l1" ]; then',
      '  echo "politique 2"',
      'elif [ "$j1" -lt "$j2" ]; then',
      '  echo "politique 1"',
      'else',
      '  echo "politique 2"',
      'fi',
      '',
      'read -r n',
      'debut=""',
      'fin=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r heure evenement',
      '  if [ "$evenement" = "detection" ] &amp;&amp; [ -z "$debut" ]; then debut="$heure"; fi',
      '  if [ "$evenement" = "confinement" ]; then fin="$heure"; fi',
      'done',
      'echo "delai : $((fin - debut)) min"'
    ].join('\n')),

    '  <h2>Projet intégrateur — « poste de l\'analyste »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit <code>n</code> événements au format <code>heure evenement detail</code> — heure ' +
      'croissante en minutes (0 à 1439), evenement parmi <code>echec</code> (detail : IP), <code>reussite</code> ' +
      '(detail : IP), <code>malware</code> (detail : poste), <code>correctif</code> (detail : poste). Il applique ' +
      'les règles du cours : seuil de 3 échecs par IP avant tout succès, verrouillage de l\'IP fautive, ' +
      'isolement immédiat d\'un poste infecté, obligation de correctif sur un poste touché dans les 90 jours. ' +
      'Le rapport final affiche les verrouillages, les isolements, les correctifs exigés et le bilan.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les événements dans l\'ordre chronologique, sans en sauter.</li>',
      '      <li><strong>Compter</strong> les échecs par IP avec un tableau associatif, et verrouiller au seuil.</li>',
      '      <li><strong>Isoler</strong> un poste à la première détection de malware, une seule fois par poste.</li>',
      '      <li><strong>Exiger</strong> le correctif sur chaque poste isolé, même s\'il arrive après l\'alerte.</li>',
      '      <li><strong>Bilan</strong> : totaux par catégorie, après la boucle, formats exacts.</li>',
      '    </ol>',
      '    <p>Contraintes : <code>declare -A</code> pour les compteurs par IP et par poste, drapeaux de verrouillage/isolement, aucun affichage de bilan dans la boucle.</p>'
    ].join('\n')),
    box('method', 'Grille d\'auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture chronologique et découpage des champs <strong>20</strong>' },
        { cls: '', text: 'Comptage par IP et verrouillage au seuil <strong>20</strong>' },
        { cls: '', text: 'Isolement unique des postes infectés <strong>20</strong>' },
        { cls: '', text: 'Exigence de correctifs conforme <strong>20</strong>' },
        { cls: '', text: 'Bilan final lisible et complet <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n',
    'declare -A echecs',
    'declare -A verrouille',
    'declare -A isole',
    'declares_verrouillages=0',
    'declares_isolements=0',
    'declares_correctifs=0',
    'for ((k=0; k&lt;n; k++)); do',
    '  read -r heure evenement detail',
    '  if [ "$evenement" = "echec" ]; then',
    '    if [ "${verrouille[$detail]:-0}" = "1" ]; then continue ; fi',
    '    echecs["$detail"]=$(( ${echecs[$detail]:-0} + 1 ))',
    '    if [ "${echecs[$detail]}" -ge 3 ]; then',
    '      verrouille[$detail]=1',
    '      echo "verrouillage : $detail"',
    '      declares_verrouillages=$((declares_verrouillages + 1))',
    '    fi',
    '  elif [ "$evenement" = "malware" ]; then',
    '    if [ "${isole[$detail]:-0}" = "0" ]; then',
    '      isole[$detail]=1',
    '      echo "isolement : $detail"',
    '      declares_isolements=$((declares_isolements + 1))',
    '    fi',
    '  elif [ "$evenement" = "correctif" ] &amp;&amp; [ "${isole[$detail]:-0}" = "1" ]; then',
    '    echo "correctif exigé : $detail"',
    '    declares_correctifs=$((declares_correctifs + 1))',
    '  fi',
    'done',
    'echo "verrouillages : $declares_verrouillages"',
    'echo "isolements : $declares_isolements"',
    'echo "correctifs : $declares_correctifs"'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine lecture chronologique, comptage associatif, drapeaux d\'état et bilan final ' +
    '— les chapitres 4 et 5 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d\'après le support « Introduction à la Cybersécurité B1 IT 2024-2025 ». ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de Cybersécurité B1 : scripts ' +
        'Bash gradués et poste de travail complet d\'un analyste.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours de Cybersécurité B1 : ' + chapitre.toc +
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
