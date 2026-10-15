/**
 * Exercices de code — Statistique descriptive (B1), 3 par module, en Python.
 *
 * Le cours enseigne la statistique en notation statistique ; Python y joue le
 * rôle de calculatrice vérifiable. Chaque exercice lit ses données sur l'entrée
 * standard (une valeur par ligne, ou une ligne « valeur effectif ») et sa sortie
 * est comparée après normalisation des fins de ligne.
 *
 * Conventions, rappelées dans chaque énoncé concerné :
 *   - la variance se divise par N (variance de population) ;
 *   - le rang d'un quantile de niveau p est r = (n + 1)·p, avec interpolation
 *     linéaire si r n'est pas entier ;
 *   - dans l'histogramme, la borne inférieure d'une classe est incluse et la
 *     borne supérieure exclue.
 *
 * Même contrat que les autres catalogues : `brief`, `starter`, `examples`
 * (visibles), `tests` (cachés), `hints` (en mots), `solution` (serveur seul).
 * Les entrées de test d'un même module sont toutes distinctes, et distinctes
 * des entrées d'exemple.
 */

/** Tableau des effectifs par modalité, dans l'ordre croissant. */
const EFFECTIFS = `def effectifs(valeurs):
    compte = {}
    for valeur in valeurs:
        compte[valeur] = compte.get(valeur, 0) + 1
    return sorted(compte.items())
`;

/** Quantile au sens du cours : rang r = (n + 1)·p, avec interpolation. */
const QUANTILE = `def quantile(valeurs, p):
    v = sorted(valeurs)
    r = (len(v) + 1) * p
    bas = int(r)
    if bas == r:
        return v[bas - 1]
    return v[bas - 1] + (r - bas) * (v[bas] - v[bas - 1])
`;

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Vocabulaire et séries statistiques
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'st-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Effectif, minimum et maximum',
    goal: 'Lire une série et en extraire les trois premiers éléments de description : effectif et valeurs extrêmes.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs de la série ' +
      '(une par ligne, des entiers). Affichez sur une seule ligne l’effectif total, la plus petite valeur ' +
      'et la plus grande, séparés par des espaces.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher l’effectif, la plus petite et la plus grande valeur.
`,
    hints: [
      'L’effectif total est le nombre de valeurs reçues : c’est n, mais tu peux aussi le compter avec len().',
      'Les valeurs extrêmes s’obtiennent avec min() et max() — la série n’a pas besoin d’être triée pour cela.'
    ],
    examples: [
      { stdin: '5\n12\n8\n15\n8\n12', expected: '5 8 15', note: 'Cinq valeurs, la plus petite est 8, la plus grande 15.' }
    ],
    tests: [
      { label: 'Série constante', stdin: '3\n5\n5\n5', expected: '3 5 5' },
      { label: 'Valeurs négatives', stdin: '6\n-4\n0\n7\n7\n3\n-1', expected: '6 -4 7' },
      { label: 'Valeur unique', stdin: '1\n42', expected: '1 42 42' }
    ],
    solution: `n = int(input())
serie = [int(input()) for _ in range(n)]

