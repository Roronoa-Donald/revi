/**
 * Chapitre 3 du cours « SQL » B2 — Jointures Multi-tables, Sous-requêtes & Expressions Conditionnelles.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Jointures Multi-tables, Sous-requêtes &amp; Expressions Conditionnelles',
  short: 'Jointures &amp; Sous-requêtes',
  toc: 'Algèbre relationnelle des jointures (INNER, LEFT, RIGHT, FULL, CROSS, SELF JOIN), sous-requêtes scalaires et corrélées (EXISTS, NOT EXISTS, IN), et logique conditionnelle avancée avec l’expression CASE WHEN.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une plateforme de réservation hôtelière en ligne doit générer la liste des chambres qui n’ont fait l’objet ' +
    'd’aucune réservation au cours des 30 derniers jours, tout en affichant le statut de fidélité calculé de chaque client ' +
    'et la hiérarchie des responsables d’agences rattachés à chaque hôtel. ' +
    'Une simple requête sur une table unique est impuissante face à ce besoin métier transverse. ' +
    'Comment relier les tables sans perdre les entités sans correspondance grâce aux jointures externes (LEFT / FULL OUTER JOIN) ? ' +
    'Comment modéliser une hiérarchie managériale interne avec une auto-jointure (SELF JOIN) ? ' +
    'Pourquoi l’opérateur EXISTS sur sous-requête corrélée est-il infiniment plus performant et sûr que NOT IN en présence de valeurs NULL ? ' +
    'Ce module détaille l’art d’interroger plusieurs tables interconnectées en SQL relationnel.',

  objectives: [
    'distinguer et mettre en œuvre les 5 grands types de jointures : INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN et CROSS JOIN ;',
    'concevoir une auto-jointure (SELF JOIN) pour modéliser des structures arborescentes (organigrammes, hiérarchies de catégories) ;',
    'différencier le filtrage dans la clause ON de la jointure du filtrage dans la clause WHERE générale ;',
    'exploiter les sous-requêtes scalaires, en liste (IN / NOT IN) et corrélées avec le prédicat de test d’existence EXISTS / NOT EXISTS ;',
    'construire des colonnes calculées dynamiques et classer des profils grâce à l’expression conditionnelle CASE WHEN.'
  ],

  sections: [
    {
      title: 'Algèbre des Jointures : Du Produit Cartésien aux Jointures Externes',
      html: [
        '<p>Dans une base de données normalisée, les informations sont réparties dans plusieurs tables pour éliminer les redondances. ' +
        'Les jointures permettent de recombiner ces fragments à la volée selon des clés de correspondance communes.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. INNER JOIN (Intersection A ∩ B)</h4>',
        '    <p>Ne conserve que les lignes pour lesquelles la condition de correspondance est satisfaite dans les <em>deux</em> tables :</p>',
        '    <div class="code-block">' +
        'SELECT c.nom, cmd.id_cmd, cmd.montant\n' +
        'FROM Clients c\n' +
        'INNER JOIN Commandes cmd ON c.id = cmd.client_id;' +
        '    </div>',
        '    <p>Un client n’ayant passé aucune commande n’apparaît pas dans le résultat.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. LEFT OUTER JOIN (Conservation gauche)</h4>',
        '    <p>Conserve <strong>toutes</strong> les lignes de la table de gauche (Clients), même si aucune ligne correspondante n’existe à droite :</p>',
        '    <div class="code-block">' +
        'SELECT c.nom, cmd.id_cmd, cmd.montant\n' +
        'FROM Clients c\n' +
        'LEFT JOIN Commandes cmd ON c.id = cmd.client_id;' +
        '    </div>',
        '    <p>Les colonnes de la table droite sont complétées par <code>NULL</code> en l’absence de commande.</p>',
        '  </div>',
        '</div>',

        '<h4>L’Auto-Jointure (SELF JOIN)</h4>',
        '<p>Lorsqu’une table possède une clé étrangère pointant vers sa propre clé primaire (ex: un employé et son manager dans la même table <code>Employes</code>), on réalise une jointure de la table avec elle-même en utilisant des alias distincts :</p>',

        '<div class="code-block">' +
        'SELECT e.nom AS employe, m.nom AS manager\n' +
        'FROM Employes e\n' +
        'LEFT JOIN Employes m ON e.manager_id = m.id;' +
        '</div>'
      ].join('\n')
    },
    {
      title: 'Sous-requêtes Corrélées &amp; Le Prédicat EXISTS vs NOT IN',
      html: [
        '<p>Une <strong>sous-requête</strong> (subquery) est une requête SELECT imbriquée dans une autre requête principale. ' +
        'Lorsque la sous-requête fait référence à une colonne de la requête englobante, elle est dite <em>corrélée</em> : ' +
        'elle est réévaluée pour chaque ligne candidate de la requête externe.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Prédicat EXISTS (Test d’existence)</h4>',
        '    <p>S’évalue à TRUE dès que la sous-requête renvoie au moins un enregistrement (court-circuit dès la première ligne trouvée) :</p>',
        '    <div class="code-block">' +
        'SELECT c.nom\n' +
        'FROM Clients c\n' +
        'WHERE EXISTS (\n' +
        '    SELECT 1 FROM Commandes cmd\n' +
        '    WHERE cmd.client_id = c.id AND cmd.total &gt; 1000\n' +
        ');' +
        '    </div>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Le danger mortel de NOT IN avec NULL</h4>',
        '    <p>Si une sous-requête utilisée avec <code>NOT IN</code> contient une seule valeur NULL, l’expression entière s’évalue à UNKNOWN pour toutes les lignes : <strong>aucun résultat n’est renvoyé !</strong></p>',
        '    <p><em>Règle d’or :</em> Privilégiez systématiquement <code>NOT EXISTS</code> à <code>NOT IN</code> pour tester l’absence de liaison.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Expressions Conditionnelles : L’Instruction CASE WHEN',
      html: [
        '<p>L’expression <code>CASE WHEN</code> équivaut à une structure conditionnelle <em>if / else-if / else</em> au sein même d’une projection SQL. ' +
        'Les conditions sont examinées séquentiellement, et la première condition vérifiée détermine la valeur de retour :</p>',

        '<div class="code-block">' +
        'SELECT\n' +
        '    ref_produit,\n' +
        '    stock,\n' +
        '    CASE\n' +
        '        WHEN stock = 0 THEN \'Rupture de stock\'\n' +
        '        WHEN stock &lt; 10 THEN \'Alerte réapprovisionnement\'\n' +
        '        WHEN stock &lt; 50 THEN \'Stock modéré\'\n' +
        '        ELSE \'Stock optimal\'\n' +
        '    END AS etat_inventaire\n' +
        'FROM Produits;' +
        '</div>',

        box(
          'Différence clé : Filtrer dans ON vs Filtrer dans WHERE sur un LEFT JOIN',
          '<p>Dans un <code>LEFT JOIN</code>, placer une condition dans la clause <code>ON</code> ou dans la clause <code>WHERE</code> change radicalement le sens de la requête :</p>' +
          '<ul>' +
          '  <li><code>ON c.id = cmd.client_id AND cmd.statut = \'LIVREE\'</code> : Tous les clients sont conservés. Pour les clients n’ayant pas de commande livrée, les colonnes de commande valent NULL.</li>' +
          '  <li><code>WHERE cmd.statut = \'LIVREE\'</code> : Cette condition s’applique <em>après</em> la jointure. Les lignes ayant NULL pour statut sont éliminées, transformant de fait le LEFT JOIN en un INNER JOIN !</li>' +
          '</ul>'
        )
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Dans une requête SQL reliant Clients c et Commandes cmd avec un LEFT JOIN, comment filtrer pour n’obtenir QUE les clients qui n’ont AUCUNE commande ?',
      opts: [
        'En ajoutant la clause WHERE cmd.id IS NULL',
        'En utilisant un INNER JOIN avec WHERE cmd.id = 0',
        'En écrivant WHERE c.id = NULL',
        'En remplaçant le LEFT JOIN par un CROSS JOIN'
      ],
      correct: 0,
      exp: 'Dans un LEFT JOIN, les clients sans commande ont leurs attributs de commande remplis avec NULL. La clause WHERE cmd.id IS NULL isole exactement cette population sans commande (technique de l’anti-jointure).'
    },
    {
      stem: 'Pourquoi l’utilisation de NOT IN avec une sous-requête est-elle considérée comme un piège majeur en SQL ?',
      opts: [
        'Si la sous-requête renvoie ne serait-ce qu’une seule valeur NULL, l’expression NOT IN renvoie UNKNOWN pour toutes les lignes et le résultat final est vide',
        'NOT IN n’est pas supporté par le standard SQL ANSI',
        'NOT IN modifie automatiquement les données de la table',
        'NOT IN empêche l’utilisation de clés primaires'
      ],
      correct: 0,
      exp: 'En logique tri-valuée, \'valeur NOT IN (1, 2, NULL)\' équivaut à \'valeur != 1 AND valeur != 2 AND valeur != NULL\'. Comme toute comparaison avec NULL vaut UNKNOWN, le résultat de la conjonction devient UNKNOWN et aucune ligne n’est sélectionnée.'
    },
    {
      stem: 'Quel type de jointure associe chaque ligne de la table A à absolument toutes les lignes de la table B sans condition de correspondance ?',
      opts: [
        'CROSS JOIN (Produit cartésien)',
        'INNER JOIN',
        'NATURAL JOIN',
        'SELF JOIN'
      ],
      correct: 0,
      exp: 'Le CROSS JOIN génère le produit cartésien complet : si la table A contient 10 lignes et la table B 50 lignes, le résultat comprend exactement 500 lignes associant chaque élément de A à chaque élément de B.'
    },
    {
      stem: 'Quelle est la particularité d’une auto-jointure (SELF JOIN) ?',
      opts: [
        'Elle joint une table avec elle-même en utilisant deux alias différents pour distinguer les rôles',
        'Elle s’exécute sans passer par le moteur de base de données',
        'Elle ne fonctionne qu’avec des tables temporaires en mémoire',
        'Elle interdit l’usage de la clause WHERE'
      ],
      correct: 0,
      exp: 'Une auto-jointure applique le mécanisme relationnel classique sur une seule et même table physique (ex: Employes e LEFT JOIN Employes m ON e.manager_id = m.id), ce qui exige impérativement des alias distincts.'
    },
    {
      stem: 'Dans une expression conditionnelle CASE WHEN ... THEN ... ELSE ... END, que se passe-t-il si aucune condition WHEN n’est vérifiée et que la clause ELSE est omise ?',
      opts: [
        'L’expression renvoie NULL',
        'La requête s’interrompt avec une erreur d’exécution',
        'L’expression renvoie 0',
        'L’expression renvoie une chaîne vide \'\''
      ],
      correct: 0,
      exp: 'En SQL standard, si aucune clause WHEN n’est satisfaite et qu’aucun bloc ELSE explicite n’est fourni, la valeur retournée par l’expression CASE est implicitement NULL.'
    }
  ],

  pitfalls: [
    'Placer un filtre sur la table de droite dans la clause WHERE d’un LEFT JOIN, ce qui élimine les NULLs et convertit silencieusement la jointure en INNER JOIN.',
    'Utiliser NOT IN (SELECT col FROM ...) au lieu de NOT EXISTS lorsque la sous-requête est susceptible de contenir des valeurs NULL.',
    'Oublier les alias de tables lors d’une auto-jointure (SELF JOIN), rendant les noms de colonnes ambigus et provoquant une erreur de compilation SQL.',
    'Faire un CROSS JOIN involontaire en écrivant FROM TableA, TableB sans clause WHERE ou ON, provoquant une explosion combinatoire du volume de données.',
    'Confondre la sous-requête corrélée (exécutée pour chaque ligne de la requête externe) avec la sous-requête indépendante (exécutée une seule fois au préalable).'
  ],

  methodTitle: 'Protocole en 4 étapes pour concevoir une jointure complexe sans régression',
  method: [
    'Identifier la table pivot de référence : si toutes ses lignes doivent être conservées quoi qu’il arrive, démarrer par un LEFT JOIN.',
    'Exprimer les critères de rapprochement dans la clause ON (clés primaires et clés étrangères).',
    'Distinguer soigneusement les conditions de jointure (dans ON) des conditions de filtrage final de la population (dans WHERE).',
    'Pour les tests d’exclusion (recherche d’éléments sans correspondance), privilégier NOT EXISTS avec sous-requête corrélée ou LEFT JOIN avec WHERE droit IS NULL.'
  ],

  summary: [
    'L’INNER JOIN sélectionne l’intersection stricte ; le LEFT JOIN conserve l’intégralité de la table de gauche.',
    'L’auto-jointure (SELF JOIN) modélise les relations récursives et hiérarchiques au sein d’une même table grâce aux alias.',
    'Les sous-requêtes corrélées s’évaluent dynamiquement en fonction du contexte de la ligne externe.',
    'L’opérateur EXISTS avec sous-requête corrélée offre une robustesse et des performances supérieures face aux valeurs NULL par rapport à NOT IN.',
    'L’expression CASE WHEN offre la puissance d’une structure conditionnelle if-then-else intégrée directement aux requêtes SQL.'
  ],

  checklist: [
    'Je sais choisir entre INNER JOIN, LEFT JOIN et FULL OUTER JOIN selon le besoin métier.',
    'Je comprends la différence sémantique entre une condition dans ON et dans WHERE lors d’un LEFT JOIN.',
    'Je sais écrire une auto-jointure (SELF JOIN) pour naviguer dans une hiérarchie managériale.',
    'Je connais le risque de résultat vide avec NOT IN en présence de NULL et je sais utiliser NOT EXISTS en remplacement.',
    'Je sais formuler une expression CASE WHEN avec plusieurs branches et valeur par défaut.'
  ],

  notions: [
    'Algèbre relationnelle des jointures',
    'Jointure interne (INNER JOIN)',
    'Jointure externe gauche (LEFT OUTER JOIN)',
    'Anti-jointure (WHERE cle_droite IS NULL)',
    'Auto-jointure (SELF JOIN) et modélisation hiérarchique',
    'Produit cartésien (CROSS JOIN)',
    'Sous-requêtes indépendantes vs corrélées',
    'Prédicats EXISTS et NOT EXISTS',
    'Expression conditionnelle CASE WHEN THEN ELSE END'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la différence fondamentale entre INNER JOIN et LEFT JOIN.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur l’anti-jointure et le remplacement de NOT IN par NOT EXISTS.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les jointures multi-tables et la logique conditionnelle.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe aux fonctions d’agrégation avancées et au fenêtrage au module 4.' }
  ],

  flashcards: [
    { q: 'Quelle est la différence entre INNER JOIN et LEFT JOIN ?', a: 'INNER JOIN ne retourne que les lignes ayant une correspondance dans les deux tables, alors que LEFT JOIN retourne toutes les lignes de la table de gauche complétées par NULL à droite si besoin.' },
    { q: 'Comment fonctionne une anti-jointure pour trouver les clients sans commande ?', a: 'On effectue un LEFT JOIN de Clients vers Commandes et on ajoute la condition WHERE Commandes.id IS NULL.' },
    { q: 'Pourquoi préférer NOT EXISTS à NOT IN lors d’une sous-requête ?', a: 'Parce que si la sous-requête renvoie au moins un NULL, NOT IN produit UNKNOWN et ne retourne aucune ligne, alors que NOT EXISTS gère parfaitement les NULLs.' },
    { q: 'Qu’est-ce qu’une auto-jointure (SELF JOIN) ?', a: 'C’est une jointure d’une table avec elle-même, indispensable pour naviguer dans des structures arborescentes (ex: employé rattaché à son manager dans la même table).' },
    { q: 'Dans un LEFT JOIN, quelle est la conséquence de placer une condition sur la table droite dans WHERE au lieu de ON ?', a: 'Cela élimine toutes les lignes où la table droite valait NULL, transformant de fait le LEFT JOIN en un simple INNER JOIN.' },
    { q: 'Que renvoie CASE WHEN condition THEN A ELSE B END si condition est fausse ?', a: 'L’expression renvoie la valeur de la branche ELSE, c’est-à-dire B (ou NULL si la clause ELSE est absente).' }
  ]
};
