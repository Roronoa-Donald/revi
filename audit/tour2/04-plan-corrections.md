# 04 — Plan de Corrections par Lots (`04-plan-corrections.md` — Mission D)

> **Règle d'engagement impérative** : **Aucune modification n'a été exécutée sur `main`, `cours-html`, `cours-pdf` ni sur les fichiers de contenu.** Chaque lot ci-dessous attend votre instruction explicite **`GO LOT n`**.

## Règles Communes à Toute Correction Future (Applicables aux Lots 0 à 3)
1. **Ordre d'intervention** : **S0 → S1** (puis S2) ; **un commit atomique par générateur ou par cours** avec message de commit normalisé (`fix(<cible>): <description concise S0/S1>`).
2. **Correction à la source (Règle 7)** : Toute page générée se corrige dans son fichier source (`scripts/course-kit.js`, `scripts/generate-code-labs.js`, `scripts/build-index-html.js`, `server/content/<cours>.js`, `server/exercises/<cours>.js`), puis est régénérée via `node scripts/generate-courses.js` et `node scripts/generate-code-labs.js`. Seuls les 4 cours statiques sans fichier `server/content/` (`b1-algo`, `b1-c-cpp`, `b1-php`, `b1-python`) se corrigent directement dans leurs HTML.
3. **Préservation pédagogique et technique** : Garder le ton et le style ; ajouter la définition manquante ou l'encadré « À retenir pour l'instant » (ou renvoi explicite « voir chapitre X ») plutôt que supprimer une notion au programme ; **ne jamais casser** les ancres et `id`, les tests cachés (`server/exercises/`), le suivi de progression (`data-chapter`, `data-exercise`, `data-mark-done`) ni les liens du sommaire.
4. **Protocole de validation après chaque lot** :
   - Exécuter `npm run courses:check`, `npm run labs:check`, `npm test` et `python3 audit/tour2/scripts/avant_apres.py` ;
   - Produire le tableau comparatif **Avant / Après** des 18 compteurs de la Mission B ;
   - Critère de « chapitre corrigé » : **0 constat S0/S1** au script ET à la relecture « novice » de la Phase 3, avec **zéro régression**.

---

## Lot 0 — Préparation & Mesures de Référence (Aucun Changement de Contenu)

### 1. Branche dédiée
- Création de la branche `audit-corrections` à partir de `main` (`git checkout -b audit-corrections`). Aucun commit direct sur `main`.

### 2. Mesures de référence actuelles (Baseline vérifiée)
- `npm run courses:check` (`node scripts/generate-courses.js --check`) : **`[ok] cours à jour (832 pages, 64 cours)`**
- `npm run labs:check` (`node scripts/generate-code-labs.js --check`) : **`[ok] ateliers à jour (1250 exercices, 68 cours)`**
- Nombre total de fichiers HTML par niveau : **931 fichiers HTML de cours** (`205` en B1, `427` en B2, `299` en B3) + **`1` `index.html` portail** = **932 fichiers HTML**.
- **Empreintes SHA-256 de référence des gabarits et moteurs** :
  - `scripts/course-kit.js` : `05f7e9d981983d6b0d70174d1a58dd6cbe82cdf076c4040a73b20efa6db30378`
  - `scripts/generate-code-labs.js` : `20a9d1fc7adaf4b59b3cc44f79bce85005846f57b10d25ba60c47ac05cb0a284`
  - `scripts/templates/cours.js` : `40279fcc3751fb66fb72a53e36023635b2248636ba53c9008e117ce98a04ad43`
  - `server/services/ai-help.js` : `8f311ae23d325edf2cd3121592269ed0795c81336e3b8b996714a6ed1dc805c4`
  - `server/services/execution/local-runner.js` : `8e8a2486b1b33e8c04be568b3be5c2ce9507396dd29312fcacb0319766f2fbd8`
  - `index.html` : `5d489d986a6276267c680ce5b1bfdbd78d715d5aa5bec24605f834230f87df41`

### 3. Script « avant/après » (`audit/tour2/scripts/avant_apres.py`)
Le script `audit/tour2/scripts/avant_apres.py` est prêt et relance automatiquement les 13 scripts de la Mission B :

| Compteur de contrôle (`avant_apres.py`) | Valeur Avant Lot 1 | Cible Après Lot 1 |
| :--- | :---: | :---: |
| `B0a` — Lignes HTML avec virgules parasites (`</tag>,<tag>`) | **68** | **0** |
| `B0b` — Pages `.bands` sans signe `%` | **153** | **0** |
| `B1a` — Chapitres avec trou `90–94 %` | **253** (+ 30 sim.) | **0** |
| `B1b` — Chapitres avec trou `4/8` | **30** | **0** |
| `B1c` — Chapitres sans seuil chiffré | **84** | **0** |
| `B2` — Blocs `<details class="lab__hints">` incohérents (`Deux indices` $\ne 2$) | **183** (`214` sur `main`) | **0** |
| `B4b` — Liens 404 barre de navigation (`NAV_B3_B2_754`) | **723** | **0** |
| `B4c` — Liens 404 `chapitres/exercices.html` B3 (`EXERCICES_B3_396`) | **333** | **0** |
| `B9a` — Chapitres où le titre « 8 notions » contredit le nombre d'items | **158** | **0** |
| `B10` — Pages d'examen avec corrigé `.box--solution` affiché en clair | **30** (23 B3 + 7 B2) | **0** |
| `B11` — Cartes B2 placées avant B1 en tête de `#grid` dans `index.html` | **24** | **0** |

---

## Lot 1 — Générateurs et Gabarits Partagés (Un Correctif Source, Centaines de Pages)

