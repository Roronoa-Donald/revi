# ANALYSE CONTENU A→Z — tous les cours (audit pour refonte vers 20/20)

> Généré : 2026-09-27 · Périmètre : **cours servis + matière source B1 IT / B3**
> Livrable : diagnostic, pas de modification de contenu (décision utilisateur).
> Preuves : `audit/inventaire-pages.{json,md}`, `audit/source-inventory.md`,
> `audit/programme-cours.txt`, `audit/captures-index.html` (**685 captures**).

---

## 0. Résumé exécutif

**Verdict : ta note « 3-5/20 » est juste pour la moitié du catalogue, mais le problème n'est pas uniforme — c'est une disparité de générations.**

Trois familles coexistent dans le même catalogue :

| Famille | Cours | Ce que c'est | Note |
|---|---|---|---|
| **A — Récit pédagogique complet** | `csharp`, `b1`, `linux`, `ccna`, `RD-RO`, `uml` | Fil rouge (personnage), encadrés (définition/bonne nouvelle/attention/piège), exemples commentés, mnémotechniques, exercices | 11–15,5/20 |
| **B — Interactif riche, théorie mince** | `sql`, `react`, `api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `docker`, `infographie`, `probabilites` | Moteur d'exercices/QCM/gamification très soigné, mais 2-3 phrases par notion | 7–12/20 |
| **C — Squelette à puces** | `assembleur`, `Cyber securite B2`, `admin-vm`, `droit` | Listes de `<li>` en style télégraphique + QCM. **Ce sont des fiches de révision, pas un cours.** | 1,2–8/20 |

**Chiffres clés**
- **685 pages HTML** inventoriées ; **685 captures** produites (0 échec).
- **≈ 320 pages « chapitre » réelles** ; **≈ 190 redirections vides** (`chapitre-N.html`) héritées d'une refonte interrompue.
- **≈ 190 pages < 350 mots** et **0 page de cours avec une image pertinente** (hors schemas SVG isolés).
- Moyenne de profondeur des chapitres : **≈ 700 mots** — un vrai chapitre d'enseignement en demande 1 800–3 000 (référence `csharp` et `probabilites` anciens).
- **Matière source inexploitée : ≈ 4 900 pages** de PDF (B1 IT 2 963 p · B3 1 958 p) + 20 projets Pascal/C, PPTX et vidéos.

**Les 4 causes racines**
1. **Deux générations de chapitres superposées** (ancienne riche / nouvelle mince), parfois redirigées au hasard.
2. **Deux systèmes de design** (design-system partagé `tokens.css` vs CSS maison + Tailwind CDN dark).
3. **Gabarits réutilisés à vide** : plusieurs cours partagent le même squelette (**19 pages copiées-collées**, ex. `react`/`api-rest-flask`/`erp-si`/`ingenierie-besoin`, mêmes sections numérotées).
4. **Rédaction télégraphique** : les chapitres « C » n'ont que des listes, jamais de phrase d'explication, d'exemple travaillé ni de schéma.

---

## 1. Méthode et limites (honnêteté)

**Ce que j'ai fait**
- Inventaire mécanique **exhaustif** des 685 pages (mots, titres, sections, encadrés, code, QCM, images, redirections, dépendances) — script `scripts/audit-content-inventory.js`.
- **Capture d'écran des 685 pages** en headless Chromium — script `scripts/audit-screenshots.js`, galerie `audit/captures-index.html`.
- Inventaire de la matière source par module + **pages PDF** (`pdfinfo`).
- Extraction du **programme réel** de chaque cours (titres + sections) — `audit/programme-cours.txt`.
- **Lecture intégrale** de chapitres représentatifs de chaque famille : `csharp/ch1`, `react/ch2`, `linux` (structure), `Cyber/ch8`, `assembleur/ch7`, `sql/mod06`, `droit/ch1`, `probabilites/ch2`, `probabilites/chapitres/ch1` (structure), plus `context.md`, `B1_PROJECT_PLAN.md` et les 5 rapports d'`audit/` antérieurs.

**Limites assumées (pas de « faux vert »)**
- **Je ne « vois » pas les images** dans cette session : les captures te sont destinées. Mon jugement visuel s'appuie sur le DOM/CSS, pas sur les pixels. À vérifier à l'œil dans la galerie.
- Je n'ai pas lu **les 4 900 pages de PDF** en entier ; j'ai mesuré le corpus et échantillonné. Le détail de chaque PDF reste à traiter lors de la rédaction.
- La **note /20 est une heuristique mécanique** (mots, encadrés, code, QCM, mnémos, couverture) — elle sous-évalue l'interactif (d'où le cas `sql`) ; je donne donc une note corrigée à la main.

---

## 2. Cartographie du dépôt

### 2.1 Cours HTML servis (24 + portail B1)

| Cours | Pages | Chap. réels | Chap. ≥800m | Chap. <350m | Redir. | Note méca. | Note corrigée |
|---|---:|---:|---:|---:|---:|---:|---:|
| csharp | 40 | 12 | 12 | 0 | 15 | 14,6 | **15,5** |
| b1 (portail) | 110 | 59 | 58 | 0 | 0 | 13,4 | **14,0** |
| linux | 28 | 7 | 6 | 0 | 10 | 12,8 | **13,5** |
| ccna | 30 | 8 | 7 | 0 | 11 | 11,2 | **12,0** |
| uml | 23 | 5 | 3 | 0 | 8 | 11,0 | **12,0** |
| php | 41 | 8 | 3 | 0 | 16 | 9,4 | **12,0** |
| uiux | 9 | 1 (10 modules) | 1 | 0 | 2 | 13,0 | **12,5** |
| RD-RO | 31 | 8 | 6 | 1 | 11 | 9,1 | **11,5** |
| rd_java | 38 | 12 | 3 | 0 | 15 | 8,1 | **11,0** |
| probabilites | 20 | 9 (×2 gén.) | 5 | 4 | 0 | 8,3 | **10,0** |
| rd_winserver | 21 | 5 | 3 | 0 | 7 | 9,6 | **10,5** |
| sql | 42 | 14 | 3 | 1 | 16 | 3,7 | **10,0** |
| react | 30 | 8 | 0 | 0 | 11 | 9,2 | **9,5** |
| erp-si | 25 | 6 | 0 | 0 | 9 | 9,2 | **9,0** |
| ingenierie-besoin | 25 | 6 | 0 | 0 | 9 | 9,4 | **9,0** |
| api-rest-flask | 25 | 6 | 0 | 0 | 9 | 8,7 | **8,5** |
| masterclass-apprendre | 20 | 4 | 0 | 0 | 7 | 8,7 | **8,5** |
| droit | 16 | 3 | 0 | 0 | 3 | 6,3 | **8,0** |
| docker | 18 | 5 | 0 | 0 | 6 | 6,3 | **7,5** |
| infographie | 18 | 5 | 0 | 0 | 6 | 6,3 | **7,5** |
| admin-vm | 20 | 7 | 0 | 4 | 7 | 5,1 | **7,0** |
| assembleur | 28 | 7 | 0 | 4 | 10 | 1,6 | **3,0** |
| Cyber securite B2 | 25 | 8 | 0 | 7 | 9 | 1,2 | **2,5** |
| preparation-web | 1 (app) | — | — | — | 0 | — | **n/a** (atelier) |
| epreuves | 1 (index) | — | — | — | 0 | — | **n/a** (recueil PDF) |

### 2.2 Matière source (non servie)

- **`cours B1 IT`** — 23 modules, **2 963 pages PDF** + 20 projets Code::Blocks, 16 `.pas`, 8 vidéos, DOCX/PPTX. Couvre : Algorithmique, C/C++, Python, Réseaux, Stats descriptives, MERISE, SQL, PHP, Prog WEB, Cyber, Droit, Admin Windows, Git, Linux, CCNA1, Bureautique, VB Excel, Virtualisation, Anglais, FR pro, Algèbre linéaire, Circuit logique, Club robotique.
- **`COURS_B3`** — 23 modules (S1+S2), **1 958 pages PDF**. S1 : Algorithmique, Cloud computing, DevOps, Document technique, Étude quanti/quali (SPSS/Excel), Firewall, Git, Linux, Méthodes agiles, pfSense, Réseau LAN, SQL, Veille, Windows Server. S2 : Anglais, Cloud Azure, **Cryptographie (1 077 p !)**, Google Cloud, **Hacking/CEH (94 p)**, AWS, Supervision (Nagios), VoIP, Virtualisation.
- Le portail `b1/` (110 pages) **matérialise déjà** une partie de B1 (7 matières, 52 chapitres) — c'est la meilleure base réutilisable.

---

## 3. Le problème structurel n°1 : deux générations de chapitres

**Preuve.** La moitié des cours ont, côte à côte :
- une **ancienne arborescence** `cours/chapitres/chapitreN.html` — **riche** (`probabilites` 3 105 mots, `php` 3 550 mots) ;
- une **nouvelle page** `cours/chapitre-N.html` — soit une **redirection vide**, soit une page **design-system mince** (`probabilites/chapitre-2.html` = 186 mots).

**Qui pointe où (sommaires) :**

| Cours | sommaire → `chapitres/` (riche) | → `chapitre-N` (refonte) | Conséquence |
|---|---:|---:|---|
| linux, probabilites, rd_java, rd_winserver, admin-vm, droit, react, api-rest-flask, erp-si, ingenierie-besoin, masterclass, RD-RO, assembleur, Cyber, csharp, ccna, uml, docker, infographie | ✅ majoritaire | 1–3 (extra) | OK, sert le bon contenu |
| **php, sql** | 0 | 17 | le sommaire **passe par des redirections vides** |
| **uiux** | 0 | 3 | idem (redirige vers `sommaire`) |
| **probabilites** | 5 (riche) | 0 | les 4 pages neuves `chapitre-1..4` sont **orphelines** |

**Conséquence produit :** un abonné clique parfois sur une page qui « saute » (redirection) au lieu d'un chapitre ; et sur `probabilites`, deux versions du même cours existent dont une invisible.

---

## 4. Le problème structurel n°2 : deux systèmes de design

| Cours | pages | Tailwind CDN | CSS maison (chapitres) | design-system partagé |
|---|---:|---:|---:|---:|
| csharp | 40 | 17 | 17 | 6 |
| sql | 42 | 19 | 19 | 6 |
| RD-RO | 31 | 14 | 14 | 6 |
| linux | 28 | 12 | 12 | 6 |
| rd_winserver | 21 | 10 | 10 | 4 |
| admin-vm | 20 | 9 | 9 | 4 |
| droit | 16 | 8 | 8 | 4 |
| les autres | — | 0–4 | — | 4–9 |

Autrement dit : **l'index, le sommaire et les exercices** utilisent le design-system partagé (latte, JetBrains Mono) ; **les chapitres** utilisent un CSS maison (souvent sombre + Tailwind CDN). C'est la source première de l'incohérence visuelle constatée dans les audits précédents — et de la dette « 10 cours migrés vs 14 non ».

---

## 5. Le problème structurel n°3 : le gabarit réutilisé à vide (19 pages)

Les cours **`react`, `api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`** sont **le même fichier** avec un habillage différent :

```
section "X"    → 2 phrases
section "Y"    → 2 phrases
section "Z"    → 2 phrases
"Questions de fin de chapitre" → 5 QCM générés
```

Preuve : sections identiques (`Questions de fin de chapitre` sur **19 pages**), mêmes 500–730 mots/chapitre, mêmes 5 QCM/chapitre. **Ces 5 cours représentent ~30 chapitres et ~130 pages « génériques ».** C'est le gisement de refonte le plus rentable.

---

## 6. Analyse cours par cours (détaillée)

Légende : **N** = note corrigée /20 · *(sections)* = programme réel.

### 6.1 Famille A — les bons modèles

#### `csharp` — N 15,5/20 *(12 modules, 877–2 014 mots)*
- **Structure** : Installation · Variables · Conditions · Boucles · Tableaux/List · Méthodes · Strings · Dictionnaires · Console I/O · Switch/Enums · Try/Catch · POO.
- **Ce qui marche** : fil rouge **« Sharpy »** en stage ; encadrés `info/success/warning/danger` ; analogies (`.NET = moteur de voiture`) ; **mnémotechnique C.W.L** ; points clés numérotés ; erreur classique du débutant ; exercice injecté par `exercises.js`.
- **Ce qui manque** : 0 image/schéma ; exercices non visibles dans le HTML (injectés) ; pas de projet final intégrateur.
- **Verdict** : **c'est le gabarit de référence à généraliser.**

#### `b1` (portail) — N 14/20 *(7 matières, 59 chapitres, 774–2 498 mots)*
- **Structure** : algo/Pascal, C/C++, Python, Réseaux, Stats, FBD, MERISE — plus 110 pages, gamification et mascottes.
- **Ce qui marche** : couverture très homogène (58/59 chapitres ≥ 800 mots), mnémotechniques, chapitres ≥ 1 800 mots pour les meilleurs.
- **Ce qui manque** : design encore « glass dark » par défaut, cohérence avec le portail B2, images.
- **Verdict** : **la base la plus saine pour industrialiser** (mêmes gabarits que le B2).

#### `linux` — N 13,5/20 *(7 modules, 749–1 428 mots)*
- **Structure** : Commandes de base · Fichiers · Droits/permissions · Recherche/pipes · *(module 05 manquant !)* · Utilisateurs · Réseau/SSH · Bash scripting.
- **Ce qui marche** : contenu technique dense, "Exercices Interactifs" par module, bon rythme.
- **Ce qui manque** : **le module 05 est absent** alors qu'on saute 04→06 ; pas de QCM ; peu d'explications théoriques (orienté « commandes »).
- **Verdict** : bon, à compléter (module manquant + théorie).

#### `ccna` — N 12/20 *(8 modules, 737–1 693 mots)*
- **Structure** : fondamentaux/OSI · IPv4/subnetting · protocoles · Ethernet/switch · IOS · routage statique · VLAN · ROAS.
- **Force** : labs, tableaux récapitulatifs, progression logique du programme CCNA.
- **Faiblesse** : peu d'encadrés « piège/exemple » (2,6/ch), pas d'images de topologies (crucial en réseau), pas de QCM inline.

#### `uml` — N 12/20 *(5 modules, 673–978 mots)*
- **Force** : TD par module, diagrammes **SVG** déjà présents (`exercise-solutions-svg.js`), flashcards, simulateur 50 Q → le cours le plus « outillé ».
- **Faiblesse** : théorie parfois en listes ; peu de diagrammes *dans* les chapitres (ils sont dans les exercices).

#### `php` — N 12/20 *(8 chapitres, 430–3 550 mots)*
- **Force** : la POO la plus complète du catalogue (héritage, abstraction, interfaces, traits, PDO, MVC, **projet ToDo List** en 2 chapitres), quiz par chapitre.
- **Faiblesse** : **très inégal** — ch1 à 3 550 mots vs ch4 à 430 ; le sommaire passe par des redirections vides.

#### `RD-RO` — N 11,5/20 *(8 modules, 291–3 260 mots)*
- **Force** : le module **Simplexe à 3 260 mots** est un des meilleurs contenus du site (exemple pas-à-pas, l'Ébéniste du prof, dégénérescence).
- **Faiblesse** : modules 06 (291 m) et 08 (379 m) bâclés → forte irrégularité.

### 6.2 Famille B — interactif riche, théorie mince

#### `sql` — N 10/20 *(14 modules, 324–1 419 mots)* — **le cas le plus intéressant**
- **Force exceptionnelle** : `sql-engine` (moteur SQL simulé), éditeur de requêtes, drag & drop ×3, XP/badges/confettis, mascotte **DataBot**, mnémoniques (L.U.S.R.T.), simulateur de transactions, labs. **L'engagement est le meilleur du site.**
- **Faiblesse** : la **théorie est réduite à 2 phrases par notion** ; thème **Tailwind dark slate** hors design-system ; le sommaire passe par 16 redirections.
- **Verdict** : garder le moteur, **réécrire la théorie**.

#### `react` — N 9,5/20 *(8 chapitres, 497–729 mots)*
- **Force** : progression propre, encode 5 QCM/chapitre, projet Todo List final.
- **Faiblesse** : **gabarit générique**, aucune profondeur, aucune image, "Questions de fin de chapitre" mécanique. Un étudiant ne peut pas apprendre React ici.

#### `api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre` — N 8,5–9/20 *(4–6 chapitres, 448–656 mots)*
- **Force** : structure claire, QCM.
- **Faiblesse** : **gabarit unique cloné**, ≤ 650 mots, aucun encadré riche, aucun exemple travaillé, aucune image. Contenu « noté express ».
- `api-rest-flask` a au moins un « Atelier guidé » ; les trois autres, non.

#### `probabilites` — N 10/20 *(4 pages neuves 186–231 m + 4 chapitres riches 1 773–3 105 m)*
- **Force** : les chapitres riches (vocabulaire probabiliste, Bayes, dénombrement, VA, TCL, rappels d'intégration) sont excellents et les seuls **vraiment mathématiques**, avec MathJax.
- **Faiblesse** : **deux versions concurrentes** ; les pages neuves sont orphelines et trop minces → gaspillage.
- **Verdict** : **fusionner** (garder le fond riche, adopter la présentation neuve).

#### `docker` / `infographie` — N 7,5/20 *(5 chapitres, 450–702 mots)*
- **Force** : QCM par chapitre (6/ch), sujet bien découpé.
- **Faiblesse** : quasi exclusivement des listes, aucun schéma (Docker sans schéma d'architecture, infographie sans image = paradoxe), aucun exemple travaillé.

#### `rd_winserver` — N 10,5/20 *(5 chapitres, 648–1 096 mots)*
- **Force** : bonne couverture sauvegarde/HA/clustering/maintenance/VMware, tableaux comparatifs, "Résumé Express".
- **Faiblesse** : pas d'exercices, pas de QCM propre, peu d'encadrés.

### 6.3 Famille C — squelettes à puces (la cible prioritaire)

#### `Cyber securite B2` — N 2,5/20 *(8 chapitres, 202–468 mots)*
- **Contenu réel d'un chapitre** : `Objectifs` (3 `<li>`) + 3–4 sections de `<li>` télégraphiques + un « Mémo technique » (une ligne) + un « Piège » (une ligne) + un « Recap/Cheat Sheet » (3 cartes à puces) + 9–10 QCM.
- **Aucune phrase d'explication.** Ex. : « Identifier les actifs. / Évaluer menaces + vulnérabilités. » — sans définir *actif*, *menace*, *vulnérabilité*.
- **Pire** : le sujet (cybersécurité) **exige** des schémas (attaque, défense en profondeur) — il n'y en a aucun.
- **Verdict** : **réécriture complète**, pas un amendement.

#### `assembleur` — N 3/20 *(7 chapitres, 299–592 mots)*
- Même gabarit à puces. Sujets très denses (numération, CPU, AVR, NASM) traités en 300–600 mots sans exemple de code exécutable dans les chapitres (le code est relégué au QCM). Un cours d'assembleur sans un seul listing commenté est inutilisable.

#### `admin-vm` — N 7/20 *(7 chapitres, 260–516 mots)*
- Gabarit à puces **légèrement** amélioré (sections « Ce que tu sauras expliquer », vocabulaire). Reste sans exemples, sans schéma d'hyperviseur, sans commandes.

#### `droit` — N 8/20 *(3 chapitres, 460–502 mots)*
- **Meilleur des « C »** : 9 encadrés/chapitre (analogie, info, warning, success), définitions correctes, cycle de vie de la donnée.
- **Faiblesse** : uniquement de la définition — **aucun cas pratique, aucune étude de cas, aucun exercice** ; et seulement 3 chapitres pour un sujet vaste.

### 6.4 Cours hors gabarit

- `uiux` — N 12,5/20 : **une seule page** de 10 modules (2 626 mots, 31 encadrés) + simulateur 110 Q. Bon fond mais **tout en une page** = mauvaise expérience (pas de navigation chapitre, pas de progression fine).
- `preparation-web` — **atelier** (app interactive + éditeur CodeMirror), hors logique « chapitre » ; à évaluer séparément (contenu = projets guidés).
- `epreuves` — recueil PDF (Epreuves groupées + Recueil 2024-2025) ; c'est un livrable, pas un cours.

---

## 7. Référentiel « 20/20 » : à quoi doit ressembler un chapitre

Synthèse des meilleurs éléments existants (`csharp` × `probabilites` × `sql` × `uml`) :

| Bloc | Exigence | Présent aujourd'hui |
|---|---|---|
| **1. Accroche** | Fil rouge / situation concrète (type « Sharpy en stage ») | 1 cours sur 22 |
| **2. Objectifs** | 3–5 compétences « à la fin tu sauras… » | ~10 cours |
| **3. Théorie expliquée** | 1 800–3 000 mots, définir chaque terme, `pourquoi` + `comment` | ~6 cours |
| **4. Encadrés** | Définition · Analogy · Bonne nouvelle · Attention · Piège · Erreur classique (6/an) | 1 cours (`csharp`) |
| **5. Exemples travaillés** | ≥ 3 par chapitre, résolus **pas à pas** (pas seulement la solution) | rare |
| **6. Code / formule** | listings commentés, sortie attendue | partiel |
| **7. Schémas** | ≥ 2 par chapitre (SVG/Mermaid) — **obligatoire** en réseau/VM/sécurité/UML | **≈ 0** |
| **8. Mnémotechnique** | 1–2 (type C.W.L, L.U.S.R.T) | 6 cours |
| **9. Exercices** | 5 progressifs + 1 mini-projet | variable |
| **10. QCM** | 8–10 avec explication de la correction | ~15 cours (5 items) |
| **11. Récap** | Fiche de révision en fin de chapitre + flashcards | partiel |
| **12. Naviguation & progression** | sommaire, prev/next, progression enregistrée | OK (mais redirections) |

**Cible chiffrée par chapitre : 1 800–3 000 mots · 6 encadrés · 3 exemples · 2 schémas · 5 exercices · 10 QCM.** Aujourd'hui la médiane est **~700 mots · 2 encadrés · 0 schéma**.

---

## 8. Plan de refonte (phases, priorisées)

### Phase 0 — Stabiliser la structure (prérequis, 0,5 j)
1. **Supprimer les ~190 redirections vides** et repointier php/sql/uiux directement sur le vrai contenu.
2. **Trancher `probabilites`** : supprimer la version mince orpheline (ou la remplacer par une vraie page).
3. **Compléter `linux`** (module 05 manquant).
4. **Unifier le design des chapitres** : supprimer Tailwind CDN sombre, brancher `tokens.css` (les cours « C » et `sql`/`RD-RO`/`linux`/`csharp`/`admin-vm`/`droit`/`rd_winserver` sont concernés).

### Phase 1 — Réécriture « 20/20 » des squelettes (impact maximal)
Ordre : `Cyber securite B2` → `assembleur` → `admin-vm` → `droit` → `docker`/`infographie`.
*(≈ 35 chapitres × 2 500 mots ; matière source : CEH, supports pfSense/firewall, VMware, PDF admin Windows.)*

### Phase 2 — Dé-clonage des gabarits génériques
`react`, `api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre` : différencier le fond, ajouter récit/exemples/schémas.
*(≈ 30 chapitres ; matière source : cours B1 Prog WEB/php, PDF Python/C, supports ERP.)*

### Phase 3 — Approfondissement famille B
`sql` (réécrire la théorie, garder le moteur), `rd_java`, `rd_winserver`, `ccna` (schémas !), `probabilites` (fusion), `php` (égaliser ch3–8).

### Phase 4 — Ouvrir B1 IT et B3 comme cours servis
- **B1 IT** : 23 modules disponibles (~2 963 p) — beaucoup recoupent déjà `b1/` et les cours B2 ; prioriser **CCNA1, Algèbre linéaire, Circuit logique, Bureautique, VB Excel** (absents).
- **B3** : monter **Cryptographie (1 077 p)**, **Cloud (Azure/AWS/GCP)**, **DevOps**, **Supervision/Nagios**, **VoIP**, **Virtualisation**, **Hacking/CEH**, **Méthodes agiles** — 9–23 nouveaux cours potentiels.

### Phase 5 — Qualité transverse
Schémas SVG systématiques, 3 exemples/chapitre, unification des QCM, fiche de révision + flashcards partout, illustrations.

---

## 9. Effort estimé (indicatif)

| Chantier | Chapitres | Effort |
|---|---:|---|
| Phase 0 structure | — | 0,5 j |
| Phase 1 squelettes | ~35 | 3–4 j |
| Phase 2 dé-clonage | ~30 | 2–3 j |
| Phase 3 approfondissement | ~45 | 2–3 j |
| Phase 4 nouveaux cours B1/B3 | 15–30 cours | 10–20 j |
| Phase 5 transverse | tous | continu |

---

## 10. Annexes — où sont les preuves

| Fichier | Contenu |
|---|---|
| `audit/inventaire-pages.md` / `.json` | inventaire exhaustif des 685 pages + scorecard |
| `audit/captures-index.html` + `audit/screens/` | **685 captures** navigables par cours |
| `audit/source-inventory.md` | matière source par module (fichiers, PDF, pages) |
| `audit/programme-cours.txt` | programme réel (titres + sections) de chaque cours |
| `scripts/audit-content-inventory.js` | script d'inventaire (ré-exécutable) |
| `scripts/audit-screenshots.js` | script de capture (ré-exécutable) |
| `audit/*.md` (7 fichiers) | audits antérieurs : complétude, correction, design, intégration, live-UX, logique, tests |

### Corrections à apporter au fichier `agents`/notes
- Le finding historique « 197/390 chapitres vides » est **confirmé et précisé** : ce sont aujourd'hui **~190 redirections** (la mitigation « redirection » a eu lieu mais n'a jamais été supprimée ni transformée en contenu).
