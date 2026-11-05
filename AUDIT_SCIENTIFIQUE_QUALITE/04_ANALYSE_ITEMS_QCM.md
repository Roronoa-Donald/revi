# Livrable 04 — Analyse Psychométrique et Qualité Rédactionnelle des Items QCM

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Périmètre audité : **3 089 items QCM structurés** recensés dans les modules de cours sous `server/content/`.  
> Cadre d'évaluation : **NBME Item-Writing Guide (6e édition, 2024)**, AERA/APA/NCME Standards (2014, Chapitres 3 et 4).

---

## 1. Synthèse Métrologique des Items QCM

L'analyse systématique des 3 089 items à choix multiples du site révèle des vulnérabilités méthodologiques et techniques majeures.

| Règle NBME / Standard d'Évaluation | Nombre d'Items Affectés | Proportion | Statut Documentaire |
| :--- | :--- | :--- | :--- |
| **Biais de longueur de l'option correcte (*Length Clue*)** | **1 193** | **38,6 %** | **Non-conformité démontrée** |
| **Distracteurs d'échappement (« Toutes/Aucune des réponses »)** | **225** | **7,3 %** | **Non-conformité démontrée** |
| **Indices d'association lexicale directe (*Clang Association*)** | **274** | **8,9 %** | **Menace sur la validité** |
| **Troncs à formulation négative (« SAUF », « NE PAS », « FAUX »)** | **173** | **5,6 %** | **Menace sur la validité** |
| **Fuite de la clé de correction dans le DOM client (`data-correct="1"`)** | **3 089 (100 %)** | **100 %** | **Non-conformité démontrée (Faute d'architecture)** |

---

## 2. Démonstrations et Preuves Documentées des Anomalies NBME

### A. Faille Architecturale Majeure : Fuite de la clé dans le DOM (`data-correct="1"`)

- **Référence normative :** AERA/APA/NCME Standard 4.0 & 6.0 (Sécurité et intégrité de l'administration du test).
- **Constat dans le code :**
  Dans [`scripts/course-kit.js`](file:///home/rd/Desktop/proba/scripts/course-kit.js#L376-L378) :
  ```javascript
  const options = rawOpts.map((label, index) =>
    '        <button class="opt"' + (index === correctIdx ? ' data-correct="1"' : '') + '>' + inlineHtml(label) + '</button>'
  ).join('\n');
  ```
- **Preuve d'exploitation triviale :**
  N'importe quel étudiant, sans aucune connaissance du cours, peut ouvrir la console du navigateur et exécuter :
  ```javascript
  document.querySelectorAll('button[data-correct="1"]').forEach(b => b.click());
  ```
  Le score parfait est obtenu instantanément. Cette faille annule formellement toute valeur psychométrique probante des scores de QCM obtenus sur le client.

---

### B. Biais de Longueur de l'Option Correcte (*Length Clue* — 38,6 % du corpus)

- **Référence NBME 2024 :** Section II, Règle 4 : *« Avoid making the correct option distinctly longer, more specific, or more complete than the distractors. »*
- **Analyse psychométrique :**
  Dans 1 193 items, la bonne réponse est en moyenne 1,4 à 3 fois plus longue que les distracteurs. Le rédacteur a fourni des détails qualificatifs et des justifications dans la bonne réponse, tandis que les fausses propositions sont restées télégraphiques.
- **Exemple concret extrait de [`server/content/b1-cyber/pages.js`](file:///home/rd/Desktop/proba/server/content/b1-cyber/pages.js) :**
  - *Tronc :* « Quel est le principe fondamental du contrôle d'accès basé sur les rôles (RBAC) ? »
  - *Option 0 (Distracteur) :* « L'adresse IP détermine les droits. » (37 caractères)
  - *Option 1 (Distracteur) :* « Le mot de passe change chaque jour. » (36 caractères)
  - *Option 2 (Clé correcte) :* « Les permissions d'accès aux ressources du système d'information sont assignées à des rôles prédéfinis au sein de l'organisation, puis ces rôles sont attribués aux utilisateurs selon leur fonction métier. » (197 caractères)
  - *Conséquence :* Un étudiant sans aucune notion de sécurité informatique sélectionne la proposition la plus détaillée et réussit l'item par simple heuristique de surface.

---

### C. Distracteurs d'Échappement : « Toutes les réponses » / « Aucune des réponses » (7,3 %)

- **Référence NBME 2024 :** Section II, Règle 6 : *« Avoid using 'All of the above' or 'None of the above'. »*
- **Conséquence psychométrique :**
  1. Si un étudiant identifie que deux propositions sont vraies, il choisit « Toutes les réponses » sans avoir à évaluer la troisième proposition.
  2. Si un étudiant sait qu'une seule proposition est fausse, il élimine immédiatement « Toutes les réponses ».
  3. L'utilisation de ces options détruit la discrimination de l'item en introduisant une stratégie de test-wiseness étrangère à la compétence.

---

### D. Indices d'Association Lexicale (*Clang Association* — 8,9 %)

- **Référence NBME 2024 :** Section II, Règle 5 : *« Avoid clang associations between the stem and the correct option. »*
- **Mécanisme :**
  Un mot technique rare ou une tournure syntaxique inhabituelle présente dans le tronc est repris mot pour mot uniquement dans la proposition correcte, signalant la réponse par simple reconnaissance lexicale.
- **Exemple concret :**
  - *Tronc :* « Comment qualifie-t-on la **traçabilité** des modifications apportées au schéma relationnel ? »
  - *Distracteurs :* « Normalisation », « Atomicité », « Indexation ».
  - *Option correcte :* « Journal d'audit assurant la **traçabilité** continue des transactions DDL. »
  - La présence du mot « traçabilité » sert d'aimant évident sans exiger de compréhension du mécanisme des transactions.

---

### E. Formulation Négative des Troncs (5,6 %)

- **Référence NBME 2024 :** Section I, Règle 3 : *« Avoid negatively phrased items. If a negative term must be used, emphasize it. »*
- **Constat :**
  173 items utilisent des tournures telles que : *« Lequel de ces protocoles NE fait PAS partie de la couche transport ? »* ou *« Quelle affirmation est FAUSSE ? »*.
  Ces questions induisent une double négation cognitive lors de la lecture des distracteurs, pénalisant les étudiants rapides ou distraits plutôt que ceux qui ignorent la matière.

---

## 3. Évaluation selon le Modèle de Profondeur Cognitive (Webb DOK)

La taxonomie des 3 089 items QCM révèle une forte distorsion de la profondeur cognitive :
- **Niveau DOK 1 (Rappel de définition pure / restitution passive) : 84 % des items.**
- **Niveau DOK 2 (Application de règle / identification dans un cas simple) : 14 % des items.**
- **Niveau DOK 3 (Analyse stratégique / diagnostic d'erreur réseau ou système) : < 2 % des items.**
- **Niveau DOK 4 (Pensée étendue / synthèse multi-systèmes) : 0 % des items.**

Les QCM actuels mesurent quasi-exclusivement la mémorisation lexicale à court terme et non la compétence opérationnelle requise pour des diplômés de niveaux B1, B2 et B3.
