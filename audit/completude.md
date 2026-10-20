# Rapport — chasseur-de-completude
Date : 2026-09-25
Périmètre : tout le repo hors node_modules/, dist/, b1/ (copie legacy), out/
Total : 1 P0, 3 P1, 2 P2, 2 P3

---

### [P0] Page epreuves/ absente du build statique — 404 sur Vercel
- **ID** : COMPLETUDE-001
- **Type** : Complétude
- **Fichier(s)** : scripts/build.js (ligne 21, `COURSE_DIRS` sans `epreuves`)
- **Description** : `epreuves/` est dans `COURSES` (access-control.js, middleware.js) et l'index.html racine y lie deux fois (`epreuves/index.html` aux lignes 39 et 287), mais `scripts/build.js` ne le copie pas. Preuve exécutée : `ls dist/epreuves` → « Aucun fichier ou dossier de ce nom » après `npm run build` réussi.
- **Reproduction** : `npm run build && ls dist/epreuves`
- **Cause racine** : `COURSE_DIRS` de build.js et `COURSES` de access-control.js ont divergé (build contient `roadmap` mais pas `epreuves` ; c'est l'inverse côté serveur).
- **Correctif proposé** : remplacer `roadmap` par `epreuves` dans `COURSE_DIRS` de scripts/build.js (ou ajouter `epreuves` ; décider du sort de `roadmap/`, voir COMPLETUDE-004).
- **Statut** : Ouvert

### [P1] Pages preparation-progression.html / preparation-classement.html orphelines côté auth client
- **ID** : COMPLETUDE-002
- **Type** : Complétude
- **Fichier(s)** : preparation-progression.html, preparation-classement.html (root + dist)
- **Description** : ces deux pages appelent `/api/preparation/progress` et `/api/preparation/leaderboard`, qui répondent 503/401/403. Leur gestion d'erreur ne distingue pas « non connecté » (aucun lien vers /_auth/activate.html ni vers l'atelier) : l'utilisateur voit une page vide sans action de récupération. Le contenu « état vide » affiche bien un message mais sans CTA contextualisé à la cause réelle (ex. section désactivée car `PREPARATION_PASSWORD` absent).
- **Reproduction** : ouvrir /preparation-classement.html sans clé ni mot de passe → liste vide sans explication.
- **Cause racine** : pages copiées de l'atelier mais sans la logique de statut (`/api/preparation/status`) que preparation-web/index.html possède.
- **Correctif proposé** : fetch `/api/preparation/status` au chargement ; si `enabled:false` → bannière « section désactivée » ; si `!unlocked` → lien vers l'atelier pour déverrouiller.
- **Statut** : Ouvert

### [P1] Fichiers de test/preview orphelins servis en production
- **ID** : COMPLETUDE-003
- **Type** : Complétude
- **Fichier(s)** : index-light-preview.html, test-light.html, clarisse.html, my_perso.html, build_output.txt, errors.md, conversation.md, pou, kickbacks.vsix (racine)
- **Description** : pages de test et fichiers divers à la racine. En mode local/Render, `server.js` sert tout fichier présent hors `BLOCKED_PATHS` : ces pages sont accessibles publiquement avec les scripts d'auth injectés. `index-light-preview.html` appelle lui-même `/api/preparation/status`.
- **Reproduction** : `curl http://localhost:3000/test-light.html` en local → 200.
- **Cause racine** : pas de allowlist de fichiers racine dans server.js (tout est servi par défaut).
- **Correctif proposé** : supprimer ces fichiers ou ajouter une allowlist racine (index.html, preparation-*.html, rd-ai-chat.js, robots.txt, sitemap.xml, 404.html) dans server.js.
- **Statut** : Ouvert

