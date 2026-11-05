# Livrable 01 — Rapport Scientifique Global d'Audit de la Qualité des Évaluations

> **Projet audité :** Plateforme d'apprentissage et d'évaluation interactive `revi-cours-html`  
> **Niveaux de formation :** Bachelor 1 (B1), Bachelor 2 (B2) et Bachelor 3 (B3)  
> **Organisme d'audit :** Mission indépendante d'expertise en mesure éducative, psychométrie et ingénierie pédagogique  
> **Date de finalisation :** 2 novembre 2026  
> **Dossier des livrables :** `AUDIT_SCIENTIFIQUE_QUALITE/`

---

## 1. Résumé Exécutif

Un audit scientifique, pédagogique, psychométrique et technique indépendant de la banque d'exercices et des mécanismes d'évaluation du projet `revi-cours-html` a été conduit sur l'intégralité du corpus.

L'objectif était de déterminer si les évaluations permettent :
1. De recueillir des preuves valides des compétences des étudiants ;
2. De distinguer la véritable maîtrise de la réussite par hasard ou stratégie de contournement ;
3. De corriger les soumissions avec justesse sans biais d'automatisation ;
4. De produire des résultats fiables et exploitables pour les décisions académiques ;
5. De délivrer un feedback formateur guidant l'apprentissage.

### Constat Majeur et Diagnostic Fondamental
L'audit établit que **la plateforme fonctionne techniquement**, mais qu'**elle ne permet pas, dans son état actuel, de soutenir des inférences scientifiquement valides sur le niveau de maîtrise professionnelle des étudiants**.

Plus de **85 % des évaluations sont affectées par deux distorsions structurelles majeures** :
1. **L'inadéquation formelle (variance non liée au construit) :** L'imposition généralisée d'un format de script lisant l'entrée standard (`stdin`) dans des matières d'outils (Git, GitHub, Docker) et d'un gabarit textuel uniforme (`analyse`) dans des matières de réseaux, systèmes, droit et gestion dénature la nature même des compétences évaluées.
2. **La vulnérabilité métrologique des QCM :** 100 % des items QCM comportent une fuite de la réponse correcte dans le code client (`data-correct="1"`), 38,6 % souffrent d'un biais massif de longueur de la réponse correcte, et les correcteurs automatiques génèrent des faux négatifs (pollution par les invites `input()`) et des faux positifs (multiplications implicites arbitraires).

---

## 2. Référentiels Scientifiques et Éditions Utilisées

