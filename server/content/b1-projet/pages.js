/**
 * Pages transverses du cours « Projet tutoré : application de gestion de stock » B1.
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
    '    <span class="tag tag--time">Projet tutoré</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>cadrer le projet : objectifs, prérequis, structure des fichiers ;</li>',
      '      <li>construire la base : table produits, classe Database, requêtes paramétrées ;</li>',
      '      <li>bâtir l\'interface : deux écrans Tkinter, Treeview, boîtes de dialogue ;</li>',
      '      <li>faire vivre le stock : ajout, modification, suppression confirmée, mouvements ;</li>',
      '      <li>le faire parler : alertes de seuil, valeur totale, recherche, maximum ;</li>',
      '      <li>livrer : dépannage, export CSV, tableau de bord de soutenance.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Le tutoriel « Application de Gestion de Stock » (LAWSON Latevi Sena, Collège de Paris - ' +
      'Campus de Lomé) déroule la construction complète : environnement, base PostgreSQL, interface ' +
      'Tkinter, opérations CRUD, puis améliorations et dépannage. Ce cours en garde l\'esprit et fait ' +
      'appliquer chaque règle <strong>en Bash</strong> : prérequis de version, types de la table, ' +
      'requêtes du cycle CRUD, validation des champs, cascade de seuils, calcul de maximum.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : tu écris vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que tu ne vois pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les étapes du tutoriel (database.py, main.py, exports).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo Projet</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Projet tutoré : gestion de stock B1 | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du cadrage jusqu\'au tableau de bord de ' +
    'soutenance. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
    'supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas méthodologiques</strong> à écrire et à exécuter ' +
    'dans la page : ton script est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Projet</span><br><span class="toc__d">Prérequis, table produits, requêtes CRUD, widgets Tkinter, seuils, export CSV.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : la soutenance de bout en bout.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Écrire et exécuter du Bash directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours « Projet tutoré : application de gestion de stock » B1 : ' + chapterList.length +
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
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une règle du projet devient un contrôle automatisé.</p>',
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
      '    <h3 class="lab__title">Zone libre — contrôleur de saisie du formulaire</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Bash</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends une règle du ' +
      'projet (validation des champs, cascade de seuils, boucle de maximum, export CSV), programme-la et ' +
      'teste-la sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé rejette un champ vide ou non numérique, comme la validation du tutoriel ' +
      'avant INSERT. Transforme-le : fais-le dire la raison précise du refus (vide, non nombre, négatif), ' +
      'ajoute le prix à valider, ou remplace tout le script par la règle que tu veux vérifier.</p>',
      '      <p>Dans l\'application réelle, ce contrôle vit dans ajouter_produit() : la structure du script — ' +
      'lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Cas d’exemple</b><pre>3',
      'clavier 10',
      'ecran -',
      'souris -3</pre></div>',
      '      <div class="lab__sample-part"><b>Résolution attendue</b><pre>clavier : ajoute',
      'ecran : refuse',
      'souris : refuse',
      'ajouts : 1/3</pre></div>',
      '    </div>',
      '    <p class="lab__note">Trois lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>Du script à la vraie application</h2>',
    '  <p>La simulation a une limite assumée : aucun Tkinter ne s\'ouvre ici et aucun psycopg2 ne parle à ' +
    'PostgreSQL — l\'application reste du texte structuré. Elle a une force : <strong>toute la logique se ' +
    'vérifie sans risque</strong> — on peut rejouer une validation, une cascade de seuils ou un maximum ' +
    'autant de fois que nécessaire. Quand le script reproduit les bons réflexes — lire, décider, ' +
    'rapporter — le passage à Python est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Case incomplet</strong> : une valeur imprévue tombe dans le défaut silencieux et produit une sortie vide.</li>',
      '      <li><strong>Compteur dans la boucle</strong> : le bilan s\'affiche à chaque ligne au lieu d\'une seule fois, après.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : le script lit la seconde valeur avant la première, et tout décale.</li>',
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
    'que la règle est vraiment acquise.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Cadrage du projet' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — projet tutoré | ' + course.brand,
      description: 'Atelier de scripts du cours B1 : éditeur dans le navigateur, exécution réelle ' +
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo Projet' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours B1 : notions clés des ' +
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
    '  <h1>Mémo Projet tutoré</h1>',
    '  <p class="lead">Les règles du projet sur une page, dans l\'ordre de la construction. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Cadrage et environnement', [
      '<pre><code>objectifs : interface Tkinter / connexion PostgreSQL /\n',
      '  operations CRUD / exceptions / modules reutilisables\n',
      '\n',
      'prerequis : Python >= 3.7 / tkinter / postgresql\n',
      '  notions POO + bases de donnees relationnelles\n',
      '\n',
      'installation : python3-pip, postgresql-contrib,\n',
      '  python3-tk, pip install psycopg2-binary\n',
      'base : CREATE DATABASE gestion_stock ;\n',
      '\n',
      'structure :\n',
      '  main.py           interface principale\n',
      '  database.py       classe Database (SQL)\n',
      '  requirements.txt  psycopg2-binary==2.9.9\n',
      '  README.md         documentation</code></pre>',
      '<p>Deux classes, deux mondes : Database parle SQL, l\'application parle à l\'écran.</p>'
    ].join('\n')),

    bloc('La table produits et la connexion', [
      '<pre><code>CREATE TABLE IF NOT EXISTS produits (\n',
      '  id        SERIAL PRIMARY KEY,\n',
      '  nom       VARCHAR(100) NOT NULL,\n',
      '  categorie VARCHAR(50),\n',
      '  quantite  INTEGER NOT NULL,\n',
      '  prix      DECIMAL(10,2) NOT NULL\n',
      ')\n',
      '\n',
      'connecter : psycopg2.connect(host, database, user,\n',
      '  password) -> cursor ; try/except -> True/False\n',
      'ecriture : execute puis connection.commit()\n',
      'lecture   : execute puis cursor.fetchall()\n',
      'fermer    : cursor.close() puis connection.close()</code></pre>',
      '<p>Sans commit, l\'écriture est perdue à la déconnexion.</p>'
    ].join('\n')),

    bloc('Les requêtes CRUD', [
      '<pre><code>Create : INSERT INTO produits (nom, categorie,\n',
      '  quantite, prix) VALUES (%s, %s, %s, %s)\n',
      'Read   : SELECT * FROM produits ORDER BY id\n',
      'Update : UPDATE produits SET nom=%s, categorie=%s,\n',
      '  quantite=%s, prix=%s WHERE id=%s\n',
      'Delete : DELETE FROM produits WHERE id=%s\n',
      '\n',
      'mouvement : UPDATE SET quantite = quantite + X\n',
      '  (ou - X apres controle) WHERE id=%s\n',
      '\n',
      '%s = requetes parametrees : psycopg2 echappe,\n',
      '  protection contre l\'injection SQL</code></pre>',
      '<p>DELETE et UPDATE toujours avec WHERE id : sinon toute la table.</p>'
    ].join('\n')),

    bloc('Interface Tkinter et validation', [
      '<pre><code>ecran 1 : connexion (host, database, user, password)\n',
      '  succes -> creer_table, destroy, ecran principal\n',
      'ecran 2 : formulaire, boutons, Treeview\n',
      '\n',
      'widgets : Label, Entry, Button (command=),\n',
      '  Frame/LabelFrame, ttk.Treeview, Scrollbar\n',
      'layout : pack (empile) / grid (lignes-colonnes)\n',
      'bind("<ButtonRelease-1>") : clic -> formulaire\n',
      '\n',
      'boites : showinfo (succes) / showwarning (attention)\n',
      '  / showerror (echec) / askyesno (confirmation)\n',
      '\n',
      'validation avant INSERT : champs non vides,\n',
      '  int(quantite), float(prix) dans un try\n',
      'fermeture : db.deconnecter() puis root.destroy()</code></pre>',
      '<p>La base ne reçoit jamais de donnée absurde : valider d\'abord.</p>'
    ].join('\n')),

    bloc('Logique métier et livraison', [
      '<pre><code>etats de stock : stock = 0 -> rupture /\n',
      '  stock < seuil -> alerte / stock >= seuil -> ok\n',
      'valeur ligne = quantite x prix\n',
      'total : accumulateur a 0, affiche apres la boucle\n',
      'maximum : meilleur + valeur, test STRICT,\n',
      '  premier rencontre gagne a egalite\n',
      '\n',
      'export CSV : en-tete AVANT la boucle, une ligne par\n',
      '  produit nom;categorie;quantite;prix, bilan apres\n',
      '\n',
      'depannage : connexion -> service / psycopg2 -> pip /\n',
      '  tkinter -> apt / Non-ASCII -> coding utf-8\n',
      '\n',
      'tableau de bord : total FCFA / alertes /\n',
      '  vitrine (plus grande valeur de ligne)</code></pre>',
      '<p>Trois accumulateurs hors boucle, bilans après : le récit de la soutenance.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Lancer l\'application sans créer la base gestion_stock.</li>',
      '    <li>Oublier commit après INSERT, UPDATE ou DELETE.</li>',
      '    <li>Concaténer les valeurs dans le SQL : requêtes paramétrées obligatoires.</li>',
      '    <li>Mettre FLOAT pour le prix : DECIMAL(10,2) est exact.</li>',
      '    <li>Supprimer sans askyesno ni sélection préalable.</li>',
      '    <li>Laisser passer une sortie de stock supérieure au disponible.</li>',
      '    <li>Compter en alerte un stock égal au seuil : le test est strict.</li>',
      '    <li>Afficher le total dans la boucle : sous-totaux, pas total.</li>',
      '    <li>Initialiser le maximum à un produit existant : biais du premier.</li>',
      '    <li>Générer l\'en-tête CSV dans la boucle : il se répéterait.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo Projet — ' + course.brand,
      description: 'Mémo du cours B1 : cadrage, table produits, requêtes CRUD, interface Tkinter, ' +
        'validation, logique métier et export CSV sur une page.',
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
      intro: 'Sujet type épreuve — cadrage, base de données, interface.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Cadrage',
          text: 'Présenter le projet en deux phrases. Citer les cinq objectifs pédagogiques. Donner le rôle des quatre fichiers et la commande d\'installation des dépendances.',
          sol: 'Application complète de gestion de stock en <strong>Python</strong> avec interface <strong>Tkinter</strong> et base <strong>PostgreSQL</strong>. Objectifs : interface, connexion, CRUD, exceptions, modules. Fichiers : <strong>main.py</strong> (écran), <strong>database.py</strong> (SQL), <strong>requirements.txt</strong> (psycopg2-binary), <strong>README.md</strong> (doc). Installation : <code>pip install -r requirements.txt</code>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Table produits',
          text: 'Écrire le CREATE TABLE complet. Pourquoi DECIMAL et non FLOAT pour le prix ? Que garantit IF NOT EXISTS ?',
          sol: '<code>id SERIAL PRIMARY KEY, nom VARCHAR(100) NOT NULL, categorie VARCHAR(50), quantite INTEGER NOT NULL, prix DECIMAL(10,2) NOT NULL</code>. <strong>DECIMAL(10,2)</strong> stocke deux décimales exactes, FLOAT arrondit en binaire. <strong>IF NOT EXISTS</strong> : le second lancement ne duplique pas la table.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — CRUD',
          text: 'Écrire les quatre requêtes CRUD. Que font les %s ? Que se passe-t-il sans commit après un INSERT ?',
          sol: '<strong>INSERT INTO produits (nom, categorie, quantite, prix) VALUES (%s, %s, %s, %s)</strong> ; <strong>SELECT * FROM produits ORDER BY id</strong> ; <strong>UPDATE … SET … WHERE id=%s</strong> ; <strong>DELETE FROM produits WHERE id=%s</strong>. Les %s paramètrent et échappent : protection contre l\'injection. Sans <strong>commit</strong>, l\'écriture est annulée à la déconnexion.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Interface',
          text: 'Décrire l\'enchaînement des deux écrans. Associer chaque situation à sa messagebox. Que valide ajouter_produit() avant l\'insertion ?',
          sol: 'Connexion → succès → <strong>creer_table, destroy, écran principal</strong> ; échec → showerror. <strong>showinfo</strong> : succès ; <strong>showwarning</strong> : champs manquants ; <strong>showerror</strong> : échec ; <strong>askyesno</strong> : suppression. Validation : champs non vides, <strong>int(quantite)</strong> et <strong>float(prix)</strong> dans un try — ValueError → showerror.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté cycle de vie, logique métier et livraison.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Cycle de vie',
          text: 'Dérouler le chemin complet de la suppression. Écrire la requête de modification. Que devient une sortie de stock supérieure au disponible ?',
          sol: '<strong>Sélection Treeview</strong> → <strong>askyesno</strong> → oui → <strong>DELETE FROM produits WHERE id=%s</strong> → showinfo → effacer_champs + actualiser_tableau ; non → rien. Modification : <strong>UPDATE produits SET … WHERE id=%s</strong> après sélection. Sortie excessive : <strong>refusée</strong> — le stock ne devient jamais négatif.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Alertes',
          text: 'Un seuil vaut 5 : classer les stocks 0, 3, 5 et 12. Pourquoi le test est-il strict ?',
          sol : '<strong>0 → rupture</strong> ; <strong>3 → alerte</strong> (3 &lt; 5) ; <strong>5 → ok</strong> (égal au seuil) ; <strong>12 → ok</strong>. Le test est <strong>strictement inférieur</strong> : atteindre le seuil suffit, l\'alerte prévient avant de le passer.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Valeur et maximum',
          text: 'Calculer : 10 claviers à 5 000 FCFA et 2 écrans à 45 000 FCFA — valeurs de ligne et total. Comment coder la boucle du maximum sans biais ?',
          sol: 'Claviers : 10 × 5 000 = <strong>50 000</strong> ; écrans : 2 × 45 000 = <strong>90 000</strong> ; total <strong>140 000 FCFA</strong>. Maximum : deux variables (meilleur, valeur) initialisées à « rien »/0, mise à jour si <strong>strictement supérieur</strong> — le premier rencontré gagne à égalité ; affichage après la boucle.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Livraison',
          text: 'Associer les quatre pannes à leurs remèdes. Décrire le format de l\'export CSV. Que contient le tableau de bord de soutenance ?',
          sol : '<strong>Connexion</strong> → service PostgreSQL ; <strong>psycopg2</strong> → pip install psycopg2-binary ; <strong>tkinter</strong> → apt install python3-tk ; <strong>Non-ASCII</strong> → coding utf-8. CSV : <strong>en-tête nom;categorie;quantite;prix</strong> avant la boucle, une ligne par produit, bilan « lignes exportees ». Tableau de bord : <strong>total FCFA, alertes, vitrine</strong> (plus grande valeur de ligne).'
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
    { stem: 'Le fichier qui contient l\'interface :', opts: ['main.py', 'database.py', 'requirements.txt'], correct: 0, exp: 'main.py : fenêtre, formulaire, tableau.' },
    { stem: 'La version minimale de Python :', opts: ['3.7', '3.0', '2.7'], correct: 0, exp: 'Python 3.7 ou supérieur.' },
    { stem: 'Le type du champ prix :', opts: ['DECIMAL(10,2)', 'FLOAT', 'VARCHAR'], correct: 0, exp: 'Deux décimales exactes, pas d\'arrondi binaire.' },
    { stem: 'id est une clé…', opts: ['SERIAL PRIMARY KEY', 'VARCHAR', 'simple INTEGER'], correct: 0, exp: 'Auto-incrémentée et primaire.' },
    { stem: 'La méthode qui lit toutes les lignes :', opts: ['fetchall()', 'commit()', 'close()'], correct: 0, exp: 'Après un SELECT.' },
    { stem: 'Sans commit après INSERT…', opts: ['l\'écriture est perdue à la déconnexion', 'rien ne change', 'la table se vide'], correct: 0, exp: 'PostgreSQL annule la transaction.' },
    { stem: 'La confirmation avant suppression :', opts: ['askyesno', 'showinfo', 'showerror'], correct: 0, exp: 'Dialogue oui/non obligatoire.' },
    { stem: 'Un stock égal au seuil est…', opts: ['ok', 'en alerte', 'en rupture'], correct: 0, exp: 'L\'alerte exige un stock strictement inférieur.' },
    { stem: 'L\'en-tête CSV se génère…', opts: ['avant la boucle', 'dans la boucle', 'après le bilan'], correct: 0, exp: 'Une seule fois, même pour 0 produit.' },
    { stem: 'La vitrine du tableau de bord se choisit sur…', opts: ['la valeur de ligne', 'le prix unitaire', 'le nom du produit'], correct: 0, exp: 'quantite × prix, pas le prix seul.' }
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
      '<strong>Réserve 15 min de relecture</strong> : structure des fichiers, table produits, requêtes ' +
      'CRUD, messagebox, cascade de seuils, format CSV.</p>',
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
      { cls: 'good', text: '70–89 % — bon niveau, cible la logique métier et l\'export.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après le support « Tutoriel Projet Tutoré — Application de Gestion de Stock » (LAWSON Latevi Sena, Collège de Paris - Campus de Lomé, janvier 2026). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours B1 : sujets chronométrés sur le cadrage, la base ' +
        'PostgreSQL, l\'interface Tkinter, le cycle de vie du stock et la livraison.',
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
    '    <details><summary>Corrections &amp; méthodes de gestion de projet</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de cadrage, planification et gouvernance de projet informatique.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Identifier les trois contraintes fondamentales du triangle d’or de projet (Coût, Délais, Périmètre / Qualité).',
      'Construire la structure de découpage du projet (WBS - Work Breakdown Structure) en lots de travail.',
      'Distinguer les rôles de la matrice RACI (Responsible, Accountable, Consulted, Informed).',
      'Identifier les jalons clés d’un cycle de vie de projet (cadrage, lancement, recette, mise en production).'
    ], [
      '<p><strong>1. Triangle d’or :</strong> Toute modification d’un axe (ex: réduction du délai) impacte obligatoirement l’un des deux autres (augmentation du coût ou réduction du périmètre).</p>',
      '<p><strong>2. WBS :</strong> Décomposition hiérarchique arborescente descendante du projet jusqu’aux tâches élémentaires assignables et estimables.</p>',
      '<p><strong>3. Matrice RACI :</strong> R (celui qui fait), A (l’unique décideur qui valide), C (l’expert consulté avant action), I (la partie prenante informée après action).</p>',
      '<p><strong>4. Jalons :</strong> Événements de durée nulle marquant la fin d’une étape majeure et validant le passage à l’étape suivante (Go / No-Go).</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Construire le diagramme de Gantt avec dépendances entre tâches (Fin à Début, Début à Début).',
      'Calculer le chemin critique et la marge totale d’un réseau de tâches d’ordonnancement.',
      'Comparer les approches prédictives en cascade (Cycle en V) et adaptatives (Agile Scrum / Kanban).',
      'Élaborer le registre des risques avec évaluation de la probabilité, de l’impact et de la stratégie de mitigation.'
    ], [
      '<p><strong>1. Diagramme de Gantt :</strong> Visualisation chronologique des durées, des enchaînements et de l’avancement des livrables.</p>',
      '<p><strong>2. Chemin critique :</strong> La séquence de tâches à marge nulle : tout retard sur une tâche de ce chemin reporte d’autant la livraison finale du projet.</p>',
      '<p><strong>3. Cascade vs Agile :</strong> Cycle en V (spécifications exhaustives initiales, recette tardive) vs Agile (itérations courtes de 2 à 4 semaines, valeur livrée en continu et adaptation au changement).</p>',
      '<p><strong>4. Matrice des risques :</strong> Criticité = Probabilité $\times$ Impact ; plan d’action : Évitement, Réduction, Transfert (assurance) ou Acceptation résiduelle.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Arbitrer un dépassement budgétaire lors d’un comité de pilotage (COPIL) : options d’ajustement et communication.',
      'Piloter une équipe de développement avec les rituels Scrum (Sprint Planning, Daily Standup, Review, Rétrospective).',
      'Mesurer la performance d’avancement par la méthode de la valeur acquise (EVM : Valeur Planifiée, Coût Réel, Valeur Acquise).',
      'Gérer la phase de recette utilisateur (UAT) : cahier de recette, qualification des anomalies bloquantes et signature du PV.'
    ], [
      '<p><strong>1. Arbitrage COPIL :</strong> Présentation transparente des causes, proposition de scénarios chiffrés (réduction de périmètre non critique vs rallonge budgétaire) et vote décisionnel.</p>',
      '<p><strong>2. Rituels Scrum :</strong> Le Daily (15 min debout pour identifier les blocages) ; la Rétrospective (amélioration continue des processus d’équipe).</p>',
      '<p><strong>3. EVM :</strong> Écart de coût $CV = EV - AC$ ; Écart de délai $SV = EV - PV$ ; Indices de performance $CPI = EV / AC$ et $SPI = EV / PV$.</p>',
      '<p><strong>4. Recette :</strong> Recette fonctionnelle basée sur les critères d’acceptation initiaux ; aucune mise en production avec une anomalie de sévérité bloquante non résolue.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Cadrage &amp; Pilotage de Projet Numérique</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier professionnel consiste à élaborer le plan de management complet d’un projet de transformation numérique : charte de projet, WBS détaillé, planning Gantt, matrice RACI, registre des risques et plan d’assurance qualité.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences de gestion de projet évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Cadrage stratégique :</strong> Formulation claire des objectifs SMART et des critères de succès mesurables.</li>',
      '      <li><strong>Maîtrise de la planification :</strong> Identification précise du chemin critique et des ressources critiques.</li>',
      '      <li><strong>Gouvernance des risques :</strong> Anticipation des aléas techniques, organisationnels et humains.</li>',
      '      <li><strong>Animation &amp; communication :</strong> Clarté des livrables et gestion des parties prenantes.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de gestion de projet B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de gestion de projet B1 : WBS, diagramme de Gantt, matrice RACI et méthodes agiles.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours B1 : ' + chapitre.toc +
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
