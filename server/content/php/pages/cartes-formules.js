/**
 * Pages « cartes de révision » et « mémo » du cours « PHP POO » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Clique une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Reviens à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo PHP' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de PHP objet B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo PHP</h1>',
    '  <p class="lead">Syntaxe des classes, visibilité, héritage, exceptions et PDO sur une page. ' +
    'À garder ouvert pendant les exercices et l’atelier.</p>',

    bloc('Une classe, un objet', [
      '<pre><code>class Point {\n',
      '    private $x;                       // état\n',
      '    public function __construct(int $x) { $this-&gt;x = $x; }\n',
      '    public function afficher(): string { return "(" . $this-&gt;x . ")"; }\n',
      '}\n',
      '$p = new Point(3);      // new déclenche le constructeur\n',
      '$p-&gt;afficher();          // flèche pour un membre</code></pre>',
      '<p>Le point <code>.</code> concatène ; la flèche <code>-&gt;</code> atteint un membre.</p>'
    ].join('\n')),

    bloc('Visibilité, constantes, statique', [
      '<pre><code>public     ouvert à tous        protected  classe + filles\n',
      'private    réservé à la classe  const      const TVA = 18;   self::TVA\n',
      'static     partagé par la classe           self::$compteur (pas $this)\n',
      'fluent     return $this;         permet   $obj-&gt;a()-&gt;b()</code></pre>',
      '<p>Encapsulation : propriétés en private, accès par getters et setters qui valident.</p>'
    ].join('\n')),

    bloc('Héritage, abstrait, interfaces', [
      '<pre><code>class Chien extends Animal { ... }        parent::__construct($nom)\n',
      'abstract class Forme { abstract public function aire(): float; }\n',
      'interface Affichable { public function afficher(): string; }\n',
      'class Cercle extends Forme implements Affichable { ... }\n',
      'polymorphisme : $forme-&gt;aire() exécute la version du type réel</code></pre>',
      '<p>Interface = contrat de signatures ; classe abstraite = squelette réutilisable.</p>'
    ].join('\n')),

    bloc('Traits et namespaces', [
      '<pre><code>trait Salutation { public function saluer(): string { ... } }\n',
      'class Accueil { use Salutation; }        // importe les méthodes\n',
      'conflit : use A, B { A::demarrer insteadof B; B::demarrer as demarrerB; }\n',
      'namespace App;                             // tout en haut, après <?php\n',
      'use Core\\Calcul as Calc;                   // import + alias\n',
      'spl_autoload_register(function ($classe) { ... });</code></pre>',
      '<p>Le namespace fait partie du nom complet : <code>App\\Utilisateur</code>.</p>'
    ].join('\n')),

    bloc('Erreurs et exceptions', [
      '<pre><code>throw new Exception("message");            // lance\n',
      'try { ... } catch (Exception $e) { $e-&gt;getMessage(); }\n',
      'class SoldeInsuffisant extends Exception {}    // personnalisée\n',
      'catch (InvalidArgumentException | RangeException $e) { ... }  // multi\n',
      'finally { ... }                            // exécuté dans tous les cas</code></pre>',
      '<p>Attraper précis plutôt que <code>catch (Exception $e)</code> : un type fils avant le parent.</p>'
    ].join('\n')),

    bloc('PDO et architecture', [
      '<pre><code>$pdo = new PDO("sqlite::memory:");\n',
      '$pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n',
      '$stmt = $pdo-&gt;prepare("INSERT INTO t (n) VALUES (:n)");\n',
      '$stmt-&gt;execute([":n" =&gt; $valeur]);        // jamais de concaténation SQL\n',
      'class Depot { public function __construct(PDO $pdo) { ... } }</code></pre>',
      '<p>Couches : entités → dépôt → service → affichage. Chaque couche ne connaît que la suivante.</p>'
    ].join('\n')),

    bloc('Lire l’entrée en CLI', [
      '<pre><code>$ligne   = trim(fgets(STDIN));      // une valeur par ligne, débarrassée du \\n\n',
      '$nombre  = (int) $ligne;            // cast explicite\n',
      'echo "resultat : " . $nombre . "\\n";</code></pre>',
      '<p>Toujours <code>trim()</code> une entrée : elle conserve sinon le saut de ligne final.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Écrire <code>$this.x</code> au lieu de <code>$this-&gt;x</code>.</li>',
      '    <li>Mettre un <code>$</code> devant une constante.</li>',
      '    <li>Oublier <code>parent::__construct()</code> dans une classe fille.</li>',
      '    <li>Tenter <code>new</code> sur une classe abstraite ou une interface.</li>',
      '    <li>Concaténer une entrée utilisateur dans une requête SQL.</li>',
      '    <li>Oublier <code>trim()</code> sur <code>fgets(STDIN)</code>.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo PHP — ' + course.brand,
      description: 'Mémo du cours de PHP objet B2 : classes, visibilité, héritage, traits, namespaces, ' +
        'exceptions et PDO sur une page.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
