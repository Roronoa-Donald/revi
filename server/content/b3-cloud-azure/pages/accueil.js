/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Cloud Microsoft Azure B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('cloud') + ' Niveau B3 • Architecture Cloud, IaaS, PaaS, Réseau Virtuel, Sécurité &amp; FinOps</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Azure CLI &amp; Python</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules d\'ingénierie</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'architecture</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>L’Ingénierie Cloud Microsoft Azure en Bachelor 3</h2>',
    box('standard', 'De l\'Administration des Ressources IaaS à la Gouvernance d\'Entreprise &amp; FinOps', [
      '<p>En troisième année de Bachelor en Ingénierie Réseaux et Systèmes d’Information, le Cloud Computing ne se résume plus à déployer une machine virtuelle isolée depuis une interface graphique. Il constitue la plateforme d\'infrastructure fondamentale où convergent l\'orchestration réseau, la sécurité des identités hybrides, le stockage distribué hautement disponible et la gestion automatisée des coûts.</p>',
      '<p>Conçu selon les exigences des certifications professionnelles Microsoft Azure (AZ-104 / AZ-305) et les enseignements magistraux de M. AGOUTOCO-POKO Caleb Benaja, ce cours couvre l\'ensemble des compétences d\'ingénieur Cloud : ' +
      'la structure globale des datacenters Azure (régions, zones de disponibilité indépendantes, paires géographiques, hiérarchie de gestion des groupes et abonnements selon le Cloud Adoption Framework), ' +
      'la sécurité des accès et identités (Microsoft Entra ID / Azure AD, contrôle d\'accès granulaire RBAC, politiques de conformité Azure Policy et coffre-fort Azure Key Vault), ' +
      'les solutions de calcul (machines virtuelles, dimensionnement des séries B, D, E, F, ensembles et zones de disponibilité pour des SLAs de 99.95% à 99.99%, virtual machine scale sets VMSS avec règles d\'auto-scaling et PaaS Azure App Service), ' +
      'le réseau virtuel Azure VNet (sous-réseaux, les 5 adresses IP réservées par Azure, Network Security Groups NSG avec priorités de règles et règles par défaut, VNet Peering Hub-and-Spoke et passerelles VPN), ' +
      'le stockage de données (Blob Storage avec gestion automatique du cycle de vie Hot/Cool/Cold/Archive, partages de fichiers SMB Azure Files, bases managées Azure SQL et Cosmos DB, jetons SAS d\'accès sécurisé), ' +
      'et enfin la supervision opérationnelle et l\'automatisation (Azure Monitor, requêtes analytiques en langage KQL Kusto, Microsoft Defender for Cloud avec Secure Score, budgets Cost Management FinOps et templates Infrastructure as Code Bicep / ARM).</p>'
    ]),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Accueil — ' + course.brand,
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const itemsHtml = chapterList.map(chapitre => [
    '    <li class="summary-item">',
    '      <div class="summary-item__num">' + chapitre.n + '</div>',
    '      <div class="summary-item__content">',
    '        <h3 class="summary-item__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p class="summary-item__desc">' + chapitre.toc + '</p>',
    '        <div class="summary-item__meta">' +
             '<span>' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>' +
             '<span>' + ic('code') + ' 3 exercices de code lab</span>' +
             '<span>' + ic('check') + ' QCM &amp; Cartes mémo</span>' +
             '</div>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    '  <h1>Sommaire Général — ' + course.brand + '</h1>',
    '  <p class="lead">Programme complet en 6 modules : de l\'architecture globale ARM aux réseaux virtuels VNet, du calcul VMSS au stockage distribué et à l\'observabilité analytique KQL.</p>',
    '',
    '  <ol class="summary-list">' + itemsHtml + '</ol>',
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules de formation au Cloud Microsoft Azure B3.',
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
    { label: 'Bac à sable Cloud' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Azure CLI &amp; Python 3</h1>',
    '  <p class="lead">Expérimentez et validez vos scripts d\'automatisation d\'infrastructure Cloud Azure selon les grilles d’analyse : validation hiérarchique CAF, audit de règles NSG, requêtes Log Analytics KQL et dimensionnement VMSS.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="az group create --name rg-prod-we --location westeurope\naz vm create --name vm-app-01 --resource-group rg-prod-we --image Ubuntu2204">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\'analyse et cas d\'application.\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Moteur d\'Évaluation des Règles de Sécurité NSG</h4>',
    '      <p>Testez des paquets réseau entrants face aux priorités de filtrage et aux règles par défaut Azure 65000 et 65500.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Interpréteur de Requêtes Log Analytics KQL</h4>',
    '      <p>Traitez un flux de journaux d\'activités Azure avec les opérateurs KQL where, summarize count(), order by et take.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Bac à sable Cloud Azure — ' + course.brand,
      description: 'Bac à sable interactif par cas d’application pour tester vos scripts d’automatisation et d’audit Cloud Azure.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
