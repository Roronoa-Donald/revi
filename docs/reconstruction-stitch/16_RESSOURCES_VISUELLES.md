# 16 — Ressources visuelles

## 1. Palette (tokens)

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | `#faf7f2` | fond général (latte) |
| `--surface` | `#ffffff` | cartes, champs |
| `--surface-2` | `#f3eee5` | fonds secondaires, pseudo-code |
| `--ink` | `#141414` | texte principal |
| `--muted` | `#57534e` | texte secondaire |
| `--line` | `#e7e0d6` | bordures |
| `--accent` | `#3556d9` | interactif, focus |
| `--accent-soft` | `#e8edfb` | fonds d'accent |
| `--green` | `#29cc57` | CTA abonnement |
| `--green-shadow` | `#22a94c` | ombre dure du CTA |
| `--ok` | `#047857` | succès |
| `--warn` | `#b45309` | avertissement |
| `--bad` | `#b91c1c` | erreur |
| `--dark` | `#0c0a09` | header admin, footer, boutons actifs |
| `--dark-2` | `#1c1917` | surfaces sombres |

Thème sombre : `[data-theme="dark"]` sur `<html>`, inversions de fond/texte, mêmes accents.

## 2. Typographie

Le produit est **intégralement en monospace** : `--font-sans` pointe sur JetBrains Mono. Quatre `@font-face` (normal et italique, latin et latin-ext) chargent des WOFF2 locaux depuis `/assets/fonts/`, en `font-display: swap`, poids variable 300–800. Aucun appel à Google Fonts. C'est un choix identitaire fort : ne pas remplacer par une sans-serif dans Stitch.

| Rôle | Réglage |
|---|---|
| Famille | **JetBrains Mono** (variable, auto-hébergée) pour TOUT le produit, titres et texte inclus ; pile de repli `'Fira Code', 'Cascadia Code', ui-monospace, 'SF Mono', Consolas, monospace` |
| Titre hero | `clamp(2.25rem, 6vw, 3.75rem)`, 800, line-height 1,05, letter-spacing −0,04em |
| H1 de cours | `clamp(1.7rem, 4vw, 2.15rem)`, 800 |
| H2 | 1,5rem, 800, bordure basse |
| H3 | 1,15rem, 700 |
| Corps | 1rem / 1,7 |
| Petit | 0,8–0,86rem |
| Libellés | 0,72rem, 700, letter-spacing 0,04em, uppercase |

Les cours générés utilisent une échelle légèrement différente via leur `cours.css`.

## 3. Icônes

| Élément | Détail |
|---|---|
| Fichier | `assets/img/ui-icons.svg` |
| Format | sprite SVG avec `<symbol>` |
| Nombre | 85 symboles |
| Usage | `<svg><use href="/assets/img/ui-icons.svg#icone"></use></svg>` |
| Taille | 16–20 px en navigation, 22–26 px en en-tête de carte, 48 px sur les cartes de cours |
| Couleur | `currentColor` |
| Emoji | interdits par la règle produit |

Icônes disponibles (échantillon représentatif) : `book`, `code`, `terminal`, `database`, `network`, `shield`, `cloud`, `server`, `wrench`, `chart`, `scale`, `language`, `globe`, `cpu`, `layers`, `git`, `linux`, `python`, `windows`, `lock`, `key`, `user`, `users`, `mail`, `arrow-right`, `arrow-left`, `check`, `x`, `play`, `stop`, `refresh`, `search`, `sun`, `moon`, `menu`, `home`, `clock`, `alert`, `info`, `sparkles`, `robot`, `file`, `folder`, `download`, `external-link`, `copy`, `trash`, `settings`, `logout`, `login`, `credit-card`, `calendar`, `award`, `target`, `zap`.

La liste exhaustive est dans `evidence/icons.json`. Les cours peuvent définir leur propre icône (`data-icon` dans le registre).

## 4. Images

