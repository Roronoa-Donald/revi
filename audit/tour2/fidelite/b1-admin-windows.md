# Fidélité aux Sources (Mission A) — `b1-admin-windows` (Administration Windows · B1)

- **Cours** : `b1-admin-windows` (Administration Windows) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 82 pages)** :
- `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt` (58 pages, statut `ok`)
- `textes/B1/ADMIN_WINDOWS/Chap. 2_Installation_Serveur_AD DS.txt` (24 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Supports sources partiels (2 chapitres : Intro + Installation AD DS Windows 2012 R2) étendus à 6 chapitres sur le site**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 1` : *Base de l’Administration Windows*
- `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 10` : *Un peu de contexte*
- `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 19` : *Convertir une installation complète en Core*
- `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 28` : *Gestionnaire de serveur*
- `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 37` : *Renommer la machine*
- `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 46` : *Modifier le mot de passe administrateur et Notion de Store*
- `textes/B1/ADMIN_WINDOWS/Chap. 2_Installation_Serveur_AD DS.txt#PAGE 1` : *Base de l’Administration Windows*
- `textes/B1/ADMIN_WINDOWS/Chap. 2_Installation_Serveur_AD DS.txt#PAGE 5` : *Notion*
- **Progression des chapitres sur le site** :
- `b1-admin-windows/chapitres/chapitre1.html` : **Chapitre 1 — L’administration système et l’administrateur** — 1. Qu’est-ce que l’administration système ? (`L80`), 2. Les tâches de l’administrateur (`L89`), 3. Qualités et types d’administration (`L106`), 4. Les outils d’administration Windows (`L126`)
- `b1-admin-windows/chapitres/chapitre2.html` : **Chapitre 2 — Windows Server 2012 R2 : éditions et installation** — 1. Un peu de contexte : de Windows 1.0 à Windows Server 2022 (`L80`), 2. Les quatre éditions de Windows Server 2012 (`L89`), 3. Options d’installation : Core ou interface graphique ? (`L105`), 4. Configuration requise et ouverture de session (`L118`)
- `b1-admin-windows/chapitres/chapitre3.html` : **Chapitre 3 — Configuration initiale du serveur** — 1. Le Gestionnaire de serveur : point central d’administration (`L80`), 2. Pare-feu : trois profils à maîtriser (`L94`), 3. Renommer la machine et fixer l’adresse IP (`L110`), 4. Activer Windows et la communication à distance (`L127`)
- `b1-admin-windows/chapitres/chapitre4.html` : **Chapitre 4 — Active Directory : domaine, arbre, forêt** — 1. La notion d’Active Directory (`L80`), 2. Succursales et sous-domaines (`L90`), 3. Arbre et forêt (`L99`), 4. Ce qu’il faut retenir avant d’installer (`L109`)
- `b1-admin-windows/chapitres/chapitre5.html` : **Chapitre 5 — Installer un contrôleur de domaine** — 1. Installer le rôle AD DS (`L80`), 2. Les informations à réunir avant la configuration (`L90`), 3. Ajouter une nouvelle forêt (`L105`), 4. Emplacements des données et vérification (`L116`)
- `b1-admin-windows/chapitres/chapitre6.html` : **Chapitre 6 — Gérer les objets AD DS** — 1. La console et les unités d’organisation (`L80`), 2. Créer et paramétrer des utilisateurs (`L89`), 3. Les groupes : droits, types et étendues (`L99`), 4. Joindre un poste au domaine et profils itinérants (`L108`)

## 2. Couverture (Lacunes & Ajouts)
- Les 2 PDF sources (`Chap. 1_Intro_Admin_Windows.txt` 58 p. et `Chap. 2_Installation_Serveur_AD DS.txt` 24 p.) couvrent les Ch. 1, 2 et 4 du site (Windows Server 2012 R2 et AD DS) ; les Ch. 3 ( Comptes/NTFS), 5 (GPO) et 6 (DNS/DHCP/Maintenance) prolongent le programme sans PDF dédié dans le dossier.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — administration système
- **Source PDF** : `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 1` : « Base de l’Administration Windows 1ème Année (IT_B1A et IT_B1B) INTRODUCTION A L’ADMINISTRATRION WINDOWS Préparé par »
- **Site web** : `b1-admin-windows/chapitres/chapitre1.html:L82` : « **administration système** : est l’ensemble des pratiques, outils et procédures permettant de configurer, sécuriser et maintenir opérationnel le parc informatique d’une organisation (serveu »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — administrateur système
- **Source PDF** : `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 4` : « à une personne qui s’appelle administrateur système, qui veille à ce que tout le système informatique d'une entreprise fonctionne convenablement. • L’administrateur Système peut avoir un »
- **Site web** : `b1-admin-windows/chapitres/chapitre1.html:L83` : « **administrateur système** : . Alors qu’un utilisateur ordinaire se contente de consommer des applications (navigateur, tableur, messagerie), l’administrateur veille à ce que le socle matér »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — gérer les comptes utilisateurs
- **Source PDF** : `textes/B1/ADMIN_WINDOWS/Chap. 1_Intro_Admin_Windows.txt#PAGE 5` : « s se résument comme suit : ▪ Gérer les comptes utilisateurs (tâche simple et automatisable) ▪ Assister et éduquer les utilisateurs (répondre à leurs questions, documentation à jour po »
- **Site web** : `b1-admin-windows/chapitres/chapitre1.html:L93` : « **gérer les comptes utilisateurs** : — tâche simple et automatisable ; »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- **Contradiction majeure (`D6 / D8`, S0)** : La source enseigne l'administration Windows GUI et PowerShell (`Install-ADDSForest` dans `Chap. 2_Installation_Serveur_AD DS.txt#PAGE 18`), mais les 18 exercices du site (`b1-admin-windows/chapitres/chapitre1.html:L148`) sont en **Bash Linux (`data-language='shell'`, `#!/bin/bash`)** !
