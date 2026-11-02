# Relecture du lot 1 sous un angle novice

Date de la lecture : 30 octobre 2026.

## Périmètre et méthode

Le tirage initial enregistré dans `corrections/resultats/navigateur-lot1-echantillon-initial.json` indique la graine `20261029`, une population de 408 chapitres et les cinq pages suivantes, dans cet ordre :

1. `linux/chapitres/chapitre5.html`
2. `b3-pfsense/chapitres/chapitre2.html`
3. `docker/chapitres/chapitre2.html`
4. `b1-git/chapitres/chapitre1.html`
5. `probabilites/chapitres/chapitre4.html`

Ces paramètres et cette liste ont été vérifiés dans le fichier enregistré ; le tirage et la population de 408 n'ont pas été recalculés. La graine n'est pas une date de consultation. Le script qui a produit le relevé décrit la sélection dans `corrections/outils/navigateur-lot1.js:12`.

Les cinq pages ont été chargées localement dans Chromium, sans réseau. Le texte visible de leur corps a été lu intégralement : navigation, cours, exemples, grilles ou éditeurs d'exercices, indices, QCM, synthèses et bas de page. Les six éléments dépliables de chaque page ont été ouverts et une réponse a été sélectionnée pour chacune des huit questions de QCM par page afin d'afficher les explications. Aucune réponse d'exercice n'a été soumise. Les prérequis ont été recherchés de façon ciblée dans les chapitres précédents cités ci-après, qui n'ont pas fait l'objet d'une lecture intégrale.

Le relevé ancien utilise `main.textContent` (`corrections/outils/navigateur-lot1.js:172`) : pour KaTeX, cette extraction mêle le MathML destiné à l'accessibilité et la couche HTML d'affichage. La présente lecture a distingué ces deux couches. Sur les pages sélectionnées, 15 expressions KaTeX sont présentes en probabilités et une en pfSense, sans élément `.katex-error` détecté ; les trois autres pages n'en présentent pas. La zone binomiale et Poisson a aussi été examinée sur une capture conservée uniquement en mémoire : le coefficient affiche bien `n` au-dessus de `k` et la fraction de Poisson son numérateur au-dessus du dénominateur. L'ordre textuel des éléments superposés ne doit donc pas être interprété comme une inversion visuelle. Les requêtes de polices externes ont été bloquées ; la typographie peut différer d'un affichage connecté.

Il s'agit d'une **lecture par une IA, en se plaçant du point de vue d'un débutant**, et non d'une relecture humaine ou d'un test auprès d'apprenants. Les difficultés ci-dessous sont des risques déduits des contenus, pas des difficultés observées chez une personne. La lecture ne démontre ni la maîtrise des prérequis, ni l'efficacité pédagogique, ni l'accessibilité avec un lecteur d'écran ; elle ne couvre pas les autres pages, les fonctionnalités non ouvertes ou les différentes tailles d'écran. Aucun fournisseur de correction ni service distant n'a été sollicité.

## 1. Linux B2 — chapitre 5

- **Prérequis et point d'appui.** La ligne de commande est introduite dans `linux/chapitres/chapitre1.html:66`. Le chapitre lu définit les paramètres `$1`, `$#` et `$@` (`linux/chapitres/chapitre5.html:82`), puis montre la lecture de `n` et une boucle (`linux/chapitres/chapitre5.html:95`). L'explication de la dernière ligne sans retour à la ligne est utile pour comprendre le comportement de `read` (`linux/chapitres/chapitre5.html:103`). Ces passages existent ; cela ne prouve pas qu'un élève les maîtrise.
- **Ambiguïté constatée, puis corrigée.** L'exercice « Trouver le maximum » demandait de lire `n` entiers sans préciser que `n` doit être positif, alors que son amorce lisait une première valeur et que la méthodologie conseillait le cas vide. L'énoncé précise maintenant `n ≥ 1` (`linux/chapitres/chapitre5.html:204`) et la méthode réserve `n = 0` aux domaines qui l'autorisent (`linux/chapitres/chapitre5.html:365`). Deux tests supplémentaires couvrent une seule valeur et une série entièrement négative ; `corrections/resultats/novice-integrite-avant.log` et `corrections/resultats/novice-integrite-apres.log` conservent les résultats avant et après.

### Défaut historique des caractères `$` : déjà corrigé

