/**
 * Chapitre 6 du cours « Recherche Opérationnelle » B2 — Ordonnancement PERT / CPM & Flots de Réseaux.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Ordonnancement PERT / CPM &amp; Flots de Réseaux',
  short: 'PERT / CPM &amp; Flots',
  toc: 'Réseaux sans cycle, dates au plus tôt et au plus tard, marges totales, chemin critique, flot maximum et algorithme de Ford-Fulkerson.',
  time: '≈ 3 h 10 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Le déploiement d’une infrastructure cloud ou la construction d’un data center mobilise des dizaines d’équipes ' +
    'soumises à des contraintes d’antériorité strictes : impossible de couler la dalle avant d’avoir creusé, ' +
    'impossible d’installer les baies de serveurs avant d’avoir raccordé l’alimentation électrique et la climatisation. ' +
    'Quelle est la durée incompressible absolue du chantier ? Quelles sont les tâches à surveiller comme le lait sur le feu ' +
    'car le moindre jour de dérive retarderait l’inauguration ? ' +
    'Et dans les câbles réseau reliant ce data center au reste du monde, comment router le débit maximal de paquets ' +
    'sans saturer les liaisons physiques ? C’est le domaine de l’ordonnancement PERT/CPM et des flots de Ford-Fulkerson.',

  objectives: [
    'modéliser un ensemble de tâches interdépendantes sous forme de graphe orienté sans circuit (DAG) ;',
    'calculer les dates de début et de fin au plus tôt ($ES, EF$) via le parcours avant (Forward Pass) ;',
    'calculer les dates de début et de fin au plus tard ($LS, LF$) via le parcours arrière (Backward Pass) ;',
    'calculer les marges totales ($MT = LF - ES - d$) et les marges libres ($ML$) de chaque tâche ;',
    'identifier sans erreur le chemin critique et la durée minimale globale du projet ;',
    'modéliser un réseau de transport avec capacités finies et formaliser les lois de conservation du flot ;',
    'exécuter l’algorithme de Ford-Fulkerson par recherche de chaînes augmentantes et goulots d’étranglement ;',
    'énoncer le théorème fondamental du Flot-Max / Coupe-Min.'
  ],

  sections: [
    {
      title: 'Graphes d’ordonnancement : MPM et PERT / CPM',
      html: [
        '<p>Pour piloter un projet complexe, deux formalismes de graphes ont été développés dans les années 1950 :</p>',

        box('standard', 'Comparaison des deux formalismes de réseaux', [
          '<div class="box--formula">',
          '  <span class="formula-label">1. Méthode PERT / CPM (US Navy, 1958) — Potentiel-Étapes</span>',
          '  <p>Les <strong>sommets</strong> représentent des événements (jalons) et les <strong>arcs</strong> représentent les tâches. Requiert parfois des tâches fictives (durée nulle) pour modéliser des antériorités complexes.</p>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">2. Méthode MPM (Bernard Roy, France 1958) — Potentiel-Tâches</span>',
          '  <p>Chaque <strong>sommet</strong> représente une tâche réelle avec sa durée $d_i$. Les <strong>arcs orientés</strong> $(i \\to j)$ représentent directement les dépendances logiques sans jamais recourir à des tâches fictives.</p>',
          '</div>'
        ].join('\n')),

        box('info', 'Le graphe doit être un DAG (Directed Acyclic Graph)', [
          '<p>Un réseau d’ordonnancement physique ne peut comporter aucun cycle : une tâche ne peut jamais être son propre ancêtre ! ' +
          'La présence d’un circuit indique une boucle logique impossible à planifier.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Dates au plus tôt, Dates au plus tard & Marges',
      html: [
        '<p>L’analyse temporelle d’un projet s’effectue en deux passes complémentaires :</p>',

        '<table class="table">',
        '  <thead><tr><th>Passe de calcul</th><th>Direction</th><th>Formule mathématique</th><th>Signification concrète</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>1. Parcours avant (Forward Pass)</strong></td><td>De la racine vers la fin</td><td>$ES(j) = \\max_{p \\in Pred(j)} (ES(p) + d_p)$<br>$EF(j) = ES(j) + d_j$</td><td>Date au plus tôt à laquelle la tâche peut débuter une fois tous ses prédécesseurs finis.</td></tr>',
        '    <tr><td><strong>2. Durée du projet</strong></td><td>Point de convergence</td><td>$Duree = \\max_{t \\in Puits} EF(t)$</td><td>Durée minimale incompressible pour achever l’ensemble du projet.</td></tr>',
        '    <tr><td><strong>3. Parcours arrière (Backward Pass)</strong></td><td>De la fin vers la racine</td><td>$LF(i) = \\min_{s \\in Succ(i)} LS(s)$<br>$LS(i) = LF(i) - d_i$</td><td>Date limite au plus tard pour terminer la tâche sans repousser la fin du projet.</td></tr>',
        '  </tbody>',
        '</table>',

        box('standard', 'Les deux types de marges', [
          '<ul>',
          '  <li><strong>Marge Totale ($MT$)</strong> : retard maximal permis sans décaler la date de livraison finale du projet :<br>' +
          '  $$MT(i) = LF(i) - ES(i) - d_i = LS(i) - ES(i)$$</li>',
          '  <li><strong>Marge Libre ($ML$)</strong> : retard maximal permis sans décaler le début au plus tôt d’aucun de ses successeurs immédiats :<br>' +
          '  $$ML(i) = \\min_{s \\in Succ(i)} ES(s) - ES(i) - d_i$$</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Le Chemin Critique & le Pilotage des Dérives',
      html: [
        '<p>Le <strong>chemin critique</strong> est la chaîne continue de tâches reliant le début à la fin du projet ' +
        'dont la <strong>marge totale est strictement nulle ($MT = 0$)</strong> :</p>',

        box('tip', 'Règle d’or du chef de projet', [
          '<ul>',
          '  <li>Toute tâche située sur le chemin critique est dite <strong>critique</strong>.</li>',
          '  <li>Un retard de $k$ jours sur une tâche critique retarde le projet entier de très exactement $k$ jours.</li>',
          '  <li>Les tâches non critiques ($MT > 0$) possèdent un matelas de sécurité temporelle qui permet d’absorber des aléas opérationnels sans impact sur l’échéance contractuelle.</li>',
          '</ul>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Flots dans les Réseaux & Algorithme de Ford-Fulkerson',
      html: [
        '<p>Un réseau de transport est un graphe orienté $G = (V, E)$ doté d’une <strong>source $s$</strong>, d’un <strong>puits $t$</strong>, ' +
        'et où chaque arc $(u, v)$ possède une capacité maximale $c(u, v) \\ge 0$. ' +
        'Un flot $f$ doit respecter deux lois fondamentales :</p>',

        box('formula', 'Lois de conservation du flot & Algorithme de Ford-Fulkerson', [
          '<div class="box--formula">',
          '  <span class="formula-label">1. Lois de conservation de Kirchhoff</span>',
          '  <div class="math-block">$$0 \\le f(u, v) \\le c(u, v) \\quad \\text{et} \\quad \\sum_{u} f(u, v) = \\sum_{w} f(v, w) \\quad (\\forall v ∉ \\{s, t\\})$$</div>',
          '</div>',
          '<div class="box--formula">',
          '  <span class="formula-label">2. Algorithme de Ford-Fulkerson (1956)</span>',
          '  <ol>',
          '    <li>Initialiser le flot : $f(u, v) = 0$ sur chaque arc du réseau.</li>',
          '    <li>Tant qu’il existe une chaîne augmentante $P$ de $s$ à $t$ dans le graphe résiduel :</li>',
          '    <ul>',
          '      <li>Capacité résiduelle : $r(u, v) = c(u, v) - f(u, v)$.</li>',
          '      <li>Goulot d’étranglement : $\\delta = \\min \\{ r(u, v) \\mid (u, v) \\in P \\}$.</li>',
          '      <li>Augmentation : $f(u, v) \\leftarrow f(u, v) + \\delta$ le long des arcs directs de $P$.</li>',
          '    </ul>',
          '    <li>Arrêt lorsqu’il n’existe plus aucune chaîne augmentante $\\implies$ le flot est <strong>maximal</strong> !</li>',
          '  </ol>',
          '</div>'
        ].join('\n')),

        box('standard', 'Théorème du Flot Maximum / Coupe Minimale (Max-Flow Min-Cut)', [
          '<p>Une <em>coupe</em> $(S, T)$ sépare la source $s \\in S$ du puits $t \\in T$. Sa capacité est la somme des capacités des arcs allant de $S$ vers $T$.</p>',
          '<p><strong>Théorème (Ford &amp; Fulkerson, 1956)</strong> : la valeur maximale d’un flot réalisable entre une source et un puits ' +
          'est égale à la capacité minimale de toutes les coupes séparant la source du puits :<br>' +
          '$$\\max \\text{Flot} = \\min \\text{Capacité}(S, T)$$</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],

  questions: [
    {
      q: 'Dans un graphe d’ordonnancement MPM ou PERT, comment calcule-t-on la date au plus tôt ES d’une tâche ayant plusieurs prédécesseurs ?',
      opts: [
        'En prenant le MAXIMUM des dates de fin au plus tôt de tous ses prédécesseurs',
        'En prenant la moyenne arithmétique de ses prédécesseurs',
        'En prenant le minimum de ses prédécesseurs',
        'En additionnant les durées de toutes les tâches du graphe'
      ],
      correct: 0,
      exp: 'Une tâche ne peut débuter que lorsque le dernier de ses prédécesseurs s’achève, d’où le calcul du maximum : $ES = \\max (ES_p + d_p)$.'
    },
    {
      q: 'Qu’appelle-t-on le « chemin critique » dans un projet ?',
      opts: [
        'Le chemin continu de la source au puits dont toutes les tâches ont une marge totale nulle (MT = 0)',
        'Le chemin qui utilise le plus grand nombre d’ordinateurs',
        'Le chemin le plus court en nombre de tâches',
        'Le chemin dont le budget financier est le plus élevé'
      ],
      correct: 0,
      exp: 'Le chemin critique détermine la durée incompressible du projet : ses tâches n’ont aucune marge de retard.'
    },
    {
      q: 'Que vaut la marge totale (MT) d’une tâche dont la date au plus tôt est ES = 4, la date au plus tard de fin est LF = 12 et la durée est d = 5 ?',
      opts: [
        '3 jours',
        '8 jours',
        '0 jour',
        '1 jour'
      ],
      correct: 0,
      exp: '$MT = LF - ES - d = 12 - 4 - 5 = 3$ jours de battement.'
    },
    {
      q: 'Dans l’algorithme de Ford-Fulkerson, comment détermine-t-on la quantité de flot supplémentaire que l’on peut injecter le long d’une chaîne augmentante ?',
      opts: [
        'Par la capacité résiduelle minimale parmi tous les arcs de la chaîne (goulot d’étranglement Δ)',
        'Par la capacité du premier arc de la source',
        'Par la somme des capacités de la chaîne',
        'Par la moyenne des capacités résiduelles'
      ],
      correct: 0,
      exp: 'Le flot est bridé par l’arc le plus étroit de la chaîne, c’est le principe du goulot d’étranglement : $\\Delta = \\min r(u, v)$.'
    },
    {
      q: 'D’après le théorème de Ford-Fulkerson, à quoi la valeur du flot maximal dans un réseau est-elle exactement égale ?',
      opts: [
        'À la capacité de la coupe minimale séparant la source du puits',
        'Au nombre total d’arcs du graphe',
        'À la somme des capacités de tous les arcs',
        'À la capacité du puits'
      ],
      correct: 0,
      exp: 'Le théorème Max-Flow Min-Cut stipule l’égalité parfaite entre la valeur du flot max et la capacité de la coupe la plus étroite du réseau.'
    },
    {
      q: 'Quelle est la différence fondamentale entre la marge totale (MT) et la marge libre (ML) d’une tâche ?',
      opts: [
        'La marge totale tolère de repousser le début des successeurs, tandis que la marge libre ne retarde aucun successeur',
        'La marge totale est toujours plus petite que la marge libre',
        'La marge libre s’exprime en euros',
        'Il n’y a aucune différence, ce sont deux synonymes'
      ],
      correct: 0,
      exp: 'La marge libre préserve le début au plus tôt de tous les successeurs directs ($ML \\le MT$).'
    },
    {
      q: 'Dans un graphe de flots, que stipule la loi de conservation pour un sommet intermédiaire (ni source, ni puits) ?',
      opts: [
        'La somme des flots entrant dans le sommet égale exactement la somme des flots en sortant',
        'Le flot entrant doit être supérieur au flot sortant',
        'Le flot sortant doit être nul',
        'Le sommet accumule 50 % du trafic'
      ],
      correct: 0,
      exp: 'C’est l’analogue de la loi des nœuds de Kirchhoff : aucun flot ne peut être créé ni détruit sur un nœud intermédiaire.'
    },
    {
      q: 'Pourquoi l’implémentation d’Edmonds-Karp est-elle préférée à la version naïve de Ford-Fulkerson ?',
      opts: [
        'Elle recherche la chaîne augmentante la plus courte en nombre d’arcs par un parcours en largeur (BFS), garantissant une complexité polynomiale O(V * E²)',
        'Elle supprime le besoin d’avoir une source et un puits',
        'Elle ne fonctionne qu’avec des flots infinis',
        'Elle évite d’utiliser la mémoire vive'
      ],
      correct: 0,
      exp: 'Le choix de la chaîne de plus courte distance (BFS) évite les itérations infinies avec des capacités irrationnelles et borne le temps en $O(V \\cdot E^2)$.'
    }
  ],

  pitfalls: [
    'Oublier qu’une tâche peut avoir plusieurs prédécesseurs et calculer la date $ES$ en ne regardant qu’une seule branche au lieu de prendre le $\\max$.',
    'Confondre la date de début au plus tard ($LS$) et la date de fin au plus tard ($LF = LS + d$).',
    'Croire qu’un projet n’a qu’un seul chemin critique : il peut exister plusieurs chemins critiques de même durée en parallèle.',
    'Dans Ford-Fulkerson, oublier de mettre à jour les arcs résiduels inverses pour permettre au flot d’être réorienté si nécessaire.',
    'Confondre la capacité d’un arc $c(u, v)$ et le flot circulant actuellement $f(u, v)$.'
  ],

  methodTitle: 'Protocole de calcul d’un ordonnancement PERT/CPM',
  method: [
    'Construire le graphe orienté à partir du tableau des antériorités en vérifiant l’absence de circuit.',
    'Parcours avant (Forward Pass) : initialiser la racine à $ES = 0$. Pour chaque tâche, $ES = \\max_{p} (ES_p + d_p)$ et $EF = ES + d$.',
    'La durée globale du projet est la date $EF$ la plus tardive parmi les tâches terminales sans successeur.',
    'Parcours arrière (Backward Pass) : fixer $LF = \\text{Duree}$ pour les tâches terminales. Pour chaque tâche, $LF = \\min_{s} LS_s$ et $LS = LF - d$.',
    'Calculer la marge totale $MT = LF - ES - d$. Identifier les tâches à marge nulle ($MT = 0$) qui constituent le ou les chemins critiques.'
  ],

  summary: [
    'Le graphe d’ordonnancement est un DAG reliant les tâches de la source au puits.',
    'Forward Pass : calcul des dates au plus tôt $ES = \\max (ES_p + d_p)$. La durée du projet est $\\max EF$.',
    'Backward Pass : calcul des dates au plus tard $LF = \\min LS_s$.',
    'Marge totale : $MT = LF - ES - d$. Les tâches à marge nulle forment le chemin critique.',
    'Ford-Fulkerson calcule le flot maximal par chaînes augmentantes : $\\max \\text{Flot} = \\min \\text{Coupe}$.'
  ],

  checklist: [
    'Je sais tracer un graphe de potentiel MPM à partir d’un tableau d’antériorités.',
    'Je sais effectuer le calcul aller (Forward Pass) pour trouver la date de fin de projet.',
    'Je sais effectuer le calcul retour (Backward Pass) pour trouver les dates au plus tard.',
    'Je sais calculer la marge totale et tracer le chemin critique.',
    'Je comprends l’algorithme de Ford-Fulkerson et le théorème du Flot-Max / Coupe-Min.'
  ],

  notions: [
    'Graphe d’ordonnancement DAG',
    'Méthode PERT / CPM',
    'Forward Pass / Backward Pass',
    'Date au plus tôt (ES, EF)',
    'Date au plus tard (LS, LF)',
    'Marge totale (MT)',
    'Marge libre (ML)',
    'Chemin critique',
    'Algorithme de Ford-Fulkerson',
    'Théorème Flot-Max / Coupe-Min'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois la construction du DAG et la formule du calcul aller (Forward Pass).' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le calcul retour (Backward Pass) et l’identification des marges nulles.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez le chemin critique PERT et le théorème Flot-Max / Coupe-Min.' },
    { cls: 'top', text: '≥ 95 % — Parfait : vous avez terminé l’ensemble du cursus de Recherche Opérationnelle B2 !' }
  ],

  flashcards: [
    { q: 'Qu’est-ce qu’un chemin critique dans un ordonnancement de projet ?', a: 'Une chaîne continue de tâches à marge totale nulle (MT = 0) dont tout retard repousse la livraison finale du projet.' },
    { q: 'Comment calcule-t-on la date au plus tôt (ES) d’une tâche ayant plusieurs prédécesseurs ?', a: 'ES = max(EF_pred) = max(ES_pred + duree_pred).' },
    { q: 'Comment calcule-t-on la date au plus tard (LF) d’une tâche ayant plusieurs successeurs ?', a: 'LF = min(LS_succ) = min(LF_succ - duree_succ).' },
    { q: 'Quelle est la formule de la marge totale d’une tâche ?', a: 'MT = LF - ES - durée = LS - ES = LF - EF.' },
    { q: 'Que stipule le théorème de Ford-Fulkerson (Max-Flow Min-Cut) ?', a: 'La valeur du flot maximal dans un réseau de transport est égale à la capacité de la coupe minimale séparant la source du puits.' },
    { q: 'Pourquoi l’algorithme d’Edmonds-Karp utilise-t-il un parcours en largeur (BFS) ?', a: 'Pour trouver la chaîne augmentante ayant le plus petit nombre d’arcs, ce qui garantit une complexité polynomiale en O(V * E²).' }
  ]
};

