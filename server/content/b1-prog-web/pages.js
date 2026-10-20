/**
 * Pages transverses du cours de programmation web B1.
 *
 * Elles ne dépendent que du kit de gabarit : accueil, sommaire, atelier,
 * cartes, mémo, examens blancs, exercices. Les chapitres sont composés par
 * `kit.chapter` à partir des données de `chapitres-1-3.js` / `4-6.js`.
 */
'use strict';

const { ic, box, qcm, cards, bands, crumb } = require('../../../scripts/course-kit');

function chnav(back, forward) {
  const links = ['  <div class="chnav">'];
  if (back) links.push('    <a class="btn" href="' + back.href + '">' + ic('arrow-left') + ' ' + back.label + '</a>');
  if (forward) links.push('    <a class="btn btn--primary" href="' + forward.href + '">' + forward.label + ' ' + ic('arrow-right') + '</a>');
  links.push('  </div>');
  return links.join('\n');
}

function disclaimer(course, extra) {
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — ta note réelle dépend aussi de ton travail.\n  ' +
    (extra || '') + 'Sources : ' + course.sources + '.</p>';
}

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const toc = chapterList.map(chapitre =>
    '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
    '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span></span></a>'
  ).join('\n');

  const body = [
    crumb(course, [{ href: '/index.html', label: 'Portail des cours' }, { label: course.brand }]),
    '  <div class="chapmeta">',
    '    <span class="tag">Licence 1 · B1</span>',
    '    <span class="tag tag--time">Informatique</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>expliquer ce qui se passe entre le clic sur une adresse et l’affichage de la page ;</li>',
      '      <li>écrire un document HTML structuré, sémantique et accessible ;</li>',
      '      <li>construire un formulaire complet, étiqueté, validé et protégé des injections ;</li>',
      '      <li>styliser une page avec des sélecteurs justes et un modèle de boîte maîtrisé ;</li>',
      '      <li>mettre en page en flexbox et en grille, du téléphone au grand écran ;</li>',
      '      <li>rendre une page interactive avec le DOM et les événements.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Chaque chapitre part d’une situation concrète (une page qui ne s’affiche pas, un style qui ne ' +
      's’applique pas, un bouton qui ne réagit pas), pose les notions, montre le code exact, puis se termine ' +
      'par <strong>trois exercices de code en JavaScript</strong> : ton programme est réellement exécuté et ' +
      'corrigé par des tests que tu ne vois pas.</p>',
      '    <p>Les exercices ne manipulent pas le DOM — il n’existe pas hors du navigateur. Ils portent sur ce ' +
      'qui se <em>calcule</em> : décomposer une URL, classer un code HTTP, lire un extrait HTML, valider et ' +
      'échapper une saisie, calculer une spécificité ou une largeur de boîte, placer une cellule de grille. ' +
      'C’est exactement la logique que tu réutiliseras ensuite dans la page.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources du cours</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du JavaScript directement dans la page, sans installation.</span></span></a>',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo du développeur</span><br><span class="toc__d">Balises, sélecteurs, modèles de mise en page et méthodes du DOM sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Entraînement gradué, puis construction d’une page complète, du HTML au JavaScript.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Deux sujets chronométrés proches de l’évaluation, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    box('tech', 'Aucune installation nécessaire', 'terminal', [
      '    <p>L’atelier exécute ton JavaScript sur un service isolé : rien ne tourne sur ta machine, aucun ' +
      'fichier n’est installé. La clé du service reste sur le serveur et n’est jamais transmise au ' +
      'navigateur.</p>'
    ].join('\n')),
    chnav(null, { href: 'sommaire.html', label: 'Sommaire du cours' }),
    disclaimer(course, 'Cours aligné sur les quatre modules du support B1 (introduction au Web, HTML, CSS, JavaScript). ')
  ].join('\n\n');

  return {
    'index.html': {
      title: course.title + ' | ' + course.brand,
      description: course.description,
      active: 'index',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const toc = chapterList.map(chapitre => {
    const lock = chapitre.free
      ? '<br><span class="locknote">Accès libre</span>'
      : '<br><span class="locknote">' + ic('lock') + ' B1 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres, du dialogue HTTP à la manipulation du DOM. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en JavaScript</strong> à écrire et à ' +
    'exécuter dans la page : ton programme est réellement lancé, puis corrigé par des tests que tu ne vois ' +
    'pas. L’<a href="atelier.html">atelier de code</a> permet de tester librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo du développeur</span><br><span class="toc__d">Balises, sélecteurs, mise en page, DOM : l’essentiel sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Entraînement gradué puis page complète à construire.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de code</span><br><span class="toc__d">Écrire et exécuter du JavaScript dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés et corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de programmation web B1 : ' + chapterList.length +
        ' chapitres, exercices JavaScript exécutables, flashcards, mémo et examens blancs.',
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
    '  <p class="lead">Un éditeur dans la page, un vrai moteur JavaScript derrière. Écris un programme, ' +
    'donne-lui une entrée, exécute-le et lis ce qu’il affiche : c’est ici qu’une règle devient un réflexe.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre code JavaScript tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que le script lira sur son entrée standard, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="javascript"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter>// Zone libre : écrivez, exécutez, recommencez.',
      '// Rien de ce que vous écrirez ici n’est noté.',
      '//',
      '// Exemple proposé : lire des notes et afficher le relevé.',
      '// Le script lit n, puis n lignes « nom note ».',
      '',
      'const fs = require("fs");',
      'const lignes = fs.readFileSync(0, "utf8").trim().split("\n");',
      '',
      'const n = Number(lignes[0]);',
      'const eleves = lignes.slice(1, 1 + n).map(ligne => {',
      '  const parties = ligne.trim().split(" ");',
      '  return { nom: parties[0], note: Number(parties[1]) };',
      '});',
      '',
      'const moyenne = eleves.reduce((somme, e) => somme + e.note, 0) / eleves.length;',
      'for (const eleve of eleves) {',
      '  const mention = eleve.note >= moyenne ? "au-dessus" : "en dessous";',
      '  console.log(eleve.nom + " : " + eleve.note + " (" + mention + " de la moyenne)");',
      '}',
      'console.log("moyenne : " + moyenne.toFixed(2));',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — relevé de notes</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' JavaScript</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends une notion du ' +
      'cours — une règle de validation, un calcul de largeur, un tri de données — programme-la et teste-la sur ' +
      'des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé lit une liste d’élèves et affiche chaque note comparée à la moyenne. Modifie ' +
      'les données, change la règle de comparaison, ou remplace tout le script par le calcul que tu veux ' +
      'vérifier.</p>',
      '      <p>Le navigateur n’est jamais montré ici : on travaille sur des données, pas sur une page. C’est ' +
      'volontaire — la logique s’isole, puis se réutilise dans le DOM.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3',
      'Ada 18',
      'Linus 15',
      'Bob 8</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>Ada : 18 (au-dessus de la moyenne)',
      'Linus : 15 (au-dessus de la moyenne)',
      'Bob : 8 (en dessous de la moyenne)',
      'moyenne : 13.67</pre></div>',
      '    </div>',
      '    <p class="lab__note">Quatre lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>Du code au comportement</h2>',
    '  <p>Ce qui se vérifie dans l’atelier, c’est la logique : une règle de validation qui accepte ou refuse, ' +
    'un calcul de spécificité, une conversion d’unités, un tri. Une fois qu’elle est juste, la même logique ' +
    'se branche sur un élément du DOM en trois lignes : sélectionner, écouter, afficher.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Les chaînes déguisées en nombres</strong> : tout ce qui sort d’un formulaire est du texte. <code>"12" + 1</code> donne <code>"121"</code>.</li>',
      '      <li><strong>Le tri sans fonction de comparaison</strong> : <code>sort()</code> trie par ordre alphabétique, donc <code>[10, 9, 100]</code> devient <code>[10, 100, 9]</code>.</li>',
      '      <li><strong>Le tableau modifié sans le vouloir</strong> : <code>sort()</code> réordonne le tableau d’origine, contrairement à <code>map()</code> et <code>filter()</code>.</li>',
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
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices JavaScript corrigés ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le cours est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Le Web' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code — écrire du JavaScript | ' + course.brand,
      description: 'Atelier de code du cours de programmation web B1 : éditeur dans le navigateur, exécution ' +
        'réelle du programme JavaScript, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo du développeur' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de programmation web B1 : notions clés des ' +
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
    '  <h1>Mémo du développeur web</h1>',
    '  <p class="lead">Balises, sélecteurs, modèles de mise en page et méthodes du DOM sur une page. À garder ' +
    'ouvert pendant les exercices et l’atelier.</p>',

    bloc('URL et HTTP', [
      '<pre><code>https://campus.exemple.fr:443/cours/index.html?page=2&amp;tri=asc#section-3\n',
      '└┬─┘   └───────┬───────┘└┬┘└────────┬────────┘└─────┬─────┘└───┬────┘\n',
      'protocole      hôte     port     chemin          requête     fragment\n',
      '\n',
      'Le fragment (#…) ne part jamais au serveur.</code></pre>',
      '<table>',
      '    <tr><th>Méthode</th><th>Intention</th><th>Idempotente</th></tr>',
      '    <tr><td><code>GET</code></td><td>lire</td><td>oui</td></tr>',
      '    <tr><td><code>POST</code></td><td>créer</td><td>non</td></tr>',
      '    <tr><td><code>PUT</code></td><td>remplacer</td><td>oui</td></tr>',
      '    <tr><td><code>PATCH</code></td><td>modifier une partie</td><td>non</td></tr>',
      '    <tr><td><code>DELETE</code></td><td>supprimer</td><td>oui</td></tr>',
      '  </table>',
      '<table>',
      '    <tr><th>Famille</th><th>Sens</th><th>Exemples</th></tr>',
      '    <tr><td>2xx</td><td>succès</td><td>200, 201, 204</td></tr>',
      '    <tr><td>3xx</td><td>redirection</td><td>301, 302, 304</td></tr>',
      '    <tr><td>4xx</td><td>erreur du client</td><td>400, 403, 404</td></tr>',
      '    <tr><td>5xx</td><td>erreur du serveur</td><td>500, 502, 503</td></tr>',
      '  </table>'
    ].join('\n')),

    bloc('Structure HTML', [
      '<pre><code>&lt;!DOCTYPE html&gt;\n',
      '&lt;html lang="fr"&gt;\n',
      '  &lt;head&gt;\n',
      '    &lt;meta charset="UTF-8"&gt;\n',
      '    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;\n',
      '    &lt;title&gt;…&lt;/title&gt;\n',
      '  &lt;/head&gt;\n',
      '  &lt;body&gt; … &lt;/body&gt;\n',
      '&lt;/html&gt;</code></pre>',
      '<table>',
      '    <tr><th>Balise</th><th>Rôle</th></tr>',
      '    <tr><td>header / footer</td><td>en-tête et pied de page</td></tr>',
      '    <tr><td>nav</td><td>liens de navigation</td></tr>',
      '    <tr><td>main</td><td>contenu principal, unique</td></tr>',
      '    <tr><td>article</td><td>contenu autonome</td></tr>',
      '    <tr><td>section</td><td>regroupement thématique titré</td></tr>',
      '    <tr><td>aside</td><td>contenu annexe</td></tr>',
      '  </table>',
      '<p>Règles : un seul <code>h1</code>, descente d’un niveau à la fois, <code>alt</code> sur chaque image ' +
      'informative, <code>caption</code> et <code>scope</code> dans chaque tableau de données.</p>'
    ].join('\n')),

    bloc('Formulaires et validation', [
      '<pre><code>&lt;form action="/notes/ajouter" method="post"&gt;\n',
      '  &lt;label for="note"&gt;Note sur 20&lt;/label&gt;\n',
      '  &lt;input id="note" name="note" type="number" min="0" max="20" step="0.5" required&gt;\n',
      '  &lt;button type="submit"&gt;Enregistrer&lt;/button&gt;\n',
      '&lt;/form&gt;</code></pre>',
      '<p><code>name</code> est obligatoire pour être transmis ; <code>label for</code> doit désigner l’<code>id</code>. ' +
      'Les contraintes natives : <code>required</code>, <code>min</code>, <code>max</code>, ' +
      '<code>minlength</code>, <code>maxlength</code>, <code>pattern</code>, <code>type</code>.</p>',
      '<pre><code>échappement (ordre imposé)\n',
      '&amp;  → &amp;amp;\n',
      '&lt;  → &amp;lt;\n',
      '&gt;  → &amp;gt;\n',
      '"  → &amp;quot;\n',
      '\'  → &amp;#39;\n',
      '\n',
      'affichage : textContent = texte    (sûr)\n',
      '            innerHTML   = texte    (à éviter pour une saisie)</code></pre>'
    ].join('\n')),

    bloc('Sélecteurs et spécificité', [
      '<table>',
      '    <tr><th>Sélecteur</th><th>Cible</th></tr>',
      '    <tr><td><code>p</code></td><td>toutes les balises p</td></tr>',
      '    <tr><td><code>.item</code></td><td>class="item"</td></tr>',
      '    <tr><td><code>#app</code></td><td>id="app"</td></tr>',
      '    <tr><td><code>nav a</code></td><td>descendants</td></tr>',
      '    <tr><td><code>ul &gt; li</code></td><td>enfants directs</td></tr>',
      '    <tr><td><code>a:hover</code></td><td>état survolé</td></tr>',
      '    <tr><td><code>li:nth-child(2)</code></td><td>deuxième enfant</td></tr>',
      '  </table>',
      '<pre><code>spécificité = (identifiants, classes, types)\n',
      '\n',
      'p                  → 0 0 1\n',
      '.item              → 0 1 0\n',
      'div#main.item p    → 1 1 2\n',
      '#app section h2    → 1 0 2\n',
      '\n',
      'ordre d’application : spécificité, puis ordre d’apparition\n',
      '!important passe avant tout — à éviter</code></pre>'
    ].join('\n')),

    bloc('Modèle de boîte et unités', [
      '<pre><code>content-box (défaut)   largeur occupée = width + 2·padding + 2·border\n',
      'border-box             largeur occupée = width\n',
      'place totale           largeur occupée + 2·margin\n',
      '\n',
      '*, *::before, *::after { box-sizing: border-box; }</code></pre>',
      '<table>',
      '    <tr><th>Unité</th><th>Relative à</th></tr>',
      '    <tr><td><code>px</code></td><td>valeur absolue</td></tr>',
      '    <tr><td><code>rem</code></td><td>taille de police de la racine</td></tr>',
      '    <tr><td><code>em</code></td><td>taille de police du parent</td></tr>',
      '    <tr><td><code>%</code></td><td>dimension du parent</td></tr>',
      '    <tr><td><code>vw</code> / <code>vh</code></td><td>fenêtre</td></tr>',
      '  </table>'
    ].join('\n')),

    bloc('Mise en page et responsive', [
      '<pre><code>.barre {',
      '  display: flex;',
      '  justify-content: space-between;   /* axe principal */',
      '  align-items: center;              /* axe transversal */',
      '  gap: 16px;',
      '  flex-wrap: wrap;',
      '}',
      '',
      '.galerie {',
      '  display: grid;',
      '  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));',
      '  gap: 12px;',
      '}',
      '',
      'h1 { font-size: clamp(1.6rem, 4vw, 2.8rem); }',
      '',
      '@media (min-width: 600px) { .galerie { grid-template-columns: repeat(2, 1fr); } }\n',
      '@media (min-width: 900px) { .galerie { grid-template-columns: repeat(3, 1fr); } }</code></pre>',
      '<p>Flux normal par défaut ; <code>display</code> pour changer le comportement ; ' +
      '<code>position</code> pour sortir du flux (avec un parent <code>relative</code>).</p>'
    ].join('\n')),

    bloc('JavaScript et DOM', [
      '<pre><code>const fs = require("fs");                              // hors navigateur',
      'const lignes = fs.readFileSync(0, "utf8").trim().split("\n");\n',
      '\n',
      'const eleves = lignes.map(l => l.trim().split(" "));',
      'const admis = eleves',
      '  .filter(([nom, note]) => Number(note) >= 10)',
      '  .sort((a, b) => Number(b[1]) - Number(a[1]));\n',
      '\n',
      '// dans une page :',
      'const zone = document.querySelector("#liste");',
      'zone.textContent = "";                       // vider proprement',
      'const item = document.createElement("li");',
      'item.textContent = "Ada : 18";               // jamais innerHTML pour une saisie',
      'zone.append(item);\n',
      '\n',
      'bouton.addEventListener("click", () => { … });',
      'formulaire.addEventListener("submit", e => { e.preventDefault(); … });</code></pre>',
      '<table>',
      '    <tr><th>Méthode</th><th>Effet</th></tr>',
      '    <tr><td><code>map</code></td><td>transforme chaque élément (nouveau tableau)</td></tr>',
      '    <tr><td><code>filter</code></td><td>garde ceux qui passent un test</td></tr>',
      '    <tr><td><code>sort</code></td><td>trie — et modifie le tableau d’origine</td></tr>',
      '    <tr><td><code>querySelector</code></td><td>premier correspondant, ou <code>null</code></td></tr>',
      '    <tr><td><code>querySelectorAll</code></td><td>tous les correspondants</td></tr>',
      '    <tr><td><code>addEventListener</code></td><td>écouter un événement</td></tr>',
      '  </table>'
    ].join('\n')),

    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Mémo rédigé d’après les quatre modules du support B1. ')
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo du développeur web — ' + course.brand,
      description: 'Mémo complet du cours de programmation web B1 : URL et HTTP, structure HTML, formulaires, ' +
        'sélecteurs CSS, modèle de boîte, mise en page responsive et méthodes du DOM.',
      active: 'formules',
      body
    }
  };
}

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1',
      intro: 'Sujet type — lecture du Web, HTML et CSS, d’après les évaluations B1.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/4 — URL et HTTP',
          text: 'Décomposez l’URL <code>https://campus.exemple.fr:8443/cours/index.html?module=css&amp;page=3#quiz</code> ' +
            'en protocole, hôte, port, chemin, requête et fragment, puis précisez ce qui est réellement transmis au serveur.',
          sol: 'protocole : <code>https</code> — hôte : <code>campus.exemple.fr</code> — port : <code>8443</code> — ' +
            'chemin : <code>/cours/index.html</code> — requête : <code>module=css&amp;page=3</code> — fragment : <code>quiz</code>.\n' +
            'Le fragment ne part <strong>jamais</strong> au serveur : il reste dans le navigateur. Tout le reste ' +
            '(hôte, port, chemin, requête) fait partie de la demande.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Structure HTML',
          text: 'Écrivez le squelette d’une page de relevé de notes : en-tête avec un titre et une navigation, ' +
            'contenu principal contenant deux sections titrées, puis un pied de page. La page doit être ' +
            'correctement encodée, en français, et utilisable sur téléphone.',
          sol: '<code>&lt;!DOCTYPE html&gt;</code> puis <code>&lt;html lang="fr"&gt;</code> ; dans le ' +
            '<code>head</code> : <code>charset="UTF-8"</code>, <code>viewport</code> et un <code>title</code>.\n' +
            'Le corps contient <code>&lt;header&gt;</code> (avec <code>h1</code> et <code>nav</code>), ' +
            '<code>&lt;main&gt;</code> avec deux <code>&lt;section&gt;</code> portant chacune un ' +
            '<code>h2</code> (et non <code>h3</code> : on descend d’un niveau à la fois), puis ' +
            '<code>&lt;footer&gt;</code>.\n' +
            'Un seul <code>h1</code> dans toute la page.'
        },
        {
          num: 'Exercice 3',
          badge: '/6 — Spécificité CSS',
          text: 'Trois règles visent le même paragraphe : <code>p { color: blue }</code>, ' +
            '<code>.note p { color: green }</code> et <code>#bloc p { color: red }</code>. ' +
            'Le paragraphe est dans <code>&lt;div id="bloc" class="note"&gt;</code>. Quelle couleur l’emporte, et pourquoi ?',
          sol: 'Spécificités : <code>p</code> → 0 0 1 ; <code>.note p</code> → 0 1 1 ; <code>#bloc p</code> → 1 0 1.\n' +
            'La comparaison se fait compteur par compteur, en partant de la gauche : les identifiants l’emportent ' +
            'avant même de regarder les classes. Le texte est donc <strong>en rouge</strong>.\n' +
            'L’ordre d’apparition ne joue pas ici : la spécificité tranche d’abord.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Modèle de boîte',
          text: 'Une carte porte <code>width: 300px; padding: 20px; border: 5px; margin: 8px;</code>. ' +
            'Donnez la largeur occupée avec <code>content-box</code>, la place totale avec les marges, et la ' +
            'largeur du contenu si l’on passe en <code>border-box</code>.',
          sol: '<code>content-box</code> : 300 + 2×20 + 2×5 = <strong>350 px</strong>.\n' +
            'Place totale : 350 + 2×8 = <strong>366 px</strong> (les marges sont toujours extérieures).\n' +
            '<code>border-box</code> : le contenu dispose de 300 − 40 − 10 = <strong>250 px</strong>.\n' +
            'Conclusion : la même déclaration produit deux mises en page très différentes selon ' +
            '<code>box-sizing</code>.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté formulaires, mise en page responsive et JavaScript.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Formulaire',
          text: 'Écrivez le champ d’un formulaire qui collecte une note sur 20, bornée, obligatoire, avec une ' +
            'étiquette reliée. Indiquez ensuite où doit être vérifiée la valeur, et pourquoi.',
          sol: '<code>&lt;label for="note"&gt;Note sur 20&lt;/label&gt;</code> puis ' +
            '<code>&lt;input id="note" name="note" type="number" min="0" max="20" step="0.5" required&gt;</code>.\n' +
            'Le <code>name</code> est indispensable pour que la valeur soit transmise.\n' +
            'La vérification doit exister <strong>côté serveur</strong> : les attributs HTML aident ' +
            'l’utilisateur mais se contournent en désactivant le JavaScript ou en envoyant une requête directe.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Étiquettes',
          text: 'Pourquoi un <code>placeholder</code> ne remplace-t-il pas une <code>&lt;label&gt;</code> ? ' +
            'Donnez deux arguments.',
          sol: '1) Le texte du placeholder <strong>disparaît dès la première frappe</strong> : l’information ' +
            'n’est plus disponible au moment où l’on relit sa saisie.\n' +
            '2) Il n’est pas toujours lu par les lecteurs d’écran, et il ne décrit pas le champ à un lecteur ' +
            'qui arrive dessus au clavier.\n' +
            'Une étiquette visible et reliée par <code>for</code>/<code>id</code> rend en plus tout le texte ' +
            'cliquable, ce qui agrandit la cible sur téléphone.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Grille responsive',
          text: 'Écrivez une galerie qui affiche une colonne sur téléphone, deux sur tablette (≥ 600 px) et ' +
            'trois sur bureau (≥ 900 px), en utilisant la méthode mobile first.',
          sol: '<code>.galerie { display: grid; gap: 16px; grid-template-columns: 1fr; }</code>\n' +
            'puis <code>@media (min-width: 600px) { .galerie { grid-template-columns: repeat(2, 1fr); } }</code>\n' +
            'et <code>@media (min-width: 900px) { .galerie { grid-template-columns: repeat(3, 1fr); } }</code>\n' +
            'Mobile first : la règle de base décrit le plus petit écran, chaque palier <em>ajoute</em> une ' +
            'possibilité. Ne pas oublier la balise <code>viewport</code> dans le <code>head</code>, sinon ' +
            'les paliers ne se déclenchent pas comme prévu.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — DOM et événements',
          text: 'Un formulaire contient un champ <code>#note</code> et un bouton <code>#calcul</code>. Écrivez ' +
            'le JavaScript qui affiche « Admis » si la note vaut au moins 10, « Non admis » sinon, dans ' +
            'l’élément <code>#message</code> — sans faille de sûreté.',
          sol: 'Sélectionner (<code>querySelector</code>), écouter (<code>addEventListener("click", …)</code>), ' +
            'lire la valeur (<code>.value</code>, toujours une chaîne), convertir (<code>Number()</code>), ' +
            'valider avec <code>Number.isNaN()</code>, puis afficher :\n' +
            '<code>message.textContent = note &gt;= 10 ? "Admis" : "Non admis";</code>\n' +
            'Le nombre se vérifie avec <code>&gt;= 10</code> sur un nombre : comparer directement la chaîne ' +
            'fonctionne par conversion implicite, mais c’est une source d’erreur à éviter.'
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
    { stem: 'Quelle partie d’une URL ne part jamais au serveur ?', opts: ['le chemin', 'le fragment après #', 'les paramètres après ?'], correct: 1, exp: 'Le fragment reste dans le navigateur.' },
    { stem: 'Quelle méthode HTTP est idempotente ?', opts: ['POST', 'DELETE', 'PATCH'], correct: 1, exp: 'DELETE, GET, PUT, HEAD, OPTIONS et TRACE le sont.' },
    { stem: 'Que signifie un statut 503 ?', opts: ['la ressource n’existe pas', 'le serveur n’est pas disponible', 'il faut s’identifier'], correct: 1, exp: '5xx : erreur du serveur ; 503 signale une indisponibilité.' },
    { stem: 'Quelle balise introduit le contenu principal ?', opts: ['<section>', '<main>', '<article>'], correct: 1, exp: 'main est unique par page et délimite le contenu principal.' },
    { stem: 'Quel attribut permet à un champ d’être transmis ?', opts: ['id', 'name', 'placeholder'], correct: 1, exp: 'Le couple name/valeur est ce qui voyage dans la requête.' },
    { stem: 'Quelle spécificité pour « #bloc p » ?', opts: ['0 1 1', '1 0 1', '1 1 1'], correct: 1, exp: 'Un identifiant, aucune classe, un type.' },
    { stem: 'Avec border-box, width englobe…', opts: ['le seul contenu', 'contenu + padding + bordure', 'aussi les marges'], correct: 1, exp: 'Les marges restent extérieures à la boîte.' },
    { stem: 'Quel outil pour organiser deux dimensions à la fois ?', opts: ['flexbox', 'grid', 'position: absolute'], correct: 1, exp: 'La grille place des cellules en lignes et colonnes.' },
    { stem: 'Que fait evenement.preventDefault() dans un submit ?', opts: ['il empêche le rechargement de la page', 'il vide les champs', 'il désactive le bouton'], correct: 0, exp: 'Il annule le comportement par défaut du navigateur.' },
    { stem: 'Comment afficher une saisie utilisateur sans risque ?', opts: ['innerHTML', 'textContent', 'insertAdjacentHTML'], correct: 1, exp: 'textContent traite la valeur comme du texte.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’épreuve finale (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu’à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : encodage, hiérarchie des titres, <code>alt</code>, ' +
      'spécificité, bornes des paliers.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible les pièges de spécificité et de boîte.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’épreuve réelle.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit des évaluations B1. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de programmation web B1 : sujets chronométrés proches de ' +
        'l’évaluation, avec corrigés détaillés.',
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
    'produit une véritable page web. Les programmes s’écrivent en JavaScript, comme aux ateliers.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Décompose une URL en protocole, hôte, chemin et requête.',
      'Classe des codes de statut dans leur famille.',
      'Compte les occurrences d’une balise dans un extrait de HTML.',
      'Échappe un texte saisi par un utilisateur.'
    ], [
      'const url = "https://campus.fr/cours/index.html?page=2";',
      'const [protocole, reste] = url.split("://");',
      'const barre = reste.indexOf("/");',
      'const hote = barre === -1 ? reste : reste.slice(0, barre);',
      'const cheminRequete = barre === -1 ? "" : reste.slice(barre);',
      'const interrogation = cheminRequete.indexOf("?");',
      'const chemin = interrogation === -1 ? cheminRequete : cheminRequete.slice(0, interrogation);',
      'const requete = interrogation === -1 ? "-" : cheminRequete.slice(interrogation + 1);',
      'console.log(protocole, hote, chemin || "/", requete);',
      '',
      'const familles = { 1: "information", 2: "succès", 3: "redirection", 4: "erreur client", 5: "erreur serveur" };',
      'for (const code of [200, 404, 503]) console.log(code + " " + familles[Math.floor(code / 100)]);',
      '',
      'const html = "<h1>Titre</h1><p>Texte</p><h2>Suite</h2>";',
      'console.log((html.match(/<h[1-6]>/g) || []).length + " titres");',
      '',
      'const echapper = texte => texte',
      '  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")',
      '  .replace(/"/g, "&quot;").replace(/\'/g, "&#39;");',
      'console.log(echapper(\'<b>Coucou & "toi"</b>\'));'
    ].join('\n')),

    '  <h2>Consolidation (maîtrise)</h2>',
    item('Niveau intermédiaire', 'n3', [
      'Calcule la largeur occupée par une boîte de 250 px avec 15 px de padding, 3 px de bordure et 6 px de marge, dans les deux modèles de boîte.',
      'Calcule la spécificité de <code>article.note &gt; h2 + p</code> — et explique le rôle du <code>+</code>.',
      'Convertis 1,25 rem et 2 em en pixels pour une base de 18 px.',
      'Trie une liste d’élèves par note décroissante, puis par nom en cas d’égalité.'
    ], [
      'const [w, p, b, m] = [250, 15, 3, 6];',
      'console.log(w + 2 * p + 2 * b);      // 286  (content-box)',
      'console.log(w + 2 * m);              // 262  (place totale)',
      'console.log(w - 2 * p - 2 * b);      // 214  (contenu en border-box)',
      '',
      '// article.note > h2 + p  →  0 identifiant, 2 classes, 3 types',
      '// "." compte comme une classe ; ">" = enfant direct ; "+" = frère immédiatement suivant',
      '',
      'const base = 18;',
      'console.log((1.25 * base).toFixed(2), (2 * base).toFixed(2));   // 22.50 36.00',
      '',
      'const eleves = [',
      '  { nom: "Bo", note: 12 }, { nom: "Al", note: 12 }, { nom: "Cy", note: 15 }',
      '];',
      'const tri = [...eleves].sort((a, b) => b.note - a.note || a.nom.localeCompare(b.nom));',
      'console.log(tri.map(e => e.nom + " " + e.note));   // ["Cy 15", "Al 12", "Bo 12"]'
    ].join('\n')),

    '  <h2>Approfondissement (examen)</h2>',
    item('Niveau examen', 'n5', [
      'Une page contient <code>&lt;h1&gt;</code>, <code>&lt;h3&gt;</code>, <code>&lt;h2&gt;</code>, <code>&lt;h4&gt;</code>. La structure des titres est-elle conforme ? Justifie et propose une correction.',
      'Deux feuilles de style se contredisent : <code>a { color: red }</code> dans la première, <code>.menu a { color: blue }</code> dans la seconde. Laquelle gagne, et que se passe-t-il si l’on ajoute <code>!important</code> à la première ?',
      'Un utilisateur saisit « &lt;script&gt;alert(1)&lt;/script&gt; » dans un commentaire. Explique ce qui se passe si l’application l’affiche avec <code>innerHTML</code>, puis avec <code>textContent</code>.',
      'Écris un programme qui lit n lignes « nom note », puis affiche la moyenne et le nom du major.'
    ], [
      '// 1) non conforme : après h1, la descente à h3 saute le niveau 2',
      '//    et remonter à h2 puis descendre à h4 reste incohérent.',
      '//    Correction : h1, h2, h3, h3 (ou h1, h2, h3, h4 selon le sens voulu).',
      '',
      '// 2) .menu a (0 1 1) est plus spécifique que a (0 0 1) : le bleu gagne.',
      '//    Avec !important sur la première règle, le rouge l’emporte, quelle que soit',
      '//    la spécificité — d’où l’intérêt de ne pas s’en servir.',
      '',
      '// 3) avec innerHTML, la chaîne devient un élément script et le navigateur',
      '//    l’exécute : injection HTML (XSS). Avec textContent, la chaîne est',
      '//    affichée telle quelle : les chevrons restent visibles, rien n’est exécuté.',
      '',
      'const fs = require("fs");',
      'const lignes = fs.readFileSync(0, "utf8").trim().split("\n");',
      'const n = Number(lignes[0]);',
      'const eleves = lignes.slice(1, 1 + n).map(ligne => {',
      '  const parties = ligne.trim().split(" ");',
      '  return { nom: parties.slice(0, -1).join(" "), note: Number(parties[parties.length - 1]) };',
      '});',
      'const moyenne = eleves.reduce((s, e) => s + e.note, 0) / eleves.length;',
      'const major = eleves.reduce((meilleur, e) => (e.note > meilleur.note ? e : meilleur));',
      'console.log("moyenne : " + moyenne.toFixed(2));',
      'console.log("major : " + major.nom + " (" + major.note + ")");'
    ].join('\n')),

    '  <h2>Projet intégrateur — relevé de notes interactif</h2>',
    '  <p>Le projet réunit les six chapitres : une page unique, autonome, qui présente un relevé de notes et ' +
    'permet d’ajouter une note. Aucune bibliothèque : HTML, CSS et JavaScript natifs.</p>',
    '  <div class="box box--objectifs">',
    '    <div class="box__title">' + ic('target') + ' Cahier des charges</div>',
    '    <ol>',
    '      <li><strong>Structure</strong> : document valide, un <code>h1</code>, un <code>header</code> avec navigation, un <code>main</code>, un <code>footer</code>, hiérarchie de titres sans saut.</li>',
    '      <li><strong>Tableau de données</strong> : les notes sont dans un <code>table</code> avec <code>caption</code> et <code>th scope</code>.</li>',
    '      <li><strong>Formulaire</strong> : deux champs étiquetés (nom, note bornée 0–20 et obligatoire), validation native, puis validation JavaScript avec message explicite.</li>',
    '      <li><strong>Style</strong> : sélecteurs par classes (pas d’identifiant pour styler), <code>box-sizing: border-box</code> global, unités <code>rem</code> pour le texte.</li>',
    '      <li><strong>Mise en page</strong> : flexbox pour l’en-tête, grille <code>auto-fit</code> pour les cartes de synthèse, mobile first avec au moins deux paliers.</li>',
    '      <li><strong>Interaction</strong> : bouton d’ajout, <code>preventDefault()</code>, mise à jour du tableau et d’une moyenne, saisie affichée avec <code>textContent</code>.</li>',
    '      <li><strong>Accessibilité</strong> : contraste du texte ≥ 4,5:1, focus visible sur les boutons, <code>alt</code> sur les images.</li>',
    '    </ol>',
    '  </div>',
    '  <details><summary>Solution de référence</summary><div class="sol"><pre><code>' + [
      '&lt;!DOCTYPE html&gt;',
      '&lt;html lang="fr"&gt;',
      '&lt;head&gt;',
      '  &lt;meta charset="UTF-8"&gt;',
      '  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;',
      '  &lt;title&gt;Relevé de notes&lt;/title&gt;',
      '  &lt;style&gt;',
      '    *, *::before, *::after { box-sizing: border-box; }',
      '    body { font-family: system-ui, sans-serif; margin: 0; padding: 1.5rem; }',
      '    header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }',
      '    .grille { display: grid; gap: 1rem;',
      '              grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); }',
      '    .carte { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; }',
      '    table { border-collapse: collapse; width: 100%; }',
      '    th, td { border-bottom: 1px solid #ddd; padding: 0.5rem; text-align: left; }',
      '    .message { font-weight: 700; }',
      '    @media (min-width: 900px) { .grille { grid-template-columns: repeat(3, 1fr); } }',
      '  &lt;/style&gt;',
      '&lt;/head&gt;',
      '&lt;body&gt;',
      '  &lt;header&gt;',
      '    &lt;h1&gt;Relevé de notes&lt;/h1&gt;',
      '    &lt;nav&gt;&lt;a href="#notes"&gt;Notes&lt;/a&gt;&lt;/nav&gt;',
      '  &lt;/header&gt;',
      '  &lt;main&gt;',
      '    &lt;section id="notes"&gt;',
      '      &lt;h2&gt;Notes&lt;/h2&gt;',
      '      &lt;table&gt;',
      '        &lt;caption&gt;Notes du semestre&lt;/caption&gt;',
      '        &lt;thead&gt;&lt;tr&gt;&lt;th scope="col"&gt;Nom&lt;/th&gt;&lt;th scope="col"&gt;Note&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;',
      '        &lt;tbody id="corps"&gt;&lt;/tbody&gt;',
      '      &lt;/table&gt;',
      '      &lt;div class="grille"&gt;',
      '        &lt;div class="carte"&gt;&lt;h3&gt;Moyenne&lt;/h3&gt;&lt;p id="moyenne"&gt;—&lt;/p&gt;&lt;/div&gt;',
      '      &lt;/div&gt;',
      '    &lt;/section&gt;',
      '    &lt;section&gt;',
      '      &lt;h2&gt;Ajouter une note&lt;/h2&gt;',
      '      &lt;form id="form"&gt;',
      '        &lt;label for="nom"&gt;Nom&lt;/label&gt;',
      '        &lt;input id="nom" name="nom" type="text" required&gt;',
      '        &lt;label for="note"&gt;Note sur 20&lt;/label&gt;',
      '        &lt;input id="note" name="note" type="number" min="0" max="20" step="0.5" required&gt;',
      '        &lt;button type="submit"&gt;Ajouter&lt;/button&gt;',
      '      &lt;/form&gt;',
      '      &lt;p class="message" id="message" role="status"&gt;&lt;/p&gt;',
      '    &lt;/section&gt;',
      '  &lt;/main&gt;',
      '  &lt;footer&gt;&lt;p&gt;Relevé non officiel.&lt;/p&gt;&lt;/footer&gt;',
      '  &lt;script src="app.js" defer&gt;&lt;/script&gt;',
      '&lt;/body&gt;',
      '&lt;/html&gt;',
      '',
      '/* app.js */',
      'const notes = [{ nom: "Ada", note: 18 }, { nom: "Linus", note: 15 }];',
      '',
      'const corps = document.querySelector("#corps");',
      'const form = document.querySelector("#form");',
      'const message = document.querySelector("#message");',
      '',
      'function afficher() {',
      '  corps.textContent = "";',
      '  for (const ligne of notes) {',
      '    const tr = document.createElement("tr");',
      '    const nom = document.createElement("th");',
      '    nom.scope = "row";',
      '    nom.textContent = ligne.nom;',
      '    const note = document.createElement("td");',
      '    note.textContent = String(ligne.note);',
      '    tr.append(nom, note);',
      '    corps.append(tr);',
      '  }',
      '  const somme = notes.reduce((s, l) => s + l.note, 0);',
      '  document.querySelector("#moyenne").textContent =',
      '    notes.length ? (somme / notes.length).toFixed(2) : "—";',
      '}',
      '',
      'form.addEventListener("submit", evenement => {',
      '  evenement.preventDefault();',
      '  const nom = document.querySelector("#nom").value.trim();',
      '  const note = Number(document.querySelector("#note").value);',
      '  if (!nom || Number.isNaN(note) || note &lt; 0 || note &gt; 20) {',
      '    message.textContent = "Nom attendu et note comprise entre 0 et 20.";',
      '    return;',
      '  }',
      '  notes.push({ nom, note });',
      '  message.textContent = "Note ajoutée.";',
      '  form.reset();',
      '  afficher();',
      '});',
      '',
      'afficher();'
    ].join('\n') + '</code></pre></div></details>',
    '  <p>Deux règles gouvernent tout le projet : les données vivent dans un tableau JavaScript, et le DOM ' +
    'n’est qu’un affichage de ce tableau. Reconstruire l’affichage à partir des données (<code>afficher()</code>) ' +
    'évite les incohérences entre ce que l’on voit et ce que l’on calcule.</p>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir des quatre modules du support B1 et des attentes de l’épreuve. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de programmation web B1 : ' +
        'entraînement gradué et page web complète, du HTML au JavaScript.',
      active: 'exercices',
      body
    }
  };
}

/* ======================== Assemblage ======================== */

function render(kit, course, chapterList) {
  const pages = {};
  const chaptersWithNav = chapterList.map((chapitre, index) => {
    const next = chapterList[index + 1];
    return Object.assign({}, chapitre, {
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Chapitre ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier de code' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours de programmation web B1 : ' + chapitre.toc +
        ' Théorie, exemples de code, exercices JavaScript exécutables, QCM corrigés.',
      active: 'ch' + chapitre.n,
      dataChapter: chapitre.n,
      body
    };
  }

  Object.assign(pages, index(course, chapterList));
  Object.assign(pages, sommaire(course, chapterList));
  Object.assign(pages, atelier(course));
  Object.assign(pages, cartes(course, chapterList));
  Object.assign(pages, formules(course));
  Object.assign(pages, examens(course));
  Object.assign(pages, exercices(course));

  return pages;
}

module.exports = { render };
