/**
 * Chapitre 5 du cours « PHP POO » B2 — erreurs et exceptions.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Erreurs et exceptions',
  short: 'Erreurs et exceptions',
  toc: 'Erreurs PHP, lancer et attraper une exception, exceptions personnalisées, finally et multi-catch.',
  time: '≈ 2 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un programme qui plante au premier cas imprévu n’est pas fiable. Une exception transporte un message au lieu ' +
    'de stopper net : le code qui sait quoi faire l’attrape, celui qui ne sait pas la laisse remonter. C’est ainsi ' +
    'qu’une application reste debout même quand l’entrée est mauvaise.',

  objectives: [
    'distinguer une erreur PHP d’une exception ;',
    'lancer une exception avec throw et l’intercepter avec try/catch ;',
    'créer une exception personnalisée qui étend Exception ;',
    'utiliser finally et attraper plusieurs types dans un même catch.'
  ],

  sections: [
    {
      title: 'Erreur et exception',
      html: [
        '<p>Une <strong>erreur</strong> (<code>Warning</code>, <code>Notice</code>, <code>Fatal error</code>) ' +
        'signale un problème dans le code : division par zéro, appel d’une méthode inexistante, type inattendu. Une ' +
        '<strong>exception</strong> est un objet qu’on <em>choisit</em> de lancer pour signaler une situation ' +
        'anormale et la laisser à un autre niveau décider quoi en faire.</p>',
        '<p>La différence est le contrôle : l’erreur est subie, l’exception se déclenche avec <code>throw</code> et ' +
        'peut être capturée avec <code>try/catch</code>.</p>',
        box('tech', 'Exception est un objet', 'warning',
          '    <p>Une exception possède un message (<code>getMessage()</code>), un code, le fichier et la ligne. La ' +
          'lancer ne l’affiche pas : tant que personne ne l’attrape, PHP termine le script avec un message d’erreur ' +
          'non capturé.</p>')
      ].join('\n')
    },
    {
      title: 'Lancer et attraper',
      html: [
        '<p>On protège le code risqué dans un bloc <code>try</code> et on prévoit la suite dans un bloc ' +
        '<code>catch</code>. <code>throw</code> déclenche l’exception ; le premier <code>catch</code> compatible la ' +
        'reçoit.</p>',
        '<pre><code>function diviser(int $a, int $b): int {\n    if ($b === 0) {\n        throw new Exception("division par zéro");\n    }\n    return intdiv($a, $b);\n}\n\ntry {\n    echo diviser(10, 0);\n} catch (Exception $e) {\n    echo "erreur : " . $e->getMessage();\n}</code></pre>',
        '<p>Le code du <code>catch</code> n’est exécuté que si une exception est lancée ; jamais deux fois, et ' +
        'jamais sans <code>throw</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Exceptions personnalisées',
      html: [
        '<p>Une <strong>exception personnalisée</strong> est une classe qui étend <code>Exception</code>. On peut ' +
        'l’attraper précisément : un <code>catch (SoldeInsuffisant $e)</code> ne réagit qu’à ce type.</p>',
        '<pre><code>class SoldeInsuffisant extends Exception {}\n\nfunction retirer(float $solde, float $montant): float {\n    if ($montant > $solde) {\n        throw new SoldeInsuffisant("solde insuffisant");\n    }\n    return $solde - $montant;\n}</code></pre>',
        box('pitfall', 'Piège — attraper trop large', 'warning',
          '    <p><code>catch (Exception $e)</code> attrape <strong>tout</strong>, y compris des erreurs qu’on ne ' +
          'savait pas prévoir. Préférer des types précis permet de distinguer un problème métier (« solde ' +
          'insuffisant ») d’un problème technique inattendu.</p>')
      ].join('\n')
    },
    {
      title: 'finally et multi-catch',
      html: [
        '<p>Plusieurs types peuvent être regroupés dans un seul <code>catch</code> avec le tube (<code>|</code>). ' +
        'Le bloc <code>finally</code>, enfin, s’exécute dans tous les cas — succès ou exception — ce qui le rend ' +
        'idéal pour fermer une ressource.</p>',
        '<pre><code>try {\n    verifier($saisie);\n} catch (InvalidArgumentException | RangeException $e) {\n    echo "saisie invalide";\n} finally {\n    echo "controle termine";\n}</code></pre>',
        '<p>L’ordre compte : PHP teste les <code>catch</code> dans l’ordre écrit. Un type fils doit donc être ' +
        'attrapé avant un type parent, sinon il est masqué.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Comment lance-t-on une exception ?', opts: ['raise', 'throw', 'catch'], correct: 1, exp: 'On lance avec throw new Exception(…).' },
    { stem: 'Que fait un bloc catch ?', opts: ['Il exécute toujours', 'Il reçoit l’exception lancée', 'Il lève l’exception'], correct: 1, exp: 'catch intercepte une exception du type indiqué.' },
    { stem: 'Une exception personnalisée…', opts: ['est indépendante', 'étend Exception', 'est une interface'], correct: 1, exp: 'Elle hérite d’Exception pour être attrapable précisément.' },
    { stem: 'Quand s’exécute finally ?', opts: ['Seulement en cas d’erreur', 'Dans tous les cas', 'Jamais'], correct: 1, exp: 'finally s’exécute après le try ou le catch, quoi qu’il arrive.' },
    { stem: 'Que fait `catch (A | B $e)` ?', opts: ['Attrape A ou B', 'Attrape seulement A', 'Lève A et B'], correct: 0, exp: 'Le tube regroupe plusieurs types dans un même catch.' },
    { stem: 'Comment lire le message d’une exception ?', opts: ['$e->message', '$e->getMessage()', '$e.message'], correct: 1, exp: 'On appelle la méthode getMessage() de l’objet exception.' },
    { stem: 'Attraper (Exception $e) attrape…', opts: ['seulement Exception', 'tous les types du langage', 'rien'], correct: 1, exp: 'Exception est la racine : elle attrape très large, parfois trop.' },
    { stem: 'Que fait une exception non attrapée ?', opts: ['Elle est ignorée', 'Elle termine le script avec une erreur', 'Elle devient un warning'], correct: 1, exp: 'Sans catch, PHP affiche une erreur fatale "Uncaught".' }
  ],

  pitfalls: [
    'Confondre erreur (subie) et exception (lancée volontairement).',
    'Utiliser <code>catch (Exception $e)</code> là où un type précis serait plus sûr.',
    'Oublier <code>$e-&gt;getMessage()</code> et tenter <code>$e-&gt;message</code>.',
    'Placer un <code>catch</code> parent avant un fils : le fils devient inatteignable.',
    'Croire que <code>finally</code> ne s’exécute qu’en cas d’exception.'
  ],

  methodTitle: 'Rendre un programme robuste',
  method: [
    '<strong>Repérer</strong> le point où une situation invalide doit être signalée.',
    '<strong>Lancer</strong> une exception typée avec un message clair (le plus précis possible).',
    '<strong>Protéger</strong> l’appel dans un try et prévoir les types attendus dans les catch.',
    '<strong>Réagir</strong> : corriger, journaliser, ou laisser remonter selon le niveau.',
    '<strong>Nettoyer</strong> dans finally (fermeture de ressource, remise en état).'
  ],

  summary: [
    'Une erreur est subie ; une exception se lance avec throw et s’attrape avec catch.',
    'Une exception est un objet : message via getMessage(), plus code, fichier et ligne.',
    'Une exception personnalisée étend Exception pour être attrapée précisément.',
    '<code>catch (A | B $e)</code> regroupe plusieurs types ; l’ordre des catch importe.',
    '<code>finally</code> s’exécute dans tous les cas, succès comme échec.'
  ],

  checklist: [
    'Je sais quand lancer une exception plutôt que retourner un code d’erreur.',
    'J’écris un try/catch qui lit le message de l’exception.',
    'Je crée une exception personnalisée et l’attrape précisément.',
    'J’utilise finally et le multi-catch à bon escient.'
  ],

  notions: ['erreur', 'exception', 'throw', 'try', 'catch', 'getMessage', 'exception personnalisée', 'extends Exception', 'multi-catch', 'finally'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez throw, try et catch sur un exemple minimal.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous à écrire une exception personnalisée.' },
    { cls: 'good', text: '70–94 % — Solide : vous choisissez des types de catch précis.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe à PDO et à l’architecture, chapitre 6.' }
  ],

  flashcards: [
    { q: 'Comment lance-t-on une exception ?', a: 'throw new Exception("message");' },
    { q: 'Différence erreur / exception ?', a: 'L’erreur est subie ; l’exception est lancée volontairement et attrapable.' },
    { q: 'Comment créer une exception personnalisée ?', a: 'class MonErreur extends Exception {}.' },
    { q: 'Quand s’exécute finally ?', a: 'Dans tous les cas, après le try ou le catch.' },
    { q: 'Que fait catch (A | B $e) ?', a: 'Il attrape les exceptions de type A ou B dans un même bloc.' },
    { q: 'Comment lire le message d’une exception ?', a: 'Avec $e->getMessage().' }
  ]
};
