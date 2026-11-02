# Contrôles avant le lot 3

**État au 31 octobre 2026 : dossier local uniquement ; lot 3 non commencé.** Ce rapport complète les rapports antérieurs sans effacer leurs résultats. La publication et la levée générale des suspensions ne sont pas autorisées par les preuves ci-dessous. Le passage au lot 3 attend expressément le GO de l'utilisateur.

## Dépôt et sauvegarde

Le dépôt Git a été restauré avec son historique. Le commit `2b83e96` conserve l'état local du lot 2 avant les contrôles présentés ici. Les lots historiques ont déjà plusieurs commits : leur réécriture serait trompeuse et n'a pas été effectuée. Les changements du présent contrôle sont regroupés dans un commit distinct.

Une sauvegarde intégrale antérieure aux modifications est conservée hors du dépôt : `revi-cours-html-sauvegarde-avant-prelot3-2026-10-30.zip`. Son SHA-256 est `34179ca3e1ad1feb08b7a5c2d9cb906e281835a67fb351455034fd2f0bdee2b6` ; l'intégrité de ses entrées a été vérifiée. Elle contient aussi les fichiers cachés et l'historique Git. Elle n'est pas chiffrée : la conserver privée.

## Exercices et notation

Sur les **289 exercices de code initialement non suspendus**, 62 disposent chacun des deux entrées inédites retenues et de deux variantes distinctes rejetées ; la notation de 227 autres est suspendue faute de ces deux preuves complètes. Le relevé individuel, avec empreintes des cas et variantes, références et motif de suspension, est `resultats/prelot3-preuves-289.tsv` ; `outils/verifier-preuves-prelot3.js` contrôle sa provenance et les empreintes.

| Cours | Actifs parmi les 289 | Nouvellement suspendus |
|---|---:|---:|
| admin-vm | 0 | 18 |
| api-rest-flask | 0 | 18 |
| b1-algo | 0 | 25 |
| b1-c-cpp | 0 | 24 |
| b1-git | 18 | 0 |
| b1-linux | 17 | 1 |
| b1-php | 0 | 24 |
| b1-prog-web | 0 | 18 |
| b1-python | 0 | 18 |
| b3-algo | 0 | 18 |
| linux | 0 | 18 |
| php | 0 | 18 |
| rd_java | 0 | 18 |
| rd_winserver | 15 | 3 |
| react | 12 | 6 |
| **Total** | **62** | **227** |

Cette liste ne comprend pas les 131 exercices initialement suspendus. Pour quatre d'entre eux, un contrôle de méthode et des essais complémentaires ont permis une levée **locale** : `algo-c6-e3`, `algo-c9-e1`, `algo-c9-e3` et `algo-c10-e3`. Le cinquième exercice algorithmique précédemment suspendu, `algo-c9-e2`, reste suspendu. Les sept cours entiers déjà suspendus le restent : `b1-sql`, `sql`, `b3-sql`, `csharp`, `docker`, `b3-linux` et `b3-github`.

Au total, sur 420 fiches de code, **66 restent actives et 354 sont suspendues**. Les 830 grilles formatives constituent un autre type de fiche et ne sont pas comptées comme programmes notés. Les 227 suspensions ne signifient pas que 227 défauts ont été démontrés : l'absence de preuve suffit à suspendre. La politique refuse une soumission non prouvée avant l'appel au fournisseur et le débit de quota. Elle invalide aussi les preuves si la fiche ou les fichiers critiques correspondants changent.

Les deux entrées sont nouvelles au regard des sources et représentations recensées, pas démontrées différentes de toute entrée sémantiquement équivalente. Les variantes et jeux sont des essais finis, non une preuve mathématique d'absence de mémorisation ni d'exactitude universelle. Les 72 nouveaux témoins manuels du banc complémentaire sont conformes, mais un témoin manuel seul ne remplace pas les deux jeux indépendants demandés.

## F116, F117, F118 et F205

Le moteur utilise l'analyse `ast` du programme Python et instrumente les opérations pertinentes : appels et récursion, dépendance des résultats aux fonctions, comparaisons et affectations pour les tris. Il vérifie également des entrées générées et les entrées cachées exécutées. Pour chaque fiche, `resultats/prelot3-methodes.json` conserve les empreintes des sources, deux entrées supplémentaires, leurs résultats et deux variantes refusées ; `outils/verifier-methodes-prelot3.js` permet le rejeu isolé.

| Constat | Fiche | Contrôle local |
|---|---|---|
| F116 | `algo-c9-e3` | Appels récursifs et opérations du PGCD et de la puissance. |
| F117 | `algo-c9-e1` | Comparaisons et échanges cohérents avec le tri à bulles. |
| F118 | `algo-c10-e3` | Utilisation des fonctions et dépendance de la sortie à leurs résultats. |
| F205 | `algo-c6-e3` | Comparaisons et affectations cohérentes avec le tri par sélection. |

