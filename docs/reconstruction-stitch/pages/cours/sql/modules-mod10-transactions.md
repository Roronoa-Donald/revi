# Module 10: Transactions

> Fiche extraite du fichier `sql/modules/mod10-transactions.html` (355 lignes, 27.8 Ko, sha256 `bb49c9566dbb`).
> Famille : **cours-sql** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/modules/mod10-transactions.html` |
| Titre du document | Module 10 : Transactions & ACID \| RD-SQL |
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
| 2 | h1 | — | Module 10: Transactions |
| 3 | h2 | — | 1. Le Pacte du Tout-ou-Rien |
| 4 | h2 | — | 2. ACID — Les 4 Garanties |
| 5 | h2 | — | 3. BEGIN / COMMIT / ROLLBACK |
| 6 | h2 | — | 4. SAVEPOINT — Point de Sauvegarde |
| 7 | h2 | — | 5. Niveaux d'Isolation |
| 8 | h2 | — | 6. Deadlock — L'Impasse |
| 9 | h2 | — | 7. Labo Interactif — Simulateur |
| 10 | h2 | — | 8. Quiz — Transactions |
| 11 | h2 | — | 9. Challenge — Glisser-Déposer |
| 12 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Module 10: Transactions
  - **H2** — 1. Le Pacte du Tout-ou-Rien
  - **H2** — 2. ACID — Les 4 Garanties
      - **H4** — Atomicité
      - **H4** — Cohérence
      - **H4** — Isolation
      - **H4** — Durabilité
  - **H2** — 3. BEGIN / COMMIT / ROLLBACK
  - **H2** — 4. SAVEPOINT — Point de Sauvegarde
  - **H2** — 5. Niveaux d'Isolation
  - **H2** — 6. Deadlock — L'Impasse
  - **H2** — 7. Labo Interactif — Simulateur
      - **H4** — MÉMO TECHNIQUE — Transactions & ACID
  - **H2** — 8. Quiz — Transactions
  - **H2** — 9. Challenge — Glisser-Déposer

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4` | Tableau de Bord → `../index.html` |

Liens sortants : **4** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Tableau de Bord | `../index.html` | `sql/index.html` | interne |
| ← Module 09 : Boucles | `mod09-loops.html` | `sql/modules/mod09-loops.html` | interne |
| Tous les modules | `../index.html` | `sql/index.html` | interne |
| Module 11 : Procédures → | `mod11-procedures.html` | `sql/modules/mod11-procedures.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) |  | — | `theme-toggle` | Changer de thème | actif | — |
| Vérifier |  | — | `mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page secondaire du cours ; etats derives du composant principal present.

## 8. Tableaux, code et medias

- Tableaux : 1 (0 lignes / 5 en-tetes)
- Blocs `pre` : 0 · elements `code` : 6
- SVG inline : 23 · images : 0
- Icones du sprite utilisees : `#i-warning`, `#i-bolt`, `#i-check-circle`, `#i-brain`, `#i-dot`
- Volume de texte : ~1032 mots · 301 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`, `../assets/css/style.css`, `/assets/css/icons.css`
- Scripts externes : `https://cdn.tailwindcss.com`, `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`, `../assets/js/gamification.js`, `../assets/js/transaction-visualizer.js`, `../assets/js/drag-drop.js`, `../assets/js/main.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 164. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `p-3` | 29 |
| `font-bold` | 23 |
| `text-center` | 23 |
| `ic` | 23 |
| `text-sm` | 17 |
| `text-amber-400` | 16 |
| `text-slate-400` | 16 |
| `text-xs` | 16 |
| `rounded-lg` | 14 |
| `text-blue-400` | 13 |
| `border-l-4` | 13 |
| `text-emerald-400` | 13 |
| `border` | 13 |
| `text-white` | 12 |
| `glass-card` | 12 |
| `fas` | 11 |
| `mb-6` | 11 |
| `text-red-400` | 11 |
| `font-mono` | 10 |
| `text-slate-500` | 10 |

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
