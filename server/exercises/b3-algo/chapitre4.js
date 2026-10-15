/**
 * Exercices du chapitre 4 — Algorithmique B3.
 * Théorie des Graphes & Algorithmes Gloutons.
 */
'use strict';

module.exports = [
  {
    id: 'al3-c4-e1',
    chapter: 4,
    title: 'Représentation de graphe et calcul des degrés',
    level: 'n1',
    language: 'python',
    goal: 'Convertir une liste d’arêtes en liste d’adjacence ordonnée et calculer les degrés de chaque sommet selon l’orientation.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>GRAPHE nom=&lt;nom&gt; TYPE=&lt;ORIENTE|NON_ORIENTE&gt; SOMMETS=&lt;S1,S2,...&gt; ARETES=&lt;u-v:poids,...&gt;</code>.<br>\nPour chaque graphe :<br>\n1. Construire la liste d’adjacence : pour chaque sommet, trier ses voisins par ordre alphabétique.<br>\n2. Calculer le degré de chaque sommet (pour un graphe orienté, afficher <code>deg_in/deg_out</code>, pour non-orienté le degré total).<br>\nAfficher :<br>\n<code>GRAPHE: nom=&lt;nom&gt; | SOMMETS: &lt;nb&gt; | ARETES: &lt;nb&gt;</code><br>\n<code>DEGRES: S1=&lt;d1&gt;, S2=&lt;d2&gt;, ...</code><br>\n<code>ADJ: S1 -&gt; [v1(p1), v2(p2)] | S2 -&gt; ...</code> (si aucun voisin, <code>[]</code>)</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser le graphe, calculer les degrés et afficher la structure
`,
    hints: [
      'Pour un graphe non orienté, l’arête u-v:p ajoute v à la liste de u et u à la liste de v.',
      'Pour un graphe orienté, u-v:p signifie un arc partant de u vers v.'
    ],
    examples: [
      {
        stdin: 'GRAPHE nom=g1 TYPE=NON_ORIENTE SOMMETS=A,B,C,D ARETES=A-B:5,B-C:2,A-C:8,C-D:1',
        expected: `GRAPHE: nom=g1 | SOMMETS: 4 | ARETES: 4
DEGRES: A=2, B=2, C=3, D=1
ADJ: A -> [B(5), C(8)] | B -> [A(5), C(2)] | C -> [A(8), B(2), D(1)] | D -> [C(1)]`,
        note: 'Graphe non-orienté : C est relié à A, B, D donc deg=3.'
      }
    ],
    tests: [
      {
        label: 'Graphe orienté avec degrés entrants et sortants',
        stdin: 'GRAPHE nom=digraphe TYPE=ORIENTE SOMMETS=X,Y,Z ARETES=X-Y:3,Y-Z:4,Z-X:2,X-Z:7',
        expected: `GRAPHE: nom=digraphe | SOMMETS: 3 | ARETES: 4
DEGRES: X=1in/2out, Y=1in/1out, Z=2in/1out
ADJ: X -> [Y(3), Z(7)] | Y -> [Z(4)] | Z -> [X(2)]`
      },
      {
        label: 'Sommet isolé',
        stdin: 'GRAPHE nom=isole TYPE=NON_ORIENTE SOMMETS=A,B,C ARETES=A-B:10',
        expected: `GRAPHE: nom=isole | SOMMETS: 3 | ARETES: 1
DEGRES: A=1, B=1, C=0
ADJ: A -> [B(10)] | B -> [A(10)] | C -> []`
      },
      {
        label: 'Graphe sans arêtes',
        stdin: 'GRAPHE nom=vide TYPE=NON_ORIENTE SOMMETS=N1,N2 ARETES=',
        expected: `GRAPHE: nom=vide | SOMMETS: 2 | ARETES: 0
DEGRES: N1=0, N2=0
ADJ: N1 -> [] | N2 -> []`
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?TYPE=([^\\s]+).*?SOMMETS=([^\\s]+).*?ARETES=(.*)', lig)
    if not m:
        continue
    nom = m.group(1)
    gtype = m.group(2)
    sommets = [s.strip() for s in m.group(3).split(',') if s.strip()]
    aretes_str = m.group(4).strip()
    aretes = [a.strip() for a in aretes_str.split(',') if a.strip()]

    adj = {s: [] for s in sommets}
    deg_in = {s: 0 for s in sommets}
    deg_out = {s: 0 for s in sommets}
    deg = {s: 0 for s in sommets}

    for a in aretes:
        m_edge = re.match(r'([^-]+)-([^:]+):(-?\\d+)', a)
        if not m_edge:
            continue
        u = m_edge.group(1).strip()
        v = m_edge.group(2).strip()
        w = int(m_edge.group(3))

        if gtype == 'ORIENTE':
            adj[u].append((v, w))
            deg_out[u] += 1
            deg_in[v] += 1
        else:
            adj[u].append((v, w))
            adj[v].append((u, w))
            deg[u] += 1
            deg[v] += 1

    print(f"GRAPHE: nom={nom} | SOMMETS: {len(sommets)} | ARETES: {len(aretes)}")

    if gtype == 'ORIENTE':
        deg_parts = [f"{s}={deg_in[s]}in/{deg_out[s]}out" for s in sommets]
    else:
        deg_parts = [f"{s}={deg[s]}" for s in sommets]
    print(f"DEGRES: {', '.join(deg_parts)}")

    adj_parts = []
    for s in sommets:
        voisins = sorted(adj[s], key=lambda x: x[0])
        vois_str = ", ".join(f"{v}({w})" for v, w in voisins)
        adj_parts.append(f"{s} -> [{vois_str}]")
    print(f"ADJ: {' | '.join(adj_parts)}")
`
  },
  {
    id: 'al3-c4-e2',
    chapter: 4,
    title: 'Parcours en largeur (BFS) et distance minimale',
    level: 'n2',
    language: 'python',
    goal: 'Implémenter un parcours BFS pour trouver le chemin le plus court en nombre d’arêtes dans un graphe non pondéré.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>BFS nom=&lt;nom&gt; SOMMETS=&lt;S1,S2,...&gt; ARETES=&lt;u-v,...&gt; DEPART=&lt;src&gt; CIBLE=&lt;dst&gt;</code>.<br>\nAlgorithme BFS :<br>\n1. Initialiser une file FIFO avec le sommet de départ <code>src</code> (distance 0).<br>\n2. Pour garantir le déterminisme, visiter les voisins dans l’ordre alphabétique.<br>\n3. Suivre l’ordre de visite et enregistrer le parent de chaque sommet pour reconstituer le chemin le plus court.<br>\nAfficher :<br>\nSi la cible est accessible :<br>\n<code>BFS: nom=&lt;nom&gt; | DISTANCE: &lt;dist&gt; | CHEMIN: &lt;s1 -&gt; s2 -&gt; ... -&gt; dst&gt; | VISITES: &lt;ordre_visite&gt;</code><br>\nSi inaccessible :<br>\n<code>BFS: nom=&lt;nom&gt; | INACCESSIBLE | VISITES: &lt;ordre_visite&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le parcours BFS avec file FIFO et reconstruction de chemin
`,
    hints: [
      'Utiliser collections.deque pour la file FIFO.',
      'Trier les voisins dans l’ordre alphabétique avant de les enfiler.'
    ],
    examples: [
      {
        stdin: 'BFS nom=reseau1 SOMMETS=A,B,C,D,E ARETES=A-B,A-C,B-D,C-D,D-E DEPART=A CIBLE=E',
        expected: 'BFS: nom=reseau1 | DISTANCE: 3 | CHEMIN: A -> B -> D -> E | VISITES: A, B, C, D, E',
        note: 'BFS explore A, puis B et C, puis D, puis E. Le chemin minimal fait 3 arêtes.'
      }
    ],
    tests: [
      {
        label: 'Départ égal à la cible',
        stdin: 'BFS nom=meme_sommet SOMMETS=A,B,C ARETES=A-B,B-C DEPART=A CIBLE=A',
        expected: 'BFS: nom=meme_sommet | DISTANCE: 0 | CHEMIN: A | VISITES: A'
      },
      {
        label: 'Cible dans une composante connexe disjointe',
        stdin: 'BFS nom=deconnecte SOMMETS=A,B,C,D,E ARETES=A-B,B-C,D-E DEPART=A CIBLE=E',
        expected: 'BFS: nom=deconnecte | INACCESSIBLE | VISITES: A, B, C'
      },
      {
        label: 'Choix entre plusieurs chemins alternatifs',
        stdin: 'BFS nom=diamant SOMMETS=S,A,B,T ARETES=S-A,S-B,A-T,B-T DEPART=S CIBLE=T',
        expected: 'BFS: nom=diamant | DISTANCE: 2 | CHEMIN: S -> A -> T | VISITES: S, A, B, T'
      }
    ],
    solution: `import sys
import re
from collections import deque

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?SOMMETS=([^\\s]+).*?ARETES=([^\\s]*).*?DEPART=([^\\s]+).*?CIBLE=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    sommets = [s.strip() for s in m.group(2).split(',') if s.strip()]
    aretes_str = m.group(3).strip()
    aretes = [a.strip() for a in aretes_str.split(',') if a.strip()]
    src = m.group(4)
    dst = m.group(5)

    adj = {s: [] for s in sommets}
    for a in aretes:
        parts = a.split('-')
        if len(parts) == 2:
            u, v = parts[0].strip(), parts[1].strip()
            adj[u].append(v)
            adj[v].append(u)

    queue = deque([src])
    visited = [src]
    visited_set = {src}
    parent = {src: None}
    dist = {src: 0}

    found = (src == dst)

    while queue and not found:
        curr = queue.popleft()
        voisins = sorted(adj[curr])
        for v in voisins:
            if v not in visited_set:
                visited_set.add(v)
                visited.append(v)
                parent[v] = curr
                dist[v] = dist[curr] + 1
                queue.append(v)
                if v == dst:
                    found = True
                    break

    vis_str = ", ".join(visited)
    if dst in dist:
        # Reconstruct path
        path = []
        cur = dst
        while cur is not None:
            path.append(cur)
            cur = parent[cur]
        path.reverse()
        chemin_str = " -> ".join(path)
        print(f"BFS: nom={nom} | DISTANCE: {dist[dst]} | CHEMIN: {chemin_str} | VISITES: {vis_str}")
    else:
        print(f"BFS: nom={nom} | INACCESSIBLE | VISITES: {vis_str}")
`
  },
  {
    id: 'al3-c4-e3',
    chapter: 4,
    title: 'Arbre couvrant minimal (MST) de Kruskal et Union-Find',
    level: 'n3',
    language: 'python',
    goal: 'Calculer le poids total et les arêtes d’un Arbre Couvrant Minimal (MST) avec l’algorithme glouton de Kruskal et une structure Union-Find.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>KRUSKAL nom=&lt;nom&gt; SOMMETS=&lt;S1,S2,...&gt; ARETES=&lt;u-v:poids,...&gt;</code>.<br>\nAlgorithme glouton de Kruskal :<br>\n1. Trier toutes les arêtes par poids croissant. En cas d’égalité de poids, trier par ordre lexicographique sur le nom <code>u-v</code> (avec $u &lt; v$).<br>\n2. Pour chaque arête, vérifier si ses extrémités appartiennent à la même composante connexe (structure Union-Find avec compression de chemin).<br>\n3. Si non : l’ajouter au MST et fusionner les ensembles. Si oui : rejeter l’arête (cycle évité).<br>\nAfficher :<br>\n<code>KRUSKAL: nom=&lt;nom&gt; | POIDS_MST: &lt;poids&gt; | ARETES: &lt;a1, a2, ...&gt; | REJETS: &lt;nb_cycles&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'algorithme de Kruskal avec structure Union-Find
`,
    hints: [
      'Normaliser les arêtes pour que le premier sommet soit toujours le plus petit alphabétiquement.',
      'Union-Find utilise find(x) pour trouver le représentant et union(x, y) pour fusionner.'
    ],
    examples: [
      {
        stdin: 'KRUSKAL nom=g1 SOMMETS=A,B,C,D ARETES=A-B:4,A-C:2,B-C:1,B-D:5,C-D:8',
        expected: 'KRUSKAL: nom=g1 | POIDS_MST: 8 | ARETES: B-C:1, A-C:2, B-D:5 | REJETS: 2',
        note: 'B-C(1) et A-C(2) sont acceptées. A-B(4) forme un cycle avec A-C-B (rejetée). B-D(5) acceptée. C-D(8) forme un cycle (rejetée).'
      }
    ],
    tests: [
      {
        label: 'Graphe linéaire simple',
        stdin: 'KRUSKAL nom=ligne SOMMETS=A,B,C,D ARETES=A-B:3,B-C:2,C-D:1',
        expected: 'KRUSKAL: nom=ligne | POIDS_MST: 6 | ARETES: C-D:1, B-C:2, A-B:3 | REJETS: 0'
      },
      {
        label: 'Cycle complet triangle',
        stdin: 'KRUSKAL nom=triangle SOMMETS=A,B,C ARETES=A-B:10,B-C:10,A-C:5',
        expected: 'KRUSKAL: nom=triangle | POIDS_MST: 15 | ARETES: A-C:5, A-B:10 | REJETS: 1'
      },
      {
        label: 'Graphe complet K4',
        stdin: 'KRUSKAL nom=k4 SOMMETS=A,B,C,D ARETES=A-B:1,A-C:4,A-D:3,B-C:2,B-D:5,C-D:1',
        expected: 'KRUSKAL: nom=k4 | POIDS_MST: 4 | ARETES: A-B:1, C-D:1, B-C:2 | REJETS: 3'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

class UnionFind:
    def __init__(self, items):
        self.parent = {x: x for x in items}
        self.rank = {x: 0 for x in items}

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx = self.find(x)
        ry = self.find(y)
        if rx == ry:
            return False
        if self.rank[rx] < self.rank[ry]:
            self.parent[rx] = ry
        elif self.rank[rx] > self.rank[ry]:
            self.parent[ry] = rx
        else:
            self.parent[ry] = rx
            self.rank[rx] += 1
        return True

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?SOMMETS=([^\\s]+).*?ARETES=(.*)', lig)
    if not m:
        continue
    nom = m.group(1)
    sommets = [s.strip() for s in m.group(2).split(',') if s.strip()]
    aretes_str = m.group(3).strip()
    aretes_raw = [a.strip() for a in aretes_str.split(',') if a.strip()]

    parsed_edges = []
    for a in aretes_raw:
        m_e = re.match(r'([^-]+)-([^:]+):(-?\\d+)', a)
        if m_e:
            u, v = m_e.group(1).strip(), m_e.group(2).strip()
            w = int(m_e.group(3))
            if u > v:
                u, v = v, u
            parsed_edges.append((w, u, v))

    # Tri par poids croissant, puis ordre lexicographique
    parsed_edges.sort(key=lambda x: (x[0], x[1], x[2]))

    uf = UnionFind(sommets)
    mst = []
    total_weight = 0
    rejets = 0

    for w, u, v in parsed_edges:
        if uf.union(u, v):
            mst.append(f"{u}-{v}:{w}")
            total_weight += w
        else:
            rejets += 1

    mst_str = ", ".join(mst)
    print(f"KRUSKAL: nom={nom} | POIDS_MST: {total_weight} | ARETES: {mst_str} | REJETS: {rejets}")
`
  }
];
