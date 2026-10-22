/**
 * Chapitre 6 du cours « Masterclass Apprendre à apprendre » B2 — Métacognition, Chronobiologie & Routines Durables.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Métacognition, Chronobiologie &amp; Routines Durables',
  short: 'Métacognition &amp; Routines',
  toc: 'Métacognition de Flavell, cycles ultradiens et Pomodoro, hygiène du sommeil et conception d’un système d’apprentissage continu.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Être intelligent ne suffit pas pour réussir des études exigeantes : la capacité à s’auto-réguler, à gérer son attention ' +
    'et à respecter son rythme biologique est le véritable facteur différenciateur. La métacognition (la pensée sur sa propre pensée) ' +
    'et la chronobiologie permettent de construire un système de travail pérenne, évitant le burn-out et maximisant la performance intellectuelle.',

  objectives: [
    'développer sa métacognition selon le modèle de John Flavell (connaissance métacognitive et régulation) ;',
    'mesurer et affiner son étalonnage métacognitif (Calibration &amp; Score de Brier) ;',
    'exploiter les rythmes ultradiens (90 minutes) et la technique Pomodoro de concentration fractionnée ;',
    'synchroniser ses séances exigeantes avec son chronotype et les pics de vigilance circadiens ;',
    'bâtir un protocole d’apprentissage durable tout au long de sa carrière d’ingénieur.'
  ],

  sections: [
    {
      title: 'La métacognition selon John Flavell : penser sur sa propre pensée',
      html: [
        '<p>Définie dans les années 1970 par le psychologue <strong>John Flavell</strong>, la <strong>métacognition</strong> ' +
        'est la capacité d’un individu à analyser, évaluer et réguler ses propres processus d’apprentissage. Elle s’articule en deux piliers :</p>',
        '<ul>\n' +
        '  <li><strong>La connaissance métacognitive</strong> : ce que vous savez sur vous-même en tant qu’apprenant ' +
        '(vos forces, vos biais, la nature de la tâche et l’adéquation des stratégies disponibles).</li>\n' +
        '  <li><strong>La régulation métacognitive</strong> : les actions concrètes menées pendant l’étude :</li>\n' +
        '</ul>',
        '<ol>\n' +
        '  <li><em>Planification</em> : estimer le temps requis, fixer des objectifs clairs et choisir les outils adéquats.</li>\n' +
        '  <li><em>Monitoring (Surveillance)</em> : se poser en temps réel la question : « Suis-je vraiment en train de comprendre ce paragraphe ? ».</li>\n' +
        '  <li><em>Évaluation</em> : mesurer le résultat obtenu par rapport à l’objectif initial et réajuster la méthode en cas d’écart.</li>\n' +
        '</ol>',
        box('danger', 'Le déficit de monitoring', 'alert',
          '    <p>Le principal écueil de l’étudiant novice est l’absence de monitoring : il avance mécaniquement dans ses slides ' +
          'sans s’apercevoir qu’il a décroché depuis 10 pages. S’arrêter toutes les 15 minutes pour reformuler l’idée maîtresse ' +
          'rétablit immédiatement le contrôle métacognitif.</p>')
      ].join('\n')
    },
    {
      title: 'Chronobiologie : rythmes ultradiens, circadiens et technique Pomodoro',
      html: [
        '<p>Le cerveau n’est pas un processeur linéaire capable de fonctionner à 100 % pendant 8 heures d’affilée. ' +
        'Ses ressources attentionnelles fluctuent selon deux horloges biologiques clés :</p>',
        '<ul>\n' +
        '  <li><strong>Le rythme circadien (24 h)</strong> : régulé par le noyau suprachiasmatique et la sécrétion de cortisol ' +
        'et de mélatonine. Pour la majorité des individus, le pic de vigilance logique maximale se situe entre <strong>9 h et 12 h</strong>, ' +
        'suivi d’un creux post-prandial vers 14 h, puis d’un second pic en fin d’après-midi (17 h - 19 h).</li>\n' +
        '  <li><strong>Le cycle ultradien (BRAC - Basic Rest-Activity Cycle de 90 min)</strong> : Nathaniel Kleitman a mis en évidence ' +
        'que l’attention humaine intense plafonne à 90 minutes consécutives, avant d’exiger 15 à 20 minutes de repos neural.</li>\n' +
        '</ul>',
        '<p>La <strong>technique Pomodoro</strong> de Francesco Cirillo transpose ces cycles sous forme de micro-blocs rythmés :</p>',
        '<blockquote>\n' +
        '  <strong>25 minutes de focus pur</strong> &rarr; <strong>5 minutes de pause déconnectée</strong>.<br>\n' +
        '  Après 4 cycles (2 heures), prendre une <strong>pause longue de 20 à 30 minutes</strong> sans écran.\n' +
        '</blockquote>'
      ].join('\n')
    },
    {
      title: 'L’étalonnage métacognitif et le score de Brier',
      html: [
        '<p>Un apprenant d’élite se caractérise par une <strong>calibration précise</strong> : sa confiance subjective ' +
        'reflète fidèlement sa probabilité objective de succès.</p>',
        '<p>En psychologie cognitive, le <strong>score de Brier</strong> formalise l’erreur de calibration :</p>',
        '<div class="formule-box">\n' +
        '  $$BS = \\frac{1}{N} \\sum_{i=1}^N (c_i - o_i)^2$$\n' +
        '</div>',
        '<p>où $c_i \\in [0, 1]$ est la probabilité estimée par l’étudiant et $o_i \\in \\{0, 1\\}$ est le résultat réel.</p>',
        '<ul>\n' +
        '  <li><strong>BS proche de 0</strong> : lucidité métacognitive parfaite. L’étudiant sait exactement ce qu’il sait et ce qu’il ignore.</li>\n' +
        '  <li><strong>BS &gt; 0,25</strong> : décalage critique (surconfiance aveugle ou doute excessif paralysant).</li>\n' +
        '</ul>',
        box('astuce', 'L’hygiène attentionnelle et le mode diffus', 'lightbulb',
          '    <p>Barbara Oakley (A Mind for Numbers) oppose le <strong>mode concentré</strong> (focus analytique serré dans le cortex préfrontal) ' +
          'au <strong>mode diffus</strong> (réseau du mode par défaut, DMN). Les idées créatives et les résolutions de blocages surviennent ' +
          'souvent lorsque l’on quitte l’écran pour une marche, une douche ou une sieste : le mode diffus tisse alors des liens en arrière-plan.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Selon John Flavell, quelle composante de la métacognition désigne la surveillance active de sa propre compréhension pendant l’étude ?', opts: ['Le monitoring métacognitif', 'La mémoire sensorielle', 'Le réflexe myotatique'], correct: 0, exp: 'Le monitoring est la boucle de contrôle interne qui évalue en continu si la notion est réellement comprise.' },
    { stem: 'Quelle est la durée maximale d’attention soutenue d’un cycle ultradien découvert par Nathaniel Kleitman ?', opts: ['Environ 90 minutes (Basic Rest-Activity Cycle)', '8 heures consécutives', '10 minutes'], correct: 0, exp: 'L’attention humaine intense plafonne à 90 minutes avant d’exiger une pause de récupération neuronale.' },
    { stem: 'Que préconise le protocole Pomodoro standard de Francesco Cirillo ?', opts: ['25 minutes de focus complet suivies de 5 minutes de pause courte', '60 minutes de travail et 30 minutes de sieste', '12 heures de codage continu'], correct: 0, exp: 'Le Pomodoro cadence le travail en intervalles de 25 minutes de concentration absolue et 5 minutes de pause.' },
    { stem: 'Que mesure le score de Brier en sciences cognitives ?', opts: ['L’écart quadratique entre la confiance déclarée par l’apprenant et son taux de réussite réel', 'Le quotient intellectuel', 'La quantité de pages lues par minute'], correct: 0, exp: 'Le score de Brier quantifie l’étalonnage métacognitif : plus il est proche de 0, plus la lucidité est forte.' },
    { stem: 'Quel nom Barbara Oakley donne-t-elle au mode mental de réflexion d’arrière-plan qui connecte les idées de façon créative ?', opts: ['Le mode diffus (Default Mode Network)', 'Le mode concentrateur', 'Le mode binaire'], correct: 0, exp: 'Le mode diffus opère quand l’attention consciente se relâche, permettant la synthèse de concepts éloignés.' },
    { stem: 'À quel moment de la journée le pic circadien de vigilance analytique se situe-t-il pour la majorité des individus ?', opts: ['En milieu de matinée (9 h à 12 h)', 'À 14 h après le repas', 'À 4 h du matin'], correct: 0, exp: 'La courbe circadienne de cortisol et de température corporelle favorise la concentration logique le matin.' },
    { stem: 'Que doit faire un étudiant qui constate un score de Brier élevé (&gt; 0,25) ?', opts: ['Réétalonner son jugement en s’auto-testant régulièrement sans indices pour éliminer la surconfiance', 'Arrêter totalement d’étudier', 'Augmenter le nombre d’heures de révision de nuit'], correct: 0, exp: 'Un score de Brier élevé trahit une mauvaise estimation de ses acquis, qu’un rappel actif rigoureux permet de corriger.' },
    { stem: 'Pourquoi est-il crucial de faire des pauses déconnectées de tout écran (smartphone, réseaux sociaux) ?', opts: ['Pour permettre au réseau par défaut (mode diffus) de consolider les données sans nouvelle charge cognitive', 'Pour économiser la batterie du téléphone', 'Pour éviter d’user les touches du clavier'], correct: 0, exp: 'Consulter son smartphone pendant la pause sature la mémoire de travail avec une nouvelle charge extrinsèque.' }
  ],

  pitfalls: [
    'Travailler 4 heures d’affilée sans pause jusqu’à épuisement total en croyant être plus productif.',
    'Consulter les réseaux sociaux ou jouer sur son téléphone pendant les temps de pause Pomodoro (ce qui n’offre aucun repos cognitif).',
    'Placer les matières les plus ardues et mathématiques dans le creux de vigilance de 14 h au lieu de les traiter le matin.',
    'Confondre temps passé devant son bureau et temps réel d’effort cognitif focalisé.',
    'Négliger la phase d’évaluation métacognitive à la fin d’une séance d’étude pour identifier les points à revoir.'
  ],

  methodTitle: 'Bâtir sa routine d’apprentissage durable',
  method: [
    '<strong>Planifier selon son chronotype</strong> : réserver le créneau du matin (9 h - 12 h) aux matières les plus exigeantes conceptuellement.',
    '<strong>Découper en blocs Pomodoro (25/5 min)</strong> : bannir toute source de distraction et programmer des sessions cadencées.',
    '<strong>Pratiquer des pauses 100 % déconnectées</strong> : marcher, s’hydrater ou regarder au loin pour activer le mode diffus.',
    '<strong>Surveiller sa métacognition (Monitoring)</strong> : noter à chaud sur chaque chapitre sa confiance estimée (0 à 1) avant test.',
    '<strong>Calculer sa calibration</strong> : comparer ses estimations à ses scores effectifs pour ajuster sa lucidité intellectuelle.'
  ],

  summary: [
    'La métacognition (Flavell) est le pilotage conscient de ses connaissances et de ses stratégies d’apprentissage.',
    'Les rythmes ultradiens de 90 minutes et la méthode Pomodoro protègent les réserves attentionnelles de la saturation.',
    'Le score de Brier mesure la fidélité de l’étalonnage : un bon apprenant sait précisément ce qu’il ne maîtrise pas encore.',
    'L’alternance entre le mode concentré et le mode diffus (Oakley) résout les blocages par incubation neuronale.',
    'L’apprentissage d’excellence est un marathon d’endurance fondé sur des routines saines et une hygiène de vie préservée.'
  ],

  checklist: [
    'Je sais découper mon travail en cycles Pomodoro de 25 minutes de focus pur.',
    'J’effectue des pauses réellement reposantes sans stimulation d’écran.',
    'J’adapte mes créneaux d’étude exigeants aux pics de vigilance circadiens.',
    'Je surveille activement ma compréhension en cours de lecture (monitoring).',
    'Je mesure mon niveau de calibration pour éliminer la surconfiance illusoire.'
  ],

  notions: ['Métacognition', 'John Flavell', 'Monitoring', 'Régulation', 'Chronobiologie', 'Rythmes circadiens', 'Rythmes ultradiens', 'Technique Pomodoro', 'Francesco Cirillo', 'Score de Brier', 'Mode concentré', 'Mode diffus', 'Barbara Oakley'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les piliers de la métacognition et les cycles Pomodoro.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le calcul du score de Brier et la chronobiologie.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les principes de l’auto-régulation durable.' },
    { cls: 'top', text: '≥ 95 % — Parfait : vous possèdez une maîtrise experte de la science de l’apprentissage !' }
  ],

  flashcards: [
    { q: 'Quels sont les deux volets de la métacognition selon John Flavell ?', a: 'La connaissance métacognitive (savoir sur ses propres capacités) et la régulation métacognitive (planifier, surveiller, évaluer).' },
    { q: 'Qu’est-ce que le cycle ultradien d’attention (BRAC) ?', a: 'Un rythme biologique d’environ 90 minutes de vigilance maximale suivi d’un besoin physiologique de récupération.' },
    { q: 'Comment s’organise la technique Pomodoro ?', a: '25 min de travail focalisé, 5 min de pause courte ; après 4 cycles, une pause longue de 20 à 30 min.' },
    { q: 'Que mesure le score de Brier ?', a: 'L’erreur moyenne de calibration métacognitive : BS = (1/N) * &Sigma;(confiance - resultat)^2.' },
    { q: 'Quelle est la différence entre le mode concentré et le mode diffus selon Barbara Oakley ?', a: 'Le mode concentré focalise l’attention préfrontale ; le mode diffus (réseau par défaut) tisse des liens créatifs inconscients.' },
    { q: 'Pourquoi faut-il éviter les écrans pendant les pauses de travail ?', a: 'Car ils apportent une nouvelle charge cognitive extrinsèque qui empêche le cerveau de consolider les acquis.' }
  ],

  next: {
    href: '../atelier.html',
    label: 'Atelier de code interactif'
  }
};
