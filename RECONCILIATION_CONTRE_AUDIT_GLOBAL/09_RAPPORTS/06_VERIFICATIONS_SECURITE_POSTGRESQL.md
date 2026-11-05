# 06_VÉRIFICATIONS DE SÉCURITÉ, EXÉCUTIONS FRAÎCHES ET PERSISTANCE POSTGRESQL

**Fichiers analysés :** [tests/qcm-security.test.js](file:///home/rd/Desktop/proba/tests/qcm-security.test.js), [scripts/run_isolated_postgres_suite.js](file:///home/rd/Desktop/proba/scripts/run_isolated_postgres_suite.js), [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js)  
**Journaux d'exécution fraîche :** [06_VERIFICATIONS_TECHNIQUES/courses_check.log](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/06_VERIFICATIONS_TECHNIQUES/courses_check.log), [06_VERIFICATIONS_TECHNIQUES/labs_check.log](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/06_VERIFICATIONS_TECHNIQUES/labs_check.log), [06_VERIFICATIONS_TECHNIQUES/qcm_security_test.log](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/06_VERIFICATIONS_TECHNIQUES/qcm_security_test.log)  

---

## 1. EXÉCUTION RÉELLE ET FRAÎCHE DU BANC DE NON-RÉGRESSION

Pour combler le défaut de fraîcheur des anciens audits, trois bancs de tests fondamentaux ont été rejoués directement dans l'environnement courant :

1. **Vérification de la génération des cours (`npm run courses:check`) :**
   ```bash
   node scripts/generate-courses.js --check
   ```
   *Résultat :* `[ok] cours à jour (832 pages, 64 cours)`.  
   L'intégrité des 832 pages générées est confirmée sans aucune divergence.

2. **Vérification du catalogue des ateliers de code (`npm run labs:check`) :**
   ```bash
   node scripts/generate-code-labs.js --check
   ```
   *Résultat :* `[ok] ateliers à jour (1250 exercices, 68 cours)`.  
   Le catalogue des 1 250 exercices interactifs est intègre et synchronisé.

3. **Banc de sécurité QCM unitaire (`node --test tests/qcm-security.test.js`) :**
   Le banc officiel teste 17 sous-tests critiques couvrant l'ensemble des règles de sécurité applicative :
   - Masquage total de `data-correct` et des corrigés dans le DOM en mode examen ;
   - Blocage de la tricherie par oracle unitaire (`403 Forbidden`) ;
   - Rejet des sessions falsifiées (`404 Not Found`) et sessions tierces (`403 Forbidden`) ;
   - Rejet des soumissions hors délai (`400 Bad Request`) ;
   - Idempotence stricte et protection anti-rejeu des soumissions ;
   - Verrouillage des soumissions concurrentes ;
   - Recalcul serveur obligatoire de la note finale ;
   - Interdiction d'accès au corrigé avant clôture définitive de la session.  
   *Résultat :* **17 tests passés avec succès sur 17** en 381 ms.

---

## 2. QUALIFICATION TECHNIQUE DE L'ÉPREUVE POSTGRESQL (PORT 54333)

L'audit de [postgresql_isolated_run.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/postgresql_isolated_run.log) et du script associé [scripts/run_isolated_postgres_suite.js](file:///home/rd/Desktop/proba/scripts/run_isolated_postgres_suite.js) permet de qualifier la nature exacte de la preuve de persistance :

### 1. Environnement d'exécution
- L'épreuve n'a pas été réalisée sur des mocks SQLite ou des stubs en mémoire, mais sur une **véritable instance physique PostgreSQL**.
- Le cluster a été initialisé via la commande `/usr/bin/initdb` dans un répertoire temporaire et configuré sur le port isolé `54333` pour éviter toute collision avec d'autres bases de données.

### 2. Contenu des tests exécutés
- **Migrations ascendantes :** Les 5 migrations applicatives (`001_init.sql`, `002_users.sql`, `003_user_level.sql`, `004_ai_config.sql`, `005_fedapay_webhook_events.sql`) ont été appliquées avec succès.
- **Test d'idempotence :** Les 5 scripts ont été ré-exécutés immédiatement sur le schéma déjà monté sans lever d'erreur (`[IDEMPOTENT]`).
- **Schéma relationnel produit :** 12 tables publiques créées et 46 index vérifiés.
- **Intégrité référentielle :** Rejet conforme par erreur standard PostgreSQL `23503` (violation de clé étrangère sur `sessions.user_id`) et `23505` (violation de contrainte unique sur `users.email`).
- **Atomicité transactionnelle :** Annulation effective (`ROLLBACK`) avec 0 ligne persistée.
- **Isolation des données :** Ségrégation multi-utilisateurs prouvée entre les comptes de test Alice et Bob.

### 3. Statut forensique retenu
La preuve technique est **intrinsèquement robuste et réelle**, mais son statut de fraîcheur pour l'audit global est **rétrogradé à HÉRITÉ**, car le journal a été repris sans nouvelle ré-exécution lors de cette campagne.
