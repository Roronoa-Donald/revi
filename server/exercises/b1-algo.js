/**
 * Exercices de code — Algorithmique (B1), 3 par module, écrits en Python.
 *
 * Le cours enseigne la démarche algorithmique (pseudo-code et Pascal), mais les
 * exercices exécutables de la plateforme sont rédigés en Python : c'est le seul
 * langage de la liste blanche du fournisseur d'exécution disponible pour ce
 * module. Chaque exercice demande d'implémenter un algorithme vu en cours.
 *
 * Même contrat que les autres catalogues :
 *   - `brief`    : l'énoncé affiché à l'élève ;
 *   - `starter`  : le code de départ déposé dans Monaco (il comporte un défaut) ;
 *   - `examples` : un exemple VISIBLE (entrée, sortie attendue, commentaire) ;
 *   - `tests`    : les tests de correction, CACHÉS (jamais envoyés au navigateur) ;
 *   - `hints`    : deux indices rédigés en mots, jamais en code ;
 *   - `solution` : le corrigé, réservé au serveur (contrôle d'intégrité).
 *
 * Les programmes lisent l'entrée standard ; les sorties sont comparées après
 * normalisation des espaces de fin de ligne. Les valeurs des tests cachés
 * diffèrent de l'exemple visible : recopier l'exemple ne suffit pas.
 */

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Introduction à l'algorithmique
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Le rectangle de la cantine',
    goal: 'Traduire un énoncé en séquence entrée → traitement → sortie.',
    brief: '<p>La cantine veut carreler une salle rectangulaire. Le programme reçoit la longueur puis la largeur (entiers, en mètres). Calculez l’aire et le périmètre : l’aire sur une première ligne, le périmètre sur la seconde.</p>',
    starter: `longueur = int(input())
largeur = int(input())

# À compléter : afficher l'aire puis le périmètre.
`,
    hints: [
      'L’aire d’un rectangle est le produit de ses deux dimensions, le périmètre la somme des quatre côtés.',
      'Chaque information demandée occupe sa propre ligne : deux affichages, dans l’ordre de l’énoncé.'
    ],
    examples: [
      { stdin: '5\n3', expected: '15\n16', note: 'Aire 5 × 3 = 15 ; périmètre 2 × (5 + 3) = 16.' }
    ],
    tests: [
      { label: 'Carré', stdin: '4\n4', expected: '16\n16' },
      { label: 'Pièce allongée', stdin: '10\n2', expected: '20\n24' },
      { label: 'Une seule rangée', stdin: '1\n7', expected: '7\n16' }
    ],
    solution: `longueur = int(input())
largeur = int(input())

aire = longueur * largeur
perimetre = 2 * (longueur + largeur)

print(aire)
print(perimetre)
`
  },
  {
    id: 'algo-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Repas et commandes',
    goal: 'Calculer un total à partir de plusieurs entrées.',
    brief: '<p>Le programme reçoit trois lignes : le prix d’un repas (entier), puis la quantité commandée, puis la remise en pourcentage. Affichez le total à payer (entier), après application de la remise.</p>',
    starter: `prix = int(input())
quantite = int(input())
remise = int(input())

# À compléter : calculer et afficher le total après remise.
`,
    hints: [
      'Calculez d’abord le total plein, puis retirez la part correspondant au pourcentage de remise.',
      'Pour rester en entiers, la part de remise s’obtient par une division entière du total multiplié par le pourcentage.'
    ],
    examples: [
      { stdin: '2500\n3\n10', expected: '6750', note: '3 repas à 2500 = 7500 ; remise 10 % = 750 ; total 6750.' }
    ],
    tests: [
      { label: 'Sans remise', stdin: '1000\n2\n0', expected: '2000' },
      { label: 'Une seule unité', stdin: '500\n1\n20', expected: '400' },
      { label: 'Remise élevée', stdin: '300\n5\n50', expected: '750' }
    ],
    solution: `prix = int(input())
quantite = int(input())
remise = int(input())

total = prix * quantite
total = total - (total * remise) // 100

print(total)
`
  },
  {
    id: 'algo-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Découper une durée',
    goal: 'Décomposer une valeur avec division entière et reste.',
    brief: '<p>Le programme reçoit un nombre entier de secondes. Affichez la durée découpée sous la forme <code>H h M min S s</code>.</p>',
    starter: `total = int(input())

# À compléter : découper la durée en heures, minutes et secondes.
`,
    hints: [
      'Une heure contient 3600 secondes : la division entière donne les heures complètes, le reste ce qui reste à répartir.',
      'Le même raisonnement s’applique une deuxième fois pour extraire les minutes du reste.'
    ],
    examples: [
      { stdin: '3723', expected: '1 h 2 min 3 s', note: '3600 + 120 + 3 secondes.' }
    ],
    tests: [
      { label: 'Moins d’une minute', stdin: '59', expected: '0 h 0 min 59 s' },
      { label: 'Pile une heure', stdin: '3600', expected: '1 h 0 min 0 s' },
      { label: 'Plusieurs heures', stdin: '7325', expected: '2 h 2 min 5 s' }
    ],
    solution: `total = int(input())

heures = total // 3600
minutes = (total % 3600) // 60
secondes = total % 60

print(heures, "h", minutes, "min", secondes, "s")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Variables, types et affectation
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Permuter deux valeurs',
    goal: 'Échanger le contenu de deux variables.',
    brief: '<p>Le programme reçoit deux entiers, chacun sur une ligne. Échangez leurs valeurs : la première valeur lue doit être affichée en second et la seconde en premier, séparées par une espace.</p>',
    starter: `a = int(input())
b = int(input())

# À compléter : échanger a et b, puis les afficher.
`,
    hints: [
      'Un échange a besoin d’une case temporaire, ou d’une écriture qui affecte les deux variables en une seule fois.',
      'Attention à l’ordre : ce qui est demandé, c’est b puis a à l’affichage.'
    ],
    examples: [
      { stdin: '3\n8', expected: '8 3', note: 'Les deux valeurs ont été permutées.' }
    ],
    tests: [
      { label: 'Valeurs égales', stdin: '5\n5', expected: '5 5' },
      { label: 'Négatif', stdin: '-2\n7', expected: '7 -2' },
      { label: 'Zéro', stdin: '0\n9', expected: '9 0' }
    ],
    solution: `a = int(input())
b = int(input())

temporaire = a
a = b
b = temporaire

print(a, b)
`
  },
  {
    id: 'algo-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Moyenne pondérée',
    goal: 'Calculer une moyenne pondérée sans perdre les décimales.',
    brief: '<p>Le programme reçoit une note de contrôle continu (sur 20, entier) et une note d’examen (sur 20, entier). La moyenne pondérée vaut 40 % du contrôle continu plus 60 % de l’examen. Affichez-la avec deux décimales.</p>',
    starter: `controle = int(input())
examen = int(input())

# À compléter : afficher la moyenne pondérée avec deux décimales.
`,
    hints: [
      'Pour que la division soit décimale, au moins un opérande doit être un nombre à virgule.',
      'L’arrondi se fait au moment de l’affichage : le format des f-strings fixe le nombre de décimales.'
    ],
    examples: [
      { stdin: '12\n15', expected: '13.80', note: '0,4 × 12 + 0,6 × 15 = 13,80.' }
    ],
    tests: [
      { label: 'Notes égales', stdin: '10\n10', expected: '10.00' },
      { label: 'Examen fort', stdin: '0\n20', expected: '12.00' },
      { label: 'Contrôle fort', stdin: '20\n0', expected: '8.00' }
    ],
    solution: `controle = int(input())
examen = int(input())

moyenne = 0.4 * controle + 0.6 * examen
print(f"{moyenne:.2f}")
`
  },
  {
    id: 'algo-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'Somme des chiffres',
    goal: 'Décomposer un entier chiffre par chiffre.',
    brief: '<p>Le programme reçoit un entier positif. Affichez la somme de ses chiffres.</p>',
    starter: `nombre = int(input())

# À compléter : additionner les chiffres du nombre.
`,
    hints: [
      'Un nombre peut se parcourir caractère par caractère une fois converti en texte.',
      'Chaque morceau doit redevenir un entier pour entrer dans une somme.'
    ],
    examples: [
      { stdin: '4729', expected: '22', note: '4 + 7 + 2 + 9 = 22.' }
    ],
    tests: [
      { label: 'Zéro', stdin: '0', expected: '0' },
      { label: 'Chiffres identiques', stdin: '999', expected: '27' },
      { label: 'Nombre plus long', stdin: '123456', expected: '21' }
    ],
    solution: `nombre = int(input())

total = 0
for chiffre in str(nombre):
    total += int(chiffre)

print(total)
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Conditions (test alternatif)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'python',
    title: 'Admis, rattrapage, ajourné',
    goal: 'Écrire un test alternatif double et ordonner les conditions.',
    brief: '<p>Le programme reçoit une note entière. Affichez <code>Admis</code> si elle vaut au moins 10, <code>Rattrapage</code> si elle est comprise entre 8 et 9 inclus, sinon <code>Ajourné</code>.</p>',
    starter: `note = int(input())

# À compléter : choisir le bon message.
`,
    hints: [
      'L’ordre des conditions décide du résultat : commencez par le cas le plus exigeant.',
      'Dans une cascade, la première branche satisfaite prend la main et les suivantes sont ignorées.'
    ],
    examples: [
      { stdin: '12', expected: 'Admis', note: '12 est au-dessus du seuil d’admission.' }
    ],
    tests: [
      { label: 'Seuil exact', stdin: '10', expected: 'Admis' },
      { label: 'Borne haute du rattrapage', stdin: '9', expected: 'Rattrapage' },
      { label: 'En dessous de tout', stdin: '3', expected: 'Ajourné' }
    ],
    solution: `note = int(input())

if note >= 10:
    print("Admis")
elif note >= 8:
    print("Rattrapage")
else:
    print("Ajourné")
`
  },
  {
    id: 'algo-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Le plus grand de trois',
    goal: 'Enchaîner des comparaisons pour désigner un maximum.',
    brief: '<p>Le programme reçoit trois entiers, chacun sur une ligne. Affichez le plus grand, suivi d’un deux-points et d’une espace, puis sa position (<code>1</code>, <code>2</code> ou <code>3</code>). En cas d’égalité, gardez la première position atteinte.</p>',
    starter: `a = int(input())
b = int(input())
c = int(input())

# À compléter : afficher le maximum et sa position.
`,
    hints: [
      'Partez du premier nombre comme candidat : la position de départ est donc 1.',
      'Ne remplacez le candidat que si une valeur le dépasse strictement : l’égalité conserve la première position.'
    ],
    examples: [
      { stdin: '4\n9\n2', expected: 'Max : 9 (position 2)', note: 'Le deuxième nombre est le plus grand.' }
    ],
    tests: [
      { label: 'Le premier gagne', stdin: '8\n3\n1', expected: 'Max : 8 (position 1)' },
      { label: 'Le dernier gagne', stdin: '1\n2\n9', expected: 'Max : 9 (position 3)' },
      { label: 'Égalité en tête', stdin: '7\n7\n2', expected: 'Max : 7 (position 1)' }
    ],
    solution: `a = int(input())
b = int(input())
c = int(input())

maximum = a
position = 1
if b > maximum:
    maximum = b
    position = 2
if c > maximum:
    maximum = c
    position = 3

print("Max :", maximum, "(position", str(position) + ")")
`
  },
  {
    id: 'algo-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Année bissextile',
    goal: 'Combiner plusieurs conditions logiques.',
    brief: '<p>Le programme reçoit une année (entier). Affichez <code>bissextile</code> si elle est divisible par 4 mais pas par 100, ou si elle est divisible par 400 ; sinon affichez <code>ordinaire</code>.</p>',
    starter: `annee = int(input())

# À compléter : tester les règles de la bissextile.
`,
    hints: [
      'Deux règles coexistent : la règle générale (divisible par 4 mais pas par 100) et l’exception qui la répare (divisible par 400).',
      'La divisibilité se teste avec le reste d’une division : un reste nul signifie que l’année est divisible.'
    ],
    examples: [
      { stdin: '2024', expected: 'bissextile', note: '2024 est divisible par 4 et pas par 100.' }
    ],
    tests: [
      { label: 'Siècle non bissextile', stdin: '1900', expected: 'ordinaire' },
      { label: 'Exception du millénaire', stdin: '2000', expected: 'bissextile' },
      { label: 'Année commune', stdin: '2023', expected: 'ordinaire' }
    ],
    solution: `annee = int(input())

if (annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0:
    print("bissextile")
else:
    print("ordinaire")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Boucle Pour
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Table de multiplication',
    goal: 'Écrire une boucle compteur avec la bonne borne.',
    brief: '<p>Le programme reçoit un entier n. Affichez sa table de multiplication de 1 à 10, une ligne par produit, sous la forme <code>n x i = r</code>.</p>',
    starter: `n = int(input())

# À compléter : afficher la table de 1 à 10.
`,
    hints: [
      'La borne de fin d’un parcours n’est jamais atteinte : pour aller jusqu’à 10 inclus, il faut dépasser d’un.',
      'Chaque tour affiche sa ligne ; le produit se calcule dans le tour.'
    ],
    examples: [
      { stdin: '3', expected: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30', note: 'Dix lignes, de 1 à 10.' }
    ],
    tests: [
      { label: 'Table de 2', stdin: '2', expected: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20' },
      { label: 'Table de 7', stdin: '7', expected: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70' },
      { label: 'Cas nul', stdin: '0', expected: '0 x 1 = 0\n0 x 2 = 0\n0 x 3 = 0\n0 x 4 = 0\n0 x 5 = 0\n0 x 6 = 0\n0 x 7 = 0\n0 x 8 = 0\n0 x 9 = 0\n0 x 10 = 0' }
    ],
    solution: `n = int(input())

for i in range(1, 11):
    print(n, "x", i, "=", n * i)
`
  },
  {
    id: 'algo-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Somme des entiers de 1 à n',
    goal: 'Accumuler un résultat dans une boucle Pour.',
    brief: '<p>Le programme reçoit un entier n. Affichez la somme 1 + 2 + … + n en utilisant une boucle, sans <code>sum()</code>.</p>',
    starter: `n = int(input())

# À compléter : accumuler les entiers de 1 à n.
`,
    hints: [
      'Un accumulateur s’initialise avant la boucle : initialisé dedans, il repart de zéro à chaque tour.',
      'La borne de fin doit dépasser n d’une unité pour que n soit inclus.'
    ],
    examples: [
      { stdin: '10', expected: '55', note: '1 + 2 + … + 10 = 55.' }
    ],
    tests: [
      { label: 'Cas nul', stdin: '0', expected: '0' },
      { label: 'Un seul terme', stdin: '1', expected: '1' },
      { label: 'Grande valeur', stdin: '100', expected: '5050' }
    ],
    solution: `n = int(input())

total = 0
for i in range(1, n + 1):
    total += i

print(total)
`
  },
  {
    id: 'algo-c4-e3',
    chapter: 4,
    level: 'n4',
    language: 'python',
    title: 'Factorielle',
    goal: 'Accumuler un produit et respecter l’élément neutre.',
    brief: '<p>Le programme reçoit un entier n (0 ≤ n ≤ 20). Affichez sa factorielle : le produit 1 × 2 × … × n, avec la convention 1 pour n = 0. Une boucle est attendue.</p>',
    starter: `n = int(input())

# À compléter : calculer la factorielle avec une boucle.
`,
    hints: [
      'Un produit s’accumule comme une somme, mais l’élément neutre n’est pas zéro : multiplier par zéro effacerait tout.',
      'Pour n = 0, la boucle ne s’exécute pas : la valeur initiale de l’accumulateur est déjà le bon résultat.'
    ],
    examples: [
      { stdin: '5', expected: '120', note: '1 × 2 × 3 × 4 × 5 = 120.' }
    ],
    tests: [
      { label: 'Cas zéro', stdin: '0', expected: '1' },
      { label: 'Un', stdin: '1', expected: '1' },
      { label: 'Six', stdin: '6', expected: '720' }
    ],
    solution: `n = int(input())

produit = 1
for i in range(1, n + 1):
    produit *= i

print(produit)
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Boucles TantQue et Répéter
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c5-e1',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Somme jusqu’au seuil',
    goal: 'Écrire une boucle TantQue dont la condition dépend d’un accumulateur.',
    brief: '<p>Le programme reçoit un entier seuil. Ajoutez les entiers naturels successifs (1, 2, 3, …) tant que la somme est strictement inférieure au seuil, puis affichez la somme obtenue et le nombre de termes ajoutés, séparés par une espace.</p>',
    starter: `seuil = int(input())

# À compléter : boucler tant que la somme reste sous le seuil.
`,
    hints: [
      'Le test de la boucle porte sur la somme, pas sur le compteur : on continue tant qu’il reste de la marge sous le seuil.',
      'Deux variables évoluent ensemble : la somme et le nombre de termes ajoutés.'
    ],
    examples: [
      { stdin: '10', expected: '10 4', note: '1 + 2 + 3 + 4 = 10 : quatre termes pour atteindre le seuil.' }
    ],
    tests: [
      { label: 'Seuil nul', stdin: '0', expected: '0 0' },
      { label: 'Seuil un', stdin: '1', expected: '1 1' },
      { label: 'Dépassement', stdin: '12', expected: '15 5' }
    ],
    solution: `seuil = int(input())

somme = 0
termes = 0
while somme < seuil:
    termes += 1
    somme += termes

print(somme, termes)
`
  },
  {
    id: 'algo-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Compter les chiffres',
    goal: 'Répéter une réduction jusqu’à la condition d’arrêt.',
    brief: '<p>Le programme reçoit un entier positif. Affichez son nombre de chiffres, obtenu par divisions entières successives (sans convertir en texte).</p>',
    starter: `nombre = int(input())

# À compléter : compter les divisions par 10 nécessaires.
`,
    hints: [
      'Une division entière par 10 supprime le dernier chiffre : répétez-la jusqu’à ce que le nombre soit épuisé.',
      'Le cas particulier zéro compte pour un chiffre : traitez-le avant la boucle ou choisissez une boucle qui s’exécute au moins une fois.'
    ],
    examples: [
      { stdin: '4729', expected: '4', note: 'Quatre chiffres.' }
    ],
    tests: [
      { label: 'Zéro', stdin: '0', expected: '1' },
      { label: 'Un chiffre', stdin: '7', expected: '1' },
      { label: 'Six chiffres', stdin: '123456', expected: '6' }
    ],
    solution: `nombre = int(input())

if nombre == 0:
    print(1)
else:
    compte = 0
    while nombre > 0:
        nombre //= 10
        compte += 1
    print(compte)
`
  },
  {
    id: 'algo-c5-e3',
    chapter: 5,
    level: 'n4',
    language: 'python',
    title: 'Conjecture de Syracuse',
    goal: 'Écrire une boucle dont on ne connaît pas le nombre de tours à l’avance.',
    brief: '<p>Le programme reçoit un entier strictement positif. Appliquez la suite de Syracuse : tant que la valeur n’est pas 1, divisez-la par 2 si elle est paire, sinon remplacez-la par 3 × valeur + 1. Comptez et affichez le nombre d’étapes nécessaires.</p>',
    starter: `valeur = int(input())

# À compléter : répéter jusqu'à atteindre 1, en comptant les étapes.
`,
    hints: [
      'La condition d’arrêt est l’atteinte de 1 : la boucle tourne tant que ce n’est pas le cas.',
      'Deux transformations coexistent selon la parité ; une seule s’applique par étape, et chaque transformation compte pour une étape.'
    ],
    examples: [
      { stdin: '6', expected: '8', note: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 : huit étapes.' }
    ],
    tests: [
      { label: 'Déjà un', stdin: '1', expected: '0' },
      { label: 'Deux', stdin: '2', expected: '1' },
      { label: 'Vingt-sept', stdin: '27', expected: '111' }
    ],
    solution: `valeur = int(input())

etapes = 0
while valeur != 1:
    if valeur % 2 == 0:
        valeur //= 2
    else:
        valeur = 3 * valeur + 1
    etapes += 1

print(etapes)
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Tableaux à une dimension
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c6-e1',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Somme et maximum d’un tableau',
    goal: 'Parcourir un tableau une seule fois pour deux résultats.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Affichez la somme sur une ligne, puis le maximum sur la suivante, en un seul parcours.</p>',
    starter: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))

# À compléter : calculer la somme et le maximum en un seul parcours.
`,
    hints: [
      'Le maximum ne se devine pas : partez du premier élément et remplacez le candidat dès qu’un élément le dépasse.',
      'Les deux accumulateurs vivent dans la même boucle : la somme grandit à chaque tour, le maximum seulement quand il est battu.'
    ],
    examples: [
      { stdin: '5\n12\n15\n14\n9\n18', expected: '68\n18', note: 'Somme 68 ; maximum 18.' }
    ],
    tests: [
      { label: 'Trois éléments', stdin: '3\n1\n2\n3', expected: '6\n3' },
      { label: 'Un seul élément', stdin: '1\n7', expected: '7\n7' },
      { label: 'Tous négatifs', stdin: '4\n-1\n-2\n-3\n-4', expected: '-10\n-1' }
    ],
    solution: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))

