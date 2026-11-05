# Module 12: Triggers

> Fiche extraite du fichier `sql/modules/mod12-triggers.html` (412 lignes, 30.0 Ko, sha256 `fa371199f427`).
> Famille : **cours-sql** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/modules/mod12-triggers.html` |
| Titre du document | Module 12 : Triggers \| RD-SQL |
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
| 2 | h1 | — | Module 12: Triggers |
| 3 | h2 | — | 1. L'Effet Papillon de la Base de Données |
| 4 | h2 | — | 2. AFTER — Après l'Action |
| 5 | h2 | — | 3. Les Tables Magiques : inserted & deleted |
| 6 | h2 | — | 4. INSTEAD OF — Interception |
| 7 | h2 | — | 5. Cas d'Usage Réels |
| 8 | h2 | — | 6. Pièges & Performance |
| 9 | h2 | — | 7. Labo Pratique |
| 10 | h2 | — | 8. Quiz — Triggers |
| 11 | h2 | — | 9. Challenge — Glisser-Déposer |
| 12 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Module 12: Triggers
  - **H2** — 1. L'Effet Papillon de la Base de Données
  - **H2** — 2. AFTER — Après l'Action
  - **H2** — 3. Les Tables Magiques : inserted & deleted
  - **H2** — 4. INSTEAD OF — Interception
  - **H2** — 5. Cas d'Usage Réels
  - **H2** — 6. Pièges & Performance
  - **H2** — 7. Labo Pratique
      - **H4** — MÉMO TECHNIQUE — Triggers
  - **H2** — 8. Quiz — Triggers
  - **H2** — 9. Challenge — Glisser-Déposer
    - **H3** — Félicitations !

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4` | Tableau de Bord → `../index.html` |

Liens sortants : **6** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Tableau de Bord | `../index.html` | `sql/index.html` | interne |
| Pratiquer | `../exercices/exercices.html` | `sql/exercices/exercices.html` | interne |
| Flashcards | `cartes.html` | `sql/modules/cartes.html` | interne |
| Examen | `../simulateur-examen.html` | `sql/simulateur-examen.html` | interne |
| ← Module 11 : Procédures | `mod11-procedures.html` | `sql/modules/mod11-procedures.html` | interne |
| Tous les modules | `../index.html` | `sql/index.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) |  | — | `theme-toggle` | Changer de thème | actif | — |
| Audit |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| Soft Delete |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| Validation |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| Activer |  | — | `bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-sm font-bold` | — | actif | — |
| Vérifier |  | — | `mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page secondaire du cours ; etats derives du composant principal present.

## 8. Tableaux, code et medias

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 0 · elements `code` : 5
- SVG inline : 9 · images : 0
- Icones du sprite utilisees : `#i-check-circle`, `#i-brain`, `#i-dot`, `#i-warning`
- Volume de texte : ~1201 mots · 280 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`, `../assets/css/style.css`, `/assets/css/icons.css`
- Scripts externes : `https://cdn.tailwindcss.com`, `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`, `../assets/js/gamification.js`, `../assets/js/sql-engine.js`, `../assets/js/drag-drop.js`, `../assets/js/main.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 184. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `font-bold` | 29 |
| `text-amber-400` | 29 |
| `text-sm` | 24 |
| `fas` | 18 |
| `p-3` | 17 |
| `text-white` | 16 |
| `rounded-lg` | 16 |
| `border` | 16 |
| `text-slate-400` | 16 |
| `flex` | 14 |
| `text-xs` | 13 |
| `p-4` | 12 |
| `mb-6` | 12 |
| `text-center` | 12 |
| `rounded-xl` | 11 |
| `text-emerald-400` | 11 |
| `border-slate-700` | 10 |
| `font-mono` | 10 |
| `animate-fade-in-up` | 10 |
| `glass-card` | 10 |

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
