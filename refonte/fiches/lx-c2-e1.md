# Fiche de Conception — lx-c2-e1 : Distinction et utilisation des chemins absolus

- **Identifiant** : `lx-c2-e1`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 2
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.1_Systeme_Linux.pdf:12`
- **Type d'exercice** : Commande avec chemin absolu FHS
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Administration de services système : consultation des fichiers journaux situés dans le répertoire standard /var/log indépendamment du dossier où se trouve l'administrateur.

## 2. Énoncé Complet
Quelle commande permet d'accéder directement au répertoire des journaux système '/var/log' en utilisant obligatoirement un chemin absolu, peu importe votre position actuelle ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
cd /var/log
```

**Étapes de raisonnement :**
1. Un chemin absolu commence toujours par le caractère racine '/'.
2. La commande de navigation est 'cd /var/log'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `cd /var/log`
- `cd /var/log/`
- `cd "/var/log"`
- `cd '/var/log'`
- `cd //var/log`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `cd var/log` : Sans '/' initial, 'var/log' est un chemin relatif qui échouera si vous n'êtes pas à la racine.
- `cd log` : Ce chemin relatif ne fonctionne que si vous êtes déjà dans '/var'.
- `ls /var/log` : La consigne demande d'accéder (se déplacer dans) le répertoire, utilisez 'cd'.
- `cd ~/var/log` : Le tilde '~' pointe vers /home/user, or /var/log est situé directement sous la racine /.
- `goto /var/log` : La commande de déplacement est 'cd' (Change Directory).
