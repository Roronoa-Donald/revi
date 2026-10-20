/**
 * Chapitre 5 du cours « Méthodes Agiles B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Planification de Release, Vélocité &amp; Suivi de Projet : Burn-down / Burn-up',
  short: 'Vélocité &amp; Pilotage de Release',
  toc: 'Calcul de la vélocité moyenne, capacité d’équipe (focus factor), Sprint Burn-down chart, détection du Scope Creep, Release Burn-up chart et cône d’incertitude.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Comment une organisation agile peut-elle s’engager auprès de ses clients ou de sa direction financière sans figer un cahier des charges irréaliste deux ans à l’avance ? La réponse réside dans la planification prévisionnelle empirique. Plutôt que de bâtir des plannings prédictifs sur des hypothèses fragiles, l’équipe mesure sa vélocité historique réelle (le nombre de Story Points terminés et conformes à la Definition of Done à chaque sprint). Cette cadence observée permet de projeter des atterrissages de release sous forme d’intervalles de probabilité (cône d’incertitude). L’ingénieur de niveau Bachelor 3 doit maîtriser le calcul de capacité d’un sprint avec le facteur de focalisation (Focus Factor), savoir interpréter les anomalies d’un Sprint Burn-down chart (notamment le Scope Creep ou dérive de périmètre), exploiter la puissance des Release Burn-up charts pour dissocier l’avancement du code des ajouts de fonctionnalités par le métier, et manier avec rigueur la loi de Goodhart pour ne jamais transformer la vélocité en arme de management toxique.',
  objectives: [
    'calculer la vélocité moyenne d’une équipe et comprendre sa nature de mesure descriptive empirique ;',
    'appliquer la loi de Goodhart pour éviter les dérives d’inflation artificielle des Story Points ;',
    'évaluer la capacité opérationnelle d’un Sprint en appliquant un facteur de focalisation (Focus Factor) ;',
    'analyser un Sprint Burn-down chart et diagnostiquer instantanément les dérives de périmètre (Scope Creep) ;',
    'exploiter un Release Burn-up chart pour piloter l’atterrissage d’une version face aux demandes d’évolution métier ;',
    'développer en Python 3 des projecteurs de release, des traceurs de burn-down et des simulateurs probabilistes de cône d’incertitude.'
  ],
  sections: [
    {
      title: 'La Vélocité d’Équipe : Définition, Calcul Empirique &amp; Pièges (Loi de Goodhart)',
      html: [
        '<p>La <strong>Vélocité</strong> est la somme des Story Points associés aux User Stories terminées à 100 % et validées selon la Definition of Done au cours d’un Sprint. Elle n’inclut <em>jamais</em> de pourcentage partiel de story à moitié finie (règle du tout ou rien).</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Calcul &amp; Moyenne Glissante</h4>',
        '    <p>La vélocité se stabilise généralement après 3 à 5 sprints initiaux. On utilise la moyenne mobile sur les 3 derniers sprints :</p>',
        '    <p><code>V_moy = (Points_Sprint_{N-2} + Points_Sprint_{N-1} + Points_Sprint_N) / 3</code></p>',
        '    <p><strong>Projection :</strong> Si le backlog restant comporte 90 points et que $V_{moy} = 30$, l’atterrissage nominal est estimé à $\\lceil 90 / 30 \\rceil = 3$ sprints.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. La Loi de Goodhart et les Anti-patterns</h4>',
        '    <p>Énoncée par l’économiste Charles Goodhart : <em>« Lorsqu’une mesure devient un objectif, elle cesse d’être une bonne mesure. »</em></p>',
        '    <p>Si la direction demande à une équipe « d’augmenter sa vélocité de 20 % pour la prochaine prime », les développeurs vont simplement coter une story de 5 points à 8 points sans produire une seule ligne de code utile supplémentaire (phénomène d’<strong>inflation des points</strong>). La vélocité n’est pas un indicateur de productivité individuelle, mais un outil interne de calibrage de capacité.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Évaluation de la Capacité de Sprint et Facteur de Focalisation (Focus Factor)',
      html: [
        '<p>Tous les sprints ne disposent pas du même nombre d’heures disponibles (congés, jours fériés, formations, astreintes). Avant d’engager les stories lors du Sprint Planning, l’équipe évalue sa <strong>Capacité</strong> :</p>',
        '<div class="card">',
        '  <h4>Formule de Calcul de Capacité Réelle</h4>',
        '  <p>1. <code>Heures_Brutes = Somme(Jours_Présence_Devs) &times; 7 heures/jour</code></p>',
        '  <p>2. <code>Heures_Net_Disponibles = Heures_Brutes &times; Focus_Factor</code></p>',
        '  <p>Le <strong>Focus Factor (facteur de focalisation)</strong> oscille typiquement entre <strong>0.60 et 0.80</strong> (60 % à 80 %). Il intègre le temps incompressible consacré aux rituels agiles, aux revues de code, au support d’exploitation de niveau 3 et aux interruptions techniques quotidiennes.</p>',
        '  <p>Plafond d’engagement : L’équipe ne doit jamais engager plus de points dans le Sprint que ce que sa capacité nette calculée permet raisonnablement de concevoir et tester conformément à la DoD.</p>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Graphiques de Suivi Visuel : Sprint Burn-down &amp; Scope Creep',
      html: [
        '<p>Le <strong>Sprint Burn-down chart</strong> affiche sur l’axe vertical les Story Points restants et sur l’axe horizontal les jours ouvrés du Sprint :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. La Trajectoire Idéale vs Réelle</h4>',
        '    <p>Une droite descendante relie les points initiaux au jour 0 jusqu’à zéro au jour final (pente idéale).</p>',
        '    <ul>',
        '      <li><strong>Courbe réelle en dessous de la ligne idéale</strong> : L’équipe avance plus vite que prévu ; elle peut envisager d’avancer une petite story du backlog en accord avec le PO.</li>',
        '      <li><strong>Courbe réelle au-dessus</strong> : Retard accumulé ; l’équipe doit réagir rapidement lors du Daily Scrum pour simplifier ou délester du périmètre.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Détection du Scope Creep (Dérive de Périmètre)</h4>',
        '    <p>Si la courbe réelle <strong>remonte brusquement</strong> au cours du sprint, cela traduit un <strong>Scope Creep</strong> :</p>',
        '    <p>Des stories supplémentaires ont été ajoutées en douce au sprint en cours, ou une story mal raffinée a vu son estimation exploser en découvrant une complexité imprévue. Règle absolue : protéger le Sprint Goal en refusant tout ajout sans retrait équivalent de périmètre.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Pilotage de Release : Release Burn-up Chart &amp; Cône d’Incertitude',
      html: [
        '<p>Pour piloter un projet sur plusieurs mois, le <strong>Release Burn-up chart</strong> est largement supérieur au Burn-down car il comporte <strong>deux courbes distinctes</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Deux Courbes du Burn-up</h4>',
        '    <ul>',
        '      <li><strong>Courbe supérieure (Périmètre total du backlog)</strong> : Montre l’évolution du volume total de travail demandé. Si le client ajoute des fonctionnalités, cette courbe monte.</li>',
        '      <li><strong>Courbe inférieure (Cumul des points Done)</strong> : Montre le volume réel de travail achevé et déployé sprint après sprint.</li>',
        '    </ul>',
        '    <p><strong>Avantage décisif :</strong> Si la date de release s’éloigne, le Burn-up prouve visuellement si le retard est dû à un ralentissement technique de l’équipe ou aux ajouts massifs de demandes par le client !</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Cône d’Incertitude (Cone of Uncertainty)</h4>',
        '    <p>Plutôt qu’une date unique créant un faux sentiment de certitude, le pilotage agile communique une <strong>fourchette probabiliste</strong> :</p>',
        '    <ul>',
        '      <li><strong>Scénario Optimiste</strong> : $S_{opt} = \\lceil Backlog / V_{max} \\rceil$</li>',
        '      <li><strong>Scénario Attendu</strong> : $S_{med} = \\lceil Backlog / V_{moy} \\rceil$</li>',
        '      <li><strong>Scénario Pessimiste</strong> : $S_{pess} = \\lceil Backlog / V_{min} \\rceil$</li>',
        '    </ul>',
        '    <p>Cette transparence préserve la crédibilité de l’équipe face aux aléas techniques inhérents au développement logiciel.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Pilotage et Projection d’une Release Logicielle Agile',
  method: [
    'Étape 1 : Enregistrer rigoureusement les Story Points complétés à chaque sprint et calculer la vélocité moyenne glissante sur 3 à 5 sprints.',
    'Étape 2 : Évaluer la capacité du sprint à venir en appliquant le facteur de focalisation (Focus Factor entre 0.65 et 0.80) selon les disponibilités réelles.',
    'Étape 3 : Mettre à jour quotidiennement le Sprint Burn-down chart pour visualiser l’écart à la trajectoire idéale.',
    'Étape 4 : En cas de détection de Scope Creep lors du Daily Scrum, arbitrer immédiatement avec le PO pour retirer une story équivalente.',
    'Étape 5 : Alimenter le Release Burn-up chart à chaque fin de sprint pour rendre transparent l’impact des nouveaux besoins client.',
    'Étape 6 : Présenter aux comités de pilotage une projection d’atterrissage en cône d’incertitude (scénarios pessimiste, médian, optimiste).'
  ],
  summary: [
    'La vélocité mesure la quantité de points d’histoire terminés selon la Definition of Done à chaque sprint.',
    'D’après la loi de Goodhart, la vélocité ne doit jamais être utilisée comme un indicateur d’évaluation de la performance individuelle.',
    'Le calcul de capacité nette pondère les heures de présence par un facteur de focalisation (Focus Factor de 65 à 80 %).',
    'Le Sprint Burn-down chart suit le reste à faire quotidien et met en lumière le Scope Creep lorsque la courbe remonte.',
    'Le Release Burn-up chart dissocie visuellement le travail achevé de l’augmentation du périmètre total demandé.',
    'Les prévisions de release s’expriment sous forme de cône d’incertitude probabiliste à trois bornes (optimiste, attendu, pessimiste).'
  ],
  checklist: [
    'Je sais calculer la vélocité moyenne d’une équipe sur une série historique de sprints.',
    'Je comprends la loi de Goodhart et sais expliquer pourquoi la vélocité n’est pas comparable entre deux équipes.',
    'Je sais calculer la capacité nette d’un sprint avec le Focus Factor.',
    'Je sais analyser un Sprint Burn-down chart et identifier les causes de retard ou de Scope Creep.',
    'Je comprends la supériorité du Release Burn-up chart face au Burn-down pour dialoguer avec les clients.',
    'Je sais calculer les bornes d’un cône d’incertitude pour une release de backlog donné.'
  ],
  notions: [
    'Vélocité moyenne empirique',
    'Loi de Goodhart & Inflation de points',
    'Capacité de sprint & Focus Factor',
    'Sprint Burn-down chart (Pente idéale vs réelle)',
    'Dérive de périmètre (Scope Creep)',
    'Release Burn-up chart (Périmètre vs Réalisé)',
    'Cône d’incertitude (Cone of Uncertainty)',
    'Prévision probabiliste à trois bornes'
  ],
  pitfalls: [
    'Comparer la vélocité numérique de deux équipes différentes (leurs échelles de points d’histoire relatives sont incomparables).',
    'Comptabiliser des points partiels pour une story terminée à 90 % (en agile, un travail non Done vaut 0 point).',
    'Ignorer le facteur de focalisation et planifier un sprint à 100 % du temps théorique des développeurs (saturation garantie).',
    'Donner une date d’engagement ferme unique à un an au lieu de présenter un cône de probabilité révisé à chaque fin de sprint.'
  ],
  questions: [
    {
      stem: 'Si une équipe termine une User Story de 8 points à 95 % lors du sprint (les tests automatisés ne sont pas encore écrits), combien de points sont comptabilisés dans la vélocité ?',
      opts: [
        '7.6 points (95 % de 8)',
        '8 points car l’essentiel est fait',
        '0 point, car en Scrum un incrément est soit Done à 100 %, soit non terminé',
        '4 points à titre d’encouragement'
      ],
      correct: 2,
      exp: 'Dans Scrum et les démarches agiles, la règle du tout ou rien s’applique : un travail incomplet selon la DoD ne rapporte aucun point à la vélocité.'
    },
    {
      stem: 'Que formule la loi de Goodhart appliquée à la gestion de projet agile ?',
      opts: [
        'Plus un projet dure longtemps, plus il devient cher',
        'Lorsqu’un indicateur de mesure (comme la vélocité) est transformé en objectif de performance, il cesse d’être une mesure fiable car il est manipulé',
        'Tout binaire finit par planter un jour',
        'La vélocité d’une équipe double chaque année'
      ],
      correct: 1,
      exp: 'Si le management exige une hausse de vélocité, les équipes sur-estiment artificiellement les stories (inflation de points) sans gain réel.'
    },
    {
      stem: 'Sur un Sprint Burn-down chart, qu’indique une remontée soudaine de la courbe des points restants au cours du sprint ?',
      opts: [
        'Une accélération du développement',
        'L’apparition de Scope Creep (ajout de nouvelles tâches ou réévaluation à la hausse d’une complexité sous-estimée)',
        'La fin prématurée du sprint',
        'Une panne du serveur d’intégration continue'
      ],
      correct: 1,
      exp: 'Une remontée de la courbe traduit l’injection de nouveau périmètre en cours d’itération (Scope Creep), ce qui compromet le Sprint Goal.'
    },
    {
      stem: 'Quel est l’avantage décisif d’un Release Burn-up chart par rapport à un simple Burn-down chart pour le dialogue avec un client ?',
      opts: [
        'Il coûte moins cher en licence logicielle',
        'Il trace séparément la courbe du travail terminé et la courbe du périmètre total demandé, prouvant si les retards proviennent d’ajouts de fonctionnalités',
        'Il est tracé en trois dimensions',
        'Il supprime le besoin de faire des réunions de rétrospective'
      ],
      correct: 1,
      exp: 'Le Burn-up montre clairement si le décalage de livraison résulte d’une lenteur technique ou de la demande continue de nouvelles fonctionnalités par le client.'
    },
    {
      stem: 'Pourquoi est-il absurde et dangereux de comparer la vélocité brute de deux équipes différentes (ex: Équipe A fait 40 pts, Équipe B fait 25 pts) ?',
      opts: [
        'Parce que l’équipe A a forcément de meilleurs ingénieurs',
        'Parce que les Story Points sont une échelle d’estimation relative propre à l’étalonnage interne de chaque équipe : 1 point chez A n’a aucun équivalent chez B',
        'Parce que la loi interdit les classements',
        'Parce que l’équipe B utilise probablement un autre langage de programmation'
      ],
      correct: 1,
      exp: 'L’étalonnage en Story Points est strictement relatif et idiosyncratique : une équipe peut coter 3 points ce qu’une autre cote 8 points.'
    },
    {
      stem: 'À quoi sert le « Focus Factor » dans le calcul de la capacité d’un sprint ?',
      opts: [
        'À mesurer le temps passé à regarder son écran sans cligner des yeux',
        'À réduire les heures brutes théoriques des développeurs pour tenir compte du temps réel consacré aux imprévus, rituels, revues et support (typiquement 65 à 80 %)',
        'À forcer les développeurs à éteindre leur téléphone portable',
        'À calculer le pourcentage de bugs'
      ],
      correct: 1,
      exp: 'Le Focus Factor intègre les interruptions, réunions et overhead techniques pour ne pas surcharger irréalistement l’équipe.'
    },
    {
      stem: 'Une équipe a une vélocité moyenne de 20 points par sprint. Le backlog compte 75 points. Combien de sprints complets sont mathématiquement nécessaires ?',
      opts: [
        '3 sprints',
        '3.75 sprints',
        '4 sprints (arrondi au plafond supérieur car les sprints sont indivisibles)',
        '5 sprints'
      ],
      correct: 2,
      exp: '75 / 20 = 3.75. Un sprint ne pouvant être fractionné, il faut ceil(3.75) = 4 sprints entiers pour achever le backlog.'
    },
    {
      stem: 'Qu’est-ce que le « Cône d’Incertitude » (Cone of Uncertainty) en planification logicielle ?',
      opts: [
        'Un entonnoir utilisé pour verser de l’eau sur les serveurs surchauffés',
        'Un modèle démontrant que l’imprécision des estimations est maximale au début du projet et se resserre progressivement au fur et à mesure que les retours empiriques s’accumulent',
        'La zone d’ombre où les bugs ne peuvent pas être détectés',
        'Une sanction attribuée au Product Owner'
      ],
      correct: 1,
      exp: 'Au démarrage, l’incertitude est de 4x à 0.25x ; elle décroît régulièrement à mesure que le logiciel est inspecté et testé en conditions réelles.'
    }
  ],
  flashcards: [
    {
      q: 'Comment calcule-t-on la vélocité d’un Sprint ?',
      a: 'En sommant les Story Points de toutes les User Stories validées à 100 % selon la Definition of Done.'
    },
    {
      q: 'Qu’énonce la loi de Goodhart ?',
      a: '« Lorsqu’une mesure devient un objectif de performance, elle cesse d’être une bonne mesure. »'
    },
    {
      q: 'Qu’est-ce que le Scope Creep sur un Sprint Burn-down ?',
      a: 'Une remontée anormale de la courbe des points restants causée par l’ajout imprévu de périmètre en cours d’itération.'
    },
    {
      q: 'Quelle est la valeur typique d’un Focus Factor ?',
      a: 'Entre 0.65 et 0.80 (65 % à 80 % du temps théorique brut).'
    },
    {
      q: 'Pourquoi préférer un Release Burn-up à un Burn-down ?',
      a: 'Parce qu’il sépare visuellement le travail achevé de l’augmentation du périmètre global demandé par le métier.'
    },
    {
      q: 'Comment formule-t-on une prévision de release en cône d’incertitude ?',
      a: 'Sous la forme d’un intervalle à trois scénarios : Optimiste (V_max), Attendu (V_moy), et Pessimiste (V_min).'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Assimilation de la vélocité à une mesure de productivité individuelle ou planification de sprints sans prise en compte de la capacité réelle.'
    },
    {
      cls: 'medium',
      text: 'Calcul rigoureux de vélocité moyenne, utilisation du Focus Factor et détection des anomalies sur Burn-down charts.'
    },
    {
      cls: 'high',
      text: 'Maîtrise experte du pilotage de release probabiliste, modélisation fine par Release Burn-up et communication stratégique en cône d’incertitude.'
    }
  ]
};
