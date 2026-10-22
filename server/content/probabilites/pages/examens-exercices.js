/**
 * Pages « examens blancs » et « exercices & annales » du cours « Probabilités » B2.
 */
'use strict';

const { ic, crumb, box, qcm, bands } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 — événements et variables discrètes',
      intro: 'Sujet type examen — fondements, dénombrement, espérance et variance.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Conditionnelle',
          text: 'On sait que P(A) = 0,5, P(B) = 0,4 et P(A ∩ B) = 0,2. Calculer P(A ∪ B) puis P(A|B). Que signifie le second résultat ?',
          sol: '<code>P(A∪B) = 0,5 + 0,4 − 0,2 = 0,7</code> et <code>P(A|B) = 0,2/0,4 = 0,5</code>.<br>Dans l’univers réduit à B, la moitié des cas réalisent A.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Dénombrement',
          text: 'Combien de codes de 4 chiffres distincts peut-on former avec les chiffres 1 à 9 ? L’ordre compte-t-il ?',
          sol: 'L’ordre compte : arrangement <code>A(9,4) = 9·8·7·6 = 3024</code>.<br>Combinaison interdite ici, sinon deux codes différents (ordre) seraient confondus.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Espérance',
          text: 'Une variable X prend les valeurs 1, 2, 3 avec les probabilités 0,2 ; 0,3 ; 0,5. Calculer E(X) puis V(X).',
          sol: '<code>E(X) = 1·0,2 + 2·0,3 + 3·0,5 = 2,3</code>.<br><code>E(X²) = 1·0,2 + 4·0,3 + 9·0,5 = 5,9</code>, donc <code>V = 5,9 − 2,3² = 0,61</code>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Répartition',
          text: 'Pour X suivant B(10 ; 0,5), calculer P(X = 2) et P(X ≤ 2). Quel outil évite de tout recalculer ?',
          sol: '<code>P(X=2) = C(10,2)·0,5¹⁰ ≈ 0,0439</code>.<br><code>P(X≤2) = P(X=0)+P(X=1)+P(X=2) ≈ 0,0547</code> ; le tableau de la loi ou la calculatrice évite les recalculs.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — lois continues et théorèmes limites',
      intro: 'Sujet orienté lois continues, standardisation et convergence.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Uniforme',
          text: 'X suit une loi uniforme sur [2, 10]. Calculer P(X ≤ 5) et P(X ≥ 8).',
          sol: '<code>P(X≤5) = (5−2)/8 = 0,375</code>.<br><code>P(X≥8) = (10−8)/8 = 0,25</code>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Exponentielle',
          text: 'Une durée de vie suit une loi exponentielle de paramètre λ = 0,5 (en années). Calculer P(X ≥ 2). Pourquoi dit-on qu’elle est sans mémoire ?',
          sol: '<code>P(X≥2) = e^(−0,5×2) = e^(−1) ≈ 0,3679</code>.<br>Sans mémoire : la probabilité de survivre encore ne dépend pas de l’âge déjà atteint.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Normale',
          text: 'X suit N(100, 15). Calculer P(X ≤ 130) après standardisation, sachant Φ(2) ≈ 0,9772.',
          sol: '<code>Z = (130−100)/15 = 2</code>.<br><code>P(X≤130) = Φ(2) ≈ 0,9772</code>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — TCL',
          text: 'On somme 100 variables i.i.d. de moyenne 0,5 et d’écart-type 1. Quelle est la loi approchée de la somme, et quel est son écart-type ?',
          sol: 'Par le TCL, la somme standardisée suit N(0,1).<br>Moyenne <code>nμ = 50</code>, écart-type <code>σ√n = 10</code>.'
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
    { stem: 'Que vaut P(Ā) ?', opts: ['1 − P(A)', 'P(A)', '0'], correct: 0, exp: 'On passe au complément.' },
    { stem: 'Formule de la réunion ?', opts: ['P(A)+P(B)', 'P(A)+P(B)−P(A∩B)', 'P(A)·P(B)'], correct: 1, exp: 'Retirer une fois l’intersection.' },
    { stem: 'C(n,k) compte…', opts: ['des arrangements', 'des combinaisons', 'des permutations'], correct: 1, exp: 'Sans ordre, c’est une combinaison.' },
    { stem: 'V(X) vaut…', opts: ['E(X²)−E(X)²', 'E(X)²', 'E(X)'], correct: 0, exp: 'Formule de Kœnig–Huygens.' },
    { stem: 'Espérance d’une binomiale ?', opts: ['np', 'p', 'λ'], correct: 0, exp: 'E = n·p.' },
    { stem: 'P(X = x) en continu ?', opts: ['0', 'f(x)', '1'], correct: 0, exp: 'Une valeur exacte a une probabilité nulle.' },
    { stem: 'Comment standardise-t-on ?', opts: ['Z = (X−μ)/σ', 'Z = X·σ', 'Z = X−μ'], correct: 0, exp: 'On centre et on divise par l’écart-type.' },
    { stem: 'Borne de Tchebychev ?', opts: ['V(X)/ε²', 'V(X)/ε', 'E(X)/a'], correct: 0, exp: 'P(|X−E(X)| ≥ ε) ≤ V(X)/ε².' },
    { stem: 'Écart-type de Sₙ ?', opts: ['σ√n', 'σn', 'σ'], correct: 0, exp: 'Variance nσ², donc écart-type σ√n.' },
    { stem: 'Que dit le TCL ?', opts: ['La somme standardisée tend vers N(0,1)', 'La moyenne est nulle', 'La variance explose'], correct: 0, exp: 'Indépendamment de la loi de départ.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’examen (durée 2 h, /20). ' +
    'Réalisez-les <strong>sans regarder</strong> les corrigés, puis corrigez-vous sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu’à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : formules de réunion, hypothèses de Markov/Tchebychev, ' +
      'standardisation, arrondis.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible les lois usuelles et la normale.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’examen.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & annales' }),
    disclaimer(course, 'Sujets construits dans l’esprit du cours. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de probabilités B2 : sujets chronométrés sur les événements, ' +
        'les variables aléatoires, les lois usuelles et le théorème central limite, avec corrigés détaillés.',
      active: 'examen',
      body
    }
  };
}

