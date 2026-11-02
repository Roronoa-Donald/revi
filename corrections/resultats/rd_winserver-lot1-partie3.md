# Lot 1, partie 3 — RD WinServer

## Bilan

La demande est **partiellement satisfaite au sens strict de la nouveauté** : 17 fiches ont été examinées, mais deux de leurs domaines énumérés sont déjà couverts par les exemples et les tests antérieurs. Il n'existe donc pas, dans ces deux domaines, deux nouvelles valeurs sémantiques à produire sans ajouter une hypothèse à l'énoncé.

- Quinze fiches possèdent deux témoins initialement inédits : **30 témoins** contrôlés et désormais actifs.
- Deux fiches à domaine fini possèdent chacune deux **contrôles déjà connus**, et non deux témoins inédits.
- Les 17 corrigés sont acceptés sur les témoins et sur les tests actifs, avant et après modification.
- Les deux variantes de chaque fiche présentent un croisement : le premier témoin rejette la première variante et accepte la seconde ; le second fait l'inverse. Les 17 croisements sont également présents dans les tests actifs après modification. Pour les deux domaines finis, les témoins du croisement sont déjà connus.
- Sur 34 mutants, les tests initiaux en rejettent 25 et en acceptent neuf. Les tests modifiés rejettent les 34 par mauvaise sortie ; aucun mutant n'a été classé comme rejeté à cause d'un incident d'exécution.
- `ws2-c4-e3`, déjà évalué en partie 2, n'a pas été inclus ni modifié.

## Périmètre et environnement

- Worktree personnel détaché : `/tmp/revi-winserver-lot1p3.PWhzxGYV/worktree`.
- Dépôt Git nu local utilisé comme source du worktree : `/tmp/revi-winserver-lot1p3.PWhzxGYV/source.git`. La copie a été créée pour ne pas enregistrer de worktree dans le dépôt principal.
- Révision initiale : `8bc35a1a37ce6a9d0195623a60cf52ee49063c43` ; aucune branche ni aucun commit n'ont été créés.
- PowerShell local : `/tmp/revi-lot0.zFUSif/runtimes/powershell/pwsh`, version **7.6.0** ; Node **22.23.2**.
- Les six modules de chapitre, le correcteur et les adaptateurs d'exécution utilisés sont identiques à ceux du répertoire principal au moment du contrôle. Le registre principal `server/exercises/index.js` diffère de cette révision uniquement sur la projection des exercices `analyse` ; cette différence ne concerne pas la branche PowerShell de `toClient`.
- Dans le worktree, les deux fichiers communs `corrections/outils/sondes/generalisation/banc.py` et `rejouer.sh` sont inchangés par rapport à la révision initiale. Leurs modifications déjà présentes dans le répertoire principal, liées à un autre paquet, n'ont pas été écrasées.

## Matrice des 17 fiches

La colonne « avant » compte les variantes rejetées par les tests actifs d'origine ; « après » compte celles rejetées par les tests actifs modifiés. Les sauts de ligne des entrées sont représentés par `\n`. Les 17 paires présentent le croisement décrit dans le bilan.

| Fiche | Nature des témoins | Entrées A et B | Avant | Après |
|---|---|---|---:|---:|
| `ws2-c1-e1` | inédits | `1\n73` ; `3\n23\n14\n0` | 2/2 | 2/2 |
| `ws2-c1-e2` | inédits | `3\n3\noui` ; `5\n1\noui` | 0/2 | 2/2 |
| `ws2-c1-e3` | inédits | `240\n240` ; `510\n125` | 2/2 | 2/2 |
| `ws2-c2-e1` | inédits | `2\n1` ; `6\n2` | 1/2 | 2/2 |
| `ws2-c2-e2` | inédits | `6\n2` ; `2\n18` | 2/2 | 2/2 |
| `ws2-c2-e3` | inédits | `3\ncritique\nwarning\ncritique` ; `3\ninfo\ncritique\ninfo` | 1/2 | 2/2 |
| `ws2-c3-e1` | inédits | `6\n3` ; `7\n4` | 2/2 | 2/2 |
| `ws2-c3-e2` | inédits | `2\nactif\nactif` ; `3\nactif\nactif\nveille` | 2/2 | 2/2 |
| `ws2-c3-e3` | inédits | `2\n5` ; `24\n4` | 2/2 | 2/2 |
| `ws2-c4-e1` | inédits | `3\nechec\nok\nechec` ; `2\nechec\nok` | 2/2 | 2/2 |
| `ws2-c4-e2` | inédits | `060` ; `085` | 0/2 | 2/2 |
| `ws2-c5-e1` | inédits | `1\nXen` ; `2\nParallels` | 2/2 | 2/2 |
| `ws2-c5-e2` | connus, domaine fini | `nat` ; `bridge` | 1/2 | 2/2 |
| `ws2-c5-e3` | inédits | `12\n12` ; `12\n6` | 2/2 | 2/2 |
| `ws2-c6-e1` | inédits | `008` ; `006` | 1/2 | 2/2 |
| `ws2-c6-e2` | connus, domaine fini | `complet\noui` ; `lie\nnon` | 1/2 | 2/2 |
| `ws2-c6-e3` | inédits | `100\n2\n100\n0` ; `100\n2\n60\n50` | 2/2 | 2/2 |

