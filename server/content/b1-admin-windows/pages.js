/**
 * Pages transverses du cours « Administration Windows » B1, alignées sur les
 * supports B1 du module (Dr Abasse KPEGOUNI) : accueil, sommaire, atelier,
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
    '    <span class="tag tag--time">Administration Windows</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>classer les tâches de l’administrateur et nommer ses outils Windows ;</li>',
      '      <li>choisir l’édition de Windows Server 2012 adaptée : Foundation à Datacenter ;</li>',
      '      <li>mettre un serveur d’aplomb : pare-feu (3 profils), nom, IP statique, activation, accès distant ;</li>',
      '      <li>construire le vocabulaire AD DS : domaine, arbre, forêt, sous-domaines ;</li>',
      '      <li>installer un contrôleur de domaine : rôle AD DS, promotion, NTDS.DIT et SYSVOL ;</li>',
      '      <li>peupler le domaine : unités d’organisation, utilisateurs (UPN), groupes.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Les supports « Base de l’Administration Windows » (Dr Abasse KPEGOUNI) déroulent le parcours du ' +
      'débutant : le métier d’administrateur système, le système lui-même (Windows Server 2012 R2 et ses ' +
      'éditions), sa configuration initiale, puis l’annuaire d’entreprise — Active Directory : notions, ' +
      'installation du contrôleur de domaine, gestion des objets. Ce cours en garde l’esprit et fait ' +
      'appliquer chaque règle <strong>dans des études de cas</strong> : familles de tâches, limites des éditions, ' +
      'syntaxes de session, profils du pare-feu, validation d’IPv4, arborescences de domaines, matrice ' +
      'des informations AD, cycle des comptes et des groupes.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : vous écrivez vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que vous ne voyez pas. La logique écrite ' +
      'ici se rejoue telle quelle aux travaux pratiques sur Windows Server 2012 R2.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo Administration</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Administration Windows B1 | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du métier d’administrateur jusqu’aux objets du ' +
    'domaine. Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur ' +
    '(et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas</strong> à résoudre et à valider dans la page : votre analyse est réellement lancé, puis corrigé par des tests que vous ne voyez pas. ' +
    'L’<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Administration</span><br><span class="toc__d">Tâches de l’admin, éditions 2012, configuration requise, pare-feu, IP, AD DS, NTDS/SYSVOL, objets.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : la mise en service d’un domaine.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Résoudre et valider des études de cas directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours « Administration Windows » B1 : ' + chapterList.length +
        ' chapitres, études de cas interactives, flashcards, mémo et examens blancs.',
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
    '  <p class="lead">Un éditeur interactif dans la page pour résoudre les études de cas. Complétez la grille d’analyse, validez-la et observez le résultat : c’est ici qu’une règle d’administration devient un contrôle automatisé.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> vérifie votre grille d’analyse sur le cas d’exemple et affiche le résultat obtenu.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>read</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',
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
      '  <script type="text/plain" data-lab-starter>#Grille d’analyse Windows Server',
      '# Zone libre : simulez, cassez, recommencez.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : contrôleur d’éditions de Windows Server 2012.',
      '# l’étude de cas comporte n lignes « edition vm_prevues » et dit si',
      '# la licence couvre le nombre de machines virtuelles.',
      '',
      'read -r n',
      'for ((i=0; i<n; i++)); do',
      '  read -r edition vm_prevues',
      '  case "$edition" in',
      '    foundation) echo "$edition : sans virtualisation" ;;',
      '    essential) echo "$edition : sans virtualisation" ;;',
      '    standard)',
      '      if [ "$vm_prevues" -le 2 ]; then echo "$edition : couvert"',
      '      else echo "$edition : depasse la licence" ; fi ;;',
      '    datacenter) echo "$edition : vm illimitees" ;;',
      '  esac',
      'done',
      'echo "editions controlees : $n"',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — contrôleur d’éditions de Windows Server 2012</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Grille d’analyse</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prenez une règle du ' +
      'cours (limites des éditions, profils du pare-feu, syntaxes de session, arborescences de domaines, ' +
      'droits des groupes), programmez-la et testez-la sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé rejoue la règle des licences virtualisées : Standard couvre deux machines ' +
      'virtuelles, Datacenter les couvre sans limite, Foundation et Essential n’en veulent pas. ' +
      'Transforme-le : fais-le conseiller l’édition selon le besoin, refuser Foundation en message explicite, ' +
      'ou remplace tout le script par la règle que vous voulez vérifier.</p>',
      '      <p>Aux TP, ce choix se fait devant l’écran d’installation : la structure du script — lire, ' +
      'décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>3',
      'standard 2',
      'standard 3',
      'datacenter 15</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>standard : couvert',
      'standard : depasse la licence',
      'datacenter : vm illimitees',
      'editions controlees : 3</pre></div>',
      '    </div>',
      '    <p class="lab__note">Trois lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>Du script à la vraie console</h2>',
    '  <p>La simulation a une limite assumée : aucun contrôleur de domaine ne se promeut ici et aucune ' +
    'unité d’organisation ne se crée — le serveur reste du texte structuré. Elle a une force : ' +
    '<strong>toute la logique se vérifie sans risque</strong> — on peut rejouer le choix d’une édition, ' +
    'la validation d’une adresse IP ou la matrice des informations AD autant de fois que nécessaire. ' +
    'Quand le script reproduit les bons réflexes — lire, décider, rapporter — le passage à PowerShell et ' +
    'à la vraie console est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Case incomplet</strong> : une valeur imprévue tombe dans le défaut silencieux et produit une sortie vide.</li>',
      '      <li><strong>Compteur dans la boucle</strong> : le bilan s’affiche à chaque ligne au lieu d’une seule fois, après.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : l’étude de cas comporte la seconde valeur avant la première, et tout décale.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l’atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d’exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n’est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d’exécutions est limité par jour, pour tout le monde. L’atelier n’exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois études de cas corrigées automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que la règle est vraiment acquise.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — L’administration système' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — Administration Windows | ' + course.brand,
      description: 'Atelier de scripts du cours B1 : éditeur dans le navigateur, validation directe de la grille d’analyse, données du cas, console de sortie et tuteur qui explique les erreurs.',
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo Administration' })
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
    '  <h1>Mémo Administration Windows</h1>',
    '  <p class="lead">Les règles du module sur une page, dans l’ordre de la construction. À garder ouvert ' +
    'pendant les exercices et l’atelier.</p>',

    bloc('Le métier d’administrateur', [
      '<pre><code>definition : gestion des programmes donnant acces a la\n',
      '  machine et a ses peripheriques dans un parc\n',
      '\n',
      'taches (CALMS) : Comptes / Assistance / Logiciels /\n',
      '  Materiel / Securite (+ maintenance 1er niveau)\n',
      'qualites : technicite / rigueur / bon sens\n',
      'types : poste de travail / serveurs / reseau\n',
      '\n',
      'outils Windows : Gestionnaire des taches /\n',
      '  Gestion de l ordinateur (utilisateurs, evenements,\n',
      '  services, stockage) / Analyseur de performance /\n',
      '  Gestionnaire de securite</code></pre>',
      '<p>L’administrateur est en première ligne : c’est lui qu’on appelle… et qu’on incrimine.</p>'
    ].join('\n')),

    bloc('Windows Server 2012 R2 : éditions et installation', [
      '<pre><code>chronologie : 1985 Win 1.0 / annees 90 NT /\n',
      '  2003 1er Windows Server / 2008-2012-2016-2019-2022\n',
      '\n',
      'editions 2012 : Foundation 15 u, sans VM, 1 CPU,\n',
      '  physique / Essential 25 u, 2 CPU / Standard 2 VM /\n',
      '  Datacenter VM illimitees\n',
      'options : Server Core (moins de surface d attaque)\n',
      '  ou interface graphique (bascule possible, DISM)\n',
      'requis : 3,1 GHz 64 bits / RAM 2 Go (8 conseilles) /\n',
      '  60 Go disque / Gigabit Ethernet\n',
      'session : SAM locale machine\\user / domaine\n',
      '  NETBIOS\\login ou login@domaine</code></pre>',
      '<p>Standard et Datacenter ont les mêmes fonctions : seule la licence VM les distingue.</p>'
    ].join('\n')),

    bloc('Configuration initiale du serveur', [
      '<pre><code>gestionnaire de serveur : tableau de bord (roles,\n',
      '  groupes de serveurs) / serveur local (nom, pare-feu,\n',
      '  IP, bureau a distance) / outils / notifications\n',
      '\n',
      'pare-feu : 3 profils a traiter (domaine, prive, public)\n',
      '  netsh advfirewall set allprofiles state off\n',
      '  Set-NetFirewallProfile -Profile Domain,Public,Private\n',
      '    -Enabled False\n',
      'nom : netdom renamecomputer ACTUEL /NewName:NOUVEAU\n',
      '  puis shutdown /r\n',
      'IP : New-NetIPAddress -InterfaceIndex 12 -IPAddress\n',
      '  192.168.1.203 -PrefixLength 24 -DefaultGateway ...\n',
      '  (ifIndex par Get-NetAdapter ; ActiveStore applique,\n',
      '  PersistentStore conserve apres reboot)\n',
      'activation : slmgr.vbs /ipk CLE puis /ato (ou sconfig 11)\n',
      'distant : bureau a distance, Enable-PSRemoting -Force</code></pre>',
      '<p>Un profil de pare-feu oublié = une panne qui n’apparaît que sur ce réseau.</p>'
    ].join('\n')),

    bloc('Active Directory : notions', [
      '<pre><code>hierarchie : domaine ⊂ arbre ⊂ foret\n',
      'domaine : entite logique (objets + strategies)\n',
      'succursales : cdp.org racine, paris.cdp.org et\n',
      '  lome.cdp.org = domaines enfants\n',
      'arbre : domaines a espace de nom contigu\n',
      'foret : regroupement d arbres independants\n',
      'renommage d un domaine : possible mais tres lourd\n',
      '  (PC, utilisateurs, services, logiciels)</code></pre>',
      '<p>Le nom du domaine se choisit une fois, une fois pour toutes.</p>'
    ].join('\n')),

    bloc('Installer un contrôleur de domaine', [
      '<pre><code>1. role : Gerer → Ajouter des roles → AD DS\n',
      '   (binaires installes, PAS encore configure)\n',
      '2. promotion : bandeau jaune → Promouvoir ce serveur\n',
      '   → Ajouter une nouvelle foret → nom du domaine\n',
      '3. niveau fonctionnel : le plus haut (2012 R2)\n',
      '4. mot de passe DSRM (restauration AD) : solide\n',
      '5. avertissement DNS : AD DS exige le DNS\n',
      '6. dossiers : base NTDS.DIT / journaux / SYSVOL\n',
      '   (scripts de connexion, GPO, replication)\n',
      '7. verification des prerequis → redemarrage OBLIGATOIRE\n',
      'PowerShell : Install-WindowsFeature AD-Domain-Services\n',
      '  puis Install-ADDSForest</code></pre>',
      '<p>Où sont les GPO ? Dans SYSVOL — question d’examen classique.</p>'
    ].join('\n')),

    bloc('Gérer les objets AD DS', [
      '<pre><code>console : Utilisateurs et ordinateurs AD\n',
      'ordre : UO (rangement) → groupes → utilisateurs\n',
      'utilisateur : formulaire + UPN (iziti@ntic.ma)\n',
      '  + option « doit changer le mot de passe »\n',
      '  + onglet Compte : horaires d acces\n',
      'groupes : securite (droits) / distribution (diffusion)\n',
      '  etendue : Globale (cas courant du support)\n',
      'jointure domaine : DNS du client = DNS du domaine,\n',
      '  puis changement d appartenance, puis reboot\n',
      'profil itinerant : profil synchronise sur le serveur,\n',
      '  suit l utilisateur de poste en poste\n',
      'PowerShell : New-ADUser / Set-ADUser / Get-ADUser</code></pre>',
      '<p>Droits aux groupes, jamais aux utilisateurs isolés : la règle d’or.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre Standard (2 VM) et Datacenter (VM illimitées).</li>',
      '    <li>Oublier un profil du pare-feu (domaine, privé, public).</li>',
      '    <li>Ajouter une IP sans supprimer l’ancienne (Remove-NetIPAddress).</li>',
      '    <li>Confondre ActiveStore (applique) et PersistentStore (conserve).</li>',
      '    <li>S’arrêter après l’installation du rôle AD DS : la promotion reste à faire.</li>',
      '    <li>Nom de domaine irréel : le renommage coûte très cher.</li>',
      '    <li>Mot de passe DSRM bâclé : c’est la clé de secours de l’AD.</li>',
      '    <li>Donner des droits à des utilisateurs au lieu de groupes.</li>',
      '    <li>Joindre un poste au domaine sans corriger son DNS.</li>',
      '    <li>Oublier le redémarrage obligatoire après la promotion.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo Administration Windows — ' + course.brand,
      description: 'Mémo du cours B1 : métier d’admin, éditions 2012, configuration initiale, ' +
        'AD DS, contrôleur de domaine et objets sur une page.',
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
      intro: 'Sujet type épreuve — métier, éditions, configuration initiale.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Métier',
          text: 'Définir l’administration système. Citer les familles de tâches, les trois qualités et les trois types d’administration.',
          sol: 'Gestion de l’ensemble des programmes permettant d’accéder à une machine et d’utiliser ses périphériques dans un parc. Tâches : <strong>comptes, assistance, logiciels, matériel, sécurité</strong> (+ maintenance de premier niveau). Qualités : <strong>technicité, rigueur, bon sens</strong>. Types : <strong>poste, serveurs, réseau</strong>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Éditions',
          text: 'Une TPE de 12 utilisateurs sans virtualisation, puis une entreprise prévoyant 10 VM : quelle édition pour chacun ? Justifier.',
          sol: 'TPE : <strong>Foundation</strong> (15 utilisateurs max, sans virtualisation, machine physique). 10 VM : <strong>Datacenter</strong> (VM illimitées) — Standard couvrirait seulement <strong>2 VM</strong> par licence.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Session',
          text: 'Écrire les trois syntaxes d’ouverture de session et dire ce qu’est la SAM.',
          sol: 'Locale : <strong>machine\\utilisateur</strong> (base SAM). Domaine : <strong>NETBIOS\\login</strong> ou <strong>login@domaine</strong>. La <strong>SAM</strong> (Security Account Manager) est la base de données des comptes locaux, composant du registre.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Configuration',
          text: 'Citer les commandes : pare-feu sur les trois profils (netsh et PowerShell), renommage, IP statique 192.168.1.203/24 sur l’ifIndex 12.',
          sol: '<strong>netsh advfirewall set allprofiles state off</strong> ; <strong>Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False</strong> ; <strong>netdom renamecomputer ACTUEL /NewName:NOUVEAU</strong> puis shutdown /r ; <strong>New-NetIPAddress -InterfaceIndex 12 -IPAddress 192.168.1.203 -PrefixLength 24</strong> (+ passerelle), vérification ipconfig /all.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté Active Directory : notions, installation, objets.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Notions',
          text: 'Définir domaine, arbre, forêt. Construire l’arborescence de cdp.org avec deux succursales (Paris, Lomé).',
          sol: '<strong>Domaine</strong> : entité logique hébergeant objets et stratégies. <strong>Arbre</strong> : domaines à espace de nom contigu. <strong>Forêt</strong> : regroupement d’arbres indépendants. Arborescence : racine <strong>cdp.org</strong>, enfants <strong>paris.cdp.org</strong> et <strong>lome.cdp.org</strong>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Installation',
          text: 'Dérouler les étapes de l’installation d’un contrôleur de domaine, de l’ajout du rôle au redémarrage.',
          sol: 'Rôle <strong>AD DS</strong> (binaires) → bandeau jaune → <strong>Promouvoir</strong> → <strong>Ajouter une nouvelle forêt</strong> + nom réel du domaine → niveau fonctionnel le plus haut (2012 R2) → <strong>mot de passe DSRM</strong> → avertissement <strong>DNS</strong> accepté → dossiers <strong>NTDS.DIT / journaux / SYSVOL</strong> → vérification des prérequis → <strong>redémarrage obligatoire</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Dossiers',
          text: 'Où sont stockées la base AD, les journaux, les GPO et les scripts de connexion ?',
          sol: 'Base = <strong>NTDS.DIT</strong> (dossier « base de données ») ; journaux = dossier dédié, lus par l’Observateur d’événements ; <strong>GPO et scripts de connexion = SYSVOL</strong> (avec les fichiers de réplication).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Objets',
          text: 'Créer l’utilisateur iziti dans l’unité TRI : deux formes de session, option de mot de passe à activer. Quel groupe pour donner des droits ?',
          sol: 'Console Utilisateurs et ordinateurs AD → clic droit sur <strong>TRI</strong> → Nouveau → Utilisateur. Sessions : <strong>iziti@ntic.ma</strong> (UPN) ou <strong>NTIC\\iziti</strong>. Option : « <strong>doit changer le mot de passe à la prochaine ouverture</strong> ». Droits : à donner à un <strong>groupe de sécurité</strong> (pas à l’utilisateur), étendue <strong>Globale</strong>.'
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
    { stem: 'L’édition limitée à 25 utilisateurs :', opts: ['Essential', 'Foundation', 'Datacenter'], correct: 0, exp: 'Essential : 25 u, 2 CPU, sans virtualisation.' },
    { stem: 'L’édition qui couvre 2 VM :', opts: ['Standard', 'Datacenter', 'Essential'], correct: 0, exp: 'Standard = 2 VM par licence ; Datacenter = illimité.' },
    { stem: 'La SAM contient…', opts: ['les comptes locaux de la machine', 'les GPO', 'les zones DNS'], correct: 0, exp: 'Security Account Manager : base des comptes locaux (registre).' },
    { stem: 'Le pare-feu a…', opts: ['3 profils : domaine, privé, public', '2 profils : on/off', '1 profil unique'], correct: 0, exp: 'Toute manipulation doit couvrir les trois profils.' },
    { stem: 'L’index d’une carte réseau s’obtient par…', opts: ['Get-NetAdapter', 'ipconfig /flushdns', 'net user'], correct: 0, exp: 'Colonne ifIndex de Get-NetAdapter ou Get-NetIPInterface.' },
    { stem: 'Une forêt est…', opts: ['un regroupement d’arbres indépendants', 'un domaine isolé', 'une UO spéciale'], correct: 0, exp: 'Domaine ⊂ arbre ⊂ forêt.' },
    { stem: 'La promotion en contrôleur de domaine se lance…', opts: ['après l’installation du rôle AD DS', 'avant d’installer le rôle', 'sans redémarrage'], correct: 0, exp: 'Rôle d’abord (binaires), promotion ensuite, redémarrage obligatoire à la fin.' },
    { stem: 'La base de l’AD s’appelle…', opts: ['NTDS.DIT', 'SYSVOL', 'install.wim'], correct: 0, exp: 'NTDS.DIT ; SYSVOL porte scripts et GPO.' },
    { stem: 'Les GPO vivent dans…', opts: ['SYSVOL', 'NTDS.DIT', 'le registre du client'], correct: 0, exp: 'SYSVOL : scripts de connexion, GPO, réplication.' },
    { stem: 'Un groupe de sécurité sert à…', opts: ['recevoir des droits', 'diffuser des messages', 'joindre le domaine'], correct: 0, exp: 'Les groupes de distribution servent à la diffusion.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’épreuve (durée 2 h, /20). ' +
    'Réalisez-les <strong>sans regarder</strong> les corrigés, puis corrigez-vous sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu’à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : familles de tâches, éditions, commandes de ' +
      'configuration, hiérarchie AD, étapes de promotion, objets du domaine.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible l’installation d’AD DS et les objets.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d’après les supports « Base de l’Administration Windows » (IT_B1A et IT_B1B) du Dr Abasse KPEGOUNI. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours B1 : sujets chronométrés sur le métier d’administrateur, ' +
        'Windows Server 2012 R2, la configuration initiale et Active Directory.',
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
    'met le domaine en service de bout en bout. Les résolutions utilisent des grilles d’analyse structurées, comme à l’atelier.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Lit n lignes « tache famille » (comptes/logiciels/materiel/securite) et valide chaque classement, puis le compteur.',
      'Lit n lignes « edition limite » (u15/u25/vm2/vmillimite) et valide chaque édition, puis le compteur.',
      'Lit n lignes « action onglet » du Gestionnaire de serveur et valide, puis le compteur d’erreurs.',
      'Lit n lignes « poste ram disque » et dit si le poste tient la configuration requise (2 Go, 60 Go), puis le compteur.'
    ], [
      'read -r n',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r tache famille',
      '  case "$tache" in',
      '    comptes) attendu="comptes" ;;',
      '    installer|configurer|patcher) attendu="logiciels" ;;',
      '    panne|remplacement|ajout) attendu="materiel" ;;',
      '    sauvegardes|acces) attendu="securite" ;;',
      '  esac',
      '  if [ "$famille" = "$attendu" ]; then',
      '    echo "$tache : OK"',
      '  else',
      '    echo "$tache : KO ($attendu attendu)"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "erreurs : $e/$n"',
      '',
      'read -r n',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r edition limite',
      '  case "$edition" in',
      '    foundation) attendu="u15" ;;',
      '    essential) attendu="u25" ;;',
      '    standard) attendu="vm2" ;;',
      '    datacenter) attendu="vmillimite" ;;',
      '  esac',
      '  if [ "$limite" = "$attendu" ]; then',
      '    echo "$edition : OK"',
      '  else',
      '    echo "$edition : KO ($attendu attendu)"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "erreurs : $e/$n"',
      '',
      'read -r n',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r action onglet',
      '  case "$action" in',
      '    roles|groupes) attendu="tableaudebord" ;;',
      '    renommer|carte|bureau) attendu="serveurlocal" ;;',
      '    erreurs) attendu="notifications" ;;',
      '    parefeu) attendu="outils" ;;',
      '  esac',
      '  if [ "$onglet" = "$attendu" ]; then',
      '    echo "$action : OK"',
      '  else',
      '    echo "$action : KO ($attendu attendu)"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "erreurs : $e/$n"',
      '',
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r poste ram disque',
      '  if [ "$ram" -ge 2 ] &amp;&amp; [ "$disque" -ge 60 ]; then',
      '    echo "$poste : installable"',
      '    ok=$((ok + 1))',
      '  else',
      '    echo "$poste : a renforcer"',
      '  fi',
      'done',
      'echo "installables : $ok/$n"'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Lit 3 lignes « profil etat » (domaine/prive/public) et compte les profils encore actifs du pare-feu.',
      'Lit n lignes « contexte identite machine » et forme la syntaxe de session (locale, NETBIOS, UPN).',
      'Lit n lignes « objet uo » et compte les objets de chaque unité d’organisation dans l’ordre d’apparition.',
      'Lit n lignes « utilisateur identifiant changement » et classe UPN/domaine plus compteur d’init-mdp.'
    ], [
      'ok=0',
      'for ((i=1; i&lt;=3; i++)); do',
      '  read -r profil etat',
      '  if [ "$etat" = "actif" ]; then',
      '    echo "$profil : a desactiver"',
      '    ok=$((ok + 1))',
      '  else',
      '    echo "$profil : ok"',
      '  fi',
      'done',
      'echo "a desactiver : $ok/3"',
      '',
      'read -r n',
      "sep='\\'",
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r contexte identite machine',
      '  case "$contexte" in',
      '    locale|domaine-netbios) echo "$contexte : $machine$sep$identite" ;;',
      '    domaine-upn) echo "$contexte : $identite@$machine" ;;',
      '  esac',
      'done',
      '',
      'read -r n',
      'declare -A compte',
      'declare -A ordre',
      'g=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r objet uo',
      '  if [ -z "\\${compte[$uo]+x}" ]; then',
      '    ordre[$g]=$uo',
      '    g=$((g + 1))',
      '  fi',
      '  compte[$uo]=$((\\${compte[$uo]:-0} + 1))',
      'done',
      'for ((i=0; i&lt;g; i++)); do',
      '  uo=\\${ordre[$i]}',
      '  echo "$uo : \\${compte[$uo]} objets"',
      'done',
      '',
      'read -r n',
      'upn=0',
      'init=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r utilisateur identifiant changement',
      '  case "$identifiant" in',
      '    *@*) echo "$utilisateur : upn-valide" ; upn=$((upn + 1)) ;;',
      '    *) echo "$utilisateur : forme-domaine" ;;',
      '  esac',
      '  if [ "$changement" = "oui" ]; then',
      '    echo "$utilisateur : init-mdp"',
      '    init=$((init + 1))',
      '  fi',
      'done',
      'echo "upn : $upn/$n"',
      'echo "a-initialiser : $init"'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Lit n lignes « domaine parent » et classe racines/enfants d’une arborescence, puis les deux bilans.',
      'Lit n lignes « info statut » et signale les informations AD requises manquantes, puis le verdict.',
      'Lit n lignes « domaine niveau longueur » et contrôle niveau fonctionnel + mot de passe DSRM.',
      'Lit g lignes « groupe type etendue » puis n lignes « poste dns » et produit les deux bilans (droits, jointures).'
    ], [
      'read -r n',
      'r=0',
      'e=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r domaine parent',
      '  if [ "$parent" = "-" ]; then',
      '    echo "$domaine : racine"',
      '    r=$((r + 1))',
      '  else',
      '    echo "$domaine : enfant de $parent"',
      '    e=$((e + 1))',
      '  fi',
      'done',
      'echo "racines : $r"',
      'echo "enfants : $e"',
      '',
      'read -r n',
      'b=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r info statut',
      '  case "$info" in',
      '    dns|netbios|niveau|dnsrole|ntds|sysvol|restauration)',
      '      if [ "$statut" = "manquant" ]; then',
      '        echo "$info : bloquante"',
      '        b=$((b + 1))',
      '      else',
      '        echo "$info : prete"',
      '      fi',
      '      ;;',
      '    *) echo "$info : ignoree" ;;',
      '  esac',
      'done',
      'echo "bloquantes : $b"',
      '[ "$b" -eq 0 ] &amp;&amp; echo "configuration possible"',
      '',
      'read -r n',
      'ok=0',
      'for ((k=0; k&lt;n; k++)); do',
      '  read -r domaine niveau longueur',
      '  if [ "$niveau" != "2012R2" ] &amp;&amp; [ "$longueur" -lt 12 ]; then',
      '    echo "$domaine : a revoir (les-deux)"',
      '  elif [ "$niveau" != "2012R2" ]; then',
      '    echo "$domaine : a revoir (niveau)"',
      '  elif [ "$longueur" -lt 12 ]; then',
      '    echo "$domaine : a revoir (mdp)"',
      '  else',
      '    echo "$domaine : conforme"',
      '    ok=$((ok + 1))',
      '  fi',
      'done',
      'echo "conformes : $ok/$n"',
      '',
      'read -r g',
      'droits=0',
      'for ((i=0; i&lt;g; i++)); do',
      '  read -r groupe type etendue',
      '  if [ "$type" = "securite" ]; then',
      '    echo "$groupe : droits"',
      '    droits=$((droits + 1))',
      '  else',
      '    echo "$groupe : diffusion"',
      '  fi',
      'done',
      'read -r n',
      'j=0',
      'for ((i=0; i&lt;n; i++)); do',
      '  read -r poste dns',
      '  if [ "$dns" = "ad-dns" ]; then',
      '    echo "$poste : joint"',
      '    j=$((j + 1))',
      '  else',
      '    echo "$poste : dns a corriger"',
      '  fi',
      'done',
      'echo "groupes-droits : $droits"',
      'echo "jointures : $j/$n"'
    ].join('\n')),

    '  <h2>Projet intégrateur — « la mise en service d’un domaine »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Le script reçoit le journal de mise en service. D’abord <code>n</code> lignes <code>machine ' +
      'config</code> où config est une suite de lettres sans espace — <code>f</code> = pare-feu traité sur ' +
      'les trois profils, <code>i</code> = IP statique validée, <code>a</code> = activation faite, ' +
      '<code>d</code> = DNS pointé vers le domaine, le tiret <code>-</code> = étape non faite. Puis ' +
      '<code>m</code> lignes <code>objet classe</code> (utilisateur/ordinateur/groupe) à créer dans le ' +
      'domaine. Il affiche pour chaque machine <code>machine : prete</code> si les quatre lettres sont ' +
      'présentes, sinon <code>machine : a corriger (manque X)</code> avec la première lettre manquante dans ' +
      'l’ordre f, i, a, d ; pour chaque objet <code>objet : classe-valide</code> si la classe est l’une des ' +
      'trois attendues, sinon <code>objet : classe-inconnue</code> ; enfin le verdict : ' +
      '<code>domaine en service</code> si toutes les machines sont prêtes ET qu’il y a au moins un ' +
      'utilisateur, <code>domaine a finir</code> si les machines sont prêtes sans utilisateur, ' +
      '<code>domaine bloque</code> sinon.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> les deux blocs sans mélanger machines et objets.</li>',
      '      <li><strong>Auditer</strong> chaque machine : première étape manquante dans l’ordre f, i, a, d.</li>',
      '      <li><strong>Valider</strong> les classes d’objets et repérer le premier utilisateur.</li>',
      '      <li><strong>Verdict</strong> final au format exact du cahier des charges.</li>',
      '    </ol>',
      '    <p>Contraintes : parsing lettre à lettre, premier manque dans l’ordre, bilan après lecture complète.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture des deux blocs et parsing correct <strong>20</strong>' },
        { cls: '', text: 'Audit des machines (premier manque) <strong>20</strong>' },
        { cls: '', text: 'Validation des objets et détection d’un utilisateur <strong>20</strong>' },
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
    '  read -r machine config',
    '  f=0 ; i=0 ; a=0 ; d=0',
    '  if [ "$config" != "-" ]; then',
    '    for ((j=0; j&lt;${#config}; j++)); do',
    '      lettre=${config:$j:1}',
    '      case "$lettre" in',
    '        f) f=1 ;;',
    '        i) i=1 ;;',
    '        a) a=1 ;;',
    '        d) d=1 ;;',
    '      esac',
    '    done',
    '  fi',
    '  if [ "$f" = "1" ] &amp;&amp; [ "$i" = "1" ] &amp;&amp; [ "$a" = "1" ] &amp;&amp; [ "$d" = "1" ]; then',
    '    echo "$machine : prete"',
    '  elif [ "$f" = "0" ]; then',
    '    echo "$machine : a corriger (manque f)" ; toutes_ok=0',
    '  elif [ "$i" = "0" ]; then',
    '    echo "$machine : a corriger (manque i)" ; toutes_ok=0',
    '  elif [ "$a" = "0" ]; then',
    '    echo "$machine : a corriger (manque a)" ; toutes_ok=0',
    '  else',
    '    echo "$machine : a corriger (manque d)" ; toutes_ok=0',
    '  fi',
    'done',
    'read -r m',
    'objets_ok=1',
    'a_un_utilisateur=0',
    'for ((k=0; k&lt;m; k++)); do',
    '  read -r objet classe',
    '  case "$classe" in',
    '    utilisateur)',
    '      echo "$objet : classe-valide"',
    '      a_un_utilisateur=1',
    '      ;;',
    '    ordinateur|groupe)',
    '      echo "$objet : classe-valide"',
    '      ;;',
    '    *)',
    '      echo "$objet : classe-inconnue"',
    '      objets_ok=0',
    '      ;;',
    '  esac',
    'done',
    'if [ "$toutes_ok" = "1" ] &amp;&amp; [ "$a_un_utilisateur" = "1" ]; then',
    '  echo "verdict : domaine en service"',
    'elif [ "$toutes_ok" = "1" ]; then',
    '  echo "verdict : domaine a finir"',
    'else',
    '  echo "verdict : domaine bloque"',
    'fi'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine parsing lettre à lettre, premier manque dans l’ordre, validation des ' +
    'objets et verdict global — les chapitres 3, 5 et 6 en un seul script.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits d’après les supports « Base de l’Administration Windows » (IT_B1A et IT_B1B) du Dr Abasse KPEGOUNI. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours B1 : études de cas graduées et mise en service d’un domaine.',
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
        ' Théorie, exemples détaillés, études de cas interactives, QCM corrigés.',
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
