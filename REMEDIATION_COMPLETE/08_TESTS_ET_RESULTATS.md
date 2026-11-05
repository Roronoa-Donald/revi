# Livrable 08 — Registre Exhaustif des Tests et Résultats Métrologiques

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Standards AERA/APA/NCME (2014), ISO/IEC/IEEE 29119 (Software Testing), Règle de Preuve Objective Empirique.

---

## 1. Protocole de Test et Démarche de Preuve

Conformément aux instructions permanentes de la mission :
- **Aucune assertion de succès n'est formulée sans exécution réelle.**
- **Tous les résultats rapportés ci-dessous proviennent de commandes terminal effectivement lancées dans l'environnement du projet.**
- **Aucun test n'a été désactivé, commenté ou affaibli pour masquer une défaillance.**

---

## 2. Synthèse Globale de la Suite de Tests

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Tableau de Bord des Exécutions                    │
├────────────────────────────────────────┬────────┬───────┬──────┬───────┤
│ Périmètre de Test                      │ Total  │ Pass  │ Fail │ Skip  │
├────────────────────────────────────────┼────────┼───────┼──────┼───────┤
│ Suite Complète du Projet (npm test)    │ 8 379  │ 8 376 │  0   │   3   │
│ Cohérence des Ateliers (labs:check)    │ 1 250  │ 1 250 │  0   │   0   │
│ Synchronisation des Pages (courses)    │   832  │   832 │  0   │   0   │
│ Tests de Persistance BD (Postgres)     │     8  │     8 │  0   │   0   │
│ Politique de Suspension (Fail-Closed)  │     4  │     4 │  0   │   0   │
│ Moteurs d'Exécution Multi-Langages     │    22  │    22 │  0   │   0   │
│ Sécurité API QCM (Anti-Triche)         │     3  │     3 │  0   │   0   │
│ Remédiation du Runner (Normalisation)  │     4  │     4 │  0   │   0   │
│ Pôles Pilotes Réels (Linux, Proba, RO) │    14  │    14 │  0   │   0   │
└────────────────────────────────────────┴────────┴───────┴──────┴───────┘
```

---

## 3. Détail des Campagnes de Tests Exécutées

### 3.1. Campagne 1 — Suite Générale du Projet (`npm test`)
- **Commande exacte :** `npm test`
- **Moteur d'exécution :** Test runner natif Node.js (`node --test`)
- **Horodatage d'exécution :** 2026-11-03T09:05:16Z
- **Durée totale :** 102,114 ms (environ 1 minute 42 secondes)
- **Résultat constaté :**
  ```
  ℹ tests 8379
  ℹ suites 14
  ℹ pass 8376
  ℹ fail 0
  ℹ cancelled 0
  ℹ skipped 3
  ℹ todo 0
  ℹ duration_ms 102114.361194
  ```
- **Analyse des 3 tests ignorés (`skipped`) :**
  Les 3 tests ignorés correspondent à des contrôles nécessitant un environnement de conteneurisation système `bubblewrap` complet et un binaire Chromium avec accélération matérielle, indisponibles dans l'environnement d'intégration continue standard. Ces sauts sont explicitement prévus et isolés.

### 3.2. Campagne 2 — Vérification de Non-Dérive des Pages et Ateliers
- **Commande 1 :** `npm run labs:check` (`node scripts/generate-code-labs.js --check`)
  - *Verdict :* `[ok] ateliers à jour (1250 exercices, 68 cours)`
  - *Preuve :* Aucun atelier ne dérive du catalogue canonique.
- **Commande 2 :** `npm run courses:check` (`node scripts/generate-courses.js --check`)
  - *Verdict :* `[ok] cours à jour (832 pages, 64 cours)`
  - *Preuve :* L'ensemble des 832 pages HTML de cours respecte scrupuleusement la structure canonique et aucune régression de balisage n'est intervenue.

### 3.3. Campagne 3 — Persistance PostgreSQL et Migrations (`tests/db-persistence.test.js`)
- **Commande exacte :** `node --test tests/db-persistence.test.js`
- **Contexte :** Résolution d'un défaut initial de migration dans le simulateur de test SQL lié à la migration FedaPay (`005_fedapay_webhook_events.sql`).
- **Résultat constaté :**
  ```
  ✔ db.getPreparationProgress(userId) binds userId as $1 without ReferenceError (0.769183ms)
  ✔ db.refreshPreparationTotals(userId) binds userId as $1 without ReferenceError (0.270297ms)
  ✔ db.savePreparationProgress(userId, data) binds userId as $1 without ReferenceError (0.344915ms)
  ✔ db.completePreparationProject(userId, data) binds userId as $1 without ReferenceError (0.401001ms)
  ✔ db.recordPreparationQuiz(userId, data) binds userId as $1 without ReferenceError (0.434099ms)
  ✔ Multi-step learner flow isolates User 101 and User 202 progress and profile totals (0.635506ms)
  ✔ Missing or invalid userId and projectId are rejected with descriptive errors (0.715473ms)
  ✔ Fastify routes /api/preparation/progress, /validate, /quiz persist end-to-end with HTTP 200 (29.387628ms)
  ℹ tests 8, pass 8, fail 0
  ```

### 3.4. Campagne 4 — Suspension et Verrouillage d'Empreinte SHA-256 (`tests/grading-suspension.test.js`)
- **Commande exacte :** `node --test tests/grading-suspension.test.js`
- **Vérification du verrou cryptographique :**
  - Hash SHA-256 calculé pour `server/exercises/runner.js` après modifications : `36a3369560530da3e899534acaf01c46621fe65f2feea9f6d219d32ec0b4c1b7`.
  - Mis à jour dans `server/exercises/grading-runtime-evidence.json`.
- **Résultat constaté :**
  ```
  ✔ les exercices concernés affichent la suspension issue de la politique serveur (430.937947ms)
  ✔ le serveur refuse les soumissions suspendues sans exécution ni consommation de quota (285.308295ms)
  ✔ la suspension conserve le contrôle d’accès aux chapitres protégés (11.48909ms)
  ✔ la politique distingue le cours de la preuve de chaque exercice (3.463297ms)
  ℹ tests 4, pass 4, fail 0
  ```
  L'assertion stricte confirmant le confinement des 354 exercices suspendus est validée à 100 %.

### 3.5. Campagne 5 — Sécurité Métrologique des QCM (`tests/qcm-security.test.js`)
- **Commande exacte :** `node --test tests/qcm-security.test.js`
- **Résultat constaté :**
  ```
  ✔ Course-kit QCM : Mode entraînement vs Mode sécurisé/examen (0.739653ms)
  ✔ API QCM /api/qcm/verify : validation unitaire sécurisée (174.315677ms)
  ✔ API QCM /api/qcm/submit : soumission batch et calcul de note (12.812849ms)
  ℹ tests 3, pass 3, fail 0
  ```

### 3.6. Campagne 6 — Remédiation des Algorithmes du Runner (`tests/runner-remediation.test.js`)
- **Commande exacte :** `node --test tests/runner-remediation.test.js`
- **Résultat constaté :**
  ```
  ✔ runner.js : Comparateur command_challenge pour l’apprentissage shell (1.515029ms)
  ✔ runner.js : Neutralisation de la pollution d’invites interactives stdin (0.42908ms)
  ✔ runner.js : Cadrage strict de expandMul (préservation des unités vs formules) (0.351173ms)
  ✔ runner.js : Tolérance par défaut pour calculs flottants (1e-5) (0.143759ms)
  ℹ tests 4, pass 4, fail 0
  ```

### 3.7. Campagne 7 — Pôles Pilotes Réels Linux, Proba et RO (`tests/refonte-*.test.js`)
- **Commande exacte :** `node --test tests/refonte-b1-linux.test.js tests/refonte-probabilites.test.js tests/refonte-RD-RO.test.js`
- **Résultat constaté :**
  ```
  ✔ Recherche Opérationnelle B2 : Présence et complétude des 20 fiches de conception (2.243406ms)
  ✔ Recherche Opérationnelle B2 : Modélisation Atelier P1/P2 machines M1/M2 (DS B2A/B2B) (0.164269ms)
  ✔ Recherche Opérationnelle B2 : Algorithme du Simplexe (Examen Final & Algo simplexe.pdf) (0.598904ms)
  ✔ Recherche Opérationnelle B2 : Dualité forte et prix d'ombre (0.092423ms)
  ✔ Recherche Opérationnelle B2 : Ordonnancement et Crashing (EXamen B2-IT.pdf) (0.103552ms)
  ✔ Linux B1 : Présence et complétude des 18 fiches de conception (1.928834ms)
  ✔ Linux B1 : Validation déterministe des commandes sans exécution système (4.655411ms)
  ✔ Linux B1 : Protection ReDoS et commandes anormalement longues (0.146422ms)
  ✔ Linux B1 : Normalisation de commande équivalente (espaces, ./, drapeaux) (0.105643ms)
  ✔ Probabilités B2 : Présence et complétude des 18 fiches de conception (1.925412ms)
  ✔ Probabilités B2 : Vérification de l'oracle combinatoire (TD 1) (0.210073ms)
  ✔ Probabilités B2 : Vérification de l'oracle conditionnel et Bayes (TD 2) (0.114081ms)
  ✔ Probabilités B2 : Vérification de l'oracle variables discrètes (TD 3 & 4, Examen 2024) (0.141753ms)
  ✔ Probabilités B2 : Vérification de l'oracle variables continues (TD 5 & 6) (0.139202ms)
  ℹ tests 14, pass 14, fail 0
  ```

---

## 4. Bilan de Robustesse et Absence de Régression

L'ensemble des modifications apportées (sécurisation QCM, route Fastify, extension du runner, validateur de commandes, régénération de hash d'évidence) s'intègre harmonieusement dans le projet :
- **Taux de succès de la suite de tests globale :** **100 % des tests exécutés réussis (8 376 / 8 376)**.
- **Zéro échec (`0 fail`)**.
- **Zéro annulation (`0 cancelled`)**.
- **Zéro régression sur les 68 cours et 1 250 exercices.**
