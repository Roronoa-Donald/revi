/**
 * Catalogue des 18 exercices d'administration de machines virtuelles du cours
 * « Admin VM » B2 (dossier `admin-vm/`).
 *
 * Chaque fiche est un script PowerShell lu sur l'entrée standard.
 *
 * Découpage : six modules de trois fiches (`vm2-cN-eM`).
 */
'use strict';

const exercices = [
  ...require('./admin-vm/chapitre1'),
  ...require('./admin-vm/chapitre2'),
  ...require('./admin-vm/chapitre3'),
  ...require('./admin-vm/chapitre4'),
  ...require('./admin-vm/chapitre5'),
  ...require('./admin-vm/chapitre6')
];

const testsSupplementaires = {
  'vm2-c2-e1': [
    { label: 'Extensions absentes et mémoire faible', stdin: 'non\n5', expected: 'virtualisation : impossible' },
    { label: 'Juste sous le minimum', stdin: 'oui\n7', expected: 'ram insuffisante' }
  ],
  'vm2-c2-e2': [
    { label: 'Division entière sans arrondi au plus proche', stdin: '11\n4', expected: 'vms possibles : 2' },
    { label: 'RAM insuffisante pour une VM', stdin: '4\n8', expected: 'vms possibles : 0' }
  ],
  'vm2-c3-e2': [
    { label: 'Maintenance non listée', stdin: 'maintenance preventive', expected: 'tache : inconnue' },
    { label: 'Décommissionnement non listé', stdin: 'decommissionnement', expected: 'tache : inconnue' }
  ],
  'vm2-c4-e2': [
    { label: 'Un Go sous le seuil', stdin: '50\n41', expected: 'libre : 9 Go\nalerte : espace faible' }
  ],
  'vm2-c5-e3': [
    { label: 'Interne au LAN', stdin: 'lan\nlan\n80', expected: 'flux : autorise' },
    { label: 'Interne à une autre zone', stdin: 'autre\nautre\n22', expected: 'flux : autorise' },
    { label: 'HTTPS de la DMZ vers le LAN', stdin: 'dmz\nlan\n443', expected: 'flux : autorise' }
  ],
  'vm2-c6-e1': [
    { label: 'Majorité simple sans deux tiers', stdin: '5\n3', expected: 'quorum : atteint' }
  ],
  'vm2-c6-e2': [
    { label: 'Valeur supérieure au seuil', stdin: '61\n60', expected: 'etat : alerte' }
  ],
  'vm2-c6-e3': [
    { label: 'Division entière avec reste', stdin: '111\n40', expected: 'apres dedup : 66 Go' }
  ]
};

const testsHorsEnonce = {
  'vm2-c2-e3': { stdin: 'inconnu', expected: 'role : inconnu' },
  'vm2-c4-e1': { stdin: 'x', expected: 'x : inconnu' },
  'vm2-c4-e3': { stdin: 'annuel', expected: 'retention : inconnue' }
};

const exemplesNotes = new Set([
  'vm2-c1-e3', 'vm2-c2-e3', 'vm2-c4-e1', 'vm2-c4-e3',
  'vm2-c5-e1', 'vm2-c5-e2', 'vm2-c5-e3'
]);

for (const exercice of exercices) {
  if (exemplesNotes.has(exercice.id)) exercice.verifyFirstExample = true;
  const horsEnonce = testsHorsEnonce[exercice.id];
  if (horsEnonce) {
    exercice.tests = exercice.tests.filter(test => test.stdin !== horsEnonce.stdin || test.expected !== horsEnonce.expected);
  }
  for (const test of testsSupplementaires[exercice.id] || []) {
    if (!exercice.tests.some(existant => existant.stdin === test.stdin && existant.expected === test.expected)) {
      exercice.tests.push(test);
    }
  }
}

module.exports = exercices;
