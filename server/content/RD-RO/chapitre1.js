/**
 * Chapitre 1 du cours « Recherche Opérationnelle » B2 — Fondements, Variables & Modélisation.
 * Refonte pédagogique intégrale : alignement rigoureux des objectifs, des explications,
 * des 4 hypothèses fondamentales, des contraintes d'égalité, et QCM à 10 questions.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements, Variables &amp; Modélisation Linéaire',
  short: 'Fondements &amp; Modélisation',
  toc: 'Origines de la RO, variables de décision, fonction objectif, contraintes de ressources, d’égalité et formalisation canonique d’un programme linéaire.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Une menuiserie industrielle fabrique des tables et des chaises à partir de bois de chêne et d’heures d’assemblage limitées. ' +
    'Chaque table rapporte 50 € de marge et consomme 3 m² de bois et 2 heures d’ouvrier. Chaque chaise rapporte 30 € de marge ' +
    'et consomme 1 m² de bois et 2 heures d’ouvrier. L’entreprise dispose de 90 m² de bois et 80 heures par semaine. ' +
    'Faut-il fabriquer uniquement des tables ? Uniquement des chaises ? Un mélange des deux ? ' +
    'L’intuition humaine échoue dès que les contraintes se multiplient : seule la modélisation mathématique rigoureuse ' +
    'permet de prouver scientifiquement quelle décision garantit le profit maximal absolu.',

  objectives: [
    'définir avec exactitude la discipline de la Recherche Opérationnelle et son rôle stratégique dans l’aide à la décision ;',
    'identifier sans ambiguïté les variables de décision et leurs unités physiques en posant impérativement $x_j \\ge 0$ ;',
    'construire la fonction objectif économique $Z$ (maximisation de profit ou minimisation de coût) en distinguant coefficients et variables ;',
    'traduire des contraintes textuelles en inéquations linéaires de ressources ($\\le$), d’exigences ($\\ge$) et d’engagements contractuels fermes ($=$) ;',
    'valider les quatre hypothèses fondamentales de la programmation linéaire (proportionnalité, additivité, divisibilité, certitude) et distinguer PL continue et PLNE (variables binaires/entières).'
  ],

  sections: [
    {
      title: 'Qu’est-ce que la Recherche Opérationnelle ?',
      html: [
        '<p>La <strong>Recherche Opérationnelle (RO)</strong> est l’ensemble des méthodes et techniques scientifiques ' +
        '(principalement mathématiques, statistiques et algorithmiques) qui permettent d’optimiser le fonctionnement des systèmes ' +
        'et de prendre les <strong>meilleures décisions possibles</strong> en présence de ressources limitées.</p>',

        box('info', 'Les trois repères historiques fondateurs', [
          '<ul>',
          '  <li><strong>1913 — Formule du lot économique de Wilson-Harris</strong> : première formalisation mathématique de gestion optimale des stocks industriels, arbitrant entre coût de commande et coût de possession.</li>',
          '  <li><strong>1940-1945 — La Seconde Guerre mondiale</strong> : des équipes pluridisciplinaires britanniques (Patrick Blackett) et américaines déploient des modèles mathématiques pour optimiser l’implantation des radars, la taille des convois maritimes et l’acheminement logistique.</li>',
          '  <li><strong>1947 — George Dantzig et le Simplexe</strong> : invention de l’algorithme du simplexe aux États-Unis, qui révolutionne la résolution numérique des programmes linéaires et ouvre l’ère de l’optimisation industrielle assistée par ordinateur.</li>',
          '</ul>'
        ].join('\n')),

        '<p>Aujourd’hui, la RO pilote les plans de vol des compagnies aériennes, la distribution des colis dans les réseaux logistiques, ' +
        'la planification du personnel hospitalier, l’affectation des fréquences 5G et la gestion des chaînes de production de semi-conducteurs.</p>'
      ].join('\n')
    },
    {
      title: 'Composants fondamentaux d’un Programme Linéaire (PL)',
      html: [
        '<p>Tout problème de programmation linéaire repose sur une structure mathématique universelle articulée autour de quatre piliers :</p>',

        box('formula', 'Structure mathématique canonique d’un Programme Linéaire (PL)', [
          '<div class="math-block">',
          '$$\\begin{aligned}',
          '\\text{Optimiser (MAX ou MIN) } & Z = \\sum_{j=1}^{n} c_j x_j = c_1 x_1 + c_2 x_2 + \\dots + c_n x_n \\\\[6pt]',
          '\\text{Sous les contraintes de ressources (plafonds) : } & \\sum_{j=1}^{n} a_{ij} x_j \\le b_i \\quad (i \\in I_{\\le}) \\\\[6pt]',
          '\\text{Sous les contraintes d’exigences (seuils minimaux) : } & \\sum_{j=1}^{n} a_{kj} x_j \\ge b_k \\quad (k \\in I_{\\ge}) \\\\[6pt]',
          '\\text{Sous les contraintes d’équilibre strict (égalités) : } & \\sum_{j=1}^{n} a_{lj} x_j = b_l \\quad (l \\in I_{=}) \\\\[6pt]',
          '\\text{Contraintes impératives de non-négativité : } & x_j \\ge 0 \\quad (j = 1, \\dots, n)',
          '\\end{aligned}$$',
          '</div>'
        ].join('\n')),

        box('standard', 'Analyse détaillée des composantes', [
          '<ul>',
          '  <li><strong>Les variables de décision ($x_j$)</strong> : ce sont les grandeurs physiques contrôlables dont l’analyste cherche la valeur optimale (ex. nombre de tables produites/semaine, tonnes d’engrais/hectare). Chaque variable doit impérativement avoir une unité physique explicite.</li>',
          '  <li><strong>Les coefficients économiques ($c_j$)</strong> : grandeurs fixes exogènes représentant la marge contributive unitaire (en MAX) ou le coût marginal d’acquisition (en MIN).</li>',
          '  <li><strong>La fonction objectif ($Z$)</strong> : critère scalaire mesurant la performance globale du plan. Attention : évaluer la valeur de $Z$ pour un plan candidat donné est un simple calcul arithmétique ; <em>déterminer l’optimum</em> (le meilleur $Z$ réalisable) est un problème algorithmique d’optimisation globale.</li>',
          '  <li><strong>Les contraintes technologiques</strong> : limitations physiques (disponibilité d’une machine $\\le$), engagements minimaux (taux de service contractuel $\\ge$) ou obligations fermes d’équilibre ($=$).</li>',
          '  <li><strong>La non-négativité ($x_j \\ge 0$)</strong> : obligation physique universelle (on ne peut fabriquer $-5$ chaises ni rouler $-120$ km). La valeur $x_j = 0$ est parfaitement valide et signifie que l’activité n’est pas mise en œuvre.</li>',
          '</ul>'
        ].join('\n')),

        box('formula', 'Les 4 hypothèses fondamentales de Dantzig', [
          '<p>Pour qu’un problème puisse être résolu par les méthodes de la programmation linéaire classique, quatre hypothèses doivent être simultanément vérifiées :</p>',
          '<table class="table">',
          '  <thead><tr><th>Hypothèse</th><th>Définition mathématique</th><th>Exemple de violation industrielle</th></tr></thead>',
          '  <tbody>',
          '    <tr><td><strong>1. Proportionnalité</strong></td><td>La contribution de chaque variable est strictement linéaire ($c_j x_j$ et $a_{ij} x_j$). Le coût ou rendement unitaire est constant.</td><td>Remise sur volume accordée par un fournisseur au-delà d’un seuil, ou coût fixe d’allumage d’une machine.</td></tr>',
          '    <tr><td><strong>2. Additivité</strong></td><td>La valeur globale est la somme exacte des contributions individuelles, sans terme croisé ($x_1 \\cdot x_2$ proscrit).</td><td>Synergie marketing entre deux produits ou réaction chimique exothermique conjointe.</td></tr>',
          '    <tr><td><strong>3. Divisibilité</strong></td><td>Les variables de décision sont continues et peuvent prendre toute valeur réelle positive ($x_j \\in \\mathbb{R}^+$).</td><td>Production de cargos ou d’avions (unités indivisibles) nécessitant des variables entières.</td></tr>',
          '    <tr><td><strong>4. Certitude</strong></td><td>Tous les coefficients ($c_j, a_{ij}, b_i$) sont connus avec certitude de façon déterministe.</td><td>Prix d’achat fluctuant selon la météo ou pannes aléatoires de machines (optimisation stochastique).</td></tr>',
          '  </tbody>',
          '</table>'
        ].join('\n')),

        box('pitfall', 'Frontière essentielle : PL continue versus PLNE (variables binaires)', [
          '<p>Lorsque l’hypothèse de divisibilité n’est pas respectée, le modèle change de nature mathématique :</p>',
          '<ul>',
          '  <li><strong>Programmation Linéaire continue (PL)</strong> : $x_j \\in \\mathbb{R}^+$. Le domaine réalisable est un polyèdre convexe continu. L’algorithme du simplexe trouve l’optimum en temps polynomial en pratique.</li>',
          '  <li><strong>Programmation Linéaire en Nombres Entiers (PLNE / MIP)</strong> : $x_j \\in \\mathbb{N}$ ou variables binaires $x_j \\in \\{0, 1\\}$ (ex. décision d’ouvrir ou non un entrepôt). Le domaine réalisable devient un ensemble discret de points isolés : la convexité est détruite. Le simplexe continu ne peut pas être appliqué directement ; il faut recourir à des algorithmes de séparation et évaluation (<em>Branch &amp; Bound</em>), le problème étant NP-difficile.</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Protocole de modélisation pas à pas (Les 4 étapes)',
      html: [
        '<p>Pour traduire un énoncé verbal en programme linéaire sans commettre d’erreur de modélisation, ' +
        'l’analyste applique systématiquement une démarche en quatre étapes séquentielles :</p>',

        '<table class="table">',
        '  <thead><tr><th>Étape</th><th>Question clé</th><th>Opération mathématique</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Définition des variables</strong></td><td>Quelles sont les décisions quantifiables à prendre ?</td><td>Nommer chaque $x_j$ et préciser son <strong>unité physique exacte</strong> (ex. $x_1$ = nombre de tables produites par semaine).</td></tr>',
        '    <tr><td><strong>2. Fonction objectif</strong></td><td>Quel est le critère d’évaluation global ?</td><td>Écrire $MAX \\ Z = \\sum c_j x_j$ (maximisation de profit/marge) ou $MIN \\ C = \\sum c_j x_j$ (minimisation de coût/perte).</td></tr>',
        '    <tr><td><strong>3. Recensement des contraintes</strong></td><td>Quelles ressources, normes ou contrats limitent mes choix ?</td><td>Poser une équation ou inéquation par ressource limitée ($\\le$), par exigence minimale ($\\ge$) et par engagement strict ($=$).</td></tr>',
        '    <tr><td><strong>4. Contraintes de positivité</strong></td><td>Les grandeurs physiques ont-elles un sens négatif ?</td><td>Poser explicitement $x_j \\ge 0$ pour chacune des $n$ variables de décision.</td></tr>',
        '  </tbody>',
        '</table>',

        box('tip', 'Exemple d’application : l’atelier du menuisier', [
          '<p><strong>Énoncé :</strong> Un atelier fabrique des tables ($x_1$) et des chaises ($x_2$). Chaque table rapporte 50 € de marge et consomme 3 m² de bois et 2 h de main-d’œuvre. Chaque chaise rapporte 30 € de marge et consomme 1 m² de bois et 2 h de main-d’œuvre. Disponibilités hebdomadaires : 90 m² de bois et 80 h d’ouvrier.</p>',
          '<p><strong>Modèle formel :</strong></p>',
          '$$\\begin{aligned}',
          '\\text{MAX } Z &= 50 x_1 + 30 x_2 \\\\[4pt]',
          '\\text{sous } & 3 x_1 + 1 x_2 \\le 90 \\quad (\\text{Bois en m}^2) \\\\[4pt]',
          '& 2 x_1 + 2 x_2 \\le 80 \\quad (\\text{Main-d’œuvre en heures}) \\\\[4pt]',
          '& x_1 \\ge 0, \\quad x_2 \\ge 0',
          '\\end{aligned}$$',
          '<p>Pour tout plan candidat $(x_1, x_2)$, l’<strong>écart</strong> (slack) sur chaque ressource vaut $s_i = b_i - \\text{consommation}_i$. Si $s_i = 0$, la ressource est saturée (pleinement exploitée) ; si $s_i > 0$, il subsiste une marge inemployée ; si $s_i < 0$, la capacité est dépassée (plan irréalisable).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Grandes familles de problèmes linéaires',
      html: [
        '<p>La quasi-totalité des applications industrielles de la programmation linéaire se rattache à trois grandes familles canoniques :</p>',

        box('standard', 'Les trois grandes familles de modèles industriels', [
          '<div class="box--formula">',
          '  <span class="formula-label">1. Problème de Mix de Production (Allocation de ressources)</span>',
          '  <div class="math-block">$$\\text{MAX } Z = \\sum_{j=1}^{n} c_j x_j \\quad \\text{sous } \\sum_{j=1}^{n} a_{ij} x_j \\le b_i \\quad (x_j \\ge 0)$$</div>',
          '  <p>Maximiser la marge contributive totale sous contraintes de capacités plafonnées de machines, de stocks de matières premières et d’heures d’atelier.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">2. Problème de Mélange (Blending — Chimie, Alimentation, Métallurgie)</span>',
          '  <div class="math-block">$$\\text{MIN } C = \\sum_{j=1}^{n} c_j x_j \\quad \\text{sous } \\sum_{j=1}^{n} a_{ij} x_j \\ge b_i \\quad (x_j \\ge 0)$$</div>',
          '  <p>Minimiser le coût d’achat d’ingrédients tout en garantissant des apports nutritionnels minimaux ou des seuils de pureté contractuels.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">3. Problème d’Équilibre de Flux et d’Engagement Strict</span>',
          '  <div class="math-block">$$\\text{MIN ou MAX } Z = \\sum c_j x_j \\quad \\text{sous } \\sum a_{ij} x_j = b_i \\quad (x_j \\ge 0)$$</div>',
          '  <p>Imposer une égalité stricte pour des équilibres matière (entrée = sortie), des quotas contractuels fixes ou des proportions rigides d’assemblage.</p>',
          '</div>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  questions: [
    {
      q: 'Quel mathématicien américain a inventé l’algorithme du simplexe en 1947 ?',
      opts: [
        'George Dantzig',
        'John von Neumann',
        'Alan Turing',
        'Claude Shannon'
      ],
      correct: 0,
      exp: 'George Dantzig a formalisé la programmation linéaire et publié l’algorithme du simplexe en 1947. John von Neumann a prouvé le théorème du minimax en théorie des jeux et formalisé la dualité forte, Alan Turing est le pionnier de l’informatique théorique et du cassage d’Enigma, et Claude Shannon est le père de la théorie de l’information.'
    },
    {
      q: 'Dans un problème de programmation linéaire standard continu, quelle condition impérative doit toujours être posée sur les variables physiques de décision ?',
      opts: [
        'x_j ≥ 0 (non-négativité)',
        'x_j ≤ 1 (normalisation)',
        'x_j ∈ ℤ (variables entières obligatoires)',
        'x_j = 0 (tous les choix à zéro)'
      ],
      correct: 0,
      exp: 'La règle de non-négativité ($x_j \\ge 0$) est une condition universelle : les grandeurs physiques réelles (volumes, durées, unités fabriquées) sont nécessairement positives ou nulles. La contrainte $x_j \\le 1$ est spécifique aux variables binaires de choix logique, $x_j \\in \\mathbb{Z}$ caractérise la programmation en nombres entiers (PLNE), et poser $x_j = 0$ supprimerait toute liberté d’action.'
    },
    {
      q: 'Quelle expression mathématique est NON LINÉAIRE et donc formellement interdite dans un programme linéaire classique ?',
      opts: [
        '3*x1 + 4*x1*x2',
        '5*x1 - 2*x2',
        '0.5*x1 + 10',
        'x1 + x2 + x3'
      ],
      correct: 0,
      exp: 'Le produit croisé de deux variables de décision ($x_1 \\cdot x_2$) est un terme bilinéaire quadratique qui détruit la propriété de proportionnalité et d’additivité. Les autres expressions sont toutes des combinaisons linéaires d’ordre 1 parfaitement admises.'
    },
    {
      q: 'Dans un problème de mélange (blending) où l’on cherche à satisfaire des teneurs nutritionnelles minimales, quel est le sens naturel des contraintes ?',
      opts: [
        '≥ (supérieur ou égal au seuil minimal requis)',
        '≤ (inférieur ou égal à la capacité maximale)',
        '= (égalité exacte sans tolérance)',
        '≠ (différent de zéro)'
      ],
      correct: 0,
      exp: 'Un apport nutritionnel ou un seuil de qualité minimale impose d’apporter au moins une quantité spécifiée, ce qui se traduit par l’opérateur $\\ge$. L’opérateur $\\le$ s’applique aux capacités limitées de ressources, $=$ aux équilibres stricts, et $\\ne$ définit un ensemble non convexe interdit en programmation linéaire.'
    },
    {
      q: 'Dans le problème du menuisier (3*x1 + 1*x2 ≤ 90), si le plan candidat est x1 = 20 tables et x2 = 10 chaises, quelle est la consommation de bois ?',
      opts: [
        '70 m²',
        '90 m²',
        '80 m²',
        '60 m²'
      ],
      correct: 0,
      exp: 'La consommation vaut 3 * 20 + 1 * 10 = 60 + 10 = 70 m², laissant une marge inemployée (slack) de s1 = 90 - 70 = 20 m². 90 m² correspond à la capacité plafond totale, 80 h à la capacité de main-d’œuvre, et 60 m² à la part consommée par les tables seules.'
    },
    {
      q: 'Comment qualifie-t-on une solution (x1, x2) qui respecte l’ensemble des contraintes du modèle ainsi que la non-négativité ?',
      opts: [
        'Une solution réalisable (feasible)',
        'Une solution optimale',
        'Une solution dégénérée',
        'Une solution duale'
      ],
      correct: 0,
      exp: 'Une solution réalisable se situe à l’intérieur ou sur la frontière du polyèdre des contraintes. Une solution optimale est la solution réalisable qui atteint la meilleure valeur de Z. Une solution dégénérée comporte une variable de base nulle, et une solution duale appartient au problème dual associé.'
    },
    {
      q: 'Quel est l’objectif économique fondamental d’un problème de mix de production industriel ?',
      opts: [
        'Maximiser la marge contributive totale (profit sur coûts variables)',
        'Minimiser le nombre de machines mobilisées',
        'Égaliser les temps de travail sur tous les postes',
        'Maximiser le volume des stocks résiduels'
      ],
      correct: 0,
      exp: 'L’objectif premier du mix de production est d’allouer les ressources disponibles pour maximiser la marge sur coût variable générée par les ventes. Minimiser les machines ou équilibrer les temps relève de l’ordonnancement d’atelier, et accumuler des stocks résiduels est économiquement néfaste.'
    },
    {
      q: 'Quelle hypothèse fondamentale garantit que doubler le niveau d’une activité double exactement sa consommation de ressources et son apport au profit ?',
      opts: [
        'L’hypothèse de proportionnalité',
        'L’hypothèse de convexité',
        'L’hypothèse de séparabilité',
        'L’hypothèse d’élasticité'
      ],
      correct: 0,
      exp: 'La proportionnalité stipule que la contribution de chaque variable est strictement linéaire et proportionnelle à sa valeur, sans économie d’échelle ni coût fixe de lancement. La convexité est une propriété géométrique du domaine réalisable, et l’élasticité est un concept microéconomique.'
    },
    {
      q: 'Dans quel cas doit-on modéliser une contrainte par une égalité stricte (=) plutôt que par une inéquation (≤ ou ≥) ?',
      opts: [
        'Pour imposer un quota ferme de livraison contractuelle ou un bilan strict de conservation de flux',
        'Pour forcer la fonction objectif à atteindre son maximum absolu',
        'Lorsque le nombre de variables est supérieur au nombre de contraintes',
        'Pour contraindre les variables de décision à devenir des nombres entiers'
      ],
      correct: 0,
      exp: 'Une contrainte d’égalité (=) s’impose lorsque la réalité physique ou contractuelle interdit tout excédent et tout déficit (ex. conservation de matière : flux entrant = flux sortant, ou commande ferme imposant exactement 50 unités livrées). Elle ne garantit en rien l’optimalité de Z, n’a aucun rapport avec le ratio variables/contraintes, et ne force nullement les variables à être entières.'
    },
    {
      q: 'Pourquoi l’introduction de variables de décision binaires (xj ∈ {0, 1}) empêche-t-elle l’utilisation directe de l’algorithme du simplexe standard ?',
      opts: [
        'Parce que le domaine réalisable devient un ensemble fini de points isolés (discret et non convexe), brisant la continuité des arêtes du polyèdre',
        'Parce qu’une variable binaire ne peut jamais être positive ou nulle',
        'Parce que le calcul de la fonction objectif devient obligatoirement non linéaire',
        'Parce que George Dantzig a interdit l’utilisation de nombres entiers dans son théorème de 1947'
      ],
      correct: 0,
      exp: 'Le simplexe repose sur la convexité du polyèdre continu et parcourt ses arêtes sommet par sommet. Restreindre les variables à {0, 1} détruit la convexité et transforme le problème en optimisation combinatoire discrète (PLNE / MIP), requérant des algorithmes de séparation et évaluation (Branch & Bound).'
    }
  ],

  pitfalls: [
    'Oublier de poser explicitement les contraintes de non-négativité ($x_j \\ge 0$) dans le modèle mathématique.',
    'Mélanger les unités physiques dans une même contrainte (par exemple additionner des minutes et des heures).',
    'Introduire des non-linéarités en voulant modéliser des coûts fixes par des produits de variables sans variables binaires.',
    'Confondre le sens d’une contrainte de ressource (disponibilité $\\le$) et d’une contrainte d’engagement (minimum contractuel $\\ge$).',
    'Considérer une solution réalisable quelconque comme étant la solution optimale.',
    'Confondre la programmation linéaire continue standard avec la programmation en nombres entiers (PLNE) lors de choix discrets.'
  ],

  methodTitle: 'Protocole en 4 étapes pour modéliser tout énoncé de RO',
  method: [
    'Lire attentivement l’énoncé et repérer les questions finales : chaque décision à quantifier devient une variable $x_j$ avec son unité.',
    'Identifier l’objectif économique global : isoler les gains unitaires pour poser $\\text{MAX } Z$ ou les coûts unitaires pour poser $\\text{MIN } C$.',
    'Dresser un tableau des ressources : identifier les plafonds disponibles ($\\le$), les exigences minimales ($\\ge$) et les équilibres stricts ($=$), puis poser les équations.',
    'Vérifier l’homogénéité dimensionnelle de chaque équation (les deux membres doivent avoir la même unité) et conclure par $x_j \\ge 0$.'
  ],

  summary: [
    'La Recherche Opérationnelle aide à la décision scientifique en optimisant une fonction économique sous contraintes réelles.',
    'Un Programme Linéaire comprend : des variables de décision $x_j$ munies d’unités, une fonction objectif $Z$, des contraintes ($\\le, \\ge, =$) et $x_j \\ge 0$.',
    'Les 4 hypothèses fondamentales sont la proportionnalité, l’additivité, la divisibilité et la certitude des paramètres.',
    'Les contraintes de ressources disponibles utilisent l’opérateur $\\le$ ; les exigences de demande minimale utilisent $\\ge$ ; les quotas stricts utilisent $=$.',
    'Toute modélisation rigoureuse débute par la définition explicite de chaque variable en français avec son unité physique.'
  ],

  checklist: [
    'Je sais expliquer ce qu’est la Recherche Opérationnelle et son origine avec George Dantzig en 1947.',
    'Je sais identifier et nommer les variables de décision dans un problème de gestion en précisant leurs unités physiques.',
    'Je sais formaliser la fonction objectif et distinguer MAX (profit) et MIN (coût).',
    'Je sais traduire des limitations d’heures ou de matières en contraintes $\\le$, des besoins en $\\ge$, et des quotas stricts en $=$.',
    'Je n’oublie jamais les contraintes de positivité $x_j \\ge 0$.',
    'Je sais vérifier les 4 hypothèses de linéarité et reconnaître quand un problème nécessite des variables entières/binaires (PLNE).'
  ],

  notions: [
    'Recherche Opérationnelle',
    'Variables de décision',
    'Fonction objectif Z',
    'Contraintes de ressources',
    'Contraintes de demande',
    'Contraintes d’égalité',
    'Non-négativité',
    'Programme Linéaire',
    'George Dantzig',
    'Proportionnalité',
    'Région réalisable',
    'PLNE et variables binaires'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les définitions de variables de décision, la règle de positivité et les 4 étapes de modélisation.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à formaliser les inéquations de ressources, les contraintes d’égalité et le calcul de la fonction objectif.' },
    { cls: 'good', text: '70–94 % — Solide : tu maîtrises les fondamentaux de la modélisation de programmes linéaires et les 4 hypothèses de Dantzig.' },
    { cls: 'top', text: '≥ 95 % — Parfait (10/10) : passe aux formes canoniques, standards et à la résolution graphique au chapitre 2.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce que la Recherche Opérationnelle ?', a: 'Une discipline scientifique appliquant des méthodes mathématiques et algorithmiques pour optimiser la prise de décision face à des ressources limitées.' },
    { q: 'Qu’est-ce qu’une variable de décision ?', a: 'Une quantité contrôlable inconnue (ex. unités produites/jour) dont on cherche la valeur optimale ($x_j \\ge 0$).' },
    { q: 'Quelle est la différence entre fonction objectif et contrainte ?', a: 'La fonction objectif mesure le critère de performance globale (profit ou coût), tandis que les contraintes délimitent ce qui est physiquement ou contractuellement possible.' },
    { q: 'Pourquoi la non-négativité (x_j ≥ 0) est-elle indispensable ?', a: 'Parce que les grandeurs physiques réelles (objets, heures, surfaces) ne peuvent pas être négatives.' },
    { q: 'Quelles sont les 4 hypothèses fondamentales d’un programme linéaire ?', a: 'La proportionnalité, l’additivité, la divisibilité des variables et la certitude des coefficients.' },
    { q: 'Quelle est la conséquence de variables binaires {0, 1} sur la résolution ?', a: 'Le domaine devient discret et non convexe (PLNE) : le simplexe continu ne s’applique plus directement et nécessite un algorithme de Branch & Bound.' },
    { q: 'Qui a inventé l’algorithme du simplexe et en quelle année ?', a: 'George Dantzig en 1947.' }
  ]
};
