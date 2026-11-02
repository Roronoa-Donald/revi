# Bases de données et SQL

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : SQL B1 1 et 4. Population de la famille : 3 cours avec chapitre 1, 54 exercices, 124 QCM et 102 cartes ; 20 exercices, 10 QCM et 10 cartes tirés dans l'ensemble des trois cours. Identifiants et graine dans `../echantillons-identifiants.json`.

## Exactitude et constats

- **F224 — D8/D12, S0, observé** — `b1-sql/chapitres/chapitre4.html:96` affirme qu'une jointure sans `ON` n'existe pas, avant de montrer une jointure conditionnée par `WHERE` ; `CROSS JOIN`, `USING` et `NATURAL` fournissent aussi des formes sans `ON`. Source : documentation PostgreSQL citée ci-dessous.
- **F225 — D8/D9, S1, observé** — Dans cinq chapitres SQL B3, par exemple `b3-sql/chapitres/chapitre1.html:78`, les objectifs annoncent des développements Python alors que les trois ateliers sont en SQL. Aligner l'objectif et les activités.

Les textes principaux des chapitres SQL B1 1 et 4 sélectionnés ont été lus ; ils font aussi partie des six chapitres fondamentaux SQL relus. Cette lecture ne certifie pas chaque activité ni chaque distracteur.

