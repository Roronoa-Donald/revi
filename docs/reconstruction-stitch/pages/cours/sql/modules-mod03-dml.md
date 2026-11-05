# Module 03: DML Fondamental

> Fiche extraite du fichier `sql/modules/mod03-dml.html` (521 lignes, 33.0 Ko, sha256 `e3417b74ba9c`).
> Famille : **cours-sql** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/modules/mod03-dml.html` |
| Titre du document | Module 03 : DML (Update/Delete) \| RD-SQL |
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
| 2 | h1 | — | Module 03: DML Fondamental |
| 3 | h2 | — | 1. La Vie des Données |
| 4 | h2 | — | 2. La Naissance (INSERT) |
| 5 | h2 | — | 3. La Modification & Suppression |
| 6 | h2 | — | 4. Mission : Sauver la Paie |
| 7 | h2 | — | Zoom : TRUNCATE vs DELETE |
| 8 | h2 | — | Zone d'Entraînement |

## 3. Hierarchie des titres

- **H1** — Module 03: DML Fondamental
  - **H2** — 1. La Vie des Données
  - **H2** — 2. La Naissance (INSERT)
  - **H2** — 3. La Modification & Suppression
      - **H4** — UPDATE (La Gomme)
      - **H4** — DELETE (La Broyeuse)
  - **H2** — 4. Mission : Sauver la Paie
      - **H4** — Votre Mission
  - **H2** — Zoom : TRUNCATE vs DELETE
    - **H3** — Comment vider une table efficacement ?
      - **H4** — DELETE FROM Table
      - **H4** — TRUNCATE TABLE
      - **H4** — MÉMO TECHNIQUE — DML (Insert/Update/Delete)
  - **H2** — Zone d'Entraînement
      - **H4** — 1. Insertion Simple
      - **H4** — 2. Correction d'Email
      - **H4** — 3. Suppression Ciblée
      - **H4** — 4. Augmentation Générale
      - **H4** — 5. Vide-Grenier (TRUNCATE)
      - **H4** — Défi 1 : Ordre INSERT
      - **H4** — Défi 2 : Safety First
      - **H4** — Défi 3 : Vocabulaire DML

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4` | Tableau de Bord → `../index.html` |

Liens sortants : **4** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Tableau de Bord | `../index.html` | `sql/index.html` | interne |
| ← Module 02 : Contraintes | `mod02-constraints.html` | `sql/modules/mod02-constraints.html` | interne |
| Tous les modules | `../index.html` | `sql/index.html` | interne |
| Module 04 : SELECT → | `mod04-select.html` | `sql/modules/mod04-select.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) |  | — | `theme-toggle` | Changer de thème | actif | — |
| Exécuter |  | — | `bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2` | — | actif | — |
| Quiz (10) |  | tab-quiz | `px-6 py-3 text-blue-400 border-b-2 border-blue-400 font-bold hover:bg-slate-800/50 transition-colors` | — | actif | — |
| Exercices (5) |  | tab-exos | `px-6 py-3 text-slate-400 hover:text-blue-300 hover:bg-slate-800/50 transition-colors` | — | actif | — |
| Drag & Drop (3) |  | tab-drag | `px-6 py-3 text-slate-400 hover:text-blue-300 hover:bg-slate-800/50 transition-colors` | — | actif | — |
| Vérifier mes réponses |  | — | `px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded shadow-lg shadow-blue-900/20 transition-all` | — | actif | — |
| Vérifier |  | — | `w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded border border-slate-600` | — | actif | — |
| Vérifier |  | — | `w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded border border-slate-600` | — | actif | — |
| Vérifier |  | — | `w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded border border-slate-600` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page secondaire du cours ; etats derives du composant principal present.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 5
- SVG inline : 5 · images : 0
- Icones du sprite utilisees : `#i-brain`, `#i-dot`, `#i-warning`
- Volume de texte : ~1160 mots · 245 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`, `../assets/css/style.css`, `/assets/css/icons.css`
- Scripts externes : `https://cdn.tailwindcss.com`, `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`, `../assets/js/gamification.js`, `../assets/js/sql-engine.js`, `../assets/js/drag-drop.js`, `../assets/js/main.js`
- Blocs `<style>` inline : 0 · scripts inline : 2

## 10. Classes et attributs data observes

Classes distinctes : 205. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `font-bold` | 29 |
| `text-sm` | 28 |
| `flex` | 27 |
| `fas` | 26 |
| `border` | 19 |
| `items-center` | 15 |
| `rounded` | 14 |
| `text-white` | 13 |
| `mb-6` | 13 |
| `rounded-xl` | 13 |
| `text-slate-400` | 13 |
| `text-xs` | 13 |
| `text-slate-500` | 13 |
| `font-mono` | 12 |
| `mb-4` | 12 |
| `p-4` | 11 |
| `justify-between` | 11 |
| `transition-colors` | 11 |
| `border-slate-800` | 11 |
| `text-blue-400` | 10 |

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
