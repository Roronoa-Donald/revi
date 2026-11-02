# Algorithmique et programmation

**Appréciation : à corriger avant publication.** Le périmètre échantillonné comprend les chapitres 1 et 6 de React B2 ; les exercices, QCM et cartes sont tirés dans l'ensemble de la famille, pas seulement dans ces deux chapitres. Population repérée : 13 cours avec chapitre 1, 258 exercices, 677 QCM et 551 cartes. Sélection : `../echantillons-identifiants.json`, graine 20261029.

## Exactitude et constats

- **F222 — D1/D9, S1, observé** — `b1-python/chapitres/chapitre1.html:318` demande une fonction qui renvoie une valeur, avant l'explication de `return` au chapitre 3. L'amorce et l'indice aident partiellement ; présenter un exemple résolu avant l'atelier ou déplacer celui-ci.

- **F218 — D6, S1, observé** — `react/chapitres/chapitre1.html:129` utilise plusieurs imports avant le rappel des modules placé à `:141`. Préparer la syntaxe avant son premier emploi ou expliciter le niveau de JavaScript attendu.

- **F205–F207 — D9, S0, observé** — Les tests acceptent un tri arrêté trop tôt (`b1-algo/chapitres/chapitre6.html:244`), deux remises appliquées dès leurs bornes (`b1-algo/chapitres/chapitre10.html:219`) et un classement incorrect du code HTTP 451 (`b1-prog-web/chapitres/chapitre1.html:263`). Des entrées indépendantes révèlent chaque erreur ; voir `../sondes-contre-exemples-code.json`.

- **F212 — D9, S0, observé** — `server/exercises/csharp.js:485` : une implémentation indépendante qui exclut le prix exactement égal au seuil reçoit 3/3, alors que l'énoncé demande `>=`. Le contre-exemple synthétique confirme l'erreur ; ajouter une valeur égale et ses voisines aux tests.

Les textes principaux des chapitres React 1 et 6 sélectionnés ont été lus. Cette lecture ne certifie pas chaque activité, chaque distracteur ni le rendu intégral.

