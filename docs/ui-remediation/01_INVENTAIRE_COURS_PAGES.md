# 01 — Inventaire des cours et des pages

Source de vérité : `server/courses.js` (registre canonique) et `server/content/*.js` (contenu réel).

## Niveaux

| Niveau | Libellé | Cours |
|---|---|---|
| B1 | Licence 1 | 24 |
| B2 | Licence 2 | 24 |
| B3 | Licence 3 | 23 |
| **Total** | | **71** |

## Familles de cours

| Famille | Cours | Pages par cours | Pages totales |
|---|---|---|---|
| Cours générés (`server/content/*.js` → `scripts/course-kit.js`) | 64 | 13 (accueil, sommaire, atelier, 6 chapitres, cartes, mémo, exercices, examen) | 832 |
| Cours main-écrits (`b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php`) | 4 | 15 | 60 |
| Portail / statuts | — | `index.html`, `404.html` | 2 |
| Annales (`epreuves/`) | 1 | index + PDF | 1 |
| Atelier Web (`preparation-web/`) | 1 | index | 1 |
| Authentification / compte / admin (`public/`) | — | login, account, admin login, admin dashboard, activation | 5 |

Chapitres générés à partir des modules de contenu : **384**.
Pages HTML servies dans `dist/` avec injection d'auth : **936**.

## Types de pages réellement présents

1. **Portail catalogue** — `index.html` : hero, filtres de niveau (B1/B2/B3/Tous), recherche, carte de reprise, grille de cartes.
2. **Accueil de cours** — `index.html` de chaque cours : hero, objectifs, méthodologie, parcours.
3. **Sommaire** — `sommaire.html` : liste ordonnée des chapitres, verrous d'accès.
4. **Chapitre** — `chapitres/chapitreN.html` : mise en situation, objectifs, sections, QCM, erreurs classiques, méthodologie, révision active, test de maîtrise, navigation.
5. **Exercices** — `exercices/exercices.html` : énoncés, niveaux, corrigés repliés.
6. **Atelier** — `atelier.html` : laboratoires de code (Monaco + exécution).
7. **Évaluation** — `chapitres/simulateur-examen.html` / `examens.html` : examen blanc, barème, corrigé.
8. **Révision** — `chapitres/cartes.html` (flashcards) et `chapitres/formules.html` (mémo syntaxique).
9. **Pages transversales** — connexion, inscription, compte/abonnement, admin (login, dashboard), 404, épreuves, atelier Web.

## Exceptions pédagogiques conservées

- `b1-sql` : simulateur SQLite client (sql.js/WebAssembly) au lieu d'un atelier exécutable côté serveur.
- Cours non programmables : ateliers remplacés par des activités guidées, sans éditeur de code.
- Examens : corrigés repliés dans `<details>` pour ne pas divulguer les réponses.