### Item 1.1 — Virgules parasites causées par `Array.prototype.toString()` dans `kit.box()` (`B0a` : 68 lignes en B3)
- **Fichier source exact** : `scripts/course-kit.js:L203-L208`
- **Changement proposé (diff)** :
  ```diff
  @@ -203,6 +203,7 @@
     return [
       '  <div class="box box--' + kind + '">',
       '    <div class="box__title">' + ic(iconName) + ' ' + title + '</div>',
  -    inner,
  +    Array.isArray(inner) ? inner.join('\n') : inner,
       '  </div>'
     ].join('\n');
   }
  ```
- **Pages impactées** : **55 chapitres B3** (`b3-pfsense`, `b3-firewall`, `b3-linux`, `b3-sql`, `b3-reseau-lan`, `b3-github`, `b3-agile`, `b3-veille`, `b3-windows-server`, `b3-cloud-azure`, `b3-cryptographie`, `b3-hacking`) après `node scripts/generate-courses.js`.
- **Risque** : Nul (rétrocompatible avec les chaînes `string` et aplatit proprement les tableaux de lignes HTML).
- **Test de non-régression** : `python3 audit/tour2/scripts/b0_virgules_et_seuils_b3.py` → `0` ligne avec `</tag>,<tag>`.

### Item 1.2 — Seuils du test de maîtrise (`B1` : 253 chapitres + 30 simulateurs avec trou `90–94 %`, 30 avec trou `4/8`, 84 sans `%`)
- **Fichiers sources exacts** :
  1. `scripts/course-kit.js:L238-L248` (`bands(rows)`) pour les **64 cours générés** ;
  2. Les fichiers HTML des **4 cours statiques** (`b1-algo/chapitres/chapitre1..10.html` + `simulateur-examen.html`, `b1-c-cpp/chapitres/chapitre1..8.html` + `simulateur-examen.html`, `b1-php/chapitres/chapitre1..8.html` + `simulateur-examen.html`, `b1-python/chapitres/chapitre1..6.html` + `simulateur-examen.html`).
- **Changement proposé (diff dans `scripts/course-kit.js:L238-L248`)** :
  ```diff
  @@ -238,10 +238,24 @@
   function bands(rows) {
     if (!rows || !Array.isArray(rows)) return '';
  +  const DEFAULT_PREFIXES_3 = ['< 50 % — ', '50–89 % — ', '≥ 90 % — '];
  +  const DEFAULT_PREFIXES_5 = ['< 50 % — ', '50–69 % — ', '70–79 % — ', '80–94 % — ', '≥ 95 % — '];
     return '<div class="bands">\n' + rows
  -    .map(row => {
  +    .map((row, idx) => {
         const cls = row.cls ? ' bandrow--' + row.cls : '';
  -      const text = row.text || (row.title ? '<strong>' + row.title + ' :</strong> ' + (row.desc || '') : '') || row;
  +      let text = row.text || (row.title ? '<strong>' + row.title + ' :</strong> ' + (row.desc || '') : '') || String(row);
  +      text = text.replace(/70[–-]89\s*%\s*—/, '70–94 % —')
  +                 .replace(/Entre 5\/8 et 7\/8\s*—/, 'De 4/8 à 7/8 —');
  +      if (!/%|\/8/.test(text)) {
  +        const pref = rows.length === 3 ? DEFAULT_PREFIXES_3[idx] : (rows.length === 5 ? DEFAULT_PREFIXES_5[idx] : '');
  +        if (pref) text = '<strong>' + pref + '</strong>' + text;
  +      }
         return '      <div class="bandrow' + cls + '">' + text + '</div>';
       })
       .join('\n') + '\n    </div>';
   }
  ```
  Et dans les 36 fichiers HTML des 4 cours statiques (`b1-algo`, `b1-c-cpp`, `b1-php`, `b1-python`), ajout de la 4e bande `<div class="bandrow">90–94 % — Très bonne maîtrise : consolide les cas limites.</div>` (alignée sur `scripts/templates/cours.js:L18`).
- **Pages impactées** : **397 chapitres** + **43 pages transverses** (`simulateur-examen.html` / `exercices.html`).
- **Risque** : Très faible (purement déclaratif dans `.bands`).
- **Test de non-régression** : `python3 audit/tour2/scripts/b1_seuils.py` → `0` chapitre avec verdict `trou` ou `incomplet`.

### Item 1.3 — Libellé « Deux indices, rédigés en mots » dynamique selon `exercise.hints.length` (`B2` : 183 / 214 blocs)
- **Fichier source exact** : `scripts/generate-code-labs.js:L104-L110`
- **Changement proposé (diff)** :
  ```diff
  @@ -104,6 +104,9 @@
  +  const nHints = Array.isArray(exercise.hints) ? exercise.hints.length : 0;
  +  const NUMBER_WORDS = { 1: 'Un indice', 2: 'Deux indices', 3: 'Trois indices', 4: 'Quatre indices', 5: 'Cinq indices' };
  +  const hintsTitle = (NUMBER_WORDS[nHints] || (nHints + ' indices')) + ( nHints === 1 ? ', rédigé en mots' : ', rédigés en mots' );
     const hints =
       '    <details class="lab__hints">\n' +
  -    '      <summary>' + icon('lightbulb') + ' Deux indices, rédigés en mots</summary>\n' +
  +    '      <summary>' + icon('lightbulb') + ' ' + hintsTitle + '</summary>\n' +
       '      <ol>\n' +
       exercise.hints.map(hint => '        <li>' + escText(hint) + '</li>').join('\n') + '\n' +
       '      </ol>\n' +
       '    </details>\n';
  ```