Ce point est distinct de l'ambiguïté sur le maximum. Le suivi classe **F27** comme corrigé et situe le constat historique dans `b1-linux/chapitres/chapitre3.html:194` (`corrections/suivi.csv:28`). Le chapitre Linux B2 ici échantillonné faisait partie des contrôles associés : l'explication affiche littéralement `$1` et `$0` (`linux/chapitres/chapitre5.html:285`) et le résumé affiche `$1`, `$#` et `$@` (`linux/chapitres/chapitre5.html:374`). Dans la lecture locale actuelle, ces textes sont présents et cette page ne contient pas de rendu KaTeX ; le contrôle enregistré cible également ces deux éléments (`corrections/outils/navigateur-lot1.js:137`). Cela confirme ces occurrences, sans prétendre contrôler tous les `$` de tous les cours.

## 2. pfSense B3 — chapitre 2

- **Prérequis et point d'appui.** Les interfaces WAN/LAN sont présentées au chapitre précédent (`b3-pfsense/chapitres/chapitre1.html:111`), ainsi que l'adressage CIDR (`b3-pfsense/chapitres/chapitre1.html:161`). Dans l'exercice 2, les deux paquets et les règles successives donnent un exemple concret de première correspondance : le port 443 utilise R1, le port 80 utilise R2 (`b3-pfsense/chapitres/chapitre2.html:276`).
- **Consigne abîmée, puis corrigée.** L'exercice 1 affichait littéralement `...></code>.` et ne définissait plus clairement le format des données. La nouvelle consigne présente `ALIAS_DEF` et `CHECK_ALIAS`, limite le modèle à l'égalité de valeurs unitaires et explique la saisie multiligne (`b3-pfsense/chapitres/chapitre2.html:203`).
- **Règle manquante, puis précisée.** L'exercice 3 ne définissait pas la sortie du cas `SYN_SENT` âgé de 5 secondes. La consigne distingue désormais explicitement `age_sec > 30` de `age_sec <= 30`, et présente le seuil et les étiquettes comme un modèle fictif, non comme un diagnostic réel (`b3-pfsense/chapitres/chapitre2.html:330`). Deux réponses erronées sont distinguées aux limites 30 et 31 secondes ; les six contrôles ciblés sont enregistrés dans `corrections/resultats/pfsense-ciblage-final.txt`.
- **Point technique à confirmer.** L'ancienne formulation « UDP sans état natif » a été retirée de l'exercice ; son étiquette `STATELESS_UDP` est maintenant explicitement distinguée du suivi réel des flux (`b3-pfsense/chapitres/chapitre2.html:341`). L'affirmation d'une recherche en `O(1)` « sans dégrader le débit » (`b3-pfsense/chapitres/chapitre2.html:135`) reste à qualifier ; l'explication du QCM mentionne `O(1)` ou `O(log N)` (`b3-pfsense/chapitres/chapitre2.html:402`). Aucun résultat de performance n'a été vérifié ici.

## 3. Docker B2 — chapitre 2

- **Prérequis et point d'appui.** Le chapitre 1 présente conteneurs et isolation (`docker/chapitres/chapitre1.html:82`) puis relie image et conteneur dans un exemple de commande (`docker/chapitres/chapitre1.html:188`). Dans le chapitre 2, l'exemple de déduplication est calculable : `200 + 185 = 385 Mo` apparents, puis `285 Mo` après retrait d'une couche commune de `100 Mo` (`docker/chapitres/chapitre2.html:207`).
- **Modèle de référence à cadrer.** L'exercice 2 précise qu'il ne valide pas la longueur des digests et qu'il n'écrit pas une nouvelle référence (`docker/chapitres/chapitre2.html:254`). Son exemple `sha256:abcd1234ef` contient 10 chiffres hexadécimaux, alors que la représentation hexadécimale complète d'un SHA-256 en compte 64 (`docker/chapitres/chapitre2.html:261`). La note affirme néanmoins une normalisation conforme à la spécification (`docker/chapitres/chapitre2.html:267`). La simplification est annoncée, mais cette conclusion générale peut induire en erreur : préciser que l'exemple est abrégé et limiter la revendication de conformité. Aucun registre Docker n'a été interrogé.
- **Sécurité : formulation trop absolue.** L'explication du QCM promet une correspondance garantie « à 100 % » et « sans risque de falsification » grâce au seul digest (`docker/chapitres/chapitre2.html:396`). Un digest sert à contrôler un contenu par rapport à une valeur attendue ; il ne suffit pas à établir que cette valeur ou sa provenance est digne de confiance. Distinguer intégrité, authenticité et confiance dans la référence éviterait une conclusion trop forte.
- **Autre point à vérifier.** La phrase selon laquelle chaque instruction citée, notamment `FROM`, crée une couche (`docker/chapitres/chapitre2.html:89`) mérite vérification dans la documentation applicable ; aucune construction d'image n'a été effectuée.
- **Limite de l'atelier.** La suspension de la correction automatique est affichée pour les trois exercices (`docker/chapitres/chapitre2.html:194`, `docker/chapitres/chapitre2.html:245`, `docker/chapitres/chapitre2.html:300`). La présente lecture ne valide pas leur correction distante.

