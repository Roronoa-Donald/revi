/**
 * Pages transverses du cours de Français professionnel B1.
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
    '    <span class="tag tag--time">Français professionnel</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>décomposer une prise de parole : verbal, para-verbal, non-verbal, logos, pathos, éthos ;</li>',
      '      <li>choisir le bon registre — familier, courant, soutenu — et remplacer les verbes passe-partout ;</li>',
      '      <li>écrire un courrier sans faute : date, etc., ci-joint, veuillez, de toute façon, M. (pas Mr) ;</li>',
      '      <li>nommer et corriger les trois familles de fautes : pléonasmes, barbarismes, solécismes ;</li>',
      '      <li>rédiger une lettre de motivation aux neuf blocs, appel et politesse compris ;</li>',
      '      <li>conjuguer le passé composé aux bons auxiliaires et accorder le participe avec être.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Les supports déroulent des séances précises — la communication, les registres de langue, les ' +
      'pléonasmes, barbarismes et solécismes, les fautes au bureau, la lettre de motivation — et chaque ' +
      'séance se termine par des listes d\'erreurs et de corrections. Ce cours en garde l\'esprit et fait ' +
      'manipuler chaque règle <strong>en Bash</strong> : un script qui reproduit l\'analyse exacte du ' +
      'correcteur, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les exercices des supports (registres, ci-joint, lettre de motivation).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo français professionnel</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Français professionnel B1 — communication, registres, lettre | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, de la première prise de parole jusqu\'à l\'évaluation ' +
    'finale. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur ' +
    '(et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas méthodologiques</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo français professionnel</span><br><span class="toc__d">Communication, registres, fautes au bureau, pléonasmes, lettre, passé composé.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : l\'audit de courriers du service.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Français professionnel B1 : ' + chapterList.length +
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
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Bash derrière. Écris un script, ' +
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une règle de registre devient un contrôle automatisé.</p>',
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
      '     data-language="analyse"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter># Zone libre : pratiquez la rédaction professionnelle.',
      '# Rédigez vos analyses de registre et d\'adéquation.',
      '',
      '[Cas 1 — Registre soutenu]',
      '# Données : Nous vous prions d\'agréer nos salutations distinguées',
      'courrier : registre soutenu conforme',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — correcteur de registre</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('book') + ' Étude de cas</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme du ' +
      'cours (canaux de Mehrabian, ci-joint, neuf blocs de la lettre, accords du participe), programme-le et ' +
      'teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé juge chaque mot : familier, courant ou soutenu, puis rend un verdict global sur ' +
      'le registre du texte. Ajoute d\'autres niveaux, un décompte par registre, ou remplace tout le script par ' +
      'le mécanisme que tu veux vérifier.</p>',
      '      <p>Dans un vrai courrier, ce contrôle se fera à l\'œil avant l\'envoi : la structure du script — ' +
      'lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>4',
      'bouffer fam',
      'manger cour',
      'sustenter sout',
      'bagnole fam</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>bouffer : familier',
      'manger : courant',
      'sustenter : soutenu',
      'bagnole : familier',
      'registre professionnel : a corriger</pre></div>',
      '    </div>',
      '    <p class="lab__note">Cinq lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai courrier</h2>',
    '  <p>La simulation a une limite assumée : aucun courrier réel n\'est envoyé et aucune orthographe ' +
    'n\'est évaluée en continu — la langue reste du texte structuré. Elle a une force : <strong>toute la ' +
    'logique se vérifie sans risque</strong> — on peut rejouer un contrôle de registre autant de fois que ' +
    'nécessaire. Quand le script reproduit les bons réflexes — lire, décider, rapporter — le passage à la ' +
    'relecture réelle est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Compteur dans la boucle</strong> : le verdict « a corriger » s\'affiche à chaque ligne au lieu d\'une seule fois, après.</li>',
      '      <li><strong>Cas partiels</strong> : le case ne couvre que fam et juge cour/sout par un défaut silencieux.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit le registre avant le mot, et tout décale.</li>',
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
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — La communication' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler le français professionnel | ' + course.brand,
      description: 'Atelier de scripts du cours de Français professionnel B1 : éditeur dans le navigateur, ' +
        'exécution réelle du script Bash, entrée standard, console de sortie et tuteur qui explique les erreurs.',
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo français professionnel' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Français professionnel B1 : notions clés des ' +
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
    '  <h1>Mémo français professionnel</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'une journée de travail. À garder ' +
    'ouvert pendant les exercices et l\'atelier.</p>',

    bloc('La communication : canaux et ressorts', [
      '<pre><code>verbal      : les mots, le lexique, les figures de style\n',
      'para-verbal : la voix — rythme, intonation, volume, articulation\n',
      'non-verbal  : espace, tenue, mimo-gestuelle, expressions faciales\n',
      '\n',
      'aristote : logos (raison) / pathos (emotion) / ethos (credibilite)\n',
      'fonctions : referentielle, expressive, conative, poetique,\n',
      '            phatique (maintenir le contact), metalinguistique\n',
      '\n',
      'explicite : « Il fait chaud dans ta chambre »\n',
      'implicite : « Tu veux bien allumer la clim ? »</code></pre>',
      '<p>Quand le verbe et le corps se contredisent, l\'auditoire croit le corps.</p>'
    ].join('\n')),

    bloc('Les registres de langue', [
      '<pre><code>familier  : cailler / bouffer / zyeuter / le boulot / une bagnole\n',
      'courant    : avoir tres froid / manger / regarder / le travail / une voiture\n',
      'soutenu    : etre mort de froid / se sustenter / considerer / le labeur\n',
      '\n',
      'marques du familier : argot, ruptures, « ne » supprime (« je sais pas »)\n',
      '\n',
      'passe-partout a remplacer :\n',
      '  donner → prodiguer (conseils), accorder (confiance, delai)\n',
      '  faire  → commettre (erreur), effectuer (travail), intenter (proces)\n',
      '  avoir  → detenir (cles), eprouver (sentiment), compter (habitants)</code></pre>',
      '<p>Le registre se choisit selon la situation, jamais selon l\'humeur.</p>'
    ].join('\n')),

    bloc('Les fautes au bureau', [
      '<pre><code>date     : mercredi 26 juillet 2023   (jours et mois : minuscule, pluriel)\n',
      'etc.     : un point toujours, jamais de points de suspension\n',
      'ci-joint : en tete de phrase ou entre virgules → invariable\n',
      '          apres le nom → accorde (« les statistiques ci-annexees »)\n',
      'veuillez (vouloir) ≠ veillez (veiller)\n',
      'de toute façon : singulier (quoi qu\'il en soit)\n',
      'profession attribut : sans article (« je suis chercheur »)\n',
      'abreviations : M. (pas Mr !), Mme, Mlle, Dr, Pr, Me, MM., Mmes\n',
      'sine die : sans jour fixe  |  bel et bien : reellement\n',
      'abonder dans le sens : adhérer a l\'opinion de</code></pre>',
      '<p>Une relecture de deux minutes attrape ces quatorze fautes à coup sûr.</p>'
    ].join('\n')),

    bloc('Pléonasmes, barbarismes, solécismes', [
      '<pre><code>pleonasme (mot de trop) :\n',
      '  projets d\'avenir → projets        allumer la lumiere → une lampe\n',
      '  au jour d\'aujourd\'hui → aujourd\'hui    la premiere priorite → la priorite\n',
      '  comparer ensemble, apparence exterieure, mauvais cauchemar\n',
      '\n',
      'barbarisme (mot deforme) :\n',
      '  pecuniers → pecuniaires    dilemne → dilemme\n',
      '  empruntes → empreintes     renumere → remunere\n',
      '  benine → benigne           en definitif → en definitive\n',
      '\n',
      'solecisme (construction) :\n',
      '  se rappeler QUELQUE CHOSE (pas « de »)   pallier QUELQUE CHOSE\n',
      '  telephoner A quelqu\'un    enfreindre QUELQUE CHOSE\n',
      '  apres que + indicatif     malgre que → bien que\n',
      '  d\'ici A demain            ils ONT divorce\n',
      '  si + indicatif : jamais de conditionnel (« si je pouvais »)</code></pre>',
      '<p>Nommer la famille de la faute, c\'est déjà la corriger.</p>'
    ].join('\n')),

    bloc('La lettre de motivation : 9 blocs', [
      '<pre><code>1. coordonnees : identiques au CV, a jour\n',
      '2. destinataire : « A l\'attention de Mme Rivoli »\n',
      '3. ville et date : en haut a droite\n',
      '4. objet : « Candidature au poste de... » — sans verbe conjugue\n',
      '5. appel : « Madame, Monsieur, » (inconnu) — jamais « Bonjour »\n',
      '6. corps : 3 paragraphes max — entreprise / competences / motivations\n',
      '7. rendez-vous : « Je me tiens a votre entiere disposition »\n',
      '8. politesse : « Dans l\'attente de votre reponse, je vous prie\n',
      '   d\'agreer, Madame, Monsieur, mes sinceres salutations. »\n',
      '9. signature : prenom, nom, signature manuscrite\n',
      '\n',
      'lexique : j\'ai etudie le marketing / des etudes de marketing\n',
      '          avoir le sens de l\'organisation, l\'esprit de synthese</code></pre>',
      '<p>La lettre complète le CV : elle ne le répète pas.</p>'
    ].join('\n')),

    bloc('Le passé composé', [
      '<pre><code>avoir + participe : transitifs (j\'ai achete un livre, il a parle de...)\n',
      'etre + participe  : mouvement — venir, arriver, partir, entrer, sortir,\n',
      '                    monter, descendre, naitre, mourir, rester, tomber...\n',
      '                    et verbes pronominaux (ils se sont reveilles)\n',
      'verbes douteux    : avec COD → avoir (j\'ai monte les bagages)\n',
      '                    sans COD → etre (je suis monte au 1er)\n',
      '\n',
      'participes : -e (alle) -u (recu) -it (dit) -i (fini) -is (pris) -ert (ouvert)\n',
      '\n',
      'accord avec etre = accord de l\'adjectif :\n',
      '  il est alle / elle est allee / ils sont alles / elles sont allees\n',
      '  vous : sortis (hommes ou mixte) / sorties (femmes)\n',
      '         sorti (politesse homme) / sortie (politesse femme)</code></pre>',
      '<p>Identifier l\'antécédent avant d\'accorder : « je » de Julie s\'accorde comme Julie.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Écrire « Mercredi 26 Juillet » : jours et mois sont des noms communs.</li>',
      '    <li>Écrire « etc… » ou « etc » : une abréviation, un point.</li>',
      '    <li>Accorder « ci-jointes les pièces » : invariable en tête de phrase.</li>',
      '    <li>Écrire « veillez croire » : veuillez (vouloir), pas veillez (veiller).</li>',
      '    <li>Écrire « de toutes les façons » au sens de « quoi qu\'il en soit ».</li>',
      '    <li>Dire « je suis un chercheur » : profession attribut, sans article.</li>',
      '    <li>Abréger Monsieur en « Mr » : c\'est l\'anglais Mister.</li>',
      '    <li>Écrire « pallier à », « se rappeler de », « malgré que ».</li>',
      '    <li>Mettre un conditionnel après « si » : les si n\'aiment pas les rais.</li>',
      '    <li>Conjuguer « elle a parti » : partir prend être — « elle est partie ».</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo français professionnel — ' + course.brand,
      description: 'Mémo du cours de Français professionnel B1 : communication, registres, fautes au bureau, ' +
        'pléonasmes et barbarismes, lettre de motivation et passé composé sur une page.',
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
      intro: 'Sujet type épreuve — communication, registres, fautes au bureau.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Communication',
          text: 'Classer les six éléments suivants selon Mehrabian (verbal, para-verbal, non-verbal) : le lexique, l\'intonation, la tenue vestimentaire, les figures de style, le volume de la voix, la mimo-gestuelle. Puis ranger un discours « plein de chiffres mais monotone » sur la grille d\'Aristote.',
          sol: '<strong>Verbal</strong> : le lexique, les figures de style. <strong>Para-verbal</strong> : l\'intonation, le volume. <strong>Non-verbal</strong> : la tenue vestimentaire, la mimo-gestuelle. Le discours monotone : <strong>logos</strong> présent (les chiffres), <strong>para-verbal</strong> plat (rythme et volume constants) — c\'est le canal para-verbal qu\'il faut relancer, et un <strong>pathos</strong> absent : aucun ressort émotionnel pour l\'auditoire.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Registres',
          text: 'Placer dans leur registre : cailler, se sustenter, le boulot, considérer, la gadoue. Puis remplacer « donner des conseils », « faire une erreur », « avoir du courage » par des verbes précis.',
          sol: '<strong>Familier</strong> : cailler, le boulot, la gadoue. <strong>Soutenu</strong> : se sustenter, considérer. <strong>Prodiguer</strong> des conseils, <strong>commettre</strong> une erreur, <strong>faire preuve</strong> de courage — trois passe-partout chassés.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Fautes au bureau',
          text: 'Corriger : « Mercredi 26 Juillet 2023 » ; « Ci-jointes les pièces exigées » ; « Veillez croire, Monsieur, à l\'assurance de mes sentiments respectueux » ; « De toutes les façons, nous ferons le nécessaire » ; « Le personnel travaille les jeudi ».',
          sol: '<strong>mercredi 26 juillet 2023</strong> (noms communs). <strong>Ci-joint les pièces exigées</strong> (invariable en tête). <strong>Veuillez croire…</strong> (vouloir, pas veiller). <strong>De toute façon</strong> (singulier : quoi qu\'il en soit). <strong>les jeudis</strong> (pluriel marqué).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Implicitement vôtre',
          text: 'Décoder l\'implicite de : « Il est déjà 18 heures passé » ; « Votre dossier serait très utile au comité ». Puis nommer la fonction du langage de « Allô, vous m\'entendez ? ».',
          sol: '« Il est déjà 18 heures passé » → <strong>je voudrais rentrer maintenant</strong>. « Votre dossier serait très utile au comité » → <strong>envoyez-nous votre dossier</strong> (incitation voilée). « Allô, vous m\'entendez ? » → fonction <strong>phatique</strong> : établir et maintenir le contact.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté fautes de langue, lettre de motivation, grammaire.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Trois familles',
          text: 'Nommer la famille (pléonasme, barbarisme, solécisme) puis corriger : « au jour d\'aujourd\'hui » ; « un dilemne » ; « pallier à cet incident » ; « l\'apparence extérieure » ; « les empruntes digitales » ; « malgré qu\'il soit malade ».',
          sol: '<strong>Pléonasme</strong> : au jour d\'aujourd\'hui → aujourd\'hui ; l\'apparence extérieure → aux apparences. <strong>Barbarisme</strong> : un dilemne → un dilemme ; les empruntes → les empreintes. <strong>Solécisme</strong> : pallier à cet incident → pallier cet incident ; malgré qu\'il soit → bien qu\'il soit.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Si et après que',
          text: 'Corriger : « Si je pourrais d\'ores et déjà obtenir l\'adresse e-mail, j\'enverrais le courriel au plus vite. » ; « Je suis parti après que le client soit venu. » ; « Nous avons débuté la réunion avec un peu de retard. »',
          sol: '« Si je <strong>pouvais</strong>…, j\'enverrais… » (pas de conditionnel après si). « Je suis parti après que le client <strong>est</strong> venu » (indicatif : le fait s\'est produit). « Nous avons <strong>commencé</strong> la réunion » (on ne débute pas quelque chose).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — La lettre',
          text: 'Relever les quatre fautes : « Objet : Je candidate au poste de vendeur. Bonjour Madame, Après avoir étudié le marketing depuis trois ans, je souhaite rejoindre votre boutique. Dans l\'attente de votre réponse, je vous prie d\'agréer, Madame, mes sincères salutations. »',
          sol: '<strong>Objet</strong> : « Candidature au poste de vendeur » — nominal, sans verbe conjugué. <strong>Appel</strong> : « Madame, Monsieur, » — « Bonjour » proscrit. <strong>Études</strong> : « fait des études de marketing » ou « étudié le marketing » (ici correct, mais « étudié le marketing depuis » réclame plutôt « étudié le marketing pendant ») ; le point dur reste objet + appel. <strong>Politesses</strong> et structure sinon conformes : neuf blocs à vérifier un à un.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Passé composé',
          text: 'Corriger : « Elle a parti en vacances hier soir. » ; « J\'ai entré sans frapper. » ; « Elles sont allé au parc. » ; « Vous êtes sorties » (adressé à un homme). ; « Ils se sont divorcés l\'année dernière. »',
          sol: '« Elle <strong>est parti(e)</strong> en vacances » (mouvement : être). « Je <strong>suis entré</strong> sans frapper » (sans COD : être). « Elles sont <strong>allées</strong> au parc » (accord féminin pluriel). « Vous êtes <strong>sorti</strong> » (politesse envers un homme). « Ils <strong>ont divorcé</strong> » (divorcer n\'est pas pronominal).'
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
    { stem: 'Selon Mehrabian, l\'intonation est…', opts: ['verbale', 'para-verbale', 'non-verbale'], correct: 1, exp: 'La voix : rythme, intonation, volume — para-verbal.' },
    { stem: 'L\'éthos d\'Aristote est…', opts: ['la raison', 'l\'émotion', 'la crédibilité'], correct: 2, exp: 'Logos = raison ; pathos = émotion ; éthos = crédibilité.' },
    { stem: '« Bouffer / manger / se sustenter » couvre…', opts: ['trois notions', 'un trio familier-courant-soutenu', 'des synonymes familiers'], correct: 1, exp: 'Un mot par registre, dans l\'ordre.' },
    { stem: 'Etc. se ponctue…', opts: ['etc…', 'etc', 'etc.'], correct: 2, exp: 'Un point, toujours — jamais de points de suspension.' },
    { stem: '« Veuillez trouver, ci-joint, les requêtes » : ci-joint est…', opts: ['accordé', 'invariable', 'au pluriel'], correct: 1, exp: 'Entre virgules : invariable.' },
    { stem: 'Monsieur s\'abrège…', opts: ['Mr', 'Mr.', 'M.'], correct: 2, exp: 'M. en français ; Mr est l\'anglais Mister.' },
    { stem: '« Pallier à cet incident » est…', opts: ['correct', 'un solécisme', 'un pléonasme'], correct: 1, exp: 'Pallier est transitif direct : on pallie quelque chose.' },
    { stem: 'L\'objet d\'une lettre de motivation…', opts: ['contient un verbe conjugué', 'est nominal, court, clair', 'se place après l\'appel'], correct: 1, exp: '« Candidature au poste de… » : résumé sans verbe conjugué.' },
    { stem: '« Des études de… » s\'accompagne…', opts: ['de l\'article du', 'de l\'article de la', 'd\'aucun article'], correct: 2, exp: '« Des études de marketing » — sans article.' },
    { stem: '« Vous êtes… » (politesse envers une femme) :', opts: ['sorti', 'sortie', 'sortis'], correct: 1, exp: 'Politesse + femme : féminin singulier.' }
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
      '<strong>Réserve 15 min de relecture</strong> : dates en minuscules, ci-joint accordé au bon endroit, ' +
      'registres cohérents, neuf blocs de la lettre, accords du participe.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible courriers sans faute et lettre complète.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après les supports du CDPS (fautes de français, registres, communication) et le manuel de préparation à l\'embauche. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Français professionnel B1 : sujets chronométrés sur la ' +
        'communication, les registres, les fautes au bureau, la lettre de motivation et le passé composé.',
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
    '    <details><summary>Corrections &amp; analyses rédactionnelles</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de communication écrite et de synthèse professionnelle.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Repérer et corriger les fautes d’accord du participe passé avec l’auxiliaire avoir et les verbes pronominaux.',
      'Éliminer les pléonasmes fréquents en milieu professionnel (« monter en haut », « prévoir à l’avance », « voire même »).',
      'Différencier les homophones grammaticaux courants (leur/leurs, c’est/s’est, quel/quelle/qu’elle).',
      'Formuler une formule de politesse adaptée au destinataire et au canal de communication.'
    ], [
      '<p><strong>1. Accords :</strong> Les données que nous avons <em>traitées</em> (COD placé avant) ; ils se sont <em>téléphoné</em> (téléphoner à qqn, pas de COD).</p>',
      '<p><strong>2. Pléonasmes :</strong> Remplacer par « monter », « prévoir », « voire » ou « même » seuls.</p>',
      '<p><strong>3. Homophones :</strong> « Leurs » (déterminant pluriel devant nom) vs « leur » (pronom invariable devant verbe).</p>',
      '<p><strong>4. Formules de politesse :</strong> « Veuillez agréer, Madame, Monsieur, l’expression de mes salutations distinguées » (courrier officiel) ; « Bien cordialement » (e-mail quotidien).</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Rédiger une note de cadrage synthétique de deux pages selon la méthode QQOQCP.',
      'Structurer un argumentaire professionnel selon la règle SPRI (Situation, Problème, Résolution, Informations complémentaires).',
      'Transformer un texte jargonnant en communication accessible pour des décideurs non-techniques.',
      'Rédiger un compte rendu de réunion opérationnelle orienté plan d’action et responsabilités.'
    ], [
      '<p><strong>1. Méthode QQOQCP :</strong> Qui (acteurs), Quoi (projet), Où (périmètre), Quand (calendrier), Comment (moyens), Pourquoi (objectifs &amp; ROI).</p>',
      '<p><strong>2. Structure SPRI :</strong> Poser d’abord le contexte indiscutable, isoler le point de blocage, détailler la solution retenue et préciser les modalités pratiques.</p>',
      '<p><strong>3. Clarté :</strong> Remplacer les acronymes opaques par des définitions fonctionnelles et expliciter les impacts métier plutôt que le fonctionnement interne.</p>',
      '<p><strong>4. Compte rendu :</strong> Tableau synthétique des décisions : Action, Porteur désigné, Échéance ferme, Statut d’avancement.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Rédiger une note d’opportunité pour convaincre une direction générale d’investir dans un plan de refonte applicative.',
      'Gérer un courrier de réclamation client avec empathie, professionnalisme et respect des engagements légaux.',
      'Concevoir une communication de crise suite à une indisponibilité majeure de service en production.',
      'Élaborer la charte éditoriale et les consignes de style d’une équipe de développement logiciel.'
    ], [
      '<p><strong>1. Note d’opportunité :</strong> Chiffrer le coût de l’inaction (dette technique, pannes, perte de productivité) face aux bénéfices mesurables de la modernisation.</p>',
      '<p><strong>2. Réclamation :</strong> Accuser réception rapidement, valider la légitimité du ressenti, exposer les mesures correctives immédiates et proposer une compensation proportionnée.</p>',
      '<p><strong>3. Communication de crise :</strong> Transparence sur les faits constatés, absence de spéculation prématurée, engagement ferme de résolution et fréquence des points de situation.</p>',
      '<p><strong>4. Charte éditoriale :</strong> Règles typographiques (majuscules, tirets, ponctuation), ton de voix, conventions d’intitulés et structure des messages de commit / pull request.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Dossier de Communication &amp; Note de Cadrage</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier professionnel d’envergure consiste à produire la documentation managériale d’un projet informatique : note de cadrage, note d’arbitrage technique, plan de communication interne et rapport de clôture.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences rédactionnelles évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Précision stylistique :</strong> Vocabulaire soutenu, syntaxe irréprochable et suppression de toute ambiguïté.</li>',
      '      <li><strong>Puissance de synthèse :</strong> Hiérarchisation de l’information essentielle en tête de paragraphe (méthode de la pyramide inversée).</li>',
      '      <li><strong>Efficacité persuasive :</strong> Force des arguments, valorisation des métriques et clarté des propositions.</li>',
      '      <li><strong>Mise en page professionnelle :</strong> Titraille normalisée, tableaux soignés et présentation soignée.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de français professionnel B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de communication professionnelle en français B1 : rédaction, synthèse et argumentaire.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours de Français professionnel B1 : ' + chapitre.toc +
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
