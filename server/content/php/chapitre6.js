/**
 * Chapitre 6 du cours « PHP POO » B2 — PDO, architecture et projet ToDo List.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'PDO, dépôt de données et architecture',
  short: 'PDO et architecture',
  toc: 'Se connecter avec PDO, requêtes préparées contre l’injection, patron repository, projet ToDo List.',
  time: '≈ 3 h de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une application objet finit toujours par parler à une base de données. Le faire proprement, c’est séparer le ' +
    'code qui décrit les données (les objets) de celui qui les range (le dépôt), et ne jamais concaténer une entrée ' +
    'utilisateur dans une requête SQL. Ce dernier point sépare une application sûre d’une faille béante.',

  objectives: [
    'ouvrir une connexion PDO avec un DSN et le mode erreur par exception ;',
    'écrire une requête préparée et lier ses paramètres ;',
    'isoler l’accès aux données dans une classe de dépôt ;',
    'assembler un petit service (liste de tâches) en couches.'
  ],

  sections: [
    {
      title: 'Se connecter avec PDO',
      html: [
        '<p><strong>PDO</strong> (PHP Data Objects) est une couche d’accès unique pour MySQL, PostgreSQL, SQLite… ' +
        'On ouvre une connexion avec un <strong>DSN</strong> (Data Source Name) qui décrit le driver et la cible.</p>',
        '<pre><code>$pdo = new PDO("sqlite::memory:");\n' +
        '$pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);</code></pre>',
        '<p>Le mode <code>ERRMODE_EXCEPTION</code> est essentiel : sans lui, une requête qui échoue renvoie ' +
        'simplement <code>false</code> et l’erreur passe inaperçue. Avec, chaque incident lève une ' +
        '<code>PDOException</code> qu’on peut intercepter.</p>',
        box('tech', 'Le DSN, mode d’emploi', 'database',
          '    <p>Le DSN a la forme <code>driver:paramètres</code> — par exemple ' +
          '<code>mysql:host=localhost;dbname=app</code> ou <code>sqlite:ma-base.sqlite</code>. Le même code PHP ' +
          'fonctionne avec plusieurs bases en changeant seulement le DSN.</p>')
      ].join('\n')
    },
    {
      title: 'Requêtes préparées contre l’injection SQL',
      html: [
        '<p>Ne <strong>jamais</strong> concaténer une entrée dans le SQL : une apostrophe bien placée suffit à ' +
        'détourner la requête (<em>injection SQL</em>). Une <strong>requête préparée</strong> sépare le modèle SQL ' +
        'des valeurs, liées ensuite comme paramètres.</p>',
        '<pre><code>$stmt = $pdo-&gt;prepare("INSERT INTO contacts (nom) VALUES (:nom)");\n' +
        '$stmt-&gt;execute([":nom" =&gt; $nom]);</code></pre>',
        '<p>Le pilote traite la valeur <code>$nom</code> comme une donnée, jamais comme du SQL. C’est la protection ' +
        'de référence, et ce n’est pas plus compliqué à écrire.</p>',
        box('pitfall', 'Piège — l’injection par concaténation', 'warning',
          '    <p><code>"SELECT * FROM users WHERE nom = \'" . $nom . "\'"</code> est une porte ouverte : si ' +
          '<code>$nom</code> vaut <code>a\' OR \'1\'=\'1</code>, la condition devient toujours vraie. La requête ' +
          'préparée ferme cette porte.</p>')
      ].join('\n')
    },
    {
      title: 'Le patron dépôt (repository)',
      html: [
        '<p>Un <strong>dépôt</strong> est une classe dont le seul métier est l’accès aux données d’un type ' +
        'd’entité : ajouter, lister, compter, retrouver. Le reste de l’application parle au dépôt, pas à PDO.</p>',
        '<pre><code>class ContactDepot {\n    private $pdo;\n\n    public function __construct(PDO $pdo) {\n        $this-&gt;pdo = $pdo;\n    }\n\n    public function ajouter(string $nom): void {\n        $stmt = $this-&gt;pdo-&gt;prepare("INSERT INTO contacts (nom) VALUES (:nom)");\n        $stmt-&gt;execute([":nom" =&gt; $nom]);\n    }\n}</code></pre>',
        '<p>Avantage : le jour où la base change ou où l’on passe à des données en mémoire, seul le dépôt bouge. Le ' +
        'reste du code ne connaît pas PDO.</p>'
      ].join('\n')
    },
    {
      title: 'Architecture en couches et projet',
      html: [
        '<p>Une application se découpe en <strong>couches</strong> : les entités (les objets métier), le dépôt (les ' +
        'données), le service (les règles) et l’affichage. Chaque couche ne connaît que la suivante. Le mini-projet ' +
        'ToDo List de ce chapitre assemble exactement cela : une entité tâche, une liste qui la gère, et un rendu ' +
        'numéroté.</p>',
        '<pre><code>class TodoList {\n    private $taches = [];\n\n    public function ajouter(string $tache): void {\n        $this-&gt;taches[] = $tache;\n    }\n\n    public function lister(): array {\n        return $this-&gt;taches;\n    }\n}</code></pre>',
        box('method', 'Cahier des charges du projet', 'blocks',
          '    <p>Le projet lit un nombre de tâches puis les tâches elles-mêmes, les range dans une liste et les ' +
          'affiche numérotées de 1 à n. Il exerce la lecture d’entrée, l’encapsulation d’un tableau dans une ' +
          'classe, et la mise en forme — les trois gestes d’une application en couches.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que signifie PDO ?', opts: ['PHP Data Objects', 'Private Data Output', 'PHP Direct Object'], correct: 0, exp: 'PDO est la couche d’accès aux bases de données de PHP.' },
    { stem: 'Qu’est-ce qu’un DSN ?', opts: ['Une requête', 'Un descripteur de connexion', 'Un mot de passe'], correct: 1, exp: 'Le DSN décrit le driver et la cible de la connexion.' },
    { stem: 'Pourquoi ERRORMODE_EXCEPTION ?', opts: ['Pour aller plus vite', 'Pour que les erreurs lèvent une exception', 'Pour se connecter'], correct: 1, exp: 'Sans ce mode, une requête échouée renvoie false en silence.' },
    { stem: 'Que protège une requête préparée ?', opts: ['La vitesse', 'De l’injection SQL', 'La mémoire'], correct: 1, exp: 'Elle sépare le SQL des valeurs, empêchant l’injection.' },
    { stem: 'Comment lie-t-on un paramètre nommé ?', opts: ['$stmt->execute([":nom" => $v])', 'echo $v', '$pdo->link($v)'], correct: 0, exp: 'On passe un tableau associatif à execute().' },
    { stem: 'À quoi sert un dépôt (repository) ?', opts: ['À afficher', 'À isoler l’accès aux données', 'À valider les formulaires'], correct: 1, exp: 'Il centralise les accès à la base pour un type d’entité.' },
    { stem: 'Que reçoit un dépôt à sa construction ?', opts: ['Un utilisateur', 'L’objet PDO', 'Une requête'], correct: 1, exp: 'On lui injecte la connexion PDO, qu’il utilise en interne.' },
    { stem: 'Combien de couches distingue-t-on ici ?', opts: ['Une', 'Entités, dépôt, service, affichage', 'Aucune'], correct: 1, exp: 'Chaque couche ne connaît que la suivante : entités, dépôt, service, affichage.' }
  ],

  pitfalls: [
    'Concaténer une entrée utilisateur dans une requête SQL (injection).',
    'Oublier <code>ERRMODE_EXCEPTION</code> et ignorer les échecs silencieux.',
    'Mélanger requêtes SQL et logique métier dans la même classe.',
    'Laisser PDO se propager dans tout le code au lieu de l’isoler dans un dépôt.',
    'Oublier d’échapper le nom d’un paramètre (<code>:nom</code>) dans <code>execute()</code>.'
  ],

  methodTitle: 'Construire une application en couches',
  method: [
    '<strong>Modéliser</strong> l’entité métier en premier (une classe, pas une table).',
    '<strong>Ouvrir</strong> une connexion PDO en mode exception, avec un DSN clair.',
    '<strong>Préparer</strong> chaque requête et lier les valeurs (jamais de concaténation).',
    '<strong>Enfermer</strong> les accès dans un dépôt qui expose des méthodes métier.',
    '<strong>Assembler</strong> le service et l’affichage, puis tester avec des cas limites.'
  ],

  summary: [
    'PDO connecte PHP à la base via un DSN ; le mode exception rend les erreurs visibles.',
    'Une requête préparée sépare le SQL des valeurs : c’est la protection contre l’injection.',
    'Un dépôt isole l’accès aux données d’une entité derrière des méthodes claires.',
    'Une application se découpe en couches : entités, dépôt, service, affichage.',
    'Le projet ToDo List assemble liste, ajout et rendu numéroté.'
  ],

  checklist: [
    'J’ouvre une connexion PDO avec un DSN et le mode exception.',
    'J’écris une requête préparée avec un paramètre nommé.',
    'Je sais pourquoi la concaténation SQL est dangereuse.',
    'J’organise mon code en couches autour d’un dépôt.'
  ],

  notions: ['PDO', 'DSN', 'ERRMODE_EXCEPTION', 'PDOException', 'requête préparée', 'paramètre nommé', 'injection SQL', 'dépôt', 'repository', 'couches', 'ToDo List'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez l’ouverture de connexion et la requête préparée.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous à écrire le dépôt d’une entité.' },
    { cls: 'good', text: '70–94 % — Solide : vous ne concatènez jamais d’entrée dans du SQL.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : le projet ToDo List est à votre portée, direction les examens blancs.' }
  ],

  flashcards: [
    { q: 'Que fait PDO ?', a: 'Il offre une couche d’accès unique aux bases (MySQL, PostgreSQL, SQLite…).' },
    { q: 'Qu’est-ce qu’un DSN ?', a: 'Le descripteur de connexion : driver plus paramètres (hôte, base).' },
    { q: 'Pourquoi une requête préparée ?', a: 'Pour séparer le SQL des valeurs et empêcher l’injection.' },
    { q: 'Comment exécuter une requête préparée ?', a: '$stmt->execute([":param" => $valeur]).' },
    { q: 'À quoi sert un dépôt ?', a: 'À isoler l’accès aux données d’une entité du reste du code.' },
    { q: 'Que veut dire « en couches » ?', a: 'Entités, dépôt, service, affichage : chaque couche ne connaît que la suivante.' }
  ]
};
