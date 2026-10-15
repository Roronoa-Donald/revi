/**
 * Pages transverses du cours de bases de données & SQL B1.
 *
 * Elles ne dépendent que du kit de gabarit : accueil, sommaire, atelier (zone
 * libre de scripts Bash au-dessus du simulateur SQL — sql.js en WebAssembly,
 * jeu de données parc_auto du support), cartes, mémo, examens blancs,
 * exercices. Les chapitres portent en plus trois exercices de code corrigés
 * (catalogue `server/exercises/b1-sql.js`), injectés avant le QCM.
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
    '    <span class="tag tag--time">Bases de données</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li> employer le vocabulaire exact : base, SGBD, modèle relationnel, clés ;</li>',
      '      <li> choisir les types de données et écrire un CREATE TABLE complet ;</li>',
      '      <li> interroger une table : SELECT, WHERE, DISTINCT, ORDER BY, LIMIT ;</li>',
      '      <li> relier les tables : INNER JOIN, LEFT JOIN, alias et colonnes préfixées ;</li>',
      '      <li> analyser par groupes : COUNT, SUM, AVG, GROUP BY, HAVING ;</li>',
      '      <li> modifier sous contrôle : UPDATE, DELETE, ALTER, utilisateurs et privilèges.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Chaque chapitre part d’une question concrète sur le <strong>parc auto</strong> du support ' +
      '(tables Marque et Voiture : 12 marques, 23 voitures), montre la requête et sa lecture, puis se ' +
      'termine par <strong>trois exercices de code corrigés</strong> et un QCM. La logique des requêtes — ' +
      'filtre, jointure, agrégat, privilège — se programme en Bash dans la page et s’exécute réellement ; ' +
      'les requêtes SQL s’essaient en réel dans le <a href="atelier.html">simulateur intégré</a> : rien ' +
      'à installer, la base est déjà chargée.</p>',
      '    <p>Le simulateur tourne sous SQLite (WebAssembly) : les requêtes du cours — SELECT, jointures, ' +
      'agrégats — y fonctionnent à l’identique de MySQL. Les commandes d’administration (CREATE USER, ' +
      'GRANT) restent décrites dans le cours et rejouées en Bash, qui sait décider qui a le droit de faire quoi.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo SQL</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier &amp; simulateur</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices guidés</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Bases de données & SQL — interroger une base (B1) | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du vocabulaire des bases de données jusqu’aux ' +
    'utilisateurs et privilèges. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de ' +
    'niveau B1 ou supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices de code corrigés</strong> : tu écris ' +
    'vraiment le script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. Toutes ' +
    'les requêtes du cours s’essaient aussi dans le <a href="atelier.html">simulateur SQL intégré</a> ' +
    '— base parc_auto déjà chargée, résultats affichés en tableau. L’<a href="exercices/exercices.html">page ' +
    'exercices</a> propose en plus huit missions graduées avec leurs requêtes de référence.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo SQL</span><br><span class="toc__d">Syntaxes, ordre des clauses, types et privilèges sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices guidés</span><br><span class="toc__d">Huit missions SQL graduées sur le parc auto, requêtes de référence incluses.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier &amp; simulateur</span><br><span class="toc__d">Écrire et exécuter des scripts Bash, puis du SQL réel dans le simulateur (base parc_auto chargée).</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de bases de données et SQL B1 : ' + chapterList.length +
        ' chapitres, simulateur SQL intégré, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier : simulateur SQL ======================== */

