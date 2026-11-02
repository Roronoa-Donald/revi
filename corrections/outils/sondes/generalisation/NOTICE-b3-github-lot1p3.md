# Généralisation GitHub B3 — lot 1, partie 3

## Périmètre

Ce paquet traite les 17 fiches `gh3-*` qui, dans
`corrections/resultats/generalisation-lot1-partie2-complement.json`, étaient
encore non évaluées malgré un unique témoin manuel inédit conforme.
`gh3-c1-e3` est exclue : elle était déjà évaluée par le banc de généralisation.
Le cours `b3-github` reste suspendu ; ce paquet n'active ni la notation ni les
routes et ne modifie pas le catalogue.

## Fichiers et méthode

- `cas_b3_github.json` : deux entrées, deux attendus et deux justifications
  par fiche. Les deux cas de `gh3-c1-e2` portent `mode: exact`, car un espace
  final dans un nom d'entrée et le dernier saut de ligne sont significatifs.
- `b3_github.py` : modèles paramétriques autonomes, calculés depuis les
  énoncés, sans charger les corrigés. Le domaine est volontairement limité ;
  en particulier les parents d'un graphe doivent précéder leurs descendants.
- `mutants_b3_github.py` : deux transformations concrètes et distinctes par
  fiche. Elles sont appliquées seulement si leur motif apparaît exactement une
  fois. Les substitutions de l'ancien test GitHub sont réutilisées, sauf la
  seconde mutation de purge, qui supprime la propagation aux descendants.
- `extraire_b3_github.js` : capture les témoins et les 150 entrées des
  générateurs historiques reconnus sans exécuter les corrigés.
- `comparer_b3_github.js` : confronte les fonctions réelles de normalisation
  et de comparaison du moteur aux sorties retenues pour l'anomalie ci-dessous.
- `rejouer_b3_github.py` : contrôle la provenance, la nouveauté, les oracles,
  l'isolation, les corrigés, les mutants et l'anomalie. Il ne modifie aucun
  fichier commun et ne change aucun fichier de l'application.

Les attendus ont été établis depuis les énoncés, vérifiés par le modèle de ce
paquet et confrontés à l'oracle indépendant préexistant
`corrections/outils/sondes/suspendus-oracles/oracles.py`. Les quatre empreintes
SHA-1 sont également confrontées à `git hash-object --literally` dans une
sandbox sans dépôt, sans réseau extérieur et sans option d'écriture. Les chaînes imitant des clés
dans les cas du hook sont des exemples fictifs composés de zéros.

La nouveauté compare les 34 entrées après réduction des espaces à 801 entrées
historiques recensées : exemples et tests du catalogue, ancien témoin
indépendant, témoin manuel de la partie 2, 150 entrées de tests générés et
cas des autres paquets du banc, ainsi que les exemples et tests des six anciens
modules de chapitre GitHub. Une recherche littérale, JSON et base64 est en
outre effectuée dans les sources indiquées par le rapport. Les empreintes
du catalogue, du test historique et du témoin manuel sont comparées à celles
du rapport de la partie 2. Cette méthode établit la nouveauté textuelle dans
ce périmètre, pas l'absence d'équivalence sémantique ou de mémorisation.

## Rejeu

Depuis la racine du worktree, avec Python 3, Node, Bash, Git, `ip`, `prlimit`
et Bubblewrap disposant des espaces de noms utilisateur :

```sh
sortie=$(mktemp -d /tmp/revi-b3-github-rejeu-XXXXXX)
PYTHONDONTWRITEBYTECODE=1 /usr/bin/python3 -B corrections/outils/sondes/generalisation/rejouer_b3_github.py --output "$sortie/resultat.json"
```

La sortie doit être un nouveau fichier ; le lanceur refuse de l'écraser.
L'option `--output -`, valeur par défaut, produit le JSON sur la sortie
standard. Le code de sortie est `0` si tous les contrôles requis passent,
`1` si un corrigé ou un mutant n'est pas validé, et `2` en cas d'erreur
d'infrastructure ou d'admissibilité. Le rapport conserve les entrées,
attendus, sorties, codes de retour, transformations et empreintes nécessaires
au contrôle. Il n'est pas confidentiel.

Chaque paire candidat/entrée est lancée dans un Bubblewrap séparé, avec un
seul programme monté en lecture, un `/tmp` frais, sans dépôt, sans oracle,
sans `HOME`, sans Git et dans un espace réseau distinct ne contenant que sa
boucle locale. Les contrôles essentiels d'isolation sont répétés avant chaque candidat ; un échec
d'exécution ou un dépassement de limite est non évalué, pas compté comme un
rejet. La comparaison est exacte pour les arbres et préserve les espaces
significatifs ; pour les autres sorties, elle tolère au plus un saut de ligne
terminal. Les sources sont copiées puis vérifiées par empreintes avant et
après les exécutions, sans prétendre à un instantané atomique.

