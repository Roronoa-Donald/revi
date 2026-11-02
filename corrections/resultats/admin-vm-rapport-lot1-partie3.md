# Lot 1, partie 3 — exercices PowerShell admin-vm

**Date :** 30 octobre 2026. **Périmètre :** les 18 fiches `vm2-*`, sans lot 2, sans fournisseur distant ni déploiement. Le worktree personnel est `/tmp/revi-admin-vm-lot1p3.jGwfas`, détaché sur `8bc35a1a37ce6a9d0195623a60cf52ee49063c43`. Aucune branche ni aucun commit n'a été créé ; les fichiers de travail du répertoire principal n'ont pas été modifiés. L'inscription du worktree modifie seulement les métadonnées Git nécessaires.

La partie 2 listait bien les 18 fiches comme non évaluées dans `corrections/resultats/generalisation-non-evalues-lot1-partie2-complement.tsv`. Les présents résultats sont un banc séparé : ils ne modifient pas automatiquement ce relevé historique ni le bilan global.

## Résultat et limites de nouveauté

| Mesure | Avant | Après |
|---|---:|---:|
| Corrigés acceptés sur tous les tests actifs et les deux témoins | 18/18 | 18/18 |
| Paires distinguant chacune les deux variantes principales, en sens opposés | 18/18 | 18/18 |
| Paires d'entrées non retrouvées dans le périmètre contrôlé | 13/18 | 13/18 |
| Paires réutilisées car le domaine énoncé est épuisé | 5/18 | 5/18 |
| Variantes incorrectes rejetées par les tests actifs | 18/38 | 38/38 |
| Variantes incorrectes acceptées par les tests actifs | 20/38 | 0/38 |
| Alternatives conformes sur tout leur domaine fini, acceptées par les tests actifs | 0/3 | 3/3 |
| Comparaisons non évaluées pour incident d'exécution | 0 | 0 |
| Exécutions PowerShell isolées | 288 | 324 |

Les 38 variantes comprennent deux variantes principales par fiche et deux variantes réseau supplémentaires. Les 612 exécutions figurant dans les deux rapports finaux ont été lancées séparément, une exécution par candidat et par entrée distincte ; le correcteur réel compare ensuite les sorties mémorisées et applique son arrêt au premier échec. Les rejets comptés ci-dessus sont des `wrong_output`, pas des erreurs d'infrastructure.

Les 13 paires sont nouvelles **par rapport aux exemples, tests actifs et représentations littérales ou encodées recherchées dans les modules sources détectés**. Ce n'est ni une recherche dans tous les artefacts historiques ni une preuve de secret ou de nouveauté sémantique universelle. `015` et `025` représentent les entiers 15 et 25 : ce ne sont pas simplement des écritures différentes des VLAN connus 10, 20, 30 et 99. Des scénarios distincts peuvent néanmoins exercer la même branche générale, notamment les deux phases inconnues ou les deux VLAN inconnus.

Pour `vm2-c1-e3`, `vm2-c2-e3`, `vm2-c4-e1`, `vm2-c4-e3` et `vm2-c5-e1`, tous les choix explicitement permis par l'énoncé étaient déjà présents dans les exemples ou les tests. Deux nouvelles entrées **sémantiquement admissibles et distinctes** ne peuvent donc pas être affirmées pour ces fiches sans élargir l'énoncé. Les deux témoins indiqués ci-dessous sont réutilisés ; ils démontrent seulement la distinction des variantes choisies.

L'indépendance observée est différentielle et relative à ces deux variantes : le témoin A rejette la première et accepte la seconde, tandis que B accepte la première et rejette la seconde. Elle ne démontre pas l'indépendance contre toute autre faute. Les attendus sont vérifiés par un oracle Python séparé du code PowerShell, mais l'oracle, les témoins et les variantes ont été conçus par le même intervenant : il ne s'agit pas d'une validation par une deuxième personne.

## Détail des 18 fiches

Dans le tableau, `↵` représente une nouvelle ligne ; `A` signifie accepté et `R` rejeté par mauvaise sortie. Les variantes sont indiquées dans l'ordre du fichier `cas_admin_vm.json`. La fiche `vm2-c5-e3` présente aussi les deux variantes supplémentaires.

