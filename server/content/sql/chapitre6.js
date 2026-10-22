/**
 * Chapitre 6 du cours « SQL » B2 — Vues, Procédures Stockées, Déclencheurs (Triggers) & Optimisation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Vues, Procédures Stockées, Déclencheurs (Triggers) &amp; Optimisation',
  short: 'Vues, Triggers &amp; Optimisation',
  toc: 'Vues simples et matérialisées, programmabilité côté serveur (fonctions et procédures stockées), déclencheurs événementiels (BEFORE/AFTER, NEW/OLD), et optimisation physique par index B-Tree et analyse de plans d’exécution EXPLAIN.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une application de gestion commerciale subit de graves ralentissements lors des heures de pointe : ' +
    'certaines requêtes SELECT mettent plus de 15 secondes à répondre en scannant séquentiellement une table de 10 millions de factures, ' +
    'et la logique d’audit des modifications de prix est dupliquée maladroitement dans trois microservices différents en Node.js, Python et Java. ' +
    'Pour résoudre ces goulets d’étranglement, l’ingénieur base de données doit centraliser les règles métier au plus près des données ' +
    'grâce aux déclencheurs (triggers) et procédures stockées, ' +
    'simplifier les accès aux données agrégées avec des vues matérialisées, ' +
    'et diagnostiquer les coûts d’exécution grâce à la commande EXPLAIN ANALYZE afin d’implanter les index B-Tree pertinents. ' +
    'Ce dernier module couronne le cursus SQL B2 par la maîtrise de la performance et de l’architecture serveur.',

  objectives: [
    'concevoir des vues relationnelles standard et exploiter les vues matérialisées pour précalculer des agrégations lourdes ;',
    'comprendre le rôle des procédures stockées et fonctions serveur pour encapsuler la logique métier critique ;',
    'écrire des déclencheurs (Triggers) BEFORE et AFTER manipulant les pseudo-enregistrements NEW et OLD à des fins de validation et d’audit ;',
    'analyser la structure interne des index B-Tree et leurs cas d’usage (index simples, composites, partiels) ;',
    'déchiffrer un plan d’exécution SQL (EXPLAIN / EXPLAIN ANALYZE) pour traquer les parcours séquentiels (Seq Scan) pénalisants.'
  ],

  sections: [
    {
      title: 'Vues Relationnelles &amp; Vues Matérialisées',
      html: [
        '<p>Une <strong>vue</strong> (VIEW) est une table virtuelle définie par une requête SELECT stockée dans le dictionnaire du SGBD. ' +
        'Elle ne stocke aucune donnée physique par défaut : à chaque consultation, la requête sous-jacente est exécutée.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Vues Standard (Sécurité &amp; Abstraction)</h4>',
        '    <p>Permet de masquer la complexité des jointures et de restreindre l’accès aux colonnes confidentielles (ex: masquer le mot de passe) :</p>',
        '    <div class="code-block">' +
        'CREATE VIEW v_clients_actifs AS\n' +
        'SELECT id, nom, email, ville\n' +
        'FROM Clients\n' +
        'WHERE actif = TRUE;' +
        '    </div>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Vues Matérialisées (Performance Analytique)</h4>',
        '    <p>Stocke <em>physiquement</em> le résultat sur disque. Idéal pour des tableaux de bord analytiques complexes réactualisés périodiquement :</p>',
        '    <div class="code-block">' +
        'CREATE MATERIALIZED VIEW mv_ca_mensuel AS\n' +
        'SELECT date_trunc(\'month\', date_cmd) AS mois, SUM(total) AS ca\n' +
        'FROM Commandes GROUP BY 1;\n' +
        '-- Rafraîchissement manuel ou planifié :\n' +
        'REFRESH MATERIALIZED VIEW mv_ca_mensuel;' +
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Déclencheurs (Triggers) : Automatisation &amp; Tables d’Audit',
      html: [
        '<p>Un <strong>déclencheur</strong> (Trigger) est une procédure automatiquement exécutée par le moteur du SGBD ' +
        'lorsqu’un événement spécifique survient sur une table (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>).</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">BEFORE vs AFTER</h4>',
        '    <ul>',
        '      <li><strong>BEFORE :</strong> S’exécute <em>avant</em> la modification physique. Utilisé pour valider des données, forcer des valeurs par défaut ou lever une erreur bloquante.</li>',
        '      <li><strong>AFTER :</strong> S’exécute <em>après</em> la validation de l’opération. Utilisé pour alimenter des tables de traçabilité (audit logs) ou synchroniser d’autres tables.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Les variables NEW et OLD</h4>',
        '    <ul>',
        '      <li><strong>NEW :</strong> Représente le nouvel enregistrement proposé (disponible lors de INSERT et UPDATE).</li>',
        '      <li><strong>OLD :</strong> Représente l’état existant avant modification (disponible lors de UPDATE et DELETE).</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        '<div class="code-block">' +
        'CREATE TRIGGER trg_audit_prix\n' +
        'AFTER UPDATE ON Produits\n' +
        'FOR EACH ROW\n' +
        'BEGIN\n' +
        '    IF OLD.prix != NEW.prix THEN\n' +
        '        INSERT INTO HistoriquePrix (produit_id, ancien_prix, nouveau_prix, modifie_le)\n' +
        '        VALUES (OLD.id, OLD.prix, NEW.prix, CURRENT_TIMESTAMP);\n' +
        '    END IF;\n' +
        'END;' +
        '</div>'
      ].join('\n')
    },
    {
      title: 'Optimisation Physique, Index B-Tree &amp; Plans d’Exécution EXPLAIN',
      html: [
        '<p>Par défaut, pour trouver une ligne dans une table sans index, le SGBD doit inspecter chaque bloc de données du disque : ' +
        'c’est le <strong>parcours séquentiel</strong> (Sequential Scan / Table Scan), dont le coût est proportionnel à la taille <code>O(N)</code>.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">L’Index B-Tree (Arbre Équilibré)</h4>',
        '    <p>Structure d’arbre hiérarchique triée stockant les clés et les pointeurs vers les blocs physiques. ' +
        '    Permet de localiser n’importe quel enregistrement en un nombre d’accès constant et minuscule <code>O(log N)</code> :</p>',
        '    <div class="code-block">' +
        'CREATE INDEX idx_clients_email ON Clients(email);\n' +
        '-- Index composite (respecter la règle du préfixe à gauche) :\n' +
        'CREATE INDEX idx_cmd_date_client ON Commandes(date_cmd, client_id);' +
        '    </div>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">L’Analyse avec EXPLAIN</h4>',
        '    <p>La commande <code>EXPLAIN</code> dévoile la stratégie choisie par le planificateur de requêtes :</p>',
        '    <ul>',
        '      <li><code>Index Scan</code> : Parcours ultra-rapide via l’arbre d’index.</li>',
        '      <li><code>Seq Scan</code> : Parcours intégral de la table. Si une requête filtrée sur une colonne fait un Seq Scan, il manque un index !</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        box(
          'Attention au piège de l’index neutralisé par une fonction',
          '<p>Si vous écrivez <code>WHERE UPPER(nom) = \'DUPONT\'</code>, un index ordinaire sur <code>nom</code> est totalement ignoré par le SGBD ' +
          'car la fonction <code>UPPER()</code> est appliquée à chaque ligne lors de l’évaluation ! ' +
          'Pour optimiser cette requête, il faut créer un <em>index fonctionnel</em> dédié :</p>' +
          '<div class="code-block">CREATE INDEX idx_clients_nom_upper ON Clients(UPPER(nom));</div>'
        )
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Quelle est la différence fondamentale entre une vue standard (CREATE VIEW) et une vue matérialisée (CREATE MATERIALIZED VIEW) ?',
      opts: [
        'La vue standard réexécute sa requête à chaque appel sans stocker de données, alors que la vue matérialisée stocke physiquement le résultat sur disque',
        'La vue standard ne peut interroger qu’une seule table',
        'La vue matérialisée ne peut être consultée que par les administrateurs',
        'La vue standard ne supporte pas la clause WHERE'
      ],
      correct: 0,
      exp: 'Une vue standard est une simple définition de requête qui n’occupe aucun espace de stockage. Une vue matérialisée enregistre physiquement les données calculées sur disque pour accélérer les consultations massives au prix d’un rafraîchissement (REFRESH) périodique.'
    },
    {
      stem: 'Dans un déclencheur SQL de type BEFORE INSERT, que représente la pseudo-variable NEW ?',
      opts: [
        'Le nouvel enregistrement en cours d’insertion dont les valeurs peuvent être lues et modifiées avant écriture',
        'L’état précédent de la ligne qui va être écrasée',
        'Le nom de l’utilisateur ayant initié la connexion',
        'L’identifiant de la transaction courante'
      ],
      correct: 0,
      exp: 'Dans un trigger BEFORE/AFTER INSERT ou UPDATE, NEW contient les données de la ligne candidate. En mode BEFORE, le trigger peut valider ou même rectifier directement les attributs de NEW (ex: forcer un stock négatif à 0) avant l’écriture sur disque.'
    },
    {
      stem: 'Pourquoi une condition telle que WHERE YEAR(date_commande) = 2026 peut-elle transformer un Index Scan rapide en un Seq Scan très lent sur une table de 5 millions de lignes ?',
      opts: [
        'Parce que l’application d’une fonction scalaire sur la colonne empêche le planificateur d’utiliser un index B-Tree classique posé sur date_commande',
        'Parce que l’année 2026 est dans le futur',
        'Parce que les dates ne peuvent pas être indexées',
        'Parce que la fonction YEAR() verrouille la table'
      ],
      correct: 0,
      exp: 'Enveloppe la colonne dans une fonction (YEAR(col)) oblige le SGBD à évaluer la fonction pour chaque ligne de la table au lieu de naviguer dans l’arbre d’index. Il vaut mieux écrire \'WHERE date_commande >= \'2026-01-01\' AND date_commande < \'2027-01-01\'\' pour préserver l’index.'
    },
    {
      stem: 'Quel type de structure d’indexation est utilisé par défaut dans la grande majorité des SGBD relationnels (PostgreSQL, MySQL InnoDB, Oracle) pour les clés primaires et colonnes uniques ?',
      opts: [
        'Arbre B-Tree (B+Tree)',
        'Table de hachage (Hash index)',
        'Index Bitmap',
        'Index Full-Text'
      ],
      correct: 0,
      exp: 'L’arbre B-Tree équilibré est le standard universel des bases relationnelles car il optimise à la fois les recherches d’égalité stricte (=) et les requêtes par plage de valeurs (<, >, BETWEEN).'
    },
    {
      stem: 'Dans un plan d’exécution obtenu par la commande EXPLAIN ANALYZE, quelle information supplémentaire essentielle est fournie par rapport à un simple EXPLAIN ?',
      opts: [
        'La requête est réellement exécutée et le rapport affiche le temps réel (en millisecondes) et le nombre réel de lignes retournées',
        'Le mot de passe de l’administrateur de la base',
        'La liste des erreurs de syntaxe du code',
        'La version du système d’exploitation'
      ],
      correct: 0,
      exp: 'EXPLAIN ne fait qu’estimer les coûts selon les statistiques du catalogue. EXPLAIN ANALYZE exécute réellement la requête et compare les estimations du planificateur avec la réalité des temps et volumes d’exécution réels.'
    }
  ],

  pitfalls: [
    'Ajouter des index sur toutes les colonnes d’une table sans discernement : chaque index accélère la lecture mais pénalise lourdement toutes les opérations d’écriture (INSERT, UPDATE, DELETE).',
    'Créer un index composite (colA, colB) et espérer qu’il accélère une requête filtrant uniquement sur colB (règle du préfixe le plus à gauche non respectée).',
    'Utiliser des déclencheurs (triggers) pour exécuter des calculs lourds ou des appels réseau externes, ce qui paralyse les transactions utilisatrices.',
    'Négliger le rafraîchissement (REFRESH MATERIALIZED VIEW) d’une vue matérialisée, servant alors des données obsolètes depuis plusieurs semaines.',
    'Ne pas analyser les plans d’exécution avec EXPLAIN avant la mise en production de requêtes critiques à fort volume.'
  ],

  methodTitle: 'Protocole en 4 étapes pour auditer et optimiser les performances d’une requête lente',
  method: [
    'Préfixer la requête lente avec EXPLAIN (ANALYZE, BUFFERS) pour inspecter les nœuds du plan d’exécution et repérer les Seq Scan sur les grosses tables.',
    'Vérifier les clauses WHERE et JOIN : identifier les colonnes filtrées sans index ou les expressions neutralisant un index existant (ex: UPPER(col) ou DATE(col)).',
    'Créer l’index approprié (B-Tree simple sur colonne sélective, composite en plaçant la colonne d’égalité en premier, ou partiel avec WHERE actif = TRUE).',
    'Réexécuter EXPLAIN ANALYZE pour confirmer le passage à un Index Scan et mesurer le gain réel de latence (passage de secondes à quelques millisecondes).'
  ],

  summary: [
    'Les vues simplifient les requêtes et restreignent les accès ; les vues matérialisées stockent physiquement les agrégats lourds.',
    'Les déclencheurs (BEFORE/AFTER) automatisent les contrôles de cohérence et l’audit sans modifier le code applicatif client.',
    'Les pseudo-variables NEW et OLD permettent d’intercepter et de comparer les états avant et après modification.',
    'Les index B-Tree réduisent le coût de recherche de O(N) à O(log N) mais consomment du stockage et ralentissent les écritures.',
    'La commande EXPLAIN ANALYZE est l’outil de référence absolu pour diagnostiquer les plans d’exécution et neutraliser les parcours séquentiels indésirables.'
  ],

  checklist: [
    'Je sais quand créer une vue standard et quand opter pour une vue matérialisée.',
    'Je maîtrise l’usage des variables NEW et OLD dans un trigger d’audit.',
    'Je comprends pourquoi envelopper une colonne dans une fonction dans WHERE neutralise l’index classique.',
    'Je sais interpréter un plan d’exécution EXPLAIN (Seq Scan vs Index Scan).',
    'Je sais concevoir un index composite en respectant la règle du préfixe à gauche.'
  ],

  notions: [
    'Vues relationnelles (CREATE VIEW)',
    'Vues matérialisées & REFRESH MATERIALIZED VIEW',
    'Procédures stockées & Fonctions définies par l’utilisateur',
    'Déclencheurs (Triggers) BEFORE et AFTER',
    'Pseudo-lignes de transition NEW et OLD',
    'Index physique B-Tree (Arbre équilibré)',
    'Règle du préfixe le plus à gauche sur index composite',
    'Planificateur de requêtes (Query Optimizer)',
    'Analyse de plan d’exécution (EXPLAIN / EXPLAIN ANALYZE)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la différence entre Seq Scan et Index Scan, et le rôle des vues.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la syntaxe des triggers et l’usage de NEW et OLD.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez la programmabilité serveur et les techniques d’indexation.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise d’expert : félicitations, vous dominez l’ensemble des compétences de SQL niveau B2 !' }
  ],

  flashcards: [
    { q: 'Quelle est la différence entre une vue simple et une vue matérialisée ?', a: 'Une vue simple exécute sa requête dynamiquement à chaque appel sans stocker de données, alors qu’une vue matérialisée stocke physiquement le résultat sur disque et doit être rafraîchie.' },
    { q: 'Quelle est la différence entre un trigger BEFORE et un trigger AFTER ?', a: 'BEFORE s’exécute avant l’écriture pour valider ou ajuster les données (NEW), alors qu’AFTER s’exécute après l’opération physique pour alimenter un journal d’audit ou synchroniser d’autres tables.' },
    { q: 'Quels sont les rôles des pseudo-enregistrements NEW et OLD ?', a: 'NEW contient les nouvelles données proposées (INSERT/UPDATE) et OLD contient les données existantes avant modification (UPDATE/DELETE).' },
    { q: 'Pourquoi WHERE UPPER(email) = \'test@domaine.com\' n’utilise-t-il pas un index B-Tree posé sur email ?', a: 'Parce que l’application d’une fonction sur la colonne empêche le parcours direct de l’arbre trié. Il faut créer un index fonctionnel sur UPPER(email).' },
    { q: 'Qu’indique la présence d’un Seq Scan dans un rapport EXPLAIN ?', a: 'Que le SGBD lit l’intégralité de la table ligne par ligne, ce qui signale souvent l’absence d’un index pertinent sur les colonnes de filtrage.' },
    { q: 'Qu’apporte EXPLAIN ANALYZE par rapport à un simple EXPLAIN ?', a: 'EXPLAIN ne fait qu’estimer les coûts théoriques, alors qu’EXPLAIN ANALYZE exécute réellement la requête et affiche les durées réelles en millisecondes et les vrais volumes de lignes.' }
  ]
};
