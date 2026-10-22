/**
 * Chapitre 1 du cours « ERP & SI » B2 — Système d'Information & Progiciel de Gestion Intégré.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Système d’Information & Progiciel de Gestion Intégré',
  short: 'SI & ERP',
  toc: 'Les 5 composantes du SI, définition et caractéristiques d’un ERP, rupture des silos applicatifs et coût total de possession (TCO).',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Dans beaucoup d’entreprises en croissance, chaque département utilise ses propres logiciels isolés : ' +
    'la compta sur un outil, les commerciaux sur un fichier Excel, l’entrepôt sur un logiciel sur mesure. ' +
    'Cette fragmentation crée des ressaisies, des erreurs de stock et des retards critiques. ' +
    'L’ERP unifie l’ensemble de ces flux au sein d’une base de données unique et cohérente.',

  objectives: [
    'définir un Système d’Information (SI) et ses 5 composantes fondamentales ;',
    'comprendre le rôle stratégique et les caractéristiques d’un ERP (PGI) ;',
    'identifier les inconvénients majeurs des silos d’information applicatifs ;',
    'analyser le principe de la base de données unique et de la traçabilité intégrée ;',
    'calculer et évaluer le coût total de possession (TCO) d’un projet d’ERP.'
  ],

  sections: [
    {
      title: 'Qu’est-ce qu’un Système d’Information (SI) ?',
      html: [
        '<p>Un <strong>Système d’Information (SI)</strong> est un ensemble organisé de ressources permettant ' +
        'd’acquérir, de traiter, de stocker et de diffuser l’information au bon moment, sous la bonne forme ' +
        'et à la bonne personne au sein de l’organisation.</p>',
        '<p>Le SI repose sur <strong>5 composantes indissociables</strong> :</p>',
        '<ul>\n' +
        '  <li><strong>Matériel (Hardware)</strong> : serveurs, postes de travail, équipements réseau, terminaux codes-barres.</li>\n' +
        '  <li><strong>Logiciel (Software)</strong> : progiciels, systèmes d’exploitation, bases de données, applications métiers.</li>\n' +
        '  <li><strong>Données (Data)</strong> : référentiel clients, catalogue articles, commandes, écritures comptables.</li>\n' +
        '  <li><strong>Humain (People)</strong> : utilisateurs finaux, administrateurs système, managers, consultants intégrateurs.</li>\n' +
        '  <li><strong>Processus (Processes)</strong> : règles de gestion, procédures d’achat, flux de validation et de facturation.</li>\n' +
        '</ul>',
        box('intuition', 'Le SI n’est pas qu’informatique', 'lightbulb',
          '    <p>Une erreur fréquente consiste à réduire le SI au parc d’ordinateurs. ' +
          'Une procédure papier de validation ou un tableau blanc de suivi d’atelier font partie ' +
          'intégrante du Système d’Information avant même d’être informatisés.</p>')
      ].join('\n')
    },
    {
      title: 'Définition et caractéristiques clés d’un ERP (PGI)',
      html: [
        '<p>L’acronyme <strong>ERP</strong> (<em>Enterprise Resource Planning</em>), traduit en français par ' +
        '<strong>PGI</strong> (<em>Progiciel de Gestion Intégré</em>), désigne une solution logicielle ' +
        'qui gère et intègre l’ensemble des fonctions opérationnelles d’une entreprise.</p>',
        '<p>Pour être qualifié d’ERP au sens strict, un logiciel doit présenter 4 caractéristiques fondamentales :</p>',
        '<ol>\n' +
        '  <li><strong>Base de données unique</strong> : toutes les applications partagent le même schéma relationnel. Une donnée modifiée à un endroit est immédiatement visible partout sans synchronisation différée.</li>\n' +
        '  <li><strong>Architecture modulaire</strong> : chaque grand domaine métier (Finance, Ventes, Achats, Stocks, RH) constitue un module interconnecté.</li>\n' +
        '  <li><strong>Traçabilité et auditabilité totales</strong> : toute opération (qui, quoi, quand) est historisée, garantissant l’intégrité comptable et légale.</li>\n' +
        '  <li><strong>Moteur de Workflow intégré</strong> : l’information circule automatiquement d’un service à l’autre selon les processus de l’entreprise.</li>\n' +
        '</ol>',
        box('tech', 'Les grands acteurs du marché ERP', 'code',
          '    <p>Sur le marché des ERP d’entreprise, on distingue les solutions propriétaires pour grands comptes ' +
          '(<strong>SAP S/4HANA</strong>, <strong>Oracle Cloud ERP</strong>, <strong>Microsoft Dynamics 365</strong>) ' +
          'et les solutions open source ou adaptées aux PME (<strong>Odoo</strong>, <strong>ERPNext</strong>, <strong>Dolibarr</strong>).</p>')
      ].join('\n')
    },
    {
      title: 'La fin des silos d’information applicatifs',
      html: [
        '<p>Avant l’adoption d’un ERP, chaque service utilise son propre logiciel spécialisé (logiciel de paie, ' +
        'tableur commercial, outil de stock séparé). Cette situation d’<strong>îlots applicatifs (silos)</strong> ' +
        'génère des coûts et des risques considérables :</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>Problématique des silos</th><th>Solution apportée par l’ERP</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td>Ressaisies manuelles multiples</td><td>Saisie unique à la source transmise automatiquement aux modules suivants.</td></tr>\n' +
        '    <tr><td>Données contradictoires (ex. deux adresses clients différentes)</td><td>Référentiel unique (<em>Master Data</em> / Données de référence partagées).</td></tr>\n' +
        '    <tr><td>Manque de visibilité globale pour la direction</td><td>Tableaux de bord unifiés et reporting consolidé en temps réel.</td></tr>\n' +
        '    <tr><td>Lenteur de transmission entre départements</td><td>Workflows automatisés déclenchant les étapes suivantes sans délai.</td></tr>\n' +
        '  </tbody>\n' +
        '</table>',
        box('warn', 'Piège : Croire que l’ERP résout seul les problèmes d’organisation', 'shield',
          '    <p>Informatiser un mauvais processus produit simplement un mauvais processus automatisé plus rapide. ' +
          'Le succès d’un ERP repose à 80% sur la clarification des processus métiers et la conduite du changement, ' +
          'et seulement à 20% sur la technologie logicielle.</p>')
      ].join('\n')
    },
    {
      title: 'Économie du projet : Le Coût Total de Possession (TCO)',
      html: [
        '<p>Le coût d’un ERP ne se limite jamais au prix d’achat des licences logicielles. ' +
        'L’évaluation financière d’un SI s’effectue par le calcul du <strong>TCO</strong> (<em>Total Cost of Ownership</em>) ' +
        'sur un horizon standard de 5 ans.</p>',
        '<p>Le TCO additionne deux grandes catégories de dépenses :</p>',
        '<ul>\n' +
        '  <li><strong>Investissement initial (CAPEX)</strong> : licences d’acquisition ou frais de setup, intégration et paramétrage par l’ESN, migration des données historiques, et formation initiale du personnel.</li>\n' +
        '  <li><strong>Coûts récurrents d’exploitation (OPEX)</strong> : redevance de maintenance logicielle annuelle (généralement 18% à 22% du prix licence), hébergement cloud / serveurs, support technique et mises à jour de version.</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelles sont les 5 composantes fondamentales d’un Système d’Information ?', opts: ['Matériel, Logiciel, Données, Humain, Processus', 'CPU, RAM, Disque dur, Écran, Clavier', 'Ventes, Achats, Stocks, Factures, Clients'], correct: 0, exp: 'Le SI englobe les ressources techniques, les données, les acteurs humains et les processus métiers.' },
    { stem: 'Quelle caractéristique distingue formellement un ERP d’un ensemble de logiciels séparés ?', opts: ['Une base de données unique partagée entre tous les modules', 'Une interface graphique obligatoirement en 3D', 'L’absence totale de mot de passe'], correct: 0, exp: 'L’unicité de la base de données est la caractéristique technique essentielle d’un ERP.' },
    { stem: 'Qu’est-ce qu’un « silo d’information » dans une entreprise ?', opts: ['Un service ou logiciel fonctionnant en vase clos sans communiquer avec les autres', 'Une salle de serveurs blindée', 'Un entrepôt de stockage de matières premières'], correct: 0, exp: 'Les silos applicatifs isolent les données départementales et créent des incohérences.' },
    { stem: 'Que signifie l’acronyme français PGI ?', opts: ['Progiciel de Gestion Intégré', 'Protocole Général Informatique', 'Processus Global d’Interconnexion'], correct: 0, exp: 'PGI est la traduction officielle française d’ERP (Enterprise Resource Planning).' },
    { stem: 'Que représente le TCO (Total Cost of Ownership) d’un ERP ?', opts: ['L’ensemble des coûts d’acquisition et d’exploitation sur le cycle de vie du système', 'Uniquement le prix d’achat des licences logicielles', 'Le salaire du directeur des systèmes d’information'], correct: 0, exp: 'Le TCO englobe l’investissement initial (licences, intégration, formation) et les coûts récurrents sur 5 ans.' },
    { stem: 'Lequel de ces progiciels est un ERP open source populaire ?', opts: ['Odoo', 'Photoshop', 'Google Chrome'], correct: 0, exp: 'Odoo (anciennement OpenERP) est l’un des ERP open source les plus déployés au monde.' },
    { stem: 'Dans un ERP, que se passe-t-il lorsqu’un commercial valide une commande client ?', opts: ['Le stock est réservé et la comptabilité peut préparer la facturation sans ressaisie', 'Le commercial doit réécrire la commande dans un carnet papier', 'L’ERP s’éteint pour enregistrer'], correct: 0, exp: 'L’intégration automatique propage immédiatement l’événement aux modules logistique et financier.' },
    { stem: 'Pourquoi la formation des utilisateurs représente-t-elle un poste budgétaire crucial ?', opts: ['Pour vaincre la résistance au changement et garantir la bonne utilisation du progiciel', 'Car les éditeurs refusent d’installer le logiciel sinon', 'Pour remplacer tous les ordinateurs portables'], correct: 0, exp: 'L’adhésion des équipes et la maîtrise des nouveaux processus conditionnent la réussite du projet.' }
  ],

  pitfalls: [
    'Confondre un ERP avec un simple logiciel de comptabilité ou de facturation autonome.',
    'Négliger la conduite du changement en pensant que le logiciel s’adoptera de lui-même.',
    'Calculer le budget en ne prenant en compte que le prix des licences (oubli de l’intégration et de la maintenance).',
    'Vouloir adapter l’ERP à 100% à toutes les vieilles habitudes plutôt que d’adopter les meilleures pratiques standards.',
    'Conserver des fichiers Excel parallèles pour gérer des données critiques (réapparition des silos cachés).'
  ],

  methodTitle: 'Auditer l’opportunité de déploiement d’un ERP',
  method: [
    '<strong>Cartographier les flux existants</strong> : identifier les applications utilisées et les points de ressaisie.',
    '<strong>Évaluer les coûts des silos</strong> : chiffrer les temps perdus, les erreurs de stock et les litiges clients.',
    '<strong>Définir le périmètre fonctionnel</strong> : cibler les modules prioritaires (Finance, Ventes, Stocks).',
    '<strong>Calculer le TCO prévisionnel</strong> : sommer licences, intégration, formation et maintenance sur 5 ans.',
    '<strong>Mesurer le retour sur investissement (ROI)</strong> : estimer les gains de productivité et la réduction des délais.'
  ],

  summary: [
    'Le SI articule 5 composantes : Matériel, Logiciel, Données, Humain et Processus.',
    'L’ERP (PGI) intègre les processus clés de l’entreprise autour d’une base de données unique.',
    'Il élimine les silos d’information, les doubles saisies et garantit une traçabilité totale.',
    'Le calcul économique d’un ERP s’évalue par son TCO global sur 5 ans (CAPEX + OPEX).',
    'La réussite d’un projet ERP repose avant tout sur l’alignement des processus et la conduite du changement.'
  ],

  checklist: [
    'Je connais la définition et les 5 composantes d’un Système d’Information.',
    'Je sais expliquer ce qu’est un ERP et ses caractéristiques fondamentales.',
    'Je comprends les inconvénients des silos d’information applicatifs.',
    'Je sais identifier les principaux acteurs du marché des progiciels de gestion.',
    'Je sais décomposer les éléments constitutifs du calcul du TCO d’un ERP.'
  ],

  notions: ['Système d’Information', 'ERP', 'PGI', 'Base de données unique', 'Silos d’information', 'Master Data', 'TCO', 'Modularité', 'Traçabilité', 'Conduite du changement'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les 5 composantes du SI et la définition d’un ERP.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les caractéristiques d’un PGI et le calcul du TCO.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les principes architecturaux et économiques du SI.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à l’automatisation des processus au chapitre 2.' }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « Silos d’information » ?', a: 'identifier les inconvénients majeurs des silos d’information applicatifs ;' },
      { q: 'Qu’est-ce que « Master Data » ?', a: 'Référentiel unique ( Master Data / Données de référence partagées).' },
      { q: 'Qu’est-ce que « Modularité » ?', a: 'Modularité : ERP & SI B2 › Sommaire › Chapitre 1' },
      { q: 'Qu’est-ce que « Circuit d’approbation » ?', a: 'Circuit d’approbation : concevoir des circuits de workflow d’approbation avec règles d’aiguillage hiérarchiques ;' },
      { q: 'Qu’est-ce que « EAI » ?', a: 'L’ERP ne vit jamais seul : il doit dialoguer avec les banques, les sites e-commerce, les applications logistiques des transporteurs et les logiciels RH. Concevoir ces passerelles de façon anarchique mène à une « architecture spaghetti » indémêlable. Les architectures EAI et ESB s' },
      { q: 'Qu’est-ce que « iPaaS » ?', a: 'comparer les topologies d’intégration (Point-à-Point, Hub & Spoke, ESB, iPaaS) ;' },
      { q: 'Qu’est-ce que « XML » ?', a: 'maîtriser le concept de format pivot pour la transformation des messages (EDI, XML, JSON) ;' },
      { q: 'Qu’est-ce que « Chaîne de valeur » ?', a: 'analyser la chaîne de valeur de Michael Porter et distinguer activités principales et de soutien ;' },
      { q: 'Qu’est-ce que « P2P » ?', a: 'maîtriser le déroulement complet du cycle Procure-to-Pay (P2P / Achats) ;' },
      { q: 'Qu’est-ce que « O2C » ?', a: 'maîtriser le déroulement complet du cycle Order-to-Cash (O2C / Ventes) ;' },
      { q: 'Qu’est-ce que « CBN » ?', a: 'CBN : ERP & SI B2 › Sommaire › Chapitre 4' },
      { q: 'Qu’est-ce que « PMP » ?', a: 'comprendre les mécanismes de valorisation des stocks (CMUP / PMP et FIFO) ;' },
      { q: 'Qu’est-ce que « LIFO » ?', a: 'LIFO (Last In, First Out / DEPS) : les derniers articles entrés sortent les premiers (interdit par les normes IFRS et la fiscalité française car sous-évaluant les stocks en période d’inflation).' },
      { q: 'Qu’est-ce que « EOQ » ?', a: 'La formule de Wilson calcule la quantité économique de commande ( EOQ - Economic Order Quantity ) qui minimise la somme des coûts de commande et des coûts de possession du stock :' },
      { q: 'Qu’est-ce que « SaaS » ?', a: 'Le choix d’un ERP et son implémentation constituent l’un des investissements les plus stratégiques et risqués pour une organisation. Du modèle d’hébergement (SaaS vs On-Premise) à la gestion des risques projet (conduite du changement, dépassements budgétaires), en passant par l’u' },
      { q: 'Qu’est-ce que « Phasing » ?', a: 'Déploiement par étapes (Phasing / Pilote) : mise en production progressive par module (ex. d’abord la Finance, puis les Stocks) ou par entité géographique (filiale pilote). Risque opérationnel maîtrisé, mais gestion transitoire complexe d’interfaces temporaires entre l’ancien et ' },
    { q: 'Quelles sont les 5 composantes du SI ?', a: 'Matériel, Logiciel, Données, Humain et Processus.' },
    { q: 'Quelle est la caractéristique technique centrale d’un ERP ?', a: 'Une base de données unique partagée entre tous les modules métiers.' },
    { q: 'Qu’est-ce qu’un PGI ?', a: 'Progiciel de Gestion Intégré (traduction française d’ERP).' },
    { q: 'Qu’appelle-t-on silo d’information ?', a: 'Un système ou service fonctionnant de façon isolée, créant des données redondantes ou contradictoires.' },
    { q: 'Que comprend le TCO sur 5 ans d’un ERP ?', a: 'L’investissement initial (licences, intégration, formation) + les coûts récurrents sur 5 ans (maintenance, hébergement, support).' },
    { q: 'Cite deux ERP open source d’entreprise.', a: 'Odoo et ERPNext (ou Dolibarr).' }
  ],

  next: {
    href: 'chapitre2.html',
    label: 'Chapitre 2 : Automatisation des processus & RPA'
  }
};
