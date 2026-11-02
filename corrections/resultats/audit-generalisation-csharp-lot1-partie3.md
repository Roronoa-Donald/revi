# Audit C# — lot 1, partie 3

Date : 30 octobre 2026. Travail effectué dans le worktree détaché personnel `/tmp/revi-csharp-lot1-partie3-38C2mW`, créé depuis `8bc35a1a37ce6a9d0195623a60cf52ee49063c43`. Aucune branche ni aucun commit n'ont été créés. Le répertoire principal a évolué en parallèle ; ses modifications n'ont pas été utilisées ni modifiées ici. Le lot 2 n'a pas été commencé.

## Périmètre et résultat

Le complément `generalisation-lot1-partie2-complement.json` contient 17 exercices C# `non évalué` avec un unique témoin manuel conforme. Ils sont tous couverts ici ; `csb2-c1-e1`, déjà évalué par le banc précédent, est hors périmètre. La notation du cours reste suspendue.

- 34 entrées principales, deux par exercice, sont nouvelles au regard du contrôle décrit ci-après. Les 17 vrais corrigés ont compilé et les 34 sorties sont conformes aux attendus manuels et à la référence calculée.
- Deux sondes supplémentaires, séparées des 34 cas principaux car leur admissibilité dépend de précisions absentes des énoncés, présentent chacune une divergence : `.75` et le dépassement de la somme des durées au-delà d'Int64.
- 34 mutants C# concrets ont été générés, compilés et exécutés. Chacun est rejeté sur au moins un cas principal pour lequel son corrigé est conforme. Le JSON contient chaque source C# réellement compilée, sa mutation, son empreinte et ses sorties.
- Les corrigés passent également 151/151 exécutions historiques. Les 34 mutants ont subi 302 exécutions historiques : 157 conformes et 145 sorties incorrectes. Quatre mutants passent tous leurs anciens cas mais sont rejetés par les nouvelles entrées.
- Au total : 51 programmes du catalogue et mutants, 108 exécutions sur les 34 cas principaux et deux sondes conditionnelles, puis 453 exécutions historiques. La comparaison ne considère pas une erreur d'infrastructure ou de compilation comme un mutant rejeté.
- Les 17 contrôles ciblés du banc et de l'oracle passent. Le vérificateur indépendant du rapport réussit ; des altérations du code d'un mutant, de la sortie d'un corrigé et d'une empreinte historique sont chacune rejetées.

## Cas et mutants par exercice

Les deux sorties exactes et les justifications arithmétiques ou métier figurent dans `cas_csharp_lot1_partie3.json` et dans le rapport JSON. Dans le tableau, `C1` ou `C2` est le numéro du nouveau cas principal qui rejette le mutant ; `ancien x/y` est le nombre de cas historiques passés sur ceux exécutés, et non une estimation.

