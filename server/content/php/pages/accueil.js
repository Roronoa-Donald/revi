/**
 * Pages accueil, sommaire et atelier du cours « PHP POO » B2.
 */
'use strict';

const { ic, box, crumb } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const toc = chapterList.map(chapitre =>
    '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
    '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span></span></a>'
  ).join('\n');

  const body = [
    crumb(course, [{ href: '/index.html', label: 'Portail des cours' }, { label: course.brand }]),
    '  <div class="chapmeta">',
    '    <span class="tag">Licence 2 · B2</span>',
    '    <span class="tag tag--time">Développement objet</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>créer des classes, des objets et des constructeurs propres ;</li>',
      '      <li>protéger l’état d’un objet par l’encapsulation et des setters qui valident ;</li>',
      '      <li>factoriser par héritage, classes abstraites et interfaces ;</li>',
      '      <li>organiser le code avec traits, namespaces et chargement automatique ;</li>',
      '      <li>signaler les situations anormales par des exceptions et les intercepter ;</li>',
      '      <li>dialoguer avec une base de données via PDO sans jamais s’exposer à l’injection ;</li>',
      '      <li>assembler un petit service (liste de tâches) en couches.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le cours historique de PHP objet couvre les classes, l’encapsulation, l’héritage, les namespaces, ' +
      'les exceptions et PDO. Ce cours en garde le plan et fait manipuler chaque mécanisme <strong>en PHP 8</strong> ' +
      ': le même langage qu’un serveur réel, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : vous écrivez vraiment la ' +
      'classe, elle est réellement exécutée, puis corrigée par des tests que vous ne voyez pas. La logique écrite ' +
      'ici se rejoue telle quelle dans une application.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo PHP</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de code</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'PHP POO B2 — objets, architecture et base de données | Cours Interactif',
      description: course.description,
      active: null,
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const toc = chapterList.map(chapitre => {
    const lock = chapitre.free
      ? '<br><span class="locknote">Accès libre</span>'
      : '<br><span class="locknote">' + ic('lock') + ' B2 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres, des premiers objets jusqu’à PDO et l’architecture. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B2 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en PHP</strong> à écrire et à exécuter ' +
    'dans la page : votre programme est réellement lancé, puis corrigé par des tests que vous ne voyez pas. ' +
    'L’<a href="atelier.html">atelier de code</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo PHP</span><br><span class="toc__d">Syntaxe des classes, visibilité, héritage, exceptions et PDO sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Programmes gradués et projet final de liste de tâches.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du PHP directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’examen, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de PHP objet B2 : ' + chapterList.length +
        ' chapitres, exercices PHP exécutables, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de code</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur PHP derrière. Écrivez une classe, exécutez-la ' +
    'et lisez ce qu’elle affiche : c’est ici qu’une règle d’objet devient un programme qui tourne.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre programme PHP tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>fgets(STDIN)</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le programme sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="php"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="sam">',
      '  <script type="text/plain" data-lab-starter><?php',
      '// Zone libre : simulez, cassez, recommencez.',
      '// Rien de ce que vous écrirez ici n’est noté.',
      '//',
      '// Exemple proposé : une petite fiche de contact.',
      '// La fonction renvoie une chaîne « nom (role) » à partir de l’entrée.',
      '',
      'class Contact {',
      '    private $nom;',
      '    private $role;',
      '',
      '    public function __construct(string $nom, string $role) {',
      '        $this->nom = $nom;',
      '        $this->role = $role;',
      '    }',
      '',
      '    public function fiche(): string {',
      '        return $this->nom . " (" . $this->role . ")";',
      '    }',
      '}',
      '',
      '$nom = trim(fgets(STDIN));',
      'echo (new Contact($nom, "etudiant"))->fiche();',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — fiche de contact</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('code') + ' PHP</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prenez un mécanisme ' +
      'du cours (encapsulation, héritage, exception, PDO en mémoire), programmez-le et testez-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le programme proposé construit un objet à partir de l’entrée et l’affiche. Modifiez la classe, ' +
      'ajoute une validation, un second contact, ou remplace tout le programme par le mécanisme que vous voulez ' +
      'vérifier — un setter qui refuse une valeur, une exception personnalisée, une requête préparée.</p>',
      '      <p>Dans une vraie application, ce sera un contrôleur, un dépôt, une base : la structure du programme ' +
      '— lire, construire, afficher — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>sam</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>sam (etudiant)</pre></div>',
      '    </div>',
      '    <p class="lab__note">Déplie « Entrée du programme » et saisis le prénom avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page à la vraie application</h2>',
    '  <p>La simulation a une limite assumée : rien n’est envoyé ni stocké durablement. Elle a une force : ' +
    '<strong>toute la logique se vérifie sans serveur</strong>. Quand le programme affiche les bons résultats ' +
    'sur vos cas limites, le portage est mécanique : la même classe, le même setter, la même requête préparée.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Point au lieu de flèche</strong> : <code>$this.x</code> au lieu de <code>$this-&gt;x</code>.</li>',
      '      <li><strong>Entrée mal lue</strong> : oublier <code>trim()</code> et comparer une chaîne avec un saut de ligne.</li>',
      '      <li><strong>Exception non attrapée</strong> : le programme s’arrête net avec une erreur fatale.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l’atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d’exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n’est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d’exécutions est limité par jour, pour tout le monde. L’atelier n’exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices PHP corrigés ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Objets et classes' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code — programmer en PHP | ' + course.brand,
      description: 'Atelier de code du cours de PHP objet B2 : éditeur dans le navigateur, ' +
        'exécution réelle du programme PHP, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
