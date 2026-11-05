# Fiche de Conception — lx-c5-e2 : Créer un utilisateur avec home directory et shell Bash

- **Identifiant** : `lx-c5-e2`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 5
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:4`
- **Type d'exercice** : Commande d'administration de compte
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Arrivée d'un nouvel étudiant en informatique : l'administrateur crée son compte avec son dossier personnel et le shell interactif standard.

## 2. Énoncé Complet
Quelle commande d'administration permet de créer le nouvel utilisateur 'etudiant' en créant automatiquement son répertoire personnel (/home/etudiant) et en lui assignant '/bin/bash' comme shell de connexion par défaut ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
useradd -m -s /bin/bash etudiant
```

**Étapes de raisonnement :**
1. La commande système de création est 'useradd'.
2. L'option pour créer le répertoire personnel est '-m' (--create-home).
3. L'option pour spécifier le shell est '-s /bin/bash'.
4. Le nom du compte est 'etudiant'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `useradd -m -s /bin/bash etudiant`
- `useradd -s /bin/bash -m etudiant`
- `useradd -m -s /bin/bash "etudiant"`
- `adduser --shell /bin/bash etudiant`
- `useradd --create-home --shell /bin/bash etudiant`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `useradd etudiant` : Sans l'option '-m', aucun répertoire personnel ne sera créé dans /home pour l'utilisateur.
- `usermod -m etudiant` : 'usermod' sert à modifier un compte existant ; pour créer un compte, utilisez 'useradd'.
- `adduser etudiant` : Précisez explicitement les options '-m' et '-s /bin/bash' demandées dans la consigne.
- `useradd -d /bin/bash etudiant` : '-d' configure le chemin du répertoire personnel ; l'option pour le shell est '-s'.
- `groupadd etudiant` : 'groupadd' crée un groupe, pas un utilisateur.
