# Lot 1, partie 3 — nouveaux cas après activation

## Résultat

Dans le worktree détaché `/tmp/revi-winserver-lot1p3.PWhzxGYV/worktree` au commit `8bc35a1a37ce6a9d0195623a60cf52ee49063c43`, les 15 fiches à domaine non fini ont chacune deux nouveaux cas. Les 30 sorties des corrigés PowerShell concordent avec les attendus manuels et l'oracle séparé ; elles sont acceptées par le vrai `runTests`, appelé sur une fiche synthétique contenant un cas à la fois. Le banc commun `auditer_exercice` a, dans une seconde exécution isolée de chaque cas, classé les 15 fiches « réussi ».

`ws2-c5-e2` et `ws2-c6-e2` restent **non évalués pour la nouveauté** : aucune exécution ni faux nouveau témoin n'est attribué à ces deux domaines finis. La fiche déjà évaluée `ws2-c4-e3` est hors périmètre. Aucun mutant, aucune suite globale ni aucun lot 2 n'a été exécuté dans ce complément.

La mesure finale du 30 octobre 2026 et son rejeu ont chacun donné 30 cas acceptés, 15 fiches réussies par le banc commun et deux domaines finis non évalués. Les deux rapports sont identiques après retrait de leurs dates de début et de fin ; ce rejeu utilise les mêmes cas et le même oracle, il ne constitue pas une validation indépendante de leur conception.

## Attendus manuels

Les entrées utilisent `\n` pour séparer les lignes ; dans les sorties ci-dessous, `↵` représente un saut de ligne. Le fichier de cas contient les chaînes exactes, ainsi que la distinction de chaque situation. Les calculs suivants proviennent des énoncés, puis sont confrontés à l'oracle et aux exécutions enregistrées.

| Fiche | Cas A : entrée, calcul et attendu | Cas B : entrée, calcul et attendu |
| --- | --- | --- |
| `ws2-c1-e1` | `2\n0\n0` : 0 + 0 = 0 → `total : 0 Go` | `5\n3\n6\n12\n24\n48` : 3 + 6 + 12 + 24 + 48 = 93 → `total : 93 Go` |
| `ws2-c1-e2` | `2\n1\noui` : 2 < 3 et 1 < 2 → `3-2-1 : non conforme` | `4\n1\nnon` : 1 < 2 et aucune copie hors site → `3-2-1 : non conforme` |
| `ws2-c1-e3` | `1\n0` : 1 − 0 = 1 → `libre : 1 Go` | `10\n11` : 11 > 10 → `alerte : espace insuffisant` |
| `ws2-c2-e1` | `9\n9` : 9 − 9 = 0 → `actifs : 0↵service : interrompu` | `8\n7` : 8 − 7 = 1 → `actifs : 1↵service : maintenu` |
| `ws2-c2-e2` | `1\n37` : 37 divisé par 1 = 37 → `charge : 37 req/s` | `4\n6` : partie entière de 6 / 4 = 1 → `charge : 1 req/s` |
| `ws2-c2-e3` | `2\nwarning\nwarning` : zéro critique → `critiques : 0↵etat : normal` | `4\ncritique\ncritique\ncritique\ncritique` : quatre critiques → `critiques : 4↵etat : alerte` |
| `ws2-c3-e1` | `1\n0` : 0 n'est pas supérieur à 1/2 → `quorum : perdu` | `1\n1` : 1 > 1/2 → `quorum : atteint` |
| `ws2-c3-e2` | `2\nveille\nveille` : zéro actif et pas tous actifs → `actifs : 0↵type : active-passive` | `5\nactif\nveille\nveille\nactif\nveille` : deux actifs sur cinq → `actifs : 2↵type : active-passive` |
| `ws2-c3-e3` | `0\n7` : 0 = 7 × 0 + 0 → `par serveur : 0↵non reparties : 0` | `23\n6` : 23 = 6 × 3 + 5 → `par serveur : 3↵non reparties : 5` |
| `ws2-c4-e1` | `4\nok\nok\nok\nechec` : un échec, le dernier → `echecs : 1↵maintenance : requise` | `5\nok\nechec\nechec\nechec\nechec` : quatre échecs → `echecs : 4↵maintenance : requise` |
| `ws2-c4-e2` | `084` : 60 ≤ 84 < 85 → `etat : chaud` | `095` : 95 ≥ 95 → `etat : critique` |
| `ws2-c5-e1` | `1\nProxmox VE 8.3` : type 1 → `produit : Proxmox VE 8.3 (bare-metal)` | `2\nVirtualBox-7.0` : type 2 → `produit : VirtualBox-7.0 (heberge)` |
| `ws2-c5-e3` | `0\n16` : 0 ≤ 16 → `surallocation : non↵vcpu en exces : 0` | `17\n16` : 17 − 16 = 1 → `surallocation : oui↵vcpu en exces : 1` |
| `ws2-c6-e1` | `0000` : 0 ≤ 7 → `snapshot : conserve` | `365` : 365 > 7 → `snapshot : a purger` |
| `ws2-c6-e3` | `0\n2\n0\n0` : 0 + 0 = 0 ≤ 0 → `total : 0 Go↵sauvegarde : planifiee` | `24\n3\n8\n8\n9` : 8 + 8 + 9 = 25 > 24 → `total : 25 Go↵sauvegarde : capacite insuffisante` |

