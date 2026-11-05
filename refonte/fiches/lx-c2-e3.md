# Fiche de Conception — lx-c2-e3 : Résolution de chemin relatif avec double remontée

- **Identifiant** : `lx-c2-e3`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 2
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.2_Systeme_Fichier.pdf:11`
- **Type d'exercice** : Chemin relatif avec '../..'
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Vous travaillez dans '/home/etudiant/projets/c'. Vous devez vous déplacer dans le dossier 'notes' situé dans '/home/etudiant/notes' sans utiliser de chemin absolu.

## 2. Énoncé Complet
Depuis le répertoire courant '/home/etudiant/projets/c', écrivez la commande permettant d'accéder au dossier 'notes' situé dans '/home/etudiant/notes' par un chemin relatif strict (en utilisant la remontée d'arborescence).

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
cd ../../notes
```

**Étapes de raisonnement :**
1. Depuis 'projets/c', '..' remonte dans 'projets'.
2. Le second '..' remonte dans '/home/etudiant'.
3. On redescend ensuite dans 'notes' : '../../notes'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `cd ../../notes`
- `cd ../../notes/`
- `cd ./../../notes`
- `cd "../../notes"`
- `cd '../../notes'`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `cd /home/etudiant/notes` : La consigne exige expressément un chemin relatif, pas un chemin absolu débutant par '/'.
- `cd ../notes` : Un seul '..' vous amène dans '/home/etudiant/projets', où 'notes' n'existe pas.
- `cd ../../../notes` : Trois remontées vous placent dans '/home', vous êtes remonté trop haut.
- `cd ~/notes` : '~/notes' est un raccourci absolu vers le home ; la consigne impose un chemin relatif '../..'
- `cd ..; cd notes` : Depuis 'projets/c', un seul 'cd ..' vous laisse dans 'projets' ; il faut remonter deux fois.
