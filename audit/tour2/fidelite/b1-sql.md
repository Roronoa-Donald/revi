# Fidélité aux Sources (Mission A) — `b1-sql` (SQL · B1)

- **Cours** : `b1-sql` (SQL) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 146 pages)** :
- `textes/B1/SQL/COURS.FBDcomplet 1.txt` (76 pages, statut `ok`)
- `textes/B1/SQL/SUPPORT_BDD_SQL_IT-B1_LITE.txt` (64 pages, statut `ok`)
- `textes/B1/SQL/TUTO-AnalyseSI.txt` (6 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (2 cours complets : SUPPORT_BDD_SQL_IT-B1_LITE.txt [64 p., Simon Pierre Edoh] et COURS.FBDcomplet 1.txt [76 p.] + TUTO-AnalyseSI.txt [6 p.], statut ok)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Ordre des chapitres conforme à SUPPORT_BDD_SQL_IT-B1_LITE.txt, mais les exercices du site ne font écrire aucune requête SQL exécutable**
- **Ordre dans la source (`textes/B1/SQL/SUPPORT_BDD_SQL_IT-B1_LITE.txt#PAGE 2-64`)** : Ch. 1 Généralités sur les BDD (définition, modèles hiérarchique/réseau/relationnel/NoSQL/Cloud, `#PAGE 2-4`) → Ch. 2 Les SGBD (définition, objectifs, fonctions, architecture 3 niveaux ANSI/SPARC, `#PAGE 5-14`) → Ch. 3 Le modèle relationnel (table/relation, attribut/colonne, tuple/ligne, clé primaire, clé étrangère, `#PAGE 15-24`) → Ch. 4 Le langage SQL : types de données, LDD (`CREATE/ALTER/DROP TABLE`), LMD (`INSERT, UPDATE, DELETE`), LID (`SELECT, WHERE, ORDER BY, LIMIT, JOIN, GROUP BY, HAVING`), LCD (`CREATE USER, GRANT, REVOKE`) (`#PAGE 25-64`).
- **Ordre sur le site (`b1-sql/chapitres/chapitre1..6.html`)** : Le site regroupe les Ch. 1 à 3 de la source dans son Chapitre 1 (`chapitre1.html:L60-L120`), puis déroule LDD/`INSERT` (Ch. 2), `SELECT`/`WHERE`/`ORDER BY`/`LIMIT` (Ch. 3), `JOIN` (Ch. 4), Agrégation/`GROUP BY`/`HAVING` (Ch. 5), et `UPDATE`/`DELETE`/`ALTER`/`GRANT`/`REVOKE` (Ch. 6). L'ordre est progressif et fidèle à la source.

## 2. Couverture (Lacunes & Ajouts)
- **Lacunes mineures** : Le second support `COURS.FBDcomplet 1.txt#PAGE 28-44` développe l'**algèbre relationnelle formelle** ($\sigma$ sélection, $\pi$ projection, $owtie$ jointure, $\div$ division), que le site choisit à raison de mentionner légèrement au profit du SQL pratique suivi par `SUPPORT_BDD_SQL_IT-B1_LITE.txt`.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Base de données (BDD)
- **Source PDF** : `textes/B1/SQL/SUPPORT_BDD_SQL_IT-B1_LITE.txt#PAGE 3` : « Une base de données (BDD ou database) est un ensemble d'informations organisé pour être accessible, géré et mis à jour facilement par ses utilisateurs. Les données sont organisées en lignes, colonnes et tableaux et indexées pour faciliter les recherches. »
- **Site web** : `b1-sql/chapitres/chapitre1.html:L62` : « Une base de données est un ensemble structuré et persistant d'informations organisé en tables (lignes et colonnes) et indexé pour permettre des recherches et mises à jour rapides. »
- **Diagnostic** : **Parfaitement fidèle**.

### Définition 2 — SGBD
- **Source PDF** : `textes/B1/SQL/SUPPORT_BDD_SQL_IT-B1_LITE.txt#PAGE 5` : « Un SGBD est un ensemble de logiciels systèmes permettant aux utilisateurs d'insérer, de modifier et de rechercher efficacement des données spécifiques dans une grande masse d'informations partagée par de multiples utilisateurs. »
- **Site web** : `b1-sql/chapitres/chapitre1.html:L84` : « Le SGBD (Système de Gestion de Bases de Données) est le logiciel serveur (MySQL, PostgreSQL, Oracle) qui stocke les données, exécute les requêtes SQL et gère la concurrence et la sécurité. »
- **Diagnostic** : **Fidèle et illustrée d'exemples concrets**.

### Définition 3 — Clé primaire vs Clé étrangère
- **Source PDF** : `textes/B1/SQL/COURS.FBDcomplet 1.txt#PAGE 19` : « Une clé primaire identifie de façon unique chaque n-uplet d'une relation (non nulle et unique). Une clé étrangère est un attribut qui fait référence à la clé primaire d'une autre relation. »
- **Site web** : `b1-sql/chapitres/chapitre1.html:L102` : « La clé primaire (PRIMARY KEY) identifie chaque ligne de façon unique et non nulle ; la clé étrangère (FOREIGN KEY) référence la clé primaire d'une autre table pour matérialiser un lien. »
- **Diagnostic** : **Rigoureuse et identique**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Dans `COURS.FBDcomplet 1.txt#PAGE 55-76` et `SUPPORT_BDD_SQL_IT-B1_LITE.txt#PAGE 40-64`, les exercices demandent d'écrire de **vraies requêtes SQL (`SELECT ... FROM ... WHERE ... JOIN ... GROUP BY ...`)**. Sur le site, `scripts/remediate-noncode-courses.js` a converti les 18 exercices de `b1-sql` en grilles statiques `data-language='analyse'` où l'élève écrit des mots-clés de classification au lieu d'exécuter du SQL (alors que la plateforme possède déjà `/assets/js/engines/sql-wasm-engine.js` !).