Le domaine de `ws2-c5-e2` contient les modes `nat`, `bridge` et `host-only`, tous déjà présents dans un exemple ou un test. Celui de `ws2-c6-e2` contient les quatre couples de `complet`/`lie` et `oui`/`non`, également tous connus. L'existence d'un ancien test `inconnu` ne spécifie pas le comportement de toutes les autres chaînes pour le premier exercice.

## Nouveauté et indépendance

- Les tests initiaux sont récupérés du rapport « avant » ; le pilote vérifie leurs positions, l'empreinte des exemples, des corrigés et des chapitres, ainsi que l'empreinte du catalogue final du rapport « après ». Il vérifie que les 30 témoins initiaux sont effectivement parmi les tests actifs, puis compare les nouveaux cas aux exemples et à tous les tests historiques et actuels.
- Le garde du banc commun vérifie la canonicalisation et certaines représentations littérales ou encodées dans les sources identifiées. Un second garde compare des signatures propres à chaque exercice et des ensembles triés pour rejeter les permutations ; des autocontrôles vérifient aussi le rejet d'un simple renommage de produit, d'espaces, de zéros de tête et d'un ancien test. Ces signatures rendent explicites les dimensions retenues, sans prouver une distinction sémantique universelle ni couvrir tous les encodages et toutes les dépendances.
- Pour `ws2-c5-e1`, la nouveauté porte sur la restitution de noms comportant une **version structurée**, dont un nom composé, et non sur une troisième catégorie d'hyperviseur. L'énoncé n'interdit pas ces noms. Si l'on exige une nouvelle catégorie de classification plutôt qu'une nouvelle structure du champ restitué, cet exercice ne peut pas la fournir avec ses seuls types 1 et 2.
- Pour `ws2-c6-e1`, l'âge nul et l'âge d'un an distinguent des situations temporelles, mais ne créent pas de nouvelle branche après couverture du seuil de sept jours. `084`, `095` et `0000` satisfont au minimum de longueur littérale du banc : après canonicalisation, leur nouveauté porte bien sur les valeurs 84, 95 et 0, et non sur les zéros de tête.
- Les valeurs nulles sont retenues lorsque l'énoncé ne précise pas de borne positive. L'oracle exige notamment des entiers décimaux non négatifs, des listes de 1 à 100 éléments et des sommes dans la plage entière étudiée ; ces hypothèses et cas n'établissent pas le comportement hors domaine.
- L'oracle Python réutilisé est séparé des corrigés PowerShell et ne les lit pas, mais ses règles et les attendus manuels reposent sur la même lecture des énoncés. Ils ne constituent pas une expertise humaine indépendante.

## Exécution et fichiers

Le pilote lance chaque corrigé et chaque entrée dans une invocation Bubblewrap distincte, sans accès au catalogue ni à l'oracle ; il contrôle aussi les espaces de noms réseau, l'absence de `/home`, la variable `HOME` et `pid1`. Le comparateur fait ensuite appel à `runTests` avec la sortie effectivement obtenue. L'appel séparé du banc commun réexécute les mêmes 30 cas. Pas de fournisseur distant ni de Windows réel ; Bubblewrap n'emploie ici ni cgroup ni profil seccomp dédié.

Fichiers ajoutés dans le worktree :

