/**
 * Chapitre 6 — Navigation avec React Router et architecture globale.
 *
 * Exercices exécutables en JavaScript (Node.js), préfixe `rx2`.
 */
'use strict';

module.exports = [
  {
    id: 'rx2-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'javascript',
    title: 'Paramètres de route dynamiques (useParams)',
    goal: 'Extraire les paramètres d\'URL définis avec la notation :param de React Router.',
    brief: '<p>Le hook <code>useParams</code> extrait les paramètres dynamiques de l\'URL. Le script lit sur la ligne 1 le modèle de route (ex. <code>/users/:id/profile</code>) et sur la ligne 2 l\'URL courante (ex. <code>/users/42/profile</code>). Affichez les paramètres extraits au format JSON : <code>{"id":"42"}</code>. Si les segments ne correspondent pas en nombre, affichez <code>{}</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const pattern = (lignes[0] || '').trim().split('/').filter(Boolean);
const url = (lignes[1] || '').trim().split('/').filter(Boolean);

// À compléter : extraire les paramètres dynamiques
`,
    hints: [
      'Comparez pattern.length et url.length.',
      'Si un segment de pattern commence par ":", stockez url[i] avec la clé sans le deux-points.'
    ],
    examples: [
      { stdin: '/users/:id/profile\n/users/42/profile\n', expected: '{"id":"42"}', note: 'Paramètre id extrait avec succès.' }
    ],
    tests: [
      { label: 'Deux paramètres dynamiques slug et numéro', stdin: '/courses/:slug/chapitre/:n\n/courses/react/chapitre/3\n', expected: '{"slug":"react","n":"3"}' },
      { label: 'Paramètre unique dans une sous-section', stdin: '/admin/:section\n/admin/settings\n', expected: '{"section":"settings"}' },
      { label: 'Nombre de segments incompatible', stdin: '/items/:id\n/items/12/extra\n', expected: '{}' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const pattern = (lignes[0] || '').trim().split('/').filter(Boolean);
const url = (lignes[1] || '').trim().split('/').filter(Boolean);

const params = {};
if (pattern.length === url.length) {
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i].startsWith(':')) {
      const key = pattern[i].slice(1);
      params[key] = url[i];
    }
  }
}
console.log(JSON.stringify(params));
`
  },
  {
    id: 'rx2-c6-e2',
    chapter: 6,
    level: 'n1',
    language: 'javascript',
    title: 'Route protégée et composant Navigate',
    goal: 'Rediriger un utilisateur non connecté avec le composant Navigate de React Router.',
    brief: '<p>Pour sécuriser une route privée, on teste l\'authentification : si l\'utilisateur est connecté, le composant enfant s\'affiche ; sinon, une redirection s\'opère. Le script lit une ligne <code>auth composant</code> où auth vaut <code>1</code> ou <code>0</code>. Si 1, affichez <code>&lt;COMPOSANT /&gt;</code> ; si 0, affichez <code>&lt;Navigate to="/login" replace /&gt;</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [auth, composant] = lignes[0].split(' ');

// À compléter : autoriser ou rediriger vers /login
`,
    hints: [
      'Si auth === "1", affichez le composant cible avec des balises auto-fermantes.',
      'Si auth === "0", affichez la balise Navigate avec to="/login" et replace.'
    ],
    examples: [
      { stdin: '1 Dashboard\n', expected: '<Dashboard />', note: 'Accès autorisé au tableau de bord.' }
    ],
    tests: [
      { label: 'Accès profil non connecté', stdin: '0 Profile\n', expected: '<Navigate to="/login" replace />' },
      { label: 'Accès panneau d administration connecté', stdin: '1 AdminPanel\n', expected: '<AdminPanel />' },
      { label: 'Accès paramètres non connecté', stdin: '0 Settings\n', expected: '<Navigate to="/login" replace />' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [auth, composant] = (lignes[0] || '').trim().split(' ');
if (auth === '1') {
  console.log(\`<\${composant} />\`);
} else {
  console.log('<Navigate to="/login" replace />');
}
`
  },
  {
    id: 'rx2-c6-e3',
    chapter: 6,
    level: 'n2',
    language: 'javascript',
    title: 'Architecture d\'état par Reducer (useReducer)',
    goal: 'Implémenter une fonction réductrice pure (state, action) => newState pour gérer un panier d\'achats.',
    brief: '<p>Pour des états complexes, le hook <code>useReducer</code> découple les transitions dans une fonction pure. Le script lit sur la ligne 1 le total initial (entier), et sur la ligne 2 une suite d\'actions séparées par des espaces : <code>AJOUT:X</code> (ajoute X) ou <code>REMISE:X</code> (retire X, minimum 0). Affichez <code>Total panier : TOTAL</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

let total = parseInt(lignes[0], 10);
const actions = (lignes[1] || '').split(' ');

// À compléter : appliquer le reducer sur la séquence d'actions
`,
    hints: [
      'Découpez chaque action sur le deux-points pour séparer le type et le montant.',
      'Utilisez Math.max(0, total - val) pour éviter un panier négatif.'
    ],
    examples: [
      { stdin: '50\nAJOUT:20 REMISE:10\n', expected: 'Total panier : 60', note: '50 + 20 - 10 = 60' }
    ],
    tests: [
      { label: 'Remise puis ajout', stdin: '100\nREMISE:30 AJOUT:15\n', expected: 'Total panier : 85' },
      { label: 'Remise supérieure au total (plancher 0)', stdin: '20\nREMISE:50\n', expected: 'Total panier : 0' },
      { label: 'Succession de trois ajouts', stdin: '0\nAJOUT:10 AJOUT:25 AJOUT:5\n', expected: 'Total panier : 40' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

let total = parseInt(lignes[0], 10);
const actions = (lignes[1] || '').trim().split(' ').filter(Boolean);

for (const act of actions) {
  const [type, rawVal] = act.split(':');
  const val = parseInt(rawVal, 10);
  if (type === 'AJOUT') {
    total += val;
  } else if (type === 'REMISE') {
    total = Math.max(0, total - val);
  }
}
console.log(\`Total panier : \${total}\`);
`
  }
];
