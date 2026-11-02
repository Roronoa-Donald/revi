# Lot 1, partie 2 — qualification individuelle des 139 échecs SQL B2/B3

Ce relevé qualifie les 105 occurrences B2 et les 34 occurrences B3 du banc initial. Une occurrence est un extrait et son contexte, pas nécessairement une requête autonome. Les positions et empreintes des fichiers avant correction sont historiques ; les pages générées peuvent avoir été régénérées depuis.

Les détails, dialectes, hypothèses, résultats par moteur et empreintes initiaux sont conservés dans `resultats/qualification-sql-b2-avant.json` et `resultats/qualification-sql-b3-avant.json`. Les sorties de sondes figurent dans `resultats/reproductions-sql-b2-avant.json`, `resultats/scriptdom-sql-b2-avant.json`, `resultats/preuves-sql-b3-avant.txt` et `resultats/preuves-sql-b3-proposition.txt`. Les correctifs T-SQL sont décrits dans `resultats/verification-correctifs-sql-b2.json` et `resultats/verification-metier-sql-b2.json` ; leurs AST actuels sont archivés séparément.

**Limites générales.** Le banc initial emploie SQLite et un schéma B1, qui ne conviennent pas à tous ces exemples. Les sondes PostgreSQL utilisent la version 18.6 et des schémas fictifs, pas PostgreSQL 16 ni les données réelles. ScriptDOM est un parseur T-SQL, pas SQL Server : une syntaxe acceptée ne prouve pas son exécution, ses droits ou ses résultats. Une simulation SQLite transposée ne prouve pas le comportement exact d’un trigger SQL Server. Aucun fournisseur distant n’a été vérifié.

## SQL B2 — 105 occurrences

### B2-001 — Prose pédagogique
- Emplacement du relevé initial : `sql/chapitres/cartes.html:67` ; source de référence : `server/content/sql/chapitre1.js:233`.
- Contexte : Verso de carte : comparaison de DELETE et TRUNCATE. Dialecte : Non applicable : texte, pas SQL.
- Qualification : Le banc a pris une phrase explicative pour une instruction. Les détails de journalisation et de rollback varient selon le SGBD.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-002 — Prose pédagogique
- Emplacement du relevé initial : `sql/chapitres/cartes.html:119` ; source de référence : `server/content/sql/chapitre6.js:256`.
- Contexte : Verso de carte sur EXPLAIN et EXPLAIN ANALYZE. Dialecte : Non applicable ; notion illustrée notamment par PostgreSQL.
- Qualification : Le texte décrit les plans ; ce n’est pas une requête.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-003 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/chapitres/chapitre1.html:120` ; source de référence : `server/content/sql/chapitre1.js:86`.
- Contexte : Exemple de suppression de structure dans la comparaison DROP/TRUNCATE/DELETE. Dialecte : SQL commun, vérifié sur SQLite et PostgreSQL.
- Qualification : DROP TABLE t est complet ; l’absence de t dans le schéma B1 explique l’échec initial.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-004 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/chapitres/chapitre1.html:120` ; source de référence : `server/content/sql/chapitre1.js:88`.
- Contexte : Exemple de suppression de lignes dans la comparaison DROP/TRUNCATE/DELETE. Dialecte : SQL commun, vérifié sur SQLite et PostgreSQL.
- Qualification : DELETE FROM t est complet et ne supprime pas la structure.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-005 — Leurre volontaire de QCM
- Emplacement du relevé initial : `sql/chapitres/chapitre1.html:316` ; source de référence : `server/content/sql/chapitre1.js:148`.
- Contexte : Réponse incorrecte à un QCM sur DELETE et TRUNCATE ; option non marquée correcte. Dialecte : Non applicable : proposition en prose.
- Qualification : L’assertion est un distracteur délibéré, pas une commande SQL.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-006 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/chapitres/chapitre2.html:320` ; source de référence : `server/content/sql/chapitre2.js:173`.
- Contexte : Option marquée correcte au QCM sur INSERT multi-lignes. Dialecte : Gabarit SQL commun ; syntaxe concrète vérifiée sur SQLite et PostgreSQL.
- Qualification : Le schéma conceptuel VALUES (...), (...) est le bon choix, mais les placeholders de la réponse ne constituent pas une instruction complète à copier.
- Preuve ou limite : {"sqlite_gabarit_brut":{"statut":"échec","type":"syntaxe"},"postgresql_gabarit_brut":{"statut":"échec","type":"syntaxe"},"sqlite_exemple_concret":{"statut":"succès"},"postgresql_exemple_concret":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-007 — Leurre volontaire de QCM
- Emplacement du relevé initial : `sql/chapitres/chapitre2.html:321` ; source de référence : `server/content/sql/chapitre2.js:174`.
- Contexte : Mauvaise option du QCM INSERT multi-lignes. Dialecte : Pseudo-syntaxe SQL.
- Qualification : INSERT MULTIPLE est un distracteur intentionnel ; il ne faut pas le corriger en tant que solution.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-008 — Leurre volontaire de QCM
- Emplacement du relevé initial : `sql/chapitres/chapitre2.html:322` ; source de référence : `server/content/sql/chapitre2.js:175`.
- Contexte : Mauvaise option du QCM INSERT multi-lignes. Dialecte : Pseudo-syntaxe SQL.
- Qualification : Un UPDATE ne correspond pas à l’insertion demandée ; l’option est volontairement fausse.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-009 — Leurre volontaire de QCM
- Emplacement du relevé initial : `sql/chapitres/chapitre2.html:323` ; source de référence : `server/content/sql/chapitre2.js:176`.
- Contexte : Mauvaise option du QCM INSERT multi-lignes. Dialecte : Pseudo-syntaxe SQL.
- Qualification : CREATE ROWS est une proposition incorrecte délibérée.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-010 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/chapitres/chapitre5.html:131` ; source de référence : `server/content/sql/chapitre5.js:99`.
- Contexte : Nom d’un verrou partagé dans une explication ; points de suspension explicites. Dialecte : Suffixe PostgreSQL/SQL courant ; non applicable tel quel à T-SQL.
- Qualification : SELECT ... FOR SHARE est une notation abrégée, pas une requête complète attendue.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-011 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/chapitres/chapitre5.html:132` ; source de référence : `server/content/sql/chapitre5.js:100`.
- Contexte : Nom d’un verrou exclusif dans une explication ; points de suspension explicites. Dialecte : Suffixe PostgreSQL/SQL courant ; T-SQL utilise d’autres mécanismes.
- Qualification : Le banc a traité une notation explicative comme une commande complète.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-012 — Entrée d’atelier à compléter
- Emplacement du relevé initial : `sql/chapitres/chapitre6.html:182` ; source de référence : `server/exercises/sql.js:634`.
- Contexte : Exemple d’entrée de l’atelier sql2-c6-e1, coupé par le marqueur -- VERIFY:. Dialecte : SQLite/sql.js, protocole propre au code lab.
- Qualification : L’absence de la vue avant le travail demandé est intentionnelle : en respectant le protocole et en insérant une création de vue conforme, la vérification retourne deux lignes.
- Preuve ou limite : {"sqlite_sans_code_apprenant":"échec : vue non créée","sqlite_avec_code_apprenant":"succès","lignes_obtenues":2} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-013 — Prose pédagogique
- Emplacement du relevé initial : `sql/chapitres/chapitre6.html:347` ; source de référence : `server/content/sql/chapitre6.js:195`.
- Contexte : Explication de la réponse à un QCM EXPLAIN ANALYZE. Dialecte : Non applicable : prose.
- Qualification : Le texte qui commence par EXPLAIN ne constitue pas une instruction SQL.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-014 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/chapitres/examens.html:83` ; source de référence : `server/content/sql/pages/examens-exercices.js:42`.
- Contexte : Terme CREATE TABLE dans un énoncé d’examen. Dialecte : Non applicable : nom d’instruction dans une phrase.
- Qualification : Le banc a extrait le nom de la commande, pas une réponse incomplète à corriger.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-015 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/chapitres/examens.html:100` ; source de référence : `server/content/sql/pages/examens-exercices.js:54`.
- Contexte : Corrigé : clients sans commande. Dialecte : SQL commun, vérifié sur SQLite et PostgreSQL.
- Qualification : La sous-requête NOT EXISTS est complète et l’absence des tables B1 n’en démontre aucun défaut.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-016 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/chapitres/examens.html:102` ; source de référence : `server/content/sql/pages/examens-exercices.js:56`.
- Contexte : Corrigé : montant annuel par client avec seuil. Dialecte : SQL commun ; vérifié sur SQLite et PostgreSQL avec date_cmd de type date.
- Qualification : La jointure, le GROUP BY et le HAVING sont complets. Pour un horodatage plutôt qu’une date, la borne haute doit être adaptée au type et au besoin.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-017 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/chapitres/formules.html:76` ; source de référence : `server/content/sql/pages/cartes-formules.js:66`.
- Contexte : Mémo ALTER TABLE avec valeur par défaut. Dialecte : PostgreSQL ; différences SQLite et SQL Server.
- Qualification : La requête originale réussit sur PostgreSQL. SQLite 3.53.4 refuse ce défaut non constant sur une table non vide ; T-SQL emploie une syntaxe différente. Ce n’est pas une preuve de défaut PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"échec","type":"valeur par défaut non constante sur table non vide"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-018 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:203` ; source de référence : `sql/cours_ecommerce_sql.html:203`.
- Contexte : E-commerce, corrigé 1.2 : création de Reviews. Dialecte : T-SQL SQL Server : IDENTITY, NVARCHAR(MAX), GETDATE.
- Qualification : ScriptDOM accepte la syntaxe ; le moteur SQL Server et les contraintes réelles n’ont pas été exécutés.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-019 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:234` ; source de référence : `sql/cours_ecommerce_sql.html:234`.
- Contexte : E-commerce, corrigé 1.4 : ajout d’une colonne et d’une clé étrangère. Dialecte : T-SQL SQL Server ; GO est un séparateur de lots du client SSMS, pas une instruction transmise au moteur.
- Qualification : ScriptDOM distingue deux lots. Les deux ALTER réussissent sur PostgreSQL après retrait du séparateur client GO ; SQL Server non vérifié.
- Preuve ou limite : {"postgresql_sans_séparateur_client_GO":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-020 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:255` ; source de référence : `sql/cours_ecommerce_sql.html:255`.
- Contexte : E-commerce, corrigé 2.1 : sélection puis augmentation de prix. Dialecte : T-SQL ciblé, sous-ensemble SQL commun.
- Qualification : Les deux instructions originales réussissent sur SQLite et PostgreSQL avec les colonnes attendues ; SQL Server non vérifié.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-021 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:267` ; source de référence : `sql/cours_ecommerce_sql.html:267`.
- Contexte : E-commerce, corrigé 2.2 : insertion d’un client puis suppression ciblée. Dialecte : T-SQL ciblé, sous-ensemble SQL commun.
- Qualification : La lecture des données initiales confirme que le nouvel e-mail n’y figure pas et que la cible de suppression existe sans commande. Les instructions réussissent aussi sur les schémas synthétiques ; SQL Server non vérifié.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-022 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:278` ; source de référence : `sql/cours_ecommerce_sql.html:278`.
- Contexte : E-commerce, corrigé 2.3 : annulation ciblée et remise manuelle en stock. Dialecte : T-SQL ciblé, sous-ensemble SQL commun.
- Qualification : Les deux UPDATE sont complets pour le scénario indiqué ; leur présence dans un schéma différent de B1 explique l’échec initial.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-023 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:289` ; source de référence : `sql/cours_ecommerce_sql.html:289`.
- Contexte : E-commerce, corrigé 2.4 : insertion de deux promotions. Dialecte : T-SQL ciblé, INSERT multi-lignes commun.
- Qualification : L’insertion est complète et passe les deux moteurs avec une table adaptée ; SQL Server non vérifié.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-024 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:301` ; source de référence : `sql/cours_ecommerce_sql.html:301`.
- Contexte : E-commerce, corrigé 2.5 : remise conditionnelle. Dialecte : T-SQL ciblé, sous-ensemble SQL commun.
- Qualification : L’UPDATE correspond au seuil strictement supérieur à 100 et passe les deux moteurs avec la table adaptée.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-025 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:333` ; source de référence : `sql/cours_ecommerce_sql.html:333`.
- Contexte : E-commerce, corrigé 3.2 : détail de commande avec jointures. Dialecte : T-SQL ciblé, SQL de jointure commun.
- Qualification : La requête est complète et les quatre tables expliquent pourquoi le schéma B1 ne convient pas.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-026 — Défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:366` ; source de référence : `sql/cours_ecommerce_sql.html:366`.
- Contexte : E-commerce, corrigé 3.4 : chiffre d’affaires de chaque catégorie. Dialecte : T-SQL ciblé ; la requête originale est aussi exécutée sur SQLite et PostgreSQL.
- Qualification : Défaut de résultat : les INNER JOIN excluent les catégories sans vente. Avec les INSERT initiaux du cours et un DDL adapté à SQLite, une catégorie est retournée sur trois ; une variante LEFT JOIN en retourne trois.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"},"comparaison_métier_sqlite":{"catégories_présentes_jeu":3,"catégories_requête_initiale":1,"catégories_variante_left_join":3,"jeu":"trois catégories, ventes uniquement en catégorie 1 ; répartition du script du cours"}} SQL Server : non vérifiée.
- État : Défaut constaté corrigé localement ; voir les preuves et limites ci-dessous.

