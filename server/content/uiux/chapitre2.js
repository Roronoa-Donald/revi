/**
 * Chapitre 2 du cours « UI/UX Design B2 » — Recherche Utilisateur, Personas &amp; Cartographie de l’Expérience.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Recherche Utilisateur, Personas &amp; Cartographie de l’Expérience',
  short: 'Recherche &amp; Parcours',
  toc: 'Méthodes de recherche qualitative et quantitative, construction de Personas empiriques (Alan Cooper), cartes d’empathie, cartographie de l’expérience utilisateur (Customer Journey Map), détection des Pain Points et architecture de l’information par le tri de cartes.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une plateforme de réservation de voyages en ligne constate un décalage cuisant : ' +
    'alors que le service marketing ciblait les jeunes baroudeurs nomades digitaux, ' +
    'les analyses de trafic révèlent que 70% des acheteurs réguliers sont des familles avec enfants en bas âge ' +
    'qui peinent à trouver les filtres d’équipements bébé et abandonnent face à l’absence de récapitulatif clair. ' +
    'Faute d’avoir fondé sa conception sur une recherche utilisateur rigoureuse, l’entreprise a conçu pour un fantôme. ' +
    'Pour réaligner le produit avec la réalité humaine de ses clients, l’équipe déploie la boîte à outils de l’UX Research : ' +
    'entretiens qualitatifs, personas empiriques d’Alan Cooper, Customer Journey Maps et tri de cartes pour l’architecture de l’information. ' +
    'Ce module forme les étudiants à mener une recherche rigoureuse et à convertir les données d’usage en décisions d’interface.',

  objectives: [
    'maîtriser la distinction entre recherche qualitative (le « pourquoi ») et recherche quantitative (le « combien ») ;',
    'conduire des entretiens utilisateurs semi-directifs sans formuler de questions orientées ;',
    'construire des Personas réalistes fondés sur des données réelles selon la méthode d’Alan Cooper ;',
    'dresser une carte d’empathie (Empathy Map) en 4 quadrants : Ce qu’il dit, pense, fait et ressent ;',
    'cartographier le parcours client complet (Customer Journey Map) pour isoler les points de friction critiques (Pain Points) ;',
    'structurer l’Architecture de l’Information (IA) d’un système par des ateliers de tri de cartes (Card Sorting) ouvert et fermé.'
  ],

  sections: [
    {
      title: 'Typologie de la Recherche Utilisateur (UX Research)',
      html: [
        '<p>L’<strong>UX Research</strong> est le socle scientifique de la conception centrée utilisateur. ' +
        'Christian Rohrer a formalisé une matrice à deux dimensions pour classer les méthodes d’investigation :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Qualitatif vs Quantitatif</h4>',
        '    <ul>',
        '      <li><strong>Recherche Qualitative :</strong> Explore le « Pourquoi » et le « Comment ». ' +
        'Génère des verbatims riches, révèle les motivations profondes, modèles mentaux et freins inconscients (ex: entretiens individuels, tests d’utilisabilité modérés avec 5 utilisateurs).</li>',
        '      <li><strong>Recherche Quantitative :</strong> Mesure le « Combien » et le « Où ». ' +
        'Génère des métriques chiffrées statistiquement significatives (ex: enquêtes à grande échelle, A/B testing, analyse de funnel de conversion analytics).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Attitudinal vs Comportemental</h4>',
        '    <ul>',
        '      <li><strong>Attitudinal (Ce que les gens disent) :</strong> Croyances exprimées, désirs conscients et opinions déclarées (ex: focus groups, sondages d’opinion).</li>',
        '      <li><strong>Comportemental (Ce que les gens font) :</strong> Actions réelles observées en situation d’usage. ' +
        '<strong>Règle d’or :</strong> Toujours privilégier les comportements réels observés aux déclarations théoriques.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Personas Empiriques et Carte d’Empathie',
      html: [
        '<p>Inventé par Alan Cooper, un <strong>Persona</strong> est un archétype fictif mais rigoureusement fondé sur ' +
        'des données réelles d’utilisateurs, représentant un groupe cible homogène ayant des objectifs et comportements similaires :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Attribut</th>',
        '      <th>Rôle dans le projet</th>',
        '      <th>Exemple concret</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Identité démographique</strong></td>',
        '      <td>Humaniser et susciter l’empathie de l’équipe.</td>',
        '      <td>Marc, 42 ans, père de deux enfants, responsable logistique.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Contexte &amp; Habitudes</strong></td>',
        '      <td>Comprendre la charge mentale et l’environnement d’usage.</td>',
        '      <td>Consulte son smartphone le soir sur un réseau instable.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Objectifs fondamentaux (Goals)</strong></td>',
        '      <td>Définir la promesse de valeur du produit.</td>',
        '      <td>Réserver un hébergement familial sécurisé en moins de 10 minutes.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Frustrations majeures (Pain Points)</strong></td>',
        '      <td>Identifier les problèmes prioritaires à résoudre.</td>',
        '      <td>Frais cachés à la dernière étape du paiement, absence de filtres fiables.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        '<p><strong>Carte d’Empathie (Empathy Map) :</strong> Outil de synthèse visuelle divisé en 4 quadrants :<br>' +
        '- <em>Ce qu’il dit (Says) :</em> Citations et verbatims directs.<br>' +
        '- <em>Ce qu’il pense (Thinks) :</em> Croyances non verbalisées et hésitations.<br>' +
        '- <em>Ce qu’il fait (Does) :</em> Gestes, contournements observés et interactions physiques.<br>' +
        '- <em>Ce qu’il ressent (Feels) :</em> Émotions dominantes (anxiété, satisfaction, frustration).</p>'
      ].join('\n')
    },
    {
      title: 'Customer Journey Map et Architecture de l’Information',
      html: [
        '<p>La <strong>Customer Journey Map (CJM)</strong> retrace chronologiquement l’expérience globale vécue par un persona, ' +
        'depuis l’éveil de son besoin jusqu’à la phase post-achat :</p>',

        '<ul>',
        '  <li><strong>Étapes chronologiques :</strong> Découverte &rarr; Inscription &rarr; Recherche &rarr; Sélection &rarr; Paiement &rarr; Utilisation.</li>',
        '  <li><strong>Points de contact (Touchpoints) :</strong> Écrans mobiles, e-mails, service client téléphonique, notifications push.</li>',
        '  <li><strong>Courbe émotionnelle :</strong> Évaluation du moral de -2 (frustration maximale / point de rupture) à +2 (délice / enchantement).</li>',
        '  <li><strong>Pain Points &amp; Opportunités :</strong> Chaque creux de la courbe émotionnelle met en lumière un point de douleur critique à corriger en priorité absolue.</li>',
        '</ul>',

        '<p><strong>Tri de Cartes (Card Sorting) pour l’Architecture de l’Information (IA) :</strong><br>' +
        'Pour organiser logiquement les menus d’une application sans imposer la vision biaisée des développeurs, ' +
        'on demande à des utilisateurs de regrouper des cartes représentant les contenus :</p>',
        '<ul>',
        '  <li><strong>Tri de cartes ouvert (Open Card Sorting) :</strong> Les utilisateurs créent eux-mêmes les catégories et leur donnent un nom (idéal en phase exploratoire).</li>',
        '  <li><strong>Tri de cartes fermé (Closed Card Sorting) :</strong> Les catégories sont prédéfinies et les utilisateurs doivent y classer les cartes (idéal pour valider une structure existante).</li>',
        '</ul>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Recherche Terrain &amp; Cartographie d’Expérience',
  method: [
    'Étape 1 — Définir le protocole d’entretien : Rédiger un guide d’entretien semi-directif neutre, évitant toute question fermée ou suggestive.',
    'Étape 2 — Recruter 5 profils représentatifs : Jakob Nielsen démontre que 5 utilisateurs cibles suffisent pour révéler 85% des problèmes majeurs.',
    'Étape 3 — Coder et catégoriser les verbatims : Extraire les citations récurrentes et les regrouper par affinités sur un tableau collaboratif.',
    'Étape 4 — Formaliser le Persona primaire : Rédiger la fiche persona avec ses 5 composantes clés en s’interdisant toute spéculation non attestée.',
    'Étape 5 — Tracer la Customer Journey Map : Aligner les étapes chronologiques et tracer la courbe émotionnelle pour identifier le point de friction le plus profond.',
    'Étape 6 — Valider la taxonomie par tri de cartes : Conduire un tri de cartes pour obtenir au moins 66% de consensus sur l’arborescence des menus.'
  ],

  summary: [
    'La recherche qualitative explique le pourquoi des comportements, tandis que la quantitative quantifie leur fréquence.',
    'Toujours privilégier l’observation de ce que les utilisateurs font réellement plutôt que ce qu’ils prétendent faire.',
    'Un Persona est un archétype fondé sur des faits d’usage réels, caractérisé par ses objectifs et ses frustrations.',
    'L’Empathy Map synthétise la posture de l’utilisateur à travers 4 quadrants : Dit, Pense, Fait, Ressent.',
    'La Customer Journey Map révèle visuellement les Pain Points critiques le long du parcours chronologique.',
    'Le tri de cartes (ouvert ou fermé) est la méthode de référence pour concevoir une architecture de l’information intuitive.'
  ],

  checklist: [
    'Je sais distinguer une méthode de recherche qualitative d’une méthode quantitative.',
    'Je connais les 5 champs obligatoires d’un Persona selon Alan Cooper.',
    'Je sais construire et interpréter les 4 quadrants d’une carte d’empathie.',
    'Je sais tracer une Customer Journey Map et identifier son Pain Point critique.',
    'Je maîtrise la différence entre un tri de cartes ouvert et un tri de cartes fermé.',
    'Je sais comment interpréter le pourcentage de consensus lors d’un test de tri de cartes.'
  ],

  notions: [
    'UX Research qualitative vs quantitative',
    'Matrice de Rohrer',
    'Persona empirique d’Alan Cooper',
    'Carte d’empathie (Empathy Map)',
    'Customer Journey Map (CJM)',
    'Points de contact (Touchpoints)',
    'Points de douleur (Pain Points)',
    'Tri de cartes ouvert et fermé (Card Sorting)'
  ],

  pitfalls: [
    'Créer des « proto-personas » spéculatifs basés uniquement sur l’imagination des designers sans aucune donnée terrain.',
    'Poser des questions suggestives en entretien (ex: « Trouveriez-vous pratique que l’on ajoute un bouton X ? » &rarr; biais de complaisance garanti).',
    'Croire que plus on interroge d’utilisateurs en qualitatif, mieux c’est : au-delà de 5 à 8 entretiens, la saturation des insights est atteinte.',
    'Négliger les points de contact hors-écran dans une CJM (ex: attente d’un livreur, réception d’un SMS, contact SAV).',
    'Imposer l’arborescence de l’entreprise dans le menu du site au lieu de suivre les résultats du tri de cartes des utilisateurs.'
  ],

  questions: [
    {
      stem: 'Pourquoi est-il crucial de privilégier les données «comportementales» par rapport aux données «attitudinales» en UX Research ?',
      opts: [
        'Parce que le code JavaScript ne s’intéresse qu’au comportement de la machine',
        'Parce qu’il existe un fossé notoire entre ce que les utilisateurs prétendent faire en entretien et leurs actions réelles en situation d’usage',
        'Parce que les données attitudinales sont illégales selon le RGPD',
        'Parce que les données comportementales coûtent moins cher à héberger'
      ],
      correct: 1,
      exp: 'Le biais déclaratif est omniprésent : ce que les utilisateurs déclarent reflète souvent ce qu’ils aimeraient faire ou ce qu’ils pensent que l’interviewer attend, alors que leurs gestes réels révèlent la vérité des usages.'
    },
    {
      stem: 'Qui est l’inventeur historique du concept de «Persona» dans le domaine du génie logiciel et de la conception d’interaction ?',
      opts: ['Steve Jobs', 'Alan Cooper', 'Jakob Nielsen', 'Don Norman'],
      correct: 1,
      exp: 'Alan Cooper a formalisé le concept de Persona dans son ouvrage fondateur « The Inmates Are Running the Asylum » en 1999 pour donner un visage humain aux exigences logicielles.'
    },
    {
      stem: 'Quels sont les 4 quadrants d’une Carte d’Empathie (Empathy Map) standard ?',
      opts: [
        'Ventes, Dépenses, Pertes, Bénéfices',
        'Ce qu’il Dit (Says), Ce qu’il Pense (Thinks), Ce qu’il Fait (Does), Ce qu’il Ressent (Feels)',
        'HTML, CSS, JavaScript, WebAssembly',
        'Matin, Midi, Soir, Nuit'
      ],
      correct: 1,
      exp: 'L’Empathy Map organise les observations qualitatives en 4 catégories fondamentales : Says (verbatims), Thinks (pensées intérieures), Does (actions concrètes), Feels (émotions).'
    },
    {
      stem: 'Dans une Customer Journey Map, que désigne précisément un «Pain Point» ?',
      opts: [
        'La couleur du bouton de validation',
        'Un point de friction, de confusion ou de blocage où l’utilisateur ressent une émotion négative ou envisage d’abandonner',
        'Le temps de réponse du serveur de base de données',
        'Le coût financier payé par l’utilisateur'
      ],
      correct: 1,
      exp: 'Un Pain Point (point de douleur) matérialise une rupture dans l’expérience où la frustration de l’utilisateur met en péril l’accomplissement de son objectif.'
    },
    {
      stem: 'Quelle est la différence méthodologique entre un tri de cartes «ouvert» et un tri de cartes «fermé» ?',
      opts: [
        'Le tri ouvert se fait en public, le tri fermé sous mot de passe',
        'Dans le tri ouvert, les utilisateurs créent et nomment eux-mêmes les catégories ; dans le tri fermé, les catégories sont prédéfinies et figées',
        'Le tri ouvert ne concerne que les images, le tri fermé les fichiers PDF',
        'Le tri fermé est réservé aux administrateurs'
      ],
      correct: 1,
      exp: 'Le tri ouvert explore les modèles mentaux spontanés (l’utilisateur invente les rubriques). Le tri fermé évalue la pertinence d’une arborescence prédéterminée.'
    },
    {
      stem: 'Combien d’utilisateurs Jakob Nielsen préconise-t-il d’observer lors d’un test d’utilisabilité qualitatif pour détecter l’essentiel des problèmes ergonomiques ?',
      opts: ['1 seul utilisateur', 'Exactement 5 utilisateurs', 'Au moins 100 utilisateurs', 'Plus de 10 000 utilisateurs'],
      correct: 1,
      exp: 'La courbe de découverte des problèmes de Nielsen démontre que 5 utilisateurs permettent d’identifier environ 85% des anomalies d’utilisabilité, chaque utilisateur additionnel apportant des rendements décroissants.'
    },
    {
      stem: 'Qu’est-ce qu’un «Touchpoint» (point de contact) dans une cartographie de parcours utilisateur ?',
      opts: [
        'L’écran tactile d’un smartphone uniquement',
        'Tout point d’interaction direct ou indirect entre l’utilisateur et la marque ou le service (application, e-mail, emballage, support client)',
        'Un câble réseau Ethernet',
        'Un clic de souris droite'
      ],
      correct: 1,
      exp: 'Un Touchpoint englobe l’ensemble des canaux et supports à travers lesquels l’utilisateur interagit avec le système au fil de son parcours global.'
    },
    {
      stem: 'Quelle erreur critique commet une équipe qui conçoit un persona «Tout le monde» (ex: Tout public âgé de 18 à 99 ans) ?',
      opts: [
        'Aucune, c’est le meilleur moyen d’avoir un produit universel',
        'Elle crée un produit mou et indécis qui ne convient parfaitement à personne en voulant plaire à tout le monde',
        'Elle enfreint la loi de Fitts',
        'Elle fait planter le navigateur'
      ],
      correct: 1,
      exp: 'Un persona universel (« everyone ») dilue les besoins spécifiques. Comme le rappelle Alan Cooper : « Si vous concevez pour tout le monde, vous concevez pour personne ».'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre recherche qualitative et quantitative ?',
      a: 'Le qualitatif analyse le « pourquoi » et les motivations profondes ; le quantitatif mesure le « combien » avec des données chiffrées massives.'
    },
    {
      q: 'Qu’est-ce qu’un Persona selon Alan Cooper ?',
      a: 'Un archétype d’utilisateur cible fondé sur des données de recherche terrain réelles, défini par ses objectifs, ses habitudes et ses frustrations.'
    },
    {
      q: 'Quels sont les 4 quadrants d’une carte d’empathie ?',
      a: 'Ce qu’il dit (Says), ce qu’il pense (Thinks), ce qu’il fait (Does), ce qu’il ressent (Feels).'
    },
    {
      q: 'Qu’est-ce qu’une Customer Journey Map (CJM) ?',
      a: 'La représentation chronologique du parcours de l’utilisateur, cartographiant ses actions, ses points de contact et sa courbe émotionnelle.'
    },
    {
      q: 'À quoi sert le tri de cartes (Card Sorting) ?',
      a: 'À concevoir et tester l’Architecture de l’Information (arborescence des menus) selon la logique mentale réelle des utilisateurs.'
    },
    {
      q: 'Combien d’utilisateurs suffisent pour un test qualitatif selon Nielsen ?',
      a: '5 utilisateurs suffisent pour découvrir environ 85% des problèmes d’utilisabilité majeurs.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la structure des Personas, l’Empathy Map et les méthodes de recherche.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances. Consolidez l’analyse de la Customer Journey Map et le tri de cartes.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise de l’UX Research et de la cartographie des parcours.' },
    { cls: 'top', text: '8/8 : Parfait ! Vous pilotez la recherche utilisateur au niveau d’un UX Researcher confirmé.' }
  ]
};
