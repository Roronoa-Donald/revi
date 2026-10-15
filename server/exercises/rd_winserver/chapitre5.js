/**
 * Chapitre 5 — Virtualisation & VMware.
 *
 * Hyperviseur, modes réseau et surallocation de vCPU, en scripts PowerShell.
 */
'use strict';

module.exports = [
  {
    id: 'ws2-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'powershell',
    title: 'Type d’hyperviseur',
    goal: 'Classifier un produit selon qu’il s’installe sur le matériel ou sur un système hôte.',
    brief: '<p>Le script lit le <strong>type</strong> de l’hyperviseur (<code>1</code> ou ' +
      '<code>2</code>), puis le <strong>nom</strong> du produit. Affichez ' +
      '<code>produit : NOM (bare-metal)</code> pour le type 1 et ' +
      '<code>produit : NOM (heberge)</code> pour le type 2.</p>',
    starter: `$type = [int][Console]::In.ReadLine()
$produit = [Console]::In.ReadLine()

# À compléter : afficher "produit : NOM (bare-metal)" ou
# "produit : NOM (heberge)" selon le type.
`,
    hints: [
      'Un type 1 tourne directement sur le matériel : bare-metal.',
      'Le type 2 s’installe sur un OS existant : « heberge ».'
    ],
    examples: [
      { stdin: '1\nESXi', expected: 'produit : ESXi (bare-metal)', note: 'ESXi est un hyperviseur de type 1.' }
    ],
    tests: [
      { label: 'Hyperviseur hébergé', stdin: '2\nVirtualBox', expected: 'produit : VirtualBox (heberge)' },
      { label: 'Hyperviseur Microsoft', stdin: '1\nHyper-V', expected: 'produit : Hyper-V (bare-metal)' },
      { label: 'Poste de travail', stdin: '2\nWorkstation', expected: 'produit : Workstation (heberge)' }
    ],
    solution: `$type = [int][Console]::In.ReadLine()
$produit = [Console]::In.ReadLine()

if ($type -eq 1) {
    Write-Output ("produit : " + $produit + " (bare-metal)")
} else {
    Write-Output ("produit : " + $produit + " (heberge)")
}
`
  },
  {
    id: 'ws2-c5-e2',
    chapter: 5,
    level: 'n1',
    language: 'powershell',
    title: 'Mode réseau d’une VM',
    goal: 'Déduire l’accès Internet et l’accès au réseau local selon le mode de connexion.',
    brief: '<p>Le script lit un <strong>mode réseau</strong> (<code>nat</code>, <code>bridge</code> ou ' +
      '<code>host-only</code>). Affichez <code>internet : oui/non</code> puis <code>lan : oui/non</code>. ' +
      'NAT et Bridge donnent accès à Internet ; seul Bridge rend la VM accessible depuis le réseau ' +
      'local.</p>',
    starter: `$mode = [Console]::In.ReadLine()

# À compléter : afficher l'accès Internet puis l'accès au LAN
# selon le mode (nat, bridge, host-only).
`,
    hints: [
      'Un switch sur $mode associe chaque mode à ses deux réponses.',
      'NAT : Internet oui, LAN non. Bridge : Internet oui, LAN oui. Host-Only : Internet non, LAN non.'
    ],
    examples: [
      { stdin: 'nat', expected: 'internet : oui\nlan : non', note: 'La VM sort via l’hôte, pas d’accès entrant.' }
    ],
    tests: [
      { label: 'Mode pont', stdin: 'bridge', expected: 'internet : oui\nlan : oui' },
      { label: 'Réseau privé', stdin: 'host-only', expected: 'internet : non\nlan : non' },
      { label: 'Mode inconnu', stdin: 'inconnu', expected: 'internet : non\nlan : non' }
    ],
    solution: `$mode = [Console]::In.ReadLine()

switch ($mode) {
    "nat" { Write-Output "internet : oui"; Write-Output "lan : non" }
    "bridge" { Write-Output "internet : oui"; Write-Output "lan : oui" }
    "host-only" { Write-Output "internet : non"; Write-Output "lan : non" }
    default { Write-Output "internet : non"; Write-Output "lan : non" }
}
`
  },
  {
    id: 'ws2-c5-e3',
    chapter: 5,
    level: 'n2',
    language: 'powershell',
    title: 'Surallocation de vCPU',
    goal: 'Comparer vCPU alloués et cœurs physiques pour détecter une surallocation.',
    brief: '<p>Le script lit le total de <strong>vCPU</strong> alloués aux VM, puis le nombre de ' +
      '<strong>cœurs physiques</strong> de l’hôte. S’il y a plus de vCPU que de cœurs, la surallocation ' +
      'est active : affichez <code>surallocation : oui</code> puis <code>vcpu en exces : X</code>. ' +
      'Sinon, affichez <code>surallocation : non</code> puis <code>vcpu en exces : 0</code>.</p>',
    starter: `$vcpu = [int][Console]::In.ReadLine()
$coeurs = [int][Console]::In.ReadLine()

# À compléter : comparer $vcpu et $coeurs, puis afficher
# "surallocation : oui/non" et "vcpu en exces : X".
`,
    hints: [
      'Surallocation active quand ($vcpu -gt $coeurs).',
      'L’excédent vaut $vcpu - $coeurs ; il vaut 0 sinon.'
    ],
    examples: [
      { stdin: '32\n16', expected: 'surallocation : oui\nvcpu en exces : 16', note: 'Deux fois plus de vCPU que de cœurs.' }
    ],
    tests: [
      { label: 'Hôte confortable', stdin: '8\n16', expected: 'surallocation : non\nvcpu en exces : 0' },
      { label: 'Exactement égal', stdin: '16\n16', expected: 'surallocation : non\nvcpu en exces : 0' },
      { label: 'Forte surallocation', stdin: '48\n16', expected: 'surallocation : oui\nvcpu en exces : 32' }
    ],
    solution: `$vcpu = [int][Console]::In.ReadLine()
$coeurs = [int][Console]::In.ReadLine()

if ($vcpu -gt $coeurs) {
    Write-Output "surallocation : oui"
    Write-Output ("vcpu en exces : " + ($vcpu - $coeurs))
} else {
    Write-Output "surallocation : non"
    Write-Output "vcpu en exces : 0"
}
`
  }
];
