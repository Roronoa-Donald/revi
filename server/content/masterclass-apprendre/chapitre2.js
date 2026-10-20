/**
 * Chapitre 2 du cours « Masterclass Apprendre à apprendre » B2 — L’Illusion de Compétence & Le Rappel Actif.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'L’Illusion de Compétence &amp; Le Rappel Actif',
  short: 'Illusion &amp; Rappel Actif',
  toc: 'L’effet Dunning-Kruger, les pièges de la relecture passive, l’effet de test (testing effect) et la technique de Feynman.',
  time: '≈ 2 h 40 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Surligner tout un manuel au feutre jaune donne une fausse sensation de sécurité : le texte paraît familier, ' +
    'donc on s’imagine le maîtriser. Le jour de l’épreuve, devant la copie blanche sans le support sous les yeux, ' +
    'c’est le trou noir. Cette désillusion porte un nom scientifique : l’illusion de compétence. ' +
    'Seul le rappel actif (Active Recall) permet de tester et forger une mémoire véritablement robuste.',

  objectives: [
    'démasquer l’illusion de compétence et la fausse aisance cognitive (Fluency Illusion) ;',
    'comprendre pourquoi le surlignage passif et la simple relecture sont parmi les méthodes les moins efficaces ;',
    'exploiter l’effet de test (Testing Effect / Retrieval Practice de Roediger &amp; Karpicke) ;',
    'appliquer la méthode de la feuille blanche pour sonder son niveau réel sans complaisance ;',
    'maîtriser les 4 étapes de la technique de vulgarisation de Richard Feynman.'
  ],

  sections: [
    {
      title: 'L’illusion de compétence et le piège du surlignage passif',
      html: [
        '<p>L’<strong>illusion de compétence</strong> survient quand la reconnaissance d’un texte est confondue avec ' +
        'la capacité à le restituer spontanément. Deux mécanismes psychologiques l’alimentent :</p>',
        '<ul>\n' +
        '  <li><strong>La fluidité perceptive (Fluency Illusion)</strong> : lorsque nous relisons un paragraphe pour la troisième fois, ' +
        'le regard glisse avec aisance. Le cerveau interprète cette facilité de lecture comme une preuve de maîtrise intellectuelle. ' +
        'En réalité, c’est une simple familiarité visuelle de surface.</li>\n' +
        '  <li><strong>L’effet Dunning-Kruger</strong> : les étudiants qui maîtrisent le moins un sujet sont statistiquement ' +
        'ceux qui surestiment le plus leur performance future, faute d’avoir conscience de l’étendue de leurs lacunes.</li>\n' +
        '</ul>',
        box('danger', 'L’inefficacité prouvée du surlignage', 'alert',
          '    <p>Une méta-analyse majeure de John Dunlosky (2013) évaluant dix techniques d’apprentissage ' +
          'a classé le <strong>surlignage au marqueur</strong> et la <strong>relecture passive</strong> dans la catégorie ' +
          'd’utilité <em>« Faible » (Low Utility)</em>. Le surlignage occupe la main sans mobiliser l’effort de récupération synaptique.</p>')
      ].join('\n')
    },
    {
      title: 'Le rappel actif et l’effet de test (Testing Effect)',
      html: [
        '<p>Le principe du <strong>rappel actif (Active Recall / Retrieval Practice)</strong> inverse la posture d’apprentissage : ' +
        'au lieu d’essayer de <em>faire entrer</em> des données dans sa tête, on s’efforce de les en <em>faire sortir</em>.</p>',
        '<p>Dans une expérience célèbre de <strong>Henry Roediger et Jeffrey Karpicke (2006)</strong>, deux groupes d’étudiants ' +
        'ont étudié un texte scientifique :</p>',
        '<ul>\n' +
        '  <li><strong>Groupe Étude-Étude (SSSS)</strong> : a relu le texte 4 fois consécutivement.</li>\n' +
        '  <li><strong>Groupe Étude-Test (STTT)</strong> : a lu le texte 1 fois, puis s’est auto-testé 3 fois sans document.</li>\n' +
        '</ul>',
        '<p>Cinq minutes après, le groupe relecture semblait avoir un léger avantage. Mais <strong>une semaine plus tard</strong>, ' +
        'le groupe s’étant auto-testé retenait <strong>plus de 60 %</strong> des informations contre seulement <strong>40 %</strong> ' +
        'pour le groupe relecture. L’effort d’extraction synaptique multiplie la stabilité mnésique à long terme.</p>'
      ].join('\n')
    },
    {
      title: 'La technique de Richard Feynman en 4 étapes',
      html: [
        '<p>Prix Nobel de physique en 1965, <strong>Richard Feynman</strong> était réputé pour sa capacité à vulgariser ' +
        'les concepts les plus ardus. Sa méthode de vérification de la compréhension se déroule en 4 étapes strictes :</p>',
        '<ol>\n' +
        '  <li><strong>Choisir le concept et poser une feuille blanche</strong> : inscrire le titre du sujet en haut de la page.</li>\n' +
        '  <li><strong>Expliquer le sujet à un enfant de 12 ans</strong> : rédiger ou verbaliser l’explication de mémoire ' +
        'en employant un vocabulaire simple, sans jargon technique et avec des analogies de la vie courante.</li>\n' +
        '  <li><strong>Identifier les zones de blocage (gaps)</strong> : dès qu’un point flou oblige à réutiliser un mot savant ' +
        'ou qu’une hésitation surgit, marquer un arrêt. C’est la frontière exacte entre ce qui est compris et ce qui est simplement mémorisé.</li>\n' +
        '  <li><strong>Retourner à la source et simplifier</strong> : rouvrir le cours uniquement sur le point bloquant, ' +
        'retravailler l’explication jusqu’à pouvoir la formuler avec une métaphore limpide.</li>\n' +
        '</ol>',
        box('astuce', 'La règle de la feuille blanche', 'lightbulb',
          '    <p>Fermez votre cahier ou votre éditeur de code. Prenez une feuille totalement vierge et tentez de redessiner ' +
          'l’architecture du système ou de réciter la preuve mathématique de mémoire. Chaque ligne que vous parvenez à tracer ' +
          'est une victoire synaptique solide ; chaque trou est une cible de révision chirurgicale.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Pourquoi la simple relecture d’un cours procure-t-elle une illusion de maîtrise ?', opts: ['Le cerveau confond la familiarité visuelle de lecture avec la capacité d’extraction mnésique', 'Elle déclenche une surcharge en dopamine', 'Elle accélère la vitesse de frappe'], correct: 0, exp: 'Reconnaître un texte sous ses yeux est passif et n’implique pas que l’on sache le restituer de mémoire.' },
    { stem: 'Dans l’étude séminale de Roediger & Karpicke (2006), quel groupe retenait significativement plus d’informations après une semaine ?', opts: ['Le groupe qui s’est auto-testé (STTT)', 'Le groupe qui a relu 4 fois le document (SSSS)', 'Les deux groupes avaient le même score'], correct: 0, exp: 'Le groupe STTT s’étant auto-testé conservait plus de 60 % de rétention contre 40 % pour la simple relecture.' },
    { stem: 'Selon la méta-analyse de John Dunlosky (2013), quel niveau d’utilité globale le surlignage au feutre a-t-il obtenu ?', opts: ['Faible (Low Utility)', 'Moyen (Moderate Utility)', 'Élevé (High Utility)'], correct: 0, exp: 'Le surlignage seul n’impose aucun effort de rappel actif et produit de très faibles gains de rétention.' },
    { stem: 'À qui la technique de Feynman préconise-t-elle d’expliquer un concept pour tester sa compréhension réelle ?', opts: ['À un enfant de 12 ans ou un novice complet', 'À un enseignant universitaire', 'À un collègue expert'], correct: 0, exp: 'Expliquer à un novice impose d’éradiquer le jargon et de maîtriser intimement les rouages du problème.' },
    { stem: 'Que révèle l’effet Dunning-Kruger chez un apprenant ?', opts: ['Moins une personne maîtrise un domaine, plus elle a tendance à surestimer ses compétences réelles', 'Le cerveau retient mieux les images que les mots', 'Le stress améliore le sommeil'], correct: 0, exp: 'L’effet Dunning-Kruger met en lumière l’incapacité métacognitive des novices à mesurer l’ampleur de leurs lacunes.' },
    { stem: 'Quelle action constitue un exemple parfait de rappel actif (Active Recall) ?', opts: ['Tenter de réciter ou réécrire les points clés du cours sur une feuille blanche fermée', 'Écouter un cours magistral en prenant des notes mot à mot', 'Mettre en gras les titres du PDF'], correct: 0, exp: 'La feuille blanche oblige le cerveau à extraire activement les informations de la mémoire à long terme.' },
    { stem: 'Que doit-on faire à l’étape 3 de la méthode Feynman lorsqu’une hésitation apparaît ?', opts: ['Identifier la faille de compréhension et retourner cibler précisément cette notion dans le cours', 'Changer immédiatement de sujet', 'Ignorer le détail et passer à la suite'], correct: 0, exp: 'Le trou d’explication est l’indice exact du point faible à combler pour consolider la compréhension.' },
    { stem: 'Quel terme désigne la difficulté cognitive saine et constructive qui renforce la mémoire ?', opts: ['Les difficultés désirables (Desirable Difficulties de Robert Bjork)', 'Le burn-out cognitif', 'L’amnésie antérograde'], correct: 0, exp: 'Robert Bjork a théorisé que l’effort d’extraction difficile mais réussi démultiplie la rétention future.' }
  ],

  pitfalls: [
    'Passer des heures à confectionner de magnifiques fiches de synthèse recopiées mot pour mot sans jamais s’auto-tester.',
    'Considérer que relire la correction d’un exercice équivaut à savoir le résoudre soi-même de bout en bout.',
    'Surligner plus de 20 % d’une page de manuel, transformant le support en coloriage inopérant.',
    'Masquer son incompréhension derrière du jargon pompeux lors d’un oral ou d’une explication technique.',
    'Éviter les tests d’entraînement par peur d’avoir une mauvaise note, privant ainsi le cerveau du stimulus de correction d’erreur.'
  ],

  methodTitle: 'Mettre en place une routine de rappel actif systématique',
  method: [
    '<strong>Lire une première fois pour comprendre</strong> : dégager l’architecture logique et les relations causales du cours.',
    '<strong>Fermer tout support documentaire</strong> : poser une feuille blanche ou ouvrir un éditeur vierge sans aucun modèle sous les yeux.',
    '<strong>Restituer les concepts clés de mémoire</strong> : noter définitions, schémas fonctionnels, formules et règles applicatives.',
    '<strong>Confronter la restitution à la source</strong> : rouvrir le cours et surligner uniquement les omissions et erreurs factuelles commises.',
    '<strong>Reformuler selon Feynman</strong> : expliquer les points où vous avez trébuché sous forme d’analogie simple et retester le lendemain.'
  ],

  summary: [
    'La relecture passive et le surlignage créent une illusion de compétence par fluidité perceptive.',
    'Le rappel actif (Active Recall) oblige le cerveau à extraire l’information, stimulant la potentialisation synaptique.',
    'L’effet de test (Testing Effect) assure une rétention à long terme très supérieure à celle des révisions passives.',
    'La méthode de Feynman vérifie la compréhension intime en contraignant à formuler des explications dénuées de jargon.',
    'Les difficultés désirables (Bjork) prouvent que plus l’effort de rappel est intense, plus l’ancrage mnésique est pérenne.'
  ],

  checklist: [
    'Je sais identifier et stopper une séance de révision passive stérile.',
    'Je connais les conclusions de l’expérience de Roediger & Karpicke sur l’effet de test.',
    'Je pratique régulièrement la technique de la feuille blanche après une lecture.',
    'Je sais appliquer les 4 étapes de la technique de Richard Feynman.',
    'Je considère l’auto-évaluation comme un outil d’apprentissage et non comme un simple jugement.'
  ],

  notions: ['Illusion de compétence', 'Fluency Illusion', 'Dunning-Kruger', 'Rappel actif', 'Active Recall', 'Testing Effect', 'Roediger & Karpicke', 'Technique Feynman', 'Difficultés désirables', 'Robert Bjork'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les pièges de la relecture passive et l’effet de test.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les 4 étapes de la technique Feynman et la feuille blanche.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les principes de l’extraction active.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux algorithmes de répétition espacée au chapitre 3.' }
  ],

  flashcards: [
    { q: 'Pourquoi le surlignage passif est-il inefficace pour mémoriser ?', a: 'Parce qu’il n’impose aucun effort d’extraction active et crée une fausse sensation de familiarité visuelle.' },
    { q: 'Qu’est-ce que le Testing Effect (effet de test) de Roediger & Karpicke ?', a: 'Le fait de s’auto-évaluer ancre l’information en mémoire à long terme bien plus efficacement que de la relire.' },
    { q: 'Quelles sont les 4 étapes de la méthode de Richard Feynman ?', a: '1. Choisir le concept, 2. L’expliquer simplement à un enfant de 12 ans, 3. Identifier les blocages, 4. Retourner à la source et simplifier.' },
    { q: 'Que désigne le terme « Difficultés désirables » forgé par Robert Bjork ?', a: 'Un effort d’apprentissage qui ralentit l’acquisition initiale mais multiplie la rétention et le transfert à long terme.' },
    { q: 'Comment pratiquer la technique de la feuille blanche ?', a: 'Fermer le cours et noter de mémoire l’ensemble des concepts, formules et liens logiques sans aucune aide.' },
    { q: 'Quelle est la différence fondamentale entre reconnaissance et rappel ?', a: 'Reconnaître consiste à identifier un indice visible (passif) ; rappeler consiste à extraire l’information du néocortex (actif).' }
  ],

  next: {
    href: 'chapitre3.html',
    label: 'Chapitre 3 : La Répétition Espacée &amp; Algorithmes de Mémorisation'
  }
};