| Fiche | Témoins A ; B | Nouveauté | Variantes avant → après |
|---|---|---|---|
| `vm2-c1-e1` | `7 ↵ 0` ; `2 ↵ 9` | non retrouvés | R→R ; R→R |
| `vm2-c1-e2` | `1 ↵ Hyper-A` ; `2 ↵ Hyper-B` | non retrouvés | R→R ; R→R |
| `vm2-c1-e3` | `serveur` ; `poste` | réutilisés | A→R ; R→R |
| `vm2-c2-e1` | `non ↵ 3` ; `oui ↵ 6` | non retrouvés | A→R ; A→R |
| `vm2-c2-e2` | `17 ↵ 6` ; `3 ↵ 7` | non retrouvés | A→R ; A→R |
| `vm2-c2-e3` | `noyau` ; `qemu` | réutilisés | A→R ; R→R |
| `vm2-c3-e1` | `13 ↵ 13` ; `13 ↵ 11` | non retrouvés | R→R ; R→R |
| `vm2-c3-e2` | `maintenance curative` ; `decommission immediate` | non retrouvés | A→R ; A→R |
| `vm2-c3-e3` | `31 ↵ 7 ↵ 6` ; `24 ↵ 1 ↵ 5` | non retrouvés | R→R ; R→R |
| `vm2-c4-e1` | `vg` ; `pv` | réutilisés | A→R ; R→R |
| `vm2-c4-e2` | `42 ↵ 32` ; `42 ↵ 34` | non retrouvés | R→R ; A→R |
| `vm2-c4-e3` | `hebdo` ; `quotidien` | réutilisés | A→R ; R→R |
| `vm2-c5-e1` | `bridge` ; `nat` | réutilisés | A→R ; R→R |
| `vm2-c5-e2` | `015` ; `025` | non retrouvés | R→R ; A→R |
| `vm2-c5-e3` | `lan ↵ lan ↵ 22` ; `autre ↵ autre ↵ 80` | non retrouvés | A→R ; A→R ; A→R ; A→R |
| `vm2-c6-e1` | `8 ↵ 4` ; `7 ↵ 4` | non retrouvés | R→R ; A→R |
| `vm2-c6-e2` | `70 ↵ 70` ; `71 ↵ 70` | non retrouvés | R→R ; A→R |
| `vm2-c6-e3` | `103 ↵ 50` ; `20 ↵ 0` | non retrouvés | A→R ; R→R |

Pour `vm2-c5-e3`, les deux variantes complémentaires interdisent respectivement toute traversée LAN/DMZ ou n'autorisent que le sens LAN→DMZ. Le témoin complémentaire `dmz ↵ lan ↵ 443` les rejette ; il est ensuite devenu un test actif, donc n'est pas compté comme témoin inédit restant. Le cas `autre ↵ autre` interprète deux valeurs identiques `autre` comme la même zone, ce qui correspond au modèle d'entrée et au corrigé ; l'interface ne représente pas deux zones distinctes nommées autrement.

Les 10 variantes historiques `vm2-*` de `corrections/fixtures/banc-360.json` ont été comparées textuellement aux nouvelles variantes de leur fiche : aucun code final n'est exactement identique dans cette archive. Cela ne prouve pas l'absence de variantes équivalentes ailleurs.

## Corrections du catalogue

Dans `server/exercises/admin-vm.js`, 20 tests ont été ajoutés sur 14 fiches ; aucun des 18 exercices ne dépasse la limite de sept tests actifs. Sept ajouts reprennent l'exemple visible : ils corrigent une branche absente des tests mais ne sont pas secrets. Les 20 attendus ajoutés sont confirmés par l'oracle séparé sur le domaine contrôlé.

Trois anciens tests exigeaient une sortie précise pour une entrée non prévue par leur énoncé :

| Fiche | Test retiré | Preuve avant / après |
|---|---|---|
| `vm2-c2-e3` | `inconnu` | Une solution sans branche par défaut réussit `noyau`, `qemu`, `libvirt`, mais était rejetée sur `inconnu` ; elle est ensuite acceptée. |
| `vm2-c4-e1` | `x` | Une solution sans branche par défaut réussit `pv`, `vg`, `lv`, mais était rejetée sur `x` ; elle est ensuite acceptée. |
| `vm2-c4-e3` | `annuel` | Une solution sans branche par défaut réussit `quotidien`, `hebdo`, `mensuel`, mais était rejetée sur `annuel` ; elle est ensuite acceptée. |

Ces trois alternatives ne sont **pas** des mutants incorrects : elles sont conformes sur les domaines explicitement énoncés. Le comportement hors domaine n'étant pas spécifié, il n'est plus imposé par ces tests. Avant correction, 53 attendus actifs étaient confirmés par l'oracle et trois étaient hors de son domaine ; après correction, les 73 attendus actifs sont confirmés. Le corrigé conserve sa branche par défaut, sans que celle-ci soit exigée de l'élève.

La projection `toClient()` des 18 fiches ne contient ni propriété `tests` ni propriété `solution`. Un rechargement du catalogue ne duplique pas les ajouts. Ces contrôles ne remplacent pas une vérification de l'ensemble des pages générées.

## Méthode et traces

