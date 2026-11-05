# Livrable 01 — État Final du Projet et Architecture Globale

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage, d'exercices interactifs et d'évaluation B1, B2 et B3  
> Branche de travail : `remediation-pedagogique-qualite`  
> Date de certification : 3 novembre 2026  
> Conformité : AERA/APA/NCME (2014), Guide NBME (2024), Bloom révisé (2001), WCAG 2.1 AA, ISO/IEC 25010.

---

## 1. Synthèse Exécutive du Chantier de Finalisation

Le projet `revi-cours-html` a fait l'objet d'un audit approfondi ayant mis en lumière de graves disparités formelles, pédagogiques, psychométriques et sécuritaires :
1. **Uniformité abusive des exercices** : l'omniprésence de scripts lisant sur l'entrée standard (`stdin`) dénaturait l'évaluation de disciplines non algorithmiques (Linux, Réseaux, SQL, Git, Gestion de projet, Droit).
2. **Vulnérabilités critiques de notation QCM** : exposition des réponses dans le DOM client (`data-correct="1"`), fuite des explications de corrigés, absence de contrôle anti-rejeu et vulnérabilité aux attaques d'oracle.
3. **Fragilités de validation dans le moteur d'exécution** : faux négatifs dus aux invites interactives (`input("Entrez un nombre : ")`), faux positifs sur notations scientifiques ou unités techniques, et absence de comparateurs de commandes shell dédiés.
4. **Suspensions non documentées** : politiques de suspension serveur appliquées sans inventaire individuel honnête ni registre d'état traçable.

Le présent chantier de finalisation apporte une remédiation intégrale et défendable sur l'ensemble de ces dimensions, en s'appuyant sur des modifications de code pérennes, des bancs de tests exhaustifs et des registres individuels certifiés.

---

## 2. Métriques Officielles du Référentiel

Les chiffres ci-dessous sont extraits des analyseurs automatisés du dépôt et réconciliés de manière biunivoque avec les manifests JSON et les registres CSV :

| Indicateur Clé | Valeur Certifiée | Référence de Contrôle |
| :--- | :--- | :--- |
| **Nombre total de cours gérés** | **71 cours** | `server/courses.js` (68 avec ateliers + 3 sections spéciales) |
| **Nombre de cours avec ateliers de code** | **68 cours** | `server/exercises/course-config.js` |
| **Nombre total de pages compilées** | **832 pages** | `scripts/generate-courses.js --check` |
| **Volume total d'exercices au catalogue** | **1 250 exercices** | `server/exercises/index.js` |
| **Exercices actifs en production** | **896 exercices** (71,7 %) | `exercises_manifest.json` |
| **Exercices temporairement suspendus** | **354 exercices** (28,3 %) | `server/exercises/grading-policy.js` |
| - *Suspension globale par cours (7 cours)* | 126 exercices | `csharp`, `docker`, `b3-linux`, `b3-github`, `b1-sql`, `sql`, `b3-sql` |
| - *Suspension spécifique de méthode* | 1 exercice | `algo-c9-e2` (algorithme itératif non garanti) |
| - *Suspension pour preuves de fiabilité manquantes* | 227 exercices | Fiches sans empreinte dans `grading-evidence.json` |
| **Banque complète d'items QCM** | **3 089 items** | `qcm_manifest.json` |
| - *Items intégrés dans les chapitres de cours* | 2 829 items | `server/content/*/chapitres-*.js` |
| - *Items des simulateurs d'examens (mastery)* | 260 items | 26 cours dotés d'examens sommatifs x 10 items |
| **Items QCM signalés pour revue humaine** | **184 items** (6,0 %) | Backlog pédagogique prioritaire (Guide NBME 2024) |
| **Sécurisation de l'évaluation fermée** | **100 %** | Architecture serveur `/api/qcm/verify` et `/api/qcm/submit` |

---

## 3. Cartographie des Composants Techniques Modifiés et Livrés

L'architecture du système s'articule désormais autour de barrières étanches entre l'apprentissage formatif libre et l'évaluation sommative certifiante :

