'use strict';

module.exports = [
  {
    "id": "sql2-c3-e1",
    "chapter": 3,
    "title": "Moteur de jointure relationnelle (INNER JOIN vs LEFT JOIN)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler les jointures INNER et LEFT OUTER entre une table Clients et une table Commandes.",
    "brief": "<p>Le script simule l’exécution d’une jointure SQL entre :\n- Table <code>Clients(id, nom)</code>\n- Table <code>Commandes(cmd_id, client_id, montant)</code>\n\nEntrée :\n- Ligne 1 : Type de jointure : <code>INNER</code> ou <code>LEFT</code>.\n- Ligne 2 : Clients séparés par des points-virgules <code>id:nom</code>.\n- Ligne 3 : Commandes séparées par des points-virgules <code>cmd_id:client_id:montant</code>.\n\nSortie :\nPour chaque paire issue de la jointure, afficher une ligne : <code>nom | cmd_id | montant</code> (en cas de LEFT JOIN sans commande, afficher <code>NULL</code> pour cmd_id et montant). Trier par nom de client puis par cmd_id croissant.</p>",
    "starter": "# Grille d'analyse (sql2-c3-e1) — Moteur de jointure relationnelle (INNER JOIN vs LEFT JOIN)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — LEFT JOIN incluant le client sans commande]\n# Données : LEFT\n# Données : 1:Alice;2:Bob;3:Claire\n# Données : 101:1:150;102:1:300;103:2:50\nA_COMPLETER\n\n[Cas 2 — INNER JOIN avec commandes multiples]\n# Données : INNER\n# Données : 10:Zoe;20:David\n# Données : 501:20:80;502:20:120;503:10:450\nA_COMPLETER\n\n[Cas 3 — LEFT JOIN où aucun client n a de commande]\n# Données : LEFT\n# Données : 1:Marc;2:Sophie\nA_COMPLETER\n",
    "hints": [
      "Stocke les clients dans une liste de dictionnaires ou tuples ordonnés.",
      "Pour chaque client, trouve toutes ses commandes correspondantes.",
      "Si c est un LEFT JOIN et qu un client n a pas de commande, produis une ligne avec NULL."
    ],
    "examples": [
      {
        "stdin": "INNER\n1:Alice;2:Bob;3:Claire\n101:1:150;102:1:300;103:2:50",
        "expected": "Alice | 101 | 150\nAlice | 102 | 300\nBob | 103 | 50",
        "note": "Claire n'a pas de commande, elle est donc exclue du INNER JOIN."
      }
    ],
    "tests": [
      {
        "label": "LEFT JOIN incluant le client sans commande",
        "stdin": "cas:1",
        "expected": "Alice | 101 | 150\nAlice | 102 | 300\nBob | 103 | 50\nClaire | NULL | NULL"
      },
      {
        "label": "INNER JOIN avec commandes multiples",
        "stdin": "cas:2",
        "expected": "David | 501 | 80\nDavid | 502 | 120\nZoe | 503 | 450"
      },
      {
        "label": "LEFT JOIN où aucun client n a de commande",
        "stdin": "cas:3",
        "expected": "Marc | NULL | NULL\nSophie | NULL | NULL"
      }
    ],
    "solution": "[Exemple]\nAlice | 101 | 150\nAlice | 102 | 300\nBob | 103 | 50\n\n[Cas 1 — LEFT JOIN incluant le client sans commande]\nAlice | 101 | 150\nAlice | 102 | 300\nBob | 103 | 50\nClaire | NULL | NULL\n\n[Cas 2 — INNER JOIN avec commandes multiples]\nDavid | 501 | 80\nDavid | 502 | 120\nZoe | 503 | 450\n\n[Cas 3 — LEFT JOIN où aucun client n a de commande]\nMarc | NULL | NULL\nSophie | NULL | NULL"
  },
  {
    "id": "sql2-c3-e2",
    "chapter": 3,
    "title": "Évaluateur de sous-requête corrélée avec clause EXISTS",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le prédicat SQL EXISTS / NOT EXISTS évaluant l’existence de lignes dans une table liée.",
    "brief": "<p>Une clause <code>EXISTS (SELECT 1 FROM ...)</code> est vraie dès lors que la sous-requête corrélée renvoie au moins une ligne.\nLe script simule la requête :\n<code>SELECT nom FROM Fournisseurs f WHERE [NOT] EXISTS (SELECT 1 FROM Produits p WHERE p.fournisseur_id = f.id AND p.stock &gt;= seuil)</code>\n\nEntrée :\n- Ligne 1 : Mode (<code>EXISTS</code> ou <code>NOT_EXISTS</code>) et seuil de stock séparés par une virgule (ex: <code>EXISTS,10</code>).\n- Ligne 2 : Fournisseurs <code>id:nom</code> séparés par des virgules.\n- Ligne 3 : Produits <code>id:fournisseur_id:stock</code> séparés par des virgules.\n\nSortie :\nNoms des fournisseurs retenus séparés par des virgules, triés alphabétiquement (ou <code>AUCUN</code>).</p>",
    "starter": "# Grille d'analyse (sql2-c3-e2) — Évaluateur de sous-requête corrélée avec clause EXISTS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — NOT_EXISTS avec plusieurs résultats]\n# Données : NOT_EXISTS,10\n# Données : 1:Acme,2:Globex,3:Initech\n# Données : 101:1:15,102:1:5,103:2:2\nA_COMPLETER\n\n[Cas 2 — EXISTS avec plusieurs fournisseurs satisfaits]\n# Données : EXISTS,50\n# Données : 1:Alpha,2:Beta,3:Gamma\n# Données : 11:1:60,12:2:50,13:3:10\nA_COMPLETER\n\n[Cas 3 — Aucun fournisseur ne satisfait EXISTS]\n# Données : EXISTS,100\n# Données : 1:Alpha,2:Beta\n# Données : 11:1:10,12:2:20\nA_COMPLETER\n",
    "hints": [
      "Pour chaque fournisseur, cherche si au moins un produit respecte p.fournisseur_id == f.id et stock >= seuil.",
      "Si le mode est EXISTS, retiens le fournisseur si au moins un produit correspond.",
      "Si le mode est NOT_EXISTS, retiens le fournisseur si aucun produit ne correspond."
    ],
    "examples": [
      {
        "stdin": "EXISTS,10\n1:Acme,2:Globex,3:Initech\n101:1:15,102:1:5,103:2:2",
        "expected": "Acme",
        "note": "Seul Acme a au moins un produit avec stock >= 10 (produit 101 avec stock 15)."
      }
    ],
    "tests": [
      {
        "label": "NOT_EXISTS avec plusieurs résultats",
        "stdin": "cas:1",
        "expected": "Globex,Initech"
      },
      {
        "label": "EXISTS avec plusieurs fournisseurs satisfaits",
        "stdin": "cas:2",
        "expected": "Alpha,Beta"
      },
      {
        "label": "Aucun fournisseur ne satisfait EXISTS",
        "stdin": "cas:3",
        "expected": "AUCUN"
      }
    ],
    "solution": "[Exemple]\nAcme\n\n[Cas 1 — NOT_EXISTS avec plusieurs résultats]\nGlobex,Initech\n\n[Cas 2 — EXISTS avec plusieurs fournisseurs satisfaits]\nAlpha,Beta\n\n[Cas 3 — Aucun fournisseur ne satisfait EXISTS]\nAUCUN"
  },
  {
    "id": "sql2-c3-e3",
    "chapter": 3,
    "title": "Interpréteur d’expression conditionnelle SQL CASE WHEN",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la transformation de données par une expression conditionnelle CASE WHEN ... THEN ... ELSE ... END.",
    "brief": "<p>En SQL, la structure <code>CASE WHEN condition THEN resultat ... ELSE defaut END</code> permet d’affecter dynamiquement des catégories calculées.\nOn applique les règles de classification suivantes sur le score d’un examen :\n- Score &ge; 85 : <code>EXCELLENT</code>\n- Score &ge; 70 : <code>BIEN</code>\n- Score &ge; 50 : <code>PASSABLE</code>\n- Sinon : <code>ECHEC</code>\n\nEntrée :\nUne liste de couples <code>nom:score</code> séparés par des virgules (ex: <code>Alice:90,Bob:65,Claire:45</code>).\n\nSortie :\nPour chaque étudiant (dans l’ordre d’entrée) : <code>&lt;nom&gt;: &lt;Score&gt; -&gt; &lt;Mention&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c3-e3) — Interpréteur d’expression conditionnelle SQL CASE WHEN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas limites exacts sur les seuils]\n# Données : T1:85,T2:70,T3:50,T4:49\nA_COMPLETER\n\n[Cas 2 — Tous en échec]\n# Données : U1:10,U2:25,U3:0\nA_COMPLETER\n\n[Cas 3 — Tous en mention excellente]\n# Données : A1:100,A2:95,A3:86\nA_COMPLETER\n",
    "hints": [
      "Découpe la ligne par les virgules, puis chaque étudiant par deux-points.",
      "Évalue les conditions dans l ordre décroissant des seuils (85, 70, 50).",
      "Assure-toi que la valeur finale par défaut (ELSE) est ECHEC."
    ],
    "examples": [
      {
        "stdin": "Alice:90,Bob:65,Claire:45,David:70",
        "expected": "Alice: 90 -> EXCELLENT\nBob: 65 -> PASSABLE\nClaire: 45 -> ECHEC\nDavid: 70 -> BIEN",
        "note": "Chaque score est évalué séquentiellement par les branches du CASE WHEN."
      }
    ],
    "tests": [
      {
        "label": "Cas limites exacts sur les seuils",
        "stdin": "cas:1",
        "expected": "T1: 85 -> EXCELLENT\nT2: 70 -> BIEN\nT3: 50 -> PASSABLE\nT4: 49 -> ECHEC"
      },
      {
        "label": "Tous en échec",
        "stdin": "cas:2",
        "expected": "U1: 10 -> ECHEC\nU2: 25 -> ECHEC\nU3: 0 -> ECHEC"
      },
      {
        "label": "Tous en mention excellente",
        "stdin": "cas:3",
        "expected": "A1: 100 -> EXCELLENT\nA2: 95 -> EXCELLENT\nA3: 86 -> EXCELLENT"
      }
    ],
    "solution": "[Exemple]\nAlice: 90 -> EXCELLENT\nBob: 65 -> PASSABLE\nClaire: 45 -> ECHEC\nDavid: 70 -> BIEN\n\n[Cas 1 — Cas limites exacts sur les seuils]\nT1: 85 -> EXCELLENT\nT2: 70 -> BIEN\nT3: 50 -> PASSABLE\nT4: 49 -> ECHEC\n\n[Cas 2 — Tous en échec]\nU1: 10 -> ECHEC\nU2: 25 -> ECHEC\nU3: 0 -> ECHEC\n\n[Cas 3 — Tous en mention excellente]\nA1: 100 -> EXCELLENT\nA2: 95 -> EXCELLENT\nA3: 86 -> EXCELLENT"
  }
];
