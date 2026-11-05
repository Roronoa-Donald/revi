# Fiche de Conception — lx-c4-e1 : Visualiser les 10 premières lignes d'un fichier journal

- **Identifiant** : `lx-c4-e1`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 4
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:7`
- **Type d'exercice** : Commande d'affichage partiel de texte
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Examen de l'en-tête d'un fichier de log serveur volumineux pour vérifier le démarrage du service.

## 2. Énoncé Complet
Affichez uniquement les 10 premières lignes du fichier journal '/var/log/boot.log'.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
head -n 10 /var/log/boot.log
```

**Étapes de raisonnement :**
1. La commande pour afficher le début d'un fichier est 'head'.
2. Par défaut ou avec '-n 10', elle affiche les 10 premières lignes.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `head -n 10 /var/log/boot.log`
- `head -10 /var/log/boot.log`
- `head /var/log/boot.log`
- `head -n10 /var/log/boot.log`
- `head --lines=10 /var/log/boot.log`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `tail -n 10 /var/log/boot.log` : 'tail' affiche la fin du fichier, alors que la consigne demande les premières lignes ('head').
- `cat /var/log/boot.log` : 'cat' affiche l'intégralité du fichier d'un coup, sans limiter aux 10 premières lignes.
- `less -n 10 /var/log/boot.log` : 'less' est un paginateur interactif, la commande dédiée pour le début est 'head'.
- `top /var/log/boot.log` : 'top' surveille les processus en cours, ce n'est pas un lecteur de fichier texte.
- `head -f /var/log/boot.log` : L'option '-f' s'utilise avec 'tail' pour suivre un fichier en continu, pas avec 'head'.
