# Audit complet — Conformité du style au `design-bundle`

**Date :** 2026-09-27
**Objet :** vérifier si le design réellement présent dans les pages du dépôt respecte
fidèlement le système de design capturé dans `design-bundle/` (brilliant.org), **police exclue**.
**Nature :** audit seulement — aucun fichier du site n'a été modifié.
**Livrable :** ce document.

---

## 0. Verdict en 30 secondes

Le projet **a bien dérivé un système de design du bundle** (`assets/css/tokens.css`,
commenté « _adapté de brilliant.org_ »), et **10 cours sur 24 ont été effectivement
migrés** vers ses surfaces papier/encre/oat. Mais la migration est **partielle et
incomplète** :

- 🔴 **11 cours canoniques ne respectent pas le bundle du tout** — 7 sont encore en
  **dark navy glass** (docker, api-rest-flask, erp-si, ingenierie-besoin,
  masterclass-apprendre, infographie, preparation-web) et 4 en **slate/Tailwind clair**
  (admin-vm, droit, uiux, uml ; + `b1/` hors liste canonique).
- 🔴 **Incohérence interne par cours** : dans un même cours, les pages _sommaire/exercices_
  chargent le système central (conforme) tandis que les pages _index/chapitres_ chargent un
  template local (souvent non conforme). Deux mondes cohabitent sous le même toit.
- 🟡 **Les éléments identitaires du bundle** sont **définis mais très peu déployés** : la
  palette pastel (6 teintes) et les containers 1296/1216 sont quasi morts ; le gradient
  signature et les CTA 3D ne vivent que dans le portail + l'auth ; le bouton primaire
  `#f8f7f6`, la 4ᵉ surface translucide et les cartes Outlined ne sont pas transposés.
- 🟡 **Restes old-world** : navy `#0f172a` dans RD-RO, gris `#6b7280` dans rd_winserver,
  slate dans uml, + 2 anneaux de focus navy oubliés dans `components.css`.

Autrement dit : **le socle respecte le bundle ; la couverture est le problème.** Environ
**la moitié des cours et deux tiers des pages** ne l'appliquent pas.

---

## 1. Périmètre & méthode

### 1.1 Ce qui est audité
- `design-bundle/` : `DESIGN.md` (1347 l.), `design-tokens.json`, `style-variables.css`,
  `tailwind-theme.css`, `ai-prompt.txt`.
- Tout le CSS du site : `assets/css/*.css` (7 fichiers centraux), 23 `*/assets/css/style.css`,
  `php/assets/css/{features,tp}.css`, `public/css/auth-*.css`.
- Les 704 pages HTML source (hors `dist/`, `node_modules/`, `.taskstate/`).

### 1.2 Ce qui est EXCLU
- **La police** : le bundle prescrit `"CoFo Brilliant"` / `"CoFo Semi Mono"` ; le projet a
  choisi **JetBrains Mono** (identité produit). Conformément à la demande, **non audité**.
  Toutefois 13 déclarations `font-family` non-JetBrains subsistent (Inter, Trebuchet) dans
  les cours non migrés — signalées sans être comptées comme écarts.
- `dist/` (généré), `.taskstate/` (archives internes), `b1/`, `roadmap/`, `droitb2/`,
  `cours windows/`, `administration machine virtuel/` (hors liste canonique, mais mentionnés
  car ils portent encore le vieux monde).

### 1.3 Méthode
Lecture intégrale du bundle → extraction `:root` de chaque template par `awk` → greps de
couverture (hex, tokens, chargements CSS) → construction d'une matrice token→token →
hiérarchisation des écarts. Preuves mécaniques consignées dans `.taskstate/evidence.md`.

