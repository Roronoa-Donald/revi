# 04 — Layouts et structures communes

> Mesures relevées dans `assets/css/tokens.css`, `assets/css/portal.css`, `assets/css/course.css`, `assets/css/code-lab.css`, `assets/css/components.css` et les `cours.css` des cours.
> Les wireframes sont des schémas de composition, pas des captures.

## Vue d'ensemble

Le produit utilise **dix familles de mise en page**, toutes construites sur les mêmes tokens :

| # | Famille | Pages | Largeur de contenu | Navigation |
|---|---|---|---|---|
| L1 | Portail | `index.html` | 1 280 px (grille) / 900 px (hero) | topbar 56 px |
| L2 | Accueil de cours | `<cours>/index.html` | 900 px | `alnav` + fil d'Ariane |
| L3 | Sommaire | `<cours>/sommaire.html` | 900 px | `alnav` + fil d'Ariane |
| L4 | Chapitre | `<cours>/chapitres/chapitreN.html` | 900 px | `alnav` + fil d'Ariane + `chnav` |
| L5 | Atelier de code | `<cours>/atelier.html` | 900 px | `alnav` + `chnav` |
| L6 | Carte d'authentification | `_auth/login.html`, `_auth/account.html` | 520 / 560 px | aucune |
| L7 | Console admin | `_auth/admin/*` | 1 200 px | header noir + onglets |
| L8 | Application Preparation Web | `preparation-web/index.html` | plein écran | rail 280 px + topbar |
| L9 | Annales | `epreuves/index.html` | plein écran | onglets de matières |
| L10 | Erreur | `404.html` | 520 px | aucune |

---

## L1 — Portail (`index.html`)

```
┌──────────────────────────────────────────────────────────────┐
│ topbar 56px : [logo] cours.interactifs   Épreuves Atelier     │
│               Mon compte                    [profil] [thème]  │
├──────────────────────────────────────────────────────────────┤
│  bandeau « atelier protégé » (si ?preparation=locked)        │
│                                                              │
│                    Apprenez en codant.          H1 60px max   │
│          sous-titre 18px, max 620px, centré                   │
│      ┌──────────────────────────────────────────┐            │
│      │ Accès 100% libre : chapitre 1 gratuit    │            │
│      └──────────────────────────────────────────┘            │
│           Choisissez votre niveau :                          │
│      [ B1 Licence 1 23 cours ][ B2 24 ][ B3 23 ][ Tous 70 ]  │
│      ┌──────────────────────────────────────────┐            │
│      │ 🔍 Rechercher un cours…                  │            │
│      └──────────────────────────────────────────┘            │
│      Cours de Licence 1 (B1) — 23 cours                      │
├──────────────────────────────────────────────────────────────┤
│  carte « Reprendre » (conditionnelle, 640px)                 │
├──────────────────────────────────────────────────────────────┤
│  grille auto-fill minmax(230px,1fr), max 1280px              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                 │
│  │ icône  │ │        │ │        │ │        │                 │
│  │ B1     │ │        │ │        │ │        │                 │
│  │ Titre  │ │        │ │        │ │        │                 │
│  │ libre  │ │        │ │        │ │        │                 │
│  │ 6 chap │ │        │ │        │ │        │                 │
│  └────────┘ └────────┘ └────────┘ └────────┘                 │
├──────────────────────────────────────────────────────────────┤
│ footer noir : © 2025-2026 … Mon compte · Épreuves · Atelier  │
└──────────────────────────────────────────────────────────────┘
```

**Mesures** : topbar 56 px, sticky, fond translucide + `backdrop-filter: blur`; hero `padding-block` 96 px / 64 px, largeur 900 px; titre `clamp(2.25rem, 6vw, 3.75rem)`, line-height 1,05, letter-spacing −0,04em; sous-titre 1rem/1,7 ; recherche 480 × 48 px, icône 16 px à gauche; grille `repeat(auto-fill, minmax(min(230px, 100%), 1fr))`, gap 16 px; carte rayon 16 px, ombre douce, accent par cours en variable `--course-accent`; pied de page noir, texte clair, un seul paragraphe.

**Comportements de layout** : le compteur de la barre de statut se met à jour avec le filtre ; l'état vide remplace la grille par un bloc centré en pointillés ; le bandeau atelier est inséré au-dessus du hero et décale tout le contenu.

## L2 — Accueil de cours

```
alnav sticky (max 980px)
[Portail] / [icône] Algo B1     Sommaire Ch.1 Cartes Mémo Exercices Atelier Examen
─────────────────────────────────────────────────────────────
Algo B1 › Accueil                                             fil d'Ariane
H1 — Algorithmique — apprendre à penser comme une machine
[bouton primaire Commencer] [bouton secondaire Sommaire]
┌ encadré « Ce que vous allez apprendre » ┐
┌ encadré « Prérequis »                   ┐
┌ encadré « Comment utiliser ce cours »   ┐
H2 Programme du cours
[toc item 1] [toc item 2] … (liens, numéro, description)
```

