/**
 * Exercices du chapitre 6 — SQL B2.
 * Vues, Procédures Stockées, Déclencheurs (Triggers) & Optimisation (Index).
 */
'use strict';

module.exports = [
  {
    id: 'sql2-c6-e1',
    chapter: 6,
    title: 'Émulateur de déclencheur BEFORE INSERT avec contrôle de cohérence',
    level: 'n1',
    language: 'python',
    goal: 'Simuler un trigger BEFORE INSERT qui valide ou ajuste les valeurs de la pseudo-ligne NEW.',
    brief: '<p>Avant d’insérer un nouvel article dans la table <code>Articles(id, nom, prix, stock)</code>, un déclencheur <code>BEFORE INSERT</code> applique deux règles métier impératives :\n1. Si <code>NEW.prix &lt;= 0</code>, l’insertion est bloquée avec une erreur ;\n2. Si <code>NEW.stock &lt; 0</code>, la valeur est automatiquement corrigée à <code>NEW.stock = 0</code>.\nSi le prix est strictement positif, l’enregistrement est inséré avec un nouvel ID auto-incrémenté démarrant à 1.\n\nEntrée :\nChaque ligne contient une tentative d’insertion : <code>nom,prix,stock</code>.\n\nSortie :\nPour chaque ligne :\n- En cas d’erreur : <code>REJET: &lt;nom&gt; (prix invalide &lt;prix&gt;)</code>\n- En cas de succès : <code>INSERE: id=&lt;id&gt; | &lt;nom&gt; | &lt;prix&gt;€ | stock=&lt;stock_ajuste&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le déclencheur BEFORE INSERT et traiter les insertions
`,
    hints: [
      'Garde un compteur auto-incrémenté pour l id qui n augmente QUE si l insertion réussit.',
      'Vérifie d abord si prix <= 0.',
      'Si stock < 0, remplace stock par 0 avant d afficher la ligne insérée.'
    ],
    examples: [
      {
        stdin: "Clavier,25,10\nSouris,-5,5\nEcran,180,-3",
        expected: "INSERE: id=1 | Clavier | 25€ | stock=10\nREJET: Souris (prix invalide -5)\nINSERE: id=2 | Ecran | 180€ | stock=0",
        note: "La souris est rejetée car prix négatif. L'écran est accepté avec stock ramené à 0."
      }
    ],
    tests: [
      {
        label: 'Prix exactement zéro rejeté',
        stdin: "Cadeau,0,100",
        expected: "REJET: Cadeau (prix invalide 0)"
      },
      {
        label: 'Toutes les lignes sont valides',
        stdin: "T1,10,5\nT2,20,15\nT3,30,0",
        expected: "INSERE: id=1 | T1 | 10€ | stock=5\nINSERE: id=2 | T2 | 20€ | stock=15\nINSERE: id=3 | T3 | 30€ | stock=0"
      },
      {
        label: 'Stock négatif ajusté à 0',
        stdin: "Casque,50,-10\nTapis,15,-1",
        expected: "INSERE: id=1 | Casque | 50€ | stock=0\nINSERE: id=2 | Tapis | 15€ | stock=0"
      },
      {
        label: 'Ligne unique avec prix décimal',
        stdin: "CleUSB,12.5,4",
        expected: "INSERE: id=1 | CleUSB | 12.5€ | stock=4"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

curr_id = 1

for lig in lignes:
    parts = [p.strip() for p in lig.split(',')]
    if len(parts) >= 3:
        nom = parts[0]
        prix = float(parts[1])
        stock = int(float(parts[2]))
        
        prix_disp = int(prix) if prix.is_integer() else prix
        
        # Règle 1 : Prix > 0 obligatoire
        if prix <= 0:
            print(f"REJET: {nom} (prix invalide {prix_disp})")
            continue
            
        # Règle 2 : Stock ramené à 0 si négatif
        if stock < 0:
            stock = 0
            
        print(f"INSERE: id={curr_id} | {nom} | {prix_disp}€ | stock={stock}")
        curr_id += 1
`
  },
  {
    id: 'sql2-c6-e2',
    chapter: 6,
    title: 'Déclencheur AFTER UPDATE avec table d’audit OLD vs NEW',
    level: 'n2',
    language: 'python',
    goal: 'Générer des entrées de journalisation d’audit comparant l’ancienne valeur (OLD) et la nouvelle valeur (NEW).',
    brief: '<p>Lorsqu’une instruction <code>UPDATE</code> modifie un enregistrement dans la table <code>Comptes(id, statut, solde)</code>, un déclencheur <code>AFTER UPDATE</code> insère une ligne d’audit pour chaque colonne dont la valeur a changé :\n<code>AUDIT: user_id=&lt;id&gt; | champ=&lt;nom_champ&gt; | ancien=&lt;OLD&gt; | nouveau=&lt;NEW&gt;</code>\nSi la valeur d’un champ n’a pas changé, aucune trace d’audit n’est produite pour ce champ.</p>\n<p>Entrée :\n- Ligne 1 : État initial des comptes <code>id:statut:solde</code> séparés par des points-virgules (ex: <code>1:ACTIF:1000;2:BLOQUE:500</code>).\n- Lignes suivantes : Mises à jour <code>UPDATE id NOUVEAU_STATUT NOUVEAU_SOLDE</code>.\n\nSortie :\nLa liste des lignes d’audit générées (ou <code>AUCUNE MODIFICATION</code> si rien n’a changé).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : charger l état des comptes, appliquer les UPDATEs et émettre l audit pour chaque champ modifié
`,
    hints: [
      'Stocke les comptes dans un dictionnaire {id: {"statut": ..., "solde": ...}}.',
      'Compare statut_old et statut_new : s ils sont différents, émets une ligne d audit.',
      'Fais de même pour solde_old et solde_new.'
    ],
    examples: [
      {
        stdin: "1:ACTIF:1000;2:BLOQUE:500\nUPDATE 1 ACTIF 1200\nUPDATE 2 ACTIF 500",
        expected: "AUDIT: user_id=1 | champ=solde | ancien=1000 | nouveau=1200\nAUDIT: user_id=2 | champ=statut | ancien=BLOQUE | nouveau=ACTIF",
        note: "Pour le compte 1, seul le solde a changé. Pour le compte 2, seul le statut a changé."
      }
    ],
    tests: [
      {
        label: 'Deux champs modifiés en même temps',
        stdin: "1:ACTIF:100\nUPDATE 1 FERME 0",
        expected: "AUDIT: user_id=1 | champ=statut | ancien=ACTIF | nouveau=FERME\nAUDIT: user_id=1 | champ=solde | ancien=100 | nouveau=0"
      },
      {
        label: 'Aucun changement réel (valeurs identiques)',
        stdin: "10:ACTIF:500\nUPDATE 10 ACTIF 500",
        expected: "AUCUNE MODIFICATION"
      },
      {
        label: 'Plusieurs updates successifs sur le même compte',
        stdin: "5:ATTENTE:10\nUPDATE 5 ACTIF 10\nUPDATE 5 ACTIF 50",
        expected: "AUDIT: user_id=5 | champ=statut | ancien=ATTENTE | nouveau=ACTIF\nAUDIT: user_id=5 | champ=solde | ancien=10 | nouveau=50"
      },
      {
        label: 'Comptes multiples mis à jour',
        stdin: "A:OK:10;B:OK:20\nUPDATE A OK 15\nUPDATE B KO 20",
        expected: "AUDIT: user_id=A | champ=solde | ancien=10 | nouveau=15\nAUDIT: user_id=B | champ=statut | ancien=OK | nouveau=KO"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
if not lignes:
    sys.exit(0)

comptes = {}
for item in lignes[0].split(';'):
    item = item.strip()
    if not item or ':' not in item:
        continue
    parts = item.split(':')
    if len(parts) >= 3:
        cid, st, sol = parts[0].strip(), parts[1].strip(), parts[2].strip()
        comptes[cid] = {'statut': st, 'solde': sol}

audits = []

for lig in lignes[1:]:
    parts = lig.split()
    if len(parts) >= 4 and parts[0].upper() == 'UPDATE':
        cid, n_statut, n_solde = parts[1].strip(), parts[2].strip(), parts[3].strip()
        if cid in comptes:
            old = comptes[cid]
            if old['statut'] != n_statut:
                audits.append(f"AUDIT: user_id={cid} | champ=statut | ancien={old['statut']} | nouveau={n_statut}")
            if old['solde'] != n_solde:
                audits.append(f"AUDIT: user_id={cid} | champ=solde | ancien={old['solde']} | nouveau={n_solde}")
            comptes[cid] = {'statut': n_statut, 'solde': n_solde}

if not audits:
    print("AUCUNE MODIFICATION")
else:
    for a in audits:
        print(a)
`
  },
  {
    id: 'sql2-c6-e3',
    chapter: 6,
    title: 'Analyseur de plan d’exécution EXPLAIN (Seq Scan vs Index Scan)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le choix du planificateur de requêtes SQL entre parcours séquentiel et parcours d’index.',
    brief: '<p>Le planificateur de requêtes (Query Optimizer) évalue le coût d’accès aux données :\n- <strong>Index Scan</strong> : Si la condition WHERE porte sur une colonne disposant d’un index avec égalité (ex: <code>WHERE email = \'...\'</code>), le coût estimé est logarithmique : <code>cout = 3</code> (lecture de 3 blocs d’index et de table) ;\n- <strong>Seq Scan (Table Scan)</strong> : Si aucun index n’est disponible sur la colonne filtrée, le moteur doit lire l’intégralité des <code>N</code> lignes de la table : <code>cout = N</code>.</p>\n<p>Entrée :\n- Ligne 1 : Métadonnées : <code>table,nombre_lignes,index1|index2|...</code> (ex: <code>clients,50000,email|code_postal</code>).\n- Ligne 2 : Requête ou clause WHERE : <code>WHERE colonne = valeur</code> (ex: <code>WHERE email = \'alice@test.com\'</code>).\n\nSortie :\n<code>Methode: &lt;Index Scan (colonne) | Seq Scan&gt; | Cout_Estime: &lt;Cout&gt;</code>.</p>',
    starter: `import sys, re

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : extraire les index disponibles, analyser la colonne dans WHERE et calculer le coût
`,
    hints: [
      'Parse la première ligne pour extraire le nombre total de lignes et l ensemble des colonnes indexées.',
      'Extrais le nom de la colonne présente dans la clause WHERE (entre WHERE et =).',
      'Si la colonne est dans les index, choisis Index Scan avec cout = 3, sinon Seq Scan avec cout = nombre_lignes.'
    ],
    examples: [
      {
        stdin: "clients,50000,email|code_postal\nWHERE email = 'alice@test.com'",
        expected: "Methode: Index Scan (email) | Cout_Estime: 3",
        note: "La colonne email est indexée, le planificateur privilégie un Index Scan à coût minime (3)."
      }
    ],
    tests: [
      {
        label: 'Colonne non indexée entraînant un Seq Scan',
        stdin: "clients,50000,email|code_postal\nWHERE age = 30",
        expected: "Methode: Seq Scan | Cout_Estime: 50000"
      },
      {
        label: 'Deuxième index utilisé',
        stdin: "produits,12000,reference|categorie|fournisseur\nWHERE categorie = 'Informatique'",
        expected: "Methode: Index Scan (categorie) | Cout_Estime: 3"
      },
      {
        label: 'Table sans aucun index',
        stdin: "logs,800000,AUCUN\nWHERE ip = '192.168.1.1'",
        expected: "Methode: Seq Scan | Cout_Estime: 800000"
      },
      {
        label: 'Table de petite taille indexée',
        stdin: "parametres,100,cle\nWHERE cle = 'site_name'",
        expected: "Methode: Index Scan (cle) | Cout_Estime: 3"
      }
    ],
    solution: `import sys, re

lignes = [l.strip() for l in sys.stdin if l.strip()]
if len(lignes) < 2:
    sys.exit(0)

meta_parts = [p.strip() for p in lignes[0].split(',')]
table = meta_parts[0]
n_lignes = int(meta_parts[1])
index_list = [idx.strip().lower() for idx in meta_parts[2].split('|')] if len(meta_parts) > 2 else []

where_clause = lignes[1]
m_col = re.search(r'WHERE\\s+([a-zA-Z0-9_]+)\\s*=', where_clause, re.IGNORECASE)

if m_col:
    col_filtre = m_col.group(1).lower()
else:
    col_filtre = ''

if col_filtre in index_list:
    print(f"Methode: Index Scan ({col_filtre}) | Cout_Estime: 3")
else:
    print(f"Methode: Seq Scan | Cout_Estime: {n_lignes}")
`
  }
];