- **F169–F171 — D9/D14, S1, observé** — Trois réponses SQL qui ne respectent pas les consignes sont pourtant acceptées : `LIKE '%Cable%'` au lieu du préfixe demandé dans `b1-sql/chapitres/chapitre3.html:217` ; borne `xmax > 50` au lieu de `>= 50` dans le modèle de `b3-sql/chapitres/chapitre1.html:221` ; colonnes d'index inversées à `b3-sql/chapitres/chapitre3.html:259`. Des données synthétiques et `PRAGMA index_info` font apparaître les différences ; voir `../sondes-contre-exemples-sql.json`. Ajouter des cas discriminants ou expliciter les variantes acceptables.
- **F172/F173 — D12, S0, observé** — `b3-sql/chapitres/chapitre1.html:221`, « Dans PostgreSQL (MVCC) », assimile à la visibilité réelle un modèle réduit à un seuil numérique sans prise en compte des transactions en cours ou de leur état. À `:101`, « passe <em>UNDO</em> » généralise à PostgreSQL une reprise REDO des seuls commits suivie d'un UNDO global. Les instantanés PostgreSQL sont plus riches ; son WAL rejoue aussi des changements non validés et la visibilité gère les transactions abandonnées. Aucun serveur PostgreSQL réel n'a été exécuté. Voir https://www.postgresql.org/docs/current/functions-info.html, https://www.postgresql.org/docs/current/wal-intro.html et https://wiki.postgresql.org/wiki/Operations_cheat_sheet.
- **F174 — D12, S1, observé** — `b3-sql/chapitres/chapitre1.html:92`, « survivant à toute panne matérielle » : la durabilité ne remplace pas les sauvegardes et ne survit pas à la perte de toutes les copies ; un acquittement peut précéder la synchronisation selon la configuration. Voir https://www.postgresql.org/docs/current/wal-reliability.html et https://www.postgresql.org/docs/current/runtime-config-wal.html.
- **F79–F80, S0, observé** — Dans `b1-sql/chapitres/chapitre4.html:143`, la jointure utilise `V.codemarque`, absent du schéma du simulateur ; le même problème concerne les `UPDATE` du chapitre 6. Le QCM `b1-sql/chapitres/chapitre5.html:315` attend une erreur pour une colonne non agrégée alors que SQLite accepte cette requête et renvoie 12 lignes. Les deux comportements sont reproduits sur le moteur et les données livrés dans `../sondes-sql-fondamentaux.json`.
- **F81–F84, S0/S1, observé** — `b1-sql/chapitres/chapitre5.html:130` exclut à tort `HAVING` sans `GROUP BY` ; `:138` confond ordre syntaxique et ordre logique, pourtant correctement distingués au résumé. À `b1-sql/chapitres/chapitre6.html:90`, un prétendu mode prudent par défaut suggère qu'un `UPDATE` sans `WHERE` est bloqué : le moteur livré modifie au contraire les 23 lignes, en mémoire lors de la sonde. Enfin, l'exercice `b1-sql/chapitres/chapitre2.html:263` demande `ALTER` avant son introduction au chapitre 6.
- **F05 — D8/D12, S0, observé** — `b1-sql/chapitres/chapitre1.html:161`, « `SELECT nommarque, pays FROM Marque` » : la requête est valide sur la miniature du texte, mais échoue sur la base `parc_auto` du simulateur, dont la colonne s'appelle `paysmarque`. Harmoniser le schéma, les données et l'exemple ; `../sondes-sql-cours.json` contient le contrôle.
- **F06 — D8/D12, S0, observé** — `b1-sql/chapitres/chapitre1.html:153`, « sans immatriculation ... NULL » : l'immatriculation est présentée juste avant comme identifiant. En outre le schéma SQLite fourni accepte deux valeurs `NULL` pour cette clé faute de `NOT NULL`. Utiliser une colonne facultative non identifiante dans l'exemple et rendre la contrainte explicite.
- **F60 — D12, S0, observé** — `b1-sql/chapitres/cartes.html:75`, « Elle reçoit NULL, ou sa valeur par défaut » : l'omission d'une colonne `NOT NULL` sans défaut peut au contraire être rejetée ; une clé `INTEGER PRIMARY KEY` omise peut être générée dans SQLite. Les deux comportements ont été exécutés sur des données synthétiques dans `../sondes-cartes.json`.
- **F61 — D12, S0, observé** — `sql/chapitres/cartes.html:97`, « les fonctions d’agrégation ignorent les NULLs » : `AVG` ignore bien `NULL`, mais `COUNT(*)` compte les lignes et PostgreSQL `array_agg` peut conserver les valeurs nulles. La sonde SQLite donne une moyenne de 15, `COUNT(note)=2` et `COUNT(*)=3`.
- **F78 — D12, S1, observé** — `b1-sql/chapitres/cartes.html:92`, « appariée par la condition ON » : `USING`, `NATURAL` et `CROSS JOIN` montrent qu'une jointure ne s'écrit pas toujours avec `ON`. Distinguer résultat logique et matérialisation physique.
- **F10–F11 — D12, S0, observé** — `sql/chapitres/cartes.html:68`, « `CHECK (prix > 0)` », n'exclut pas à lui seul `NULL` ; `:69`, « CHAR(10) réserve toujours 10 octets », confond caractères, octets et stockage. Donner le SGBD et ajouter `NOT NULL` si requis.
- **F20–F21 — D7/D9/D12, S1, observé** — `b3-sql/chapitres/chapitre4.html:368`, « éviter ... boucle », exclut `UNION` sans qualifier les colonnes : la déduplication peut arrêter certains cycles lorsque les lignes entières se répètent. `b3-sql/chapitres/chapitre5.html:407` impose AFTER pour un journal transactionnel, alors qu'un BEFORE écrivant dans la même transaction peut aussi être annulé ; à `:414`, l'explication omet les contraintes différées. Les deux cas sont illustrés par `../sondes-qcm.json` avec SQLite, et confrontés à la documentation PostgreSQL sans exécution de PostgreSQL.
- **F49 — D12/D14, S1, observé** — `sql/chapitres/cartes.html:108`, « bloque tout autre accès » : en PostgreSQL, un verrou exclusif de ligne ne bloque pas les lectures ordinaires MVCC. Préciser SGBD, objet verrouillé et opérations concernées.
- **F07 — D8/D15, S1, observé** — `b1-sql/atelier.html:59` promet un éditeur Bash ; le lab déclare SQL à `:74` avec un texte initial d'analyse non exécutable comme SQL. Ne pas confondre ce lab et le simulateur SQL distinct.
- **F35 — D14, S2, observé** — `b1-sql/chapitres/chapitre1.html:217`, « `SELECT * FROM etudiants` » : les indices reconstituent quasiment la réponse. Faire d'abord raisonner sur les colonnes attendues.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `b1-sql/chapitres/chapitre1.html:65` utilise un parc automobile pour motiver les requêtes. |
| C2 Objectifs | Les actions définir, citer, expliquer et décrire figurent à `b1-sql/chapitres/chapitre1.html:70` ; leur couverture complète reste à contrôler. |
| C3 Prérequis | Les acquis nécessaires avant les jointures du chapitre 4 n'ont pas été vérifiés pour tous les parcours. |
| C4 Ordre | Le chapitre 1 introduit le modèle relationnel, le chapitre 4 les jointures ; pas de validation exhaustive des dépendances. |
| C5 Définitions | Clés et `NULL` se contredisent dans l'exemple F06 ; la nuance des clés étrangères touche aussi Merise, F45. |
| C6 Exemples et progression | `b1-sql/chapitres/chapitre1.html:161` ne fonctionne pas sur la base fournie ; tous les exemples n'ont pas été exécutés. |
| C7 Charge | Une situation concrète et des étapes nommées sont présentes ; la charge vécue par des débutants n'a pas été mesurée. |
| C8 Cohérence | La miniature, le simulateur, les noms de colonnes et le libellé de l'atelier ne sont pas alignés : F05–F07. |
| C9 Exercices | F35 donne trop tôt la requête ; la résolution de tous les exercices avec les seules notions antérieures n'a pas été établie. |
| C10 QCM | Les questions B3 sur récursion et triggers nécessitent des hypothèses ; F20–F21. Les explications ne détaillent pas systématiquement chaque distracteur. |
| C11 Auto-évaluation | Les paliers sont comptés globalement, pas comparés individuellement aux objectifs du cours. |
| C12 Exactitude | `CHECK`, `NULL`, `CHAR`, verrous et clés exigent les nuances F06, F10–F11 et F49. |
| C13 Ressources | `sql/chapitres/cartes.html:68` et `:108` introduisent des règles trop absolues ; rapprocher cartes et cours révisé. |
| C14 Rendu | L'atelier B1 combine un libellé et un mode contradictoires ; un parcours authentifié complet n'a pas été testé. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les **20 exercices SQL** tirés ont chacun reçu deux variantes ciblant des erreurs de raisonnement : 37 sont rejetées et trois réponses non conformes aux consignes sont acceptées, F169–F171. Elles sont construites à partir des corrigés, pas recueillies auprès d'étudiants ; elles ne démontrent pas l'exhaustivité des tests. Détails : `../sondes-reponses-plausibles.json` et `../sondes-contre-exemples-sql.json`.

