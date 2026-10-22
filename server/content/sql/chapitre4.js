/**
 * Chapitre 4 du cours « SQL » B2 — Agrégation Avancée, GROUP BY, HAVING & Fonctions de Fenêtrage.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Agrégation Avancée, GROUP BY, HAVING &amp; Fonctions de Fenêtrage',
  short: 'Agrégation &amp; Fenêtrage',
  toc: 'Fonctions d’agrégation (COUNT, SUM, AVG, MIN, MAX), regroupement multi-colonnes, filtrage par HAVING, et calculs analytiques de fenêtrage (OVER, PARTITION BY, ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'L’équipe de direction d’une marketplace souhaite obtenir un tableau de bord analytique complexe : ' +
    'le chiffre d’affaires mensuel cumulé depuis le début de l’année par catégorie de produits, ' +
    'le rang des 3 meilleurs vendeurs au sein de chaque région géographique (avec gestion des ex aequo), ' +
    'et la variation en pourcentage des ventes par rapport au mois précédent. ' +
    'Avec de simples clauses GROUP BY, les lignes sont fusionnées, rendant impossible la conservation du détail de chaque vente. ' +
    'Comment exploiter la puissance des fonctions de fenêtrage (Window Functions) introduites par la norme SQL:2003 ' +
    'pour réaliser des calculs partitionnés et ordonnés sans jamais écraser le niveau de granularité des lignes d’origine ? ' +
    'Ce module détaille l’agrégation avancée et l’analyse décisionnelle en SQL moderne.',

  objectives: [
    'maîtriser le fonctionnement interne des fonctions d’agrégation (COUNT, SUM, AVG, MIN, MAX) et leur comportement face aux valeurs NULL ;',
    'distinguer avec une rigueur absolue le rôle du filtre WHERE (sur les lignes individuelles) de celui de HAVING (sur les groupes agrégés) ;',
    'comprendre l’architecture d’une fonction de fenêtrage avec la clause OVER (PARTITION BY ... ORDER BY ... FRAME) ;',
    'comparer et choisir parmi les fonctions de classement : ROW_NUMBER(), RANK(), DENSE_RANK() et NTILE() ;',
    'mettre en œuvre des analyses de séries chronologiques avec les fonctions de décalage LAG() et LEAD() et calculer des cumuls continus.'
  ],

  sections: [
    {
      title: 'Agrégation &amp; Distinction Cruciale entre WHERE et HAVING',
      html: [
        '<p>Les fonctions d’agrégation appliquent une réduction mathématique sur un ensemble de lignes pour produire une valeur unique. ' +
        'Leur combinaison avec la clause <code>GROUP BY</code> partitionne les données en sous-ensembles indépendants.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Comportement face aux valeurs NULL</h4>',
        '    <ul>',
        '      <li><code>COUNT(*)</code> : Compte le nombre total de lignes dans le groupe, qu’elles contiennent des NULLs ou non.</li>',
        '      <li><code>COUNT(colonne)</code> : Ne compte QUE les lignes où la colonne est strictement non-NULL.</li>',
        '      <li><code>SUM(colonne)</code> et <code>AVG(colonne)</code> : Ignorent silencieusement toutes les valeurs NULL (ne les assimilent pas à zéro).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">WHERE vs HAVING</h4>',
        '    <ul>',
        '      <li><strong>WHERE :</strong> Filtrez les lignes <em>avant</em> tout regroupement et calcul d’agrégat. Les fonctions d’agrégation y sont strictement <strong>interdites</strong>.</li>',
        '      <li><strong>HAVING :</strong> Filtrez les groupes <em>après</em> le calcul des agrégats (ex: <code>HAVING COUNT(*) &gt; 5</code> ou <code>HAVING SUM(montant) &ge; 1000</code>).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Introduction aux Fonctions de Fenêtrage (Window Functions &amp; OVER)',
      html: [
        '<p>Contrairement au <code>GROUP BY</code> classique qui fusionne les enregistrements en un tuple unique par groupe, ' +
        'les <strong>fonctions de fenêtrage</strong> (Window Functions) calculent des agrégats et des métriques relatives ' +
        'tout en <strong>conservant l’identité individuelle de chaque ligne</strong>.</p>',

        '<div class="code-block">' +
        'SELECT\n' +
        '    nom_employe,\n' +
        '    departement,\n' +
        '    salaire,\n' +
        '    -- Moyenne calculée sur le département de la ligne courante sans aplatir la table\n' +
        '    AVG(salaire) OVER (PARTITION BY departement) AS salaire_moyen_dept,\n' +
        '    -- Écart de l’employé par rapport à la moyenne de son propre département\n' +
        '    salaire - AVG(salaire) OVER (PARTITION BY departement) AS ecart_moyen\n' +
        'FROM Employes;' +
        '</div>',

        box(
          'Anatomie de la clause OVER(...)',
          '<ul>' +
          '  <li><code>PARTITION BY col1, col2</code> : Découpe la table en fenêtres virtuelles indépendantes (analogue au GROUP BY). Si omis, la fenêtre couvre la table entière.</li>' +
          '  <li><code>ORDER BY col3 ASC/DESC</code> : Définit l’ordre de traitement au sein de la fenêtre (obligatoire pour le classement et les cumuls).</li>' +
          '  <li><code>ROWS BETWEEN ... AND ...</code> : Délimite le cadre (frame) de calcul relatif (ex: 3 lignes précédentes jusqu’à la ligne courante).</li>' +
          '</ul>'
        )
      ].join('\n')
    },
    {
      title: 'Fonctions de Classement &amp; Décalage Temporel (LAG / LEAD)',
      html: [
        '<p>Les fonctions analytiques résolvent les questions métier les plus complexes sans recourir à des sous-requêtes imbriquées lentes :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Fonctions de Classement</h4>',
        '    <ul>',
        '      <li><strong>ROW_NUMBER() :</strong> Numérotation séquentielle stricte (1, 2, 3, 4, 5...) sans doublon même en cas d’égalité.</li>',
        '      <li><strong>RANK() :</strong> Classement avec ex aequo laissant des trous dans la suite (ex: 1, 2, 2, 4).</li>',
        '      <li><strong>DENSE_RANK() :</strong> Classement avec ex aequo sans aucun trou dans la numérotation (ex: 1, 2, 2, 3).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Fonctions de Décalage (LAG &amp; LEAD)</h4>',
        '    <ul>',
        '      <li><strong>LAG(col, n, defaut) :</strong> Accède à la valeur de la colonne située n lignes <em>avant</em> la ligne courante dans la partition ordonnée. Idéal pour comparer avec le mois précédent (M-1).</li>',
        '      <li><strong>LEAD(col, n, defaut) :</strong> Accède à la valeur située n lignes <em>après</em> la ligne courante (M+1).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Quelle est la différence fondamentale entre une fonction de fenêtrage (Window Function) et une clause GROUP BY classique ?',
      opts: [
        'La fonction de fenêtrage conserve chaque ligne individuelle tout en effectuant des calculs sur une partition, alors que GROUP BY fusionne et aplatit les lignes du groupe',
        'Les fonctions de fenêtrage ne fonctionnent que sur des tables temporaires',
        'GROUP BY ne permet pas de faire de somme (SUM)',
        'Les fonctions de fenêtrage s’exécutent avant la clause WHERE'
      ],
      correct: 0,
      exp: 'Une fonction de fenêtrage calcule des métriques sur une partition définie par OVER(...) sans jamais agréger ni réduire le nombre de lignes initialement sélectionnées.'
    },
    {
      stem: 'Dans quelle clause SQL est-il strictement interdit d’utiliser une fonction d’agrégation comme SUM() ou COUNT() ?',
      opts: [
        'Dans la clause WHERE',
        'Dans la clause HAVING',
        'Dans la clause SELECT',
        'Dans la clause ORDER BY'
      ],
      correct: 0,
      exp: 'La clause WHERE s’exécute ligne par ligne avant tout regroupement : les fonctions d’agrégation n’y ont aucun sens et déclenchent une erreur de syntaxe SQL. Il faut utiliser HAVING pour filtrer sur les agrégats.'
    },
    {
      stem: 'Soit trois employés ayant le même salaire le plus élevé de leur entreprise. Quels rangs respectifs attribue la fonction DENSE_RANK() OVER (ORDER BY salaire DESC) à ces trois employés et à l’employé suivant ?',
      opts: [
        '1, 1, 1 puis 2 pour le suivant',
        '1, 1, 1 puis 4 pour le suivant',
        '1, 2, 3 puis 4 pour le suivant',
        '0, 0, 0 puis 1 pour le suivant'
      ],
      correct: 0,
      exp: 'DENSE_RANK attribue le même rang 1 aux trois ex aequo, puis continue la séquence au rang 2 sans interruption. En revanche, RANK() aurait attribué 1, 1, 1 puis 4.'
    },
    {
      stem: 'Que renvoie la fonction COUNT(commission) sur une table de 10 lignes où la colonne commission contient 4 valeurs chiffrées et 6 valeurs NULL ?',
      opts: [
        '4',
        '10',
        '0',
        'NULL'
      ],
      correct: 0,
      exp: 'COUNT(nom_colonne) ne comptabilise que les lignes pour lesquelles la colonne spécifiée est non-NULL (ici 4). À l’inverse, COUNT(*) aurait renvoyé 10.'
    },
    {
      stem: 'À quoi sert la fonction analytique LAG(chiffre_affaires, 1) OVER (ORDER BY mois ASC) ?',
      opts: [
        'À récupérer le chiffre d’affaires du mois précédent pour comparer l’évolution mensuelle sur chaque ligne',
        'À calculer le retard de paiement moyen des clients',
        'À ralentir volontairement l’exécution de la requête',
        'À afficher le chiffre d’affaires du mois suivant'
      ],
      correct: 0,
      exp: 'LAG(col, 1) permet d’accéder à la valeur de la colonne de la ligne immédiatement antérieure selon le tri défini, ce qui permet de calculer des deltas ou taux de croissance temporels.'
    }
  ],

  pitfalls: [
    'Tenter d’utiliser une fonction d’agrégation dans la clause WHERE (ex: WHERE COUNT(*) > 10 au lieu de HAVING COUNT(*) > 10).',
    'Confondre COUNT(*) (qui compte toutes les lignes) et COUNT(colonne) (qui ignore silencieusement les valeurs NULL).',
    'Oublier d’inclure dans le GROUP BY toutes les colonnes non agrégées présentes dans la clause SELECT (erreur classique "not a GROUP BY expression").',
    'Confondre RANK() (qui laisse des sauts dans les rangs en cas d’ex aequo : 1, 2, 2, 4) et DENSE_RANK() (qui reste contigu : 1, 2, 2, 3).',
    'Tenter d’utiliser le résultat d’une fonction de fenêtrage dans la clause WHERE de la même requête (il faut utiliser une CTE ou une sous-requête, car les Window Functions s’évaluent après le WHERE).'
  ],

  methodTitle: 'Protocole en 4 étapes pour concevoir une requête analytique avec fenêtrage',
  method: [
    'Déterminer si la granularité des lignes d’origine doit être conservée (utiliser les fonctions de fenêtrage OVER) ou réduite (utiliser GROUP BY).',
    'Définir la partition logique dans la clause PARTITION BY (ex: par département, par client ou par région).',
    'Spécifier l’ordonnancement indispensable dans la clause ORDER BY de la fenêtre pour donner un sens au rang (ROW_NUMBER) ou au décalage (LAG).',
    'Pour filtrer sur le rang (ex: top 3 des ventes par région), encapsuler la requête dans une expression de table commune (WITH ... AS) et filtrer dans la requête finale.'
  ],

  summary: [
    'Les fonctions d’agrégation (COUNT, SUM, AVG) réduisent un ensemble de lignes en une valeur synthétique en ignorant les NULLs.',
    'La clause WHERE filtre les lignes individuelles avant regroupement, tandis que HAVING filtre les groupes après agrégation.',
    'Les fonctions de fenêtrage (OVER) calculent des agrégats et classements sans jamais perdre le niveau de détail des lignes.',
    'ROW_NUMBER() attribue un identifiant unique contigu, RANK() laisse des sauts en cas d’ex aequo, et DENSE_RANK() reste contigu.',
    'LAG() et LEAD() permettent des comparaisons chronologiques directes de séries temporelles sans jointure externe.'
  ],

  checklist: [
    'Je sais quand utiliser WHERE et quand utiliser HAVING.',
    'Je comprends la différence de résultat entre COUNT(*) et COUNT(colonne) en présence de NULL.',
    'Je maîtrise la syntaxe de base d’une fonction de fenêtrage avec la clause OVER (PARTITION BY ... ORDER BY ...).',
    'Je sais faire le bon choix entre ROW_NUMBER(), RANK() et DENSE_RANK().',
    'Je sais utiliser LAG() pour calculer une variation par rapport à la période antérieure.'
  ],

  notions: [
    'Fonctions d’agrégation (COUNT, SUM, AVG, MIN, MAX)',
    'Clause GROUP BY multi-attributs',
    'Clause de filtrage d’agrégats HAVING',
    'Fonctions de fenêtrage (Window Functions)',
    'Clause OVER (PARTITION BY ... ORDER BY ...)',
    'Fonction de numérotation séquentielle ROW_NUMBER()',
    'Fonctions de classement RANK() et DENSE_RANK()',
    'Fonctions de décalage temporel LAG() et LEAD()'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise impérativement la distinction entre WHERE et HAVING.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la clause OVER et la fonction ROW_NUMBER().' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les subtilités du fenêtrage et des fonctions analytiques.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe aux transactions ACID, à la concurrence et aux verrous au module 5.' }
  ],

  flashcards: [
    { q: 'Quelle est la différence fondamentale entre WHERE et HAVING ?', a: 'WHERE filtre les lignes individuelles avant le calcul des agrégats, alors que HAVING filtre les groupes après le calcul des fonctions d’agrégation.' },
    { q: 'Que fait la clause OVER (PARTITION BY categorie) ?', a: 'Elle applique le calcul analytique indépendamment à chaque sous-ensemble défini par categorie sans fusionner les lignes de la table.' },
    { q: 'Quelle est la différence entre RANK() et DENSE_RANK() ?', a: 'En cas d’ex aequo, RANK() saute des numéros pour refléter le nombre d’éléments (1, 2, 2, 4), alors que DENSE_RANK() reste strictement contigu (1, 2, 2, 3).' },
    { q: 'Que renvoie AVG(note) si une table contient les notes 10, 20 et NULL ?', a: 'Elle renvoie 15 (la moyenne de 10 et 20). En SQL, les fonctions d’agrégation ignorent les NULLs sans les convertir en 0.' },
    { q: 'À quoi sert la fonction analytique LEAD(valeur, 1) ?', a: 'À lire la valeur de la ligne suivante dans la partition ordonnée pour anticiper ou comparer avec l’événement futur.' },
    { q: 'Pourquoi ne peut-on pas écrire WHERE ROW_NUMBER() OVER (...) <= 3 directement ?', a: 'Parce que les fonctions de fenêtrage sont évaluées après la clause WHERE. Il faut passer par une sous-requête ou une CTE (WITH).' }
  ]
};
