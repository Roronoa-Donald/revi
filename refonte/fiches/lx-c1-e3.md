# Fiche de Conception — lx-c1-e3 : Retour au répertoire parent et répertoire précédent

- **Identifiant** : `lx-c1-e3`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 1
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:5`
- **Type d'exercice** : Commande de navigation shell
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Navigation arborescente rapide dans une hiérarchie de logs ou de paquets lors d'un dépannage système.

## 2. Énoncé Complet
Quelle commande tapez-vous pour remonter exactement d'un niveau dans la hiérarchie des répertoires (vers le répertoire parent) ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
cd ..
```

**Étapes de raisonnement :**
1. La commande de changement de répertoire est 'cd'.
2. Le répertoire parent est désigné universellement par '..'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `cd ..`
- `cd ../`
- `cd ./..`
- `cd ..; pwd`
- `cd ".."`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `cd .` : Le point '.' désigne le répertoire courant, pas le répertoire parent ('..').
- `cd /` : 'cd /' vous ramène à la racine du système, pas au répertoire parent immédiat.
- `cd ~` : 'cd ~' vous ramène dans votre répertoire personnel, pas au parent du dossier courant.
- `back` : La commande 'back' n'existe pas en shell standard ; utilisez 'cd ..'.
- `cd..` : En shell Unix, il faut impérativement un espace entre la commande 'cd' et son argument '..'.
