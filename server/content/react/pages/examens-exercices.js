/**
 * Pages « examens blancs » et « exercices & projet » du cours « React » B2.
 */
'use strict';

const { ic, crumb, box, qcm, bands } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 : Composants, JSX, Props & State',
      intro: 'Sujet théorique et pratique : modèle mental, syntaxe JSX, communication par props et formulaires contrôlés.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : JSX & Composants',
          text: 'Quelles sont les trois règles strictes de syntaxe à respecter impérativement en JSX ? Expliquez pourquoi un nom de composant doit commencer par une majuscule.',
          sol: 'Les 3 règles : (1) <strong>Un seul élément racine</strong> ou un Fragment <code>&lt;&gt;...&lt;/&gt;</code> ; (2) <strong>Fermeture obligatoire</strong> de toutes les balises, y compris orphelines (<code>&lt;img /&gt;</code>) ; (3) <strong>Attributs en camelCase</strong> (<code>className</code>, <code>htmlFor</code>). Une majuscule initiale indique à React qu’il s’agit d’un composant personnalisé ; en minuscule, React le transmet au navigateur comme balise HTML native.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Props & Children',
          text: 'Définissez la nature des props en React. Comment concevoir un composant conteneur réutilisable (ex. Modal ou Card) sans connaître à l’avance son contenu textuel ?',
          sol: 'Les props sont <strong>en lecture seule (immuables)</strong> : un composant ne doit jamais modifier ses props reçues. Pour concevoir un conteneur générique, on utilise la prop spéciale réservée <strong><code>props.children</code></strong>, qui capture et injecte le JSX imbriqué entre les balises ouvrante et fermante du composant.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Hook useState',
          text: 'Pourquoi l’affectation directe variable = valeur ne met-elle pas à jour l’interface ? Quelle fonction de mise à jour devez-vous utiliser si l’état suivant dépend du précédent ?',
          sol: 'Une variable JavaScript locale n’informe pas React d’un changement en mémoire. Seul le setter renvoyé par <code>useState</code> planifie un nouveau rendu et déclenche le réconciliateur. Si le nouvel état dépend de l’ancien, on passe une fonction de rappel : <code>setCount(prev =&gt; prev + 1)</code> pour éviter les incohérences liées au regroupement par lot (batching).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Formulaire contrôlé',
          text: 'Expliquez le fonctionnement d’un champ de saisie contrôlé. Pourquoi est-il indispensable d’appeler e.preventDefault() lors de la soumission ?',
          sol: 'Dans un input contrôlé, la prop <code>value</code> est liée à une variable d’état et l’événement <code>onChange</code> met à jour cet état : React est la <strong>source unique de vérité</strong>. <code>e.preventDefault()</code> neutralise le comportement natif du navigateur qui rechargerait la page entière, ce qui détruirait l’état en mémoire dans une SPA.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 : Listes, Cycle de vie & Architecture SPA',
      intro: 'Sujet d’approfondissement : réconciliation, synchronisation d’effets de bord et routage multipage.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Listes & Key',
          text: 'Pourquoi est-il crucial de fournir une prop key lors du rendu d’un tableau avec map() ? Pourquoi l’index de boucle (key={index}) est-il vivement déconseillé sur une liste dynamique ?',
          sol: 'La prop <code>key</code> fournit une identité stable à chaque élément pour que l’algorithme de réconciliation identifie les ajouts, déplacements et suppressions dans le DOM sans tout redessiner. L’index de boucle est lié à la position et non à l’élément : si la liste est triée ou qu’un élément est inséré au début, les index changent et créent des bugs visuels d’état chez les composants enfants.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Hook useEffect',
          text: 'Distinguez le comportement de useEffect selon que son tableau de dépendances est : (a) absent ; (b) vide [] ; (c) garni [id, role]. À quoi sert la fonction renvoyée par le callback ?',
          sol: '(a) <strong>Absent</strong> : s’exécute après chaque rendu. (b) <strong>Vide []</strong> : s’exécute une seule fois au montage initial. (c) <strong>Garni [id, role]</strong> : s’exécute au montage puis dès que id ou role change. La fonction renvoyée est la <strong>cleanup function</strong>, exécutée au démontage ou avant le prochain effet pour détruire les timers ou abonnements résiduels.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Requête asynchrone',
          text: 'Décrivez l’architecture recommandée pour effectuer un appel fetch dans un composant sans provoquer de boucle infinie et en gérant les états de chargement.',
          sol: 'On déclare trois variables d’état (<code>data</code>, <code>loading</code>, <code>error</code>). On place l’appel dans un <code>useEffect</code> avec un tableau de dépendances adapté (ex. <code>[userId]</code>). On déclare une fonction <code>async</code> interne, avec bloc <code>try/catch/finally</code>. Un booléen d’annulation (ou AbortController) dans le cleanup évite les courses de requêtes (race conditions).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Routage & Architecture',
          text: 'Comment fonctionne la navigation sans rechargement dans React Router ? Citez les rôles respectifs de BrowserRouter, Link, useParams et useReducer.',
          sol: 'React Router utilise l’API History (<code>pushState</code>) du navigateur pour changer l’URL et monte conditionnellement les composants associés sans recharger le HTML. <strong>BrowserRouter</strong> synchronise le contexte d’URL ; <strong>Link</strong> intercepte le clic ; <strong>useParams</strong> extrait les paramètres dynamiques (ex. <code>:id</code>) ; <strong>useReducer</strong> centralise la gestion d’états complexes via des actions et une fonction pure.'
        }
      ]
    }
  ];

  const htmlSujets = sujets.map((sujet, sIdx) => [
    '  <h2>' + sujet.title + '</h2>',
    '  <p class="lead">' + sujet.intro + '</p>',
    sujet.items.map(item => [
      '  <div class="box box--it">',
      '    <div class="box__title">' + ic('clipboard') + ' ' + item.num + ' <span class="tag tag--time" style="margin-left:auto">' + item.badge + '</span></div>',
      '    <p><strong>Énoncé :</strong> ' + item.text + '</p>',
      '    <details style="margin-top:10px;cursor:pointer"><summary style="font-weight:700;color:var(--__S__-deep)">' + ic('check') + ' Voir le corrigé type</summary>',
      '      <div style="margin-top:10px;padding:12px;background:#fff;border-radius:8px;border:1px solid var(--__S__-bd)">' + item.sol + '</div>',
      '    </details>',
      '  </div>'
    ].join('\n')).join('\n')
  ].join('\n\n')).join('\n\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examens blancs</h1>',
    '  <p class="lead">Deux sujets complets notés sur 20 points, fidèles aux épreuves écrites et pratiques ' +
    'de Licence 2. Entraînez-vous en conditions réelles, puis consulte les corrigés détaillés.</p>',
    box('method', 'Conseils pour l’épreuve', 'compass', [
      '    <ul>',
      '      <li><strong>Temps indicatif</strong> : 1 heure 30 par sujet sans document.</li>',
      '      <li><strong>Précision du vocabulaire</strong> : employez les termes exacts (déclaratif, immutabilité, réconciliateur, hook, cleanup).</li>',
      '      <li><strong>Syntaxe JSX</strong> : veillez à fermer toutes les balises et à utiliser camelCase pour les attributs.</li>',
      '    </ul>'
    ].join('\n')),
    htmlSujets,
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../atelier.html', label: 'Atelier de code' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Sujets d’examen blanc corrigés pour le cours de React B2 : composants, JSX, props, state, effets et routage.',
      active: 'simulateur',
      body
    }
  };
}

