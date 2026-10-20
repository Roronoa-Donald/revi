/**
 * Exercices de code — PHP (B1), 3 par module, écrits en PHP CLI.
 *
 * Le module couvre PHP procedural et l'accès MySQL via PDO. Les exercices
 * tournent en CLI : l'entrée arrive sur STDIN (une valeur par ligne), la
 * sortie est comparée après normalisation des fins de ligne.
 *
 * Même contrat que les autres catalogues :
 *   - `brief`    : l'énoncé affiché à l'élève ;
 *   - `starter`  : le code de départ déposé dans Monaco (incomplet) ;
 *   - `examples` : un exemple VISIBLE (entrée, sortie attendue, commentaire) ;
 *   - `tests`    : les tests de correction, CACHÉS (jamais envoyés au navigateur) ;
 *   - `hints`    : deux indices rédigés en mots, jamais en code ;
 *   - `solution` : le corrigé, réservé au serveur (contrôle d'intégrité).
 */

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Premiers pas en PHP
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'php-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'php',
    title: 'Bonjour la promotion',
    goal: 'Lire une entrée sur STDIN et afficher avec echo.',
    brief: '<p>Le programme reçoit un prénom (sans espace) sur l’entrée standard. Affichez <code>Bonjour &lt;prénom&gt; !</code> suivi d’un saut de ligne.</p>',
    starter: `<?php
$nom = trim(fgets(STDIN));

// À compléter : afficher "Bonjour <nom> !"
`,
    hints: [
      'fgets(STDIN) lit une ligne du clavier ou du tube d’entrée ; trim retire le saut de ligne qui l’accompagne.',
      'Entre guillemets doubles, une variable est remplacée par sa valeur : c’est l’interpolation.'
    ],
    examples: [
      { stdin: 'Alice', expected: 'Bonjour Alice !', note: 'Le prénom est inséré dans le message.' }
    ],
    tests: [
      { label: 'Prénom composé collé', stdin: 'JeanLuc', expected: 'Bonjour JeanLuc !' },
      { label: 'Une lettre', stdin: 'A', expected: 'Bonjour A !' },
      { label: 'Autre prénom', stdin: 'Fatou', expected: 'Bonjour Fatou !' }
    ],
    solution: `<?php
$nom = trim(fgets(STDIN));

echo "Bonjour $nom !\\n";
`
  },
  {
    id: 'php-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'php',
    title: 'Fiche produit',
    goal: 'Lire plusieurs valeurs et enchaîner les affichages.',
    brief: '<p>Le programme reçoit deux lignes : le nom d’un article (sans espace), puis son prix (entier). Affichez <code>Article : &lt;nom&gt;</code> puis <code>Prix : &lt;prix&gt; EUR</code>, chacun sur sa ligne.</p>',
    starter: `<?php
$article = trim(fgets(STDIN));
$prix = (int)trim(fgets(STDIN));

// À compléter : afficher la fiche sur deux lignes.
`,
    hints: [
      'Le cast (int) transforme la ligne lue en entier : indispensable pour calculer ensuite.',
      'Deux echo, chacun terminé par le saut de ligne.'
    ],
    examples: [
      { stdin: 'Clavier\n29', expected: 'Article : Clavier\nPrix : 29 EUR', note: 'Deux affichages dans l’ordre de l’énoncé.' }
    ],
    tests: [
      { label: 'Prix nul', stdin: 'Souris\n0', expected: 'Article : Souris\nPrix : 0 EUR' },
      { label: 'Prix élevé', stdin: 'Ecran\n249', expected: 'Article : Ecran\nPrix : 249 EUR' },
      { label: 'Une lettre', stdin: 'USB\n9', expected: 'Article : USB\nPrix : 9 EUR' }
    ],
    solution: `<?php
$article = trim(fgets(STDIN));
$prix = (int)trim(fgets(STDIN));

echo "Article : $article\\n";
echo "Prix : $prix EUR\\n";
`
  },
  {
    id: 'php-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'php',
    title: 'Total de commande',
    goal: 'Calculer à partir des entrées puis afficher le résultat.',
    brief: '<p>Le programme reçoit le prix unitaire d’un article (entier), puis la quantité commandée (entier). Affichez <code>Total : &lt;prix × quantité&gt; EUR</code>.</p>',
    starter: `<?php
$prix = (int)trim(fgets(STDIN));
$quantite = (int)trim(fgets(STDIN));

// À compléter : calculer et afficher le total.
`,
    hints: [
      'Le total d’une commande est le produit du prix par la quantité.',
      'L’interpolation évalue aussi les expressions simples mises dans des variables : calculez d’abord, affichez ensuite.'
    ],
    examples: [
      { stdin: '12\n5', expected: 'Total : 60 EUR', note: '12 × 5 = 60.' }
    ],
    tests: [
      { label: 'Quantité un', stdin: '45\n1', expected: 'Total : 45 EUR' },
      { label: 'Grosse commande', stdin: '199\n8', expected: 'Total : 1592 EUR' },
      { label: 'Prix nul', stdin: '0\n12', expected: 'Total : 0 EUR' }
    ],
    solution: `<?php
$prix = (int)trim(fgets(STDIN));
$quantite = (int)trim(fgets(STDIN));

$total = $prix * $quantite;
echo "Total : $total EUR\\n";
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Types, opérateurs et chaînes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'php-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'php',
    title: 'Moyenne de trois notes',
    goal: 'Obtenir un résultat décimal et le formater.',
    brief: '<p>Le programme reçoit trois notes entières, chacune sur une ligne. Affichez leur moyenne avec exactement deux décimales (point décimal), sans autre texte.</p>',
    starter: `<?php
$a = (int)trim(fgets(STDIN));
$b = (int)trim(fgets(STDIN));
$c = (int)trim(fgets(STDIN));

// À compléter : afficher la moyenne à deux décimales.
`,
    hints: [
      'En PHP, la division de deux entiers avec / produit déjà un nombre décimal : pas de piège de division entière ici.',
      'number_format formate un nombre : ses arguments fixent le nombre de décimales et les séparateurs.'
    ],
    examples: [
      { stdin: '12\n14\n16', expected: '14.00', note: '(12 + 14 + 16) / 3 = 14.00.' }
    ],
    tests: [
      { label: 'Moyenne à répétition', stdin: '10\n10\n10', expected: '10.00' },
      { label: 'Moyenne périodique', stdin: '10\n11\n12', expected: '11.00' },
      { label: 'Notes basses', stdin: '1\n2\n4', expected: '2.33' }
    ],
    solution: `<?php
$a = (int)trim(fgets(STDIN));
$b = (int)trim(fgets(STDIN));
$c = (int)trim(fgets(STDIN));

$moyenne = ($a + $b + $c) / 3;
echo number_format($moyenne, 2, '.', '') . "\\n";
`
  },
  {
    id: 'php-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'php',
    title: 'Inspecter une chaîne',
    goal: 'Utiliser les fonctions natives de chaîne.',
    brief: '<p>Le programme reçoit un mot (sans espace). Affichez <code>Longueur : &lt;n&gt;</code> puis <code>Majuscules : &lt;MOT&gt;</code> (le mot converti en majuscules), chacun sur sa ligne.</p>',
    starter: `<?php
$mot = trim(fgets(STDIN));

// À compléter : longueur puis version majuscule.
`,
    hints: [
      'strlen compte les caractères de la chaîne.',
      'strtoupper renvoie une copie en majuscules : la variable d’origine n’est pas modifiée.'
    ],
    examples: [
      { stdin: 'Bonjour', expected: 'Longueur : 7\nMajuscules : BONJOUR', note: 'Sept caractères, copie en majuscules.' }
    ],
    tests: [
      { label: 'Une lettre', stdin: 'x', expected: 'Longueur : 1\nMajuscules : X' },
      { label: 'Déjà en majuscules', stdin: 'PHP', expected: 'Longueur : 3\nMajuscules : PHP' },
      { label: 'Mot long', stdin: 'developpement', expected: 'Longueur : 13\nMajuscules : DEVELOPPEMENT' }
    ],
    solution: `<?php
$mot = trim(fgets(STDIN));

echo "Longueur : " . strlen($mot) . "\\n";
echo "Majuscules : " . strtoupper($mot) . "\\n";
`
  },
  {
    id: 'php-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'php',
    title: 'Remplir la cabine',
    goal: 'Découper une quantité avec division entière et modulo.',
    brief: '<p>Le programme reçoit le nombre de visiteurs (entier), puis la capacité d’une cabine (entier). Affichez <code>Trajets : &lt;cabines pleines&gt;</code> puis <code>Reste : &lt;visiteurs non embarqués&gt;</code>.</p>',
    starter: `<?php
$visiteurs = (int)trim(fgets(STDIN));
$capacite = (int)trim(fgets(STDIN));

// À compléter : nombre de trajets pleins et reste.
`,
    hints: [
      'intdiv donne le quotient entier d’une division : c’est le nombre de cabines remplies.',
      'Le modulo % donne le reste : les visiteurs qui attendent le trajet suivant.'
    ],
    examples: [
      { stdin: '23\n6', expected: 'Trajets : 3\nReste : 5', note: '3 cabines pleines (18 personnes), 5 en attente.' }
    ],
    tests: [
      { label: 'Cabines exactes', stdin: '24\n6', expected: 'Trajets : 4\nReste : 0' },
      { label: 'Moins d’une cabine', stdin: '5\n6', expected: 'Trajets : 0\nReste : 5' },
      { label: 'Groupe nombreux', stdin: '130\n12', expected: 'Trajets : 10\nReste : 10' }
    ],
    solution: `<?php
$visiteurs = (int)trim(fgets(STDIN));
$capacite = (int)trim(fgets(STDIN));

$trajets = intdiv($visiteurs, $capacite);
$reste = $visiteurs % $capacite;

echo "Trajets : $trajets\\n";
echo "Reste : $reste\\n";
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Conditions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'php-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'php',
    title: 'Mention du semestre',
    goal: 'Écrire une cascade if / elseif / else dans le bon ordre.',
    brief: '<p>Le programme reçoit une note entière. Affichez la mention : <code>Tres bien</code> à partir de 16, <code>Bien</code> à partir de 14, <code>Assez bien</code> à partir de 12, <code>Passable</code> à partir de 10, sinon <code>Ajourne</code>.</p>',
    starter: `<?php
$note = (int)trim(fgets(STDIN));

// À compléter : la cascade de mentions.
`,
    hints: [
      'Dans une cascade, la première condition satisfaite gagne : testez les mentions de la plus haute à la plus basse.',
      'Un seul affichage doit se produire : les branches s’excluent mutuellement.'
    ],
    examples: [
      { stdin: '17', expected: 'Tres bien', note: '17 ≥ 16 : mention maximale.' }
    ],
    tests: [
      { label: 'Seuil du bien', stdin: '14', expected: 'Bien' },
      { label: 'Juste en dessous de dix', stdin: '9', expected: 'Ajourne' },
      { label: 'Seuil du passable', stdin: '10', expected: 'Passable' }
    ],
    solution: `<?php
$note = (int)trim(fgets(STDIN));

if ($note >= 16) {
    echo "Tres bien\\n";
} elseif ($note >= 14) {
    echo "Bien\\n";
} elseif ($note >= 12) {
    echo "Assez bien\\n";
} elseif ($note >= 10) {
    echo "Passable\\n";
} else {
    echo "Ajourne\\n";
}
`
  },
  {
    id: 'php-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'php',
    title: 'Frais de livraison',
    goal: 'Combiner une condition et un calcul de total.',
    brief: '<p>Le programme reçoit le montant d’un panier (entier). La livraison est offerte à partir de 50 EUR, sinon elle coûte 5 EUR. Affichez <code>Livraison : offerte</code> ou <code>Livraison : 5 EUR</code>, puis <code>Total : &lt;montant à payer&gt; EUR</code>.</p>',
    starter: `<?php
$panier = (int)trim(fgets(STDIN));

// À compléter : livraison puis total.
`,
    hints: [
      'Le seuil fait partie de l’énoncé : un panier de 50 EUR exactement bénéficie de l’offre.',
      'Le total à payer ajoute la livraison au panier seulement quand elle est payante.'
    ],
    examples: [
      { stdin: '75', expected: 'Livraison : offerte\nTotal : 75 EUR', note: '75 ≥ 50 : livraison offerte.' }
    ],
    tests: [
      { label: 'Seuil exact', stdin: '50', expected: 'Livraison : offerte\nTotal : 50 EUR' },
      { label: 'Juste en dessous', stdin: '49', expected: 'Livraison : 5 EUR\nTotal : 54 EUR' },
      { label: 'Petit panier', stdin: '12', expected: 'Livraison : 5 EUR\nTotal : 17 EUR' }
    ],
    solution: `<?php
$panier = (int)trim(fgets(STDIN));

if ($panier >= 50) {
    echo "Livraison : offerte\\n";
    $total = $panier;
} else {
    echo "Livraison : 5 EUR\\n";
    $total = $panier + 5;
}
echo "Total : $total EUR\\n";
`
  },
  {
    id: 'php-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'php',
    title: 'Tarif du tramway',
    goal: 'Combiner plusieurs conditions avec ET et OU.',
    brief: '<p>Le programme reçoit un âge (entier). Affichez <code>Gratuit</code> si l’âge est strictement inférieur à 12 ou à partir de 65, <code>Reduit</code> entre 12 et 17 inclus, sinon <code>Plein</code>.</p>',
    starter: `<?php
$age = (int)trim(fgets(STDIN));

// À compléter : les trois tarifs.
`,
    hints: [
      'Deux tranches donnent la gratuité : elles se combinent avec le OU logique.',
      'La tranche réduite a deux bornes : les deux doivent être vérifiées en même temps.'
    ],
    examples: [
      { stdin: '15', expected: 'Reduit', note: 'Entre 12 et 17 : tarif réduit.' }
    ],
    tests: [
      { label: 'Enfant', stdin: '8', expected: 'Gratuit' },
      { label: 'Senior', stdin: '70', expected: 'Gratuit' },
      { label: 'Adulte jeune', stdin: '18', expected: 'Plein' }
    ],
    solution: `<?php
$age = (int)trim(fgets(STDIN));

if ($age < 12 || $age >= 65) {
    echo "Gratuit\\n";
} elseif ($age <= 17) {
    echo "Reduit\\n";
} else {
    echo "Plein\\n";
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — Boucles
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'php-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'php',
    title: 'Compte à rebours',
    goal: 'Écrire une boucle for à pas décroissant.',
    brief: '<p>Le programme reçoit un entier n (≥ 1). Affichez un nombre par ligne en descendant de n jusqu’à 1, puis <code>Decollage</code> sur la dernière ligne.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));

// À compléter : le compte à rebours.
`,
    hints: [
      'Une boucle for se décline en trois parties : initialisation, condition de poursuite, pas.',
      'Le pas peut être négatif : la variable diminue à chaque tour jusqu’à la borne basse.'
    ],
    examples: [
      { stdin: '3', expected: '3\n2\n1\nDecollage', note: 'De 3 à 1, puis le message final.' }
    ],
    tests: [
      { label: 'Un seul tour', stdin: '1', expected: '1\nDecollage' },
      { label: 'Cinq tours', stdin: '5', expected: '5\n4\n3\n2\n1\nDecollage' },
      { label: 'Onze tours', stdin: '11', expected: '11\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nDecollage' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));

for ($i = $n; $i >= 1; $i--) {
    echo $i . "\\n";
}
echo "Decollage\\n";
`
  },
  {
    id: 'php-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'php',
    title: 'Somme des entiers de 1 à n',
    goal: 'Accumuler un résultat dans une boucle.',
    brief: '<p>Le programme reçoit un entier n. Affichez la somme 1 + 2 + … + n en utilisant une boucle, sans <code>array_sum()</code> ni formule directe.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));

// À compléter : accumuler avec une boucle.
`,
    hints: [
      'L’accumulateur s’initialise avant la boucle : sinon il repart de zéro à chaque tour.',
      'La boucle monte de 1 jusqu’à n inclus : la condition de poursuite porte sur cette borne.'
    ],
    examples: [
      { stdin: '10', expected: '55', note: '1 + 2 + … + 10 = 55.' }
    ],
    tests: [
      { label: 'Cas nul', stdin: '0', expected: '0' },
      { label: 'Un seul terme', stdin: '1', expected: '1' },
      { label: 'Grande valeur', stdin: '100', expected: '5050' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));

$somme = 0;
for ($i = 1; $i <= $n; $i++) {
    $somme += $i;
}
echo $somme . "\\n";
`
  },
  {
    id: 'php-c4-e3',
    chapter: 4,
    level: 'n4',
    language: 'php',
    title: 'Puissances de deux',
    goal: 'Faire évoluer un accumulateur multiplicatif dans une boucle.',
    brief: '<p>Le programme reçoit un entier n (1 ≤ n ≤ 20). Affichez les n premières puissances de deux (2, 4, 8, …), une par ligne, en utilisant une boucle et sans <code>pow()</code> ni l’opérateur <code>**</code>.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));

// À compléter : les puissances de deux, une par ligne.
`,
    hints: [
      'Chaque puissance de deux est le double de la précédente : une seule multiplication par tour suffit.',
      'L’accumulateur multiplicatif démarre à 1 : élément neutre de la multiplication.'
    ],
    examples: [
      { stdin: '4', expected: '2\n4\n8\n16', note: 'Quatre puissances : 2, 4, 8, 16.' }
    ],
    tests: [
      { label: 'Une seule', stdin: '1', expected: '2' },
      { label: 'Jusqu’à 4096', stdin: '12', expected: '2\n4\n8\n16\n32\n64\n128\n256\n512\n1024\n2048\n4096' },
      { label: 'Vingt', stdin: '20', expected: '2\n4\n8\n16\n32\n64\n128\n256\n512\n1024\n2048\n4096\n8192\n16384\n32768\n65536\n131072\n262144\n524288\n1048576' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));

$puissance = 1;
for ($i = 1; $i <= $n; $i++) {
    $puissance *= 2;
    echo $puissance . "\\n";
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Tableaux indexés
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'php-c5-e1',
    chapter: 5,
    level: 'n3',
    language: 'php',
    title: 'Somme et moyenne des notes',
    goal: 'Remplir un tableau puis le parcourir.',
    brief: '<p>Le programme reçoit un entier n, puis n notes entières (une par ligne). Affichez <code>Somme : &lt;total&gt;</code> puis <code>Moyenne : &lt;moyenne à deux décimales&gt;</code>.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));
$notes = [];
for ($i = 0; $i < $n; $i++) {
    $notes[] = (int)trim(fgets(STDIN));
}

// À compléter : somme puis moyenne.
`,
    hints: [
      'array_sum additionne tous les éléments d’un tableau ; count en donne la taille. Une boucle classique fait aussi l’affaire.',
      'La moyenne doit rester décimale : formatez-la au moment de l’affichage.'
    ],
    examples: [
      { stdin: '4\n12\n15\n14\n19', expected: 'Somme : 60\nMoyenne : 15.00', note: 'Total 60, moyenne 60 / 4 = 15.00.' }
    ],
    tests: [
      { label: 'Une seule note', stdin: '1\n8', expected: 'Somme : 8\nMoyenne : 8.00' },
      { label: 'Notes irrégulières', stdin: '3\n7\n19\n13', expected: 'Somme : 39\nMoyenne : 13.00' },
      { label: 'Moyenne périodique', stdin: '3\n10\n10\n11', expected: 'Somme : 31\nMoyenne : 10.33' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));
$notes = [];
for ($i = 0; $i < $n; $i++) {
    $notes[] = (int)trim(fgets(STDIN));
}

$somme = array_sum($notes);
$moyenne = $somme / count($notes);

echo "Somme : $somme\\n";
echo "Moyenne : " . number_format($moyenne, 2, '.', '') . "\\n";
`
  },
  {
    id: 'php-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'php',
    title: 'Recherche dans un tableau',
    goal: 'Chercher une valeur et communiquer sa position.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers, puis une valeur cible. Affichez la position de la première occurrence de la cible (positions numérotées à partir de 1), ou <code>absent</code>.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));
$tableau = [];
for ($i = 0; $i < $n; $i++) {
    $tableau[] = (int)trim(fgets(STDIN));
}
$cible = (int)trim(fgets(STDIN));

// À compléter : position de la cible ou "absent".
`,
    hints: [
      'array_search renvoie la clé de la première occurrence, mais la numérotation du tableau commence à zéro.',
      'Quand la valeur ne figure pas, array_search renvoie false : prévoyez ce cas avant d’afficher.'
    ],
    examples: [
      { stdin: '5\n10\n20\n30\n20\n50\n20', expected: '2', note: 'La première occurrence de 20 est à la position 2.' }
    ],
    tests: [
      { label: 'Premier élément', stdin: '3\n7\n8\n9\n7', expected: '1' },
      { label: 'Absent', stdin: '4\n1\n2\n3\n4\n9', expected: 'absent' },
      { label: 'Dernier élément', stdin: '3\n5\n6\n7\n7', expected: '3' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));
$tableau = [];
for ($i = 0; $i < $n; $i++) {
    $tableau[] = (int)trim(fgets(STDIN));
}
$cible = (int)trim(fgets(STDIN));

$cle = array_search($cible, $tableau, true);

if ($cle === false) {
    echo "absent\\n";
} else {
    echo ($cle + 1) . "\\n";
}
`
  },
  {
    id: 'php-c5-e3',
    chapter: 5,
    level: 'n4',
    language: 'php',
    title: 'Trier sans sort()',
    goal: 'Implémenter un tri à la main, interdiction des fonctions de tri.',
    brief: '<p>Le programme reçoit un entier n, puis n entiers. Triez-les par sélection (chercher le minimum de la partie non triée et l’échanger), <strong>sans</strong> <code>sort()</code>, <code>usort()</code> ni autre fonction de tri. Affichez les valeurs triées sur une ligne, séparées par des espaces.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));
$tableau = [];
for ($i = 0; $i < $n; $i++) {
    $tableau[] = (int)trim(fgets(STDIN));
}

// À compléter : tri par sélection, sans sort().
`,
    hints: [
      'La partie triée grandit depuis le début : à chaque tour, repérez le minimum de ce qui reste et échangez-le avec la première position libre.',
      'Un échange en PHP passe par une variable temporaire (ou par list($a, $b) = [$b, $a]).'
    ],
    examples: [
      { stdin: '5\n5\n2\n8\n1\n9', expected: '1 2 5 8 9', note: 'Tri croissant complet.' }
    ],
    tests: [
      { label: 'Déjà trié', stdin: '3\n1\n2\n3', expected: '1 2 3' },
      { label: 'Ordre inverse', stdin: '4\n4\n3\n2\n1', expected: '1 2 3 4' },
      { label: 'Doublons', stdin: '5\n3\n1\n3\n1\n2', expected: '1 1 2 3 3' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));
$tableau = [];
for ($i = 0; $i < $n; $i++) {
    $tableau[] = (int)trim(fgets(STDIN));
}

for ($debut = 0; $debut < $n - 1; $debut++) {
    $indiceMin = $debut;
    for ($i = $debut + 1; $i < $n; $i++) {
        if ($tableau[$i] < $tableau[$indiceMin]) {
            $indiceMin = $i;
        }
    }
    $temporaire = $tableau[$debut];
    $tableau[$debut] = $tableau[$indiceMin];
    $tableau[$indiceMin] = $temporaire;
}

echo implode(' ', $tableau) . "\\n";
`
  },

  // ═══════════════════════════════════════════════════════════════════
  // Module 6 — Fonctions
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'php-c6-e1',
    chapter: 6,
    level: 'n3',
    language: 'php',
    title: 'Une fonction de bienvenue',
    goal: 'Déclarer une fonction qui renvoie une valeur.',
    brief: '<p>Écrivez une fonction <code>carte($nom)</code> qui <em>renvoie</em> le message <code>Bienvenue &lt;nom&gt;</code>. Le programme lit un nom, appelle la fonction et affiche son résultat.</p>',
    starter: `<?php
function carte($nom)
{
    // À compléter : renvoyer le message de bienvenue.
}

$nom = trim(fgets(STDIN));
echo carte($nom) . "\n";
`,
    hints: [
      'Une fonction PHP se déclare avec function, son nom et ses paramètres entre parenthèses.',
      'return transmet la valeur à l’appelant : echo dans la fonction ne suffit pas, la valeur doit sortir.'
    ],
    examples: [
      { stdin: 'Alice', expected: 'Bienvenue Alice', note: 'La fonction assemble le message et le renvoie.' }
    ],
    tests: [
      { label: 'Prénom court', stdin: 'Bo', expected: 'Bienvenue Bo' },
      { label: 'Nom composé collé', stdin: 'MarieClaire', expected: 'Bienvenue MarieClaire' },
      { label: 'Une lettre', stdin: 'Z', expected: 'Bienvenue Z' }
    ],
    solution: `<?php
function carte($nom)
{
    return "Bienvenue $nom";
}

$nom = trim(fgets(STDIN));
echo carte($nom) . "\n";
`
  },
  {
    id: 'php-c6-e2',
    chapter: 6,
    level: 'n4',
    language: 'php',
    title: 'Fonction tarif',
    goal: 'Écrire une fonction à branches qui renvoie un calcul.',
    brief: '<p>Écrivez une fonction <code>ticket($age)</code> qui renvoie le prix d’entrée : 0 si l’âge est inférieur à 12 ou à partir de 65, 5 entre 12 et 17 inclus, sinon 8. Le programme lit un âge et affiche le prix renvoyé.</p>',
    starter: `<?php
function ticket($age)
{
    // À compléter : renvoyer 0, 5 ou 8 selon l’âge.
    return 0;
}

$age = (int)trim(fgets(STDIN));
echo ticket($age) . "\n";
`,
    hints: [
      'La fonction contient la cascade de conditions ; le programme principal se limite à lire et afficher.',
      'Chaque branche renvoie son prix : dès que return s’exécute, la fonction se termine.'
    ],
    examples: [
      { stdin: '12', expected: '5', note: 'Entre 12 et 17 : tarif à 5.' }
    ],
    tests: [
      { label: 'Enfant', stdin: '8', expected: '0' },
      { label: 'Senior', stdin: '65', expected: '0' },
      { label: 'Adulte', stdin: '30', expected: '8' }
    ],
    solution: `<?php
function ticket($age)
{
    if ($age < 12 || $age >= 65) {
        return 0;
    }
    if ($age <= 17) {
        return 5;
    }
    return 8;
}

$age = (int)trim(fgets(STDIN));
echo ticket($age) . "\n";
`
  },
  {
    id: 'php-c6-e3',
    chapter: 6,
    level: 'n5',
    language: 'php',
    title: 'stats() — moyenne et maximum',
    goal: 'Faire renvoyer plusieurs valeurs par une fonction.',
    brief: '<p>Écrivez une fonction <code>stats($notes)</code> qui renvoie le couple (moyenne, maximum) en un seul parcours, sans <code>array_sum()</code> ni <code>max()</code>. Le programme lit un entier n, puis n notes, et affiche la moyenne à deux décimales suivie du maximum, séparés par une espace.</p>',
    starter: `<?php
function stats($notes)
{
    // À compléter : un seul parcours, puis renvoyer le couple.
    return [0, 0];
}

$n = (int)trim(fgets(STDIN));
$notes = [];
for ($i = 0; $i < $n; $i++) {
    $notes[] = (int)trim(fgets(STDIN));
}

[$moyenne, $max] = stats($notes);
echo number_format($moyenne, 2, '.', '') . " $max\n";
`,
    hints: [
      'Une fonction ne renvoie qu’une seule chose : groupez moyenne et maximum dans un tableau de deux éléments.',
      'Le maximum se mémorise en partant de la première note, puis en remplaçant le candidat dès qu’une note le dépasse.'
    ],
    examples: [
      { stdin: '4\n12\n15\n14\n19', expected: '15.00 19', note: 'Moyenne 15.00, maximum 19.' }
    ],
    tests: [
      { label: 'Une seule note', stdin: '1\n8', expected: '8.00 8' },
      { label: 'Notes irrégulières', stdin: '3\n7\n19\n13', expected: '13.00 19' },
      { label: 'Moyenne périodique', stdin: '3\n10\n10\n11', expected: '10.33 11' }
    ],
    solution: `<?php
function stats($notes)
{
    $somme = 0;
    $max = $notes[0];
    foreach ($notes as $note) {
        $somme += $note;
        if ($note > $max) {
            $max = $note;
        }
    }
    return [$somme / count($notes), $max];
}

$n = (int)trim(fgets(STDIN));
$notes = [];
for ($i = 0; $i < $n; $i++) {
    $notes[] = (int)trim(fgets(STDIN));
}

[$moyenne, $max] = stats($notes);
echo number_format($moyenne, 2, '.', '') . " $max\n";
`
  },

  // ═══════════════════════════════════════════════════════════════════
  // Module 7 — Tableaux associatifs
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'php-c7-e1',
    chapter: 7,
    level: 'n3',
    language: 'php',
    title: 'Mentions par correspondance',
    goal: 'Associer des clés à des valeurs dans un tableau associatif.',
    brief: '<p>Le programme reçoit une note sur 10. Affichez la mention correspondante : <code>Excellent</code> pour 9 et 10, <code>Tres bien</code> pour 7 et 8, <code>Bien</code> pour 5 et 6, <code>Insuffisant</code> pour 1 à 4. Utilisez un tableau associatif.</p>',
    starter: `<?php
// À compléter : remplir le tableau associatif note => mention.
$mentions = [];

$note = (int)trim(fgets(STDIN));
echo $mentions[$note] . "\n";
`,
    hints: [
      'Un tableau associatif associe chaque clé à sa valeur : la clé est la note, la valeur est la mention.',
      'Les mentions partagées par plusieurs notes se déclarent une fois par note : 9 et 10 mènent toutes deux à la même mention.'
    ],
    examples: [
      { stdin: '8', expected: 'Tres bien', note: 'La clé 8 vaut la mention Tres bien.' }
    ],
    tests: [
      { label: 'Note maximale', stdin: '10', expected: 'Excellent' },
      { label: 'Milieu de grille', stdin: '5', expected: 'Bien' },
      { label: 'Note faible', stdin: '3', expected: 'Insuffisant' }
    ],
    solution: `<?php
$mentions = [
    10 => 'Excellent',
    9 => 'Excellent',
    8 => 'Tres bien',
    7 => 'Tres bien',
    6 => 'Bien',
    5 => 'Bien',
    4 => 'Insuffisant',
    3 => 'Insuffisant',
    2 => 'Insuffisant',
    1 => 'Insuffisant'
];

$note = (int)trim(fgets(STDIN));
echo $mentions[$note] . "\n";
`
  },
  {
    id: 'php-c7-e2',
    chapter: 7,
    level: 'n4',
    language: 'php',
    title: 'Inventaire du magasin',
    goal: 'Remplir un tableau associatif puis sommer ses valeurs.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes de la forme <code>nom quantite</code> (un mot, une espace, un entier). Constituez l’inventaire dans un tableau associatif (nom → quantité), puis affichez la quantité totale stockée.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));
$stock = [];
for ($i = 0; $i < $n; $i++) {
    // À compléter : découper la ligne et remplir $stock.
}

// À compléter : calculer et afficher le total.
echo 0 . "\n";
`,
    hints: [
      'explode découpe une chaîne selon un séparateur et renvoie un tableau de morceaux : le premier est le nom, le second la quantité.',
      'Un parcours foreach sur le tableau associatif donne accès à chaque valeur ; la clé, ici, n’intervient pas dans le total.'
    ],
    examples: [
      { stdin: '2\nclefs 7\nfermoirs 3', expected: '10', note: '7 + 3 = 10 articles en stock.' }
    ],
    tests: [
      { label: 'Trois références', stdin: '3\nclaviers 12\nsouris 8\necrans 5', expected: '25' },
      { label: 'Une seule référence', stdin: '1\nstylos 100', expected: '100' },
      { label: 'Quatre références', stdin: '4\na 1\nb 2\nc 3\nd 4', expected: '10' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));
$stock = [];
for ($i = 0; $i < $n; $i++) {
    $parts = explode(' ', trim(fgets(STDIN)));
    $stock[$parts[0]] = (int)$parts[1];
}

$total = 0;
foreach ($stock as $quantite) {
    $total += $quantite;
}
echo $total . "\n";
`
  },
  {
    id: 'php-c7-e3',
    chapter: 7,
    level: 'n5',
    language: 'php',
    title: 'Le mot le plus fréquent',
    goal: 'Compter des occurrences avec un tableau associatif.',
    brief: '<p>Le programme reçoit un entier n, puis n mots (un par ligne). Comptez les occurrences de chaque mot dans un tableau associatif, puis affichez le mot le plus fréquent suivi de son nombre d’occurrences, séparés par une espace (s’il y a égalité, le premier atteint gagne).</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));
$compteur = [];
for ($i = 0; $i < $n; $i++) {
    // À compléter : incrémenter le compteur du mot lu.
}

// À compléter : trouver le mot le plus fréquent et l'afficher.
echo "\n";
`,
    hints: [
      'isset teste l’existence d’une clé : le premier exemplaire d’un mot doit créer sa case à zéro avant d’incrémenter.',
      'Un parcours foreach du compteur donne le couple mot → occurrences : gardez le meilleur candidat vu jusqu’ici.'
    ],
    examples: [
      { stdin: '3\nhtml\ncss\nhtml', expected: 'html 2', note: 'html apparaît deux fois, css une fois.' }
    ],
    tests: [
      { label: 'Quatre mots', stdin: '4\nphp\nsql\nphp\npdo', expected: 'php 2' },
      { label: 'Deux mots', stdin: '3\na\nb\nb', expected: 'b 2' },
      { label: 'Mot net dominant', stdin: '5\nweb\nweb\nweb\napi\nweb', expected: 'web 4' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));
$compteur = [];
for ($i = 0; $i < $n; $i++) {
    $mot = trim(fgets(STDIN));
    if (!isset($compteur[$mot])) {
        $compteur[$mot] = 0;
    }
    $compteur[$mot]++;
}

$motFrequent = '';
$max = 0;
foreach ($compteur as $mot => $occurrences) {
    if ($occurrences > $max) {
        $max = $occurrences;
        $motFrequent = $mot;
    }
}
echo "$motFrequent $max\n";
`
  },

  // ═══════════════════════════════════════════════════════════════════
  // Module 8 — Sessions, formulaires et PDO
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'php-c8-e1',
    chapter: 8,
    level: 'n3',
    language: 'php',
    title: 'Valider un formulaire',
    goal: 'Vérifier des données saisies avant de les accepter.',
    brief: '<p>Le programme reçoit deux lignes : un email et un mot de passe. Affichez <code>OK</code> si l’email contient une arobase ET le mot de passe compte au moins 6 caractères ; sinon affichez <code>Refuse</code>.</p>',
    starter: `<?php
$email = trim(fgets(STDIN));
$motDePasse = trim(fgets(STDIN));

// À compléter : les deux conditions doivent être vraies ensemble.
`,
    hints: [
      'str_contains teste la présence d’une sous-chaîne, strlen la longueur d’une chaîne.',
      'Les deux règles doivent être vraies en même temps : c’est le ET logique qui les combine.'
    ],
    examples: [
      { stdin: 'alice@ex.fr\nmotdepasse', expected: 'OK', note: 'Arobase présente, mot de passe assez long.' }
    ],
    tests: [
      { label: 'Mot de passe trop court', stdin: 'abc@x.y\n123', expected: 'Refuse' },
      { label: 'Email sans arobase', stdin: 'pasdemo\nlongenough', expected: 'Refuse' },
      { label: 'Limite exacte', stdin: 'b@c.d\n123456', expected: 'OK' }
    ],
    solution: `<?php
$email = trim(fgets(STDIN));
$motDePasse = trim(fgets(STDIN));

if (str_contains($email, '@') && strlen($motDePasse) >= 6) {
    echo "OK\n";
} else {
    echo "Refuse\n";
}
`
  },
  {
    id: 'php-c8-e2',
    chapter: 8,
    level: 'n4',
    language: 'php',
    title: 'Parcourir des résultats comme PDO',
    goal: 'Manipuler des lignes nom → valeur, comme les résultats d’une requête.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes de la forme <code>nom age</code> (un mot, une espace, un entier), comme autant de lignes renvoyées par une requête. Affichez le nom et l’âge de la personne la plus âgée, séparés par une espace.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));
$personnes = [];
for ($i = 0; $i < $n; $i++) {
    $parts = explode(' ', trim(fgets(STDIN)));
    $personnes[$parts[0]] = (int)$parts[1];
}

// À compléter : trouver la personne la plus âgée et l'afficher.
echo "\n";
`,
    hints: [
      'Un tableau associatif nom → âge joue le rôle du jeu de résultats : un foreach visite chaque ligne.',
      'Gardez le meilleur candidat vu jusqu’ici : nom et âge avancent ensemble quand un âge supérieur apparaît.'
    ],
    examples: [
      { stdin: '2\nInes 19\nPaul 22', expected: 'Paul 22', note: 'Paul est le plus âgé des deux.' }
    ],
    tests: [
      { label: 'Trois personnes', stdin: '3\nLea 21\nMarc 34\nAna 27', expected: 'Marc 34' },
      { label: 'Une seule personne', stdin: '1\nBob 45', expected: 'Bob 45' },
      { label: 'Quatre personnes', stdin: '4\na 10\nb 20\nc 30\nd 25', expected: 'c 30' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));
$personnes = [];
for ($i = 0; $i < $n; $i++) {
    $parts = explode(' ', trim(fgets(STDIN)));
    $personnes[$parts[0]] = (int)$parts[1];
}

$plusAgee = '';
$ageMax = -1;
foreach ($personnes as $nom => $age) {
    if ($age > $ageMax) {
        $ageMax = $age;
        $plusAgee = $nom;
    }
}
echo "$plusAgee $ageMax\n";
`
  },
  {
    id: 'php-c8-e3',
    chapter: 8,
    level: 'n5',
    language: 'php',
    title: 'Contrôler les données avant l’INSERT',
    goal: 'Valider un lot de données avant de l’envoyer à la base.',
    brief: '<p>Le programme reçoit un entier n, puis n lignes de la forme <code>nom note</code> (un mot, une espace, un entier) destinées à une table. Avant tout INSERT, contrôlez : affichez <code>Valide</code> si toutes les notes sont comprises entre 0 et 20 inclus, sinon <code>Invalide</code>.</p>',
    starter: `<?php
$n = (int)trim(fgets(STDIN));
$notes = [];
for ($i = 0; $i < $n; $i++) {
    $parts = explode(' ', trim(fgets(STDIN)));
    $notes[$parts[0]] = (int)$parts[1];
}

// À compléter : vérifier chaque note et afficher le verdict.
`,
    hints: [
      'Une seule note hors bornes rend tout le lot refusable : le verdict se construit pendant le parcours.',
      'Un drapeau booléen démarre à true et passe à false dès qu’une valeur sort de l’intervalle autorisé.'
    ],
    examples: [
      { stdin: '2\nLea 15\nAdam 18', expected: 'Valide', note: 'Deux notes dans l’intervalle autorisé.' }
    ],
    tests: [
      { label: 'Note trop haute', stdin: '2\na 12\nb 25', expected: 'Invalide' },
      { label: 'Bornes exactes', stdin: '3\nx 0\ny 20\nz 10', expected: 'Valide' },
      { label: 'Note négative', stdin: '1\nq -3', expected: 'Invalide' }
    ],
    solution: `<?php
$n = (int)trim(fgets(STDIN));
$notes = [];
for ($i = 0; $i < $n; $i++) {
    $parts = explode(' ', trim(fgets(STDIN)));
    $notes[$parts[0]] = (int)$parts[1];
}

$valide = true;
foreach ($notes as $note) {
    if ($note < 0 || $note > 20) {
        $valide = false;
    }
}
echo $valide ? "Valide\n" : "Invalide\n";
`
  }
];
