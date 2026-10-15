/**
 * Chapitres 1 à 3 du cours « Projet tutoré : application de gestion de stock » B1.
 *
 * Chapitre 1 : cadrage du projet (objectifs, prérequis, structure,
 *               environnement).
 * Chapitre 2 : la base de données (table produits, connexion, CRUD SQL).
 * Chapitre 3 : l'interface Tkinter (widgets, saisie, validation, boîtes de
 *               dialogue).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-projet.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Cadrage du projet',
    short: 'Cadrage',
    toc: 'Présentation et objectifs pédagogiques ; prérequis (Python 3.7+, notions de POO et de bases de données) ; installation de l\'environnement ; structure du projet (main.py, database.py, requirements.txt, README.md).',
    time: '≈ 1 h 30 de travail',
    free: true,

    situation:
      'Le projet tutoré court : livrer une application complète de gestion de stock en Python, avec ' +
      'interface graphique Tkinter et base PostgreSQL. Un projet qui se réussit à 80 % avant la première ' +
      'ligne de code : objectifs clairs, environnement vérifié, structure de dossiers posée.',

    objectives: [
      'présenter le projet : application de gestion de stock Python, Tkinter, PostgreSQL ;',
      'relier chaque objectif pédagogique à son concept Python (POO, Tkinter, CRUD, exceptions) ;',
      'vérifier les prérequis : Python 3.7+, Tkinter, PostgreSQL ;',
      'installer l\'environnement : python3-pip, postgresql, psycopg2-binary, python3-tk ;',
      'poser la structure : main.py, database.py, requirements.txt, README.md.'
    ],

    sections: [
      {
        title: 'Présentation et objectifs',
        html: [
          '<p>Le tutoriel guide la création d\'une application complète de gestion de stock en Python : ' +
          'la <strong>programmation orientée objet</strong> structure le code (classes Database et ' +
          'ApplicationGestionStock), <strong>Tkinter</strong> fournit l\'interface graphique, ' +
          '<strong>PostgreSQL</strong> conserve les données, et les opérations <strong>CRUD</strong> — ' +
          'Create, Read, Update, Delete — les font vivre.</p>',
          '<p>Cinq objectifs pédagogiques : créer une interface intuitive, connecter l\'application à ' +
          'la base, implémenter les opérations de base, <strong>gérer les erreurs et les exceptions</strong>, ' +
          'organiser le code en <strong>modules réutilisables</strong>. Prérequis : bases de Python, notions ' +
          'de POO, compréhension des bases de données relationnelles, Python 3.7 ou supérieur.</p>',
          box('mnemo', 'Mnémotechnique — « une classe pour la base, une classe pour l\'écran »', 'pin',
            '    <p>Deux classes, deux mondes : Database parle SQL, ApplicationGestionStock parle à ' +
            'l\'utilisateur. main.py les fait se rencontrer.</p>')
        ].join('\n')
      },
      {
        title: 'Installer l\'environnement',
        html: [
          '<p>Vérifier Python : <code>python3 --version</code> — sinon <code>sudo apt install python3 ' +
          'python3-pip</code>. PostgreSQL : <code>sudo apt install postgresql postgresql-contrib</code> ' +
          'puis <code>sudo service postgresql start</code>. Tkinter : <code>sudo apt install ' +
          'python3-tk</code> — vérifiable avec <code>python3 -m tkinter</code>. Configuration de la base : ' +
          '<code>sudo -u postgres psql</code>, <code>ALTER USER postgres WITH PASSWORD \'postgres\'</code>, ' +
          'puis <code>CREATE DATABASE gestion_stock</code>.</p>',
          '<p>La dépendance Python tient en une ligne dans <code>requirements.txt</code> : ' +
          '<code>psycopg2-binary==2.9.9</code>, installée par <code>pip install -r requirements.txt</code>. ' +
          'Un requirements.txt versionné, c\'est un projet que n\'importe qui peut installer.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>psycopg2 est le PONT Python-PostgreSQL ; Tkinter ne parle pas SQL.</li>\n' +
            '      <li>La version minimale est 3.7 : 3.6 refuse, 3.10 passe.</li>\n' +
            '      <li>La base se nomme gestion_stock : créer la base AVANT de lancer l\'application.</li>\n' +
            '      <li>Le README fait partie du livrable : un projet sans documentation est incomplet.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'La structure du projet',
        html: [
          '<p>Quatre fichiers, quatre rôles : <code>main.py</code> — l\'interface principale (fenêtre, ' +
          'formulaire, tableau) ; <code>database.py</code> — la classe Database qui encapsule toute la ' +
          'gestion PostgreSQL ; <code>requirements.txt</code> — les dépendances ; <code>README.md</code> — ' +
          'la documentation. Cette séparation n\'est pas décorative : on peut changer d\'interface sans ' +
          'toucher à la base, et tester la base sans ouvrir la fenêtre.</p>',
          box('tech', 'Vérifier en Bash', 'terminal',
            '    <ul>\n' +
            '      <li>Le classeur des compétences : interface → tkinter, connexion → postgres, operations → crud, classes → poo.</li>\n' +
            '      <li>Le testeur de prérequis : version -ge 37, tkinter et psql = oui — trois conditions en ET.</li>\n' +
            '      <li>La structure : main → interface, database → database, requirements → deps, readme → doc.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'La base de données utilisée par le projet :', opts: ['PostgreSQL', 'MySQL', 'SQLite'], correct: 0, exp: 'Le tutoriel installe postgresql et psycopg2.' },
      { q: 'La bibliothèque graphique du projet :', opts: ['Tkinter', 'Flask', 'Pygame'], correct: 0, exp: 'Interface native Python, installée par python3-tk.' },
      { q: 'La version minimale de Python :', opts: ['3.7', '2.7', '3.0'], correct: 0, exp: 'Python 3.7 ou supérieur.' },
      { q: 'Le fichier qui liste les dépendances :', opts: ['requirements.txt', 'main.py', 'README.md'], correct: 0, exp: 'psycopg2-binary==2.9.9, installé par pip.' },
      { q: 'Le fichier qui encapsule la gestion PostgreSQL :', opts: ['database.py', 'main.py', 'requirements.txt'], correct: 0, exp: 'La classe Database y vit.' },
      { q: 'main.py contient…', opts: ['l\'interface principale', 'les requêtes SQL', 'la documentation'], correct: 0, exp: 'Fenêtre, formulaire, tableau : le monde de l\'écran.' },
      { q: 'Le pont Python vers PostgreSQL :', opts: ['psycopg2', 'tkinter', 'pip'], correct: 0, exp: 'psycopg2-binary dans requirements.txt.' },
      { q: 'Les quatre opérations CRUD :', opts: ['Create, Read, Update, Delete', 'Compile, Run, Upload, Debug', 'Copy, Rename, Undo, Drop'], correct: 0, exp: 'INSERT, SELECT, UPDATE, DELETE en SQL.' }
    ],

    pitfalls: [
      'Coder l\'interface et le SQL dans le même fichier : séparer main.py et database.py.',
      'Oublier d\'installer python3-tk : l\'import tkinter échoue.',
      'Lancer l\'application avant de créer la base gestion_stock.',
      'Omettre requirements.txt : le projet ne s\'installe plus ailleurs.'
    ],

    methodTitle: 'Méthode — démarrer le projet en trois gestes',
    method: [
      'Vérifier : python3 --version, python3 -m tkinter, service postgresql status.',
      'Installer : python3-pip, postgresql-contrib, psycopg2-binary ; créer la base gestion_stock.',
      'Poser la structure : main.py, database.py, requirements.txt, README.md.'
    ],

    summary: [
      'Projet : application de gestion de stock — Python, Tkinter, PostgreSQL.',
      'Objectifs : interface, connexion, CRUD, exceptions, modules réutilisables.',
      'Environnement : Python 3.7+, python3-tk, postgresql, psycopg2-binary.',
      'Structure : main.py (écran), database.py (SQL), requirements.txt, README.md.'
    ],

    checklist: [
      'Je présente le projet et ses cinq objectifs.',
      'Je vérifie les trois prérequis de la machine.',
      'Je crée la base et j\'installe les dépendances.',
      'Je justifie la séparation interface / base.'
    ],

    notions: [
      '<strong>Projet tutoré</strong> : application complète qui mobilise tous les acquis.',
      '<strong>POO</strong> : classes Database et ApplicationGestionStock.',
      '<strong>psycopg2</strong> : bibliothèque Python de connexion à PostgreSQL.',
      '<strong>Tkinter</strong> : interface graphique native de Python.',
      '<strong>CRUD</strong> : Create, Read, Update, Delete.',
      '<strong>requirements.txt</strong> : liste des dépendances pour pip.',
      '<strong>gestion_stock</strong> : base de données du projet.',
      '<strong>README.md</strong> : documentation livrée avec le projet.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les objectifs et la structure du projet.' },
      { cls: 'mid', text: '50–69 % — refais l\'installation de l\'environnement.' },
      { cls: 'good', text: '70–89 % — cible le rôle de chaque fichier.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les cinq objectifs pédagogiques ?', a: 'Interface Tkinter, connexion PostgreSQL, opérations CRUD, gestion des exceptions, modules réutilisables.' },
      { q: 'Les quatre fichiers du projet ?', a: 'main.py (interface), database.py (SQL), requirements.txt (dépendances), README.md (doc).' },
      { q: 'Installer l\'environnement sur Ubuntu ?', a: 'apt install python3-pip postgresql python3-tk, pip install psycopg2-binary, créer la base gestion_stock.' },
      { q: 'Rôle de psycopg2 ?', a: 'Le pont entre Python et PostgreSQL : connecter, exécuter des requêtes, gérer les erreurs.' },
      { q: 'Pourquoi séparer main.py et database.py ?', a: 'Changer l\'écran sans toucher au SQL, tester la base sans fenêtre : modules réutilisables.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'La base de données',
    short: 'Base de données',
    toc: 'La table produits (id, nom, categorie, quantite, prix) ; la classe Database ; connexion avec try/except ; CREATE TABLE IF NOT EXISTS ; les quatre requêtes CRUD ; commit et déconnexion.',
    time: '≈ 2 h de travail',

    situation:
      'La classe Database est le pont vers PostgreSQL : elle se connecte, crée la table produits si elle ' +
      'n\'existe pas, et offre quatre méthodes CRUD. Chaque méthode vit dans un try/except — parce qu\'un ' +
      'serveur éteint, un mot de passe faux ou une requête maladroite ne demandent qu\'à arriver.',

    objectives: [
      'décrire la table produits : id SERIAL, nom et categorie VARCHAR, quantite INTEGER, prix DECIMAL(10,2) ;',
      'expliquer la connexion : psycopg2.connect, cursor, gestion des erreurs par try/except ;',
      'utiliser CREATE TABLE IF NOT EXISTS et comprendre commit ;',
      'relier chaque opération CRUD à sa requête : INSERT, SELECT, UPDATE, DELETE ;',
      'fermer proprement : cursor.close, connection.close.'
    ],

    sections: [
      {
        title: 'La table produits',
        html: [
          '<p>Cinq colonnes : <strong>id</strong> — identifiant unique, clé primaire auto-incrémentée ' +
          '(<code>SERIAL PRIMARY KEY</code>) ; <strong>nom</strong> — VARCHAR(100) NOT NULL ; ' +
          '<strong>categorie</strong> — VARCHAR(50) ; <strong>quantite</strong> — INTEGER NOT NULL ; ' +
          '<strong>prix</strong> — DECIMAL(10,2) NOT NULL. Le <code>CREATE TABLE IF NOT EXISTS</code> rend ' +
          'le premier lancement idempotent : la table ne se recrée pas à chaque démarrage.</p>',
          '<p>Pourquoi DECIMAL et non FLOAT pour le prix : DECIMAL(10,2) stocke exactement deux décimales ' +
          '— 2500.50 reste 2500.50, sans arrondi binaire. La précision monétaire n\'est pas négociable.</p>',
          box('mnemo', 'Mnémotechnique — « SERIAL compte, VARCHAR écrit, INTEGER compte en stock, DECIMAL coûte »', 'pin',
            '    <p>Cinq colonnes, cinq types : la grille attendue à l\'examen.</p>')
        ].join('\n')
      },
      {
        title: 'Connexion et gestion des erreurs',
        html: [
          '<p>La méthode <code>connecter()</code> appelle <code>psycopg2.connect(host, database, user, ' +
          'password)</code>, récupère un <strong>cursor</strong>, affiche le succès et renvoie True ; en ' +
          'cas d\'<code>Error</code>, elle affiche le problème et renvoie False. Ce pattern try/except ' +
          'recommence dans chaque méthode : le programme ne plante jamais, il rapporte.</p>',
          '<p>Après toute écriture (INSERT, UPDATE, DELETE), la méthode appelle ' +
          '<code>self.connection.commit()</code> : sans commit, PostgreSQL annule la modification à la ' +
          'déconnexion. La <code>deconnecter()</code> ferme le cursor puis la connexion — dans cet ordre.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>SELECT lit : fetchall ; INSERT/UPDATE/DELETE écrivent : commit.</li>\n' +
            '      <li>Sans commit, la modification est perdue à la fermeture : piège classique.</li>\n' +
            '      <li>Le try/except renvoie False : l\'application continue, elle ne s\'arrête pas.</li>\n' +
            '      <li>CREATE TABLE IF NOT EXISTS : le second lancement ne duplique rien.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Les quatre requêtes CRUD',
        html: [
          '<p><strong>Create</strong> — <code>INSERT INTO produits (nom, categorie, quantite, prix) VALUES ' +
          '(%s, %s, %s, %s)</code> avec les valeurs passées en paramètre ; <strong>Read</strong> — ' +
          '<code>SELECT * FROM produits ORDER BY id</code> puis <code>fetchall()</code> ; <strong>Update</strong> — ' +
          '<code>UPDATE produits SET nom=%s, categorie=%s, quantite=%s, prix=%s WHERE id=%s</code> ; ' +
          '<strong>Delete</strong> — <code>DELETE FROM produits WHERE id=%s</code>.</p>',
          '<p>Les <code>%s</code> sont des <strong>requêtes paramétrées</strong> : psycopg2 échappe les ' +
          'valeurs. Concaténer du SQL à la main ouvre la porte à l\'injection — le paramétrage n\'est pas ' +
          'une option, c\'est la seule façon.</p>',
          box('tech', 'Vérifier en Bash', 'terminal',
            '    <ul>\n' +
            '      <li>Le schéma : id → serial, nom/categorie → varchar, quantite → integer, prix → decimal.</li>\n' +
            '      <li>La connexion : serveur/mdp/base dans l\'ordre, sortie au premier ko.</li>\n' +
            '      <li>Le cycle CRUD : create→insert, read→select, update→update, delete→delete.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le type de id dans la table produits :', opts: ['SERIAL PRIMARY KEY', 'VARCHAR(100)', 'INTEGER simple'], correct: 0, exp: 'Auto-incrémenté et clé primaire.' },
      { q: 'Le type du champ prix :', opts: ['DECIMAL(10,2)', 'FLOAT', 'INTEGER'], correct: 0, exp: 'Deux décimales exactes : la précision monétaire.' },
      { q: 'La méthode qui renvoie toutes les lignes :', opts: ['fetchall()', 'commit()', 'execute()'], correct: 0, exp: 'Après SELECT, le cursor livre fetchall().' },
      { q: 'La méthode qui valide une écriture :', opts: ['commit()', 'fetchall()', 'close()'], correct: 0, exp: 'Sans commit, PostgreSQL annule à la déconnexion.' },
      { q: 'La requête de suppression :', opts: ['DELETE FROM produits WHERE id=%s', 'DROP produits', 'REMOVE id'], correct: 0, exp: 'Toujours avec WHERE : sinon tout disparaît.' },
      { q: 'Les %s dans les requêtes servent à…', opts: ['paramétrer et échapper les valeurs', 'commenter le SQL', 'compter les lignes'], correct: 0, exp: 'Requêtes paramétrées : protection contre l\'injection SQL.' },
      { q: 'CREATE TABLE IF NOT EXISTS garantit…', opts: ['la création seulement si la table manque', 'de vider la table', 'un index automatique'], correct: 0, exp: 'Le premier lancement crée, les suivants passent.' },
      { q: 'Ordre de fermeture :', opts: ['cursor puis connection', 'connection puis cursor', 'peu importe'], correct: 0, exp: 'deconnecter() ferme le cursor, puis la connexion.' }
    ],

    pitfalls: [
      'Concaténer les valeurs dans le SQL : requêtes paramétrées obligatoires.',
      'Oublier commit après INSERT : la ligne n\'est pas vraiment écrite.',
      'Mettre FLOAT pour le prix : DECIMAL(10,2) est exact, FLOAT arrondit.',
      'Supprimer sans WHERE : la table entière disparaît.'
    ],

    methodTitle: 'Méthode — écrire une méthode Database en trois gestes',
    method: [
      'Ouvrir un try : exécuter la requête paramétrée avec le cursor.',
      'Commit si écriture, fetchall si lecture ; renvoyer le résultat ou True.',
      'Except Error : afficher le problème, renvoyer False ou [] — jamais de crash.'
    ],

    summary: [
      'Table produits : id SERIAL, nom/categorie VARCHAR, quantite INTEGER, prix DECIMAL(10,2).',
      'connecter() : psycopg2.connect + cursor, try/except, True/False.',
      'Écritures : commit obligatoire ; lectures : fetchall.',
      'CRUD : INSERT, SELECT ORDER BY id, UPDATE SET WHERE, DELETE WHERE.'
    ],

    checklist: [
      'Je décris la table produits avec ses cinq types.',
      'J\'explique try/except et commit.',
      'J\'écris les quatre requêtes CRUD paramétrées.',
      'Je ferme cursor puis connexion dans l\'ordre.'
    ],

    notions: [
      '<strong>SERIAL</strong> : entier auto-incrémenté de PostgreSQL.',
      '<strong>DECIMAL(10,2)</strong> : décimal exact à deux décimales.',
      '<strong>cursor</strong> : objet qui exécute les requêtes et lit les résultats.',
      '<strong>commit</strong> : validation des écritures sur la connexion.',
      '<strong>fetchall</strong> : récupère toutes les lignes d\'un SELECT.',
      '<strong>Requête paramétrée</strong> : %s passés séparément, échappés par psycopg2.',
      '<strong>CREATE TABLE IF NOT EXISTS</strong> : création idempotente.',
      '<strong>Error (psycopg2)</strong> : exception attrapée par chaque try/except.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les cinq colonnes et leurs types.' },
      { cls: 'mid', text: '50–69 % — refais la connexion et le commit.' },
      { cls: 'good', text: '70–89 % — cible les requêtes paramétrées.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les cinq colonnes de la table produits ?', a: 'id SERIAL PRIMARY KEY, nom VARCHAR(100), categorie VARCHAR(50), quantite INTEGER, prix DECIMAL(10,2).' },
      { q: 'Pourquoi commit après INSERT ?', a: 'Sans validation, PostgreSQL annule la modification à la déconnexion : la ligne n\'est pas écrite.' },
      { q: 'Les quatre requêtes CRUD ?', a: 'INSERT INTO, SELECT FROM (fetchall), UPDATE SET WHERE, DELETE WHERE — toutes paramétrées (%s).' },
      { q: 'Pourquoi des requêtes paramétrées ?', a: 'Les valeurs sont échappées par psycopg2 : protection contre l\'injection SQL.' },
      { q: 'Que fait connecter() en cas d\'échec ?', a: 'Elle attrape Error, affiche le problème et renvoie False : l\'application ne plante pas.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'L\'interface Tkinter',
    short: 'Interface Tkinter',
    toc: 'Deux interfaces : connexion puis principale ; widgets (Label, Entry, Button, Frame, Treeview) ; layout pack et grid ; messagebox (showinfo, showwarning, showerror, askyesno) ; validation des champs.',
    time: '≈ 2 h de travail',

    situation:
      'La fenêtre est le visage du projet : un écran de connexion vers PostgreSQL, puis l\'écran ' +
      'principal avec formulaire d\'ajout, boutons d\'action et tableau des produits. Le tutoriel ' +
      'construit cet enchaînement widget par widget — et protège chaque saisie avant qu\'elle n\'atteigne ' +
      'la base.',

    objectives: [
      'décrire l\'architecture : interface de connexion, puis interface principale ;',
      'nommer les widgets : Label, Entry, Button, Frame, LabelFrame, Treeview, Scrollbar ;',
      'placer avec pack et grid, lier la sélection du Treeview avec bind ;',
      'choisir la bonne messagebox : showinfo, showwarning, showerror, askyesno ;',
      'valider les champs avant tout appel à la base (nom, quantite, prix).'
    ],

    sections: [
      {
        title: 'Deux écrans, une fenêtre',
        html: [
          '<p>L\'application <code>ApplicationGestionStock</code> s\'ouvre sur l\'<strong>interface de ' +
          'connexion</strong> : champs host, database, user, password préremplis, bouton « Se connecter ». ' +
          'Si <code>db.connecter()</code> réussit, la méthode crée la table, <strong>détruit</strong> le ' +
          'frame de connexion (<code>destroy()</code>) et affiche l\'<strong>interface principale</strong> : ' +
          'formulaire d\'ajout/modification, boutons Ajouter / Modifier / Supprimer, tableau des produits. ' +
          'En cas d\'échec : <code>messagebox.showerror</code> et on reste sur l\'écran de connexion.</p>',
          '<p>La fenêtre se termine proprement : <code>root.protocol("WM_DELETE_WINDOW", ' +
          'fermer_application)</code> appelle <code>db.deconnecter()</code> avant ' +
          '<code>root.destroy()</code> — la base est fermée avant l\'écran.</p>',
          box('mnemo', 'Mnémotechnique — « d\'abord la porte, ensuite la salle »', 'pin',
            '    <p>Écran 1 : se connecter. Écran 2 : travailler. La fenêtre ne détruit jamais l\'écran ' +
            'actif avant d\'avoir bâti le suivant.</p>')
        ].join('\n')
      },
      {
        title: 'Widgets, layout et tableau',
        html: [
          '<p>Les <strong>widgets</strong> : <code>Label</code> (texte), <code>Entry</code> (saisie), ' +
          '<code>Button</code> (action avec <code>command=</code>), <code>Frame</code> et ' +
          '<code>LabelFrame</code> (cadres titrés), <code>ttk.Treeview</code> (tableau multi-colonnes), ' +
          '<code>Scrollbar</code> (ascenseur relié par <code>yscrollcommand</code>). Le <strong>layout</strong> : ' +
          '<code>pack</code> empile, <code>grid</code> place en lignes/colonnes avec <code>sticky</code> et ' +
          '<code>padx/pady</code>.</p>',
          '<p>Le <strong>Treeview</strong> définit ses colonnes (« ID », « Nom », « Catégorie », ' +
          '« Quantité », « Prix »), leurs en-têtes (<code>heading</code>) et largeurs ; le clic sur une ' +
          'ligne déclenche <code>selectionner_produit</code> via <code>bind("&lt;ButtonRelease-1&gt;", ' +
          '…)</code>, qui remplit le formulaire. <code>actualiser_tableau()</code> efface le tableau puis ' +
          'le recharge depuis <code>obtenir_tous_produits()</code> : la base reste la source unique de ' +
          'vérité.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>pack empile, grid place en grille : les deux ne se mélangent pas dans un même conteneur.</li>\n' +
            '      <li>command= appelle la méthode du bouton : pas de parenthèses, la référence suffit.</li>\n' +
            '      <li>Le Treeview n\'est pas la base : il se recharge depuis fetchall à chaque changement.</li>\n' +
            '      <li>bind relie un événement souris à une méthode : c\'est le clic qui remplit le formulaire.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Validation et boîtes de dialogue',
        html: [
          '<p>Avant tout appel à la base, <code>ajouter_produit()</code> vérifie : <strong>champs ' +
          'obligatoires non vides</strong> (nom, quantite, prix) sinon <code>showwarning</code> ; puis ' +
          '<code>int(quantite)</code> et <code>float(prix)</code> dans un try — une <code>ValueError</code> ' +
          'provoque <code>showerror</code> « Quantité et prix doivent être des nombres ». La validation ' +
          'vivant dans l\'interface, la base ne reçoit jamais de donnée absurde.</p>',
          '<p>Les quatre <strong>boîtes de dialogue</strong> : <code>showinfo</code> — succès (« Produit ' +
          'ajouté avec succès ») ; <code>showwarning</code> — champs manquants ou sélection absente ; ' +
          '<code>showerror</code> — échec de connexion, conversion impossible ; <code>askyesno</code> — ' +
          'confirmation avant suppression (« Voulez-vous vraiment supprimer… ? »), la suppression n\'a lieu ' +
          'que si l\'utilisateur répond oui.</p>',
          box('tech', 'Vérifier en Bash', 'terminal',
            '    <ul>\n' +
            '      <li>Les familles : entry/label/button/treeview → widget, pack/grid → layout, messagebox → boite.</li>\n' +
            '      <li>La validation : nom refuse le vide, quantite et prix testent nombre positif.</li>\n' +
            '      <li>Les dialogues : succès → showinfo, attention → showwarning, échec → showerror, suppression → askyesno.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le premier écran de l\'application :', opts: ['la connexion PostgreSQL', 'le tableau des produits', 'les statistiques'], correct: 0, exp: 'Interface de connexion d\'abord, principale ensuite.' },
      { q: 'Le widget de saisie d\'une ligne :', opts: ['Entry', 'Label', 'Frame'], correct: 0, exp: 'Entry pour les champs host, nom, quantite…' },
      { q: 'Le widget tableau multi-colonnes :', opts: ['ttk.Treeview', 'Entry', 'Scrollbar'], correct: 0, exp: 'Colonnes, en-têtes, sélection au clic.' },
      { q: 'Le clic sur une ligne du Treeview déclenche…', opts: ['le bind de sélection', 'la fermeture', 'un commit'], correct: 0, exp: '<ButtonRelease-1> remplit le formulaire.' },
      { q: 'Champs obligatoires non remplis :', opts: ['showwarning', 'showinfo', 'askyesno'], correct: 0, exp: 'Avertissement : on reste sur le formulaire.' },
      { q: 'Confirmation avant suppression :', opts: ['askyesno', 'showerror', 'showinfo'], correct: 0, exp: 'La suppression n\'a lieu que si l\'utilisateur confirme.' },
      { q: 'La conversion int(quantite) se fait…', opts: ['dans un try pour attraper ValueError', 'dans la base', 'jamais'], correct: 0, exp: 'ValueError → showerror : la base ne voit jamais de texte.' },
      { q: 'À la fermeture de la fenêtre :', opts: ['deconnecter() puis destroy()', 'destroy() direct', 'rien'], correct: 0, exp: 'root.protocol ferme la base avant l\'écran.' }
    ],

    pitfalls: [
      'Appeler la base sans validation : des quantités textuelles finissent en base.',
      'Utiliser showinfo pour un échec de connexion : c\'est showerror.',
      'Laisser le formulaire rempli après une opération : effacer_champs() existe.',
      'Oublier d\'actualiser le tableau après un ajout : l\'écran ment.'
    ],

    methodTitle: 'Méthode — câbler une action en trois gestes',
    method: [
      'Récupérer les champs et valider : vides refusés, nombres convertis dans un try.',
      'Appeler la méthode Database correspondante dans un if : succès ou messagebox.',
      'Effacer les champs et actualiser le tableau : l\'écran reflète la base.'
    ],

    summary: [
      'Deux écrans : connexion (destroy après succès), puis interface principale.',
      'Widgets : Label, Entry, Button, Frame, Treeview, Scrollbar ; pack et grid.',
      'Boîtes : showinfo (succès), showwarning (attention), showerror (échec), askyesno (confirmation).',
      'Validation : champs non vides, int/float dans un try — la base reçoit du propre.'
    ],

    checklist: [
      'Je décris l\'enchaînement des deux écrans.',
      'Je nomme chaque widget et son rôle.',
      'Je choisis la bonne messagebox pour une situation.',
      'Je valide les champs avant l\'appel à la base.'
    ],

    notions: [
      '<strong>Entry</strong> : champ de saisie d\'une ligne.',
      '<strong>Treeview</strong> : tableau ttk multi-colonnes avec sélection.',
      '<strong>pack / grid</strong> : les deux gestionnaires de mise en page.',
      '<strong>bind</strong> : relier un événement souris/clavier à une méthode.',
      '<strong>messagebox</strong> : showinfo, showwarning, showerror, askyesno.',
      '<strong>command=</strong> : référence de la méthode déclenchée par un Button.',
      '<strong>effacer_champs</strong> : nettoyage du formulaire après opération.',
      '<strong>WM_DELETE_WINDOW</strong> : protocole de fermeture propre.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les widgets et les quatre boîtes de dialogue.' },
      { cls: 'mid', text: '50–69 % — refais l\'enchaînement connexion puis principal.' },
      { cls: 'good', text: '70–89 % — cible la validation et le Treeview.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'L\'enchaînement des écrans ?', a: 'Connexion PostgreSQL → destroy du frame → interface principale (formulaire, boutons, tableau).' },
      { q: 'Les quatre boîtes de dialogue ?', a: 'showinfo (succès), showwarning (attention), showerror (échec), askyesno (confirmation oui/non).' },
      { q: 'Que valide ajouter_produit() avant l\'insertion ?', a: 'Champs obligatoires non vides, puis int(quantite) et float(prix) dans un try — ValueError → showerror.' },
      { q: 'Comment le Treeview suit-il la base ?', a: 'actualiser_tableau() efface les lignes puis les recharge depuis obtenir_tous_produits().' },
      { q: 'Comment l\'application se ferme-t-elle proprement ?', a: 'root.protocol("WM_DELETE_WINDOW") appelle db.deconnecter() avant root.destroy().' }
    ]
  }
];
