/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Linux Avancé B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('terminal') + ' Niveau B3 • Ingénierie Système Linux, Noyau, Systemd, Cgroups v2 &amp; Sécurité</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire Linux Avancé</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules fondamentaux</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs complets</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Ingénierie Système &amp; Philosophie de Linux Avancé en Troisième Année</h2>',
    box('standard', 'De l’Administration Système au Cœur du Noyau Linux et des Conteneurs', [
      '<p>En troisième année de Bachelor en Ingénierie Informatique, Linux dépasse largement l’utilisation des commandes usuelles (<code>ls</code>, <code>grep</code>, <code>tar</code>). L’ingénieur système, DevOps ou SRE doit comprendre comment le système d’exploitation dialogue intimement avec le matériel et orchestre les processus à l’échelle industrielle.</p>',
      '<p>Ce cours approfondit l’intégralité des mécanismes avancés du système d’exploitation GNU/Linux : ' +
      'les pseudo-systèmes de fichiers <code>/proc</code> et <code>/sys</code>, l’espace d’adressage virtuel et les appels système (syscalls) sous <code>strace</code>, ' +
      'l’architecture de <code>systemd</code> (PID 1), l’ordonnancement des dépendances de services et le journal binaire <code>journald</code>, ' +
      'la gestion avancée du stockage (LVM, Physical Extents, snapshots COW, RAID logiciel <code>mdadm</code> et saturation des tables d’inodes), ' +
      'les fondements de la conteneurisation moderne par l’isolation des huit Namespaces et le contrôle unifié des ressources avec Cgroups v2, ' +
      'le réseau avancé Linux (paires veth, bridges logiciels et Policy-Based Routing multi-tables via <code>ip rule</code>), ' +
      'et enfin le durcissement sécuritaire du noyau (paramètres <code>sysctl</code>, modules d’authentification PAM et traçabilité continue avec <code>auditd</code>).</p>'
    ]),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Noyau Linux, Systemd, Cgroups v2 &amp; Sécurité B3',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const rows = chapterList.map(ch => [
    '    <tr>',
    '      <td><strong>Module ' + ch.n + '</strong></td>',
    '      <td><a href="chapitres/chapitre' + ch.n + '.html"><strong>' + ch.title + '</strong></a></td>',
    '      <td>' + ch.toc + '</td>',
    '      <td><span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span></td>',
    '    </tr>'
  ].join('\n')).join('\n');

  const body = [
    '  <h1>Sommaire &amp; Plan d’Études — ' + course.brand + '</h1>',
    '  <p class="lead">Programme détaillé des 6 modules de spécialisation en interne noyau Linux, gestion Systemd, stockage LVM/RAID, conteneurisation Namespaces/Cgroups v2 et durcissement de sécurité.</p>',
    '',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:12%">Module</th>',
    '        <th style="width:30%">Titre du cours</th>',
    '        <th style="width:43%">Programme &amp; Notions clés</th>',
    '        <th style="width:15%">Statut</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    rows,
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>Ressources transversales &amp; Outils de révision</h2>',
    '  <div class="grid grid--3">',
    '    <div class="card">',
    '      <h3>' + ic('terminal') + ' Laboratoire Interactif</h3>',
    '      <p>Console Python 3 avec éditeur intégré pour simuler les métriques du noyau, valider les unités Systemd et auditer les quotas Cgroups v2.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir le lab</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('file') + ' Cartes &amp; Syntaxes</h3>',
    '      <p>Toutes les commandes d’administration avancée, structures d’inodes, directives Systemd et matrices PAM regroupées en aide-mémoire.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">Consulter les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('award') + ' Examens &amp; Annales</h3>',
    '      <p>Deux sujets d’examen complets corrigés avec barème détaillé pour valider les compétences en ingénierie système Linux de niveau B3.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Noyau Linux, /proc &amp; Syscalls', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules d’ingénierie Linux Avancé B3.',
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
    { label: 'Laboratoire Linux libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Linux Avancé</h1>',
    '  <p class="lead">Expérimentez et automatisez vos outils d’ingénierie système selon les grilles d’analyse : analyse de métriques /proc, simulation de Cgroups v2, audit de politiques de routage et décodage de journaux auditd.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="shell"',
    '       data-height="420"',
    '       data-stdin="PROC_INFO pid=1\nname=systemd">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\'analyse et cas d\'application.\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur d’OOM Killer &amp; oom_score_adj</h4>',
    '      <p>Implémentez l’algorithme de calcul du score de sacrifice du noyau Linux et testez l’immunité des processus système critiques.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Vérificateur de chaînes PAM</h4>',
    '      <p>Construisez une machine à états finis simulant la traversée des modules PAM avec les drapeaux required, requisite et sufficient.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire Linux libre — ' + course.brand,
      description: 'Bac à sable interactif par cas d’application pour tester vos algorithmes d’ingénierie système Linux.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
