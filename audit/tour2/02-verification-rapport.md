# 02 — Vérification du Rapport du Tour 1 & Réconciliation des Mesures (`02-verification-rapport.md` — Mission B)

Chaque chiffre et chaque affirmation du rapport du Tour 1 ont été soumis au protocole de preuve de la Règle 3 : **(a) définition exacte de l'unité comptée**, **(b) script reproductible autonome sans réseau dans `audit/tour2/scripts/`**, **(c) liste exhaustive des éléments comptés dans `audit/tour2/csv/`**, **(d) chiffre retenu**, et **(e) réconciliation explicite de tout écart avec les mesures indépendantes**.

## Tableau Synthétique des Verdicts (Points B1 à B12 + Compteurs B0)

| # | Affirmation du Tour 1 | Mesure indépendante | Chiffre retenu après réconciliation | Verdict | Script & CSV de preuve |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **B1** | Trou `90–94 %` sur « 283 chapitres B1/B2 » | `253` chapitres sur `416` (`+ 1` corrigé `70–94 %` + autres échelles) | **`253` chapitres** (`chapitres/chapitreN.html` sur 416) + **`30` pages `chapitres/simulateur-examen.html`** = **`283` fichiers HTML** | **CORRIGÉ** (253 chapitres + 30 simulateurs = 283 fichiers) | `scripts/b1_seuils.py` · `csv/b1_seuils.csv` |
| **B2** | « Deux indices » avec 3+ items : « 183 exercices » | `214` blocs incohérents sur `1 250` blocs d'indices (dont `Cyber securite B2`) | **`214` blocs sur `main` avant remédiation locale** (`183` sur le snapshot après `remediate-cyber-b2-hints.js` [-18] et `remediate-all-residual-hints.js` [-13]) sur **`1 250` blocs** | **CORRIGÉ & RÉCONCILIÉ** (`214` sur `main`, `183` post-script local) | `scripts/b2_indices.py` · `csv/b2_indices.csv`, `csv/b2_indices_par_cours.csv` |
| **B3** | Mélange généralisé `tu` / `vous` | `71` chapitres par heuristique (`≥ 5` occurrences de chaque hors code) | **`71` chapitres** selon l'heuristique brute `≥ 5` (dont **57 dus aux 5 tokens `tu` du gabarit `course-kit.js`**, **4 faux positifs lexicaux** [`ton`, `TA`, citations] et **10 mélanges dans le corps**) ; **`156` chapitres** sur 416 mêlent `tu` et `vous` hors les 5 tokens fixes de `course-kit.js` ; **`416/416`** mêlent les gabarits `course-kit.js` (`tu`) et `generate-code-labs.js` (`vous`) | **CORRIGÉ** (distinction stricte gabarit vs corps) | `scripts/b3_tu_vous.py` · `csv/b3_tu_vous_71.csv`, `csv/b3_echantillon_30.csv` |
| **B4** | « 754 liens 404 » (nav B3 + 6 B2) et « 396 liens 404 » (`exercices.html` de 11 cours B3) | Non vérifié (crawler local demandé + 5 liens sur Vercel) | **`723` liens 404** de navbar (sur 29 cours, et non `29 × 26 = 754`) + **`333` liens 404** dans `chapitres/exercices.html` (sur **9 cours B3** `9 × 37 = 333`, et non `11 × 36 = 396`) + `100` autres liens relatifs B1/B2 + `895` `favicon.svg` = **`2 053` liens 404 sur disque** (contrôle HTTP live Vercel : **non vérifié** faute d'accès réseau sortant dans la VM) | **CORRIGÉ** (`723` et `333` au lieu de `754` et `396`) | `scripts/b4_liens_404.py` · `csv/b4_liens_404.csv` |
| **B5** | Séquences littérales `
` : « 316 lignes » | `22` occurrences dans `13` chapitres dans le texte visible (`1 163` dans l'ancien audit) | **`22` occurrences dans `13` chapitres** dans le texte visible hors `<pre>/<code>/<script>` (dont **16 formules LaTeX** `
e`/`
eq`/`
otin` non rendues faute de KaTeX et **6 mentions pédagogiques** de `
`) + **1 bloc `<pre><code>` réellement aplati** (21 `
` sur 1 ligne dans `b3-document-technique/chapitres/chapitre4.html:L119`) | **CORRIGÉ** (`316` comptait le code brut dans `<script>` et `<pre>`) | `scripts/b5_slash_n.py` · `csv/b5_slash_n.csv` |
| **B6** | « 53 cours dénaturés par `data-language="analyse"` », « 206 lignes » contradictoires, tests `[Cas 1..3]` divulgués, bouton Exécuter cassé | Non vérifié (liste + 3 cours échantillons + script/commit demandés) | **`52` cours** en `data-language="analyse"` (et **16** cours exécutables = 68 cours actifs ; non 53 et 15), **`938` exercices** divulguant `[Cas 1..3]` avec `0` bloc `[Exemple]`, et **`281` lignes contradictoires dans les chapitres** (`+ 203` dans `exercices.html`/`atelier.html` = `484` lignes) | **CORRIGÉ** (`52` cours au lieu de `53` ; `281` lignes en chapitres) | `scripts/b6_analyse_cours.py` · `csv/b6_cours_analyse.csv`, `csv/b6_lignes_contradictoires.csv` |
| **B7** | Cycles et prérequis sur 7 cas cités | Distinguer strictement cycle, prérequis manquant et inversion d'ordre | **0 cycle** sur les 7 cas cités (**le mot « cycle » est retiré sur `b1-algo ⇄ b1-python`** car `b1-python` n'exige jamais `b1-algo`) : **3 prérequis manquants**, **3 inversions d'ordre**, **1 incohérence de langage** (et 1 seul vrai cycle dans le dépôt : `b1-merise Ch. 5 ⇄ b1-sql Ch. 1-2`) | **CORRIGÉ** (reclassification stricte des 7 cas) | `scripts/b7_cycles_prerequis.py` · `csv/b7_dependances.csv` |
| **B8** | Désalignement avec les épreuves officielles (`vMotion`, `thin provisioning`, `Recueil_Epreuves_2024_2025.pdf` p. 11–12) | Retrouver et citer ces pages dans le corpus et l'original scanné | **CONFIRMÉ** : `textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 10, 11, 12` ET scan original `scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf` **p. 7, 9, 10** (ouverts et vérifiés visuellement) | **CONFIRMÉ** | `scripts/b8_annales_vmotion.py` · `csv/b8_annales.csv` |
| **B9** | « 152 chapitres » avec 9 à 17 notions sous « 8 notions à connaître » et `cartes.html` à 4–6 cartes | Script + CSV par chapitre (nb notions, nb cartes, titre affiché) | Sur 416 chapitres : **`158` chapitres ont `≠ 8` notions** (**`121` chapitres ont 9 à 17 notions** et **`37` chapitres ont 5 à 7 notions** ; `258` en ont 8) ; **`415` chapitres sur 416** ont moins de 8 cartes par chapitre dans `cartes.html` | **CORRIGÉ** (`121` à 9–17 notions + `37` à 5–7 notions = `158` chapitres `≠ 8`) | `scripts/b9_notions_cartes.py` · `csv/b9_notions_cartes.csv` |
| **B10** | Corrigés d'examens B3 affichés en clair (`examens.html`) | Liste des pages et comportement réel à l'écran | **CONFIRMÉ** sur **23 / 23 cours B3** (`22` `chapitres/examens.html` + `1` `chapitres/examen-blanc.html`) **+ 7 cours B2** (`sql`, `csharp`, `ccna`, `uml`, `uiux`, `docker`, `infographie`) = **`30` pages d'examen** avec `<div class="box box--solution">` visible immédiatement sans `<details>` | **CONFIRMÉ** (`23` B3 + `7` B2 = `30` pages) | `scripts/b10_examens_b3.py` · `csv/b10_examens_en_clair.csv` |
| **B11** | Page d'accueil `index.html` : compteurs et ordre des cartes | Reproduire onglet actif, 24 premières cartes DOM, HTML statique vs JS | **CONFIRMÉ & PRÉCISÉ** : Onglet `tab-b1` actif (`23 cours`), mais cartes DOM `#grid` `1..24` = `data-level="b2"` sans attribut `hidden`. Défaut du **HTML statique avant JS** (corrigé visuellement au chargement par `applyFilter('b1')` à `index.html:L1381`, mais laissant un délai d'animation CSS `--bf-i: 24..46` sur B1) | **CONFIRMÉ & PRÉCISÉ** | `scripts/b11_index_home.py` · `csv/b11_index_cartes.csv` |
| **B12** | Audit antérieur dans `audit/pedagogique/` (`78,4/100` ; `b1-algo` `90/100` ; « tableaux redimensionnables » au Ch. 4) | Vérifier les 10 affirmations les plus lourdes et expliquer l'écart des scores | **CONFIRMÉ** : `b1-algo/chapitres/chapitre4.html` ne contient ni « tableau » (hors table de trace) ni « redimensionnable » ; sur les 10 affirmations lourdes vérifiées, **7 sont fausses/hallucinées**, **1 partiellement fausse** et **2 confirmées**. Les scores (`90/100`, `78,4/100`) provenaient de constantes codées en dur dans `audit/pedagogique/_outils/generate_all_reports.py:L226-L315` | **CONFIRMÉ** | `scripts/b12_ancien_audit.py` · `csv/b12_ancien_audit_10_affirmations.csv` |
| **B0** | « 63 occurrences » de virgules parasites `,<ul>,` et « 153 pages » `.bands` sans `%` | Règle 3 (preuve avant chiffre) | **`55` lignes dans les chapitres B3** (`+ 8` dans `examens.html` = **`63` lignes** hors `formules.html`, et `68` avec `formules.html`) ; **`153` pages HTML** exactement (`140` chapitres + `13` `exercices.html`) ont `.bandrow` sans `%` | **CONFIRMÉ** (`63` hors `formules.html` / `153` exact) | `scripts/b0_virgules_et_seuils_b3.py` · `csv/b0_virgules_parasites_63.csv`, `csv/b0_bands_sans_pourcent_153.csv` |

---

## Détail Point par Point (B1 à B12)

### Point B1 — Seuils du test de maîtrise (`90–94 %` et ensemble des gabarits)
- **Verdict** : **CORRIGÉ (`253` chapitres sur `416` + `30` simulateurs d'examen = `283` fichiers HTML)**.
- **(a) Définition exacte de l'unité comptée** : Fichier HTML contenant un bloc `.bands` dont les éléments `.bandrow` affichent la séquence de seuils `< 50 % | 50–69 % | 70–89 % | ≥ 95 %` (où l'intervalle `90–94 %` est absent).
- **(b) Script** : `audit/tour2/scripts/b1_seuils.py`
- **(c) CSV** : `audit/tour2/csv/b1_seuils.csv` (459 lignes : les 416 chapitres `chapitres/chapitreN.html` + les 43 pages transverses possédant des `.bandrow`).
- **(d) Chiffre retenu & ventilation complète des 416 chapitres** :
  1. **`253` chapitres** (`chapitres/chapitreN.html`) ont `< 50 % | 50–69 % | 70–89 % | ≥ 95 %` → **Verdict : TROU (`90–94 %` absent)**.
  2. **`1` chapitre** (`RD-RO/chapitres/chapitre1.html:L565-L568`) a `< 50 % | 50–69 % | 70–94 % | ≥ 95 %` → **Verdict : COMPLET (déjà corrigé)**.
  3. **`30` chapitres** (5 cours B2 de 6 chapitres : `ccna`, `uml`, `uiux`, `docker`, `infographie`) ont `Moins de 4/8 | De 4 à 6/8 | 7/8 | 8/8` → **Verdict : COMPLET (échelle discrète sur 8 couvrant 0..3, 4..6, 7, 8)**.
  4. **`30` chapitres** (5 cours B3 de 6 chapitres : `b3-algo`, `b3-cloud-computing`, `b3-devops`, `b3-document-technique`, `b3-etude-quantitative`) ont `Moins de 4/8 | Entre 5/8 et 7/8 | 8/8` → **Verdict : TROU (`4/8` absent entre `< 4/8` [0..3] et `5/8..7/8`)**.
  5. **`18` chapitres** (3 cours B3 de 6 chapitres : `b3-cloud-aws`, `b3-supervision`, `b3-voip`) ont `Score < 60 % | Score 60-74 % | Score 75-84 % | Score 85-94 % | Score ≥ 95 %` → **Verdict : COMPLET (5 bandes continues de 0 à 100 %)**.
  6. **`84` chapitres** (les 14 autres cours B3 × 6 chapitres) ont des `.bandrow` purement qualitatifs sans aucun seuil chiffré en `%` ni sur `/8` (ex. `Niveau initial | Niveau opérationnel | Maîtrise B3` sur `b3-firewall`, ou phrases descriptives sans chiffre sur `b3-pfsense`, `b3-linux`, `b3-sql`, `b3-cryptographie`, etc.) → **Verdict : INCOMPLET (aucun seuil chiffré permettant de situer son pourcentage)**.
- **(e) Explication de l'écart (`283` vs `253`) et localisation du gabarit fautif** :
  - **Pourquoi 283 vs 253** : Au Tour 1, notre script avait balayé tous les fichiers HTML situés sous un dossier `chapitres/` et compté **253 `chapitres/chapitreN.html` + 30 `chapitres/simulateur-examen.html` = 283 fichiers HTML**, en les qualifiant à tort de « 283 chapitres ». Sur le périmètre strict des 416 chapitres (`chapitres/chapitreN.html`), votre mesure de **253 chapitres** (et 1 chapitre corrigé `RD-RO` Ch. 1) est exacte.
  - **Où se trouve le gabarit fautif et un seul correctif suffit-il ?**
    - `scripts/templates/cours.js:L16-23` (et ses copies `assets/js/cours.js` / `b1-algo/assets/js/cours.js:L16-23`) est le **script JS d'évaluation dynamique côté client**, qui est **déjà correct** car il contient bien la ligne `L18` : `else if (pct >= 90) msg = '90–94 % — Très bonne maîtrise : consolide les cas limites.';`.
    - En revanche, le texte statique des `.bandrow` affiché dans le HTML ne vient **pas** d'un tableau codé en dur dans `scripts/course-kit.js:L251-L261` : `course-kit.js` (`bands(list)`) se contente d'afficher le tableau `ch.bands` fourni par chaque fichier de contenu `server/content/<cours>.js` (ou écrit en dur dans les HTML des 4 cours statiques `b1-algo`, `b1-c-cpp`, `b1-php`, `b1-python`) !
    - **Conclusion pour le correctif (Lot 1)** : Un seul correctif dans `scripts/course-kit.js` (`bands()`) suffit pour les **64 cours générés** à condition que `bands()` normalise/injecte automatiquement les préfixes de seuils (ou remplace `70–89 %` par `70–89 %` + `90–94 %`), mais les **4 cours statiques sans fichier `server/content/`** (`b1-algo` [10 ch. + 1 sim.], `b1-c-cpp` [8 ch. + 1 sim.], `b1-php` [8 ch. + 1 sim.], `b1-python` [6 ch. + 1 sim.]) doivent être corrigés directement dans leurs fichiers HTML.

---

### Point B2 — Libellé « Deux indices, rédigés en mots » avec 3 indices ou plus (`183` vs `214` sur `1 250`)
- **Verdict** : **CORRIGÉ & RÉCONCILIÉ (`214` sur `main` avant remédiation locale ; `183` dans l'archive locale après exécution de 2 scripts de remédiation)**.
- **(a) Définition exacte (« exercice » vs « bloc d'indices »)** :
  - **Unité « exercice »** : entrée du catalogue `server/exercises/` injectée sous forme de `<div class="lab" data-exercise="...">` dans les 416 chapitres (`415` chapitres × 3 exercices + `RD-RO/chapitres/chapitre1.html` qui compte **5 exercices** = **`1 250` exercices** au total).
  - **Unité « bloc d'indices »** : élément `<details class="lab__hints">` présent dans chaque `<div class="lab">` (`1` bloc par exercice = **`1 250` blocs d'indices** au total dans les chapitres ; `0` dans `exercices.html` ou `atelier.html`). Les deux unités ont donc exactement le même dénominateur (**1 250**).
  - **Cause racine** : Dans `scripts/generate-code-labs.js:L106`, le libellé `<summary>` est codé en dur : `'      <summary>' + icon('lightbulb') + ' Deux indices, rédigés en mots</summary>
'`, alors que `exercise.hints` dans `server/exercises/` est un tableau de longueur variable (de 2 à 5 éléments).
- **(b) Script** : `audit/tour2/scripts/b2_indices.py`
- **(c) CSV** : `audit/tour2/csv/b2_indices.csv` (1 250 lignes) et `audit/tour2/csv/b2_indices_par_cours.csv` (68 cours).
- **(d) Chiffre retenu & (e) Explication exacte de l'écart `183` vs `214`** :
  - Sur votre branche `main` de référence, il y avait exactement **214 blocs incohérents** (`exercise.hints.length > 2`), incluant notamment les **18 exercices de `Cyber securite B2`** (`cs2-c1-e1` à `cs2-c6-e3`) et **13 exercices** d'autres cours (`assembleur`, `b1-architecture`, `b1-cyber`, `b1-stats`, etc.).
  - Or, dans l'archive du dépôt fournie pour l'audit (`revi`), deux scripts de remédiation avaient été exécutés localement juste avant l'export (et documentés dans `audit/pedagogie-exercices/remediation-et-tests.md:L45-L78`) :
    1. `scripts/remediate-cyber-b2-hints.js` a remplacé les 3 indices des **18 exercices de `Cyber securite B2`** par des tableaux de **2 indices** ;
    2. `scripts/remediate-all-residual-hints.js` a remplacé les indices de 34 exercices (dont **13** avaient 3 indices) par des tableaux de **2 indices**.
  - L'équation de réconciliation est donc exacte à l'unité près : **`214 (sur main) − 18 (Cyber securite B2) − 13 (remediate-all-residual-hints.js) = 183` blocs incohérents restants dans l'archive locale** (`167` à 3 indices, `12` à 4 indices, `4` à 5 indices). Un seul correctif dans `scripts/generate-code-labs.js:L106` élimine 100 % des incohérences dans les deux états.

---

### Point B3 — Mélange `tu` / `vous` (`71` chapitres par heuristique `≥ 5` vs analyse structurelle)
- **Verdict** : **CORRIGÉ & RÉCONCILIÉ**.
- **(a) Définition & Méthode** :
  - **Heuristique utilisateur (`71` chapitres)** : Chapitres (`chapitres/chapitreN.html`) comptant hors balises `<script>`, `<style>`, `<pre>`, `<code>` au moins 5 occurrences de `(tu|ton|ta|tes|te|toi|t'|t’)` (insensible à la casse) ET au moins 5 occurrences de `(vous|votre|vos)`.
  - **Pourquoi cette heuristique sélectionne exactement 71 chapitres** : Le gabarit `scripts/course-kit.js` injecte dans **chaque chapitre** exactement **5 occurrences de tutoiement** :
    1. `À la fin de ce chapitre, **tu** seras capable de :` (`course-kit.js:L231`)
    2. `Comment **t'**auto-évaluer` (`course-kit.js:L247`)
    3. `**ton** QCM de compréhension...` (`course-kit.js:L249`)
    4. `**ta** note réelle dépend aussi...` (`course-kit.js:L270`)
    5. `...de **ton** travail.` (`course-kit.js:L270`)
    Dès lors, tout chapitre généré par `course-kit.js` atteint déjà le seuil `tu ≥ 5` par son seul squelette HTML ! L'heuristique `≥ 5 / ≥ 5` sélectionne donc simplement les 71 chapitres où `vous/votre/vos` atteint aussi 5 occurrences (3 occurrences provenant du chapeau `generate-code-labs.js` : *« rédigeant **votre** résolution… soumettez **votre** copie pour obtenir **votre** évaluation »* + au moins 2 occurrences dans les énoncés ou le cours).
- **(b) Script** : `audit/tour2/scripts/b3_tu_vous.py`
- **(c) CSV** : `audit/tour2/csv/b3_tu_vous_71.csv` (416 chapitres) et `audit/tour2/csv/b3_echantillon_30.csv` (relecture manuelle des 30 premiers chapitres des 71).
- **(d) Taux de faux positifs sur l'échantillon de 30 chapitres relus à la main (`csv/b3_echantillon_30.csv`) et liste finale** :
  - Si l'on cherche un **mélange à l'échelle de la page entière (gabarit `course-kit.js` en `tu` vs gabarit `generate-code-labs.js` / corps en `vous`)** : **30 / 30 (100 % vrais positifs, 0 % faux positifs)** — et en réalité **416 chapitres sur 416** sont touchés, car le gabarit de chapitre tutoie toujours tandis que le gabarit d'exercices vouvoie toujours.
  - Si l'on cherche un **mélange interne au texte rédigé du chapitre (hors les 5 occurrences fixes du gabarit `course-kit.js`)** : sur l'échantillon de 30 chapitres relus à la main :
    - **10 chapitres sur 30 (33,3 %)** sont de **vrais positifs de corps** (`masterclass-apprendre` Ch. 2, 4, 5, 6 ; `Cyber securite B2` Ch. 1 ; `csharp` Ch. 1 ; `b1-fr-pro` Ch. 4 ; `b1-python` Ch. 1, 2 ; `b1-virtualisation` Ch. 2) ;
    - **4 chapitres sur 30 (13,3 %)** comportent des **faux positifs lexicaux** du regex insensible à la casse : le nom commun *« le ton »* (`b1-anglais/chapitres/chapitre2.html` : *« choisir le ton de l'email »*, `b3-etude-quantitative/chapitres/chapitre4.html` : *« ton interrogatif »*), le sigle mathématique `$TA$` = Taux d'Abandon (`b3-etude-quantitative/chapitres/chapitre3.html`), ou la liste grammaticale *« je, tu, nous, vous »* (`b1-fr-pro/chapitres/chapitre6.html`) ;
    - **16 chapitres sur 30 (53,3 %)** n'ont aucun `tu` dans le corps du cours (qui est 100 % en `vous`) et n'atteignent `tu = 5` que par les 5 tokens fixes du gabarit `course-kit.js` (`linux` Ch. 1, `uiux` Ch. 1, 2, 6, `docker` Ch. 5, `b1-admin-windows` Ch. 5, `b1-fr-pro` Ch. 5, `b1-git` Ch. 4, 5, `b3-cloud-computing` Ch. 5, `b3-devops` Ch. 6, `b3-document-technique` Ch. 4, `b3-firewall` Ch. 1 à 4). Soit un **taux de faux positifs de 66,7 % (20/30)** si l'objectif est de détecter un mélange hors gabarit `course-kit.js` !
  - **Chiffre retenu** : **416 chapitres sur 416** mêlent le tutoiement du gabarit `course-kit.js` et le vouvoiement du gabarit `generate-code-labs.js` ; et **156 chapitres sur 416** (listés dans `csv/b3_tu_vous_71.csv` avec `melange_hors_gabarit = OUI`) mêlent `tu` et `vous` en dehors des 5 tokens fixes de `course-kit.js`.

---

### Point B4 — Liens morts 404 (`754` et `396` vs crawler local sur disque)
- **Verdict** : **CORRIGÉ (`723` liens 404 de navbar au lieu de `754`, et `333` liens 404 dans `chapitres/exercices.html` sur 9 cours B3 au lieu de `396` sur 11 cours)**.
- **(a) Définition de l'unité comptée** : Balise `<a href="...">` ou `<link href="...">` dans l'un des 931 fichiers HTML de cours (ou `index.html`) dont le chemin relatif ou absolu interne résolu sur le disque ne pointe vers aucun fichier existant.
- **(b) Script (crawler local)** : `audit/tour2/scripts/b4_liens_404.py`
- **(c) CSV** : `audit/tour2/csv/b4_liens_404.csv` (**2 053 lignes** détaillant cours, page source, ligne, `href`, cible attendue sur disque, famille et fichier générateur responsable).
- **(d) Chiffre retenu & (e) Réconciliation des écarts** :
  1. **Famille 1 — Barre de navigation (`scripts/course-kit.js:L80-82`, `navItems()`) : `723` liens 404 (et non `754`)** :
     - Au Tour 1, le chiffre `754` avait été obtenu en multipliant mécaniquement `29 cours × 26 liens (13 pages × 2 liens Exercices/Examen) = 754`.
     - Or le crawler réel (`b4_liens_404.py`) prouve que si les 23 cours B3 et `assembleur` / `Cyber securite B2` ont bien `26` liens cassés chacun (`25 × 26 = 650`), `masterclass-apprendre` en a `30` (15 pages × 2), `RD-RO` en a `17`, et `sql` ainsi que `csharp` n'en ont que `13` chacun (car l'un des deux fichiers existe au chemin attendu). La somme exacte sur disque est donc **`650 + 30 + 17 + 13 + 13 = 723` liens 404**.
  2. **Famille 2 — Catalogue `chapitres/exercices.html` des cours B3 pointant vers `href="chapitres/chapitreN.html"` : `333` liens 404 sur `9` cours B3 (et non `396` sur `11` cours)** :
     - Au Tour 1, le chiffre `396` avait été obtenu en multipliant `11 cours × 36 liens (18 exercices × 2 liens) = 396`.
     - Or le crawler réel prouve que **9 cours B3** exactement (`b3-firewall`, `b3-github`, `b3-linux`, `b3-agile`, `b3-pfsense`, `b3-reseau-lan`, `b3-sql`, `b3-veille`, `b3-windows-server`) ont ce bug dans `chapitres/exercices.html`, et que chaque page contient **37** liens cassés (1 bouton héro `chapitres/chapitre1.html` + 18 titres + 18 boutons d'exercices), soit **`9 × 37 = 333` liens 404** (les 14 autres cours B3 écrivent correctement `href="chapitre1.html"`).
  3. **Famille 3 — Autres liens relatifs cassés (B1/B2/Portail) : `102` liens 404** (`uml`, `uiux`, `infographie` [14 chacun dans `exercices/exercices.html`], `docker` [13], `react` [11 + 2 exemples `href="..."` dans `<code>`], `api-rest-flask`, `erp-si`, `ingenierie-besoin` [7 chacun dans `qcm-100.html`], `masterclass-apprendre` [4], `admin-vm` [3 dans `qcm-100.html`], `PORTAIL index.html` [3 liens `/_auth/account.html` résolus seulement après `npm run build`], `probabilites`, `assembleur`, `Cyber securite B2` [1 chacun]).
  4. **Famille 4 — Icône `/assets/img/favicon.svg` (`scripts/course-kit.js:L113`) : `895` liens 404**.
  - **Vérification sur `https://revi-mu.vercel.app` (Règle 5)** : **Non vérifié en direct (accès HTTP sortant vers `revi-mu.vercel.app` bloqué depuis l'environnement d'exécution isolé) / Déduit du code de déploiement** : l'inspection de `vercel.json:L1-L35`, `middleware.js` et `scripts/build.js` prouve qu'aucune règle de réécriture (`rewrites`) ne redirige `/b3-*/exercices/exercices.html`, `/b3-*/chapitres/simulateur-examen.html` ni `/b3-*/chapitres/chapitres/*` dans le dossier `dist/` servi par Vercel.

---

### Point B5 — Séquences littérales `
` (`316 lignes` vs `22 occurrences dans 13 chapitres` vs `1 163`)
- **Verdict** : **CORRIGÉ & RÉCONCILIÉ**.
- **(a) Définition des trois unités** :
  1. **Unité du Tour 1 (`316` / `320` lignes)** : Lignes du fichier source HTML contenant les deux caractères `\` et `n` consécutifs (`r'
'`), **y compris** à l'intérieur des balises `<script type="text/plain" data-lab-starter>` (code JS/C/PHP), des blocs `<pre><code>` (`printf("...
")`, `echo "...
"`), et des formules LaTeX (`
e`, `
eq`, `
otin`).
  2. **Unité de votre mesure indépendante (`22 occurrences dans 13 chapitres`)** : Occurrences de la sous-chaîne `
` dans le **texte visible des chapitres (`chapitres/chapitreN.html`) hors `<script>`, `<style>`, `<pre>` et `<code>`**.
  3. **Unité de l'audit antérieur (`1 163` dans `audit/pedagogique/`)** : `626` fuites de prose `
<p>` (causées par `.join('\n')` dans 38 fichiers de `server/content/`) + `537` blocs `<pre><code>` aplatis sur une seule ligne.
- **(b) Script** : `audit/tour2/scripts/b5_slash_n.py`
- **(c) CSV** : `audit/tour2/csv/b5_slash_n.csv` (320 lignes classées par catégorie).
- **(d) Chiffre retenu & (e) Réconciliation complète** :
  - **Ce qui a été corrigé depuis l'audit antérieur (`1 163 → aujourd'hui`)** : Comme documenté dans `audit/pedagogique/LIVRABLE_I_rapport_remediation_complete.md` (Axe 2), un remplacement global des `.join('\n')` dans `server/content/` a éliminé les 626 fuites `
<p>` et 536 des 537 blocs `<pre><code>` aplatis.
  - **Décomposition exacte de vos `22 occurrences dans 13 chapitres` (hors `<pre>/<code>/<script>`)** :
    - **15 occurrences (dans 9 chapitres : `RD-RO` Ch. 1, 2, 3 [3], 6 ; `assembleur` Ch. 6 ; `b3-algo` Ch. 5 [4], 6 ; `b3-devops` Ch. 6 ; `b3-cryptographie` Ch. 3 [2])** sont des **macros LaTeX `
e`, `
eq`, `
otin`** écrites `$i 
e r$` dans le HTML mais affichées brutes à l'écran parce que KaTeX/MathJax n'est pas chargé dans ces pages ;
    - **1 occurrence** (`b1-algebre/chapitres/chapitre6.html:L102`) est une macro LaTeX doublement échappée `$A X = \lambda X \quad (X \ne 0)$` ;
    - **6 occurrences (dans 3 chapitres : `b1-php` Ch. 1 [3], `b1-prog-web` Ch. 6 [1], `b1-python` Ch. 5 [2])** sont des **mentions pédagogiques légitimes** du caractère de retour à la ligne `
` dans le cours (ex. *« La séquence 
 (dans des guillemets) »*).
  - **La seule vraie fuite de saut de ligne `
` restant à corriger dans `<pre><code>`** : **`b3-document-technique/chapitres/chapitre4.html:L119`** (`server/content/b3-document-technique/chapitre4.js`), où le bloc YAML OpenAPI 3.0 contient **21 séquences `
` littérales sur une seule ligne** (`openapi: 3.0.0
info:
  title: API Calcul de Remise...`) !

---

### Point B6 — Les cours dénaturés par `data-language="analyse"` (`52` cours, `281` lignes contradictoires en chapitres, divulgation `[Cas 1..3]`)
- **Verdict** : **CORRIGÉ sur le nombre exact de cours (`52` cours et non `53` : 52 `analyse` + 16 exécutables = 68 cours actifs) et CONFIRMÉ sur le mécanisme, la divulgation des cas et les contradictions**.
- **(a) Définition des unités** :
  - **Cours en `analyse`** : Cours actif dont les exercices `<div class="lab">` portent `data-language="analyse"` (**52 cours**, totalisant **938 exercices** sur les 1 250 de la plateforme).
  - **Lignes contradictoires** : Lignes HTML des 52 cours en mode `analyse` (dans `.box--objectifs`, `.lab__goal`, `.lab__brief`, `.lab__hints`, `exercices.html` ou `atelier.html`) qui mentionnent encore l'écriture d'un programme/script (`Python 3`, `module ipaddress`, `split()`, `STDIN`, `2#du-bash`, `Langage : Python`). On en compte **`281` lignes dans les chapitres** (`+ 203` lignes dans les pages transverses `exercices.html`/`atelier.html` = **`484` lignes au total** ; le chiffre `206` du Tour 1 correspondait à un sous-ensemble filtré d'occurrences dans les chapitres).
- **(b) Script** : `audit/tour2/scripts/b6_analyse_cours.py`
- **(c) CSV** : `audit/tour2/csv/b6_cours_analyse.csv` (liste des 52 cours et nombre d'exercices touchés par cours) et `audit/tour2/csv/b6_lignes_contradictoires.csv` (484 lignes).
- **(d) Scripts et historique de la bascule** :
  Quatre scripts successifs dans le dépôt ont opéré la conversion vers `language: 'analyse'` :
  1. `tools/migrate-pedagogical-alignment.js` (cours B1/B2 non-programmation et gestion) ;
  2. `scripts/remediate-math-courses.js` (`b1-algebre`, `b1-stats`, `probabilites`, `RD-RO`) ;
  3. `scripts/remediate-noncode-courses.js` (`b1-merise`, `b1-architecture`, `uml`, `infographie`, **`csharp`**, **`sql`**, **`b1-sql`**, **`b3-sql`**) ;
  4. `scripts/remediate-26-exercises.js` (26 cours dont la quasi-totalité des cours B3 : `b3-pfsense`, `b3-linux`, `b3-firewall`, `b3-reseau-lan`, `b3-cryptographie`, `b3-hacking`, `b3-devops`, `b3-github`, `b3-cloud-*`, `docker`, `ccna`, `assembleur`, `Cyber securite B2`, etc.).
- **(e) Démonstration sur 3 cours échantillons (1 SQL, 1 Réseau, 1 Linux) — HTML rendu exact** :

#### Échantillon 1 (SQL) : `b3-sql/chapitres/chapitre1.html` (et `b1-sql/chapitres/chapitre1.html`)
- **Ce qui reste de contradictoire dans les objectifs (`b3-sql/chapitres/chapitre1.html:L78`)** :
  ```html
  <li>développer en Python 3 des simulateurs de niveaux d’isolation, des gestionnaires de verrous S/X et des détecteurs de cycles d’interblocage.</li>
  ```
  Et dans `b3-sql/chapitres/exercices.html:L57,L68` : *« 18 ateliers de programmation interactive en Python 3 »* / `Langage : Python`. (De même, dans `b1-sql/chapitres/chapitre1.html:L161-L345`, un cours de SQL B1 ne fait écrire aucune requête `SELECT` ou `CREATE TABLE` mais fait remplir 3 grilles de texte statiques).
- **L'éditeur rendu et la divulgation des 3 cas de test cachés (`b3-sql/chapitres/chapitre1.html:L157-L185`)** :
  ```html
  <div class="lab" data-lab data-exercise="sql3-c1-e1" data-language="analyse" data-height="300">
    <script type="text/plain" data-lab-starter># Grille d'analyse (sql3-c1-e1) — Détecteur d’anomalies de concurrence selon le niveau d’isolation SQL
  # Complétez la résolution demandée sous chaque cas ci-dessous :

  [Cas 1 — Niveau SERIALIZABLE prévenant toutes les anomalies]
  # Données : ISOLATION_CHECK level=SERIALIZABLE op1=READ_UNCOMMITTED_DATA op2=CONCURRENT_UPDATE op3=CONCURRENT_INSERT
  A_COMPLETER

  [Cas 2 — Niveau READ COMMITTED avec lecture répétable et fantôme]
  # Données : ISOLATION_CHECK level=READ_COMMITTED op1=DIRTY_READ op2=NON_REPEATABLE_READ op3=PHANTOM_READ
  A_COMPLETER

  [Cas 3 — Niveau READ UNCOMMITTED exposant à toutes les anomalies]
  # Données : ISOLATION_CHECK level=READ_UNCOMMITTED op1=DIRTY_READ op2=NON_REPEATABLE_READ
  A_COMPLETER
  </script>
  ```
- **Pourquoi les tests cachés sont divulgués et le bouton « Exécuter » est cassé** : `remediate-noncode-courses.js` a copié `tests[0..2].stdin` (`[Cas 1]`, `[Cas 2]`, `[Cas 3]`) dans `data-lab-starter` en remplaçant `tests[i].stdin` par `"cas:1"`, `"cas:2"`, `"cas:3"`. L'étudiant voit donc les 3 cas d'évaluation dès l'ouverture. Pis : lorsqu'il clique sur le bouton **« Exécuter »** (qui teste l'exemple visible `examples[0]`), `runAnalyse()` (`server/services/execution/local-runner.js:L231-L237`) cherche la section `[Exemple]` dans l'éditeur ; comme `data-lab-starter` ne contient que `[Cas 1]`, `[Cas 2]` et `[Cas 3]` (**0 sur 938 exercices n'a `[Exemple]` dans `data-lab-starter` !**), `runAnalyse()` tombe dans le fallback qui concatène les réponses des 3 cas et les compare à la sortie d'un seul exemple, ce qui **échoue systématiquement** !

#### Échantillon 2 (Réseau) : `b3-pfsense/chapitres/chapitre1.html`
- **Contradictions frontales (`b3-pfsense/chapitres/chapitre1.html:L78, L155, L189, L202, L310`)** :
  ```html
  <!-- L78 (Objectif 6) -->
  <li>développer en Python 3 des validateurs d’adresses réseau CIDR, des convertisseurs WebGUI vers syntaxe pf.conf et des auditeurs de plages DHCP.</li>
  <!-- L155 (Chapeau section 4) -->
  <p class="lead">Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse en rédigeant votre résolution critère par critère...</p>
  <!-- L189 (Énoncé Ex. 1) -->
  Règles de calcul (avec le module <code>ipaddress</code>) :<br>
  - <code>usable_hosts = net.num_addresses - 2</code> (si prefix &lt; 31, sinon 0)<br>
  <!-- L202 (Indice 1 Ex. 1) -->
  <li>Utiliser ipaddress.ip_interface(ip_str) pour manipuler facilement l’adresse et le réseau.</li>
  <!-- L310 (Indice 1 Ex. 3) -->
  <li>Utiliser ipaddress.ip_network(subnet) et ipaddress.ip_address(ip).</li>
  ```
- **Éditeur et divulgation (`b3-pfsense/chapitres/chapitre1.html:L158-L177`)** : `data-language="analyse"` avec `[Cas 1 — Sous-réseau WAN public de classe C restreint /29] # Données : IFACE_CONFIG iface=wan ip=203.0.113.10/29 gw=203.0.113.9 A_COMPLETER`, `[Cas 2 ...]`, `[Cas 3 ...]`. Si l'étudiant obéit à l'énoncé (`L189`) et à l'indice (`L202`) en écrivant du code Python avec `import ipaddress`, `runAnalyse()` rejette sa copie !

#### Échantillon 3 (Linux) : `b3-linux/chapitres/chapitre1.html`
- **Contradictions (`b3-linux/chapitres/chapitre1.html:L78, L188-L198` et `b3-linux/chapitres/exercices.html:L57, L68`)** :
  ```html
  <!-- L78 (Objectif 6) -->
  <li>développer en Python 3 des parseurs de structures /proc, des auditeurs de mémoire virtuelle et des analyseurs de traces d’appels système strace.</li>
  <!-- L191 (Énoncé Ex. 1) -->
  Entrée STDIN : Une ligne de métriques <code>PROC pid=&lt;id&gt; name=&lt;nom&gt; state=&lt;code&gt; utime=&lt;ms&gt; stime=&lt;ms&gt; rss_kb=&lt;kb&gt;</code>.
  ```
- **Éditeur et divulgation (`b3-linux/chapitres/chapitre1.html:L159-L178`)** : `data-language="analyse"` exposant `[Cas 1 — Processus actif en cours d’exécution (R)]`, `[Cas 2 — Processus zombie terminé (Z)]`, `[Cas 3 — Processus en sommeil disque ininterruptible (D)]` avec `# Données : PROC pid=1042 ... A_COMPLETER`, sans aucune exécution Linux ni Python.

---

### Point B7 — Cycles, prérequis manquants et inversions d'ordre (les 7 cas vérifiés)
- **Verdict** : **CORRIGÉ (le mot « cycle » est retiré sur `b1-algo / b1-python` faute de réciprocité prouvée dans le texte de `b1-python` ; les 7 cas sont reclassés strictement avec double citation)**.
- **(a) Définitions strictes appliquées** :
  - **Cycle (`D3`)** : Le cours A exige explicitement une notion enseignée dans B ET le cours B exige explicitement une notion enseignée dans A (preuve textuelle dans les deux sens).
  - **Prérequis manquant (`D1 / D6`)** : Le cours A exige une notion X qu'aucun cours ni chapitre antérieur du cursus n'enseigne.
  - **Inversion d'ordre (`D2`)** : Le cours A (placé plus tôt dans le cursus ou le semestre) exige une notion X qui n'est enseignée que plus tard dans un cours B.
- **(b) Script** : `audit/tour2/scripts/b7_cycles_prerequis.py`
- **(c) CSV** : `audit/tour2/csv/b7_dependances.csv`
- **(d) & (e) Classification et double citation des 7 cas** :

| # | Cas cité au Tour 1 | Citation sens 1 (`fichier:ligne`) | Citation sens 2 (`fichier:ligne`) | Classification stricte retenue |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `b1-algo` / `b1-python` | `b1-algo/chapitres/chapitre1.html:L148-L252` : exige `data-language="python"`, `int(input())`, `print()`, `//`, `%` dès le Ch. 1 d'Algorithmique. | `b1-python/chapitres/chapitre1.html:L46-L120` : enseigne Python depuis zéro (« *Tu n'as jamais écrit une ligne de Python* », `L48`) sans jamais utiliser le pseudo-code ni le Pascal de `b1-algo`. | **Inversion d'ordre / Prérequis manquant dans `b1-algo` (`D6/D2`) — NON UN CYCLE** (sens `b1-python → b1-algo` non prouvé : mot « cycle » retiré). |
| **2** | `b1-projet` Ch. 3 (`tkinter` / POO) | `b1-projet/chapitres/chapitre1.html:L95` (`class Database`, `class ApplicationGestionStock`) et `chapitres/chapitre3.html:L56-L145` (`import tkinter as tk`, `ttk.Treeview`, widgets, callbacks). | `b1-python/chapitres/chapitre1.html` à `chapitre6.html` (et source `Fondamentaux_Python.txt#PAGE 1-224`) : s'arrête aux fichiers (Ch. 5) et `try/except` (Ch. 6) ; **0 occurrence de `class`/`self` et 0 occurrence de `tkinter`**. | **Prérequis manquant (`D1 / D6`)** — Confirmé. |
| **3** | `b1-admin-windows` avec Bash | `b1-admin-windows/chapitres/chapitre1.html:L138-L240` (et Ch. 2 à 6) : 18 exercices en `data-language="shell"` (`#!/bin/bash`, `read -r`, `case/esac`) pour administrer Windows Server. | `b1-linux/chapitres/chapitre6.html:L108-L130` : n'introduit les scripts Bash qu'à la fin du Ch. 6 du cours Linux B1. | **Incohérence de langage d'exercice (`D6 / D8`) + Inversion d'ordre avec `b1-linux` Ch. 6** — Confirmé. |
| **4** | `react` et ES6+ | `react/chapitres/chapitre1.html:L84-L165` et `chapitre5.html:L85-L130` : utilise `import/export` ES6, fonctions fléchées `() =>`, déstructuration `{name}`, `.map()`, `.filter()`, `fetch()`, `async/await`. | `b1-prog-web/chapitres/chapitre6.html:L60-L140` : s'arrête à `let/const`, `querySelector` et `addEventListener` sans modules ES6, sans `.map()/.filter()`, sans déstructuration ni `fetch`/Promises. | **Prérequis manquant (`D1 / D6`)** — Confirmé. |
| **5** | `probabilites` Ch. 5 et calcul intégral | `probabilites/chapitres/chapitre5.html:L70-L145` : définit la densité continue, l'espérance et la loi exponentielle/normale par des intégrales impropres $\int_{-\infty}^{+\infty} f(x)dx$ et primitives de $\lambda e^{-\lambda x}$. | `b1-algebre/sommaire.html` et `b1-stats/sommaire.html` : les deux seuls cours de maths B1 traitent l'algèbre linéaire et la statistique descriptive (0 cours d'Analyse / dérivation / intégration). | **Prérequis manquant (`D1 / D5`)** — Confirmé. |
| **6** | `b3-cryptographie` (S2) vs `b3-pfsense` Ch. 5 (S1) | `b3-pfsense/chapitres/chapitre5.html:L66-L150` (cours du Semestre 1) : exige la maîtrise de la PKI X.509 (CA, certificats, CRL), d'IPsec IKEv2 (Phase 1/Phase 2), d'AES-GCM, SHA-256 et Diffie-Hellman. | `b3-cryptographie/chapitres/chapitre2.html` à `chapitre5.html` (cours placé au **Semestre 2** dans `B3/Semestre II/Cryptographie/`) : enseigne AES-GCM (Ch. 2 `L84`), SHA-256 (Ch. 3 `L84`), Diffie-Hellman (Ch. 4 `L84`) et PKI X.509/CRL (Ch. 5 `L84`). | **Inversion d'ordre curriculaire S1 / S2 (`D2`)** — Confirmé. |
| **7** | `docker` (B2) vs `b3-linux` Ch. 4 (B3) | `docker/chapitres/chapitre1.html:L82-L125` (Licence 2) : explique dès le Ch. 1 l'isolation des conteneurs par les 6 `namespaces` (`pid, net, mnt, uts, ipc, user`) et les `cgroups` v1/v2 du noyau Linux. | `b3-linux/chapitres/chapitre4.html:L80-L135` (Licence 3) : n'enseigne les `namespaces` et les `cgroups` du noyau Linux qu'un an plus tard en B3. | **Inversion d'ordre inter-annuelle B2 / B3 (`D2`)** — Confirmé. |

*(NB : Le seul vrai **cycle bidirectionnel (`D3`)** prouvé entre deux cours du catalogue est `b1-merise/chapitres/chapitre5.html:L95-L130` [qui utilise `CREATE TABLE ... PRIMARY KEY ... REFERENCES` du SQL] ⇄ `b1-sql/chapitres/chapitre1.html:L60-L120` [qui s'appuie sur le MLD et les cardinalités de MERISE]).*

---

### Point B8 — Désalignement avec les épreuves officielles (`vMotion`, `thin provisioning`, `Recueil_Epreuves_2024_2025.pdf` p. 10–12)
- **Verdict** : **CONFIRMÉ (avec double preuve dans le texte extrait propre ET dans le scan original ouvert visuellement)**.
- **(b) Script** : `audit/tour2/scripts/b8_annales_vmotion.py`
- **(c) CSV** : `audit/tour2/csv/b8_annales.csv`
- **(d) Citations et pages exactes vérifiées** :
  1. **Dans le document propre `textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt` (statut `ok`, identique à `epreuves/Recueil_Epreuves_2024_2025.pdf`)** :
     - **`#PAGE 10`** (Sujet *ADMINISTRATION DES MACHINES VIRTUELLES — Niveau : B2 IT — Session Normale — Durée : 2 Heures — Enseignant : BOUKLINAM*, Exercice 1) : *« Il utilise **vMotion** pour déplacer la VM vers un autre hôte moins sollicité. »*
     - **`#PAGE 11`** (Exercice 1, Question 5) : *« 5. Expliquez le rôle de la fonction **vMotion** dans la gestion des ressources. »*
     - **`#PAGE 12`** (Exercice 2 : QCM, Questions 6 et 7) :
       - *« 6. Quelle commande (ou action) permet de migrer une VM en cours d'exécution sans interruption de service ? **A. vMotion** / B. vClone / C. vSnapshot / D. vStop »*
       - *« 7. Que signifie le terme **"thin provisioning"** dans un contexte de stockage ? A. La VM utilise tout l'espace disque immédiatement / B. Le disque est sauvegardé en mode compressé / **C. L'espace disque est alloué dynamiquement selon les besoins** / D. L'espace est partagé uniquement entre deux VM »*
  2. **Dans le scan original `audit/tour2/corpus/scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf` (ouvert et inspecté visuellement page par page)** :
     - **Page 7 du scan** : *ADMINISTRATION DES MACHINES VIRTUELLES (Niveau : B2 IT, Enseignant : BOUKLINAM)*, Exercice 1 (*L'aventure de Max*) mentionnant `vMotion` et `cluster HA`.
     - **Page 9 du scan** : QCM Questions 3 à 7, dont la **Question 6 (`vMotion`)** et la **Question 7 (`thin provisioning`)**.
     - **Page 10 du scan** : Questions 1 à 10 sur l'histoire de Max, dont la **Question 5 (`vMotion`)** et la **Question 6 (`Haute Disponibilité HA`)**.
  3. **Absence dans `admin-vm` (B2) et présence en B3 (`b3-virtualisation`)** :
     - Dans l'ensemble des fichiers de `admin-vm/` (B2), `vMotion` et `thin provisioning` apparaissent **0 fois** ;
     - Ils ne sont enseignés qu'en Licence 3 dans `b3-virtualisation/chapitres/chapitre3.html:L95-L120` (`Thin Provisioning`) et `b3-virtualisation/chapitres/chapitre5.html:L84-L110` (`vMotion`).

---

### Point B9 — « Les 8 notions à connaître absolument » vs nombre réel de notions et `cartes.html`
- **Verdict** : **CORRIGÉ (`158` chapitres sur 416 ont `≠ 8` notions : `121` chapitres ont `9 à 17` notions et `37` chapitres ont `5 à 7` notions ; `415` chapitres sur 416 ont moins de 8 flashcards dans `cartes.html`)**.
- **(a) Définition de l'unité comptée** : Chapitre (`chapitres/chapitreN.html`) où la liste `<ol>`/`<ul>` placée sous le titre `<h3>Les 8 notions à connaître absolument</h3>` (généré en dur par `scripts/course-kit.js:L326`) contient un nombre d'éléments `<li>` différent de 8.
- **(b) Script** : `audit/tour2/scripts/b9_notions_cartes.py`
- **(c) CSV** : `audit/tour2/csv/b9_notions_cartes.csv` (416 lignes donnant pour chaque chapitre : `cours_id`, `niveau`, `chapitre_html`, `titre_affiche`, `nb_notions_listees`, `nb_cartes_chapitre`, `total_cartes_cours`, `verdict_notions`).
- **(d) Chiffre retenu & (e) Réconciliation (`152` vs `121 + 37 = 158`)** :
  - Sur les **416 chapitres** :
    - **`258` chapitres** listent exactement **8 notions** (conformes au titre) ;
    - **`121` chapitres** listent **entre 9 et 17 notions** (`9` notions : 15 ch. ; `10` notions : 60 ch. ; `11` notions : 21 ch. ; `12` notions : 10 ch. ; `13` notions : 3 ch. ; `14` notions : 5 ch. ; `15` notions : 2 ch. ; `16` notions : 2 ch. ; `17` notions : 3 ch., ex. `admin-vm/chapitres/chapitre1.html:L362`) ;
    - **`37` chapitres** listent **entre 5 et 7 notions** (`5` notions : 24 ch. ; `6` notions : 12 ch. ; `7` notions : 1 ch.).
  - **Explication de l'écart** : Au Tour 1, notre script avait compté les chapitres ayant `nb_notions != 8` (158 sur 416, ou 152 en omettant un cours de 6 chapitres) et avait improprement qualifié la totalité du lot `!= 8` de « 9 à 17 notions », alors qu'il se décompose en **121 chapitres en surplus (9 à 17 notions)** et **37 chapitres en déficit (5 à 7 notions)**.
  - Côté `chapitres/cartes.html` : **415 chapitres sur 416** ont entre **4 et 6 flashcards par chapitre** (ex. `b1-algo/chapitres/cartes.html` : 40 cartes pour 10 chapitres, soit 4 cartes/chapitre ; cours B3 : 30 à 36 cartes pour 6 chapitres, soit 5 à 6 cartes/chapitre ; seul `admin-vm` Ch. 1 atteint 8 cartes).

---

### Point B10 — Corrigés d'examens B3 affichés en clair (`examens.html`)
- **Verdict** : **CONFIRMÉ (sur 100 % des 23 cours B3 + 7 cours B2 = 30 pages d'examen)**.
- **(a) Définition de l'unité comptée** : Page d'examen blanc (`chapitres/examens.html`, `chapitres/examen-blanc.html` ou `chapitres/simulateur-examen.html`) contenant des blocs de corrigé `<div class="box box--solution">` placés directement dans le flux DOM sans balise repliable `<details>` ni masquage CSS/JS.
- **(b) Script** : `audit/tour2/scripts/b10_examens_b3.py`
- **(c) CSV** : `audit/tour2/csv/b10_examens_en_clair.csv` (69 pages d'examen inspectées).
- **(d) Ce qui se passe réellement à l'écran & liste des 30 pages** :
  - Dans les **23 cours B3** (`22` fichiers `b3-*/chapitres/examens.html` + `1` fichier `b3-virtualisation/chapitres/examen-blanc.html`) ainsi que dans **7 cours B2** (`sql/chapitres/examens.html`, `csharp/chapitres/simulateur-examen.html`, `ccna/chapitres/simulateur-examen.html`, `uml/chapitres/simulateur-examen.html`, `uiux/chapitres/simulateur-examen.html`, `docker/chapitres/simulateur-examen.html`, `infographie/chapitres/simulateur-examen.html`), chaque sujet d'examen est immédiatement suivi d'une boîte `<div class="box box--solution">` (`nb_details = 0`).
  - **Comportement réel à l'écran** : Aucune règle CSS dans `/assets/css/` ne masque `.box--solution` et aucun script JS ne la replie : **le corrigé intégral et le barème sont affichés en clair sous les yeux de l'étudiant dès le chargement de la page, avant toute tentative**, et 29 de ces 30 pages (toutes sauf `b3-reseau-lan/chapitres/examens.html`) sont en outre dépourvues de chronomètre interactif (`data-timer`).

---

### Point B11 — Page d'accueil `index.html` : compteurs, onglet actif et ordre des cartes
- **Verdict** : **CONFIRMÉ & PRÉCISÉ (HTML statique vs après exécution du JavaScript)**.
- **(a) Unité & Périmètre** : Inspection du DOM statique de `index.html` et du script inline de filtrage (`index.html:L1315-L1385`).
- **(b) Script** : `audit/tour2/scripts/b11_index_home.py`
- **(c) CSV** : `audit/tour2/csv/b11_index_cartes.csv` (les 70 cartes dans l'ordre exact du DOM `#grid`).
- **(d) & (e) Reproduction exacte et distinction HTML statique vs rendu après JS** :
  1. **Valeurs des compteurs dans `index.html`** :
     - Sous-titre héro (`index.html:L78`) : **`68 cours interactifs (+ Atelier Web & Annales)`** ;
     - Onglet `#tab-b1` (`L93`, actif par défaut `class="level-tab is-active" aria-selected="true"`) : **`23 cours`** ;
     - Onglet `#tab-b2` (`L98`) : **`24 cours`** (car il additionne les 22 cours B2 + `preparation-web` + `epreuves` qui portent tous deux `data-level="b2"`) ;
     - Onglet `#tab-b3` (`L103`) : **`23 cours`** ;
     - Onglet `#tab-all` (`L108`) : **`70 cours`** (`23 + 24 + 23 = 70`).
  2. **Ordre des 70 cartes dans le DOM `#grid` (`index.html:L143-L1150`)** :
     - Positions DOM **1 à 24** (`--bf-i: 0` à `23`) : les **24 cartes `data-level="b2"`** (`linux`, `php`, `probabilites`, `rd_java`, `rd_winserver`, `admin-vm`, `droit`, `react`, `api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `RD-RO`, `assembleur`, `Cyber securite B2`, `sql`, `csharp`, `ccna`, `uml`, `uiux`, `docker`, `infographie`, `preparation-web`, `epreuves`), **sans attribut `hidden` dans le HTML statique** ;
     - Positions DOM **25 à 47** (`--bf-i: 24` à `46`) : les **23 cartes `data-level="b1"`** ;
     - Positions DOM **48 à 70** (`--bf-i: 47` à `69`) : les **23 cartes `data-level="b3"`**.
  3. **Est-ce un défaut du HTML statique seulement ou aussi après JavaScript ?**
     - **Dans le HTML statique (avant exécution du JS / premier rendu SSR / sans JS)** : L'onglet actif est `B1`, la barre de statut affiche `Cours de Licence 1 (B1) — 23 cours` (`index.html:L124`), mais les 24 premières cartes visibles en haut de la grille sont les 24 cartes **B2** !
     - **Après exécution du JavaScript (`index.html:L1381`)** : Au chargement, le script inline appelle `applyFilter(savedLevel)` (où `savedLevel` vaut `'b1'` par défaut si `localStorage.getItem('revi_active_level')` est vide, `L1379`), ce qui ajoute `card.hidden = !show` (`L1343`) sur les cartes B2 et B3 et ne laisse visibles que les 23 cartes B1. **Toutefois, même après JS**, deux effets résiduels subsistent : (a) les 23 cartes B1 conservent leur variable CSS inline `style="--bf-i: 24"` à `--bf-i: 46` (retardant leur animation d'apparition), et (b) lorsque l'utilisateur clique sur l'onglet **« Tous (70 cours) »**, les cours s'affichent dans l'ordre illogique **B2 → B1 → B3** au lieu de **B1 → B2 → B3** !

---

### Point B12 — Audit antérieur dans `audit/pedagogique/` (`78,4/100` ; `b1-algo` `90/100` ; vérification des 10 affirmations les plus lourdes)
- **Verdict** : **CONFIRMÉ (7 affirmations fausses/hallucinées sur 10, 1 partiellement fausse, 2 confirmées ; scores générés par des constantes codées en dur)**.
- **(b) Script** : `audit/tour2/scripts/b12_ancien_audit.py`
- **(c) CSV** : `audit/tour2/csv/b12_ancien_audit_10_affirmations.csv`
- **(d) Classement des 10 affirmations les plus lourdes des anciens rapports (`audit/pedagogique/` et `audit/pedagogie-exercices/`)** :

| # | Affirmation de l'ancien rapport (`fichier:ligne`) | Verdict | Preuve directe dans le code source |
| :---: | :--- | :---: | :--- |
| **1** | `audit/pedagogique/AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md:L130` : *« `b1-algo` : `chapitre4.html` : tableaux redimensionnables sans gestion de la mémoire. »* | **FAUSSE (Hallucination)** | `b1-algo/chapitres/chapitre4.html` est intitulé *« Chapitre 4 — Boucles : Pour »*. Le mot `redimensionnable` apparaît **0 fois** dans tout le cours `b1-algo`, et les tableaux (de taille fixe) sont aux Chapitres 6 et 8. |
| **2** | `audit/pedagogique/AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md:L125` : *« `b1-c-cpp` : `chapitre3.html` : Pointeurs, arithmétique de pointeurs et fuites mémoire introduits sans stabilité préalable sur les types et fonctions : passage par adresse imposé avant maîtrise du passage par valeur. »* | **FAUSSE (Hallucination)** | `b1-c-cpp/chapitres/chapitre3.html` traite des *« Conditions et boucles (if, switch, while, for) »* (**0 occurrence** du mot `pointeur`). Les fonctions (passage par valeur) sont au **Ch. 5** (`chapitre5.html`) et les pointeurs au **Ch. 6** (`chapitre6.html`), donc *après* les fonctions ! |
| **3** | `audit/pedagogique/D-conformite/b1-algo.md:L24-L35` : Matrice affirmant que `Introduction à L'Algorithmique.pdf` est traité au `chapitre9.html` et `2- Introduction au Langage Pascal.pdf` au `chapitre7.html` avec *« 0 anomalie identifiée »*. | **FAUSSE (Génération modulo N)** | Le script `audit/pedagogique/_outils/generate_all_reports.py` a associé les 12 PDF triés par ordre alphabétique aux chapitres `1..10` par une simple boucle `i % 10` sans ouvrir ni les PDF ni les chapitres HTML. |
| **4** | `audit/pedagogique/C-cours/b1-algo.md:L50-L115` : Score de **90/100 (« Excellent »)** attribué à `b1-algo` avec *« Aucune erreur factuelle bloquante »*, *« prérequis précisés, montée en difficulté cohérente »* (`C5 : 8.5/10`) et *« C7 : 9.0/10 »*. | **FAUSSE (Constantes codées en dur)** | Dans `audit/pedagogique/_outils/generate_all_reports.py:L226-L315`, tout cours du domaine `programmation` ayant `n_chaps == 10` et des PDF reçoit automatiquement `18 + 14 + 14 + 13.5 + 8.5 + 9.0 + 9.0 + 4.5 = 90.5 → 90/100`, sans lire le Ch. 1 qui utilise `Pour` avant le Ch. 4 et exige Python sans l'enseigner. |
| **5** | `audit/pedagogique/C-cours/b3-pfsense.md:L50-L118` : Score de **86/100 (« Bon », Verdict : OUI)** attribué à `b3-pfsense` en vantant ses *« boîtes d'intuition, métaphores claires »*, sa *« couverture exhaustive des objectifs »* (`13.5/15`) et son *« simulateur d'examen chronométré »*. | **FAUSSE (Gabarit générique mensonger)** | `b3-pfsense` contient **0 boîte `.box--intuition`** sur ses 6 chapitres, **0 ligne sur le calcul CIDR ou IPv6** promis dans l'objectif 4 du Ch. 1 (`chapitre1.html:L76`), une erreur factuelle contre la RFC 3021 (`L191`), et son fichier `chapitres/examens.html` n'a **aucun chronomètre** et affiche les corrigés en clair ! |
| **6** | `audit/pedagogique/LIVRABLE_I_rapport_remediation_complete.md:L23-L24` : *« Fuites de prose littérale `\n` : 0 fuite résiduelle sur 936+ pages HTML »* et *« 100 % des blocs `<pre><code>` multilignes aérés »*. | **PARTIELLEMENT FAUSSE** | Il subsiste un bloc `<pre><code>` OpenAPI YAML aplati sur une seule ligne avec **21 `\n` littéraux** dans `b3-document-technique/chapitres/chapitre4.html:L119`, 16 formules LaTeX (`\ne`, `\neq`, `\notin`) affichées brutes, et **68 lignes de virgules parasites `,<ul>,<li>`** dans B3. |
| **7** | `audit/pedagogie-exercices/remediation-et-tests.md:L43,L83` : *« Purge intégrale des scories de code résiduelles (Python & Bash)... server/content/ et pages HTML des 52 cours ne contiennent plus de script Bash/Python »*. | **FAUSSE** | Il subsiste **281 lignes dans les chapitres** (et **203 dans `exercices.html`/`atelier.html`**) des 52 cours en mode `analyse` qui ordonnent encore de coder en Python 3, d'utiliser `ipaddress`, `split()`, `STDIN` ou la notation `2#du-bash`. |
| **8** | `audit/pedagogique/AUDIT_EXHAUSTIF_COMPREHENSION_71_COURS.md:L65-L73` : *« `b1-admin-windows` : Verdict CONFORME (Remédié). »* | **FAUSSE** | Les 18 exercices des 6 chapitres de `b1-admin-windows` (`chapitre1.html:L148`) sont toujours en **Bash Linux (`data-language="shell"`, `#!/bin/bash`)** pour administrer Windows Server ! |
| **9** | `audit/pedagogique/LIVRABLE_A_rapport_executif.md:L48-L51` : *« Bug d'affichage QCM `undefined` sur 13 cours (624 questions) »* avant le patch de `scripts/course-kit.js`. | **CONFIRMÉE** | Confirmée dans l'historique du code (`scripts/course-kit.js:L188-L205` : ajout de `q.stem || q.q` et test `tests/audit-verification.test.js`). |
| **10** | `audit/pedagogique/AUDIT_PREREQUIS_ET_JARGON_PARACHUTE.md:L46-L105` : Diagnostic initial de `b1-reseaux` Ch. 1 (Workgroup 1993, circularité client/serveur, exercices Bash). | **CONFIRMÉE** | Confirmée sur l'état antérieur de `b1-reseaux` Ch. 1, dont la section 2 a ensuite été réécrite (P2P Alice/Bob avant Client-Serveur). |

- **(e) Explication de l'écart entre les scores de `audit/pedagogique/` (`78,4/100` ; `b1-algo` `90/100`) et ceux du Tour 1 (`53,6 %` ; `b1-algo` `50,0 %`)** :
  - L'audit antérieur (`audit/pedagogique/_outils/generate_all_reports.py:L226-L315`) n'a évalué **aucun chapitre** : il a attribué par script des notes constantes (`C2 = 14/15`, `C3 = 14/15`, `C4 = 13.5/15`, `C5 = 8.5/10`, `C7 = 9/10`, `C8 = 4.5/5`) à la quasi-totalité des cours dès lors que le dossier contenait $\ge 6$ fichiers HTML et un PDF de plus de 50 mots (`if words > 50`).
  - À l'inverse, la grille `C1–C14` du Tour 1 évalue chapitre par chapitre la **compréhension linéaire à la première lecture par un novice** (`C3` prérequis explicites, `C4` zéro référence en avant, `C6` exemples résolus + progression PRIMM, `C8` cohérence interne, `C9` alignement cours/exercices, `C11` seuils complets, `C14` propreté du rendu), où les défauts systémiques de gabarit et la migration inachevée `data-language="analyse"` pénalisent mécaniquement les critères `C3, C4, C6, C8, C9, C11, C14`.
