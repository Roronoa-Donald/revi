# Fiche de Conception — lx-c5-e1 : Analyse des 7 champs du fichier /etc/passwd

- **Identifiant** : `lx-c5-e1`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 5
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:2`
- **Type d'exercice** : Filtrage et inspection de compte
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Audit de sécurité des comptes : afficher la ligne d'un compte utilisateur pour contrôler son shell et son répertoire personnel.

## 2. Énoncé Complet
Affichez la ligne correspondant à l'utilisateur 'root' dans le fichier officiel des comptes '/etc/passwd' afin de vérifier son UID et son shell.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
grep '^root:' /etc/passwd
```

**Étapes de raisonnement :**
1. Le fichier d'enregistrement des utilisateurs sous Linux est '/etc/passwd'.
2. Pour cibler le compte 'root' au début de la ligne, on utilise 'grep "^root:" /etc/passwd' ou 'grep root /etc/passwd'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `grep '^root:' /etc/passwd`
- `grep "^root:" /etc/passwd`
- `grep root /etc/passwd`
- `grep 'root' /etc/passwd`
- `grep -w root /etc/passwd`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `cat /etc/shadow` : /etc/shadow contient les empreintes de mots de passe et nécessite les privilèges root, la liste des comptes est dans /etc/passwd.
- `find root /etc/passwd` : 'find' cherche des fichiers dans l'arborescence, pour inspecter une ligne utilisez 'grep'.
- `useradd root` : 'root' existe déjà, la consigne demande d'afficher ses paramètres dans /etc/passwd.
- `passwd root` : 'passwd' modifie le mot de passe, il n'affiche pas la ligne complète des 7 champs de configuration.
- `whoami` : 'whoami' affiche le nom de l'utilisateur actuel connecté, pas les champs de root dans /etc/passwd.