### B2-027 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:384` ; source de référence : `sql/cours_ecommerce_sql.html:384`.
- Contexte : E-commerce, corrigé 4.1 : concaténation et différence de dates. Dialecte : T-SQL SQL Server : concaténation +, DATEDIFF et GETDATE.
- Qualification : La syntaxe est acceptée par ScriptDOM. Une interprétation SQLite de + ne vérifie pas la concaténation T-SQL ; SQL Server non vérifié.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-028 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:395` ; source de référence : `sql/cours_ecommerce_sql.html:395`.
- Contexte : E-commerce, corrigé 4.2 : dépenses clients avec HAVING. Dialecte : T-SQL ciblé, SQL de jointure et agrégation commun.
- Qualification : La requête est complète ; les moteurs SQLite et PostgreSQL l’acceptent sur le schéma synthétique.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-029 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:408` ; source de référence : `sql/cours_ecommerce_sql.html:408`.
- Contexte : E-commerce, corrigé 4.3 : année et indicateur d’âge. Dialecte : T-SQL SQL Server : YEAR, GETDATE, CASE.
- Qualification : ScriptDOM accepte la syntaxe ; l’existence de YEAR/GETDATE et l’exécution doivent être évaluées dans SQL Server, non vérifié ici.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-030 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:429` ; source de référence : `sql/cours_ecommerce_sql.html:429`.
- Contexte : E-commerce, procédure de changement de statut. Dialecte : T-SQL SQL Server : procédure, paramètres @, THROW et GO client.
- Qualification : La syntaxe est acceptée par ScriptDOM ; le traitement d’erreur et l’exécution SQL Server restent non vérifiés.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-031 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:456` ; source de référence : `sql/cours_ecommerce_sql.html:456`.
- Contexte : E-commerce, procédure d’historique client. Dialecte : T-SQL SQL Server ; GO client.
- Qualification : La procédure est complète à l’analyse syntaxique ; SQL Server et ses données ne sont pas vérifiés.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-032 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:477` ; source de référence : `sql/cours_ecommerce_sql.html:477`.
- Contexte : E-commerce, procédure de remise par catégorie. Dialecte : T-SQL SQL Server : @@ROWCOUNT, PRINT et GO.
- Qualification : ScriptDOM accepte la procédure. PRINT affiche un message : si un résultat exploitable par programme est exigé par « retournez », préférer SELECT ou OUTPUT ; cette exigence et l’exécution SQL Server restent non vérifiées.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-033 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:505` ; source de référence : `sql/cours_ecommerce_sql.html:505`.
- Contexte : E-commerce, table d’historique puis trigger de modification des prix. Dialecte : T-SQL SQL Server : IDENTITY, GETDATE, inserted/deleted et GO.
- Qualification : La structure T-SQL est acceptée par ScriptDOM. L’effet du trigger n’a pas été exécuté sur SQL Server.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-034 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:529` ; source de référence : `sql/cours_ecommerce_sql.html:529`.
- Contexte : E-commerce, trigger INSTEAD OF DELETE sur les clients. Dialecte : T-SQL SQL Server : inserted/deleted, THROW et GO.
- Qualification : La syntaxe est acceptée. Un client inactif peut encore être protégé par la clé étrangère des commandes : cela ne rend pas le trigger syntaxiquement invalide. SQL Server non vérifié.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-035 — Anomalie métier étayée, SQL Server non vérifié
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:553` ; source de référence : `sql/cours_ecommerce_sql.html:553`.
- Contexte : E-commerce, trigger de remise en stock lors d’une annulation. Dialecte : T-SQL SQL Server : trigger ensembliste, UPDATE FROM, inserted/deleted et GO.
- Qualification : L’UPDATE joint peut avoir plusieurs lignes sources pour un même produit. Dans un portage SQLite, deux retours de 2 et 3 unités sur un stock de 10 produisent 13 au lieu de 15 ; la documentation SQL Server indique qu’une jointure non univoque rend le résultat indéfini. Le trigger original sur SQL Server est non vérifié.
- Preuve ou limite : {"simulation_sqlite_portage_de_l_update":{"stock_initial":10,"quantités_à_restituer":[2,3],"stock_observé":13,"stock_attendu":15,"stock_variante_groupée":15,"limite":"portage SQLite, pas exécution du trigger T-SQL"}} SQL Server : non vérifiée.
- État : Correction locale appliquée à une anomalie étayée ; analyse T-SQL et transposition SQLite vérifiées, comportement SQL Server non reproduit.

