# VB Excel

> Fiche extraite du fichier `b1-vb-excel/index.html` (81 lignes, 5.7 Ko, sha256 `eec819f082f9`).
> Famille : **cours-b1-vb-excel** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-vb-excel/index.html` |
| Titre du document | VB Excel — B1 \| Cours Interactif |
| Description meta | Module VB Excel (niveau B1) : programme, supports et progression. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | hero | 0 liens, aria="" |
| 2 | h1 | — | VB Excel |
| 3 | h2 | — | Programme & supports du module |

## 3. Hierarchie des titres

- **H1** — VB Excel
  - **H2** — Programme & supports du module

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| header | `hero` |  |

Liens sortants : **1** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Portail des cours | `/index.html` | `index.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

Aucun `<button>` dans le document (les actions peuvent etre des liens stylises).

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.
- Etat `prepLockedMsg` : bandeau « L'atelier est protege » si `?preparation=locked`, refermable.
- Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.
- Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.
- Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.
- Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.
- Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 2 · images : 0
- Icones du sprite utilisees : `#i-arrow-left`, `#i-chart`
- Volume de texte : ~456 mots · 40 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`
- Scripts externes : aucun
- Blocs `<style>` inline : 1 · scripts inline : 0

## 10. Classes et attributs data observes

Classes distinctes : 14. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `wrap` | 1 |
| `top` | 1 |
| `back` | 1 |
| `level-badge` | 1 |
| `hero` | 1 |
| `hero__icon` | 1 |
| `summary` | 1 |
| `h2sub` | 1 |
| `docs` | 1 |
| `doc` | 1 |
| `doc--cours` | 1 |
| `doc__type` | 1 |
| `doc__name` | 1 |
| `notice` | 1 |

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
