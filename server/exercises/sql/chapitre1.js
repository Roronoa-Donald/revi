'use strict';

module.exports = [
  {
    "id": "sql2-c1-e1",
    "chapter": 1,
    "title": "Analyseur syntaxique de commande DDL CREATE TABLE",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une instruction DDL CREATE TABLE pour extraire le nom de la table, les colonnes et la clé primaire.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Il doit extraire :\n- Le <strong>nom de la table</strong> ;\n- Le <strong>nombre de colonnes</strong> définies ;\n- Le nom de la <strong>colonne clé primaire</strong> (identifiée par la mention <code>PRIMARY KEY</code> inline ou comme contrainte <code>PRIMARY KEY (col)</code>).\n\nFormat de sortie :\n<code>Table: &lt;Nom&gt; | Colonnes: &lt;Nb&gt; | PK: &lt;NomColonnePK&gt;</code> (ou <code>PK: AUCUNE</code> si absente).</p>",
    "starter": "# Grille d'analyse (sql2-c1-e1) — Analyseur syntaxique de commande DDL CREATE TABLE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Table simple avec PK inline]\n# Données : CREATE TABLE commandes ( num_cmd INT PRIMARY KEY, date_cmd DATE, total DECIMAL(10,2) );\nA_COMPLETER\n\n[Cas 2 — Table avec contrainte séparée PRIMARY KEY]\n# Données : CREATE TABLE articles ( ref_art VARCHAR(20), libelle TEXT, prix INT, PRIMARY KEY (ref_art) );\nA_COMPLETER\n\n[Cas 3 — Table sans clé primaire explicite]\n# Données : CREATE TABLE logs ( horodatage TIMESTAMP, ip VARCHAR(45), action VARCHAR(255) );\nA_COMPLETER\n",
    "hints": [
      "Utilise une expression régulière pour extraire le nom de la table après CREATE TABLE.",
      "Extrais le contenu entre les parenthèses principales et découpe par les virgules de niveau supérieur.",
      "Repère PRIMARY KEY inline ou en contrainte séparée."
    ],
    "examples": [
      {
        "stdin": "CREATE TABLE clients ( id INT PRIMARY KEY, nom VARCHAR(50), email VARCHAR(100) );",
        "expected": "Table: clients | Colonnes: 3 | PK: id",
        "note": "Table clients avec 3 colonnes et id comme PK."
      }
    ],
    "tests": [
      {
        "label": "Table simple avec PK inline",
        "stdin": "cas:1",
        "expected": "Table: commandes | Colonnes: 3 | PK: num_cmd"
      },
      {
        "label": "Table avec contrainte séparée PRIMARY KEY",
        "stdin": "cas:2",
        "expected": "Table: articles | Colonnes: 3 | PK: ref_art"
      },
      {
        "label": "Table sans clé primaire explicite",
        "stdin": "cas:3",
        "expected": "Table: logs | Colonnes: 3 | PK: AUCUNE"
      }
    ],
    "solution": "[Exemple]\nTable: clients | Colonnes: 3 | PK: id\n\n[Cas 1 — Table simple avec PK inline]\nTable: commandes | Colonnes: 3 | PK: num_cmd\n\n[Cas 2 — Table avec contrainte séparée PRIMARY KEY]\nTable: articles | Colonnes: 3 | PK: ref_art\n\n[Cas 3 — Table sans clé primaire explicite]\nTable: logs | Colonnes: 3 | PK: AUCUNE"
  },
  {
    "id": "sql2-c1-e2",
    "chapter": 1,
    "title": "Vérificateur d’intégrité référentielle parent-enfant",
    "level": "n2",
    "language": "analyse",
    "goal": "Détecter les enregistrements enfants dont la clé étrangère pointe vers un parent inexistant (clés orphelines).",
    "brief": "<p>Une contrainte de clé étrangère (<code>FOREIGN KEY</code>) impose que toute valeur non nulle de la colonne fille référence une clé primaire existante dans la table parent.</p>\n<p>Entrée :\n- Ligne 1 : Liste ordonnée d’IDs de la table parent séparés par des virgules (ex: <code>10,20,30</code>).\n- Ligne 2 : Liste de couples enfant <code>id_enfant:parent_id</code> séparés par des virgules (ex: <code>1:10,2:99,3:20</code>).\n\nSortie :\n<code>Valides: &lt;N&gt; | Orphelins: &lt;id1,id2,...&gt;</code> (ou <code>Orphelins: AUCUN</code> si tout est valide).</p>",
    "starter": "# Grille d'analyse (sql2-c1-e2) — Vérificateur d’intégrité référentielle parent-enfant\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les enfants sont valides]\n# Données : 1,2,3,4\n# Données : 101:1,102:2,103:3,104:4\nA_COMPLETER\n\n[Cas 2 — Plusieurs orphelins détectés]\n# Données : 100,200\n# Données : 1:100,2:300,3:400,4:200,5:500\nA_COMPLETER\n\n[Cas 3 — Tous orphelins]\n# Données : 50,60\n# Données : 1:10,2:20,3:30\nA_COMPLETER\n",
    "hints": [
      "Convertis les identifiants parents en un ensemble set() pour des tests d appartenance rapides.",
      "Sépare chaque couple enfant par deux-points id_enfant:parent_id.",
      "Gère le cas où aucun orphelin n est détecté en affichant AUCUN."
    ],
    "examples": [
      {
        "stdin": "10,20,30\n1:10,2:99,3:20,4:50",
        "expected": "Valides: 2 | Orphelins: 2,4",
        "note": "Les enfants 2 (parent 99) et 4 (parent 50) sont orphelins."
      }
    ],
    "tests": [
      {
        "label": "Tous les enfants sont valides",
        "stdin": "cas:1",
        "expected": "Valides: 4 | Orphelins: AUCUN"
      },
      {
        "label": "Plusieurs orphelins détectés",
        "stdin": "cas:2",
        "expected": "Valides: 2 | Orphelins: 2,3,5"
      },
      {
        "label": "Tous orphelins",
        "stdin": "cas:3",
        "expected": "Valides: 0 | Orphelins: 1,2,3"
      }
    ],
    "solution": "[Exemple]\nValides: 2 | Orphelins: 2,4\n\n[Cas 1 — Tous les enfants sont valides]\nValides: 4 | Orphelins: AUCUN\n\n[Cas 2 — Plusieurs orphelins détectés]\nValides: 2 | Orphelins: 2,3,5\n\n[Cas 3 — Tous orphelins]\nValides: 0 | Orphelins: 1,2,3"
  },
  {
    "id": "sql2-c1-e3",
    "chapter": 1,
    "title": "Émulateur d’action de clé étrangère ON DELETE (CASCADE vs RESTRICT)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la politique de suppression ON DELETE CASCADE ou ON DELETE RESTRICT lors de la suppression d’un enregistrement parent.",
    "brief": "<p>Lorsqu’un enregistrement parent est supprimé :\n- <code>RESTRICT</code> : La suppression est immédiatement <strong>rejetée</strong> si au moins un enfant dépend de ce parent.\n- <code>CASCADE</code> : La suppression du parent est <strong>acceptée</strong> et entraîne automatiquement la suppression de tous ses enregistrements enfants.</p>\n<p>Entrée :\n- Ligne 1 : <code>ACTION,ID_PARENT_A_SUPPRIMER</code> (ex: <code>CASCADE,10</code> ou <code>RESTRICT,20</code>).\n- Ligne 2 : Liste des enfants au format <code>id_enfant:parent_id</code> séparés par des virgules.\n\nSortie :\n- Si RESTRICT rejeté : <code>ERREUR: Suppression interdite (enfants presents: &lt;id1,id2&gt;)</code>\n- Si RESTRICT accepté (aucun enfant) : <code>SUCCES: Parent &lt;ID&gt; supprime | Enfants restants: &lt;liste&gt;</code>\n- Si CASCADE : <code>SUCCES: Parent &lt;ID&gt; supprime | Enfants supprimes: &lt;Nb&gt; | Enfants restants: &lt;liste&gt;</code></p>",
    "starter": "# Grille d'analyse (sql2-c1-e3) — Émulateur d’action de clé étrangère ON DELETE (CASCADE vs RESTRICT)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — RESTRICT réussi car aucun enfant rattaché]\n# Données : RESTRICT,99\n# Données : 1:10,2:20,3:30\nA_COMPLETER\n\n[Cas 2 — CASCADE avec suppression de deux enfants]\n# Données : CASCADE,10\n# Données : 1:10,2:20,3:10,4:30\nA_COMPLETER\n\n[Cas 3 — CASCADE sans enfant lié]\n# Données : CASCADE,50\n# Données : 1:10,2:20\nA_COMPLETER\n",
    "hints": [
      "Sépare l action (RESTRICT ou CASCADE) et l ID parent sur la première ligne.",
      "Identifie tous les enfants qui ont ce parent_id.",
      "Pour CASCADE, filtre les enfants pour ne garder que ceux dont le parent_id est différent."
    ],
    "examples": [
      {
        "stdin": "RESTRICT,10\n1:10,2:20,3:10,4:30",
        "expected": "ERREUR: Suppression interdite (enfants presents: 1,3)",
        "note": "La suppression du parent 10 est bloquée par RESTRICT car les enfants 1 et 3 y sont rattachés."
      }
    ],
    "tests": [
      {
        "label": "RESTRICT réussi car aucun enfant rattaché",
        "stdin": "cas:1",
        "expected": "SUCCES: Parent 99 supprime | Enfants restants: 1,2,3"
      },
      {
        "label": "CASCADE avec suppression de deux enfants",
        "stdin": "cas:2",
        "expected": "SUCCES: Parent 10 supprime | Enfants supprimes: 2 | Enfants restants: 2,4"
      },
      {
        "label": "CASCADE sans enfant lié",
        "stdin": "cas:3",
        "expected": "SUCCES: Parent 50 supprime | Enfants supprimes: 0 | Enfants restants: 1,2"
      }
    ],
    "solution": "[Exemple]\nERREUR: Suppression interdite (enfants presents: 1,3)\n\n[Cas 1 — RESTRICT réussi car aucun enfant rattaché]\nSUCCES: Parent 99 supprime | Enfants restants: 1,2,3\n\n[Cas 2 — CASCADE avec suppression de deux enfants]\nSUCCES: Parent 10 supprime | Enfants supprimes: 2 | Enfants restants: 2,4\n\n[Cas 3 — CASCADE sans enfant lié]\nSUCCES: Parent 50 supprime | Enfants supprimes: 0 | Enfants restants: 1,2"
  }
];