somme = 0
maximum = tableau[0]
for valeur in tableau:
    somme += valeur
    if valeur > maximum:
        maximum = valeur

print(somme)
print(maximum)
`
  },
  {
    id: 'algo-c6-e2',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Recherche séquentielle',
    goal: 'Implémenter la recherche dans un tableau.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers, puis une valeur cible. Affichez la position de la première occurrence de la cible dans le tableau (positions numérotées à partir de 1), ou <code>absent</code> si elle n’y figure pas.</p>',
    starter: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))
cible = int(input())

# À compléter : chercher la cible et afficher sa position ou « absent ».
`,
    hints: [
      'Parcourez les positions dans l’ordre : la première occurrence rencontrée est la bonne réponse.',
      'Si la boucle se termine sans avoir trouvé, c’est que la valeur est absente : il faut un cas pour ce résultat.'
    ],
    examples: [
      { stdin: '5\n10\n20\n30\n20\n50\n20', expected: '2', note: 'La première occurrence de 20 est à la position 2.' }
    ],
    tests: [
      { label: 'Premier élément', stdin: '3\n7\n8\n9\n7', expected: '1' },
      { label: 'Absent', stdin: '4\n1\n2\n3\n4\n9', expected: 'absent' },
      { label: 'Dernier élément', stdin: '3\n5\n6\n7\n7', expected: '3' }
    ],
    solution: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))
