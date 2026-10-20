/**
 * Chapitre 1 — Sauvegarde des données.
 *
 * Scripts d'administration PowerShell lus sur l'entrée standard
 * ([Console]::In.ReadLine()) et rendus sur la sortie standard. Le langage
 * `powershell` n'est pas exécutable par la machine de développement (ni présent
 * dans la liste blanche du service) : l'intégrité est vérifiée structurellement,
 * comme pour le cours de Java.
 */
'use strict';

module.exports = [
  {
    id: 'ws2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'powershell',
    title: 'Taille totale des sauvegardes',
    goal: 'Lire une liste de tailles et totaliser : premier script d’administration PowerShell.',
    brief: '<p>Le script lit un entier <code>n</code>, puis <code>n</code> tailles de sauvegarde en ' +
      'gigaoctets. Affichez <code>total : X Go</code> où <code>X</code> est la somme des tailles.</p>',
    starter: `$n = [int][Console]::In.ReadLine()
$total = 0
for ($i = 0; $i -lt $n; $i++) {
    $taille = [int][Console]::In.ReadLine()
    # À compléter : ajouter $taille au total.
}

# À compléter : afficher "total : " suivi de la somme, puis " Go".
`,
    hints: [
      'Dans la boucle, une seule instruction suffit : $total += $taille.',
      'PowerShell affiche avec Write-Output ; concaténez le texte et la valeur : ("total : " + $total + " Go").'
    ],
    examples: [
      { stdin: '3\n10\n20\n30', expected: 'total : 60 Go', note: 'Trois sauvegardes de 10, 20 et 30 Go.' }
    ],
    tests: [
      { label: 'Deux tailles', stdin: '2\n100\n250', expected: 'total : 350 Go' },
      { label: 'Quatre tailles égales', stdin: '4\n50\n50\n50\n50', expected: 'total : 200 Go' },
      { label: 'Une seule taille', stdin: '1\n1024', expected: 'total : 1024 Go' }
    ],
    solution: `$n = [int][Console]::In.ReadLine()
$total = 0
for ($i = 0; $i -lt $n; $i++) {
    $taille = [int][Console]::In.ReadLine()
    $total += $taille
}
Write-Output ("total : " + $total + " Go")
`
  },
  {
    id: 'ws2-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'powershell',
    title: 'Contrôle de la stratégie 3-2-1',
    goal: 'Combiner plusieurs conditions pour valider une stratégie de sauvegarde.',
    brief: '<p>Le script lit trois lignes : le nombre de <strong>copies</strong>, le nombre de ' +
      '<strong>supports</strong> distincts et la présence d’une copie <strong>hors site</strong> ' +
      '(<code>oui</code>/<code>non</code>). La règle 3-2-1 est respectée si les trois conditions sont ' +
      'réunies : au moins 3 copies, au moins 2 supports, une copie hors site. Affichez ' +
      '<code>3-2-1 : conforme</code> ou <code>3-2-1 : non conforme</code>.</p>',
    starter: `$copies = [int][Console]::In.ReadLine()
$supports = [int][Console]::In.ReadLine()
$horsSite = [Console]::In.ReadLine()

# À compléter : tester la règle 3-2-1 et afficher
# "3-2-1 : conforme" ou "3-2-1 : non conforme".
`,
    hints: [
      'Combinez les tests avec -and : ($copies -ge 3) -and ($supports -ge 2) -and ($horsSite -eq "oui").',
      'La comparaison de chaînes utilise -eq, pas ==.'
    ],
    examples: [
      { stdin: '3\n2\noui', expected: '3-2-1 : conforme', note: 'Les trois conditions sont remplies.' }
    ],
    tests: [
      { label: 'Copie hors site absente', stdin: '3\n2\nnon', expected: '3-2-1 : non conforme' },
      { label: 'Une seule copie hors site mais 2 copies', stdin: '2\n2\noui', expected: '3-2-1 : non conforme' },
      { label: 'Stratégie renforcée', stdin: '4\n3\noui', expected: '3-2-1 : conforme' }
    ],
    solution: `$copies = [int][Console]::In.ReadLine()
$supports = [int][Console]::In.ReadLine()
$horsSite = [Console]::In.ReadLine()
if (($copies -ge 3) -and ($supports -ge 2) -and ($horsSite -eq "oui")) {
    Write-Output "3-2-1 : conforme"
} else {
    Write-Output "3-2-1 : non conforme"
}
`
  },
  {
    id: 'ws2-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'powershell',
    title: 'Espace restant sur la cible',
    goal: 'Comparer deux valeurs et choisir entre deux issues : contrôle de capacité avant sauvegarde.',
    brief: '<p>Le script lit la <strong>capacité</strong> de la cible de sauvegarde (Go), puis la ' +
      '<strong>taille</strong> à écrire (Go). Si la taille dépasse la capacité, affichez ' +
      '<code>alerte : espace insuffisant</code> ; sinon affichez <code>libre : X Go</code> où ' +
      '<code>X</code> est l’espace restant.</p>',
    starter: `$capacite = [int][Console]::In.ReadLine()
$taille = [int][Console]::In.ReadLine()

# À compléter : comparer $taille et $capacite, puis afficher
# "alerte : espace insuffisant" ou "libre : X Go".
`,
    hints: [
      'Comparez avec -gt : ($taille -gt $capacite).',
      'L’espace restant vaut $capacite - $taille.'
    ],
    examples: [
      { stdin: '500\n200', expected: 'libre : 300 Go', note: '500 Go de capacité, 200 Go écrits.' }
    ],
    tests: [
      { label: 'Cible exactement pleine', stdin: '1000\n1000', expected: 'libre : 0 Go' },
      { label: 'Dépassement de capacité', stdin: '500\n600', expected: 'alerte : espace insuffisant' },
      { label: 'Cible large', stdin: '2000\n1500', expected: 'libre : 500 Go' }
    ],
    solution: `$capacite = [int][Console]::In.ReadLine()
$taille = [int][Console]::In.ReadLine()
if ($taille -gt $capacite) {
    Write-Output "alerte : espace insuffisant"
} else {
    Write-Output ("libre : " + ($capacite - $taille) + " Go")
}
`
  }
];
