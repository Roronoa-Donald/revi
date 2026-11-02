# Lot 1, partie 3 — corrections, preuves et limites

Date : 30 octobre 2026. Périmètre : dossier local uniquement ; aucun déploiement et aucun travail du lot 2. Les sept suspensions de notation restent en place : `csharp`, `docker`, `b3-linux`, `b3-github`, `b1-sql`, `sql` et `b3-sql`.

## Lecture rapide

| Point demandé | Établi localement | Limite ou travail non terminé |
| --- | --- | --- |
| Premier échec F101 | Le message initial masque une erreur ou un arrêt sans `stop` ; le diagnostic a été corrigé. Les 50 rejeux isolés et les 50 sous charge réussissent. | La cause sous-jacente du premier incident n'a pas été enregistrée ; elle reste inconnue. |
| 155 fiches de code précédemment non évaluées | Deux variantes incorrectes au moins sont rejetées par le correcteur actuel pour chacune ; 145 fiches ont aussi deux entrées littéralement nouvelles et un oracle séparé. | Dix fiches n'ont pas deux nouvelles entrées admissibles démontrées. Pour quatre des 145, de nouvelles catégories sémantiques indépendantes ne sont pas démontrées. |
| 830 grilles | Mention « Formative » dans les 830 ateliers ; champs d'attendus d'exemple et de tests retirés des projections et retours contrôlés. | Des textes peuvent contenir littéralement un attendu : le secret absolu des réponses n'est pas établi. La relecture humaine de l'échantillon reste à faire. |
| Tableau des cours | `tableau-cours-lot1-partie3.md` couvre les 71 cours ; le TSV associé donne une ligne pour chacune des 1 250 fiches. | Une preuve sur deux jeux ou deux variantes ne démontre pas la correction générale de la fiche. |
| Audits | `audit:integrite` et `audit:sql` conservent un code de sortie 1. | Les échecs bruts ne sont pas tous des défauts : voir les qualifications séparées ci-après. |

## 1. F101 : premier échec et rejeux

Le premier journal, `resultats/suite-lot1-partie2-complement-premier.txt`, rapporte `Cannot read properties of null (reading 'reason')` pour le test F101. Le correcteur peut retourner `stop: null` avec un objet `error` lorsqu'une exécution lève une exception ; l'ancien test accédait à `stop.reason` avant de contrôler le succès du rapport. Le message observé masquait donc le diagnostic utile.

Dans `tests/linux-cas-lot1.test.js`, le test vérifie désormais `report.ok` avant de lire `stop`. L'exécution indique si l'incident survient à la création du répertoire, à l'écriture, au lancement ou au nettoyage, et conserve l'erreur primaire si le nettoyage échoue aussi. Un test injecte une erreur `EIO` pour vérifier ce diagnostic. Cela corrige le **masquage** ; cela ne reconstitue pas l'erreur non enregistrée à l'origine.

- **Mesuré :** 50 exécutions isolées puis 50 exécutions du fichier complet, jusqu'à huit processus simultanés, toutes réussies sous Node 22.23.4. Moyennes et maxima observés : 119,1/130 ms en isolé et 411,5/455 ms sous cette charge. Les 100 journaux, durées et empreinte de l'instantané sont dans `resultats/f101-rejeux-final-lot1-partie3/`.
- **Non établi :** temporisation, collision de répertoires, ordre de la suite complète, panne du système de fichiers ou autre cause historique. Les répertoires du helper sont créés par `mkdtemp` ; les rejeux n'ont pas reproduit de collision. Huit processus concurrents ne prouvent pas l'absence d'une course rare et ne reproduisent pas tout l'ordre de la suite initiale. Les 8,93 ms de l'échec initial ne constituent pas une preuve de timeout.