- **F145 — D9/D15, S0, observé** — `react/chapitres/chapitre6.html:318`, « `path="*"` » : la question 404 n'offre qu'un bouton qui fusionne trois propositions. Séparer les choix et vérifier le rendu.
- **F146 — D12, S1, observé** — `react/chapitres/chapitre6.html:372`, « les routes sensibles » : la méthode ne mentionne que le contrôle React côté client. Enseigner aussi l'autorisation côté serveur sur chaque requête ; aucune faille réelle n'est démontrée ici. Source : https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html, consultée le 29 octobre 2026.
- **F85–F87, S0, observé** — `b1-python/chapitres/chapitre2.html:200` annonce quatre voyelles alors que le code en compte cinq, `y` compris. Dans `b1-python/chapitres/chapitre5.html:217`, la conversion censée échouer renvoie `15`. Les deux codes des QCM à `b1-python/chapitres/chapitre2.html:418` et `:454` provoquent une `SyntaxError` dans leur forme affichée ; aucune réponse proposée ne le dit. Contre-exemples : `../sondes-python-fondamentaux.json`.
- **F88–F91, S1/S2, observé** — `b1-python/chapitres/chapitre1.html:180` annonce une exception pour une virgule qui peut produire un tuple ; `:366` présente `//` comme une troncature, au lieu d'un plancher. L'alternative proposée à `b1-python/chapitres/chapitre3.html:113` remplace aussi une liste vide explicitement transmise. L'exemple de `b1-python/chapitres/chapitre1.html:191` affiche du tutoiement alors que sa sortie utilise le vouvoiement.
- **F107–F110 — Algorithmique B1, S0/S1** — la synthèse des boucles inverse implicitement la condition de `Répéter...Jusqu'à` ; l'équivalence Pascal/Python de `div/mod` ne vaut pas sans précaution pour les signes ; un format d'exercice contredit son exemple et un QCM oublie qu'une cascade peut ne prendre aucune branche.
- **F111–F116 — cas limites et exemples, S0/S1** — l'exemple de Syracuse ne borne pas son entrée ; le maximum d'un tableau vide n'est pas défini ; la mutation d'une liste passée en argument est traitée comme une copie ; un exemple de matrice lève `NameError`, un QCM impose à tort deux boucles, et le PGCD peut être négatif. Voir `../sondes-algo-fondamentaux.json`.
- **F117–F119 — cohérence et démonstration, S1** — le nombre maximal de passages du tri à bulles contredit son tableau de trace ; le squelette de file d'attente contient une itération malgré son interdiction ; une progression vers une limite n'établit pas, à elle seule, la terminaison en un nombre fini d'étapes.
- **F03 — D9/D12, S0, observé** — `server/exercises/csharp.js:522`, « `if (input ==` » : les 18 corrigés C# inspectés reconnaissent littéralement les entrées des tests au lieu de traiter le cas général. Le corrigé `csb2-c5-e1` obtient 3/3, mais n'affiche rien pour une entrée nouvelle valide. Réécrire les solutions comme des algorithmes et tester aussi des données indépendantes. Les corrigés sont côté serveur ; aucune fuite vers l'élève n'est affirmée.
- **F44 — D7/D9/D12, S0, observé** — `php/chapitres/chapitre3.html:327`, « Une interface contient… » : les propriétés sont rejetées alors que des exigences de propriété dans les interfaces sont permises à partir de PHP 8.4. Préciser la version et reformuler les propositions.
- **F46 — D7/D9/D12, S0, observé** — `b3-algo/chapitres/chapitre6.html:288`, « complexité temporelle ... du sac à dos 0/1 » : la question ne spécifie pas la méthode, mais exclut l'approche exponentielle et impose la programmation dynamique en `O(nW)`. Nommer l'algorithme tabulaire et préciser les hypothèses sur la capacité entière.
- **F42–F43 — D12, S1, observé** — `react/chapitres/chapitre1.html:93`, « Rollup / esbuild », et `:111`, « React.createElement » : ces explications décrivent certaines générations ou configurations, pas toutes. Vite 8 utilise Rolldown/Oxc ; le JSX moderne peut passer par `react/jsx-runtime`. Versionner et distinguer les transformations classique et automatique.
- **F04 — D7/D15, S1, observé** — `csharp/chapitres/chapitre5.html:187`, « Console.In).0 » : l'énoncé est tronqué ; quatre cas similaires sont repérés. Restaurer les consignes à partir de leur source et contrôler le HTML généré.
- **F32 — D14, S1, observé** — `b1-python/chapitres/cartes.html:54`, « ordre des tests ... Un client se plaint » : la réponse décrit une situation sans expliquer l'ordre des conditions. Une autre carte du même emplacement demande ce que signifient `and / or / not` mais invite seulement à écrire une expression. Ajouter définitions et exemples. Même difficulté de réponse-anecdote à `b1-algo/chapitres/cartes.html:51`.
- **F68 — D14, S1, observé** — `b1-php/chapitres/cartes.html:67`, « boucles imbriquées : imbriquer deux boucles » : la réponse ne définit pas le mécanisme. Montrer qu'une boucle interne s'exécute pour chaque tour externe, puis compter un exemple.
- **F69 — D12, S1, observé** — `assembleur/chapitres/cartes.html:65`, « 2 octets » : sur x86-64, `xor eax,eax` occupe deux octets, mais `xor rax,rax` et `xor r8d,r8d` en occupent trois. La sonde `../sondes-encodage.txt` montre les octets réellement assemblés.
- **F74 — D12, S1, observé** — `assembleur/chapitres/cartes.html:102`, « interdit d’avoir deux opérandes mémoire dans une même instruction » : `MOV [eax], [ebx]` est bien invalide, mais l'instruction `MOVSB` a une source et une destination mémoire implicites. L'assemblage local est conservé dans `../sondes-encodage.txt`.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `react/chapitres/chapitre1.html:65` motive les composants par une interface interactive. |
| C2 Objectifs | `react/chapitres/chapitre1.html:70` liste notamment décomposer et écrire ; « comprendre » et « maîtriser » restent à rendre observables. |
| C3 Prérequis | Les acquis JavaScript, navigateur, Node et npm ne sont pas validés par cette revue ; le mot « prérequis » ne figure pas dans ces deux chapitres. |
| C4 Ordre | L'outillage Vite précède l'explication JSX dans `react/chapitres/chapitre1.html:90` ; compatibilité avec le parcours antérieur à examiner, pas de cycle démontré. |
| C5 Définitions | JSX est introduit à `react/chapitres/chapitre1.html:110`, mais l'explication de sa transformation nécessite F43. |
| C6 Exemples et progression | Un exemple JSX figure à `react/chapitres/chapitre1.html:112` ; progression et exemples avant chaque exercice restent à vérifier. |
| C7 Charge | Les chapitres React 1 et 6 introduisent plusieurs outils et notions ; la capacité réelle d'un débutant n'a pas été mesurée. |
| C8 Cohérence | La commande `vite@latest` à `react/chapitres/chapitre1.html:94` ne fixe pas la version correspondant à l'explication de la ligne 93 ; F42. |
| C9 Exercices | F03 montre un corrigé non généraliste et F04 un énoncé tronqué ; le format et la préparation de tous les autres ne sont pas certifiés. |
| C10 QCM | `b1-c-cpp/chapitres/chapitre2.html:317` fournit une bonne explication de troncature ; les QCM PHP et sac à dos restent ambigus, F44/F46. |
| C11 Auto-évaluation | Paliers contrôlés globalement dans `../03-transversal.md` ; correspondance objectifs/checklist de ces chapitres non établie. |
| C12 Exactitude | F03, F42–F44 et F46 nécessitent correction et contrôle par version. |
| C13 Ressources | Les cartes Python et algorithmique citées n'expliquent pas réellement leur question ; F32. |
| C14 Rendu | Quatre descriptions C# tronquées ont été repérées ; aucune garantie sur tous les autres formats. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les **20 exercices échantillonnés** ont reçu deux variantes ciblées chacun : 35 sont rejetées et cinq erronées sont acceptées. Les cinq sont confrontées à des entrées synthétiques indépendantes. Les 19 premiers exercices ont été sondés à partir des corrigés et le C# restant à partir de programmes indépendants ; ces variantes ne sont pas des productions d'étudiants. Voir F03/F212, `../sondes-reponses-plausibles.json` et `../sondes-sept-restants.json`.

