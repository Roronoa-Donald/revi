# Fiche Source : Supports de Cours et TP Système Linux B1

- **Fichiers sources** :
  - `cours B1 IT/LINUX/Chap.1_Systeme_Linux.pdf` (21 pages)
  - `cours B1 IT/LINUX/Chap.2_Systeme_Fichier.pdf` (16 pages)
  - `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf` (14 pages)
  - `cours B1 IT/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf` (8 pages)
  - `cours B1 IT/LINUX/TP2_Droit_Acces_Fichier_Unix.pdf` (1 page)
- **Enseignant** : Dr Abasse KPEGOUNI
- **Niveau / Classe** : Bachelor 1 (B1 IT A & B)
- **Année Académique** : 2024-2025
- **Chapitres couverts** : Système, Fichiers, Commandes de base, Utilisateurs, Droits d'accès

## Contenu Technique Détaillé et Commandes Enseignées

### Chapitre 1 & 2 : Système et Fichiers (`Chap.1_Systeme_Linux.pdf:1-21` & `Chap.2_Systeme_Fichier.pdf:1-16`)
- Notion d'arborescence unique FHS débutant à la racine `/`.
- Rôle des répertoires fondamentaux : `/bin` (binaires système essentiels), `/etc` (fichiers de configuration textuels), `/home` (répertoires personnels des utilisateurs), `/var` (données variables, logs), `/tmp` (fichiers temporaires), `/dev` (fichiers périphériques).
- Distinction essentielle entre **chemin absolu** (commençant par `/`) et **chemin relatif** (commençant par `./`, `../` ou directement le nom du fichier/répertoire).

### Chapitre 4 : Manipulation des Commandes de Base (`Chap.4_Commandes_de_Base_Unix.pdf:1-14`)
- Syntaxe formelle d'une commande Unix : `COMMANDE [OPTIONS] [ARGUMENTS]` (`page 3`).
- Navigation et affichage :
  - `pwd` : afficher le répertoire de travail courant (`page 4`).
  - `cd` : déplacement (`cd /home`, `cd ..`, `cd ~`, `cd -`) (`page 5`).
  - `ls` : listage simple, `ls -a` (fichiers cachés commençant par un point), `ls -l` (détails permissions, propriétaire, taille, date), `ls -R` (récursif) (`page 5`).
- Gestion de fichiers et répertoires :
  - `mkdir` : création de répertoire (`mkdir dossier`, `mkdir -p a/b/c`) (`page 6`).
  - `rmdir` : suppression de répertoire vide (`page 6`).
  - `touch` : création de fichier vide ou mise à jour timestamp (`page 6`).
  - `cp` : copie de fichier (`cp source destination`), `cp -r` (copie récursive de dossier) (`page 6`).
  - `rm` : suppression de fichier (`rm fichier`), `rm -rf` (suppression récursive forcée) (`page 6`).
  - `mv` : déplacement et renommage (`mv ancien_nom nouveau_nom`) (`page 7`).
  - `cat`, `more`, `less` : affichage et pagination de contenu (`page 7`).

### Chapitre 5 : Gestion des Utilisateurs et Groupes (`Chap.5_Gestion_des_Utilisateurs_et_Groupe.pdf:1-8`)
- Anatomie du fichier `/etc/passwd` (`page 2-3`) avec ses 7 champs séparés par des deux-points :
  `login:mot_de_passe:UID:GID:commentaire:repertoire_personnel:shell`
- Rôles des comptes : root (UID 0), comptes de service (UID 1-999), utilisateurs normaux (UID >= 1000).
- Commandes d'administration :
  - `useradd` / `adduser` : création de compte (`useradd -m -s /bin/bash nom`).
  - `passwd` : changement ou attribution de mot de passe (`passwd nom`).
  - `usermod` : modification de compte (`usermod -aG groupe utilisateur`).
  - `userdel` : suppression de compte (`userdel -r utilisateur`).
  - `groupadd` / `groupdel` : création et suppression de groupes.

### TP 2 : Droits d'Accès et Propriété (`TP2_Droit_Acces_Fichier_Unix.pdf:1`)
- Scénario pratique complet en 11 étapes de propriété et 3 étapes de permissions :
  1. `chown tpsysteme toto` : affecter la propriété du fichier `toto` à l'utilisateur `tpsysteme`.
  2. `chown -R tpsysteme:root dossier` : affecter récursivement utilisateur et groupe.
  3. `chgrp tpsysteme toto` et `chgrp -R tpsysteme dossier`.
  4. Modification des droits d'accès :
     - Symbolique : `chmod o-r toto` (retirer le droit de lecture aux autres), `chmod -R ug=rwx dossier`.
     - Octale : `chmod 770 toto` ($rwx$ pour user, $rwx$ pour group, aucun droit pour others).