Une variante peut être refusée **sans note** en HTTP 422 lorsque sa méthode n'est pas établie ; ce refus n'est pas une mauvaise note. Des constructions Python correctes mais hors du sous-ensemble explicitement annoncé peuvent également recevoir ce refus. En cas d'erreur ou de réponse inexploitable du fournisseur, aucune note n'est attribuée. Le contrôle local ne démontre pas qu'aucun contournement n'existe et aucun fournisseur distant réel n'a été testé. Les quatre exercices ne sont donc pas validés en production.

## F29

Le chapitre 1 de Linux B1 utilise désormais le vouvoiement dans les consignes visées. La source génératrice et la page correspondante sont mises en cohérence ; le test ciblé F29 réussit.

## Les 18 S0 auparavant partiellement vérifiés

Le tableau décrit ce qui a effectivement été vérifié, puis ce qui reste hors de portée. Une expérimentation sur modèle ne vaut pas validation d'une infrastructure réelle.

| Constat | Éléments vérifiés | Limite maintenue |
|---|---|---|
| F48 | Dans un dépôt Git jetable, `rm --cached` conserve le fichier local, `rm` le retire et aucun des deux ne modifie l'ancien commit. | Aucune révocation de secret ni réécriture d'un véritable historique. |
| F53 | Dans des espaces réseau isolés, trois configurations XFRM/ESP du noyau ont transmis des paquets : confidentialité seule, intégrité seule et les deux. | Pas d'équipement IPsec réel ni de négociation IKE. |
| F57 | Contenu et QCM confrontés à la documentation Microsoft sur Hyper-V et les points de contrôle. | Aucun Hyper-V réel ni restauration de sauvegarde vérifiée. |
| F64 | Les traitements de variable littérale et d'évaluation ont été rejoués localement. | Aucun workflow GitHub Actions réel ; notation du cours GitHub B3 suspendue. |
| F75 | Documentation ANSSI relative à SecNumCloud consultée ; le cours n'en déduit pas une immunité générale. | Aucune qualification d'une offre ou d'un contrat concret. |
| F107 | Free Pascal 3.2.2 exécute un programme synthétique montrant qu'un `repeat…until` s'exécute au moins une fois et s'arrête quand la condition est vraie. | Rejeu dépendant du paquet identifié et de sa disponibilité ; pas de garantie sur chaque environnement Pascal. |
| F116 | Contrôle AST, récursivité et cas supplémentaires rejoués localement ; voir section précédente. | Fournisseur réel et absence de tout contournement non vérifiés. |
| F117 | Contrôle des comparaisons/échanges du tri à bulles et cas supplémentaires rejoués localement. | Même limite ; certains programmes valides peuvent être refusés sans note. |
| F118 | Contrôle local de l'appel aux fonctions et de la dépendance de la sortie. | Même limite ; contrôle dynamique fini, non preuve formelle. |
| F122 | Les essais XFRM/ESP transmettent effectivement les paquets dans les espaces réseau locaux. | Aucune topologie réseau de production ni appareil réel. |
| F123 | Contenu et QCM confrontés aux références Cisco sur Ethernet et le duplex. | Aucune collision observée sur matériel half-duplex réel. |
| F148 | Un journal synthétique à deux démarrages démontre le filtre `journalctl -p err -b`. | Pas d'accès au journal de l'hôte ni validation d'un système distant. |
| F150 | Un syslog-ng local isolé reçoit des messages synthétiques en TCP simple et en TLS 1.3 avec certificat vérifié. | Pas de service réel ni contrôle de sa configuration, de sa rétention ou d'une non-répudiation. |
| F154 | La page indique explicitement la version de 2015 et demande de vérifier le droit applicable ; la référence officielle est identifiée. | Accès direct à Légifrance refusé lors du contrôle ; ni texte actuellement applicable ni peines actuelles certifiés. |
| F170 | Deux erreurs de bornes sont rejetées dans le modèle SQL local ; l'API refuse les fiches B3 SQL suspendues sans appeler de fournisseur. | Modèle pédagogique simplifié, non équivalent à l'ensemble de MVCC PostgreSQL. |
| F171 | Modèle SQL et variantes d'index rejoués localement ; des propriétés PostgreSQL sont également testées sur base isolée. | L'exécution de notation B3 SQL via fournisseur reste suspendue et non testée. |
| F172 | PostgreSQL local isolé : un XID en cours reste invisible dans le snapshot ; l'API maintient la suspension. | Pas de soumission notée via un fournisseur réel. |
| F173 | PostgreSQL local isolé : arrêt immédiat, reprise et visibilité d'une ligne commise, mais pas d'une ligne non commise malgré du WAL. | Pas de panne de disque réelle ni de soumission notée via fournisseur. |

