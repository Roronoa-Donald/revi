/**
 * Chapitre 6 du cours « ERP & SI » B2 — Déploiement, Urbanisation & Avenir des ERP.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Déploiement, Urbanisation &amp; Avenir des ERP',
  short: 'Déploiement &amp; Avenir',
  toc: 'On-Premise vs Cloud SaaS, conduite du projet ERP, matrice des risques, urbanisation du SI et ERP composable.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Le choix d’un ERP et son implémentation constituent l’un des investissements les plus stratégiques et risqués pour une organisation. ' +
    'Du modèle d’hébergement (SaaS vs On-Premise) à la gestion des risques projet (conduite du changement, dépassements budgétaires), ' +
    'en passant par l’urbanisation du SI et l’émergence des ERP composables pilotés par l’IA, découvrez comment moderniser durablement le système d’information.',

  objectives: [
    'comparer les modèles de déploiement (On-Premise, Cloud privé, Cloud SaaS) et analyser le TCO (Capex vs Opex) ;',
    'maîtriser les étapes clés d’un projet ERP (cadrage, paramétrage, reprise des données, UAT, bascule) ;',
    'analyser et mitiger les risques d’un projet d’implémentation par une matrice de criticité (Probabilité &times; Gravité) ;',
    'appliquer les principes d’urbanisation du système d’information (zones, blocs, découplage, élimination de la dette) ;',
    'comprendre les tendances d’avenir : ERP composable, architecture MACH, intégration de l’IA et Green IT.'
  ],

  sections: [
    {
      title: 'Modèles de déploiement et analyse économique : On-Premise vs Cloud SaaS',
      html: [
        '<p>Le choix d’infrastructure conditionne les coûts, la maintenance, la sécurité et la flexibilité de l’entreprise :</p>',
        '<ul>\n' +
        '  <li><strong>On-Premise (Sur site)</strong> : l’ERP est installé sur les serveurs physiques propres à l’entreprise. ' +
        'Modèle à fort <strong>Capex</strong> (dépenses d’investissement initiales : serveurs, baies de stockage, licences perpétuelles). ' +
        'Maîtrise totale des données et des personnalisations, mais maintenance matérielle, sauvegardes et montées de version complexes à la charge exclusive de la DSI.</li>\n' +
        '  <li><strong>Cloud SaaS (Software as a Service)</strong> : l’ERP est hébergé et opéré par l’éditeur en mode multi-tenant. ' +
        'Modèle 100 % <strong>Opex</strong> (dépenses opérationnelles par abonnement mensuel ou annuel par utilisateur). ' +
        'Mises à jour transparentes et continues, haute disponibilité garantie par contrat (SLA), déploiement rapide, mais dépendance envers l’éditeur (Vendor Lock-in) et personnalisations en profondeur plus encadrées.</li>\n' +
        '  <li><strong>Cloud privé / Hybride</strong> : compromis offrant une infrastructure Cloud dédiée à une seule entreprise avec des garanties renforcées de souveraineté et d’isolation des données.</li>\n' +
        '</ul>',
        box('danger', 'Calcul du TCO (Total Cost of Ownership) sur 5 ans', 'alert',
          '    <p>Comparer un devis On-Premise et un abonnement SaaS ne se limite jamais au coût facial des licences :</p>\n' +
          '    <pre><code>TCO_OnPremise = Capex_initial (serveurs + licences) + Opex_annuel * 5 (maintenance 18 % + électricité + baie + admin sys)\nTCO_SaaS      = Déploiement_initial + (Abonnement_mensuel * 12) * 5 + Support_Cloud * 5</code></pre>\n' +
          '    <p>Sur 5 ans, les coûts d’administration système et de renouvellement matériel du On-Premise dépassent fréquemment le cumul des abonnements SaaS.</p>')
      ].join('\n')
    },
    {
      title: 'Conduite du projet ERP &amp; Gestion des risques d’implémentation',
      html: [
        '<p>Un projet ERP n’est pas un simple projet informatique : c’est un projet de <strong>transformation organisationnelle</strong> ' +
        'qui bouleverse les habitudes de travail de l’ensemble des collaborateurs. Son cycle de vie s’articule en 6 phases majeures :</p>',
        '<ol>\n' +
        '  <li><strong>Cadrage &amp; Expression des besoins</strong> : cartographie des processus cibles et rédaction du cahier des charges.</li>\n' +
        '  <li><strong>Conception générale &amp; Paramétrage</strong> : configuration du standard ERP et développement des spécifiques strictement indispensables.</li>\n' +
        '  <li><strong>Reprise des données (Data Migration)</strong> : nettoyage, déduplication, transformation et injection des données patrimoniales (clients, articles, historique comptable).</li>\n' +
        '  <li><strong>Recette utilisateur (UAT - User Acceptance Testing)</strong> : validation en situation réelle de bout en bout par les utilisateurs clés (Key Users).</li>\n' +
        '  <li><strong>Formation &amp; Conduite du changement</strong> : accompagnement pédagogique des utilisateurs et communication managériale.</li>\n' +
        '  <li><strong>Bascule (Go-Live) &amp; Hypercare</strong> : mise en production et support renforcé pendant les premières semaines critiques.</li>\n' +
        '</ol>',
        box('astuce', 'Stratégies de bascule : Big Bang vs Déploiement progressif (Phasing)', 'lightbulb',
          '    <p>Deux grandes stratégies s’opposent pour le Go-Live :</p>\n' +
          '    <ul>\n' +
          '      <li><strong>Big Bang</strong> : bascule de l’ensemble des modules et sites en un seul week-end. Rapide, pas de double système, mais risque maximal d’arrêt d’activité en cas d’anomalie critique.</li>\n' +
          '      <li><strong>Déploiement par étapes (Phasing / Pilote)</strong> : mise en production progressive par module (ex. d’abord la Finance, puis les Stocks) ou par entité géographique (filiale pilote). Risque opérationnel maîtrisé, mais gestion transitoire complexe d’interfaces temporaires entre l’ancien et le nouveau système.</li>\n' +
          '    </ul>')
      ].join('\n')
    },
    {
      title: 'Urbanisation du Système d’Information &amp; Réduction de la dette applicative',
      html: [
        '<p>L’<strong>urbanisation du SI</strong> applique les métaphores de l’architecture urbaine pour organiser un système d’information pérenne, évolutif et réactif :</p>',
        '<ul>\n' +
        '  <li><strong>Découpage par zones</strong> : Zone Publique (portails web, e-commerce), Zone d’Échange (API Management, ESB), Zone Opérationnelle (ERP, CRM, WMS) et Zone Décisionnelle (Data Warehouse, Data Lake, BI).</li>\n' +
        '  <li><strong>Blocs applicatifs cohérents</strong> : chaque application possède une responsabilité métier claire et unique, sans empiéter sur le périmètre des autres.</li>\n' +
        '  <li><strong>Maîtrise de la dette applicative</strong> : identifier les logiciels redondants (shadow IT), les versions obsolètes non maintenues et les interfaces spaghetti afin d’établir un plan de décommissionnement rationnel.</li>\n' +
        '</ul>'
      ].join('\n')
    },
    {
      title: 'L’avenir des ERP : ERP Composable, Architecture MACH &amp; Intelligence Artificielle',
      html: [
        '<p>Le modèle historique de l’ERP monolithique monolithique ultra-lourd évolue vers le <strong>Composable ERP</strong> (ERP composable) :</p>',
        '<ul>\n' +
        '  <li><strong>Architecture MACH</strong> : <em>Microservices</em> (briques modulaires indépendantes), <em>API-first</em> (communication standardisée par OpenAPI), <em>Cloud-native</em> (déploiement en conteneurs élastiques) et <em>Headless</em> (séparation totale du back-office et des interfaces front-end).</li>\n' +
        '  <li><strong>IA générative &amp; Automatisation cognitive</strong> : réconciliation bancaire autonome, saisie automatique des factures scannées par OCR et LLM, prévision dynamique de la demande par Machine Learning et agents conversationnels de support.</li>\n' +
        '  <li><strong>Numérique responsable (Green IT)</strong> : hébergement dans des datacenters à faible PUE (Power Usage Effectiveness), optimisation des requêtes de base de données pour réduire l’empreinte carbone du SI.</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle est la principale différence financière entre un ERP On-Premise et un ERP Cloud SaaS ?', opts: ['L’On-Premise relève principalement du Capex (investissement initial) tandis que le SaaS relève de l’Opex (abonnements opérationnels)', 'L’On-Premise est toujours totalement gratuit', 'Le SaaS ne permet aucun accès à distance'], correct: 0, exp: 'L’achat de serveurs et licences perpétuelles s’amortit en Capex, tandis que les abonnements Cloud constituent des charges régulières en Opex.' },
    { stem: 'Quelle stratégie de bascule Go-Live présente le risque d’interruption d’activité le plus élevé en cas de bug critique ?', opts: ['La bascule en Big Bang', 'Le déploiement progressif par module', 'Le déploiement sur une filiale pilote'], correct: 0, exp: 'Le Big Bang bascule tout d’un coup ; tout dysfonctionnement majeur paralyse immédiatement l’ensemble des opérations de l’entreprise.' },
    { stem: 'Quelle formule définit la criticité d’un risque dans une matrice projet ERP ?', opts: ['Criticité = Probabilité * Gravité', 'Criticité = Budget / Délai', 'Criticité = Nombre d’utilisateurs * 2'], correct: 0, exp: 'La criticité est le produit de la probabilité d’occurrence par l’impact ou gravité du risque.' },
    { stem: 'Que signifie l’acronyme UAT dans un projet ERP ?', opts: ['User Acceptance Testing (Recette utilisateur finale)', 'Unified Application Topology', 'Universal Accounting Table'], correct: 0, exp: 'L’UAT permet aux futurs utilisateurs de tester la conformité des processus avant le Go-Live.' },
    { stem: 'Dans l’urbanisation du SI, quel est le rôle d’un bloc applicatif ?', opts: ['Fournir une responsabilité métier cohérente et unique avec une frontière claire', 'Stocker tous les mots de passe de l’entreprise', 'Empêcher toute connexion au réseau externe'], correct: 0, exp: 'Un bloc applicatif urbanisé gère un domaine fonctionnel délimité et communique par API.' },
    { stem: 'Que signifie l’acronyme MACH dans les architectures logicielles modernes ?', opts: ['Microservices, API-first, Cloud-native, Headless', 'Mainframe, Automation, Control, Hosting', 'Modular, Asynchronous, Core, Hypervisor'], correct: 0, exp: 'MACH désigne les principes modernes de conception logicielle composable et découplée.' },
    { stem: 'Quelle cause d’échec est statistiquement la plus fréquente lors de l’implémentation d’un ERP ?', opts: ['La résistance au changement des utilisateurs et l’absence de formation adéquate', 'La destruction physique des ordinateurs', 'La pénurie de papier pour imprimante'], correct: 0, exp: 'Les facteurs humains et organisationnels (conduite du changement) sont la première cause d’échec des projets ERP.' },
    { stem: 'Qu’est-ce que l’ERP Composable (Composable ERP) ?', opts: ['Un écosystème modulaire de briques logicielles spécialisées interconnectées par des API', 'Un ERP qui ne fonctionne que sur téléphone portable', 'Un logiciel sans aucune base de données'], correct: 0, exp: 'L’ERP composable assemble les meilleurs composants logiciels spécialisés plutôt que d’imposer un monolithe rigide.' }
  ],

  pitfalls: [
    'Choisir une bascule Big Bang sans plan de repli (Rollback) ni répétition générale préalable.',
    'Sous-estimer l’effort de nettoyage et de déduplication des données historiques avant la migration dans le nouvel ERP.',
    'Multiplier les développements spécifiques (customisations) au détriment des standards de l’éditeur, rendant les futures montées de version quasi impossibles.',
    'Négliger la conduite du changement et former les utilisateurs à la hâte quelques jours avant le démarrage.',
    'Considérer que le passage au Cloud SaaS dispense l’entreprise de définir des politiques de sauvegarde et de gouvernance des données.'
  ],

  methodTitle: 'Piloter et sécuriser un déploiement ERP',
  method: [
    '<strong>Constituer une équipe projet transverse</strong> : réunir des représentants métiers clés (Key Users) et des experts techniques de la DSI.',
    '<strong>Adopter une approche Fit/Gap</strong> : comparer les processus réels de l’entreprise aux standards de l’ERP pour limiter les développements spécifiques.',
    '<strong>Établir la matrice des risques</strong> : recenser les risques d’implémentation, calculer leur criticité et définir des actions préventives et plans de contingence.',
    '<strong>Structurer la recette UAT</strong> : rédiger des scénarios de test complets de bout en bout simulant les cas réels les plus complexes.',
    '<strong>Prévoir la période d’Hypercare</strong> : mobiliser les équipes d’intégration et d’assistance renforcée dès le lendemain du Go-Live pour corriger immédiatement les anomalies.'
  ],

  summary: [
    'Le choix entre On-Premise (Capex) et SaaS (Opex) s’évalue par un calcul de TCO global incluant maintenance et administration.',
    'La réussite d’un projet ERP repose sur la conduite du changement, la qualité de la migration des données et la rigueur de la recette UAT.',
    'La gestion des risques par matrice de criticité permet d’anticiper les dérives calendaires et organisationnelles.',
    'L’urbanisation du SI organise les blocs applicatifs pour éviter les redondances et maîtriser la dette technique.',
    'L’avenir s’oriente vers l’ERP composable (architecture MACH) et l’intégration de fonctionnalités d’IA générative et prédictive.'
  ],

  checklist: [
    'Je comprends les différences de coûts et d’exploitation entre On-Premise et Cloud SaaS.',
    'Je connais les 6 phases d’un projet d’implémentation ERP.',
    'Je sais évaluer la criticité d’un risque projet (P &times; G).',
    'Je maîtrise les principes de l’urbanisation du système d’information.',
    'Je sais expliquer ce qu’est un ERP composable et l’architecture MACH.'
  ],

  notions: ['SaaS', 'On-Premise', 'TCO', 'Capex', 'Opex', 'Big Bang', 'Phasing', 'UAT', 'Matrice des risques', 'Urbanisation', 'Composable ERP', 'MACH'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les phases du projet ERP et les concepts Capex/Opex.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la matrice des risques et les stratégies de bascule.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les enjeux stratégiques et d’urbanisation des ERP.' },
    { cls: 'top', text: '≥ 95 % — Parfait : vous êtes prêt pour les examens blancs et l’étude de cas complète !' }
  ],

  flashcards: [
    { q: 'Quelle est la différence fondamentale entre Capex et Opex ?', a: 'Le Capex correspond aux dépenses d’investissement en capital (immobilisations), tandis que l’Opex représente les dépenses d’exploitation récurrentes.' },
    { q: 'Quels sont les avantages et inconvénients majeurs d’une bascule Big Bang ?', a: 'Avantages : bascule rapide, pas de coût d’interfaçage temporaire. Inconvénients : risque maximal d’arrêt d’activité si un problème survient.' },
    { q: 'Comment calcule-t-on la criticité d’un risque dans une matrice projet ?', a: 'Criticité = Probabilité d’occurrence (P) &times; Gravité / Impact (G).' },
    { q: 'Quel est l’objectif principal de l’urbanisation du système d’information ?', a: 'Découper le SI en blocs applicatifs modulaires et découplés pour éliminer les redondances et faciliter les évolutions.' },
    { q: 'Que désignent les 4 lettres de l’architecture MACH ?', a: 'Microservices, API-first, Cloud-native et Headless.' },
    { q: 'Pourquoi la migration des données (Data Migration) est-elle une phase à haut risque ?', a: 'Parce que des données historiques corrompues, incomplètes ou doublonnées dans l’ancien système paralyseront immédiatement le nouvel ERP.' }
  ],

  next: {
    href: 'examens.html',
    label: 'Examens blancs &amp; Études de cas'
  }
};
