# Rapport d'Audit Pédagogique — `b3-cloud-azure` (Cloud Azure · B3)

- **Identifiant / Slug** : `b3-cloud-azure`
- **Niveau académique** : B3 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : b3-cloud-computing (S1), b3-windows-server (AD/Entra ID), ccna (CIDR/VNet)
- **Diagnostic topologique (Phase 1)** : Modèles Cloud NIST, CIDR/routage, JSON, identités Active Directory
- **Registre de concepts (`audit/registres/b3-cloud-azure.csv`)** : 522 termes techniques recensés (188 définis avant/à la 1re occurrence, **17 définis après (`D2`)**, **311 jamais définis (`D1/D4/D6`)**, 6 définis dans un autre cours)
- **Score moyen C1–C14** : **14.8 / 42 (35.2 %)**
- **Verdict global** : **À RÉÉCRIRE (35.2 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 0/3 | 1/3 | 1/3 | 0/3 | 1/3 | 1/3 | **0.7/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **2.0/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 0/3 | 1/3 | 0/3 | 0/3 | 0/3 | 1/3 | **0.3/3** |
| **Total** | **Score sur 42 (et %)** | **13/42** (31.0%) | **16/42** (38.1%) | **15/42** (35.7%) | **14/42** (33.3%) | **15/42** (35.7%) | **16/42** (38.1%) | **14.8/42 (35.2%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `B3-CLOUD-AZURE-001` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « Dans une entreprise internationale migrant son système d'information vers Microsoft Azure, le déploiement anarchique de… »
- **Pourquoi un novice bute** : Mélange tutoiement (L1 : objectifs/test de maîtrise) et vouvoiement (L66 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-002` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L122`
- **Extrait (≤ 15 mots)** : « <p>La syntaxe universelle recommandée par Microsoft adopte le format suivant :<br>,<code>&lt;type_ressource&gt;-&lt;application/workload&gt;-&lt;environnement&gt;-&lt;region&gt;-&lt;instance&gt;</code></p>,<ul>, <li><code>rg-erp-prod-we-01</code> : Groupe de… »
- **Pourquoi un novice bute** : Virgules parasites visibles dans le rendu HTML, causées par un tableau JS concaténé via toString() dans kit.box().
- **Correction minimale proposée** : Joindre les lignes du tableau avec .join("\n") dans server/content et scripts/course-kit.js.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-003` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-005` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-006` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L485`
- **Extrait (≤ 15 mots)** : « Conception de hiérarchie ARM d'entreprise multi-environnements : Créer une arborescence complète de Management Groups isolant… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-007` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L135`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (az3-c1-e1) — Validateur de hiérarchie ARM & Conventions de nommage CAF »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-008` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L193`
- **Extrait (≤ 15 mots)** : « <li>Utiliser split("/") sur le chemin de la hiérarchie pour vérifier qu'il contient exactement 4 éléments.</li> »
- **Pourquoi un novice bute** : Syntaxe Python exigée ou citée dans une étude de cas sans exécution Python alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-009` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre1.html:L333`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-010` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L505`
- **Extrait (≤ 15 mots)** : « Création de rôles RBAC sur-mesure (Custom Roles) : Rédiger des gabarits JSON de rôles personnalisés… »
- **Pourquoi un novice bute** : Style emphatique (« chirurgical ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « chirurgical » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-011` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L505`
- **Extrait (≤ 15 mots)** : « Création de rôles RBAC sur-mesure (Custom Roles) : Rédiger des gabarits JSON de rôles personnalisés… »
- **Pourquoi un novice bute** : Style emphatique (« chirurgicale ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « chirurgicale » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-012` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Dans un environnement d'entreprise hébergeant des données financières et des infrastructures critiques, accorder des droits… »
- **Pourquoi un novice bute** : Mélange tutoiement (L1 : objectifs/test de maîtrise) et vouvoiement (L66 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-013` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-014` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-015` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-016` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L504`
- **Extrait (≤ 15 mots)** : « Implémentation d'une architecture Zero Trust avec Managed Identities : Configurer des identités managées User-Assigned pour… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-017` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre2.html:L148`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (az3-c2-e1) — Évaluateur de permissions Azure RBAC »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-018` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Dans un contexte de forte croissance où une application critique subit des pics de fréquentation… »
- **Pourquoi un novice bute** : Mélange tutoiement (L1 : objectifs/test de maîtrise) et vouvoiement (L66 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-019` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre3.html:L118`
- **Extrait (≤ 15 mots)** : « <p>Dans une architecture web classique à 3 niveaux (Front Web -&gt; API Métier -&gt; Base… »
- **Pourquoi un novice bute** : Virgules parasites visibles dans le rendu HTML, causées par un tableau JS concaténé via toString() dans kit.box().
- **Correction minimale proposée** : Joindre les lignes du tableau avec .join("\n") dans server/content et scripts/course-kit.js.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-020` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-021` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre3.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-022` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre3.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-023` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre3.html:L511`
- **Extrait (≤ 15 mots)** : « Sélection rigoureuse des gabarits VM par analyse de charges réelles : Déterminer la famille de… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-CLOUD-AZURE-024` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-cloud-azure/chapitres/chapitre3.html:L149`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (az3-c3-e1) — Dimensionneur de VM Azure et calcul de SLA combiné »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6**.
- **Synthèse du second lecteur novice** : Le lecteur bute principalement sur l'absence de rappel des prérequis en ouverture de chapitre (`C3`), l'introduction de termes techniques ou d'acronymes dans la mise en situation avant leur définition (`D2`/`D4`), et la dissonance entre les consignes résiduelles de code et les grilles statiques `analyse` (`D8`/`D9`).

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`chapitres/exercices.html`) & Atelier (`atelier.html`)** : Dans les cours convertis en `analyse`, le catalogue ou l’atelier conserve des mentions résiduelles de Python/Bash (`D8`) et, pour 11 cours B3, les liens relatifs `chapitres/chapitreN.html` depuis `chapitres/exercices.html` produisent des erreurs 404 (`D15`).
- **Simulateur d'examen / Examens blancs (`chapitres/examens.html`)** : Dans les cours B3 (`examens.html`), les corrigés sont affichés directement en clair sans balise `<details>` et sans chronomètre interactif (`data-timer`), contrairement aux cours B1/B2 (`simulateur-examen.html`).
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `b3-cloud-azure`

**À RÉÉCRIRE (35.2 % — < 70 %)** — Score moyen : **14.8 / 42 (35.2 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
