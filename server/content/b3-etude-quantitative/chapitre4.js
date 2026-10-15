/**
 * Chapitre 4 du cours « Étude Quantitative & Qualitative B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Collecte Qualitative : Entretiens, Focus Groups &amp; Observation',
  short: 'Entretiens, Focus Groups &amp; Observation',
  toc: 'Typologie des entretiens individuels, structure du guide semi-directif, animation de focus groups, dynamique de groupe et grilles d’observation participante.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Si les méthodes quantitatives permettent de quantifier le « combien » et d’établir des fréquences, elles demeurent totalement aveugles sur le « pourquoi » et le « comment ». Pourquoi les développeurs d’une organisation contournent-ils les procédures de sécurité recommandées ? Comment les ingénieurs système vivent-ils la transition vers le Cloud public ? Pour percer la complexité des comportements humains, des cultures d’entreprise et des résistances au changement, l’investigateur doit déployer des instruments qualitatifs immersifs. Conduire un entretien ou animer un focus group ne consiste pas à improviser une conversation informelle : c’est un protocole scientifique rigoureux qui exige un guide d’entretien structuré, des relances neutres, la gestion des biais de conformisme et le calcul de la fiabilité inter-observateurs. L’ingénieur de Bachelor 3 doit maîtriser ces techniques pour nourrir son diagnostic de terrain.',
  objectives: [
    'maîtriser la typologie des entretiens de recherche : non directif (récit libre), semi-directif (guide thématique) et directif ;',
    'concevoir un guide d’entretien semi-directif complet : phase d’accueil, consignes d’introduction, thèmes pivots, relances neutres et clôture ;',
    'appliquer les techniques d’animation et de relance non directives (miroir, écho, clarification, relance interrogative sans influence) ;',
    'organiser et modérer un Focus Group (table ronde qualitative) : sélection du panel (6 à 10 participants), gestion des temps de parole et régulation du leader dominant ;',
    'déployer des grilles d’observation in situ (participante vs non participante) et mesurer l’accord inter-observateurs (critère de Miles &amp; Huberman) ;',
    'développer en Python 3 des auditeurs de guides d’entretien, des analyseurs de monopole de parole et des calculateurs de taux de concordance d’observation.'
  ],
  sections: [
    {
      title: 'Typologie des Entretiens Qualitatifs Individuels',
      html: [
        '<p>L’entretien individuel est une situation d’interaction verbale orientée vers la production d’un discours de recherche approfondi :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Entretien Non Directif</h4>',
        '    <p>Une seule consigne initiale très large (ex. <em>« Racontez-moi comment s’est passée la migration vers Kubernetes dans votre équipe »</em>). L’enquêteur intervient au minimum, laissant l’enquêté structurer librement son récit selon sa propre logique associative.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Entretien Semi-Directif (Standard)</h4>',
        '    <p>Le format de référence en entreprise et en mémoire professionnel. Structuré par un <strong>guide d’entretien</strong> comportant 3 à 5 thèmes obligatoires, mais laissant l’ordre des sous-questions souple pour suivre le fil naturel de la pensée de l’interlocuteur.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Entretien Directif</h4>',
        '    <p>Série de questions précises posées dans un ordre immuable avec peu d’espace pour l’improvisation. Se rapproche d’un questionnaire administré en face-à-face (CAPI/CATI), utile pour des audits de conformité réglementaire.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Structure &amp; Rigueur du Guide d’Entretien Semi-Directif',
      html: [
        '<p>Un guide d’entretien semi-directif ne se compose pas d’une liste de 40 questions fermées : il s’articule autour de modules fonctionnels clairs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 3 Phases Canoniques</h4>',
        '    <ul>',
        '      <li><strong>Phase 1 : Accueil &amp; Cadrage déontologique :</strong> Présentation des objectifs de l’étude, anonymat strict, demande d’autorisation d’enregistrement audio, rappel du cadre non évaluatif.</li>',
        '      <li><strong>Phase 2 : Corps thématique (Modules 1 à 4) :</strong> Questions très ouvertes invitant à la narration d’expériences vécues concrètes (faits, sentiments, obstacles rencontrés).</li>',
        '      <li><strong>Phase 3 : Clôture &amp; Synthèse :</strong> Question d’ouverture finale (<em>« Y a-t-il un point important que nous n’avons pas abordé ? »</em>) et remerciements.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Techniques de Relance Neutres</h4>',
        '    <p>Pour approfondir sans jamais orienter la réponse de l’informateur :</p>',
        '    <ul>',
        '      <li><strong>Relance en écho / miroir :</strong> Répéter le dernier mot ou membre de phrase sur un ton interrogatif (<em>« ...complexe ? »</em>).</li>',
        '      <li><strong>Relance par demande d’illustration :</strong> <em>« Auriez-vous un exemple récent d’incident illustrant ce problème ? »</em></li>',
        '      <li><strong>Relance par clarification :</strong> <em>« Qu’entendez-vous exactement par le terme "dette technique" dans ce contexte ? »</em></li>',
        '      <li><strong>Le silence attentif :</strong> Laisser 4 à 5 secondes de silence après une réponse permet très souvent à l’enquêté de livrer sa réflexion la plus authentique.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Animation de Focus Groups : Dynamique &amp; Biais de Dominance',
      html: [
        '<p>Le <strong>Focus Group</strong> (groupe de discussion ou table ronde) réunit 6 à 10 participants pendant 1 h 30 à 2 h 00 pour explorer les consensus, controverses et représentations collectives :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Objectifs &amp; Synergies de Groupe</h4>',
        '    <p>L’interaction entre pairs stimule la mémoire collective : les participants réagissent aux propos des autres, nuancent ou confrontent leurs points de vue. Idéal pour tester un nouveau concept d’architecture ou identifier les freins à l’adoption d’un outil collaboratif.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Régulation du Leader Dominant</h4>',
        '    <p>Le risque majeur est la confiscation de la parole par une forte personnalité (ex: un chef de projet accaparant plus de 35% du temps total), induisant le <strong>biais de conformisme (effet Asch)</strong> chez les autres.</p>',
        '    <p>Le modérateur doit intervenir avec bienveillance pour redistribuer le temps de parole vers les participants silencieux.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Observation in Situ &amp; Accord Inter-Observateurs (Miles &amp; Huberman)',
      html: [
        '<p>L’observation directe permet de confronter ce que les acteurs <em>disent</em> faire (discours) avec ce qu’ils <em>font réellement</em> (pratiques effectives) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Observation Participante vs Non Participante</h4>',
        '    <p>Dans l’observation non participante, l’enquêteur est un témoin extérieur silencieux muni d’une <strong>grille d’observation systématique</strong> (horodatage, comportements, interactions). Dans l’observation participante, l’enquêteur est intégré dans l’équipe de projet comme développeur ou stagiaire.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Indice de Fiabilité Inter-Observateurs</h4>',
        '    <p>Pour valider l’objectivité de la grille, au moins deux observateurs codent simultanément la même session. Le taux d’accord brut est :</p>',
        '    <p>$$P_0 = \\frac{\\text{Nombre d’accords concordants}}{\\text{Nombre total d’unités d’observation}} \\times 100$$</p>',
        '    <p>Selon Matthew Miles et A. Michael Huberman, un seuil $P_0 \\ge 85.0\\%$ est le gage scientifique d’une grille robuste et reproductible.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Conduite d’Entretiens et Focus Groups',
  method: [
    '1. Rédiger le guide d’entretien : Formaliser la consigne d’accueil, les 3 à 5 thèmes centraux, les questions de relance et la question de synthèse finale.',
    '2. Sécuriser le protocole éthique : Faire signer une fiche de consentement éclairé garantissant l’anonymisation des verbatim et l’accord d’enregistrement audio.',
    '3. Adopter une posture d’écoute active : Éviter d’interrompre, bannir tout jugement de valeur (« C’est bien », « Vous avez tort ») et privilégier les relances ouvertes.',
    '4. Animer le focus group de manière équilibrée : Surveiller les temps de parole individuels et solliciter activement les participants discrets pour neutraliser l’effet de conformisme.',
    '5. Transcrire fidèlement les enregistrements : Établir une retranscription intégrale (verbatim) mot à mot pour préparer la phase d’analyse de contenu thématique.',
    '6. Calculer l’accord inter-observateurs : Sur les séances d’observation, comparer le codage indépendant de deux évaluateurs pour vérifier la convergence au-delà de 85%.'
  ],
  summary: [
    'Les approches qualitatives permettent d’accéder au sens, aux motivations profondes et à la complexité des dynamiques humaines en entreprise IT.',
    'L’entretien semi-directif est l’instrument qualitatif roi : il combine la rigueur d’un guide thématique structuré et la liberté d’expression de l’enquêté.',
    'Les relances doivent être strictement neutres (écho, demande d’illustration, silence attentif) pour ne jamais biaiser le discours produit.',
    'Le focus group produit une émulation collective mais exige une modération ferme pour empêcher un leader dominant d’imposer une pensée unique.',
    'L’observation in situ confronte les discours aux comportements réels sur le terrain opérationnel.',
    'Le coefficient d’accord inter-observateurs (seuil de 85% de Miles & Huberman) garantit la fiabilité scientifique des grilles d’observation.'
  ],
  checklist: [
    'Le guide d’entretien comporte-t-il au moins 70% de questions ouvertes invitant à la narration ?',
    'La phase d’introduction garantit-elle formellement la confidentialité, l’anonymat et l’accord d’enregistrement audio ?',
    'Les relances prévues sont-elles dénuées de toute orientation ou jugement subjectif ?',
    'Le focus group réunit-il entre 6 et 10 participants de profils complémentaires ?',
    'Le modérateur a-t-il prévu des techniques d’animation pour neutraliser le monopole de parole d’un participant ?',
    'La grille d’observation comportementale a-t-elle été testée par deux évaluateurs indépendants avec un taux d’accord supérieur à 85% ?'
  ],
  notions: [
    'Typologie des entretiens de recherche',
    'Guide d’entretien semi-directif',
    'Techniques de relance non directives',
    'Animation et modération de Focus Groups',
    'Effet Asch et biais de conformisme',
    'Leader d’opinion et monopole de parole',
    'Observation participante et non participante',
    'Accord inter-observateurs de Miles &amp; Huberman'
  ],
  pitfalls: [
    'Transformer un entretien semi-directif en interrogatoire policier en lisant mécaniquement une liste de 30 questions fermées.',
    'Donner son propre avis ou contredire l’enquêté lors d’un entretien sous prétexte d’expertise technique personnelle.',
    'Laisser un manager ou un collègue dominant monopoliser 60% du temps d’un focus group, réduisant les autres au silence.',
    'Rédiger les conclusions qualitatives de mémoire sans avoir enregistré ni retranscrit fidèlement les verbatim originaux.'
  ],
  questions: [
    {
      stem: 'Quelle est la caractéristique distinctive majeure d’un entretien semi-directif par rapport à un entretien directif ?',
      opts: [
        'L’entretien semi-directif ne dure que 30 secondes',
        'L’entretien semi-directif s’appuie sur un guide de thèmes prédéfinis mais laisse l’enquêté libre de développer sa pensée et d’aborder les sujets dans son propre ordre',
        'L’entretien semi-directif est obligatoirement anonyme pour l’enquêteur également',
        'Il est interdit d’utiliser un dictaphone en entretien semi-directif'
      ],
      correct: 1,
      exp: 'Le semi-directif allie la directivité sur les thèmes (le guide) et la non-directivité sur les réponses et le cheminement discursif de l’interviewé.'
    },
    {
      stem: 'Lors d’un entretien de recherche, qu’appelle-t-on une relance « en écho » (ou relance miroir) ?',
      opts: [
        'Crier très fort dans un mégaphone',
        'Répéter le dernier mot ou la dernière idée formulée par l’enquêté avec une intonation interrogative neutre pour l’inviter à expliciter sa pensée',
        'Répéter la question du début toutes les cinq minutes',
        'Imiter la voix de l’enquêté'
      ],
      correct: 1,
      exp: 'La relance en écho renvoie à l’informateur son propre mot sans introduire aucun vocabulaire nouveau, l’encourageant à approfondir en toute neutralité.'
    },
    {
      stem: 'Dans un focus group, quel risque méthodologique survient lorsqu’un participant charismatique ou hiérarchiquement supérieur accapare plus de 40% du temps de parole ?',
      opts: [
        'Le micro de la salle explose',
        'Le biais de dominance étouffe la parole divergente et provoque un effet de conformisme (effet Asch), faussant la représentativité des opinions du groupe',
        'La réunion se termine avec deux heures d’avance',
        'Les autres participants s’endorment obligatoirement'
      ],
      correct: 1,
      exp: 'La domination par un leader crée une autocensure chez les autres participants qui s’alignent par conformisme social, masquant les dissensus réels du terrain.'
    },
    {
      stem: 'Quelle est la taille idéale d’un panel pour un Focus Group réussi selon les standards méthodologiques ?',
      opts: [
        '1 à 2 personnes',
        '6 à 10 personnes',
        '50 à 100 personnes',
        'Exactement 1 000 personnes'
      ],
      correct: 1,
      exp: 'Entre 6 et 10 participants, le groupe est assez grand pour générer des échanges dynamiques et assez restreint pour que chacun puisse s’exprimer en profondeur.'
    },
    {
      stem: 'Selon le référentiel méthodologique de Miles & Huberman, quel seuil minimal de concordance inter-observateurs P0 atteste de la fiabilité d’une grille d’observation ?',
      opts: [
        '50.0%',
        '85.0%',
        '10.0%',
        '99.9%'
      ],
      correct: 1,
      exp: 'Miles & Huberman fixent le standard de fiabilité inter-observateurs à 85% d’accords concordants pour attester que la grille est dépourvue d’ambiguïtés sémantiques.'
    },
    {
      stem: 'Pourquoi le silence de 4 à 5 secondes de l’enquêteur après une réponse est-il considéré comme un outil puissant en entretien qualitatif ?',
      opts: [
        'Car cela permet à l’enquêteur de consulter ses réseaux sociaux',
        'Car ce temps de pause incite naturellement l’enquêté à combler le vide en approfondissant sa pensée et en livrant souvent des éléments plus intimes et révélateurs',
        'Car cela fait baisser la température de la pièce',
        'Car c’est une obligation imposée par le droit du travail'
      ],
      correct: 1,
      exp: 'La gestion du silence tolère le temps de réflexion de l’interlocuteur et l’invite à dépasser la réponse superficielle convenue pour livrer des anecdotes plus riches.'
    },
    {
      stem: 'Quelle est la différence fondamentale entre l’observation participante et l’observation non participante ?',
      opts: [
        'L’observation participante se fait les yeux fermés',
        'Dans l’observation participante, le chercheur s’intègre activement au groupe et participe à ses tâches quotidiennes, tandis que dans la non participante, il reste un témoin passif extérieur',
        'L’observation non participante est obligatoirement illégale',
        'Il n’y a aucune différence'
      ],
      correct: 1,
      exp: 'L’immersion active dans l’action définit l’observation participante (ethnographie organisationnelle) par opposition à la posture distanciée de l’observateur extérieur.'
    },
    {
      stem: 'Quelle est la première étape indispensable à respecter lors de la phase d’accueil d’un entretien qualitatif ?',
      opts: [
        'Demander le numéro de carte bancaire de l’enquêté',
        'Présenter les objectifs scientifiques, rappeler la garantie d’anonymat et recueillir le consentement éclairé pour l’enregistrement audio',
        'Lui faire passer un test technique de programmation',
        'Lui demander de rédiger le compte-rendu lui-même'
      ],
      correct: 1,
      exp: 'Le cadrage éthique et la garantie d’anonymat instaurent la relation de confiance indispensable pour obtenir un discours authentique et dénué d’autocensure.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un entretien semi-directif ?',
      a: 'Un entretien guidé par une grille de thèmes prédéfinis, laissant l’ordre des sous-questions souple pour suivre la logique de pensée de l’enquêté.'
    },
    {
      q: 'Qu’est-ce qu’une relance en écho ?',
      a: 'Répéter un mot clé prononcé par l’enquêté sur un ton interrogatif neutre pour l’encourager à préciser sa pensée sans la biaiser.'
    },
    {
      q: 'Quelle est la taille idéale d’un Focus Group ?',
      a: '6 à 10 participants, permettant une dynamique d’échange collective tout en garantissant un temps de parole suffisant pour chacun.'
    },
    {
      q: 'Quel est le risque du leader dominant en Focus Group ?',
      a: 'Confisquer la parole et induire un effet de conformisme (effet Asch), réduisant les autres participants au silence ou à l’alignement superficiel.'
    },
    {
      q: 'Quel est le seuil d’accord inter-observateurs de Miles & Huberman ?',
      a: 'Au moins 85% de concordances exactes (P0 ≥ 85%) pour valider l’objectivité et la reproductibilité d’une grille d’observation.'
    },
    {
      q: 'Pourquoi l’anonymisation des verbatim est-elle cruciale ?',
      a: 'Pour protéger les participants et instaurer la sécurité psychologique nécessaire à l’expression sincère des difficultés opérationnelles.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la structure du guide semi-directif, les techniques de relance neutre et la taille d’un focus group.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez le biais de dominance, la gestion des silences et l’accord de Miles & Huberman.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez les techniques de collecte qualitative et d’observation scientifique de niveau Bachelor 3.'
    }
  ]
};
