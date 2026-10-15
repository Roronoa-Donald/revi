/**
 * Chapitre 4 du cours « Java » B2 — classes, objets et encapsulation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Classes, objets et encapsulation',
  short: 'Classes et objets',
  toc: 'Attributs, constructeur, méthodes, private/public, getters et setters, toString.',
  time: '≈ 3 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un tableau transporte des valeurs, mais rien ne garantit leur cohérence. La classe décrit la forme ' +
    'd’une donnée ; l’objet en est une instance. L’encapsulation protège l’état derrière des méthodes qui ' +
    'le contrôlent.',

  objectives: [
    'déclarer une classe avec ses attributs et son constructeur ;',
    'créer des objets avec new et appeler leurs méthodes ;',
    'protéger l’état avec private et des getters/setters ;',
    'redéfinir toString() pour afficher un objet.'
  ],

  sections: [
    {
      title: 'Classe, objet et constructeur',
      html: [
        '<p>Une <strong>classe</strong> décrit les attributs (l’état) et les méthodes (les comportements) ' +
        'd’un type. Le <strong>constructeur</strong> porte le nom de la classe et initialise l’objet.</p>',
        '<pre><code>class Rectangle {\n    private final int largeur;\n    private final int hauteur;\n\n    Rectangle(int largeur, int hauteur) {\n        this.largeur = largeur;\n        this.hauteur = hauteur;\n    }\n\n    int aire() {\n        return largeur * hauteur;\n    }\n}</code></pre>',
        '<p>On crée un objet avec <code>new</code> : <code>Rectangle r = new Rectangle(4, 5);</code>. ' +
        '<code>this</code> désigne l’objet courant, notamment pour distinguer un attribut d’un paramètre ' +
        'de même nom.</p>'
      ].join('\n')
    },
    {
      title: 'Encapsulation et visibilité',
      html: [
        '<p>Les mots-clés de <strong>visibilité</strong> décident qui accède à un membre : <code>public</code> ' +
        '(tout le monde), <code>private</code> (la classe seule), <code>protected</code> (la classe et ses ' +
        'filles). L’encapsulation met les attributs en <code>private</code> et n’ouvre que des méthodes ' +
        'contrôlées.</p>',
        '<pre><code>private int solde;\n\npublic int getSolde() {\n    return solde;\n}\n\npublic void setSolde(int solde) {\n    if (solde &lt; 0) {\n        throw new IllegalArgumentException("solde négatif");\n    }\n    this.solde = solde;\n}</code></pre>',
        box('pitfall', 'Piège — l’attribut public', 'warning',
          '    <p>Un attribut <code>public</code> se modifie de n’importe où, sans contrôle : un solde ' +
          'négatif peut entrer par la porte de service. Le setter, lui, refuse la valeur avant de l’affecter.</p>')
      ].join('\n')
    },
    {
      title: 'Affichage d’un objet',
      html: [
        '<p>Par défaut, afficher un objet montre son type et son adresse, illisibles. On redéfinit ' +
        '<code>toString()</code> avec l’annotation <code>@Override</code> pour lui donner un sens.</p>',
        '<pre><code>@Override\npublic String toString() {\n    return "(" + x + ", " + y + ")";\n}</code></pre>',
        '<p><code>System.out.println(unPoint)</code> appelle alors automatiquement cette méthode.</p>'
      ].join('\n')
    },
    {
      title: 'Construire un objet complet',
      html: [
        '<p>Une bonne classe garantit qu’un objet ne peut pas exister dans un état invalide. Le constructeur ' +
        'range les valeurs obligatoires ; les setters valident celles qui changent.</p>',
        '<pre><code>class Personne {\n    private final String nom;\n    private int age;\n\n    Personne(String nom, int age) {\n        this.nom = nom;\n        this.age = age;\n    }\n\n    String getNom() { return nom; }\n    int getAge() { return age; }\n}</code></pre>',
        box('intuition', 'Un objet, un contrat', 'lightbulb',
          '    <p>Une classe bien faite répond à une question : « qu’est-ce qu’une Personne valide ? ». En ' +
          'verrouillant les propriétés qui ne changent pas (<code>final</code>) et en validant les autres, ' +
          'elle rend les bugs d’état impossibles plutôt que difficiles à trouver.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qu’est-ce qu’une classe ?', opts: ['Un moule à objets', 'Une valeur', 'Une boucle'], correct: 0, exp: 'La classe décrit attributs et méthodes ; new produit des instances.' },
    { stem: 'Comment s’appelle le constructeur ?', opts: ['Comme la classe', 'main', 'new'], correct: 0, exp: 'Le constructeur porte le nom de la classe.' },
    { stem: 'Que fait new ?', opts: ['Crée un objet', 'Détruit un objet', 'Copie une classe'], correct: 0, exp: 'new instancie et appelle le constructeur.' },
    { stem: 'Que désigne this ?', opts: ['L’objet courant', 'La classe', 'Le constructeur'], correct: 0, exp: 'this référence l’instance en cours.' },
    { stem: 'Que fait private ?', opts: ['Réserve l’accès à la classe', 'Ouvre à tous', 'Interdit la classe'], correct: 0, exp: 'private n’est accessible que depuis la classe elle-même.' },
    { stem: 'À quoi sert un setter ?', opts: ['Lire l’état', 'Écrire l’état en validant', 'Détruire l’objet'], correct: 1, exp: 'Le setter contrôle la valeur avant de l’affecter.' },
    { stem: 'Que fait @Override sur toString ?', opts: ['Redéfinit l’affichage de l’objet', 'Supprime la méthode', 'Crée un getter'], correct: 0, exp: 'println appelle alors cette version de toString.' },
    { stem: 'Que signifie final sur un attribut ?', opts: ['Il ne peut plus être réaffecté', 'Il est public', 'Il est statique'], correct: 0, exp: 'final fige la valeur une fois le constructeur passé.' }
  ],

  pitfalls: [
    'Oublier <code>this.</code> dans le constructeur quand le paramètre a le même nom.',
    'Laisser un attribut <code>public</code> alors qu’il devrait être contrôlé.',
    'Affecter avant de valider dans un setter.',
    'Afficher un objet sans <code>toString()</code> et lire une adresse illisible.',
    'Réaffecter un attribut <code>final</code>.'
  ],

  methodTitle: 'Écrire une classe propre',
  method: [
    '<strong>Nommer</strong> l’entité métier, pas la table de données.',
    '<strong>Lister</strong> les attributs qui décrivent un objet complet.',
    '<strong>Écrire</strong> le constructeur qui range les valeurs reçues.',
    '<strong>Fermer</strong> les attributs en private et ouvrir getters/setters utiles.',
    '<strong>Redéfinir</strong> toString() pour un affichage lisible.'
  ],

  summary: [
    'Une classe décrit état (attributs) et comportements (méthodes).',
    'Le constructeur initialise ; new crée l’objet.',
    'this désigne l’objet courant.',
    'public/private/protected décident de la visibilité ; private protège l’état.',
    'Un setter valide avant d’affecter ; toString() rend l’affichage lisible.'
  ],

  checklist: [
    'Je déclare une classe avec attributs et constructeur.',
    'Je crée des objets avec new et j’appelle leurs méthodes.',
    'Je protège mes attributs en private.',
    'Je redéfinis toString() pour afficher un objet.'
  ],

  notions: ['classe', 'objet', 'constructeur', 'new', 'this', 'attribut', 'méthode', 'public', 'private', 'protected', 'encapsulation', 'getter', 'setter', 'toString', 'final'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Réécris la classe Rectangle de zéro.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la visibilité et les setters validants.' },
    { cls: 'good', text: '70–89 % — Solide : tes classes ont un état clair et protégé.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux collections et à l’héritage, chapitre 5.' }
  ],

  flashcards: [
    { q: 'Différence entre classe et objet ?', a: 'La classe est le moule ; l’objet est une instance créée par new.' },
    { q: 'Comment s’appelle le constructeur ?', a: 'Comme la classe ; il initialise l’objet.' },
    { q: 'Que désigne this ?', a: 'L’objet courant.' },
    { q: 'Que réserve private ?', a: 'L’accès au code de la classe seule.' },
    { q: 'Rôle d’un setter ?', a: 'Écrire l’état en validant la valeur avant l’affectation.' },
    { q: 'Pourquoi redéfinir toString() ?', a: 'Pour afficher un objet de façon lisible au lieu d’une adresse.' }
  ]
};
