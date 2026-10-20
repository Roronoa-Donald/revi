# instructions.md — Contrat de passation complet

> **Lecteur cible : une IA (agent de codage) qui reprend ce projet sans contexte préalable.**
> Ce document est la **source de vérité du travail à faire**. Il contient : la directive, tout ce qui
> a déjà été fait, tout ce qu'il reste à faire, les exigences, les contraintes, les pièges, les
> skills à utiliser obligatoirement et les vérifications à passer avant toute livraison.
> **Lis-le en entier avant d'écrire la moindre ligne.** En cas de doute, ce document prime sur
> tes suppositions ; en cas de contradiction entre ce document et le code, **le code et les
> commandes de vérification primes**, et tu corriges le document.
>
> Langue de travail et de réponse : **français**. Langue du code/des identifiants : anglais.

---

## 0. TL;DR — la mission en trois phrases

1. Ce dépôt est une **académie en ligne française** (cours interactifs HTML + couche d'authentification par clés d'activation). Il est servi en local/Render par `server.js`, et en statique par `scripts/build.js` → `dist/`.
2. La mission de fond est de **convertir chaque cours du registre `server/courses.js` au « gabarit kit complet »** : **13 pages générées + 18 ateliers de code corrigés (6 chapitres de 3 exercices)** par cours, vérifié de bout en bout, sans régression, puis documenté.
3. L'ordre d'exécution suit **le registre `server/courses.js`**. **B1 est terminé.** **B2 est en cours** : livrés = `linux`, `php`, `probabilites`, `rd_java`, `rd_winserver`, `admin-vm`, `droit`, `react`, `api-rest-flask`, `erp-si`. Prochain = `ingenierie-besoin`, puis les suivants dans l'ordre du registre (voir §7).

**Règle d'or absolue : aucune régression tolérée.** Après CHAQUE cours, tu passes la suite de vérifications complète (§8) et tu n'avances que si tout est vert.

---

## 1. La directive (ce que l'utilisateur a demandé, verbatim consolidé)

- « Convertir **chaque cours** au gabarit complet, un par un, en suivant l'ordre du registre, sans rien casser. »
- « Tous les cours dans le dossier `cours B1 IT/` (pour B1) », puis, pour B2, « les 24 cours historiques servis à la racine ».
- « Périmètre B2 = les **22 cours à chapitres + `epreuves`** ; **`preparation-web` est exclu** (section à mot de passe séparée). »
- « **Aucune régression** sur aucun cours ; **tester et retester** avant d'avancer. »
- « Les cours non-programmables doivent avoir des **fiches fidèles au domaine** et une **vérification structurelle** ; l'exécution réelle est déléguée au fournisseur en production. »
- « Créer un `instructions.md` à la racine = **contrat de passation complet, très très détaillé, adapté pour une IA** : tout ce qui a été dit, toutes les exigences, tout ce qu'il y a à faire, tout ce qui reste à implémenter, tout ce qui a déjà été fait, tout ce qu'il faut respecter, **les skills à utiliser obligatoirement**, les contraintes, la directive complète. »

### 1.1 Ce que « au gabarit » signifie précisément (definition of done d'un cours)

Un cours est « livré » si et seulement si **tous** ces points sont vrais :

- [ ] Le cours est **à 6 chapitres** (`chapitre1.html` … `chapitre6.html`) rendus par le générateur.
- [ ] **13 pages générées** : `index.html`, `sommaire.html`, `atelier.html`, `chapitres/chapitre1..6.html` (6), `cartes.html` (ou `cartes-formules`), `memo.html` (ou `cheatsheet`), `simulateur-examen.html` (ou `examens-exercices`), `exercices.html` → soit **index, sommaire, atelier, 6 chapitres, cartes, mémo, simulateur, exercices = 13**.
- [ ] `assets/css/cours.css` + `assets/js/cours.js` générés dans le dossier du cours.
- [ ] **18 fiches d'exercices** (`<préfixe>-c1-e1` … `<préfixe>-c6-e3`), 3 par chapitre, chacune avec `level` (n1/n2/n3), `title`, `goal`, `brief` HTML, `starter` (template literal), `hints[2]`, `examples[1]` (`{stdin, expected, note?}`), `tests[3]` (`{label, stdin, expected}`), `solution`.
- [ ] Les 18 corrigés **passent réellement** (langages exécutables) ou **structurellement** (langages non exécutables) : « **72/72, fails: 0** ».
- [ ] Enregistrement dans `server/exercises/course-config.js` **et** `server/exercises/index.js`.
- [ ] Les pages obsolètes du dossier ont été **supprimées** (stubs `chapitre-N.html`, `exercice-N.html`, anciens chapitres, `.bak`).
- [ ] Le cours est dans le registre `server/courses.js` avec un accent conforme AA (§5.1).
- [ ] Toute la suite de vérifications (§8) est verte.
- [ ] La documentation est tenue à jour (§11).

