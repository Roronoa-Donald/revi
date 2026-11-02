# Lot 1, partie 2 — rapport de contre-vérification

**Date :** 30 octobre 2026. **Périmètre :** dossier local ; aucun déploiement ni test de la version en ligne. Le lot 2 n'a pas été commencé.

## Lecture des preuves

**Établi sur les copies et cas documentés :** les sorties et états indiqués ci-dessous proviennent des commandes locales et des résultats conservés ; les témoins différentiels distinguent les variantes effectivement choisies.

**Hypothèses de travail :** les jeux synthétiques représentent des entrées admissibles selon les énoncés, et les oracles séparés en respectent l'interprétation documentée. Leur accord ne constitue pas une relecture indépendante par un expert de chaque résultat ni une preuve universelle.

**Non vérifié :** l'exécution sur SQL Server, PostgreSQL 16, les fournisseurs et le déploiement distants ; l'absence de tout comportement mémorisé ; l'indépendance de scénarios pour d'autres fautes ; et les corrigés explicitement déclarés non évalués.

## Bilan

| Demande | Résultat | Limite décisive |
|---|---|---|
| 139 échecs SQL B2/B3 | 139 occurrences qualifiées individuellement | Le banc SQL brut reste rouge et SQL Server n'a pas été exécuté. |
| Variantes et cas cachés | 126 exercices suspendus couverts par une paire de témoins croisés et des variantes rejetées | L'indépendance est relative aux fautes choisies ; la confidentialité totale et la correction générale ne sont pas prouvées. |
| Corrigés sur entrées nouvelles | 265 fiches au statut principal réussi ; 68 autres avec un seul témoin manuel conforme | 985 fiches restent non évaluées au critère principal ; cinq créations SQL partent d'une base vide déjà connue. |
| Node | `engines.node` fixe `22.x` ; Render déclare `22.23.4` et la documentation explique Render/Vercel | Aucune version effectivement déployée n'a été contrôlée. |
| Rapport | Les listes nominatives, scripts et résultats bruts ci-dessous sont conservés | Les preuves portent sur les copies locales et les cas indiqués, pas sur tous les comportements possibles. |

**Le lot 1, partie 2, n'est pas entièrement terminé :** la demande d'un rejeu probant sur des entrées inédites pour chaque corrigé n'est pas remplie. La notation des 126 exercices concernés reste suspendue.

## 1. Qualification SQL : faits établis et portée

Le détail pour chaque occurrence, son emplacement historique, le contexte, la qualification et la preuve ou sa limite sont dans `qualification-sql-lot1-partie2.md`. Les emplacements sont ceux du relevé avant correction ; les pages générées ont pu changer depuis.

| Catégorie | B2 | B3 | Total |
|---|---:|---:|---:|
| Défaut ou affirmation de contexte établi et corrigé | 4 | 5 | 9 |
| Anomalie métier étayée, correction locale, moteur cible non vérifié | 2 | 0 | 2 |
| Instruction complète : aucun défaut établi par cet échec | 82 | 7 | 89 |
| Fragment, patron, prose ou distracteur non exécutable seul | 17 | 22 | 39 |
| **Total** | **105** | **34** | **139** |

La troisième catégorie est nécessaire : une requête complète peut échouer avec le mauvais dialecte ou sans son schéma sans être pour autant un fragment ou un défaut confirmé. Cela ne démontre pas sa validité dans tous les contextes.

Parmi les corrections, la requête e-commerce conserve les catégories sans vente ; des exemples SQL Server séparent correctement des lots ou complètent une instruction ; les exemples PostgreSQL rectifient notamment les affirmations sur les index, les virements, l'audit et RLS. Deux anomalies B2 supplémentaires ont été analysées puis corrigées : restitution multi-lignes du stock et refus d'une quantité non positive. Les résultats de portages SQLite et l'analyse ScriptDOM ne remplacent pas une exécution SQL Server ; la concurrence réelle reste à vérifier.

