# Rejouer les contrôles des lots 0 et 1

Le démarrage du lot 3 et le banc pilote de réactivation sont décrits dans `lot3-tranche1a-rapport.md`. Les tranches suivantes figurent dans `lot3-tranche1b-rapport.md`, `lot3-tranche1c-rapport.md` et `lot3-tranche1d-rapport.md` ; cette dernière contient le tableau actualisé des 68 cours. La relecture pédagogique reste incomplète.

Pour l'état actuel avant le lot 3, les 18 S0, les suspensions et leurs limites, consulter `rapport-prelot3.md`. L'inventaire individuel des 289 fiches est `resultats/prelot3-preuves-289.tsv` et les preuves des quatre méthodes sont `resultats/prelot3-methodes.json`. Ces résultats complètent les rapports historiques ci-dessous sans en modifier la portée.

Depuis le lot 1, partie 2, `npm run audit:integrite` combine le contrôle structurel et `npm run audit:generalisation`. Ce dernier exécute les corrigés pour lesquels deux jeux nouveaux et des oracles séparés sont disponibles ; il fournit aussi un statut explicite pour chaque autre fiche. Pour cinq exercices SQL de création, les contrôles après création sont nouveaux mais la base initiale vide est déjà connue. Une fiche non évaluée ou un contrôle échoué entraîne un code 1, une erreur d’infrastructure un code 2. Les anciens rapports comportant `matchedAllHiddenInputs` sont des archives de l’heuristique abandonnée, pas une preuve de mémorisation.

Le banc de généralisation exige Linux, bubblewrap, Python 3, Node 22 et, selon les langages, leurs runtimes respectifs. Il ne monte ni le répertoire personnel, ni le réseau hôte, ni le catalogue ou les oracles dans le confinement de chaque programme. Ses limites et la couverture observée figurent dans `rapport-lot1-partie2.md` ; sans cgroup ni profil seccomp dédié, ce confinement n’est pas une isolation de production pour du code hostile. Les grilles d’analyse sont des réponses indexées par cas, non des algorithmes paramétriques : elles restent non évaluées pour ce contrôle.

Le contrôle agrégé rejoue aussi une nouvelle entrée à attendu manuel pour chacun des 72 exercices C#, Docker, Linux B3 et GitHub B3. Ces témoins sont comparés aux anciens jeux reconnus, mais la nouveauté est littérale et un seul cas ne remplace pas les deux jeux à oracle séparé. Lorsqu’il manque ces derniers, l’état global de la fiche reste « non évalué » malgré ce rejeu partiel. Les détails du banc figurent dans `outils/sondes/nouvelles-fixtures-suspendus/README.md`.

Des paquets complémentaires définissent des entrées et oracles pour les programmes d'algorithmique B3, Linux B2, Java B2 et API Flask B2. Les restrictions de domaine des oracles B3, Linux et Flask sont explicitées dans leurs modules ; l'oracle Java borne notamment les séries, les entiers et les cas d'arrondi. `fl2-c4-e1` reste non évalué au critère de nouveauté : tous les scénarios nominaux définis sont déjà connus. La comparaison des entrées et des sources est bornée aux représentations reconnues et ne démontre pas l'absence d'équivalence sémantique ou de mémorisation sous tout encodage. Les empreintes des manifestes et oracles sont vérifiées avant l'agrégation ; leur modification impose un rejeu.

Le relevé individuel des 139 occurrences SQL B2/B3 figure dans `qualification-sql-lot1-partie2.md`. Le rapport de partie 2 indique les inventaires par identifiant, les témoins croisés des exercices suspendus et leurs limites. Une distinction croisée établit uniquement que deux tests différents séparent deux fautes choisies ; elle ne démontre pas que tous les attendus sont corrects ni que les jeux sont secrets sous toutes leurs représentations.

Pour reconstruire localement l’inventaire, après les rejeux de variantes décrits dans le rapport :

```sh
sortie=$(mktemp -d /tmp/revi-couverture-XXXXXXXX)
node corrections/outils/sondes/couverture/verifier-grilles.js "$PWD" "$sortie"
node corrections/outils/sondes/couverture/recenser.js "$PWD" "$sortie"
```

Ces sorties, comme les rapports de généralisation et les fixtures, peuvent contenir des données d’évaluation : les conserver hors d’un emplacement servi aux étudiants. L’absence d’une preuve de rejet ou d’indépendance dans l’inventaire ne prouve pas l’absence d’une variante ou d’un test dans le catalogue.

Les résultats bruts et codes de retour sont conservés dans `resultats/`. Un code 1 est attendu pour les contrôles d’audit actuellement rouges ; il ne signifie pas que tous leurs candidats sont des erreurs confirmées. Le rapport explique la couverture et les limites de chaque contrôle.

