/**
 * Chapitre 6 du cours « Ingénierie du besoin » B2 — Validation, Gestion du Changement & Audit.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Validation, Gestion du Changement &amp; Audit',
  short: 'Validation &amp; Changement',
  toc: 'Grille de revue INVEST, inspections formelles Fagan, Change Requests (CR), comité CCB, analyse d’impact et baselines.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Même avec la meilleure élicitation du monde, les besoins d’une entreprise évoluent en permanence. Les changements ' +
    'incontrôlés mènent tout droit au phénomène destructeur du « Scope Creep » (dérive des objectifs). L’ingénieur ' +
    'des exigences doit mettre en place des revues formelles d’inspection, un processus rigoureux de Change Request (CR) ' +
    'et gérer des versions de référence (Baselines) auditables.',

  objectives: [
    'évaluer et améliorer des User Stories selon les 6 critères de la grille INVEST de Bill Wake ;',
    'conduire des revues formelles d’exigences selon la méthode d’inspection Fagan ;',
    'maîtriser le cycle de vie d’une demande de changement (Change Request - CR) ;',
    'animer un comité de pilotage des changements (Change Control Board - CCB) ;',
    'chiffrer l’analyse d’impact globale (technique, calendaire, budgétaire) et figer des Baselines.'
  ],

  sections: [
    {
      title: 'La grille qualité INVEST pour les exigences agiles',
      html: [
        '<p>Créée par Bill Wake, la grille <strong>INVEST</strong> est la référence internationale pour auditer ' +
        'la qualité d’une User Story avant son engagement en développement :</p>',
        '<ul>\n' +
        '  <li><strong>I (Independent)</strong> : la story est autonome. Elle peut être développée, testée et livrée sans dépendance bloquante avec une autre story.</li>\n' +
        '  <li><strong>N (Negotiable)</strong> : l’exigence n’est pas un contrat figé. Les détails restent ouverts à la discussion entre l’équipe et le Product Owner.</li>\n' +
        '  <li><strong>V (Valuable)</strong> : elle apporte une valeur métier perceptible et directe aux utilisateurs finaux ou au sponsor.</li>\n' +
        '  <li><strong>E (Estimable)</strong> : sa complexité et son effort peuvent être évalués par l’équipe technique (pas de zone d’ombre majeure).</li>\n' +
        '  <li><strong>S (Small)</strong> : sa taille est réduite, calibrée pour tenir facilement dans une fraction d’itération (sprint).</li>\n' +
        '  <li><strong>T (Testable)</strong> : elle dispose de critères d’acceptation concrets permettant de valider son succès sans contestation.</li>\n' +
        '</ul>',
        box('astuce', 'Découper les « Epics » qui échouent au critère Small', 'lightbulb',
          '    <p>Si une story est trop volumineuse pour être estimée ou développée en un sprint, découpez-la selon les chemins ' +
          'opérationnels (cas nominal vs cas d’erreur), les types de données (fichiers légers vs volumineux) ou les interfaces (web vs mobile).</p>')
      ].join('\n')
    },
    {
      title: 'Les revues d’exigences et inspections formelles de Fagan',
      html: [
        '<p>Développée chez IBM par Michael Fagan, l’<strong>inspection formelle</strong> est l’activité d’ingénierie ' +
        'qui offre le plus fort retour sur investissement dans un projet logiciel en éliminant les défauts dès la phase amont :</p>',
        '<ol>\n' +
        '  <li><strong>Planification</strong> : désignation de l’équipe de revue (Modérateur, Rédacteur/Auteur, Lecteur, Inspecteur).</li>\n' +
        '  <li><strong>Vue d’ensemble (Overview)</strong> : présentation du contexte et des objectifs du document par l’auteur.</li>\n' +
        '  <li><strong>Préparation individuelle</strong> : chaque inspecteur analyse le document en amont à l’aide d’une checklist normative.</li>\n' +
        '  <li><strong>Réunion d’inspection</strong> : le lecteur récite le texte paragraphe par paragraphe ; les inspecteurs signalent les anomalies détectées (sans débattre des solutions).</li>\n' +
        '  <li><strong>Correction (Rework)</strong> : l’auteur corrige les défauts consignés dans le journal d’inspection.</li>\n' +
        '  <li><strong>Suivi (Follow-up)</strong> : le modérateur vérifie que 100 % des anomalies ont été résolues avant de signer l’acceptation.</li>\n' +
        '</ol>'
      ].join('\n')
    },
    {
      title: 'Gestion du changement : Change Request (CR) et Change Control Board (CCB)',
      html: [
        '<p>Tout projet vit avec l’apparition de nouvelles demandes ou modifications en cours de route. ' +
        'Pour éviter le <strong>Scope Creep</strong> (dérive invisible du périmètre), chaque modification doit suivre ' +
        'une procédure formelle de <strong>Change Request (CR)</strong> :</p>',
        '<p style="text-align:center;"><code>Soumission CR &rarr; Analyse d’impact &rarr; Arbitrage CCB &rarr; Mise à jour Référentiel &amp; Tests</code></p>',
        '<ul>\n' +
        '  <li><strong>Le Change Control Board (CCB)</strong> : comité pluridisciplinaire (Chef de projet, Product Owner, ' +
        'Architecte technique, Représentant client) qui statue souverainement sur chaque demande : <em>Approuvée</em>, <em>Rejetée</em> ou <em>Ajournée</em>.</li>\n' +
        '  <li><strong>La règle du triangle de fer</strong> : si une nouvelle exigence est approuvée sans rallonge budgétaire ni report de délai, ' +
        'une autre exigence de rang équivalent doit obligatoirement être retirée du lot courant.</li>\n' +
        '</ul>',
        box('danger', 'L’accord informel par email ou en couloir', 'alert',
          '    <p>Accepter une modification demandée au détour d’un couloir sans déposer de Change Request formelle est la cause numéro 1 ' +
          'des dépassements budgétaires non indemnisés. Tout changement validé doit faire l’objet d’un avenant contractuel ou d’un ajustement de backlog.</p>')
      ].join('\n')
    },
    {
      title: 'Analyse d’impact et gestion des versions de référence (Baselines)',
      html: [
        '<p>Avant de soumettre une CR au comité CCB, l’analyste réalise une <strong>analyse d’impact</strong> rigoureuse ' +
        'en s’appuyant sur la matrice RTM :</p>',
        '<ul>\n' +
        '  <li><strong>Impact fonctionnel</strong> : liste des modules et exigences connexes affectés par le changement.</li>\n' +
        '  <li><strong>Impact technique</strong> : modifications requises sur le schéma de base de données, les API, le front-end.</li>\n' +
        '  <li><strong>Impact de régression</strong> : volume de cas de test à réécrire ou ré-exécuter.</li>\n' +
        '  <li><strong>Impact financier et calendaire</strong> : chiffrage en jours-hommes (JH) et décalage éventuel du jalon de livraison.</li>\n' +
        '</ul>',
        '<p>Une <strong>Baseline</strong> est une version figée et officiellement approuvée du référentiel des exigences ' +
        '(ex. <em>Baseline v1.0</em> pour la signature du cahier des charges, <em>Baseline v1.1</em> après validation de la CR-007). ' +
        'Aucune modification ne peut être apportée à une Baseline sans l’aval préalable du CCB.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Dans la grille qualité INVEST de Bill Wake, que représente la lettre « I » ?', opts: ['Independent (Autonome et découplée des autres stories)', 'Informative (Riche en détails techniques)', 'Iterative (Répétée à chaque sprint)'], correct: 0, exp: 'Independent garantit qu’une story peut être planifiée et développée sans bloquer ni être bloquée par une autre.' },
    { stem: 'Quel est l’objectif premier de la réunion d’inspection formelle selon la méthode de Fagan ?', opts: ['Détecter et consigner les anomalies sans chercher à débattre des solutions en séance', 'Réécrire l’ensemble du code en direct', 'Négocier les augmentations de salaire'], correct: 0, exp: 'L’inspection Fagan sépare strictement la détection des anomalies de leur résolution pour maximiser l’efficacité.' },
    { stem: 'Qui est l’instance souveraine chargée d’approuver ou de rejeter les demandes de changement (CR) ?', opts: ['Le Change Control Board (CCB)', 'Le développeur stagiaire', 'Le fournisseur cloud'], correct: 0, exp: 'Le CCB réunit l’ensemble des décideurs (métier, projet, technique) pour arbitrer objectivement sur les demandes.' },
    { stem: 'Que désigne le phénomène de « Scope Creep » dans un projet logiciel ?', opts: ['L’élargissement incontrôlé et insidieux du périmètre du projet sans ajustement de budget ni de délai', 'Une défaillance d’un disque dur en cluster', 'L’augmentation de la vitesse de connexion réseau'], correct: 0, exp: 'Le Scope Creep correspond à l’accumulation de petites demandes non tracées qui font dériver le projet vers l’échec.' },
    { stem: 'Qu’est-ce qu’une Baseline dans la gestion des exigences ?', opts: ['Une version formellement figée et approuvée du référentiel servant de base de comparaison', 'Un langage de programmation obsolète', 'Le câble principal de connexion au réseau'], correct: 0, exp: 'Une Baseline fige un état contractuel validé des exigences que seul un processus formel de changement peut faire évoluer.' },
    { stem: 'Dans la grille INVEST, que signifie le critère « Negotiable » ?', opts: ['La story n’est pas un contrat figé ; ses détails techniques et d’implémentation restent discutables', 'Le prix du logiciel peut être marchandé au centime', 'L’équipe de dev peut annuler le projet'], correct: 0, exp: 'Negotiable rappelle que la story est une invitation à la conversation continue entre le métier et les développeurs.' },
    { stem: 'Sur quel document l’ingénieur des exigences s’appuie-t-il pour mesurer l’impact transversal d’un changement ?', opts: ['La matrice de traçabilité des exigences (RTM)', 'La facture de connexion Internet', 'Le CV des membres de l’équipe'], correct: 0, exp: 'La RTM cartographie les dépendances entre besoins, exigences, code et tests, permettant d’isoler immédiatement les éléments touchés.' },
    { stem: 'Selon la règle du « Triangle de Fer » (Qualité, Coût, Délai, Périmètre), que doit-on faire si un nouveau lot d’exigences est ajouté à date et budget constants ?', opts: ['Dé-scoper (retirer) des exigences existantes de priorité moindre', 'Travailler la nuit sans le dire à personne', 'Ignorer les tests de sécurité'], correct: 0, exp: 'À budget et délai constants, l’intégration d’une nouvelle exigence impose mécaniquement le retrait d’une autre (dé-scoping).' }
  ],

  pitfalls: [
    'Accepter des changements oraux ou informels sans les faire enregistrer dans une Change Request formelle.',
    'Considérer la grille INVEST comme une contrainte bureaucratique et embarquer des Epics géantes en plein sprint.',
    'Organiser des réunions d’inspection Fagan où l’on débat pendant des heures de solutions au lieu de simplement consigner les anomalies.',
    'Modifier le référentiel des exigences en direct sans incrémenter le numéro de version de la Baseline.',
    'Négliger l’analyse d’impact sur les suites de tests existantes lors de la modification d’une règle métier fondamentale.'
  ],

  methodTitle: 'Gérer une demande de changement (CR) avec rigueur',
  method: [
    '<strong>Réceptionner et enregistrer la CR</strong> : formaliser le besoin nouveau avec motif métier et demandeur.',
    '<strong>Conduire l’analyse d’impact</strong> : inspecter la matrice RTM pour chiffrer l’effort technique, financier et calendaire.',
    '<strong>Présenter le dossier au CCB</strong> : soumettre l’arbitrage au comité avec recommandation technique et contreparties.',
    '<strong>Notifier la décision</strong> : en cas d’approbation, signer l’avenant contractuel ou arbitrer le backlog (dé-scoping).',
    '<strong>Figer une nouvelle Baseline</strong> : mettre à jour le référentiel, incrémenter la version et notifier les équipes de test et de dev.'
  ],

  summary: [
    'La grille INVEST garantit des User Stories Indépendantes, Négociables, à Valeur ajoutée, Estimables, Petites et Testables.',
    'L’inspection Fagan offre le meilleur ratio coût/détection d’anomalies en formalisant la revue par les pairs.',
    'Le Change Control Board (CCB) arbitre souverainement sur chaque Change Request (CR) pour endiguer le Scope Creep.',
    'L’analyse d’impact s’appuie sur la matrice RTM pour quantifier les répercussions techniques, calendaires et financières.',
    'Les Baselines formalisent des jalons immuables du référentiel d’exigences.'
  ],

  checklist: [
    'Je sais auditer une User Story selon chacun des 6 critères de la grille INVEST.',
    'Je comprends les rôles et étapes d’une réunion d’inspection formelle Fagan.',
    'Je maîtrise le cycle de validation d’une Change Request (CR) par le CCB.',
    'Je sais mener une analyse d’impact transversale à l’aide de la matrice RTM.',
    'Je comprends l’intérêt d’une Baseline pour sécuriser la relation contractuelle.'
  ],

  notions: ['INVEST', 'Fagan', 'Inspection', 'Change Request', 'CCB', 'Scope Creep', 'Triangle de Fer', 'Baseline', 'Analyse d’impact'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les critères de la grille INVEST et le rôle du comité CCB.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’analyse d’impact d’une CR et le concept de Baseline.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises le pilotage et le contrôle des exigences.' },
    { cls: 'top', text: '≥ 95 % — Parfait : tu possèdes une maîtrise experte de l’ingénierie des exigences B2 !' }
  ],

  flashcards: [
    { q: 'Que signifie chaque lettre de l’acronyme INVEST ?', a: 'Independent, Negotiable, Valuable, Estimable, Small, Testable.' },
    { q: 'Quel est le rôle du Modérateur dans une inspection Fagan ?', a: 'Il anime la séance avec neutralité, veille au respect du timing et garantit le suivi de la correction des anomalies.' },
    { q: 'Qu’est-ce que le Change Control Board (CCB) ?', a: 'Le comité formel réunissant client, projet et technique pour approuver, rejeter ou ajourner chaque demande de changement.' },
    { q: 'Comment le triangle de fer réagit-il à l’ajout d’un nouveau périmètre à budget et délai constants ?', a: 'Il impose de dé-scoper (retirer) des fonctionnalités de priorité inférieure du périmètre prévu.' },
    { q: 'Qu’est-ce qu’une Baseline d’exigences ?', a: 'Une version stabilisée et approuvée du référentiel qui sert de contrat de départ pour les phases suivantes.' },
    { q: 'Pourquoi l’analyse d’impact est-elle indispensable avant d’accepter une modification ?', a: 'Pour évaluer les conséquences cachées sur le code, les tests, le calendrier et le budget avant d’engager les ressources.' }
  ],

  next: {
    href: '../atelier.html',
    label: 'Atelier de code interactif'
  }
};
