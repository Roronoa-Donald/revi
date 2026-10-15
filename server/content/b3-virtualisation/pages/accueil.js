/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Virtualisation Avancée B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('vm') + ' Niveau B3 • VMware vSphere 7/8, ESXi Bare-Metal, vCenter, vSAN, vSwitch/VDS, HA/DRS/vMotion, CBT &amp; VDI</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Virtualisation &amp; Python 3</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules d\'ingénierie</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens d\'architecture Datacenter</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>La Virtualisation Avancée en Bachelor 3</h2>',
    box('standard', 'De l\'Hyperviseur Bare-Metal aux Architectures Hyperconvergées et Multi-Clusters', [
      '<p>En troisième année de Bachelor en Ingénierie des Systèmes et Réseaux, la virtualisation n\'est plus un simple outil de consolidation de serveurs de développement, mais le socle fondamental des infrastructures de Datacenter privé et de Cloud hybride (SDDC - Software-Defined Data Center).</p>',
      '<p>Inspiré du support officiel de M. Caleb AGOUTOCO-POKO (Ingénieur Systèmes, Spécialiste Datacenter &amp; Virtualisation) et des standards industriels VMware vSphere et Citrix XenServer, ce cours approfondit l\'intégralité des savoir-faire d\'architecture et d\'exploitation avancée : ' +
      'les architectures d\'hyperviseurs de Type-1 (micro-noyau VMware VMkernel, Xen Hypervisor avec Domaine 0 privilégié, optimisation des topologies NUMA locales et calculs stricts de ratios de surallocation vCPU:pCPU et RAM overcommit), ' +
      'le déploiement et l\'administration de VMware vCenter Server (VCSA, Platform Services Controller, inventaires hiérarchiques, cycle de vie complet d\'une VM, anatomie des disques deltas de snapshots et ordonnancement fin par Resource Pools avec Shares, Reservations et Limits), ' +
      'les architectures de stockage d\'entreprise (système de fichiers clustered VMFS-6 avec verrouillage distribué ATS, stockage hyperconvergé VMware vSAN avec groupes de disques flash et politiques SPBM FTT-1/FTT-2, et multipathing NMP avec règles Round Robin et Fixed), ' +
      'la commutation virtuelle (vSwitch standard et commutateurs distribués vSphere Distributed Switch VDS, isolation VLAN 802.1Q par VST/EST/VGT, durcissement des Port Groups contre l\'usurpation d\'adresse MAC et régulation de trafic par Token Bucket), ' +
      'la haute disponibilité et la mobilité à chaud (clustering vSphere HA avec agents FDM et contrôle d\'admission, équilibrage dynamique vSphere DRS avec règles d\'affinité et d\'anti-affinité, et migrations vMotion à chaud sans interruption de service avec modélisation du Dirty Rate et du débit réseau), ' +
      'et enfin les stratégies modernes de sauvegarde et de virtualisation du poste de travail (Changed Block Tracking CBT, APIs VADP, durcissement sécuritaire des hyperviseurs ESXi et architectures VDI avec VMware Horizon et Citrix Virtual Desktops).'
    ]),
    '',
    '  <h2>Méthodologie &amp; Outils Pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Ateliers Python 3</span></div>',
    '      <h3>18 Ateliers de Programmation Pratique</h3>',
    '      <p>Chaque module propose 3 exercices interactifs pour coder et simuler en Python 3 : dimensionneurs de surallocation vCPU/RAM, parseurs VMX, calculateurs d\'espace de snapshots, dimensionneurs vSAN SPBM, traffic shapers vSwitch, estimateurs de durée vMotion et calculateurs de fenêtres de sauvegarde CBT.</p>',
    '      <a class="btn btn--sm" href="chapitres/exercices.html">' + ic('code') + ' Voir les 18 ateliers</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Mémorisation Active</span></div>',
    '      <h3>36 Cartes Mémoire &amp; Formulaire</h3>',
    '      <p>Révisez les composants d\'ESXi, les fichiers constitutifs d\'une VM, les politiques vSAN, les modes de tagging VLAN, les règles d\'affinité DRS et les paramètres de durcissement grâce au système de révision espacée.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">' + ic('cards') + ' Consulter les flashcards</a>',
    '    </div>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — ' + course.title,
      description: course.lead,
      active: 'index',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire' }]);

  const modulesHtml = chapterList.map(chapitre => [
    '    <section class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + chapitre.n + '.html">Ouvrir le module ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </section>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Sommaire Général — ' + course.brand + '</h1>',
    '    <p class="section-head__lead">Programme d\'excellence en virtualisation avancée, hyperviseurs bare-metal, stockage hyperconvergé, réseaux virtuels et clustering haute disponibilité.</p>',
    '  </header>',
    '',
    '  <div class="grid grid-2">' + modulesHtml + '</div>',
    '',
    '  <h2>Ressources Transversales &amp; Outils d\'Évaluation</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Laboratoire</span></div>',
    '      <h4>Atelier de Code</h4>',
    '      <p>Console Python 3 libre pour simuler vos dimensionnements d\'hyperviseurs et vos politiques de cluster.</p>',
    '      <a class="btn btn--sm" href="atelier.html">' + ic('terminal') + ' Ouvrir le bac à sable</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Révision</span></div>',
    '      <h4>Cartes Mémoire</h4>',
    '      <p>36 flashcards de révision active pour assimiler le vocabulaire et les concepts d\'architecture vSphere.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">' + ic('cards') + ' Consulter les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Mémento</span></div>',
    '      <h4>Formules &amp; Directives</h4>',
    '      <p>Fiche de synthèse des formules de surallocation, politiques SPBM vSAN et matrices de sécurité.</p>',
    '      <a class="btn btn--sm" href="chapitres/formules.html">' + ic('file-text') + ' Voir le mémento</a>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire général — ' + course.brand,
      description: 'Programme complet des 6 modules d\'ingénierie du cours Virtualisation Avancée B3.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire', href: 'sommaire.html' }, { label: 'Atelier de code' }]);

  const defaultCode = `# Zone libre : simulez vos architectures de virtualisation avancée en Python 3
import sys

def simuler_virtualisation_avancee(commandes):
    """Simule des opérations Datacenter : dimensionnement ESXi, politiques vSAN, vMotion."""
    resultats = []
    for cmd in commandes:
        cmd_clean = cmd.strip()
        if cmd_clean.startswith("ESXI_OVERCOMMIT"):
            # Simulation d'un ratio de surallocation vCPU / pCPU
            resultats.append(f"ESXI_RATIO: {cmd_clean} -> vCPU:pCPU = 3.5:1 (NOMINAL)")
        elif cmd_clean.startswith("VSAN_SPBM"):
            # Calcul de multiplication brute pour FTT=1 RAID1
            resultats.append(f"VSAN_POLICY: {cmd_clean} -> Multiplicateur = 2.0x, Slack Space = 20% (OK)")
        elif cmd_clean.startswith("VMOTION_ESTIMATE"):
            # Estimation de durée vMotion
            resultats.append(f"VMOTION: {cmd_clean} -> Convergence atteinte en 14.2s (RAPIDE)")
        else:
            resultats.append(f"VIRT_LOG: {cmd_clean} -> OPÉRATION VALIDÉE")
    return resultats

if __name__ == "__main__":
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        lignes = ["ESXI_OVERCOMMIT VCPUS=56 PCPUS=16", "VSAN_SPBM FTT=1 RAID1", "VMOTION_ESTIMATE RAM_GB=16 NET_GBPS=10"]
    for r in simuler_virtualisation_avancee(lignes):
        print(r)
`;

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Atelier de Code Interactif — Virtualisation Avancée Datacenter</h1>',
    '    <p class="section-head__lead">Expérimentez librement vos algorithmes de surallocation d\'hyperviseurs, de calcul de capacité vSAN, d\'équilibrage DRS et de migration vMotion en Python 3.</p>',
    '  </header>',
    '',
    '  <div class="lab"',
    '       data-lab',
    '       data-exercise-id="atelier-vrt3"',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="ESXI_OVERCOMMIT VCPUS=56 PCPUS=16\nVSAN_SPBM FTT=1 RAID1\nVMOTION_ESTIMATE RAM_GB=16 NET_GBPS=10">',
    '    <script type="text/plain" data-lab-starter>' + defaultCode + '</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Calculateur de Ratios de Surallocation vCPU &amp; RAM</h4>',
    '      <p>Modélisez la capacité d\'accueil d\'un cluster d\'hôtes ESXi et vérifiez les seuils critiques de surallocation pour éviter le CPU ready time excessif.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Estimateur de Convergence &amp; Durée vMotion</h4>',
    '      <p>Calculez la pré-copie mémoire en fonction de la taille RAM de la VM, du débit réseau alloué et du taux de modification des pages (Dirty Rate).</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code interactif — ' + course.brand,
      description: 'Console interactive Python 3 pour concevoir et tester des algorithmes de virtualisation VMware, vSAN et gestion de cluster.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