Les journaux reproduisent les sorties octet pour octet, y compris les espaces de fin de ligne émis par certains diagnostics ; ces espaces ne sont pas des modifications de code source.

Le registre `suivi.csv` distingue les sources héritées de l’audit des sources consultées et datées pendant le lot 1. L’absence d’une source web vérifiée est signalée explicitement, sans retirer la preuve locale éventuelle. `resultats/suivi-lot1-validation.txt` documente la structure du registre et le refus de l’écraser lors d’une seconde initialisation.

Depuis la racine du projet, après installation des dépendances npm et de l’exécutable `hunspell` :

```sh
npm run audit:pages
node corrections/outils/verifier-code-katex.js
npm run audit:sql
npm run audit:langue
npm run audit:integrite
```

Les contrôles de pages et de SQL acceptent `-- --reference reparation-k20`. Avec cette option, le contrôle SQL relit les pages et le schéma de la référence, **mais utilise toujours le catalogue d’exercices et le moteur du dossier local**. Le contrôle de langue compare le DOM statique à `main` et accepte également cette option. L’analyse de pages combine HTML, formules, égalité DOM/source et liens ; le SQL et le correcteur linguistique produisent des candidats à qualifier.

Les valeurs qui suivent `IDENTIFIED BY` sont masquées dans les journaux SQL, y compris ceux du lot 0 ; les requêtes sont exécutées sans cette modification. Les fragments de syntaxe, les dialectes autres que SQLite et les exemples qui préparent une nouvelle base doivent être distingués des requêtes complètes censées fonctionner sur le parc déjà initialisé.

Pour le lot 1, `node corrections/outils/analyser-pages.js --strict` inclut aussi les avertissements KaTeX dans les erreurs de contrôle. Une seconde analyse HTML indépendante nécessite Python et `html5lib` 1.1 :

```sh
python3 -m venv /tmp/revi-html5lib
/tmp/revi-html5lib/bin/pip install html5lib==1.1
/tmp/revi-html5lib/bin/python corrections/outils/analyser-html5lib.py
CHROME_BIN=/usr/bin/chromium node corrections/outils/navigateur-lot1.js
```

Le parcours Chromium lance un serveur local temporaire, bloque les requêtes hors de ce serveur et utilise une graine fixe pour sélectionner les pages modifiées. Il ne vérifie pas l’authentification réelle ni les services externes.

Le contrôle complémentaire `verifier-code-katex.js` relève des collisions probables entre délimiteurs mathématiques et variables dans les nœuds de texte HTML analysés par parse5. Un résultat vide ne prouve pas l’absence de toutes les erreurs de sens ou des contenus créés dynamiquement. `navigateur-indices-lot1.js --reference c2ece0b` rejoue les 66 indices ciblés sur les pages historiques ; sans `--reference`, il les vérifie sur le dossier courant.

Le contrôle d’intégrité signale aussi les données des cas notés déjà présentes dans le squelette des exercices `analyse`. Il échoue si une grille contient moins de deux autres tests non repérés comme visibles. Une donnée visible n’est pas une réponse divulguée ; inversement, une donnée non repérée n’est pas nécessairement cachée ni indépendante.

Dans les grilles d’analyse, Entrée ajoute une ligne et Ctrl+Entrée ou Cmd+Entrée lance la vérification. Le mode texte conserve les réponses dont une ligne commence par `#`, `A_COMPLETER`, un en-tête de cas ou `\=` grâce à un préfixe `\=` et à la première ligne `# Format REVI-ANALYSE:1`. Les anciens brouillons sans cet en-tête restent lisibles. Si les en-têtes des cas ont été altérés, le texte est conservé sans être soumis ; rétablissez les en-têtes avant de revenir au formulaire. Si les cas ont changé depuis un ancien brouillon, copiez d’abord son contenu, puis réinitialisez l’exercice pour retrouver la nouvelle grille : la réinitialisation efface le brouillon local.

Le banc de programmes et les sondes hostiles s’exécutent uniquement dans une copie temporaire en lecture seule avec `bubblewrap`, sans réseau ni environnement utilisateur :

```sh
JAVA_HOME=/chemin/vers/jdk \
POWERSHELL_DIR=/chemin/vers/powershell \
  npm run audit:banque

JAVA_HOME=/chemin/vers/jdk \
POWERSHELL_DIR=/chemin/vers/powershell \
  npm run audit:solutions

npm run audit:execution
npm run audit:politique
```

Le dernier contrôle teste les deux routes et les scénarios hostiles sans réseau ni `HOME`, en simulant les fournisseurs. La sûreté des fournisseurs réels reste à vérifier séparément ; leur indisponibilité ne réactive aucun moteur local.

L’instantané écarte aussi les fichiers d’environnement, les clés/certificats et les résultats d’audit ; seuls les outils et les fixtures nécessaires sont montés dans `corrections/`. Les fichiers originaux restent inchangés.

