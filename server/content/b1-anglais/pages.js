/**
 * Pages transverses du cours d'Anglais des affaires B1.
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
    '    <span class="tag tag--time">Business English</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>utiliser le vocabulaire des affaires (deadline, stakeholder, budget) et éviter les faux amis ;</li>',
      '      <li>distinguer client et customer, registre business et registre casual ;</li>',
      '      <li>écrire un email professionnel complet : subject line, salutation, méthode CLEAR, closing, signature ;</li>',
      '      <li>structurer une présentation en trois parties avec hook, roadmap et call to action ;</li>',
      '      <li>produire les sons difficiles (/θ/, /h/), trier les -ed endings et maîtriser l\'accent ;</li>',
      '      <li>choisir le bon registre (gonna interdit en clientèle) et l\'intonation correcte ;</li>',
      '      <li>formuler des requêtes polies (S-V-P) et passer l\'évaluation finale des quatre compétences.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Les supports déroulent quatre sessions — vocabulaire, emails, présentations, prononciation — ' +
      'à travers l\'histoire de Leo : du « Mysterious Email » plein d\'expressions opaques jusqu\'au test ' +
      'final. Ce cours en garde l\'esprit et fait manipuler chaque mécanisme <strong>en Bash</strong> : un ' +
      'script qui reproduit l\'analyse exacte du professionnel, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les exercices des supports (subject lines, disasters emails, -ed endings).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo business English</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Anglais des affaires B1 — emails, présentations, prononciation | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du premier mot de vocabulaire jusqu\'à l\'évaluation ' +
    'finale. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur ' +
    '(et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo business English</span><br><span class="toc__d">Vocabulaire, CLEAR, structure de présentation, sons difficiles, registres, S-V-P.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le correcteur de courriels de l\'équipe IT.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours d\'Anglais des affaires B1 : ' + chapterList.length +
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
      '  <script type="text/plain" data-lab-starter># Zone libre : pratiquez le Business English.',
      '# Rédigez vos analyses de registre et de style.',
      '',
      '[Cas 1 — Registre formel]',
      '# Données : I am writing to enquire about your services',
      'formal email : professional register',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — correcteur de registre</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('book') + ' Étude de cas</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme du ' +
      'cours (méthode CLEAR, -ed endings, pyramide d\'évaluation), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé juge chaque mot : déjà formel, ou réduction à corriger avec sa forme cible. ' +
      'Ajoute d\'autres reductions, un verdict global (email prêt / à corriger), ou remplace tout le script ' +
      'par le mécanisme que tu veux vérifier.</p>',
      '      <p>Dans votre messagerie, ce contrôle se fera à l\'œil avant l\'envoi : la structure du script — ' +
      'lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>4',
      'form deploy',
      'reduce gonna',
      'form send',
      'reduce wanna</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>deploy : formel',
      'gonna : going to',
      'send : formel',
      'wanna : want to',
      'corrections : 2/4</pre></div>',
      '    </div>',
      '    <p class="lab__note">Cinq lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai message</h2>',
    '  <p>La simulation a une limite assumée : aucun email réel n\'est envoyé et aucune prononciation n\'est ' +
    'évaluée — la langue reste du texte structuré. Elle a une force : <strong>toute la logique se vérifie ' +
    'sans risque</strong> — on peut rejouer un contrôle de registre autant de fois que nécessaire. Quand le ' +
    'script reproduit les bons réflexes — lire, décider du registre, rapporter — le passage à la rédaction ' +
    'réelle est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Compteur dans la boucle</strong> : le bilan des corrections s\'affiche à chaque ligne au lieu d\'une seule fois, après.</li>',
      '      <li><strong>Cas partiels</strong> : le case ne couvre que gonna et juge wanna/gotta par un défaut silencieux.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit le mot avant le registre, et tout décale.</li>',
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
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Vocabulaire' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler le business English | ' + course.brand,
      description: 'Atelier de scripts du cours d\'Anglais des affaires B1 : éditeur dans le navigateur, ' +
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo business English' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours d\'Anglais des affaires B1 : notions clés des ' +
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
    '  <h1>Mémo business English</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'une journée de travail. À garder ' +
    'ouvert pendant les exercices et l\'atelier.</p>',

    bloc('Vocabulaire et registres', [
      '<pre><code>deadline   final date to finish work      budget    available money\n',
      'stakeholder person interested in project   client    long-term relationship\n',
      'sprint     Agile period (1-4 weeks)       customer  one-time purchase\n',
      'deployment releasing software             UAT       User Acceptance Testing\n',
      '\n',
      'expressions : touch base (contact briefly) / get the ball rolling (start)\n',
      '              low-hanging fruit (easy wins)\n',
      '\n',
      'registres : business (invoice, quarterly, Dear Sir) vs casual (gonna, hey)\n',
      'faux amis  : actually = en fait / eventually = finalement / library = bibliotheque</code></pre>',
      '<p>Le registre se choisit selon le destinataire, jamais selon l\'humeur.</p>'
    ].join('\n')),

    bloc('L\'email professionnel : 5 parties + CLEAR', [
      '<pre><code>1. subject line : sujet + action + echeance\n',
      '   « Q3 Budget Update - Action Needed by Friday »\n',
      '2. salutation   : Dear Mr. Smith (formel) / Hello Sarah (semi-formel)\n',
      '3. body : CLEAR\n',
      '     C context     why are you writing ?\n',
      '     L logistics   what, when, where ?\n',
      '     E expectation what do you need ?\n',
      '     A action      what should they do ?\n',
      '     R respect     thank you\n',
      '4. closing      : Best regards / Kind regards / Sincerely\n',
      '5. signature    : nom, titre, societe — pas d\'emoji</code></pre>',
      '<p>Un email qui saute une case se lit comme un formulaire incomplet.</p>'
    ].join('\n')),

    bloc('La présentation en trois parties', [
      '<pre><code>opening (30 s) : hook + roadmap\n',
      '  « Have you ever lost an hour of work because of a crash ? »\n',
      '  « Today I\'ll explain the problem, the solution, and the result. »\n',
      'body (1,5-2 min) : transitions First / Next / Finally\n',
      'closing (30 s) : summarize + call to action\n',
      '  « To sum up... Please restart your computers tonight. »\n',
      '\n',
      'grandma rule : deployment → software release\n',
      '               CI/CD pipeline → automatic delivery system\n',
      'Q&amp;A : That\'s a good question / Let me clarify</code></pre>',
      '<p>Tell them, tell them, tell them — et jamais « That\'s it » pour finir.</p>'
    ].join('\n')),

    bloc('Prononciation et fluidité', [
      '<pre><code>/θ/ (think)  langue entre les dents   /h/ (hello) h aspire, jamais muet\n',
      '/ð/ (the)    meme position, voise\n',
      '\n',
      '-ed endings : /t/ apres son sourd (walked)\n',
      '              /d/ apres son voise (called)\n',
      '              /ɪd/ apres T ou D (wanted)\n',
      '\n',
      'word stress : REcord (nom) vs reCORD (verbe)\n',
      'intonation  : ↗ questions oui/non   ↘ declarations et WH\n',
      'linking     : not at all → No-ta-tall\n',
      'fluency     : s\'enregistrer, s\'ecouter, corriger (recording lab)</code></pre>',
      '<p>L\'objectif n\'est pas l\'accent parfait : c\'est d\'être compris.</p>'
    ].join('\n')),

    bloc('Registres et grammaire des requêtes', [
      '<pre><code>reductions : gonna = going to / wanna = want to / gotta = got to\n',
      '             casual ok entre collegues ; interdit en clientèle\n',
      '\n',
      'S-V-P : sujet + verbe conjugue + politesse\n',
      '  « Fix now ! »        → « Could we please fix it now ? »\n',
      '  « You send file ? »  → « Did you send the file yesterday ? »\n',
      '\n',
      'accords : singulier → verbe en -s (the server works)\n',
      'refus    : I cannot + alternative (jamais un sec « no »)</code></pre>',
      '<p>La grammaire professionnelle est de la politesse rendue syntaxique.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Traduire « actuellement » par actually : il signifie « en fait ».</li>',
      '    <li>Confondre client (relation longue) et customer (achat ponctuel).</li>',
      '    <li>Envoyer un email sans subject line informative.</li>',
      '    <li>Répondre à tous en colère : la reply all disaster.</li>',
      '    <li>Finir une présentation sur « That\'s it » : résumé + call to action.</li>',
      '    <li>Prononcer « tink » pour think : la langue entre les dents.</li>',
      '    <li>Garder gonna/wanna devant un client.</li>',
      '    <li>Oublier le -s du verbe au singulier dans un email client.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo business English — ' + course.brand,
      description: 'Mémo du cours d\'Anglais des affaires B1 : vocabulaire, méthode CLEAR, présentations, ' +
        'prononciation, registres et grammaire des requêtes sur une page.',
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
      intro: 'Sujet type épreuve — vocabulaire, emails, méthode CLEAR.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Vocabulaire',
          text: 'Définir en anglais simple puis employer dans une phrase : deadline, stakeholder, sprint, UAT. Distinguer client et customer sur un exemple d\'entreprise.',
          sol: '<strong>Deadline</strong> : the final date to finish work (« The deadline is Friday »). <strong>Stakeholder</strong> : a person interested in the project (« All stakeholders must review the contract »). <strong>Sprint</strong> : a short work period (1–4 weeks) in Agile (« We will add a search bar this sprint »). <strong>UAT</strong> : User Acceptance Testing, final testing by real users (« The client approved the software after UAT »). <strong>Client</strong> : Mrs. Rivera, who buys a maintenance contract every year (long-term relationship) ; <strong>customer</strong> : the person who bought one laptop in 2024 and never came back.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Faux amis',
          text: 'Corriger les trois phrases : « Actually, I am working currently » (voulue : « en fait, je travaille actuellement ») ; « Eventually we will see » (voulue : « éventuellement, nous verrons ») ; « I bought a book at the library ».',
          sol: '« <strong>In fact</strong>, I am working currently » (actually = en fait, pas actuellement). « <strong>Possibly</strong> we will see » ou « We may see later » (eventually = finalement ; éventuellement = possibly/possibly speaking). « I bought a book at the <strong>bookshop</strong> » (library = bibliothèque ; bookshop = librairie).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — CLEAR',
          text: 'Réécrire l\'email catastrophe « Yo team, gonna need that thing by tomorrow. k thx. » au format complet : subject line, salutation, corps CLEAR, closing, signature.',
          sol: '<strong>Subject :</strong> Report Deadline – Action Needed by Tomorrow. <strong>Dear team,</strong> — <strong>(C)</strong> The report deadline is tomorrow. — <strong>(L)</strong> The final version must be shared by 5 PM. — <strong>(E)</strong> I need everyone\'s section by 10 AM. — <strong>(A)</strong> Please send your section to me before 10 AM. — <strong>(R)</strong> Thank you for your efforts. <strong>Best regards, [Name], IT Team Lead</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Ton',
          text: 'Choisir salutation, ton et closing pour : (a) un CEO rencontré pour la première fois ; (b) une collègue de longue date ; (c) un client fidèle depuis trois ans. Justifier.',
          sol: '(a) <strong>Formel</strong> : « Dear Mr./Ms. [Nom], » + « Sincerely, » — nouveau contact, respect maximal. (b) <strong>Semi-formel</strong> : « Hello Sarah, » + « Best regards, » — collègue régulier. (c) <strong>Semi-formel à formel</strong> : « Hello Mrs. Dialou, » + « Kind regards, » — client fidèle : chaleureux mais professionnel.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté présentation, prononciation, grammaire.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Structure',
          text: 'Bâtir le squelette d\'une présentation de 2 minutes sur « the server was down this morning » : hook, roadmap, deux transitions de body, closing avec call to action.',
          sol: '<strong>Hook :</strong> « Have you ever arrived at work and found every screen frozen ? » <strong>Roadmap :</strong> « Today I\'ll explain what happened, what we did, and what you should do. » <strong>Body :</strong> « <em>First</em>, the main server crashed at 7 AM. » … « <em>Next</em>, we rebooted the system and restored the backup. » <strong>Closing :</strong> « <em>To summarize</em>, we had a crash, we fixed it with a reboot, and now everything works. <em>Please restart your computers tonight</em>. »'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Grandma Rule',
          text: 'Traduire en anglais simple, niveau grand-mère : « The deployment failed because of a CI/CD pipeline configuration mismatch. »',
          sol: 'Niveau professionnel simple : « The software release did not work because our automatic delivery system had a settings problem. » Niveau grand-mère : « The computer system got confused and couldn\'t finish the job. » La méthode : deployment → software release ; failed → did not work ; CI/CD pipeline → automatic delivery system ; configuration mismatch → settings problem.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Prononciation',
          text: 'Classer par son : fixed, ended, walked, tested, deployed. Puis expliquer la prononciation de think et hello à un francophone.',
          sol: '<strong>/t/</strong> : fixed (k sourd), walked (k sourd). <strong>/d/</strong> : deployed (d voisé). <strong>/ɪd/</strong> : ended, tested (terminaison T/D). <strong>think</strong> : le /θ/ se produit avec la langue entre les dents en soufflant — ni « tink » ni « sink ». <strong>hello</strong> : le /h/ s\'aspire fortement, il n\'est jamais muet (« \'ello » est une faute).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Grammaire',
          text: 'Corriger au format S-V-P : « Me want finish work soon yes » ; « You send file yesterday ? » ; « Server crash. Fix now ! » ; « Client call. You talk. Not me. »',
          sol: '« <strong>I want to finish work soon.</strong> » — « <strong>Did you send the file yesterday ?</strong> » — « <strong>The server crashed. Could we please fix it now ?</strong> » — « <strong>The client is calling. Can you talk to them ? I cannot.</strong> » Trois ingrédients à chaque fois : sujet explicite, verbe conjugué, formule polie.'
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
    { stem: 'A deadline is…', opts: ['a meeting', 'the final date to finish work', 'a budget line'], correct: 1, exp: 'Et ce n\'est pas un happy word.' },
    { stem: 'A client has…', opts: ['a one-time purchase', 'a long-term relationship', 'no stake in the project'], correct: 1, exp: 'Customer = achat ponctuel.' },
    { stem: '« Actually » means…', opts: ['currently', 'in fact', 'possibly'], correct: 1, exp: 'Faux ami : actuellement = currently.' },
    { stem: 'Dans CLEAR, l\'Action est…', opts: ['ce que j\'attends', 'ce que le lecteur doit faire', 'un remerciement'], correct: 1, exp: 'Expectation = what I need ; Action = what they do.' },
    { stem: 'Salutation formelle pour un CEO ?', opts: ['Hey dude,', 'Dear Mr. Smith,', 'Yo,'], correct: 1, exp: 'Formel : Dear + nom ; jamais Yo.' },
    { stem: 'Le closing contient…', opts: ['That\'s it', 'summarize + call to action', 'des excuses longues'], correct: 1, exp: 'Résumé puis action précise demandée à l\'auditeur.' },
    { stem: 'Le /θ/ de think se produit…', opts: ['avec un t dur', 'la langue entre les dents', 'sans son'], correct: 1, exp: 'The tongue sandwich — ni « tink » ni « sink ».' },
    { stem: 'L\'-ed de « wanted » vaut…', opts: ['/t/', '/d/', '/ɪd/'], correct: 2, exp: 'Après T ou D : /ɪd/.' },
    { stem: 'Devant un client on dit…', opts: ['we\'re gonna deploy', 'we\'re going to deploy', 'we wanna deploy'], correct: 1, exp: 'Les reductions restent en registre casual.' },
    { stem: '« Could we please fix it now ? » illustre…', opts: ['S-V-P : sujet, verbe, politesse', 'un refus', 'une intonation montante'], correct: 0, exp: 'Sujet + verbe conjugué + formule polie.' }
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
      '<strong>Réserve 15 min de relecture</strong> : registres cohérents, CLEAR complet, transitions présentes, accords vérifiés.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible CLEAR complet et registres.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après les supports « English for IT Professionals » (D. Tchogoue). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours d\'Anglais des affaires B1 : sujets chronométrés sur le ' +
        'vocabulaire, les emails, les présentations, la prononciation et la grammaire professionnelle.',
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
    '  <p class="lead">De la pratique graduée pour consolider chaque session, puis un projet final qui ' +
    'outille l\'équipe entière. Les scripts sont en Bash, comme à l\'atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n mots « type mot » (b/c) et affiche professionnel ou familier, puis les deux compteurs.',
      'Lit n personnes « nom relation » (long/once) et affiche client ou customer, puis les fidèles.',
      'Lit n verbes « verbe son » (t/d/id) et affiche la prononciation du -ed, puis les trois compteurs.',
      'Lit n phrases « phrase type » (yesno/wh/statement) et affiche montante ou descendante.'
    ], [
      'read -r n',
      'b=0 ; c=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r type mot',
      '  if [ "$type" = "b" ]; then echo "$mot : professionnel" ; b=$((b + 1))',
      '  else echo "$mot : familier" ; c=$((c + 1)); fi',
      'done',
      'echo "business : $b / casual : $c"',
      '',
      'read -r n',
      'fideles=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r nom relation',
      '  if [ "$relation" = "long" ]; then echo "$nom : client" ; fideles=$((fideles + 1))',
      '  else echo "$nom : customer"; fi',
      'done',
      'echo "fideles : $fideles"',
      '',
      'read -r n',
      't=0 ; d=0 ; id=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r verbe son',
      '  case "$son" in',
      '    t) echo "$verbe : /t/" ; t=$((t + 1)) ;;',
      '    d) echo "$verbe : /d/" ; d=$((d + 1)) ;;',
      '    id) echo "$verbe : /ɪd/" ; id=$((id + 1)) ;;',
      '  esac',
      'done',
      'echo "t : $t / d : $d / ɪd : $id"',
      '',
      'read -r n',
      'montantes=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r phrase type',
      '  if [ "$type" = "yesno" ]; then echo "$phrase : montante" ; montantes=$((montantes + 1))',
      '  else echo "$phrase : descendante"; fi',
      'done',
      'echo "montantes : $montantes"'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Audit d\'email : lit n lignes « partie lettre » (C/L/E/A/R) et signale les parties manquantes au format du kit.',
      'Réécriture de subject lines : lit n lignes « mauvaise bonne » et valide que la nouvelle contient action et échéance (mots cle et by).',
      'Score CLEAR : lit « seuil n » puis n occurrences de parties et calcule le taux de complétude, verdict prêt ou a completer.',
      'Registre d\'équipe : lit n messages « auteur registre » (form/reduce) et compte les corrections par auteur avec declare -A.'
    ], [
      'read -r n',
      'declare -A vues',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r partie lettre',
      '  vues[$lettre]=1',
      'done',
      'for lettre in C L E A R; do',
      '  if [ -z "${vues[$lettre]:-}" ]; then echo "$lettre : manquante" ; fi',
      'done',
      '',
      'read -r n',
      'valides=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r mauvaise bonne action echeance',
      '  if [ "$action" != "-" ] &amp;&amp; [ "$echeance" = "by" ]; then',
      '    echo "subject line valide"',
      '    valides=$((valides + 1))',
      '  else',
      '    echo "subject line incomplet"',
      '  fi',
      'done',
      'echo "valides : $valides/$n"',
      '',
      'read -r seuil',
      'read -r n',
      'complet=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r phrase partie',
      '  complet=$((complet + 1))',
      'done',
      'taux=$((complet * 5 / n))',
      'if [ "$taux" -ge "$seuil" ]; then echo "pret" ; else echo "a completer"; fi',
      '',
      'read -r n',
      'declare -A corrections',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r auteur registre',
      '  if [ "$registre" = "reduce" ]; then',
      '    corrections[$auteur]=$(( ${corrections[$auteur]:-0} + 1 ))',
      '  fi',
      'done',
      'for auteur in "${!corrections[@]}"; do',
      '  echo "$auteur : ${corrections[$auteur]} corrections"',
      'done'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Structure de présentation : lit n lignes « minute partie » (open/body/close) et valide l\'ordre avec drapeau de rupture.',
      'Grandma Rule : lit n mots « mot famille » (tech/simple) et calcule le score de clarté /10 avec pénalités de 2.',
      'Thought groups : lit n positions (run/pause) et compte les séquences robot de plus de 4 mots.',
      'Suivi de fluidité : lit n jours « jour defauts » et compte les améliorations, puis le verdict progresse/stagne.'
    ], [
      'read -r n',
      'etape=0 ; rompu=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r minute partie',
      '  if [ "$rompu" = "0" ]; then',
      '    if [ "$partie" = "open" ] &amp;&amp; [ "$etape" = "0" ]; then etape=1 ; echo "ok"',
      '    elif [ "$partie" = "body" ] &amp;&amp; [ "$etape" = "1" -o "$etape" = "2" ]; then etape=2 ; echo "ok"',
      '    elif [ "$partie" = "close" ] &amp;&amp; [ "$etape" = "2" ]; then etape=3 ; echo "ok"',
      '    else rompu=1 ; echo "hors structure"; fi',
      '  else echo "hors structure"; fi',
      'done',
      '',
      'read -r n',
      'penalite=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r mot famille',
      '  if [ "$famille" = "tech" ]; then penalite=$((penalite + 2)) ; fi',
      'done',
      'score=$((10 - penalite))',
      '[ "$score" -lt 0 ] &amp;&amp; score=0',
      'echo "score : $score/10"',
      '',
      'read -r n',
      'courant=0 ; robots=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r position groupe',
      '  if [ "$groupe" = "run" ]; then courant=$((courant + 1))',
      '  else',
      '    [ "$courant" -gt 4 ] &amp;&amp; robots=$((robots + 1))',
      '    courant=0',
      '  fi',
      'done',
      '[ "$courant" -gt 4 ] &amp;&amp; robots=$((robots + 1))',
      'echo "sequences robot : $robots"',
      '',
      'read -r n',
      'precedent="" ; ameliorations=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r jour defauts',
      '  if [ -n "$precedent" ] &amp;&amp; [ "$defauts" -lt "$precedent" ]; then',
      '    ameliorations=$((ameliorations + 1))',
      '  fi',
      '  precedent=$defauts',
      'done',
      'echo "ameliorations : $ameliorations"'
    ].join('\n')),

    '  <h2>Projet intégrateur — « correcteur de courriels de l\'équipe »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit le journal d\'envoi d\'une équipe : d\'abord <code>n_emails</code> emails au ' +
      'format <code>auteur parties</code> où parties est une suite de lettres CLEAR (par exemple ' +
      '<code>CLAR</code> — cinq lettres = email complet), puis <code>n_mots</code> mots au format ' +
      '<code>mot registre</code> (form/reduce). Il produit le rapport qualité : pour chaque auteur, nombre ' +
      'd\'emails complets et incomplets ; puis les corrections de registre à appliquer ; enfin le verdict ' +
      'global : « equipe prete » si tous les emails sont complets et zéro reduction, « formation requise » ' +
      'sinon.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les deux blocs sans mélanger emails et mots.</li>',
      '      <li><strong>Analyser</strong> chaque suite CLEAR : complète si C, L, E, A, R tous présents.</li>',
      '      <strong><li>Agréger</li></strong> par auteur avec des tableaux associatifs.',
      '      <li><strong>Compter</strong> les reductions et citer leur forme formelle.</li>',
      '      <li><strong>Verdict</strong> final au format exact du cahier des charges.</li>',
      '    </ol>',
      '    <p>Contraintes : parsing lettre à lettre des suites CLEAR, <code>declare -A</code> par auteur, bilan après lecture complète.</p>'
    ].join('\n')),
    box('method', 'Grille d\'auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture des deux blocs et parsing CLEAR <strong>20</strong>' },
        { cls: '', text: 'Agrégation par auteur correcte <strong>20</strong>' },
        { cls: '', text: 'Corrections de registre avec formes cibles <strong>20</strong>' },
        { cls: '', text: 'Verdict global conforme <strong>20</strong>' },
        { cls: '', text: 'Rapport lisible et formats exacts <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n_emails',
    'declare -A complets',
    'declare -A incomplets',
    'tout_complets=1',
    'for ((k=0; k&lt;n_emails; k++)); do',
    '  read -r auteur parties',
    '  declare -A vues',
    '  for ((j=0; j&lt;${#parties}; j++)); do',
    '    vues[${parties:$j:1}]=1',
    '  done',
    '  if [ -n "${vues[C]:-}" ] &amp;&amp; [ -n "${vues[L]:-}" ] &amp;&amp; [ -n "${vues[E]:-}" ] &amp;&amp;',
    '     [ -n "${vues[A]:-}" ] &amp;&amp; [ -n "${vues[R]:-}" ]; then',
    '    complets[$auteur]=$(( ${complets[$auteur]:-0} + 1 ))',
    '  else',
    '    incomplets[$auteur]=$(( ${incomplets[$auteur]:-0} + 1 ))',
    '    tout_complets=0',
    '  fi',
    '  unset vues',
    'done',
    'read -r n_mots',
    'reductions=0',
    'for ((k=0; k&lt;n_mots; k++)); do',
    '  read -r mot registre',
    '  if [ "$registre" = "reduce" ]; then',
    '    echo "correction : $mot"',
    '    reductions=$((reductions + 1))',
    '  fi',
    'done',
    'for auteur in "${!complets[@]}"; do',
    '  echo "$auteur : ${complets[$auteur]} complets / ${incomplets[$auteur]:-0} incomplets"',
    'done',
    'if [ "$tout_complets" = "1" ] &amp;&amp; [ "$reductions" = "0" ]; then',
    '  echo "verdict : equipe prete"',
    'else',
    '  echo "verdict : formation requise"',
    'fi'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine parsing lettre à lettre, agrégation par auteur, corrections de registre ' +
    'et verdict global — les chapitres 1, 2 et 5 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d\'après les supports « English for IT Professionals » (B1 IT, sessions 1-4). ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours d\'Anglais des affaires B1 : ' +
        'scripts Bash gradués et correcteur de courriels d\'équipe.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours d\'Anglais des affaires B1 : ' + chapitre.toc +
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
