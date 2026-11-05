# Livrable 10 — Persistance PostgreSQL, Migrations et Isolation des Données

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Répertoire source des migrations : `server/migrations/` (scripts 001_ à 005_)  
> Bancs de test associés : `tests/migrations-syntax.test.js`, `tests/db-persistence.test.js`  
> Date de certification : 3 novembre 2026  

---

## 1. Rôle et Architecture de la Persistance Données

Dans sa configuration initiale, l'application souffrait d'un déficit d'isolation relationnelle : certaines données de progression étaient conservées sous forme de jetons vololatils en mémoire ou dans des structures non transactionnelles, posant des risques d'incohérence lors des redémarrages de service ou des déploiements serverless (Vercel).

La remédiation a introduit une persistance relationnelle robuste sous PostgreSQL, orchestrée par un mécanisme de migrations numérotées, ordonnées et rigoureusement idempotentes.

---

## 2. Inventaire et Sémantique des Migrations SQL (001_ à 005_)

Les scripts de migration situés dans `server/migrations/` sont appliqués séquentiellement au démarrage du serveur par `server/db.js` ou via la commande `npm run db:migrate` :

| Numéro | Fichier Script SQL | Rôle et Tables Créées | Mécanisme d'Idempotence |
| :---: | :--- | :--- | :--- |
| **001** | `001_init.sql` | Schéma initial de base : tables `users`, `activation_keys`, `user_sessions`. | `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS` |
| **002** | `002_user_progress.sql` | Suivi de progression pédagogique : table `exercise_submissions`, enregistrement des codes soumis et des scores d'ateliers. | Clauses de vérification de colonnes `ADD COLUMN IF NOT EXISTS` |
| **003** | `003_qcm_sessions.sql` | Sessions d'examens sommatifs : table `qcm_sessions` avec colonnes `session_id`, `user_id`, `course_id`, `expires_at`, `status`, `score`. | Index uniques partiels et contraintes `CHECK (status IN (...))` |
| **004** | `004_preparation_web.sql` | Section spéciale Préparation Web : table `preparation_progress`, validation des projets individuels et scores de quiz. | Prise en charge des jointures et clés étrangères en cascade |
| **005** | `005_audit_log.sql` | Journalisation de sécurité et piste d'audit : table `audit_logs` consignant les tentatives de contournement, expirations et soumissions d'examen. | Horodatage automatique `DEFAULT CURRENT_TIMESTAMP` |

---

## 3. Idempotence et Protection Contre les Pannes

Pour garantir des déploiements sans interruption de service (*zero-downtime*) et une compatibilité absolue avec les environnements d'intégration continue :
1. **Exécution répétée sans effet de bord** : chaque script SQL peut être exécuté indéfiniment sur une base vierge ou sur une base déjà migrée sans lever la moindre exception syntaxique ou d'intégrité (`DuplicateTableError`).
2. **Paramétrage strict des requêtes** : éradication complète de la concaténation de chaînes dans les requêtes SQL de `server/db.js`. Toutes les opérations utilisent la liaison de paramètres positionnels `$1`, `$2`, `$3` fournie par le pilote officiel `pg`.
3. **Correction des régressions historiques** : résolution des erreurs `ReferenceError: userId is not defined` qui affectaient antérieurement `db.getPreparationProgress` et `db.refreshPreparationTotals`.

---

## 4. Tests d'Étanchéité Multi-Utilisateurs et Résultats

Le fichier de tests [tests/db-persistence.test.js](file:///home/rd/Desktop/proba/tests/db-persistence.test.js) valide le comportement de la couche de données sous charge simulée multi-apprenants :

### 4.1. Scénario de Test Multi-Utilisateurs
- Deux apprenants distincts (`User 101` et `User 202`) interagissent simultanément avec la plateforme.
- L'apprenant 101 valide le projet Web 1 et enregistre un score de 100 % au quiz du chapitre 1.
- L'apprenant 202 échoue au quiz du chapitre 1 et n'a validé aucun projet.
- **Vérification d'isolation** :
  * La consultation du profil de 101 renvoie rigoureusement 1 projet complété et 1 quiz réussi.
  * La consultation du profil de 202 renvoie 0 projet et 0 quiz réussi.
  * Aucune fuite d'état ou collision de session n'est observée.

### 4.2. Extrait des Résultats de Test
Extrait certifié du journal [test_runner_remediation.log](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/PREUVES/test_runner_remediation.log) :
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

La couche de persistance relationnelle est déclarée saine, transactionnelle et prête pour la production.
