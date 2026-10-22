# Fidélité aux Sources (Mission A) — `b3-sql` (SQL Avancé · B3)

- **Cours** : `b3-sql` (SQL Avancé) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 73 pages)** :
- `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt` (65 pages, statut `ok`)
- `textes/B3/SEMESTRE I/SQL/TD1 BDR_SQL_SD CDP 2025_26.txt` (5 pages, statut `ok`)
- `textes/B3/SEMESTRE I/SQL/exercice.txt` (3 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 1` : *COURS BASE DE DONNÉES RELATIONNELLES, LANGAGE SQL ET STRUCTURE*
- `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 11` : *On dira qu’une propriété Q dépend fonctionnellement de la propriété P(ou des pro*
- `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 21` : *Année_de*
- `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 31` : *Fonction           Objectif                Utilisation Exemple*
- `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 41` : *D. Structures de contrôle*
- `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 51` : *REPLACE PROCEDURE va définir une nouvelle procédure, ou remplacer une*
- `textes/B3/SEMESTRE I/SQL/TD1 BDR_SQL_SD CDP 2025_26.txt#PAGE 1` : *TD1*
- `textes/B3/SEMESTRE I/SQL/TD1 BDR_SQL_SD CDP 2025_26.txt#PAGE 2` : *2. Sélectionner les noms de tous les orchestres qui ont la même ville d'origine *
- **Progression des chapitres sur le site** :
- `b3-sql/chapitres/chapitre1.html` : **Chapitre 1 — Transactions ACID, Journalisation WAL & Niveaux d’Isolation ANSI** — 1. Les Fondations ACID & Le Mécanisme de Journalisation WAL (Write-Ahead Logging) (`L82`), 2. Niveaux d’Isolation ANSI SQL & Anomalies de Concurrence (`L106`), 3. Verrouillage 2PL, Détection d’Interblocages (Deadlocks) & MVCC (`L128`), 4. Études de cas & applications pratiques (`L153`)
- `b3-sql/chapitres/chapitre2.html` : **Chapitre 2 — Indexation B-Tree, Hash, GIN & Optimisation Physique du Stockage** — 1. Organisation Physique des Pages Disques & Anatomie du B-Tree (`L82`), 2. Typologie des Index : B-Tree, Hash, GIN & GiST (`L106`), 3. Fill Factor, Fragmentation & Maintenance Physique (REINDEX) (`L123`), 4. Études de cas & applications pratiques (`L147`)
- `b3-sql/chapitres/chapitre3.html` : **Chapitre 3 — Analyse des Plans d’Exécution EXPLAIN (ANALYZE, BUFFERS) & Optimiseur CBO** — 1. Le Moteur d’Optimisation CBO & La Commande EXPLAIN (ANALYZE, BUFFERS) (`L82`), 2. Nœuds d’Accès aux Tables & Algorithmes de Jointure CBO (`L107`), 3. Statistiques du Catalogue pg_statistic & Dérives de Cardinalité (`L134`), 4. Études de cas & applications pratiques (`L159`)
- `b3-sql/chapitres/chapitre4.html` : **Chapitre 4 — Fonctions de Fenêtrage (Window Functions) & Requêtes Hiérarchiques (CTEs Récursives)** — 1. Les Fonctions de Fenêtrage (Window Functions) & La Clause OVER (`L82`), 2. Cadrage de Fenêtres (Window Frames) & Fonctions de Décalage (LAG, LEAD) (`L115`), 3. Expressions de Table Communes Récursives (WITH RECURSIVE) (`L148`), 4. Études de cas & applications pratiques (`L188`)
- `b3-sql/chapitres/chapitre5.html` : **Chapitre 5 — Procédures Stockées PL/pgSQL, Déclencheurs (Triggers) & Row-Level Security (RLS)** — 1. Le Langage Procédural PL/pgSQL & Les Fonctions Déclencheurs (`L82`), 2. Pseudo-Enregistrements NEW / OLD & Tables d’Audit Immuables (`L118`), 3. Sécurité au Niveau de la Ligne (Row-Level Security - RLS) & Prévention SQLi (`L157`), 4. Études de cas & applications pratiques (`L194`)
- `b3-sql/chapitres/chapitre6.html` : **Chapitre 6 — Partitionnement Déclaratif, Réplication WAL & Haute Disponibilité (HA)** — 1. Partitionnement Déclaratif Horizontal & Partition Pruning (`L82`), 2. Architecture Write-Ahead Logging (WAL) & Checkpoints (`L116`), 3. Réplication en Streaming, Décalage LSN & Haute Disponibilité (`L135`), 4. Études de cas & applications pratiques (`L161`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 3 document(s) source(s) (73 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Atomicité (Atomicity)
- **Source PDF** : `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 12` : « ndivisible. La 1NF garantit l'atomicité des données, chaque cellule de colonne ne contenant qu'une seule valeur et chaque colonne ayant un nom unique. Les tables ne doivent pas contenir de »
- **Site web** : `b3-sql/chapitres/chapitre1.html:L89` : « **Atomicité (Atomicity)** : Tout ou rien. Soit l’intégralité des opérations réussit, soit la base est restaurée dans son état initial sans effet de bord en cas d’erreur. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Cohérence (Consistency)
- **Source PDF** : `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 11` : « des données : Il garantit la cohérence et l'exactitude des données. 11 »
- **Site web** : `b3-sql/chapitres/chapitre1.html:L90` : « **Cohérence (Consistency)** : La transaction fait passer la base d’un état intègre à un autre état intègre en respectant toutes les contraintes (clés étrangères, NOT NULL, CHECK, triggers). »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Isolation
- **Source PDF** : `textes/B3/SEMESTRE I/SQL/Cours BDR SQL et Structures de donnees CDP 2025 Part 1.txt#PAGE 53` : « égrité sont vérifiées.  Isolation Une transaction se déroule sans être perturbée par les transactions concurrentes : tout se passe comme si elle se déroulait seule.  Durabilité »
- **Site web** : `b3-sql/chapitres/chapitre1.html:L91` : « **Isolation** : Les opérations intermédiaires d’une transaction en cours sont invisibles aux transactions concurrentes selon le niveau d’isolation choisi. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