cible = int(input())

position = None
for i in range(n):
    if tableau[i] == cible:
        position = i + 1
        break

if position is None:
    print("absent")
else:
    print(position)
`
  },
  {
    id: 'algo-c6-e3',
    chapter: 6,
    level: 'n4',
    language: 'python',
    title: 'Tri par sélection',
    goal: 'Implémenter un tri simple du cours, sans sort().',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Triez le tableau par sélection (repeatedly : chercher le minimum de la partie non triée et l’échanger), <strong>sans</strong> utiliser <code>sort()</code> ni <code>sorted()</code>. Affichez les valeurs triées sur une ligne, séparées par des espaces.</p>',
    starter: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))

# À compléter : tri par sélection, sans sort() ni sorted().
`,
    hints: [
      'La partie triée grandit depuis le début : à chaque tour, cherchez le minimum de ce qui reste et échangez-le avec la première position libre.',
      'Pour l’échange, une variable temporaire (ou l’affectation simultanée) évite d’écraser une valeur avant de l’avoir déplacée.'
    ],
    examples: [
      { stdin: '5\n5\n2\n8\n1\n9', expected: '1 2 5 8 9', note: 'Tri croissant complet.' }
    ],
    tests: [
      { label: 'Déjà trié', stdin: '3\n1\n2\n3', expected: '1 2 3' },
      { label: 'Ordre inverse', stdin: '4\n4\n3\n2\n1', expected: '1 2 3 4' },
      { label: 'Doublons', stdin: '5\n3\n1\n3\n1\n2', expected: '1 1 2 3 3' }
    ],
    solution: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))

