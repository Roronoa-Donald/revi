/**
 * Pages transverses du cours de Droit B1.
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
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — votre note réelle dépend aussi de votre travail.\n  ' +
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
    '    <span class="tag tag--time">Introduction au droit</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>distinguer droit objectif et droits subjectifs, et caractériser la règle de droit ;</li>',
      '      <li>classer les sanctions et les branches du droit (public, privé) ;</li>',
      '      <li>ordonner les sources du droit et appliquer la hiérarchie des normes ;</li>',
      '      <li>router un dossier entre TPI, Cour d\'Appel et Cour Suprême ;</li>',
      '      <li>dater la personnalité juridique : naissance, décès, absence, disparition, enfant conçu ;</li>',
      '      <li>statuer sur l\'application de la loi dans le temps et l\'abrogation ;</li>',
      '      <li>vérifier la validité d\'un contrat et statuer sur l\'inexécution.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Le support déroule l\'introduction au droit en quatre chapitres (généralités, sources, ' +
      'organisation judiciaire, personnalité juridique), complétés par l\'application de la loi dans le ' +
      'temps et la pratique contractuelle. Ce cours en garde l\'esprit et fait appliquer chaque mécanisme <strong>dans des études de cas</strong> : une grille d’analyse qui reproduit le raisonnement exact du juriste, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : vous écrivez vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que vous ne voyez pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les exemples du support (jour franc, pyramide des normes, succession).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo droit</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Droit B1 — règles, sources, juridictions, contrats | Cours Interactif',
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
      : '<br><span class="locknote">' + ic('lock') + ' B1 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres, du vocabulaire de la règle de droit jusqu\'à la ' +
    'responsabilité contractuelle. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de ' +
    'niveau B1 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas méthodologiques</strong> à écrire et à exécuter ' +
    'dans la page : votre script est réellement lancé, puis corrigé par des tests que vous ne voyez pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo droit</span><br><span class="toc__d">La règle de droit, les sources, la pyramide des normes, les juridictions, le contrat.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le greffe numérique d\'une juridiction.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Résoudre et valider des études de cas directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Droit B1 : ' + chapterList.length +
        ' chapitres, études de cas d’application, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de scripts</h1>',
    '  <p class="lead">Un éditeur interactif dans la page pour résoudre les études de cas. Complétez la grille d’analyse, validez-la et observez le résultat : c\'est ici qu\'une norme devient un contrôle automatisé.</p>',
    box('objectifs', 'Comment fonctionne l\'atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> vérifie votre grille d’analyse sur le cas d’exemple et affiche le résultat obtenu.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>read</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n\'écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l\'éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="analyse"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie juridique.',
      '# Rédigez votre analyse sous forme de grille structurée.',
      '',
      '[Cas 1 — Contrôle de constitutionnalité]',
      '# Données : Loi relative aux libertés publiques',
      'Loi : conforme au bloc de constitutionnalite',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — pyramide des normes</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('book') + ' Étude de cas</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prenez un mécanisme de ' +
      'droit (jour franc, registre des abrogations, routing des dossiers), programmez-le et testez-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé vérifie la hiérarchie : chaque norme doit être de rang inférieur ou égal à ' +
      'la précédente. Ajoutez les blocs (constitutionnalité, conventionnalité, légalité, réglementaire), un ' +
      'compteur de violations, ou remplace tout le script par le mécanisme que vous voulez vérifier.</p>',
      '      <p>Dans un vrai contentieux, ce sera le contrôle de constitutionnalité ou de conventionnalité : ' +
      'la structure du script — lire, comparer, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>4',
      'constitution texte fondamental',
      'traite accord OUA',
      'loi code du travail',
      'loi code des impots</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>texte fondamental : conforme',
      'accord OUA : conforme',
      'code du travail : conforme',
      'code des impots : conforme</pre></div>',
      '    </div>',
      '    <p class="lab__note">Cinq lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai contentieux</h2>',
    '  <p>La simulation a une limite assumée : aucun dossier réel n\'est instruit et aucun texte officiel ' +
    'n\'est modifié. Elle a une force : <strong>toute la logique se vérifie sans risque</strong> — on peut ' +
    'rejouer un contrôle de normes autant de fois que nécessaire. Quand le script reproduit les bons ' +
    'réflexes — lire le texte, identifier son rang, comparer, rapporter — le passage au raisonnement ' +
    'juridique écrit est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Ordre des lectures inversé</strong> : l’étude de cas comporte le texte avant le niveau, ou oublie la ligne d\'entête.</li>',
      '      <li><strong>Cas partiels</strong> : le case ne couvre qu\'un niveau de norme et juge les autres par un défaut silencieux (rang 0).</li>',
      '      <li><strong>Bilan dans la boucle</strong> : le verdict d\'ensemble s\'affiche à chaque norme au lieu d\'une seule fois, après.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l\'atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d\'exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n\'est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d\'exécutions est limité par jour, pour tout le monde. L\'atelier n\'exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois études de cas corrigées ' +
    'automatiquement dans la page. Une fois l\'atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme juridique est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Généralités' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler le droit | ' + course.brand,
      description: 'Atelier de scripts du cours de Droit B1 : éditeur dans le navigateur, validation directe de la grille d’analyse, données du cas, console de sortie et tuteur qui explique les erreurs.',
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
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Revenez à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo droit' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Droit B1 : notions clés des ' +
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
    '  <h1>Mémo droit</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'un raisonnement. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Qualifier : objectif, subjectif, règle', [
      '<pre><code>droit objectif    l\'ensemble des regles (code civil)\n',
      'droits subjectifs les prerogatives reconnues a un sujet (propriete)\n',
      '\n',
      'regle de droit = generale + abstraite + obligatoire + coercitive\n',
      'Carbonnier : « si le droit permet, nous avons le droit de faire »\n',
      '\n',
      'sanctions : penales / civiles / administratives / disciplinaires\n',
      'branches  : droit public (Etat) / droit prive (particuliers)</code></pre>',
      '<p>Une décision individuelle n\'est pas une règle : la généralité manque.</p>'
    ].join('\n')),

    bloc('Sources et pyramide des normes', [
      '<pre><code>sources directes   : loi, coutume\n',
      'sources indirectes : jurisprudence, doctrine\n',
      '\n',
      'loi : adoption → promulgation → publication → jour franc (24 h)\n',
      '     « nul n\'est censé ignorer la loi »\n',
      '\n',
      'Constitution   (bloc de constitutionnalite)\n',
      '  &gt; Traités      (bloc de conventionalite)\n',
      '    &gt; Lois       (bloc de legalite)\n',
      '      &gt; Reglements (decrets, arretes)\n',
      '\n',
      'abrogation : expresse (enoncee) / tacite (incompatibilite)</code></pre>',
      '<p>En cas de conflit, la norme supérieure l\'emporte.</p>'
    ].join('\n')),

    bloc('La loi dans le temps', [
      '<pre><code>situation eteinte avant la loi nouvelle  → loi ancienne\n',
      'situation en cours ou nee apres          → loi nouvelle (effet immediat)\n',
      '\n',
      'article 2 du code civil : « la loi ne dispose que pour l\'avenir »\n',
      'non-retroactivite : pas d\'effet sur les situations passees</code></pre>',
      '<p>Le jour franc court depuis la parution au journal officiel, pas depuis la promulgation.</p>'
    ].join('\n')),

    bloc('Personnalité juridique', [
      '<pre><code>personne physique : naissance → decès\n',
      '  exception : enfant simplement concu (succession, assurance)\n',
      '  absence : sans nouvelles 5 ans   |   disparition : deces probable\n',
      '\n',
      'personne morale : groupement reconnu par la loi\n',
      '  droit public : Etat, collectivites, etablissements publics\n',
      '  droit prive  : societes, associations, fondations</code></pre>',
      '<p>Personnalité → capacité → contrat : la chaîne se vérifie dans cet ordre.</p>'
    ].join('\n')),

    bloc('Justice : principes et juridictions', [
      '<pre><code>nul ne peut se faire justice : juger est un service de l\'Etat\n',
      '\n',
      '1. separation des pouvoirs (juges inamovibles, CSM)\n',
      '2. egalite de tous devant la loi (article 2 de la Constitution)\n',
      '3. double degre de juridiction (correction des erreurs)\n',
      '\n',
      'TPI (1er degre) → Cour d\'Appel (2e degre) → Cour Supreme\n',
      'juridictions specialisees : competences sur des matieres determinees</code></pre>',
      '<p>Le double degré réexamine le litige ; la Cour Suprême vérifie le droit.</p>'
    ].join('\n')),

    bloc('Contrat et responsabilité', [
      '<pre><code>validite : capacite + consentement + objet + cause\n',
      '\n',
      'vices du consentement : erreur, dol, violence → nullite relative\n',
      'lesion : sanctionnee seulement selon la loi\n',
      '\n',
      'inexecution → execution forcee et/ou dommages-interets\n',
      'force majeure (imprevisible + irresistible + exterieur) → dispense\n',
      'sans contrat → responsabilite delictuelle</code></pre>',
      '<p>Nullité relative protège la victime ; nullité absolue protège l\'ordre public.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre droit objectif (les règles) et droits subjectifs (les prérogatives).</li>',
      '    <li>Qualifier de « règle de droit » une décision visant une personne nommée.</li>',
      '    <li>Placer la doctrine parmi les sources directes.</li>',
      '    <li>Faire courir le jour franc depuis la promulgation.</li>',
      '    <li>Rendre la loi nouvelle rétroactive sur les situations éteintes.</li>',
      '    <li>Confondre absence (sans nouvelles) et disparition (décès probable).</li>',
      '    <li>Accorder la force majeure sans les trois critères cumulatifs.</li>',
      '    <li>Chercher un contrat là où il n\'y en a pas (responsabilité délictuelle).</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo droit — ' + course.brand,
      description: 'Mémo du cours de Droit B1 : règle de droit, sanctions, sources, pyramide des normes, ' +
        'personnalité juridique, loi dans le temps, juridictions et contrat sur une page.',
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
      intro: 'Sujet type épreuve — généralités, sources, hiérarchie.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Règle de droit',
          text: 'Qualifier les trois énoncés : (a) « les commerçants doivent tenir une comptabilité » ; (b) « l\'entreprise X est fermée par arrêté » ; (c) « on doit honorer ses parents ». Justifier avec les caractères de la règle de droit.',
          sol: '(a) <strong>règle de droit</strong> : générale et abstraite (vise tous les commerçants), obligatoire et coercitive (sanction étatique). (b) <strong>mesure individuelle</strong> : vise une personne nommée, pas de généralité. (c) <strong>règle morale</strong> : générale mais sans sanction étatique — pas de coercition.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Chronologie',
          text: 'Une loi est votée le 1er septembre, promulguée le 2 et paraît au journal officiel le 3. Dater l\'entrée en vigueur et expliquer la maxime qui s\'y rattache. Une loi paraissant le 3 et abrogeant une disposition le même jour : quel type d\'abrogation ?',
          sol: 'Parution le 3, jour franc le 4, <strong>entrée en vigueur le 5</strong> : 24 h après la parution. Maxime : « nul n\'est censé ignorer la loi » — passé le jour franc, chacun est réputé la connaître. Abrogation qui déclare explicitement la fin de la disposition ancienne : <strong>expresse</strong> (si elle se déduit d\'une simple incompatibilité : tacite).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Hiérarchie',
          text: 'Un décret contient une règle contraire à une loi ; une loi est contraire à un traité ratifié ; un traité est contraire à la Constitution. Résoudre chaque conflit en citant le bloc de la pyramide concerné.',
          sol: 'Décret contraire à la loi : la <strong>loi</strong> l\'emporte (bloc de légalité au-dessus du bloc réglementaire). Loi contraire au traité : le <strong>traité</strong> l\'emporte (bloc de conventionnalité au-dessus de la légalité). Traité contraire à la Constitution : la <strong>Constitution</strong> l\'emporte (sommet, bloc de constitutionnalité). Principe : chaque règle doit être conforme à celle qui lui est supérieure.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Loi dans le temps',
          text: 'La loi N entre en vigueur le jour 10. Trois situations : (a) née le 2, éteinte le 8 ; (b) née le 5, encore en cours ; (c) née le 12. Quelle loi s\'applique à chacune ? Justifier.',
          sol: '(a) éteinte avant la vigueur → <strong>loi ancienne</strong> (non-rétroactivité). (b) en cours à la vigueur → <strong>loi nouvelle</strong> (effet immédiat). (c) née après → <strong>loi nouvelle</strong> (effet immédiat). Article 2 du code civil : « la loi ne dispose que pour l\'avenir ; elle n\'a point d\'effet rétroactif ».'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté juridictions, personnalité, contrats.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Juridictions',
          text: 'Un justiciable perd son procès au TPI de Lomé ; un autre est insatisfait d\'une décision de la Cour d\'Appel ; un troisième s\'est fait justice lui-même. Analyser les trois situations avec les principes du chapitre.',
          sol: 'Le perdant au TPI peut <strong>faire appel</strong> : double degré de juridiction, la Cour d\'Appel réexamine le litige. L\'insatisfait de la Cour d\'Appel peut <strong>se pourvoir en cassation</strong> devant la Cour Suprême (juge suprême). Le justiciable qui s\'est fait justice viole le principe « nul ne peut se faire justice » : juger appartient à l\'État — il s\'expose à des sanctions, et son « procès » est nul de fait.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Personnalité',
          text: 'Un père décédé avait contracté une assurance-vie au profit de son enfant à naître ; une personne est sans nouvelles depuis six ans ; un naufragé est porté disparu après un naufrage. Statuer sur la personnalité juridique dans les trois cas.',
          sol: 'L\'enfant <strong>simplement conçu</strong> est réputé avoir la personnalité dès la conception, dans son intérêt : il recueille la succession et bénéficie de l\'assurance. La personne <strong>absente</strong> (sans nouvelles, délai long de cinq ans) reste titulaire jusqu\'à la déclaration d\'absence : situation d\'attente. Le naufragé <strong>disparu</strong> : corps introuvable mais décès probable au regard des circonstances — présomption de décès.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Contrat',
          text: 'Un vendeur dissimule un vice à l\'acheteur ; un contrat prévoit une obligation qu\'une inondation rend impossible ; un piéton est blessé par un cycliste sans aucun contrat entre eux. Statuer sur chacun.',
          sol: 'Dol = manœuvres frauduleuses : vice du consentement → <strong>nullité relative</strong> (action de la victime). Inondation : imprévisible, irrésistible, extérieure → <strong>force majeure</strong>, le débiteur est dispensé. Piéton-cycliste : aucun contrat → <strong>responsabilité délictuelle</strong>, dommages-intérêts à la victime.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Validité',
          text: 'Un contrat de vente entre deux sociétés est signé : capacité ok, consentement ok, objet ok, mais la cause est illicite (fraude fiscale). Le contrat est-il valable ? Quelle nullité ? Comparer avec un contrat signé sous la violence.',
          sol: 'Cause illicite : le contrat viole l\'ordre public → <strong>nullité absolue</strong> (elle peut être invoquée par tout intéressé, protection de l\'ordre public). Contrat signé sous violence : vice du consentement → <strong>nullité relative</strong> (seule la victime peut agir, protection personnelle).'
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
    { stem: 'Le droit de vote est…', opts: ['une règle de droit', 'un droit subjectif', 'une sanction'], correct: 1, exp: 'Prérogative reconnue à un sujet de droit.' },
    { stem: 'La règle de droit est…', opts: ['générale et coercitive', 'individuelle et facultative', 'morale et religieuse'], correct: 0, exp: 'Générale, abstraite, obligatoire, coercitive.' },
    { stem: 'Le jour franc court depuis…', opts: ['le vote', 'la promulgation', 'la parution au journal officiel'], correct: 2, exp: '24 h après la parution, la loi entre en vigueur.' },
    { stem: 'Dans la pyramide, les traités viennent…', opts: ['au-dessus des lois', 'sous les lois', 'au sommet'], correct: 0, exp: 'Constitution, puis traités (conventionnalité), puis lois, puis règlements.' },
    { stem: 'Le premier degré de juridiction est…', opts: ['la Cour Suprême', 'le TPI', 'la Cour d\'Appel'], correct: 1, exp: 'Les TPI sont les juridictions de droit commun de premier degré.' },
    { stem: 'La personnalité physique se perd au…', opts: ['divorce', 'décès', 'déménagement'], correct: 1, exp: 'Le décès marque la fin de la personnalité juridique.' },
    { stem: 'Disparition signifie…', opts: ['sans nouvelles 5 ans', 'décès probable, corps introuvable', 'expulsion'], correct: 1, exp: 'Circonstances (naufrage, crash) rendant le décès probable ; l\'absence est l\'attente.' },
    { stem: 'Une situation en cours au jour de la loi nouvelle…', opts: ['reste sous l\'ancienne loi', 'passe sous la loi nouvelle', 'est annulée'], correct: 1, exp: 'Effet immédiat ; seules les situations éteintes restent anciennes.' },
    { stem: 'Le dol emporte…', opts: ['la nullité absolue', 'la nullité relative', 'rien'], correct: 1, exp: 'Vice du consentement : seule la victime peut agir.' },
    { stem: 'La force majeure exige…', opts: ['un événement annoncé', 'imprévisible, irrésistible et extérieur', 'une faute du créancier'], correct: 1, exp: 'Trois critères cumulatifs : le débiteur est dispensé.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d\'examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l\'esprit de l\'épreuve (durée 2 h, /20). ' +
    'Réalisez-les <strong>sans regarder</strong> les corrigés, puis corrigez-vous sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d\'examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu\'à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : qualifications exactes, dates calculées, blocs de la pyramide cités, nullités distinguées.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible la pyramide des normes et les nullités.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après le support « Introduction au Droit » (MILILA P.). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Droit B1 : sujets chronométrés sur la règle de droit, les ' +
        'sources, la hiérarchie des normes, les juridictions, la personnalité et les contrats.',
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
    '    <details><summary>Corrections &amp; analyses juridiques détaillées</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de synthèse juridique sur les contrats informatiques et la conformité des données.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer une règle de droit objectif d’une prérogative individuelle (droit subjectif).',
      'Classer les normes selon la pyramide de Kelsen : bloc de constitutionnalité, conventionalité, légalité et réglementaire.',
      'Identifier les conditions d’acquisition et d’extinction de la personnalité juridique d’une personne physique.',
      'Distinguer les juridictions du premier degré, du second degré et la Cour de cassation.'
    ], [
      '<p><strong>1. Droit objectif / subjectif :</strong> Le droit objectif désigne l’ensemble des règles générales et obligatoires régissant la vie en société ; le droit subjectif est le pouvoir individuel reconnu à une personne sur une chose ou envers autrui.</p>',
      '<p><strong>2. Pyramide des normes :</strong> Constitution (sommet), Traités internationaux ratifiés, Lois votées par le Parlement, Règlements (décrets et arrêtés du pouvoir exécutif).</p>',
      '<p><strong>3. Personnalité juridique :</strong> Naissance d’un enfant vivant et viable (début) ; décès médicalement certifié (fin).</p>',
      '<p><strong>4. Ordre juridictionnel :</strong> 1er degré (jugement des faits et du droit), 2nd degré (Cour d’appel - réformation éventuelle), Cour de cassation (juge de la conformité du droit uniquement).</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Analyser les quatre conditions de validité d’un contrat (consentement, capacité, contenu licite et certain).',
      'Distinguer la responsabilité contractuelle de la responsabilité délictuelle / extracontractuelle.',
      'Identifier les trois éléments cumulatifs de la responsabilité civile (faute, dommage certain, lien de causalité direct).',
      'Qualifier les droits patrimoniaux et moraux d’un auteur sur un logiciel développé en entreprise.'
    ], [
      '<p><strong>1. Validité du contrat :</strong> Consentement non vicié (erreur, dol, violence), capacité juridique des parties, objet licite et déterminé/déterminable.</p>',
      '<p><strong>2. Nature de la responsabilité :</strong> Contractuelle si inexécution d’une obligation stipulée au contrat ; extracontractuelle en l’absence de lien contractuel ou en cas de préjudice tiers.</p>',
      '<p><strong>3. Éléments constitutifs :</strong> Faute (ou fait générateur), Préjudice réel, direct et certain, Lien de causalité démontré entre le fait et le dommage.</p>',
      '<p><strong>4. Propriété intellectuelle :</strong> Les droits patrimoniaux sur les logiciels créés par un salarié dans l’exercice de ses fonctions sont dévolus automatiquement à l’employeur (art. L. 113-9 CPI), le droit moral restant inaliénable.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Rédiger un syllogisme juridique complet appliqué à une rupture unilatérale de prestation d’hébergement web.',
      'Déterminer les obligations du responsable de traitement au sens du RGPD (licéité, proportionnalité, notification de violation).',
      'Résoudre un litige de concurrence déloyale par débauchage illicite de développeurs.',
      'Évaluer la validité d’une clause limitative de responsabilité dans un contrat de service cloud.'
    ], [
      '<p><strong>1. Syllogisme :</strong> Majeure (l’art. 1217 du Code civil énonce les sanctions de l’inexécution), Mineure (l’hébergeur a suspendu le service sans préavis ni manquement avéré), Conclusion (l’hébergeur doit réparer le préjudice d’exploitation subi).</p>',
      '<p><strong>2. RGPD :</strong> Registre des traitements, recueil de consentement explicite, respect des droits des personnes et notification de fuite à la CNIL sous 72 heures.</p>',
      '<p><strong>3. Concurrence déloyale :</strong> La liberté du travail permet le changement d’employeur, sauf manœuvres déloyales caractérisées (détournement de clientèle, pillage de savoir-faire confidentiel ou violation de clause de non-concurrence valide).</p>',
      '<p><strong>4. Clause limitative :</strong> Valable entre professionnels, sauf faute lourde, dol ou si elle vide de sa substance l’obligation essentielle du prestataire (jurisprudence Chronopost / Faurecia).</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Audit Juridique &amp; Conformité Numérique</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’étude juridique approfondie consiste à analyser les risques contractuels, la politique de protection des données (RGPD) et la protection de la propriété intellectuelle d’une entreprise éditrice de solutions SaaS.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences juridiques évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Analyse contractuelle :</strong> Identification des obligations de moyens vs de résultat et qualification des SLA.</li>',
      '      <li><strong>Conformité RGPD :</strong> Cartographie des flux de données et clauses de sous-traitance (art. 28 RGPD).</li>',
      '      <li><strong>Propriété intellectuelle :</strong> Cession de droits, licences open-source et protection des bases de données.</li>',
      '      <li><strong>Responsabilité &amp; litiges :</strong> Prévention du contentieux et mécanismes de médiation.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de droit du numérique B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de synthèse juridique du cours de droit B1 : contrats, responsabilité et conformité numérique.',
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
        : { href: '../atelier.html', label: 'Atelier de scripts' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours de Droit B1 : ' + chapitre.toc +
        ' Théorie, exemples détaillés, études de cas d’application, QCM corrigés.',
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