Les sondes B3 utilisent PostgreSQL **18.6**, des rôles et des schémas fictifs ; elles ne démontrent pas le comportement de PostgreSQL 16 ni des données réelles. La reproduction est dans `resultats/postgresql-b3-lot1-partie2.txt`. Les preuves SQL Server et leurs limites sont dans `resultats/verification-correctifs-sql-b2.json` et `resultats/verification-metier-sql-b2.json`.

Le contrôle brut `resultats/audit-sql-brut-lot1-partie2.json` exécute 270 candidats de cours dans le simulateur B1 : **94 réussissent et 176 échouent** (37 B1, 105 B2, 34 B3), avec 38 fragments supplémentaires à qualifier ; les **249 exécutions d'exercices** qu'il mesure réussissent. Ce contrôle ne dispose pas des dialectes et schémas nécessaires aux 139 occurrences B2/B3 : les qualifications ne transforment donc pas son code de retour 1 en réussite.

## 2. Couverture des cas et des variantes

L'inventaire porte sur les **1 250 fiches**, dont 126 suspendues. Les listes sont des relevés d'état et de preuve, pas des affirmations qu'une variante ou un test inexistant a été recherché par tous les moyens.

| Vérification | Nombre de fiches sans preuve suffisante | Liste nominative |
|---|---:|---|
| Deux témoins cachés dont l'indépendance différentielle est démontrée | 1 124 | `resultats/lacunes-independance-lot1-partie2.tsv` |
| Au moins deux rejets récents attribués ou reconstitués | 780 | `resultats/lacunes-variantes-lot1-partie2.tsv` |
| Au moins deux stimuli non retrouvés dans la projection examinée | 830 | `resultats/cas-visibles-lot1-partie2.tsv` |

Si l'on exige uniquement des rejets récents **directement nominatifs**, 1 114 fiches manquent de deux preuves, au lieu de 780 en acceptant aussi les résultats agrégés reconstitués. Le détail des 1 250 fiches et des provenances figure dans `resultats/inventaire-couverture-lot1-partie2.tsv` et `resultats/perimetre-bancs-lot1-partie2.tsv`. Il y a au moins deux entrées textuellement distinctes dans chaque fiche, mais ce seul comptage ne prouve ni secret ni indépendance. Le recensement compare les empreintes au début et à la fin de son exécution ; les fichiers archivés du recensement lui-même ont été ajoutés après cet instantané.

### Les 126 exercices suspendus

- Pour chaque fiche, deux cas actifs distincts sont acceptés par le corrigé et distinguent, dans les deux sens, une paire de variantes incorrectes : chaque témoin rejette l'une et accepte l'autre. Les identifiants et provenances sont dans `resultats/temoins-croises-lot1-partie2.tsv`.
- La matrice de 90 fiches C#, Docker, Linux B3, GitHub B3 et SQL B1 exécute 489 cas actifs : **90 corrigés acceptés, 212 variantes rejetées par mauvaise sortie, 1 633 comparaisons effectuées**, aucune cellule non évaluée. Résultat : `resultats/matrice-suspendus-lot1-partie2.json`.
- Le banc séparé SQL B2/B3 couvre **36 corrigés et 72 variantes**, avec deux témoins exclusifs pour chacune des 36 paires : `resultats/variantes-sql-b2b3-partie2.json`. Les 181 variantes historiques déjà présentes avant cette partie ont été conservées dans `fixtures/variantes-suspendues-avant-partie2.json` ; elles ne sont pas toutes de nouveaux candidats distincts.
- Des oracles séparés contrôlent les 72 témoins croisés Linux/GitHub, les 36 nouveaux cas SQL B1 et huit nouveaux témoins SQL B2/B3 ; les autres attendus ne bénéficient pas tous de cette vérification indépendante. Les variantes et leur matrice ne prouvent pas à elles seules la justesse des attendus du catalogue.
- Aucun des 252 stimuli retenus pour les paires n'a été retrouvé dans la projection examinée. C'est une vérification locale et bornée des représentations connues, pas une garantie cryptographique ; en C#, certaines nouvelles séquences combinent des valeurs unitaires déjà publiques. En SQL, le stimulus comprend l'initialisation **et** les requêtes de vérification.

