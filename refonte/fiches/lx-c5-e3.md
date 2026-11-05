# Fiche de Conception — lx-c5-e3 : Ajouter un utilisateur à un groupe secondaire

- **Identifiant** : `lx-c5-e3`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 5
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:5`
- **Type d'exercice** : Modification de compte utilisateur
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Attribution de droits sudo ou docker : un utilisateur doit être rattaché à un groupe existant sans perdre ses autres groupes secondaires.

## 2. Énoncé Complet
Quelle commande permet d'ajouter l'utilisateur 'etudiant' au groupe secondaire 'sudo' tout en conservant scrupuleusement tous ses autres groupes secondaires existants ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
usermod -aG sudo etudiant
```

**Étapes de raisonnement :**
1. La commande de modification de compte est 'usermod'.
2. L'option pour spécifier les groupes secondaires est '-G'.
3. L'option d'ajout (append) indispensable pour ne pas écraser les autres groupes est '-a'.
4. On combine en 'usermod -aG sudo etudiant'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `usermod -aG sudo etudiant`
- `usermod -a -G sudo etudiant`
- `usermod -G sudo -a etudiant`
- `gpasswd -a etudiant sudo`
- `usermod --append --groups sudo etudiant`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `usermod -G sudo etudiant` : DANGER MAJEUR : Sans l'option '-a', 'usermod -G' supprime l'utilisateur de TOUS ses autres groupes secondaires !
- `useradd -G sudo etudiant` : L'utilisateur 'etudiant' existe déjà, la commande pour modifier un compte existant est 'usermod'.
- `groupadd sudo etudiant` : 'groupadd' crée un nouveau groupe, il ne permet pas d'y ajouter un utilisateur.
- `usermod -g sudo etudiant` : '-g' (minuscule) change le groupe principal de l'utilisateur, pas son groupe secondaire ('-G').
- `chown etudiant sudo` : 'chown' modifie le propriétaire d'un fichier, pas l'appartenance d'un compte à un groupe.
