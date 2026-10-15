/**
 * Chapitre 2 — Composants fonctionnels et transmission de props.
 *
 * Exercices exécutables en JavaScript (Node.js), préfixe `rx2`.
 */
'use strict';

module.exports = [
  {
    id: 'rx2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'javascript',
    title: 'Valeurs par défaut des props',
    goal: 'Appliquer un rôle par défaut si la prop transmise est omise ou indéfinie.',
    brief: '<p>Les composants React utilisent des valeurs par défaut pour leurs props optionnelles. Le programme lit une ligne <code>nom role</code>. Si le rôle vaut <code>-</code> ou est absent, la valeur par défaut est <code>invite</code>. Affichez <code>Utilisateur : nom | Role : role</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [nom, role] = lignes[0].split(' ');

// À compléter : gérer le rôle par défaut et afficher le résultat
`,
    hints: [
      'Vérifiez si role est falsy ou égal à "-" avec une ternaire ou l\'opérateur ||.',
      'Affichez la chaîne formatée avec un gabarit littéral.'
    ],
    examples: [
      { stdin: 'Sophie admin\n', expected: 'Utilisateur : Sophie | Role : admin', note: 'Rôle explicite admin.' }
    ],
    tests: [
      { label: 'Rôle tiret par défaut', stdin: 'Alex -\n', expected: 'Utilisateur : Alex | Role : invite' },
      { label: 'Rôle modérateur spécifié', stdin: 'Thomas moderateur\n', expected: 'Utilisateur : Thomas | Role : moderateur' },
      { label: 'Nom seul sans second argument', stdin: 'Julie\n', expected: 'Utilisateur : Julie | Role : invite' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const [nom, rawRole] = (lignes[0] || '').trim().split(' ');
const role = (!rawRole || rawRole === '-') ? 'invite' : rawRole;
console.log(\`Utilisateur : \${nom} | Role : \${role}\`);
`
  },
  {
    id: 'rx2-c2-e2',
    chapter: 2,
    level: 'n1',
    language: 'javascript',
    title: 'Composition et prop children',
    goal: 'Encapsuler un contenu arbitraire dans un composant Card réutilisable.',
    brief: '<p>La prop spéciale <code>children</code> permet d\'imbriquer du contenu. Le programme lit deux lignes : la <strong>variante</strong> CSS sur la ligne 1 (ex. <code>info</code>, <code>danger</code>), et le <strong>texte enfant</strong> sur la ligne 2. Affichez la balise générée : <code>&lt;div class="card card-VARIANTE"&gt;&lt;p&gt;TEXTE&lt;/p&gt;&lt;/div&gt;</code>.</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const variante = lignes[0];
const texte = lignes[1];

// À compléter : afficher le composant conteneur avec sa prop children
`,
    hints: [
      'Nettoyez les éventuels espaces avec trim().',
      'Injectez la variante dans la classe et le texte enfant dans le paragraphe interne.'
    ],
    examples: [
      { stdin: 'info\nMise a jour disponible\n', expected: '<div class="card card-info"><p>Mise a jour disponible</p></div>', note: 'Carte de notification info.' }
    ],
    tests: [
      { label: 'Carte d alerte danger', stdin: 'danger\nConnexion interrompue\n', expected: '<div class="card card-danger"><p>Connexion interrompue</p></div>' },
      { label: 'Carte de succès', stdin: 'success\nPaiement confirme\n', expected: '<div class="card card-success"><p>Paiement confirme</p></div>' },
      { label: 'Avertissement warning', stdin: 'warning\nEspace disque faible\n', expected: '<div class="card card-warning"><p>Espace disque faible</p></div>' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const variante = (lignes[0] || '').trim();
const texte = (lignes[1] || '').trim();
console.log(\`<div class="card card-\${variante}"><p>\${texte}</p></div>\`);
`
  },
  {
    id: 'rx2-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'javascript',
    title: 'Déstructuration et filtrage de props',
    goal: 'Extraire les props pertinentes pour éviter de transmettre des attributs parasites aux balises HTML.',
    brief: '<p>En React moderne, on déstructure les props d\'un composant pour isoler celles dont il a besoin. Le script reçoit sur une ligne des paires <code>cle=valeur</code> séparées par des espaces. Isolez les props <code>id</code>, <code>theme</code> et <code>active</code>, et affichez-les au format : <code>Props filtrees : id=ID theme=THEME active=ACTIVE</code> (si une clé manque, affichez <code>none</code>).</p>',
    starter: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const paires = lignes[0].split(' ');

// À compléter : déstructurer les props et afficher id, theme et active
`,
    hints: [
      'Stockez les paires dans un objet ou une Map en découpant chaque terme au signe =.',
      'Assignez la valeur par défaut "none" pour les trois propriétés attendues.'
    ],
    examples: [
      { stdin: 'id=btn1 theme=dark active=true onClick=handleClick\n', expected: 'Props filtrees : id=btn1 theme=dark active=true', note: 'Extraction de 3 props en ignorant onClick.' }
    ],
    tests: [
      { label: 'Prop id absente', stdin: 'theme=light size=lg active=false\n', expected: 'Props filtrees : id=none theme=light active=false' },
      { label: 'Prop theme et active absentes', stdin: 'id=nav42 aria-label=menu\n', expected: 'Props filtrees : id=nav42 theme=none active=none' },
      { label: 'Ordre arbitraire des props', stdin: 'active=true id=box7 color=red theme=custom\n', expected: 'Props filtrees : id=box7 theme=custom active=true' }
    ],
    solution: `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');

const props = {};
(lignes[0] || '').trim().split(' ').forEach(p => {
  const [k, v] = p.split('=');
  if (k) props[k] = v;
});

const id = props.id || 'none';
const theme = props.theme || 'none';
const active = props.active || 'none';

console.log(\`Props filtrees : id=\${id} theme=\${theme} active=\${active}\`);
`
  }
];
