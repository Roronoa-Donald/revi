/**
 * Chapitre 2 du cours « SQL » B2 — Manipulation des Données (DML), Filtrage & Fonctions Scalaires.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Manipulation des Données (DML), Filtrage &amp; Fonctions Scalaires',
  short: 'DML, Filtrage &amp; Scalaires',
  toc: 'Instructions DML (INSERT multiple, UPDATE calculé, DELETE), logique tri-valuée de SQL et pièges de NULL (COALESCE), prédicats de filtrage WHERE (BETWEEN, IN, LIKE) et fonctions scalaires de manipulation de chaînes.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un rapport financier mensuel génère des chiffres d’affaires erronés dans une application SaaS. ' +
    'Après inspection, plusieurs clients bénéficient d’une remise de 10 % calculée sur des factures dont le montant est pourtant nul, ' +
    'et des lignes contenant des adresses emails non renseignées sont purement et simplement ignorées par un filtre WHERE email != \'test@domain.com\'. ' +
    'Ce comportement inattendu s’explique par la logique tri-valuée de SQL : en présence de la valeur NULL, ' +
    'une comparaison classique ne renvoie ni VRAI ni FAUX, mais INCONNU (UNKNOWN). ' +
    'Comment manipuler rigoureusement les données avec INSERT, UPDATE et DELETE, dompter la valeur NULL avec COALESCE, ' +
    'et filtrer précisément les enregistrements grâce aux fonctions scalaires et aux expressions LIKE ? ' +
    'Ce module approfondit le Data Manipulation Language (DML) et les finesses de l’évaluation conditionnelle.',

  objectives: [
    'maîtriser la syntaxe avancée des instructions DML (INSERT multi-lignes, UPDATE avec calculs et jointures, DELETE ciblé) ;',
    'expliquer la logique tri-valuée de SQL (TRUE, FALSE, UNKNOWN) et ses conséquences directes sur les clauses WHERE ;',
    'gérer sans risque les valeurs manquantes avec les prédicats IS NULL, IS NOT NULL et la fonction COALESCE ;',
    'combiner des filtres de sélection multi-critères avec AND, OR, NOT, BETWEEN et IN ;',
    'exploiter les fonctions scalaires courantes de manipulation de texte (CONCAT, SUBSTRING, LENGTH, TRIM, UPPER) et l’opérateur LIKE.'
  ],

  sections: [
    {
      title: 'Instructions DML : INSERT Multiple, UPDATE &amp; DELETE',
      html: [
        '<p>Le sous-ensemble DML (Data Manipulation Language) de SQL permet d’insérer, modifier et supprimer les données au sein des tables existantes. ' +
        'Chaque opération s’exécute sous le contrôle des contraintes d’intégrité définies lors du DDL.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. INSERT Multiple (Bulk Insert)</h4>',
        '    <p>Insérer plusieurs enregistrements en une seule requête SQL réduit drastiquement les allers-retours réseau et les coûts de transaction :</p>',
        '    <div class="code-block">' +
        'INSERT INTO Produits (ref, nom, prix, stock)\n' +
        'VALUES\n' +
        '    (\'KB-01\', \'Clavier mécanique\', 89.90, 45),\n' +
        '    (\'MS-02\', \'Souris sans fil\', 49.50, 120),\n' +
        '    (\'MN-03\', \'Écran 27 pouces\', 229.00, 18);' +
        '    </div>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. UPDATE avec calculs relatifs</h4>',
        '    <p>Les mises à jour peuvent combiner des valeurs courantes, des opérations arithmétiques et des clauses conditionnelles :</p>',
        '    <div class="code-block">' +
        'UPDATE Produits\n' +
        'SET prix = ROUND(prix * 1.05, 2),\n' +
        '    mis_a_jour_le = CURRENT_TIMESTAMP\n' +
        'WHERE stock &lt; 20 AND actif = TRUE;' +
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'La Logique Tri-Valuée de SQL &amp; Le Piège de la Valeur NULL',
      html: [
        '<p>En SQL, <code>NULL</code> ne représente pas le nombre zéro ni une chaîne vide : ' +
        'il symbolise <strong>l’absence d’information</strong> ou une valeur inconnue. ' +
        'Par conséquent, SQL applique une <em>logique à trois états</em> (Tri-valued Logic) : <code>TRUE</code>, <code>FALSE</code> et <code>UNKNOWN</code>.</p>',

        '<table class="table-compact">',
        '  <thead><tr><th>Expression SQL</th><th>Résultat de l’évaluation</th><th>Explication</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>NULL = NULL</code></td><td><strong>UNKNOWN</strong></td><td>Deux inconnues ne sont pas nécessairement égales.</td></tr>',
        '    <tr><td><code>prix = 100</code> (si prix est NULL)</td><td><strong>UNKNOWN</strong></td><td>On ne peut pas affirmer que la valeur inconnue vaut 100.</td></tr>',
        '    <tr><td><code>WHERE commission &gt; 0</code></td><td>Ligne <strong>exclue</strong></td><td>Une clause WHERE ne retient QUE les lignes dont le prédicat s’évalue à <code>TRUE</code> (UNKNOWN est rejeté).</td></tr>',
        '    <tr><td><code>WHERE commission &le; 0</code></td><td>Ligne <strong>exclue</strong> également !</td><td>L’inconnu n’est ni supérieur, ni inférieur, ni égal.</td></tr>',
        '    <tr><td><code>WHERE commission IS NULL</code></td><td><strong>TRUE</strong></td><td>Prédicat unitaire correct pour détecter l’absence de valeur.</td></tr>',
        '  </tbody>',
        '</table>',

        box(
          'La fonction universelle COALESCE',
          '<p>La fonction standard <code>COALESCE(val1, val2, ..., defaut)</code> évalue ses arguments de gauche à droite ' +
          'et renvoie la première valeur non-NULL rencontrée. C’est l’outil idéal pour sécuriser les calculs arithmétiques ' +
          'et fournir des valeurs de remplacement lisibles :</p>' +
          '<div class="code-block">' +
          'SELECT nom, COALESCE(telephone_mobile, telephone_fixe, \'Non renseigné\') AS contact\n' +
          'FROM Clients;' +
          '</div>'
        )
      ].join('\n')
    },
    {
      title: 'Prédicats de Filtrage &amp; Fonctions Scalaires de Chaînes',
      html: [
        '<p>Le filtrage précis des enregistrements dans la clause WHERE s’appuie sur des opérateurs expressifs :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Prédicats BETWEEN, IN &amp; LIKE</h4>',
        '    <ul>',
        '      <li><strong>BETWEEN min AND max :</strong> Équivaut à <code>col &ge; min AND col &le; max</code> (bornes inclusives).</li>',
        '      <li><strong>IN (val1, val2, ...) :</strong> Vérifie l’appartenance à un ensemble discret de valeurs ou au résultat d’une sous-requête.</li>',
        '      <li><strong>LIKE \'motif\' :</strong> Recherche textuelle avec jokers : <code>%</code> (0..N caractères) et <code>_</code> (exactement 1 caractère).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Fonctions scalaires courantes</h4>',
        '    <ul>',
        '      <li><strong>CONCAT(s1, s2, ...) :</strong> Concatène plusieurs chaînes (gère les NULLs selon le SGBD).</li>',
        '      <li><strong>UPPER(s) / LOWER(s) :</strong> Conversion de casse pour comparaisons insensibles.</li>',
        '      <li><strong>SUBSTRING(s FROM start FOR len) :</strong> Extraction d’une sous-chaîne.</li>',
        '      <li><strong>TRIM(s) / LENGTH(s) :</strong> Suppression des espaces superflus et mesure de la longueur.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Que renvoie l’évaluation de l’expression booléenne (valeur = NULL) en SQL standard si la colonne valeur contient NULL ?',
      opts: [
        'UNKNOWN',
        'TRUE',
        'FALSE',
        'NULL_POINTER_EXCEPTION'
      ],
      correct: 0,
      exp: 'En SQL standard, l’égalité avec NULL ne produit jamais TRUE ou FALSE mais UNKNOWN (la valeur inconnue). Pour tester la nullité, il faut impérativement utiliser le prédicat IS NULL.'
    },
    {
      stem: 'Dans une clause WHERE, que se passe-t-il pour une ligne dont la condition s’évalue à UNKNOWN ?',
      opts: [
        'La ligne est exclue du résultat final (car seule une évaluation à TRUE permet la sélection)',
        'La ligne est incluse par précaution',
        'La requête s’interrompt avec une erreur d’exécution',
        'La valeur de la colonne est automatiquement remplacée par zéro'
      ],
      correct: 0,
      exp: 'La clause WHERE ne retient une ligne que si l’expression conditionnelle s’évalue strictement à TRUE. Tout résultat valant FALSE ou UNKNOWN entraîne l’exclusion immédiate de la ligne.'
    },
    {
      stem: 'Que renvoie l’appel à la fonction COALESCE(NULL, NULL, \'contact@domain.com\', \'aucun\') ?',
      opts: [
        '\'contact@domain.com\'',
        'NULL',
        '\'aucun\'',
        'Une liste contenant les 4 éléments'
      ],
      correct: 0,
      exp: 'COALESCE parcourt les arguments dans l’ordre de gauche à droite et renvoie le premier élément non-NULL rencontré, ici \'contact@domain.com\'.'
    },
    {
      stem: 'Quel motif SQL LIKE permet de trouver tous les mots commençant par la lettre \'C\', se terminant par \'R\', et ayant exactement 3 caractères au total ?',
      opts: [
        '\'C_R\'',
        '\'C%R\'',
        '\'C__R\'',
        '\'C?R\''
      ],
      correct: 0,
      exp: 'Dans l’opérateur LIKE, le tiret bas \'_\' remplace exactement un caractère unique. Le motif \'C_R\' correspond donc à un texte de 3 caractères débutant par C et finissant par R (ex: CAR, COR).'
    },
    {
      stem: 'Quelle instruction permet d’insérer plusieurs lignes en une seule opération SQL (Bulk Insert) ?',
      opts: [
        'INSERT INTO table (cols) VALUES (ligne1), (ligne2), (ligne3);',
        'INSERT MULTIPLE INTO table VALUES (ligne1), (ligne2);',
        'UPDATE table SET (cols) = (ligne1), (ligne2);',
        'CREATE ROWS (ligne1), (ligne2) IN table;'
      ],
      correct: 0,
      exp: 'La clause VALUES d’un INSERT INTO standard peut recevoir une liste de tuples séparés par des virgules pour insérer plusieurs enregistrements en un seul appel.'
    }
  ],

  pitfalls: [
    'Écrire WHERE colonne = NULL au lieu de WHERE colonne IS NULL, ce qui garantit qu’aucune ligne ne sera jamais renvoyée.',
    'Effectuer un UPDATE sans clause WHERE sur une table de production, écrasant d’un coup l’intégralité des données de tous les utilisateurs.',
    'Oublier que l’opérateur BETWEEN inclut les bornes (BETWEEN 1 AND 10 comprend 1 et 10).',
    'Additionner une colonne nullable avec un nombre (ex: salaire + prime) sans utiliser COALESCE(prime, 0) : si prime vaut NULL, le résultat de l’addition devient NULL !',
    'Penser que l’opérateur LIKE est insensible à la casse sur tous les SGBD : PostgreSQL distingue LIKE (sensible) de ILIKE (insensible).'
  ],

  methodTitle: 'Protocole en 4 étapes pour sécuriser les requêtes DML et les filtres avec NULL',
  method: [
    'Avant tout UPDATE ou DELETE, exécuter d’abord la requête en SELECT avec la même clause WHERE pour vérifier visuellement le périmètre exact des lignes ciblées.',
    'Sécuriser systématiquement les colonnes optionnelles impliquées dans des calculs arithmétiques avec COALESCE(colonne, 0).',
    'Tester l’absence ou la présence de valeur exclusivement avec les prédicats dédiés IS NULL et IS NOT NULL.',
    'Encadrer les opérations DML sensibles à l’intérieur d’un bloc de transaction explicite (BEGIN / COMMIT) pour pouvoir annuler par ROLLBACK en cas d’imprévu.'
  ],

  summary: [
    'Le DML manipule le contenu des tables : INSERT (avec forme multi-lignes), UPDATE et DELETE.',
    'La logique tri-valuée de SQL gère trois états booléens : TRUE, FALSE et UNKNOWN.',
    'Toute comparaison directe avec NULL via les opérateurs =, !=, < ou > s’évalue à UNKNOWN.',
    'La fonction standard COALESCE() est la solution de référence pour substituer des valeurs de repli aux valeurs NULL.',
    'Les prédicats BETWEEN, IN et LIKE (avec % et _) permettent des sélections granulaires et expressives.'
  ],

  checklist: [
    'Je sais écrire un INSERT multi-lignes efficace.',
    'Je comprends pourquoi WHERE col = NULL ne sélectionne aucune ligne.',
    'Je sais utiliser COALESCE pour prévenir la propagation indésirable de valeurs NULL dans les calculs.',
    'Je maîtrise l’usage des caractères jokers % et _ dans l’opérateur LIKE.',
    'Je sais formuler des clauses WHERE combinant AND, OR et parenthèses sans ambiguïté.'
  ],

  notions: [
    'Data Manipulation Language (DML)',
    'INSERT multi-lignes (Bulk Insert)',
    'Mises à jour calculées (UPDATE ... SET)',
    'Suppression ciblée (DELETE FROM ... WHERE)',
    'Logique tri-valuée (True, False, Unknown)',
    'Sémantique de la valeur NULL en base relationnelle',
    'Prédicats IS NULL et IS NOT NULL',
    'Fonction de substitution COALESCE()',
    'Opérateur de recherche LIKE et caractères jokers (% et _)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois impérativement le comportement de NULL et la fonction COALESCE.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’opérateur LIKE et les filtres combinés dans WHERE.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les subtilités du DML et de l’évaluation booléenne.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe aux jointures multi-tables et sous-requêtes au module 3.' }
  ],

  flashcards: [
    { q: 'Pourquoi l’expression NULL = NULL ne renvoie-t-elle pas TRUE ?', a: 'Parce que NULL représente une valeur inconnue : on ne peut affirmer que deux informations inconnues sont identiques. L’expression s’évalue donc à UNKNOWN.' },
    { q: 'Que fait la fonction COALESCE(a, b, c) ?', a: 'Elle renvoie la première valeur non-NULL parmi ses arguments, évalués de gauche à droite.' },
    { q: 'Quelle est la différence entre les jokers % et _ dans l’opérateur LIKE ?', a: '% remplace n’importe quelle suite de 0 à N caractères, alors que _ remplace rigoureusement un unique caractère.' },
    { q: 'Que devient le résultat de l’opération arithmétique 100 + NULL ?', a: 'NULL. En SQL, toute opération arithmétique impliquant NULL produit NULL (l’inconnu se propage).' },
    { q: 'Pourquoi une clause WHERE rejette-t-elle les lignes pour lesquelles la condition vaut UNKNOWN ?', a: 'Parce qu’une clause WHERE n’accepte que les enregistrements pour lesquels l’expression booléenne est strictement TRUE.' },
    { q: 'Que garantit l’instruction BETWEEN 10 AND 20 ?', a: 'Elle sélectionne les valeurs comprises entre 10 et 20 inclus (équivalent à col >= 10 AND col <= 20).' }
  ]
};
