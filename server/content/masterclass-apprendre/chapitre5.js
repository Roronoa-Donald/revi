/**
 * Chapitre 5 du cours « Masterclass Apprendre à apprendre » B2 — Pratique Délibérée, Entrelacement & Résolution de Problèmes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Pratique Délibérée, Entrelacement &amp; Résolution de Problèmes',
  short: 'Pratique Délibérée',
  toc: 'Pratique délibérée d’Anders Ericsson, entrelacement (interleaving) vs pratique bloquée, feedback immédiat et zone des 85 %.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Répéter 100 fois ce que l’on sait déjà faire ne produit aucune progression : c’est de la simple routine. ' +
    'De même, résoudre 20 exercices du même type à la suite donne l’illusion de maîtriser une matière, mais ' +
    'à l’examen, face à des énoncés mélangés, l’étudiant ne sait pas quelle formule appliquer. ' +
    'L’expertise se forge à la frontière de ses capacités grâce à la pratique délibérée et à l’entrelacement.',

  objectives: [
    'définir la pratique délibérée selon le chercheur Anders Ericsson (Peak: Secrets from the New Science of Expertise) ;',
    'comprendre la supériorité de l’entrelacement (Interleaving) sur la pratique bloquée (Blocked Practice) ;',
    'réguler la boucle de rétroaction (Feedback Loop) pour corriger immédiatement les modèles mentaux défaillants ;',
    'calibrer la difficulté d’entraînement selon la règle des 85 % de Robert Wilson ;',
    'analyser ses erreurs comme des opportunités d’apprentissage grâce à la taxonomie des fautes cognitives.'
  ],

  sections: [
    {
      title: 'La pratique délibérée selon Anders Ericsson',
      html: [
        '<p>Pendant plus de 30 ans, le psychologue suédois <strong>K. Anders Ericsson</strong> a étudié les maîtres d’échecs, ' +
        'les violonistes virtuoses et les sportifs d’élite pour percer les secrets de l’expertise. Sa conclusion est sans appel : ' +
        'ce n’est pas le nombre total d’heures qui compte, mais le type de pratique.</p>',
        '<ul>\n' +
        '  <li><strong>La pratique naïve</strong> : répéter une tâche en espérant progresser magiquement (ex. taper du code sans analyser ses bogues).</li>\n' +
        '  <li><strong>La pratique délibérée (Deliberate Practice)</strong> : répond à 4 critères rigoureux :</li>\n' +
        '</ul>',
        '<ol>\n' +
        '  <li><strong>Objectif ultra-spécifique</strong> : cibler une sous-compétence étroite (ex. « maîtriser la condition d’arrêt d’une récursion »).</li>\n' +
        '  <li><strong>Concentration maximale</strong> : attention soutenue sans distraction pendant une durée calibrée.</li>\n' +
        '  <li><strong>Sortie de la zone de confort</strong> : travailler délibérément sur les exercices où l’on échoue systématiquement.</li>\n' +
        '  <li><strong>Feedback immédiat</strong> : confronter chaque étape à la correction pour identifier immédiatement l’origine de l’écart.</li>\n' +
        '</ol>',
        box('danger', 'Le mythe des « 10 000 heures » de Malcolm Gladwell', 'alert',
          '    <p>Popularisée par Malcolm Gladwell, la règle des 10 000 heures a souvent été déformée : accumuler 10 000 heures ' +
          'de pratique routinière ne mène qu’à une automatisation médiocre. 1 000 heures de <em>pratique délibérée</em> ' +
          'ciblée sur les faiblesses surpassent 10 000 heures de pratique passive.</p>')
      ].join('\n')
    },
    {
      title: 'Entrelacement (Interleaving) vs Pratique bloquée (Blocked Practice)',
      html: [
        '<p>L’organisation des séances d’entraînement influe radicalement sur la capacité de transfert :</p>',
        '<ul>\n' +
        '  <li><strong>La pratique bloquée (AAABBBCCC)</strong> : l’étudiant résout 10 exercices sur les intégrales, puis 10 sur les séries, ' +
        'puis 10 sur les probabilités. L’esprit n’a aucun effort à fournir pour choisir la formule : elle est induite par le titre du chapitre ! ' +
        'Le sentiment d’aisance immédiat est fort, mais la rétention à l’examen s’effondre.</li>\n' +
        '  <li><strong>L’entrelacement (ABCABCABC)</strong> : les énoncés de différentes familles sont mélangés de façon aléatoire. ' +
        'Avant même de calculer, le cerveau doit accomplir la démarche cognitive la plus noble : <em>reconnaître la nature du problème</em> ' +
        'et choisir l’outil mathématique adapté.</li>\n' +
        '</ul>',
        '<p>Les recherches de Doug Rohrer et Kelli Taylor ont démontré que l’entrelacement <strong>double le score</strong> ' +
        'aux examens finaux par rapport à la pratique bloquée, malgré un sentiment d’inconfort plus marqué durant l’entraînement.</p>'
      ].join('\n')
    },
    {
      title: 'La règle des 85 % et la culture du feedback correcteur',
      html: [
        '<p>À quel niveau de difficulté doit-on s’entraîner ? Une étude de <strong>Robert Wilson et al. (Nature Communications, 2019)</strong> ' +
        'a calculé le taux d’erreur mathématiquement optimal pour maximiser la vitesse d’apprentissage :</p>',
        '<blockquote>\n' +
        '  <strong>La règle des 85 %</strong> : la progression est maximale lorsque l’apprenant réussit environ <strong>85 %</strong> des tentatives ' +
        'et commet environ <strong>15 % d’erreurs stimulantes</strong>.\n' +
        '</blockquote>',
        '<ul>\n' +
        '  <li><strong>Si le taux de réussite &gt; 90 %</strong> : les exercices sont trop faciles ; l’apprenant stagne dans sa zone de confort.</li>\n' +
        '  <li><strong>Si le taux de réussite &lt; 75 %</strong> : la tâche est trop complexe ; le cerveau sature en charge cognitive et se décourage.</li>\n' +
        '</ul>',
        box('astuce', 'La taxonomie des erreurs', 'lightbulb',
          '    <p>Ne vous contentez pas de cocher « faux ». Classez chaque erreur commise en 3 catégories :</p>\n' +
          '    <ul>\n' +
          '      <li><strong>Erreur d’encodage (ENC)</strong> : vous avez mal lu l’énoncé ou ignoré une contrainte (remède : surligner les hypothèses).</li>\n' +
          '      <li><strong>Erreur de récupération (REC)</strong> : la formule était oubliée (remède : créer une flashcard dédiée).</li>\n' +
          '      <li><strong>Erreur de transfert (TRA)</strong> : vous n’avez pas reconnu quel concept utiliser dans ce contexte (remède : pratiquer l’entrelacement).</li>\n' +
          '    </ul>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Selon Anders Ericsson, quel est le facteur déterminant de l’expertise humaine ?', opts: ['La pratique délibérée ciblée sur les points faibles avec feedback', 'Le talent génétique inné', 'L’accumulation passive d’années d’expérience'], correct: 0, exp: 'L’expertise résulte de la pratique délibérée : effort conscient hors de la zone de confort avec boucle de correction immédiate.' },
    { stem: 'Pourquoi l’entrelacement (Interleaving) est-il supérieur à la pratique bloquée pour préparer un examen ?', opts: ['Il oblige le cerveau à discriminer et choisir la méthode appropriée sans indice de contexte', 'Il prend moins de temps d’étude', 'Il évite d’avoir à réfléchir'], correct: 0, exp: 'Mélanger les types de problèmes apprend à diagnostiquer la nature de l’énoncé, compétence clé testée lors des examens.' },
    { stem: 'Selon l’étude de Robert Wilson (2019), quel est le taux de réussite optimal pour maximiser la vitesse d’apprentissage ?', opts: ['Environ 85 % (15 % d’erreurs stimulantes)', '100 % de réussite parfaite', '50 % de réussite aléatoire'], correct: 0, exp: 'Le seuil des 85 % maintient la motivation tout en stimulant les réajustements synaptiques par les erreurs.' },
    { stem: 'Quel est le danger principal de la pratique bloquée (résoudre 20 exercices consécutifs sur la même formule) ?', opts: ['Elle crée une illusion de maîtrise immédiate qui disparaît dès que les problèmes sont mélangés', 'Elle fatigue la vue', 'Elle coûte trop cher en papier'], correct: 0, exp: 'L’étudiant sait d’avance quel outil appliquer sans fournir l’effort d’analyse du problème.' },
    { stem: 'Comment qualifie-t-on une erreur due au fait de ne pas avoir su quel outil théorique appliquer dans une situation inédite ?', opts: ['Une erreur de transfert', 'Une erreur de frappe', 'Une erreur d’encodage'], correct: 0, exp: 'L’erreur de transfert révèle que le concept est su isolément mais non relié aux contextes d’application réels.' },
    { stem: 'Quelle condition est indispensable à la pratique délibérée selon Ericsson ?', opts: ['Un feedback immédiat pour corriger immédiatement les écarts', 'Une absence totale de professeur', 'Travailler uniquement la nuit'], correct: 0, exp: 'Sans retour d’information rapide, le cerveau automatise ses propres erreurs au lieu de les rectifier.' },
    { stem: 'Que préconise la zone proximale de développement (ZPD) de Lev Vygotski ?', opts: ['Travailler sur des tâches situées juste au-delà de ce que l’on sait faire seul, avec un échafaudage d’aide', 'Ne faire que des choses totalement inconnues', 'Rester toujours dans sa zone de confort'], correct: 0, exp: 'La ZPD cible la frontière fertile entre l’autonomie actuelle et les compétences émergentes.' },
    { stem: 'Dans la boucle de pratique délibérée, que doit faire l’étudiant après avoir commis une erreur ?', opts: ['Analyser la cause profonde de l’échec et recommencer immédiatement jusqu’à résolution parfaite', 'Fermer le cahier et passer à autre chose', 'Accuser l’énoncé d’être mal rédigé'], correct: 0, exp: 'L’analyse de l’erreur et la ré-exécution immédiate transforment l’échec en schéma synaptique correctif.' }
  ],

  pitfalls: [
    'Refaire inlassablement les exercices que l’on maîtrise déjà parfaitement pour se rassurer psychologiquement.',
    'Traiter les matières une par une par blocs de plusieurs jours au lieu d’entrelacer les apprentissages dans la semaine.',
    'Consulter la correction dès la moindre seconde d’hésitation sans s’accorder un temps d’effort de recherche autonome.',
    'S’entraîner sur des problèmes trop difficiles sans maîtriser les fondamentaux (taux d’échec &gt; 50 % menant à la saturation).',
    'Considérer une erreur comme un échec personnel plutôt que comme un signal précieux d’ajustement cognitif.'
  ],

  methodTitle: 'Construire une session de pratique délibérée efficace',
  method: [
    '<strong>Définir une cible microscopique</strong> : isoler une formule ou un algorithme précis posant problème.',
    '<strong>Éliminer toute distraction</strong> : programmer un timer de 30 à 45 minutes en focus absolu.',
    '<strong>Résoudre sans aide extérieure</strong> : chercher activement la solution pendant au moins 5 à 10 minutes avant de vérifier.',
    '<strong>Analyser le feedback immédiat</strong> : en cas d’erreur, catégoriser la faute (encodage, rappel, transfert).',
    '<strong>Entrelacer les contextes</strong> : rejouer l’exercice le lendemain mélangé au milieu d’autres types de problèmes.'
  ],

  summary: [
    'La pratique délibérée (Ericsson) surpasse la pratique naïve par ses objectifs précis, sa concentration et son feedback immédiat.',
    'L’entrelacement (Interleaving) force le cerveau à catégoriser les problèmes et double la rétention aux examens.',
    'La règle des 85 % de Wilson fixe le ratio optimal : 85 % de succès pour 15 % d’erreurs stimulantes.',
    'Le feedback correcteur immédiat est la condition sine qua non pour empêcher l’automatisation de faux réflexes.',
    'La taxonomie des erreurs (encodage, récupération, transfert) transforme les échecs en plans d’action précis.'
  ],

  checklist: [
    'Je sais distinguer la pratique délibérée de la simple répétition routinière.',
    'J’organise mes séances d’entraînement sous forme entrelacée plutôt que bloquée.',
    'Je calibre la difficulté de mes exercices pour viser environ 85 % de réussite.',
    'J’analyse la cause de chaque erreur selon la typologie ENC / REC / TRA.',
    'Je ne consulte le corrigé qu’après un effort réel de recherche autonome.'
  ],

  notions: ['Pratique délibérée', 'Anders Ericsson', 'Entrelacement', 'Interleaving', 'Pratique bloquée', 'Règle des 85 %', 'Robert Wilson', 'Feedback immédiat', 'Taxonomie des erreurs', 'Zone proximale de développement'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les 4 piliers de la pratique délibérée et les bénéfices de l’entrelacement.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la règle des 85 % et la taxonomie des erreurs cognitives.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les principes de l’entraînement d’expertise.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la métacognition et aux routines durables au chapitre 6.' }
  ],

  flashcards: [
    { q: 'Qu’est-ce qui caractérise la pratique délibérée selon Anders Ericsson ?', a: 'Un objectif précis, une concentration totale, une sortie de la zone de confort et un feedback immédiat.' },
    { q: 'Pourquoi l’entrelacement (Interleaving) est-il plus performant que la pratique bloquée ?', a: 'Il force le cerveau à diagnostiquer la nature du problème avant de choisir l’algorithme de résolution.' },
    { q: 'Que stipule la règle des 85 % de Robert Wilson ?', a: 'La vitesse d’apprentissage est maximale avec environ 85 % de réussite et 15 % d’erreurs instructives.' },
    { q: 'Quels sont les 3 types d’erreurs cognitives ?', a: 'Erreur d’encodage (mauvaise lecture), de récupération (oubli de formule) et de transfert (mauvais contexte).' },
    { q: 'Pourquoi consulter trop vite la solution d’un problème est-il contre-productif ?', a: 'Cela court-circuite l’effort synaptique d’extraction et prive le cerveau du renforcement mnésique.' },
    { q: 'Qu’est-ce que la Zone Proximale de Développement (ZPD) ?', a: 'L’espace d’apprentissage optimal entre ce que l’étudiant réussit seul et ce qu’il peut accomplir avec guidage.' }
  ],

  next: {
    href: 'chapitre6.html',
    label: 'Chapitre 6 : Métacognition, Chronobiologie &amp; Routines Durables'
  }
};
