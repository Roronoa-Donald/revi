/**
 * Pages transverses du cours de statistique descriptive B1.
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
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — votre note réelle dépend aussi de votre travail.\n  ' +
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
    '    <span class="tag tag--time">Mathématiques pour l’informatique</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>employer le vocabulaire exact : population, individus, caractère, modalités, effectif ;</li>',
      '      <li>construire un tableau statistique avec effectifs, fréquences et effectifs cumulés ;</li>',
      '      <li>calculer et interpréter moyenne, médiane, mode et quartiles ;</li>',
      '      <li>mesurer la dispersion : étendue, variance, écart-type, coefficient de variation ;</li>',
      '      <li>lire un nuage de points, calculer un coefficient de corrélation et une droite de régression.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Chaque chapitre part d’un jeu de données concret, pose le vocabulaire, montre un calcul ' +
      'détaillé ligne à ligne, puis se termine par <strong>trois études de cas statistiques</strong> : ' +
      'vous écrivez vraiment un programme qui résume une série (effectifs, moyenne, médiane, variance, ' +
      'coefficient de corrélation), il est réellement exécuté puis corrigé par des tests que vous ne voyez pas.</p>',
      '    <p>Python sert ici de <em>démarche méthodologique</em> : les formules restent celles du support, ' +
      'en notation statistique. Chaque énoncé précise si la variance se divise par N ou par N − 1.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo des formules</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de calcul</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Statistique descriptive — décrire une population (B1) | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du vocabulaire statistique jusqu’à la droite de ' +
    'régression. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
    'supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas statistiques</strong> à écrire et à exécuter ' +
    'dans la page : votre programme est réellement lancé, puis corrigé par des tests que vous ne voyez pas. ' +
    'L’<a href="atelier.html">atelier de calcul</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo des formules</span><br><span class="toc__d">Notations, formules et méthodes sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Calculs gradués et projet final d’analyse d’une série.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de calcul</span><br><span class="toc__d">Calculer et vérifier ses paramètres statistiques directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’évaluation, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de statistique descriptive B1 : ' + chapterList.length +
        ' chapitres, études de cas statistiques, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier d’analyse &amp; Bac à sable</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Python derrière. Donne une série de ' +
    'valeurs au programme, exécutez-le et lisez ce qu’il affiche : c’est ici qu’une formule devient un réflexe.</p>',
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
      '    <h3 class="lab__title">Zone libre — moyenne et dispersion</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Python</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prenez une notion du cours ' +
      '(fréquence, médiane, quartile, variance, corrélation), programmez-la et testez-la sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé calcule la moyenne et l’écart-type de la série fournie dans les données du cas. ' +
      'Modifiez la série, change la formule, ou remplace tout le script par le calcul que vous voulez vérifier.</p>',
      '      <p>Une erreur n’est pas un échec : c’est le message que Python te laisse pour comprendre ce qu’il attendait.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Cas d’exemple</b><pre>3',
      '2',
      '4',
      '6</pre></div>',
      '      <div class="lab__sample-part"><b>Résolution attendue</b><pre>moyenne : 4.00',
      'ecart-type : 1.63</pre></div>',
      '    </div>',
      '    <p class="lab__note">Quatre lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>Du calcul à la décision</h2>',
    '  <p>Décrire une série, ce n’est pas seulement produire des nombres : c’est choisir les bons. Une ' +
    'moyenne et une médiane très différentes signalent une distribution dissymétrique ; un coefficient de ' +
    'variation supérieur à 25 % signale une dispersion forte ; un coefficient de corrélation proche de 0 ' +
    'interdit de conclure à une influence. Chaque formule du cours sert cette lecture.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Division par N ou par N − 1</strong> : les deux existent, mais elles ne donnent pas le même résultat. L’énoncé dit toujours laquelle utiliser.</li>',
      '      <li><strong>Moyenne d’une série regroupée</strong> : on travaille sur les centres de classe, jamais sur les bornes.</li>',
      '      <li><strong>Somme des carrés mal répartie</strong> : la variance utilise les écarts à la moyenne, au carré — pas la somme des valeurs au carré divisée par N.</li>',
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
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois études de cas statistiques corrigées ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le cours est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Vocabulaire' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier d’analyse statistique | ' + course.brand,
      description: 'Atelier de calcul du cours de statistique descriptive B1 : éditeur dans le navigateur, ' +
        'espace d’application statistique et validation étape par étape des calculs.',
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
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Revenez à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo des formules' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de statistique descriptive B1 : notions clés des ' +
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
    '  <h1>Mémo des formules</h1>',
    '  <p class="lead">Notations, formules et méthodes du cours sur une page. À garder ouvert pendant les ' +
    'exercices et l’atelier.</p>',

    bloc('Vocabulaire', [
      '<table>',
      '    <tr><th>Terme</th><th>Sens</th></tr>',
      '    <tr><td>Population</td><td>ensemble étudié (les individus, les objets, les mesures)</td></tr>',
      '    <tr><td>Individu</td><td>un élément de la population</td></tr>',
      '    <tr><td>Caractère (ou variable)</td><td>ce que l’on observe sur chaque individu</td></tr>',
      '    <tr><td>Modalité</td><td>valeur prise par le caractère</td></tr>',
      '    <tr><td>Effectif n<sub>i</sub></td><td>nombre d’individus portant la modalité x<sub>i</sub></td></tr>',
      '    <tr><td>Effectif total N</td><td>somme des effectifs : N = Σ n<sub>i</sub></td></tr>',
      '  </table>',
      '<p>Caractère <strong>qualitatif</strong> (modalités non numériques), <strong>quantitatif discret</strong>',
      '(valeurs isolées) ou <strong>quantitatif continu</strong> (regroupé en classes).</p>'
    ].join('\n')),

    bloc('Fréquences et cumuls', [
      '<pre><code>fréquence relative        f<sub>i</sub> = n<sub>i</sub> / N            Σ f<sub>i</sub> = 1\n',
      'fréquence en pourcentage  100 × n<sub>i</sub> / N\n',
      'effectif cumulé croissant ECC<sub>i</sub> = n₁ + n₂ + … + n<sub>i</sub>\n',
      'effectif cumulé décroissant ECD<sub>i</sub> = n<sub>i</sub> + … + n<sub>k</sub></code></pre>',
      '<p>La fréquence cumulée vaut 1 (ou 100 %) pour la dernière modalité : c’est le contrôle de tout tableau.</p>'
    ].join('\n')),

    bloc('Tendance centrale', [
      '<pre><code>moyenne         x̄ = (1/N) · Σ n<sub>i</sub> · x<sub>i</sub>\n',
      'moyenne d’une série brute   x̄ = (1/n) · Σ x<sub>i</sub>\n',
      'série regroupée             on utilise le centre de classe : x<sub>i</sub> = (borne inf + borne sup) / 2\n',
      'médiane         valeur qui partage la série ordonnée en deux moitiés\n',
      'mode            modalité d’effectif maximal (peut ne pas exister, peut être multiple)\n',
      'quartiles       Q1 à 25 %, Q2 = médiane, Q3 à 75 %</code></pre>',
      '<p><strong>Rang d’un quantile</strong> de niveau p : r = (n + 1) · p. Si r est entier, la valeur est',
      'x<sub>(r)</sub> ; sinon on interpole entre x<sub>(⌊r⌋)</sub> et x<sub>(⌈r⌉)</sub>.</p>'
    ].join('\n')),

    bloc('Dispersion', [
      '<pre><code>étendue                e = x<sub>max</sub> − x<sub>min</sub>\n',
      'variance (div. par N)  V = (1/N) · Σ n<sub>i</sub> (x<sub>i</sub> − x̄)²\n',
      'écart-type             σ = √V\n',
      'coefficient de variation  CV = σ / x̄        (en %, si x̄ > 0)\n',
      '\n',
      'formule de König (calcul rapide, identique) :\n',
      'V = (1/N) · Σ n<sub>i</sub> · x<sub>i</sub>²  −  x̄²</code></pre>',
      '<p>L’écart-type s’exprime dans l’unité des données, le coefficient de variation non : c’est lui qui',
      'permet de comparer deux séries d’unités ou de niveaux différents. Ordre de grandeur : CV &gt; 25 % =',
      'dispersion forte.</p>'
    ].join('\n')),

    bloc('Représentations graphiques', [
      '<table>',
      '    <tr><th>Graphique</th><th>Pour quel caractère</th></tr>',
      '    <tr><td>Diagramme en bâtons / en barres</td><td>qualitatif ou quantitatif discret</td></tr>',
      '    <tr><td>Diagramme circulaire (secteurs)</td><td>qualitatif, parts d’un tout</td></tr>',
      '    <tr><td>Histogramme</td><td>quantitatif continu regroupé en classes</td></tr>',
      '    <tr><td>Boîte à moustaches</td><td>résumé en cinq valeurs : min, Q1, médiane, Q3, max</td></tr>',
      '  </table>',
      '<p>Dans un histogramme à classes de même amplitude, la hauteur est proportionnelle à l’effectif.',
      'Si les amplitudes diffèrent, on porte en hauteur la <em>densité</em> n<sub>i</sub> / amplitude.</p>'
    ].join('\n')),

    bloc('Série à deux caractères', [
      '<pre><code>moyenne de x      x̄        moyenne de y      ȳ\n',
      'covariance        cov(x, y) = (1/N) · Σ n<sub>ij</sub> (x<sub>i</sub> − x̄)(y<sub>j</sub> − ȳ)\n',
      'coefficient de corrélation linéaire\n',
      '                  r = cov(x, y) / (σ<sub>x</sub> · σ<sub>y</sub>)        −1 ≤ r ≤ 1\n',
      '\n',
      'droite des moindres carrés   y = a·x + b\n',
      '                  a = cov(x, y) / V(x)        b = ȳ − a·x̄</code></pre>',
      '<p><strong>Lecture de r</strong> : r &gt; 0 corrélation positive, r &lt; 0 négative ; |r| proche de 1,',
      'liaison linéaire forte ; r proche de 0, pas de liaison <em>linéaire</em> (une liaison courbe reste possible).</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre effectif (un nombre d’individus) et fréquence (une proportion).</li>',
      '    <li>Calculer une moyenne de classes à partir des bornes au lieu des centres.</li>',
      '    <li>Utiliser la médiane d’une série non triée.</li>',
      '    <li>Diviser par N − 1 quand l’énoncé demande une variance de population (division par N).</li>',
      '    <li>Comparer deux écarts-types de séries d’unités différentes au lieu des coefficients de variation.</li>',
      '    <li>Conclure à une relation de cause à effet à partir d’un coefficient de corrélation.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo des formules — ' + course.brand,
      description: 'Mémo de statistique descriptive B1 : vocabulaire, fréquences, tendance centrale, ' +
        'dispersion, graphiques, corrélation et régression sur une page.',
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
      intro: 'Sujet type — calcul et interprétation, d’après les évaluations B1.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/4 — Vocabulaire et tableau',
          text: 'Une enquête relève la note (sur 5) obtenue par 20 élèves : 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5. ' +
            'Précisez la population, le caractère et son type, puis construisez le tableau des effectifs et des fréquences.',
          sol: 'Population : les 20 élèves. Caractère : la note, quantitatif discret, 5 modalités (1 à 5).\n' +
            'Effectifs : n₁ = 2, n₂ = 4, n₃ = 6, n₄ = 5, n₅ = 3. Total N = 20.\n' +
            'Fréquences : 0,10 ; 0,20 ; 0,30 ; 0,25 ; 0,15 — somme égale à 1.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Tendance centrale',
          text: 'Avec la série de l’exercice 1, calculez la moyenne, la médiane et le mode.',
          sol: 'Moyenne : (1·2 + 2·4 + 3·6 + 4·5 + 5·3)/20 = (2 + 8 + 18 + 20 + 15)/20 = 63/20 = <strong>3,15</strong>.\n' +
            'Médiane : la série ordonnée compte 20 valeurs ; la moyenne des 10e et 11e vaut (3 + 3)/2 = <strong>3</strong>.\n' +
            'Mode : l’effectif maximal est 6, pour la note <strong>3</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/6 — Dispersion',
          text: 'Calculez la variance (division par N), l’écart-type et le coefficient de variation de la série de l’exercice 1.',
          sol: 'Σ nᵢxᵢ² = 1·2 + 4·4 + 9·6 + 16·5 + 25·3 = 2 + 16 + 54 + 80 + 75 = 227.\n' +
            'König : V = 227/20 − 3,15² = 11,35 − 9,9225 = <strong>1,4275</strong>.\n' +
            'σ = √1,4275 ≈ <strong>1,195</strong>. CV = 1,195/3,15 ≈ <strong>0,379</strong>, soit 37,9 % : dispersion forte.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Interprétation',
          text: 'La moyenne et la médiane de deux séries valent toutes deux 12. La série A a un écart-type de 0,5, la série B de 4,1. ' +
            'Que pouvez-vous dire des deux séries ?',
          sol: 'Même centre, dispersions très différentes : la série A est resserrée autour de 12, la série B très étalée.\n' +
            'Le coefficient de variation (égal ici, les moyennes étant égales) vaut 0,042 pour A et 0,34 pour B.\n' +
            'Conclusion : décrire une série par sa seule moyenne est insuffisant — il faut toujours donner une mesure de dispersion.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté séries regroupées et statistique bivariée.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Classes et centres',
          text: 'Un relevé donne les tailles de 50 personnes regroupées en classes : [150;160[ : 8, [160;170[ : 15, [170;180[ : 19, [180;190[ : 8. ' +
            'Calculez la taille moyenne.',
          sol: 'Centres de classe : 155, 165, 175, 185.\n' +
            'Moyenne = (8·155 + 15·165 + 19·175 + 8·185)/50 = (1 240 + 2 475 + 3 325 + 1 480)/50 = 8 520/50 = <strong>170,4 cm</strong>.\n' +
            'On travaille toujours sur les centres, jamais sur les bornes.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Quartiles',
          text: 'Pour la série brute (2, 4, 4, 5, 7, 8, 9, 11, 12, 15), donnez Q1, la médiane et Q3 avec la convention du cours.',
          sol: 'n = 10. Rang de Q1 : (10 + 1)·0,25 = 2,75 → entre x₂ = 4 et x₃ = 4 → Q1 = <strong>4</strong>.\n' +
            'Médiane : (10 + 1)/2 = 5,5 → (x₅ + x₆)/2 = (7 + 8)/2 = <strong>7,5</strong>.\n' +
            'Rang de Q3 : (10 + 1)·0,75 = 8,25 → entre x₈ = 11 et x₉ = 12 → 11 + 0,25 = <strong>11,25</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Corrélation',
          text: 'Sur 10 relevés, cov(x, y) = 6,4 ; σx = 4 ; σy = 2. Calculez r et commentez.',
          sol: 'r = 6,4 / (4 × 2) = <strong>0,8</strong>.\n' +
            'La liaison linéaire est forte et positive : quand x augmente, y a tendance à augmenter.\n' +
            'Attention : une corrélation n’établit jamais une cause.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Régression',
          text: 'Avec ȳ = 20, x̄ = 5, cov(x, y) = 6,4 et V(x) = 16, donnez la droite des moindres carrés.',
          sol: 'a = cov(x, y) / V(x) = 6,4/16 = <strong>0,4</strong>. b = ȳ − a·x̄ = 20 − 0,4 × 5 = <strong>18</strong>.\n' +
            'Droite : <strong>y = 0,4·x + 18</strong>. Elle passe par le point moyen (5 ; 20), ce qui est un bon contrôle.'
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
    { stem: 'Qu’appelle-t-on effectif d’une modalité ?', opts: ['Sa proportion', 'Le nombre d’individus qui la portent', 'Sa valeur'], correct: 1, exp: 'L’effectif est un comptage ; la fréquence est une proportion.' },
    { stem: 'La somme des fréquences relatives vaut…', opts: ['N', '1', '100'], correct: 1, exp: 'La somme des fréquences relatives vaut 1 (et 100 pour les pourcentages).' },
    { stem: 'Pour une série regroupée en classes, la moyenne se calcule avec…', opts: ['les bornes des classes', 'les centres des classes', 'les effectifs seuls'], correct: 1, exp: 'On remplace chaque classe par son centre.' },
    { stem: 'Quelle mesure est la moins sensible aux valeurs extrêmes ?', opts: ['La moyenne', 'La médiane', 'L’étendue'], correct: 1, exp: 'La médiane ne dépend que du rang, pas de la valeur des extrêmes.' },
    { stem: 'Que mesure l’écart-type ?', opts: ['Le centre de la série', 'La dispersion autour de la moyenne', 'L’effectif total'], correct: 1, exp: 'σ = √V, la racine de la variance : dispersion dans l’unité des données.' },
    { stem: 'Quel indicateur compare la dispersion de deux séries d’unités différentes ?', opts: ['L’écart-type', 'Le coefficient de variation', 'L’étendue'], correct: 1, exp: 'CV = σ/x̄ est sans unité : c’est lui qui permet la comparaison.' },
    { stem: 'Formule de König ?', opts: ['V = Σ nᵢxᵢ²/N − x̄²', 'V = x̄² − Σ nᵢxᵢ²/N', 'V = Σ nᵢ(xᵢ − x̄)²'], correct: 0, exp: 'Elle évite de calculer chaque écart à la moyenne.' },
    { stem: 'Dans un histogramme à classes de même amplitude, la hauteur est proportionnelle…', opts: ['à l’effectif', 'à la fréquence cumulée', 'à la variance'], correct: 0, exp: 'Mêmes amplitudes : la hauteur est proportionnelle à l’effectif.' },
    { stem: 'Que signifie r = −0,95 ?', opts: ['Une liaison linéaire forte et négative', 'Aucune liaison', 'Une erreur de calcul'], correct: 0, exp: '|r| proche de 1 et signe négatif : liaison linéaire forte décroissante.' },
    { stem: 'La droite des moindres carrés passe par…', opts: ['l’origine', 'le point moyen (x̄ ; ȳ)', 'le point (0 ; 0)'], correct: 1, exp: 'Propriété de contrôle : la droite de régression passe toujours par le point moyen.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’épreuve finale (durée 2 h, /20). ' +
    'Réalisez-les <strong>sans regarder</strong> les corrigés, puis corrigez-vous sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu’à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : division par N, centres de classe, interprétation de r.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible les pièges du calcul et l’interprétation.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’épreuve réelle.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit des évaluations B1. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de statistique descriptive B1 : sujets chronométrés proches de ' +
        'l’évaluation, avec corrigés détaillés.',
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
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier final d’analyse descriptive et de corrélation.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Calculer l’effectif total $N$ et l’étendue $e = x_{\\max} - x_{\\min}$ d’une série.',
      'Ordonner une série statistique dans l’ordre croissant.',
      'Construire le tableau des effectifs et fréquences.',
      'Calculer la moyenne arithmétique simple $\\bar{x} = \\frac{1}{N}\\sum x_i$.'
    ], [
      '<p><strong>1. Effectif et étendue :</strong> $N = \\sum n_i$, $e = x_{\\max} - x_{\\min}$.</p>',
      '<p><strong>2. Tri :</strong> On range les observations par ordre croissant pour identifier les extrêmes et la médiane.</p>',
      '<p><strong>3. Tableau :</strong> Pour chaque modalité distincte $x_i$, on note son effectif $n_i$ et sa fréquence $f_i = n_i / N$.</p>',
      '<p><strong>4. Moyenne simple :</strong> $\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_N}{N}$.</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calculer une moyenne pondérée à partir d’un tableau modalité / effectif.',
      'Calculer la médiane $Me$ d’une série discrète.',
      'Calculer la variance $V$ et l’écart-type $\\sigma$ par la formule de König-Huygens.',
      'Calculer les quartiles $Q_1, Q_3$ et l’écart interquartile $IQR = Q_3 - Q_1$.'
    ], [
      '<p><strong>1. Moyenne pondérée :</strong> $\\bar{x} = \\frac{\\sum n_i x_i}{\\sum n_i} = \\sum f_i x_i$.</p>',
      '<p><strong>2. Médiane :</strong> Valeur qui sépare la série ordonnée en deux groupes d’effectifs égaux ($50\\%$ des observations en dessous, $50\\%$ au-dessus).</p>',
      '<p><strong>3. König-Huygens :</strong> $V = \\frac{1}{N}\\sum n_i x_i^2 - \\bar{x}^2$, puis $\\sigma = \\sqrt{V}$.</p>',
      '<p><strong>4. Écart interquartile :</strong> $Q_1$ est le $25^{\\text{e}}$ centile, $Q_3$ le $75^{\\text{e}}$ centile ; $IQR = Q_3 - Q_1$ mesure la dispersion des $50\\%$ valeurs centrales.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Calculer la covariance $\\operatorname{cov}(X, Y)$ et le coefficient de corrélation linéaire $r$.',
      'Déterminer la droite de régression des moindres carrés $y = ax + b$.',
      'Comparer deux séries par leur coefficient de variation $CV = \\frac{\\sigma}{\\bar{x}}$.',
      'Découper une série continue en classes de même amplitude et calculer les centres de classe.'
    ], [
      '<p><strong>1. Corrélation :</strong> $\\operatorname{cov}(X,Y) = \\frac{1}{n}\\sum x_i y_i - \\bar{x}\\bar{y}$, d’où $r = \\frac{\\operatorname{cov}(X,Y)}{\\sigma_x \\sigma_y} \\in [-1, 1]$.</p>',
      '<p><strong>2. Droite de régression :</strong> Pente $a = \\frac{\\operatorname{cov}(X,Y)}{V(X)}$ et ordonnée à l’origine $b = \\bar{y} - a\\bar{x}$.</p>',
      '<p><strong>3. Coefficient de variation :</strong> $CV = \\frac{\\sigma}{\\bar{x}}$ permet de comparer la dispersion relative de deux distributions d’unités ou d’ordres de grandeur différents.</p>',
      '<p><strong>4. Classes :</strong> Pour une classe $[b_i, b_{i+1}[$, amplitude $a_i = b_{i+1} - b_i$ et centre $c_i = \\frac{b_i + b_{i+1}}{2}$.</p>'
    ].join('\n')),

    '  <h2>Projet intégrateur — Dossier d’Analyse Statistique &amp; Décision</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’étude statistique descriptive et décisionnelle consiste à analyser un jeu de données réel (production industrielle, fréquentation de service ou temps de réponse serveur) : calcul des indicateurs de position, de dispersion, étude de la forme de distribution et modélisation prédictive par régression linéaire.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences méthodologiques évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Indicateurs de position :</strong> Calcul et comparaison critique de la moyenne et de la médiane.</li>',
      '      <li><strong>Indicateurs de dispersion :</strong> Calcul de la variance, de l’écart-type et de l’écart interquartile.</li>',
      '      <li><strong>Ajustement linéaire :</strong> Équation de la droite des moindres carrés et coefficient de détermination $R^2 = r^2$.</li>',
      '      <li><strong>Interprétation économique :</strong> Formulation de recommandations décisionnelles étayées.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de statistiques descriptives B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et dossier intégrateur du cours de statistiques descriptives B1 : calculs gradués, indicateurs et corrélation.',
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
        : { href: '../atelier.html', label: 'Atelier de calcul' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours de statistique descriptive B1 : ' + chapitre.toc +
        ' Théorie, exemples calculés, études de cas statistiques, QCM corrigés.',
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
