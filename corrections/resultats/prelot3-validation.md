# Résultats des contrôles pré-lot 3

Relevé du 31 octobre 2026. Les programmes et tests ont été exécutés sur le dossier local ; aucune publication ni aucun fournisseur distant réel ne sont impliqués.

| Commande ou contrôle | Résultat |
|---|---|
| `python3 -I corrections/outils/valider-prelot3-isole.py suite build` | Suite : code 0, 8 648 tests, 8 645 réussis, 0 échec, 3 omis ; build : code 0, 1 446 fichiers copiés et 936 HTML avec injection. |
| `python3 -I corrections/outils/valider-prelot3-isole.py s0` | Code 0, 56 tests réussis, aucun omis, dont les essais PostgreSQL isolés. |
| `npm run courses:check` | Code 0 : 832 pages, 64 cours, synchronisés. |
| `npm run labs:check` | Code 0 : 1 250 exercices, 68 cours, synchronisés. |
| `node --test tests/audit-copies-prelot3.test.js tests/s0-sql-prelot3.test.js` | Code 0, 3 tests réussis. |
| `python3 -I corrections/outils/sondes/generalisation/tests_csharp_lot1_partie3.py` | Code 0, 17 tests réussis. |
| `bash corrections/outils/sondes/generalisation/rejouer-docker-b2.sh "$PWD"` | Code 0, 17 fiches, 34 cas conformes et 34 mutants rejetés. |
| `python3 -I corrections/outils/sondes/generalisation/rejouer_b3_github.py --repo "$PWD"` | Code 0, 17 fiches, 34 cas conformes et 34 mutants rejetés ; le défaut du comparateur commun décrit dans le rapport demeure. |
| `npm run audit:matrice-suspendus` | Code 0 pour le rejeu : 90 fiches, 1 653 exécutions, 212 variantes rejetées ; les suspensions restent en place. |
| `npm run audit:sql` | Code 1, 176 échecs bruts parmi 270 candidats ; ne pas assimiler tous ces échecs à des défauts. |
| `bash corrections/outils/audit-integrite.sh` | Code 1, 366 fiches réussies et 884 non évaluées dans la généralisation ; contrôle structurel rouge. |

Les trois tests omis de la suite concernent le lancement direct du worker historique, la disponibilité du moteur SQL du banc et les sondes hostiles en confinement imbriqué. Leur omission n'est pas un succès.

Les trois configurations IPsec isolées ont chacune observé un paquet ESP émis et reçu. Les essais supplémentaires ont confirmé : retrait Git synthétique et préservation du commit antérieur (F48), filtre journal sur le démarrage courant (F148), arrêt de `repeat…until` avec Free Pascal 3.2.2 (F107), et réception syslog-ng locale TCP simple et TLS 1.3 avec certificat vérifié (F150). Les conditions et limites de chaque expérience sont dans `../rapport-prelot3.md`.

Les sorties brutes compressées sont conservées ci-dessous. Elles peuvent contenir les données de tests : ne pas les exposer aux apprenants. Sommes SHA-256 des archives :

```text
b9a0f9d893410163e9f90d721378e04d7d8e24ff65f079e6bacb9800f2bbc40e  prelot3-suite.txt.gz
224491b659f47389ce2d688632fa3fde2305a7ae4f61b3df9a427e38fcc63ae2  prelot3-build.txt.gz
15a6d13f31a4e23a4000955099305d06bdd8c30c20f6eedf43de948878a4a396  prelot3-s0-tests.txt.gz
fb165fa5a58f248bc1e7446503752753273695e45530ad6db34967d7554cf45d  prelot3-integrite.json.gz
75dc8062cbeef714deebceb7f82b816d77a286b8576f3e5e3177d21cad9c7b13  prelot3-integrite-stderr.txt.gz
ef17e6ecf8179c971478fd081f5e04adb3c282eda2be214786d255a3f93b5af0  prelot3-audit-sql.txt.gz
604a8d1455e8a0d0e96373e0b6c8e2cab8dc1cfdf5c8829dbfa39bf0c6f7addc  prelot3-matrice.txt.gz
4941d8f34ca233bf8aab53978cf26aea5409944c594010f45e1183b98c5657fa  prelot3-docker.json.gz
f94b43234ae225fb1c4c1fea6c227f5118a7c1d0a151eddbd42b3a189690ef6f  prelot3-github.json.gz
```
