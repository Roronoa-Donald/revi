# Sources statistiques du lot 2

Toutes les ressources ci-dessous ont été consultées le **30 octobre 2026**. Les contre-exemples et résultats numériques du cours ont été recalculés séparément ; ils ne sont pas présentés comme des exemples tirés des sources.

## F08 et F175 — modes et modalités

- Statistique Canada, [Calcul du mode](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/mode/5214873-fra.htm) : plusieurs valeurs peuvent partager la fréquence maximale ; l’organisme explique également la convention où aucune valeur ne se détache lorsque toutes les fréquences sont égales.
- Le décompte des trois modalités du cas F175 est vérifié directement à partir des cinq données de l’exercice.

## F09 — p-valeur

- NIST, [Critical values and p values](https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm) : probabilité d’une statistique au moins aussi extrême sous l’hypothèse nulle.
- American Statistical Association, [déclaration du 7 mars 2016 sur les p-valeurs](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf) : les p-valeurs ne sont ni la probabilité que l’hypothèse étudiée soit vraie ni celle que les données soient produites par le hasard seul ; le modèle doit être explicité.

## F160 à F162 — classes, moyenne et médiane

- NIST, [Histogram](https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm) : répartition en classes et comptage des observations par classe. Le NIST ne prescrit pas ici la convention de bornes retenue : la dernière classe fermée à droite est un choix explicite du cours, contrôlé numériquement.
- Statistique Canada, [Calcul de la moyenne](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/mean-moyenne/5214871-fra.htm) : moyenne et pondération par les fréquences. Pour des données groupées, le cours emploie les centres comme valeurs représentatives et annonce l’approximation.
- Statistique Canada, [Calcul de la médiane](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/median-mediane/5214872-fra.htm) : médiane d’une série ordonnée et comparaison avec la moyenne. L’asymétrie du contre-exemple F161 est établie par le calcul indépendant.

## F176 — accord et kappa

- Feinstein et Cicchetti, article original de 1990, [High agreement but low kappa: I. The problems of two paradoxes](https://pubmed.ncbi.nlm.nih.gov/2348207/) : le résumé des auteurs décrit notamment le cas d’un accord brut élevé accompagné d’un kappa abaissé par les marges.
- McHugh, 2012, [Interrater reliability: the kappa statistic](https://pmc.ncbi.nlm.nih.gov/articles/PMC3900052/) : complément méthodologique accessible sur le calcul et les limites du kappa de Cohen ; ce texte est une revue explicative, pas l’article original de Cohen.
- Cohen, 1960, [A Coefficient of Agreement for Nominal Scales](https://doi.org/10.1177/001316446002000104) : référence originale identifiée à partir des métadonnées Crossref. Le texte intégral de l’éditeur était inaccessible (HTTP 403) et n’a donc pas été présenté comme lu.

## F177 — quotas et sélection

- Statistique Canada, [Échantillonnage non probabiliste](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/nonprob/5214898-fra.htm) : le respect des proportions de quotas peut masquer un biais de sélection ; il ne suffit pas à justifier les inférences sur toute la population.

## F178 — répartition entière

- Statistique Canada, [Méthodes et pratiques d’enquête](https://www150.statcan.gc.ca/n1/pub/12-587-x/12-587-x2003001-fra.pdf), chapitre 8.2.2.1 : répartition proportionnelle à la taille des strates.
- US Census Bureau, [Methods of Apportionment](https://www.census.gov/about/history/historical-censuses-and-surveys/census-programs-surveys/decennial-census/methods.html), méthode historique Hamilton/Vinton : planchers puis distribution par restes décroissants. Il s’agit ici d’une règle mathématique adaptée à l’exercice, et non d’une affirmation sur la méthode actuelle de répartition des sièges aux États-Unis.
- Le traitement des capacités, des minima et des égalités est un choix explicité dans le cours ; ses bornes et des cas limites sont vérifiés dans `stats-lot2-calculs.py`.
