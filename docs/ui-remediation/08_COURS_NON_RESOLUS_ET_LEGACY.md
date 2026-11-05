# 08 — Cours du registre, cours sans atelier et dossiers legacy

## 1. Registre canonique

`server/courses.js` déclare **71 entrées** : B1 24, B2 24, B3 23.

- Cours générés (module `server/content/<id>.js`) : **64** → 832 pages.
- Cours écrits à la main : **4** — `b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php`.
- Entrées transverses du registre : **3** — `preparation-web`, `epreuves`, `b1-vb-excel`.
- Catalogues d'ateliers (`server/exercises/course-config.js`) : **68**.

## 2. Écart 71 / 68, expliqué

`labs:check` compte les **catalogues d'exercices** (68) : les 64 cours générés et les 4 cours main-écrits. Les **3 entrées du registre sans catalogue** sont :

- `preparation-web/` — Preparation Web : pas d'atelier de code.
- `epreuves/` — Épreuves Passées : pas d'atelier de code.
- `b1-vb-excel/` — VB Excel (archivé dans le registre) : pas d'atelier de code.

`preparation-web/` est l'atelier Web (protégé par mot de passe de section), `epreuves/` regroupe les annales PDF, et `b1-vb-excel/` est marqué `archived: true`. Aucun de ces trois dossiers n'est un cours à atelier de code : l'écart est structurel, pas un oubli de migration.

## 3. Dossiers legacy

| Dossier | Sur disque | Registre | Build | Décision |
|---|---|---|---|---|
| `b1/` | présent | non | non | archivé, non servi comme cours |
| `droitb2/` | présent | non | non | archivé, non servi comme cours |
| `cours windows/` | présent | non | oui | archivé, non servi comme cours |
| `administration machine virtuel/` | présent | non | non | archivé, non servi comme cours |
| `roadmap/` | présent | non | non | archivé, non servi comme cours |

Ces dossiers restent la matière source ; ils ne sont ni supprimés ni présentés comme des cours actifs. `roadmap/` est encore copié par le build alors qu'il a quitté le registre : incohérence historique documentée, sans effet sur la navigation.

## 4. Portée de la migration visuelle

- Les 64 cours générés partagent le même gabarit : une correction s'applique aux 832 pages, et `courses:check` interdit la dérive.
- Les 4 cours main-écrits utilisent la coquille commune de `scripts/course-kit.js` (en-tête, pied, conteneur, typographie) ; leurs styles propres ne portent que les accents de matière.
- `b1-vb-excel/`, archivé et non lié depuis le portail, conserve une page autonome ; sa typographie et ses couleurs ont été alignées, mais elle n'utilise pas la coquille complète.
- Les pages transverses ont été reprises séparément (document 06).

## 5. Non migré volontairement

- PDF des annales : contenu binaire.
- Dossiers legacy non servis (section 3) : inaccessibles par route.
