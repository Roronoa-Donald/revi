/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Réseau LAN Avancé B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('network') + ' Niveau B3 • Commutation Avancée, STP/RSTP/MSTP, Redondance FHRP, OSPF &amp; Sécurité LAN</span></div>',
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
    '  <h2>Ingénierie de la Commutation &amp; Haute Résilience LAN en Troisième Année</h2>',
    box('standard', 'De l’Interconnexion d’Accès aux Architectures de Campus Haute Performance', [
      '<p>En troisième année de Bachelor en Ingénierie des Réseaux et Télécoms, l\'administration d\'une infrastructure locale de campus ne se limite plus à la simple création de VLANs 802.1Q. L\'ingénieur réseau doit concevoir des topologies sans boucle résilientes (RSTP 802.1w et MSTP 802.1s avec mécanismes de protection BPDU Guard et Root Guard), agréger les liens critiques via EtherChannel LACP (802.3ad) avec répartition de charge déterministe, et garantir la continuité de passerelle par défaut grâce aux protocoles FHRP (HSRP, VRRP v2/v3 et GLBP avec suivi d\'objets IP SLA).</p>',
      '<p>Ce cours approfondit l\'intégralité des standards d\'ingénierie LAN de niveau 2 et niveau 3 : ' +
      'la topologie sans boucle et l\'optimisation STP (élection Root Bridge, sélection Root Port/Designated Port, convergence sub-seconde RSTP, découpage en instances MSTP et durcissement des ports), ' +
      'l\'agrégation de liaisons EtherChannel (négociation LACP/PAgP, cohérence stricte des membres VLAN/Trunk/Speed, et fonctions de hachage de flux), ' +
      'la haute disponibilité de passerelle FHRP (élection active/standby, basculement par préemption, object tracking d\'interfaces amont et équilibrage multipath), ' +
      'le routage intra-domaine OSPFv2 (calcul de coût Dijkstra, typologie d\'aires Backbone/Stub/NSSA, types de LSAs 1 à 7 et DR/BDR), ' +
      'le durcissement de la couche d\'accès (Port Security, DHCP Snooping avec base d\'associations, Dynamic ARP Inspection DAI contre l\'usurpation ARP et IP Source Guard), ' +
      'et enfin la qualité de service LAN et la supervision d\'équipements (marquage 802.1p CoS vers DiffServ DSCP, ordonnancement Strict Priority vs WRR/DWRR, et découverte de topologie via LLDP 802.1AB et CDP).</p>'
    ]),
    '',
    '  <h2>Outils et Méthodes de Travail</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Laboratoire Code Lab</span></div>',
    '      <h3>18 Ateliers Pratiques Python</h3>',
    '      <p>Simulez et auditez directement dans le navigateur l\'élection STP, le hachage LACP, la préemption VRRP, le calcul Dijkstra OSPF et le filtrage DHCP Snooping/DAI.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir le laboratoire</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Certification &amp; Évaluation</span></div>',
    '      <h3>QCM &amp; Examens d’Ingénierie</h3>',
    '      <p>48 questions de synthèse couvrant l\'analyse de trames Wireshark, les commandes Cisco IOS/Junos, les RFCs et l\'investigation d\'anomalies LAN complexes.</p>',
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
    '  <p class="lead">Programme officiel d\'ingénierie de commutation, routage d\'infrastructure et sécurité LAN découpé en six modules d\'apprentissage approfondis.</p>',
    '',
    '  <div class="sommaire-list">' + listHtml + '</div>',
    '',
    '  <h2>Ressources et Ateliers Complémentaires</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h3>Atelier Pratique</h3>',
    '      <p>Console interactive pour tester et automatiser des scripts d\'audit de commutation et de protocoles LAN.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Accéder à l\'atelier</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Formules &amp; Commandes</h3>',
    '      <p>Synthèse des commandes Cisco IOS (show spanning-tree, show etherchannel, show standby), tables RFC et valeurs de référence.</p>',
    '      <a class="btn btn--sm" href="chapitres/formules.html">Consulter l\'aide-mémoire</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>Examens Blancs</h3>',
    '      <p>Deux sujets d\'examen complets corrigés avec barème pour certifier vos compétences d\'ingénieur réseau LAN.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Spanning Tree Protocol Avancé & Protection', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de formation au Réseau LAN Avancé B3.',
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
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Réseau LAN Avancé</h1>',
    '  <p class="lead">Expérimentez et validez vos scripts d\'ingénierie réseau en Python 3 : simulation de coût STP, calcul d\'agrégation LACP, préemption VRRP et analyse QoS.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="SPEED 10Gbps\nSPEED 1Gbps\nSPEED 100Mbps">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos algorithmes de commutation et routage LAN en Python 3\nimport sys\n\ndef calculer_cout_stp(debit_str):\n    """Calcul du coût Spanning Tree standard IEEE 802.1D-2004 / 802.1w."""\n    table = {\n        \'10Mbps\': 2000000,\n        \'100Mbps\': 200000,\n        \'1Gbps\': 20000,\n        \'10Gbps\': 2000,\n        \'40Gbps\': 500,\n        \'100Gbps\': 200\n    }\n    return table.get(debit_str, 20000)\n\nif __name__ == "__main__":\n    for ligne in sys.stdin:\n        ligne = ligne.strip()\n        if not ligne:\n            continue\n        parts = ligne.split()\n        if parts[0] == \'SPEED\':\n            debit = parts[1]\n            print(f"PORT speed={debit} stp_cost={calculer_cout_stp(debit)}")\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur d\'Élection Root Bridge STP</h4>',
    '      <p>Modélisez la comparaison de Bridge IDs (Priority + Extended System ID VLAN + MAC) et identifiez le commutateur racine.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Générateur de Hachage EtherChannel</h4>',
    '      <p>Simulez la distribution de trames à travers 2 à 8 liaisons agrégées selon les tuples IP source/destination et ports TCP/UDP.</p>',
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
      description: 'Bac à sable interactif en Python pour tester vos algorithmes de commutation et protocoles LAN.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
