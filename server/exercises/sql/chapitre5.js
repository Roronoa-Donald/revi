/**
 * Exercices du chapitre 5 — SQL B2.
 * Transactions ACID, Concurrence & Niveaux d’Isolation.
 */
'use strict';

module.exports = [
  {
    id: 'sql2-c5-e1',
    chapter: 5,
    title: 'Simulateur de transaction atomique bancaire (COMMIT vs ROLLBACK)',
    level: 'n1',
    language: 'python',
    goal: 'Appliquer l’atomicité (A de ACID) : si un virement échoue (fonds insuffisants), la transaction entière est annulée.',
    brief: '<p>Une transaction bancaire transfère des fonds entre comptes : <code>TRANSFERT source destination montant</code>. Pour chaque transfert, le compte source doit exister et disposer d’au moins le montant demandé (pas de découvert). Le compte destination doit également exister.\nSi toutes les opérations réussissent, la transaction fait <code>COMMIT</code>. Si la moindre opération échoue, la transaction fait <code>ROLLBACK</code> et restaure l’état exact de départ.</p>\n<p>Entrée :\n- Ligne 1 : Soldes initiaux <code>compte:solde</code> séparés par des virgules (ex: <code>A:1000,B:500,C:200</code>).\n- Lignes suivantes : Opérations <code>TRANSFERT source destination montant</code>.\n\nSortie :\n- Si succès : <code>Statut: COMMIT | Soldes: &lt;compte:solde triés&gt;</code>\n- Si échec : <code>Statut: ROLLBACK | Erreur: &lt;Raison&gt; | Soldes: &lt;soldes initiaux inchangés&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la transaction et appliquer COMMIT ou ROLLBACK selon la validité
`,
    hints: [
      'Garde une copie indépendante des soldes initiaux pour le ROLLBACK.',
      'Vérifie que les comptes source et destination existent.',
      'Vérifie que le solde de la source est suffisant (>= montant).',
      'Si une erreur survient, interromps les virements et restaure la copie de départ.'
    ],
    examples: [
      {
        stdin: "A:1000,B:500,C:200\nTRANSFERT A B 300\nTRANSFERT B C 150",
        expected: "Statut: COMMIT | Soldes: A:700,B:650,C:350",
        note: "Tous les virements sont valides, la transaction est validée (COMMIT)."
      }
    ],
    tests: [
      {
        label: 'ROLLBACK pour solde insuffisant',
        stdin: "A:100,B:50\nTRANSFERT A B 50\nTRANSFERT A B 80",
        expected: "Statut: ROLLBACK | Erreur: Solde insuffisant pour A | Soldes: A:100,B:50"
      },
      {
        label: 'ROLLBACK pour compte inexistant',
        stdin: "A:500,B:200\nTRANSFERT A Z 100",
        expected: "Statut: ROLLBACK | Erreur: Compte inconnu Z | Soldes: A:500,B:200"
      },
      {
        label: 'Multiple transferts équilibrés avec COMMIT',
        stdin: "A:100,B:100,C:100\nTRANSFERT A B 100\nTRANSFERT B C 200\nTRANSFERT C A 50",
        expected: "Statut: COMMIT | Soldes: A:50,B:0,C:250"
      },
      {
        label: 'Transfert d un montant exactement égal au solde',
        stdin: "X:40,Y:10\nTRANSFERT X Y 40",
        expected: "Statut: COMMIT | Soldes: X:0,Y:50"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
if not lignes:
    sys.exit(0)

# Soldes initiaux
soldes_init = {}
for p in lignes[0].split(','):
    p = p.strip()
    if not p or ':' not in p:
        continue
    c, s = p.split(':', 1)
    soldes_init[c.strip()] = int(float(s.strip()))

soldes_courants = dict(soldes_init)

erreur = None

for op in lignes[1:]:
    parts = op.split()
    if len(parts) >= 4 and parts[0].upper() == 'TRANSFERT':
        src, dest, mnt_str = parts[1].strip(), parts[2].strip(), parts[3].strip()
        mnt = int(float(mnt_str))
        
        if src not in soldes_courants:
            erreur = f"Compte inconnu {src}"
            break
        if dest not in soldes_courants:
            erreur = f"Compte inconnu {dest}"
            break
        if soldes_courants[src] < mnt:
            erreur = f"Solde insuffisant pour {src}"
            break
            
        soldes_courants[src] -= mnt
        soldes_courants[dest] += mnt

def format_soldes(d):
    return ','.join(f"{k}:{d[k]}" for k in sorted(d.keys()))

if erreur:
    print(f"Statut: ROLLBACK | Erreur: {erreur} | Soldes: {format_soldes(soldes_init)}")
else:
    print(f"Statut: COMMIT | Soldes: {format_soldes(soldes_courants)}")
`
  },
  {
    id: 'sql2-c5-e2',
    chapter: 5,
    title: 'Gestionnaire de points de sauvegarde SAVEPOINT & ROLLBACK TO',
    level: 'n2',
    language: 'python',
    goal: 'Gérer des états intermédiaires dans une transaction avec les points de reprise SAVEPOINT.',
    brief: '<p>Dans une longue transaction SQL, l’instruction <code>SAVEPOINT nom_point</code> sauvegarde l’état courant de la base. En cas d’erreur survenue ultérieurement, la commande <code>ROLLBACK TO nom_point</code> annule uniquement les opérations effectuées après ce point de sauvegarde sans compromettre le reste de la transaction.</p>\n<p>Entrée :\nUne suite de commandes sur chaque ligne :\n- <code>AJOUT cle valeur</code>\n- <code>SAVEPOINT nom</code>\n- <code>ROLLBACK TO nom</code>\n- <code>COMMIT</code>\n\nSortie :\n<code>Etat_Final: &lt;cle:valeur triées&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la pile de sauvegarde de la transaction et exécuter les commandes
`,
    hints: [
      'Maintiens un dictionnaire représentant l état de la base.',
      'Pour chaque SAVEPOINT nom, sauvegarde une copie superficielle ou profonde du dictionnaire dans un historique {nom: copie}.',
      'Lors de ROLLBACK TO nom, restaure la copie correspondante.'
    ],
    examples: [
      {
        stdin: "AJOUT A 10\nSAVEPOINT sp1\nAJOUT B 20\nROLLBACK TO sp1\nAJOUT C 30\nCOMMIT",
        expected: "Etat_Final: A:10,C:30",
        note: "L'ajout de B est annulé par le ROLLBACK TO sp1, mais A:10 est conservé."
      }
    ],
    tests: [
      {
        label: 'Savepoints multiples emboîtés',
        stdin: "AJOUT X 1\nSAVEPOINT sp1\nAJOUT Y 2\nSAVEPOINT sp2\nAJOUT Z 3\nROLLBACK TO sp2\nCOMMIT",
        expected: "Etat_Final: X:1,Y:2"
      },
      {
        label: 'Retour complet au premier savepoint',
        stdin: "AJOUT K 100\nSAVEPOINT depart\nAJOUT K 200\nAJOUT L 300\nROLLBACK TO depart\nCOMMIT",
        expected: "Etat_Final: K:100"
      },
      {
        label: 'Aucun rollback intervenu',
        stdin: "AJOUT A 1\nAJOUT B 2\nCOMMIT",
        expected: "Etat_Final: A:1,B:2"
      },
      {
        label: 'Écrasement d une valeur avec rollback',
        stdin: "AJOUT score 10\nSAVEPOINT avant_modif\nAJOUT score 99\nROLLBACK TO avant_modif\nCOMMIT",
        expected: "Etat_Final: score:10"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

db = {}
savepoints = {}

for lig in lignes:
    if not lig:
        continue
    parts = lig.split()
    cmd = parts[0].upper()
    
    if cmd == 'AJOUT' and len(parts) >= 3:
        cle, val = parts[1].strip(), parts[2].strip()
        db[cle] = val
    elif cmd == 'SAVEPOINT' and len(parts) >= 2:
        sp_name = parts[1].strip()
        savepoints[sp_name] = dict(db)
    elif cmd == 'ROLLBACK' and len(parts) >= 3 and parts[1].upper() == 'TO':
        sp_name = parts[2].strip()
        if sp_name in savepoints:
            db = dict(savepoints[sp_name])
    elif cmd == 'COMMIT':
        break

res = ','.join(f"{k}:{db[k]}" for k in sorted(db.keys()))
print(f"Etat_Final: {res if res else 'VIDE'}")
`
  },
  {
    id: 'sql2-c5-e3',
    chapter: 5,
    title: 'Détecteur d’interblocage (Deadlock) par graphe d’attente (Wait-For Graph)',
    level: 'n3',
    language: 'python',
    goal: 'Construire le graphe orienté de dépendance des transactions et détecter la présence d’un cycle d’interblocage.',
    brief: '<p>Un interblocage (Deadlock) survient lorsque deux ou plusieurs transactions s’attendent mutuellement pour libérer des verrous exclusifs.\nSi la transaction T1 détient la ressource R1 et attend R2, alors que T2 détient R2 et attend R1, il y a une dépendance circulaire <code>T1 -&gt; T2 -&gt; T1</code>.</p>\n<p>Entrée :\nChaque ligne décrit une transaction : <code>T_ID DETIENT ressource_tenue ATTEND ressource_attendue</code> (ou <code>ATTEND AUCUNE</code> s’il n’y a pas d’attente).\n\nSortie :\n- S’il existe un cycle : <code>DEADLOCK DETECTE: cycle &lt;T_A -&gt; T_B -&gt; ... -&gt; T_A&gt;</code>\n- Si le graphe est acyclique : <code>AUCUN DEADLOCK: execution possible</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : mapper les ressources aux transactions, construire le graphe T_i -> T_j et détecter les cycles
`,
    hints: [
      'Établis qui détient chaque ressource : detenteurs[ressource] = transaction.',
      'Pour chaque transaction qui attend une ressource, crée une arête orientée : T_demandeur -> detenteurs[ressource].',
      'Applique un parcours en profondeur (DFS) pour détecter si un cycle existe.'
    ],
    examples: [
      {
        stdin: "T1 DETIENT R1 ATTEND R2\nT2 DETIENT R2 ATTEND R1",
        expected: "DEADLOCK DETECTE: cycle T1 -> T2 -> T1",
        note: "T1 attend T2 qui attend T1 : cycle d'interblocage."
      }
    ],
    tests: [
      {
        label: 'Exécution séquentielle sans cycle',
        stdin: "T1 DETIENT R1 ATTEND AUCUNE\nT2 DETIENT R2 ATTEND R1",
        expected: "AUCUN DEADLOCK: execution possible"
      },
      {
        label: 'Interblocage à 3 transactions (T1 -> T2 -> T3 -> T1)',
        stdin: "T1 DETIENT R1 ATTEND R2\nT2 DETIENT R2 ATTEND R3\nT3 DETIENT R3 ATTEND R1",
        expected: "DEADLOCK DETECTE: cycle T1 -> T2 -> T3 -> T1"
      },
      {
        label: 'Graphe sans attente mutuelle',
        stdin: "T1 DETIENT R1 ATTEND R3\nT2 DETIENT R2 ATTEND R3\nT3 DETIENT R3 ATTEND AUCUNE",
        expected: "AUCUN DEADLOCK: execution possible"
      },
      {
        label: 'Transactions indépendantes',
        stdin: "T1 DETIENT R1 ATTEND AUCUNE\nT2 DETIENT R2 ATTEND AUCUNE",
        expected: "AUCUN DEADLOCK: execution possible"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]
if not lignes:
    sys.exit(0)

detenteurs = {} # ressource -> transaction
attentes = {}   # transaction -> ressource_attendue

for lig in lignes:
    parts = lig.split()
    if len(parts) >= 5 and parts[1].upper() == 'DETIENT' and parts[3].upper() == 'ATTEND':
        t_id = parts[0].strip()
        r_tenue = parts[2].strip()
        r_att = parts[4].strip()
        detenteurs[r_tenue] = t_id
        if r_att.upper() != 'AUCUNE':
            attentes[t_id] = r_att

# Construire le graphe d'attente : T_i attend que T_j libère
adj = {}
nodes = set()
for t, r in attentes.items():
    nodes.add(t)
    if r in detenteurs:
        cible = detenteurs[r]
        nodes.add(cible)
        adj.setdefault(t, []).append(cible)

# Recherche de cycle via DFS
visited = {} # node: 0 (unvisited), 1 (visiting), 2 (visited)
for n in nodes:
    visited[n] = 0

cycle_trouve = None

def dfs(node, path):
    global cycle_trouve
    visited[node] = 1
    path.append(node)
    
    for voisin in adj.get(node, []):
        if visited.get(voisin, 0) == 1:
            # Cycle trouvé !
            idx = path.index(voisin)
            cycle_trouve = path[idx:] + [voisin]
            return True
        elif visited.get(voisin, 0) == 0:
            if dfs(voisin, path):
                return True
                
    path.pop()
    visited[node] = 2
    return False

for n in sorted(nodes):
    if visited[n] == 0:
        if dfs(n, []):
            break

if cycle_trouve:
    cycle_str = ' -> '.join(cycle_trouve)
    print(f"DEADLOCK DETECTE: cycle {cycle_str}")
else:
    print("AUCUN DEADLOCK: execution possible")
`
  }
];