## 4. Git B1 — chapitre 1

- **Prérequis et point d'appui.** Le schéma `copie de travail → index → dépôt local` (`b1-git/chapitres/chapitre1.html:122`) et l'analogie « table, plateau, armoire » (`b1-git/chapitres/chapitre1.html:127`) donnent des repères concrets. Les ateliers demandent toutefois de manipuler des boucles et des états en Bash dès le premier chapitre (`b1-git/chapitres/chapitre1.html:144`). L'accueil annonce l'emploi de Bash (`b1-git/index.html:84`), mais la théorie du chapitre ne prépare pas explicitement ces constructions ; les amorces et indices aident partiellement. Ce risque correspond à **F223**, déjà reporté au lot 3 (`corrections/suivi.csv:224`) : il est hors lot 1, même si la page figure dans cet échantillon.
- **Modèle `status` constaté, puis corrigé.** L'ancien exemple classait un fichier indexé puis modifié uniquement comme modifié. L'exercice distingue maintenant les deux états, qui peuvent se recouper, et explicite les limites du modèle (`b1-git/chapitres/chapitre1.html:246`). Dans un dépôt temporaire, Git renvoie `AM main.py` après indexation puis modification et `A  main.py` après un nouvel ajout ; un fichier modifié mais non ajouté reste `??`. La simulation reproduit ces cas. La consigne, les indices, le corrigé et les tests ont été alignés ; deux variantes erronées sont rejetées (`corrections/resultats/novice-integrite-apres2.log`). Documentation Git consultée le 30 octobre 2026 : https://git-scm.com/docs/git-status.

## 5. Probabilités B2 — chapitre 4

- **Prérequis et point d'appui.** Les notions nécessaires sont introduites auparavant : indépendance (`probabilites/chapitres/chapitre1.html:108`), coefficient binomial (`probabilites/chapitres/chapitre2.html:107`), variable aléatoire (`probabilites/chapitres/chapitre3.html:82`) et espérance (`probabilites/chapitres/chapitre3.html:92`). Le chapitre étudié rappelle les conditions de la binomiale et détaille `P(X = 2) = 0,3125` pour `n = 5`, `p = 0,5` (`probabilites/chapitres/chapitre4.html:94`). Pour Poisson avec `λ = 2` et `k = 1`, `2e⁻² ≈ 0,2707` (`probabilites/chapitres/chapitre4.html:104`). Ces deux valeurs ont été recalculées localement.
- **Raccourci pédagogique à nuancer.** L'encadré de reconnaissance associe le comptage d'événements rares et l'absence de nombre fixé d'épreuves à Poisson (`probabilites/chapitres/chapitre4.html:97`). Cette seule rareté ne suffit pas à établir le modèle. La section suivante mentionne un taux constant et l'absence de mémoire (`probabilites/chapitres/chapitre4.html:102`) : relier explicitement le raccourci à ces hypothèses aiderait à choisir une loi sans appliquer la règle mécaniquement. La formule elle-même n'est pas mise en cause par cette observation.

## Suites et limites de classement

Les éléments explicitement rattachés au suivi sont F27, déjà corrigé, et F223, déjà reporté au lot 3. Les autres points ont été signalés pour examen : les corrections Linux et Git ci-dessus ont été appliquées après la lecture, sans leur attribuer artificiellement un identifiant du registre initial. Les réserves techniques indiquées comme telles nécessitent une vérification documentaire ou pratique ultérieure.

## Reprise du retour de correction

- Une erreur sur un test caché annonce maintenant qu’un cas n’est pas validé et invite à essayer l’exemple fourni ou d’autres valeurs, sans afficher un diagnostic vide ni l’attendu caché. Pour un cas d’analyse, l’élève retrouve sa réponse et une indication générale ; les données de ce cas demeurent visibles.
- Un échec sur l’exemple affiché est distingué d’un échec sur un test caché. Pour les deux exercices concernés, une correction complète peut consommer huit appels ; un quota épuisé en cours de correction est signalé plutôt que présenté comme une erreur de programme.
- Dans l’atelier SQL B1 sans brouillon antérieur, la dernière requête affiche effectivement les 23 voitures annoncées ; un brouillon préexistant n’est pas remplacé.
- Ces appréciations sont une relecture par IA appuyée par des tests Chromium et des fournisseurs simulés, non un essai auprès d’étudiants ni un test avec lecteur d’écran. Le retour moins détaillé peut nécessiter de faire soi-même d’autres essais ; l’efficacité pédagogique réelle reste à évaluer.