**Mise à jour du lot 2.** Un nouvel échec du même test a ensuite révélé `EPIPE` au lancement de Bash dans `resultats/lot2-finale-v6-sansgit-suite.txt`. Un script synthétique qui ferme son entrée avant que le parent ait fini de l'écrire reproduit l'erreur : `resultats/lot2-f101-epipe-avant.txt`. Le banc prend désormais en compte ce cas uniquement lorsqu'un code de sortie est disponible et qu'aucun signal n'a interrompu le processus ; les autres erreurs restent signalées. Après correction, le test dédié passe, y compris pour un processus qui sort avec le code 7 ; 50 rejeux isolés et 50 sous huit processus simultanés passent (`resultats/lot2-f101-rejeux-apres-epipe/`). Cette nouvelle reproduction explique l'incident observé au lot 2, mais **ne prouve pas** la cause du premier incident historique, dont l'erreur avait été masquée.

## 2. Témoins et variantes de code

L'état de départ de la partie 2 comprenait 155 fiches de code sans deux jeux établis, dont les 68 à un seul témoin des quatre cours suspendus C#, Docker, Linux B3 et GitHub B3. Les résultats individuels, sources de preuve et décisions par cours sont dans `resultats/etat-exercices-lot1-partie3.tsv` et `tableau-cours-lot1-partie3.md`.

**Ce qui est exécuté et constaté :**

- Les 155 fiches ont au moins deux variantes incorrectes rejetées par les tests effectivement utilisés ; les preuves sont attribuées fiche par fiche et leurs sources contrôlées correspondent aux fichiers locaux. Pour `fl2-c4-e1`, quatre variantes et les huit scénarios spécifiés ont été rejoués : `resultats/flask-variantes-finies-lot1-partie3.json`.
- Les 68 fiches initialement à témoin unique disposent de deux entrées littéralement nouvelles exécutées sur leur corrigé avec un oracle séparé. Pour quatre fiches C#, les nouvelles séquences recombinent néanmoins un domaine atomique déjà couvert : ce n'est pas une preuve de nouvelles catégories indépendantes.
- La matrice des 90 fiches C#, Docker, Linux B3, GitHub B3 et SQL B1 a exécuté 1 642 comparaisons : 90 corrigés conformes, 212 variantes rejetées par mauvaise sortie et, pour chaque fiche, une paire de témoins discriminant croisés. Résultat : `resultats/matrice-suspendus-lot1-partie3.json`. Les 36 fiches SQL B2/B3 ont chacune deux variantes rejetées et deux témoins exclusifs : `resultats/variantes-sql-b2b3-final-lot1-partie3.json`.
- Les bancs complémentaires rejouent notamment 34 variantes B1 Linux, 36 B1 Git, 32 React, 34 Windows Server et 38 VM ; leurs résultats et limites sont reliés au TSV. Des défauts concrets de tests ou de corrigés ont été corrigés, notamment en Git, React et VM ; Docker calcule maintenant exactement les valeurs entières supérieures à 2^53.
- En C#, quatre variantes supplémentaires qui avaient échappé aux tests actifs ont motivé quatre cas ciblés sur le reste signé, l'alias `ref`/`out`, l'égalité numérique et l'ordre des motifs. Le plafond de sept tests cachés est respecté. Le banc complémentaire final compile et exécute 34 variantes : toutes sont rejetées sur des cas dont le corrigé est conforme, et aucune ne survit à l'ensemble des cas historiques. `resultats/generalisation-csharp-final-lot1-partie3.json` et son vérificateur `resultats/verification-csharp-final-lot1-partie3.txt` conservent les détails.

**Ce qui manque ou reste conditionnel :**

