# Lot 0 — préparation et mesures de référence

**Date : 29 octobre 2026. Branche : `corrections-lot-0`, créée depuis `reparation-k20` (`463e40b`).**

La préparation et les mesures ci-dessous sont livrées, mais **la porte du lot 0 n’est pas entièrement franchie** : plusieurs contrôles ne couvrent pas encore tout le périmètre demandé. Le lot 1 n’a pas été commencé. Aucun déploiement n’a été effectué.

## Registre et portée

- `suivi.csv` contient les 227 constats, chacun affecté à un ou plusieurs lots et doté d’une gravité et d’un statut : **0 corrigé, 0 nuancé, 0 refusé, 227 reportés**. Une suspension temporaire ne corrige pas le défaut de fond.
- Après reclassement proposé : **136 S0, 86 S1, 5 S2**, contre 98 S0, 119 S1 et 10 S2 auparavant. Mouvements : 42 S1 → S0, 5 S0 → S1, 4 S2 → S1 et 1 S2 → S0. Cette hiérarchisation reste à contre-vérifier ; elle ne constitue pas une validation individuelle de toutes les sources héritées.
- Les URL du champ `source_web_heritee_audit` proviennent du registre du vérificateur. Elles ne sont pas toutes présentées comme revérifiées ici. Les cinq sources relues pour les reclassements ci-dessous sont journalisées séparément.
- Les documents de vérification préexistants ont été conservés. Les fichiers de cours n’ont pas été réécrits : les seuls changements visibles sont les avis nécessaires à la suspension des évaluations.

## Mesure temporaire de sécurité

Avant : les exercices C#, Docker, Linux B3 et GitHub B3 pouvaient recevoir une note malgré des corrigés mémorisant les tests. Après : la politique centrale `server/exercises/grading-policy.js` suspend les soumissions pour **72 exercices** ; l’API répond `503` avec le motif `grading_suspended`, avant exécution et sans consommer de quota. Le générateur ajoute un avis et le bouton de validation est désactivé, y compris après un changement d’état du laboratoire. Les exemples et l’exécution libre restent accessibles.

La mesure concerne F03 et F204, ainsi que les cas F212 à F215 ; ces constats restent **reportés**. Il ne faut rétablir la notation qu’à la fin du lot 1B, après remplacement et vérification des corrigés et des tests. Les quatre tests dédiés couvrent les 72 soumissions, l’accès aux chapitres, les avis générés et un cours non concerné.

Les répertoires `verification/` et `corrections/` peuvent contenir des données d’évaluation : le serveur local les refuse, y compris après normalisation de chemins ; un test dédié le vérifie. Ils sont absents de la construction isolée (`resultats/dist-dossiers-prives.txt`). Cela ne constitue pas une vérification d’un futur déploiement.

## Tableau des contrôles — avant → après

Les comparaisons utilisent la référence `reparation-k20` et le dossier modifié. Une cellule « rouge » signale un contrôle qui échoue ou une couverture incomplète, pas une correction effectuée. Les sorties brutes sont dans `resultats/` ; les fichiers `.stderr.txt` et `.exit.txt` complètent les sorties JSON lorsqu’ils existent.

