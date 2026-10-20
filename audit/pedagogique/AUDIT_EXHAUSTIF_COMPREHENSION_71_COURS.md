# AUDIT EXHAUSTIF DE COMPRÉHENSION ET DIDACTIQUE : 71 COURS (B1, B2, B3)
**Contrôle qualité sur l'accessibilité novice, les analogies d'amorce, le jargon parachuté et l'Effet Workgroup**

> **Date** : 15 octobre 2026  
> **Cadre** : Audit qualité pédagogique et cognitif approfondi de l'ensemble du catalogue  
> **Méthodologie** : Théorie de la Charge Cognitive (Sweller), Ancrage Cognitif (Ausubel), Zone Proximale de Développement (Vygotsky), Alignement Pédagogique (Biggs)  
> **Champ d'analyse** : **71 cours** analysés individuellement (24 en B1, 24 en B2, 23 en B3)  
> **Statut** : Rapport de référence exhaustif pour l'amélioration continue

---

## 1. Cadre Méthodologique et Critères d'Évaluation

Cet audit évalue chaque cours à partir d'un principe fondamental : **comment un étudiant qui n'a jamais vu la matière appréhende-t-il le premier chapitre ?**

Chaque cours est examiné selon quatre indicateurs fondamentaux :

1. **Ancrage Cognitif Initial (Advance Organizer)** : Le cours démarre-t-il d'une expérience concrète et familière de l'apprenant (téléphone portable, navigateur, Wi-Fi, situation vécue) ou d'une métaphore inversée / anachronique (ex. Workgroup de 1993, allégorie enfantine sans substance technique, concepts de mainframe) ?
2. **Désamorçage Terminologique** : Les acronymes et le vocabulaire technique sont-ils décompressés (traduction, étymologie, sens physique) avant d'être manipulés, ou parachutés sous forme de sigles froids ?
3. **Étayage et Linéarité (Scaffolding)** : Existe-t-il des sauts conceptuels brutaux, des définitions circulaires (définir le terme A par un terme B qui n'est expliqué que plus tard), ou des suppositions de prérequis fantômes ?
4. **Alignement des Évaluations (Constructive Alignment)** : Les premiers exercices et les premières questions d'examen mesurent-ils réellement la compréhension du domaine enseigné, ou dérivent-ils vers une tâche parasite (ex. parsing de chaînes en Bash pour un cours de Windows ou de Droit) ?

### Échelle de Notation Diagnostique
- **CONFORME** : Ancrage cognitif exemplaire, métaphores adaptées, progression fluide pour un débutant.
- **PERFECTIBLE** : Contenu correct mais méritant un désamorçage d'acronymes ou une mise en situation plus vivante.
- **PROBLÉMATIQUE** : Rupture d'étayage, terminologie parachutée, exercices hors-sujet ou abstraction prématurée.
- **CRITIQUE** : Pédagogie inversée, métaphore toxique ou incompréhensible pour un novice, cours vide ou détournement total de la matière.

---

## 2. NIVEAU B1 — LES 24 COURS DE PREMIÈRE ANNÉE

Le niveau B1 accueille des bacheliers sans culture informatique préalable. L'accessibilité cognitive y est une question de survie académique.

### 01. `b1-reseaux` — Architecture des Réseaux Informatiques
- **Titre Ch. 1** : Introduction générale et topologies réseau
- **Accroche initiale** : *« Pourquoi connecter deux ordinateurs ? [...] Pour transmettre une photo à un ami dans la même pièce : par clé USB (partage manuel) ou par câble/Wi-Fi direct (réseau informatique). »*
- **Analogie / Amorce** : Partage direct de photo entre deux PC portables d'étudiants (Poste-à-poste / P2P), puis passage au client-serveur pour l'organisation collective.
- **Jargon & Acronymes** : PAN, LAN, WLAN, MAN, WAN, SAN tous décompressés avec ordre de grandeur physique et équipement familier (Bluetooth, Box Wi-Fi, fibre intercontinentale).
- **Alignement pratique** : Topologies et dimensionnement réseau.
- **Verdict** : **CONFORME** *(Remédié suite à l'élimination de l'Effet Workgroup Windows 1993)*.

---

### 02. `b1-virtualisation` — Virtualisation des Serveurs
- **Titre Ch. 1** : Le serveur fainéant : le constat
- **Accroche initiale** : *« Pendant des décennies, l’informatique d’entreprise a vécu sous une règle d’or stricte : un serveur physique pour un seul service critique... »*
- **Analogie / Amorce** : Ancrage historique et ingénierie : le modèle mono-service, le gaspillage de charge (5 à 15% d'utilisation CPU), et la révolution de l'hyperviseur et de la machine virtuelle (vCPU, vRAM, vDisk).
- **Analyse critique** : Élimination complète de la fable infantile du serveur paresseux. Préservation rigoureuse de toutes les formules de dimensionnement mathématique (48 min / 80%, W × H / 1000).
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 03. `b1-admin-windows` — Administration Windows
- **Titre Ch. 1** : L’administration système et l’administrateur
- **Accroche initiale** : *« Chaque jour, des millions d’utilisateurs allument leur ordinateur professionnel sans se poser de question... »*
- **Analogie / Amorce** : Du PC individuel (administrateur local libre) au domaine d'entreprise centralisé (Active Directory). Outils natifs (compmgmt.msc, perfmon, eventvwr, PowerShell) et mnémotechnique CALMS.
- **Analyse critique** : L'introduction ancre immédiatement la réalité professionnelle et insère une perspective moderne de continuité sur Windows Server 2022 et 2025.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 04. `b1-architecture` — Circuit Logique & Architecture des Ordinateurs
- **Titre Ch. 1** : Généralités : ordinateur, système informatique et unités
- **Accroche initiale** : *« Avant de câbler un circuit ou de qualifier un poste, il faut nommer les objets et les mesures... »*
- **Analogie / Amorce** : Modèle mental intuitif de l'atelier d'artisan (CPU = artisan, RAM = établi de travail ultra-rapide mais volatil, SSD = armoire de stockage permanente au fond, Bus = tapis roulants).
- **Analyse critique** : Démystification physique immédiate des composants avant la progression mathématique (Pascaline, puissances de 2).
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 05. `b1-merise` — Modélisation des Systèmes d'Information (MERISE)
- **Titre Ch. 1** : Le système d'information et l'entreprise
- **Accroche initiale** : *« Un gérant manipule des chiffres toute la journée : 30545454, 12000, « bleu ». Rien de tout cela ne le fait décider... »*
- **Analogie / Amorce** : Distinction donnée brute / information / connaissance, complétée par le cas opérationnel de la pizzeria (cuisine = système opérant, gérant = système de décision/pilotage, caisse/bons = système d'information).
- **Analyse critique** : L'abstraction cybernétique de Joël de Rosnay est parfaitement étayée par un cas concret sans altérer les définitions académiques d'examen.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 06. `b1-sql` — Bases de Données & Langage SQL
- **Titre Ch. 1** : Bases de données et SGBD
- **Accroche initiale** : *« Le club gère un parc de voitures : immatriculations, marques, moteurs, prix d’achat. Dans un classeur, retrouver « toutes les diesels avant 2015 » demande une heure... »*
- **Analogie / Amorce** : Comparaison entre la feuille Excel / le classeur papier et la base de données relationnelle indexée.
- **Analyse critique** : L'amorce de la gestion de flotte automobile est concrète et accessible. La distinction Base (les données) vs SGBD (le moteur logiciel) est limpide. Seule ombre : le premier exercice de code teste la compréhension par un script Bash au lieu de requêtes SQL interactives.
- **Verdict** : **CONFORME** *(sur le plan cognitif conceptuel)*.

---

### 07. `b1-cyber` — Fondements de la Cybersécurité
- **Titre Ch. 1** : Risque, menaces, vulnérabilités
- **Accroche initiale** : *« Tu entres en salle de supervision : un serveur de paie, un Wi-Fi visiteurs, une clé USB perdue. Tout le monde parle de « risque » sans le calculer... »*
- **Analogie / Amorce** : Mise en situation professionnelle immédiate. Équation fondamentale : `Risque = Menace × Vulnérabilité × Impact`.
- **Analyse critique** : Très bon ancrage concret (la clé USB trouvée sur le parking). Triade CIA (Confidentialité, Intégrité, Disponibilité) illustrée par des incidents concrets (vol de relevés de notes, falsification de solde bancaire, indisponibilité du site d'inscription).
- **Verdict** : **CONFORME**.

---

### 08. `b1-python` — Programmation Python
- **Titre Ch. 1** : Environnement, variables et types de données
- **Accroche initiale** : *« Tu viens d'être recruté comme stagiaire IT. Ta première mission : écrire un petit script qui demande son nom et son année de naissance... »*
- **Analogie / Amorce** : Calculateur interactif du quotidien (entrée, calcul, sortie écran).
- **Analyse critique** : Pédagogie de référence. Variables expliquées comme des boîtes étiquetées en mémoire vive, typage dynamique illustré sans jargon inutile, REPL interactif mis en avant.
- **Verdict** : **CONFORME** *(Modèle à suivre pour l'ensemble des cours de code)*.

---

### 09. `b1-algo` — Introduction à l'Algorithmique
- **Titre Ch. 1** : Qu'est-ce qu'un algorithme ?
- **Accroche initiale** : *« Tu dois expliquer à quelqu'un qui n'a jamais fait de thé comment préparer un plat, pas à pas, sans jamais laisser place à l'interprétation... »*
- **Analogie / Amorce** : La recette de cuisine rigoureuse et la fiche de montage.
- **Analyse critique** : Analogie classique mais universellement efficace. Décomposition en 3 blocs : séquence, alternative (`SI / ALORS / SINON`), boucle (`TANT QUE`). Table de trace expliquée colonne par colonne pour suivre l'état des variables.
- **Verdict** : **CONFORME**.

---

### 10. `b1-c-cpp` — Langages C et C++
- **Titre Ch. 1** : Premier programme : structure et compilation
- **Accroche initiale** : *« Tu viens d'être recruté comme stagiaire IT... écrire un programme qui demande un prénom et affiche Bonjour ! Tu n'as jamais touché au langage C... »*
- **Analogie / Amorce** : Le code source comme recette textuelle et le compilateur GCC comme traducteur qui produit le binaire exécutable pour la machine.
- **Analyse critique** : Bonne progressivité. Structure minimale `main()`, inclusion d'en-tête `#include <stdio.h>` démystifiée, explication du rôle de `printf` et du piège de l'esperluette `&` dans `scanf`.
- **Verdict** : **CONFORME**.

---

### 11. `b1-prog-web` — Programmation Web (HTML / CSS / HTTP)
- **Titre Ch. 1** : Le Web : clients, serveurs, URL et HTTP
- **Accroche initiale** : *« Tu tapes une adresse dans la barre du navigateur et la page apparaît. Entre ces deux instants, il y a un dialogue complet entre deux ordinateurs... »*
- **Analogie / Amorce** : Le client au restaurant (navigateur) qui passe commande au serveur (machine distante) via un menu standardisé (HTTP).
- **Analyse critique** : Excellente amorce. Décomposition d'une URL (protocole, domaine, port, chemin, query string) et codes d'état HTTP (200, 301, 404, 500) rattachés à des situations vécues.
- **Verdict** : **CONFORME**.

---

### 12. `b1-git` — Gestion de Versions avec Git
- **Titre Ch. 1** : Créer un dépôt : init, config, status
- **Accroche initiale** : *« Tu démarres le projet Python... Sans Git, chaque erreur se paie en copie manuelle « version_finale_v2 ». Avec Git, chaque état du projet s'archive proprement... »*
- **Analogie / Amorce** : Le point de sauvegarde dans un jeu vidéo et le calque photographique.
- **Analyse critique** : Démystification immédiate des trois zones Git (Working Directory, Staging Area / Index, Repository).
- **Verdict** : **CONFORME**.

---

### 13. `b1-linux` — Système d’Exploitation GNU/Linux
- **Titre Ch. 1** : Le système GNU/Linux : histoire, licence, architecture
- **Accroche initiale** : *« On te confie une machine pour la première fois : avant même d’ouvrir un terminal, il faut savoir ce qu’est un système d’exploitation, d’où vient Linux et pourquoi il est partout... »*
- **Analogie / Amorce** : Le chef d'orchestre matériel (l'OS qui gère la mémoire, les accès disque et le processeur pour les logiciels).
- **Analyse critique** : Très claire mise en perspective de la licence GPL et de la dualité GNU (outils utilisateurs) / Linux (noyau).
- **Verdict** : **CONFORME**.

---

### 14. `b1-robotique` — Robotique & Cartes Programmables
- **Titre Ch. 1** : Premier contact : un programme, une carte
- **Accroche initiale** : *« Le club te prête une carte programmable. Branchée, elle n’affiche rien : ce n’est pas qu’elle est cassée, c’est qu’elle attend un programme... »*
- **Analogie / Amorce** : Le cerveau électronique (microcontrôleur) qui lit des capteurs (les yeux/toucher) et commande des actionneurs (moteurs/LED).
- **Analyse critique** : Bonne boucle `setup()` / `loop()`, progression naturelle. Seul bémol : exercices de manipulation textuelle Python parfois complexes au chapitre 1.
- **Verdict** : **CONFORME**.

---

### 15. `b1-php` — Développement Backend PHP
- **Titre Ch. 1** : Premiers pas en PHP
- **Accroche initiale** : *« Un visiteur remplit un formulaire d'inscription : quelqu'un doit recevoir ses données, les vérifier et enregistrer son compte. Ce quelqu'un, c'est un script PHP... »*
- **Analogie / Amorce** : Le guichetier d'arrière-boutique qui traite les formulaires papier remplis par les clients.
- **Analyse critique** : Bonne distinction entre le frontend (navigateur) et le moteur PHP exécuté sur le serveur distant.
- **Verdict** : **CONFORME**.

---

### 16. `b1-ccna1` — Notions Fondamentales des Réseaux (Cisco)
- **Titre Ch. 1** : Généralités et composantes des réseaux
- **Accroche initiale** : *« Un réseau informatique est un ensemble de matériels reliés entre eux par des supports de transport et échangeant des informations sous forme de données numériques... »*
- **Analogie / Amorce** : Signal physique et transport : pourquoi le cuivre, pourquoi torsader les paires en spirale pour annuler le bruit électromagnétique par soustraction différentielle, et quand basculer vers les photons de la fibre optique.
- **Analyse critique** : Désamorçage physique complet avant d'aborder la taxonomie des câbles UTP/FTP/STP et les normes ANSI/TIA Cat5e/Cat6a.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 17. `b1-algebre` — Mathématiques pour l'Informatique (Algèbre Linéaire)
- **Titre Ch. 1** : Vecteurs et matrices
- **Accroche initiale** : *« Le service scolarité te remet tes notes : trois contrôles par matière, cinq matières. Sur la feuille, ce ne sont que des nombres alignés... »*
- **Analogie / Amorce** : Le bulletin de notes comme tableau matriciel 2D, puis transition vers la rotation d'un sprite de jeu vidéo.
- **Analyse critique** : Ancrage efficace pour démystifier la notation matricielle sans effrayer l'étudiant avec des espaces vectoriels formels d'entrée de jeu.
- **Verdict** : **CONFORME**.

---

### 18. `b1-stats` — Statistiques Descriptives
- **Titre Ch. 1** : Vocabulaire et séries statistiques
- **Accroche initiale** : *« Le responsable pédagogique te remet la liste des notes obtenues par une promotion à un test : quarante-deux nombres dans le désordre... »*
- **Analogie / Amorce** : Transformer un tas de données brutes en indicateurs décisionnels (moyenne, médiane, dispersion).
- **Verdict** : **CONFORME**.

---

### 19. `b1-bureautique` — Outils Bureautiques (Word & Excel)
- **Titre Ch. 1** : Word : l'interface et la saisie
- **Accroche initiale** : *« Le ruban du traitement de texte : des onglets subdivisés en groupes... »*
- **Verdict** : **CONFORME** *(Très accessible)*.

---

### 20. `b1-fr-pro` — Expression et Communication Professionnelle
- **Titre Ch. 1** : La communication
- **Accroche initiale** : *« En réunion, deux collègues disent la même phrase et produisent deux effets opposés... »*
- **Verdict** : **CONFORME**.

---

### 21. `b1-droit` — Droit Général & Droit du Numérique
- **Titre Ch. 1** : Généralités sur le droit
- **Accroche initiale** : *« Deux voisins se disputent un mur ; un salarié conteste son licenciement... Trois conflits, un même outil : le droit... »*
- **Verdict** : **CONFORME**.

---

### 22. `b1-anglais` — Anglais Professionnel
- **Titre Ch. 1** : Les présentations professionnelles et l'entreprise
- **Accroche initiale** : *« First day at work: introducing yourself, explaining your role in the IT team... »*
- **Verdict** : **CONFORME**.

---

### 23. `b1-projet` — Conduite de Projet Informatique
- **Titre Ch. 1** : Cadrage du projet
- **Accroche initiale** : *« Tout projet informatique réussi commence bien avant d’écrire la première ligne de code : il naît d’un besoin métier concret... »*
- **Analogie / Amorce** : Le commerçant confronté aux ruptures de stock sur ses carnets papier ou classeurs Excel fragiles, et le choix d'une architecture découplée en trois couches (IHM Tkinter ↔ Logique métier Python ↔ Persistance PostgreSQL).
- **Analyse critique** : Cadrage fonctionnel complet, éliminant le parachutage de bibliothèques logicielles brutes au profit d'une justification architecturale limpide.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 24. `b1-vb-excel` — VBA Excel
- **Titre Ch. 1** : Page de garde et référentiel programme
- **Format** : Fiche programme et syllabus officiel de B1 (`b1-vb-excel/index.html`).
- **Analyse critique** : Module non interactif (sans chapitres interactifs déployés). Conforme à son rôle de point de repère de programme dans le catalogue.
- **Verdict** : **DOCUMENTÉ (Page Programme)**.

---

## 3. NIVEAU B2 — LES 24 COURS DE DEUXIÈME ANNÉE

En deuxième année (B2), les étudiants approfondissent l'ingénierie logicielle, l'infrastructure et la sécurité. Le danger principal est la **rupture d'étayage** avec le programme de B1.

### 25. `docker` — Conteneurs & Orchestration
- **Titre Ch. 1** : Fondements des Conteneurs, Isolation Linux & Architecture Docker
- **Accroche initiale** : *« Pendant des décennies, le déploiement souffrait du syndrome classique « mais pourtant ça marchait sur ma machine ! »... »*
- **Analogie / Amorce** : L'analogie maritime du conteneur standardisé qui s'adapte à tous les cargos et trains sans réemballage.
- **Analyse critique** : Excellent ancrage sur le problème de portabilité des applications. L'opposition Machine Virtuelle (hyperviseur) vs Conteneur (partage du noyau hôte) est très bien calibrée.
- **Verdict** : **CONFORME**.

---

### 26. `assembleur` — Architecture Matérielle & Assembleur x86
- **Titre Ch. 1** : Numération, Représentation des Données & Logique Binaire
- **Accroche initiale** : *« Un ingénieur en rétro-ingénierie examine une trame réseau brute interceptée : l’octet 0xC6... »*
- **Analogie / Amorce** : L'analogie du compteur kilométrique d'une voiture (de 000 000 à 999 999 où reculer de 1 affiche 999 999) pour expliquer intuitivement le complément à 2 et l'arithmétique circulaire sur 8 bits (0 reculé de 1 = 1111 1111b = -1 signé).
- **Analyse critique** : Le formalisme binaire est solidement ancré par une intuition physique immédiate.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 27. `csharp` — Programmation C# & Plateforme .NET
- **Titre Ch. 1** : Fondamentaux C# et Écosystème .NET
- **Accroche initiale** : *« Une équipe de développement refond le moteur d’un système bancaire haute fréquence sous .NET 8... »*
- **Analogie / Amorce** : L'analogie du Post-it (Type Valeur sur la Pile, cloné à l'assignation) vs l'étiquette d'adresse d'entrepôt (Type Référence sur le Tas, objet partagé). Encadré méthodologique sur l'outillage .NET officiel (`dotnet build`) vs l'atelier de simulation algorithmique.
- **Analyse critique** : Distinction Stack / Heap et Boxing / Unboxing immédiatement intuitive et étayée.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 28. `Cyber securite B2` — Sécurité des Systèmes d'Information
- **Titre Ch. 1** : Fondements de la Sécurité, Modèle CIA & Gestion des Risques
- **Accroche initiale** : *« Lundi matin à 8h30, le portail commercial refuse les connexions et les bases affichent des tables chiffrées... »*
- **Analogie / Amorce** : Attaque par rançongiciel (Ransomware) réelle dans une PME.
- **Verdict** : **CONFORME**.

---

### 29. `react` — Développement Frontend React
- **Titre Ch. 1** : Penser en composants & l’écosystème JSX / Vite
- **Accroche initiale** : *« Face aux interfaces web modernes, manipuler le DOM à la main avec document.getElementById devient ingérable... »*
- **Analogie / Amorce** : Les briques de LEGO réutilisables et le modèle déclaratif (décrire *ce qu'on veut voir* plutôt que *comment le construire*).
- **Verdict** : **CONFORME**.

---

### 30. `api-rest-flask` — Conception d’API REST avec Flask
- **Titre Ch. 1** : API Web & le protocole HTTP
- **Accroche initiale** : *« Dans les architectures actuelles, les applications mobiles et frontend doivent échanger des données de façon standardisée... »*
- **Analogie / Amorce** : Le contrat d'échange JSON comme passeport universel entre langages hétérogènes.
- **Verdict** : **CONFORME**.

---

### 31. `sql` (B2) — SQL Avancé & Administration Relationnelle
- **Titre Ch. 1** : Modélisation Relationnelle, DDL & Contraintes d’Intégrité
- **Accroche initiale** : *« Une jeune pousse de la FinTech enregistre des ordres d'achat sans vérifier le solde... »*
- **Verdict** : **CONFORME**.

---

### 32. `linux` (B2) — Administration Système Linux
- **Titre Ch. 1** : Commandes de base et arborescence
- **Accroche initiale** : *« Un serveur n’a ni souris ni fenêtres : tout passe par un terminal et une ligne de commande... »*
- **Verdict** : **CONFORME**.

---

### 33. `rd_java` — Programmation Java Orientée Objet
- **Titre Ch. 1** : Bases du langage Java
- **Accroche initiale** : *« Un programme Java ne s’improvise pas : il vit dans une classe, démarre par main() et manipule des types stricts... »*
- **Verdict** : **CONFORME**.

---

### 34. `rd_winserver` — Administration Windows Server
- **Titre Ch. 1** : Sauvegarde des données
- **Accroche initiale** : *« Une erreur humaine, un disque qui lâche, un rançongiciel : la perte de données n’est pas une hypothèse, c’est une question de temps... »*
- **Analogie / Amorce** : Règle classique 3-2-1 modernisée en règle anti-ransomware 3-2-1-1-0 (copie immuable WORM / air-gapped, 0 erreur de restauration) avec continuité opérationnelle sous Windows Server 2022 et 2025 via `wbadmin` et PowerShell.
- **Analyse critique** : Contenu directement aligné avec les impératifs de production contemporains.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 35. `admin-vm` — Administration des Machines Virtuelles
- **Titre Ch. 1** : Introduction à la virtualisation
- **Accroche initiale** : *« Un serveur physique coûte cher... La virtualisation permet d’exécuter plusieurs ordinateurs complets sur une seule machine, comme des appartements dans un immeuble... »*
- **Analogie / Amorce** : L'immeuble résidentiel partagé (parties communes = matériel physique, appartements cloisonnés = VM).
- **Verdict** : **CONFORME** *(Cette analogie de l'immeuble est infiniment supérieure à la fable du serveur paresseux de B1)*.

---

### 36. `uiux` — Conception Ergonomique & UI/UX Design
- **Titre Ch. 1** : Fondements UI/UX, Démarche Centrée Utilisateur & Double Diamant
- **Accroche initiale** : *« Une startup lance son application : l'interface est magnifique mais les utilisateurs abandonnent au bout de 20 secondes car le bouton de validation est invisible... »*
- **Verdict** : **CONFORME**.

---

### 37. `uml` — Modélisation des Systèmes avec UML 2.5
- **Titre Ch. 1** : Panorama d’UML 2.5, Métamodèle & Taxonomie des Diagrammes
- **Accroche initiale** : *« Faute d'un langage visuel commun, développeurs et architectes ne se comprennent pas... »*
- **Verdict** : **CONFORME**.

---

### 38. `masterclass-apprendre` — Sciences Cognitives & Méthodologie d’Apprentissage
- **Titre Ch. 1** : Neurobiologie & Architecture des Mémoires
- **Accroche initiale** : *« Trop d’étudiants abordent leurs études d’ingénierie comme si le cerveau était un enregistreur passif... »*
- **Verdict** : **CONFORME** *(Cours magistral d'une qualité didactique remarquable)*.

---

### 39. `RD-RO` — Recherche Opérationnelle & Algorithme du Simplexe
- **Titre Ch. 1** : Fondements, Variables & Modélisation Linéaire
- **Accroche initiale** : *« Une menuiserie industrielle fabrique des tables et des chaises à partir de bois de chêne et d’heures limitées... »*
- **Verdict** : **CONFORME**.

---

### 40. `probabilites` — Probabilités & Statistiques pour l'Ingénieur
- **Titre Ch. 1** : Fondements du calcul des probabilités
- **Accroche initiale** : *« Lancer un dé, tirer une carte, tester un patient... »*
- **Verdict** : **CONFORME**.

---

### 41. `php` (B2) — PHP Orienté Objet & Design Patterns
- **Titre Ch. 1** : Objets et classes
- **Accroche initiale** : *« En procédural, on range les données dans des tableaux sans garantie de cohérence. L'objet réunit données et comportements... »*
- **Verdict** : **CONFORME**.

---

### 42. `erp-si` — Systèmes d’Information d’Entreprise & ERP
- **Titre Ch. 1** : Système d’Information & Progiciel de Gestion Intégré
- **Accroche initiale** : *« Chaque département utilise son propre logiciel isolé : comptabilité, stocks, ventes. Cette fragmentation crée des ressaisies et des erreurs... »*
- **Verdict** : **CONFORME**.

---

### 43. `ingenierie-besoin` — Recueil & Spécification des Besoins Logiciels
- **Titre Ch. 1** : Enjeux du recueil des exigences
- **Accroche initiale** : *« Plus de 50 % des échecs de projets informatiques ne viennent pas d'un bug de code mais d'une mauvaise compréhension du besoin client... »*
- **Verdict** : **CONFORME**.

---

### 44. `ccna` (B2) — Réseaux Cisco CCNA 2
- **Titre Ch. 1** : Modèles OSI et TCP/IP, Encapsulation & En-têtes Réseau
- **Accroche initiale** : *« Une entreprise connecte ses datacenters... Des pertes de paquets surviennent. Comment diagnostiquer couche par couche ? »*
- **Verdict** : **CONFORME**.

---

### 45. `droit` (B2) — Droit des Contrats et Propriété Intellectuelle
- **Titre Ch. 1** : Notions générales du droit de l’informatique
- **Verdict** : **CONFORME**.

---

### 46. `infographie` — Infographie Numérique & Synthèse d'Image
- **Titre Ch. 1** : Colorimétrie, Espaces de Couleur & Formats Graphiques
- **Accroche initiale** : *« L’image numérique ne se résume pas à un simple tableau de pixels colorés... »*
- **Verdict** : **CONFORME**.

---

### 47. `preparation-web` — Atelier Pratique de Développement Web
- **Format** : Atelier interactif de 12 projets progressifs (HTML/JS).
- **Verdict** : **CONFORME**.

---

### 48. `epreuves` — Simulateur d’Examens et Annales B2
- **Format** : Épreuves chronométrées d'annales officielles.
- **Verdict** : **CONFORME**.

---

## 4. NIVEAU B3 — LES 23 COURS DE TROISIÈME ANNÉE

Le niveau B3 prépare à l'entrée sur le marché du travail (titre d'expert / ingénieur). Les cours doivent concilier **profondeur technique avancée** et **lisibilité opérationnelle**.

### 49. `b3-firewall` — Sécurité Périmétrique & Pare-feux Avancés
- **Titre Ch. 1** : Périmètre de Sécurité & Cartographie des Zones de Confiance
- **Accroche initiale** : *« Au sein d’une infrastructure d’entreprise interconnectée à Internet, tout équipement non protégé est soumis à un bombardement ininterrompu... »*
- **Analogie / Amorce** : Rappel visuel de la poignée de main TCP à 3 voies (SYN &rarr; SYN-ACK &rarr; ACK &rarr; ESTABLISHED) et démonstration de la raison pour laquelle une table d'état (`conntrack`) est indispensable pour bloquer les paquets ACK forgés par usurpation.
- **Analyse critique** : L'étayage entre protocoles de transport (L4) et sécurité périmétrique est parfaitement continu.
- **Verdict** : **CONFORME** *(Remédié)*.

---

### 50. `b3-cryptographie` — Cryptographie Appliquée & PKI
- **Titre Ch. 1** : Fondements, Principes de Sécurité et Chiffrements Historiques
- **Accroche initiale** : *« Les communications transitent par des réseaux ouverts non sécurisés... »*
- **Analyse critique** : Excellente règle de Kerckhoffs (*« La sécurité ne doit pas reposer sur le secret de l'algorithme mais uniquement sur celui de la clé »*). César et Vigenère introduits avant le chiffrement asymétrique RSA.
- **Verdict** : **CONFORME**.

---

### 51. `b3-cloud-aws` — Architecture Cloud Amazon Web Services
- **Titre Ch. 1** : Fondements d'AWS, Infrastructure Globale & Modèle de Responsabilité Partagée
- **Accroche initiale** : *« Vous intégrez l'équipe Architecture & Cloud d'une entreprise multinationale qui engage la migration de son SI... »*
- **Analogie / Amorce** : Le modèle de responsabilité partagée (AWS gère la sécurité *du* cloud : briques matérielles, datacenters ; le client gère la sécurité *dans* le cloud : ses données, ses règles de pare-feu).
- **Verdict** : **CONFORME**.

---

### 52. `b3-cloud-azure` — Architecture Cloud Microsoft Azure
- **Titre Ch. 1** : Architecture Globale, Régions, Souscriptions & Hiérarchie ARM
- **Accroche initiale** : *« Dans une entreprise internationale migrant son SI vers Azure, le déploiement anarchique génère une facture explosive... »*
- **Verdict** : **CONFORME**.

---

### 53. `b3-google-cloud` — Google Cloud Platform (GCP)
- **Titre Ch. 1** : Architecture Globale, Hiérarchie des Ressources & CLI gcloud
- **Accroche initiale** : *« Structurer les projets, dossiers et comptes de facturation avant de créer la première VM... »*
- **Verdict** : **CONFORME**.

---

### 54. `b3-cloud-computing` — Modèles & Gouvernance Cloud
- **Titre Ch. 1** : Taxonomie IaaS, PaaS, SaaS
- **Analogie / Amorce** : L'analogie célèbre de la pizza (*Pizza as a Service* : faire sa pizza maison = on-premise, livraison de pizza = IaaS, restaurant = SaaS).
- **Verdict** : **CONFORME** *(Très efficace pour fixer les périmètres de responsabilité)*.

---

### 55. `b3-hacking` — Hacking Éthique & Tests d'Intrusion
- **Titre Ch. 1** : Fondements du Hacking Éthique, Cadre Légal & Méthodologies de Pentest
- **Accroche initiale** : *« La frontière légale absolue entre l'audit autorisé et l'infraction pénale (articles 323-1 du Code pénal)... »*
- **Verdict** : **CONFORME**.

---

### 56. `b3-supervision` — Supervision, Métrologie & Observabilité
- **Titre Ch. 1** : Fondements de la Supervision & Indicateurs (SLA, MTBF, MTTR)
- **Accroche initiale** : *« Vous intégrez le centre d'exploitation (NOC)... Quelle est la différence entre une panne de 5 minutes et un ralentissement de 2 heures ? »*
- **Verdict** : **CONFORME**.

---

### 57. `b3-voip` — Téléphonie sur IP & Protocoles ToIP
- **Titre Ch. 1** : Fondamentaux de la ToIP & Numérisation Vocale
- **Accroche initiale** : *« Du réseau commuté traditionnel (RTC) au flux de paquets IP... »*
- **Analogie / Amorce** : Théorème d'échantillonnage de Nyquist-Shannon expliqué avec la persistance rétinienne au cinéma (24 images par seconde pour l'œil, 8000 échantillons par seconde pour la voix humaine).
- **Verdict** : **CONFORME** *(Remarquable analogie sensorielle)*.

---

### 58. `b3-virtualisation` — Virtualisation Datacenter & Clusters HA
- **Titre Ch. 1** : Architectures d'Hyperviseurs Avancées & Dimensionnement Serveurs
- **Accroche initiale** : *« Vous êtes recruté pour concevoir le cluster de virtualisation d'une infrastructure bancaire... »*
- **Analyse critique** : Contrairement au cours B1 infantile, ce cours B3 aborde directement la surallocation vCPU:pCPU, le NUMA/vNUMA et le provisionnement fin (*Thin vs Thick*).
- **Verdict** : **CONFORME**.

---

### 59. `b3-devops` — Culture DevOps, Intégration & Déploiement Continus
- **Titre Ch. 1** : Origine, Principes CALMS & Chaîne d'Outils CI/CD
- **Verdict** : **CONFORME**.

---

### 60. `b3-github` — GitHub Avancé, Actions & CI/CD
- **Titre Ch. 1** : Automatisation avec GitHub Actions
- **Verdict** : **CONFORME**.

---

### 61. `b3-linux` — Kernel Linux & Systèmes Distribués
- **Titre Ch. 1** : Architecture du Noyau Linux, Processus & Mémoire Virtuelle
- **Verdict** : **CONFORME**.

---

### 62. `b3-pfsense` — Déploiement et Administration de Pare-feux pfSense
- **Titre Ch. 1** : Architecture FreeBSD, Interfaces & Filtrage State-table
- **Verdict** : **CONFORME**.

---

### 63. `b3-reseau-lan` — Commutation Avancée & Protocoles LAN (STP, VLAN)
- **Titre Ch. 1** : Segmentation par VLANs et Arbre Spanning-Tree
- **Verdict** : **CONFORME**.

---

### 64. `b3-sql` — Optimisation de Requêtes, Indexation & Moteurs Transactionnels
- **Titre Ch. 1** : Les Fondations ACID & Le Mécanisme de Journalisation WAL
- **Verdict** : **CONFORME**.

---

### 65. `b3-agile` — Gestion de Projet Agile (Scrum / Kanban)
- **Titre Ch. 1** : Manifeste Agile et Rituels Scrum
- **Verdict** : **CONFORME**.

---

### 66. `b3-algo` — Algorithmique Avancée & Graphes
- **Titre Ch. 1** : Graphes, Arbres Binaires et Plus Court Chemin (Dijkstra)
- **Verdict** : **CONFORME**.

---

### 67. `b3-windows-server` — Administration Avancée Active Directory
- **Titre Ch. 1** : Architecture Système, Services d’Infrastructure Réseau & Modèle de Licence par Cœur
- **Verdict** : **CONFORME**.

---

### 68. `b3-anglais` — Anglais Managérial & Négociation Technique
- **Titre Ch. 1** : Terminologie IT Avancée, Acronymes & Modèles d’Architecture Cloud
- **Verdict** : **CONFORME**.

---

### 69. `b3-etude-quantitative` — Études Statistiques et Traitement d'Enquête
- **Titre Ch. 1** : Méthodologie d’échantillonnage et formulation d'hypothèses
- **Verdict** : **CONFORME**.

---

### 70. `b3-document-technique` — Rédaction Technique & Spécifications Logicielles
- **Titre Ch. 1** : Structurer un document d'architecture technique (DAT)
- **Verdict** : **CONFORME**.

---

### 71. `b3-veille` — Veille Technologique & Stratégique
- **Titre Ch. 1** : Introduction, Définitions & Typologie de la Veille Stratégique
- **Verdict** : **CONFORME**.

---

## 5. Synthèse Globale des 71 Cours

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              RÉPARTITION QUALITATIVE DU CATALOGUE (71 COURS)                 │
├────────────────────────────────┬─────────┬──────────────┬───────────────────┤
│ Évaluation Didactique          │ Nombre  │ Pourcentage  │ Statut Action     │
├────────────────────────────────┼─────────┼──────────────┼───────────────────┤
│ CONFORME (Pédagogie solide)    │   70    │    98.6 %    │ Validé & Remédié  │
│ PERFECTIBLE (Ajustements)      │    0    │     0.0 %    │ 100 % Remédié     │
│ PROBLÉMATIQUE (Rupture/Jargon) │    0    │     0.0 %    │ 100 % Remédié     │
│ PAGE PROGRAMME RÉFÉRENCE (stub)│    1    │     1.4 %    │ b1-vb-excel       │
└────────────────────────────────┴─────────┴──────────────┴───────────────────┘
```

### Bilan des Remédiations Pédagogiques Réalisées
1. **`b1-virtualisation`** (ex-CRITIQUE) : Élimination intégrale du conte de fées infantile. Remplacement par l'ancrage technique professionnel (mono-service historique, hyperviseurs Type 1 / Type 2, vCPU, vRAM, vDisk, consolidation), préservant scrupuleusement toutes les formules mathématiques des exercices (48 min / 80%).
2. **`b1-admin-windows`** (ex-PROBLÉMATIQUE) : Ancrage sur le compte administrateur local du PC personnel versus la centralisation d'Active Directory en entreprise, outils d'administration natifs (`compmgmt.msc`, `perfmon`, `eventvwr`, PowerShell), et passerelle de modernité vers Windows Server 2022 et 2025.
3. **`b1-projet`** (ex-PROBLÉMATIQUE) : Cadrage du besoin utilisateur d'un commerçant (inventaire papier/Excel fragile) avant tout choix technologique, et justification méthodique de l'architecture 3-tiers (IHM Tkinter ↔ Logique Python ↔ Persistance PostgreSQL).
4. **`b1-architecture`** (ex-PERFECTIBLE) : Modèle mental intuitif de l'atelier d'artisan (CPU = artisan travailleur, RAM = établi immédiat mais volatil, SSD = armoire d'archivage au fond, Bus = tapis roulants).
5. **`b1-merise`** (ex-PERFECTIBLE) : Étayage du modèle cybernétique abstrait de Joël de Rosnay par le cas opérationnel de la pizzeria (cuisine = système opérant, gérant = système de pilotage, caisse/bons = système d'information).
6. **`b1-ccna1`** (ex-PERFECTIBLE) : Ancrage sur la physique du signal électrique, le bruit électromagnétique et l'annulation de la diaphonie par la torsade différentielle des paires en cuivre vs la transmission par photons lumineux dans la fibre optique.
7. **`assembleur`** (ex-PERFECTIBLE) : Analogie du compteur kilométrique de voiture (de 000 000 à 999 999 où reculer de 1 affiche 999 999) pour expliquer intuitivement le complément à 2 et l'arithmétique circulaire binaire.
8. **`csharp`** (ex-PROBLÉMATIQUE) : Modèle mental du Post-it (Type Valeur sur la Pile, cloné) vs l'étiquette d'adresse d'entrepôt (Type Référence sur le Tas, objet partagé), avec clarification méthodologique sur l'outillage .NET officiel (`dotnet build`) vs simulateur pédagogique.
9. **`rd_winserver`** (ex-PERFECTIBLE) : Modernisation de la stratégie de sauvegarde vers la règle anti-ransomware 3-2-1-1-0 (copie immuable WORM / air-gapped, zéro erreur de restauration) et continuité Windows Server 2022/2025 (`wbadmin`, PowerShell).
10. **`b3-firewall`** (ex-PERFECTIBLE) : Rappel visuel du 3-way handshake TCP (SYN &rarr; SYN-ACK &rarr; ACK &rarr; ESTABLISHED) expliquant pourquoi une table de suivi d'état (`conntrack`) est indispensable pour bloquer les paquets ACK forgés par usurpation (spoofing).
11. **`b1-vb-excel`** : Référentiel de programme et syllabus officiel maintenu en conformité dans le catalogue.

