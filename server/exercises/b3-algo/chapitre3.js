/**
 * Exercices du chapitre 3 — Algorithmique B3.
 * Files de Priorité, Tas Binaires & Tri par Tas (Heapsort).
 */
'use strict';

module.exports = [
  {
    id: 'al3-c3-e1',
    chapter: 3,
    title: 'Validateur de propriété de Tas-Max (Max-Heap)',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier si un tableau 1D indexé à 0 représentant un arbre binaire presque complet respecte la propriété structurelle de Tas-Max.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>TAS nom=&lt;nom&gt; VALEURS=&lt;v0,v1,v2,...&gt;</code>.<br>\nDans un tas binaire indexé à partir de 0, pour chaque élément à l’indice $i$ :<br>\n- Fils gauche à l\'indice $2i + 1$<br>\n- Fils droit à l\'indice $2i + 2$<br>\nPropriété de Tas-Max : pour tout parent $i$, $A[i] \\ge A[2i+1]$ et $A[i] \\ge A[2i+2]$ (si les enfants existent).<br>\nSi valide :<br>\n<code>TAS_MAX: &lt;nom&gt; | VALIDE : OUI | TAILLE: &lt;taille&gt; | RACINE: &lt;valeur_racine&gt;</code><br>\nSi non valide (dès la première violation rencontrée en parcourant les indices $i=0, 1, 2...$) :<br>\n<code>TAS_MAX: &lt;nom&gt; | VALIDE : NON | VIOLATION: index=&lt;i&gt; (pere=&lt;val_pere&gt;) &lt; fils=&lt;val_fils&gt; (index=&lt;idx_fils&gt;)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier la propriété de Tas-Max sur la représentation tabulaire
`,
    hints: [
      'Parcourir i de 0 jusqu’à (taille - 2) // 2.',
      'Tester d’abord le fils gauche (2*i + 1), puis le fils droit (2*i + 2).'
    ],
    examples: [
      {
        stdin: `TAS nom=tas_parfait VALEURS=90,50,70,30,40,60,65
TAS nom=tas_invalide VALEURS=80,40,60,50,20`,
        expected: `TAS_MAX: tas_parfait | VALIDE : OUI | TAILLE: 7 | RACINE: 90
TAS_MAX: tas_invalide | VALIDE : NON | VIOLATION: index=1 (pere=40) < fils=50 (index=3)`,
        note: 'tas_parfait respecte 90 >= 50,70; 50 >= 30,40; 70 >= 60,65. tas_invalide échoue car index 1 (40) < fils gauche index 3 (50).'
      }
    ],
    tests: [
      {
        label: 'Tas à un seul élément',
        stdin: 'TAS nom=mono VALEURS=100',
        expected: 'TAS_MAX: mono | VALIDE : OUI | TAILLE: 1 | RACINE: 100'
      },
      {
        label: 'Violation sur le fils droit',
        stdin: 'TAS nom=fils_droit VALEURS=50,30,60',
        expected: 'TAS_MAX: fils_droit | VALIDE : NON | VIOLATION: index=0 (pere=50) < fils=60 (index=2)'
      },
      {
        label: 'Tas-Max valide avec égalités',
        stdin: 'TAS nom=egalites VALEURS=40,40,30,40,20',
        expected: 'TAS_MAX: egalites | VALIDE : OUI | TAILLE: 5 | RACINE: 40'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?VALEURS=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    valeurs = [int(x) for x in m.group(2).split(',') if x]
    n = len(valeurs)

    if n == 0:
        continue

    violation = None
    for i in range(n):
        left = 2 * i + 1
        right = 2 * i + 2
        if left < n and valeurs[i] < valeurs[left]:
            violation = (i, valeurs[i], valeurs[left], left)
            break
        if right < n and valeurs[i] < valeurs[right]:
            violation = (i, valeurs[i], valeurs[right], right)
            break

    if violation is None:
        print(f"TAS_MAX: {nom} | VALIDE : OUI | TAILLE: {n} | RACINE: {valeurs[0]}")
    else:
        i, p_val, f_val, f_idx = violation
        print(f"TAS_MAX: {nom} | VALIDE : NON | VIOLATION: index={i} (pere={p_val}) < fils={f_val} (index={f_idx})")
`
  },
  {
    id: 'al3-c3-e2',
    chapter: 3,
    title: 'Entassement et file de priorité (Sift-Up et Sift-Down)',
    level: 'n2',
    language: 'python',
    goal: 'Implémenter les mécanismes fondamentaux d’une file de priorité : insertion avec tamisage ascendant et extraction du maximum avec tamisage descendant.',
    brief: '<p>Le script lit sur l\'entrée standard une séquence d’instructions :<br>\n<code>SEQUENCE nom=&lt;nom&gt;</code><br>\nSuivi de commandes :<br>\n- <code>INSERT &lt;v&gt;</code> : ajoute $v$ à la fin du tas puis effectue un tamisage ascendant (sift-up). Compter le nombre d’échanges.<br>\n- <code>EXTRACT_MAX</code> : retire la racine, place le dernier élément à la racine puis effectue un tamisage descendant (sift-down en échangeant avec le plus grand des enfants). Compter le nombre d’échanges.<br>\nTerminé par <code>FIN</code>.<br>\nPour chaque commande, afficher :<br>\n<code>INSERT &lt;v&gt; -&gt; SWAPS: &lt;nb&gt; | TAS: &lt;v0,v1,...&gt;</code><br>\n<code>EXTRACT_MAX -&gt; EXTRAIT: &lt;v&gt; | SWAPS: &lt;nb&gt; | TAS: &lt;v0,v1,...&gt;</code> (si vide : <code>EXTRAIT: VIDE</code>)<br>\nEn fin de séquence :<br>\n<code>BILAN: nom=&lt;nom&gt; | TAILLE: &lt;n&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter les opérations sift-up et sift-down
`,
    hints: [
      'Pour le sift-up : tant que index > 0 et val > parent, permuter avec parent = (index - 1) // 2.',
      'Pour le sift-down : comparer avec les deux enfants et permuter avec le maximum des deux tant que nécessaire.'
    ],
    examples: [
      {
        stdin: `SEQUENCE nom=queue1
INSERT 10
INSERT 30
INSERT 20
INSERT 40
EXTRACT_MAX
FIN`,
        expected: `INSERT 10 -> SWAPS: 0 | TAS: 10
INSERT 30 -> SWAPS: 1 | TAS: 30, 10
INSERT 20 -> SWAPS: 0 | TAS: 30, 10, 20
INSERT 40 -> SWAPS: 2 | TAS: 40, 30, 20, 10
EXTRACT_MAX -> EXTRAIT: 40 | SWAPS: 1 | TAS: 30, 10, 20
BILAN: nom=queue1 | TAILLE: 3`,
        note: 'L’insertion de 40 remonte 2 fois jusqu’à la racine. L’extraction remplace la racine par 10 puis descend d’un cran en échangeant avec 30.'
      }
    ],
    tests: [
      {
        label: 'Extraction sur tas vide',
        stdin: `SEQUENCE nom=vide_test
EXTRACT_MAX
FIN`,
        expected: `EXTRACT_MAX -> EXTRAIT: VIDE | SWAPS: 0 | TAS: VIDE
BILAN: nom=vide_test | TAILLE: 0`
      },
      {
        label: 'Succession de 3 extractions jusqu’à vidage',
        stdin: `SEQUENCE nom=vidage
INSERT 50
INSERT 100
EXTRACT_MAX
EXTRACT_MAX
FIN`,
        expected: `INSERT 50 -> SWAPS: 0 | TAS: 50
INSERT 100 -> SWAPS: 1 | TAS: 100, 50
EXTRACT_MAX -> EXTRAIT: 100 | SWAPS: 0 | TAS: 50
EXTRACT_MAX -> EXTRAIT: 50 | SWAPS: 0 | TAS: VIDE
BILAN: nom=vidage | TAILLE: 0`
      },
      {
        label: 'Tamisage descendant à plusieurs niveaux',
        stdin: `SEQUENCE nom=multi_niveaux
INSERT 80
INSERT 70
INSERT 60
INSERT 50
INSERT 40
INSERT 30
EXTRACT_MAX
FIN`,
        expected: `INSERT 80 -> SWAPS: 0 | TAS: 80
INSERT 70 -> SWAPS: 0 | TAS: 80, 70
INSERT 60 -> SWAPS: 0 | TAS: 80, 70, 60
INSERT 50 -> SWAPS: 0 | TAS: 80, 70, 60, 50
INSERT 40 -> SWAPS: 0 | TAS: 80, 70, 60, 50, 40
INSERT 30 -> SWAPS: 0 | TAS: 80, 70, 60, 50, 40, 30
EXTRACT_MAX -> EXTRAIT: 80 | SWAPS: 2 | TAS: 70, 50, 60, 30, 40
BILAN: nom=multi_niveaux | TAILLE: 5`
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

i = 0
while i < len(lignes):
    m_seq = re.search(r'SEQUENCE nom=([^\\s]+)', lignes[i])
    if not m_seq:
        i += 1
        continue
    nom = m_seq.group(1)
    i += 1
    heap = []

    def sift_up(idx):
        swaps = 0
        while idx > 0:
            parent = (idx - 1) // 2
            if heap[idx] > heap[parent]:
                heap[idx], heap[parent] = heap[parent], heap[idx]
                swaps += 1
                idx = parent
            else:
                break
        return swaps

    def sift_down(idx):
        swaps = 0
        n = len(heap)
        while True:
            largest = idx
            left = 2 * idx + 1
            right = 2 * idx + 2
            if left < n and heap[left] > heap[largest]:
                largest = left
            if right < n and heap[right] > heap[largest]:
                largest = right
            if largest != idx:
                heap[idx], heap[largest] = heap[largest], heap[idx]
                swaps += 1
                idx = largest
            else:
                break
        return swaps

    while i < len(lignes) and lignes[i] != 'FIN':
        cmd = lignes[i]
        if cmd.startswith('INSERT '):
            v = int(cmd.split()[1])
            heap.append(v)
            swaps = sift_up(len(heap) - 1)
            tas_str = ", ".join(str(x) for x in heap)
            print(f"INSERT {v} -> SWAPS: {swaps} | TAS: {tas_str}")
        elif cmd == 'EXTRACT_MAX':
            if not heap:
                print("EXTRACT_MAX -> EXTRAIT: VIDE | SWAPS: 0 | TAS: VIDE")
            elif len(heap) == 1:
                val = heap.pop()
                print(f"EXTRACT_MAX -> EXTRAIT: {val} | SWAPS: 0 | TAS: VIDE")
            else:
                val = heap[0]
                heap[0] = heap.pop()
                swaps = sift_down(0)
                tas_str = ", ".join(str(x) for x in heap) if heap else "VIDE"
                print(f"EXTRACT_MAX -> EXTRAIT: {val} | SWAPS: {swaps} | TAS: {tas_str}")
        i += 1
    i += 1
    print(f"BILAN: nom={nom} | TAILLE: {len(heap)}")
`
  },
  {
    id: 'al3-c3-e3',
    chapter: 3,
    title: 'Tri par tas in-place (Heapsort) et comptage des échanges',
    level: 'n3',
    language: 'python',
    goal: 'Implémenter le tri par tas (Heapsort) in-place en deux phases : construction linéaire du tas-max (heapify) puis extraction successive des éléments.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>HEAPSORT nom=&lt;nom&gt; VALEURS=&lt;v0,v1,v2,...&gt;</code>.<br>\nAlgorithme Heapsort in-place :<br>\n1. <strong>Phase Heapify</strong> : transformer le tableau en Tas-Max de bas en haut en appelant <code>sift-down</code> pour $i$ allant de $(n // 2) - 1$ jusqu\'à 0. Compter les échanges effectués durant cette phase.<br>\n2. <strong>Phase de Tri</strong> : pour $i$ allant de $n-1$ à 1 : échanger $A[0]$ et $A[i]$ (1 échange), puis appliquer <code>sift-down</code> sur la racine pour un tas réduit de taille $i$. Compter chaque échange supplémentaire.<br>\nAfficher :<br>\n<code>HEAPSORT: nom=&lt;nom&gt; | HEAPIFY: &lt;tas&gt; | SWAPS_HEAPIFY: &lt;nb&gt; | TRIE: &lt;tableau_trie&gt; | SWAPS_TOTAUX: &lt;nb&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter Heapsort in-place avec comptage rigoureux des échanges
`,
    hints: [
      'Le tamisage descendant de la phase de tri doit être borné par la taille résiduelle i.',
      'Chaque échange entre la racine et A[i] compte pour 1 dans les échanges de tri.'
    ],
    examples: [
      {
        stdin: 'HEAPSORT nom=exemple VALEURS=4,10,3,5,1',
        expected: 'HEAPSORT: nom=exemple | HEAPIFY: 10, 5, 3, 4, 1 | SWAPS_HEAPIFY: 2 | TRIE: 1, 3, 4, 5, 10 | SWAPS_TOTAUX: 9',
        note: 'Heapify effectue 2 échanges. Le tri effectue 7 échanges supplémentaires (4 permutations de tête + 3 descentes), soit 9 au total.'
      }
    ],
    tests: [
      {
        label: 'Tableau déjà trié',
        stdin: 'HEAPSORT nom=deja_trie VALEURS=1,2,3,4',
        expected: 'HEAPSORT: nom=deja_trie | HEAPIFY: 4, 2, 3, 1 | SWAPS_HEAPIFY: 3 | TRIE: 1, 2, 3, 4 | SWAPS_TOTAUX: 8'
      },
      {
        label: 'Tableau en ordre inverse',
        stdin: 'HEAPSORT nom=inverse VALEURS=5,4,3,2,1',
        expected: 'HEAPSORT: nom=inverse | HEAPIFY: 5, 4, 3, 2, 1 | SWAPS_HEAPIFY: 0 | TRIE: 1, 2, 3, 4, 5 | SWAPS_TOTAUX: 8'
      },
      {
        label: 'Éléments avec doublons',
        stdin: 'HEAPSORT nom=doublons VALEURS=3,1,3,2,1',
        expected: 'HEAPSORT: nom=doublons | HEAPIFY: 3, 2, 3, 1, 1 | SWAPS_HEAPIFY: 1 | TRIE: 1, 1, 2, 3, 3 | SWAPS_TOTAUX: 7'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def sift_down(arr, n, idx):
    swaps = 0
    while True:
        largest = idx
        left = 2 * idx + 1
        right = 2 * idx + 2
        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
        if largest != idx:
            arr[idx], arr[largest] = arr[largest], arr[idx]
            swaps += 1
            idx = largest
        else:
            break
    return swaps

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?VALEURS=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    arr = [int(x) for x in m.group(2).split(',') if x]
    n = len(arr)

    # Phase 1: Heapify
    swaps_heapify = 0
    for i in range((n // 2) - 1, -1, -1):
        swaps_heapify += sift_down(arr, n, i)

    heapify_state = ", ".join(str(x) for x in arr)

    # Phase 2: Sort
    swaps_sort = 0
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        swaps_sort += 1
        swaps_sort += sift_down(arr, i, 0)

    trie_state = ", ".join(str(x) for x in arr)
    total_swaps = swaps_heapify + swaps_sort
    print(f"HEAPSORT: nom={nom} | HEAPIFY: {heapify_state} | SWAPS_HEAPIFY: {swaps_heapify} | TRIE: {trie_state} | SWAPS_TOTAUX: {total_swaps}")
`
  }
];
