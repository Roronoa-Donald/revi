# 13 — Analyse responsive

> Points de rupture **relevés dans le CSS** (et non supposés). Le produit n'a pas de maquette mobile séparée : il adapte les mêmes gabarits.
> Viewports de référence : desktop 1440, petit desktop 1180, tablette 1024/768, mobile 640/560/480, très petit 390.

## 1. Inventaire exact des points de rupture

| Seuil | Fichier(s) | Ce qui change |
|---|---|---|
| **1180 px** | `preparation-web/assets/css/style.css` | coquille de l'atelier en une colonne ; rail de projets passé en `position: fixed` (panneau superposé) ; poignées de redimensionnement masquées (`display:none !important`) |
| **1024 px** | `assets/css/components.css` | `.app-shell` en une colonne ; `.sidebar` en `position: fixed` sous la topbar |
| **1024 px** | `assets/css/course.css` | `.course-layout` en une colonne ; `.course-sidebar` redevient statique, pleine largeur, bordure basse |
| **768 px** | `assets/css/portal.css` (`min-width`) | la grille du portail passe à un gap de 20 px (au-dessus de 768 seulement) |
| **768 px** | `assets/css/course.css` | `.course-main` : padding 32 px / 16 px / 48 px |
| **768 px** | 64 fichiers `<cours>/assets/css/cours.css` | ajustements propres aux cours (largeurs, marges, tableaux) |
| **720 px** | `preparation-web/assets/css/style.css` | `.workspace` padding 0,7 rem ; topbar et barre d'outils se replient |
| **640 px** | `assets/css/portal.css` | topbar padding 16 px ; **le texte de la marque disparaît** (icône seule) ; hero padding réduit |
| **640 px** | `assets/css/sommaire.css` | `.exercise-list` en une colonne |
| **640 px** | `assets/css/code-lab.css` | cellules de diagnostic empilées ; statut du lab sur toute la largeur ; éditeur et fallback à 240 px de haut |
| **560 px** | `<cours>/assets/css/cours.css` | **`.alnav__links` masqués** ; flashcards hauteur minimale 150 px |
| **480 px** | `assets/css/portal.css` | topbar padding 12 px ; liens de nav à 11 px, espacement 2 px |
| **prefers-reduced-motion** | `tokens.css`, `portal.css` | animations et transitions neutralisées |

Il n'y a **aucun point de rupture à 420 px ni à 1 280 px** dans les feuilles principales : la largeur maximale de 1 280 px est une `max-width`, pas une media query.

## 2. Ce qui est intrinsèquement fluide

| Mécanisme | Effet |
|---|---|
| Grille `repeat(auto-fill, minmax(min(230px, 100%), 1fr))` | 4 colonnes à 1 280, 3 vers 1 000, 2 vers 640, 1 sous 480 |
| `max-width` 900 px du contenu de cours | lecture confortable, marges latérales élastiques |
| `clamp()` sur les titres | hero 2,25 → 3,75 rem, H1 1,7 → 2,15 rem |
| `overflow-x: auto` sur les tableaux et `pre` | jamais de débordement de page |
| `html, body { overflow-x: hidden }` | masque tout débordement résiduel |
| Images et icônes en `currentColor` + tailles relatives | pas de bitmap à adapter |

## 3. Portail

| Viewport | Grille | Topbar | Hero |
|---|---|---|---|
| 1440 | 4 colonnes | logo + texte + 3 liens + profil + thème | titre 60 px, sous-titre 620 px |
| 1024 | 3–4 colonnes | idem | idem |
| 768 | 3 colonnes | idem | padding réduit |
| 640 | 2 colonnes | **icône seule** (texte masqué) | padding 64/40 |
| 560 | 2 colonnes | icône + liens | — |
| 480 | 1–2 colonnes | liens 11 px, très serrés | — |
| 390 | 1 colonne | icône + « Épreuves / Atelier / Compte » compressés | titre ~36 px |

Le champ de recherche reste à 480 px de large mais est borné par son conteneur (`width: 100%`), donc il rétrécit.

## 4. Pages de cours

| Viewport | `alnav` | Contenu | Code lab |
|---|---|---|---|
| 1440 | marque + 7 liens + fil d'Ariane | 900 px centré | éditeur ~360 px de haut |
| 1024 | idem | idem | idem |
| 768 | idem | padding réduit (32/16/48) | idem |
| 640 | idem | une colonne, tableaux défilants | diagnostic empilé, statut pleine largeur, éditeur 240 px |
| 560 | **liens masqués** (marque + accueil seulement) | idem | idem |
| 390 | marque + accueil | texte plein, H1 ~27 px | éditeur 240 px, barre d'actions qui passe à la ligne |