### B2-036 — Anomalie métier étayée, SQL Server non vérifié
- Emplacement du relevé initial : `sql/cours_ecommerce_sql.html:585` ; source de référence : `sql/cours_ecommerce_sql.html:585`.
- Contexte : E-commerce, procédure transactionnelle de commande. Dialecte : T-SQL SQL Server : procédure, TRY/CATCH, transaction, SCOPE_IDENTITY et GO.
- Qualification : La procédure ne refuse pas une quantité négative : sous l’hypothèse normale d’un achat positif, une simulation du branchement avec quantité −2 et stock 10 enregistre une ligne négative et porte le stock à 12. SQL Server non vérifié. Le risque concurrent entre lecture et décrément est également non vérifié.
- Preuve ou limite : {"simulation_logique_sur_sqlite":{"quantité":-2,"stock_initial":10,"résultat":"commande enregistrée","stock_final":12,"limite":"transposition du branchement et des écritures, pas exécution de la procédure T-SQL"}} SQL Server : non vérifiée.
- État : Correction locale appliquée à une anomalie étayée ; analyse T-SQL et transposition SQLite vérifiées, comportement SQL Server non reproduit.

### B2-037 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/exercices/exercices.html:947` ; source de référence : `sql/exercices/exercices.html:947`.
- Contexte : Indication de syntaxe dans un exercice de procédure. Dialecte : Gabarit T-SQL avec points de suspension.
- Qualification : CREATE PROCEDURE ... (@p type) est une aide schématique, pas une solution complète.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-038 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:44` ; source de référence : `sql/modules/formules.html:44`.
- Contexte : Cheat sheet SQL Server : création de base. Dialecte : T-SQL SQL Server ; CREATE DATABASE est aussi reconnu par PostgreSQL.
- Qualification : ScriptDOM accepte l’instruction ; une base temporaire est créée puis supprimée dans la grappe PostgreSQL isolée. SQL Server non vérifié.
- Preuve ou limite : {"postgresql_base_temporaire_créée":{"statut":"succès"},"nettoyage_base_temporaire":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-039 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:48` ; source de référence : `sql/modules/formules.html:48`.
- Contexte : Cheat sheet SQL Server : création de Clients. Dialecte : T-SQL SQL Server : propriété IDENTITY.
- Qualification : ScriptDOM accepte INT PRIMARY KEY IDENTITY. Le rejet SQLite ne prouve pas un défaut du dialecte SQL Server ; exécution SQL Server non vérifiée.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-040 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:52` ; source de référence : `sql/modules/formules.html:52`.
- Contexte : Cheat sheet : ajout puis retrait d’une colonne. Dialecte : T-SQL ciblé, ALTER également vérifié sur SQLite et PostgreSQL.
- Qualification : Les deux ALTER réussissent sur les schémas adaptés.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-041 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:56` ; source de référence : `sql/modules/formules.html:56`.
- Contexte : Cheat sheet : suppression de Clients. Dialecte : SQL commun.
- Qualification : DROP TABLE est une instruction complète ; l’absence de la table initiale n’est pas un défaut de syntaxe.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-042 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:110` ; source de référence : `sql/modules/formules.html:110`.
- Contexte : Cheat sheet : INSERT d’un client. Dialecte : SQL commun.
- Qualification : L’INSERT réussit sur les schémas adaptés ; les contraintes effectives dépendent de la table.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-043 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:114` ; source de référence : `sql/modules/formules.html:114`.
- Contexte : Cheat sheet : UPDATE du nom. Dialecte : SQL commun.
- Qualification : Instruction complète vérifiée avec la table requise.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-044 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:118` ; source de référence : `sql/modules/formules.html:118`.
- Contexte : Cheat sheet : DELETE avec WHERE. Dialecte : SQL commun.
- Qualification : Instruction complète vérifiée sur les schémas adaptés.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-045 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:122` ; source de référence : `sql/modules/formules.html:122`.
- Contexte : Cheat sheet : INSERT multi-lignes. Dialecte : SQL commun compatible T-SQL, PostgreSQL et SQLite récents.
- Qualification : Les trois tuples VALUES sont valides dans les deux moteurs vérifiés.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-046 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:139` ; source de référence : `sql/modules/formules.html:139`.
- Contexte : Cheat sheet : SELECT de toutes les colonnes. Dialecte : SQL commun.
- Qualification : Requête complète ; l’échec B1 vient de l’absence de la table.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-047 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:151` ; source de référence : `sql/modules/formules.html:151`.
- Contexte : Cheat sheet : jointure clients-commandes. Dialecte : SQL commun.
- Qualification : La jointure est complète et passe les deux moteurs avec les tables attendues.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-048 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:159` ; source de référence : `sql/modules/formules.html:159`.
- Contexte : Cheat sheet : CASE selon l’âge. Dialecte : SQL commun.
- Qualification : La requête est correcte lorsque la colonne age existe ; cette dépendance ne rend pas le SELECT invalide.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-049 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:163` ; source de référence : `sql/modules/formules.html:163`.
- Contexte : Cheat sheet : valeurs distinctes de ville. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée avec la colonne requise.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-050 — Défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:167` ; source de référence : `sql/modules/formules.html:167`.
- Contexte : Cheat sheet SQL Server : deux exemples TOP / OFFSET dans un même bloc. Dialecte : T-SQL SQL Server.
- Qualification : Le premier SELECT TOP est complet, mais le point-virgule le termine et le second ORDER BY OFFSET/FETCH n’a pas de SELECT. ScriptDOM rejette le bloc ; le fragment est également rejeté par SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite_fragment_order_by":{"statut":"échec","type":"syntaxe"},"postgresql_fragment_order_by":{"statut":"échec","type":"syntaxe"},"postgresql_select_reconstitué":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Défaut constaté corrigé localement ; voir les preuves et limites ci-dessous.

### B2-051 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:184` ; source de référence : `sql/modules/formules.html:184`.
- Contexte : Cheat sheet : nombre de clients par ville. Dialecte : SQL commun.
- Qualification : GROUP BY est complet lorsque la colonne existe.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-052 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:188` ; source de référence : `sql/modules/formules.html:188`.
- Contexte : Cheat sheet : filtrage des groupes par HAVING. Dialecte : SQL commun.
- Qualification : Le filtrage de COUNT(*) est complet et a été vérifié sur les schémas adaptés.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-053 — Défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:264` ; source de référence : `sql/modules/formules.html:264`.
- Contexte : Cheat sheet SQL Server : définition puis exemple d’appel de procédure. Dialecte : T-SQL SQL Server, lots SSMS.
- Qualification : Il manque un séparateur entre END et EXEC. L’AST ScriptDOM place ExecuteStatement dans le corps de GetUser au lieu d’en faire l’appel externe illustré ; cela crée un auto-appel potentiel lors de son exécution. Exécution SQL Server non vérifiée.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Défaut constaté corrigé localement ; voir les preuves et limites ci-dessous.

