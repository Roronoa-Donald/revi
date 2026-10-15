/**
 * Pages « accueil », « sommaire » et « atelier » du cours « pfSense & Routage B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('shield') + ' Niveau B3 • Sécurité Périmétrique, Pare-Feu pfSense, Routage Avancé &amp; Haute Disponibilité</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire Réseau Interactif</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules approfondis</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'ingénierie</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Ingénierie des Pare-Feux &amp; Sécurité Réseau en Troisième Année</h2>',
    box('standard', 'De l’Administration Système au Bastion de Sécurité Haute Disponibilité', [
      '<p>En troisième année de Bachelor en Cybersécurité et Réseaux, la mise en œuvre d\'un pare-feu ne consiste pas à cocher quelques cases dans une interface graphique. L\'ingénieur réseau et cybersécurité doit comprendre la cinématique interne du noyau FreeBSD (moteur Packet Filter pf), la gestion rigoureuse des tables d\'états (stateful inspection), l\'orchestration de passerelles Multi-WAN redondantes et la segmentation zéro confiance via VLANs 802.1Q.</p>',
      '<p>Ce cours approfondit l\'intégralité des briques d\'un périmètre réseau d\'entreprise sous Netgate pfSense : ' +
      'les fondations architecturales du moteur pf et des interfaces BSD (WAN, LAN, Opt), ' +
      'le filtrage dynamique par règles ordonnées (First-Match Wins), la gestion d\'Aliases et les limiteurs de bande passante Dummynet, ' +
      'la translation d\'adresses NAT (Port Forwarding, 1:1, Outbound hybride) et le routage Multi-WAN (Gateway Groups en équilibrage de charge et basculement automatique), ' +
      'la micro-segmentation en VLANs 802.1Q et la sécurisation étanche d\'une DMZ publique, ' +
      'le chiffrement de transit via VPNs OpenVPN (SSL/TLS avec PKI et CRL) et IPsec IKEv2 site-à-site, ' +
      'et enfin le clustering haute disponibilité avec CARP (IP virtuelle partagée), réplication d\'états pfsync, XMLRPC et détection d\'intrusion Snort/Suricata.</p>'
    ]),
    '',
    '  <h2>Outils et Méthodes de Travail</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Laboratoire Code Lab</span></div>',
    '      <h3>18 Ateliers Pratiques Python</h3>',
    '      <p>Simulez et auditez directement dans le navigateur le calcul des plages CIDR, les tables d\'états pfctl, le routage Multi-WAN, la cryptographie IPsec et l\'élection de maître CARP.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir le laboratoire</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Certification &amp; Évaluation</span></div>',
    '      <h3>QCM &amp; Examens d’Ingénierie</h3>',
    '      <p>48 questions de synthèse couvrant l\'analyse de trames, la syntaxe pf.conf, la cryptographie des tunnels et l\'investigation d\'incidents IDS/IPS.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Consulter les examens</a>',
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
  const listHtml = chapterList.map(ch => [
    '    <div class="sommaire-item">',
    '      <div class="sommaire-item__num">' + ch.n + '</div>',
    '      <div class="sommaire-item__content">',
    '        <h3><a href="chapitres/chapitre' + ch.n + '.html">' + ch.title + '</a></h3>',
    '        <p>' + ch.toc + '</p>',
    '      </div>',
    '    </div>'
  ].join('\n')).join('\n');

  const body = [
    '  <h1>Sommaire Général — ' + course.brand + '</h1>',
    '  <p class="lead">Programme officiel d\'ingénierie sécurité réseau et pare-feu pfSense découpé en six modules d\'apprentissage approfondis.</p>',
    '',
    '  <div class="sommaire-list">' + listHtml + '</div>',
    '',
    '  <h2>Ressources et Ateliers Complémentaires</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h3>Atelier Pratique</h3>',
    '      <p>Console interactive pour tester et automatiser des scripts d\'audit réseau et d\'analyse de règles pfSense.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Accéder à l\'atelier</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Formules &amp; Commandes</h3>',
    '      <p>Synthèse des commandes CLI FreeBSD/pfSense (pfctl, ifconfig, netstat), RFCs et algorithmes de routage.</p>',
    '      <a class="btn btn--sm" href="chapitres/formules.html">Consulter l\'aide-mémoire</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Examens Blancs</h3>',
    '      <p>Deux sujets d\'examen complets corrigés avec barème pour certifier vos compétences d\'administrateur sécurité.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Architecture pfSense & Déploiement', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de formation à pfSense et au routage avancé B3.',
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
    { label: 'Laboratoire Réseau libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable pfSense &amp; Routage</h1>',
    '  <p class="lead">Expérimentez et validez vos scripts d\'ingénierie sécurité en Python 3 : simulation de filtrage pf, contrôle d\'état TCP, routage Multi-WAN et élection de cluster CARP.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="RULE action=pass dir=in proto=tcp src=192.168.1.0/24 dst=any port=443\nPACKET proto=tcp src=192.168.1.50 dst=1.1.1.1 port=443">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos règles de pare-feu et algorithmes de routage en Python 3\nimport sys\n\ndef evaluer_regle_filtrage(regles, paquet_proto, paquet_port):\n    for r in regles:\n        if r[\'proto\'] == paquet_proto and (r[\'port\'] == \'any\' or int(r[\'port\']) == paquet_port):\n            return f"MATCH {r[\'action\'].upper()} (Rule: {r[\'name\']})"\n    return "DEFAULT DENY (Blocage automatique pf)"\n\nif __name__ == "__main__":\n    regles_test = [\n        {\'name\': \'Allow_HTTPS\', \'action\': \'pass\', \'proto\': \'tcp\', \'port\': 443},\n        {\'name\': \'Allow_DNS\', \'action\': \'pass\', \'proto\': \'udp\', \'port\': 53}\n    ]\n    print(evaluer_regle_filtrage(regles_test, \'tcp\', 443))\n    print(evaluer_regle_filtrage(regles_test, \'tcp\', 22))\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur d\'États TCP pfctl</h4>',
    '      <p>Modélisez la machine à états TCP (SYN_SENT, ESTABLISHED, FIN_WAIT, TIME_WAIT) et testez la détection d\'attaques SYN Flood.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Moteur Multi-WAN Gateway Groups</h4>',
    '      <p>Implémentez la distribution pondérée de flux sur deux passerelles WAN avec basculement automatique sur dégradation RTT/Packet Loss.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire Réseau libre — ' + course.brand,
      description: 'Bac à sable interactif en Python pour tester vos règles et algorithmes de routage pfSense.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
