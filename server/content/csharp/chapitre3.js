/**
 * Chapitre 3 du cours « C# » B2 — Héritage, Polymorphisme & Interfaces.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Héritage, Polymorphisme &amp; Interfaces',
  short: 'Héritage &amp; Contrats',
  toc: 'Héritage de classes, polymorphisme dynamique (virtual, override), table des méthodes virtuelles, masquage statique (new), classes abstraites, interfaces multiples et implémentation explicite d’interface.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une suite logicielle d’édition graphique souffre de régressions majeures lors de l’ajout de nouveaux formats d’exportation. ' +
    'Des méthodes spécialisées écrasent silencieusement le comportement parent à cause d’une confusion entre "override" et "new", ' +
    'tandis que des conflits de noms de méthodes entre interfaces multiples paralysent l’intégration de modules tiers. ' +
    'L’équipe doit restructurer son modèle orienté objet : ' +
    'clarifier la répartition entre héritage d’implémentation et contrats d’interfaces, ' +
    'maîtriser le dispatch dynamique via la table des méthodes virtuelles (vtable), ' +
    'résoudre les collisions grâce à l’implémentation explicite d’interface et appliquer le patron Template Method sur des classes abstraites. ' +
    'Ce chapitre approfondit les mécanismes avancés du polymorphisme en C#.',

  objectives: [
    'maîtriser la dérivation de classes avec le mot-clé base pour appeler les constructeurs et méthodes parents ;',
    'distinguer rigoureusement le polymorphisme dynamique (virtual/override) du masquage de membre statique (new) ;',
    'concevoir des classes abstraites (abstract) imposant des contrats d’implémentation avec le patron Template Method ;',
    'déclarer et implémenter des interfaces pour découpler les modules applicatifs (Inversion de Dépendance) ;',
    'résoudre les collisions d’homonymie de méthodes d’interfaces multiples via l’implémentation explicite.'
  ],

  sections: [
    {
      title: 'Polymorphisme Dynamique (virtual / override) vs Masquage (new)',
      html: [
        '<p>En C#, le polymorphisme n’est pas activé par défaut comme en Java : une méthode est <strong>non virtuelle</strong> sauf mention explicite du mot-clé <code>virtual</code>. Cette distinction change radicalement la façon dont la CLR résout les appels :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">1. Polymorphisme dynamique (override)</h4>',
        '    <p>La classe parente déclare <code>virtual</code> et la classe dérivée déclare <code>override</code>. La CLR met à jour la <strong>table des méthodes virtuelles (vtable)</strong>. L’appel résout dynamiquement vers la classe dérivée, <em>même si la référence est typée avec la classe de base</em>.</p>',
        '    <pre><code class="language-csharp">class Base {\n    public virtual void Saluer() =&gt; Console.WriteLine("Base");\n}\nclass Deriv : Base {\n    public override void Saluer() =&gt; Console.WriteLine("Deriv");\n}\nBase b = new Deriv();\nb.Saluer(); // Affiche "Deriv" (dispatch dynamique)</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. Masquage statique (new)</h4>',
        '    <p>La classe dérivée utilise le mot-clé <code>new</code> pour masquer une méthode parente. La vtable n’est <strong>pas</strong> modifiée : l’appel est résolu statiquement à la compilation selon le <em>type déclaré de la variable</em>.</p>',
        '    <pre><code class="language-csharp">class Base {\n    public void Info() =&gt; Console.WriteLine("Base");\n}\nclass Deriv : Base {\n    public new void Info() =&gt; Console.WriteLine("Deriv");\n}\nBase b = new Deriv();\nb.Info(); // Affiche "Base" ! (liaison statique précoce)</code></pre>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Classes Abstraites &amp; Patron Template Method',
      html: [
        '<p>Une <strong>classe abstraite</strong> (<code>abstract class</code>) ne peut pas être instanciée directement. Elle sert de modèle architectural en combinant des méthodes concrètes communes et des méthodes abstraites obligatoires :</p>',

        '<pre><code class="language-csharp">public abstract class GenerateurRapport {\n' +
        '    // Template Method : squelette immuable de l\'algorithme\n' +
        '    public void Generer() {\n' +
        '        Console.WriteLine("[1] Connexion à la base...");\n' +
        '        ChargerDonnees(); // Appel abstrait spécialisé\n' +
        '        Formater();       // Appel abstrait spécialisé\n' +
        '        Console.WriteLine("[4] Rapport archivé avec succès.");\n' +
        '    }\n\n' +
        '    protected abstract void ChargerDonnees();\n' +
        '    protected abstract void Formater();\n' +
        '}\n\n' +
        'public class RapportPdf : GenerateurRapport {\n' +
        '    protected override void ChargerDonnees() =&gt; Console.WriteLine("[2] Chargement SQL...");\n' +
        '    protected override void Formater() =&gt; Console.WriteLine("[3] Compilation du flux PDF...");\n' +
        '}</code></pre>',

        box('standard', 'Avantage architectural du patron Template Method', [
          '<p>Le patron Template Method garantit l’ordonnancement strict des étapes d’un processus métier tout en déléguant les variantes d’implémentation aux sous-classes, prévenant les omissions critiques (ex: oublier de clore une transaction ou d’archiver un fichier).</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Interfaces Multiples &amp; Implémentation Explicite',
      html: [
        '<p>Contrairement à l’héritage de classes qui est strictement simple en C#, une classe peut implémenter <strong>un nombre illimité d’interfaces</strong>. Lorsqu’un conflit de noms survient entre deux interfaces, C# propose l’<strong>implémentation explicite d’interface</strong> :</p>',

        '<pre><code class="language-csharp">public interface IExportable {\n' +
        '    void Traiter();\n' +
        '}\n' +
        'public interface IAuditable {\n' +
        '    void Traiter();\n' +
        '}\n\n' +
        'public class Document : IExportable, IAuditable {\n' +
        '    // Implémentation explicite : sans modificateur public !\n' +
        '    void IExportable.Traiter() =&gt; Console.WriteLine("Export JSON du document.");\n' +
        '    void IAuditable.Traiter()   =&gt; Console.WriteLine("Audit de conformité inscrit.");\n' +
        '}\n\n' +
        'var doc = new Document();\n' +
        '// doc.Traiter(); // ERREUR CS1061 : méthode inaccessible directement !\n' +
        '((IExportable)doc).Traiter(); // Affiche "Export JSON..."\n' +
        '((IAuditable)doc).Traiter();  // Affiche "Audit de conformité..."</code></pre>',

        '<p>Cette séparation étanche offre deux bénéfices majeurs :</p>',
        '<ul>',
        '  <li>Élimination totale des ambiguïtés lors de la coexistence de contrats fonctionnels homonymes ;</li>',
        '  <li>Protection de l’API publique de la classe en ne polluant pas l’autocomplétion (IntelliSense) avec des méthodes purement techniques d’interfaces spécialisées.</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  pitfalls: [
    'Oublier le mot-clé virtual sur une méthode de la classe de base, rendant impossible son polymorphisme avec override (avertissement ou masquage new involontaire).',
    'Utiliser le mot-clé new en pensant surcharger une méthode : l’appel via une variable du type de la classe de base exécutera toujours la méthode parente.',
    'Mettre le modificateur public sur une méthode implémentant explicitement une interface (erreur de compilation CS0106 : les méthodes explicites ne tolèrent aucun modificateur d’accès).',
    'Instancier directement une classe abstraite avec new (erreur de compilation CS0144).'
  ],

  questions: [
    {
      stem: 'Soit Base b = new Deriv(); où Deriv redéfinit une méthode Afficher() présente dans Base. Quelle condition doit être remplie pour que Deriv.Afficher soit appelée ?',
      opts: [
        'Base doit marquer Afficher comme static et Deriv comme abstract.',
        'Base doit marquer Afficher comme virtual et Deriv comme override.',
        'Deriv doit marquer Afficher avec le mot-clé new.',
        'La méthode doit être déclarée sans aucun mot-clé spécifique.'
      ],
      correct: 1,
      exp: 'Pour obtenir un dispatch dynamique (polymorphisme réel à l’exécution), la méthode doit être déclarée virtual dans la classe de base et override dans la classe dérivée.'
    },
    {
      stem: 'Quel est le résultat d’un appel b.Identifier() si b est de type Base mais référence une instance de Deriv qui utilise "new void Identifier()" ?',
      opts: [
        'L’exécution lève une InvalidCastException.',
        'La méthode Deriv.Identifier() est appelée.',
        'La méthode Base.Identifier() est appelée car le masquage new applique une liaison statique précoce.',
        'Le compilateur refuse le code en générant une erreur d’ambiguïté.'
      ],
      correct: 2,
      exp: 'Le mot-clé new masque le membre sans mettre à jour la table des méthodes virtuelles (vtable). L’appel via une référence du type Base résout statiquement vers Base.Identifier().'
    },
    {
      stem: 'Pourquoi une méthode implémentant explicitement une interface (ex: void ILogger.Log()) ne peut-elle pas comporter le mot-clé public ?',
      opts: [
        'Parce qu’elle est réservée aux classes internes privées.',
        'Parce qu’elle n’appartient pas à l’interface publique de la classe ; elle n’est accessible que via un cast vers l’interface correspondante.',
        'Parce que le Garbage Collector interdit les méthodes publiques d’interface.',
        'Parce qu’elle doit obligatoirement être statique.'
      ],
      correct: 1,
      exp: 'Les membres d’implémentation explicite d’interface ne font pas partie de la surface d’API publique directe de la classe et ne peuvent être consommés qu’en référençant explicitement l’interface.'
    },
    {
      stem: 'Quel principe de conception logicielle est appliqué lorsqu’on programme contre une interface plutôt qu’une classe concrète ?',
      opts: [
        'Le principe d’inversion des dépendances (Dependency Inversion Principle - DIP).',
        'Le principe d’allocation exclusive sur la pile.',
        'Le principe de sérialisation binaire synchrone.',
        'Le principe de masquage statique de méthode.'
      ],
      correct: 0,
      exp: 'Le principe d’inversion des dépendances (le D de SOLID) préconise que les modules de haut niveau dépendent d’abstractions (interfaces) et non d’implémentations concrètes.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre override et new en C# ?',
      a: 'override modifie la vtable pour une résolution dynamique à l’exécution, tandis que new masque la méthode avec une liaison statique basée sur le type de la référence à la compilation.'
    },
    {
      q: 'Qu’est-ce qu’une classe abstraite (abstract class) ?',
      a: 'Une classe non instanciable servant de modèle de base, pouvant contenir des méthodes concrètes et des méthodes abstraites obligatoirement implémentées par ses sous-classes.'
    },
    {
      q: 'Comment consommer une méthode d’interface implémentée explicitement ?',
      a: 'Il faut obligatoirement convertir (caster) la référence de l’objet vers l’interface cible : ((IInterface)objet).Methode().'
    },
    {
      q: 'En quoi consiste le patron de conception Template Method ?',
      a: 'Il définit le squelette invariant d’un algorithme dans une classe abstraite et délègue certaines étapes spécifiques à des méthodes abstraites redéfinies par les classes dérivées.'
    }
  ],

  methodTitle: 'Protocole en 4 étapes pour bâtir une hiérarchie polymorphique C#',
  method: [
    'Déterminer si la relation relève d’un héritage d’implémentation (est un) ou d’un contrat (implémente).',
    'Marquer virtual les méthodes de base destinées à être redéfinies et override dans les classes dérivées.',
    'Ne jamais utiliser le mot-clé new par inadvertance pour tenter de surcharger une méthode.',
    'Isoler les méthodes homonymes d’interfaces multiples grâce à l’implémentation explicite d’interface sans mot-clé public.'
  ],

  summary: [
    'En C#, les méthodes sont non virtuelles par défaut ; virtual et override activent le dispatch dynamique via la vtable.',
    'Le mot-clé new masque un membre parent par liaison statique précoce sans altérer la vtable.',
    'Une classe abstraite ne peut être instanciée et structure des processus communs avec le patron Template Method.',
    'Une classe C# peut implémenter un nombre arbitraire d’interfaces, découplant le code selon le principe DIP.',
    'L’implémentation explicite d’interface résout les collisions de noms et s’invoque obligatoirement par cast.'
  ],

  checklist: [
    'Je comprends la différence fondamentale entre virtual/override et new.',
    'Je sais quand créer une classe abstraite plutôt qu’une interface.',
    'Je sais implémenter le patron de conception Template Method.',
    'Je maîtrise l’implémentation explicite d’interface pour résoudre les collisions.',
    'Je sais invoquer une méthode d’interface explicite via un cast approprié.'
  ],

  notions: [
    'Polymorphisme dynamique (virtual et override)',
    'Table des méthodes virtuelles (vtable dispatch)',
    'Masquage statique de membre avec le mot-clé new',
    'Classes et méthodes abstraites (abstract)',
    'Patron de conception Template Method',
    'Contrats d’interface et Inversion de Dépendance (DIP)',
    'Implémentation explicite d’interface',
    'Résolution de collisions d’homonymie entre interfaces'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la différence entre virtual/override et masquage new.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les classes abstraites et le patron Template Method.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les interfaces multiples et l’implémentation explicite.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise totale : passe aux collections génériques et à la gestion des exceptions au module 4.' }
  ]
};