/* ======================== Exercices & Projet ======================== */

function exercices(course) {
  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices pratiques &amp; projet fil conducteur</h1>',
    '  <p class="lead">18 ateliers de programmation répartis sur les six chapitres du cours, complétés ' +
    'par le développement guidé d’une application complète : la <strong>Todo App réactive</strong>.</p>',

    box('objectifs', 'Le catalogue des 18 exercices', 'target', [
      '    <ul>',
      '      <li><strong>Chapitre 1</strong> : Création d’éléments virtuels, rendu conditionnel JSX, arborescence de composants.</li>',
      '      <li><strong>Chapitre 2</strong> : Valeurs par défaut des props, composition avec children, déstructuration de props.</li>',
      '      <li><strong>Chapitre 3</strong> : Simulateur useState, validation d’inputs contrôlés, immutabilité de tableaux d’état.</li>',
      '      <li><strong>Chapitre 4</strong> : Listes avec prop key, filtrage insensible à la casse, court-circuit logique.</li>',
      '      <li><strong>Chapitre 5</strong> : Détection de dépendances useEffect, machine d’états API, nettoyage de timers.</li>',
      '      <li><strong>Chapitre 6</strong> : Paramètres dynamiques useParams, route protégée Navigate, architecture par reducer.</li>',
      '    </ul>',
      '    <p><a class="btn" href="../atelier.html">' + ic('terminal') + ' Ouvrir l’atelier libre</a></p>'
    ].join('\n')),

    '  <h2>Projet fil conducteur : La Todo App réactive complète</h2>',
    '  <p class="lead">Ce projet intègre l’ensemble des notions du cours dans une application professionnelle ' +
    'organisée en modules modulaires.</p>',

    box('it', 'Étape 1 : Découpage et composants fonctionnels', 'code', [
      '    <p>Créer l’arborescence des composants :</p>',
      '    <ul>',
      '      <li><code>App.jsx</code> : orchestrateur principal et gestion du state global des tâches.</li>',
      '      <li><code>Header.jsx</code> : affichage du titre et du compteur de tâches restantes.</li>',
      '      <li><code>TodoForm.jsx</code> : formulaire contrôlé avec champ de saisie et bouton d’ajout.</li>',
      '      <li><code>TodoList.jsx</code> : rendu de la collection via map() et attribution de clés uniques.</li>',
      '      <li><code>TodoItem.jsx</code> : ligne individuelle avec case à cocher et bouton de suppression.</li>',
      '    </ul>'
    ].join('\n')),

    box('it', 'Étape 2 : Gestion réactive de l’état (useState)', 'wrench', [
      '    <p>Implémenter les actions fondamentales de manière strictement immuable :</p>',
      '    <pre><code>// Ajout d’une tâche\nsetTodos(prev => [...prev, { id: crypto.randomUUID(), texte, fait: false }]);\n\n// Bascule de statut\nsetTodos(prev => prev.map(t => t.id === id ? { ...t, fait: !t.fait } : t));\n\n// Suppression\nsetTodos(prev => prev.filter(t => t.id !== id));</code></pre>'
    ].join('\n')),

    box('it', 'Étape 3 : Filtrage dynamique sans état redondant', 'play', [
      '    <p>Calculer les tâches affichées selon le filtre actif (toutes, en cours, terminées) sans dupliquer le tableau dans un second state :</p>',
      '    <pre><code>const [filtre, setFiltre] = useState(\'toutes\');\n\nconst tachesVisibles = todos.filter(t => {\n  if (filtre === \'actives\') return !t.fait;\n  if (filtre === \'terminees\') return t.fait;\n  return true;\n});</code></pre>'
    ].join('\n')),

    box('it', 'Étape 4 : Persistance locale avec useEffect', 'bookmark', [
      '    <p>Synchroniser les données avec le <code>localStorage</code> du navigateur pour conserver les tâches après rechargement :</p>',
      '    <pre><code>// Chargement initial\nconst [todos, setTodos] = useState(() => {\n  const saved = localStorage.getItem(\'todos_app\');\n  return saved ? JSON.parse(saved) : [];\n});\n\n// Sauvegarde automatique à chaque modification\nuseEffect(() => {\n  localStorage.setItem(\'todos_app\', JSON.stringify(todos));\n}, [todos]);</code></pre>'
    ].join('\n')),

    box('it', 'Étape 5 : Navigation avec React Router', 'compass', [
      '    <p>Ajouter une barre de navigation pour séparer les vues de l’application :</p>',
      '    <ul>',
      '      <li><code>/</code> : liste interactive des tâches courantes.</li>',
      '      <li><code>/statistiques</code> : indicateurs de productivité et graphiques d’avancement.</li>',
      '      <li><code>/a-propos</code> : crédits et technologies employées.</li>',
      '    </ul>'
    ].join('\n')),

    chnav({ href: '../chapitres/formules.html', label: 'Mémo syntaxe' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices & projet — ' + course.brand,
      description: 'Catalogue des 18 exercices et cahier des charges du projet Todo App réactive pour le cours de React B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