| Exercice | Cas principaux 1 et 2 | Mutant 1 rejeté | Mutant 2 rejeté |
| --- | --- | --- | --- |
| `csb2-c1-e2` | Reste négatif ; alias `ref`/`out` | `reste-toujours-positif` : C1, ancien 9/9 | `out-alias-local` : C2, ancien 9/9 |
| `csb2-c1-e3` | Frontière 10 et 10,01 ; égalité numérique 2,5/2,50 | `seuil-cercle-inclus` : C1, ancien 5/8 | `egalite-textuelle-des-cotes` : C2, ancien 8/8 |
| `csb2-c2-e1` | Retrait exact et rejet sans modification ; montant nul et solde | `montant-zero-accepte` : C2, ancien 5/9 | `retrait-exact-refuse` : C1, ancien 4/9 |
| `csb2-c2-e2` | Trois surcharges, dont un nom à virgule ; deux prix décimaux | `nom-par-defaut-incorrect` : C1, ancien 3/8 | `delegation-fictive` : C1/C2, ancien 3/8 |
| `csb2-c2-e3` | Copies successives et ordre des propriétés ; copie égale puis modifiée | `copie-partagee` : C1/C2, ancien 3/8 | `egalite-par-identite` : C1/C2, ancien 1/8 |
| `csb2-c3-e1` | Dispatch virtuel et masquage statique dans deux séquences | `virtuel-statique` : C1/C2, ancien 3/9 | `masquage-dynamique` : C1/C2, ancien 5/9 |
| `csb2-c3-e2` | Casts et accès direct, réordonnés et répétés | `interface-confondue` : C1/C2, ancien 2/10 | `acces-direct-autorise` : C1/C2, ancien 3/10 |
| `csb2-c3-e3` | Pipelines mélangés et répétés dans deux séquences | `validation-virement-incomplete` : C1/C2, ancien 4/10 | `journalisation-omise` : C1/C2, ancien 1/10 |
| `csb2-c4-e1` | Mise à jour, casse et arrêt sur `GET` ; valeur zéro présente | `ajout-sans-mise-a-jour` : C1, ancien 6/9 | `cles-sans-casse` : C1, ancien 6/9 |
| `csb2-c4-e2` | Codes 404/500 et autres types ; 499/501 et autres types | `seuil-serveur-exclus` : C1, ancien 5/10 | `filtre-client-sans-type` : C1/C2, ancien 9/10 |
| `csb2-c4-e3` | Ordre légal `class, IComparable, new()` ; `struct, IComparable` | `ordre-des-motifs-selon-entree` : C1, ancien 9/9 | `struct-inverse` : C2, ancien 6/9 |
| `csb2-c5-e1` | Seuil inclusif et égalités stables ; aucun article retenu | `seuil-strict` : C1, ancien 4/9 | `egalites-triees-par-nom` : C1, ancien 8/9 |
| `csb2-c5-e2` | Deux groupes, sommes et moyennes ; ordre et valeurs nulles | `somme-au-lieu-moyenne` : C1/C2, ancien 2/9 | `groupes-decroissants` : C1/C2, ancien 3/9 |
| `csb2-c5-e3` | Retrait du dernier doublon et préfixe ; retrait d'un absent | `premier-abonnement-retire` : C1, ancien 6/9 | `desabonnement-par-prefixe` : C1, ancien 8/9 |
| `csb2-c6-e1` | Quatre durées cumulées dont zéro ; une seule tâche | `duree-remplacee` : C1, ancien 2/9 | `duree-unitaire` : C1/C2, ancien 1/9 |
| `csb2-c6-e2` | Deux échecs ordonnés ; trois succès | `erreurs-inversees` : C1, ancien 3/8 | `succes-double` : C1/C2, ancien 2/8 |
| `csb2-c6-e3` | Exception puis arrêt et `Dispose` ; `EXIT` puis nettoyage | `dispose-omis-apres-throw` : C1, ancien 3/8 | `exit-ignore` : C2, ancien 6/8 |

Les quatre nouveaux discriminants contre des mutants ayant passé tous les anciens cas sont donc : reste C# négatif, alias d'un `out` et d'un `ref`, comparaison numérique de dimensions ayant des écritures différentes, et ordre des motifs de violation avec `new()` placé légalement en dernier. Plusieurs autres mutations sont explicitement reprises ou adaptées du banc historique ; elles ne sont pas présentées comme inédites.

## Anomalies et limites de domaine

### Prix sans zéro initial — `csb2-c2-e2`

La sonde `NEW Article("L-2", "Carte", .75)` attend `Prix=0.75`, mais le corrigé affiche `Prix=75.00`. L'extraction numérique dans `server/exercises/csharp.js:360` reconnaît `75` sans le point. Une sonde C# séparée, compilée et exécutée sous le même confinement avec un constructeur prenant un `double`, confirme que le littéral C# `.75` vaut `0.75`.

