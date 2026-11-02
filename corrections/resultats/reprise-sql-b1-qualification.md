# Qualification des candidats SQL B1 — 30 octobre 2026

Le contrôle brut `reprise-sql-audit-reprise.json` garde ses 37 échecs B1 et son code 1 : cette qualification ne les efface pas et ne valide pas les autres cours. Les lignes correspondent à cet instantané ; une modification des pages nécessite une nouvelle qualification.

Dix-sept jeux visibles d’atelier et un corrigé de création nécessitent une base vierge. Le test `reprise-sql-contextes-apres.txt` reproduit leurs 18 erreurs sur le parc déjà initialisé, exécute les 18 scripts sur base vierge, compare les schémas et vérifie les clés. Une seconde implémentation SQLite exécute aussi les scripts. La requête de vue est vérifiée après la création de cette vue, et comparée à l’agrégation directe sous les deux moteurs.

| Localisation | Qualification | Justification |
|---|---|---|
| `b1-sql/chapitres/cartes.html:67` | prose | Phrase explicative, pas une instruction. |
| `b1-sql/chapitres/cartes.html:83` | prose | Liste des clauses, pas une instruction. |
| `b1-sql/chapitres/cartes.html:109` | prose | Question sur DELETE sans WHERE. |
| `b1-sql/chapitres/chapitre1.html:203` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre1.html:292` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre1.html:381` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre2.html:129` | fragment | Mot-clé CREATE TABLE présenté isolément. |
| `b1-sql/chapitres/chapitre2.html:131` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre2.html:162` | fragment | Mot-clé INSERT INTO présenté isolément. |
| `b1-sql/chapitres/chapitre2.html:177` | notation | Forme générique avec points de suspension. |
| `b1-sql/chapitres/chapitre2.html:323` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre3.html:143` | notation | Plan explicatif avec noms à remplacer. |
| `b1-sql/chapitres/chapitre3.html:178` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre3.html:264` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre3.html:349` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre4.html:193` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre4.html:282` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre4.html:372` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre5.html:146` | notation | Plan explicatif avec noms à remplacer. |
| `b1-sql/chapitres/chapitre5.html:189` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre5.html:275` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre5.html:361` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre6.html:83` | notation | Modèle UPDATE à adapter, séparé de son exemple réel. |
| `b1-sql/chapitres/chapitre6.html:100` | fragment | Mot-clé DROP TABLE présenté isolément. |
| `b1-sql/chapitres/chapitre6.html:101` | fragment | Mot-clé ALTER TABLE présenté isolément. |
| `b1-sql/chapitres/chapitre6.html:108` | MySQL | Syntaxe MODIFY signalée comme MySQL ; non validée avec un serveur MySQL. |
| `b1-sql/chapitres/chapitre6.html:114` | MySQL | Gestion des utilisateurs MySQL ; non validée avec un serveur MySQL. |
| `b1-sql/chapitres/chapitre6.html:179` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre6.html:272` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre6.html:374` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/chapitre6.html:467` | notation | Option de QCM contenant des points de suspension. |
| `b1-sql/chapitres/chapitre6.html:470` | prose | Explication de QCM, pas une instruction. |
| `b1-sql/chapitres/formules.html:87` | notation | Plan explicatif SELECT avec noms à remplacer. |
| `b1-sql/chapitres/formules.html:147` | notation | Modèles de commandes avec noms à remplacer. |
| `b1-sql/chapitres/simulateur-examen.html:102` | base vierge | Préparation de données ou création sur base vierge ; contrôlée sous deux moteurs SQLite. |
| `b1-sql/chapitres/simulateur-examen.html:120` | MySQL | Exercice annoncé en MySQL ; non validé avec un serveur MySQL. |
| `b1-sql/exercices/exercices.html:104` | vue | La vue doit être créée par l’exemple précédent ; séquence contrôlée sous deux moteurs SQLite. |

## Huit fragments non qualifiés automatiquement

Ces extraits sont des mots-clés ou du texte d’explication tronqué ; aucun n’est compté comme une requête exécutable réussie.

- `b1-sql/chapitres/cartes.html:67` — `SELECT`.
- `b1-sql/chapitres/chapitre1.html:162` — `SELECT`.
- `b1-sql/chapitres/chapitre1.html:177` — `SELECT`.
- `b1-sql/chapitres/chapitre3.html:82` — `SELECT`.
- `b1-sql/chapitres/chapitre6.html:455` — `DELETE FROM Voiture; (sans WHERE)…`.
- `b1-sql/chapitres/chapitre6.html:466` — `UPDATE`.
- `b1-sql/chapitres/chapitre6.html:468` — `INSERT`.
- `b1-sql/chapitres/simulateur-examen.html:196` — `UPDATE sans WHERE…`.

Limites : trois blocs identifiés comme MySQL restent non exécutés sur ce moteur ; les 139 échecs B2/B3 ne sont pas qualifiés ici. Les notations ne sont pas des exemples autonomes validés. L’exécution ne garantit pas l’exactitude pédagogique de tous les contenus ni la porte SQL du lot.
