/**
 * Chapitre 3 du cours « UI/UX Design B2 » — Lois Cognitives de l’UX &amp; Heuristiques d’Utilisabilité.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Lois Cognitives de l’UX &amp; Heuristiques d’Utilisabilité',
  short: 'Lois Cognitives &amp; Heuristiques',
  toc: 'Psychologie de l’interaction, modèles de Fitts et Hick-Hyman, repère historique de Miller et regroupement de l’information, heuristiques de Jakob Nielsen et critères ergonomiques de Bastien &amp; Scapin.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Sur le cockpit de commande d’une centrale électrique numérique, les opérateurs commettent des erreurs répétées : ' +
    'des boutons d’arrêt d’urgence minuscules sont logés à proximité immédiate d’interrupteurs secondaires, ' +
    'et les menus de régulation affichent plus de 40 options non hiérarchisées en cascade. ' +
    'Dans cet exemple fictif, l’opérateur met plus de 8 secondes à localiser la bonne commande, alors que l’équipe vise 2 secondes. ' +
    'L’audit ergonomique cherche à comprendre les difficultés observées. ' +
    'Pour réduire les risques d’erreur, les designers peuvent mobiliser les modèles de Fitts et Hick, les travaux de Miller et les heuristiques de Nielsen. ' +
    'Ce module présente leurs conditions d’utilisation et propose des audits ergonomiques méthodiques.',

  objectives: [
    'calculer l’indice de difficulté et le temps de mouvement d’un pointage selon la loi de Fitts (formulation de Shannon) ;',
    'exploiter les propriétés géométriques des bordures et coins d’écran (cibles de taille infinie sur desktop) ;',
    'modéliser le temps de décision cognitive en fonction du nombre d’alternatives avec la loi de Hick-Hyman ;',
    'contextualiser le repère historique de Miller et utiliser le regroupement sans supposer une capacité universelle ;',
    'évaluer une interface à l’aune des 10 heuristiques d’utilisabilité universelles de Jakob Nielsen ;',
    'connaître les 8 critères ergonomiques français de référence de Bastien &amp; Scapin (INRIA).'
  ],

  sections: [
    {
      title: 'Loi de Fitts : Géométrie et Vitesse du Pointage',
      html: [
        '<p>Formulée par le psychologue Paul Fitts en 1954 et adaptée à l’IHM par Stuart Card et Scott MacKenzie, ' +
        'la <strong>loi de Fitts</strong> modélise le temps nécessaire pour déplacer un pointeur (souris, doigt) vers une cible :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Formule Mathématique de Shannon</h4>',
        '    <p><code>ID = log2(D / W + 1)</code> (en bits)<br>' +
        '    <code>MT = a + b * ID</code> (en millisecondes)</p>',
        '    <ul>',
        '      <li><code>D</code> : Distance séparant la position initiale du curseur et le centre de la cible.</li>',
        '      <li><code>W</code> : Largeur (ou tolérance d’erreur) de la cible le long de l’axe du mouvement.</li>',
        '      <li><code>a, b</code> : Constantes empiriques de l’opérateur humain (typiquement <code>a &approx; 150 ms</code>, <code>b &approx; 100 ms/bit</code>).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Enseignements Ergonomiques Clés</h4>',
        '    <ul>',
        '      <li><strong>Agrandir les cibles critiques :</strong> Les boutons d’action principale (CTA) doivent être généreusement dimensionnés pour réduire <code>ID</code>.</li>',
        '      <li><strong>Rapprocher les actions séquentielles :</strong> Les menus contextuels (clic droit) apparaissent à distance <code>D = 0</code>, rendant l’accès quasi instantané.</li>',
        '      <li><strong>La magie des bords d’écran (Desktop) :</strong> Le pointeur de la souris ne peut pas dépasser le bord physique de l’écran. Les coins ont donc une largeur virtuelle <code>W = &infin;</code>, rendant leur ciblage d’une facilité absolue (ex: menu Démarrer de Windows, menu Pomme de macOS).</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Lois de Hick-Hyman et de Miller : Charge Cognitive et Chunking',
      html: [
        '<p>La loi de Hick-Hyman modélise certains temps de choix ; les travaux de Miller concernent notamment le regroupement de l’information :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Loi de Hick-Hyman (Décision)</h4>',
        '    <p>Dans ce modèle simplifié, sans terme de base et pour un coefficient <code>b</code> fixé, le temps estimé augmente avec le nombre d’alternatives :<br>' +
        '    <code>T = b * log2(n + 1)</code></p>',
        '    <ul>',
        '      <li>Dans ce modèle, 64 options donnent un temps estimé environ 3,8 fois plus élevé que 2 options, avec le même coefficient.</li>',
        '      <li><strong>Application :</strong> Diviser les parcours complexes en étapes progressives (Onboarding pas à pas, menus hiérarchisés).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Loi de Miller et Chunking (Mémoire)</h4>',
        '    <p>George Miller a proposé en 1956 un ordre de grandeur de <strong>7 &plusmn; 2 groupes</strong> : ce repère historique ne fixe pas une capacité universelle. La mémoire dépend notamment de la tâche, des stratégies et des personnes.</p>',
        '    <ul>',
        '      <li>Un numéro en 10 chiffres (<code>0612345678</code>) peut être difficile à retenir.</li>',
        '      <li>Le découpage en 5 blocs (<code>06 12 34 56 78</code>) peut aider, mais ne garantit pas une mémorisation sans effort.</li>',
        '      <li>Le regroupement peut aussi s’appliquer aux numéros de carte bancaire.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les 10 Heuristiques d’Utilisabilité de Jakob Nielsen',
      html: [
        '<p>Établies en 1994 par Jakob Nielsen et Rolf Molich, ces 10 heuristiques constituent ' +
        'la grille d’évaluation universelle pour conduire un <strong>audit ergonomique expert</strong> :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>N°</th>',
        '      <th>Heuristique</th>',
        '      <th>Principe &amp; Exemple d’application</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>H1</strong></td>',
        '      <td><strong>Visibilité du statut du système</strong></td>',
        '      <td>Informer en permanence l’utilisateur de ce qui se passe via des retours clairs dans un délai raisonnable (spinners, barre de progression, accusés de réception).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H2</strong></td>',
        '      <td><strong>Correspondance monde réel</strong></td>',
        '      <td>Parler le langage de l’utilisateur (mots, expressions familières) et non un jargon technique ou des codes d’erreur internes.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H3</strong></td>',
        '      <td><strong>Contrôle et liberté utilisateur</strong></td>',
        '      <td>Proposer une issue de secours clairement indiquée en cas de fausse manœuvre (bouton Annuler, Retour, fermeture de modale, corbeille temporaire).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H4</strong></td>',
        '      <td><strong>Cohérence et standards</strong></td>',
        '      <td>Ne pas réinventer le sens des mots ou des icônes ; conserver la même terminologie et les mêmes conventions graphiques partout.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H5</strong></td>',
        '      <td><strong>Prévention des erreurs</strong></td>',
        '      <td>Mieux vaut empêcher une erreur de se produire que d’afficher un joli message d’erreur (modale de confirmation avant suppression, désactivation de boutons invalides).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H6</strong></td>',
        '      <td><strong>Reconnaissance plutôt que rappel</strong></td>',
        '      <td>Réduire la charge de mémoire en rendant les objets, actions et options visibles à l’écran plutôt que d’exiger de l’utilisateur qu’il se souvienne d’un code d’un écran à l’autre.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H7</strong></td>',
        '      <td><strong>Flexibilité et efficacité</strong></td>',
        '      <td>Proposer des raccourcis clavier et des accélérateurs pour les utilisateurs experts, tout en guidant les novices.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H8</strong></td>',
        '      <td><strong>Design sobre et minimaliste</strong></td>',
        '      <td>Les dialogues ne doivent contenir aucune information superflue : chaque élément supplémentaire dilue l’attention portée aux informations indispensables.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H9</strong></td>',
        '      <td><strong>Diagnostic et réparation des erreurs</strong></td>',
        '      <td>Les messages d’erreur doivent être formulés en langage clair (pas de stack trace), identifier le problème précis et suggérer une solution constructive.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>H10</strong></td>',
        '      <td><strong>Aide et documentation</strong></td>',
        '      <td>Bien qu’il soit préférable qu’un système soit compréhensible sans aide, une documentation facile à chercher, orientée sur les tâches, doit rester accessible.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Conduite d’une Évaluation Heuristique',
  method: [
    'Étape 1 — Définir le périmètre de l’audit : Sélectionner les parcours critiques (ex: tunnel d’inscription, processus d’achat, espace profil).',
    'Étape 2 — Inspection systématique écran par écran : Parcourir l’interface de manière indépendante avec la grille des 10 heuristiques de Nielsen sous les yeux.',
    'Étape 3 — Rédiger les fiches d’anomalie : Pour chaque défaut, documenter la capture d’écran, l’heuristique violée et la sévérité du problème (Cosmétique, Mineur, Majeur, Bloquant).',
    'Étape 4 — Évaluer l’indice de Fitts et de Hick : Quantifier le temps de ciblage des CTA stratégiques et vérifier l’absence de menus surchargés (> 7 items).',
    'Étape 5 — Prioriser les corrections : Traiter en priorité absolue les violations des heuristiques H1 (statut invisible), H5 (perte de données) et H9 (erreurs cryptiques).'
  ],

  summary: [
    'La loi de Fitts quantifie la vitesse de pointage : plus une cible est grande et proche, plus elle est atteinte rapidement.',
    'Les bords et coins d’un écran desktop possèdent une largeur virtuelle infinie facilitant leur sélection.',
    'La loi de Hick montre que multiplier les choix augmente le temps de décision de manière logarithmique.',
    'Le repère historique de Miller ne fixe pas de limite universelle ; le regroupement peut aider selon le contexte.',
    'Les 10 heuristiques de Nielsen constituent le référentiel international pour auditer la qualité ergonomique d’un produit.',
    'Un bon système prévient les erreurs (H5) avant d’avoir à les expliquer (H9).'
  ],

  checklist: [
    'Je sais appliquer la formule de Shannon de la loi de Fitts (ID = log2(D/W + 1)).',
    'Je comprends pourquoi les coins d’un écran desktop ont un temps d’accès minimal.',
    'Je sais expliquer la loi de Hick et son impact sur la conception des menus.',
    'Je sais proposer un regroupement de données et expliquer ses limites.',
    'Je connais par cœur les 10 heuristiques de Nielsen.',
    'Je sais classer une anomalie concrète dans l’heuristique appropriée.'
  ],

  notions: [
    'Loi de Fitts (Shannon)',
    'Indice de difficulté (ID en bits)',
    'Coins et bords d’écran (taille infinie)',
    'Loi de Hick-Hyman (décision)',
    'Repère historique de Miller',
    'Chunking (morcellement)',
    '10 heuristiques de Jakob Nielsen',
    'Critères de Bastien &amp; Scapin'
  ],

  pitfalls: [
    'Placer des boutons critiques minuscules (ex: 16x16 px) en espérant que l’utilisateur visera juste avec sa souris ou son doigt.',
    'Oublier les retours d’état (spinners de chargement) : l’utilisateur clique plusieurs fois et déclenche des doubles commandes.',
    'Afficher des codes d’erreur système bruts (ex: « Exception in thread main : null ») au lieu d’un message clair avec solution.',
    'Supprimer un compte ou des données irréversibles sans fenêtre de confirmation modale (violation H5).',
    'Créer des listes déroulantes de 50 éléments non triés et sans recherche intégrée.'
  ],

  questions: [
    {
      stem: 'Selon la loi de Fitts, quels sont les deux facteurs qui influencent directement le temps de pointage vers un bouton ?',
      opts: [
        'La couleur du bouton et son ombre portée',
        'La distance du curseur à la cible (D) et la largeur de la cible (W)',
        'Le nombre d’images affichées sur la page et la mémoire RAM',
        'Le débit de la connexion Internet et la version du navigateur'
      ],
      correct: 1,
      exp: 'La loi de Fitts stipule mathématiquement que le temps d’atteinte dépend du rapport entre la distance (D) et la taille de la cible (W) : ID = log2(D/W + 1).'
    },
    {
      stem: 'Pourquoi les coins d’un écran d’ordinateur (desktop) sont-ils considérés par les ergonomes comme les emplacements les plus faciles et rapides à atteindre ?',
      opts: [
        'Parce qu’ils sont plus lumineux',
        'Parce que le curseur est arrêté par les limites physiques de l’écran, ce qui leur confère une taille théorique virtuellement infinie',
        'Parce que la souris pèse moins lourd dans les coins',
        'Parce qu’ils ne sont jamais masqués par des fenêtres'
      ],
      correct: 1,
      exp: 'Puisque la souris ne peut pas sortir de l’écran, un geste brusque vers un coin atterrira toujours exactement dans le coin sans risque de dépassement (largeur infinie W = &infin;).'
    },
    {
      stem: 'Que prédit la loi de Hick-Hyman concernant le temps de prise de décision d’un utilisateur ?',
      opts: [
        'Le temps augmente de façon linéaire avec le prix du produit',
        'Le temps de décision augmente proportionnellement au logarithme du nombre d’alternatives proposées',
        'Le temps est toujours constant, quel que soit le nombre d’options',
        'L’utilisateur choisit toujours la première option de la liste'
      ],
      correct: 1,
      exp: 'La loi de Hick énonce que T = b * log2(n + 1) : plus il y a d’options en vrac, plus le cerveau met de temps à balayer et décider.'
    },
    {
      stem: 'Comment utiliser avec prudence le repère historique de Miller dans la conception des interfaces ?',
      opts: [
        'Un site ne doit pas comporter plus de 7 pages au total',
        'Le regroupement peut aider à structurer l’information, sans fixer une limite universelle de capacité ou de nombre de menus',
        'Il faut 7 couleurs différentes par écran pour stimuler la créativité',
        'Les boutons doivent avoir 7 pixels d’épaisseur'
      ],
      correct: 1,
      exp: 'Le regroupement peut aider selon la tâche et les personnes ; le nombre historique ne garantit ni une capacité universelle ni l’absence de surcharge.'
    },
    {
      stem: 'Une application affiche un écran blanc statique pendant 10 secondes lors de l’export d’un rapport lourd. Quelle heuristique de Nielsen est violée ?',
      opts: [
        'H1 : Visibilité du statut du système',
        'H4 : Cohérence et standards',
        'H7 : Flexibilité et efficacité',
        'H10 : Aide et documentation'
      ],
      correct: 0,
      exp: 'L’heuristique H1 exige que l’utilisateur soit toujours tenu informé de l’état du système (ex: une barre de progression indiquant « Export à 45% »).'
    },
    {
      stem: 'Un formulaire valide immédiatement une saisie et permet de revenir en arrière facilement avec un bouton «Annuler». Quelle heuristique est respectée ?',
      opts: [
        'H3 : Contrôle et liberté de l’utilisateur',
        'H6 : Reconnaissance plutôt que rappel',
        'H8 : Design sobre et minimaliste',
        'H2 : Correspondance avec le monde réel'
      ],
      correct: 0,
      exp: 'L’heuristique H3 impose de fournir une «issue de secours» claire et immédiate en cas de fausse manipulation de l’utilisateur.'
    },
    {
      stem: 'Un bouton de suppression définitive de base de données ne demande aucune confirmation. Quelle heuristique de Nielsen est bafouée en priorité ?',
      opts: [
        'H2 : Correspondance monde réel',
        'H5 : Prévention des erreurs',
        'H7 : Flexibilité et efficacité',
        'H4 : Cohérence et standards'
      ],
      correct: 1,
      exp: 'L’heuristique H5 (Prévention des erreurs) impose d’empêcher les catastrophes avant qu’elles ne surviennent en demandant une confirmation explicite.'
    },
    {
      stem: 'Quels critères ergonomiques développés par l’INRIA font autorité dans la recherche francophone aux côtés des heuristiques de Nielsen ?',
      opts: [
        'Les critères de Bastien &amp; Scapin',
        'Les critères de Taylor &amp; Ford',
        'Les principes de Le Corbusier',
        'Les règles de Gutenberg'
      ],
      correct: 0,
      exp: 'Les critères ergonomiques de J.M. Christian Bastien et Dominique L. Scapin (1993, INRIA) constituent le standard scientifique français d’évaluation des IHM.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la formule de la loi de Fitts (modèle de Shannon) ?',
      a: 'ID = log2(D / W + 1) en bits, et le temps estimé MT = a + b * ID en millisecondes.'
    },
    {
      q: 'Pourquoi les bords de l’écran sur desktop ont-ils une taille virtuelle infinie ?',
      a: 'Car le curseur de la souris ne peut pas aller plus loin que la frontière de l’écran, ce qui supprime tout risque de dépassement de cible.'
    },
    {
      q: 'Que stipule la loi de Hick-Hyman ?',
      a: 'Le temps de décision augmente avec le logarithme du nombre de choix disponibles (T = b * log2(n + 1)).'
    },
    {
      q: 'Qu’est-ce que le regroupement d’informations (« chunking ») ?',
      a: 'Le regroupement d’informations en unités signifiantes peut aider la mémorisation, sans garantir une capacité ni un résultat identiques pour tous.'
    },
    {
      q: 'Quelle est la première heuristique de Jakob Nielsen ?',
      a: 'H1 : La visibilité du statut du système (toujours informer l’utilisateur de ce qui se passe par des retours visuels réguliers).'
    },
    {
      q: 'Comment les heuristiques H5 et H9 se complètent-elles ?',
      a: 'La prévention des erreurs réduit leur apparition ; aider à comprendre et corriger les erreurs reste nécessaire lorsqu’elles surviennent.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la loi de Fitts, la loi de Hick et la liste des 10 heuristiques de Nielsen.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes bases. Approfondissez les calculs de Fitts et les nuances entre les heuristiques H1, H3 et H5.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des lois de la perception et de l’audit heuristique.' },
    { cls: 'top', text: '8/8 : Score maximal ! Vous maîtrisez l’ergonomie cognitive et l’évaluation experte au plus haut niveau.' }
  ]
};
