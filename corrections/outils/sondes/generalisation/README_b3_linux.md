# Lot 1, partie 3 — généralisation B3 Linux

## Périmètre

Ce banc concerne les 17 fiches B3 Linux qui étaient « non évalué » et ne disposaient que d'un témoin manuel inédit dans `corrections/resultats/generalisation-lot1-partie2-complement.json`. `lx3-c1-e3` avait déjà deux cas évalués et reste hors périmètre. Le rapport précédent et la suspension de la correction automatique ne sont pas modifiés.

Le rapport de cette passe se trouve dans `corrections/resultats/generalisation-lot1-partie3-b3-linux.json`. Il indique le HEAD observé, les empreintes des sources et les sorties effectivement obtenues. Ce fichier et les fixtures contiennent des réponses : ils doivent rester privés et ne pas être intégrés aux pages servies aux apprenants.

## Contenu et preuve

- `cas_b3_linux.json` contient exactement deux entrées, deux attendus manuels et leurs justifications par fiche. Ils sont déduits des règles et exemples de l'énoncé, pas des corrigés.
- `linux_b3.py` est un oracle paramétrique Python séparé : il interprète les données et les règles des exercices, sans charger leurs solutions. Le banc exige que ses sorties concordent avec les attendus manuels avant d'exécuter les programmes.
- `mutants_b3_linux.json` décrit deux variantes métier par fiche. Chacune est construite par une substitution unique dans le vrai corrigé chargé depuis le registre. Le programme complet mutant, son empreinte, son code de sortie et ses résultats sur les deux cas sont vérifiables à partir de la substitution et du rapport. Un mutant n'est dit rejeté que s'il s'exécute normalement sur les deux cas et que sa sortie diffère de l'attendu sur au moins l'un d'eux.
- `banc_b3_linux.py` réutilise les mécanismes du banc commun et leur ajoute l'inventaire historique, la comparaison stricte des sorties, les mutations et les contrôles propres au lot. `rejouer_b3_linux.sh` prépare une copie contrôlée et lance ce banc sans modifier les fichiers communs.

La nouveauté est vérifiée par comparaison des entrées complètes et des lignes individuelles après normalisation des espaces. Le corpus comprend les exemples et tests du catalogue actif, les six anciens modules de chapitre, les témoins de `tests/b3-linux-lot1.test.js`, la fixture manuelle précédente, ainsi que les cas et le rapport de généralisation précédents. Les entrées sont aussi recherchées dans les sources et leurs littéraux, en texte brut, échappées en JSON et encodées en base64. Le profil du fichier d'anciens tests doit correspondre à celui reconnu par le banc précédent ; ses témoins sont extraits à nouveau. Huit autocontrôles vérifient notamment le rejet d'un ancien témoin, d'une ligne ancienne, d'une paire dupliquée et d'une entrée encodée en base64.

Une comparaison littérale ne démontre pas l'absence d'équivalence sémantique ni l'absence de données similaires dans des fichiers non inventoriés. Les attendus manuels et l'oracle proviennent des mêmes énoncés et peuvent partager une erreur d'interprétation. Deux jeux et deux mutants ne prouvent pas la correction générale.

## Rejeu

Prérequis : Linux, bubblewrap autorisant les namespaces imbriqués, Bash, `/usr/bin/python3`, `/usr/bin/prlimit` et Node 22 dans `PATH`. Depuis la racine du worktree :

```sh
bash corrections/outils/sondes/generalisation/rejouer_b3_linux.sh --repo "$PWD" > /tmp/generalisation-b3-linux.json
```

Le code 0 exige 17 fiches réussies, 34 exécutions conformes des corrigés et 34 mutants rejetés ; le code 1 signale une comparaison incorrecte ou non évaluée et le code 2 une erreur de préparation ou d'infrastructure. Les écarts observés sur les anciens modules ne changent pas le verdict des corrigés actifs. La sortie est un JSON ; les messages de progression sont envoyés sur stderr.

Chaque cas de chaque programme s'exécute dans un bubblewrap neuf, sans réseau de l'hôte, HOME, dépôt, catalogue ni oracle. L'extraction du catalogue et des anciens tests est elle aussi isolée. Les limites `prlimit`, la durée maximale et les montages sont ceux du banc commun ; ils ne remplacent pas un cgroup ni un profil seccomp pour exécuter du code hostile en production. Les sources sont comparées à leurs copies avant et après le lancement, mais la copie de plusieurs fichiers n'est pas atomique.

## Défauts observés

- L'énoncé actif de `lx3-c2-e3`, dans `server/exercises/b3-linux.js`, contient un fragment tronqué après « stdin » et une balise `</code>` surnuméraire. Le fragment est aussi présent dans la page générée `b3-linux/chapitres/chapitre2.html`. Les 17 énoncés du périmètre ne précisent pas leur premier marqueur d'entrée dans le texte du brief ; chaque exemple affiché l'illustre néanmoins.
- Les six anciens fichiers `server/exercises/b3-linux/chapitre*.js` contiennent 18 corrigés par table de correspondance base64. Le registre audité résout `server/exercises/b3-linux.js`, et non ces copies. Sur le premier nouveau cas de chacune des 17 fiches étudiées, les anciennes copies s'exécutent avec le code 0 mais produisent une sortie vide incorrecte. Ce constat ne prouve pas qu'aucune autre partie du dépôt ne puisse les charger. Elles ne sont pas modifiées dans ce lot.

## Intégration ultérieure

Le schéma de `cas_b3_linux.json` et la fonction `calculer(id, entree)` sont compatibles avec les paquets supplémentaires du banc commun. Dans une passe d'intégration coordonnée, déclarer `("cas_b3_linux.json", "linux_b3.py", "lx3-")` dans `PAQUETS_SUPPLEMENTAIRES` de `banc.py`, ajouter les deux fichiers à la copie contrôlée de `rejouer.sh` et adapter la liste attendue par son autocontrôle des paquets. Les 17 identifiants n'entrent pas en collision avec le cas préexistant `lx3-c1-e3`.

Cette seule déclaration ne reprendrait pas les contrôles des témoins historiques et des deux mutants par fiche : conserver le présent lanceur comme contrôle complémentaire obligatoire, ou porter explicitement ces vérifications dans le banc partagé avant d'agréger les résultats. Recalculer ensuite le rapport agrégé ; ne pas modifier manuellement le rapport précédent ni lever la suspension automatiquement sur la seule base de ces sondes.