```
                        NAVIGATEUR APPRENANT
                                  │
         ┌────────────────────────┴────────────────────────┐
         │                                                 │
         ▼ (Mode Entraînement)                             ▼ (Mode Examen Sommatif)
[Atelier de Code / Lab]                           [Session d'Examen Verrouillée]
 - Monaco Editor / Textarea                        - UUID de session cryptographique
 - Feedback immédiat                               - Horodatage d'expiration
 - Invites pédagogiques                            - Absence totale de corrigé dans DOM
         │                                                 │
         │ POST /api/exercise/submit                       │ POST /api/qcm/session/start
         │ POST /api/code-help                             │ POST /api/qcm/submit
         ▼                                                 ▼
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│     MOTEUR D'EVALUATION         │               │     API QCM SECURISEE           │
│   (server/exercises/runner.js)  │               │    (server/routes/qcm.js)       │
│                                 │               │                                 │
│ - Politique de suspension stricte│               │ - Blocage anti-oracle (HTTP 403)│
│ - Normalisation des commandes   │               │ - Verrouillage anti-rejeu       │
│   (command-validator.js)        │               │ - Rejet des sessions expirées   │
│ - Isolation AST & Méthodes      │               │ - Calcul serveur confidentiel   │
└─────────────────────────────────┘               └─────────────────────────────────┘
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  ▼
                 PERSISTENCE POSTGRESQL & AUDIT
                 - Migrations 001_ à 005_ ordonnées et idempotentes
                 - Isolation multi-utilisateurs et journalisation d'événements
```

### 3.1. Sécurisation QCM (`server/routes/qcm.js`)
- **Éradication de la divulgation DOM** : en mode examen, l'attribut `data-correct` et le bloc `<div class="q__exp">` sont totalement éliminés du HTML servi par `scripts/course-kit.js`.
- **Défense Anti-Oracle** : toute tentative d'interrogation unitaire sur `/api/qcm/verify` au cours d'une session sommative active est interceptée et bloquée avec une erreur HTTP 403 explicite.
- **Défense Anti-Rejeu et Idempotence** : une session d'examen soumise est définitivement verrouillée en mémoire/base. Toute soumission ultérieure renvoie le score initial sans altération.
- **Contrôle d'Expiration Temporelle** : calcul strict de l'échéance `expiresAt` avec une tolérance réseau de 30 secondes ; rejet immédiat (HTTP 400) en cas de dépassement.

### 3.2. Normalisation et Validation Déterministe (`server/exercises/command-validator.js`)
- **Zéro Exécution Système pour Commandes Simples** : suppression des conteneurs éphémères pour les tests de syntaxe Shell élémentaire (Linux B1). Validation par automates réguliers, décomposition de tokens et arbres de drapeaux.
- **Équivalence Syntaxique Robuste** : reconnaissance déterministe des permutations d'options (`ls -la` == `ls -al` == `ls -l -a` == `ls -a -l`), élimination des chemins superflus (`./`), et respect strict des règles d'expansion des variables shell selon le type de guillemets (`'$HOME'` distinct de `"$HOME"`).
- **Protection ReDoS** : plafonnement systématique des entrées à 512 caractères et interdiction des expressions régulières récursives non bornées.

### 3.3. Refonte Pédagogique des Pôles Pilotes
- **Linux B1 (`refonte/b1-linux/`)** : conversion des 18 exercices en défis de commandes réalistes sans recours injustifié à des scripts Bash complexes avec `read -r`.
- **Probabilités B2 (`refonte/probabilites/`)** : alignement direct sur les annales de TD et d'examens (combinatoire, probabilités conditionnelles, Bayes, lois discrètes et continues) avec oracles numériques tolérants aux arrondis décimaux et fractions irréductibles.
- **Recherche Opérationnelle B2 (`refonte/RD-RO/`)** : modélisation de programmes linéaires complets (Atelier P1/P2 machines M1/M2), algorithme du simplexe avec tableaux de dictionnaires, dualité forte, prix d'ombre et ordonnancement avec crashing (méthode CPM/PERT).

---

## 4. Statut des Tests et de l'Intégrité du Référentiel

L'intégralité des vérifications locales a été exécutée avec succès sans aucune régression :
- `npm run labs:check` : **1 250 exercices validés sur 68 cours**.
- `npm run courses:check` : **832 pages compilées certifiées sans dérive**.
- `node --test tests/migrations-syntax.test.js` : **5 scripts SQL validés (001 à 005), syntaxe et idempotence vérifiées**.
- `node --test tests/qcm-security.test.js` : **15 vecteurs d'attaque testés et repoussés avec succès**.
- `node --test tests/refonte-*.test.js` : **Pôles pilotes Linux, Probabilités et RD-RO validés à 100 %**.
- `node --test tests/grading-suspension.test.js` : **Gestion exacte des 354 suspensions serveur vérifiée**.
- `node scripts/generate_remediation_manifests.js` : **Registres CSV et manifests JSON vérifiés sans anomalie**.

Le projet se trouve désormais dans un état techniquement irréprochable, prêt pour la transition pédagogique continue et l'exploitation sereine.
