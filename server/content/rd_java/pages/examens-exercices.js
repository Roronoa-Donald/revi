/**
 * Pages « examens blancs » et « exercices & projet » du cours « Java » B2.
 */
'use strict';

const { ic, crumb, box, qcm, bands } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 — langage et contrôle du flux',
      intro: 'Sujet type examen — types, opérateurs, conditions, boucles, tableaux.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Types',
          text: 'Que vaut 7 / 2 ? Et 7 / 2.0 ? Comment obtenir 3.5 de la première expression ?',
          sol: '<code>7 / 2</code> donne <code>3</code> (division entière) ; <code>7 / 2.0</code> donne ' +
            '<code>3.5</code>.<br>Pour forcer le décimal, un opérande doit l’être : <code>7.0 / 2</code> ou un cast.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Boucles',
          text: 'Écrire une boucle qui calcule la somme des entiers de 1 à n. Quel type de boucle choisir ?',
          sol: '<code>int somme = 0; for (int i = 1; i &lt;= n; i++) somme += i;</code>.<br>Le nombre ' +
            'd’itérations est connu : une boucle <code>for</code> est la plus directe.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Conditions',
          text: 'Écrire une condition qui affiche « majeur » si l’âge est supérieur ou égal à 18, sinon « mineur ».',
          sol: '<code>System.out.println(age &gt;= 18 ? "majeur" : "mineur");</code><br>L’opérateur ternaire ' +
            'convient à une décision unique en une expression.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Tableaux',
          text: 'Pourquoi écrire for (int i = 1; i &lt; t.length; i++) pour trouver le maximum de t ?',
          sol: 'On initialise <code>max = t[0]</code> puis on parcourt à partir de 1.<br>Initialiser à 0 ' +
            'ignorerait des valeurs négatives ; la borne <code>i &lt; t.length</code> évite le dépassement.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — objets, collections et exceptions',
      intro: 'Sujet orienté modélisation, collections, héritage et robustesse.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Encapsulation',
          text: 'Écrire une classe Compte avec un solde privé, un getter, et un retirer() qui refuse un montant supérieur au solde. Quelle exception utiliser ?',
          sol: '<code>private int solde;</code> avec <code>getSolde()</code>.<br>Dans <code>retirer()</code>, ' +
            'lancer une exception : <code>InvalidArgumentException</code>, <code>IllegalStateException</code> ou ' +
            'une exception métier dédiée.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Collections',
          text: 'Quelle collection choisir pour compter les valeurs distinctes d’une liste ? Pour associer un nom à un âge ?',
          sol: 'Un <code>Set</code> (par exemple <code>HashSet</code>) élimine les doublons : ' +
            '<code>size()</code> donne le nombre de valeurs distinctes.<br>Une <code>Map&lt;String,Integer&gt;</code> ' +
            'associe chaque nom à un âge.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Héritage',
          text: 'Écrire une classe fille Chien qui hérite d’Animal, appelle son constructeur et redéfinit crier(). Que permet le polymorphisme ?',
          sol: '<code>class Chien extends Animal { Chien(String nom) { super(nom); } @Override String crier() ' +
            '{ return "Wouf"; } }</code>.<br>Une variable <code>Animal a = new Chien(...)</code> appelle la ' +
            'version du type réel.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Exceptions',
          text: 'Pourquoi encadrer Integer.parseInt d’un try/catch ? Quelle exception attraper précisément ?',
          sol: 'Une saisie non numérique lève une <code>NumberFormatException</code>.<br>La capturer permet ' +
            'd’afficher un message clair au lieu de laisser le programme s’arrêter.'
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
    { stem: 'Que vaut 7 / 2 ?', opts: ['3.5', '3', '4'], correct: 1, exp: 'Deux int donnent une division entière.' },
    { stem: 'Que fait i++ ?', opts: ['Incrémente i de 1', 'Décrémente', 'Double i'], correct: 0, exp: '++ ajoute 1 à la variable.' },
    { stem: 'Quelle boucle pour un nombre connu d’itérations ?', opts: ['for', 'while', 'switch'], correct: 0, exp: 'for exprime directement les trois parties.' },
    { stem: 'Premier indice d’un tableau ?', opts: ['0', '1', '−1'], correct: 0, exp: 'Les indices vont de 0 à length−1.' },
    { stem: 'Que protège private ?', opts: ['L’accès au code de la classe', 'Rien', 'La vitesse'], correct: 0, exp: 'private réserve l’accès à la classe elle-même.' },
    { stem: 'Quelle collection élimine les doublons ?', opts: ['Set', 'List', 'Map'], correct: 0, exp: 'Un Set ne garde qu’une copie par valeur.' },
    { stem: 'Que fait @Override ?', opts: ['Redéfinit une méthode héritée', 'Créez un objet', 'Supprimez'], correct: 0, exp: 'Il redéfinit la version de la classe mère.' },
    { stem: 'Quand s’exécute finally ?', opts: ['Dans tous les cas', 'Jamais', 'Seulement sans erreur'], correct: 0, exp: 'finally s’exécute après le try ou le catch.' },
    { stem: 'Quelle exception pour parseInt invalide ?', opts: ['NumberFormatException', 'ArithmeticException', 'IOException'], correct: 0, exp: 'La conversion d’un texte non numérique échoue ainsi.' },
    { stem: 'Que déclare throws ?', opts: ['Qu’une méthode peut lever une exception', 'Qu’elle la capture', 'Qu’elle est abstraite'], correct: 0, exp: 'L’appelant doit capturer ou propager.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’examen (durée 2 h, /20). ' +
    'Réalisez-les <strong>sans regarder</strong> les corrigés, puis corrigez-vous sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu’à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : types et division, bornes de boucles, visibilité, ' +
      'signatures de méthodes, types des catch.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible classes, collections et exceptions.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’examen.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit du cours. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Java B2 : sujets chronométrés sur le langage, les objets, ' +
        'les collections, l’héritage et les exceptions, avec corrigés détaillés.',
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
    'assemble une petite gestion d’étudiants. Les programmes sont en Java, comme à l’atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lire deux entiers et afficher leur somme.',
      'Lire un entier et dire s’il est pair.',
      'Calculer la somme des entiers de 1 à n.',
      'Trouver le maximum d’un tableau d’entiers.'
    ], [
      'int a = sc.nextInt();',
      'int b = sc.nextInt();',
      'System.out.println("somme : " + (a + b));',
      '',
      'int n = sc.nextInt();',
      'System.out.println(n % 2 == 0 ? "pair" : "impair");',
      '',
      'int total = 0;',
      'for (int i = 1; i &lt;= n; i++) {',
      '    total += i;',
      '}',
      'System.out.println("somme : " + total);',
      '',
      'int max = t[0];',
      'for (int i = 1; i &lt; t.length; i++) {',
      '    if (t[i] &gt; max) { max = t[i]; }',
      '}'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Écrire une classe Rectangle (largeur, hauteur) avec aire().',
      'Écrire un setter d’âge qui refuse une valeur négative (exception).',
      'Compter les mots distincts avec un Set.',
      'Lire une saisie et gérer le cas non numérique.'
    ], [
      'class Rectangle {',
      '    private final int largeur;',
      '    private final int hauteur;',
      '    Rectangle(int l, int h) { this.largeur = l; this.hauteur = h; }',
      '    int aire() { return largeur * hauteur; }',
      '}',
      '',
      'void setAge(int age) {',
      '    if (age &lt; 0) {',
      '        throw new IllegalArgumentException("age negatif");',
      '    }',
      '    this.age = age;',
      '}',
      '',
      'Set&lt;String&gt; mots = new HashSet&lt;&gt;();',
      'for (int i = 0; i &lt; n; i++) { mots.add(sc.next()); }',
      'System.out.println("distincts : " + mots.size());',
      '',
      'try {',
      '    int v = Integer.parseInt(saisie);',
      '} catch (NumberFormatException e) {',
      '    System.out.println("saisie invalide");',
      '}'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Hiérarchie Forme → Carre, Cercle avec aire() redéfinie : afficher l’aire de chaque forme.',
      'Exception personnalisée SoldeInsuffisant lancée par retirer().',
      'Compter les occurrences de chaque mot avec une Map.',
      'Trier une ArrayList puis afficher ses éléments.'
    ], [
      'abstract class Forme { abstract double aire(); }',
      'class Carre extends Forme {',
      '    private final double cote;',
      '    Carre(double c) { this.cote = c; }',
      '    double aire() { return cote * cote; }',
      '}',
      '',
      'class SoldeInsuffisant extends Exception {',
      '    SoldeInsuffisant(String m) { super(m); }',
      '}',
      'void retirer(int m) throws SoldeInsuffisant {',
      '    if (m &gt; solde) { throw new SoldeInsuffisant("solde insuffisant"); }',
      '    solde -= m;',
      '}',
      '',
      'Map&lt;String,Integer&gt; compte = new HashMap&lt;&gt;();',
      'for (int i = 0; i &lt; n; i++) {',
      '    String mot = sc.next();',
      '    compte.put(mot, compte.getOrDefault(mot, 0) + 1);',
      '}',
      '',
      'ArrayList&lt;Integer&gt; liste = new ArrayList&lt;&gt;();',
      'Collections.sort(liste);',
      'for (int v : liste) { System.out.println(v); }'
    ].join('\n')),

    '  <h2>Projet intégrateur — « gestion d’étudiants »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>On te confie une petite application de gestion d’étudiants. Le programme lit un entier ' +
      '<code>n</code>, puis <code>n</code> lignes au format <code>nom note</code>. Il range chaque étudiant ' +
      'dans une classe <code>Etudiant</code> (nom, note), calcule la moyenne de la promotion, puis affiche ' +
      'la moyenne et les étudiants ayant une note supérieure ou égale à 10.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Modéliser</strong> un étudiant par une classe (attributs privés, getters).</li>',
      '      <li><strong>Lire</strong> les données dans l’ordre : n, puis n lignes « nom note ».</li>',
      '      <li><strong>Calculer</strong> la moyenne de la promotion.</li>',
      '      <li><strong>Filtrer</strong> les étudiants ayant au moins 10 et les afficher.</li>',
      '      <li><strong>Formater</strong> la moyenne sur deux décimales (Locale.US).</li>',
      '      <li><strong>Gérer</strong> le cas limite n = 0 sans erreur.</li>',
      '    </ol>',
      '    <p>Contraintes : attributs privés, méthodes nommées clairement, aucune fuite d’état.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture ordonnée et gestion de n = 0 <strong>20</strong>' },
        { cls: '', text: 'Encapsulation correcte de la classe Etudiant <strong>20</strong>' },
        { cls: '', text: 'Calcul exact de la moyenne <strong>20</strong>' },
        { cls: '', text: 'Filtrage et affichage des étudiants ≥ 10 <strong>20</strong>' },
        { cls: '', text: 'Lisibilité, noms, formatage <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'import java.util.*;',
    '',
    'class Etudiant {',
    '    private final String nom;',
    '    private final int note;',
    '',
    '    Etudiant(String nom, int note) {',
    '        this.nom = nom;',
    '        this.note = note;',
    '    }',
    '',
    '    String getNom() { return nom; }',
    '    int getNote() { return note; }',
    '}',
    '',
    'public class Main {',
    '    public static void main(String[] args) {',
    '        Scanner sc = new Scanner(System.in);',
    '        int n = sc.nextInt();',
    '        ArrayList&lt;Etudiant&gt; etudiants = new ArrayList&lt;&gt;();',
    '        int somme = 0;',
    '        for (int i = 0; i &lt; n; i++) {',
    '            String nom = sc.next();',
    '            int note = sc.nextInt();',
    '            etudiants.add(new Etudiant(nom, note));',
    '            somme += note;',
    '        }',
    '        double moyenne = n == 0 ? 0.0 : (double) somme / n;',
    '        System.out.println("moyenne : " + String.format(Locale.US, "%.2f", moyenne));',
    '        for (Etudiant e : etudiants) {',
    '            if (e.getNote() &gt;= 10) {',
    '                System.out.println(e.getNom() + " : " + e.getNote());',
    '            }',
    '        }',
    '    }',
    '}'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine modélisation, lecture ordonnée, moyenne, filtrage et formatage — ' +
    'l’essentiel des six chapitres en un seul programme.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du cours historique de Java. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de Java B2 : ' +
        'programmes gradués et application de gestion d’étudiants.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
