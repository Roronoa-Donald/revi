/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Firewall & Sécurité Réseau B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('shield') + ' Niveau B3 • Sécurité Périmétrique, Filtrage Réseau &amp; Pare-feux</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire Pare-feu &amp; Sécurité</a>',
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
    '  <h2>Architecture &amp; Philosophie de la Sécurité Réseau</h2>',
    box('standard', 'La Défense en Profondeur et la Maîtrise des Flux Réseau en Troisième Année', [
      '<p>En ingénierie des réseaux et systèmes informatiques de niveau Bachelor 3, le pare-feu (Firewall) constitue la première ligne de défense péremptoire de toute infrastructure d’entreprise. ' +
      'Loin de se résumer à un simple routeur avec quelques règles de blocage, le pare-feu moderne est un composant stratégique orchestrant l’isolation des zones de confiance, le suivi d’état dynamique des sessions (Stateful Inspection), la translation d’adresses (NAT/PAT), l’analyse protocolaire applicative de couche 7 (DPI/NGFW) et la corrélation d’alertes avec les systèmes de détection d’intrusions (IDS/IPS et SIEM).</p>',
      '<p>Ce cours approfondit l’intégralité des concepts fondamentaux et opérationnels de la sécurité périmétrique : ' +
      'les quatre générations technologiques de pare-feux (du filtrage statique stateless jusqu’aux NGFW dotés d’intelligence sur les menaces zero-day), ' +
      'la mécanique de suivi de sessions TCP selon la RFC 793 et les tables netfilter conntrack, ' +
      'l’ordonnancement des listes de contrôle d’accès (ACLs First-Match-Wins) avec détection mathématique des anomalies et du masquage de règles (Rule Shadowing), ' +
      'la conception rigoureuse de zones démilitarisées (DMZ) et topologies haute sécurité (Dual-Homed, Triple-Homed, pare-feux en cascade Back-to-Back hétérogènes), ' +
      'le filtrage d’URL et SNI TLS, la protection anti-déni de service par rate limiting, ' +
      'l’inspection profonde de contenu (DPI) neutralisant les injections SQL et attaques XSS, ' +
      'et enfin la mise en œuvre pratique sur systèmes Linux via iptables et nftables combinée à l’analyse de logs et au bannissement dynamique automatisé (Fail2ban).</p>'
    ]),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Sécurité Périmétrique, Filtrage Réseau &amp; Pare-feux B3',
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
    '  <p class="lead">Programme détaillé des 6 modules de spécialisation en sécurité réseau, architectures de pare-feux, tables de suivi conntrack, DMZ et déploiement netfilter.</p>',
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
    '      <p>Atelier interactif avec grille d’analyse intégrée pour tester le moteur conntrack, compiler des règles iptables/nftables et analyser les flux DMZ.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir le lab</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('file') + ' Cartes &amp; Syntaxes</h3>',
    '      <p>Toutes les commandes iptables, nftables, drapeaux TCP, tables de timeouts et matrices de conformité DMZ regroupées en aide-mémoire.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">Consulter les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('award') + ' Examens &amp; Annales</h3>',
    '      <p>Deux sujets d’examen complets corrigés avec barème détaillé de notation pour valider votre certification de niveau B3.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Fondements &amp; Évolution', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de sécurité réseau et pare-feu B3.',
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
    { label: 'Laboratoire pare-feu libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Pare-feu &amp; Sécurité Réseau</h1>',
    '  <p class="lead">Expérimentez et automatisez vos analyses de sécurité réseau selon les grilles d’analyse : suivi d’état conntrack, audit de flux DMZ, compilateur de règles netfilter et détection d’intrusions L7.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="FLOW_TEST\nsrc=WAN\ndst=DMZ\nport=443">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\'analyse et cas d\'application.\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Machine à états conntrack</h4>',
    '      <p>Implémentez la machine à états finis du handshake 3-voies TCP (SYN, SYN-ACK, ACK) et la purge des timeouts.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Compilateur de règles Netfilter</h4>',
    '      <p>Traduisez des matrices de flux métier en commandes iptables ou règles nftables avec compteurs de paquets.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire pare-feu libre — ' + course.brand,
      description: 'Bac à sable interactif par cas d’application pour tester vos algorithmes de filtrage réseau et de sécurité.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