## Résultats du rejeu

Le rapport produit dans `corrections/resultats/` contient les preuves
complètes : 34/34 sorties de corrigés conformes, 34/34 mutants rejetés et
68/68 exécutions de mutants comparées ; 102 exécutions de candidats au total.
Les 34 attendus concordent avec le second oracle et les quatre empreintes avec
Git. Un programme synthétique qui échoue vérifie en outre que le banc classe
un plantage comme non évalué. Les numéros ci-dessous indiquent les cas qui
rejettent chaque mutant.

| Fiche | Premier mutant | Second mutant |
| --- | --- | --- |
| `gh3-c1-e1` | caractères au lieu d'octets : 1, 2 | saut de ligne non décodé : 1, 2 |
| `gh3-c1-e2` | tri inversé : 1, 2 | espace final supprimé : 2 |
| `gh3-c2-e1` | têtes égales mal classées : 1 | ancêtres communs non minimaux : 1, 2 |
| `gh3-c2-e2` | `drop` conservé : 1, 2 | `squash` remplace le message : 1 |
| `gh3-c2-e3` | modifications égales mal classées : 1, 2 | mauvaise valeur de `theirs` : 1, 2 |
| `gh3-c3-e1` | ancêtres oubliés : 1, 2 | têtes oubliées : 1, 2 |
| `gh3-c3-e2` | borne `high` trop réduite : 2 | statuts non monotones acceptés : 1 |
| `gh3-c3-e3` | `apply` dépile : 1 | indice égal à la taille accepté : 1, 2 |
| `gh3-c4-e1` | `develop` non protégée : 1 | mauvaise base de `hotfix` : 1 |
| `gh3-c4-e2` | égalité au minimum refusée : 1, 2 | merge commit non bloqué : 1 |
| `gh3-c4-e3` | marqueur `!` ignoré : 1 | type `style` accepté : 1 |
| `gh3-c5-e1` | nom non contrôlé : 1 | runner manquant ignoré : 2 |
| `gh3-c5-e2` | ordre des systèmes inversé : 1 | exclusions ignorées : 1 |
| `gh3-c5-e3` | priorité d'injection erronée : 1 | `head_ref` ignoré : 2 |
| `gh3-c6-e1` | seuil LFS exclu : 1 | extension `tar.gz` oubliée : 1 |
| `gh3-c6-e2` | seuil AWS relevé : 1 | seuil GitHub relevé : 1 |
| `gh3-c6-e3` | seul le premier parent suivi : 1 | propagation omise : 1, 2 |

## Anomalie et intégration

Le mutant `gh3-c1-e2` qui supprime un espace final d'un nom produit une sortie
différente de l'attendu, rejetée par ce paquet en mode exact. Le
`normaliser()` de `banc.py` supprime cet espace et déclare les sorties
identiques. Les fonctions réelles de `server/exercises/runner.js` confirment
que le mode par défaut les confond mais que `mode: exact` les distingue ; le
test caché correspondant du catalogue utilise déjà ce mode exact. Le défaut
démontré concerne donc le banc commun, pas le test caché en mode exact.

Pour une intégration ultérieure, après coordination avec les autres lots :

1. Ajouter `('cas_b3_github.json', 'b3_github.py', 'gh3-')` à
   `PAQUETS_SUPPLEMENTAIRES` dans `banc.py` et copier ces deux fichiers dans
   `fichiers_paquet` de `rejouer.sh`. Ajouter aussi `b3_github.py` à
   l'ensemble attendu de `package_controls` dans ce lanceur, sans retirer les
   éventuels paquets ajoutés en parallèle.
2. Faire respecter `mode: exact` par `etat_sortie` avant de charger ce paquet ;
   conserver notamment les espaces de fin de ligne et le dernier saut de
   ligne de `gh3-c1-e2`.
3. Maintenir le contrôle de nouveauté étendu et le rejeu des mutants de ce
   paquet comme garde séparée : le banc commun actuel ne les exécute pas.
   Aucun de ces changements d'intégration n'a été réalisé ici.

Ces observations concernent seulement les jeux et mutants exécutés : elles ne
prouvent pas la correction universelle des 17 corrigés et ne justifient pas,
à elles seules, la levée de la suspension.
