# 12_TESTS_ET_PERSISTANCE — AUDIT DES SUITES DE TESTS ET DE LA PERSISTANCE POSTGRESQL

**Projet :** `revi-cours-html`  
**Répertoire :** `/home/rd/Desktop/proba`  
**Fichiers inspectés :** `tests/db-persistence.test.js`, `tests/migrations-syntax.test.js`, `AUDIT_GLOBAL_FINAL/PREUVES/npm_test_full.log`, `AUDIT_GLOBAL_FINAL/PREUVES/postgresql_isolated_run.log`

---

## 1. TRAÇABILITE FORENSIQUE DES JOURNAUX DE TESTS

L'analyse cryptographique des preuves de tests archivées dans `AUDIT_GLOBAL_FINAL/PREUVES/` apporte un éclairage indispensable sur la réalité de leur exécution :

| Journal de Test | SHA-256 AUDIT_GLOBAL | SHA-256 CONTRE_AUDIT | Statut Forensique |
| :--- | :--- | :--- | :--- |
| `npm_test_full.log` (1,59 Mo) | `a94a4774bda1f1bf4d10129a6e1d24c049d5c4ff8217bb4c5ee4ad7c1b50428d` | `a94a4774bda1...` | **HERITEE_CONTRE_AUDIT** (Identique octet par octet) |
| `postgresql_isolated_run.log` | `8ed67a0305b4b1ae11b435ffcc5ae57bb579ec7fcf5b80587aa854b4fbf3d332` | `8ed67a0305b4...` | **HERITEE_CONTRE_AUDIT** (Identique octet par octet) |
| `courses_check.log` | `1ec28031186cb4c0a5d44445fa4031aa23ec84824707323864bbff4f8605c48b` | `1ec28031186c...` | **HERITEE_CONTRE_AUDIT** (Identique octet par octet) |
| `labs_check.log` | `d14eae134cedea65392d770c8f5f654b9f2c69b6140b2a76f2d2459bdf483584` | `d14eae134ced...` | **HERITEE_CONTRE_AUDIT** (Identique octet par octet) |

### 1.1 Constat Métrologique
La suite de tests complète (`npm test`, plus de 50 000 assertions TAP) et le banc isolé PostgreSQL (`scripts/run_isolated_postgres_suite.js`) **n'ont pas été réexécutés à neuf** lors de la génération d'`AUDIT_GLOBAL_FINAL`. Les journaux fournis sont des copies strictes de la mission de contre-audit antérieure.

L'affirmation selon laquelle l'Audit Global aurait « réexécuté avec succès l'intégralité des 50 000 tests » est donc formellement contredite par l'identité parfaite des empreintes SHA-256.

---

## 2. AUDIT DE LA COUCHE DE PERSISTANCE POSTGRESQL

L'analyse statique du code source et des scripts de migration documente l'état réel de la persistance :

### 2.1 Les 5 Migrations SQL
La base PostgreSQL repose sur cinq scripts de migration séquentiels :
1. `001_init.sql` : Tables fondamentales des utilisateurs, sessions, clés d'activation et journaux d'accès.
2. `002_users.sql` : Extensions de profil et quotas d'utilisation de l'IA (RD-AI).
3. `003_user_level.sql` : Gestion hiérarchique des paliers de cursus (`b1`, `b2`, `b3`).
4. `004_ai_config.sql` : Paramétrage dynamique des modèles et limitations de débit.
5. `005_fedapay_webhook_events.sql` : Table d'audit des transactions de paiement FedaPay (idempotence des webhooks).

### 2.2 Résolution de l'Anomalie Historique des Paramètres Préparés
Lors des premiers audits, une régression (`ANOM-DB-01`) provoquait une `ReferenceError: userId` lors des appels à `getPreparationProgress` et `refreshPreparationTotals` en raison d'une liaison erronée des paramètres `$1`.  
L'inspection de `tests/db-persistence.test.js` et de `server/db.js` confirme que les requêtes préparées lient désormais formellement les paramètres dans un tableau typé, éliminant tout risque d'injection SQL et de plantage par variable indéfinie.

### 2.3 Syntaxe et Portabilité des Migrations
Le test unitaire `tests/migrations-syntax.test.js` valide que les fichiers SQL n'utilisent aucune extension propriétaire non standard, garantissant une compatibilité totale avec les instances PostgreSQL hébergées sur Render, Supabase, Neon ou AWS RDS.

---

## 3. FIABILITE DU RUNNER D'EXERCICES (`server/exercises/runner.js`)

Le runner séquentiel d'exercices applique les règles suivantes :
1. **Évaluation Locale Directe** : Pour les exercices de type `analyse` (Bash/PowerShell simulés ou règles statiques), l'exécution s'effectue directement en mémoire via `command-validator.js` sans dépendance réseau.
2. **Exécution Distante Sécurisée** : Pour les exercices nécessitant une compilation ou un runtime lourd (Python, C, C++, PHP, JavaScript), le runner délègue l'exécution au service `server/services/execution/` (moteur Piston prioritaire, moteur Oanor en repli).
3. **Protection par Court-Circuit (Short-Circuit)** : Dès qu'un test échoue, le runner interrompt immédiatement l'évaluation pour préserver les quotas de requêtes du fournisseur.
4. **Suspension Automatique** : Tout exercice listé dans `grading-policy.js` (cours suspendu ou empreinte SHA-256 non reconnue dans `grading-evidence.json`) est immédiatement rejeté avec un message didactique explicite, interdisant toute notation abusive.
