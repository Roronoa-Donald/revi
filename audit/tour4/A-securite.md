# Lot A — Sécurité : Remédiation K1 (`audit/tour4/A-securite.md`)

- **Branche Git** : `tour4-lot-a`
- **Périmètre** : Point **K1** exclusivement (aucun autre fichier ni contenu modifié).

---

## 1. Détail des Corrections Appliquées (K1.1 à K1.6)

| Sous-point | Fichier(s) modifié(s) | Correction appliquée |
| :--- | :--- | :--- |
| **K1.1** — Suppression de `runShell` et retrait de `shell/bash/sh` | `server/services/execution/local-runner.js` | Suppression complète de `runShell()`. Retrait de `shell`, `bash`, `sh` de `canHandle()` (`SUPPORTED_LOCAL_LANGUAGES = {'python', 'py', 'javascript', 'js', 'algo', 'pseudo-code', 'pseudocode', 'sql', 'analyse'}`). Aucun appel à `spawn('/bin/bash'…)`, `spawn('sh'…)`, `exec` ou `execSync` n'existe dans `server/`. |
| **K1.2** — Exécution `shell` et `csharp` via Piston uniquement (Fail-Closed) | `server/services/execution/index.js` | Pour `shell` et `csharp` (ainsi que tout langage hors `ISOLATED_LOCAL_LANGUAGES`), l'exécution passe exclusivement par Piston. En cas de panne, d'erreur HTTP ou d'absence de `PISTON_URL`, aucun repli local n'a lieu et l'élève reçoit le message explicite : *« Le moteur d’exécution est temporairement indisponible. »* |
| **K1.3** — Repli local désactivé par défaut (`false`) | `server/services/execution/index.js` | Remplacement de `process.env.ALLOW_LOCAL_EXECUTION_FALLBACK !== 'false'` par une activation explicite stricte (`deps.allowLocal === true || process.env.ALLOW_LOCAL_EXECUTION_FALLBACK === 'true'`) restreinte aux seuls langages de `ISOLATED_LOCAL_LANGUAGES`. |
| **K1.4** — Proposition pour les déploiements sans Piston (`render.yaml`) | Voir section 4 ci-dessous | Analyse comparative et recommandation soumise à votre décision (ajouter `PISTON_URL` dans `render.yaml` vs repasser les cours `shell`/`csharp` en mode `analyse`). |
| **K1.5** — Isolation, timeout, mémoire et sortie de `runSql` | `assets/js/engines/sql-wasm-engine.js`, `server/services/execution/isolated-worker.js`, `server/services/execution/local-runner.js` | 1. Dans `sql-wasm-engine.js` : exécution pas à pas via `db.prepare(stmt)` + `prepared.step()` avec contrôle à chaque ligne du délai maximal (`DEFAULT_TIMEOUT_MS = 3000` ms) et du plafond de lignes (`MAX_SELECT_ROWS = 2000`) bloquant toute requête `WITH RECURSIVE` infinie, + plafonnement de la sortie à `64 Ko`.<br>2. Côté serveur : `runSql` s'exécute désormais à l'intérieur de `isolated-worker.js` (processus enfant jetable sans `process.env`, `--max-old-space-size=64`, `--permission` restreint et `SIGKILL` sur timeout). |
| **K1.6** — Plafonnement des sorties (`stdout`, `stderr`) sur tous les chemins locaux | `server/services/execution/local-runner.js`, `server/services/execution/isolated-worker.js` | Application systématique de `capOutput(..., MAX_OUTPUT_BYTES)` (`65 536` octets = 64 Ko) sur `stdout` et `stderr` dans `runInIsolatedWorker`, `runPython`, `runJavaScript`, `runPseudoCode`, `runSql` et `runAnalyse`. |

---

## 2. Tableau Comparatif Avant / Après et Sorties Brutes (Annexe A)

### Commande exécutée
```bash
JWT_SECRET=SECRET_DE_TEST node audit/tour4/scripts/check-no-local-shell.js
```

| Vérification (`check-no-local-shell.js`) | Avant K1 | Après K1 | Attendu |
| :--- | :--- | :--- | :--- |
| `lr.canHandle('shell')` | `true` | **`false`** | `false` |
| `typeof lr.runShell` | `'function'` | **`'undefined'`** | `'undefined'` |
| Lecture de `/proc/$PPID/environ` (`JWT_SECRET`) | `JWT_SECRET=SECRET_DE_TEST` (fuite confirmée) | **`ok: false`, `stdout: ""`** (aucune fuite) | Aucun secret |
| Lecture de `/etc/passwd` | `root:x:0:0:root:/root:/bin/bash...` | **`ok: false`, `stdout: ""`** (aucun fichier lu) | Aucun fichier |
| Connexion TCP `/dev/tcp/api.github.com/443` | Exécution de `/bin/bash` tentée | **`ok: false`, `stdout: ""`** (aucun processus lancé) | Aucune connexion |

