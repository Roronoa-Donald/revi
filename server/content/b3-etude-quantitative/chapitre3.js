/**
 * Chapitre 3 du cours « Étude Quantitative & Qualitative B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Collecte Quantitative : Conception de Questionnaires &amp; Échelles de Mesure',
  short: 'Questionnaires &amp; Échelles de Mesure',
  toc: 'Typologie des questions, échelles psychométriques de Likert et d’Osgood, formulation neutre, éradication des biais cognitifs et mesure du taux d’attrition.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Rédiger un questionnaire paraît faussement simple : n’importe qui peut aligner vingt questions dans un outil en ligne en une demi-heure. Pourtant, la majorité des enquêtes réalisées par des étudiants ou des praticiens non formés produisent des données polluées et inutilisables en raison de biais méthodologiques sournois : questions suggestives qui forcent la réponse, questions à double détente combinant deux sujets distincts, échelles de mesure asymétriques ou mal équilibrées, et formulaires interminables décourageant les répondants en chemin. La rigueur de l’instrument de mesure détermine directement la validité des statistiques qui en découleront. L’ingénieur de Bachelor 3 doit maîtriser l’ingénierie du questionnaire, choisir et traiter les échelles de Likert de 1 à 5 points, éradiquer les pièges de formulation et piloter les taux de complétion et d’abandon (drop-off).',
  objectives: [
    'maîtriser la typologie des questions d’enquête : fermées dichotomiques, choix multiples exclusifs/multiples, échelles d’attitude et questions ouvertes ;',
    'concevoir, exploiter et analyser mathématiquement des échelles ordinales de Likert (moyenne pondérée, variance, écart-type de consensus) ;',
    'exploiter le différentiel sémantique d’Osgood pour évaluer le positionnement perçu d’un produit ou service informatique ;',
    'détecter et éradiquer les biais majeurs de formulation : questions suggestives (leading), à double détente (double-barrelled) et doubles négations ;',
    'optimiser l’entonnoir de passation (mode d’administration en ligne CAWI, taux d’ouverture, d’initiation, de complétion et d’abandon) ;',
    'analyser et résoudre méthodologiquement des analyseurs statistiques de Likert, des détecteurs de formulations biaisées et des calculateurs d’entonnoir d’attrition.'
  ],
  sections: [
    {
      title: 'Typologie des Questions : Fermées, Ouvertes &amp; Échelles d’Attitude',
      html: [
        '<p>Le questionnaire est un instrument d’observation standardisé destiné à recueillir des données comparables et quantifiables. Le choix du format de question conditionne la nature mathématique des variables collectées :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Questions Fermées Catégorielles</h4>',
        '    <ul>',
        '      <li><strong>Dichotomiques :</strong> Deux modalités mutuellement exclusives (ex. Oui / Non, Titulaire / Prestataire). Variables binaires (0 ou 1).</li>',
        '      <li><strong>À choix multiples (QCU / QCM) :</strong> Sélection d’une modalité unique ou de plusieurs réponses autorisées au sein d’une liste exhaustive.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Échelles Psychométriques (Likert)</h4>',
        '    <p>Mesure de l’intensité d’une attitude, d’un accord ou d’une satisfaction sur une échelle graduée ordinale (typiquement de 1 à 5 points, de « Pas du tout d’accord » à « Tout à fait d’accord »).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Questions Ouvertes Ciblées</h4>',
        '    <p>Texte libre permettant au répondant d’exprimer des suggestions ou justifications. À utiliser avec parcimonie en fin de questionnaire pour éviter la fatigue cognitive.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'L’Échelle de Rensis Likert &amp; Analyse Mathématique',
      html: [
        '<p>L’<strong>échelle de Likert</strong> (1932) est la reine des mesures d’attitude en sciences de gestion et en ingénierie logicielle (mesure d’utilisabilité SUS, satisfaction utilisateur, perception de sécurité) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure de l’Échelle à 5 Points</h4>',
        '    <table class="table">',
        '      <thead><tr><th>Point</th><th>Libellé Canonique</th><th>Signification</th></tr></thead>',
        '      <tbody>',
        '        <tr><td><strong>1</strong></td><td>Pas du tout d’accord</td><td>Rejet total</td></tr>',
        '        <tr><td><strong>2</strong></td><td>Plutôt pas d’accord</td><td>Désaccord modéré</td></tr>',
        '        <tr><td><strong>3</strong></td><td>Neutre / Sans opinion</td><td>Position médiane</td></tr>',
        '        <tr><td><strong>4</strong></td><td>Plutôt d’accord</td><td>Accord modéré</td></tr>',
        '        <tr><td><strong>5</strong></td><td>Tout à fait d’accord</td><td>Adhésion complète</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Indicateurs de Tendance &amp; Dispersion</h4>',
        '    <p>Bien qu’ordinale, l’échelle est quasi-continûment traitée via des métriques métriques robustes :</p>',
        '    <ul>',
        '      <li><strong>Moyenne pondérée ($\\mu$) :</strong> $\\mu = \\frac{1}{N} \\sum_{k=1}^5 (k \\cdot N_k)$. Mesure l’adhésion globale sur 5.00.</li>',
        '      <li><strong>Écart-type ($\\sigma$) :</strong> $\\sigma = \\sqrt{\\frac{1}{N} \\sum N_k (k - \\mu)^2}$. Mesure le consensus : un $\\sigma < 0.80$ indique un avis très unanime, tandis qu’un $\\sigma > 1.30$ traduit une forte polarisation.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Traque &amp; Éradication des Biais de Formulation',
      html: [
        '<p>Une question mal formulée induit en erreur le répondant et invalide scientifiquement l’intégralité des analyses statistiques subséquentes :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Biais Suggestif (Leading Question)</h4>',
        '    <p><strong>Erreur :</strong> <em>« Ne pensez-vous pas que notre support client est le plus réactif du marché ? »</em><br>' +
        '    La tournure pousse psychologiquement vers l’approbation.<br>' +
        '    <strong>Correction neutre :</strong> <em>« Quel est votre degré de satisfaction concernant la réactivité du support ? »</em></p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Biais Double Détente (Double-Barrelled)</h4>',
        '    <p><strong>Erreur :</strong> <em>« Trouvez-vous l’application rapide et sécurisée ? »</em><br>' +
        '    Si l’utilisateur la trouve rapide mais vulnérable, il est impossible de répondre.<br>' +
        '    <strong>Correction :</strong> Scinder impérativement en deux questions indépendantes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Biais de Double Négation</h4>',
        '    <p><strong>Erreur :</strong> <em>« N’est-il pas inexact que le serveur n’a jamais planté ? »</em><br>' +
        '    Sature la charge cognitive et entraîne 50% de réponses inverses à la pensée réelle.<br>' +
        '    <strong>Correction :</strong> Toujours utiliser des phrases affirmatives directes.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Entonnoir de Passation &amp; Gestion de l’Attrition (Drop-off Rate)',
      html: [
        '<p>Dans une enquête en ligne (CAWI - Computer-Assisted Web Interviewing), le comportement des répondants suit un entonnoir de conversion rigoureux :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Métriques de l’Entonnoir d’Enquête</h4>',
        '    <ul>',
        '      <li><strong>Taux d’ouverture :</strong> $\\frac{Ouverts}{Envoyés} \\times 100$. Mesure l’attractivité de l’objet du courriel.</li>',
        '      <li><strong>Taux d’initiation :</strong> $\\frac{Initiés}{Envoyés} \\times 100$. Pourcentage de personnes ayant démarré le questionnaire.</li>',
        '      <li><strong>Taux de complétion final :</strong> $\\frac{Complétés}{Envoyés} \\times 100$. Le ratio d’exploitabilité réel.</li>',
        '      <li><strong>Taux d’abandon (Drop-off) :</strong> $\\frac{Initiés - Complétés}{Initiés} \\times 100$. La déperdition en cours d’épreuve.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Règles d’Optimisation de l’Attrition</h4>',
        '    <p>Un taux d’abandon supérieur à 30% signale une fatigue critique du répondant :</p>',
        '    <ul>',
        '      <li><strong>Durée maximale :</strong> Le temps de remplissage ne doit jamais dépasser 7 à 10 minutes (environ 15 à 25 questions).</li>',
        '      <li><strong>Barre de progression visible :</strong> Afficher l’avancement en pourcentage pour rassurer l’utilisateur.</li>',
        '      <li><strong>Données sensibles en fin de questionnaire :</strong> Placer les données signalétiques (âge, salaire, fonction) tout à la fin.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Construction d’un Questionnaire Rigoureux',
  method: [
    '1. Définir les variables et indicateurs clés : Traduire chaque hypothèse théorique de recherche en un ensemble d’indicateurs mesurables précis.',
    '2. Structurer en entonnoir logique : Commencer par des questions d’accroche simples et générales, approfondir les thèmes techniques au cœur, et terminer par les signalétiques.',
    '3. Rédiger des questions neutres et univoques : Proscrire tout adjectif flatteur, bannir les doubles négations et scinder impérativement les questions à double détente.',
    '4. Calibrer les échelles de Likert : Conserver des échelles symétriques cohérentes (1 à 5) avec les mêmes polarités tout au long de l’enquête.',
    '5. Conduire un pré-test pilote (Pre-testing) : Administrer le brouillon à un panel de test de 5 à 10 personnes pour chronométrer la passation et corriger les incompréhensions.',
    '6. Surveiller les métriques de collecte : Suivre le taux d’abandon en direct dès les 50 premières soumissions pour détecter d’éventuelles questions bloquantes.'
  ],
  summary: [
    'Le questionnaire d’enquête est un instrument de mesure psychométrique qui exige une neutralité absolue et une structure sans ambiguïté.',
    'Les échelles de Likert à 5 points mesurent l’intensité des attitudes, synthétisées par leur moyenne pondérée et leur écart-type de consensus.',
    'Les biais de formulation (questions suggestives, doubles négations, double-barrelled) constituent des vices de forme rédhibitoires qui faussent les réponses.',
    'Le taux d’abandon en cours de route (drop-off rate) mesure l’attrition : au-delà de 30% d’abandon parmi les initiés, le questionnaire est considéré comme trop long ou dysfonctionnel.',
    'Le pré-test pilote auprès d’un échantillon restreint est l’étape obligatoire pour sécuriser la clarté et la durée de passation avant le déploiement général.'
  ],
  checklist: [
    'Le questionnaire commence-t-il par une introduction claire précisant l’objectif, la durée estimée et la garantie d’anonymat (RGPD) ?',
    'Toutes les questions sont-elles rigoureusement neutres sans induire la moindre orientation de réponse ?',
    'Chaque question ne porte-t-elle que sur une seule et unique idée à la fois (zéro double-barrelled) ?',
    'Les échelles de Likert sont-elles symétriques avec des libellés équilibrés ?',
    'Le temps estimé de complétion reste-t-il strictement sous le seuil de fatigue des 10 minutes ?',
    'Un pré-test pilote a-t-il été validé auprès d’utilisateurs tests avant l’envoi officiel ?'
  ],
  notions: [
    'Typologie des questions d’enquête',
    'Échelles psychométriques de Likert',
    'Moyenne pondérée et écart-type de consensus',
    'Différentiel sémantique d’Osgood',
    'Biais suggestifs (leading questions)',
    'Biais à double détente (double-barrelled)',
    'Entonnoir de passation et mode CAWI',
    'Taux d’abandon et fatigue du répondant'
  ],
  pitfalls: [
    'Utiliser des formules suggestives telles que « Ne trouvez-vous pas que... », qui forcent l’assentiment et ruinent la neutralité.',
    'Poser une question combinant deux qualificatifs distincts (ex: « rapide et agréable ») empêchant le répondant de nuancer.',
    'Proposer un questionnaire fleuve de 80 questions prenant 45 minutes, conduisant à 80% d’abandon en cours de route.',
    'Changer le sens des échelles de Likert d’une question à l’autre (mettre 5 pour « Très mauvais » sur un item et 5 pour « Très bon » sur l’autre).'
  ],
  questions: [
    {
      stem: 'Quel défaut méthodologique rédhibitoire présente la question : « Êtes-vous satisfait de la rapidité et du coût de notre solution cloud ? » ?',
      opts: [
        'Elle est écrite en français au lieu d’être en anglais',
        'Il s’agit d’une question à double détente (double-barrelled) qui évalue deux attributs distincts simultanément (rapidité et coût), rendant la réponse impossible si l’un est bon et l’autre mauvais',
        'Elle utilise le mot cloud qui est interdit dans les sondages',
        'Elle comporte plus de 100 caractères'
      ],
      correct: 1,
      exp: 'Une question à double détente force le répondant à une moyenne arbitraire entre deux dimensions indépendantes. Elle doit obligatoirement être scindée en deux questions.'
    },
    {
      stem: 'Sur une échelle de Likert de 1 à 5 points, qu’indique un écart-type faible (ex: σ = 0.45) sur un échantillon de 100 répondants ?',
      opts: [
        'Que le compilateur de données est tombé en panne',
        'Qu’il existe un consensus très fort entre les répondants, leurs notes étant très concentrées autour de la moyenne',
        'Que la moitié des répondants ont menti',
        'Que l’échelle doit être annulée'
      ],
      correct: 1,
      exp: 'L’écart-type mesure la dispersion autour de la moyenne : plus il est proche de 0, plus l’accord et le consensus entre les participants sont unanimes.'
    },
    {
      stem: 'Pourquoi est-il fortement recommandé de placer les questions signalétiques (âge, intitulé de poste, taille d’entreprise) à la toute fin d’un questionnaire ?',
      opts: [
        'Pour éviter que les répondants ne s’endorment immédiatement',
        'Parce que ces questions sociodémographiques peuvent être perçues comme intrusives au début et risqueraient de provoquer un abandon précoce avant même d’aborder le sujet principal',
        'Parce que la loi RGPD interdit de collecter ces données au début',
        'Pour des raisons purement esthétiques de mise en page'
      ],
      correct: 1,
      exp: 'Placer les données démographiques en fin de parcours minimise les refus d’engagement initial : une fois les questions métier complétées, le répondant est plus enclin à finaliser son profil.'
    },
    {
      stem: 'Dans un questionnaire administré en ligne, comment se calcule précisément le taux d’abandon en cours de route (drop-off rate) ?',
      opts: [
        '(Nombre de questionnaires envoyés - Nombre d’ouverts) / Envoyés',
        '(Nombre de questionnaires initiés - Nombre de questionnaires complétés) / Nombre de questionnaires initiés',
        'Nombre de questions divisé par le nombre de minutes',
        'Nombre total de clics sur le bouton Suivant'
      ],
      correct: 1,
      exp: 'Le drop-off rate mesure la déperdition parmi les personnes qui ont effectivement commencé à répondre : ((Initiés - Complétés) / Initiés) * 100.'
    },
    {
      stem: 'Qu’est-ce qu’un « pré-test pilote » dans la phase d’ingénierie d’un questionnaire ?',
      opts: [
        'Un vol d’avion d’essai pour l’équipe de recherche',
        'Une passation d’essai du questionnaire auprès d’un petit groupe test (5 à 15 personnes) pour mesurer la durée de remplissage, vérifier la compréhension et détecter les ambiguïtés avant le déploiement général',
        'Un test de résistance physique des ordinateurs',
        'Un tirage au sort des gagnants d’un lot commercial'
      ],
      correct: 1,
      exp: 'Le pré-test teste l’instrument de mesure en conditions réelles sur un échantillon réduit pour identifier et rectifier tout écueil sémantique ou technique.'
    },
    {
      stem: 'Quelle formulation respecte le principe de neutralité de rédaction pour une enquête de satisfaction logicielle ?',
      opts: [
        'Ne trouvez-vous pas que la version 2.0 est bien plus performante ?',
        'Vous conviendrez certainement que notre équipe a fait un travail remarquable.',
        'Quel est votre niveau d’accord avec l’affirmation suivante : « Le temps de chargement de l’application répond à mes attentes opérationnelles » ?',
        'N’est-il pas évident que la nouvelle interface surpasse l’ancienne ?'
      ],
      correct: 2,
      exp: 'La formulation neutre pose une assertion mesurable et symétrique sans adjectifs flatteurs ni incitation psychologique vers l’approbation.'
    },
    {
      stem: 'Quelle est la durée maximale de passation généralement recommandée pour une enquête en ligne auprès de professionnels IT afin d’éviter l’effondrement de la qualité des réponses ?',
      opts: [
        '1 minute maximum',
        '7 à 10 minutes maximum (environ 15 à 25 questions ciblées)',
        '2 heures obligatoires',
        'Une journée entière de travail'
      ],
      correct: 1,
      exp: 'Au-delà de 10 minutes, la fatigue cognitive entraîne des abandons massifs et des réponses aléatoires de désengagement (straightlining).'
    },
    {
      stem: 'Qu’est-ce que le phénomène de « Straightlining » (ou réponses en ligne droite) lors du remplissage d’une batterie de questions Likert ?',
      opts: [
        'Le fait pour le répondant de tracer des lignes au crayon sur son écran',
        'Le comportement de fatigue consistant à cocher la même case (ex: tout à 3 ou tout à 5) sans lire les questions pour expédier le questionnaire au plus vite',
        'Une nouvelle technique statistique de régression linéaire',
        'L’alignement des questions en mode paysage'
      ],
      correct: 1,
      exp: 'Le straightlining est un biais de non-engagement provoqué par la fatigue ou l’ennui : l’utilisateur clique sur la même colonne d’un bout à l’autre de la grille.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’une échelle de Likert à 5 points ?',
      a: 'Une échelle psychométrique mesurant l’intensité de l’accord ou de la satisfaction de 1 (« Pas du tout d’accord ») à 5 (« Tout à fait d’accord »).'
    },
    {
      q: 'Qu’est-ce qu’une question à double détente (double-barrelled) ?',
      a: 'Une question interrogeant sur deux sujets distincts à la fois (ex: rapide et sécurisé), empêchant toute réponse nuancée.'
    },
    {
      q: 'Qu’est-ce qu’une question suggestive (leading question) ?',
      a: 'Une question formulée de manière à orienter psychologiquement le répondant vers une réponse désirée (ex: « Ne pensez-vous pas que... »).'
    },
    {
      q: 'Comment s’interprète l’écart-type sur une échelle de Likert ?',
      a: 'Il mesure la dispersion : un écart-type faible traduit un consensus des répondants, un écart-type élevé signale une forte polarisation des avis.'
    },
    {
      q: 'Qu’est-ce que le taux d’abandon (drop-off rate) ?',
      a: 'Le pourcentage de personnes ayant commencé le questionnaire mais ne l’ayant pas terminé : ((Initiés - Complétés) / Initiés) · 100.'
    },
    {
      q: 'Quel est l’intérêt du pré-test pilote ?',
      a: 'Tester le questionnaire auprès d’un petit échantillon pour chronométrer la passation et corriger les formulations ambiguës avant la diffusion large.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la typologie des questions, l’échelle de Likert, les biais suggestifs et le calcul du taux d’abandon.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez l’écart-type de consensus, les techniques de neutralité et le phénomène de straightlining.'
    },
    {
      cls: 'high',
      text: '8/8 : Remarquable ! Vous maîtrisez la conception scientifique d’instruments de mesure et de questionnaires quantitatifs de niveau expert.'
    }
  ]
};
