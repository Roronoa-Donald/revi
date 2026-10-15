# Repository Guidelines

## Project Overview

This repository is a French interactive course site with an activation-key auth layer.

- Root static pages and course folders are served directly in local/Render mode by `server.js`.
- API routes are built with Fastify in `server/app.js` and registered from `server/routes/`.
- Vercel uses `api/index.js` as the serverless Fastify entry point and `middleware.js` for edge access checks.
- `scripts/build.js` generates the static `dist/` output and injects auth/chat scripts into HTML files.

## Key Paths

- `server.js`: local/Render entry point, static file server, auth injection, protected content checks.
- `server/app.js`: shared Fastify app, plugins, rate limiting, API route registration.
- `server/db.js`: PostgreSQL connection, schema creation/migrations, key/session/log helpers.
- `server/routes/auth.js`: activation, verification, logout, course metadata.
- `server/routes/admin.js`: admin login and activation key management.
- `server/routes/ai-chat.js`: authenticated OpenRouter proxy for RD-AI chat.
- `server/routes/preparation.js`: Preparation Web section API (B2 key + section password), backed by `server/preparation-content.js`.
- `server/utils/keygen.js`: activation key generation helper.
- `server/utils/auth.js`: shared cookie/JWT check for API routes (`requireUser`, `quotaKey`).
- `server/services/execution/`: the only place that talks to code-execution providers. `piston.js` is the adapter for Piston (`PISTON_URL`, optional `PISTON_API_KEY`, endpointUrl, timeout, retry), `oanor.js` is the fallback adapter (URL, `x-oanor-key`, timeout, retry), `index.js` validates inputs and normalises responses into a stable internal shape, `languages.js` is the executable allowlist, `budget.js` is the daily quota guard.
- `server/exercises/`: exercise catalogue (`b1-python.js`, `b1-c-cpp.js`, `b1-algo.js`, `b1-php.js`, `b1-algebre.js`, `b1-stats.js`, `b1-prog-web.js`, `b1-robotique.js`, `b1-linux.js`, `b1-git.js`, `b1-cyber.js`, `b1-merise.js`, `b1-droit.js`, `b1-anglais.js`, `b1-fr-pro.js`, `b1-reseaux.js`, `b1-bureautique.js`, `b1-ccna1.js`, `b1-architecture.js`, `b1-admin-windows.js`, `b1-virtualisation.js`, `b1-projet.js`, `b1-sql.js`, `linux.js`, `php.js`, `probabilites.js`, `rd_java.js`, `rd_winserver.js`, `admin-vm.js`, `droit.js`, `react.js` (hidden tests and solutions included), course configuration (`course-config.js`: which courses have code labs, their folder, chapter count and id prefix — shared by the generator and the tests), registry (`index.js`, `toClient()` never exposes tests or solutions) and grading engine (`runner.js`, sequential with short-circuit).
- `server/routes/execute.js`: `/api/execute` and `/api/execute/languages`.
- `server/routes/exercises.js`: `/api/exercise/submit` (runs hidden tests) and `/api/code-help` (tutor: explanations only, never code).
- `assets/vendor/monaco/`: vendored Monaco Editor AMD build. Not an npm dependency (see `scripts/vendor-monaco.js`).
- `assets/js/code-lab.js` + `assets/css/code-lab.css`: client code lab (editor, console, tutor). Any page with `<div class="lab" data-lab>` gets the full widget.
- `server/middleware/access-control.js`: canonical course list, themes, icons, and protected-content logic for Node serving.
- `middleware.js`: Vercel edge copy of the protected-content logic (keep in sync with access-control.js).
- `rd-ai-chat.js` (root): client-side chat widget injected into pages; calls `/api/ai-chat`. Keep the API key server-side.
- `vercel.json`: rewrites `/api/*` to `api/index.js`, includes `server/**` in the function bundle, sets security headers.
- `public/`: auth/admin assets served under `/_auth/` (`activate.html`, `admin/login.html`, `admin/dashboard.html`).
- Canonical course registry: `server/courses.js` (`COURSES`, keyed by course folder, with level/icon/theme) is the single source of truth; `access-control.js`, `middleware.js`, `scripts/build.js` and `public/js/auth-check.js` derive from it (`node scripts/sync-courses.js`). It currently lists 24 B1, 24 B2 and 23 B3 courses, including `b1-python/`, `b1-c-cpp/`, `b1-algo/`, `b1-php/`, `b1-algebre/`, `b1-stats/`, `b1-prog-web/`, `b1-robotique/`, `b1-linux/`, `b1-git/`, `b1-cyber/`, `b1-merise/`, `b1-droit/`, `b1-anglais/`, `b1-fr-pro/`, `b1-reseaux/`, `b1-bureautique/`, `b1-ccna1/`, `b1-architecture/`, `b1-admin-windows/`, `b1-virtualisation/`, `b1-projet/` and `b1-sql/` (the thirty-four courses that ship code labs, the B2 `linux/`, `php/`, `probabilites/`, `rd_java/`, `rd_winserver/`, `admin-vm/`, `droit/`, `react/`, `api-rest-flask/`, `erp-si/`, `ingenierie-besoin/`, `masterclass-apprendre/`, `RD-RO/` and `assembleur/` included; `b1-sql/` additionally ships a client-side SQL simulator: sql.js/WebAssembly vendored in `b1-sql/assets/vendor/sqljs/`, served with the `application/wasm` MIME type).
- Folders on disk but NOT in the canonical list (legacy/source material, not served as courses): `b1/`, `droitb2/`, `cours windows/`, `administration machine virtuel/`, `roadmap/`.

## Commands

- Install dependencies: `npm install`
- Run locally with file watching: `npm run dev`
- Run locally without watch: `npm start`
- Regenerate a course's pages from its content module (pages + code labs in one pass): `npm run courses` (single course: `npm run courses -- b1-algebre`)
- Verify those pages are in sync: `npm run courses:check`
- Regenerate code labs only, for courses whose pages are hand-written: `node scripts/generate-code-labs.js`
- Verify code labs are in sync (used by the test suite): `npm run labs:check`
- Refresh the vendored Monaco build: `npm run vendor:monaco`
- Headless browser smoke test for the code lab (needs Chromium): `npm run test:browser`
- Headless browser smoke test for the b1-sql SQL simulator (needs Chromium): `node scripts/smoke-sql-simulator.js`
- Build static output: `npm run build`
- Vercel build command: `npm run vercel-build`

There is no test script configured in `package.json`. For code changes, use the narrowest practical smoke check:

- API/server changes: run `npm run dev` if environment variables and PostgreSQL are available.
- Static/build changes: run `npm run build` and inspect the generated `dist/`.
- Frontend changes: open the affected page locally and verify auth script injection does not break layout.

## Environment

`server.js` requires these variables before startup:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Optional variables used by the app:

- `PORT` defaults to `3000`.
- `NODE_ENV=production` enables production cookie/security behavior and PostgreSQL SSL handling.
- `COOKIE_DOMAIN` sets auth/admin cookie domain when needed.
- `KEY_CLASS` defaults to `b2` for admin key filtering.
- `OPENROUTER_API_KEY` enables `/api/ai-chat`.
- `PREPARATION_PASSWORD` enables the Preparation Web section (route + section gate); without it the section is disabled.
- `PISTON_URL` configures the Piston code execution engine URL (e.g. `https://piston.yourdomain.com` or `http://vps-ip:2000`). When present, Piston is used as the primary server execution engine.
- `PISTON_API_KEY` (optional) authenticates requests to secured Piston instances (sent via `Authorization` and `x-api-key`).
- `OANOR_API_KEY` enables fallback code execution via Oanor API. Without either PISTON_URL or OANOR_API_KEY, server execution returns 503. Keys and internal URLs stay server-side and are never logged nor returned.
- `OANOR_BASE_URL` overrides the Oanor fallback base URL (default `https://api.oanor.com/codeexec-api`).
- `CODE_EXEC_TIMEOUT_MS` caps one execution round-trip (default 20000).
- `EXEC_DAILY_LIMIT_PER_USER` and `EXEC_DAILY_LIMIT_GLOBAL` bound daily executions (defaults 40 and 900). The counter lives in process memory: on serverless it is per-instance, the provider's own 429 is the real backstop.
- `AI_HELP_MODEL` overrides the tutor model for `/api/code-help` (default `deepseek/deepseek-chat`).
- `PYTHON_BIN` and `CHROME_BIN` point the test suite at a specific interpreter or browser.

Never commit `.env` or secrets. `.env` is ignored and may exist locally.

## Development Notes

- Keep access-control course lists in sync across `server/middleware/access-control.js`, `middleware.js`, and `scripts/build.js` when adding/removing courses. Known current discrepancy: `roadmap/` is still in `scripts/build.js` `COURSE_DIRS` but was dropped from the canonical `COURSES` lists.
- Course folder names include spaces and mixed case, especially `Cyber securite B2`; quote paths in shell commands.
- `dist/` is generated output. Do not hand-edit it unless the user explicitly asks.
- `scripts/build.js` deletes and recreates `dist/`; avoid running it if preserving local generated output matters. Note: `epreuves/` is not in the build's `COURSE_DIRS`, so it is only served in local/Render mode, not in the static `dist/` build.
- `server/db.js` creates and migrates PostgreSQL tables at startup, so DB changes need extra care.
- Auth cookies are HTTP-only. Browser-side auth state usually depends on `/api/verify`.
- Protected content rules currently make course indexes and chapter 1 public, protect later HTML/PDF content, and always protect QCM data. `epreuves/` is fully protected (index and PDFs included). `preparation-web/` requires both a B2 key and the section password; its `assets/` stay free.
- If changing AI chat behavior, keep the API key server-side only and preserve request-size/rate-limit protections.
- Course pages come in two flavours. Hand-written courses (`b1-python/`, `b1-c-cpp/`, `b1-algo/`, `b1-php/`) are edited directly. Generated courses (`b1-algebre/`, `b1-stats/`, `b1-prog-web/`, `b1-robotique/`, `b1-linux/`, `b1-git/`, `b1-cyber/`, `b1-merise/`, `b1-droit/`, `b1-anglais/`, `b1-fr-pro/`, `b1-reseaux/`, `b1-bureautique/`, `b1-ccna1/`, `b1-architecture/`, `b1-admin-windows/`, `b1-virtualisation/`, `b1-projet/`, `b1-sql/`, `linux/`, `php/`, `probabilites/`, `rd_java/`, `rd_winserver/`, `admin-vm/`, `droit/`, `react/` and the ones that follow) keep their content in `server/content/<course>.js` (+ a `server/content/<course>/` folder) and are rendered by `scripts/generate-courses.js` through `scripts/course-kit.js` (page shell, chapter template, QCM, flashcards, and the per-course `cours.css` / `cours.js` built from `scripts/templates/`). Never hand-edit a generated page: run `npm run courses`. The generator also finalizes the code labs, so pages and labs can no longer drift apart.
- Exercise content lives in `server/exercises/` (statement, starter, visible example, hidden tests, solution). Never let tests or solutions reach the browser: `toClient()` is the only projection, and `tests/exercises.test.js` checks the served pages for leaks.
- B1 course content must come from the canonical source folder `cours B1 IT/` (one folder per course, e.g. `ADMIN_WINDOWS/` for `b1-admin-windows`, `Virtualisation des serveurs/` for `b1-virtualisation`). After an audit, `b1-admin-windows` (Dr Abasse KPEGOUNI: admin système, Windows Server 2012 R2, configuration initiale, Active Directory AD DS) and `b1-virtualisation` (the story « Le serveur fainéant et les machines ambitieuses » + its comprehension/technical/reflection questions) were rebuilt from these canonical sources; the former B2/B3-flavoured content (maintenance/sauvegardes/haute dispo from `cours windows/`, Proxmox/LVM/VLAN from `administration machine virtuel/`) no longer feeds any B1 course.
- B2 courses (the historical root folders: `linux/`, `php/`, `probabilites/`, `rd_java/`, …) are being migrated to the same kit gabarit as B1, in registry order, without regression on any course (each pass re-runs the full suite: `npm test`, `labs:check`, `courses:check`, `smoke-code-lab.js`, `build`, `sync-courses.js`, protection/emoji/impeccable checks). All twenty-two courses are now delivered and verified: `linux/` (Administration Linux B2, idPrefix `lx2`, 18 Bash exercises), `php/` (PHP POO B2, idPrefix `php2`, 18 PHP exercises), `probabilites/` (Probabilités B2, idPrefix `pb2`, 18 Python exercises), `rd_java/` (Java B2, idPrefix `java2`, 18 Java exercises), `rd_winserver/` (Windows Server B2, idPrefix `ws2`, 18 PowerShell exercises), `admin-vm/` (Administration des Machines Virtuelles B2, idPrefix `vm2`, 18 PowerShell exercises), `droit/` (Droit Informatique B2, idPrefix `dr2`, 18 Bash exercises), `react/` (React B2, idPrefix `rx2`, 18 JavaScript exercises), `api-rest-flask/` (API REST avec Flask B2, idPrefix `fl2`, 18 Python exercises), `erp-si/` (ERP & SI B2, idPrefix `erp2`, 18 Python exercises), `ingenierie-besoin/` (Ingénierie du besoin B2, idPrefix `ib2`, 18 Python exercises), `masterclass-apprendre/` (Masterclass Apprendre à apprendre B2, idPrefix `mc2`, 18 Python exercises), `RD-RO/` (Recherche Opérationnelle B2, idPrefix `ro2`, 18 Python exercises), `assembleur/` (Architecture & Programmation en Assembleur B2, idPrefix `asm2`, 18 Python exercises), `Cyber securite B2/` (Cybersécurité B2, idPrefix `cs2`, 18 Python exercises), `sql/` (SQL B2, idPrefix `sql2`, 18 Python exercises), `csharp/` (C# B2, idPrefix `csb2`, 18 Python exercises), `ccna/` (CCNA Réseau B2, idPrefix `na2`, 18 Python exercises), `uml/` (UML B2, idPrefix `um2`, 18 Python exercises), `uiux/` (UI/UX Design B2, idPrefix `ux2`, 18 Python exercises), `docker/` (Docker B2, idPrefix `dk2`, 18 Python exercises) and `infographie/` (Infographie B2, idPrefix `ig2`, 18 Python exercises).
- B3 courses (the 23 courses of Bachelor 3) are migrated to the same 13-page kit standard with 18 code lab exercises each. All twenty-three courses are now delivered and verified: `b3-algo/` (Algorithmique B3, idPrefix `al3`), `b3-cloud-computing/` (`cc3`), `b3-devops/` (`do3`), `b3-document-technique/` (`dt3`), `b3-etude-quantitative/` (`eq3`), `b3-firewall/` (`fw3`), `b3-github/` (`gh3`), `b3-linux/` (`lx3`), `b3-agile/` (`ag3`), `b3-pfsense/` (`pf3`), `b3-reseau-lan/` (`lan3`), `b3-sql/` (`sql3`), `b3-veille/` (`vlg3`), `b3-windows-server/` (`win3`), `b3-anglais/` (`an3`), `b3-cloud-azure/` (`az3`), `b3-cryptographie/` (`cr3`), `b3-google-cloud/` (`gcp3`), `b3-hacking/` (`hk3`), `b3-cloud-aws/` (`aws3`), `b3-supervision/` (`sup3`), `b3-voip/` (`vo3`) and `b3-virtualisation/` (Virtualisation Avancée B3, idPrefix `vrt3`, 18 Python exercises). `kit.chapter` accepts an optional `lockLabel` on a chapter so B3 courses read “Réservé B3 et plus”.
- After editing an exercise, run `npm run courses` (generated courses) or `node scripts/generate-code-labs.js` (hand-written ones) — the chapter pages are generated from the catalogue, and `tests/exercises.test.js` fails on drift.
- To add a course with code labs: declare it in `server/exercises/course-config.js` (folder, chapters, id prefix), add its catalogue `server/exercises/<id>.js`, register it in `server/exercises/index.js`, then run the generator. If the course's pages are generated, also add `server/content/<id>.js` and extend `scripts/smoke-code-lab.js` with a page from its atelier and one from a chapter. The generator and the tests pick it up automatically; `assets/js/code-lab.js` keys local drafts by the first path segment, so courses never mix. `tests/exercise-solutions.test.js` compiles and runs Python/C/C++/PHP/JavaScript/Bash solutions when the local toolchain is available (JavaScript via the local `node` binary, Bash via `/bin/bash`); the PHP CLI (absent from system packages) ships as a vendored portable binary in `tools/php-cli/` (outside every served folder).
- A generated course can have NO code labs (e.g. `b1-sql/`): register no catalogue for it and the generator leaves its chapters untouched (no empty exercises section, chapter numbering preserved). Give it a dedicated simulator instead — for SQL, a client-side page powered by vendored sql.js (WebAssembly), verified by `scripts/smoke-sql-simulator.js`. SQL cannot read STDIN in the execution service, so SQL labs are never executable there.
- Monaco is vendored under `assets/vendor/monaco/` (13 MB) and is deliberately NOT in `package.json`, so Vercel installs stay light. Refresh it with `npm run vendor:monaco` after `npm install --no-save monaco-editor@<version>`.
- The code lab never executes on keystroke: the provider quota is shared, so execution is one call per click and the client is the only caller of the API.
- No emoji anywhere in the product, icons come from `/assets/img/ui-icons.svg`. Arrows (`→`), math and UML symbols are notation, not emoji.
- Root-level `fix-*.js`, `update-*.js`, and one-off scripts are throwaway repair/generation helpers, not part of the app; curated scripts live in `scripts/`.

## References

- [context.md](context.md): workspace index, UI patterns, and authoring rules.
- [ANALYSIS_4_PROJECTS.md](ANALYSIS_4_PROJECTS.md): cross-project analysis notes.
- [B1_PROJECT_PLAN.md](B1_PROJECT_PLAN.md): B1 curriculum scope and chapter mapping.
- [prompt_creation_cours_interactif.md](prompt_creation_cours_interactif.md): course generation prompt template.
- [promptcomplet.md](promptcomplet.md): full prompt variant for course authoring.

## Git Hygiene

- This workspace is currently NOT a git repository and has no `.gitignore` file; do not initialize one or run git commands against it unless the user asks.
- Existing untracked or modified user files should be preserved.
- `dist/` and `node_modules/` are generated output; PDFs and large docs are reference material. Avoid copying, moving, or deleting them unless the user asks.
- The `npm run stop` script uses `taskkill /F /IM node.exe`; it is broad on Windows, so avoid it unless the user specifically wants all Node processes stopped.