for debut in range(n - 1):
    indice_min = debut
    for i in range(debut + 1, n):
        if tableau[i] < tableau[indice_min]:
            indice_min = i
    tableau[debut], tableau[indice_min] = tableau[indice_min], tableau[debut]

print(" ".join(str(valeur) for valeur in tableau))
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 7 — Fonctions et procédures
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c7-e1',
    chapter: 7,
    level: 'n3',
    language: 'python',
    title: 'Une fonction qui renvoie une valeur',
    goal: 'Distinguer return de print dans une fonction.',
    brief: '<p>Complétez la fonction <code>carre</code> pour qu’elle <em>renvoie</em> le carré de son argument. Le programme lit un entier, appelle la fonction et affiche le résultat sous la forme <code>Carre : &lt;valeur&gt;</code>.</p>',
    starter: `def carre(n):
    # À compléter : renvoyer le carré de n.
    pass


valeur = int(input())
print("Carre :", carre(valeur))
`,
    hints: [
      'Une fonction qui affiche mais ne renvoie rien produit None : c’est le signe qu’un print a remplacé le return.',
      'Le mot-clé de retour est suivi de l’expression à renvoyer à l’appelant.'
    ],
    examples: [
      { stdin: '7', expected: 'Carre : 49', note: '7² = 49.' }
    ],
    tests: [
      { label: 'Petit nombre', stdin: '5', expected: 'Carre : 25' },
      { label: 'Zéro', stdin: '0', expected: 'Carre : 0' },
      { label: 'Deux chiffres', stdin: '12', expected: 'Carre : 144' }
    ],
    solution: `def carre(n):
    return n * n


valeur = int(input())
print("Carre :", carre(valeur))
`
  },
  {
    id: 'algo-c7-e2',
    chapter: 7,
    level: 'n4',
    language: 'python',
    title: 'calcul_statistiques — sujet d’examen',
    goal: 'Faire renvoyer plusieurs valeurs par une fonction.',
    brief: '<p>Écrivez <code>calcul_statistiques(liste_notes)</code> qui renvoie le couple (moyenne, maximum) en un seul parcours, sans <code>sum()</code> ni <code>max()</code>. Le programme lit un entier n, puis n notes, et affiche la moyenne avec deux décimales suivie du maximum, séparés par une espace.</p>',
    starter: `def calcul_statistiques(liste_notes):
    # Version de départ volontairement fausse.
    return 0, 0


n = int(input())
notes = []
for i in range(n):
    notes.append(int(input()))

moyenne, maximum = calcul_statistiques(notes)
print(f"{moyenne:.2f} {maximum}")
`,
    hints: [
      'Une fonction ne renvoie qu’une seule chose : pour en faire passer deux, groupez-les dans un couple séparé par une virgule.',
      'Le maximum se cherche en mémorisant un candidat, puis en le remplaçant dès qu’un élément le dépasse.'
    ],
    examples: [
      { stdin: '5\n12\n15\n14\n9\n18', expected: '13.60 18', note: 'Moyenne 13.60 et maximum 18.' }
    ],
    tests: [
      { label: 'Un seul élément', stdin: '1\n10', expected: '10.00 10' },
      { label: 'Toutes les notes à zéro', stdin: '3\n0\n0\n0', expected: '0.00 0' },
      { label: 'Quatre notes', stdin: '4\n7\n20\n3\n11', expected: '10.25 20' }
    ],
    solution: `def calcul_statistiques(liste_notes):
    total = 0
    maximum = liste_notes[0]
    for note in liste_notes:
        total += note
        if note > maximum:
            maximum = note
    return total / len(liste_notes), maximum


n = int(input())
notes = []
for i in range(n):
    notes.append(int(input()))

moyenne, maximum = calcul_statistiques(notes)
print(f"{moyenne:.2f} {maximum}")
`
  },
  {
    id: 'algo-c7-e3',
    chapter: 7,
    level: 'n4',
    language: 'python',
    title: 'Fonction booléenne et réutilisation',
    goal: 'Écrire une fonction de test et l’appeler depuis une autre.',
    brief: '<p>Écrivez <code>est_premier(n)</code> qui renvoie <code>True</code> ou <code>False</code>, puis <code>compte_premiers(limite)</code> qui renvoie combien de nombres premiers existent entre 2 et limite inclus. Le programme lit la limite et affiche le compte.</p>',
    starter: `def est_premier(n):
    # À compléter : renvoyer True si n est premier, False sinon.
    pass


def compte_premiers(limite):
    # À compléter : compter les premiers entre 2 et limite inclus.
    pass


limite = int(input())
print(compte_premiers(limite))
`,
    hints: [
      'Un nombre premier n’a aucun diviseur autre que 1 et lui-même : dès qu’un diviseur est trouvé, le verdict est rendu.',
      'La fonction de comptage n’a pas à refaire le travail : elle appelle la fonction de test pour chaque candidat.'
    ],
    examples: [
      { stdin: '10', expected: '4', note: '2, 3, 5 et 7 sont premiers : quatre au total.' }
    ],
    tests: [
      { label: 'Limite un', stdin: '1', expected: '0' },
      { label: 'Limite deux', stdin: '2', expected: '1' },
      { label: 'Limite cinquante', stdin: '50', expected: '15' }
    ],
    solution: `def est_premier(n):
    if n < 2:
        return False
    for diviseur in range(2, n):
        if n % diviseur == 0:
            return False
    return True


def compte_premiers(limite):
    compte = 0
    for candidat in range(2, limite + 1):
        if est_premier(candidat):
            compte += 1
    return compte


limite = int(input())
print(compte_premiers(limite))
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 8 — Tableaux à deux dimensions et chaînes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c8-e1',
    chapter: 8,
    level: 'n3',
    language: 'python',
    title: 'Somme d’une matrice',
    goal: 'Parcourir un tableau à deux dimensions.',
    brief: '<p>Le programme reçoit un entier l (lignes), un entier c (colonnes), puis l × c entiers ligne par ligne. Affichez la somme de tous les éléments de la matrice.</p>',
    starter: `lignes = int(input())
colonnes = int(input())
matrice = []
for i in range(lignes):
    matrice.append([int(valeur) for valeur in input().split()])

# À compléter : calculer la somme de tous les éléments.
`,
    hints: [
      'Un double parcours s’impose : une boucle pour les lignes, imbriquée dans une pour les colonnes.',
      'La deuxième boucle peut parcourir directement les valeurs de la ligne courante.'
    ],
    examples: [
      { stdin: '2\n3\n1 2 3\n4 5 6', expected: '21', note: '1+2+3+4+5+6 = 21.' }
    ],
    tests: [
      { label: 'Une ligne', stdin: '1\n4\n5 10 15 20', expected: '50' },
      { label: 'Négatifs', stdin: '2\n2\n-1 1\n2 -2', expected: '0' },
      { label: 'Matrice trois par trois', stdin: '3\n3\n1 1 1\n1 1 1\n1 1 1', expected: '9' }
    ],
    solution: `lignes = int(input())
colonnes = int(input())
matrice = []
for i in range(lignes):
    matrice.append([int(valeur) for valeur in input().split()])

total = 0
for ligne in matrice:
    for valeur in ligne:
        total += valeur

print(total)
`
  },
  {
    id: 'algo-c8-e2',
    chapter: 8,
    level: 'n4',
    language: 'python',
    title: 'Diagonale d’une matrice carrée',
    goal: 'Exploiter la relation entre indices de ligne et de colonne.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes de n entiers. Affichez la somme de la diagonale principale (éléments où numéro de ligne et numéro de colonne sont égaux), puis celle de l’anti-diagonale, chacune sur sa ligne.</p>',
    starter: `n = int(input())
matrice = []
for i in range(n):
    matrice.append([int(valeur) for valeur in input().split()])

# À compléter : sommes des deux diagonales.
`,
    hints: [
      'Dans la diagonale principale, l’indice de colonne est toujours égal à l’indice de ligne.',
      'Dans l’anti-diagonale, la colonne vaut « dernière moins ligne » : la relation se déduit de la taille.'
    ],
    examples: [
      { stdin: '3\n1 2 3\n4 5 6\n7 8 9', expected: '15\n15', note: 'Diagonale 1+5+9 = 15 ; anti-diagonale 3+5+7 = 15.' }
    ],
    tests: [
      { label: 'Une seule cellule', stdin: '1\n4', expected: '4\n4' },
      { label: 'Deux par deux', stdin: '2\n1 2\n3 4', expected: '5\n5' },
      { label: 'Diagonales différentes', stdin: '2\n9 1\n1 9', expected: '18\n2' }
    ],
    solution: `n = int(input())
matrice = []
for i in range(n):
    matrice.append([int(valeur) for valeur in input().split()])

diagonale = 0
anti_diagonale = 0
for i in range(n):
    diagonale += matrice[i][i]
    anti_diagonale += matrice[i][n - 1 - i]

print(diagonale)
print(anti_diagonale)
`
  },
  {
    id: 'algo-c8-e3',
    chapter: 8,
    level: 'n4',
    language: 'python',
    title: 'Inverser une chaîne sans slicing',
    goal: 'Traiter une chaîne comme une collection indexée.',
    brief: '<p>Le programme reçoit un mot. Affichez-le à l’envers <strong>sans</strong> utiliser le découpage par pas négatif (<code>[::-1]</code>) ni <code>reversed()</code> : reconstruisez-le caractère par caractère.</p>',
    starter: `mot = input()

# À compléter : reconstruire le mot à l'envers, sans slicing ni reversed().
`,
    hints: [
      'Partez d’une chaîne vide et ajoutez chaque caractère du mot, en commençant par le dernier.',
      'La position du dernier caractère se déduit de la longueur, moins une unité.'
    ],
    examples: [
      { stdin: 'bonjour', expected: 'ruojnob', note: 'Les caractères sont repris du dernier au premier.' }
    ],
    tests: [
      { label: 'Un seul caractère', stdin: 'a', expected: 'a' },
      { label: 'Palindrome', stdin: 'kayak', expected: 'kayak' },
      { label: 'Mot long', stdin: 'algorithmique', expected: 'euqimhtirogla' }
    ],
    solution: `mot = input()

inverse = ""
for i in range(len(mot) - 1, -1, -1):
    inverse += mot[i]

print(inverse)
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 9 — Algorithmes classiques
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c9-e1',
    chapter: 9,
    level: 'n4',
    language: 'python',
    title: 'Tri à bulles',
    goal: 'Implémenter le tri à bulles avec arrêt anticipé.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Triez-les par la méthode des bulles : répétez des passages qui échangent les paires voisines mal ordonnées. Optimisez avec un indicateur d’échange : si un passage complet n’échange rien, le tableau est trié et le tri s’arrête. Interdits : <code>sort()</code>, <code>sorted()</code>. Affichez les valeurs triées sur une ligne, séparées par des espaces, suivies du nombre de passages effectués sur la ligne suivante.</p>',
    starter: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))

