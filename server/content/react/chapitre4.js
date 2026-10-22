/**
 * Chapitre 4 du cours « React » B2 — Rendu conditionnel, listes et clés dynamiques.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Rendu conditionnel, listes & clés dynamiques',
  short: 'Listes & Rendu conditionnel',
  toc: 'Opérateurs ternaires, court-circuit logique, map(), prop key, réconciliation et filtrage de données.',
  time: '≈ 2 h 45 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'La plupart des applications manipulent des collections d’éléments : catalogues de produits, fils d’actualités ' +
    'ou listes de messages. Afficher ces données de manière ordonnée et conditionnelle exige de maîtriser ' +
    'la méthode map() et le rôle critique de la prop key.',

  objectives: [
    'maîtriser les différentes techniques de rendu conditionnel (if, ternaire, court-circuit) ;',
    'éviter les pièges du court-circuit avec la valeur 0 ;',
    'transformer un tableau de données en éléments JSX avec Array.prototype.map() ;',
    'comprendre le rôle fondamental de la prop key pour l’algorithme de réconciliation ;',
    'calculer des listes filtrées ou triées sans dupliquer l’état.'
  ],

  sections: [
    {
      title: 'Techniques de rendu conditionnel',
      html: [
        '<p>En React, il n’existe pas de directive spéciale comme <code>v-if</code> ou <code>*ngIf</code> : ' +
        'on utilise les structures de contrôle natives de JavaScript.</p>',
        '<pre><code>// 1. Retour anticipé (Early return)\nif (isLoading) {\n  return &lt;p&gt;Chargement en cours...&lt;/p&gt;;\n}\n\n// 2. Opérateur ternaire\nreturn (\n  &lt;div&gt;\n    {isLogged ? &lt;Profil /&gt; : &lt;BoutonConnexion /&gt;}\n  &lt;/div&gt;\n);\n\n// 3. Court-circuit logique (&amp;&amp;)\nreturn (\n  &lt;div&gt;\n    &lt;h1&gt;Boîte de réception&lt;/h1&gt;\n    {hasUnreadMessages &amp;&amp; &lt;span className="pastille"&gt;Nouveau !&lt;/span&gt;}\n  &lt;/div&gt;\n);</code></pre>',
        box('warn', 'Le piège classique de {count &amp;&amp; &lt;Composant /&gt;}', 'shield',
          '    <p>En JavaScript, <code>0 &amp;&amp; "texte"</code> s’évalue à <code>0</code> (et non à <code>false</code>). ' +
          'Si votre variable vaut <code>0</code>, React affichera le chiffre <code>0</code> dans la page au lieu de ne rien rendre ! ' +
          'Écrivez toujours : <code>{count &gt; 0 &amp;&amp; &lt;Badge /&gt;}</code> ou <code>{Boolean(count) &amp;&amp; &lt;Badge /&gt;}</code>.</p>')
      ].join('\n')
    },
    {
      title: 'Rendu de listes avec map()',
      html: [
        '<p>Pour afficher une liste dynamique, on transforme un tableau de données en un tableau d’éléments JSX ' +
        'à l’aide de la méthode fonctionnelle <code>map()</code> :</p>',
        '<pre><code>const fruits = [\n  { id: \'f1\', nom: \'Pomme\', prix: 1.2 },\n  { id: \'f2\', nom: \'Banane\', prix: 0.9 },\n  { id: \'f3\', nom: \'Orange\', prix: 1.5 }\n];\n\nfunction ListeFruits() {\n  return (\n    &lt;ul&gt;\n      {fruits.map(fruit =&gt; (\n        &lt;li key={fruit.id}&gt;\n          {fruit.nom} — {fruit.prix} €\n        &lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}</code></pre>'
      ].join('\n')
    },
    {
      title: 'Le rôle fondamental de la prop key',
      html: [
        '<p>La prop <code>key</code> est une chaîne ou un identifiant unique qui indique à React l’identité de chaque ' +
        'élément d’une liste entre deux rendus. Elle permet au <strong>réconciliateur</strong> de savoir précisément quel ' +
        'élément a été ajouté, déplacé ou supprimé, sans devoir redessiner toute la liste.</p>',
        box('tech', 'Pourquoi éviter l’index de boucle comme clé ?', 'code',
          '    <p>Utiliser l’index de boucle (<code>key={index}</code>) fonctionne si la liste est statique. ' +
          'Mais en cas d’ajout en tête, de suppression ou de tri, les index changent : React confond alors l’état interne ' +
          'des composants enfants (comme le contenu de champs de saisie ou des cases cochées). ' +
          '<strong>Utilisez toujours un identifiant stable et unique issu des données (ex. id de base de données).</strong></p>')
      ].join('\n')
    },
    {
      title: 'Calcul de données dérivées sans redondance d’état',
      html: [
        '<p>Si une liste doit être filtrée par un champ de recherche ou triée, <strong>ne stockez pas la liste filtrée dans un second state</strong>. ' +
        'Calculez-la simplement à la volée pendant le rendu :</p>',
        '<pre><code>const [recherche, setRecherche] = useState(\'\');\n\n// Calcul dérivé à chaque rendu :\nconst produitsFiltres = produits.filter(p =&gt;\n  p.nom.toLowerCase().includes(recherche.toLowerCase())\n);</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Pour générer une liste d’éléments JSX à partir d’un tableau, on utilise…', opts: ['map()', 'forEach()', 'reduce()'], correct: 0, exp: 'map() renvoie un nouveau tableau d’éléments JSX prêts pour l’affichage.' },
    { stem: 'La prop « key » sur les éléments de liste sert à…', opts: ['Aider le réconciliateur de React à identifier les modifications', 'Chiffrer les données dans SQLite', 'Améliorer le SEO dans Google'], correct: 0, exp: 'Les clés permettent à React de recycler efficacement les nœuds du DOM.' },
    { stem: 'L’index de tableau comme clé (key={index}) est déconseillé car…', opts: ['Il provoque des bugs visuels si la liste est réordonnée ou filtrée', 'Il est obligatoirement un nombre négatif', 'Il bloque le moteur JavaScript'], correct: 0, exp: 'L’index est lié à la position et non à l’identité stable de la donnée.' },
    { stem: 'Que produit l’expression {nb &amp;&amp; &lt;Badge /&gt;} lorsque nb vaut 0 ?', opts: ['Elle affiche le chiffre 0 dans la page', 'Elle n’affiche absolument rien', 'Elle lève une erreur TypeError'], correct: 0, exp: '0 && expr évalue à 0, et React rend les nombres bruts. Préférer nb > 0 && ...' },
    { stem: 'Où doit être positionnée la prop key ?', opts: ['Sur l’élément racine renvoyé par le callback de map()', 'Sur le conteneur parent <ul>', 'Sur le dernier nœud enfant'], correct: 0, exp: 'La clé doit être placée sur l’élément le plus externe retourné à chaque itération.' },
    { stem: 'Pour afficher soit une vue A soit une vue B selon une condition, on utilise…', opts: ['L’opérateur ternaire (condition ? &lt;A /&gt; : &lt;B /&gt;)', 'Une boucle while infinie', 'Une balise &lt;switch&gt;'], correct: 0, exp: 'L’opérateur ternaire est l’idiome standard pour les choix binaires en JSX.' },
    { stem: 'Une liste filtrée d’après un champ de recherche doit être…', opts: ['Calculée à la volée lors du rendu à partir de l’état source', 'Stockée dans un second état synchronisé à la main', 'Écrite sur le disque dur du serveur'], correct: 0, exp: 'Calculer les valeurs dérivées évite les désynchronisations d’états.' },
    { stem: 'Si aucun élément ne correspond à un filtre, on peut afficher un message de repli via…', opts: ['liste.length === 0 ? &lt;p&gt;Aucun résultat&lt;/p&gt; : ...', 'Une alerte bloquante alert()', 'Un rechargement de page forcé'], correct: 0, exp: 'Tester la longueur du tableau filtré permet de gérer l’état vide proprement.' }
  ],

  pitfalls: [
    'Oublier la prop key lors de l’utilisation de map().',
    'Utiliser l’index de boucle comme clé sur une liste sujette aux ajouts ou aux tris.',
    'Utiliser {count &amp;&amp; &lt;Composant /&gt;} quand count peut valoir 0 (affiche "0").',
    'Créer un state dupliqué pour une liste filtrée au lieu de la calculer à la volée.',
    'Modifier directement le tableau d’origine avec sort() ou reverse() dans le corps du composant.'
  ],

  methodTitle: 'Afficher et filtrer une collection de données en React',
  method: [
    '<strong>Définir</strong> la structure des données avec un identifiant unique stable (id).',
    '<strong>Filtrer</strong> ou trier les données à la volée en créant une copie non mutante.',
    '<strong>Itérer</strong> sur la collection avec .map() pour produire les balises JSX.',
    '<strong>Assigner</strong> key={item.id} sur la balise parente de chaque élément de la boucle.',
    '<strong>Prévoir</strong> un affichage alternatif si la collection est vide (empty state).'
  ],

  summary: [
    'Le JSX utilise les structures de contrôle JavaScript pures (ternaires, court-circuit, map).',
    'La méthode map() est l’outil de référence pour transformer des données en listes de composants.',
    'La prop key est indispensable pour permettre au réconciliateur de traquer les nœuds du DOM.',
    'L’index de tableau doit être évité comme clé sur les listes dynamiques.',
    'Les données dérivées (filtres, compteurs) doivent être calculées au vol sans état redondant.'
  ],

  checklist: [
    'Je maîtrise l’opérateur ternaire et le court-circuit && en JSX.',
    'J’évite le piège du 0 numérique dans les expressions conditionnelles.',
    'J’itère sur mes tableaux avec map() en retournant du JSX.',
    'Je fournis une clé unique et stable (key) à chaque élément de liste.',
    'Je ne duplique pas mon state pour les données filtrées ou triées.'
  ],

  notions: ['map()', 'prop key', 'Réconciliation', 'Rendu conditionnel', 'Opérateur ternaire', 'Court-circuit &&', 'Index de boucle', 'Données dérivées', 'Empty state', 'Immutabilité des tableaux'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise l’usage de map() et l’importance de la prop key.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le rendu conditionnel et le piège du 0.' },
    { cls: 'good', text: '70–94 % — Solide : vous gèrez les listes dynamiques et le filtrage réactif.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux effets de bord et à useEffect dans le chapitre 5.' }
  ],

  flashcards: [
    { q: 'Pourquoi map() est-il préféré à forEach() en JSX ?', a: 'Parce que map() retourne un nouveau tableau exploitable par React, alors que forEach() ne renvoie rien (undefined).' },
    { q: 'Que risque-t-on à utiliser key={index} ?', a: 'Des désynchronisations d’état des enfants lors de suppressions, insertions ou tris dans la liste.' },
    { q: 'Comment corriger {count &amp;&amp; &lt;Badge /&gt;} ?', a: 'Écrire {count &gt; 0 &amp;&amp; &lt;Badge /&gt;} ou {Boolean(count) &amp;&amp; &lt;Badge /&gt;} pour éviter d’afficher 0.' },
    { q: 'Où place-t-on la prop key ?', a: 'Sur le premier élément JSX renvoyé par la fonction de rappel de map().' },
    { q: 'Comment trier un tableau en React sans muter la source ?', a: 'Avec [...tableau].sort(...) pour trier une copie superficielle.' },
    { q: 'Qu’est-ce qu’un retour anticipé (early return) ?', a: 'Vérifier une condition dès le début du composant (ex. if (loading) return &lt;Spinner /&gt;) pour simplifier le JSX final.' }
  ],

  next: {
    href: 'chapitre5.html',
    label: 'Chapitre 5 : Effets & Appels API'
  }
};
