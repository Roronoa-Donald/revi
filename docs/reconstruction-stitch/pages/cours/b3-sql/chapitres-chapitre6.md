# Chapitre 6 — Partitionnement Déclaratif, Réplication WAL & Haute Disponibilité (HA)

> Fiche extraite du fichier `b3-sql/chapitres/chapitre6.html` (482 lignes, 36.1 Ko, sha256 `215f197c0cf2`).
> Famille : **cours-b3-sql** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-sql/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Partitionnement Déclaratif, Réplication WAL &amp; Haute Disponibilité (HA) \| SQL Avancé B3 |
| Description meta | Chapitre 6 du cours SQL Avancé B3 : Partitionnement déclaratif horizontal (Range, List, Hash), routage automatique des tuples, élagage de partitions (Partition Pruning statique et à l’exécution), architecture Write-Ahead Logging (WAL) et checkpoints, réplication physique en streaming synchrone et asynchrone, calcul de retard de réplication (LSN lag), et basculement haute disponibilité (Failover Patroni / repmgr). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Partitionnement Déclaratif, Réplication WAL & Haute Disponibilité (HA) |
| 3 | h2 | — | 1. Partitionnement Déclaratif Horizontal & Partition Pruning |
| 4 | h2 | — | 2. Architecture Write-Ahead Logging (WAL) & Checkpoints |
| 5 | h2 | — | 3. Réplication en Streaming, Décalage LSN & Haute Disponibilité |
| 6 | h2 | — | 4. Exercices de code |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Partitionnement Déclaratif, Réplication WAL & Haute Disponibilité (HA)
  - **H2** — 1. Partitionnement Déclaratif Horizontal & Partition Pruning
      - **H4** — Les Trois Stratégies de Partitionnement
      - **H4** — Syntaxe Déclarative Canonique
      - **H4** — Le Graal de la Performance : Le Partition Pruning
  - **H2** — 2. Architecture Write-Ahead Logging (WAL) & Checkpoints
      - **H4** — Le Principe Fondamental du WAL
      - **H4** — Checkpoints & Reprise sur Panne (Crash Recovery)
  - **H2** — 3. Réplication en Streaming, Décalage LSN & Haute Disponibilité
      - **H4** — Réplication Asynchrone vs Synchrone
      - **H4** — Log Sequence Number (LSN) & Lag de Réplication
  - **H2** — 4. Exercices de code
    - **H3** — Exercice 1 — Routage de partitions par intervalles de dates (Range Partitioning)
    - **H3** — Exercice 2 — Surveillance du retard de réplication (Replication Lag LSN)
    - **H3** — Exercice 3 — Élection du candidat de basculement automatique (Failover Patroni / HA)
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
| Atelier de code | `../atelier.html` | `b3-sql/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| PARTITION BY HASH sur le montant |  | — | `opt` | — | actif | — |
| PARTITION BY RANGE sur la date de transaction (ex: mensuel) |  | — | `opt` | — | actif | data-correct=1 |
| PARTITION BY LIST sur le nom du client |  | — | `opt` | — | actif | — |
| Aucun partitionnement n’est possible sur des dates |  | — | `opt` | — | actif | — |
| La suppression définitive des anciennes partitions sur disque |  | — | `opt` | — | actif | — |
| La capacité de l’optimiseur à exclure les partitions physiques hors périmètre lors de l’ex |  | — | `opt` | — | actif | data-correct=1 |
| Le compactage des blocs mémoire dans le buffer pool |  | — | `opt` | — | actif | — |
| La défragmentation automatique des index B-Tree |  | — | `opt` | — | actif | — |
| Parce que le WAL compresse les données |  | — | `opt` | — | actif | — |
| Pour assurer la durabilité ACID grâce à des écritures séquentielles rapides, tout en diffé |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les tables n’existent pas sur disque |  | — | `opt` | — | actif | — |
| Pour chiffrer les données à la volée |  | — | `opt` | — | actif | — |
| Toutes les connexions clientes sont déconnectées |  | — | `opt` | — | actif | — |
| Les pages modifiées en mémoire (dirty buffers) sont écrites sur disque et synchronisées pa |  | — | `opt` | — | actif | data-correct=1 |
| La base de données est basculée en lecture seule |  | — | `opt` | — | actif | — |
| Toutes les tables sont vidées |  | — | `opt` | — | actif | — |
| pg_wal_lsn_diff(lsn1, lsn2) |  | — | `opt` | — | actif | data-correct=1 |
| pg_calculate_bytes(lsn1, lsn2) |  | — | `opt` | — | actif | — |
| DIFF_LSN(lsn1, lsn2) |  | — | `opt` | — | actif | — |
| SUBTRACT_WAL(lsn1, lsn2) |  | — | `opt` | — | actif | — |
| Immédiatement après le calcul en RAM |  | — | `opt` | — | actif | — |
| Après synchronisation locale du WAL et confirmation durable du nombre ou quorum de standby |  | — | `opt` | — | actif | data-correct=1 |
| Exactement 5 minutes après la requête |  | — | `opt` | — | actif | — |
| Une fois par heure lors du checkpoint |  | — | `opt` | — | actif | — |
| Le serveur primaire redémarre en boucle |  | — | `opt` | — | actif | — |
| Le primaire conserve tous les fichiers WAL sans jamais les recycler, provoquant une satura |  | — | `opt` | — | actif | data-correct=1 |
| Les données de la table deviennent corrompues |  | — | `opt` | — | actif | — |
| Les requêtes SELECT sont refusées |  | — | `opt` | — | actif | — |
| Patroni |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `sql3-c6-e1` | sql | 300 | suspendue | `CREATE TABLE mesures_iot (id INT, mois INT, valeur INT); INSERT INTO mesures_iot VALUES (1, 2, 100), (2, 3, 150), (3, 5, 200), (4, 11, 300); -- exemple` | Exercice 1 — Routage de partitions par intervalles de dates (Range Partitioning) |
| `sql3-c6-e2` | sql | 300 | suspendue | `CREATE TABLE pg_stat_replication_sim (application_name TEXT, sent_lsn_mb INT, replay_lsn_mb INT, sync_state TEXT); INSERT INTO pg_stat_replication_sim VALUES ('replica_dc1', 5000, 5000, 'sync'), ('replica_dc2', 5000, 4850, 'async'); -- exemple` | Exercice 2 — Surveillance du retard de réplication (Replication Lag LSN) |
| `sql3-c6-e3` | sql | 300 | suspendue | `CREATE TABLE cluster_nodes (node_name TEXT, role TEXT, healthy INT, received_lsn INT, priority INT); INSERT INTO cluster_nodes VALUES ('pg-1', 'PRIMARY', 0, 9000, 100), ('pg-2', 'REPLICA', 1, 8990, 90), ('pg-3', 'REPLICA', 1, 9000, 80); -- exemple` | Exercice 3 — Élection du candidat de basculement automatique (Failover Patroni / HA) |

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
- Blocs `pre` : 7 · elements `code` : 41
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2906 mots · 436 noeuds HTML

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
| `card` | 7 |
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
