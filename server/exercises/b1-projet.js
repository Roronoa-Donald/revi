'use strict';

module.exports = [
  {
    "id": "pr-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le cahier des charges de la librairie Sésame",
    "exampleTitle": "Exemple résolu — le cadrage de la boulangerie du quartier",
    "goal": "Cadrer le besoin d'un client : lire un cahier des charges simplifié, délimiter le périmètre et retenir les critères de succès.",
    "brief": "<p><strong>Énoncé.</strong> Mme Adjovi tient la <strong>librairie-papeterie Sésame</strong>, rue du Commerce à Lomé. Elle note encore tout dans un cahier : les ruptures de stylos sont fréquentes, les erreurs de saisie aussi. Elle confie le problème à une petite équipe : <strong>Inès</strong>, cheffe de projet, et <strong>Kofi</strong>, développeur. Première étape du projet : le cadrage. Inès rencontre Mme Adjovi, observe le comptoir et rédige le cahier des charges simplifié :</p><table><tr><th>Fonction demandée</th><th>Dans le périmètre ?</th></tr><tr><td>Enregistrer les produits (nom, catégorie, quantité, prix)</td><td>Oui</td></tr><tr><td>Suivre les entrées et les sorties de stock</td><td>Oui</td></tr><tr><td>Signaler les produits qui passent sous un seuil d'alerte</td><td>Oui</td></tr><tr><td>Gérer la paie des employés de la librairie</td><td>Non</td></tr><tr><td>Vendre les livres sur Internet</td><td>Non</td></tr></table><p>Utilisatrices prévues : Mme Adjovi et sa vendeuse, deux personnes qui ne sont pas expertes en informatique. Inès et Mme Adjovi conviennent aussi de trois critères de succès : saisir un produit en moins d'une minute ; signaler toute rupture avant l'ouverture du magasin ; conserver les données même après une coupure de courant.</p><ol><li>Combien de fonctions du tableau sont dans le périmètre du projet ?</li><li>Combien de personnes utiliseront l'application au quotidien ?</li><li>La gestion de la paie fait-elle partie du projet ? Répondez par oui ou non.</li><li>Quel outil Mme Adjovi utilise-t-elle aujourd'hui pour suivre son stock ? Répondez en un seul mot.</li><li>Combien de critères de succès Inès et Mme Adjovi ont-elles convenus ?</li><li>Quel critère de succès répond à une coupure de courant : la rapidité, la persistance des données ou les alertes ?</li></ol>",
    "starter": "# Exercice — Le cahier des charges de la librairie Sésame\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Fonctions dans le périmètre]\nA_COMPLETER\n\n[Question 2 — Utilisatrices au quotidien]\nA_COMPLETER\n\n[Question 3 — La paie dans le projet]\nA_COMPLETER\n\n[Question 4 — Outil actuel de suivi du stock]\nA_COMPLETER\n\n[Question 5 — Nombre de critères de succès]\nA_COMPLETER\n\n[Question 6 — Critère qui répond à une coupure de courant]\nA_COMPLETER\n",
    "hints": [
      "Le périmètre d'un projet est la liste des fonctions que l'équipe s'engage à livrer : repérez les lignes marquées Oui.",
      "Les utilisateurs sont ceux qui manipuleront l'application chaque jour ; les critères de succès sont les promesses mesurables du cadrage.",
      "Pour la question 4, relisez la première phrase de l'énoncé ; pour la question 6, demandez-vous ce qui protège les données quand le courant s'arrête."
    ],
    "examples": [
      {
        "stdin": "M. Diallo tient la boulangerie « Le Fournil ». Il gère ses ventes de mémoire.\nCahier des charges : encaisser les ventes (oui), suivre les invendus (oui),\nlivrer à domicile (non). Utilisateurs : M. Diallo et son apprenti.\nCritères de succès : encaisser une vente en moins de trente secondes ;\nsavoir chaque soir combien de baguettes restent.\n\n1) Fonctions dans le périmètre : 2 (encaisser, suivre les invendus).\n2) Utilisateurs au quotidien : 2 (M. Diallo et son apprenti).\n3) La livraison à domicile est hors périmètre : non.\n4) Outil actuel : la mémoire de M. Diallo — il ne note rien.",
        "expected": "périmètre : 2 fonctions — utilisateurs : 2 — livraison : non — outil actuel : rien, tout de mémoire",
        "note": "Cadrer, c'est trancher : ce qui n'est pas dans la liste des fonctions livrées est explicitement hors projet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Fonctions dans le périmètre",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Utilisatrices au quotidien",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — La paie dans le projet",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Outil actuel de suivi du stock",
        "stdin": "q:4",
        "expected": "cahier||le cahier||un cahier||cahier papier"
      },
      {
        "label": "Question 5 — Nombre de critères de succès",
        "stdin": "q:5",
        "expected": "3"
      },
      {
        "label": "Question 6 — Critère qui répond à une coupure de courant",
        "stdin": "q:6",
        "expected": "persistance||la persistance||persistance des donnees||la persistance des donnees"
      }
    ],
    "solution": "[Question 1 — Fonctions dans le périmètre]\n3\n\n[Question 2 — Utilisatrices au quotidien]\n2\n\n[Question 3 — La paie dans le projet]\nnon\n\n[Question 4 — Outil actuel de suivi du stock]\ncahier\n\n[Question 5 — Nombre de critères de succès]\n3\n\n[Question 6 — Critère qui répond à une coupure de courant]\npersistance",
    "takeaway": "1) Trois fonctions sont dans le périmètre : enregistrer les produits, suivre les entrées et sorties, signaler les produits sous le seuil. La paie et la vente en ligne sont refusées : le périmètre reste réaliste pour une petite équipe.\n2) Deux utilisatrices : Mme Adjovi et sa vendeuse — Inès et Kofi construisent l'application, elles ne font que l'utiliser.\n3) Non : la paie est hors périmètre.\n4) Aujourd'hui, tout est noté dans un cahier : c'est la fragilité que le projet vient corriger.\n5) Trois critères de succès : la saisie en moins d'une minute, la rupture signalée avant l'ouverture, la conservation des données.\n6) La persistance des données : c'est la base PostgreSQL qui garantit que les données survivent à une coupure de courant.\nContrôle : 3 fonctions retenues + 2 refusées = 5 lignes du cahier des charges."
  },
  {
    "id": "pr-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les postes prêts pour le développement",
    "exampleTitle": "Exemple résolu — les machines du fablab",
    "goal": "Vérifier les prérequis d'un poste de développement (Python 3.7+, Tkinter, PostgreSQL) machine par machine.",
    "brief": "<p><strong>Énoncé.</strong> Avant d'écrire la moindre ligne de code, Kofi vérifie les machines qui feront tourner le projet. Les prérequis du tutoriel sont stricts : <strong>Python 3.7 ou supérieur</strong>, <strong>Tkinter installé</strong>, <strong>PostgreSQL installé</strong> — les trois conditions ensemble. Voici l'état des postes :</p><table><tr><th>Poste</th><th>Python</th><th>Tkinter</th><th>PostgreSQL</th></tr><tr><td>Comptoir de la librairie</td><td>3.8</td><td>oui</td><td>oui</td></tr><tr><td>Arrière-boutique</td><td>3.6</td><td>oui</td><td>oui</td></tr><tr><td>Portable d'Inès</td><td>3.10</td><td>oui</td><td>non</td></tr><tr><td>Portable de Kofi</td><td>3.7</td><td>oui</td><td>oui</td></tr><tr><td>Vieil ordinateur du stock</td><td>2.7</td><td>non</td><td>non</td></tr></table><ol><li>Combien de postes satisfont les trois prérequis à la fois ?</li><li>Quelle est la version minimale de Python exigée par le tutoriel ? (format 3.7)</li><li>Le poste de l'arrière-boutique peut-il lancer le projet ? Répondez par oui ou non.</li><li>Le portable d'Inès peut-il lancer le projet ? Répondez par oui ou non.</li><li>Quel nom porte la base de données que l'équipe doit créer ? (un seul mot, avec un tiret bas)</li></ol>",
    "starter": "# Exercice — Les postes prêts pour le développement\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Postes satisfaisant les trois prérequis]\nA_COMPLETER\n\n[Question 2 — Version minimale de Python]\nA_COMPLETER\n\n[Question 3 — L'arrière-boutique peut-il lancer le projet]\nA_COMPLETER\n\n[Question 4 — Le portable d'Inès peut-il lancer le projet]\nA_COMPLETER\n\n[Question 5 — Nom de la base de données]\nA_COMPLETER\n",
    "hints": [
      "Un poste est prêt seulement si les trois prérequis sont vrais en même temps : la version de Python, Tkinter, PostgreSQL.",
      "Comparez chaque version de Python à l'exigence minimale de l'énoncé : en dessous, le poste refuse ; la branche 2.7 est hors sujet.",
      "Pour la dernière question, le nom de la base du tutoriel s'écrit en un seul « mot », avec un tiret bas, sans espace."
    ],
    "examples": [
      {
        "stdin": "Un fablab prépare un projet qui exige Python 3.8 ou plus, Flask et MySQL.\n- poste A : Python 3.9, Flask oui, MySQL oui\n- poste B : Python 3.8, Flask non, MySQL oui\n- poste C : Python 3.12, Flask oui, MySQL oui\n\n1) Postes prêts : A et C, soit 2 postes sur 3.\n2) Le poste B refuse : il manque Flask.\n3) Version minimale exigée : 3.8 — un prérequis manquant disqualifie le poste.",
        "expected": "2 postes prêts — B refusé : Flask manquant — version minimale 3.8",
        "note": "Un prérequis manquant suffit à disqualifier un poste : les conditions se cumulent en ET."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Postes satisfaisant les trois prérequis",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Version minimale de Python",
        "stdin": "q:2",
        "expected": "3.7"
      },
      {
        "label": "Question 3 — L'arrière-boutique peut-il lancer le projet",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Le portable d'Inès peut-il lancer le projet",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Nom de la base de données",
        "stdin": "q:5",
        "expected": "gestion_stock||gestion stock||la base gestion_stock||base gestion_stock"
      }
    ],
    "solution": "[Question 1 — Postes satisfaisant les trois prérequis]\n2\n\n[Question 2 — Version minimale de Python]\n3.7\n\n[Question 3 — L'arrière-boutique peut-il lancer le projet]\nnon\n\n[Question 4 — Le portable d'Inès peut-il lancer le projet]\nnon\n\n[Question 5 — Nom de la base de données]\ngestion_stock",
    "takeaway": "1) Deux postes : le comptoir (Python 3.8, Tkinter oui, PostgreSQL oui) et le portable de Kofi (3.7, oui, oui).\n2) Python 3.7 : la version minimale du tutoriel — 3.6 refuse de lancer, 3.8 et 3.10 passent.\n3) Non : l'arrière-boutique tourne sous Python 3.6, trop ancien pour le projet.\n4) Non : le portable d'Inès n'a pas PostgreSQL installé.\n5) La base s'appelle gestion_stock : à créer avant le premier lancement de l'application.\nContrôle : 2 postes prêts + 3 à équiper = 5 postes inspectés."
  },
  {
    "id": "pr-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Quatre fichiers, quatre rôles",
    "exampleTitle": "Exemple résolu — la structure de l'appli de l'épicerie",
    "goal": "Associer chaque fichier du projet (main.py, database.py, requirements.txt, README.md) à son rôle et nommer les couches de l'architecture.",
    "brief": "<p><strong>Énoncé.</strong> Inès fixe la structure du projet avant la première ligne de code. L'application s'articule en trois couches : l'<strong>interface graphique</strong> (Tkinter), la <strong>logique métier</strong> (Python) et la <strong>base de données</strong> (PostgreSQL). Quatre fichiers, quatre rôles :</p><table><tr><th>Fichier</th><th>Rôle</th></tr><tr><td>main.py</td><td>l'interface principale : fenêtre, formulaire, tableau des produits</td></tr><tr><td>database.py</td><td>la classe Database : toute la gestion PostgreSQL, tout le SQL</td></tr><tr><td>requirements.txt</td><td>la liste des dépendances à installer (psycopg2-binary)</td></tr><tr><td>README.md</td><td>la documentation du projet</td></tr></table><p>Le projet doit notamment permettre les quatre opérations <strong>CRUD</strong> sur les produits, et la séparation des fichiers doit permettre de changer d'écran sans toucher au SQL.</p><ol><li>Dans quel fichier vit la classe Database ?</li><li>Quel fichier liste les dépendances à installer avec pip ?</li><li>Quelle couche de l'architecture affiche les fenêtres et reçoit les clics ? (un seul mot)</li><li>Que signifie la lettre C de CRUD ? (un mot anglais)</li><li>Quel SGBD relationnel assure la persistance des données ?</li><li>Peut-on changer l'interface sans modifier le fichier du SQL ? Répondez par oui ou non.</li></ol>",
    "starter": "# Exercice — Quatre fichiers, quatre rôles\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Fichier de la classe Database]\nA_COMPLETER\n\n[Question 2 — Fichier des dépendances]\nA_COMPLETER\n\n[Question 3 — Couche qui affiche les fenêtres]\nA_COMPLETER\n\n[Question 4 — La lettre C de CRUD]\nA_COMPLETER\n\n[Question 5 — SGBD du projet]\nA_COMPLETER\n\n[Question 6 — Changer l'écran sans toucher au SQL]\nA_COMPLETER\n",
    "hints": [
      "Chaque fichier a un seul métier : l'écran, le SQL, les dépendances, la documentation — dans cet ordre du tableau.",
      "Les trois couches se lisent de l'utilisateur vers la machine : ce qu'on voit, ce qui décide, ce qui conserve.",
      "CRUD est l'acronyme de quatre opérations ; chaque lettre ouvre un verbe anglais qui correspond à une requête SQL précise."
    ],
    "examples": [
      {
        "stdin": "Une épicerie commande une petite application. Structure retenue :\n- ecran.py : la fenêtre de saisie des articles\n- bdd.py : la classe qui parle à SQLite\n- besoins.txt : la liste des paquets à installer\n- notice.md : le mode d'emploi\n\n1) La classe de la base vit dans bdd.py.\n2) Les dépendances sont dans besoins.txt.\n3) La couche qui affiche : l'interface.\n4) Le SGBD : SQLite.",
        "expected": "bdd.py — besoins.txt — interface — SQLite",
        "note": "Peu importent les noms de fichiers : ce qui compte, c'est qu'un seul fichier porte chaque responsabilité."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Fichier de la classe Database",
        "stdin": "q:1",
        "expected": "database.py||database"
      },
      {
        "label": "Question 2 — Fichier des dépendances",
        "stdin": "q:2",
        "expected": "requirements.txt||requirements||le fichier requirements.txt"
      },
      {
        "label": "Question 3 — Couche qui affiche les fenêtres",
        "stdin": "q:3",
        "expected": "interface||l'interface||la couche interface||ihm"
      },
      {
        "label": "Question 4 — La lettre C de CRUD",
        "stdin": "q:4",
        "expected": "create||creer"
      },
      {
        "label": "Question 5 — SGBD du projet",
        "stdin": "q:5",
        "expected": "postgresql||postgres"
      },
      {
        "label": "Question 6 — Changer l'écran sans toucher au SQL",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Fichier de la classe Database]\ndatabase.py\n\n[Question 2 — Fichier des dépendances]\nrequirements.txt\n\n[Question 3 — Couche qui affiche les fenêtres]\ninterface\n\n[Question 4 — La lettre C de CRUD]\ncreate\n\n[Question 5 — SGBD du projet]\npostgresql\n\n[Question 6 — Changer l'écran sans toucher au SQL]\noui",
    "takeaway": "1) La classe Database vit dans database.py, qui encapsule toute la gestion PostgreSQL.\n2) requirements.txt : il contient psycopg2-binary==2.9.9, installé par pip install -r requirements.txt.\n3) L'interface : la couche Tkinter, celle que l'utilisateur voit et manipule.\n4) C de CRUD = Create : ajouter un produit, traduit en SQL par INSERT.\n5) PostgreSQL : la persistance est déléguée au SGBD — les données survivent à l'extinction de la machine.\n6) Oui : la séparation main.py / database.py permet de changer d'écran sans toucher au SQL — c'est l'intérêt de l'architecture en couches.\nContrôle : quatre fichiers, quatre rôles distincts — aucun ne fait le travail d'un autre."
  },
  {
    "id": "pr-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La table produits de la librairie",
    "exampleTitle": "Exemple résolu — la table articles de la quincaillerie",
    "goal": "Décrire la table produits : nommer ses colonnes, leurs types, sa clé primaire, et dire si elle porte une clé étrangère.",
    "brief": "<p><strong>Énoncé.</strong> Deuxième étape : la base de données. Kofi crée la base <code>gestion_stock</code>, puis la table <strong>produits</strong>, la seule table du projet. Sa structure compte cinq colonnes :</p><table><tr><th>Colonne</th><th>Type</th><th>Rôle</th></tr><tr><td>id</td><td>SERIAL PRIMARY KEY</td><td>identifiant unique, auto-incrémenté</td></tr><tr><td>nom</td><td>VARCHAR(100) NOT NULL</td><td>nom du produit</td></tr><tr><td>categorie</td><td>VARCHAR(50)</td><td>rayon du produit</td></tr><tr><td>quantite</td><td>INTEGER NOT NULL</td><td>nombre d'unités en stock</td></tr><tr><td>prix</td><td>DECIMAL(10,2) NOT NULL</td><td>prix unitaire, deux décimales exactes</td></tr></table><p>Pour vérifier la table, Kofi y insère les quatre premiers produits de la librairie :</p><table><tr><th>id</th><th>nom</th><th>categorie</th><th>quantite</th><th>prix (FCFA)</th></tr><tr><td>1</td><td>Cahier 200 pages</td><td>Papeterie</td><td>40</td><td>500,00</td></tr><tr><td>2</td><td>Roman policier</td><td>Livres</td><td>12</td><td>4500,00</td></tr><tr><td>3</td><td>Stylo bleu</td><td>Papeterie</td><td>150</td><td>350,00</td></tr><tr><td>4</td><td>Calculatrice</td><td>Fournitures</td><td>8</td><td>8500,00</td></tr></table><ol><li>Combien de colonnes compte la table produits ?</li><li>Quel type auto-incrémenté porte la colonne id ? (un seul mot)</li><li>Quel type stocke le prix avec exactement deux décimales ? (un seul mot)</li><li>Quelle colonne sert de clé primaire ?</li><li>La table produits contient-elle une clé étrangère ? Répondez par oui ou non.</li><li>Combien de produits l'extrait contient-il ?</li></ol>",
    "starter": "# Exercice — La table produits de la librairie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de colonnes]\nA_COMPLETER\n\n[Question 2 — Type auto-incrémenté de id]\nA_COMPLETER\n\n[Question 3 — Type du prix]\nA_COMPLETER\n\n[Question 4 — Clé primaire de la table]\nA_COMPLETER\n\n[Question 5 — La table contient-elle une clé étrangère]\nA_COMPLETER\n\n[Question 6 — Nombre de produits de l'extrait]\nA_COMPLETER\n",
    "hints": [
      "La structure d'une table se lit colonne par colonne : le premier tableau donne le type exact de chaque colonne.",
      "Deux types numériques se distinguent : celui qui compte les unités en stock, et celui qui garde l'argent exact à deux décimales.",
      "La clé primaire est la colonne qui identifie chaque ligne de façon unique ; une clé étrangère relie deux tables — comptez les tables de cette base."
    ],
    "examples": [
      {
        "stdin": "Une quincaillerie crée sa table articles :\nid SERIAL PRIMARY KEY — designation VARCHAR(80) — rayon VARCHAR(40) —\nstock INTEGER — tarif DECIMAL(10,2).\n\n1) La table compte 5 colonnes.\n2) id est un SERIAL, auto-incrémenté par PostgreSQL.\n3) Le tarif est un DECIMAL : deux décimales exactes pour l'argent.\n4) La clé primaire est id.\n5) Le stock est un INTEGER : des unités entières.",
        "expected": "5 colonnes — id SERIAL — tarif DECIMAL — clé primaire id — stock INTEGER",
        "note": "SERIAL compte tout seul, DECIMAL garde l'argent exact, INTEGER compte les unités : trois types, trois usages."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de colonnes",
        "stdin": "q:1",
        "expected": "5"
      },
      {
        "label": "Question 2 — Type auto-incrémenté de id",
        "stdin": "q:2",
        "expected": "serial||serial primary key"
      },
      {
        "label": "Question 3 — Type du prix",
        "stdin": "q:3",
        "expected": "decimal||decimal(10,2)||decimal 10,2||decimale"
      },
      {
        "label": "Question 4 — Clé primaire de la table",
        "stdin": "q:4",
        "expected": "id||la colonne id||l'id"
      },
      {
        "label": "Question 5 — La table contient-elle une clé étrangère",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Nombre de produits de l'extrait",
        "stdin": "q:6",
        "expected": "4"
      }
    ],
    "solution": "[Question 1 — Nombre de colonnes]\n5\n\n[Question 2 — Type auto-incrémenté de id]\nserial\n\n[Question 3 — Type du prix]\ndecimal\n\n[Question 4 — Clé primaire de la table]\nid\n\n[Question 5 — La table contient-elle une clé étrangère]\nnon\n\n[Question 6 — Nombre de produits de l'extrait]\n4",
    "takeaway": "1) Cinq colonnes : id, nom, categorie, quantite, prix.\n2) id est de type SERIAL : PostgreSQL l'incrémente tout seul à chaque insertion — SERIAL PRIMARY KEY garantit en plus l'unicité.\n3) prix est de type DECIMAL(10,2) : deux décimales exactes, indispensable pour l'argent (un FLOAT arrondirait).\n4) La clé primaire est id : chaque ligne est identifiée de façon unique.\n5) Non : la base ne compte qu'une table, produits ; une clé étrangère relie deux tables entre elles — il n'y en a donc aucune.\n6) L'extrait contient 4 produits, id 1 à 4.\nContrôle : les id 1, 2, 3, 4 se suivent sans trou : le SERIAL fait son travail."
  },
  {
    "id": "pr-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Connexion, commit et bonne fermeture",
    "exampleTitle": "Exemple résolu — la base de la pizzeria",
    "goal": "Appliquer les règles de la classe Database : commit après écriture, fetchall après lecture, try/except et ordre de fermeture.",
    "brief": "<p><strong>Énoncé.</strong> La classe <code>Database</code> de Kofi suit des règles strictes, répétées dans chaque méthode : la connexion passe par <code>psycopg2.connect()</code> puis un <code>cursor</code> ; chaque requête vit dans un bloc <code>try / except</code> ; en cas d'erreur, la méthode affiche le problème et renvoie False — l'application ne plante jamais. Kofi résume les règles dans son carnet :</p><table><tr><th>Situation</th><th>Règle à appliquer</th></tr><tr><td>Après un INSERT, un UPDATE ou un DELETE</td><td>appeler la méthode qui valide l'écriture</td></tr><tr><td>Après un SELECT</td><td>récupérer les lignes avec la méthode du cursor</td></tr><tr><td>Une requête échoue</td><td>l'exception est attrapée par le bloc ...</td></tr><tr><td>Fermeture de la base</td><td>fermer ... en premier, puis la connexion</td></tr></table><ol><li>Quelle méthode valide une écriture dans la base ? (un seul mot)</li><li>Quelle méthode récupère toutes les lignes d'un SELECT ? (un seul mot)</li><li>Que renvoie connecter() quand le serveur PostgreSQL est éteint : True ou False ?</li><li>Quel objet exécute les requêtes SQL et lit les résultats ? (un seul mot)</li><li>Quel mot-clé du try/except attrape l'erreur ? (un seul mot anglais)</li><li>À la fermeture, quel objet ferme-t-on en premier ? (un seul mot)</li></ol>",
    "starter": "# Exercice — Connexion, commit et bonne fermeture\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Méthode qui valide une écriture]\nA_COMPLETER\n\n[Question 2 — Méthode qui récupère les lignes d'un SELECT]\nA_COMPLETER\n\n[Question 3 — Retour de connecter en cas d'échec]\nA_COMPLETER\n\n[Question 4 — Objet qui exécute les requêtes]\nA_COMPLETER\n\n[Question 5 — Mot-clé qui attrape l'erreur]\nA_COMPLETER\n\n[Question 6 — Objet fermé en premier]\nA_COMPLETER\n",
    "hints": [
      "Deux familles de requêtes : les lectures rapportent des lignes, les écritures demandent une validation.",
      "Sans validation, PostgreSQL annule la modification à la déconnexion : la ligne n'est jamais vraiment écrite.",
      "À la fermeture, on démonte dans l'ordre inverse du montage : l'outil qui exécute les requêtes d'abord, la connexion ensuite."
    ],
    "examples": [
      {
        "stdin": "La pizzeria du coin tient sa table pizzas.\n- INSERT de la pizza « 4 fromages » : la méthode appelle commit(), sinon la ligne disparaît à la déconnexion.\n- SELECT des pizzas : le cursor rend les lignes avec fetchall().\n- Serveur éteint : psycopg2 lève une erreur, le except l'attrape, la méthode renvoie False.\n- Fermeture : cursor.close() puis connection.close().\n\n1) Validation d'une écriture : commit.\n2) Lecture des lignes : fetchall.\n3) Échec de connexion : la méthode renvoie False, sans planter.\n4) Ordre de fermeture : le cursor, puis la connexion.",
        "expected": "écriture → commit — lecture → fetchall — échec → False — fermeture : cursor puis connexion",
        "note": "Le pattern try/except transforme chaque panne en message : l'application rapporte, elle ne s'arrête pas."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Méthode qui valide une écriture",
        "stdin": "q:1",
        "expected": "commit||commit()||la methode commit||connection.commit()||self.connection.commit()"
      },
      {
        "label": "Question 2 — Méthode qui récupère les lignes d'un SELECT",
        "stdin": "q:2",
        "expected": "fetchall||fetchall()||cursor.fetchall()"
      },
      {
        "label": "Question 3 — Retour de connecter en cas d'échec",
        "stdin": "q:3",
        "expected": "false||faux"
      },
      {
        "label": "Question 4 — Objet qui exécute les requêtes",
        "stdin": "q:4",
        "expected": "cursor||curseur||le cursor"
      },
      {
        "label": "Question 5 — Mot-clé qui attrape l'erreur",
        "stdin": "q:5",
        "expected": "except||except error||le except"
      },
      {
        "label": "Question 6 — Objet fermé en premier",
        "stdin": "q:6",
        "expected": "cursor||curseur||le cursor"
      }
    ],
    "solution": "[Question 1 — Méthode qui valide une écriture]\ncommit\n\n[Question 2 — Méthode qui récupère les lignes d'un SELECT]\nfetchall\n\n[Question 3 — Retour de connecter en cas d'échec]\nfalse\n\n[Question 4 — Objet qui exécute les requêtes]\ncursor\n\n[Question 5 — Mot-clé qui attrape l'erreur]\nexcept\n\n[Question 6 — Objet fermé en premier]\ncursor",
    "takeaway": "1) commit() : sans lui, PostgreSQL annule l'écriture à la déconnexion — la ligne n'est jamais vraiment enregistrée.\n2) fetchall() : après un SELECT, le cursor rend toutes les lignes sous forme de liste.\n3) False : l'exception Error est attrapée, le problème est affiché, l'application continue sans planter.\n4) Le cursor : c'est lui qui exécute execute() et rend fetchall().\n5) except : le bloc except Error attrape l'exception et évite le plantage.\n6) Le cursor se ferme en premier, puis la connexion — l'ordre inverse de la création.\nContrôle : SELECT lit (fetchall), les trois écritures valident (commit) — jamais l'inverse."
  },
  {
    "id": "pr-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Les premières requêtes de la vendeuse",
    "exampleTitle": "Exemple résolu — les requêtes de la quincaillerie",
    "goal": "Lire des requêtes SQL simples (SELECT, INSERT, DELETE) et prévoir leur effet sur un petit tableau de données.",
    "brief": "<p><strong>Énoncé.</strong> Pour former la vendeuse, Kofi branche un petit outil SQL sur la base et lui fait lire le catalogue du matin :</p><table><tr><th>id</th><th>nom</th><th>categorie</th><th>quantite</th><th>prix (FCFA)</th></tr><tr><td>1</td><td>Cahier 200 pages</td><td>Papeterie</td><td>40</td><td>500</td></tr><tr><td>2</td><td>Roman policier</td><td>Livres</td><td>6</td><td>4500</td></tr><tr><td>3</td><td>Stylo rouge</td><td>Papeterie</td><td>0</td><td>350</td></tr><tr><td>4</td><td>Atlas scolaire</td><td>Livres</td><td>9</td><td>6500</td></tr><tr><td>5</td><td>Gomme</td><td>Papeterie</td><td>25</td><td>200</td></tr></table><p>Il lui enseigne quatre requêtes : <code>SELECT * FROM produits</code> (tout lire), <code>SELECT * FROM produits WHERE categorie = 'Papeterie'</code> (filtrer), <code>INSERT INTO produits ...</code> (ajouter une ligne), <code>DELETE FROM produits WHERE id = 3</code> (retirer une ligne). La vendeuse s'entraîne :</p><ol><li>Quelle clause SQL filtre les lignes d'une requête ? (un mot anglais)</li><li>Combien de lignes renvoie « SELECT * FROM produits » sur le catalogue du matin ?</li><li>Combien de lignes renvoie « SELECT * FROM produits WHERE categorie = 'Papeterie' » ?</li><li>Quelle requête ajoute une nouvelle ligne : SELECT, INSERT, UPDATE ou DELETE ?</li><li>Combien de lignes supprime « DELETE FROM produits WHERE id = 3 » ?</li><li>Quelle colonne sert à cibler une seule ligne dans un UPDATE ou un DELETE ?</li></ol>",
    "starter": "# Exercice — Les premières requêtes de la vendeuse\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Clause qui filtre les lignes]\nA_COMPLETER\n\n[Question 2 — Lignes de SELECT * FROM produits]\nA_COMPLETER\n\n[Question 3 — Lignes du filtre Papeterie]\nA_COMPLETER\n\n[Question 4 — Requête qui ajoute une ligne]\nA_COMPLETER\n\n[Question 5 — Lignes supprimées par DELETE WHERE id = 3]\nA_COMPLETER\n\n[Question 6 — Colonne qui cible une seule ligne]\nA_COMPLETER\n",
    "hints": [
      "Lisez le tableau ligne par ligne : chaque requête n'agit que sur les lignes qui vérifient sa condition.",
      "La clause de filtrage suit immédiatement le nom de la table dans la requête ; sans elle, toutes les lignes répondent.",
      "Pour cibler une seule ligne, on appelle la colonne qui ne se répète jamais dans la table."
    ],
    "examples": [
      {
        "stdin": "Catalogue d'une quincaillerie :\nid 1 Clous (Bois, 500 unités), id 2 Scie (Bois, 3 unités),\nid 3 Peinture blanche (Peinture, 12 unités), id 4 Pinceau (Peinture, 30 unités).\n\n1) SELECT * FROM articles : 4 lignes.\n2) SELECT * FROM articles WHERE rayon = 'Peinture' : 2 lignes (peinture, pinceau).\n3) DELETE FROM articles WHERE id = 2 : 1 ligne retirée (la scie).\n4) La clause de filtrage : WHERE.",
        "expected": "4 lignes — filtre Peinture : 2 lignes — DELETE id 2 : 1 ligne — clause WHERE",
        "note": "Compter les lignes qui vérifient la condition avant d'écrire la requête : le tableau ne ment jamais."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Clause qui filtre les lignes",
        "stdin": "q:1",
        "expected": "where||la clause where"
      },
      {
        "label": "Question 2 — Lignes de SELECT * FROM produits",
        "stdin": "q:2",
        "expected": "5"
      },
      {
        "label": "Question 3 — Lignes du filtre Papeterie",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Requête qui ajoute une ligne",
        "stdin": "q:4",
        "expected": "insert||insert into"
      },
      {
        "label": "Question 5 — Lignes supprimées par DELETE WHERE id = 3",
        "stdin": "q:5",
        "expected": "1"
      },
      {
        "label": "Question 6 — Colonne qui cible une seule ligne",
        "stdin": "q:6",
        "expected": "id||la colonne id||l'id"
      }
    ],
    "solution": "[Question 1 — Clause qui filtre les lignes]\nwhere\n\n[Question 2 — Lignes de SELECT * FROM produits]\n5\n\n[Question 3 — Lignes du filtre Papeterie]\n3\n\n[Question 4 — Requête qui ajoute une ligne]\ninsert\n\n[Question 5 — Lignes supprimées par DELETE WHERE id = 3]\n1\n\n[Question 6 — Colonne qui cible une seule ligne]\nid",
    "takeaway": "1) WHERE : la clause qui filtre les lignes selon une condition.\n2) Toutes les lignes répondent : 5.\n3) La Papeterie regroupe le cahier (id 1), le stylo rouge (id 3) et la gomme (id 5) : 3 lignes.\n4) INSERT : la requête Create du CRUD.\n5) Exactement la ligne du stylo rouge : 1 ligne.\n6) La colonne id : unique pour chaque ligne, elle cible précisément la ligne à modifier ou à supprimer.\nContrôle : 5 lignes au total = 3 en Papeterie + 2 en Livres (roman policier, atlas scolaire)."
  },
  {
    "id": "pr-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les widgets de l'écran principal",
    "exampleTitle": "Exemple résolu — l'écran de connexion de l'épicerie",
    "goal": "Nommer les widgets Tkinter d'une maquette d'écran : Label, Entry, Button, Listbox, Treeview.",
    "brief": "<p><strong>Énoncé.</strong> Troisième étape : l'interface. Kofi dessine sur papier l'écran principal de l'application, puis le décrit à Inès :</p><table><tr><th>Zone de l'écran</th><th>Élément affiché</th></tr><tr><td>Ligne 1</td><td>texte « Nom du produit », puis une zone pour taper le nom</td></tr><tr><td>Ligne 2</td><td>texte « Catégorie », puis une zone pour taper la catégorie</td></tr><tr><td>Ligne 3</td><td>texte « Quantité », puis une zone pour taper la quantité</td></tr><tr><td>Ligne 4</td><td>texte « Prix », puis une zone pour taper le prix</td></tr><tr><td>En bas du formulaire</td><td>un bouton « Ajouter » qui déclenche l'ajout au clic</td></tr><tr><td>Centre de la fenêtre</td><td>le tableau des produits en cinq colonnes (ID, Nom, Catégorie, Quantité, Prix)</td></tr></table><p>Rappel des widgets du cours : <strong>Label</strong> (texte fixe), <strong>Entry</strong> (saisie d'une ligne), <strong>Button</strong> (bouton d'action), <strong>Listbox</strong> (liste simple, une colonne), <strong>ttk.Treeview</strong> (tableau multi-colonnes).</p><ol><li>Quel widget crée la zone où la vendeuse tape le nom du produit ? (un mot anglais)</li><li>Quel widget affiche le texte fixe « Nom du produit » ? (un mot anglais)</li><li>Quel widget déclenche l'ajout quand on clique dessus ? (un mot anglais)</li><li>Quel widget ttk affiche le tableau des produits en cinq colonnes ? (un mot anglais)</li><li>Quel widget simple affiche une liste à une colonne, sans prix ni quantités ? (un mot anglais)</li><li>Quelle méthode lit le contenu tapé dans un Entry ? (un seul mot, sans parenthèses)</li></ol>",
    "starter": "# Exercice — Les widgets de l'écran principal\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Widget de la zone où taper le nom]\nA_COMPLETER\n\n[Question 2 — Widget du texte fixe]\nA_COMPLETER\n\n[Question 3 — Widget du bouton Ajouter]\nA_COMPLETER\n\n[Question 4 — Widget du tableau des produits]\nA_COMPLETER\n\n[Question 5 — Widget d'une liste simple]\nA_COMPLETER\n\n[Question 6 — Méthode qui lit un Entry]\nA_COMPLETER\n",
    "hints": [
      "Un widget, un métier : afficher un texte, saisir une ligne, déclencher une action, présenter une liste ou un tableau.",
      "Le tableau des produits dépasse une simple colonne : le widget prévu par le cours vient du module ttk.",
      "Le contenu tapé dans un champ de saisie ne se lit pas par magie : une méthode très courte du widget le rend."
    ],
    "examples": [
      {
        "stdin": "L'épicerie d'à côté ouvre son application par un écran de connexion :\ntexte « Identifiant » + une zone de saisie ;\ntexte « Mot de passe » + une zone de saisie ;\nun bouton « Se connecter » ;\nune liste des trois dernières caisses clôturées.\n\n1) Les zones de saisie : des Entry (2).\n2) Les textes : des Label.\n3) Le bouton : un Button.\n4) La liste des caisses : une Listbox.\n5) Le contenu d'un Entry se lit avec get().",
        "expected": "2 Entry — des Label — 1 Button — la liste : Listbox — lecture : get()",
        "note": "Identifier le rôle d'une zone de l'écran, c'est trouver son widget : saisir, afficher, déclencher, lister."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Widget de la zone où taper le nom",
        "stdin": "q:1",
        "expected": "entry||l'entry||un entry"
      },
      {
        "label": "Question 2 — Widget du texte fixe",
        "stdin": "q:2",
        "expected": "label||le label||un label"
      },
      {
        "label": "Question 3 — Widget du bouton Ajouter",
        "stdin": "q:3",
        "expected": "button||le button||un button||bouton"
      },
      {
        "label": "Question 4 — Widget du tableau des produits",
        "stdin": "q:4",
        "expected": "treeview||le treeview||ttk.treeview||ttk treeview"
      },
      {
        "label": "Question 5 — Widget d'une liste simple",
        "stdin": "q:5",
        "expected": "listbox||la listbox||une listbox"
      },
      {
        "label": "Question 6 — Méthode qui lit un Entry",
        "stdin": "q:6",
        "expected": "get||get()||la methode get"
      }
    ],
    "solution": "[Question 1 — Widget de la zone où taper le nom]\nentry\n\n[Question 2 — Widget du texte fixe]\nlabel\n\n[Question 3 — Widget du bouton Ajouter]\nbutton\n\n[Question 4 — Widget du tableau des produits]\ntreeview\n\n[Question 5 — Widget d'une liste simple]\nlistbox\n\n[Question 6 — Méthode qui lit un Entry]\nget",
    "takeaway": "1) Entry : le champ de saisie d'une ligne, pour le nom du produit.\n2) Label : le texte fixe qui annonce chaque champ.\n3) Button : le bouton « Ajouter », relié à l'action par command=.\n4) ttk.Treeview : le tableau multi-colonnes qui affiche les produits avec leurs en-têtes.\n5) Listbox : la liste simple, une colonne, sans quantités ni prix.\n6) get() : la méthode qui lit la valeur tapée dans un Entry.\nContrôle : 4 Label + 4 Entry + 1 Button + 1 Treeview composent l'écran principal de la maquette."
  },
  {
    "id": "pr-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La grille du formulaire",
    "exampleTitle": "Exemple résolu — la grille de l'écran de connexion",
    "goal": "Placer des widgets avec grid (row, column), relier une action avec command et nommer le callback.",
    "brief": "<p><strong>Énoncé.</strong> Pour aligner proprement le formulaire, Kofi choisit le gestionnaire <strong>grid</strong> : chaque widget occupe une cellule repérée par <code>row</code> (ligne) et <code>column</code> (colonne). Il interdit formellement de mélanger <strong>pack</strong> et <strong>grid</strong> dans un même conteneur. Maquette exacte du formulaire :</p><table><tr><th></th><th>Colonne 0</th><th>Colonne 1</th></tr><tr><th>Ligne 0</th><td>Label « Nom »</td><td>Entry nom</td></tr><tr><th>Ligne 1</th><td>Label « Catégorie »</td><td>Entry categorie</td></tr><tr><th>Ligne 2</th><td>Label « Quantité »</td><td>Entry quantite</td></tr><tr><th>Ligne 3</th><td>Label « Prix »</td><td>Entry prix</td></tr><tr><th>Ligne 4</th><td>(vide)</td><td>Button « Ajouter »</td></tr></table><p>Le bouton est câblé par <code>Button(..., command=ajouter_produit)</code> : on passe la référence de la fonction, sans parenthèses.</p><ol><li>Quel gestionnaire de placement organise les widgets en lignes et colonnes ? (un mot anglais)</li><li>Dans quelle colonne se trouvent les quatre Entry ? (un nombre)</li><li>Sur quelle ligne (row) se trouve le bouton « Ajouter » ? (un nombre)</li><li>Peut-on mélanger pack et grid dans un même conteneur ? Répondez par oui ou non.</li><li>Quel paramètre du Button désigne la fonction appelée au clic ? (un mot anglais)</li><li>Comment appelle-t-on la fonction exécutée en réponse à un événement comme un clic ? (un mot anglais)</li></ol>",
    "starter": "# Exercice — La grille du formulaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Gestionnaire en lignes et colonnes]\nA_COMPLETER\n\n[Question 2 — Colonne des Entry]\nA_COMPLETER\n\n[Question 3 — Ligne du bouton Ajouter]\nA_COMPLETER\n\n[Question 4 — Mélanger pack et grid]\nA_COMPLETER\n\n[Question 5 — Paramètre du bouton]\nA_COMPLETER\n\n[Question 6 — Fonction déclenchée par l'événement]\nA_COMPLETER\n",
    "hints": [
      "La grille se lit comme un tableau : les lignes et les colonnes commencent à zéro, et la maquette les numérote.",
      "Deux gestionnaires de placement existent : celui qui empile et celui qui aligne en cellules ; ils ne partagent pas un conteneur.",
      "Le paramètre du bouton reçoit la référence de la fonction, sans parenthèses ; la fonction déclenchée par l'événement porte un nom anglais précis."
    ],
    "examples": [
      {
        "stdin": "Écran de connexion d'une épicerie, en grille :\nligne 0 : Label « Identifiant » / Entry identifiant\nligne 1 : Label « Mot de passe » / Entry motdepasse\nligne 2 : (vide) / Button « Entrer »\n\n1) Gestionnaire : grid.\n2) Les Entry sont en colonne 1.\n3) Le bouton est en ligne 2.\n4) Le bouton appelle sa fonction via command= ; la fonction déclenchée est le callback.",
        "expected": "grid — Entry en colonne 1 — bouton en ligne 2 — command — callback",
        "note": "Row et column commencent à zéro : la première ligne de la maquette est la ligne 0."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Gestionnaire en lignes et colonnes",
        "stdin": "q:1",
        "expected": "grid||la grille||grille"
      },
      {
        "label": "Question 2 — Colonne des Entry",
        "stdin": "q:2",
        "expected": "1"
      },
      {
        "label": "Question 3 — Ligne du bouton Ajouter",
        "stdin": "q:3",
        "expected": "4"
      },
      {
        "label": "Question 4 — Mélanger pack et grid",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Paramètre du bouton",
        "stdin": "q:5",
        "expected": "command||command=||command ="
      },
      {
        "label": "Question 6 — Fonction déclenchée par l'événement",
        "stdin": "q:6",
        "expected": "callback||le callback||fonction callback||rappel"
      }
    ],
    "solution": "[Question 1 — Gestionnaire en lignes et colonnes]\ngrid\n\n[Question 2 — Colonne des Entry]\n1\n\n[Question 3 — Ligne du bouton Ajouter]\n4\n\n[Question 4 — Mélanger pack et grid]\nnon\n\n[Question 5 — Paramètre du bouton]\ncommand\n\n[Question 6 — Fonction déclenchée par l'événement]\ncallback",
    "takeaway": "1) grid : il place chaque widget dans une cellule (row, column) ; pack empile seulement.\n2) Colonne 1 : les labels occupent la colonne 0, les Entry la colonne 1.\n3) Ligne 4 : le bouton s'aligne sous les Entry, dans la colonne 1.\n4) Non : mélanger pack et grid dans un même conteneur fige la fenêtre.\n5) command : on écrit command=ajouter_produit, la référence sans parenthèses.\n6) Un callback : la fonction appelée automatiquement quand l'événement se produit.\nContrôle : la maquette compte 5 lignes (0 à 4) et 2 colonnes (0 et 1)."
  },
  {
    "id": "pr-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Protéger les saisies de la vendeuse",
    "exampleTitle": "Exemple résolu — les messages de l'appli de l'épicerie",
    "goal": "Choisir la bonne boîte de dialogue (showinfo, showwarning, showerror, askyesno) et prévoir l'exception d'une conversion ratée.",
    "brief": "<p><strong>Énoncé.</strong> Mme Adjovi tape vite et se trompe parfois. Avant tout appel à la base, l'application valide les champs : obligatoires non vides, puis conversion de la quantité en entier et du prix en nombre, dans un try. Kofi rédige les scénarios de tests et choisit la boîte de dialogue adaptée à chaque situation :</p><table><tr><th>N°</th><th>Situation testée</th><th>Boîte attendue</th></tr><tr><td>1</td><td>La vendeuse valide le formulaire sans avoir tapé le nom</td><td>?</td></tr><tr><td>2</td><td>Elle tape « douze » dans le champ quantité : la conversion échoue</td><td>?</td></tr><tr><td>3</td><td>Le produit est enregistré dans la base</td><td>?</td></tr><tr><td>4</td><td>Elle demande la suppression d'un produit sélectionné</td><td>?</td></tr><tr><td>5</td><td>La connexion à PostgreSQL échoue au démarrage</td><td>?</td></tr></table><p>Rappel : <strong>showinfo</strong> (information de succès), <strong>showwarning</strong> (attention, on peut corriger), <strong>showerror</strong> (échec), <strong>askyesno</strong> (question oui/non).</p><ol><li>Quelle boîte convient à la situation 1 ? (un mot anglais)</li><li>Quelle boîte convient à la situation 2 ? (un mot anglais)</li><li>Quelle boîte annonce le succès de la situation 3 ? (un mot anglais)</li><li>Quelle boîte pose la question oui/non de la situation 4 ? (un mot anglais)</li><li>Quelle exception Python lève la conversion du texte « douze » en entier ? (un mot anglais)</li><li>La validation des champs a-t-elle lieu avant ou après l'appel à la base ? (un mot)</li></ol>",
    "starter": "# Exercice — Protéger les saisies de la vendeuse\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Boîte de la situation 1]\nA_COMPLETER\n\n[Question 2 — Boîte de la situation 2]\nA_COMPLETER\n\n[Question 3 — Boîte de la situation 3]\nA_COMPLETER\n\n[Question 4 — Boîte de la situation 4]\nA_COMPLETER\n\n[Question 5 — Exception levée par une conversion ratée]\nA_COMPLETER\n\n[Question 6 — Validation avant ou après l'appel à la base]\nA_COMPLETER\n",
    "hints": [
      "Classez chaque situation : information, avertissement (on peut corriger), erreur (l'opération échoue), confirmation.",
      "La conversion d'un texte en nombre peut échouer : Python lève alors une exception dédiée aux valeurs inattendues.",
      "La règle du cours : la base ne doit jamais recevoir une donnée absurde — le garde-fou se place donc en amont de l'appel."
    ],
    "examples": [
      {
        "stdin": "L'application de l'épicerie affiche ses messages :\n1) prix laissé vide à l'enregistrement : showwarning (avertissement, on peut corriger) ;\n2) prix « abc » : la conversion échoue, ValueError, showerror ;\n3) article enregistré : showinfo ;\n4) suppression demandée : askyesno.\n\n1) Champ vide : showwarning.\n2) Conversion ratée : ValueError + showerror.\n3) Suppression : confirmation par askyesno.",
        "expected": "vide → showwarning — « abc » → ValueError + showerror — succès → showinfo — suppression → askyesno",
        "note": "Vide = avertissement corrigeable ; conversion impossible = erreur ; succès = information ; destruction = confirmation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Boîte de la situation 1",
        "stdin": "q:1",
        "expected": "showwarning||showwarning()||messagebox.showwarning"
      },
      {
        "label": "Question 2 — Boîte de la situation 2",
        "stdin": "q:2",
        "expected": "showerror||showerror()||messagebox.showerror"
      },
      {
        "label": "Question 3 — Boîte de la situation 3",
        "stdin": "q:3",
        "expected": "showinfo||showinfo()||messagebox.showinfo"
      },
      {
        "label": "Question 4 — Boîte de la situation 4",
        "stdin": "q:4",
        "expected": "askyesno||askyesno()||messagebox.askyesno"
      },
      {
        "label": "Question 5 — Exception levée par une conversion ratée",
        "stdin": "q:5",
        "expected": "valueerror||value error||l'exception valueerror"
      },
      {
        "label": "Question 6 — Validation avant ou après l'appel à la base",
        "stdin": "q:6",
        "expected": "avant||avant l'appel||avant l'appel a la base||avant la base"
      }
    ],
    "solution": "[Question 1 — Boîte de la situation 1]\nshowwarning\n\n[Question 2 — Boîte de la situation 2]\nshowerror\n\n[Question 3 — Boîte de la situation 3]\nshowinfo\n\n[Question 4 — Boîte de la situation 4]\naskyesno\n\n[Question 5 — Exception levée par une conversion ratée]\nvalueerror\n\n[Question 6 — Validation avant ou après l'appel à la base]\navant",
    "takeaway": "1) showwarning : un champ obligatoire manque, la vendeuse peut corriger — rien n'a échoué.\n2) showerror : la conversion de « douze » en entier a levé une exception, l'opération a échoué.\n3) showinfo : le succès se confirme — « Produit ajouté avec succès ».\n4) askyesno : la suppression ne passe jamais sans une confirmation oui/non.\n5) ValueError : la conversion d'un texte en nombre impossible lève cette exception.\n6) Avant : valider d'abord, appeler la base ensuite — elle ne reçoit que des données propres.\nContrôle : les situations 2 et 5 appellent toutes deux showerror — une erreur de saisie et un échec de connexion se rapportent de la même façon."
  },
  {
    "id": "pr-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "La première journée de saisies",
    "exampleTitle": "Exemple résolu — la rentrée des stocks de la boulangerie",
    "goal": "Dérouler le chemin d'un ajout (valider, appeler, rafraîchir) et repérer les saisies refusées par la validation.",
    "brief": "<p><strong>Énoncé.</strong> Quatrième étape : faire vivre le stock. Premier jour d'utilisation, la vendeuse saisit les produits au comptoir. Le chemin de l'ajout est toujours le même : <strong>valider</strong> les champs (obligatoires non vides, quantité convertible en entier, prix convertible en nombre), <strong>appeler</strong> la base, puis <strong>rafraîchir</strong> l'écran. Journal de la journée :</p><table><tr><th>N°</th><th>nom</th><th>categorie</th><th>quantite</th><th>prix (FCFA)</th><th>Résultat</th></tr><tr><td>1</td><td>Cahier 96 pages</td><td>Papeterie</td><td>30</td><td>400</td><td>acceptée</td></tr><tr><td>2</td><td>(champ vide)</td><td>Papeterie</td><td>20</td><td>300</td><td>refusée</td></tr><tr><td>3</td><td>Marque-page</td><td>(champ vide)</td><td>50</td><td>150</td><td>refusée</td></tr><tr><td>4</td><td>Agenda 2026</td><td>Papeterie</td><td>15</td><td>2500</td><td>acceptée</td></tr><tr><td>5</td><td>Stylo doré</td><td>Papeterie</td><td>douze</td><td>900</td><td>refusée</td></tr></table><ol><li>Combien de produits ont réellement été ajoutés à la base ?</li><li>La saisie 2 a été refusée : champ vide ou nombre invalide ?</li><li>La saisie 5 a été refusée : champ vide ou nombre invalide ?</li><li>Quelle requête SQL ajoute une ligne : INSERT, UPDATE ou DELETE ?</li><li>Après un ajout réussi, le formulaire est vidé et le tableau est ... ? (un mot)</li><li>Après un ajout réussi, une boîte de dialogue confirme-t-elle l'opération ? Répondez par oui ou non.</li></ol>",
    "starter": "# Exercice — La première journée de saisies\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Produits réellement ajoutés]\nA_COMPLETER\n\n[Question 2 — Motif du refus de la saisie 2]\nA_COMPLETER\n\n[Question 3 — Motif du refus de la saisie 5]\nA_COMPLETER\n\n[Question 4 — Requête SQL qui ajoute une ligne]\nA_COMPLETER\n\n[Question 5 — Le tableau après un ajout réussi]\nA_COMPLETER\n\n[Question 6 — Boîte de confirmation après un ajout]\nA_COMPLETER\n",
    "hints": [
      "La validation vérifie trois choses : aucun champ obligatoire vide, la quantité convertible en entier, le prix convertible en nombre.",
      "« douze » n'est pas un entier pour int() : c'est la conversion qui échoue, pas un champ vide.",
      "Le trio du cours se termine par deux gestes d'écran : vider le formulaire et recharger le tableau depuis la base."
    ],
    "examples": [
      {
        "stdin": "À la boulangerie, l'apprenti enregistre trois articles le matin :\n- Baguette spéciale, 20 unités, 125 FCFA : acceptée ;\n- (nom vide), 10 unités, 200 FCFA : refusée (champ vide) ;\n- Croissant, « six » unités, 175 FCFA : refusée (nombre invalide).\n\n1) Ajouts réels : 1 (la baguette spéciale).\n2) Refus pour champ vide : 1 (le deuxième).\n3) Refus pour nombre invalide : 1 (le troisième).",
        "expected": "1 ajout réel — 1 refus champ vide — 1 refus nombre invalide",
        "note": "Un ajout ne passe que si la validation entière réussit : un seul défaut suffit à refuser la saisie."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Produits réellement ajoutés",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Motif du refus de la saisie 2",
        "stdin": "q:2",
        "expected": "champ vide||vide||le champ vide||un champ vide||nom vide"
      },
      {
        "label": "Question 3 — Motif du refus de la saisie 5",
        "stdin": "q:3",
        "expected": "nombre invalide||invalide||pas un nombre||nombre non valide||non numerique||quantite invalide"
      },
      {
        "label": "Question 4 — Requête SQL qui ajoute une ligne",
        "stdin": "q:4",
        "expected": "insert||insert into"
      },
      {
        "label": "Question 5 — Le tableau après un ajout réussi",
        "stdin": "q:5",
        "expected": "actualise||actualise le tableau||recharge||rafraichi||mis a jour||actualiser"
      },
      {
        "label": "Question 6 — Boîte de confirmation après un ajout",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Produits réellement ajoutés]\n2\n\n[Question 2 — Motif du refus de la saisie 2]\nchamp vide\n\n[Question 3 — Motif du refus de la saisie 5]\nnombre invalide\n\n[Question 4 — Requête SQL qui ajoute une ligne]\ninsert\n\n[Question 5 — Le tableau après un ajout réussi]\nactualise\n\n[Question 6 — Boîte de confirmation après un ajout]\noui",
    "takeaway": "1) Deux produits : le cahier 96 pages et l'agenda 2026.\n2) Champ vide : le nom manque — showwarning et retour au formulaire.\n3) Nombre invalide : « douze » ne se convertit pas en entier — ValueError et showerror.\n4) INSERT : la requête Create du CRUD.\n5) Actualisé : effacer_champs() vide le formulaire et actualiser_tableau() recharge les lignes depuis la base.\n6) Oui : showinfo affiche « Produit ajouté avec succès ».\nContrôle : 2 saisies acceptées + 3 refusées = 5 lignes du journal."
  },
  {
    "id": "pr-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Entrées et sorties du stylo bleu",
    "exampleTitle": "Exemple résolu — les mouvements des cahiers",
    "goal": "Calculer un stock après une suite d'entrées et de sorties et appliquer la règle du refus des sorties excessives.",
    "brief": "<p><strong>Énoncé.</strong> Les mouvements transforment la table en vraie gestion. Règle métier : <strong>stock restant = stock initial − sorties + entrées</strong>, et une sortie supérieure au stock disponible est <strong>refusée</strong> — le stock ne devient jamais négatif. Ce matin, le stock du <strong>stylo bleu</strong> est de <strong>150</strong> unités. Journal des mouvements du jour :</p><table><tr><th>N°</th><th>Mouvement</th><th>Sens</th><th>Quantité</th></tr><tr><td>1</td><td>Vente du matin</td><td>sortie</td><td>40</td></tr><tr><td>2</td><td>Livraison fournisseur</td><td>entrée</td><td>60</td></tr><tr><td>3</td><td>Vente de l'après-midi</td><td>sortie</td><td>120</td></tr><tr><td>4</td><td>Commande d'un client</td><td>sortie</td><td>80</td></tr><tr><td>5</td><td>Retour fournisseur</td><td>entrée</td><td>10</td></tr></table><ol><li>Quel est le stock du stylo bleu après le mouvement 2 ?</li><li>Le mouvement 3 est-il accepté ? Répondez par oui ou non.</li><li>Quel est le stock après le mouvement 3 ?</li><li>Le mouvement 4 est-il accepté ? Répondez par oui ou non.</li><li>Combien de mouvements ont été refusés sur la journée ?</li><li>Quel est le stock final du stylo bleu à la fermeture ?</li></ol><p>Les quantités sont des nombres entiers d'unités : répondez par un nombre.</p>",
    "starter": "# Exercice — Entrées et sorties du stylo bleu\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Stock après le mouvement 2]\nA_COMPLETER\n\n[Question 2 — Le mouvement 3 est-il accepté]\nA_COMPLETER\n\n[Question 3 — Stock après le mouvement 3]\nA_COMPLETER\n\n[Question 4 — Le mouvement 4 est-il accepté]\nA_COMPLETER\n\n[Question 5 — Mouvements refusés sur la journée]\nA_COMPLETER\n\n[Question 6 — Stock final à la fermeture]\nA_COMPLETER\n",
    "hints": [
      "Traitez les mouvements dans l'ordre : chaque entrée ajoute, chaque sortie soustrait — si elle passe le contrôle.",
      "Avant d'accepter une sortie, comparez-la au stock disponible à cet instant : supérieure au disponible, elle est refusée et le stock ne bouge pas.",
      "Le stock final part du stock initial, additionne les entrées et soustrait les seules sorties acceptées."
    ],
    "examples": [
      {
        "stdin": "Stock initial des cahiers d'une papeterie : 80.\n- sortie 30 (vente) : acceptée, reste 50 ;\n- sortie 60 (commande) : 60 dépasse 50, refusée, reste 50 ;\n- entrée 25 (livraison) : acceptée, reste 75 ;\n- sortie 15 (vente) : acceptée, reste 60.\n\n1) Après la livraison : 75.\n2) Sorties refusées : 1.\n3) Stock final : 60.",
        "expected": "après livraison 75 — 1 sortie refusée — stock final 60",
        "note": "Une sortie refusée ne modifie pas le stock : elle est simplement ignorée et rapportée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Stock après le mouvement 2",
        "stdin": "q:1",
        "expected": "170"
      },
      {
        "label": "Question 2 — Le mouvement 3 est-il accepté",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Stock après le mouvement 3",
        "stdin": "q:3",
        "expected": "50"
      },
      {
        "label": "Question 4 — Le mouvement 4 est-il accepté",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Mouvements refusés sur la journée",
        "stdin": "q:5",
        "expected": "1"
      },
      {
        "label": "Question 6 — Stock final à la fermeture",
        "stdin": "q:6",
        "expected": "60"
      }
    ],
    "solution": "[Question 1 — Stock après le mouvement 2]\n170\n\n[Question 2 — Le mouvement 3 est-il accepté]\noui\n\n[Question 3 — Stock après le mouvement 3]\n50\n\n[Question 4 — Le mouvement 4 est-il accepté]\nnon\n\n[Question 5 — Mouvements refusés sur la journée]\n1\n\n[Question 6 — Stock final à la fermeture]\n60",
    "takeaway": "1) 150 − 40 (vente du matin) = 110, puis 110 + 60 (livraison) = 170.\n2) Oui : 120 ne dépasse pas 170, la sortie passe le contrôle.\n3) 170 − 120 = 50.\n4) Non : 80 dépasse 50, la sortie est refusée — stock insuffisant, le stock reste 50.\n5) Une seule : le mouvement 4.\n6) 50 + 10 (retour fournisseur) = 60.\nContrôle : 150 − 40 + 60 − 120 + 10 = 60 ; la sortie refusée (80) n'entre pas dans le calcul."
  },
  {
    "id": "pr-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Suppression protégée",
    "goal": "Traiter les demandes de suppression avec confirmation et refus motivés.",
    "brief": "<p>Analysez chaque ligne proposée « produit motif » : motif est un code parmi <code>confirme</code>, <code>annule</code> ou <code>absent</code>. Logique du tutoriel : askyesno confirme avant de supprimer — <code>confirme</code> → <code>produit : supprime</code> ; <code>annule</code> → <code>produit : conserve</code> ; <code>absent</code> (produit déjà parti de la table) → <code>produit : introuvable</code> et <strong>compté à part</strong>. Bilan : <code>suppressions : X</code> puis <code>introuvables : Y</code> (dans cet ordre, sur deux lignes).</p>",
    "starter": "# Grille d'analyse (pr-c4-e3) — Suppression protégée\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Nettoyage du catalogue]\n# Données : 5\n# Données : a confirme\n# Données : b annule\n# Données : c confirme\n# Données : d absent\n# Données : e confirme\nA_COMPLETER\n\n[Cas 2 — Tout refuse]\n# Données : 3\n# Données : x annule\n# Données : y annule\n# Données : z absent\nA_COMPLETER\n\n[Cas 3 — Purge finale]\n# Données : 4\n# Données : p1 confirme\n# Données : p2 confirme\n# Données : p3 confirme\n# Données : p4 confirme\nA_COMPLETER\n",
    "hints": [
      "Trois verdicts : confirme → supprime (suppr+1), annule → conserve, absent → introuvable (abs+1).",
      "Deux lignes de bilan à la fin : suppressions : X puis introuvables : Y.",
      "Distinguez l absence du produit (« introuvable »), le refus de confirmation (« conserve ») et la validation explicite (« supprime »), puis recomptez."
    ],
    "examples": [
      {
        "stdin": "3\nclavier confirme\necran annule\nsouris absent\n",
        "expected": "clavier : supprime\necran : conserve\nsouris : introuvable\nsuppressions : 1\nintrouvables : 1"
      }
    ],
    "tests": [
      {
        "label": "Nettoyage du catalogue",
        "stdin": "cas:1",
        "expected": "a : supprime\nb : conserve\nc : supprime\nd : introuvable\ne : supprime\nsuppressions : 3\nintrouvables : 1"
      },
      {
        "label": "Tout refuse",
        "stdin": "cas:2",
        "expected": "x : conserve\ny : conserve\nz : introuvable\nsuppressions : 0\nintrouvables : 1"
      },
      {
        "label": "Purge finale",
        "stdin": "cas:3",
        "expected": "p1 : supprime\np2 : supprime\np3 : supprime\np4 : supprime\nsuppressions : 4\nintrouvables : 0"
      }
    ],
    "solution": "[Exemple]\nclavier : supprime\necran : conserve\nsouris : introuvable\nsuppressions : 1\nintrouvables : 1\n\n[Cas 1 — Nettoyage du catalogue]\na : supprime\nb : conserve\nc : supprime\nd : introuvable\ne : supprime\nsuppressions : 3\nintrouvables : 1\n\n[Cas 2 — Tout refuse]\nx : conserve\ny : conserve\nz : introuvable\nsuppressions : 0\nintrouvables : 1\n\n[Cas 3 — Purge finale]\np1 : supprime\np2 : supprime\np3 : supprime\np4 : supprime\nsuppressions : 4\nintrouvables : 0",
    "takeaway": "À retenir : Traiter les demandes de suppression avec confirmation et refus motivés."
  },
  {
    "id": "pr-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Alertes de stock bas",
    "goal": "Signaler chaque produit sous son seuil d'alerte, comme l'amélioration 2 du tutoriel.",
    "brief": "<p>Analysez chaque ligne proposée « produit seuil stock ». Pour chaque ligne, indiquez <code>produit : rupture</code> si stock vaut 0, <code>produit : alerte</code> si le stock est strictement inférieur au seuil (amélioration « avertir si quantité &lt; seuil »), sinon <code>produit : ok</code>. Bilan : <code>ruptures : R</code> puis <code>alertes : A</code> (dans cet ordre, sur deux lignes).</p>",
    "starter": "# Grille d'analyse (pr-c5-e1) — Alertes de stock bas\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Inventaire du soir]\n# Données : 5\n# Données : a 5 0\n# Données : b 3 2\n# Données : c 4 4\n# Données : d 2 1\n# Données : e 6 50\nA_COMPLETER\n\n[Cas 2 — Rupture generale]\n# Données : 3\n# Données : x 1 0\n# Données : y 2 0\n# Données : z 1 0\nA_COMPLETER\n\n[Cas 3 — Stock sain]\n# Données : 4\n# Données : p1 5 5\n# Données : p2 10 30\n# Données : p3 2 8\n# Données : p4 7 7\nA_COMPLETER\n",
    "hints": [
      "Trois cas dans l'ordre : stock -eq 0 → rupture ; stock -lt seuil → alerte ; sinon ok.",
      "Deux lignes de bilan à la fin : ruptures : R puis alertes : A.",
      "Comparez stock == 0 (« rupture »), 0 < stock < seuil (« alerte ») et stock >= seuil (« ok ») avant de totaliser séparément ruptures et alertes."
    ],
    "examples": [
      {
        "stdin": "3\nclavier 5 2\necran 3 0\nsouris 4 10\n",
        "expected": "clavier : alerte\necran : rupture\nsouris : ok\nruptures : 1\nalertes : 1"
      }
    ],
    "tests": [
      {
        "label": "Inventaire du soir",
        "stdin": "cas:1",
        "expected": "a : rupture\nb : alerte\nc : ok\nd : alerte\ne : ok\nruptures : 1\nalertes : 2"
      },
      {
        "label": "Rupture generale",
        "stdin": "cas:2",
        "expected": "x : rupture\ny : rupture\nz : rupture\nruptures : 3\nalertes : 0"
      },
      {
        "label": "Stock sain",
        "stdin": "cas:3",
        "expected": "p1 : ok\np2 : ok\np3 : ok\np4 : ok\nruptures : 0\nalertes : 0"
      }
    ],
    "solution": "[Exemple]\nclavier : alerte\necran : rupture\nsouris : ok\nruptures : 1\nalertes : 1\n\n[Cas 1 — Inventaire du soir]\na : rupture\nb : alerte\nc : ok\nd : alerte\ne : ok\nruptures : 1\nalertes : 2\n\n[Cas 2 — Rupture generale]\nx : rupture\ny : rupture\nz : rupture\nruptures : 3\nalertes : 0\n\n[Cas 3 — Stock sain]\np1 : ok\np2 : ok\np3 : ok\np4 : ok\nruptures : 0\nalertes : 0",
    "takeaway": "À retenir : Signaler chaque produit sous son seuil d'alerte, comme l'amélioration 2 du tutoriel."
  },
  {
    "id": "pr-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Que vaut le rayon papeterie ?",
    "exampleTitle": "Exemple résolu — la valeur de l'outillage de la quincaillerie",
    "goal": "Calculer la valeur de chaque ligne (quantite × prix), la valeur totale du stock et repérer la ligne de plus grande valeur.",
    "brief": "<p><strong>Énoncé.</strong> Pour sa déclaration d'inventaire, Mme Adjovi veut connaître la valeur de son rayon. Règle du cours : <strong>valeur d'une ligne = quantite × prix unitaire</strong> ; la <strong>valeur totale</strong> s'accumule dans une variable initialisée à 0 avant la boucle, et s'affiche une seule fois après. État du rayon papeterie :</p><table><tr><th>id</th><th>Produit</th><th>Quantité</th><th>Prix unitaire (FCFA)</th></tr><tr><td>1</td><td>Cahier 200 pages</td><td>40</td><td>500</td></tr><tr><td>2</td><td>Stylo bleu</td><td>60</td><td>350</td></tr><tr><td>3</td><td>Gomme</td><td>25</td><td>200</td></tr><tr><td>4</td><td>Règle 30 cm</td><td>10</td><td>400</td></tr><tr><td>5</td><td>Agrafeuse</td><td>6</td><td>2500</td></tr></table><ol><li>Que vaut la ligne « Stylo bleu » (quantité × prix) ?</li><li>Que vaut la ligne « Règle 30 cm » ?</li><li>Que vaut la ligne « Agrafeuse » ?</li><li>Quelle est la valeur totale du rayon ?</li><li>Quel produit représente la plus grande valeur de ligne ?</li><li>La valeur totale s'obtient en additionnant les valeurs de ligne ou les prix unitaires ?</li></ol><p>Montants en FCFA, nombres sans espace : 21000.</p>",
    "starter": "# Exercice — Que vaut le rayon papeterie ?\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Valeur de la ligne Stylo bleu]\nA_COMPLETER\n\n[Question 2 — Valeur de la ligne Règle 30 cm]\nA_COMPLETER\n\n[Question 3 — Valeur de la ligne Agrafeuse]\nA_COMPLETER\n\n[Question 4 — Valeur totale du rayon]\nA_COMPLETER\n\n[Question 5 — Produit de plus grande valeur de ligne]\nA_COMPLETER\n\n[Question 6 — Ce qu'on additionne pour la valeur totale]\nA_COMPLETER\n",
    "hints": [
      "Chaque ligne se calcule séparément : le nombre d'unités multiplié par le prix unitaire.",
      "La valeur totale additionne les valeurs de ligne, jamais les prix seuls ni les quantités seules.",
      "Repérez la plus grande valeur de ligne : un prix unitaire élevé ne suffit pas si la quantité est petite."
    ],
    "examples": [
      {
        "stdin": "Quincaillerie, rayon outillage :\n- vis : 100 unités à 25 FCFA → 2500 ;\n- marteau : 4 unités à 3000 FCFA → 12000 ;\n- perceuse : 2 unités à 15000 FCFA → 30000.\nTotal : 2500 + 12000 + 30000 = 44500 FCFA.\nLigne la plus élevée : la perceuse.",
        "expected": "vis 2500 — marteau 12000 — perceuse 30000 — total 44500 — vitrine : perceuse",
        "note": "Valeur de ligne = quantite × prix, accumulée dans un total initialisé à 0 avant la boucle."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Valeur de la ligne Stylo bleu",
        "stdin": "q:1",
        "expected": "21000||21 000"
      },
      {
        "label": "Question 2 — Valeur de la ligne Règle 30 cm",
        "stdin": "q:2",
        "expected": "4000||4 000"
      },
      {
        "label": "Question 3 — Valeur de la ligne Agrafeuse",
        "stdin": "q:3",
        "expected": "15000||15 000"
      },
      {
        "label": "Question 4 — Valeur totale du rayon",
        "stdin": "q:4",
        "expected": "65000||65 000"
      },
      {
        "label": "Question 5 — Produit de plus grande valeur de ligne",
        "stdin": "q:5",
        "expected": "stylo bleu||le stylo bleu"
      },
      {
        "label": "Question 6 — Ce qu'on additionne pour la valeur totale",
        "stdin": "q:6",
        "expected": "les valeurs de ligne||valeurs de ligne||valeur de ligne||les valeurs"
      }
    ],
    "solution": "[Question 1 — Valeur de la ligne Stylo bleu]\n21000\n\n[Question 2 — Valeur de la ligne Règle 30 cm]\n4000\n\n[Question 3 — Valeur de la ligne Agrafeuse]\n15000\n\n[Question 4 — Valeur totale du rayon]\n65000\n\n[Question 5 — Produit de plus grande valeur de ligne]\nstylo bleu\n\n[Question 6 — Ce qu'on additionne pour la valeur totale]\nles valeurs de ligne",
    "takeaway": "1) Stylo bleu : 60 × 350 = 21000 FCFA.\n2) Règle : 10 × 400 = 4000 FCFA.\n3) Agrafeuse : 6 × 2500 = 15000 FCFA.\n4) Total : 20000 (cahier) + 21000 + 5000 (gomme) + 4000 + 15000 = 65000 FCFA.\n5) Le stylo bleu (21000), devant l'agrafeuse (15000) : la plus grande valeur de ligne, pas le plus grand prix unitaire.\n6) Les valeurs de ligne : on additionne les produits quantite × prix, jamais les prix seuls.\nContrôle : 20000 + 21000 + 5000 + 4000 + 15000 = 65000."
  },
  {
    "id": "pr-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Chercher, filtrer, mettre en vitrine",
    "exampleTitle": "Exemple résolu — le rayon peinture de la quincaillerie",
    "goal": "Filtrer une catégorie, appliquer la boucle de maximum (test strict, premier gagne à égalité) et prévoir une recherche sans résultat.",
    "brief": "<p><strong>Énoncé.</strong> La vendeuse veut préparer une vitrine. La <strong>recherche par catégorie</strong> filtre les produits dont la catégorie égale la cible et compte les trouvailles ; la <strong>boucle de maximum</strong> garde le produit au prix le plus élevé et se met à jour seulement si le prix courant est <strong>strictement supérieur</strong> — à égalité, le premier rencontré garde la place. Catalogue du jour :</p><table><tr><th>id</th><th>Produit</th><th>Catégorie</th><th>Prix (FCFA)</th></tr><tr><td>1</td><td>Roman policier</td><td>Livres</td><td>4500</td></tr><tr><td>2</td><td>Atlas scolaire</td><td>Livres</td><td>6500</td></tr><tr><td>3</td><td>Bande dessinée</td><td>Livres</td><td>6500</td></tr><tr><td>4</td><td>Cahier 200 pages</td><td>Papeterie</td><td>500</td></tr><tr><td>5</td><td>Cahier cuir</td><td>Papeterie</td><td>4500</td></tr></table><ol><li>Combien de produits la recherche « Livres » trouve-t-elle ?</li><li>Dans la catégorie Livres, quel produit est le plus cher ?</li><li>Dans la boucle de maximum, à prix égal, qui garde la place : le premier produit rencontré ou le dernier ?</li><li>Combien de produits la recherche « Jeux » (catégorie inexistante) trouve-t-elle ?</li><li>Dans la catégorie Papeterie, quel produit est le plus cher ?</li><li>Une recherche sans résultat est-elle une erreur ? Répondez par oui ou non.</li></ol>",
    "starter": "# Exercice — Chercher, filtrer, mettre en vitrine\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Trouvailles de la recherche Livres]\nA_COMPLETER\n\n[Question 2 — Le plus cher de la catégorie Livres]\nA_COMPLETER\n\n[Question 3 — Qui garde la place à prix égal]\nA_COMPLETER\n\n[Question 4 — Trouvailles de la recherche Jeux]\nA_COMPLETER\n\n[Question 5 — Le plus cher de la catégorie Papeterie]\nA_COMPLETER\n\n[Question 6 — Une recherche sans résultat est-elle une erreur]\nA_COMPLETER\n",
    "hints": [
      "Le filtre compare la catégorie de chaque ligne à la cible : seules les lignes égales s'affichent et comptent.",
      "La boucle de maximum garde deux variables, le meilleur produit et son prix ; la mise à jour exige un prix strictement supérieur.",
      "Une catégorie absente ne fait échouer aucune ligne du filtre : le bilan vaut zéro trouvaille, sans erreur."
    ],
    "examples": [
      {
        "stdin": "Quincaillerie, rayon Peinture :\n- pot blanc : 8000 FCFA ; pot rouge : 3500 ; pinceau : 1200 ; rouleau : 8000.\n\n1) Recherche « Peinture » : 4 trouvailles.\n2) Maximum : le pot blanc (8000) — le rouleau, aussi à 8000, arrive après : à égalité, le premier rencontré gagne.\n3) Recherche « Jardin » : 0 trouvaille, sans erreur.",
        "expected": "Peinture : 4 trouvailles — max : pot blanc — égalité : le premier gagne — Jardin : 0",
        "note": "Test strict : un égal ne détrône pas le champion en place ; une recherche vide rend un bilan à 0, pas une erreur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Trouvailles de la recherche Livres",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Le plus cher de la catégorie Livres",
        "stdin": "q:2",
        "expected": "atlas scolaire||l'atlas scolaire||atlas"
      },
      {
        "label": "Question 3 — Qui garde la place à prix égal",
        "stdin": "q:3",
        "expected": "le premier||premier||le premier gagne||le premier rencontre"
      },
      {
        "label": "Question 4 — Trouvailles de la recherche Jeux",
        "stdin": "q:4",
        "expected": "0"
      },
      {
        "label": "Question 5 — Le plus cher de la catégorie Papeterie",
        "stdin": "q:5",
        "expected": "cahier cuir||le cahier cuir"
      },
      {
        "label": "Question 6 — Une recherche sans résultat est-elle une erreur",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Trouvailles de la recherche Livres]\n3\n\n[Question 2 — Le plus cher de la catégorie Livres]\natlas scolaire\n\n[Question 3 — Qui garde la place à prix égal]\nle premier\n\n[Question 4 — Trouvailles de la recherche Jeux]\n0\n\n[Question 5 — Le plus cher de la catégorie Papeterie]\ncahier cuir\n\n[Question 6 — Une recherche sans résultat est-elle une erreur]\nnon",
    "takeaway": "1) Trois : le roman policier, l'atlas scolaire et la bande dessinée.\n2) L'atlas scolaire (6500) : rencontré avant la bande dessinée, il prend la tête.\n3) Le premier : le test est strictement supérieur, un prix égal ne détrône pas le champion en place.\n4) Zéro : aucune ligne ne porte la catégorie Jeux — le filtre ne trouve rien.\n5) Le cahier cuir (4500), devant le cahier 200 pages (500).\n6) Non : le bilan affiche 0 trouvaille et un meilleur resté à « - » : c'est un résultat valide, pas une erreur.\nContrôle : 3 (Livres) + 2 (Papeterie) = 5 produits du catalogue."
  },
  {
    "id": "pr-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Les quatre pannes du premier lancement",
    "exampleTitle": "Exemple résolu — les pannes de l'appli de la boulangerie",
    "goal": "Diagnostiquer les quatre pannes classiques du projet et choisir le bon remède (service, pip, apt, utf-8), puis nommer le test unitaire.",
    "brief": "<p><strong>Énoncé.</strong> Dernière ligne droite : livrer. Au premier lancement chez la librairie, Kofi affronte les quatre pannes classiques du tutoriel :</p><table><tr><th>Symptôme à l'écran</th><th>Couche en cause</th><th>Remède</th></tr><tr><td>« impossible de se connecter »</td><td>serveur</td><td>vérifier le service PostgreSQL, le mot de passe, l'existence de la base</td></tr><tr><td>« No module named psycopg2 »</td><td>dépendance Python</td><td>pip install psycopg2-binary</td></tr><tr><td>« No module named tkinter »</td><td>bibliothèque système</td><td>sudo apt install python3-tk</td></tr><tr><td>« SyntaxError: Non-ASCII character »</td><td>encodage du fichier</td><td>en-tête # -*- coding: utf-8 -*- en première ligne</td></tr></table><p>Avant de livrer, Kofi écrit aussi de petits <strong>tests unitaires</strong> : des fonctions qui vérifient automatiquement un comportement attendu (par exemple : une sortie supérieure au stock est bien refusée).</p><ol><li>Quand PostgreSQL refuse la connexion, que vérifie-t-on en premier : le service, le CSV ou le prix ?</li><li>Pour « No module named psycopg2 », quel outil installe le remède : pip ou apt ?</li><li>Pour « No module named tkinter », quel outil : pip ou apt ?</li><li>Quel encodage déclare l'en-tête qui répare « Non-ASCII character » ?</li><li>Combien de pannes classiques le tableau répertorie-t-il ?</li><li>Comment s'appelle la vérification automatique d'un comportement attendu ? (un seul mot)</li></ol>",
    "starter": "# Exercice — Les quatre pannes du premier lancement\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Première vérification en cas de connexion refusée]\nA_COMPLETER\n\n[Question 2 — Outil pour installer psycopg2]\nA_COMPLETER\n\n[Question 3 — Outil pour installer tkinter]\nA_COMPLETER\n\n[Question 4 — Encodage de l'en-tête]\nA_COMPLETER\n\n[Question 5 — Nombre de pannes classiques]\nA_COMPLETER\n\n[Question 6 — Vérification automatique avant livraison]\nA_COMPLETER\n",
    "hints": [
      "Chaque panne touche une couche différente : le serveur, une dépendance Python, une bibliothèque système, le fichier source.",
      "Le message « No module named X » nomme un module manquant : le remède dépend de la nature du module — paquet Python ou paquet système.",
      "Le message Non-ASCII signale des caractères non déclarés : l'en-tête de codage se place en première ligne du fichier."
    ],
    "examples": [
      {
        "stdin": "L'application de la boulangerie plante au lancement :\n1) « impossible de se connecter » : le service PostgreSQL était éteint — démarré, tout rentre.\n2) « No module named flask » : paquet Python manquant — pip install flask.\n3) « SyntaxError: Non-ASCII » : en-tête # -*- coding: utf-8 -*- ajoutée en première ligne.\n\n1) Connexion : vérifier le service.\n2) Module Python manquant : pip.\n3) Encodage : utf-8.",
        "expected": "connexion → service — module Python → pip — encodage → utf-8",
        "note": "Lire le symptôme, isoler la couche (serveur, module, encodage), appliquer le remède de cette couche."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Première vérification en cas de connexion refusée",
        "stdin": "q:1",
        "expected": "le service||service||postgresql||le service postgresql||service postgresql||le serveur"
      },
      {
        "label": "Question 2 — Outil pour installer psycopg2",
        "stdin": "q:2",
        "expected": "pip||pip install"
      },
      {
        "label": "Question 3 — Outil pour installer tkinter",
        "stdin": "q:3",
        "expected": "apt||sudo apt||apt-get||apt install||sudo apt install"
      },
      {
        "label": "Question 4 — Encodage de l'en-tête",
        "stdin": "q:4",
        "expected": "utf-8||utf8||utf 8"
      },
      {
        "label": "Question 5 — Nombre de pannes classiques",
        "stdin": "q:5",
        "expected": "4"
      },
      {
        "label": "Question 6 — Vérification automatique avant livraison",
        "stdin": "q:6",
        "expected": "test||un test||test unitaire||tests||les tests"
      }
    ],
    "solution": "[Question 1 — Première vérification en cas de connexion refusée]\nle service\n\n[Question 2 — Outil pour installer psycopg2]\npip\n\n[Question 3 — Outil pour installer tkinter]\napt\n\n[Question 4 — Encodage de l'en-tête]\nutf-8\n\n[Question 5 — Nombre de pannes classiques]\n4\n\n[Question 6 — Vérification automatique avant livraison]\ntest",
    "takeaway": "1) Le service : sudo service postgresql status, puis le mot de passe et l'existence de la base gestion_stock.\n2) pip : psycopg2-binary est une dépendance Python, installée par pip install psycopg2-binary.\n3) apt : tkinter est un paquet système (python3-tk), installé par sudo apt install python3-tk — jamais par pip.\n4) utf-8 : l'en-tête # -*- coding: utf-8 -*- se place en première ligne du fichier source.\n5) Quatre pannes : connexion, psycopg2, tkinter, encodage.\n6) Un test : le test unitaire vérifie automatiquement un comportement attendu, avant la livraison.\nContrôle : les quatre pannes couvrent quatre couches — serveur, dépendance Python, bibliothèque graphique, fichier source."
  },
  {
    "id": "pr-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'export CSV pour le comptable",
    "exampleTitle": "Exemple résolu — l'export de la quincaillerie",
    "goal": "Produire un export CSV conforme : en-tête avant la boucle, point-virgule, une ligne par produit, bilan des lignes exportées.",
    "brief": "<p><strong>Énoncé.</strong> Pour son comptable, Mme Adjovi demande un export du catalogue. Le format du tutoriel : une ligne d'en-tête <code>nom;categorie;quantite;prix</code> générée <strong>avant</strong> la boucle (elle sort même pour un catalogue vide), puis une ligne par produit, les champs séparés par des <strong>points-virgules</strong> (convention francophone), et le bilan « lignes exportees » qui compte les produits, pas l'en-tête. Catalogue à exporter :</p><table><tr><th>id</th><th>nom</th><th>categorie</th><th>quantite</th><th>prix (FCFA)</th></tr><tr><td>1</td><td>Cahier 200 pages</td><td>Papeterie</td><td>40</td><td>500</td></tr><tr><td>2</td><td>Stylo bleu</td><td>Papeterie</td><td>60</td><td>350</td></tr><tr><td>3</td><td>Roman policier</td><td>Livres</td><td>6</td><td>4500</td></tr><tr><td>4</td><td>Atlas scolaire</td><td>Livres</td><td>9</td><td>6500</td></tr><tr><td>5</td><td>Gomme</td><td>Papeterie</td><td>25</td><td>200</td></tr></table><ol><li>Quel caractère sépare les champs d'une ligne du CSV ?</li><li>Combien de lignes de données l'export contient-il (sans l'en-tête) ?</li><li>En comptant l'en-tête, combien de lignes compte le fichier CSV ?</li><li>L'en-tête est-elle générée avant ou après la boucle d'export ?</li><li>Le bilan « lignes exportees » compte-t-il l'en-tête ? Répondez par oui ou non.</li><li>Si le catalogue était vide, l'en-tête apparaîtrait-elle quand même ? Répondez par oui ou non.</li></ol>",
    "starter": "# Exercice — L'export CSV pour le comptable\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Séparateur des champs]\nA_COMPLETER\n\n[Question 2 — Lignes de données sans l'en-tête]\nA_COMPLETER\n\n[Question 3 — Lignes du fichier avec l'en-tête]\nA_COMPLETER\n\n[Question 4 — Génération de l'en-tête par rapport à la boucle]\nA_COMPLETER\n\n[Question 5 — L'en-tête compte-t-elle dans le bilan]\nA_COMPLETER\n\n[Question 6 — En-tête sur un catalogue vide]\nA_COMPLETER\n",
    "hints": [
      "Le CSV du tutoriel suit la convention francophone pour le séparateur de champs.",
      "Comptez les lignes de produits du tableau, puis ajoutez la ligne d'en-tête : une seule pour tout le fichier.",
      "L'en-tête est générée hors de la boucle : elle apparaît une seule fois, même si aucune ligne de données ne suit."
    ],
    "examples": [
      {
        "stdin": "Export d'une quincaillerie de 3 articles (clous, vis, marteau).\nLigne 1 (en-tête) : designation;rayon;quantite;tarif\nLignes 2 à 4 : les trois articles.\nBilan : lignes exportees : 3.\n\n1) Séparateur : le point-virgule.\n2) Lignes de données : 3.\n3) Lignes du fichier en tout : 4.\n4) Le bilan compte 3 : l'en-tête n'est pas comptée.",
        "expected": "séparateur point-virgule — 3 lignes de données — 4 lignes en tout — bilan : 3, en-tête non comptée",
        "note": "L'en-tête précède la boucle : une seule fois, même catalogue vide ; le bilan ne compte que les produits."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Séparateur des champs",
        "stdin": "q:1",
        "expected": "point-virgule||point virgule||;||le point-virgule"
      },
      {
        "label": "Question 2 — Lignes de données sans l'en-tête",
        "stdin": "q:2",
        "expected": "5"
      },
      {
        "label": "Question 3 — Lignes du fichier avec l'en-tête",
        "stdin": "q:3",
        "expected": "6"
      },
      {
        "label": "Question 4 — Génération de l'en-tête par rapport à la boucle",
        "stdin": "q:4",
        "expected": "avant||avant la boucle"
      },
      {
        "label": "Question 5 — L'en-tête compte-t-elle dans le bilan",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — En-tête sur un catalogue vide",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Séparateur des champs]\npoint-virgule\n\n[Question 2 — Lignes de données sans l'en-tête]\n5\n\n[Question 3 — Lignes du fichier avec l'en-tête]\n6\n\n[Question 4 — Génération de l'en-tête par rapport à la boucle]\navant\n\n[Question 5 — L'en-tête compte-t-elle dans le bilan]\nnon\n\n[Question 6 — En-tête sur un catalogue vide]\noui",
    "takeaway": "1) Le point-virgule : nom;categorie;quantite;prix — la convention francophone du tutoriel.\n2) Cinq lignes de données, une par produit.\n3) Six lignes : l'en-tête plus les cinq produits.\n4) Avant la boucle : sinon elle se répéterait à chaque produit.\n5) Non : le bilan compte les produits exportés, l'en-tête n'est pas une donnée.\n6) Oui : générée avant la boucle, l'en-tête sort même pour un catalogue vide — et le bilan vaut alors 0.\nContrôle : 5 lignes de données + 1 en-tête = 6 lignes dans le fichier."
  },
  {
    "id": "pr-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le tableau de bord de la soutenance",
    "exampleTitle": "Exemple résolu — le tableau de bord de l'épicerie",
    "goal": "Construire le tableau de bord final : valeur totale, nombre d'alertes et vitrine (plus grande valeur de ligne).",
    "brief": "<p><strong>Énoncé.</strong> Pour la soutenance, Inès prépare le tableau de bord final : pour chaque produit, son stock et sa valeur ; puis le <strong>total en FCFA</strong>, le <strong>nombre d'alertes</strong> (seuil 10 : alerte si 0 &lt; stock &lt; 10, rupture si stock 0) et la <strong>vitrine</strong> — le produit de plus grande <strong>valeur de ligne</strong> (quantite × prix). État du catalogue le jour de la soutenance :</p><table><tr><th>id</th><th>Produit</th><th>Quantité</th><th>Prix unitaire (FCFA)</th></tr><tr><td>1</td><td>Cahier 200 pages</td><td>40</td><td>500</td></tr><tr><td>2</td><td>Atlas scolaire</td><td>9</td><td>6500</td></tr><tr><td>3</td><td>Stylo bleu</td><td>60</td><td>350</td></tr><tr><td>4</td><td>Roman policier</td><td>6</td><td>4500</td></tr><tr><td>5</td><td>Agrafeuse</td><td>10</td><td>2500</td></tr></table><ol><li>Que vaut la ligne « Atlas scolaire » (quantité × prix) ?</li><li>Quelle est la valeur totale du catalogue ?</li><li>Combien de produits sont en alerte (strictement sous le seuil de 10) ?</li><li>L'agrafeuse (stock 10, égal au seuil) compte-t-elle en alerte ? Répondez par oui ou non.</li><li>Quel produit va en vitrine (plus grande valeur de ligne) ?</li><li>La vitrine se choisit sur le prix unitaire ou sur la valeur de ligne ?</li></ol><p>Montants en FCFA, nombres sans espace : 58500.</p>",
    "starter": "# Exercice — Le tableau de bord de la soutenance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Valeur de la ligne Atlas scolaire]\nA_COMPLETER\n\n[Question 2 — Valeur totale du catalogue]\nA_COMPLETER\n\n[Question 3 — Produits en alerte]\nA_COMPLETER\n\n[Question 4 — L'agrafeuse compte-t-elle en alerte]\nA_COMPLETER\n\n[Question 5 — Produit en vitrine]\nA_COMPLETER\n\n[Question 6 — Critère de choix de la vitrine]\nA_COMPLETER\n",
    "hints": [
      "Le tableau de bord combine les acquis : valeur de ligne pour chaque produit, cascade du seuil pour les alertes, maximum pour la vitrine.",
      "Comparez chaque stock au seuil en pensant au cas limite : égal au seuil n'alerte pas, et le zéro est une rupture.",
      "Pour la vitrine, multipliez avant de comparer : un article rare et cher peut perdre contre un article modeste et nombreux."
    ],
    "examples": [
      {
        "stdin": "Tableau de bord d'une épicerie (seuil 5) :\n- riz : 20 sacs à 5000 FCFA → 100000, ok ;\n- huile : 4 bouteilles à 1500 → 6000, alerte ;\n- sucre : 12 kg à 800 → 9600, ok ;\n- sel : 0 unité à 400 → 0, rupture.\nTotal : 100000 + 6000 + 9600 + 0 = 115600 FCFA.\nAlertes : 1 (l'huile). Vitrine : le riz (100000).",
        "expected": "total 115600 — alertes 1 — vitrine : riz (100000)",
        "note": "Total, alertes, vitrine : trois compteurs initialisés hors boucle, affichés une seule fois après."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Valeur de la ligne Atlas scolaire",
        "stdin": "q:1",
        "expected": "58500||58 500"
      },
      {
        "label": "Question 2 — Valeur totale du catalogue",
        "stdin": "q:2",
        "expected": "151500||151 500"
      },
      {
        "label": "Question 3 — Produits en alerte",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — L'agrafeuse compte-t-elle en alerte",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Produit en vitrine",
        "stdin": "q:5",
        "expected": "atlas scolaire||l'atlas scolaire||atlas"
      },
      {
        "label": "Question 6 — Critère de choix de la vitrine",
        "stdin": "q:6",
        "expected": "la valeur de ligne||valeur de ligne||les valeurs de ligne||la valeur||valeur"
      }
    ],
    "solution": "[Question 1 — Valeur de la ligne Atlas scolaire]\n58500\n\n[Question 2 — Valeur totale du catalogue]\n151500\n\n[Question 3 — Produits en alerte]\n2\n\n[Question 4 — L'agrafeuse compte-t-elle en alerte]\nnon\n\n[Question 5 — Produit en vitrine]\natlas scolaire\n\n[Question 6 — Critère de choix de la vitrine]\nla valeur de ligne",
    "takeaway": "1) Atlas scolaire : 9 × 6500 = 58500 FCFA.\n2) Total : 20000 (cahier) + 58500 + 21000 (stylo) + 27000 (roman) + 25000 (agrafeuse) = 151500 FCFA.\n3) Deux : l'atlas (9) et le roman (6), strictement sous le seuil de 10.\n4) Non : stock 10 = seuil, la comparaison est stricte — l'agrafeuse est ok.\n5) L'atlas scolaire : 58500, la plus grande valeur de ligne du catalogue.\n6) La valeur de ligne : quantite × prix — le prix unitaire seul ignorerait les quantités en stock.\nContrôle : 20000 + 58500 + 21000 + 27000 + 25000 = 151500 ; 2 alertes + 3 ok = 5 produits."
  }
];
