/**
 * Exercices du chapitre 3 — SQL B2.
 * Jointures Multi-tables, Sous-requêtes & Expressions Conditionnelles.
 */
'use strict';

module.exports = [
  {
    id: 'sql2-c3-e1',
    chapter: 3,
    title: 'Moteur de jointure relationnelle (INNER JOIN vs LEFT JOIN)',
    level: 'n1',
    language: 'python',
    goal: 'Simuler les jointures INNER et LEFT OUTER entre une table Clients et une table Commandes.',
    brief: '<p>Le script simule l’exécution d’une jointure SQL entre :\n- Table <code>Clients(id, nom)</code>\n- Table <code>Commandes(cmd_id, client_id, montant)</code>\n\nEntrée :\n- Ligne 1 : Type de jointure : <code>INNER</code> ou <code>LEFT</code>.\n- Ligne 2 : Clients séparés par des points-virgules <code>id:nom</code>.\n- Ligne 3 : Commandes séparées par des points-virgules <code>cmd_id:client_id:montant</code>.\n\nSortie :\nPour chaque paire issue de la jointure, afficher une ligne : <code>nom | cmd_id | montant</code> (en cas de LEFT JOIN sans commande, afficher <code>NULL</code> pour cmd_id et montant). Trier par nom de client puis par cmd_id croissant.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : charger les clients et commandes, puis appliquer INNER ou LEFT JOIN
`,
    hints: [
      'Stocke les clients dans une liste de dictionnaires ou tuples ordonnés.',
      'Pour chaque client, trouve toutes ses commandes correspondantes.',
      'Si c est un LEFT JOIN et qu un client n a pas de commande, produis une ligne avec NULL.'
    ],
    examples: [
      {
        stdin: "INNER\n1:Alice;2:Bob;3:Claire\n101:1:150;102:1:300;103:2:50",
        expected: "Alice | 101 | 150\nAlice | 102 | 300\nBob | 103 | 50",
        note: "Claire n'a pas de commande, elle est donc exclue du INNER JOIN."
      }
    ],
    tests: [
      {
        label: 'LEFT JOIN incluant le client sans commande',
        stdin: "LEFT\n1:Alice;2:Bob;3:Claire\n101:1:150;102:1:300;103:2:50",
        expected: "Alice | 101 | 150\nAlice | 102 | 300\nBob | 103 | 50\nClaire | NULL | NULL"
      },
      {
        label: 'INNER JOIN avec commandes multiples',
        stdin: "INNER\n10:Zoe;20:David\n501:20:80;502:20:120;503:10:450",
        expected: "David | 501 | 80\nDavid | 502 | 120\nZoe | 503 | 450"
      },
      {
        label: 'LEFT JOIN où aucun client n a de commande',
        stdin: "LEFT\n1:Marc;2:Sophie\n",
        expected: "Marc | NULL | NULL\nSophie | NULL | NULL"
      },
      {
        label: 'INNER JOIN vide car aucune correspondance',
        stdin: "INNER\n1:Marc;2:Sophie\n999:99:100",
        expected: "AUCUN RESULTAT"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
if not lignes:
    sys.exit(0)

join_type = lignes[0].upper()
clients_str = lignes[1] if len(lignes) > 1 else ''
commandes_str = lignes[2] if len(lignes) > 2 else ''

clients = []
for c in clients_str.split(';'):
    c = c.strip()
    if not c or ':' not in c:
        continue
    cid, cnom = c.split(':', 1)
    clients.append({'id': cid.strip(), 'nom': cnom.strip()})

commandes = []
for cmd in commandes_str.split(';'):
    cmd = cmd.strip()
    if not cmd or ':' not in cmd:
        continue
    parts = cmd.split(':')
    if len(parts) >= 3:
        commandes.append({'cmd_id': parts[0].strip(), 'client_id': parts[1].strip(), 'montant': parts[2].strip()})

# Traitement de la jointure
resultats = []

for c in clients:
    cmds_du_client = [cmd for cmd in commandes if cmd['client_id'] == c['id']]
    if cmds_du_client:
        for cmd in cmds_du_client:
            resultats.append((c['nom'], cmd['cmd_id'], cmd['montant']))
    elif join_type == 'LEFT':
        resultats.append((c['nom'], 'NULL', 'NULL'))

# Tri par nom de client puis cmd_id (les 'NULL' à la fin si égalité)
def sort_key(item):
    nom, cmd_id, _ = item
    cmd_val = int(cmd_id) if cmd_id.isdigit() else 999999999
    return (nom, cmd_val)

resultats.sort(key=sort_key)

if not resultats:
    print("AUCUN RESULTAT")
else:
    for nom, cmd_id, montant in resultats:
        print(f"{nom} | {cmd_id} | {montant}")
`
  },
  {
    id: 'sql2-c3-e2',
    chapter: 3,
    title: 'Évaluateur de sous-requête corrélée avec clause EXISTS',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le prédicat SQL EXISTS / NOT EXISTS évaluant l’existence de lignes dans une table liée.',
    brief: '<p>Une clause <code>EXISTS (SELECT 1 FROM ...)</code> est vraie dès lors que la sous-requête corrélée renvoie au moins une ligne.\nLe script simule la requête :\n<code>SELECT nom FROM Fournisseurs f WHERE [NOT] EXISTS (SELECT 1 FROM Produits p WHERE p.fournisseur_id = f.id AND p.stock &gt;= seuil)</code>\n\nEntrée :\n- Ligne 1 : Mode (<code>EXISTS</code> ou <code>NOT_EXISTS</code>) et seuil de stock séparés par une virgule (ex: <code>EXISTS,10</code>).\n- Ligne 2 : Fournisseurs <code>id:nom</code> séparés par des virgules.\n- Ligne 3 : Produits <code>id:fournisseur_id:stock</code> séparés par des virgules.\n\nSortie :\nNoms des fournisseurs retenus séparés par des virgules, triés alphabétiquement (ou <code>AUCUN</code>).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : évaluer la condition EXISTS / NOT EXISTS sur chaque fournisseur
`,
    hints: [
      'Pour chaque fournisseur, cherche si au moins un produit respecte p.fournisseur_id == f.id et stock >= seuil.',
      'Si le mode est EXISTS, retiens le fournisseur si au moins un produit correspond.',
      'Si le mode est NOT_EXISTS, retiens le fournisseur si aucun produit ne correspond.'
    ],
    examples: [
      {
        stdin: "EXISTS,10\n1:Acme,2:Globex,3:Initech\n101:1:15,102:1:5,103:2:2",
        expected: "Acme",
        note: "Seul Acme a au moins un produit avec stock >= 10 (produit 101 avec stock 15)."
      }
    ],
    tests: [
      {
        label: 'NOT_EXISTS avec plusieurs résultats',
        stdin: "NOT_EXISTS,10\n1:Acme,2:Globex,3:Initech\n101:1:15,102:1:5,103:2:2",
        expected: "Globex,Initech"
      },
      {
        label: 'EXISTS avec plusieurs fournisseurs satisfaits',
        stdin: "EXISTS,50\n1:Alpha,2:Beta,3:Gamma\n11:1:60,12:2:50,13:3:10",
        expected: "Alpha,Beta"
      },
      {
        label: 'Aucun fournisseur ne satisfait EXISTS',
        stdin: "EXISTS,100\n1:Alpha,2:Beta\n11:1:10,12:2:20",
        expected: "AUCUN"
      },
      {
        label: 'Fournisseur sans aucun produit lié',
        stdin: "NOT_EXISTS,1\n1:Orphelin,2:Actif\n10:2:5",
        expected: "Orphelin"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
if len(lignes) < 2:
    sys.exit(0)

mode, seuil_str = [x.strip() for x in lignes[0].split(',', 1)]
seuil = int(seuil_str)

fournisseurs = []
for f in lignes[1].split(','):
    f = f.strip()
    if not f or ':' not in f:
        continue
    fid, fnom = f.split(':', 1)
    fournisseurs.append({'id': fid.strip(), 'nom': fnom.strip()})

produits = []
if len(lignes) > 2 and lignes[2].strip():
    for p in lignes[2].split(','):
        p = p.strip()
        if not p or ':' not in p:
            continue
        pid, pfid, pstock = p.split(':', 2)
        produits.append({'id': pid.strip(), 'fournisseur_id': pfid.strip(), 'stock': int(pstock.strip())})

retenus = []
for f in fournisseurs:
    a_produit_valide = any(p['fournisseur_id'] == f['id'] and p['stock'] >= seuil for p in produits)
    if mode == 'EXISTS' and a_produit_valide:
        retenus.append(f['nom'])
    elif mode == 'NOT_EXISTS' and not a_produit_valide:
        retenus.append(f['nom'])

retenus.sort()
if not retenus:
    print("AUCUN")
else:
    print(','.join(retenus))
`
  },
  {
    id: 'sql2-c3-e3',
    chapter: 3,
    title: 'Interpréteur d’expression conditionnelle SQL CASE WHEN',
    level: 'n3',
    language: 'python',
    goal: 'Simuler la transformation de données par une expression conditionnelle CASE WHEN ... THEN ... ELSE ... END.',
    brief: '<p>En SQL, la structure <code>CASE WHEN condition THEN resultat ... ELSE defaut END</code> permet d’affecter dynamiquement des catégories calculées.\nOn applique les règles de classification suivantes sur le score d’un examen :\n- Score &ge; 85 : <code>EXCELLENT</code>\n- Score &ge; 70 : <code>BIEN</code>\n- Score &ge; 50 : <code>PASSABLE</code>\n- Sinon : <code>ECHEC</code>\n\nEntrée :\nUne liste de couples <code>nom:score</code> séparés par des virgules (ex: <code>Alice:90,Bob:65,Claire:45</code>).\n\nSortie :\nPour chaque étudiant (dans l’ordre d’entrée) : <code>&lt;nom&gt;: &lt;Score&gt; -&gt; &lt;Mention&gt;</code>.</p>',
    starter: `import sys

ligne = sys.stdin.read().strip()

# À compléter : parser chaque étudiant et déterminer sa mention selon la logique CASE WHEN
`,
    hints: [
      'Découpe la ligne par les virgules, puis chaque étudiant par deux-points.',
      'Évalue les conditions dans l ordre décroissant des seuils (85, 70, 50).',
      'Assure-toi que la valeur finale par défaut (ELSE) est ECHEC.'
    ],
    examples: [
      {
        stdin: "Alice:90,Bob:65,Claire:45,David:70",
        expected: "Alice: 90 -> EXCELLENT\nBob: 65 -> PASSABLE\nClaire: 45 -> ECHEC\nDavid: 70 -> BIEN",
        note: "Chaque score est évalué séquentiellement par les branches du CASE WHEN."
      }
    ],
    tests: [
      {
        label: 'Cas limites exacts sur les seuils',
        stdin: "T1:85,T2:70,T3:50,T4:49",
        expected: "T1: 85 -> EXCELLENT\nT2: 70 -> BIEN\nT3: 50 -> PASSABLE\nT4: 49 -> ECHEC"
      },
      {
        label: 'Tous en échec',
        stdin: "U1:10,U2:25,U3:0",
        expected: "U1: 10 -> ECHEC\nU2: 25 -> ECHEC\nU3: 0 -> ECHEC"
      },
      {
        label: 'Tous en mention excellente',
        stdin: "A1:100,A2:95,A3:86",
        expected: "A1: 100 -> EXCELLENT\nA2: 95 -> EXCELLENT\nA3: 86 -> EXCELLENT"
      },
      {
        label: 'Un seul étudiant',
        stdin: "Solo:75",
        expected: "Solo: 75 -> BIEN"
      }
    ],
    solution: `import sys

ligne = sys.stdin.read().strip()
if not ligne:
    sys.exit(0)

for item in ligne.split(','):
    item = item.strip()
    if not item or ':' not in item:
        continue
    nom, score_str = item.split(':', 1)
    nom = nom.strip()
    score = float(score_str.strip())
    score_disp = int(score) if score.is_integer() else score
    
    if score >= 85:
        mention = 'EXCELLENT'
    elif score >= 70:
        mention = 'BIEN'
    elif score >= 50:
        mention = 'PASSABLE'
    else:
        mention = 'ECHEC'
        
    print(f"{nom}: {score_disp} -> {mention}")
`
  }
];
