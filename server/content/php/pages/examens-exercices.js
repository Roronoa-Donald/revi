/**
 * Pages « examens blancs » et « exercices & projet » du cours « PHP POO » B2.
 */
'use strict';

const { ic, crumb, box, qcm, bands } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 — objets et héritage',
      intro: 'Sujet type examen — classes, encapsulation et hiérarchie.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Classe',
          text: 'Écrire la classe Compte avec une propriété privée solde, un constructeur qui l’initialise et une méthode solde() qui la renvoie. Pourquoi la propriété est-elle privée ?',
          sol: '<code>class Compte { private $solde; public function __construct(float $s) { $this-&gt;solde = $s; } public function solde(): float { return $this-&gt;solde; } }</code>.<br>Privée pour interdire une écriture directe depuis l’extérieur : l’état ne se modifie que par des méthodes contrôlées.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Setter',
          text: 'Ajouter setSolde() qui refuse un solde négatif. Quelle construction utiliser pour signaler le refus, et pourquoi ne pas simplement ne rien faire ?',
          sol: 'On lève une exception : <code>if ($s &lt; 0) throw new InvalidArgumentException("solde négatif");</code>.<br>Ne rien faire cacherait l’erreur : le setter n’applique pas la valeur et l’appelant doit le savoir.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Héritage',
          text: 'Écrire une classe fille ComptePro qui étend Compte, possède une propriété privee et son propre constructeur. Que doit faire ce constructeur ?',
          sol: '<code>class ComptePro extends Compte { private $plafond; public function __construct(float $s, float $p) { parent::__construct($s); $this-&gt;plafond = $p; } }</code>.<br>Il appelle <code>parent::__construct($s)</code> pour ne pas oublier l’initialisation héritée.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Abstrait',
          text: 'Soit une classe abstraite Forme avec la méthode abstraite aire(). Pourquoi ne peut-on pas écrire « new Forme() » ? Que doit faire une classe fille ?',
          sol: 'Une classe abstraite décrit un squelette, pas un objet complet : <code>new</code> est interdit.<br>Chaque fille <strong>doit</strong> implémenter <code>aire()</code>, sinon elle reste abstraite.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — namespaces, exceptions, PDO',
      intro: 'Sujet orienté organisation du code, erreurs et base de données.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Namespace',
          text: 'Déclarer deux classes Utilisateur sans collision de noms, puis en importer une sous l’alias U. Où se place la déclaration namespace ?',
          sol: 'Les placer dans des namespaces distincts : <code>namespace App;</code> et <code>namespace Auth;</code>, soit <code>App\\Utilisateur</code> et <code>Auth\\Utilisateur</code>.<br>Import : <code>use Auth\\Utilisateur as U;</code>. Le namespace se déclare tout en haut, juste après <code>&lt;?php</code>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Exception',
          text: 'Écrire une exception SoldeInsuffisant, la lancer depuis retirer(), et intercepter uniquement ce type. Quel est l’intérêt par rapport à catch (Exception $e) ?',
          sol: '<code>class SoldeInsuffisant extends Exception {}</code> ; on la lance et on fait <code>catch (SoldeInsuffisant $e)</code>.<br>Intercepter un type précis distingue un problème métier d’une erreur technique inattendue.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — PDO',
          text: 'Pourquoi ne jamais écrire "SELECT * FROM t WHERE nom = \'" . $nom . "\'" ? Réécrire cette requête correctement.',
          sol: 'La concaténation ouvre la porte à l’<strong>injection SQL</strong>.<br>Correct : <code>$stmt = $pdo-&gt;prepare("SELECT * FROM t WHERE nom = :nom"); $stmt-&gt;execute([":nom" =&gt; $nom]);</code>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Architecture',
          text: 'Quel est le rôle d’un dépôt (repository) ? Citer les quatre couches d’une application et l’ordre de leurs dépendances.',
          sol: 'Le dépôt isole l’accès aux données d’une entité derrière des méthodes claires.<br>Couches : <strong>entités → dépôt → service → affichage</strong> ; chaque couche ne connaît que la suivante.'
        }
      ]
    }
  ];

  const itemHtml = (item) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="item__num">' + item.num + '</span><span class="badge">' + item.badge + '</span></div>',
    '    <p>' + item.text + '</p>',
    '    <details><summary>Corrigé</summary><div class="sol">' + item.sol + '</div></details>',
    '  </div>'
  ].join('\n');

  const mastery = [
    { stem: 'Quel opérateur atteint un membre ?', opts: ['.', '->', '::'], correct: 1, exp: 'La flèche -> atteint une propriété ou une méthode d’un objet.' },
    { stem: 'Quelle visibilité réserve l’accès à la classe ?', opts: ['public', 'private', 'final'], correct: 1, exp: 'private limite l’accès au code de la classe.' },
    { stem: 'Comment appelle-t-on le constructeur parent ?', opts: ['self::__construct()', 'parent::__construct()', 'super()'], correct: 1, exp: 'parent::__construct() exécute l’initialisation héritée.' },
    { stem: 'Une interface contient…', opts: ['du code', 'des signatures', 'des propriétés'], correct: 1, exp: 'C’est un contrat de signatures, sans implémentation.' },
    { stem: 'À quoi sert un namespace ?', opts: ['À accélérer', 'À éviter les collisions de noms', 'À hériter'], correct: 1, exp: 'Il préfixe les classes pour les distinguer.' },
    { stem: 'Quand s’exécute finally ?', opts: ['Jamais', 'Dans tous les cas', 'Seulement en erreur'], correct: 1, exp: 'finally s’exécute après le try ou le catch, dans tous les cas.' },
    { stem: 'Que protège une requête préparée ?', opts: ['La vitesse', 'L’injection SQL', 'La mémoire'], correct: 1, exp: 'Elle sépare le SQL des valeurs, empêchant l’injection.' },
    { stem: 'Que fait static ?', opts: ['Rend un membre partagé par la classe', 'Copie l’objet', 'Interdit l’héritage'], correct: 0, exp: 'Un membre static appartient à la classe, pas aux instances.' },
    { stem: 'Que fait insteadof entre deux traits ?', opts: ['Il renomme', 'Il choisit la méthode qui gagne', 'Il supprime un trait'], correct: 1, exp: 'insteadof tranche un conflit de méthodes de traits.' },
    { stem: 'Comment lire une constante de classe ?', opts: ['$this->TVA', 'self::TVA', 'self->TVA'], correct: 1, exp: 'self::TVA, sans le $, à l’intérieur de la classe.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’examen (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu’à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : visibilité des membres, appels au parent, types des ' +
      'catch, paramètres d’une requête préparée.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final — toutes notions</h2>',
    '  ' + qcm(mastery, { mastery: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % — reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % — refais les exercices des chapitres faibles.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible encapsulations et héritage.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’examen.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit du cours. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de PHP objet B2 : sujets chronométrés sur les objets, ' +
        'l’héritage, les namespaces, les exceptions et PDO, avec corrigés détaillés.',
      active: 'examen',
      body
    }
  };
}

/* ======================== Exercices & projet ======================== */

function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\n'),
    '    </ol>',
    '    <details><summary>Corrections</summary><div class="sol"><pre><code>' + solutions + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un projet final qui ' +
    'assemble une petite application objet. Les programmes sont en PHP, comme à l’atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lire un prénom et afficher « Bonjour prénom ».',
      'Lire deux entiers et afficher leur somme et leur produit.',
      'Créer une classe Voiture avec une propriété marque et afficher la marque lue.',
      'Lire un entier et dire s’il est pair (« pair : oui/non »).'
    ], [
      '$nom = trim(fgets(STDIN));',
      'echo "Bonjour $nom\\n";',
      '',
      '$a = (int) trim(fgets(STDIN));',
      '$b = (int) trim(fgets(STDIN));',
      'echo "somme : " . ($a + $b) . "\\n";',
      'echo "produit : " . ($a * $b) . "\\n";',
      '',
      'class Voiture {',
      '    private $marque;',
      '    public function __construct(string $m) { $this->marque = $m; }',
      '    public function marque(): string { return $this->marque; }',
      '}',
      '$m = trim(fgets(STDIN));',
      'echo (new Voiture($m))->marque() . "\\n";',
      '',
      '$n = (int) trim(fgets(STDIN));',
      'echo "pair : " . ($n % 2 === 0 ? "oui" : "non") . "\\n";'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Écrire une classe Rectangle (largeur, hauteur) avec aire() et perimetre().',
      'Écrire un setter d’âge qui refuse une valeur négative (exception).',
      'Créer une classe facture utilisant une constante TVA et calculer un TTC.',
      'Compter les instances créées avec un membre statique.'
    ], [
      'class Rectangle {',
      '    private $l; private $h;',
      '    public function __construct(float $l, float $h) { $this->l = $l; $this->h = $h; }',
      '    public function aire(): float { return $this->l * $this->h; }',
      '    public function perimetre(): float { return 2 * ($this->l + $this->h); }',
      '}',
      '',
      'class Personne {',
      '    private $age;',
      '    public function setAge(int $age): void {',
      '        if ($age &lt; 0) { throw new InvalidArgumentException("age négatif"); }',
      '        $this->age = $age;',
      '    }',
      '}',
      '',
      'class Facture {',
      '    const TVA = 18.0;',
      '    public function ttc(float $ht): float { return $ht * (1 + self::TVA / 100); }',
      '}',
      '',
      'class Compteur {',
      '    private static $n = 0;',
      '    public function __construct() { self::$n++; }',
      '    public static function total(): int { return self::$n; }',
      '}'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Hiérarchie Forme → Cercle, Carre avec aire() redéfinie : afficher l’aire de chaque forme.',
      'Résoudre un conflit entre deux traits avec insteadof et as.',
      'Simuler un journal : intercepter une exception d’entrée et compter les erreurs.',
      'Dépôt en mémoire : ajouter des valeurs, en calculer la somme (patron repository).'
    ], [
      'abstract class Forme { abstract public function aire(): float; }',
      'class Carre extends Forme {',
      '    private $c;',
      '    public function __construct(float $c) { $this->c = $c; }',
      '    public function aire(): float { return $this->c * $this->c; }',
      '}',
      '',
      'trait A { public function demarrer(): string { return "A"; } }',
      'trait B { public function demarrer(): string { return "B"; } }',
      'class Service {',
      '    use A, B { A::demarrer insteadof B; B::demarrer as demarrerB; }',
      '}',
      '',
      '$erreurs = 0;',
      'try {',
      '    $v = trim(fgets(STDIN));',
      '    if (!is_numeric($v)) { throw new InvalidArgumentException("non numérique"); }',
      '} catch (InvalidArgumentException $e) {',
      '    $erreurs++;',
      '}',
      'echo "erreurs : $erreurs\\n";',
      '',
      'class Depot {',
      '    private $valeurs = [];',
      '    public function ajouter(int $v): void { $this->valeurs[] = $v; }',
      '    public function somme(): int { return array_sum($this->valeurs); }',
      '}'
    ].join('\n')),

    '  <h2>Projet intégrateur — « liste de tâches »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>On te confie une petite application ToDo List. Le programme lit <code>n</code>, puis ' +
      '<code>n</code> lignes de tâches. Il les range dans une classe <code>TodoList</code> (ajout + lecture), ' +
      'les affiche numérotées de 1 à n au format <code>1. tâche</code>, puis compte les tâches contenant le mot ' +
      '« urgent ».</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les tâches dans l’ordre : n d’abord, puis une par ligne.</li>',
      '      <li><strong>Encapsuler</strong> le tableau dans une classe TodoList (propriété privée).</li>',
      '      <li><strong>Exposer</strong> ajouter() et lister() comme seules méthodes d’accès.</li>',
      '      <li><strong>Numéroter</strong> les tâches à partir de 1 et respecter le format « 1. tâche ».</li>',
      '      <li><strong>Compter</strong> les tâches « urgent » et afficher le total.</li>',
      '      <li><strong>Gérer</strong> le cas limite n = 0 (rapport vide mais propre).</li>',
      '    </ol>',
      '    <p>Contraintes : aucune propriété publique, méthodes nommées clairement, bilan après la boucle.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture ordonnée et gestion de n = 0 <strong>20</strong>' },
        { cls: '', text: 'Encapsulation correcte (propriété privée) <strong>20</strong>' },
        { cls: '', text: 'Numérotation et format exacts <strong>20</strong>' },
        { cls: '', text: 'Comptage des tâches « urgent » <strong>20</strong>' },
        { cls: '', text: 'Lisibilité, noms, méthodes <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'class TodoList {',
    '    private $taches = [];',
    '',
    '    public function ajouter(string $tache): void {',
    '        $this->taches[] = $tache;',
    '    }',
    '',
    '    public function lister(): array {',
    '        return $this->taches;',
    '    }',
    '}',
    '',
    '$n = (int) trim(fgets(STDIN));',
    '$todo = new TodoList();',
    'for ($i = 0; $i &lt; $n; $i++) {',
    '    $todo->ajouter(trim(fgets(STDIN)));',
    '}',
    '$urgents = 0;',
    'foreach ($todo->lister() as $i => $tache) {',
    '    echo ($i + 1) . ". " . $tache . "\\n";',
    '    if (str_contains($tache, "urgent")) {',
    '        $urgents++;',
    '    }',
    '}',
    'echo "urgents : $urgents\\n";'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine lecture ordonnée, encapsulation dans une classe, numérotation et comptage — ' +
    'l’essentiel des six modules en un seul programme.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du cours historique de PHP objet. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de PHP objet B2 : ' +
        'programmes gradués et application de liste de tâches.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