### Sortie brute AVANT K1
```text
canHandle(shell)= true  (attendu: false)
runShell exporté = function  (attendu: undefined)
{"ok":true,"httpStatus":200,"data":{"stdout":"JWT_SECRET=SECRET_DE_TEST\n","stderr":"","exit_code":0}}
{"ok":true,"httpStatus":200,"data":{"stdout":"root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\n","stderr":"","exit_code":0}}
{"ok":true,"httpStatus":200,"data":{"stdout":"","stderr":"bash: line 1: api.github.com: Temporary failure in name resolution\nbash: line 1: /dev/tcp/api.github.
```

### Sortie brute APRÈS K1
```text
canHandle(shell)= false  (attendu: false)
runShell exporté = undefined  (attendu: undefined)
{"ok":false,"httpStatus":503,"data":{"stdout":"","stderr":"","message":"Le moteur d’exécution est temporairement indisponible (langage shell non exécutable loca
{"ok":false,"httpStatus":503,"data":{"stdout":"","stderr":"","message":"Le moteur d’exécution est temporairement indisponible (langage shell non exécutable loca
{"ok":false,"httpStatus":503,"data":{"stdout":"","stderr":"","message":"Le moteur d’exécution est temporairement indisponible (langage shell non exécutable loca
```

---

## 3. Sorties des Contrôles Automatisés (`courses:check`, `labs:check`, `tests/no-local-shell.test.js`, `npm test`)

```text
> node scripts/generate-courses.js --check
[ok] cours à jour (832 pages, 64 cours)

> node scripts/generate-code-labs.js --check
[ok] ateliers à jour (1250 exercices, 68 cours)

> node --test tests/no-local-shell.test.js
TAP version 13
# Subtest: K1 — Suppression de l’exécution locale de shell et durcissement Fail-Closed
    ok 1 - canHandle(shell/bash/sh) vaut false et runShell n’existe plus
    ok 2 - (a) Panne de Piston sur shell/csharp : aucun processus /bin/bash ou sh n’est lancé (espion child_process.spawn)
    ok 3 - (b) Requête shell et csharp sans Piston configuré : renvoie l’erreur « indisponible », jamais de repli local
    ok 4 - (c) Recherche textuelle : aucun spawn/exec de shell (/bin/bash, /bin/sh, exec, execSync) dans server/services/
    ok 5 - (d) runSql : limite de lignes/mémoire et timeout sur requête WITH RECURSIVE infinie + plafonnement 64 Ko
    1..5
ok 1 - K1 — Suppression de l’exécution locale de shell et durcissement Fail-Closed
# tests 5 | pass 5 | fail 0
```
L'ensemble des 20 fichiers de tests (`tests/*.test.js`, soit `7 365` assertions au total incluant `tests/no-local-shell.test.js`) passe à 100 % (`0 fail`).

---

## 4. Décision Attendue sur K1.4 (`PISTON_URL` obligatoire vs retour en `analyse`)

Aujourd'hui, `vercel.json` configure déjà `PISTON_URL` (`https://emkc.org/api/v2/piston`), mais `render.yaml` et `.env.example` ne le déclaraient pas comme obligatoire. Deux options s'offrent à vous pour les cours `shell` (`b1-linux`, `b1-git`, `linux`, `b3-linux`, `b3-github`, `docker`) et `csharp` (`csharp`) :

1. **Proposition 1 (Recommandée) — Documenter et configurer `PISTON_URL` dans `render.yaml` et `.env.example`** :
   - Ajouter `PISTON_URL: https://emkc.org/api/v2/piston` dans `render.yaml` (comme c'est déjà le cas dans `vercel.json`) et documenter `PISTON_URL` dans `.env.example` et `README.md`.
   - **Avantage** : conserve de vrais exercices Bash et C# (alignés sur l'épreuve écrite officielle de 3h de code C# de B2) tout en garantissant par K1 qu'aucune commande n'est jamais exécutée sur le serveur applicatif (si Piston est indisponible, l'étudiant reçoit proprement « moteur d'exécution temporairement indisponible »).
2. **Proposition 2 — Repasser `b3-linux`, `b3-github`, `docker` (voire tous les cours `shell`/`csharp`) en mode `analyse`** :
   - **Avantage** : fonctionne 100 % hors-ligne même sans Piston.
   - **Inconvénient** : prive les étudiants de l'exécution réelle en Linux/Git/Docker et C#.