# À compléter : tri à bulles avec arrêt anticipé.
`,
    hints: [
      'Chaque passage remonte la plus grande valeur non classée vers sa place définitive : la partie à parcourir rétrécit d’une case à chaque passage.',
      'Un indicateur booléen, remis à faux au début de chaque passage et relevé dès qu’un échange a lieu, dit quand s’arrêter.'
    ],
    examples: [
      { stdin: '5\n5\n2\n8\n1\n9', expected: '1 2 5 8 9\n4', note: 'Quatre passages pour trier cinq valeurs.' }
    ],
    tests: [
      { label: 'Déjà trié, un passage', stdin: '4\n1\n2\n3\n4', expected: '1 2 3 4\n1' },
      { label: 'Ordre inverse', stdin: '4\n4\n3\n2\n1', expected: '1 2 3 4\n3' },
      { label: 'Trois éléments', stdin: '3\n2\n3\n1', expected: '1 2 3\n2' }
    ],
    solution: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))

passages = 0
a_trier = True
fin = n
while a_trier and fin > 1:
    a_trier = False
    for i in range(fin - 1):
        if tableau[i] > tableau[i + 1]:
            tableau[i], tableau[i + 1] = tableau[i + 1], tableau[i]
            a_trier = True
    fin -= 1
    passages += 1

print(" ".join(str(valeur) for valeur in tableau))
print(passages)
`
  },
  {
    id: 'algo-c9-e2',
    chapter: 9,
    level: 'n4',
    language: 'python',
    title: 'Recherche dichotomique',
    goal: 'Diviser l’espace de recherche à chaque étape.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers <strong>triés en ordre croissant</strong>, puis une valeur cible. Implémentez la recherche dichotomique (interdits : <code>index()</code>, <code>in</code>) et affichez la position de la cible (positions numérotées à partir de 1), ou <code>absent</code>.</p>',
    starter: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))
