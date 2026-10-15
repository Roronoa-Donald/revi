/**
 * Chapitre 6 — Snapshots, clones, templates et sauvegarde VM.
 *
 * Politique de snapshots, dépendance des clones et planification Veeam, en
 * scripts PowerShell.
 */
'use strict';

module.exports = [
  {
    id: 'ws2-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'powershell',
    title: 'Durée de vie d’un snapshot',
    goal: 'Décider si un instantané doit être purgé selon son ancienneté.',
    brief: '<p>Le script lit l’<strong>âge</strong> d’un snapshot en jours. Un snapshot ne doit pas ' +
      'rester longtemps en production : au-delà de 7 jours, affichez <code>snapshot : a purger</code> ; ' +
      'sinon <code>snapshot : conserve</code>.</p>',
    starter: `$age = [int][Console]::In.ReadLine()

# À compléter : afficher "snapshot : a purger" si l'âge dépasse 7 jours,
# sinon "snapshot : conserve".
`,
    hints: [
      'Comparez avec -gt : ($age -gt 7).',
      'Un snapshot récent (<= 7 jours) reste tolérable en production.'
    ],
    examples: [
      { stdin: '3', expected: 'snapshot : conserve', note: 'Trois jours : encore récent.' }
    ],
    tests: [
      { label: 'Snapshot ancien', stdin: '10', expected: 'snapshot : a purger' },
      { label: 'Limite exacte', stdin: '7', expected: 'snapshot : conserve' },
      { label: 'Snapshot oublié', stdin: '30', expected: 'snapshot : a purger' }
    ],
    solution: `$age = [int][Console]::In.ReadLine()

if ($age -gt 7) {
    Write-Output "snapshot : a purger"
} else {
    Write-Output "snapshot : conserve"
}
`
  },
  {
    id: 'ws2-c6-e2',
    chapter: 6,
    level: 'n1',
    language: 'powershell',
    title: 'Clone complet ou lié',
    goal: 'Déterminer si un clone survit à la suppression de sa VM source.',
    brief: '<p>Le script lit le <strong>type</strong> du clone (<code>complet</code> ou ' +
      '<code>lie</code>), puis si la VM <strong>source</strong> a été supprimée (<code>oui</code> ou ' +
      '<code>non</code>). Un clone complet reste autonome ; un clone lié dépend de la source. Affichez ' +
      '<code>clone : fonctionne</code> ou <code>clone : hors service</code>.</p>',
    starter: `$type = [Console]::In.ReadLine()
$sourceSupprimee = [Console]::In.ReadLine()

# À compléter : afficher "clone : fonctionne" ou "clone : hors service"
# selon le type et la suppression de la source.
`,
    hints: [
      'Un clone complet fonctionne toujours, même source supprimée.',
      'Un clone lié ne fonctionne plus si la source est supprimée.'
    ],
    examples: [
      { stdin: 'lie\nnon', expected: 'clone : fonctionne', note: 'Clone lié, source toujours présente.' }
    ],
    tests: [
      { label: 'Clone complet, source supprimée', stdin: 'complet\noui', expected: 'clone : fonctionne' },
      { label: 'Clone lié, source supprimée', stdin: 'lie\noui', expected: 'clone : hors service' },
      { label: 'Clone complet intact', stdin: 'complet\nnon', expected: 'clone : fonctionne' }
    ],
    solution: `$type = [Console]::In.ReadLine()
$sourceSupprimee = [Console]::In.ReadLine()

if ($type -eq "complet") {
    Write-Output "clone : fonctionne"
} elseif ($sourceSupprimee -eq "oui") {
    Write-Output "clone : hors service"
} else {
    Write-Output "clone : fonctionne"
}
`
  },
  {
    id: 'ws2-c6-e3',
    chapter: 6,
    level: 'n2',
    language: 'powershell',
    title: 'Planification de la sauvegarde Veeam',
    goal: 'Totaliser et comparer le volume des VM à sauvegarder à la capacité de la cible.',
    brief: '<p>Le script lit la <strong>capacité</strong> de la cible (Go), puis un entier ' +
      '<code>n</code> et <code>n</code> tailles de VM (Go). Affichez <code>total : X Go</code>, puis ' +
      '<code>sauvegarde : planifiee</code> si le total tient dans la capacité, sinon ' +
      '<code>sauvegarde : capacite insuffisante</code>.</p>',
    starter: `$capacite = [int][Console]::In.ReadLine()
$n = [int][Console]::In.ReadLine()
$total = 0
for ($i = 0; $i -lt $n; $i++) {
    # À compléter : lire la taille de la VM et l'ajouter à $total.
}

# À compléter : afficher le total, puis comparer à la capacité.
`,
    hints: [
      'Lisez chaque taille avec [int][Console]::In.ReadLine().',
      'La sauvegarde tient si ($total -le $capacite).'
    ],
    examples: [
      { stdin: '1000\n2\n300\n400', expected: 'total : 700 Go\nsauvegarde : planifiee', note: '700 Go sur une cible de 1000 Go.' }
    ],
    tests: [
      { label: 'Cible trop petite', stdin: '500\n3\n200\n200\n200', expected: 'total : 600 Go\nsauvegarde : capacite insuffisante' },
      { label: 'Cible large', stdin: '1000\n3\n100\n100\n100', expected: 'total : 300 Go\nsauvegarde : planifiee' },
      { label: 'Cible exactement remplie', stdin: '50\n1\n50', expected: 'total : 50 Go\nsauvegarde : planifiee' }
    ],
    solution: `$capacite = [int][Console]::In.ReadLine()
$n = [int][Console]::In.ReadLine()
$total = 0
for ($i = 0; $i -lt $n; $i++) {
    $taille = [int][Console]::In.ReadLine()
    $total += $taille
}
Write-Output ("total : " + $total + " Go")
if ($total -le $capacite) {
    Write-Output "sauvegarde : planifiee"
} else {
    Write-Output "sauvegarde : capacite insuffisante"
}
`
  }
];