- `corrections/outils/sondes/generalisation/cas_admin_vm.json` : 36 témoins, 36 variantes principales, deux supplémentaires et trois alternatives conformes ; transformations et attendus sont explicites.
- `corrections/outils/sondes/generalisation/admin_vm.py` : oracle paramétrique séparé, limité aux entrées et valeurs contrôlées.
- `corrections/outils/sondes/generalisation/sonde_admin_vm.py` : réutilise `banc.py` pour l'export, la recherche de nouveauté, les namespaces, les limites et les exécutions ; elle ne le modifie pas.
- `corrections/outils/sondes/generalisation/comparer_admin_vm.js` : applique `server/exercises/runner.js` aux sorties exécutées et conserve les cellules, arrêts et diagnostics.
- `corrections/outils/sondes/generalisation/rejouer_admin_vm.sh` : lanceur isolé distinct du `rejouer.sh` commun ; `verifier_admin_vm.js` contrôle les rapports, empreintes, ajouts, suppressions, plafond et projection.
- `corrections/resultats/admin-vm-avant-lot1-partie3.json` et `corrections/resultats/admin-vm-apres-lot1-partie3.json` : matrices, sorties, codes, diagnostics et empreintes. `admin-vm-verification-lot1-partie3.json` contient le contrôle structurel et `admin-vm-catalogue-lot1-partie3.patch` le seul diff du catalogue.

Runtime utilisé : `/tmp/revi-lot0.zFUSif/runtimes/powershell/pwsh`, PowerShell 7.6.0, SHA-256 `d1f628127a6f1e93cee55c0304031519a2c6ae977e7b6bfd26dbd0f76e69182b` ; Node 22.23.2. La partie 2 mentionnait Node 22.23.4 : les deux environnements ne sont donc pas identiques. Chaque candidat tourne dans un nouveau namespace Bubblewrap, sans réseau hôte, `HOME`, catalogue ni oracle montés, avec limite de temps et de ressources. Sans cgroup ni profil seccomp dédié, cela ne constitue pas une isolation de production pour du code hostile. Les entrées hors division définie, les débordements et les comportements du fournisseur distant ne sont pas établis par ces jeux.

Le banc et le catalogue sont montés en lecture seule et leur empreinte est contrôlée ; les lectures ne constituent pas un instantané atomique si un autre processus modifie les sources en parallèle. La copie temporaire initiale utilisée ici est `/tmp/revi-admin-vm-avant.ZD1USmb5`.

## Commandes de reproduction

Depuis le worktree, pour reconstruire la copie avant correction puis rejouer les deux états :

```sh
cd /tmp/revi-admin-vm-lot1p3.jGwfas
snapshot=$(mktemp -d /tmp/revi-admin-vm-avant.XXXXXXXX)
mkdir -p "$snapshot/server" "$snapshot/corrections/outils/sondes"
cp -a server/exercises server/services "$snapshot/server/"
cp -a corrections/outils/sondes/generalisation "$snapshot/corrections/outils/sondes/"
git show HEAD:server/exercises/admin-vm.js > "$snapshot/server/exercises/admin-vm.js"
bash "$snapshot/corrections/outils/sondes/generalisation/rejouer_admin_vm.sh" > corrections/resultats/admin-vm-avant-lot1-partie3.json
bash corrections/outils/sondes/generalisation/rejouer_admin_vm.sh > corrections/resultats/admin-vm-apres-lot1-partie3.json
node corrections/outils/sondes/generalisation/verifier_admin_vm.js > corrections/resultats/admin-vm-verification-lot1-partie3.json
git diff --check -- server/exercises/admin-vm.js
git -C "$snapshot" apply --check "$PWD/corrections/resultats/admin-vm-catalogue-lot1-partie3.patch"
```

Le lanceur utilise le runtime demandé par défaut ; `POWERSHELL_DIR` permet d'indiquer son répertoire s'il est déplacé. Les contrôles de syntaxe `bash -n`, `node --check`, l'analyse Python/JSON et `git diff --check` ont aussi réussi. Le patch a été contrôlé sur la copie initiale, sans être appliqué au répertoire principal.

## Intégration à coordonner

Le résultat se trouve uniquement dans le worktree : reprendre le patch du catalogue et les six fichiers `*admin_vm*` du paquet, puis les cinq fichiers `admin-vm-*` de résultats, après vérification des conflits. Ne pas écraser les versions locales de `banc.py` ni de `rejouer.sh` : elles contiennent déjà d'autres modifications dans le répertoire principal.

Le lanceur spécifique fonctionne indépendamment, mais le banc global ne connaît pas automatiquement ce paquet. Une intégration ultérieure devra raccorder `cas_admin_vm.json` et `admin_vm.py` à `PAQUETS_SUPPLEMENTAIRES`, adapter la copie et les contrôles de paquets du `rejouer.sh` commun et les vérifications correspondantes, en préservant les modifications concurrentes. Les cinq domaines finis doivent rester explicitement non évalués au critère de deux entrées inédites, ou être traités séparément comme couverture finie ; ils ne doivent pas être transformés artificiellement en réussites de généralisation. Ces modifications communes et leur rejeu n'ont pas été effectués ici.
