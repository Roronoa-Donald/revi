# Chapitre 3 — Analyse des Plans d’Exécution EXPLAIN (ANALYZE, BUFFERS) & Optimiseur CBO

> Fiche extraite du fichier `b3-sql/chapitres/chapitre3.html` (480 lignes, 34.6 Ko, sha256 `35f0729eade5`).
> Famille : **cours-b3-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-sql/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Analyse des Plans d’Exécution EXPLAIN (ANALYZE, BUFFERS) &amp; Optimiseur CBO \| SQL Avancé B3 |
| Description meta | Chapitre 3 du cours SQL Avancé B3 : Moteur d’optimisation par les coûts (Cost-Based Optimizer - CBO), commande EXPLAIN (ANALYZE, BUFFERS), nœuds d’accès physiques (Seq Scan, Index Scan, Bitmap Heap Scan), algorithmes de jointure (Nested Loop, Hash Join, Merge Join), statistiques pg_statistic et dérives de cardinalité. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Analyse des Plans d’Exécution EXPLAIN (ANALYZE, BUFFERS) & Optimiseur CBO |
| 3 | h2 | — | 1. Le Moteur d’Optimisation CBO & La Commande EXPLAIN (ANALYZE, BUFFERS) |
| 4 | h2 | — | 2. Nœuds d’Accès aux Tables & Algorithmes de Jointure CBO |
| 5 | h2 | — | 3. Statistiques du Catalogue pg_statistic & Dérives de Cardinalité |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Analyse des Plans d’Exécution EXPLAIN (ANALYZE, BUFFERS) & Optimiseur CBO
  - **H2** — 1. Le Moteur d’Optimisation CBO & La Commande EXPLAIN (ANALYZE, BUFFERS)
      - **H4** — Les Options Cruciales de la Commande EXPLAIN
      - **H4** — Compréhension des Métriques de Coût PostgreSQL
  - **H2** — 2. Nœuds d’Accès aux Tables & Algorithmes de Jointure CBO
      - **H4** — 1. Les Quatre Nœuds d’Accès Physiques
      - **H4** — 2. Les Trois Algorithmes de Jointure CBO
  - **H2** — 3. Statistiques du Catalogue pg_statistic & Dérives de Cardinalité
      - **H4** — Contenu des Statistiques Collectées
      - **H4** — Le Piège Mortel de la Dérive de Cardinalité
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Calcul du coût CBO d’un parcours séquentiel (Seq Scan)
    - **H3** — Exercice 2 — Calcul du Cache Hit Ratio des tampons partagés (Shared Buffers)
    - **H3** — Exercice 3 — Réécriture SARGable et index couvrant (Index-Only Scan)
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
| Chapitre 4 — Fonctions de Fenêtrage (Window Functions) & Requêtes Hiérarchiques (CTEs Récursives) | `chapitre4.html` | `b3-sql/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| EXPLAIN (VERBOSE) |  | — | `opt` | — | actif | — |
| EXPLAIN (BUFFERS) |  | — | `opt` | — | actif | data-correct=1 |
| EXPLAIN (TIMING) |  | — | `opt` | — | actif | — |
| EXPLAIN (MEMORY) |  | — | `opt` | — | actif | — |
| Le temps d’exécution en millisecondes |  | — | `opt` | — | actif | — |
| Le coût estimé de démarrage (startup cost) avant de produire la première ligne |  | — | `opt` | — | actif | data-correct=1 |
| Le nombre d’index utilisés |  | — | `opt` | — | actif | — |
| Le pourcentage d’utilisation du processeur |  | — | `opt` | — | actif | — |
| Lorsque les deux tables contiennent plus de 10 millions de lignes sans aucun index |  | — | `opt` | — | actif | — |
| Lorsque la table externe est très petite et que la table interne dispose d’un index perfor |  | — | `opt` | — | actif | data-correct=1 |
| Uniquement sur les requêtes avec la clause GROUP BY |  | — | `opt` | — | actif | — |
| Lorsque la mémoire work_mem est totalement saturée |  | — | `opt` | — | actif | — |
| Merge Join |  | — | `opt` | — | actif | — |
| Hash Join |  | — | `opt` | — | actif | data-correct=1 |
| Nested Loop Join |  | — | `opt` | — | actif | — |
| Cross Join |  | — | `opt` | — | actif | — |
| Le tri a été accéléré par le contrôleur RAID |  | — | `opt` | — | actif | — |
| Le tri n’a pas pu tenir dans la mémoire work_mem et a dû déborder temporairement sur le di |  | — | `opt` | — | actif | data-correct=1 |
| Le disque dur est défectueux |  | — | `opt` | — | actif | — |
| L’index est corrompu |  | — | `opt` | — | actif | — |
| Seq Scan |  | — | `opt` | — | actif | — |
| Bitmap Heap Scan (alimenté par Bitmap Index Scan) |  | — | `opt` | — | actif | data-correct=1 |
| Index Only Scan |  | — | `opt` | — | actif | — |
| TID Scan |  | — | `opt` | — | actif | — |
| REINDEX DATABASE |  | — | `opt` | — | actif | — |
| VACUUM FULL |  | — | `opt` | — | actif | — |
| ANALYZE |  | — | `opt` | — | actif | data-correct=1 |
| CHECKPOINT |  | — | `opt` | — | actif | — |
| Le CBO choisira à tort un Nested Loop inadapté au lieu d’un Hash Join ou Merge Join perfor |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql3-c3-e1` | sql | 300 | suspendue | `CREATE TABLE pg_class_sim (relname TEXT, relpages INT, reltuples INT); INSERT INTO pg_class_sim VALUES ('factures', 100, 10000), ('agences', 2, 50); -- exemple` | Exercice 1 — Calcul du coût CBO d’un parcours séquentiel (Seq Scan) |
| `sql3-c3-e2` | sql | 300 | suspendue | `CREATE TABLE pg_stat_database_sim (datname TEXT, blks_hit INT, blks_read INT); INSERT INTO pg_stat_database_sim VALUES ('prod_erp', 9900, 100), ('reporting', 7500, 2500); -- exemple` | Exercice 2 — Calcul du Cache Hit Ratio des tampons partagés (Shared Buffers) |
| `sql3-c3-e3` | sql | 300 | suspendue | `CREATE TABLE commandes (id INT, annee INT, client_id INT, montant INT); INSERT INTO commandes VALUES (1, 2024, 1, 10000), (2, 2025, 1, 25000), (3, 2025, 2, 15000); -- exemple` | Exercice 3 — Réécriture SARGable et index couvrant (Index-Only Scan) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 7 · elements `code` : 30
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-warning`, `#i-terminal`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2879 mots · 442 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
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
