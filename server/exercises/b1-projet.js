'use strict';

module.exports = [
  {
    "id": "pr-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les quatre compétences du projet",
    "goal": "Valider le concept Python appliqué à chaque compétence du tutoriel.",
    "brief": "<p>Analysez chaque ligne proposée « competence concept » : concept est un code parmi <code>poo</code>, <code>tkinter</code>, <code>postgres</code> ou <code>crud</code>. Compétences du tutoriel : créer une interface graphique → <code>tkinter</code> ; connecter l'application à la base → <code>postgres</code> ; implémenter les opérations Create, Read, Update, Delete → <code>crud</code> ; organiser le code en classes (Database, ApplicationGestionStock) → <code>poo</code>. Pour chaque ligne il Indiquez <code>competence : OK</code> ou <code>competence : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c1-e1) — Les quatre compétences du projet\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq competences]\n# Données : 5\n# Données : interface tkinter\n# Données : connexion postgres\n# Données : operations crud\n# Données : classes poo\n# Données : modules poo\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : interface postgres\n# Données : connexion tkinter\n# Données : classes crud\n# Données : modules poo\nA_COMPLETER\n\n[Cas 3 — Revue objectifs]\n# Données : 5\n# Données : operations crud\n# Données : interface tkinter\n# Données : modules poo\n# Données : connexion postgres\n# Données : classes poo\nA_COMPLETER\n",
    "hints": [
      "Un case sur la compétence : interface → tkinter, connexion → postgres, operations → crud, classes → poo.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\ninterface tkinter\nconnexion postgres\noperations crud\n",
        "expected": "interface : OK\nconnexion : OK\noperations : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq competences",
        "stdin": "cas:1",
        "expected": "interface : OK\nconnexion : OK\noperations : OK\nclasses : OK\nmodules : OK\ncorrects : 5/5"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "interface : ERREUR\nconnexion : ERREUR\nclasses : ERREUR\nmodules : OK\ncorrects : 1/4"
      },
      {
        "label": "Revue objectifs",
        "stdin": "cas:3",
        "expected": "operations : OK\ninterface : OK\nmodules : OK\nconnexion : OK\nclasses : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\ninterface : OK\nconnexion : OK\noperations : OK\ncorrects : 3/3\n\n[Cas 1 — Les cinq competences]\ninterface : OK\nconnexion : OK\noperations : OK\nclasses : OK\nmodules : OK\ncorrects : 5/5\n\n[Cas 2 — Trois confusions]\ninterface : ERREUR\nconnexion : ERREUR\nclasses : ERREUR\nmodules : OK\ncorrects : 1/4\n\n[Cas 3 — Revue objectifs]\noperations : OK\ninterface : OK\nmodules : OK\nconnexion : OK\nclasses : OK\ncorrects : 5/5"
  },
  {
    "id": "pr-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Prérequis de l'environnement",
    "goal": "Décider si la machine d'un étudiant peut démarrer le projet.",
    "brief": "<p>Analysez chaque ligne proposée « poste python tkinter psql » où python est la version installée (ex. 37 pour 3.7), tkinter et psql valent <code>oui</code> ou <code>non</code>. Prérequis du tutoriel : <strong>Python 3.7 ou supérieur</strong>, Tkinter installé, PostgreSQL installé. Pour chaque ligne il Indiquez <code>poste : prets</code> si les trois conditions sont réunies, sinon <code>poste : a equiper</code>, puis <code>bilan : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c1-e2) — Prérequis de l'environnement\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Salle informatique]\n# Données : 4\n# Données : a 37 oui oui\n# Données : b 310 oui oui\n# Données : c 37 oui non\n# Données : d 39 non oui\nA_COMPLETER\n\n[Cas 2 — Tout juste conforme]\n# Données : 2\n# Données : mini 37 oui oui\n# Données : presque 37 oui non\nA_COMPLETER\n\n[Cas 3 — Promotion complete]\n# Données : 5\n# Données : p1 39 oui oui\n# Données : p2 37 oui oui\n# Données : p3 310 oui oui\n# Données : p4 36 oui oui\n# Données : p5 38 non non\nA_COMPLETER\n",
    "hints": [
      "Trois conditions en ET : -ge 37, tkinter = oui, psql = oui.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\netudiant1 39 oui oui\netudiant2 37 non oui\netudiant3 36 oui oui\n",
        "expected": "etudiant1 : prets\netudiant2 : a equiper\netudiant3 : a equiper\nbilan : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Salle informatique",
        "stdin": "cas:1",
        "expected": "a : prets\nb : prets\nc : a equiper\nd : a equiper\nbilan : 2/4"
      },
      {
        "label": "Tout juste conforme",
        "stdin": "cas:2",
        "expected": "mini : prets\npresque : a equiper\nbilan : 1/2"
      },
      {
        "label": "Promotion complete",
        "stdin": "cas:3",
        "expected": "p1 : prets\np2 : prets\np3 : prets\np4 : a equiper\np5 : a equiper\nbilan : 3/5"
      }
    ],
    "solution": "[Exemple]\netudiant1 : prets\netudiant2 : a equiper\netudiant3 : a equiper\nbilan : 1/3\n\n[Cas 1 — Salle informatique]\na : prets\nb : prets\nc : a equiper\nd : a equiper\nbilan : 2/4\n\n[Cas 2 — Tout juste conforme]\nmini : prets\npresque : a equiper\nbilan : 1/2\n\n[Cas 3 — Promotion complete]\np1 : prets\np2 : prets\np3 : prets\np4 : a equiper\np5 : a equiper\nbilan : 3/5"
  },
  {
    "id": "pr-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Structure du projet",
    "goal": "Vérifier le rôle de chaque fichier de l'organisation imposée.",
    "brief": "<p>Analysez chaque ligne proposée « fichier role » : role est un code parmi <code>interface</code>, <code>database</code>, <code>deps</code> ou <code>doc</code>. Organisation du tutoriel : <code>main.py</code> → <code>interface</code> (Tkinter) ; <code>database.py</code> → <code>database</code> (module de gestion PostgreSQL) ; <code>requirements.txt</code> → <code>deps</code> (psycopg2-binary) ; <code>README.md</code> → <code>doc</code>. Pour chaque ligne il Indiquez <code>fichier : OK</code> ou <code>fichier : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c1-e3) — Structure du projet\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre fichiers]\n# Données : 4\n# Données : main interface\n# Données : database database\n# Données : requirements deps\n# Données : readme doc\nA_COMPLETER\n\n[Cas 2 — Trois erreurs]\n# Données : 4\n# Données : main database\n# Données : requirements interface\n# Données : readme deps\n# Données : main interface\nA_COMPLETER\n\n[Cas 3 — Depot git]\n# Données : 5\n# Données : readme doc\n# Données : main interface\n# Données : requirements deps\n# Données : database database\n# Données : readme doc\nA_COMPLETER\n",
    "hints": [
      "Un case sur le fichier : main → interface, database → database, requirements → deps, readme → doc.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nmain interface\ndatabase database\nrequirements deps\n",
        "expected": "main : OK\ndatabase : OK\nrequirements : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les quatre fichiers",
        "stdin": "cas:1",
        "expected": "main : OK\ndatabase : OK\nrequirements : OK\nreadme : OK\ncorrects : 4/4"
      },
      {
        "label": "Trois erreurs",
        "stdin": "cas:2",
        "expected": "main : ERREUR\nrequirements : ERREUR\nreadme : ERREUR\nmain : OK\ncorrects : 1/4"
      },
      {
        "label": "Depot git",
        "stdin": "cas:3",
        "expected": "readme : OK\nmain : OK\nrequirements : OK\ndatabase : OK\nreadme : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\nmain : OK\ndatabase : OK\nrequirements : OK\ncorrects : 3/3\n\n[Cas 1 — Les quatre fichiers]\nmain : OK\ndatabase : OK\nrequirements : OK\nreadme : OK\ncorrects : 4/4\n\n[Cas 2 — Trois erreurs]\nmain : ERREUR\nrequirements : ERREUR\nreadme : ERREUR\nmain : OK\ncorrects : 1/4\n\n[Cas 3 — Depot git]\nreadme : OK\nmain : OK\nrequirements : OK\ndatabase : OK\nreadme : OK\ncorrects : 5/5"
  },
  {
    "id": "pr-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La table produits",
    "goal": "Valider le type PostgreSQL de chaque colonne de la table produits.",
    "brief": "<p>Analysez chaque ligne proposée « colonne type » : type est un code parmi <code>serial</code>, <code>varchar</code>, <code>integer</code> ou <code>decimal</code>. Table du tutoriel : <code>id</code> clé primaire auto-incrémentée → <code>serial</code> ; <code>nom</code> et <code>categorie</code> → <code>varchar</code> ; <code>quantite</code> → <code>integer</code> ; <code>prix</code> → <code>decimal</code> (10,2). Pour chaque ligne il Indiquez <code>colonne : OK</code> ou <code>colonne : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c2-e1) — La table produits\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq colonnes]\n# Données : 5\n# Données : id serial\n# Données : nom varchar\n# Données : categorie varchar\n# Données : quantite integer\n# Données : prix decimal\nA_COMPLETER\n\n[Cas 2 — Trois erreurs de type]\n# Données : 4\n# Données : id integer\n# Données : quantite serial\n# Données : prix integer\n# Données : nom varchar\nA_COMPLETER\n\n[Cas 3 — Schema complet]\n# Données : 5\n# Données : prix decimal\n# Données : nom varchar\n# Données : id serial\n# Données : categorie varchar\n# Données : quantite integer\nA_COMPLETER\n",
    "hints": [
      "Un case sur la colonne : id → serial, nom/categorie → varchar, quantite → integer, prix → decimal.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nid serial\nquantite integer\nprix decimal\n",
        "expected": "id : OK\nquantite : OK\nprix : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq colonnes",
        "stdin": "cas:1",
        "expected": "id : OK\nnom : OK\ncategorie : OK\nquantite : OK\nprix : OK\ncorrects : 5/5"
      },
      {
        "label": "Trois erreurs de type",
        "stdin": "cas:2",
        "expected": "id : ERREUR\nquantite : ERREUR\nprix : ERREUR\nnom : OK\ncorrects : 1/4"
      },
      {
        "label": "Schema complet",
        "stdin": "cas:3",
        "expected": "prix : OK\nnom : OK\nid : OK\ncategorie : OK\nquantite : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\nid : OK\nquantite : OK\nprix : OK\ncorrects : 3/3\n\n[Cas 1 — Les cinq colonnes]\nid : OK\nnom : OK\ncategorie : OK\nquantite : OK\nprix : OK\ncorrects : 5/5\n\n[Cas 2 — Trois erreurs de type]\nid : ERREUR\nquantite : ERREUR\nprix : ERREUR\nnom : OK\ncorrects : 1/4\n\n[Cas 3 — Schema complet]\nprix : OK\nnom : OK\nid : OK\ncategorie : OK\nquantite : OK\ncorrects : 5/5"
  },
  {
    "id": "pr-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Connexion PostgreSQL : oui ou non ?",
    "goal": "Décider si la connexion peut s'établir et réagir comme la méthode connecter().",
    "brief": "<p>La méthode <code>connecter()</code> du tutoriel tente la connexion et renvoie True en cas de succès, False en cas d'échec (exception Error). Analysez chaque ligne proposée « service etat » : service est un code parmi <code>serveur</code>, <code>mdp</code>, <code>base</code> — etat vaut <code>ok</code> ou <code>ko</code>. Si les trois services sont ok, il Indiquez <code>connexion reussie</code> ; dès qu'un service est ko, il Indiquez <code>erreur : service</code> et s'arrête (comme le try/except qui renvoie False au premier problème).</p>",
    "starter": "# Grille d'analyse (pr-c2-e2) — Connexion PostgreSQL : oui ou non ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Serveur eteint]\n# Données : serveur ko\n# Données : mdp ok\n# Données : base ok\nA_COMPLETER\n\n[Cas 2 — Base absente]\n# Données : serveur ok\n# Données : mdp ok\n# Données : base ko\nA_COMPLETER\n\n[Cas 3 — Double defaut]\n# Données : serveur ko\n# Données : mdp ko\n# Données : base ok\nA_COMPLETER\n",
    "hints": [
      "Dès que etat vaut ko : echo \"erreur : $service\" puis exit 0.",
      "Si la boucle se termine sans défaut, afficher le verdict de succès."
    ],
    "examples": [
      {
        "stdin": "serveur ok\nmdp ok\nbase ok\n",
        "expected": "connexion reussie"
      },
      {
        "stdin": "serveur ok\nmdp ko\nbase ok\n",
        "expected": "erreur : mdp"
      }
    ],
    "tests": [
      {
        "label": "Serveur eteint",
        "stdin": "cas:1",
        "expected": "erreur : serveur"
      },
      {
        "label": "Base absente",
        "stdin": "cas:2",
        "expected": "erreur : base"
      },
      {
        "label": "Double defaut",
        "stdin": "cas:3",
        "expected": "erreur : serveur"
      }
    ],
    "solution": "[Exemple]\nconnexion reussie\n\n[Cas 1 — Serveur eteint]\nerreur : serveur\n\n[Cas 2 — Base absente]\nerreur : base\n\n[Cas 3 — Double defaut]\nerreur : serveur"
  },
  {
    "id": "pr-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L'ordre des opérations SQL",
    "goal": "Remettre chaque ordre CRUD devant sa requête SQL et valider l'ordre du cycle.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Pour chaque ligne il Indiquez <code>etape N : OK</code> quand l'opération ET sa requête sont justes, sinon <code>etape N : NON</code>, puis <code>etapes correctes : X/4</code>.</p>",
    "starter": "# Grille d'analyse (pr-c2-e3) — L'ordre des opérations SQL\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dernieres etapes inversees]\n# Données : create insert\n# Données : read select\n# Données : delete delete\n# Données : update update\nA_COMPLETER\n\n[Cas 2 — Requetes echangees]\n# Données : create select\n# Données : read insert\n# Données : update update\n# Données : delete delete\nA_COMPLETER\n\n[Cas 3 — Operations dans le desordre]\n# Données : read select\n# Données : create insert\n# Données : update update\n# Données : delete delete\nA_COMPLETER\n",
    "hints": [
      "Un case sur le numéro : 1 → create/insert, 2 → read/select, 3 → update/update, 4 → delete/delete.",
      "Les deux conditions doivent être vraies en même temps : operation ET sql."
    ],
    "examples": [
      {
        "stdin": "create insert\nread select\nupdate update\ndelete delete\n",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4"
      }
    ],
    "tests": [
      {
        "label": "Dernieres etapes inversees",
        "stdin": "cas:1",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4"
      },
      {
        "label": "Requetes echangees",
        "stdin": "cas:2",
        "expected": "etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
      },
      {
        "label": "Operations dans le desordre",
        "stdin": "cas:3",
        "expected": "etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
      }
    ],
    "solution": "[Exemple]\netape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4\n\n[Cas 1 — Dernieres etapes inversees]\netape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4\n\n[Cas 2 — Requetes echangees]\netape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4\n\n[Cas 3 — Operations dans le desordre]\netape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
  },
  {
    "id": "pr-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Widget ou méthode ?",
    "goal": "Associer chaque élément Tkinter du tutoriel à sa famille.",
    "brief": "<p>Analysez chaque ligne proposée « element famille » : famille est un code parmi <code>widget</code>, <code>layout</code> ou <code>boite</code>. Éléments du tutoriel : Entry, Label, Button, Frame, Treeview → <code>widget</code> ; pack, grid → <code>layout</code> ; messagebox (showinfo, showerror, askyesno) → <code>boite</code>. Pour chaque ligne il Indiquez <code>element : OK</code> ou <code>element : ERREUR</code>, puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c3-e1) — Widget ou méthode ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les six elements]\n# Données : 6\n# Données : entry widget\n# Données : label widget\n# Données : button widget\n# Données : treeview widget\n# Données : grid layout\n# Données : showerror boite\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : pack widget\n# Données : entry layout\n# Données : messagebox widget\n# Données : button widget\nA_COMPLETER\n\n[Cas 3 — Interface complete]\n# Données : 5\n# Données : treeview widget\n# Données : showinfo boite\n# Données : pack layout\n# Données : label widget\n# Données : askyesno boite\nA_COMPLETER\n",
    "hints": [
      "Un case sur l'élément : entry/label/button/treeview → widget, pack/grid → layout, messagebox → boite.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nentry widget\npack layout\nmessagebox boite\n",
        "expected": "entry : OK\npack : OK\nmessagebox : OK\nconformes : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les six elements",
        "stdin": "cas:1",
        "expected": "entry : OK\nlabel : OK\nbutton : OK\ntreeview : OK\ngrid : OK\nshowerror : OK\nconformes : 6/6"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "pack : ERREUR\nentry : ERREUR\nmessagebox : ERREUR\nbutton : OK\nconformes : 1/4"
      },
      {
        "label": "Interface complete",
        "stdin": "cas:3",
        "expected": "treeview : OK\nshowinfo : OK\npack : OK\nlabel : OK\naskyesno : OK\nconformes : 5/5"
      }
    ],
    "solution": "[Exemple]\nentry : OK\npack : OK\nmessagebox : OK\nconformes : 3/3\n\n[Cas 1 — Les six elements]\nentry : OK\nlabel : OK\nbutton : OK\ntreeview : OK\ngrid : OK\nshowerror : OK\nconformes : 6/6\n\n[Cas 2 — Trois confusions]\npack : ERREUR\nentry : ERREUR\nmessagebox : ERREUR\nbutton : OK\nconformes : 1/4\n\n[Cas 3 — Interface complete]\ntreeview : OK\nshowinfo : OK\npack : OK\nlabel : OK\naskyesno : OK\nconformes : 5/5"
  },
  {
    "id": "pr-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Validation des champs de saisie",
    "goal": "Appliquer la validation du formulaire avant tout appel à la base.",
    "brief": "<p>La méthode <code>ajouter_produit()</code> du tutoriel refuse l'insertion si un champ obligatoire est vide, puis convertit quantite en int et prix en float. Analysez chaque ligne proposée « champ valeur » : champ est un code parmi <code>nom</code>, <code>quantite</code>, <code>prix</code> — valeur est le contenu saisi (un seul mot ; <code>-</code> = vide). Règles : nom non vide ; quantite nombre entier positif ; prix nombre positif. Pour chaque ligne il Indiquez <code>champ : OK</code> si la règle est respectée, sinon <code>champ : REFUSE</code>, puis <code>valides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c3-e2) — Validation des champs de saisie\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Formulaire complet]\n# Données : 5\n# Données : nom clavier\n# Données : quantite 12\n# Données : prix 2500\n# Données : nom -\n# Données : prix zero\nA_COMPLETER\n\n[Cas 2 — Nombres invalides]\n# Données : 3\n# Données : quantite deux\n# Données : quantite -3\n# Données : prix -1\nA_COMPLETER\n\n[Cas 3 — Relecture fiche]\n# Données : 4\n# Données : nom ecran\n# Données : quantite 0\n# Données : prix 100\n# Données : nom -\nA_COMPLETER\n",
    "hints": [
      "Un case sur le champ : nom refuse seulement -, quantite/prix testent -gt 0 apres un test numerique.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nnom clavier\nquantite 5\nprix -\n",
        "expected": "nom : OK\nquantite : OK\nprix : REFUSE\nvalides : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Formulaire complet",
        "stdin": "cas:1",
        "expected": "nom : OK\nquantite : OK\nprix : OK\nnom : REFUSE\nprix : REFUSE\nvalides : 3/5"
      },
      {
        "label": "Nombres invalides",
        "stdin": "cas:2",
        "expected": "quantite : REFUSE\nquantite : REFUSE\nprix : REFUSE\nvalides : 0/3"
      },
      {
        "label": "Relecture fiche",
        "stdin": "cas:3",
        "expected": "nom : OK\nquantite : REFUSE\nprix : OK\nnom : REFUSE\nvalides : 2/4"
      }
    ],
    "solution": "[Exemple]\nnom : OK\nquantite : OK\nprix : REFUSE\nvalides : 2/3\n\n[Cas 1 — Formulaire complet]\nnom : OK\nquantite : OK\nprix : OK\nnom : REFUSE\nprix : REFUSE\nvalides : 3/5\n\n[Cas 2 — Nombres invalides]\nquantite : REFUSE\nquantite : REFUSE\nprix : REFUSE\nvalides : 0/3\n\n[Cas 3 — Relecture fiche]\nnom : OK\nquantite : REFUSE\nprix : OK\nnom : REFUSE\nvalides : 2/4"
  },
  {
    "id": "pr-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Message ou boîte ?",
    "goal": "Choisir la bonne boîte de dialogue Tkinter pour chaque situation.",
    "brief": "<p>Analysez chaque ligne proposée « situation boite » : boite est un code parmi <code>showinfo</code>, <code>showwarning</code>, <code>showerror</code> ou <code>askyesno</code>. Usages du tutoriel : produit ajouté avec succès → <code>showinfo</code> ; champs obligatoires non remplis → <code>showwarning</code> ; impossible de se connecter → <code>showerror</code> ; confirmation avant suppression → <code>askyesno</code>. Pour chaque ligne il Indiquez <code>situation : conforme</code> ou <code>situation : a revoir</code>, puis <code>avis : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c3-e3) — Message ou boîte ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre dialogues]\n# Données : 4\n# Données : succes showinfo\n# Données : champs showwarning\n# Données : echec showerror\n# Données : suppression askyesno\nA_COMPLETER\n\n[Cas 2 — Trois erreurs]\n# Données : 4\n# Données : succes showerror\n# Données : echec showinfo\n# Données : suppression showinfo\n# Données : champs showwarning\nA_COMPLETER\n\n[Cas 3 — Revue UX]\n# Données : 5\n# Données : suppression askyesno\n# Données : succes showinfo\n# Données : echec showerror\n# Données : champs showwarning\n# Données : succes showinfo\nA_COMPLETER\n",
    "hints": [
      "Un case sur la situation : succes/ajoute → showinfo, champs/attention → showwarning, echec/connexion → showerror, suppression/confirme → askyesno.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nsucces showinfo\nchamps showwarning\nsuppression askyesno\n",
        "expected": "succes : conforme\nchamps : conforme\nsuppression : conforme\navis : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les quatre dialogues",
        "stdin": "cas:1",
        "expected": "succes : conforme\nchamps : conforme\nechec : conforme\nsuppression : conforme\navis : 4/4"
      },
      {
        "label": "Trois erreurs",
        "stdin": "cas:2",
        "expected": "succes : a revoir\nechec : a revoir\nsuppression : a revoir\nchamps : conforme\navis : 1/4"
      },
      {
        "label": "Revue UX",
        "stdin": "cas:3",
        "expected": "suppression : conforme\nsucces : conforme\nechec : conforme\nchamps : conforme\nsucces : conforme\navis : 5/5"
      }
    ],
    "solution": "[Exemple]\nsucces : conforme\nchamps : conforme\nsuppression : conforme\navis : 3/3\n\n[Cas 1 — Les quatre dialogues]\nsucces : conforme\nchamps : conforme\nechec : conforme\nsuppression : conforme\navis : 4/4\n\n[Cas 2 — Trois erreurs]\nsucces : a revoir\nechec : a revoir\nsuppression : a revoir\nchamps : conforme\navis : 1/4\n\n[Cas 3 — Revue UX]\nsuppression : conforme\nsucces : conforme\nechec : conforme\nchamps : conforme\nsucces : conforme\navis : 5/5"
  },
  {
    "id": "pr-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Ajout au stock",
    "goal": "Simuler l'ajout de produits et compter les insertions réussies.",
    "brief": "<p>Analysez chaque ligne proposée « produit quantite » : quantite est le stock initial (nombre positif ; <code>-</code> = champ vide, insertion refusée comme dans le tutoriel). Pour chaque ligne il Indiquez <code>produit : ajoute</code> si la quantité est un entier positif, sinon <code>produit : refuse</code>, puis <code>ajouts : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c4-e1) — Ajout au stock\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Livraison du jour]\n# Données : 5\n# Données : clavier 10\n# Données : ecran 2\n# Données : souris -\n# Données : usb 0\n# Données : hub 7\nA_COMPLETER\n\n[Cas 2 — Champs vides]\n# Données : 3\n# Données : a -\n# Données : b -\n# Données : c 1\nA_COMPLETER\n\n[Cas 3 — Reception complete]\n# Données : 4\n# Données : cable 25\n# Données : chargeur 15\n# Données : adaptateur 8\n# Données : sacoche 4\nA_COMPLETER\n",
    "hints": [
      "Refuse si quantite vaut - ou n'est pas un entier positif (test *[!0-9]* puis -gt 0).",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nclavier 10\necran -\nsouris 3\n",
        "expected": "clavier : ajoute\necran : refuse\nsouris : ajoute\najouts : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Livraison du jour",
        "stdin": "cas:1",
        "expected": "clavier : ajoute\necran : ajoute\nsouris : refuse\nusb : refuse\nhub : ajoute\najouts : 3/5"
      },
      {
        "label": "Champs vides",
        "stdin": "cas:2",
        "expected": "a : refuse\nb : refuse\nc : ajoute\najouts : 1/3"
      },
      {
        "label": "Reception complete",
        "stdin": "cas:3",
        "expected": "cable : ajoute\nchargeur : ajoute\nadaptateur : ajoute\nsacoche : ajoute\najouts : 4/4"
      }
    ],
    "solution": "[Exemple]\nclavier : ajoute\necran : refuse\nsouris : ajoute\najouts : 2/3\n\n[Cas 1 — Livraison du jour]\nclavier : ajoute\necran : ajoute\nsouris : refuse\nusb : refuse\nhub : ajoute\najouts : 3/5\n\n[Cas 2 — Champs vides]\na : refuse\nb : refuse\nc : ajoute\najouts : 1/3\n\n[Cas 3 — Reception complete]\ncable : ajoute\nchargeur : ajoute\nadaptateur : ajoute\nsacoche : ajoute\najouts : 4/4"
  },
  {
    "id": "pr-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Mouvement de stock",
    "goal": "Appliquer entrées et sorties au stock existant, comme UPDATE quantite.",
    "brief": "<p>Analysez chaque ligne proposée « produit mouvement » où mouvement est un entier <strong>positif pour une entrée</strong> (le stock augmente) et <strong>préfixé de moins pour une sortie</strong> (le stock diminue). Le stock de départ de chaque produit est son entrée précédente : le premier mouvement d'un produit part de 0. Une sortie qui rendrait le stock négatif est refusée (<code>produit : stock insuffisant</code>, mouvement ignoré) ; sinon Indiquez le nouveau stock (<code>produit : stock=X</code>). Bilan final : <code>mouvements : n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c4-e2) — Mouvement de stock\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Journee normale]\n# Données : 6\n# Données : cable 20\n# Données : cable -5\n# Données : chargeur 3\n# Données : chargeur -2\n# Données : cable -15\n# Données : chargeur -4\nA_COMPLETER\n\n[Cas 2 — Sortie sans entree]\n# Données : 2\n# Données : usb -3\n# Données : usb 10\nA_COMPLETER\n\n[Cas 3 — Inventaire hebdo]\n# Données : 5\n# Données : ecran 8\n# Données : ecran -8\n# Données : ecran 12\n# Données : souris 30\n# Données : souris -30\nA_COMPLETER\n",
    "hints": [
      "Un mouvement qui commence par - est une sortie : quantite = valeur sans le signe.",
      "Sortie refusée si stock[produit] < quantite ; sinon stock += mouvement (entrée) ou -= (sortie)."
    ],
    "examples": [
      {
        "stdin": "4\nclavier 10\nclavier -4\nsouris 5\nsouris -9\n",
        "expected": "clavier : stock=10\nclavier : stock=6\nsouris : stock=5\nsouris : stock insuffisant\nmouvements : 4"
      }
    ],
    "tests": [
      {
        "label": "Journee normale",
        "stdin": "cas:1",
        "expected": "cable : stock=20\ncable : stock=15\nchargeur : stock=3\nchargeur : stock=1\ncable : stock=0\nchargeur : stock insuffisant\nmouvements : 6"
      },
      {
        "label": "Sortie sans entree",
        "stdin": "cas:2",
        "expected": "usb : stock insuffisant\nusb : stock=10\nmouvements : 2"
      },
      {
        "label": "Inventaire hebdo",
        "stdin": "cas:3",
        "expected": "ecran : stock=8\necran : stock=0\necran : stock=12\nsouris : stock=30\nsouris : stock=0\nmouvements : 5"
      }
    ],
    "solution": "[Exemple]\nclavier : stock=10\nclavier : stock=6\nsouris : stock=5\nsouris : stock insuffisant\nmouvements : 4\n\n[Cas 1 — Journee normale]\ncable : stock=20\ncable : stock=15\nchargeur : stock=3\nchargeur : stock=1\ncable : stock=0\nchargeur : stock insuffisant\nmouvements : 6\n\n[Cas 2 — Sortie sans entree]\nusb : stock insuffisant\nusb : stock=10\nmouvements : 2\n\n[Cas 3 — Inventaire hebdo]\necran : stock=8\necran : stock=0\necran : stock=12\nsouris : stock=30\nsouris : stock=0\nmouvements : 5"
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
      "Deux lignes de bilan à la fin : suppressions : X puis introuvables : Y."
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
        "expected": "a : supprime\nb : conserve\nc : supprime\nd : introuvable≠ : supprime\nsuppressions : 3\nintrouvables : 1"
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
    "solution": "[Exemple]\nclavier : supprime\necran : conserve\nsouris : introuvable\nsuppressions : 1\nintrouvables : 1\n\n[Cas 1 — Nettoyage du catalogue]\na : supprime\nb : conserve\nc : supprime\nd : introuvable≠ : supprime\nsuppressions : 3\nintrouvables : 1\n\n[Cas 2 — Tout refuse]\nx : conserve\ny : conserve\nz : introuvable\nsuppressions : 0\nintrouvables : 1\n\n[Cas 3 — Purge finale]\np1 : supprime\np2 : supprime\np3 : supprime\np4 : supprime\nsuppressions : 4\nintrouvables : 0"
  },
  {
    "id": "pr-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Alertes de stock bas",
    "goal": "Signaler chaque produit sous son seuil d'alerte, comme l'amélioration 2 du tutoriel.",
    "brief": "<p>Analysez chaque ligne proposée « produit seuil stock ». Pour chaque ligne il Indiquez <code>produit : rupture</code> si stock vaut 0, <code>produit : alerte</code> si le stock est strictement inférieur au seuil (amélioration « avertir si quantité &lt; seuil »), sinon <code>produit : ok</code>. Bilan : <code>ruptures : R</code> puis <code>alertes : A</code> (dans cet ordre, sur deux lignes).</p>",
    "starter": "# Grille d'analyse (pr-c5-e1) — Alertes de stock bas\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Inventaire du soir]\n# Données : 5\n# Données : a 5 0\n# Données : b 3 2\n# Données : c 4 4\n# Données : d 2 1\n# Données : e 6 50\nA_COMPLETER\n\n[Cas 2 — Rupture generale]\n# Données : 3\n# Données : x 1 0\n# Données : y 2 0\n# Données : z 1 0\nA_COMPLETER\n\n[Cas 3 — Stock sain]\n# Données : 4\n# Données : p1 5 5\n# Données : p2 10 30\n# Données : p3 2 8\n# Données : p4 7 7\nA_COMPLETER\n",
    "hints": [
      "Trois cas dans l'ordre : stock -eq 0 → rupture ; stock -lt seuil → alerte ; sinon ok.",
      "Deux lignes de bilan à la fin : ruptures : R puis alertes : A."
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
        "expected": "a : rupture\nb : alerte\nc : ok\nd : alerte≠ : ok\nruptures : 1\nalertes : 2"
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
    "solution": "[Exemple]\nclavier : alerte\necran : rupture\nsouris : ok\nruptures : 1\nalertes : 1\n\n[Cas 1 — Inventaire du soir]\na : rupture\nb : alerte\nc : ok\nd : alerte≠ : ok\nruptures : 1\nalertes : 2\n\n[Cas 2 — Rupture generale]\nx : rupture\ny : rupture\nz : rupture\nruptures : 3\nalertes : 0\n\n[Cas 3 — Stock sain]\np1 : ok\np2 : ok\np3 : ok\np4 : ok\nruptures : 0\nalertes : 0"
  },
  {
    "id": "pr-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Valeur totale du stock",
    "goal": "Calculer la valeur de chaque ligne (quantite × prix) puis la valeur totale.",
    "brief": "<p>Amélioration 2 du tutoriel : « calculer la valeur totale du stock ». Analysez chaque ligne proposée « produit quantite prix » (prix en FCFA, entier). Pour chaque ligne il Indiquez <code>produit : X FCFA</code> avec X = quantite × prix, puis la ligne totale <code>valeur totale : T FCFA</code>.</p>",
    "starter": "# Grille d'analyse (pr-c5-e2) — Valeur totale du stock\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rayon informatique]\n# Données : 4\n# Données : usb 20 1500\n# Données : cable 15 2000\n# Données : hub 8 7500\n# Données : chargeur 6 12000\nA_COMPLETER\n\n[Cas 2 — Ligne vide]\n# Données : 3\n# Données : a 0 5000\n# Données : b 3 0\n# Données : c 2 100\nA_COMPLETER\n\n[Cas 3 — Revalorisation]\n# Données : 2\n# Données : ecran 7 45000\n# Données : imprimante 3 85000\nA_COMPLETER\n",
    "hints": [
      "Ligne = quantite * prix ; affiche puis ajoute au total.",
      "La ligne totale sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nclavier 10 5000\nsouris 5 2500\necran 2 45000\n",
        "expected": "clavier : 50000 FCFA\nsouris : 12500 FCFA\necran : 90000 FCFA\nvaleur totale : 152500 FCFA"
      }
    ],
    "tests": [
      {
        "label": "Rayon informatique",
        "stdin": "cas:1",
        "expected": "usb : 30000 FCFA\ncable : 30000 FCFA\nhub : 60000 FCFA\nchargeur : 72000 FCFA\nvaleur totale : 192000 FCFA"
      },
      {
        "label": "Ligne vide",
        "stdin": "cas:2",
        "expected": "a : 0 FCFA\nb : 0 FCFA\nc : 200 FCFA\nvaleur totale : 200 FCFA"
      },
      {
        "label": "Revalorisation",
        "stdin": "cas:3",
        "expected": "ecran : 315000 FCFA\nimprimante : 255000 FCFA\nvaleur totale : 570000 FCFA"
      }
    ],
    "solution": "[Exemple]\nclavier : 50000 FCFA\nsouris : 12500 FCFA\necran : 90000 FCFA\nvaleur totale : 152500 FCFA\n\n[Cas 1 — Rayon informatique]\nusb : 30000 FCFA\ncable : 30000 FCFA\nhub : 60000 FCFA\nchargeur : 72000 FCFA\nvaleur totale : 192000 FCFA\n\n[Cas 2 — Ligne vide]\na : 0 FCFA\nb : 0 FCFA\nc : 200 FCFA\nvaleur totale : 200 FCFA\n\n[Cas 3 — Revalorisation]\necran : 315000 FCFA\nimprimante : 255000 FCFA\nvaleur totale : 570000 FCFA"
  },
  {
    "id": "pr-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Recherche et tri du catalogue",
    "goal": "Chercher les produits d'une catégorie puis désigner le plus cher et le mieux stocké.",
    "brief": "<p>Améliorations 1 et 4 du tutoriel. Analysez chaque ligne proposée « produit categorie prix stock » puis une ligne <code>cible</code> (la catégorie recherchée). Pour chaque ligne de la catégorie cible il Indiquez <code>produit : prix=X stock=Y</code> ; à la fin il Indiquez <code>plus cher : P (X FCFA)</code> (produit de la cible au prix le plus élevé ; en cas d'égalité, le premier rencontré gagne), puis <code>trouves : K</code>.</p>",
    "starter": "# Grille d'analyse (pr-c5-e3) — Recherche et tri du catalogue\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rayon reseau]\n# Données : 5\n# Données : switch Reseau 45000 2\n# Données : routeur Reseau 62000 1\n# Données : cable Reseau 2000 40\n# Données : imprimante Bureau 85000 3\n# Données : prise Reseau 1500 60\n# Données : Reseau\nA_COMPLETER\n\n[Cas 2 — Categorie absente]\n# Données : 3\n# Données : a Periph 100 1\n# Données : b Bureau 200 2\n# Données : c Periph 300 3\n# Données : Son\nA_COMPLETER\n\n[Cas 3 — Egalite de prix]\n# Données : 3\n# Données : x Stock 500 10\n# Données : y Stock 500 20\n# Données : z Bureau 900 1\n# Données : Stock\nA_COMPLETER\n",
    "hints": [
      "Lisez d'abord les n lignes dans des tableaux, puis la cible, puis boucle sur les tableaux.",
      "Le max : si prix -gt meilleur_prix OU meilleur = -, mettre à jour meilleur et meilleur_prix."
    ],
    "examples": [
      {
        "stdin": "4\nclavier Periph 5000 12\necran Affichage 45000 3\nsouris Periph 2500 30\nhub Periph 7500 8\nPeriph\n",
        "expected": "clavier : prix=5000 stock=12\nsouris : prix=2500 stock=30\nhub : prix=7500 stock=8\nplus cher : hub (7500 FCFA)\ntrouves : 3"
      }
    ],
    "tests": [
      {
        "label": "Rayon reseau",
        "stdin": "cas:1",
        "expected": "switch : prix=45000 stock=2\nrouteur : prix=62000 stock=1\ncable : prix=2000 stock=40\nprise : prix=1500 stock=60\nplus cher : routeur (62000 FCFA)\ntrouves : 4"
      },
      {
        "label": "Categorie absente",
        "stdin": "cas:2",
        "expected": "plus cher : - (0 FCFA)\ntrouves : 0"
      },
      {
        "label": "Egalite de prix",
        "stdin": "cas:3",
        "expected": "x : prix=500 stock=10\ny : prix=500 stock=20\nplus cher : x (500 FCFA)\ntrouves : 2"
      }
    ],
    "solution": "[Exemple]\nclavier : prix=5000 stock=12\nsouris : prix=2500 stock=30\nhub : prix=7500 stock=8\nplus cher : hub (7500 FCFA)\ntrouves : 3\n\n[Cas 1 — Rayon reseau]\nswitch : prix=45000 stock=2\nrouteur : prix=62000 stock=1\ncable : prix=2000 stock=40\nprise : prix=1500 stock=60\nplus cher : routeur (62000 FCFA)\ntrouves : 4\n\n[Cas 2 — Categorie absente]\nplus cher : - (0 FCFA)\ntrouves : 0\n\n[Cas 3 — Egalite de prix]\nx : prix=500 stock=10\ny : prix=500 stock=20\nplus cher : x (500 FCFA)\ntrouves : 2"
  },
  {
    "id": "pr-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Diagnostic d'erreur",
    "goal": "Associer chaque symptôme de dépannage à sa solution du tutoriel.",
    "brief": "<p>Analysez chaque ligne proposée « symptome solution » : solution est un code parmi <code>service</code>, <code>pip</code>, <code>apt</code> ou <code>utf8</code>. Dépannage du tutoriel : « impossible de se connecter » → vérifier le service PostgreSQL (<code>service</code>) ; « ModuleNotFoundError psycopg2 » → <code>pip install psycopg2-binary</code> (<code>pip</code>) ; « ModuleNotFoundError tkinter » → <code>sudo apt install python3-tk</code> (<code>apt</code>) ; « SyntaxError Non-ASCII » → en-tête coding utf-8 (<code>utf8</code>). Pour chaque ligne il Indiquez <code>symptome : OK</code> ou <code>symptome : ERREUR</code>, puis <code>diagnostics : X/n</code>.</p>",
    "starter": "# Grille d'analyse (pr-c6-e1) — Diagnostic d'erreur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre pannes]\n# Données : 4\n# Données : connexion service\n# Données : psycopg2 pip\n# Données : tkinter apt\n# Données : ascii utf8\nA_COMPLETER\n\n[Cas 2 — Trois erreurs]\n# Données : 4\n# Données : connexion pip\n# Données : psycopg2 apt\n# Données : ascii pip\n# Données : tkinter apt\nA_COMPLETER\n\n[Cas 3 — Soirée debug]\n# Données : 5\n# Données : ascii utf8\n# Données : tkinter apt\n# Données : connexion service\n# Données : psycopg2 pip\n# Données : ascii utf8\nA_COMPLETER\n",
    "hints": [
      "Un case sur le symptôme : connexion → service, psycopg2 → pip, tkinter → apt, ascii → utf8.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nconnexion service\npsycopg2 pip\ntkinter apt\n",
        "expected": "connexion : OK\npsycopg2 : OK\ntkinter : OK\ndiagnostics : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les quatre pannes",
        "stdin": "cas:1",
        "expected": "connexion : OK\npsycopg2 : OK\ntkinter : OK\nascii : OK\ndiagnostics : 4/4"
      },
      {
        "label": "Trois erreurs",
        "stdin": "cas:2",
        "expected": "connexion : ERREUR\npsycopg2 : ERREUR\nascii : ERREUR\ntkinter : OK\ndiagnostics : 1/4"
      },
      {
        "label": "Soirée debug",
        "stdin": "cas:3",
        "expected": "ascii : OK\ntkinter : OK\nconnexion : OK\npsycopg2 : OK\nascii : OK\ndiagnostics : 5/5"
      }
    ],
    "solution": "[Exemple]\nconnexion : OK\npsycopg2 : OK\ntkinter : OK\ndiagnostics : 3/3\n\n[Cas 1 — Les quatre pannes]\nconnexion : OK\npsycopg2 : OK\ntkinter : OK\nascii : OK\ndiagnostics : 4/4\n\n[Cas 2 — Trois erreurs]\nconnexion : ERREUR\npsycopg2 : ERREUR\nascii : ERREUR\ntkinter : OK\ndiagnostics : 1/4\n\n[Cas 3 — Soirée debug]\nascii : OK\ntkinter : OK\nconnexion : OK\npsycopg2 : OK\nascii : OK\ndiagnostics : 5/5"
  },
  {
    "id": "pr-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Export CSV",
    "goal": "Produire une ligne CSV valide par produit, comme l'amélioration 3 du tutoriel.",
    "brief": "<p>Analysez chaque ligne proposée « produit categorie quantite prix » et écrit une ligne CSV par produit au format <code>produit;categorie;quantite;prix</code> ; la première ligne de l'export est l'en-tête <code>nom;categorie;quantite;prix</code>. Après les lignes, il Indiquez le bilan <code>lignes exportees : n</code>. (Le séparateur du tutoriel est le point-virgule.)</p>",
    "starter": "# Grille d'analyse (pr-c6-e2) — Export CSV\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Catalogue complet]\n# Données : 3\n# Données : ecran Affichage 3 45000\n# Données : usb Stock 40 1500\n# Données : hub Stock 8 7500\nA_COMPLETER\n\n[Cas 2 — Fichier deja exporte]\n# Données : 2\n# Données : a Stock 5 100\n# Données : b Bureau 3 200\nA_COMPLETER\n\n[Cas 3 — Un seul produit]\n# Données : 1\n# Données : imprimante Bureau 2 85000\nA_COMPLETER\n",
    "hints": [
      "La ligne : \"$produit;$categorie;$quantite;$prix\".",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "2\nclavier Periph 10 5000\nsouris Periph 30 2500\n",
        "expected": "nom;categorie;quantite;prix\nclavier;Periph;10;5000\nsouris;Periph;30;2500\nlignes exportees : 2"
      }
    ],
    "tests": [
      {
        "label": "Catalogue complet",
        "stdin": "cas:1",
        "expected": "nom;categorie;quantite;prix\necran;Affichage;3;45000\nusb;Stock;40;1500\nhub;Stock;8;7500\nlignes exportees : 3"
      },
      {
        "label": "Fichier deja exporte",
        "stdin": "cas:2",
        "expected": "nom;categorie;quantite;prix\na;Stock;5;100\nb;Bureau;3;200\nlignes exportees : 2"
      },
      {
        "label": "Un seul produit",
        "stdin": "cas:3",
        "expected": "nom;categorie;quantite;prix\nimprimante;Bureau;2;85000\nlignes exportees : 1"
      }
    ],
    "solution": "[Exemple]\nnom;categorie;quantite;prix\nclavier;Periph;10;5000\nsouris;Periph;30;2500\nlignes exportees : 2\n\n[Cas 1 — Catalogue complet]\nnom;categorie;quantite;prix\necran;Affichage;3;45000\nusb;Stock;40;1500\nhub;Stock;8;7500\nlignes exportees : 3\n\n[Cas 2 — Fichier deja exporte]\nnom;categorie;quantite;prix\na;Stock;5;100\nb;Bureau;3;200\nlignes exportees : 2\n\n[Cas 3 — Un seul produit]\nnom;categorie;quantite;prix\nimprimante;Bureau;2;85000\nlignes exportees : 1"
  },
  {
    "id": "pr-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Tableau de bord de soutenance",
    "goal": "Produire le résumé complet du stock : lignes, alertes, valeur, produit le plus cher.",
    "brief": "<p>Analysez chaque ligne proposée « produit quantite prix seuil » et Indiquez le tableau de bord : une ligne par produit <code>produit : stock=X valeur=V</code> (V = quantite × prix) ; puis <code>total : T FCFA</code> (somme des valeurs) ; <code>alertes : A</code> (produits avec stock strictement inférieur au seuil) ; <code>vitrine : P (V FCFA)</code> (produit de plus grande valeur de ligne, premier rencontré en cas d'égalité).</p>",
    "starter": "# Grille d'analyse (pr-c6-e3) — Tableau de bord de soutenance\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Soutenance finale]\n# Données : 4\n# Données : usb 40 1500 10\n# Données : cable 15 2000 20\n# Données : hub 8 7500 3\n# Données : chargeur 6 12000 8\nA_COMPLETER\n\n[Cas 2 — Stock vide]\n# Données : 2\n# Données : a 0 5000 0\n# Données : b 3 100 5\nA_COMPLETER\n\n[Cas 3 — Egalite vitrine]\n# Données : 3\n# Données : x 2 5000 1\n# Données : y 10 1000 2\n# Données : z 1 9000 1\nA_COMPLETER\n",
    "hints": [
      "V = quantite * prix ; total += V ; alerte si quantite -lt seuil.",
      "Le maximum : si V -gt vitrine_val OU vitrine = -, mettre à jour les deux."
    ],
    "examples": [
      {
        "stdin": "3\nclavier 10 5000 4\nsouris 5 2500 8\necran 2 45000 1\n",
        "expected": "clavier : stock=10 valeur=50000\nsouris : stock=5 valeur=12500\necran : stock=2 valeur=90000\ntotal : 152500 FCFA\nalertes : 1\nvitrine : ecran (90000 FCFA)"
      }
    ],
    "tests": [
      {
        "label": "Soutenance finale",
        "stdin": "cas:1",
        "expected": "usb : stock=40 valeur=60000\ncable : stock=15 valeur=30000\nhub : stock=8 valeur=60000\nchargeur : stock=6 valeur=72000\ntotal : 222000 FCFA\nalertes : 2\nvitrine : chargeur (72000 FCFA)"
      },
      {
        "label": "Stock vide",
        "stdin": "cas:2",
        "expected": "a : stock=0 valeur=0\nb : stock=3 valeur=300\ntotal : 300 FCFA\nalertes : 1\nvitrine : b (300 FCFA)"
      },
      {
        "label": "Egalite vitrine",
        "stdin": "cas:3",
        "expected": "x : stock=2 valeur=10000\ny : stock=10 valeur=10000\nz : stock=1 valeur=9000\ntotal : 29000 FCFA\nalertes : 0\nvitrine : x (10000 FCFA)"
      }
    ],
    "solution": "[Exemple]\nclavier : stock=10 valeur=50000\nsouris : stock=5 valeur=12500\necran : stock=2 valeur=90000\ntotal : 152500 FCFA\nalertes : 1\nvitrine : ecran (90000 FCFA)\n\n[Cas 1 — Soutenance finale]\nusb : stock=40 valeur=60000\ncable : stock=15 valeur=30000\nhub : stock=8 valeur=60000\nchargeur : stock=6 valeur=72000\ntotal : 222000 FCFA\nalertes : 2\nvitrine : chargeur (72000 FCFA)\n\n[Cas 2 — Stock vide]\na : stock=0 valeur=0\nb : stock=3 valeur=300\ntotal : 300 FCFA\nalertes : 1\nvitrine : b (300 FCFA)\n\n[Cas 3 — Egalite vitrine]\nx : stock=2 valeur=10000\ny : stock=10 valeur=10000\nz : stock=1 valeur=9000\ntotal : 29000 FCFA\nalertes : 0\nvitrine : x (10000 FCFA)"
  }
];
