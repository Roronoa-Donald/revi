# Nouvelles fixtures des corrigés suspendus

Ce banc vise 72 corrigés C#, Docker, Linux B3 et GitHub B3, hors SQL B1. Les fixtures sont rédigées pour ce banc dans `fixtures/` ; leurs entrées et attendus ne sont pas repris des témoins précédents ni calculés par les corrigés. Leur champ `raison` explique l'attendu d'après l'énoncé. Une fixture absente, ou dont la nouveauté n'a pas été établie, est non évaluée. Ce sont des attendus manuels, pas un oracle paramétrique indépendant ; un seul cas ne prouve pas la généralisation.

À chaque lancement, le banc recopie les sources du dépôt indiqué, extrait à nouveau les témoins des quatre fichiers `tests/*-lot1.test.js`, et compare chaque nouvelle entrée aux exemples, tests des 72 catalogues et anciens témoins, après normalisation des espaces. Les blocs de génération reconnus dans les anciens tests Docker et GitHub sont rejoués dans un contexte isolé avec des corrigés fictifs : seules leurs entrées sont capturées, jamais utilisées comme attendus. Le banc recherche aussi l'entrée entière dans les corrigés et les sources/littéraux des quatre tests.

Un profil d'empreinte contrôle la structure des quatre anciens fichiers hors blocs de témoins et générateurs réextraits ; il ne contient pas les données des témoins. Un changement hors de ces blocs, ou une lecture impossible d'un témoin ou générateur reconnu, invalide toutes les évaluations jusqu'à révision du profil : le banc ne prétend alors pas connaître les nouveaux tests. Les empreintes complètes et les données sont recalculées à chaque lancement. Ce contrôle est littéral : il ne prouve pas l'absence d'équivalence sémantique ou de collision avec des entrées situées dans d'autres fichiers.

Le 30 octobre 2026, le profil C# a été actualisé après comparaison avec la copie antérieure : seuls quatre couples de libellés de témoins croisés ont changé ; leurs données sont relues dans les tests actifs du catalogue. Les blocs de témoins et le corps des tests précédents sont inchangés.

Les quatre nouveaux fichiers de fixtures sont montés uniquement dans le processus d'extraction de confiance. Chaque vrai corrigé s'exécute avec `Sandbox` et `run_candidate` dans un autre bubblewrap sans accès aux tests, au catalogue, aux fixtures ou aux attendus. Le réseau et HOME sont absents. Les sorties sont comparées après exécution selon la règle de la suite correspondante ; pour `gh3-c1-e2`, le saut de ligne final explicitement exigé est également vérifié. Les erreurs de compilation, d'exécution, les sorties incorrectes et les non-évaluations sont distinctes. Les diagnostics en clair sont inclus seulement pour une sortie incorrecte. Aucun Git n'est exécuté ; `/usr/bin/git` et `/usr/lib/git-core` sont masqués pour les candidats.

Prérequis : Linux, bubblewrap imbriqué, Python 3, Node 22 et SDK/runtime .NET sous `/usr/share/dotnet` pour C#. `REVI_NODE` accepte l'exécutable ou son répertoire ; à défaut, le lanceur cherche `node` dans `PATH`. Le dépôt et le banc doivent être hors `/usr`. Depuis la racine du dépôt :

```sh
REVI_NODE="$(command -v node)" \
  /bin/sh corrections/outils/sondes/nouvelles-fixtures-suspendus/rejouer.sh "$PWD"
```

Le rapport est écrit dans un nouveau répertoire sous `/tmp`. `REVI_JOBS=1` à `8` règle le parallélisme, `REVI_OUTDIR` choisit un dossier existant sous `/tmp`. Le code zéro exige 72 sorties conformes, 72 nouveautés littérales et des sources/outils stables. Si une source change après la copie, `rejeu_necessaire` est vrai et le code est non nul. Ce contrôle n'est pas atomique : attendre la fin des modifications avant le rejeu.
