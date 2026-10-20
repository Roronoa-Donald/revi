/**
 * Exercices du chapitre 5 — Algorithmique B3.
 * Plus Courts Chemins & Algorithme de Dijkstra.
 */
'use strict';

module.exports = [
  {
    id: 'al3-c5-e1',
    chapter: 5,
    title: 'Relâchement d’arc (Edge Relaxation)',
    level: 'n1',
    language: 'python',
    goal: 'Implémenter l’opération élémentaire de relâchement d’un arc u -> v et vérifier si la distance minimale courante est améliorée.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>RELAX nom=&lt;nom&gt; DISTS=&lt;s:d,...&gt; ARC=&lt;u-&gt;v:poids&gt;</code>.<br>\nFormule de relâchement :<br>\nSi $dist[u] \\neq \\infty$ et $dist[u] + poids &lt; dist[v]$ :<br>\nLa distance $dist[v]$ est améliorée et mise à jour.<br>\nAfficher :<br>\n<code>RELAX: nom=&lt;nom&gt; | ARC: &lt;u-&gt;v:poids&gt; | AMELIORATION: &lt;OUI|NON&gt; | DIST_AVANT: &lt;d_av&gt; | DIST_APRES: &lt;d_ap&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le relâchement d'arc (relaxation)
`,
    hints: [
      'Représenter la valeur "inf" par float("inf").',
      'Si dist[u] est infinie, le sommet source n’a pas encore été atteint et ne peut pas relâcher ses voisins.'
    ],
    examples: [
      {
        stdin: `RELAX nom=succes DISTS=A:0,B:10,C:inf ARC=A->B:4
RELAX nom=echec DISTS=A:0,B:3 ARC=A->B:5`,
        expected: `RELAX: nom=succes | ARC: A->B:4 | AMELIORATION: OUI | DIST_AVANT: 10 | DIST_APRES: 4
RELAX: nom=echec | ARC: A->B:5 | AMELIORATION: NON | DIST_AVANT: 3 | DIST_APRES: 3`,
        note: '0 + 4 < 10 donc succès pour B. Pour le second, 0 + 5 n’est pas inférieur à 3.'
      }
    ],
    tests: [
      {
        label: 'Relâchement depuis un sommet inaccessible (inf)',
        stdin: 'RELAX nom=inaccessible DISTS=A:inf,B:20 ARC=A->B:2',
        expected: 'RELAX: nom=inaccessible | ARC: A->B:2 | AMELIORATION: NON | DIST_AVANT: 20 | DIST_APRES: 20'
      },
      {
        label: 'Relâchement d’un sommet initialement infini',
        stdin: 'RELAX nom=vers_inf DISTS=X:5,Y:inf ARC=X->Y:12',
        expected: 'RELAX: nom=vers_inf | ARC: X->Y:12 | AMELIORATION: OUI | DIST_AVANT: inf | DIST_APRES: 17'
      },
      {
        label: 'Égalité exacte : pas d’amélioration stricte',
        stdin: 'RELAX nom=egal DISTS=S:0,T:8 ARC=S->T:8',
        expected: 'RELAX: nom=egal | ARC: S->T:8 | AMELIORATION: NON | DIST_AVANT: 8 | DIST_APRES: 8'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?DISTS=([^\\s]+).*?ARC=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    dists_str = m.group(2)
    arc_str = m.group(3)

    dists = {}
    for item in dists_str.split(','):
        if not item.strip():
            continue
        s, d = item.split(':')
        dists[s.strip()] = float('inf') if d.strip() == 'inf' else int(d.strip())

    m_arc = re.match(r'([^-]+)->([^:]+):(-?\\d+)', arc_str)
    if not m_arc:
        continue
    u = m_arc.group(1).strip()
    v = m_arc.group(2).strip()
    w = int(m_arc.group(3))

    dist_u = dists.get(u, float('inf'))
    dist_v_before = dists.get(v, float('inf'))

    amelioration = False
    dist_v_after = dist_v_before

    if dist_u != float('inf') and dist_u + w < dist_v_before:
        amelioration = True
        dist_v_after = dist_u + w

    dav_str = "inf" if dist_v_before == float('inf') else str(dist_v_before)
    dap_str = "inf" if dist_v_after == float('inf') else str(dist_v_after)
    stat = "OUI" if amelioration else "NON"

    print(f"RELAX: nom={nom} | ARC: {arc_str} | AMELIORATION: {stat} | DIST_AVANT: {dav_str} | DIST_APRES: {dap_str}")
`
  },
  {
    id: 'al3-c5-e2',
    chapter: 5,
    title: 'Algorithme complet de Dijkstra avec file de priorité',
    level: 'n2',
    language: 'python',
    goal: 'Calculer les plus courts chemins depuis une source vers tous les sommets accessibles dans un graphe orienté à poids strictement positifs.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>DIJKSTRA nom=&lt;nom&gt; SOURCE=&lt;src&gt; SOMMETS=&lt;S1,S2,...&gt; ARCS=&lt;u-&gt;v:poids,...&gt; CIBLE=&lt;dst&gt;</code>.<br>\nAlgorithme de Dijkstra :<br>\n1. Initialiser une file de priorité avec <code>(0, src)</code> et $dist[s] = \\infty$ pour tout $s \\neq src$.<br>\n2. À chaque étape, extraire le sommet non finalisé ayant la distance minimale.<br>\n3. Relâcher tous ses arcs sortants en mettant à jour les distances et les prédécesseurs.<br>\nAfficher :<br>\n<code>DIJKSTRA: nom=&lt;nom&gt; | SOURCE: &lt;src&gt;</code><br>\n<code>DISTANCES: S1=&lt;d1&gt;, S2=&lt;d2&gt;, ...</code> (par ordre alphabétique des sommets, <code>inf</code> si inaccessible)<br>\n<code>CHEMIN vers &lt;dst&gt;: &lt;src -&gt; ... -&gt; dst&gt; (distance: &lt;dist&gt;)</code> (ou <code>CHEMIN vers &lt;dst&gt;: AUCUN</code>)</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'algorithme de Dijkstra avec calcul des plus courts chemins
`,
    hints: [
      'Utiliser heapq.heappop et heapq.heappush.',
      'Gérer un tableau ou dictionnaire de précurseurs pour remonter le chemin de destination.'
    ],
    examples: [
      {
        stdin: 'DIJKSTRA nom=reseau_optique SOURCE=A SOMMETS=A,B,C,D,E ARCS=A->B:4,A->C:2,C->B:1,B->D:5,C->D:8,C->E:10,D->E:2 CIBLE=E',
        expected: `DIJKSTRA: nom=reseau_optique | SOURCE: A
DISTANCES: A=0, B=3, C=2, D=8, E=10
CHEMIN vers E: A -> C -> B -> D -> E (distance: 10)`,
        note: 'Le chemin vers B passe par C (coût 2+1=3 < 4). Le chemin vers E passe par D (coût 8+2=10).'
      }
    ],
    tests: [
      {
        label: 'Graphe avec sommet déconnecté',
        stdin: 'DIJKSTRA nom=isole SOURCE=A SOMMETS=A,B,C ARCS=A->B:5 CIBLE=C',
        expected: `DIJKSTRA: nom=isole | SOURCE: A
DISTANCES: A=0, B=5, C=inf
CHEMIN vers C: AUCUN`
      },
      {
        label: 'Chemin direct vs chemin avec relais avantageux',
        stdin: 'DIJKSTRA nom=relais SOURCE=S SOMMETS=S,A,T ARCS=S->T:20,S->A:5,A->T:7 CIBLE=T',
        expected: `DIJKSTRA: nom=relais | SOURCE: S
DISTANCES: A=5, S=0, T=12
CHEMIN vers T: S -> A -> T (distance: 12)`
      },
      {
        label: 'Source égale à la cible',
        stdin: 'DIJKSTRA nom=boucle SOURCE=X SOMMETS=X,Y ARCS=X->Y:10 CIBLE=X',
        expected: `DIJKSTRA: nom=boucle | SOURCE: X
DISTANCES: X=0, Y=10
CHEMIN vers X: X (distance: 0)`
      }
    ],
    solution: `import sys
import re
import heapq

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?SOURCE=([^\\s]+).*?SOMMETS=([^\\s]+).*?ARCS=([^\\s]*).*?CIBLE=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    src = m.group(2)
    sommets = [s.strip() for s in m.group(3).split(',') if s.strip()]
    arcs_str = m.group(4).strip()
    arcs = [a.strip() for a in arcs_str.split(',') if a.strip()]
    dst = m.group(5)

    adj = {s: [] for s in sommets}
    for a in arcs:
        m_a = re.match(r'([^-]+)->([^:]+):(-?\\d+)', a)
        if m_a:
            u = m_a.group(1).strip()
            v = m_a.group(2).strip()
            w = int(m_a.group(3))
            adj[u].append((v, w))

    dist = {s: float('inf') for s in sommets}
    dist[src] = 0
    parent = {s: None for s in sommets}

    pq = [(0, src)]
    visited = set()

    while pq:
        d, u = heapq.heappop(pq)
        if u in visited:
            continue
        visited.add(u)

        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                heapq.heappush(pq, (dist[v], v))

    print(f"DIJKSTRA: nom={nom} | SOURCE: {src}")

    d_parts = []
    for s in sorted(sommets):
        val = "inf" if dist[s] == float('inf') else str(dist[s])
        d_parts.append(f"{s}={val}")
    print(f"DISTANCES: {', '.join(d_parts)}")

    if dist[dst] == float('inf'):
        print(f"CHEMIN vers {dst}: AUCUN")
    else:
        path = []
        cur = dst
        while cur is not None:
            path.append(cur)
            cur = parent[cur]
        path.reverse()
        chemin_str = " -> ".join(path)
        print(f"CHEMIN vers {dst}: {chemin_str} (distance: {dist[dst]})")
`
  },
  {
    id: 'al3-c5-e3',
    chapter: 5,
    title: 'Détection de poids négatifs et de cycles absorbants',
    level: 'n3',
    language: 'python',
    goal: 'Analyser un graphe pour déterminer si Dijkstra est applicable et détecter la présence de cycles absorbants avec Bellman-Ford.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>ANALYSE nom=&lt;nom&gt; SOURCE=&lt;src&gt; SOMMETS=&lt;S1,S2,...&gt; ARCS=&lt;u-&gt;v:poids,...&gt;</code>.<br>\nÉtapes d\'analyse :<br>\n1. Examiner les poids des arcs : s’il existe au moins un poids $w &lt; 0$, <code>POIDS_NEGATIFS: OUI</code> et <code>DIJKSTRA_APPLICABLE: NON</code>.<br>\n2. Appliquer l’algorithme de Bellman-Ford (relaxation de tous les arcs $|V|-1$ fois depuis la source).<br>\n3. Effectuer une $|V|$-ième passe de relaxation : si au moins un arc peut encore être relâché, un <strong>cycle négatif</strong> (cycle absorbant) est détecté.<br>\nAfficher :<br>\n<code>ANALYSE: nom=&lt;nom&gt; | POIDS_NEGATIFS: &lt;OUI|NON&gt; | DIJKSTRA_APPLICABLE: &lt;OUI|NON&gt; | CYCLE_ABSORBANT: &lt;OUI|NON&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la validité pour Dijkstra et détecter les cycles absorbants
`,
    hints: [
      'Dijkstra suppose des poids positifs pour garantir la gloutonnerie.',
      'Une (|V|)-ième relaxation réussie dans Bellman-Ford prouve l’existence d’un cycle absorbant.'
    ],
    examples: [
      {
        stdin: `ANALYSE nom=g_positif SOURCE=A SOMMETS=A,B,C ARCS=A->B:5,B->C:2
ANALYSE nom=g_cycle_neg SOURCE=S SOMMETS=S,A,B ARCS=S->A:1,A->B:-3,B->A:-2`,
        expected: `ANALYSE: nom=g_positif | POIDS_NEGATIFS: NON | DIJKSTRA_APPLICABLE: OUI | CYCLE_ABSORBANT: NON
ANALYSE: nom=g_cycle_neg | POIDS_NEGATIFS: OUI | DIJKSTRA_APPLICABLE: NON | CYCLE_ABSORBANT: OUI`,
        note: 'g_positif est traitable par Dijkstra. g_cycle_neg possède un cycle absorbant A->B->A de somme -5.'
      }
    ],
    tests: [
      {
        label: 'Poids négatif mais sans cycle absorbant',
        stdin: 'ANALYSE nom=neg_sans_cycle SOURCE=S SOMMETS=S,A,B ARCS=S->A:5,A->B:-2',
        expected: 'ANALYSE: nom=neg_sans_cycle | POIDS_NEGATIFS: OUI | DIJKSTRA_APPLICABLE: NON | CYCLE_ABSORBANT: NON'
      },
      {
        label: 'Graphe avec cycle à somme nulle (pas absorbant)',
        stdin: 'ANALYSE nom=cycle_nul SOURCE=S SOMMETS=S,A,B ARCS=S->A:2,A->B:-1,B->A:1',
        expected: 'ANALYSE: nom=cycle_nul | POIDS_NEGATIFS: OUI | DIJKSTRA_APPLICABLE: NON | CYCLE_ABSORBANT: NON'
      },
      {
        label: 'Cycle absorbant à 3 sommets',
        stdin: 'ANALYSE nom=triangle_neg SOURCE=S SOMMETS=S,A,B,C ARCS=S->A:2,A->B:1,B->C:-4,C->A:1',
        expected: 'ANALYSE: nom=triangle_neg | POIDS_NEGATIFS: OUI | DIJKSTRA_APPLICABLE: NON | CYCLE_ABSORBANT: OUI'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?SOURCE=([^\\s]+).*?SOMMETS=([^\\s]+).*?ARCS=([^\\s]*)', lig)
    if not m:
        continue
    nom = m.group(1)
    src = m.group(2)
    sommets = [s.strip() for s in m.group(3).split(',') if s.strip()]
    arcs_str = m.group(4).strip()
    arcs_raw = [a.strip() for a in arcs_str.split(',') if a.strip()]

    edges = []
    has_negative = False
    for a in arcs_raw:
        m_a = re.match(r'([^-]+)->([^:]+):(-?\\d+)', a)
        if m_a:
            u = m_a.group(1).strip()
            v = m_a.group(2).strip()
            w = int(m_a.group(3))
            if w < 0:
                has_negative = True
            edges.append((u, v, w))

    # Bellman-Ford
    dist = {s: float('inf') for s in sommets}
    dist[src] = 0

    V = len(sommets)
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    has_neg_cycle = False
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            has_neg_cycle = True
            break

    p_neg_str = "OUI" if has_negative else "NON"
    dijk_str = "NON" if has_negative else "OUI"
    cycle_str = "OUI" if has_neg_cycle else "NON"

    print(f"ANALYSE: nom={nom} | POIDS_NEGATIFS: {p_neg_str} | DIJKSTRA_APPLICABLE: {dijk_str} | CYCLE_ABSORBANT: {cycle_str}")
`
  }
];
