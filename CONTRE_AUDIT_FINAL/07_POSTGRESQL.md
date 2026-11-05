# Livrable 07 — Audit d'Exécution et d'Intégrité PostgreSQL Réelle

> Répertoire de livraison : `CONTRE_AUDIT_FINAL/`  
> Projet : `revi-cours-html`  
> Répertoire des migrations : [server/migrations/](file:///home/rd/Desktop/proba/server/migrations/) (001_ à 005_)  
> Log d'exécution réelle PostgreSQL : [postgresql_isolated_run.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/postgresql_isolated_run.log)  
> Script d'épreuve contradictoire : [scripts/run_isolated_postgres_suite.js](file:///home/rd/Desktop/proba/scripts/run_isolated_postgres_suite.js)  
> Date d'audit : 3 novembre 2026  

---

## 1. Contexte et Mandat d'Évaluation

La directive du contre-audit stipule :
> *« Vérifie si les migrations ont réellement été exécutées dans une base PostgreSQL isolée. Teste une installation neuve, les contraintes, les index, les relations, les transactions, la persistance et l'isolation entre utilisateurs. Vérifie l'idempotence conformément au contrat des migrations. Distingue un test syntaxique d'une migration réellement appliquée. »*

---

## 2. Découverte Critique : Les Tests Antérieurs Reposaient sur un Simulateur JavaScript

L'inspection approfondie des tests de la livraison précédente révèle une disparité méthodologique majeure :
1. **[tests/migrations-syntax.test.js](file:///home/rd/Desktop/proba/tests/migrations-syntax.test.js)** est un test purement syntaxique statique. Il lit les fichiers `.sql`, compte l'équilibrage des parenthèses et vérifie la présence de `IF NOT EXISTS` par regex. Il n'interagit avec aucun moteur de base de données.
2. **[tests/db-persistence.test.js](file:///home/rd/Desktop/proba/tests/db-persistence.test.js)** n'utilise aucun serveur PostgreSQL réel. Il intercepte les requêtes SQL et simule le comportement en mémoire à l'aide d'un objet JavaScript `store = { users: new Map(), ... }` (lignes 17-26).
3. **Absence d'exécution réelle** : Lors des certifications précédentes, aucune migration n'avait été jouée sur un véritable moteur PostgreSQL physique.

---

## 3. Protocole du Contre-Audit en Environnement PostgreSQL Réel Isolé

Pour combler cette lacune, un cluster PostgreSQL dédié a été initialisé via `/usr/bin/initdb` et démarré sur le port temporaire isolé `54333`. Le script [scripts/run_isolated_postgres_suite.js](file:///home/rd/Desktop/proba/scripts/run_isolated_postgres_suite.js) a soumis le schéma complet à une batterie d'épreuves réelles :

### Étape 1 : Installation neuve depuis zéro (Cold Start)
- Suppression totale du schéma public (`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`).
- Création de la table de suivi `schema_migrations`.
- Application séquentielle transactionnelle (`BEGIN ... COMMIT`) des 5 fichiers de migration :
  * `001_init.sql` : **PASS** (15 ms) — activation_keys, sessions, activity_logs, preparation_profiles, preparation_progress, triggers d'audit.
  * `002_users.sql` : **PASS** (4 ms) — users, password_reset_tokens, liaison user_id.
  * `003_user_level.sql` : **PASS** (1 ms) — colonne level, indexation et rétro-compatibilité.
  * `004_ai_config.sql` : **PASS** (2 ms) — ai_config, ai_api_keys, paramètres de quota.
  * `005_fedapay_webhook_events.sql` : **PASS** (1 ms) — payment_webhook_events, idempotence webhook.
- **Résultat** : 12 tables et 46 index créés sans aucune erreur.

### Étape 2 : Test d'idempotence stricte
- Rejeu intégral des 5 fichiers SQL bruts sur la base déjà migrée, sans passer par le filtre `schema_migrations`.
- **Résultat** : **100 % IDEMPOTENT**. Grâce aux clauses `IF NOT EXISTS` et aux blocs `DO $$ BEGIN ... END $$;`, aucune exception SQL n'a été levée.

### Étape 3 : Intégrité référentielle (Clés étrangères)
- Tentative d'insertion dans la table `sessions` avec un `user_id` inexistant (999999).
- **Résultat** : **PASS**. Rejet immédiat par le moteur PostgreSQL avec le code d'erreur standard `23503` (*foreign key violation* sur `sessions_user_id_fkey`).

### Étape 4 : Contraintes d'unicité
- Tentative d'insertion d'un compte utilisateur avec une adresse email déjà enregistrée (`unique.test@example.com`).
- **Résultat** : **PASS**. Rejet immédiat par le moteur PostgreSQL avec le code d'erreur standard `23505` (*unique constraint violation* sur `users_email_key`).

### Étape 5 : Atomicité transactionnelle et ROLLBACK
- Début de transaction `BEGIN`, insertion d'un utilisateur de test, puis émission d'un `ROLLBACK`.
- Relecture de la table `users`.
- **Résultat** : **PASS**. 0 ligne persistée, intégrité transactionnelle confirmée.

### Étape 6 : Isolation multi-utilisateurs et persistance
- Création de deux apprenants distincts : Alice (`id=4`) et Bob (`id=5`).
- Enregistrement de la progression d'Alice sur le projet 101 (`completed = true, project_xp = 50`).
- Relecture croisée des données de Bob.
- **Résultat** : **PASS**. La progression d'Alice est strictement cloisonnée et invisible pour Bob. La relecture des données d'Alice restitue exactement les valeurs persistées.

---

## 4. Bilan et Qualification du Contre-Audit

L'affirmation relative à la viabilité technique des migrations PostgreSQL et à la robustesse du schéma relationnel est :
**CONFIRMEE**.

Bien que les tests antérieurs se soient limités à une simulation en mémoire, l'épreuve matérielle menée par le contre-audit sur un moteur PostgreSQL réel démontre que le schéma, les contraintes de clés étrangères, les index, l'idempotence et l'isolation des données sont **100 % conformes et opérationnels**.

Le journal complet de l'exécution est conservé dans [postgresql_isolated_run.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/postgresql_isolated_run.log).
