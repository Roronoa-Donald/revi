/**
 * Chapitre 2 du cours « Recherche Opérationnelle » B2 — Formes Mathématiques & Résolution Graphique.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Formes Mathématiques &amp; Résolution Graphique',
  short: 'Formes &amp; Graphique',
  toc: 'Forme canonique, forme standard, variables d’écart et d’excès, géométrie du polyèdre convexe et résolution dans le plan R².',
  time: '≈ 2 h 40 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un problème linéaire à deux variables de décision ($x_1, x_2$) possède une propriété visuelle remarquable : ' +
    'chaque contrainte délimite un demi-plan, et leur intersection forme un polygone convexe dans le premier quadrant. ' +
    'Comment trouver le point optimal parmi une infinité de points réalisables sans les tester un par un ? ' +
    'Grâce à la géométrie des droites d’iso-profit et au calcul matriciel des sommets par la règle de Cramer, ' +
    'on peut localiser l’optimum absolu instantanément et comprendre pourquoi il se situe toujours sur un sommet.',

  objectives: [
    'convertir un programme linéaire sous forme canonique en forme standard par ajout de variables d’écart et d’excès ;',
    'comprendre le rôle mathématique des variables d’écart ($s_i \\ge 0$) et d’excès ($e_i \\ge 0$) ;',
    'tracer graphiquement la région réalisable (polyèdre convexe) dans le plan cartésien $\\mathbb{R}^2$ ;',
    'calculer les coordonnées analytiques exactes des sommets d’intersection par la règle de Cramer ;',
    'déterminer l’optimum géométrique via le déplacement du vecteur gradient de la fonction objectif ;',
    'diagnostiquer les quatre cas de figures : optimum unique, infinité de solutions, problème non borné et infaisabilité.'
  ],

  sections: [
    {
      title: 'Forme Canonique vs Forme Standard',
      html: [
        '<p>La forme d’un programme linéaire conditionne son mode de traitement mathématique :</p>',

        box('formula', 'Comparaison matricielle : Forme Canonique vs Forme Standard', [
          '<div class="box--formula">',
          '  <span class="formula-label">1. Forme Canonique (Idéale pour l’analyse géométrique)</span>',
          '  <div class="math-block">$$\\begin{aligned} \\text{MAX } & Z = c^T x \\\\[4pt] \\text{sous } & A x \\le b \\\\[4pt] \\text{avec } & x \\ge 0 \\quad (b \\ge 0) \\end{aligned}$$</div>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">2. Forme Standard (Obligatoire pour l’algorithme du Simplexe)</span>',
          '  <div class="math-block">$$\\begin{aligned} \\text{MAX } & Z = c^T x + 0^T s \\\\[4pt] \\text{sous } & A x + I s = b \\\\[4pt] \\text{avec } & x \\ge 0, \\ s \\ge 0 \\quad (b \\ge 0) \\end{aligned}$$</div>',
          '</div>'
        ].join('\n')),

        box('standard', 'Variables d’écart (Slack) et d’excès (Surplus)', [
          '<p>Pour transformer une <strong>inéquation</strong> en <strong>équation stricte</strong> :</p>',
          '<ul>',
          '  <li><strong>Contrainte $\\le$ (ressource maximale)</strong> : on ajoute une <em>variable d’écart</em> $s_i \\ge 0$.<br>' +
          '  $$a_{i1} x_1 + a_{i2} x_2 \\le b_i \\iff a_{i1} x_1 + a_{i2} x_2 + s_i = b_i$$' +
          '  <em>Sens économique</em> : $s_i$ mesure la <strong>capacité inutilisée</strong> de la ressource $i$ (si $s_i = 0$, la ressource est saturée).</li>',
          '  <li><strong>Contrainte $\\ge$ (exigence minimale)</strong> : on soustrait une <em>variable d’excès</em> $e_k \\ge 0$.<br>' +
          '  $$a_{k1} x_1 + a_{k2} x_2 \\ge b_k \\iff a_{k1} x_1 + a_{k2} x_2 - e_k = b_k$$' +
          '  <em>Sens économique</em> : $e_k$ mesure le <strong>dépassement au-dessus du seuil minimum</strong> imposé.</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Géométrie de la Région Réalisable : Le Polyèdre Convexe',
      html: [
        '<p>L’ensemble des points $(x_1, x_2)$ vérifiant simultanément toutes les contraintes forme la <strong>région réalisable</strong> (ou domaine de faisabilité). ' +
        'Sur le plan mathématique, cette région possède des propriétés capitales :</p>',

        box('info', 'Propriétés mathématiques fondamentales', [
          '<ul>',
          '  <li><strong>Intersection de demi-plans</strong> : chaque contrainte $a_1 x_1 + a_2 x_2 \\le b$ définit une droite frontière et un demi-plan fermé.</li>',
          '  <li><strong>Convexité</strong> : la région est un ensemble <em>convexe</em>. Si deux points $A$ et $B$ sont réalisables, tout le segment reliant $A$ et $B$ est également réalisable.</li>',
          '  <li><strong>Sommets (Points extrêmes)</strong> : ce sont les coins du polygone, obtenus par l’intersection de deux droites de contraintes (actives).</li>',
          '  <li><strong>Théorème fondamental de la PL</strong> : si un programme linéaire admet une solution optimale finie, au moins un sommet du polyèdre réalisable est optimal.</li>',
          '</ul>'
        ].join('\n')),

        '<p>Ce théorème réduit considérablement la recherche : au lieu de sonder une infinité de points intérieurs, ' +
        'il suffit d’examiner le nombre <em>fini</em> de sommets extrêmes !</p>'
      ].join('\n')
    },
    {
      title: 'Calcul analytique des sommets par la règle de Cramer',
      html: [
        '<p>Pour trouver avec exactitude les coordonnées $(x_1, x_2)$ d’un sommet formé par l’intersection de deux droites ' +
        'frontières actives $a_1 x_1 + b_1 x_2 = c_1$ et $a_2 x_1 + b_2 x_2 = c_2$, on utilise la <strong>règle de Cramer</strong> :</p>',

        box('formula', 'Formules analytiques de Cramer pour un système 2 × 2', [
          '<div class="math-block">',
          '$$\\Delta = \\begin{vmatrix} a_1 & b_1 \\\\[4pt] a_2 & b_2 \\end{vmatrix} = a_1 b_2 - a_2 b_1$$',
          '</div>',
          '<p>Si $\\Delta \\ne 0$, le point d’intersection unique $(x_1, x_2)$ du sommet s’écrit :</p>',
          '<div class="math-block">',
          '$$x_1 = \\frac{c_1 b_2 - c_2 b_1}{\\Delta}, \\qquad x_2 = \\frac{a_1 c_2 - a_2 c_1}{\\Delta}$$',
          '</div>',
          '<p><strong>Test de faisabilité :</strong> le sommet est réalisable si et seulement si $x_1 \\ge 0$, $x_2 \\ge 0$ et s’il vérifie toutes les autres contraintes du problème.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Typologie des Solutions d’un Programme Linéaire',
      html: [
        '<p>L’analyse graphique met en évidence quatre cas de figures possibles pour un problème d’optimisation linéaire :</p>',

        '<table class="table">',
        '  <thead><tr><th>Cas de figure</th><th>Configuration géométrique</th><th>Interprétation pratique</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Solution optimale unique</strong></td><td>La droite d’iso-profit touche le polyèdre en exactement un sommet.</td><td>Un plan de production parfait identifié sans ambiguïté.</td></tr>',
        '    <tr><td><strong>2. Infinité de solutions optimales</strong></td><td>La droite d’iso-profit est parallèle à un côté du polyèdre.</td><td>Toutes les combinaisons linéaires sur ce segment partagent le même profit maximal.</td></tr>',
        '    <tr><td><strong>3. Problème non borné (Unbounded)</strong></td><td>La région réalisable est ouverte à l’infini dans la direction d’optimisation.</td><td>Erreur de modélisation : une contrainte de ressource limitante a été oubliée ($Z \\to +\\infty$).</td></tr>',
        '    <tr><td><strong>4. Région réalisable vide (Infeasible)</strong></td><td>Les contraintes sont contradictoires, aucun point ne vérifie tout le système.</td><td>Exigences incompatibles entre elles (ex. $x_1 \\le 2$ et $x_1 \\ge 5$).</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  questions: [
    {
      q: 'Quelle variable ajoute-t-on pour convertir une contrainte d’inégalité de type « ≤ » en équation stricte ?',
      opts: [
        'Une variable d’écart (slack variable, s_i ≥ 0)',
        'Une variable d’excès soustraite',
        'Une variable artificielle binaire',
        'Une constante multiplicative'
      ],
      correct: 0,
      exp: 'On ajoute une variable d’écart positive $s_i \\ge 0$ pour combler la différence jusqu’au plafond de ressource.'
    },
    {
      q: 'Que représente économiquement une variable d’écart égale à zéro (s_i = 0) à l’optimum ?',
      opts: [
        'La ressource correspondante est saturée (pleinement exploitée)',
        'La ressource est inutile et n’a pas été utilisée',
        'Le problème n’a pas de solution',
        'Le coût unitaire de la ressource est nul'
      ],
      correct: 0,
      exp: '$s_i = 0$ signifie que toute la capacité disponible de la ressource $i$ a été consommée par la production.'
    },
    {
      q: 'D’après le théorème fondamental de la programmation linéaire, où se trouve nécessairement la solution optimale si elle existe et est finie ?',
      opts: [
        'Sur au moins un sommet (point extrême) de la région réalisable',
        'Toujours au centre de gravité géométrique',
        'À l’origine (0, 0)',
        'Strictement à l’intérieur du polygone'
      ],
      correct: 0,
      exp: 'Le gradient linéaire pousse la solution vers le bord le plus éloigné, garantissant que l’optimum est atteint sur un sommet.'
    },
    {
      q: 'Si deux droites frontières ont des pentes strictement identiques et que le déterminant principal Δ vaut 0, que peut-on en déduire ?',
      opts: [
        'Les deux droites sont parallèles (ou confondues) et ne se coupent pas en un point unique',
        'Le problème est forcément sans solution',
        'L’optimum est atteint à l’origine',
        'Les variables sont nulles'
      ],
      correct: 0,
      exp: '$\\Delta = 0$ implique la colinéarité des vecteurs normaux, donc des droites parallèles sans point d’intersection unique.'
    },
    {
      q: 'Comment appelle-t-on les droites pour lesquelles la fonction objectif Z conserve une valeur constante dans le plan ?',
      opts: [
        'Les droites d’iso-profit (ou lignes de niveau)',
        'Les droites de régression',
        'Les asymptotes obliques',
        'Les bissectrices canoniques'
      ],
      correct: 0,
      exp: 'Pour une constante $k$, l’équation $c_1 x_1 + c_2 x_2 = k$ décrit une droite d’iso-profit le long de laquelle le gain est identique.'
    },
    {
      q: 'Que se passe-t-il graphiquement si la droite d’iso-profit est parallèle à une arête de la région réalisable à l’optimum ?',
      opts: [
        'Il y a une infinité de solutions optimales sur toute cette arête',
        'Le problème devient non borné',
        'Le profit maximal vaut 0',
        'Le problème devient irréalisable'
      ],
      correct: 0,
      exp: 'Tous les points du segment frontière partagent la même valeur optimale de $Z$.'
    },
    {
      q: 'Que signifie un problème linéaire « non borné » (unbounded) dans un contexte économique ?',
      opts: [
        'Le profit pourrait croître vers l’infini car une contrainte physique essentielle a été omise',
        'L’usine n’a aucun client',
        'Le budget de trésorerie est bloqué',
        'Les variables doivent être négatives'
      ],
      correct: 0,
      exp: 'Dans la réalité, aucun profit ne peut être infini : la non-bornitude révèle un oubli dans les contraintes de ressources.'
    },
    {
      q: 'Dans la méthode graphique, que représente la région réalisable lorsque le système de contraintes est contradictoire ?',
      opts: [
        'L’ensemble vide ∅ (aucune solution réalisable)',
        'Le plan entier ℝ²',
        'L’origine uniquement',
        'Une droite infinie'
      ],
      correct: 0,
      exp: 'Si aucun point ne satisfait l’ensemble des contraintes, la région réalisable est vide (problème infaisable).'
    }
  ],

  pitfalls: [
    'Oublier de vérifier si un sommet calculé mathématiquement est réalisable vis-à-vis des autres contraintes.',
    'Confondre variable d’écart ($+ s_i$ sur une contrainte $\\le$) et variable d’excès ($- e_i$ sur une contrainte $\\ge$).',
    'Changer le sens de l’inégalité sans multiplier par $-1$ lors d’une conversion algébrique.',
    'Croire qu’un problème est résolu dès qu’on a trouvé un sommet quelconque sans comparer la valeur de $Z$ avec tous les autres sommets.',
    'Tracer les droites de contraintes en intervertissant l’axe des abscisses $x_1$ et l’axe des ordonnées $x_2$.'
  ],

  methodTitle: 'Méthode de résolution graphique d’un PL à 2 variables',
  method: [
    'Tracer les axes cartésiens $(x_1, x_2)$ et restreindre l’étude au premier quadrant ($x_1 \\ge 0, x_2 \\ge 0$).',
    'Pour chaque contrainte, tracer la droite frontière en trouvant ses deux points d’intersection avec les axes ($x_1=0$ puis $x_2=0$).',
    'Déterminer le demi-plan valide en testant le point origine $(0, 0)$ et hachurer la région réalisable polygonale.',
    'Identifier tous les sommets de la région réalisable et calculer leurs coordonnées par résolution de système (règle de Cramer).',
    'Calculer la valeur de $Z$ sur chaque sommet et sélectionner celui qui fournit la valeur optimale absolue.'
  ],

  summary: [
    'Forme standard : toutes les contraintes sont des équations ($=$) avec des variables d’écart $s_i \\ge 0$ ou d’excès $e_i \\ge 0$.',
    'La région réalisable est un polyèdre convexe issu de l’intersection de demi-plans fermés.',
    'L’optimum fini d’un programme linéaire est toujours atteint sur au moins un sommet du polyèdre.',
    'La règle de Cramer permet de calculer les intersections de deux droites frontières sans erreur d’arrondi.',
    'Les 4 diagnostics possibles : optimum unique, infinité d’optimums, problème non borné, ou problème infaisable.'
  ],

  checklist: [
    'Je sais transformer une contrainte $\\le$ en ajoutant une variable d’écart $s_i \\ge 0$.',
    'Je sais transformer une contrainte $\\ge$ en soustrayant une variable d’excès $e_i \\ge 0$.',
    'Je sais tracer la région réalisable polygonale dans le premier quadrant.',
    'Je sais calculer les coordonnées d’un sommet par la règle de Cramer ($x = \\Delta_x / \\Delta$).',
    'Je sais évaluer la fonction objectif $Z$ sur chaque sommet pour identifier l’optimum.'
  ],

  notions: [
    'Forme canonique',
    'Forme standard',
    'Variable d’écart (Slack)',
    'Variable d’excès (Surplus)',
    'Polyèdre convexe',
    'Règle de Cramer',
    'Droite d’iso-profit',
    'Point extrême / Sommet',
    'Problème non borné',
    'Infaisabilité'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la transformation en forme standard et les variables d’écart/excès.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le calcul d’intersection par la règle de Cramer.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la géométrie des polyèdres et l’évaluation des sommets.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à l’algorithme matriciel du Simplexe au chapitre 3.' }
  ],

  flashcards: [
    { q: 'Quelle est la différence entre forme canonique et forme standard ?', a: 'La forme canonique utilise des inégalités (≤), tandis que la forme standard impose des égalités (=) grâce aux variables d’écart et d’excès.' },
    { q: 'Pourquoi ajoute-t-on une variable d’écart s_i ≥ 0 sur une contrainte ≤ ?', a: 'Pour mesurer la sous-consommation ou la ressource restante jusqu’au plafond disponible.' },
    { q: 'Quelle est la formule du déterminant principal Δ pour deux droites dans R² ?', a: 'Δ = a1 * b2 - a2 * b1 (règle de Cramer).' },
    { q: 'Que signifie un déterminant Δ = 0 lors de la recherche d’intersection ?', a: 'Les deux droites sont strictement parallèles ou confondues (pas de sommet unique).' },
    { q: 'Pourquoi l’optimum se situe-t-il toujours sur un sommet ?', a: 'Parce que la fonction objectif est linéaire et son gradient pousse la solution vers les points extrêmes du polyèdre convexe.' },
    { q: 'Quels sont les 4 cas de figure possibles pour un programme linéaire ?', a: 'Solution optimale unique, infinité de solutions, problème non borné (unbounded), ou région réalisable vide (infeasible).' }
  ]
};
