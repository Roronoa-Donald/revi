/**
 * Chapitre 4 du cours « PHP POO » B2 — traits, namespaces et autoloading.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Traits, namespaces et chargement des classes',
  short: 'Traits et namespaces',
  toc: 'Réutiliser des méthodes avec un trait, organiser le code en namespaces, importer et charger les classes.',
  time: '≈ 2 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Deux classes sans lien de parenté ont besoin de la même méthode : l’héritage ne convient pas. Et quand un ' +
    'projet grossit, deux développeurs finissent par nommer une classe <code>Utilisateur</code> — impossible de ' +
    'les distinguer. Traits et namespaces répondent à ces deux problèmes d’organisation.',

  objectives: [
    'factoriser des méthodes réutilisables dans un trait ;',
    'résoudre un conflit de méthodes entre deux traits ;',
    'déclarer et utiliser des namespaces ;',
    'importer une classe avec use et comprendre l’autoloading.'
  ],

  sections: [
    {
      title: 'Les traits : réutiliser sans hériter',
      html: [
        '<p>Un <strong>trait</strong> est un paquet de méthodes qu’une classe peut importer avec <code>use</code>. ' +
        'Ce n’est ni une classe ni une interface : il ne s’instancie pas, mais son code devient celui de la classe ' +
        'qui l’utilise.</p>',
        '<pre><code>trait Salutation {\n    public function saluer(string $nom): string {\n        return "Bonjour " . $nom;\n    }\n}\n\nclass Accueil {\n    use Salutation;\n}</code></pre>',
        '<p>Ici <code>Accueil</code> possède <code>saluer()</code> comme si elle l’avait écrite elle-même. Le trait ' +
        'évite de dupliquer du code entre des classes qui n’ont aucun lien de parenté.</p>'
      ].join('\n')
    },
    {
      title: 'Résoudre un conflit de traits',
      html: [
        '<p>Si deux traits apportent la même méthode, <code>use</code> refuse de choisir et PHP lève une erreur ' +
        'fatale. On lève l’ambiguïté avec <code>insteadof</code> pour désigner celui qui gagne, et <code>as</code> ' +
        'pour renommer l’autre.</p>',
        '<pre><code>class Service {\n    use A, B {\n        A::demarrer insteadof B;\n        B::demarrer as demarrerB;\n    }\n}</code></pre>',
        box('pitfall', 'Piège — le silence du conflit', 'warning',
          '    <p>Un conflit de méthodes entre deux traits n’est pas une commodité : c’est une erreur. Il faut le ' +
          'dire explicitement, sinon la classe ne compile pas. C’est une protection : PHP refuse de décider à ' +
          'notre place quand le choix a un sens.</p>')
      ].join('\n')
    },
    {
      title: 'Les namespaces',
      html: [
        '<p>Un <strong>namespace</strong> est un espace de noms : il préfixe les classes pour éviter les collisions. ' +
        'La déclaration <code>namespace App;</code> se place tout en haut du fichier, juste après ' +
        '<code>&lt;?php</code>.</p>',
        '<pre><code>&lt;?php\nnamespace App;\n\nclass Utilisateur {\n    // App\\Utilisateur, distinct d’un autre Utilisateur\n}</code></pre>',
        '<p>Sans namespace, deux bibliothèques définissant <code>Utilisateur</code> entreraient en conflit. Avec, les ' +
        'noms complets <code>App\\Utilisateur</code> et <code>Auth\\Utilisateur</code> coexistent.</p>'
      ].join('\n')
    },
    {
      title: 'Importer et charger les classes',
      html: [
        '<p>Pour ne pas écrire le chemin complet à chaque fois, on importe la classe avec <code>use</code>. On peut ' +
        'la renommer avec <code>as</code>. À l’échelle d’un projet, on ne fait plus <code>require</code> à la main : ' +
        'un <strong>autoloader</strong> (<code>spl_autoload_register</code>, ou Composer) charge la classe au ' +
        'moment où on en a besoin.</p>',
        '<pre><code>&lt;?php\nnamespace App;\n\nuse Core\\Calcul as Calc;\n\n$c = new Calc();   // Core\\Calcul</code></pre>',
        box('tech', 'Le chargeur automatique', 'bolt',
          '    <p>On enregistre une fonction auprès de <code>spl_autoload_register()</code>. Quand PHP rencontre une ' +
          'classe inconnue, il appelle cette fonction avec son nom : à elle de retrouver le fichier et de le ' +
          '<code>require</code>. C’est exactement ce que fait Composer en mappant les namespaces aux dossiers.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qu’est-ce qu’un trait ?', opts: ['Une classe abstraite', 'Un paquet de méthodes réutilisables', 'Une interface'], correct: 1, exp: 'Un trait fournit des méthodes qu’on importer avec use dans une classe.' },
    { stem: 'Comment importer un trait dans une classe ?', opts: ['extends Trait', 'implements Trait', 'use Trait;'], correct: 2, exp: 'À l’intérieur de la classe : use NomDuTrait;.' },
    { stem: 'Que fait insteadof ?', opts: ['Il renomme une méthode', 'Il choisit la méthode qui gagne en cas de conflit', 'Il supprime un trait'], correct: 1, exp: 'insteadof désigne le trait dont la méthode l’emporte.' },
    { stem: 'À quoi sert un namespace ?', opts: ['À accélérer le code', 'À éviter les collisions de noms', 'À hériter'], correct: 1, exp: 'Le namespace préfixe les classes pour les distinguer.' },
    { stem: 'Où se place la déclaration namespace ?', opts: ['En fin de fichier', 'En haut, après <?php', 'Dans le constructeur'], correct: 1, exp: 'Tout en haut du fichier, avant tout autre code.' },
    { stem: 'Que fait use App\\Utilisateur as U; ?', opts: ['Importe et renomme la classe en U', 'Crée une classe U', 'Supprime Utilisateur'], correct: 0, exp: 'use importe la classe sous l’alias U.' },
    { stem: 'À quoi sert spl_autoload_register ?', opts: ['À charger une classe à la demande', 'À créer un namespace', 'À hériter'], correct: 0, exp: 'PHP appelle l’autoloader quand il rencontre une classe non encore chargée.' },
    { stem: 'Deux traits définissent la méthode demarrer. Que fait PHP ?', opts: ['Il en choisit une', 'Il lève une erreur fatale', 'Il fusionne'], correct: 1, exp: 'Le conflit doit être levé explicitement avec insteadof / as.' }
  ],

  pitfalls: [
    'Confondre trait et interface : le trait contient du code, l’interface seulement des signatures.',
    'Laisser un conflit de traits sans <code>insteadof</code> ni <code>as</code>.',
    'Placer <code>namespace</code> après du code ou après un affichage.',
    'Écrire le nom complet <code>Core\\Calcul</code> partout au lieu d’importer une fois.',
    'Oublier que le namespace fait partie du nom complet de la classe.'
  ],

  methodTitle: 'Organiser un projet PHP',
  method: [
    '<strong>Regrouper</strong> en trait les méthodes partagées hors héritage.',
    '<strong>Lever</strong> les conflits avec insteadof, renommer avec as.',
    '<strong>Préfixer</strong> chaque domaine par un namespace (App, Core, Auth…).',
    '<strong>Importer</strong> une seule fois en haut avec use … as.',
    '<strong>Automatiser</strong> le chargement (autoloader ou Composer) plutôt que des require à la main.'
  ],

  summary: [
    'Un trait est un paquet de méthodes importé par use à l’intérieur d’une classe.',
    'insteadof tranche un conflit de méthodes ; as renomme.',
    'Un namespace préfixe les classes et évite les collisions de noms.',
    'use importe une classe, éventuellement sous un alias (as).',
    'Un autoloader charge une classe au moment où on l’utilise.'
  ],

  checklist: [
    'Je déclare un trait et je l’utilise dans une classe.',
    'Je résous un conflit de traits avec insteadof/as.',
    'Je place et nomme mes classes dans un namespace.',
    'J’importe une classe avec use et j’explique l’autoloading.'
  ],

  notions: ['trait', 'use', 'insteadof', 'as', 'namespace', 'nom complet', 'import', 'autoload', 'spl_autoload_register', 'Composer'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends la différence entre trait, classe et interface.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à déclarer un namespace et à importer une classe.' },
    { cls: 'good', text: '70–89 % — Solide : tu résous un conflit de traits sans hésiter.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux exceptions, chapitre 5.' }
  ],

  flashcards: [
    { q: 'Différence entre trait et interface ?', a: 'Le trait contient du code réutilisable ; l’interface n’est qu’un contrat de signatures.' },
    { q: 'Comment importer un trait ?', a: 'Avec use NomDuTrait; à l’intérieur de la classe.' },
    { q: 'Role de insteadof ?', a: 'Choisir quelle méthode de trait l’emporte dans un conflit.' },
    { q: 'À quoi sert un namespace ?', a: 'À préfixer les classes et éviter les collisions de noms.' },
    { q: 'Où déclare-t-on un namespace ?', a: 'Tout en haut du fichier, juste après <?php.' },
    { q: 'Qu’est-ce qu’un autoloader ?', a: 'Une fonction qui charge une classe au moment où PHP en a besoin.' }
  ]
};