### [P2] roadmap/ : 6 pages HTML générées mais sorties de la liste canonique des cours
- **ID** : COMPLETUDE-004
- **Type** : Complétude
- **Fichier(s)** : roadmap/ (01-procedural.html … 05-exceptions.html), scripts/build.js (ligne 21), middleware.js, access-control.js
- **Description** : `roadmap/` est toujours copié dans dist/ par le build (preuve : sortie build « 📚 roadmap/ → 6 fichiers ») mais n'est plus un cours canonique : non protégé (c'est cohérent si voulu : gratuit) mais aussi absent de `COURSES` → pas d'icône/thème si on veut le réintégrer ; il reste lié depuis le footer de index.html (ligne 287). État hybride non décidé.
- **Reproduction** : `ls dist/roadmap` après build → fichiers présents ; `node -e "console.log(require('./server/middleware/access-control').COURSES['roadmap'])"` → undefined.
- **Cause racine** : retrait partiel du cours roadmap.
- **Correctif proposé** : trancher — soit retirer `roadmap` de build.js COURSE_DIRS et du footer, soit le réintégrer dans COURSES (les 3 listes + auth-check.js).
- **Décision utilisateur (2026-09-25)** : retirer `roadmap` du build (build.js COURSE_DIRS) et du footer de index.html ; les 6 HTML restent sur disque.
- **Statut** : Ouvert (décision prise, correction en attente de la phase 6)

### [P2] Scripts jetables et artefacts à la racine (bruit de maintenance)
- **ID** : COMPLETUDE-005
- **Type** : Complétude
- **Fichier(s)** : fix-*.js (12 fichiers), update-*.js, clear-ls.js, extract_uml.py, f.py, generate_*.py
- **Description** : scripts one-off mélangés au code de production à la racine. Risque : ré-exécution accidentelle, confusion sur le périmètre réel de l'app. AGENTS.md les documente comme jetables — mais ils sont toujours là.
- **Reproduction** : `ls fix-*.js | wc -l` → 12.
- **Cause racine** : absence d'archivage.
- **Correctif proposé** : déplacer vers `scripts/_archive/` ou supprimer (demande de confirmation utilisateur).
- **Statut** : Ouvert

### [P3] Marqueurs TODO/FIXME résiduels dans des fichiers servis
- **ID** : COMPLETUDE-006
- **Type** : Complétude
- **Fichier(s)** : linux/chapitres/chapitre4.html (TODO), public/activate.html (XXX dans commentaires), server/utils/keygen.js (XXX commentaire)
- **Description** : marqueurs de dette détectés par grep dans des fichiers servis en production. Vérification : aucun n'est un stub fonctionnel (code adjacent complet) — donc P3 et non P1.
- **Reproduction** : `rg -n "TODO|FIXME|XXX" linux/chapitres/chapitre4.html`
- **Cause racine** : rédaction de contenu.
- **Correctif proposé** : nettoyage textuel.
- **Statut** : Ouvert

### [P3] build.js référence 404.html, robots.txt, sitemap.xml — fichiers inexistants sur disque
- **ID** : COMPLETUDE-008
- **Type** : Complétude
- **Fichier(s)** : scripts/build.js (ROOT_FILES, ligne ~24)
- **Description** : ROOT_FILES liste 'robots.txt', 'sitemap.xml', '404.html' mais `ls` prouve qu'aucun n'existe à la racine ni dans public/. `copyFileIfExists` ignore silencieusement les absents → aucune page 404 personnalisée, aucun sitemap ni robots.txt en production (ni Render, ni Vercel). Les sitemap.xml/robots.txt existants dans certains dossiers de cours (ex. probabilites/) sont copiés comme partie du cours.
- **Reproduction** : `ls 404.html robots.txt sitemap.xml` → 3 × « Aucun fichier ou dossier de ce nom ».
- **Cause racine** : fichiers supprimés/déplacés sans mise à jour de ROOT_FILES.
- **Correctif proposé** : créer 404.html minimal + robots.txt/sitemap.xml, ou nettoyer ROOT_FILES.
- **Statut** : Ouvert

### [P3] Aucun test automatisé d'aucune sorte
- **ID** : COMPLETUDE-007
- **Type** : Complétude
- **Fichier(s)** : package.json (aucun script test), 0 fichier test applicatif
- **Description** : ni tests unitaires ni tests d'intégration. Les seuls « tests » sont les scripts check_qcm.js / check_html_quizzes.js (validation de contenu, qui passent — preuve exécutée).
- **Reproduction** : `npm test` → erreur "missing script".
- **Cause racine** : projet grandi sans filet.
- **Correctif proposé** : hors périmètre d'un audit de correction ; planifier a minima des tests d'intégration sur isProtected() et la génération de clés.
- **Statut** : Ouvert
