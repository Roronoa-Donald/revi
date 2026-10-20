/**
 * Chapitre 2 du cours « React » B2 — Composants fonctionnels et transmission de props.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Composants fonctionnels & transmission de props',
  short: 'Composants & Props',
  toc: 'Fonctions composants, déstructuration, valeurs par défaut, prop children, composition et flux unidirectionnel.',
  time: '≈ 2 h 45 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une fois le découpage d’une interface compris, il faut faire communiquer les composants entre eux. ' +
    'React privilégie des fonctions pures recevant des données en entrée (les props) pour garantir ' +
    'la réutilisabilité et la prévisibilité de l’application.',

  objectives: [
    'créer des composants fonctionnels modernes respectant les conventions de nommage ;',
    'passer des props de tout type (chaînes, nombres, objets, fonctions) ;',
    'déstructurer les props et définir des valeurs par défaut robustes ;',
    'maîtriser la prop children pour concevoir des conteneurs réutilisables ;',
    'comprendre le flux de données unidirectionnel descendant.'
  ],

  sections: [
    {
      title: 'Anatomie d’un composant fonctionnel',
      html: [
        '<p>En React moderne, un <strong>composant fonctionnel</strong> est une simple fonction JavaScript qui ' +
        'reçoit un objet de données appelé <code>props</code> et renvoie une description de l’UI en JSX.</p>',
        '<pre><code>// Composant simple avec déstructuration\nfunction CarteUtilisateur({ nom, role = \'lecteur\' }) {\n  return (\n    &lt;div className="carte"&gt;\n      &lt;h3&gt;{nom}&lt;/h3&gt;\n      &lt;span className="badge"&gt;{role}&lt;/span&gt;\n    &lt;/div&gt;\n  );\n}</code></pre>',
        box('warn', 'Convention stricte de casse', 'shield',
          '    <p>Le nom d’un composant React <strong>doit impérativement commencer par une majuscule</strong> (ex. <code>CarteUtilisateur</code>). ' +
          'Une balise en minuscule (ex. <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>) est traitée par React comme un élément HTML natif du DOM.</p>')
      ].join('\n')
    },
    {
      title: 'Transmission et lecture des props',
      html: [
        '<p>Les <strong>props</strong> (diminutif de <em>properties</em>) constituent le mécanisme par lequel ' +
        'un composant parent transmet des informations à un composant enfant. Elles sont <strong>en lecture seule (immuables)</strong> : ' +
        'un composant ne doit jamais modifier ses propres props.</p>',
        '<pre><code>// Passage de différents types de props\n&lt;Profil\n  nom="Alexandre"\n  age={24}\n  isAdmin={true}\n  competences={[\'React\', \'Vite\', \'Node\']}\n  onSelect={() =&gt; console.log(\'Sélectionné\')}\n/&gt;</code></pre>',
        box('tech', 'Les expressions JavaScript entre accolades', 'code',
          '    <p>Dans du JSX, tout ce qui se trouve entre accolades <code>{...}</code> est évalué comme une expression ' +
          'JavaScript : variables, calculs arithmétiques, appels de fonctions ou chaînes littérales.</p>')
      ].join('\n')
    },
    {
      title: 'Composition et la prop spéciale children',
      html: [
        '<p>React favorise la <strong>composition</strong> plutôt que l’héritage. Lorsqu’un composant agit ' +
        'comme une boîte générique (panneau, carte, boîte de dialogue), il ne sait pas à l’avance ce qu’il va contenir. ' +
        'Il utilise alors la prop réservée <code>children</code> :</p>',
        '<pre><code>function Card({ titre, children }) {\n  return (\n    &lt;div className="card-box"&gt;\n      &lt;h2&gt;{titre}&lt;/h2&gt;\n      &lt;div className="card-body"&gt;\n        {children}\n      &lt;/div&gt;\n    &lt;/div&gt;\n  );\n}\n\n// Utilisation avec imbrication de contenu arbitraire :\n&lt;Card titre="Mon Compte"&gt;\n  &lt;p&gt;Bienvenue sur votre espace personnel.&lt;/p&gt;\n  &lt;button&gt;Modifier profil&lt;/button&gt;\n&lt;/Card&gt;</code></pre>'
      ].join('\n')
    },
    {
      title: 'Flux unidirectionnel et prop drilling',
      html: [
        '<p>Les données descendent toujours du parent vers les enfants dans un <strong>flux unidirectionnel</strong>. ' +
        'Lorsqu’une donnée doit traverser plusieurs composants intermédiaires qui n’en ont pas l’usage direct, ' +
        'on parle de <em>prop drilling</em>.</p>',
        '<p>Dans les applications de taille intermédiaire à grande, on résout ce problème par la composition de composants ' +
        'ou par l’utilisation de l’API <code>Context</code> de React.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Un composant React doit obligatoirement commencer par…', opts: ['Une lettre majuscule (PascalCase)', 'Le préfixe use (ex. useButton)', 'Le mot-clé class'], correct: 0, exp: 'Une majuscule signale à React qu’il s’agit d’un composant personnalisé.' },
    { stem: 'Les props reçues par un composant sont…', opts: ['En lecture seule (immuables)', 'Directement modifiables par réassignation', 'Synchronisées avec le localStorage'], correct: 0, exp: 'Un composant doit se comporter comme une fonction pure vis-à-vis de ses props.' },
    { stem: 'La prop spéciale « children » permet de…', opts: ['Rendre le contenu imbriqué dans la balise du composant', 'Lister les processus enfants du système', 'Forcer le composant à se re-rendre'], correct: 0, exp: 'children capture le JSX placé à l’intérieur d’un conteneur.' },
    { stem: 'Pour passer un nombre comme prop en JSX, on écrit…', opts: ['age={42}', 'age="42"', 'age=[42]'], correct: 0, exp: 'Les accolades {42} transmettent un type numérique JavaScript.' },
    { stem: 'Le terme « prop drilling » désigne…', opts: ['Le passage fastidieux de props sur plusieurs niveaux hiérarchiques', 'Une faille de sécurité par injection SQL', 'Un outil d’optimisation automatique'], correct: 0, exp: 'C’est le transit de données à travers des intermédiaires qui ne l’utilisent pas.' },
    { stem: 'Comment définit-on une valeur par défaut pour une prop déstructurée ?', opts: ['function Card({ theme = \'light\' })', 'function Card({ theme : default(\'light\') })', 'function Card({ theme || \'light\' })'], correct: 0, exp: 'On utilise la syntaxe standard ES6 de valeur par défaut dans la déstructuration.' },
    { stem: 'Les fonctions de rappel (callbacks) peuvent être passées comme props pour…', opts: ['Permettre à un composant enfant de notifier un événement au parent', 'Bloquer l’exécution du JavaScript', 'Chiffrer les requêtes HTTP'], correct: 0, exp: 'Les callbacks permettent aux enfants de faire remonter des informations.' },
    { stem: 'Dans quel sens circulent les données en React par défaut ?', opts: ['Du composant parent vers les composants enfants (flux descendant)', 'Des enfants vers les parents de manière bidirectionnelle', 'Aléatoirement selon la mémoire disponible'], correct: 0, exp: 'Le flux de données unidirectionnel assure la prévisibilité de l’application.' }
  ],

  pitfalls: [
    'Tenter de modifier directement les props (ex. props.titre = "Nouveau").',
    'Oublier les accolades pour passer un booléen, un nombre ou un objet (ex. age="20" au lieu de age={20}).',
    'Nommer un composant en minuscule (ex. function button() au lieu de Button()).',
    'Multiplier le prop drilling sans envisager la composition avec children.',
    'Confondre props (reçues de l’extérieur, immuables) et state (géré localement, modifiable).'
  ],

  methodTitle: 'Concevoir et paramétrer un composant réutilisable',
  method: [
    '<strong>Identifier</strong> les données variables nécessaires au composant.',
    '<strong>Déclarer</strong> la fonction avec un nom explicite en PascalCase.',
    '<strong>Déstructurer</strong> l’objet props en argument avec des valeurs par défaut pour les champs optionnels.',
    '<strong>Utiliser</strong> la prop children si le composant sert de conteneur d’éléments arbitraires.',
    '<strong>Tester</strong> le composant avec différents jeux de props pour vérifier sa robustesse.'
  ],

  summary: [
    'Un composant fonctionnel est une fonction pure retournant du JSX.',
    'Les props permettent aux parents de transmettre des paramètres en lecture seule.',
    'La déstructuration ES6 ({ prop1, prop2 = defaut }) améliore la lisibilité du code.',
    'La prop children permet de concevoir des conteneurs réutilisables (Card, Dialog, Layout).',
    'Les données s’écoulent selon un flux unidirectionnel descendant prévisible.'
  ],

  checklist: [
    'Je sais nommer mes composants en PascalCase.',
    'Je transmets des données de tout type avec la syntaxe {expression}.',
    'Je déstructure mes props et prévois des valeurs de repli.',
    'J’utilise la prop children pour créer des conteneurs.',
    'Je ne modifie jamais directement les props reçues.'
  ],

  notions: ['Composant fonctionnel', 'Props', 'children', 'Composition', 'Déstructuration', 'Valeurs par défaut', 'Flux unidirectionnel', 'Prop drilling', 'Fonction pure', 'PascalCase'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la syntaxe des props et la déstructuration d’objets.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’utilisation de la prop children et les valeurs par défaut.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la composition et le flux descendant.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la gestion d’état avec useState dans le chapitre 3.' }
  ],

  flashcards: [
    { q: 'Pourquoi les props sont-elles immuables ?', a: 'Pour garantir que les composants restent prévisibles et purs vis-à-vis de leurs données d’entrée.' },
    { q: 'À quoi sert la déstructuration des props ?', a: 'À extraire directement les propriétés utiles dans la signature de la fonction sans répéter props.x.' },
    { q: 'Que contient props.children ?', a: 'Les éléments JSX insérés entre la balise ouvrante et fermante du composant conteneur.' },
    { q: 'Comment passer une fonction comme prop ?', a: 'Exemple : &lt;Bouton onAction={() =&gt; alert(\'Clic\')} /&gt;.' },
    { q: 'Qu’est-ce que le flux de données unidirectionnel ?', a: 'Le fait que les données transitent toujours de haut en bas, des composants parents vers les enfants.' },
    { q: 'Comment éviter le prop drilling excessif ?', a: 'Par la composition de composants avec children ou par l’utilisation de la Context API.' }
  ],

  next: {
    href: 'chapitre3.html',
    label: 'Chapitre 3 : State & Formulaires'
  }
};