| Annexe A | Avant → après | État et limites |
|---|---|---|
| 1. HTML | 944 pages suivies ; 716 diagnostics du parseur, 123 éléments inconnus et 4 éléments de métadonnées dans des cartes ou questions → mêmes nombres | **Rouge.** Parseur réel `parse5` ; chaque diagnostic reste à qualifier. Le parcours ne couvre pas les fichiers HTML non suivis ni le contenu créé dynamiquement. `pages-avant.json`, `pages-apres.json`. |
| 2. KaTeX | 2 800 expressions textuelles examinées, 11 erreurs de rendu → idem | **Rouge et partiel.** KaTeX fourni par le site rend les expressions extraites ; `acorn` examine 830 appels d’auto-rendu en scripts intégrés. Les scripts externes, options dynamiques et expressions construites à l’exécution ne sont pas exhaustivement couverts ; aucune absence d’erreur n’est garantie pour `<pre>/<code>`. `pages-*.json`. |
| 3. DOM/source | 55 éléments absents du DOM et 3 différences textuelles → idem | **Rouge.** Sur `b3-veille`, un navigateur indépendant retrouve 14 cartes sur 36 et 2 questions sur 8, confirmant F01 et F02. Les sélecteurs utilisés ne représentent pas nécessairement tous les gabarits possibles. `pages-*.json`, `navigateur-lot0.json`. |
| 4. SQL | 255 extraits candidats dans 58 pages : 179 échecs d’exécution et 38 fragments écartés → idem ; 162 essais de 54 exercices SQL passent → idem | **Rouge et partiel.** `sql.js` exécute les extraits sur le schéma du simulateur. Les 179 échecs ne sont pas 179 fautes établies : certains exemples sont fragmentaires, utilisent d’autres schémas ou dialectes, ou illustrent une erreur. F05 est confirmé : `SELECT nommarque, pays FROM Marque` échoue sur la colonne `pays`. Les requêtes noyées dans la prose et les résultats pédagogiques ne sont pas tous vérifiés. Avec `--reference`, le catalogue d’exercices reste celui du dossier local ; il était inchangé ici. `sql-*.json`. |
| 5. Solutions et variantes | 180 solutions et 360 variantes historiques : 16 variantes acceptées, 343 rejetées, 1 non évaluée → mêmes nombres | **Rouge et incomplet.** Les 1 070 autres exercices n’ont pas deux variantes dans ce banc. La suite couvre 1 178 solutions ; un contrôle isolé complémentaire exécute les 72 solutions Java, PowerShell et C# qu’elle ignore : 72/72 passent leurs tests existants avant et après. Cela ne démontre pas leur généralité. Les 14 variantes de sept exercices disposent d’un témoin synthétique ; les autres n’ont pas toutes un contre-exemple indépendant. `banc-360-*.json`, `solutions-*.json`. |
| 6. Intégrité des attendus | 72 corrigés fortement suspects de mémorisation, 2 autres candidats à qualifier, 18 attendus présentant le motif de lignes fusionnées → idem | **Rouge.** Le contrôle utilise les entrées et la détection d’encodage constatés, ainsi que `bash -n` pour 108 scripts ; il ne détecte pas toutes les stratégies de mémorisation ou de fusion possibles. `integrite-*.json`. |
| 7. Langue | 42 mots nouveaux inconnus du dictionnaire et F29 repéré → idem | **Rouge et partiel.** Hunspell a examiné 26 435 mots simples ; 8 423 mots inconnus comprennent du vocabulaire technique ou étranger. 11 428 mots composites ne lui ont pas été soumis ; textes dynamiques, mots coupés et accords ne sont pas couverts exhaustivement. Les 42 candidats doivent être relus. `langue-*.json`. |
| 8. Liens | 19 877 liens locaux examinés ; aucun fichier absent détecté par cette méthode et 183 fragments manquants candidats → idem | **Rouge et partiel.** Les ancres peuvent être créées dynamiquement ; F28 est un exemple à traiter. L’absence de fichier manquant n’a pas été reproduite par une seconde méthode et n’établit pas un zéro global. `pages-*.json`. |
| 9. Exécution hostile | Repli local après panne simulée du fournisseur → idem | **Rouge et partiel.** Les sondes isolées couvrent notamment boucles JavaScript/Python, sortie JavaScript volumineuse, essais de lecture/réseau et requête SQL récursive. Les essais observés sont limités ou interrompus, mais l’isolation générale du repli et tous les langages/scénarios ne sont pas démontrés. F39 reste ouvert. `sondes-execution-*.json`. |
| 10. Suite et construction | `courses:check` : 832 pages/64 cours → idem ; `labs:check` : 1 250 exercices/68 cours → idem ; `npm test` : 7 383/7 383 → 7 388/7 388 ; build : 1 444 fichiers, 936 HTML injectés → idem | **Vert pour ces commandes**, sans valeur de preuve sur les contrôles rouges. La suite et les constructions ont été lancées dans des copies isolées, sans toucher au `dist/` local. `courses-*`, `labs-*`, `npm-test-*`, `build-*`. |

Les premiers fichiers `variantes-173-apres.*` sont une tentative préliminaire non probante : PowerShell ne démarrait pas dans cet environnement et le script historique ne distinguait pas correctement cette erreur d’un rejet. Les résultats de référence sont les fichiers **`banc-360-avant.json` et `banc-360-apres.json`**, rejoués avec un environnement corrigé et une classification explicite des exécutions en échec. Ils sont identiques.

## Relecture novice et navigateur

Graine `20261029` ; huit pages tirées parmi les 24 chapitres modifiés ont été ouvertes dans Chromium. Les 24 laboratoires de l’échantillon affichent un avis et une validation désactivée ; un laboratoire Python non concerné reste actif. Une tentative de soumission déclenchée côté client ne produit pas de requête. Résultat et liste des pages : `resultats/navigateur-lot0.json`.

