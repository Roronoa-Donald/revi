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
    'Un ERP peut intégrer ces flux autour de données partagées, avec une qualité qui dépend aussi des processus et du paramétrage.',

  objectives: [
    'définir un Système d’Information (SI) et ses 5 composantes fondamentales ;',
    'comprendre le rôle stratégique et les caractéristiques d’un ERP (PGI) ;',
    'identifier les inconvénients majeurs des silos d’information applicatifs ;',
    'analyser les données partagées et les possibilités de traçabilité intégrée ;',
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
        '<p>Un ERP présente généralement les caractéristiques suivantes, dont les modalités dépendent de la solution et du paramétrage :</p>',
        '<ol>\n' +
        '  <li><strong>Données partagées</strong> : les modules utilisent des informations et définitions communes. Une base commune est fréquente, mais l’architecture et les délais de synchronisation peuvent varier.</li>\n' +
        '  <li><strong>Architecture modulaire</strong> : chaque grand domaine métier (Finance, Ventes, Achats, Stocks, RH) constitue un module interconnecté.</li>\n' +
        '  <li><strong>Traçabilité</strong> : des journaux peuvent enregistrer les opérations selon les fonctions et réglages. Ils ne garantissent pas à eux seuls la conformité ou l’intégrité.</li>\n' +
        '  <li><strong>Workflows intégrés</strong> : l’information peut circuler entre services selon les processus et règles configurés.</li>\n' +
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
        '    <tr><td>Ressaisies manuelles multiples</td><td>Une saisie partagée peut réduire les ressaisies selon l’intégration configurée.</td></tr>\n' +
        '    <tr><td>Données contradictoires (ex. deux adresses clients différentes)</td><td>Référentiel unique (<em>Master Data</em> / Données de référence partagées).</td></tr>\n' +
        '    <tr><td>Manque de visibilité globale pour la direction</td><td>Tableaux de bord consolidés, selon les données et leurs délais de mise à jour.</td></tr>\n' +
        '    <tr><td>Lenteur de transmission entre départements</td><td>Workflows pouvant déclencher les étapes configurées.</td></tr>\n' +
        '  </tbody>\n' +
        '</table>',
        box('warn', 'Piège : Croire que l’ERP résout seul les problèmes d’organisation', 'shield',
          '    <p>Informatiser un mauvais processus produit simplement un mauvais processus automatisé plus rapide. ' +
          'La clarification des processus et la conduite du changement comptent, tout comme le choix et le paramétrage techniques.</p>')
      ].join('\n')
    },
    {
      title: 'Économie du projet : Le Coût Total de Possession (TCO)',
      html: [
        '<p>Le coût d’un ERP ne se limite jamais au prix d’achat des licences logicielles. ' +
        'L’évaluation financière d’un SI s’effectue par le calcul du <strong>TCO</strong> (<em>Total Cost of Ownership</em>) ' +
        'sur un horizon défini par l’organisation ; les exercices utilisent cinq ans.</p>',
        '<p>Le TCO additionne deux grandes catégories de dépenses :</p>',
        '<ul>\n' +
        '  <li><strong>Investissement initial (CAPEX)</strong> : licences d’acquisition ou frais de setup, intégration et paramétrage par l’ESN, migration des données historiques, et formation initiale du personnel.</li>\n' +
        '  <li><strong>Coûts récurrents d’exploitation (OPEX)</strong> : maintenance, hébergement cloud / serveurs, support technique et mises à jour, selon les contrats.</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelles sont les cinq composantes du SI dans le modèle du cours ?', opts: ['Matériel, Logiciel, Données, Humain, Processus', 'CPU, RAM, Disque dur, Écran, Clavier', 'Ventes, Achats, Stocks, Factures, Clients'], correct: 0, exp: 'Le modèle associe ressources techniques, données, personnes et processus. La deuxième liste ne décrit que du matériel ; la troisième rassemble des activités et données, pas les cinq composantes.' },
    { stem: 'Quelle caractéristique décrit le mieux un ERP ?', opts: ['L’intégration de processus et de données entre plusieurs fonctions métier', 'Une interface graphique obligatoirement en 3D', 'L’absence totale de mot de passe'], correct: 0, exp: 'Un ERP relie des fonctions métier et des données ; ni la 3D ni l’absence de mot de passe ne sont nécessaires. L’architecture de stockage peut varier.' },
    { stem: 'Qu’est-ce qu’un « silo d’information » dans une entreprise ?', opts: ['Un service ou logiciel fonctionnant en vase clos sans communiquer avec les autres', 'Une salle de serveurs blindée', 'Un entrepôt de stockage de matières premières'], correct: 0, exp: 'Un silo isole l’information et peut produire des incohérences ; une salle de serveurs et un entrepôt physique ne désignent pas cet isolement.' },
    { stem: 'Que signifie l’acronyme français PGI ?', opts: ['Progiciel de Gestion Intégré', 'Protocole Général Informatique', 'Processus Global d’Interconnexion'], correct: 0, exp: 'PGI signifie progiciel de gestion intégré ; les deux autres expansions proposées ne correspondent pas à cet acronyme.' },
    { stem: 'Que représente le TCO (Total Cost of Ownership) d’un ERP ?', opts: ['L’ensemble des coûts d’acquisition et d’exploitation sur le cycle de vie du système', 'Uniquement le prix d’achat des licences logicielles', 'Le salaire du directeur des systèmes d’information'], correct: 0, exp: 'Le TCO additionne les coûts pertinents sur l’horizon retenu. Le seul prix des licences ou un seul salaire ne représentent pas l’ensemble.' },
    { stem: 'Lequel de ces progiciels est un ERP proposant une édition communautaire open source ?', opts: ['Odoo', 'Photoshop', 'Google Chrome'], correct: 0, exp: 'Odoo propose une édition communautaire open source ; Photoshop est un logiciel de création graphique et Chrome un navigateur.' },
    { stem: 'Dans un ERP configuré pour partager les commandes entre ventes, stock et comptabilité, quel bénéfice peut-on attendre ?', opts: ['Les services peuvent exploiter la commande partagée sans ressaisie systématique', 'Le commercial doit réécrire chaque commande sur papier', 'L’ERP doit s’éteindre pour enregistrer'], correct: 0, exp: 'Le partage configuré peut réduire les ressaisies. Il ne nécessite ni recopie systématique sur papier ni arrêt du système ; les étapes exactes dépendent du paramétrage.' },
    { stem: 'Pourquoi prévoir une formation des utilisateurs ?', opts: ['Pour accompagner le changement et la prise en main du progiciel', 'Car tous les éditeurs refusent sinon l’installation', 'Pour remplacer tous les ordinateurs portables'], correct: 0, exp: 'La formation aide à comprendre les nouveaux processus sans garantir à elle seule leur adoption. Les deux autres propositions ne décrivent pas son objectif.' }
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
    'L’ERP (PGI) intègre plusieurs processus et données métier.',
    'Il peut réduire les silos et ressaisies ; la traçabilité dépend des fonctions et réglages.',
    'Le TCO additionne les coûts pertinents sur un horizon choisi, ici cinq ans.',
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
    { q: 'Quelles sont les 5 composantes du SI ?', a: 'Matériel, Logiciel, Données, Humain et Processus.' },
    { q: 'Quelle est une caractéristique centrale d’un ERP ?', a: 'L’intégration de processus et de données entre plusieurs fonctions métier ; une base commune est fréquente, sans être une garantie de synchronisation immédiate.' },
    { q: 'Qu’est-ce qu’un PGI ?', a: 'Progiciel de Gestion Intégré (traduction française d’ERP).' },
    { q: 'Qu’appelle-t-on silo d’information ?', a: 'Un système ou service fonctionnant de façon isolée, créant des données redondantes ou contradictoires.' },
    { q: 'Que comprend le TCO sur 5 ans d’un ERP ?', a: 'L’investissement initial (licences, intégration, formation) + les coûts récurrents sur 5 ans (maintenance, hébergement, support).' },
    { q: 'Citez deux ERP open source d’entreprise.', a: 'Odoo et ERPNext (ou Dolibarr).' }
  ],

  next: {
    href: 'chapitre2.html',
    label: 'Chapitre 2 : Automatisation des processus & RPA'
  }
};