---

## 2. Architecture du projet (à connaître avant de toucher quoi que ce soit)

### 2.1 Entrées serveur

- `server.js` — entrée **local/Render** : sert les pages statiques, injecte les scripts d'auth/chat, applique les règles de contenu protégé.
- `server/app.js` — app **Fastify** partagée (plugins, rate limiting, enregistrement des routes API).
- `api/index.js` — entrée **serverless Vercel** (même app Fastify).
- `middleware.js` — copie **edge Vercel** de la logique d'accès (à garder synchro).
- `vercel.json` — rewrites `/api/*`, bundle `server/**`, headers de sécurité.

### 2.2 Routes API (`server/routes/`)

`auth.js` (activation, vérification, logout, métadonnées de cours) · `admin.js` (login admin + gestion des clés) · `ai-chat.js` (proxy OpenRouter authentifié pour RD-AI) · `preparation.js` (section Preparation Web, clé B2 + mot de passe).

### 2.3 Registre et accès

- **`server/courses.js` — REGISTRE CANONIQUE, SOURCE DE VÉRITÉ UNIQUE.** 71 cours : 24 B2 + 24 B1 + 23 B3.
  Format d'un cours : `{ name, level: 'b1'|'b2'|'b3', icon, theme: { mode, accent, accentLight, accentDark, gradient } }`.
  Règle d'accès hiérarchique : **B1 ⊂ B2 ⊂ B3** (`canAccessCourse`).
- `server/middleware/access-control.js` et `middleware.js` et `scripts/build.js` : dérivés/dupliqués du registre.
- **Synchronisation** : `node scripts/sync-courses.js` régénère les blocs dupliqués depuis le registre ;
  `node scripts/sync-courses.js --check` vérifie. **Après tout ajout de cours dans le registre, relance `sync-courses.js`.**
- `tests/access-control.test.js` couvre `isProtected`.

### 2.4 Exécution de code et IA

- `server/services/execution/languages.js` — **liste blanche des langages** : python, javascript, typescript, c, cpp, csharp, java, php, go, rust, ruby, kotlin, swift, haskell, scala, lua, r, shell, sql.
  **`powershell` N'Y EST PAS.**
- `rd-ai-chat.js` (racine) — widget client du chat ; appelle `/api/ai-chat`. **La clé API reste côté serveur.**
- `tools/php-cli/php` — binaire PHP 8.5.8 portable (embarque `pdo_sqlite`), hors zone servie.

### 2.5 Pages publiques et assets

- `public/` — assets auth/admin servis sous `/_auth/` (`activate.html`, `admin/login.html`, `admin/dashboard.html`, `account.html`).
- Les dossiers de cours canoniques sont **des dossiers à la racine** (liste `COURSES` du registre).
- Dossiers présents sur disque mais **hors registre** (matériel source legacy, non servis comme cours) :
  `b1/`, `droitb2/`, `cours windows/`, `administration machine virtuel/`, `roadmap/`, `COURS_B3/` (source), `cours B1 IT/` (source).

### 2.6 Outillage de génération (cœur du travail)

- `scripts/course-kit.js` — le gabarit. Exports : `esc, ic, prefix, page, crumb, tags, box(kind,title,icon,inner), qcm, cards(modules), bands(rows), chapter, navItems, renderCss, renderJs`.
  `kit.chapter` accepte `lockLabel` optionnel par chapitre (ex. `'Réservé B2 et plus'`), chapitre 1 `free: true`.
- `scripts/generate-courses.js` — render des pages depuis `server/content/<cours>*.js`. Itère sur `server/content/*.js` et exige : `id, slug, brand, brandIcon, accent, accentDeep, accentSoft, accentBorder, storeKey, sources` + `chapters`. Rend `course.render(kit)`, puis finalise chapitres via `labs.finalizeChapter` et pages via `labs.finalizePage`.
- `scripts/generate-code-labs.js` — injecte les ateliers dans les chapitres (`--check` pour la synchro). Exports `finalizeChapter`, `finalizePage`. **Devenu un module importable** : c'est `generate-courses.js` qui produit les chapitres ateliers compris → pages et ateliers ne peuvent plus diverger.
- `scripts/templates/cours.css` + `cours.js` — modèles paramétrés.
- `scripts/smoke-code-lab.js` — smoke navigateur (Chromium headless + CDP) : vérifie que Monaco se monte et que le starter/marqueur attendu est affiché pour ~2 pages par cours.
- `scripts/sync-courses.js` (`--check`) — synchro des blocs dupliqués du registre.
- `scripts/smoke-sql-simulator.js` — smoke dédié au simulateur SQL (sql.js/WASM).

