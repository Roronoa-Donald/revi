/**
 * Chapitre 5 du cours « Recherche Opérationnelle » B2 — Problèmes de Transport & Affectation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Problèmes de Transport &amp; Affectation',
  short: 'Transport &amp; Affectation',
  toc: 'Matrice de transport équilibrée, méthodes du Coin Nord-Ouest et du Moindre Coût, optimisation MODI (u-v) et algorithme Hongrois.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un constructeur automobile alimente 4 concessions à partir de 3 usines d’assemblage réparties sur le territoire. ' +
    'Chaque usine a une capacité de production mensuelle fixe, et chaque concessionnaire formule une demande précise. ' +
    'Les coûts unitaires d’expédition diffèrent selon les distances autoroutières. ' +
    'Comment déterminer la grille d’acheminement qui minimise le budget logistique global sans rupture de stock ? ' +
    'Et dans le cas particulier de l’affectation unitaire où chaque développeur doit être assigné à un unique projet, ' +
    'comment l’élégant algorithme Hongrois trouve-t-il la bijection de coût minimal en quelques soustractions matricielles ?',

  objectives: [
    'modéliser un réseau d’approvisionnement sous forme de matrice de transport équilibrée ($\\sum O_i = \\sum D_j$) ;',
    'gérer un déséquilibre offre-demande par l’adjonction d’un entrepôt ou d’un client fictif à coût nul ;',
    'déterminer une solution de base réalisable initiale par la règle géométrique du Coin Nord-Ouest ;',
    'construire une solution initiale de meilleure qualité par la méthode économique du Moindre Coût ;',
    'calculer les potentiels de lignes et de colonnes par la méthode MODI ($u_i + v_j = c_{ij}$) pour évaluer l’optimalité ;',
    'comprendre le cycle du marchepied (stepping-stone) pour faire pivoter un flux vers une cellule améliorante ;',
    'exécuter l’algorithme Hongrois (Kuhn-Munkres) pour résoudre les problèmes d’affectation bijective minimale.'
  ],

  sections: [
    {
      title: 'Modélisation du Problème de Transport',
      html: [
        '<p>Le problème de transport est une classe spéciale de programmation linéaire où l’on achemine un produit homogène ' +
        'depuis $m$ origines (usines, entrepôts) vers $n$ destinations (clients, magasins) :</p>',

        box('formula', 'Formalisation mathématique du Problème de Transport', [
          '<div class="math-block">',
          '$$\\begin{aligned}',
          '\\text{MIN } & C = \\sum_{i=1}^{m} \\sum_{j=1}^{n} c_{ij} x_{ij} \\\\[6pt]',
          '\\text{sous } & \\sum_{j=1}^{n} x_{ij} = O_i \\quad (i = 1, \\dots, m) \\\\[6pt]',
          '& \\sum_{i=1}^{m} x_{ij} = D_j \\quad (j = 1, \\dots, n) \\\\[6pt]',
          '& x_{ij} \\ge 0 \\quad (\\forall i, j)',
          '\\end{aligned}$$',
          '</div>'
        ].join('\n')),

        box('info', 'Condition d’équilibre global', [
          '<p>Le problème est dit <strong>équilibré</strong> si la somme totale des capacités d’offre est égale ' +
          'à la somme totale des demandes : $\\sum_{i=1}^m O_i = \\sum_{j=1}^n D_j$.</p>',
          '<p>Si $\\sum O_i > \\sum D_j$ : on ajoute une <em>destination fictive</em> qui absorbe l’excédent d’offre à coût nul ($c_{i, fictif} = 0$).<br>' +
          'Si $\\sum D_j > \\sum O_i$ : on ajoute une <em>origine fictive</em> dont l’offre comble le déficit à coût nul ($c_{fictif, j} = 0$).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Méthodes heuristiques de Solution Initiale',
      html: [
        '<p>Pour initialiser le tableau de transport sans passer par le simplexe complet, deux méthodes classiques sont couramment employées :</p>',

        box('standard', '1. La règle du Coin Nord-Ouest (North-West Corner)', [
          '<p>Méthode purement positionnelle qui ignore complètement les coûts de transport :</p>',
          '<ol>',
          '  <li>On commence dans la cellule en haut à gauche $(1, 1)$.</li>',
          '  <li>On alloue le maximum possible : $x_{11} = \\min(O_1, D_1)$.</li>',
          '  <li>On déduit cette quantité de l’offre $O_1$ et de la demande $D_1$.</li>',
          '  <li>Si l’offre est épuisée, on descend à la ligne suivante ($i \\leftarrow i + 1$). Si la demande est satisfaite, on avance à la colonne suivante ($j \\leftarrow j + 1$).</li>',
          '  <li>On répète jusqu’à ce que toutes les cellules soient allouées ($m + n - 1$ variables de base).</li>',
          '</ol>'
        ].join('\n')),

        box('tip', '2. La méthode du Moindre Coût (Least Cost Method)', [
          '<p>Méthode économique plus intelligente :</p>',
          '<ol>',
          '  <li>Rechercher dans toute la matrice la cellule disponible $(i, j)$ qui affiche le <strong>coût unitaire $c_{ij}$ le plus bas</strong>.</li>',
          '  <li>Y allouer le flux maximal possible $q = \\min(O_i, D_j)$.</li>',
          '  <li>Rayer la ligne saturée ou la colonne satisfaite.</li>',
          '  <li>Réitérer sur la sous-matrice restante jusqu’à épuisement complet.</li>',
          '</ol>',
          '<p>Cette heuristique produit immédiatement un coût total très proche de l’optimum absolu.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Optimisation par la Méthode MODI (Potentiels u-v)',
      html: [
        '<p>Une fois la solution de base obtenue ($m + n - 1$ cellules occupées sans cycle), la <strong>méthode MODI (Modified Distribution)</strong> ' +
        'permet de tester si un réacheminement de flux peut encore réduire le coût total :</p>',

        box('formula', 'Méthode MODI (Potentiels $u_i$ et $v_j$)', [
          '<div class="box--formula">',
          '  <span class="formula-label">1. Équations de base pour les cases occupées ($x_{ij} > 0$)</span>',
          '  <div class="math-block">$$u_i + v_j = c_{ij}$$</div>',
          '  <p>On pose arbitrairement $u_1 = 0$ pour résoudre le système de $m + n - 1$ équations à $m + n$ inconnues.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">2. Coûts marginaux d’opportunité pour les cases vides</span>',
          '  <div class="math-block">$$\\Delta_{ij} = c_{ij} - (u_i + v_j)$$</div>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">3. Règle d’optimalité</span>',
          '  <p>Si tous les $\\Delta_{ij} \\ge 0$, le plan de transport est <strong>optimal</strong>. Si au moins un $\\Delta_{ij} < 0$, on réalloue un flux $\\theta$ via le cycle de marchepied (stepping-stone).</p>',
          '</div>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Le Problème d’Affectation & l’Algorithme Hongrois',
      html: [
        '<p>Le <strong>problème d’affectation</strong> est le cas particulier où $m = n$ et toutes les offres et demandes valent exactement 1 ' +
        '(une personne par tâche, une tâche par personne). Les variables valent $x_{ij} \\in \\{0, 1\\}$.</p>',

        box('info', 'Les étapes clés de l’algorithme Hongrois (Kuhn-Munkres)', [
          '<ol>',
          '  <li><strong>Réduction par ligne</strong> : identifier le minimum de chaque ligne et le soustraire à tous les éléments de la ligne (apparition d’au moins un 0 par ligne).</li>',
          '  <li><strong>Réduction par colonne</strong> : identifier le minimum de chaque colonne et le soustraire à tous les éléments de la colonne (apparition d’au moins un 0 par colonne).</li>',
          '  <li><strong>Couverture des zéros</strong> : tracer le nombre minimum de lignes horizontales et verticales pour couvrir tous les zéros de la matrice. Soit $k$ ce nombre.</li>',
          '  <li><strong>Test d’arrêt</strong> : si $k = n$, il existe une affectation optimale complète parmi les zéros indépendants. STOP.</li>',
          '  <li><strong>Ajustement matriciel</strong> : si $k < n$, trouver le plus petit élément non couvert $m$. Soustraire $m$ à tous les éléments non couverts et l’ajouter aux intersections des lignes de couverture. Retourner à l’étape 3.</li>',
          '</ol>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  questions: [
    {
      q: 'Dans un problème de transport équilibré avec m usines et n magasins, combien de cellules de base une solution réalisable non dégénérée doit-elle contenir ?',
      opts: [
        'm + n - 1 cellules',
        'm * n cellules',
        'm + n cellules',
        'm - n + 1 cellules'
      ],
      correct: 0,
      exp: 'Le nombre de contraintes indépendantes est $m + n - 1$ en raison de la redondance de l’équation d’équilibre global.'
    },
    {
      q: 'Que fait-on si la somme des offres des usines (1 200 unités) dépasse la somme des demandes des clients (1 000 unités) ?',
      opts: [
        'On ajoute une destination fictive ayant une demande de 200 unités avec des coûts de transport nuls (0 €)',
        'On refuse de résoudre le problème',
        'On réduit arbitrairement la capacité de la première usine',
        'On augmente les prix de transport de 20 %'
      ],
      correct: 0,
      exp: 'Une colonne fictive à coût nul absorbe l’excédent de production sans biaiser les coûts réels.'
    },
    {
      q: 'Quel est l’inconvénient majeur de la méthode du Coin Nord-Ouest par rapport à la méthode du Moindre Coût ?',
      opts: [
        'Elle ignore totalement les coûts de transport c_ij et peut attribuer de gros volumes aux liaisons les plus chères',
        'Elle ne garantit pas la faisabilité de la solution',
        'Elle crée des divisions par zéro',
        'Elle ne fonctionne que pour les matrices carrées'
      ],
      correct: 0,
      exp: 'Le Coin Nord-Ouest ne regarde que la position dans la matrice, conduisant souvent à une solution initiale coûteuse.'
    },
    {
      q: 'Dans la méthode MODI, quelle équation lie les potentiels u_i et v_j aux coûts c_ij pour les cases occupées de la base ?',
      opts: [
        'u_i + v_j = c_ij',
        'u_i * v_j = c_ij',
        'u_i - v_j = c_ij',
        'u_i + v_j = 0'
      ],
      correct: 0,
      exp: 'Pour chaque case de base, la somme des potentiels de ligne et de colonne égale exactement le coût unitaire de transport.'
    },
    {
      q: 'À quelle condition une solution de transport est-elle déclarée optimale selon la méthode MODI ?',
      opts: [
        'Lorsque tous les coûts marginaux Δ_ij = c_ij - (u_i + v_j) des cases vides sont positifs ou nuls (≥ 0)',
        'Lorsque tous les potentiels u_i sont négatifs',
        'Lorsque le coût total est strictement égal à 0',
        'Quand toutes les cellules de la matrice sont remplies'
      ],
      correct: 0,
      exp: 'Si tous les $\\Delta_{ij} \\ge 0$, aucune réallocation le long d’un cycle ne peut faire baisser le coût total.'
    },
    {
      q: 'Comment s’appelle la première étape de l’algorithme Hongrois pour le problème d’affectation ?',
      opts: [
        'La réduction des lignes (soustraire le minimum de chaque ligne)',
        'L’inversion de la matrice de covariance',
        'Le calcul du déterminant de Vandermonde',
        'La triangulation de Cholesky'
      ],
      correct: 0,
      exp: 'On commence par soustraire le plus petit coût de chaque ligne afin de créer au moins un zéro par ligne sans changer les écarts relatifs.'
    },
    {
      q: 'Dans l’algorithme Hongrois pour une matrice 4×4, que conclut-on si l’on peut recouvrir l’ensemble des zéros avec seulement 3 lignes ?',
      opts: [
        'L’affectation n’est pas encore optimale, il faut effectuer un ajustement matriciel',
        'La solution optimale est déjà trouvée',
        'Le problème n’a aucune solution bijective',
        'Il faut permuter les colonnes'
      ],
      correct: 0,
      exp: 'Il faut un nombre de lignes de couverture égal à la dimension de la matrice ($k = n = 4$) pour pouvoir extraire 4 zéros indépendants.'
    },
    {
      q: 'Quelle est la complexité théorique de l’algorithme Hongrois pour affecter n personnes à n postes ?',
      opts: [
        'Polynomiale en O(n³)',
        'Exponentielle en O(n!)',
        'Linéaire en O(n)',
        'Logarithmique en O(log n)'
      ],
      correct: 0,
      exp: 'L’algorithme de Kuhn-Munkres résout l’affectation en temps polynomial $O(n^3)$, évitant la recherche exhaustive parmi les $n!$ permutations.'
    }
  ],

  pitfalls: [
    'Oublier de vérifier l’équilibre offre-demande avant de lancer le Coin Nord-Ouest.',
    'Construire un cycle de marchepied (stepping-stone) qui ne comporte pas exactement des angles droits sur des cellules de base.',
    'Confondre le coût marginal $\\Delta_{ij} = c_{ij} - (u_i + v_j)$ avec le coût réel $c_{ij}$.',
    'Dans l’algorithme Hongrois, soustraire le minimum de colonne avant d’avoir terminé la réduction par ligne.',
    'Ajouter $m$ au lieu de le soustraire lors de l’ajustement des cellules non couvertes dans l’algorithme Hongrois.'
  ],

  methodTitle: 'Protocole de résolution d’un problème de transport par MODI',
  method: [
    'Vérifier que le problème est équilibré ($\\sum O_i = \\sum D_j$) ou ajouter une ligne/colonne fictive à coût nul.',
    'Déterminer une solution de base réalisable initiale de $m + n - 1$ flux par la méthode du Moindre Coût.',
    'Poser $u_1 = 0$, puis résoudre le système $u_i + v_j = c_{ij}$ sur l’ensemble des cases de base pour trouver tous les potentiels.',
    'Calculer $\\Delta_{ij} = c_{ij} - (u_i + v_j)$ sur toutes les cases vides. Si tous les $\\Delta_{ij} \\ge 0$, la solution est optimale.',
    'Si le plus petit $\\Delta_{ij} < 0$, tracer son cycle de marchepied unique, réallouer le flux maximal $\\theta$, et recalculer les potentiels.'
  ],

  summary: [
    'Le problème de transport est équilibré si $\\sum O_i = \\sum D_j$. Sinon, on crée une entité fictive à coût nul.',
    'Une solution de base compte exactement $m + n - 1$ cellules occupées sans former de boucle fermée.',
    'La méthode du Moindre Coût alloue prioritairement les flux aux liaisons les moins chères.',
    'La méthode MODI utilise les potentiels $u_i + v_j = c_{ij}$ pour évaluer les coûts marginaux $\\Delta_{ij} = c_{ij} - u_i - v_j$.',
    'L’algorithme Hongrois résout l’affectation $n \\times n$ en $O(n^3)$ par réductions successives des lignes et colonnes.'
  ],

  checklist: [
    'Je sais vérifier l’équilibre d’un tableau de transport et introduire une ligne/colonne fictive.',
    'Je sais dérouler la méthode du Coin Nord-Ouest et celle du Moindre Coût.',
    'Je sais poser et résoudre les équations des potentiels $u_i + v_j = c_{ij}$.',
    'Je sais calculer les coûts réduits $\\Delta_{ij}$ pour prouver l’optimalité.',
    'Je sais dérouler les 5 étapes de l’algorithme Hongrois sur une matrice d’affectation.'
  ],

  notions: [
    'Problème de transport',
    'Matrice équilibrée',
    'Origine / Destination fictive',
    'Coin Nord-Ouest (NWC)',
    'Moindre Coût (LCM)',
    'Méthode MODI (u-v)',
    'Cycle du marchepied (Stepping-stone)',
    'Problème d’affectation',
    'Algorithme Hongrois (Kuhn-Munkres)',
    'Potentiels duaux'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois le principe d’équilibrage offre/demande et la méthode du Coin Nord-Ouest.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le calcul des potentiels duaux u_i et v_j dans la méthode MODI.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises le critère d’optimalité et les réductions de l’algorithme Hongrois.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux graphes, flots et ordonnancement au chapitre 6.' }
  ],

  flashcards: [
    { q: 'Combien de variables de base comporte une solution réalisable d’un tableau m x n de transport ?', a: 'Exactement m + n - 1 cases occupées sans cycle fermé.' },
    { q: 'Comment équilibrer un problème où l’offre totale dépasse la demande totale ?', a: 'En ajoutant une destination fictive absorbant le surplus à coût de transport nul (c_ij = 0).' },
    { q: 'Quelle est la relation liant les potentiels duaux aux coûts réels des cases occupées dans MODI ?', a: 'u_i + v_j = c_ij pour toute case occupée (de base).' },
    { q: 'Quelle est la condition d’optimalité de la méthode MODI ?', a: 'Tous les coûts réduits &Delta;_ij = c_ij - (u_i + v_j) des cases vides doivent être positifs ou nuls (&ge; 0).' },
    { q: 'Quel est l’objectif de la méthode du Moindre Coût par rapport au Coin Nord-Ouest ?', a: 'Allouer en priorité les capacités aux cases aux coûts unitaires les plus bas pour démarrer plus près de l’optimum.' },
    { q: 'Quelle est la complexité temporelle de l’algorithme Hongrois pour n agents et n tâches ?', a: 'O(n³), ce qui permet de résoudre des affectations à grande échelle sans tester les n! permutations.' }
  ]
};

