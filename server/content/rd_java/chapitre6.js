/**
 * Chapitre 6 du cours « Java » B2 — exceptions et robustesse.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Exceptions et robustesse',
  short: 'Exceptions',
  toc: 'try/catch/finally, exceptions standard, exception personnalisée, throws.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une division par zéro, une saisie non numérique, un solde négatif : les erreurs surgissent. Java les ' +
    'représente par des exceptions. Bien traitées, elles transforment un plantage en message clair — ou en ' +
    'décision métier.',

  objectives: [
    'intercepter une exception avec try/catch ;',
    'reconnaître les exceptions standard (ArithmeticException, NumberFormatException) ;',
    'écrire et lancer une exception personnalisée ;',
    'déclarer qu’une méthode peut lever une exception avec throws.'
  ],

  sections: [
    {
      title: 'try, catch, finally',
      html: [
        '<p>Le bloc <code>try</code> contient le code risqué ; le bloc <code>catch</code> traite l’erreur ; ' +
        'le bloc <code>finally</code> s’exécute dans tous les cas (nettoyage).</p>',
        '<pre><code>try {\n    System.out.println(a / b);\n} catch (ArithmeticException e) {\n    System.out.println("division par zéro");\n} finally {\n    System.out.println("terminé");\n}</code></pre>',
        '<p>Sans capture, l’exception remonte et le programme s’arrête en affichant une trace d’appel. ' +
        'Attraper un type précis vaut mieux qu’attraper <code>Exception</code> partout.</p>'
      ].join('\n')
    },
    {
      title: 'Exceptions standard',
      html: [
        '<p>Deux erreurs très fréquentes ont chacune leur exception : <code>ArithmeticException</code> pour ' +
        'la division entière par zéro, <code>NumberFormatException</code> pour une conversion ' +
        '<code>Integer.parseInt</code> qui échoue.</p>',
        '<pre><code>try {\n    int valeur = Integer.parseInt(saisie);\n} catch (NumberFormatException e) {\n    System.out.println("saisie invalide");\n}</code></pre>',
        box('tech', 'Vérifié ou non vérifié', 'scale',
          '    <p>Les exceptions héritant de <code>RuntimeException</code> ne sont pas obligatoires à ' +
          'déclarer : c’est le cas d’<code>ArithmeticException</code> et de <code>NumberFormatException</code>. ' +
          'Les autres (héritant directement d’<code>Exception</code>) doivent être déclarées avec ' +
          '<code>throws</code> ou capturées.</p>')
      ].join('\n')
    },
    {
      title: 'Exception personnalisée',
      html: [
        '<p>Pour un problème métier — un solde insuffisant, une date impossible — on crée une classe ' +
        'd’exception dédiée. Elle étend <code>Exception</code> et transmet son message au constructeur parent.</p>',
        '<pre><code>class SoldeInsuffisant extends Exception {\n    SoldeInsuffisant(String message) {\n        super(message);\n    }\n}\n\nvoid retirer(int montant) throws SoldeInsuffisant {\n    if (montant &gt; solde) {\n        throw new SoldeInsuffisant("solde insuffisant");\n    }\n    solde -= montant;\n}</code></pre>',
        '<p>Intercepter un type précis (<code>catch (SoldeInsuffisant e)</code>) distingue une erreur métier ' +
        'd’un bug technique.</p>'
      ].join('\n')
    },
    {
      title: 'Écrire du code robuste',
      html: [
        '<p>Le bon réflexe : anticiper les cas limites (<code>b == 0</code>, saisie vide, montant négatif) ' +
        'et laisser l’exception signaler ce qui ne peut pas être traité. Le message doit être explicite et ' +
        'le traitement cohérent.</p>',
        '<pre><code>if (montant &lt; 0) {\n    throw new IllegalArgumentException("montant négatif");\n}\nif (montant &gt; solde) {\n    throw new SoldeInsuffisant("solde insuffisant");\n}</code></pre>',
        box('intuition', 'Une erreur est une information', 'lightbulb',
          '    <p>Une exception mal traitée est avalée et disparaît : le bug devient invisible. Une exception ' +
          'précise, avec un message clair, transforme un plantage en piste. C’est l’objet le plus utile d’un ' +
          'programme qui dure.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel bloc contient le code risqué ?', opts: ['try', 'catch', 'finally'], correct: 0, exp: 'Le try encadre le code susceptible de lever une exception.' },
    { stem: 'Quel bloc s’exécute dans tous les cas ?', opts: ['try', 'catch', 'finally'], correct: 2, exp: 'finally s’exécute après le try, avec ou sans erreur.' },
    { stem: 'Quelle exception pour une division entière par zéro ?', opts: ['ArithmeticException', 'NumberFormatException', 'IOException'], correct: 0, exp: 'La division par zéro lève une ArithmeticException.' },
    { stem: 'Quelle exception pour parseInt invalide ?', opts: ['NumberFormatException', 'ArithmeticException', 'NullPointerException'], correct: 0, exp: 'Une chaîne non numérique provoque NumberFormatException.' },
    { stem: 'Comment créer une exception métier ?', opts: ['En étendant Exception', 'En étendant Main', 'En la déclarant static'], correct: 0, exp: 'On crée une classe qui extends Exception.' },
    { stem: 'Que fait throw ?', opts: ['Lance une exception', 'Capture une exception', 'Ignore une exception'], correct: 0, exp: 'throw déclenche l’exception choisie.' },
    { stem: 'Que déclare throws ?', opts: ['Qu’une méthode peut lever une exception', 'Qu’elle l’attrape', 'Qu’elle est abstraite'], correct: 0, exp: 'throws prévient l’appelant du risque, qui doit capturer ou propager.' },
    { stem: 'Pourquoi capturer un type précis ?', opts: ['Pour distinguer métier et technique', 'Pour accélérer', 'Pour arrondir'], correct: 0, exp: 'Un catch précis sépare les erreurs attendues des bugs inattendus.' }
  ],

  pitfalls: [
    'Avale une exception avec un catch vide.',
    'Attraper <code>Exception</code> partout au lieu du type concerné.',
    'Oublier <code>throws</code> sur une méthode qui lève une exception vérifiée.',
    'Confondre <code>throw</code> (lancer) et <code>throws</code> (déclarer).',
    'Laisser un message d’erreur trop vague.'
  ],

  methodTitle: 'Traiter une erreur proprement',
  method: [
    '<strong>Repérer</strong> les opérations risquées (division, conversion, bornes).',
    '<strong>Choisir</strong> l’exception adaptée : standard ou personnalisée.',
    '<strong>Encadrer</strong> l’appel d’un try/catch sur le bon type.',
    '<strong>Déclarer</strong> throws quand la méthode laisse remonter.',
    '<strong>Rédiger</strong> un message clair pour l’utilisateur ou le développeur.'
  ],

  summary: [
    'try encadre le code risqué, catch traite, finally s’exécute toujours.',
    'ArithmeticException (division par zéro) et NumberFormatException (conversion) sont courantes.',
    'Une exception personnalisée étend Exception et transmet un message.',
    'throw lance ; throws déclare qu’une méthode peut lever.',
    'Une erreur bien signalée vaut mieux qu’un plantage silencieux.'
  ],

  checklist: [
    'J’encadre le code risqué d’un try/catch.',
    'Je capture le type précis de l’exception.',
    'Je crée une exception métier quand le cas le justifie.',
    'Je rédige des messages d’erreur explicites.'
  ],

  notions: ['exception', 'try', 'catch', 'finally', 'throw', 'throws', 'ArithmeticException', 'NumberFormatException', 'exception personnalisée', 'RuntimeException', 'robustesse'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois la structure try/catch/finally.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les exceptions standard.' },
    { cls: 'good', text: '70–89 % — Solide : tu écris et attrapes une exception métier.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est bouclé, place aux examens blancs.' }
  ],

  flashcards: [
    { q: 'Structure de capture ?', a: 'try { … } catch (Type e) { … } finally { … }.' },
    { q: 'Quand s’exécute finally ?', a: 'Dans tous les cas, après le try ou le catch.' },
    { q: 'Exception d’une division entière par zéro ?', a: 'ArithmeticException.' },
    { q: 'Exception d’un parseInt invalide ?', a: 'NumberFormatException.' },
    { q: 'Comment créer une exception métier ?', a: 'En étendant Exception et en appelant super(message).' },
    { q: 'Différence entre throw et throws ?', a: 'throw lance l’exception ; throws la déclare dans la signature.' }
  ]
};