### 1.4 Relation aux audits antérieurs
Le dépôt contient déjà `audit/` (`design-ux.md`, `corrections.md`, `completude.md`,
`logique.md`, `tests.md`, `integration.md`, `live-ux.md`) et un run de migration
`.taskstate/` (`ui-refonte-wave5`). Ces travaux portaient sur l'UX, la logique, la
complétude et une **migration partielle** du design (centrale + 10 cours). **Le présent
rapport ne les remplace pas** : il prend pour angle unique la **conformité au
`design-bundle`**, token par token, et la **couverture sur les 24 cours**. `corrections.md`
revendique l'alignement des rayons (8/12/16/18/20/24/60) — il s'agit du **système central**,
pas des templates locaux (§6 P5 le confirme).

---

## 2. La cible normative : ce que prescrit le bundle

| Famille | Valeurs prescrites |
|---|---|
| **Couleurs** (16) | Canvas `#ffffff`, Rich Black `#000000`, off-whites `#f8f8f8`/`#f5f3f1`/`#f8f7f6`, blancs translucides `rgba(255,255,255,.44)`/`.3`, pastels `#abbdff` (bleu), `#d3b8ff` (violet), `#ffc3b8` (rouge), `#ffcc9c`/`#fce49d` (orange), `#a0dcd5` (teal), `#edf5a1` (jaune), verts `#29cc57`/`#15b441` |
| **Surfaces** (4) | 0 `#ffffff` · 1 `#f5f3f1` · 2 `#f8f8f8` · 3 `rgba(255,255,255,.44)` |
| **Rayons** (12) | `9999`, `12`, `20`, `18`, `8`, `60`, `44`, `16`, `24`, `17`, `0 8 8 0`, `54` |
| **Ombres** (12) | 1 `rgba(0,0,0,.04) 0 1 3 0` · 2 `rgba(0,0,0,.05) 0 0 14 0` · 3 `#e5e5e5 0 4 0 0` · 4 `rgba(0,0,0,.1) 0 0 15 0` · 5 `rgba(0,0,0,.05) 0 4 7 0` · 6 inset · 7 `rgba(0,0,0,.05) 0 4 14 0` · 8 halo `#f5f3f1 0 0 0 1440px` · 9–12 (boutons 3D `#000`/`#d5d5d5`/`#e4e4e4` `0 4 0 0`) |
| **Gradients** (8) | dont le **signature** `86deg #7491ff → #ff90e0 → #f9d25c`, les fondus `to right/left #ffffff → transparent`, et le fond hero multi-couches |
| **Espacements** (12) | paddings `12px 16px`, `34px 36px`, `40px`, `0 32px`, `12px 20px`, `32px 72px 0`, `14px 24px`, `32px`, `80px 0`, `48px 24px`, `4px 8px`, `16px` |
| **Layout** | Density **spacious** ; containers `1296`, `1216`, `688`, `350` ; rythme de section `207/208/254/215px` |
| **Typo** (hors police) | échelle 16/14/12px, graisses 400/500/700, interlignes 24/21/18/20px, letter-spacing normal |
| **Composants** | _Primary Button_ `#f8f7f6` / radius 12 / bordure `#e4e4e4` / shadow-2 ; _Elevated Card_ `#ffffff` / radius 20 / pad 40 / relief `#e5e5e5 0 4 0` ; _Primary Pill Button_ `#29cc57` ou blanc / radius 9999 / pad `12px 20px` / graisse 500 ; _Pill Badge_ `#15b441` / radius 12 / pad `4px 8px` / 700 12px ; _Outlined Card_ `#f8f8f8` / radius 8 / pad `12px 16px` ; _Surface Card_ `#f5f3f1` / radius 17–18 ; _Input_ `rgba(255,255,255,.43)` / radius 32 |
| **Motion** | durées `0.1/0.15/0.2/0.3/1.5/6.4s` ; easings `ease-out`, `cubic-bezier(.16,1,.7,1)`, `ease-in`, `cubic-bezier(.4,0,.2,1)` |
| **Imagerie** | stratégie _photography-led_ (728 images, 1295 icônes, 69 vidéos) |
| **Do/Don't** | ⚠️ **« Ne pas ajouter de couleurs ou de polices absentes du jeu de tokens. »** Ne pas copier les assets/typos propriétaires. |

