/**
 * Chapitre 1 du cours « UI/UX Design B2 » — Fondements UI/UX, Démarche Centrée Utilisateur &amp; Double Diamant.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Fondements UI/UX, Démarche Centrée Utilisateur &amp; Double Diamant',
  short: 'Fondements &amp; Double Diamant',
  toc: 'Différence fondamentale entre UI et UX, norme internationale ISO 9241-210 (Conception Centrée Utilisateur), framework du Double Diamant (Design Council), phases divergentes et convergentes, et loi de Jakob (principe de familiarité des conventions).',
  time: '≈ 2 h 45 de travail',
  free: true,

  situation:
    'Une startup FinTech lance sa nouvelle application d’épargne automatisée. ' +
    'Bien que l’interface visuelle soit élégante et moderne avec des couleurs soignées, ' +
    'les premiers utilisateurs se plaignent amèrement : la moitié abandonne avant d’avoir finalisé son inscription, ' +
    'incapable de comprendre les étapes du mandat ou paniquée par des termes financiers obscurs. ' +
    'L’équipe découvre à ses dépens qu’une jolie interface (UI) ne compense jamais une mauvaise expérience utilisateur (UX). ' +
    'Pour redresser le produit et structurer le cycle de conception, l’équipe adopte la démarche formelle de Conception Centrée Utilisateur (CCU). ' +
    'Ce premier module pose les distinctions fondamentales, détaille la norme ISO 9241-210, ' +
    'structure les 4 phases du modèle du Double Diamant et illustre la loi de Jakob.',

  objectives: [
    'distinguer avec rigueur les compétences, livrables et objectifs de l’UX (Expérience Utilisateur) et de l’UI (Interface Utilisateur) ;',
    'comprendre les exigences et les 4 principes de la norme internationale ISO 9241-210 pour la Conception Centrée Utilisateur ;',
    'maîtriser le modèle du Double Diamant (Découvrir, Définir, Développer, Livrer) et alterner pensée divergente et convergente ;',
    'formuler des questions de cadrage « How Might We » (HMW) pour transformer des problèmes en opportunités ;',
    'appliquer la loi de Jakob (Jakob’s Law) pour capitaliser sur les modèles mentaux préexistants des utilisateurs ;',
    'auditer et classifier les activités de conception au sein d’une équipe produit pluridisciplinaire.'
  ],

  sections: [
    {
      title: 'Distinction Fondamentale : User Experience (UX) vs User Interface (UI)',
      html: [
        '<p>Dans l’industrie numérique, les termes <strong>UI</strong> et <strong>UX</strong> sont fréquemment confondus, ' +
        'alors qu’ils désignent deux disciplines complémentaires mais aux périmètres distincts :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">User Experience (UX — L’Invisible)</h4>',
        '    <p>Défini par Don Norman, l’UX englobe l’ensemble des perceptions, émotions et réactions ressenties par une personne ' +
        'lors de l’utilisation d’un produit, d’un système ou d’un service :</p>',
        '    <ul>',
        '      <li><strong>Objectif :</strong> Résoudre un problème réel de façon fluide, utile, efficace et mémorable.</li>',
        '      <li><strong>Méthodes :</strong> Entretiens, observation ethnographique, personas, tri de cartes, tests d’utilisabilité.</li>',
        '      <li><strong>Livrables :</strong> Customer Journey Map, architecture de l’information, wireframes basse fidélité.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">User Interface (UI — Le Visible)</h4>',
        '    <p>L’UI constitue le point de contact sensoriel et graphique entre l’humain et la machine :</p>',
        '    <ul>',
        '      <li><strong>Objectif :</strong> Guider le regard, susciter la confiance, assurer la lisibilité et l’esthétique.</li>',
        '      <li><strong>Méthodes :</strong> Choix typographique, harmonie colorimétrique, hiérarchie visuelle, micro-interactions.</li>',
        '      <li><strong>Livrables :</strong> Design System, maquettes graphiques haute fidélité (Figma), kits de composants.</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        '<p><strong>L’analogie de l’iceberg :</strong> L’UI représente la partie émergée visible de l’iceberg (formes, polices, couleurs). ' +
        'L’UX représente la masse immergée sous l’eau : la recherche utilisateur, l’architecture de l’information, ' +
        'la psychologie cognitive et la cinématique des parcours sans laquelle l’interface s’effondre.</p>'
      ].join('\n')
    },
    {
      title: 'Norme ISO 9241-210 : La Conception Centrée Utilisateur (CCU)',
      html: [
        '<p>La norme internationale <strong>ISO 9241-210</strong> (anciennement ISO 13407) encadre formellement ' +
        'l’ingénierie des facteurs humains et l’ergonomie de l’interaction homme-système. ' +
        'Elle impose une démarche itérative reposant sur 4 activités fondamentales :</p>',

        '<ol>',
        '  <li><strong>Comprendre et spécifier le contexte d’utilisation :</strong> Identifier les utilisateurs réels, leurs caractéristiques (âge, compétences), leurs tâches et leur environnement physique et social.</li>',
        '  <li><strong>Spécifier les exigences des utilisateurs :</strong> Formaliser les besoins métier et fonctionnels explicites et implicites.</li>',
        '  <li><strong>Produire des solutions de conception :</strong> Élaborer des propositions sous forme de maquettes et prototypes itératifs.</li>',
        '  <li><strong>Évaluer les solutions par rapport aux exigences :</strong> Conduire des tests d’utilisabilité avec de vrais utilisateurs finaux pour valider l’atteinte des critères d’efficacité, d’efficience et de satisfaction.</li>',
        '</ol>'
      ].join('\n')
    },
    {
      title: 'Le Modèle du Double Diamant et la Loi de Jakob',
      html: [
        '<p>Formalisé par le <em>Design Council</em> britannique en 2005, le modèle du <strong>Double Diamant</strong> ' +
        'structure le processus de design en 4 phases successives alternant divergence (ouverture) et convergence (sélection) :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Diamant</th>',
        '      <th>Phase</th>',
        '      <th>Posture cognitive</th>',
        '      <th>Livrables &amp; Outils</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td rowspan="2"><strong>Diamant 1 : Comprendre le bon problème</strong></td>',
        '      <td><strong>1. Découvrir</strong> (Discover)</td>',
        '      <td><strong>Divergente :</strong> Explorer large sans préjugé, récolter un maximum d’observations.</td>',
        '      <td>Entretiens qualitatifs, observation terrain, benchmarking concurrentiel.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>2. Définir</strong> (Define)</td>',
        '      <td><strong>Convergente :</strong> Synthétiser les insights, cadrer le défi précis.</td>',
        '      <td>Personas, carte d’expérience, questions HMW (<em>How Might We... ?</em>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td rowspan="2"><strong>Diamant 2 : Concevoir la bonne solution</strong></td>',
        '      <td><strong>3. Développer</strong> (Develop)</td>',
        '      <td><strong>Divergente :</strong> Imaginer de multiples solutions, esquisser, tester des concepts.</td>',
        '      <td>Sessions de brainstorming, crazy 8, wireframing Lo-Fi, prototypes jetables.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>4. Livrer</strong> (Deliver)</td>',
        '      <td><strong>Convergente :</strong> Affiner, tester rigoureusement et spécifier pour le code.</td>',
        '      <td>Tests d’utilisabilité qualitatifs, Design System, maquettes Hi-Fi prêtes pour la production.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        '<p><strong>La Loi de Jakob (Jakob’s Law) :</strong> Formulée par Jakob Nielsen, elle énonce que :<br>' +
        '<em>« Les utilisateurs passent la majorité de leur temps sur d’autres sites web et applications que la vôtre. »</em><br>' +
        'Conséquence ergonomique vitale : ils s’attendent à ce que votre produit fonctionne de la même manière que ceux qu’ils connaissent déjà. ' +
        'Placer le logo en haut à gauche, le panier en haut à droite, ou la recherche au centre n’est pas un manque d’originalité, ' +
        'mais une réduction bienveillante de la charge cognitive qui évite l’abandon de vos utilisateurs.</p>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Cadrage de Projet UI/UX en 5 Étapes',
  method: [
    'Étape 1 — Lancer la recherche exploratoire (Phase 1 Découvrir) : Mener 5 à 8 entretiens utilisateurs semi-directifs et analyser les métriques de friction existantes.',
    'Étape 2 — Formaliser le problème clé (Phase 2 Définir) : Convertir les verbatims en Pain Points et formuler la question directrice « Comment pourrions-nous... ? » (HMW).',
    'Étape 3 — Idéation et divergence (Phase 3 Développer) : Produire une trentaine d’esquisses rapides sur papier sans juger la faisabilité technique immédiate.',
    'Étape 4 — Prototypage et tests itératifs (Phase 4 Livrer) : Construire un prototype cliquable basse fidélité et le soumettre à 5 utilisateurs cibles pour éliminer 85% des défauts d’utilisabilité.',
    'Étape 5 — Audit de cohérence avec la Loi de Jakob : Vérifier que les conventions spatiales universelles sont scrupuleusement respectées avant toute validation graphique.'
  ],

  summary: [
    'L’UX s’occupe de l’expérience globale, de l’utilité et de la résolution du problème ; l’UI gère l’expression graphique et visuelle du produit.',
    'La norme ISO 9241-210 formalise la Conception Centrée Utilisateur comme une boucle itérative en 4 activités.',
    'Le Double Diamant structure le projet en explorant le bon problème (Découvrir / Définir) puis la bonne solution (Développer / Livrer).',
    'La pensée divergente explore sans filtre ; la pensée convergente sélectionne et tranche de manière rigoureuse.',
    'La loi de Jakob rappelle que respecter les conventions établies permet à l’utilisateur de se repérer immédiatement sans effort d’apprentissage.'
  ],

  checklist: [
    'Je sais expliquer la différence entre un designer UX et un designer UI à travers leurs livrables respectifs.',
    'Je connais les 4 activités clés de la norme ISO 9241-210.',
    'Je maîtrise l’enchaînement des 4 phases du Double Diamant (Découvrir, Définir, Développer, Livrer).',
    'Je sais identifier si une phase de projet est divergente ou convergente.',
    'Je connais la formulation et l’application pratique de la loi de Jakob.',
    'Je sais rédiger une question de cadrage HMW (How Might We).'
  ],

  notions: [
    'User Experience (UX)',
    'User Interface (UI)',
    'Norme ISO 9241-210',
    'Conception Centrée Utilisateur (CCU)',
    'Modèle du Double Diamant',
    'Pensée divergente vs convergente',
    'Questions de cadrage HMW',
    'Loi de Jakob (Jakob’s Law)'
  ],

  pitfalls: [
    'Commencer directement par dessiner des maquettes colorées sur Figma sans avoir compris le problème ni rencontré de vrais utilisateurs.',
    'Confondre le besoin réel de l’utilisateur avec la fonctionnalité qu’il demande textuellement (effet « cheval plus rapide » de Ford).',
    'Vouloir révolutionner les conventions d’interface (ex: cacher le panier en bas au centre) au détriment de l’ergonomie et de la loi de Jakob.',
    'Attendre que le produit soit codé à 100% pour faire le premier test utilisateur : tester dès l’étape de wireframe papier Lo-Fi.',
    'Oublier la phase de convergence dans le Double Diamant et rester bloqué dans une idéation perpétuelle sans livrable.'
  ],

  questions: [
    {
      stem: 'Quelle phrase résume le mieux la distinction fondamentale entre l’UX et l’UI ?',
      opts: [
        'L’UX concerne le design graphique sur Mac, l’UI concerne le développement web sur Windows',
        'L’UX définit la façon dont le produit fonctionne et résout le problème de l’utilisateur, l’UI définit son apparence et sa présentation visuelle',
        'L’UX est une discipline réservée aux consultants marketing, l’UI concerne uniquement les développeurs CSS',
        'Il n’y a aucune différence, ce sont deux termes strictement synonymes'
      ],
      correct: 1,
      exp: 'L’UX (Expérience Utilisateur) structure le parcours, la logique et la satisfaction du besoin, tandis que l’UI (Interface Utilisateur) gère la dimension visuelle, graphique et interactive.'
    },
    {
      stem: 'Quelle norme internationale définit formellement les exigences de la «Conception Centrée Utilisateur pour les systèmes interactifs» ?',
      opts: ['ISO 9001', 'ISO 27001', 'ISO 9241-210', 'IEEE 802.11'],
      correct: 2,
      exp: 'La norme ISO 9241-210 (anciennement ISO 13407) est la référence mondiale de l’ingénierie ergonomique pour la conception centrée utilisateur.'
    },
    {
      stem: 'Quelles sont les 4 phases officielles du modèle du Double Diamant (Design Council) dans l’ordre chronologique ?',
      opts: [
        'Idéation, Dessin, Codage, Déploiement',
        'Découvrir, Définir, Développer, Livrer',
        'Sprint, Standup, Review, Rétrospective',
        'Spécification, Architecture, Recette, Maintenance'
      ],
      correct: 1,
      exp: 'Le framework officiel du Double Diamant s’articule en 4 temps : 1. Découvrir (Discover), 2. Définir (Define), 3. Développer (Develop), 4. Livrer (Deliver).'
    },
    {
      stem: 'Dans le Double Diamant, quel est le mode de pensée de la phase 2 (Définir) ?',
      opts: [
        'Pensée divergente (explorer un maximum de pistes sans filtre)',
        'Pensée convergente (synthétiser, filtrer et cadrer le problème précis)',
        'Pensée récursive sans fin',
        'Pensée quantique'
      ],
      correct: 1,
      exp: 'La phase 2 (Définir) est convergente : elle rassemble et analyse les données récoltées en phase 1 pour cibler le défi prioritaire à résoudre.'
    },
    {
      stem: 'Que stipule formellement la Loi de Jakob (Jakob’s Law) formulée par Jakob Nielsen ?',
      opts: [
        'Plus un bouton est petit, plus il est cliquable',
        'Les utilisateurs passent la majeure partie de leur temps sur d’autres sites que le vôtre et s’attendent à ce que le vôtre fonctionne de la même manière',
        'Un formulaire ne doit jamais comporter plus de 3 questions',
        'Le texte doit toujours être écrit en noir pur sur blanc pur'
      ],
      correct: 1,
      exp: 'La loi de Jakob énonce que les utilisateurs transposent leurs habitudes acquises sur les leaders du web : adopter les conventions universelles réduit l’effort cognitif.'
    },
    {
      stem: 'Selon la loi de Jakob, où un internaute occidental s’attend-il naturellement à trouver le panier d’achat sur un site de e-commerce ?',
      opts: [
        'En bas à gauche dans le pied de page',
        'Au milieu de l’écran au survol',
        'En haut à droite de l’en-tête (Header)',
        'Dans un menu contextuel caché par un clic droit'
      ],
      correct: 2,
      exp: 'Sur l’ensemble des plateformes marchandes mondiales, le panier et le profil sont conventionnellement positionnés dans le coin supérieur droit de l’en-tête.'
    },
    {
      stem: 'Qu’est-ce qu’une question de cadrage «How Might We» (HMW / Comment pourrions-nous...) dans la phase de Définition ?',
      opts: [
        'Une clause de contrat de travail pour les développeurs',
        'Une formulation optimiste qui transforme un problème ou une frustration utilisateur en une opportunité de conception stimulante',
        'Un rapport d’erreur généré par la console JavaScript',
        'Une question posée lors du devis commercial'
      ],
      correct: 1,
      exp: 'Le format «How Might We... ?» permet à l’équipe de reformuler un point de douleur identifié en une question orientée solution pour lancer l’idéation.'
    },
    {
      stem: 'Quel est le meilleur moment pour conduire les premiers tests d’utilisabilité avec de vrais utilisateurs ?',
      opts: [
        'Uniquement après la mise en production officielle',
        'Dès la phase de conception préliminaire sur des croquis papier ou wireframes basse fidélité (Lo-Fi)',
        'Seulement lorsque les animations CSS 3D sont terminées',
        'Les tests utilisateurs sont inutiles si les développeurs aiment le site'
      ],
      correct: 1,
      exp: 'Tester dès l’esquisse papier ou wireframe Lo-Fi permet de corriger 85% des erreurs ergonomiques majeures à un coût presque nul, bien avant d’écrire une seule ligne de code.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre UI et UX ?',
      a: 'L’UX concerne l’expérience, la logique et la résolution du besoin ; l’UI concerne la dimension visuelle, graphique et interactive.'
    },
    {
      q: 'Qu’est-ce que la norme ISO 9241-210 ?',
      a: 'La norme internationale définissant les principes et le cycle itératif de la Conception Centrée Utilisateur (CCU).'
    },
    {
      q: 'Quelles sont les 4 phases du modèle du Double Diamant ?',
      a: '1. Découvrir (Divergent), 2. Définir (Convergent), 3. Développer (Divergent), 4. Livrer (Convergent).'
    },
    {
      q: 'Que dit la Loi de Jakob ?',
      a: 'Les utilisateurs passent la majeure partie de leur temps sur d’autres sites et s’attendent à retrouver les mêmes conventions sur le vôtre.'
    },
    {
      q: 'Qu’est-ce qu’une pensée divergente dans le design ?',
      a: 'Une phase d’exploration large et ouverte où l’on accumule des observations ou des idées sans filtre ni jugement prématuré.'
    },
    {
      q: 'Pourquoi les conventions d’interface (ex: logo en haut à gauche) sont-elles cruciales ?',
      a: 'Parce qu’elles s’appuient sur les modèles mentaux existants de l’utilisateur, éliminant tout temps d’apprentissage et réduisant la charge cognitive.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la distinction UI/UX, les 4 phases du Double Diamant et la loi de Jakob.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes bases. Approfondissez la démarche ISO 9241-210 et l’application de la pensée divergente/convergente.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise des fondements méthodologiques de l’ergonomie et de la CCU.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les principes directeurs de l’UI/UX au niveau professionnel.' }
  ]
};
