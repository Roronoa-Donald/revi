/**
 * Chapitre 5 du cours « Étude Quantitative & Qualitative B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Analyse Statistique Descriptive &amp; Inférentielle (Tests d’Hypothèses)',
  short: 'Statistiques &amp; Tests d’Hypothèses',
  toc: 'Statistique descriptive univariée, tableaux de contingence croisés, test d’indépendance du Chi-deux, coefficient de corrélation de Pearson et seuil de significativité p-valeur.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Après avoir collecté plusieurs centaines de réponses à un questionnaire d’enquête ou enregistré des milliers de métriques de télémétrie système, l’ingénieur se retrouve devant une montagne de données brutes. Présenter de simples pourcentages descriptifs (tri à plat) est utile mais insuffisant pour établir une démonstration scientifique : deux variables semblent corrélées, mais cette association est-elle réelle ou le simple fruit du hasard d’échantillonnage ? Pour prouver rigoureusement une relation de cause à effet ou une dépendance entre facteurs (ex: l’impact d’une formation continue sur le taux de bugs en production), il est indispensable de mobiliser l’inférence statistique et les tests d’hypothèses paramétriques et non paramétriques. L’ingénieur de Bachelor 3 doit maîtriser les statistiques univariées, exécuter le test du Chi-deux d’indépendance sur tableaux de contingence, calculer le coefficient de corrélation de Pearson et trancher scientifiquement le rejet de l’hypothèse nulle à p < 0.05.',
  objectives: [
    'calculer et interpréter les statistiques descriptives univariées : moyenne, médiane, étendue, variance et écart-type population ;',
    'construire des tableaux de contingence croisés $2 \\times 2$ et calculer les effectifs théoriques sous hypothèse d’indépendance ;',
    'exécuter pas-à-pas le test d’indépendance du Chi-deux ($\\chi^2$) et comparer la statistique au seuil critique (3.84 pour 1 ddl à $\\alpha = 0.05$) ;',
    'calculer le coefficient de corrélation linéaire de Pearson ($r$) et déterminer la force et le sens d’association entre variables continues ;',
    'maîtriser la dialectique des hypothèses nulle ($H_0$) et alternative ($H_1$) et la signification d’une p-valeur ($p < 0.05$) ;',
    'analyser et résoudre méthodologiquement des moteurs d’analyse univariée, des calculateurs de Chi-deux et des évaluateurs de corrélations métriques de Pearson.'
  ],
  sections: [
    {
      title: 'Statistique Descriptive Univariée : Tendance Centrale &amp; Dispersion',
      html: [
        '<p>L’analyse commence systématiquement par l’exploration variable par variable (tri à plat) pour résumer la forme de la distribution :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Paramètres de Tendance Centrale</h4>',
        '    <ul>',
        '      <li><strong>Moyenne arithmétique ($\\mu$) :</strong> $\\mu = \\frac{1}{N} \\sum x_i$. Sensible aux valeurs extrêmes (outliers).</li>',
        '      <li><strong>Médiane (Med) :</strong> Valeur centrale qui sépare la série ordonnée en deux moitiés égales (50% en dessous, 50% au-dessus). Métrique robuste insensible aux valeurs aberrantes.</li>',
        '      <li><strong>Mode :</strong> Valeur ou modalité la plus fréquemment observée.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Paramètres de Dispersion</h4>',
        '    <ul>',
        '      <li><strong>Étendue :</strong> $\\max(x) - \\min(x)$. Amplitude brute totale.</li>',
        '      <li><strong>Variance ($\\sigma^2$) &amp; Écart-type ($\\sigma$) :</strong> $\\sigma = \\sqrt{\\frac{1}{N} \\sum (x_i - \\mu)^2}$. Mesure l’écart moyen des observations par rapport à la moyenne.</li>',
        '      <li><strong>Écart interquartile (IQR) :</strong> $Q_3 - Q_1$. Dispersion des 50% centraux des données.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Tableaux Croisés &amp; Test d’Indépendance du Chi-deux (χ²)',
      html: [
        '<p>Lorsque l’on souhaite tester la dépendance entre deux variables qualitatives catégorielles (ex: <em>Profil métier</em> $\\times$ <em>Adoption d’un outil de sécurité</em>), on dresse un <strong>tableau de contingence</strong> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Principe des Effectifs Théoriques ($E_{ij}$)</h4>',
        '    <p>Sous l’hypothèse nulle $H_0$ d’indépendance totale, le nombre de répondants attendus dans chaque cellule $(i,j)$ se déduit du produit des totaux marginaux :</p>',
        '    <p>$$E_{ij} = \\frac{\\text{Total Ligne}_i \\times \\text{Total Colonne}_j}{N_{total}}$$</p>',
        '    <p>La statistique compare les effectifs observés $O_{ij}$ aux théoriques $E_{ij}$ :</p>',
        '    <p>$$\\chi^2 = \\sum \\frac{(O_{ij} - E_{ij})^2}{E_{ij}}$$</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Règle de Décision Statistique à α = 0.05</h4>',
        '    <p>Pour un tableau $2 \\times 2$, le nombre de degrés de liberté est $ddl = (2-1)(2-1) = 1$.</p>',
        '    <p>La table du Chi-deux donne une <strong>valeur critique seuil de 3.84</strong> au risque d’erreur $\\alpha = 5\\%$ :</p>',
        '    <ul>',
        '      <li><strong>Si $\\chi^2 > 3.84$ :</strong> La probabilité que l’écart soit dû au hasard est inférieure à 5% ($p < 0.05$). On <strong>rejette $H_0$</strong> : la liaison entre les deux variables est statistiquement significative.</li>',
        '      <li><strong>Si $\\chi^2 \\le 3.84$ :</strong> On ne peut pas rejeter l’indépendance.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Corrélation Linéaire de Pearson (r)',
      html: [
        '<p>Pour mesurer la force de liaison entre deux variables quantitatives continues (ex: <em>Années d’expérience</em> et <em>Vitesse de résolution de tickets d’incident</em>), on calcule le <strong>coefficient de corrélation linéaire de Pearson</strong> :</p>',
        '<p>$$r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\cdot \\sum (y_i - \\bar{y})^2}}$$</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Corrélation Forte ($|r| \\ge 0.70$)</h4>',
        '    <p>Si $r > +0.70$ : forte relation linéaire positive (les deux variables croissent ensemble). Si $r < -0.70$ : forte relation inverse (quand l’une augmente, l’autre diminue proportionnellement).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Corrélation Modérée ($0.30 \\le |r| < 0.70$)</h4>',
        '    <p>Tendance nette mais avec une dispersion notable autour de la droite de régression. D’autres facteurs explicatifs interviennent.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Corrélation Négligeable ($|r| < 0.30$)</h4>',
        '    <p>Absence de lien linéaire entre les deux grandeurs mesurées.</p>',
        '  </div>',
        '</div>',
        box('warning', 'Corrélation n’est pas Causalité !', [
          'Un coefficient de Pearson élevé ($r = 0.90$) prouve une co-variation mathématique, mais en aucun cas un lien de cause à effet.',
          'Une corrélation apparente peut être purement fortuite ou résulter d’une troisième variable cachée (variable confondante ou effet de cigogne).'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'La Démarche de Test d’Hypothèses &amp; La P-Valeur (p-value)',
      html: [
        '<p>Tout test inférentiel repose sur une confrontation formelle entre deux hypothèses mutuellement exclusives :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>L’Hypothèse Nulle ($H_0$) vs Alternative ($H_1$)</h4>',
        '    <ul>',
        '      <li><strong>$H_0$ (Hypothèse nulle) :</strong> Postulat conservateur de l’absence d’effet, d’écart ou de liaison (ex: « Le nouvel outil n’améliore pas la productivité »).</li>',
        '      <li><strong>$H_1$ (Hypothèse de recherche) :</strong> Affirmation d’un effet significatif (ex: « Le nouvel outil améliore la productivité »).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La P-Valeur (Significativité p &lt; 0.05)</h4>',
        '    <p>La <strong>p-valeur</strong> est la probabilité d’observer un résultat au moins aussi extrême que celui de l’échantillon si l’hypothèse nulle $H_0$ était vraie :</p>',
        '    <ul>',
        '      <li>Si $p < 0.05$ (ou 5%) : L’observation est trop improbable sous $H_0$. On rejette $H_0$ au profit de $H_1$ avec un risque d’erreur inférieur à 5%.</li>',
        '      <li>Si $p \\ge 0.05$ : Données insuffisantes pour rejeter $H_0$.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie d’Analyse Statistique d’une Enquête de Recherche',
  method: [
    '1. Nettoyer et valider le jeu de données : Éliminer les soumissions incomplètes ou aberrantes, vérifier les types numériques et vérifier l’absence de doublons.',
    '2. Réaliser les tris à plat univariés : Calculer moyenne, médiane et écart-type pour chaque variable et vérifier la normalité de la distribution.',
    '3. Formuler formellement les couples d’hypothèses : Pour chaque relation étudiée, écrire explicitement l’hypothèse nulle H0 et l’hypothèse alternative H1.',
    '4. Sélectionner le test adéquat : Utiliser le Chi-deux pour deux variables qualitatives catégorielles ; utiliser Pearson pour deux variables quantitatives continues.',
    '5. Calculer la statistique de test et la comparer au seuil : Déterminer la valeur critique au risque alpha = 0.05 (ex: 3.84 pour Chi-deux 1 ddl) et en déduire la décision de rejet ou non-rejet de H0.',
    '6. Interpréter avec nuance managériale : Ne jamais confondre corrélation et causalité mécanique ; discuter les limites d’échantillonnage.'
  ],
  summary: [
    'La statistique descriptive résume les séries par leur tendance centrale (moyenne, médiane) et leur dispersion (écart-type, étendue).',
    'La médiane est un paramètre robuste indispensable lorsque la série contient des valeurs extrêmes ou asymétriques.',
    'Le test du Chi-deux (χ²) d’indépendance compare les effectifs observés aux effectifs théoriques sous hypothèse d’indépendance.',
    'Pour un tableau 2x2 à 1 degré de liberté et au seuil α = 0.05, la valeur critique est 3.84 : si χ² > 3.84, le lien est statistiquement significatif.',
    'Le coefficient de corrélation linéaire de Pearson (r) mesure la force et le sens d’une relation entre deux variables quantitatives (-1 à +1).',
    'Une corrélation mathématique ne prouve jamais à elle seule une causalité réelle : elle nécessite une démonstration conceptuelle et qualitative.'
  ],
  checklist: [
    'Les moyennes et médianes ont-elles été calculées conjointement pour détecter d’éventuelles asymétries de distribution ?',
    'L’hypothèse nulle H0 et l’hypothèse alternative H1 sont-elles explicitement rédigées avant l’exécution des tests ?',
    'Les effectifs théoriques de chaque cellule du test du Chi-deux sont-ils tous supérieurs ou égaux à 5 (règle de Cochran) ?',
    'La décision statistique compare-t-elle la statistique calculée au seuil critique théorique exact (3.84 pour 1 ddl à 5%) ?',
    'Le coefficient de Pearson r est-il interprété avec prudence en rappelant que corrélation ne vaut pas causalité ?',
    'Les conclusions sont-elles formulées avec rigueur probabiliste sans affirmation péremptoire absolue ?'
  ],
  notions: [
    'Paramètres de tendance centrale (moyenne, médiane)',
    'Paramètres de dispersion (écart-type, variance)',
    'Tableaux de contingence et tris croisés',
    'Effectifs théoriques sous hypothèse d’indépendance',
    'Statistique du test du Chi-deux (χ²)',
    'Seuil critique et degrés de liberté (ddl)',
    'Coefficient de corrélation linéaire de Pearson (r)',
    'Dialectique H0/H1 et seuil de significativité p-valeur'
  ],
  pitfalls: [
    'Calculer uniquement la moyenne arithmétique sur une distribution de salaires ou de latences réseau très asymétrique sans regarder la médiane.',
    'Affirmer que deux variables sont liées parce qu’un pourcentage semble plus élevé, sans vérifier la significativité par un test du Chi-deux.',
    'Confondre systématiquement une corrélation statistique avec une causalité directe sans analyser les variables confondantes.',
    'Appliquer le test de corrélation linéaire de Pearson sur des variables purement qualitatives non ordinales.'
  ],
  questions: [
    {
      stem: 'Pourquoi la médiane est-elle considérée comme un indicateur de tendance centrale plus robuste que la moyenne arithmétique ?',
      opts: [
        'Parce que la médiane est toujours égale à zéro',
        'Parce que la médiane n’est pas influencée par les valeurs extrêmes ou aberrantes (outliers), représentant fidèlement le centre de la distribution',
        'Parce que la médiane ne s’applique qu’aux ordinateurs portables',
        'Parce que la formule de la médiane est secrète'
      ],
      correct: 1,
      exp: 'Une seule valeur aberrante géante (ex: un salaire de 2 millions d’euros dans une PME) tire artificiellement la moyenne vers le haut, alors que la médiane reste parfaitement stable.'
    },
    {
      stem: 'Dans un test d’indépendance du Chi-deux sur un tableau de contingence 2x2, quelle est la valeur critique théorique au seuil de risque α = 0.05 pour 1 degré de liberté ?',
      opts: [
        '1.00',
        '3.84',
        '10.50',
        '100.00'
      ],
      correct: 1,
      exp: 'Pour 1 ddl à α = 0.05, la table de la loi du Chi-deux donne la valeur critique canonique de 3.841 (arrondie à 3.84).'
    },
    {
      stem: 'Si un test du Chi-deux produit une statistique calculée χ² = 16.67 sur un tableau 2x2, quelle est la conclusion méthodologique rigoureuse ?',
      opts: [
        'On accepte l’hypothèse nulle et on conclut que les variables sont totalement indépendantes',
        'La statistique χ² (16.67) étant très supérieure au seuil critique de 3.84, on rejette H0 avec p < 0.05 : il existe une relation statistiquement significative entre les deux variables',
        'L’enquête doit être annulée car le chiffre dépasse 10',
        'On en déduit que l’une des deux variables est fausse'
      ],
      correct: 1,
      exp: 'Un χ² supérieur à la valeur critique rejette l’hypothèse d’indépendance : l’écart observé entre les groupes a moins de 5% de chances d’être le fruit du hasard pur.'
    },
    {
      stem: 'Que signifie un coefficient de corrélation linéaire de Pearson r = -0.85 entre l’âge d’un serveur et sa disponibilité annuelle ?',
      opts: [
        'Que le calcul est faux car un coefficient ne peut pas être négatif',
        'Qu’il existe une relation linéaire forte et négative (inverse) : plus le serveur est âgé, plus son taux de disponibilité a tendance à diminuer',
        'Que le serveur va s’éteindre dans 85 jours',
        'Qu’il n’existe aucune relation entre l’âge et la disponibilité'
      ],
      correct: 1,
      exp: 'Le signe négatif indique une évolution en sens inverse (l’un monte quand l’autre descend), et la valeur absolue 0.85 ≥ 0.70 atteste d’une liaison forte.'
    },
    {
      stem: 'Quelle formule permet de calculer l’effectif théorique E(i,j) d’une cellule dans un tableau croisé de contingence sous hypothèse d’indépendance H0 ?',
      opts: [
        '(Total Ligne i + Total Colonne j) / 2',
        '(Total Ligne i * Total Colonne j) / N total',
        'Total Ligne i - Total Colonne j',
        'N total divisé par le nombre de cellules'
      ],
      correct: 1,
      exp: 'Sous H0, la probabilité conjointe est le produit des probabilités marginales, soit E(i,j) = (Ligne i * Colonne j) / Total N.'
    },
    {
      stem: 'Pourquoi l’affirmation « Le nombre de parapluies ouverts est corrélé aux accidents de voiture, donc ouvrir un parapluie provoque des accidents » est-elle un sophisme ?',
      opts: [
        'Parce que les parapluies n’ont pas de roues',
        'Parce qu’elle confond corrélation et causalité en ignorant une variable confondante sous-jacente (la pluie battante)',
        'Parce que le coefficient de Pearson est obligatoirement nul sous la pluie',
        'Parce que les accidents de voiture ne sont pas quantifiables'
      ],
      correct: 1,
      exp: 'La corrélation mesure une co-variation mathématique mais pas un lien causal : c’est la pluie qui provoque à la fois l’ouverture des parapluies et les accidents.'
    },
    {
      stem: 'Dans un test d’hypothèses statistiques, qu’indique formellement une « p-valeur » inférieure à 0.05 (p < 0.05) ?',
      opts: [
        'Que la probabilité d’erreur de calcul est de 100%',
        'Que sous l’hypothèse nulle d’absence d’effet, la probabilité d’obtenir des résultats aussi extrêmes par simple hasard est inférieure à 5%, justifiant le rejet de H0',
        'Que 5% des répondants ont refusé de répondre',
        'Que le projet coûte moins de 5 000 euros'
      ],
      correct: 1,
      exp: 'La p-valeur mesure la probabilité d’observer les données si le hasard seul opérait. Inférieure à 0.05, l’hypothèse du hasard (H0) est écartée.'
    },
    {
      stem: 'Quelle condition minimale sur les effectifs théoriques (règle de Cochran) doit être satisfaite pour que le test du Chi-deux soit valide ?',
      opts: [
        'Tous les effectifs théoriques doivent être égaux à 0',
        'Chaque effectif théorique doit être supérieur ou égal à 5 (Eij ≥ 5)',
        'L’échantillon total doit comporter au moins 1 million de personnes',
        'Il n’y a aucune condition d’effectif'
      ],
      correct: 1,
      exp: 'Pour que l’approximation par la loi continue du Chi-deux soit légitime, la règle empirique de Cochran exige que chaque case théorique compte au moins 5 individus (Eij ≥ 5).'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence entre moyenne et médiane ?',
      a: 'La moyenne est le centre de gravité arithmétique (sensible aux extrêmes), la médiane est la valeur centrale séparant l’échantillon ordonné en deux moitiés égales (robuste).'
    },
    {
      q: 'À quoi sert le test du Chi-deux (χ²) d’indépendance ?',
      a: 'À tester s’il existe une relation statistiquement significative de dépendance entre deux variables qualitatives catégorielles croisées.'
    },
    {
      q: 'Quelle est la valeur critique du Chi-deux pour 1 ddl à α = 0.05 ?',
      a: '3.84. Si le χ² calculé est supérieur à 3.84, on rejette l’indépendance (p < 0.05).'
    },
    {
      q: 'Que mesure le coefficient de corrélation linéaire de Pearson (r) ?',
      a: 'La force et la direction de l’association linéaire entre deux variables quantitatives continues, variant de -1 (inverse parfaite) à +1 (directe parfaite).'
    },
    {
      q: 'Pourquoi corrélation ne signifie pas causalité ?',
      a: 'Parce qu’une co-variation statistique entre deux variables peut être fortuite ou provoquée par une troisième variable confondante cachée.'
    },
    {
      q: 'Que signifie une p-valeur < 0.05 ?',
      a: 'Que la probabilité que les résultats observés soient dus au pur hasard est inférieure à 5%, justifiant le rejet de l’hypothèse nulle H0.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la moyenne vs médiane, le tableau de contingence, le test du Chi-deux (seuil 3.84) et Pearson.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les effectifs théoriques, les degrés de liberté et l’interprétation de la p-valeur.'
    },
    {
      cls: 'high',
      text: '8/8 : Parfait ! Vous maîtrisez l’analyse statistique univariée, bivariée et les tests d’hypothèses de niveau Bachelor 3.'
    }
  ]
};
