# 03 — Plan de migration et critères d'acceptation

## Principe directeur

Le projet possède déjà un gabarit unique pour les cours générés. Toute la refonte visuelle passe donc par
les couches partagées, jamais par une édition page par page :

```
assets/css/tokens.css          → couleurs, typographie, rayons, ombres tactiles
assets/css/base.css            → corps Hanken Grotesk, titres Space Grotesk, liens cobalt
assets/css/components.css      → boutons, champs, cartes, badges, barre supérieure
assets/css/portal.css          → hero, recherche, cartes du catalogue
scripts/templates/cours.css    → gabarit des 64 cours générés (832 pages)
scripts/course-kit.js          → polices injectées dans la coquille de page
public/css/auth-global.css     → famille auth / compte / admin
```

## Lots exécutés

| Lot | Contenu | Livré |
|---|---|---|
| A — Fondation | tokens, typographie, boutons, champs, cartes, navigation | oui |
| B — Structure pédagogique | accueil, sommaire, chapitre, progression, navigation | oui |
| C — Interactions pédagogiques | QCM, options, feedback correct/incorrect, barème, correction | oui |
| D — Outils | flashcards, mémo, atelier, console, tables, formules | oui |
| E — Tous les cours | 64 cours générés + 4 cours main-écrits | oui |
| F — Transversal | portail, 404, épreuves, atelier Web, auth, compte, admin | oui |

## Ordre appliqué

1. Lecture de `DESIGN.md` et des écrans Stitch (desktop + mobile) pour extraire le langage.
2. Réécriture des tokens en conservant **tous** les noms de variables existants.
3. Mise à jour des composants partagés.
4. Réécriture du gabarit `scripts/templates/cours.css` (sélecteurs conservés à l'identique).
5. `npm run courses` → régénération des 832 pages et des 64 feuilles de style par cours.
6. Application du même gabarit aux 4 cours main-écrits (préfixes `py`, `c`, `al`, `ph`).
7. Alignement de la famille auth/admin.
8. Vérifications : `npm test`, `courses:check`, `labs:check`, `build`, contrôle navigateur responsive.

## Critères d'acceptation

- [x] Tous les niveaux inventoriés (B1 24, B2 24, B3 23).
- [x] Tous les types de pages traités par les mêmes composants.
- [x] Contenus, tests et solutions inchangés.
- [x] Aucune route supprimée, aucun contrat API modifié.
- [x] Responsive appliqué par les media queries du gabarit partagé (640 / 768 / 1024).
- [x] États conservés : hover, focus, sélectionné, correct, incorrect, désactivé.
- [x] `prefers-reduced-motion` respecté.
- [x] Vérifications exécutées et résultats consignés dans la matrice.