**Observation** : `b1-algo/index.html` contient 3 encadrés `.box`, 27 liens, 0 formulaire, 0 code lab. `b1-sql/index.html` ajoute un lien d'évitement, un bloc `<details>` et 57 liens (programme plus détaillé). `b1-python/index.html` ajoute une section « Comment utiliser ce cours ».

## L3 — Sommaire

```
alnav
Algo B1 › Sommaire
H1 Sommaire du cours
lead (explication de la progression)
H2 (implicite) liste des chapitres
┌ 1 │ Titre du chapitre ──────────────────────────────┐
│   │ description courte                              │
│   │ Accès libre / 🔒 B1 et plus                     │
└────────────────────────────────────────────────────┘
… × N chapitres
H2 Ressources transverses
[Cartes] [Mémo] [Exercices] [Atelier] [Examens blancs]
[← Accueil du cours]                 [Commencer le chapitre 1 →]
```

**Mesures** : `.toc` grille verticale gap 10 px; `.toc__item` padding 14/16, rayon 14 px, bordure 1 px, hover `translateY(-1px)` + bordure accent; numéro 800, largeur min 2,2em; titre 700; description 0,8rem muted; badge de verrou 0,72rem.

## L4 — Chapitre (layout le plus riche)

```
alnav (7 liens, actif = chapitre courant)
──────────────────────────────────────────────
fil d'Ariane
H1 Chapitre N — Titre
[Module N] [≈ 2 h de travail] [Gratuit | Réservé B1]
┌ box--situation  Mise en situation ┐
┌ box--objectifs  Objectifs         ┐
H2 1. …
paragraphes, listes, strong, code inline
tableau (défilement horizontal)
┌ box--intuition / tech / pitfall / method / revision ┐
H2 5. Exercices de code
┌ div.lab[data-lab] ────────────────────────────────┐
│ titre + langue + badge niveau + « entraînement »   │
│ objectif, énoncé, entrée/sortie attendues          │
│ <details> indices                                  │
│ barre : [Exécuter] [Valider] [Expliquer] [Reset]   │
│ entrée standard (repliable)                        │
│ console : Sortie | Erreurs | Détails               │
│ rapport de correction (masqué au départ)          │
│ tuteur IA (masqué)                                 │
└────────────────────────────────────────────────────┘
H2 6. QCM — niveau examen
┌ Q1. énoncé ────────────────────────────────┐
│ [option] [option] [option]                 │
│ explication (masquée avant réponse)        │
└────────────────────────────────────────────┘
score sticky (apparaît après la 1re réponse)
H2 7. Erreurs classiques
H2 8. Méthodologie
H2 9. Révision active (checklist, flashcards)
H2 10. Test de maîtrise (4 bandes + case « maîtrisé »)
[← Sommaire]                    [Chapitre N+1 →]
disclaimer
```

**Mesures** : `.alwrap` max 900 px, padding 28/20/90; `h1` clamp 1,7–2,15rem; `h2` 1,5rem avec bordure basse 2 px; `h3` 1,15rem; `.box` rayon 14 px, padding 18/20, marge 20 px, fond teinté par variante; `.pseudo` rayon 12 px, fond `#f3eee5`, overflow-x auto; tableaux en `display:block; overflow-x:auto` (règle DESIGN.md); `.q` rayon 14 px, padding 16/18; `.opt` rayon 10 px, padding 10/14.

## L5 — Atelier de code

Même coquille que L4, avec :

- un encadré « Comment fonctionne l'atelier » (`.box--objectifs`) ;
- une zone libre `.lab[data-lab][data-language][data-height][data-stdin]` sans `data-exercise` ;
- un code de départ dans `<script type="text/plain" data-lab-starter>` ;
- trois encadrés : pièges, technique, suite ;
- un `chnav` de fin.

## L6 — Carte d'authentification

```
            fond latte plein écran, carte centrée
            ┌────────────────────────────────┐
            │            [icône]             │
            │           Connexion            │
            │   sous-titre 2 lignes          │
            │ [Se connecter][S'inscrire]     │ onglets pill
            │ Email                          │
            │ [____________________]         │
            │ Mot de passe                   │
            │ [____________________]         │
            │ (message d'erreur)             │
            │ [      Se connecter      ]     │ CTA vert 3D
            │      Mot de passe oublié ?     │
            │ ← Retour à l'accueil           │
            └────────────────────────────────┘
```

