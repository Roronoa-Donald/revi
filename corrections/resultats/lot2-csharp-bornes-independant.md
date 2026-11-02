# Lot 2 — contre-vérification indépendante des bornes C#

**Date :** 30 octobre 2026. **Périmètre :** les deux sondes `csb2-c2-e2` et `csb2-c6-e1`, et non l'ensemble des exercices C#.

## Actualisation — deux mutants et bornes actives

**Rejoué le 30 octobre 2026**, sur `csb2-c2-e2` uniquement. Dans `server/exercises/csharp.js:882`, le dernier des sept tests actifs comprend désormais `decimal.MaxValue` et son opposé. L'oracle indépendant `BigInt`, calculant `2^96 − 1`, confirme les deux sorties attendues. Les empreintes du corrigé compilé et de la page locale sont identiques à celles de la reprise précédente ; le texte de l'énoncé concorde aussi avec le DOM de la page.

Avec le vrai moteur `runTests`, un adaptateur local et les deux mutants de même empreinte que précédemment :

| Variante | Résultat observé |
|---|---|
| Corrigé | **7/7**, sept appels, aucun arrêt ; les deux bornes renvoient respectivement `79228162514264337593543950335.00` et `-79228162514264337593543950335.00`. |
| Troncature | **3/7**, arrêt au quatrième test, avant les bornes : `wrong_output`, code d'exécution 0. Sur `0.126`, `0.125`, `-0.125`, le mutant renvoie `0.12`, `0.12`, `-0.12` au lieu de `0.13`, `0.13`, `-0.13`. |
| Arrondi par multiplication | **6/7**, arrêt au septième test : `runtime_error`, `System.OverflowException`, code 134, sur la borne positive. Ce rejet n'est pas un `wrong_output`. |

Le mutant par multiplication s'arrête à la borne positive et n'atteint donc pas la ligne négative de cette même entrée. Une exécution séparée de chaque borne confirme que le corrigé réussit les deux, tandis que ce mutant déborde sur chacune. Le résidu de couverture décrit dans l'actualisation précédente est donc **levé pour ces deux mutants précis**, sans preuve d'exhaustivité générale.

La suspension demeure active : indicateur dans la page et route Fastify testée localement avec identité fictive donnant HTTP `503`, `grading_suspended`, et zéro appel au fournisseur remplacé en mémoire. `generate-courses.js --check csharp` confirme les 13 pages synchronisées.

**Empreintes SHA-256 :** catalogue `7ffdea14511f60cf0e32fbad5b32a06e17e69899ac6ceeced4d198adb2fe8a7d` ; liste effective des tests `922833177ab57c8315afeb18111993499611833e3db3334d7dd9d60ac4dbabd0` ; corrigé `8eaba90a1a753f106e8bb9a5e32c1d52edc734b7060ac8a0b4a12c279d61d7fc` ; mutants `6a45046a6f1fa79277606f4827c6567c557e47ed1dde8b3c09a381642d8b550b` et `72743b76555e0b16002664160413e8e59718c566e2f08e5929583270f93b48e1` ; moteur `11d629e4d17edc01eba6a50488f88a21c07e8af57edbd97459f8d8372dc5355e` ; page `fb2d226a62a9954167d0e57155ad8a63c9cb76299da7818761c9031f079683d9`. Les huit fichiers surveillés sont restés identiques pendant le banc.

**Limites :** Roslyn SDK `10.0.401`, runtime .NET `10.0.12`, bwrap sans réseau et compilation dans un `tmpfs`. La route a été exercée sans fournisseur ni authentification réels ; aucun navigateur n'a été ouvert. Les autres exercices et fournisseurs distants ne sont pas rejoués. Aucun code produit, test existant, politique ou fichier `dist/` n'a été modifié. Commande, harnais, empreintes complètes et sorties brutes : `corrections/resultats/lot2-csharp-bornes-independant-journal.txt:762`.

## Historique — relectures précédentes

Les sections suivantes conservent les résultats des versions antérieures ; leurs anciens défauts de couverture ne décrivent pas l'état rejoué ci-dessus.

### Actualisation — arrondi après correction du 30 octobre

**Rejoué :** la règle est désormais explicite dans `server/exercises/csharp.js:856` et dans la page locale `csharp/chapitres/chapitre2.html:253` : arrondi au centime le plus proche, égalité à l'écart de zéro. Leurs énoncés complets concordent après analyse HTML ; `generate-courses.js --check csharp` confirme la synchronisation des 13 pages. Ce contrôle ne comprend pas de rendu navigateur.

Le nouveau test `Arrondi au centime et demi-centimes signés` (`server/exercises/csharp.js:1521`) est au **rang 4 des 7 tests actifs**, dans la limite `MAX_TESTS=7`. Son oracle indépendant en centimes `BigInt` confirme les trois attendus : `0.126 → 0.13`, `0.125 → 0.13`, `-0.125 → -0.13`. Avec le vrai moteur `runTests` et un adaptateur d'exécution local isolé, le corrigé compilé passe **7/7**. Le mutant de troncature historique, de même empreinte SHA-256 que dans le premier banc, passe les trois premiers tests puis s'arrête au quatrième pour **`wrong_output`**, avec code d'exécution 0 : il renvoie respectivement `0.12`, `0.12`, `-0.12`. Il est donc rejeté pour sa sortie, non pour une erreur de compilation ou de dépassement.

