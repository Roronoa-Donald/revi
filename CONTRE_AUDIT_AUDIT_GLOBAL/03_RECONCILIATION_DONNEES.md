# 03_RECONCILIATION_DONNEES — RECONSTRUCTION ET RECONCILIATION INDEPENDANTE DES DONNEES

**Projet :** `revi-cours-html`  
**Répertoire :** `/home/rd/Desktop/proba`  
**Sources de référence :** `server/content/`, `server/exercises/`, `server/courses.js`

---

## 1. RECONSTRUCTION DES VOLUMES DU CATALOGUE D'EXERCICES

L'inspection directe du catalogue (`server/exercises/index.js`) et de la politique de suspension (`server/exercises/grading-policy.js`) établit l'arborescence exacte des effectifs du projet :

```
Catalogue Total : 1 250 exercices uniques
├── Exercices Suspendus de Notation : 354
│   ├── Suspensions Globales de Cours : 126 (7 cours x 18 exercices)
│   │   ├── csharp (18)
│   │   ├── docker (18)
│   │   ├── b3-linux (18)
│   │   ├── b3-github (18)
│   │   ├── b1-sql (18)
│   │   ├── sql (18)
│   │   └── b3-sql (18)
│   ├── Suspension Individuelle de Méthode : 1 (algo-c9-e2)
│   └── Suspensions par Empreinte SHA-256 Manquante : 227
└── Exercices Actifs (NOTATION_AUTORISEE) : 896
    ├── Pôles Pilotes et Lots Certifiés : 82
    │   ├── Pôles Pilotes Historiques : 55 (b1-linux: 18, probabilités: 19, RD-RO: 18)
    │   └── Lots Unitaires Testés : 27 (b1-python: 6, b1-c-cpp: 3, rd_winserver: 12, react: 6)
    └── Fiches Actives Non-Pilotes : 814
```

### 1.1 Réconciliation Mathématique des Exercices
- $126 + 1 + 227 = \mathbf{354}$ suspensions (vérifiées à 100 % dans `server/exercises/grading-policy.js`).
- $1\,250 - 354 = \mathbf{896}$ exercices actifs éligibles à la notation.
- $55 + 27 = \mathbf{82}$ fiches certifiées sur bancs pilotes et unitaires.
- $896 - 82 = \mathbf{814}$ fiches actives non-pilotes à vérifier pédagogiquement.
- $814 + 82 + 354 = \mathbf{1\,250}$ : La réconciliation est arithmétiquement exacte et fermée.

---

## 2. RECONSTRUCTION ET ELUCIDATION DU CORPUS QCM

### 2.1 Les Trois Chiffres Historiques : 3 089, 3 158 et 3 185
L'audit contradictoire a enfin résolu le mystère des chiffres divergents cités dans les différents rapports :

| Effectif Annoncé | Source / Script | Origine et Explication Technique | Statut Contre-Audit |
| :--- | :--- | :--- | :--- |
| **3 089 items** | `scripts/build_finalisation_manifests.js:484` et `AUDIT_GLOBAL_FINAL/10_REGISTRE_3089_QCM.json` | L'auteur a appliqué `rawChapterItems.slice(0, 2829)` sur les 2 898 questions brutes extraites, tronquant 69 questions réelles. $2\,829 + 260 \text{ (examens)} = 3\,089$. | **INVALIDE (TRONCATURE ARTIFICIELLE)** |
| **3 158 items** | `AUDIT_GLOBAL_FINAL/02_RECONCILIATION_HISTORIQUE.csv` | Total brut extrait par `build_finalisation` avant application du `slice()` : 2 898 questions de chapitres + 260 questions d'examens = 3 158. Mais ce script ignorait `Cyber securite B2`. | **INCOMPLET (OMISSION 1 COURS)** |
| **3 185 items** | `CONTRE_AUDIT_AUDIT_GLOBAL/OUTILS/extract_qcm_complete.js` | Total exhaustif réel : 2 925 questions de chapitres (dont 27 de `Cyber securite B2`) + 260 questions d'examens = 3 185 questions uniques réparties sur 64 cours. | **VERITE TERRAIN ETABLIE** |

### 2.2 L'Omission de Cybersécurité B2
Dans `scripts/build_finalisation_manifests.js` (ligne 354) et `scripts/build_audit_global_csvs.js` (ligne 483), la boucle de chargement parcourait `Object.keys(COURSES)`.  
La clé de registre étant `'Cyber securite B2'`, le test `fs.existsSync('server/content/Cyber securite B2')` échouait silencieusement car le sous-dossier physique est nommé `'cyber-securite-b2'`.  
Ce bogue a fait disparaître les **27 questions de cours** de ce module de l'ensemble des manifestes officiels antérieurs.

### 2.3 Les 260 Questions d'Examens Blancs
Exactement 26 fichiers sources définissent une constante `mastery = [...]` ou `EXAMEN_QCM = [...]` contenant 10 questions chacune ($26 \times 10 = 260$ questions d'examen).

### 2.4 Les Banques Autonomes Hors-Corpus (`qcm-100.js`)
En marge des modules de cours de `server/content/`, 7 cours disposent de fichiers autonomes `qcm-100.js` à la racine de leur dossier (`react`, `api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `assembleur`, `Cyber securite B2`).  
Cinq d'entre eux exposent une variable globale `window.COURSE_QCM` totalisant **500 questions formatives supplémentaires**, servies côté client par les pages `qcm-100.html`.

---

## 3. TABLEAU SYNOPTIQUE DE RECONCILIATION GLOBALE

| Grand Ensemble | Effectif Précédent | Effectif Réel Vérifié | Écart Forensique | Cause de l'Écart |
| :--- | :--- | :--- | :--- | :--- |
| **Exercices Catalogue** | 1 250 | **1 250** | 0 | Conforme |
| **Cours Configurés (Labs)** | 68 | **68** | 0 | Conforme |
| **Exercices Suspendus** | 354 | **354** | 0 | Conforme (126 + 1 + 227) |
| **Exercices Actifs** | 896 | **896** | 0 | Conforme |
| **Exercices Pilotes / Lots** | 82 | **82** | 0 | Conforme (55 + 27) |
| **Fiches Actives Non-Pilotes** | 814 (tronqué) | **814 (réel)** | 44 échangées | `slice(0, 814)` a substitué 44 fiches B2 à 44 fiches B3 |
| **Fiches Sans Tests Robustes** | 652 | **551** | -101 | 652 résultait d'un filtre textuel superficiel ; 263 fiches ont de vrais tests limites/négatifs |
| **Questions QCM Totales** | 3 089 ou 3 158 | **3 185** | +96 ou +27 | Troncature `.slice()` de 69 questions et omission de 27 questions de `Cyber securite B2` |
| **Questions d'Examens** | 260 | **260** | 0 | Conforme (26 examens x 10 items) |
| **QCM Asymétriques Réels** | 701 (fixé) | **1 160** | +459 | Le ratio `> 2.0x` était arbitraire ; le calcul réel identifie 1 160 asymétries en caractères ou mots |
| **Union Prioritaire (184 + 701)**| 844 | **844** | 0 | Conforme ($184 + 701 - 41 = 844$) |