cible = int(input())

# À compléter : recherche dichotomique.
`,
    hints: [
      'Comparez la cible au milieu de la zone de recherche : le résultat de la comparaison élimine la moitié restante.',
      'Déplacez les bornes de la zone, jamais le tableau ; comptez les positions à partir de un à l’affichage.'
    ],
    examples: [
      { stdin: '5\n2\n5\n8\n12\n20\n12', expected: '4', note: '12 se trouve à la position 4.' }
    ],
    tests: [
      { label: 'Premier élément', stdin: '4\n1\n3\n5\n7\n1', expected: '1' },
      { label: 'Absent (entre deux)', stdin: '4\n1\n3\n5\n7\n4', expected: 'absent' },
      { label: 'Dernier élément', stdin: '5\n2\n4\n6\n8\n10\n10', expected: '5' }
    ],
    solution: `n = int(input())
tableau = []
for i in range(n):
    tableau.append(int(input()))
cible = int(input())

debut = 0
fin = n - 1
position = None
while debut <= fin and position is None:
    milieu = (debut + fin) // 2
    if tableau[milieu] == cible:
        position = milieu + 1
    elif tableau[milieu] < cible:
        debut = milieu + 1
    else:
        fin = milieu - 1

if position is None:
    print("absent")
else:
    print(position)
