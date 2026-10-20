/**
 * Exercices du chapitre 6 — Algorithmique B3.
 * Programmation Dynamique & Optimisation Sous-Structurelle.
 */
'use strict';

module.exports = [
  {
    id: 'al3-c6-e1',
    chapter: 6,
    title: 'Mémoïsation et tabulation : le problème de l’escalier',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le nombre de combinaisons pour gravir un escalier de n marches avec des pas autorisés en utilisant la tabulation ascendante (DP).',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>ESCALIER nom=&lt;nom&gt; N=&lt;n&gt; PAS=&lt;p1,p2,...&gt;</code>.<br>\nModèle DP :<br>\n- Soit $dp[i]$ le nombre de façons d’atteindre la marche $i$.<br>\n- Cas de base : $dp[0] = 1$ (1 façon de rester au sol). Pour tout $i &gt; 0$, $dp[i] = \\sum_{p \\in PAS, i-p \\ge 0} dp[i - p]$.<br>\nAfficher :<br>\n<code>ESCALIER: nom=&lt;nom&gt; | N=&lt;n&gt; -&gt; COMBINAISONS: &lt;dp[N]&gt; | TABLE_DP: &lt;dp[0], dp[1], ..., dp[N]&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les manières d'atteindre la marche N par programmation dynamique
`,
    hints: [
      'Initialiser un tableau dp de taille N + 1 à 0, avec dp[0] = 1.',
      'Pour chaque marche i de 1 à N, sommer les valeurs dp[i - p] pour les pas p valides.'
    ],
    examples: [
      {
        stdin: `ESCALIER nom=fib_steps N=4 PAS=1,2
ESCALIER nom=triple_steps N=3 PAS=1,2,3`,
        expected: `ESCALIER: nom=fib_steps | N=4 -> COMBINAISONS: 5 | TABLE_DP: 1, 1, 2, 3, 5
ESCALIER: nom=triple_steps | N=3 -> COMBINAISONS: 4 | TABLE_DP: 1, 1, 2, 4`,
        note: 'N=4 avec pas 1,2 : 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2 (5 façons).'
      }
    ],
    tests: [
      {
        label: 'Marche 0 (cas de base immédiat)',
        stdin: 'ESCALIER nom=sol N=0 PAS=1,2',
        expected: 'ESCALIER: nom=sol | N=0 -> COMBINAISONS: 1 | TABLE_DP: 1'
      },
      {
        label: 'Pas de 2 et 3 uniquement pour N=5',
        stdin: 'ESCALIER nom=grands_pas N=5 PAS=2,3',
        expected: 'ESCALIER: nom=grands_pas | N=5 -> COMBINAISONS: 2 | TABLE_DP: 1, 0, 1, 1, 1, 2'
      },
      {
        label: 'Escalier plus haut N=7 avec pas standards',
        stdin: 'ESCALIER nom=haut N=7 PAS=1,2',
        expected: 'ESCALIER: nom=haut | N=7 -> COMBINAISONS: 21 | TABLE_DP: 1, 1, 2, 3, 5, 8, 13, 21'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?N=(\\d+).*?PAS=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    N = int(m.group(2))
    pas = [int(x) for x in m.group(3).split(',') if x]

    dp = [0] * (N + 1)
    dp[0] = 1

    for i in range(1, N + 1):
        for p in pas:
            if i - p >= 0:
                dp[i] += dp[i - p]

    table_str = ", ".join(str(x) for x in dp)
    print(f"ESCALIER: nom={nom} | N={N} -> COMBINAISONS: {dp[N]} | TABLE_DP: {table_str}")
`
  },
  {
    id: 'al3-c6-e2',
    chapter: 6,
    title: 'Sac à dos 0/1 (0/1 Knapsack) et reconstruction optimale',
    level: 'n2',
    language: 'python',
    goal: 'Résoudre le problème du sac à dos 0/1 par programmation dynamique 2D, puis reconstituer l’ensemble des objets retenus.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>KNAPSACK nom=&lt;nom&gt; CAPACITE=&lt;W&gt; OBJETS=&lt;nom:poids:valeur,...&gt;</code>.<br>\nAlgorithme :<br>\n1. Construire la matrice DP de dimensions $(n+1) \\times (W+1)$ :<br>\n   $dp[i][w] = \\max(dp[i-1][w], dp[i-1][w - p_i] + v_i)$ si $w \\ge p_i$ sinon $dp[i-1][w]$.<br>\n2. Reconstituer les objets choisis en remontant depuis $dp[n][W]$ vers $dp[0][0]$. En cas d’égalité de gain, privilégier de NE PAS prendre l’objet courant.<br>\n3. Trier les noms des objets choisis par ordre alphabétique pour un affichage stable.<br>\nAfficher :<br>\n<code>KNAPSACK: nom=&lt;nom&gt; | CAPACITE: &lt;W&gt; | VALEUR_MAX: &lt;val&gt; | OBJETS: &lt;obj1, obj2...&gt; | POIDS_TOTAL: &lt;poids&gt;</code> (si aucun objet : <code>AUCUN</code>)</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la programmation dynamique du sac à dos 0/1
`,
    hints: [
      'La table DP stocke pour chaque préfixe d’objets et chaque capacité résiduelle la valeur maximale.',
      'La reconstruction vérifie si dp[i][w] != dp[i-1][w] pour déduire que l’objet i a été sélectionné.'
    ],
    examples: [
      {
        stdin: 'KNAPSACK nom=randonnee CAPACITE=10 OBJETS=tente:4:20,gourde:2:10,duvet:5:25,lampe:1:8',
        expected: 'KNAPSACK: nom=randonnee | CAPACITE: 10 | VALEUR_MAX: 53 | OBJETS: duvet, lampe, tente | POIDS_TOTAL: 10',
        note: 'Objets choisis : tente (4, 20), duvet (5, 25), lampe (1, 8). Poids = 10, Valeur = 53.'
      }
    ],
    tests: [
      {
        label: 'Capacité insuffisante pour le moindre objet',
        stdin: 'KNAPSACK nom=trop_lourd CAPACITE=3 OBJETS=enclume:5:100,brique:4:80',
        expected: 'KNAPSACK: nom=trop_lourd | CAPACITE: 3 | VALEUR_MAX: 0 | OBJETS: AUCUN | POIDS_TOTAL: 0'
      },
      {
        label: 'Tous les objets rentrent dans le sac',
        stdin: 'KNAPSACK nom=tout_rentre CAPACITE=15 OBJETS=pomme:2:5,livre:3:12,pc:5:30',
        expected: 'KNAPSACK: nom=tout_rentre | CAPACITE: 15 | VALEUR_MAX: 47 | OBJETS: livre, pc, pomme | POIDS_TOTAL: 10'
      },
      {
        label: 'Arbitrage entre objet lourd très cher et multiples objets légers',
        stdin: 'KNAPSACK nom=arbitrage CAPACITE=6 OBJETS=or:5:50,argent:3:28,cuivre:3:28',
        expected: 'KNAPSACK: nom=arbitrage | CAPACITE: 6 | VALEUR_MAX: 56 | OBJETS: argent, cuivre | POIDS_TOTAL: 6'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?CAPACITE=(\\d+).*?OBJETS=(.*)', lig)
    if not m:
        continue
    nom = m.group(1)
    W = int(m.group(2))
    obj_raw = [x.strip() for x in m.group(3).split(',') if x.strip()]

    items = []
    for item in obj_raw:
        parts = item.split(':')
        if len(parts) == 3:
            items.append((parts[0].strip(), int(parts[1]), int(parts[2])))

    n = len(items)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        name_i, w_i, v_i = items[i - 1]
        for w in range(W + 1):
            if w >= w_i:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - w_i] + v_i)
            else:
                dp[i][w] = dp[i - 1][w]

    val_max = dp[n][W]

    # Reconstruction
    chosen = []
    total_w = 0
    cur_w = W
    for i in range(n, 0, -1):
        name_i, w_i, v_i = items[i - 1]
        if dp[i][cur_w] != dp[i - 1][cur_w]:
            chosen.append(name_i)
            total_w += w_i
            cur_w -= w_i

    chosen.sort()
    obj_str = ", ".join(chosen) if chosen else "AUCUN"
    print(f"KNAPSACK: nom={nom} | CAPACITE: {W} | VALEUR_MAX: {val_max} | OBJETS: {obj_str} | POIDS_TOTAL: {total_w}")
`
  },
  {
    id: 'al3-c6-e3',
    chapter: 6,
    title: 'Plus Longue Sous-Séquence Commune (LCS)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la longueur et reconstruire la chaîne de la plus longue sous-séquence commune (LCS) entre deux séquences de caractères.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>LCS nom=&lt;nom&gt; S1=&lt;chaine1&gt; S2=&lt;chaine2&gt;</code>.<br>\nAlgorithme LCS :<br>\n1. Construire la matrice DP $(m+1) \\times (n+1)$ :<br>\n   - Si $S_1[i-1] == S_2[j-1]$ : $dp[i][j] = dp[i-1][j-1] + 1$.<br>\n   - Sinon : $dp[i][j] = \\max(dp[i-1][j], dp[i][j-1])$.<br>\n2. Reconstruire la sous-séquence depuis $(m, n)$. En cas d’égalité entre $dp[i-1][j]$ et $dp[i][j-1]$, remonter prioritairement vers le haut $(i-1, j)$.<br>\nAfficher :<br>\n<code>LCS: nom=&lt;nom&gt; | LONGUEUR: &lt;len&gt; | SEQUENCE: &lt;lcs_str&gt;</code> (si vide : <code>VIDE</code>)</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'algorithme LCS et sa reconstruction
`,
    hints: [
      'Initialiser une table 2D de taille (len(S1)+1) x (len(S2)+1) à 0.',
      'Lors de la reconstruction, si les caractères correspondent, l’ajouter et décrémenter i et j.'
    ],
    examples: [
      {
        stdin: `LCS nom=adn S1=AGGTAB S2=GXTXAYB
LCS nom=mots S1=ALGORITHME S2=LOGARITHME`,
        expected: `LCS: nom=adn | LONGUEUR: 4 | SEQUENCE: GTAB
LCS: nom=mots | LONGUEUR: 8 | SEQUENCE: LGRITHME`,
        note: 'Pour adn, la LCS est GTAB de longueur 4. Pour mots, G et O étant inversés entre les deux mots, la plus longue sous-séquence fait 8 caractères (LGRITHME).'
      }
    ],
    tests: [
      {
        label: 'Chaînes totalement disjointes',
        stdin: 'LCS nom=disjoint S1=ABC S2=DEF',
        expected: 'LCS: nom=disjoint | LONGUEUR: 0 | SEQUENCE: VIDE'
      },
      {
        label: 'Chaînes identiques',
        stdin: 'LCS nom=identique S1=DYNAMIC S2=DYNAMIC',
        expected: 'LCS: nom=identique | LONGUEUR: 7 | SEQUENCE: DYNAMIC'
      },
      {
        label: 'Une chaîne incluse dans l’autre',
        stdin: 'LCS nom=inclusion S1=ABCDEF S2=BDF',
        expected: 'LCS: nom=inclusion | LONGUEUR: 3 | SEQUENCE: BDF'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?S1=([^\\s]+).*?S2=([^\\s]+)', lig)
    if not m:
        continue
    nom = m.group(1)
    s1 = m.group(2)
    s2 = m.group(3)

    m_len = len(s1)
    n_len = len(s2)

    dp = [[0] * (n_len + 1) for _ in range(m_len + 1)]

    for i in range(1, m_len + 1):
        for j in range(1, n_len + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    lcs_len = dp[m_len][n_len]

    # Reconstruct
    res = []
    i, j = m_len, n_len
    while i > 0 and j > 0:
        if s1[i - 1] == s2[j - 1]:
            res.append(s1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    res.reverse()
    seq_str = "".join(res) if res else "VIDE"
    print(f"LCS: nom={nom} | LONGUEUR: {lcs_len} | SEQUENCE: {seq_str}")
`
  }
];