Les **20 corrigés tirés passent leurs tests cachés** dans le harnais local. Sur 40 variantes automatiques, 8 passent aussi ; une variante peut être équivalente ou ne pas modifier le comportement. Ces 8 acceptations ne sont donc pas 8 erreurs prouvées. Le cas C# indépendant ci-dessus démontre néanmoins un vrai défaut. Les 10 QCM et 10 cartes tirés sont identifiés dans le fichier d'échantillonnage ; les constats ci-dessus sont ceux étayés, pas une validation des autres. La demande de deux mauvaises solutions *plausibles et distinctes par exercice* n'est pas remplie par les seules mutations automatiques.

**Niveau.** Le découpage B1/B2/B3 existe, mais la lecture ne permet pas de conclure qu'un novice autonome suit tous les chapitres ni qu'un excellent étudiant dispose de défis suffisants. Priorité : lire/prédire/modifier un exemple avant la production libre, puis introduire des cas limites.

## Confrontation aux supports et références

Dans `corpus-cours-revi.zip`, `textes/B1/Algorithmique/Introduction à L’Algorithmique.txt`, page 2, et `b1-algo/chapitres/chapitre1.html:54` introduisent la notion d'algorithme : convergence sur ce seul point, sans validation de l'ordre complet. L'index du corpus signale **aucun PDF** pour `react`, `rd_java`, `api-rest-flask` et `csharp` ; la fidélité à leurs supports d'origine est donc non vérifiée. Les textes principaux extraits des six chapitres Python B1 et des dix chapitres d'algorithmique B1 ont été relus ; cela ne valide ni leur rendu ni chaque exemple.

Sources primaires consultées le 29 octobre 2026 :

- Python, conversion entière : https://docs.python.org/3/library/functions.html#int
- Python, instructions composées et opérateurs : https://docs.python.org/3/reference/compound_stmts.html et https://docs.python.org/3/reference/expressions.html#binary-arithmetic-operations
- Python, arguments par défaut : https://docs.python.org/3/tutorial/controlflow.html#default-argument-values
- PHP, interfaces et propriétés : https://www.php.net/manual/en/language.oop5.interfaces.php
- Vite 8 : https://vite.dev/blog/announcing-vite8
- React, transformations JSX : https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
- MIT, sac à dos et recherche arborescente : https://ocw.mit.edu/courses/1-204-computer-algorithms-in-systems-engineering-spring-2010/df7362cc2e2d15ddb9eff4a0e37ef88b_MIT1_204S10_lec16.pdf
- Microsoft, requêtes LINQ : https://learn.microsoft.com/dotnet/csharp/linq/get-started/introduction-to-linq-queries
- Intel, encodage et préfixes REX : https://www.intel.com/content/dam/www/public/us/en/documents/manuals/64-ia-32-architectures-software-developer-vol-2d-manual.pdf