`
  },
  {
    id: 'algo-c9-e3',
    chapter: 9,
    level: 'n5',
    language: 'python',
    title: 'Récursivité — puissance et PGCD',
    goal: 'Écrire deux fonctions récursives et les combiner.',
    brief: '<p>Écrivez deux fonctions récursives (aucune boucle) : <code>puissance(base, exposant)</code> qui renvoie base élevé à l’exposant (exposant ≥ 0), et <code>pgcd(a, b)</code> par l’algorithme d’Euclide. Le programme lit base, exposant, puis deux entiers a et b, et affiche les deux résultats sur deux lignes.</p>',
    starter: `def puissance(base, exposant):
    # À compléter : version récursive, sans boucle.
    pass


def pgcd(a, b):
    # À compléter : algorithme d'Euclide récursif.
    pass


base = int(input())
exposant = int(input())
a = int(input())
b = int(input())
print(puissance(base, exposant))
print(pgcd(a, b))
`,
    hints: [
      'Toute fonction récursive a un cas de base qui répond sans rappel : identifiez-le d’abord pour chaque fonction.',
      'La puissance se ramène à la puissance d’exposant inférieur multipliée par la base ; le PGCD de a et b est celui de b et du reste de la division.'
    ],
    examples: [
      { stdin: '2\n10\n48\n36', expected: '1024\n12', note: '2 puissance 10 = 1024 ; PGCD(48, 36) = 12.' }
    ],
    tests: [
      { label: 'Exposant nul et PGCD égal', stdin: '5\n0\n7\n7', expected: '1\n7' },
      { label: 'Exposant un', stdin: '9\n1\n100\n75', expected: '9\n25' },
      { label: 'Nombres premiers entre eux', stdin: '3\n4\n8\n9', expected: '81\n1' }
    ],
    solution: `def puissance(base, exposant):
    if exposant == 0:
        return 1
    return base * puissance(base, exposant - 1)


