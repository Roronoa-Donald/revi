/**
 * Chapitre 2 — Prérequis et architecture des hyperviseurs.
 */
'use strict';

module.exports = [
  {
    id: 'vm2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'powershell',
    title: 'Prérequis de virtualisation',
    goal: 'Vérifier les extensions CPU et la mémoire avant de virtualiser.',
    brief: '<p>Le script lit la présence des extensions de virtualisation <code>VT-x / AMD-V</code> ' +
      '(<code>oui</code>/<code>non</code>), puis la mémoire vive disponible en Go. Sans extensions, ' +
      'affichez <code>virtualisation : impossible</code>. Sinon, affichezz ' +
      '<code>virtualisation : possible</code> si la RAM atteint 8 Go, sinon ' +
      '<code>ram insuffisante</code>.</p>',
    starter: `$extensions = [Console]::In.ReadLine()
$ram = [int][Console]::In.ReadLine()

# À compléter : afficher l'état de la virtualisation selon les extensions
# et la mémoire disponible.
`,
    hints: [
      'Sans extensions CPU, l’hyperviseur ne peut pas isoler les VM : impossible.',
      'Avec extensions, vérifiez la RAM : au moins 8 Go.'
    ],
    examples: [
      { stdin: 'oui\n16', expected: 'virtualisation : possible', note: 'Extensions présentes, 16 Go de RAM.' }
    ],
    tests: [
      { label: 'Extensions absentes', stdin: 'non\n16', expected: 'virtualisation : impossible' },
      { label: 'Mémoire trop juste', stdin: 'oui\n4', expected: 'ram insuffisante' },
      { label: 'Configuration minimale', stdin: 'oui\n8', expected: 'virtualisation : possible' }
    ],
    solution: `$extensions = [Console]::In.ReadLine()
$ram = [int][Console]::In.ReadLine()

if ($extensions -eq "non") {
    Write-Output "virtualisation : impossible"
} elseif ($ram -ge 8) {
    Write-Output "virtualisation : possible"
} else {
    Write-Output "ram insuffisante"
}
`
  },
  {
    id: 'vm2-c2-e2',
    chapter: 2,
    level: 'n1',
    language: 'powershell',
    title: 'Nombre de VM tenables par la RAM',
    goal: 'Estimer combien de VM la mémoire de l’hôte peut accueillir.',
    brief: '<p>Le script lit la <strong>RAM de l’hôte</strong> (Go), puis la <strong>RAM prévue par ' +
      'VM</strong> (Go). Affichez <code>vms possibles : X</code> où <code>X</code> est la division ' +
      'entière de la mémoire par celle d’une VM.</p>',
    starter: `$ramHote = [int][Console]::In.ReadLine()
$ramVm = [int][Console]::In.ReadLine()

# À compléter : calculer la division entière et afficher "vms possibles : X".
`,
    hints: [
      'La RAM est la ressource la plus critique : elle est partagée sans élasticité.',
      'Division entière : [int]([math]::Floor($ramHote / $ramVm)).'
    ],
    examples: [
      { stdin: '64\n4', expected: 'vms possibles : 16', note: '64 Go pour des VM de 4 Go.' }
    ],
    tests: [
      { label: 'Serveur modeste', stdin: '16\n4', expected: 'vms possibles : 4' },
      { label: 'VM gourmandes', stdin: '32\n8', expected: 'vms possibles : 4' },
      { label: 'Reste perdu', stdin: '10\n4', expected: 'vms possibles : 2' }
    ],
    solution: `$ramHote = [int][Console]::In.ReadLine()
$ramVm = [int][Console]::In.ReadLine()

$possibles = [int]([math]::Floor($ramHote / $ramVm))
Write-Output ("vms possibles : " + $possibles)
`
  },
  {
    id: 'vm2-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'powershell',
    title: 'Pile KVM : rôle des composants',
    goal: 'Situer noyau, QEMU et libvirt dans la chaîne d’abstraction Linux.',
    brief: '<p>Le script lit un <strong>composant</strong> de la pile KVM : <code>noyau</code>, ' +
      '<code>qemu</code> ou <code>libvirt</code>. Affichez son rôle : ' +
      '<code>role : extensions CPU</code>, <code>role : execution des VM</code> ou ' +
      '<code>role : pilotage et API</code>.</p>',
    starter: `$composant = [Console]::In.ReadLine()

# À compléter : avec un switch, afficher le rôle du composant.
`,
    hints: [
      'Le noyau fournit l’accélération matérielle (extensions CPU).',
      'QEMU exécute les VM, libvirt pilote et expose une API.'
    ],
    examples: [
      { stdin: 'noyau', expected: 'role : extensions CPU', note: 'Le module noyau KVM.' }
    ],
    tests: [
      { label: 'Émulateur et orchestrateur', stdin: 'qemu', expected: 'role : execution des VM' },
      { label: 'Couche de gestion', stdin: 'libvirt', expected: 'role : pilotage et API' },
      { label: 'Composant inconnu', stdin: 'inconnu', expected: 'role : inconnu' }
    ],
    solution: `$composant = [Console]::In.ReadLine()

switch ($composant) {
    "noyau" { Write-Output "role : extensions CPU" }
    "qemu" { Write-Output "role : execution des VM" }
    "libvirt" { Write-Output "role : pilotage et API" }
    default { Write-Output "role : inconnu" }
}
`
  }
];
