/**
 * Chapitre 3 du cours « Ingénierie du besoin » B2 — Techniques d’Élicitation & Découverte du Besoin.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Techniques d’Élicitation &amp; Découverte du Besoin',
  short: 'Techniques d’Élicitation',
  toc: 'Entretiens individuels, ateliers collaboratifs, observation terrain (shadowing), questionnaires et personas utilisateurs.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Les utilisateurs finaux ne savent pas toujours formuler précisément ce dont ils ont besoin. Entre ce qu’un client ' +
    'dit, ce qu’il fait réellement et ce dont il a besoin, il existe souvent un fossé considérable. L’ingénieur ' +
    'des exigences doit déployer une palette de techniques d’élicitation complémentaires pour faire émerger ' +
    'les besoins tacites et surmonter les biais cognitifs.',

  objectives: [
    'choisir la technique d’élicitation optimale selon le contexte organisationnel et le profil des parties prenantes ;',
    'conduire des entretiens semi-directifs et des ateliers collaboratifs (workshops) productifs ;',
    'pratiquer l’observation directe et le shadowing pour confronter travail prescrit et travail réel ;',
    'dimensionner un échantillon de questionnaire statistiquement représentatif d’une population cible ;',
    'construire des personas utilisateurs réalistes dotés d’objectifs, de frustrations et de scénarios d’usage.'
  ],

  sections: [
    {
      title: 'Panorama et matrice de sélection des techniques d’élicitation',
      html: [
        '<p>L’élicitation (du latin <em>elicere</em>, faire jaillir) consiste à extraire les besoins conscients et inconscients. ' +
        'Le choix de la technique dépend du nombre d’utilisateurs et de la maturité du sujet :</p>',
        '<ul>\n' +
        '  <li><strong>Entretiens individuels (ouverts ou semi-directifs)</strong> : idéal pour les acteurs clés et décideurs, ' +
        'permet d’explorer en profondeur les enjeux politiques et stratégiques.</li>\n' +
        '  <li><strong>Ateliers collaboratifs (Workshops / JAD - Joint Application Development)</strong> : réunit utilisateurs, ' +
        'experts métier et développeurs pour négocier et résoudre les divergences en direct.</li>\n' +
        '  <li><strong>Questionnaires &amp; Sondages</strong> : adapté aux très larges populations d’utilisateurs pour ' +
        'quantifier des tendances ou valider statistiquement des hypothèses.</li>\n' +
        '  <li><strong>Observation directe &amp; Shadowing</strong> : indispensable pour observer les routines terrain réelles ' +
        'et les contournements manuels que personne ne mentionne à l’oral.</li>\n' +
        '</ul>',
        box('astuce', 'La règle d’or de la triangulation', 'lightbulb',
          '    <p>Ne vous fiez jamais à une seule technique. La <strong>triangulation</strong> consiste à croiser au moins ' +
          'trois sources : par exemple, un entretien stratégique avec le manager, une journée d’observation terrain avec ' +
          'les opérateurs, et un questionnaire de validation auprès de l’ensemble des agences.</p>')
      ].join('\n')
    },
    {
      title: 'L’observation active et le shadowing : travail prescrit vs travail réel',
      html: [
        '<p>Une différence majeure existe entre la procédure officielle (le travail prescrit dans le manuel) et ' +
        'la réalité quotidienne de l’opérateur (le travail réel) :</p>',
        '<ul>\n' +
        '  <li><strong>Le Shadowing (Filature professionnelle)</strong> : l’analyste suit un utilisateur pas à pas pendant sa journée, ' +
        'sans intervenir, en consignant chaque action, interruption, outil tiers utilisé (tableurs personnels, post-its).</li>\n' +
        '  <li><strong>Découverte des « Workarounds » (Contournements)</strong> : les utilisateurs inventent souvent des béquilles ' +
        'informelles pour pallier les défauts de l’ancien système. Ces contournements révèlent les besoins métier les plus urgents.</li>\n' +
        '  <li><strong>L’effet Hawthorne</strong> : attention au biais par lequel un individu modifie son comportement habituel ' +
        'du simple fait qu’il se sait observé. D’où la nécessité de séances d’immersion prolongées.</li>\n' +
        '</ul>'
      ].join('\n')
    },
    {
      title: 'L’enquête par questionnaire et la représentativité statistique',
      html: [
        '<p>Pour interroger une population nombreuse (clients grand public, milliers d’employés), le questionnaire ' +
        'permet de quantifier les besoins à moindre coût. Pour que les résultats soient exploitables, la taille de ' +
        'l’échantillon doit être calculée rigoureusement :</p>',
        '<p>Pour une population totale <em>N</em> avec une marge d’erreur tolérée <em>e</em> (ex. 5 % soit 0,05), ' +
        'la formule simplifiée de <strong>Taro Yamane</strong> fournit la taille minimale de l’échantillon <em>n</em> :</p>',
        '<div class="formule-box">\n' +
        '  $$n = \\frac{N}{1 + N \\cdot e^2}$$\n' +
        '</div>',
        '<p>Par exemple, pour une communauté de $N = 2\\,000$ utilisateurs avec une marge d’erreur de 5 % ($e = 0{,}05$) :</p>',
        '<p>$$n = \\frac{2\\,000}{1 + 2\\,000 \\times 0{,}0025} = \\frac{2\\,000}{1 + 5} = \\frac{2\\,000}{6} \\approx 334 \\text{ répondants}$$</p>',
        box('danger', 'Le biais d’auto-sélection dans les sondages', 'alert',
          '    <p>Seuls les utilisateurs très satisfaits ou très mécontents ont tendance à répondre spontanément à une enquête en ligne. ' +
          'Veillez à relancer des profils représentatifs et équilibrez les questions ouvertes et fermées sur échelle de Likert (1 à 5).</p>')
      ].join('\n')
    },
    {
      title: 'La modélisation par personas et cartes d’empathie',
      html: [
        '<p>Un <strong>Persona</strong> est un archétype fictif représentant un segment d’utilisateurs cibles partageant ' +
        'des comportements, des motivations et des contraintes similaires. Popularisé par Alan Cooper, il humanise l’analyse des exigences :</p>',
        '<ul>\n' +
        '  <li><strong>Identité &amp; Rôle</strong> : nom représentatif (ex. « Sophie, gestionnaire de paie pressée »), photo, démographie.</li>\n' +
        '  <li><strong>Objectifs métier</strong> : ce que le persona cherche à accomplir au quotidien (gains de temps, fiabilité).</li>\n' +
        '  <li><strong>Points de douleur (Pain points)</strong> : frustrations vécues avec le système actuel, peurs, blocages récurrents.</li>\n' +
        '  <li><strong>Niveau technologique</strong> : aisance avec les outils numériques (novice, intermédiaire, expert).</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle technique d’élicitation est la plus efficace pour découvrir des contournements (workarounds) non documentés ?', opts: ['L’observation directe et le shadowing', 'Un sondage par email à questions fermées', 'La lecture du contrat commercial'], correct: 0, exp: 'L’observation sur le terrain permet de voir ce que l’utilisateur fait réellement sans qu’il n’ait à théoriser ses pratiques.' },
    { stem: 'Que désigne l’effet Hawthorne en observation terrain ?', opts: ['La modification du comportement habituel d’une personne lorsqu’elle se sent observée', 'L’arrêt brutal d’un serveur en cas de surcharge', 'Le coût exponentiel des bugs'], correct: 0, exp: 'L’effet Hawthorne est le biais par lequel un sujet adapte ou enjolive sa pratique lorsqu’un observateur le regarde travailler.' },
    { stem: 'Dans la formule d’échantillon de Taro Yamane $n = N / (1 + N \\cdot e^2)$, que représente la variable $e$ ?', opts: ['La marge d’erreur tolérée (ex. 0,05 pour 5 %)', 'L’écart-type de la population', 'Le nombre d’experts interrogés'], correct: 0, exp: '$e$ est la marge d’erreur acceptable exprimée en valeur décimale (ex. 5 % = 0,05).' },
    { stem: 'Quel est le rôle principal d’un Persona selon Alan Cooper ?', opts: ['Donner un visage humain et des objectifs concrets à un groupe cible d’utilisateurs', 'Remplacer l’équipe de développement', 'Générer automatiquement des scripts SQL'], correct: 0, exp: 'Le persona incarne les besoins, contraintes et frustrations d’un groupe utilisateur pour guider la conception centrée utilisateur.' },
    { stem: 'Quel format d’atelier regroupe conjointement utilisateurs, décideurs et équipe technique pour faire converger les besoins ?', opts: ['Atelier JAD (Joint Application Development)', 'Daily standup de 5 minutes', 'Audit fiscal surprise'], correct: 0, exp: 'Le workshop JAD rassemble toutes les parties prenantes en session intensive pour valider le périmètre.' },
    { stem: 'Pourquoi la triangulation est-elle préconisée en élicitation ?', opts: ['Pour croiser plusieurs méthodes et fiabiliser la détection des véritables besoins', 'Pour multiplier par 3 le coût de la prestation', 'Pour utiliser obligatoirement trois écrans'], correct: 0, exp: 'Croiser entretiens, observation et statistiques neutralise les biais inhérents à une technique isolée.' },
    { stem: 'Quelle attitude est recommandée à l’analyste lors d’une séance de shadowing pur ?', opts: ['Observer discrètement sans interrompre ni corriger l’utilisateur dans son travail', 'Prendre le contrôle du clavier et faire la tâche à sa place', 'Donner des cours magistraux'], correct: 0, exp: 'Le shadowing vise à capter la réalité du terrain sans perturber le flux de travail naturel de l’opérateur.' },
    { stem: 'Sur quel type d’échelle mesure-t-on couramment le niveau d’accord dans un questionnaire d’élicitation ?', opts: ['L’échelle de Likert (ex. de 1 « Pas du tout d’accord » à 5 « Tout à fait d’accord »)', 'L’échelle de Richter', 'L’échelle de Beaufort'], correct: 0, exp: 'L’échelle de Likert quantifie fidèlement les perceptions et préférences des sondés.' }
  ],

  pitfalls: [
    'Se contenter d’interviewer uniquement les directeurs sans jamais rencontrer les utilisateurs opérationnels finaux.',
    'Prendre pour argent comptant les manuels de procédures internes sans vérifier leur application sur le terrain.',
    'Poser des questions orientées lors des entretiens (ex. « Vous trouvez aussi que l’écran actuel est trop lent, n’est-ce pas ? »).',
    'Concevoir des personas stéréotypés fondés sur des préjugés personnels plutôt que sur des données terrain réelles.',
    'Lancer un questionnaire sans test pilote préalable, menant à des questions ambiguës et inexploitables.'
  ],

  methodTitle: 'Conduire une campagne d’élicitation terrain',
  method: [
    '<strong>Définir les segments d’utilisateurs</strong> : identifier les profils cibles et choisir la combinaison de techniques adaptée.',
    '<strong>Réaliser les entretiens de cadrage</strong> : recueillir les objectifs macro et contraintes auprès des sponsors et décideurs.',
    '<strong>Mener des sessions d’immersion (Shadowing)</strong> : passer du temps sur le terrain avec les utilisateurs réels pour noter les contournements.',
    '<strong>Compiler et trianguler les données</strong> : confronter les déclarations verbales aux observations et aux statistiques d’usage.',
    '<strong>Formaliser les Personas et Scénarios</strong> : modéliser les archétypes utilisateurs et faire valider la synthèse par les métiers.'
  ],

  summary: [
    'L’élicitation découvre les besoins réels à travers entretiens, ateliers, observations et questionnaires.',
    'Le shadowing confronte le travail prescrit (théorique) au travail réel quotidien et révèle les contournements.',
    'La formule de Yamane calcule la taille d’échantillon minimale nécessaire pour une enquête statistiquement fiable.',
    'Les personas humanisent les segments d’utilisateurs en formalisant leurs objectifs et leurs points de douleur.',
    'La triangulation des sources prévient les biais cognitifs et l’effet Hawthorne.'
  ],

  checklist: [
    'Je sais choisir la technique d’élicitation pertinente selon la taille de la population.',
    'Je comprends l’intérêt du shadowing pour détecter les contournements manuels.',
    'Je sais calculer la taille d’un échantillon représentatif avec la formule de Yamane.',
    'Je sais structurer une fiche de persona avec objectifs et points de douleur.',
    'Je sais poser des questions neutres et non orientées en entretien.'
  ],

  notions: ['Élicitation', 'Shadowing', 'Effet Hawthorne', 'Workaround', 'Taro Yamane', 'Échantillonnage', 'Personas', 'Triangulation', 'JAD'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les techniques d’élicitation et le calcul d’échantillon de Yamane.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la démarche de shadowing et la conception de personas.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les démarches d’investigation terrain.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la modélisation et priorisation au chapitre 4.' }
  ],

  flashcards: [
    { q: 'Que signifie l’élicitation des exigences ?', a: 'C’est le processus de découverte, recueil et extraction des besoins auprès des parties prenantes.' },
    { q: 'Quelle est la différence entre travail prescrit et travail réel ?', a: 'Le prescrit est la procédure officielle théorique ; le réel correspond aux actions et contournements observés sur le terrain.' },
    { q: 'Quelle formule simplifiée permet de calculer la taille d’échantillon d’un sondage ?', a: 'La formule de Taro Yamane : n = N / (1 + N * e^2).' },
    { q: 'Quels sont les composants clés d’une fiche Persona ?', a: 'Rôle/identité, objectifs quotidiens, points de douleur (frustrations), et aisance numérique.' },
    { q: 'Pourquoi faut-il éviter les questions orientées en entretien ?', a: 'Car elles induisent la réponse de l’interlocuteur et faussent la réalité des besoins réels.' },
    { q: 'Qu’est-ce qu’un atelier JAD ?', a: 'Une session collaborative intensive réunissant décideurs, utilisateurs et techniciens pour aligner le périmètre.' }
  ],

  next: {
    href: 'chapitre4.html',
    label: 'Chapitre 4 : Modélisation &amp; Priorisation des Exigences'
  }
};
