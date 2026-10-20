/**
 * Chapitre 3 — Cycle de vie et allocation des ressources des VM.
 */
'use strict';

module.exports = [
  {
    id: 'vm2-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'powershell',
    title: 'Surallocation de vCPU',
    goal: 'Détecter une allocation CPU excessive sur un hôte.',
    brief: '<p>Le script lit le total de <strong>vCPU</strong> alloués aux VM, puis le nombre de ' +
      '<strong>cœurs physiques</strong>. S’il y a plus de vCPU que de cœurs : ' +
      '<code>surallocation : oui</code> puis <code>exces : X</code>. Sinon ' +
      '<code>surallocation : non</code> puis <code>exces : 0</code>.</p>',
    starter: `$vcpu = [int][Console]::In.ReadLine()
$coeurs = [int][Console]::In.ReadLine()

# À compléter : afficher "surallocation : oui/non" puis "exces : X".
`,
    hints: [
      'Surallocation quand ($vcpu -gt $coeurs).',
      'L’excédent vaut $vcpu - $coeurs.'
    ],
    examples: [
      { stdin: '24\n16', expected: 'surallocation : oui\nexces : 8', note: '8 vCPU de trop.' }
    ],
    tests: [
      { label: 'Hôte confortable', stdin: '8\n16', expected: 'surallocation : non\nexces : 0' },
      { label: 'Égalité parfaite', stdin: '16\n16', expected: 'surallocation : non\nexces : 0' },
      { label: 'Forte pression', stdin: '64\n16', expected: 'surallocation : oui\nexces : 48' }
    ],
    solution: `$vcpu = [int][Console]::In.ReadLine()
$coeurs = [int][Console]::In.ReadLine()

if ($vcpu -gt $coeurs) {
    Write-Output "surallocation : oui"
    Write-Output ("exces : " + ($vcpu - $coeurs))
} else {
    Write-Output "surallocation : non"
    Write-Output "exces : 0"
}
`
  },
  {
    id: 'vm2-c3-e2',
    chapter: 3,
    level: 'n1',
    language: 'powershell',
    title: 'Phase du cycle de vie',
    goal: 'Associer chaque phase du cycle de vie d’une VM à sa tâche.',
    brief: '<p>Le script lit une <strong>phase</strong> : <code>conception</code>, ' +
      '<code>provisioning</code>, <code>exploitation</code> ou <code>retrait</code>. Affichez la ' +
      'tâche : <code>tache : definir les besoins</code>, <code>tache : allouer les ressources</code>, ' +
      '<code>tache : superviser et sauvegarder</code> ou <code>tache : archiver et nettoyer</code>.</p>',
    starter: `$phase = [Console]::In.ReadLine()

# À compléter : avec un switch, afficher la tâche de la phase.
`,
    hints: [
      'Conception → définir les besoins ; Provisioning → allouer les ressources.',
      'Exploitation → superviser ; Retrait → archiver et nettoyer.'
    ],
    examples: [
      { stdin: 'provisioning', expected: 'tache : allouer les ressources', note: 'La création des ressources.' }
    ],
    tests: [
      { label: 'Phase de conception', stdin: 'conception', expected: 'tache : definir les besoins' },
      { label: 'Fin de vie', stdin: 'retrait', expected: 'tache : archiver et nettoyer' },
      { label: 'Phase inconnue', stdin: 'autre', expected: 'tache : inconnue' }
    ],
    solution: `$phase = [Console]::In.ReadLine()

switch ($phase) {
    "conception" { Write-Output "tache : definir les besoins" }
    "provisioning" { Write-Output "tache : allouer les ressources" }
    "exploitation" { Write-Output "tache : superviser et sauvegarder" }
    "retrait" { Write-Output "tache : archiver et nettoyer" }
    default { Write-Output "tache : inconnue" }
}
`
  },
  {
    id: 'vm2-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'powershell',
    title: 'Capacité utile pour les VM',
    goal: 'Retirer la mémoire réservée au système avant de compter les VM.',
    brief: '<p>Le script lit la <strong>RAM de l’hôte</strong> (Go), la <strong>RAM réservée au ' +
      'système</strong> (Go) et la <strong>RAM par VM</strong> (Go). Affichez ' +
      '<code>capacite : X</code> où <code>X</code> est le nombre entier de VM tenables par la mémoire ' +
      'restante.</p>',
    starter: `$ramHote = [int][Console]::In.ReadLine()
$ramSysteme = [int][Console]::In.ReadLine()
$ramVm = [int][Console]::In.ReadLine()

# À compléter : calculer la capacité utile et afficher "capacite : X".
`,
    hints: [
      'Mémoire utile = $ramHote - $ramSysteme.',
      'Capacité = division entière de la mémoire utile par $ramVm.'
    ],
    examples: [
      { stdin: '64\n8\n4', expected: 'capacite : 14', note: '56 Go utiles pour des VM de 4 Go.' }
    ],
    tests: [
      { label: 'Hôte modeste', stdin: '16\n4\n4', expected: 'capacite : 3' },
      { label: 'Grosses VM', stdin: '128\n8\n16', expected: 'capacite : 7' },
      { label: 'Peu de mémoire utile', stdin: '8\n6\n4', expected: 'capacite : 0' }
    ],
    solution: `$ramHote = [int][Console]::In.ReadLine()
$ramSysteme = [int][Console]::In.ReadLine()
$ramVm = [int][Console]::In.ReadLine()

$utile = $ramHote - $ramSysteme
$capacite = [int]([math]::Floor($utile / $ramVm))
Write-Output ("capacite : " + $capacite)
`
  }
];
