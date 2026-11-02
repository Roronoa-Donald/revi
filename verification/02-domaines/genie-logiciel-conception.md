# Génie logiciel et conception

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : Merise B1 1 et 5. Population : 10 cours avec chapitre 1, 180 exercices, 510 QCM et 337 cartes ; 20 exercices, 10 QCM et 10 cartes tirés dans toute la famille. Identifiants dans `../echantillons-identifiants.json`.

## Exactitude et constats

- **F223 — D1/D9, S1, observé** — Les trois ateliers Git B1 supposent de construire des scripts Bash avec boucles et états (`b1-git/chapitres/chapitre1.html:143`), sans préparation Bash explicite dans la théorie du chapitre. Les amorces et indices fournissent une aide partielle ; ajouter un exemple guidé ou un lien d'initiation.
- **F225 — D8/D9, S1, observé** — Les six chapitres GitHub B3 annoncent du Python, par exemple `b3-github/chapitres/chapitre1.html:78`, alors que leurs ateliers sont en Bash. Rétablir l'alignement entre objectif et activité.

- **F214/F215 — D9, S0, observé** — Les tests de `server/exercises/b3-github.js:436` acceptent des programmes qui ignorent `!` et autorisent le type `style` exclu par l'énoncé ; ceux de `:592` acceptent une exclusion de la taille exactement égale au seuil LFS. Ces fautes sont confirmées par des entrées synthétiques indépendantes. Ajouter le marqueur, les types interdits et la borne exacte aux tests.

- **F208 — D9, S0, observé** — Le correcteur du simulateur `b1-git/chapitres/chapitre6.html:162` accepte une variante qui remplace les modifications présentes au lieu d'y ajouter celles dépilées. Une entrée synthétique indépendante montre la perte ; ce résultat ne décrit pas tous les cas de conflit de Git réel. Voir `../sondes-contre-exemples-code.json`.

- **F202 — D9/D12, S1, observé** — `ingenierie-besoin/chapitres/chapitre5.html:272` annonce une erreur de syntaxe Gherkin pour la variante « Sachant que » du cas à `:252`, pourtant valide dans le dialecte français. Le parseur pédagogique est explicitement limité à deux formulations, mais son message ne doit pas qualifier d'invalide le langage général. Source officielle : https://cucumber.io/docs/gherkin/languages/.
- **F203/F204 — D9, S0, observé** — `erp-si/chapitres/chapitre3.html:256` exige des noms en majuscules, mais le correcteur accepte des noms non transformés. Les 18 corrigés Bash de `server/exercises/b3-github.js` encodent toutes les entrées des tests ; le corrigé sondé renvoie une sortie vide sur un commit valide indépendant. Voir `../sondes-corriges-memorises.json` et `../sondes-reponses-plausibles.json`.

Les textes principaux des chapitres Merise B1 1 et 5 sélectionnés ont été lus ; la confrontation complète au support d'origine reste à faire.