Les essais F48, F107 et F148 sont rejouables avec `python3 -I corrections/outils/verifier-s0-prelot3.py --avec-fpc`; F53/F122 avec `bash corrections/outils/verifier-s0-prelot3-ipsec.sh` ; F150 avec `python3 -I corrections/outils/verifier-s0-prelot3-syslog.py`. Les paquets téléchargés par les deux scripts qui en ont besoin sont contrôlés par empreinte et utilisés en temporaire, sans installation système. Les tests PostgreSQL et les autres essais ciblés sont consignés dans les résultats de validation.

## Audits : résultats et limites

- **SQL : rouge, code 1.** Sur 58 pages, 270 candidats, 176 échecs bruts dans sql.js et 36 fragments non qualifiés ; ces nombres ne sont pas 176 défauts SQL établis. Les 250 exécutions de tests de 54 exercices SQL réussissent dans ce banc. La qualification individuelle historique B2/B3 figure dans `qualification-sql-lot1-partie2.md`, y compris fragments de prose, dialectes ou schémas différents ; les occurrences B1 non entièrement qualifiées ne doivent pas être déclarées corrigées par supposition.
- **Intégrité : rouge, code 1.** Le contrôle structurel signale notamment 830 données de cas visibles dans les squelettes des grilles formatives. Il s'agit de données de cas, pas d'une preuve que les attendus confidentiels ont été exposés. Le banc de généralisation classe 366 fiches réussies et 884 non évaluées ; il ne démontre pas qu'elles sont toutes incorrectes. La vérification des données visibles n'est pas une preuve de mémorisation.
- **Rectification du 31 octobre :** contrairement à une phrase figurant initialement ici, `toClient()` ne transmet pas le champ `expected` des exemples de grilles `analyse`. Pour les exemples de code, ce champ public est en revanche conservé. Des attendus apparaissent toutefois littéralement dans certaines consignes de grilles, notamment `erp2-c4-e1` et `cs2-c1-e2` : il ne faut donc pas affirmer qu'aucun attendu n'est envoyé. Cela ne démontre pas une fuite de tous les tests cachés. La relecture de l'échantillon de 42 grilles (`resultats/echantillon-grilles-5pourcent-lot1-partie3.md`) reste à effectuer par une personne.
- **Défaut établi du banc commun :** pour `gh3-c1-e2`, une normalisation ignore un espace final significatif et peut accepter une sortie altérée. La vérification spécifique de la fiche utilise le mode exact ; cela ne corrige pas le défaut du banc commun. Le rejeu et son contre-exemple sont conservés dans `resultats/prelot3-github.json.gz`.
- **Réparation d'infrastructure :** une première reprise d'intégrité avait échoué en code 2 car les instantanés n'embarquaient pas les nouveaux fichiers de politique. Les copies ont été corrigées et un test de non-régression ajouté ; le code 1 ci-dessus est celui de la reprise complète après correction, et non un succès maquillé.
- **Matrice de suspendus :** le rejeu s'est terminé avec 90 corrigés conformes et 212 variantes rejetées par mauvaise sortie dans les cinq cours couverts. Il ne suffit pas à établir les deux entrées inédites et les autres conditions de levée pour tous : les suspensions sont maintenues.

Les faux positifs et les scénarios délibérément formatifs restent séparés des défauts établis et des éléments non évalués. Ces audits ne sont pas rendus verts par changement de seuil.

## Portée des validations

La suite complète a été exécutée dans une copie temporaire isolée, sans modifier le `dist/` local : **8 645 tests réussis, aucun échec et trois omis** sur 8 648. Les trois omissions concernent un worker historique, l'accès au moteur SQL et des sondes hostiles dans des confinements imbriqués ; elles ne sont pas comptées comme réussites. La construction isolée réussit : 1 446 fichiers copiés et 936 pages HTML avec injection. Les comptes exacts, sorties brutes et commandes sont conservés dans `resultats/`. Les preuves obtenues concernent le dossier local et les fournisseurs simulés, pas le site en ligne. Les 830 grilles restent formatives ; les résultats de tests ne remplacent pas une relecture pédagogique ni une validation opérationnelle.

**À faire avant publication :** compléter les preuves des 227 exercices avant leur éventuelle réactivation ; vérifier les fournisseurs et les environnements réels pertinents ; compléter les vérifications juridiques et matérielles indiquées ; qualifier les résultats SQL et d'intégrité encore rouges. Aucun lot 3 n'est lancé sans GO.