Le banc historique requiert un JDK complet, PowerShell et les chemins .NET SDK `10.0.401` et références `10.0.12` indiqués par le lanceur ; `resultats/versions-outils.txt` donne les versions utilisées. PowerShell a été installé dans un répertoire temporaire pour cette vérification et doit être disponible à nouveau pour un rejeu ultérieur. L’exécutable `bwrap` doit pouvoir créer des espaces de noms non privilégiés. Le lanceur copie les fichiers suivis par Git : il faut donc ajouter les nouveaux fichiers du projet à l’index ou les committer avant de les inclure dans un rejeu.

Le banc `fixtures/banc-360.json` conserve les 360 variantes pour éviter que la réécriture des corrigés fasse disparaître les mutations. Neuf variantes ont été adaptées à des contrats modifiés ou à un statut de sortie shell : leur version antérieure est conservée dans `code_initial`, son résultat est aussi rejoué et leur adaptation est explicitée. Elles ne sont donc pas strictement identiques à la mesure initiale. Le banc couvre 180 des 1 250 exercices ; 1 070 exercices ne disposent pas encore de deux variantes dans ce banc. Des erreurs de compilation ou d’exécution sont signalées comme non évaluées. Les variantes doivent être revues si le contrat d’un exercice change. Les scripts historiques d’origine sont conservés sous `outils/sondes/` avec une adaptation de leurs chemins et une distinction entre rejet et échec d’exécution.

Pour `ws2-c4-e3` et `fl2-c4-e1`, `verifyFirstExample` ajoute l’évaluation du premier exemple affiché après les sept tests cachés ; cet exemple public ne compte pas comme un cas caché. Une correction complète peut donc consommer huit appels, chacun soumis au quota. Les anciens cas restent en place. Le test `tests/integrite-cas-lot1.test.js` vérifie notamment les variantes dans `bubblewrap` ; il nécessite Python et, pour les cas PowerShell, un répertoire `POWERSHELL_DIR` contenant `pwsh`.

Le nouveau schéma B1 rend les 18 variantes historiques de neuf exercices SQL non comparables : `fixtures/banc-360-requalifications-lot1.json` les identifie sans effacer le banc d’origine. Les variantes adaptées au schéma courant sont vérifiées séparément dans `tests/sql-lot1-variants.test.js`. Le banc `node corrections/outils/sondes/mutations-analyse-lot1.js` vérifie d’autres variantes pour les grilles d’analyse ; ses cas sont visibles par l’élève et certaines mutations ne contrôlent que la structure d’une réponse.

`resultats/reprise-sql-b1-qualification.md` distingue les candidats B1 nécessitant une base vierge ou une vue préalable des notations, phrases et exemples MySQL. `tests/sql-lot1-examples.test.js` rejoue les initialisations et la vue avec sql.js puis SQLite natif. L’extracteur conserve aussi les retours `<br>` pour éviter de concaténer les instructions. Cette qualification ne modifie pas le résultat rouge de l’inventaire SQL brut et ne valide pas les 139 échecs B2/B3.

Pour préserver le `dist/` local, la suite et la construction peuvent être rejouées dans une copie temporaire isolée avec `bash corrections/outils/rejouer-isole.sh suite` et `bash corrections/outils/rejouer-isole.sh build`. Ces commandes ne prouvent pas l’isolation des fournisseurs distants ni la qualité pédagogique de tous les contenus.

Pour inclure les cas PowerShell dans la suite isolée, fournir `POWERSHELL_DIR=/chemin/vers/powershell` à la commande `suite` ; sans ce runtime, les cas correspondants sont indiqués comme ignorés. Les trois sondes de politique ignorées par la suite générale restent exécutées séparément par `npm run audit:politique`.

La comparaison historique des limites mémoire a été exécutée avec Node 22.23.2 ; les validations de la partie 2 utilisent Node 22.23.4. Avec Node 26.10.0, le sous-test du plafond mémoire SQLite échoue avant de démarrer sous sa limite de données de 512 Mio ; les autres sous-tests du worker passent. Aucun assouplissement de la limite n'a été retenu. Les reproductions comparées sont conservées sous `resultats/sql-worker-node22-avant.txt`, `resultats/sql-worker-node26-avant.txt`, `resultats/sql-worker-node22-restaure.txt` et `resultats/sql-worker-node26-restaure.txt`. Ce constat concerne le test isolé et ne démontre pas un échec général du produit sous Node 26.

Les fichiers `fixtures/` et les résultats peuvent contenir des solutions ou des données d’évaluation : ils ne doivent pas être servis aux étudiants. La protection du serveur local et l’absence de ces répertoires dans la construction ont été vérifiées, sans déploiement.
