/**
 * Chapitre 6 — Administration avancée : cluster, monitoring, sauvegarde.
 */
'use strict';

module.exports = [
  {
    id: 'vm2-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'powershell',
    title: 'Quorum d’un cluster',
    goal: 'Vérifier que la majorité des nœuds est en ligne.',
    brief: '<p>Le script lit le nombre total de <strong>nœuds</strong>, puis le nombre de nœuds ' +
      '<strong>en ligne</strong>. Le quorum est atteint si les nœuds en ligne représentent plus de la ' +
      'moitié du cluster. Affichez <code>quorum : atteint</code> ou <code>quorum : perdu</code>.</p>',
    starter: `$total = [int][Console]::In.ReadLine()
$enLigne = [int][Console]::In.ReadLine()

# À compléter : tester la majorité et afficher l'état du quorum.
`,
    hints: [
      'Plus de la moitié s’écrit ($enLigne * 2 -gt $total).',
      'Multiplier par 2 évite la division et garde des entiers.'
    ],
    examples: [
      { stdin: '4\n3', expected: 'quorum : atteint', note: '3 nœuds sur 4 : majorité.' }
    ],
    tests: [
      { label: 'Majorité sur trois nœuds', stdin: '3\n2', expected: 'quorum : atteint' },
      { label: 'Partage parfait', stdin: '2\n1', expected: 'quorum : perdu' },
      { label: 'Minorité sur cinq', stdin: '5\n2', expected: 'quorum : perdu' }
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
    id: 'vm2-c6-e2',
    chapter: 6,
    level: 'n1',
    language: 'powershell',
    title: 'Alerte de monitoring',
    goal: 'Comparer une métrique à son seuil critique.',
    brief: '<p>Le script lit la <strong>valeur</strong> d’une métrique (par exemple un taux ' +
      'd’utilisation CPU en pourcentage), puis son <strong>seuil</strong> d’alerte. Si la valeur ' +
      'atteint ou dépasse le seuil, affichez <code>etat : alerte</code> ; sinon ' +
      '<code>etat : normal</code>.</p>',
    starter: `$valeur = [int][Console]::In.ReadLine()
$seuil = [int][Console]::In.ReadLine()

# À compléter : comparer la valeur au seuil et afficher l'état.
`,
    hints: [
      'Alerte dès que ($valeur -ge $seuil).',
      'Un seuil bien choisi évite le bruit autant que l’aveuglement.'
    ],
    examples: [
      { stdin: '92\n85', expected: 'etat : alerte', note: '92 % dépasse le seuil de 85 %.' }
    ],
    tests: [
      { label: 'Valeur confortable', stdin: '40\n85', expected: 'etat : normal' },
      { label: 'Exactement au seuil', stdin: '85\n85', expected: 'etat : alerte' },
      { label: 'Métrique calme', stdin: '10\n50', expected: 'etat : normal' }
    ],
    solution: `$valeur = [int][Console]::In.ReadLine()
$seuil = [int][Console]::In.ReadLine()

if ($valeur -ge $seuil) {
    Write-Output "etat : alerte"
} else {
    Write-Output "etat : normal"
}
`
  },
  {
    id: 'vm2-c6-e3',
    chapter: 6,
    level: 'n2',
    language: 'powershell',
    title: 'Gain du dédoublonnage',
    goal: 'Calculer la taille d’une sauvegarde après déduplication.',
    brief: '<p>Le script lit la taille <strong>brute</strong> d’une sauvegarde (Go), puis le ' +
      '<strong>taux de déduplication</strong> en pourcentage. Affichez ' +
      '<code>apres dedup : X Go</code> où <code>X</code> est la taille restante après déduplication ' +
      '(division entière).</p>',
    starter: `$brut = [int][Console]::In.ReadLine()
$taux = [int][Console]::In.ReadLine()

# À compléter : calculer la taille après déduplication et l'afficher.
`,
    hints: [
      'Taille restante = $brut * (100 - $taux) / 100.',
      'Arrondis avec [int]([math]::Floor(...)) pour un entier.'
    ],
    examples: [
      { stdin: '100\n40', expected: 'apres dedup : 60 Go', note: '40 % d’espace économisé.' }
    ],
    tests: [
      { label: 'Forte déduplication', stdin: '200\n50', expected: 'apres dedup : 100 Go' },
      { label: 'Aucun gain', stdin: '50\n0', expected: 'apres dedup : 50 Go' },
      { label: 'Gain partiel', stdin: '100\n25', expected: 'apres dedup : 75 Go' }
    ],
    solution: `$brut = [int][Console]::In.ReadLine()
$taux = [int][Console]::In.ReadLine()

$restant = [int]([math]::Floor($brut * (100 - $taux) / 100))
Write-Output ("apres dedup : " + $restant + " Go")
`
  }
];