Relecture manuelle du corps statique des deux premières pages tirées : `csharp/chapitres/chapitre5.html` et `b3-github/chapitres/chapitre1.html`. L’avis de suspension est compréhensible, mais la relecture ne valide pas les pages : elle retrouve notamment l’énoncé C# tronqué F04, des indices au registre mélangé et l’objectif Python opposé aux ateliers Bash F225. Elle fait apparaître d’autres candidats documentés dans `nouveaux-candidats.md`. Navigation, contenu dynamique et toutes les autres pages n’ont pas été relus phrase par phrase : la porte « novice » reste donc **ouverte**.

## Reclassements à arbitrer

Ces cinq défauts restent à traiter ; leur passage de S0 à S1 propose de les considérer comme des précisions utiles plutôt que comme une erreur du cas usuel :

| Constat | Motif et source officielle consultée le 29 octobre 2026 |
|---|---|
| F12 | La formule d’hôtes usuelle nécessite le cadrage du cas `/31` point à point : https://www.rfc-editor.org/rfc/rfc3021.html |
| F60 | Le résultat d’une colonne omise dépend notamment des contraintes et des valeurs par défaut SQLite : https://www.sqlite.org/lang_createtable.html |
| F61 | `AVG`, `COUNT(*)` et `array_agg` n’ont pas tous le même traitement des valeurs nulles : https://www.postgresql.org/docs/current/functions-aggregate.html |
| F108 | L’équivalence entre `div`/`mod` Pascal et `//`/`%` Python doit être bornée selon les signes : https://docs.freepascal.org/daily/doc/ref/refsu47.html |
| F127 | Certains équipements 10GBASE-T Cisco admettent de la catégorie 6 UTP jusqu’à 55 m ; le contexte matériel et la portée importent : https://www.cisco.com/c/en/us/products/interfaces-modules/catalyst-6500-16-port-10-gigabit-ethernet-copper-module/index.html |

Les statuts ne sont pas « refusé » : les faits doivent encore être corrigés ou nuancés dans les cours. Les vérifications de disponibilité des sources et leurs empreintes sont dans `resultats/sources-controlees.txt`.

## Plan de poursuite, sous réserve d’accord

1. **Lot 1A : rendu et structure.** Corriger à la source l’échappement, les cartes et QCM perdus, les formules, le format C# tronqué, les ancres et les paliers ; élargir les parcours aux autres gabarits et scripts, puis confirmer les résultats par une seconde méthode.
2. **Lot 1B : évaluations.** Remplacer les 72 corrigés mémorisés par des algorithmes généraux ; réparer les 18 attendus fusionnés, les comparaisons et les bornes. Étendre progressivement le banc aux 1 070 exercices manquants, avec deux variantes plausibles et des témoins indépendants ; corriger ou remplacer la variante aujourd’hui non évaluée. Ne lever la suspension qu’après validation complète.
3. **Lot 1C : exécution.** Définir une politique unique de repli ; démontrer l’isolation et les limites pour tous les langages et tous les scénarios hostiles avant publication. Ne pas considérer les quelques sondes de ce lot comme un audit complet de sécurité.
4. **Lot 1D : SQL.** Choisir et enseigner un schéma de référence cohérent avec le simulateur ; inventorier chaque requête et son dialecte, distinguer les erreurs volontaires et les fragments, exécuter les cas pertinents et vérifier aussi les résultats affichés.
5. **Lot 2 : exactitude factuelle.** Traiter les domaines dans l’ordre du prompt, vérifier chaque fait modifié sur une source officielle datée, répercuter les corrections aux exercices, cartes et QCM, puis faire arbitrer les reclassifications.
6. **Lot 3 : progression.** Réaligner prérequis, objectifs, ateliers, indices, QCM et cartes ; établir la matrice objectifs/activités et réaliser la relecture prévue des chapitres 1 et de 100 pages.
7. **Lot 4 : langue et édition.** Couvrir les chaînes générées et dynamiques, qualifier manuellement les mots nouveaux et les inconnus, harmoniser le vouvoiement, les objectifs et la typographie ; relire les 60 pages prévues.
8. **Lot 5 : publication.** Faire procéder à la contre-vérification intégrale, ne déployer qu’avec autorisation explicite, puis comparer local et version publiée et remettre le rapport final des statuts et limites.

Les commandes reproductibles et leurs prérequis figurent dans `README.md`. **Arrêt avant tout lot suivant ; attendre `GO LOT 1`.**
