/**
 * Chapitre 2 du cours « PHP POO » B2 — encapsulation, constantes, statique.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Encapsulation, constantes et membres statiques',
  short: 'Encapsulation et statique',
  toc: 'Visibilité, getters et setters avec validation, constantes de classe et membres statiques.',
  time: '≈ 2 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un objet dont on peut modifier l’état librement de l’extérieur est un tableau déguisé. Protéger l’état ' +
    'derrière des méthodes qui vérifient ce qu’on leur donne, c’est la différence entre du code qui tient et du ' +
    'code qui casse au premier solde négatif.',

  objectives: [
    'choisir la bonne visibilité pour chaque propriété et méthode ;',
    'exposer l’état par des getters et le modifier par des setters qui valident ;',
    'déclarer une constante de classe et la lire avec self:: ;',
    'utiliser un membre statique partagé par tous les objets.'
  ],

  sections: [
    {
      title: 'Encapsulation et visibilité',
      html: [
        '<p>La <strong>visibilité</strong> décide qui peut toucher un membre. <code>public</code> l’ouvre à tout ' +
        'le monde, <code>private</code> le réserve à la classe, <code>protected</code> l’ouvre aussi aux classes ' +
        'filles (chapitre 3). Le principe d’<strong>encapsulation</strong> : propriétés en private, méthodes ' +
        'publiques qui contrôlent l’accès.</p>',
        '<pre><code>class Compte {\n    private $solde;\n\n    public function solde(): float {\n        return $this-&gt;solde;\n    }\n}</code></pre>',
        box('intuition', 'Le soupirail, pas la porte ouverte', 'lock',
          '    <p>Une propriété publique se modifie de partout : n’importe quel bout de code peut écrire ' +
          '<code>$compte-&gt;solde = -500</code>. Avec un private et un setter, on ne peut passer que par une ' +
          'porte qui trie : c’est là qu’on refuse une valeur absurde.</p>')
      ].join('\n')
    },
    {
      title: 'Getters et setters qui valident',
      html: [
        '<p>Un <strong>getter</strong> (<code>getX()</code> ou <code>x()</code>) lit l’état ; un ' +
        '<strong>setter</strong> (<code>setX()</code>) l’écrit et en profite pour valider. Une valeur invalide ' +
        'déclenche une exception plutôt que de corrompre l’objet.</p>',
        '<pre><code>public function setSolde(float $solde): void {\n    if ($solde &lt; 0) {\n        throw new InvalidArgumentException("solde négatif");\n    }\n    $this-&gt;solde = $solde;\n}</code></pre>',
        '<p>Le setter peut aussi renvoyer <code>$this</code> pour permettre l’enchaînement ' +
        '(<code>$compte-&gt;setNom(...)-&gt;setSolde(...)</code>), une convention dite <em>interface fluide</em>.</p>'
      ].join('\n')
    },
    {
      title: 'Constantes de classe',
      html: [
        '<p>Une <strong>constante de classe</strong> <code>const</code> appartient à la classe, pas aux objets : ' +
        'elle est fixée à la déclaration et ne change jamais. On la lit avec <code>self::</code> à l’intérieur et ' +
        '<code>Classe::</code> à l’extérieur.</p>',
        '<pre><code>class Facture {\n    const TVA = 18.0;\n\n    public function ttc(float $ht): float {\n        return $ht * (1 + self::TVA / 100);\n    }\n}</code></pre>',
        box('pitfall', 'Piège — un $ de trop', 'warning',
          '    <p>Une constante s’écrit <code>const TVA = 18;</code> et se lit <code>self::TVA</code> : pas de ' +
          '<code>$</code>, ni à la déclaration, ni à l’usage. Y ajouter un <code>$</code> transforme la ' +
          'constante en propriété.</p>')
      ].join('\n')
    },
    {
      title: 'Membres statiques',
      html: [
        '<p>Un membre <code>static</code> appartient à la classe elle-même, non à un objet : il est partagé par ' +
        'toutes les instances. Utile pour un compteur d’objets ou une méthode outil qui n’a pas besoin d’état.</p>',
        '<pre><code>class Utilisateur {\n    private static $nombre = 0;\n\n    public function __construct() {\n        self::$nombre++;\n    }\n\n    public static function nombre(): int {\n        return self::$nombre;\n    }\n}</code></pre>',
        '<p>On appelle une méthode statique sans instance : <code>Utilisateur::nombre()</code>. À l’intérieur, ' +
        '<code>$this</code> n’existe pas — on parle de la classe avec <code>self</code>.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle visibilité réserve un membre à la classe ?', opts: ['public', 'private', 'static'], correct: 1, exp: 'private limite l’accès au code de la classe.' },
    { stem: 'Une propriété publique se modifie…', opts: ['nulle part', 'depuis n’importe où', 'seulement en lecture'], correct: 1, exp: 'public ouvre l’accès à tout code disposant de l’objet.' },
    { stem: 'À quoi sert un setter ?', opts: ['Lire l’état', 'Écrire l’état en validant', 'Supprimer l’objet'], correct: 1, exp: 'Le setter contrôle la valeur avant de l’affecter.' },
    { stem: 'Comment lit-on une constante à l’intérieur de la classe ?', opts: ['self::TVA', '$this->TVA', 'self->TVA'], correct: 0, exp: 'self::TVA atteint la constante de classe.' },
    { stem: 'Une constante s’écrit…', opts: ['const $TVA = 18', 'const TVA = 18', 'static $TVA'], correct: 1, exp: 'Pas de $ pour une constante : const TVA = 18.' },
    { stem: 'Un membre static appartient…', opts: ['à chaque objet', 'à la classe', 'au constructeur'], correct: 1, exp: 'static est partagé par la classe et toutes ses instances.' },
    { stem: 'Que vaut $this dans une méthode statique ?', opts: ['L’objet', 'Rien, $this n’existe pas', 'La classe'], correct: 1, exp: 'Une méthode statique n’a pas d’instance : on utilise self.' },
    { stem: 'Que fait `return $this` dans un setter ?', opts: ['Rien', 'Il permet l’enchaînement des appels', 'Il crée un objet'], correct: 1, exp: 'Renvoyer $this autorise $obj->a()->b(), une interface fluide.' }
  ],

  pitfalls: [
    'Laisser une propriété <code>public</code> alors qu’elle devrait être contrôlée.',
    'Écrire <code>self-&gt;$MACHIN</code> (flèche) au lieu de <code>self::$MACHIN</code> (double deux-points).',
    'Mettre un <code>$</code> devant le nom d’une constante.',
    'Oublier que <code>$this</code> est indisponible dans une méthode statique.',
    'Valider après avoir affecté au lieu de valider avant.'
  ],

  methodTitle: 'Protéger l’état d’un objet',
  method: [
    '<strong>Fermer</strong> : passer toutes les propriétés en private.',
    '<strong>Ouvrir un getter</strong> par propriété réellement utile à l’extérieur.',
    '<strong>Contrôler</strong> chaque écriture dans un setter, avec une exception si besoin.',
    '<strong>Constanteniser</strong> les valeurs fixes (taux, limites) avec const.',
    '<strong>Choisir static</strong> seulement pour un état partagé ou un outil sans instance.'
  ],

  summary: [
    'public, private, protected décident qui accède à un membre.',
    'L’encapsulation = propriétés privées + méthodes publiques de contrôle.',
    'Les setters valident avant d’affecter ; un setter peut renvoyer $this pour l’enchaînement.',
    'const fixe une valeur de classe, lue avec self::TVA (aucun $).',
    'static partage un membre entre toutes les instances ; $this y est indisponible.'
  ],

  checklist: [
    'Je sais justifier la visibilité de chaque membre.',
    'J’écris un setter qui refuse une valeur invalide.',
    'Je lis une constante avec self:: sans y mettre de $.',
    'J’utilise static et self là où $this n’a pas de sens.'
  ],

  notions: ['encapsulation', 'public', 'private', 'protected', 'getter', 'setter', 'validation', 'const', 'self::', 'static', 'interface fluide'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends la visibilité : public, private, protected.' },
    { cls: 'mid', text: '50–69 % — Réécris un getter et un setter qui valide.' },
    { cls: 'good', text: '70–89 % — Solide : tu distingues const, static et propriété.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe à l’héritage et aux interfaces, chapitre 3.' }
  ],

  flashcards: [
    { q: 'Que recouvre l’encapsulation ?', a: 'Propriétés privées et méthodes publiques qui contrôlent l’accès.' },
    { q: 'Rôle d’un setter ?', a: 'Écrire l’état en validant la valeur avant de l’affecter.' },
    { q: 'Comment déclare-t-on une constante ?', a: 'const TVA = 18; puis self::TVA, sans le $.' },
    { q: 'Quand utiliser static ?', a: 'Pour un membre partagé par la classe ou un outil sans instance.' },
    { q: 'Pourquoi return $this dans un setter ?', a: 'Pour permettre l’enchaînement : $obj->a()->b().' },
    { q: 'protected ouvre l’accès à qui ?', a: 'À la classe et à ses classes filles, mais pas à l’extérieur.' }
  ]
};
