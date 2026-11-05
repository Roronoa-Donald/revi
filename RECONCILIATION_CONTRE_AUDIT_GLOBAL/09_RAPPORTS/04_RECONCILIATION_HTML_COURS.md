# 04_RÉCONCILIATION DES FICHIERS HTML ET CARTOGRAPHIE DES COURS — 832, 868, 931, 1 067

**Sources de référence :** [server/courses.js](file:///home/rd/Desktop/proba/server/courses.js), [scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js), [server/content/](file:///home/rd/Desktop/proba/server/content/)  
**Manifestes associés :** [manifest_pages_html.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_pages_html.json), [manifest_cours.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_cours.json), [liste_fichiers_surplus_36.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/04_RECONCILIATION_HTML/liste_fichiers_surplus_36.json), [liste_fichiers_hors_cours_136.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/04_RECONCILIATION_HTML/liste_fichiers_hors_cours_136.json)  

---

## 1. CARTOGRAPHIE PÉDAGOGIQUE DES 71 SECTIONS ET 68 COURS

Le registre unique de vérité [server/courses.js](file:///home/rd/Desktop/proba/server/courses.js) définit **71 entrées de formation** réparties sur trois cycles :
- **Licence 1 (B1) :** 24 modules (`b1-admin-windows`, `b1-algebre`, ..., `b1-vb-excel` [archivé])
- **Licence 2 (B2) :** 24 modules (`admin-vm`, `api-rest-flask`, ..., `uml`)
- **Licence 3 (B3) :** 23 modules (`b3-agile`, `b3-algo`, ..., `b3-windows-server`)

Sur ces 71 entrées, exactement **68 cours** disposent d'un environnement d'ateliers de code dans [server/exercises/course-config.js](file:///home/rd/Desktop/proba/server/exercises/course-config.js). Les 3 entrées exclues du runtime de notation serveur sont :
1. `b1-sql` : évalué exclusivement côté client via un simulateur SQLite WebAssembly (`sql.js`) ;
2. `preparation-web` : section spéciale d'entraînement B2 avec mot de passe dédié ;
3. `epreuves` : dossier statique d'annales d'examen au format PDF.

---

## 2. DÉCOMPOSITION ARITHMÉTIQUE DES QUATRE CHIFFRES HISTORIQUES

Les documents antérieurs mentionnaient quatre chiffres distincts (832, 868, 931, 1 067), créant une apparente confusion. L'audit physique exhaustif réalisé par l'outil [reconcile_html_courses.js](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/08_OUTILS/reconcile_html_courses.js) prouve que ces nombres correspondent à quatre périmètres d'ingénierie rigoureusement emboîtés :

```
832 (Pages canoniques générées par kit)
  └── + 36 fichiers surplus dans dossiers cours ──> 868 (Pages physiques cours générés)
        └── + 60 pages manuelles (4 cours B1)
        └── +  3 pages section préparation-web ──> 931 (Total pages de cours servies)
              └── + 136 pages hors cours (public, racine, legacy, tests) ──> 1 067 (Total workspace)
```

### 1. Le chiffre 832 (Génération canonique pure par `course-kit.js`)
Le dossier [server/content/](file:///home/rd/Desktop/proba/server/content/) regroupe exactement **64 modules de cours générés**.  
Chaque module implémente la méthode `course.render(kit)` qui produit un gabarit fixe de **13 pages HTML canoniques** :
- `index.html` (accueil)
- `sommaire.html` (plan de cours)
- `atelier.html` (environnement d'exercice)
- 6 chapitres : `chapitres/chapitre1.html` à `chapitres/chapitre6.html`
- `chapitres/cartes.html` (cartes mémo)
- `chapitres/formules.html` (synthèse aide-mémoire)
- `chapitres/simulateur-examen.html` (examen blanc)
- `exercices/exercices.html` (catalogue d'exercices)
$$64 \text{ cours} \times 13 \text{ pages} = \mathbf{832} \text{ pages canoniques}$$
C'est le nombre exact validé par la commande `npm run courses:check`.

### 2. Le chiffre 868 (Total des fichiers HTML dans les 64 dossiers de cours)
Sur le disque, les 64 dossiers de cours contiennent 868 fichiers HTML, soit $832 + 36$ fichiers excédentaires. L'analyse détaillée de [liste_fichiers_surplus_36.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/04_RECONCILIATION_HTML/liste_fichiers_surplus_36.json) identifie rigoureusement ces **36 surplus** :
- **11 fichiers `qcm-100.html`** autonomes (présents à la racine des cours ou sous `chapitres/`) ;
- **18 fichiers modulaires historiques** dans le cours `sql` (`sql/modules/mod01` à `mod12`, `cours_ecommerce_sql.html`, etc.) ;
- **5 fichiers spécifiques** dans le cours `droit` (`droit/annexes/rgpd-togo.html`, `rgpd-ue.html`, `qcm-autonome.html`, `tp-exposes.html`, `qcm-100.html`) ;
- **1 fichier d'erreur 404** dans `probabilites/404.html` ;
- **1 page d'exercices en doublon** dans `RD-RO/exercices/exercices.html`.
$$832 + 36 = \mathbf{868} \text{ fichiers}$$

### 3. Le chiffre 931 (Périmètre total des cours officiellement servis)
Le serveur Fastify sert l'ensemble des cours générés ainsi que les cours historiques codés à la main :
- **868 pages** dans les 64 dossiers de cours générés ;
- **60 pages manuelles** issues des 4 cours B1 historiques :
  - `b1-python` (16 pages)
  - `b1-c-cpp` (18 pages)
  - `b1-algo` (12 pages canoniques servies)
  - `b1-php` (14 pages canoniques servies)
- **3 pages de préparation spéciale** à la racine (`preparation-*.html` pour `preparation-web`).
$$868 + 60 + 3 = \mathbf{931} \text{ fichiers HTML de cours réels}$$

### 4. Le chiffre 1 067 (Inventaire physique exhaustif du workspace)
En scannant l'intégralité du système de fichiers (hors `node_modules/`, `.git/` et dossiers d'audits isolés), 136 fichiers HTML supplémentaires sont identifiés dans [liste_fichiers_hors_cours_136.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/04_RECONCILIATION_HTML/liste_fichiers_hors_cours_136.json) :
- **4 pages d'authentification et administration** sous `public/` et `_auth/` (`login.html`, `activate.html`, `dashboard.html`, `account.html`) ;
- **9 pages statiques racines** (`index.html`, `404.html`, `cgu.html`, etc.) ;
- **116 pages legacy non canoniques** situées dans des répertoires d'archives non servis (`b1/`, `cours windows/`, `administration machine virtuel/`, `roadmap/`, `droitb2/`) ;
- **7 maquettes et pages de test** (`audit/captures-index.html`, quiz agiles de travail, templates).
$$931 + 136 = \mathbf{1\,067} \text{ fichiers HTML physiques}$$

---

## 3. AUDIT DE CONFORMITÉ DES 64 COURS AUX STANDARDS 13 PAGES

Le manifeste [manifest_cours.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_cours.json) audite individuellement chaque cours :
- **Présence du sommaire (`sommaire.html`) :** 100 % (64/64)
- **Présence de 6 chapitres complets :** 100 % (64/64)
- **Présence de l'atelier de code (`atelier.html`) :** 100 % (64/64)
- **Présence de l'examen blanc (`simulateur-examen.html`) :** 100 % (64/64)
- **Présence des aides-mémoire (`cartes.html`, `formules.html`) :** 100 % (64/64)
- **Conformité stricte au gabarit :** Tous les 64 modules génèrent leurs 13 pages avec succès et sans avertissement lors du contrôle `courses:check`.