- Les dix fiches de départ sans deux nouvelles entrées établies sont `fl2-c4-e1`, `ws2-c5-e2`, `ws2-c6-e2`, `vm2-c1-e3`, `vm2-c2-e3`, `vm2-c3-e2`, `vm2-c4-e1`, `vm2-c4-e3`, `vm2-c5-e1` et `vm2-c5-e2`. Flask et plusieurs domaines Windows/VM ont déjà épuisé les valeurs nominales spécifiées ; pour les deux branches VM « inconnu », changer arbitrairement une chaîne ne crée pas deux comportements indépendants. Les variantes, elles, sont bien rejouées et rejetées.
- Les quatre réserves de domaine C# concernent `csb2-c3-e1`, `csb2-c3-e2`, `csb2-c3-e3` et `csb2-c4-e3`. Deux autres sondes divergent sur un prix écrit `.75` et sur un cumul dépassant Int64 : leur admissibilité dépend d'une grammaire ou de bornes non précisées. Ce sont des anomalies **conditionnelles**, pas des défauts admissibles établis sans clarification.
- Sur l'ensemble des 420 fiches de code, le relevé compte 405 paires d'entrées nominalement inédites. Les 15 autres comprennent les dix fiches ci-dessus et cinq créations SQL dont la base initiale vide était déjà connue : `sq-c2-e1`, `sq-c2-e2`, `sql2-c1-e1`, `sql2-c1-e2`, `sql2-c1-e3`. Les contrôles SQL ultérieurs sont nouveaux, pas les bases initiales.
- Le même relevé attribue deux variantes actuelles à 213 fiches, deux rejets seulement historiques à quatre autres, et ne retient aucune preuve suffisante pour les 203 restantes. Ce dernier chiffre concerne l'ensemble des 420 fiches, pas seulement les 155 initialement non évaluées ; l'absence d'une preuve retenue ne démontre pas un défaut.

## 3. Grilles formatives et confidentialité

Les pages générées affichent « Formative » et précisent que l'activité ne donne pas de note ni ne valide les acquis. Pour `analyse`, la projection client ne transmet que l'entrée des exemples ; les tests et corrigés ne sont pas projetés. Les retours de soumission contrôlés ne contiennent pas le champ `expected`. Le tuteur des grilles répond par une méthode générale fixe, sans appel au modèle et sans passage du corrigé.

Les 48 tests ciblés finaux sont verts : `resultats/tests-cibles-ultimes-lot1-partie3.txt`. Ils examinent les 830 grilles et leurs 2 578 cas actifs, y compris les projections et les réponses de routes Fastify simulées ; Chromium vérifie le gabarit et la lisibilité de l'étiquette. Ce n'est pas une navigation manuelle des 830 pages ni une garantie contre toutes les déductions à partir du contenu.

**Limite établie, à ne pas confondre avec un champ API :** dans `erp2-c4-e1`, l'énoncé affiche la chaîne exacte attendue pour l'exemple lorsque les trois quantités et prix concordent ; il s'agit aussi d'une règle de sortie générique. Dans `cs2-c1-e2`, la règle de repli affiche la chaîne qui correspond au cas inconnu. Ainsi, l'objectif littéral « aucun attendu ne se retrouve dans le contenu envoyé » n'est pas encore satisfait, même si les champs de correction ne sont pas transmis. Une recherche statique recense 225 associations littérales dans leur propre grille, dont 80 d'au moins 12 caractères : elles ne sont pas toutes des fuites, mais ne sont pas toutes qualifiées. Détails et limites : `resultats/rapport-attendus-grilles-lot1-partie3.md`.

L'échantillon `resultats/echantillon-grilles-5pourcent-lot1-partie3.md` contient 42 grilles sur 830, soit 5,06 %, tirées de manière reproductible dans 42 des 46 cours à grilles. Les quatre cours non tirés sont indiqués dans le document ; le tirage stratifié ne prouve pas la qualité du reste. Aucune relecture humaine n'est prétendue effectuée.

## 4. Audits rouges et faux positifs

**Intégrité — rouge.** `resultats/audit-integrite-final-lot1-partie3.json` indique code 1 : le contrôle structurel échoue et le banc commun classe 393 fiches « réussi » et 857 « non évalué », dont 830 grilles. Les 17 résultats C# complémentaires sont conservés séparément et ne sont pas ajoutés artificiellement au JSON du banc commun. Un défaut de contenu est établi indépendamment : `ib2-c1-e3` demande le champ `decasion`, alors que les données, indices et attendus utilisent `description` ; un cas déclaré valide ne respecte donc pas l'énoncé affiché. Il n'a pas été corrigé dans cette partie centrée sur le statut et la confidentialité des grilles.

