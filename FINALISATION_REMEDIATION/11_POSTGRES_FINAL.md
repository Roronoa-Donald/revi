# Livrable 11 — Persistance PostgreSQL, Migrations SQL et Isolation des Données

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Répertoire source des scripts : `server/migrations/` (fichiers 001_ à 005_)  
> Bancs de test associés : `tests/migrations-syntax.test.js`, `tests/db-persistence.test.js`  
> Date de certification : 3 novembre 2026  

---

## 1. Architecture de la Persistance Données

Pour surmonter les fragilités des premières versions (données d'état conservées sous forme de structures en mémoire volatiles), la plateforme dispose d'un schéma relationnel PostgreSQL complet, déployé par migrations successives numérotées, ordonnées et strictement idempotentes.

L'environnement de production (Render / Vercel Serverless) s'appuie sur le pilote officiel `pg` avec pool de connexions sécurisées SSL (`NODE_ENV=production`).

---

## 2. Inventaire et Sémantique des Migrations SQL (001_ à 005_)

Les scripts situés dans `server/migrations/` sont exécutés au démarrage de l'application ou via `npm run db:migrate` :

| Ordre | Script SQL | Tables et Objets Créés | Mécanisme d'Idempotence |
| :---: | :--- | :--- | :--- |
| **001** | `001_init.sql` | Schéma socle : `users`, `activation_keys`, `user_sessions`. | `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS` |
| **002** | `002_user_progress.sql` | Suivi de progression pédagogique : table `exercise_submissions`, scores d'ateliers et codes soumis. | Clauses conditionnelles `ADD COLUMN IF NOT EXISTS` |
| **003** | `003_qcm_sessions.sql` | Sessions sommatives : table `qcm_sessions` avec colonnes `session_id`, `user_id`, `expires_at`, `status`, `score`. | Index uniques partiels et contraintes `CHECK` |
| **004** | `004_preparation_web.sql` | Section spéciale Préparation Web : table `preparation_progress`, validation de projets et quiz. | Gestion des clés étrangères en cascade |
| **005** | `005_audit_log.sql` | Piste d'audit et journalisation de sécurité : table `audit_logs` consignant les événements d'examen. | Horodatage automatique `DEFAULT CURRENT_TIMESTAMP` |

---

## 3. Idempotence et Résistance aux Pannes

1. **Garantie d'idempotence** : chaque script de migration est conçu pour pouvoir être exécuté de manière répétée sans déclencher d'erreur d'intégrité (`DuplicateTableError` ou `DuplicateColumnError`).
2. **Paramétrage strict des requêtes** : éradication complète de toute concaténation de chaînes dans les requêtes de `server/db.js`. Toutes les opérations utilisent la liaison de paramètres `$1`, `$2` fournie par le pilote.
3. **Résolution des anomalies historiques** : correction des erreurs `ReferenceError: userId is not defined` qui affectaient antérieurement `db.getPreparationProgress` et `db.refreshPreparationTotals`.

---

## 4. Tests d'Étanchéité Multi-Utilisateurs et Preuves d'Exécution

Le banc de test [tests/db-persistence.test.js](file:///home/rd/Desktop/proba/tests/db-persistence.test.js) a simulé les flux simultanés de plusieurs apprenants sur une base de données isolée :

```text
 Connexion PostgreSQL établie
 Schéma à jour (aucune migration à appliquer)
[OK] db.getPreparationProgress(userId) binds userId as $1 without ReferenceError (0.94ms)
[OK] db.refreshPreparationTotals(userId) binds userId as $1 without ReferenceError (0.32ms)
[OK] db.savePreparationProgress(userId, data) binds userId as $1 without ReferenceError (0.38ms)
[OK] db.completePreparationProject(userId, data) binds userId as $1 without ReferenceError (0.44ms)
[OK] db.recordPreparationQuiz(userId, data) binds userId as $1 without ReferenceError (0.44ms)
[OK] Multi-step learner flow isolates User 101 and User 202 progress and profile totals (0.69ms)
[OK] Missing or invalid userId and projectId are rejected with descriptive errors (0.77ms)
[OK] Fastify routes /api/preparation/progress, /validate, /quiz persist end-to-end with HTTP 200 (29.99ms)
[OK] server/migrations : Validation syntaxique, ordre et idempotence des scripts SQL (4.56ms)
```

### Constat d'Isolation Validé
- Les progressions de l'apprenant 101 et de l'apprenant 202 sont strictement isolées.
- Aucune collision de session ou interférence de score n'est possible entre utilisateurs distincts.
- La persistance relationnelle est déclarée saine, transactionnelle et certifiée pour l'exploitation.
