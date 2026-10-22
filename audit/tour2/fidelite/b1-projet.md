# Fidélité aux Sources (Mission A) — `b1-projet` (Projet · B1)

- **Cours** : `b1-projet` (Projet) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 42 pages)** :
- `textes/B1/General/tutoriel_projet.txt` (16 pages, statut `ok`)
- `textes/B1/Proje/CDP_COURS_PROJET TUTEURE 2 - CONCEP APP MONITORING .txt` (26 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Alignement fidèle avec `textes/B1/General/tutoriel_projet.txt` (16 p., Python/Tkinter/PostgreSQL)**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B1/General/tutoriel_projet.txt#PAGE 1` : *TUTORIEL PROJET TUTORÉ*
- `textes/B1/General/tutoriel_projet.txt#PAGE 3` : *Python & PostgreSQL                                                   Projet Tut*
- `textes/B1/General/tutoriel_projet.txt#PAGE 5` : *Python & PostgreSQL                                                Projet Tutore*
- `textes/B1/General/tutoriel_projet.txt#PAGE 7` : *Python & PostgreSQL                                          Projet Tutoré - Ge*
- `textes/B1/General/tutoriel_projet.txt#PAGE 9` : *Python & PostgreSQL                                                    Projet Tu*
- `textes/B1/General/tutoriel_projet.txt#PAGE 11` : *Python & PostgreSQL                                           Projet Tutoré - G*
- `textes/B1/Proje/CDP_COURS_PROJET TUTEURE 2 - CONCEP APP MONITORING .txt#PAGE 1` : *B1-IT : PROJET TUTEURE N°2 : Conception*
- `textes/B1/Proje/CDP_COURS_PROJET TUTEURE 2 - CONCEP APP MONITORING .txt#PAGE 5` : *INTRODUCTION GENERALE*
- **Progression des chapitres sur le site** :
- `b1-projet/chapitres/chapitre1.html` : **Chapitre 1 — Cadrage du projet** — 1. Présentation, besoin métier et objectifs (`L80`), 2. Installer l'environnement (`L98`), 3. La structure du projet (`L112`), 4. Études de cas & applications pratiques (`L125`)
- `b1-projet/chapitres/chapitre2.html` : **Chapitre 2 — La base de données** — 1. La table produits (`L81`), 2. Connexion et gestion des erreurs (`L90`), 3. Les quatre requêtes CRUD (`L104`), 4. Études de cas & applications pratiques (`L118`)
- `b1-projet/chapitres/chapitre3.html` : **Chapitre 3 — L'interface Tkinter** — 1. Deux écrans, une fenêtre (`L81`), 2. Widgets, layout et tableau (`L90`), 3. Validation et boîtes de dialogue (`L104`), 4. Études de cas & applications pratiques (`L118`)
- `b1-projet/chapitres/chapitre4.html` : **Chapitre 4 — Cycle de vie d'un produit** — 1. Ajouter et modifier (`L80`), 2. Supprimer avec confirmation (`L88`), 3. Mouvements de stock (`L101`), 4. Études de cas & applications pratiques (`L114`)
- `b1-projet/chapitres/chapitre5.html` : **Chapitre 5 — Logique métier du stock** — 1. Alertes de seuil (`L80`), 2. Valeur du stock (`L88`), 3. Recherche et maximum (`L101`), 4. Études de cas & applications pratiques (`L114`)
- `b1-projet/chapitres/chapitre6.html` : **Chapitre 6 — Fiabiliser et livrer** — 1. Le dépannage du tutoriel (`L80`), 2. Exporter et améliorer (`L88`), 3. Le tableau de bord de soutenance (`L102`), 4. Études de cas & applications pratiques (`L115`)

## 2. Couverture (Lacunes & Ajouts)
- **Correction d'index + Prérequis manquants (`D1/D6`, S0)** : La vraie source est `textes/B1/General/tutoriel_projet.txt#PAGE 1-16` (et non `CDP_COURS_PROJET TUTEURE 2` qui est le cours de Supervision B3). Le tutoriel source annonce dès `#PAGE 3` trois prérequis (`POO Python`, `Tkinter`, `PostgreSQL/psycopg2`), mais comme `b1-python` ne couvre ni la POO ni Tkinter, l'étudiant B1 se retrouve face à `class Database` (`chapitre2.html:L66`) et `tkinter/ttk.Treeview` (`chapitre3.html:L56`) sans les avoir jamais appris !

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — L’interface graphique (IHM)
- **Source PDF** : `textes/B1/General/tutoriel_projet.txt#PAGE 7` : « 5.1 Architecture de l’interface L’application est structurée en deux parties : 1. Interface de connexion : Pour se connecter à PostgreSQL 2. Interface p »
- **Site web** : `b1-projet/chapitres/chapitre1.html:L84` : « **L’interface graphique (IHM)** : réalisée avec la bibliothèque native »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — La persistance fiable des données
- **Source PDF** : `textes/B1/General/tutoriel_projet.txt#PAGE 1` : « stgreSQL Réalisé par : [LAWSON Latevi Sena] Enseignant : [LAWSON Latevi Sena] Université : Collège de Paris - Campus de Lomé Janvier 2026 »
- **Site web** : `b1-projet/chapitres/chapitre1.html:L86` : « **La persistance fiable des données** : déléguée au SGBD relationnel »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — gestion robuste des exceptions
- **Source PDF** : `textes/B1/General/tutoriel_projet.txt#PAGE 1` : « TORÉ Application de Gestion de Stock Python, Tkinter & PostgreSQL Réalisé par : [LAWSON Latevi Sena] Enseignant : [LAWSON Latevi Sena] Université : Collège »
- **Site web** : `b1-projet/chapitres/chapitre1.html:L88` : « **gestion robuste des exceptions** : (erreurs de connexion SQL, saisie de texte à la place d’un nombre) et la modularité du code. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
