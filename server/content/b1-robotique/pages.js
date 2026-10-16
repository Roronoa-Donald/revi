/**
 * Pages transverses du cours de robotique B1 (club).
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
    '    <span class="tag tag--time">Club Robotique &amp; Électronique</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>écrire un programme qui lit des entrées, décide et affiche au caractère près ;</li>',
      '      <li>répéter et cadencer : boucles de clignotement, séquences de feux, comptages ;</li>',
      '      <li>isoler des décisions dans des fonctions qui renvoient un booléen ;</li>',
      '      <li>trier, chercher et structurer : tri à bulles compté, dichotomie, dictionnaires ;</li>',
      '      <li>calculer portes logiques, additionneur complet et chiffre de César ;</li>',
      '      <li>piloter un capteur : seuils stricts, états, bilan minimum et moyenne.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le support du club voyage sur trois terrains : la programmation (C/C++/MicroPython), les ' +
      'circuits logiques (CircuitVerse) et le prototypage Arduino (Tinkercad). Ce cours en garde le plan ' +
      'mais simule chaque mécanisme <strong>en Python</strong> — le langage dont MicroPython est la copie ' +
      'portative : la boucle qui clignote, la table de vérité, le régulateur qui lit des relevés.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'programme, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique ' +
      'écrite ici se rejoue telle quelle sur la carte du club.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo du roboticien</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de simulation</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Club de Robotique — programmer, simuler, contrôler (B1) | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du premier programme jusqu’à la régulation ' +
    'd’un capteur. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
    'supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Python</strong> à écrire et à exécuter ' +
    'dans la page : ton programme est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L’<a href="atelier.html">atelier de simulation</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo du roboticien</span><br><span class="toc__d">Boucles, seuils, opérateurs bit à bit, formats d’affichage sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Programmes gradués et projet final de télémétrie.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de simulation</span><br><span class="toc__d">Écrire et exécuter du Python directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches du TP noté, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de robotique B1 : ' + chapterList.length +
        ' chapitres, exercices Python exécutables, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de simulation</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Python derrière. Programme le ' +
    'comportement du robot, exécute-le et lis ce qu’il affiche : c’est ici qu’une idée devient un programme.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre code Python tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Données du cas</strong> contient les paramètres soumis à l’étude.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="analyse"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie du cours.\n# Rédigez votre analyse sous forme de grille structurée.\n\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — régulateur de distance</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Python</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un comportement du robot ' +
      '(clignotement, seuil d’alerte, séquence de feux, chiffrement), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé lit une série de distances et déciderait la vitesse du robot. Modifie les ' +
      'seuils, change les états, ou remplace tout le script par le comportement que tu veux vérifier.</p>',
      '      <p>Sur la carte, ce sera <code>digitalWrite</code> et des capteurs réels : la structure du ' +
      'programme — lire, décider, agir — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Cas d’exemple</b><pre>5',
      '4',
      '35',
      '12',
      '29',
      '8</pre></div>',
      '      <div class="lab__sample-part"><b>Résolution attendue</b><pre>STOP',
      'LIBRE',
      'LENT',
      'LENT',
      'STOP</pre></div>',
      '    </div>',
      '    <p class="lab__note">Six lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la simulation à la carte</h2>',
    '  <p>La simulation texte a une limite assumée : rien ne clignote vraiment. Elle a une force : ' +
    '<strong>toute la logique se vérifie sans matériel</strong>. Quand le programme affiche les bonnes ' +
    'décisions sur tes cas limites, le portage vers MicroPython est mécanique : <code>print</code> devient ' +
    '<code>digitalWrite</code>, la lecture d’une ligne devient la lecture d’un capteur, et la boucle ' +
    'principale tourne dans <code>while True</code>.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Ordre des lectures inversé</strong> : le programme lit le relevé avant le seuil alors que l’énoncé fixe l’ordre.</li>',
      '      <li><strong>Seuil large au lieu de strict</strong> : la valeur exactement au seuil change de camp et le compte d’alertes glisse.</li>',
      '      <li><strong>Bilan dans la boucle</strong> : le total s’affiche à chaque passage au lieu d’une seule fois, après.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l’atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d’exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n’est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d’exécutions est limité par jour, pour tout le monde. L’atelier n’exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Python corrigés ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le comportement programmé est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Premier contact' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de simulation — programmer le robot | ' + course.brand,
      description: 'Atelier de simulation du club de robotique B1 : éditeur dans le navigateur, exécution ' +
        'réelle du programme Python, entrée standard, console de sortie et tuteur qui explique les erreurs.',
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo du roboticien' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du club de robotique B1 : notions clés des ' +
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
    '  <h1>Mémo du roboticien</h1>',
    '  <p class="lead">Boucles, décisions, formats et opérateurs du cours sur une page. À garder ouvert ' +
    'pendant les exercices et l’atelier.</p>',

    bloc('La boucle du robot', [
      '<pre><code>capter    lire les entrées (input, capteur)\n',
      'décider   comparer à des seuils ou des règles\n',
      'agir      commander les sorties (print, digitalWrite)</code></pre>',
      '<p>Sur la carte, la boucle tourne dans <code>loop()</code> ou <code>while True</code> ; en ' +
      'simulation, le programme la déroule puis s’arrête.</p>'
    ].join('\n')),

    bloc('Lectures et conversions', [
      '<p>Analyse cinématique et modélisation géométrique des degrés de liberté du manipulateur.</p>',
      '<p>L’ordre des lectures est imposé par l’énoncé : le programme doit le respecter exactement.</p>'
    ].join('\n')),

    bloc('Boucles et comptages', [
      '<pre><code>k répétitions         for _ in range(k):\n',
      'sur une série         for valeur in serie:\n',
      'compteur              initialiser AVANT, incrémenter DANS la bonne branche,\n',
      '                      exploiter APRÈS la boucle\n',
      'comparaisons du tri à bulles    n(n − 1) / 2</code></pre>',
      '<p>range(0) ne passe rien : le programme saute au bilan. Le pluriel s’accorde avec ' +
      '<code>{"s" if c &gt; 1 else ""}</code>.</p>'
    ].join('\n')),

    bloc('Décisions', [
      '<p>Analyse cinématique et modélisation géométrique des degrés de liberté du manipulateur.</p>',
      '<p>Strict ou large change la frontière de camp : la valeur exactement au seuil est le cas de test ' +
      'qui trahit l’opérateur.</p>'
    ].join('\n')),

    bloc('Logique et chiffrement', [
      '<pre><code>ET  a and b   (&amp; bit à bit)\n',
      'OU  a or b    (| bit à bit)\n',
      'NON not a     (~ bit à bit)\n',
      'XOR a != b    (^ bit à bit ; la puissance se note **)\n',
      'afficher 0/1  int(...)\n',
      'additionneur  S = a ^ b ^ cin ;  Cout = (a &amp; b) | (cin &amp; (a ^ b))\n',
      'César         chr((ord(c) - base + k) % 26 + base)</code></pre>',
      '<p>NAND = not(a and b) est universelle : tout circuit se reconstruit avec elle. Les lettres seules ' +
      'se décalent ; chiffres, espaces et ponctuation restent inchangés.</p>'
    ].join('\n')),

    bloc('Formats d’affichage', [
      '<pre><code>f"{valeur}"        insertion simple\n',
      'f"{m:.2f}"         deux décimales fixes        13.67\n',
      'f"{t:g}"           sans zéros inutiles          30.0 → 30\n',
      'f"{nom:&lt;12}"       aligné à gauche sur 12       "Membre      "\n',
      'f"{n} cycle{\'s\' if n &gt; 1 else \'\'}}"   pluriel conditionnel</code></pre>',
      '<p>Choisir le mauvais format change la sortie : les tests comparent au caractère près.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Lire les entrées dans un autre ordre que l’énoncé.</li>',
      '    <li>Initialiser un compteur dans la boucle, ou afficher le bilan dedans.</li>',
      '    <li>Confondre / (décimal) et // (quotient entier).</li>',
      '    <li>Écrire &gt;= là où l’énoncé dit « strictement supérieur ».</li>',
      '    <li>Décaler une majuscule avec la base des minuscules dans César.</li>',
      '    <li>Confondre ^ (XOR) et ** (puissance).</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo du roboticien — ' + course.brand,
      description: 'Mémo du club de robotique B1 : boucle du robot, lectures, boucles et comptages, ' +
        'décisions, logique bit à bit, César et formats d’affichage sur une page.',
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
      intro: 'Sujet type TP noté — écrire et expliquer un programme de comportement.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Signalisation',
          text: 'Un panneau d’avertissement du robot comporte un voyant d’état : expliciter la séquence temporelle de signalisation (actif / repos) et l’état de repos final lorsque le cycle d’alerte est achevé.',
          sol: 'Séquence cadencée par un temporisateur matériel : alternance des états HAUT et BAS, puis extinction sécurisée en fin de cycle.\n' +
            'Pour $k = 0$ : aucune impulsion d’alerte émise, le système reste directement à l’état de repos nominal.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Filtrage capteur',
          text: 'Définir une fonction logique de seuillage pour un capteur de proximité infrarouge : pourquoi la détection de proximité doit-elle séparer la lecture brute de la décision d’actionnement ?',
          sol: 'Fonction de seuillage logique : <code>proximite_critique = (valeur_mesuree < SEUIL_MIN)</code>.\n' +
            'Séparer l’acquisition capteur et l’actionnement garantit l’indépendance matérielle, la possibilité d’appliquer un filtre anti-rebond ou moyenne glissante, et la testabilité unitaire de la chaîne décisionnelle.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Énergie & couple',
          text: 'Calculer la puissance mécanique $P = C \\cdot \\omega$ développée par un motoréducteur délivrant un couple $C = 2\\text{ N}\\cdot\\text{m}$ à une vitesse de rotation de $120\\text{ tr/min}$.',
          sol: 'Conversion de la vitesse angulaire : $\\omega = 120 \\times \\frac{2\\pi}{60} = 4\\pi \\approx 12{,}566\\text{ rad/s}$.\n' +
            'Puissance mécanique : $P = C \\cdot \\omega = 2 \\times 12{,}566 \\approx 25{,}13\\text{ W}$.\n' +
            'Cette puissance dimensionne l’étage de conversion de puissance et le hacheur de commande.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Seuils',
          text: 'Un capteur déclenche une alerte strictement en dessous de 30 cm. Relevés : 12, 45, 8, 30. Donner le verdict de chaque relevé et le nombre d’alertes. Que changerait un test &lt;= ?',
          sol: '12 : ALERTE ; 45 : OK ; 8 : ALERTE ; 30 : OK (30 n’est pas strictement inférieur à 30). Alertes : <strong>2</strong>.\n' +
            'Avec &lt;=, le relevé 30 basculerait en alerte : le compte passerait à 3. La frontière change de camp.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté logique, chiffrement et régulation.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Portes',
          text: 'Pour a = 1 et b = 0, donner les sorties de AND, OR, NAND, NOR et XOR. Justifier NAND et NOR à partir de AND et OR.',
          sol: 'AND = 0 ; OR = 1 ; NAND = non(ET) = 1 ; NOR = non(OU) = 0 ; XOR = 1 (bits différents).\n' +
            'NAND et NOR sont les inverses exacts de AND et OR sur les mêmes entrées.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Additionneur',
          text: 'Calculer S et Cout pour a = 1, b = 1, cin = 1, avec les formules du cours. À quel nombre binaire correspond le résultat ?',
          sol: 'x = a ^ b = 0 ; S = x ^ cin = 1 ; Cout = (a &amp; b) | (cin &amp; x) = 1 | 0 = 1.\n' +
            'Résultat « 11 » en binaire : 1 + 1 + 1 = 3, retenue 1 et somme 1.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — César',
          text: 'Chiffrer « XYZ » avec k = 3, puis « Robot-2026! » avec k = 5. Que devient le tiret et que vaut le décalage de z ?',
          sol: 'XYZ avec k = 3 : <strong>ABC</strong> — le retour circulaire rebondit après Z.\n' +
            'Robot-2026! avec k = 5 : <strong>Wtgty-2026!</strong> — seules les lettres bougent, casse conservée (R majuscule donne W).\n' +
            'Le tiret reste un tiret : il passe par le else du programme. z + 1 rebondit sur a grâce au modulo 26.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Régulation',
          text: 'Relevés de distance : 4, 35, 12, 29, 47, 8. Donner l’état de chaque relevé (STOP &lt; 10, LENT &lt; 30, sinon LIBRE), puis le minimum et la moyenne entière.',
          sol: 'STOP, LIBRE, LENT, LENT, LIBRE, STOP.\n' +
            'Minimum : <strong>4</strong>. Somme : 135 ; moyenne entière : 135 // 6 = <strong>22</strong> (22,5 tronqué).\n' +
            'La moyenne imposée est entière : division //, pas /.'
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
    { stem: 'Combien de passages pour for _ in range(k) ?', opts: ['k', 'k + 1', 'k − 1'], correct: 0, exp: 'range(k) produit exactement k entiers, de 0 à k − 1.' },
    { stem: 'Où s’initialise un compteur de boucle ?', opts: ['Dans la boucle', 'Avant la boucle', 'Après la boucle'], correct: 1, exp: 'Avant : sinon il repart à zéro à chaque passage.' },
    { stem: 'Que vaut 17 // 5 ?', opts: ['3,4', '3', '2'], correct: 1, exp: 'Le quotient entier de la division euclidienne.' },
    { stem: 'Une fonction de test doit…', opts: ['afficher son verdict', 'renvoyer un booléen', 'modifier son argument'], correct: 1, exp: 'Elle renvoie True ou False ; l’affichage appartient au programme principal.' },
    { stem: 'Jusqu’où teste-t-on les diviseurs d’un nombre premier ?', opts: ['Jusqu’à x − 1', 'Jusqu’à la racine carrée de x', 'Jusqu’à x / 2'], correct: 1, exp: 'Un diviseur au-delà de la racine en suppose un plus petit déjà testé.' },
    { stem: 'Que vaut Cout pour a = 1, b = 0, cin = 1 ?', opts: ['0', '1', 'Non défini'], correct: 1, exp: '(1 ET 0) OU (1 ET 1) = 0 OU 1 = 1.' },
    { stem: 'Le chiffre de César avec k = 25 transforme A en…', opts: ['Z', 'B', 'A'], correct: 0, exp: 'Décaler de 25 recule d’une lettre : A donne Z.' },
    { stem: 'Que vaut 2 ^ 3 en Python ?', opts: ['8', '1', '6'], correct: 1, exp: '^ est le XOR bit à bit (10 XOR 11 = 01) ; la puissance se note **.' },
    { stem: 't = 30 avec le test t > 30 : quel état ?', opts: ['ALERTE CHALEUR', 'normale', 'Cela dépend'], correct: 1, exp: 'Seuil strict : 30 n’est pas strictement supérieur à 30.' },
    { stem: 'Que vaut 135 // 6 ?', opts: ['22,5', '22', '23'], correct: 1, exp: 'La division entière tronque : 22, reste 3.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit du TP noté du club (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu’à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : ordre des lectures, seuils stricts, indentation du bilan.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible les seuils stricts et les formats d’affichage.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant le TP noté.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit des TP du club. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du club de robotique B1 : sujets chronométrés proches du TP noté, ' +
        'avec corrigés détaillés.',
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
    '    <details><summary>Corrections &amp; résolutions détaillées</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier intégrateur d’ingénierie robotique.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Identifier les capteurs proprioceptifs et extéroceptifs d’un robot mobile.',
      'Calculer la résolution angulaire d’un encodeur optique incrémental de 1024 impulsions par tour.',
      'Distinguer boucle ouverte et boucle fermée dans une commande d’actionneur.',
      'Calculer la vitesse linéaire d’un robot à roues différentielles de rayon $R = 5\text{ cm}$ tournant à $\omega = 10\text{ rad/s}$.'
    ], [
      '<p><strong>1. Capteurs :</strong> Proprioceptifs (encodeurs, centrale inertielle) vs Extéroceptifs (LiDAR, ultrasons, caméras).</p>',
      '<p><strong>2. Résolution :</strong> $\Delta \theta = \frac{360^\circ}{1024} \approx 0{,}3516^\circ$ par impulsion.</p>',
      '<p><strong>3. Boucle :</strong> La boucle fermée utilise un retour capteur pour corriger l’écart de consigne (asservissement).</p>',
      '<p><strong>4. Vitesse :</strong> $v = R \cdot \omega = 0{,}05 \times 10 = 0{,}5\text{ m/s}$.</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Établir la machine à états finis (FSM) d’un robot éviteur d’obstacles.',
      'Calculer l’erreur statique d’un asservissement proportionnel (gain $K_p$).',
      'Dimensionner le couple moteur nécessaire pour déplacer une masse de $5\text{ kg}$ sur une pente de $15^\circ$.',
      'Interpréter les signaux PWM de commande d’un servomoteur standard ($1\text{ ms}$ à $2\text{ ms}$).'
    ], [
      '<p><strong>1. Machine à états :</strong> États {AVANCER, ARRET, PIVOTER_DROITE} régis par le seuil de distance de sécurité $d < d_{\min}$.</p>',
      '<p><strong>2. Erreur statique :</strong> Dépend de la classe du système ; l’ajout d’un terme intégral ($K_i$) annule l’erreur statique en régime permanent.</p>',
      '<p><strong>3. Couple :</strong> $C = F \cdot R = (m g \sin 15^\circ) \cdot R = 5 \times 9{,}81 \times 0{,}2588 \times 0{,}05 \approx 0{,}635\text{ N}\cdot\text{m}$.</p>',
      '<p><strong>4. PWM :</strong> Période $20\text{ ms}$ (50 Hz), largeur d’impulsion $1\text{ ms} \to -90^\circ$, $1{,}5\text{ ms} \to 0^\circ$, $2\text{ ms} \to +90^\circ$.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Écrire le modèle géométrique direct (MGD) d’un bras manipulateur planaire à 2 degrés de liberté.',
      'Analyser les configurations singulières où le bras perd un degré de mobilité.',
      'Régler les gains d’un correcteur PID par la méthode de Ziegler-Nichols.',
      'Concevoir une architecture de navigation sécurisée avec arrêt d’urgence matériel.'
    ], [
      '<p><strong>1. MGD 2 DDL :</strong> $x = L_1 \cos \theta_1 + L_2 \cos(\theta_1 + \theta_2)$ et $y = L_1 \sin \theta_1 + L_2 \sin(\theta_1 + \theta_2)$.</p>',
      '<p><strong>2. Singularités :</strong> Surviennent quand $\sin \theta_2 = 0$ (bras complètement tendu ou replié sur lui-même).</p>',
      '<p><strong>3. PID Ziegler-Nichols :</strong> Détermination du gain critique $K_u$ et de la période d’oscillation $T_u$, puis calcul des coefficients $K_p, T_i, T_d$.</p>',
      '<p><strong>4. Sécurité :</strong> Relais de sécurité à guidage forcé, coupure directe de l’alimentation de puissance des actionneurs (STO - Safe Torque Off).</p>'
    ].join('\n')),

    '  <h2>Projet intégrateur — Dossier d’Ingénierie &amp; Conception Mécatronique</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’étude robotique approfondie consiste à modéliser un système mécatronique complet : chaîne cinématique, dimensionnement énergétique, chaîne d’acquisition des capteurs et synthèse des lois de commande en boucle fermée.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Modélisation cinématique :</strong> Établissement des équations de mouvement directes et inverses.</li>',
      '      <li><strong>Dimensionnement actionneurs :</strong> Bilan des puissances, couples d’accélération et inerties rotoriques.</li>',
      '      <li><strong>Asservissement numérique :</strong> Synthèse d’un régulateur PID échantillonné.</li>',
      '      <li><strong>Sûreté de fonctionnement :</strong> Analyse des modes de défaillance (AMDEC) et dispositifs de protection.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de robotique et mécatronique B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et dossier intégrateur du cours de robotique B1 : cinématique, asservissement et mécatronique.',
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
        : { href: '../atelier.html', label: 'Atelier de simulation' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du club de robotique B1 : ' + chapitre.toc +
        ' Théorie, exemples détaillés, exercices Python exécutables, QCM corrigés.',
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