**20 corrigés sur 20** passent leurs tests cachés ; **20 des 40 variantes automatiques initiales** passent aussi. Pour cette famille, 20 variantes ajoutent `DISTINCT`, ce qui peut être sans effet lorsque les données n'ont pas de doublons ; ces acceptations initiales ne prouvent pas 20 solutions incorrectes. Le contrôle ciblé ci-dessus est distinct. Les 10 QCM et 10 cartes sont identifiés dans l'échantillon, sans validation exhaustive de leurs explications.

**Niveau.** La mise en situation B1 est accessible en intention ; les contradictions entre cours et simulateur pénalisent particulièrement un débutant. Les chapitres B3 proposent jointures, récursion et transactions ; leur progression complète et les défis pour étudiants avancés ne sont pas évalués.

## Confrontation aux supports et références

`corpus-cours-revi.zip`, `textes/B1/SQL/SUPPORT_BDD_SQL_IT-B1_LITE.txt`, page 9, introduit SQL ; `b1-sql/chapitres/chapitre1.html:156` aborde aussi `SELECT`. C'est une convergence ponctuelle, pas une comparaison complète du programme. L'index ne contient aucun PDF pour le cours B2 `sql`. Les textes principaux extraits des six chapitres SQL B1 ont été relus ; cette lecture ne remplace ni l'exécution de tous les exemples, ni la vérification du rendu et des supports entiers.

Sources primaires consultées le 29 octobre 2026 :

- SQLite, colonnes non agrégées et `HAVING` : https://www.sqlite.org/lang_select.html
- SQLite, portée d'un `UPDATE` : https://www.sqlite.org/lang_update.html
- PostgreSQL, traitement de `SELECT` et `HAVING` : https://www.postgresql.org/docs/current/sql-select.html
- PostgreSQL, récursivité et cycles : https://www.postgresql.org/docs/current/queries-with.html
- PostgreSQL, déclencheurs et contraintes différées : https://www.postgresql.org/docs/current/sql-createtrigger.html
- PostgreSQL, formes de jointure : https://www.postgresql.org/docs/current/queries-table-expressions.html
- SQLite, contraintes de clés étrangères différées : https://www.sqlite.org/foreignkeys.html

- SQLite, contraintes et particularité des clés primaires : https://sqlite.org/lang_createtable.html
- PostgreSQL, contraintes et `NULL` : https://www.postgresql.org/docs/current/ddl-constraints.html
- PostgreSQL, agrégats et valeurs nulles : https://www.postgresql.org/docs/current/functions-aggregate.html
- PostgreSQL, types caractères : https://www.postgresql.org/docs/current/datatype-character.html
- PostgreSQL, récursion et cycles : https://www.postgresql.org/docs/17/queries-with.html
- PostgreSQL, triggers et verrous : https://www.postgresql.org/docs/current/trigger-definition.html et https://www.postgresql.org/docs/current/explicit-locking.html
