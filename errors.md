# 🔍 RAPPORT D'AUDIT COMPLET — Portail de Cours Interactifs

> **Date** : 8 février 2026  
> **Périmètre** : 7 projets de cours + fichiers texte Windows + portail principal  
> **Fichiers audités** : ~120 fichiers (HTML, CSS, JS, TXT)

---

## TABLE DES MATIÈRES

1. [Portail principal (index.html)](#1-portail-principal)
2. [Probabilités](#2-probabilités)
3. [Linux](#3-linux)
4. [PHP POO](#4-php-poo)
5. [Java (rd_java)](#5-java-rd_java)
6. [Windows Server (rd_winserver)](#6-windows-server-rd_winserver)
7. [Recherche Opérationnelle (RD-RO)](#7-recherche-opérationnelle-rd-ro)
8. [SQL](#8-sql)
9. [Cours Windows (fichiers texte)](#9-cours-windows-fichiers-texte)
10. [Problèmes transversaux](#10-problèmes-transversaux)

---

## Légende de sévérité

| Icône | Niveau | Signification |
|:---:|---|---|
| 🔴 | Critique | Fonctionnalité cassée, contenu faux, crash JS |
| 🟠 | Majeur | Fonctionnalité dégradée, contenu incomplet, UX brisée |
| 🟡 | Modéré | Incohérence, mauvaise pratique, contenu améliorable |
| 🟢 | Mineur | Détail cosmétique, typo, suggestion |

---

## 1. PORTAIL PRINCIPAL

**Fichier** : [index.html](index.html)

| # | Sév. | Catégorie | Problème |
|---|:---:|---|---|
| P-1 | 🟡 | Style | Copyright `© 2025` — nous sommes en 2026 |
| P-2 | 🟡 | Contenu | Les descriptions meta des cartes sont incohérentes : SQL dit « Gamifié », Probabilités dit « Exercices », PHP dit « Pratique » |
| P-3 | 🟢 | Contenu | La carte Probabilités ne mentionne pas le nombre de chapitres (4 seulement, vs 8-12 pour les autres) |
| P-4 | 🟢 | SEO | Pas de balises Open Graph (`og:title`, `og:image`), mauvais aperçu lors du partage |
| P-5 | 🟢 | Compatibilité | `color-mix()` CSS utilisé dans `.card-icon` — non supporté par Safari < 16.4 |
| P-6 | 🟡 | Structure | Le dossier `cours windows/` existe mais n'est pas lié depuis le portail |

---

## 2. PROBABILITÉS

### 2.1 Éléments manquants

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PR-1 | 🔴 | [probabilites/chapitres/cartes.html](probabilites/chapitres/cartes.html) | **Pas de système de flashcards** — la page est une référence sur les jeux de cartes (52/32 cartes), pas des flashcards de révision. Aucune fonctionnalité flip/maîtrisée. Les 40+ flashcards requises sont totalement absentes |
| PR-2 | 🟠 | [probabilites/chapitres/simulateur-examen.html](probabilites/chapitres/simulateur-examen.html) | Seulement **20 questions** d'examen (5 par chapitre) — requis : 50+ |
| PR-3 | 🟠 | — | Pas de fichier `exercises.js` unifié — les exercices sont répartis dans 4 fichiers `quiz-chapitre{1-4}.js` + `exercises-hints.js` + du JS inline |
| PR-4 | 🟠 | — | **Aucun exercice drag-and-drop** dans tout le projet |
| PR-5 | 🟠 | — | Pas de `download.js` — fonctionnalité de téléchargement absente |

### 2.2 Erreurs techniques / JS

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PR-6 | 🔴 | [probabilites/assets/js/gamification.js](probabilites/assets/js/gamification.js) | `renderInterface()` est appelée dans `init()` mais **n'est jamais définie** → `TypeError` à chaque chargement |
| PR-7 | 🟠 | [probabilites/assets/js/main.js](probabilites/assets/js/main.js) vs [probabilites/assets/js/gamification.js](probabilites/assets/js/gamification.js) | Clés localStorage incohérentes : `rd_proba_completed` (main.js) vs `proba_rd_progress` (gamification.js) — les deux systèmes ne communiquent pas |
| PR-8 | 🟠 | [probabilites/assets/js/exercises-hints.js](probabilites/assets/js/exercises-hints.js) | Cherche des IDs inexistants (`#answer-{exoId}`, `#hints-counter-{exoId}`). `initExerciseWithHints()` n'est **jamais appelé** |
| PR-9 | 🟠 | [probabilites/assets/js/simulators.js](probabilites/assets/js/simulators.js) | Cherche `#sim-urne-container` qui n'existe dans **aucun fichier HTML** — simulateur d'urne mort |
| PR-10 | 🟡 | [probabilites/assets/js/simulators.js](probabilites/assets/js/simulators.js) | Appelle `GameEngine.addXP()` sans vérifier `typeof GameEngine !== 'undefined'` — crash si gamification.js non chargé |
| PR-11 | 🟡 | Tous les quiz JS | `normalizeAnswer()` est dupliquée 6+ fois dans différents fichiers |
| PR-12 | 🟡 | [probabilites/update_chapters.py](probabilites/update_chapters.py) | Pointe vers `ro/chapitres` (Recherche Opérationnelle) au lieu de `probabilites/chapitres` |
| PR-13 | 🟡 | Tous les chapitres + main.js | Configuration MathJax dupliquée (dans le `<head>` HTML ET dans main.js) — conflit potentiel |

### 2.3 Problèmes de contenu

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PR-14 | 🔴 | [probabilites/chapitres/formules.html](probabilites/chapitres/formules.html) vs chapitres | **Discordance de numérotation** : les chapitres utilisent Ch1=Probas+Bayes, Ch2=Dénombrement, Ch3=VA discrètes, Ch4=VA continues. Mais formules.html et simulateur-examen utilisent Ch1=Probas de base, Ch2=Probas conditionnelles, Ch3=Dénombrement, Ch4=VA. Le filtre par chapitre du simulateur affiche les mauvaises questions |
| PR-15 | 🟠 | [probabilites/chapitres/chapitre1.html](probabilites/chapitres/chapitre1.html), [probabilites/chapitres/chapitre2.html](probabilites/chapitres/chapitre2.html) | Contenu **dupliqué** après la balise `</script>` : sections Bayes et exercices supplémentaires hors du flux normal du document |
| PR-16 | 🟡 | [probabilites/chapitres/formules.html](probabilites/chapitres/formules.html) | Les formules sont verrouillées derrière la complétion des chapitres — contradictoire pour une page de **référence** |
| PR-17 | 🟢 | [probabilites/robots.txt](probabilites/robots.txt), [probabilites/sitemap.xml](probabilites/sitemap.xml) | URLs placeholder `https://example.com/...` jamais remplacées |

### 2.4 Erreurs de style / CSS

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PR-18 | 🟠 | [probabilites/assets/css/style.css](probabilites/assets/css/style.css) | `.solution-toggle` et `.solution-content` définis **deux fois** avec des styles contradictoires — écriture imprévisible |
| PR-19 | 🟡 | [probabilites/assets/css/style.css](probabilites/assets/css/style.css) | Double bloc `@media print` avec règles qui se chevauchent |
| PR-20 | 🟡 | [probabilites/assets/js/simulators.js](probabilites/assets/js/simulators.js) | Ajoute la classe `.shake` mais aucun `@keyframes shake` n'est défini en CSS |
| PR-21 | 🟡 | [probabilites/exercices/exercices.html](probabilites/exercices/exercices.html) | `.hint-box.show` et `.solution-box.show` utilisées mais **jamais définies** dans le CSS — les indices ne s'afficheront pas |
| PR-22 | 🟡 | Diverses pages | Versions de Font Awesome incohérentes (6.4.0 vs 6.5.1) |
| PR-23 | 🟡 | Diverses pages | Renderers MathJax mélangés (`tex-svg.js` vs `tex-mml-chtml.js`) |

### 2.5 Incohérences structurelles

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PR-24 | 🟡 | Tous | **3+ structures de header différentes** selon les pages |
| PR-25 | 🟡 | Tous | **3+ structures de footer différentes** ; `exercices.html` a **deux footers** |
| PR-26 | 🟡 | Tous | Favicons incohérents (inline SVG emoji 🃏, 🎲, ou référence fichier) |
| PR-27 | 🟢 | Tous | Navigation inconsistante (certains liens avec emojis, d'autres sans) |

### 2.6 Accessibilité

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PR-28 | 🟡 | Toutes les pages | Aucun lien « skip to content » |
| PR-29 | 🟢 | Tous | `aria-label` incohérents ("Changer de thème" vs "Changer le thème") |
| PR-30 | 🟢 | Tous | Copyright daté `© 2025` |

---

## 3. LINUX

### 3.1 Erreurs critiques

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| LX-1 | 🔴 | [linux/assets/css/style.css](linux/assets/css/style.css) | **`--glass-bg` et `--glass-border` jamais définies** dans le CSS. 3 pages les utilisent dans leurs styles inline : [exercices.html](linux/exercices/exercices.html), [cartes.html](linux/chapitres/cartes.html), [simulateur-examen.html](linux/chapitres/simulateur-examen.html). Les backgrounds et bordures de ces composants sont **invisibles** |
| LX-2 | 🔴 | [linux/assets/js/exercises.js](linux/assets/js/exercises.js) | `GameEngine.addXP(amount)` appelé **sans paramètre `reason`** partout — toutes les notifications affichent `⚡ +15 XP — undefined` |
| LX-3 | 🔴 | [linux/assets/js/gamification.js](linux/assets/js/gamification.js) | `quizCorrect` et `dragDropWins` **jamais incrémentés** par exercises.js → 4 badges impossibles à obtenir (`quiz_10`, `quiz_50`, `drag_5`, `drag_15`) |
| LX-4 | 🔴 | [linux/assets/js/gamification.js](linux/assets/js/gamification.js) | `state.completed` **jamais alimenté** → 4 badges thématiques impossibles (`cmd_master`, `perm_guru`, `bash_hero`, `net_config`). Au total **8/17 badges (47%) sont impossibles** |

### 3.2 Erreurs de fonctionnalité

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| LX-5 | 🟠 | [linux/chapitres/formules.html](linux/chapitres/formules.html), [linux/chapitres/cartes.html](linux/chapitres/cartes.html), [linux/exercices/exercices.html](linux/exercices/exercices.html) | Ne chargent **ni** `gamification.js`, **ni** `exercises.js`, **ni** `download.js` → pas de mascotte BashBuddy, pas d'XP, pas de téléchargement |
| LX-6 | 🟠 | [linux/chapitres/simulateur-examen.html](linux/chapitres/simulateur-examen.html), [linux/chapitres/formules.html](linux/chapitres/formules.html), [linux/chapitres/cartes.html](linux/chapitres/cartes.html), [linux/exercices/exercices.html](linux/exercices/exercices.html) | Pas de `#user-xp-display` dans la nav — l'XP est invisible hors chapitres |
| LX-7 | 🟠 | [linux/assets/js/exercises.js](linux/assets/js/exercises.js) | XP **farmable à l'infini** : aucune désactivation après bonne réponse sur les exercices guidés et QA. Le bouton « Vérifier » reste cliquable indéfiniment |
| LX-8 | 🟡 | [linux/assets/js/exercises.js](linux/assets/js/exercises.js) | Comparaison floue des réponses QA : `"hostname".includes("host")` → `"host"` est validé comme correct |
| LX-9 | 🟡 | Tous les fichiers HTML | Tailwind `darkMode:'class'` configuré mais le thème utilise `data-theme` (attribut) — les classes Tailwind `dark:` ne fonctionneront jamais |

### 3.3 Contenu pédagogique

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| LX-10 | 🟡 | [linux/chapitres/formules.html](linux/chapitres/formules.html) | Section « Paquets (apt) » présente dans le cheat sheet mais **aucun chapitre ne couvre la gestion de paquets** (`apt update`, `apt install`, `dpkg`) |
| LX-11 | 🟡 | — | **Processus et gestion des tâches** (`top`, `htop`, `ps`, `kill`, `bg`, `fg`, `jobs`) non couverts dans aucun chapitre |
| LX-12 | 🟢 | [linux/exercices/exercices.html](linux/exercices/exercices.html) | Meta description dit « 10 exercices pratiques » mais la page en contient **12** |
| LX-13 | 🟢 | [linux/index.html](linux/index.html) | Stat « 80+ Quiz » potentiellement trompeuse (il y a exactement 80 quiz) |

### 3.4 Accessibilité et divers

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| LX-14 | 🟡 | Tous sauf index.html | `role="dialog"` et `aria-label` absents sur le panneau mobile nav |
| LX-15 | 🟡 | Tous sauf index.html | `aria-label` manquant sur `<nav>` |
| LX-16 | 🟡 | Tous | Footer incohérent : index.html dit « beaucoup de sudo » vs chapitres « Debian 13 · Bash · Terminal » |
| LX-17 | 🟢 | — | Pas de `robots.txt`, `sitemap.xml`, ni page 404 |
| LX-18 | 🟡 | [linux/assets/js/download.js](linux/assets/js/download.js) | Produit un fichier `.doc` (HTML déguisé) et non un vrai `.docx` (ZIP/XML d'Office) |

---

## 4. PHP POO

### 4.1 Éléments manquants

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PH-1 | 🔴 | — | **Pas de `simulateur-examen.html`** — le simulateur d'examen est totalement absent |
| PH-2 | 🔴 | — | **Pas de `formules.html`** (cheat sheet) |
| PH-3 | 🔴 | — | **Pas de `cartes.html`** (flashcards standalone). Flashcards seulement via modal sur index.html, **~20 cartes** au lieu de 40+ |
| PH-4 | 🟠 | — | **Pas de `exercices/exercices.html`** — pas de banque d'exercices corrigés |
| PH-5 | 🟠 | — | Pas de `gamification.js` séparé, pas de mascotte, pas de système d'XP. Seul un système basique de badges/trophées existe dans main.js |
| PH-6 | 🟠 | — | Pas de `exercises.js` ni de `download.js` séparés |
| PH-7 | 🟠 | — | Pas de menu hamburger mobile — la navigation n'a pas de toggle et s'empile mal sur petits écrans |
| PH-8 | 🟠 | [php/chapitre4.html](php/chapitre4.html) à [php/chapitre8.html](php/chapitre8.html) | **Chapitres 4-8 sans exercices** (seulement des quiz). Chapitre 1 a 3 exercices, ch2-3 ont du texte placeholder |

### 4.2 HTML cassé

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PH-9 | 🔴 | [php/chapitre4.html](php/chapitre4.html) | **HTML sévèrement corrompu** : `<button class=-wrapper">` apparaît — balise cassée par erreur de copier-coller. Sections 3-4 ont du code dupliqué et du balisage malformé |
| PH-10 | 🟠 | [php/chapitre6.html](php/chapitre6.html) | `<section id="conclusion">` imbriquée incorrectement dans `<section id="section-2">` (jamais fermée) — HTML invalide |
| PH-11 | 🟠 | [php/chapitre6.html](php/chapitre6.html) | Message **« Félicitations »** prématuré au chapitre 6 alors que les chapitres 7 et 8 existent |

### 4.3 Erreurs de navigation

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PH-12 | 🟠 | [php/chapitre2.html](php/chapitre2.html) | Indique « Chapitre 2/**6** » → devrait être « 2/**8** » |
| PH-13 | 🟠 | [php/chapitre3.html](php/chapitre3.html) | Indique « Chapitre 3/**6** » → devrait être « 3/**8** » |
| PH-14 | 🟠 | [php/chapitre4.html](php/chapitre4.html) | Indique « Chapitre 4/**6** » → devrait être « 4/**8** ». Le bouton « Suivant » pointe vers `index.html` au lieu de `chapitre5.html` |
| PH-15 | 🟡 | [php/index.html](php/index.html) | **Sections flashcard dupliquées** : `#fiches-revision` et `#revisions` avec deux conteneurs `#flashcardsPacks` |

### 4.4 Erreurs techniques PHP

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PH-16 | 🟠 | [php/chapitre3.html](php/chapitre3.html) | Affirme que `require` génère `E_COMPILE_ERROR` — FAUX. `require` génère `E_ERROR` (erreur fatale). `E_COMPILE_ERROR` vient du parseur PHP |
| PH-17 | 🟠 | [php/chapitre4.html](php/chapitre4.html) | Exemple `10 / 0` dans un `try/catch (Exception $e)` — en PHP 8, la division par zéro lance `DivisionByZeroError` (extends `Error`, pas `Exception`). Le catch ne l'attrapera pas |
| PH-18 | 🟡 | [php/assets/js/quiz-chapitre4.js](php/assets/js/quiz-chapitre4.js) | Q1 : « Classe de base de toutes les exceptions ? » → réponse marquée `Exception`, mais `Throwable` est la vraie interface de base depuis PHP 7 |
| PH-19 | 🟡 | [php/chapitre2.html](php/chapitre2.html) | Typo `calculerDroitAccee()` → devrait être `calculerDroitAcces()` |
| PH-20 | 🟡 | [php/assets/js/main.js](php/assets/js/main.js) | `toggleSolution()` utilise `event` global implicite (deprecated) — ne fonctionne pas en Firefox strict |

### 4.5 Contenu insuffisant

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PH-21 | 🔴 | [php/chapitre6.html](php/chapitre6.html) | Titre « Sessions, cookies et architecture » mais **zéro contenu sur les sessions ou cookies**. Pas de `$_SESSION`, `session_start()`, `$_COOKIE`, `setcookie()`. Seulement un bref aperçu MVC et un routeur trivial |
| PH-22 | 🟠 | [php/chapitre4.html](php/chapitre4.html) | **Contenu très mince** (~180 lignes). Manque : niveaux d'erreur, `set_error_handler()`, `ErrorException`, catch multiples PHP 8, hiérarchie `Error` vs `Exception` |
| PH-23 | 🟠 | [php/chapitre5.html](php/chapitre5.html) | **Contenu très mince** (~150 lignes). Manque : modes `fetch()`, placeholders nommés, `lastInsertId()`, transactions, `INSERT/UPDATE/DELETE` |
| PH-24 | 🟡 | [php/chapitre1.html](php/chapitre1.html) | Fonctionnalités PHP 8 absentes (arguments nommés, `match`, promotion constructeur, types union, `readonly`) malgré mention dans la timeline |
| PH-25 | 🟡 | [php/chapitre8.html](php/chapitre8.html) | Protection CSRF absente, pas de `exit;` après `header('Location:')` |

### 4.6 Erreurs de style

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PH-26 | 🟡 | [php/assets/css/features.css](php/assets/css/features.css) | `var(--border-radius-md)` utilisé mais **jamais défini** |
| PH-27 | 🟡 | [php/assets/css/style.css](php/assets/css/style.css) | Classes CSS utilisées mais non définies : `.note-box`, `.warning-box` (light mode), `.exercise-box` (light mode), `.info-success`, `.file-tree` |
| PH-28 | 🟡 | [php/assets/js/main.js](php/assets/js/main.js) | `background-color: white` **hardcodé** dans les notifications JS — ne s'adapte pas au dark mode |
| PH-29 | 🟡 | [php/chapitre1.html](php/chapitre1.html) | Prism CSS (`prism-tomorrow.min.css`) manquant dans le `<head>` — la coloration syntaxique n'a pas de thème |

### 4.7 Accessibilité

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| PH-30 | 🟡 | [php/index.html](php/index.html) | Pas de `<main>` landmark |
| PH-31 | 🟡 | Tous | Pas de skip-to-content link |
| PH-32 | 🟡 | Tous | Pas de `aria-label` sur les boutons de navigation, toggle thème, modal flashcard |
| PH-33 | 🟡 | Tous | Les flashcards ne sont pas accessibles au clavier (pas de `tabindex`, pas de handler Enter/Space) |

---

## 5. JAVA (rd_java)

### 5.1 Erreurs critiques

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| JV-1 | 🔴 | [rd_java/chapitres/formules.html](rd_java/chapitres/formules.html), [rd_java/chapitres/cartes.html](rd_java/chapitres/cartes.html), [rd_java/chapitres/simulateur-examen.html](rd_java/chapitres/simulateur-examen.html), [rd_java/exercices/exercices.html](rd_java/exercices/exercices.html) | **Navigation mobile et thème toggle CASSÉS** sur ces 4 pages — pas d'attributs `id` sur les boutons → `main.js` ne les trouve pas → le toggle thème ne fonctionne pas, le menu hamburger ne s'ouvre pas |
| JV-2 | 🔴 | [rd_java/assets/js/exercises.js](rd_java/assets/js/exercises.js) | `switchTab()` utilise `event` global implicite (deprecated) → **ne fonctionne pas sous Firefox** |
| JV-3 | 🔴 | [rd_java/assets/js/gamification.js](rd_java/assets/js/gamification.js) ↔ [rd_java/assets/js/exercises.js](rd_java/assets/js/exercises.js) | **Gamification complètement déconnectée des exercices** : `exerciseCompleted()` existe dans gamification.js mais n'est **jamais appelée** depuis exercises.js. Aucun XP ni badge n'est attribué pour les exercices |

### 5.2 Fonctionnalités mortes

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| JV-4 | 🟠 | [rd_java/assets/js/download.js](rd_java/assets/js/download.js) | **Code mort** — attend des attributs `data-download` mais aucun élément HTML ne les a. Aucun bouton de téléchargement visible |
| JV-5 | 🟠 | [rd_java/chapitres/simulateur-examen.html](rd_java/chapitres/simulateur-examen.html) | Badge `certified` **jamais débloqué** — le code appelle `addXP(100)` mais pas `unlockBadge('certified')` |
| JV-6 | 🟠 | Tous les fichiers HTML | Lien vers `exercices/exercices.html` **absent de la navigation desktop** — les 12 TPs sont introuvables sans connaître l'URL |

### 5.3 Incohérences de navigation

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| JV-7 | 🟠 | [rd_java/chapitres/chapitre3.html](rd_java/chapitres/chapitre3.html) à [rd_java/chapitres/chapitre10.html](rd_java/chapitres/chapitre10.html) | Menu mobile incomplet : ne contient pas les liens vers Formules, Flashcards, Simulateur. Labels abrégés |
| JV-8 | 🟡 | [rd_java/chapitres/chapitre1.html](rd_java/chapitres/chapitre1.html) | `tailwind.config` orphelin — le CDN Tailwind n'est pas chargé sur cette page |

### 5.4 Erreurs de style

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| JV-9 | 🟠 | [rd_java/assets/css/style.css](rd_java/assets/css/style.css) | Classes CSS **non définies** : `.exercise-submit-btn`, `.exercise-tab`, `.mascot-bubble`, `.badge-toast` — les bulles de la mascotte et notifications de badge apparaissent sans mise en forme |
| JV-10 | 🟡 | [rd_java/chapitres/formules.html](rd_java/chapitres/formules.html) | `.reading-progress` a une **classe** mais pas d'`id` → `main.js` sélectionne par `#reading-progress` → la barre ne se met jamais à jour |
| JV-11 | 🟡 | 4 pages vs 11 pages | Mélange Tailwind CDN (formules, cartes, simulateur, exercices) et CSS custom seul (index, chapitres) — deux systèmes de design coexistent |

### 5.5 Contenu pédagogique

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| JV-12 | 🟡 | [rd_java/chapitres/chapitre2.html](rd_java/chapitres/chapitre2.html) | `boolean` décrit comme « 1 bit » — imprécis. La JVM utilise typiquement 1 byte ou 4 bytes |
| JV-13 | 🟡 | [rd_java/exercices/exercices.html](rd_java/exercices/exercices.html) | TP11 : l'énoncé demande un histogramme mais la correction n'en contient aucun |
| JV-14 | 🟡 | [rd_java/assets/js/exercises.js](rd_java/assets/js/exercises.js) | Évaluation des réponses guidées trop stricte pour du code Java (comparaison exacte) |

### 5.6 Accessibilité et divers

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| JV-15 | 🟡 | [rd_java/chapitres/chapitre3.html](rd_java/chapitres/chapitre3.html) à chapitre10.html | `aria-label` manquant sur les boutons theme toggle et hamburger |
| JV-16 | 🟢 | Tous | Pas de `<meta name="description">` ni d'Open Graph |
| JV-17 | 🟢 | — | Pas de `robots.txt`, `sitemap.xml`, ni `404.html` |
| JV-18 | 🟡 | [rd_java/assets/js/main.js](rd_java/assets/js/main.js), [rd_java/assets/js/gamification.js](rd_java/assets/js/gamification.js) | Accès `localStorage` sans `try-catch` — crash en navigation privée ou stockage saturé |

---

## 6. WINDOWS SERVER (rd_winserver)

### 6.1 Gamification cassée

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| WS-1 | 🔴 | [rd_winserver/assets/js/gamification.js](rd_winserver/assets/js/gamification.js) | **10 des 17 badges ne peuvent jamais être débloqués** : les badges chapitres (`ad_master`, `gpo_guru`, `network_pro`, `backup_hero`, `ha_expert`, `maintainer`, `vm_wizard`), de progression (`half_way`, `almost_done`), d'examen (`certified`) et de légende (`legend`) n'ont aucun chemin de code pour être déclenchés |
| WS-2 | 🟠 | [rd_winserver/assets/js/exercises.js](rd_winserver/assets/js/exercises.js) | Les exercices guidés et drag-drop appellent `addXP()` mais **pas** `exerciseCompleted()` — ils ne comptent pas pour les badges d'exercices |

### 6.2 Fonctionnalités mortes

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| WS-3 | 🟠 | [rd_winserver/assets/js/download.js](rd_winserver/assets/js/download.js) | **Code mort** — aucun élément `data-download` dans le HTML. Fonctionnalité de téléchargement inexistante |
| WS-4 | 🟠 | [rd_winserver/exercices/exercices.html](rd_winserver/exercices/exercices.html) | **Page orpheline** — les 12 TPs pratiques existent mais aucun lien de navigation ne pointe vers cette page. Introuvable pour les utilisateurs |
| WS-5 | 🟠 | [rd_winserver/chapitres/simulateur-examen.html](rd_winserver/chapitres/simulateur-examen.html) | Badge `certified` pas déclenché à la réussite de l'examen (appelle seulement `addXP(100)`) |

### 6.3 Erreurs techniques

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| WS-6 | 🟠 | [rd_winserver/chapitres/formules.html](rd_winserver/chapitres/formules.html) | Commandes PowerShell pipées incorrectement : `Get-ADDomain \| Get-ADForest \| Get-ADDomainController` — ce sont des cmdlets indépendants, pas pipeable. Idem `repadmin /replsummary \| dcdiag /v` et `dcdiag /v \| repadmin /replsummary \| Get-WBSummary` |
| WS-7 | 🟠 | [rd_winserver/chapitres/simulateur-examen.html](rd_winserver/chapitres/simulateur-examen.html) vs [rd_winserver/assets/js/exercises.js](rd_winserver/assets/js/exercises.js) | Contradiction : l'examen dit la RAM minimum WS2022 est « 512 Mo » alors que le quiz du chapitre 1 attend « 2 Go ». Deux réponses différentes à la même question |
| WS-8 | 🟡 | [rd_winserver/chapitres/chapitre4.html](rd_winserver/chapitres/chapitre4.html) | Description hero logiquement inversée : « Pourquoi quand je tape 142.250.179.78 ça ne marche pas ? » — taper une IP marche toujours. La question devrait illustrer pourquoi on utilise les noms de domaine |
| WS-9 | 🟡 | [rd_winserver/assets/js/main.js](rd_winserver/assets/js/main.js) | `ActiveNavLink` utilise `path.includes(href)` → correspondances multiples fausses (plusieurs liens marqués « active ») |
| WS-10 | 🟡 | [rd_winserver/chapitres/simulateur-examen.html](rd_winserver/chapitres/simulateur-examen.html) | Questions « cmdlet pour vérifier les FSMO ? » → réponse `netdom query fsmo` n'est **pas un cmdlet** mais un utilitaire legacy. La question utilise le mot « cmdlet » de façon trompeuse |

### 6.4 Navigation incomplète

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| WS-11 | 🟡 | [rd_winserver/chapitres/formules.html](rd_winserver/chapitres/formules.html), [rd_winserver/chapitres/cartes.html](rd_winserver/chapitres/cartes.html), [rd_winserver/chapitres/simulateur-examen.html](rd_winserver/chapitres/simulateur-examen.html) | Nav mobile incomplète — n'inclut pas les liens vers Flashcards et Examen |

### 6.5 Style et accessibilité

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| WS-12 | 🟡 | Tous les fichiers HTML | Usage excessif de `style="..."` inline au lieu de classes CSS |
| WS-13 | 🟡 | [rd_winserver/chapitres/cartes.html](rd_winserver/chapitres/cartes.html) | Flashcards non accessibles au clavier (pas de `tabindex`, pas de handler clavier) |
| WS-14 | 🟡 | Chapitres 1-8 + utilitaires | `aria-expanded` manquant sur le bouton hamburger (présent seulement sur index.html) |
| WS-15 | 🟢 | Tous | Pas de `<meta name="description">` hors index.html |

---

## 7. RECHERCHE OPÉRATIONNELLE (RD-RO)

### 7.1 Erreurs critiques

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| RO-1 | 🔴 | [RD-RO/chapitres/chapitre6.html](RD-RO/chapitres/chapitre6.html), [RD-RO/chapitres/chapitre7.html](RD-RO/chapitres/chapitre7.html) | **Exercices détruits** : un script inline efface `#interactive-exercise` et le remplace par un simulateur. Les exercices de exercises.js (5 guidés + 10 quiz + 3 drag-drop par chapitre) sont **invisibles** |
| RO-2 | 🔴 | — | **Pas de `cartes.html`** (flashcards) — la page n'existe pas du tout |
| RO-3 | 🔴 | [RD-RO/chapitres/simulateur-examen.html](RD-RO/chapitres/simulateur-examen.html) | Seulement **9 questions** d'examen (requis 50+). Le code duplique les questions pour atteindre le nombre demandé → l'étudiant voit les mêmes questions en boucle |
| RO-4 | 🔴 | Tous les chapitres | **Thème toggle cassé** : `<html class="dark">` n'est jamais modifié par main.js (qui toggle `data-theme`). Les classes Tailwind `dark:` restent actives en mode « clair » → apparence mi-sombre mi-claire |

### 7.2 Erreurs techniques RO

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| RO-5 | 🟠 | [RD-RO/assets/js/exercises.js](RD-RO/assets/js/exercises.js) | Quiz Ch.6 Q7 : « On peut résoudre graphiquement avec 3 variables ? » → réponse « Oui ». **CONTRADICTION** avec le cours chapitre6.html qui dit explicitement « cette méthode ne marche que pour 2 variables » |
| RO-6 | 🟠 | [RD-RO/assets/js/exercises.js](RD-RO/assets/js/exercises.js) + [RD-RO/assets/js/simulators.js](RD-RO/assets/js/simulators.js) + [RD-RO/chapitres/chapitre7.html](RD-RO/chapitres/chapitre7.html) | **Incohérence de convention Simplexe** : le quiz parle de coefficient « le plus grand/positif », le solveur cherche le « plus négatif », le cours dit « -50 est plus fort que -30 ». Les étudiants seront perdus |
| RO-7 | 🟠 | [RD-RO/chapitres/simulateur-examen.html](RD-RO/chapitres/simulateur-examen.html) | Q4 sur la variable entrante : l'explication dit « positif ou négatif selon convention » — contradictoire avec le reste du cours |
| RO-8 | 🟠 | [RD-RO/assets/js/exercises.js](RD-RO/assets/js/exercises.js) | Drag-drop Ch.4 : exercice sur variables artificielles (`= → + a`, `>= → - e + a`) mais **le chapitre ne les enseigne jamais** (Big-M et Two-Phase non couverts) |

### 7.3 Fonctionnalités cassées

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| RO-9 | 🟠 | [RD-RO/assets/js/download.js](RD-RO/assets/js/download.js) | Scope « Cours Complet » : le code compare `scope === 'course'` mais le HTML envoie `value="cours"` → mismatch → filtrage fonctionnel cassé |
| RO-10 | 🟠 | [RD-RO/chapitres/simulateur-examen.html](RD-RO/chapitres/simulateur-examen.html) | Bouton submit : `style="background: linear-gradient 135deg #f59e0b #d97706;"` → **syntaxe CSS invalide** (parenthèses et virgules manquantes) → bouton sans fond |
| RO-11 | 🟡 | [RD-RO/assets/js/exercises.js](RD-RO/assets/js/exercises.js) | Validation QA par `includes()` → `"non-linéaire"` valide `"linéaire"` |
| RO-12 | 🟡 | [RD-RO/chapitres/simulateur-examen.html](RD-RO/chapitres/simulateur-examen.html) | Pas de navigation mobile, pas de toggle thème, pas de barre de lecture |
| RO-13 | 🟡 | [RD-RO/assets/js/simulators.js](RD-RO/assets/js/simulators.js) | Résolution graphique limitée à exactement 2 contraintes, opérateur de contrainte (`<=`, `>=`) ignoré |

### 7.4 Contenu pédagogique insuffisant

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| RO-14 | 🔴 | [RD-RO/chapitres/chapitre7.html](RD-RO/chapitres/chapitre7.html) | **Pas d'exemple Simplexe complet** : montre seulement le tableau initial et la 1ère itération. Jamais le calcul du pivot, la 2ème itération, ni la lecture de la solution optimale |
| RO-15 | 🟠 | [RD-RO/chapitres/chapitre4.html](RD-RO/chapitres/chapitre4.html) | **Big-M / Two-Phase jamais enseignés** : seules les variables d'écart pour `≤` sont couvertes. Les exercices testent les variables artificielles sur des concepts non expliqués |
| RO-16 | 🟠 | [RD-RO/chapitres/chapitre8.html](RD-RO/chapitres/chapitre8.html) | Dualité très superficielle : pas de construction formelle du dual (transposée de A, inversion b↔c), pas de complémentarité des écarts, pas d'analyse de sensibilité |
| RO-17 | 🟡 | [RD-RO/chapitres/formules.html](RD-RO/chapitres/formules.html) | Section Dualité **entièrement commentée** en HTML (`<!-- -->`) — invisible pour les étudiants |
| RO-18 | 🟡 | [RD-RO/chapitres/chapitre5.html](RD-RO/chapitres/chapitre5.html) | La dégénérescence est testée en quiz et exercices guidés mais **jamais expliquée** dans le contenu du cours |
| RO-19 | 🟡 | [RD-RO/index.html](RD-RO/index.html) | Module 3 annoncé « La méthodologie en 6 étapes » mais le chapitre montre 3 étapes + un exemple |
| RO-20 | 🟡 | [RD-RO/exercices/exercices.html](RD-RO/exercices/exercices.html) | Les 10 exercices sont tous de la modélisation — aucun exercice de résolution (Simplexe, graphique, dualité) |
| RO-21 | 🟢 | — | Aucun contenu sur la théorie des graphes / optimisation de réseau (sujet RO standard) |

### 7.5 Style

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| RO-22 | 🟡 | [RD-RO/chapitres/simulateur-examen.html](RD-RO/chapitres/simulateur-examen.html) | Définit son propre système CSS complet (`:root` avec variables différentes) — incohérent avec le reste du site |
| RO-23 | 🟡 | [RD-RO/chapitres/formules.html](RD-RO/chapitres/formules.html) | Utilise `var(--surface)` non défini. Navbar style différent des chapitres (`.glass-card` au lieu de `.glass-nav`) |
| RO-24 | 🟢 | Tous | Footer `© 2025` (périmé) |

---

## 8. SQL

### 8.1 Erreurs critiques

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| SQ-1 | 🔴 | [sql/assets/js/main.js](sql/assets/js/main.js) vs tous les modules | **Clé localStorage du thème incohérente** : main.js utilise `rd-sql-theme` (tirets), les modules utilisent `rd_sql_theme` (underscores). Le thème ne se propage pas entre les pages |
| SQ-2 | 🔴 | [sql/modules/formules.html](sql/modules/formules.html) | **Liens de déverrouillage cassés** : le JS génère des URLs `mod01.html`, `mod02.html` mais les fichiers réels s'appellent `mod01-ddl.html`, `mod02-constraints.html`, etc. → tous les liens mènent à des **404** |
| SQ-3 | 🔴 | — | **Aucun module sur les JOINs / Jointures** — le concept SQL le plus fondamental après SELECT est complètement absent. Le cheat sheet, les exercices et le message de félicitations font référence aux jointures mais aucun module ne les enseigne |

### 8.2 Quiz biaisés

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| SQ-4 | 🔴 | [sql/modules/mod09-loops.html](sql/modules/mod09-loops.html) | Les **10 réponses** du quiz sont à l'index 1 — 100% de réussite en choisissant toujours la 2ème option |
| SQ-5 | 🔴 | [sql/modules/mod11-procedures.html](sql/modules/mod11-procedures.html) | Les **10 réponses** du quiz sont à l'index 1 — identique |
| SQ-6 | 🔴 | [sql/modules/mod12-triggers.html](sql/modules/mod12-triggers.html) | Les **10 réponses** du quiz sont à l'index 1 — identique |
| SQ-7 | 🟠 | [sql/modules/mod08-logic.html](sql/modules/mod08-logic.html) | **9/10 réponses** du quiz sont à l'index 1 |
| SQ-8 | 🟠 | [sql/modules/mod10-transactions.html](sql/modules/mod10-transactions.html) | **9/10 réponses** du quiz sont à l'index 1 |

### 8.3 Erreurs techniques SQL

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| SQ-9 | 🟠 | [sql/modules/mod05-calculations.html](sql/modules/mod05-calculations.html) | Quiz Q2 : « Peut-on utiliser WHERE avec SUM() ? » → réponse « Non, il faut HAVING » est **FAUX**. On peut utiliser WHERE dans une requête avec SUM() — WHERE filtre avant l'agrégation. Ce qu'on ne peut pas, c'est mettre SUM() **dans** WHERE |
| SQ-10 | 🟠 | [sql/exercices/exercices.html](sql/exercices/exercices.html) | Exercice 13 (Pagination) attend `LIMIT 10 OFFSET 10` — **syntaxe MySQL**, pas SQL Server/T-SQL (`OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY`) |
| SQ-11 | 🟡 | [sql/modules/mod12-triggers.html](sql/modules/mod12-triggers.html) | Message de félicitations cite « les jointures » comme compétence acquise — aucun module ne les enseigne |

### 8.4 Fonctionnalités cassées

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| SQ-12 | 🟠 | [sql/assets/js/download.js](sql/assets/js/download.js) | **Code mort** — jamais chargé par aucune page HTML |
| SQ-13 | 🟠 | [sql/modules/mod01-ddl.html](sql/modules/mod01-ddl.html) | `copyCode()` appelé par `onclick` mais **jamais défini** → `ReferenceError` en console |
| SQ-14 | 🟠 | [sql/modules/mod08-logic.html](sql/modules/mod08-logic.html) | `runQuery()` instancie `new MockSQLEngine()` vide au lieu d'utiliser `executeSQL()` → requêtes échouent car pas de tables |
| SQ-15 | 🟡 | [sql/modules/formules.html](sql/modules/formules.html) | `data-module="5"` dupliqué sur deux sections différentes |
| SQ-16 | 🟡 | Modules 02, 07, 08, 09, 10, 11, 12 | `bot.speak("msg", 4000)` passe un nombre au lieu d'une émotion (string) → l'icône du bot ne change pas |
| SQ-17 | 🟡 | [sql/assets/js/sql-engine.js](sql/assets/js/sql-engine.js) | Utilise `eval()` pour évaluer les clauses WHERE — mauvaise pratique (injection de code JS possible) |

### 8.5 Éléments manquants

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| SQ-18 | 🟠 | Modules 07-12 | **Aucun exercice guidé** sur les modules 7 à 12 (30 exercices manquants) — seuls 01-06 en ont |
| SQ-19 | 🟠 | [sql/simulateur-examen.html](sql/simulateur-examen.html) | Seulement **40 questions**, aucune sur les modules 6 (Chaînes), 7 (Dates/Nulls), 9 (Boucles), 11 (Procédures), 12 (Triggers). 6 modules sur 12 absents de l'examen |
| SQ-20 | 🟡 | — | Pas de module sur les **sous-requêtes** (sous-requêtes corrélées, EXISTS, IN) |

### 8.6 Incohérences de style

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| SQ-21 | 🟡 | Modules 01-06 vs 07-12 | Interface d'exercices **complètement différente** : onglets (Quiz/Exercices/Drag-Drop) dans 01-06 vs sections séparées dans 07-12. L'UX change en plein parcours |
| SQ-22 | 🟢 | [sql/modules/mod06-strings.html](sql/modules/mod06-strings.html) | Typo dans le drag-drop : label `'Milieur'` → devrait être `'Milieu'` |

---

## 9. COURS WINDOWS (fichiers texte)

### 9.1 Erreurs factuelles

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| CW-1 | 🔴 | [cours windows/3.Haute-disponibilité-et-reprise-après-sinistre-en-environnement.txt](cours%20windows/3.Haute-disponibilit%C3%A9-et-reprise-apr%C3%A8s-sinistre-en-environnement.txt) | **Table de disponibilité FAUSSE** : indique 99,99% → 4,38 heures/an. La vraie valeur est **52,6 minutes/an**. Le palier 99,9% (8,77h/an) est totalement absent |
| CW-2 | 🟠 | [cours windows/2.la-Sauvegarde-des-données.txt](cours%20windows/2.la-Sauvegarde-des-donn%C3%A9es.txt) | Confusion backup/restore : dit « effectuer une **sauvegarde** complète » au lieu de « **restauration** complète » dans la section différentielle |
| CW-3 | 🟠 | [cours windows/2.la-Sauvegarde-des-données.txt](cours%20windows/2.la-Sauvegarde-des-donn%C3%A9es.txt) | « DESEASTER RECOVERY » → **DISASTER RECOVERY** (titre en anglais erroné) |
| CW-4 | 🟠 | [cours windows/3.Haute-disponibilité-et-reprise-après-sinistre-en-environnement.txt](cours%20windows/3.Haute-disponibilit%C3%A9-et-reprise-apr%C3%A8s-sinistre-en-environnement.txt) | Le titre promet « reprise après sinistre » mais le document **ne couvre jamais le DR** — seulement HA et clustering |

### 9.2 Contenu insuffisant (les 3 fichiers)

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| CW-5 | 🟠 | Tous les .txt | **Aucune commande Windows Server spécifique** : pas de `wbadmin`, Windows Server Backup, PowerShell, Azure Backup, Storage Replica |
| CW-6 | 🟠 | [cours windows/2.la-Sauvegarde-des-données.txt](cours%20windows/2.la-Sauvegarde-des-donn%C3%A9es.txt) | RPO et RTO (concepts fondamentaux backup/DR) **totalement absents** |
| CW-7 | 🟠 | [cours windows/3.Haute-disponibilité-et-reprise-après-sinistre-en-environnement.txt](cours%20windows/3.Haute-disponibilit%C3%A9-et-reprise-apr%C3%A8s-sinistre-en-environnement.txt) | Mentionne Proxmox et VMware mais **jamais Hyper-V** (l'hyperviseur Microsoft) |
| CW-8 | 🟠 | [cours windows/3.Haute-disponibilité-et-reprise-après-sinistre-en-environnement.txt](cours%20windows/3.Haute-disponibilit%C3%A9-et-reprise-apr%C3%A8s-sinistre-en-environnement.txt) | Pas de mention de Windows Failover Clustering (WSFC), Hyper-V Replica, Storage Spaces Direct (S2D), quorum |
| CW-9 | 🟠 | [cours windows/MAINTENANCE-DE-WINDOWS-SERVER.txt](cours%20windows/MAINTENANCE-DE-WINDOWS-SERVER.txt) | **Document tronqué** — finit abruptement après une liste de versions sans détailler les procédures de migration |
| CW-10 | 🟠 | [cours windows/MAINTENANCE-DE-WINDOWS-SERVER.txt](cours%20windows/MAINTENANCE-DE-WINDOWS-SERVER.txt) | Manque WSUS, Windows Admin Center, maintenance AD DS (`ntdsutil`, `dcdiag`, `repadmin`), DISM, `sfc /scannow` |

### 9.3 Formatage

| # | Sév. | Fichier | Problème |
|---|:---:|---|---|
| CW-11 | 🟡 | Tous les .txt | Extraits de PowerPoint avec whitespace excessif, pas de hiérarchie numérotée, tableaux mal alignés |
| CW-12 | 🟡 | [cours windows/3.Haute-disponibilité-et-reprise-après-sinistre-en-environnement.txt](cours%20windows/3.Haute-disponibilit%C3%A9-et-reprise-apr%C3%A8s-sinistre-en-environnement.txt) | « BOUKLINAM ABALO » (attribution auteur) apparaît **12 fois** dans le document |
| CW-13 | 🟡 | [cours windows/2.la-Sauvegarde-des-données.txt](cours%20windows/2.la-Sauvegarde-des-donn%C3%A9es.txt) | Le plan annonce 4 sections (I-IV) mais les sections I et IV ne sont jamais développées |

---

## 10. PROBLÈMES TRANSVERSAUX

Ces problèmes affectent **plusieurs ou tous les projets** simultanément.

### 10.1 Gamification système

| # | Sév. | Projets | Problème |
|---|:---:|---|---|
| TR-1 | 🔴 | Linux, Java, WinServer, RO | `download.js` est chargé mais **aucun bouton `data-download`** n'existe dans le HTML → fonctionnalité de téléchargement morte sur 4 projets |
| TR-2 | 🔴 | Linux, Java, WinServer | La gamification (XP/badges) est **déconnectée** des exercices interactifs — les badges liés aux exercices sont impossibles à obtenir |
| TR-3 | 🟠 | Probabilités, PHP | Gamification absente ou rudimentaire (pas de mascotte, pas d'XP, pas de badges structurés) |

### 10.2 Cohérence inter-projets

| # | Sév. | Projets | Problème |
|---|:---:|---|---|
| TR-4 | 🟡 | Tous | Copyright `© 2025` — devrait être 2026 |
| TR-5 | 🟡 | Tous | Pas de `robots.txt`, `sitemap.xml`, `404.html` (sauf Probabilités qui les a avec des URLs placeholder) |
| TR-6 | 🟡 | Probas, Linux, RO, SQL | Validation QA par `includes()` (sous-chaîne) → faux positifs : taper un mot partiel valide la réponse |
| TR-7 | 🟡 | Probas, Java, SQL | Mélange incohérent de Tailwind CDN et CSS custom entre les pages d'un même projet |
| TR-8 | 🟡 | Linux, Java, RO, WinServer | `darkMode: 'class'` dans Tailwind config mais le thème est basculé via `data-theme` (attribut) → conflit de convention |

### 10.3 Accessibilité (tous projets)

| # | Sév. | Projets | Problème |
|---|:---:|---|---|
| TR-9 | 🟡 | Tous | Skip-to-content links manquants ou inconsistants |
| TR-10 | 🟡 | Tous | `aria-label` absent ou inconsistant sur les boutons interactifs (theme toggle, hamburger, flashcard flip) |
| TR-11 | 🟡 | Linux, Java, WinServer, RO | Flashcards non accessibles au clavier (pas de `tabindex`, pas de handler Enter/Space sur les div onclick) |

### 10.4 Contenu global

| # | Sév. | Projets | Problème |
|---|:---:|---|---|
| TR-12 | 🟠 | Probas, RO, PHP, SQL | Plusieurs projets ont des chapitres au contenu **très mince** comparé aux exigences du cahier des charges (minimum 3 sections, 2 info-box, 1 warning-box par chapitre) |
| TR-13 | 🟡 | Tous | Aucune page utilitaire n'accorde d'XP pour la révision (flashcards, cheat sheet) — la gamification ne récompense pas l'utilisation de ces outils |

---

## SYNTHÈSE QUANTITATIVE

| Projet | 🔴 Critique | 🟠 Majeur | 🟡 Modéré | 🟢 Mineur | Total |
|--------|:-----------:|:---------:|:---------:|:---------:|:-----:|
| Portail | 0 | 0 | 3 | 3 | **6** |
| Probabilités | 3 | 7 | 14 | 6 | **30** |
| Linux | 4 | 4 | 7 | 3 | **18** |
| PHP POO | 4 | 11 | 14 | 4 | **33** |
| Java | 3 | 4 | 7 | 4 | **18** |
| WinServer | 1 | 5 | 6 | 3 | **15** |
| RD-RO | 5 | 8 | 9 | 2 | **24** |
| SQL | 6 | 6 | 6 | 4 | **22** |
| Cours Windows | 1 | 7 | 4 | 0 | **12** |
| Transversal | 3 | 3 | 7 | 0 | **13** |
| **TOTAL** | **30** | **55** | **77** | **29** | **191** |

---

## TOP 10 DES CORRECTIONS PRIORITAIRES

1. **🔴 SQL** : Quiz mod09/11/12 avec toutes les réponses au même index (SQ-4, SQ-5, SQ-6)
2. **🔴 PHP** : HTML corrompu dans chapitre4 + chapitre6 sans contenu sessions/cookies (PH-9, PH-21)
3. **🔴 RD-RO** : Exercices chapitres 6-7 détruits par le simulateur + seulement 9 questions d'examen (RO-1, RO-3)
4. **🔴 Linux** : Variables CSS `--glass-bg`/`--glass-border` manquantes → 3 pages visuellement cassées (LX-1)
5. **🔴 Probabilités** : `renderInterface()` manquante → crash JS + discordance numérotation chapitres (PR-6, PR-14)
6. **🔴 Java** : Nav mobile + thème cassés sur 4 pages + gamification déconnectée (JV-1, JV-3)
7. **🔴 SQL** : Liens 404 dans formules.html + pas de module Jointures (SQ-2, SQ-3)
8. **🔴 WinServer** : 10/17 badges impossibles (WS-1)
9. **🔴 Cours Windows** : Table de disponibilité 99,99% factuellement fausse (CW-1)
10. **🟠 Tous** : `download.js` mort sur 4 projets (TR-1)
