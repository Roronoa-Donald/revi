/**
 * Chapitre 5 — Effets de bord (useEffect) et requêtes asynchrones.
 *
 * Exercices exécutables en JavaScript (Node.js), préfixe `rx2`.
 */
'use strict';

module.exports = [
  {
    id: 'rx2-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'javascript',
    title: 'Détection de changement de dépendances (useEffect)',
    goal: 'Déterminer si un effet doit s\'exécuter en comparant les dépendances de deux rendus successifs.',
    brief: '<p>React compare chaque valeur du tableau de dépendances de <code>useEffect</code> par égalité stricte (<code>Object.is</code>). Le script lit deux lignes : les valeurs des dépendances au rendu 1 (ligne 1), puis au rendu 2 (ligne 2), séparées par des espaces. Si au moins une valeur a changé, affichez <code>EFFET DECLENCHE</code> ; sinon, affichez <code>EFFET IGNORE</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const dep1 = (lignes[0] || '').split(' ');
const dep2 = (lignes[1] || '').split(' ');

// À compléter : comparer les dépendances terme à terme
`,
    hints: [
      'Comparez chaque paire dep1[i] et dep2[i] avec Object.is ou ===.',
      'Dès qu\'une différence apparaît, l\'effet doit s\'exécuter.'
    ],
    examples: [
      { stdin: '10 Paris\n10 Lyon\n', expected: 'EFFET DECLENCHE', note: 'La seconde dépendance a changé (Paris -> Lyon).' }
    ],
    tests: [
      { label: 'Dépendances identiques', stdin: 'user42 active\nuser42 active\n', expected: 'EFFET IGNORE' },
      { label: 'Changement au milieu d une liste', stdin: 'alpha beta gamma\nalpha delta gamma\n', expected: 'EFFET DECLENCHE' },
      { label: 'Valeur numérique identique', stdin: '100\n100\n', expected: 'EFFET IGNORE' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const dep1 = (lignes[0] || '').trim().split(' ');
const dep2 = (lignes[1] || '').trim().split(' ');

let change = false;
if (dep1.length !== dep2.length) {
  change = true;
} else {
  for (let i = 0; i < dep1.length; i++) {
    if (!Object.is(dep1[i], dep2[i])) {
      change = true;
      break;
    }
  }
}

console.log(change ? 'EFFET DECLENCHE' : 'EFFET IGNORE');
`
  },
  {
    id: 'rx2-c5-e2',
    chapter: 5,
    level: 'n1',
    language: 'javascript',
    title: 'Machine d\'états d\'une requête API',
    goal: 'Afficher le composant adapté au statut du chargement : en attente, succès ou échec.',
    brief: '<p>Lors d\'un appel API asynchrone dans un <code>useEffect</code>, l\'UI gère trois états : chargement, succès et erreur. Le script lit une ligne <code>etat donnee</code> où etat vaut <code>LOADING</code>, <code>SUCCESS</code> ou <code>ERROR</code>. Affichez :<br>- <code>&lt;Spinner label="Chargement en cours..." /&gt;</code> pour LOADING<br>- <code>&lt;DataView result="DONNEE" /&gt;</code> pour SUCCESS<br>- <code>&lt;AlertError message="DONNEE" /&gt;</code> pour ERROR</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [etat, ...reste] = lignes[0].split(' ');
const donnee = reste.join(' ');

// À compléter : afficher le composant correspondant à l'état
`,
    hints: [
      'Gérez les trois branches avec if / else if.',
      'Pour LOADING, le composant Spinner n\'utilise pas la donnée restante.'
    ],
    examples: [
      { stdin: 'SUCCESS 42_utilisateurs\n', expected: '<DataView result="42_utilisateurs" />', note: 'Requête réussie avec affichage des données.' }
    ],
    tests: [
      { label: 'État en cours de chargement', stdin: 'LOADING\n', expected: '<Spinner label="Chargement en cours..." />' },
      { label: 'Erreur réseau signalée', stdin: 'ERROR Reseau_indisponible\n', expected: '<AlertError message="Reseau_indisponible" />' },
      { label: 'Token de validation reçu', stdin: 'SUCCESS Token_valide\n', expected: '<DataView result="Token_valide" />' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [etat, ...reste] = (lignes[0] || '').trim().split(' ');
const donnee = reste.join(' ');

if (etat === 'LOADING') {
  console.log('<Spinner label="Chargement en cours..." />');
} else if (etat === 'SUCCESS') {
  console.log(\`<DataView result="\${donnee}" />\`);
} else if (etat === 'ERROR') {
  console.log(\`<AlertError message="\${donnee}" />\`);
}
`
  },
  {
    id: 'rx2-c5-e3',
    chapter: 5,
    level: 'n2',
    language: 'javascript',
    title: 'Nettoyage d\'effet (Cleanup function)',
    goal: 'Simuler la fonction de retour de useEffect pour éviter les fuites de mémoire (timer / écouteur).',
    brief: '<p>La fonction retournée par <code>useEffect</code> nettoie les abonnements ou timers lors du démontage ou avant le prochain effet. Le script lit une suite d\'événements séparés par des virgules (ex. <code>MOUNT,TICK,TICK,UNMOUNT</code>). Affichez chaque étape :<br>- <code>MOUNT</code> &rarr; <code>Timer demarre</code><br>- <code>TICK</code> &rarr; <code>Tick horloge</code><br>- <code>UNMOUNT</code> &rarr; <code>Timer nettoye</code></p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const events = (lignes[0] || '').split(',');

// À compléter : tracer le cycle de vie et le nettoyage
`,
    hints: [
      'Bouclez sur chaque événement découpé et nettoyé par trim().',
      'Associez chaque mot-clé à sa chaîne de journalisation exacte.'
    ],
    examples: [
      { stdin: 'MOUNT,TICK,UNMOUNT\n', expected: 'Timer demarre\nTick horloge\nTimer nettoye', note: 'Cycle complet avec un battement.' }
    ],
    tests: [
      { label: 'Démontage immédiat sans tick', stdin: 'MOUNT,UNMOUNT\n', expected: 'Timer demarre\nTimer nettoye' },
      { label: 'Série de 3 ticks avant démontage', stdin: 'MOUNT,TICK,TICK,TICK,UNMOUNT\n', expected: 'Timer demarre\nTick horloge\nTick horloge\nTick horloge\nTimer nettoye' },
      { label: 'Composant encore monté', stdin: 'MOUNT,TICK\n', expected: 'Timer demarre\nTick horloge' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const events = (lignes[0] || '').split(',').map(s => s.trim()).filter(Boolean);
events.forEach(ev => {
  if (ev === 'MOUNT') console.log('Timer demarre');
  else if (ev === 'TICK') console.log('Tick horloge');
  else if (ev === 'UNMOUNT') console.log('Timer nettoye');
});
`
  }
];
