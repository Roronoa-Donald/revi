# Lot 1, partie 3 — B1 Git

## Périmètre et provenance

- Worktree personnel détaché : `/tmp/revi-b1-git-partie3.5fxhqQJR/worktree` ; dépôt Git technique séparé : `/tmp/revi-b1-git-partie3.5fxhqQJR/source.git`.
- Base : `8bc35a1a37ce6a9d0195623a60cf52ee49063c43`. Aucune branche ni aucun commit créé. Le répertoire principal n'a pas été modifié par cette intervention.
- Les rapports `corrections/resultats/generalisation-non-evalues-lot1-partie2.tsv` et `generalisation-non-evalues-lot1-partie2-complement.tsv` identifient les 18 fiches `gt-c1-e1` à `gt-c6-e3` comme non évaluées. Le catalogue global a été lu pour retrouver ces fiches ; seuls leurs corrigés et leurs variantes ont été exécutés.
- Les fichiers communs `corrections/outils/sondes/generalisation/banc.py` et `rejouer.sh` restent inchangés dans le worktree. Les changements concomitants du répertoire principal ne font pas partie de l'instantané utilisé.

## Résultats observés

| Contrôle | Avant | Après |
|---|---:|---:|
| Fiches dont les deux témoins passent | 13/18 | 18/18 |
| Corrigés acceptés par les tests alors actifs | 18/18 | 18/18 |
| Variantes incorrectes sur au moins un témoin | 36/36 | 36/36 |
| Variantes rejetées par les tests alors actifs | 11/36 | 36/36 |

Avant correction, 25 variantes incorrectes échappaient donc aux tests actifs. Après correction, les 36 variantes **figées avant les changements** sont rejetées par le véritable `runTests`, toutes pour `wrong_output` ; leurs empreintes SHA-256 sont identiques dans les rapports avant/après. Les 80 tests actifs finaux ont aussi un attendu cohérent avec l'oracle sur le domaine que celui-ci accepte. Les 36 mêmes classes de mutations ont été réappliquées aux corrigés modifiés : 36/36 sont encore incorrectes sur au moins un témoin et rejetées par les tests actifs. Ce recroisement évite de compter uniquement des rejets dus à un défaut hérité de l'ancien corrigé. Chacun des deux derniers rejeux comprend 240 exécutions sur tests actifs, sans exécution non évaluée.

| Fiche | Corrigé sur témoins avant | Variantes échappées avant | Variantes figées rejetées après |
|---|---|---:|---:|
| gt-c1-e1 | réussi | 2 | 2 |
| gt-c1-e2 | réussi | 2 | 2 |
| gt-c1-e3 | réussi | 2 | 2 |
| gt-c2-e1 | réussi | 1 | 2 |
| gt-c2-e2 | réussi | 2 | 2 |
| gt-c2-e3 | échoué | 2 | 2 |
| gt-c3-e1 | réussi | 2 | 2 |
| gt-c3-e2 | échoué | 1 | 2 |
| gt-c3-e3 | réussi | 0 | 2 |
| gt-c4-e1 | réussi | 1 | 2 |
| gt-c4-e2 | échoué | 1 | 2 |
| gt-c4-e3 | échoué | 2 | 2 |
| gt-c5-e1 | réussi | 2 | 2 |
| gt-c5-e2 | réussi | 0 | 2 |
| gt-c5-e3 | réussi | 2 | 2 |
| gt-c6-e1 | réussi | 1 | 2 |
| gt-c6-e2 | réussi | 2 | 2 |
| gt-c6-e3 | échoué | 0 | 2 |

## Corrections établies

- `gt-c1-e1` et `gt-c1-e2` : une configuration en dernière opération pouvait produire le bon texte mais terminer avec le code 1. Les deux échecs d'exécution sont conservés dans le rapport intermédiaire ; les corrigés terminent maintenant avec le code 0.
- `gt-c2-e3` : un chiffre ou signe en début de message n'est pas une majuscule. Le contrôle utilise une classe de majuscules ; le point final et la limite de 50 caractères sont testés.
- `gt-c3-e2` : `mixed` restitue les changements désindexés ou annulés dans la copie ; `soft 0` ne crée pas un index plein. L'ancien test `Mixed vide l index` déclarait quatre opérations pour trois lignes et son attendu « propre » contredisait la fiche.
- `gt-c4-e2` : le bilan est affiché après les opérations, même sans la ligne `bilan` des exemples ; ce repère facultatif est clarifié dans l'énoncé.
- `gt-c4-e3` : les modifications antérieures à la séparation sont distinguées des événements propres à chaque branche ; un conflit portant sur un autre fichier que le dernier reste détecté.
- `gt-c6-e3` : le premier fichier est retenu même quand toutes les tailles valent zéro.
- Le faux test « Trois commits », le nombre d'opérations de « Aller-retour » et le jeu annoncé « Sans motif » ont été rectifiés. Les autres trous confirmés par les variantes ont reçu des tests actifs distincts des témoins. Aucune fiche ne dépasse la limite de sept tests actifs.

