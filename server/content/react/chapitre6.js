/**
 * Chapitre 6 du cours « React » B2 — Navigation avec React Router et architecture globale.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Navigation avec React Router & architecture globale',
  short: 'Routage & Architecture',
  toc: 'Single Page Application, BrowserRouter, Routes, Link, useParams, Outlet, useReducer et structuration d’un projet complet.',
  time: '≈ 3 h 15 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une application web d’envergure ne se résume pas à un écran unique : elle comprend des pages de profil, ' +
    'un tableau de bord, des formulaires et des vues détaillées. React Router permet de créer une navigation ' +
    'fluide sans rechargement de page tout en conservant les URLs et l’historique du navigateur.',

  objectives: [
    'comprendre le fonctionnement d’une Single Page Application (SPA) et l’API History du navigateur ;',
    'configurer React Router v6 (BrowserRouter, Routes, Route, Link) ;',
    'extraire des paramètres dynamiques d’URL avec le Hook useParams ;',
    'concevoir des routes imbriquées à l’aide du composant Outlet ;',
    'gérer des flux d’état globaux avec useReducer et structurer une base de code professionnelle.'
  ],

  sections: [
    {
      title: 'Le concept de Single Page Application (SPA)',
      html: [
        '<p>Dans une application web traditionnelle, chaque clic sur un lien <code>&lt;a href="..."&gt;</code> ' +
        'envoie une requête au serveur qui renvoie une nouvelle page HTML complète, provoquant un clignotement blanc.</p>',
        '<p>Dans une <strong>SPA</strong> (Single Page Application), une seule page HTML est chargée au départ. ' +
        'Le routeur intercepte les clics sur les liens, modifie l’URL dans la barre d’adresse avec l’API ' +
        '<code>window.history.pushState()</code>, et met à jour uniquement les composants correspondant à la nouvelle route.</p>',
        box('intuition', 'Navigation instantanée', 'lightbulb',
          '    <p>La navigation devient instantanée car le navigateur n’a plus besoin de re-télécharger ni de re-parser ' +
          'les feuilles de style et les bundles JavaScript à chaque changement de page.</p>')
      ].join('\n')
    },
    {
      title: 'Configuration de React Router v6',
      html: [
        '<p>Pour intégrer le routage dans un projet React, on installe <code>react-router-dom</code> :</p>',
        '<pre><code>import { BrowserRouter, Routes, Route, Link, NavLink } from \'react-router-dom\';\n\nfunction App() {\n  return (\n    &lt;BrowserRouter&gt;\n      &lt;nav&gt;\n        &lt;NavLink to="/" end&gt;Accueil&lt;/NavLink&gt;\n        &lt;NavLink to="/cours"&gt;Cours&lt;/NavLink&gt;\n        &lt;NavLink to="/contact"&gt;Contact&lt;/NavLink&gt;\n      &lt;/nav&gt;\n\n      &lt;Routes&gt;\n        &lt;Route path="/" element={&lt;Accueil /&gt;} /&gt;\n        &lt;Route path="/cours" element={&lt;ListeCours /&gt;} /&gt;\n        &lt;Route path="/cours/:slug" element={&lt;DetailCours /&gt;} /&gt;\n        &lt;Route path="*" element={&lt;PageIntrouvable /&gt;} /&gt;\n      &lt;/Routes&gt;\n    &lt;/BrowserRouter&gt;\n  );\n}</code></pre>',
        box('tech', 'Link vs balise a standard', 'code',
          '    <p>N’utilisez jamais <code>&lt;a href="..."&gt;</code> pour la navigation interne : cela recharge la page entière ' +
          'et réinitialise tout le state React ! Utilisez systématiquement <code>&lt;Link to="..."&gt;</code> ou <code>&lt;NavLink to="..."&gt;</code>.</p>')
      ].join('\n')
    },
    {
      title: 'Paramètres dynamiques et useParams',
      html: [
        '<p>Pour créer des pages dynamiques (ex. <code>/cours/react</code> ou <code>/utilisateurs/42</code>), ' +
        'on déclare un paramètre préfixé par <code>:</code> dans le chemin de la route. Dans le composant cible, ' +
        'le Hook <code>useParams()</code> récupère ces valeurs :</p>',
        '<pre><code>import { useParams } from \'react-router-dom\';\n\nfunction DetailCours() {\n  const { slug } = useParams();\n  return &lt;h1&gt;Consultation du cours : {slug}&lt;/h1&gt;;\n}</code></pre>'
      ].join('\n')
    },
    {
      title: 'Architecture professionnelle et gestion d’état par Reducer',
      html: [
        '<p>Lorsque la complexité augmente, regrouper les données dans de multiples <code>useState</code> devient confus. ' +
        'Le Hook <code>useReducer</code> offre une architecture prédictible inspirée du pattern Redux :</p>',
        '<pre><code>function panierReducer(state, action) {\n  switch (action.type) {\n    case \'AJOUT\':\n      return { ...state, total: state.total + action.prix };\n    case \'REMISE\':\n      return { ...state, total: Math.max(0, state.total - action.valeur) };\n    default:\n      return state;\n  }\n}</code></pre>',
        box('warn', 'Organisation recommandée d’un projet React', 'shield',
          '    <ul>\n' +
          '      <li><code>src/components/</code> : composants UI réutilisables (boutons, cartes, modales).</li>\n' +
          '      <li><code>src/pages/</code> : composants représentant les pages de l’application.</li>\n' +
          '      <li><code>src/hooks/</code> : Hooks personnalisés (ex. useAuth, useFetch).</li>\n' +
          '      <li><code>src/services/</code> : fonctions d’appel aux APIs backend.</li>\n' +
          '    </ul>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Pour naviguer sans rechargement de page dans React Router, on utilise…', opts: ['Le composant &lt;Link to="..."&gt;', 'La balise HTML standard &lt;a href="..."&gt;', 'La méthode window.reload()'], correct: 0, exp: 'Link intercepte le clic et utilise pushState pour une navigation SPA fluide.' },
    { stem: 'Le Hook pour extraire les paramètres d’URL (ex. :id) s’appelle…', opts: ['useParams()', 'useRouteQuery()', 'useURL()'], correct: 0, exp: 'useParams renvoie un objet avec les segments dynamiques de la route.' },
    { stem: 'Le composant servant d’emplacement pour les sous-routes est…', opts: ['&lt;Outlet /&gt;', '&lt;Placeholder /&gt;', '&lt;RouteSlot /&gt;'], correct: 0, exp: 'Outlet permet à un layout parent de rendre le composant de la sous-route active.' },
    { stem: 'Le hook useReducer est particulièrement recommandé lorsque…', opts: ['L’état est complexe et implique de multiples sous-valeurs interdépendantes', 'L’application ne comporte aucun composant', 'On veut bloquer le rendu du DOM'], correct: 0, exp: 'useReducer centralise les règles de transition d’état dans une fonction pure.' },
    { stem: 'Une route 404 « introuvable » est configurée avec le chemin…', opts: ['path="*"\', \'path="404"\', \'path="none"'], correct: 0, exp: 'L’astérisque (*) capture toutes les URLs ne correspondant à aucune route précédente.' },
    { stem: 'Pour rediriger automatiquement un utilisateur non authentifié, on rend…', opts: ['&lt;Navigate to="/login" replace /&gt;', '&lt;RedirectPermanent /&gt;', '&lt;window.forward /&gt;'], correct: 0, exp: 'Navigate permet des redirections déclaratives en JSX.' },
    { stem: 'La navigation programmatique (ex. après validation d’un formulaire) s’effectue avec…', opts: ['const navigate = useNavigate()', 'history.jump()', 'router.forward()'], correct: 0, exp: 'useNavigate fournit une fonction impérative de changement de route.' },
    { stem: 'Dans quel dossier place-t-on habituellement les appels aux APIs distantes ?', opts: ['src/services/', 'src/styles/', 'public/assets/'], correct: 0, exp: 'Isoler les services réseau découple la logique métier de la vue UI.' }
  ],

  pitfalls: [
    'Utiliser des balises &lt;a&gt; au lieu de &lt;Link&gt; dans une SPA React.',
    'Oublier d’envelopper l’arborescence des routes dans un &lt;BrowserRouter&gt;.',
    'Omettre le composant &lt;Outlet /&gt; dans un composant de Layout contenant des sous-routes.',
    'Muter l’état à l’intérieur d’un reducer au lieu de renvoyer un nouvel objet { ...state }.',
    'Mélanger les responsabilités en plaçant des requêtes HTTP directes dans des composants UI de bas niveau.'
  ],

  methodTitle: 'Structurer et sécuriser la navigation d’une application React',
  method: [
    '<strong>Définir</strong> l’arborescence des URLs (publiques, privées, introuvables).',
    '<strong>Configurer</strong> le BrowserRouter au niveau le plus haut de l’application.',
    '<strong>Organiser</strong> les composants dans des dossiers dédiés (pages, components, services).',
    '<strong>Protéger</strong> les routes sensibles à l’aide d’un composant PrivateRoute vérifiant la session.',
    '<strong>Gérer</strong> les paramètres d’URL avec useParams pour les vues de détail dynamiques.'
  ],

  summary: [
    'React Router transforme une application React en Single Page Application navigable et rapide.',
    'BrowserRouter synchronise l’UI avec l’URL du navigateur via l’History API.',
    'Les composants Link et NavLink évitent le rechargement de page natif.',
    'useParams et Outlet permettent des routes dynamiques et des layouts imbriqués modulaires.',
    'useReducer apporte une architecture prévisible pour les états complexes et volumineux.'
  ],

  checklist: [
    'Je sais configurer BrowserRouter, Routes et Route.',
    'J’utilise Link ou NavLink pour tous mes liens internes.',
    'J’extrais des identifiants dynamiques avec useParams.',
    'J’utilise Outlet pour composer des pages avec barre de navigation ou sidebar.',
    'Je structure mes projets React selon les standards professionnels de l’industrie.'
  ],

  notions: ['React Router', 'SPA', 'BrowserRouter', 'Routes / Route', 'Link / NavLink', 'useParams', 'Outlet', 'Navigate', 'useReducer', 'Architecture frontend'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les bases du routage déclaratif et la différence avec les balises &lt;a&gt;.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les paramètres dynamiques et les layouts imbriqués.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez le routage avancé et l’architecture SPA.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise complète : félicitations, passe aux ateliers et examens blancs !' }
  ],

  flashcards: [
    { q: 'Pourquoi une SPA est-elle plus fluide qu’un site classique ?', a: 'Car elle ne recharge jamais l’intégralité de la page HTML : seul le contenu ciblé est re-rendu.' },
    { q: 'Que fait le composant &lt;Link to="..."&gt; ?', a: 'Il modifie l’URL via window.history sans déclencher de rechargement réseau de la page.' },
    { q: 'À quoi sert useParams() ?', a: 'À récupérer les paramètres dynamiques d’URL déclarés avec la notation :nom dans la Route.' },
    { q: 'Quel est le rôle de &lt;Outlet /&gt; ?', a: 'C’est le point d’insertion où le composant de la sous-route active est affiché à l’intérieur d’un layout parent.' },
    { q: 'Comment rediriger un utilisateur non connecté ?', a: 'En renvoyant &lt;Navigate to="/login" replace /&gt; si la condition d’authentification est fausse.' },
    { q: 'Qu’est-ce qu’une fonction réductrice (reducer) ?', a: 'Une fonction pure (state, action) => newState calculant le prochain état de manière immuable.' }
  ]
};
