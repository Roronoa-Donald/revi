/**
 * Chapitre 4 — Maintenance de Windows Server.
 *
 * Suivi des mises à jour, seuils de température et planning, en scripts
 * PowerShell lus sur l'entrée standard.
 */
'use strict';

module.exports = [
  {
    id: 'ws2-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'powershell',
    title: 'Suivi des mises à jour',
    goal: 'Compter les échecs parmi une liste de mises à jour et décider d’une maintenance.',
    brief: '<p>Le script lit un entier <code>n</code>, puis <code>n</code> résultats de mise à jour ' +
      '(<code>ok</code> ou <code>echec</code>). Affichez <code>echecs : X</code>, puis ' +
      '<code>maintenance : requise</code> s’il y a au moins un échec, sinon ' +
      '<code>maintenance : a jour</code>.</p>',
    starter: `$n = [int][Console]::In.ReadLine()
$echecs = 0
for ($i = 0; $i -lt $n; $i++) {
    $res = [Console]::In.ReadLine()
    # À compléter : incrémenter $echecs si $res vaut "echec".
}

# À compléter : afficher le nombre d'échecs puis l'état de maintenance.
`,
    hints: [
      'Comparez avec -eq : ($res -eq "echec").',
      'Choisissez la ligne d’état selon ($echecs -gt 0).'
    ],
    examples: [
      { stdin: '3\nok\nechec\nok', expected: 'echecs : 1\nmaintenance : requise', note: 'Une mise à jour en échec.' }
    ],
    tests: [
      { label: 'Tout est à jour', stdin: '2\nok\nok', expected: 'echecs : 0\nmaintenance : a jour' },
      { label: 'Une seule mise à jour', stdin: '1\nechec', expected: 'echecs : 1\nmaintenance : requise' },
      { label: 'Deux échecs sur quatre', stdin: '4\nechec\nechec\nok\nok', expected: 'echecs : 2\nmaintenance : requise' }
    ],
    solution: `$n = [int][Console]::In.ReadLine()
$echecs = 0
for ($i = 0; $i -lt $n; $i++) {
    $res = [Console]::In.ReadLine()
    if ($res -eq "echec") {
        $echecs++
    }
}
Write-Output ("echecs : " + $echecs)
if ($echecs -gt 0) {
    Write-Output "maintenance : requise"
} else {
    Write-Output "maintenance : a jour"
}
`
  },
  {
    id: 'ws2-c4-e2',
    chapter: 4,
    level: 'n1',
    language: 'powershell',
    title: 'Seuil de température CPU',
    goal: 'Classer une mesure dans l’une des quatre plages de surveillance du matériel.',
    brief: '<p>Le script lit une <strong>température</strong> de processeur en degrés Celsius. ' +
      'Affichez <code>etat : normal</code> en dessous de 60, <code>etat : chaud</code> de 60 à 84, ' +
      '<code>etat : danger</code> de 85 à 94, et <code>etat : critique</code> à partir de 95.</p>',
    starter: `$temp = [int][Console]::In.ReadLine()

# À compléter : afficher "etat : normal", "etat : chaud",
# "etat : danger" ou "etat : critique" selon la température.
`,
    hints: [
      'Traitez les cas les plus graves d’abord, en descendant : -ge 95, puis -ge 85, etc.',
      'Utilisez if / elseif / else : chaque branche couvre une plage.'
    ],
    examples: [
      { stdin: '45', expected: 'etat : normal', note: '45 °C : plage normale.' }
    ],
    tests: [
      { label: 'Serveur chaud', stdin: '70', expected: 'etat : chaud' },
      { label: 'Température dangereuse', stdin: '88', expected: 'etat : danger' },
      { label: 'Température critique', stdin: '97', expected: 'etat : critique' }
    ],
    solution: `$temp = [int][Console]::In.ReadLine()

if ($temp -ge 95) {
    Write-Output "etat : critique"
} elseif ($temp -ge 85) {
    Write-Output "etat : danger"
} elseif ($temp -ge 60) {
    Write-Output "etat : chaud"
} else {
    Write-Output "etat : normal"
}
`
  },
  {
    id: 'ws2-c4-e3',
    chapter: 4,
    level: 'n2',
    language: 'powershell',
    title: 'Planning de maintenance',
    goal: 'Associer une fréquence à l’action correspondante avec switch.',
    brief: '<p>Le script lit une <strong>fréquence</strong> parmi <code>hebdomadaire</code>, ' +
      '<code>mensuelle</code>, <code>trimestrielle</code> ou <code>annuelle</code>. Affichez l’action ' +
      'correspondante : <code>action : analyse des logs</code>, <code>action : test de sauvegarde</code>, ' +
      '<code>action : test PRA</code> ou <code>action : audit securite</code>. Pour toute autre valeur, ' +
      'affichez <code>action : inconnue</code>.</p>',
    starter: `$freq = [Console]::In.ReadLine()

# À compléter : avec un switch sur $freq, afficher l'action correspondante.
`,
    hints: [
      'PowerShell dispose d’un switch : switch ($freq) { "hebdomadaire" { ... } ... }.',
      'Prévoyez une branche default pour les valeurs non reconnues.'
    ],
    examples: [
      { stdin: 'mensuelle', expected: 'action : test de sauvegarde', note: 'Le mensuel teste les sauvegardes.' }
    ],
    tests: [
      { label: 'Fréquence hebdomadaire', stdin: 'hebdomadaire', expected: 'action : analyse des logs' },
      { label: 'Fréquence trimestrielle', stdin: 'trimestrielle', expected: 'action : test PRA' },
      { label: 'Fréquence annuelle', stdin: 'annuelle', expected: 'action : audit securite' }
    ],
    solution: `$freq = [Console]::In.ReadLine()

switch ($freq) {
    "hebdomadaire" { Write-Output "action : analyse des logs" }
    "mensuelle" { Write-Output "action : test de sauvegarde" }
    "trimestrielle" { Write-Output "action : test PRA" }
    "annuelle" { Write-Output "action : audit securite" }
    default { Write-Output "action : inconnue" }
}
`
  }
];
