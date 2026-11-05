# Fiche de Conception — lx-c1-e1 : Afficher le répertoire courant et se situer

- **Identifiant** : `lx-c1-e1`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 1
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:4`
- **Type d'exercice** : Commande interactive shell (validation regex déterministe sans exécution)
- **Composant d'interface** : Console interactive CodeLab en mode terminal

## 1. Contexte Métier & Académique
Administration système au quotidien sur un serveur Debian / Ubuntu. Lors d'une connexion SSH, l'administrateur doit vérifier immédiatement dans quel dossier de l'arborescence il se trouve avant d'effectuer toute opération.

## 2. Énoncé Complet
Vous venez d'ouvrir une session terminal sur un serveur Linux. Quelle commande tapez-vous pour afficher le chemin absolu complet de votre répertoire de travail actuel ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
pwd
```

**Étapes de raisonnement :**
1. La commande standard Unix pour 'Print Working Directory' est 'pwd'.
2. Elle ne requiert aucun argument ni option pour afficher le chemin absolu.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `pwd`
- `pwd -L`
- `pwd -P`
- `/bin/pwd`
- `echo $PWD`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `cd` : La commande 'cd' sert à changer de répertoire, pas à afficher l'emplacement courant.
- `ls` : La commande 'ls' liste le contenu d'un répertoire, elle n'affiche pas le chemin de travail courant.
- `dir` : Sous Unix / Linux, la commande canonique pour afficher le répertoire courant est 'pwd'.
- `pwd /home` : La commande 'pwd' ne prend pas de chemin en paramètre : elle affiche l'emplacement où vous êtes déjà.
- `whereis pwd` : Vous cherchez à exécuter la commande 'pwd', pas à localiser son binaire avec 'whereis'.