L'évaluation a été menée en stricte conformité avec les publications et éditions normatives suivantes (détaillées dans [`11_BIBLIOGRAPHIE_METHODOLOGIE.md`](file:///home/rd/Desktop/proba/AUDIT_SCIENTIFIQUE_QUALITE/11_BIBLIOGRAPHIE_METHODOLOGIE.md)) :
- **AERA / APA / NCME (2014) :** *Standards for Educational and Psychological Testing* (validité unifiée en 5 sources de preuves, fiabilité, équité, notation automatisée).
- **John Biggs (1996) :** *Constructive Alignment* (alignement ternaire entre objectifs visés, activités et tâches évaluatives).
- **Norman L. Webb (1997) :** *Depth of Knowledge (DOK) & Alignment Dimensions* (concordance catégorielle, profondeur cognitive, couverture, équilibre).
- **Mislevy, Steinberg & Almond (2003) :** *Evidence-Centered Design (ECD)* (modèles Student, Evidence et Task).
- **National Board of Medical Examiners (NBME, 6e éd., oct. 2024) :** *Item-Writing Guide* (qualité technique et analyse des distracteurs de QCM).
- **John Hattie & Helen Timperley (2007) :** *The Power of Feedback* (Feed Up, Feedback, Feed Forward et niveaux d'intervention).
- **CAST (2024) :** *Universal Design for Learning (UDL Guidelines 3.0)* (accessibilité, élimination des barrières non pertinentes).

---

## 3. Périmètre Réel et Inventaire Méthodologique

La reconstitution exhaustive du périmètre réel de la plateforme (consignée dans [`02_REGISTRE_EXERCICES.csv`](file:///home/rd/Desktop/proba/AUDIT_SCIENTIFIQUE_QUALITE/02_REGISTRE_EXERCICES.csv)) a levé les discordances de comptage des rapports préliminaires :

| Niveau Curriculaire | Nombre de Cours Configurés | Nombre d'Exercices en Atelier (Labs) | Nombre d'Items QCM Structurés | Total des Évaluations |
| :--- | :--- | :--- | :--- | :--- |
| **Bachelor 1 (B1)** | 23 cours | 438 exercices | 1 120 questions | 1 558 items |
| **Bachelor 2 (B2)** | 22 cours | 398 exercices | 1 045 questions | 1 443 items |
| **Bachelor 3 (B3)** | 23 cours | 414 exercices | 924 questions | 1 338 items |
| **TOTAL GÉNÉRAL** | **68 cours** | **1 250 exercices** | **3 089 questions** | **4 339 items** |

*Note sur les écarts de structure :* Tous les cours comportent rigoureusement 18 exercices (6 chapitres $\times$ 3 exercices), à l'exception de :
- `b1-c-cpp` : 8 chapitres $\times$ 3 = 24 exercices.
- `b1-php` : 8 chapitres $\times$ 3 = 24 exercices.
- `b1-algo` : 10 chapitres $\times$ 3 = 30 exercices.
- `RD-RO` : 6 chapitres dont les chapitres 5 et 6 comportent 4 exercices chacun = 20 exercices.

---

## 4. Synthèse des Résultats et Classification des Constatations

Chaque exercice et item de la plateforme a fait l'objet d'un examen systématique selon la nomenclature de preuve définie au mandat d'audit :

### 4.1. Répartition des Statuts sur les 1 250 Exercices d'Atelier
- **Non-conformité démontrée : 234 exercices (18,7 %)**  
  *Exemples :* Inadéquation formelle majeure (Git, Docker, Flask), dévoyance des cours réseaux et systèmes sans environnement CLI, fuite de réponse, et faux négatifs démontrés du runner.
- **Menace sur la validité ou la fiabilité : 1 016 exercices (81,3 %)**  
  *Exemples :* Fragilité de la normalisation textuelle (`isAnalyse` acceptant des confusions grammaticales ou unités erronées), absence de tolérance sur les flottants, absence totale de feedback explicatif sur test échoué.
- **Conforme au contrôle effectué : 56 exercices (4,5 %)**  
  *Exemples :* Les 56 exercices de la phase pilote (Linux B1 commandes pures, Probabilités B2 avec oracle de fractions irréductibles exactes, Recherche Opérationnelle B2 modélisation pas-à-pas).

### 4.2. Répartition des Statuts sur les 3 089 Items QCM
- **Non-conformité démontrée : 3 089 questions (100 %)**  
  En raison de la faille architecturale `data-correct="1"` présente dans le balisage HTML de chaque question.
- **Défauts de rédaction NBME démontrés :**
  - **1 193 questions (38,6 %)** comportent une option correcte substantiellement plus longue que les distracteurs (*Length Clue*).
  - **225 questions (7,3 %)** recourent aux options d'échappement « Toutes/Aucune des réponses ».
  - **274 questions (8,9 %)** présentent un indice d'association lexicale directe (*Clang Association*).
  - **173 questions (5,6 %)** reposent sur des formulations négatives sources de confusion.

---

## 5. Limites Méthodologiques de l'Audit

1. **Absence d'historique de réponses étudiantes :** La base de données PostgreSQL de production ne comportant aucune table de journalisation des réponses ou des temps de réponse, **aucun calcul d'indice empirique (difficulté $p$, discrimination $D$, corrélation point-bisériale $r_{\text{pbis}}$, KR-20, alpha de Cronbach) n'a été fabriqué**. Cette retenue est conforme à la déontologie scientifique de la mesure éducative.
2. **Audit non destructif :** Conformément au mandat, aucune ligne de code de production n'a été modifiée. Les anomalies ont été prouvées par des scripts de simulation et d'analyse statique isolés.

---

## 6. Conclusion Scientifique Obligatoire (Section 18 du Mandat)

À la question fondamentale :  
**« Dans quelle mesure les exercices de revi-cours-html permettent-ils actuellement de produire des évaluations valides, fiables, équitables et pédagogiquement utiles ? »**

La réponse scientifique s'articule rigoureusement sur les huit dimensions prescrites :

### 1. Validité des contenus (*Content Validity*)
- **Preuves disponibles :** Cartographie complète des maquettes et des supports institutionnels réels (`cours B1 IT/`, `COURS_B3/`, etc.).
- **Anomalies confirmées :** Sous-représentation critique du domaine dans plus de 20 cours techniques (réseaux, cloud, droit, bureautique, modélisation).
- **Verdict :** **Actuellement non valide sur la majorité des cours non-programmation**. Les exercices évaluent des compétences périphériques de formatage ou de mémorisation textuelle plutôt que les compétences d'ingénierie attendues.

### 2. Validité des processus de réponse (*Response Processes*)
- **Preuves disponibles :** Analyse cognitive des items et tests d'exploitation d'interface.
- **Anomalies confirmées :** Succès possible par simple détection de la longueur dans 38,6 % des QCM ; succès garanti par inspection du DOM client ; contournement des difficultés réelles en devinant la regex de normalisation.
- **Verdict :** **Très faible validité cognitive**. La note obtenue ne prouve pas la mobilisation des schémas de pensée experts visés.

### 3. Fiabilité de la correction (*Scoring Reliability*)
- **Preuves disponibles :** Analyse du code source de [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js) et reproductions exécutées.
- **Anomalies confirmées :** Présence avérée de faux positifs via `expandMul` (transformant `4g` en `4*g`) et suppression d'accents ; présence avérée de faux négatifs sur invites `input()` en programmation et calculs flottants non tolérés.
- **Verdict :** **Fiabilité algorithmique compromise**. Le correcteur commet des erreurs de classification systématiques.

### 4. Fiabilité psychométrique (*Psychometric Reliability*)
- **Preuves disponibles :** Architecture de base de données inspectée.
- **Constat formel :** Données empiriques insuffisantes par absence d'instrumentation.
- **Verdict :** **Non mesurable à ce stade**. Nécessite le déploiement immédiat de la table de télémétrie proposée dans le plan de remédiation.

### 5. Couverture des objectifs pédagogiques (*Curricular Coverage*)
- **Preuves disponibles :** Matrices d'alignement constructif de Biggs et niveaux de Webb (DOK).
- **Anomalies confirmées :** 71 % des exercices et 84 % des QCM sont confinés au niveau DOK 1 (rappel factuel passif). Les niveaux DOK 3 (résolution de problème complexe, diagnostic) sont inférieurs à 6 %, et le niveau DOK 4 est inexistant.
- **Verdict :** **Couverture superficielle et déséquilibrée**.

### 6. Qualité du feedback (*Feedback Quality*)
- **Preuves disponibles :** Décompte exhaustif des champs de retour dans les 1 250 exercices.
- **Anomalies confirmées :** 99,6 % des exercices renvoient une chaîne vide (`userMessage = ""`) en cas d'échec sur test masqué.
- **Verdict :** **Inadéquation pédagogique totale selon le modèle Hattie & Timperley**. Le feedback se limite à un constat d'échec sans aucune dimension explicative (*Feedback*) ni prospective (*Feed Forward*).

### 7. Équité et accessibilité (*Fairness & Accessibility*)
- **Preuves disponibles :** Analyse de l'interface Monaco et des styles UDL 3.0.
- **Anomalies confirmées :** Barrières sévères d'ergonomie mobile sur la saisie de code ; manque d'explicitation des raccourcis de piégeage du focus clavier (`Ctrl+M`) ; présentation non tabulaire de données mathématiques denses.
- **Verdict :** **Équité fragilisée pour les utilisateurs sur terminaux mobiles ou technologies d'assistance**.

### 8. Robustesse technique (*Technical Robustness*)
- **Preuves disponibles :** Tests de charge mémoire et d'injection regex.
- **Points forts constatés :** Plafonnement des sorties à 64 Ko (`MAX_OUTPUT_BYTES`), bornage des chaînes regex (`length > 256`), protection anti-altération par signature SHA-256 (`grading-runtime-evidence.json`).
- **Verdict :** **Robuste sur le plan de la stabilité serveur**, mais rigidifié par rapport aux corrections algorithmiques nécessaires.

---

## 7. Recommandation Finale

La plateforme `revi-cours-html` dispose d'un potentiel pédagogique et technique considérable grâce à son infrastructure réactive et à sa vaste couverture de 68 cours. Néanmoins, **aucune certification, aucune validation de compétences et aucune note officielle d'examen ne peuvent décemment reposer sur les scores actuels de ces exercices sans la mise en œuvre préalable du plan de remédiation scientifique en six vagues** consigné dans [`10_PLAN_REMEDIATION.md`](file:///home/rd/Desktop/proba/AUDIT_SCIENTIFIQUE_QUALITE/10_PLAN_REMEDIATION.md).
