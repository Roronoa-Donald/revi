# Livrable 11 — Bilan Général du Contre-Audit Indépendant et Matrice de Qualification

> Répertoire de livraison : `CONTRE_AUDIT_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche de travail : `remediation-pedagogique-qualite` (HEAD: `20dc28e`)  
> Dossier de référence examiné : [FINALISATION_REMEDIATION/](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/)  
> Archive examinée : [FINALISATION_REMEDIATION.zip](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION.zip)  
> Date d'achèvement du contre-audit : 3 novembre 2026  

---

## 1. Mandat Déontologique et Règle Absolue

Le présent contre-audit a été conduit de manière indépendante et contradictoire sous la règle absolue :
**VÉRIFIER AVANT DE CORRIGER**.

L'objectif fondamental n'était pas de gonfler artificiellement les indicateurs de succès, mais d'établir si la certification délivrée lors de la livraison précédente était réellement méritée à partir de preuves matérielles reproductibles.

---

## 2. Matrice de Qualification des 12 Affirmations Majeures

Conformément à la directive impérative, chaque affirmation antérieure est classée dans l'une des cinq catégories officielles :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   LES CINQ CATÉGORIES DE QUALIFICATION                      │
├──────────────────────────────────┬──────────────────────────────────────────┤
│ 1. Confirmée                     │ Établie par des preuves matérielles      │
│ 2. Confirmée avec réserves       │ Fonctionnelle mais avec limites d'usage  │
│ 3. Non démontrée                 │ Affirmation sans preuve reproductible    │
│ 4. Contredite par les preuves    │ Infirmée par l'inspection du code réel   │
│ 5. Bloquée par validation humaine│ Requiert une décision pédagogique externe│
└──────────────────────────────────┴──────────────────────────────────────────┘
```

| N° | Affirmation Antérieure de Certification | Catégorie Attribuée | Preuve Matérielle et Justification du Contre-Audit |
| :---: | :--- | :---: | :--- |
| **01** | **Sécurisation 100 % serveur des évaluations QCM** (API Fastify, anti-oracle, anti-rejeu, calcul serveur) | **Confirmée** | 17 tests d'intégration dans [tests/qcm-security.test.js](file:///home/rd/Desktop/proba/tests/qcm-security.test.js) (pass à 100 %) et 11 vecteurs d'intrusivité HTTP réels consignés dans [http_adversarial_proofs.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/http_adversarial_proofs.log). |
| **02** | **Fiabilité et étanchéité du moteur d'évaluation Runner** ([server/exercises/runner.js](file:///home/rd/Desktop/proba/server/exercises/runner.js)) | **Confirmée** | Tolérance `1e-5` strictement scopée à `isAnalyse` ou `tolerance` explicite ; `stripPromptPollution` absent du code ; normalisation `expandMul` restreinte. 100 % pass dans [tests/runner-remediation.test.js](file:///home/rd/Desktop/proba/tests/runner-remediation.test.js). |
| **03** | **Refonte sur supports réels des 3 pôles pilotes** (Linux B1, Probabilités B2, Recherche Opérationnelle B2) | **Confirmée** | 56 fiches refondues et validées par tests dédiés : 18 commandes pures pour Linux B1, 18 exercices conformes aux annales de TD 1-6 pour Probabilités B2, et 20 modélisations pour RD-RO. |
| **04** | **Robustesse et idempotence du schéma PostgreSQL** (migrations `001_` à `005_`) | **Confirmée** | Exécution réelle sur cluster PostgreSQL physique isolé (port 54333) : 12 tables, 46 index, rejeu 100 % idempotent, clés étrangères et contraintes d'unicité respectées, isolation multi-utilisateurs prouvée dans [postgresql_isolated_run.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/postgresql_isolated_run.log). |
| **05** | **Conformité d'intégrité de l'archive de livraison zip** | **Confirmée** | Contrôle `unzip -t` avec 0 erreur et concordance stricte de 22 empreintes SHA-256 (22 correspondances, 0 discordance) documentée dans [zip_checksum_comparison.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/zip_checksum_comparison.log). |
| **06** | **Maintien des 227 suspensions conservatoires d'exercices** | **Confirmée** | Les 227 fiches de programmation réelle sont absentes de [grading-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-evidence.json) et doivent impérativement demeurer suspendues tant qu'un banc d'exécution distant n'a pas prouvé leur fiabilité. |
| **07** | **Conformité globale aux standards d'accessibilité WCAG 2.2 AA** | **Confirmée avec réserves** | Navigation clavier, lien d'évitement (`.skip-link`) et politique zéro émoji respectés. Toutefois, absence de tests dynamiques avec lecteur d'écran et sémantique de formulaire perfectible sur les QCM. |
| **08** | **Certification de notation officielle des 814 exercices actifs** (`NOTATION_AUTORISEE`) | **Non démontrée** | 792 sur 814 (97,3 %) reposent sur le gabarit d'analyse textuelle `runAnalyse`. 80,1 % ne disposent d'aucun test négatif et d'aucun test limite. Leur fiabilité pour une notation sommative officielle à fort enjeu n'est pas métrologiquement démontrée. |
| **09** | **Sémantique accessible des QCM via `<fieldset>` et `<legend>`** | **Contredite par les preuves** | L'inspection du code généré ([scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js) et [b1-algebre/chapitres/chapitre1.html](file:///home/rd/Desktop/proba/b1-algebre/chapitres/chapitre1.html)) prouve que les formulaires utilisent `<div class="q">` et `<button class="opt">`, en contradiction directe avec les affirmations du livrable 10 antérieur. |
| **10** | **Répartition exacte des 184 QCM signalés selon 4 quotas fixes (78, 46, 32, 28)** | **Contredite par les preuves** | L'inspection de [build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js#L573-L620) révèle un forçage artificiel par compteurs (ex: présence du mot « quel » pour attribuer la catégorie Toutes/Aucune). L'analyse sémantique réelle met en évidence 701 asymétries de longueur et 35 questions négatives. |
| **11** | **Clôture définitive du dossier des 184 QCM signalés** | **Bloquée par une validation humaine** | 100 % des 184 fiches demeurent étiquetées `review_status: 'A_REFORMULER'` et `revue_humaine_requise: 'OUI'` dans [flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json). Aucun enseignant n'a encore enregistré d'arbitrage. |
| **12** | **Valeur certifiante des 33 contrôles automatiques du vérificateur** | **Non démontrée** | Le script `verifier_finalisation.js` réalise des vérifications de présence de fichiers et de concordances textuelles, mais ne peut en aucun cas se substituer à une certification pédagogique ou métrologique par les pairs. |

