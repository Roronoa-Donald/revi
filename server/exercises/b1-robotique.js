/**
 * Exercices de code — Club de Robotique (B1), 3 par module, en Python.
 *
 * Le support du club couvre trois terrains de jeu : la programmation
 * (C/C++/MicroPython), les circuits logiques (CircuitVerse) et le prototypage
 * Arduino (Tinkercad). La salle de classe n'a ni carte ni capteur : chaque fiche
 * en **simule** un morceau en Python (liste blanche OANOR) — la boucle qui
 * clignote, la table de vérité d'une porte, le régulateur qui lit des relevés.
 * La logique s'écrit une fois et se réutilise sur la vraie carte.
 *
 * Idiome commun, montré dans chaque code de départ :
 *   n = int(input())
 *   valeurs = [int(input()) for _ in range(n)]
 *
 * Même contrat que les autres catalogues : `brief`, `starter`, `examples`
 * (visibles), `tests` (cachés), `hints` (en mots), `solution` (serveur seul).
 */

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Programmer une carte : les fondations
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'rb-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Carte d’identité du programme',
    goal: 'Afficher une séquence d’instructions exacte, ligne après ligne, sans en oublier une.',
    brief: '<p>Le programme lit le <strong>nom du membre</strong> (une ligne), puis affiche exactement ' +
      'trois lignes : le message de bienvenue du club, la ligne de l’opérateur, et la phrase de clôture ' +
      'du journal de séance.</p>',
    starter: `nom = input()

# À compléter : afficher les trois lignes du journal.
`,
    hints: [
      'Un programme s’exécute ligne par ligne, dans l’ordre : trois print donnent trois lignes.',
      'Pour mélanger du texte et une variable, la f-string f"...{nom}..." évite les conversions.'
    ],
    examples: [
      { stdin: 'Alice', expected: 'Bonjour, Club Robotique !\nOperateur : Alice\nMa prochaine seance sera encore meilleure.', note: 'Les trois lignes, dans cet ordre exact.' }
    ],
    tests: [
      { label: 'Autre membre', stdin: 'Zack', expected: 'Bonjour, Club Robotique !\nOperateur : Zack\nMa prochaine seance sera encore meilleure.' },
      { label: 'Nom composé', stdin: 'Linus T', expected: 'Bonjour, Club Robotique !\nOperateur : Linus T\nMa prochaine seance sera encore meilleure.' },
      { label: 'Une lettre', stdin: 'A', expected: 'Bonjour, Club Robotique !\nOperateur : A\nMa prochaine seance sera encore meilleure.' }
    ],
    solution: `nom = input()

print("Bonjour, Club Robotique !")
print(f"Operateur : {nom}")
print("Ma prochaine seance sera encore meilleure.")
`
  },
  {
    id: 'rb-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'python',
    title: 'Calculatrice de bord',
    goal: 'Lire deux entiers, calculer somme, différence, produit, quotient et reste, et traiter la division par zéro.',
    brief: '<p>La carte reçoit deux entiers <strong>A</strong> et <strong>B</strong> sur la même ligne, ' +
      'séparés par un espace. Affichez cinq lignes : la somme, la différence (A − B), le produit, le ' +
      'quotient entier et le reste. Si <strong>B vaut 0</strong>, remplacez les deux dernières lignes ' +
      'par une seule : <code>division impossible</code>.</p>',
    starter: `a, b = (int(x) for x in input().split())

# À compléter : afficher les cinq lignes, ou « division impossible ».
`,
    hints: [
      'Le quotient entier s’obtient avec // et le reste avec % : ils répondent tous les deux à la division par zéro.',
      'Un seul if suffit : si b vaut 0, on affiche le message et rien d’autre.'
    ],
    examples: [
      { stdin: '10 5', expected: 'somme : 15\ndifference : 5\nproduit : 50\nquotient : 2\nreste : 0', note: 'Division entière : 10 // 5 = 2 et 10 % 5 = 0.' }
    ],
    tests: [
      { label: 'Reste non nul', stdin: '7 3', expected: 'somme : 10\ndifference : 4\nproduit : 21\nquotient : 2\nreste : 1' },
      { label: 'Division par zéro', stdin: '9 0', expected: 'somme : 9\ndifference : 9\nproduit : 0\ndivision impossible' },
      { label: 'Valeurs négatives', stdin: '-6 4', expected: 'somme : -2\ndifference : -10\nproduit : -24\nquotient : -2\nreste : 2' }
    ],
    solution: `a, b = (int(x) for x in input().split())

print(f"somme : {a + b}")
print(f"difference : {a - b}")
print(f"produit : {a * b}")
if b == 0:
    print("division impossible")
else:
    print(f"quotient : {a // b}")
    print(f"reste : {a % b}")
`
  },
  {
    id: 'rb-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'python',
    title: 'Journal de séance',
    goal: 'Mettre en forme un rapport aligné à partir de quatre données lues séparément.',
    brief: '<p>Le programme lit <strong>quatre lignes</strong> : le nom du membre, le numéro de séance, ' +
      'le thème du jour, la durée en minutes. Il affiche un cartouche de quatre lignes où chaque libellé ' +
      '(<code>Membre</code>, <code>Seance</code>, <code>Theme</code>, <code>Duree</code>) est complété par ' +
      'des espaces jusqu’à 12 caractères, suivi de <code>: valeur</code>. La durée est suivie de ' +
      '<code>min</code>.</p>',
    starter: `membre = input()
seance = int(input())
theme = input()
duree = int(input())

# À compléter : afficher le cartouche aligné.
`,
    hints: [
      'Les f-strings savent aligner : f"{"Membre":<12}" complète « Membre » avec des espaces jusqu’à 12 caractères.',
      'Le numéro de séance et la durée ont été convertis en entiers : il faut les réafficher tels quels.'
    ],
    examples: [
      { stdin: 'Alice\n7\nCapteurs\n90', expected: 'Membre      : Alice\nSeance      : 7\nTheme       : Capteurs\nDuree       : 90 min', note: 'Chaque libellé occupe exactement 12 caractères avant les deux-points.' }
    ],
    tests: [
      { label: 'Thème long', stdin: 'Zack\n3\nTri a bulles\n120', expected: 'Membre      : Zack\nSeance      : 3\nTheme       : Tri a bulles\nDuree       : 120 min' },
      { label: 'Séance double chiffre', stdin: 'Awa\n12\nCesar\n60', expected: 'Membre      : Awa\nSeance      : 12\nTheme       : Cesar\nDuree       : 60 min' },
      { label: 'Thème court', stdin: 'Tom\n1\nLED\n45', expected: 'Membre      : Tom\nSeance      : 1\nTheme       : LED\nDuree       : 45 min' }
    ],
    solution: `membre = input()
seance = int(input())
theme = input()
duree = int(input())

print(f"{'Membre':<12}: {membre}")
print(f"{'Seance':<12}: {seance}")
print(f"{'Theme':<12}: {theme}")
print(f"{'Duree':<12}: {duree} min")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Boucles et temporisations
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'rb-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'python',
    title: 'LED clignotante simulée',
    goal: 'Répéter une paire d’instructions k fois avec une boucle for, puis afficher l’état final.',
    brief: '<p>La carte clignote : allumée puis éteinte, c’est <strong>un clignotement</strong>. Le ' +
      'programme lit le nombre de clignotements <strong>k</strong> et affiche, pour chacun, la ligne ' +
      '<code>LED ON</code> puis la ligne <code>LED OFF</code> (la simulation remplace la pause d’une ' +
      'seconde : ce qui compte est la répétition). À la fin, affichez <code>Fin.</code>.</p>',
    starter: `k = int(input())

# À compléter : répéter k fois la paire ON / OFF, puis afficher Fin.
`,
    hints: [
      'range(k) produit les entiers de 0 à k − 1 : la boucle s’exécute exactement k fois.',
      'Le message final sort de la boucle : il doit être aligné au même niveau que le for, pas dedans.'
    ],
    examples: [
      { stdin: '2', expected: 'LED ON\nLED OFF\nLED ON\nLED OFF\nFin.', note: 'Deux clignotements, puis la fin.' }
    ],
    tests: [
      { label: 'Quatre clignotements', stdin: '4', expected: 'LED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nFin.' },
      { label: 'Six clignotements', stdin: '6', expected: 'LED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nFin.' },
      { label: 'Aucun clignotement', stdin: '0', expected: 'Fin.' }
    ],
    solution: `k = int(input())

for _ in range(k):
    print("LED ON")
    print("LED OFF")
print("Fin.")
`
  },
  {
    id: 'rb-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Clignotement dirigé',
    goal: 'Réagir à chaque valeur d’une série dans une boucle et tenir un compteur en parallel.',
    brief: '<p>Le programme lit <strong>n</strong>, puis <strong>n états</strong> (un par ligne, 0 ou 1). ' +
      'Pour chaque état il affiche <code>LED ON</code> (si 1) ou <code>LED OFF</code> (si 0). En dernier, ' +
      'il affiche le nombre d’allumages : <code>allumee : X</code>.</p>',
    starter: `n = int(input())
etats = [int(input()) for _ in range(n)]

# À compléter : afficher chaque état, puis le compteur d’allumages.
`,
    hints: [
      'Un compteur s’initialise à 0 avant la boucle et s’incrémente d’un cran seulement quand la LED s’allume.',
      'Un if / else dans la boucle décide de la ligne à afficher ; le compteur vit après le test.'
    ],
    examples: [
      { stdin: '4\n1\n0\n1\n1', expected: 'LED ON\nLED OFF\nLED ON\nLED ON\nallumee : 3', note: 'Trois allumages sur quatre états.' }
    ],
    tests: [
      { label: 'Aucun allumage', stdin: '3\n0\n0\n0', expected: 'LED OFF\nLED OFF\nLED OFF\nallumee : 0' },
      { label: 'Que des allumages', stdin: '5\n1\n1\n1\n1\n1', expected: 'LED ON\nLED ON\nLED ON\nLED ON\nLED ON\nallumee : 5' },
      { label: 'Alternance', stdin: '6\n1\n0\n1\n0\n1\n0', expected: 'LED ON\nLED OFF\nLED ON\nLED OFF\nLED ON\nLED OFF\nallumee : 3' }
    ],
    solution: `n = int(input())
etats = [int(input()) for _ in range(n)]

allumages = 0
for etat in etats:
    if etat == 1:
        print("LED ON")
        allumages += 1
    else:
        print("LED OFF")
print(f"allumee : {allumages}")
`
  },
  {
    id: 'rb-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Séquence de feux tricolores',
    goal: 'Répéter une séquence fixe de plusieurs étapes, avec minutages simulés et message final accordé.',
    brief: '<p>Le carrefour du robot : rouge 3 s, orange 1 s, verte 3 s, orange 1 s. Le programme lit le ' +
      'nombre de <strong>cycles c</strong> et, pour chaque cycle, affiche les quatre étapes sous la forme ' +
      '<code>rouge (3 s)</code>, <code>orange (1 s)</code>, <code>verte (3 s)</code>, ' +
      '<code>orange (1 s)</code>. Il termine par <code>termine apres X cycle(s)</code> — le mot prend un ' +
      '<strong>s</strong> seulement si c dépasse 1.</p>',
    starter: `c = int(input())

# À compléter : répéter la séquence de quatre étapes, puis le bilan.
`,
    hints: [
      'La séquence est identique à chaque cycle : une boucle externe contient les quatre print dans l’ordre.',
      'Pour l’accord du pluriel : "s" if c > 1 else "" dans une f-string fait le travail en une ligne.'
    ],
    examples: [
      { stdin: '1', expected: 'rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 1 cycle', note: 'Un cycle complet, sans pluriel.' }
    ],
    tests: [
      { label: 'Trois cycles', stdin: '3', expected: 'rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 3 cycles' },
      { label: 'Cinq cycles', stdin: '5', expected: 'rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 5 cycles' },
      { label: 'Sept cycles', stdin: '7', expected: 'rouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\nrouge (3 s)\norange (1 s)\nverte (3 s)\norange (1 s)\ntermine apres 7 cycles' }
    ],
    solution: `c = int(input())

for _ in range(c):
    print("rouge (3 s)")
    print("orange (1 s)")
    print("verte (3 s)")
    print("orange (1 s)")
print(f"termine apres {c} cycle{'s' if c > 1 else ''}")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Conditions et fonctions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'rb-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'python',
    title: 'Pairs et impairs',
    goal: 'Écrire une fonction de test, l’appliquer à une série et compter les deux cas.',
    brief: '<p>Le programme lit <strong>n</strong>, puis <strong>n entiers</strong>. Pour chacun il ' +
      'affiche <code>X pair</code> ou <code>X impair</code>. La dernière ligne donne les deux comptes : ' +
      '<code>pairs : P / impairs : I</code>. Le test s’écrit dans une fonction <code>est_pair(x)</code> ' +
      'qui renvoie un booléen.</p>',
    starter: `n = int(input())
valeurs = [int(input()) for _ in range(n)]

def est_pair(x):
    # À compléter : renvoyer True si x est pair.
    ...

# À compléter : afficher chaque verdict, puis les deux comptes.
`,
    hints: [
      'Le reste d’une division par 2 décide : x % 2 vaut 0 exactement quand x est pair.',
      'Deux compteurs, initialisés avant la boucle ; chaque if en incrémente un seul.'
    ],
    examples: [
      { stdin: '5\n7\n2\n8\n9\n4', expected: '7 impair\n2 pair\n8 pair\n9 impair\n4 pair\npairs : 3 / impairs : 2', note: 'Cinq verdicts, puis le bilan.' }
    ],
    tests: [
      { label: 'Majorité de pairs', stdin: '3\n10\n21\n12', expected: '10 pair\n21 impair\n12 pair\npairs : 2 / impairs : 1' },
      { label: 'Aucun pair', stdin: '2\n1\n3', expected: '1 impair\n3 impair\npairs : 0 / impairs : 2' },
      { label: 'Zéro et négatif', stdin: '3\n0\n-7\n-4', expected: '0 pair\n-7 impair\n-4 pair\npairs : 2 / impairs : 1' }
    ],
    solution: `n = int(input())
valeurs = [int(input()) for _ in range(n)]

def est_pair(x):
    return x % 2 == 0

pairs = 0
impairs = 0
for x in valeurs:
    if est_pair(x):
        print(f"{x} pair")
        pairs += 1
    else:
        print(f"{x} impair")
        impairs += 1
print(f"pairs : {pairs} / impairs : {impairs}")
`
  },
  {
    id: 'rb-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'python',
    title: 'Test de primalité',
    goal: 'Écrire une fonction qui renvoie un booléen après une recherche de diviseur, puis la rejouer sur une série.',
    brief: '<p>Le programme lit <strong>n</strong>, puis <strong>n entiers</strong>. Pour chacun il ' +
      'affiche <code>X : premier</code> ou <code>X : compose</code>. La décision se prend dans une ' +
      'fonction <code>est_premier(x)</code> : un nombre est premier s’il a exactement deux diviseurs ; ' +
      '<strong>0 et 1 sont composés</strong> ici. Le test des diviseurs s’arrête à la racine carrée de x.</p>',
    starter: `n = int(input())
valeurs = [int(input()) for _ in range(n)]

def est_premier(x):
    # À compléter : False pour 0 et 1, sinon essayer les diviseurs.
    ...

# À compléter : afficher le verdict pour chaque valeur.
`,
    hints: [
      'Traiter d’abord les cas x < 2, puis boucler d de 2 à int(x ** 0.5) inclus : si x % d vaut 0, ce n’est pas premier.',
      'La fonction ne doit rien afficher : elle renvoie True ou False, et c’est la boucle qui affiche.'
    ],
    examples: [
      { stdin: '4\n2\n9\n11\n15', expected: '2 : premier\n9 : compose\n11 : premier\n15 : compose', note: '9 = 3 × 3 et 15 = 3 × 5 : composés.' }
    ],
    tests: [
      { label: 'Un et grands premiers', stdin: '3\n1\n97\n25', expected: '1 : compose\n97 : premier\n25 : compose' },
      { label: 'Nombres pairs', stdin: '3\n0\n2\n49', expected: '0 : compose\n2 : premier\n49 : compose' },
      { label: 'Carrés parfaits', stdin: '3\n4\n36\n7', expected: '4 : compose\n36 : compose\n7 : premier' }
    ],
    solution: `n = int(input())
valeurs = [int(input()) for _ in range(n)]

def est_premier(x):
    if x < 2:
        return False
    d = 2
    while d * d <= x:
        if x % d == 0:
            return False
        d += 1
    return True

for x in valeurs:
    if est_premier(x):
        print(f"{x} : premier")
    else:
        print(f"{x} : compose")
`
  },
  {
    id: 'rb-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'python',
    title: 'Contrôle de seuil d’un capteur',
    goal: 'Comparer chaque relevé à un seuil fixé, décider d’une alerte et compter les alertes.',
    brief: '<p>Le capteur de distance renvoie des relevés. Le programme lit d’abord le <strong>seuil</strong> ' +
      's (une ligne), puis <strong>n</strong>, puis <strong>n distances</strong> entières. Pour chaque ' +
      'relevé d il affiche <code>d cm : ALERTE</code> si d est strictement inférieur au seuil, sinon ' +
      '<code>d cm : OK</code>. La dernière ligne compte les alertes : <code>alertes : A</code>.</p>',
    starter: `seuil = int(input())
n = int(input())
distances = [int(input()) for _ in range(n)]

# À compléter : comparer chaque relevé au seuil, puis compter.
`,
    hints: [
      'L’ordre des lectures est imposé : le seuil arrive avant le compteur de relevés.',
      '« Strictement inférieur » se traduit par < : une distance égale au seuil n’alerte pas.'
    ],
    examples: [
      { stdin: '30\n4\n12\n45\n8\n30', expected: '12 cm : ALERTE\n45 cm : OK\n8 cm : ALERTE\n30 cm : OK\nalertes : 2', note: '30 cm atteint le seuil : pas d’alerte.' }
    ],
    tests: [
      { label: 'Autour du seuil', stdin: '10\n3\n9\n10\n11', expected: '9 cm : ALERTE\n10 cm : OK\n11 cm : OK\nalertes : 1' },
      { label: 'Tout proche', stdin: '15\n2\n15\n14', expected: '15 cm : OK\n14 cm : ALERTE\nalertes : 1' },
      { label: 'Aucune alerte', stdin: '5\n2\n6\n100', expected: '6 cm : OK\n100 cm : OK\nalertes : 0' }
    ],
    solution: `seuil = int(input())
n = int(input())
distances = [int(input()) for _ in range(n)]

alertes = 0
for d in distances:
    if d < seuil:
        print(f"{d} cm : ALERTE")
        alertes += 1
    else:
        print(f"{d} cm : OK")
print(f"alertes : {alertes}")
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Tableaux et algorithmes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'rb-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Tri à bulles instrumenté',
    goal: 'Implémenter le tri à bulles à la main et compter les comparaisons effectuées.',
    brief: '<p>Le programme lit <strong>n</strong>, puis <strong>n entiers</strong>. Il les trie par ' +
      '<strong>tri à bulles</strong> écrit à la main (pas de <code>sort()</code>) et affiche trois lignes : ' +
      'la série initiale <code>avant : ...</code> (valeurs séparées par un espace), la série triée ' +
      '<code>apres : ...</code>, et le nombre de <strong>comparaisons</strong> effectuées par l’algorithme ' +
      '<code>comparaisons : C</code> — on compte chaque test entre deux voisins, même sans échange.</p>',
    starter: `n = int(input())
valeurs = [int(input()) for _ in range(n)]

# À compléter : trier à la main, compter les comparaisons, afficher.
`,
    hints: [
      'Le double parcours classique : pour i de 0 à n − 2, pour j de 0 à n − 2 − i, comparer valeurs[j] et valeurs[j + 1].',
      'Le compteur s’incrémente à chaque comparaison, avant même de savoir s’il y aura échange.'
    ],
    examples: [
      { stdin: '5\n64\n25\n12\n22\n11', expected: 'avant : 64 25 12 22 11\napres : 11 12 22 25 64\ncomparaisons : 10', note: 'Pour n = 5, le double parcours complet fait 4 + 3 + 2 + 1 = 10 comparaisons.' }
    ],
    tests: [
      { label: 'Quatre valeurs', stdin: '4\n9\n1\n8\n2', expected: 'avant : 9 1 8 2\napres : 1 2 8 9\ncomparaisons : 6' },
      { label: 'Déjà triée', stdin: '3\n1\n2\n3', expected: 'avant : 1 2 3\napres : 1 2 3\ncomparaisons : 3' },
      { label: 'Deux valeurs', stdin: '2\n3\n1', expected: 'avant : 3 1\napres : 1 3\ncomparaisons : 1' }
    ],
    solution: `n = int(input())
valeurs = [int(input()) for _ in range(n)]

avant = " ".join(str(x) for x in valeurs)

comparaisons = 0
for i in range(n - 1):
    for j in range(n - 1 - i):
        comparaisons += 1
        if valeurs[j] > valeurs[j + 1]:
            valeurs[j], valeurs[j + 1] = valeurs[j + 1], valeurs[j]

print("avant : " + avant)
print("apres : " + " ".join(str(x) for x in valeurs))
print(f"comparaisons : {comparaisons}")
`
  },
  {
    id: 'rb-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Registre des membres',
    goal: 'Construire une liste de dictionnaires, en extraire des extrêmes et une moyenne.',
    brief: '<p>Le programme lit <strong>n</strong>, puis <strong>n lignes</strong> au format ' +
      '<code>nom age</code> (le nom ne contient pas d’espace, l’âge est un entier). Il construit une liste ' +
      'de dictionnaires puis affiche trois lignes : le membre le plus jeune <code>le plus jeune : nom</code>, ' +
      'le plus âgé <code>le plus age : nom</code>, et la moyenne des âges à une décimale ' +
      '<code>moyenne : M.M</code>.</p>',
    starter: `n = int(input())
registre = []
for _ in range(n):
    parties = input().split()
    registre.append({"nom": parties[0], "age": int(parties[1])})

# À compléter : trouver les extrêmes et la moyenne.
`,
    hints: [
      'min() et max() acceptent un argument key= qui indique sur quoi comparer : key=lambda m: m["age"].',
      'La moyenne demande la somme des âges divisée par n, formatée avec :.1f.'
    ],
    examples: [
      { stdin: '4\nAlice 20\nZack 17\nAwa 22\nLinus 19', expected: 'le plus jeune : Zack\nle plus age : Awa\nmoyenne : 19.5', note: '17, 19, 20, 22 : moyenne 78/4 = 19,5.' }
    ],
    tests: [
      { label: 'Trois membres', stdin: '3\nBob 30\nEve 25\nMax 28', expected: 'le plus jeune : Eve\nle plus age : Bob\nmoyenne : 27.7' },
      { label: 'Deux membres', stdin: '2\nIya 15\nTom 16', expected: 'le plus jeune : Iya\nle plus age : Tom\nmoyenne : 15.5' },
      { label: 'Extrêmes au milieu', stdin: '5\nA 20\nB 12\nC 40\nD 18\nE 25', expected: 'le plus jeune : B\nle plus age : C\nmoyenne : 23.0' }
    ],
    solution: `n = int(input())
registre = []
for _ in range(n):
    parties = input().split()
    registre.append({"nom": parties[0], "age": int(parties[1])})

jeune = min(registre, key=lambda m: m["age"])
age_max = max(registre, key=lambda m: m["age"])
moyenne = sum(m["age"] for m in registre) / n

print(f"le plus jeune : {jeune['nom']}")
print(f"le plus age : {age_max['nom']}")
print(f"moyenne : {moyenne:.1f}")
`
  },
  {
    id: 'rb-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Recherche dichotomique',
    goal: 'Écrire la dichotomie à la main sur une série déjà triée, avec renvoi de −1 si absente.',
    brief: '<p>Le programme lit <strong>n</strong>, puis <strong>n entiers donnés dans l’ordre croissant</strong>, ' +
      'puis la valeur <strong>v</strong> cherchée. Il affiche l’<strong>indice</strong> (à partir de 0) de v ' +
      'dans la liste, trouvé par <strong>dichotomie</strong> écrite à la main — ou <code>-1</code> si la ' +
      'valeur n’y figure pas.</p>',
    starter: `n = int(input())
serie = [int(input()) for _ in range(n)]
v = int(input())

# À compléter : dichotomie sur la série triée.
`,
    hints: [
      'Deux bornes bas et haut encadrent la zone de recherche : tant que bas <= haut, comparer au milieu (bas + haut) // 2.',
      'Si la valeur du milieu est trop petite, la zone repart au milieu + 1 ; trop grande, elle finit au milieu − 1 ; égale, c’est gagné.'
    ],
    examples: [
      { stdin: '7\n2\n5\n8\n12\n16\n23\n42\n16', expected: '4', note: '16 est à l’indice 4 dans [2, 5, 8, 12, 16, 23, 42].' }
    ],
    tests: [
      { label: 'Milieu exact', stdin: '5\n1\n3\n5\n7\n9\n7', expected: '3' },
      { label: 'Valeur absente', stdin: '4\n10\n20\n30\n40\n25', expected: '-1' },
      { label: 'Bords de liste', stdin: '6\n3\n6\n9\n12\n15\n18\n3', expected: '0' }
    ],
    solution: `n = int(input())
serie = [int(input()) for _ in range(n)]
v = int(input())

bas, haut = 0, n - 1
resultat = -1
while bas <= haut:
    milieu = (bas + haut) // 2
    if serie[milieu] == v:
        resultat = milieu
        break
    if serie[milieu] < v:
        bas = milieu + 1
    else:
        haut = milieu - 1
print(resultat)
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Portes logiques et chiffrement
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'rb-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'python',
    title: 'Tables de vérité des cinq portes',
    goal: 'Calculer AND, OR, NAND, NOR et XOR sur un couple de bits, sans bibliothèque.',
    brief: '<p>Le programme lit <strong>deux bits</strong> a et b sur la même ligne (0 ou 1, séparés par un ' +
      'espace). Il affiche cinq lignes, une par porte : <code>AND : x</code>, <code>OR : x</code>, ' +
      '<code>NAND : x</code>, <code>NOR : x</code>, <code>XOR : x</code>. Les valeurs se calculent en ' +
      'Python pur : NAND = non(ET), NOR = non(OU), XOR vaut 1 exactement quand les bits diffèrent.</p>',
    starter: `a, b = (int(x) for x in input().split())

# À compléter : afficher la sortie des cinq portes.
`,
    hints: [
      'En Python, et se note and, ou se note or, et non() se note not. Le résultat s’affiche en 0/1 : int(...).',
      'XOR se réduit à a != b : vrai exactement quand les deux bits diffèrent.'
    ],
    examples: [
      { stdin: '1 0', expected: 'AND : 0\nOR : 1\nNAND : 1\nNOR : 0\nXOR : 1', note: 'Bits différents : ET = 0, OU = 1, XOR = 1.' }
    ],
    tests: [
      { label: 'Deux bits à 1', stdin: '1 1', expected: 'AND : 1\nOR : 1\nNAND : 0\nNOR : 0\nXOR : 0' },
      { label: 'Deux bits à 0', stdin: '0 0', expected: 'AND : 0\nOR : 0\nNAND : 1\nNOR : 1\nXOR : 0' },
      { label: 'Inverse du premier cas', stdin: '0 1', expected: 'AND : 0\nOR : 1\nNAND : 1\nNOR : 0\nXOR : 1' }
    ],
    solution: `a, b = (int(x) for x in input().split())

print(f"AND : {int(a and b)}")
print(f"OR : {int(a or b)}")
print(f"NAND : {int(not (a and b))}")
print(f"NOR : {int(not (a or b))}")
print(f"XOR : {int(a != b)}")
`
  },
  {
    id: 'rb-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'python',
    title: 'Additionneur complet',
    goal: 'Simuler un additionneur complet bit à bit à partir des formules S et Cout.',
    brief: '<p>Un additionneur complet reçoit trois bits : <strong>a</strong>, <strong>b</strong> et la ' +
      'retenue entrante <strong>cin</strong> (trois lignes). Il produit la somme ' +
      '<code>S = a XOR b XOR cin</code> et la retenue sortante ' +
      '<code>Cout = (a AND b) OR (cin AND (a XOR b))</code>. Le programme affiche deux lignes : ' +
      '<code>S : x</code> puis <code>Cout : x</code>.</p>',
    starter: `a = int(input())
b = int(input())
cin = int(input())

# À compléter : appliquer les deux formules.
`,
    hints: [
      'Calculez d’abord x = a ^ b (le XOR Python) : S vaut x ^ cin et Cout se réécrit (a & b) | (cin & x).',
      'Attention : ^ est le XOR en Python et & le ET bit à bit — sur des bits, c’est exactement nos portes.'
    ],
    examples: [
      { stdin: '1\n0\n1', expected: 'S : 0\nCout : 1', note: '1 + 0 + 1 = 10 en binaire : S = 0, retenue 1.' }
    ],
    tests: [
      { label: 'Tout à zéro', stdin: '0\n0\n0', expected: 'S : 0\nCout : 0' },
      { label: 'Retenue en cascade', stdin: '1\n1\n1', expected: 'S : 1\nCout : 1' },
      { label: 'Un seul bit actif', stdin: '0\n0\n1', expected: 'S : 1\nCout : 0' }
    ],
    solution: `a = int(input())
b = int(input())
cin = int(input())

x = a ^ b
somme = x ^ cin
cout = (a & b) | (cin & x)

print(f"S : {somme}")
print(f"Cout : {cout}")
`
  },
  {
    id: 'rb-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Chiffre de César',
    goal: 'Décaler chaque lettre d’un message de k positions, en préservant la casse et les caractères non alphabétiques.',
    brief: '<p>Le programme lit <strong>deux lignes</strong> : la clé <strong>k</strong> (entre 1 et 25), ' +
      'puis le <strong>message</strong>. Il affiche le message chiffré : chaque lettre est décalée de k ' +
      'positions dans l’alphabet, avec retour circulaire (modulo 26). Les majuscules restent majuscules, ' +
      'les minuscules restent minuscules ; chiffres, espaces et ponctuation ne bougent pas.</p>',
    starter: `k = int(input())
message = input()

# À compléter : décaler chaque lettre de k positions.
`,
    hints: [
      'Pour une minuscule c : ord(c) - ord("a") donne sa position 0-25 ; on ajoute k, on prend % 26, on revient avec chr(... + ord("a")).',
      'Traiter majuscules et minuscules séparément, et laisser intacts tous les autres caractères.'
    ],
    examples: [
      { stdin: '3\nHELLO', expected: 'KHOOR', note: 'H → K, E → H, L → O, O → R : le décalage de 3 de l’exemple du support.' }
    ],
    tests: [
      { label: 'Retour circulaire', stdin: '1\nxyz', expected: 'yza', note: 'z + 1 rebondit sur a.' },
      { label: 'Presque un tour', stdin: '25\nAB', expected: 'ZA', note: 'Décaler de 25 recule d’une lettre.' },
      { label: 'Message mixte', stdin: '5\nRobot-2026!', expected: 'Wtgty-2026!', note: 'Seules les lettres bougent ; chiffres et ponctuation restent.' }
    ],
    solution: `k = int(input())
message = input()

chiffre = ""
for c in message:
    if "a" <= c <= "z":
        chiffre += chr((ord(c) - ord("a") + k) % 26 + ord("a"))
    elif "A" <= c <= "Z":
        chiffre += chr((ord(c) - ord("A") + k) % 26 + ord("A"))
    else:
        chiffre += c
print(chiffre)
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Capteurs, seuils et boucle de contrôle
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'rb-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'python',
    title: 'Décodeur 7 segments',
    goal: 'Associer chaque chiffre à la liste de ses segments allumés, via une table de correspondance.',
    brief: '<p>Un afficheur 7 segments possède sept segments notés de <code>a</code> à <code>g</code>. Le ' +
      'programme lit <strong>un chiffre</strong> de 0 à 9 et affiche, sur une ligne, ses segments allumés ' +
      'dans l’ordre alphabétique, séparés par un espace. Construire la correspondance dans un ' +
      '<strong>dictionnaire</strong> : 0 → a b c d e f ; 1 → b c ; 2 → a b d e g ; 3 → a b c d g ; ' +
      '4 → b c f g ; 5 → a c d f g ; 6 → a c d e f g ; 7 → a b c ; 8 → tous ; 9 → a b c d f g.</p>',
    starter: `chiffre = int(input())

segments = {
    0: "a b c d e f",
    # À compléter : les chiffres 1 à 9.
}

# À compléter : afficher les segments du chiffre lu.
`,
    hints: [
      'Complétez le dictionnaire chiffre par chiffre, puis une seule ligne d’affichage suffit : print(segments[chiffre]).',
      'Le 8 allume tous les segments : c’est la seule entrée qui contient les sept lettres.'
    ],
    examples: [
      { stdin: '2', expected: 'a b d e g', note: 'Le 2 allume cinq segments : a, b, d, e et g.' }
    ],
    tests: [
      { label: 'Zéro', stdin: '0', expected: 'a b c d e f' },
      { label: 'Huit', stdin: '8', expected: 'a b c d e f g' },
      { label: 'Sept', stdin: '7', expected: 'a b c' }
    ],
    solution: `chiffre = int(input())

segments = {
    0: "a b c d e f",
    1: "b c",
    2: "a b d e g",
    3: "a b c d g",
    4: "b c f g",
    5: "a c d f g",
    6: "a c d e f g",
    7: "a b c",
    8: "a b c d e f g",
    9: "a b c d f g"
}
print(segments[chiffre])
`
  },
  {
    id: 'rb-c6-e2',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Station météo — états et alertes',
    goal: 'Classer chaque relevé de température par seuils stricts et compter les alertes.',
    brief: '<p>Le programme lit <strong>n</strong>, puis <strong>n températures</strong> (une par ligne, ' +
      'décimales possibles). Pour chaque relevé t il affiche <code>t C : ALERTE CHALEUR</code> si t est ' +
      '<strong>strictement supérieur</strong> à 30, <code>t C : ALERTE FROID</code> si t est ' +
      '<strong>strictement inférieur</strong> à 15, sinon <code>t C : normale</code>. La température se ' +
      'réaffiche sans zéros inutiles (30.0 s’écrit <code>30</code>). La dernière ligne compte toutes les ' +
      'alertes confondues : <code>alertes : A</code>.</p>',
    starter: `n = int(input())
temperatures = [float(input()) for _ in range(n)]

# À compléter : classer chaque relevé, puis compter les alertes.
`,
    hints: [
      'Deux if / else imbriqués ou une chaîne if / elif / else : trois états possibles, une seule ligne par relevé.',
      'Le format :g dans une f-string affiche le nombre sans zéros inutiles : f"{t:g} C : ...".'
    ],
    examples: [
      { stdin: '5\n31.5\n29.9\n14\n12.5\n30', expected: '31.5 C : ALERTE CHALEUR\n29.9 C : normale\n14 C : ALERTE FROID\n12.5 C : ALERTE FROID\n30 C : normale\nalertes : 3', note: '30 et 29.9 restent normaux : les seuils sont stricts.' }
    ],
    tests: [
      { label: 'Autour de 30', stdin: '3\n30\n30.1\n-2', expected: '30 C : normale\n30.1 C : ALERTE CHALEUR\n-2 C : ALERTE FROID\nalertes : 2' },
      { label: 'Autour de 15', stdin: '2\n15\n14.9', expected: '15 C : normale\n14.9 C : ALERTE FROID\nalertes : 1' },
      { label: 'Tout normal', stdin: '3\n20\n15\n30', expected: '20 C : normale\n15 C : normale\n30 C : normale\nalertes : 0' }
    ],
    solution: `n = int(input())
temperatures = [float(input()) for _ in range(n)]

alertes = 0
for t in temperatures:
    if t > 30:
        print(f"{t:g} C : ALERTE CHALEUR")
        alertes += 1
    elif t < 15:
        print(f"{t:g} C : ALERTE FROID")
        alertes += 1
    else:
        print(f"{t:g} C : normale")
print(f"alertes : {alertes}")
`
  },
  {
    id: 'rb-c6-e3',
    chapter: 6,
    level: 'n4',
    language: 'python',
    title: 'Régulateur de distance',
    goal: 'Décider d’un état par relevé avec trois seuils, puis agréger minimum et moyenne entière.',
    brief: '<p>Le robot roule : le programme lit <strong>n</strong>, puis <strong>n distances</strong> ' +
      'entières (une par ligne). Pour chaque relevé d il affiche <code>STOP</code> si d &lt; 10, ' +
      '<code>LENT</code> si 10 ≤ d &lt; 30, sinon <code>LIBRE</code>. Puis deux lignes de bilan : ' +
      '<code>minimum : m</code> (le plus petit relevé) et <code>moyenne : M</code> (moyenne <em>entière</em>, ' +
      'tronquée — division entière).</p>',
    starter: `n = int(input())
distances = [int(input()) for _ in range(n)]

# À compléter : état par relevé, puis minimum et moyenne entière.
`,
    hints: [
      'Le minimum se suit dans la boucle avec une variable initialisée à une valeur trop grande, ou s’obtient après coup avec min().',
      'La division entière // tronque la moyenne ; l’ordre STOP puis LENT puis LIBRE se teste dans cet ordre.'
    ],
    examples: [
      { stdin: '6\n4\n35\n12\n29\n47\n8', expected: 'STOP\nLIBRE\nLENT\nLENT\nLIBRE\nSTOP\nminimum : 4\nmoyenne : 22', note: 'Somme 135, moyenne 135/6 = 22,5 tronquée à 22.' }
    ],
    tests: [
      { label: 'Frontières 10 et 30', stdin: '3\n10\n30\n9', expected: 'LENT\nLIBRE\nSTOP\nminimum : 9\nmoyenne : 16' },
      { label: 'Nul et grand', stdin: '4\n0\n5\n100\n55', expected: 'STOP\nSTOP\nLIBRE\nLIBRE\nminimum : 0\nmoyenne : 40' },
      { label: 'Un seul relevé', stdin: '1\n29', expected: 'LENT\nminimum : 29\nmoyenne : 29' }
    ],
    solution: `n = int(input())
distances = [int(input()) for _ in range(n)]

for d in distances:
    if d < 10:
        print("STOP")
    elif d < 30:
        print("LENT")
    else:
        print("LIBRE")

print(f"minimum : {min(distances)}")
print(f"moyenne : {sum(distances) // n}")
`
  }
];