L'énoncé de la simulation ne définit cependant pas la grammaire exacte des prix ni le type du constructeur. L'anomalie n'est donc un défaut sur entrée admissible que si ce format est accepté. Clarifier la grammaire avant de modifier le parseur ; ne pas compter cette sonde comme l'un des deux cas principaux.

### Dépassement de durée — `csb2-c6-e1`

Les durées individuelles `9223372036854775807` et `1` tiennent dans Int64. Leur somme mathématique est `9223372036854775808`, mais le corrigé affiche `-9223372036854775808` après l'addition dans `server/exercises/csharp.js:629`. L'énoncé ne précise pas si le total doit tenir dans Int64. Si une telle borne est voulue, le cas doit être explicitement déclaré hors domaine ; sinon il faut traiter ou signaler le dépassement. Cette sonde reste distincte des deux cas principaux.

### Contraintes génériques historiques — `csb2-c4-e3`

L'énoncé affirme que les combinaisons fournies respectent les règles C#, mais l'exemple et un test du catalogue utilisent `class, new(), IComparable` (`server/exercises/csharp.js:1149`). Une compilation isolée de cette clause renvoie `CS0401` : `new()` doit être la dernière contrainte restrictive. La clause `class, IComparable, new()` compile. Il s'agit d'un défaut des données ou de l'énoncé historique, pas d'une preuve que le simulateur échoue sur ses propres entrées. Les nouveaux cas utilisent l'ordre légal tout en vérifiant l'ordre de restitution des violations imposé par l'énoncé.

## Indépendance, nouveauté et confinement

Les attendus ont été écrits à partir des règles et des calculs de l'énoncé, puis recoupés par `csharp_lot1_partie3.py`, sans exécuter les corrigés pour les calculer. La référence est bornée aux formats exercés : notamment, la collation `GroupBy` n'est revendiquée que pour les catégories ASCII à initiales distinctes choisies ici ; les arrondis retenus évitent les cas limites non établis. Les libellés fixes dépendent aussi du barème publié.

Pour `csb2-c3-e1`, `csb2-c3-e2` et `csb2-c3-e3`, les appels ou pipelines atomiques et leurs réponses étaient déjà couverts : les nouvelles entrées sont des séquences recombinées, pas de nouveaux comportements atomiques indépendants. Le modèle de contraintes de `csb2-c4-e3` est également fini. Une réussite sur ces recombinaisons ne démontre pas une généralisation sémantique indépendante. Plus généralement, deux cas ne prouvent ni correction universelle ni absence de mémorisation.

L'extracteur compare les 36 entrées aux 162 anciens exemples, tests, témoins et cas C# recensés, ainsi qu'entre elles, après normalisation des espaces. Il recherche aussi les chaînes intégrales et certaines représentations échappées ou encodées dans les sources pertinentes. Le profil des tests historiques doit être reconnu. Ce contrôle démontre une nouveauté littérale dans ce corpus, pas l'absence de toute équivalence sémantique ou de tous les encodages et générateurs possibles.

Le lanceur copie et empreinte les sources avant exécution. Les vrais corrigés et mutants sont compilés puis lancés dans des environnements bubblewrap imbriqués distincts : réseau séparé avec seule l'interface `lo`, aucun `HOME`, ni catalogue, ni source du dépôt, ni fixture, ni oracle accessibles aux candidats ; Git est masqué. Les vérifications d'isolement et de limites réussissent. `/usr` reste monté en lecture seule et le noyau est partagé : ce confinement n'est pas présenté comme une preuve de sécurité absolue contre un programme hostile. Les empreintes des 19 sources suivies et des composants d'outillage contrôlés sont stables ; la copie du dépôt n'est pas un instantané atomique global.

## Rejeu et intégration éventuelle

La préparation effectuée depuis le dépôt principal a utilisé :

```sh
worktree=$(mktemp -d /tmp/revi-csharp-lot1-partie3-XXXXXX)
git worktree add --detach "$worktree" HEAD
git -C "$worktree" rev-parse HEAD
```

