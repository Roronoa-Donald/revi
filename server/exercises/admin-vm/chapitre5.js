/**
 * Chapitre 5 — Réseau virtualisé et segmentation.
 */
'use strict';

module.exports = [
  {
    id: 'vm2-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'powershell',
    title: 'Rôle des briques réseau',
    goal: 'Associer une brique réseau virtuelle à son usage.',
    brief: '<p>Le script lit une <strong>brique</strong> : <code>bridge</code>, <code>nat</code>, ' +
      '<code>vlan</code> ou <code>firewall</code>. Affichez son rôle : ' +
      '<code>role : switch virtuel</code>, <code>role : acces Internet</code>, ' +
      '<code>role : segmentation logique</code> ou <code>role : filtrage du trafic</code>.</p>',
    starter: `$brique = [Console]::In.ReadLine()

# À compléter : avec un switch, afficher le rôle de la brique.
`,
    hints: [
      'Le bridge est un switch virtuel ; le NAT donne l’accès Internet.',
      'Le VLAN segmente logiquement ; le pare-feu filtre le trafic.'
    ],
    examples: [
      { stdin: 'bridge', expected: 'role : switch virtuel', note: 'Le bridge relie VM et réseau physique.' }
    ],
    tests: [
      { label: 'Accès Internet', stdin: 'nat', expected: 'role : acces Internet' },
      { label: 'Segmentation', stdin: 'vlan', expected: 'role : segmentation logique' },
      { label: 'Filtrage', stdin: 'firewall', expected: 'role : filtrage du trafic' }
    ],
    solution: `$brique = [Console]::In.ReadLine()

switch ($brique) {
    "bridge" { Write-Output "role : switch virtuel" }
    "nat" { Write-Output "role : acces Internet" }
    "vlan" { Write-Output "role : segmentation logique" }
    "firewall" { Write-Output "role : filtrage du trafic" }
    default { Write-Output "role : inconnu" }
}
`
  },
  {
    id: 'vm2-c5-e2',
    chapter: 5,
    level: 'n1',
    language: 'powershell',
    title: 'Zone d’un VLAN',
    goal: 'Situer un identifiant de VLAN dans la topologie de l’entreprise.',
    brief: '<p>Le script lit un identifiant de <strong>VLAN</strong>. Affichez la zone : ' +
      '<code>vlan 10 : utilisateurs</code>, <code>vlan 20 : serveurs</code> ou ' +
      '<code>vlan 30 : DMZ</code>. Pour tout autre identifiant, affichez ' +
      '<code>vlan : inconnu</code>.</p>',
    starter: `$vlan = [int][Console]::In.ReadLine()

# À compléter : avec un switch sur $vlan, afficher la zone.
`,
    hints: [
      'Les utilisateurs sont sur le VLAN 10, les serveurs sur le 20.',
      'Les services exposés (web, mail) vont en DMZ, VLAN 30.'
    ],
    examples: [
      { stdin: '20', expected: 'vlan 20 : serveurs', note: 'Le VLAN des serveurs internes.' }
    ],
    tests: [
      { label: 'VLAN des utilisateurs', stdin: '10', expected: 'vlan 10 : utilisateurs' },
      { label: 'VLAN de la DMZ', stdin: '30', expected: 'vlan 30 : DMZ' },
      { label: 'VLAN inconnu', stdin: '99', expected: 'vlan : inconnu' }
    ],
    solution: `$vlan = [int][Console]::In.ReadLine()

switch ($vlan) {
    10 { Write-Output "vlan 10 : utilisateurs" }
    20 { Write-Output "vlan 20 : serveurs" }
    30 { Write-Output "vlan 30 : DMZ" }
    default { Write-Output "vlan : inconnu" }
}
`
  },
  {
    id: 'vm2-c5-e3',
    chapter: 5,
    level: 'n2',
    language: 'powershell',
    title: 'Flux autorisé entre zones',
    goal: 'N’autoriser entre LAN et DMZ que le strict nécessaire (port 443).',
    brief: '<p>Le script lit la <strong>zone source</strong>, la <strong>zone destination</strong> ' +
      '(chacune : <code>lan</code>, <code>dmz</code> ou <code>autre</code>) et le <strong>port</strong>. ' +
      'Un flux est autorisé s’il reste dans la même zone, ou s’il traverse LAN et DMZ sur le port 443. ' +
      'Sinon, affichezz <code>flux : filtre</code> ; sinon <code>flux : autorise</code>.</p>',
    starter: `$source = [Console]::In.ReadLine()
$destination = [Console]::In.ReadLine()
$port = [int][Console]::In.ReadLine()

# À compléter : appliquer la règle et afficher "flux : autorise" ou "flux : filtre".
`,
    hints: [
      'Même zone : toujours autorisé.',
      'Traversée LAN/DMZ : autorisée seulement sur le port 443.'
    ],
    examples: [
      { stdin: 'lan\ndmz\n443', expected: 'flux : autorise', note: 'Accès HTTPS du LAN vers la DMZ.' }
    ],
    tests: [
      { label: 'Port non autorisé', stdin: 'lan\ndmz\n80', expected: 'flux : filtre' },
      { label: 'Interne à la DMZ', stdin: 'dmz\ndmz\n22', expected: 'flux : autorise' },
      { label: 'Zone non autorisée', stdin: 'lan\nautre\n443', expected: 'flux : filtre' }
    ],
    solution: `$source = [Console]::In.ReadLine()
$destination = [Console]::In.ReadLine()
$port = [int][Console]::In.ReadLine()

$memeZone = ($source -eq $destination)
$traversee = (($source -eq "lan" -and $destination -eq "dmz") -or ($source -eq "dmz" -and $destination -eq "lan"))
if ($memeZone -or ($traversee -and $port -eq 443)) {
    Write-Output "flux : autorise"
} else {
    Write-Output "flux : filtre"
}
`
  }
];
