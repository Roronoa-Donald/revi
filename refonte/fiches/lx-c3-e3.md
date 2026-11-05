# Fiche de Conception — lx-c3-e3 : Suppression sécurisée de répertoire vide vs fichiers

- **Identifiant** : `lx-c3-e3`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 3
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:6`
- **Type d'exercice** : Commande de suppression sécurisée
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Nettoyage de répertoires temporaires vides après archivage de données d'étudiants.

## 2. Énoncé Complet
Quelle commande standard Unix permet de supprimer en toute sécurité le répertoire 'ancien_dossier' UNIQUEMENT si celui-ci est parfaitement vide (sans risquer d'effacer des fichiers par inadvertance s'il contient encore des données) ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
rmdir ancien_dossier
```

**Étapes de raisonnement :**
1. La commande spécialisée 'rmdir' refuse de supprimer un dossier s'il contient des fichiers, garantissant une sécurité totale.
2. La syntaxe est 'rmdir nom_dossier'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `rmdir ancien_dossier`
- `rmdir ./ancien_dossier`
- `rmdir "ancien_dossier"`
- `rmdir 'ancien_dossier'`
- `rmdir -p ancien_dossier`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `rm -rf ancien_dossier` : 'rm -rf' détruit aveuglément tout le contenu sans vérifier si le dossier est vide ; la consigne impose la commande sécurisée pour dossier vide.
- `rm -r ancien_dossier` : 'rm -r' supprime récursivement les fichiers qu'il contient ; utilisez la commande dédiée 'rmdir'.
- `rm ancien_dossier` : 'rm' sans option refuse de supprimer un répertoire ('rm: cannot remove directory').
- `delete ancien_dossier` : La commande 'delete' n'existe pas sous Linux ; utilisez 'rmdir'.
- `del ancien_dossier` : 'del' est une commande DOS/Windows ; sous Linux pour un dossier vide, utilisez 'rmdir'.
