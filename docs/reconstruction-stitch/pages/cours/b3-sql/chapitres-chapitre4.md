# Chapitre 4 — Fonctions de Fenêtrage (Window Functions) & Requêtes Hiérarchiques (CTEs Récursives)

> Fiche extraite du fichier `b3-sql/chapitres/chapitre4.html` (511 lignes, 35.7 Ko, sha256 `8dd67c14ee29`).
> Famille : **cours-b3-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-sql/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Fonctions de Fenêtrage (Window Functions) &amp; Requêtes Hiérarchiques (CTEs Récursives) \| SQL Avancé B3 |
| Description meta | Chapitre 4 du cours SQL Avancé B3 : Fonctions analytiques (ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD), clauses OVER (PARTITION BY, ORDER BY), cadrage de fenêtres (ROWS/RANGE BETWEEN), agrégats cumulatifs glissants, expressions de table communes récursives (WITH RECURSIVE), arborescences organisationnelles et détection de cycles hiérarchiques. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Fonctions de Fenêtrage (Window Functions) & Requêtes Hiérarchiques (CTEs Récursives) |
| 3 | h2 | — | 1. Les Fonctions de Fenêtrage (Window Functions) & La Clause OVER |
| 4 | h2 | — | 2. Cadrage de Fenêtres (Window Frames) & Fonctions de Décalage (LAG, LEAD) |
| 5 | h2 | — | 3. Expressions de Table Communes Récursives (WITH RECURSIVE) |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Fonctions de Fenêtrage (Window Functions) & Requêtes Hiérarchiques (CTEs Récursives)
  - **H2** — 1. Les Fonctions de Fenêtrage (Window Functions) & La Clause OVER
      - **H4** — Structure Canonique de la Clause OVER
      - **H4** — Fonctions de Classement : ROW_NUMBER, RANK, DENSE_RANK
  - **H2** — 2. Cadrage de Fenêtres (Window Frames) & Fonctions de Décalage (LAG, LEAD)
      - **H4** — Spécification du Cadre : ROWS vs RANGE
      - **H4** — Navigation Relative : LAG, LEAD & NTILE
  - **H2** — 3. Expressions de Table Communes Récursives (WITH RECURSIVE)
      - **H4** — Anatomie d’une CTE Récursive
      - **H4** — Mécanique Interne du Moteur PostgreSQL
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Comparaison temporelle ligne à ligne avec LAG() OVER
    - **H3** — Exercice 2 — Top-N par département avec DENSE_RANK() dans une CTE
    - **H3** — Exercice 3 — Parcours d’arbre hiérarchique avec WITH RECURSIVE
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-sqlnav` | Portail → `/`<br>SQL Avancé B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| SQL Avancé B3 | `../index.html` | `b3-sql/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-sql/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-sql/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-sql/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-sql/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-sql/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-sql/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-sql/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-sql/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-sql/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-sql/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-sql/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-sql/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-sql/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-sql/chapitres/formules.html` | interne |
| Chapitre 5 — Procédures Stockées PL/pgSQL, Déclencheurs (Triggers) & Row-Level Security (RLS) | `chapitre5.html` | `b3-sql/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| ROW_NUMBER() |  | — | `opt` | — | actif | — |
| RANK() |  | — | `opt` | — | actif | — |
| DENSE_RANK() |  | — | `opt` | — | actif | data-correct=1 |
| NTILE(4) |  | — | `opt` | — | actif | — |
| La somme totale globale répétée sur chaque ligne |  | — | `opt` | — | actif | — |
| Une somme cumulative progressive au fur et à mesure des dates |  | — | `opt` | — | actif | data-correct=1 |
| Une erreur de syntaxe car PARTITION BY est obligatoire |  | — | `opt` | — | actif | — |
| La moyenne arithmétique des ventes |  | — | `opt` | — | actif | — |
| ROWS BETWEEN 2 PRECEDING AND CURRENT ROW |  | — | `opt` | — | actif | data-correct=1 |
| RANGE BETWEEN 2 PRECEDING AND CURRENT ROW |  | — | `opt` | — | actif | — |
| ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING |  | — | `opt` | — | actif | — |
| PARTITION BY 2 ROWS |  | — | `opt` | — | actif | — |
| À spécifier le nom de la partition |  | — | `opt` | — | actif | — |
| À fournir une valeur de substitution si la ligne précédente n’existe pas (à la place de NU |  | — | `opt` | — | actif | data-correct=1 |
| À définir le pas d’incrémentation |  | — | `opt` | — | actif | — |
| À indiquer le type de données de sortie |  | — | `opt` | — | actif | — |
| UNION ALL |  | — | `opt` | — | actif | data-correct=1 |
| INTERSECT |  | — | `opt` | — | actif | — |
| CROSS JOIN |  | — | `opt` | — | actif | — |
| MERGE |  | — | `opt` | — | actif | — |
| En désactivant le cache PostgreSQL |  | — | `opt` | — | actif | — |
| En traçant les identifiants visités dans un tableau et en vérifiant WHERE NOT (id = ANY(ch |  | — | `opt` | — | actif | data-correct=1 |
| En remplaçant UNION ALL par UNION, qui suffit toujours |  | — | `opt` | — | actif | — |
| En augmentant la variable work_mem |  | — | `opt` | — | actif | — |
| La fonction de fenêtrage ne peut s’exécuter que la nuit |  | — | `opt` | — | actif | — |
| La fonction d’agrégation compresse les lignes en une seule, la fonction de fenêtrage conse |  | — | `opt` | — | actif | data-correct=1 |
| La fonction de fenêtrage ne fonctionne que sur des chaînes de caractères |  | — | `opt` | — | actif | — |
| Aucune différence, ce sont de purs synonymes |  | — | `opt` | — | actif | — |
| 4 lignes au hasard |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql3-c4-e1` | sql | 300 | suspendue | `CREATE TABLE chiffre_affaires (mois INT, ca INT); INSERT INTO chiffre_affaires VALUES (1, 100000), (2, 130000), (3, 115000); -- exemple` | Exercice 1 — Comparaison temporelle ligne à ligne avec LAG() OVER |
| `sql3-c4-e2` | sql | 300 | suspendue | `CREATE TABLE employes (nom TEXT, departement TEXT, salaire INT); INSERT INTO employes VALUES ('Amina', 'IT', 500000), ('Koffi', 'IT', 400000), ('Yao', 'IT', 300000), ('Sena', 'RH', 450000); -- exemple` | Exercice 2 — Top-N par département avec DENSE_RANK() dans une CTE |
| `sql3-c4-e3` | sql | 300 | suspendue | `CREATE TABLE organigramme (id INT, nom TEXT, manager_id INT); INSERT INTO organigramme VALUES (1, 'DG', NULL), (2, 'DSI', 1), (3, 'Admin Réseau', 2); -- exemple` | Exercice 3 — Parcours d’arbre hiérarchique avec WITH RECURSIVE |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
- Blocs replies : 3 (`<details>`).

Etats et interactions a reconstruire :

- En-tete compact : fil d'Ariane, titre, meta (module, duree, statut gratuit).
- Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.
- Tableaux de donnees et blocs pseudo-code defilables horizontalement.
- Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.
- Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.
- QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.
- Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).
- Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.
- Navigation de bas de page : chapitre precedent / suivant.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 9 · elements `code` : 55
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-warning`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3007 mots · 463 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `card` | 6 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
