/**
 * Chapitre 4 — Stockage et gestion des volumes.
 */
'use strict';

module.exports = [
  {
    id: 'vm2-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'powershell',
    title: 'LVM en trois notions',
    goal: 'Associer PV, VG et LV à leur description.',
    brief: '<p>Le script lit un élément LVM : <code>pv</code>, <code>vg</code> ou <code>lv</code>. ' +
      'Affichez sa description : <code>pv : disque physique</code>, ' +
      '<code>vg : groupe de volumes</code> ou <code>lv : volume logique</code>.</p>',
    starter: `$element = [Console]::In.ReadLine()

# À compléter : avec un switch, afficher la description de l'élément LVM.
`,
    hints: [
      'PV = Physical Volume (disque ou partition).',
      'VG = Volume Group (pool) ; LV = Logical Volume (disque d’une VM).'
    ],
    examples: [
      { stdin: 'vg', expected: 'vg : groupe de volumes', note: 'Le pool de stockage.' }
    ],
    tests: [
      { label: 'Disque physique', stdin: 'pv', expected: 'pv : disque physique' },
      { label: 'Volume logique', stdin: 'lv', expected: 'lv : volume logique' },
      { label: 'Élément inconnu', stdin: 'x', expected: 'x : inconnu' }
    ],
    solution: `$element = [Console]::In.ReadLine()

switch ($element) {
    "pv" { Write-Output "pv : disque physique" }
    "vg" { Write-Output "vg : groupe de volumes" }
    "lv" { Write-Output "lv : volume logique" }
    default { Write-Output ($element + " : inconnu") }
}
`
  },
  {
    id: 'vm2-c4-e2',
    chapter: 4,
    level: 'n1',
    language: 'powershell',
    title: 'Surveiller l’espace d’un volume',
    goal: 'Calculer l’espace libre et alerter sur une saturation proche.',
    brief: '<p>Le script lit la <strong>capacité</strong> d’un volume (Go), puis l’espace ' +
      '<strong>utilisé</strong> (Go). Affichez <code>libre : X Go</code>. Si l’espace libre est ' +
      'inférieur à 10 Go, affichez en plus <code>alerte : espace faible</code>.</p>',
    starter: `$capacite = [int][Console]::In.ReadLine()
$utilise = [int][Console]::In.ReadLine()

# À compléter : afficher l'espace libre, puis une alerte sous 10 Go.
`,
    hints: [
      'Espace libre = $capacite - $utilise.',
      'Ajoutez une ligne d’alerte si le libre est inférieur à 10.'
    ],
    examples: [
      { stdin: '500\n100', expected: 'libre : 400 Go', note: '400 Go disponibles.' }
    ],
    tests: [
      { label: 'Volume presque plein', stdin: '500\n495', expected: 'libre : 5 Go\nalerte : espace faible' },
      { label: 'Tout juste au seuil', stdin: '500\n490', expected: 'libre : 10 Go' },
      { label: 'Volume vide', stdin: '1000\n0', expected: 'libre : 1000 Go' }
    ],
    solution: `$capacite = [int][Console]::In.ReadLine()
$utilise = [int][Console]::In.ReadLine()

$libre = $capacite - $utilise
Write-Output ("libre : " + $libre + " Go")
if ($libre -lt 10) {
    Write-Output "alerte : espace faible"
}
`
  },
  {
    id: 'vm2-c4-e3',
    chapter: 4,
    level: 'n2',
    language: 'powershell',
    title: 'Stratégie de sauvegarde GFS',
    goal: 'Associer une fréquence de sauvegarde à sa durée de rétention.',
    brief: '<p>Le script lit une <strong>fréquence</strong> : <code>quotidien</code>, ' +
      '<code>hebdo</code> ou <code>mensuel</code>. Affichez la rétention : ' +
      '<code>retention : 7 jours</code>, <code>retention : 4 semaines</code> ou ' +
      '<code>retention : 6 a 12 mois</code>.</p>',
    starter: `$frequence = [Console]::In.ReadLine()

# À compléter : avec un switch, afficher la rétention correspondante.
`,
    hints: [
      'GFS = Grandfather / Father / Son.',
      'Quotidien 7 jours ; hebdo 4 semaines ; mensuel 6 à 12 mois.'
    ],
    examples: [
      { stdin: 'hebdo', expected: 'retention : 4 semaines', note: 'Sauvegarde hebdomadaire.' }
    ],
    tests: [
      { label: 'Sauvegarde quotidienne', stdin: 'quotidien', expected: 'retention : 7 jours' },
      { label: 'Sauvegarde mensuelle', stdin: 'mensuel', expected: 'retention : 6 a 12 mois' },
      { label: 'Fréquence inconnue', stdin: 'annuel', expected: 'retention : inconnue' }
    ],
    solution: `$frequence = [Console]::In.ReadLine()

switch ($frequence) {
    "quotidien" { Write-Output "retention : 7 jours" }
    "hebdo" { Write-Output "retention : 4 semaines" }
    "mensuel" { Write-Output "retention : 6 a 12 mois" }
    default { Write-Output "retention : inconnue" }
}
`
  }
];
