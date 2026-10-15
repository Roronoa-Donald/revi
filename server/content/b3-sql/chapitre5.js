/**
 * Chapitre 5 du cours « SQL Avancé B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Procédures Stockées PL/pgSQL, Déclencheurs (Triggers) &amp; Row-Level Security (RLS)',
  short: 'PL/pgSQL, Triggers &amp; RLS',
  toc: 'Langage procédural PL/pgSQL, blocs d’exécution et gestion des exceptions, déclencheurs (Triggers) BEFORE / AFTER sur INSERT, UPDATE, DELETE, pseudo-enregistrements NEW et OLD, tables d’audit immuables, sécurité au niveau de la ligne (Row-Level Security - RLS) avec politiques CREATE POLICY, et prévention absolue des injections SQL (SQLi).',
  time: '≈ 3 h 00 de travail',
  free: false,
  situation: 'Dans les architectures d’entreprise modernes et les environnements multi-tenants (SaaS), la sécurité et l’intégrité des données ne peuvent reposer uniquement sur la couche applicative backend. Si une faille d’injection SQL ou un bug de code survient, la base de données doit constituer le rempart ultime. PostgreSQL offre un moteur d’exécution procédurale puissant (PL/pgSQL) permettant d’exécuter des règles métier complexes directement au plus près des données. Les déclencheurs (Triggers) garantissent une traçabilité d’audit infalsifiable en interceptant chaque mutation physique via les pseudo-enregistrements NEW et OLD. Enfin, le mécanisme de Row-Level Security (RLS) applique un cloisonnement cryptographique et logique strict, garantissant qu’un utilisateur ne puisse jamais lire ou modifier les données d’une autre organisation.',
  objectives: [
    'maîtriser la syntaxe et la structure des blocs procéduraux PL/pgSQL (DECLARE, BEGIN, EXCEPTION, END) ;',
    'concevoir et déployer des fonctions déclencheurs (TRIGGER) associées aux événements BEFORE et AFTER ;',
    'exploiter rigoureusement les pseudo-enregistrements NEW et OLD pour journaliser les modifications d’attributs ;',
    'activer et configurer la sécurité au niveau de la ligne (Row-Level Security) avec CREATE POLICY ;',
    'différencier les clauses de politique RLS : USING (filtrage en lecture) et WITH CHECK (validation en écriture) ;',
    'développer en Python 3 des simulateurs de déclencheurs d’audit, des moteurs d’évaluation RLS et des détecteurs d’injections SQL.'
  ],
  sections: [
    {
      title: 'Le Langage Procédural PL/pgSQL & Les Fonctions Déclencheurs',
      html: [
        '<p>PL/pgSQL est un langage procédural structuré par blocs intégré au moteur PostgreSQL. Il permet de combiner des requêtes relationnelles avec des variables typées, des boucles (<code>LOOP</code>, <code>WHILE</code>, <code>FOR</code>) et des structures conditionnelles (<code>IF/THEN/ELSE</code>) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure d’une Fonction PL/pgSQL</h4>',
        '    <pre><code>CREATE OR REPLACE FUNCTION virer_fonds(',
        '    compte_src INT, compte_dest INT, montant NUMERIC',
        ') RETURNS VOID AS $$',
        'DECLARE',
        '    solde_dispo NUMERIC;',
        'BEGIN',
        '    SELECT solde INTO solde_dispo FROM comptes WHERE id = compte_src FOR UPDATE;',
        '    IF solde_dispo &lt; montant THEN',
        '        RAISE EXCEPTION \'Fonds insuffisants : disponible %\', solde_dispo;',
        '    END IF;',
        '    UPDATE comptes SET solde = solde - montant WHERE id = compte_src;',
        '    UPDATE comptes SET solde = solde + montant WHERE id = compte_dest;',
        'EXCEPTION',
        '    WHEN OTHERS THEN',
        '        RAISE NOTICE \'Erreur transactionnelle : %\', SQLERRM;',
        '        RAISE;',
        'END;',
        '$$ LANGUAGE plpgsql;</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cycle de Vie et Types de Triggers</h4>',
        '    <p>Un déclencheur intercepte une mutation (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>TRUNCATE</code>) :</p>',
        '    <ul>',
        '      <li><strong>BEFORE :</strong> Déclenché <em>avant</em> l’écriture sur disque. Permet de modifier ou normaliser les données arrivantes, ou d’avorter l’opération (<code>RETURN NULL</code> ou <code>RAISE EXCEPTION</code>).</li>',
        '      <li><strong>AFTER :</strong> Déclenché <em>après</em> la validation physique. Idéal pour propager des actions secondaires ou alimenter un journal d’audit infalsifiable.</li>',
        '      <li><strong>FOR EACH ROW vs FOR EACH STATEMENT :</strong> S’exécute soit pour chaque ligne altérée individuellement, soit une seule fois pour toute la commande SQL.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Pseudo-Enregistrements NEW / OLD & Tables d’Audit Immuables',
      html: [
        '<p>Au sein d’un déclencheur s’exécutant au niveau de la ligne (<code>FOR EACH ROW</code>), le moteur PostgreSQL met à disposition deux variables d’enregistrement spéciales :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Variables Spéciales de Trigger</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Opération</th><th>OLD</th><th>NEW</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><strong>INSERT</strong></td><td><code>NULL</code></td><td>Nouvelle ligne insérée</td></tr>',
        '        <tr><td><strong>UPDATE</strong></td><td>Ligne avant modification</td><td>Ligne après modification</td></tr>',
        '        <tr><td><strong>DELETE</strong></td><td>Ligne supprimée</td><td><code>NULL</code></td></tr>',
        '      </tbody>',
        '    </table>',
        '    <p>La variable <code>TG_OP</code> contient le type d’opération (<code>\'INSERT\'</code>, <code>\'UPDATE\'</code>, <code>\'DELETE\'</code>).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Patron de Conception : Table d’Audit Infalsifiable</h4>',
        '    <pre><code>CREATE OR REPLACE FUNCTION audit_employes_trigger()',
        'RETURNS TRIGGER AS $$',
        'BEGIN',
        '    IF (TG_OP = \'UPDATE\') THEN',
        '        INSERT INTO audit_log (table_name, op, row_id, old_val, new_val, modifie_par, modifie_le)',
        '        VALUES (\'employes\', \'UPDATE\', OLD.id, row_to_json(OLD), row_to_json(NEW), current_user, clock_timestamp());',
        '        RETURN NEW;',
        '    ELSIF (TG_OP = \'DELETE\') THEN',
        '        INSERT INTO audit_log (table_name, op, row_id, old_val, new_val, modifie_par, modifie_le)',
        '        VALUES (\'employes\', \'DELETE\', OLD.id, row_to_json(OLD), NULL, current_user, clock_timestamp());',
        '        RETURN OLD;',
        '    END IF;',
        '    RETURN NEW;',
        'END; $$ LANGUAGE plpgsql;</code></pre>',
        '  </div>',
        '</div>',
        box('tip', '<strong>Règle d’or des Triggers AFTER :</strong> Les triggers d’audit doivent toujours être de type <code>AFTER ... FOR EACH ROW</code> pour s’assurer que les données ont passé toutes les contraintes d’intégrité (clés étrangères, check, unicités) avant d’être enregistrées dans le journal.')
      ].join('\n')
    },
    {
      title: 'Sécurité au Niveau de la Ligne (Row-Level Security - RLS) & Prévention SQLi',
      html: [
        '<p>La <strong>Row-Level Security (RLS)</strong> est une fonctionnalité de sécurité avancée intégrée dans le noyau du SGBD. Elle filtre de manière invisible les lignes accessibles par chaque utilisateur de base de données :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Configuration RLS dans PostgreSQL</h4>',
        '    <pre><code>-- 1. Activer RLS sur la table cible',
        'ALTER TABLE documents ENABLE ROW LEVEL SECURITY;',
        '',
        '-- 2. Définir une politique de cloisonnement multi-tenant',
        'CREATE POLICY rls_documents_tenant ON documents',
        '    FOR ALL',
        '    TO role_applicatif',
        '    USING (tenant_id = current_setting(\'app.current_tenant_id\')::INT)',
        '    WITH CHECK (tenant_id = current_setting(\'app.current_tenant_id\')::INT);</code></pre>',
        '    <ul>',
        '      <li><strong>USING :</strong> Condition booléenne appliquée aux requêtes de lecture (<code>SELECT</code>, <code>UPDATE</code>, <code>DELETE</code>). Les lignes hors condition sont invisibles.</li>',
        '      <li><strong>WITH CHECK :</strong> Condition validée sur les nouvelles écritures (<code>INSERT</code>, <code>UPDATE</code>). Bloque toute tentative d’écriture illégitime.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Défense en Profondeur contre l’Injection SQL (SQLi)</h4>',
        '    <p>L’injection SQL survient lorsque des entrées utilisateur non assainies sont concaténées dans des requêtes dynamiques :</p>',
        '    <pre><code>-- VULNÉRABLE (Concaténation textuelle) :',
        'EXECUTE \'SELECT * FROM users WHERE nom = \'\'\' || entree || \'\'\'\';',
        '',
        '-- SÉCURISÉ (Requête paramétrée avec USING) :',
        'EXECUTE \'SELECT * FROM users WHERE nom = $1\' USING entree;</code></pre>',
        '    <p>En PL/pgSQL dynamique, l’utilisation de la clause <code>USING</code> et des fonctions <code>quote_ident()</code> (pour les noms de tables/colonnes) et <code>quote_literal()</code> est indispensable pour neutraliser toute injection.</p>',
        '  </div>',
        '</div>',
        box('danger', '<strong>Les super-utilisateurs contournent RLS par défaut :</strong> Dans PostgreSQL, l’utilisateur <code>postgres</code> (superuser) ainsi que le propriétaire de la table ignorent les politiques RLS sauf si la table est explicitement configurée avec <code>ALTER TABLE table_name FORCE ROW LEVEL SECURITY;</code>. Dans une architecture applicative sécurisée, l’application doit toujours se connecter avec un rôle sans privilèges superuser.')
      ].join('\n')
    }
  ],
  method: [
    '1. Déterminer si la règle métier doit être garantie dans la base (PL/pgSQL/Trigger) ou dans l’application cliente.',
    '2. Choisir le moment du trigger : BEFORE pour nettoyer/valider des données, AFTER pour journaliser ou synchroniser.',
    '3. Isoler le code procédural dans des blocs BEGIN...EXCEPTION pour garantir des rollbacks propres en cas d’anomalie.',
    '4. Mettre en place une table d’audit immuable avec stockage JSON des états OLD et NEW.',
    '5. Activer systématiquement ENABLE ROW LEVEL SECURITY sur toutes les tables contenant des données multi-tenants ou confidentielles.',
    '6. Bannir toute concaténation de chaînes dans les requêtes dynamiques au profit de requêtes préparées avec clause USING.'
  ],
  summary: [
    'PL/pgSQL apporte la puissance procédurale au moteur relationnel avec une gestion fine des exceptions et des curseurs.',
    'Les triggers interceptent les opérations INSERT, UPDATE et DELETE soit avant validation physique (BEFORE), soit après (AFTER).',
    'NEW représente l’état résultant d’une modification, OLD l’état antérieur ; NEW est NULL lors d’un DELETE, OLD est NULL lors d’un INSERT.',
    'Row-Level Security (RLS) applique un filtrage transparent et imperméable au niveau des tuples sans modifier le code SQL applicatif.',
    'La clause USING d’une politique RLS filtre les lignes visibles en lecture ; la clause WITH CHECK valide les insertions et modifications.',
    'La prévention absolue contre les injections SQL exige des requêtes paramétrées avec substitution typée ($1, $2).'
  ],
  checklist: [
    'Le trigger est-il déclaré FOR EACH ROW pour inspecter chaque tuple individuellement ?',
    'La fonction trigger retourne-t-elle NEW pour les insertions/mises à jour valides et OLD pour les suppressions ?',
    'La table d’audit enregistre-t-elle l’utilisateur système (current_user) et un horodatage précis (clock_timestamp()) ?',
    'La politique RLS utilise-t-elle à la fois USING (lecture) et WITH CHECK (écriture) ?',
    'L’application se connecte-t-elle avec un rôle dédié non-superuser pour que la politique RLS s’applique réellement ?',
    'Toutes les requêtes dynamiques utilisent-elles des paramètres typés ($1, USING) plutôt que des concaténations ?'
  ],
  notions: [
    'Langage PL/pgSQL (DECLARE, BEGIN, EXCEPTION)',
    'Déclencheurs (Triggers) BEFORE vs AFTER',
    'Pseudo-enregistrements NEW & OLD',
    'Opération TG_OP & variable TG_TABLE_NAME',
    'Tables d’audit immuables (Audit Logging)',
    'Row-Level Security (RLS) & ALTER TABLE ... ENABLE RLS',
    'Politiques de sécurité (CREATE POLICY ... USING / WITH CHECK)',
    'Prévention des injections SQL & requêtes paramétrées (USING)'
  ],
  pitfalls: [
    'Utiliser un trigger BEFORE au lieu d’un AFTER pour alimenter une table d’audit, risquant de journaliser une transaction qui va ensuite échouer.',
    'Oublier de retourner NEW dans une fonction trigger BEFORE INSERT/UPDATE, ce qui supprime silencieusement la ligne.',
    'Tester la Row-Level Security en se connectant en tant que superuser postgres, masquant ainsi l’inactivité des règles.',
    'Concaténer des entrées utilisateur dans un bloc EXECUTE en PL/pgSQL, ouvrant une faille critique d’injection SQL.'
  ],
  questions: [
    {
      stem: 'Que vaut la variable OLD dans une fonction déclencheur interceptant un INSERT ?',
      opts: [
        'La valeur par défaut de la colonne',
        'Une chaîne vide',
        'NULL',
        'Une copie de NEW'
      ],
      correct: 2,
      exp: 'Lors d’un INSERT, aucune ligne préalable n’existait dans la table : la variable OLD vaut donc strictement NULL.'
    },
    {
      stem: 'Quel type de déclencheur est recommandé pour modifier ou normaliser les données d’une ligne avant son écriture sur disque ?',
      opts: [
        'BEFORE INSERT OR UPDATE FOR EACH ROW',
        'AFTER INSERT FOR EACH STATEMENT',
        'INSTEAD OF TABLE',
        'DEFERRED TRANSACTION TRIGGER'
      ],
      correct: 0,
      exp: 'Un trigger BEFORE FOR EACH ROW s’exécute avant l’écriture disque et permet de modifier les attributs du tuple NEW avant persistance.'
    },
    {
      stem: 'Si une fonction déclencheur BEFORE INSERT retourne NULL, que se passe-t-il pour la ligne en cours d’insertion ?',
      opts: [
        'La ligne est insérée avec des valeurs nulles',
        'L’opération d’insertion pour cette ligne est silencieusement annulée',
        'Une erreur fatale est levée et le serveur plante',
        'La ligne est insérée dans la table de log'
      ],
      correct: 1,
      exp: 'Retourner NULL dans un trigger BEFORE interrompt immédiatement l’opération pour le tuple courant, l’ignorant sans lever d’exception.'
    },
    {
      stem: 'Dans une politique PostgreSQL Row-Level Security, quel est le rôle de la clause WITH CHECK ?',
      opts: [
        'Vérifier que la table possède un index primaire',
        'Valider que les nouvelles lignes insérées ou mises à jour respectent la condition de sécurité',
        'Filtrer les lignes retournées par un SELECT',
        'Chiffrer le mot de passe de l’utilisateur'
      ],
      correct: 1,
      exp: 'La clause WITH CHECK valide les données en entrée lors d’un INSERT ou UPDATE, rejetant toute ligne violant la condition.'
    },
    {
      stem: 'Par défaut, pourquoi le super-utilisateur postgres n’est-il pas filtré par les politiques Row-Level Security ?',
      opts: [
        'Parce qu’il a un mot de passe trop long',
        'Parce que les superusers ont le droit de bypasser RLS afin de pouvoir administrer et sauvegarder la base',
        'Parce que RLS est désactivé sur le port 5432',
        'C’est un bogue connu corrigé en version 17'
      ],
      correct: 1,
      exp: 'Dans la conception PostgreSQL, les super-utilisateurs ignorent les politiques de sécurité sauf si la directive FORCE ROW LEVEL SECURITY est appliquée.'
    },
    {
      stem: 'Quelle instruction PL/pgSQL permet d’exécuter une requête dynamique sécurisée contre les injections SQL ?',
      opts: [
        'EXECUTE \'SELECT * FROM t WHERE id = \' || user_input;',
        'EXECUTE \'SELECT * FROM t WHERE id = $1\' USING user_input;',
        'RUN QUERY WITH user_input;',
        'CALL SQL(user_input);'
      ],
      correct: 1,
      exp: 'L’utilisation de la clause USING avec des paramètres de substitution typés ($1) empêche toute interprétation de code malveillant.'
    },
    {
      stem: 'Que contient la variable spéciale TG_OP dans un trigger PL/pgSQL ?',
      opts: [
        'Le temps d’exécution de la requête',
        'Une chaîne de caractères indiquant l’opération déclencheuse (\'INSERT\', \'UPDATE\', \'DELETE\')',
        'L’identifiant du processus PostgreSQL',
        'Le nom de l’index utilisé'
      ],
      correct: 1,
      exp: 'TG_OP contient sous forme de chaîne de caractères l’événement SQL ayant déclenché l’exécution (INSERT, UPDATE, DELETE ou TRUNCATE).'
    },
    {
      stem: 'Pour garantir qu’un journal d’audit ne conserve que les transactions ayant réellement réussi, quel trigger privilégier ?',
      opts: [
        'BEFORE ... FOR EACH STATEMENT',
        'AFTER ... FOR EACH ROW',
        'INSTEAD OF VIEW',
        'BEFORE ... FOR EACH ROW'
      ],
      correct: 1,
      exp: 'Un trigger AFTER ... FOR EACH ROW garantit que la modification a passé toutes les contraintes de table avant d’écrire l’audit.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre un trigger BEFORE et AFTER ?',
      a: 'BEFORE s’exécute avant l’écriture physique (peut modifier NEW ou annuler) ; AFTER s’exécute après persistance (idéal pour l’audit).'
    },
    {
      q: 'Que contiennent les pseudo-tuples NEW et OLD lors d’un UPDATE ?',
      a: 'OLD contient l’état de la ligne avant modification, NEW contient le nouvel état après modification.'
    },
    {
      q: 'Comment activer Row-Level Security sur une table nommée contrats ?',
      a: 'ALTER TABLE contrats ENABLE ROW LEVEL SECURITY;'
    },
    {
      q: 'À quoi sert la clause USING dans CREATE POLICY ?',
      a: 'À définir le filtre booléen appliqué lors des lectures (SELECT, UPDATE, DELETE).'
    },
    {
      q: 'Comment protéger une requête dynamique PL/pgSQL contre les injections SQL ?',
      a: 'En utilisant la commande EXECUTE ... USING paramètre avec des marqueurs positionnels $1.'
    },
    {
      q: 'Que fait la commande RAISE EXCEPTION en PL/pgSQL ?',
      a: 'Elle interrompt immédiatement l’exécution, affiche un message d’erreur et déclenche un rollback transactionnel.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à structurer une fonction PL/pgSQL ou confusion entre pseudo-variables NEW et OLD.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de l’écriture de déclencheurs d’audit et configuration de politiques simples de Row-Level Security.'
    },
    {
      cls: 'high',
      text: 'Architecture de sécurité complète : RLS multi-tenant étanche avec FORCE RLS, audit infalsifiable et élimination totale des risques SQLi.'
    }
  ]
};
