/**
 * Chapitre 5 du cours « React » B2 — Effets de bord (useEffect) et requêtes asynchrones.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Effets de bord (useEffect) & requêtes asynchrones',
  short: 'Effets & Appels API',
  toc: 'Hook useEffect, cycle de vie, tableau de dépendances, cleanup function, requêtes HTTP et gestion d’états asynchrones.',
  time: '≈ 3 h 00 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un composant React doit rester pur lors de son rendu : il ne doit pas déclencher d’appels réseau ' +
    'ni d’abonnements pendant le calcul du JSX. Pour synchroniser le composant avec le monde extérieur ' +
    '(APIs REST, timers, stockage local), React propose le Hook useEffect.',

  objectives: [
    'définir la notion d’effet de bord (side effect) dans une application frontend ;',
    'maîtriser la syntaxe et le fonctionnement du Hook useEffect ;',
    'comprendre le rôle critique du tableau de dépendances et la règle d’exhaustivité ;',
    'implémenter des fonctions de nettoyage (cleanup) pour éviter les fuites mémoire ;',
    'gérer le cycle complet d’un appel API (états loading, data et error).'
  ],

  sections: [
    {
      title: 'Qu’est-ce qu’un effet de bord en React ?',
      html: [
        '<p>Un <strong>effet de bord</strong> (ou <em>side effect</em>) désigne toute opération qui interagit avec ' +
        'l’extérieur du composant ou modifie un état hors de son cycle de calcul pur :</p>',
        '<ul>\n' +
        '  <li>Effectuer une requête HTTP vers une API backend (<code>fetch</code>, Axios) ;</li>\n' +
        '  <li>Démarrer ou arrêter une minuterie (<code>setTimeout</code>, <code>setInterval</code>) ;</li>\n' +
        '  <li>Écouter un événement global du navigateur (<code>window.addEventListener</code>) ;</li>\n' +
        '  <li>Modifier directement le titre de la page (<code>document.title = ...</code>).</li>\n' +
        '</ul>',
        box('intuition', 'Séparer le calcul du rendu et les effets', 'lightbulb',
          '    <p>Le corps d’un composant sert exclusivement à calculer la représentation visuelle (JSX). ' +
          'Tous les effets secondaires doivent être différés dans <code>useEffect</code>, qui s’exécute <strong>après</strong> ' +
          'que le navigateur a mis à jour l’écran.</p>')
      ].join('\n')
    },
    {
      title: 'Le Hook useEffect et son tableau de dépendances',
      html: [
        '<p>Le Hook <code>useEffect</code> accepte deux arguments : une fonction d’effet et un tableau optionnel de dépendances :</p>',
        '<pre><code>import { useState, useEffect } from \'react\';\n\nuseEffect(() =&gt; {\n  // Code exécuté après le rendu\n}, [dependance1, dependance2]);</code></pre>',
        box('tech', 'Les 3 modes du tableau de dépendances', 'code',
          '    <ol>\n' +
          '      <li><strong>Aucun tableau fourni</strong> : l’effet s’exécute après <em>absolument chaque rendu</em> du composant (à éviter pour les requêtes réseau).</li>\n' +
          '      <li><strong>Tableau vide <code>[]</code></strong> : l’effet ne s’exécute qu’une seule fois, au <em>montage initial</em> du composant.</li>\n' +
          '      <li><strong>Tableau garni <code>[a, b]</code></strong> : l’effet s’exécute au montage, puis se réexécute si et seulement si <code>a</code> ou <code>b</code> change de valeur.</li>\n' +
          '    </ol>')
      ].join('\n')
    },
    {
      title: 'La fonction de nettoyage (Cleanup function)',
      html: [
        '<p>Certains effets nécessitent d’être annulés pour libérer des ressources lorsque le composant est retiré de l’écran ' +
        '(démontage) ou avant que le prochain effet ne s’applique. Pour cela, la fonction d’effet renvoie une <strong>fonction de nettoyage</strong> :</p>',
        '<pre><code>useEffect(() =&gt; {\n  const intervalId = setInterval(() =&gt; {\n    console.log(\'Battement d’horloge\');\n  }, 1000);\n\n  // Fonction de nettoyage appelée au démontage :\n  return () =&gt; {\n    clearInterval(intervalId);\n    console.log(\'Minuterie nettoyée !\');\n  };\n}, []);</code></pre>'
      ].join('\n')
    },
    {
      title: 'Appels API et gestion des états asynchrones',
      html: [
        '<p>La fonction passée à <code>useEffect</code> ne peut pas être marquée directement comme <code>async</code> car elle doit ' +
        'renvoyer soit rien, soit une fonction de nettoyage (et non une Promesse). On déclare donc une fonction asynchrone interne :</p>',
        '<pre><code>function ProfilUtilisateur({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() =&gt; {\n    let actif = true;\n    setLoading(true);\n\n    async function chargerDonnees() {\n      try {\n        const res = await fetch(\`https://api.exemple.fr/users/\${userId}\`);\n        if (!res.ok) throw new Error(\'Erreur HTTP \' + res.status);\n        const data = await res.json();\n        if (actif) setUser(data);\n      } catch (err) {\n        if (actif) setError(err.message);\n      } finally {\n        if (actif) setLoading(false);\n      }\n    }\n\n    chargerDonnees();\n    return () =&gt; { actif = false; }; // Évite les courses de requêtes\n  }, [userId]);\n\n  if (loading) return &lt;p&gt;Chargement...&lt;/p&gt;;\n  if (error) return &lt;p className="erreur"&gt;Erreur : {error}&lt;/p&gt;;\n  return &lt;h1&gt;{user?.nom}&lt;/h1&gt;;\n}</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Le callback passé à useEffect s’exécute…', opts: ['Après que le navigateur a peint le rendu dans le DOM', 'Avant l’initialisation de la fonction', 'Pendant la compilation du fichier'], correct: 0, exp: 'useEffect s’exécute de manière asynchrone après l’affichage pour ne pas bloquer l’écran.' },
    { stem: 'Si aucun tableau de dépendances n’est fourni, l’effet s’exécute…', opts: ['Après chaque rendu du composant', 'Une seule fois au montage', 'Jamais'], correct: 0, exp: 'Sans tableau, l’effet se relance à chaque actualisation.' },
    { stem: 'Un tableau de dépendances vide ([]) signifie que l’effet s’exécute…', opts: ['Une seule fois au montage initial', 'En boucle continue', 'Uniquement au démontage'], correct: 0, exp: '[] indique à React que l’effet ne dépend d’aucune valeur réactive.' },
    { stem: 'La fonction renvoyée par le callback de useEffect sert à…', opts: ['Nettoyer les abonnements, timers ou écouteurs d’événements', 'Sauvegarder l’état dans un fichier', 'Forcer le rafraîchissement'], correct: 0, exp: 'La cleanup function prévient les fuites de mémoire lors du démontage ou ré-exécution.' },
    { stem: 'Pourquoi ne peut-on pas passer directement une fonction async à useEffect ?', opts: ['Car une fonction async retourne une Promise au lieu d’une cleanup function synchrone', 'Car async est réservé au backend Node', 'Car cela désactive le Virtual DOM'], correct: 0, exp: 'React attend une fonction de nettoyage ou undefined, pas une promesse.' },
    { stem: 'Comment éviter les courses de requêtes (race conditions) dans useEffect ?', opts: ['Avec un booléen actif ou un AbortController dans le nettoyage', 'En augmentant le débit réseau', 'En désactivant le cache'], correct: 0, exp: 'Annuler ou ignorer la requête précédente évite d’écraser des données récentes avec d’anciennes réponses.' },
    { stem: 'Quels sont les trois états fondamentaux d’une requête asynchrone ?', opts: ['Chargement (loading), Données (data) et Erreur (error)', 'Création, Compilation, Débogage', 'Pause, Reprise, Arrêt'], correct: 0, exp: 'Gérer ces trois états garantit une interface claire à chaque instant.' },
    { stem: 'Si useEffect dépend de [userId], quand se re-déclenche-t-il ?', opts: ['Quand userId change de valeur (comparaison Object.is)', 'À chaque frappe de clavier', 'Toutes les dix secondes'], correct: 0, exp: 'React compare l’ancienne et la nouvelle valeur de userId pour décider de l’exécution.' }
  ],

  pitfalls: [
    'Oublier le tableau de dépendances et créer une boucle infinie de requêtes et de re-rendus.',
    'Déclarer useEffect(async () => ...) directement.',
    'Oublier de nettoyer les timers (setInterval) ou écouteurs (addEventListener).',
    'Omettre des variables d’état ou props utilisées à l’intérieur de l’effet dans le tableau de dépendances.',
    'Mettre à jour l’état dans le corps de l’effet sans condition ni dépendance appropriée.'
  ],

  methodTitle: 'Intégrer une requête asynchrone dans un composant React',
  method: [
    '<strong>Définir</strong> trois variables d’état : les données (null), le statut de chargement (true) et l’erreur (null).',
    '<strong>Déclarer</strong> un useEffect avec les dépendances dont l’appel a besoin (ex. id de ressource).',
    '<strong>Écrire</strong> une fonction asynchrone interne avec bloc try / catch / finally.',
    '<strong>Gérer</strong> le nettoyage avec un marqueur d’annulation (AbortController ou variable booléenne).',
    '<strong>Rendre</strong> conditionnellement l’état correspondant : spinner, message d’erreur ou vue de données.'
  ],

  summary: [
    'useEffect synchronise un composant React avec des systèmes extérieurs (APIs, timers, DOM).',
    'Le tableau de dépendances contrôle rigoureusement les moments d’exécution de l’effet.',
    'Un tableau vide [] correspond à une exécution unique au montage du composant.',
    'La fonction de nettoyage (cleanup) prévient les fuites de mémoire et les effets résiduels.',
    'Les requêtes HTTP requièrent une fonction async interne et la gestion des états loading/data/error.'
  ],

  checklist: [
    'Je comprends la différence entre le rendu pur et les effets de bord.',
    'Je sais choisir entre aucun tableau, un tableau vide [] et un tableau garni [deps].',
    'J’écris systématiquement une fonction de nettoyage pour mes timers et écouteurs.',
    'Je n’écris jamais useEffect(async () => ...).',
    'Je gère les trois états visuels (chargement, succès, échec) lors d’un appel API.'
  ],

  notions: ['useEffect', 'Effet de bord (Side effect)', 'Tableau de dépendances', 'Cleanup function', 'Montage (Mount)', 'Démontage (Unmount)', 'fetch API', 'Loading state', 'Error handling', 'Race conditions'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise le rôle de useEffect et la syntaxe du tableau de dépendances.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la fonction de nettoyage et les appels asynchrones.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les effets de bord et la gestion d’états réseau.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe au routage et à l’architecture dans le chapitre 6.' }
  ],

  flashcards: [
    { q: 'Pourquoi useEffect est-il exécuté après le rendu ?', a: 'Pour ne pas bloquer l’affichage visuel de l’interface pendant les opérations lentes comme les requêtes réseau.' },
    { q: 'Que signifie useEffect(() => {}, []) ?', a: 'L’effet ne s’exécute qu’une seule fois au montage initial du composant.' },
    { q: 'À quel moment la fonction de nettoyage est-elle appelée ?', a: 'Avant que l’effet ne se réexécute, ainsi qu’au démontage final du composant.' },
    { q: 'Comment exécuter une fonction async dans useEffect ?', a: 'En déclarant la fonction async à l’intérieur du callback et en l’appelant immédiatement.' },
    { q: 'Que se passe-t-il si une dépendance manque dans le tableau ?', a: 'L’effet peut capturer des valeurs obsolètes (stale closure) et générer des incohérences.' },
    { q: 'Comment annuler une requête fetch en cours ?', a: 'En passant un signal AbortController.signal et en appelant controller.abort() dans le cleanup.' }
  ],

  next: {
    href: 'chapitre6.html',
    label: 'Chapitre 6 : Routage & Architecture'
  }
};
