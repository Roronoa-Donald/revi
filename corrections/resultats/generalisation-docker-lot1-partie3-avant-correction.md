# Docker B2 — audit du lot 1, partie 3

## Résultat

- Périmètre : les 17 exercices suspendus à un seul témoin inédit ; `dk2-c1-e1`, déjà évalué sur deux cas, est exclu.
- 34 entrées nouvelles et attendus manuels recoupés par les oracles du paquet ; comparaison avec 316 entrées historiques recensées, doublons compris.
- 102 exécutions isolées achevées avec code nul : 34 pour les vrais corrigés et 68 pour les 34 mutants sur deux cas chacun.
- Corrigés : 33 sorties conformes et une divergence, soit 16 exercices conformes sur les deux cas et un exercice en échec.
- Mutants : 34 rejetés ; chaque rejet repose sur au moins un cas où le corrigé réel est conforme. Leurs substitutions exactes, empreintes et sorties figurent dans le JSON.
- Code du banc : `1`, à cause de la divergence observée ; le vérificateur des preuves retourne `0`.

## Défaut observé

`dk2-c1-e2` accepte, selon son énoncé, des entiers positifs ou nuls sans borne spécifiée. Sur cette entrée :

```text
1 9007199254740993 29
17 0
```

L'attendu est un disque VM de `9007199254741010 Mo`, un disque Docker de `9007199254740993 Mo` et une économie de `17 Mo`. Le corrigé produit respectivement `9007199254741008 Mo`, `9007199254740992 Mo` et `16 Mo`. La RAM est conforme. L'entrée tient dans le plafond de 8 Ko du service d'exécution.

Le corrigé emploie `awk` pour l'arithmétique. La perte de précision numérique sur cet entier supérieur à `2^53` est l'explication déduite des calculs et de la sortie ; l'exécution observée utilise GNU Awk 5.4.1. Aucun fournisseur distant n'a été interrogé : son interpréteur et son résultat éventuel ne sont pas établis ici. Le catalogue n'a pas été modifié et la suspension reste active.

## Détail par exercice

`C` : sortie conforme ; `D` : sortie différente. Les colonnes des mutants indiquent les numéros des cas qui les rejettent **et** sur lesquels le corrigé est conforme.

| Exercice | Corrigé cas 1/2 | Mutant 1 | Mutant 2 |
| --- | --- | --- | --- |
| `dk2-c1-e2` | C / D | 1 | 1 |
| `dk2-c1-e3` | C / C | 1 | 1, 2 |
| `dk2-c2-e1` | C / C | 1, 2 | 1, 2 |
| `dk2-c2-e2` | C / C | 1, 2 | 1 |
| `dk2-c2-e3` | C / C | 1 | 2 |
| `dk2-c3-e1` | C / C | 1 | 1, 2 |
| `dk2-c3-e2` | C / C | 1, 2 | 2 |
| `dk2-c3-e3` | C / C | 1, 2 | 1, 2 |
| `dk2-c4-e1` | C / C | 1 | 1, 2 |
| `dk2-c4-e2` | C / C | 1 | 2 |
| `dk2-c4-e3` | C / C | 1 | 1, 2 |
| `dk2-c5-e1` | C / C | 2 | 1 |
| `dk2-c5-e2` | C / C | 1, 2 | 2 |
| `dk2-c5-e3` | C / C | 2 | 1 |
| `dk2-c6-e1` | C / C | 1, 2 | 2 |
| `dk2-c6-e2` | C / C | 1, 2 | 1, 2 |
| `dk2-c6-e3` | C / C | 2 | 1, 2 |

## Preuves et limites

Le rapport JSON consigne les entrées, attendus, sorties, substitutions, empreintes, autocontôles et paramètres d'isolation. Les fichiers examinés sont stables pendant le rejeu ; l'environnement interne n'expose ni réseau hôte, ni `HOME`, ni catalogue, ni oracles aux candidats. Le script de vérification relit les sources et confirme les 102 comparaisons et 34 substitutions reproductibles.

Les attendus manuels et les oracles ont été construits à partir des énoncés, sans déduire les résultats des corrigés ; ils restent néanmoins l'œuvre d'un même audit et peuvent partager une erreur d'interprétation. La nouveauté est littérale sur les sources recensées, pas une preuve de nouveauté sémantique. Les mutations ciblées ne représentent pas toutes les erreurs possibles, et ces cas ne démontrent pas la correction générale. Aucun serveur, fournisseur d'exécution distant, navigateur, build ou lot 2 n'a été lancé. Le rapport et les fichiers du paquet n'intègrent pas automatiquement ces cas au banc commun ni à la correction servie aux élèves.
