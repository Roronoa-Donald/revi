/**
 * Chapitre 1 du cours « React » B2 — Penser en composants & l'écosystème JSX / Vite.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Penser en composants & l’écosystème JSX / Vite',
  short: 'Composants & JSX',
  toc: 'Paradigme déclaratif, modèle mental de React, outillage Vite, syntaxe JSX, Fragments et montage via createRoot.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Face aux interfaces web modernes riches en données et en interactions, manipuler le DOM à la main ' +
    'devient rapidement ingérable et source de bugs. React introduit un modèle déclaratif fondé sur des ' +
    'composants réutilisables orchestrés par un outillage ultra-rapide (Vite).',

  objectives: [
    'comprendre le paradigme déclaratif par opposition à l’impératif ;',
    'décomposer une interface graphique en une arborescence de composants autonomes ;',
    'maîtriser l’outillage Vite et la structure d’un projet frontend moderne ;',
    'écrire du code JSX valide (Fragments, balises auto-fermantes, className) ;',
    'comprendre le rôle de React.createElement et de createRoot (react-dom).'
  ],

  sections: [
      {
        "title": "Prérequis intégré : Rappels JavaScript ES6+ indispensables pour React",
        "html": "<div class=\"box box--intuition\"><div class=\"box__title\">Les 5 constructions modernes de JavaScript (ES6+) utilisées dans chaque composant React</div><ul><li><strong>Modules (<code>import</code> / <code>export</code>) :</strong> <code>import { useState } from \"react\"</code> importe une fonction, et <code>export default App</code> expose un composant ;</li><li><strong>Fonctions fléchées (Arrow Functions) :</strong> <code>const doubler = (x) =&gt; x * 2</code> est l’écriture courte de <code>function(x) { return x * 2; }</code> ;</li><li><strong>Déstructuration (Destructuring) :</strong> <code>const { nom, age } = utilisateur</code> (ou <code>function Carte({ titre })</code>) extrait directement les propriétés d’un objet, et <code>const [compteur, setCompteur] = useState(0)</code> extrait les éléments d’un tableau ;</li><li><strong>Méthodes de tableaux <code>.map()</code> et <code>.filter()</code> :</strong> <code>liste.map(item =&gt; &lt;li key={item.id}&gt;{item.nom}&lt;/li&gt;)</code> transforme chaque donnée en élément JSX sans modifier le tableau d’origine ;</li><li><strong>Appels asynchrones (<code>fetch</code> &amp; <code>async/await</code>) :</strong> permettent d’interroger une API JSON sans bloquer l’interface.</li></ul></div>"
      },
    {
      title: 'Le paradigme déclaratif et le modèle mental de React',
      html: [
        '<p>Dans le développement web classique (impératif avec JavaScript pur), le développeur indique au ' +
        'navigateur <em>comment</em> modifier l’interface pas à pas : sélectionner un élément avec <code>document.querySelector</code>, ' +
        'changer sa classe, ajouter un écouteur, modifier son texte. Dès que l’application grandit, maintenir ' +
        'la cohérence entre l’état des données et l’affichage devient complexe.</p>',
        '<p><strong>React</strong> adopte une approche <strong>déclarative</strong> : on décrit à quoi l’interface ' +
        'doit ressembler pour un état de données donné (<em>ce que l’on veut</em>). Lorsque les données changent, ' +
        'React recalcule le rendu et met à jour efficacement le DOM réel grâce à son algorithme de réconciliation.</p>',
        box('intuition', 'L’interface comme fonction de l’état', 'lightbulb',
          '    <p>La formule fondamentale de React est : <code>UI = f(state)</code>. L’interface est le reflet ' +
          'direct et prédictible des données en mémoire à un instant T.</p>')
      ].join('\n')
    },
    {
      title: 'L’outillage moderne avec Vite',
      html: [
        '<p>Pour développer en React, les navigateurs ne comprenant pas directement le JSX, un environnement ' +
        'de compilation est nécessaire. Autrefois dominé par Create React App et Webpack, l’écosystème moderne ' +
        'utilise <strong>Vite</strong>.</p>',
        '<p>Vite tire parti des modules ES natifs (ESM) du navigateur en phase de développement et du bundler ' +
        'Rollup / esbuild pour offrir un rechargement à chaud (Hot Module Replacement - HMR) quasi instantané.</p>',
        '<pre><code>npm create vite@latest mon-app -- --template react\ncd mon-app\nnpm install\nnpm run dev</code></pre>',
        box('tech', 'Structure d’un projet Vite + React', 'code',
          '    <ul>\n' +
          '      <li><code>index.html</code> : point d’entrée HTML contenant la balise <code>&lt;div id="root"&gt;&lt;/div&gt;</code>.</li>\n' +
          '      <li><code>src/main.jsx</code> : point d’entrée JavaScript qui instancie <code>createRoot</code> et monte <code>&lt;App /&gt;</code>.</li>\n' +
          '      <li><code>src/App.jsx</code> : composant racine de l’application.</li>\n' +
          '      <li><code>package.json</code> : dépendances (<code>react</code>, <code>react-dom</code>) et scripts.</li>\n' +
          '    </ul>')
      ].join('\n')
    },
    {
      title: 'La syntaxe JSX (JavaScript XML)',
      html: [
        '<p>Le <strong>JSX</strong> est une extension syntaxique de JavaScript qui permet d’écrire une structure ' +
        'semblable à du HTML directement dans le code JavaScript des composants.</p>',
        '<p>Sous le capot, le compilateur (Babel ou SWC) transforme chaque balise JSX en un appel à ' +
        '<code>React.createElement(type, props, ...children)</code>. Par exemple :</p>',
        '<pre><code>// Ce que vous écrivez en JSX :\nconst bouton = &lt;button className="btn"&gt;Valider&lt;/button&gt;;\n\n// Ce qui est exécuté sous le capot :\nconst bouton = React.createElement(\'button\', { className: \'btn\' }, \'Valider\');</code></pre>',
        box('warn', 'Les 3 règles strictes du JSX', 'shield',
          '    <ol>\n' +
          '      <li><strong>Une seule racine</strong> : un composant doit renvoyer un élément parent unique, ou un Fragment <code>&lt;&gt;...&lt;/&gt;</code>.</li>\n' +
          '      <li><strong>Fermer toutes les balises</strong> : les balises orphelines doivent se terminer par <code>/&gt;</code> (ex. <code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code>).</li>\n' +
          '      <li><strong>Attributs en camelCase</strong> : <code>class</code> devient <code>className</code>, <code>for</code> devient <code>htmlFor</code>, <code>tabindex</code> devient <code>tabIndex</code>.</li>\n' +
          '    </ol>')
      ].join('\n')
    },
    {
      title: 'Montage dans le DOM : createRoot',
      html: [
        '<p>Depuis React 18, le montage d’une application s’effectue avec l’API concurrente de <code>react-dom/client</code> :</p>',
        '<pre><code>import React from \'react\';\nimport ReactDOM from \'react-dom/client\';\nimport App from \'./App\';\n\nconst root = ReactDOM.createRoot(document.getElementById(\'root\'));\nroot.render(\n  &lt;React.StrictMode&gt;\n    &lt;App /&gt;\n  &lt;/React.StrictMode&gt;\n);</code></pre>',
        '<p>Le mode strict (<code>React.StrictMode</code>) aide à détecter les effets secondaires indésirables en ' +
        'exécutant deux fois certains cycles en mode développement.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'React est principalement…', opts: ['Une bibliothèque JavaScript pour construire des interfaces utilisateur', 'Un framework CSS concurrent de Tailwind', 'Un serveur de base de données relationnelles'], correct: 0, exp: 'React est une bibliothèque déclarative basée sur des composants.' },
    { stem: 'Le paradigme déclaratif consiste à…', opts: ['Décrire le résultat visuel attendu pour un état donné', 'Manipuler directement le DOM avec getElementById', 'Écrire des requêtes SQL dans le HTML'], correct: 0, exp: 'On déclare l’état visuel et React synchronise le DOM.' },
    { stem: 'Le compilateur transforme le JSX en…', opts: ['Appels à React.createElement()', 'Chaînes de texte injectées avec innerHTML', 'Code binaire machine assembleur'], correct: 0, exp: 'JSX est du sucre syntaxique compilé en React.createElement.' },
    { stem: 'En JSX, l’attribut de classe CSS s’écrit…', opts: ['className', 'class', 'classList'], correct: 0, exp: 'class étant réservé en JS, on utilise className.' },
    { stem: 'L’outil de build moderne privilégié pour React est…', opts: ['Vite', 'Create React App', 'Gulp'], correct: 0, exp: 'Vite offre un rechargement HMR instantané grâce aux modules ES.' },
    { stem: 'Pour renvoyer plusieurs éléments sans balise conteneur, on utilise…', opts: ['Un Fragment React (&lt;&gt;...&lt;/&gt;)', 'Une balise &lt;iframe&gt;', 'Un tableau JSON brut'], correct: 0, exp: 'Les Fragments n’ajoutent aucun nœud inutile au DOM réel.' },
    { stem: 'Le point d’ancrage de l’application React dans le DOM est créé avec…', opts: ['createRoot() de react-dom/client', 'document.write()', 'window.navigate()'], correct: 0, exp: 'ReactDOM.createRoot initialise l’arbre de rendu racine.' },
    { stem: 'Toutes les balises auto-fermantes en JSX doivent se terminer par…', opts: ['/&gt;', '&gt;', ']]&gt;'], correct: 0, exp: 'En JSX, la fermeture des balises est obligatoire et stricte.' }
  ],

  pitfalls: [
    'Oublier de fermer une balise orpheline (&lt;img /&gt; ou &lt;input /&gt;).',
    'Écrire class="..." au lieu de className="...".',
    'Renvoyer deux balises sœurs sans Fragment (&lt;&gt;...&lt;/&gt;) au niveau racine.',
    'Tenter de manipuler le DOM avec querySelector au lieu de laisser React gérer le rendu.',
    'Confondre un composant React (PascalCase) avec une balise HTML native (minuscule).'
  ],

  methodTitle: 'Décomposer une interface en composants React',
  method: [
    '<strong>Observer</strong> la maquette graphique et identifier les blocs fonctionnels répétés.',
    '<strong>Nommer</strong> chaque composant avec une majuscule (Header, Card, SearchBar).',
    '<strong>Définir</strong> la hiérarchie parent-enfant et l’arbre de composants.',
    '<strong>Traduire</strong> le gabarit HTML en JSX valide (className, fermeture des balises).',
    '<strong>Monter</strong> le composant racine dans createRoot pour valider l’affichage.'
  ],

  summary: [
    'React est une bibliothèque déclarative : l’UI est une fonction directe de l’état (UI = f(state)).',
    'Vite est l’environnement de développement moderne recommandé (rapide, ESM natif).',
    'Le JSX combine la puissance de JavaScript et la clarté du HTML sous forme d’arborescence.',
    'Chaque balise JSX est compilée sous le capot en un appel à React.createElement.',
    'createRoot permet de monter l’application React sur un élément racine du DOM.'
  ],

  checklist: [
    'Je comprends la différence entre programmation déclarative et impérative.',
    'Je sais initialiser un projet React avec Vite.',
    'Je respecte les 3 règles de syntaxe du JSX (racine unique, fermeture, camelCase).',
    'Je sais utiliser les Fragments (&lt;&gt;...&lt;/&gt;).',
    'Je sais comment l’application est ancrée dans le DOM réel via createRoot.'
  ],

  notions: ['React', 'Composant', 'JSX', 'Paradigme déclaratif', 'Vite', 'React.createElement', 'createRoot', 'Virtual DOM', 'Fragment', 'className'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les bases du JSX et la différence déclaratif/impératif.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la structure d’un projet Vite et les règles de balisage.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez la décomposition et le modèle mental React.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux composants et aux props dans le chapitre 2.' }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « Paradigme déclaratif » ?', a: 'comprendre le paradigme déclaratif par opposition à l’impératif ;' },
      { q: 'Qu’est-ce que « Virtual DOM » ?', a: 'Virtual DOM : Face aux interfaces web modernes riches en données et en interactions, manipuler le DOM à la main devient rapidement ingérable et source de bugs. React introduit un modèle déclaratif fondé sur des composants réutilisables orchestrés par un outillage ultra-rapide (Vite).' },
      { q: 'Qu’est-ce que « Composant fonctionnel » ?', a: 'En React moderne, un composant fonctionnel est une simple fonction JavaScript qui reçoit un objet de données appelé props et renvoie une description de l’UI en JSX.' },
      { q: 'Qu’est-ce que « Valeurs par défaut » ?', a: 'déstructurer les props et définir des valeurs par défaut robustes ;' },
      { q: 'Qu’est-ce que « Batching » ?', a: 'Les mises à jour d’état en React sont regroupées par lot ( batching ). Si une nouvelle valeur dépend directement de l’ancienne valeur (par exemple lors de plusieurs incrémentations rapides), il faut passer une fonction de rappel :' },
      { q: 'Qu’est-ce que « onChange » ?', a: 'manipuler les événements synthétiques (onClick, onChange, onSubmit) ;' },
      { q: 'Qu’est-ce que « e.preventDefault() » ?', a: 'À quoi sert e.preventDefault() dans onSubmit ?' },
      { q: 'Qu’est-ce que « Réconciliation » ?', a: 'comprendre le rôle fondamental de la prop key pour l’algorithme de réconciliation ;' },
      { q: 'Qu’est-ce que « Rendu conditionnel » ?', a: 'maîtriser les différentes techniques de rendu conditionnel (if, ternaire, court-circuit) ;' },
      { q: 'Qu’est-ce que « Opérateur ternaire » ?', a: 'Je maîtrise l’opérateur ternaire et le court-circuit && en JSX.' },
      { q: 'Qu’est-ce que « Index de boucle » ?', a: 'Utiliser l’index de boucle ( key={index} ) fonctionne si la liste est statique. Mais en cas d’ajout en tête, de suppression ou de tri, les index changent : React confond alors l’état interne des composants enfants (comme le contenu de champs de saisie ou des cases cochées). Utili' },
      { q: 'Qu’est-ce que « Données dérivées » ?', a: 'Les données dérivées (filtres, compteurs) doivent être calculées au vol sans état redondant.' },
      { q: 'Qu’est-ce que « Effet de bord (Side effect) » ?', a: 'définir la notion d’effet de bord (side effect) dans une application frontend ;' },
      { q: 'Qu’est-ce que « Tableau de dépendances » ?', a: 'comprendre le rôle critique du tableau de dépendances et la règle d’exhaustivité ;' },
      { q: 'Qu’est-ce que « Cleanup function » ?', a: 'Cleanup function : implémenter des fonctions de nettoyage (cleanup) pour éviter les fuites mémoire ;' },
      { q: 'Qu’est-ce que « fetch API » ?', a: 'fetch API : React B2 › Sommaire › Chapitre 5' },
      { q: 'Qu’est-ce que « Loading state » ?', a: 'Loading state : gérer le cycle complet d’un appel API (états loading, data et error).' },
      { q: 'Qu’est-ce que « React Router » ?', a: 'Une application web d’envergure ne se résume pas à un écran unique : elle comprend des pages de profil, un tableau de bord, des formulaires et des vues détaillées. React Router permet de créer une navigation fluide sans rechargement de page tout en conservant les URLs et l’histor' },
      { q: 'Qu’est-ce que « BrowserRouter » ?', a: 'configurer React Router v6 (BrowserRouter, Routes, Route, Link) ;' },
      { q: 'Qu’est-ce que « Link / NavLink » ?', a: 'Link / NavLink : configurer React Router v6 (BrowserRouter, Routes, Route, Link) ;' },
    { q: 'Qu’est-ce que React ?', a: 'Une bibliothèque JavaScript déclarative et basée sur des composants pour créer des interfaces utilisateur.' },
    { q: 'Que signifie UI = f(state) ?', a: 'L’interface visuelle est le résultat prédictible d’une fonction pure recevant les données d’état.' },
    { q: 'En quoi JSX est-il compilé ?', a: 'En appels à React.createElement(type, props, children).' },
    { q: 'Pourquoi utilise-t-on className au lieu de class ?', a: 'Parce que class est un mot réservé en JavaScript pour la déclaration de classes.' },
    { q: 'À quoi sert un Fragment (&lt;&gt;...&lt;/&gt;) ?', a: 'À regrouper plusieurs éléments enfants sans ajouter de nœud div inutile dans le DOM.' },
    { q: 'Quelle méthode monte l’application dans le DOM ?', a: 'createRoot(document.getElementById(\'root\')).render(&lt;App /&gt;).' }
  ],

  next: {
    href: 'chapitre2.html',
    label: 'Chapitre 2 : Composants & Props'
  }
};