## Méthode et limites

Les deux entrées et leurs attendus de chaque fiche sont consignés dans `cas_b1_git.json`. Les attendus ont été construits à partir des énoncés et contrôlés par `b1_git.py`, une implémentation Python distincte des corrigés Bash. Le contrôle de nouveauté existant compare les entrées aux exemples et tests, après canonicalisation, et recherche leurs représentations littérales usuelles dans les sources. Il réussit pour les 36 entrées avant et après ; les nouveaux tests de régression ne reprennent pas littéralement ces entrées.

Cette indépendance est **structurelle**, pas une preuve d'indépendance intellectuelle : les témoins et l'oracle ont été construits dans le même audit, après consultation du catalogue, et les nouveaux tests ciblent les mêmes comportements. Les deux cas ne démontrent pas la correction générale ; le contrôle de nouveauté ne couvre pas tous les encodages ou dépendances possibles.

L'oracle refuse délibérément les doublons `add` en `gt-c2-e1` et `gt-c2-e2`, les fusions répétées, les `bilan` intermédiaires, le suivi multibranche de `fetch` et d'autres cas non explicités. La sémantique de ces cas n'est donc pas tranchée. Les tests de fusion vérifient notamment la séparation initiale, pas toutes les histoires de fusions successives. Les témoins et l'outil utilisent `LANG=C.UTF-8` ; la locale des fournisseurs distants n'a pas été vérifiée.

Les programmes sont lancés séparément avec les primitives Bubblewrap du banc existant : réseau et montages isolés, sources et oracle absents du sandbox du programme, `/home` et `HOME` absents, limites de ressources et de temps. Le contrôleur a confirmé ces propriétés et Node `22.23.2` ; Bash local est `5.3.20`. Le code de sortie des tests actifs est attesté par un lanceur confiné puis transmis au vrai correcteur. Il ne s'agit ni d'un test du fournisseur distant ni d'une isolation de production avec cgroup ou profil seccomp dédié.

Les pages générées n'ont pas été modifiées : les anciennes indications sont encore visibles dans `b1-git/chapitres/chapitre2.html`, `chapitre3.html` et `chapitre4.html`. Leur régénération après intégration est nécessaire mais hors du périmètre autorisé ici. Aucune suite globale, génération de pages, compilation `dist/`, publication ou action réseau n'a été lancée.

## Fichiers et commandes réellement exécutées

Sondes propres à B1 Git : `corrections/outils/sondes/generalisation/b1_git.py`, `cas_b1_git.json`, `b1_git_variantes.py`, `b1_git_banc.py`, `b1_git_grader.js` et `rejouer-b1-git.sh`. Le seul fichier applicatif modifié est `server/exercises/b1-git.js`.

Preuves dans `corrections/resultats/` :

- `b1-git-avant-lot1-partie3.json` : état initial et sources des 36 variantes figées ; code 1, échecs attendus du contrôle.
- `b1-git-intermediaire-lot1-partie3.json` : 18 témoins réussis, mais deux sorties Bash au code 1 ; code 1.
- `b1-git-apres-lot1-partie3.json` : état final avec les variantes initiales et leurs empreintes ; code 0.
- `b1-git-croise-lot1-partie3.json` : mêmes classes de mutations appliquées aux corrigés finaux ; code 0.
- `b1-git-catalogue-lot1-partie3.patch` : diff ciblé, vérifié en sens inverse avec `git apply --reverse --check` dans le worktree.

Commandes principales, exécutées depuis le worktree :

