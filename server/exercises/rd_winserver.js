/**
 * Catalogue des 18 exercices d'administration Windows Server du cours
 * « RD WinServer » B2 (dossier `rd_winserver/`).
 *
 * Chaque fiche est un script PowerShell autonome lu sur l'entrée standard
 * (`[Console]::In.ReadLine()`) et rendu sur la sortie standard. Le langage
 * `powershell` n'est pas exécutable par la machine de développement (aucun
 * interpréteur, et pas dans la liste blanche du service d'exécution distant) :
 * `tests/exercise-solutions.test.js` ignore donc ces fiches, et l'intégrité du
 * catalogue est vérifiée structurellement, comme pour le cours de Java.
 *
 * Découpage : six modules de trois fiches, chacun dans son fichier. Les
 * identifiants suivent le schéma `ws2-cN-eM`.
 */
'use strict';

const exercices = [
  ...require('./rd_winserver/chapitre1'),
  ...require('./rd_winserver/chapitre2'),
  ...require('./rd_winserver/chapitre3'),
  ...require('./rd_winserver/chapitre4'),
  ...require('./rd_winserver/chapitre5'),
  ...require('./rd_winserver/chapitre6')
];

const testsSupplementaires = {
  'ws2-c1-e1': [
    { label: 'Sauvegarde unique', stdin: '1\n73', expected: 'total : 73 Go' },
    { label: 'Dernière sauvegarde vide', stdin: '3\n23\n14\n0', expected: 'total : 37 Go' }
  ],
  'ws2-c1-e2': [
    { label: 'Minimum de copies avec trois supports', stdin: '3\n3\noui', expected: '3-2-1 : conforme' },
    { label: 'Support unique malgré les copies', stdin: '5\n1\noui', expected: '3-2-1 : non conforme' }
  ],
  'ws2-c1-e3': [
    { label: 'Capacité exactement utilisée', stdin: '240\n240', expected: 'libre : 0 Go' },
    { label: 'Espace restant après écriture', stdin: '510\n125', expected: 'libre : 385 Go' }
  ],
  'ws2-c2-e1': [
    { label: 'Un dernier nœud actif', stdin: '2\n1', expected: 'actifs : 1\nservice : maintenu' },
    { label: 'Pannes et actifs distincts', stdin: '6\n2', expected: 'actifs : 4\nservice : maintenu' }
  ],
  'ws2-c2-e2': [
    { label: 'Moins de requêtes que de serveurs', stdin: '6\n2', expected: 'charge : 0 req/s' },
    { label: 'Répartition entière', stdin: '2\n18', expected: 'charge : 9 req/s' }
  ],
  'ws2-c2-e3': [
    { label: 'Avertissement parmi les critiques', stdin: '3\ncritique\nwarning\ncritique', expected: 'critiques : 2\netat : alerte' },
    { label: 'Critique isolé', stdin: '3\ninfo\ncritique\ninfo', expected: 'critiques : 1\netat : alerte' }
  ],
  'ws2-c3-e1': [
    { label: 'Moitié exacte', stdin: '6\n3', expected: 'quorum : perdu' },
    { label: 'Majorité sans unanimité', stdin: '7\n4', expected: 'quorum : atteint' }
  ],
  'ws2-c3-e2': [
    { label: 'Deux nœuds actifs', stdin: '2\nactif\nactif', expected: 'actifs : 2\ntype : active-active' },
    { label: 'Deux actifs et une veille', stdin: '3\nactif\nactif\nveille', expected: 'actifs : 2\ntype : active-passive' }
  ],
  'ws2-c3-e3': [
    { label: 'Requêtes moins nombreuses que les serveurs', stdin: '2\n5', expected: 'par serveur : 0\nnon reparties : 2' },
    { label: 'Division exacte entre quatre serveurs', stdin: '24\n4', expected: 'par serveur : 6\nnon reparties : 0' }
  ],
  'ws2-c4-e1': [
    { label: 'Échecs entourant une réussite', stdin: '3\nechec\nok\nechec', expected: 'echecs : 2\nmaintenance : requise' },
    { label: 'Un échec suivi d’une réussite', stdin: '2\nechec\nok', expected: 'echecs : 1\nmaintenance : requise' }
  ],
  'ws2-c4-e2': [
    { label: 'Seuil chaud', stdin: '060', expected: 'etat : chaud' },
    { label: 'Seuil dangereux', stdin: '085', expected: 'etat : danger' }
  ],
  'ws2-c5-e1': [
    { label: 'Type 1 avec un autre produit', stdin: '1\nXen', expected: 'produit : Xen (bare-metal)' },
    { label: 'Type 2 avec un autre produit', stdin: '2\nParallels', expected: 'produit : Parallels (heberge)' }
  ],
  'ws2-c5-e3': [
    { label: 'Égalité des vCPU et des cœurs', stdin: '12\n12', expected: 'surallocation : non\nvcpu en exces : 0' },
    { label: 'Excédent différent du total', stdin: '12\n6', expected: 'surallocation : oui\nvcpu en exces : 6' }
  ],
  'ws2-c6-e1': [
    { label: 'Premier jour à purger', stdin: '008', expected: 'snapshot : a purger' },
    { label: 'Six jours', stdin: '006', expected: 'snapshot : conserve' }
  ],
  'ws2-c6-e3': [
    { label: 'Capacité exacte avec VM vide', stdin: '100\n2\n100\n0', expected: 'total : 100 Go\nsauvegarde : planifiee' },
    { label: 'Dernière VM dépasse la capacité', stdin: '100\n2\n60\n50', expected: 'total : 110 Go\nsauvegarde : capacite insuffisante' }
  ]
};

for (const exercice of exercices) {
  const tests = testsSupplementaires[exercice.id];
  if (tests) exercice.tests = exercice.tests.concat(tests);
  if (exercice.id === 'ws2-c5-e2' || exercice.id === 'ws2-c6-e2') {
    exercice.verifyFirstExample = true;
  }
}

module.exports = exercices;
