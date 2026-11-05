# 01_RÉCONCILIATION DES EXERCICES — CADRE FORENSIQUE ET ARITHMÉTIQUE DES ENSEMBLES

**Document de référence :** [server/exercises/index.js](file:///home/rd/Desktop/proba/server/exercises/index.js), [server/exercises/course-config.js](file:///home/rd/Desktop/proba/server/exercises/course-config.js), [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js)  
**Manifestes associés :** [manifest_exercices.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_exercices.json), [manifest_exercices.csv](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_exercices.csv), [manifest_pilotes.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_pilotes.json), [manifest_hors_pilote.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_hors_pilote.json)  

---

## 1. INVENTAIRE BRUT DU CATALOGUE : 1 250 EXERCICES UNIQUES

L'extraction directe et exhaustive réalisée par l'outil [reconcile_exercises.js](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/08_OUTILS/reconcile_exercises.js) via l'appel `listExercises()` de l'API interne confirme rigoureusement les caractéristiques fondamentales du catalogue :

- **Nombre total d'exercices indexés :** 1 250
- **Nombre de cours pourvus d'ateliers de code :** 68 cours
- **Nombre d'identifiants dupliqués :** 0 (unicité stricte à 100 %)
- **Distribution par niveau pédagogique :**
  - **Licence 1 (B1) :** 472 exercices répartis sur 23 cours (ex. `b1-python`: 18, `b1-algo`: 30, `b1-linux`: 18, `b1-c-cpp`: 24, etc.)
  - **Licence 2 (B2) :** 414 exercices répartis sur 23 cours (ex. `probabilites`: 18, `RD-RO`: 20, `sql`: 18, `react`: 18, etc.)
  - **Licence 3 (B3) :** 364 exercices répartis sur 22 cours (ex. `b3-algo`: 18, `b3-devops`: 18, `b3-windows-server`: 18, etc.)

---

## 2. ARITHMÉTIQUE DES 354 SUSPENSIONS DE NOTATION

Le fichier [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js) régit l'éligibilité des exercices à la notation sommative (`NOTATION_AUTORISEE` vs `NOTATION_SUSPENDUE`). L'audit forensique a rejoué l'intégralité des règles de suspension sans aucun contournement :

1. **Suspension globale par cours (7 cours entiers) :**
   Les cours dont la qualification pédagogique est formellement ajournée par la direction académique représentent $7 \times 18 = 126$ exercices :
   - `b1-prog-web` (18 exercices)
   - `b1-stats` (18 exercices)
   - `b1-algebre` (18 exercices)
   - `admin-vm` (18 exercices)
   - `droit` (18 exercices)
   - `masterclass-apprendre` (18 exercices)
   - `b3-anglais` (18 exercices)
   $$\text{Sous-total cours complets} = 126$$

2. **Suspension unitaire didactique :**
   - `algo-c9-e2` (cours `b1-algo`, chapitre 9, exercice 2) est individuellement suspendu pour ambiguïté de consigne.
   $$\text{Sous-total individuel} = 1$$

3. **Suspensions pour défaut d'empreinte cryptographique SHA-256 :**
   La politique de sécurité interdit la notation de tout exercice dont le fichier source a été altéré ou ne correspond pas au hash de référence consigné dans `OFFICIAL_EXERCISE_HASHES`.
   $$\text{Sous-total SHA-256 périmé / manquant} = 227$$

4. **Clôture arithmétique :**
   $$126 + 1 + 227 = \mathbf{354} \text{ exercices suspendus}$$
   $$1\,250 - 354 = \mathbf{896} \text{ exercices actifs autorisés à la notation}$$

Le chiffre de **354 exercices suspendus** et celui de **896 exercices actifs** sont donc certifiés au niveau de preuve maximal (P4).

---

## 3. RÉSOLUTION FORENSIQUE DU MYSTÈRE DES 82 PILOTES ET DU FABRICAT « 18, 19, 18 »

Les anciens rapports citaient de manière contradictoire :
- Tantôt « 82 pilotes » ;
- Tantôt « 56 pilotes nominaux + 26 complémentaires » ;
- Tantôt « 55 pilotes réels + 27 complémentaires » ;
- Le rapport `CONTRE_AUDIT_AUDIT_GLOBAL` affirmait même que les 55 pilotes se décomposaient en : « b1-linux: 18, probabilites: 19, RD-RO: 18 ».

L'investigation de code dans [server/exercises/course-config.js](file:///home/rd/Desktop/proba/server/exercises/course-config.js) et [server/exercises/grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js) démontre la vérité technique :

1. **Effectifs nominaux au catalogue :**
   - `b1-linux` : 18 exercices dans le catalogue ;
   - `probabilites` : 18 exercices dans le catalogue (et **non 19**) ;
   - `RD-RO` : 20 exercices dans le catalogue (et **non 18**).
   $$\text{Total nominal} = 18 + 18 + 20 = \mathbf{56} \text{ exercices}$$

2. **Impact de la politique de suspension sur les pilotes :**
   L'exercice `lx-c1-e1` (cours `b1-linux`) présente un hash SHA-256 obsolète. Il est donc **suspendu de notation** par la règle 3.
   $$\text{Pilotes actifs réels} = 56 - 1 = \mathbf{55} \text{ exercices actifs}$$
   - `b1-linux` : $18 - 1 = 17$ actifs
   - `probabilites` : 18 actifs
   - `RD-RO` : 20 actifs
   $$17 + 18 + 20 = \mathbf{55}$$

3. **Lots complémentaires :**
   Pour atteindre le lot cible de 82 exercices audités en phase pilote, deux modules complémentaires ont été retenus :
   - `rd_winserver` : 18 nominaux, 3 suspendus = 15 actifs ;
   - `react` : 18 nominaux, 6 suspendus = 12 actifs.
   $$\text{Complémentaires actifs} = 15 + 12 = \mathbf{27} \text{ exercices}$$

4. **Total consolidé :**
   $$\mathbf{55} \text{ (pilotes actifs)} + \mathbf{27} \text{ (complémentaires actifs)} = \mathbf{82} \text{ exercices}$$

**Réfutation forensique :**  
L'affirmation du rapport antérieur selon laquelle `probabilites` comptait 19 exercices et `RD-RO` 18 exercices était une **fabrication déclarative sans ancrage dans le code**, inventée pour justifier le total de 55 en ignorant la suspension de `lx-c1-e1`.

---

## 4. POPULATION DES 814 EXERCICES HORS PILOTE ET ANOMALIE `slice(0, 814)`

L'effectif théorique légitime d'exercices actifs hors pilote est de :
$$896 \text{ (actifs)} - 82 \text{ (pilotes \& complémentaires)} = \mathbf{814} \text{ exercices}$$

Cependant, l'examen de [scripts/build_audit_global_csvs.js](file:///home/rd/Desktop/proba/scripts/build_audit_global_csvs.js) (lignes 268 et 365) révèle une faute de modélisation majeure :
- À la ligne 268, l'auteur a défini :
  ```javascript
  const pilotCourses = new Set(['linux', 'php', 'rd_java', 'probabilites', 'RD-RO']);
  ```
  Le cours `b1-linux` (17 actifs), ainsi que `rd_winserver` (15) et `react` (12) ont été omis du périmètre pilote.
- En conséquence, ces 44 exercices actifs se sont retrouvés classés dans `activeNonPilot`, portant le contingent à **858 exercices**.
- Pour faire correspondre artificiellement son tableau au chiffre historique de 814, l'auteur a inséré à la ligne 365 :
  ```javascript
  const finalAudit814 = activeNonPilot.slice(0, 814)
  ```
- Cette troncature aveugle a éliminé arbitrairement 44 exercices légitimes de Licence 3 situés en fin d'itération (`sup3` : 8, `vo3` : 18, `vrt3` : 18).

Le générateur forensique [reconcile_exercises.js](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/08_OUTILS/reconcile_exercises.js) a restauré la définition exacte des 82 pilotes réels, produisant une liste de 814 exercices **exempte de toute troncature**, documentée dans [manifest_hors_pilote.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_hors_pilote.json).

---

## 5. QUALIFICATION DOCIMOLOGIQUE DES 814 FICHES (551 SANS TESTS LIMITES/NÉGATIFS)

L'audit approfondi de la structure des suites de tests de chaque exercice dans `server/exercises/course-config.js` (inspectant `stdin`, `expected`, `exitCode`, regex de validation et assertions) établit la répartition suivante :

- **Exercices pourvus d'au moins un test négatif ($N$) :** 135 fiches
- **Exercices pourvus d'au moins un test aux limites ($L$) :** 138 fiches
- **Exercices pourvus à la fois de tests négatifs et de limites ($N \cap L$) :** 10 fiches
- **Union des exercices robustes ($N \cup L$) :**
  $$|N \cup L| = 135 + 138 - 10 = \mathbf{263} \text{ fiches}$$
- **Exercices ne testant que des cas nominaux simples :**
  $$814 - 263 = \mathbf{551} \text{ fiches}$$

**Origine de l'ancien chiffre 652 :**  
Dans `scripts/build_audit_global_csvs.js` (lignes 290-302), l'analyseur se contentait de chercher les mots `invalide`, `erreur`, `seuil` dans la propriété textuelle `description` des tests. Les tests écrits avec des descriptions neutres mais des entrées limites effectives étaient ignorés, ce qui n'identifiait que 162 fiches robustes ($814 - 162 = 652$). L'audit sémantique complet rétablit le chiffre rigoureux de **551 fiches purement nominales**.
