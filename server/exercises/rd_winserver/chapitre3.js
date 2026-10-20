/**
 * Chapitre 3 — Clustering.
 *
 * Quorum, nœuds actifs/passifs et répartition de charge, en scripts PowerShell.
 */
'use strict';

module.exports = [
  {
    id: 'ws2-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'powershell',
    title: 'Quorum d’un cluster',
    goal: 'Comparer deux valeurs pour décider si un cluster conserve la majorité.',
    brief: '<p>Le script lit le nombre total de <strong>nœuds</strong>, puis le nombre de nœuds ' +
      '<strong>en ligne</strong>. Le quorum est atteint si les nœuds en ligne représentent plus de la ' +
      'moitié du cluster. Affichez <code>quorum : atteint</code> ou <code>quorum : perdu</code>.</p>',
    starter: `$total = [int][Console]::In.ReadLine()
$enLigne = [int][Console]::In.ReadLine()

# À compléter : tester si $enLigne * 2 dépasse $total,
# puis afficher "quorum : atteint" ou "quorum : perdu".
`,
    hints: [
      'La condition « plus de la moitié » s’écrit ($enLigne * 2 -gt $total).',
      'Évitez la division : multiplier par 2 garde des entiers exacts.'
    ],
    examples: [
      { stdin: '4\n3', expected: 'quorum : atteint', note: '3 nœuds sur 4 : majorité.' }
    ],
    tests: [
      { label: 'Majorité sur trois nœuds', stdin: '3\n2', expected: 'quorum : atteint' },
      { label: 'Égalité parfaite à deux', stdin: '2\n1', expected: 'quorum : perdu' },
      { label: 'Minorité sur cinq nœuds', stdin: '5\n2', expected: 'quorum : perdu' }
    ],
    solution: `$total = [int][Console]::In.ReadLine()
$enLigne = [int][Console]::In.ReadLine()

if ($enLigne * 2 -gt $total) {
    Write-Output "quorum : atteint"
} else {
    Write-Output "quorum : perdu"
}
`
  },
  {
    id: 'ws2-c3-e2',
    chapter: 3,
    level: 'n1',
    language: 'powershell',
    title: 'Nœuds actifs d’un cluster',
    goal: 'Parcourir un ensemble et classer la configuration active-active ou active-passive.',
    brief: '<p>Le script lit un entier <code>n</code>, puis <code>n</code> états de nœuds ' +
      '(<code>actif</code> ou <code>veille</code>). Affichez <code>actifs : X</code>, puis ' +
      '<code>type : active-active</code> si <strong>tous</strong> les nœuds sont actifs, sinon ' +
      '<code>type : active-passive</code>.</p>',
    starter: `$n = [int][Console]::In.ReadLine()
$actifs = 0
for ($i = 0; $i -lt $n; $i++) {
    $etat = [Console]::In.ReadLine()
    # À compléter : incrémenter $actifs si $etat vaut "actif".
}

# À compléter : afficher "actifs : X", puis le type de cluster.
`,
    hints: [
      'Le test d’égalité de chaînes s’écrit ($etat -eq "actif").',
      'Tous les nœuds sont actifs si $actifs -eq $n.'
    ],
    examples: [
      { stdin: '3\nactif\nactif\nactif', expected: 'actifs : 3\ntype : active-active', note: 'Trois nœuds actifs.' }
    ],
    tests: [
      { label: 'Un nœud en veille', stdin: '2\nactif\nveille', expected: 'actifs : 1\ntype : active-passive' },
      { label: 'Trois actifs sur quatre', stdin: '4\nactif\nactif\nveille\nactif', expected: 'actifs : 3\ntype : active-passive' },
      { label: 'Nœud unique en veille', stdin: '1\nveille', expected: 'actifs : 0\ntype : active-passive' }
    ],
    solution: `$n = [int][Console]::In.ReadLine()
$actifs = 0
for ($i = 0; $i -lt $n; $i++) {
    $etat = [Console]::In.ReadLine()
    if ($etat -eq "actif") {
        $actifs++
    }
}
Write-Output ("actifs : " + $actifs)
if ($actifs -eq $n) {
    Write-Output "type : active-active"
} else {
    Write-Output "type : active-passive"
}
`
  },
  {
    id: 'ws2-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'powershell',
    title: 'Restes de la répartition de charge',
    goal: 'Répartir des requêtes et isoler ce qui reste après distribution.',
    brief: '<p>Le script lit le nombre de <strong>requêtes</strong>, puis le nombre de ' +
      '<strong>serveurs</strong>. Affichez <code>par serveur : X</code> (division entière), puis ' +
      '<code>non reparties : Y</code> où <code>Y</code> est le reste non distribué.</p>',
    starter: `$requetes = [int][Console]::In.ReadLine()
$serveurs = [int][Console]::In.ReadLine()

# À compléter : calculer la part entière et le reste, puis les afficher.
`,
    hints: [
      'La part entière vaut [int]([math]::Floor($requetes / $serveurs)).',
      'Le reste se calcule avec l’opérateur modulo % ou par soustraction.'
    ],
    examples: [
      { stdin: '10\n3', expected: 'par serveur : 3\nnon reparties : 1', note: '10 requêtes sur 3 serveurs.' }
    ],
    tests: [
      { label: 'Répartition exacte', stdin: '1000\n4', expected: 'par serveur : 250\nnon reparties : 0' },
      { label: 'Deux serveurs', stdin: '7\n2', expected: 'par serveur : 3\nnon reparties : 1' },
      { label: 'Trois serveurs pleins', stdin: '9\n3', expected: 'par serveur : 3\nnon reparties : 0' }
    ],
    solution: `$requetes = [int][Console]::In.ReadLine()
$serveurs = [int][Console]::In.ReadLine()

$par = [int]([math]::Floor($requetes / $serveurs))
$reste = $requetes % $serveurs
Write-Output ("par serveur : " + $par)
Write-Output ("non reparties : " + $reste)
`
  }
];