- **F158 — D8/D9/D12, S0, observé** — `b1-merise/chapitres/chapitre5.html:164`, « une association sans données portées », est systématiquement ignorée par l'exercice. Une association plusieurs-à-plusieurs peut nécessiter une table de liaison même sans attributs propres. Exiger les cardinalités ; exemple d'implémentation : https://docs.djangoproject.com/en/5.2/ref/models/fields/#manytomanyfield, consulté le 29 octobre 2026.
- **F159 — D9, S1, observé** — `b1-merise/chapitres/chapitre1.html:163`, « type libelle » : le type donnée/information est déjà fourni, alors que l'objectif est de le classer. Demander d'abord le classement sur des exemples non étiquetés et sa justification.
- **F45 — D9/D12, S0, observé** — `b1-merise/chapitres/chapitre5.html:83`, « clé étrangère ... clé primaire d'une autre table » : la clé étrangère est une ou plusieurs colonnes de la table référente qui pointent vers une clé admissible de la table cible ; elle peut viser une contrainte unique et être composée. Réviser aussi le QCM à `:332` et préciser le traitement des valeurs absentes selon le SGBD.
- **F17 — D12, S0, observé** — `uiux/chapitres/cartes.html:107`, « 48 x 48 px selon Android et WCAG 2.5.5 » : le critère WCAG 2.5.5 niveau AAA donne 44 × 44 **pixels CSS**, avec exceptions ; la recommandation Android évoque 48 **dp**. Séparer référentiels, unités et cas d'exception.
- **F64 — D12, S1, observé** — `b3-github/chapitres/cartes.html:107`, « immuniser un script shell » : une variable intermédiaire `env` réduit le risque d'interpolation directe, mais ne rend pas sûrs tous les usages ultérieurs. Encadrer les expansions par des guillemets, valider les arguments et éviter `eval`.
- **F65 — D12, S1, observé** — `uiux/chapitres/cartes.html:79`, « 5 utilisateurs suffisent pour découvrir environ 85% » : ce résultat dépend des hypothèses du modèle ; il ne garantit pas cette couverture pour chaque interface ou population. Présenter le principe comme point de départ d'itérations.
- **F70 — D12, S1, observé** — `b3-agile/chapitres/cartes.html:98`, « universelle et partagée » : les story points sont relatifs à l'équipe et leurs échelles ne sont pas universellement comparables entre équipes. Préciser ce périmètre.
- **F48 — D12/D14, S1, observé** — `b3-github/chapitres/cartes.html:117`, « git rm crée un nouveau commit » : `git rm` prépare la suppression dans l'index ; il ne crée pas le commit. Le conseil principal reste juste : la suppression ultérieure ne retire pas le secret de l'historique. Corriger aussi la procédure de révocation avant toute réécriture.
- **F50 — D12, S1, observé** — `infographie/chapitres/chapitre4.html:334`, « exclusivement les triangles » : les API graphiques possèdent aussi des primitives points et lignes. À `:341`, trois points ne définissent un plan unique que s'ils ne sont pas alignés. Préciser que les triangles non dégénérés sont privilégiés pour représenter des surfaces.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `b1-merise/chapitres/chapitre1.html:65` part de valeurs sans contexte pour introduire donnée et information. |
| C2 Objectifs | `b1-merise/chapitres/chapitre1.html:70` demande de distinguer, décrire, situer et classer ; couverture intégrale non vérifiée. |
| C3 Prérequis | Les connaissances sur tables, identifiants et cardinalités nécessaires au chapitre 5 n'ont pas toutes été tracées. |
| C4 Ordre | MCD au chapitre 4, MLD au chapitre 5 : ordre plausible ; aucun graphe complet ni absence de boucle n'est démontré. |
| C5 Définitions | La clé étrangère est mal définie à `b1-merise/chapitres/chapitre5.html:83` ; F45. |
| C6 Exemples et progression | `b1-merise/chapitres/chapitre5.html:84` donne un schéma ; sa justesse et les exemples résolus de chaque exercice restent à vérifier. |
| C7 Charge | La situation B1 part d'un cas simple ; les règles de passage et leur appropriation par les débutants nécessitent un essai pédagogique. |
| C8 Cohérence | La définition et le QCM répètent l'amalgame sur les clés ; F45. |
| C9 Exercices | Une catégorie est donnée dans l'entrée, F159, et une règle n-n est fausse, F158 ; les autres exercices ne sont pas tous certifiés. |
| C10 QCM | Merise répète la mauvaise définition et infographie contient une généralisation ; F45/F50. |
| C11 Auto-évaluation | Les paliers ont été comptés globalement ; la concordance des checklists Merise avec tous les objectifs n'est pas prouvée. |
| C12 Exactitude | Clés, tailles de cible, `git rm` et primitives graphiques exigent F45/F17/F48/F50. |
| C13 Ressources | Les cartes UI/UX et GitHub doivent être alignées avec les référentiels cités. |
| C14 Rendu | Les éléments Merise consultés sont lisibles dans le HTML ; cela ne remplace pas une validation visuelle complète. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les **20 exercices échantillonnés** ont reçu deux variantes ciblées : 35 sont rejetées et cinq erronées sont acceptées. Les 18 premiers ont été sondés à partir des corrigés et les deux Bash restants à partir de programmes indépendants ; ces variantes ne sont pas des productions d'étudiants. Détails et contre-exemples : `../sondes-reponses-plausibles.json`, `../sondes-sept-restants.json` et `../sondes-contre-exemples-code.json`.

**20 corrigés sur 20** passent leurs tests. **2 variantes automatiques sur 40** passent, mais leur caractère incorrect n'a pas été démontré. Ces résultats ne garantissent pas que les corrigés généralisent : l'un des deux corrigés GitHub mémorisés échantillonnés échoue sur une entrée indépendante. Les QCM et cartes sélectionnés incluent un QCM d'infographie et une carte Git erronés.

**Niveau.** Le scénario Merise B1 est un bon point d'entrée, mais la définition de clé peut installer une représentation fausse dès le début. Pour les niveaux supérieurs, la qualité des défis, des traces de raisonnement et l'autonomie réelle n'ont pas été mesurées.

## Confrontation aux supports et références

`corpus-cours-revi.zip`, `textes/B1/Modélisation (MERISE)/SUPPORT_CONCEPTION_MEDELISATION_SI.txt`, pages 15–16, présente la méthode et les niveaux MCD/MLD ; `b1-merise/chapitres/chapitre4.html:56` et `chapitre5.html:56` abordent ces modèles. Cela confirme seulement la présence des thèmes. L'index ne fournit aucun PDF pour `b3-github`, `erp-si`, `infographie`, `ingenierie-besoin` ou `uiux` ; leur fidélité reste non vérifiée.

Sources primaires consultées le 29 octobre 2026 :

- PostgreSQL, clés étrangères : https://www.postgresql.org/docs/current/ddl-constraints.html
- W3C, cible tactile AAA et exceptions : https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced
- Android, unités de cible tactile : https://developer.android.com/guide/topics/ui/accessibility/apps
- Git, `git rm` : https://git-scm.com/docs/git-rm
- GitHub, injections dans les workflows : https://docs.github.com/en/actions/concepts/security/script-injections
- Nielsen Norman Group, hypothèses du test à cinq : https://www.nngroup.com/articles/5-test-users-qual-quant/
- Atlassian, estimations relatives par équipe : https://www.atlassian.com/agile/project-management/estimation
- Khronos, primitives OpenGL : https://wikis.khronos.org/opengl/Primitive
- Cucumber, mots-clés Gherkin localisés : https://cucumber.io/docs/gherkin/languages/
