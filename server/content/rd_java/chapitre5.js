/**
 * Chapitre 5 du cours « Java » B2 — collections, héritage et polymorphisme.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Collections, héritage et polymorphisme',
  short: 'Collections et héritage',
  toc: 'List, Set et Map, extends, super, redéfinition, classes abstraites et polymorphisme.',
  time: '≈ 3 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Les applications manipulent des ensembles de données et des familles d’objets qui partagent un ' +
    'comportement commun. Les collections rangent les données ; l’héritage factorise le code entre types ' +
    'proches, et le polymorphisme laisse chaque type répondre à sa manière.',

  objectives: [
    'choisir entre List, Set et Map selon le besoin ;',
    'factoriser par héritage avec extends et super ;',
    'redéfinir une méthode et en tirer du polymorphisme ;',
    'écrire une classe abstraite comme contrat partiel.'
  ],

  sections: [
    {
      title: 'List, Set et Map',
      html: [
        '<p>Le <strong>framework Collections</strong> propose trois familles. <code>List</code> garde ' +
        'l’ordre et autorise les doublons ; <code>Set</code> élimine les doublons ; <code>Map</code> ' +
        'associe chaque clé à une valeur.</p>',
        '<pre><code>import java.util.*;\n\nList&lt;String&gt; liste = new ArrayList&lt;&gt;();\nSet&lt;Integer&gt; ensemble = new HashSet&lt;&gt;();\nMap&lt;String, Integer&gt; ages = new HashMap&lt;&gt;();\nages.put("Ada", 36);</code></pre>',
        '<p>Pour compter des valeurs distinctes, un <code>Set</code> est l’outil direct : ' +
        '<code>ensemble.size()</code> après avoir ajouté les éléments.</p>'
      ].join('\n')
    },
    {
      title: 'Héritage : extends et super',
      html: [
        '<p>Une classe fille <strong>hérite</strong> d’une classe mère avec <code>extends</code>. Elle ' +
        'récupère ses attributs et méthodes, et appelle son constructeur avec <code>super(...)</code>.</p>',
        '<pre><code>class Animal {\n    protected final String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n}\n\nclass Chien extends Animal {\n    Chien(String nom) {\n        super(nom);\n    }\n}</code></pre>',
        box('pitfall', 'Piège — super oublié', 'warning',
          '    <p>Si la classe mère n’a pas de constructeur vide, la classe fille doit appeler ' +
          '<code>super(...)</code> en première ligne de son propre constructeur. L’oublier casse la ' +
          'compilation.</p>')
      ].join('\n')
    },
    {
      title: 'Redéfinition et polymorphisme',
      html: [
        '<p>Une fille peut <strong>redéfinir</strong> une méthode héritée avec <code>@Override</code>. Une ' +
        'variable de type mère peut alors référencer un objet fille : c’est le <strong>polymorphisme</strong>, ' +
        'la version exécutée étant celle du type réel de l’objet.</p>',
        '<pre><code>class Chien extends Animal {\n    @Override\n    String crier() {\n        return "Wouf";\n    }\n}\n\nAnimal a = new Chien("Rex");\na.crier();   // "Wouf", la version de Chien</code></pre>',
        '<p>C’est ce mécanisme qui permet de traiter une collection d’animaux différents avec un seul appel.</p>'
      ].join('\n')
    },
    {
      title: 'Classes abstraites',
      html: [
        '<p>Une <strong>classe abstraite</strong> décrit un squelette incomplet : elle peut déclarer des ' +
        'méthodes abstraites que les filles devront implémenter. On ne peut pas l’instancier directement.</p>',
        '<pre><code>abstract class Forme {\n    abstract double aire();\n}\n\nclass Carre extends Forme {\n    private final double cote;\n    Carre(double cote) { this.cote = cote; }\n    double aire() { return cote * cote; }\n}</code></pre>',
        box('intuition', 'Un contrat, pas un code', 'lightbulb',
          '    <p>Une classe abstraite dit « toute forme sait calculer son aire », sans dire comment. Chaque ' +
          'fille fournit sa formule. L’appelant, lui, n’a besoin que de connaître <code>Forme</code>.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle collection élimine les doublons ?', opts: ['List', 'Set', 'Map'], correct: 1, exp: 'Un Set ne garde qu’une copie de chaque valeur.' },
    { stem: 'Quelle collection associe clés et valeurs ?', opts: ['List', 'Set', 'Map'], correct: 2, exp: 'Map associe chaque clé à une valeur.' },
    { stem: 'Que fait extends ?', opts: ['Hériter d’une classe', 'Créer un objet', 'Comparer'], correct: 0, exp: 'extends établit la relation classe fille → classe mère.' },
    { stem: 'À quoi sert super(...) ?', opts: ['Appeler le constructeur de la mère', 'Copier l’objet', 'Comparer'], correct: 0, exp: 'super transmet l’initialisation à la classe mère.' },
    { stem: 'Que fait @Override ?', opts: ['Redéfinit une méthode héritée', 'Supprime', 'Rend privé'], correct: 0, exp: 'Il redéfinit la version de la classe mère.' },
    { stem: 'Le polymorphisme permet…', opts: ['d’appeler la version du type réel', 'de copier un objet', 'de trier'], correct: 0, exp: 'La méthode exécutée est celle du type réel de l’objet.' },
    { stem: 'Peut-on instancier une classe abstraite ?', opts: ['Non', 'Oui', 'Seulement à midi'], correct: 0, exp: 'Une classe abstraite ne peut pas être instanciée directement.' },
    { stem: 'Que doit fournir une classe fille d’une méthode abstraite ?', opts: ['Son implémentation', 'Rien', 'Un constructeur'], correct: 0, exp: 'La fille doit implémenter toute méthode abstraite.' }
  ],

  pitfalls: [
    'Confondre <code>List</code> (ordonné, doublons) et <code>Set</code> (pas de doublons).',
    'Oublier <code>super(...)</code> dans le constructeur d’une classe fille.',
    'Redéfinir une méthode sans l’annotation <code>@Override</code> et se tromper de signature.',
    'Tenter <code>new</code> sur une classe abstraite.',
    'Comparer deux chaînes avec <code>==</code> au lieu de <code>.equals()</code>.'
  ],

  methodTitle: 'Structurer entre collections et héritage',
  method: [
    '<strong>Choisir</strong> la collection : List, Set ou Map.',
    '<strong>Identifier</strong> le comportement commun à factoriser.',
    '<strong>Écrire</strong> la classe mère (ou abstraite) et ses méthodes.',
    '<strong>Redéfinir</strong> dans les filles avec @Override.',
    '<strong>Programmer</strong> contre le type mère pour bénéficier du polymorphisme.'
  ],

  summary: [
    'List garde l’ordre et les doublons ; Set les élimine ; Map associe clé et valeur.',
    'extends hérite ; super(...) appelle le constructeur de la mère.',
    'Une fille redéfinit une méthode avec @Override.',
    'Le polymorphisme exécute la version du type réel de l’objet.',
    'Une classe abstraite ne s’instancie pas : elle fixe un contrat.'
  ],

  checklist: [
    'Je choisis la collection adaptée au besoin.',
    'J’écris une relation d’héritage correcte avec super.',
    'Je redéfinis une méthode et je m’appuie sur le polymorphisme.',
    'Je déclare une classe abstraite quand elle a des méthodes à implémenter.'
  ],

  notions: ['List', 'Set', 'Map', 'ArrayList', 'HashSet', 'HashMap', 'extends', 'super', 'héritage', 'redéfinition', '@Override', 'polymorphisme', 'classe abstraite', 'méthode abstraite'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois la différence entre List, Set et Map.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur extends, super et @Override.' },
    { cls: 'good', text: '70–89 % — Solide : tu factorises et tu utilises le polymorphisme.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux exceptions, chapitre 6.' }
  ],

  flashcards: [
    { q: 'Quelle collection pour des valeurs uniques ?', a: 'Un Set, qui élimine les doublons.' },
    { q: 'Quelle collection associe clé et valeur ?', a: 'Une Map (par exemple HashMap).' },
    { q: 'Que fait extends ?', a: 'Il fait hériter une classe d’une autre.' },
    { q: 'À quoi sert super(...) ?', a: 'À appeler le constructeur de la classe mère.' },
    { q: 'Que fait @Override ?', a: 'Il redéfinit une méthode héritée.' },
    { q: 'Que permet le polymorphisme ?', a: 'D’appeler la version du type réel de l’objet.' }
  ]
};
