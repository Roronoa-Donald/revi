# 00 — État initial

## Racine réelle et stack

- Racine du projet : `/home/rd/Desktop/proba`
- Références de conception (lecture seule) : `stitch_brilliant_website_design_system/`
- Dépôt Git : branche `main`, arbre propre au démarrage (`git status --short --branch` → `## main`).
- Runtime : Node 22, Fastify 4 (`server/app.js`), serveur statique `server.js`, entrée serverless `api/index.js`.
- Pages : HTML statique généré ou écrit à la main + CSS/JS sans framework, aucune étape TypeScript.
- Générateurs : `scripts/generate-courses.js` + `scripts/course-kit.js` (gabarit unique) et `scripts/generate-code-labs.js`.
- Feuilles de style partagées : `assets/css/tokens.css`, `base.css`, `components.css`, `portal.css`, `code-lab.css` ; gabarit par cours `scripts/templates/cours.css`.
- Pages transversales : `index.html` (portail), `404.html`, `epreuves/`, `preparation-web/`, `public/` (auth, compte, admin).

## État Git avant intervention

Aucune modification ni fichier non suivi au démarrage : le travail de refonte est donc intégralement nouveau et n'écrase aucun changement utilisateur.

## Vérifications de référence exécutées avant modification

| Commande | Résultat initial |
|---|---|
| `npm test` | 8401 assertions, 2 échecs (`audit-quality` 85 et 90) après la première passe de refonte, 0 avant |
| `npm run courses:check` | OK |
| `npm run labs:check` | OK |
| `npm run build` | OK |

Les deux échecs apparus pendant la refonte ont été traités à la source :
- tableaux responsives : règle `table` remise au contrat attendu par le test ;
- anti-patterns Impeccable : suppression de la bande latérale `.portal-card::before` ; `overused-font` documenté en exception car Space Grotesk est imposé par `DESIGN.md`.

## Contraintes respectées

- Aucune migration de framework, de routeur, de schéma de base ou de contrat API.
- Aucune suppression de route, de page, de question ou d'exercice.
- `dist/` reste un artefact généré, jamais édité à la main.
- Les pages générées ne sont jamais éditées directement : `npm run courses` régénère les 832 pages.
