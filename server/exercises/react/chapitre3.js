/**
 * Chapitre 3 — État local (useState) et formulaires contrôlés.
 *
 * Exercices exécutables en JavaScript (Node.js), préfixe `rx2`.
 */
'use strict';

module.exports = [
  {
    id: 'rx2-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'javascript',
    title: 'Simulateur du Hook useState',
    goal: 'Gérer l\'évolution d\'un état numérique à travers une succession d\'actions INC, DEC et RESET.',
    brief: '<p>Un composant React conserve son état avec <code>useState</code>. Le programme lit la <strong>valeur initiale</strong> sur la ligne 1, puis une <strong>série d\'actions</strong> séparées par des espaces sur la ligne 2. Les actions possibles sont <code>INC</code> (+1), <code>DEC</code> (-1) et <code>RESET</code> (revient à 0). Affichez <code>Etat final : VALEUR</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

let count = parseInt(lignes[0], 10);
const actions = (lignes[1] || '').split(' ');

// À compléter : appliquer les transitions d'état
`,
    hints: [
      'Bouclez sur les actions en vérifiant act === "INC", "DEC" ou "RESET".',
      'Nettoyez les entrées vides avec filter(Boolean).'
    ],
    examples: [
      { stdin: '5\nINC INC DEC\n', expected: 'Etat final : 6', note: '5 + 1 + 1 - 1 = 6' }
    ],
    tests: [
      { label: 'Remise à zéro suivie d une incrémentation', stdin: '10\nDEC DEC DEC RESET INC\n', expected: 'Etat final : 1' },
      { label: 'Départ à zéro et 5 incrémentations', stdin: '0\nINC INC INC INC INC\n', expected: 'Etat final : 5' },
      { label: 'Reset direct d un grand nombre', stdin: '42\nRESET\n', expected: 'Etat final : 0' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

let count = parseInt(lignes[0], 10);
const actions = (lignes[1] || '').trim().split(' ').filter(Boolean);

for (const act of actions) {
  if (act === 'INC') count += 1;
  else if (act === 'DEC') count -= 1;
  else if (act === 'RESET') count = 0;
}

console.log(\`Etat final : \${count}\`);
`
  },
  {
    id: 'rx2-c3-e2',
    chapter: 3,
    level: 'n1',
    language: 'javascript',
    title: 'Validation d\'input contrôlé (onChange)',
    goal: 'Valider en direct la valeur saisie dans un champ de formulaire React.',
    brief: '<p>Dans un formulaire contrôlé, la fonction de rappel <code>onChange</code> valide la saisie à chaque frappe. Le programme lit une chaîne représentant un mot de passe. Il est valide s\'il mesure <strong>au moins 8 caractères</strong> ET contient <strong>au moins un chiffre</strong>. Affichez <code>Statut : VALIDE</code> ou <code>Statut : INVALIDE</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const saisie = lignes[0] || '';

// À compléter : tester la longueur et la présence d'un chiffre
`,
    hints: [
      'Vérifiez saisie.length >= 8 pour le critère de taille.',
      'Utilisez l\'expression régulière /[0-9]/.test(saisie) pour vérifier la présence d\'un chiffre.'
    ],
    examples: [
      { stdin: 'React2026\n', expected: 'Statut : VALIDE', note: '9 caractères dont 4 chiffres.' }
    ],
    tests: [
      { label: 'Pas de chiffre', stdin: 'reactjsframework\n', expected: 'Statut : INVALIDE' },
      { label: '8 caractères avec chiffres', stdin: 'admin1234\n', expected: 'Statut : VALIDE' },
      { label: 'Trop court malgré le chiffre', stdin: 'court1\n', expected: 'Statut : INVALIDE' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const saisie = (lignes[0] || '').trim();
const hasLen = saisie.length >= 8;
const hasNum = /[0-9]/.test(saisie);

if (hasLen && hasNum) {
  console.log('Statut : VALIDE');
} else {
  console.log('Statut : INVALIDE');
}
`
  },
  {
    id: 'rx2-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'javascript',
    title: 'Mise à jour immuable d\'un tableau d\'état',
    goal: 'Modifier une liste d\'éléments sans muter l\'état précédent (immutabilité React).',
    brief: '<p>En React, on ne doit jamais modifier directement un tableau d\'état (ex. <code>push</code> ou <code>splice</code> interdits). Le script lit sur la ligne 1 une liste d\'articles séparés par des virgules, et sur la ligne 2 une commande : soit <code>AJOUTER nom</code>, soit <code>SUPPRIMER nom</code>. Affichez la nouvelle liste avec les éléments séparés par une virgule (ou <code>(vide)</code> si vide).</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const articles = (lignes[0] || '').split(',').map(s => s.trim()).filter(Boolean);
const [action, ...reste] = (lignes[1] || '').split(' ');
const cible = reste.join(' ');

// À compléter : produire le nouveau tableau immuable
`,
    hints: [
      'Pour ajouter sans muter : [...articles, cible].',
      'Pour supprimer sans muter : articles.filter(item => item !== cible).'
    ],
    examples: [
      { stdin: 'pomme,banane\nAJOUTER orange\n', expected: 'pomme,banane,orange', note: 'Ajout en fin de tableau par décomposition.' }
    ],
    tests: [
      { label: 'Suppression d un élément central', stdin: 'stylo,cahier,gomme\nSUPPRIMER cahier\n', expected: 'stylo,gomme' },
      { label: 'Suppression de l unique élément', stdin: 'unique\nSUPPRIMER unique\n', expected: '(vide)' },
      { label: 'Ajout dans une liste d un élément', stdin: 'pain\nAJOUTER beurre\n', expected: 'pain,beurre' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const articles = (lignes[0] || '').split(',').map(s => s.trim()).filter(Boolean);
const [action, ...reste] = (lignes[1] || '').trim().split(' ');
const cible = reste.join(' ');

let nouveau;
if (action === 'AJOUTER') {
  nouveau = [...articles, cible];
} else if (action === 'SUPPRIMER') {
  nouveau = articles.filter(item => item !== cible);
} else {
  nouveau = [...articles];
}

console.log(nouveau.length ? nouveau.join(',') : '(vide)');
`
  }
];