---

## 3. Architecture CSS réelle du dépôt

Le projet superpose **trois mondes** :

### Monde 1 — « Papier chaud » v3 (dérivé du bundle) ✅
- `assets/css/tokens.css` — source de vérité, s'appuie explicitement sur brilliant.org.
- `base.css`, `components.css`, `course.css`, `portal.css`, `sommaire.css`, `lucide.css`.
- `public/css/auth-*.css` — écran d'activation « porte fermée » (fond `#000000`, carte papier).

### Monde 2 — Templates de cours « famille A/B » migrés ✅ (partiel)
`linux`, `csharp`, `sql`, `rd_java`, `ccna`, `rd_winserver`, `assembleur`, `react`,
`Cyber securite B2`, `probabilites` : `:root` réécrit en surfaces papier/encre/oat.

### Monde 3 — Templates de cours **non migrés** ❌
- **Slate/Tailwind clair** : `admin-vm`, `droit`, `uiux`, `uml`, `b1`.
- **Dark navy glass** : `docker`, `api-rest-flask`, `erp-si`, `ingenierie-besoin`,
  `masterclass-apprendre`, `infographie`, `preparation-web`.

**Constat structurel majeur :** sur 704 pages source, **121 seulement chargent
`tokens.css`** (principalement les `sommaire.html` + `exercice-*.html`), tandis que
**363 chargent un `style.css` local**. Les pages `index.html` et `chapitres/*.html`
ne consomment donc **pas** le système central — elles héritent du template local, qui peut
être à des années-lumière du bundle.

> Exemple : `linux/index.html` et `linux/chapitres/chapitre1.html` ne chargent que
> `assets/css/style.css` ; `linux/sommaire.html` charge le système central. **Deux
> esthétiques dans un même cours.**

---

## 4. Matrice de conformité token par token

Légende : ✅ respecté · 🟡 adapté (esprit respecté, valeur ≠) · 🔴 non respecté ·
⚪ défini mais inutilisé · ➖ hors périmètre.

### 4.1 Couleurs

| Token bundle | Valeur | Projet (tokens.css) | Statut |
|---|---|---|---|
| Canvas White | `#ffffff` | `--color-bg-elevated` | ✅ |
| Rich Black | `#000000` | `--color-primary` (= encre CTA/texte fort) | ✅ |
| Off White | `#f5f3f1` | `--color-bg` | ✅ |
| Off White | `#f8f8f8` | — (remplacé par `#f0eeec`) | 🔴 / ⚪ |
| Off White | `#f8f7f6` | — | 🔴 |
| Translucide | `rgba(255,255,255,.44)` | — | 🔴 |
| Translucide | `rgba(255,255,255,.3)` | — | 🔴 |
| Bleu | `#abbdff` | `--bf-pastel-blue` | ⚪ (0 usage) |
| Violet | `#d3b8ff` | `--bf-pastel-purple` | ⚪ |
| Rouge | `#ffc3b8` | `--bf-pastel-red` | ⚪ |
| Orange | `#ffcc9c` | `--bf-pastel-orange` | ⚪ |
| Orange | `#fce49d` | — | 🔴 |
| Teal | `#a0dcd5` | `--bf-pastel-teal` (3 usages) | 🟡 |
| Jaune | `#edf5a1` | `--bf-pastel-yellow` | ⚪ |
| Vert | `#29cc57` | `--color-accent` | ✅ |
| Vert | `#15b441` | `--color-accent-hover` | ✅ |

