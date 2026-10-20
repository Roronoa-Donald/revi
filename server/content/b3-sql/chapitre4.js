/**
 * Chapitre 4 du cours « SQL Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Fonctions de Fenêtrage (Window Functions) &amp; Requêtes Hiérarchiques (CTEs Récursives)',
  short: 'Fenêtrage &amp; CTEs Récursives',
  toc: 'Fonctions analytiques (ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD), clauses OVER (PARTITION BY, ORDER BY), cadrage de fenêtres (ROWS/RANGE BETWEEN), agrégats cumulatifs glissants, expressions de table communes récursives (WITH RECURSIVE), arborescences organisationnelles et détection de cycles hiérarchiques.',
  time: '≈ 3 h 00 de travail',
  free: false,
  situation: 'Dans un entrepôt de données d’entreprise ou une application financière, les calculs analytiques — tels que le calcul de rangs commerciaux, les variations de solde de compte au fil de l’eau, les moyennes mobiles sur 7 jours ou la navigation dans un organigramme d’entreprise — s’avèrent extrêmement complexes et inefficaces avec de simples jointures `GROUP BY`. Le standard SQL:2003 a révolutionné l’analytique relationnelle en introduisant les fonctions de fenêtrage (Window Functions) et les Common Table Expressions récursives (`WITH RECURSIVE`). L’ingénieur de données doit maîtriser le découpage partitionné sans écrasement de lignes, la définition précise du cadre d’agrégation (window frame) et la construction rigoureuse de requêtes hiérarchiques composées d’une ancre et d’un terme récursif.',
  objectives: [
    'maîtriser la clause analytique OVER avec ses sous-clauses PARTITION BY et ORDER BY ;',
    'différencier avec rigueur les fonctions de classement ROW_NUMBER, RANK et DENSE_RANK sur des ex-æquo ;',
    'manipuler les fonctions de décalage temporel LAG() et LEAD() pour calculer des deltas d’une ligne à l’autre ;',
    'configurer les cadres d’agrégation mobiles avec ROWS et RANGE BETWEEN pour le calcul de moyennes glissantes ;',
    'concevoir des requêtes hiérarchiques avancées grâce aux CTEs récursives (WITH RECURSIVE) pour parcourir des arborescences ;',
    'implémenter en Python 3 des simulateurs de classement analytique, de moyennes glissantes et de résolution d’arbres hiérarchiques.'
  ],
  sections: [
    {
      title: 'Les Fonctions de Fenêtrage (Window Functions) & La Clause OVER',
      html: [
        '<p>Contrairement à une agrégation classique avec <code>GROUP BY</code> qui regroupe et compresse plusieurs tuples en une ligne unique, une <strong>fonction de fenêtrage</strong> calcule une valeur agrégée ou ordonnée pour chaque ligne tout en <em>conservant l’intégrité et l’identité de chaque ligne individuelle</em> du résultat :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure Canonique de la Clause OVER</h4>',
        '    <pre><code>SELECT id, departement, salaire,',
        '       AVG(salaire) OVER (',
        '           PARTITION BY departement',
        '           ORDER BY date_embauche',
        '           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW',
        '       ) AS salaire_moyen_cumul',
        'FROM employes;</code></pre>',
        '    <ul>',
        '      <li><strong>PARTITION BY :</strong> Découpe le jeu de données en sous-groupes indépendants (ex: par département). Le calcul redémarre à zéro pour chaque partition.</li>',
        '      <li><strong>ORDER BY :</strong> Détermine l’ordre d’évaluation séquentielle des tuples au sein de chaque partition.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Fonctions de Classement : ROW_NUMBER, RANK, DENSE_RANK</h4>',
        '    <p>Sur une série de valeurs décroissantes comportant des ex-æquo (ex: <code>100, 90, 90, 80</code>) :</p>',
        '    <ul>',
        '      <li><strong>ROW_NUMBER() :</strong> Attribue un numéro séquentiel unique strict sans ex-æquo (<code>1, 2, 3, 4</code>). Idéal pour la pagination.</li>',
        '      <li><strong>RANK() :</strong> Attribue le même rang aux valeurs égales, puis <em>saute</em> les rangs suivants (<code>1, 2, 2, 4</code>).</li>',
        '      <li><strong>DENSE_RANK() :</strong> Attribue le même rang aux ex-æquo sans sauter de rang (<code>1, 2, 2, 3</code>).</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', '<strong>Attention à l’ORDER BY implicite dans la clause OVER :</strong> Dès qu’une clause <code>ORDER BY</code> est ajoutée dans un <code>OVER()</code> sans spécifier de cadre explicite, PostgreSQL applique par défaut le cadre <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. Cela transforme une somme totale en une somme cumulative ! Pour obtenir la somme globale sur toute la partition, omettez l’<code>ORDER BY</code>.')
      ].join('\n')
    },
    {
      title: 'Cadrage de Fenêtres (Window Frames) & Fonctions de Décalage (LAG, LEAD)',
      html: [
        '<p>Le cadre de fenêtre (<em>window frame</em>) permet de restreindre l’ensemble des lignes prises en compte par la fonction d’agrégation autour du tuple courant :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Spécification du Cadre : ROWS vs RANGE</h4>',
        '    <ul>',
        '      <li><strong>ROWS :</strong> Fonctionne sur le nombre physique de lignes (ex: <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code> prend la ligne courante et les 2 précédentes physiques).</li>',
        '      <li><strong>RANGE :</strong> Fonctionne sur les valeurs logiques de la colonne triée (les lignes ex-æquo sont traitées en bloc).</li>',
        '      <li><strong>Bornes courantes :</strong>',
        '        <ul>',
        '          <li><code>UNBOUNDED PRECEDING</code> : Depuis le début de la partition.</li>',
        '          <li><code>CURRENT ROW</code> : Jusqu’à la ligne courante.</li>',
        '          <li><code>UNBOUNDED FOLLOWING</code> : Jusqu’à la fin de la partition.</li>',
        '        </ul>',
        '      </li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Navigation Relative : LAG, LEAD & NTILE</h4>',
        '    <pre><code>SELECT date_mesure, valeur,',
        '       LAG(valeur, 1, 0) OVER (ORDER BY date_mesure) AS val_prec,',
        '       LEAD(valeur, 1, 0) OVER (ORDER BY date_mesure) AS val_suiv,',
        '       NTILE(4) OVER (ORDER BY valeur) AS quartile',
        'FROM metriques;</code></pre>',
        '    <ul>',
        '      <li><code>LAG(col, offset, defaut)</code> : Lit la valeur de la ligne située <code>offset</code> positions en arrière.</li>',
        '      <li><code>LEAD(col, offset, defaut)</code> : Lit la valeur de la ligne située <code>offset</code> positions en avant.</li>',
        '      <li><code>NTILE(k)</code> : Répartit uniformément les lignes en <code>k</code> compartiments (quantiles).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Expressions de Table Communes Récursives (WITH RECURSIVE)',
      html: [
        '<p>Les structures hiérarchiques (arbres organisationnels, nomenclatures de pièces BOM, graphes de dépendances réseau) ne peuvent pas être parcourues en SQL plat sans connaître la profondeur maximale. La commande <code>WITH RECURSIVE</code> permet d’exécuter des requêtes itératives jusqu’à point fixe :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Anatomie d’une CTE Récursive</h4>',
        '    <pre><code>WITH RECURSIVE hierarchie AS (',
        '    -- 1. Requête d’ancrage (Point de départ)',
        '    SELECT id, nom, manager_id, 1 AS niveau,',
        '           ARRAY[id] AS chemin',
        '    FROM employes',
        '    WHERE manager_id IS NULL',
        '',
        '    UNION ALL',
        '',
        '    -- 2. Terme récursif (Itération)',
        '    SELECT e.id, e.nom, e.manager_id, h.niveau + 1,',
        '           h.chemin || e.id',
        '    FROM employes e',
        '    JOIN hierarchie h ON e.manager_id = h.id',
        '    WHERE NOT (e.id = ANY(h.chemin)) -- Anti-boucle',
        ')',
        'SELECT * FROM hierarchie ORDER BY niveau, id;</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Mécanique Interne du Moteur PostgreSQL</h4>',
        '    <ol>',
        '      <li><strong>Initialisation :</strong> Le moteur exécute l’ancre et insère le résultat dans la table intermédiaire de travail (<em>working table</em>) et la table de résultat final.</li>',
        '      <li><strong>Itération :</strong> Le terme récursif est exécuté en jointure avec la table de travail pour produire une table intermédiaire suivante.</li>',
        '      <li><strong>Boucle :</strong> Les nouveaux tuples sont injectés dans le résultat final, la working table est remplacée par ces nouveaux tuples.</li>',
        '      <li><strong>Terminaison :</strong> La récursion s’arrête dès que la working table est vide (point fixe atteint).</li>',
        '    </ol>',
        '  </div>',
        '</div>',
        box('danger', '<strong>Risque de boucle infinie en cas de cycle :</strong> Si les données contiennent une référence circulaire (ex: A est le manager de B qui est le manager de A), la CTE récursive bouclera indéfiniment jusqu’au crash mémoire ou au timeout. L’utilisation d’un tableau d’identifiants parcourus (<code>ARRAY[id]</code>) avec une condition <code>WHERE NOT (id = ANY(chemin))</code> est impérative pour détecter et couper les cycles !')
      ].join('\n')
    }
  ],
  method: [
    '1. Identifier si le problème nécessite une fonction de classement (ROW_NUMBER/RANK), une navigation séquentielle (LAG/LEAD) ou une hiérarchie (WITH RECURSIVE).',
    '2. Définir le découpage logique des partitions avec PARTITION BY (ex: par compte, par produit, par région).',
    '3. Établir l’ordre chronologique ou de tri strict avec ORDER BY au sein du bloc analytique.',
    '4. Préciser le cadre ROWS BETWEEN lorsque vous calculez des moyennes ou sommes mobiles physiques.',
    '5. Structurer les CTEs récursives avec une ancre claire (racines WHERE parent IS NULL) et un terme récursif avec jointure.',
    '6. Intégrer systématiquement une colonne de profondeur (niveau) et un tableau anti-cycle (path array) pour garantir la terminaison.'
  ],
  summary: [
    'Les fonctions de fenêtrage calculent des métriques agrégées sans compresser ni faire disparaître les lignes individuelles.',
    'ROW_NUMBER génère une numérotation continue stricte, RANK saute des numéros après des ex-æquo, DENSE_RANK ne saute aucun numéro.',
    'LAG et LEAD permettent d’accéder sans auto-jointure aux valeurs précédentes et suivantes d’une partition.',
    'La clause ROWS BETWEEN définit le cadre physique des lignes mobiles pour le lissage statistique (moyennes mobiles).',
    'WITH RECURSIVE résout l’exploration des graphes et des arbres hiérarchiques par point fixe itératif.',
    'La prévention des boucles infinies dans les graphes cycliques s’opère par la détection de présence dans un tableau de trace de parcours.'
  ],
  checklist: [
    'Ai-je bien distingué le besoin entre un GROUP BY (agrégation destructive) et une Window Function (conservatrice de lignes) ?',
    'Ai-je choisi entre RANK() et DENSE_RANK() en fonction du traitement souhaité pour les ex-æquo ?',
    'Le cadrage ROWS BETWEEN est-il explicitement défini pour éviter le comportement par défaut de RANGE ?',
    'Les fonctions LAG() et LEAD() incluent-elles une valeur de remplacement par défaut en cas de NULL ?',
    'L’ancre de ma requête WITH RECURSIVE sélectionne-t-elle strictement les nœuds racines ?',
    'Un mécanisme de protection anti-cycle (chemin parcouru ou seuil de profondeur MAX) est-il en place ?'
  ],
  notions: [
    'Clause OVER()',
    'PARTITION BY & ORDER BY',
    'ROW_NUMBER(), RANK(), DENSE_RANK()',
    'LAG() & LEAD()',
    'Cadres de fenêtre ROWS vs RANGE BETWEEN',
    'Moyennes glissantes (Moving Averages)',
    'Common Table Expression récursive (WITH RECURSIVE)',
    'Détection et rupture de cycles hiérarchiques'
  ],
  pitfalls: [
    'Confondre RANK() et DENSE_RANK() et fausser les classements d’attribution de récompenses ou de quotas.',
    'Oublier que par défaut en présence d’ORDER BY dans OVER(), PostgreSQL applique un cumul progressif plutôt qu’un total.',
    'Omettre le garde-fou anti-cycle dans une CTE récursive et provoquer un blocage infini du moteur PostgreSQL.',
    'Utiliser RANGE BETWEEN au lieu de ROWS BETWEEN pour des calculs glissants physiques lorsque plusieurs lignes partagent le même timestamp.'
  ],
  questions: [
    {
      stem: 'Quelle fonction de classement attribue la suite (1, 2, 2, 3) pour quatre éléments dont le 2e et le 3e sont ex-æquo ?',
      opts: [
        'ROW_NUMBER()',
        'RANK()',
        'DENSE_RANK()',
        'NTILE(4)'
      ],
      correct: 2,
      exp: 'DENSE_RANK() attribue le même rang aux éléments ex-æquo sans sauter de valeur dans la suite des entiers consécutifs.'
    },
    {
      stem: 'Que produit la requête SELECT SUM(montant) OVER (ORDER BY date_vente) FROM ventes ?',
      opts: [
        'La somme totale globale répétée sur chaque ligne',
        'Une somme cumulative progressive au fur et à mesure des dates',
        'Une erreur de syntaxe car PARTITION BY est obligatoire',
        'La moyenne arithmétique des ventes'
      ],
      correct: 1,
      exp: 'En présence d’un ORDER BY dans OVER sans clause ROWS, le cadre par défaut devient RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, calculant un cumul.'
    },
    {
      stem: 'Quelle clause permet de calculer une moyenne glissante sur la ligne courante et les 2 lignes physiques précédentes ?',
      opts: [
        'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW',
        'RANGE BETWEEN 2 PRECEDING AND CURRENT ROW',
        'ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING',
        'PARTITION BY 2 ROWS'
      ],
      correct: 0,
      exp: 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW sélectionne exactement les 2 tuples physiques précédents et le tuple courant.'
    },
    {
      stem: 'À quoi sert le troisième paramètre de la fonction LAG(colonne, décalage, valeur_defaut) ?',
      opts: [
        'À spécifier le nom de la partition',
        'À fournir une valeur de substitution si la ligne précédente n’existe pas (à la place de NULL)',
        'À définir le pas d’incrémentation',
        'À indiquer le type de données de sortie'
      ],
      correct: 1,
      exp: 'Le troisième paramètre de LAG permet de remplacer la valeur NULL retournée pour la toute première ligne de la partition.'
    },
    {
      stem: 'Dans une CTE WITH RECURSIVE, quel mot-clé combine traditionnellement l’ancre et le terme récursif ?',
      opts: [
        'UNION ALL',
        'INTERSECT',
        'CROSS JOIN',
        'MERGE'
      ],
      correct: 0,
      exp: 'UNION ALL combine l’ensemble initial de l’ancre avec les tuples générés à chaque itération par le terme récursif.'
    },
    {
      stem: 'Comment éviter qu’une requête WITH RECURSIVE ne boucle à l’infini dans un graphe contenant des cycles ?',
      opts: [
        'En désactivant le cache PostgreSQL',
        'En traçant les identifiants visités dans un tableau et en vérifiant WHERE NOT (id = ANY(chemin))',
        'En remplaçant UNION ALL par UNION',
        'En augmentant la variable work_mem'
      ],
      correct: 1,
      exp: 'L’accumulation des IDs visités dans un tableau ARRAY permet d’exclure les nœuds déjà visités et d’interrompre la récursion.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre une fonction d’agrégation ordinaire et une fonction de fenêtrage ?',
      opts: [
        'La fonction de fenêtrage ne peut s’exécuter que la nuit',
        'La fonction d’agrégation compresse les lignes en une seule, la fonction de fenêtrage conserve chaque ligne',
        'La fonction de fenêtrage ne fonctionne que sur des chaînes de caractères',
        'Aucune différence, ce sont de purs synonymes'
      ],
      correct: 1,
      exp: 'Une fonction de fenêtrage calcule une valeur pour chaque ligne sans réduire le nombre total de lignes renvoyées par la requête.'
    },
    {
      stem: 'Que renvoie la fonction NTILE(4) appliquée sur une partition de 100 lignes ?',
      opts: [
        '4 lignes au hasard',
        'Un numéro de quartile (1, 2, 3 ou 4) affecté à chaque tranche de 25 lignes',
        'Le pourcentage d’avancement de chaque ligne',
        'Le quotient de la division entière par 4'
      ],
      correct: 1,
      exp: 'NTILE(4) répartit les 100 lignes ordonnées en 4 tranches égales (quartiles) numérotées de 1 à 4.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la syntaxe minimale d’une fonction de fenêtrage ?',
      a: 'FONCTION() OVER (PARTITION BY col1 ORDER BY col2)'
    },
    {
      q: 'Quelle est la différence entre RANK() et DENSE_RANK() ?',
      a: 'RANK saute des numéros après des ex-æquo (1, 2, 2, 4), tandis que DENSE_RANK ne saute aucun numéro (1, 2, 2, 3).'
    },
    {
      q: 'Comment calculer la variation d’un chiffre d’affaires par rapport au mois précédent ?',
      a: 'En utilisant la fonction LAG(ca, 1) OVER (ORDER BY mois) et en soustrayant cette valeur au CA courant.'
    },
    {
      q: 'Que signifie ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING ?',
      a: 'Un cadre centré de 3 lignes : la ligne immédiatement précédente, la ligne courante et la ligne immédiatement suivante.'
    },
    {
      q: 'Quels sont les deux éléments obligatoires d’une CTE WITH RECURSIVE ?',
      a: 'L’ancre (requête initiale non récursive) et le terme récursif reliés par UNION ALL.'
    },
    {
      q: 'Comment stopper une boucle infinie dans une récursion hiérarchique ?',
      a: 'En mémorisant les nœuds parcourus dans un tableau et en filtrant les nœuds déjà présents.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à formuler une clause OVER ou confusion entre agrégation classique et calcul analytique.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de ROW_NUMBER, RANK, LAG et calculs cumulatifs mobiles avec cadrage ROWS.'
    },
    {
      cls: 'high',
      text: 'Conception avancée de requêtes hiérarchiques complexes avec WITH RECURSIVE, anti-boucle robuste et calculs analytiques multi-niveaux.'
    }
  ]
};
