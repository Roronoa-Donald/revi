# Module 06: String Functions

> Fiche extraite du fichier `sql/modules/mod06-strings.html` (410 lignes, 26.6 Ko, sha256 `25f6f4e75927`).
> Famille : **cours-sql** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/modules/mod06-strings.html` |
| Titre du document | Module 06 : Fonctions Texte \| RD-SQL |
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
| 2 | h1 | — | Module 06: String Functions |
| 3 | h2 | — | 1. Le Grand Nettoyage |
| 4 | h2 | — | 2. La Trousse à Outils |
| 5 | h2 | — | 3. Mission : Générateur d'Emails |
| 6 | h2 | — | Zone d'Entraînement |

## 3. Hierarchie des titres

- **H1** — Module 06: String Functions
  - **H2** — 1. Le Grand Nettoyage
  - **H2** — 2. La Trousse à Outils
      - **H4** — Uniformiser
      - **H4** — Nettoyer (TRIM)
      - **H4** — Coller (CONCAT)
  - **H2** — 3. Mission : Générateur d'Emails
      - **H4** — Votre Mission
      - **H4** — MÉMO TECHNIQUE — Fonctions Texte
  - **H2** — Zone d'Entraînement
      - **H4** — 1. Mise en Majuscule
      - **H4** — 2. Initiales
      - **H4** — 3. Longueur
      - **H4** — 4. Recherche Floue
      - **H4** — 5. Formatage Téléphone
      - **H4** — Défi 1 : Nettoyage
      - **H4** — Défi 2 : Recherche
      - **H4** — Défi 3 : Extraction

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4` | Tableau de Bord → `../index.html` |

Liens sortants : **4** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Tableau de Bord | `../index.html` | `sql/index.html` | interne |
| ← Module 05 : Calculs & Agrégats | `mod05-calculations.html` | `sql/modules/mod05-calculations.html` | interne |
| Tous les modules | `../index.html` | `sql/index.html` | interne |
| Module 07 : Dates & Nulls → | `mod07-dates-nulls.html` | `sql/modules/mod07-dates-nulls.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) |  | — | `theme-toggle` | Changer de thème | actif | — |
| Générer |  | — | `bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-sm font-bold flex items-center gap-2` | — | actif | — |
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
- Blocs `pre` : 0 · elements `code` : 12
- SVG inline : 7 · images : 0
- Icones du sprite utilisees : `#i-mail`, `#i-brain`, `#i-dot`
- Volume de texte : ~859 mots · 194 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`, `../assets/css/style.css`, `/assets/css/icons.css`
- Scripts externes : `https://cdn.tailwindcss.com`, `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`, `../assets/js/gamification.js`, `../assets/js/sql-engine.js`, `../assets/js/drag-drop.js`, `../assets/js/main.js`
- Blocs `<style>` inline : 0 · scripts inline : 2

## 10. Classes et attributs data observes

Classes distinctes : 171. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `font-bold` | 25 |
| `fas` | 21 |
| `text-sm` | 21 |
| `flex` | 18 |
| `border` | 17 |
| `rounded` | 16 |
| `p-4` | 13 |
| `text-white` | 11 |
| `transition-colors` | 11 |
| `text-slate-400` | 11 |
| `border-slate-800` | 11 |
| `border-slate-700` | 10 |
| `text-xs` | 10 |
| `text-slate-500` | 10 |
| `text-blue-400` | 9 |
| `font-mono` | 9 |
| `mb-4` | 9 |
| `items-center` | 8 |
| `text-3xl` | 8 |
| `mb-6` | 8 |

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