---

## 3. Conventions exactes d'un cours (recopie-les, ne réinvente pas)

### 3.1 Structure de fichiers d'un cours `<id>` (ex. `admin-vm`)

```
server/exercises/<id>.js                  # agrégateur : concatène les modules de chapitre
server/exercises/<id>/chapitre1.js        # 3 fiches
server/exercises/<id>/chapitre2.js        # 3 fiches
... chapitre6.js                          # 3 fiches
server/exercises/course-config.js         # entrée '<id>' : { dir, chapterDir:'chapitres', chapters:6, idPrefix, title }
server/exercises/index.js                 # RAW_EXERCISES['<id>'] = require('./<id>')

server/content/<id>.js                    # objet cours (métadonnées + render())
server/content/<id>/chapitre1.js          # contenu du chapitre 1
... chapitre6.js
server/content/<id>/chapitres-1-3.js      # agrégateur
server/content/<id>/chapitres-4-6.js      # agrégateur
server/content/<id>/pages.js              # assemble les pages transverses
server/content/<id>/pages/helpers.js
server/content/<id>/pages/accueil.js
server/content/<id>/pages/cartes-formules.js
server/content/<id>/pages/examens-exercices.js
```

Dossier servi : `<dossier>/` à la racine avec `index.html`, `sommaire.html`, `atelier.html`, `chapitres/chapitre1..6.html`, `cartes...`, `memo...`, `simulateur...`, `exercices.html`, `assets/css/cours.css`, `assets/js/cours.js`.

### 3.2 Enregistrement dans `course-config.js`

```js
'<id>': {
  dir: '<dossier>',
  chapterDir: 'chapitres',
  chapters: 6,
  idPrefix: '<préfixe>',
  title: '<Titre lisible>'
}
```

### 3.3 Structure d'une fiche d'exercice

