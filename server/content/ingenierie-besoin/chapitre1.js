/**
 * Chapitre 1 du cours « Ingénierie du besoin » B2 — Besoin vs Exigence & Parties Prenantes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Besoin vs Exigence &amp; Parties Prenantes',
  short: 'Besoin vs Exigence',
  toc: 'Définitions fondamentales, problème vs solution, cycle de vie des exigences et cartographie des parties prenantes.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Plus de 50 % des échecs de projets informatiques trouvent leur origine dans des exigences mal comprises, ' +
    'incomplètes ou changeantes. Avant d’écrire la moindre ligne de code ou de choisir une technologie, ' +
    'l’ingénieur des exigences doit explorer le problème réel du client, identifier les véritables parties prenantes ' +
    'et transformer des attentes souvent informelles en spécifications rigoureuses.',

  objectives: [
    'distinguer avec certitude un besoin métier (Quoi / Pourquoi) d’une solution technique prématurée (Comment) ;',
    'maîtriser la définition normative d’une exigence selon le standard ISO/IEC/IEEE 29148 ;',
    'comprendre les phases du cycle de vie de l’ingénierie des exigences ;',
    'cartographier les parties prenantes (Stakeholders) selon la matrice Pouvoir / Intérêt de Mendelow ;',
    'structurer les attributs obligatoires d’une fiche d’exigence professionnelle.'
  ],

  sections: [
    {
      title: 'Le besoin métier face à la solution technique : problème vs solution',
      html: [
        '<p>L’erreur la plus fréquente lors du recueil des attentes consiste à confondre le <strong>besoin</strong> ' +
        'et la <strong>solution</strong> :</p>',
        '<ul>\n' +
        '  <li><strong>Le Besoin (Espace Problème / « Quoi &amp; Pourquoi »)</strong> : exprime une opportunité, une obligation réglementaire ' +
        'ou un problème concret vécu par les utilisateurs. Exemple : <em>« Réduire le temps d’attente des clients au guichet bancaire »</em>.</li>\n' +
        '  <li><strong>La Solution (Espace Solution / « Comment »)</strong> : correspond à un choix technique d’implémentation. ' +
        'Exemple : <em>« Développer une application mobile React avec base MongoDB »</em>.</li>\n' +
        '</ul>',
        box('danger', 'Le piège de la solution prématurée', 'alert',
          '    <p>Lorsqu’un client formule : <em>« J’ai besoin d’une base de données NoSQL et d’un tableau de bord en temps réel »</em>, ' +
          'il exprime déjà une solution technique sans expliciter son problème réel. L’ingénieur des exigences doit appliquer ' +
          'la technique des <strong>5 Pourquoi</strong> pour remonter au besoin métier originel avant d’entériner tout choix d’architecture.</p>')
      ].join('\n')
    },
    {
      title: 'Définition normative et cycle de vie de l’ingénierie des exigences',
      html: [
        '<p>Selon la norme <strong>ISO/IEC/IEEE 29148</strong>, une <strong>exigence</strong> est une condition ou capacité ' +
        'requise par un utilisateur pour résoudre un problème ou atteindre un objectif, ou devant être satisfaite ' +
        'par un système pour respecter un contrat, un standard ou une contrainte formelle.</p>',
        '<p>L’ingénierie des exigences (<em>Requirements Engineering - RE</em>) s’articule en 4 macro-activités itératives :</p>',
        '<ol>\n' +
        '  <li><strong>Élicitation (Recueil)</strong> : extraction des besoins auprès des parties prenantes par entretiens, ateliers ou observation.</li>\n' +
        '  <li><strong>Analyse &amp; Négociation</strong> : résolution des conflits, détection des ambiguïtés et priorisation des exigences.</li>\n' +
        '  <li><strong>Spécification</strong> : formalisation écrite dans un document de référence (SRS - Software Requirements Specification).</li>\n' +
        '  <li><strong>Validation &amp; Gestion</strong> : revues formelles avec les clients et pilotage de la traçabilité face aux changements.</li>\n' +
        '</ol>'
      ].join('\n')
    },
    {
      title: 'Cartographie des parties prenantes : la matrice Pouvoir / Intérêt de Mendelow',
      html: [
        '<p>Une <strong>partie prenante</strong> (<em>Stakeholder</em>) est tout individu, groupe ou organisation pouvant affecter, ' +
        'être affecté ou se percevoir comme affecté par une décision ou le produit du projet. ' +
        'La matrice de <strong>Mendelow</strong> permet d’adapter la communication :</p>',
        '<ul>\n' +
        '  <li><strong>Pouvoir Fort &amp; Intérêt Fort (Acteurs clés)</strong> : <em>Gérer de près</em> (Direction générale, Product Owner, sponsor). Concertation permanente.</li>\n' +
        '  <li><strong>Pouvoir Fort &amp; Intérêt Faible</strong> : <em>Garder satisfait</em> (Direction juridique, DSI, conformité réglementaire). Éviter les blocages sans surcharger.</li>\n' +
        '  <li><strong>Pouvoir Faible &amp; Intérêt Fort</strong> : <em>Garder informé</em> (Utilisateurs finaux, opérateurs terrain). Implication dans les ateliers et prototypes.</li>\n' +
        '  <li><strong>Pouvoir Faible &amp; Intérêt Faible</strong> : <em>Surveiller</em> (Effort minimal, communication périodique globale).</li>\n' +
        '</ul>',
        box('astuce', 'La matrice RACI pour formaliser les responsabilités', 'lightbulb',
          '    <p>Sur chaque exigence ou livrable, définissez :</p>\n' +
          '    <ul>\n' +
          '      <li><strong>R (Responsible)</strong> : la personne qui réalise le travail.</li>\n' +
          '      <li><strong>A (Accountable)</strong> : l’unique décideur qui valide et porte la responsabilité finale.</li>\n' +
          '      <li><strong>C (Consulted)</strong> : l’expert interrogé pour avis avant décision.</li>\n' +
          '      <li><strong>I (Informed)</strong> : la personne tenue informée de l’avancement.</li>\n' +
          '    </ul>')
      ].join('\n')
    },
    {
      title: 'La fiche d’exigence standard et ses attributs clés',
      html: [
        '<p>Chaque exigence consignée dans le référentiel de projet doit disposer d’attributs structurés ' +
        'garantissant sa traçabilité :</p>',
        '<ul>\n' +
        '  <li><strong>Identifiant unique</strong> : immuable (ex. <code>AUTH-FR-001</code>).</li>\n' +
        '  <li><strong>Titre &amp; Description</strong> : énoncé clair et non ambigu à la forme affirmative.</li>\n' +
        '  <li><strong>Source</strong> : partie prenante ou document légal à l’origine du besoin.</li>\n' +
        '  <li><strong>Priorité</strong> : criticité (Haute, Moyenne, Basse / MoSCoW).</li>\n' +
        '  <li><strong>Critères d’acceptation</strong> : conditions vérifiables validant la conformité.</li>\n' +
        '  <li><strong>Statut</strong> : cycle de vie (Identifiée &rarr; Validée &rarr; Implémentée &rarr; Testée).</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle phrase relève de l’espace « problème » (besoin métier) et non de l’espace « solution » ?', opts: ['Permettre aux clients de suivre l’acheminement de leur colis en temps réel', 'Créer une base de données PostgreSQL hébergée sur AWS', 'Utiliser un framework Angular pour les formulaires'], correct: 0, exp: 'L’acheminement de colis exprime l’objectif client sans présumer des technologies employées.' },
    { stem: 'Quelle norme internationale cadre formellement l’ingénierie des exigences logicielles et systèmes ?', opts: ['ISO/IEC/IEEE 29148', 'ISO 9001', 'RFC 8259'], correct: 0, exp: 'La norme ISO/IEC/IEEE 29148 remplace l’historique IEEE 830 pour encadrer le cycle de vie des exigences.' },
    { stem: 'Que préconise la matrice de Mendelow pour une partie prenante ayant un Pouvoir Fort et un Intérêt Faible ?', opts: ['Garder satisfait', 'Gérer de près', 'Surveiller avec un effort minimal'], correct: 0, exp: 'Les acteurs à fort pouvoir et faible intérêt (ex. conformité juridique) doivent être maintenus satisfaits pour éviter tout veto.' },
    { stem: 'Quelle technique permet de remonter au besoin originel lorsqu’un utilisateur formule d’emblée une solution technique ?', opts: ['Les 5 Pourquoi (Root Cause Analysis)', 'Le tri par insertion', 'La compilation incrémentale'], correct: 0, exp: 'Demander « Pourquoi » de façon itérative permet d’isoler le problème de fond.' },
    { stem: 'Dans une matrice RACI, combien d’acteurs peuvent porter le rôle « Accountable » (A) sur une tâche donnée ?', opts: ['Un seul et unique acteur', 'Autant d’acteurs que souhaité', 'Au moins trois directeurs'], correct: 0, exp: 'Le rôle A (responsable ultime / approbateur) doit être strictement unique pour éviter la dilution des responsabilités.' },
    { stem: 'Quelle est la première macro-activité du cycle de vie de l’ingénierie des exigences ?', opts: ['L’élicitation (recueil des besoins)', 'La recette utilisateur (UAT)', 'L’architecture logicielle'], correct: 0, exp: 'L’élicitation est la phase de découverte et d’extraction des attentes auprès des parties prenantes.' },
    { stem: 'Pourquoi un identifiant d’exigence (ex. REQ-042) doit-il être immuable ?', opts: ['Pour garantir la traçabilité des liens vers les tests et le code même si le titre change', 'Pour économiser la mémoire vive du serveur', 'Pour des raisons fiscales'], correct: 0, exp: 'L’immuabilité de l’ID préserve la matrice de traçabilité tout au long de la vie du projet.' },
    { stem: 'Que désigne le terme « Stakeholder » dans un projet logiciel ?', opts: ['Toute personne, groupe ou organisation impactée ou ayant une influence sur le projet', 'Uniquement le développeur senior', 'Le fournisseur d’accès Internet'], correct: 0, exp: 'Les parties prenantes englobent clients, utilisateurs, décideurs, régulateurs et équipes techniques.' }
  ],

  pitfalls: [
    'Accepter tel quel un cahier des charges qui impose des technologies au lieu de définir les besoins opérationnels.',
    'Négliger les utilisateurs finaux du terrain au profit exclusif de la direction sponsor lors des entretiens.',
    'Modifier l’identifiant d’une exigence au cours du projet, brisant tous les liens de traçabilité vers les cas de test.',
    'Considérer que l’ingénierie des exigences est une étape figée réalisée une fois pour toutes au début du projet (approche séquentielle rigide).',
    'Rédiger des exigences sous forme de souhaits vagues plutôt que sous forme d’énoncés testables.'
  ],

  methodTitle: 'Conduire un premier cadrage des exigences',
  method: [
    '<strong>Identifier les parties prenantes</strong> : dresser l’inventaire exhaustif des acteurs influents ou impactés par le système.',
    '<strong>Positionner les acteurs dans la matrice de Mendelow</strong> : déterminer le niveau de pouvoir et d’intérêt pour calibrer la fréquence d’échange.',
    '<strong>Traquer les solutions prématurées</strong> : questionner chaque choix technique mentionné par le client pour dégager la finalité réelle.',
    '<strong>Attribuer des identifiants immuables</strong> : créer la nomenclature de codification dès la première séance de cadrage.',
    '<strong>Faire valider la vision cible</strong> : faire signer un document synthétique de cadrage préalable par le décideur ultime (Accountable).'
  ],

  summary: [
    'Le besoin métier réside dans l’espace problème ; la solution technique réside dans l’espace solution.',
    'L’ingénierie des exigences structure le recueil, l’analyse, la spécification et la validation des attentes.',
    'La norme ISO/IEC/IEEE 29148 formalise les bonnes pratiques internationales de spécification logicielle.',
    'La matrice de Mendelow optimise la stratégie d’engagement et de communication avec chaque partie prenante.',
    'Une exigence solide possède un identifiant pérenne, une source vérifiée et des critères d’acceptation quantifiables.'
  ],

  checklist: [
    'Je sais distinguer un besoin métier d’un choix technique prématuré.',
    'Je connais les 4 grandes activités du cycle de vie de l’ingénierie des exigences.',
    'Je sais placer une partie prenante dans la matrice Pouvoir / Intérêt de Mendelow.',
    'Je comprends le rôle de l’Accountable dans une matrice RACI.',
    'Je connais les attributs essentiels d’une fiche d’exigence normée.'
  ],

  notions: ['Besoin', 'Exigence', 'ISO 29148', 'Espace Problème', 'Espace Solution', 'Parties Prenantes', 'Mendelow', 'RACI', 'Traçabilité'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la frontière problème/solution et la matrice de Mendelow.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les attributs de fiches d’exigences et la gouvernance RACI.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les fondamentaux du cadrage des exigences.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux types et critères de qualité d’exigences au chapitre 2.' }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « Espace Problème » ?', a: 'Le Besoin (Espace Problème / « Quoi & Pourquoi ») : exprime une opportunité, une obligation réglementaire ou un problème concret vécu par les utilisateurs. Exemple : « Réduire le temps d’attente des clients au guichet bancaire » .' },
      { q: 'Qu’est-ce que « Espace Solution » ?', a: 'La Solution (Espace Solution / « Comment ») : correspond à un choix technique d’implémentation. Exemple : « Développer une application mobile React avec base MongoDB » .' },
      { q: 'Qu’est-ce que « SMART » ?', a: 'Une exigence SMART est Spécifique (périmètre net), Mesurable (seuil chiffré), Atteignable (technologiquement réaliste), Pertinente / Relevant (alignée sur les objectifs stratégiques) et Temporellement définie (délai ou jalon d’exécution clair).' },
      { q: 'Qu’est-ce que « Testabilité » ?', a: 'S (Supportability) : testabilité, maintenabilité, modularité, extensibilité et portabilité.' },
      { q: 'Qu’est-ce que « Non-ambiguïté » ?', a: 'Que signifie le critère de « Non-ambiguïté » d’une exigence ?' },
      { q: 'Qu’est-ce que « Shadowing » ?', a: 'pratiquer l’observation directe et le shadowing pour confronter travail prescrit et travail réel ;' },
      { q: 'Qu’est-ce que « Effet Hawthorne » ?', a: 'L’effet Hawthorne : attention au biais par lequel un individu modifie son comportement habituel du simple fait qu’il se sait observé. D’où la nécessité de séances d’immersion prolongées.' },
      { q: 'Qu’est-ce que « Workaround » ?', a: 'Découverte des « Workarounds » (Contournements) : les utilisateurs inventent souvent des béquilles informelles pour pallier les défauts de l’ancien système. Ces contournements révèlent les besoins métier les plus urgents.' },
      { q: 'Qu’est-ce que « Échantillonnage » ?', a: 'Échantillonnage : Ingénierie du besoin B2 › Sommaire › Chapitre 3' },
      { q: 'Qu’est-ce que « Personas » ?', a: 'construire des personas utilisateurs réalistes dotés d’objectifs, de frustrations et de scénarios d’usage.' },
      { q: 'Qu’est-ce que « Triangulation » ?', a: 'Ne vous fiez jamais à une seule technique. La triangulation consiste à croiser au moins trois sources : par exemple, un entretien stratégique avec le manager, une journée d’observation terrain avec les opérateurs, et un questionnaire de validation auprès de l’ensemble des agences' },
      { q: 'Qu’est-ce que « Critères d’acceptation » ?', a: 'Critères d’acceptation (Acceptance Criteria) : conditions spécifiques et mesurables propres à la story que le livrable doit valider pour être accepté par le Product Owner.' },
      { q: 'Qu’est-ce que « DoD » ?', a: 'distinguer clairement la Definition of Ready (DoR) et la Definition of Done (DoD) ;' },
      { q: 'Qu’est-ce que « Codification » ?', a: 'La codification systématique (ex. BNK-AUTH-FR-001) garantit une traçabilité pérenne à travers le cycle de vie.' },
      { q: 'Qu’est-ce que « RTM » ?', a: 'concevoir une matrice de traçabilité des exigences (RTM) bidirectionnelle (amont et aval) ;' },
      { q: 'Qu’est-ce que « Change Request » ?', a: 'Change Request : Même avec la meilleure élicitation du monde, les besoins d’une entreprise évoluent en permanence. Les changements incontrôlés mènent tout droit au phénomène destructeur du « Scope Creep » (dérive des objectifs). L’ingénieur des exigences doit mettre en place des revues formelles ' },
    { q: 'Quelle est la différence fondamentale entre besoin et solution ?', a: 'Le besoin décrit le problème ou l’objectif métier (Quoi/Pourquoi) ; la solution décrit l’implémentation technique (Comment).' },
    { q: 'Quelle norme internationale régit l’ingénierie des exigences ?', a: 'La norme ISO/IEC/IEEE 29148 (qui remplace l’historique IEEE 830).' },
    { q: 'Quels sont les 4 quadrants de la matrice de Mendelow ?', a: 'Gérer de près (P+ / I+), Garder satisfait (P+ / I-), Garder informé (P- / I+), Surveiller (P- / I-).' },
    { q: 'Quelles sont les 4 activités du cycle de l’ingénierie des exigences ?', a: 'Élicitation (recueil), Analyse & négociation, Spécification, Validation & gestion.' },
    { q: 'Quelle est la règle capitale concernant l’Accountable (A) du RACI ?', a: 'Il doit y avoir un seul et unique Accountable par tâche ou exigence.' },
    { q: 'Pourquoi chaque exigence doit-elle avoir une source identifiée ?', a: 'Pour savoir qui interroger en cas d’ambiguïté et valider la légitimité du besoin.' }
  ],

  next: {
    href: 'chapitre2.html',
    label: 'Chapitre 2 : Types &amp; Qualités des Exigences'
  }
};
