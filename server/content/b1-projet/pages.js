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
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Bash</strong> à écrire et à exécuter ' +
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
    'exécute-le et lis ce qu\'il affiche : c\'est ici qu\'une règle du projet devient un contrôle automatisé.</p>',
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
      '# Exemple proposé : contrôleur de saisie du formulaire.',
      '# Le script lit n lignes « produit quantite » et dit si',
      '# l\'insertion est acceptée (quantité entière positive).',
      '',
      'read -r n',
      'ok=0',
      'for ((i=0; i<n; i++)); do',
      '  read -r produit quantite',
      '  valide=1',
      '  case "$quantite" in',
      '    -|*[!0-9]*) valide=0 ;;',
      '    *) [ "$quantite" -le 0 ] && valide=0 ;;',
      '  esac',
      '  if [ "$valide" = "1" ]; then',
      '    echo "$produit : ajoute"',
      '    ok=$((ok + 1))',
      '  else',
      '    echo "$produit : refuse"',
      '  fi',
      'done',
      'echo "ajouts : $ok/$n"',
      '</script>',
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
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3',
      'clavier 10',
      'ecran -',
      'souris -3</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>clavier : ajoute',
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
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Bash corrigés ' +
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
    '    <details><summary>Corrections</summary><div class="sol"><pre><code>' + solutions + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque chapitre, puis un projet final qui ' +
    'rejoue la soutenance de bout en bout. Les scripts sont en Bash, comme à l\'atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n lignes « fichier role » (interface/database/deps/doc) et valide chaque rôle, puis le compteur d\'erreurs.',
      'Lit n lignes « colonne type » et valide le schéma de la table produits, puis le compteur.',
      'Lit n lignes « situation boite » (showinfo/showwarning/showerror/askyesno) et valide chaque dialogue.',
      'Lit n lignes « produit quantite » et dit si l\'ajout passe (entier positif), puis le compteur d\'ajouts.'
    ], [
      'read -r n',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r fichier role',
      '  case "$fichier" in',
      '    main) attendu="interface" ;;',
      '    database) attendu="database" ;;',
      '    requirements) attendu="deps" ;;',
      '    readme) attendu="doc" ;;',
      '  esac',
      '  if [ "$role" = "$attendu" ]; then',
      '    echo "$fichier : OK"',
      '  else',
      '    echo "$fichier : KO ($attendu attendu)"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "erreurs : $e/$n"',
      '',
      'read -r n',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r colonne type',
      '  case "$colonne" in',
      '    id) attendu="serial" ;;',
      '    nom|categorie) attendu="varchar" ;;',
      '    quantite) attendu="integer" ;;',
      '    prix) attendu="decimal" ;;',
      '  esac',
      '  if [ "$type" = "$attendu" ]; then',
      '    echo "$colonne : OK"',
      '  else',
      '    echo "$colonne : KO ($attendu attendu)"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "erreurs : $e/$n"',
      '',
      'read -r n',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r situation boite',
      '  case "$situation" in',
      '    succes) attendu="showinfo" ;;',
      '    champs) attendu="showwarning" ;;',
      '    echec) attendu="showerror" ;;',
      '    suppression) attendu="askyesno" ;;',
      '  esac',
      '  if [ "$boite" = "$attendu" ]; then',
      '    echo "$situation : OK"',
      '  else',
      '    echo "$situation : KO ($attendu attendu)"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "erreurs : $e/$n"',
      '',
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r produit quantite',
      '  valide=1',
      '  case "$quantite" in',
      '    -|*[!0-9]*) valide=0 ;;',
      '    *) [ "$quantite" -le 0 ] &amp;&amp; valide=0 ;;',
      '  esac',
      '  if [ "$valide" = "1" ]; then',
      '    echo "$produit : ajoute"',
      '    ok=$((ok + 1))',
      '  else',
      '    echo "$produit : refuse"',
      '  fi',
      'done',
      'echo "ajouts : $ok/$n"'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Lit n lignes « service etat » (serveur/mdp/base) et réagit comme connecter() : premier défaut ou succès.',
      'Lit n lignes « operation sql » dans l\'ordre du cycle CRUD et valide opération et requête à chaque étape.',
      'Lit n lignes « produit quantite prix » et affiche la valeur de chaque ligne puis la valeur totale.',
      'Lit n lignes « produit categorie quantite prix » et écrit le catalogue CSV avec en-tête et bilan.'
    ], [
      'for ((i=1; i&lt;=3; i++)); do',
      '  read -r service etat',
      '  if [ "$etat" = "ko" ]; then',
      '    echo "erreur : $service"',
      '    exit 0',
      '  fi',
      'done',
      'echo "connexion reussie"',
      '',
      'ok=0',
      'for ((i=1; i&lt;=4; i++)); do',
      '  read -r operation sql',
      '  case "$i" in',
      '    1) attendu_op="create" ; attendu_sql="insert" ;;',
      '    2) attendu_op="read" ; attendu_sql="select" ;;',
      '    3) attendu_op="update" ; attendu_sql="update" ;;',
      '    4) attendu_op="delete" ; attendu_sql="delete" ;;',
      '  esac',
      '  if [ "$operation" = "$attendu_op" ] &amp;&amp; [ "$sql" = "$attendu_sql" ]; then',
      '    echo "etape $i : OK"',
      '    ok=$((ok + 1))',
      '  else',
      '    echo "etape $i : NON"',
      '  fi',
      'done',
      'echo "etapes correctes : $ok/4"',
      '',
      'read -r n',
      'total=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r produit quantite prix',
      '  ligne=$((quantite * prix))',
      '  total=$((total + ligne))',
      '  echo "$produit : $ligne FCFA"',
      'done',
      'echo "valeur totale : $total FCFA"',
      '',
      'read -r n',
      'echo "nom;categorie;quantite;prix"',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r produit categorie quantite prix',
      '  echo "$produit;$categorie;$quantite;$prix"',
      'done',
      'echo "lignes exportees : $n"'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Lit n lignes « produit seuil stock » et classe chaque produit : rupture, alerte ou ok, puis les deux bilans.',
      'Lit n lignes « produit mouvement » et simule les mouvements : sorties refusées si le stock est insuffisant.',
      'Lit n lignes « produit motif » (confirme/annule/absent) et traite les suppressions avec les deux compteurs.',
      'Lit n lignes « produit quantite prix seuil » et produit le tableau de bord complet (total, alertes, vitrine).'
    ], [
      'read -r n',
      'r=0',
      'a=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r produit seuil stock',
      '  if [ "$stock" -eq 0 ]; then',
      '    echo "$produit : rupture"',
      '    r=$((r + 1))',
      '  elif [ "$stock" -lt "$seuil" ]; then',
      '    echo "$produit : alerte"',
      '    a=$((a + 1))',
      '  else',
      '    echo "$produit : ok"',
      '  fi',
      'done',
      'echo "ruptures : $r"',
      'echo "alertes : $a"',
      '',
      'read -r n',
      'declare -A stock',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r produit mouvement',
      '  actuel=\\${stock[$produit]:-0}',
      '  case "$mouvement" in',
      '    -*)',
      '      quantite=\\${mouvement#-}',
      '      if [ "$actuel" -lt "$quantite" ]; then',
      '        echo "$produit : stock insuffisant"',
      '      else',
      '        stock[$produit]=$((actuel - quantite))',
      '        echo "$produit : stock=\\${stock[$produit]}"',
      '      fi',
      '      ;;',
      '    *)',
      '      stock[$produit]=$((actuel + mouvement))',
      '      echo "$produit : stock=\\${stock[$produit]}"',
      '      ;;',
      '  esac',
      'done',
      'echo "mouvements : $n"',
      '',
      'read -r n',
      'suppr=0',
      'abs=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r produit motif',
      '  case "$motif" in',
      '    confirme) echo "$produit : supprime" ; suppr=$((suppr + 1)) ;;',
      '    annule) echo "$produit : conserve" ;;',
      '    absent) echo "$produit : introuvable" ; abs=$((abs + 1)) ;;',
      '  esac',
      'done',
      'echo "suppressions : $suppr"',
      'echo "introuvables : $abs"',
      '',
      'read -r n',
      'total=0',
      'alertes=0',
      'vitrine="-"',
      'vitrine_val=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r produit quantite prix seuil',
      '  valeur=$((quantite * prix))',
      '  total=$((total + valeur))',
      '  if [ "$quantite" -lt "$seuil" ]; then',
      '    alertes=$((alertes + 1))',
      '  fi',
      '  if [ "$valeur" -gt "$vitrine_val" ]; then',
      '    vitrine_val=$valeur',
      '    vitrine=$produit',
      '  fi',
      '  echo "$produit : stock=$quantite valeur=$valeur"',
      'done',
      'echo "total : $total FCFA"',
      'echo "alertes : $alertes"',
      'echo "vitrine : $vitrine ($vitrine_val FCFA)"'
    ].join('\n')),

    '  <h2>Projet intégrateur — « la soutenance de bout en bout »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit le journal final du projet. D\'abord <code>n</code> lignes <code>vm config</code> ' +
      'renommées <code>produit config</code> où config est une suite de lettres sans espace — <code>v</code> = ' +
      'validation implémentée, <code>c</code> = requêtes paramétrées (CRUD complet), <code>g</code> = boîtes ' +
      'de dialogue correctes, <code>s</code> = seuils d\'alerte gérés, le tiret <code>-</code> = fonction non ' +
      'traitée. Puis <code>m</code> lignes <code>produit quantite prix</code> du stock à inventorier. Il ' +
      'affiche pour chaque produit <code>produit : conforme</code> si les quatre lettres sont présentes, ' +
      'sinon <code>produit : a completer (manque X)</code> avec la première lettre manquante dans l\'ordre ' +
      'v, c, g, s ; pour chaque ligne du stock <code>produit : quantite=X valeur=Y</code> ; enfin le verdict : ' +
      '<code>application prete</code> si toutes les fonctions sont conformes ET que la valeur totale du stock ' +
      'dépasse 100 000 FCFA, <code>application a enrichir</code> si les fonctions sont conformes sans ce ' +
      'volume, <code>application incomplete</code> sinon.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les deux blocs sans mélanger fonctions et stock.</li>',
      '      <li><strong>Auditer</strong> chaque produit : première lettre manquante dans l\'ordre v, c, g, s.</li>',
      '      <li><strong>Inventorier</strong> : quantité et valeur de chaque ligne du stock.</li>',
      '      <li><strong>Accumuler</strong> la valeur totale et la comparer au volume attendu.</li>',
      '      <li><strong>Verdict</strong> final au format exact du cahier des charges.</li>',
      '    </ol>',
      '    <p>Contraintes : parsing lettre à lettre, premier manque dans l\'ordre, bilan après lecture complète.</p>'
    ].join('\n')),
    box('method', 'Grille d\'auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture des deux blocs et parsing correct <strong>20</strong>' },
        { cls: '', text: 'Audit des fonctions (premier manque) <strong>20</strong>' },
        { cls: '', text: 'Inventaire et valeur totale <strong>20</strong>' },
        { cls: '', text: 'Verdict global conforme <strong>20</strong>' },
        { cls: '', text: 'Rapport lisible et formats exacts <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
    'read -r n',
    'toutes_ok=1',
    'for ((k=0; k&lt;n; k++)); do',
    '  read -r produit config',
    '  v=0 ; c=0 ; g=0 ; s=0',
    '  if [ "$config" != "-" ]; then',
    '    for ((j=0; j&lt;${#config}; j++)); do',
    '      lettre=${config:$j:1}',
    '      case "$lettre" in',
    '        v) v=1 ;;',
    '        c) c=1 ;;',
    '        g) g=1 ;;',
    '        s) s=1 ;;',
    '      esac',
    '    done',
    '  fi',
    '  if [ "$v" = "1" ] &amp;&amp; [ "$c" = "1" ] &amp;&amp; [ "$g" = "1" ] &amp;&amp; [ "$s" = "1" ]; then',
    '    echo "$produit : conforme"',
    '  elif [ "$v" = "0" ]; then',
    '    echo "$produit : a completer (manque v)" ; toutes_ok=0',
    '  elif [ "$c" = "0" ]; then',
    '    echo "$produit : a completer (manque c)" ; toutes_ok=0',
    '  elif [ "$g" = "0" ]; then',
    '    echo "$produit : a completer (manque g)" ; toutes_ok=0',
    '  else',
    '    echo "$produit : a completer (manque s)" ; toutes_ok=0',
    '  fi',
    'done',
    'read -r m',
    'total=0',
    'for ((k=0; k&lt;m; k++)); do',
    '  read -r produit quantite prix',
    '  valeur=$((quantite * prix))',
    '  total=$((total + valeur))',
    '  echo "$produit : quantite=$quantite valeur=$valeur"',
    'done',
    'echo "valeur totale : $total FCFA"',
    'if [ "$toutes_ok" = "1" ] &amp;&amp; [ "$total" -gt 100000 ]; then',
    '  echo "verdict : application prete"',
    'elif [ "$toutes_ok" = "1" ]; then',
    '  echo "verdict : application a enrichir"',
    'else',
    '  echo "verdict : application incomplete"',
    'fi'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine parsing lettre à lettre, premier manque dans l\'ordre, inventaire ' +
    'valorisé et verdict global — les chapitres 1, 5 et 6 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d\'après le support « Tutoriel Projet Tutoré — Application de Gestion de Stock » (LAWSON Latevi Sena, Collège de Paris - Campus de Lomé, janvier 2026). ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours B1 : scripts Bash ' +
        'gradués et soutenance de bout en bout.',
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
