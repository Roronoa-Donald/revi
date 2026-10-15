/**
 * Chapitre 1 du cours « SQL » B2 — Modélisation Relationnelle, DDL & Contraintes d'Intégrité.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Modélisation Relationnelle, DDL &amp; Contraintes d’Intégrité',
  short: 'Modélisation &amp; DDL',
  toc: 'Schéma relationnel formel, typage strict des données, syntaxe DDL (CREATE, ALTER, DROP, TRUNCATE), clés primaires composites et politiques d’intégrité référentielle (CASCADE, RESTRICT, SET NULL).',
  time: '≈ 2 h 45 de travail',
  free: true,

  situation:
    'Une jeune pousse de la FinTech lance une application de gestion de portefeuilles financiers. ' +
    'Lors de la phase de test initiale, des ordres d’achat sont enregistrés sans identifiant client valide, ' +
    'des transactions orphelines subsistent après la suppression d’un compte et des montants négatifs sont injectés par erreur. ' +
    'Ces défaillances critiques proviennent d’un schéma SQL mal contraint et de l’absence de règles d’intégrité référentielle strictes au niveau du SGBD. ' +
    'Comment concevoir un schéma robuste avec CREATE TABLE, verrouiller les domaines avec des contraintes CHECK et UNIQUE, ' +
    'et garantir la cohérence mathématique des relations avec les clés primaires composites et les clés étrangères ? ' +
    'Ce premier module établit les fondations du Data Definition Language (DDL) en SQL professionnel.',

  objectives: [
    'traduire un modèle conceptuel entité-association en un schéma relationnel normalisé (3NF) ;',
    'sélectionner les types de données SQL optimaux (INT, BIGINT, VARCHAR, TEXT, DECIMAL, TIMESTAMP, BOOLEAN) selon les contraintes de stockage et de précision ;',
    'déclarer des clés primaires simples ou composites et des contraintes d’unicité (UNIQUE) ;',
    'configurer l’intégrité référentielle (FOREIGN KEY) et maîtriser les comportements ON DELETE / ON UPDATE (RESTRICT, CASCADE, SET NULL) ;',
    'implémenter des règles de validation métier directes grâce à la contrainte CHECK.'
  ],

  sections: [
    {
      title: 'Le Modèle Relationnel &amp; Typage Strict des Données SQL',
      html: [
        '<p>Introduit par Edgar F. Codd en 1970, le <strong>modèle relationnel</strong> organise l’information sous forme de tables ' +
        '(relations mathématiques) composées de lignes (tuples ou enregistrements) et de colonnes (attributs). ' +
        'Chaque attribut appartient à un <em>domaine de définition</em> strict déterminé par son type SQL.</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Types numériques &amp; Monétaires</h4>',
        '    <ul>',
        '      <li><strong>INT / BIGINT :</strong> Entiers signés 32 bits (jusqu’à 2 milliards) ou 64 bits (pour les identifiants à fort volume).</li>',
        '      <li><strong>DECIMAL(p, s) / NUMERIC(p, s) :</strong> Nombre à virgule fixe exact (p chiffres au total, s après la virgule). <em>Indispensable pour les valeurs monétaires</em> afin de bannir les erreurs d’arrondi inhérentes aux types flottants (FLOAT/DOUBLE).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Types textuels &amp; Temporels</h4>',
        '    <ul>',
        '      <li><strong>CHAR(n) vs VARCHAR(n) :</strong> <code>CHAR</code> réserve une longueur fixe complétée par des espaces (ex: code ISO pays à 2 lettres). <code>VARCHAR</code> n’occupe que la taille réelle du texte plus un préfixe de longueur.</li>',
        '      <li><strong>TIMESTAMP WITH TIME ZONE :</strong> Horodatage universel stocké en UTC et restitué selon le fuseau du client.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Langage de Définition de Données (DDL) : CREATE, ALTER &amp; DROP',
      html: [
        '<p>Le sous-ensemble DDL (Data Definition Language) de SQL permet de créer, modifier et supprimer les structures de la base de données. ' +
        'Contrairement aux requêtes de consultation (DQL), les commandes DDL appliquent des verrous exclusifs de schéma.</p>',

        '<div class="code-block">' +
        'CREATE TABLE Commandes (\n' +
        '    id_cmd BIGINT GENERATED ALWAYS AS IDENTITY,\n' +
        '    ref_commande VARCHAR(32) NOT NULL,\n' +
        '    client_id INT NOT NULL,\n' +
        '    montant_ht DECIMAL(12,2) NOT NULL,\n' +
        '    taux_tva DECIMAL(4,2) DEFAULT 20.00 NOT NULL,\n' +
        '    cree_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,\n' +
        '    PRIMARY KEY (id_cmd),\n' +
        '    CONSTRAINT uq_ref_commande UNIQUE (ref_commande),\n' +
        '    CONSTRAINT ck_montant_positif CHECK (montant_ht &ge; 0),\n' +
        '    CONSTRAINT fk_cmd_client FOREIGN KEY (client_id)\n' +
        '        REFERENCES Clients(id_client)\n' +
        '        ON DELETE RESTRICT\n' +
        '        ON UPDATE CASCADE\n' +
        ');' +
        '</div>',

        box(
          'Différence fondamentale : DROP vs TRUNCATE vs DELETE',
          '<ul>' +
          '  <li><code>DROP TABLE t;</code> détruit complètement la structure, les index, les contraintes et les données de la table dans le dictionnaire du SGBD.</li>' +
          '  <li><code>TRUNCATE TABLE t;</code> vide instantanément toutes les lignes de la table en désallouant les blocs de données sur disque. C’est une commande DDL très rapide, non journalisée ligne par ligne, qui réinitialise les compteurs d’auto-incrément.</li>' +
          '  <li><code>DELETE FROM t;</code> est une commande DML qui supprime les lignes une à une dans le journal des transactions (WAL), permettant un ROLLBACK et activant les déclencheurs (triggers).</li>' +
          '</ul>'
        )
      ].join('\n')
    },
    {
      title: 'Clés Primaires Composites &amp; Intégrité Référentielle',
      html: [
        '<p>L’intégrité des données d’une application repose sur deux règles immuables :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Intégrité d’Entité (PRIMARY KEY)</h4>',
        '    <p>Chaque ligne d’une relation doit être identifiable de façon unique et non nulle. ' +
        '    Dans une table d’association (ex: ligne de facture ou inscription à un cours), la clé primaire est dite <em>composite</em> car elle associe plusieurs colonnes :</p>',
        '    <p><code>PRIMARY KEY (commande_id, produit_id)</code></p>',
        '    <p>Cette déclaration garantit à elle seule qu’un même produit ne peut pas figurer deux fois dans la même commande.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Intégrité Référentielle (FOREIGN KEY)</h4>',
        '    <p>Une clé étrangère garantit que la valeur d’une colonne fait référence à une clé primaire existante dans la table parent :</p>',
        '    <ul>',
        '      <li><strong>ON DELETE RESTRICT (défaut) :</strong> Empêche la suppression du parent tant que des enfants y sont rattachés.</li>',
        '      <li><strong>ON DELETE CASCADE :</strong> Supprime automatiquement tous les enregistrements enfants dépendants lors de la suppression du parent.</li>',
        '      <li><strong>ON DELETE SET NULL :</strong> Affecte la valeur NULL à la clé étrangère des enfants si la colonne est nullable.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Pour stocker des montants monétaires dans une base de données de production, quel type SQL garantit l’absence totale d’erreurs d’arrondi binaire ?',
      opts: [
        'DECIMAL(p, s) ou NUMERIC(p, s)',
        'FLOAT',
        'DOUBLE PRECISION',
        'REAL'
      ],
      correct: 0,
      exp: 'Les types flottants (FLOAT, DOUBLE) utilisent une représentation binaire IEEE 754 qui engendre des erreurs d’arrondi sur les fractions décimales. DECIMAL/NUMERIC stocke les nombres en base 10 exacte et est le standard obligatoire en finance.'
    },
    {
      stem: 'Quelle action se produit lors de la suppression d’une ligne parente si la clé étrangère est configurée avec ON DELETE CASCADE ?',
      opts: [
        'Toutes les lignes de la table enfant associées à ce parent sont automatiquement supprimées',
        'La suppression de la ligne parente est immédiatement bloquée avec une erreur',
        'La clé étrangère des lignes enfants est remplacée par la valeur 0',
        'Les lignes enfants sont transférées dans une table d’archive dédiée'
      ],
      correct: 0,
      exp: 'ON DELETE CASCADE propage automatiquement la suppression de la ligne parente à l’ensemble des lignes dépendantes dans la table enfant.'
    },
    {
      stem: 'Quelle est la différence majeure entre les instructions TRUNCATE TABLE et DELETE FROM sans clause WHERE ?',
      opts: [
        'TRUNCATE est une commande DDL rapide qui désalloue directement les blocs de stockage sans journaliser chaque ligne, alors que DELETE est du DML journalisé ligne par ligne',
        'TRUNCATE supprime la table elle-même du schéma, contrairement à DELETE',
        'DELETE réinitialise automatiquement les compteurs auto-incrémentés, contrairement à TRUNCATE',
        'TRUNCATE nécessite obligatoirement d’indiquer une condition WHERE'
      ],
      correct: 0,
      exp: 'TRUNCATE est une instruction DDL qui vide la table instantanément en libérant les pages de disque sans enregistrer chaque suppression dans le journal des transactions (WAL), ce qui la rend considérablement plus rapide que DELETE.'
    },
    {
      stem: 'Dans une table d’association modélisant les lignes d’une commande, comment interdire qu’un même produit soit présent plusieurs fois dans une même commande ?',
      opts: [
        'En définissant une clé primaire composite : PRIMARY KEY (id_commande, id_produit)',
        'En ajoutant un index non unique sur id_commande',
        'En utilisant une clé étrangère simple sur id_produit',
        'En écrivant un commentaire dans le code applicatif'
      ],
      correct: 0,
      exp: 'La clé primaire composite PRIMARY KEY (id_commande, id_produit) impose l’unicité stricte du couple (id_commande, id_produit) au niveau du moteur relationnel.'
    },
    {
      stem: 'Quelle contrainte SQL permet de s’assurer qu’une colonne numérique stocke exclusivement des valeurs strictement positives (> 0) ?',
      opts: [
        'CHECK (colonne > 0)',
        'NOT NULL (colonne > 0)',
        'UNIQUE (colonne > 0)',
        'CONSTRAINT POSITIVE (colonne)'
      ],
      correct: 0,
      exp: 'La contrainte CHECK évalue une expression booléenne sur chaque ligne insérée ou modifiée et rejette l’opération si l’expression vaut FALSE.'
    }
  ],

  pitfalls: [
    'Utiliser le type FLOAT pour des montants monétaires au lieu de DECIMAL, entraînant des décalages de centimes inacceptables.',
    'Oublier de déclarer une contrainte FOREIGN KEY explicite entre deux tables, laissant l’application créer des enregistrements orphelins incohérents.',
    'Configurer systématiquement ON DELETE CASCADE sans discernement, risquant d’effacer par inadvertance des pans entiers de la base de données.',
    'Confondre CHAR(10) (qui remplit systématiquement avec des espaces jusqu’à 10 caractères) et VARCHAR(10) (qui s’adapte à la longueur réelle).',
    'Exécuter un TRUNCATE TABLE sur un environnement de production en pensant pouvoir le restaurer par un simple ROLLBACK dans tous les SGBD.'
  ],

  methodTitle: 'Protocole en 4 étapes pour créer une table conforme aux normes professionnelles',
  method: [
    'Identifier l’identifiant unique et déclarer la clé primaire (clé synthétique auto-incrémentée BIGINT ou clé composite naturelle).',
    'Choisir le type de données le plus précis et le plus économique pour chaque colonne (DECIMAL pour les prix, VARCHAR calibré, TIMESTAMP UTC).',
    'Poser les contraintes d’intégrité structurelle : NOT NULL sur tous les attributs obligatoires et UNIQUE sur les identifiants alternatifs (email, référence).',
    'Définir les clés étrangères avec leurs règles d’intégrité référentielle explicites (RESTRICT par défaut, CASCADE pour les dépendances strictes compositionnelles).'
  ],

  summary: [
    'Le modèle relationnel s’appuie sur des relations mathématiques (tables), des tuples (lignes) et des attributs typés.',
    'Les types à virgule fixe DECIMAL(p, s) sont obligatoires pour toutes les valeurs comptables et financières.',
    'Les commandes DDL (CREATE, ALTER, DROP, TRUNCATE) définissent et modifient la structure physique de la base.',
    'L’intégrité référentielle (FOREIGN KEY) empêche l’apparition de données orphelines et orchestre les suppressions (CASCADE, RESTRICT).',
    'Les contraintes CHECK et UNIQUE déportent les règles de cohérence au cœur du SGBD, garantissant une protection indépendante du code applicatif.'
  ],

  checklist: [
    'Je sais écrire une commande CREATE TABLE complète avec types, valeurs par défaut et contraintes.',
    'Je comprends la différence technique entre FLOAT et DECIMAL(10,2).',
    'Je maîtrise les comportements ON DELETE CASCADE et ON DELETE RESTRICT.',
    'Je sais quand et comment utiliser une clé primaire composite.',
    'Je connais la différence de fonctionnement entre DROP, TRUNCATE et DELETE.'
  ],

  notions: [
    'Modèle Relationnel & Schéma de table',
    'Types de données SQL (INT, DECIMAL, VARCHAR, TIMESTAMP)',
    'Data Definition Language (DDL)',
    'Commandes CREATE TABLE, ALTER TABLE, DROP TABLE',
    'Commande TRUNCATE TABLE vs DELETE',
    'Intégrité d’Entité (PRIMARY KEY simple et composite)',
    'Intégrité Référentielle (FOREIGN KEY)',
    'Actions de suppression (ON DELETE CASCADE, RESTRICT, SET NULL)',
    'Contraintes d’intégrité CHECK et UNIQUE'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la syntaxe de CREATE TABLE et la différence entre FLOAT et DECIMAL.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les clés primaires composites et les actions ON DELETE.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la modélisation formelle et les contraintes DDL.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe à la manipulation des données, au filtrage et aux fonctions scalaires au module 2.' }
  ],

  flashcards: [
    { q: 'Pourquoi ne faut-il jamais utiliser FLOAT pour stocker un prix en base de données ?', a: 'Parce que FLOAT utilise un codage binaire approché (IEEE 754) produisant des erreurs d’arrondi. Il faut utiliser DECIMAL(p,s) qui est un format décimal exact.' },
    { q: 'Quelle est la différence entre ON DELETE CASCADE et ON DELETE RESTRICT ?', a: 'CASCADE supprime automatiquement les enregistrements enfants liés, tandis que RESTRICT bloque immédiatement la suppression du parent si des enfants existent.' },
    { q: 'Dans quelle situation utilise-t-on une clé primaire composite ?', a: 'Dans les tables d’association ou de décomposition n:m (ex: commande_id + produit_id) pour garantir l’unicité de la combinaison sans clé synthétique.' },
    { q: 'Quelle est la différence entre DELETE et TRUNCATE ?', a: 'DELETE est une commande DML journalisée ligne par ligne pouvant être annulée par ROLLBACK, alors que TRUNCATE est une commande DDL rapide qui désalloue les blocs de stockage.' },
    { q: 'Que fait la contrainte CHECK (prix > 0) ?', a: 'Elle valide que toute valeur insérée ou modifiée dans la colonne prix est strictement supérieure à zéro, rejetant l’opération dans le cas contraire.' },
    { q: 'Quelle différence y a-t-il entre CHAR(10) et VARCHAR(10) ?', a: 'CHAR(10) réserve toujours 10 octets en complétant par des espaces, alors que VARCHAR(10) n’occupe que la taille réelle des caractères plus 1 à 2 octets d’en-tête.' }
  ]
};
