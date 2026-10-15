/**
 * Chapitre 4 du cours « Ingénierie du besoin » B2 — Modélisation & Priorisation des Exigences.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Modélisation &amp; Priorisation des Exigences',
  short: 'Modélisation &amp; Priorisation',
  toc: 'User Stories agiles Connextra, critères d’acceptation (DoD/DoR), modèle de Kano, priorisation MoSCoW et algorithme WSJF.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un projet ne dispose jamais d’un budget ni d’un temps infinis. Si tout est déclaré prioritaire, alors rien ' +
    'ne l’est réellement. L’ingénieur des exigences doit modéliser les fonctionnalités sous un format exploitable ' +
    'par les équipes de développement et arbitrer scientifiquement les priorités à l’aide de méthodes catégorielles ' +
    'et économiques reconnues.',

  objectives: [
    'rédiger des User Stories conformes au standard Connextra (« En tant que / Je veux / Afin de ») ;',
    'distinguer clairement la Definition of Ready (DoR) et la Definition of Done (DoD) ;',
    'arbitrer un backlog avec la matrice MoSCoW (Must, Should, Could, Won’t) en respectant la règle 60/20/20 ;',
    'calculer la priorité économique fine avec l’algorithme Weighted Shortest Job First (WSJF) ;',
    'classifier les attentes des utilisateurs selon les catégories de satisfaction du modèle de Kano.'
  ],

  sections: [
    {
      title: 'La User Story agile et le canevas Connextra',
      html: [
        '<p>Dans les approches agiles, l’exigence fonctionnelle prend la forme d’une <strong>User Story (US)</strong>. ' +
        'Le canevas standardisé de <strong>Connextra</strong> structure la story autour de trois éléments fondamentaux :</p>',
        '<blockquote>\n' +
        '  <strong>En tant que</strong> [rôle ou persona utilisateur]<br>\n' +
        '  <strong>Je veux</strong> [action ou fonctionnalité souhaitée]<br>\n' +
        '  <strong>Afin de</strong> [bénéfice métier mesurable / valeur ajoutée]\n' +
        '</blockquote>',
        '<p>La clause « Afin de » est la plus déterminante : elle explicite <em>pourquoi</em> la fonctionnalité ' +
        'a de la valeur et permet de challenger l’utilité réelle du besoin.</p>',
        box('danger', 'La fausse User Story technique', 'alert',
          '    <p>Écrire : <em>« En tant que développeur, je veux migrer la base vers PostgreSQL afin d’avoir une base moderne »</em> ' +
          'est une dérive fréquente. Une User Story s’adresse à un utilisateur ou à une partie prenante métier. ' +
          'Les travaux d’infrastructure relèvent de <em>Spikes</em> techniques ou de tâches d’architecture, non de stories utilisateur.</p>')
      ].join('\n')
    },
    {
      title: 'Critères d’acceptation, Definition of Ready (DoR) et Definition of Done (DoD)',
      html: [
        '<p>Pour qu’une User Story passe du statut d’idée à celui de logiciel livré sans contestation, trois garde-fous sont indispensables :</p>',
        '<ul>\n' +
        '  <li><strong>Critères d’acceptation (Acceptance Criteria)</strong> : conditions spécifiques et mesurables ' +
        'propres à la story que le livrable doit valider pour être accepté par le Product Owner.</li>\n' +
        '  <li><strong>Definition of Ready (DoR)</strong> : ensemble de critères qu’une story doit impérativement satisfaire ' +
        '<em>avant</em> d’être sélectionnée dans un sprint (story comprise, critères écrits, maquette prête, dépendances levées, estimée).</li>\n' +
        '  <li><strong>Definition of Done (DoD)</strong> : liste de contrôle qualité générique applicable à <em>toutes</em> les stories ' +
        'pour déclarer leur complétude (code revu, tests unitaires &gt; 80 %, doc mise à jour, déployé en pré-production).</li>\n' +
        '</ul>'
      ].join('\n')
    },
    {
      title: 'La priorisation catégorielle : la méthode MoSCoW',
      html: [
        '<p>La méthode <strong>MoSCoW</strong> catégorise l’ensemble des exigences d’un périmètre ou d’une release :</p>',
        '<ul>\n' +
        '  <li><strong>M (Must have)</strong> : vital pour le système. Sans cela, le produit n’a aucune valeur ou est illégal. Non négociable.</li>\n' +
        '  <li><strong>S (Should have)</strong> : hautement important mais une solution de contournement manuelle temporaire est envisageable.</li>\n' +
        '  <li><strong>C (Could have)</strong> : fonctionnalités de confort ou « nice-to-have », développées uniquement s’il reste du temps et du budget.</li>\n' +
        '  <li><strong>W (Won’t have this time)</strong> : formellement exclu de l’itération courante mais gardé en mémoire pour les versions ultérieures.</li>\n' +
        '</ul>',
        box('astuce', 'La règle d’or budgétaire 60 / 20 / 20', 'lightbulb',
          '    <p>Pour garantir la réussite d’un projet à date fixe, limitez les <strong>Must</strong> à un maximum de <strong>60 %</strong> ' +
          'de l’effort total estimé. Consacrez <strong>20 %</strong> aux <strong>Should</strong> et <strong>20 %</strong> aux <strong>Could</strong>. ' +
          'Les Could constituent la marge d’ajustement en cas d’aléa sans jamais sacrifier la date de livraison.</p>')
      ].join('\n')
    },
    {
      title: 'La priorisation économique : l’algorithme WSJF (SAFe)',
      html: [
        '<p>Lorsque plusieurs chantiers sont en compétition, le <strong>Weighted Shortest Job First (WSJF)</strong> ' +
        'de la démarche Scaled Agile Framework (SAFe) permet de maximiser le retour sur investissement en divisant le ' +
        '<strong>Coût du Retard (Cost of Delay - CoD)</strong> par la <strong>Durée / Taille du travail (Job Duration)</strong> :</p>',
        '<div class="formule-box">\n' +
        '  $$\\text{WSJF} = \\frac{\\text{Cost of Delay}}{\\text{Job Duration / Size}}$$\n' +
        '</div>',
        '<p>Le Coût du Retard combine trois dimensions estimées sur une échelle relative (ex. suite de Fibonacci 1, 2, 3, 5, 8, 13, 20) :</p>',
        '<ol>\n' +
        '  <li><strong>Valeur Utilisateur / Métier (User-Business Value)</strong> : impact direct sur les revenus ou le service rendu.</li>\n' +
        '  <li><strong>Criticité Temporelle (Time Criticality)</strong> : urgence liée à une date limite légale ou à la concurrence.</li>\n' +
        '  <li><strong>Réduction de Risque / Opportunité Future (RR &amp; OE)</strong> : sécurisation de l’architecture ou ouverture de nouveaux marchés.</li>\n' +
        '</ol>',
        '<p>$$\\text{Cost of Delay} = \\text{User-Business Value} + \\text{Time Criticality} + \\text{RR \\& OE}$$</p>',
        '<p>L’exigence ayant le score WSJF le plus élevé doit être traitée en priorité absolue par l’équipe.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Dans le canevas de User Story Connextra, quel segment explicite la valeur ajoutée et le bénéfice métier ?', opts: ['« Afin de... » (So that)', '« En tant que... » (As a)', '« Je veux... » (I want)'], correct: 0, exp: 'La partie « Afin de... » exprime la finalité économique ou métier qui justifie l’effort de développement.' },
    { stem: 'Selon les bonnes pratiques de la méthode MoSCoW, quelle proportion maximale de l’effort total doit être allouée aux exigences « Must » ?', opts: ['Environ 60 % de l’effort total', '95 % de l’effort total', '100 % de l’effort total'], correct: 0, exp: 'Plafonner les Must à 60 % préserve une marge de manœuvre (buffer) indispensable pour absorber les imprévus.' },
    { stem: 'Quelle est la formule exacte du calcul de priorité WSJF (Weighted Shortest Job First) ?', opts: ['Cost of Delay / Job Duration', 'Job Duration * Budget', 'Business Value - Time Criticality'], correct: 0, exp: 'WSJF = Coût du Retard divisé par la Taille/Durée du travail à réaliser.' },
    { stem: 'Quelle est la différence fondamentale entre la Definition of Ready (DoR) et la Definition of Done (DoD) ?', opts: ['La DoR conditionne l’entrée d’une story en sprint, la DoD conditionne sa livraison finale terminée', 'La DoR est réservée aux managers, la DoD aux testeurs', 'Ce sont deux termes identiques pour désigner le budget'], correct: 0, exp: 'La DoR valide que la story est prête à être développée ; la DoD valide que le travail réalisé répond à tous les standards de qualité.' },
    { stem: 'Dans le modèle de Kano, comment qualifie-t-on une caractéristique tenue pour acquise dont l’absence provoque une vive insatisfaction ?', opts: ['Besoin de base / Obligatoire (Must-be)', 'Besoin attractif / Excitateur', 'Besoin de performance proportionnel'], correct: 0, exp: 'Un besoin obligatoire (Must-be) est indispensable : sa présence n’émerveille pas le client, mais son absence est disqualifiante.' },
    { stem: 'Dans l’acronyme MoSCoW, que signifie la lettre « W » ?', opts: ['Won’t have this time (Reporté ou exclu de cette itération)', 'Waiting (En attente de validation)', 'Workflow (Processus métier)'], correct: 0, exp: 'Won’t have marque les fonctionnalités formellement écartées du périmètre immédiat sans être effacées du référentiel.' },
    { stem: 'Quelles sont les trois composantes du Coût du Retard (Cost of Delay) dans l’algorithme WSJF ?', opts: ['User-Business Value + Time Criticality + Risk Reduction / Opportunity Enablement', 'Budget + Nombre de bugs + Nombre de lignes de code', 'Salaires + Licences + Matériel'], correct: 0, exp: 'Le Cost of Delay est la somme de la valeur métier, de l’urgence temporelle et de la réduction des risques/opportunités futures.' },
    { stem: 'Pourquoi une exigence classée « Could have » est-elle précieuse pour le chef de projet ?', opts: ['Elle sert de variable d’ajustement pour préserver la date de livraison en cas de retard', 'Elle rapporte le plus de chiffre d’affaires immédiat', 'Elle est obligatoire devant la loi'], correct: 0, exp: 'Les exigences Could peuvent être sacrifiées sans dégrader le cœur du système si le calendrier est menacé.' }
  ],

  pitfalls: [
    'Classer 90 % des exigences du backlog en « Must have », rendant tout arbitrage budgétaire et temporel impossible.',
    'Rédiger des User Stories sans clause « Afin de », empêchant l’équipe de comprendre la véritable finalité du besoin.',
    'Démarrer le développement d’une story incomplète qui ne respecte pas la Definition of Ready (DoR).',
    'Considérer que l’estimation WSJF est gravée dans le marbre : les priorités relatives doivent être réévaluées à chaque jalon.',
    'Ignorer les besoins de base du modèle de Kano sous prétexte qu’ils ne sont pas explicitement réclamés par les utilisateurs.'
  ],

  methodTitle: 'Prioriser scientifiquement un backlog de projet',
  method: [
    '<strong>Structurer les User Stories</strong> : formuler chaque besoin selon le canevas Connextra avec critères d’acceptation.',
    '<strong>Évaluer la Definition of Ready</strong> : valider que chaque story est comprise et estimable avant priorisation.',
    '<strong>Appliquer un premier filtre MoSCoW</strong> : isoler les obligations légales et vitales en veillant à ne pas dépasser 60 % de Must.',
    '<strong>Calculer le ratio économique WSJF</strong> : évaluer le Coût du Retard et la durée pour ordonner objectivement les stories concurrentes.',
    '<strong>Confronter au modèle de Kano</strong> : s’assurer que le lot comprend tous les Must-be et au moins une fonctionnalité attractive différenciante.'
  ],

  summary: [
    'La User Story Connextra (« En tant que / Je veux / Afin de ») centre la spécification sur la valeur utilisateur.',
    'La DoR protège l’entrée du sprint ; la DoD garantit la rigueur et l’excellence de la sortie.',
    'La priorisation MoSCoW équilibre le risque avec le ratio 60 % Must / 20 % Should / 20 % Could.',
    'L’algorithme WSJF priorise les chantiers à fort coût du retard et courte durée (High Value / Low Effort).',
    'Le modèle de Kano distingue besoins obligatoires (Must-be), proportionnels et attractifs.'
  ],

  checklist: [
    'Je sais rédiger une User Story conforme au canevas Connextra.',
    'Je sais définir des critères d’acceptation vérifiables.',
    'Je comprends la différence fondamentale entre DoR et DoD.',
    'Je sais ventiler un budget d’effort selon la règle MoSCoW 60/20/20.',
    'Je sais calculer le score de priorité WSJF d’une exigence.'
  ],

  notions: ['User Story', 'Connextra', 'Critères d’acceptation', 'DoR', 'DoD', 'MoSCoW', 'WSJF', 'Cost of Delay', 'Modèle de Kano'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise le canevas Connextra et les principes du MoSCoW.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le calcul WSJF et les différences DoR/DoD.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la modélisation et l’arbitrage du backlog.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la spécification formelle et traçabilité au chapitre 5.' }
  ],

  flashcards: [
    { q: 'Quelle est la structure d’une User Story selon Connextra ?', a: 'En tant que [rôle], je veux [action], afin de [bénéfice / valeur].' },
    { q: 'Que contient la Definition of Ready (DoR) ?', a: 'Les prérequis indispensables pour qu’une story soit éligible au développement (claire, estimée, maquettée).' },
    { q: 'Que stipule la règle 60/20/20 dans la méthode MoSCoW ?', a: 'Au maximum 60 % de Must have, 20 % de Should have et 20 % de Could have (marge de manœuvre).' },
    { q: 'Comment calcule-t-on le score WSJF ?', a: 'WSJF = Cost of Delay / Job Duration (avec CoD = Business Value + Time Criticality + Risk Reduction).' },
    { q: 'Que caractérise un besoin « Must-be » dans le modèle de Kano ?', a: 'Une exigence basique obligatoire dont l’absence provoque un mécontentement total du client.' },
    { q: 'Pourquoi une tâche technique ne doit-elle pas être déguisée en User Story ?', a: 'Parce qu’une User Story doit apporter une valeur perceptible directe à un utilisateur final.' }
  ],

  next: {
    href: 'chapitre5.html',
    label: 'Chapitre 5 : Spécification Formelle &amp; Traçabilité (SRS &amp; BDD)'
  }
};
