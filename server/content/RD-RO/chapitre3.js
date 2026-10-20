/**
 * Chapitre 3 du cours « Recherche Opérationnelle » B2 — Algorithme du Simplexe & Tableaux.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Algorithme du Simplexe &amp; Tableaux',
  short: 'Algorithme du Simplexe',
  toc: 'Principe d’itération de Dantzig, variables en base et hors-base, règle de sélection entrante/sortante et pivotage de Gauss-Jordan.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Dès qu’un problème compte 3, 10 ou 100 variables de décision, la représentation graphique dans le plan devient ' +
    'strictement impossible. Comment explorer un polyèdre à 50 dimensions sans tester des milliards de combinaisons ? ' +
    'En 1947, George Dantzig invente une méthode révolutionnaire : partir d’un sommet initial évident, ' +
    'inspecter les arêtes adjacentes pour choisir celle qui augmente le plus vite le profit, ' +
    'et glisser vers le sommet voisin par un pivot matriciel. C’est le génie de l’algorithme du Simplexe.',

  objectives: [
    'comprendre l’intuition géométrique et algébrique de la marche de sommet en sommet sur le polyèdre ;',
    'distinguer rigoureusement les variables de base (non nulles a priori) et les variables hors-base (fixées à zéro) ;',
    'dresser le tableau initial du simplexe à partir de la forme standard d’un programme linéaire ;',
    'appliquer le critère de Dantzig pour désigner la variable entrante (colonne pivot) ;',
    'appliquer le test du ratio minimum pour désigner la variable sortante (ligne pivot) et éviter de sortir du domaine réalisable ;',
    'exécuter un pivotage complet de Gauss-Jordan pour mettre à jour la base et les coûts réduits ;',
    'reconnaître sans hésiter la condition d’optimalité finale (tous les coûts réduits $\\bar{c}_j \\le 0$).'
  ],

  sections: [
    {
      title: 'Le principe fondamental : Naviguer de sommet en sommet',
      html: [
        '<p>L’algorithme du simplexe ne cherche pas au hasard. Il applique un principe d’<strong>ascension systématique</strong> :</p>',

        box('standard', 'La marche de Dantzig de sommet en sommet', [
          '<div class="box--formula">',
          '  <span class="formula-label">Itération 0 — Sommet initial (Origine)</span>',
          '  <p>Base $s = b$, variables de décision hors-base $x_1 = x_2 = 0 \\implies Z = 0$.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">Itération 1 — Choix de la plus forte pente</span>',
          '  <p>Entrée de la variable au coût réduit $\\bar{c}_k > 0$ le plus élevé, pivotage $\\implies Z = 120$.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">Itération 2 — Atteinte du sommet optimal</span>',
          '  <p>Nouvelle amélioration jusqu’à ce que tous les coûts réduits soient $\\le 0 \\implies Z^* = 160$ (Optimum prouvé).</p>',
          '</div>'
        ].join('\n')),

        box('info', 'Pourquoi le simplexe est-il si rapide ?', [
          '<p>Bien que le nombre théorique de sommets puisse être exponentiel dans le pire des cas (Klee-Minty), ' +
          'en pratique industrielle l’algorithme du simplexe converge en un nombre d’itérations linéaire par rapport ' +
          'au nombre de contraintes (généralement entre $1.5 m$ et $3 m$ pivots, où $m$ est le nombre de lignes).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Base, Hors-Base & Solutions de Base Réalisables',
      html: [
        '<p>Considérons un système de $m$ contraintes avec $n$ variables ($n > m$) sous forme standard $A x = b$ :</p>',

        box('standard', 'Définition d’une Solution de Base Réalisable (SBR)', [
          '<ul>',
          '  <li>On partitionne les $n$ variables en deux groupes :',
          '    <ul>',
          '      <li><strong>$m$ variables de base ($x_B$)</strong> : associées à une sous-matrice carrée inversible $B$ de taille $m \\times m$.</li>',
          '      <li><strong>$n - m$ variables hors-base ($x_N$)</strong> : fixées arbitrairement à zéro ($x_N = 0$).</li>',
          '    </ul>',
          '  </li>',
          '  <li>La valeur des variables de base est alors calculée par $x_B = B^{-1} b$.</li>',
          '  <li>Si $x_B \\ge 0$, la solution de base est dite <strong>réalisable (SBR)</strong> : elle correspond exactement à un <strong>sommet</strong> du polyèdre géométrique !</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Anatomie du Tableau du Simplexe',
      html: [
        '<p>L’algorithme consigne tous les calculs dans un tableau matriciel structuré :</p>',

        '<table class="table">',
        '  <thead><tr><th>Base</th><th>x1</th><th>x2</th><th>s1</th><th>s2</th><th>b (Solution)</th><th>Ratio (b / a_col)</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>s1</strong></td><td>a11</td><td>a12</td><td>1</td><td>0</td><td>b1</td><td>b1 / a1k</td></tr>',
        '    <tr><td><strong>s2</strong></td><td>a21</td><td>a22</td><td>0</td><td>1</td><td>b2</td><td>b2 / a2k</td></tr>',
        '    <tr style="background:var(--accent-soft)"><td><strong>Δ (Coûts réduits)</strong></td><td>c1</td><td>c2</td><td>0</td><td>0</td><td>-Z (ou Z courant)</td><td>—</td></tr>',
        '  </tbody>',
        '</table>',

        box('tip', 'Interprétation des coûts réduits (ligne Δ)', [
          '<p>Le coût réduit $\\bar{c}_j$ indique le <strong>gain marginal net</strong> obtenu sur la fonction objectif ' +
          'si l’on augmente la variable hors-base $x_j$ d’une unité :</p>',
          '<ul>',
          '  <li>Si $\\bar{c}_j > 0$ : faire entrer $x_j$ dans la base va <strong>augmenter le profit</strong> $Z$.</li>',
          '  <li>Si tous les $\\bar{c}_j \\le 0$ : aucune variable ne peut augmenter le profit, la base courante est <strong>optimale</strong>.</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'L’Itération du Simplexe en 4 règles précises',
      html: [
        '<p>Chaque itération du simplexe applique rigoureusement les quatre étapes suivantes :</p>',

        box('formula', 'Algorithme d’itération du simplexe en 4 étapes clés', [
          '<div class="box--formula">',
          '  <span class="formula-label">1. Variable entrante (colonne pivot $k$)</span>',
          '  <div class="math-block">$$k = \\operatorname{argmax} \\{ \\bar{c}_j \\mid \\bar{c}_j > 0 \\}$$</div>',
          '  <p>Si aucun $\\bar{c}_j > 0$, la solution courante est optimale (STOP).</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">2. Variable sortante (ligne pivot $r$ — Test du ratio minimum)</span>',
          '  <div class="math-block">$$r = \\operatorname{argmin} \\left\\{ \\theta_i = \\frac{b_i}{a_{ik}} \\;\\middle|\\; a_{ik} > 0 \\right\\}$$</div>',
          '  <p>Si tous les $a_{ik} \\le 0$, le domaine est ouvert : le problème est non borné ($Z \\to +\\infty$).</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">3. Pivot de Gauss-Jordan</span>',
          '  <p>Le coefficient $p = a_{rk}$ est le pivot. On normalise la ligne du pivot : $L_r \\leftarrow \\frac{L_r}{p}$.</p>',
          '  <p>Pour chaque autre ligne $i \\ne r$ : $L_i \\leftarrow L_i - a_{ik} L_r$ (élimination sur la colonne $k$).</p>',
          '</div>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  questions: [
    {
      q: 'Dans un tableau du simplexe en maximisation, à quel moment s’arrête l’algorithme avec la certitude d’avoir trouvé l’optimum ?',
      opts: [
        'Lorsque tous les coûts réduits de la ligne d’indicateurs sont négatifs ou nuls (Δj ≤ 0)',
        'Lorsque toutes les variables de décision valent zéro',
        'Lorsque le second membre b devient négatif',
        'Après exactement 10 itérations'
      ],
      correct: 0,
      exp: 'Si tous les coûts réduits sont $\\le 0$, aucune variable hors-base ne peut améliorer la fonction objectif, la solution est optimale.'
    },
    {
      q: 'Selon le critère de Dantzig pour un problème MAX, quelle variable choisit-on pour entrer dans la base ?',
      opts: [
        'Celle qui possède le coût réduit le plus strictement positif',
        'Celle qui a la plus petite valeur absolue',
        'Celle qui a le plus petit indice j',
        'Celle dont le coefficient dans la première ligne est nul'
      ],
      correct: 0,
      exp: 'La règle de Dantzig sélectionne la variable promettant le plus fort taux d’accroissement unitaire de la fonction objectif.'
    },
    {
      q: 'Pourquoi la règle du ratio minimum (b_i / a_ik) impose-t-elle de ne considérer que les coefficients a_ik strictement positifs (a_ik > 0) ?',
      opts: [
        'Pour garantir que la nouvelle solution de base reste non négative (réalisable)',
        'Pour éviter une division par un nombre complexe',
        'Parce que les coûts réduits sont positifs',
        'C’est une convention purement esthétique'
      ],
      correct: 0,
      exp: 'Augmenter la variable entrante diminue les variables de base proportionnellement à $a_{ik}$. Si $a_{ik} > 0$, la variable de base s’annule à $b_i / a_{ik}$. Le ratio minimum garantit qu’aucune variable ne devient négative.'
    },
    {
      q: 'Que conclut l’algorithme du simplexe si, pour une variable entrante choisie, tous les coefficients de la colonne pivot sont négatifs ou nuls (a_ik ≤ 0) ?',
      opts: [
        'Le problème est non borné (la fonction objectif peut croître vers l’infini sans jamais violer les contraintes)',
        'Le problème est irréalisable',
        'La solution optimale vaut zéro',
        'Le pivotage est impossible et l’algorithme recommence'
      ],
      correct: 0,
      exp: 'Si aucun coefficient n’est positif, la variable entrante peut augmenter indéfiniment sans qu’aucune variable de base ne diminue : $Z \\to +\\infty$.'
    },
    {
      q: 'Quelle règle de brisure d’égalité (tie-breaking) permet de choisir la variable de plus petit indice pour éviter le phénomène de cyclage ?',
      opts: [
        'La règle de Bland',
        'La règle de Cramer',
        'La règle de L’Hôpital',
        'La règle de Simpson'
      ],
      correct: 0,
      exp: 'La règle de Bland (Robert Bland, 1977) garantit formellement l’absence de bouclage infini en cas de dégénérescence.'
    },
    {
      q: 'Dans un problème standard avec m contraintes et n variables (n > m), combien de variables sont fixées à zéro (variables hors-base) dans une solution de base ?',
      opts: [
        'n - m variables',
        'm variables',
        'n variables',
        'Exactement 2 variables'
      ],
      correct: 0,
      exp: 'Une base contient exactement $m$ variables. Les $n - m$ autres variables sont hors-base et ont pour valeur 0.'
    },
    {
      q: 'Après l’opération de pivot de Gauss-Jordan sur l’élément (r, c), que vaut l’élément de pivot lui-même et les autres coefficients de sa colonne ?',
      opts: [
        'Le pivot vaut 1 et tous les autres éléments de la colonne valent 0',
        'Le pivot vaut 0 et les autres valent 1',
        'Tous les éléments valent -1',
        'La colonne est supprimée du tableau'
      ],
      correct: 0,
      exp: 'Le pivotage crée une colonne de la matrice identité : un 1 sur la ligne pivot $r$ et des 0 partout ailleurs.'
    },
    {
      q: 'Comment qualifie-t-on une solution de base réalisable dans laquelle au moins une variable de base a une valeur égale à zéro (b_i = 0) ?',
      opts: [
        'Une solution de base dégénérée',
        'Une solution non bornée',
        'Une solution imaginaire',
        'Une solution asymptotique'
      ],
      correct: 0,
      exp: 'La présence d’un zéro dans le vecteur de base caractérise la dégénérescence, où plus de $n$ hyperplans se coupent en un même sommet.'
    }
  ],

  pitfalls: [
    'Calculer le ratio sur des coefficients négatifs ou nuls ($a_{ik} \\le 0$), ce qui produit des ratios aberrants ou des divisions par zéro.',
    'Oublier de mettre à jour la ligne de fonction objectif lors de l’élimination de Gauss-Jordan.',
    'Pivoter sur un élément non nul mais sans diviser toute la ligne de pivot par la valeur du pivot pour obtenir un 1.',
    'Déclarer l’optimalité alors qu’il subsiste au moins un coût réduit strictement positif dans la ligne $\\Delta$.',
    'Confondre le nom de la variable qui entre (en haut de la colonne pivot) et celui de la variable qui sort (à gauche de la ligne pivot).'
  ],

  methodTitle: 'Protocole d’itération du Simplexe pas à pas',
  method: [
    'Examiner la ligne des coûts réduits $\\Delta$ : repérer le coefficient strictement positif le plus grand. Sa colonne est la colonne pivot $k$. Si aucun $\\Delta_j > 0$, la solution est optimale.',
    'Pour chaque ligne $i$ ayant $a_{ik} > 0$, calculer le ratio $\\theta_i = b_i / a_{ik}$. Identifier le ratio strictement positif le plus petit. Sa ligne est la ligne pivot $r$.',
    'Remplacer le nom de la variable de base sortante par celui de la variable entrante dans la colonne de gauche.',
    'Diviser tous les coefficients de la ligne $r$ par le pivot $p = a_{rk}$.',
    'Pour toutes les autres lignes $i \\neq r$ (y compris la ligne de fonction objectif), soustraire $a_{ik} \\times L_r$ pour annuler le terme en colonne $k$.'
  ],

  summary: [
    'Le Simplexe parcourt les sommets du polyèdre de proche en proche par pivotage matriciel.',
    'Une Solution de Base Réalisable compte $m$ variables de base ($x_B \\ge 0$) et $n - m$ variables hors-base ($x_N = 0$).',
    'La variable entrante correspond au plus grand coût réduit $\\bar{c}_j &gt; 0$ (règle de Dantzig).',
    'La variable sortante correspond au plus petit ratio $b_i / a_{ik}$ parmi les $a_{ik} &gt; 0$ (règle du ratio minimum).',
    'Le pivotage de Gauss-Jordan transforme la colonne pivot en colonne de la matrice identité ($1$ au pivot, $0$ ailleurs).'
  ],

  checklist: [
    'Je sais identifier les variables en base et hors-base dans un tableau de simplexe.',
    'Je sais sélectionner la variable entrante via la ligne des coûts réduits.',
    'Je sais calculer les ratios et identifier la variable sortante sans diviser par un nombre négatif ou nul.',
    'Je sais réaliser les opérations élémentaires de Gauss-Jordan pour mettre à jour le tableau.',
    'Je reconnais les conditions d’arrêt : optimalité prouvée ou problème non borné.'
  ],

  notions: [
    'Algorithme du Simplexe',
    'Solution de Base Réalisable (SBR)',
    'Coût réduit (Indicateur)',
    'Critère de Dantzig',
    'Règle du ratio minimum',
    'Pivot de Gauss-Jordan',
    'Variable entrante / sortante',
    'Règle de Bland',
    'Dégénérescence',
    'Non-bornitude'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois la définition des variables de base et la règle de sélection de la variable entrante.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le calcul des ratios et l’identification de la variable sortante.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les itérations et le pivotage de Gauss-Jordan.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la dualité et à la méthode des deux phases au chapitre 4.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce qu’une Solution de Base Réalisable (SBR) ?', a: 'Une solution de Ax = b avec m variables de base ≥ 0 et les n - m autres fixées à 0 (hors-base).' },
    { q: 'Comment choisit-on la variable entrante selon la règle de Dantzig ?', a: 'C’est la variable hors-base ayant le coût réduit strictement positif le plus élevé (max &Delta;j &gt; 0).' },
    { q: 'Comment choisit-on la variable sortante selon la règle du ratio minimum ?', a: 'C’est la variable de base associée au plus petit ratio bi / aik parmi les coefficients strictement positifs aik &gt; 0.' },
    { q: 'Que fait l’opération de pivot de Gauss-Jordan ?', a: 'Elle normalise la ligne pivot et annule tous les autres coefficients de la colonne pivot pour en faire une colonne identité.' },
    { q: 'Quelle est la condition d’arrêt pour l’optimalité en maximisation ?', a: 'Tous les coûts réduits &Delta;j dans la ligne de coût relatif sont négatifs ou nuls (&le; 0).' },
    { q: 'Que signifie une colonne pivot dont tous les coefficients aik sont ≤ 0 ?', a: 'Le programme linéaire est non borné (la fonction objectif tend vers +&infin; sans violer les contraintes).' }
  ]
};