const PARC_SQL = [
  'CREATE TABLE Marque (',
  '  codemarque TEXT PRIMARY KEY,',
  '  nommarque  TEXT NOT NULL,',
  '  paysmarque TEXT NOT NULL',
  ');',
  'CREATE TABLE Voiture (',
  '  immat     TEXT PRIMARY KEY,',
  '  marque    TEXT NOT NULL,',
  '  moteur    TEXT NOT NULL,',
  '  datecirc  TEXT,',
  '  km        INTEGER NOT NULL,',
  '  pxachat   INTEGER NOT NULL,',
  '  nbreplace INTEGER NOT NULL',
  ');',
  "INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES",
  "('TOY','TOYOTA','JAPON'),('MIT','MITSUBISHI','JAPON'),('MAZ','MAZDA','JAPON'),",
  "('NIS','NISSAN','JAPON'),('SUZ','SUZUKI','JAPON'),('BNZ','MERCEDES BENZ','ALLEMAGNE'),",
  "('BMW','BMW','ALLEMAGNE'),('KIA','KIA','COREE DU SUD'),('HYU','HYUNDAI','COREE DU SUD'),",
  "('REN','RENAULT','FRANCE'),('PEU','PEUGEOT','FRANCE'),('MG','MG','ROYAUME-UNI');",
  "INSERT INTO Voiture (immat, marque, moteur, datecirc, km, pxachat, nbreplace) VALUES",
  "('TG-7854-Z','MERCEDES BENZ','DIESEL','2000-01-21',500,6000000,5),",
  "('TG-6733-AB','MERCEDES BENZ','DIESEL','2002-01-21',0,16000000,5),",
  "('TG-2020-AC','MERCEDES BENZ','ESSENCE','2003-03-21',0,9000000,5),",
  "('TG-3733-AC','TOYOTA','HYBRIDE','2010-01-21',0,20000000,7),",
  "('TG-6733-AC','MERCEDES BENZ','DIESEL','2012-01-21',0,9600000,5),",
  "('TG-5420-AF','SUZUKI','ELECTRIQUE','2013-01-21',10000,21600000,5),",
  "('TG-9420-AF','TOYOTA','ESSENCE','2013-09-21',0,50000000,7),",
  "('TG-1200-AK','SUZUKI','ELECTRIQUE','2014-01-21',0,11600000,5),",
  "('TG-9420-AK','TOYOTA','ESSENCE','2014-09-21',100,50000000,7),",
  "('TG-0020-AL','TOYOTA','DIESEL','2014-11-21',0,50000000,7),",
  "('TG-4444-AL','HYUNDAI','ESSENCE','2015-09-21',5,10000000,5),",
  "('TG-5420-AL','BMW','ESSENCE','2015-10-21',0,50000000,7),",
  "('TG-0020-AV','MITSUBISHI','ESSENCE','2018-10-21',30,50000000,7),",
  "('TG-0480-AV','BMW','ELECTRIQUE','2015-12-21',0,50000000,5),",
  "('TG-1420-AW','MAZDA','ESSENCE','2016-02-01',0,17000000,5),",
  "('TG-2540-AW','KIA','ESSENCE','2016-10-21',0,50000000,7),",
  "('TG-5220-BA','NISSAN','ESSENCE','2019-10-21',6700,10000000,5),",
  "('TG-2222-BC','RENAULT','DIESEL','2020-01-20',0,15000000,5),",
  "('TG-3333-BC','PEUGEOT','ESSENCE','2021-03-15',0,20000000,5),",
  "('TG-4444-BC','PEUGEOT','DIESEL','2021-06-10',25000,30000000,7),",
  "('TG-5555-BC','MG','ESSENCE','2022-08-01',0,20000000,5),",
  "('TG-6666-BC','TOYOTA','HYBRIDE','2023-05-20',0,25000000,7),",
  "('TG-7777-BC','HYUNDAI','ELECTRIQUE','2023-09-12',0,23000000,5);"
].join('\n');

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de scripts &amp; simulateur SQL</h1>',
    '  <p class="lead">Deux machines dans une page : un éditeur Bash dont chaque script est réellement ' +
    'exécuté côté serveur, et un vrai moteur SQL — base <strong>parc_auto</strong> du support déjà ' +
    'chargée (12 marques, 23 voitures). La logique des requêtes se programme en Bash, les requêtes ' +
    's’essaient en réel : rien à installer.</p>',

    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre script Bash tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>read</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur ; votre code est conservé dans ce navigateur.</li>',
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
      '# Exemple proposé : contrôleur de privilèges.',
      '# Le script lit n lignes « role operation » et dit si',
      '# l’opération est permise (lecture : select seulement ;',
      '# ecriture : select, insert, update ; admin : tout).',
      '',
      'read -r n',
      'for ((i=0; i<n; i++)); do',
      '  read -r role operation',
      '  permis="select"',
      '  case "$role" in',
      '    ecriture) permis="select insert update" ;;',
      '    admin) permis="select insert update delete grant" ;;',
      '  esac',
      '  case " $permis " in',
      '    *" $operation "*) echo "$role/$operation : autorise" ;;',
      '    *) echo "$role/$operation : refuse" ;;',
      '  esac',
      'done',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — contrôleur de privilèges</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends une règle ' +
      'du cours (filtre WHERE, jointure, GROUP BY, privilèges GRANT et REVOKE), programme-la en Bash et ' +
      'teste-la sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé rejoue la matrice des privilèges du chapitre 6 : lecture, écriture, ' +
      'administration. Transforme-le : ajoute un rôle, refuse grant à l’écriture, journalise chaque refus, ' +
      'ou remplace tout le script par la règle SQL que tu veux vérifier.</p>',
      '      <p>Dans le vrai SGBD, ces décisions vivent dans GRANT et REVOKE : la structure du script — ' +
      'lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <p class="lab__note">Le simulateur SQL plus bas exécute les requêtes elles-mêmes : utilise-le pour voir le résultat réel d’un SELECT.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),

    '  <h2>Simulateur SQL</h2>',
    '  <p class="lead">Une base <strong>parc_auto</strong> complète est déjà chargée dans cette page : ' +
    '12 marques, 23 voitures, le jeu de données du support. Écris tes requêtes, exécute-les d’un clic, ' +
    'lis le résultat en tableau — un vrai moteur SQL tourne dans ton navigateur, rien n’est envoyé nulle part.</p>',

    box('objectifs', 'Comment fonctionne le simulateur', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> (ou Ctrl + Entrée) lance tout ce qui est écrit dans l’éditeur, requête par requête, et affiche le résultat de la dernière.</li>',
      '      <li><strong>Réinitialiser</strong> reconstruit la base parc_auto à l’état initial — après un UPDATE ou un DELETE trop large, c’est le bouton magique.</li>',
      '      <li><strong>Historique</strong> garde tes requêtes de la session ; <strong>Exporter</strong> copie le résultat en CSV.</li>',
      '      <li>Le moteur est <strong>SQLite</strong> (WebAssembly) : toutes les requêtes du cours y fonctionnent. Les commandes d’administration (CREATE USER, GRANT) restent du papier.</li>',
      '      <li>Ton script est conservé dans ce navigateur ; aucune donnée ne quitte ta machine.</li>',
      '    </ul>'
    ].join('\n')),

    '  <div class="sqlsim" id="sqlsim">',
    '    <div class="sqlsim__bar">',
    '      <button class="btn btn--primary" id="sqlsim-run">' + ic('play') + ' Exécuter</button>',
    '      <button class="btn" id="sqlsim-reset">' + ic('hourglass') + ' Réinitialiser la base</button>',
    '      <button class="btn" id="sqlsim-export">' + ic('file') + ' Exporter en CSV</button>',
    '      <span class="sqlsim__state" id="sqlsim-state">Chargement du moteur…</span>',
    '    </div>',
    '    <div class="sqlsim__grid">',
    '      <div class="sqlsim__editor">',
    '        <textarea id="sqlsim-query" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Requête SQL">-- Le parc au complet (23 lignes) :\nSELECT * FROM Voiture LIMIT 10;\n\n-- Compte par marque, du plus fourni au plus rare :\nSELECT marque, COUNT(*) AS nb\nFROM Voiture\nGROUP BY marque\nORDER BY nb DESC, marque;</textarea>',
    '      </div>',
    '      <div class="sqlsim__out">',
    '        <div class="sqlsim__tabs" role="tablist">',
    '          <button class="sqlsim__tab is-active" id="sqlsim-tab-table" role="tab">Résultat</button>',
    '          <button class="sqlsim__tab" id="sqlsim-tab-log" role="tab">Journal</button>',
    '        </div>',
    '        <div class="sqlsim__pane" id="sqlsim-pane-table" role="tabpanel">',
    '          <div class="sqlsim__meta" id="sqlsim-meta"></div>',
    '          <div class="sqlsim__table" id="sqlsim-table"></div>',
    '        </div>',
    '        <div class="sqlsim__pane is-hidden" id="sqlsim-pane-log" role="tabpanel">',
    '          <div class="sqlsim__log" id="sqlsim-log"></div>',
    '        </div>',
    '        <div class="sqlsim__missions" id="sqlsim-missions"></div>',
      '      </div>',
    '    </div>',
    '  </div>',

    box('tech', 'Le jeu de données : parc_auto', 'database', [
      '    <p>Deux tables, fidèles au support :</p>',
      '    <ul>',
      '      <li><strong>Marque</strong> (codemarque, nommarque, paysmarque) : 12 lignes, de TOYOTA à MG.</li>',
      '      <li><strong>Voiture</strong> (immat, marque, moteur, datecirc, km, pxachat, nbreplace) : 23 lignes, moteurs DIESEL/ESSENCE/HYBRIDE/ELECTRIQUE, prix de 6 à 50 millions, dates de 2000 à 2023.</li>',
      '    </ul>',
      '    <p>Le lien entre les deux est la colonne <strong>marque</strong> de Voiture, qui porte le ' +
      'nommarque — c’est elle qu’utilisent les jointures du chapitre 4. Après une modification, ' +
      '<strong>Réinitialiser la base</strong> revient à l’état initial.</p>'
    ].join('\n')),

    '  <h2>Missions guidées</h2>',
    '  <p>Huit missions, de la lecture simple à l’analyse groupée : la validation se fait dans le ' +
    'simulateur, en comparant ton résultat au résultat de référence — chaque mission note le nombre de ' +
    'lignes et la première ligne attendue.</p>',
    box('method', 'Démarche conseillée', 'compass', [
      '    <ol>',
      '      <li><strong>Lis la question</strong> et formule-la en français : quelles colonnes, quelles lignes, quel ordre ?</li>',
      '      <li><strong>Écris le squelette</strong> (SELECT…FROM…WHERE…) puis complète la condition.</li>',
      '      <li><strong>Exécute</strong> et compare au résultat de référence affiché sous le simulateur.</li>',
      '      <li><strong>Corrige</strong> : nombre de lignes différent ? La condition WHERE ou le GROUP BY est en cause.</li>',
      '      <li><strong>Réinitialise</strong> la base entre deux essais de mission qui modifient les données.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Bases de données' }),
    disclaimer(course, 'Le simulateur s’exécute intégralement dans ton navigateur : aucune requête n’est ' +
      'envoyée au serveur. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts &amp; simulateur SQL | ' + course.brand,
      description: 'Atelier du cours de bases de données B1 : scripts Bash réellement exécutés, tuteur ' +
        'd’erreurs, et simulateur SQL complet (base parc_auto chargée, missions guidées et mode examen).',
      active: 'atelier',
      body,
      sqlSimulator: true,
      extraHead: ['<link rel="stylesheet" href="assets/css/sql-simulator.css">'],
      extraScripts: ['assets/vendor/sqljs/sql-wasm.js', 'assets/js/sql-simulator.js']
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo SQL' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de bases de données et SQL B1 : notions clés des ' +
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
    '  <h1>Mémo SQL</h1>',
    '  <p class="lead">Syntaxes, ordre des clauses et types du cours sur une page. À garder ouvert pendant ' +
    'le simulateur et les exercices.</p>',

    bloc('Vocabulaire', [
      '<table>',
      '    <tr><th>Terme</th><th>Sens</th></tr>',
      '    <tr><td>Base de données</td><td>informations organisées, interrogeables par le contenu</td></tr>',
      '    <tr><td>SGBD</td><td>logiciel qui gère la base (MySQL, PostgreSQL, SQLite…)</td></tr>',
      '    <tr><td>Table</td><td>lignes (enregistrements) et colonnes (attributs)</td></tr>',
      '    <tr><td>Clé primaire</td><td>identifie chaque ligne sans ambiguïté</td></tr>',
      '    <tr><td>Clé étrangère</td><td>pointe vers une ligne d’une autre table</td></tr>',
      '    <tr><td>NULL</td><td>absence d’information — ni 0, ni chaîne vide</td></tr>',
      '  </table>'
    ].join('\n')),

    bloc('Types de colonnes', [
      '<pre><code>entiers        TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT\n',
      'décimaux exacts  DECIMAL(p, s)   -- l’argent : toujours DECIMAL\n',
      'mesures         FLOAT, DOUBLE    -- arrondis possibles\n',
      'chaînes fixes   CHAR(x)          -- complété d’espaces\n',
      'chaînes variables  VARCHAR(x)    -- stocké tel quel\n',
      'temps           DATE \'AAAA-MM-JJ\', TIME \'HH:MM:SS\', DATETIME, TIMESTAMP, YEAR</code></pre>',
      '<p>INT(x) ne change que l’affichage (avec ZEROFILL), pas le stockage.</p>'
    ].join('\n')),

    bloc('Ordre des clauses (et de l’exécution)', [
      '<pre><code>SELECT   colonnes, agrégats\n',
      'FROM     tables (jointures)\n',
      'WHERE    filtre les LIGNES\n',
      'GROUP BY découpe en GROUPES\n',
      'HAVING   filtre les GROUPES (condition avec agrégat)\n',
      'ORDER BY trie (ASC par défaut, DESC décroissant)\n',
      'LIMIT    n [OFFSET d]   borne le résultat</code></pre>',
      '<p>L’ordre d’écriture est imposé ; une clause déplacée est une erreur de syntaxe.</p>'
    ].join('\n')),

    bloc('Opérateurs de WHERE', [
      '<pre><code>=  &lt;&gt;  !=  &lt;  &lt;=  &gt;  &gt;=\n',
      'BETWEEN a AND b         intervalle inclus\n',
      'IN (v1, v2, …)          appartient à la liste\n',
      "LIKE '%ab'              % = toute suite ; _ = un caractère\n",
      'IS NULL / IS NOT NULL   absence d’information (jamais = NULL)</code></pre>',
      "<p>Les chaînes se quotent avec des apostrophes simples : 'DIESEL'.</p>"
    ].join('\n')),

    bloc('Jointures', [
      '<pre><code>SELECT V.immat, M.nommarque\n',
      'FROM Voiture V\n',
      'INNER JOIN Marque M ON V.marque = M.nommarque   -- correspondances seules\n',
      '\n',
      'FROM Marque M\n',
      'LEFT JOIN Voiture V ON …   -- toute la table de gauche, NULL à droite</code></pre>',
      '<p>Sur une LEFT JOIN, compter COUNT(V.colonne) et non COUNT(*) : les NULL ne se comptent pas. ' +
      'Deux tables qui partagent un nom de colonne : toujours préfixer par l’alias.</p>'
    ].join('\n')),

    bloc('Agrégation', [
      '<pre><code>COUNT(*)              toutes les lignes\n',
      'COUNT(colonne)        lignes sans NULL\n',
      'COUNT(DISTINCT col)   valeurs distinctes\n',
      'MIN(x) / MAX(x)       extrêmes (nombres, textes, dates)\n',
      'SUM(x) / AVG(x)       somme / moyenne (colonnes numériques)\n',
      '\n',
      'GROUP BY col          toute colonne du SELECT y figure ou est agrégée\n',
      'HAVING COUNT(*) &gt; 2   filtre les groupes (jamais WHERE avec un agrégat)</code></pre>'
    ].join('\n')),

    bloc('Modification et droits', [
      '<pre><code>UPDATE table SET col = val WHERE cond;    -- sans WHERE : toute la table\n',
      'DELETE FROM table WHERE cond;             -- sans WHERE : la table est vidée\n',
      'ALTER TABLE t ADD COLUMN c TYPE;          -- évolution de structure\n',
      'DROP TABLE t;                             -- suppression de la structure\n',
      '\n',
      "CREATE USER 'login'@'hote' IDENTIFIED BY 'mdp';   -- % = joker d’hôte\n",
      'GRANT SELECT ON base.table TO \'login\'@\'hote\';\n',
      'REVOKE SELECT ON base.table FROM \'login\'@\'hote\';\n',
      'GRANT ALL PRIVILEGES ON base.* TO … WITH GRANT OPTION;   -- ALL seul ; OPTION = délégation</code></pre>',
      '<p>Tester toute modification par le SELECT équivalent avant de l’exécuter.</p>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo SQL — ' + course.brand,
      description: 'Mémo du cours de bases de données et SQL B1 : vocabulaire, types, ordre des clauses, ' +
        'opérateurs, jointures, agrégation et droits sur une page.',
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
      intro: 'Sujet type — requêtes de lecture et analyse, d’après le style des évaluations B1.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/4 — Lecture filtrée',
          text: 'Écrivez la requête qui liste les voitures diesel mises en circulation avant 2015, de la plus ancienne à la plus récente (immatriculation, marque, date).',
          sol: '<code>SELECT immat, marque, datecirc FROM Voiture<br>WHERE moteur = \'DIESEL\' AND datecirc &lt; \'2015-01-01\'<br>ORDER BY datecirc;</code><br>Résultat : 4 lignes — TG-7854-Z (2000), TG-6733-AB (2002), TG-6733-AC (2012), TG-0020-AL (2014).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Agrégation',
          text: 'Donnez, par type de moteur, le nombre de voitures et le prix moyen d’achat. Quel moteur compte le plus de voitures ?',
          sol: '<code>SELECT moteur, COUNT(*), AVG(pxachat) FROM Voiture GROUP BY moteur;</code><br>ESSENCE domine : 11 voitures (prix moyen ≈ 30,55 M), devant DIESEL (6, ≈ 21,1 M), ELECTRIQUE (4, ≈ 26,55 M) et HYBRIDE (2, 22,5 M).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Jointure',
          text: 'Listez les voitures japonaises (immatriculation et marque), triées par immatriculation. Combien y en a-t-il ?',
          sol: '<code>SELECT V.immat, V.marque FROM Voiture V<br>INNER JOIN Marque M ON V.marque = M.nommarque<br>WHERE M.paysmarque = \'JAPON\' ORDER BY V.immat;</code><br>10 voitures : les marques TOYOTA (5), SUZUKI (2), MITSUBISHI (1), MAZDA (1), NISSAN (1).'
        },
        {
          num: 'Exercice 4',
          badge: '/6 — Analyse complète',
          text: 'Quelles marques ont strictement plus de deux voitures dans le parc ? Donnez leur effectif, du plus grand au plus petit.',
          sol: '<code>SELECT marque, COUNT(*) AS nb FROM Voiture<br>GROUP BY marque HAVING COUNT(*) &gt; 2<br>ORDER BY nb DESC;</code><br>TOYOTA (5) et MERCEDES BENZ (4). Le filtre porte sur un groupe : HAVING, pas WHERE.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté structure, mise à jour et droits.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Création',
          text: 'Écrivez le CREATE TABLE de la table Marque avec clé primaire, puis l’INSERT de TOYOTA (code TOY, Japon).',
          sol: '<code>CREATE TABLE Marque (<br>&nbsp;&nbsp;codemarque CHAR(3) PRIMARY KEY,<br>&nbsp;&nbsp;nommarque VARCHAR(20) NOT NULL,<br>&nbsp;&nbsp;paysmarque VARCHAR(15) NOT NULL<br>);</code><br><code>INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES (\'TOY\', \'TOYOTA\', \'JAPON\');</code>'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Modification',
          text: 'Le parc devient 100 % électrique : toutes les voitures de marque TOYOTA passent en moteur ELECTRIQUE. Écrivez l’UPDATE, puis expliquez pourquoi on teste d’abord par SELECT.',
          sol: '<code>UPDATE Voiture SET moteur = \'ELECTRIQUE\' WHERE marque = \'TOYOTA\';</code><br>Le SELECT avec le même WHERE ramène exactement les lignes qui seront modifiées (5 ici) : on voit avant de toucher. Sans WHERE, toute la table passerait en électrique.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Droits',
          text: 'Créez l’utilisateur gestionnaire se connectant uniquement depuis localhost (mot de passe au choix) et accordez-lui la consultation de toute la base, mais l’écriture seulement sur Voiture.',
          sol: '<code>CREATE USER \'gestionnaire\'@\'localhost\' IDENTIFIED BY \'...mdp...\';</code><br><code>GRANT SELECT ON parc_auto.* TO \'gestionnaire\'@\'localhost\';</code><br><code>GRANT INSERT, UPDATE, DELETE ON parc_auto.Voiture TO \'gestionnaire\'@\'localhost\';</code><br>Principe du moindre privilège : chaque GRANT donne le minimum nécessaire.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — QCM des pièges',
          text: 'Vrai ou faux : (a) COUNT(colonne) compte les NULL ; (b) \'login@hote\' se quotte en un bloc ; (c) GRANT ALL, GRANT OPTION est une syntaxe valide ; (d) DELETE FROM Voiture supprime la table.',
          sol: '(a) Faux — COUNT(colonne) ignore les NULL. (b) Faux — login et hôte se quotent séparément : \'login\'@\'hote\'. (c) Faux — ALL s’emploie seul ; la forme est WITH GRANT OPTION. (d) Faux — DELETE vide la table, DROP TABLE la supprime.'
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
    { stem: 'Que vaut COUNT(immat) sur 34 lignes dont 9 immat NULL ?', opts: ['34', '25', '9'], correct: 1, exp: 'COUNT(colonne) ignore les NULL : 34 − 9 = 25.' },
    { stem: 'Comment teste-t-on NULL dans WHERE ?', opts: ['= NULL', 'IS NULL', 'LIKE NULL'], correct: 1, exp: '= NULL ne renvoie jamais vrai.' },
    { stem: 'Une jointure interne retient…', opts: ['toutes les lignes des deux tables', 'les correspondances des deux côtés', 'les lignes de gauche'], correct: 1, exp: 'Sans correspondance des deux côtés, la ligne disparaît.' },
    { stem: 'Sur une LEFT JOIN, compter les voitures par marque, c’est…', opts: ['COUNT(*)', 'COUNT(V.immat)', 'SUM(*)'], correct: 1, exp: 'COUNT(colonne) ignore les NULL des marques sans voiture.' },
    { stem: 'La clause qui filtre les groupes est…', opts: ['WHERE', 'HAVING', 'ORDER BY'], correct: 1, exp: 'HAVING porte sur le résultat du regroupement, souvent avec un agrégat.' },
    { stem: 'Quel type pour un prix en francs ?', opts: ['FLOAT', 'DECIMAL', 'INT'], correct: 1, exp: 'DECIMAL calcule en décimal exact.' },
    { stem: 'Un littéral DATE s’écrit…', opts: ['\'21/11/2014\'', '\'2014-11-21\'', '21-11-2014'], correct: 1, exp: 'Année, mois, jour, quoté.' },
    { stem: 'UPDATE sans WHERE…', opts: ['est refusé', 'modifie toutes les lignes', 'ne fait rien'], correct: 1, exp: 'La condition limite la modification ; sans elle, toute la table est touchée.' },
    { stem: '\'yeslows\'@\'%\' permet de se connecter…', opts: ['depuis localhost seulement', 'depuis n’importe quel hôte', 'sans mot de passe'], correct: 1, exp: 'Le joker % désigne tous les hôtes.' },
    { stem: 'GRANT OPTION sert à…', opts: ['tout faire sur la base', 'transmettre ses propres privilèges à d’autres', 'créer des tables'], correct: 1, exp: 'Le droit de déléguer, jamais inclus dans ALL.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’épreuve (durée 2 h, /20). ' +
    'Écris les requêtes <strong>dans le simulateur</strong> pour vérifier tes réponses, puis corrige-toi ' +
    'sévèrement avec les corrigés.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu’à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : ordre des clauses, chaînes quotées, WHERE vs HAVING.</p>',
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
      { cls: 'mid', text: '50–69 % — refais les requêtes des chapitres faibles dans le simulateur.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les jointures externes et HAVING.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’épreuve réelle.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices guidés' }),
    disclaimer(course, 'Sujets construits dans l’esprit des évaluations B1. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de bases de données et SQL B1 : sujets chronométrés avec ' +
        'requêtes à vérifier dans le simulateur, corrigés détaillés.',
      active: 'examen',
      body
    }
  };
}

/* ======================== Exercices guidés ======================== */

function exercices(course) {
  const mission = (num, titre, niveau, question, indice, reference, requete) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="item__num">Mission ' + num + '</span><span class="badge badge--' + niveau + '">' + niveau.toUpperCase() + '</span></div>',
    '    <p>' + question + '</p>',
    '    <details><summary>Indice</summary><div class="sol">' + indice + '</div></details>',
    '    <details><summary>Résultat de référence</summary><div class="sol">' + reference + '</div></details>',
    '    <details><summary>Une requête correcte (après avoir essayé !)</summary><div class="sol"><pre><code>' + requete + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices guidés — parc_auto</h1>',
    '  <p class="lead">Huit missions graduées sur la base du support (12 marques, 23 voitures). Écris chaque ' +
    'requête dans le <a href="../atelier.html">simulateur SQL</a>, compare au résultat de référence, puis ' +
    'seulement regarde une requête correcte.</p>',

    '  <h2>Prise en main (chapitre 3)</h2>',
    mission(1, 'Le parc en vrac', 'n1',
      'Affiche toutes les colonnes de toutes les voitures, puis seulement immatriculation et prix. Combien de lignes ?',
      'SELECT * … FROM Voiture ; puis remplace * par la liste des colonnes.',
      '23 lignes dans les deux cas ; la seconde requête affiche 2 colonnes.',
      'SELECT * FROM Voiture;\nSELECT immat, pxachat FROM Voiture;'),
    mission(2, 'Diesels de luxe', 'n1',
      'Affiche les voitures diesel de plus de 20 millions (immat, marque, prix), du plus cher au moins cher.',
      'Deux conditions dans WHERE reliées par AND ; le tri décroissant s’écrit DESC.',
      '4 lignes : TG-9420-AF, TG-9420-AK, TG-0020-AL (TOYOTA), TG-6733-AC (MERCEDES BENZ).',
      'SELECT immat, marque, pxachat FROM Voiture\nWHERE moteur = \'DIESEL\' AND pxachat > 20000000\nORDER BY pxachat DESC;'),

    '  <h2>Restrictions et tri (chapitre 3)</h2>',
    mission(3, 'Doublons et comptages', 'n2',
      'Quels types de moteurs existent dans le parc (sans doublon) ? Combien de marques distinctes ?',
      'DISTINCT se place juste après SELECT ; COUNT(DISTINCT colonne) compte les valeurs distinctes.',
      '4 moteurs (DIESEL, ESSENCE, HYBRIDE, ELECTRIQUE) ; 12 marques distinctes.',
      'SELECT DISTINCT moteur FROM Voiture;\nSELECT COUNT(DISTINCT marque) FROM Voiture;'),
    mission(4, 'Le podium des prix', 'n2',
      'Affiche les 3 voitures les plus chères (immat, marque, prix). Que devient la requête pour la 4e à la 6e place ?',
      'ORDER BY … DESC puis LIMIT n ; OFFSET décale le départ.',
      'Top 3 : TG-9420-AF, TG-9420-AK, TG-0020-AL (50 M chacun) ; pour la 4e-6e : LIMIT 3 OFFSET 3.',
      'SELECT immat, marque, pxachat FROM Voiture\nORDER BY pxachat DESC\nLIMIT 3;\n\nSELECT immat, marque, pxachat FROM Voiture\nORDER BY pxachat DESC\nLIMIT 3 OFFSET 3;'),

    '  <h2>Jointures (chapitre 4)</h2>',
    mission(5, 'Voitures japonaises', 'n2',
      'Liste les voitures de marques japonaises (immat, marque, pays), triées par immatriculation.',
      'Joint Voiture et Marque sur V.marque = M.nommarque ; filtre sur le pays.',
      '10 lignes : 5 TOYOTA, 2 SUZUKI, 1 MITSUBISHI, 1 MAZDA, 1 NISSAN.',
      'SELECT V.immat, V.marque, M.paysmarque\nFROM Voiture V\nINNER JOIN Marque M ON V.marque = M.nommarque\nWHERE M.paysmarque = \'JAPON\'\nORDER BY V.immat;'),
    mission(6, 'Les absentes du parc', 'n3',
      'Y a-t-il des marques de la table Marque sans aucune voiture dans le parc ? Montre-les (nom, pays).',
      'LEFT JOIN depuis Marque garde les marques sans voiture ; compte une colonne de Voiture.',
      'Aucune : les 12 marques ont au moins une voiture (MAZ, NIS, REN, PEU, MG en ont 1). Avec COUNT(V.immat), toutes les lignes valent au moins 1.',
      'SELECT M.nommarque, COUNT(V.immat) AS nb\nFROM Marque M\nLEFT JOIN Voiture V ON V.marque = M.nommarque\nGROUP BY M.nommarque\nHAVING COUNT(V.immat) = 0;'),

    '  <h2>Agrégation (chapitre 5)</h2>',
    mission(7, 'Budget par pays', 'n3',
      'Quel est le budget total des voitures par pays d’origine de la marque ? Du pays le plus coûteux au moins coûteux.',
      'Jointure puis SUM(pxachat) avec GROUP BY sur le pays.',
      'JAPON : 305,2 M ; ALLEMAGNE : 140,6 M ; COREE DU SUD : 83 M ; FRANCE : 65 M ; ROYAUME-UNI : 20 M.',
      'SELECT M.paysmarque, SUM(V.pxachat) AS budget\nFROM Voiture V\nINNER JOIN Marque M ON V.marque = M.nommarque\nGROUP BY M.paysmarque\nORDER BY budget DESC;'),
    mission(8, 'Panier moyen par moteur', 'n3',
      'Pour chaque moteur : nombre de voitures, prix moyen (arrondi au million inférieur), prix maximum. Seulement les moteurs avec au moins 4 voitures.',
      'AVG pour la moyenne, la division entière tronque : CAST(AVG(…) AS INT) ou AVG arithmétique ; le filtre sur le groupe passe par HAVING.',
      '3 lignes : ESSENCE (11 voitures, moyen ≈ 30,5 M, max 50 M), DIESEL (6, ≈ 21,1 M, 50 M), ELECTRIQUE (4, ≈ 26,55 M, 50 M). HYBRIDE (2) est exclue par le HAVING.',
      'SELECT moteur, COUNT(*) AS nb, CAST(AVG(pxachat) AS INT) AS moyen, MAX(pxachat) AS maxi\nFROM Voiture\nGROUP BY moteur\nHAVING COUNT(*) >= 4\nORDER BY nb DESC;'),

    box('pitfall', 'Les réflexes à contrôler', 'warning', [
      '    <ul>',
      '      <li><strong>Toute colonne affichée</strong> est dans le GROUP BY ou agrégée — sinon erreur du moteur.</li>',
      '      <li><strong>Une condition avec COUNT/AVG</strong> vit dans HAVING, jamais dans WHERE.</li>',
      '      <li><strong>Les chaînes se quotent</strong> \'comme ceci\' ; les dates s’écrivent \'AAAA-MM-JJ\'.</li>',
      '      <li><strong>Après une mission qui modifie</strong> (UPDATE/DELETE), réinitialise la base avant la suivante.</li>',
      '    </ul>'
    ].join('\n')),

    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Missions construites sur le jeu de données parc_auto du support. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices guidés — ' + course.brand,
      description: 'Exercices guidés du cours de bases de données et SQL B1 : huit missions graduées sur ' +
        'la base parc_auto, avec indices, résultats de référence et requêtes correctes.',
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
        : { href: '../atelier.html', label: 'Simulateur SQL' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours de bases de données et SQL B1 : ' + chapitre.toc +
        ' Théorie, requêtes commentées, QCM corrigés.',
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

module.exports = { render, PARC_SQL };
