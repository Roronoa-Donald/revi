/**
 * Pages « cartes de révision » et « mémo » du cours « Java » B2.
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo Java' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Java B2 : notions clés des ' +
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
    '  <h1>Mémo Java</h1>',
    '  <p class="lead">Syntaxe, classes, collections et exceptions sur une page. À garder ouvert pendant ' +
    'les exercices et l’atelier.</p>',

    bloc('Structure et types', [
      '<pre><code>public class Main {\n',
      '    public static void main(String[] args) { ... }\n',
      '}\n',
      'int n = 7;        double x = 9.99;      boolean ok = true;\n',
      'System.out.println("texte " + valeur);   // concaténation\n',
      'String.format(Locale.US, "%.2f", x)      // format à point</code></pre>',
      '<p>Chaque instruction se termine par un point-virgule ; le + concatène dès qu’un opérande est une chaîne.</p>'
    ].join('\n')),

    bloc('Conditions et boucles', [
      '<pre><code>if (n % 2 == 0) { ... } else { ... }\n',
      'String r = (n % 2 == 0) ? "pair" : "impair";\n',
      'switch (n) { case 1: ... break; default: ... }\n',
      'for (int i = 1; i &lt;= n; i++) { ... }\n',
      'while (condition) { ... }      break;   continue;</code></pre>',
      '<p>Le break du switch empêche le fall-through ; for sert quand le nombre d’itérations est connu.</p>'
    ].join('\n')),

    bloc('Tableaux, ArrayList et méthodes', [
      '<pre><code>int[] t = new int[3];        t.length\n',
      'ArrayList&lt;Integer&gt; liste = new ArrayList&lt;&gt;();\n',
      'liste.add(15);   liste.size();   liste.get(0);\n',
      'for (int v : t) { ... }                      // for-each\n',
      'static int somme(int[] v) { ... return total; }</code></pre>',
      '<p>Indices de 0 à length−1 ; une ArrayList stocke des objets (Integer pour int).</p>'
    ].join('\n')),

    bloc('Classes et encapsulation', [
      '<pre><code>class Rectangle {\n',
      '    private final int largeur;\n',
      '    Rectangle(int largeur) { this.largeur = largeur; }\n',
      '    int aire() { return largeur * largeur; }\n',
      '    @Override public String toString() { return "(" + largeur + ")"; }\n',
      '}\n',
      'Rectangle r = new Rectangle(4);    r.aire();</code></pre>',
      '<p>private protège l’état ; getters/setters contrôlent l’accès ; final fige une valeur.</p>'
    ].join('\n')),

    bloc('Collections et héritage', [
      '<pre><code>List&lt;String&gt; l = new ArrayList&lt;&gt;();     // ordonné, doublons\n',
      'Set&lt;Integer&gt; s = new HashSet&lt;&gt;();           // sans doublon\n',
      'Map&lt;String,Integer&gt; m = new HashMap&lt;&gt;();      m.put("Ada", 36);\n',
      'class Chien extends Animal {\n',
      '    Chien(String nom) { super(nom); }\n',
      '    @Override String crier() { return "Wouf"; }\n',
      '}\n',
      'abstract class Forme { abstract double aire(); }</code></pre>',
      '<p>Le polymorphisme exécute la version du type réel de l’objet.</p>'
    ].join('\n')),

    bloc('Exceptions', [
      '<pre><code>try {\n',
      '    int v = Integer.parseInt(saisie);\n',
      '} catch (NumberFormatException e) {\n',
      '    System.out.println("saisie invalide");\n',
      '} finally { ... }\n',
      'class SoldeInsuffisant extends Exception {\n',
      '    SoldeInsuffisant(String m) { super(m); }\n',
      '}\n',
      'void retirer(int m) throws SoldeInsuffisant { ... }</code></pre>',
      '<p>throw lance ; throws déclare ; finally s’exécute dans tous les cas.</p>'
    ].join('\n')),

    bloc('Lire l’entrée', [
      '<pre><code>import java.util.Scanner;\n',
      'Scanner sc = new Scanner(System.in);\n',
      'int n = sc.nextInt();     double x = sc.nextDouble();\n',
      'String mot = sc.next();   String ligne = sc.nextLine();</code></pre>',
      '<p>next() lit un mot, nextLine() lit la ligne entière ; ne mélange pas les deux sans précaution.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Oublier le point-virgule ou une accolade.</li>',
      '    <li>Attendre un décimal d’une division entre deux <code>int</code>.</li>',
      '    <li>Dépasser la taille d’un tableau (<code>i &lt; length</code>, jamais <code>&lt;=</code>).</li>',
      '    <li>Comparer deux chaînes avec <code>==</code> au lieu de <code>.equals()</code>.</li>',
      '    <li>Oublier <code>super(...)</code> dans le constructeur d’une classe fille.</li>',
      '    <li>Confondre <code>throw</code> (lancer) et <code>throws</code> (déclarer).</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo Java — ' + course.brand,
      description: 'Mémo du cours de Java B2 : structure, types, contrôle du flux, tableaux, collections, ' +
        'classes, héritage et exceptions sur une page.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
