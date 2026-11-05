# Livrable 12 — Registre des Anomalies Résiduelles, Risques et Arbitrages Requis

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Date de certification : 3 novembre 2026  
> Statut : Document de transparence technique et de gestion des risques  

---

## 1. Engagement de Transparence et Posture Déontologique

Une démarche de consolidation rigoureuse ne consiste pas à prétendre abusivement que 100 % des difficultés historiques ont été magiquement résolues en une passe. Elle consiste à délimiter avec une précision chirurgicale ce qui est désormais **sécurisé, prouvé et certifié**, et ce qui relève du **backlog d'arbitrage pédagogique et d'infrastructure**.

Le présent document dresse l'inventaire exhaustif et transparent des anomalies résiduelles, des suspensions maintenues et des arbitrages humains indispensables avant le déploiement général.

---

## 2. Inventaire des Chantiers en Attente d'Arbitrage Humain

### 2.1. Backlog Pédagogique Prioritaire : Les 184 Items QCM Signalés
- **Nature de l'anomalie** : questions formulées sous forme négative (78 items), options génériques « Toutes / Aucune » (46 items), distracteurs faibles ou binaires Vrai/Faux (32 items), asymétries de longueur verbales (28 items).
- **Impact sur l'évaluation** : ces questions ne présentent aucune faille de sécurité (elles sont 100 % protégées côté serveur), mais leur pouvoir discriminant psychométrique est affaibli par les biais identifiés par le Guide NBME 2024.
- **Action requise** : transmission du fichier [flagged_184_items.json](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/flagged_184_items.json) aux coordonnateurs de modules pour reformulation affirmative et homogénéisation des distracteurs.

### 2.2. Suspensions d'Infrastructure : Les 54 Exercices SQL
- **Périmètre** : `b1-sql` (18 ex), `sql` (18 ex), `b3-sql` (18 ex).
- **Nature de l'anomalie** : les conteneurs distants d'exécution de code (Piston / Oanor) ne permettent pas d'interagir nativement avec un SGBD relationnel via des flux de texte `stdin`.
- **État de remédiation** :
  * Pour B1 : le simulateur client basé sur `sql.js` (WebAssembly) a été intégré et permet l'entraînement interactif en local dans le navigateur de l'étudiant.
  * Pour B2 et B3 : la notation sommative demeure suspendue (`BLOQUE_RESSOURCE`) dans l'attente du déploiement d'un service d'évaluation SQL dédié avec base temporaire éphémère.

### 2.3. Suspensions Didactiques : Les 73 Exercices à Recorriger
- **Périmètre** : `docker` (18 ex), `csharp` (18 ex), `b3-linux` (18 ex), `b3-github` (18 ex), et `algo-c9-e2` (1 ex).
- **Nature de l'anomalie** : les énoncés historiques ou les tests de validation ne mesurent pas les compétences réelles requises par les syllabus modernes.
- **Action requise** : refonte des énoncés et des tests sur le modèle des pôles pilotes (détection de syntaxe, cas d'usage industriels).

### 2.4. Suspensions de Fiabilité : Les 227 Exercices sans Preuve Consignée
- **Nature de l'anomalie** : exercices actifs dont l'empreinte SHA-256 n'a pas encore été inscrite dans `grading-evidence.json` après un passage sur banc d'épreuve formel.
- **Action requise** : exécution de la procédure de rejeu certifiée pour enrichir le fichier d'empreintes sans risque de régression.

### 2.5. Spécificité des 4 Cours Manuscrits
- **Périmètre** : `b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php`.
- **Nature** : ces quatre cours historiques ont été créés manuellement et ne sont pas générés par `scripts/generate-courses.js`. Leurs ateliers de code sont synchronisés par `scripts/generate-code-labs.js`, mais leur gabarit HTML général doit être maintenu avec vigilance lors des mises à jour globales de mise en page.

---

## 3. Matrice de Priorisation et Gestion des Risques

| Risque Identifié | Gravité | Probabilité | Statut Actuel | Mesure de Mitigaton Opérationnelle |
| :--- | :---: | :---: | :---: | :--- |
| **Biais de devinette sur les 184 QCM** | Moyenne | Élevée | Sous contrôle | Questions maintenues en production sous surveillance ; corrections appliquées au fil de l'eau via le registre dédié. |
| **Blocage d'évaluation sur exercices SQL** | Moyenne | Nulle | Neutralisé | Notation suspendue de manière transparente (`Eligibilite_Notation: NOTATION_SUSPENDUE`) ; l'étudiant n'est pas pénalisé. |
| **Faux échec sur algorithme itératif (`algo-c9-e2`)** | Faible | Nulle | Neutralisé | Suspension spécifique active (`METHODE_SPECIFIQUE`) empêchant toute sanction injuste de l'apprenant. |
| **Tentative de triche par oracle HTTP sur examens** | Élevée | Nulle | Éradiqué | Interception 100 % serveur (`HTTP 403`), absence de corrigé dans le DOM, recalcul serveur strict. |

---

## 4. Recommandations pour la Gouvernance Pédagogique

1. **Ne jamais lever une suspension sans preuve formelle** : l'ajout d'une empreinte dans `grading-evidence.json` doit faire suite à la vérification que le corrigé officiel réussit tous les tests et que les réponses fausses sont systématiquement rejetées.
2. **Impliquer les enseignants référents** : la reformulation des 184 questions QCM doit être visée par les enseignants titulaires de chaque cours pour préserver l'alignement avec les examens sur table.
3. **Conserver l'automatisation des contrôles** : intégrer systématiquement `scripts/verifier_consolidation.js` dans les pipelines de déploiement continu.
