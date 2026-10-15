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
    '    <span class="tag tag--time">Introduction au droit</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
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
      'temps et la pratique contractuelle. Ce cours en garde l\'esprit et fait manipuler chaque mécanisme ' +
      '<strong>en Bash</strong> : un script qui reproduit le raisonnement exact du juriste, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
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
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo droit</span><br><span class="toc__d">La règle de droit, les sources, la pyramide des normes, les juridictions, le contrat.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le greffe numérique d\'une juridiction.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Droit B1 : ' + chapterList.length +
        ' chapitres, exercices Bash exécutables, flashcards, mémo et examens blancs.',
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
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Bash derrière. Écris un script, ' +
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une norme devient un contrôle automatisé.</p>',
    box('objectifs', 'Comment fonctionne l\'atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre script Bash tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>read</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n\'écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l\'éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="shell"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter>#!/bin/bash',
      '# Zone libre : simulez, cassez, recommencez.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : contrôle de la pyramide des normes.',
      '# Le script lit n normes et vérifie leur conformité, du sommet à la base.',
      '',
      'read -r n',
      'rang_actuel=4',
      'for ((i=0; i<n; i++)); do',
      '  read -r niveau texte',
      '  rang=0',
      '  case "$niveau" in',
      '    constitution) rang=4 ;;',
      '    traite) rang=3 ;;',
      '    loi) rang=2 ;;',
      '    reglement) rang=1 ;;',
      '  esac',
      '  if [ "$rang" -le "$rang_actuel" ] && [ "$rang" -gt 0 ]; then',
      '    echo "$texte : conforme"',
      '    rang_actuel=$rang',
      '  else',
      '    echo "$texte : viole la hierarchie"',
      '  fi',
      'done',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — pyramide des normes</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme de ' +
      'droit (jour franc, registre des abrogations, routing des dossiers), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé vérifie la hiérarchie : chaque norme doit être de rang inférieur ou égal à ' +
      'la précédente. Ajoute les blocs (constitutionnalité, conventionnalité, légalité, réglementaire), un ' +
      'compteur de violations, ou remplace tout le script par le mécanisme que tu veux vérifier.</p>',
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
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit le texte avant le niveau, ou oublie la ligne d\'entête.</li>',
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
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Bash corrigés ' +
    'automatiquement dans la page. Une fois l\'atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme juridique est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Généralités' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler le droit | ' + course.brand,
      description: 'Atelier de scripts du cours de Droit B1 : éditeur dans le navigateur, exécution réelle ' +
        'du script Bash, entrée standard, console de sortie et tuteur qui explique les erreurs.',
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
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d\'examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu\'à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : qualifications exactes, dates calculées, blocs de la pyramide cités, nullités distinguées.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible la pyramide des normes et les nullités.' },
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
    '    <details><summary>Corrections</summary><div class="sol"><pre><code>' + solutions + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un projet final qui ' +
    'outille un greffe numérique. Les scripts sont en Bash, comme à l\'atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n énoncés « o/s » et affiche regle ou prerogative, puis les deux compteurs.',
      'Lit n normes « niveau texte » (const, trait, loi, regl) et affiche leur bloc (constitutionnalite, conventionalite, legalite, reglementaire).',
      'Lit n situations « nom situation » (naissance, vivant, deces) et affiche titulaire ou eteinte.',
      'Lit n juridictions « degre » (1, 2, 3) et affiche la juridiction correspondante.'
    ], [
      'read -r n',
      'regles=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r type libelle',
      '  if [ "$type" = "o" ]; then',
      '    echo "$libelle : regle"',
      '    regles=$((regles + 1))',
      '  else',
      '    echo "$libelle : prerogative"',
      '  fi',
      'done',
      'echo "regles : $regles"',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r niveau texte',
      '  case "$niveau" in',
      '    const) echo "$texte : constitutionnalite" ;;',
      '    trait) echo "$texte : conventionalite" ;;',
      '    loi) echo "$texte : legalite" ;;',
      '    regl) echo "$texte : reglementaire" ;;',
      '  esac',
      'done',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom situation',
      '  if [ "$situation" = "deces" ]; then',
      '    echo "$nom : eteinte"',
      '  else',
      '    echo "$nom : titulaire"',
      '  fi',
      'done',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r degre',
      '  case "$degre" in',
      '    1) echo "TPI" ;;',
      '    2) echo "Cour d Appel" ;;',
      '    3) echo "Cour Supreme" ;;',
      '  esac',
      'done'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calcule des dates de vigueur : lit n lois « nom jour_parution » et applique le jour franc (parution + 1), en rejetant les parutions nulles.',
      'Registre d\'abrogations : lit n événements « texte disposition » et affiche maintenue / abrogee expresse / abrogee tacite / deja abrogee.',
      'Double degré : lit n actes « acte affaire » et vérifie la recevabilité des appels (un jugement préalable, pas déjà appelé).',
      'Validité des contrats : lit n contrats et ses quatre conditions, affiche valide ou le nombre de conditions manquantes.'
    ], [
      'read -r n',
      'valides=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom jour',
      '  if [ "$jour" -gt 0 ]; then',
      '    echo "$nom : vigueur au jour $((jour + 1))"',
      '    valides=$((valides + 1))',
      '  else',
      '    echo "$nom : parution invalide"',
      '  fi',
      'done',
      'echo "lois : $valides/$n"',
      '',
      'read -r n',
      'declare -A etat',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r texte disposition',
      '  statut="${etat[$texte]:-}"',
      '  if [ "$statut" != "" ]; then',
      '    echo "$texte : deja abrogee"',
      '  elif [ "$disposition" = "abroge" ]; then',
      '    etat[$texte]=e ; echo "$texte : abrogee expresse"',
      '  elif [ "$disposition" = "incompatible" ]; then',
      '    etat[$texte]=t ; echo "$texte : abrogee tacite"',
      '  else',
      '    echo "$texte : maintenue"',
      '  fi',
      'done',
      '',
      'read -r n',
      'declare -A juges',
      'declare -A appeles',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r acte affaire',
      '  if [ "$acte" = "jugement" ]; then',
      '    juges[$affaire]=1 ; echo "jugement $affaire : rendu"',
      '  elif [ -n "${juges[$affaire]:-}" ] &amp;&amp; [ -z "${appeles[$affaire]:-}" ]; then',
      '    appeles[$affaire]=1 ; echo "appel $affaire : recevable"',
      '  else',
      '    echo "appel $affaire : irrecevable"',
      '  fi',
      'done',
      '',
      'read -r n',
      'valides=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r contrat c1 c2 c3 c4',
      '  ko=0',
      '  for cond in "$c1" "$c2" "$c3" "$c4"; do',
      '    [ "$cond" = "ko" ] &amp;&amp; ko=$((ko + 1))',
      '  done',
      '  if [ "$ko" = "0" ]; then echo "$contrat : valide" ; valides=$((valides + 1))',
      '  else echo "$contrat : $ko manquantes"; fi',
      'done',
      'echo "valides : $valides/$n"'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Statue dans le temps : lit « vigueur n » puis n situations « nom naissance fin » et applique non-rétroactivité et effet immédiat.',
      'Distingue absence et disparition : lit n personnes « nom jours_sans_nouvelles corps_trouve » et affiche absence, disparition ou vivant.',
      'Litige complet : lit « seuil n » puis n litiges « nom montant cause » et applique le régime du chapitre 6 (dispense, dommages, exequatur).',
      'Audit de la pyramide : lit n normes et affiche le bloc de chaque norme, puis le nombre de violations hiérarchiques.'
    ], [
      'read -r vigueur',
      'read -r n',
      'nouvelles=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom naissance fin',
      '  if [ "$fin" -lt "$vigueur" ]; then',
      '    echo "$nom : loi ancienne"',
      '  else',
      '    echo "$nom : loi nouvelle"',
      '    nouvelles=$((nouvelles + 1))',
      '  fi',
      'done',
      'echo "nouvelles : $nouvelles/$n"',
      '',
      'read -r n',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom jours corps',
      '  if [ "$corps" = "introuvable" ] &amp;&amp; [ "$jours" -ge 1 ]; then',
      '    echo "$nom : disparition"',
      '  elif [ "$jours" -ge 1825 ]; then',
      '    echo "$nom : absence (5 ans)"',
      '  else',
      '    echo "$nom : vivant"',
      '  fi',
      'done',
      '',
      'read -r seuil',
      'read -r n',
      'total=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom montant cause',
      '  if [ "$cause" = "forcemajeure" ]; then echo "$nom : dispense"',
      '  elif [ "$cause" = "delictuel" ]; then echo "$nom : dommages" ; total=$((total + montant))',
      '  elif [ "$montant" -ge "$seuil" ]; then echo "$nom : dommages" ; total=$((total + montant))',
      '  else echo "$nom : exequatur"; fi',
      'done',
      'echo "total : $total"',
      '',
      'read -r n',
      'rang_actuel=4',
      'violations=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r niveau texte',
      '  case "$niveau" in',
      '    const) rang=4 ;;',
      '    trait) rang=3 ;;',
      '    loi) rang=2 ;;',
      '    regl) rang=1 ;;',
      '    *) rang=0 ;;',
      '  esac',
      '  if [ "$rang" -le "$rang_actuel" ] &amp;&amp; [ "$rang" -gt 0 ]; then',
      '    rang_actuel=$rang',
      '  else',
      '    violations=$((violations + 1))',
      '  fi',
      'done',
      'echo "violations : $violations"'
    ].join('\n')),

    '  <h2>Projet intégrateur — « greffe numérique »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit le journal d\'un greffe : d\'abord <code>n_normes</code> normes au format ' +
      '<code>niveau texte</code> (const, trait, loi, regl), puis <code>n_dossiers</code> dossiers au format ' +
      '<code>degre affaire</code> (1, 2, 3). Il contrôle la pyramide (chaque norme conforme à la précédente), ' +
      'route chaque dossier vers sa juridiction, signale les appels sans jugement préalable (doublons de ' +
      'degré 2 sans degré 1 pour la même affaire), et produit le bilan : normes conformes, violations, ' +
      'répartition des dossiers par juridiction.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les deux blocs dans l\'ordre : normes d\'abord, dossiers ensuite.</li>',
      '      <li><strong>Contrôler</strong> la hiérarchie des normes avec drapeau de rupture.</li>',
      '      <li><strong>Router</strong> chaque dossier vers TPI, Cour d\'Appel ou Cour Suprême.</li>',
      '      <strong><li>Contrôler</li></strong> la recevabilité des appels (jugement préalable exigé).',
      '      <li><strong>Bilan</strong> : conformes, violations, compteurs par juridiction, formats exacts.</li>',
      '    </ol>',
      '    <p>Contraintes : tableaux associatifs pour les jugements et appels, drapeau de rupture de la pyramide, aucun bilan dans la boucle.</p>'
    ].join('\n')),
    box('method', 'Grille d\'auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture des deux blocs sans mélange <strong>20</strong>' },
        { cls: '', text: 'Contrôle de la pyramide conforme <strong>20</strong>' },
        { cls: '', text: 'Routage des dossiers exact <strong>20</strong>' },
        { cls: '', text: 'Recevabilité des appels correcte <strong>20</strong>' },
        { cls: '', text: 'Bilan final lisible et complet <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n_normes',
    'rang_actuel=4',
    'conformes=0',
    'violations=0',
    'for ((k=0; k&lt;n_normes; k++)); do',
    '  read -r niveau texte',
    '  case "$niveau" in',
    '    const) rang=4 ;;',
    '    trait) rang=3 ;;',
    '    loi) rang=2 ;;',
    '    regl) rang=1 ;;',
    '    *) rang=0 ;;',
    '  esac',
    '  if [ "$rang" -le "$rang_actuel" ] &amp;&amp; [ "$rang" -gt 0 ]; then',
    '    echo "$texte : conforme"',
    '    rang_actuel=$rang',
    '    conformes=$((conformes + 1))',
    '  else',
    '    echo "$texte : viole la hierarchie"',
    '    violations=$((violations + 1))',
    '  fi',
    'done',
    'read -r n_dossiers',
    'declare -A juges',
    'declare -A appeles',
    'tpi=0 ; ca=0 ; cs=0',
    'for ((k=0; k&lt;n_dossiers; k++)); do',
    '  read -r degre affaire',
    '  case "$degre" in',
    '    1) juges[$affaire]=1 ; echo "$affaire : TPI" ; tpi=$((tpi + 1)) ;;',
    '    2) if [ -n "${juges[$affaire]:-}" ] &amp;&amp; [ -z "${appeles[$affaire]:-}" ]; then',
    '         appeles[$affaire]=1 ; echo "$affaire : Cour d Appel" ; ca=$((ca + 1))',
    '       else echo "$affaire : appel irrecevable"; fi ;;',
    '    3) echo "$affaire : Cour Supreme" ; cs=$((cs + 1)) ;;',
    '  esac',
    'done',
    'echo "normes conformes : $conformes"',
    'echo "violations : $violations"',
    'echo "TPI : $tpi / CA : $ca / CS : $cs"'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine contrôle de la pyramide avec drapeau de rupture, routage par degré et ' +
    'recevabilité des appels — les chapitres 2, 3 et 5 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d\'après le support « Introduction au Droit » (B1 IT, cdp MILILA). ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours de Droit B1 : scripts Bash ' +
        'gradués et greffe numérique complet.',
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
        ' Théorie, exemples détaillés, exercices Bash exécutables, QCM corrigés.',
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