| Ressource | Emplacement | Usage |
|---|---|---|
| Sprite d'icônes | `assets/img/ui-icons.svg` | toute l'interface |
| Logo | icône `book`/`graduation` dans le sprite + texte | topbar, auth |
| Favicon | `assets/img/favicon.svg`, référencé par `<link rel="icon">` sur la majorité des pages servies | — |
| Illustrations | **aucune** | — |
| Photographies | **aucune** | — |
| Dégradés | **aucun** dégradé décoratif ; fonds unis | — |

**Conséquence pour Stitch** : ne pas ajouter d'illustrations ni de photos. L'identité repose sur la typographie, la palette chaude et les icônes monochromes.

## 5. Formes et élévations

| Élément | Rayon | Ombre |
|---|---|---|
| Carte de cours | 16 px | `0 1px 2px rgba(20,20,20,.04), 0 8px 24px rgba(20,20,20,.05)` |
| Carte auth | 18 px | `0 8px 30px rgba(28,25,23,.06)` |
| Encadré | 14 px | aucune |
| Bloc de code | 12 px | aucune |
| Bouton | 60 px (pill) | version verte : `0 4px 0 #22a94c` |
| Champ | 12 px | bordure 1 px, focus anneau |
| Modale | 16 px | ombre large |
| Badge | 60 px | aucune |
| Flashcard | 16 px | ombre douce |

## 6. Espacements

Échelle de 4 px : 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 96.
- Padding de page de cours : 28 px haut, 20 px côtés, 90 px bas.
- Padding de carte : 20–24 px.
- Gap de grille : 16 px (portail), 12 px (admin).
- Marge entre sections : 32–48 px.

## 7. Fichiers CSS

| Fichier | Portée |
|---|---|
| `assets/css/tokens.css` | variables, reset, thème |
| `assets/css/components.css` | boutons, cartes, badges, formulaires partagés |
| `assets/css/portal.css` | portail |
| `assets/css/course.css` | cours (générique) |
| `assets/css/code-lab.css` | code lab |
| `<cours>/assets/css/cours.css` | styles spécifiques au cours (généré) |
| `preparation-web/assets/css/style.css` | application atelier |
| `public/css/auth.css` | connexion, compte |
| `public/css/admin.css` | console admin |
| `epreuves/assets/epreuves.css` (à vérifier) | annales |

## 8. Scripts clients

| Fichier | Rôle |
|---|---|
| `rd-ai-chat.js` | widget de chat global |
| `assets/js/code-lab.js` | moteur du code lab (Monaco, exécution, validation, tuteur) |
| `<cours>/assets/js/cours.js` | QCM, flashcards, progression locale |
| `public/js/auth-check.js` | état de connexion et redirections |
| `public/js/account.js` | page compte, FedaPay |
| `public/js/admin.js` | console admin |
| `preparation-web/assets/js/app.js` | atelier |
| `assets/fonts/` | 4 WOFF2 JetBrains Mono (latin, latin-ext, italiques) |
| `assets/vendor/monaco/` | éditeur (13 Mo, non npm) |
| `b1-sql/assets/vendor/sqljs/` | SQLite WebAssembly |

## 9. Contraintes visuelles à respecter

1. **Pas d'emoji** — trois pages servies en contiennent encore (voir [19](19_FONCTIONNALITES_INCOMPLETES.md)).
2. **Icônes uniquement depuis le sprite** — ne pas mélanger avec une librairie d'icônes.
3. **Fond crème, pas de blanc pur en page** — le blanc est réservé aux surfaces.
4. **Un seul accent interactif bleu** — le vert est réservé au paiement et aux CTA monétaires.
5. **Ombres très douces** — aucune ombre portée marquée, sauf l'ombre dure du bouton vert.
6. **Coins généreux** — 12 à 18 px, jamais 0 ni 24+.
7. **Pas d'illustration** — la densité vient du texte et des encadrés colorés.