```js
{
  id: '<préfixe>-c1-e1',       // conforme /^[a-z0-9-]+$/, unique globalement
  chapter: 1,                  // 1..6
  level: 'n1',                 // n1 | n2 | n3
  language: 'shell',           // langage de la liste blanche, ou fidèle au domaine si non exécutable
  title: 'Titre court',
  goal: 'Objectif en une phrase.',
  brief: '<p>Énoncé HTML…</p>',
  starter: `#!/usr/bin/env bash\n…`,   // template literal ; doit démarrer proprement et ÉCHOUER au moins 1 test
  hints: ['indice 1 (mots, jamais de code)', 'indice 2'],
  examples: [{ stdin: '…', expected: '…', note: 'optionnel' }],
  tests: [                      // au moins 2 (on en met 3), hidden
    { label: 'Cas nominal', stdin: '…', expected: '…' },
    { label: 'Cas limite',  stdin: '…', expected: '…' },
    { label: 'Cas d’erreur', stdin: '…', expected: '…' }
  ],
  solution: `…`                 // corrigé complet, template literal
}
```

Contraintes validées par les tests (`validateCatalogue`, `tests/exercises.test.js`) :
- ids conformes et **uniques globalement** ;
- `title`, `brief`, `starter`, `solution` non vides ; `chapter` numérique ;
- **≥ 2 tests** et `expected` string pour chacun ; **≥ 1 exemple** ; **≥ 1 indice** ;
- le `starter` ne doit **pas contenir le corrigé entier** (comparaison normalisée) ;
- aucune fuite des `tests`/`solution` dans les pages servies (`toClient()` les retire) ;
- ≥ 3 exercices par module pour tout cours de `course-config`.

### 3.4 Marqueurs de contenu (`server/content/<id>.js`)

Métadonnées obligatoires : `id, slug, brand, brandIcon, accent, accentDeep, accentSoft, accentBorder, storeKey, sources, chapters`.
- `sources` : liste des documents réellement utilisés (titre + auteur/édition).
- `storeKey` : convention `<niveau><cours>:progress`, ex. `b2adminvm:progress`.
- Chapitres 2 à 6 : `lockLabel: 'Réservé B2 et plus'` (B2) ou `'Réservé B1 et plus'` (B1) ; chapitre 1 `free: true`.

### 3.5 Zone libre de l'atelier

Chaque cours a une **zone libre** (bac à sable) avec un sujet propre au domaine, dans `atelier.html` et `chapitre1.html`. Le smoke teste un `marker` = extrait du **starter affiché** (`info.viewText`), distinct du brief. Choisis-le **dans le starter**, jamais dans le `brief`.

---

## 4. Le pipeline par cours — 7 étapes (procédurier exact)

> Exécute-les dans cet ordre, pour UN cours à la fois. Ne passe à l'étape suivante que si la
> précédente est verte. Réutilise le cours précédent comme modèle (le plus récent = le meilleur modèle).

1. **Exercices** — Écris `server/exercises/<id>/chapitreN.js` (6 fichiers, 3 fiches chacun).
   - Choisis le langage : **langage réellement exécutable** si le domaine s'y prête
     (Python, Bash, PHP, JS, C, C++, Java…) ; sinon **fiches fidèles au domaine** (PowerShell, etc.)
     + vérification **structurelle** (§8.1).
   - Vérifie les 72 attendus **avant** de toucher au contenu : script de vérif dans `/tmp/verif-<id>.js`
     (copie du modèle `/tmp/verif-<cours-précédent>.js`), cible **`18 exercices / 72 checks / 0 échec`**.
   - Pièges rédactionnels récurrents (voir §9) : `\n` littéraux, `${...}` non échappés, `<`/`&lt;`,
     collisions d'entrées `stdin` entre exercices d'un même chapitre, `\n` final manquant.
2. **Agrégateurs + enregistrement** — `server/exercises/<id>.js`, `course-config.js`, `index.js`.
3. **Contenu** — `server/content/<id>.js` + `server/content/<id>/` (6 chapitres, agrégateurs, `pages/`).
   Écris **un fichier par chapitre / une page par module** (les gros `write_file` groupés se font couper).
4. **Génération** — `node scripts/generate-courses.js <id>` → **15 fichiers** (13 pages + `cours.css` + `cours.js`).
   Puis `node scripts/generate-code-labs.js` (0 fichier à écrire si `generate-courses` a finalisé).
5. **Nettoyage du dossier** — supprime stubs `chapitre-N.html`, `exercice-N.html`, anciens chapitres
   obsolètes, `.bak`, pages hors gabarit. **Conserve** les sources (PDF/PPTX/docx), les assets legacy et
   les pages spéciales tierces (ex. `qcm-100.html`).
6. **Marqueurs smoke** — ajoute 2 entrées (atelier + chapitre 1) dans le tableau `PAGES` de
   `scripts/smoke-code-lab.js`.
7. **Vérifications (§8)** puis **documentation (§11)**.

---

## 5. Accents, contraste et identité visuelle

### 5.1 Règle de contraste (PIÈGE MAJEUR, cause de rejets répétés)

`impeccable` (skill + CLI) émet des constats `low-contrast` classés **`warning` = NON-advisory**.
**Le critère de réussite est : 0 constat non-advisory** (les `em-dash-overuse` en advisory sont tolérés
1-2, style du cours).

**Un accent de marque clair (< 4.5:1 sur blanc) fait échouer la livraison.** Choisis toujours un accent
**foncé**, vérifie ≥ 4.5:1 sur `#ffffff` **dès la conception**, et assombris `accentDeep` en conséquence.