Le corrigé compilé a également été comparé à l'oracle sur une entrée indépendante de 15 commandes : les égalités `±0.125 → ±0.13`, `±0.135 → ±0.14`, `±0.005 → ±0.01` et `±1.005 → ±1.01`, les voisins `±1.004` et `±1.006`, `.75`, ainsi que les deux extrêmes `±79228162514264337593543950335`. Pour le maximum positif, la sortie est `79228162514264337593543950335.00` ; pour le minimum, `-79228162514264337593543950335.00`. Les 15 sorties concordent.

**Défaut de couverture résiduel, distinct du corrigé :** un autre mutant synthétique utilisant `(decimal.Round(price * 100m, 0, MidpointRounding.AwayFromZero) / 100m).ToString("F2", CultureInfo.InvariantCulture)` passe **7/7** avec le même moteur. Pourtant, sur `NEW Article("MAX-BOUND", "Maximum", 79228162514264337593543950335)`, il lève `System.OverflowException` et sort avec le code `134`, alors que le corrigé retourne le maximum avec `.00`. Le nouveau test élimine donc bien l'ancien mutant de troncature, mais ne démontre pas la discrimination de cette autre erreur à la borne.

**Suspension :** indicateur présent dans la page ; route Fastify réelle appelée localement avec identité fictive : HTTP `503`, `grading_suspended`, zéro appel au fournisseur remplacé en mémoire. Aucune suspension n'a été levée. Ce n'est pas un test du fournisseur distant ni de l'authentification réelle.

**Empreintes SHA-256 de cette reprise :** catalogue `1d97a361e331d7c6290aaa59720ed105e08b73659ef0c74a25be0ab37bc6778a` ; page `fb2d226a62a9954167d0e57155ad8a63c9cb76299da7818761c9031f079683d9` ; moteur `11d629e4d17edc01eba6a50488f88a21c07e8af57edbd97459f8d8372dc5355e` ; mutant historique `6a45046a6f1fa79277606f4827c6567c557e47ed1dde8b3c09a381642d8b550b` ; mutant de borne `72743b76555e0b16002664160413e8e59718c566e2f08e5929583270f93b48e1`. Les huit fichiers surveillés sont restés identiques durant le banc. La commande exacte, l'ensemble des empreintes et les sorties brutes sont dans `corrections/resultats/lot2-csharp-bornes-independant-journal.txt:495` ; dernier rejeu à `corrections/resultats/lot2-csharp-bornes-independant-journal.txt:726`.

**Limites :** exécution locale sous Roslyn SDK `10.0.401` et .NET `10.0.12`, avec `bwrap`, réseau isolé et compilation en `tmpfs` ; aucune preuve exhaustive pour tous les décimaux ou pour un fournisseur externe. `csb2-c6-e1` et les autres exercices n'ont pas été rejoués dans cette actualisation. Aucun code produit, test existant, fichier `dist/` ou politique n'a été modifié.

### Historique — avant la reprise de l'arrondi

Les sections suivantes conservent le constat et les résultats de la version antérieure. La réserve sur l'absence de règle d'arrondi et le passage 6/6 de l'ancien mutant ne décrivent plus la version actualisée.

#### Conclusion historique

- **Rejoué — deux corrections ciblées :** les corrigés compilés traitent les deux nouveaux cas et les entrées indépendantes essayées. Les deux mutants reproduisant les défauts d'origine sont arrêtés par les nouveaux tests.
- **Défaut de couverture constaté — prix :** une variante synthétique de troncature passe les six tests cachés locaux alors qu'elle échoue sur une valeur maximale explicitement représentable par `decimal`. Elle diverge aussi du corrigé pour un prix à trois décimales. Cela ne signifie pas que le corrigé fourni échoue sur ces entrées.
- **Réserve — prix :** l'énoncé n'indique pas comment arrondir les demi-centimes ; une différence de convention ne suffit donc pas, à elle seule, à établir un défaut du corrigé.
- **Suspension conservée :** les deux soumissions demeurent bloquées. Aucun changement de politique ni levée de suspension.

#### Contexte et version vérifiée

Le constat initial `F03` se trouve à `verification/04-erreurs-a-corriger.csv:4` : les 18 corrigés mémorisaient les entrées cachées. Le suivi à `corrections/suivi.csv:4` indique leur remplacement et la reprise de ces deux bornes, tout en maintenant la suspension. Le présent travail ne vérifie pas les 18 corrigés ni les autres preuves évoquées dans ce suivi.

Les dernières versions locales ont été contrôlées **après** le resserrement signalé par l'utilisateur :

- Prix : `server/exercises/csharp.js:856` et `csharp/chapitres/chapitre2.html:253` imposent une notation décimale simple sans exposant ni séparateur de milliers, représentable par `decimal`, avec zéro initial facultatif.
- Durées : `server/exercises/csharp.js:1296` et `csharp/chapitres/chapitre6.html:196` demandent un cumul mathématique sans limite `Int64`, dans les limites de l'environnement d'exécution ; il s'agit d'une simulation, non d'une promesse concernant une API réelle.

