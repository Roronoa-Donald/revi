/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Cloud Computing B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active en Cloud Computing</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts clés : Définition NIST, Hyperscalers &amp; SLA, Hyperviseurs &amp; Sizing, Green IT &amp; PUE, Responsabilité Partagée &amp; Souveraineté, 6 R &amp; FinOps.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento des formules' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Cloud Computing B3 : notions clés et définitions des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento des Formules, Invariants &amp; Métriques Cloud</h1>',
    '  <p class="lead">Guide de référence opérationnelle : formules de SLA composé, indisponibilité annuelle, efficience PUE, dimensionnement d’infrastructures et arbitrage FinOps.</p>',
    '',
    '  <h2>1. Modèles de Service &amp; Matrice des Responsabilités</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Couche technique</th><th>On-Premise</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Centre de données &amp; Énergie</strong></td><td>Client</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td></tr>',
    '      <tr><td><strong>Serveurs &amp; Réseau physique</strong></td><td>Client</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td></tr>',
    '      <tr><td><strong>Hyperviseur &amp; Virtualisation</strong></td><td>Client</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td></tr>',
    '      <tr><td><strong>Système d’exploitation (OS)</strong></td><td>Client</td><td>Client</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td></tr>',
    '      <tr><td><strong>Runtime &amp; Middleware</strong></td><td>Client</td><td>Client</td><td>Fournisseur (CSP)</td><td>Fournisseur (CSP)</td></tr>',
    '      <tr><td><strong>Application applicative</strong></td><td>Client</td><td>Client</td><td>Client</td><td>Fournisseur (CSP)</td></tr>',
    '      <tr><td><strong>Gouvernance des Données &amp; IAM</strong></td><td>Client</td><td>Client</td><td>Client</td><td>Client</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Disponibilité Globale (SLA) &amp; Budget d’Erreur</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Architecture</th><th>Formule mathématique</th><th>Impact opérationnel</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Composants en série (dépendance)</strong></td><td>$SLA_{total} = \\prod_{i=1}^n SLA_i$</td><td>La disponibilité globale est inférieure au plus faible maillon de la chaîne.</td></tr>',
    '      <tr><td><strong>Composants en parallèle (redondance)</strong></td><td>$SLA_{total} = 1 - \\prod_{i=1}^n (1 - SLA_i)$</td><td>La probabilité de panne simultanée diminue drastiquement (haute disponibilité).</td></tr>',
    '      <tr><td><strong>Temps d’indisponibilité annuel</strong></td><td>$Downtime = 525\\,600 \\times (1 - SLA)$</td><td>Calculé en minutes par an sur une base civile de 365 jours.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Équivalences d’Indisponibilité Annuelle selon les « Neufs »</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Niveau de disponibilité</th><th>Indisponibilité par an</th><th>Indisponibilité par mois</th><th>Indisponibilité par semaine</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>99.0% (Deux neufs)</strong></td><td>3 jours 15 h 36 min</td><td>7 h 18 min</td><td>1 h 40 min</td></tr>',
    '      <tr><td><strong>99.9% (Trois neufs)</strong></td><td>8 h 45 min 36 s</td><td>43 min 49 s</td><td>10 min 05 s</td></tr>',
    '      <tr><td><strong>99.95% (Trois neufs et demi)</strong></td><td>4 h 22 min 48 s</td><td>21 min 55 s</td><td>5 min 02 s</td></tr>',
    '      <tr><td><strong>99.99% (Quatre neufs)</strong></td><td>52 min 34 s</td><td>4 min 23 s</td><td>1 min 01 s</td></tr>',
    '      <tr><td><strong>99.999% (Cinq neufs)</strong></td><td>5 min 15 s</td><td>26 secondes</td><td>6 secondes</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Métriques Énergétiques &amp; Green IT</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Indicateur</th><th>Formule de calcul</th><th>Cible d’excellence</th><th>Description</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>PUE (Power Usage Effectiveness)</strong></td><td>$PUE = \\frac{E_{totale}}{E_{IT}}$</td><td>$&lt; 1.20$</td><td>Rapport entre l’énergie totale entrant dans le datacenter et l’énergie utile IT.</td></tr>',
    '      <tr><td><strong>DCiE (Data Center Efficiency)</strong></td><td>$DCiE = \\frac{1}{PUE} \\times 100$</td><td>$&gt; 83.3\\%$</td><td>Pourcentage direct d’énergie utile consommée par les équipements informatiques.</td></tr>',
    '      <tr><td><strong>Pertes de climatisation</strong></td><td>$Pertes = E_{totale} - E_{IT}$</td><td>Minimale</td><td>Énergie dissipée par le refroidissement, les onduleurs et l’éclairage.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Arbre Décisionnel des 6 R de Migration Applicative</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Stratégie 6R</th><th>Nom courant</th><th>Effort de refonte</th><th>Bénéfice Cloud</th><th>Cas d’usage typique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Rehost</strong></td><td>Lift and Shift</td><td>Minimal</td><td>Élasticité de base</td><td>Migration rapide de VM sans modification de code.</td></tr>',
    '      <tr><td><strong>Replatform</strong></td><td>Lift, Tinker &amp; Shift</td><td>Faible</td><td>Infogérance partielle</td><td>Bascule vers base managée (RDS) sans changer l’architecture.</td></tr>',
    '      <tr><td><strong>Repurchase</strong></td><td>Drop and Shop</td><td>Modéré</td><td>SaaS clé en main</td><td>Remplacement d’un progiciel vieillissant par un SaaS leader.</td></tr>',
    '      <tr><td><strong>Refactor</strong></td><td>Re-architect</td><td>Élevé</td><td>Cloud-native maximal</td><td>Découpage en microservices, serverless et conteneurs.</td></tr>',
    '      <tr><td><strong>Retain</strong></td><td>Conserver sur site</td><td>Nul</td><td>Aucun</td><td>Application legacy critique non rentable à migrer.</td></tr>',
    '      <tr><td><strong>Retire</strong></td><td>Décommissionner</td><td>Négatif (gain)</td><td>Réduction d’empreinte</td><td>Arrêt définitif d’un service ou composant redondant obsolète.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Arbitrages Économiques FinOps &amp; TCO sur 3 Ans</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Modèle tarifaire</th><th>Niveau de remise</th><th>Contrainte opérationnelle</th><th>Profil de charge adapté</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>À la demande (On-Demand)</strong></td><td>Plein tarif (0%)</td><td>Aucun engagement</td><td>Pics imprévisibles, tests ponctuels, batchs courts.</td></tr>',
    '      <tr><td><strong>Instances Réservées (RI)</strong></td><td>30% à 72% de remise</td><td>Engagement 1 ou 3 ans</td><td>Socle de base permanent actif 24h/24 toute l’année.</td></tr>',
    '      <tr><td><strong>Instances Spot</strong></td><td>70% à 90% de remise</td><td>Interruption avec préavis 2 min</td><td>Calculs par lots tolérants aux pannes, rendu, IA.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices.html', label: 'Consulter le catalogue d’exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento des formules — ' + course.brand,
      description: 'Mémento des formules et indicateurs de Cloud Computing B3 : SLA, PUE, 6R de migration, dimensionnement et FinOps.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