```bash
bash corrections/outils/sondes/generalisation/rejouer-b1-git.sh \
  > corrections/resultats/b1-git-avant-lot1-partie3.json

bash corrections/outils/sondes/generalisation/rejouer-b1-git.sh \
  --variantes-de corrections/resultats/b1-git-avant-lot1-partie3.json \
  > corrections/resultats/b1-git-intermediaire-lot1-partie3.json

bash corrections/outils/sondes/generalisation/rejouer-b1-git.sh \
  > /tmp/revi-b1-git-partie3.5fxhqQJR/croise-verifie.json

bash corrections/outils/sondes/generalisation/rejouer-b1-git.sh \
  --variantes-de corrections/resultats/b1-git-avant-lot1-partie3.json \
  > /tmp/revi-b1-git-partie3.5fxhqQJR/apres-verifie.json
```

La première commande a été lancée avant modification du catalogue ; la relancer sur le worktree final construit les variantes recroisées, pas l'état initial. Les deux derniers JSON ont été copiés dans les rapports `croise` et `apres` après vérification de leurs codes 0. Les autocontrôles de paquet du banc commun ont été exercés en mémoire : référence disponible, faux attendu rejeté et oracle absent rejeté. Ils sont tous vrais dans les deux rapports finaux.

## Intégration ultérieure, non exécutée

Après autorisation d'intégrer dans le répertoire principal, contrôler le patch avant de l'appliquer et ne pas écraser les changements parallèles :

```bash
TRAVAIL='/tmp/revi-b1-git-partie3.5fxhqQJR/worktree'
PRINCIPAL='/home/rd/Téléchargements/revi-cours-html /revi-cours-html'
PATCH="$TRAVAIL/corrections/resultats/b1-git-catalogue-lot1-partie3.patch"
git -C "$PRINCIPAL" apply --check "$PATCH"
git -C "$PRINCIPAL" apply "$PATCH"
for fichier in b1_git.py cas_b1_git.json b1_git_variantes.py b1_git_banc.py b1_git_grader.js rejouer-b1-git.sh; do
  cp -i -- "$TRAVAIL/corrections/outils/sondes/generalisation/$fichier" \
    "$PRINCIPAL/corrections/outils/sondes/generalisation/$fichier"
done
for fichier in b1-git-avant-lot1-partie3.json b1-git-intermediaire-lot1-partie3.json b1-git-apres-lot1-partie3.json b1-git-croise-lot1-partie3.json b1-git-catalogue-lot1-partie3.patch b1-git-rapport-lot1-partie3.md; do
  cp -i -- "$TRAVAIL/corrections/resultats/$fichier" "$PRINCIPAL/corrections/resultats/$fichier"
done
```

Pour intégrer aussi les 18 fiches au banc général, adapter **manuellement**, en préservant les changements parallèles :

1. Dans `banc.py`, ajouter `("cas_b1_git.json", "b1_git.py", "gt-")` à `PAQUETS_SUPPLEMENTAIRES`.
2. Dans `rejouer.sh`, ajouter `b1_git.py` et `cas_b1_git.json` à `fichiers_paquet`, puis ajouter `b1_git.py` à l'ensemble attendu de `autocontroles_paquets`. Cet ensemble doit correspondre à **tous** les paquets effectivement enregistrés, pas seulement à ceux de ce worktree.
3. Dans `corrections/outils/audit-generalisation.sh`, ajouter `['cas_b1_git.json', 'b1_git.py']` à `extraFiles` pour que l'agrégateur reconnaisse les fiches et vérifie leurs empreintes. Dans `tests/audit-generalisation-paquets.test.js`, ajouter `['cas_b1_git.json', 'b1_git.py', 'gt-']` à la liste des paquets.
4. Au moment de la lecture, le répertoire principal possédait déjà des modifications concurrentes des outils communs ; notamment, plusieurs paquets ajoutés au banc n'étaient pas encore tous présents dans l'ensemble exact vérifié par `rejouer.sh`. Refaire l'inventaire au moment de l'intégration au lieu de remplacer cet ensemble par une liste ancienne.
5. Après accord pour modifier les pages générées, exécuter depuis le principal `npm run courses -- b1-git`, puis vérifier les fichiers produits. Cette génération et les vérifications globales restent à effectuer ; elles n'ont pas été exécutées ici.

Les rapports et sondes peuvent contenir du code de corrigé et des tests cachés : ils doivent rester dans les chemins privés prévus par le projet.
