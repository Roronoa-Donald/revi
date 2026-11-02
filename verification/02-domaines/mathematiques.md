# Mathématiques et étude quantitative

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : statistiques B1 1 et 3. Population : 5 cours avec chapitre 1, 92 exercices, 248 QCM et 157 cartes. L'échantillon transversal de la famille contient 20 exercices, 10 QCM et 10 cartes, identifiés dans `../echantillons-identifiants.json`.

## Exactitude et constats

- **F219 — D6, S1, observé** — `probabilites/chapitres/chapitre5.html:82` utilise une intégrale avant le rappel de sa lecture et de son calcul déplacé à `:115`. Introduire les outils nécessaires avant les premières formules, puis proposer l'approfondissement en complément.

Les textes principaux des chapitres Statistiques B1 1 et 3 sélectionnés ont été lus ; les contre-exemples ci-dessous ne constituent pas une validation de toutes les démonstrations.

- **F175–F178 — D8/D9/D12, S0 à S2** — `b1-stats/chapitres/chapitre2.html:219` annonce deux modalités alors qu'il y en a trois. Dans `b3-etude-quantitative/chapitres/chapitre4.html:151`, 85 % d'accord brut est présenté comme une garantie ; un exemple à 90 % d'accord possède un kappa d'environ −0,053. `chapitre2.html:320` conclut à tort à la représentativité à partir des seuls quotas ; `:256` arrondit les tailles de strates sans garantir le total cible. Voir `../sondes-contre-exemples-stats.json` et les réserves de chaque constat dans le registre.
- **F160 — D8/D12, S1, déduit** — `b1-stats/chapitres/chapitre1.html:151`, « `[180 ; 190[` » : si une observation vaut 190, aucune des classes proposées ne l'inclut. Inclure explicitement la borne finale.
- **F161 — D12, S0, déduit** — `b1-stats/chapitres/chapitre3.html:403`, « elles ne coïncident que pour une distribution symétrique » : la série asymétrique `0, 1, 2, 2, 5` a moyenne et médiane égales à 2. Voir `../sondes-lecture-complementaire.json`.
- **F162 — D7/D9/D12, S0, observé** — `b1-stats/chapitres/chapitre3.html:363`, « les effectifs » : cette option est rejetée alors que le calcul sur centres de classe utilise aussi les effectifs. Réunir les deux dans la réponse correcte.
- **F08 — D8/D9/D12, S0, observé** — `b1-stats/chapitres/chapitre3.html:380`, « une modalité a un effectif maximal strict » : le QCM exclut les séries plurimodales alors que `:141` les admet. Pour `[1, 1, 2, 2, 3]`, 1 et 2 sont deux modes. Revoir la question et les choix.
- **F09 — D12, S0, observé** — `b3-etude-quantitative/chapitres/cartes.html:109`, « probabilité ... résultats ... dus au pur hasard » : une p-valeur est calculée sous l'hypothèse nulle et le modèle, pour une statistique au moins aussi extrême ; ce n'est pas la probabilité que le résultat soit dû au hasard ni que H0 soit vraie. Reformuler et expliciter le seuil choisi.
- **F22 — D9/D14, S1, observé** — `server/exercises/runner.js:57`, « `parseFloat(trimA.replace(',', '.'))` » : dans `pb2-c1-e1`, trois valeurs avec un suffixe non numérique sont acceptées 3/3. Valider l'intégralité de la chaîne numérique avant la tolérance fraction/décimal ; résultats synthétiques dans `../sondes-execution.json`.
- **F25/F26 — D15, S1, observé** — `b1-algebre/chapitres/chapitre2.html:90`, « `\\begin` », et `b1-algebre/chapitres/chapitre4.html:136`, « `;middle|;` » : les expressions ne se rendent pas correctement sous KaTeX. Corriger les délimiteurs dans la source et vérifier la page dans un navigateur.
- **F37 — D9/D14, S2, déduit** — `b3-etude-quantitative/chapitres/chapitre4.html:356`, « focus group » : des distracteurs comme l'explosion du micro sont faciles à éliminer sans connaître la méthode. Proposer des erreurs de collecte réalistes et expliquer pourquoi chacune est fausse.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `b1-stats/chapitres/chapitre1.html:65` introduit le besoin d'organiser des données ; le ressenti d'une classe n'est pas mesuré. |
| C2 Objectifs | Les actions sont listées à `b1-stats/chapitres/chapitre1.html:70` ; leur couverture par toutes les évaluations reste à vérifier. |
| C3 Prérequis | Calculs, fractions et lecture de tableaux ne sont pas attestés pour chaque apprenant. |
| C4 Ordre | Le vocabulaire et les séries précèdent moyenne, médiane et mode ; l'absence de référence en avant n'est pas démontrée pour tous les chapitres. |
| C5 Définitions | La formulation de p-valeur est erronée, F09 ; la règle de mode contredit son QCM, F08. |
| C6 Exemples et progression | `b1-stats/chapitres/chapitre3.html:144` donne un calcul de mode ; il faut ajouter un exemple plurimodal et vérifier les autres exemples résolus. |
| C7 Charge | Les étapes sont découpées en sections ; la difficulté effective des démonstrations et symboles n'a pas été testée auprès des étudiants. |
| C8 Cohérence | Le QCM sur le mode contredit explicitement le texte de cours, F08. |
| C9 Exercices | Le comparateur tolère une réponse invalide, F22 ; deux exercices quantitatifs enseignent des garanties trompeuses ou une répartition parfois incorrecte, F177/F178. Toutes les justifications ne sont pas évaluées pédagogiquement. |
| C10 QCM | Les questions du mode et de la moyenne sur classes sont ambiguës, F08/F162 ; les distracteurs du focus group nécessitent F37. |
| C11 Auto-évaluation | Les seuils sont cohérents sur les grilles reconnues ; l'alignement de chaque checklist et des objectifs du chapitre n'est pas prouvé. |
| C12 Exactitude | Hypothèse nulle, mode, p-valeur et validation numérique doivent être clarifiés. |
| C13 Ressources | La carte de p-valeur doit être alignée avec un chapitre et un exemple corrigés ; toutes les cartes ne sont pas validées. |
| C14 Rendu | Au moins deux formules KaTeX échouent, F25/F26 ; un tableau de calcul voisin reste lisible. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les **20 exercices échantillonnés** ont chacun reçu deux variantes ciblant des erreurs de raisonnement : les 40 sont rejetées. Elles sont construites à partir des corrigés, pas recueillies auprès d'étudiants ; certaines appliquent un modèle de l'énoncé dont la validité scientifique est discutée en F176–F178. Détails : `../sondes-reponses-plausibles.json`.