def pgcd(a, b):
    if b == 0:
        return a
    return pgcd(b, a % b)


base = int(input())
exposant = int(input())
a = int(input())
b = int(input())
print(puissance(base, exposant))
print(pgcd(a, b))
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 10 — Du pseudo-code au programme
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c10-e1',
    chapter: 10,
    level: 'n4',
    language: 'python',
    title: 'Corriger l’algorithme de facturation',
    goal: 'Débusquer une erreur de logique dans un algorithme existant.',
    brief: '<p>Cet algorithme est censé calculer le montant d’une facture avec remise dégressive (5 % au-delà de 10 articles, 10 % au-delà de 50), mais il applique toujours la même remise. Corrigez la logique. Le programme reçoit le prix unitaire (entier) et la quantité ; affichez le total final (entier, après remise entière).</p>',
    starter: `prix = int(input())
quantite = int(input())

# Version de départ FAUSSE : la remise ne dépend pas de la quantité.
total = prix * quantite
total = total - (total * 10) // 100

print(total)
`,
    hints: [
      'Deux seuils coexistent : sous le premier, aucune remise. L’ordre des tests doit aller du cas le plus exigeant au plus général.',
      'La remise se calcule en pourcentage du total, en restant en division entière pour un résultat entier.'
    ],
    examples: [
      { stdin: '200\n60', expected: '10800', note: '60 × 200 = 12000 ; remise 10 % = 1200 ; total 10800.' }
    ],
    tests: [
      { label: 'Petite quantité, pas de remise', stdin: '150\n5', expected: '750' },
      { label: 'Remise intermédiaire', stdin: '100\n20', expected: '1900' },
      { label: 'Grosse quantité', stdin: '50\n100', expected: '4500' }
    ],
    solution: `prix = int(input())
quantite = int(input())

total = prix * quantite
if quantite > 50:
    total = total - (total * 10) // 100
elif quantite > 10:
    total = total - (total * 5) // 100

print(total)
`
  },
  {
    id: 'algo-c10-e2',
    chapter: 10,
    level: 'n4',
    language: 'python',
    title: 'Du pseudo-code au programme complet',
    goal: 'Traduire fidèlement un pseudo-code donné.',
    brief: '<p>Voici un pseudo-code : « Lire n ; S ← 0 ; i ← 1 ; TantQue i ≤ n : si i mod 2 = 0 alors S ← S + i ; i ← i + 1 ; FinTantQue ; Écrire S ». Traduisez-le exactement : le programme reçoit n et affiche la somme des entiers pairs de 1 à n.</p>',
    starter: `n = int(input())

# À compléter : traduire fidèlement le pseudo-code (TantQue, pas de sum()).
`,
    hints: [
      'Le pseudo-code décrit une boucle TantQue avec un compteur qui avance à chaque tour : traduisez-la telle quelle, pas avec un parcours automatique.',
      'Un seul test se fait à l’intérieur de la boucle : la parité du compteur.'
    ],
    examples: [
      { stdin: '10', expected: '30', note: '2 + 4 + 6 + 8 + 10 = 30.' }
    ],
    tests: [
      { label: 'Cas nul', stdin: '0', expected: '0' },
      { label: 'Impair', stdin: '7', expected: '12' },
      { label: 'Grand n', stdin: '100', expected: '2550' }
    ],
    solution: `n = int(input())

somme = 0
i = 1
while i <= n:
    if i % 2 == 0:
        somme += i
    i += 1

print(somme)
`
  },
  {
    id: 'algo-c10-e3',
    chapter: 10,
    level: 'n5',
    language: 'python',
    title: 'Synthèse — gestion d’une file d’attente',
    goal: 'Combiner tableau, boucle, fonction et condition sur un problème complet.',
    brief: '<p>Le programme reçoit un entier n, puis n durées de traitement (entiers, en minutes) dans l’ordre d’arrivée. Calculez avec des fonctions : l’attente totale (somme des durées des personnes précédentes, cumulée pour tout le monde) et le temps moyen d’attente avec deux décimales. Affichez l’attente totale (entier) sur une ligne, puis la moyenne sur la suivante. Aucune boucle dans le programme principal : tout passe par des fonctions.</p>',
    starter: `def attente_totale(durees):
    # À compléter : somme des attentes cumulées.
    return 0


def temps_moyen(durees):
    # À compléter : attente totale divisée par le nombre de personnes.
    return 0.0


n = int(input())
durees = [int(input()) for i in range(n)]
print(attente_totale(durees))
print(f"{temps_moyen(durees):.2f}")
`,
    hints: [
      'La première personne n’attend pas ; la deuxième attend la durée de la première, la troisième la somme des deux précédentes, et ainsi de suite.',
      'Un accumulateur de « durée déjà écoulée » permet de calculer chaque attente au fil du parcours, puis le total se divise par le nombre de personnes.'
    ],
    examples: [
      { stdin: '3\n5\n10\n2', expected: '20\n6.67', note: 'Attentes : 0, 5, 15 → total 20, moyenne 6.67.' }
    ],
    tests: [
      { label: 'Une seule personne', stdin: '1\n7', expected: '0\n0.00' },
      { label: 'Deux personnes', stdin: '2\n4\n6', expected: '4\n2.00' },
      { label: 'Durées égales', stdin: '4\n3\n3\n3\n3', expected: '18\n4.50' }
    ],
    solution: `def attente_totale(durees):
    total = 0
    ecoule = 0
    for duree in durees:
        total += ecoule
        ecoule += duree
    return total


def temps_moyen(durees):
    if not durees:
        return 0.0
    return attente_totale(durees) / len(durees)


n = int(input())
durees = [int(input()) for i in range(n)]
print(attente_totale(durees))
print(f"{temps_moyen(durees):.2f}")
`
  }
];
