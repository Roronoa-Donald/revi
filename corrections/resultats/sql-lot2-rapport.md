# Lot 2 — corrections SQL B2/B3

Date de consultation des sources : **30 octobre 2026 (UTC)**. Les constats complets ont été lus dans `corrections/suivi.csv`, ainsi que les preuves SQL existantes, notamment `verification/sondes-qcm.json`, `verification/sondes-cartes.json` et les résultats SQL du lot 1. Ce rapport ne modifie pas ces preuves ni leur statut.

Les 35 documents officiels consultés, leurs URL, leurs constats associés et leurs empreintes SHA-256 figurent dans `corrections/resultats/sql-lot2-sources.json`. La documentation PostgreSQL correspond à la version majeure 18 du serveur testé ; les pages SQLite sont celles consultées à la date indiquée.

## F10 — CHECK et NULL

- **Avant :** la carte pouvait laisser croire que `CHECK (prix > 0)` imposait une valeur présente ; l’exercice ne précisait pas que son salaire restait nullable.
- **Après :** la carte et le mémento distinguent `CHECK` de `NOT NULL`. Le QCM PostgreSQL demande explicitement une valeur positive **finie** et exclut aussi `NaN` et `Infinity`, qui passent un simple `NUMERIC > 0`. L’exercice conserve son schéma et indique que son salaire peut être `NULL`.
- **Fichiers :** `server/content/sql/chapitre1.js`, `server/content/sql/pages/cartes-formules.js`, `server/exercises/sql.js`, `server/exercises/sql/chapitre1.js` ; pages générées `sql/chapitres/chapitre1.html`, `sql/chapitres/cartes.html`, `sql/chapitres/formules.html`.
- **Sondes exécutées :** PostgreSQL et SQLite acceptent `NULL` dans le `CHECK` seul et le refusent avec `NOT NULL`. PostgreSQL accepte `NaN` et `Infinity` avec le simple test positif, puis les refuse avec la borne finie du QCM.
- **Sources :** [contraintes PostgreSQL 18](https://www.postgresql.org/docs/18/ddl-constraints.html), [nombres PostgreSQL 18](https://www.postgresql.org/docs/18/datatype-numeric.html), [CREATE TABLE SQLite](https://www.sqlite.org/lang_createtable.html).

## F11 — Longueur de caractères et dialectes

- **Avant :** la carte confondait longueur déclarée, caractères et octets sans préciser le SGBD.
- **Après :** PostgreSQL limite `VARCHAR(n)` en caractères et complète `CHAR(n)` avec des espaces ; la taille en octets dépend de la représentation et de l’encodage. SQLite n’applique pas la limite de `VARCHAR(n)` par sa seule déclaration.
- **Fichiers :** `server/content/sql/chapitre1.js` ; pages générées `sql/chapitres/chapitre1.html` et `sql/chapitres/cartes.html`.
- **Sondes exécutées :** en UTF-8, PostgreSQL compte 2 caractères et 3 octets pour `éa` et refuse `éab` dans `VARCHAR(2)` ; SQLite accepte `éab` et mesure 3 caractères pour 4 octets.
- **Sources :** [types caractères PostgreSQL 18](https://www.postgresql.org/docs/18/datatype-character.html), [affinité de types SQLite](https://www.sqlite.org/datatype3.html).

## F20 — CTE récursive et cycles

- **Avant :** les explications et QCM ne distinguaient pas suffisamment `UNION`, qui déduplique la ligne entière, d’une vraie garde quand la profondeur ou le chemin change. Le corrigé d’examen ne présentait que `UNION ALL` et son exemple n’employait pas le chemin pour éviter une revisite ; l’exercice ne précisait pas les hypothèses de sa hiérarchie.
- **Après :** cours, QCM, cartes et examen expliquent les deux opérateurs et le cas d’une profondeur variable. L’exemple PostgreSQL utilise `ARRAY`/`ANY` comme garde ; l’atelier SQLite précise les identifiants uniques et une forêt sans cycle, sans prétendre que ses tableaux existent en SQLite.
- **Fichiers :** `server/content/b3-sql/chapitre4.js`, `server/content/b3-sql/pages/examens-exercices.js`, `server/exercises/b3-sql.js`, `server/exercises/b3-sql/chapitre4.js` ; pages générées `b3-sql/chapitres/chapitre4.html`, `b3-sql/chapitres/cartes.html`, `b3-sql/chapitres/examens.html`, `b3-sql/chapitres/exercices.html`.
- **Sondes exécutées :** PostgreSQL et SQLite terminent sur un cycle quand seule l’identité répétée est projetée ; avec une profondeur bornée, les lignes `(id, niveau)` continuent à différer. Dans PostgreSQL, une garde de chemin `ARRAY`/`ANY` coupe aussi un cycle atteignable. Les exemples du cours et de l’examen ont été extraits et exécutés sur une hiérarchie à trois nœuds. Une récursion infinie n’a pas été lancée.
- **Sources :** [requêtes récursives PostgreSQL 18](https://www.postgresql.org/docs/18/queries-with.html), [WITH récursif SQLite](https://www.sqlite.org/lang_with.html).

## F21 — Déclencheurs, transaction et dialecte

- **Avant :** les formulations associaient trop fortement `AFTER` à la persistance et laissaient entendre qu’un journal de déclencheur serait immuable. Un exemple B2 et le corrigé d’examen ne distinguaient pas correctement les syntaxes ; l’ancien corrigé, extrait du journal d’avant, échoue en SQLite près de `IF`.
- **Après :** `BEFORE` et `AFTER` sont situés par rapport à l’opération et au `COMMIT`, et leurs écritures transactionnelles peuvent être annulées. Les contraintes différées sont mentionnées. La métadonnée propre au cours B3 parle d’audit transactionnel, pas immuable. L’exemple B2 et le corrigé d’examen sont explicitement SQLite ; ce dernier emploie `RAISE(ABORT, ...)` et explique qu’il annule l’instruction sans annuler à lui seul les instructions précédentes de la transaction.
- **Fichiers :** `server/content/sql/chapitre6.js`, `server/content/sql/pages/examens-exercices.js`, `server/content/b3-sql.js`, `server/content/b3-sql/chapitre5.js`, `server/content/b3-sql/pages/examens-exercices.js`, `server/exercises/sql.js`, `server/exercises/sql/chapitre6.js`, `server/exercises/b3-sql.js`, `server/exercises/b3-sql/chapitre5.js` ; pages générées `sql/chapitres/chapitre6.html`, `sql/chapitres/examens.html`, `b3-sql/index.html`, `b3-sql/chapitres/chapitre5.html` et les cartes/exercices concernés.
- **Sondes exécutées :** les deux moteurs exécutent les déclencheurs avant l’échec d’une contrainte différée ; SQLite laisse alors la transaction ouverte et un `ROLLBACK` explicite annule ses écritures. Dans SQLite, l’exemple B2 journalise aussi une transition vers `NULL`. Le corrigé d’examen extrait accepte la borne −100, rejette −101, conserve la transaction ouverte après `ABORT`, puis `ROLLBACK` restaure l’état initial. Ancien corrigé : `sql-lot2-avant-trigger-sqlite.txt` ; résultat actuel : `sql-lot2-final-ultime.txt`.
- **Sources :** [déclencheurs PostgreSQL 18](https://www.postgresql.org/docs/18/trigger-definition.html), [CREATE TRIGGER SQLite](https://www.sqlite.org/lang_createtrigger.html), [contraintes différées SQLite](https://www.sqlite.org/foreignkeys.html), [résolution ABORT SQLite](https://www.sqlite.org/lang_conflict.html).

## F49 — Verrou exclusif et lecteurs

- **Avant :** la carte généralisait le blocage des lectures par un verrou exclusif ; une affirmation voisine sur `REINDEX` minimisait les attentes possibles.
- **Après :** le verrou de ligne PostgreSQL bloque les écritures ou verrouillages conflictuels, mais un `SELECT` ordinaire peut lire une version MVCC visible. Un verrou `ACCESS EXCLUSIVE` de table peut bloquer ce lecteur. Le cours précise aussi les verrous de `REINDEX INDEX` et les attentes possibles du planificateur sur l’index ; `CONCURRENTLY` n’est pas présenté comme sans aucune attente.
- **Fichiers :** `server/content/sql/chapitre5.js`, `server/content/b3-sql/chapitre1.js`, `server/content/b3-sql/chapitre2.js`, `server/content/b3-sql/pages/examens-exercices.js` ; pages générées B2/B3 correspondantes, notamment les cartes B2.
- **Sondes exécutées :** avec deux transactions PostgreSQL, le lecteur voit l’ancienne valeur 10 tandis qu’un `UPDATE` concurrent attend ; un verrou exclusif de table bloque la lecture. Un `REINDEX` standard prend `ShareLock` sur la table et `AccessExclusiveLock` sur l’index ; `SELECT` et `UPDATE` testés expirent. En SQLite, en mode journal `DELETE`, un lecteur passe sous `BEGIN IMMEDIATE` mais attend sous `BEGIN EXCLUSIVE`.
- **Sources :** [verrous PostgreSQL 18](https://www.postgresql.org/docs/18/explicit-locking.html), [REINDEX PostgreSQL 18](https://www.postgresql.org/docs/18/sql-reindex.html), [verrouillage SQLite](https://www.sqlite.org/lockingv3.html).

## F61 — Agrégats et NULL

- **Avant :** le calcul de `AVG` était juste mais la règle était trop générale pour tous les agrégats.
- **Après :** la carte et la synthèse distinguent `AVG`, `COUNT(colonne)` et `COUNT(*)` ; l’exception PostgreSQL `array_agg`, qui peut conserver `NULL`, est explicite.
- **Fichiers :** `server/content/sql/chapitre4.js` ; pages générées `sql/chapitres/chapitre4.html` et `sql/chapitres/cartes.html`.
- **Sondes exécutées :** pour 10, 20 et `NULL`, PostgreSQL et SQLite donnent `AVG = 15`, `COUNT(colonne) = 2`, `COUNT(*) = 3` ; PostgreSQL retourne aussi `[10,20,null]` avec `array_agg`.
- **Sources :** [agrégats PostgreSQL 18](https://www.postgresql.org/docs/18/functions-aggregate.html), [agrégats SQLite](https://www.sqlite.org/lang_aggfunc.html).

## F171 — Exercice d’index SQLite

- **Avant :** le catalogue actif possédait déjà un contrôle local de l’ordre, donc l’index inversé était déjà refusé localement. Il acceptait encore un index partiel ayant le bon ordre ; le module historique ne disposait pas du même contrôle. L’exécution distante restait non établie et suspendue.
- **Après :** l’énoncé demande un index SQLite non partiel sur `commandes(annee, montant)`, dans cet ordre. Les deux catalogues contrôlent ordre, table et caractère non partiel. Les formulations de cours précisent qu’un index couvrant ne force pas le plan et qu’un `Index Only Scan` PostgreSQL peut encore lire le tas pour la visibilité.
- **Fichiers :** `server/exercises/b3-sql.js`, `server/exercises/b3-sql/chapitre3.js`, `server/content/b3-sql/chapitre2.js`, `server/content/b3-sql/chapitre3.js`, `server/content/b3-sql/pages/examens-exercices.js` ; pages générées `b3-sql/chapitres/chapitre2.html`, `chapitre3.html`, `examens.html`, `exercices.html`.
- **Sondes exécutées :** le correcteur local sql.js accepte la référence et refuse ordre inversé et index partiel ; SQLite natif distingue également l’index placé sur une autre table. Dans PostgreSQL, le plan naturel observé est un `Seq Scan` malgré l’index ; un plan forcé `Index Only Scan` affiche `Heap Fetches = 1`.
- **Limite :** la correction distante SQL demeure suspendue et n’a pas été validée. Le témoin caché ciblé et la solution sont absents de la projection publique contrôlée ; il ne s’agit pas d’un audit général de toutes les pages.
- **Sources :** [PRAGMA index_info/index_list SQLite](https://www.sqlite.org/pragma.html), [CREATE INDEX SQLite](https://www.sqlite.org/lang_createindex.html), [index-only scans PostgreSQL 18](https://www.postgresql.org/docs/18/indexes-index-only-scans.html).

## F172 — Visibilité et snapshot

- **Avant :** l’exercice et le cours pouvaient faire passer un seuil numérique de transaction et `xmin`/`xmax` pour les règles réelles de visibilité PostgreSQL.
- **Après :** l’exercice est identifié comme un modèle fictif ; le cours explique le rôle de l’instantané, des transactions en cours et du statut des transactions, ainsi que les limites des seules colonnes système.
- **Fichiers :** `server/content/b3-sql/chapitre1.js`, `server/content/b3-sql/pages/examens-exercices.js`, `server/exercises/b3-sql.js`, `server/exercises/b3-sql/chapitre1.js` ; pages B3 générées correspondantes.
- **Sonde exécutée :** un identifiant inférieur à `xmax` mais encore en cours est invisible. Après son annulation, le test de présence dans l’instantané seul ne prouve pas que sa ligne est visible : le statut est `aborted` et la ligne reste absente.
- **Sources :** [fonctions de snapshot PostgreSQL 18](https://www.postgresql.org/docs/18/functions-info.html), [colonnes système](https://www.postgresql.org/docs/18/ddl-system-columns.html), [isolation des transactions](https://www.postgresql.org/docs/18/transaction-iso.html).

## F173 — WAL et récupération PostgreSQL

- **Avant :** le cours attribuait à PostgreSQL un rejeu des seuls commits suivi d’une passe globale `UNDO` ; un exercice risquait d’être pris pour une description du WAL réel.
- **Après :** le cours et l’examen distinguent le rejeu WAL PostgreSQL, qui inclut des opérations non validées, et la visibilité assurée par statut transactionnel et MVCC, sans passe `UNDO` globale. Le journal de l’exercice est explicitement fictif.
- **Fichiers :** `server/content/b3-sql/chapitre1.js`, `server/content/b3-sql/pages/examens-exercices.js`, `server/exercises/b3-sql.js`, `server/exercises/b3-sql/chapitre1.js` ; pages B3 générées correspondantes.
- **Sonde exécutée :** sur un cluster PostgreSQL privé, arrêté brutalement puis redémarré, un enregistrement WAL d’une transaction non validée se trouve dans la plage de `REDO` enregistrée ; cette transaction est ensuite `aborted`, sa ligne invisible, et une ligne validée reste présente. Ce constat ne simule pas la destruction physique du stockage.
- **Sources :** [WAL PostgreSQL 18](https://www.postgresql.org/docs/18/wal-intro.html), [récupération et visibilité dans le wiki PostgreSQL](https://wiki.postgresql.org/wiki/Operations_cheat_sheet), [nettoyage VACUUM](https://www.postgresql.org/docs/18/routine-vacuuming.html).

## F174 — Durabilité, stockage et répliques

- **Avant :** des textes et résumés présentaient la récupération et la durabilité comme assurant une absence de perte sans conditions explicites.
- **Après :** les cours B2/B3, cartes et examens précisent la synchronisation du WAL, la fiabilité du stockage, `synchronous_commit`, le rôle des sauvegardes indépendantes et les limites de la réplication. `on` n’attend une réplication synchrone que si les standbys sont configurés ; `remote_apply` attend aussi leur rejeu. Aucune promesse générale de RPO nul n’est faite.
- **Fichiers :** `server/content/sql/chapitre5.js`, `server/content/sql/pages/examens-exercices.js`, `server/content/b3-sql/chapitre1.js`, `server/content/b3-sql/chapitre6.js`, `server/content/b3-sql/pages/cartes-formules.js`, `server/content/b3-sql/pages/examens-exercices.js` ; pages et cartes générées correspondantes.
- **Sonde exécutée :** avec `fsync = on` et `synchronous_commit = off` sur le cluster privé, un `COMMIT` est acquitté alors que du WAL antérieur n’est pas encore synchronisé : écart observé de 224 octets. L’essai n’est ni une panne de courant réelle ni une vérification de sauvegarde ou de basculement de réplique.
- **Sources :** [fiabilité WAL PostgreSQL 18](https://www.postgresql.org/docs/18/wal-reliability.html), [paramètres WAL](https://www.postgresql.org/docs/18/runtime-config-wal.html), [commit asynchrone](https://www.postgresql.org/docs/18/wal-async-commit.html), [standby et réplication](https://www.postgresql.org/docs/18/warm-standby.html), [archivage et sauvegardes](https://www.postgresql.org/docs/18/continuous-archiving.html).

## Vérifications et chronologie

- `node --test tests/sql-lot2.test.js` : sortie finale `sql-lot2-final-ultime.txt`, **23 vérifications réussies, 0 échec, 0 ignorée**, code `0` dans `sql-lot2-final-ultime.exit.txt` et stderr vide. La sortie précédente `sql-lot2-final-complet.txt` est conservée.
- Avant les deux derniers correctifs F21 : `sql-lot2-avant-examen-meta.txt`, **21 réussites et 2 échecs sur 23**, code `1`. La suite finale ajoute depuis une sonde PostgreSQL de garde anti-cycle dans un sous-test existant. Avant les derniers compléments F20/F21/F171/F174 : `sql-lot2-avant-derniers-cas.txt`, 18 réussites et 4 échecs sur 22.
- Les relevés antérieurs sont conservés : `sql-lot2-avant.txt` contient deux erreurs de mise au point des sondes PostgreSQL F172/F173 ; après correction de ces sondes, `sql-lot2-avant-rejeu.txt` comporte 10 échecs ciblés. **Limite du premier contrôle F20 :** son sélecteur choisissait un QCM récursif voisin ; son échec initial ne constitue donc pas une preuve valable du QCM F20 précis. Le sélecteur a ensuite été corrigé ; les échecs ultérieurs F20 portent sur l’exercice et l’examen, et les sondes moteur figurent séparément. Aucun de ces relevés n’a été effacé.
- Le rejeu SQLite de l’ancien corrigé d’examen est enregistré dans `sql-lot2-avant-trigger-sqlite.txt`. Une première tentative auxiliaire de lecture de la version sql.js a appelé une méthode `.run` inexistante ; la lecture corrigée utilise `loadSqlJs`. Elle n’était pas une panne des tests du produit.
- `npm run courses -- sql b3-sql` a régénéré uniquement les deux cours ; `node scripts/generate-courses.js --check sql b3-sql` confirme **26 pages à jour** dans `sql-lot2-synchronisation-complet.txt`, code `0`. Les contrôles de pages et de projection ciblés sont dans `sql-lot2-pages-complet.txt`, code `0`.
- Moteurs : PostgreSQL **18.6**, SQLite natif Python **3.53.4**, SQLite sql.js/WebAssembly **3.49.1** ; versions complètes dans `sql-lot2-versions.txt`. Le client SQLite CLI 3.50.6 a seulement servi à relever sa version. La suite requiert Node et les dépendances du dépôt, Python avec SQLite, ainsi que `initdb`, `pg_ctl` et `pg_waldump` disponibles pour un utilisateur non root. PostgreSQL a utilisé un cluster temporaire privé, sans TCP ni données utilisateur, arrêté après les sondes ; les fichiers temporaires ne sont pas nettoyés.
- Aucun test de navigateur, fournisseur distant, réplica, restauration de sauvegarde ou panne physique réelle n’a été exécuté. Les exemples publics contenant `-- VERIFY:` sont des exemples déclarés visibles ; leur présence seule n’établit pas une fuite de tests cachés.

## Limites et occurrences non traitées

- F170 était hors de ce lot et déjà nuancé dans le catalogue actif `server/exercises/b3-sql.js`. Le module historique **non importé par le registre** `server/exercises/b3-sql/chapitre1.js` conserve toutefois une ancienne solution `NOT IN` sensible à `NULL` ; elle n’a pas été corrigée ici.
- La page de catalogue B3 `server/content/b3-sql/pages/examens-exercices.js` conserve des décalages préexistants, hors des constats demandés, avec les exercices actifs : `sql3-c1-e3`, `sql3-c2-e1` à `e3`, `sql3-c3-e1` et `e2`, `sql3-c4-e1` et `e2`, `sql3-c5-e3`, `sql3-c6-e2` et `e3`. Les présentations de `sql3-c5-e2` et `sql3-c6-e1` sont également plus larges que leurs simulations actives. Les intitulés comparés sont consignés dans `sql-lot2-ecarts-hors-perimetre.txt` ; aucun inventaire général de tous les cours n’est revendiqué.
- La description du cours dans `server/content/b3-sql.js` conserve une affirmation de « défense absolue contre les injections SQL », extérieure aux constats de ce lot ; elle n’a pas été traitée.
- Les audits SQL rouges préexistants n’ont pas été relancés, maquillés ou fermés : leurs fichiers de sortie `audit-sql-brut-lot1-partie2.exit.txt`, `audit-sql-final-lot1-partie3.exit.txt` et `reprise-sql-audit-reprise.exit.txt` indiquent toujours `1`. `corrections/suivi.csv`, `.taskstate/evidence.md` et les générateurs ou configurations communs n’ont pas été modifiés pour ce lot.
