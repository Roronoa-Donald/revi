/**
 * Catalogue des 18 exercices PHP du cours « PHP POO » B2 : la programmation
 * orientée objet en PHP 8, exécutée en CLI (php-cli) — l'entrée arrive sur
 * STDIN, une valeur par ligne, la sortie est comparée après normalisation.
 *
 * Chapitre 1 : objets et classes (constructeur, $this, enchaînement).
 * Chapitre 2 : encapsulation, getters/setters, static et constantes.
 * Chapitre 3 : héritage, classes abstraites, polymorphisme, interfaces.
 * Chapitre 4 : traits, namespaces, autoloading.
 * Chapitre 5 : gestion des erreurs et exceptions.
 * Chapitre 6 : PDO et architecture (repository, routeur, projet ToDo List).
 *
 * Conventions : language 'php', ids 'php2-cN-eM', niveaux n1/n2/n3, un exemple
 * visible et trois tests cachés par fiche, exemple distinct des tests.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Objets et classes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'php2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'php',
    title: 'Premier objet',
    goal: 'Créer une classe, un constructeur et une méthode, puis instancier.',
    brief: '<p>Le programme reçoit deux lignes : <code>x</code> puis <code>y</code> (entiers). ' +
      'Écris une classe <code>Point</code> avec un constructeur qui range les deux coordonnées et une ' +
      'méthode <code>afficher()</code> qui renvoie la chaîne <code>(x, y)</code>. Instancie le point et ' +
      'affiche le résultat.</p>',
    starter: `<?php
class Point {
    private $x;
    private $y;

    // À compléter : le constructeur range les deux coordonnées.

    // À compléter : afficher() renvoie "(x, y)".
}

$x = (int) trim(fgets(STDIN));
$y = (int) trim(fgets(STDIN));
// À compléter : créer le point et afficher ses coordonnées.
`,
    hints: [
      'Le constructeur s’écrit __construct(int $x, int $y) et affecte $this->x et $this->y.',
      'Deux valeurs se concatènent avec le point : \'(\' . $this->x . \', \' . $this->y . \')\'.'
    ],
    examples: [
      { stdin: '3\n4', expected: '(3, 4)', note: 'Deux entiers lus, un couple affiché.' }
    ],
    tests: [
      { label: 'Origine', stdin: '0\n0', expected: '(0, 0)' },
      { label: 'Abscisse négative', stdin: '-2\n7', expected: '(-2, 7)' },
      { label: 'Grandes valeurs', stdin: '10\n25', expected: '(10, 25)' }
    ],
    solution: `<?php
class Point {
    private $x;
    private $y;

    public function __construct(int $x, int $y) {
        $this->x = $x;
        $this->y = $y;
    }

    public function afficher(): string {
        return '(' . $this->x . ', ' . $this->y . ')';
    }
}

$x = (int) trim(fgets(STDIN));
$y = (int) trim(fgets(STDIN));
$point = new Point($x, $y);
echo $point->afficher() . "\\n";
`
  },
  {
    id: 'php2-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'php',
    title: 'Enchaîner les appels',
    goal: 'Faire renvoyer $this par une méthode pour enchaîner les appels.',
    brief: '<p>Le programme reçoit <code>n</code>, puis <code>n</code> prix (entiers). Écris une classe ' +
      '<code>Panier</code> dont la méthode <code>ajouter(int $prix)</code> cumule le prix et renvoie ' +
      '<code>$this</code>, et dont la méthode <code>total()</code> renvoie le total. Ajoute les prix, ' +
      'puis affiche <code>total : X</code>.</p>',
    starter: `<?php
class Panier {
    private $total = 0;

    // À compléter : ajouter() cumule puis renvoie $this.
    // À compléter : total() renvoie le cumul.
}

$n = (int) trim(fgets(STDIN));
// À compléter : lire n prix, les ajouter, afficher "total : X".
`,
    hints: [
      'Une méthode qui renvoie $this permet d’enchaîner : $panier->ajouter(10)->ajouter(20).',
      'Le type de retour d’une méthode renvoyant l’objet courant s’écrit : self.'
    ],
    examples: [
      { stdin: '3\n10\n20\n30', expected: 'total : 60', note: 'Trois prix cumulés.' }
    ],
    tests: [
      { label: 'Un seul prix', stdin: '1\n5', expected: 'total : 5' },
      { label: 'Avec un zéro', stdin: '4\n100\n0\n50\n25', expected: 'total : 175' },
      { label: 'Petits montants', stdin: '2\n7\n3', expected: 'total : 10' }
    ],
    solution: `<?php
class Panier {
    private $total = 0;

    public function ajouter(int $prix): self {
        $this->total += $prix;
        return $this;
    }

    public function total(): int {
        return $this->total;
    }
}

$n = (int) trim(fgets(STDIN));
$panier = new Panier();
for ($i = 0; $i < $n; $i++) {
    $panier->ajouter((int) trim(fgets(STDIN)));
}
echo 'total : ' . $panier->total() . "\\n";
`
  },
  {
    id: 'php2-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'php',
    title: 'Constructeur qui valide',
    goal: 'Assainir une valeur dans le constructeur.',
    brief: '<p>Le programme reçoit un âge (entier, éventuellement négatif). Écris une classe ' +
      '<code>Age</code> dont le constructeur ramène toute valeur négative à <code>0</code>, et une ' +
      'méthode <code>valeur()</code> qui renvoie l’âge. Affiche <code>age : X</code>.</p>',
    starter: `<?php
class Age {
    private $valeur;

    // À compléter : le constructeur range max(0, age).
    // À compléter : valeur() renvoie l'âge.
}

$age = (int) trim(fgets(STDIN));
// À compléter : créer l'objet et afficher "age : X".
`,
    hints: [
      'Une expression ternaire choisit la valeur : $age < 0 ? 0 : $age.',
      'L’objet s’instancie directement dans l’affichage : (new Age($age))->valeur().'
    ],
    examples: [
      { stdin: '25', expected: 'age : 25', note: 'Valeur positive conservée.' }
    ],
    tests: [
      { label: 'Négatif ramené à zéro', stdin: '-5', expected: 'age : 0' },
      { label: 'Zéro', stdin: '0', expected: 'age : 0' },
      { label: 'Valeur haute', stdin: '120', expected: 'age : 120' }
    ],
    solution: `<?php
class Age {
    private $valeur;

    public function __construct(int $age) {
        $this->valeur = $age < 0 ? 0 : $age;
    }

    public function valeur(): int {
        return $this->valeur;
    }
}

$age = (int) trim(fgets(STDIN));
echo 'age : ' . (new Age($age))->valeur() . "\\n";
`
  },
  {
    id: 'php2-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'php',
    title: 'Propriété privée et setter',
    goal: 'Protéger une propriété derrière un setter qui valide.',
    brief: '<p>Le programme reçoit <code>n</code> puis <code>n</code> montants (entiers). Écris une classe <code>Compte</code> avec une propriété <strong>privée</strong> <code>$solde</code> valant 0 et une méthode <code>deposer(int $montant)</code> qui n’ajoute que les montants strictement positifs. Affiche <code>solde : X</code>.</p>',
    starter: `<?php
class Compte {
    private $solde = 0;

    // À compléter : deposer() n'ajoute que si le montant est positif.
    // À compléter : solde() renvoie la valeur.
}

$n = (int) trim(fgets(STDIN));
// À compléter : lire n montants, les déposer, afficher "solde : X".
`,
    hints: [
      'Le mot-clé private interdit l’accès direct : seule la méthode de la classe peut modifier $solde.',
      'Un montant n’est déposé que si $montant > 0.'
    ],
    examples: [
      { stdin: '3\n50\n-10\n20', expected: 'solde : 70', note: 'Le montant négatif est ignoré.' }
    ],
    tests: [
      { label: 'Zéro ignoré', stdin: '2\n0\n100', expected: 'solde : 100' },
      { label: 'Dépôt négatif', stdin: '1\n-30', expected: 'solde : 0' },
      { label: 'Série régulière', stdin: '4\n10\n20\n30\n40', expected: 'solde : 100' }
    ],
    solution: `<?php
class Compte {
    private $solde = 0;

    public function deposer(int $montant): void {
        if ($montant > 0) {
            $this->solde += $montant;
        }
    }

    public function solde(): int {
        return $this->solde;
    }
}

$n = (int) trim(fgets(STDIN));
$compte = new Compte();
for ($i = 0; $i < $n; $i++) {
    $compte->deposer((int) trim(fgets(STDIN)));
}
echo 'solde : ' . $compte->solde() . "\\n";
`
  },
  {
    id: 'php2-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'php',
    title: 'Constante de classe',
    goal: 'Utiliser une constante et une méthode statique.',
    brief: '<p>Le programme reçoit un prix hors taxe (entier). Écris une classe <code>Config</code> avec la constante <code>TVA = 18</code> (pour cent) et une méthode <strong>statique</strong> <code>ttc(int $ht)</code> qui renvoie le prix TTC arrondi à l’entier inférieur. Affiche <code>ttc : X</code>.</p>',
    starter: `<?php
class Config {
    public const TVA = 18;

    // À compléter : ttc() renvoie ht + ht * TVA / 100.
}

$ht = (int) trim(fgets(STDIN));
// À compléter : afficher "ttc : X" via Config::ttc().
`,
    hints: [
      'Une constante de classe se lit self::TVA à l’intérieur de la classe.',
      'intdiv($ht * self::TVA, 100) donne la part de TVA entière.'
    ],
    examples: [
      { stdin: '100', expected: 'ttc : 118', note: '100 + 18 % = 118.' }
    ],
    tests: [
      { label: 'Prix nul', stdin: '0', expected: 'ttc : 0' },
      { label: 'Double centaine', stdin: '200', expected: 'ttc : 236' },
      { label: 'Petit prix', stdin: '50', expected: 'ttc : 59' }
    ],
    solution: `<?php
class Config {
    public const TVA = 18;

    public static function ttc(int $ht): int {
        return $ht + intdiv($ht * self::TVA, 100);
    }
}

$ht = (int) trim(fgets(STDIN));
echo 'ttc : ' . Config::ttc($ht) . "\\n";
`
  },
  {
    id: 'php2-c2-e3',
    chapter: 2,
    level: 'n1',
    language: 'php',
    title: 'Méthode statique',
    goal: 'Appeler une méthode sans instancier la classe.',
    brief: '<p>Le programme reçoit un entier. Écris une classe <code>Maths</code> avec une méthode statique <code>estPair(int $n)</code> qui renvoie vrai si le nombre est pair. Affiche <code>pair : oui</code> ou <code>pair : non</code>.</p>',
    starter: `<?php
class Maths {
    // À compléter : estPair() renvoie un booléen.
}

$n = (int) trim(fgets(STDIN));
// À compléter : afficher "pair : oui" ou "pair : non".
`,
    hints: [
      'Une méthode statique s’appelle avec ClassName::méthode(), sans new.',
      'Un nombre est pair si le reste de sa division par 2 vaut 0.'
    ],
    examples: [
      { stdin: '4', expected: 'pair : oui', note: '4 est pair.' }
    ],
    tests: [
      { label: 'Impair', stdin: '7', expected: 'pair : non' },
      { label: 'Zéro est pair', stdin: '0', expected: 'pair : oui' },
      { label: 'Autre impair', stdin: '13', expected: 'pair : non' }
    ],
    solution: `<?php
class Maths {
    public static function estPair(int $n): bool {
        return $n % 2 === 0;
    }
}

$n = (int) trim(fgets(STDIN));
echo 'pair : ' . (Maths::estPair($n) ? 'oui' : 'non') . "\\n";
`
  },
  {
    id: 'php2-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'php',
    title: 'Héritage et classe abstraite',
    goal: 'Implémenter une méthode abstraite dans une classe fille.',
    brief: '<p>Le programme reçoit le côté d’un carré (entier). Écris une classe <strong>abstraite</strong> <code>Forme</code> déclarant <code>aire()</code>, puis <code>Carre</code> qui hérite de <code>Forme</code> et calcule <code>côté × côté</code>. Affiche <code>aire : X</code>.</p>',
    starter: `<?php
abstract class Forme {
    // À compléter : declarer la methode abstraite aire().
}

class Carre extends Forme {
    // À compléter : constructeur, propriete privee, methode aire().
}

$c = (int) trim(fgets(STDIN));
// À compléter : afficher "aire : X".
`,
    hints: [
      'Une méthode abstraite s’écrit abstract public function aire(): int; sans corps.',
      'La classe fille doit définir aire() avec la même signature, sinon PHP refuse.'
    ],
    examples: [
      { stdin: '4', expected: 'aire : 16', note: '4 × 4 = 16.' }
    ],
    tests: [
      { label: 'Unité', stdin: '1', expected: 'aire : 1' },
      { label: 'Carré nul', stdin: '0', expected: 'aire : 0' },
      { label: 'Grand carré', stdin: '10', expected: 'aire : 100' }
    ],
    solution: `<?php
abstract class Forme {
    abstract public function aire(): int;
}

class Carre extends Forme {
    private $cote;

    public function __construct(int $cote) {
        $this->cote = $cote;
    }

    public function aire(): int {
        return $this->cote * $this->cote;
    }
}

$c = (int) trim(fgets(STDIN));
echo 'aire : ' . (new Carre($c))->aire() . "\\n";
`
  },
  {
    id: 'php2-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'php',
    title: 'Polymorphisme',
    goal: 'Traiter des objets de types différents derrière une même méthode.',
    brief: '<p>Le programme reçoit <code>n</code>, puis <code>n</code> lignes « type a [b] » : <code>carre a</code> ou <code>rectangle l h</code>. Écris <code>Forme</code> (abstraite), <code>Carre</code> et <code>Rectangle</code>, puis calcule la somme des aires. Affiche <code>total : X</code>.</p>',
    starter: `<?php
// À compléter : Forme abstraite, Carre (a*a), Rectangle (l*h).

$n = (int) trim(fgets(STDIN));
// À compléter : lire chaque forme, additionner les aires, afficher "total : X".
`,
    hints: [
      'Découpe chaque ligne avec explode(\' \', trim(fgets(STDIN))).',
      'Les deux classes exposent aire() : la somme s’écrit sans connaître leur type.'
    ],
    examples: [
      { stdin: '3\ncarre 3\nrectangle 2 5\ncarre 2', expected: 'total : 23', note: '9 + 10 + 4 = 23.' }
    ],
    tests: [
      { label: 'Deux rectangles', stdin: '2\nrectangle 4 5\nrectangle 1 1', expected: 'total : 21' },
      { label: 'Un carré', stdin: '1\ncarre 7', expected: 'total : 49' },
      { label: 'Trois carrés', stdin: '3\ncarre 1\ncarre 2\ncarre 3', expected: 'total : 14' }
    ],
    solution: `<?php
abstract class Forme {
    abstract public function aire(): int;
}

class Carre extends Forme {
    private $cote;

    public function __construct(int $cote) {
        $this->cote = $cote;
    }

    public function aire(): int {
        return $this->cote * $this->cote;
    }
}

class Rectangle extends Forme {
    private $largeur;
    private $hauteur;

    public function __construct(int $largeur, int $hauteur) {
        $this->largeur = $largeur;
        $this->hauteur = $hauteur;
    }

    public function aire(): int {
        return $this->largeur * $this->hauteur;
    }
}

$n = (int) trim(fgets(STDIN));
$total = 0;
for ($i = 0; $i < $n; $i++) {
    $parties = explode(' ', trim(fgets(STDIN)));
    if ($parties[0] === 'carre') {
        $total += (new Carre((int) $parties[1]))->aire();
    } else {
        $total += (new Rectangle((int) $parties[1], (int) $parties[2]))->aire();
    }
}
echo 'total : ' . $total . "\\n";
`
  },
  {
    id: 'php2-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'php',
    title: 'Implémenter une interface',
    goal: 'Garantir un contrat commun avec une interface.',
    brief: '<p>Le programme reçoit un nom d’article puis son prix (entier). Écris une interface <code>Affichable</code> déclarant <code>afficher(): string</code>, puis <code>Produit</code> qui l’implémente et renvoie <code>nom (prix EUR)</code>. Affiche le résultat.</p>',
    starter: `<?php
// À compléter : interface Affichable, puis classe Produit implements Affichable.

$nom = trim(fgets(STDIN));
$prix = (int) trim(fgets(STDIN));
// À compléter : afficher le produit.
`,
    hints: [
      'Une interface déclare des signatures ; une classe l’implémente avec implements.',
      'La chaîne attendue se construit par concaténation : nom . \' (\' . prix . \' EUR)\'.'
    ],
    examples: [
      { stdin: 'Clavier\n29', expected: 'Clavier (29 EUR)', note: 'Nom et prix mis en forme.' }
    ],
    tests: [
      { label: 'Prix nul', stdin: 'Souris\n0', expected: 'Souris (0 EUR)' },
      { label: 'Article cher', stdin: 'Ecran\n249', expected: 'Ecran (249 EUR)' },
      { label: 'Petit prix', stdin: 'USB\n9', expected: 'USB (9 EUR)' }
    ],
    solution: `<?php
interface Affichable {
    public function afficher(): string;
}

class Produit implements Affichable {
    private $nom;
    private $prix;

    public function __construct(string $nom, int $prix) {
        $this->nom = $nom;
        $this->prix = $prix;
    }

    public function afficher(): string {
        return $this->nom . ' (' . $this->prix . ' EUR)';
    }
}

$nom = trim(fgets(STDIN));
$prix = (int) trim(fgets(STDIN));
$produit = new Produit($nom, $prix);
echo $produit->afficher() . "\\n";
`
  },
  {
    id: 'php2-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'php',
    title: 'Réutiliser du code avec un trait',
    goal: 'Composer une méthode réutilisable via un trait.',
    brief: '<p>Le programme reçoit un prénom. Écris un <strong>trait</strong> <code>Salutation</code> qui fournit <code>saluer(string $nom): string</code> renvoyant <code>Bonjour nom</code>, puis une classe <code>Accueil</code> qui l’utilise. Affiche le message.</p>',
    starter: `<?php
// À compléter : trait Salutation, puis class Accueil { use Salutation; }

$nom = trim(fgets(STDIN));
// À compléter : afficher le message de salutation.
`,
    hints: [
      'Un trait se déclare comme une classe (trait Salutation { … }) et s’importe avec use à l’intérieur de la classe.',
      'Les méthodes du trait se comportent comme des méthodes de la classe.'
    ],
    examples: [
      { stdin: 'Ada', expected: 'Bonjour Ada', note: 'Le prénom est inséré dans le message.' }
    ],
    tests: [
      { label: 'Autre prénom', stdin: 'Ruth', expected: 'Bonjour Ruth' },
      { label: 'Une lettre', stdin: 'A', expected: 'Bonjour A' },
      { label: 'Prénom court', stdin: 'Zoe', expected: 'Bonjour Zoe' }
    ],
    solution: `<?php
trait Salutation {
    public function saluer(string $nom): string {
        return 'Bonjour ' . $nom;
    }
}

class Accueil {
    use Salutation;
}

$nom = trim(fgets(STDIN));
echo (new Accueil())->saluer($nom) . "\\n";
`
  },
  {
    id: 'php2-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'php',
    title: 'Ranger ses classes dans un namespace',
    goal: 'Déclarer un namespace et instancier la classe qu’il contient.',
    brief: '<p>Le programme reçoit un login. Déclare un <strong>namespace</strong> <code>App</code> contenant une classe <code>Utilisateur</code> (propriété privée <code>$nom</code>, méthode <code>nom()</code>), puis instancie-la et affiche <code>utilisateur : login</code>.</p>',
    starter: `<?php
// À compléter : namespace App, puis class Utilisateur.

$nom = trim(fgets(STDIN));
// À compléter : instancier et afficher "utilisateur : X".
`,
    hints: [
      'La déclaration namespace App; se place tout en haut, juste après <?php.',
      'À l’intérieur du namespace, la classe s’instancie directement : new Utilisateur($nom).'
    ],
    examples: [
      { stdin: 'sam', expected: 'utilisateur : sam', note: 'Login mis en forme.' }
    ],
    tests: [
      { label: 'Autre login', stdin: 'ada', expected: 'utilisateur : ada' },
      { label: 'Compte système', stdin: 'root', expected: 'utilisateur : root' },
      { label: 'Une lettre', stdin: 'x', expected: 'utilisateur : x' }
    ],
    solution: `<?php
namespace App;

class Utilisateur {
    private $nom;

    public function __construct(string $nom) {
        $this->nom = $nom;
    }

    public function nom(): string {
        return $this->nom;
    }
}

$nom = trim(fgets(STDIN));
$utilisateur = new Utilisateur($nom);
echo 'utilisateur : ' . $utilisateur->nom() . "\\n";
`
  },
  {
    id: 'php2-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'php',
    title: 'Importer une classe avec un alias',
    goal: 'Déclarer une classe dans un namespace et l’importer avec use … as.',
    brief: '<p>Le programme reçoit un entier <code>n</code>. Déclare une classe <code>Calcul</code> dans le ' +
      'namespace <code>App</code> (méthode <code>doubler(int $n): int</code> renvoyant le double), importe-la ' +
      'sous l’alias <code>Calc</code> et affiche <code>double : 2n</code>.</p>',
    starter: `<?php
namespace App {
    // À compléter : class Calcul { public function doubler(int $n): int { ... } }
}

namespace {
    // À compléter : use App\\Calcul as Calc;

    $n = (int) trim(fgets(STDIN));
    // À compléter : afficher "double : X".
}
`,
    hints: [
      'Un import use App\\Calcul as Calc; se place en haut du bloc namespace, avant le code.',
      'On instancie ensuite via l’alias : (new Calc())->doubler($n).'
    ],
    examples: [
      { stdin: '21', expected: 'double : 42', note: 'Classe importée sous un autre nom.' }
    ],
    tests: [
      { label: 'Zéro', stdin: '0', expected: 'double : 0' },
      { label: 'Négatif', stdin: '-4', expected: 'double : -8' },
      { label: 'Grand nombre', stdin: '100', expected: 'double : 200' }
    ],
    solution: `<?php
namespace App {
    class Calcul {
        public function doubler(int $n): int {
            return $n * 2;
        }
    }
}

namespace {
    use App\\Calcul as Calc;

    $n = (int) trim(fgets(STDIN));
    echo 'double : ' . (new Calc())->doubler($n) . "\\n";
}
`
  },
  {
    id: 'php2-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'php',
    title: 'Attraper une exception',
    goal: 'Protéger un calcul risqué par un bloc try/catch.',
    brief: '<p>Le programme reçoit deux entiers <code>a</code> puis <code>b</code>. Écris une fonction ' +
      '<code>diviser(int $a, int $b): int</code> qui lève une <code>Exception</code> de message ' +
      '<code>division par zéro</code> quand <code>b</code> vaut 0. Affiche <code>resultat : X</code> au succès, ' +
      'ou <code>erreur : division par zéro</code> si l’exception est attrapée.</p>',
    starter: `<?php
function diviser(int $a, int $b): int {
    // À compléter : lever une Exception si $b === 0, sinon renvoyer la division entière.
}

$a = (int) trim(fgets(STDIN));
$b = (int) trim(fgets(STDIN));
// À compléter : essayer puis afficher "resultat : X" ou "erreur : message".
`,
    hints: [
      'On lève une erreur avec throw new Exception(\'division par zéro\');.',
      'Le résultat se calcule avec intdiv($a, $b) ; le bloc catch (Exception $e) récupère le message via $e->getMessage().'
    ],
    examples: [
      { stdin: '10\n2', expected: 'resultat : 5', note: 'Cas nominal.' }
    ],
    tests: [
      { label: 'Division par zéro', stdin: '5\n0', expected: 'erreur : division par zéro' },
      { label: 'Résultat nul', stdin: '3\n9', expected: 'resultat : 0' },
      { label: 'Grands nombres', stdin: '100\n4', expected: 'resultat : 25' }
    ],
    solution: `<?php
function diviser(int $a, int $b): int {
    if ($b === 0) {
        throw new Exception('division par zéro');
    }
    return intdiv($a, $b);
}

$a = (int) trim(fgets(STDIN));
$b = (int) trim(fgets(STDIN));
try {
    echo 'resultat : ' . diviser($a, $b) . "\\n";
} catch (Exception $e) {
    echo 'erreur : ' . $e->getMessage() . "\\n";
}
`
  },
  {
    id: 'php2-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'php',
    title: 'Exception personnalisée',
    goal: 'Étendre Exception et intercepter précisément son type.',
    brief: '<p>Déclare une exception <code>SoldeInsuffisant</code> qui étend <code>Exception</code>. Le programme ' +
      'reçoit un solde puis un montant (entiers). La fonction <code>retirer</code> renvoie le solde restant ou lève ' +
      '<code>SoldeInsuffisant</code>. Affiche <code>reste : X</code> ou <code>erreur : solde insuffisant</code>.</p>',
    starter: `<?php
// À compléter : class SoldeInsuffisant extends Exception {}

function retirer(int $solde, int $montant): int {
    // À compléter : lever SoldeInsuffisant si $montant > $solde, sinon renvoyer le reste.
}

$solde = (int) trim(fgets(STDIN));
$montant = (int) trim(fgets(STDIN));
// À compléter : try/catch et affichage.
`,
    hints: [
      'Une exception personnalisée est une classe qui hérite : class SoldeInsuffisant extends Exception {}.',
      'On peut lancer une instance avec throw new SoldeInsuffisant(\'solde insuffisant\');.'
    ],
    examples: [
      { stdin: '100\n30', expected: 'reste : 70', note: 'Retrait autorisé.' }
    ],
    tests: [
      { label: 'Solde insuffisant', stdin: '50\n80', expected: 'erreur : solde insuffisant' },
      { label: 'Retrait exact', stdin: '40\n40', expected: 'reste : 0' },
      { label: 'Petit retrait', stdin: '10\n1', expected: 'reste : 9' }
    ],
    solution: `<?php
class SoldeInsuffisant extends Exception {}

function retirer(int $solde, int $montant): int {
    if ($montant > $solde) {
        throw new SoldeInsuffisant('solde insuffisant');
    }
    return $solde - $montant;
}

$solde = (int) trim(fgets(STDIN));
$montant = (int) trim(fgets(STDIN));
try {
    echo 'reste : ' . retirer($solde, $montant) . "\\n";
} catch (SoldeInsuffisant $e) {
    echo 'erreur : ' . $e->getMessage() . "\\n";
}
`
  },
  {
    id: 'php2-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'php',
    title: 'Attraper plusieurs types et conclure',
    goal: 'Regrouper plusieurs exceptions dans un catch et exécuter un finally.',
    brief: '<p>Le programme reçoit une saisie. Si elle n’est pas numérique, lève une ' +
      '<code>InvalidArgumentException</code> ; si elle est négative, une <code>RangeException</code>. Attrape les ' +
      'deux types dans un même <code>catch</code> et affiche <code>saisie invalide</code>. Sinon affiche ' +
      '<code>valeur : X</code>. Un bloc <code>finally</code> ajoute toujours <code>controle termine</code>.</p>',
    starter: `<?php
try {
    $v = trim(fgets(STDIN));
    // À compléter : lever InvalidArgumentException si non numérique, RangeException si négatif.
    echo 'valeur : ' . $v . "\\n";
} catch (InvalidArgumentException | RangeException $e) {
    // À compléter : afficher "saisie invalide".
} finally {
    // À compléter : afficher "controle termine".
}
`,
    hints: [
      'Plusieurs types se regroupent avec un tube : catch (InvalidArgumentException | RangeException $e).',
      'Le bloc finally s’exécute dans tous les cas, après le try ou le catch.'
    ],
    examples: [
      { stdin: '7', expected: 'valeur : 7\ncontrole termine', note: 'Saisie valide suivie du finally.' }
    ],
    tests: [
      { label: 'Non numérique', stdin: 'abc', expected: 'saisie invalide\ncontrole termine' },
      { label: 'Valeur négative', stdin: '-3', expected: 'saisie invalide\ncontrole termine' },
      { label: 'Zéro accepté', stdin: '0', expected: 'valeur : 0\ncontrole termine' }
    ],
    solution: `<?php
try {
    $v = trim(fgets(STDIN));
    if (!is_numeric($v)) {
        throw new InvalidArgumentException('non numérique');
    }
    if ((float) $v < 0) {
        throw new RangeException('négatif');
    }
    echo 'valeur : ' . $v . "\\n";
} catch (InvalidArgumentException | RangeException $e) {
    echo "saisie invalide\\n";
} finally {
    echo "controle termine\\n";
}
`
  },
  {
    id: 'php2-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'php',
    title: 'Insérer avec une requête préparée',
    goal: 'Ouvrir une base sqlite en mémoire, créer une table et insérer sans concaténation.',
    brief: '<p>Le programme reçoit un nom. Ouvre une connexion <code>sqlite::memory:</code> (mode erreur par ' +
      'exception), crée la table <code>contacts(id, nom)</code>, insère le nom avec une ' +
      '<strong>requête préparée</strong>, puis relis-le et affiche <code>contact : nom</code>.</p>',
    starter: `<?php
// À compléter : ouvrir la base sqlite en mémoire (new PDO) et activer PDO::ERRMODE_EXCEPTION.
// À compléter : créer la table contacts.

$nom = trim(fgets(STDIN));
// À compléter : insérer puis relire avec une requête préparée et afficher "contact : X".
`,
    hints: [
      'On prépare le modèle une fois : $stmt = $pdo->prepare(\'INSERT INTO contacts (nom) VALUES (:nom)\'); puis $stmt->execute([\':nom\' => $nom]);.',
      'La lecture se fait simplement : $pdo->query(\'SELECT nom FROM contacts LIMIT 1\')->fetchColumn().'
    ],
    examples: [
      { stdin: 'Ada', expected: 'contact : Ada', note: 'Nom stocké puis relu.' }
    ],
    tests: [
      { label: 'Compte système', stdin: 'root', expected: 'contact : root' },
      { label: 'Une lettre', stdin: 'x', expected: 'contact : x' },
      { label: 'Prénom court', stdin: 'Zoe', expected: 'contact : Zoe' }
    ],
    solution: `<?php
$pdo = new PDO('sqlite::memory:');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec('CREATE TABLE contacts (id INTEGER PRIMARY KEY, nom TEXT)');

$nom = trim(fgets(STDIN));
$stmt = $pdo->prepare('INSERT INTO contacts (nom) VALUES (:nom)');
$stmt->execute([':nom' => $nom]);
$enregistre = $pdo->query('SELECT nom FROM contacts LIMIT 1')->fetchColumn();
echo 'contact : ' . $enregistre . "\\n";
`
  },
  {
    id: 'php2-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'php',
    title: 'Un dépôt en mémoire',
    goal: 'Isoler l’accès aux données dans une classe de dépôt.',
    brief: '<p>La première ligne donne un entier <code>n</code>, puis <code>n</code> lignes donnent des ' +
      'entiers. Écris une classe <code>Depot</code> qui expose <code>ajouter(int $valeur): void</code> et ' +
      '<code>somme(): int</code>. Range les valeurs reçues puis affiche <code>somme : total</code>.</p>',
    starter: `<?php
class Depot {
    private $valeurs = [];

    // À compléter : ajouter() range une valeur.

    // À compléter : somme() renvoie le total.
}

$n = (int) trim(fgets(STDIN));
$depot = new Depot();
for ($i = 0; $i < $n; $i++) {
    // À compléter : lire chaque valeur et l’ajouter au dépôt.
}
// À compléter : afficher "somme : X".
`,
    hints: [
      'ajouter() empile dans le tableau privé : $this->valeurs[] = $valeur;.',
      'somme() peut utiliser array_sum($this->valeurs).'
    ],
    examples: [
      { stdin: '3\n1\n2\n3', expected: 'somme : 6', note: 'Trois valeurs additionnées.' }
    ],
    tests: [
      { label: 'Une seule valeur', stdin: '1\n5', expected: 'somme : 5' },
      { label: 'Déjà trié', stdin: '4\n10\n20\n30\n40', expected: 'somme : 100' },
      { label: 'Valeurs négatives', stdin: '3\n7\n-2\n-5', expected: 'somme : 0' }
    ],
    solution: `<?php
class Depot {
    private $valeurs = [];

    public function ajouter(int $valeur): void {
        $this->valeurs[] = $valeur;
    }

    public function somme(): int {
        return array_sum($this->valeurs);
    }
}

$n = (int) trim(fgets(STDIN));
$depot = new Depot();
for ($i = 0; $i < $n; $i++) {
    $depot->ajouter((int) trim(fgets(STDIN)));
}
echo 'somme : ' . $depot->somme() . "\\n";
`
  },
  {
    id: 'php2-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'php',
    title: 'Mini projet : liste de tâches',
    goal: 'Assembler une classe de service et une mise en forme numérotée.',
    brief: '<p>Mini application ToDo : la première ligne donne un entier <code>n</code>, puis <code>n</code> ' +
      'lignes donnent des tâches. Écris une classe <code>TodoList</code> exposant ' +
      '<code>ajouter(string $tache): void</code> et <code>lister(): array</code>. Affiche chaque tâche ' +
      'numérotée à partir de 1, au format <code>1. tâche</code>.</p>',
    starter: `<?php
class TodoList {
    private $taches = [];

    // À compléter : ajouter() empile une tâche.

    // À compléter : lister() renvoie les tâches dans l’ordre.
}

$n = (int) trim(fgets(STDIN));
$todo = new TodoList();
for ($i = 0; $i < $n; $i++) {
    // À compléter : ajouter la tâche lue.
}
// À compléter : numéroter et afficher chaque tâche.
`,
    hints: [
      'Pour numéroter, parcours le tableau avec foreach ($todo->lister() as $i => $tache) et affiche ($i + 1) . \'. \' . $tache.',
      'La concaténation se termine par un retour à la ligne pour éviter que tout s’affiche sur une seule ligne.'
    ],
    examples: [
      { stdin: '1\nFaire les courses', expected: '1. Faire les courses', note: 'Une seule tâche.' }
    ],
    tests: [
      { label: 'Deux tâches', stdin: '2\nA\nB', expected: '1. A\n2. B' },
      { label: 'Trois tâches', stdin: '3\nx\ny\nz', expected: '1. x\n2. y\n3. z' },
      { label: 'Tâche accentuée', stdin: '1\nRéviser le cours', expected: '1. Réviser le cours' }
    ],
    solution: `<?php
class TodoList {
    private $taches = [];

    public function ajouter(string $tache): void {
        $this->taches[] = $tache;
    }

    public function lister(): array {
        return $this->taches;
    }
}

$n = (int) trim(fgets(STDIN));
$todo = new TodoList();
for ($i = 0; $i < $n; $i++) {
    $todo->ajouter(trim(fgets(STDIN)));
}
foreach ($todo->lister() as $i => $tache) {
    echo ($i + 1) . '. ' . $tache . "\\n";
}
`
  }
];
