# Journal des preuves — lot 1, partie 3

Les résultats ci-dessous concernent exclusivement le dossier local. Les sources et scripts d'audit restent privés ; ils ne constituent pas une preuve de déploiement.

## F101 : première campagne

- 30 octobre 2026, 10 h 39 UTC : `PATH=/tmp/revi-node22-verif-1Snd5nsb/node-v22.23.4-linux-x64/bin:$PATH bash corrections/outils/f101-rejeux-lot1-partie3.sh` : code 0.
- Sous Node 22.23.4, les 50 rejeux du seul test F101, successifs, réussissent. Durée totale moyenne par processus : 117,5 ms ; maximum : 128 ms.
- Les 50 autres rejeux de la totalité du fichier, huit processus simultanés partageant le `/tmp` isolé et son espace de noms, réussissent ; F101 est exécuté une fois dans chacun. Durée totale moyenne par processus : 439,5 ms ; maximum : 582 ms.
- `f101-rejeux-lot1-partie3/rejeux.tsv` contient un verdict par passage ; les 100 journaux TAP et l'empreinte de la copie sont conservés dans le même dossier.
- Les 100 passages n'ont pas reproduit l'échec de la première suite. Ils ne permettent pas d'identifier rétroactivement l'exception non enregistrée, ni d'exclure toute anomalie rare.

## Linux B1 : témoins et variantes

- 30 octobre 2026 : `node --test tests/audit-generalisation-paquets.test.js` sous Node 22.23.4 : 3 tests réussis, dont l'accord des 34 attendus manuels et d'un oracle Python indépendant pour les 17 fiches ciblées.
- Premier rejeu : 17 corrigés conformes aux deux témoins, mais 4 des 34 variantes sont acceptées par les tests actifs. Trace : `b1-linux-variantes-avant-lot1-partie3.json`.
- Quatre tests cachés distincts des nouveaux témoins couvrent ensuite le préfixe du nom de base, l'ordre des groupes, une unique alerte critique et l'égalité du maximum.
- Rejeu après modification : les 17 corrigés sont conformes aux deux témoins ; les 34 variantes sont rejetées par les tests actifs ; 32 des 34 sont également rejetées par les deux nouveaux témoins ; aucun incident d'exécution. Trace : `b1-linux-variantes-apres-lot1-partie3.json`.
- Les candidats de ce banc n'ont ni réseau, ni répertoire personnel, ni catalogue montés. Les variantes ne représentent qu'un choix fini de fautes ; ce résultat ne prouve pas une correction générale.
- Une seconde paire de mutations et deux témoins croisés sont ensuite documentés pour chacune des 17 fiches : chaque témoin distingue l'une des deux fautes, mais pas l'autre. Le rejeu final confirme 17/17 corrigés, 34/34 variantes rejetées par les tests actifs et par les témoins, et 17/17 paires croisées. Un cinquième test caché couvre la casse pour `lx-c6-e1`. Trace : `b1-linux-variantes-croisees-lot1-partie3.json`.
