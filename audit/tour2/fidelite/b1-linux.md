# Fidélité aux Sources (Mission A) — `b1-linux` (Linux · B1)

- **Cours** : `b1-linux` (Linux) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (6 fichiers, 77 pages)** :
- `textes/B1/LINUX/Chap.1_Systeme_Linux.txt` (21 pages, statut `ok`)
- `textes/B1/LINUX/Chap.2_Systeme_Fichier.txt` (16 pages, statut `ok`)
- `textes/B1/LINUX/Chap.3_Installation_Debian_12.txt` (17 pages, statut `ok`)
- `textes/B1/LINUX/Chap.4_Commandes_de_Base_Unix.txt` (14 pages, statut `ok`)
- `textes/B1/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.txt` (8 pages, statut `ok`)
- `textes/B1/LINUX/TP2_Droit_Acces_Fichier_Unix.txt` (1 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (6 supports officiels Chap.1 à Chap.5 + TP2, 77 pages au total, statut ok)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Inversion entre les Chapitres 3 et 4 par rapport aux supports sources + ajout du scripting Bash au Ch. 6 alors qu'il est exigé dès le Ch. 1**
- **Ordre dans les sources (`textes/B1/LINUX/`)** : `Chap.1_Systeme_Linux.txt` (Histoire UNIX/GNU/Linux, GPL, distributions, noyau/shell, 21 p.) → `Chap.2_Systeme_Fichier.txt` (Arborescence `/`, FHS, tout est fichier, ext4, montage, 16 p.) → **`Chap.3_Installation_Debian_12.txt`** (Installation pas à pas de Debian 12, partitionnement, `sources.list`, `apt`, 17 p.) → **`Chap.4_Commandes_de_Base_Unix.txt`** (Syntaxe d'une commande, `ls, cd, cp, mv, rm, mkdir, ln -s, find, grep`, 14 p.) → `Chap.5_Gestion_des_Utilisateurs_et_Groupe.txt` (`/etc/passwd`, `/etc/shadow`, `/etc/group`, `useradd, usermod, userdel, groupadd`, 8 p.) → `TP2_Droit_Acces_Fichier_Unix.txt` (Droits `rwx`, `chmod` symbolique et octal, `chown`, `chgrp`, 1 p.).
- **Ordre sur le site (`b1-linux/chapitres/chapitre1..6.html`)** : Le site **inverse les Chapitres 3 et 4** (place les commandes de base au Ch. 3 `chapitre3.html` avant l'installation de Debian 12 au Ch. 4 `chapitre4.html` — ce qui est pédagogiquement défendable, mais au Ch. 4 il utilise `chmod` et les permissions avant le Ch. 6). Surtout, les 18 exercices des Chapitres 1 à 6 exigent d'écrire des **scripts Bash (`#!/bin/bash`, variables, conditions `if`, boucles `for/while`, `case`)** dès le Chapitre 1 (`b1-linux/chapitres/chapitre1.html:L140`), alors que l'écriture de scripts Bash n'est introduite qu'à la toute dernière section du **Chapitre 6** (`b1-linux/chapitres/chapitre6.html:L108`) !

## 2. Couverture (Lacunes & Ajouts)
- **Couverture** : Les 5 chapitres et le TP2 des sources sont intégralement couverts.
- **Ajout du site** : La section 4 du Chapitre 6 (`chapitre6.html:L108-L130` : *Écrire ses premiers scripts Bash*) est un ajout du site absent des 6 PDF sources (qui s'arrêtent à `chmod`/`chown` dans `TP2_Droit_Acces_Fichier_Unix.txt#PAGE 1`).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Logiciel libre (Free Software)
- **Source PDF** : `textes/B1/LINUX/Chap.1_Systeme_Linux.txt#PAGE 11` : « Un logiciel libre (au sens de la FSF et de la licence GNU GPL de Richard Stallman) garantit 4 libertés fondamentales : exécuter (0), étudier et modifier le code source (1), redistribuer des copies (2), et publier ses améliorations (3). »
- **Site web** : `b1-linux/chapitres/chapitre1.html:L84` : « Le logiciel libre repose sur les quatre libertés de la FSF (libertés 0 à 3 : utiliser, étudier le code source, redistribuer, partager les versions modifiées), protégées par le copyleft de la licence GPL. »
- **Diagnostic** : **Parfaitement fidèle**.

### Définition 2 — Inode et lien symbolique
- **Source PDF** : `textes/B1/LINUX/Chap.4_Commandes_de_Base_Unix.txt#PAGE 9` : « Un lien symbolique (`ln -s`) est un fichier spécial contenant le chemin vers un autre fichier ; si la cible est supprimée, le lien symbolique devient cassé (orphelin). »
- **Site web** : `b1-linux/chapitres/chapitre3.html:L92` : « Créé par `ln -s cible lien`, le lien symbolique pointe vers le nom/chemin de la cible : si la cible disparaît, le lien devient orphelin (cassé). »
- **Diagnostic** : **Fidèle**.

### Définition 3 — Format de `/etc/passwd`
- **Source PDF** : `textes/B1/LINUX/Chap.5_Gestion_des_Utilisateurs_et_Groupe.txt#PAGE 3` : « Chaque ligne comporte 7 champs séparés par `:` : `login:x:UID:GID:commentaire(GECOS):répertoire_personnel:shell`. »
- **Site web** : `b1-linux/chapitres/chapitre5.html:L62` : « Chaque ligne de `/etc/passwd` contient 7 champs séparés par `:` : `nom:x:UID:GID:GECOS:home:shell`. »
- **Diagnostic** : **Exactement alignée**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Les exercices des Ch. 3, 5 et 6 s'inspirent des manipulations de `Chap.4_Commandes_de_Base_Unix.txt`, `Chap.5` et `TP2_Droit_Acces_Fichier_Unix.txt#PAGE 1`, mais les transforment dès le Ch. 1 en scripts Bash automatisés lisant sur `stdin` avant que la syntaxe de script Bash ait été enseignée (Ch. 6 §4).
