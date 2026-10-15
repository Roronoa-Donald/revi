/**
 * Exercices du chapitre 1 — SQL B2.
 * Modélisation Relationnelle, DDL & Contraintes d'Intégrité.
 */
'use strict';

module.exports = [
  {
    id: 'sql2-c1-e1',
    chapter: 1,
    title: 'Analyseur syntaxique de commande DDL CREATE TABLE',
    level: 'n1',
    language: 'python',
    goal: 'Analyser une instruction DDL CREATE TABLE pour extraire le nom de la table, les colonnes et la clé primaire.',
    brief: '<p>Le script lit une commande DDL <code>CREATE TABLE</code> sur une seule ligne. Il doit extraire :\n- Le <strong>nom de la table</strong> ;\n- Le <strong>nombre de colonnes</strong> définies ;\n- Le nom de la <strong>colonne clé primaire</strong> (identifiée par la mention <code>PRIMARY KEY</code> inline ou comme contrainte <code>PRIMARY KEY (col)</code>).\n\nFormat de sortie :\n<code>Table: &lt;Nom&gt; | Colonnes: &lt;Nb&gt; | PK: &lt;NomColonnePK&gt;</code> (ou <code>PK: AUCUNE</code> si absente).</p>',
    starter: `import sys, re

sql = sys.stdin.read().strip()

# À compléter : analyser la commande CREATE TABLE, compter les colonnes et identifier la clé primaire
`,
    hints: [
      'Utilise une expression régulière pour extraire le nom de la table après CREATE TABLE.',
      'Extrais le contenu entre les parenthèses principales et découpe par les virgules de niveau supérieur.',
      'Repère PRIMARY KEY inline ou en contrainte séparée.'
    ],
    examples: [
      {
        stdin: 'CREATE TABLE clients ( id INT PRIMARY KEY, nom VARCHAR(50), email VARCHAR(100) );',
        expected: 'Table: clients | Colonnes: 3 | PK: id',
        note: 'Table clients avec 3 colonnes et id comme PK.'
      }
    ],
    tests: [
      {
        label: 'Table simple avec PK inline',
        stdin: 'CREATE TABLE commandes ( num_cmd INT PRIMARY KEY, date_cmd DATE, total DECIMAL(10,2) );',
        expected: 'Table: commandes | Colonnes: 3 | PK: num_cmd'
      },
      {
        label: 'Table avec contrainte séparée PRIMARY KEY',
        stdin: 'CREATE TABLE articles ( ref_art VARCHAR(20), libelle TEXT, prix INT, PRIMARY KEY (ref_art) );',
        expected: 'Table: articles | Colonnes: 3 | PK: ref_art'
      },
      {
        label: 'Table sans clé primaire explicite',
        stdin: 'CREATE TABLE logs ( horodatage TIMESTAMP, ip VARCHAR(45), action VARCHAR(255) );',
        expected: 'Table: logs | Colonnes: 3 | PK: AUCUNE'
      },
      {
        label: 'Table avec 5 colonnes et types variés',
        stdin: 'CREATE TABLE users ( uid INT PRIMARY KEY, login VARCHAR(30), mdp_hash CHAR(64), actif BOOLEAN, cree_le TIMESTAMP );',
        expected: 'Table: users | Colonnes: 5 | PK: uid'
      }
    ],
    solution: `import sys, re

sql = sys.stdin.read().strip()

# Nettoyer les espaces et enlever le point-virgule final
sql_clean = re.sub(r';\\s*$', '', sql)

# Extraire le nom de la table
m_table = re.search(r'CREATE\\s+TABLE\\s+(?:IF\\s+NOT\\s+EXISTS\\s+)?["\`\\[]?([a-zA-Z0-9_]+)["\`\\]]?', sql_clean, re.IGNORECASE)
nom_table = m_table.group(1) if m_table else 'INCONNUE'

# Extraire l'intérieur des parenthèses principales
idx_open = sql_clean.find('(')
idx_close = sql_clean.rfind(')')
if idx_open != -1 and idx_close != -1:
    corps = sql_clean[idx_open + 1:idx_close].strip()
else:
    corps = ''

# Découper par virgule sans couper à l'intérieur des parenthèses de type (ex: DECIMAL(10,2))
elements = []
courant = []
parentheses = 0
for char in corps:
    if char == '(':
        parentheses += 1
        courant.append(char)
    elif char == ')':
        parentheses -= 1
        courant.append(char)
    elif char == ',' and parentheses == 0:
        elements.append(''.join(courant).strip())
        courant = []
    else:
        courant.append(char)
if courant:
    elements.append(''.join(courant).strip())

colonnes = []
pk_col = 'AUCUNE'

for el in elements:
    if not el:
        continue
    # Vérifier contrainte séparée PRIMARY KEY (col)
    m_pk_sep = re.match(r'PRIMARY\\s+KEY\\s*\\(\\s*["\`\\[]?([a-zA-Z0-9_]+)["\`\\]]?\\s*\\)', el, re.IGNORECASE)
    if m_pk_sep:
        pk_col = m_pk_sep.group(1)
        continue
    # Vérifier contrainte FOREIGN KEY ou CONSTRAINT
    if re.match(r'(?:CONSTRAINT|FOREIGN\\s+KEY|CHECK|UNIQUE\\s*\\()', el, re.IGNORECASE):
        continue
    
    # C'est une colonne
    colonnes.append(el)
    m_col_name = re.match(r'["\`\\[]?([a-zA-Z0-9_]+)["\`\\]]?', el)
    col_name = m_col_name.group(1) if m_col_name else ''
    if re.search(r'PRIMARY\\s+KEY', el, re.IGNORECASE):
        pk_col = col_name

print(f"Table: {nom_table} | Colonnes: {len(colonnes)} | PK: {pk_col}")
`
  },
  {
    id: 'sql2-c1-e2',
    chapter: 1,
    title: 'Vérificateur d’intégrité référentielle parent-enfant',
    level: 'n2',
    language: 'python',
    goal: 'Détecter les enregistrements enfants dont la clé étrangère pointe vers un parent inexistant (clés orphelines).',
    brief: '<p>Une contrainte de clé étrangère (<code>FOREIGN KEY</code>) impose que toute valeur non nulle de la colonne fille référence une clé primaire existante dans la table parent.</p>\n<p>Entrée :\n- Ligne 1 : Liste ordonnée d’IDs de la table parent séparés par des virgules (ex: <code>10,20,30</code>).\n- Ligne 2 : Liste de couples enfant <code>id_enfant:parent_id</code> séparés par des virgules (ex: <code>1:10,2:99,3:20</code>).\n\nSortie :\n<code>Valides: &lt;N&gt; | Orphelins: &lt;id1,id2,...&gt;</code> (ou <code>Orphelins: AUCUN</code> si tout est valide).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : extraire les parents, vérifier les enfants et lister les clés orphelines
`,
    hints: [
      'Convertis les identifiants parents en un ensemble set() pour des tests d appartenance rapides.',
      'Sépare chaque couple enfant par deux-points id_enfant:parent_id.',
      'Gère le cas où aucun orphelin n est détecté en affichant AUCUN.'
    ],
    examples: [
      {
        stdin: "10,20,30\n1:10,2:99,3:20,4:50",
        expected: "Valides: 2 | Orphelins: 2,4",
        note: "Les enfants 2 (parent 99) et 4 (parent 50) sont orphelins."
      }
    ],
    tests: [
      {
        label: 'Tous les enfants sont valides',
        stdin: "1,2,3,4\n101:1,102:2,103:3,104:4",
        expected: "Valides: 4 | Orphelins: AUCUN"
      },
      {
        label: 'Plusieurs orphelins détectés',
        stdin: "100,200\n1:100,2:300,3:400,4:200,5:500",
        expected: "Valides: 2 | Orphelins: 2,3,5"
      },
      {
        label: 'Tous orphelins',
        stdin: "50,60\n1:10,2:20,3:30",
        expected: "Valides: 0 | Orphelins: 1,2,3"
      },
      {
        label: 'Parents avec un seul élément',
        stdin: "7\n1:7,2:7,3:8,4:7",
        expected: "Valides: 3 | Orphelins: 3"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
if len(lignes) < 2:
    sys.exit(0)

parents_str = lignes[0]
enfants_str = lignes[1]

parents_set = set(p.strip() for p in parents_str.split(',') if p.strip())

valides_count = 0
orphelins = []

for item in enfants_str.split(','):
    item = item.strip()
    if not item or ':' not in item:
        continue
    id_enfant, parent_id = item.split(':', 1)
    id_enfant = id_enfant.strip()
    parent_id = parent_id.strip()
    if parent_id in parents_set:
        valides_count += 1
    else:
        orphelins.append(id_enfant)

orphelins_text = ','.join(orphelins) if orphelins else 'AUCUN'
print(f"Valides: {valides_count} | Orphelins: {orphelins_text}")
`
  },
  {
    id: 'sql2-c1-e3',
    chapter: 1,
    title: 'Émulateur d’action de clé étrangère ON DELETE (CASCADE vs RESTRICT)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler la politique de suppression ON DELETE CASCADE ou ON DELETE RESTRICT lors de la suppression d’un enregistrement parent.',
    brief: '<p>Lorsqu’un enregistrement parent est supprimé :\n- <code>RESTRICT</code> : La suppression est immédiatement <strong>rejetée</strong> si au moins un enfant dépend de ce parent.\n- <code>CASCADE</code> : La suppression du parent est <strong>acceptée</strong> et entraîne automatiquement la suppression de tous ses enregistrements enfants.</p>\n<p>Entrée :\n- Ligne 1 : <code>ACTION,ID_PARENT_A_SUPPRIMER</code> (ex: <code>CASCADE,10</code> ou <code>RESTRICT,20</code>).\n- Ligne 2 : Liste des enfants au format <code>id_enfant:parent_id</code> séparés par des virgules.\n\nSortie :\n- Si RESTRICT rejeté : <code>ERREUR: Suppression interdite (enfants presents: &lt;id1,id2&gt;)</code>\n- Si RESTRICT accepté (aucun enfant) : <code>SUCCES: Parent &lt;ID&gt; supprime | Enfants restants: &lt;liste&gt;</code>\n- Si CASCADE : <code>SUCCES: Parent &lt;ID&gt; supprime | Enfants supprimes: &lt;Nb&gt; | Enfants restants: &lt;liste&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : parser l action et l ID cible, et appliquer RESTRICT ou CASCADE
`,
    hints: [
      'Sépare l action (RESTRICT ou CASCADE) et l ID parent sur la première ligne.',
      'Identifie tous les enfants qui ont ce parent_id.',
      'Pour CASCADE, filtre les enfants pour ne garder que ceux dont le parent_id est différent.'
    ],
    examples: [
      {
        stdin: "RESTRICT,10\n1:10,2:20,3:10,4:30",
        expected: "ERREUR: Suppression interdite (enfants presents: 1,3)",
        note: "La suppression du parent 10 est bloquée par RESTRICT car les enfants 1 et 3 y sont rattachés."
      }
    ],
    tests: [
      {
        label: 'RESTRICT réussi car aucun enfant rattaché',
        stdin: "RESTRICT,99\n1:10,2:20,3:30",
        expected: "SUCCES: Parent 99 supprime | Enfants restants: 1,2,3"
      },
      {
        label: 'CASCADE avec suppression de deux enfants',
        stdin: "CASCADE,10\n1:10,2:20,3:10,4:30",
        expected: "SUCCES: Parent 10 supprime | Enfants supprimes: 2 | Enfants restants: 2,4"
      },
      {
        label: 'CASCADE sans enfant lié',
        stdin: "CASCADE,50\n1:10,2:20",
        expected: "SUCCES: Parent 50 supprime | Enfants supprimes: 0 | Enfants restants: 1,2"
      },
      {
        label: 'CASCADE supprimant tous les enfants',
        stdin: "CASCADE,5\n10:5,11:5,12:5",
        expected: "SUCCES: Parent 5 supprime | Enfants supprimes: 3 | Enfants restants: AUCUN"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
if len(lignes) < 2:
    sys.exit(0)

action, target_parent = [x.strip() for x in lignes[0].split(',', 1)]
action = action.upper()

enfants = []
for item in lignes[1].split(','):
    item = item.strip()
    if not item or ':' not in item:
        continue
    eid, pid = item.split(':', 1)
    enfants.append((eid.strip(), pid.strip()))

enfants_lies = [eid for eid, pid in enfants if pid == target_parent]

if action == 'RESTRICT':
    if enfants_lies:
        print(f"ERREUR: Suppression interdite (enfants presents: {','.join(enfants_lies)})")
    else:
        restants = [eid for eid, pid in enfants]
        restants_text = ','.join(restants) if restants else 'AUCUN'
        print(f"SUCCES: Parent {target_parent} supprime | Enfants restants: {restants_text}")
elif action == 'CASCADE':
    restants = [eid for eid, pid in enfants if pid != target_parent]
    restants_text = ','.join(restants) if restants else 'AUCUN'
    print(f"SUCCES: Parent {target_parent} supprime | Enfants supprimes: {len(enfants_lies)} | Enfants restants: {restants_text}")
`
  }
];
