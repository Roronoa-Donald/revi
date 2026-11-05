# Livrable 13 — Registre des Anomalies Résiduelles, Limites et Arbitrages Requis

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Date de certification : 3 novembre 2026  
> Statut : Document de transparence technique et de gestion des risques  

---

## 1. Posture Déontologique et Transparence Universitaire

Une démarche d'ingénierie et de certification métrologique rigoureuse exige une honnêteté sans faille :
- Prétendre qu'une plateforme de 71 cours, 1 250 exercices et 3 089 QCM est exempte de tout point d'arbitrage didactique serait un manquement professionnel caractérisé.
- La réussite technique réside dans le fait que **tous les défauts bloquants de sécurité, d'oracle et de calcul ont été éradiqués**, et que **les chantiers didactiques résiduels sont clairement cartographiés, circonscrits et documentés**.

Le présent livrable consigne les limites connues et les arbitrages humains attendus.

---

## 2. Inventaire des Points d'Arbitrage et Limites Résiduelles

### 2.1. Arbitrage Pédagogique : Les 184 Questions QCM Signalées
- **Périmètre** : 184 items identifiés par l'Audit 2 selon les directives NBME 2024 / Haladyna.
- **Diagnostic** : ces questions ne présentent aucun risque technique ou de sécurité (elles sont 100 % protégées côté serveur et ne fuitent pas). Toutefois, leur formulation (78 négations, 46 options composites toutes/aucune, 32 distracteurs faibles, 28 asymétries de longueur) peut réduire leur pouvoir discriminant métrologique.
- **Action requise** : transmission du dossier d'arbitrage [flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json) aux coordonnateurs de chaque matière pour reformulation affirmative au fil de l'eau.

### 2.2. Infrastructure SGBD : Les 54 Exercices SQL
- **Périmètre** : `b1-sql` (18 ex), `sql` (18 ex), `b3-sql` (18 ex).
- **Limite technique** : les moteurs d'exécution distants (Piston / Oanor) ne permettent pas de converser interactivement avec une base de données relationnelle via `stdin`.
- **Mitigation actuelle** :
  * En B1 : le simulateur WebAssembly `sql.js` permet l'entraînement direct dans le navigateur sans dépendance serveur.
  * En B2 et B3 : la notation sommative est suspendue de manière transparente (`BLOQUE_RESSOURCE`) pour ne pas léser les étudiants.
- **Action requise** : mise en place d'un bac à sable PostgreSQL/SQLite éphémère dédié aux tests DDL/DML.

### 2.3. Refonte de Contenu : Les 73 Exercices à Recorriger
- **Périmètre** : `docker` (18 ex), `csharp` (18 ex), `b3-linux` (18 ex), `b3-github` (18 ex), et `algo-c9-e2` (1 ex).
- **Diagnostic** : inadéquation didactique historique (scripts bash stdin simulant Git ou Docker, algorithme itératif non contraint dans algo-c9-e2).
- **Mitigation actuelle** : notation suspendue conservatoirement (`A_RECORRIGER`).
- **Action requise** : réécriture des énoncés et des tests sur le modèle des pôles pilotes.

### 2.4. Intégrité Cryptographique : Les 227 Exercices sans Preuve Consignée
- **Périmètre** : 227 exercices du catalogue sans empreinte SHA-256 dans `grading-evidence.json`.
- **Diagnostic** : les exercices sont actifs et exécutables, mais leur certificat de non-altération n'est pas encore versé au registre des preuves.
- **Action requise** : passage sur banc de rejeu certifié pour enrichir `grading-evidence.json`.

### 2.5. Spécificité des 4 Cours Manuscrits
- **Périmètre** : `b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php`.
- **Diagnostic** : ces quatre cours historiques ont été créés manuellement et ne sont pas générés par `scripts/generate-courses.js`. Leurs ateliers de code sont synchronisés par `scripts/generate-code-labs.js`, mais leur gabarit HTML général doit être maintenu avec vigilance lors des mises à jour globales de mise en page.

---

## 3. Matrice de Priorisation et Gestion des Risques

| Réf. Risque | Description | Gravité | Probabilité | Mesure de Maîtrise Active | Priorité |
| :---: | :--- | :---: | :---: | :--- | :---: |
| **R1** | Triche d'examen par oracle HTTP ou DOM | Élevée | Nulle | Totalement éradiqué (17/17 tests d'intrusion réussis) | P0 (Résolu) |
| **R2** | Injustice de notation sur exercices SQL | Moyenne | Nulle | Notation suspendue de façon transparente | P1 (Sous contrôle) |
| **R3** | Biais de devinette sur les 184 QCM | Faible | Moyenne | Questions surveillées, dossier d'arbitrage fourni | P2 (Au fil de l'eau) |
| **R4** | Fausse validation sur méthode récursive (`algo-c9-e2`) | Faible | Nulle | Suspension spécifique active dans grading-policy | P2 (Sous contrôle) |

Les limites de la plateforme sont maîtrisées, documentées et sans impact préjudiciable sur les évaluations certificatives des étudiants.
