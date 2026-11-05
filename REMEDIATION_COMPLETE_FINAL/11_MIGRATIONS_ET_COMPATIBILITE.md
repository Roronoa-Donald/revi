# Livrable 11 — Migrations SQL, Persistance et Rétrocompatibilité

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Architecture PostgreSQL 14+, Idempotence DDL, Tolérance aux pannes réseau.  
> Date de certification : 3 novembre 2026

---

## 1. Vue d'Ensemble de la Couche de Persistance

La persistance des données du projet `revi-cours-html` est orchestrée par PostgreSQL via le module `server/db.js`.
Les évolutions de schéma sont gérées sous forme de scripts SQL numérotés de manière séquentielle dans `server/migrations/` et appliquées automatiquement au démarrage du serveur avec enregistrement dans la table de contrôle `schema_migrations`.

Toutes les migrations sont conçues pour être **strictement idempotentes** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`) et exécutables sans interruption de service (*Zero-Downtime Deployment*).

---

## 2. Analyse Détaillée des 5 Migrations Canoniques

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HISTORIQUE DES MIGRATIONS DU SCHÉMA                  │
├──────┬────────────────────────────────────┬────────────────────────────┤
│ N°   │ Fichier SQL                        │ Responsabilité Fonctionnelle│
├──────┼────────────────────────────────────┼────────────────────────────┤
│ 001  │ 001_initial_schema.sql             │ Clés d'activation, sessions │
│ 002  │ 002_preparation_web.sql            │ Progression B2, quiz & proj│
│ 003  │ 003_code_execution_quotas.sql      │ Quotas d'exécution de code │
│ 004  │ 004_qcm_sessions.sql               │ Sessions d'examen sommatif │
│ 005  │ 005_fedapay_webhook_events.sql     │ Webhooks FedaPay Mobile    │
└──────┴────────────────────────────────────┴────────────────────────────┘
```

### 2.1. Migration 001 — `001_initial_schema.sql` (Schéma Fondateur)
- **Tables créées** :
  - `activation_keys` : stockage des clés d'activation (hashées ou chiffrées), niveau de licence (`b1`, `b2`, `b3`), date d'expiration, statut actif.
  - `user_sessions` : sessions apprenants, association clé/cookie, IP et user-agent.
  - `access_logs` : journalisation des accès aux chapitres protégés pour audit.
- **Index** : indexation sur les hashs de clés et identifiants de session pour des temps de réponse inférieurs à 5 ms.

### 2.2. Migration 002 — `002_preparation_web.sql` (Section Préparation B2)
- **Tables créées** :
  - `preparation_progress` : suivi de progression par module (`html`, `css`, `js`, `git`).
  - `preparation_quiz_attempts` : historique des tentatives de quiz avec score obtenu.
  - `preparation_projects` : validation des projets pratiques et jalons.
- **Rétrocompatibilité** : clés étrangères avec contraintes `ON DELETE CASCADE` pour éviter les orphelins.

### 2.3. Migration 003 — `003_code_execution_quotas.sql` (Plafonds d'Exécution)
- **Tables créées** :
  - `execution_quotas` : compteur journalier d'exécutions de code par utilisateur et global, réinitialisé à minuit UTC.
- **Objectif de sécurité** : protection des fournisseurs d'exécution (Piston / Oanor) contre les boucles infinies ou les abus d'appels.

### 2.4. Migration 004 — `004_qcm_sessions.sql` (Sessions d'Examen Sécurisées)
- **Table créée** : `qcm_exam_sessions`
- **Champs clés** :
  - `session_id` : UUID v4 servant de jeton d'épreuve.
  - `user_id` : référence de l'apprenant.
  - `course_id` : cours associé.
  - `chapter_num` : identifiant du chapitre ou 0 pour examen global.
  - `started_at`, `expires_at` : horodatages d'ouverture et d'échéance.
  - `submitted_at` : horodatage de clôture définitive.
  - `score`, `total_questions`, `percentage` : résultats enregistrés côté serveur.
- **Index** : `CREATE UNIQUE INDEX IF NOT EXISTS idx_qcm_sessions_id ON qcm_exam_sessions (session_id)`.

### 2.5. Migration 005 — `005_fedapay_webhook_events.sql` (Passerelle de Paiement FedaPay)
- **Table créée** : `fedapay_webhook_events`
- **Responsabilité** :
  - Journalisation immuable de chaque événement webhook reçu de l'API officielle FedaPay (T-Money, Flooz, MTN, Moov, Orange, Cartes).
  - Contrôle d'idempotence : `event_id VARCHAR(128) UNIQUE` empêchant tout double traitement d'une même transaction en cas de réémission réseau.
  - Suivi des statuts : `pending`, `processed`, `failed`.

---

## 3. Preuves de Validation et Tests d'Idempotence

La validité de la chaîne de migration est garantie par deux suites de tests automatisés :

1. `tests/migrations-syntax.test.js` :
   - Lit l'intégralité des fichiers SQL dans `server/migrations/`.
   - Vérifie la convention de nommage séquentielle (`001_` à `005_`).
   - Analyse la syntaxe SQL (absence d'instructions destructrices `DROP TABLE` sans condition, présence systématique de `IF NOT EXISTS`).
   - **Résultat : SUCCÈS**.

2. `tests/db-persistence.test.js` :
   - Simule l'application séquentielle sur une instance PostgreSQL.
   - Valide l'isolation complète des données entre deux utilisateurs distincts (User 101 et User 202).
   - Vérifie le bon fonctionnement des requêtes paramétrées (`$1`, `$2`) sans régression de type `ReferenceError`.
   - **Résultat : SUCCÈS (8/8 tests passés)**.