/* ======================== Exercices & annales ======================== */

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
    '  <h1>Exercices d’application &amp; annales</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis des sujets d’annales avec résolutions mathématiques complètes.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Calculer la probabilité d’un événement sur un univers équiprobable (fraction réduite).',
      'Appliquer la formule de la réunion P(A∪B).',
      'Calculer un arrangement A(n,k).',
      'Calculer une combinaison C(n,k).'
    ], [
      '<p><strong>1. Probabilité élémentaire :</strong> $P(A) = \\frac{2}{8} = \\frac{1}{4}$.</p>',
      '<p><strong>2. Formule du crible :</strong> $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0{,}3 + 0{,}3 - 0{,}1 = 0{,}5$.</p>',
      '<p><strong>3. Arrangements :</strong> $A_5^3 = 5 \\times 4 \\times 3 = 60$.</p>',
      '<p><strong>4. Combinaisons :</strong> $C_5^2 = \\frac{5 \\times 4}{2} = 10$.</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calculer l’espérance d’une loi discrète donnée en couples (x, p).',
      'Calculer la variance par E(X²) − E(X)².',
      'Calculer P(X = k) pour une loi binomiale.',
      'Calculer une probabilité de répartition P(X ≤ t).'
    ], [
      '<p><strong>1. Espérance :</strong> $E(X) = \\sum x_i p_i = 1 \\times 0{,}2 + 2 \\times 0{,}3 + 3 \\times 0{,}5 = 2{,}3$.</p>',
      '<p><strong>2. Variance :</strong> $E(X^2) = 1^2 \\times 0{,}2 + 2^2 \\times 0{,}3 + 3^2 \\times 0{,}5 = 5{,}9$, d’où $V(X) = 5{,}9 - 2{,}3^2 = 0{,}61$.</p>',
      '<p><strong>3. Loi binomiale :</strong> $P(X = 2) = \\binom{10}{2} (0{,}5)^2 (0{,}5)^8 = 45 \\times 0{,}5^{10} \\approx 0{,}0439$.</p>',
      '<p><strong>4. Fonction de répartition :</strong> $F(2) = P(X \\le 2) = P(X=1) + P(X=2) = 0{,}2 + 0{,}3 = 0{,}5$.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Calculer Φ(z) par la fonction d’erreur et comparer à la table.',
      'Appliquer l’inégalité de Markov puis de Tchebychev.',
      'Standardiser une somme et approximer par le TCL.',
      'Déterminer si deux événements sont indépendants à partir des probabilités.'
    ], [
      '<p><strong>1. Loi normale standard :</strong> $\\Phi(1{,}96) \\approx 0{,}9750$ (soit $2{,}5\\%$ au-delà).</p>',
      '<p><strong>2. Inégalité de Markov :</strong> $P(X \\ge 8) \\le \\frac{E(X)}{8} = \\frac{4}{8} = 0{,}50$.</p>',
      '<p><strong>3. Inégalité de Bienaymé-Tchebychev :</strong> $P(|X - 4| \\ge 2) \\le \\frac{V(X)}{2^2} = \\frac{4}{4} = 1{,}00$.</p>',
      '<p><strong>4. Théorème Central Limite :</strong> $Z = \\frac{55 - 50}{10} = 0{,}50$ ; $P(S \\le 55) = \\Phi(0{,}5) \\approx 0{,}6915$.</p>',
      '<p><strong>5. Indépendance :</strong> $A$ et $B$ sont indépendants si et seulement si $P(A \\cap B) = P(A) \\cdot P(B)$.</p>'
    ].join('\n')),

    '  <h2>Annales — sujets corrigés</h2>',
    box('situation', 'Sujet type — dé et variable aléatoire', 'play', [
      '    <p>On lance deux dés équilibrés et on note <code>S</code> la somme des faces. On étudie la ' +
      'distribution théorique de <code>S</code> et la convergence de la moyenne empirique vers l’espérance <code>7</code>.</p>'
    ].join('\n')),
    box('objectifs', 'Ce que le sujet évalue', 'target', [
      '    <ol>',
      '      <li><strong>Dénombrer</strong> l’univers des 36 couples de résultats équiprobables.</li>',
      '      <li><strong>Calculer</strong> l’espérance théorique E(S) = 7.</li>',
      '      <li><strong>Appliquer</strong> la loi faible des grands nombres.</li>',
      '      <li><strong>Analyser</strong> la vitesse de convergence par Bienaymé-Tchebychev.</li>',
      '    </ol>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir la résolution mathématique détaillée</summary>',
    '    <div class="sol">',
    '      <div class="box--formula"><div class="formula-label">Calcul de l’espérance théorique</div><div class="math-block">$$E(S) = E(D_1 + D_2) = E(D_1) + E(D_2) = 3{,}5 + 3{,}5 = 7$$</div></div>',
    '      <p>Par la loi faible des grands nombres, pour toute suite de variables aléatoires i.i.d. de même espérance $\\mu = 7$ et variance finie $\\sigma^2$, la moyenne empirique $\\bar{M}_n = \\frac{1}{n} \\sum_{i=1}^n S_i$ converge en probabilité vers $\\mu = 7$ :</p>',
    '      <div class="box--formula"><div class="formula-label">Convergence en probabilité</div><div class="math-block">$$\\forall \\varepsilon > 0, \\quad \\lim_{n \\to +\\infty} P(|\\bar{M}_n - 7| \\ge \\varepsilon) = 0$$</div></div>',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du cours historique de probabilités. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; annales — ' + course.brand,
      description: 'Exercices supplémentaires et annales du cours de probabilités B2 : calculs de ' +
        'probabilités, dénombrement, variables aléatoires et sujets corrigés.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