**Couleurs ajoutées hors bundle (violation du « Don't ») :** `#f0eeec` (subtle),
`--bf-gold #c69c1e`, `--color-interactive #3556d9`, `--color-ring #456dff`, plus toute la
**palette stone dark** (`#0c0a09/#1c1917/#292524/#fafaf9/#d6d3d1/#a8a29e`) — inventée car
le bundle **n'a pas de mode sombre**. Enfin, les cours non migrés emploient une **vaste
palette Tailwind** absente du bundle : `#10b981`, `#34d399`, `#ef4444`, `#f59e0b`,
`#fbbf24`, `#22d3ee`, `#3b82f6`, `#111827`, `#95a3b8`…

### 4.2 Surfaces

| Niveau bundle | Valeur | Projet | Statut |
|---|---|---|---|
| 0 Base | `#ffffff` | `--color-bg-elevated` | ✅ |
| 1 | `#f5f3f1` | `--color-bg` | ✅ |
| 2 | `#f8f8f8` | remplacé par `#f0eeec` | 🟡→🔴 |
| 3 translucide | `rgba(255,255,255,.44)` | — | 🔴 |

Le **4ᵉ niveau** (surface translucide, utilisée par les cartes « Outlined » du bundle) n'est
pas repris. Les cours non migrés utilisent `#f9fafb`/`#f3f4f6` (slate) ou du glass navy à la
place des surfaces bundle.

### 4.3 Rayons

| Bundle | Projet central | Statut |
|---|---|---|
| `8px` | `--radius-sm` 8 | ✅ |
| `12px` | `--radius-md` 12 | ✅ |
| `16px` | `--radius-lg` 16 | ✅ |
| `18px` | `--radius-xl` 18 | ✅ |
| `20px` | `--radius-2xl` 20 | ✅ |
| `24px` | `--radius-3xl` 24 | ✅ |
| `60px` | `--radius-pill` 60 | ✅ |
| `9999px` | `--radius-full` | ✅ |
| `44px`, `17px`, `54px` | — | 🔴 (non repris) |

**Mais :** à l'intérieur des templates de cours migrés, l'échelle diverge —
`linux`/`csharp` déclarent `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 16px`,
`--radius-xl: 24px` → **6 et 10 n'existent pas dans le bundle** (🔴 sur ces deux pas).
`react`/`Cyber` : `--radius-md: 14px` (🔴). Seul le rayon « 20px » (cartes) est globalement
juste.

### 4.4 Ombres

| Bundle | Projet central | Statut |
|---|---|---|
| shadow-1 `.04 0 1 3` | `--shadow-xs` | ✅ |
| shadow-2 `.05 0 0 14` | `--shadow-sm` | ✅ |
| shadow-4 `.1 0 0 15` | `--shadow-xl` | ✅ |
| shadow-5 `.05 0 4 7` | `--shadow-md` | ✅ |
| shadow-7 `.05 0 4 14` | `--shadow-lg` | ✅ |
| shadow-3 `#e5e5e5 0 4 0` (relief carte) | `--shadow-3d-white #e4e4e4` | 🟡 (valeur proche) |
| shadow-11 `#000 0 4 0` (CTA noir) | `--shadow-3d-black` | ✅ |
| shadow-8 halo | — | 🔴 |
| **Ombre de carte des templates** | `0 4 20px rgba(28,25,23,.06)` (linux/csharp) / `0 4 24px rgba(0,0,0,.06)` (ccna) | 🔴 non bundle (le bundle n'a pas d'ombre diffuse 20–24px pour les cartes : il utilise un **relief dur** `0 4 0`) |

### 4.5 Gradients

Le **gradient signature** (`--bf-gradient-signature`) est défini dans `tokens.css` et
réellement utilisé à **5 endroits** : soulignement du hero du portail (`portal.css`),
`404.html`, `public/css/auth-styles.css`, `public/login.html`, `public/account.html` → 🟡
(présent, mais cantonné au portail/auth).
Les **7 autres gradients** du bundle (fondus `to right/left`, hero multi-couches) **ne sont
pas repris**. → 🔴 / ⚪.

### 4.6 Espacement & layout

- Le projet a une échelle 4pt (`--space-1…40`) — **différente** du jeu de paddings bundle,
  mais cohérente en soi. Les paddings bundle nommés (`34px 36px`, `32px 72px 0`, `80px 0`,
  `4px 8px`) ne sont **pas** transposés en tokens. → 🟡.
- **Containers** : le bundle utilise `1296`/`1216`/`688`/`350`. Le projet utilise
  `640/768/1024/1280/1440`. **Aucune occurrence de 1296/1216** dans le CSS. → 🔴.
- **Densité** : bundle = _spacious_ avec rythme de section 207–254px. Le projet utilise
  `--space-12` (48px) / `--space-20` (80px) pour les sections → **plus dense** que le bundle.

### 4.7 Typographie (hors police)

- Échelle : le bundle est en 16/14/12px ; le projet part de `--text-base: 14px` et monte
  jusqu'à 72px avec des `clamp()`. → 🟡 (échelle ré-architecturée, pas 1:1).
- Graisses : bundle 400/500/700 ; projet 400/500/600/700/800 → 🟡 (600/800 ajoutés).
- Les interlignes/letter-spacings du bundle (`24px`, `21px`, `normal`) ne sont pas des tokens
  distincts côté projet. → 🟡.

### 4.8 Composants

| Composant bundle | Transposition projet | Statut |
|---|---|---|
| _Primary Button_ `#f8f7f6`/radius 12/bordure `#e4e4e4`/shadow-2 | `.btn--secondary` = `#ffffff` + `--shadow-3d-white` | 🟡 (simplifié) |
| _Primary Pill Button_ `#29cc57` radius 9999 | `.btn--accent` (`#29cc57` + `--shadow-3d-green`) | ✅ |
| _CTA noir 3D_ | `.btn--primary` (`#000` + `--shadow-3d-black`) | ✅ |
| _Pill Badge_ `#15b441` radius 12 pad `4px 8px` | `.badge--accent` (radius 12, vert pur) | ✅ |
| _Elevated Card_ radius 20 pad 40 relief dur | `.card` radius 20, mais pas de relief dur (ombre diffuse) | 🟡 |
| _Outlined Card_ `#f8f8f8` radius 8 | non transposé | 🔴 |
| _Surface Card_ `#f5f3f1` radius 17–18 | `.card` (fond `#ffffff`) | 🟡 |
| _Input_ translucide radius 32 | `.input` opaque radius 12 | 🔴 |
| _Navigation_ pill radius 9999 | `.topbar` barre plate radius 0 | 🔴 |

### 4.9 Motion

Bundle : easings `ease-out`, `cubic-bezier(.16,1,.7,1)`, `ease-in`, `cubic-bezier(.4,0,.2,1)`.
Projet : `cubic-bezier(.4,0,.2,1)`, `cubic-bezier(.16,1,.3,1)`, `cubic-bezier(.34,1.56,.64,1)`.
→ 🟡 proche, avec un easing « spring » ajouté (non bundle).

---

## 5. Conformité par cours (24 canoniques + `b1` hors liste)

| Cours | Template | Surfaces/textes | Accent | Statut global |
|---|---|---|---|---|
| linux | `#f5f3f1`/`#ffffff`/`#141414` | ✅ bundle | `#EA580C` (identité) | ✅ conforme* |
| csharp | idem | ✅ | `#A16207` | ✅* |
| sql | idem | ✅ | `#0369A1` | ✅* |
| rd_java | idem | ✅ | `#B91C1C` | ✅* |
| ccna | idem | ✅ | `#0369A1` | ✅* |
| rd_winserver | idem | ✅ | `#1D4ED8` | 🟡 (restes `#6b7280` ×8 dans chapitres) |
| assembleur | `#f5f3f1`/`#ffffff` | ✅ | `#f97316`/`#facc15` | ✅* |
| react | `#f5f3f1`/`#f0eeec` | ✅ | `#0891b2` | ✅* |
| Cyber securite B2 | idem react | ✅ | `#06b6d4` | ✅* |
| php | `#ffffff`/`#f5f3f1`/`#f0eeec` | ✅ (code `#1c1917`) | `#DB2777` | ✅* |
| probabilites | `#f5f3f1`/`#ffffff` | 🟡 (glass `rgba` + texte `#1c1917`) | `#0EA5E9` | 🟡 |
| admin-vm | `#ffffff`/`#f9fafb`/`#f3f4f6` | 🔴 slate | `#0ea5e9` | 🔴 non migré |
| droit | `#ffffff`/`#f9fafb` | 🔴 slate | `#f59e0b` | 🔴 |
| uiux | `#ffffff`/`#f9fafb` | 🔴 slate | `#0891B2` | 🔴 |
| uml | `#ffffff`/`#f9fafb` | 🔴 slate | `#E91E8C` (magenta) | 🔴 |
| b1 (hors canonique) | `#ffffff`/slate | 🔴 + violet `#8b5cf6` | `#10b981` | 🔴 legacy |
| docker | `#07111f`/`#021826` navy | 🔴 dark navy + glass | `#22d3ee` | 🔴 non migré |
| api-rest-flask | `#07151a` navy | 🔴 dark navy | `#34d399` | 🔴 |
| erp-si | `#11121a` navy | 🔴 dark navy | `#f59e0b` | 🔴 |
| ingenierie-besoin | `#0d1220` navy | 🔴 dark navy | `#0EA5E9` | 🔴 |
| masterclass-apprendre | `#10131b` navy | 🔴 dark navy | `#f472b6` | 🔴 |
| infographie | `#160b18` navy | 🔴 dark navy | `#fb7185` | 🔴 |
| preparation-web | `#07110f` navy | 🔴 dark navy | `#34d399` | 🔴 (page `preparation-*.html` incluse) |
| epreuves | pas de `style.css` | (hérite) | — | ⚪ à vérifier |
| RD-RO | migré (emerald) | ✅ | `#059669` | 🟡 (navy `#0f172a` ×9 dans chapitres) |

`*` conforme = surfaces/textes/bordures bundle **dans le template**, mais avec des **rayons
6/10/14 divergents** et des **ombres codées en dur** — voir §6.

**Bilan :** 10/24 conformes (linux, csharp, sql, rd_java, ccna, rd_winserver, assembleur,
react, Cyber, php — avec réserves rayons/ombres), 4 en slate, 7 en dark navy, 2 en zone
grise (probabilites, RD-RO), 1 sans CSS propre (epreuves). `b1` (hors canonique) est
également non conforme.

---

## 6. Ce qui DEVRAIT être respecté mais ne l'a pas été

Hiérarchisé par impact.

### 🔴 P1 — 11 cours canoniques entièrement hors bundle (≈ 46 % du site)
Aucune de leurs pages n'utilise les surfaces, textes ni bordures du bundle.

- **Dark navy glass (7)** : `docker/assets/css/style.css:1` (`--bg: #07111f`,
  `--panel: rgba(15,23,42,.78)`), `api-rest-flask/…:1`, `erp-si/…:1`,
  `ingenierie-besoin/…:1`, `masterclass-apprendre/…:1`, `infographie/…:1`,
  `preparation-web/…:1` (`--bg: #07110f`). **Le bundle est light-first ; ces cours sont
  intégralement sombres.**
- **Slate clair (5)** : `admin-vm/…:1`, `droit/…:1`, `uiux/…:1`, `uml/…:1`, `b1/…:1` —
  `--bg-secondary: #f9fafb`, `--text-primary: #111827`, `--text-muted: #6b7280`,
  `--code-border: #e5e7eb`, `--glass-border: rgba(0,0,0,.08)`. **Aucune de ces valeurs
  n'est dans le bundle** (le bundle est `#f5f3f1`/`#141414`/`#57534e`/`#e4e4e4`).

### 🔴 P2 — Incohérence intra-cours (pages sommaire vs pages contenu)
Chaque cours charge **deux systèmes** : le central (conforme) pour `sommaire.html` et
`exercice-*.html`, le local (souvent non conforme) pour `index.html` et `chapitres/*.html`.
→ L'utilisateur voit une rupture visuelle en naviguant. 121 pages sur 704 seulement
consomment `tokens.css` ; 363 consomment un template local.

### 🔴 P3 — Palette / éléments identitaires du bundle définis mais non utilisés
- `--bf-gradient-signature` (`#7491ff→#ff90e0→#f9d25c`) : **5 usages** (portail, 404, auth,
  login, account) — présent mais absent des pages de cours.
- `--bf-pastel-*` (6 teintes) : **0 à 1 fichier**.
- Surfaces 2 (`#f8f8f8`) et 3 (translucide) du bundle : **jamais utilisées**.
- Containers bundle `1296`/`1216` : **0 occurrence**.
- `--shadow-3d-green/black/white` : utilisés dans 1–2 fichiers (le `.btn` central).
→ Le vocabulaire du bundle existe mais n'irrigue presque pas les pages.

### 🟡 P4 — Composants bundle non transposés
- _Primary Button_ `#f8f7f6` (bordure `#e4e4e4`, radius 12, shadow-2) → non repris.
- _Outlined Card_ `#f8f8f8` radius 8 → non repris.
- _Input_ translucide radius 32 → projet opaque radius 12.
- _Navigation_ pill radius 9999 → projet : barre plate radius 0.

### 🟡 P5 — Rayons divergents dans les templates migrés
`linux`/`csharp` : `--radius-sm: 6px`, `--radius-md: 10px` (absents du bundle : 8 et 12).
`react`/`Cyber` : `--radius-md: 14px`. Les cours non migrés utilisent `0.375rem`/`0.75rem`
(6/12px). → le pas de rayons n'est pas uniforme.

### 🟡 P6 — Ombres codées en dur non-bundle
`linux`/`csharp` : `--shadow-card: 0 4px 20px rgba(28,25,23,.06)`.
`ccna`/`rd_winserver` : `0 4px 24px rgba(0,0,0,.06)`. Le bundle n'a pas d'ombre diffuse
20–24px pour les cartes (il utilise un **relief dur** `#e5e5e5 0 4 0`).

### 🟡 P7 — Restes old-world dans les pages (inline)
- `RD-RO/chapitres/*` : `#0f172a` (navy) ×9 fichiers.
- `rd_winserver/chapitres/*` : `#6b7280` (gris) ×8.
- `admin-vm/chapitres/*` : `#0ea5e9` ×7 ; `uml/chapitres/*` : `#94a3b8` ×5.
- `droit` (`#f59e0b`, `#111827`), `epreuves` (`#111827`), `csharp`/`probabilites` (isolés).
- Palette Tailwind inline très présente : `#10b981` ×185, `#f59e0b` ×154, `#ef4444` ×149.

### 🟡 P8 — Anneaux de focus navy oubliés
`assets/css/components.css:133` et `:192` : `box-shadow: 0 0 0 3px rgba(15, 23, 42, …)` —
teinte navy du vieux monde (le bundle utilise `#456dff` en focus).

### 🔴 P9 — Mode sombre absent du bundle
Le projet ajoute un thème sombre « stone » via `[data-theme="dark"]` dans 14 templates. Le
bundle **n'en fournit aucun**. Ce n'est pas forcément un défaut, mais c'est une **extension
non couverte par la cible** (à assumer explicitement).

---

## 7. Ce qui est respecté

- ✅ **Socle central** (`tokens.css` + `base.css` + `components.css` + `portal.css` +
  `sommaire.css`) : surfaces 0/1, encre, muted, bordures oat `#e4e4e4`, échelle de rayons,
  ombres 1/2/4/5/7, CTA pill 3D (`#29cc57`/`#000`), pill badge radius 12.
- ✅ **10 cours migrés** vers « papier chaud » avec conservation de l'accent identitaire.
- ✅ **Accents par cours** : le bundle ne prescrit pas de couleur par produit ; le projet les
  a définies (`--course-*`) et les conserve — décision cohérente avec le principe « conserver
  les rôles ».
- ✅ **Pages d'auth** (`public/css/auth-styles.css`) : fond `#000000` (rich black), carte
  papier `#fafaf9`, periwinkle interactif → conforme à l'esprit bundle.
- ✅ **Purge violet/indigo** : `#8b5cf6`/`#6366f1`/`#a78bfa` ne subsistent **que** dans
  `b1/`, `roadmap/` et `index-light-preview.html` (hors canonique) — les 24 cours canoniques
  en sont exempts.
- ✅ **Motion** : réutilise les courbes bundle + `prefers-reduced-motion`.

---

## 8. Écarts assumés / acceptables

- **Police JetBrains Mono** — hors périmètre (décision produit).
- **Pas de `CoFo Brilliant`** — le bundle interdit de copier les typos propriétaires ; choix
  conforme au « Don't ».
- **Palette par cours** — extension cohérente (« conserver les rôles »).
- **Mode sombre stone** — extension, à documenter.
- **Couleurs sémantiques AA** (`--color-success #047857`, etc.) — le bundle n'a pas de
  sémantique d'état ; valeurs assombries pour l'accessibilité → acceptable.
- **Or premium `#c69c1e`** — hors bundle mais rôle « gamification » non couvert.

---

## 9. Risques & recommandations (à titre indicatif — aucune action faite)

1. **Prioriser P1** : migrer les 12 cours non conformes vers les surfaces/textes/bordures
   bundle (le patron existe déjà dans `linux`/`react`).
2. **P2** : unifier le chargement CSS par cours (que `index.html` et `chapitres/*.html`
   consomment aussi le système central, ou que le template local hérite des tokens).
3. **P3** : exprimer réellement le vocabulaire bundle (gradient signature, pastels,
   surface 2/3) ou le retirer de `tokens.css` s'il est mort.
4. **P5/P6** : aligner rayons et ombres des templates migrés sur `tokens.css`.
5. **P7/P8** : purger les dernières valeurs old-world (navy, slate, tailwind) inline + les
   focus rings.
6. **Décision produit** : documenter explicitement que le mode sombre et l'accent par cours
   **étendent** le bundle.

---

## 10. No silent caps

- L'audit des **valeurs** repose sur les blocs `:root` + greps d'usage, **pas** sur un rendu
  navigateur page par page (704). Les captures de contrôle du run précédent existent dans
  `.taskstate/` et couvrent 1 page représentative par cours migré.
- `dist/` (584 pages générées) est réputé identique à la source ; non audité en détail.
- Les cours **hors liste canonique** (`b1`, `roadmap`, `droitb2`, `cours windows`,
  `administration machine virtuel`) sont signalés mais pas audités finement.
- `epreuves/` n'a pas de `style.css` propre : son rendu dépend de l'héritage → non tranché.
- La conformité **police** est volontairement exclue (demande explicite).

---

### Conclusion honnête

Le dépôt **a la bonne cible et un socle correct**, mais **ne l'applique pas partout**.
Aujourd'hui : **≈ 42 % des cours (10/24) respectent le bundle**, **≈ 17 % sont en slate**
(4/24), **≈ 29 % sont en dark navy** (7/24), le reste en zone grise — et **deux tiers des
pages ne chargent même pas le système de design central**. L'écart n'est pas dans les tokens
(bien pensés), mais dans la **couverture** et l'**uniformité**.
