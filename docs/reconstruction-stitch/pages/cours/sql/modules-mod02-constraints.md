# Module 02: Contraintes

> Fiche extraite du fichier `sql/modules/mod02-constraints.html` (479 lignes, 30.8 Ko, sha256 `7c9f12494ead`).
> Famille : **cours-sql** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/modules/mod02-constraints.html` |
| Titre du document | Module 02 : Contraintes & Clés \| RD-SQL |
| Description meta | — |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4 | 1 liens, aria="" |
| 2 | h1 | — | Module 02: Contraintes |
| 3 | h2 | — | 1. Le Gardien du Temple |
| 4 | h2 | — | 2. L'Identité Unique (Primary Key) |
| 5 | h2 | — | 3. Le Lien Familial (Foreign Key) |
| 6 | h2 | — | 4. Mission : Sécuriser la Table |
| 7 | h2 | — | Zoom : Le Drame de la Suppression |
| 8 | h2 | — | Zone d'Entraînement Intensive |

## 3. Hierarchie des titres

- **H1** — Module 02: Contraintes
  - **H2** — 1. Le Gardien du Temple
  - **H2** — 2. L'Identité Unique (Primary Key)
    - **H3** — Le Problème des Homonymes
  - **H2** — 3. Le Lien Familial (Foreign Key)
  - **H2** — 4. Mission : Sécuriser la Table
      - **H4** — Votre Mission
  - **H2** — Zoom : Le Drame de la Suppression
    - **H3** — Que se passe-t-il si j'efface le Papa ?
      - **H4** — RESTRICT (Par défaut)
      - **H4** — CASCADE (Dangereux)
      - **H4** — MÉMO TECHNIQUE — Contraintes & Clés
  - **H2** — Zone d'Entraînement Intensive
    - **H3** — Quiz de Validation (10 Questions)
      - **H4** — 1. Clé Primaire
      - **H4** — 2. Clé Étrangère
      - **H4** — 3. NOT NULL
      - **H4** — 4. UNIQUE
      - **H4** — 5. CHECK
      - **H4** — Les Symboles
      - **H4** — Conséquences
      - **H4** — Vrai ou Faux ?

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4` | Tableau de Bord → `../index.html` |

Liens sortants : **4** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Tableau de Bord | `../index.html` | `sql/index.html` | interne |
| ← Module 01 : Fondations & DDL | `mod01-ddl.html` | `sql/modules/mod01-ddl.html` | interne |
| Tous les modules | `../index.html` | `sql/index.html` | interne |
| Module 03 : DML → | `mod03-dml.html` | `sql/modules/mod03-dml.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) |  | — | `theme-toggle` | Changer de thème | actif | — |
| Exécuter |  | — | `bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2` | — | actif | — |
| Quiz (10) |  | tab-quiz | `text-blue-400 font-bold border-b-2 border-blue-400 pb-2` | — | actif | — |
| Exercices (5) |  | tab-exos | `text-slate-400 hover:text-white pb-2` | — | actif | — |
| Drag & Drop (3) |  | tab-drag | `text-slate-400 hover:text-white pb-2` | — | actif | — |
| Valider le Quiz |  | — | `bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold` | — | actif | — |
| Vérifier |  | — | `mt-2 text-sm bg-blue-600 px-4 py-1 rounded hover:bg-blue-500` | — | actif | — |
| Vérifier |  | — | `mt-2 text-sm bg-purple-600 px-4 py-1 rounded hover:bg-purple-500` | — | actif | — |
| Vérifier |  | — | `mt-2 text-sm bg-green-600 px-4 py-1 rounded hover:bg-green-500` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page secondaire du cours ; etats derives du composant principal present.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 2
- SVG inline : 7 · images : 0
- Icones du sprite utilisees : `#i-shield`, `#i-brain`, `#i-dot`
- Volume de texte : ~1121 mots · 239 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`, `../assets/css/style.css`, `/assets/css/icons.css`
- Scripts externes : `https://cdn.tailwindcss.com`, `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`, `../assets/js/gamification.js`, `../assets/js/sql-engine.js`, `../assets/js/drag-drop.js`, `../assets/js/main.js`
- Blocs `<style>` inline : 0 · scripts inline : 2

## 10. Classes et attributs data observes

Classes distinctes : 203. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `font-bold` | 37 |
| `text-sm` | 29 |
| `flex` | 24 |
| `rounded` | 24 |
| `text-white` | 22 |
| `fas` | 21 |
| `rounded-xl` | 20 |
| `items-center` | 19 |
| `text-xs` | 18 |
| `p-4` | 16 |
| `text-slate-400` | 15 |
| `py-1` | 15 |
| `mb-6` | 14 |
| `glass-card` | 13 |
| `px-2` | 13 |
| `justify-between` | 12 |
| `border` | 12 |
| `font-mono` | 11 |
| `text-slate-300` | 11 |
| `mb-4` | 10 |

Aucun attribut `data-*`.

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.
