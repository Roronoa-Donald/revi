# Fiche de Conception — lx-c1-e2 : Lister tous les fichiers y compris cachés au format long

- **Identifiant** : `lx-c1-e2`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 1
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:5`
- **Type d'exercice** : Commande interactive shell avec options combinées
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Audit d'un compte utilisateur suspect ou configuration initiale. L'administrateur doit inspecter tous les fichiers de configuration (.bashrc, .profile...) et vérifier leurs droits et propriétaires.

## 2. Énoncé Complet
Dans le répertoire courant, affichez la liste détaillée de tous les fichiers et répertoires, y compris les fichiers cachés (dont le nom commence par un point), avec leurs permissions, nombre de liens, propriétaire, taille et date de modification.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
ls -la
```

**Étapes de raisonnement :**
1. La commande de listage est 'ls'.
2. L'option pour inclure les fichiers cachés est '-a' (--all).
3. L'option pour le format long détaillé est '-l'.
4. Les deux options peuvent être combinées en '-la' ou '-al', ou écrites séparément.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `ls -la`
- `ls -al`
- `ls -l -a`
- `ls -a -l`
- `ls -la .`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `ls` : Un simple 'ls' n'affiche ni les détails (permissions, taille) ni les fichiers cachés.
- `ls -l` : L'option '-l' affiche les détails mais ignore les fichiers cachés (qui nécessitent '-a').
- `ls -a` : L'option '-a' affiche les fichiers cachés mais sans le format long détaillé (il manque '-l').
- `dir -a` : La commande standard d'environnement Unix est 'ls'.
- `ls -h` : L'option '-h' rend les tailles lisibles mais n'affiche ni le format long ni les fichiers cachés.
