/**
 * Chapitre 4 du cours « Recherche Opérationnelle » B2 — Méthode des Deux Phases & Dualité Linéaire.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Méthode des Deux Phases &amp; Dualité Linéaire',
  short: 'Deux Phases &amp; Dualité',
  toc: 'Variables artificielles, algorithme des deux phases, construction du programme dual, théorèmes de dualité et prix d’ombre.',
  time: '≈ 2 h 50 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lorsque toutes les contraintes sont de type $\\le$ avec des seconds membres positifs, les variables d’écart forment ' +
    'immédiatement une base de départ triviale à l’origine ($s = b$). Mais dès qu’il existe des contraintes de type $\\ge$ ou $=$, ' +
    'l’origine n’est pas réalisable et aucune base initiale n’apparaît spontanément. ' +
    'La méthode des Deux Phases permet de forcer l’accès à un premier sommet réalisable. ' +
    'Simultanément, la théorie de la dualité révèle que tout problème de production possède un jumeau économique ' +
    'qui calcule la valeur marginale exacte (le prix d’ombre) de chaque ressource rare de l’entreprise.',

  objectives: [
    'comprendre pourquoi les contraintes $\\ge$ et $=$ empêchent l’initialisation directe du simplexe ;',
    'introduire des variables artificielles ($a_i \\ge 0$) et dérouler la Phase 1 pour tester la faisabilité du système ;',
    'enchaîner sur la Phase 2 pour déterminer la solution optimale réelle du problème d’origine ;',
    'construire systématiquement le programme dual à partir de n’importe quel programme primal canonique ;',
    'énoncer et exploiter les théorèmes faible et fort de la dualité pour borner et prouver l’optimalité ;',
    'appliquer le théorème des écarts complémentaires pour déduire la solution duale à partir de la solution primale ;',
    'donner l’interprétation managériale des variables duales comme prix d’ombre (shadow prices).'
  ],

  sections: [
    {
      title: 'Le problème de l’initialisation : Pourquoi les variables artificielles ?',
      html: [
        '<p>Si une contrainte est de type $\\ge$, la mise sous forme standard donne :<br>' +
        '$$a_1 x_1 + a_2 x_2 - e_1 = b_1 \\quad (b_1 > 0)$$</p>' +
        '<p>Si l’on pose les variables de décision hors-base ($x_1 = 0, x_2 = 0$), on obtient :<br>' +
        '$$-e_1 = b_1 \\iff e_1 = -b_1 < 0$$</p>',

        box('pitfall', 'L’origine est irréalisable', [
          '<p>Une variable d’excès ne peut pas être négative ($e_1 \\ge 0$). L’origine $(0, 0)$ est en dehors du domaine de faisabilité. ' +
          'Il est donc impossible d’utiliser $e_1$ comme variable de base initiale !</p>',
          '<p><strong>La solution</strong> : on ajoute une <em>variable artificielle</em> fictive $a_1 \\ge 0$ :<br>' +
          '$$a_1 x_1 + a_2 x_2 - e_1 + a_1 = b_1$$<br>' +
          'qui fournit le coefficient $+1$ nécessaire pour constituer la base identité de départ.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'L’Algorithme des Deux Phases',
      html: [
        '<p>Pour éliminer ces variables artificielles qui n’ont aucune existence physique réelle dans le problème, ' +
        'l’algorithme résout deux programmes linéaires consécutifs :</p>',

        box('formula', 'Déroulement de l’algorithme des Deux Phases', [
          '<div class="box--formula">',
          '  <span class="formula-label">Phase 1 — Recherche d’une solution de base réalisable</span>',
          '  <div class="math-block">$$\\text{MIN } W = \\sum_{i} a_i$$</div>',
          '  <ul>',
          '    <li>Si $\\min W > 0$ : le problème d’origine est <strong>irréalisable</strong> (domaine de contraintes vide).</li>',
          '    <li>Si $\\min W = 0$ : toutes les variables artificielles sont nulles. Un premier sommet réalisable réel est atteint !</li>',
          '  </ul>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">Phase 2 — Optimisation du critère économique réel</span>',
          '  <div class="math-block">$$\\text{MAX } Z = \\sum_{j=1}^{n} c_j x_j$$</div>',
          '  <p>On supprime définitivement les colonnes artificielles et on poursuit le simplexe standard jusqu’à l’optimum global $Z^*$.</p>',
          '</div>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Théorie de la Dualité : Le Problème Miroir',
      html: [
        '<p>À tout problème d’optimisation linéaire (appelé <strong>Primal</strong>) est intrinsèquement associé ' +
        'un autre problème linéaire (appelé <strong>Dual</strong>) qui contient exactement la même information sous un angle opposé :</p>',

        '<table class="table">',
        '  <thead><tr><th>Caractéristique</th><th>Programme Primal</th><th>Programme Dual associé</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>Objectif</strong></td><td>MAXIMISER $Z = c^T x$</td><td>MINIMISER $W = b^T y$</td></tr>',
        '    <tr><td><strong>Nombre de variables</strong></td><td>$n$ variables de décision $x_j$</td><td>$m$ variables duales $y_i$</td></tr>',
        '    <tr><td><strong>Nombre de contraintes</strong></td><td>$m$ contraintes de ressources</td><td>$n$ contraintes duales</td></tr>',
        '    <tr><td><strong>Matrice des coefficients</strong></td><td>Matrice $A$ ($m \\times n$)</td><td>Matrice transposée $A^T$ ($n \\times m$)</td></tr>',
        '    <tr><td><strong>Coefficients économiques</strong></td><td>Vecteur coût $c$</td><td>Seconds membres $b$</td></tr>',
        '    <tr><td><strong>Seconds membres</strong></td><td>Vecteur ressources $b$</td><td>Vecteur coût $c$</td></tr>',
        '  </tbody>',
        '</table>',

        box('info', 'Règle d’or de transposition Primal-Dual', [
          '<p>La $i$-ème contrainte primale correspond à la $i$-ème variable duale $y_i$.<br>' +
          'La $j$-ème variable primale $x_j$ correspond à la $j$-ème contrainte duale.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Théorèmes fondamentaux & Prix d’Ombre',
      html: [
        '<p>La relation mathématique entre primal et dual est régie par trois théorèmes d’une importance capitale :</p>',

        box('standard', 'Les trois grands théorèmes de la dualité', [
          '<ul>',
          '  <li><strong>1. Théorème faible de la dualité</strong> : pour toute solution réalisable $x$ du primal et toute solution réalisable $y$ du dual :<br>' +
          '  $$Z(x) = c^T x \\le b^T y = W(y)$$<br>' +
          '  La valeur de tout plan primal réalisable est une borne inférieure pour le dual, et tout plan dual est un plafond pour le primal.</li>',
          '  <li><strong>2. Théorème fort de la dualité</strong> : si le primal admet une solution optimale finie $x^*$, alors le dual admet une solution optimale finie $y^*$ et :<br>' +
          '  $$Z(x^*) = W(y^*)$$<br>' +
          '  Le <em>gap de dualité</em> s’annule exactement à l’optimum !</li>',
          '  <li><strong>3. Théorème des écarts complémentaires (Karush-Kuhn-Tucker)</strong> : à l’optimum :<br>' +
          '  $$y_i^* \\times s_i^* = 0 \\quad \\text{et} \\quad x_j^* \\times e_j^* = 0$$</li>',
          '</ul>'
        ].join('\n')),

        box('tip', 'Interprétation managériale des Prix d’Ombre (Shadow Prices)', [
          '<p>La variable duale $y_i^*$ représente le <strong>prix d’ombre</strong> (ou valeur marginale) de la ressource $i$ :</p>',
          '$$y_i^* = \\frac{\\partial Z^*}{\\partial b_i}$$',
          '<p>C’est l’accroissement net du profit maximal $Z^*$ si l’entreprise parvient à acquérir <strong>une unité supplémentaire</strong> ' +
          'de la ressource $i$. Si la ressource est excédentaire ($s_i > 0$), son prix d’ombre est nul ($y_i = 0$) : payer pour en avoir plus ne rapporterait rien de plus !</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  questions: [
    {
      q: 'Pourquoi introduit-on des variables artificielles dans un problème de programmation linéaire ?',
      opts: [
        'Pour obtenir une base identité initiale quand l’origine (0, 0) n’est pas réalisable',
        'Pour accélérer la vitesse de calcul du processeur',
        'Pour transformer un problème non linéaire en problème linéaire',
        'Pour augmenter artificiellement le bénéfice de l’entreprise'
      ],
      correct: 0,
      exp: 'Les contraintes $\\ge$ et $=$ ne fournissent pas de variable d’écart positive pour démarrer le simplexe ; les artificielles comblent ce manque.'
    },
    {
      q: 'Quel est l’objectif mathématique poursuivi lors de la Phase 1 de la méthode des Deux Phases ?',
      opts: [
        'Minimiser la somme des variables artificielles (trouver Min W = ∑ a_i = 0)',
        'Maximiser la fonction objectif Z d’origine',
        'Éliminer toutes les variables d’écart',
        'Calculer le déterminant de la matrice'
      ],
      correct: 0,
      exp: 'La Phase 1 cherche à faire tomber toutes les variables artificielles à zéro pour atteindre un premier sommet réalisable.'
    },
    {
      q: 'Que conclut-on si, à la fin de la Phase 1 du simplexe, la valeur minimale obtenue pour W est strictement positive (Min W > 0) ?',
      opts: [
        'Le problème d’origine est irréalisable (le système de contraintes est contradictoire)',
        'Le problème est non borné',
        'La solution est dégénérée',
        'Il faut relancer la Phase 1 en changeant de pivot'
      ],
      correct: 0,
      exp: 'S’il est impossible d’annuler les variables artificielles, cela prouve qu’aucun point ne vérifie les contraintes réelles.'
    },
    {
      q: 'Si le programme primal est un MAX avec m contraintes et n variables, quelle est la structure de son programme dual canonique ?',
      opts: [
        'Un problème MIN avec n contraintes et m variables',
        'Un problème MAX avec m contraintes et n variables',
        'Un problème MIN avec m contraintes et m variables',
        'Un problème quadratique à n dimensions'
      ],
      correct: 0,
      exp: 'La dualité inverse le sens d’optimisation (MAX devient MIN) et transpose les dimensions ($m$ contraintes deviennent $m$ variables, $n$ variables deviennent $n$ contraintes).'
    },
    {
      q: 'D’après le théorème fort de la dualité, que vaut la valeur optimale de la fonction objectif duale W(y*) par rapport à l’optimum primal Z(x*) ?',
      opts: [
        'W(y*) = Z(x*) (égalité parfaite des valeurs optimales)',
        'W(y*) > Z(x*)',
        'W(y*) = 0',
        'W(y*) = -Z(x*)'
      ],
      correct: 0,
      exp: 'À l’optimum, le gap de dualité est nul : la valeur maximale du primal égale exactement la valeur minimale du dual.'
    },
    {
      q: 'Que stipule le théorème des écarts complémentaires si une ressource i est excédentaire à l’optimum (s_i* > 0) ?',
      opts: [
        'Son prix d’ombre dual associé est nul : y_i* = 0',
        'Son prix d’ombre dual est infini',
        'La contrainte est redondante et doit être effacée',
        'Le produit s_i* * y_i* vaut 1'
      ],
      correct: 0,
      exp: 'L’orthogonalité impose $s_i^* \\times y_i^* = 0$. Si une ressource n’est pas pleinement utilisée, disposer d’une unité supplémentaire n’apporte aucun gain marginal ($y_i^* = 0$).'
    },
    {
      q: 'Que représente concrètement pour un directeur d’usine le prix d’ombre (shadow price) d’une heure d’atelier de découpe ?',
      opts: [
        'Le montant maximal qu’il est économiquement rentable de payer pour obtenir une heure supplémentaire de découpe',
        'Le salaire horaire brut de l’ouvrier',
        'Le coût de maintenance de la machine',
        'La marge unitaire du produit le plus vendu'
      ],
      correct: 0,
      exp: 'Le prix d’ombre mesure le surcroît de profit apporté par une unité marginale de ressource.'
    },
    {
      q: 'Si le programme primal est non borné (Z → +∞), que peut-on affirmer sur son programme dual d’après le théorème faible de la dualité ?',
      opts: [
        'Le programme dual est irréalisable (aucun vecteur y ne satisfait les contraintes duales)',
        'Le programme dual est également non borné',
        'Le programme dual admet une infinité d’optimums',
        'Le programme dual vaut 0'
      ],
      correct: 0,
      exp: 'Puisque tout $y$ dual devrait être un plafond supérieur pour $Z$, si $Z \\to +\\infty$, aucun plafond fini ne peut exister, donc le dual est vide.'
    }
  ],

  pitfalls: [
    'Oublier de changer le sens de l’optimisation lors du passage au dual (conserver MAX au lieu de MIN).',
    'Conserver les colonnes des variables artificielles dans le tableau lors du passage de la Phase 1 à la Phase 2.',
    'Croire qu’une variable duale nulle ($y_i = 0$) signifie que la ressource n’a aucune valeur pour l’entreprise, alors que cela signifie seulement qu’elle n’est pas saturée.',
    'Transposer les coefficients sans transposer la matrice des contraintes ($A^T$).',
    'Confondre le théorème faible ($Z \\le W$) et le théorème fort ($Z^* = W^*$).'
  ],

  methodTitle: 'Protocole de construction du Dual canonique',
  method: [
    'S’assurer que le primal est sous forme canonique : MAX $Z = c^T x$ sous $A x \\le b$ avec $x \\ge 0$ (multiplier par $-1$ les contraintes $\\ge$ si besoin).',
    'Poser l’objectif dual opposé : MIN $W = b^T y$ où les coefficients de $W$ sont les seconds membres $b$ du primal.',
    'Associer une variable duale $y_i \\ge 0$ à chaque contrainte primale $i$.',
    'Construire les contraintes duales en transposant la matrice $A$ : la colonne $j$ de $A$ devient les coefficients de la contrainte duale $j$, et le second membre est le coût primal $c_j$.',
    'Poser les contraintes de signe duales : $y_i \\ge 0$ pour chaque variable duale.'
  ],

  summary: [
    'La Phase 1 minimise la somme des artificielles ($W = \\sum a_i$) pour trouver une première solution réalisable sans biais.',
    'Le Primal et le Dual sont deux faces de la même pièce : MAX $c^T x$ sous $A x \\le b \\iff$ MIN $b^T y$ sous $A^T y \\ge c$.',
    'Théorème fort : à l’optimum, $Z^* = c^T x^* = b^T y^* = W^*$ (gap de dualité nul).',
    'Écarts complémentaires : $y_i^* \\times s_i^* = 0$ (une ressource excédentaire a un prix d’ombre nul).',
    'Le prix d’ombre $y_i^* = \\frac{\\partial Z^*}{\\partial b_i}$ quantifie le gain marginal apporté par une unité de ressource supplémentaire.'
  ],

  checklist: [
    'Je sais expliquer le rôle des variables artificielles et le déroulement de la Phase 1.',
    'Je sais transposer immédiatement un problème Primal en problème Dual.',
    'Je maîtrise le théorème fort de la dualité et la signification du gap.',
    'Je sais appliquer les conditions d’écarts complémentaires pour valider l’optimalité.',
    'Je sais interpréter un prix d’ombre pour aider un décideur à allouer ses investissements.'
  ],

  notions: [
    'Variables artificielles',
    'Méthode des Deux Phases',
    'Programme Dual',
    'Théorème faible de la dualité',
    'Théorème fort de la dualité',
    'Écarts complémentaires (Slackness)',
    'Prix d’ombre (Shadow Price)',
    'Coût d’opportunité',
    'Transposition matricielle A^T',
    'Gap de dualité'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les règles de transposition primal-dual et le rôle des variables artificielles.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’interprétation économique des prix d’ombre.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les théorèmes de dualité et les écarts complémentaires.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux problèmes de transport et d’affectation au chapitre 5.' }
  ],

  flashcards: [
    { q: 'Pourquoi introduit-on des variables artificielles en Phase 1 ?', a: 'Pour obtenir une base de départ réalisable lorsque les contraintes sont en ≥ ou en = sans variables d’écart positives évidentes.' },
    { q: 'Quelle est la relation entre les valeurs optimales du Primal Z* et du Dual W* ?', a: 'D’après le théorème fort de la dualité, Z* = W* : à l’optimum, le gap de dualité est nul.' },
    { q: 'Que stipule le théorème des écarts complémentaires ?', a: 'Si une contrainte primale est lâche (ressource excédentaire s_i &gt; 0), son prix d’ombre dual associé est nul (y_i = 0).' },
    { q: 'Qu’est-ce qu’un prix d’ombre (shadow price) ?', a: 'C’est l’accroissement marginal de la fonction objectif Z obtenu si l’on dispose d’une unité supplémentaire de la ressource b_i.' },
    { q: 'Si le problème primal est non borné, que peut-on dire du dual ?', a: 'Le problème dual est impossible / irréalisable (aucun vecteur y ne satisfait l’ensemble des contraintes duales).' },
    { q: 'Comment s’écrit l’objectif du dual si le primal est MAX Z = c^T x sous A x ≤ b ?', a: 'MIN W = b^T y sous A^T y ≥ c avec y ≥ 0.' }
  ]
};

