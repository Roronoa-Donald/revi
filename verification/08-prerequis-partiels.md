# Dépendances pédagogiques — premiers chemins documentés

Ce tableau n'est **pas un graphe complet des cours**. Une flèche signifie qu'une notion ou une ressource facilite l'activité indiquée ; elle ne signifie pas qu'un cours entier est institutionnellement obligatoire. Les chemins ci-dessous résultent de la lecture ciblée et non d'une détection exhaustive des cycles.

| Ressource ou notion → activité | Indice dans le dossier local | État et action proposée |
|---|---|---|
| Fonctions et fichiers Python B1 → classes du projet B1 | `b1-python/chapitres/chapitre3.html:37` ; `b1-python/chapitres/chapitre5.html:39` ; `b1-projet/chapitres/chapitre2.html:83` | Le projet cite explicitement les fonctions et fichiers puis introduit les classes. C'est un raccord utile ; contrôler par un exercice diagnostique que ces bases sont acquises plutôt que présumer que le cours entier a été suivi. |
| Environnement Python, Tkinter et PostgreSQL → démarrage du projet B1 | `b1-projet/chapitres/chapitre1.html:100` ; `b1-projet/chapitres/chapitre1.html:233` | Les dépendances matérielles et logicielles sont mentionnées ; vérifier que l'apprenant peut réellement installer, ouvrir et diagnostiquer cet environnement. La présence d'une liste ne prouve pas une compétence acquise. |
| `ALTER TABLE` → exercice SQL B1 chapitre 2 | `b1-sql/chapitres/chapitre2.html:263` ; explication à `b1-sql/chapitres/chapitre6.html:102` | F84 : l'exercice précède l'explication trouvée. Introduire un exemple résolu au chapitre 2 ou déplacer l'exercice ; la commande dans l'indice n'est pas une explication complète. |
| Terminal Linux disponible → manipulation des commandes au chapitre 3 | `b1-linux/chapitres/chapitre3.html:66` ; installation à `b1-linux/chapitres/chapitre4.html:66` | Le scénario suppose un terminal avant le chapitre d'installation. Ce n'est pas nécessairement bloquant si un environnement prêt à l'emploi ou distant est fourni ; préciser l'option au début du chapitre 3. |
| Matrice initialisée → exemple Python d'algorithmique B1 chapitre 8 | `b1-algo/chapitres/chapitre8.html:77` | F114 : le fragment emploie `matrice` sans initialisation dans ce bloc. Donner les données de départ ou un exemple complet exécutable. |

La lecture de ces cinq chemins ne permet ni de conclure à l'absence de cycles inter-cours, ni d'établir la progression de tous les étudiants. Pour compléter l'audit, inventorier les prérequis réellement formulés, relier chaque notion à l'endroit où elle est enseignée, vérifier les dépendances croisées et tester la progression auprès de novices.

Un contrôle complémentaire des encadrés et usages dans les 16 chapitres explicitement énumérés au tour 3 figure dans `10-prerequis-16.md`. Deux déplacements ont placé des rappels après un premier usage ; ce constat infirme la propriété générale de placement de K12 sans clore le graphe inter-cours.

## Recoupement des 26 candidats historiques K13

`09-candidats-K13.csv` reprend les 26 entrées de `audit/tour5/k13-matrice-ch1.csv` et contrôle indépendamment les chaînes dans le corrigé actuel, le code de départ et le texte précédant le premier lab. **Neuf cas** concernent les corrigés Bash mémorisés de Docker, B3 Linux et B3 GitHub : leurs `case`, `sed` et `printf` ne démontrent pas que les élèves doivent utiliser ces outils. Dans les **trois cas Flask**, l'appel `int(` signalé n'est pas repéré comme appel autonome ; cette suite de caractères existe dans `print(`. F204/F211.

Ce recoupement lexical ne détermine pas si une notion est réellement enseignée, comprise ou indispensable : un mot mentionné n'est pas une leçon et une autre solution peut utiliser d'autres moyens. La lecture complémentaire des 26 énoncés, amorces, indices et sections précédentes est détaillée dans `11-preparation-26.md` : elle distingue une inversion Python, trois ateliers Git B1 sans préparation Bash explicite dans leur chapitre, des concepts présents et des acquis de programmation à vérifier. Cette première qualification ne démontre pas la maîtrise des prérequis ni l'absence d'autres inversions.
