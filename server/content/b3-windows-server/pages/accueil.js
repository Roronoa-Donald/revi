/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Windows Server B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <span class="card__link">Étudier le module ' + ic('arrow-right') + '</span>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    '  <header class="hero">',
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('cpu') + ' Niveau B3 • Ingénierie Windows Server, Active Directory DS, GPO, Hyper-V &amp; Haute Disponibilité</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire Système Interactif</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules approfondis</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d’ingénierie</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Ingénierie des Systèmes Windows &amp; Infrastructure d’Entreprise en Troisième Année</h2>',
    box('standard', 'De l’Administration Quotidienne aux Architectures Réseau Hautement Résilientes', [
      '<p>En troisième année de Bachelor en Ingénierie Réseaux et Systèmes d’Information, l’administration sous Windows Server dépasse très largement la simple manipulation de consoles graphiques ou la création basique d’utilisateurs. L’ingénieur système d’entreprise doit maîtriser l’architecture profonde du système d’exploitation (Kernel NT, HAL, sous-systèmes Win32), concevoir des services réseau d’infrastructure robustes (DHCP failover, DNS avec zones inverses et enregistrements SRV vitaux pour la découverte des services d’annuaire), et auditer le dimensionnement des licences par cœur physique Microsoft.</p>',
      '<p>Ce cours approfondit l’intégralité des standards de l’écosystème Microsoft d’entreprise : ' +
      'les services de domaine Active Directory (AD DS) avec topologie de forêt, arbres, réplication multi-maîtres et rôles FSMO, ' +
      'le modèle de gouvernance des identités et groupes AGDLP / AGUDLP couplé à l’audit des journaux de sécurité (Event IDs 4720, 4726, 4728), ' +
      'les stratégies de groupe (GPO) avec cycle de traitement strict LSDOU, résolution de conflits par Enforced et Block Inheritance, et filtrage fin WMI / ACL, ' +
      'la sécurité des services de fichiers combinant autorisations de partage SMB et permissions NTFS selon la règle du plus restrictif, ' +
      'la virtualisation d’entreprise Hyper-V avec commutateurs virtuels (External, Internal, Private), allocation de mémoire dynamique et gestion de disques différentiels VHDX, ' +
      'et enfin l’automatisation par scripts PowerShell 5.1/7, le clustering avec basculement (Failover Clustering avec quorum de majorité et témoin Witness) et les sauvegardes bare-metal VSS.</p>'
    ]),
    '',
    '  <h2>Ressources transversales</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h3>Cartes Mémos &amp; Flashcards</h3>',
    '      <p>36 fiches de mémorisation active couvrant l’ensemble des concepts clés : rôles FSMO, modèle AGDLP, LSDOU, NTFS/SMB, Hyper-V et PowerShell.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">Consulter les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Formules, Cmdlets &amp; Architectures</h3>',
    '      <p>Synthèse de référence : formules de licences par cœur, matrices de permissions, syntaxe PowerShell et tables de quorum.</p>',
    '      <a class="btn btn--sm" href="chapitres/formules.html">Ouvrir le mémento</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Examens Blancs d’Ingénierie</h3>',
    '      <p>Deux examens complets corrigés (Contrôle Continu et Examen Terminal) conçus selon les exigences de certification et d’évaluation B3.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">S’entraîner aux examens</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Catalogue des 18 Ateliers de Code</h3>',
    '      <p>Accédez directement aux 18 exercices pratiques de simulation et d’automatisation système en Python 3.</p>',
    '      <a class="btn btn--sm" href="chapitres/exercices.html">Voir les exercices</a>',
    '    </div>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Accueil',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Sommaire général' }
  ]);

  const listHtml = chapterList.map(chapitre => [
    '    <div class="card mb-2">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <span class="card__link"><a href="chapitres/chapitre' + chapitre.n + '.html">Accéder au cours ' + ic('arrow-right') + '</a></span>',
    '      </div>',
    '    </div>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Sommaire Général du Cours — ' + course.brand + '</h1>',
    '  <p class="lead">Programme officiel d’enseignement de niveau Bachelor 3 / Licence 3 IT structuré en 6 modules d’expertise, 18 laboratoires de code et 48 QCM d’évaluation.</p>',
    '',
    '  <div class="summary-list">' + listHtml + '</div>',
    '',
    '  <h2>Modules Complémentaires &amp; Évaluations</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h3>Laboratoire Interactif</h3>',
    '      <p>Espace bac à sable pour exécuter vos algorithmes de simulation réseau, sécurité AD, quorum et stockage.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir l’atelier</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Examens Blancs</h3>',
    '      <p>Deux sujets d’examen complets corrigés avec barème pour certifier vos compétences d’administrateur système Windows.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Architecture Système & Services d’Infrastructure Réseau', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de formation à Windows Server B3.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier Bac à Sable ======================== */

function atelier(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Sommaire', href: 'sommaire.html' },
    { label: 'Laboratoire Système libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Windows Server B3</h1>',
    '  <p class="lead">Expérimentez et validez vos scripts d’administration système et d’infrastructure en Python 3 : validation d’étendues DHCP, résolution DNS/SRV, simulation AGDLP, calcul de quorum et stockage résilient.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="CMD New-ADUser -Name Alice -SamAccountName asmith\nCMD Set-ADUser -Identity asmith\nCMD Get-ADGroup -Identity Domain_Admins">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos scripts d\'administration Windows Server et algorithmes d\'infrastructure en Python 3\nimport sys\n\ndef simuler_administration_windows_server(commandes):\n    """Simule l\'exécution de cmdlets et l\'audit d\'infrastructure Windows Server."""\n    resultats = []\n    for cmd in commandes:\n        resultats.append(f"EXEC_OK: {cmd}")\n    return resultats\n\nif __name__ == "__main__":\n    cmds = [l.strip() for l in sys.stdin if l.strip()]\n    for r in simuler_administration_windows_server(cmds):\n        print(r)\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur de Quorum de Cluster</h4>',
    '      <p>Modélisez le basculement de nœuds de cluster et observez le maintien ou la rupture du quorum selon l’état du témoin Witness.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Arbitrage de Permissions NTFS / Partage</h4>',
    '      <p>Testez des combinaisons complexes d’autorisations SMB et NTFS pour vérifier le droit d’accès réseau effectif résultant.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire Système libre — ' + course.brand,
      description: 'Bac à sable interactif en Python pour tester vos scripts d’administration et simulations Windows Server.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
