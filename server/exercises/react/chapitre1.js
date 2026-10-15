/**
 * Chapitre 1 — Penser en composants & l'écosystème JSX / Vite.
 *
 * Exercices exécutables en JavaScript (Node.js), préfixe `rx2`.
 */
'use strict';

module.exports = [
  {
    id: 'rx2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'javascript',
    title: 'Créer un React Element (createElement)',
    goal: 'Simuler React.createElement en produisant l\'objet virtuel correspondant à une balise et son texte.',
    brief: '<p>En React, <code>React.createElement(type, props, children)</code> génère un objet décrivant un nœud virtuel. Le programme lit une ligne au format <code>type texte</code> (ex. <code>button Valider</code>). Produisez et affichez l\'objet JSON correspondant sous la forme <code>{"type":"button","props":{"children":"Valider"}}</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [type, ...reste] = lignes[0].split(' ');
const texte = reste.join(' ');

// À compléter : construire l'objet React Element et l'afficher au format JSON
`,
    hints: [
      'Utilisez un objet littéral avec la clé type et un sous-objet props contenant children.',
      'Affichez l\'objet converti en chaîne avec JSON.stringify(element).'
    ],
    examples: [
      { stdin: 'button Valider\n', expected: '{"type":"button","props":{"children":"Valider"}}', note: 'Objet élément simple avec balise button.' }
    ],
    tests: [
      { label: 'Titre h1 avec plusieurs mots', stdin: 'h1 Bienvenue sur le campus\n', expected: '{"type":"h1","props":{"children":"Bienvenue sur le campus"}}' },
      { label: 'Paragraphe de texte', stdin: 'p React transforme le web\n', expected: '{"type":"p","props":{"children":"React transforme le web"}}' },
      { label: 'Balise inline span', stdin: 'span Badge Actif\n', expected: '{"type":"span","props":{"children":"Badge Actif"}}' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [type, ...reste] = (lignes[0] || '').trim().split(' ');
const texte = reste.join(' ');
const element = {
  type: type,
  props: {
    children: texte
  }
};
console.log(JSON.stringify(element));
`
  },
  {
    id: 'rx2-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'javascript',
    title: 'Rendu conditionnel JSX',
    goal: 'Générer la représentation JSX d\'une vue selon l\'état de connexion de l\'utilisateur.',
    brief: '<p>Dans une application React, une interface s\'adapte à l\'état. Le script reçoit une ligne : <code>statut identifiant</code> où statut vaut <code>1</code> (connecté) ou <code>0</code> (anonyme). Si connecté, affichez <code>&lt;Dashboard user="identifiant" /&gt;</code> ; sinon, affichez <code>&lt;LoginForm redirect="/login" /&gt;</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [statut, identifiant] = lignes[0].split(' ');

// À compléter : afficher le composant JSX approprié
`,
    hints: [
      'Testez si statut === "1" avec une condition if/else.',
      'Utilisez un template literal avec backticks pour injecter l\'identifiant dans la prop user.'
    ],
    examples: [
      { stdin: '1 Alice\n', expected: '<Dashboard user="Alice" />', note: 'Utilisateur connecté avec son prénom.' }
    ],
    tests: [
      { label: 'Visiteur anonyme', stdin: '0 visiteur\n', expected: '<LoginForm redirect="/login" />' },
      { label: 'Utilisateur Marc connecté', stdin: '1 Marc\n', expected: '<Dashboard user="Marc" />' },
      { label: 'Invité déconnecté', stdin: '0 invite_42\n', expected: '<LoginForm redirect="/login" />' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [statut, identifiant] = (lignes[0] || '').trim().split(' ');
if (statut === '1') {
  console.log(\`<Dashboard user="\${identifiant}" />\`);
} else {
  console.log('<LoginForm redirect="/login" />');
}
`
  },
  {
    id: 'rx2-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'javascript',
    title: 'Décomposition en arbre de composants',
    goal: 'Décomposer une maquette en une hiérarchie de composants App, Header, Content et Footer.',
    brief: '<p>Penser en React consiste à découper l\'UI en composants indépendants. Le programme lit 3 lignes : le <strong>titre</strong> (ligne 1), le <strong>message</strong> (ligne 2) et l\'<strong>auteur</strong> (ligne 3). Affichez l\'arborescence textuelle suivante avec 2 espaces d\'indentation par niveau :<br><code>&lt;App&gt;<br>&nbsp;&nbsp;&lt;Header title="TITRE" /&gt;<br>&nbsp;&nbsp;&lt;Content message="MESSAGE" /&gt;<br>&nbsp;&nbsp;&lt;Footer author="AUTEUR" /&gt;<br>&lt;/App&gt;</code></p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const titre = lignes[0] || '';
const message = lignes[1] || '';
const auteur = lignes[2] || '';

// À compléter : afficher l'arbre de composants avec indentation de 2 espaces
`,
    hints: [
      'Chaque sous-composant est indenté de deux espaces à l\'intérieur de <App> ... </App>.',
      'Veillez à bien respecter les guillemets et les noms exacts des props : title, message, author.'
    ],
    examples: [
      { stdin: 'Accueil\nBienvenue en B2\nEquipe Peda\n', expected: '<App>\n  <Header title="Accueil" />\n  <Content message="Bienvenue en B2" />\n  <Footer author="Equipe Peda" />\n</App>', note: 'Arbre complet avec 3 sous-composants.' }
    ],
    tests: [
      { label: 'Page Boutique', stdin: 'Boutique\nSolde d ete\nService Vente\n', expected: '<App>\n  <Header title="Boutique" />\n  <Content message="Solde d ete" />\n  <Footer author="Service Vente" />\n</App>' },
      { label: 'Page Blog technique', stdin: 'Blog\nArticle React 19\nRedaction\n', expected: '<App>\n  <Header title="Blog" />\n  <Content message="Article React 19" />\n  <Footer author="Redaction" />\n</App>' },
      { label: 'Page Contact support', stdin: 'Contact\nFormulaire ouvert\nSupport IT\n', expected: '<App>\n  <Header title="Contact" />\n  <Content message="Formulaire ouvert" />\n  <Footer author="Support IT" />\n</App>' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const titre = (lignes[0] || '').trim();
const message = (lignes[1] || '').trim();
const auteur = (lignes[2] || '').trim();

console.log('<App>');
console.log(\`  <Header title="\${titre}" />\`);
console.log(\`  <Content message="\${message}" />\`);
console.log(\`  <Footer author="\${auteur}" />\`);
console.log('</App>');
`
  }
];
