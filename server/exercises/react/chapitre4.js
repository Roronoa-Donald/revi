/**
 * Chapitre 4 — Rendu conditionnel, listes et clés dynamiques.
 *
 * Exercices exécutables en JavaScript (Node.js), préfixe `rx2`.
 */
'use strict';

module.exports = [
  {
    id: 'rx2-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'javascript',
    title: 'Génération de liste avec la prop key',
    goal: 'Transformer un tableau d\'objets en balises li dotées d\'une clé unique pour le réconciliateur.',
    brief: '<p>React exige une prop <code>key</code> unique et stable sur chaque élément produit par une boucle <code>map()</code>. Le script lit une série d\'éléments au format <code>id:libelle</code> séparés par des virgules (ex. <code>10:Accueil,20:Profil</code>). Affichez pour chaque élément sa balise sur sa propre ligne : <code>&lt;li key="id"&gt;libelle&lt;/li&gt;</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const elements = (lignes[0] || '').split(',');

// À compléter : générer les balises li avec l'attribut key
`,
    hints: [
      'Découpez la chaîne sur la virgule, puis chaque couple sur les deux-points.',
      'Affichez chaque élément avec console.log(\`<li key="\${id}">\${label}</li>\`).'
    ],
    examples: [
      { stdin: '1:Accueil,2:Profil,3:Contact\n', expected: '<li key="1">Accueil</li>\n<li key="2">Profil</li>\n<li key="3">Contact</li>', note: 'Trois éléments avec clés numériques.' }
    ],
    tests: [
      { label: 'Un seul élément', stdin: '100:Dashboard\n', expected: '<li key="100">Dashboard</li>' },
      { label: 'Clés alphanumériques', stdin: 'a1:Produits,b2:Panier\n', expected: '<li key="a1">Produits</li>\n<li key="b2">Panier</li>' },
      { label: 'Menu de navigation', stdin: 'k9:Parametres,k10:Aide,k11:Deconnexion\n', expected: '<li key="k9">Parametres</li>\n<li key="k10">Aide</li>\n<li key="k11">Deconnexion</li>' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const items = (lignes[0] || '').split(',').map(s => s.trim()).filter(Boolean);
items.forEach(item => {
  const [id, label] = item.split(':');
  console.log(\`<li key="\${id}">\${label}</li>\`);
});
`
  },
  {
    id: 'rx2-c4-e2',
    chapter: 4,
    level: 'n1',
    language: 'javascript',
    title: 'Filtrage dynamique de liste',
    goal: 'Calculer une liste dérivée filtrée selon un critère de recherche insensible à la casse.',
    brief: '<p>En React, un champ de recherche filtre les données à la volée. Le script lit sur la ligne 1 le <strong>mot-clé cherché</strong>, et sur la ligne 2 une <strong>liste de mots</strong> séparés par des virgules. Affichez les éléments correspondants séparés par des virgules. Si aucun élément ne correspond, affichez <code>Aucun resultat</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const query = (lignes[0] || '').trim().toLowerCase();
const mots = (lignes[1] || '').split(',').map(m => m.trim()).filter(Boolean);

// À compléter : filtrer la liste et afficher le résultat
`,
    hints: [
      'Utilisez .filter(m => m.toLowerCase().includes(query)).',
      'Testez si le tableau filtré est vide pour afficher "Aucun resultat".'
    ],
    examples: [
      { stdin: 'rea\nReact,Angular,Vue,Preact\n', expected: 'React,Preact', note: 'Recherche insensible à la casse.' }
    ],
    tests: [
      { label: 'Filtre script sur langages', stdin: 'script\nJavaScript,Python,TypeScript,PHP\n', expected: 'JavaScript,TypeScript' },
      { label: 'Aucune correspondance', stdin: 'xyz\nHTML,CSS,Rust\n', expected: 'Aucun resultat' },
      { label: 'Correspondance exacte insensible', stdin: 'node\nNodeJS,Deno,Bun\n', expected: 'NodeJS' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const query = (lignes[0] || '').trim().toLowerCase();
const mots = (lignes[1] || '').split(',').map(m => m.trim()).filter(Boolean);

const filtered = mots.filter(m => m.toLowerCase().includes(query));
if (filtered.length > 0) {
  console.log(filtered.join(','));
} else {
  console.log('Aucun resultat');
}
`
  },
  {
    id: 'rx2-c4-e3',
    chapter: 4,
    level: 'n2',
    language: 'javascript',
    title: 'Opérateur court-circuit (&&)',
    goal: 'Afficher un badge de notification seulement si le compteur est strictement positif.',
    brief: '<p>Le motif JSX <code>{condition &amp;&amp; &lt;Composant /&gt;}</code> est classique pour le rendu conditionnel. Le script lit une ligne au format <code>actif nb</code> où actif vaut <code>1</code> ou <code>0</code>, et nb est un entier. Si actif vaut 1 et nb &gt; 0, affichez <code>&lt;span class="badge"&gt;NB&lt;/span&gt;</code>. Sinon, affichezzz <code>(aucun)</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [actif, rawNb] = lignes[0].split(' ');
const nb = parseInt(rawNb, 10);

// À compléter : appliquer la condition de court-circuit
`,
    hints: [
      'Vérifiez la double condition : actif === "1" et nb > 0.',
      'Si faux, affichez la chaîne littérale "(aucun)".'
    ],
    examples: [
      { stdin: '1 3\n', expected: '<span class="badge">3</span>', note: 'Actif avec 3 alertes.' }
    ],
    tests: [
      { label: 'Actif mais compteur à zéro', stdin: '1 0\n', expected: '(aucun)' },
      { label: 'Désactivé malgré compteur positif', stdin: '0 5\n', expected: '(aucun)' },
      { label: 'Actif avec grand nombre', stdin: '1 12\n', expected: '<span class="badge">12</span>' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [actif, rawNb] = (lignes[0] || '').trim().split(' ');
const nb = parseInt(rawNb, 10);

if (actif === '1' && nb > 0) {
  console.log(\`<span class="badge">\${nb}</span>\`);
} else {
  console.log('(aucun)');
}
`
  }
];
