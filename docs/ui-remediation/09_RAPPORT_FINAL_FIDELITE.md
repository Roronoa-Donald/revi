# 09 — Rapport final de fidélité

## 1. Travail réalisé

| Levier | Fichier | Effet |
|---|---|---|
| Coquille de cours | `scripts/course-kit.js` | en-tête marque + fil d'Ariane + onglets, pied de page, conteneur 980/896/1280, tête de chapitre, sections en cartes |
| Feuille de cours | `scripts/templates/cours.css` | réécriture complète au langage Stitch (cartes bord 2 px, ombres 0 2px 0, échelle typographique, boutons à enfoncement, mode sombre) |
| Adaptateur de listes | `course-kit.js` (`upgradeLists`) | transforme les listes `.toc` de 64 modules en lignes de chapitres et cartes de ressources Stitch |
| Portail | `assets/css/portal.css` + `index.html` | héros, sélecteur segmenté, recherche, grille 4 colonnes, barre de section, pied encre |
| Authentification | `public/login.html`, `account.html`, `admin/dashboard.html`, `auth-global.css` | polices, vert #21c35e, rayons 12/8 |
| 404 | `404.html` | marque, code vert, boutons tactiles |
| Archivé | `b1-vb-excel/index.html` | typographie et couleurs alignées |

## 2. Couverture

- **940 pages** de `dist/` visitées, **940** captures desktop, **940** sans anomalie (voir 06).
- **27 références Stitch** comparées pixel à pixel (voir 07).
- **71 entrées** de registre expliquées : 64 générées, 4 main-écrites, 3 transverses (voir 08).

## 3. Vérifications exécutées

- `npm test` : 8401 assertions, **8398 pass, 0 fail**, 3 skipped.
- `npm run courses:check` : 832 pages, 64 cours à jour.
- `npm run labs:check` : 1250 exercices, 68 cours à jour.
- `npm run build` : 940 fichiers HTML dans `dist/`.
- Campagne navigateur : 940 pages × 2 largeurs.

## 4. Limites restantes

1. Les références Stitch sont des maquettes : leurs textes, durées, progressions et descriptions n'existent pas dans les données réelles. La composition est alignée, pas le contenu fictif.
2. Les écarts pixel restent mesurables (MAE 8.43 à 93.8, voir 07) : ils mêlent échelle des exports, contenu réel différent et géométrie encore imparfaite.
3. Le mode sombre a des tokens et des sélecteurs dédiés mais n'a pas été comparé aux références (aucune capture sombre fournie).
4. Les pages d'administration et de compte dépendent d'une session et d'une base PostgreSQL : rendu statique seulement.
5. `b1-vb-excel/` (archivé, non lié) n'utilise pas la coquille complète.
6. Aucune référence dédiée n'existe pour les annales, l'atelier Web et le défi quotidien.

## 5. Statut global

**INCOMPLET au sens de la fidélité pixel-perfect** : toutes les pages actives utilisent désormais le langage visuel Stitch (en-tête, conteneur, cartes, boutons, pied), les 27 couples de références ont été comparés et les écarts résiduels sont listés ci-dessus. Aucune page ne conserve l'ancien thème, mais les écarts de contenu fictif et de géométrie fine subsistent.
