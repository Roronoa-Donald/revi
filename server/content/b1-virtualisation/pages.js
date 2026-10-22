/**
 * Pages transverses du cours « Virtualisation des serveurs » B1, construites
 * sur le support B1 du module (l'histoire « Le serveur fainéant et les
 * machines ambitieuses ») : accueil, sommaire, atelier, cartes, mémo, examens
 * blancs, exercices. Les chapitres sont composés par `kit.chapter` à partir
 * des données de `chapitres-1-3.js` / `4-6.js`.
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
    '    <span class="tag tag--time">Virtualisation</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>mesurer le gaspillage d’un parc : heures perdues, fainéants, facture d’électricité ;</li>',
      '      <li>expliquer la virtualisation : plusieurs machines, un seul serveur, ressources partagées ;</li>',
      '      <li>allouer sans dépasser : mémoire, processeur, disque — « que ce dont on a besoin » ;</li>',
      '      <li>inventorier les services virtualisés et surveiller leur charge ;</li>',
      '      <li>chiffrer la rentabilisation : réveil, plafond de consolidation, placement des VM ;</li>',
      '      <li>éviter la surcharge : seuil de saturation, symptômes 90/90/500, déplacement de VM ;</li>',
      '      <li>convaincre : pitch en quatre étapes, plan de réveil v/e/s, verdict en trois états.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Le support du module est une histoire — « Le serveur fainéant et les machines ambitieuses » — ' +
      'accompagnée de trois séries de questions : compréhension, analyse technique, réflexion. Ce cours la ' +
      'prend au mot et fait appliquer chaque règle <strong>dans des études de cas</strong> : le seuil des 48 minutes, le ' +
      'partage mémoire/processeur/disque, l’allocation sans dépasser la capacité, l’inventaire et la charge ' +
      'des services, le plafond de la consolidation, la saturation et ses symptômes, le pitch final.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : vous écrivez vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que vous ne voyez pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les questions du support.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo Virtualisation</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Virtualisation des serveurs B1 | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du serveur fainéant jusqu’au plan de réveil. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur (et un ' +
    'abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas méthodologiques</strong> à écrire et à exécuter ' +
    'dans la page : votre script est réellement lancé, puis corrigé par des tests que vous ne voyez pas. ' +
    'L’<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Virtualisation</span><br><span class="toc__d">Constat 48/2/80, partage des ressources, saturation, symptômes, consolidation, pitch.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : le réveil d’un parc entier.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Résoudre et valider des études de cas directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours « Virtualisation des serveurs » B1 : ' + chapterList.length +
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
    '  <p class="lead">Un éditeur interactif dans la page pour résoudre les études de cas. Complétez la grille d’analyse, validez-la et observez le résultat : c’est ici qu’une règle de l’histoire devient un contrôle automatisé.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Valider</strong> vérifie la conformité de vos réponses dans la grille d’analyse.</li>',
      '      <li><strong>Données du cas</strong> contient les paramètres soumis à l’étude.</li>',
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
      '  <script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie du cours.\n# Rédigez votre analyse sous forme de grille structurée.\n\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — jauge du serveur fainéant</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Grille d’analyse</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prenez une règle de ' +
      'l’histoire (seuil des 48 minutes, allocation mémoire/disque, saturation, symptômes de surcharge), ' +
      'programmez-la et testez-la sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé rejoue le constat : 80 % d’une heure = 48 minutes creuses, l’heure est ' +
      'perdue. Transforme-le : fais-le dire le taux d’inactivité global en pourcentage, distingue les ' +
      'heures à 100 % de repos, ou remplace tout le script par la règle que vous voulez vérifier.</p>',
      '      <p>Dans un vrai parc, ce contrôle tourne en continu sur les métriques du matériel : la ' +
      'structure du script — lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Cas d’exemple</b><pre>3',
      '08h 55',
      '09h 40',
      '10h 12</pre></div>',
      '      <div class="lab__sample-part"><b>Résolution attendue</b><pre>08h : perdue',
      '09h : utile',
      '10h : utile',
      'heures perdues : 1/3</pre></div>',
      '    </div>',
      '    <p class="lab__note">Trois lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>Du script à la vraie console</h2>',
    '  <p>La simulation a une limite assumée : aucune machine virtuelle ne démarre ici et aucun hyperviseur ' +
    'n’est installé — le serveur reste du texte structuré. Elle a une force : <strong>toute la logique se ' +
    'vérifie sans risque</strong> — on peut rejouer une allocation, une saturation ou un plan de ' +
    'consolidation autant de fois que nécessaire. Quand le script reproduit les bons réflexes — lire, ' +
    'décider, rapporter — le passage à un vrai hyperviseur est mécanique.</p>',
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
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois études de cas corrigées ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que la règle est vraiment acquise.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Le serveur fainéant' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — Virtualisation | ' + course.brand,
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
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo Virtualisation' })
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
    '  <h1>Mémo Virtualisation</h1>',
    '  <p class="lead">Les règles de l’histoire sur une page, dans l’ordre du cours. À garder ouvert ' +
    'pendant les exercices et l’atelier.</p>',

    bloc('Le constat : le serveur fainéant', [
      '<pre><code>histoire : 1 serveur puissant, 1 systeme, 1 service\n',
      '  80% du temps a ne rien faire, electricite pour rien\n',
      '\n',
      'nombres du constat : 48 min (80% d une heure) /\n',
      '  2 services (seuil du faineant) / 80% du cout\n',
      'heure perdue : inactif &gt;= 48 min\n',
      'faineant : moins de 2 services hébergés\n',
      'energie : W * heures / 1000 = kWh ; x prix = facture</code></pre>',
      '<p>Un constat chiffré convainc ; une impression ne convainc personne.</p>'
    ].join('\n')),

    bloc('La virtualisation : le partage', [
      '<pre><code>idee de l ingenieur : plusieurs machines sur un seul\n',
      '  serveur physique, ressources partagées\n',
      '\n',
      'ressources partagées : mémoire / processeur / disque\n',
      'regle des VM : « on ne prendra chacun que ce dont on\n',
      '  a besoin »\n',
      'allocation : controler les DEUX restes (ram + disque)\n',
      '  avant d allouer ; refusee = rien n est consommé\n',
      'conversation : idee → colere → partage → acceptation</code></pre>',
      '<p>Contrôler d’abord, allouer ensuite : la promesse se tient par le calcul.</p>'
    ].join('\n')),

    bloc('Les services virtualisés', [
      '<pre><code>4 services de la fin de l histoire :\n',
      '  base de donnees → donnees\n',
      '  site web        → publication\n',
      '  pare-feu        → protection\n',
      '  serveur de test → recette\n',
      '\n',
      'inventaire : comptage par service, ordre d apparition\n',
      'charge : somme des charges des VM du service\n',
      '  au-dela de 70% cumules → a surveiller\n',
      'maximum : mise a jour en STRICTEMENT superieur\n',
      '  (a egalite, le premier arrivé garde le titre)</code></pre>',
      '<p>Un parc se lit : inventaire d’abord, charge ensuite.</p>'
    ].join('\n')),

    bloc('Rentabilisation et consolidation', [
      '<pre><code>reveil d un serveur : avant &lt; 30% ET apres &gt;= 80%\n',
      '  sinon : en progres (apres &gt; avant) / insuffisant\n',
      '\n',
      'nb de VM : PLAFOND de (cout total / cout d une VM)\n',
      '  = division entiere + 1 si reste non nul\n',
      'economie : cout parc physique - cout parc virtualise\n',
      'placement : premier hote suffisant, ordre du fichier\n',
      '  VM sans place = rien n est décompté\n',
      'hote a 0 restant = rentabilise a 100%</code></pre>',
      '<p>2,5 VM font 3 : le plafond, pas l’arrondi au plus proche.</p>'
    ].join('\n')),

    bloc('Surcharge et vigilance', [
      '<pre><code>regle anti-saturation : controler AVANT d ajouter\n',
      '  total + charge &gt; capacite → refusee (saturation)\n',
      'serveur plein : total == capacite exactement\n',
      '\n',
      'symptomes (dans l ordre) : cpu &gt; 90% / ram &gt; 90% /\n',
      '  reponses &gt; 500 ms ; plusieurs a la fois = multiple\n',
      'action de secours : deplacer une VM vers un hote\n',
      '  moins chargé (le privilège de la virtualisation)</code></pre>',
      '<p>Un refus vaut mieux qu’une saturation : on déménage, on ne noie pas.</p>'
    ].join('\n')),

    bloc('L’argumentaire final', [
      '<pre><code>pitch en 4 etapes (l ordre de l histoire) :\n',
      '  1 constat → gaspillage\n',
      '  2 idee     → virtualisation\n',
      '  3 preuve   → rentabilisation\n',
      '  4 verdict  → parc plein\n',
      '\n',
      'bilan avant/apres : reveilles + moyenne avant +\n',
      '  moyenne apres (divisions entieres)\n',
      'plan de reveil : v = virtualisable / e = econome\n',
      '  (&lt; 30%) / s = sûr (sauvegardes) ; premiere lettre\n',
      '  manquante = prochaine action\n',
      'verdict : plan pret / a ajuster (charge &gt; 200) /\n',
      '  impossible (un serveur bloque)</code></pre>',
      '<p>La morale de l’histoire : « il se plaignait quand même un peu » — la vigilance ne s’arrête jamais.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre puissance (W) et énergie (kWh) dans la facture.</li>',
      '    <li>Décompter les ressources d’une VM refusée : le contrôle précède l’allocation.</li>',
      '    <li>Trier l’inventaire alphabétiquement au lieu de l’ordre d’apparition.</li>',
      '    <li>Maximum non strict : à égalité, le premier arrivé doit gagner.</li>',
      '    <li>Arrondir 2,5 VM à 2 : c’est le plafond qui fait foi.</li>',
      '    <li>Tester la saturation après l’ajout : toujours avant.</li>',
      '    <li>Négliger un symptôme unique : un seul dépassement fait déjà une surcharge.</li>',
      '    <li>Annoncer le verdict avant le constat dans le pitch.</li>',
      '    <li>Dire « à étudier » sans la lettre manquante du plan v/e/s.</li>',
      '    <li>Oublier la charge des VM dans le plan final.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo Virtualisation — ' + course.brand,
      description: 'Mémo du cours B1 : constat, partage des ressources, services, consolidation, ' +
        'surcharge et argumentaire sur une page.',
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
      intro: 'Sujet type épreuve — constat, virtualisation, services.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Constat',
          text: 'Raconter la situation de départ de l’histoire. Calculer : un serveur de 500 W qui tourne 720 h par mois, à 100 FCFA le kWh. Combien coûtent ses heures creuses si 80 % du temps est inactif ?',
          sol: 'Un serveur puissant qui héberge un seul système et un seul service, 80 % du temps à ne rien faire — de l’électricité pour rien. Énergie : <strong>500 × 720 / 1000 = 360 kWh</strong>, soit <strong>36 000 FCFA</strong>. Heures creuses : <strong>80 % de 36 000 = 28 800 FCFA</strong> pour rien.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Virtualisation',
          text: 'Définir la virtualisation selon l’histoire. Citer les trois ressources partagées et la règle d’allocation des VM.',
          sol: '<strong>Faire croire au serveur qu’il héberge plusieurs machines</strong> — des VM qui partagent ses ressources. Ressources : <strong>mémoire, processeur, disque</strong>. Règle : « <strong>on ne prendra chacun que ce dont on a besoin</strong> » — contrôler les deux restes avant d’allouer, un refus ne consomme rien.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Allocation',
          text: 'Serveur 64 Go / 500 Go. Allouer : web (16/50), base (32/200), test (32/400). Que reste-t-il ?',
          sol: 'Web : <strong>allouée</strong> (reste 48/450). Base : <strong>allouée</strong> (reste 16/250). Test : <strong>refusée</strong> — 32 &gt; 16 et 400 &gt; 250, rien n’est décompté. Reste final : <strong>16 Go / 250 Go</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Services',
          text: 'Citer les quatre services de la fin de l’histoire et leur catégorie. Un service cumule 75 % de charge : que fait-on ?',
          sol: '<strong>Base de données</strong> (données), <strong>site web</strong> (publication), <strong>pare-feu virtuel</strong> (protection), <strong>serveur de test</strong> (recette). À 75 % cumulés (&gt; 70) : le service est <strong>à surveiller</strong> — la marge s’amincit.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté consolidation, surcharge et argumentaire.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Consolidation',
          text: 'Un parc coûte 200 000 FCFA/mois, une VM coûte 80 000 FCFA. Combien de VM, quel coût, quelle économie ?',
          sol: '<strong>Plafond</strong> de 200 000 / 80 000 = 2,5 → <strong>3 VM</strong>, soit 240 000 FCFA. Économie : <strong>−40 000 FCFA (−20 %)</strong>. La consolidation peut coûter plus cher : l’arithmétique tranche sans complaisance.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Saturation',
          text: 'Capacité 100. VM : a (40), b (40), c (30). Verdicts ? Quand parle-t-on de « serveur plein » ?',
          sol : 'a : <strong>hébergée</strong> (total 40) ; b : <strong>hébergée</strong> (total 80) ; c : <strong>refusée</strong> — 80 + 30 &gt; 100, sa charge n’est pas comptée. Serveur plein : quand la charge totale atteint <strong>exactement</strong> la capacité (ex. 50 + 50).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Symptômes',
          text: 'Serveur : CPU 95 %, RAM 95 %, réponses 100 ms. Quels symptômes, quel cas, quelle action ?',
          sol : 'CPU &gt; 90 <strong>et</strong> RAM &gt; 90 : deux symptômes → cas <strong>multiple</strong> (saturation globale en cours). Action : <strong>déplacer une VM</strong> vers un hôte moins chargé — service continu, utilisateur non impacté.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Argumentaire',
          text: 'Dérouler le pitch en quatre étapes. Un serveur est virtualisable mais non économe : que dit le plan ?',
          sol : '1 <strong>Constat</strong> (gaspillage) → 2 <strong>Idée</strong> (virtualisation) → 3 <strong>Preuve</strong> (rentabilisation) → 4 <strong>Verdict</strong> (parc plein). Lettres v/e/s : il a v mais pas e → « <strong>à étudier (manque e)</strong> » — la prochaine action est de mesurer son utilisation.'
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
    { stem: 'Le seuil de l’heure perdue :', opts: ['48 minutes d’inactivité', '30 minutes', '60 minutes'], correct: 0, exp: '80 % d’une heure = 48 minutes creuses.' },
    { stem: 'Un serveur fainéant héberge…', opts: ['moins de 2 services', 'plus de 5 services', 'aucun service'], correct: 0, exp: 'Un seul système, un seul service : le profil du fainéant.' },
    { stem: 'Les ressources partagées de l’histoire :', opts: ['mémoire, processeur, disque', 'clavier, écran, souris', 'seulement le réseau'], correct: 0, exp: '« Votre mémoire, votre processeur et même votre disque dur ».' },
    { stem: 'Une VM refusée consomme…', opts: ['rien', 'la moitié', 'tout'], correct: 0, exp: 'Le contrôle précède l’allocation : rien n’est décompté.' },
    { stem: '2,5 VM se comptent…', opts: ['3 (plafond)', '2 (arrondi bas)', '2,5'], correct: 0, exp: 'Plafond de la division : on ne loue pas une demi-machine.' },
    { stem: 'Le placement des VM suit…', opts: ['le premier hôte suffisant', 'l’hôte le plus rapide', 'l’ordre alphabétique'], correct: 0, exp: 'Les hôtes sont pris dans l’ordre du fichier, premier dont la capacité suffit.' },
    { stem: 'Un serveur est « plein » quand…', opts: ['charge totale = capacité exactement', 'il s’éteint', 'charge = 0'], correct: 0, exp: 'Égalité exacte : hébergeable mais plus rien ne peut s’ajouter.' },
    { stem: 'Les seuils d’alerte :', opts: ['CPU 90 %, RAM 90 %, 500 ms', 'CPU 50 %, RAM 50 %, 100 ms', 'CPU 99 %, RAM 99 %, 1 s'], correct: 0, exp: 'Dans l’ordre de détection : cpu, ram, réponses.' },
    { stem: 'L’action de secours en surcharge :', opts: ['déplacer une VM', 'éteindre le serveur', 'supprimer les sauvegardes'], correct: 0, exp: 'La VM rejoint un hôte qui dort : le privilège de la virtualisation.' },
    { stem: 'L’ordre du pitch :', opts: ['constat, idée, preuve, verdict', 'idée, verdict, preuve, constat', 'preuve, constat, idée, verdict'], correct: 0, exp: 'L’ordre de l’histoire elle-même.' }
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
      '<strong>Réservez 15 min de relecture</strong> : nombres du constat, règle d’allocation, plafond de ' +
      'consolidation, seuils de surcharge, ordre du pitch.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible la consolidation et l’argumentaire.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d’après le support « Le serveur fainéant et les machines ambitieuses — histoire » et ses questions de compréhension, d’analyse et de réflexion. ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours B1 : sujets chronométrés sur le constat, le partage des ' +
        'ressources, la consolidation, la surcharge et l’argumentaire.',
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
    '    <details><summary>Corrections &amp; dimensionnements de virtualisation</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de consolidation et d’architecture de virtualisation.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer les hyperviseurs de Type 1 (Bare-Metal : ESXi, Proxmox VE, KVM) et de Type 2 (Hosted : VirtualBox, VMware Workstation).',
      'Identifier les composants émulés d’une machine virtuelle (vCPU, vRAM, contrôleurs de disque virtuel, cartes vNIC).',
      'Distinguer les formats de disques virtuels courants (VMDK, VHDX, QCOW2) et l’allocation dynamique (thin) vs statique (thick).',
      'Expliciter le rôle des pilotes invités paravirtualisés (VMware Tools, QEMU Guest Agent).'
    ], [
      '<p><strong>1. Hyperviseurs :</strong> Le Type 1 s’exécute directement sur le matériel physique pour des performances optimales ; le Type 2 s’exécute au-dessus d’un système d’exploitation hôte.</p>',
      '<p><strong>2. Composants VM :</strong> L’hyperviseur intercepte et planifie l’accès aux ressources matérielles réelles de manière totalement isolée pour chaque VM.</p>',
      '<p><strong>3. Provisioning disque :</strong> Thin provisioning n’alloue que l’espace réellement écrit par le système invité ; Thick réserve immédiatement la taille totale sur le stockage.</p>',
      '<p><strong>4. Outils invités :</strong> Permettent la paravirtualisation (accès direct sans émulation lourde), la synchronisation horaire et l’arrêt propre de l’OS invité.</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calculer les ratios de surallocation (overcommit) de vCPU et de RAM recommandés en production.',
      'Comparer les modes de réseau virtuel : Accès par pont (Bridge), NAT et Réseau privé hôte (Host-Only).',
      'Distinguer un instantané de machine virtuelle (snapshot - mémoire et delta de disques) d’une véritable sauvegarde.',
      'Analyser le fonctionnement de la migration à chaud de machines virtuelles (vMotion / Live Migration sans interruption).'
    ], [
      '<p><strong>1. Surallocation :</strong> Ratio vCPU:pCPU usuel de 3:1 à 5:1 selon la charge ; overcommit RAM déconseillé ou très limité pour éviter le swap de l’hyperviseur.</p>',
      '<p><strong>2. Réseau VM :</strong> Le Bridge intègre la VM directement au LAN physique avec sa propre IP ; le NAT partage l’adresse de l’hôte physique.</p>',
      '<p><strong>3. Snapshots :</strong> Un snapshot fige l’état pour un retour arrière rapide avant mise à jour mais dégrade les performances disque et ne protège pas contre une panne matérielle.</p>',
      '<p><strong>4. Migration à chaud :</strong> Pré-copie itérative de la RAM de la VM vers l’hôte cible pendant que la VM tourne, bascule finale en quelques millisecondes.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Dimensionner le stockage partagé (SAN iSCSI / NFS) d’un cluster de virtualisation haute disponibilité (HA).',
      'Concevoir une politique de tolérance aux pannes garantissant le redémarrage automatique des VMs en cas de crash d’un nœud.',
      'Distinguer les machines virtuelles complètes des conteneurs applicatifs légers (Docker / LXC).',
      'Établir le plan de reprise d’activité (PRA) basé sur la réplication périodique des disques virtuels sur site secondaire.'
    ], [
      '<p><strong>1. Stockage partagé :</strong> Indispensable pour la haute disponibilité : les banques de données doivent être accessibles simultanément par tous les serveurs du cluster.</p>',
      '<p><strong>2. Haute disponibilité (HA) :</strong> Un mécanisme de heartbeat détecte la défaillance d’un nœud physique et déclenche le redémarrage des VMs sur les hôtes survivants.</p>',
      '<p><strong>3. VM vs Conteneur :</strong> La VM virtualise tout le matériel et intègre son propre noyau d’OS ; le conteneur partage le noyau de l’hôte pour une densité et un démarrage instantané.</p>',
      '<p><strong>4. Réplication PRA :</strong> Synchronisation asynchrone des deltas de blocs vers un second cluster pour un RPO (perte de données) et un RTO (délai de redémarrage) maîtrisés.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Consolidation &amp; Architecture de Virtualisation</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’ingénierie système consiste à concevoir le projet de consolidation d’un parc de 30 serveurs physiques obsolètes vers une infrastructure de virtualisation redondée : dimensionnement matériel, réseau virtuel, stockage partagé et politique de sauvegarde.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences de virtualisation évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Dimensionnement des hyperviseurs :</strong> Bilan consolidé des cœurs CPU, de la RAM et de la bande passante réseau.</li>',
      '      <li><strong>Sécurité &amp; segmentation :</strong> Séparation des flux de management, de vMotion, de stockage et du trafic applicatif via VLANs.</li>',
      '      <li><strong>Planification de la haute disponibilité :</strong> Règle de dimensionnement N+1 pour supporter la panne d’un hyperviseur.</li>',
      '      <li><strong>Stratégie de sauvegarde :</strong> Intégration de sauvegardes dédupliquées complètes et incrémentales.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de virtualisation des systèmes B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de virtualisation B1 : hyperviseurs Type 1, stockage partagé, HA et consolidation.',
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
