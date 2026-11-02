/**
 * Pages transverses du cours de bases de données & SQL B1.
 *
 * Elles ne dépendent que du kit de gabarit : accueil, sommaire, atelier (zone
 * libre de requêtes SQL au-dessus du simulateur SQL — sql.js en WebAssembly,
 * jeu de données parc_auto du support), cartes, mémo, examens blancs,
 * exercices. Les chapitres portent en plus trois exercices de code corrigés
 * (catalogue `server/exercises/b1-sql.js`), injectés avant le QCM.
 */
'use strict';

const { ic, box, qcm, cards, bands, crumb, esc } = require('../../../scripts/course-kit');
const { PARC_SQL } = require('../../../b1-sql/assets/js/sql-simulator');

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
    '    <span class="tag tag--time">Bases de données</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
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
      '(12 marques et 23 voitures, complétées par des équipements fictifs), montre la requête et sa lecture, puis se ' +
      'termine par <strong>trois exercices SQL</strong> et un QCM. Les exercices utilisent les mêmes ' +
      'définitions de tables, avec des données adaptées ; ceux de création partent d’une base vide. ' +
      'Le <a href="atelier.html">simulateur intégré</a> ' +
      'charge également le parc automobile : rien à installer.</p>',
      '    <p>Le simulateur utilise SQLite (WebAssembly). Certains comportements diffèrent de MySQL, ' +
      'notamment pour les types et les agrégats. Les commandes d’administration MySQL (CREATE USER, ' +
      'GRANT) sont étudiées, mais ne s’exécutent pas dans ce simulateur SQLite.</p>'
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
      '    </p>',
      '    <details><summary>Documentation officielle consultée le 29 octobre 2026 ; compléments revérifiés le 30 octobre 2026</summary>',
      '    <p>SQLite : <a href="https://sqlite.org/lang_createtable.html">tables et contraintes</a>, ' +
      '<a href="https://sqlite.org/foreignkeys.html">clés étrangères</a>, ' +
      '<a href="https://sqlite.org/lang_select.html">SELECT et jointures</a>, ' +
      '<a href="https://sqlite.org/lang_altertable.html">ALTER TABLE</a>, ' +
      '<a href="https://sqlite.org/lang_update.html">UPDATE</a>, ' +
      '<a href="https://sqlite.org/isolation.html">isolation</a>, ' +
      '<a href="https://sqlite.org/datatype3.html">types</a>, ' +
      '<a href="https://sqlite.org/floatingpoint.html">nombres flottants</a>, ' +
      '<a href="https://sqlite.org/quirks.html#double_quoted_string_literals_are_accepted">guillemets</a>, ' +
      '<a href="https://sqlite.org/lang_aggfunc.html">agrégats</a>, ' +
      '<a href="https://sqlite.org/lang_expr.html">expressions</a>, ' +
      '<a href="https://sqlite.org/lang_datefunc.html">dates</a>, ' +
      '<a href="https://sqlite.org/lang_transaction.html">transactions</a>, ' +
      '<a href="https://sqlite.org/lang_createview.html">vues</a>, ' +
      '<a href="https://sqlite.org/lang_createindex.html">index</a>, ' +
      '<a href="https://sqlite.org/eqp.html">plans d’exécution</a>.</p>',
      '    <p>MySQL 8.4 : <a href="https://dev.mysql.com/doc/refman/8.4/en/fixed-point-types.html">décimaux</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/integer-types.html">entiers</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/numeric-type-attributes.html">attributs numériques</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/char.html">chaînes</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/alter-table.html">ALTER TABLE</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html">agrégats</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/account-names.html">noms de comptes</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/create-user.html">création de comptes</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/grant.html">privilèges</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/privileges-provided.html">liste des privilèges</a>, ' +
      '<a href="https://dev.mysql.com/doc/refman/8.4/en/stored-objects-security.html">sécurité des vues</a>.</p>',
      '    </details>'
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
    '  <p>Chaque chapitre propose <strong>trois exercices SQL</strong> sur le schéma du parc, avec des données adaptées et des états de départ précisés. ' +
    'Leur correction automatique nécessite un service d’exécution configuré et peut être indisponible. ' +
    'Les requêtes du cours compatibles SQLite s’essaient aussi dans le <a href="atelier.html">simulateur SQL intégré</a> ' +
    '— base parc_auto déjà chargée, résultats affichés en tableau ; les exemples MySQL sont signalés à part. La <a href="exercices/exercices.html">page ' +
    'exercices</a> propose en plus huit missions graduées avec leurs requêtes de référence.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo SQL</span><br><span class="toc__d">Syntaxes, ordre des clauses, types et privilèges sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices guidés</span><br><span class="toc__d">Huit missions SQL graduées sur le parc auto, requêtes de référence incluses.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier &amp; simulateur</span><br><span class="toc__d">Écrire et exécuter vos requêtes SQL dans le simulateur (base parc_auto chargée).</span></span></a>',
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

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier et simulateur SQL</h1>',
    '  <p class="lead">Deux espaces SQLite dans votre navigateur : la zone libre et le simulateur démarrent ' +
    'sur le même <strong>parc_auto</strong> (12 marques, 23 voitures), sans partager leurs modifications.</p>',

    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li>Dans la zone libre, chaque exécution repart d’une copie du parc. Pour commencer sur une base vide, effacez le script de préparation dans « Entrée du programme ».</li>',
      '      <li>Le moteur SQL fonctionne dans le navigateur ; la disponibilité du tuteur dépend de la configuration du service.</li>',
      '      <li>Dans le simulateur ci-dessous, <strong>Ctrl + Entrée</strong> lance les requêtes localement et votre script est conservé dans ce navigateur.</li>',
      '    </ul>'
    ].join('\n')),

    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="sql"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="' + esc(PARC_SQL).replace(/\r?\n/g, '&#10;') + '">',
      '  <script type="text/plain" data-lab-starter>SELECT COUNT(*) AS nb FROM Voiture;\n</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — requêtes SQL</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' SQL</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> écrire une requête SQL et observer son résultat.</p>',
      '    <div class="lab__brief">',
      '      <p>La requête initiale compte les voitures du parc. Le script de préparation est modifiable dans « Entrée du programme ».</p>',
      '    </div>',
      '    <p class="lab__note">Les deux espaces exécutent SQLite localement ; seul le simulateur conserve les modifications entre deux exécutions.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),

    '  <h2>Simulateur SQL</h2>',
    '  <p class="lead">Une base <strong>parc_auto</strong> complète est déjà chargée dans cette page : ' +
    '12 marques, 23 voitures, le jeu de données du support. Écrivez vos requêtes, exécutez-les d’un clic, ' +
    'lisez le résultat en tableau — un vrai moteur SQL tourne dans votre navigateur, rien n’est envoyé nulle part.</p>',

    box('objectifs', 'Comment fonctionne le simulateur', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> (ou Ctrl + Entrée) lance tout ce qui est écrit dans l’éditeur, requête par requête, et affiche le résultat de la dernière.</li>',
      '      <li><strong>Réinitialiser</strong> reconstruit la base parc_auto à l’état initial — après un UPDATE ou un DELETE trop large, c’est le bouton magique.</li>',
      '      <li><strong>Historique</strong> garde vos requêtes de la session ; <strong>Exporter</strong> copie le résultat en CSV.</li>',
      '      <li>Le moteur est <strong>SQLite</strong> (WebAssembly) : les exemples signalés MySQL, notamment CREATE USER, GRANT et MODIFY COLUMN, ne s’y exécutent pas.</li>',
      '      <li>Votre script est conservé dans ce navigateur ; aucune donnée ne quitte votre machine.</li>',
      '    </ul>'
    ].join('\n')),

    '  <p>Une requête interrompue après quatre secondes entraîne la réinitialisation de la base : les modifications précédentes sont perdues. Les résultats sont limités à 2 000 lignes par instruction et à environ 1 Mo au total ; les allocations gérées par SQLite sont limitées à 32 Mio.</p>',
    '  <div class="sqlsim" id="sqlsim">',
    '    <div class="sqlsim__bar">',
    '      <button class="btn btn--primary" id="sqlsim-run">' + ic('play') + ' Exécuter</button>',
    '      <button class="btn" id="sqlsim-reset">' + ic('hourglass') + ' Réinitialiser la base</button>',
    '      <button class="btn" id="sqlsim-export">' + ic('file') + ' Exporter en CSV</button>',
    '      <span class="sqlsim__state" id="sqlsim-state">Chargement du moteur…</span>',
    '    </div>',
    '    <div class="sqlsim__grid">',
    '      <div class="sqlsim__editor">',
    '        <textarea id="sqlsim-query" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Requête SQL">-- Compte par marque, du plus fourni au plus rare :\nSELECT marque, COUNT(*) AS nb\nFROM Voiture\nGROUP BY marque\nORDER BY nb DESC, marque;\n\n-- Le parc au complet (23 lignes) :\nSELECT * FROM Voiture;</textarea>',
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
      '      <li><strong>Voiture</strong> (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) : 23 lignes, moteurs DIESEL/ESSENCE/HYBRIDE/ELECTRIQUE, prix de 6 à 50 millions, dates de 2000 à 2023.</li>',
      '    </ul>',
      '    <p>Les clés primaires <strong>Marque.codemarque</strong> et <strong>Voiture.immat</strong> ' +
      'sont non nulles. La clé étrangère composée de Voiture vérifie ensemble son code et son nom ' +
      'contre <strong>Marque(codemarque, nommarque)</strong>. Dans Voiture, seule ' +
      '<strong>datecirc</strong> accepte NULL ; les prix du jeu initial sont des entiers en francs. ' +
      'SQLite applique ici des affinités de type : INTEGER et TEXT ne valident pas à eux seuls toutes les valeurs. Les clés étrangères ' +
      'sont activées à l’initialisation de la connexion SQLite. Après une modification, ' +
      '<strong>Réinitialiser la base</strong> revient à l’état initial.</p>'
    ].join('\n')),

    '  <h2>Missions guidées</h2>',
    '  <p>Huit missions progressives sont proposées sous le tableau. Écrivez d’abord votre requête dans le ' +
    'simulateur : les résultats sont comparés aux tableaux de référence sur la base initiale. Une ' +
    'correspondance aide à vérifier votre réponse sans prouver qu’elle fonctionne sur tous les jeux de données.</p>',
    box('method', 'Démarche conseillée', 'compass', [
      '    <ol>',
      '      <li><strong>Lisez la question</strong> et formulez-la en français : quelles colonnes, quelles lignes, quel ordre ?</li>',
      '      <li><strong>Écrivez le squelette</strong> (SELECT…FROM…WHERE…) puis complétez la condition.</li>',
      '      <li><strong>Exécutez</strong> et comparez au résultat de référence affiché sous le simulateur.</li>',
      '      <li><strong>Corrigez</strong> : comparez les valeurs, les filtres et l’ordre demandé.</li>',
      '      <li><strong>Réinitialisez</strong> la base entre deux essais de mission qui modifient les données.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Bases de données' }),
    disclaimer(course, 'Le simulateur s’exécute intégralement dans votre navigateur : aucune requête n’est ' +
      'envoyée au serveur. ')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier et simulateur SQL | ' + course.brand,
      description: 'Atelier SQL B1 : zone libre et simulateur SQLite local avec parc_auto, missions et mode examen.',
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
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Revenez à J+1, J+3, J+7 pour ancrer durablement.</p>',
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

    bloc('Types de colonnes : MySQL et SQLite', [
      '<p>Repères MySQL :</p>',
      '<pre><code>entiers        TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT\n',
      'décimaux exacts  DECIMAL(p, s)   -- prix avec centimes\n',
      'mesures         FLOAT, DOUBLE    -- arrondis possibles\n',
      'chaînes fixes   CHAR(x)          -- complété d’espaces\n',
      'chaînes variables  VARCHAR(x)    -- stocké tel quel\n',
      'temps           DATE \'AAAA-MM-JJ\', TIME \'HH:MM:SS\', DATETIME, TIMESTAMP, YEAR</code></pre>',
      '<p>En MySQL, INT(x) ne change pas la capacité de stockage. Dans SQLite, les noms de types ' +
      'déterminent une affinité : VARCHAR(x) ne limite pas la longueur et DECIMAL ne garantit pas un ' +
      'calcul décimal exact. Le parc utilise TEXT pour les dates et INTEGER pour les prix en francs.</p>'
    ].join('\n')),

    bloc('Ordre des clauses', [
      '<pre><code>SELECT   colonnes, agrégats\n',
      'FROM     tables (jointures)\n',
      'WHERE    filtre les LIGNES\n',
      'GROUP BY découpe en GROUPES\n',
      'HAVING   filtre les GROUPES\n',
      'ORDER BY trie (ASC par défaut, DESC décroissant)\n',
      'LIMIT    n [OFFSET d]   borne le résultat</code></pre>',
      '<p>Ordre d’écriture : ci-dessus. Ordre logique : FROM, WHERE, GROUP BY, HAVING, SELECT, ' +
      'ORDER BY, LIMIT. L’optimiseur peut choisir un autre ordre physique.</p>'
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
      'INNER JOIN Marque M ON V.codemarque = M.codemarque;\n',
      '\n',
      'SELECT M.nommarque, V.immat FROM Marque M\n',
      'LEFT JOIN Voiture V ON V.codemarque = M.codemarque;</code></pre>',
      '<p>Sur une LEFT JOIN, compter COUNT(V.colonne) et non COUNT(*) : les NULL ne se comptent pas. ' +
      'Deux tables qui partagent un nom de colonne : préfixez par l’alias. USING et NATURAL sont ' +
      'd’autres formes ; CROSS JOIN sans condition produit un produit cartésien.</p>'
    ].join('\n')),

    bloc('Agrégation', [
      '<pre><code>COUNT(*)              toutes les lignes\n',
      'COUNT(colonne)        lignes sans NULL\n',
      'COUNT(DISTINCT col)   valeurs distinctes\n',
      'MIN(x) / MAX(x)       extrêmes (nombres, textes, dates)\n',
      'SUM(x) / AVG(x)       somme / moyenne (colonnes numériques)\n',
      '\n',
      'GROUP BY col          privilégier colonnes regroupées et agrégats\n',
      'HAVING COUNT(*) &gt; 2   filtre les groupes (pas d’agrégat direct du même SELECT dans WHERE)</code></pre>',
      '<p>SQLite peut accepter une colonne non regroupée, choisie sans garantie dans le groupe ; ' +
      'HAVING peut aussi filtrer le groupe global d’une requête agrégée sans GROUP BY.</p>'
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
      '<p>Les exemples CREATE USER, GRANT et REVOKE ci-dessus concernent MySQL, pas SQLite. ' +
      'Testez toute modification par le SELECT équivalent avant de l’exécuter.</p>'
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

const EXAMEN_QCM = [
  { stem: 'Dans un jeu hypothétique de 34 voitures dont 9 dates sont NULL, que vaut COUNT(datecirc) ?', opts: ['34', '25', '9'], correct: 1, exp: 'COUNT(colonne) ignore les NULL : 34 − 9 = 25 ; ce jeu diffère des 23 voitures initiales.' },
  { stem: 'Comment teste-t-on NULL dans WHERE ?', opts: ['= NULL', 'IS NULL', 'LIKE NULL'], correct: 1, exp: '= NULL ne renvoie jamais vrai.' },
  { stem: 'Une jointure interne retient…', opts: ['toutes les lignes des deux tables', 'les correspondances des deux côtés', 'les lignes de gauche'], correct: 1, exp: 'Sans correspondance des deux côtés, la ligne disparaît.' },
  { stem: 'Sur une LEFT JOIN, compter les voitures par marque, c’est…', opts: ['COUNT(*)', 'COUNT(V.immat)', 'SUM(*)'], correct: 1, exp: 'COUNT(colonne) ignore les NULL des marques sans voiture.' },
  { stem: 'La clause qui filtre les groupes est…', opts: ['WHERE', 'HAVING', 'ORDER BY'], correct: 1, exp: 'HAVING porte sur le résultat du regroupement, souvent avec un agrégat.' },
  { stem: 'Dans le parc SQLite, quel type stocke le prix en francs entiers ?', opts: ['FLOAT', 'TEXT', 'INTEGER'], correct: 2, exp: 'Le schéma déclare pxachat INTEGER ; les prix du parc sont des entiers en francs.' },
  { stem: 'Dans le parc SQLite, quelle chaîne représente le 21 novembre 2014 ?', opts: ['\'21/11/2014\'', '\'2014-11-21\'', '21-11-2014'], correct: 1, exp: 'Le parc utilise une chaîne au format année, mois, jour.' },
  { stem: 'UPDATE sans WHERE…', opts: ['est refusé', 'modifie toutes les lignes', 'ne fait rien'], correct: 1, exp: 'La condition limite la modification ; sans elle, toute la table est touchée.' },
  { stem: 'En MySQL 8.4, si le joker est actif, \'yeslows\'@\'%\' utilise quel motif d’hôte ?', opts: ['localhost seulement', 'tout hôte', 'aucun mot de passe'], correct: 1, exp: '% désigne un motif d’hôte général ; son usage dans l’hôte est déprécié et ne garantit pas l’authentification.' },
  { stem: 'En MySQL, GRANT OPTION sert à…', opts: ['tout faire sur la base', 'transmettre ses propres privilèges à d’autres', 'créer des tables'], correct: 1, exp: 'Le droit de déléguer, jamais inclus dans ALL.' }
];

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
          sol: '<code>SELECT immat, marque, datecirc FROM Voiture<br> WHERE moteur = \'DIESEL\' AND datecirc &lt; \'2015-01-01\'<br> ORDER BY datecirc;</code><br>Résultat : 4 lignes — TG-7854-Z (2000), TG-6733-AB (2002), TG-6733-AC (2012), TG-0020-AL (2014).'
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
          sol: '<code>SELECT V.immat, V.marque FROM Voiture V<br> INNER JOIN Marque M ON V.codemarque = M.codemarque<br> WHERE M.paysmarque = \'JAPON\' ORDER BY V.immat;</code><br>10 voitures : les marques TOYOTA (5), SUZUKI (2), MITSUBISHI (1), MAZDA (1), NISSAN (1).'
        },
        {
          num: 'Exercice 4',
          badge: '/6 — Analyse complète',
          text: 'Quelles marques ont strictement plus de deux voitures dans le parc ? Donnez leur effectif, du plus grand au plus petit.',
          sol: '<code>SELECT marque, COUNT(*) AS nb FROM Voiture<br> GROUP BY marque HAVING COUNT(*) &gt; 2<br> ORDER BY nb DESC;</code><br>TOYOTA (5) et MERCEDES BENZ (4). Le filtre porte sur un groupe : HAVING, pas WHERE.'
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
          text: 'Dans une base SQLite vierge, créez la table Marque du parc avec ses contraintes, puis insérez TOYOTA (code TOY, Japon).',
          sol: '<pre><code>CREATE TABLE Marque (\n  codemarque TEXT NOT NULL PRIMARY KEY,\n  nommarque TEXT NOT NULL UNIQUE,\n  paysmarque TEXT NOT NULL,\n  UNIQUE (codemarque, nommarque)\n);\nINSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES (\'TOY\', \'TOYOTA\', \'JAPON\');</code></pre>'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Modification',
          text: 'Toutes les voitures de marque TOYOTA passent en moteur ELECTRIQUE. Écrivez l’UPDATE, puis expliquez pourquoi on teste d’abord par SELECT.',
          sol: '<code>UPDATE Voiture SET moteur = \'ELECTRIQUE\' WHERE marque = \'TOYOTA\';</code><br>Le SELECT avec le même WHERE repère les lignes visées (5 dans la base initiale). Contraintes ou changements concurrents peuvent ensuite modifier le résultat. Sans WHERE, toute la table passerait en électrique.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Droits',
          text: 'En MySQL, créez l’utilisateur gestionnaire se connectant uniquement depuis localhost et accordez-lui la consultation de toute la base, mais l’écriture seulement sur Voiture. Cette partie ne s’exécute pas dans SQLite.',
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

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’épreuve (durée 2 h, /20). ' +
    'Vérifiez les requêtes SQLite sur le parc ou, si une base vierge est demandée, effacez le script de préparation dans la zone SQL libre. ' +
    'Les questions de droits MySQL ne s’exécutent pas dans SQLite. Corrigez-vous avec les corrigés.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu’à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : ordre des clauses, chaînes quotées, WHERE vs HAVING.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final — toutes notions</h2>',
    '  ' + qcm(EXAMEN_QCM, { mastery: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % — reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % — refais les requêtes des chapitres faibles dans le simulateur.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible les jointures externes et HAVING.' },
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
  const item = (badge, cls, intro, requete) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\n'),
    '    </ol>',
    '    <details><summary>Requêtes SQL et explications détaillées</summary><div class="sol">' + requete + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques SQL</h1>',
    '  <p class="lead">De la pratique graduée sur le parc du simulateur, puis un dossier de conception ' +
    'indépendant. Réinitialisez le parc après les exemples qui modifient sa structure ou ses données.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Affichez les immatriculations et marques des voitures diesel.',
      'Listez les pays des marques sans doublon.',
      'Affichez les dix voitures les plus récentes avec ORDER BY et LIMIT.',
      'Affichez les voitures dont le prix est compris entre 20 et 30 millions de francs.'
    ], [
      '<p><strong>1. Projection :</strong> <code>SELECT immat, marque FROM Voiture WHERE moteur = \'DIESEL\';</code></p>',
      '<p><strong>2. Dédoublonnage :</strong> <code>SELECT DISTINCT paysmarque FROM Marque;</code></p>',
      '<p><strong>3. Tri &amp; pagination :</strong> <code>SELECT * FROM Voiture ORDER BY datecirc DESC, immat ASC LIMIT 10;</code></p>',
      '<p><strong>4. Intervalle inclus :</strong> <code>SELECT * FROM Voiture WHERE pxachat BETWEEN 20000000 AND 30000000;</code></p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Associez chaque voiture à sa marque par INNER JOIN.',
      'Listez les marques sans voiture avec LEFT JOIN ; exprimez aussi la requête avec RIGHT JOIN.',
      'Calculez le nombre et le prix moyen des voitures par moteur.',
      'Listez les marques dont le budget total dépasse 100 millions de francs.'
    ], [
      '<p><strong>1. Jointure interne :</strong> <code>SELECT V.immat, M.nommarque FROM Voiture V INNER JOIN Marque M ON V.codemarque = M.codemarque;</code></p>',
      '<p><strong>2. Jointure externe :</strong> <code>SELECT M.nommarque FROM Marque M LEFT JOIN Voiture V ON V.codemarque = M.codemarque WHERE V.immat IS NULL;</code> ' +
      'Forme symétrique : <code>SELECT M.nommarque FROM Voiture V RIGHT JOIN Marque M ON V.codemarque = M.codemarque WHERE V.immat IS NULL;</code> ' +
      'Dans le parc initial, ces requêtes renvoient zéro ligne ; ajoutez une marque sans voiture pour observer la différence.</p>',
      '<p><strong>3. Agrégation :</strong> <code>SELECT moteur, COUNT(*), AVG(pxachat) FROM Voiture GROUP BY moteur;</code></p>',
      '<p><strong>4. Filtrage d’agrégat :</strong> <code>SELECT marque, SUM(pxachat) FROM Voiture GROUP BY marque HAVING SUM(pxachat) &gt; 100000000;</code></p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Écrivez des sous-requêtes corrélées ou imbriquées avec IN, EXISTS et NOT EXISTS.',
      'Essayez BEGIN, COMMIT et ROLLBACK sur une modification du kilométrage.',
      'Créez une vue des achats mensuels et interrogez-la.',
      'Créez un index et consultez un plan avec EXPLAIN QUERY PLAN.'
    ], [
      '<p><strong>1. Sous-requêtes :</strong> <code>SELECT M.nommarque FROM Marque M WHERE EXISTS (SELECT 1 FROM Voiture V WHERE V.codemarque = M.codemarque AND V.pxachat &gt; 30000000);</code> ' +
      '<code>SELECT nommarque FROM Marque WHERE codemarque IN (SELECT codemarque FROM Voiture);</code> ' +
      '<code>SELECT M.nommarque FROM Marque M WHERE NOT EXISTS (SELECT 1 FROM Voiture V WHERE V.codemarque = M.codemarque);</code></p>',
      '<p><strong>2. Transaction :</strong> <code>BEGIN; UPDATE Voiture SET km = km + 100 WHERE immat = \'TG-7854-Z\'; SELECT km FROM Voiture WHERE immat = \'TG-7854-Z\'; ROLLBACK;</code> ' +
      'ROLLBACK annule la modification. Pour la conserver, terminez une nouvelle transaction par COMMIT : ' +
      '<code>BEGIN; UPDATE Voiture SET km = km + 100 WHERE immat = \'TG-7854-Z\'; COMMIT;</code> ' +
      'Réinitialisez ensuite le parc.</p>',
      '<p><strong>3. Vue :</strong> <code>CREATE VIEW v_achats_mensuels AS SELECT substr(datecirc, 1, 7) AS mois, SUM(pxachat) AS total FROM Voiture WHERE datecirc IS NOT NULL GROUP BY substr(datecirc, 1, 7);</code> ' +
      '<code>SELECT mois, total FROM v_achats_mensuels ORDER BY mois;</code> Une vue nomme une requête. ' +
      'Dans un SGBD avec privilèges, elle peut aussi limiter les données exposées ; SQLite ne gère pas de privilèges par vue.</p>',
      '<p><strong>4. Index :</strong> <code>CREATE INDEX idx_voiture_code ON Voiture(codemarque);</code> ' +
      '<code>EXPLAIN QUERY PLAN SELECT immat FROM Voiture WHERE codemarque = \'TOY\';</code> ' +
      'Le plan indique le choix de l’optimiseur ; créer un index ne garantit pas qu’il sera utilisé.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Conception &amp; Requêtage Relationnel</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’ingénierie des bases de données consiste à concevoir le schéma relationnel, les contraintes d’intégrité référentielle et les requêtes analytiques de reporting d’une plateforme de commerce électronique.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences SQL évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Modélisation DDL :</strong> Création des tables, clés primaires, clés étrangères avec clauses ON DELETE CASCADE.</li>',
      '      <li><strong>Requêtage complexe :</strong> Maîtrise des jointures multiples, sous-requêtes et fonctions d’agrégation.</li>',
      '      <li><strong>Intégrité transactionnelle :</strong> Préservation des propriétés ACID lors d’opérations concurrentes.</li>',
      '      <li><strong>Optimisation des performances :</strong> Analyse des coûts d’exécution et stratégie d’indexation.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de bases de données relationnelles et SQL B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de bases de données relationnelles SQL B1 : requêtes, jointures, agrégats et transactions.',
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

module.exports = { render, PARC_SQL, EXAMEN_QCM };