Les tailles nulles sont considérées admissibles dans les exercices de totalisation : les énoncés ne les interdisent pas. Les valeurs `060`, `085`, `008` et `006` sont des écritures décimales acceptées par le runtime utilisé ; après canonicalisation numérique, les valeurs nouvelles sont respectivement 60, 85, 8 et 6. Les seuils figurent dans les énoncés : la nouveauté concerne les **entrées testées**, pas le caractère secret des seuils.

Pour `ws2-c5-e2`, les modes `nat`, `bridge` et `host-only` sont tous déjà présents dans l'exemple ou les tests. Le test historique `inconnu` ne suffit pas à attribuer un comportement spécifié à toutes les autres chaînes. Pour `ws2-c6-e2`, les quatre couples possibles de type et de suppression sont déjà présents. Les variations de casse ou de format ne sont pas présentées comme de nouveaux scénarios sémantiques.

## Corrections apportées

Les neuf mutants acceptés initialement correspondaient aux défauts suivants :

- `ws2-c1-e2` : exiger plus de trois copies ; ignorer le nombre minimal de supports.
- `ws2-c2-e1` : exiger deux nœuds actifs pour maintenir le service.
- `ws2-c2-e3` : compter les avertissements parmi les événements critiques.
- `ws2-c4-e2` : exclure 60 de la plage chaude ; exclure 85 de la plage dangereuse.
- `ws2-c5-e2` : refuser l'accès Internet en NAT.
- `ws2-c6-e1` : attendre plus de huit jours avant purge.
- `ws2-c6-e2` : déclarer toujours hors service un clone lié, même si sa source existe.

Dans `server/exercises/rd_winserver.js`, les 30 témoins initialement nouveaux ont été ajoutés aux 15 fiches concernées. Pour les deux domaines finis, `verifyFirstExample` active l'exemple visible déjà existant : NAT pour le premier et clone lié avec source présente pour le second. Les tests préexistants et les corrigés sont conservés. Les fiches ciblées ont au plus six tests cachés, sous la limite `MAX_TESTS = 7` ; les deux exemples activés sont ajoutés séparément par `runTests`.

Pour une solution correcte, ces ajouts représentent deux exécutions supplémentaires par fiche non finie, ou une pour chacun des deux domaines finis. La consommation du fournisseur doit donc être prise en compte lors de l'intégration.

## Méthode et preuves

Les entrées et attendus manuels sont dans `corrections/outils/sondes/generalisation/cas_rd_winserver.json`. L'oracle Python séparé `rd_winserver.py` calcule les attendus à partir d'une lecture bornée des énoncés, sans importer les corrigés. Pour chaque fiche, l'autocontrôle rejette un attendu volontairement erroné et un oracle absent. Cet oracle et les attendus sont toutefois issus de la même lecture : il ne s'agit pas d'une expertise humaine indépendante.

Outre le catalogue et les traces, les nouveaux fichiers de sonde sont :

- `corrections/outils/sondes/generalisation/cas_rd_winserver.json`
- `corrections/outils/sondes/generalisation/rd_winserver.py`
- `corrections/outils/sondes/generalisation/rd_winserver_banc.py`
- `corrections/outils/sondes/generalisation/rd_winserver_comparer.js`
- `corrections/outils/sondes/generalisation/rd_winserver_rejouer.sh`
- `corrections/outils/sondes/generalisation/rd_winserver_verifier.js`

Le banc spécifique réutilise `banc.py` pour la provenance, la canonicalisation, les contrôles de nouveauté et les exécutions isolées. Chaque programme et chaque entrée distincte sont exécutés dans un processus PowerShell séparé, sous Bubblewrap ; les contrôles rapportent un réseau séparé et l'absence de répertoire personnel, de catalogue et d'oracle dans l'environnement candidat. Les limites de ressources sont locales, sans cgroup ni profil seccomp dédié.