print(n, min(serie), max(serie))
`
  },
  {
    id: 'st-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Série ordonnée',
    goal: 'Passer de la série brute à la série ordonnée, première étape de toute analyse.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez la <strong>série ordonnée</strong> par valeurs croissantes, sur une seule ' +
      'ligne, séparée par des espaces.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher la série dans l’ordre croissant.
`,
    hints: [
      'Trier une liste en Python se fait en un appel : sorted(serie) renvoie une nouvelle liste ordonnée.',
      'Pour l’affichage, joins les valeurs converties en texte avec le séparateur " ".'
    ],
    examples: [
      { stdin: '6\n9\n3\n7\n3\n11\n1', expected: '1 3 3 7 9 11', note: 'Les valeurs sont remises dans l’ordre croissant.' }
    ],
    tests: [
      { label: 'Série déjà presque ordonnée', stdin: '4\n5\n4\n3\n2', expected: '2 3 4 5' },
      { label: 'Valeurs négatives et positives', stdin: '3\n100\n-100\n0', expected: '-100 0 100' },
      { label: 'Répétitions', stdin: '5\n2\n2\n2\n1\n1', expected: '1 1 2 2 2' }
    ],
    solution: `n = int(input())
serie = [int(input()) for _ in range(n)]

print(" ".join(str(x) for x in sorted(serie)))
`
  },
  {
    id: 'st-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Nombre de modalités',
    goal: 'Compter les valeurs distinctes d’une série : c’est le nombre de modalités du caractère.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez le nombre de <strong>modalités</strong>, c’est-à-dire de valeurs distinctes.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher le nombre de valeurs distinctes.
`,
    hints: [
      'Un ensemble (set) en Python ne garde qu’une seule copie de chaque valeur.',
      'La taille de cet ensemble est exactement le nombre de modalités.'
    ],
    examples: [
      { stdin: '7\n3\n5\n5\n8\n3\n5\n9', expected: '4', note: 'Valeurs distinctes : 3, 5, 8 et 9.' }
    ],
    tests: [
      { label: 'Série constante', stdin: '4\n1\n1\n1\n1', expected: '1' },
      { label: 'Toutes distinctes', stdin: '5\n-1\n0\n1\n2\n3', expected: '5' },
      { label: 'Modalités par paires', stdin: '6\n7\n7\n8\n8\n9\n9', expected: '3' }
    ],
    solution: `n = int(input())
serie = [int(input()) for _ in range(n)]

print(len(set(serie)))
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Effectifs, fréquences et cumuls
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'st-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Tableau des effectifs',
    goal: 'Regrouper une série par modalité et compter les effectifs.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez le tableau des effectifs : une ligne par modalité, dans l’ordre croissant, ' +
      'au format <code>valeur effectif</code>.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher chaque valeur avec son effectif, par valeurs croissantes.
`,
    hints: [
      'Parcours les valeurs une seule fois en comptant dans un dictionnaire : c’est plus court que de compter chaque modalité séparément.',
      'Trie ensuite les couples (valeur, effectif) avant de les afficher.'
    ],
    examples: [
      { stdin: '8\n8\n9\n12\n15\n15\n12\n12\n15', expected: '8 1\n9 1\n12 3\n15 3', note: 'Deux fois 8 et 9, trois fois 12 et 15.' }
    ],
    tests: [
      { label: 'Petites valeurs', stdin: '5\n1\n1\n2\n3\n3', expected: '1 2\n2 1\n3 2' },
      { label: 'Série constante', stdin: '3\n5\n5\n5', expected: '5 3' },
      { label: 'Trois modalités', stdin: '6\n10\n20\n10\n30\n20\n10', expected: '10 3\n20 2\n30 1' }
    ],
    solution: EFFECTIFS + `
n = int(input())
serie = [int(input()) for _ in range(n)]

for valeur, effectif in effectifs(serie):
    print(valeur, effectif)
`
  },
  {
    id: 'st-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Fréquences en pourcentage',
    goal: 'Convertir des effectifs en fréquences exprimées en pourcentage.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez, pour chaque modalité par ordre croissant, son pourcentage ' +
      '<code>100 × n<sub>i</sub> / N</code> arrondi à deux décimales, au format ' +
      '<code>valeur pourcentage</code>.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher chaque valeur avec son pourcentage, deux décimales.
`,
    hints: [
      'Le pourcentage est le quotient effectif / effectif total, multiplié par 100.',
      'Pour formater deux décimales : f"{valeur:.2f}".'
    ],
    examples: [
      { stdin: '4\n1\n1\n1\n2', expected: '1 75.00\n2 25.00', note: 'Trois valeurs sur quatre, puis une sur quatre.' }
    ],
    tests: [
      { label: 'Cinq valeurs, deux modalités', stdin: '5\n1\n2\n2\n3\n3', expected: '1 20.00\n2 40.00\n3 40.00' },
      { label: 'Une seule modalité', stdin: '2\n7\n7', expected: '7 100.00' },
      { label: 'Quatre modalités équilibrées', stdin: '8\n1\n1\n2\n2\n3\n3\n4\n4', expected: '1 25.00\n2 25.00\n3 25.00\n4 25.00' }
    ],
    solution: EFFECTIFS + `
n = int(input())
serie = [int(input()) for _ in range(n)]

for valeur, effectif in effectifs(serie):
    print(f"{valeur} {effectif / n * 100:.2f}")
`
  },
  {
    id: 'st-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'Effectifs cumulés croissants',
    goal: 'Calculer la colonne des ECC, qui répond aux questions « au plus ».',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez les <strong>effectifs cumulés croissants</strong> : une ligne par modalité ' +
      'dans l’ordre croissant, au format <code>valeur ECC</code>.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher chaque valeur avec son effectif cumulé croissant.
`,
    hints: [
      'Sur les modalités triées, l’ECC est la somme des effectifs de cette modalité et de toutes les précédentes.',
      'Tu peux cumuler au fur et à mesure dans une variable qui ne repart jamais de zéro.'
    ],
    examples: [
      { stdin: '6\n2\n1\n2\n3\n1\n2', expected: '1 2\n2 5\n3 6', note: 'Effectifs 2, 3, 1 → ECC 2, 5, 6.' }
    ],
    tests: [
      { label: 'Série constante', stdin: '4\n5\n5\n5\n5', expected: '5 4' },
      { label: 'Trois modalités mélangées', stdin: '5\n3\n1\n2\n1\n3', expected: '1 2\n2 3\n3 5' },
      { label: 'ECC de la dernière modalité égal à N', stdin: '7\n4\n4\n1\n2\n2\n3\n4', expected: '1 1\n2 3\n3 4\n4 7' }
    ],
    solution: EFFECTIFS + `
n = int(input())
serie = [int(input()) for _ in range(n)]

cumul = 0
for valeur, effectif in effectifs(serie):
    cumul += effectif
    print(valeur, cumul)
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Tendance centrale
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'st-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'python',
    title: 'Moyenne d’une série',
    goal: 'Calculer la moyenne arithmétique d’une série brute.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez la moyenne, arrondie à deux décimales.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher la moyenne, deux décimales.
`,
    hints: [
      'La moyenne est la somme des valeurs divisée par leur nombre.',
      'Attention en Python 3 : la division / donne un flottant, ce qui est exactement ce qu’on veut ici.'
    ],
    examples: [
      { stdin: '4\n12\n8\n15\n9', expected: '11.00', note: '(12 + 8 + 15 + 9)/4 = 44/4 = 11.' }
    ],
    tests: [
      { label: 'Cinq valeurs consécutives', stdin: '5\n1\n2\n3\n4\n5', expected: '3.00' },
      { label: 'Série constante', stdin: '3\n7\n7\n7', expected: '7.00' },
      { label: 'Moyenne non entière', stdin: '4\n10\n11\n12\n13', expected: '11.50' }
    ],
    solution: `n = int(input())
serie = [int(input()) for _ in range(n)]

print(f"{sum(serie) / n:.2f}")
`
  },
  {
    id: 'st-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'python',
    title: 'Moyenne pondérée',
    goal: 'Pondérer chaque modalité par son effectif, comme dans un tableau statistique.',
    brief: '<p>Le programme reçoit un entier <code>k</code>, puis <code>k</code> lignes de la forme ' +
      '<code>valeur effectif</code>. Affichez la moyenne pondérée, arrondie à deux décimales.</p>',
    starter: `k = int(input())
lignes = [input().split() for _ in range(k)]

# À compléter : afficher la moyenne pondérée, deux décimales.
`,
    hints: [
      'La moyenne pondérée est la somme des (valeur × effectif) divisée par la somme des effectifs.',
      'Les valeurs lues sont des chaînes : convertis-les avec int() ou float() avant de calculer.'
    ],
    examples: [
      { stdin: '3\n1 2\n3 3\n5 5', expected: '3.60', note: '(1×2 + 3×3 + 5×5)/10 = 36/10 = 3,60.' }
    ],
    tests: [
      { label: 'Deux modalités', stdin: '2\n10 1\n20 3', expected: '17.50' },
      { label: 'Effectifs unitaires', stdin: '4\n0 1\n1 1\n2 1\n3 1', expected: '1.50' },
      { label: 'Poids croissants', stdin: '3\n4 2\n5 3\n6 5', expected: '5.30' }
    ],
    solution: `k = int(input())
lignes = [input().split() for _ in range(k)]

total = 0.0
effectif = 0
for valeur, nombre in lignes:
    total += float(valeur) * int(nombre)
    effectif += int(nombre)

print(f"{total / effectif:.2f}")
`
  },
  {
    id: 'st-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Médiane',
    goal: 'Appliquer la convention de rang r = (n + 1)/2, avec interpolation si nécessaire.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez la <strong>médiane</strong>, arrondie à deux décimales, avec la convention ' +
      'du cours : le rang de la médiane est <code>(n + 1)/2</code> dans la série ordonnée, avec interpolation ' +
      'linéaire si ce rang n’est pas entier.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher la médiane (convention du cours), deux décimales.
`,
    hints: [
      'Commence par trier la série : sans cela, le rang n’a aucun sens.',
      'Si le rang r n’est pas entier, la valeur est x(bas) + (r − bas) × (x(bas+1) − x(bas)), où bas est la partie entière de r.'
    ],
    examples: [
      { stdin: '7\n3\n1\n4\n2\n6\n5\n7', expected: '4.00', note: 'Sept valeurs triées : le rang 4 donne 4.' }
    ],
    tests: [
      { label: 'Nombre pair de valeurs', stdin: '4\n10\n2\n8\n4', expected: '6.00' },
      { label: 'Rang non entier', stdin: '6\n1\n2\n3\n4\n5\n6', expected: '3.50' },
      { label: 'Trois valeurs', stdin: '3\n5\n1\n9', expected: '5.00' }
    ],
    solution: QUANTILE + `
n = int(input())
serie = [int(input()) for _ in range(n)]

print(f"{quantile(serie, 0.5):.2f}")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Mesures de dispersion
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'st-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Variance d’une série',
    goal: 'Calculer une variance de population, en divisant par N.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez la <strong>variance</strong> arrondie à deux décimales, avec une division ' +
      'par N (variance de population).</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher la variance (division par N), deux décimales.
`,
    hints: [
      'La variance est la moyenne des carrés des écarts à la moyenne.',
      'Calcule d’abord la moyenne, puis la somme des (x − moyenne)², puis divise par N.'
    ],
    examples: [
      { stdin: '3\n2\n4\n6', expected: '2.67', note: 'Moyenne 4 ; écarts −2, 0, 2 ; moyenne des carrés 8/3 ≈ 2,67.' }
    ],
    tests: [
      { label: 'Quatre valeurs régulières', stdin: '4\n1\n2\n3\n4', expected: '1.25' },
      { label: 'Série constante', stdin: '2\n5\n5', expected: '0.00' },
      { label: 'Cinq valeurs espacées', stdin: '5\n10\n12\n14\n16\n18', expected: '8.00' }
    ],
    solution: `n = int(input())
serie = [int(input()) for _ in range(n)]

moyenne = sum(serie) / n
variance = sum((x - moyenne) ** 2 for x in serie) / n

print(f"{variance:.2f}")
`
  },
  {
    id: 'st-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Écart-type et coefficient de variation',
    goal: 'Passer de la variance à l’écart-type, puis à un indicateur sans unité.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez l’<strong>écart-type</strong> arrondi à deux décimales, puis le ' +
      '<strong>coefficient de variation</strong> en pourcentage (deux décimales), chacun sur sa ligne. ' +
      'La variance se divise par N.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher l’écart-type puis le coefficient de variation en %.
`,
    hints: [
      'L’écart-type est la racine carrée de la variance : pense à importer math.',
      'Le coefficient de variation vaut σ divisé par la moyenne, multiplié par 100 pour l’exprimer en pourcentage.'
    ],
    examples: [
      { stdin: '3\n2\n4\n6', expected: '1.63\n40.82', note: 'σ ≈ 1,633 et CV ≈ 40,82 %.' }
    ],
    tests: [
      { label: 'Quatre valeurs régulières', stdin: '4\n1\n2\n3\n4', expected: '1.12\n44.72' },
      { label: 'Série constante', stdin: '2\n5\n5', expected: '0.00\n0.00' },
      { label: 'Série homogène', stdin: '5\n10\n12\n14\n16\n18', expected: '2.83\n20.20' }
    ],
    solution: `import math

n = int(input())
serie = [int(input()) for _ in range(n)]

moyenne = sum(serie) / n
ecart_type = math.sqrt(sum((x - moyenne) ** 2 for x in serie) / n)

print(f"{ecart_type:.2f}")
print(f"{ecart_type / moyenne * 100:.2f}")
`
  },
  {
    id: 'st-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Variance pondérée par la formule de König',
    goal: 'Calculer une variance à partir d’un tableau d’effectifs, en une seule passe.',
    brief: '<p>Le programme reçoit un entier <code>k</code>, puis <code>k</code> lignes de la forme ' +
      '<code>valeur effectif</code>. Affichez la <strong>variance</strong> arrondie à deux décimales, ' +
      'calculée par la formule de König : <code>V = Σ n<sub>i</sub>x<sub>i</sub>² / N − x̄²</code>.</p>',
    starter: `k = int(input())
lignes = [input().split() for _ in range(k)]

# À compléter : afficher la variance par la formule de König, deux décimales.
`,
    hints: [
      'König demande deux quantités : la moyenne des carrés, et le carré de la moyenne.',
      'N est la somme des effectifs ; n’oublie pas de retrancher le carré de la moyenne à la fin.'
    ],
    examples: [
      { stdin: '3\n1 2\n3 3\n5 5', expected: '2.44', note: 'Moyenne 3,6 ; moyenne des carrés 15,4 ; 15,4 − 12,96 = 2,44.' }
    ],
    tests: [
      { label: 'Deux modalités', stdin: '2\n10 1\n20 3', expected: '18.75' },
      { label: 'Effectifs unitaires', stdin: '4\n0 1\n1 1\n2 1\n3 1', expected: '1.25' },
      { label: 'Variance faible', stdin: '3\n4 2\n5 3\n6 5', expected: '0.61' }
    ],
    solution: `k = int(input())
lignes = [input().split() for _ in range(k)]

total = 0.0
carres = 0.0
effectif = 0
for valeur, nombre in lignes:
    x = float(valeur)
    n = int(nombre)
    total += x * n
    carres += x * x * n
    effectif += n

moyenne = total / effectif
print(f"{carres / effectif - moyenne ** 2:.2f}")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Représentations graphiques
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'st-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'python',
    title: 'Classes de même amplitude',
    goal: 'Découper un intervalle en classes égales pour construire un histogramme.',
    brief: '<p>Le programme reçoit une ligne <code>min max k</code> : les bornes de la série et le nombre de ' +
      'classes souhaité. Affichez les <code>k</code> classes de même amplitude, une par ligne, au format ' +
      '<code>borne_inférieure borne_supérieure</code> avec deux décimales.</p>',
    starter: `mini, maxi, k = (float(x) for x in input().split())

# À compléter : afficher les k classes de même amplitude, bornes à deux décimales.
`,
    hints: [
      'L’amplitude de chaque classe est (max − min) / k.',
      'La classe numéro i (en partant de 0) va de min + i × amplitude à min + (i + 1) × amplitude.'
    ],
    examples: [
      { stdin: '150 190 4', expected: '150.00 160.00\n160.00 170.00\n170.00 180.00\n180.00 190.00', note: 'Amplitude 10 : quatre classes.' }
    ],
    tests: [
      { label: 'Cinq classes sur [0 ; 10]', stdin: '0 10 5', expected: '0.00 2.00\n2.00 4.00\n4.00 6.00\n6.00 8.00\n8.00 10.00' },
      { label: 'Quatre classes décimales', stdin: '0 1 4', expected: '0.00 0.25\n0.25 0.50\n0.50 0.75\n0.75 1.00' },
      { label: 'Deux classes', stdin: '10 20 2', expected: '10.00 15.00\n15.00 20.00' }
    ],
    solution: `mini, maxi, k = (float(x) for x in input().split())

largeur = (maxi - mini) / int(k)
for i in range(int(k)):
    print(f"{mini + i * largeur:.2f} {mini + (i + 1) * largeur:.2f}")
`
  },
  {
    id: 'st-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Effectifs par classe',
    goal: 'Compter les valeurs de chaque classe d’un histogramme, avec la convention des bornes.',
    brief: '<p>Le programme reçoit une ligne <code>min max k</code>, puis un entier <code>n</code>, puis les ' +
      '<code>n</code> valeurs de la série (une par ligne). Toutes les valeurs sont dans l’intervalle ' +
      '<code>[min ; max]</code>. Affichez les <code>k</code> effectifs par classe, séparés par des espaces. ' +
      'La borne inférieure est incluse, la borne supérieure exclue.</p>',
    starter: `mini, maxi, k = (float(x) for x in input().split())
n = int(input())
serie = [float(input()) for _ in range(n)]

# À compléter : afficher les k effectifs par classe, séparés par des espaces.
`,
    hints: [
      'Pour chaque valeur, calcule l’indice de sa classe puis incrémente le compteur de cette classe.',
      'La convention « borne inférieure incluse, borne supérieure exclue » se traduit par min <= x < max — la dernière classe doit donc rattraper la borne maximale.'
    ],
    examples: [
      { stdin: '150 190 4\n5\n152\n161\n171\n181\n175', expected: '1 1 2 1', note: '171 et 175 tombent dans [170 ; 180[.' }
    ],
    tests: [
      { label: 'Quatre classes, une valeur chacune', stdin: '0 4 4\n4\n0\n1\n2\n3', expected: '1 1 1 1' },
      { label: 'Deux classes inégales', stdin: '0 10 2\n6\n0\n4\n5\n9\n2\n3', expected: '4 2' },
      { label: 'Classes de 5', stdin: '10 20 2\n3\n10\n19\n15', expected: '1 2' }
    ],
    solution: `mini, maxi, k = (float(x) for x in input().split())
n = int(input())
serie = [float(input()) for _ in range(n)]

k = int(k)
largeur = (maxi - mini) / k
comptes = [0] * k

for x in serie:
    indice = min(int((x - mini) / largeur), k - 1)
    comptes[indice] += 1

print(" ".join(str(c) for c in comptes))
`
  },
  {
    id: 'st-c5-e3',
    chapter: 5,
    level: 'n4',
    language: 'python',
    title: 'Les cinq valeurs d’une boîte à moustaches',
    goal: 'Résumer une série par minimum, Q1, médiane, Q3 et maximum.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs d’une série ' +
      '(une par ligne). Affichez sur une seule ligne les cinq valeurs de la boîte à moustaches — minimum, ' +
      'Q1, médiane, Q3, maximum — chacune arrondie à deux décimales et séparées par un espace. On utilise ' +
      'la convention de rang <code>r = (n + 1)·p</code> avec interpolation.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]

# À compléter : afficher les cinq valeurs (min, Q1, médiane, Q3, max), deux décimales.
`,
    hints: [
      'Écris une seule fonction quantile(valeurs, p) et appelle-la trois fois : p = 0,25 ; 0,5 ; 0,75.',
      'Le minimum et le maximum sont la première et la dernière valeur de la série triée.'
    ],
    examples: [
      { stdin: '10\n2\n4\n4\n5\n7\n8\n9\n11\n12\n15', expected: '2.00 4.00 7.50 11.25 15.00', note: 'Médiane 7,5 ; Q1 = 4 ; Q3 = 11,25.' }
    ],
    tests: [
      { label: 'Cinq valeurs consécutives', stdin: '5\n1\n2\n3\n4\n5', expected: '1.00 1.50 3.00 4.50 5.00' },
      { label: 'Quatre valeurs', stdin: '4\n1\n2\n3\n4', expected: '1.00 1.25 2.50 3.75 4.00' },
      { label: 'Série désordonnée', stdin: '6\n5\n3\n8\n1\n9\n2', expected: '1.00 1.75 4.00 8.25 9.00' }
    ],
    solution: QUANTILE + `
n = int(input())
serie = sorted(int(input()) for _ in range(n))

cinq = (serie[0], quantile(serie, 0.25), quantile(serie, 0.5), quantile(serie, 0.75), serie[-1])
print(" ".join(f"{v:.2f}" for v in cinq))
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Corrélation et régression
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'st-c6-e1',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Covariance',
    goal: 'Mesurer si deux caractères varient dans le même sens.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs de ' +
      '<code>x</code> (une par ligne), puis les <code>n</code> valeurs de <code>y</code> (une par ligne). ' +
      'Affichez la <strong>covariance</strong> arrondie à quatre décimales.</p>',
    starter: `n = int(input())
x = [float(input()) for _ in range(n)]
y = [float(input()) for _ in range(n)]

# À compléter : afficher la covariance cov(x, y), quatre décimales.
`,
    hints: [
      'La formule rapide évite de calculer chaque écart : cov = (1/n) × Σ xᵢyᵢ − x̄·ȳ.',
      'Les deux moyennes se calculent avant la covariance ; n’oublie pas de les retrancher.'
    ],
    examples: [
      { stdin: '3\n1\n2\n3\n2\n4\n6', expected: '1.3333', note: 'Moyennes 2 et 4 ; Σxy/n = 9,3333 ; cov = 1,3333.' }
    ],
    tests: [
      { label: 'Liaison positive', stdin: '4\n1\n2\n3\n4\n2\n4\n6\n8', expected: '2.5000' },
      { label: 'Liaison négative', stdin: '3\n1\n2\n3\n6\n4\n2', expected: '-1.3333' },
      { label: 'Deux points', stdin: '2\n0\n10\n0\n10', expected: '25.0000' }
    ],
    solution: `n = int(input())
x = [float(input()) for _ in range(n)]
y = [float(input()) for _ in range(n)]

mx = sum(x) / n
my = sum(y) / n
covariance = sum(x[i] * y[i] for i in range(n)) / n - mx * my

print(f"{covariance:.4f}")
`
  },
  {
    id: 'st-c6-e2',
    chapter: 6,
    level: 'n4',
    language: 'python',
    title: 'Coefficient de corrélation',
    goal: 'Chiffrer une liaison linéaire par un nombre sans unité, borné par −1 et 1.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs de ' +
      '<code>x</code>, puis les <code>n</code> valeurs de <code>y</code>. Affichez le ' +
      '<strong>coefficient de corrélation linéaire</strong> <code>r = cov(x, y) / (σ<sub>x</sub> · σ<sub>y</sub>)</code> ' +
      'arrondi à quatre décimales. Les écarts-types sont de population (division par n).</p>',
    starter: `n = int(input())
x = [float(input()) for _ in range(n)]
y = [float(input()) for _ in range(n)]

# À compléter : afficher r, quatre décimales.
`,
    hints: [
      'Calcule la covariance, puis les deux écarts-types avec la même division par n.',
      'r est le quotient de la covariance par le produit des deux écarts-types.'
    ],
    examples: [
      { stdin: '3\n1\n2\n3\n2\n4\n6', expected: '1.0000', note: 'Points parfaitement alignés : r = 1.' }
    ],
    tests: [
      { label: 'Liaison forte non parfaite', stdin: '4\n1\n2\n3\n4\n2\n4\n5\n8', expected: '0.9812' },
      { label: 'Liaison négative', stdin: '3\n1\n2\n3\n5\n2\n4', expected: '-0.3273' },
      { label: 'Liaison moyenne', stdin: '4\n0\n1\n2\n3\n3\n1\n0\n2', expected: '-0.4000' }
    ],
    solution: `import math

n = int(input())
x = [float(input()) for _ in range(n)]
y = [float(input()) for _ in range(n)]

mx = sum(x) / n
my = sum(y) / n
covariance = sum(x[i] * y[i] for i in range(n)) / n - mx * my
sigma_x = math.sqrt(sum((v - mx) ** 2 for v in x) / n)
sigma_y = math.sqrt(sum((v - my) ** 2 for v in y) / n)

print(f"{covariance / (sigma_x * sigma_y):.4f}")
`
  },
  {
    id: 'st-c6-e3',
    chapter: 6,
    level: 'n4',
    language: 'python',
    title: 'Droite des moindres carrés',
    goal: 'Ajuster y = a·x + b et contrôler que la droite passe par le point moyen.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis les <code>n</code> valeurs de ' +
      '<code>x</code>, puis les <code>n</code> valeurs de <code>y</code>. Affichez la pente <code>a</code> ' +
      'puis l’ordonnée à l’origine <code>b</code> de la droite des moindres carrés, chacune sur sa ligne ' +
      'avec quatre décimales. On a <code>a = cov(x, y)/V(x)</code> et <code>b = ȳ − a·x̄</code>, avec des ' +
      'variances de population.</p>',
    starter: `n = int(input())
x = [float(input()) for _ in range(n)]
y = [float(input()) for _ in range(n)]

# À compléter : afficher a puis b, quatre décimales.
`,
    hints: [
      'Calcule d’abord la pente, avec la variance de x au dénominateur — jamais l’inverse.',
      'Contrôle final : a × x̄ + b doit redonner ȳ. Si ce n’est pas le cas, il y a une erreur de calcul.'
    ],
    examples: [
      { stdin: '3\n1\n2\n3\n2\n4\n6', expected: '2.0000\n0.0000', note: 'Points alignés sur y = 2x.' }
    ],
    tests: [
      { label: 'Droite décalée', stdin: '4\n1\n2\n3\n4\n3\n5\n6\n9', expected: '1.9000\n1.0000' },
      { label: 'Pente négative', stdin: '3\n1\n2\n3\n5\n2\n4', expected: '-0.5000\n4.6667' },
      { label: 'Deux points', stdin: '2\n0\n10\n0\n10', expected: '1.0000\n0.0000' }
    ],
    solution: `n = int(input())
x = [float(input()) for _ in range(n)]
y = [float(input()) for _ in range(n)]

mx = sum(x) / n
my = sum(y) / n
covariance = sum(x[i] * y[i] for i in range(n)) / n - mx * my
variance_x = sum((v - mx) ** 2 for v in x) / n

a = covariance / variance_x
b = my - a * mx

# Un arrondi flottant peut afficher −0,0000 quand la droite passe exactement
# par le point moyen : on ramène ces valeurs à zéro.
if abs(b) < 1e-12:
    b = 0.0

print(f"{a:.4f}")
print(f"{b:.4f}")
`
  }
];
