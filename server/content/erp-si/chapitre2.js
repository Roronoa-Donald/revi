/**
 * Chapitre 2 du cours « ERP & SI » B2 — Automatisation des processus & RPA.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Automatisation des processus & RPA',
  short: 'Automatisation & RPA',
  toc: 'Modélisation BPMN, moteurs de workflows d’approbation, circuits de validation hiérarchiques et Robotic Process Automation (RPA).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Remplir des bordereaux, transférer manuellement des pièces jointes ou attendre la signature d’un directeur ' +
    'par email bloque la fluidité des opérations. Les entreprises automatisent ces tâches répétitives ' +
    'à l’aide de moteurs de Workflow intégrés à l’ERP et de robots logiciels RPA.',

  objectives: [
    'comprendre le Business Process Management (BPM) et la notation BPMN standard ;',
    'concevoir des circuits de workflow d’approbation avec règles d’aiguillage hiérarchiques ;',
    'définir la Robotic Process Automation (RPA) et ses cas d’application privilégiés ;',
    'différencier un robot assisté (Attended) d’un robot autonome (Unattended) ;',
    'mesurer les gains de productivité et de réduction des taux d’erreur de l’automatisation.'
  ],

  sections: [
    {
      title: 'Modélisation des processus métiers avec BPMN',
      html: [
        '<p>Le <strong>BPM</strong> (<em>Business Process Management</em>) est une démarche d’entreprise visant ' +
        'à modéliser, exécuter et optimiser les processus opérationnels. Pour formaliser ces flux sans ambiguïté, ' +
        'le standard mondial est la norme <strong>BPMN 2.0</strong> (<em>Business Process Model and Notation</em>).</p>',
        '<p>Un schéma BPMN standard s’articule autour de quatre familles d’éléments graphiques :</p>',
        '<ul>\n' +
        '  <li><strong>Événements (Events)</strong> : cercles marquant le début, la fin ou un jalon intermédiaire du processus (ex. réception d’un bon de commande).</li>\n' +
        '  <li><strong>Activités / Tâches (Activities)</strong> : rectangles à bords arrondis représentant une action concrète réalisée par un humain ou un système.</li>\n' +
        '  <li><strong>Passerelles (Gateways)</strong> : losanges représentant des embranchements décisionnels conditionnels (passerelle exclusive XOR, parallèle AND, inclusive OR).</li>\n' +
        '  <li><strong>Couloirs et Piscines (Pools &amp; Lanes)</strong> : délimitent les responsabilités des différents acteurs ou services (Comptabilité, Logistique, Commercial).</li>\n' +
        '</ul>',
        box('intuition', 'Pourquoi standardiser avec BPMN ?', 'lightbulb',
          '    <p>Le BPMN sert de langage commun universel : il est à la fois lisible par les directeurs ' +
          'métiers pour comprendre leurs processus et directement exécutable par les moteurs d’orchestration ' +
          'd’ERP pour automatiser les transitions.</p>')
      ].join('\n')
    },
    {
      title: 'Moteurs de Workflow et circuits de validation',
      html: [
        '<p>Un <strong>Workflow</strong> (flux de travail) est la représentation opérationnelle d’un processus ' +
        'au sein de l’ERP : il orchestre la transmission séquentielle ou parallèle des tâches d’un collaborateur à un autre.</p>',
        '<p>Exemple classique : le <strong>circuit de validation d’une dépense</strong> :</p>',
        '<ol>\n' +
        '  <li>L’employé soumet une demande d’achat avec justificatif.</li>\n' +
        '  <li>L’ERP évalue le montant face aux règles de gestion paramétrées :<br>' +
        '      - Si &le; 500 € : approbation automatique sans délai.<br>' +
        '      - Si &le; 5 000 € : notification au Manager direct pour validation.<br>' +
        '      - Si &le; 50 000 € : validation obligatoire du Directeur de département.<br>' +
        '      - Au-delà : escalade vers la Direction Générale.</li>\n' +
        '  <li>Dès approbation, l’ERP génère automatiquement le bon de commande fournisseur.</li>\n' +
        '</ol>',
        box('tech', 'Gains concrets d’un moteur de workflow', 'code',
          '    <ul>\n' +
          '      <li><strong>Zéro document égaré</strong> : l’historique est rattaché à l’objet ERP avec horodatage.</li>\n' +
          '      <li><strong>Alertes de délai (SLA)</strong> : relances automatiques en cas de retard de signature.</li>\n' +
          '      <li><strong>Délégation d’autorité</strong> : gestion des remplaçants en cas de congés ou d’absence.</li>\n' +
          '    </ul>')
      ].join('\n')
    },
    {
      title: 'La Robotic Process Automation (RPA)',
      html: [
        '<p>La <strong>RPA</strong> (<em>Robotic Process Automation</em>) utilise des robots logiciels ' +
        '(ou « bots ») pour imiter les actions humaines répétitives sur l’interface utilisateur des applications : ' +
        'cliquer sur des boutons, copier-coller des données, extraire des textes de PDF, saisir des écritures.</p>',
        '<p>La RPA est particulièrement puissante pour combler les manques entre des applications ' +
        'anciennes (legacy) sans API et le nouvel ERP central.</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>Critère</th><th>Workflow ERP</th><th>Robotic Process Automation (RPA)</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td>Nature de l’action</td><td>Orchestre les tâches humaines et les données natives.</td><td>Exécutez des tâches informatiques répétitives à la place de l’humain.</td></tr>\n' +
        '    <tr><td>Niveau d’intégration</td><td>Profond (au cœur de la base et du modèle ERP).</td><td>Superficiel (via l’interface graphique UI ou connecteurs légers).</td></tr>\n' +
        '    <tr><td>Délai de déploiement</td><td>Moyen à long (paramétrage métier complet).</td><td>Très rapide (quelques jours à semaines par scénario).</td></tr>\n' +
        '  </tbody>\n' +
        '</table>'
      ].join('\n')
    },
    {
      title: 'Robots assistés (Attended) vs non assistés (Unattended)',
      html: [
        '<p>On distingue deux modes fondamentaux de déploiement RPA :</p>',
        '<ul>\n' +
        '  <li><strong>Robot assisté (Attended)</strong> : s’exécute sur le poste de travail de l’utilisateur à sa demande. ' +
        'Le robot fait office d’assistant personnel (ex. remplir un formulaire complexe pendant que le téléopérateur répond au client).</li>\n' +
        '  <li><strong>Robot autonome (Unattended)</strong> : s’exécute sur une machine virtuelle dédiée dans le datacenter ' +
        'sans aucune intervention humaine. Il est déclenché par un événement système (arrivée d’un email avec facture PDF, ' +
        'planification nocturne) et traite des volumes massifs 24h/24.</li>\n' +
        '</ul>',
        box('warn', 'Les limites de la RPA', 'shield',
          '    <p>La RPA est fragile aux changements d’interface : si un bouton change de place ou de libellé ' +
          'dans un logiciel web, le robot peut échouer. Elle ne remplace pas une intégration par API ou ESB ' +
          'lorsque celle-ci est techniquement envisageable.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que signifie l’acronyme BPMN ?', opts: ['Business Process Model and Notation', 'Basic Protocol Machine Network', 'Binary Program Management Node'], correct: 0, exp: 'BPMN est le standard international de modélisation visuelle des processus métiers.' },
    { stem: 'Dans un diagramme BPMN, quel symbole représente une passerelle de décision conditionnelle ?', opts: ['Un losange (Gateway)', 'Un cercle (Event)', 'Un rectangle (Task)'], correct: 0, exp: 'Les losanges (Gateways) représentent les embranchements logiques (ex. XOR, AND).' },
    { stem: 'Qu’est-ce qu’un moteur de Workflow dans un ERP ?', opts: ['Un composant qui orchestre la circulation automatique des tâches et des approbations', 'Un moteur de rendu 3D', 'Un outil de défragmentation du disque dur'], correct: 0, exp: 'Le workflow guide la transmission des dossiers selon les règles organisationnelles.' },
    { stem: 'Que signifie l’acronyme RPA ?', opts: ['Robotic Process Automation', 'Rapid Protocol Architecture', 'Regional Process Alliance'], correct: 0, exp: 'Robotic Process Automation désigne l’automatisation des tâches logicielles répétitives par des robots.' },
    { stem: 'Quelle est la particularité d’un robot RPA « Unattended » (non assisté) ?', opts: ['Il s’exécute de manière autonome en arrière-plan sans intervention humaine', 'Il exige qu’un humain tape au clavier en permanence', 'Il ne fonctionne que sur smartphone'], correct: 0, exp: 'Les bots Unattended tournent 24h/24 sur serveurs pour traiter des flux de fond.' },
    { stem: 'Pourquoi un circuit de validation basé sur le montant est-il bénéfique pour l’entreprise ?', opts: ['Il fluidifie les petites dépenses tout en contrôlant rigoureusement les engagements majeurs', 'Il interdit totalement d’acheter du matériel', 'Il supprime le rôle de la comptabilité'], correct: 0, exp: 'Les petits montants sont validés sans engorger la direction, qui se concentre sur les montants élevés.' },
    { stem: 'Quel est le point faible majeur d’une automatisation par RPA sur interface graphique (UI) ?', opts: ['La sensibilité aux modifications visuelles des logiciels pilotés', 'Le coût excessif du papier', 'L’impossibilité de traiter des fichiers texte'], correct: 0, exp: 'Si l’UI d’une application cible change, le bot graphique risque de ne plus trouver ses cibles.' },
    { stem: 'Que permet de tracer un système de workflow intégré ?', opts: ['Qui a validé ou rejeté une demande, quand et avec quel motif', 'La météo du jour de la commande', 'Le numéro de série de l’écran'], correct: 0, exp: 'L’auditabilité complète et l’horodatage des validations garantissent la conformité réglementaire.' }
  ],

  pitfalls: [
    'Automatiser un processus obsolète ou dysfonctionnel sans l’avoir préalablement simplifié.',
    'Utiliser la RPA pour des flux critiques alors qu’une API REST ou un connecteur SQL existe.',
    'Oublier de prévoir la gestion des exceptions (ex. document illisible par l’OCR).',
    'Définir des seuils de validation trop bas qui saturent les boîtes mail des directeurs.',
    'Négliger le maintien en conditions opérationnelles (MCO) des scripts RPA lors des mises à jour applicatives.'
  ],

  methodTitle: 'Concevoir un circuit d’automatisation de processus',
  method: [
    '<strong>Identifier les goulots d’étranglement</strong> : repérer les tâches manuelles à forte répétitivité et faible valeur ajoutée.',
    '<strong>Modéliser le flux en BPMN</strong> : clarifier les rôles (Lanes), les décisions (Gateways) et les fins possibles.',
    '<strong>Fixer les règles de gestion</strong> : déterminer les seuils d’escalade et les approbations requises.',
    '<strong>Choisir la technologie adaptée</strong> : Workflow natif ERP si dans le périmètre, ou RPA si logiciel tiers sans API.',
    '<strong>Tester le cas nominal et les exceptions</strong> : s’assurer que les rejets ou erreurs sont correctement pris en charge.'
  ],

  summary: [
    'BPMN 2.0 est la norme universelle de modélisation visuelle des processus d’entreprise.',
    'Le moteur de Workflow de l’ERP automatise les circuits d’approbation et la traçabilité des décisions.',
    'La RPA délègue à des robots logiciels les tâches manuelles de saisie et de manipulation d’interfaces.',
    'Les bots Attended assistent l’employé en temps réel ; les Unattended traitent des flux massifs sur serveur.',
    'L’automatisation libère du temps à forte valeur ajoutée et réduit drastiquement les taux d’erreur.'
  ],

  checklist: [
    'Je sais identifier les symboles de base de la notation BPMN (Event, Task, Gateway, Lane).',
    'Je comprends le fonctionnement d’un circuit de validation hiérarchique par seuil.',
    'Je sais expliquer ce qu’est la RPA et ses cas d’usage types.',
    'Je fais la distinction entre robot assisté (Attended) et autonome (Unattended).',
    'Je connais les limites et les risques de fragilité de la RPA face aux API directes.'
  ],

  notions: ['BPM', 'BPMN', 'Workflow', 'RPA', 'Gateway', 'Attended', 'Unattended', 'Circuit d’approbation', 'Traçabilité', 'Règles de gestion'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la symbolique BPMN et le rôle d’un workflow.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les seuils d’approbation et la différence Attended/Unattended.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez l’automatisation des flux métiers et la RPA.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux architectures d’intégration du SI au chapitre 3.' }
  ],

  flashcards: [
    { q: 'Que signifie BPMN ?', a: 'Business Process Model and Notation (modélisation visuelle des processus d’affaires).' },
    { q: 'À quoi sert une passerelle (Gateway) en BPMN ?', a: 'À représenter un embranchement décisionnel (ex. condition XOR selon un montant).' },
    { q: 'Qu’est-ce qu’un moteur de Workflow ?', a: 'Un outil logiciel guidant l’exécution et la validation ordonnée des étapes d’un processus.' },
    { q: 'Quelle est la différence entre RPA Attended et Unattended ?', a: 'Attended est déclenché par un utilisateur sur son poste ; Unattended tourne seul sur serveur 24h/24.' },
    { q: 'Donne un exemple typique d’usage de la RPA.', a: 'Extraire les données de factures PDF reçues et les ressaisir automatiquement dans l’ERP.' },
    { q: 'Pourquoi privilégier une API plutôt qu’un bot RPA graphique quand c’est possible ?', a: 'Car les API sont stables et contractuelles, alors que la RPA sur interface se brise dès que l’UI change.' }
  ],

  next: {
    href: 'chapitre3.html',
    label: 'Chapitre 3 : Intégration du SI & Architectures'
  }
};
