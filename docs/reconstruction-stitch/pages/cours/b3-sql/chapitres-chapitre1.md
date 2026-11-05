# Chapitre 1 — Transactions ACID, Journalisation WAL & Niveaux d’Isolation ANSI

> Fiche extraite du fichier `b3-sql/chapitres/chapitre1.html` (479 lignes, 36.5 Ko, sha256 `dde12e783530`).
> Famille : **cours-b3-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-sql/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Transactions ACID, Journalisation WAL &amp; Niveaux d’Isolation ANSI \| SQL Avancé B3 |
| Description meta | Chapitre 1 du cours SQL Avancé B3 : Propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité), mécanisme Write-Ahead Logging (WAL), verrous partagés et exclusifs (S/X locks), interblocages (Deadlocks), 4 niveaux d’isolation ANSI SQL et contrôle de concurrence multiversion (MVCC). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Transactions ACID, Journalisation WAL & Niveaux d’Isolation ANSI |
| 3 | h2 | — | 1. Les Fondations ACID & Le Mécanisme de Journalisation WAL (Write-Ahead Logging) |
| 4 | h2 | — | 2. Niveaux d’Isolation ANSI SQL & Anomalies de Concurrence |
| 5 | h2 | — | 3. Verrouillage 2PL, Détection d’Interblocages (Deadlocks) & MVCC |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Transactions ACID, Journalisation WAL & Niveaux d’Isolation ANSI
  - **H2** — 1. Les Fondations ACID & Le Mécanisme de Journalisation WAL (Write-Ahead Logging)
      - **H4** — Les Quatre Propriétés ACID
      - **H4** — Le Principe du Write-Ahead Logging (WAL)
  - **H2** — 2. Niveaux d’Isolation ANSI SQL & Anomalies de Concurrence
      - **H4** — Lecture Sale (Dirty Read)
      - **H4** — Lecture Non Répétable (Non-Repeatable Read)
      - **H4** — Lecture Fantôme (Phantom Read)
  - **H2** — 3. Verrouillage 2PL, Détection d’Interblocages (Deadlocks) & MVCC
      - **H4** — Matrice des Verrous Partagés (S) & Exclusifs (X)
      - **H4** — Interblocages (Deadlocks) & Graphe d'Attente (Wait-For Graph)
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Audit d’un journal transactionnel fictif
    - **H3** — Exercice 2 — Visibilité dans un modèle MVCC fictif
    - **H3** — Exercice 3 — Détection de conflit de verrous (Lock Wait Graph)
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
| Chapitre 2 — Indexation B-Tree, Hash, GIN & Optimisation Physique du Stockage | `chapitre2.html` | `b3-sql/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Écrire les données sur bande magnétique avant le disque dur |  | — | `opt` | — | actif | — |
| Enregistrer et synchroniser toute modification dans le journal séquentiel avant d’écrire l |  | — | `opt` | — | actif | data-correct=1 |
| Supprimer les tables temporaires toutes les 10 minutes |  | — | `opt` | — | actif | — |
| Chiffrer les requêtes SQL avec une clé symétrique |  | — | `opt` | — | actif | — |
| Phantom Read (Lecture Fantôme) |  | — | `opt` | — | actif | — |
| Dirty Read (Lecture Sale) |  | — | `opt` | — | actif | data-correct=1 |
| Non-Repeatable Read (Lecture Non Répétable) |  | — | `opt` | — | actif | — |
| Serialization Failure |  | — | `opt` | — | actif | — |
| READ UNCOMMITTED |  | — | `opt` | — | actif | — |
| READ COMMITTED |  | — | `opt` | — | actif | data-correct=1 |
| REPEATABLE READ |  | — | `opt` | — | actif | — |
| SERIALIZABLE |  | — | `opt` | — | actif | — |
| Un verrou exclusif (X) est compatible avec un verrou partagé (S) |  | — | `opt` | — | actif | — |
| Plusieurs transactions peuvent détenir simultanément un verrou partagé (S) sur la même res |  | — | `opt` | — | actif | data-correct=1 |
| Deux verrous exclusifs (X) peuvent coexister sur la même ligne |  | — | `opt` | — | actif | — |
| Un verrou partagé empêche toute autre lecture |  | — | `opt` | — | actif | — |
| Sous la forme d’un arbre binaire de recherche |  | — | `opt` | — | actif | — |
| Sous la forme d’un graphe orienté d’attente (Wait-For Graph) où les cycles représentent le |  | — | `opt` | — | actif | data-correct=1 |
| Par un comptage de mémoire RAM consommée |  | — | `opt` | — | actif | — |
| Par une file d’attente FIFO sans priorité |  | — | `opt` | — | actif | — |
| READ UNCOMMITTED |  | — | `opt` | — | actif | — |
| READ COMMITTED |  | — | `opt` | — | actif | — |
| REPEATABLE READ |  | — | `opt` | — | actif | — |
| SERIALIZABLE |  | — | `opt` | — | actif | data-correct=1 |
| SELECT ... LOCK ALL |  | — | `opt` | — | actif | — |
| SELECT ... FOR UPDATE |  | — | `opt` | — | actif | data-correct=1 |
| SELECT ... WITH NO WAIT |  | — | `opt` | — | actif | — |
| SELECT ... ISOLATE |  | — | `opt` | — | actif | — |
| Maximum Virtual Core Control |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql3-c1-e1` | sql | 300 | suspendue | `CREATE TABLE wal_journal (lsn INT, tx_id INT, op TEXT); INSERT INTO wal_journal VALUES (1, 100, 'BEGIN'), (2, 100, 'UPDATE'), (3, 100, 'COMMIT'), (4, 101, 'BEGIN'), (5, 101, 'UPDATE'); -- exemple` | Exercice 1 — Audit d’un journal transactionnel fictif |
| `sql3-c1-e2` | sql | 300 | suspendue | `CREATE TABLE mvcc_tuples (tuple_id INT, xmin INT, xmax INT, valeur TEXT); INSERT INTO mvcc_tuples VALUES (1, 10, 30, 'v1_supprimee'), (2, 30, 0, 'v2_visible'), (3, 60, 0, 'v3_future'); -- exemple` | Exercice 2 — Visibilité dans un modèle MVCC fictif |
| `sql3-c1-e3` | sql | 300 | suspendue | `CREATE TABLE pg_locks_sim (pid INT, ressource TEXT, accorde INT); INSERT INTO pg_locks_sim VALUES (101, 'ligne_42', 1), (102, 'ligne_42', 0), (103, 'ligne_99', 1); -- exemple` | Exercice 3 — Détection de conflit de verrous (Lock Wait Graph) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 6 · elements `code` : 46
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3051 mots · 476 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

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
| `card` | 7 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |

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
