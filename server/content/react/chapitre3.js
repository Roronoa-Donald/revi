/**
 * Chapitre 3 du cours « React » B2 — État local (useState) et formulaires contrôlés.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'État local (useState) & formulaires contrôlés',
  short: 'State & Formulaires',
  toc: 'Hook useState, cycle de ré-exécution, événements synthétiques, inputs contrôlés et immutabilité de l’état.',
  time: '≈ 3 h 00 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une interface statique ne suffit pas : un utilisateur clique sur des boutons, remplit des formulaires ' +
    'et modifie l’affichage. Pour mémoriser ces changements et déclencher des réactualisations visuelles, ' +
    'React fournit la notion d’état local avec le Hook useState.',

  objectives: [
    'comprendre pourquoi une variable JavaScript standard ne déclenche pas de nouveau rendu ;',
    'utiliser le Hook useState pour stocker et modifier des données réactives ;',
    'manipuler les événements synthétiques (onClick, onChange, onSubmit) ;',
    'concevoir des formulaires contrôlés avec validation en temps réel ;',
    'respecter strictement l’immutabilité des objets et tableaux d’état.'
  ],

  sections: [
    {
      title: 'Le Hook useState et le cycle de rendu',
      html: [
        '<p>Contrairement à une variable ordinaire qui est réinitialisée à chaque exécution de fonction, ' +
        'le <strong>state</strong> est une mémoire persistée par React entre les rendus d’un composant.</p>',
        '<pre><code>import { useState } from \'react\';\n\nfunction Compteur() {\n  const [count, setCount] = useState(0);\n\n  return (\n    &lt;div&gt;\n      &lt;p&gt;Valeur courante : {count}&lt;/p&gt;\n      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;\n        Incrémenter\n      &lt;/button&gt;\n    &lt;/div&gt;\n  );\n}</code></pre>',
        box('intuition', 'Comment React réagit à setState ?', 'lightbulb',
          '    <p>L’appel à la fonction modifie la valeur en mémoire et planifie un <strong>nouveau rendu</strong> du composant. ' +
          'React réexécute la fonction, calcule la différence avec l’ancien Virtual DOM et met à jour uniquement les nœuds modifiés.</p>')
      ].join('\n')
    },
    {
      title: 'Mises à jour basées sur l’état précédent',
      html: [
        '<p>Les mises à jour d’état en React sont regroupées par lot (<em>batching</em>). Si une nouvelle valeur dépend ' +
        'directement de l’ancienne valeur (par exemple lors de plusieurs incrémentations rapides), il faut passer une fonction de rappel :</p>',
        '<pre><code>// À privilégier pour éviter les états obsolètes :\nsetCount(prevCount =&gt; prevCount + 1);</code></pre>'
      ].join('\n')
    },
    {
      title: 'Gestion des événements et formulaires contrôlés',
      html: [
        '<p>React enveloppe les événements natifs du navigateur dans des <strong>événements synthétiques</strong> ' +
        '(<code>SyntheticEvent</code>) assurant une compatibilité cross-browser parfaite. On utilise le camelCase : ' +
        '<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>.</p>',
        '<p>Dans un <strong>composant contrôlé</strong>, l’élément de formulaire HTML (<code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, <code>&lt;select&gt;</code>) ' +
        'ne gère pas son propre état interne : c’est le state React qui devient la <em>source unique de vérité</em>.</p>',
        '<pre><code>function FormulaireContact() {\n  const [email, setEmail] = useState(\'\');\n\n  const handleSubmit = (e) =&gt; {\n    e.preventDefault(); // Bloque le rechargement de page natif\n    console.log(\'Envoi pour :\', email);\n  };\n\n  return (\n    &lt;form onSubmit={handleSubmit}&gt;\n      &lt;input\n        type="email"\n        value={email}\n        onChange={(e) =&gt; setEmail(e.target.value)}\n        placeholder="votre.email@exemple.fr"\n      /&gt;\n      &lt;button type="submit"&gt;Valider&lt;/button&gt;\n    &lt;/form&gt;\n  );\n}</code></pre>'
      ].join('\n')
    },
    {
      title: 'Règle d’or : l’immutabilité de l’état',
      html: [
        '<p>On ne doit <strong>jamais muter directement</strong> un objet ou un tableau stocké dans le state (ex. <code>tableau.push(...)</code> ou <code>objet.propriete = ...</code>). ' +
        'React compare les références des objets pour savoir s’il doit re-rendre : sans nouvelle référence, le composant ne se met pas à jour.</p>',
        box('warn', 'Opérations immuables courantes', 'shield',
          '    <ul>\n' +
          '      <li><strong>Ajout dans un tableau</strong> : <code>setItems(prev =&gt; [...prev, nouvelItem])</code> (opérateur spread).</li>\n' +
          '      <li><strong>Suppression d’un élément</strong> : <code>setItems(prev =&gt; prev.filter(item =&gt; item.id !== idCible))</code>.</li>\n' +
          '      <li><strong>Modification d’un objet</strong> : <code>setUser(prev =&gt; ({ ...prev, role: \'admin\' }))</code>.</li>\n' +
          '    </ul>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'L’appel à useState(initial) retourne…', opts: ['Un tableau [valeur, setter]', 'Une promesse asynchrone', 'L’élément DOM réel'], correct: 0, exp: 'useState renvoie un tuple déstructuré avec la valeur et la fonction de mise à jour.' },
    { stem: 'Pourquoi variable = 10 ne provoque aucun re-rendu ?', opts: ['Parce que React n’est pas notifié de la modification de la mémoire', 'Parce que le navigateur refuse les variables globales', 'Parce que les variables sont figées par défaut'], correct: 0, exp: 'Seul le setter de useState informe le réconciliateur de planifier un rendu.' },
    { stem: 'À quoi sert e.preventDefault() dans onSubmit ?', opts: ['À empêcher le rechargement complet de la page par le navigateur', 'À réinitialiser automatiquement tous les champs', 'À forcer l’envoi par protocole FTP'], correct: 0, exp: 'Dans une SPA, on bloque le comportement par défaut pour traiter la soumission en JS.' },
    { stem: 'Comment ajouter un élément à un tableau d’état de façon immuable ?', opts: ['setListe([...liste, nouvelElement])', 'liste.push(nouvelElement); setListe(liste)', 'liste[liste.length] = nouvelElement'], correct: 0, exp: 'L’opérateur spread crée un nouveau tableau avec une nouvelle référence mémoire.' },
    { stem: 'Dans un input contrôlé, d’où provient la valeur affichée ?', opts: ['De la variable d’état liée à la prop value', 'Du cache interne du navigateur', 'Du fichier index.html'], correct: 0, exp: 'L’état React constitue la source unique de vérité de l’input.' },
    { stem: 'Pour calculer un nouvel état à partir de l’ancien en toute sécurité, on écrit…', opts: ['setCount(prev => prev + 1)', 'setCount(count++)', 'setCount(count = count + 1)'], correct: 0, exp: 'La fonction de rappel garantit de manipuler l’état le plus récent malgré le batching.' },
    { stem: 'Quel événement React capture la modification d’un champ texte ?', opts: ['onChange', 'onInputNative', 'onTextUpdate'], correct: 0, exp: 'onChange en React se déclenche à chaque frappe de touche dans le champ.' },
    { stem: 'Que se passe-t-il si l’on mute un objet d’état sans changer sa référence ?', opts: ['React peut ne pas détecter le changement et ne pas re-rendre l’interface', 'Le navigateur lève une exception fatale', 'Le système d’exploitation redémarre'], correct: 0, exp: 'La comparaison par référence superficielle (shallow comparison) ne voit pas la mutation interne.' }
  ],

  pitfalls: [
    'Muter directement un tableau avec push(), pop() ou splice().',
    'Modifier une propriété d’objet sans créer une copie via l’opérateur spread (...).',
    'Oublier e.preventDefault() dans la gestion d’un formulaire.',
    'Associer la prop value d’un input sans fournir de gestionnaire onChange (input bloqué en lecture seule).',
    'Compter sur la mise à jour immédiate et synchrone d’un state juste après l’appel du setter.'
  ],

  methodTitle: 'Gérer un formulaire contrôlé avec validation en direct',
  method: [
    '<strong>Déclarer</strong> une variable d’état avec useState pour chaque champ ou un objet d’état unique.',
    '<strong>Lier</strong> la prop value du champ HTML à la variable d’état correspondante.',
    '<strong>Écouter</strong> l’événement onChange pour appeler le setter avec e.target.value.',
    '<strong>Valider</strong> la saisie à la volée (longueur, caractères, expressions régulières).',
    '<strong>Intercepter</strong> la soumission avec onSubmit et bloquer le rechargement via e.preventDefault().'
  ],

  summary: [
    'useState permet de mémoriser des données réactives entre les cycles de rendu.',
    'Chaque appel au setter planifie un recalcul du Virtual DOM et une mise à jour ciblée.',
    'Les événements synthétiques React normalisent les interactions utilisateur (onClick, onChange).',
    'Un formulaire contrôlé fait du state React la source unique de vérité de chaque champ.',
    'L’immutabilité stricte des objets et tableaux est indispensable pour la détection des changements.'
  ],

  checklist: [
    'Je sais initialiser et mettre à jour un état avec useState.',
    'J’utilise la forme fonctionnelle setX(prev => ...) pour les mises à jour dépendantes de l’ancien état.',
    'Je conçois des inputs contrôlés avec value et onChange.',
    'Je neutralise le rechargement natif de page avec e.preventDefault().',
    'Je respecte l’immutabilité en utilisant l’opérateur spread (...).'
  ],

  notions: ['useState', 'State', 'Setter', 'Batching', 'SyntheticEvent', 'onChange', 'onSubmit', 'e.preventDefault()', 'Formulaire contrôlé', 'Immutabilité'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la syntaxe de useState et l’immutabilité des objets.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les formulaires contrôlés et la capture d’événements.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises le cycle de réactivité et les mises à jour d’état.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux listes et au rendu conditionnel dans le chapitre 4.' }
  ],

  flashcards: [
    { q: 'Que fait le setter retourné par useState ?', a: 'Il met à jour la valeur en mémoire et planifie un nouveau rendu du composant.' },
    { q: 'Pourquoi privilégier setX(prev => prev + 1) ?', a: 'Pour éviter de calculer sur un état obsolète lorsque plusieurs mises à jour sont regroupées par lot.' },
    { q: 'Qu’est-ce qu’un SyntheticEvent ?', a: 'Une enveloppe multi-navigateurs autour des événements natifs du DOM standard.' },
    { q: 'Comment vider un champ contrôlé ?', a: 'En appelant son setter avec une chaîne vide : setNom(\'\').' },
    { q: 'Comment supprimer un élément d’un tableau d’état ?', a: 'Avec la méthode filter : setListe(prev => prev.filter(item => item.id !== cible)).' },
    { q: 'Pourquoi ne faut-il pas muter directement l’état ?', a: 'Parce que React compare les références : sans nouvelle référence, il ne déclenche pas de réaffichage.' }
  ],

  next: {
    href: 'chapitre4.html',
    label: 'Chapitre 4 : Listes & Rendu conditionnel'
  }
};
