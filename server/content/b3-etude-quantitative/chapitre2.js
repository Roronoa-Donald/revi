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
  situation: 'Interroger la totalité des membres d’une population cible (recensement exhaustif) est matériellement impossible, financièrement prohibitif et temporellement intenable dans la quasi-totalité des projets d’ingénierie ou de recherche appliquée. L’échantillonnage consiste à sélectionner scientifiquement un sous-ensemble d’individus dont les caractéristiques et les réponses reflètent fidèlement celles de la population mère tout entière. Cependant, interroger 1 000 personnes choisies au hasard sur LinkedIn ne garantit en rien la représentativité si l’échantillon souffre de biais d’autosélection majeurs. L’ingénieur de Bachelor 3 doit maîtriser le dimensionnement statistique exact par la formule de Cochran, savoir appliquer la correction pour population finie, ventiler un tirage stratifié proportionnel et auditer la conformité d’un échantillonnage empirique par quotas.',
  objectives: [
    'distinguer rigoureusement les méthodes d’échantillonnage probabilistes (aléatoires) et non probabilistes (empiriques) ;',
    'dimensionner mathématiquement la taille minimale d’un échantillon représentatif via la formule de Cochran (scores z, marge d’erreur e, variabilité p) ;',
    'appliquer la correction de Cochran pour population finie afin d’optimiser les coûts de collecte sans dégrader la précision ;',
    'concevoir un plan d’échantillonnage stratifié proportionnel et calculer les effectifs à sonder par sous-groupe démographique ;',
    'mettre en œuvre la méthode des quotas et mesurer le biais d’échantillonnage par rapport aux distributions de référence ;',
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
        '<p>L’échantillonnage ne doit pas se contenter d’un volume brut : il doit reproduire la structure interne de la population selon les critères critiques :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Échantillonnage Stratifié Proportionnel</h4>',
        '    <p>Chaque sous-population $h$ (strate) de taille $N_h$ se voit allouer une part de l’échantillon proportionnelle à son poids réel $W_h = N_h / N$ :</p>',
        '    <p>$$n_h = n \\times \\frac{N_h}{N}$$</p>',
        '    <p>Garantit qu’aucune minorité significative n’est sous-représentée par simple hasard de tirage.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Méthode des Quotas &amp; Audit de Biais</h4>',
        '    <p>Dans les enquêtes sans base de sondage nominative, on fixe aux enquêteurs des quotas stricts (ex: 30% Juniors, 50% Confirmés, 20% Seniors).</p>',
        '    <p>L’audit de conformité compare la distribution observée $P_{obs}$ aux quotas cibles $P_{cible}$. Un écart maximal $|P_{obs} - P_{cible}| > 3\%$ signale un biais exigeant un redressement statistique par pondération.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Construction d’un Échantillon Représentatif',
  method: [
    '1. Définir la population mère N : Déterminer la taille totale exacte de l’univers de recherche (ou constater son caractère infini / non borné).',
    '2. Fixer le seuil de confiance et l’erreur tolérée : Retenir conventionnellement 95% de confiance (z = 1.96) et une marge d’erreur de 5% (e = 0.05).',
    '3. Calculer n0 par la formule de Cochran : Appliquer la formule de base avec p = 0.5 (variabilité maximale prudente).',
    '4. Appliquer la correction de population finie : Si N < 100 000, réajuster la taille d’échantillon requise via la formule FPC.',
    '5. Ventiler par strates ou quotas : Répartir les effectifs à interroger selon les proportions sociodémographiques ou organisationnelles connues.',
    '6. Contrôler le taux d’attrition prévu : Prévoir un volume d’envois supérieur (ex: avec un taux de réponse de 20%, envoyer 5 fois plus de questionnaires que la taille n visée).'
  ],
  summary: [
    'L’échantillonnage permet d’inférer les caractéristiques d’une population entière à partir de l’observation rigoureuse d’une fraction représentative.',
    'Les méthodes probabilistes reposent sur un tirage au sort où chaque unité a une probabilité connue et non nulle d’être sélectionnée.',
    'La formule de Cochran ($n_0 = z^2 \\cdot p(1-p) / e^2$) donne la taille requise en population infinie : à 95% et 5% d’erreur, $n_0 = 385$.',
    'La correction pour population finie réduit la taille requise lorsque la population totale $N$ est restreinte, sans perte de niveau de confiance.',
    'La méthode des quotas et la stratification assurent la représentativité sociologique ou métier en reproduisant la structure de la population mère.',
    'Tout écart entre la distribution observée et la structure théorique supérieur à 3-5% introduit un biais nécessitant un redressement par pondération.'
  ],
  checklist: [
    'Le choix entre échantillonnage probabiliste et non probabiliste est-il explicitement justifié au regard de la base de sondage disponible ?',
    'Le niveau de confiance (z) et la marge d’erreur maximale (e) sont-ils formellement déclarés ?',
    'La formule de Cochran a-t-elle été correctement appliquée avec p = 0.5 par défaut de prudence ?',
    'La correction pour population finie a-t-elle été mobilisée si la population totale N est connue et restreinte ?',
    'Les proportions de chaque strate ou catégorie de quota reflètent-elles fidèlement les données démographiques réelles ?',
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
    'Ignorer les strates clés (ex: n’interroger que des développeurs juniors et tirer des conclusions sur l’ensemble de la filière informatique).'
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
      exp: 'La variance d’une loi de Bernoulli p(1-p) atteint son maximum pour p = 0.5 (0.25). Choisir p = 0.5 garantit que l’échantillon sera suffisant quelle que soit la réalité observée.'
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
      stem: 'Dans un échantillonnage stratifié proportionnel au sein d’une entreprise de 1 000 personnes comptant 600 techniciens et 400 cadres, quelle sera la répartition pour un échantillon de 200 personnes ?',
      opts: [
        '100 techniciens et 100 cadres',
        '120 techniciens et 80 cadres',
        '180 techniciens et 20 cadres',
        '50 techniciens et 150 cadres'
      ],
      correct: 1,
      exp: 'Techniciens : 600/1000 = 60% -> 200 * 0.60 = 120. Cadres : 400/1000 = 40% -> 200 * 0.40 = 80.'
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
      stem: 'Lorsqu’un échantillon collecté par quotas présente un écart de 8% par rapport à la structure réelle de la population cible, quelle mesure corrective s’impose ?',
      opts: [
        'Supprimer immédiatement toutes les réponses et annuler le projet',
        'Procéder à un redressement de l’échantillon par pondération statistique pour rééquilibrer le poids de chaque catégorie',
        'Inventer de fausses réponses pour combler l’écart',
        'Ignorer totalement l’écart et publier les chiffres bruts'
      ],
      correct: 1,
      exp: 'Le redressement statistique consiste à attribuer un coefficient multiplicateur (poids) supérieur aux catégories sous-représentées pour rétablir l’équilibre démographique.'
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
      a: 'À diviser la population en groupes homogènes (strates) et à sonder chaque groupe proportionnellement à son effectif réel dans la population mère.'
    },
    {
      q: 'Quel est le principe de la méthode des quotas ?',
      a: 'Reconstituer un modèle réduit de la population mère selon des critères de contrôle (sexe, âge, métier) sans base de sondage nominative.'
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
