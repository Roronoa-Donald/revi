/**
 * Chapitre 2 du cours « Java » B2 — conditions et boucles.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Conditions et boucles',
  short: 'Conditions et boucles',
  toc: 'if/else, opérateur ternaire, switch, boucles for et while, break et continue.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un programme doit prendre des décisions et répéter des traitements. Conditions et boucles forment le ' +
    'squelette de tout algorithme : sans elles, le code se contente d’exécuter des instructions en ligne.',

  objectives: [
    'écrire des conditions avec if/else et l’opérateur ternaire ;',
    'choisir entre plusieurs cas avec switch ;',
    'répéter un traitement avec for et while ;',
    'contrôler une boucle avec break et continue.'
  ],

  sections: [
    {
      title: 'Conditions et opérateur ternaire',
      html: [
        '<p><code>if</code> exécute un bloc quand une condition est vraie ; <code>else</code> prend le ' +
        'relais sinon. L’opérateur <strong>ternaire</strong> <code>condition ? valeurSiVrai : valeurSinon</code> ' +
        'condense une expression en une ligne.</p>',
        '<pre><code>int n = 7;\nboolean pair = n % 2 == 0;\nSystem.out.println(pair ? "pair" : "impair");</code></pre>',
        '<p>Les opérateurs de comparaison (<code>== != &lt; &gt; &lt;= &gt;=</code>) renvoient un ' +
        '<code>boolean</code>, que l’on combine avec <code>&amp;&amp;</code> (et) et <code>||</code> (ou).</p>'
      ].join('\n')
    },
    {
      title: 'Plusieurs cas avec switch',
      html: [
        '<p>Quand une même valeur est comparée à plusieurs constantes, <code>switch</code> est plus lisible ' +
        'qu’une cascade de <code>else if</code>. Le mot-clé <code>break</code> évite d’enchaîner sur le cas ' +
        'suivant.</p>',
        '<pre><code>switch (jour) {\n    case 1:\n        System.out.println("Lundi");\n        break;\n    default:\n        System.out.println("Autre");\n}</code></pre>',
        box('pitfall', 'Piège — le break oublié', 'warning',
          '    <p>Sans <code>break</code>, l’exécution « tombe » dans le cas suivant (<em>fall-through</em>) ' +
          'et exécute du code qu’on ne voulait pas. Chaque <code>case</code> se termine normalement par ' +
          '<code>break</code>.</p>')
      ].join('\n')
    },
    {
      title: 'Boucles for et while',
      html: [
        '<p><code>for</code> s’utilise quand on connaît le nombre d’itérations ; <code>while</code> répète ' +
        'tant qu’une condition reste vraie.</p>',
        '<pre><code>int somme = 0;\nfor (int i = 1; i <= 5; i++) {\n    somme += i;\n}\n\nint k = 0;\nwhile (k < 3) {\n    k++;\n}</code></pre>',
        '<p>Une boucle <code>for</code> se lit en trois parties : initialisation, condition, incrément. ' +
        'L’incrément <code>i++</code> équivaut à <code>i = i + 1</code>.</p>'
      ].join('\n')
    },
    {
      title: 'break, continue et imbrication',
      html: [
        '<p><code>break</code> sort immédiatement de la boucle ; <code>continue</code> passe à l’itération ' +
        'suivante. On construit aussi des suites en gardant deux variables (par exemple Fibonacci).</p>',
        '<pre><code>int a = 0;\nint b = 1;\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < n; i++) {\n    if (i &gt; 0) sb.append(\' \');\n    sb.append(a);\n    int suivant = a + b;\n    a = b;\n    b = suivant;\n}</code></pre>',
        box('intuition', 'Garde l’état dans des variables', 'lightbulb',
          '    <p>Beaucoup de suites se calculent sans tableau : il suffit de retenir les derniers termes ' +
          'dans des variables et de les décaler à chaque tour. C’est plus économe et tout aussi clair.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que renvoie une comparaison en Java ?', opts: ['Un entier', 'Un boolean', 'Une chaîne'], correct: 1, exp: 'Les comparaisons produisent un boolean (true/false).' },
    { stem: 'Que fait l’opérateur ternaire ?', opts: ['Répète', 'Choisit une valeur selon une condition', 'Compare deux chaînes'], correct: 1, exp: 'condition ? a : b choisit a ou b.' },
    { stem: 'Quand préférer switch ?', opts: ['Pour comparer une valeur à plusieurs cas', 'Pour boucler', 'Pour déclarer un type'], correct: 0, exp: 'switch évite une longue cascade de else if.' },
    { stem: 'À quoi sert break dans un switch ?', opts: ['À sortir du cas', 'À relancer', 'À ignorer'], correct: 0, exp: 'break empêche le fall-through vers le cas suivant.' },
    { stem: 'Quelle boucle pour un nombre d’itérations connu ?', opts: ['for', 'while', 'switch'], correct: 0, exp: 'for exprime directement initialisation, condition et incrément.' },
    { stem: 'Que fait continue ?', opts: ['Sort de la boucle', 'Passe à l’itération suivante', 'Arrête le programme'], correct: 1, exp: 'continue saute le reste du corps et repart au tour suivant.' },
    { stem: 'Que fait i++ ?', opts: ['i = i + 1', 'i = i − 1', 'i × 2'], correct: 0, exp: 'L’opérateur ++ incrémente la variable de 1.' },
    { stem: 'Comment calcule-t-on une suite sans tableau ?', opts: ['En gardant les derniers termes dans des variables', 'Impossible', 'En triant'], correct: 0, exp: 'On retient deux valeurs et on les décale à chaque itération.' }
  ],

  pitfalls: [
    'Oublier le <code>break</code> dans un <code>switch</code>.',
    'Écrire <code>if (x = 1)</code> au lieu de <code>if (x == 1)</code>.',
    'Créer une boucle dont la condition ne devient jamais fausse.',
    'Confondre <code>break</code> (sort) et <code>continue</code> (tour suivant).',
    'Se tromper de borne dans <code>for</code> (<code>&lt;=</code> contre <code>&lt;</code>).'
  ],

  methodTitle: 'Construire un contrôle de flux',
  method: [
    '<strong>Déterminer</strong> la condition qui gouverne la décision.',
    '<strong>Choisir</strong> if/else, ternaire ou switch selon le nombre de cas.',
    '<strong>Fixer</strong> les bornes de la boucle (initialisation, condition, incrément).',
    '<strong>Contrôler</strong> la sortie avec break/continue seulement si c’est nécessaire.',
    '<strong>Tester</strong> les cas limites : zéro, négatif, borne atteinte.'
  ],

  summary: [
    'Les comparaisons produisent des boolean, combinés par && et ||.',
    'L’opérateur ternaire condense une condition en expression.',
    'switch compare une valeur à plusieurs cas ; chaque case finit par break.',
    'for répète un nombre connu de fois, while tant qu’une condition tient.',
    'break sort d’une boucle, continue passe au tour suivant.'
  ],

  checklist: [
    'J’écris une condition claire et sans affectation accidentelle.',
    'Je choisis entre ternaire, if/else et switch.',
    'Je maîtrise les bornes de mes boucles.',
    'J’utilise break et continue à bon escient.'
  ],

  notions: ['if', 'else', 'opérateur ternaire', 'comparaison', '&&', '||', 'switch', 'case', 'break', 'continue', 'for', 'while', 'incrément', 'imbrication'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Réécris une boucle qui somme de 1 à n.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les bornes et le break du switch.' },
    { cls: 'good', text: '70–89 % — Solide : tu contrôles le flux sans erreur de borne.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux tableaux et méthodes, chapitre 3.' }
  ],

  flashcards: [
    { q: 'Que renvoie une comparaison ?', a: 'Un boolean (true ou false).' },
    { q: 'Syntaxe de l’opérateur ternaire ?', a: 'condition ? valeurSiVrai : valeurSinon.' },
    { q: 'Pourquoi break dans un switch ?', a: 'Pour empêcher le fall-through vers le cas suivant.' },
    { q: 'Différence entre for et while ?', a: 'for pour un nombre connu d’itérations, while tant qu’une condition tient.' },
    { q: 'Différence entre break et continue ?', a: 'break sort de la boucle ; continue passe au tour suivant.' },
    { q: 'Que fait i++ ?', a: 'Il incrémente i de 1.' }
  ]
};
