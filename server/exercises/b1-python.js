/**
 * Exercices de code — Python B1 (INF-1001), 3 par module.
 *
 * Chaque fiche contient :
 *   - `brief`    : l'énoncé affiché à l'élève ;
 *   - `starter`  : le code de départ déposé dans Monaco ;
 *   - `examples` : un exemple VISIBLE (entrée, sortie attendue, commentaire) ;
 *   - `tests`    : les tests de correction, CACHÉS (jamais envoyés au navigateur) ;
 *   - `hints`    : deux indices rédigés en mots, jamais en code ;
 *   - `solution` : le corrigé, réservé au serveur (contrôle d'intégrité).
 *
 * Les entrées sont lues sur l'entrée standard ; les sorties sont comparées
 * après normalisation des espaces de fin de ligne. Les tests cachés utilisent
 * délibérément des valeurs différentes de l'exemple visible : recopier la
 * sortie de l'exemple ne fait donc pas passer l'exercice.
 */

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Environnement, variables et types
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'py-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Conversion Celsius vers Fahrenheit',
    goal: 'Écrire une fonction qui convertit une température, puis l’appeler avec une valeur lue sur l’entrée standard.',
    brief: '<p>Le programme reçoit un entier sur l’entrée standard. Complétez la fonction <code>convertir_temperature</code> pour qu’elle renvoie la valeur en degrés Fahrenheit, puis affichez son résultat.</p><p>Formule : F = C × 9/5 + 32.</p>',
    starter: `def convertir_temperature(celsius):
    # À compléter : renvoyer la valeur convertie.
    pass


valeur = int(input())
print(convertir_temperature(valeur))
`,
    hints: [
      'Une fonction qui n’a pas de return renvoie None : si None s’affiche, c’est qu’un print a remplacé le return.',
      'Pour obtenir un résultat décimal, la division doit être décimale : en Python, 9 / 5 vaut 1.8 alors que 9 // 5 vaut 1.'
    ],
    examples: [
      { stdin: '25', expected: '77.0', note: '25 °C correspondent à 77 °F.' }
    ],
    tests: [
      { label: 'Zéro degré', stdin: '0', expected: '32.0' },
      { label: 'Froid extrême', stdin: '-40', expected: '-40.0' },
      { label: 'Eau bouillante', stdin: '100', expected: '212.0' }
    ],
    solution: `def convertir_temperature(celsius):
    return celsius * 9 / 5 + 32


valeur = int(input())
print(convertir_temperature(valeur))
`
  },
  {
    id: 'py-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Moyenne de trois notes, formatée',
    goal: 'Lire plusieurs valeurs et présenter un résultat décimal au format demandé.',
    brief: '<p>Le programme reçoit trois lignes, chacune contenant une note entière. Affichez leur moyenne sur une seule ligne, avec exactement deux décimales (par exemple <code>12.33</code>).</p>',
    starter: `note1 = int(input())
note2 = int(input())
note3 = int(input())

# À compléter : calculer puis afficher la moyenne avec deux décimales.
`,
    hints: [
      'La division entière // tronque le résultat : pour une moyenne, c’est la division décimale / qu’il faut.',
      'L’arrondi se fait au moment de l’affichage, pas dans le calcul : le format d’un f-string permet de fixer le nombre de décimales.'
    ],
    examples: [
      { stdin: '12\n15\n9', expected: '12.00', note: '12 + 15 + 9 = 36, et 36 / 3 = 12.00.' }
    ],
    tests: [
      { label: 'Notes identiques', stdin: '10\n10\n10', expected: '10.00' },
      { label: 'Avec un zéro', stdin: '20\n0\n10', expected: '10.00' },
      { label: 'Moyenne non ronde', stdin: '7\n11\n13', expected: '10.33' }
    ],
    solution: `note1 = int(input())
note2 = int(input())
note3 = int(input())

moyenne = (note1 + note2 + note3) / 3
print(f"{moyenne:.2f}")
`
  },
  {
    id: 'py-c1-e3',
    chapter: 1,
    level: 'n3',
    language: 'python',
    title: 'Découpage d’une durée',
    goal: 'Utiliser la division entière et le reste pour décomposer une valeur.',
    brief: '<p>Le programme reçoit un nombre entier de secondes. Affichez la durée découpée sous la forme <code>H h M min S s</code>.</p><p>Pour 3723 secondes, la sortie attendue est <code>1 h 2 min 3 s</code>.</p>',
    starter: `total = int(input())

# À compléter : découper la durée en heures, minutes et secondes.
`,
    hints: [
      'Une heure contient 3600 secondes : la division entière donne le nombre d’heures complètes, le reste ce qui reste à répartir.',
      'Le même raisonnement s’applique une deuxième fois pour extraire les minutes du reste, et le reste final est la réponse en secondes.'
    ],
    examples: [
      { stdin: '3723', expected: '1 h 2 min 3 s', note: '1 h 2 min 3 s : 3600 + 120 + 3.' }
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
  // Module 2 — Structures de contrôle
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'py-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Somme des entiers de 1 à n',
    goal: 'Écrire une boucle d’accumulation sans utiliser sum().',
    brief: '<p>Le programme reçoit un entier n. Affichez la somme 1 + 2 + … + n en utilisant une boucle, sans <code>sum()</code>.</p>',
    starter: `n = int(input())

# À compléter : accumuler les entiers de 1 à n.
`,
    hints: [
      'La borne de fin d’un range n’est jamais atteinte : pour aller jusqu’à n, il faut lui demander n + 1.',
      'Un accumulateur s’initialise avant la boucle : s’il est initialisé dedans, il repart de zéro à chaque tour.'
    ],
    examples: [
      { stdin: '10', expected: '55', note: '1 + 2 + … + 10 = 55.' }
    ],
    tests: [
      { label: 'Cas limite', stdin: '1', expected: '1' },
      { label: 'Cas nul', stdin: '0', expected: '0' },
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
    id: 'py-c2-e2',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'Décision d’admission',
    goal: 'Enchaîner des conditions dans le bon ordre à l’intérieur d’une boucle.',
    brief: '<p>Le programme reçoit un entier n, puis n notes entières. Pour chaque note, affichez sur une ligne :</p><ul><li><code>Admis</code> si elle vaut au moins 10 ;</li><li><code>Rattrapage</code> si elle est comprise entre 8 et 9 inclus ;</li><li><code>Ajourné</code> sinon.</li></ul>',
    starter: `n = int(input())

for i in range(n):
    note = int(input())
    # À compléter : choisir le bon message.
`,
    hints: [
      'L’ordre des conditions change le résultat : commencez toujours par tester le cas le plus exigeant.',
      'Un enchaînement de conditions s’écrit en cascade : la première branche satisfaite prend la main et les suivantes sont ignorées.'
    ],
    examples: [
      { stdin: '3\n12\n9\n5', expected: 'Admis\nRattrapage\nAjourné', note: '12 est admis, 9 passe en rattrapage, 5 est ajourné.' }
    ],
    tests: [
      { label: 'Note limite', stdin: '1\n10', expected: 'Admis' },
      { label: 'Deux notes proches', stdin: '2\n8\n7', expected: 'Rattrapage\nAjourné' },
      { label: 'Quatre notes', stdin: '4\n20\n11\n9\n0', expected: 'Admis\nAdmis\nRattrapage\nAjourné' }
    ],
    solution: `n = int(input())

for i in range(n):
    note = int(input())
    if note >= 10:
        print("Admis")
    elif note >= 8:
        print("Rattrapage")
    else:
        print("Ajourné")
`
  },
  {
    id: 'py-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'Somme des chiffres d’un nombre',
    goal: 'Décomposer un entier chiffre par chiffre et accumuler le résultat.',
    brief: '<p>Le programme reçoit un entier positif. Affichez la somme de ses chiffres.</p>',
    starter: `nombre = int(input())

# À compléter : additionner les chiffres du nombre.
`,
    hints: [
      'Un nombre peut se parcourir caractère par caractère une fois converti en texte : chaque morceau redevient un entier pour le calcul.',
      'Autre voie sans conversion : le reste de la division par 10 isole le dernier chiffre, et la division entière par 10 le supprime.'
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
  // Module 3 — Fonctions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'py-c3-e1',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'calcul_statistiques — sujet d’examen',
    goal: 'Écrire une fonction qui renvoie plusieurs valeurs et la consommer depuis le programme principal.',
    brief: '<p>Écrivez <code>calcul_statistiques(liste_notes)</code> qui renvoie un couple <code>(moyenne, max_note)</code> en parcourant la liste une seule fois, sans utiliser <code>sum()</code> ni <code>max()</code>.</p><p>Le programme lit un entier n, puis n notes, et affiche la moyenne avec deux décimales suivie du maximum, séparés par un espace.</p>',
    starter: `def calcul_statistiques(liste_notes):
    # Version de départ volontairement fausse : elle doit renvoyer
    # le couple (moyenne, max_note). Remplacez les valeurs ci-dessous.
    return 0, 0


n = int(input())
notes = []
for i in range(n):
    notes.append(int(input()))

moyenne, maximum = calcul_statistiques(notes)
print(f"{moyenne:.2f} {maximum}")
`,
    hints: [
      'Une fonction ne renvoie qu’une seule chose : pour en faire passer deux, il faut les grouper dans un couple, en les séparant par une virgule.',
      'Le maximum se cherche en mémorisant un candidat, puis en le remplaçant dès qu’un élément le dépasse : le premier élément de la liste est un bon point de départ.'
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
    id: 'py-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Division qui ne plante pas',
    goal: 'Empêcher une exception de faire planter le programme.',
    brief: '<p>Écrivez <code>diviser(a, b)</code> qui renvoie le résultat de <code>a / b</code>, ou la chaîne <code>erreur</code> si b vaut 0. Aucune exception ne doit remonter : le programme doit se terminer normalement dans tous les cas.</p>',
    starter: `def diviser(a, b):
    # À compléter : gérer proprement le cas où b vaut zéro.
    return a / b


a = int(input())
b = int(input())
print(diviser(a, b))
`,
    hints: [
      'Une division par zéro n’est pas une valeur : l’interpréteur interrompt le programme. Il faut donc empêcher l’opération d’être tentée.',
      'Deux stratégies existent : vérifier avant de calculer, ou tenter le calcul et rattraper l’erreur. Dans les deux cas, la valeur renvoyée doit être la même.'
    ],
    examples: [
      { stdin: '10\n2', expected: '5.0', note: 'Division normale : 5.0.' }
    ],
    tests: [
      { label: 'Division décimale', stdin: '1\n4', expected: '0.25' },
      { label: 'Diviseur nul', stdin: '7\n0', expected: 'erreur' },
      { label: 'Numérateur nul', stdin: '0\n5', expected: '0.0' }
    ],
    solution: `def diviser(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "erreur"


a = int(input())
b = int(input())
print(diviser(a, b))
`
  },
  {
    id: 'py-c3-e3',
    chapter: 3,
    level: 'n4',
    language: 'python',
    title: 'est_premier — sujet d’examen',
    goal: 'Écrire une fonction booléenne avec sortie anticipée.',
    brief: '<p>Écrivez <code>est_premier(n)</code> qui renvoie <code>True</code> ou <code>False</code>. Le programme lit un entier et affiche <code>oui</code> ou <code>non</code>.</p>',
    starter: `def est_premier(n):
    # À compléter : renvoyer True si n est premier, False sinon.
    pass


n = int(input())
print("oui" if est_premier(n) else "non")
`,
    hints: [
      '1 n’est pas premier : c’est le premier cas particulier à traiter avant même de chercher un diviseur.',
      'Un nombre premier n’a aucun diviseur autre que 1 et lui-même : dès qu’un diviseur est trouvé, la réponse est fixée et le parcours peut s’arrêter là.'
    ],
    examples: [
      { stdin: '17', expected: 'oui', note: '17 n’a aucun diviseur autre que 1 et lui-même.' }
    ],
    tests: [
      { label: 'Un, cas particulier', stdin: '1', expected: 'non' },
      { label: 'Plus petit premier', stdin: '2', expected: 'oui' },
      { label: 'Grand premier', stdin: '97', expected: 'oui' },
      { label: 'Nombre composé', stdin: '100', expected: 'non' }
    ],
    solution: `def est_premier(n):
    if n < 2:
        return False
    for diviseur in range(2, n):
        if n % diviseur == 0:
            return False
    return True


n = int(input())
print("oui" if est_premier(n) else "non")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Structures de données
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'py-c4-e1',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Liste, tri et tuple',
    goal: 'Construire une collection par filtrage, la trier et la convertir.',
    brief: '<p>Le programme reçoit un entier n. Construisez la liste des nombres pairs de 1 à n inclus, triez-la, convertissez-la en tuple, puis affichez sa longueur sur une première ligne et le tuple sur la seconde.</p>',
    starter: `n = int(input())

# À compléter : construire la liste des pairs, la trier, la convertir en tuple.
`,
    hints: [
      'La parité se teste avec le reste de la division par 2 : un reste nul signifie que le nombre est pair.',
      'Une liste et un tuple s’affichent presque pareil, mais les crochets deviennent des parenthèses. Un tuple vide s’affiche avec deux parenthèses collées.'
    ],
    examples: [
      { stdin: '20', expected: '10\n(2, 4, 6, 8, 10, 12, 14, 16, 18, 20)', note: 'Dix nombres pairs, du plus petit au plus grand.' }
    ],
    tests: [
      { label: 'Borne basse', stdin: '1', expected: '0\n()' },
      { label: 'Petit intervalle', stdin: '7', expected: '3\n(2, 4, 6)' },
      { label: 'Intermédiaire', stdin: '10', expected: '5\n(2, 4, 6, 8, 10)' }
    ],
    solution: `n = int(input())

pairs = []
for valeur in range(1, n + 1):
    if valeur % 2 == 0:
        pairs.append(valeur)

resultat = tuple(sorted(pairs))
print(len(resultat))
print(resultat)
`
  },
  {
    id: 'py-c4-e2',
    chapter: 4,
    level: 'n4',
    language: 'python',
    title: 'Moyennes d’une promotion — sujet d’examen',
    goal: 'Parcourir des structures imbriquées et présenter un résultat formaté.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes de la forme <code>nom note1 note2 note3</code>. Affichez, dans l’ordre reçu, le nom suivi de la moyenne des trois notes avec deux décimales.</p>',
    starter: `n = int(input())

# À compléter : lire chaque ligne, puis afficher nom et moyenne.
`,
    hints: [
      'Une ligne se découpe sur les espaces : le premier morceau est le nom, les suivants sont les notes.',
      'Un morceau de texte reste du texte : pour calculer une moyenne, chaque note doit d’abord redevenir un nombre entier.'
    ],
    examples: [
      { stdin: '2\nJean 12 15 14\nMarie 18 17 19', expected: 'Jean 13.67\nMarie 18.00', note: 'Deux lignes lues, deux lignes affichées, dans le même ordre.' }
    ],
    tests: [
      { label: 'Un seul étudiant', stdin: '1\nPaul 10 10 10', expected: 'Paul 10.00' },
      { label: 'Trois étudiants', stdin: '3\nA 20 20 20\nB 0 0 1\nC 9 9 8', expected: 'A 20.00\nB 0.33\nC 8.67' },
      { label: 'Notes hétérogènes', stdin: '2\nZoé 5 20 13\nAli 14 7 12', expected: 'Zoé 12.67\nAli 11.00' }
    ],
    solution: `n = int(input())

for i in range(n):
    morceaux = input().split()
    nom = morceaux[0]
    total = 0
    for valeur in morceaux[1:]:
        total += int(valeur)
    moyenne = total / len(morceaux[1:])
    print(nom, f"{moyenne:.2f}")
`
  },
  {
    id: 'py-c4-e3',
    chapter: 4,
    level: 'n4',
    language: 'python',
    title: 'Fréquence des mots',
    goal: 'Compter des occurrences avec un dictionnaire.',
    brief: '<p>Le programme reçoit une ligne de texte. Affichez chaque mot en minuscules suivi de son nombre d’occurrences, un mot par ligne, dans l’ordre de leur première apparition.</p>',
    starter: `texte = input()

# À compléter : compter les occurrences de chaque mot.
`,
    hints: [
      'Un dictionnaire ne connaît que deux opérations utiles ici : lire la valeur associée à un mot, et l’incrémenter.',
      'Une lecture de clé absente interrompt le programme : il faut une lecture qui accepte une valeur de repli quand le mot est vu pour la première fois.'
    ],
    examples: [
      { stdin: 'le chat le chien le rat', expected: 'le 3\nchat 1\nchien 1\nrat 1', note: 'Le premier mot apparaît trois fois.' }
    ],
    tests: [
      { label: 'Un seul mot répété', stdin: 'python python', expected: 'python 2' },
      { label: 'Trois mots distincts', stdin: 'un deux trois', expected: 'un 1\ndeux 1\ntrois 1' },
      { label: 'Alternance', stdin: 'a b a b a', expected: 'a 3\nb 2' }
    ],
    solution: `texte = input()

frequences = {}
for mot in texte.lower().split():
    frequences[mot] = frequences.get(mot, 0) + 1

for mot in frequences:
    print(mot, frequences[mot])
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Fichiers
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'py-c5-e1',
    chapter: 5,
    level: 'n4',
    language: 'python',
    title: 'Écrire puis relire un fichier',
    goal: 'Créer un fichier, y écrire des données, puis les relire et les exploiter.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes de la forme <code>nom note</code>. Écrivez ces lignes dans un fichier <code>notes.txt</code>, puis relisez le fichier et affichez le nombre de lignes écrites, puis la moyenne des notes avec deux décimales.</p>',
    starter: `n = int(input())

lignes = []
for i in range(n):
    lignes.append(input())

# À compléter : écrire les lignes dans notes.txt, puis les relire et calculer.
`,
    hints: [
      'Le mode d’ouverture décide de tout : l’un repart d’un fichier vide, l’autre exige que le fichier existe déjà.',
      'Chaque ligne relue se termine par un saut de ligne : il faut le retirer avant d’exploiter le contenu.'
    ],
    examples: [
      { stdin: '2\nJean 15\nMarie 18', expected: '2\n16.50', note: 'Deux lignes écrites, moyenne 16.50.' }
    ],
    tests: [
      { label: 'Une seule ligne', stdin: '1\nPaul 12', expected: '1\n12.00' },
      { label: 'Trois lignes', stdin: '3\nA 1\nB 2\nC 3', expected: '3\n2.00' },
      { label: 'Notes identiques', stdin: '2\nX 9\nY 9', expected: '2\n9.00' }
    ],
    solution: `n = int(input())

lignes = []
for i in range(n):
    lignes.append(input())

with open("notes.txt", "w", encoding="utf-8") as fichier:
    for ligne in lignes:
        fichier.write(ligne + "\\n")

total = 0
compte = 0
with open("notes.txt", "r", encoding="utf-8") as fichier:
    for ligne in fichier:
        ligne = ligne.strip()
        if not ligne:
            continue
        compte += 1
        total += int(ligne.split()[1])

print(compte)
print(f"{total / compte:.2f}")
`
  },
  {
    id: 'py-c5-e2',
    chapter: 5,
    level: 'n4',
    language: 'python',
    title: 'Ajouter sans effacer',
    goal: 'Distinguer écriture et ajout dans un fichier.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes : écrivez-les dans <code>journal.txt</code>. Il reçoit ensuite un entier m, puis m lignes qu’il ajoute au fichier sans effacer les précédentes. Enfin, affichez le nombre total de lignes du fichier, puis sa dernière ligne.</p>',
    starter: `n = int(input())
premieres = []
for i in range(n):
    premieres.append(input())

# À compléter : écrire, puis ajouter, puis relire.
`,
    hints: [
      'Deux modes d’ouverture en écriture existent : l’un repart de zéro, l’autre se place à la fin du fichier.',
      'Une ligne vide en fin de fichier ne compte pas : une relecture naïve additionnerait un élément fantôme.'
    ],
    examples: [
      { stdin: '1\npremier\n1\nsecond', expected: '2\nsecond', note: 'Deux lignes au total, la dernière est « second ».' }
    ],
    tests: [
      { label: 'Deux puis une', stdin: '2\na\nb\n1\nc', expected: '3\nc' },
      { label: 'Une puis deux', stdin: '1\nx\n2\ny\nz', expected: '3\nz' },
      { label: 'Aucun ajout', stdin: '1\nseul\n0', expected: '1\nseul' }
    ],
    solution: `n = int(input())
premieres = []
for i in range(n):
    premieres.append(input())

with open("journal.txt", "w", encoding="utf-8") as fichier:
    for ligne in premieres:
        fichier.write(ligne + "\\n")

m = int(input())
suivantes = []
for i in range(m):
    suivantes.append(input())

with open("journal.txt", "a", encoding="utf-8") as fichier:
    for ligne in suivantes:
        fichier.write(ligne + "\\n")

lignes = []
with open("journal.txt", "r", encoding="utf-8") as fichier:
    for ligne in fichier:
        ligne = ligne.strip()
        if ligne:
            lignes.append(ligne)

print(len(lignes))
print(lignes[-1])
`
  },
  {
    id: 'py-c5-e3',
    chapter: 5,
    level: 'n5',
    language: 'python',
    title: 'Sauvegarde au format JSON',
    goal: 'Sérialiser une structure en JSON, puis la reconstruire.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes <code>nom note</code>. Construisez un dictionnaire, écrivez-le au format JSON dans <code>notes.json</code>, relisez le fichier, puis affichez le nombre d’entrées et la note maximale.</p>',
    starter: `import json

n = int(input())

# À compléter : construire, sauvegarder, relire.
`,
    hints: [
      'Un dictionnaire complet se sauvegarde et se recharge en une seule opération : cherchez les deux fonctions du module json qui font exactement cela.',
      'Après relecture, on retrouve un dictionnaire ordinaire : les valeurs se consultent comme avant.'
    ],
    examples: [
      { stdin: '2\nJean 15\nMarie 18', expected: '2\n18', note: 'Deux entrées relues, la meilleure note est 18.' }
    ],
    tests: [
      { label: 'Une entrée', stdin: '1\nPaul 12', expected: '1\n12' },
      { label: 'Trois entrées', stdin: '3\nA 1\nB 20\nC 3', expected: '3\n20' },
      { label: 'Notes proches', stdin: '2\nP 11\nQ 12', expected: '2\n12' }
    ],
    solution: `import json

n = int(input())

notes = {}
for i in range(n):
    morceaux = input().split()
    notes[morceaux[0]] = int(morceaux[1])

with open("notes.json", "w", encoding="utf-8") as fichier:
    json.dump(notes, fichier)

with open("notes.json", "r", encoding="utf-8") as fichier:
    relues = json.load(fichier)

print(len(relues))
print(max(relues.values()))
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Débogage et bonnes pratiques
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'py-c6-e1',
    chapter: 6,
    level: 'n4',
    language: 'python',
    title: 'Réparer une erreur d’indice',
    goal: 'Lire un message d’erreur, localiser la faute et la corriger.',
    brief: '<p>Le programme ci-dessous se termine anormalement. Trouvez la cause, corrigez-la, puis affichez la première et la dernière note de la liste, séparées par un tiret et des espaces.</p>',
    starter: `n = int(input())
notes = []
for i in range(n):
    notes.append(int(input()))

# Ce programme se termine anormalement : trouvez pourquoi, puis corrigez.
print(notes[0], "-", notes[len(notes)])
`,
    hints: [
      'Un indice valide commence à zéro : il suffit de vérifier ce que renvoie len pour une liste de n éléments, et quel est le dernier indice atteignable.',
      'Python accepte aussi des indices négatifs : ils comptent à partir de la fin.'
    ],
    examples: [
      { stdin: '5\n12\n15\n14\n9\n18', expected: '12 - 18', note: 'La première note est 12, la dernière 18.' }
    ],
    tests: [
      { label: 'Liste d’un élément', stdin: '1\n7', expected: '7 - 7' },
      { label: 'Trois éléments', stdin: '3\n5\n6\n7', expected: '5 - 7' },
      { label: 'Éléments identiques', stdin: '2\n0\n0', expected: '0 - 0' }
    ],
    solution: `n = int(input())
notes = []
for i in range(n):
    notes.append(int(input()))

print(notes[0], "-", notes[len(notes) - 1])
`
  },
  {
    id: 'py-c6-e2',
    chapter: 6,
    level: 'n4',
    language: 'python',
    title: 'Entrées robustes',
    goal: 'Traiter des données invalides sans interrompre le programme.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes. Chaque ligne contient soit un entier, soit autre chose. Affichez la somme des lignes qui sont bien des entiers, puis le nombre de lignes écartées.</p>',
    starter: `n = int(input())

# À compléter : additionner ce qui est numérique, compter le reste.
`,
    hints: [
      'Tout ce qui n’est pas un entier littéral fait échouer la conversion : cela concerne aussi les nombres à virgule.',
      'Il faut deux compteurs distincts : ce qui entre dans la somme et ce qui est écarté.'
    ],
    examples: [
      { stdin: '4\n10\nabc\n5\n3.5', expected: '15\n2', note: '10 et 5 sont valides ; abc et 3.5 sont écartés.' }
    ],
    tests: [
      { label: 'Données toutes valides', stdin: '1\n7', expected: '7\n0' },
      { label: 'Données toutes invalides', stdin: '3\nx\ny\nz', expected: '0\n3' },
      { label: 'Mélange', stdin: '5\n1\n2\n1.5\n3\nok', expected: '6\n2' }
    ],
    solution: `n = int(input())

total = 0
ecartees = 0
for i in range(n):
    valeur = input()
    try:
        total += int(valeur)
    except ValueError:
        ecartees += 1

print(total)
print(ecartees)
`
  },
  {
    id: 'py-c6-e3',
    chapter: 6,
    level: 'n5',
    language: 'python',
    title: 'Valider un argument',
    goal: 'Refuser une entrée invalide et rattraper le refus dans le programme principal.',
    brief: '<p>Écrivez <code>racine(n)</code> qui renvoie la racine carrée de n et signale par une exception de type <code>ValueError</code> un nombre négatif. Le programme lit un entier : si la valeur est refusée, il affiche <code>erreur</code>, sinon la racine avec deux décimales.</p>',
    starter: `import math


def racine(n):
    # À compléter : refuser un nombre négatif.
    return math.sqrt(n)


valeur = int(input())
# À compléter : afficher le résultat ou le message d'erreur.
`,
    hints: [
      'Signaler une entrée inacceptable et la rattraper relèvent de deux instructions différentes : l’une déclenche l’alarme, l’autre l’intercepte.',
      'La racine carrée d’un nombre négatif n’existe pas dans les réels : le module de calcul refuse de la produire.'
    ],
    examples: [
      { stdin: '9', expected: '3.00', note: 'La racine carrée de 9 vaut 3.00.' }
    ],
    tests: [
      { label: 'Carré parfait', stdin: '16', expected: '4.00' },
      { label: 'Nombre négatif', stdin: '-4', expected: 'erreur' },
      { label: 'Zéro', stdin: '0', expected: '0.00' }
    ],
    solution: `import math


def racine(n):
    if n < 0:
        raise ValueError("nombre négatif")
    return math.sqrt(n)


valeur = int(input())
try:
    print(f"{racine(valeur):.2f}")
except ValueError:
    print("erreur")
`
  }
];