- **Pages impactées** : **416 chapitres** (`1 250` blocs d'indices) après `node scripts/generate-code-labs.js`.
- **Risque** : Nul.
- **Test de non-régression** : `python3 audit/tour2/scripts/b2_indices.py` → `0` bloc incohérent.

### Item 1.4 — Liens 404 de navigation (`723` liens) et de `chapitres/exercices.html` B3 (`333` liens) + `favicon.svg` (`895` liens) (`B4`)
- **Fichiers sources exacts** :
  1. `scripts/course-kit.js:L67-L84` (`navItems(course)`) : résolution dynamique sur disque du chemin réel des exercices (`exercices/exercices.html` vs `chapitres/exercices.html`) et de l'examen (`chapitres/simulateur-examen.html` vs `chapitres/examens.html` vs `chapitres/examen-blanc.html`) ;
  2. `server/content/b3-{firewall,github,linux,agile,pfsense,reseau-lan,sql,veille,windows-server}/pages/examens-exercices.js` (ou `pages.js`) : remplacement de `href="chapitres/chapitre` par `href="chapitre` dans la génération de `chapitres/exercices.html` + ajout de `id="' + escAttr(exercise.id) + '"` sur `<div class="lab">` dans `scripts/generate-code-labs.js:L121` pour que l'ancre `#<ex_id>` fonctionne ;
  3. Création de `/assets/img/favicon.svg` (ou pointage vers l'icône existante).
- **Changement proposé dans `scripts/course-kit.js:L67-L84` (diff)** :
  ```diff
  @@ -67,14 +67,23 @@
  +const fs = require('fs');
  +const path = require('path');
  +const ROOT_DIR = path.resolve(__dirname, '..');
  +function resolveCoursePath(courseId, candidates) {
  +  for (const rel of candidates) {
  +    if (fs.existsSync(path.join(ROOT_DIR, courseId, rel))) return rel;
  +  }
  +  return candidates[0];
  +}
   function navItems(course) {
     const items = [{ key: 'sommaire', label: 'Sommaire', path: 'sommaire.html' }];
     for (const ch of course.chapters) {
       items.push({ key: 'ch' + ch.n, label: 'Ch. ' + ch.n, path: 'chapitres/chapitre' + ch.n + '.html' });
     }
     items.push({ key: 'cartes', label: 'Cartes', path: 'chapitres/cartes.html' });
     items.push({ key: 'formules', label: 'Mémo', path: 'chapitres/formules.html' });
  -  items.push({ key: 'exercices', label: 'Exercices', path: 'exercices/exercices.html' });
  +  items.push({ key: 'exercices', label: 'Exercices', path: resolveCoursePath(course.id, ['exercices/exercices.html', 'chapitres/exercices.html']) });
     items.push({ key: 'atelier', label: 'Atelier', path: 'atelier.html' });
  -  items.push({ key: 'examen', label: 'Examen', path: 'chapitres/simulateur-examen.html' });
  +  items.push({ key: 'examen', label: 'Examen', path: resolveCoursePath(course.id, ['chapitres/simulateur-examen.html', 'chapitres/examens.html', 'chapitres/examen-blanc.html']) });
     return items;
   }
  ```
- **Pages impactées** : **381 pages** de 29 cours (`723` liens de navbar) + **9 pages** `chapitres/exercices.html` B3 (`333` liens) + **895 pages** (`favicon.svg`).
- **Risque** : Nul (vérifie `fs.existsSync` sur le disque avant de choisir la cible).
- **Test de non-régression** : `python3 audit/tour2/scripts/b4_liens_404.py` → `0` lien 404 dans `NAV_B3_B2_754`, `EXERCICES_B3_396` et `FAVICON_404`.

### Item 1.5 — Titre dynamique « Les N notions à connaître absolument » (`B9` : 158 chapitres)
- **Fichier source exact** : `scripts/course-kit.js:L326`
- **Changement proposé (diff)** :
  ```diff
  @@ -325,3 +325,3 @@
  -    '    <h3>Les 8 notions à connaître absolument</h3>',
  +    '    <h3>Les ' + ch.notions.length + ' notions à connaître absolument</h3>',
  ```
- **Pages impactées** : **158 chapitres** dont `ch.notions.length != 8` (121 chapitres à 9–17 notions et 37 chapitres à 5–7 notions).
- **Risque** : Nul.
- **Test de non-régression** : `python3 audit/tour2/scripts/b9_notions_cartes.py` → `0` contradiction entre le titre `<h3>` et le nombre de `<li>`.

### Item 1.6 — Repli des corrigés d'examens dans `<details>` (`B10` : 30 pages d'examen B3/B2)
- **Fichiers sources exacts** : `server/content/b3-*/pages/examens-exercices.js` (et `server/content/{sql,csharp,ccna,uml,uiux,docker,infographie}.js` ou `pages.js`).
- **Changement proposé (diff type)** :
  ```diff
  -  '<div class="box box--solution">',
  -  '  <div class="box__title">' + ic('check') + ' Corrigé officiel &amp; Barème</div>',
  +  '<details class="exam-sol"><summary class="btn">' + ic('check') + ' Afficher le corrigé officiel et le barème (après avoir composé)</summary><div class="box box--solution" style="margin-top:12px">',
     ...
  -  '</div>'
  +  '</div></details>'
  ```
- **Pages impactées** : **30 pages d'examen** (les 23 cours B3 + 7 cours B2).
- **Risque** : Nul.
- **Test de non-régression** : `python3 audit/tour2/scripts/b10_examens_b3.py` → `0` page avec corrigé en clair à l'ouverture.

### Item 1.7 — Page d'accueil `index.html` : ordre DOM des cartes (`B1 → B2 → B3`), attribut `hidden` initial et compteurs (`B11`)
- **Fichiers sources exacts** : `scripts/generate-portal-cards.js` / `index.html` (`L78, L93-L108, L143-L1150`).
- **Changement proposé** :
  1. Réordonner les 70 `<a class="card">` dans `#grid` dans l'ordre **`data-level="b1"` (positions 1..23, `--bf-i: 0..22`) → `data-level="b2"` (positions 24..47, avec attribut `hidden` par défaut dans le HTML statique) → `data-level="b3"` (positions 48..70, avec attribut `hidden` par défaut)** ;
  2. Aligner le libellé du compteur B2 et Tous : `22 cours (+ 2 ateliers)` et `68 cours (+ 2 ateliers)`.
- **Pages impactées** : `index.html`.
- **Risque** : Nul (`applyFilter()` dans `index.html:L1334-L1354` bascule déjà `card.hidden = !show` dynamiquement).
- **Test de non-régression** : `python3 audit/tour2/scripts/b11_index_home.py` + `node --test tests/catalogue-build-integrity.test.js`.

---

## Lot 2 — Les Deux Chapitres Témoins (`b1-algo` Ch. 1 et `b3-pfsense` Ch. 1) — Texte Exact des Corrections

### 2.1. `b1-algo` Chapitre 1 (`b1-algo/chapitres/chapitre1.html` — Cours écrit à la main)

Conformément à la Mission A §5 et à la Mission D, voici le **texte HTML exact** à substituer dans `b1-algo/chapitres/chapitre1.html` pour :
1. Corriger la mise en situation incohérente (« jamais fait de thé → préparer un plat », `L44`) ;
2. Respecter l'ordre des PDF sources (`Introduction à L’Algorithmique.txt#PAGE 5-12` et `0004- Lecture, Ecriture et Affectation.txt#PAGE 2-18`) en introduisant explicitement les notions de **donnée, variable, identificateur, type (`Entier`), `Lire`, `Écrire` et affectation (`←`)** AVANT le premier pseudo-code (`L90-L125`) ;
3. Présenter le squelette d'un programme **Pascal** (`program`, `var`, `begin...end.`, `readln`, `writeln`) conformément à `2- Introduction au Langage Pascal.txt#PAGE 4-9` ainsi que sa correspondance ligne à ligne avec **Python 3** (`int(input())`, `print()`) pour préparer les exercices ;
4. Remplacer dans la Section 4 (`La table de trace`, `L126-L138`) la boucle `Pour i de 1 à 3` (qui relève du Chapitre 4) par une **séquence linéaire pure d'affectations et de lectures/écritures** conforme au Chapitre 1.

#### Texte exact de remplacement pour `b1-algo/chapitres/chapitre1.html:L42-L139` :
```html
  <div class="box box--situation">
    <div class="box__title"><svg class="ic" aria-hidden="true" focusable="false"><use href="/assets/img/ui-icons.svg#i-play"></use></svg> Mise en situation</div>
    <p>Tu dois expliquer à quelqu'un qui n'a jamais préparé de thé comment infuser une tasse de thé pas à pas,
    sans jamais laisser place à l'interprétation : quelle quantité d'eau verser, à quelle température chauffer,
    combien de minutes laisser infuser. C'est exactement l'algorithmique : décrire une méthode de résolution
    de façon <em>précise</em>, <em>finie</em> et <em>non ambiguë</em>, avant de la traduire dans un langage de programmation.</p>
  </div>

  <div class="box box--objectifs">
    <div class="box__title"><svg class="ic" aria-hidden="true" focusable="false"><use href="/assets/img/ui-icons.svg#i-target"></use></svg> Objectifs pédagogiques</div>
    <p>À la fin de ce chapitre, tu seras capable de :</p>
    <ol>
      <li>Définir un algorithme, ses quatre propriétés et la notion d'identificateur de donnée ;</li>
      <li>distinguer les trois structures de base (séquence, test alternatif, boucle) ;</li>
      <li>écrire un premier algorithme séquentiel (<code>Variable</code>, <code>Lire</code>, <code>←</code>, <code>Écrire</code>) et le traduire en Pascal et en Python ;</li>
      <li>dérouler un algorithme séquentiel à la main dans une table de trace.</li>
    </ol>
  </div>

  <h2>1. Qu'est-ce qu'un algorithme ?</h2>
  <p><strong>Définition.</strong> Un algorithme est une suite <em>finie</em> et <em>ordonnée</em> d'instructions
  <em>non ambiguës</em> qui, appliquée à des données d'entrée (<em>inputs</em>), produit un résultat attendu
  (<em>output</em>) en un temps fini.</p>

  <table>
    <tr><th>Propriété</th><th>Ce qu'elle signifie</th></tr>
    <tr><td>Fini</td><td>Il se termine obligatoirement après un nombre fini d'étapes.</td></tr>
    <tr><td>Non ambigu</td><td>Chaque instruction n'admet qu'une seule interprétation possible.</td></tr>
    <tr><td>Effectif</td><td>Chaque étape est concrètement réalisable par l'exécutant.</td></tr>
    <tr><td>Général</td><td>Il résout toute une classe de problèmes (ex. l'aire de <em>n'importe quel</em> rectangle), pas un seul cas particulier.</td></tr>
  </table>

  <div class="box box--intuition">
    <div class="box__title"><svg class="ic" aria-hidden="true" focusable="false"><use href="/assets/img/ui-icons.svg#i-lightbulb"></use></svg> Niveau 1 — Intuition</div>
    <p>Une recette est un algorithme : des ingrédients (les données d'entrée), des étapes ordonnées (les instructions),
    une tasse de thé prête (la sortie). Une consigne qui dit « chauffer un certain temps » est ambiguë ;
    « porter l'eau à 90 °C puis infuser 3 minutes » est non ambiguë.</p>
  </div>

  <h2>2. Données, variables, identificateurs et les trois structures</h2>
  <p>Conformément au cours de référence, un algorithme manipule des <strong>données</strong> stockées dans des boîtes mémoire :</p>
  <ul>
    <li><strong>Variable :</strong> boîte mémoire dont la valeur peut changer au cours de l'exécution (opposée à une <strong>constante</strong>, comme <code>PI = 3.14</code>, dont la valeur est fixe).</li>
    <li><strong>Identificateur :</strong> nom unique donné à une variable ou à l'algorithme (lettres, chiffres et tiret bas <code>_</code> uniquement, sans espace ni tiret <code>-</code>, et ne commençant jamais par un chiffre : <code>longueur_1</code> est valide, <code>1_longueur</code> et <code>prix-ht</code> sont invalides).</li>
    <li><strong>Type de donnée (à retenir pour l'instant, détaillé au Chapitre 2) :</strong> précise la nature de la valeur stockée : <code>Entier</code> (nombres sans virgule : <code>5</code>, <code>-12</code>), <code>Réel</code> (<code>3.14</code>), <code>Caractère</code> (<code>'A'</code>), <code>Chaîne</code> (<code>"Bonjour"</code>) ou <code>Booléen</code> (<code>Vrai</code>/<code>Faux</code>).</li>
  </ul>

  <p>Tout algorithme se construit en combinant trois familles d'instructions :</p>
  <table>
    <tr><th>Structure</th><th>Rôle</th><th>Où nous l'étudierons</th></tr>
    <tr><td><strong>Séquence</strong></td><td>Exécuter les instructions simples l'une après l'autre (<code>Lire</code>, calculer avec <code>←</code>, <code>Écrire</code>).</td><td>Chapitres 1 et 2</td></tr>
    <tr><td><strong>Test alternatif</strong></td><td>Choisir entre deux chemins selon une condition (<code>Si ... Alors ... Sinon ... FinSi</code>).</td><td>Chapitre 3</td></tr>
    <tr><td><strong>Boucle</strong></td><td>Répéter un bloc d'instructions tant qu'une condition est vraie (<code>Pour</code>, <code>TantQue</code>, <code>Répéter</code>).</td><td>Chapitres 4 et 5</td></tr>
  </table>

  <h2>3. Structure d'un algorithme séquentiel et traduction (Pascal &amp; Python)</h2>
  <p>Un algorithme comporte toujours trois parties : l'<strong>En-tête</strong> (<code>Algorithme Nom</code>), la <strong>Déclaration des variables</strong> (<code>Variable nom : Type</code>) et le <strong>Corps</strong> délimité par <code>Début ... Fin</code> utilisant trois instructions élémentaires :</p>
  <ul>
    <li><code>Lire x</code> : attend que l'utilisateur saisisse une valeur au clavier et la range dans la variable <code>x</code> ;</li>
    <li><code>x ← expression</code> (<strong>affectation</strong>) : calcule la valeur de l'expression à droite de la flèche <code>←</code> puis la range dans la variable <code>x</code> à gauche ;</li>
    <li><code>Écrire message, x</code> : affiche à l'écran le texte ou le contenu de la variable <code>x</code>.</li>
  </ul>

  <div class="pseudo"><b>Pseudo-code — Aire d'un rectangle</b><br>
  Algorithme AireRectangle<br>
  Variable longueur, largeur, aire : Entier<br>
  Début<br>
  &nbsp;&nbsp;Écrire "Longueur ?"<br>
  &nbsp;&nbsp;Lire longueur<br>
  &nbsp;&nbsp;Écrire "Largeur ?"<br>
  &nbsp;&nbsp;Lire largeur<br>
  &nbsp;&nbsp;aire ← longueur × largeur<br>
  &nbsp;&nbsp;Écrire "Aire = ", aire<br>
  Fin
  </div>

  <p>Dans les sujets d'examen écrits de B1, cet algorithme est traduit en <strong>Pascal</strong> (où chaque instruction se termine par <code>;</code>, le corps par <code>begin ... end.</code> et l'affectation par <code>:=</code>). Dans nos ateliers interactifs ci-dessous, tu l'exécuteras en <strong>Python 3</strong> (où <code>int(input())</code> lit un entier sur une ligne et <code>print()</code> l'affiche) :</p>

  <table>
    <tr><th>Étape</th><th>Pseudo-code</th><th>Langage Pascal (examen écrit)</th><th>Python 3 (atelier interactif)</th></tr>
    <tr><td>En-tête &amp; Variables</td><td><code>Algorithme AireRectangle</code><br><code>Variable a, b : Entier</code></td><td><code>program AireRectangle;</code><br><code>var a, b: integer;</code></td><td><em>(Pas de déclaration préalable)</em></td></tr>
    <tr><td>Lire un entier</td><td><code>Lire longueur</code></td><td><code>readln(longueur);</code></td><td><code>longueur = int(input())</code></td></tr>
    <tr><td>Affecter un calcul</td><td><code>aire ← longueur × largeur</code></td><td><code>aire := longueur * largeur;</code></td><td><code>aire = longueur * largeur</code></td></tr>
    <tr><td>Afficher un résultat</td><td><code>Écrire aire</code></td><td><code>writeln(aire);</code></td><td><code>print(aire)</code></td></tr>
  </table>

  <h2>4. La table de trace (dérouler une séquence à la main)</h2>
  <p><strong>Définition.</strong> Dérouler un algorithme à la main, instruction par instruction, en notant dans une colonne l'évolution de chaque variable s'appelle construire sa <strong>table de trace</strong>. Suivons pas à pas un algorithme séquentiel lorsque l'utilisateur saisit <code>5</code> puis <code>3</code> :</p>

  <div class="pseudo"><b>Pseudo-code séquentiel</b><br>
  Variable a, b, somme, doubleSomme : Entier<br>
  Début<br>
  &nbsp;&nbsp;1. Lire a &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>(l'utilisateur saisit 5)</em><br>
  &nbsp;&nbsp;2. Lire b &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>(l'utilisateur saisit 3)</em><br>
  &nbsp;&nbsp;3. somme ← a + b<br>
  &nbsp;&nbsp;4. doubleSomme ← somme × 2<br>
  &nbsp;&nbsp;5. Écrire doubleSomme<br>
  Fin</div>

  <table>
    <tr><th>Étape exécutée</th><th>a</th><th>b</th><th>somme</th><th>doubleSomme</th><th>Affichage écran</th></tr>
    <tr><td>Après ligne 1 (<code>Lire a</code>)</td><td>5</td><td>?</td><td>?</td><td>?</td><td>—</td></tr>
    <tr><td>Après ligne 2 (<code>Lire b</code>)</td><td>5</td><td>3</td><td>?</td><td>?</td><td>—</td></tr>
    <tr><td>Après ligne 3 (<code>somme ← a + b</code>)</td><td>5</td><td>3</td><td>8</td><td>?</td><td>—</td></tr>
    <tr><td>Après ligne 4 (<code>doubleSomme ← somme × 2</code>)</td><td>5</td><td>3</td><td>8</td><td>16</td><td>—</td></tr>
    <tr><td>Après ligne 5 (<code>Écrire doubleSomme</code>)</td><td>5</td><td>3</td><td>8</td><td>16</td><td><code>16</code></td></tr>
  </table>
  <div class="out">16</div>
```
*(NB : Pour les exercices 2 et 3 de `b1-algo/chapitres/chapitre1.html:L215,L238` qui utilisent la division entière `//` et le reste `%`, un encadré « Opérateurs arithmétiques Python de l'atelier » présentant `//` [quotient entier, ex. `14 // 4` vaut `3`] et `%` [reste de la division entière, ex. `14 % 4` vaut `2`] est inséré juste avant `<!-- code-labs:start -->`, avec renvoi d'approfondissement au Chapitre 2 §3).*

---

### 2.2. `b3-pfsense` Chapitre 1 (`server/content/b3-pfsense/chapitre1.js` + `server/exercises/b3-pfsense/chapitre1.js`)

Voici le **texte exact** à insérer dans `server/content/b3-pfsense/chapitre1.js` (et `server/exercises/b3-pfsense/chapitre1.js`) pour :
1. Remplacer la mise en situation emphatique de 108 mots par un scénario concret de 62 mots et définir chaque sigle (`BPF`, `mbuf`, `Kea`, `RRSIG`, `double NAT`) ;
2. Ajouter la **Section 4 manquante sur le plan d'adressage CIDR IPv4/IPv6** (tenant l'objectif 4) ET l'encadré d'**anatomie d'une règle `pf.conf`** avant l'exercice 2 ;
3. Corriger la règle factuelle `usable_hosts` conformément à la **RFC 3021** (`/31` = 2 hôtes point-à-point) et au comportement de `ipaddress.IPv4Network.hosts()` (`/32` = 1 hôte) ;
4. Lever l'ambiguïté directionnelle du QCM sur l'interface `OPT` (`L352-L359`).

#### Texte exact pour `server/content/b3-pfsense/chapitre1.js` (Mise en situation + Section 4 CIDR & Syntaxe `pf.conf` + QCM OPT) :
```javascript
  situation: 'Lors de la mise en service d’un nouveau site d’entreprise, vous devez raccorder une arrivée fibre opérateur (WAN), un réseau bureautique interne (LAN) et une salle de serveurs isolée (interface optionnelle OPT) sur une appliance Netgate pfSense. Avant d’ouvrir le moindre flux, il faut comprendre comment pfSense traduit vos réglages WebGUI en règles du moteur Packet Filter (pf) de FreeBSD, découper proprement vos sous-réseaux CIDR et configurer les services DHCP et DNS Unbound.',
```
```javascript
    {
      title: 'Calcul de Plans d’Adressage CIDR (IPv4 / IPv6) & Syntaxe Native pf.conf',
      html: [
        '<div class="box box--intuition">',
        '  <div class="box__title">Niveau 1 — Intuition : Pourquoi découper en CIDR et comment lit le moteur pf ?</div>',
        '  <p>Attribuer une adresse IP à une interface pfSense (`192.168.1.1/24`) revient à définir à la fois l’adresse de la passerelle et la taille de la rue réseau qu’elle dessert (`/24` = 24 bits fixes pour le réseau, 8 bits restants pour numéroter les machines). De même, chaque règle créée dans l’interface WebGUI est traduite en une phrase standardisée dans `/tmp/rules.debug` lue par le moteur `pf`.</p>',
        '</div>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Calcul CIDR IPv4, RFC 3021 (/31) et IPv6 (/64)</h4>',
        '    <p>En IPv4 (32 bits), un préfixe <code>/n</code> laisse $h = 32 - n$ bits d’hôtes, soit $2^{32-n}$ adresses totales :</p>',
        '    <ul>',
        '      <li><strong>Sous-réseau standard ($n \\le 30$) :</strong> la première adresse est l’adresse réseau (bits d’hôte à 0), la dernière est l’adresse de diffusion (<em>broadcast</em>, bits d’hôte à 1). Le nombre d’hôtes utilisables vaut $2^{32-n} - 2$ (ex. en <code>/29</code> : $2^3 = 8$ adresses totales, soit $8 - 2 = 6$ hôtes utilisables ; une interface pfSense ne doit jamais recevoir l’adresse réseau ni l’adresse de broadcast).</li>',
        '      <li><strong>Cas particuliers normés (RFC 3021 et /32) :</strong> sur un lien point-à-point inter-routeurs en <code>/31</code> (RFC 3021), il n’y a pas de broadcast : les <strong>2 adresses sont utilisables</strong> (comme le renvoie <code>len(list(ipaddress.ip_network(".../31").hosts())) == 2</code> dans la bibliothèque standard Python <code>ipaddress</code>). En <code>/32</code>, le masque désigne <strong>1 hôte unique</strong> (route d’hôte). <em>Note pour l’atelier 1 : par convention simplifiée de la grille, la formule de l’énoncé applique $2^{32-n} - 2$ pour $n < 31$ et $0$ sinon.</em></li>',
        '      <li><strong>En IPv6 (128 bits) :</strong> chaque segment LAN/OPT reçoit un préfixe standard <code>/64</code> ($2^{64}$ adresses d’interface, sans broadcast, remplacé par le multicast sollicité ICMPv6 NDP).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Grammaire d’une directive native pf.conf</h4>',
        '    <p>Dans <code>/tmp/rules.debug</code>, une règle de filtrage générée par pfSense suit la grammaire positionnelle d’OpenBSD Packet Filter :</p>',
        '    <pre><code>action direction [quick] on interface [proto protocole] from source to destination [port port_cible]</code></pre>',
        '    <ul>',
        '      <li><code>action</code> : <code>pass</code> (autoriser et créer une entrée d’état) ou <code>block</code> (rejeter).</li>',
        '      <li><code>direction</code> : <code>in</code> (paquet entrant sur l’interface) ou <code>out</code> (sortant).</li>',
        '      <li><code>on interface</code> : nom logique ou physique (<code>wan</code>, <code>lan</code>, <code>opt1</code>).</li>',
        '      <li><code>proto</code> : omis si <code>any</code> ; sinon <code>proto tcp</code>, <code>proto udp</code>, <code>proto icmp</code>.</li>',
        '      <li><code>port</code> : omis si <code>any</code> ou protocole sans port (ICMP) ; sinon <code>port 443</code>.</li>',
        '    </ul>',
        '    <p><strong>Exemple résolu :</strong> Autoriser sur <code>lan</code> le trafic TCP de <code>192.168.1.0/24</code> vers toute destination sur le port <code>443</code> s’écrit :<br><code>pass in on lan proto tcp from 192.168.1.0/24 to any port 443</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
```
#### Clarification exacte du QCM Question 4 sur l'interface `OPT` (`server/content/b3-pfsense/chapitre1.js`) :
```javascript
    {
      stem: 'Quel est le comportement de filtrage par défaut d’une nouvelle interface optionnelle (OPT1) qui vient d’être activée sur pfSense ?',
      opts: [
        'Tout le trafic entrant sur l’interface OPT1 (émis par les machines du réseau OPT1) est autorisé vers Internet uniquement',
        'Aucune règle n’est créée par défaut : tout trafic arrivant sur l’interface OPT1 (émis par les hôtes du segment OPT1) est bloqué par la politique implicite Default Deny',
        'Le trafic entre OPT1 et LAN est autorisé, mais l’accès vers le WAN est bloqué',
        'L’interface OPT1 hérite automatiquement des règles de filtrage de l’interface LAN'
      ],
      correct: 1,
      exp: 'Contrairement à l’interface LAN qui reçoit la règle initiale « Default allow LAN to any », une interface OPT nouvellement créée possède une table de règles vide : tout paquet entrant sur la patte OPT1 depuis les hôtes du segment OPT1 est donc rejeté tant qu’aucune règle pass explicite n’y est ajoutée.'
    }
```

---

## Lot 3 — Fondamentaux B1, puis Reste B1, puis B2, puis B3 (1 Lot = 1 Cours ou 1 Famille, S0 → S1)

Chaque sous-lot ci-dessous constitue une unité d'exécution indépendante validée séparément par `avant_apres.py` :

| Sous-lot | Cours ciblé(s) | Niv. | Corrections S0 puis S1 (Fichier source exact → Action) | Effort | Dépendances |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **Lot 3.1** | `b1-admin-windows` | B1 | **[S0]** `server/exercises/b1-admin-windows.js` : remplacer les 18 exercices en Bash Linux (`language: 'shell'`, `#!/bin/bash`) par des études de cas Windows Server/Active Directory cohérentes (ou PowerShell guidé). **[S1]** `server/content/b1-admin-windows.js` Ch. 2 : ajouter l'encadré EOL Windows Server 2012 R2 (oct. 2023) et l'équivalence Server 2022/2025. | `M` | Lot 1 + Décision `05` |
| **Lot 3.2** | `b1-projet` | B1 | **[S0]** `server/content/b1-projet.js` Ch. 2 et Ch. 3 : ajouter en tête du Ch. 2 une section d'initiation pas à pas aux classes Python (`class`, `__init__`, `self`) et en tête du Ch. 3 une section d'initiation à `tkinter` (fenêtre `tk.Tk()`, `Label`, `Entry`, `Button`, `Treeview`) puisque `b1-python` s'arrête aux fichiers ; purger le texte `scriptée en Bash` dans `b1-projet/index.html:L7,L84`. | `M` | Lot 1 |
| **Lot 3.3** | `b1-sql`, `sql` (B2), `b3-sql` (B3) | B1–B3 | **[S0/S1]** `server/exercises/{b1-sql,sql,b3-sql}.js` : selon la Décision `05`, reconnecter les exercices SQL au moteur `/assets/js/engines/sql-wasm-engine.js` (`language: 'sql'`) ou purger les 18 objectifs/catalogues contradictoires (`Python 3`) et séparer `[Exemple]` des `[Cas 1..3]`. **[S1]** `server/content/b1-merise.js` Ch. 5 : ajouter un encadré d'explication autonome de `CREATE TABLE / PRIMARY KEY / REFERENCES` pour lever le cycle `D3` avec `b1-sql`. | `M` | Lot 1 + Décision `05` |
| **Lot 3.4** | `b1-architecture`, `b1-reseaux`, `b1-ccna1`, `b1-linux`, `b1-git` | B1 | **[S1]** `server/content/b1-architecture.js` : ajouter dès le Ch. 1 un schéma explicatif du modèle de Von Neumann (CPU/RAM/Bus) avant d'attendre le Ch. 6, et purger `2#du-bash` dans `atelier.html:L94`. **[S1]** `server/content/b1-reseaux.js` Ch. 1 : définir ou reporter `Active Directory`, `LDAP`, `iSCSI`. **[S1]** `server/content/b1-linux.js` Ch. 1 : introduire la structure minimale d'un script `#!/bin/bash` dès le Ch. 1 (puisque les exercices des Ch. 1–5 l'utilisent avant le Ch. 6 §4). | `M` | Lot 1 |
| **Lot 3.5** | `b1-python`, `b1-c-cpp`, `b1-php`, `b1-prog-web`, `b1-algebre`, `b1-stats`, `b1-robotique`, `b1-cyber`, `b1-droit`, `b1-fr-pro`, `b1-anglais`, `b1-bureautique`, `b1-virtualisation` | B1 | **[S1]** `b1-algebre/chapitres/chapitre6.html:L102` : corriger `\\quad (X \\ne 0)` ; `server/content/b1-robotique.js` Ch. 1 : remplacer l'expression génératrice Python par une lecture simple et faire le pont avec `setup()/loop()` des PDF Arduino ; `b1-prog-web` : corriger les 5 liens relatifs signalés par `b4_liens_404.py`. | `M` | Lot 1 |
| **Lot 3.6** | `admin-vm` & `csharp` (Alignement annales B2 `epreuves`) | B2 | **[S0]** `server/content/admin-vm.js` Ch. 4 et Ch. 6 : ajouter une sous-section dédiée au **Thin Provisioning vs Thick Provisioning** (Ch. 4) et à la migration à chaud **VMware vMotion & vSphere HA** (Ch. 6) évalués aux pages 10–12 de `Recueil_Epreuves_2024_2025.pdf`. **[S0]** `server/exercises/csharp/` : selon la Décision `05`, restaurer l'exécution C# réelle (pour préparer l'épreuve officielle de 3h de code C# p. 13–14) ou aligner les études de cas POO C#. | `M` | Lot 1 + Décision `05` |
| **Lot 3.7** | `react`, `probabilites`, `RD-RO`, `docker`, `rd_winserver` | B2 | **[S1]** `server/content/react.js` Ch. 1 : ajouter un encadré « Rappels JavaScript ES6+ indispensables (import/export, arrow functions, destructuring, `.map()`, `fetch`) » et corriger `qcm-100.html` / `formules.html`. **[S1]** `server/content/probabilites.js` Ch. 5 : ajouter un encadré d'initiation visuelle et opératoire au calcul d'intégrale $\int f(x)dx$. **[S1]** `server/content/RD-RO.js` : remplacer les macros LaTeX brutes `\ne`/`\neq`/`\notin` par les caractères Unicode `≠` et `∉` (ou charger KaTeX auto-render) et corriger les 17 liens 404. **[S1]** `server/content/docker.js` Ch. 1 : vulgariser `namespaces` et `cgroups` avec schéma sans supposer le cours `b3-linux` Ch. 4 connu. **[S1]** `server/content/rd_winserver.js` Ch. 1 : ajouter une introduction à la syntaxe des cmdlets PowerShell (`Verbe-Nom`). | `M` | Lot 1 |
| **Lot 3.8** | Autres cours B2 (`linux`, `php`, `rd_java`, `api-rest-flask`, `droit`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `assembleur`, `Cyber securite B2`, `ccna`, `uml`, `uiux`, `infographie`) | B2 | **[S1]** Corriger les 100 liens relatifs cassés dans `exercices/exercices.html` (`uml`, `uiux`, `docker`, `infographie`) et `qcm-100.html` (`api-rest-flask`, `erp-si`, `ingenierie-besoin`, `masterclass-apprendre`, `admin-vm`) listés dans `csv/b4_liens_404.csv` ; purger les 281 lignes de résidus Python/split() dans les chapitres `analyse`. | `M` | Lot 1 + Décision `05` |
| **Lot 3.9** | Les 22 autres cours B3 (`b3-*` hors `b3-pfsense`) | B3 | **[S1]** `server/content/b3-document-technique/chapitre4.js` : remplacer les 21 `\n` littéraux du bloc OpenAPI YAML (`chapitre4.html:L119`) par de vrais retours à la ligne ; `server/content/b3-cryptographie/chapitre4.js` : ajouter le rappel d'arithmétique modulaire ($\varphi(n)$, Bézout, inverse modulaire) avant RSA et recommander l'étude de `b3-cryptographie` au S1 avant `b3-pfsense` Ch. 5 ; appliquer la Décision `05` sur les objectifs (« développer en Python 3 ») et les ateliers des 22 cours B3 en mode `analyse`. | `L` | Lot 1 + Décision `05` |
