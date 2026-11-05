# Module 07: Les Jointures

> Fiche extraite du fichier `sql/modules/mod07a-joins.html` (825 lignes, 57.0 Ko, sha256 `5d97b277cd01`).
> Famille : **cours-sql** · sous-type : `autre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/sql/modules/mod07a-joins.html` |
| Titre du document | Module 07 : Les Jointures SQL \| RD-SQL |
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
| 2 | h1 | — | Module 07: Les Jointures |
| 3 | h2 | — | 1. Pourquoi les Jointures ? |
| 4 | h2 | — | 2. Nos Données d'Exemple |
| 5 | h2 | — | 3. INNER JOIN — L'Intersection |
| 6 | h2 | — | 4. LEFT JOIN — Tout à Gauche |
| 7 | h2 | — | 5. RIGHT JOIN — Tout à Droite |
| 8 | h2 | — | 6. FULL OUTER JOIN — L'Union Totale |
| 9 | h2 | — | 7. CROSS JOIN — Le Produit Cartésien |
| 10 | h2 | — | 8. Self-JOIN — La Table contre Elle-même |
| 11 | h2 | — | 9. Jointures Multi-Tables |
| 12 | h2 | — | 10. Tableau Récapitulatif |
| 13 | h2 | — | 11. Pièges et Erreurs Courantes |
| 14 | h2 | — | 12. Labo Pratique |
| 15 | table | — | 9 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Module 07: Les Jointures
  - **H2** — 1. Pourquoi les Jointures ?
  - **H2** — 2. Nos Données d'Exemple
      - **H4** — Clients
      - **H4** — Commandes
  - **H2** — 3. INNER JOIN — L'Intersection
      - **H4** — Syntaxe
  - **H2** — 4. LEFT JOIN — Tout à Gauche
      - **H4** — Syntaxe
  - **H2** — 5. RIGHT JOIN — Tout à Droite
  - **H2** — 6. FULL OUTER JOIN — L'Union Totale
  - **H2** — 7. CROSS JOIN — Le Produit Cartésien
  - **H2** — 8. Self-JOIN — La Table contre Elle-même
      - **H4** — Trouver le manager de chaque employé
  - **H2** — 9. Jointures Multi-Tables
      - **H4** — Clients + Commandes + Produits
      - **H4** — JOIN avec agrégats
  - **H2** — 10. Tableau Récapitulatif
  - **H2** — 11. Pièges et Erreurs Courantes
      - **H4** — Oublier la clause ON
      - **H4** — Colonnes ambiguës
      - **H4** — WHERE qui annule le LEFT JOIN
  - **H2** — 12. Labo Pratique
      - **H4** — MÉMO TECHNIQUE — Les Jointures SQL
  - **H2** — 13. Quiz — Les Jointures
  - **H2** — 14. Challenge — Glisser-Déposer

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4` | Tableau de Bord → `../index.html` |

Liens sortants : **4** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Tableau de Bord | `../index.html` | `sql/index.html` | interne |
| ← Module 07 : Dates & Nulls | `mod07-dates-nulls.html` | `sql/modules/mod07-dates-nulls.html` | interne |
| Tous les modules | `../index.html` | `sql/index.html` | interne |
| Module 08 : Logique → | `mod08-logic.html` | `sql/modules/mod08-logic.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) |  | — | `theme-toggle` | Changer de thème | actif | — |
| INNER |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| LEFT |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| RIGHT |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| FULL |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| Self |  | — | `text-xs px-2 py-1 bg-slate-800 rounded hover:bg-slate-700 text-slate-400` | — | actif | — |
| Exécuter |  | — | `bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded text-sm font-bold` | — | actif | — |
| Vérifier |  | — | `mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page secondaire du cours ; etats derives du composant principal present.

## 8. Tableaux, code et medias

- Tableaux : 9 (0 lignes / 3 en-tetes ; 0 lignes / 3 en-tetes ; 0 lignes / 4 en-tetes ; 0 lignes / 4 en-tetes ; 0 lignes / 3 en-tetes ; 0 lignes / 4 en-tetes ; 0 lignes / 3 en-tetes ; 0 lignes / 2 en-tetes ; 0 lignes / 4 en-tetes)
- Blocs `pre` : 13 · elements `code` : 32
- SVG inline : 8 · images : 0
- Icones du sprite utilisees : `#i-link`, `#i-brain`, `#i-dot`, `#i-lightbulb`
- Volume de texte : ~2636 mots · 647 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`, `../assets/css/style.css`, `/assets/css/icons.css`
- Scripts externes : `https://cdn.tailwindcss.com`, `https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js`, `../assets/js/gamification.js`, `../assets/js/sql-engine.js`, `../assets/js/drag-drop.js`, `../assets/js/main.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 218. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `py-1` | 65 |
| `text-sm` | 48 |
| `font-bold` | 46 |
| `rounded-lg` | 41 |
| `text-blue-400` | 40 |
| `p-4` | 33 |
| `px-2` | 33 |
| `fas` | 32 |
| `text-amber-400` | 32 |
| `text-slate-300` | 32 |
| `text-left` | 30 |
| `py-3` | 28 |
| `border` | 25 |
| `text-emerald-400` | 25 |
| `border-l-4` | 22 |
| `border-slate-700` | 21 |
| `text-xs` | 21 |
| `mr-2` | 20 |
| `flex` | 18 |
| `font-mono` | 18 |

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
