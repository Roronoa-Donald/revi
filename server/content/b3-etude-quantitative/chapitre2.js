/**
 * Chapitre 2 du cours « Étude Quantitative & Qualitative B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Théorie de l’Échantillonnage, Méthodes Aléatoires &amp; Quotas',
  short: 'Échantillonnage &amp; Quotas',
  toc: 'Méthodes probabilistes et empiriques, dimensionnement par la formule de Cochran, correction pour population finie, stratification proportionnelle et gestion des quotas.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Interroger toute une population cible peut être coûteux ou impossible. L’échantillonnage sélectionne un sous-ensemble d’individus pour étudier cette population ; sa taille ou le respect de quotas ne garantissent pas à eux seuls que ses résultats la reflètent fidèlement. Des volontaires recrutés sur un réseau social peuvent notamment présenter un biais d’autosélection. Il faut expliciter le plan, ventiler les strates et examiner les limites de la collecte.',
  objectives: [
    'distinguer rigoureusement les méthodes d’échantillonnage probabilistes (aléatoires) et non probabilistes (empiriques) ;',
    'dimensionner un échantillon sous les hypothèses de la formule de Cochran (scores z, marge d’erreur e, variabilité p), sans en déduire l’absence de biais ;',
    'appliquer la correction de Cochran pour population finie afin d’optimiser les coûts de collecte sans dégrader la précision ;',
    'concevoir un plan d’échantillonnage stratifié proportionnel et calculer les effectifs à sonder par sous-groupe démographique ;',
    'contrôler les quotas par rapport aux distributions de référence et reconnaître les biais que ce contrôle ne mesure pas ;',
    'analyser et résoudre méthodologiquement des calculateurs de Cochran, des générateurs d’échantillons stratifiés et des vérificateurs de conformité par quotas.'
  ],
  sections: [
    {
      title: 'Taxonomie des Méthodes d’Échantillonnage',
      html: [
        '<p>Le support de cours officiel distingue formellement deux grandes familles de méthodes d’échantillonnage selon que chaque individu possède ou non une probabilité mathématique connue et non nulle d’être sélectionné :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Méthodes Probabilistes (Aléatoires)</h4>',
        '    <ul>',
        '      <li><strong>Aléatoire simple :</strong> Chaque unité a exactement la même probabilité de tirage (tirage au sort dans une base de sondage complète).</li>',
        '      <li><strong>Systématique :</strong> Sélection d’une unité tous les $k$ pas ($k = N / n$) à partir d’un point de départ aléatoire.</li>',
        '      <li><strong>Stratifié proportionnel :</strong> Découpage de la population en strates homogènes (ex: départements, tranches d’âge) et tirage proportionnel à leur poids.</li>',
        '      <li><strong>Par grappes :</strong> Tirage au sort de groupes entiers (ex: des agences régionales ou des classes) plutôt que d’individus isolés.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Méthodes Non Probabilistes (Empiriques)</h4>',
        '    <ul>',
        '      <li><strong>Méthode des quotas :</strong> Reconstitution d’un modèle réduit de la population mère selon des variables de contrôle connues (âge, sexe, profession).</li>',
        '      <li><strong>De convenance :</strong> Sélection des personnes facilement accessibles (collègues de bureau, étudiants du même couloir) — fort risque de biais.</li>',
        '      <li><strong>Boule de neige (Snowball) :</strong> Chaque participant recommande un autre contact (indispensable pour les populations rares ou fermées, ex: hackers éthiques).</li>',
        '      <li><strong>Au jugé / Par choix raisonné :</strong> Sélection délibérée d’experts reconnus pour leur expertise pointue.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Dimensionnement Statistique : La Formule de Cochran',
      html: [
        '<p>Pour estimer une proportion $p$ au sein d’une population infinie ou de très grande taille avec un niveau de confiance fixé et une marge d’erreur maximale tolérée $e$, la <strong>formule de William G. Cochran</strong> s’applique :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Formule Fondamentale pour Population Infinie</h4>',
        '    <p>$$n_0 = \\frac{z^2 \\cdot p \\cdot (1 - p)}{e^2}$$</p>',
        '    <ul>',
        '      <li>$z$ : Score centré réduit de la loi normale correspondant au niveau de confiance désiré. Pour 95%, $z = 1.96$ ; pour 90%, $z = 1.645$ ; pour 99%, $z = 2.576$.</li>',
        '      <li>$p$ : Proportion estimée du caractère dans la population. Si elle est inconnue, on pose $p = 0.5$ (cas le plus défavorable donnant la variance maximale $p(1-p) = 0.25$).</li>',
        '      <li>$e$ : Marge d’erreur absolue acceptée exprimée en décimale (ex: 5% correspond à $e = 0.05$).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Exemple Canonique à 95% et 5% d’Erreur</h4>',
        '    <p>Pour $z = 1.96$, $p = 0.5$ et $e = 0.05$ :</p>',
        '    <p>$$n_0 = \\frac{1.96^2 \\times 0.5 \\times 0.5}{0.05^2} = \\frac{3.8416 \\times 0.25}{0.0025} = 384.16$$</p>',
        '    <p>On arrondit toujours à l’entier supérieur : <strong>$n_0 = 385$ répondants</strong>. Ce chiffre magique de 384-385 est le standard mondial des instituts de sondage pour les études nationales.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Correction pour Population Finie',
      html: [
        '<p>Lorsque la taille totale de la population cible $N$ est connue et relativement restreinte (par exemple une entreprise de 1 000 salariés ou une école de 500 étudiants), interroger 385 personnes serait surdimensionné.</p>',
        '<p>Cochran introduit le facteur de correction pour population finie (Finite Population Correction - FPC) :</p>',
        '<p>$$n = \\frac{n_0}{1 + \\frac{n_0 - 1}{N}}$$</p>',
        box('info', 'Exemple concret de correction', [
          'Pour $N = 1\\,000$ collaborateurs, avec $n_0 = 384.16$ :',
          '$$n = \\frac{384.16}{1 + \\frac{383.16}{1000}} = \\frac{384.16}{1.38316} \\approx 277.74 \\rightarrow 278\\text{ répondants}$$',
          'L’enquête nécessite 278 collaborateurs au lieu de 385, soit une économie d’effort de collecte de près de 28% pour une rigueur mathématique strictement équivalente.'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Échantillonnage Stratifié &amp; Contrôle des Quotas',
      html: [
        '<p>La répartition selon des critères connus est utile, mais ne suffit pas à établir la représentativité sur toutes les caractéristiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Échantillonnage Stratifié Proportionnel</h4>',
        '    <p>Pour chaque strate de taille $N_h$, la part théorique est $q_h = n N_h/N$. Pour obtenir des effectifs entiers, attribuer d’abord $\\lfloor q_h \\rfloor$, puis distribuer les unités restantes aux <strong>plus forts restes</strong> ; en cas d’égalité, suivre l’ordre des strates.</p>',
        '    <p>Sans remplacement, vérifier $0 \\le n_h \\le N_h$ et $1 \\le n \\le N$. Sans minimum imposé, une strate peut recevoir zéro unité.</p>',
        '    <p>Si des minima entiers $m_h$ sont imposés, vérifier $0 \\le m_h \\le N_h$ et $\\sum m_h \\le n \\le \\sum N_h$. Une règle possible consiste à attribuer d’abord les minima, puis à répartir le reste proportionnellement aux capacités résiduelles $N_h-m_h$ avec les mêmes plus forts restes. S’il ne reste aucune unité à distribuer, on s’arrête. Cette règle respecte les bornes mais modifie la cible proportionnelle initiale.</p>',
        '    <p>Exemple : pour $n = 1$ et trois strates de taille 1, les parts sont $1/3, 1/3, 1/3$. Leurs planchers valent $0, 0, 0$ ; l’unité restante va à la première strate : $1, 0, 0$.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Méthode des Quotas &amp; Contrôle de Conformité</h4>',
        '    <p>Dans les enquêtes sans base de sondage nominative, on fixe aux enquêteurs des quotas stricts (ex: 30% Juniors, 50% Confirmés, 20% Seniors).</p>',
        '    <p>Le contrôle compare les proportions observées aux quotas cibles. Un seuil de 3 points est un choix illustratif, pas une garantie : il ne révèle ni tous les biais de sélection ni les écarts sur les variables non contrôlées. Une pondération peut corriger des marges connues, sans supprimer automatiquement les autres biais.</p>',
        '  </div>',
        '</div>',
        '<p><strong>Contre-exemple synthétique :</strong> une population de 100 personnes compte 50 A et 50 B, dont 10 à revenu élevé dans chaque groupe : 20% au total. Un échantillon de 5 A et 5 B respecte parfaitement les quotas 50/50, mais si les 10 personnes choisies ont un revenu élevé, cette proportion atteint 100% dans l’échantillon. La conformité des quotas ne démontre pas la représentativité des revenus ni l’absence de biais de sélection.</p>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Construction et d’Évaluation d’un Échantillon',
  method: [
    '1. Définir la population mère N : Déterminer la taille totale exacte de l’univers de recherche (ou constater son caractère infini / non borné).',
    '2. Fixer le seuil de confiance et l’erreur tolérée : Retenir conventionnellement 95% de confiance (z = 1.96) et une marge d’erreur de 5% (e = 0.05).',
    '3. Calculer n0 par la formule de Cochran : Appliquer la formule de base avec p = 0.5 (variabilité maximale prudente).',
    '4. Appliquer la correction de population finie : Si N < 100 000, réajuster la taille d’échantillon requise via la formule FPC.',
    '5. Ventiler par strates ou quotas : conserver la taille cible avec les plus forts restes, vérifier les capacités et analyser les risques de sélection.',
    '6. Contrôler le taux d’attrition prévu : Prévoir un volume d’envois supérieur (ex: avec un taux de réponse de 20%, envoyer 5 fois plus de questionnaires que la taille n visée).'
  ],
  summary: [
    'L’échantillonnage permet d’inférer les caractéristiques d’une population entière à partir de l’observation rigoureuse d’une fraction représentative.',
    'Les méthodes probabilistes reposent sur un tirage au sort où chaque unité a une probabilité connue et non nulle d’être sélectionnée.',
    'La formule de Cochran ($n_0 = z^2 \\cdot p(1-p) / e^2$) donne la taille requise en population infinie : à 95% et 5% d’erreur, $n_0 = 385$.',
    'La correction pour population finie réduit la taille requise lorsque la population totale $N$ est restreinte, sans perte de niveau de confiance.',
    'Le respect des quotas ne démontre pas la représentativité des autres caractéristiques ni l’absence de biais de sélection.',
    'La répartition stratifiée entière utilise ici les plus forts restes, avec départage par ordre d’apparition et vérification des capacités.'
  ],
  checklist: [
    'Le choix entre échantillonnage probabiliste et non probabiliste est-il explicitement justifié au regard de la base de sondage disponible ?',
    'Le niveau de confiance (z) et la marge d’erreur maximale (e) sont-ils formellement déclarés ?',
    'La formule de Cochran a-t-elle été correctement appliquée avec p = 0.5 par défaut de prudence ?',
    'La correction pour population finie a-t-elle été mobilisée si la population totale N est connue et restreinte ?',
    'La somme des effectifs alloués respecte-t-elle la taille cible et les capacités des strates, sans promettre un minimum non prévu ?',
    'Les quotas sont-ils contrôlés sans en déduire l’absence de biais pour les caractéristiques non observées ?',
    'Le volume d’envoi initial prend-il en compte le taux de non-réponse prévisible (taux de retour) ?'
  ],
  notions: [
    'Échantillonnage probabiliste aléatoire',
    'Échantillonnage non probabiliste par quotas',
    'Formule de dimensionnement de Cochran',
    'Score z et niveau de confiance statistique',
    'Marge d’erreur absolue et variabilité',
    'Correction de population finie (FPC)',
    'Échantillonnage stratifié proportionnel',
    'Redressement d’échantillon par pondération'
  ],
  pitfalls: [
    'Interroger 1 000 volontaires recrutés sur un réseau social et affirmer que l’échantillon est représentatif de la population générale.',
    'Oublier d’arrondir à l’entier supérieur lors du calcul de la taille minimale d’échantillon avec Cochran.',
    'Négliger la correction pour population finie lorsque l’on étudie une PME de 300 salariés, conduisant à des calculs disproportionnés.',
    'Ignorer les strates clés (ex: n’interroger que des développeurs juniors et tirer des conclusions sur l’ensemble de la filière informatique).',
    'Déduire d’un respect parfait des quotas que toutes les autres variables sont représentatives.',
    'Arrondir indépendamment les parts de chaque strate sans vérifier la somme ni les capacités.'
  ],
  questions: [
    {
      stem: 'Dans la formule de Cochran n0 = (z² * p * (1-p)) / e², pourquoi utilise-t-on couramment la valeur p = 0.5 lorsque la proportion réelle est inconnue ?',
      opts: [
        'Parce que 0.5 est le chiffre porte-bonheur des statisticiens',
        'Parce que la valeur p = 0.5 maximise le produit p(1-p) à 0.25, garantissant la taille d’échantillon la plus prudente et la plus sécurisante',
        'Parce que la loi interdit d’utiliser une autre valeur que 0.5',
        'Parce que cela divise automatiquement le temps de calcul par deux'
      ],
      correct: 1,
      exp: 'La variance de Bernoulli p(1-p) est maximale en p = 0.5. Cette valeur donne une taille prudente dans le cadre du modèle, sans corriger les biais de sélection ou de non-réponse.'
    },
    {
      stem: 'Quelle taille d’échantillon minimale brute n0 obtient-on pour une population infinie avec un niveau de confiance de 95% (z = 1.96), une marge d’erreur de 5% (e = 0.05) et p = 0.5 ?',
      opts: [
        '50 répondants',
        '100 répondants',
        '385 répondants',
        '10 000 répondants'
      ],
      correct: 2,
      exp: 'n0 = (1.96² * 0.25) / 0.05² = 0.9604 / 0.0025 = 384.16, arrondi à l’entier supérieur = 385 répondants.'
    },
    {
      stem: 'Quand est-il impératif d’appliquer la correction de Cochran pour population finie n = n0 / [1 + (n0 - 1) / N] ?',
      opts: [
        'Uniquement lorsque la population totale est infinie',
        'Lorsque la taille de la population mère N est connue et restreinte (généralement inférieure à 100 000 individus)',
        'Quand l’ordinateur n’a plus de batterie',
        'Uniquement pour les enquêtes réalisées à l’étranger'
      ],
      correct: 1,
      exp: 'La formule FPC réduit la taille requise lorsque la population totale N est finie et connue, évitant de surdimensionner inutilement l’effort de collecte.'
    },
    {
      stem: 'Pour n = 1 et trois strates de taille 1, quelle répartition donnent les plus forts restes, avec départage dans l’ordre ?',
      opts: [
        '0, 0, 0',
        '1, 0, 0',
        '1, 1, 1',
        '1, 1, 0'
      ],
      correct: 1,
      exp: 'Chaque part vaut 1/3 : les planchers valent 0. L’unité restante va à la première strate à égalité ; la somme vaut 1.'
    },
    {
      stem: 'Quelle est la caractéristique fondamentale d’un échantillonnage probabiliste par rapport à une méthode empirique (non probabiliste) ?',
      opts: [
        'L’échantillonnage probabiliste est toujours gratuit',
        'Chaque unité de la population possède une probabilité mathématique connue et non nulle d’être tirée au sort',
        'L’échantillonnage probabiliste ne concerne que les données textuelles',
        'Il interdit l’utilisation de formulaires en ligne'
      ],
      correct: 1,
      exp: 'Dans une méthode probabiliste, le tirage au sort garantit que chaque membre de la base a une chance probabiliste calculable d’être sélectionné.'
    },
    {
      stem: 'Quelle technique d’échantillonnage non probabiliste consiste à demander à chaque personne interrogée de désigner d’autres répondants potentiels ?',
      opts: [
        'L’échantillonnage par tirage au chapeau',
        'L’échantillonnage par boule de neige (Snowball sampling)',
        'L’échantillonnage stratifié automatique',
        'L’échantillonnage par grappes concentriques'
      ],
      correct: 1,
      exp: 'La méthode boule de neige (snowball) s’appuie sur les réseaux de pairs, indispensable pour atteindre des populations confidentielles ou difficiles d’accès.'
    },
    {
      stem: 'Des quotas A/B sont parfaitement respectés. Quelle conclusion est justifiée ?',
      opts: [
        'Toutes les caractéristiques sont représentatives',
        'Les proportions A/B sont conformes, mais d’autres biais peuvent subsister',
        'La sélection est forcément aléatoire',
        'Aucune autre information sur la population n’est utile'
      ],
      correct: 1,
      exp: 'La conformité concerne uniquement les quotas contrôlés : dans le contre-exemple, le revenu élevé passe de 20% dans la population à 100% dans l’échantillon.'
    },
    {
      stem: 'Pourquoi l’échantillonnage « de convenance » (interroger ses amis ou ses voisins de bureau) présente-t-il un risque méthodologique majeur ?',
      opts: [
        'Parce qu’il coûte trop cher à mettre en place',
        'Parce qu’il introduit des biais de sélection massifs d’homogénéité et de complaisance, interdisant toute généralisation scientifique des résultats',
        'Parce qu’il prend deux ans de plus à réaliser',
        'Parce que le logiciel Excel refuse d’ouvrir les fichiers de convenance'
      ],
      correct: 1,
      exp: 'L’échantillon de convenance n’est représentatif que du cercle immédiat de l’enquêteur, entraînant des biais d’autosélection qui invalident la portée générale de l’étude.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que la formule de Cochran ?',
      a: 'L’équation mathématique calculant la taille minimale d’échantillon : n0 = (z² · p(1-p)) / e² en fonction du niveau de confiance (z), de la variabilité (p) et de la marge d’erreur (e).'
    },
    {
      q: 'Quelle est la taille d’échantillon canonique à 95% de confiance et 5% d’erreur ?',
      a: 'n0 = 385 répondants (arrondi supérieur de 384.16 pour z=1.96 et p=0.5).'
    },
    {
      q: 'À quoi sert la correction pour population finie ?',
      a: 'À réduire la taille d’échantillon requise sans perte de précision lorsque la population totale N est connue et restreinte (formule FPC).'
    },
    {
      q: 'En quoi consiste l’échantillonnage stratifié proportionnel ?',
      a: 'À répartir la taille cible selon les parts de population ; ici les plus forts restes et l’ordre des strates départagent les arrondis, dans la limite des capacités.'
    },
    {
      q: 'Quel est le principe de la méthode des quotas ?',
      a: 'Reproduire des proportions cibles sur des critères choisis (sexe, âge, métier) ; cela ne garantit ni les autres caractéristiques ni l’absence de biais de sélection.'
    },
    {
      q: 'Qu’est-ce que le redressement d’échantillon par pondération ?',
      a: 'L’attribution de poids statistiques correcteurs aux répondants pour corriger les sous ou sur-représentations observées par rapport à la population réelle.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la formule de Cochran, les valeurs de z (1.96 à 95%), la correction de population finie et les quotas.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez l’échantillonnage stratifié proportionnel et les techniques de redressement.'
    },
    {
      cls: 'high',
      text: '8/8 : Parfait ! Vous maîtrisez la théorie et le calcul mathématique de l’échantillonnage représentatif en ingénierie.'
    }
  ]
};
