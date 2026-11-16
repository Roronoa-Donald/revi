/**
 * Exercices de code — Algorithmique (B1), 3 par module, écrits en pseudo-code.
 *
 * Le cours enseigne la démarche algorithmique en pseudo-code (avec le Pascal
 * comme langage des sujets d'examen écrits) : les ateliers suivent enfin la
 * même notation. Chaque exercice s'exécute dans le navigateur via
 * l'interpréteur pédagogique (assets/js/engines/pseudo-code-engine.js) :
 * la correction notée côté serveur n'existe pas pour le pseudo-code
 * (politique d'exécution), l'élève confronte sa sortie au contrat affiché.
 *
 * Même contrat que les autres catalogues :
 *   - `brief`    : l'énoncé affiché à l'élève ;
 *   - `starter`  : le code de départ déposé dans Monaco (il comporte un défaut) ;
 *   - `examples` : un exemple VISIBLE (entrée, sortie attendue, commentaire) ;
 *   - `tests`    : les cas de vérification, CACHÉS (jamais envoyés au navigateur) ;
 *   - `hints`    : trois indices rédigés en mots, jamais en code ;
 *   - `solution` : le corrigé, réservé au serveur (contrôle d'intégrité).
 *
 * Les programmes lisent l'entrée standard (une valeur par ligne ou par ligne
 * de plusieurs valeurs séparées par des espaces) ; les sorties sont comparées
 * après normalisation des espaces de fin de ligne. Les valeurs des cas cachés
 * diffèrent de l'exemple visible : recopier l'exemple ne suffit pas.
 *
 * Dialecte : affectation <-, Si/Alors/Sinon/FinSi, Pour/De/A/Pas, TantQue,
 * Répéter/Jusqu'à, SortirDeBoucle, Tableau t[n], Fonction ... Retourner ...
 * FinFonction, Longueur, Formater, Abs, DIV, MOD, indices à partir de 0.
 */

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Introduction à l'algorithmique
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'algo',
    title: 'Le rectangle de la cantine',
    goal: 'Traduire un énoncé en séquence entrée → traitement → sortie.',
    brief: '<p>La cantine veut carreler une salle rectangulaire. Le programme reçoit la longueur puis la largeur (entiers, en mètres). Calculez l’aire et le périmètre : l’aire sur une première ligne, le périmètre sur la seconde.</p>',
    starter: `Début
  Lire longueur, largeur

  // À compléter : afficher l'aire puis le périmètre, chacun sur sa ligne.
Fin
`,
    hints: [
      'L’aire d’un rectangle est le produit de ses deux dimensions, le périmètre la somme des quatre côtés.',
      'Chaque information demandée occupe sa propre ligne : deux affichages, dans l’ordre de l’énoncé.',
      'Étapes : lire les deux dimensions ; aire = longueur × largeur ; périmètre = 2 × (longueur + largeur) ; afficher l’aire puis le périmètre, chacun sur sa ligne.'
    ],
    examples: [
      { stdin: '5\n3', expected: '15\n16', note: 'Aire 5 × 3 = 15 ; périmètre 2 × (5 + 3) = 16.' }
    ],
    tests: [
      { label: 'Carré', stdin: '4\n4', expected: '16\n16' },
      { label: 'Pièce allongée', stdin: '10\n2', expected: '20\n24' },
      { label: 'Une seule rangée', stdin: '1\n7', expected: '7\n16' }
    ],
    solution: `Début
  Lire longueur, largeur

  aire <- longueur * largeur
  perimetre <- 2 * (longueur + largeur)

  Afficher(aire)
  Afficher(perimetre)
Fin
`,
    takeaway: "Tout algorithme linéaire sépare la lecture des données (Entrée), les affectations de calcul (Traitement) et l écriture (Sortie)."
  },
  {
    id: 'algo-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'algo',
    title: 'Repas et commandes',
    goal: 'Calculer un total à partir de plusieurs entrées.',
    brief: '<p>Le programme reçoit trois lignes : le prix d’un repas (entier), puis la quantité commandée, puis la remise en pourcentage. Affichez le total à payer (entier), après application de la remise.</p>',
    starter: `Début
  Lire prix, quantite, remise

  // À compléter : calculer et afficher le total après remise.
Fin
`,
    hints: [
      'Calculez d’abord le total plein, puis retirez la part correspondant au pourcentage de remise.',
      'Pour rester en entiers, la part de remise s’obtient par une division entière du total multiplié par le pourcentage.',
      'Étapes : total plein = prix × quantité ; part de remise = division entière du total plein multiplié par le pourcentage, sur cent ; retrancher cette part ; afficher.'
    ],
    examples: [
      { stdin: '2500\n3\n10', expected: '6750', note: '3 repas à 2500 = 7500 ; remise 10 % = 750 ; total 6750.' }
    ],
    tests: [
      { label: 'Sans remise', stdin: '1000\n2\n0', expected: '2000' },
      { label: 'Une seule unité', stdin: '500\n1\n20', expected: '400' },
      { label: 'Remise élevée', stdin: '300\n5\n50', expected: '750' }
    ],
    solution: `Début
  Lire prix, quantite, remise

  total <- prix * quantite
  total <- total - (total * remise) DIV 100

  Afficher(total)
Fin
`,
    takeaway: "Multipliez d abord chaque quantité par son prix unitaire avant d additionner les sous-totaux pour rester lisible."
  },
  {
    id: 'algo-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'algo',
    title: 'Découper une durée',
    goal: 'Décomposer une valeur avec division entière et reste.',
    brief: '<p>Le programme reçoit un nombre entier de secondes. Affichez la durée découpée sous la forme <code>H h M min S s</code> (par exemple <code>1 h 2 min 3 s</code>).</p>',
    starter: `Début
  Lire duree

  // À compléter : calculer heures, minutes et secondes, puis afficher
  // le découpage au format demandé.
Fin
`,
    hints: [
      'Une heure vaut 3600 secondes, une minute en vaut 60 : commencez par extraire les heures entières.',
      'Le reste de la division par 3600 donne ce qui reste à découper en minutes ; même idée ensuite pour les secondes.',
      'Étapes : heures = division entière par 3600 ; reste ; minutes = division entière du reste par 60 ; secondes = reste final ; afficher les trois nombres séparés par les mots de l’énoncé.'
    ],
    examples: [
      { stdin: '3723', expected: '1 h 2 min 3 s', note: '3723 = 1 × 3600 + 2 × 60 + 3.' }
    ],
    tests: [
      { label: 'Moins d’une minute', stdin: '59', expected: '0 h 0 min 59 s' },
      { label: 'Pile une heure', stdin: '3600', expected: '1 h 0 min 0 s' },
      { label: 'Plusieurs heures', stdin: '7325', expected: '2 h 2 min 5 s' },
      { label: 'Borne pile une minute', stdin: '60', expected: '0 h 1 min 0 s' }
    ],
    solution: `Début
  Lire duree

  heures <- duree DIV 3600
  reste <- duree MOD 3600
  minutes <- reste DIV 60
  secondes <- reste MOD 60

  Afficher(heures, "h", minutes, "min", secondes, "s")
Fin
`,
    takeaway: "Division entière et reste modulo permettent de passer d une unité fine (secondes, centimes) à ses sous-multiples."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Variables, expressions, premiers calculs
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'algo',
    title: 'Permuter deux valeurs',
    goal: 'Échanger le contenu de deux variables.',
    brief: '<p>Le programme reçoit deux entiers, chacun sur une ligne. Échangez leurs valeurs : la première valeur lue doit être affichée en second et la seconde en premier, séparées par une espace.</p>',
    starter: `Début
  Lire a, b

  // À compléter : échanger les contenus de a et b, puis les afficher
  // sur une même ligne, séparés par une espace.
Fin
`,
    hints: [
      'Une affectation écrase l’ancien contenu : copier a dans b perdrait b.',
      'Une variable intermédiaire sert de boîte témoin : on y range une valeur avant de l’écraser.',
      'Étapes : temp reçoit a ; a reçoit b ; b reçoit temp ; afficher a puis b sur la même ligne, séparés par une espace.'
    ],
    examples: [
      { stdin: '3\n8', expected: '8 3', note: 'Les contenus sont échangés : 8 puis 3.' }
    ],
    tests: [
      { label: 'Valeurs égales', stdin: '5\n5', expected: '5 5' },
      { label: 'Négatif', stdin: '-2\n7', expected: '7 -2' },
      { label: 'Zéro', stdin: '0\n9', expected: '9 0' }
    ],
    solution: `Début
  Lire a, b

  temp <- a
  a <- b
  b <- temp

  Afficher(a, b)
Fin
`,
    takeaway: "Permuter deux variables sans perte exige une troisième variable temporaire tmp afin de ne pas écraser l une avant copie."
  },
  {
    id: 'algo-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'algo',
    title: 'Moyenne pondérée',
    goal: 'Calculer une moyenne pondérée sans perdre les décimales.',
    brief: '<p>Le programme reçoit une note de contrôle continu (sur 20, entier) et une note d’examen (sur 20, entier). La moyenne pondérée vaut 40 % du contrôle continu plus 60 % de l’examen. Affichez-la avec exactement deux décimales.</p>',
    starter: `Début
  Lire controle, examen

  // À compléter : calculer la moyenne pondérée et l'afficher
  // avec deux décimales (voir le prédéfini Formater).
Fin
`,
    hints: [
      'La moyenne pondérée combine les deux notes avec leurs poids respectifs, dont la somme vaut un.',
      'L’affichage avec deux décimales est une question de format, pas de calcul : un prédéfini de l’atelier transforme un nombre en chaîne avec le nombre de décimales voulu.',
      'Étapes : moyenne = 0,4 × contrôle + 0,6 × examen ; afficher Formater(moyenne, 2).'
    ],
    examples: [
      { stdin: '12\n15', expected: '13.80', note: '0,4 × 12 + 0,6 × 15 = 13,80.' }
    ],
    tests: [
      { label: 'Notes égales', stdin: '10\n10', expected: '10.00' },
      { label: 'Examen fort', stdin: '0\n20', expected: '12.00' },
      { label: 'Contrôle fort', stdin: '20\n0', expected: '8.00' }
    ],
    solution: `Début
  Lire controle, examen

  moyenne <- 0.4 * controle + 0.6 * examen
  Afficher(Formater(moyenne, 2))
Fin
`,
    takeaway: "Une moyenne pondérée divise la somme des (valeur × coefficient) par la somme exacte des coefficients, jamais par n."
  },
  {
    id: 'algo-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'algo',
    title: 'Somme des chiffres',
    goal: 'Décomposer un entier chiffre par chiffre.',
    brief: '<p>Le programme reçoit un entier positif. Affichez la somme de ses chiffres.</p>',
    starter: `Début
  Lire nombre

  // À compléter : extraire les chiffres un à un (division entière
  // et reste) et afficher leur somme.
Fin
`,
    hints: [
      'Le reste de la division par dix isole le chiffre des unités.',
      'La division entière par dix retire le chiffre des unités : répétez l’extraction jusqu’à épuisement du nombre.',
      'Étapes : tant que le nombre n’est pas nul, ajouter le reste sur dix à la somme, puis diviser le nombre par dix (division entière) ; afficher la somme.'
    ],
    examples: [
      { stdin: '4729', expected: '22', note: '4 + 7 + 2 + 9 = 22.' }
    ],
    tests: [
      { label: 'Zéro', stdin: '0', expected: '0' },
      { label: 'Chiffres identiques', stdin: '999', expected: '27' },
      { label: 'Nombre plus long', stdin: '123456', expected: '21' }
    ],
    solution: `Début
  Lire nombre

  somme <- 0
  TantQue nombre > 0 Faire
    somme <- somme + nombre MOD 10
    nombre <- nombre DIV 10
  FinTantQue

  Afficher(somme)
Fin
`,
    takeaway: "En pseudo-code, n mod 10 isole le chiffre des unités et n div 10 décale le nombre vers la droite."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Conditions et tests
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'algo',
    title: 'Admis, rattrapage, ajourné',
    goal: 'Écrire un test alternatif double et ordonner les conditions.',
    brief: '<p>Le programme reçoit une note entière. Affichez <code>Admis</code> si elle vaut au moins 10, <code>Rattrapage</code> si elle est comprise entre 8 et 9 inclus, sinon <code>Ajourné</code>.</p>',
    starter: `Début
  Lire note

  Si note >= 10 Alors
    Afficher("Admis")
  Sinon
    // À compléter : distinguer rattrapage (8 à 9) et ajourné.
  FinSi
Fin
`,
    hints: [
      'Traitez d’abord le cas le plus large (admis), puis subdivisez le cas restant.',
      'Dans la branche Sinon, la note est inférieure à dix : il suffit de la comparer à la borne basse du rattrapage.',
      'Étapes : Si note ≥ 10 alors Admis ; Sinon Si note ≥ 8 alors Rattrapage ; Sinon Ajourné ; refermer chaque condition.'
    ],
    examples: [
      { stdin: '12', expected: 'Admis', note: 'Douze vaut au moins dix : admis.' }
    ],
    tests: [
      { label: 'Seuil exact', stdin: '10', expected: 'Admis' },
      { label: 'Borne haute du rattrapage', stdin: '9', expected: 'Rattrapage' },
      { label: 'En dessous de tout', stdin: '3', expected: 'Ajourné' }
    ],
    solution: `Début
  Lire note

  Si note >= 10 Alors
    Afficher("Admis")
  Sinon
    Si note >= 8 Alors
      Afficher("Rattrapage")
    Sinon
      Afficher("Ajourné")
    FinSi
  FinSi
Fin
`,
    takeaway: "Tester les seuils dans l ordre décroissant (>= 12, >= 10, sinon ajourné) garantit l unicité de la décision."
  },
  {
    id: 'algo-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'algo',
    title: 'Le plus grand de trois',
    goal: 'Enchaîner des comparaisons pour désigner un maximum.',
    brief: '<p>Le programme reçoit trois entiers, chacun sur une ligne. Affichez le maximum et sa position (1, 2 ou 3) au format de l’exemple : <code>Max : 9 (position 2)</code>. En cas d’égalité, gardez la première position atteinte.</p>',
    starter: `Début
  Lire a, b, c

  // À compléter : trouver le maximum et la position de sa première
  // occurrence, puis afficher au format "Max : v (position p)".
Fin
`,
    hints: [
      'Comparez les valeurs deux à deux en gardant la meilleure : le premier candidat sert de référence.',
      'Un maximum provisoire et sa position se mettent à jour ensemble dès qu’une valeur lue fait mieux (strictement).',
      'Étapes : maximum = a, position = 1 ; si b dépasse strictement le maximum, les remplacer par b et 2 ; même test pour c ; afficher les résultats avec les mots exacts de l’énoncé.'
    ],
    examples: [
      { stdin: '4\n9\n2', expected: 'Max : 9 (position 2)', note: 'Neuf est le plus grand, lu en position 2.' }
    ],
    tests: [
      { label: 'Le premier gagne', stdin: '8\n3\n1', expected: 'Max : 8 (position 1)' },
      { label: 'Le dernier gagne', stdin: '1\n2\n9', expected: 'Max : 9 (position 3)' },
      { label: 'Égalité en tête', stdin: '7\n7\n2', expected: 'Max : 7 (position 1)' }
    ],
    solution: `Début
  Lire a, b, c

  maximum <- a
  position <- 1

  Si b > maximum Alors
    maximum <- b
    position <- 2
  FinSi

  Si c > maximum Alors
    maximum <- c
    position <- 3
  FinSi

  Afficher("Max : " & maximum & " (position " & position & ")")
Fin
`,
    takeaway: "Comparer le maximum courant successivement aux candidats généralise le max de 3 valeurs à n valeurs sans arbre de if."
  },
  {
    id: 'algo-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'algo',
    title: 'Année bissextile',
    goal: 'Combiner plusieurs conditions logiques.',
    brief: '<p>Le programme reçoit une année (entier). Affichez <code>bissextile</code> si elle est divisible par 4 mais pas par 100, ou si elle est divisible par 400 ; sinon affichez <code>ordinaire</code>.</p>',
    starter: `Début
  Lire annee

  // À compléter : tester la divisibilité (le reste nul) et combiner
  // les conditions avec ET et OU, puis afficher le verdict.
Fin
`,
    hints: [
      'Une année est divisible par un nombre quand le reste de la division par ce nombre est nul.',
      'La règle complète est une disjonction : le cas général (divisible par 4 et pas par 100) OU le cas exceptionnel des siècles (divisible par 400).',
      'Étapes : bissextile = (reste sur 4 nul ET reste sur 100 non nul) OU (reste sur 400 nul) ; Si bissextile Alors afficher bissextile, Sinon afficher ordinaire.'
    ],
    examples: [
      { stdin: '2024', expected: 'bissextile', note: '2024 est divisible par 4 et pas par 100.' }
    ],
    tests: [
      { label: 'Siècle non bissextile', stdin: '1900', expected: 'ordinaire' },
      { label: 'Exception du millénaire', stdin: '2000', expected: 'bissextile' },
      { label: 'Année commune', stdin: '2023', expected: 'ordinaire' },
      { label: 'Année bissextile ordinaire', stdin: '2028', expected: 'bissextile' }
    ],
    solution: `Début
  Lire annee

  bissextile <- (annee MOD 4 = 0 ET annee MOD 100 <> 0) OU (annee MOD 400 = 0)

  Si bissextile Alors
    Afficher("bissextile")
  Sinon
    Afficher("ordinaire")
  FinSi
Fin
`,
    takeaway: "Une année est bissextile si (a mod 4 = 0 ET a mod 100 != 0) OU (a mod 400 = 0) : attention à la priorité du ET sur OU."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Boucles Pour
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'algo',
    title: 'Table de multiplication',
    goal: 'Écrire une boucle compteur avec la bonne borne.',
    brief: '<p>Le programme reçoit un entier n. Affichez sa table de multiplication de 1 à 10, une ligne par produit, sous la forme <code>n x i = r</code>.</p>',
    starter: `Début
  Lire n

  // À compléter : afficher les dix produits, un par ligne,
  // au format "n x i = r".
Fin
`,
    hints: [
      'La boucle Pour parcourt les multiplicateurs de un à dix, bornes comprises.',
      'Chaque ligne affiche quatre éléments : le nombre, la lettre de l’énoncé, le multiplicateur, puis le produit après le signe égal.',
      'Étapes : Pour i De 1 A 10 Faire ; afficher n, "x", i, "=", n * i ; FinPour.'
    ],
    examples: [
      { stdin: '3', expected: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30', note: 'La table de trois, de 1 à 10.' }
    ],
    tests: [
      { label: 'Table de 2', stdin: '2', expected: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20' },
      { label: 'Table de 7', stdin: '7', expected: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70' },
      { label: 'Cas nul', stdin: '0', expected: '0 x 1 = 0\n0 x 2 = 0\n0 x 3 = 0\n0 x 4 = 0\n0 x 5 = 0\n0 x 6 = 0\n0 x 7 = 0\n0 x 8 = 0\n0 x 9 = 0\n0 x 10 = 0' }
    ],
    solution: `Début
  Lire n

  Pour i De 1 A 10 Faire
    Afficher(n, "x", i, "=", n * i)
  FinPour
Fin
`,
    takeaway: "La boucle Pour i de 1 à N borne clairement les itérations quand le nombre de répétitions est connu à l avance."
  },
  {
    id: 'algo-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'algo',
    title: 'Somme des entiers de 1 à n',
    goal: 'Accumuler un résultat dans une boucle Pour.',
    brief: '<p>Le programme reçoit un entier n. Affichez la somme 1 + 2 + … + n en utilisant une boucle, sans formule toute faite.</p>',
    starter: `Début
  Lire n

  // À compléter : accumuler la somme des entiers de 1 à n dans
  // une boucle, puis l'afficher.
Fin
`,
    hints: [
      'Un accumulateur part de zéro et reçoit une contribution à chaque tour de boucle.',
      'La boucle doit couvrir toutes les valeurs de un à n, bornes comprises, y compris pour les petits cas limites.',
      'Étapes : somme = 0 ; Pour i De 1 A n Faire somme = somme + i ; afficher somme.'
    ],
    examples: [
      { stdin: '10', expected: '55', note: '1 + 2 + … + 10 = 55.' }
    ],
    tests: [
      { label: 'Cas nul', stdin: '0', expected: '0' },
      { label: 'Un seul terme', stdin: '1', expected: '1' },
      { label: 'Grande valeur', stdin: '100', expected: '5050' }
    ],
    solution: `Début
  Lire n

  somme <- 0
  Pour i De 1 A n Faire
    somme <- somme + i
  FinPour

  Afficher(somme)
Fin
`,
    takeaway: "Toute boucle de sommation s initialise à 0 avant l entrée dans Pour afin de conserver un état sain si n = 0."
  },
  {
    id: 'algo-c4-e3',
    chapter: 4,
    level: 'n4',
    language: 'algo',
    title: 'Factorielle',
    goal: 'Accumuler un produit et respecter l’élément neutre.',
    brief: '<p>Le programme reçoit un entier n (0 ≤ n ≤ 18). Affichez sa factorielle : le produit 1 × 2 × … × n, avec la convention 1 pour n = 0. Une boucle est attendue.</p>',
    starter: `Début
  Lire n

  // À compléter : accumuler le produit 1 x 2 x ... x n dans une boucle
  // (attention au cas n = 0), puis l'afficher.
Fin
`,
    hints: [
      'Un accumulateur de produit démarre à un, pas à zéro : zéro absorberait tout.',
      'Avec une boucle de un à n, le cas zéro ne fait aucun tour : l’accumulateur garde sa valeur initiale, qui est justement la convention demandée.',
      'Étapes : produit = 1 ; Pour i De 1 A n Faire produit = produit × i ; afficher produit.'
    ],
    examples: [
      { stdin: '5', expected: '120', note: '1 × 2 × 3 × 4 × 5 = 120.' }
    ],
    tests: [
      { label: 'Cas zéro', stdin: '0', expected: '1' },
      { label: 'Un', stdin: '1', expected: '1' },
      { label: 'Six', stdin: '6', expected: '720' },
      { label: 'Borne maximale', stdin: '18', expected: '6402373705728000' }
    ],
    solution: `Début
  Lire n

  produit <- 1
  Pour i De 1 A n Faire
    produit <- produit * i
  FinPour

  Afficher(produit)
Fin
`,
    takeaway: "Un accumulateur multiplicatif (factorielle, puissance) s initialise impérativement à 1, jamais à 0."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Boucles TantQue
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c5-e1',
    chapter: 5,
    level: 'n3',
    language: 'algo',
    title: 'Somme jusqu’au seuil',
    goal: 'Écrire une boucle TantQue dont la condition dépend d’un accumulateur.',
    brief: '<p>Le programme reçoit un entier seuil. Ajoutez les entiers naturels successifs (1, 2, 3, …) tant que la somme est strictement inférieure au seuil, puis affichez la somme obtenue et le nombre de termes ajoutés, séparés par une espace.</p>',
    starter: `Début
  Lire seuil

  // À compléter : ajouter 1, 2, 3, ... tant que la somme reste
  // strictement inférieure au seuil ; afficher la somme finale et
  // le nombre de termes ajoutés.
Fin
`,
    hints: [
      'La condition de poursuite porte sur l’état courant de la somme, pas sur un compteur de tours.',
      'Suivez deux variables : la somme reconstituée et le dernier terme ajouté ; le nombre de termes se déduit du dernier terme.',
      'Étapes : somme = 0, terme = 0 ; TantQue somme < seuil Faire : terme = terme + 1, somme = somme + terme ; à la sortie, afficher somme et terme.'
    ],
    examples: [
      { stdin: '10', expected: '10 4', note: '1 + 2 + 3 + 4 = 10 : la somme atteint exactement le seuil et s’arrête.' }
    ],
    tests: [
      { label: 'Seuil nul', stdin: '0', expected: '0 0' },
      { label: 'Seuil un', stdin: '1', expected: '1 1' },
      { label: 'Dépassement', stdin: '12', expected: '15 5' }
    ],
    solution: `Début
  Lire seuil

  somme <- 0
  terme <- 0
  TantQue somme < seuil Faire
    terme <- terme + 1
    somme <- somme + terme
  FinTantQue

  Afficher(somme, terme)
Fin
`,
    takeaway: "Quand le critère d arrêt dépend d une condition dynamique (atteindre un seuil), la boucle TantQue s impose."
  },
  {
    id: 'algo-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'algo',
    title: 'Compter les chiffres',
    goal: 'Répéter une réduction jusqu’à la condition d’arrêt.',
    brief: '<p>Le programme reçoit un entier positif. Affichez son nombre de chiffres, obtenu par divisions entières successives (sans convertir en texte).</p>',
    starter: `Début
  Lire nombre

  // À compléter : compter les divisions entières par dix nécessaires
  // pour atteindre zéro.
Fin
`,
    hints: [
      'Chaque division entière par dix retire un chiffre : compter les divisions revient à compter les chiffres.',
      'Le cas particulier de zéro doit donner un chiffre : un compteur initialisé à un et une boucle qui s’exécute seulement au-delà de zéro le gèrent.',
      'Étapes : chiffres = 1 ; TantQue nombre >= 10 Faire : nombre = nombre DIV 10, chiffres = chiffres + 1 ; afficher chiffres.'
    ],
    examples: [
      { stdin: '4729', expected: '4', note: 'Quatre chiffres : 4729 → 472 → 47 → 4 → 0.' }
    ],
    tests: [
      { label: 'Zéro', stdin: '0', expected: '1' },
      { label: 'Un chiffre', stdin: '7', expected: '1' },
      { label: 'Six chiffres', stdin: '123456', expected: '6' }
    ],
    solution: `Début
  Lire nombre

  chiffres <- 1
  TantQue nombre >= 10 Faire
    nombre <- nombre DIV 10
    chiffres <- chiffres + 1
  FinTantQue

  Afficher(chiffres)
Fin
`,
    takeaway: "Le cas n = 0 comporte 1 chiffre : utilisez Répéter...Jusqu à (do-while) ou traitez 0 explicitement avant TantQue n > 0."
  },
  {
    id: 'algo-c5-e3',
    chapter: 5,
    level: 'n4',
    language: 'algo',
    title: 'Conjecture de Syracuse',
    goal: 'Écrire une boucle dont on ne connaît pas le nombre de tours à l’avance.',
    brief: '<p>Le programme reçoit un entier strictement positif. Appliquez la suite de Syracuse : tant que la valeur n’est pas 1, divisez-la par 2 si elle est paire, sinon remplacez-la par 3 × valeur + 1. Comptez et affichez le nombre d’étapes nécessaires.</p>',
    starter: `Début
  Lire valeur

  // À compléter : tant que la valeur n'est pas 1, appliquer la règle
  // (paire : diviser par 2 ; impaire : 3 x valeur + 1) et compter
  // les étapes.
Fin
`,
    hints: [
      'La parité se teste par le reste de la division par deux.',
      'La boucle continue tant que la valeur diffère de un : c’est la condition d’arrêt, pas une borne connue d’avance.',
      'Étapes : etapes = 0 ; TantQue valeur <> 1 Faire : Si reste nul Alors valeur = valeur / 2 Sinon valeur = 3 × valeur + 1 ; etapes = etapes + 1 ; afficher etapes.'
    ],
    examples: [
      { stdin: '6', expected: '8', note: '6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 : huit étapes.' }
    ],
    tests: [
      { label: 'Déjà un', stdin: '1', expected: '0' },
      { label: 'Deux', stdin: '2', expected: '1' },
      { label: 'Vingt-sept', stdin: '27', expected: '111' }
    ],
    solution: `Début
  Lire valeur

  etapes <- 0
  TantQue valeur <> 1 Faire
    Si valeur MOD 2 = 0 Alors
      valeur <- valeur / 2
    Sinon
      valeur <- 3 * valeur + 1
    FinSi
    etapes <- etapes + 1
  FinTantQue

  Afficher(etapes)
Fin
`,
    takeaway: "La suite de Syracuse illustre une boucle TantQue x != 1 dont on compte les étapes sans connaître n d avance."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Tableaux
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c6-e1',
    chapter: 6,
    level: 'n3',
    language: 'algo',
    title: 'Somme et maximum d’un tableau',
    goal: 'Parcourir un tableau une seule fois pour deux résultats.',
    brief: '<p>Le programme reçoit un entier n ≥ 1, puis n entiers : le tableau contient donc au moins une valeur. Affichez la somme sur une ligne, puis le maximum sur la suivante, en un seul parcours.</p>',
    starter: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour

  // À compléter : un seul parcours pour la somme ET le maximum
  // (le maximum part du premier élément, jamais de zéro).
Fin
`,
    hints: [
      'Deux accumulateurs évoluent dans la même boucle : un total qui s’enrichit et un record qui ne fait que monter.',
      'Le maximum initial est le premier élément du tableau : zéro serait faux dès que toutes les valeurs sont négatives.',
      'Étapes : somme = 0, maximum = t[0] ; Pour i De 0 A n-1 : somme = somme + t[i] ; Si t[i] > maximum Alors maximum = t[i] ; afficher somme puis maximum.'
    ],
    examples: [
      { stdin: '5\n12\n15\n14\n9\n18', expected: '68\n18', note: 'Somme 68, maximum 18 (dernier élément).' }
    ],
    tests: [
      { label: 'Trois éléments', stdin: '3\n1\n2\n3', expected: '6\n3' },
      { label: 'Un seul élément', stdin: '1\n7', expected: '7\n7' },
      { label: 'Tous négatifs', stdin: '4\n-1\n-2\n-3\n-4', expected: '-10\n-1' }
    ],
    solution: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour

  somme <- 0
  maximum <- t[0]
  Pour i De 0 A n - 1 Faire
    somme <- somme + t[i]
    Si t[i] > maximum Alors
      maximum <- t[i]
    FinSi
  FinPour

  Afficher(somme)
  Afficher(maximum)
Fin
`,
    takeaway: "Initialiser maxi = T[0] (et pas 0) assure le bon fonctionnement même sur un tableau composé uniquement d entiers négatifs."
  },
  {
    id: 'algo-c6-e2',
    chapter: 6,
    level: 'n3',
    language: 'algo',
    title: 'Recherche séquentielle',
    goal: 'Implémenter la recherche dans un tableau.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers, puis une valeur cible. Affichez la position de la première occurrence de la cible dans le tableau (positions numérotées à partir de 1), ou <code>absent</code> si elle n’y figure pas.</p>',
    starter: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour
  Lire cible

  // À compléter : parcourir le tableau, mémoriser la première
  // occurrence (position numérotée à partir de 1) et afficher
  // cette position ou "absent".
Fin
`,
    hints: [
      'La première occurrence gagne : dès qu’une case égale la cible, la réponse est connue.',
      'Une sortie anticipée de boucle existe dans le dialecte ; sinon, un drapeau trouvé et la position suffisent.',
      'Étapes : position = 0 ; Pour i De 0 A n-1 : Si t[i] = cible Alors position = i + 1 et SortirDeBoucle ; à la sortie, Si position = 0 Alors afficher absent Sinon afficher position.'
    ],
    examples: [
      { stdin: '5\n10\n20\n30\n20\n50\n20', expected: '2', note: 'La cible 20 apparaît d’abord en position 2.' }
    ],
    tests: [
      { label: 'Premier élément', stdin: '3\n7\n8\n9\n7', expected: '1' },
      { label: 'Absent', stdin: '4\n1\n2\n3\n4\n9', expected: 'absent' },
      { label: 'Dernier élément', stdin: '3\n5\n6\n7\n7', expected: '3' }
    ],
    solution: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour
  Lire cible

  position <- 0
  Pour i De 0 A n - 1 Faire
    Si t[i] = cible Alors
      position <- i + 1
      SortirDeBoucle
    FinSi
  FinPour

  Si position = 0 Alors
    Afficher("absent")
  Sinon
    Afficher(position)
  FinSi
Fin
`,
    takeaway: "La recherche séquentielle parcourt T en O(n) et s arrête dès la première occurrence trouvée ou retourne -1."
  },
  {
    id: 'algo-c6-e3',
    chapter: 6,
    level: 'n4',
    language: 'algo',
    title: 'Tri par sélection',
    goal: 'Implémenter un tri simple du cours, case par case.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Triez le tableau par sélection : cherchez le minimum de la partie non triée et échangez-le avec la première position libre, puis recommencez. Affichez les valeurs triées sur une ligne, séparées par des espaces.</p>',
    starter: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour

  // À compléter : tri par sélection (minimum de la partie non triée,
  // échange), puis affichage des valeurs sur une ligne séparées
  // par des espaces.
Fin
`,
    hints: [
      'À chaque tour, la partie déjà triée grandit d’une case : le minimum restant vient s’y installer par échange.',
      'L’échange de deux cases exige une case témoin, comme pour permuter deux variables.',
      'Étapes : Pour depart De 0 A n-2 : imin = depart ; Pour i De depart+1 A n-1 : Si t[i] < t[imin] Alors imin = i ; échanger t[depart] et t[imin] ; construire la ligne triée en parcourant le tableau.'
    ],
    examples: [
      { stdin: '5\n5\n2\n8\n1\n9', expected: '1 2 5 8 9', note: 'Cinq valeurs triées : 1 2 5 8 9.' }
    ],
    tests: [
      { label: 'Deux valeurs à échanger', stdin: '2\n5\n1', expected: '1 5' },
      { label: 'Déjà trié', stdin: '3\n1\n2\n3', expected: '1 2 3' },
      { label: 'Ordre inverse', stdin: '4\n4\n3\n2\n1', expected: '1 2 3 4' },
      { label: 'Doublons', stdin: '5\n3\n1\n3\n1\n2', expected: '1 1 2 3 3' }
    ],
    solution: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour

  Pour depart De 0 A n - 2 Faire
    imin <- depart
    Pour i De depart + 1 A n - 1 Faire
      Si t[i] < t[imin] Alors
        imin <- i
      FinSi
    FinPour
    temp <- t[depart]
    t[depart] <- t[imin]
    t[imin] <- temp
  FinPour

  ligne <- ""
  Pour i De 0 A n - 1 Faire
    Si i > 0 Alors
      ligne <- ligne & " "
    FinSi
    ligne <- ligne & t[i]
  FinPour
  Afficher(ligne)
Fin
`,
    takeaway: "Le tri par sélection cherche à chaque passe i l indice du minimum dans [i..n-1] puis réalise un seul échange avec T[i]."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 7 — Fonctions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c7-e1',
    chapter: 7,
    level: 'n3',
    language: 'algo',
    title: 'Une fonction qui renvoie une valeur',
    goal: 'Distinguer Retourner de Afficher dans une fonction.',
    brief: '<p>Complétez la fonction <code>carre</code> pour qu’elle renvoie le carré de son argument (sans rien afficher). Le programme principal lit un entier, appelle la fonction et affiche le résultat sous la forme <code>Carre : &lt;valeur&gt;</code>.</p>',
    starter: `Fonction carre(x : Entier) : Entier
Début
  // À compléter : renvoyer le carré de x (ne pas afficher ici).
  Retourner 0
FinFonction

Début
  Lire n
  Afficher("Carre :", carre(n))
Fin
`,
    hints: [
      'Une fonction qui renvoie une valeur utilise l’instruction de retour ; l’affichage appartient au programme appelant.',
      'Le carré d’un nombre est son produit par lui-même.',
      'Étapes : dans la fonction, Retourner x × x ; le principal se contente d’afficher l’étiquette et le résultat de l’appel.'
    ],
    examples: [
      { stdin: '7', expected: 'Carre : 49', note: 'Le carré de sept vaut quarante-neuf.' }
    ],
    tests: [
      { label: 'Petit nombre', stdin: '5', expected: 'Carre : 25' },
      { label: 'Zéro', stdin: '0', expected: 'Carre : 0' },
      { label: 'Deux chiffres', stdin: '12', expected: 'Carre : 144' }
    ],
    solution: `Fonction carre(x : Entier) : Entier
Début
  Retourner x * x
FinFonction

Début
  Lire n
  Afficher("Carre :", carre(n))
Fin
`,
    takeaway: "Une fonction calcule et retourne un résultat exploitable ; une procédure (ou le programme appelant) se charge de l afficher."
  },
  {
    id: 'algo-c7-e2',
    chapter: 7,
    level: 'n4',
    language: 'algo',
    title: 'calcul_statistiques — sujet d’examen',
    goal: 'Faire renvoyer deux résultats par une même fonction.',
    brief: '<p>Écrivez <code>calcul_statistiques(notes)</code>, une fonction qui reçoit un tableau de notes et <strong>renvoie deux résultats</strong> : la moyenne (division réelle) et le maximum, calculés en un seul parcours. Le programme principal lit un entier n ≥ 1, puis n notes, et affiche la moyenne avec deux décimales suivie du maximum, séparés par une espace. L’atelier ne renvoie qu’une valeur par Retourner : choisissez comment combiner les deux résultats (par exemple mémoriser le maximum dans une variable globale).</p>',
    starter: `Variables
  maximum : Entier
Fonction calcul_statistiques(notes) : Reel
Début
  // À compléter : parcourir le tableau une fois, calculer la moyenne
  // et mémoriser le maximum dans la variable globale, puis renvoyer
  // la moyenne.
  Retourner 0.0
FinFonction

Début
  Lire n
  Tableau notes[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire notes[i]
  FinPour

  moyenne <- calcul_statistiques(notes)
  Afficher(Formater(moyenne, 2), maximum)
Fin
`,
    hints: [
      'Un seul parcours met à jour trois choses : le total des notes, le record courant, et le nombre de notes déjà vues.',
      'Le record se mémorise dans la variable globale pendant que la fonction renvoie la moyenne : le principal affiche ensuite les deux résultats.',
      'Étapes : total = 0, maximum global = notes[0] ; parcourir : total = total + notes[i], Si notes[i] > maximum Alors maximum = notes[i] ; à la fin Retourner total / Longueur(notes).'
    ],
    examples: [
      { stdin: '5\n12\n15\n14\n9\n18', expected: '13.60 18', note: 'Moyenne 13.60 et maximum 18.' }
    ],
    tests: [
      { label: 'Un seul élément', stdin: '1\n10', expected: '10.00 10' },
      { label: 'Toutes les notes à zéro', stdin: '3\n0\n0\n0', expected: '0.00 0' },
      { label: 'Quatre notes', stdin: '4\n7\n20\n3\n11', expected: '10.25 20' }
    ],
    solution: `Variables
  maximum : Entier
Fonction calcul_statistiques(notes) : Reel
Début
  total <- 0
  maximum <- notes[0]
  Pour i De 0 A Longueur(notes) - 1 Faire
    total <- total + notes[i]
    Si notes[i] > maximum Alors
      maximum <- notes[i]
    FinSi
  FinPour
  Retourner total / Longueur(notes)
FinFonction

Début
  Lire n
  Tableau notes[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire notes[i]
  FinPour

  moyenne <- calcul_statistiques(notes)
  Afficher(Formater(moyenne, 2), maximum)
Fin
`,
    takeaway: "Regrouper plusieurs métriques dans une structure de retour permet de réutiliser le calcul sans dupliquer les boucles."
  },
  {
    id: 'algo-c7-e3',
    chapter: 7,
    level: 'n4',
    language: 'algo',
    title: 'Fonction booléenne et réutilisation',
    goal: 'Écrire une fonction de test et l’appeler depuis une autre.',
    brief: '<p>Écrivez <code>est_premier(n)</code> qui renvoie VRAI ou FAUX, puis <code>compte_premiers(limite)</code> qui renvoie combien de nombres premiers existent entre 2 et limite inclus. Le programme lit la limite et affiche le compte.</p>',
    starter: `Fonction est_premier(n : Entier) : Booleen
Début
  // À compléter : tester la divisibilité de n par les candidats
  // de 2 à la racine carrée (ou jusqu'à n - 1).
  Retourner VRAI
FinFonction

Fonction compte_premiers(limite : Entier) : Entier
Début
  // À compléter : compter les appels à est_premier concluants
  // entre 2 et limite inclus.
  Retourner 0
FinFonction

Début
  Lire limite
  Afficher(compte_premiers(limite))
Fin
`,
    hints: [
      'Un nombre premier n’admet aucun diviseur autre que un et lui-même : testez les candidats diviseurs à partir de deux.',
      'La fonction de comptage réutilise la fonction de test pour chaque valeur de l’intervalle : c’est la composition des fonctions.',
      'Étapes : est_premier : Si n < 2 Alors FAUX ; Pour d De 2 A n-1 : Si n MOD d = 0 Alors Retourner FAUX ; Retourner VRAI. compte_premiers : compteur = 0 ; Pour v De 2 A limite : Si est_premier(v) Alors compteur + 1 ; Retourner compteur.'
    ],
    examples: [
      { stdin: '10', expected: '4', note: '2, 3, 5 et 7 sont premiers : quatre nombres.' }
    ],
    tests: [
      { label: 'Limite un', stdin: '1', expected: '0' },
      { label: 'Limite deux', stdin: '2', expected: '1' },
      { label: 'Limite cinquante', stdin: '50', expected: '15' }
    ],
    solution: `Fonction est_premier(n : Entier) : Booleen
Début
  Si n < 2 Alors
    Retourner FAUX
  FinSi
  Pour d De 2 A n - 1 Faire
    Si n MOD d = 0 Alors
      Retourner FAUX
    FinSi
  FinPour
  Retourner VRAI
FinFonction

Fonction compte_premiers(limite : Entier) : Entier
Début
  compteur <- 0
  Pour v De 2 A limite Faire
    Si est_premier(v) Alors
      compteur <- compteur + 1
    FinSi
  FinPour
  Retourner compteur
FinFonction

Début
  Lire limite
  Afficher(compte_premiers(limite))
Fin
`,
    takeaway: "Une fonction booléenne (prédicat) isole une règle métier réutilisable dans plusieurs conditions ou boucles d appel."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 8 — Matrices et chaînes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c8-e1',
    chapter: 8,
    level: 'n3',
    language: 'algo',
    title: 'Somme d’une matrice',
    goal: 'Parcourir un tableau à deux dimensions.',
    brief: '<p>Le programme reçoit un entier l (lignes), un entier c (colonnes), puis l × c entiers rangés ligne par ligne (chaque ligne contient c valeurs séparées par des espaces). Affichez la somme de tous les éléments de la matrice.</p>',
    starter: `Début
  Lire l, c
  Tableau m[l][c] : Entiers
  Pour i De 0 A l - 1 Faire
    Pour j De 0 A c - 1 Faire
      Lire m[i][j]
    FinPour
  FinPour

  // À compléter : additionner tous les éléments de la matrice
  // et afficher la somme.
Fin
`,
    hints: [
      'Le parcours naturel imbrique deux boucles : une par ligne, une par colonne.',
      'Un accumulateur unique suffit : chaque case visitée ajoute sa contribution.',
      'Étapes : somme = 0 ; Pour i De 0 A l-1 : Pour j De 0 A c-1 : somme = somme + m[i][j] ; afficher somme.'
    ],
    examples: [
      { stdin: '2\n3\n1 2 3\n4 5 6', expected: '21', note: '1 + 2 + 3 + 4 + 5 + 6 = 21.' }
    ],
    tests: [
      { label: 'Une ligne', stdin: '1\n4\n5 10 15 20', expected: '50' },
      { label: 'Négatifs', stdin: '2\n2\n-1 1\n2 -2', expected: '0' },
      { label: 'Matrice trois par trois', stdin: '3\n3\n1 1 1\n1 1 1\n1 1 1', expected: '9' }
    ],
    solution: `Début
  Lire l, c
  Tableau m[l][c] : Entiers
  Pour i De 0 A l - 1 Faire
    Pour j De 0 A c - 1 Faire
      Lire m[i][j]
    FinPour
  FinPour

  somme <- 0
  Pour i De 0 A l - 1 Faire
    Pour j De 0 A c - 1 Faire
      somme <- somme + m[i][j]
    FinPour
  FinPour

  Afficher(somme)
Fin
`,
    takeaway: "Une matrice à M lignes et N colonnes se parcourt par deux boucles imbriquées : i sur les lignes puis j sur les colonnes."
  },
  {
    id: 'algo-c8-e2',
    chapter: 8,
    level: 'n4',
    language: 'algo',
    title: 'Diagonale d’une matrice carrée',
    goal: 'Exploiter la relation entre indices de ligne et de colonne.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes de n entiers. Affichez la somme de la diagonale principale (éléments où numéro de ligne et numéro de colonne sont égaux), puis celle de l’anti-diagonale, chacune sur sa ligne.</p>',
    starter: `Début
  Lire n
  Tableau m[n][n] : Entiers
  Pour i De 0 A n - 1 Faire
    Pour j De 0 A n - 1 Faire
      Lire m[i][j]
    FinPour
  FinPour

  // À compléter : somme de la diagonale principale (m[i][i]) et de
  // l'anti-diagonale (colonne qui diminue quand la ligne augmente).
Fin
`,
    hints: [
      'Sur la diagonale principale, ligne et colonne portent le même indice : une seule boucle suffit.',
      'Sur l’anti-diagonale, la colonne vaut l’indice complémentaire : dernière colonne pour la première ligne, et ainsi de suite.',
      'Étapes : diag = 0 et anti = 0 ; Pour i De 0 A n-1 : diag = diag + m[i][i] ; anti = anti + m[i][n - 1 - i] ; afficher diag puis anti.'
    ],
    examples: [
      { stdin: '3\n1 2 3\n4 5 6\n7 8 9', expected: '15\n15', note: 'Diagonale 1 + 5 + 9 ; anti-diagonale 3 + 5 + 7.' }
    ],
    tests: [
      { label: 'Une seule cellule', stdin: '1\n4', expected: '4\n4' },
      { label: 'Deux par deux', stdin: '2\n1 2\n3 4', expected: '5\n5' },
      { label: 'Diagonales différentes', stdin: '2\n9 1\n1 9', expected: '18\n2' }
    ],
    solution: `Début
  Lire n
  Tableau m[n][n] : Entiers
  Pour i De 0 A n - 1 Faire
    Pour j De 0 A n - 1 Faire
      Lire m[i][j]
    FinPour
  FinPour

  diag <- 0
  anti <- 0
  Pour i De 0 A n - 1 Faire
    diag <- diag + m[i][i]
    anti <- anti + m[i][n - 1 - i]
  FinPour

  Afficher(diag)
  Afficher(anti)
Fin
`,
    takeaway: "Sur une matrice carrée d ordre n, la diagonale principale vérifie i = j et l antidiagonale vérifie i + j = n - 1."
  },
  {
    id: 'algo-c8-e3',
    chapter: 8,
    level: 'n4',
    language: 'algo',
    title: 'Inverser une chaîne sans découpage automatique',
    goal: 'Traiter une chaîne comme une collection indexée.',
    brief: '<p>Le programme reçoit un mot (sans espace). Affichez-le à l’envers en le reconstruisant caractère par caractère : partez d’une chaîne vide et ajoutez les caractères du dernier au premier (le prédéfini <code>Longueur</code> donne la taille, l’indexation démarre à zéro).</p>',
    starter: `Début
  Lire mot

  // À compléter : reconstruire le mot à l'envers (du dernier caractère
  // au premier) par concaténation, puis l'afficher.
Fin
`,
    hints: [
      'Une chaîne se lit case par case comme un tableau : chaque position porte un caractère.',
      'Reconstruire se fait en partant d’une chaîne vide et en concaténant les caractères dans l’ordre voulu.',
      'Étapes : inverse = "" ; Pour i De Longueur(mot) - 1 A 0 Pas -1 Faire : inverse = inverse & mot[i] ; afficher inverse.'
    ],
    examples: [
      { stdin: 'bonjour', expected: 'ruojnob', note: 'Le mot lu de droite à gauche.' }
    ],
    tests: [
      { label: 'Un seul caractère', stdin: 'a', expected: 'a' },
      { label: 'Palindrome', stdin: 'kayak', expected: 'kayak' },
      { label: 'Mot long', stdin: 'algorithmique', expected: 'euqimhtirogla' }
    ],
    solution: `Début
  Lire mot

  inverse <- ""
  Pour i De Longueur(mot) - 1 A 0 Pas -1 Faire
    inverse <- inverse & mot[i]
  FinPour

  Afficher(inverse)
Fin
`,
    takeaway: "Parcourir une chaîne par indices de longueur-1 à 0 construit l inverse en O(n) sans syntaxe cachée."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 9 — Tri, recherche dichotomique, récursivité
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c9-e1',
    chapter: 9,
    level: 'n4',
    language: 'algo',
    title: 'Tri à bulles',
    goal: 'Implémenter le tri à bulles avec arrêt anticipé.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Triez-les par la méthode des bulles : répétez des passages qui échangent les paires voisines mal ordonnées. Après chaque passage, réduisez d’une case la partie encore à comparer. Arrêtez dès qu’un passage n’échange rien ou que cette partie compte au plus une case. Affichez les valeurs triées sur une ligne, séparées par des espaces, suivies du nombre de passages effectués sur la ligne suivante.</p>',
    starter: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour

  // À compléter : tri à bulles avec arrêt anticipé (un passage sans
  // échange suffit), puis affichage des valeurs et du nombre de passages.
Fin
`,
    hints: [
      'Un passage compare chaque paire voisine de la partie non triée et échange quand l’ordre est mauvais.',
      'Deux conditions d’arrêt se combinent : soit un passage complet n’a fait aucun échange, soit la partie à comparer est réduite à une case.',
      'Étapes : passages = 0, a_trier = VRAI, limite = n ; TantQue a_trier ET limite > 1 Faire : a_trier = FAUX ; comparer et échanger les voisins jusqu’à limite - 2 ; limite = limite - 1 ; passages = passages + 1 ; afficher la ligne triée puis passages.'
    ],
    examples: [
      { stdin: '5\n5\n2\n8\n1\n9', expected: '1 2 5 8 9\n4', note: 'Quatre passages pour trier cinq valeurs.' }
    ],
    tests: [
      { label: 'Déjà trié, un passage', stdin: '4\n1\n2\n3\n4', expected: '1 2 3 4\n1' },
      { label: 'Ordre inverse', stdin: '4\n4\n3\n2\n1', expected: '1 2 3 4\n3' },
      { label: 'Trois éléments', stdin: '3\n2\n3\n1', expected: '1 2 3\n2' }
    ],
    solution: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour

  passages <- 0
  a_trier <- VRAI
  limite <- n
  TantQue a_trier ET limite > 1 Faire
    a_trier <- FAUX
    Pour i De 0 A limite - 2 Faire
      Si t[i] > t[i + 1] Alors
        temp <- t[i]
        t[i] <- t[i + 1]
        t[i + 1] <- temp
        a_trier <- VRAI
      FinSi
    FinPour
    limite <- limite - 1
    passages <- passages + 1
  FinTantQue

  ligne <- ""
  Pour i De 0 A n - 1 Faire
    Si i > 0 Alors
      ligne <- ligne & " "
    FinSi
    ligne <- ligne & t[i]
  FinPour
  Afficher(ligne)
  Afficher(passages)
Fin
`,
    takeaway: "Un drapeau boolean echange_effectue stoppe le tri à bulles dès qu une passe complète ne modifie aucun ordre."
  },
  {
    id: 'algo-c9-e2',
    chapter: 9,
    level: 'n4',
    language: 'algo',
    title: 'Recherche dichotomique',
    goal: 'Diviser l’espace de recherche à chaque étape.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers <strong>triés en ordre croissant</strong>, puis une valeur cible. Implémentez la recherche dichotomique (comparer la cible à l’élément médian et éliminer la moitié exclue) et affichez la position de la cible (positions numérotées à partir de 1), ou <code>absent</code>.</p>',
    starter: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour
  Lire cible

  // À compléter : recherche dichotomique avec bornes gauche et droite,
  // milieu recalculé à chaque tour ; afficher la position (à partir
  // de 1) ou "absent".
Fin
`,
    hints: [
      'Maintenez deux bornes délimitant la zone où la cible peut encore se trouver.',
      'Comparez la cible à l’élément du milieu : égale (trouvé), plus petite (chercher à gauche), plus grande (chercher à droite).',
      'Étapes : gauche = 0, droite = n - 1 ; TantQue gauche <= droite : milieu = (gauche + droite) DIV 2 ; Si t[milieu] = cible Alors afficher milieu + 1 et SortirDeBoucle ; Sinon Si t[milieu] < cible Alors gauche = milieu + 1 Sinon droite = milieu - 1 ; si la boucle finit sans succès, afficher absent.'
    ],
    examples: [
      { stdin: '5\n2\n5\n8\n12\n20\n12', expected: '4', note: 'Douze se trouve en position 4.' }
    ],
    tests: [
      { label: 'Premier élément', stdin: '4\n1\n3\n5\n7\n1', expected: '1' },
      { label: 'Absent (entre deux)', stdin: '4\n1\n3\n5\n7\n4', expected: 'absent' },
      { label: 'Dernier élément', stdin: '5\n2\n4\n6\n8\n10\n10', expected: '5' }
    ],
    solution: `Début
  Lire n
  Tableau t[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire t[i]
  FinPour
  Lire cible

  trouve <- FAUX
  gauche <- 0
  droite <- n - 1
  TantQue gauche <= droite Faire
    milieu <- (gauche + droite) DIV 2
    Si t[milieu] = cible Alors
      Afficher(milieu + 1)
      trouve <- VRAI
      SortirDeBoucle
    Sinon
      Si t[milieu] < cible Alors
        gauche <- milieu + 1
      Sinon
        droite <- milieu - 1
      FinSi
    FinSi
  FinTantQue

  Si NON trouve Alors
    Afficher("absent")
  FinSi
Fin
`,
    takeaway: "La dichotomie exige un tableau déjà trié et réduit la plage [gauche, droite] de moitié à chaque itération en O(log n)."
  },
  {
    id: 'algo-c9-e3',
    chapter: 9,
    level: 'n5',
    language: 'algo',
    title: 'Récursivité — puissance et PGCD',
    goal: 'Écrire deux fonctions récursives et les combiner.',
    brief: '<p>Écrivez deux fonctions récursives (aucune boucle dans leur corps) : <code>puissance(base, exposant)</code> renvoie base élevée à l’exposant, et <code>pgcd(a, b)</code> applique l’algorithme d’Euclide. Les quatre entrées sont des entiers garantis dans les bornes <code>|base| ≤ 10</code>, <code>0 ≤ exposant ≤ 15</code> et <code>|a|, |b| ≤ 1000000000000</code> : ces bornes assurent des résultats exacts et une profondeur de récursion modérée. Le PGCD est positif ou nul, y compris pour les entiers négatifs ; on adopte <code>puissance(0, 0) = 1</code> et <code>pgcd(0, 0) = 0</code>. Le programme lit base, exposant, puis a et b, et affiche les deux résultats sur deux lignes.</p>',
    starter: `Fonction puissance(base : Entier, exposant : Entier) : Entier
Début
  // À compléter : cas de base (exposant nul), puis appel récursif
  // avec un exposant réduit d'une unité.
  Retourner 0
FinFonction

Fonction pgcd(a : Entier, b : Entier) : Entier
Début
  // À compléter : algorithme d'Euclide (le reste remplace le diviseur) ;
  // le résultat est positif ou nul même pour des entrées négatives.
  Retourner 0
FinFonction

Début
  Lire base, exposant, a, b
  Afficher(puissance(base, exposant))
  Afficher(pgcd(a, b))
Fin
`,
    hints: [
      'Chaque fonction récursive écrit d’abord son cas de base : exposant nul pour la puissance, second opérande nul pour le PGCD.',
      'Le cas récursif réduit le problème vers le cas de base : l’exposant baisse de un ; pour le PGCD, le reste de la division remplace le diviseur.',
      'Étapes : puissance : Si exposant = 0 Alors Retourner 1 Sinon Retourner base × puissance(base, exposant - 1). pgcd : Si b = 0 Alors Retourner Abs(a) Sinon Retourner pgcd(b, a MOD b).'
    ],
    examples: [
      { stdin: '2\n10\n48\n36', expected: '1024\n12', note: '2 puissance 10 = 1024 ; PGCD de 48 et 36 = 12.' }
    ],
    tests: [
      { label: 'Exposant nul et PGCD égal', stdin: '5\n0\n7\n7', expected: '1\n7' },
      { label: 'Bornes maximales', stdin: '10\n15\n1000000000000\n-1000000000000', expected: '1000000000000000\n1000000000000' },
      { label: 'Base négative, entier négatif et zéro', stdin: '-2\n3\n-8\n0', expected: '-8\n8' },
      { label: 'Second entier négatif', stdin: '2\n3\n48\n-36', expected: '8\n12' },
      { label: 'Deux entiers négatifs', stdin: '2\n3\n-48\n-36', expected: '8\n12' },
      { label: 'Puissance zéro et deux zéros', stdin: '0\n0\n0\n0', expected: '1\n0' },
      { label: 'PGCD un', stdin: '3\n4\n999999999989\n2', expected: '81\n1' }
    ],
    solution: `Fonction puissance(base : Entier, exposant : Entier) : Entier
Début
  Si exposant = 0 Alors
    Retourner 1
  FinSi
  Retourner base * puissance(base, exposant - 1)
FinFonction

Fonction pgcd(a : Entier, b : Entier) : Entier
Début
  Si b = 0 Alors
    Retourner Abs(a)
  FinSi
  Retourner pgcd(b, a MOD b)
FinFonction

Début
  Lire base, exposant, a, b
  Afficher(puissance(base, exposant))
  Afficher(pgcd(a, b))
Fin
`,
    takeaway: "Toute fonction récursive doit définir un cas de base terminal et rapprocher ses arguments de ce cas à chaque appel."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 10 — Synthèse
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'algo-c10-e1',
    chapter: 10,
    level: 'n4',
    language: 'algo',
    title: 'Corriger l’algorithme de facturation',
    goal: 'Débusquer une erreur de logique dans un algorithme existant.',
    brief: '<p>Cet algorithme est censé calculer le montant d’une facture avec remise dégressive (5 % au-delà de 10 articles, 10 % au-delà de 50), mais il applique toujours la même remise. Corrigez la logique : jusqu’à 10 articles aucune remise, de 11 à 50 articles la remise de 5 %, au-delà de 50 la remise de 10 %. Le programme reçoit le prix unitaire (entier) et la quantité ; affichez le total à payer (entier, la part de remise est arrondie vers le bas par division entière).</p>',
    starter: `Début
  Lire prix, quantite

  // Version défectueuse : la remise ne dépend pas de la quantité.
  total <- prix * quantite
  total <- total - (total * 5) DIV 100

  Afficher(total)
Fin
`,
    hints: [
      'La remise est un palier : il faut d’abord déterminer dans quelle tranche tombe la quantité.',
      'Trois cas s’excluent mutuellement : aucune remise, remise intermédiaire, remise maximale ; le calcul du total est le même, seul le taux change.',
      'Étapes : total = prix × quantité ; Si quantite > 50 Alors taux = 10 Sinon Si quantite > 10 Alors taux = 5 Sinon taux = 0 ; total = total - (total × taux) DIV 100 ; afficher.'
    ],
    examples: [
      { stdin: '200\n60', expected: '10800', note: '12000 avec la remise de 10 % : 10800.' }
    ],
    tests: [
      { label: 'Exactement dix articles', stdin: '100\n10', expected: '1000' },
      { label: 'Onze articles', stdin: '100\n11', expected: '1045' },
      { label: 'Exactement cinquante articles', stdin: '100\n50', expected: '4750' },
      { label: 'Cinquante et un articles', stdin: '100\n51', expected: '4590' },
      { label: 'Petite quantité, pas de remise', stdin: '150\n5', expected: '750' },
      { label: 'Remise intermédiaire', stdin: '100\n20', expected: '1900' },
      { label: 'Grosse quantité', stdin: '50\n100', expected: '4500' }
    ],
    solution: `Début
  Lire prix, quantite

  total <- prix * quantite

  Si quantite > 50 Alors
    taux <- 10
  Sinon
    Si quantite > 10 Alors
      taux <- 5
    Sinon
      taux <- 0
    FinSi
  FinSi

  total <- total - (total * taux) DIV 100
  Afficher(total)
Fin
`,
    takeaway: "Relire un algorithme pas à pas sur un jeu d essai (trace écrite) révèle immédiatement remises oubliées ou bornes fausses."
  },
  {
    id: 'algo-c10-e2',
    chapter: 10,
    level: 'n4',
    language: 'algo',
    title: 'Du pseudo-code au programme complet',
    goal: 'Traduire fidèlement un pseudo-code donné.',
    brief: '<p>Voici un pseudo-code : « Lire n ; S ← 0 ; i ← 1 ; TantQue i ≤ n : si i mod 2 = 0 alors S ← S + i ; i ← i + 1 ; FinTantQue ; Écrire S ». Traduisez-le exactement : le programme reçoit n et affiche la somme des entiers pairs de 1 à n.</p>',
    starter: `Début
  Lire n

  // À compléter : traduire le pseudo-code de l'énoncé (boucle TantQue,
  // condition de parité, accumulateur S).
Fin
`,
    hints: [
      'La traduction respecte la structure de l’original : la boucle et son compteur tels quels.',
      'La condition intérieure filtre les valeurs paires avant d’ajouter au total : testez le reste de la division par deux.',
      'Étapes : S = 0 ; i = 1 ; TantQue i <= n Faire : Si i MOD 2 = 0 Alors S = S + i ; i = i + 1 ; afficher S.'
    ],
    examples: [
      { stdin: '10', expected: '30', note: '2 + 4 + 6 + 8 + 10 = 30.' }
    ],
    tests: [
      { label: 'Cas nul', stdin: '0', expected: '0' },
      { label: 'Impair', stdin: '7', expected: '12' },
      { label: 'Grand n', stdin: '100', expected: '2550' }
    ],
    solution: `Début
  Lire n

  S <- 0
  i <- 1
  TantQue i <= n Faire
    Si i MOD 2 = 0 Alors
      S <- S + i
    FinSi
    i <- i + 1
  FinTantQue

  Afficher(S)
Fin
`,
    takeaway: "Traduire du pseudo-code exige de préserver exactement les conditions d arrêt, types de division et formats d affichage."
  },
  {
    id: 'algo-c10-e3',
    chapter: 10,
    level: 'n5',
    language: 'algo',
    title: 'Synthèse — gestion d’une file d’attente',
    goal: 'Combiner tableau, boucle, fonction et condition sur un problème complet.',
    brief: '<p>Le programme reçoit un entier n, puis n durées de traitement (entiers, en minutes) dans l’ordre d’arrivée. Utilisez les fonctions <code>attente_totale(durees)</code> et <code>temps_moyen(durees)</code> pour calculer l’attente totale (somme des durées des personnes précédentes, cumulée pour tout le monde) et le temps moyen d’attente avec deux décimales. Affichez l’attente totale (entier) sur une ligne, puis la moyenne sur la suivante. La lecture des durées peut se faire dans le programme principal ; les boucles de calcul doivent se trouver dans les fonctions.</p>',
    starter: `Fonction attente_totale(durees) : Entier
Début
  // À compléter : chaque personne attend la somme des durées qui la précèdent.
  Retourner 0
FinFonction

Fonction temps_moyen(durees) : Reel
Début
  // À compléter : réutiliser attente_totale, puis diviser par l'effectif.
  Retourner 0.0
FinFonction

Début
  Lire n
  Tableau durees[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire durees[i]
  FinPour

  Afficher(attente_totale(durees))
  Afficher(Formater(temps_moyen(durees), 2))
Fin
`,
    hints: [
      'Le temps écoulé avant chaque personne est la somme des durées précédentes : maintenez un cumul qui avance dans le tableau.',
      'L’attente totale additionne ces cumuls ; la moyenne s’en déduit en divisant par le nombre de personnes.',
      'Étapes : dans attente_totale : total = 0, ecoule = 0 ; Pour i De 0 A Longueur(durees)-1 : total = total + ecoule ; ecoule = ecoule + durees[i] ; Retourner total. temps_moyen : Retourner attente_totale(durees) / Longueur(durees).'
    ],
    examples: [
      { stdin: '3\n5\n10\n2', expected: '20\n6.67', note: 'Attentes : 0, 5, 15 → total 20, moyenne 6.67.' }
    ],
    tests: [
      { label: 'Une seule personne', stdin: '1\n7', expected: '0\n0.00' },
      { label: 'Deux personnes', stdin: '2\n4\n6', expected: '4\n2.00' },
      { label: 'Durées égales', stdin: '4\n3\n3\n3\n3', expected: '18\n4.50' }
    ],
    solution: `Fonction attente_totale(durees) : Entier
Début
  total <- 0
  ecoule <- 0
  Pour i De 0 A Longueur(durees) - 1 Faire
    total <- total + ecoule
    ecoule <- ecoule + durees[i]
  FinPour
  Retourner total
FinFonction

Fonction temps_moyen(durees) : Reel
Début
  Retourner attente_totale(durees) / Longueur(durees)
FinFonction

Début
  Lire n
  Tableau durees[n] : Entiers
  Pour i De 0 A n - 1 Faire
    Lire durees[i]
  FinPour

  Afficher(attente_totale(durees))
  Afficher(Formater(temps_moyen(durees), 2))
Fin
`,
    takeaway: "Une file (FIFO) défile toujours l élément de tête et maintient la cohérence entre taille courante et capacité."
  }
];
