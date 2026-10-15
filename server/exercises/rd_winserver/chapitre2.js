/**
 * Chapitre 2 — Haute disponibilité.
 *
 * Redondance, basculement, répartition de charge et supervision, en scripts
 * PowerShell lus sur l'entrée standard.
 */
'use strict';

module.exports = [
  {
    id: 'ws2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'powershell',
    title: 'Nœuds encore actifs',
    goal: 'Calculer la capacité restante après une panne et décider si le service tient.',
    brief: '<p>Le script lit le nombre total de <strong>nœuds</strong>, puis le nombre de nœuds ' +
      '<strong>en panne</strong>. Affichez d’abord <code>actifs : X</code> (nœuds restants), puis ' +
      '<code>service : maintenu</code> s’il reste au moins un nœud, sinon ' +
      '<code>service : interrompu</code>.</p>',
    starter: `$total = [int][Console]::In.ReadLine()
$enPanne = [int][Console]::In.ReadLine()

$actifs = $total - $enPanne

# À compléter : afficher "actifs : X", puis "service : maintenu"
# ou "service : interrompu" selon le nombre de nœuds restants.
`,
    hints: [
      'Le nombre de nœuds restants vaut $total - $enPanne.',
      'Affichez sur deux lignes : Write-Output "actifs : $actifs" puis la ligne d’état.'
    ],
    examples: [
      { stdin: '3\n1', expected: 'actifs : 2\nservice : maintenu', note: 'Trois nœuds, un en panne.' }
    ],
    tests: [
      { label: 'Aucune panne', stdin: '2\n0', expected: 'actifs : 2\nservice : maintenu' },
      { label: 'Dernier nœud perdu', stdin: '1\n1', expected: 'actifs : 0\nservice : interrompu' },
      { label: 'Cluster large', stdin: '5\n2', expected: 'actifs : 3\nservice : maintenu' }
    ],
    solution: `$total = [int][Console]::In.ReadLine()
$enPanne = [int][Console]::In.ReadLine()

$actifs = $total - $enPanne
Write-Output ("actifs : " + $actifs)
if ($actifs -ge 1) {
    Write-Output "service : maintenu"
} else {
    Write-Output "service : interrompu"
}
`
  },
  {
    id: 'ws2-c2-e2',
    chapter: 2,
    level: 'n1',
    language: 'powershell',
    title: 'Charge par serveur',
    goal: 'Répartir un volume de requêtes entre plusieurs serveurs actifs.',
    brief: '<p>Le script lit le nombre de <strong>serveurs</strong>, puis le nombre total de ' +
      '<strong>requêtes</strong> à répartir. Affichez <code>charge : X req/s</code> où <code>X</code> ' +
      'est le nombre entier de requêtes par serveur (division entière).</p>',
    starter: `$serveurs = [int][Console]::In.ReadLine()
$requetes = [int][Console]::In.ReadLine()

# À compléter : calculer la charge entière par serveur, puis afficher
# "charge : X req/s".
`,
    hints: [
      'La division entière s’obtient avec [math]::Floor($requetes / $serveurs).',
      'Enveloppez le résultat dans [int] pour obtenir un entier propre.'
    ],
    examples: [
      { stdin: '3\n1200', expected: 'charge : 400 req/s', note: '1200 requêtes sur 3 serveurs.' }
    ],
    tests: [
      { label: 'Deux serveurs', stdin: '2\n800', expected: 'charge : 400 req/s' },
      { label: 'Quatre serveurs', stdin: '4\n1000', expected: 'charge : 250 req/s' },
      { label: 'Aucune requête', stdin: '5\n0', expected: 'charge : 0 req/s' }
    ],
    solution: `$serveurs = [int][Console]::In.ReadLine()
$requetes = [int][Console]::In.ReadLine()

$charge = [int]([math]::Floor($requetes / $serveurs))
Write-Output ("charge : " + $charge + " req/s")
`
  },
  {
    id: 'ws2-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'powershell',
    title: 'Analyse des alertes de supervision',
    goal: 'Parcourir des événements et déclencher une alerte au bon seuil.',
    brief: '<p>Le script lit un entier <code>n</code>, puis <code>n</code> niveaux de gravité ' +
      '(<code>info</code>, <code>warning</code> ou <code>critique</code>). Comptez les événements ' +
      '<strong>critiques</strong>, affichez <code>critiques : X</code>, puis <code>etat : alerte</code> ' +
      's’il y en a au moins un, sinon <code>etat : normal</code>.</p>',
    starter: `$n = [int][Console]::In.ReadLine()
$critiques = 0
for ($i = 0; $i -lt $n; $i++) {
    $sev = [Console]::In.ReadLine()
    # À compléter : incrémenter $critiques si $sev vaut "critique".
}

# À compléter : afficher "critiques : X" puis l'état "alerte" ou "normal".
`,
    hints: [
      'La comparaison de chaînes utilise -eq : ($sev -eq "critique").',
      'Affichez $critiques puis testez ($critiques -gt 0) pour choisir l’état.'
    ],
    examples: [
      { stdin: '3\ninfo\ncritique\nwarning', expected: 'critiques : 1\netat : alerte', note: 'Un seul événement critique.' }
    ],
    tests: [
      { label: 'Aucune alerte', stdin: '2\ninfo\ninfo', expected: 'critiques : 0\netat : normal' },
      { label: 'Une seule ligne', stdin: '1\ncritique', expected: 'critiques : 1\netat : alerte' },
      { label: 'Plusieurs critiques', stdin: '4\ncritique\ncritique\ninfo\ncritique', expected: 'critiques : 3\netat : alerte' }
    ],
    solution: `$n = [int][Console]::In.ReadLine()
$critiques = 0
for ($i = 0; $i -lt $n; $i++) {
    $sev = [Console]::In.ReadLine()
    if ($sev -eq "critique") {
        $critiques++
    }
}
Write-Output ("critiques : " + $critiques)
if ($critiques -gt 0) {
    Write-Output "etat : alerte"
} else {
    Write-Output "etat : normal"
}
`
  }
];
