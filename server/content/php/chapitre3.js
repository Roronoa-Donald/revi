/**
 * Chapitre 3 du cours « PHP POO » B2 — héritage, abstrait, polymorphisme, interfaces.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Héritage, classes abstraites et interfaces',
  short: 'Héritage et interfaces',
  toc: 'Étendre une classe, appeler parent, classes abstraites, polymorphisme et contrats d’interface.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Plusieurs objets partagent des comportements : un cercle et un carré ont tous deux une aire et un ' +
    'périmètre. Plutôt que de recopier, on factorise dans une classe mère, et on impose un contrat commun à ' +
    'toutes les formes avec une interface. C’est ce qui permet d’écrire du code qui traite « n’importe quelle ' +
    'forme » sans connaître les détails.',

  objectives: [
    'étendre une classe et réutiliser son code avec extends ;',
    'appeler le constructeur parent avec parent::__construct() ;',
    'déclarer une classe abstraite et des méthodes abstraites ;',
    'imposer un contrat avec une interface et l’implémenter.'
  ],

  sections: [
    {
      title: 'Hériter d’une classe',
      html: [
        '<p>Le mot-clé <code>extends</code> fait hériter une classe (la <strong>fille</strong>) d’une autre (la ' +
        '<strong>mère</strong>). La fille reçoit les propriétés et méthodes accessibles du parent, et peut les ' +
        '<strong>redéfinir</strong> pour les spécialiser.</p>',
        '<pre><code>class Animal {\n    protected $nom;\n\n    public function __construct(string $nom) {\n        $this-&gt;nom = $nom;\n    }\n\n    public function crier(): string {\n        return $this-&gt;nom . " fait un bruit";\n    }\n}\n\nclass Chien extends Animal {\n    public function crier(): string {\n        return $this-&gt;nom . " aboie";\n    }\n}</code></pre>',
        '<p>La visibilité <code>protected</code> est faite pour cela : la propriété <code>$nom</code> est ' +
        'accessible depuis la classe et ses filles, mais reste fermée à l’extérieur.</p>'
      ].join('\n')
    },
    {
      title: 'Redéfinir et appeler le parent',
      html: [
        '<p>Quand la fille a besoin du comportement du parent, elle l’appelle avec <code>parent::</code>. ' +
        'Typiquement, la fille appelle <code>parent::__construct()</code> pour ne pas réécrire l’initialisation.</p>',
        '<pre><code>class Chat extends Animal {\n    public function __construct(string $nom) {\n        parent::__construct($nom);   // hérite de l’initialisation\n    }\n}</code></pre>',
        box('pitfall', 'Piège — oublier le constructeur parent', 'warning',
          '    <p>Si la fille définit son propre <code>__construct()</code> sans appeler ' +
          '<code>parent::__construct()</code>, le parent n’est plus jamais initialisé : les propriétés du parent ' +
          'restent vides. On appelle explicitement le parent quand on veut son travail.</p>')
      ].join('\n')
    },
    {
      title: 'Classes abstraites',
      html: [
        '<p>Une <strong>classe abstraite</strong> (<code>abstract</code>) ne s’instancie pas : elle sert de base ' +
        'commune. Elle peut déclarer des <strong>méthodes abstraites</strong> — sans corps — que chaque fille devra ' +
        'obligatoirement implémenter.</p>',
        '<pre><code>abstract class Forme {\n    abstract public function aire(): float;\n\n    public function decrire(): string {\n        return "forme d’aire " . $this->aire();\n    }\n}</code></pre>',
        '<p>Impossible de faire <code>new Forme()</code> : une classe abstraite est un squelette. En revanche, elle ' +
        'peut déjà coder les méthodes communes, comme <code>decrire()</code>.</p>'
      ].join('\n')
    },
    {
      title: 'Polymorphisme et interfaces',
      html: [
        '<p>Le <strong>polymorphisme</strong> est la conséquence de l’abstraction : on appelle <code>aire()</code> ' +
        'sur un objet dont on ne connaît que le type de base, et chaque classe exécute sa version. Une ' +
        '<strong>interface</strong> pousse l’idée plus loin : elle ne décrit qu’un contrat de méthodes, sans aucun ' +
        'code, et une classe peut en implémenter plusieurs.</p>',
        '<pre><code>interface Affichable {\n    public function afficher(): string;\n}\n\nclass Cercle extends Forme implements Affichable {\n    public function aire(): float { return 3.14 * $this->r * $this->r; }\n    public function afficher(): string { return "cercle"; }\n}</code></pre>',
        box('tech', 'Interface contre classe abstraite', 'layers',
          '    <p>Une classe abstraite peut contenir du code et n’en hérite qu’une seule (héritage simple). Une ' +
          'interface ne contient <strong>que des signatures</strong> et on peut en implémenter autant qu’on veut : ' +
          'elle sert à décrire une capacité (« est affichable », « est comparable »).</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel mot-clé fait hériter une classe ?', opts: ['implements', 'extends', 'parent'], correct: 1, exp: 'extends établit l’héritage simple entre deux classes.' },
    { stem: 'Comment appelle-t-on le constructeur du parent ?', opts: ['self::__construct()', 'parent::__construct()', 'super()'], correct: 1, exp: 'parent::__construct() exécute le constructeur de la classe mère.' },
    { stem: 'Une classe abstraite…', opts: ['s’instancie', 'ne s’instancie pas', 'est une interface'], correct: 1, exp: 'abstract interdit new : elle sert de base à des filles concrètes.' },
    { stem: 'Une méthode abstraite…', opts: ['a un corps', 'n’a pas de corps', 'est statique'], correct: 1, exp: 'Elle déclare la signature ; chaque fille doit la définir.' },
    { stem: 'protected est visible…', opts: ['partout', 'dans la classe et ses filles', 'nulle part'], correct: 1, exp: 'protected ouvre l’accès à la classe et à ses descendantes.' },
    { stem: 'Combien d’interfaces peut implémenter une classe ?', opts: ['Une seule', 'Autant qu’on veut', 'Zéro'], correct: 1, exp: 'On peut implémenter plusieurs interfaces, séparées par des virgules.' },
    { stem: 'Une interface contient…', opts: ['du code', 'des signatures de méthodes', 'des propriétés'], correct: 1, exp: 'L’interface n’est qu’un contrat : des signatures sans implémentation.' },
    { stem: 'Le polymorphisme permet…', opts: ['d’appeler la même méthode sur des types différents', 'de copier une classe', 'd’interdire l’héritage'], correct: 0, exp: 'Chaque objet répond à la même méthode selon sa propre implémentation.' }
  ],

  pitfalls: [
    'Redéfinir <code>__construct()</code> sans appeler <code>parent::__construct()</code>.',
    'Vouloir instancier une classe <code>abstract</code> ou une <code>interface</code>.',
    'Oublier d’implémenter une méthode abstraite ou une méthode d’interface.',
    'Mettre du code dans une interface : elle ne porte que des signatures.',
    'Confondre héritage (« est un ») et simple factorisation de code.'
  ],

  methodTitle: 'Factoriser sans se tromper',
  method: [
    '<strong>Identifier</strong> ce qui est commun : propriétés et méthodes partagées.',
    '<strong>Remonter</strong> le commun dans une classe mère (concrète ou abstraite).',
    '<strong>Déclarer abstrait</strong> ce que chaque fille doit absolument fournir.',
    '<strong>Choisir le contrat</strong> : interface pour une capacité, classe abstraite pour un squelette.',
    '<strong>Appeler parent</strong> quand la fille a besoin du comportement hérité.'
  ],

  summary: [
    '<code>extends</code> établit l’héritage simple ; la fille redéfinit ce qu’elle spécialise.',
    '<code>parent::__construct()</code> réutilise l’initialisation du parent.',
    'Une classe <code>abstract</code> ne s’instancie pas et peut imposer des méthodes abstraites.',
    'Le polymorphisme : une méthode appelée s’exécute selon le type réel de l’objet.',
    'Une interface est un contrat de signatures ; une classe peut en implémenter plusieurs.'
  ],

  checklist: [
    'Je fais hériter une classe et je redéfinis une méthode.',
    'J’appelle parent::__construct() quand la fille a son propre constructeur.',
    'Je déclare et implémente une méthode abstraite.',
    'Je distingue interface (contrat) et classe abstraite (squelette).'
  ],

  notions: ['héritage', 'extends', 'parent::', 'redéfinition', 'protected', 'abstract', 'méthode abstraite', 'polymorphisme', 'interface', 'implements'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois extends, parent:: et la visibilité protected.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à redéfinir une méthode sans casser le parent.' },
    { cls: 'good', text: '70–89 % — Solide : tu distingues abstract et interface.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux traits et namespaces, chapitre 4.' }
  ],

  flashcards: [
    { q: 'Que fait extends ?', a: 'Il fait hériter une classe fille des membres accessibles de sa classe mère.' },
    { q: 'Comment réutiliser le constructeur parent ?', a: 'En appelant parent::__construct($args) depuis la fille.' },
    { q: 'Qu’est-ce qu’une classe abstraite ?', a: 'Une classe non instanciable qui sert de base et peut imposer des méthodes.' },
    { q: 'Qu’est-ce qu’une interface ?', a: 'Un contrat de signatures de méthodes, sans code, implémentable en nombre.' },
    { q: 'Qu’est-ce que le polymorphisme ?', a: 'La même méthode s’exécute différemment selon le type réel de l’objet.' },
    { q: 'protected, pour qui ?', a: 'Pour la classe et ses classes filles, pas pour l’extérieur.' }
  ]
};
