/**
 * Pages transverses du cours de Bureautique B1.
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
    '    <span class="tag tag--time">Bureautique</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>te repérer dans Word : onglets et groupes, cinq modes d\'affichage, barre d\'état ;</li>',
      '      <li>mettre un courrier en forme : sélection d\'abord, alignements, retraits, mise en page ;</li>',
      '      <li>tenir une feuille Excel : classeur, feuilles, barres, alignement par défaut ;</li>',
      '      <li>écrire des formules : signe =, SOMME, MOYENNE, MAX, MIN, NB et NBVAL ;</li>',
      '      <li>poser des conditions : SI imbriqué, NB.SI, SOMME.SI, MOYENNE.SI, RANG ;</li>',
      '      <li>monter un diaporama : modes d\'affichage, thème, minutage.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Les trois supports d\'AHADJI Katé Kékéli déroulent Word (interface et mise en forme), Excel ' +
      '(feuille, formules, conditionnelles) et PowerPoint (présentation). Ce cours en garde l\'esprit et fait ' +
      'appliquer chaque mécanisme <strong>dans des études de cas</strong> : une grille d’analyse qui reproduit l\'analyse exacte du support — ' +
      'classement des onglets, alignement, commission à paliers, minutage — exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : vous écrivez vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que vous ne voyez pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les exemples des supports (commission, Gauche/Droite/STXT, diaporama).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo bureautique</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Bureautique B1 — Word, Excel, PowerPoint | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du premier clic dans le ruban jusqu\'au diaporama ' +
    'chronométré. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou ' +
    'supérieur (et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas méthodologiques</strong> à écrire et à exécuter ' +
    'dans la page : votre script est réellement lancé, puis corrigé par des tests que vous ne voyez pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo bureautique</span><br><span class="toc__d">Onglets Word, alignements, barres Excel, six fonctions, SI imbriqué, modes PowerPoint.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le classeur de bord du secrétariat.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Résoudre et valider des études de cas directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Bureautique B1 : ' + chapterList.length +
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
    '  <p class="lead">Un éditeur interactif dans la page pour résoudre les études de cas. Complétez la grille d’analyse, validez-la et observez le résultat : c\'est ici qu\'une règle de mise en forme devient un contrôle automatisé.</p>',
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
      '  <script type="text/plain" data-lab-starter># Zone libre : pratiquez les fonctions bureautiques et tableurs.',
      '# Rédigez vos formules et grilles d\'alignement.',
      '',
      '[Cas 1 — Alignement de données]',
      '# Données : montant 1500',
      'montant : aligne a droite (nombre)',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — simulateur de tableur</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('book') + ' Étude de cas</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prenez un mécanisme du ' +
      'cours (alignement par défaut, commission à paliers, minutage du diaporama), programmez-le et testez-le sur ' +
      'des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé aligne chaque valeur comme le fait Excel : texte à gauche, nombre à droite. ' +
      'Transforme-le : ajoute le calcul de la somme, applique la commission à paliers du support, ou remplace ' +
      'tout le script par le mécanisme que vous voulez vérifier.</p>',
      '      <p>Dans un vrai classeur, ce contrôle se fera à la relecture : la structure du script — lire, ' +
      'décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3',
      'client texte',
      '1200 nombre',
      'SOMME(A1:A5) texte</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>client : aligne a gauche',
      '1200 : aligne a droite',
      'SOMME(A1:A5) : aligne a gauche</pre></div>',
      '    </div>',
      '    <p class="lab__note">Trois lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai classeur</h2>',
    '  <p>La simulation a une limite assumée : aucune cellule n\'est écrite et aucun fichier .xlsx n\'est ' +
    'produit — la bureautique reste du texte structuré. Elle a une force : <strong>toute la logique se ' +
    'vérifie sans risque</strong> — on peut rejouer une commission à paliers autant de fois que nécessaire. ' +
    'Quand le script reproduit les bons réflexes — lire, décider, rapporter — le passage au vrai logiciel ' +
    'est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Paliers dans le mauvais ordre</strong> : tester CA &gt;= 10000 avant 50000 fait tout tomber dans le palier bas.</li>',
      '      <li><strong>Sans le signe =</strong> : la « formule » reste du texte — le script qui oublie sa sortie ressemble à la cellule qui oublie son signe.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : l’étude de cas comporte le type avant la valeur, et tout décale.</li>',
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
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Word : l\'interface et la saisie' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler la bureautique | ' + course.brand,
      description: 'Atelier de scripts du cours de Bureautique B1 : éditeur dans le navigateur, validation directe de la grille d’analyse, données du cas, console de sortie et tuteur qui explique les erreurs.',
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo bureautique' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Bureautique B1 : notions clés des ' +
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
    '  <h1>Mémo bureautique</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'une journée de travail. À garder ' +
    'ouvert pendant les exercices et l\'atelier.</p>',

    bloc('Word : interface et saisie', [
      '<pre><code>onglets : Accueil (Presse-papiers, Police, Paragraphe, Style)\n',
      '          Insertion (Pages, Tableaux, Illustrations, Liens, Symbole)\n',
      '          Mise en page / References / Publipostage / Revision / Affichage\n',
      'modes   : Page (defaut) / Lecture plein ecran / Web (HTML)\n',
      '          Plan (titres) / Brouillon (rapide, images masquees)\n',
      'barre d\'etat : page, langue, zoom, statistiques (mots APPROXIMATIFS)\n',
      'selection : doubleclic=mot  ctrlclic=phrase  tripleclic=paragraphe\n',
      '            ctrla=tout   F8=croissante (ESC sort)\n',
      'enregistrer : 1er fois Enregistrer sous / Ctrl+S regulierement\n',
      '              fermeture : Oui enregistre, Non perd, Annuler reste</code></pre>',
      '<p>Sélectionner avant de mettre en forme — et enregistrer avant de fermer.</p>'
    ].join('\n')),

    bloc('Word : mise en forme et mise en page', [
      '<pre><code>alignements : gauche (marge gauche) / droite (marge droite)\n',
      '              centrer (milieu) / justifier (LES DEUX bords)\n',
      'paragraphe : interligne (entre lignes), Avant/Apres (autour)\n',
      '              retrait (decale d\'une tabulation), taquets (regle)\n',
      'page       : marges 2,5 cm / orientation portrait (longueur)\n',
      '              ou paysage (largeur) / numeros de page (Insertion)\n',
      'impression : imprimante par defaut -> apercu -> Ctrl+P</code></pre>',
      '<p>Seul le justifié aligne les deux bords : le défaut des rapports officiels.</p>'
    ].join('\n')),

    bloc('Excel : la feuille de calcul', [
      '<pre><code>classeur = fichier ; feuilles : clic droit (renommer, inserer,\n',
      '          deplacer ou copier, supprimer)\n',
      'barres   : acces rapide / titre / FORMULE (contenu) / etat (options)\n',
      'onglets  : 7 par defaut + un temporaire pour les objets\n',
      'alignement par defaut : TEXTE a gauche, CHIFFRES a droite\n',
      'insertion : ligne au-DESSUS, colonne a GAUCHE\n',
      'formats  : Nombre (2 dec) / Pourcentage / Texte (litteral) / Date</code></pre>',
      '<p>La barre de formule voit le contenu ; la barre d\'état, les options.</p>'
    ].join('\n')),

    bloc('Excel : formules et fonctions', [
      '<pre><code>formule : commence TOUJOURS par = (sinon texte aligne a gauche)\n',
      'operateurs : + - * / % ^   comparaison = > < >= <= <>\n',
      '             & concatene   : plage   ; union   espace intersection\n',
      'statistiques : =SOMME(A2:A10) =MOYENNE(A2:A10) =MAX =MIN\n',
      'compteurs : NB (nombres) != NBVAL (non vides)\n',
      'texte     : =Gauche(B1;3)=INF  =Droite(B1;5)=tique\n',
      '            =STXT(B1;2;3)=nfo (position 1 = premiere lettre)\n',
      'conditions : NB.SI (compte) / SOMME.SI (additionne) / MOYENNE.SI</code></pre>',
      '<p>Sans le signe =, la formule reste du texte : le tableur le signale par l\'alignement.</p>'
    ].join('\n')),

    bloc('Excel : la fonction SI', [
      '<pre><code>=SI(Test; Valeur_si_vrai; Valeur_si_faux)\n',
      'imbrication : du palier le PLUS STRICT au plus large\n',
      '\n',
      'commission (support) :\n',
      '  CA >= 50000 -> 20%   (test 1)\n',
      '  CA >= 10000 -> 15%   (test 2)\n',
      '  sinon       -> 10%   (cas par defaut)\n',
      '\n',
      'bash : if / elif / else — meme ordre, memes bornes\n',
      'RANG(nombre;reference;ordre) : position relative dans la liste</code></pre>',
      '<p>Tester le grand seuil d\'abord : l\'ordre des tests fait le travail.</p>'
    ].join('\n')),

    bloc('PowerPoint : la présentation', [
      '<pre><code>ecran : bouton Office (remplace Fichier) / ruban / volet Plan\n',
      '        Diapositives / volet Commentaires / zoom\n',
      'modes : Normal (edite) / Trieuse (organise, transitions, minutage)\n',
      '        Diaporama (projette) / Page de commentaire (annote)\n',
      'passage : automatique (delai) ou manuel\n',
      'creation : bouton Office > Nouveau > vierge OU modele (styles)\n',
      'theme    : onglet Creation, couleurs adaptables (groupe Themes)\n',
      'secours  : Ouvrir et reparer (document corrompu)</code></pre>',
      '<p>Répéter en mode Trieuse avant de projeter : ordre, transitions, minutage.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Mettre en forme sans sélectionner : rien ne change.</li>',
      '    <li>Chercher le groupe Tableaux dans Accueil : il vit dans Insertion.</li>',
      '    <li>Croire que le compteur de mots de Word est exact : il est approximatif.</li>',
      '    <li>Imprimer sans passer par l\'aperçu avant impression.</li>',
      '    <li>Insérer une colonne à droite : elle s\'insère à GAUCHE de la sélection.</li>',
      '    <li>Écrire SOMME(A2:A10) sans le signe = : du texte, pas une formule.</li>',
      '    <li>Confondre NB (nombres) et NBVAL (non vides).</li>',
      '    <li>Tester le palier bas de la commission en premier.</li>',
      '    <li>Compter les positions de STXT à partir de zéro : la première lettre est la position 1.</li>',
      '    <li>Réorganiser les diapositives en mode Normal : la Trieuse est faite pour ça.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo bureautique — ' + course.brand,
      description: 'Mémo du cours de Bureautique B1 : Word (interface, mise en forme), Excel (feuille, ' +
        'formules, conditionnelles) et PowerPoint (modes, diaporama) sur une page.',
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
      intro: 'Sujet type épreuve — Word (interface, mise en forme) et Excel (feuille).',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Interface de Word',
          text: 'Ranger dans leurs onglets : groupe Police ; groupe Tableaux ; groupe Zoom ; groupe Filigrane. Citer les cinq modes d\'affichage et dire lequel est actif par défaut.',
          sol: '<strong>Police : Accueil</strong> ; <strong>Tableaux : Insertion</strong> ; <strong>Zoom : Affichage</strong> ; <strong>Filigrane : Mise en page</strong>. Modes : Page (actif par défaut, marges visibles), Lecture plein écran (ruban caché), Web (HTML), Plan (titres d\'un long document), Brouillon (rapide, images masquées).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Sélection et enregistrement',
          text: 'Comment sélectionner un mot, une phrase, un paragraphe, tout le document ? Que signifient les trois boutons du message de fermeture sans enregistrement ?',
          sol: '<strong>Mot : double-clic</strong> ; <strong>phrase : Ctrl + clic</strong> ; <strong>paragraphe : triple-clic</strong> (ou double-clic dans la marge) ; <strong>tout : Ctrl+A</strong>. À la fermeture : <strong>Oui</strong> enregistre depuis la dernière sauvegarde, <strong>Non</strong> ferme en perdant ces modifications, <strong>Annuler</strong> reste dans Word.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Mise en forme',
          text: 'Quel alignement aligne les deux bords ? Où règle-t-on l\'espace entre les lignes ? Quelle différence entre retrait et interligne ? Décrire le parcours complet d\'une impression maîtrisée.',
          sol: '<strong>Justifier</strong> aligne gauche ET droit. L\'espace entre les lignes se règle par l\'<strong>interligne</strong> (boîte de dialogue Paragraphe) ; le <strong>retrait</strong> décale le bord gauche (ou la première ligne) d\'une valeur de tabulation. Impression : imprimante par défaut, <strong>aperçu avant impression</strong> (retouches), puis <strong>Ctrl+P</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — La feuille Excel',
          text: 'Citer les cinq barres de la fenêtre Excel et leur rôle. Quelle est la règle d\'alignement par défaut ? Côté d\'insertion d\'une ligne et d\'une colonne ? Les quatre formats du groupe Nombre ?',
          sol: '<strong>Accès rapide</strong> (commandes), <strong>titre</strong> (application + document), <strong>formule</strong> (contenu des cellules), <strong>défilement</strong>, <strong>état</strong> (options). Alignement par défaut : <strong>texte à gauche, chiffres à droite</strong>. La ligne s\'insère <strong>au-dessus</strong>, la colonne <strong>à gauche</strong>. Formats : Nombre (2 décimales), Pourcentage, Texte (littéral), Date (courte ou longue).'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté formules, conditionnelles et PowerPoint.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Formules',
          text: 'Écrire : la somme de A2 à A10 ; la moyenne de la même plage ; le test « différent de ». Calculer STXT(B1;2;3) sur « INFORMATIQUE », puis =Gauche(B1;4)&Droite(B2;9) sur « informatique » et « toto@yahoo.fr ».',
          sol: '<strong>=SOMME(A2:A10)</strong> ; <strong>=MOYENNE(A2:A10)</strong> ; opérateur <strong>&lt;&gt;</strong>. <strong>STXT(B1;2;3)</strong> : 3 caractères dès la position 2 = <strong>NFO</strong>. Concaténation : « info » + « @yahoo.fr » = <strong>info@yahoo.fr</strong>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — NB et NBVAL',
          text: 'Une plage contient : 12, « chat », une cellule vide, 7. Que valent NB, NBVAL ? Quelle différence entre les deux fonctions ? Pourquoi une formule sans = reste-t-elle du texte ?',
          sol: '<strong>NB = 2</strong> (les nombres 12 et 7) ; <strong>NBVAL = 3</strong> (toutes les non vides, texte compris). NB compte les cellules <strong>numériques</strong>, NBVAL les <strong>non vides</strong>. Sans le signe =, le contenu est interprété comme du texte — il s\'aligne à gauche dans la cellule.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — La fonction SI',
          text: 'Écrire en SI imbriqué la commission du support : 10 % si CA &lt; 10000 ; 15 % si 10000 &lt;= CA &lt; 50000 ; 20 % si CA &gt;= 50000. Puis donner la commission de CA = 9999, 10000, 49999, 50000. À quoi sert RANG ?',
          sol: '=SI(CA&gt;=50000;20%;SI(CA&gt;=10000;15%;10%)) — du palier le plus strict au plus large. CA 9999 → <strong>10 %</strong> ; 10000 → <strong>15 %</strong> (borne incluse) ; 49999 → <strong>15 %</strong> ; 50000 → <strong>20 %</strong>. <strong>RANG</strong> renvoie la position relative d\'un nombre dans une liste, selon l\'ordre choisi.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — PowerPoint',
          text: 'Citer les quatre modes d\'affichage et leur vocation. Quel mode sert à régler transitions et minutage ? Passage automatique ou manuel ? Que fait « Ouvrir et réparer » ?',
          sol: '<strong>Normal</strong> (éditer, une diapositive à la fois), <strong>Trieuse</strong> (miniatures, réorganisation, <strong>transitions et minutage</strong>), <strong>Diaporama</strong> (projection), <strong>Page de commentaire</strong> (notes — guide du présentateur). Passage <strong>automatique après un délai</strong> ou manuel. <strong>Ouvrir et réparer</strong> secourt un document corrompu (déconnexion USB, panne de courant).'
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
    { stem: 'Le groupe Tableaux appartient à l\'onglet…', opts: ['Accueil', 'Insertion', 'Affichage'], correct: 1, exp: 'Insertion : Pages, Tableaux, Illustrations, Liens, Symbole.' },
    { stem: 'Le mode d\'affichage par défaut de Word est…', opts: ['Web', 'Brouillon', 'Page'], correct: 2, exp: 'Page : le plus utilisé, les 4 marges visibles.' },
    { stem: 'L\'alignement qui touche les deux bords :', opts: ['centrer', 'justifier', 'aligner à droite'], correct: 1, exp: 'Justifier : gauche ET droit proprement alignés.' },
    { stem: 'La colonne insérée par clic droit apparaît…', opts: ['à gauche de la sélection', 'à droite de la sélection', 'en fin de feuille'], correct: 0, exp: 'Ligne au-dessus, colonne à gauche.' },
    { stem: 'Une formule Excel commence toujours par…', opts: ['un signe +', 'le signe =', 'une lettre'], correct: 1, exp: 'Sinon le contenu reste du texte aligné à gauche.' },
    { stem: 'NB compte…', opts: ['les cellules non vides', 'les cellules numériques', 'les formules'], correct: 1, exp: 'NBVAL compte les non vides, texte compris.' },
    { stem: 'STXT(B1;2;3) extrait…', opts: ['les 2 premiers caractères', '3 caractères dès la position 2', 'la position 2 seulement'], correct: 1, exp: 'Positions comptées à partir de 1.' },
    { stem: 'CA = 50000, commission du support :', opts: ['15 %', '20 %', '10 %'], correct: 1, exp: 'CA >= 50000 : palier 20 %, testé en premier.' },
    { stem: 'Dans un SI imbriqué, on teste…', opts: ['du plus strict au plus large', 'du plus large au plus strict', 'dans n\'importe quel ordre'], correct: 0, exp: 'Le premier test élimine les cas hauts.' },
    { stem: 'Réorganiser les diapositives et régler le minutage :', opts: ['mode Normal', 'mode Trieuse', 'page de commentaire'], correct: 1, exp: 'Trieuse : vue globale en miniatures, transitions, minutage.' }
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
      '<strong>Réservez 15 min de relecture</strong> : onglets, alignements, signe =, bornes de la commission, ' +
      'modes d\'affichage.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible formules et conditionnelles.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après les supports de cours Word, Excel et PowerPoint (AHADJI Katé Kékéli). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Bureautique B1 : sujets chronométrés sur Word, Excel et ' +
        'PowerPoint avec corrigés détaillés.',
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
    '    <details><summary>Corrections &amp; formules bureautiques</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de modélisation financière et d’automatisation sous tableur.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer les références relatives (A1), absolues ($A$1) et mixtes ($A1 ou A$1) lors du recopiage de formule.',
      'Utiliser les fonctions arithmétiques de base (SOMME, MOYENNE, MIN, MAX, NB, NBVAL).',
      'Appliquer une règle de mise en forme conditionnelle pour surligner les valeurs supérieures à un seuil.',
      'Paramétrer les styles de paragraphe, tables des matières automatiques et sauts de section sous traitement de texte.'
    ], [
      '<p><strong>1. Références :</strong> $A$1 fige colonne et ligne au déplacement ; $A1 fige la colonne seule ; A$1 fige la ligne seule.</p>',
      '<p><strong>2. Fonctions de base :</strong> =SOMME(A1:A10) totalise la plage ; =NBVAL compte les cellules non vides.</p>',
      '<p><strong>3. Mise en forme conditionnelle :</strong> Sélection de la plage &rarr; Règle "Valeur > seuil" &rarr; Format personnalisé de remplissage.</p>',
      '<p><strong>4. Traitement de texte :</strong> Les styles Titre 1, Titre 2 génèrent automatiquement la table des matières dynamique.</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Construire des formules conditionnelles imbriquées avec SI, ET, OU.',
      'Rechercher des correspondances exactes dans des tables de référence avec RECHERCHEV ou le couple INDEX / EQUIV.',
      'Concevoir un tableau croisé dynamique (TCD) avec champs de lignes, colonnes, filtres et valeurs calculées.',
      'Créer des graphiques de comparaison adaptés (histogrammes, secteurs, courbes de tendance temporelles).'
    ], [
      '<p><strong>1. Formule conditionnelle :</strong> =SI(ET(A2>=10; B2="Validé"); "Admis"; "Ajourné").</p>',
      '<p><strong>2. Recherche exacte :</strong> =RECHERCHEV(cle; table_ref; 3; FAUX) ou =INDEX(plage_retour; EQUIV(cle; plage_recherche; 0)).</p>',
      '<p><strong>3. Tableau croisé dynamique :</strong> Glisser les catégories en Lignes, les périodes en Colonnes et la somme des montants en Valeurs.</p>',
      '<p><strong>4. Choix graphique :</strong> Histogramme pour comparer des catégories discrètes ; courbe pour illustrer une évolution continue.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Concevoir un tableau de bord de gestion automatisé avec segments interactifs et indicateurs de performance (KPI).',
      'Mettre en place une validation des données stricte pour interdire les saisies incohérentes dans une grille partagée.',
      'Sécuriser un classeur : verrouillage de cellules de formules, protection de feuille par mot de passe et masquer les données sensibles.',
      'Automatiser des traitements répétitifs par création de macros enregistrées ou formulaires de saisie.'
    ], [
      '<p><strong>1. Dashboard KPI :</strong> Cartes de scores reliées à des formules SOMME.SI.ENS, jauges de progression et segments dynamiques.</p>',
      '<p><strong>2. Validation des données :</strong> Données &rarr; Validation des données &rarr; Liste déroulante ou Nombre entier compris entre min et max.</p>',
      '<p><strong>3. Protection :</strong> Déverrouiller uniquement les cellules de saisie, verrouiller les formules, puis Activer la protection de la feuille.</p>',
      '<p><strong>4. Automatisation :</strong> L’enregistreur de macros génère le code d’automatisation pour standardiser les imports mensuels.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Modélisation Budgétaire &amp; Tableau de Bord</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’application bureautique consiste à concevoir l’outil de pilotage budgétaire d’une direction des systèmes d’information : prévisions d’achats matériels, suivi des licences logicielles, calcul d’amortissements et reporting de synthèse.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences bureautiques évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Modélisation avancée :</strong> Utilisation des fonctions matricielles et recherche multicritères.</li>',
      '      <li><strong>Contrôle de cohérence :</strong> Validation des saisies, alertes automatiques et gestion des erreurs (#N/A, #DIV/0!).</li>',
      '      <li><strong>Restitution décisionnelle :</strong> Qualité visuelle du tableau de bord exécutif et clarté de lecture.</li>',
      '      <li><strong>Fiabilité &amp; pérennité :</strong> Séparation nette entre données brutes, calculs intermédiaires et restitutions.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de bureautique avancée B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de modélisation sous tableur B1 : formules avancées, TCD et tableaux de bord.',
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
      description: 'Chapitre ' + chapitre.n + ' du cours de Bureautique B1 : ' + chapitre.toc +
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
