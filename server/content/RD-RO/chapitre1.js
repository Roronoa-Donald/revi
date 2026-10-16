/**
 * Chapitre 1 du cours « Recherche Opérationnelle » B2 — Fondements, Variables & Modélisation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements, Variables &amp; Modélisation Linéaire',
  short: 'Fondements &amp; Modélisation',
  toc: 'Origines de la RO, variables de décision, fonction objectif, contraintes de ressources et formalisation canonique d’un programme linéaire.',
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
    'définir avec exactitude la discipline de la Recherche Opérationnelle et son rôle stratégique dans la prise de décision ;',
    'identifier sans ambiguïté les variables de décision et leurs unités physiques ($x_j \\ge 0$) ;',
    'construire la fonction objectif économique $Z$ (maximisation de profit ou minimisation de coût) ;',
    'traduire des contraintes textuelles en inéquations linéaires de ressources ($\\\\le$), de besoins ($\\\\ge$) et d’équilibres ($=$) ;',
    'valider les hypothèses fondamentales de la programmation linéaire (proportionnalité, additivité, divisibilité, certitude).'
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
          '  <li><strong>1913 — Formule du lot économique de Wilson-Harris</strong> : première formalisation mathématique de gestion optimale des stocks industriels.</li>',
          '  <li><strong>1940-1945 — La Seconde Guerre mondiale</strong> : des équipes pluridisciplinaires britanniques et américaines déploient des modèles probabilistes pour optimiser l’implantation des radars, la taille des convois maritimes et l’acheminement logistique.</li>',
          '  <li><strong>1947 — George Dantzig et le Simplexe</strong> : invention de l’algorithme du simplexe aux États-Unis, qui révolutionne la résolution numérique des programmes linéaires et ouvre l’ère de l’optimisation industrielle sur ordinateur.</li>',
          '</ul>'
        ].join('\n')),

        '<p>Aujourd’hui, la RO pilote les plans de vol des compagnies aériennes, la distribution des colis dans les réseaux logistiques, ' +
        'la planification du personnel hospitalier, l’affectation des fréquences 5G et la gestion des chaînes de production de microprocesseurs.</p>'
      ].join('\n')
    },
    {
      title: 'Composants fondamentaux d’un Programme Linéaire (PL)',
      html: [
        '<p>Tout problème de programmation linéaire repose sur une structure mathématique universelle à quatre piliers :</p>',

        box('formula', 'Structure canonique d’un Programme Linéaire (PL)', [
          '<div class="math-block">',
          '$$\\begin{aligned}',
          '\\text{Optimiser (MAX ou MIN) } & Z = \\sum_{j=1}^{n} c_j x_j = c_1 x_1 + c_2 x_2 + \\dots + c_n x_n \\\\[6pt]',
          '\\text{Sous les contraintes réelles : } & \\sum_{j=1}^{n} a_{ij} x_j \\le b_i \\quad (i = 1, \\dots, m) \\\\[6pt]',
          '\\text{Contraintes de non-négativité : } & x_j \\ge 0 \\quad (j = 1, \\dots, n)',
          '\\end{aligned}$$',
          '</div>'
        ].join('\n')),

        box('standard', 'Analyse détaillée des quatre composantes', [
          '<ul>',
          '  <li><strong>Les variables de décision ($x_j$)</strong> : ce sont les grandeurs physiques contrôlables dont on cherche la valeur optimale (ex. nombre de lots à fabriquer, tonnes d’engrais à épandre, nombre d’avions à affecter).</li>',
          '  <li><strong>La fonction objectif ($Z$)</strong> : l’expression algébrique linéaire qui mesure la performance globale du système. Les coefficients $c_j$ représentent les marges unitaires ou les coûts marginaux.</li>',
          '  <li><strong>Les contraintes technologiques</strong> : les limitations imposées par la réalité physique, légale ou contractuelle (disponibilité d’une machine, capacité de stockage, seuil de demande contractuelle).</li>',
          '  <li><strong>Les contraintes de non-négativité ($x_j \\ge 0$)</strong> : un impératif physique dans 99 % des applications réelles (on ne peut pas fabriquer $-5$ chaises ou rouler $-200$ kilomètres).</li>',
          '</ul>'
        ].join('\n')),

        box('pitfall', 'L’exigence stricte de linéarité', [
          '<p>Un programme est <strong>strictement linéaire</strong> si et seulement si :</p>',
          '<ul>',
          '  <li>Toutes les variables apparaissent à la <strong>puissance 1</strong> (pas de $x_1^2$, pas de $\\sqrt{x_2}$) ;</li>',
          '  <li>Il n’y a aucun produit de variables entre elles (pas de terme $x_1 \\cdot x_2$) ;</li>',
          '  <li>Il n’y a aucune fonction non linéaire appliquée aux variables (pas de $\\log(x_1)$, ni de $\\sin(x_2)$).</li>',
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
        '    <tr><td><strong>1. Définition des variables</strong></td><td>Quelles sont les décisions à prendre ?</td><td>Nommer les $x_j$ et préciser leur unité physique exacte (ex. $x_1$ = nombre de tables produites par semaine).</td></tr>',
        '    <tr><td><strong>2. Fonction objectif</strong></td><td>Quel est le critère d’évaluation ?</td><td>Écrire $MAX \\ Z = \\sum c_j x_j$ (profit) ou $MIN \\ C = \\sum c_j x_j$ (coût).</td></tr>',
        '    <tr><td><strong>3. Recensement des contraintes</strong></td><td>Quelles ressources ou règles limitent mes choix ?</td><td>Poser une inéquation par ressource limitée ou obligation de livraison.</td></tr>',
        '    <tr><td><strong>4. Contraintes de positivité</strong></td><td>Les variables ont-elles un sens physique négatif ?</td><td>Poser explicitement $x_j \\ge 0$ pour chaque variable.</td></tr>',
        '  </tbody>',
        '</table>',

        box('tip', 'Exemple complet : le problème du menuisier', [
          '<p>Variables : $x_1$ = tables/semaine, $x_2$ = chaises/semaine.</p>',
          '<p>Objectif : $\\text{MAX } Z = 50 x_1 + 30 x_2$</p>',
          '<p>Contraintes :<br>' +
          '- Bois : $3 x_1 + 1 x_2 \\le 90$ (m² disponibles)<br>' +
          '- Main-d’œuvre : $2 x_1 + 2 x_2 \\le 80$ (heures disponibles)<br>' +
          '- Non-négativité : $x_1 \\ge 0, \\ x_2 \\ge 0$</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Grandes familles de problèmes linéaires',
      html: [
        '<p>La plupart des applications industrielles de la programmation linéaire se rattachent à trois grandes familles de modèles :</p>',

        box('standard', 'Les trois grandes familles de modèles industriels', [
          '<div class="box--formula">',
          '  <span class="formula-label">1. Problème de Production (Mix produit)</span>',
          '  <div class="math-block">$$\\text{MAX } Z = \\sum c_j x_j \\quad \\text{sous } \\sum a_{ij} x_j \\le b_i \\quad (x_j \\ge 0)$$</div>',
          '  <p>Maximiser la marge totale sous contraintes de capacités de machines, stocks et main-d’œuvre.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">2. Problème de Mélange (Alimentation, Métallurgie, Chimie)</span>',
          '  <div class="math-block">$$\\text{MIN } C = \\sum c_j x_j \\quad \\text{sous } \\sum a_{ij} x_j \\ge b_i \\quad (x_j \\ge 0)$$</div>',
          '  <p>Minimiser le coût d’achat en garantissant les apports nutritionnels ou seuils de pureté minimaux.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">3. Problème d’Affectation &amp; Recouvrement (Planning)</span>',
          '  <div class="math-block">$$\\text{MIN } W = \\sum c_j x_j \\quad \\text{sous } \\sum a_{ij} x_j \\ge r_i \\quad (x_j \\in \\{0, 1\\})$$</div>',
          '  <p>Minimiser l’effectif mobilisé tout en couvrant le besoin d’agents par créneau horaire.</p>',
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
      exp: 'George Dantzig a formalisé la programmation linéaire et publié l’algorithme du simplexe en 1947.'
    },
    {
      q: 'Dans un problème de programmation linéaire standard, quelle contrainte implicite doit toujours être posée sur les variables physiques ?',
      opts: [
        'x_j ≥ 0 (non-négativité)',
        'x_j ≤ 1 (normalisation)',
        'x_j ∈ ℤ (variables entières obligatoires)',
        'x_j = 0'
      ],
      correct: 0,
      exp: 'Les quantités physiques réelles (volumes, temps, unités produites) sont nécessairement positives ou nulles ($x_j \\ge 0$).'
    },
    {
      q: 'Quelle expression mathématique est NON LINÉAIRE et donc interdite dans un programme linéaire classique ?',
      opts: [
        '3*x1 + 4*x1*x2',
        '5*x1 - 2*x2',
        '0.5*x1 + 10',
        'x1 + x2 + x3'
      ],
      correct: 0,
      exp: 'Le produit de deux variables de décision ($x_1 \\cdot x_2$) est quadratique et viole la propriété d’additivité et de linéarité.'
    },
    {
      q: 'Dans un problème de mélange (blending) où l’on cherche à satisfaire des teneurs nutritionnelles minimales, quel est le sens habituel des contraintes ?',
      opts: [
        '≥ (supérieur ou égal au seuil requis)',
        '≤ (inférieur ou égal)',
        '= (égalité stricte)',
        '≠ (différent de zéro)'
      ],
      correct: 0,
      exp: 'Un besoin minimal ou une norme de qualité impose d’apporter au moins une quantité seuil, d’où l’opérateur $\\ge$.'
    },
    {
      q: 'Dans le problème du menuisier, si x1 = 20 tables et x2 = 10 chaises, quelle est la consommation de bois (3*x1 + 1*x2) ?',
      opts: [
        '70 m²',
        '90 m²',
        '80 m²',
        '60 m²'
      ],
      correct: 0,
      exp: '3 * 20 + 1 * 10 = 60 + 10 = 70 m², ce qui est inférieur ou égal à la capacité de 90 m².'
    },
    {
      q: 'Comment qualifie-t-on une solution (x1, x2) qui respecte toutes les contraintes du programme linéaire sans exception ?',
      opts: [
        'Une solution réalisable (feasible)',
        'Une solution optimale',
        'Une solution dégénérée',
        'Une solution duale'
      ],
      correct: 0,
      exp: 'Une solution réalisable satisfait l’ensemble des contraintes techniques et de signe, mais n’est pas nécessairement la meilleure.'
    },
    {
      q: 'Quel est l’objectif classique d’un problème de mix de production industriel ?',
      opts: [
        'Maximiser le profit total (ou la marge contributive)',
        'Minimiser le nombre de machines',
        'Égaliser les temps de travail',
        'Maximiser les stocks résiduels'
      ],
      correct: 0,
      exp: 'L’objectif économique premier est de maximiser la marge sur coût variable générée par les ventes des produits.'
    },
    {
      q: 'Quelle hypothèse fondamentale de la PL garantit que doubler la quantité produite double exactement la consommation de ressources et le profit ?',
      opts: [
        'L’hypothèse de proportionnalité',
        'L’hypothèse de convexité',
        'L’hypothèse de séparabilité',
        'L’hypothèse d’élasticité'
      ],
      correct: 0,
      exp: 'La proportionnalité stipule que la contribution de chaque variable est strictement proportionnelle à sa valeur sans économie d’échelle.'
    }
  ],

  pitfalls: [
    'Oublier de poser explicitement les contraintes de non-négativité ($x_j \\ge 0$) dans le modèle mathématique.',
    'Mélanger les unités physiques dans une même contrainte (par exemple additionner des minutes et des heures).',
    'Introduire des non-linéarités en voulant modéliser des coûts fixes par des produits de variables sans variables binaires.',
    'Confondre le sens d’une contrainte de ressource (disponibilité $\\le$) et d’une contrainte d’engagement (minimum contractuel $\\ge$).',
    'Considérer une solution réalisable quelconque comme étant la solution optimale.'
  ],

  methodTitle: 'Protocole en 4 étapes pour modéliser tout énoncé de RO',
  method: [
    'Lire attentivement l’énoncé et repérer les questions finales : chaque décision à quantifier devient une variable $x_j$ avec son unité.',
    'Identifier l’objectif économique global : isoler les gains unitaires pour poser $\\text{MAX } Z$ ou les coûts unitaires pour poser $\\text{MIN } C$.',
    'Dresser un tableau des ressources : identifier les plafonds disponibles ($\\le$) et les exigences minimales ($\\ge$), puis poser les inéquations.',
    'Vérifier l’homogénéité dimensionnelle de chaque équation (les deux membres doivent avoir la même unité) et conclure par $x_j \\ge 0$.'
  ],

  summary: [
    'La Recherche Opérationnelle aide à la décision scientifique en maximisant ou minimisant une fonction sous contraintes.',
    'Un Programme Linéaire comprend : des variables de décision $x_j$, une fonction objectif $Z$, des contraintes techniques et $x_j \\ge 0$.',
    'Les 4 hypothèses fondamentales sont la proportionnalité, l’additivité, la divisibilité et la certitude des paramètres.',
    'Les contraintes de ressources disponibles utilisent l’opérateur $\\le$ ; les contraintes de demande minimale utilisent $\\ge$.',
    'Toute modélisation rigoureuse débute par la définition explicite de chaque variable en français avec son unité.'
  ],

  checklist: [
    'Je sais expliquer ce qu’est la Recherche Opérationnelle et son origine avec George Dantzig.',
    'Je sais identifier et nommer les variables de décision dans un problème de gestion.',
    'Je sais formaliser la fonction objectif et distinguer MAX (profit) et MIN (coût).',
    'Je sais traduire des limitations d’heures machine ou de matières en contraintes $\\le$.',
    'Je n’oublie jamais les contraintes de positivité $x_j \\ge 0$.'
  ],

  notions: [
    'Recherche Opérationnelle',
    'Variables de décision',
    'Fonction objectif Z',
    'Contraintes de ressources',
    'Contraintes de demande',
    'Non-négativité',
    'Programme Linéaire',
    'George Dantzig',
    'Proportionnalité',
    'Région réalisable'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les définitions de variables de décision et le rôle des contraintes de positivité.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à formaliser les inéquations de ressources et la fonction objectif.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les fondamentaux de la modélisation de programmes linéaires.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux formes canoniques, standards et à la résolution graphique au chapitre 2.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce que la Recherche Opérationnelle ?', a: 'Une discipline scientifique appliquant des méthodes mathématiques et algorithmiques pour optimiser la prise de décision face à des ressources limitées.' },
    { q: 'Qu’est-ce qu’une variable de décision ?', a: 'Une quantité contrôlable inconnue (ex. unités produites) dont on cherche la valeur optimale ($x_j \\ge 0$).' },
    { q: 'Quelle est la différence entre fonction objectif et contrainte ?', a: 'La fonction objectif mesure le critère de performance globale (profit ou coût), tandis que les contraintes délimitent ce qui est physiquement ou légalement possible.' },
    { q: 'Pourquoi la non-négativité (x_j ≥ 0) est-elle indispensable ?', a: 'Parce que les grandeurs physiques réelles (objets, heures, surfaces) ne peuvent pas être négatives.' },
    { q: 'Quelles sont les 4 hypothèses fondamentales d’un programme linéaire ?', a: 'La proportionnalité, l’additivité, la divisibilité des variables et la certitude des coefficients.' },
    { q: 'Qui a inventé l’algorithme du simplexe et en quelle année ?', a: 'George Dantzig en 1947.' }
  ]
};
