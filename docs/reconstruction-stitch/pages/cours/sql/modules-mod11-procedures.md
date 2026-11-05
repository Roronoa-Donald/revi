# Module 11: Procédures

> Fiche extraite du fichier `sql/modules/mod11-procedures.html` (353 lignes, 25.5 Ko, sha256 `166f8c93c7a1`).
> Famille : **cours-sql** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/modules/mod11-procedures.html` |
| Titre du document | Module 11 : Procédures Stockées \| RD-SQL |
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
| 2 | h1 | — | Module 11: Procédures |
| 3 | h2 | — | 1. L'Usine à Requêtes |
| 4 | h2 | — | 2. Créer une Procédure |
| 5 | h2 | — | 3. Paramètres IN et OUT |
| 6 | h2 | — | 4. Exécuter, Modifier, Supprimer |
| 7 | h2 | — | 5. Gestion d'Erreurs dans une Procédure |
| 8 | h2 | — | 6. Pourquoi utiliser des Procédures ? |
| 9 | h2 | — | 7. Labo Pratique |
| 10 | h2 | — | 8. Quiz — Procédures Stockées |
| 11 | h2 | — | 9. Challenge — Glisser-Déposer |

## 3. Hierarchie des titres

- **H1** — Module 11: Procédures
  - **H2** — 1. L'Usine à Requêtes
  - **H2** — 2. Créer une Procédure
  - **H2** — 3. Paramètres IN et OUT
      - **H4** — Paramètre IN (entrée)
      - **H4** — Paramètre OUTPUT
  - **H2** — 4. Exécuter, Modifier, Supprimer
  - **H2** — 5. Gestion d'Erreurs dans une Procédure
  - **H2** — 6. Pourquoi utiliser des Procédures ?
  - **H2** — 7. Labo Pratique
      - **H4** — MÉMO TECHNIQUE — Procédures Stockées
  - **H2** — 8. Quiz — Procédures Stockées
  - **H2** — 9. Challenge — Glisser-Déposer

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4` | Tableau de Bord → `../index.html` |

Liens sortants : **4** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Tableau de Bord | `../index.html` | `sql/index.html` | interne |
| ← Module 10 : Transactions | `mod10-transactions.html` | `sql/modules/mod10-transactions.html` | interne |
| Tous les modules | `../index.html` | `sql/index.html` | interne |
| Module 12 : Triggers → | `mod12-triggers.html` | `sql/modules/mod12-triggers.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) |  | — | `theme-toggle` | Changer de thème | actif | — |
| CREATE |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| OUTPUT |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| TRY/CATCH |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| Compiler |  | — | `bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-sm font-bold` | — | actif | — |
| Vérifier |  | — | `mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page secondaire du cours ; etats derives du composant principal present.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 11
- SVG inline : 5 · images : 0
- Icones du sprite utilisees : `#i-brain`, `#i-dot`, `#i-lightbulb`
- Volume de texte : ~1049 mots · 240 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`, `../assets/css/style.css`, `/assets/css/icons.css`
- Scripts externes : `https://cdn.tailwindcss.com`, `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`, `../assets/js/gamification.js`, `../assets/js/sql-engine.js`, `../assets/js/drag-drop.js`, `../assets/js/main.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 161. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `font-bold` | 25 |
| `text-amber-400` | 24 |
| `text-sm` | 23 |
| `text-blue-400` | 21 |
| `text-slate-400` | 16 |
| `p-4` | 15 |
| `border` | 14 |
| `text-xs` | 14 |
| `flex` | 13 |
| `fas` | 13 |
| `text-white` | 12 |
| `rounded-lg` | 12 |
| `mb-6` | 11 |
| `border-slate-700` | 10 |
| `rounded-xl` | 10 |
| `text-emerald-400` | 10 |
| `animate-fade-in-up` | 9 |
| `text-3xl` | 9 |
| `border-l-4` | 9 |
| `pl-4` | 9 |

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