**Mise à jour du lot 2 :** le défaut `ib2-c1-e3` ci-dessus a depuis été corrigé à la source et dans la page générée. Les contrôles ciblés passent de 1/2 à 2/2 (`resultats/lot2-ingenierie-grille-{avant,apres}.txt`), avec un oracle séparé pour les trois cas. L'audit d'intégrité reste rouge pour ses autres limites et anomalies, notamment les 830 grilles non évaluées comme programmes et les réponses littérales signalées dans certains énoncés.

**SQL — rouge.** `resultats/audit-sql-final-lot1-partie3.json` relève 270 extraits candidats dans 58 pages : 94 succès et 176 échecs bruts sous sql.js ; les 249 exécutions des 54 exercices SQL du catalogue réussissent sur leurs cas actifs. Ces deux mesures ne sont pas interchangeables. Les 176 échecs ne sont pas tous des défauts SQL et ne sont pas tous blanchis : le banc mêle notamment prose, fragments, schémas absents et dialectes non SQLite.

Les 139 occurrences B2/B3 du relevé initial sont qualifiées individuellement dans `qualification-sql-lot1-partie2.md`, avec preuves et limites. Par exemple, `B2-001` est une phrase de carte et `B3-27` un nom de mécanisme cité dans un sujet : ce sont des faux positifs d'exécution, pas des commandes à réparer. À l'inverse, le dossier documente aussi des défauts réellement corrigés, par exemple le contexte UUID de `B3-31`. Les cas dépendant d'un SGBD ou d'un schéma indisponible restent non prouvés sur leur moteur réel. La qualification B2/B3 ne dispense pas de revoir les 37 échecs bruts B1.

## 5. Vérifications et périmètre

- `tests-cibles-ultimes-lot1-partie3.txt` : 48/48 ; `tests-csharp-final-lot1-partie3.txt` : 21 sous-tests confinés réussis ; rejeu Flask et vérificateur C# : réussis.
- `tests-protection-audits-lot1-partie3.txt` : 4/4. Les chemins locaux des rapports d'audit, y compris deux fichiers de cette partie et leurs variantes encodées, sont refusés par le serveur testé ; le build miniature ne copie pas les dossiers internes racine. Aucun hébergement distant n'a été vérifié.
- `courses-check-final-lot1-partie3.txt` : 832 pages et 64 cours à jour ; `labs-check-final-lot1-partie3.txt` : 1 250 exercices et 68 cours à jour. Aucun build ni déploiement en ligne n'a été effectué.
- Les sources des sous-bancs sont copiées et contrôlées séparément : leur ensemble ne constitue pas un instantané atomique. Les rejets de variantes ne certifient ni toutes les fautes possibles ni la justesse universelle des corrigés.
- Node 22 reste déclaré dans `package.json` et documenté pour Render et Vercel dans `README.md`. La suite `npm test` complète n'a pas été rejouée dans cette partie ; seuls les contrôles explicités ci-dessus sont revendiqués.

## Actualisation des limites C# pendant le lot 2

Le 30 octobre 2026, les deux divergences conditionnelles signalées plus haut ont été traitées dans les sources et les pages générées : la notation décimale simple accepte un zéro initial omis et la simulation des durées utilise un cumul au-delà d'Int64 dans les limites de l'environnement. Une reprise indépendante a ensuite conduit à préciser l'arrondi au centime et à ajouter les deux bornes de `decimal` aux tests actifs. Le corrigé ciblé passe 7/7 ; un mutant de troncature est rejeté pour sortie incorrecte et un mutant de multiplication pour dépassement de capacité. Détails et limites : `resultats/lot2-csharp-bornes-independant.md`. L'ancien rapport divergent est conservé pour l'historique. La notation C# reste suspendue et ces sondes ne prouvent pas une correction universelle.