Les 830 grilles d'analyse exposent des données de cas notés dans leur squelette ; les réponses ne sont pas nécessairement exposées. La comparaison des pages retrouve 2 577 données source identiques sur 2 578 sélecteurs. Pour `fw3-c5-e3`, une séquence `</script>` est échappée en `<\/script>` dans la page : les trois données sont affichées, mais une diffère de la source. Cette anomalie est signalée, sans lancer un autre lot ; détail dans `resultats/grilles-pages-lot1-partie2.tsv`.

## 3. Rejeu des corrigés et limites de généralisation

L'ancienne heuristique `matchedAllHiddenInputs` ne sert plus de verdict. `npm run audit:generalisation` exécute les corrigés lorsque des jeux et attendus sont disponibles ; `npm run audit:integrite` combine ce résultat avec le contrôle structurel. Une non-évaluation ne devient jamais une réussite. Le rapport mis à jour, y compris les statuts et empreintes par fiche, est `resultats/generalisation-lot1-partie2-complement.json` ; la liste des 985 fiches non évaluées est `resultats/generalisation-non-evalues-lot1-partie2-complement.tsv`. La sortie brute agrégée figure dans `resultats/integrite-lot1-partie2-complement.json`.

| Niveau de preuve au rejeu local | Fiches |
|---|---:|
| Statut principal réussi sur deux jeux et attendus séparés | 265 |
| Un seul nouveau témoin littéral conforme à attendu manuel, statut principal non évalué | 68 |
| Aucune réussite sur ces deux niveaux dans le présent banc | 917 |
| **Total** | **1 250** |

Les 917 comprennent 830 corrigés de type `analyse`, qui sont des textes indexés par cas plutôt que des programmes paramétriques, et 87 autres fiches sans preuve suffisante dans ce banc. Certains domaines finis ont déjà leurs valeurs nominales dans les tests : inventer une entrée hors contrat ne démontrerait rien. Une extension fiable requiert des oracles et jeux admissibles, et, pour les grilles, un mode d'évaluation adapté. La liste des non-évalués ne signifie pas qu'aucun autre test historique ne les concerne.

Le complément ajoute **68 fiches et 136 cas exécutés** : 18 en algorithmique B3, 18 en Linux B2, 16 en Java B2 et 16 en API Flask B2. Les attendus manuels ont été comparés aux oracles paramétriques séparés, puis les corrigés ont été exécutés sur ces jeux ; les identifiants et empreintes sont dans `resultats/generalisation-nouveaux-lot1-partie2.tsv`. Les oracles limitent leur domaine d'entrée, notamment pour les graphes, les cas ambigus et les arrondis Java. `fl2-c4-e1` reste non évalué : ses huit scénarios nominaux définis sont déjà connus. Les 136 cas sont nouveaux dans le périmètre des comparaisons effectuées, sans preuve d'absence de toute équivalence sémantique.

Les 72 corrigés C#, Docker, Linux B3 et GitHub B3 ont chacun un nouveau témoin littéral, vérifié contre les exemples, tests du catalogue et anciens témoins ou générateurs reconnus. Les attendus sont manuels : ce rejeu ne constitue pas un oracle paramétrique, et les recombinaisons de données déjà connues ne sont pas nécessairement nouvelles sémantiquement. Quatre de ces fiches disposent en outre des deux jeux du banc principal ; les 68 autres restent non évaluées au critère principal. Une ambiguïté de priorité entre deux erreurs simultanées de `lx3-c5-e1` n'a pas été traitée comme un défaut certain ; le témoin final isole l'erreur exercée.

Les 54 corrigés SQL suspendus sont également rejoués. Pour `sq-c2-e1`, `sq-c2-e2` et `sql2-c1-e1` à `sql2-c1-e3`, l'état initial vide est déjà connu : ce sont les **sondes après création** qui sont nouvelles. Pour les autres, la nouveauté est établie dans le périmètre contrôlé par chaque banc, pas contre tous les tests possibles ou tous les encodages. L'ensemble des 126 statuts est listé dans `resultats/generalisation-suspendus-lot1-partie2.tsv`.

