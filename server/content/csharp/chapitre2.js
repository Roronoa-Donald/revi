/**
 * Chapitre 2 du cours « C# » B2 — Encapsulation & POO Moderne en C#.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Encapsulation &amp; Programmation Orientée Objet Moderne en C#',
  short: 'POO Moderne &amp; Records',
  toc: 'Encapsulation stricte, propriétés auto-implémentées avec validation get/set, accesseurs init-only, constructeurs surchargés et chaînage : this(), constructeurs primaires, records immuables et expression with.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une plateforme de commerce électronique souffre d’incohérences de données critiques en production : ' +
    'des soldes de clients deviennent négatifs suite à des accès directs aux champs de classe, ' +
    'et des objets partagés entre plusieurs threads sont mutés de façon imprévisible, corrompant les paniers d’achat. ' +
    'L’architecte logiciel exige une refactorisation immédiate vers les standards modernes de C# : ' +
    'encapsulation hermétique via des propriétés auto-implémentées validées, utilisation d’accesseurs init-only, ' +
    'harmonisation des constructeurs avec chaînage explicite, et adoption de records immuables manipulés par mutabilité non destructive (with). ' +
    'Ce module détaille la conception orientée objet robuste selon les idiomes .NET contemporains.',

  objectives: [
    'concevoir des classes hermétiques respectant le principe d’encapsulation avec champs privés et accesseurs de propriété ;',
    'exploiter les propriétés auto-implémentées avec accesseurs différenciés (get public, set ou init privé) ;',
    'chaîner les constructeurs surchargés via l’initialiseur : this() pour éliminer la duplication de code d’initialisation ;',
    'comprendre les constructeurs primaires introduits dans les versions modernes de C# ;',
    'maîtriser les records C#, l’égalité structurelle par valeur et le clonage non destructif avec l’expression with.'
  ],

  sections: [
    {
      title: 'Encapsulation &amp; Propriétés C# Auto-implémentées',
      html: [
        '<p>L’<strong>encapsulation</strong> est le pilier fondamental de la POO qui consiste à masquer l’état interne d’un objet et à n’exposer que des interfaces de contrôle strictes. En C#, on ne déclare jamais de champs publics (<em>fields</em>) : on expose des <strong>propriétés</strong> (<em>properties</em>).</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Propriété classique avec champ de soutien (Backing Field)</h4>',
        '    <pre><code class="language-csharp">public class Compte {\n' +
        '    private decimal _solde;\n' +
        '    public decimal Solde {\n' +
        '        get =&gt; _solde;\n' +
        '        set {\n' +
        '            if (value &lt; 0) throw new ArgumentOutOfRangeException("Solde négatif refusé");\n' +
        '            _solde = value;\n' +
        '        }\n' +
        '    }\n' +
        '}</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Propriété auto-implémentée moderne</h4>',
        '    <pre><code class="language-csharp">public class Utilisateur {\n' +
        '    // Le compilateur génère le champ privé en coulisses\n' +
        '    public string Id { get; init; }\n' +
        '    public string Nom { get; set; }\n' +
        '    public decimal Score { get; private set; } = 100m;\n' +
        '}</code></pre>',
        '  </div>',
        '</div>',

        box('standard', 'L’accesseur init (C# 9+)', [
          '<p>L’accesseur <code>init</code> autorise la modification de la propriété <strong>uniquement lors de l’instanciation</strong> de l’objet ' +
          '(dans le constructeur ou via un initialiseur d’objet <code>new Utilisateur { Id = "U1" }</code>). ' +
          'Une fois l’objet créé, la propriété devient strictement en lecture seule, garantissant une immuabilité absolue sans boilerplate.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Constructeurs, Chaînage : this() &amp; Constructeurs Primaires',
      html: [
        '<p>Lorsqu’une classe offre plusieurs constructeurs pour s’adapter à différents scénarios d’initialisation, la duplication de logique doit être évitée en déléguant au constructeur le plus complet grâce à l’instruction <code>: this(...)</code> :</p>',

        '<pre><code class="language-csharp">public class Produit {\n' +
        '    public string Reference { get; }\n' +
        '    public string Libelle { get; }\n' +
        '    public decimal Prix { get; }\n\n' +
        '    // Constructeur 1 : référence seule\n' +
        '    public Produit(string reference) : this(reference, "Non renseigné", 0.0m) {}\n\n' +
        '    // Constructeur 2 : référence et libellé\n' +
        '    public Produit(string reference, string libelle) : this(reference, libelle, 0.0m) {}\n\n' +
        '    // Constructeur principal : logique d’assignation unique\n' +
        '    public Produit(string reference, string libelle, decimal prix) {\n' +
        '        Reference = reference ?? throw new ArgumentNullException(nameof(reference));\n' +
        '        Libelle = libelle;\n' +
        '        Prix = prix;\n' +
        '    }\n' +
        '}</code></pre>',

        '<p>Depuis C# 12, les <strong>constructeurs primaires</strong> (<em>Primary Constructors</em>) permettent de déclarer les paramètres d’initialisation directement sur la ligne de déclaration de la classe :</p>',
        '<pre><code class="language-csharp">public class ServiceClient(string apiUrl, int timeoutSecondes = 30) {\n' +
        '    public void Appeler() =&gt; Console.WriteLine($"Appel {apiUrl} avec timeout {timeoutSecondes}s");\n' +
        '}</code></pre>'
      ].join('\n')
    },
    {
      title: 'Records C# &amp; Mutabilité Non Destructive (with)',
      html: [
        '<p>Introduits en C# 9, les <strong>records</strong> (<code>record class</code> ou <code>record struct</code>) sont des types conçus spécifiquement pour encapsuler des données immuables. Ils se distinguent des classes classiques par deux caractéristiques majeures :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Égalité structurelle par valeur</h4>',
        '    <p>Deux instances d’un record possédant les mêmes valeurs pour toutes leurs propriétés sont considérées comme <strong>égales</strong> (<code>Equals</code> et opérateur <code>==</code> renvoient true), même si elles occupent deux adresses mémoires distinctes sur le tas.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Clonage non destructif avec with</h4>',
        '    <p>L’expression <code>with</code> crée une copie superficielle (<em>shallow copy</em>) de l’instance tout en modifiant de façon ciblée une ou plusieurs propriétés spécifiées, préservant ainsi l’objet d’origine.</p>',
        '  </div>',
        '</div>',

        '<pre><code class="language-csharp">// Déclaration positionnelle ultra-concise\n' +
        'public record Commande(string Id, string Client, decimal Montant, string Statut);\n\n' +
        'var c1 = new Commande("CMD-01", "Alice", 120.0m, "EnAttente");\n' +
        '// Clonage non destructif : c1 reste inchangé, c2 reçoit le nouveau statut\n' +
        'var c2 = c1 with { Statut = "Expédiée" };\n\n' +
        'var c3 = new Commande("CMD-01", "Alice", 120.0m, "EnAttente");\n' +
        'Console.WriteLine(c1 == c3); // Affiche "True" (égalité par valeur native)</code></pre>'
      ].join('\n')
    }
  ],

  pitfalls: [
    'Exposer des champs publics directs (public string Nom;) au lieu de propriétés (public string Nom { get; set; }), empêchant tout contrôle futur sur les mutations.',
    'Tenter de modifier une propriété possédant un accesseur init après la fin du bloc d’initialisation (erreur de compilation CS8852).',
    'Créer des boucles infinies de chaînage de constructeurs (ctor A appelle ctor B qui rappelle ctor A).',
    'Confondre l’égalité de référence (classes standard où deux new donnent deux objets différents) et l’égalité de valeur des records C#.'
  ],

  questions: [
    {
      stem: 'Quel est l’effet de l’accesseur "init" sur une propriété C# ?',
      opts: [
        'La propriété ne peut être modifiée qu’au sein d’une méthode asynchrone.',
        'La propriété ne peut être assignée que lors de la construction ou dans un initialiseur d’objet ; elle devient ensuite immuable.',
        'La propriété est réinitialisée automatiquement à sa valeur par défaut à chaque accès.',
        'La propriété ne peut être lue que par les classes dérivées.'
      ],
      correct: 1,
      exp: 'L’accesseur init (C# 9) permet la mutation lors de la phase d’initialisation (constructeur ou syntaxes d’initialiseur new T { Prop = val }), puis verrouille la propriété en lecture seule.'
    },
    {
      stem: 'Comment appelle-t-on un constructeur frère au sein de la même classe en C# ?',
      opts: [
        'En utilisant super(...) au début du constructeur.',
        'En utilisant : this(...) immédiatement après la signature du constructeur.',
        'En appelant explicitement this.Constructeur(...) dans le corps de la méthode.',
        'En utilisant le mot-clé base(...) avec le préfixe self.'
      ],
      correct: 1,
      exp: 'En C#, le chaînage vers un autre constructeur de la même classe s’effectue via la clause d’initialisation : this(arguments) placée entre la signature et le corps du constructeur.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre deux instances de class et deux instances de record ayant des propriétés identiques ?',
      opts: [
        'Les classes ne supportent pas le Garbage Collector.',
        'Les instances de record sont égales via == (égalité structurelle par valeur), tandis que les classes comparent leurs références mémoire par défaut.',
        'Les records sont stockés exclusivement sur la pile d’exécution.',
        'Les classes ne peuvent pas contenir de méthodes d’instance.'
      ],
      correct: 1,
      exp: 'Les records C# implémentent automatiquement l’égalité structurelle basée sur la valeur de leurs propriétés, tandis que les classes ordinaires appliquent l’égalité de référence (identité mémoire).'
    },
    {
      stem: 'À quoi sert l’expression "with" appliquée sur un record C# ?',
      opts: [
        'À détruire le record pour libérer sa mémoire immédiatement.',
        'À créer une nouvelle copie du record en modifiant uniquement les propriétés spécifiées (mutabilité non destructive).',
        'À convertir le record en un dictionnaire JSON dynamique.',
        'À vérifier la présence d’une clé dans le record.'
      ],
      correct: 1,
      exp: 'L’expression with réalise un clonage non destructif : elle produit une nouvelle instance du record avec les mêmes valeurs que l’original, sauf pour les propriétés expressément réassignées dans le bloc with.'
    }
  ],

  flashcards: [
    {
      q: 'Pourquoi privilégie-t-on les propriétés aux champs publics en C# ?',
      a: 'Les propriétés préservent l’encapsulation en permettant d’ajouter des validations, de la journalisation ou de restreindre l’accès en écriture sans rompre le contrat d’interface publique.'
    },
    {
      q: 'Quel est l’intérêt du chaînage de constructeurs via : this() ?',
      a: 'Il centralise la logique de validation et d’assignation dans un unique constructeur principal, évitant ainsi la duplication de code entre surcharges.'
    },
    {
      q: 'Qu’est-ce que l’égalité structurelle dans un record C# ?',
      a: 'C’est le mécanisme selon lequel deux objets record sont considérés égaux si tous leurs champs et propriétés contiennent des valeurs identiques, indépendamment de leur adresse mémoire.'
    },
    {
      q: 'Que produit l’expression "var r2 = r1 with { Prix = 50 };" ?',
      a: 'Elle instancie un nouvel objet r2 identique à r1 mais avec la propriété Prix égale à 50, laissant r1 inchangé.'
    }
  ],

  methodTitle: 'Protocole en 4 étapes pour concevoir une classe ou un record C# robuste',
  method: [
    'Masquer totalement l’état interne de la classe en interdisant les champs publics.',
    'Définir des propriétés auto-implémentées avec les accesseurs les plus restreints possibles (private set ou init).',
    'Centraliser l’initialisation dans un constructeur principal et chaîner les surcharges via : this().',
    'Utiliser des records (record class ou record struct) pour les conteneurs de données immuables et le clonage avec with.'
  ],

  summary: [
    'L’encapsulation protège l’état interne des objets en exposant uniquement des propriétés contrôlées.',
    'L’accesseur init (C# 9+) verrouille la propriété en lecture seule immédiatement après l’instanciation.',
    'Le chaînage de constructeurs : this(...) élimine la duplication de code d’initialisation entre surcharges.',
    'Les constructeurs primaires (C# 12) simplifient la déclaration des dépendances directement sur la classe.',
    'Les records C# fournissent l’égalité structurelle par valeur native et le clonage non destructif via l’expression with.'
  ],

  checklist: [
    'Je n’expose aucun champ public direct dans mes classes C#.',
    'Je sais créer des propriétés auto-implémentées avec validation ou accesseur init.',
    'Je maîtrise le chaînage de constructeurs via : this().',
    'Je comprends l’égalité structurelle des records par rapport aux classes classiques.',
    'Je sais utiliser l’expression with pour dupliquer et modifier un record immuable.'
  ],

  notions: [
    'Encapsulation et masquage d’information',
    'Propriétés avec champ de soutien (Backing Field)',
    'Propriétés auto-implémentées (Auto-Properties)',
    'Accesseur d’initialisation init (C# 9+)',
    'Chaînage de constructeurs surchargés : this()',
    'Constructeurs primaires (Primary Constructors C# 12)',
    'Records C# et égalité structurelle par valeur',
    'Mutabilité non destructive avec l’expression with'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise l’encapsulation et les propriétés auto-implémentées.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le chaînage de constructeurs : this() et les accesseurs init.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les records C# et l’expression with.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe au polymorphisme dynamique et aux interfaces au module 3.' }
  ]
};