**Conséquence majeure** : sur mobile, la navigation de cours (Sommaire, Cartes, Mémo, Atelier…) **disparaît**. Il n'y a pas de menu burger ni de tiroir. L'utilisateur mobile ne peut compter que sur le fil d'Ariane, la navigation de bas de chapitre (`chnav`) et les liens du sommaire. C'est un défaut d'usage réel, à reproduire tel quel ou à signaler comme point à corriger.

## 5. Connexion et compte

| Viewport | Carte | Champs | Grille de niveau |
|---|---|---|---|
| 1440 | 520 px (login) / 560 px (compte) | 48 px | 3 colonnes |
| 768 | largeur fluide, marges | 48 px | 3 colonnes |
| 640 | ~100 % − 32 px | 48 px | 3 colonnes serrées |
| 480 | ~100 % − 24 px | 48 px | 3 colonnes ou 1 selon le cours |
| 390 | pleine largeur | 48 px | 1 colonne |

Le padding de carte (44/40/36) n'a pas de media query : sur 390 px, il reste généreux et réduit la zone utile.

## 6. Administration

| Viewport | Stats | Tableaux | Onglets |
|---|---|---|---|
| 1440 | 6 colonnes | pleine largeur | 5 en ligne |
| 1024 | 4–6 | défilement horizontal | 5 en ligne |
| 768 | 2–3 | défilement horizontal | 2 lignes |
| 390 | 1–2 | défilement horizontal | défilants |

La console n'a pas de vue mobile dédiée : elle reste utilisable mais dense, avec défilement horizontal des tableaux.

## 7. Preparation Web

| Viewport | Coquille | Rail | Panneaux |
|---|---|---|---|
| 1440 | rail 280 + workspace | fixe | 3 panneaux redimensionnables |
| 1180 | une colonne | **fixe en overlay** | poignées masquées |
| 768 | une colonne | overlay | panneaux empilés |
| 720 | une colonne | overlay | padding réduit, barre d'outils repliée |
| 390 | une colonne | overlay | éditeur et aperçu empilés, aperçu réduit |

## 8. Annales

Page longue,mono-colonne. Les onglets de matières débordent horizontalement sur mobile (pas de media query dédiée repérée) ; les QCM restent lisibles, les blocs de code défilent.

## 9. Chat, modales, toasts

| Élément | Desktop | Mobile |
|---|---|---|
| Chat RD-AI | panneau 360–380 px en bas à droite | panneau quasi pleine largeur |
| Modale admin | 420 px | ~100 % − 32 px |
| Panneau IA Preparation | flottant | occupe la largeur |
| Toast | pill centrée | pleine largeur − marges |

## 10. Comportements tactiles

| Comportement | Détail |
|---|---|
| Cibles | boutons ≥ 40 px, options de QCM ≥ 44 px |
| Survol | les effets `:hover` ne sont pas neutralisés sur tactile (légère gêne) |
| Défilement | `-webkit-overflow-scrolling` non déclaré |
| Zoom | `user-scalable` non bloqué (bon point) |
| Clavier mobile | les champs de lab peuvent être masqués par le clavier (aucun ajustement `visualViewport`) |

## 11. Tableau de synthèse pour Stitch

| Écran | Desktop | Tablette | Mobile |
|---|---|---|---|
| Portail | 4 col + hero large | 2–3 col | 1 col, marque icône seule |
| Sommaire | liste 900 px | idem | idem, liens de nav masqués |
| Chapitre | 900 px | 900 px | pleine largeur, nav masquée |
| Lab | éditeur 360 | 360 | 240, statut pleine ligne |
| Login | carte 520 | fluide | pleine largeur |
| Compte | carte 560 | fluide | pleine largeur |
| Admin | 1 200 px, 6 stats | 2–3 stats | tableaux défilants |
| Annales | onglets en ligne | onglets en ligne | onglets défilants |
| Preparation | 3 panneaux | empilé | empilé, rail overlay |

## 12. Limites de cette analyse

- Les media queries des 64 fichiers `cours.css` n'ont pas été détaillées une par une ; elles ajustent surtout des largeurs et des marges.
- Aucun rendu réel n'a été mesuré : les largeurs effectives à 390 px sont déduites des règles, pas observées.
- Les points de rupture des pages `_auth/` (non servies) n'ont pas été retenus.
