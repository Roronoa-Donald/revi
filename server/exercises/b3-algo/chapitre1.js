/**
 * Exercices du chapitre 1 — Algorithmique B3.
 * Analyse de Complexité, Notations Asymptotiques &amp; Récursivité.
 */
'use strict';

module.exports = [
  {
    id: 'al3-c1-e1',
    chapter: 1,
    title: 'Calculateur d’ordres de grandeur et notations asymptotiques (Grand O)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer le nombre d’opérations théoriques et classifier le comportement asymptotique d’un algorithme selon sa taille d’entrée n.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>ALGO nom=&lt;nom&gt; CLASSE=&lt;O(1)|O(log_n)|O(n)|O(n_log_n)|O(n2)|O(2n)&gt; N=&lt;valeur&gt;</code>.<br>\nFormules d’opérations $f(N)$ selon la classe :<br>\n- <code>O(1)</code> : $f(N) = 1$<br>\n- <code>O(log_n)</code> : $f(N) = int(math.floor(math.log2(N)))$ si $N \\ge 1$ sinon 0<br>\n- <code>O(n)</code> : $f(N) = N$<br>\n- <code>O(n_log_n)</code> : $f(N) = int(math.floor(N * math.log2(N)))$ si $N \\ge 1$ sinon 0<br>\n- <code>O(n2)</code> : $f(N) = N^2$<br>\n- <code>O(2n)</code> : $f(N) = 2^N$<br>\nAfficher pour chaque ligne :<br>\n<code>COMPLEXITE: &lt;nom&gt; | ASYMPTOTE: &lt;CLASSE&gt; | N=&lt;N&gt; -&gt; OPERATIONS: &lt;f(N)&gt;</code></p>',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les opérations selon la classe de complexité
`,
    hints: [
      'Utiliser math.log2 pour les logarithmes en base 2.',
      'Pour O(2n), calculer 2 ** N.'
    ],
    examples: [
      {
        stdin: 'ALGO nom=recherche_dicho CLASSE=O(log_n) N=1024\nALGO nom=tri_fusion CLASSE=O(n_log_n) N=16\nALGO nom=tri_bulles CLASSE=O(n2) N=100',
        expected: 'COMPLEXITE: recherche_dicho | ASYMPTOTE: O(log_n) | N=1024 -> OPERATIONS: 10\nCOMPLEXITE: tri_fusion | ASYMPTOTE: O(n_log_n) | N=16 -> OPERATIONS: 64\nCOMPLEXITE: tri_bulles | ASYMPTOTE: O(n2) | N=100 -> OPERATIONS: 10000',
        note: 'log2(1024) = 10, 16 * log2(16) = 16 * 4 = 64, et 100^2 = 10000 opérations.'
      }
    ],
    tests: [
      {
        label: 'Accès direct en temps constant O(1)',
        stdin: 'ALGO nom=acces_tableau CLASSE=O(1) N=1000000',
        expected: 'COMPLEXITE: acces_tableau | ASYMPTOTE: O(1) | N=1000000 -> OPERATIONS: 1'
      },
      {
        label: 'Parcours linéaire O(n)',
        stdin: 'ALGO nom=recherche_seq CLASSE=O(n) N=5000',
        expected: 'COMPLEXITE: recherche_seq | ASYMPTOTE: O(n) | N=5000 -> OPERATIONS: 5000'
      },
      {
        label: 'Explosion combinatoire exponentielle O(2n)',
        stdin: 'ALGO nom=sac_a_dos_brute CLASSE=O(2n) N=10',
        expected: 'COMPLEXITE: sac_a_dos_brute | ASYMPTOTE: O(2n) | N=10 -> OPERATIONS: 1024'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?CLASSE=([^\\s]+).*?N=(\\d+)', lig)
    if not m:
        continue
    nom = m.group(1)
    classe = m.group(2)
    N = int(m.group(3))

    ops = 0
    if classe == 'O(1)':
        ops = 1
    elif classe == 'O(log_n)':
        ops = int(math.floor(math.log2(N))) if N >= 1 else 0
    elif classe == 'O(n)':
        ops = N
    elif classe == 'O(n_log_n)':
        ops = int(math.floor(N * math.log2(N))) if N >= 1 else 0
    elif classe == 'O(n2)':
        ops = N * N
    elif classe == 'O(2n)':
        ops = 2 ** N

    print(f"COMPLEXITE: {nom} | ASYMPTOTE: {classe} | N={N} -> OPERATIONS: {ops}")
`
  },
  {
    id: 'al3-c1-e2',
    chapter: 1,
    title: 'Résolveur du Théorème Maître (Master Theorem)',
    level: 'n2',
    language: 'python',
    goal: 'Déterminer la classe de complexité asymptotique globale d’une relation de récurrence diviser-pour-régner T(n) = a*T(n/b) + Theta(n^d).',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>RECURRENCE nom=&lt;nom&gt; a=&lt;a&gt; b=&lt;b&gt; d=&lt;d&gt;</code>.<br>\nThéorème Maître pour $T(n) = a \\cdot T(n / b) + \\Theta(n^d)$ avec $a \\ge 1, b &gt; 1, d \\ge 0$ :<br>\n1. Calculer la constante critique $c = \\log_b(a) = \\ln(a) / \\ln(b)$.<br>\n2. Comparer $c$ et $d$ avec tolérance $10^{-5}$ :<br>\n   - Si $c &gt; d$ : <strong>Cas 1</strong> (les feuilles dominent) -&gt; $\\Theta(n^{c})$ noté <code>Theta(n^&lt;c:.2f&gt;)</code>.<br>\n   - Si $|c - d| &lt; 10^{-5}$ : <strong>Cas 2</strong> (équilibre parfait) -&gt; $\\Theta(n^d \\log n)$ noté <code>Theta(n^&lt;d&gt; log n)</code> (ou <code>Theta(log n)</code> si $d=0$).<br>\n   - Si $c &lt; d$ : <strong>Cas 3</strong> (la racine/combinaison domine) -&gt; $\\Theta(n^d)$ noté <code>Theta(n^&lt;d&gt;)</code> (ou <code>Theta(1)</code> si $d=0$).<br>\nAfficher :<br>\n<code>MASTER: &lt;nom&gt; | a=&lt;a&gt; b=&lt;b&gt; d=&lt;d&gt; (c=&lt;c:.2f&gt;) -&gt; CAS &lt;1|2|3&gt; : COMPLEXITE = &lt;resultat&gt;</code></p>',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : appliquer le théorème maître
`,
    hints: [
      'log_b(a) = math.log(a) / math.log(b).',
      'Le tri fusion a=2, b=2, d=1 donne c=1.00 == d=1 (Cas 2).'
    ],
    examples: [
      {
        stdin: 'RECURRENCE nom=tri_fusion a=2 b=2 d=1\nRECURRENCE nom=karatsuba a=3 b=2 d=1\nRECURRENCE nom=dicho a=1 b=2 d=0',
        expected: 'MASTER: tri_fusion | a=2 b=2 d=1 (c=1.00) -> CAS 2 : COMPLEXITE = Theta(n^1 log n)\nMASTER: karatsuba | a=3 b=2 d=1 (c=1.58) -> CAS 1 : COMPLEXITE = Theta(n^1.58)\nMASTER: dicho | a=1 b=2 d=0 (c=0.00) -> CAS 2 : COMPLEXITE = Theta(log n)',
        note: 'Tri fusion : équilibre Cas 2. Multiplication de Karatsuba : Cas 1 sous-linéaire O(n^1.58). Recherche dicho : Cas 2 O(log n).'
      }
    ],
    tests: [
      {
        label: 'Multiplication de matrices de Strassen a=7, b=2, d=2',
        stdin: 'RECURRENCE nom=strassen a=7 b=2 d=2',
        expected: 'MASTER: strassen | a=7 b=2 d=2 (c=2.81) -> CAS 1 : COMPLEXITE = Theta(n^2.81)'
      },
      {
        label: 'Cas 3 où le travail extérieur domine',
        stdin: 'RECURRENCE nom=travail_lourd a=2 b=2 d=2',
        expected: 'MASTER: travail_lourd | a=2 b=2 d=2 (c=1.00) -> CAS 3 : COMPLEXITE = Theta(n^2)'
      },
      {
        label: 'Cas 3 sans sous-problème supplémentaire a=1, b=2, d=1',
        stdin: 'RECURRENCE nom=filtre_lin a=1 b=2 d=1',
        expected: 'MASTER: filtre_lin | a=1 b=2 d=1 (c=0.00) -> CAS 3 : COMPLEXITE = Theta(n^1)'
      }
    ],
    solution: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?a=(\\d+).*?b=(\\d+).*?d=(\\d+)', lig)
    if not m:
        continue
    nom = m.group(1)
    a = int(m.group(2))
    b = int(m.group(3))
    d = int(m.group(4))

    c = math.log(a) / math.log(b)
    diff = c - d

    if abs(diff) < 1e-5:
        cas = 2
        if d == 0:
            res = "Theta(log n)"
        else:
            res = f"Theta(n^{d} log n)"
    elif diff > 0:
        cas = 1
        res = f"Theta(n^{c:.2f})"
    else:
        cas = 3
        if d == 0:
            res = "Theta(1)"
        else:
            res = f"Theta(n^{d})"

    print(f"MASTER: {nom} | a={a} b={b} d={d} (c={c:.2f}) -> CAS {cas} : COMPLEXITE = {res}")
`
  },
  {
    id: 'al3-c1-e3',
    chapter: 1,
    title: 'Traceur de pile récursive et détection de Stack Overflow',
    level: 'n3',
    language: 'python',
    goal: 'Simuler l’empilement des cadres d’appels d’une fonction récursive f(n) = f(n-1) + f(n-2) et détecter les risques de débordement de pile.',
    brief: '<p>Le script lit sur l\'entrée standard des déclarations au format :<br>\n<code>RECURSION nom=&lt;nom&gt; TYPE=&lt;LINEAIRE|ARBORESCENTE&gt; N=&lt;n&gt; MAX_DEPTH=&lt;limite&gt;</code>.<br>\nRègles d’exécution :<br>\n- <code>LINEAIRE</code> : $f(n) = 1 + f(n-1)$ avec $f(0) = 0$. Profondeur maximale atteinte = $N$. Total des appels = $N + 1$.<br>\n- <code>ARBORESCENTE</code> (type Fibonacci naïve) : $f(n) = f(n-1) + f(n-2)$ pour $n \\ge 2$, cas de base $f(0)=0, f(1)=1$. Profondeur maximale = $N$. Nombre total d’appels récursifs compté exactement.<br>\nSi la profondeur maximale $N &gt; MAX\\_DEPTH$ :<br>\nAfficher : <code>RECURSION: &lt;nom&gt; | DEBORDEMENT DE PILE : Profondeur &lt;N&gt; &gt; Limite &lt;MAX_DEPTH&gt; (Stack Overflow)</code>.<br>\nSinon :<br>\nAfficher : <code>RECURSION: &lt;nom&gt; | SUCCES : Profondeur &lt;N&gt;/&lt;MAX_DEPTH&gt; | APPELS_TOTAUX: &lt;nb_appels&gt; | VALEUR: &lt;res&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la pile récursive et détecter le dépassement
`,
    hints: [
      'Pour une récursion arborescente type Fibonacci, f(n) compte les appels récursifs réels.',
      'Si N > MAX_DEPTH, court-circuiter et signaler le Stack Overflow.'
    ],
    examples: [
      {
        stdin: 'RECURSION nom=somme_lin TYPE=LINEAIRE N=5 MAX_DEPTH=10\nRECURSION nom=fibo_arbre TYPE=ARBORESCENTE N=5 MAX_DEPTH=10\nRECURSION nom=overflow_test TYPE=LINEAIRE N=15 MAX_DEPTH=10',
        expected: 'RECURSION: somme_lin | SUCCES : Profondeur 5/10 | APPELS_TOTAUX: 6 | VALEUR: 5\nRECURSION: fibo_arbre | SUCCES : Profondeur 5/10 | APPELS_TOTAUX: 15 | VALEUR: 5\nRECURSION: overflow_test | DEBORDEMENT DE PILE : Profondeur 15 > Limite 10 (Stack Overflow)',
        note: 'somme_lin(5) fait 6 appels. fibo(5) fait 15 appels et renvoie 5. overflow_test dépasse la limite de pile.'
      }
    ],
    tests: [
      {
        label: 'Cas de base immédiat N=0',
        stdin: 'RECURSION nom=base_test TYPE=LINEAIRE N=0 MAX_DEPTH=5',
        expected: 'RECURSION: base_test | SUCCES : Profondeur 0/5 | APPELS_TOTAUX: 1 | VALEUR: 0'
      },
      {
        label: 'Fibonacci N=6 sous limite de pile',
        stdin: 'RECURSION nom=fibo_6 TYPE=ARBORESCENTE N=6 MAX_DEPTH=8',
        expected: 'RECURSION: fibo_6 | SUCCES : Profondeur 6/8 | APPELS_TOTAUX: 25 | VALEUR: 8'
      },
      {
        label: 'Débordement sur récursion arborescente',
        stdin: 'RECURSION nom=fibo_trop_profond TYPE=ARBORESCENTE N=7 MAX_DEPTH=5',
        expected: 'RECURSION: fibo_trop_profond | DEBORDEMENT DE PILE : Profondeur 7 > Limite 5 (Stack Overflow)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def fib_count(n):
    calls = [0]
    def helper(k):
        calls[0] += 1
        if k <= 0:
            return 0
        if k == 1:
            return 1
        return helper(k - 1) + helper(k - 2)
    val = helper(n)
    return calls[0], val

for lig in lignes:
    m = re.search(r'nom=([^\\s]+).*?TYPE=([^\\s]+).*?N=(\\d+).*?MAX_DEPTH=(\\d+)', lig)
    if not m:
        continue
    nom = m.group(1)
    type_rec = m.group(2)
    N = int(m.group(3))
    max_d = int(m.group(4))

    if N > max_d:
        print(f"RECURSION: {nom} | DEBORDEMENT DE PILE : Profondeur {N} > Limite {max_d} (Stack Overflow)")
    else:
        if type_rec == 'LINEAIRE':
            appels = N + 1
            valeur = N
        else:
            appels, valeur = fib_count(N)
        print(f"RECURSION: {nom} | SUCCES : Profondeur {N}/{max_d} | APPELS_TOTAUX: {appels} | VALEUR: {valeur}")
`
  }
];
