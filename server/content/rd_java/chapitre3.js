/**
 * Chapitre 3 du cours « Java » B2 — tableaux, ArrayList et méthodes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Tableaux, ArrayList et méthodes',
  short: 'Tableaux et méthodes',
  toc: 'Tableaux à taille fixe, parcours, ArrayList, méthodes et paramètres.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Dès qu’il y a plusieurs valeurs, il faut une structure pour les ranger et un moyen de les parcourir. ' +
    'Tableaux et listes stockent les données ; les méthodes les traitent par blocs nommés et réutilisables.',

  objectives: [
    'déclarer et parcourir un tableau de taille fixe ;',
    'utiliser une ArrayList quand la taille varie ;',
    'extraire une portion de logique dans une méthode ;',
    'passer des paramètres et renvoyer un résultat.'
  ],

  sections: [
    {
      title: 'Tableaux à taille fixe',
      html: [
        '<p>Un <strong>tableau</strong> range un nombre fixe de valeurs du même type, indexées de 0 à ' +
        '<code>n-1</code>. On le déclare avec sa taille puis on remplit chaque case.</p>',
        '<pre><code>int[] valeurs = new int[3];\nvaleurs[0] = 10;\nvaleurs[1] = 20;\nvaleurs[2] = 30;\n\nfor (int i = 0; i &lt; valeurs.length; i++) {\n    System.out.println(valeurs[i]);\n}</code></pre>',
        box('pitfall', 'Piège — dépasser la taille', 'warning',
          '    <p>Accéder à <code>valeurs[3]</code> d’un tableau de trois cases lève une ' +
          '<code>ArrayIndexOutOfBoundsException</code>. La boucle s’arrête donc à ' +
          '<code>i &lt; valeurs.length</code>, jamais à <code>i &lt;= valeurs.length</code>.</p>')
      ].join('\n')
    },
    {
      title: 'ArrayList quand la taille varie',
      html: [
        '<p>Une <code>ArrayList</code> s’agrandit toute seule. Elle ne stocke que des objets : les entiers ' +
        'passent par la classe enveloppe <code>Integer</code>, et Java fait la conversion automatiquement.</p>',
        '<pre><code>import java.util.ArrayList;\n\nArrayList&lt;Integer&gt; notes = new ArrayList&lt;&gt;();\nnotes.add(15);\nnotes.add(12);\nSystem.out.println(notes.size());   // 2\nSystem.out.println(notes.get(0));   // 15</code></pre>',
        '<p>On parcourt une liste avec une boucle indexée ou un <code>for-each</code> : ' +
        '<code>for (int note : notes) { … }</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Extraire une méthode',
      html: [
        '<p>Une <strong>méthode</strong> regroupe un traitement sous un nom. Elle reçoit des ' +
        '<strong>paramètres</strong> et peut renvoyer une valeur avec <code>return</code>.</p>',
        '<pre><code>static int somme(int[] valeurs) {\n    int total = 0;\n    for (int v : valeurs) {\n        total += v;\n    }\n    return total;\n}</code></pre>',
        '<p>Le type de retour (<code>int</code> ici) fait partie du contrat. Une méthode qui ne renvoie rien ' +
        'se déclare <code>void</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Algorithmes simples sur les tableaux',
      html: [
        '<p>Deux algorithmes reviennent sans cesse : le <strong>maximum</strong> et le <strong>parcours ' +
        'inversé</strong>. Pour le maximum, on initialise avec la première valeur — surtout pas avec 0, sinon ' +
        'des valeurs négatives seraient ignorées.</p>',
        '<pre><code>int max = valeurs[0];\nfor (int i = 1; i &lt; valeurs.length; i++) {\n    if (valeurs[i] &gt; max) {\n        max = valeurs[i];\n    }\n}</code></pre>',
        box('intuition', 'Un seul passage suffit', 'lightbulb',
          '    <p>La plupart de ces traitements se font en un seul parcours, en gardant l’information utile ' +
          'dans une variable (le maximum vu, le total, l’état précédent). Pas besoin de trier ni de ' +
          'mémoriser tout.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Un tableau a…', opts: ['une taille fixe', 'une taille variable', 'aucune taille'], correct: 0, exp: 'new int[n] alloue exactement n cases.' },
    { stem: 'Premier indice d’un tableau ?', opts: ['0', '1', '−1'], correct: 0, exp: 'Les indices vont de 0 à length−1.' },
    { stem: 'Que fait valeurs.length ?', opts: ['Renvoie la taille', 'Trie', 'Copie'], correct: 0, exp: 'length donne le nombre de cases du tableau.' },
    { stem: 'Quand préférer ArrayList ?', opts: ['Quand la taille varie', 'Quand elle est fixe', 'Jamais'], correct: 0, exp: 'ArrayList s’agrandit dynamiquement.' },
    { stem: 'Quel type stocke une ArrayList de nombres ?', opts: ['int', 'Integer', 'double'], correct: 1, exp: 'Les collections stockent des objets : Integer pour les entiers.' },
    { stem: 'Comment renvoyer un résultat ?', opts: ['return', 'break', 'print'], correct: 0, exp: 'return transmet la valeur à l’appelant.' },
    { stem: 'Que vaut le type d’une méthode qui ne renvoie rien ?', opts: ['void', 'null', 'int'], correct: 0, exp: 'void signifie « aucune valeur renvoyée ».' },
    { stem: 'Comment initialiser un maximum ?', opts: ['Avec 0', 'Avec la première valeur', 'Avec length'], correct: 1, exp: 'La première valeur évite d’ignorer des valeurs négatives.' }
  ],

  pitfalls: [
    'Dépasser la taille d’un tableau (<code>ArrayIndexOutOfBoundsException</code>).',
    'Initialiser un maximum à 0 au lieu de la première valeur.',
    'Oublier d’importer <code>ArrayList</code>.',
    'Utiliser <code>==</code> pour comparer deux chaînes au lieu de <code>.equals()</code>.',
    'Écrire une méthode avec un type de retour et oublier le <code>return</code>.'
  ],

  methodTitle: 'Travailler avec des collections de valeurs',
  method: [
    '<strong>Choisir</strong> la structure : tableau si la taille est fixe, ArrayList sinon.',
    '<strong>Parcourir</strong> avec une boucle indexée ou un for-each.',
    '<strong>Extraire</strong> le traitement répété dans une méthode nommée.',
    '<strong>Renvoyer</strong> le résultat avec le bon type.',
    '<strong>Tester</strong> les cas limites : tableau vide, valeurs négatives, un seul élément.'
  ],

  summary: [
    'Un tableau a une taille fixe, indexée de 0 à length−1.',
    'ArrayList s’agrandit ; elle stocke des objets (Integer pour les entiers).',
    'Une méthode regroupe un traitement, reçoit des paramètres et renvoie une valeur.',
    'void signifie qu’aucune valeur n’est renvoyée.',
    'Maximum et inversion se calculent en un seul passage.'
  ],

  checklist: [
    'Je parcours un tableau sans dépasser ses bornes.',
    'Je distingue tableau et ArrayList.',
    'J’écris une méthode avec paramètres et type de retour.',
    'J’initialise correctement un maximum.'
  ],

  notions: ['tableau', 'indice', 'length', 'ArrayList', 'Integer', 'for-each', 'méthode', 'paramètre', 'return', 'void', 'maximum', 'parcours inversé'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Réécris un parcours de tableau avec sa borne correcte.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à extraire une méthode de somme.' },
    { cls: 'good', text: '70–89 % — Solide : tu choisis la bonne structure et tu la parcours.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux classes, chapitre 4.' }
  ],

  flashcards: [
    { q: 'Quelle est la taille d’un tableau ?', a: 'Fixe, déterminée à la création (new int[n]).' },
    { q: 'Quel est le premier indice ?', a: '0 ; le dernier vaut length − 1.' },
    { q: 'Quand utiliser ArrayList ?', a: 'Quand le nombre d’éléments varie.' },
    { q: 'Quel type dans une ArrayList d’entiers ?', a: 'Integer (classe enveloppe de int).' },
    { q: 'À quoi sert return ?', a: 'À renvoyer une valeur à l’appelant de la méthode.' },
    { q: 'Comment initialiser un maximum ?', a: 'Avec la première valeur, pas avec 0.' }
  ]
};