- `corrections/outils/sondes/generalisation/cas_rd_winserver_complement.json` : 30 entrées, attendus manuels et motifs de distinction, plus deux domaines non évalués.
- `corrections/outils/sondes/generalisation/rd_winserver_complement_semantique.py` : signatures et garde contre les permutations.
- `corrections/outils/sondes/generalisation/rd_winserver_complement_banc.py` et `rd_winserver_complement_rejouer.sh` : contrôles et lancement confinés, réutilisant les outils et l'oracle précédents.
- `corrections/resultats/rd_winserver-lot1-partie3-complement.json` et `rd_winserver-lot1-partie3-complement-rejeu.json` : sorties, oracles, verdicts, autocontrôles et empreintes.
- `corrections/resultats/rd_winserver-lot1-partie3-complement.md` : ce rapport et les calculs manuels.

Le catalogue `server/exercises/rd_winserver.js` conserve l'empreinte SHA-256 `1805b548c80183ec297fd8f28b67e84e0c1b5eee6d131f0230932918f4b78335` du rapport précédent ; son changement antérieur reste non commité. `banc.py` et `rejouer.sh` communs sont inchangés. Aucune branche ni aucun commit n'a été créé.

## Reproduction

Prévoir Linux avec namespaces utilisateur et Bubblewrap imbriqués, `prlimit`, Python 3, Node 22 et le runtime PowerShell spécifié. Les fichiers de la partie précédente, dont les rapports avant/après et la liste de la partie 2, doivent rester présents et inchangés. La mesure vérifie PowerShell 7.6.0 ; l'exécutable utilisé a pour SHA-256 `d1f628127a6f1e93cee55c0304031519a2c6ae977e7b6bfd26dbd0f76e69182b`. Node observé : 22.23.2.

```bash
cd '/tmp/revi-winserver-lot1p3.PWhzxGYV/worktree'
POWERSHELL_DIR=/tmp/revi-lot0.zFUSif/runtimes/powershell \
  bash corrections/outils/sondes/generalisation/rd_winserver_complement_rejouer.sh \
  > /tmp/rd-winserver-complement-reproduction.json
python3 - corrections/resultats/rd_winserver-lot1-partie3-complement.json \
  /tmp/rd-winserver-complement-reproduction.json <<'PY'
import json, sys
with open(sys.argv[1], encoding='utf-8') as stream:
    reference = json.load(stream)
with open(sys.argv[2], encoding='utf-8') as stream:
    reproduction = json.load(stream)
for rapport in (reference, reproduction):
    rapport.pop('debut_utc', None)
    rapport.pop('fin_utc', None)
assert reference == reproduction and reproduction['mesure_complete']
print('Rapports identiques hors dates ; mesure complète.')
PY
```

La commande renvoie 0 si les 30 comparaisons et les 15 audits du banc réussissent, 1 en cas de mesure incomplète et 2 en cas d'incident du pilote. Les rapports JSON incluent les empreintes précises des entrées, outils et références. Un runtime, un catalogue, une version de Node ou des fichiers de référence différents peuvent empêcher une reproduction identique.

Une troisième exécution de la commande documentée a également concordé avec le rapport enregistré hors dates. `bash -n` sur le lanceur, l'analyse syntaxique Python, le décodage JSON et la vérification des 30 sorties ont réussi. Un contrôle ciblé a en outre vérifié que `10\n11` et `11\n10` possèdent des signatures différentes mais la même clé de permutation, et que le garde rejette effectivement la seconde. `git diff --check` et le contrôle des sept nouveaux fichiers n'ont produit aucun diagnostic d'espaces ; avec `--no-index`, le code 1 signale normalement la différence avec `/dev/null`.

## Intégration ultérieure au banc global

Le banc global n'enregistre pas automatiquement ce paquet. Sans modifier les fichiers communs maintenant, son intégration nécessitera d'ajouter `("cas_rd_winserver_complement.json", "rd_winserver.py", "ws2-")` à `PAQUETS_SUPPLEMENTAIRES` dans `banc.py`, de copier le manifeste et l'oracle dans la liste `fichiers_paquet` de `rejouer.sh`, puis d'ajouter `rd_winserver.py` à l'ensemble des autocontrôles de paquets attendu par ce lanceur. Il faut fournir `POWERSHELL_DIR` au lancement et éviter tout autre paquet enregistrant les mêmes 15 identifiants.

Le banc commun actuel ne fait que ses propres contrôles de nouveauté : pour conserver aussi le garde sémantique et la comparaison à l'historique, il faudrait les intégrer explicitement avec leurs fichiers et références. Le champ `non_evalues` du manifeste n'est pas automatiquement exploité par le chargeur global ; les deux domaines finis doivent donc garder un motif explicite de non-évaluation. Aucune de ces modifications communes ni aucun audit global ne sont effectués ici.