Chaque mesure a lancé 252 exécutions distinctes candidat/entrée ; les cellules qui réutilisent la même entrée pour un même candidat réutilisent cette sortie. Les matrices comportent 258 cellules avant et 354 après, toutes exécutées ou associées à une exécution correspondante, sans cellule non évaluée.

Le comparateur transmet ensuite les sorties réellement recueillies au vrai `runTests`. Il vérifie individuellement les cellules et rejoue le comportement d'arrêt au premier échec sur les tests actifs. Tous les cas sont exécutés pour la matrice, y compris ceux qu'une soumission réelle n'atteindrait pas après son premier échec. Aucun fournisseur distant ni environnement Windows n'a été exécuté.

La nouveauté a été vérifiée **avant** l'ajout des tests : comparaison canonicalisée aux exemples et tests existants, puis recherche bornée de représentations littérales et encodées dans les sources identifiées. Les tests sont maintenant actifs et ne peuvent plus être présentés comme nouveaux par rapport au catalogue actuel. Cette vérification ne couvre pas tous les encodages ou toutes les dépendances ; le croisement ne démontre pas une indépendance générale contre d'autres fautes, ni une correction universelle.

Traces nominatives complètes, sorties, états, empreintes et environnement :

- `corrections/resultats/rd_winserver-lot1-partie3-avant.json`
- `corrections/resultats/rd_winserver-lot1-partie3-apres.json`
- `corrections/resultats/rd_winserver-lot1-partie3-rejeu.json`
- `corrections/resultats/rd_winserver-lot1-partie3-verification.txt`
- `corrections/resultats/rd_winserver-lot1-partie3-catalogue.patch`

Un second rejeu de la phase finale a produit les mêmes sorties et les mêmes verdicts pour les 51 candidats. Il reprend les mêmes cas et le même oracle : il ne constitue pas une validation indépendante de leur conception.

## Commandes exécutées

Les deux commandes de mesure ont été exécutées dans le worktree à leurs étapes respectives. La première a précédé la modification du catalogue ; la rejouer sur le catalogue final refuserait à juste titre les témoins désormais actifs.

```sh
POWERSHELL_DIR=/tmp/revi-lot0.zFUSif/runtimes/powershell \
  bash corrections/outils/sondes/generalisation/rd_winserver_rejouer.sh avant \
  > corrections/resultats/rd_winserver-lot1-partie3-avant.json

POWERSHELL_DIR=/tmp/revi-lot0.zFUSif/runtimes/powershell \
  bash corrections/outils/sondes/generalisation/rd_winserver_rejouer.sh apres \
  > corrections/resultats/rd_winserver-lot1-partie3-apres.json

node corrections/outils/sondes/generalisation/rd_winserver_verifier.js \
  > corrections/resultats/rd_winserver-lot1-partie3-verification.txt

POWERSHELL_DIR=/tmp/revi-lot0.zFUSif/runtimes/powershell \
  bash corrections/outils/sondes/generalisation/rd_winserver_rejouer.sh apres \
  > corrections/resultats/rd_winserver-lot1-partie3-rejeu.json
```

Les contrôles syntaxiques ciblés JavaScript, Python, JSON et shell, le plafond des tests, la projection client et `git diff --check` ont également réussi. Le patch du catalogue a passé `git apply --check` sur le répertoire principal, sans application. Aucune suite complète, régénération de pages, publication ni déploiement n'a été effectué.

## Intégration ultérieure

Après autorisation et vérification d'absence de modifications concurrentes, appliquer uniquement `rd_winserver-lot1-partie3-catalogue.patch` et rapatrier les nouveaux fichiers portant `rd_winserver` dans `corrections/outils/sondes/generalisation/` et `corrections/resultats/`. Ne pas remplacer `banc.py`, `rejouer.sh` ni le registre principal. Le contrôle à blanc du patch ne garantit pas qu'il restera applicable après d'autres modifications.

Pour reproduire la mesure initiale, utiliser une autre copie détachée à la révision indiquée avec les nouveaux fichiers de sonde mais **sans** le patch du catalogue. Pour une mesure finale après intégration, conserver le rapport initial, rejouer la phase `apres` puis `rd_winserver_verifier.js` avec les outils effectivement présents dans la copie d'intégration.

Cette sonde spécifique n'est **pas enregistrée automatiquement** dans l'audit général : les fichiers communs ne sont pas modifiés. Une intégration à cet audit nécessiterait une autorisation distincte, l'enregistrement du paquet et de ses autocontrôles, puis de nouveaux cas de généralisation distincts des tests désormais actifs. Le contrôle des deux domaines finis doit rester explicitement séparé : les valeurs déjà connues ne satisfont pas le critère de nouveauté.