### B2-054 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:268` ; source de référence : `sql/modules/formules.html:268`.
- Contexte : Cheat sheet : procédure avec paramètre OUTPUT. Dialecte : T-SQL SQL Server.
- Qualification : Le corps est syntaxiquement accepté par ScriptDOM ; la procédure et son paramètre ne sont pas exécutés sur SQL Server.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-055 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:272` ; source de référence : `sql/modules/formules.html:272`.
- Contexte : Cheat sheet : trigger de journalisation après insertion. Dialecte : T-SQL SQL Server : table virtuelle inserted.
- Qualification : La syntaxe est acceptée par ScriptDOM ; les tables et effets SQL Server restent non vérifiés.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-056 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:276` ; source de référence : `sql/modules/formules.html:276`.
- Contexte : Cheat sheet : suppression logique par trigger. Dialecte : T-SQL SQL Server : INSTEAD OF DELETE et table virtuelle deleted.
- Qualification : La syntaxe est acceptée ; le comportement du trigger sur SQL Server est non vérifié.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-057 — Défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:284` ; source de référence : `sql/modules/formules.html:284`.
- Contexte : Cheat sheet SQL Server : CREATE VIEW suivi d’un SELECT. Dialecte : T-SQL SQL Server, règle de lots ; SQLite et PostgreSQL acceptent le même bloc dans les schémas adaptés.
- Qualification : ScriptDOM rejette le SELECT qui suit CREATE VIEW dans le même lot. Les succès SQLite/PostgreSQL montrent que ce défaut dépend bien du dialecte.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Défaut constaté corrigé localement ; voir les preuves et limites ci-dessous.

### B2-058 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:297` ; source de référence : `sql/modules/formules.html:297`.
- Contexte : Cheat sheet : sous-requête IN. Dialecte : SQL commun.
- Qualification : La sous-requête est complète et passe SQLite/PostgreSQL avec le schéma attendu.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-059 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:301` ; source de référence : `sql/modules/formules.html:301`.
- Contexte : Cheat sheet : CTE des dépenses par client. Dialecte : SQL commun avec CTE.
- Qualification : La CTE et son SELECT final passent les deux moteurs testés.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-060 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:305` ; source de référence : `sql/modules/formules.html:305`.
- Contexte : Cheat sheet : fonctions de fenêtrage. Dialecte : SQL de fenêtrage pris en charge par PostgreSQL, T-SQL et SQLite récents.
- Qualification : La requête complète passe SQLite 3.53.4 et PostgreSQL 18.6 ; SQL Server non vérifié.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-061 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:309` ; source de référence : `sql/modules/formules.html:309`.
- Contexte : Cheat sheet : deux index. Dialecte : SQL commun.
- Qualification : Les deux instructions réussissent sur les schémas adaptés ; ville doit être présente.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-062 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/formules.html:313` ; source de référence : `sql/modules/formules.html:313`.
- Contexte : Cheat sheet : EXISTS corrélé. Dialecte : SQL commun.
- Qualification : La requête passe SQLite et PostgreSQL avec les deux tables.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-063 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/modules/mod01-ddl.html:127` ; source de référence : `sql/modules/mod01-ddl.html:127`.
- Contexte : Nom CREATE TABLE isolé au début du module DDL. Dialecte : Non applicable : élément de prose.
- Qualification : Le nom de commande n’est pas une instruction à exécuter isolément.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-064 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod03-dml.html:266` ; source de référence : `sql/modules/mod03-dml.html:266`.
- Contexte : Module DML : corrigé d’insertion utilisateur. Dialecte : SQL commun.
- Qualification : L’INSERT est complet et passe les moteurs sur la table adaptée.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-065 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod03-dml.html:282` ; source de référence : `sql/modules/mod03-dml.html:282`.
- Contexte : Module DML : corrigé de modification d’adresse. Dialecte : SQL commun.
- Qualification : L’UPDATE passe les deux moteurs ; le nombre de lignes modifiées dépend des données.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-066 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod03-dml.html:298` ; source de référence : `sql/modules/mod03-dml.html:298`.
- Contexte : Module DML : corrigé de suppression ciblée par date. Dialecte : SQL commun.
- Qualification : La suppression est complète et passe les deux moteurs avec le schéma attendu.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-067 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod03-dml.html:314` ; source de référence : `sql/modules/mod03-dml.html:314`.
- Contexte : Module DML : corrigé d’ajustement de prix. Dialecte : SQL commun.
- Qualification : L’UPDATE passe SQLite et PostgreSQL ; le résultat chiffré dépend des données.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-068 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod04-select.html:251` ; source de référence : `sql/modules/mod04-select.html:251`.
- Contexte : Module SELECT : sélection de colonnes produits. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée sur les deux moteurs.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-069 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod04-select.html:266` ; source de référence : `sql/modules/mod04-select.html:266`.
- Contexte : Module SELECT : tri des commandes. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée sur les deux moteurs.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-070 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod04-select.html:281` ; source de référence : `sql/modules/mod04-select.html:281`.
- Contexte : Module SELECT : pays distincts. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée sur les deux moteurs.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-071 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod04-select.html:296` ; source de référence : `sql/modules/mod04-select.html:296`.
- Contexte : Module SELECT : trois produits les plus chers. Dialecte : T-SQL SQL Server : TOP ; LIMIT est une variante indiquée pour d’autres SGBD.
- Qualification : SELECT TOP 3 est complet en T-SQL et accepté par ScriptDOM. SQL Server non vérifié ; le refus SQLite ne démontre pas un défaut T-SQL.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-072 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod04-select.html:312` ; source de référence : `sql/modules/mod04-select.html:312`.
- Contexte : Module SELECT : tri par pays puis salaire. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-073 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod05-calculations.html:100` ; source de référence : `sql/modules/mod05-calculations.html:100`.
- Contexte : Module agrégats : somme par catégorie. Dialecte : SQL commun.
- Qualification : La requête GROUP BY passe sur les deux moteurs avec les colonnes prévues.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-074 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod05-calculations.html:241` ; source de référence : `sql/modules/mod05-calculations.html:241`.
- Contexte : Module agrégats : somme globale des prix. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-075 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod05-calculations.html:256` ; source de référence : `sql/modules/mod05-calculations.html:256`.
- Contexte : Module agrégats : nombre d’utilisateurs par pays. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-076 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod05-calculations.html:271` ; source de référence : `sql/modules/mod05-calculations.html:271`.
- Contexte : Module agrégats : salaire moyen par département. Dialecte : SQL commun.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-077 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod05-calculations.html:286` ; source de référence : `sql/modules/mod05-calculations.html:286`.
- Contexte : Module agrégats : catégories dépassant un seuil. Dialecte : SQL commun.
- Qualification : GROUP BY et HAVING sont complets ; exécution vérifiée sur les deux moteurs.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-078 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod05-calculations.html:301` ; source de référence : `sql/modules/mod05-calculations.html:301`.
- Contexte : Module agrégats : minimum et maximum par catégorie. Dialecte : SQL commun.
- Qualification : MIN et MAX sont correctement regroupés et passent les deux moteurs.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-079 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod06-strings.html:166` ; source de référence : `sql/modules/mod06-strings.html:166`.
- Contexte : Module chaînes : passage des pays en majuscules. Dialecte : SQL commun avec UPPER.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-080 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod06-strings.html:182` ; source de référence : `sql/modules/mod06-strings.html:182`.
- Contexte : Module chaînes : première lettre du nom. Dialecte : PostgreSQL ou SQL Server : LEFT ; SQLite ne fournit pas cette fonction ici.
- Qualification : L’original passe PostgreSQL et est accepté par ScriptDOM ; SQLite manque la fonction. SQL Server non vérifié.
- Preuve ou limite : {"sqlite":{"statut":"échec","type":"fonction ou signature"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-081 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod06-strings.html:198` ; source de référence : `sql/modules/mod06-strings.html:198`.
- Contexte : Module chaînes : longueur supérieure à dix. Dialecte : PostgreSQL, SQLite ou MySQL : LENGTH ; SQL Server utilise généralement LEN.
- Qualification : L’original passe PostgreSQL et SQLite. La fonction LENGTH n’est pas interchangeable avec LEN sans préciser le moteur.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-082 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod06-strings.html:214` ; source de référence : `sql/modules/mod06-strings.html:214`.
- Contexte : Module chaînes : recherche de motif. Dialecte : SQL commun avec LIKE.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-083 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod06-strings.html:230` ; source de référence : `sql/modules/mod06-strings.html:230`.
- Contexte : Module chaînes : remplacement de caractères. Dialecte : SQL commun avec REPLACE.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-084 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07-dates-nulls.html:95` ; source de référence : `sql/modules/mod07-dates-nulls.html:95`.
- Contexte : Module dates : exemple de date et heure courantes. Dialecte : T-SQL SQL Server : GETDATE.
- Qualification : La syntaxe est acceptée par ScriptDOM ; la fonction système n’est pas disponible dans le SQLite du banc. SQL Server non vérifié.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-085 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07-dates-nulls.html:100` ; source de référence : `sql/modules/mod07-dates-nulls.html:100`.
- Contexte : Module dates : exemple d’horodatage système. Dialecte : T-SQL SQL Server : SYSDATETIME.
- Qualification : La syntaxe est acceptée par ScriptDOM ; SQLite n’est pas le moteur adapté. SQL Server non vérifié.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-086 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07-dates-nulls.html:160` ; source de référence : `sql/modules/mod07-dates-nulls.html:160`.
- Contexte : Module NULL : remplacement d’une valeur manquante. Dialecte : T-SQL SQL Server : ISNULL(expression, remplacement).
- Qualification : Le module indique explicitement la spécificité SQL Server ; ScriptDOM accepte l’instruction. SQL Server non vérifié.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-087 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07-dates-nulls.html:165` ; source de référence : `sql/modules/mod07-dates-nulls.html:165`.
- Contexte : Module NULL : premier numéro disponible. Dialecte : SQL commun avec COALESCE.
- Qualification : La requête passe SQLite et PostgreSQL avec la table adaptée.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-088 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07-dates-nulls.html:170` ; source de référence : `sql/modules/mod07-dates-nulls.html:170`.
- Contexte : Module NULL : division protégée par NULLIF. Dialecte : SQL commun avec NULLIF.
- Qualification : La requête passe les deux moteurs ; une quantité nulle conduit à un diviseur NULL plutôt qu’à zéro.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-089 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07-dates-nulls.html:175` ; source de référence : `sql/modules/mod07-dates-nulls.html:175`.
- Contexte : Module NULL : filtrage de valeurs présentes. Dialecte : SQL commun avec IS NOT NULL.
- Qualification : Requête complète vérifiée sur SQLite et PostgreSQL.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-090 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:121` ; source de référence : `sql/modules/mod07a-joins.html:121`.
- Contexte : Module jointures : INNER JOIN. Dialecte : SQL commun.
- Qualification : La jointure est complète et passe les schémas adaptés ; les lignes affichées dans le cours dépendent de son propre jeu de données.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-091 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:179` ; source de référence : `sql/modules/mod07a-joins.html:179`.
- Contexte : Module jointures : LEFT JOIN. Dialecte : SQL commun.
- Qualification : La jointure conserve les clients sans correspondance et passe les deux moteurs.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-092 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:206` ; source de référence : `sql/modules/mod07a-joins.html:206`.
- Contexte : Module jointures : clients sans commande. Dialecte : SQL commun.
- Qualification : Le filtre sur la clé de commande identifie les lignes sans correspondance sous cette hypothèse.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-093 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:225` ; source de référence : `sql/modules/mod07a-joins.html:225`.
- Contexte : Module jointures : RIGHT JOIN. Dialecte : T-SQL, PostgreSQL et SQLite récents ; pas toutes les versions SQLite.
- Qualification : La requête originale passe PostgreSQL 18.6 et SQLite 3.53.4 ; aucune conclusion n’est tirée pour les anciennes versions SQLite.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-094 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:281` ; source de référence : `sql/modules/mod07a-joins.html:281`.
- Contexte : Module jointures : FULL OUTER JOIN. Dialecte : T-SQL, PostgreSQL et SQLite récents ; FULL OUTER JOIN n’est pas universel selon les moteurs.
- Qualification : La requête originale passe PostgreSQL 18.6 et SQLite 3.53.4 avec les tables attendues.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-095 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:322` ; source de référence : `sql/modules/mod07a-joins.html:322`.
- Contexte : Module jointures : produit cartésien. Dialecte : SQL commun avec CROSS JOIN.
- Qualification : La requête est complète ; le volume obtenu dépend du nombre de lignes de chaque table.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-096 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:374` ; source de référence : `sql/modules/mod07a-joins.html:374`.
- Contexte : Module jointures : auto-jointure employés/managers. Dialecte : SQL commun.
- Qualification : La jointure LEFT avec deux alias passe les deux moteurs et garde un employé sans manager.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-097 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod07a-joins.html:415` ; source de référence : `sql/modules/mod07a-joins.html:415`.
- Contexte : Module jointures : détail client/commande/produit. Dialecte : SQL commun.
- Qualification : La requête complète passe les deux moteurs avec les quatre tables ; les résultats précis du jeu pédagogique ne sont pas comparés.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-098 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod08-logic.html:99` ; source de référence : `sql/modules/mod08-logic.html:99`.
- Contexte : Module logique : CASE recherché. Dialecte : T-SQL SQL Server pour cette page ; portabilité SQLite/PostgreSQL affectée par les espaces insécables.
- Qualification : ScriptDOM T-SQL accepte l’original et sa variante normalisée ; SQLite et PostgreSQL rejettent l’original mais acceptent la variante avec espaces ordinaires. L’exécution SQL Server est non vérifiée : ne pas classer cela comme un défaut SQL Server établi.
- Preuve ou limite : {"sqlite":{"statut":"échec","type":"syntaxe"},"postgresql":{"statut":"échec","type":"syntaxe"},"sqlite_espaces_normalisés":{"statut":"succès"},"postgresql_espaces_normalisés":{"statut":"succès"},"nombre_espaces_insécables":16} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-099 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod08-logic.html:103` ; source de référence : `sql/modules/mod08-logic.html:103`.
- Contexte : Module logique : CASE simple sur rôle. Dialecte : T-SQL SQL Server pour cette page ; portabilité SQLite/PostgreSQL affectée par les espaces insécables.
- Qualification : ScriptDOM T-SQL accepte l’original et sa variante normalisée ; SQLite et PostgreSQL rejettent l’original mais acceptent la variante normalisée. SQL Server non vérifié.
- Preuve ou limite : {"sqlite":{"statut":"échec","type":"syntaxe"},"postgresql":{"statut":"échec","type":"syntaxe"},"sqlite_espaces_normalisés":{"statut":"succès"},"postgresql_espaces_normalisés":{"statut":"succès"},"nombre_espaces_insécables":16} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-100 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/modules/mod08-logic.html:233` ; source de référence : `sql/modules/mod08-logic.html:233`.
- Contexte : Nom et forme abrégée d’une CTE dans une explication. Dialecte : Gabarit WITH ... AS, non spécifique à un moteur.
- Qualification : Les points de suspension signalent une notation, pas un programme SQL autonome.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-101 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod09-loops.html:151` ; source de référence : `sql/modules/mod09-loops.html:151`.
- Contexte : Module boucles : exemple ensembliste à la place d’un curseur. Dialecte : SQL commun.
- Qualification : L’UPDATE complet passe les schémas adaptés ; l’absence de point-virgule final n’en fait pas une erreur.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-102 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/mod11-procedures.html:78` ; source de référence : `sql/modules/mod11-procedures.html:78`.
- Contexte : Module procédures : paramètre OUTPUT. Dialecte : T-SQL SQL Server ; indentation avec espaces insécables.
- Qualification : ScriptDOM accepte l’original contenant six U+00A0 ainsi que la version normalisée ; SQL Server non vérifié. Le rejet du SQLite B1 tient d’abord au dialecte des procédures.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B2-103 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/modules/mod11-procedures.html:98` ; source de référence : `sql/modules/mod11-procedures.html:98`.
- Contexte : Nom ALTER PROCEDURE dans une liste de commandes. Dialecte : T-SQL SQL Server ; nom de commande seul.
- Qualification : Il s’agit d’un libellé pédagogique, pas d’un ALTER complet manquant.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-104 — Fragment ou gabarit volontaire
- Emplacement du relevé initial : `sql/modules/mod11-procedures.html:102` ; source de référence : `sql/modules/mod11-procedures.html:102`.
- Contexte : Nom DROP PROCEDURE dans une liste de commandes. Dialecte : T-SQL SQL Server ; nom de commande seul.
- Qualification : Il s’agit d’un libellé pédagogique, pas d’un DROP complet manquant.
- Preuve ou limite : {"statut":"non vérifié sur moteur adapté ; contexte ou analyse syntaxique uniquement"} SQL Server : non vérifiée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B2-105 — Exemple complet sans défaut établi
- Emplacement du relevé initial : `sql/modules/rappels.html:232` ; source de référence : `sql/modules/rappels.html:232`.
- Contexte : Module rappels : exemple de SQL déclaratif. Dialecte : SQL commun.
- Qualification : La sélection filtrée et triée passe SQLite et PostgreSQL avec la table attendue.
- Preuve ou limite : {"sqlite":{"statut":"succès"},"postgresql":{"statut":"succès"}} SQL Server : non vérifiée.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

## SQL B3 — 34 occurrences

### B3-01 — Phrase en français
- Emplacement du relevé initial : `b3-sql/chapitres/cartes.html:85` ; source de référence : `server/content/b3-sql/chapitre3.js:244`.
- Contexte : Réponse d’une carte comparant EXPLAIN et EXPLAIN ANALYZE. Dialecte : Prose sur PostgreSQL.
- Qualification : Le texte est une explication commençant par un mot-clé, pas une commande ; SQLite échoue au mot français « affiche ».
- Preuve : Lecture du HTML et de la source Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-02 — Instruction DDL complète
- Emplacement du relevé initial : `b3-sql/chapitres/cartes.html:106` ; source de référence : `server/content/b3-sql/chapitre5.js:278`.
- Contexte : Réponse de carte activant RLS sur une table illustrative. Dialecte : PostgreSQL.
- Qualification : ALTER TABLE ... ENABLE ROW LEVEL SECURITY réussit sur une table contrats créée pour la sonde ; ENABLE RLS n’est pas une syntaxe SQLite.
- Preuve : PostgreSQL 18.6, table fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B3-03 — Patron de requête
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre1.html:144` ; source de référence : `server/content/b3-sql/chapitre1.js:91`.
- Contexte : Liste explicative des verrous partagés. Dialecte : Notation PostgreSQL.
- Qualification : Les points de suspension remplacent la projection et la source ; une requête complète avec FOR SHARE réussit en PostgreSQL.
- Preuve : Lecture et expansion illustrative sur PostgreSQL 18.6 Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-04 — Patron de requête
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre1.html:145` ; source de référence : `server/content/b3-sql/chapitre1.js:92`.
- Contexte : Liste explicative des verrous exclusifs. Dialecte : Notation PostgreSQL.
- Qualification : Les points de suspension sont un remplacement intentionnel ; la forme complétée avec FOR UPDATE réussit sur la table fictive.
- Preuve : Lecture et expansion illustrative sur PostgreSQL 18.6 Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-05 — Mauvaise option de QCM
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre1.html:351` ; source de référence : `server/content/b3-sql/chapitre1.js:219`.
- Contexte : Question sur le verrou pessimiste ; la réponse correcte est FOR UPDATE. Dialecte : Pseudo-SQL de QCM.
- Qualification : L’option n’est pas marquée correcte dans le HTML ; la source indique correct: 1 pour l’option FOR UPDATE.
- Preuve : Lecture du QCM et de son corrigé Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-06 — Bonne option de QCM sous forme abrégée
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre1.html:352` ; source de référence : `server/content/b3-sql/chapitre1.js:220`.
- Contexte : Réponse attendue à la question sur le verrou pessimiste. Dialecte : Notation PostgreSQL.
- Qualification : L’option est marquée correcte et désigne la clause FOR UPDATE ; « ... » n’est pas une expression SQL exécutable.
- Preuve : Lecture du QCM ; expansion sur PostgreSQL 18.6 Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-07 — Mauvaise option de QCM
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre1.html:353` ; source de référence : `server/content/b3-sql/chapitre1.js:221`.
- Contexte : Même question sur le verrou pessimiste. Dialecte : Pseudo-SQL de QCM.
- Qualification : L’option n’est pas marquée correcte ; PostgreSQL emploie NOWAIT dans une clause de verrouillage, non cette formulation.
- Preuve : Lecture du QCM et de la syntaxe PostgreSQL Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-08 — Mauvaise option de QCM
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre1.html:354` ; source de référence : `server/content/b3-sql/chapitre1.js:222`.
- Contexte : Même question sur le verrou pessimiste. Dialecte : Pseudo-SQL de QCM.
- Qualification : L’option n’est pas marquée correcte ; la bonne réponse est la forme abrégée FOR UPDATE.
- Preuve : Lecture du QCM et de son corrigé Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-09 — DDL PostgreSQL valide, affirmation voisine erronée
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre2.html:121` ; source de référence : `server/content/b3-sql/chapitre2.js:66`, `server/content/b3-sql/chapitre2.js:67`.
- Contexte : Exemple d’index couvrant avec INCLUDE. Dialecte : PostgreSQL.
- Qualification : CREATE INDEX réussit. Sur le jeu fictif, le planificateur choisit Seq Scan ; en forçant un Index Only Scan, celui-ci affiche Heap Fetches: 1. La promesse de plan systématique, de zéro accès à la table et d’un gain par dix est donc fausse.
- Preuve : PostgreSQL 18.6, schéma et données fictifs Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté.
- État : Défaut de contexte corrigé localement ; limites des sondes conservées.

### B3-10 — Mauvaise option de QCM
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre2.html:335` ; source de référence : `server/content/b3-sql/chapitre2.js:199`.
- Contexte : Question sur une reconstruction concurrente d’index en production. Dialecte : Pseudo-SQL de QCM / PostgreSQL.
- Qualification : Cette option est volontairement fausse ; le QCM indique comme réponse REINDEX TABLE CONCURRENTLY commandes.
- Preuve : Lecture du QCM et de son corrigé Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-11 — Patron avec paramètre
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre3.html:89` ; source de référence : `server/content/b3-sql/chapitre3.js:33`.
- Contexte : Liste des options EXPLAIN. Dialecte : Notation PostgreSQL.
- Qualification : « <sql> » désigne une requête à remplacer ; ce texte n’est pas une commande littérale.
- Preuve : Lecture de la source et de la documentation PostgreSQL 16 Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-12 — Préfixe de commande
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre3.html:90` ; source de référence : `server/content/b3-sql/chapitre3.js:34`.
- Contexte : Présentation de l’option ANALYZE. Dialecte : PostgreSQL, notation de commande.
- Qualification : L’option est montrée seule pour expliquer son effet ; une instruction à analyser doit la suivre.
- Preuve : Lecture de la source et de la documentation PostgreSQL 16 Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-13 — Préfixe de commande
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre3.html:91` ; source de référence : `server/content/b3-sql/chapitre3.js:35`.
- Contexte : Présentation conjointe d’ANALYZE et BUFFERS. Dialecte : PostgreSQL, notation de commande.
- Qualification : Le fragment nomme des options ; sans requête après EXPLAIN il est nécessairement incomplet.
- Preuve : Lecture de la source et de la documentation PostgreSQL 16 Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-14 — Option de QCM non retenue
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre3.html:293` ; source de référence : `server/content/b3-sql/chapitre3.js:151`.
- Contexte : Question demandant l’option relative aux blocs de mémoire tampon. Dialecte : PostgreSQL, notation d’option.
- Qualification : VERBOSE est une option PostgreSQL, mais ne répond pas à la question sur BUFFERS ; l’absence de requête est normale dans la liste.
- Preuve : Lecture du QCM et de la documentation PostgreSQL 16 Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-15 — Bonne option de QCM, préfixe incomplet
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre3.html:294` ; source de référence : `server/content/b3-sql/chapitre3.js:152`.
- Contexte : Option correcte pour les statistiques de buffers. Dialecte : PostgreSQL, notation d’option.
- Qualification : Le QCM marque BUFFERS comme bonne réponse et son explication précise son usage avec ANALYZE ; une requête manque car seule l’option est interrogée.
- Preuve : Lecture du QCM et de la documentation PostgreSQL 16 Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-16 — Option de QCM non retenue
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre3.html:295` ; source de référence : `server/content/b3-sql/chapitre3.js:153`.
- Contexte : Même question sur les blocs de mémoire tampon. Dialecte : PostgreSQL, notation d’option.
- Qualification : TIMING concerne le chronométrage et non le choix de BUFFERS ; la commande est ici abrégée et non autonome.
- Preuve : Lecture du QCM et de la documentation PostgreSQL 16 Limite : L’option est examinée dans son QCM ; elle ne représente pas nécessairement une instruction autonome.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-17 — Option de QCM non retenue
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre3.html:296` ; source de référence : `server/content/b3-sql/chapitre3.js:154`.
- Contexte : Même question sur les blocs de mémoire tampon. Dialecte : PostgreSQL, version dépendante.
- Qualification : MEMORY n’apparaît pas dans la syntaxe EXPLAIN documentée pour PostgreSQL 16 ; PostgreSQL 18 l’accepte pour la mémoire de planification, ce qui ne répond pas à la question BUFFERS.
- Preuve : Documentation PostgreSQL 16 et sonde PostgreSQL 18.6 Limite : PostgreSQL 16 n’est pas installé localement ; sa syntaxe est évaluée sur sa documentation, pas par exécution.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-18 — SELECT complet avec fonction de fenêtre
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre4.html:88` ; source de référence : `server/content/b3-sql/chapitre4.js:32`.
- Contexte : Exemple de moyenne cumulative par département. Dialecte : SQL à fenêtres, exécuté sous PostgreSQL.
- Qualification : L’échec brut indique simplement que employes n’existe pas dans le schéma B1. Sur une table fictive adéquate, les moyennes obtenues sont 100, 150 et 300.
- Preuve : PostgreSQL 18.6, employes fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B3-19 — SELECT complet avec LAG, LEAD et NTILE
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre4.html:135` ; source de référence : `server/content/b3-sql/chapitre4.js:78`.
- Contexte : Exemple de navigation entre mesures. Dialecte : SQL à fenêtres, exécuté sous PostgreSQL.
- Qualification : Le banc B1 ne contient pas metriques. La requête fonctionne sur une table fictive de dates et de valeurs numériques.
- Preuve : PostgreSQL 18.6, metriques fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B3-20 — Mot-clé mentionné isolément
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre4.html:150` ; source de référence : `server/content/b3-sql/chapitre4.js:95`.
- Contexte : Phrase qui introduit les expressions récursives. Dialecte : Vocabulaire SQL partagé.
- Qualification : WITH RECURSIVE est cité comme nom de mécanisme et ne constitue pas à lui seul une requête.
- Preuve : Lecture de la source Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-21 — CTE récursive complète avec tableau de chemin
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre4.html:154` ; source de référence : `server/content/b3-sql/chapitre4.js:99`.
- Contexte : Exemple de hiérarchie et de garde anti-cycle. Dialecte : PostgreSQL : ARRAY, ANY, concaténation de tableaux.
- Qualification : La requête exacte produit trois lignes hiérarchiques sur employes fictive. Les tableaux PostgreSQL ne sont pas pris en charge par le banc SQLite B1.
- Preuve : PostgreSQL 18.6, employes fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté. La sonde démontre le parcours simple, pas toutes les formes de graphe ou de cycle.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B3-22 — Patron inclus dans un énoncé d’atelier
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre4.html:293` ; source de référence : `server/exercises/b3-sql.js:445`.
- Contexte : L’élève doit écrire sa propre CTE pour la table organigramme. Dialecte : Atelier SQLite/WebAssembly ; notation SQL.
- Qualification : Les points de suspension signalent un travail à compléter. Le routeur SQL du navigateur choisit SQLite, même si le cours théorique parle de PostgreSQL.
- Preuve : Lecture de l’exercice et du routeur local Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-23 — Fonction PL/pgSQL valide mais logique métier défectueuse
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre5.html:88` ; source de référence : `server/content/b3-sql/chapitre5.js:32`.
- Contexte : Illustration d’un virement entre comptes. Dialecte : PostgreSQL / PL/pgSQL.
- Qualification : La fonction exacte se crée. Avec comptes fictive : source absente crédite 30 sans débit ; destination absente débite 30 sans crédit ; montant -30 est accepté et inverse les mouvements.
- Preuve : PostgreSQL 18.6, comptes fictive à clé primaire et solde non NULL Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté. Les courses concurrentes et les contraintes du schéma réel ne sont pas vérifiées.
- État : Défaut de contexte corrigé localement ; limites des sondes conservées.

### B3-24 — Fonction de trigger valide, garantie d’immuabilité non établie
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre5.html:136` ; source de référence : `server/content/b3-sql/chapitre5.js:82`, `server/content/b3-sql/chapitre5.js:81`.
- Contexte : Exemple présenté comme un journal « infalsifiable ». Dialecte : PostgreSQL / PL/pgSQL.
- Qualification : La fonction exacte se crée et journalise un UPDATE après installation d’un trigger fictif. Le propriétaire de la table de journal peut ensuite supprimer la ligne : le code présenté ne rend pas le journal infalsifiable.
- Preuve : PostgreSQL 18.6, trigger et audit_log fictifs Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté. Ce constat ne démontre rien sur d’éventuelles protections externes absentes de l’exemple.
- État : Défaut de contexte corrigé localement ; limites des sondes conservées.

### B3-25 — Patron DDL valide ; explication de sécurité erronée
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre5.html:189` ; source de référence : `server/content/b3-sql/chapitre5.js:133`, `server/content/b3-sql/chapitre5.js:231`.
- Contexte : Encadré et corrigé affirmant que FORCE soumet aussi le superutilisateur à RLS. Dialecte : PostgreSQL.
- Qualification : Avec une politique refusant tout et FORCE activé, la sonde renvoie 0 ligne au propriétaire ordinaire, mais 2 au superutilisateur et 2 au rôle BYPASSRLS. FORCE ne limite donc pas ces deux catégories privilégiées.
- Preuve : PostgreSQL 18.6, rôles et table fictifs Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté.
- État : Défaut de contexte corrigé localement ; limites des sondes conservées.

### B3-26 — Script d’entrée d’atelier, dépendant de la solution de l’élève
- Emplacement du relevé initial : `b3-sql/chapitres/chapitre5.html:265` ; source de référence : `server/exercises/b3-sql.js:531`.
- Contexte : Exemple public de sql3-c5-e2 ; la vue demandée est créée dans l’éditeur. Dialecte : SQLite/WebAssembly dans le navigateur.
- Qualification : Le moteur local découpe stdin à -- VERIFY:, exécute la préparation, puis le SQL de l’élève et enfin la vérification. Exécuter stdin seul échoue faute de vue ; créer une vue illustrative entre les deux étapes renvoie la ligne attendue.
- Preuve : Lecture du moteur ; reproduction avec Python SQLite 3.53.4 dans le bac à sable Limite : La reproduction n’exécute ni sql.js ni le corrigé complet ; elle illustre une simulation et ne prouve pas une sécurité RLS réelle. La correction automatique affichée est suspendue.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B3-27 — Mot-clé cité dans un sujet
- Emplacement du relevé initial : `b3-sql/chapitres/examens.html:121` ; source de référence : `server/content/b3-sql/pages/examens-exercices.js:83`.
- Contexte : Question d’examen demandant une structure conceptuelle. Dialecte : Vocabulaire SQL partagé.
- Qualification : Le texte est un nom de mécanisme entre balises code, non une instruction complète.
- Preuve : Lecture du sujet et de sa source Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-28 — Membre ancre d’une CTE, SELECT complet sur table hypothétique
- Emplacement du relevé initial : `b3-sql/chapitres/examens.html:149` ; source de référence : `server/content/b3-sql/pages/examens-exercices.js:113`, `server/content/b3-sql/pages/examens-exercices.js:114`.
- Contexte : Premier des deux exemples conceptuels du corrigé d’examen. Dialecte : PostgreSQL : ARRAY et CTE récursive.
- Qualification : L’erreur SQLite vient de la table absente et du dialecte. Assemblés sans liste de colonnes, ancre et membre récursif échouent car cte.path n’a pas été nommé ; une liste explicite ou AS path rend l’assemblage valide.
- Preuve : PostgreSQL 18.6, assemblages et employes fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté. Le corrigé est conceptuel : une liste de colonnes externe peut lever l’ambiguïté ; ce n’est pas une incompatibilité intrinsèque des deux fragments.
- État : Fragment clarifié : alias path ajouté pour l’assemblage sans liste explicite.

### B3-29 — Membre récursif dépendant de sa CTE
- Emplacement du relevé initial : `b3-sql/chapitres/examens.html:149` ; source de référence : `server/content/b3-sql/pages/examens-exercices.js:114`, `server/content/b3-sql/pages/examens-exercices.js:113`.
- Contexte : Second fragment conceptuel du même corrigé. Dialecte : PostgreSQL : CTE récursive et tableau.
- Qualification : La relation cte doit être définie par l’enveloppe WITH RECURSIVE. Sans liste de colonnes, cte.path est absent de l’ancre ; une liste explicite ou l’alias path fait fonctionner l’assemblage.
- Preuve : PostgreSQL 18.6, assemblages et employes fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté. Le fragment n’est pas censé fonctionner seul ; une liste externe de colonnes rend l’exemple cohérent.
- État : Fragment clarifié : alias path ajouté pour l’assemblage sans liste explicite.

### B3-30 — Instruction DDL complète
- Emplacement du relevé initial : `b3-sql/chapitres/examens.html:154` ; source de référence : `server/content/b3-sql/pages/examens-exercices.js:119`.
- Contexte : Première étape du corrigé RLS. Dialecte : PostgreSQL.
- Qualification : ALTER TABLE ... ENABLE ROW LEVEL SECURITY réussit sur documents fictive ; l’erreur ENABLE provient du dialecte SQLite.
- Preuve : PostgreSQL 18.6, documents fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B3-31 — CREATE POLICY valide, exemple de contexte incohérent
- Emplacement du relevé initial : `b3-sql/chapitres/examens.html:154` ; source de référence : `server/content/b3-sql/pages/examens-exercices.js:120`, `server/content/b3-sql/pages/examens-exercices.js:121`.
- Contexte : Corrigé RLS comparant tenant_id à un paramètre converti en UUID. Dialecte : PostgreSQL.
- Qualification : CREATE POLICY réussit avec table et rôle fictifs. Après SET LOCAL à la valeur indiquée tenant_123, un SELECT en rôle applicatif échoue avec invalid input syntax for type uuid. Dans la sonde, ce même rôle peut changer le paramètre et voir un autre tenant.
- Preuve : PostgreSQL 18.6, documents UUID et rôle non superutilisateur fictifs Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté. Le changement de paramètre établit un risque si le rôle peut exécuter du SQL arbitraire ; il ne prouve pas une exploitation de l’application réelle.
- État : Défaut de contexte corrigé localement ; limites des sondes conservées.

### B3-32 — Préfixe de commande
- Emplacement du relevé initial : `b3-sql/chapitres/formules.html:74` ; source de référence : `server/content/b3-sql/pages/cartes-formules.js:65`.
- Contexte : Première cellule du tableau mémo, qui nomme les options. Dialecte : PostgreSQL, notation de commande.
- Qualification : La cellule indique la commande à laquelle ajouter une requête ; la cellule suivante contient un exemple complet séparé.
- Preuve : Lecture du tableau et de sa source Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.

### B3-33 — Commande EXPLAIN complète
- Emplacement du relevé initial : `b3-sql/chapitres/formules.html:74` ; source de référence : `server/content/b3-sql/pages/cartes-formules.js:65`.
- Contexte : Cellule d’exemple du tableau mémo. Dialecte : PostgreSQL.
- Qualification : La commande exacte renvoie un plan et des statistiques de buffers pour commandes fictive ; la syntaxe des options n’est pas celle de SQLite.
- Preuve : PostgreSQL 18.6, commandes fictive Limite : Schéma pédagogique fictif ; le schéma métier et les données réels ne sont pas fournis. PostgreSQL 16 n’a pas été exécuté.
- État : Aucun défaut établi par cet échec ; validité générale non démontrée.

### B3-34 — Préfixe mentionné en prose
- Emplacement du relevé initial : `b3-sql/index.html:171` ; source de référence : `server/content/b3-sql/pages/accueil.js:51`.
- Contexte : Présentation générale du cours. Dialecte : PostgreSQL, notation de commande.
- Qualification : Le préfixe est cité dans une phrase de présentation ; aucune requête complète n’y est annoncée.
- Preuve : Lecture de la page et de sa source Limite : Il ne s’agit pas d’une instruction autonome à exécuter ; aucune réussite SQL n’est revendiquée.
- État : Échec brut expliqué par la nature ou le contexte de cet extrait.
