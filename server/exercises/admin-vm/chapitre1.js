/**
 * Chapitre 1 — Introduction à la virtualisation.
 *
 * Scripts d'administration PowerShell lus sur l'entrée standard. Le langage
 * `powershell` n'est pas exécutable localement (ni dans la liste blanche) :
 * vérification structurelle, comme pour `rd_winserver` et `rd_java`.
 */
'use strict';

module.exports = [
  {
    id: 'vm2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'powershell',
    title: 'Total de VM à héberger',
    goal: 'Consolider plusieurs serveurs virtuels : premier calcul d’infrastructure.',
    brief: '<p>Le script lit le nombre de <strong>serveurs</strong>, puis le nombre de <strong>VM par ' +
      'serveur</strong>. Affichez <code>vms : X</code> où <code>X</code> est le total de machines ' +
      'virtuelles hébergées.</p>',
    starter: `$serveurs = [int][Console]::In.ReadLine()
$parServeur = [int][Console]::In.ReadLine()

# À compléter : calculer le total et afficher "vms : X".
`,
    hints: [
      'Le total vaut $serveurs * $parServeur.',
      'PowerShell affiche avec Write-Output ; concaténez texte et valeur.'
    ],
    examples: [
      { stdin: '4\n5', expected: 'vms : 20', note: '4 serveurs de 5 VM.' }
    ],
    tests: [
      { label: 'Un seul serveur', stdin: '1\n12', expected: 'vms : 12' },
      { label: 'Trois serveurs', stdin: '3\n4', expected: 'vms : 12' },
      { label: 'Aucune VM', stdin: '5\n0', expected: 'vms : 0' }
    ],
    solution: `$serveurs = [int][Console]::In.ReadLine()
$parServeur = [int][Console]::In.ReadLine()

$total = $serveurs * $parServeur
Write-Output ("vms : " + $total)
`
  },
  {
    id: 'vm2-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'powershell',
    title: 'Type d’hyperviseur',
    goal: 'Classer une solution selon qu’elle vise la production ou les tests.',
    brief: '<p>Le script lit le <strong>type</strong> de l’hyperviseur (<code>1</code> ou ' +
      '<code>2</code>), puis le <strong>nom</strong> de la solution. Affichez ' +
      '<code>solution : NOM (production)</code> pour le type 1 et ' +
      '<code>solution : NOM (test)</code> pour le type 2.</p>',
    starter: `$type = [int][Console]::In.ReadLine()
$nom = [Console]::In.ReadLine()

# À compléter : afficher "solution : NOM (production)" ou
# "solution : NOM (test)" selon le type.
`,
    hints: [
      'Le type 1 (bare-metal) vise la production.',
      'Le type 2 (hébergé) sert surtout aux tests et à la formation.'
    ],
    examples: [
      { stdin: '1\nESXi', expected: 'solution : ESXi (production)', note: 'ESXi vise la production.' }
    ],
    tests: [
      { label: 'Solution de poste', stdin: '2\nVirtualBox', expected: 'solution : VirtualBox (test)' },
      { label: 'Proxmox', stdin: '1\nProxmox', expected: 'solution : Proxmox (production)' },
      { label: 'Poste de travail', stdin: '2\nWorkstation', expected: 'solution : Workstation (test)' }
    ],
    solution: `$type = [int][Console]::In.ReadLine()
$nom = [Console]::In.ReadLine()

if ($type -eq 1) {
    Write-Output ("solution : " + $nom + " (production)")
} else {
    Write-Output ("solution : " + $nom + " (test)")
}
`
  },
  {
    id: 'vm2-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'powershell',
    title: 'Grands types de virtualisation',
    goal: 'Associer un domaine de virtualisation à son exemple.',
    brief: '<p>Le script lit un <strong>domaine</strong> : <code>serveur</code>, <code>poste</code>, ' +
      '<code>stockage</code> ou <code>reseau</code>. Affichez l’exemple correspondant : ' +
      '<code>exemple : Proxmox</code>, <code>exemple : VMware Horizon</code>, ' +
      '<code>exemple : NAS/SAN</code> ou <code>exemple : pfSense</code>.</p>',
    starter: `$domaine = [Console]::In.ReadLine()

# À compléter : avec un switch sur $domaine, afficher l'exemple correspondant.
`,
    hints: [
      'Serveur → Proxmox ; Poste (VDI) → VMware Horizon.',
      'Stockage → NAS/SAN ; Réseau → pfSense.'
    ],
    examples: [
      { stdin: 'serveur', expected: 'exemple : Proxmox', note: 'La virtualisation de serveurs.' }
    ],
    tests: [
      { label: 'Postes virtuels', stdin: 'poste', expected: 'exemple : VMware Horizon' },
      { label: 'Stockage mutualisé', stdin: 'stockage', expected: 'exemple : NAS/SAN' },
      { label: 'Réseau virtualisé', stdin: 'reseau', expected: 'exemple : pfSense' }
    ],
    solution: `$domaine = [Console]::In.ReadLine()

switch ($domaine) {
    "serveur" { Write-Output "exemple : Proxmox" }
    "poste" { Write-Output "exemple : VMware Horizon" }
    "stockage" { Write-Output "exemple : NAS/SAN" }
    "reseau" { Write-Output "exemple : pfSense" }
    default { Write-Output "exemple : inconnu" }
}
`
  }
];