---

## 3. Synthèse Métrologique et Décisions d'Exploitation

### 3.1. Ce qui est Totalement Fiabilisé et Prêt pour la Production :
1. **La sécurité d'évaluation** : les triches par oracle, rejeu, omission d'identifiant et falsification de score sont définitivement rendues impossibles côté serveur.
2. **Le schéma de base de données** : les migrations PostgreSQL 001_ à 005_ sont robustes, transactionnelles et strictement idempotentes.
3. **Les 3 pôles pilotes refondus** : Linux B1, Probabilités B2 et Recherche Opérationnelle B2 constituent des modèles exemplaires d'alignement sur les annales universitaires réelles.
4. **La suite de tests unitaire** : 8 398 tests passent à 100 % sans aucune régression (code de sortie 0).

### 3.2. Ce qui Doit Être Géré avec Prudence Opérationnelle :
1. **Statut des 814 exercices actifs** : Maintenir l'accès aux exercices pour l'entraînement formatif des étudiants, mais qualifier officiellement leur note comme formative (`ENTRAINEMENT_FORMATIF_SEUL`), en évitant d'engager la responsabilité de l'établissement sur des examens sommatifs non audités.
2. **Statut des 184 QCM signalés** : Maintenir le blocage dans les examens sommatifs (`secure: true`) et soumettre le dossier [flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json) à la commission pédagogique d'enseignants.
3. **Statut des 227 suspensions** : Conserver la suspension conservatoire jusqu'au déploiement d'un banc d'exécution distant dédié.

---

## 4. Index Exhaustif des Livrables Produits

L'ensemble des livrables exigés par le mandat du contre-audit est consigné dans le répertoire [CONTRE_AUDIT_FINAL/](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/) :

1. [00_ETAT_REEL.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/00_ETAT_REEL.md) — État réel du dépôt Git, HEAD `20dc28e`, diff actif et inventaire.
2. [01_AUDIT_814_EXERCICES.csv](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/01_AUDIT_814_EXERCICES.csv) — Audit individuel des 814 exercices (contrat, correcteur, positifs, négatifs, limites, statut contradictoire).
3. [02_AUDIT_3089_QCM.csv](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv) — Audit individuel des 3 089 items QCM distinguant structure, clé, explication et arbitrage humain.
4. [03_AUDIT_184_QCM.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/03_AUDIT_184_QCM.md) — Audit contradictoire des 184 questions signalées et révélation du forçage par quotas.
5. [04_SECURITE_HTTP.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/04_SECURITE_HTTP.md) — Épreuves d'intrusivité HTTP réelles sur 11 vecteurs d'attaque avec captures de requêtes et réponses.
6. [05_PREUVES_SHA256.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/05_PREUVES_SHA256.md) — Analyse critique des 227 suspensions et distinction entre intégrité d'octets et validité didactique.
7. [06_ACCESSIBILITE.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/06_ACCESSIBILITE.md) — Audit contradictoire WCAG 2.2 AA et réfutation de l'existence de `<fieldset>` dans le gabarit réel.
8. [07_POSTGRESQL.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/07_POSTGRESQL.md) — Preuve d'exécution des migrations sur cluster PostgreSQL réel, contraintes FK et isolation multi-utilisateurs.
9. [08_TESTS_COMPLETS.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/08_TESTS_COMPLETS.md) — Bilan exhaustif de la campagne de tests (8 398 pass, 0 fail, 3 skip, code retour 0).
10. [09_ARCHIVE_ET_GIT.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/09_ARCHIVE_ET_GIT.md) — Contrôle d'intégrité de l'archive `FINALISATION_REMEDIATION.zip` (22/22 concordances SHA-256).
11. [10_ANOMALIES_RESTANTES.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/10_ANOMALIES_RESTANTES.md) — Registre transparent des dettes didactiques résiduelles et priorités de clôture.
12. [11_BILAN_CONTRE_AUDIT.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/11_BILAN_CONTRE_AUDIT.md) — Synthèse générale classant les 12 affirmations majeures dans les catégories normatives.
13. [PREUVES/](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/) — Dossier rassemblant tous les journaux d'exécution bruts, traces HTTP, logs PostgreSQL et diffs.
