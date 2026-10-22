/**
 * Chapitre 1 du cours « PHP POO » B2 — objets et classes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Objets et classes',
  short: 'Objets et classes',
  toc: 'Pourquoi modéliser, déclarer une classe, le constructeur, $this, méthodes et instanciation.',
  time: '≈ 2 h de travail',
  free: true,

  situation:
    'En procédural, on range les données dans des tableaux et on les fait circuler de fonction en fonction : ' +
    'personne ne garantit qu’un « client » a bien un nom, un solde et un historique. La programmation orientée ' +
    'objet réunit les données et les opérations qui les concernent dans une même entité : la classe.',

  objectives: [
    'expliquer l’intérêt d’une classe par rapport à un tableau associatif ;',
    'déclarer une classe avec propriétés, constructeur et méthodes ;',
    'utiliser $this pour atteindre l’état de l’objet courant ;',
    'instancier un objet et appeler ses méthodes.'
  ],

  sections: [
    {
      title: 'Pourquoi passer à l’objet',
      html: [
        '<p>Un tableau associatif (<code>["nom" =&gt; "Ada", "solde" =&gt; 100]</code>) transporte bien ' +
        'des données, mais rien ne l’empêche d’oublier une clé ou d’accepter un solde négatif. Une <strong>classe</strong> ' +
        'décrit la forme d’une donnée : quelles propriétés elle possède et quelles opérations ont le droit de la ' +
        'modifier.</p>',
        '<p>La classe est le <strong>moule</strong>, l’objet est la <strong>pièce</strong> produite. Un objet de la ' +
        'classe <code>CompteBancaire</code> connaît son titulaire et son solde, et sait se décrire ou retirer de ' +
        'l’argent. Deux objets différents ont chacun leur propre état.</p>',
        box('tech', 'Une classe = données + comportements', 'code',
          '    <p>Les <strong>propriétés</strong> (variables) décrivent l’état ; les <strong>méthodes</strong> ' +
          '(fonctions) décrivent les actions. En les réunissant, on peut raisonner sur le « client » ou le ' +
          '« compte » comme sur une entité complète plutôt que sur une série de tableaux.</p>')
      ].join('\n')
    },
    {
      title: 'Déclarer une classe et son constructeur',
      html: [
        '<p>On déclare une classe avec le mot-clé <code>class</code>. Le <strong>constructeur</strong> ' +
        '<code>__construct()</code> est appelé automatiquement à la création de l’objet : c’est l’endroit naturel ' +
        'pour ranger les valeurs reçues.</p>',
        '<pre><code>&lt;?php\nclass Point {\n    private $x;\n    private $y;\n\n    public function __construct(int $x, int $y) {\n        $this-&gt;x = $x;\n        $this-&gt;y = $y;\n    }\n}</code></pre>',
        '<p><code>$this</code> représente l’objet en cours de construction ou d’utilisation. Écrire ' +
        '<code>$this-&gt;x = $x</code> range l’argument dans la propriété <code>x</code> de <em>cet</em> objet — pas ' +
        'dans une variable globale.</p>',
        box('pitfall', 'Piège — la flèche, pas le point', 'warning',
          '    <p>En PHP, on atteint un membre avec <code>-&gt;</code> (<code>$this-&gt;x</code>), jamais avec le ' +
          'point qui reste la concaténation de chaînes. Confondre <code>$this.x</code> et <code>$this-&gt;x</code> ' +
          'est l’erreur numéro un des débutants venus de JavaScript ou de Python.</p>')
      ].join('\n')
    },
    {
      title: 'Méthodes et état',
      html: [
        '<p>Une méthode lit et modifie l’état de l’objet. Elle accède aux propriétés via <code>$this</code> et peut ' +
        'renvoyer un résultat avec <code>return</code>.</p>',
        '<pre><code>public function afficher(): string {\n    return "(" . $this-&gt;x . ", " . $this-&gt;y . ")";\n}</code></pre>',
        '<p>Le type de retour (<code>: string</code>) documente le contrat : la méthode promet une chaîne. PHP ' +
        'vérifie cette promesse à l’exécution et lève une erreur si le contrat n’est pas tenu.</p>'
      ].join('\n')
    },
    {
      title: 'Instancier et utiliser un objet',
      html: [
        '<p>On crée un objet avec <code>new</code>, ce qui déclenche le constructeur. On appelle ensuite ses ' +
        'méthodes avec la même flèche.</p>',
        '<pre><code>$p = new Point(3, 4);\n' +
        'echo $p-&gt;afficher();     // (3, 4)\n' +
        'echo $p-&gt;x;              // interdit : x est privé</code></pre>',
        '<p>Une propriété privée n’est accessible que depuis l’intérieur de la classe : c’est le chapitre 2 qui ' +
        'explique comment l’ouvrir proprement avec des getters et des setters.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle est la différence entre classe et objet ?', opts: ['Aucune', 'La classe est le moule, l’objet l’instance', 'L’objet est le moule'], correct: 1, exp: 'La classe décrit la forme ; new en produit des objets (instances) distincts.' },
    { stem: 'Quand le constructeur est-il exécuté ?', opts: ['À la déclaration de la classe', 'À la création avec new', 'Jamais'], correct: 1, exp: '__construct() s’exécute à chaque new, pour initialiser l’objet.' },
    { stem: 'Que représente $this ?', opts: ['La classe', 'L’objet courant', 'Le constructeur'], correct: 1, exp: '$this est l’instance en cours d’utilisation.' },
    { stem: 'Comment atteint-on une propriété en PHP ?', opts: ['$this.x', '$this->x', '$this::x'], correct: 1, exp: 'La flèche -> atteint membres et méthodes : $this->x.' },
    { stem: 'Que fait le point en PHP ?', opts: ['Il accède à un membre', 'Il concatène des chaînes', 'Il compare'], correct: 1, exp: 'Le point est l’opérateur de concaténation, pas d’accès aux membres.' },
    { stem: 'Une propriété private est accessible…', opts: ['partout', 'seulement dans la classe', 'depuis les fonctions'], correct: 1, exp: 'private réserve l’accès au code de la classe elle-même.' },
    { stem: 'Que promet `: string` après un nom de méthode ?', opts: ['Rien', 'Un type de retour', 'Un paramètre'], correct: 1, exp: 'C’est la déclaration du type renvoyé : le contrat est vérifié.' },
    { stem: 'Deux objets d’une même classe partagent-ils leur état ?', opts: ['Oui', 'Non, chacun a le sien', 'Seulement en static'], correct: 1, exp: 'Chaque instance porte ses propres valeurs de propriétés.' }
  ],

  pitfalls: [
    'Confondre <code>.</code> (concaténation) et <code>-&gt;</code> (accès aux membres).',
    'Oublier <code>$this-&gt;</code> et écrire une variable locale au lieu d’une propriété.',
    'Déclarer une propriété sans visibilité ni valeur et la lire avant toute affectation.',
    'Croire que le constructeur retourne une valeur : il initialise, il ne renvoie rien.',
    'Oublier qu’une propriété privée est inaccessible depuis l’extérieur de la classe.'
  ],

  methodTitle: 'Écrire une classe propre',
  method: [
    '<strong>Nommer</strong> l’entité métier en pensant à l’objet, pas à la table de données.',
    '<strong>Lister l’état</strong> : quelles propriétés décrivent un objet complet ?',
    '<strong>Écrire le constructeur</strong> qui range ces propriétés à partir d’arguments typés.',
    '<strong>Définir les méthodes</strong> qui lisent ou transforment l’état via <code>$this</code>.',
    '<strong>Tester en petit</strong> : instancier deux objets et vérifier qu’ils sont indépendants.'
  ],

  summary: [
    'Une classe réunit des propriétés (état) et des méthodes (comportements).',
    '<code>new</code> crée un objet et déclenche <code>__construct()</code>.',
    '<code>$this</code> désigne l’objet courant ; on atteint ses membres avec <code>-&gt;</code>.',
    'Le point <code>.</code> concatène des chaînes, il n’accède pas aux membres.',
    'La visibilité <code>private</code> réserve l’accès au code de la classe.'
  ],

  checklist: [
    'Je distingue classe, objet et instance.',
    'Je déclare une classe avec propriétés, constructeur et méthodes.',
    'J’utilise $this et -> sans les confondre avec le point.',
    'J’instancie deux objets et je vérifie qu’ils sont indépendants.'
  ],

  notions: ['classe', 'objet', 'instance', 'constructeur', '$this', 'méthode', 'propriété', 'visibilité', 'new', 'type de retour', 'concaténation'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Réécris la classe Point de zéro avant de continuer.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous à distinguer -> et le point de concaténation.' },
    { cls: 'good', text: '70–94 % — Solide : votre classe a un état clair et des méthodes typées.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe à l’encapsulation, chapitre 2.' }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « visibilité » ?', a: 'Déclarer une propriété sans visibilité ni valeur et la lire avant toute affectation.' },
      { q: 'Qu’est-ce que « public » ?', a: 'La visibilité décide qui peut toucher un membre. public l’ouvre à tout le monde, private le réserve à la classe, protected l’ouvre aussi aux classes filles (chapitre 3). Le principe d’ encapsulation : propriétés en private, méthodes publiques qui contrôlent l’accès.' },
      { q: 'Qu’est-ce que « getter » ?', a: 'exposer l’état par des getters et le modifier par des setters qui valident ;' },
      { q: 'Qu’est-ce que « validation » ?', a: 'Ces trois exercices se font dans la page. L’éditeur du navigateur exécute le code et la validation fait tourner des jeux de tests indépendants : réussir l’exemple affiché ne suffit donc pas, il faut traiter le cas général.' },
      { q: 'Qu’est-ce que « héritage » ?', a: 'Une classe abstraite peut contenir du code et n’en hérite qu’une seule (héritage simple). Une interface ne contient que des signatures et on peut en implémenter autant qu’on veut : elle sert à décrire une capacité (« est affichable », « est comparable »).' },
      { q: 'Qu’est-ce que « redéfinition » ?', a: 'redéfinition : PHP POO B2 › Sommaire › Chapitre 3' },
      { q: 'Qu’est-ce que « abstract » ?', a: 'Une classe abstraite ( abstract ) ne s’instancie pas : elle sert de base commune. Elle peut déclarer des méthodes abstraites — sans corps — que chaque fille devra obligatoirement implémenter.' },
      { q: 'Qu’est-ce que « nom complet » ?', a: 'Écrire le nom complet Core\\Calcul partout au lieu d’importer une fois.' },
      { q: 'Qu’est-ce que « ERRMODE_EXCEPTION » ?', a: 'Le mode ERRMODE_EXCEPTION est essentiel : sans lui, une requête qui échoue renvoie simplement false et l’erreur passe inaperçue. Avec, chaque incident lève une PDOException qu’on peut intercepter.' },
      { q: 'Qu’est-ce que « paramètre nommé » ?', a: 'Comment lie-t-on un paramètre nommé ?' },
    { q: 'Qu’est-ce qu’une classe ?', a: 'Le moule qui décrit les propriétés et méthodes d’un type d’objet.' },
    { q: 'Quand s’exécute __construct() ?', a: 'Automatiquement à chaque new, pour initialiser l’objet.' },
    { q: 'À quoi sert $this ?', a: 'À désigner l’objet courant et atteindre ses membres avec ->.' },
    { q: 'Différence entre . et -> ?', a: '. concatène des chaînes ; -> accède à un membre ou une méthode.' },
    { q: 'Que signifie private sur une propriété ?', a: 'Accessible uniquement depuis le code de la classe.' },
    { q: 'Que garantit un type de retour ?', a: 'Le contrat de la méthode ; PHP le vérifie à l’exécution.' }
  ]
};
