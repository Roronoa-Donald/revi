/**
 * Chapitre 1 du cours « Java » B2 — bases du langage.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Bases du langage Java',
  short: 'Bases du langage',
  toc: 'Structure d’un programme, types primitifs, variables, opérateurs, affichage et lecture au clavier.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Un programme Java ne s’improvise pas : il vit dans une classe, démarre par une méthode précise et ' +
    'manipule des valeurs d’un type déterminé. Poser ces fondations évite les surprises de compilation — ' +
    'car en Java, une déclaration floue ne passe pas.',

  objectives: [
    'reconnaître la structure d’une classe et la méthode main ;',
    'déclarer des variables des types primitifs et connaître leurs opérateurs ;',
    'afficher avec System.out.print/println et formatter un décimal ;',
    'lire une saisie au clavier avec Scanner.'
  ],

  sections: [
    {
      title: 'Un programme Java, de l’intérieur',
      html: [
        '<p>Un programme Java s’écrit dans une <strong>classe</strong>. L’exécution démarre toujours à la ' +
        'méthode <code>public static void main(String[] args)</code> : le point d’entrée fixe par la machine ' +
        'virtuelle.</p>',
        '<pre><code>public class Main {\n    public static void main(String[] args) {\n        System.out.println("Bonjour");\n    }\n}</code></pre>',
        box('tech', 'Tout tourne autour de la classe', 'blocks',
          '    <p>Les accolades délimitent la classe, puis la méthode. L’instruction se termine par un ' +
          'point-virgule : l’oublier est l’erreur de compilation numéro un des débutants.</p>')
      ].join('\n')
    },
    {
      title: 'Types primitifs et variables',
      html: [
        '<p>Chaque variable a un <strong>type</strong> connu à la compilation. Les types primitifs couvrent ' +
        'les besoins courants : <code>int</code> (entier), <code>double</code> (décimal), <code>boolean</code> ' +
        '(vrai/faux), <code>char</code> (un caractère).</p>',
        '<pre><code>int age = 20;\ndouble prix = 9.99;\nboolean actif = true;\nchar initiale = \'A\';</code></pre>',
        box('pitfall', 'Piège — la division entière', 'warning',
          '    <p><code>7 / 2</code> donne <code>3</code> en Java : deux entiers produisent un entier. Pour un ' +
          'résultat décimal, il faut au moins un opérande <code>double</code> : <code>7 / 2.0</code> ou ' +
          '<code>7.0 / 2</code>.</p>')
      ].join('\n')
    },
    {
      title: 'Opérateurs et concaténation',
      html: [
        '<p>Les opérateurs arithmétiques (<code>+ − * / %</code>) s’appliquent aux nombres. Le signe ' +
        '<code>+</code> sert aussi à <strong>concaténer</strong> des chaînes : c’est le contexte qui décide.</p>',
        '<pre><code>int a = 3;\nint b = 4;\nSystem.out.println("somme : " + (a + b));   // sommes d\'abord, texte ensuite</code></pre>',
        '<p>Les parenthèses autour de <code>(a + b)</code> sont capitales : sans elles, <code>a</code> serait ' +
        'concaténé au texte avant l’addition.</p>'
      ].join('\n')
    },
    {
      title: 'Lire au clavier avec Scanner',
      html: [
        '<p><code>Scanner</code> lit l’entrée standard. On crée l’objet une fois, puis on appelle ' +
        '<code>nextInt()</code>, <code>nextDouble()</code> ou <code>next()</code> selon le type attendu.</p>',
        '<pre><code>import java.util.Scanner;\n\nScanner sc = new Scanner(System.in);\nint n = sc.nextInt();\ndouble x = sc.nextDouble();</code></pre>',
        '<p>Pour formater un décimal avec le point (et non la virgule de la locale française), utilisez ' +
        '<code>String.format(Locale.US, "%.2f", valeur)</code> : le format reste identique d’une machine à l’autre.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Par où démarre un programme Java ?', opts: ['La méthode main', 'La première ligne', 'Le constructeur'], correct: 0, exp: 'La machine virtuelle cherche public static void main(String[] args).' },
    { stem: 'Quel type pour un décimal ?', opts: ['int', 'double', 'boolean'], correct: 1, exp: 'double représente les nombres à virgule flottante.' },
    { stem: 'Que vaut 7 / 2 en Java ?', opts: ['3.5', '3', '4'], correct: 1, exp: 'Deux entiers donnent une division entière : 3.' },
    { stem: 'Comment obtenir un décimal ?', opts: ['7 / 2', '7.0 / 2', '7 mod 2'], correct: 1, exp: 'Un opérande double suffit à produire un résultat décimal.' },
    { stem: 'Que fait le signe + entre une chaîne et un nombre ?', opts: ['Il additionne', 'Il concatène', 'Il compare'], correct: 1, exp: 'Dès qu’un opérande est une chaîne, + concatène.' },
    { stem: 'Quel objet lit le clavier ?', opts: ['Scanner', 'Reader', 'Printer'], correct: 0, exp: 'Scanner(System.in) lit l’entrée standard.' },
    { stem: 'Que fait System.out.println ?', opts: ['Lit une ligne', 'Affichez une ligne', 'Efface l’écran'], correct: 1, exp: 'println affiche, puis passe à la ligne suivante.' },
    { stem: 'Pourquoi formater avec Locale.US ?', opts: ['Pour accélérer', 'Pour garder le point décimal', 'Pour arrondir'], correct: 1, exp: 'La locale française utiliserait la virgule comme séparateur.' }
  ],

  pitfalls: [
    'Oublier le point-virgule en fin d’instruction.',
    'Attendre un résultat décimal d’une division entre deux <code>int</code>.',
    'Oublier les parenthèses dans <code>"somme : " + (a + b)</code>.',
    'Formater un décimal sans fixer la locale : le séparateur peut varier.',
    'Lire un entier avec <code>nextDouble()</code> ou inversement.'
  ],

  methodTitle: 'Écrire un premier programme Java',
  method: [
    '<strong>Déclarer</strong> une classe et sa méthode main.',
    '<strong>Importer</strong> ce qui est nécessaire (Scanner, Locale).',
    '<strong>Déclarer</strong> chaque variable avec son type avant de l’utiliser.',
    '<strong>Lire</strong> l’entrée avec la bonne méthode de Scanner.',
    '<strong>Afficher</strong> un résultat formaté et relire la sortie attendue.'
  ],

  summary: [
    'Un programme Java vit dans une classe et démarre à main.',
    'Chaque variable a un type primitif (int, double, boolean, char).',
    'Deux entiers divisés donnent un entier ; un double force le décimal.',
    'Le + concatène dès qu’un opérande est une chaîne.',
    'Scanner lit l’entrée ; String.format(Locale.US, …) fige le format.'
  ],

  checklist: [
    'Je sais structurer une classe avec main.',
    'Je choisis le bon type pour chaque variable.',
    'Je prévois le résultat entier ou décimal d’une division.',
    'Je lis l’entrée avec Scanner et je formate mes sorties.'
  ],

  notions: ['classe', 'méthode main', 'type primitif', 'int', 'double', 'boolean', 'char', 'opérateurs', 'concaténation', 'division entière', 'Scanner', 'String.format'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Réécris un programme qui lit deux entiers et les additionne.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la division entière et le formatage.' },
    { cls: 'good', text: '70–94 % — Solide : vous lisez et affiches sans hésiter.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux conditions et boucles, chapitre 2.' }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « opérateurs » ?', a: 'déclarer des variables des types primitifs et connaître leurs opérateurs ;' },
      { q: 'Qu’est-ce que « else » ?', a: 'écrire des conditions avec if/else et l’opérateur ternaire ;' },
      { q: 'Qu’est-ce que « && » ?', a: '&& : Java B2 › Sommaire › Chapitre 2' },
      { q: 'Qu’est-ce que « || » ?', a: '|| : Java B2 › Sommaire › Chapitre 2' },
      { q: 'Qu’est-ce que « case » ?', a: 'Sans break , l’exécution « tombe » dans le cas suivant ( fall-through ) et exécute du code qu’on ne voulait pas. Chaque case se termine normalement par break .' },
      { q: 'Qu’est-ce que « for-each » ?', a: 'On parcourt une liste avec une boucle indexée ou un for-each : for (int note : notes) { … } .' },
      { q: 'Qu’est-ce que « paramètre » ?', a: 'passer des paramètres et renvoyer un résultat.' },
      { q: 'Qu’est-ce que « attribut » ?', a: 'déclarer une classe avec ses attributs et son constructeur ;' },
      { q: 'Qu’est-ce que « HashSet » ?', a: 'HashSet : Java B2 › Sommaire › Chapitre 5' },
    { q: 'Quel est le point d’entrée d’un programme Java ?', a: 'La méthode public static void main(String[] args).' },
    { q: 'Cite quatre types primitifs.', a: 'int, double, boolean, char.' },
    { q: 'Que vaut 7 / 2 ? Et 7 / 2.0 ?', a: '3 (division entière) et 3.5 (avec un double).' },
    { q: 'Que fait + entre une chaîne et un nombre ?', a: 'Il concatène, sans additionner.' },
    { q: 'Comment lire un entier au clavier ?', a: 'Avec sc.nextInt() sur un Scanner(System.in).' },
    { q: 'Comment afficher un décimal avec le point ?', a: 'String.format(Locale.US, "%.2f", valeur).' }
  ]
};