Le chemin et le SHA obtenus sont indiqués en tête de ce rapport. Depuis ce worktree, le rejeu principal effectué est :

```sh
REVI_NODE="$(command -v node)" REVI_JOBS=3 \
  /bin/sh corrections/outils/sondes/generalisation/rejouer_csharp_lot1_partie3.sh "$PWD" \
  > corrections/resultats/generalisation-csharp-lot1-partie3.json
```

Avec les sources et outils constatés, il termine avec le code **1**, parce que les deux sondes conditionnelles divergent ; ce n'est ni un échec de compilation ni une interruption du banc. Le détail est dans `rejeu-generalisation-csharp-lot1-partie3.txt`. Les commandes complètes des 17 tests confinés et leurs résultats sont dans `tests-generalisation-csharp-lot1-partie3.txt`. Le contrôle du JSON et ses trois essais d'altération sont dans `verification-generalisation-csharp-lot1-partie3.txt`. Outils observés : Node 22.23.2, Python 3.14.7, SDK .NET 10.0.401 et runtime 10.0.12.

La vérification isolée du rapport non altéré est reproductible par :

```sh
bwrap --unshare-all --die-with-parent --new-session --ro-bind /usr /usr \
  --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64 \
  --ro-bind "$(readlink -f "$(command -v node)")" /usr/bin/node --ro-bind "$PWD" /source \
  --proc /proc --dev /dev --tmpfs /tmp --clearenv --setenv PATH /usr/bin:/bin --chdir /source \
  /usr/bin/node /source/corrections/outils/sondes/generalisation/verifier_rapport_csharp_lot1_partie3.js \
  /source/corrections/resultats/generalisation-csharp-lot1-partie3.json /source
```

Aucun fichier partagé n'a été modifié. Pour une intégration ultérieure au banc commun, il faudrait, après revue des changements parallèles :

1. Ajouter `cas_csharp_lot1_partie3.json` et `csharp_lot1_partie3.py` à la copie contrôlée de `generalisation/rejouer.sh`, puis enregistrer leur paire dans `PAQUETS_SUPPLEMENTAIRES` de `generalisation/banc.py`.
2. Conserver séparément les sondes conditionnelles et les domaines finis ; ne pas les promouvoir automatiquement en réussite de généralisation indépendante. Le banc commun devrait également vérifier les témoins et fixtures historiques supplémentaires et respecter la comparaison C# stricte utilisée ici.
3. Clarifier et corriger, si autorisé, les formats et données signalés ci-dessus ; adapter les vérifications de profil historiques si les fichiers qu'elles protègent changent. Ne pas lever la suspension de notation sur la seule base de ce lot.

## Fichiers propres à ce lot

- `corrections/outils/sondes/generalisation/cas_csharp_lot1_partie3.json`
- `corrections/outils/sondes/generalisation/csharp_lot1_partie3.py`
- `corrections/outils/sondes/generalisation/mutants_csharp_lot1_partie3.json`
- `corrections/outils/sondes/generalisation/extraire_csharp_lot1_partie3.js`
- `corrections/outils/sondes/generalisation/banc_csharp_lot1_partie3.py`
- `corrections/outils/sondes/generalisation/rejouer_csharp_lot1_partie3.sh`
- `corrections/outils/sondes/generalisation/tests_csharp_lot1_partie3.py`
- `corrections/outils/sondes/generalisation/verifier_rapport_csharp_lot1_partie3.js`
- `corrections/resultats/generalisation-csharp-lot1-partie3.json`
- `corrections/resultats/rejeu-generalisation-csharp-lot1-partie3.txt`
- `corrections/resultats/tests-generalisation-csharp-lot1-partie3.txt`
- `corrections/resultats/verification-generalisation-csharp-lot1-partie3.txt`
- `corrections/resultats/audit-generalisation-csharp-lot1-partie3.md`
