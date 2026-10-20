/**
 * Pages « accueil », « sommaire » et « atelier » du cours « CCNA Réseau B2 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</span>',
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('globe') + ' Niveau B2 • Architecture, Adressage IPv4, Commutation &amp; Routage CCNA</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Réseau</a>',
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
    '  <h2>Méthodologie pédagogique</h2>',
    box('standard', 'Maîtriser l’ingénierie des réseaux d’entreprise et la certification CCNA', [
      '<p>Dans les infrastructures modernes, maîtriser les réseaux requiert une compréhension fine ' +
      'des modèles en couches OSI et TCP/IP, de la structure des trames Ethernet et des paquets IP. ' +
      'Ce cursus forme les ingénieurs réseau à concevoir des plans d’adressage hiérarchiques optimaux avec VLSM, ' +
      'à configurer et sécuriser des commutateurs et routeurs Cisco sous IOS, ' +
      'à éliminer les boucles de niveau 2 grâce au protocole Spanning Tree (STP), ' +
      'à maîtriser le routage statique avec Longest Prefix Match et routes flottantes, ' +
      'et à isoler les domaines de diffusion par des VLANs 802.1Q interconnectés par Router-on-a-Stick (ROAS). ' +
      'Chaque module combine apports théoriques rigoureux, schémas de trames, 3 ateliers interactifs et un QCM d’auto-évaluation.</p>'
    ].join('\n')),
    '',
    disclaimer('Ce cours couvre le socle fondamental de la certification Cisco Certified Network Associate (CCNA) niveau B2.')
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Architecture Réseau, Switching &amp; Routage CCNA',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const items = chapterList.map(chapitre => [
    '    <li class="sommaire__item">',
    '      <div class="sommaire__badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</div>',
    '      <div class="sommaire__num">Module ' + chapitre.n + '</div>',
    '      <div class="sommaire__content">',
    '        <h3 class="sommaire__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="sommaire__desc">' + chapitre.toc + '</p>',
    '        <div class="sommaire__meta">',
    '          <span>' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '          <span>' + ic('terminal') + ' 3 exercices de code</span>',
    '          <span>' + ic('check') + ' 8 questions QCM</span>',
    '        </div>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumb(course, [{ label: 'Sommaire' }]),
    '  <h1>Sommaire complet de la formation</h1>',
    '  <p class="lead">Consultez les 6 modules du programme, leur durée indicative et leurs objectifs d’ingénierie réseau CCNA.</p>',
    '  <ol class="sommaire__list">' + items + '</ol>',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire complet | ' + course.brand,
      description: 'Vue d’ensemble des 6 modules du cours de CCNA Réseau B2.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier d’analyse ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ label: 'Atelier d’analyse' }]),
    '  <h1>Atelier d’analyse interactif Réseau CCNA</h1>',
    '  <p class="lead">Simulez vos trames Ethernet, calculez des sous-réseaux VLSM, testez la convergence Spanning Tree et analysez des tables de routage directement dans l’interpréteur embarqué.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="192.168.1.0/24">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\'analyse et cas d\'application.\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
    '  </div>',
    '',
    '  <h2>Conseils pour la certification et les labs Cisco</h2>',
    box('standard', 'Bonnes pratiques d’ingénierie réseau et réflexes de production', [
      '<ul>',
      '  <li><strong>Vérifiez systématiquement la couche physique et liaison :</strong> Avant de déboguer le routage IP, assurez-vous que les interfaces sont <code>up/up</code> et que les câbles sont fonctionnels.</li>',
      '  <li><strong>Ordonnez toujours le plan VLSM du plus grand au plus petit :</strong> Commencer par les sous-réseaux les plus étendus évite tout risque de fragmentation ou de chevauchement d’adresses.</li>',
      '  <li><strong>Sécurisez les accès d’administration dès l’initialisation :</strong> Activez <code>service password-encryption</code>, configurez <code>enable secret</code>, désactivez Telnet au profit de SSH (<code>transport input ssh</code>) et protégez la console.</li>',
      '  <li><strong>Contrôlez les VLANs natifs sur chaque lien Trunk :</strong> Un désaccord de VLAN natif (Native VLAN Mismatch) entraîne des failles de sécurité majeures et des dysfonctionnements STP.</li>',
      '</ul>'
    ].join('\n')),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier d’analyse interactif | ' + course.brand,
      description: 'Espace d’expérimentation et bac à sable de simulation réseau interactif.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
