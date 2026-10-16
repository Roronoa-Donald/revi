/**
 * Chapitres 4 à 6 du cours de statistique descriptive B1 : dispersion,
 * représentations graphiques, corrélation et régression.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Mesures de dispersion',
    short: 'Dispersion',
    toc: 'Étendue, écart interquartile, variance, écart-type, coefficient de variation, formule de König.',
    time: '≈ 3 h de travail',

    situation:
      'Un fournisseur livre des pièces de 10 mm. Deux lots ont exactement la même longueur moyenne : ' +
      '10,00 mm. Le premier lot est inutilisable — les pièces vont de 8 à 12 mm et aucune ne rentre dans le ' +
      'logement. Le second est parfait. La moyenne n’a rien vu. Ce chapitre construit les nombres qui, eux, ' +
      'mesurent l’écart au centre.',

    objectives: [
      'calculer l’étendue et l’écart interquartile ;',
      'calculer une variance (division par N) et appliquer la formule de König ;',
      'calculer un écart-type et l’interpréter dans l’unité des données ;',
      'comparer deux séries par leur coefficient de variation.'
    ],

    sections: [
      {
        title: 'Étendue et écart interquartile',
        html: [
          '<p><strong>Définition.</strong> L’<strong>étendue</strong> est la différence entre la plus grande et ' +
          'la plus petite valeur :</p>',
          '<div class="math-block">$e = x_{\\\\max} - x_{\\\\min}$</div>',
          '<p>C’est la mesure de dispersion la plus simple, et la plus fragile : elle ne dépend que de deux ' +
          'valeurs. Une seule mesure aberrante suffit à la faire exploser.</p>',
          '<p><strong>Écart interquartile.</strong> Plus robuste, il mesure la largeur des 50 % centraux :</p>',
          '<div class="math-block">$EI = Q_3 - Q_1$</div>',
          '<p>Sur la série (2, 4, 4, 5, 7, 8, 9, 11, 12, 15) du chapitre 3 : ' +
          '<code>EI = 11,25 − 4 = 7,25</code>. La moitié centrale des valeurs tient dans un intervalle de ' +
          'largeur 7,25.</p>',
          box('pitfall', 'Piège — une étendue énorme pour un seul point', 'warning',
            '    <p>Si une seule valeur est aberrante (une saisie erronée, un capteur défaillant), l’étendue ' +
            'devient inutilisable alors que l’écart interquartile, lui, reste presque inchangé. C’est ' +
            'exactement pourquoi on préfère ce dernier pour détecter les valeurs suspectes.</p>')
        ].join('\n')
      },
      {
        title: 'La variance',
        html: [
          '<p><strong>Définition.</strong> La <strong>variance</strong> est la moyenne des carrés des écarts à ' +
          'la moyenne :</p>',
          '<div class="math-block">$V = \\\\frac{1}{N} \\\\sum_{i=1}^k n_i (x_i - \\\\bar{x})^2$</div>',
          '<p>On met les écarts au carré pour deux raisons : les écarts négatifs et positifs s’annulent sinon, ' +
          'et le carré donne plus de poids aux écarts importants.</p>',
          '<p><strong>Formule de König.</strong> Calculer chaque écart à la moyenne est long. La formule de ' +
          'König donne le même résultat en une seule passe :</p>',
          '<div class="math-block">$V = \\\\frac{1}{N} \\\\sum_{i=1}^k n_i x_i^2 - \\\\bar{x}^2 \\\\quad (\\\\text{Formule de König-Huygens})$</div>',
          box('mnemo', 'Mnémotechnique — « König : carrés d’abord, moyenne au carré ensuite »', 'pin',
            '    <p>Deux termes seulement : la <em>moyenne des carrés</em> moins le <em>carré de la moyenne</em>. ' +
            'Ne jamais oublier de retrancher le second : une variance fausse d’un facteur x̄² est l’erreur la ' +
            'plus fréquente sur cette formule.</p>'),
          box('tech', 'Les deux méthodes donnent le même nombre', 'terminal',
            '    <pre><code>notes  : 1, 2, 3, 4, 5   avec effectifs 2, 4, 6, 5, 3   (N = 20)\n' +
            'x̄ = 3,15        Σ n<sub>i</sub>x<sub>i</sub>² = 227\n' +
            '\n' +
            'König :  V = 227/20 − 3,15² = 11,35 − 9,9225 = 1,4275\n' +
            'Direct : V = Σ n<sub>i</sub>(x<sub>i</sub> − 3,15)² / 20 = 1,4275</code></pre>\n' +
            '    <p>Même résultat : König n’est qu’une réécriture algébrique, pas une approximation.</p>')
        ].join('\n')
      },
      {
        title: 'L’écart-type',
        html: [
          '<p><strong>Problème de la variance :</strong> elle s’exprime en <em>unités au carré</em>. Une ' +
          'variance de longueur est en mm², ce qui ne se compare à rien de concret.</p>',
          '<p><strong>Définition.</strong> L’<strong>écart-type</strong> est la racine carrée de la variance :</p>',
          '<div class="math-block">$\\\\sigma = \\\\sqrt{V}$</div>',
          '<p>Il s’exprime donc dans l’unité des données (mm, euros, points) et se lit comme un écart moyen ' +
          'à la moyenne. Reprenons l’exemple : <code>σ = √1,4275 ≈ 1,195</code>, soit environ 1,2 point ' +
          'd’écart à la moyenne de 3,15.</p>',
          '<p><strong>Interprétation par l’intervalle</strong> <code>[x̄ − σ ; x̄ + σ]</code> : pour une ' +
          'distribution en cloche, il contient environ deux tiers des valeurs. C’est un ordre de grandeur, ' +
          'pas une loi exacte pour toutes les séries.</p>',
          box('intuition', 'Pourquoi la racine carrée ?', 'compass',
            '    <p>Élever au carré sert à ne pas perdre le signe des écarts, mais cela change l’unité. La ' +
            'racine carrée rétablit l’unité d’origine : c’est tout le rôle de l’écart-type. Variance pour ' +
            'calculer, écart-type pour interpréter — retiens ce partage.</p>')
        ].join('\n')
      },
      {
        title: 'Le coefficient de variation',
        html: [
          '<p><strong>Définition.</strong> Le <strong>coefficient de variation</strong> compare l’écart-type à ' +
          'la moyenne :</p>',
          '<div class="math-block">$CV = \\\\frac{\\\\sigma}{\\\\bar{x}} \\\\times 100\,\%$</div>',
          '<p>C’est un nombre <strong>sans unité</strong>, ce qui permet de comparer deux séries d’unités ou ' +
          'de niveaux très différents :</p>',
          '<table>\n' +
          '    <tr><th>Série</th><th>Moyenne</th><th>Écart-type</th><th>CV</th><th>Lecture</th></tr>\n' +
          '    <tr><td>A</td><td>100 g</td><td>2 g</td><td>2 %</td><td>très homogène</td></tr>\n' +
          '    <tr><td>B</td><td>100 g</td><td>18 g</td><td>18 %</td><td>dispersion forte</td></tr>\n' +
          '    <tr><td>C</td><td>5 000 €</td><td>100 €</td><td>2 %</td><td>aussi homogène que A</td></tr>\n' +
          '  </table>',
          '<p>Les écarts-types de A et C ne sont pas comparables (2 g contre 100 €) ; leurs coefficients de ' +
          'variation, eux, le sont parfaitement.</p>',
          box('mnemo', 'Mnémotechnique — le seuil des 25 %', 'pin',
            '    <p>Ordre de grandeur utile : <strong>CV &gt; 25 %</strong> signale une dispersion forte, ' +
            '<strong>CV &lt; 10 %</strong> une série très homogène. Ce seuil n’est pas une loi, mais il suffit ' +
            'à qualifier un résultat en examen.</p>'),
          box('pitfall', 'Piège — CV avec une moyenne proche de zéro', 'warning',
            '    <p>Le coefficient de variation divise par la moyenne : si x̄ est proche de 0 (ou négatif pour ' +
            'une série centrée), le CV devient énorme ou n’a plus de sens. Dans ce cas, on commente l’écart-type ' +
            'seul.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Comment calcule-t-on l’étendue ?', opts: ['x<sub>max</sub> + x<sub>min</sub>', 'x<sub>max</sub> − x<sub>min</sub>', 'Q3 − Q1'], correct: 1, exp: 'C’est la différence entre la plus grande et la plus petite valeur.' },
      { stem: 'Que vaut l’écart interquartile ?', opts: ['Q3 − Q1', 'Q3 + Q1', 'la médiane'], correct: 0, exp: 'EI = Q3 − Q1 : largeur des 50 % centraux.' },
      { stem: 'La variance est la moyenne…', opts: ['des écarts à la moyenne', 'des carrés des écarts à la moyenne', 'des valeurs au carré'], correct: 1, exp: 'Chaque écart est mis au carré avant d’être moyenné.' },
      { stem: 'Formule de König ?', opts: ['V = Σ n<sub>i</sub>x<sub>i</sub>²/N − x̄²', 'V = x̄² − Σ n<sub>i</sub>x<sub>i</sub>²/N', 'V = (x̄)²'], correct: 0, exp: 'Moyenne des carrés moins carré de la moyenne.' },
      { stem: 'Comment obtient-on l’écart-type ?', opts: ['V²', '√V', 'V/N'], correct: 1, exp: 'σ = √V : la racine rétablit l’unité des données.' },
      { stem: 'À quoi sert le coefficient de variation ?', opts: ['À comparer des séries d’unités différentes', 'À calculer la moyenne', 'À trouver le mode'], correct: 0, exp: 'Il est sans unité : c’est l’outil de comparaison des dispersions.' }
    ],

    pitfalls: [
      '<strong>Oublier le second terme de König</strong> : annoncer Σ n<sub>i</sub>x<sub>i</sub>²/N comme la variance.',
      '<strong>Écarts non élevés au carré</strong> : la somme des écarts vaut toujours zéro.',
      '<strong>Unité de la variance</strong> : exprimer une variance en mm au lieu de mm².',
      '<strong>CV avec une moyenne quasi nulle</strong> : le coefficient devient inexploitable.',
      '<strong>Comparer deux écarts-types d’unités différentes</strong> au lieu des coefficients de variation.'
    ],

    methodTitle: 'Mesurer la dispersion pas à pas',
    method: [
      '<strong>Calculer d’abord la moyenne</strong> x̄ : tout le reste en dépend.',
      '<strong>Étendue et EI</strong> pour une première idée, robuste pour l’écart interquartile.',
      '<strong>Variance</strong> par König quand un tableau d’effectifs est fourni (une seule passe).',
      '<strong>Écart-type</strong> σ = √V pour revenir à l’unité des données.',
      '<strong>Comparer</strong> les séries par leur CV, et commenter la dispersion en mots.'
    ],

    summary: [
      'Étendue e = x<sub>max</sub> − x<sub>min</sub> : simple mais sensible aux valeurs extrêmes.',
      'Écart interquartile EI = Q3 − Q1 : largeur des 50 % centraux, robuste.',
      'Variance V = Σ n<sub>i</sub>(x<sub>i</sub> − x̄)²/N, ou par König V = Σ n<sub>i</sub>x<sub>i</sub>²/N − x̄².',
      'Écart-type σ = √V : dispersion dans l’unité des données.',
      'Coefficient de variation CV = σ/x̄ : sans unité, donc comparable entre séries.'
    ],

    checklist: [
      'Je calcule une variance par les deux méthodes et je retrouve le même nombre.',
      'Je passe sans hésiter de la variance à l’écart-type.',
      'Je compare deux séries par leur coefficient de variation.',
      'Je reconnais une dispersion forte (CV &gt; 25 %) et je le dis.'
    ],

    notions: ['étendue', 'écart interquartile', 'variance', 'formule de König', 'écart-type', 'coefficient de variation', 'valeur aberrante', 'homogénéité'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends le calcul de la moyenne du chapitre 3 avant la variance.' },
      { cls: 'mid', text: '50–69 % — Refais les exercices de niveau 3 de l’atelier du chapitre 4.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible la formule de König et l’unité de la variance.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, les représentations graphiques.' }
    ],

    flashcards: [
      { q: 'Quelle est la différence entre variance et écart-type ?', a: 'σ = √V : l’écart-type s’exprime dans l’unité des données, la variance en unités au carré.' },
      { q: 'Énonce la formule de König.', a: '<code>V = (1/N)Σ n<sub>i</sub>x<sub>i</sub>² − x̄²</code>.' },
      { q: 'Que vaut l’écart interquartile et à quoi sert-il ?', a: '<code>EI = Q3 − Q1</code> : largeur des 50 % centraux, insensible aux valeurs extrêmes.' },
      { q: 'Quel seuil de CV signale une dispersion forte ?', a: 'Un ordre de grandeur : CV &gt; 25 %.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Représentations graphiques',
    short: 'Graphiques',
    toc: 'Diagrammes en bâtons, circulaires, histogramme, densité et boîte à moustaches.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Un graphique bien choisi fait comprendre en deux secondes ce qu’un tableau met deux minutes à dire. ' +
      'Un graphique mal choisi fait croire le contraire de la vérité : un histogramme à classes inégales ' +
      'lu comme un diagramme en bâtons surestime les classes larges. Choisir la bonne représentation fait ' +
      'partie du travail statistique.',

    objectives: [
      'choisir la représentation adaptée au type du caractère ;',
      'construire un diagramme en bâtons, en barres ou circulaire ;',
      'construire un histogramme et calculer une densité quand les amplitudes diffèrent ;',
      'lire et dessiner une boîte à moustaches.'
    ],

    sections: [
      {
        title: 'Diagrammes en bâtons et en barres',
        html: [
          '<p>Pour un caractère <strong>qualitatif</strong> ou <strong>quantitatif discret</strong>, chaque ' +
          'modalité reçoit une barre dont la <strong>hauteur est proportionnelle à l’effectif</strong> (ou à la ' +
          'fréquence).</p>',
          '<ul>\n' +
          '    <li><strong>Diagramme en bâtons</strong> : barres fines, séparées, souvent pour des valeurs ' +
          'numériques discrètes.</li>\n' +
          '    <li><strong>Diagramme en barres</strong> : barres plus larges, fréquemment horizontales, ' +
          'pratique quand les libellés sont longs (noms de filières, de villes).</li>\n' +
          '  </ul>',
          '<p>Les deux règles non négociables : <strong>une échelle commence à zéro</strong>, et les barres ' +
          'ont la <strong>même largeur</strong>. Tronquer l’axe vertical est la façon la plus courante de ' +
          'manipuler un graphique.</p>',
          box('pitfall', 'Piège — l’axe tronqué', 'warning',
          '    <p>Une barre de 51 % dessinée deux fois plus haute qu’une barre de 49 % parce que l’axe démarre ' +
          'à 45 % induit le lecteur en erreur : visuellement, l’écart paraît énorme. Sur un graphique en ' +
          'barres, l’axe de la grandeur mesurée commence toujours à zéro.</p>')
        ].join('\n')
      },
      {
        title: 'Le diagramme circulaire',
        html: [
          '<p>Le <strong>diagramme circulaire</strong> (camembert, secteurs) représente des <em>parts d’un ' +
          'tout</em>. Chaque modalité reçoit un secteur dont l’angle est proportionnel à la fréquence :</p>',
          '<pre><code>angle (en degrés) = fréquence × 360</code></pre>',
          '<p>Un effectif n<sub>i</sub> sur N donne donc un angle de <code>360 × n<sub>i</sub>/N</code> degrés.</p>',
          '<p><strong>Quand l’utiliser ?</strong> Uniquement si la somme des modalités forme bien un tout ' +
          '(100 %), et si le nombre de secteurs reste petit — au-delà de six, le graphique devient ' +
          'illisible et un diagramme en barres est préférable.</p>',
          box('intuition', 'Un camembert pour comparer des parts, pas des valeurs', 'compass',
            '    <p>Le camembert répond à « quelle part du total ? ». Il ne permet pas de lire des évolutions ' +
            'ni de comparer deux répartitions proches : deux secteurs de 24° et 27° se distinguent à peine à ' +
            'l’œil. Pour comparer, reviens au tableau ou aux barres.</p>')
        ].join('\n')
      },
      {
        title: 'L’histogramme',
        html: [
          '<p>Pour un caractère <strong>continu regroupé en classes</strong>, on utilise un ' +
          '<strong>histogramme</strong> : des rectangles accolés, un par classe.</p>',
          '<p><strong>Classes de même amplitude</strong> : la hauteur du rectangle est proportionnelle à ' +
          'l’effectif. C’est le cas simple.</p>',
          '<p><strong>Classes d’amplitudes différentes</strong> : la hauteur doit alors représenter la ' +
          '<strong>densité</strong>, sinon les classes larges paraissent trop peuplées :</p>',
          '<pre><code>densité de la classe i = n<sub>i</sub> / amplitude<sub>i</sub></code></pre>',
          box('mnemo', 'Mnémotechnique — « aires égales, effectifs égaux »', 'pin',
          '    <p>Dans un histogramme, c’est <strong>l’aire</strong> du rectangle qui représente l’effectif, ' +
          'pas sa hauteur. Retenir « aires égales, effectifs égaux » évite l’erreur classique d’un ' +
          'histogramme à classes inégales lu comme un diagramme en bâtons.</p>'),
          box('tech', 'Construire un histogramme', 'terminal',
          '    <pre><code>mini, maxi, k = min(serie), max(serie), 5\n' +
          'largeur = (maxi - mini) / k\n' +
          '\n' +
          'bornes = [(mini + i * largeur, mini + (i + 1) * largeur) for i in range(k)]\n' +
          'effectifs = [sum(1 for x in serie if b[0] &lt;= x &lt; b[1]) for b in bornes]</code></pre>\n' +
          '    <p>La borne inférieure est incluse, la borne supérieure exclue : c’est la même convention ' +
          'que celle du chapitre 1, et c’est elle qui garantit que chaque valeur est comptée une seule fois.</p>')
        ].join('\n')
      },
      {
        title: 'La boîte à moustaches',
        html: [
          '<p>La <strong>boîte à moustaches</strong> (diagramme de Tukey) résume une série en ' +
          '<strong>cinq valeurs</strong> :</p>',
          '<pre><code>moustache gauche : x<sub>min</sub>\n' +
          'boîte            : Q1 —— médiane —— Q3\n' +
          'moustache droite : x<sub>max</sub></code></pre>',
          '<p>Elle se lit d’un coup d’œil : la largeur de la boîte donne la dispersion des 50 % centraux, la ' +
          'position de la médiane dans la boîte indique la dissymétrie.</p>',
          '<ul>\n' +
          '    <li>médiane au <strong>centre</strong> de la boîte → distribution à peu près symétrique ;</li>\n' +
          '    <li>médiane <strong>près de Q1</strong> → étalement vers les valeurs hautes (dissymétrie à droite) ;</li>\n' +
          '    <li>une moustache <strong>beaucoup plus longue</strong> que l’autre → queue de distribution de ce côté.</li>\n' +
          '  </ul>',
          '<p><strong>Détection des valeurs aberrantes.</strong> On appelle valeur aberrante toute valeur hors ' +
          'de l’intervalle :</p>',
          '<pre><code>[Q1 − 1,5 × EI ; Q3 + 1,5 × EI]</code></pre>',
          box('standard', 'Méthode de calcul des cinq nombres de Tukey', 'calculator',
            '    <div class="box--formula"><div class="formula-label">Résumé à 5 nombres &amp; Barrières de Tukey</div><div class="math-block">$$\\text{Min} = x_{(1)}, \\quad Q_1 = x_{\\left(\\frac{n+1}{4}\\right)}, \\quad \\text{Med} = x_{\\left(\\frac{n+1}{2}\\right)}, \\quad Q_3 = x_{\\left(\\frac{3(n+1)}{4}\\right)}, \\quad \\text{Max} = x_{(n)}$$</div></div>\n' +
            '    <p>L’écart interquartile vaut $EI = Q_3 - Q_1$. Toute valeur située en dehors des barrières $[Q_1 - 1{,}5 \\cdot EI \\;;\\; Q_3 + 1{,}5 \\cdot EI]$ est qualifiée de valeur atypique (outlier).</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel graphique pour un caractère qualitatif ?', opts: ['Un histogramme', 'Un diagramme en barres ou circulaire', 'Une boîte à moustaches'], correct: 1, exp: 'Un caractère qualitatif se représente par des barres ou des secteurs.' },
      { stem: 'Sur un diagramme en barres, l’axe de la grandeur mesurée…', opts: ['peut être tronqué', 'commence toujours à zéro', 'est toujours logarithmique'], correct: 1, exp: 'Tronquer l’axe exagère visuellement les écarts.' },
      { stem: 'Quelle est la règle d’un diagramme circulaire ?', opts: ['angle = fréquence × 360', 'angle = effectif', 'angle = 90 × fréquence'], correct: 0, exp: 'Un tour complet est 360°, réparti selon les fréquences.' },
      { stem: 'Dans un histogramme à classes inégales, la hauteur représente…', opts: ['l’effectif', 'la densité n<sub>i</sub>/amplitude', 'la fréquence cumulée'], correct: 1, exp: 'Ce sont les aires qui sont proportionnelles aux effectifs.' },
      { stem: 'Quelles sont les cinq valeurs d’une boîte à moustaches ?', opts: ['min, Q1, médiane, Q3, max', 'min, moyenne, max, σ, V', 'Q1, Q2, Q3, EI, CV'], correct: 0, exp: 'Deux moustaches et une boîte délimitée par les quartiles.' },
      { stem: 'Une médiane située près de Q1 dans la boîte indique…', opts: ['une distribution symétrique', 'un étalement vers les valeurs hautes', 'une erreur de calcul'], correct: 1, exp: 'La masse des valeurs est basse, la queue s’étend vers le haut.' }
    ],

    pitfalls: [
      '<strong>Axe tronqué</strong> sur un diagramme en barres : les écarts paraissent plus grands qu’ils ne sont.',
      '<strong>Histogramme à classes inégales sans densité</strong> : les classes larges paraissent surpeuplées.',
      '<strong>Camembert à huit secteurs</strong> : illisible ; préférer des barres.',
      '<strong>Barres de largeurs différentes</strong> : la comparaison des hauteurs devient fausse.',
      '<strong>Moustaches confondues avec les quartiles</strong> : les moustaches vont jusqu’au minimum et au maximum.'
    ],

    methodTitle: 'Choisir et construire la bonne représentation',
    method: [
      '<strong>Identifier le type du caractère</strong> : qualitatif, discret, ou continu regroupé en classes.',
      '<strong>Choisir</strong> : barres ou secteurs pour le qualitatif, histogramme pour le continu, boîte à moustaches pour résumer.',
      '<strong>Calculer</strong> les hauteurs (effectifs) ou les densités si les amplitudes diffèrent.',
      '<strong>Vérifier les conventions</strong> : axe à zéro, barres de même largeur, classes avec bornes cohérentes.',
      '<strong>Annoter</strong> le graphique : titre, unités, effectif total — un graphique sans unité n’est pas exploitable.'
    ],

    summary: [
      'Barres et bâtons : hauteur proportionnelle à l’effectif, axe démarrant à zéro, barres de même largeur.',
      'Diagramme circulaire : parts d’un tout, angle = fréquence × 360, à réserver aux petites répartitions.',
      'Histogramme : caractère continu en classes ; les aires sont proportionnelles aux effectifs.',
      'Amplitudes inégales : porter en hauteur la densité n<sub>i</sub>/amplitude<sub>i</sub>.',
      'Boîte à moustaches : min, Q1, médiane, Q3, max — et valeurs aberrantes hors de [Q1 − 1,5·EI ; Q3 + 1,5·EI].'
    ],

    checklist: [
      'Je choisis la représentation adaptée au type du caractère.',
      'Je construis un histogramme à classes égales ou inégales correctement.',
      'Je calcule les cinq valeurs d’une boîte à moustaches.',
      'Je vérifie les conventions : axes, largeurs, unités.'
    ],

    notions: ['diagramme en bâtons', 'diagramme en barres', 'diagramme circulaire', 'histogramme', 'densité', 'amplitude de classe', 'boîte à moustaches', 'valeur aberrante'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends les conventions de la section 1 (axe à zéro, largeurs égales).' },
      { cls: 'mid', text: '50–69 % — Refais les exercices de niveau 2 de l’atelier du chapitre 5.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible la densité et les cinq valeurs.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, corrélation et régression.' }
    ],

    flashcards: [
      { q: 'Quand utilise-t-on un diagramme circulaire ?', a: 'Pour des parts d’un tout (100 %), avec peu de secteurs : angle = fréquence × 360.' },
      { q: 'Que représente la hauteur dans un histogramme ?', a: 'L’effectif si les classes ont même amplitude ; sinon la densité n<sub>i</sub>/amplitude.' },
      { q: 'Les cinq valeurs d’une boîte à moustaches ?', a: 'Minimum, Q1, médiane, Q3, maximum.' },
      { q: 'Comment repère-t-on une valeur aberrante ?', a: 'Elle sort de l’intervalle [Q1 − 1,5·EI ; Q3 + 1,5·EI].' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Corrélation et régression',
    short: 'Corrélation et régression',
    toc: 'Série à deux caractères, point moyen, covariance, coefficient de corrélation, droite des moindres carrés.',
    time: '≈ 3 h 30 de travail',

    situation:
      'Un magasin relève, chaque jour, sa dépense publicitaire et son chiffre d’affaires. Les deux nombres ' +
      'ont-ils un lien, et si oui, peut-on prévoir le second à partir du premier ? Décrire une seule ' +
      'variable ne suffit plus : il faut étudier deux caractères <em>ensemble</em>, mesurer leur liaison et ' +
      'en tirer une droite de prévision.',

    objectives: [
      'organiser une série à deux caractères et placer un nuage de points ;',
      'calculer le point moyen et la covariance ;',
      'calculer et interpréter un coefficient de corrélation linéaire ;',
      'déterminer la droite des moindres carrés et l’utiliser pour prévoir.'
    ],

    sections: [
      {
        title: 'Série à deux caractères et point moyen',
        html: [
          '<p>Quand deux caractères sont relevés sur les mêmes individus, on obtient une série ' +
          '<strong>double</strong> : un couple (x, y) par individu. On la représente par un ' +
          '<strong>nuage de points</strong> dans le plan.</p>',
          '<p><strong>Point moyen.</strong> Le couple formé des deux moyennes :</p>',
          '<div class="math-block">$G(\\\\bar{x}, \\\\bar{y}) \\\\quad \\\\text{avec } \\\\bar{x} = \\\\frac{1}{n} \\\\sum x_i, \\\\quad \\\\bar{y} = \\\\frac{1}{n} \\\\sum y_i$</div>',
          '<p>C’est le centre de gravité du nuage. Toutes les quantités du chapitre se calculent par rapport ' +
          'à lui : c’est la référence de la liaison.</p>',
          box('intuition', 'Lire un nuage de points', 'compass',
            '    <p>Trois formes suffisent : nuage allongé du bas-gauche vers le haut-droite → liaison positive ; ' +
            'allongé du haut-gauche vers le bas-droite → liaison négative ; nuage en « rond » ou en courbe ' +
            'sans direction claire → pas de liaison linéaire. Le coefficient r du chapitre ne fait que ' +
            'chiffrer ce que l’œil voit.</p>')
        ].join('\n')
      },
      {
        title: 'La covariance',
        html: [
          '<p><strong>Définition.</strong> La <strong>covariance</strong> mesure comment deux caractères ' +
          'varient ensemble :</p>',
          '<div class="math-block">$\\\\operatorname{cov}(X, Y) = \\\\frac{1}{n} \\\\sum_{i=1}^n (x_i - \\\\bar{x})(y_i - \\\\bar{y})$</div>',
          '<p>Chaque individu contribue par le produit de ses deux écarts à la moyenne :</p>',
          '<ul>\n' +
          '    <li>si x et y sont tous deux au-dessus (ou tous deux en dessous) de leur moyenne, le produit est ' +
          '<strong>positif</strong> → covariance positive ;</li>\n' +
          '    <li>si l’un est au-dessus et l’autre en dessous, le produit est <strong>négatif</strong> → ' +
          'covariance négative ;</li>\n' +
          '    <li>si les contributions positives et négatives s’équilibrent, la covariance est ' +
          '<strong>proche de zéro</strong>.</li>\n' +
          '  </ul>',
          '<p><strong>Formule de calcul rapide</strong> (même principe que König) :</p>',
          '<div class="math-block">$\\\\operatorname{cov}(X, Y) = \\\\frac{1}{n} \\\\sum_{i=1}^n x_i y_i - \\\\bar{x} \\\\bar{y}$</div>',
          box('pitfall', 'Piège — la covariance dépend des unités', 'warning',
            '    <p>Une covariance de 0,2 ou de 2 000 ne dit rien en soi : elle change si l’on passe des ' +
            'centimètres aux mètres. Impossible donc de comparer deux covariances d’unités différentes — ' +
            'd’où l’utilité du coefficient de corrélation, qui n’a pas d’unité.</p>')
        ].join('\n')
      },
      {
        title: 'Le coefficient de corrélation linéaire',
        html: [
          '<p><strong>Définition.</strong> Le <strong>coefficient de corrélation linéaire</strong> de Pearson ' +
          'est la covariance divisée par le produit des deux écarts-types :</p>',
          '<div class="math-block">$r = \\\\frac{\\\\operatorname{cov}(X, Y)}{\\\\sigma_x \\\\sigma_y} \\\\quad (-1 \\\\le r \\\\le 1)$</div>',
          '<p>Ce nombre est <strong>toujours entre −1 et 1</strong>. C’est son principal intérêt avec ' +
          'l’absence d’unité :</p>',
          '<table>\n' +
          '    <tr><th>Valeur de r</th><th>Lecture</th></tr>\n' +
          '    <tr><td>r = 1</td><td>alignement parfait, croissant</td></tr>\n' +
          '    <tr><td>0,8 ≤ r &lt; 1</td><td>liaison linéaire forte et positive</td></tr>\n' +
          '    <tr><td>0,4 ≤ r &lt; 0,8</td><td>liaison moyenne</td></tr>\n' +
          '    <tr><td>r proche de 0</td><td>pas de liaison linéaire</td></tr>\n' +
          '    <tr><td>r = −1</td><td>alignement parfait, décroissant</td></tr>\n' +
          '  </table>',
          box('pitfall', 'Piège — corrélation n’est pas causalité', 'warning',
            '    <p>Deux caractères très corrélés ne s’influencent pas forcément : ils peuvent dépendre tous ' +
            'les deux d’un troisième facteur. Les ventes de crème glacée et les noyades augmentent ensemble — ' +
            'la cause commune est la saison. Un coefficient de corrélation ne démontre <em>jamais</em> une ' +
            'relation de cause à effet.</p>'),
          box('pitfall', 'Piège — r proche de 0 ne veut pas dire « pas de lien »', 'warning',
            '    <p>r ne mesure que la liaison <strong>linéaire</strong>. Si y = x² sur des x symétriques ' +
            'autour de 0, la liaison est parfaite et pourtant r ≈ 0. Il faut toujours regarder le nuage ' +
            'avant de conclure quoi que ce soit.</p>')
        ].join('\n')
      },
      {
        title: 'La droite des moindres carrés',
        html: [
          '<p>Quand la liaison est suffisamment forte, on ajuste une droite <code>y = a·x + b</code> qui ' +
          '« passe au plus près » du nuage : c’est la <strong>droite des moindres carrés</strong>, celle qui ' +
          'minimise la somme des carrés des écarts verticaux.</p>',
          '<pre><code>a = cov(x, y) / V(x)          (pente, ou coefficient directeur)\n' +
          'b = ȳ − a · x̄                  (ordonnée à l’origine)</code></pre>',
          '<p><strong>Propriété de contrôle</strong> : la droite passe toujours par le point moyen ' +
          '<code>G = (x̄ ; ȳ)</code>. Si ce n’est pas le cas, il y a une erreur de calcul.</p>',
          '<p><strong>Prévision.</strong> Une fois a et b connus, on remplace x par une valeur donnée pour ' +
          'estimer y. Deux réserves à toujours énoncer : la prévision n’est légitime que <em>dans</em> la ' +
          'plage des x observés, et elle suppose que la liaison reste la même.</p>',
          box('tech', 'Exemple complet', 'terminal',
            '    <pre><code>x̄ = 5    ȳ = 20    cov(x, y) = 6,4    V(x) = 16\n' +
            '\n' +
            'a = 6,4 / 16 = 0,4\n' +
            'b = 20 − 0,4 × 5 = 18\n' +
            '\n' +
            'y = 0,4·x + 18        vérification : 0,4 × 5 + 18 = 20 = ȳ</code></pre>\n' +
            '    <p>Pour x = 10 : <code>y ≈ 22</code>. Comme 10 reste dans la plage observée, la prévision ' +
            'est légitime ; pour x = 1 000, elle ne le serait pas.</p>'),
          box('mnemo', 'Mnémotechnique — « a d’abord, b ensuite »', 'pin',
            '    <p>On calcule <em>toujours</em> la pente en premier : <code>a = cov(x,y)/V(x)</code>. Puis ' +
            'l’ordonnée à l’origine <code>b = ȳ − a·x̄</code>. L’inverse est impossible — b dépend de a.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel est le point moyen d’une série double ?', opts: ['(0 ; 0)', '(x̄ ; ȳ)', '(x<sub>max</sub> ; y<sub>max</sub>)'], correct: 1, exp: 'C’est le centre de gravité du nuage : les deux moyennes.' },
      { stem: 'Une covariance positive signifie…', opts: ['que x et y varient dans le même sens', 'que x et y varient en sens inverse', 'qu’il n’y a pas de liaison'], correct: 0, exp: 'Les contributions positives dominent : les deux caractères augmentent ensemble.' },
      { stem: 'Entre quelles valeurs le coefficient de corrélation r varie-t-il ?', opts: ['0 et 1', '−1 et 1', '−∞ et +∞'], correct: 1, exp: 'C’est un nombre sans unité borné par −1 et 1.' },
      { stem: 'r = 0,05 pour une série où y = x². Conclusion ?', opts: ['Aucune liaison', 'Pas de liaison linéaire, mais une liaison existe', 'Erreur de calcul'], correct: 1, exp: 'r ne mesure que la liaison linéaire : il faut regarder le nuage.' },
      { stem: 'Comment calcule-t-on la pente a de la droite des moindres carrés ?', opts: ['a = cov(x, y)/V(x)', 'a = ȳ/x̄', 'a = V(x)/cov(x, y)'], correct: 0, exp: 'a = cov(x,y)/V(x), puis b = ȳ − a·x̄.' },
      { stem: 'La droite des moindres carrés passe par…', opts: ['l’origine', 'le point moyen (x̄ ; ȳ)', 'le premier point du nuage'], correct: 1, exp: 'Propriété de contrôle : ȳ = a·x̄ + b.' }
    ],

    pitfalls: [
      '<strong>Confondre covariance et coefficient de corrélation</strong> : le second seul est borné et sans unité.',
      '<strong>Interpréter une corrélation comme une causalité</strong> : c’est un abus de langage grave.',
      '<strong>Conclure « pas de liaison » avec r ≈ 0</strong> sans regarder le nuage : la liaison peut être non linéaire.',
      '<strong>Ordre de calcul inversé</strong> : calculer b avant a.',
      '<strong>Extrapoler hors de la plage observée</strong> en présentant la prévision comme fiable.'
    ],

    methodTitle: 'Étudier une série double',
    method: [
      '<strong>Calculer les deux moyennes</strong> x̄ et ȳ : c’est le point moyen G.',
      '<strong>Calculer la covariance</strong> cov(x, y) = Σ x<sub>i</sub>y<sub>i</sub>/n − x̄·ȳ.',
      '<strong>Calculer les deux écarts-types</strong> σ<sub>x</sub> et σ<sub>y</sub>, puis r = cov/(σ<sub>x</sub>σ<sub>y</sub>).',
      '<strong>Si la liaison est suffisante</strong>, ajuster : a = cov/V(x), b = ȳ − a·x̄.',
      '<strong>Contrôler et commenter</strong> : la droite passe par G, et la prévision reste dans la plage observée.'
    ],

    summary: [
      'Série double : un couple (x, y) par individu ; nuage de points et point moyen G = (x̄ ; ȳ).',
      'cov(x, y) = Σ (x<sub>i</sub> − x̄)(y<sub>i</sub> − ȳ)/n = Σ x<sub>i</sub>y<sub>i</sub>/n − x̄·ȳ.',
      'r = cov(x, y)/(σ<sub>x</sub>σ<sub>y</sub>), toujours dans [−1 ; 1] : il chiffre la liaison linéaire.',
      'Droite des moindres carrés : a = cov(x, y)/V(x), b = ȳ − a·x̄ ; elle passe par le point moyen.',
      'Corrélation n’est pas causalité, et r ≈ 0 ne prouve pas l’absence de toute liaison.'
    ],

    checklist: [
      'Je place un nuage de points et je repère le point moyen.',
      'Je calcule une covariance avec la formule rapide.',
      'Je calcule et j’interprète un coefficient de corrélation.',
      'Je détermine une droite de régression et je vérifie qu’elle passe par G.'
    ],

    notions: ['série double', 'nuage de points', 'point moyen', 'covariance', 'coefficient de corrélation', 'droite des moindres carrés', 'prévision', 'corrélation et causalité'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends le calcul de la variance du chapitre 4 avant la régression.' },
      { cls: 'mid', text: '50–69 % — Refais les exercices de niveau 4 de l’atelier du chapitre 6.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible l’interprétation de r et l’ordre a puis b.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise du cours : revois les examens blancs et le projet intégrateur.' }
    ],

    flashcards: [
      { q: 'Formule rapide de la covariance ?', a: '<code>cov(x, y) = (1/n)Σ x<sub>i</sub>y<sub>i</sub> − x̄·ȳ</code>.' },
      { q: 'Comment calcule-t-on r ?', a: '<code>r = cov(x, y)/(σ<sub>x</sub>·σ<sub>y</sub>)</code>, toujours entre −1 et 1.' },
      { q: 'Formules de la droite des moindres carrés ?', a: '<code>a = cov(x, y)/V(x)</code> puis <code>b = ȳ − a·x̄</code>.' },
      { q: 'Que contrôle-t-on après avoir trouvé la droite ?', a: 'Qu’elle passe par le point moyen : <code>ȳ = a·x̄ + b</code>.' }
    ]
  }
];
