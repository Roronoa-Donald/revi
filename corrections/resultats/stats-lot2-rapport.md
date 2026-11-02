# Lot 2 — mathématiques et statistiques

Date de consultation des sources : **30 octobre 2026**. Les neuf constats demandés sont couverts dans leur périmètre. F175 était déjà corrigé avant cette intervention et a été conservé tel quel.

## F08 — séries plurimodales

- Correction : le QCM accepte toutes les modalités d’effectif maximal, y compris à égalité ; il précise la convention où aucune modalité ne se détache.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b1-stats/chapitres-1-3.js:479` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b1-stats/chapitres/chapitre3.html:381`.
- Vérification : les données 1, 1, 2, 2, 3 ont deux modes, 1 et 2 ; le bon choix et son explication fonctionnent dans Chromium.
- Source : [Statistique Canada — calcul du mode](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/mode/5214873-fra.htm).

## F09 — p-valeur

- Correction : définition conditionnée par H0 et les hypothèses du modèle, distinction entre la p-valeur et la probabilité que H0 soit vraie ou que les données soient dues au hasard. Cours, QCM et carte sont cohérents ; le seuil de 5 % est présenté comme une fréquence d’erreur à long terme pour un test valide.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/chapitre5.js:113`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b3-etude-quantitative/chapitres/chapitre5.html:163` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b3-etude-quantitative/chapitres/cartes.html:109`.
- Vérification : contrôle de la bonne réponse, de la carte et de leurs interactions dans Chromium.
- Sources : [NIST — p-values](https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm) et [American Statistical Association — déclaration de 2016](https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf).

## F160 — borne maximale des classes

- Correction : la dernière classe est `[180 ; 190]` ; les bornes intérieures vont à la classe suivante, mais la borne finale 190 est incluse. L’exemple de moyenne et l’examen utilisent la même convention.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b1-stats/chapitres-1-3.js:118`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b1-stats/pages.js:407` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b1-stats/chapitres/chapitre1.html:153`.
- Vérification : chacune des bornes 150, 160, 170, 180 et 190 appartient à exactement une classe. La convention est visible dans Chromium.
- Source : [NIST — histogrammes et classes](https://www.itl.nist.gov/div898/handbook/eda/section3/histogra.htm), pour le regroupement et le comptage ; l’inclusion de la dernière borne est le choix explicite de cet exemple.

## F161 — moyenne, médiane et symétrie

- Correction : l’égalité de la moyenne et de la médiane n’est pas présentée comme une preuve de symétrie ; une carte reprend le contre-exemple.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b1-stats/chapitres-1-3.js:443`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b1-stats/chapitres/chapitre3.html:131` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b1-stats/chapitres/cartes.html:83`.
- Vérification : 0, 1, 2, 2, 5 a pour moyenne et médiane 2, mais la valeur 0 n’a pas de reflet 4 ; la carte se retourne dans Chromium.
- Sources : [Statistique Canada — moyenne](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/mean-moyenne/5214871-fra.htm) et [médiane](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/median-mediane/5214872-fra.htm). Le contre-exemple est calculé indépendamment.

## F162 — moyenne de données groupées

- Correction : les QCM du chapitre et du simulateur d’examen demandent les centres de classe **pondérés par les effectifs**, et indiquent le caractère approché du résultat.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b1-stats/chapitres-1-3.js:477`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b1-stats/pages.js:451` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b1-stats/chapitres/chapitre3.html:363`.
- Vérification : centres 5 et 15, effectifs 1 et 3 : moyenne pondérée 12,5, contre 10 sans pondération. Le choix correct fonctionne dans Chromium.
- Source : [Statistique Canada — moyenne et pondération par fréquences](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/mean-moyenne/5214871-fra.htm).

## F175 — nombre de modalités

- État initial : déjà corrigé avant le lot ; aucune modification arbitraire des données ni de l’exercice.
- Fichiers vérifiés : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/exercises/b1-stats.js:164` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b1-stats/chapitres/chapitre2.html:218`.
- Vérification : les cinq observations 1, 2, 2, 3, 3 ont trois modalités ; les fréquences sont 20 %, 40 %, 40 %. Le test passait déjà avant correction, et les trois cas sont affichés dans l’atelier.
- Source : [Statistique Canada — valeurs et fréquences](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch11/mode/5214873-fra.htm) ; décompte recalculé sur les données du cas.

## F176 — accord inter-observateurs

- Correction : plus de validation automatique par un seuil d’accord brut. Cours, carte, mémento, QCM, examen et atelier distinguent accord brut, marges et kappa, et demandent d’examiner les désaccords. Le kappa est déclaré indéfini lorsque son dénominateur est nul.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/chapitre4.js:89`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/exercises/b3-etude-quantitative/chapitre4.js:87`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/pages/cartes-formules.js` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/pages/examens-exercices.js`.
- Vérification : pour `[[90, 5], [5, 0]]`, accord brut 0,90, accord attendu 0,905 et kappa −1/19 ≈ −0,052632 ; l’atelier vérifie aussi le cas indéfini. Son corrigé passe le correcteur réel et une inversion de signe est rejetée.
- Sources : [Feinstein et Cicchetti, article original de 1990](https://pubmed.ncbi.nlm.nih.gov/2348207/) et, en complément méthodologique, [McHugh, 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC3900052/).

## F177 — conformité des quotas

- Correction : le verdict de l’atelier concerne uniquement la conformité des quotas au seuil choisi ; ni ce verdict ni une pondération ne démontrent une représentativité générale ou l’absence de biais. Cours, QCM et carte indiquent les limites.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/chapitre2.js:106`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/exercises/b3-etude-quantitative/chapitre2.js` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/b3-etude-quantitative/chapitres/chapitre2.html:156`.
- Vérification : population A/B 50/50, 20 % de revenus élevés ; échantillon A/B 50/50, mais 100 % de revenus élevés. Le seuil de 3 points n’est qu’une convention de l’exercice. Le corrigé passe le correcteur réel et un verdict erroné est rejeté.
- Source : [Statistique Canada — échantillonnage non probabiliste](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/nonprob/5214898-fra.htm).

## F178 — répartition des strates

- Correction : règle des plus forts restes, départage des égalités dans l’ordre, respect de la taille totale et des capacités. Des minima facultatifs sont attribués d’abord, puis le reste est réparti sur les capacités résiduelles ; les contraintes impossibles sont rejetées. Le cours précise que cette variante modifie la cible proportionnelle initiale.
- Fichiers : `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/chapitre2.js:95`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/exercises/b3-etude-quantitative/chapitre2.js:48`, `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/pages/cartes-formules.js` et `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/server/content/b3-etude-quantitative/pages/examens-exercices.js`.
- Vérification : `n=1`, tailles `[1,1,1]` → `[1,0,0]` ; minima `[1,1,1]` pour `n=1` et `n>N` sont impossibles. Calcul indépendant exhaustif : 5 376 répartitions sans minima et 16 750 avec minima, toutes dans les bornes. Les six cas de l’atelier sont évalués par le correcteur réel.
- Sources : [Statistique Canada — Méthodes et pratiques d’enquête, section 8.2.2.1](https://www150.statcan.gc.ca/n1/pub/12-587-x/12-587-x2003001-fra.pdf) et [US Census Bureau — méthode historique Hamilton/Vinton](https://www.census.gov/about/history/historical-censuses-and-surveys/census-programs-surveys/decennial-census/methods.html), adaptée ici à la répartition entière.

## Commandes et résultats

- `node scripts/generate-courses.js b1-stats b3-etude-quantitative` : régénération limitée aux deux cours ; `node scripts/generate-courses.js --check b1-stats b3-etude-quantitative` : 26 pages, 2 cours synchronisés.
- `node --test tests/stats-lot2.test.js` : avant correction, 1 réussite et 8 échecs sur les neuf constats ; après correction, 11 réussites sur 11, dont contrôle des corrigés réels, rejets d’erreurs ciblées et absence de divulgation des solutions.
- `node --test --test-name-pattern='Les fréquences et le nombre de modalités|Les classes ont même largeur' tests/analyses-numeriques-lot1.test.js` : 2 réussites.
- `python3 corrections/resultats/stats-lot2-calculs.py` : contre-exemples et bornes vérifiés en arithmétique rationnelle indépendante.
- `node corrections/resultats/stats-lot2-navigateur.js` : pages, grilles, QCM et cartes vérifiés dans Chromium avec un serveur local limité aux deux cours et aux ressources communes ; les requêtes externes sont bloquées.
- Les sorties avant/après et les essais intermédiaires sont conservés dans `/home/rd/Téléchargements/revi-cours-html /revi-cours-html/corrections/resultats/stats-lot2-*`.

## Limites

- La vérification navigateur sert les pages statiques localement : elle ne teste pas l’injection d’authentification, PostgreSQL ou le déploiement.
- Le texte intégral de l’article original de Cohen (1960) était inaccessible chez l’éditeur, réponse HTTP 403. Sa référence bibliographique a été identifiée ; les limites du kappa ont été vérifiées auprès de l’article original accessible de Feinstein et Cicchetti et les valeurs ont été recalculées indépendamment.
- La règle F178 avec minima est une règle faisable explicitement choisie, non une recherche de l’allocation optimale ni une garantie de représentativité.
