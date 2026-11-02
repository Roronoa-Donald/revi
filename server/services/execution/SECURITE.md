# Politique d’exécution

Les programmes soumis sont exécutés uniquement par un fournisseur distant configuré : Piston en priorité, puis Oanor si Piston n’est pas configuré. Une panne, une erreur ou l’absence de fournisseur ne déclenche jamais d’interpréteur local, quel que soit le langage. Les anciens réglages `allowLocal` et `ALLOW_LOCAL_EXECUTION_FALLBACK` ne réactivent pas le repli.

Le langage `analyse` est une exception de nature différente : il sélectionne et normalise du texte, sans interpréter ni lancer ce texte. Le catalogue de langages statique est une liste d’interface et ne constitue pas un moteur d’exécution.

La correction automatique des trois cours SQL est également suspendue. Le lanceur SQLite de Piston exécute le contenu du fichier SQL, sans appliquer les scripts de préparation et de vérification transmis par l’application sur l’entrée standard ; son format de sortie ne correspond pas non plus aux attendus du moteur SQLite du navigateur. Les exercices et le simulateur restent accessibles, mais une correction ne doit pas être réactivée avant validation de bout en bout avec le fournisseur réellement configuré. Source : https://github.com/engineer-man/piston/blob/master/packages/sqlite3/3.36.0/run, consultée le 30 octobre 2026.

L’ancienne isolation par contexte JavaScript ou sous-processus ne démontre pas la sécurité nécessaire pour exécuter du code non fiable. Voir la documentation officielle de Node.js : https://nodejs.org/api/vm.html, consultée le 29 octobre 2026.

Cette politique ne garantit pas l’isolation de Piston ou d’Oanor. Avant publication, l’administrateur doit contrôler séparément leur confinement, leurs accès réseau et fichiers, leurs limites CPU, mémoire, temps et sortie, ainsi que leur configuration. Le simulateur SQL côté navigateur est distinct du service d’exécution serveur.