**Mesures** : carte 520 px (login) / 560 px (compte), rayon 18 px, padding 44/40/36, ombre `0 8px 30px rgba(28,25,23,.06)`; logo 34 px; onglets 44 px de haut, rayon 60 px; champs 48 px, rayon 12 px; bouton 48 px, rayon 60 px, fond `#29cc57`, ombre dure `#22a94c 0 4px 0`, hover `translateY(2px)`, active `translateY(4px)`; messages inline (rouge `#FEE2E2`/`#B91C1C`, vert `#D1FAE5`/`#047857`).

La page compte reprend la carte, avec une liste de lignes clé/valeur (`.rows`), deux blocs de paiement alternatifs et un sélecteur de cours en grille `auto-fill minmax(150px, 1fr)`.

## L7 — Console admin

```
┌ header noir sticky, pleine largeur ─────────────────────────┐
│ Admin — Comptes & Abonnements        [Site] [Déconnexion]   │
├─────────────────────────────────────────────────────────────┤
│ 6 stat-cards (auto-fit, min 150px)                          │
│ [Comptes][Sessions][Paiements][Journal][Fournisseurs & IA]  │
│ ┌ Créer un compte ────────────────────────────────────────┐ │
│ │ email | mot de passe | nom | abonnement | [Créer]       │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌ Comptes utilisateurs ───────────────────────────────────┐ │
│ │ filtres Tous/Abonnés/Gratuits/Désactivés   [recherche] │ │
│ │ ID | Email | Abonnement | Expire | Sessions | Inscrit  │ │
│ │ … table scrollable horizontalement …                    │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
modale de confirmation (420px)      toast bas centre
```

**Mesures** : header noir, padding 16/24, sticky; `main` max 1 200 px, padding 20; grille de stats `repeat(auto-fit, minmax(150px,1fr))`, gap 12; cartes rayon 16 px; onglets pill 60 px, actif noir; tableaux `overflow-x:auto`; modale 420 px, overlay noir 55 %; toast pill noir en bas, glisse de 80 px.

## L8 — Application Preparation Web

```
┌ topbar 56px : logo  Cheatsheet Progression Classement  [thème] ┐
├──────────────┬────────────────────────────────────────────────┤
│ rail 280px   │ workspace                                      │
│ PW           │ ┌ topbar : [Projets] HTML | titre | Cours Focus │
│ Apprenant    │ │            [Valider]                          │
│ Rang / XP    │ ├ stats-strip : XP | Progression | Badges | Sauvegarde
│ barre        │ ├ workbench ───────────────────────────────────┤
│ liste des 12 │ │ lesson-panel │ editor-pane │ preview-pane   │
│ projets      │ │ memo/étapes  │ HTML/CSS/JS │ iframe + feedback
│ liens        │ │ prev/next    │ [Indice][Solution][Reset]      │
│              │ └───────────────────────────────────────────────┤
│              │ quiz bonus                                      │
└──────────────┴────────────────────────────────────────────────┘
modales : Progression, Solution       FAB IA + panneau IA      toast
```

**Mesures** : rail 280 px (token `--sidebar-width`), repliable (`rail-collapsed`) ; topbar 56 px; trois panneaux redimensionnables par poignées `.resizer`; aperçu dans une iframe `sandbox="allow-scripts"`; panneau IA flottant en bas à droite.

## L9 — Annales (`epreuves/index.html`)

Document long (1 873 lignes, 6 376 mots) : en-tête, sommaire des 8 matières, puis pour chaque matière un onglet (`sub-tab-btn`) et un panneau (`subject-pane`) contenant :

- un en-tête de panneau (titre, méta, `grade-pill` / `grade-na`) ;
- une `qcm-box` avec `score-bar` et `score-val` ;
- 23 questions au total (`q-item`, `q-num`, `q-text`, `q-options`, `q-explanation`) ;
- un `code-box` (`code-statement`) ;
- 8 blocs `lab` (un par matière).

## L10 — 404

Pleine page centrée, largeur 520 px : code `404` en `clamp(64px, 12vw, 120px)`, titre, texte, deux actions (retour portail, ouvrir l'atelier).

---

## Règles transverses de layout

1. **Une seule colonne de lecture** : toutes les pages de cours sont centrées à 900 px ; il n'y a pas de barre latérale de cours.
2. **Navigation collante** : topbar du portail et `alnav` des cours restent en haut ; le score QCM devient collant en bas.
3. **Aucun débordement horizontal** : `html, body { overflow-x: hidden }`, tableaux et blocs `pre` confinés et défilants.
4. **Hiérarchie de titres sans saut** : H1 unique, H2 de section, H3 locale.
5. **Cartes imbriquées interdites** : les encadrés pédagogiques sont des blocs teintés, pas des cartes dans une carte (commentaire explicite dans `code-lab.css`).
6. **Thème** : clair par défaut forcé (`color-scheme: light`), sombre via `[data-theme="dark"]` sur `<html>`.
