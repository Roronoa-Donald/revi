'use strict';

module.exports = [
  {
    "id": "sql2-c6-e1",
    "chapter": 6,
    "title": "Émulateur de déclencheur BEFORE INSERT avec contrôle de cohérence",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler un trigger BEFORE INSERT qui valide ou ajuste les valeurs de la pseudo-ligne NEW.",
    "brief": "<p>Avant d’insérer un nouvel article dans la table <code>Articles(id, nom, prix, stock)</code>, un déclencheur <code>BEFORE INSERT</code> applique deux règles métier impératives :\n1. Si <code>NEW.prix &lt;= 0</code>, l’insertion est bloquée avec une erreur ;\n2. Si <code>NEW.stock &lt; 0</code>, la valeur est automatiquement corrigée à <code>NEW.stock = 0</code>.\nSi le prix est strictement positif, l’enregistrement est inséré avec un nouvel ID auto-incrémenté démarrant à 1.\n\nEntrée :\nChaque ligne contient une tentative d’insertion : <code>nom,prix,stock</code>.\n\nSortie :\nPour chaque ligne :\n- En cas d’erreur : <code>REJET: &lt;nom&gt; (prix invalide &lt;prix&gt;)</code>\n- En cas de succès : <code>INSERE: id=&lt;id&gt; | &lt;nom&gt; | &lt;prix&gt;€ | stock=&lt;stock_ajuste&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c6-e1) — Émulateur de déclencheur BEFORE INSERT avec contrôle de cohérence\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Prix exactement zéro rejeté]\n# Données : Cadeau,0,100\nA_COMPLETER\n\n[Cas 2 — Toutes les lignes sont valides]\n# Données : T1,10,5\n# Données : T2,20,15\n# Données : T3,30,0\nA_COMPLETER\n\n[Cas 3 — Stock négatif ajusté à 0]\n# Données : Casque,50,-10\n# Données : Tapis,15,-1\nA_COMPLETER\n",
    "hints": [
      "Garde un compteur auto-incrémenté pour l id qui n augmente QUE si l insertion réussit.",
      "Vérifie d abord si prix <= 0.",
      "Si stock < 0, remplace stock par 0 avant d afficher la ligne insérée."
    ],
    "examples": [
      {
        "stdin": "Clavier,25,10\nSouris,-5,5\nEcran,180,-3",
        "expected": "INSERE: id=1 | Clavier | 25€ | stock=10\nREJET: Souris (prix invalide -5)\nINSERE: id=2 | Ecran | 180€ | stock=0",
        "note": "La souris est rejetée car prix négatif. L'écran est accepté avec stock ramené à 0."
      }
    ],
    "tests": [
      {
        "label": "Prix exactement zéro rejeté",
        "stdin": "cas:1",
        "expected": "REJET: Cadeau (prix invalide 0)"
      },
      {
        "label": "Toutes les lignes sont valides",
        "stdin": "cas:2",
        "expected": "INSERE: id=1 | T1 | 10€ | stock=5\nINSERE: id=2 | T2 | 20€ | stock=15\nINSERE: id=3 | T3 | 30€ | stock=0"
      },
      {
        "label": "Stock négatif ajusté à 0",
        "stdin": "cas:3",
        "expected": "INSERE: id=1 | Casque | 50€ | stock=0\nINSERE: id=2 | Tapis | 15€ | stock=0"
      }
    ],
    "solution": "[Exemple]\nINSERE: id=1 | Clavier | 25€ | stock=10\nREJET: Souris (prix invalide -5)\nINSERE: id=2 | Ecran | 180€ | stock=0\n\n[Cas 1 — Prix exactement zéro rejeté]\nREJET: Cadeau (prix invalide 0)\n\n[Cas 2 — Toutes les lignes sont valides]\nINSERE: id=1 | T1 | 10€ | stock=5\nINSERE: id=2 | T2 | 20€ | stock=15\nINSERE: id=3 | T3 | 30€ | stock=0\n\n[Cas 3 — Stock négatif ajusté à 0]\nINSERE: id=1 | Casque | 50€ | stock=0\nINSERE: id=2 | Tapis | 15€ | stock=0"
  },
  {
    "id": "sql2-c6-e2",
    "chapter": 6,
    "title": "Déclencheur AFTER UPDATE avec table d’audit OLD vs NEW",
    "level": "n2",
    "language": "analyse",
    "goal": "Générer des entrées de journalisation d’audit comparant l’ancienne valeur (OLD) et la nouvelle valeur (NEW).",
    "brief": "<p>Lorsqu’une instruction <code>UPDATE</code> modifie un enregistrement dans la table <code>Comptes(id, statut, solde)</code>, un déclencheur <code>AFTER UPDATE</code> insère une ligne d’audit pour chaque colonne dont la valeur a changé :\n<code>AUDIT: user_id=&lt;id&gt; | champ=&lt;nom_champ&gt; | ancien=&lt;OLD&gt; | nouveau=&lt;NEW&gt;</code>\nSi la valeur d’un champ n’a pas changé, aucune trace d’audit n’est produite pour ce champ.</p>\n<p>Entrée :\n- Ligne 1 : État initial des comptes <code>id:statut:solde</code> séparés par des points-virgules (ex: <code>1:ACTIF:1000;2:BLOQUE:500</code>).\n- Lignes suivantes : Mises à jour <code>UPDATE id NOUVEAU_STATUT NOUVEAU_SOLDE</code>.\n\nSortie :\nLa liste des lignes d’audit générées (ou <code>AUCUNE MODIFICATION</code> si rien n’a changé).</p>",
    "starter": "# Grille d'analyse (sql2-c6-e2) — Déclencheur AFTER UPDATE avec table d’audit OLD vs NEW\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux champs modifiés en même temps]\n# Données : 1:ACTIF:100\n# Données : UPDATE 1 FERME 0\nA_COMPLETER\n\n[Cas 2 — Aucun changement réel (valeurs identiques)]\n# Données : 10:ACTIF:500\n# Données : UPDATE 10 ACTIF 500\nA_COMPLETER\n\n[Cas 3 — Plusieurs updates successifs sur le même compte]\n# Données : 5:ATTENTE:10\n# Données : UPDATE 5 ACTIF 10\n# Données : UPDATE 5 ACTIF 50\nA_COMPLETER\n",
    "hints": [
      "Stocke les comptes dans un dictionnaire {id: {\"statut\": ..., \"solde\": ...}}.",
      "Compare statut_old et statut_new : s ils sont différents, émets une ligne d audit.",
      "Fais de même pour solde_old et solde_new."
    ],
    "examples": [
      {
        "stdin": "1:ACTIF:1000;2:BLOQUE:500\nUPDATE 1 ACTIF 1200\nUPDATE 2 ACTIF 500",
        "expected": "AUDIT: user_id=1 | champ=solde | ancien=1000 | nouveau=1200\nAUDIT: user_id=2 | champ=statut | ancien=BLOQUE | nouveau=ACTIF",
        "note": "Pour le compte 1, seul le solde a changé. Pour le compte 2, seul le statut a changé."
      }
    ],
    "tests": [
      {
        "label": "Deux champs modifiés en même temps",
        "stdin": "cas:1",
        "expected": "AUDIT: user_id=1 | champ=statut | ancien=ACTIF | nouveau=FERME\nAUDIT: user_id=1 | champ=solde | ancien=100 | nouveau=0"
      },
      {
        "label": "Aucun changement réel (valeurs identiques)",
        "stdin": "cas:2",
        "expected": "AUCUNE MODIFICATION"
      },
      {
        "label": "Plusieurs updates successifs sur le même compte",
        "stdin": "cas:3",
        "expected": "AUDIT: user_id=5 | champ=statut | ancien=ATTENTE | nouveau=ACTIF\nAUDIT: user_id=5 | champ=solde | ancien=10 | nouveau=50"
      }
    ],
    "solution": "[Exemple]\nAUDIT: user_id=1 | champ=solde | ancien=1000 | nouveau=1200\nAUDIT: user_id=2 | champ=statut | ancien=BLOQUE | nouveau=ACTIF\n\n[Cas 1 — Deux champs modifiés en même temps]\nAUDIT: user_id=1 | champ=statut | ancien=ACTIF | nouveau=FERME\nAUDIT: user_id=1 | champ=solde | ancien=100 | nouveau=0\n\n[Cas 2 — Aucun changement réel (valeurs identiques)]\nAUCUNE MODIFICATION\n\n[Cas 3 — Plusieurs updates successifs sur le même compte]\nAUDIT: user_id=5 | champ=statut | ancien=ATTENTE | nouveau=ACTIF\nAUDIT: user_id=5 | champ=solde | ancien=10 | nouveau=50"
  },
  {
    "id": "sql2-c6-e3",
    "chapter": 6,
    "title": "Analyseur de plan d’exécution EXPLAIN (Seq Scan vs Index Scan)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le choix du planificateur de requêtes SQL entre parcours séquentiel et parcours d’index.",
    "brief": "<p>Le planificateur de requêtes (Query Optimizer) évalue le coût d’accès aux données :\n- <strong>Index Scan</strong> : Si la condition WHERE porte sur une colonne disposant d’un index avec égalité (ex: <code>WHERE email = '...'</code>), le coût estimé est logarithmique : <code>cout = 3</code> (lecture de 3 blocs d’index et de table) ;\n- <strong>Seq Scan (Table Scan)</strong> : Si aucun index n’est disponible sur la colonne filtrée, le moteur doit lire l’intégralité des <code>N</code> lignes de la table : <code>cout = N</code>.</p>\n<p>Entrée :\n- Ligne 1 : Métadonnées : <code>table,nombre_lignes,index1|index2|...</code> (ex: <code>clients,50000,email|code_postal</code>).\n- Ligne 2 : Requête ou clause WHERE : <code>WHERE colonne = valeur</code> (ex: <code>WHERE email = 'alice@test.com'</code>).\n\nSortie :\n<code>Methode: &lt;Index Scan (colonne) | Seq Scan&gt; | Cout_Estime: &lt;Cout&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c6-e3) — Analyseur de plan d’exécution EXPLAIN (Seq Scan vs Index Scan)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Colonne non indexée entraînant un Seq Scan]\n# Données : clients,50000,email|code_postal\n# Données : WHERE age = 30\nA_COMPLETER\n\n[Cas 2 — Deuxième index utilisé]\n# Données : produits,12000,reference|categorie|fournisseur\n# Données : WHERE categorie = 'Informatique'\nA_COMPLETER\n\n[Cas 3 — Table sans aucun index]\n# Données : logs,800000,AUCUN\n# Données : WHERE ip = '192.168.1.1'\nA_COMPLETER\n",
    "hints": [
      "Parse la première ligne pour extraire le nombre total de lignes et l ensemble des colonnes indexées.",
      "Extrais le nom de la colonne présente dans la clause WHERE (entre WHERE et =).",
      "Si la colonne est dans les index, choisis Index Scan avec cout = 3, sinon Seq Scan avec cout = nombre_lignes."
    ],
    "examples": [
      {
        "stdin": "clients,50000,email|code_postal\nWHERE email = 'alice@test.com'",
        "expected": "Methode: Index Scan (email) | Cout_Estime: 3",
        "note": "La colonne email est indexée, le planificateur privilégie un Index Scan à coût minime (3)."
      }
    ],
    "tests": [
      {
        "label": "Colonne non indexée entraînant un Seq Scan",
        "stdin": "cas:1",
        "expected": "Methode: Seq Scan | Cout_Estime: 50000"
      },
      {
        "label": "Deuxième index utilisé",
        "stdin": "cas:2",
        "expected": "Methode: Index Scan (categorie) | Cout_Estime: 3"
      },
      {
        "label": "Table sans aucun index",
        "stdin": "cas:3",
        "expected": "Methode: Seq Scan | Cout_Estime: 800000"
      }
    ],
    "solution": "[Exemple]\nMethode: Index Scan (email) | Cout_Estime: 3\n\n[Cas 1 — Colonne non indexée entraînant un Seq Scan]\nMethode: Seq Scan | Cout_Estime: 50000\n\n[Cas 2 — Deuxième index utilisé]\nMethode: Index Scan (categorie) | Cout_Estime: 3\n\n[Cas 3 — Table sans aucun index]\nMethode: Seq Scan | Cout_Estime: 800000"
  }
];
