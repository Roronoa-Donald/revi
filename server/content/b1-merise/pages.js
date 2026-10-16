/**
 * Pages transverses du cours de Modélisation (MERISE) B1.
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
    '    <span class="tag tag--time">MERISE</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>distinguer donnée, information et connaissance, et situer les trois sous-systèmes de l\'entreprise ;</li>',
      '      <li>placer les six modèles MERISE (MCD, MLD, MPD, MCT, MOT, MOpT) sur leurs trois niveaux ;</li>',
      '      <li>construire un dictionnaire de données et extraire les dépendances fonctionnelles ;</li>',
      '      <li>dessiner un MCD : entités, associations, cardinalités, identifiants ;</li>',
      '      <li>passer du MCD au MLD relationnel avec clés primaires et étrangères ;</li>',
      '      <li>vérifier et corriger un schéma avec les formes normales 1FN, 2FN, 3FN.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Le support déroule la méthode en sept thèmes : le système d\'information, la méthode MERISE, le ' +
      'dictionnaire de données, le MCD, le MLD et le relationnel, la normalisation, le MCT. Ce cours en ' +
      'garde l\'ordre et fait manipuler chaque mécanisme <strong>en Bash</strong> : un script qui reproduit ' +
      'l\'analyse exacte de l\'analyste, exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les applications du support (facture TogoMall, contre-exemples des formes normales).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo MERISE</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Modélisation (MERISE) B1 — analyser, modéliser, normaliser | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du vocabulaire du système d\'information ' +
    'jusqu\'aux formes normales. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de ' +
    'niveau B1 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas méthodologiques</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo MERISE</span><br><span class="toc__d">La chaîne donnée-information, les six modèles, les règles de passage MCD vers MLD, les formes normales.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : la chaîne complète d\'analyse d\'un système de facturation.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Modélisation (MERISE) B1 : ' + chapterList.length +
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
    '  <h1>Atelier d’analyse &amp; Bac à sable</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Bash derrière. Écris un script, ' +
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une règle de gestion devient un programme.</p>',
    box('objectifs', 'Comment fonctionne l\'atelier', 'target', [
      '    <ul>',
      '      <li><strong>Valider</strong> vérifie la conformité de vos réponses dans la grille d’analyse.</li>',
      '      <li><strong>Données du cas</strong> contient les paramètres soumis à l’étude.</li>',
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
      '  <script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie du cours.\n# Rédigez votre analyse sous forme de grille structurée.\n\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — mini-MCD textuel</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends un mécanisme de ' +
      'MERISE (cardinalités, règles de passage, formes normales), programme-le et teste-le sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé classe les associations : réflexive, hiérarchique (sans données) ou ' +
      'porteuse, puis compte les tables à créer au MLD. Ajoute les cardinalités, une vérification ' +
      'd\'identifiant, ou remplace tout le script par le mécanisme que tu veux vérifier.</p>',
      '      <p>Dans l\'outil AnalyseSI, ce seront des rectangles et des patates : la structure du script — ' +
      'lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Cas d’exemple</b><pre>4',
      'CLIENT CLIENT 0',
      'CLIENT PRODUIT Qté',
      'CLIENT FACTURE 0',
      'PRODUIT CATEGORIE 0</pre></div>',
      '      <div class="lab__sample-part"><b>Résolution attendue</b><pre>reflexive : CLIENT sur elle-meme',
      'portuese : CLIENT - PRODUIT (Qté)',
      'hierarchique : CLIENT - FACTURE',
      'hierarchique : PRODUIT - CATEGORIE',
      'tables a creer au MLD : 1</pre></div>',
      '    </div>',
      '    <p class="lab__note">Cinq lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai outil</h2>',
    '  <p>La simulation a une limite assumée : aucun schéma graphique n\'est dessiné — le MCD reste du texte ' +
    'structuré. Elle a une force : <strong>toute la logique se vérifie sans risque</strong> — on peut rejouer ' +
    'une analyse autant de fois que nécessaire. Quand le script reproduit les bons trajets — lire la règle de ' +
    'gestion, la traduire en dépendance ou en cardinalité, rapporter — le passage à l\'outil de dessin est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Compteur dans la boucle</strong> : le bilan des tables s\'affiche à chaque ligne au lieu d\'une seule fois, après.</li>',
      '      <li><strong>Cas partiels</strong> : le test ne couvre qu\'un type d\'association et juge les autres par un défaut silencieux.</li>',
      '      <li><strong>Clé oubliée</strong> : le tableau associatif est utilisé sans <code>declare -A</code>, et les cumuls s\'écrasent.</li>',
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
    'que le mécanisme de modélisation est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Système d\'information' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler MERISE | ' + course.brand,
      description: 'Atelier de scripts du cours de Modélisation (MERISE) B1 : éditeur dans le navigateur, ' +
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo MERISE' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Modélisation (MERISE) B1 : notions clés des ' +
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
    '  <h1>Mémo MERISE</h1>',
    '  <p class="lead">La méthode sur une page, dans l\'ordre d\'une mission d\'analyse. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Du document au système d\'information', [
      '<pre><code>donnee + traitement + contexte = information\n',
      'information + raisonnement     = connaissance\n',
      '\n',
      'systeme de decision  pilote (objectifs, controles)\n',
      'systeme operant      produit (biens, services)\n',
      'systeme d\'information memorise, traite, transmet\n',
      '\n',
      'domaines : economique / juridique / technique / commercial</code></pre>',
      '<p>Une valeur brute ne décide de rien : c\'est son interprétation dans un contexte qui éclaire.</p>'
    ].join('\n')),

    bloc('La méthode et ses six modèles', [
      '<pre><code>              DONNEES              TRAITEMENTS\n',
      'conceptuel    MCD (quoi ?)         MCT (quoi ?)\n',
      'logique       MLD (comment organiser ?)   MOT\n',
      'physique      MPD (comment realiser ?)    MOpT\n',
      '\n',
      'double demarche : par niveaux ET par etapes\n',
      'vision statique (donnees) / vision dynamique (traitements)\n',
      'separation : le taux de TVA est une DONNEE, pas du code</code></pre>',
      '<p>Du théorique vers la pratique : quoi, comment organiser, comment réaliser.</p>'
    ].join('\n')),

    bloc('Dictionnaire de données et DF', [
      '<pre><code>proprietes : elementaire / composee / calculee\n',
      'calculee (TTC) : on la recalcule, on ne la memorise pas\n',
      '\n',
      'DF : A → B   (connaitre A suffit pour connaitre B)\n',
      'NumClt → NomClt      NumCde → DateCde      NumCde → NumClt (CIF)\n',
      '\n',
      'matrice des dependances : sources x cibles\n',
      'l\'identifiant candidat determine le plus de proprietes</code></pre>',
      '<p>Chaque DF se justifie par une règle de gestion ou un document réel.</p>'
    ].join('\n')),

    bloc('Le MCD : entités, associations, cardinalités', [
      '<pre><code>identifiant : stable + minimal + univalue (simple ou compose)\n',
      '\n',
      'CLIENT 1,1 ---- emettre ---- 1,n FACTURE\n',
      'CLIENT 0,n --- commander -- 1,n PRODUIT   (QteCdee : porteuse)\n',
      '\n',
      '(0,1) au plus une     (1,1) exactement une\n',
      '(0,n) zero ou plusieurs   (1,n) au moins une\n',
      '\n',
      'association porteuse     : des donnees → future table\n',
      'association hierarchique : rien a porter</code></pre>',
      '<p>La cardinalité se lit depuis l\'entité qu\'elle orne ; chacune se justifie par une phrase du métier.</p>'
    ].join('\n')),

    bloc('Le MLD relationnel et les intégrités', [
      '<pre><code>regle 1 : entite                    → table (identifiant = cle primaire)\n',
      'regle 2 : association porteuse      → table (cle = concatenation des identifiants)\n',
      'regle 3 : association (0,1) ou (1,1) → cle etrangere migree, pas de table\n',
      '\n',
      'CLIENT (NumClt, NomClt, AdrClt)\n',
      'COMMANDE (NumCde, DateCde, #NumClt)\n',
      'LIGNE_CDE (#NumCde, #RefPdt, Quantite)\n',
      '\n',
      'integrites : domaine / relation (pk unique, non nulle) / referentielle (fk → pk)</code></pre>',
      '<p>Le # marque la clé étrangère : chaque # est un lien à contrôler par le SGBD.</p>'
    ].join('\n')),

    bloc('La normalisation : 1FN, 2FN, 3FN', [
      '<pre><code>anomalies : redondance, mise a jour multiple, insertion, suppression\n',
      '\n',
      '1FN  cle unique et stable ; attributs monovalues, non decomposables\n',
      '2FN  tout attribut non cle depend de TOUTE la cle (si cle composee)\n',
      '     partielle : #NumCde, #RefPdt, DesignationPdt  ← depend de RefPdt seul\n',
      '3FN  aucun attribut ne depend d\'un attribut non cle\n',
      '     transitive : Num → code_categ → nom_categ\n',
      '\n',
      'remede : decomposer, la cle suit la donnee deplacee\n',
      'devise  : « la cle, toute la cle, rien que la cle »</code></pre>',
      '<p>Normaliser ne perd pas l\'information : elle change de table, sa clé avec elle.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre donnée et information : le sens vient de l\'interprétation.</li>',
      '    <li>Placer le MLD au niveau conceptuel, ou le MPD au niveau logique.</li>',
      '    <li>Coder le taux de TVA dans le programme : c\'est une donnée.</li>',
      '    <li>Mémoriser une propriété calculée (TTC) : elle se recalcule.</li>',
      '    <li>Poser une cardinalité du mauvais côté, ou oublier le min.</li>',
      '    <li>Créer une table pour une association (0,1)/(1,1) : sa clé migre en #.</li>',
      '    <li>Oublier le # des clés étrangères dans le schéma relationnel.</li>',
      '    <li>Vérifier la 2FN sur une clé simple : la 1FN la donne déjà.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo MERISE — ' + course.brand,
      description: 'Mémo du cours de Modélisation (MERISE) B1 : données et traitements, six modèles, ' +
        'dictionnaire et DF, MCD, règles de passage MLD, intégrités et formes normales sur une page.',
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
      intro: 'Sujet type épreuve — système d\'information, méthode, dictionnaire et DF.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Vocabulaire',
          text: 'Classer les éléments suivants en donnée, information ou connaissance, en justifiant : « 12000 » ; « chiffre d\'affaires de mars : 12000 » ; « comme le CA de mars dépasse l\'objectif, on renforce le stock » ; « 25/12/2025 ».',
          sol: '« 12000 » : <strong>donnée</strong> (valeur brute, aucun contexte). « CA de mars : 12000 » : <strong>information</strong> (donnée structurée, interprétable : période + indicateur). « On renforce le stock » : <strong>connaissance</strong> (raisonnement sur l\'information, décision). « 25/12/2025 » : <strong>donnée</strong> (une date brute ne dit pas encore ce qu\'elle date).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Niveaux',
          text: 'Placer sur les trois niveaux : le choix du SGBD, la définition des entités Client et Produit, la répartition des traitements entre postes et heures, l\'écriture des programmes, la question « quelles données mémoriser ? », les index des tables.',
          sol: '<strong>Conceptuel</strong> : entités Client/Produit ; « quelles données mémoriser » (le quoi). <strong>Logique/organisationnel</strong> : répartition des traitements (qui fait quoi, quand) ; c\'est là que vit le MLD. <strong>Physique</strong> : choix du SGBD, programmes, index (comment réaliser).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Propriétés',
          text: 'Dans une facture : NumFacture, DateFacture, NomClient, AdresseComplete, MontantTTC, MontantHT, TauxTVA. Constituer le dictionnaire : nature de chaque propriété, et celles que le MCD écarte en justifiant.',
          sol: '<strong>Élémentaires</strong> : NumFacture, DateFacture, MontantHT, TauxTVA. <strong>Composée</strong> : AdresseComplete (numéro, rue, ville — à décomposer). <strong>Calculées</strong> : MontantTTC = MontantHT × (1 + TauxTVA) — écartée, elle se recalcule. NomClient : élémentaire côté CLIENT (pas côté facture). Le MCD retient tout sauf AdresseComplete (décomposée) et MontantTTC (calculée).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — DF',
          text: 'Écrire les DF déductibles de ces règles : « un numéro de client identifie un client unique » ; « une facture est émise à une date » ; « chaque client appartient à une catégorie qui porte une remise ». Lesquelles sont des CIF ?',
          sol: 'NumClt → (NomClt, ...) : identifiant. NumFacture → DateFacture. NumClt → CodeCateg ; CodeCateg → Remise. Par transitivité NumClt → Remise (au sens large). <strong>CIF</strong> : NumFacture → NumClt (la facture référence un client existant) ; NumClt → CodeCateg (le client référence une catégorie existante).'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté MCD, MLD et normalisation.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — MCD',
          text: 'Traduire en MCD : « un fournisseur fournit au moins un produit ; un produit est fourni par un ou plusieurs fournisseurs, à un prix qui peut varier selon le fournisseur » ; puis « un employé dirige au plus un service, et un service est dirigé par exactement un employé ».',
          sol: 'FOURNISSEUR <strong>1,n — Fournir — 1,n</strong> PRODUIT, association porteuse : Prix (il dépend du couple). EMPLOYE <strong>0,1 — Diriger — 1,1</strong> SERVICE : côté employé 0,1 (dirige au plus un service), côté service 1,1 (exactement un dirigeant). Diriger est hiérarchique : sa clé migrera en # côté SERVICE.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Passage',
          text: 'Passer au MLD : CLIENT (identifiant NumClt) ; COMMANDE (identifiant NumCde) ; Commander (porteuse : QteCdee) entre CLIENT 0,n et COMMANDE 1,1 ; Appartenir (hiérarchique, 0,1 côté CLIENT) vers CATEGORIE (identifiant CodeCateg).',
          sol: 'CLIENT (NumClt, ..., #CodeCateg) — la règle 3 migre la clé d\'Appartenir. COMMANDE (NumCde, ..., NumClt comme <strong>clé étrangère obligatoire</strong> : cardinalité 1,1 côté commande, soit directement #NumClt). COMMANDER (#NumClt, #NumCde, QteCdee) — règle 2, clé = concaténation. CATEGORIE (CodeCateg, ...).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Normalisation',
          text: 'Soit LIGNE_FACTURE (NumFacture, RefProduit, DesignationProduit, PrixUnitaire, Quantite). Vérifier 1FN, 2FN, 3FN ; corriger si besoin en donnant les DF.',
          sol: '<strong>1FN</strong> : ok (clé composée, attributs atomiques). <strong>2FN</strong> : violée — DesignationProduit et PrixUnitaire dépendent de RefProduit seul (dépendance partielle). Décomposer : PRODUIT (RefProduit, DesignationProduit, PrixUnitaire) et LIGNE_FACTURE (NumFacture, #RefProduit, Quantite). <strong>3FN</strong> : après décomposition, ok (Quantite dépend de toute la clé, rien de transitif).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Anomalies',
          text: 'FOURNISSEUR (NomFourn, Adresse, Produit, Prix) contient : « TMB | Rue A | Chaise | 30000 » et « TMB | Rue A | Table | 55000 ». Citer les anomalies concrètes sur ce cas, puis le remède.',
          sol: 'Redondance (adresse répétée), mise à jour (TMB déménage : deux lignes à retoucher, risque d\'incohérence), insertion (nouveau produit de TMB : ressaisir l\'adresse), suppression (dernier produit supprimé : TMB disparaît), et pas de clé (deux « TMB » : même fournisseur ?). Remède : identifier NumFourn, décomposer en FOURNISSEUR (NumFourn, NomFourn, Adresse...) et FOURNIR (#NumFourn, #RefProduit, Prix).'
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
    { stem: 'La donnée devient information…', opts: ['dès qu\'elle est saisie', 'quand elle est interprétée dans un contexte', 'après sauvegarde'], correct: 1, exp: 'Donnée + traitement + contexte = information.' },
    { stem: 'Le MLD répond à…', opts: ['quoi ?', 'comment organiser le stockage ?', 'comment réaliser ?'], correct: 1, exp: 'Niveau logique : la forme machinale du MCD.' },
    { stem: 'Le taux de TVA est…', opts: ['un traitement', 'une donnée', 'une cardinalité'], correct: 1, exp: 'Mémorisé comme donnée, il change sans réécrire les programmes.' },
    { stem: 'MontantTTC dans le dictionnaire est…', opts: ['élémentaire', 'composée', 'calculée, à écarter'], correct: 2, exp: 'Il se déduit du HT et du taux : le MCD ne le mémorise pas.' },
    { stem: '(1,n) côté Client sur Commander signifie…', opts: ['un client commande au moins un produit', 'un produit a au moins un client', 'exactement une commande'], correct: 0, exp: 'La cardinalité se lit depuis l\'entité qu\'elle orne.' },
    { stem: 'Une association porteuse devient au MLD…', opts: ['une table, clé concaténée', 'un attribut', 'rien'], correct: 0, exp: 'Règle 2 : table dont la clé primaire est la concaténation des identifiants.' },
    { stem: 'Le symbole # dans un schéma marque…', opts: ['la clé primaire', 'la clé étrangère', 'un index'], correct: 1, exp: 'COMMANDE (NumCde, DateCde, #NumClt).' },
    { stem: 'L\'intégrité référentielle impose…', opts: ['fk → pk existante', 'pk unique', 'valeurs dans le domaine'], correct: 0, exp: 'Une clé étrangère référence une clé primaire existante.' },
    { stem: 'DesignationPdt dépend de RefPdt seul (clé composée) : 2FN…', opts: ['respectée', 'violée : dépendance partielle', 'violée : transitive'], correct: 1, exp: 'L\'attribut dépend d\'une partie de la clé, pas de toute la clé.' },
    { stem: 'Num → code_categ → nom_categ : 3FN…', opts: ['respectée', 'violée : dépendance transitive', 'sans rapport'], correct: 1, exp: 'nom_categ dépend d\'un attribut non clé : décomposer en CATEGORIE.' }
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
      '<strong>Réserve 15 min de relecture</strong> : natures de propriétés, sens des DF, cardinalités justifiées, formes normales dans l\'ordre.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible les règles de passage et la 3FN.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après le support « Conception et modélisation des systèmes d\'information ». ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Modélisation (MERISE) B1 : sujets chronométrés sur le système ' +
        'd\'information, la méthode, le dictionnaire de données, le MCD, le MLD et la normalisation.',
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
    '    <details><summary>Corrections &amp; modèles Merise</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de modélisation conceptuelle, logique et organisationnelle du système d’information.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Identifier les entités, propriétés et identifiants uniques dans un texte de cahier des charges.',
      'Positionner correctement les cardinalités minimales (0 ou 1) et maximales (1 ou n) sur une association binaire.',
      'Distinguer une propriété d’entité d’une propriété portée par une association.',
      'Appliquer la règle de passage du MCD au MLD pour une association binaire de type (1,1)-(0,n).'
    ], [
      '<p><strong>1. Entité &amp; identifiant :</strong> Une entité regroupe des occurrences homogènes ; son identifiant garantit l’unicité absolue de chaque occurrence.</p>',
      '<p><strong>2. Cardinalités :</strong> 0,1 (au plus un) ; 1,1 (exactement un) ; 0,n (zéro, un ou plusieurs) ; 1,n (au moins un).</p>',
      '<p><strong>3. Propriété portée :</strong> Une propriété appartient à une association quand sa valeur dépend conjointement des deux entités reliées (ex: <em>quantité_commandée</em> dépend de Commande et Produit).</p>',
      '<p><strong>4. Règle de passage 1,1 - 0,n :</strong> L’identifiant de l’entité côté 0,n migre comme clé étrangère (FK) dans la table côté 1,1.</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Modéliser une association plusieurs-à-plusieurs (0,n)-(0,n) et en déduire la table de liaison au niveau MLD.',
      'Vérifier les trois premières formes normales (1FN, 2FN, 3FN) sur un schéma relationnel.',
      'Représenter un Modèle Conceptuel de Traitements (MCT) avec événements déclencheurs, opérations et synchronisations.',
      'Gérer les associations réflexives (ex: salarié managé par un autre salarié) au niveau conceptuel et logique.'
    ], [
      '<p><strong>1. Association n-n :</strong> L’association devient une table dédiée dont la clé primaire est la concaténation des deux clés primaires des entités reliées.</p>',
      '<p><strong>2. Formes normales :</strong> 1FN (valeurs atomiques) ; 2FN (1FN + dépendance totale de la clé) ; 3FN (2FN + pas de dépendance transitive entre colonnes non-clés).</p>',
      '<p><strong>3. MCT :</strong> Événement entrant &rarr; Règle de synchronisation (ET / OU) &rarr; Opération métier &rarr; Événement résultat émis selon conditions.</p>',
      '<p><strong>4. Réflexive :</strong> La table héberge une clé étrangère pointant vers sa propre clé primaire (auto-jointure).</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Concevoir le schéma conceptuel complet (MCD) d’une plateforme de réservation d’hôtels avec gestion des chambres, tarifs saisonniers et paiements.',
      'Résoudre les redondances et boucles d’associations en isolant les dépendances fonctionnelles strictes.',
      'Traduire le Modèle Organisationnel des Traitements (MOT) en précisant les postes de travail, la nature des tâches (manuelle/automatisée) et la périodicité.',
      'Rédiger le dictionnaire des données normalisé avec types, longueurs et contraintes d’intégrité.'
    ], [
      '<p><strong>1. MCD Hôtellerie :</strong> Entités Hôtel, Chambre, Client, Réservation, Facture avec associations tarification saisonnière et occupation.</p>',
      '<p><strong>2. Dépendances fonctionnelles :</strong> Chaque dépendance non élémentaire ou transitive est décomposée pour garantir l’intégrité sans duplication.</p>',
      '<p><strong>3. MOT :</strong> Découpage en phases organisationnelles : poste Accueil (temps réel), traitement batch facturation (quotidien différé).</p>',
      '<p><strong>4. Dictionnaire :</strong> Nom canonique, Libellé métier, Type SQL, Longueur, Contrainte de non-nullité et domaine de valeurs autorisées.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Conception du Système d’Information Merise</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce projet intégrateur consiste à concevoir l’intégralité du système d’information d’un réseau logistique de transport : élaboration du dictionnaire de données, matrice des dépendances fonctionnelles, MCD, MLD normalisé en 3FN et Modèle Conceptuel des Traitements (MCT).</p>'
    ].join('\n')),
    box('objectifs', 'Compétences de modélisation évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Rigueur conceptuelle :</strong> Absence totale de redondance et respect des formes normales.</li>',
      '      <li><strong>Traduction relationnelle :</strong> Dérivation mécanique irréprochable du MLD avec intégrité référentielle.</li>',
      '      <li><strong>Modélisation dynamique :</strong> Cohérence globale entre données statiques (MCD) et flux d’événements (MCT/MOT).</li>',
      '      <li><strong>Documentation professionnelle :</strong> Qualité graphique des diagrammes et clarté des règles de gestion métier.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de modélisation Merise B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de modélisation Merise B1 : MCD, MLD normalisé en 3FN et processus MCT.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours de Modélisation (MERISE) B1 : ' + chapitre.toc +
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
