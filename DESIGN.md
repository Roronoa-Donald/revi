# DESIGN.md — Direction visuelle « Cours Interactifs »

> Référence monde : **brilliant.org** (layout, épure, motion, palette papier) × **JetBrains Mono** (identité typographique unique, décision produit).
> Valeurs palette extraites du CSS réel de brilliant.org le 2026-09-25 (variables `--panda-colors-*`).

## 1. Positionnement
Plateforme d'apprentissage **calme, professionnelle, light-first**. Le contenu est la star : l'interface recule, guide, félicite. Aucune décoration qui ne porte pas de sens.

## 2. Typographie (contrat)
| Rôle | Font | Notes |
|---|---|---|
| Tout (titres, UI, corps, code) | **JetBrains Mono** | 700/800 titres, 600 labels uppercase tracking-large, 400 corps |
| Corps de lecture longue | JetBrains Mono 400 | `line-height: 1.7`, mesure 68–76ch |
| Chiffres (XP, scores, temps) | JetBrains Mono 700 | tabular par nature |

## 3. Couleur
- **Light (défaut)** : papier chaud `#f5f3f1`, surfaces `#ffffff`, encre `#141414`, secondaire `#57534e`, bordures oat `#e4e4e4`.
- **Interactif** : periwinkle `#456dff` (liens, focus, CTA), hover `#5d74cc`.
- **Statuts** : success `#047857`, warning `#a16207`, error `#b91c1c`, info `#1d4ed8`.
- **Premium/XP** : or `#c69c1e`.
- **Dark** : `#0c0a09` / `#1c1917` / `#fafaf9`, periwinkle clair `#7491ff`.
- 22 couleurs `--course-*` conservées (identité par cours).

## 4. Forme
- Rayons 12–16px, bordures 1px oat, ombres diffuses très douces (jamais noires denses).
- Cartes : blanc sur papier, fine barre d'accent 3px par cours, lift 2px au hover.
- Espacement généreux : hero respirant, grilles aérées, jamais tassé.

## 5. Motion (la vie)
- Base 150–250ms `--ease-out` ; célébrations 400ms `--transition-spring`.
- Micro-delight : lift cartes, check animé, pulse progression, compteur XP.
- `prefers-reduced-motion` : tout neutralisé.

## 6. Accessibilité (plancher)
Contrastes ≥ 4.5:1 texte, ≥ 3:1 large. Focus visible sur tout interactif (`--color-ring`). Targets ≥ 44px. HTML sémantique (MX-friendly).