Le banc rejette aussi une solution artificielle mémorisant les anciennes entrées dans son autocontrôle. Cela prouve le rejet de ce mutant précis, non l'absence générale de mémorisation. Lors du travail sur `php2-c5-e3`, une première attente normalisait à tort `00042` en `42` ; le squelette demande l'affichage de la saisie, donc l'oracle a été corrigé sans modifier le corrigé ni inventer un défaut.

## 4. Runtime et protection des preuves

`package.json` et `package-lock.json` déclarent Node `22.x` ; `render.yaml` fixe `NODE_VERSION=22.23.4`. `README.md` explique les réglages de construction et les vérifications à effectuer sur Render et Vercel. Les rejeux documentés ici utilisent Node **22.23.4** local ; ils ne prouvent pas la version d'un service existant.

Le serveur local refuse les chemins des dossiers d'audit et de tests, y compris les variantes encodées testées. Le build miniature vérifie que les répertoires internes racine ne sont pas copiés ; `.vercelignore` déclare aussi `corrections/` et `verification/` exclus des sources Vercel. Aucun comportement d'hébergement distant n'a été observé. Les journaux et fixtures peuvent contenir des données d'évaluation et ne doivent pas être publiés.

Les candidats des bancs locaux sont exécutés sans réseau hôte, répertoire personnel, catalogue ni attendus montés. Les limites de processus et de ressources sont locales : sans cgroup ni profil seccomp dédié, ce dispositif ne démontre pas une isolation de production pour du code hostile. Les sous-bancs sont copiés séparément et leurs résultats ne forment pas un instantané atomique unique.

## 5. Vérifications rejouées

| Contrôle local | Résultat | Trace |
|---|---|---|
| Suite complète finale, Node 22.23.4, copie isolée | 8 154 réussis, 0 échec, 3 ignorés | `resultats/suite-lot1-partie2-complement-final.txt` |
| Politique d'exécution, dont les trois sondes ignorées dans la suite | 26/26 réussis séparément | `resultats/politique-check-lot1-partie2-complement.txt` |
| `courses:check` / `labs:check` | 832 pages / 1 250 exercices à jour | `resultats/courses-check-lot1-partie2-complement.txt`, `resultats/labs-check-lot1-partie2-complement.txt` |
| Build isolé | 1 446 fichiers, 936 HTML ; `dist/` local non touché | `resultats/build-check-lot1-partie2-complement.txt` |
| Protection et build miniature | 4/4 tests réussis | `resultats/protection-lot1-partie2.txt` |
| Tests ciblés des paquets, des témoins et du rapport SQL B1 | 14/14 réussis sous Node 22.23.4 | `resultats/tests-generalisation-lot1-partie2-complement.txt` |
| `audit:generalisation`, au sein du contrôle intégré | 265 réussis, 0 échoué, 985 non évalués ; code 1 | `resultats/generalisation-lot1-partie2-complement.json` |
| `audit:integrite` | code 1 : 830 grilles à données visibles et généralisation incomplète | `resultats/integrite-lot1-partie2-complement.json` |
| Audit SQL brut | code 1 : 176 candidats en échec, à interpréter selon leur contexte | `resultats/audit-sql-brut-lot1-partie2.json` |

Le registre `suivi.csv` conserve 227 identifiants ; les preuves et limites de F03 et F204 ont été précisées. Les résultats verts de la suite ne lèvent pas les suspensions, ne valident pas le fournisseur distant et ne satisfont pas les portes d'audit encore rouges.

Le premier rejeu complet de ce complément a toutefois donné **8 153 réussites, un échec et trois tests ignorés** : `resultats/suite-lot1-partie2-complement-premier.txt`. Le test F101 recevait un rapport d'erreur d'exécution mais tentait de lire un arrêt absent ; le message d'erreur initial n'a pas été conservé, donc la cause n'est pas établie. Une assertion diagnostique a été ajoutée sans changer le correcteur ; cinq rejeux ciblés ont ensuite réussi 13/13 chacun (`resultats/linux-f101-cinq-rejeux-lot1-partie2.txt`), puis la suite complète finale a réussi. Ces reprises ne prouvent pas que l'échec ne se reproduira jamais.