Un parseur HTML a comparé les énoncés complets des deux ateliers générés à ceux du catalogue. `node scripts/generate-courses.js --check csharp`, exécuté en lecture seule et sans réseau, a retourné `[ok] cours à jour (13 pages, 1 cours)`. Les empreintes des sources, pages, route et politique sont identiques pendant le dernier banc et à la dernière relecture. Aucune consultation dans un navigateur ou de fournisseur distant n'a été effectuée.

#### Nouveaux tests et corrigés

Les deux nouveaux tests sont effectivement dans la tranche utilisée par `server/exercises/runner.js` (`MAX_TESTS=7`) : rang 3 sur 6 pour le prix et rang 3 sur 7 pour la durée. Leurs sorties attendues ont été recalculées indépendamment avec des entiers arbitraires. Les résultats ci-dessous proviennent de l'appel direct au vrai moteur `runTests` avec un adaptateur local isolé ; ils ne correspondent pas à une soumission à un service actif.

| Exercice | Nouveau cas caché | Corrigé | Mutant ciblé compilé |
|---|---|---|---|
| `csb2-c2-e2`, `server/exercises/csharp.js:1516` | `NEW Article("DECI", "Puce", .09)` attend `Prix=0.09`. | 6/6 | Analyse sans branche pour `.09` : `Prix=9.00`, rejet au troisième test. |
| `csb2-c6-e1`, `server/exercises/csharp.js:1621` | `9223372036854775807` puis `2` ms attend un total de `9223372036854775809` ms. | 7/7 | Accumulateur `long` : `-9223372036854775807` ms, rejet au troisième test. |

Les corrigés et les mutants ont été compilés avec Roslyn, puis exécutés dans un second confinement sans dépôt ni réseau. Sur une entrée indépendante de 11 commandes, le corrigé prix donne notamment `.75 → 0.75`, `-.35 → -0.35`, et accepte les valeurs extrêmes de `decimal`. Quatre jeux indépendants de durées donnent notamment `9223372036854775806 + 2 + 4 = 9223372036854775812`, `2 × 9223372036854775807 = 18446744073709551614`, ainsi qu'une durée individuelle de `10^60` suivie de `7`. Les sorties ont été comparées ligne par ligne à un oracle `BigInt` distinct. Les bornes de ressources restent applicables ; `1.` a aussi été essayé mais sa grammaticalité n'est pas explicitée.

#### Résidu : couverture et arrondi

La variante synthétique remplace le formatage du corrigé par `(decimal.Truncate(price * 100m) / 100m).ToString("F2", CultureInfo.InvariantCulture)`. Dans le banc local, **elle obtient 6/6**, y compris le nouveau test `.09`. Deux entrées indépendantes montrent la limite de cette couverture :

1. `NEW Article("TRONC", "Millieme", 0.126)` : le corrigé et l'oracle donnent `Prix=0.13`, la variante `Prix=0.12`. Le texte demande deux décimales sans expliciter la règle de conversion.
2. `NEW Article("TRONC-MAX", "Borne", 79228162514264337593543950335)` : le corrigé renvoie `Prix=79228162514264337593543950335.00` ; la variante termine avec `System.OverflowException` et le code 134. La valeur est dans le domaine annoncé, indépendamment de toute convention d'arrondi.

Pour les demi-centimes, le corrigé sous le runtime local produit `0.125 → 0.13` et `-0.125 → -0.13`, tandis qu'un arrondi au pair donnerait respectivement `0.12` et `-0.12`. La notation exponentielle essayée séparément est désormais hors domaine ; sa divergence exploratoire n'est pas comptée comme défaut.

#### Suspension, méthode et limites

Les deux pages portent l'indicateur de suspension. Un appel local à la vraie route Fastify, avec identité fictive et fournisseur remplacé en mémoire par un compteur, renvoie pour chacun HTTP `503` et `grading_suspended`, avec **zéro appel fournisseur**. La projection cliente ne contient ni solutions ni tests. Ceci contrôle le branchement local, pas l'authentification ou le fournisseur réels.

Le banc utilise Node, Roslyn SDK `10.0.401` et runtime .NET `10.0.12` ; le compilateur et les programmes sont confinés par `bwrap`, les compilations dans un `tmpfs` jetable. Les sorties, ressources et versions peuvent différer chez un fournisseur distant. Ces échantillons ne prouvent pas tous les cas de la grammaire ni une généralisation complète des 18 exercices. Aucun contenu de cours, test existant ou fichier `dist/` n'a été modifié ; aucun Git ni réseau utilisé.

Le script complet, ses commandes de reproduction, les sorties brutes, les empreintes et les essais initiaux de harnais conservés comme historique figurent dans `corrections/resultats/lot2-csharp-bornes-independant-journal.txt:1` ; le dernier banc commence à `corrections/resultats/lot2-csharp-bornes-independant-journal.txt:457`.
