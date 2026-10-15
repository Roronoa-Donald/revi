/**
 * Exercices du chapitre 2 — Algorithmique B3.
 * Structures Arborescentes & Arbres Binaires de Recherche (ABR).
 */
'use strict';

module.exports = [
  {
    id: 'al3-c2-e1',
    chapter: 2,
    title: 'Validateur de propriété d’Arbre Binaire de Recherche (ABR)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier si un arbre binaire donné respecte strictement la propriété d’ABR (ordre infixe strictement croissant sans doublon).',
    brief: '<p>Le script lit sur l\'entrée standard des descriptions d’arbres sous forme de blocs :<br>\n<code>ARBRE nom=&lt;nom&gt; RACINE=&lt;id&gt;</code><br>\nSuivi de lignes de nœuds : <code>NOEUD id=&lt;id&gt; val=&lt;entier&gt; g=&lt;id_gauche|-&gt; d=&lt;id_droite|-&gt;</code><br>\nEt terminé par une ligne <code>FIN</code>.<br>\nPour chaque arbre, déterminer si la propriété d\'ABR est respectée (tout sous-arbre gauche &lt; racine &lt; tout sous-arbre droit).<br>\nSi valide :<br>\n<code>ABR: &lt;nom&gt; | VALIDE : OUI | INFIXE: &lt;v1, v2, ...&gt;</code><br>\nSi non valide :<br>\n<code>ABR: &lt;nom&gt; | VALIDE : NON (Violation propriete ABR)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la structure arborescente et vérifier la propriété d'ABR
`,
    hints: [
      'Un parcours infixe (gauche, racine, droite) d’un ABR valide donne une suite de valeurs strictement croissante.',
      'Construire un dictionnaire noeuds[id] = {"val": v, "g": g, "d": d}.'
    ],
    examples: [
      {
        stdin: `ARBRE nom=arbre_valide RACINE=1
NOEUD id=1 val=50 g=2 d=3
NOEUD id=2 val=20 g=- d=-
NOEUD id=3 val=70 g=- d=-
FIN
ARBRE nom=arbre_invalide RACINE=1
NOEUD id=1 val=50 g=2 d=3
NOEUD id=2 val=60 g=- d=-
NOEUD id=3 val=70 g=- d=-
FIN`,
        expected: `ABR: arbre_valide | VALIDE : OUI | INFIXE: 20, 50, 70
ABR: arbre_invalide | VALIDE : NON (Violation propriete ABR)`,
        note: 'Le premier arbre respecte 20 < 50 < 70. Le second viole la propriété car 60 > 50 dans le sous-arbre gauche.'
      }
    ],
    tests: [
      {
        label: 'Arbre à un seul nœud',
        stdin: `ARBRE nom=mono RACINE=1
NOEUD id=1 val=42 g=- d=-
FIN`,
        expected: 'ABR: mono | VALIDE : OUI | INFIXE: 42'
      },
      {
        label: 'ABR à 3 niveaux complet',
        stdin: `ARBRE nom=trois_niveaux RACINE=4
NOEUD id=4 val=40 g=2 d=6
NOEUD id=2 val=20 g=1 d=3
NOEUD id=6 val=60 g=5 d=7
NOEUD id=1 val=10 g=- d=-
NOEUD id=3 val=30 g=- d=-
NOEUD id=5 val=50 g=- d=-
NOEUD id=7 val=70 g=- d=-
FIN`,
        expected: 'ABR: trois_niveaux | VALIDE : OUI | INFIXE: 10, 20, 30, 40, 50, 60, 70'
      },
      {
        label: 'Piège classique : nœud gauche localement valide mais globalement invalide',
        stdin: `ARBRE nom=piege RACINE=1
NOEUD id=1 val=50 g=2 d=3
NOEUD id=2 val=30 g=- d=4
NOEUD id=4 val=55 g=- d=-
NOEUD id=3 val=80 g=- d=-
FIN`,
        expected: 'ABR: piege | VALIDE : NON (Violation propriete ABR)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

i = 0
while i < len(lignes):
    m_head = re.search(r'ARBRE nom=([^\\s]+) RACINE=([^\\s]+)', lignes[i])
    if not m_head:
        i += 1
        continue
    nom = m_head.group(1)
    racine_id = m_head.group(2)
    i += 1
    noeuds = {}
    while i < len(lignes) and lignes[i] != 'FIN':
        m_noeud = re.search(r'NOEUD id=([^\\s]+) val=(-?\\d+) g=([^\\s]+) d=([^\\s]+)', lignes[i])
        if m_noeud:
            nid = m_noeud.group(1)
            v = int(m_noeud.group(2))
            g = m_noeud.group(3) if m_noeud.group(3) != '-' else None
            d = m_noeud.group(4) if m_noeud.group(4) != '-' else None
            noeuds[nid] = {'val': v, 'g': g, 'd': d}
        i += 1
    i += 1

    # Verification stricte ABR : min < val < max
    def is_bst(nid, min_val, max_val):
        if nid is None:
            return True
        node = noeuds[nid]
        v = node['val']
        if not (min_val < v < max_val):
            return False
        return is_bst(node['g'], min_val, v) and is_bst(node['d'], v, max_val)

    # Parcours infixe
    infixe = []
    def traverse(nid):
        if nid is None:
            return
        traverse(noeuds[nid]['g'])
        infixe.append(noeuds[nid]['val'])
        traverse(noeuds[nid]['d'])

    valide = is_bst(racine_id, float('-inf'), float('inf'))
    if valide:
        traverse(racine_id)
        inf_str = ", ".join(str(x) for x in infixe)
        print(f"ABR: {nom} | VALIDE : OUI | INFIXE: {inf_str}")
    else:
        print(f"ABR: {nom} | VALIDE : NON (Violation propriete ABR)")
`
  },
  {
    id: 'al3-c2-e2',
    chapter: 2,
    title: 'Insertion et recherche dans un ABR',
    level: 'n2',
    language: 'python',
    goal: 'Construire un ABR par insertions successives et mesurer le nombre de comparaisons nécessaires pour rechercher des clés.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>ARBRE nom=&lt;nom&gt; CLES=&lt;c1,c2,...&gt; RECHERCHES=&lt;r1,r2,...&gt;</code>.<br>\nPour chaque déclaration :<br>\n1. Insérer chaque clé successivement dans un ABR initialement vide (si la clé existe déjà, ignorer l’insertion).<br>\n2. Pour chaque valeur recherchée dans <code>RECHERCHES</code>, parcourir l’arbre et compter les comparaisons (&lt;, &gt;, ==).<br>\nAfficher :<br>\n<code>RECHERCHE: nom=&lt;nom&gt; val=&lt;r&gt; -&gt; &lt;TROUVE|NON_TROUVE&gt; | COMPARAISONS: &lt;nb&gt; | PROFONDEUR: &lt;prof&gt;</code><br>\n(Note : la profondeur de la racine est 0. Si non trouvé, la profondeur est la dernière profondeur atteinte).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'insertion et la recherche instrumentée dans un ABR
`,
    hints: [
      'Chaque étape de recherche effectue des comparaisons avec le nœud courant pour décider de descendre à gauche ou à droite.',
      'Si r == node.val, un test d’égalité a réussi et la recherche s’arrête.'
    ],
    examples: [
      {
        stdin: 'ARBRE nom=annuaire CLES=50,30,70,20,40,60,80 RECHERCHES=40,65',
        expected: `RECHERCHE: nom=annuaire val=40 -> TROUVE | COMPARAISONS: 3 | PROFONDEUR: 2
RECHERCHE: nom=annuaire val=65 -> NON_TROUVE | COMPARAISONS: 3 | PROFONDEUR: 2`,
        note: 'Recherche de 40 : 50 (gauche) -> 30 (droite) -> 40 (trouvé). Profondeur 2, 3 comparaisons. 65 : 50 -> 70 -> 60 -> rien.'
      }
    ],
    tests: [
      {
        label: 'Recherche racine immédiate',
        stdin: 'ARBRE nom=racine_test CLES=100,50,150 RECHERCHES=100',
        expected: 'RECHERCHE: nom=racine_test val=100 -> TROUVE | COMPARAISONS: 1 | PROFONDEUR: 0'
      },
      {
        label: 'Arbre dégénéré en liste chaînée (pire cas O(n))',
        stdin: 'ARBRE nom=degenere CLES=10,20,30,40,50 RECHERCHES=50,25',
        expected: `RECHERCHE: nom=degenere val=50 -> TROUVE | COMPARAISONS: 5 | PROFONDEUR: 4
RECHERCHE: nom=degenere val=25 -> NON_TROUVE | COMPARAISONS: 3 | PROFONDEUR: 2`
      },
      {
        label: 'Recherche feuille gauche',
        stdin: 'ARBRE nom=branche_gauche CLES=80,40,20,10 RECHERCHES=10,5',
        expected: `RECHERCHE: nom=branche_gauche val=10 -> TROUVE | COMPARAISONS: 4 | PROFONDEUR: 3
RECHERCHE: nom=branche_gauche val=5 -> NON_TROUVE | COMPARAISONS: 4 | PROFONDEUR: 3`
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

class Node:
    def __init__(self, val):
        self.val = val
        self.g = None
        self.d = None

def insert(root, val):
    if root is None:
        return Node(val)
    if val < root.val:
        root.g = insert(root.g, val)
    elif val > root.val:
        root.d = insert(root.d, val)
    return root

def search(root, val):
    cur = root
    comps = 0
    depth = 0
    last_depth = 0
    while cur is not None:
        comps += 1
        last_depth = depth
        if cur.val == val:
            return True, comps, depth
        elif val < cur.val:
            cur = cur.g
            depth += 1
        else:
            cur = cur.d
            depth += 1
    return False, comps, last_depth

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?CLES=([^\\s]+).*?RECHERCHES=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    cles = [int(x) for x in m.group(2).split(',') if x]
    recherches = [int(x) for x in m.group(3).split(',') if x]

    root = None
    for c in cles:
        root = insert(root, c)

    for r in recherches:
        trouve, comps, prof = search(root, r)
        status = "TROUVE" if trouve else "NON_TROUVE"
        print(f"RECHERCHE: nom={nom} val={r} -> {status} | COMPARAISONS: {comps} | PROFONDEUR: {prof}")
`
  },
  {
    id: 'al3-c2-e3',
    chapter: 2,
    title: 'Suppression de nœud dans un ABR (3 cas de figure)',
    level: 'n3',
    language: 'python',
    goal: 'Implémenter l’algorithme complet de suppression dans un ABR en traitant les 3 cas : feuille, un enfant, deux enfants (remplacement par successeur in-order).',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>SUPPRESSION nom=&lt;nom&gt; CLES=&lt;c1,c2,...&gt; CIBLE=&lt;val&gt;</code>.<br>\nAlgorithme :<br>\n1. Construire l’ABR avec les clés fournies.<br>\n2. Supprimer le nœud avec la valeur <code>CIBLE</code> selon les 3 cas standards :<br>\n   - <strong>Cas 1 (FEUILLE)</strong> : le nœud n\'a aucun enfant.<br>\n   - <strong>Cas 2 (UN_ENFANT)</strong> : le nœud a un seul enfant (gauche ou droite), qui remplace le nœud.<br>\n   - <strong>Cas 3 (DEUX_ENFANTS)</strong> : le nœud a 2 enfants. On le remplace par son <strong>successeur in-order</strong> (plus petite valeur du sous-arbre droit), puis on supprime ce successeur du sous-arbre droit.<br>\nAfficher :<br>\n<code>SUPPR: nom=&lt;nom&gt; | CIBLE: &lt;val&gt; | CAS: &lt;FEUILLE|UN_ENFANT|DEUX_ENFANTS|ABSENT&gt; | INFIXE_APRES: &lt;v1, v2, ...&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la suppression avec identification du cas
`,
    hints: [
      'Identifier d’abord le type de nœud avant d’opérer la mutation structurelle.',
      'Le successeur in-order se trouve en prenant le nœud droit puis en descendant tout à gauche.'
    ],
    examples: [
      {
        stdin: `SUPPRESSION nom=test_feuille CLES=50,30,70,20,40 CIBLE=20
SUPPRESSION nom=test_deux CLES=50,30,70,20,40,60,80 CIBLE=30
SUPPRESSION nom=test_un CLES=50,30,70,20 CIBLE=30`,
        expected: `SUPPR: nom=test_feuille | CIBLE: 20 | CAS: FEUILLE | INFIXE_APRES: 30, 40, 50, 70
SUPPR: nom=test_deux | CIBLE: 30 | CAS: DEUX_ENFANTS | INFIXE_APRES: 20, 40, 50, 60, 70, 80
SUPPR: nom=test_un | CIBLE: 30 | CAS: UN_ENFANT | INFIXE_APRES: 20, 50, 70`,
        note: 'Cas feuille (20), deux enfants (30 avec successeur 40), un enfant (30 avec enfant 20).'
      }
    ],
    tests: [
      {
        label: 'Suppression racine à 2 enfants',
        stdin: 'SUPPRESSION nom=racine_deux CLES=50,30,70,60,80 CIBLE=50',
        expected: 'SUPPR: nom=racine_deux | CIBLE: 50 | CAS: DEUX_ENFANTS | INFIXE_APRES: 30, 60, 70, 80'
      },
      {
        label: 'Suppression racine feuille unique',
        stdin: 'SUPPRESSION nom=racine_seule CLES=42 CIBLE=42',
        expected: 'SUPPR: nom=racine_seule | CIBLE: 42 | CAS: FEUILLE | INFIXE_APRES: VIDE'
      },
      {
        label: 'Valeur cible absente de l’arbre',
        stdin: 'SUPPRESSION nom=absent CLES=10,20,30 CIBLE=99',
        expected: 'SUPPR: nom=absent | CIBLE: 99 | CAS: ABSENT | INFIXE_APRES: 10, 20, 30'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

class Node:
    def __init__(self, val):
        self.val = val
        self.g = None
        self.d = None

def insert(root, val):
    if root is None:
        return Node(val)
    if val < root.val:
        root.g = insert(root.g, val)
    elif val > root.val:
        root.d = insert(root.d, val)
    return root

def find_node(root, val):
    cur = root
    while cur:
        if cur.val == val:
            return cur
        elif val < cur.val:
            cur = cur.g
        else:
            cur = cur.d
    return None

def min_value_node(node):
    cur = node
    while cur.g is not None:
        cur = cur.g
    return cur

def delete_node(root, val):
    if root is None:
        return root
    if val < root.val:
        root.g = delete_node(root.g, val)
    elif val > root.val:
        root.d = delete_node(root.d, val)
    else:
        if root.g is None:
            return root.d
        elif root.d is None:
            return root.g
        temp = min_value_node(root.d)
        root.val = temp.val
        root.d = delete_node(root.d, temp.val)
    return root

def get_infixe(root):
    res = []
    def rec(n):
        if n:
            rec(n.g)
            res.append(n.val)
            rec(n.d)
    rec(root)
    return res

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?CLES=([^\\s]+).*?CIBLE=(\\d+)', lig)
    if not m:
        continue
    nom = m.group(1)
    cles = [int(x) for x in m.group(2).split(',') if x]
    cible = int(m.group(3))

    root = None
    for c in cles:
        root = insert(root, c)

    target = find_node(root, cible)
    if target is None:
        cas = "ABSENT"
    elif target.g is None and target.d is None:
        cas = "FEUILLE"
    elif target.g is not None and target.d is not None:
        cas = "DEUX_ENFANTS"
    else:
        cas = "UN_ENFANT"

    if cas != "ABSENT":
        root = delete_node(root, cible)

    inf = get_infixe(root)
    inf_str = ", ".join(str(x) for x in inf) if inf else "VIDE"
    print(f"SUPPR: nom={nom} | CIBLE: {cible} | CAS: {cas} | INFIXE_APRES: {inf_str}")
`
  }
];