Les **20 corrigés tirés passent** leurs tests et les **40 variantes automatiques sont rejetées**. Ce résultat ne détecte pas toutes les erreurs plausibles : la sonde spécifique F22 démontre une acceptation indue hors de ces mutations. Les QCM et cartes restent échantillonnés et la correction manuelle de chaque raisonnement n'est pas achevée.

**Niveau.** Le vocabulaire B1 utilise des exemples concrets, mais une contradiction d'évaluation et un symbole illisible peuvent bloquer un novice. La maîtrise B3 des hypothèses statistiques, les tests à plusieurs étapes et les défis pour excellents étudiants demandent une revue supplémentaire.

## Confrontation aux supports et références

Le corpus fourni comporte des supports de statistiques et probabilités ; aucun alignement complet page par page n'a été réalisé pour cette famille. Les schémas et cinq scans nécessitent les originaux : ne pas conclure à une omission à partir du seul texte extrait.

Sources primaires consultées le 29 octobre 2026 :

- Statistique Canada, calcul du mode : https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/mode/5214873-fra.htm
- NIST, définition et interprétation d'une p-valeur : https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm
- scikit-learn, définition du kappa : https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cohen_kappa_score.html
- Statistique Canada, échantillonnage non probabiliste et quotas : https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/nonprob/5214898-fra.htm
- Statistique Canada, allocation entre strates : https://www150.statcan.gc.ca/n1/pub/12-587-x/12-587-x2003001-fra.pdf
- KaTeX, commandes prises en charge : https://katex.org/docs/supported