Accents **validés** (à titre d'exemples) : `#c2410c` (orange, 5,2:1), `#6d28d9` (violet), `#0e7490` (cyan, 5,36:1),
`#dc2626` (rouge), `#4f46e5` (indigo, 6,3:1), `#0369a1` (sky foncé, 5,93:1), `#0f766e` (teal, 5,5:1),
`#2563eb` (bleu, 5,2:1), `#b45309` (ambre foncé), `#7c3aed` (5,70:1), `#64748b` (4,76:1).

Accents **pièges** (à assombrir systématiquement) : `#0ea5e9` (2,77:1) → `#0369a1` ; `#06b6d4` (2,4:1) → `#0e7490` ;
`#f59e0b` → `#b45309` ; `#0d9488` (3,7:1) → `#0f766e` ; `#0284c7` → `#0369a1`.

**L'accent doit être aligné entre `server/courses.js` et `server/content/<id>.js`.** Après retouche,
**régénère** le cours et relance impeccable.

### 5.2 Balayage emoji / flèches

- **0 emoji** (toutes plages Unicode emoji + U+FE0F). Les dingbats comme `✔` (U+2714) sont **interdits**.
- **`→` (U+2192) est toléré** (notation). **`↑`, `↓`, `↔`, `←` NE SONT PAS tolérés** → remplace-les
  (par `→` ou par du texte, ex. `↔` → « et »).
- Pour scanner : **`grep`/python** (voir §9 : ripgrep/code_search cassés).

### 5.3 `<` brut

Dans un `<pre><code>` d'une page HTML, `<` doit être échappé en `&lt;` (le parseur déraille sinon).
MAIS dans `<script type="text/plain" data-lab-starter>` (starter lu via `textContent`), le code doit
être **brut** : premières lignes brutes, pas d'entités HTML.

---

## 6. Préfixes et identifiants

### 6.1 Préfixes déjà pris (NE PAS RÉUTILISER)

- **B1 (23 préfixes d'ateliers)** : `al` (algebre), `algo`, `ar` (architecture), `aw` (admin-windows),
  `bu` (bureautique), `c` (c-cpp), `cc` (ccna1), `cy` (cyber), `dr` (droit), `en` (anglais), `fr` (fr-pro),
  `gt` (git), `lx` (linux), `mr` (merise), `php`, `pr` (projet), `py` (python), `rb` (robotique),
  `re` (reseaux), `sq` (sql), `st` (stats), `vt` (virtualisation), `web` (prog-web).
- **B2 déjà pris** : `lx2` (linux), `php2` (php), `pb2` (probabilites), `java2` (rd_java),
  `ws2` (rd_winserver), `vm2` (admin-vm), `dr2` (droit), `rx2` (react), `fl2` (api-rest-flask), `erp2` (erp-si).

Les préfixes B2 suivants restent à **inventer** (court, distinct, sans collision) :
ingenierie-besoin, masterclass-apprendre, RD-RO, assembleur,
Cyber securite B2, sql, csharp, ccna, uml, uiux, docker, infographie, epreuves.

### 6.2 Identifiants

Format strictement `<préfixe>-c<chapitre>-e<exercice>` (ex. `vm2-c3-e2`), conforme à `/^[a-z0-9-]+$/`.
Un id dupliqué globalement fait **planter** `server/exercises/index.js` au require.

---

## 7. État d'avancement et ordre restant

### 7.1 Fait (vérifié)

- **B1** : les 24 modules B1 sont livrés au gabarit. 23 disposent d'ateliers de code ;
  `b1-vb-excel` n'a **pas** de sources et n'est pas converti.
- **B2 — 10 cours livrés** : `linux`, `php`, `probabilites`, `rd_java`, `rd_winserver`, `admin-vm`, `droit`, `react`, `api-rest-flask`, `erp-si`.
  Chacun : 18 fiches / 72 checks / 0 échec, 13 pages, vérifs complètes vertes, docs à jour.
- Outillage générique en place : gabarit `course-kit.js`, `generate-courses.js`, `generate-code-labs.js`,
  smoke, tests multi-langages, simulateur SQL.

### 7.2 Reste à faire — ordre d'exécution (registre `server/courses.js`, B2)

1. `ingenierie-besoin` (**prochain**)
2. `masterclass-apprendre`
3. `RD-RO`
4. `assembleur`
5. `Cyber securite B2` (attention : nom de dossier avec espace et casse mixte → **quote toujours**)
6. `sql`
7. `csharp`
8. `ccna`
9. `uml`
10. `uiux`
11. `docker`
12. `infographie`
13. `epreuves` (cas particulier : **entièrement protégé**, index et PDF compris ; `epreuves/` n'est **pas** dans `COURSE_DIRS` du build statique → uniquement servi en local/Render)

**Exclu** : `preparation-web` (section à mot de passe séparée).

Ensuite : statut « académie complète ». (B3 n'a **pas** été demandé à ce stade — ne pas l'entreprendre sans accord explicite.)

### 7.3 Comment redériver la vérité (ne jamais se fier à un chiffre de ce doc sans le vérifier)

```bash
npm test                    # suite complète (toujours 0 échec attendu)
npm run labs:check          # catalogue d'exercices synchronisé — compte ex. / cours
npm run courses:check       # pages générées synchronisées — compte pages / cours
npm run test:browser        # smoke navigateur (Chromium headless) — N pages [ok]
node -e "const C=require('./server/courses');console.log(Object.keys(C.COURSES).length, C.COURSES)"
```

**Compteurs observés après la livraison de `erp-si` (à revérifier, ils changent à chaque cours)** :
registre **71 cours** ; `labs:check` = **618 exercices / 33 cours** ; `courses:check` = **377 pages / 29 cours** ; `npm test` = **3482 tests / 0 échec** ; smoke code lab = **66 pages [ok]**.
Chaque nouveau cours ajoute **+18 exercices**, **+1 cours au catalogue labs**, **+13 pages** et **+1 cours au catalogue pages**.

---

## 8. Vérifications obligatoires (dans CET ordre, après CHAQUE cours)

> Scripts de vérification : relance-les **dans un nouveau processus** (le cache `require` fausse les
> résultats si tu réutilises le même process).

0. **Vérif gabarit du cours** — `node /tmp/verif-<id>.js` → attendu `<N> exercices / <3N> checks / 0 échec`
   (72 pour 18 fiches). Pour les langages non exécutables, c'est une vérif **structurelle** (§8.1).
1. `npm run labs:check` → **synchronisé** (le compte total augmente de 18 par nouveau cours).
2. `npm run courses:check` → **synchronisé** (le compte pages augmente de 13 par nouveau cours).
3. `npm test` → **0 échec** (nombre total croissant ; il descend parfois si des libellés de tests changent).
4. `node scripts/smoke-code-lab.js` → compte les lignes `[ok]` ; total attendu = **2 × nombre de cours + 1**
   (les 2 pages du nouveau cours ajoutées au tableau `PAGES`).
5. `npm run build` → OK, dossiers présents dans `dist/`, HTML auth injectés, **sans erreur**.
6. `node scripts/sync-courses.js` → « Synchronisation terminée (71 cours) » (si le registre a changé).
7. **`isProtected`** — vérifie sur le cours : `index.html` **public**, `chapitres/chapitre1.html` **public**,
   `sommaire.html` / `atelier.html` / `chapitres/chapitre2..6.html` / exercices / QCM **protégés**,
   `assets/**` **libres**. `epreuves/` = **tout protégé**.
8. **Scan emoji/flèches** — 0 emoji, 0 flèche non tolérée (`→` seul autorisé).
9. **`impeccable`** — `npx --no-install impeccable detect <les 13 fichiers> --json` → **0 constat non-advisory**
   (tableau racine JSON ; `em-dash-overuse` advisory toléré 1-2).
10. **Documentation** — rapport `.build-it-reports/…`, section `.taskstate/evidence.md`, mise à jour `AGENTS.md`.

### 8.1 Langages non exécutables localement (Java, PowerShell…)

`npm test` (`tests/exercise-solutions.test.js`) exécute réellement les corrigés **uniquement** pour
**python / shell / c / cpp / php / js**. Java et PowerShell sont **ignorés** (`toolFor` → null).
Dans ce cas :
- écris `/tmp/verif-<id>.js` = vérificateur **structurel** (présence/forme des champs, nombre de tests,
  `expected` non vides, ids conformes, pas de collision d'`stdin` intra-chapitre, starter non vide et
  distinct du corrigé) ;
- la cible reste **72/72 structurel, 0 échec** ;
- l'exécution réelle est **déléguée au fournisseur en production** (OANOR). C'est un état assumé à
  documenter comme **« IMPLEMENTED-NOT-VERIFIED »**, jamais comme « vérifié ».

### 8.2 Outils locaux — présents / absents

- **Présents** : `dotnet` (C#), `sqlite3`, `gcc`/`g++`, `python3`, `node`, `rustc`, `ruby`, `bash`,
  Chromium, `tools/php-cli/php` (8.5.8).
- **Absents** : `java`/`javac`, `php` système (utiliser `tools/php-cli/php`), `go`, `pwsh`/`powershell`.
- `powershell` est un langage **Monaco vendoré** (`assets/vendor/monaco/vs/basic-languages/powershell/powershell.js`) :
  l'éditeur se monte normalement même sans exécution.

---

## 9. Pièges critiques (déjà rencontrés et résolus — ne pas les reproduire)

### 9.1 Outils d'écriture

- **`write_file` écrit LITTÉRALEMENT.** Les échappements doivent être exactement ceux que tu veux voir
  dans le fichier. Dans un fichier JS, `\'` dans une chaîne simple via `write_file` fonctionne.
- **`str_replace` décode UNE FOIS.** Évite les antislashs dans les `newString`. Les `str_replace` sur des
  chaînes contenant un `\n` littéral échouent souvent (« was not found in the file ») → dans ce cas,
  **réécris le fichier entier** avec `write_file`.
- **Les gros appels `write_file` groupés se font couper** → fractionne : **un fichier par chapitre,
  une page par module**.

### 9.2 Contenu des exercices (récidives documentées)

- **`\n` littéraux** : dans un template literal, écris `\n` (jamais `\\n`). Des scripts de correction
  `sed` ont réparé 72 occurrences à plusieurs reprises.
- **`${...}` non échappés** dans un template literal → `SyntaxError` (« private field », etc.). Échappe.
- **`<` vs `&lt;`** : brut dans le starter `text/plain` ; `&lt;` dans les `<pre><code>` des pages.
- **Collisions d'`stdin` intra-chapitre** : l'exemple visible d'un exercice ne doit pas divulguer l'entrée
  d'un test caché d'un autre exercice du même chapitre. Différencie les entrées.
- **`\n` final** : pense au saut de ligne final de chaque `stdin` (le dernier `read` échoue à l'EOF sinon).
- **Starter non fonctionnel** : le starter doit démarrer proprement **et** échouer au moins un test
  (sauf sujet explicitement « plantage »). Corrige les stubs qui planteraient à l'ouverture.
- **`data-stdin="..."` doit encoder les sauts de ligne en `&#10;`**, mais le **starter** (dans
  `<script type="text/plain" data-lab-starter>`) doit rester **brut** (`readStarter` lit `node.textContent`).

### 9.3 Environnement / outillage

- **`run_code_search`/ripgrep sont CASSÉS** → utilise **`grep`** et/ou **python**.
- **NE PAS éditer `dist/` à la main.** `dist/` est généré ; `scripts/build.js` le supprime et le recrée.
- **PAS de dépôt git** dans cet espace de travail : n'initialise rien, ne lance aucune commande git
  sans demande explicite. (Certains outils affichent des métadonnées git indisponibles : c'est normal.)
- **`npm run stop`** utilise `taskkill /F /IM node.exe` (Windows) : **ne l'utilise pas**.
- **Cache `require`** : relance les scripts de vérification dans un **nouveau** processus.
- **Noms de dossiers avec espaces/casse** (`Cyber securite B2`, `cours windows/`) : **quote** toujours.

### 9.4 Vérificateurs / smoke

- `scripts/smoke-code-lab.js` : le `marker` est testé contre `info.viewText` (= starter affiché),
  **pas** contre le brief. Monaco restitue parfois les espaces en **U+00A0** : le smoke normalise déjà,
  mais garde ça en tête pour tes marqueurs.
- `generate-courses.js --check` exige que le contenu généré soit **déjà** celui attendu.

---

## 10. Skills à utiliser obligatoirement

Ces skills sont installés dans `.agents/skills/` (voir `skills-lock.json`). **Charge-les avec l'outil
`skill` et applique-les.** Le projet a été mené avec elles : ne les contourne pas.

### 10.1 Cœur — obligatoires pour tout cours

| Skill | Usage attendu |
|---|---|
| **`build-it`** | Orchestrateur de livraison guidée par objectif + Definition of Done. C'est lui qui tient `.taskstate/` (run state) et `.build-it-reports/` (preuves). **Toute la mission suit son contrat** : critères vérifiables, ledger de preuves, passe de vérification « fresh eyes ». |
| **`verification-before-completion`** | Interdit de déclarer « terminé » sans preuve exécutée. Chaque verdict s'appuie sur une commande et sa sortie. |
| **`test-driven-development`** | Les exercices sont testés **avant** d'être considérés livrés (72/72). |
| **`systematic-debugging`** | Pour tout échec (starter qui plante, attendu faux, collision) : hypothèse → preuve → correctif → re-test. |
| **`browser-testing-with-devtools`** | Pour le smoke Chromium/CDP (`smoke-code-lab.js`, `smoke-sql-simulator.js`). |
| **`documentation-and-adrs`** | `.build-it-reports/`, `.taskstate/evidence.md`, `AGENTS.md` : documentation factuelle des décisions et preuves. |
| **`constraint-driven-development`** | Les contraintes durables (accents AA, 13 pages, 6 chapitres, 0 emoji, périmètre) sont des invariants non négociables. |
| **`incremental-implementation`** | Un cours à la fois, un fichier à la fois, vérifié à chaque étape. |

### 10.2 Complémentaires — à charger selon le besoin

| Skill | Usage |
|---|---|
| **`impeccable`** (également CLI `npx --no-install impeccable detect`) | Contrôle qualité UI : 0 constat non-advisory. **Obligatoire à chaque cours.** |
| `frontend-ui-engineering` | Pour toute retouche de page/HTML/CSS. |
| `code-review-and-quality` | Relecture critique avant validation. |
| `source-driven-development` | Le contenu pédagogique dérive des **sources** (PDF/PPTX du dossier canonique), jamais de l'imagination. |
| `doubt-driven-development` | Pour re-tester un point douteux (ex. un attendu « qui a l'air juste »). |
| `planning-and-task-breakdown` / `executing-plans` / `writing-plans` | Décomposer un cours en étapes et suivre le plan. |
| `debugging-and-error-recovery`, `context-engineering` | Récupération d'erreur et tenue du contexte. |

> Si un skill manque : `npx skills add <repo> --skill <name> --yes` (demander d'abord à l'utilisateur),
> ou `skill` pour recharger. Les skills communautaires ne sont pas validées : les confirmer avant install.

---

## 11. Documentation à tenir (obligatoire, fait partie de la Definition of Done)

Après chaque cours livré :

1. **`.build-it-reports/code-lab-<niveau>-<id>.md`** — rapport de livraison : périmètre, décisions,
   catalogue, contenu, corrections, vérifications (avec sorties citées), état NON VÉRIFIÉ.
2. **`.taskstate/evidence.md`** — ajouter une section `## Cours n°<N> <niveau> : <id>` avec commandes,
   sorties citées et verdict (format : `[heure] · critère · commande · sortie citée · verdict`).
3. **`AGENTS.md`** — mettre à jour : le catalogue d'exercices (ajouter `<id>.js`), le compteur de cours
   (« twenty-nine courses » → suivant, etc.), la liste des cours générés, et la note de langage si
   non exécutable.

**Dette de documentation** : aucune dette restante (`admin-vm` et `droit` sont documentés dans `.build-it-reports/`, `.taskstate/evidence.md` et `AGENTS.md`).

---

## 12. Variables d'environnement et états non vérifiables

`.env` existe localement et est ignoré. **Ne jamais committer de secret.**

**Requis au démarrage de `server.js`** : `DATABASE_URL`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.
**Optionnels** : `PORT` (défaut 3000), `NODE_ENV`, `COOKIE_DOMAIN`, `KEY_CLASS` (défaut `b2`),
`OPENROUTER_API_KEY` (active `/api/ai-chat`), `PREPARATION_PASSWORD` (active Preparation Web),
`OANOR_API_KEY` (exécution réelle du code).

**NON VÉRIFIABLE en session** (clés absentes de `.env`) :
- l'**exécution réelle** des exercices par le service OANOR ;
- le **tuteur IA en direct** (OpenRouter).
Ces points doivent toujours être listés comme **« IMPLEMENTED-NOT-VERIFIED »** dans la documentation,
jamais présentés comme vérifiés. Aucune DB PostgreSQL locale ni navigation navigateur interactive
non plus : la vérification est **statique/headless** (build, tests, smoke Chromium).

---

## 13. Ce qu'il reste à implémenter (récapitulatif actionnable)

1. **15 cours B2** dans l'ordre de §7.2 (`react` en premier) + `epreuves`.
2. Ne rien entreprendre sur **B3** sans accord explicite.
3. Ne pas toucher à `preparation-web`.
4. Quand un cours non-programmable arrive : décider **langage exécutable si le domaine s'y prête**,
   sinon **fiches fidèles au domaine + vérif structurelle**.
5. Maintenir `AGENTS.md`, `.taskstate/evidence.md`, `.build-it-reports/` à chaque livraison.

---

## 14. Checklist de livraison d'un cours (à cocher, dans l'ordre)

```
[ ] 1.  server/exercises/<id>/chapitre1..6.js écrits (3 fiches chacun)
[ ] 2.  /tmp/verif-<id>.js → 18 exercices / 72 checks / 0 échec
[ ] 3.  server/exercises/<id>.js + course-config.js + index.js enregistrés
[ ] 4.  server/content/<id>.js + server/content/<id>/ (chapitres, agrégateurs, pages)
[ ] 5.  node scripts/generate-courses.js <id> → 15 fichiers
[ ] 6.  node scripts/generate-code-labs.js → 0 fichier
[ ] 7.  pages obsolètes supprimées ; sources/assets legacy conservés
[ ] 8.  2 entrées ajoutées dans PAGES (smoke-code-lab.js)
[ ] 9.  npm run labs:check            → synchronisé
[ ] 10. npm run courses:check         → synchronisé
[ ] 11. npm test                      → 0 échec
[ ] 12. node scripts/smoke-code-lab.js→ (2 × cours) + 1 lignes [ok]
[ ] 13. npm run build                 → OK, dossier présent dans dist/
[ ] 14. node scripts/sync-courses.js  → « 71 cours » (si registre modifié)
[ ] 15. isProtected                   → index + ch1 publics, reste protégé, assets libres
[ ] 16. scan emoji/flèches            → 0 emoji, 0 flèche non tolérée
[ ] 17. impeccable                    → 0 constat non-advisory (13 fichiers)
[ ] 18. doc : rapport + evidence.md + AGENTS.md
```

---

## 15. Rappels transversaux (non négociables)

- **Réponds en français.** Code et identifiants en anglais.
- **Un cours à la fois.** Aucune régression tolérée.
- **`server/courses.js` est la source de vérité** ; tout dérivé doit être resynchronisé.
- **Accent de marque ≥ 4.5:1 sur blanc, dès la conception.**
- **13 pages / 6 chapitres / 18 fiches (72 checks) par cours.**
- **0 emoji, `→` seul toléré.**
- **Ne pas éditer `dist/`, ne pas lancer `npm run stop`, pas de git non demandé.**
- **`write_file` littéral, `str_replace` à éviter sur les chaînes à antislashs, fractionner les gros écris.**
- **Toujours citer une commande + sa sortie** pour étayer un verdict ; sans preuve, ce n'est pas « vérifié ».
- **Ce document doit rester à jour** : si une convention change, mets `instructions.md` à jour.

---

*Fin du contrat de passation. Toute ambiguïté restante doit être tranchée par l'utilisateur
(ou par le code et les commandes de vérification), pas par supposition.*
