/**
 * Chapitres 1 à 3 du cours de statistique descriptive B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Vocabulaire et séries statistiques',
    short: 'Vocabulaire',
    toc: 'Population, individus, caractère, modalités, type de caractère, série brute et classes.',
    time: '≈ 2 h 30 de travail',
    free: true,

    situation:
      'Le responsable pédagogique te remet la liste des notes obtenues par une promotion à un test : ' +
      'quarante-deux nombres, dans le désordre. Ce n’est pas encore une information, c’est une série brute. ' +
      'Avant de calculer quoi que ce soit, il faut nommer précisément ce qu’on observe — qui, quoi, combien ' +
      'de valeurs — sinon les résultats seront justes mais la conclusion fausse.',

    objectives: [
      'employer le vocabulaire exact : population, individu, caractère, modalité, effectif ;',
      'classer un caractère en qualitatif, quantitatif discret ou quantitatif continu ;',
      'passer d’une série brute à une série ordonnée et compter ses valeurs distinctes ;',
      'regrouper une série continue en classes de même amplitude.'
    ],

    sections: [
      {
        title: 'Population, individus et caractère',
        html: [
          '<p><strong>Définition.</strong> La <strong>population</strong> est l’ensemble des éléments que l’on ' +
          'étudie. Chacun de ces éléments s’appelle un <strong>individu</strong> (une personne, mais aussi bien ' +
          'une pièce, un jour, un site web).</p>',
          '<p>Le <strong>caractère</strong> (ou variable statistique) est ce que l’on observe sur chaque ' +
          'individu. Chaque valeur possible du caractère s’appelle une <strong>modalité</strong>.</p>',
          '<table>\n' +
          '    <tr><th>Terme</th><th>Exemple : test de recrutement</th></tr>\n' +
          '    <tr><td>Population</td><td>les 42 candidats de la promotion</td></tr>\n' +
          '    <tr><td>Individu</td><td>un candidat</td></tr>\n' +
          '    <tr><td>Caractère</td><td>la note obtenue au test</td></tr>\n' +
          '    <tr><td>Modalités</td><td>les notes possibles, de 0 à 20</td></tr>\n' +
          '  </table>',
          '<p>Lorsqu’on ne peut pas interroger toute la population, on travaille sur un ' +
          '<strong>échantillon</strong> : une partie seulement des individus. Les outils du cours s’appliquent ' +
          'de la même façon, mais la conclusion ne porte alors que sur l’échantillon observé.</p>',
          box('pitfall', 'Piège — population et échantillon ne se confondent pas', 'warning',
            '    <p>« Les 200 clients du magasin » et « les 30 clients interrogés » ne sont pas la même ' +
            'population d’étude. Toujours préciser sur quoi porte le résultat : sur les 30 personnes ou sur ' +
            'l’ensemble des clients ? Un énoncé qui ne le dit pas est incomplet.</p>')
        ].join('\n')
      },
      {
        title: 'Les trois types de caractères',
        html: [
          '<p>Le type du caractère décide de tout ce qu’on pourra calculer ensuite. On distingue :</p>',
          '<ul>\n' +
          '    <li><strong>qualitatif</strong> : les modalités ne sont pas des nombres (la couleur des yeux, la ' +
          'filière suivie). On peut seulement compter les effectifs ;</li>\n' +
          '    <li><strong>quantitatif discret</strong> : les modalités sont des nombres isolés, souvent des ' +
          'entiers (le nombre d’enfants, une note sur 5) ;</li>\n' +
          '    <li><strong>quantitatif continu</strong> : la valeur peut prendre n’importe quel nombre réel dans ' +
          'un intervalle (une taille en centimètres, un temps en secondes). On regroupe alors les valeurs en ' +
          'classes.</li>\n' +
          '  </ul>',
          box('mnemo', 'Mnémotechnique — « Qualitatif : on compte ; Quantitatif : on calcule »', 'pin',
            '    <p>Un caractère <strong>qualitatif</strong> ne permet que de <em>compter</em> des individus par ' +
            'modalité. Un caractère <strong>quantitatif</strong> permet en plus de <em>calculer</em> : moyenne, ' +
            'écart-type. Si vous te demandes s’il faut une moyenne, la réponse vous indique le type.</p>'),
          box('intuition', 'Attention aux nombres qui n’en sont pas', 'compass',
            '    <p>Un numéro de téléphone, un code postal ou un numéro d’étudiant s’écrivent avec des chiffres ' +
            'mais restent <strong>qualitatifs</strong> : additionner deux codes postaux n’a aucun sens. Le type ' +
            'd’un caractère se décide sur les opérations qui ont un sens, pas sur l’écriture.</p>')
        ].join('\n')
      },
      {
        title: 'Série brute, série ordonnée, valeurs distinctes',
        html: [
          '<p>Les données telles qu’on les reçoit forment une <strong>série brute</strong>, dans un ordre ' +
          'arbitraire. La <strong>trier</strong> est la première opération de toute analyse : elle fait ' +
          'apparaître les valeurs extrêmes, les répétitions et les valeurs suspectes.</p>',
          '<table>\n' +
          '    <tr><th>Série brute</th><td>12, 8, 15, 8, 12, 9, 12</td></tr>\n' +
          '    <tr><th>Série ordonnée</th><td>8, 8, 9, 12, 12, 12, 15</td></tr>\n' +
          '    <tr><th>Effectif total N</th><td>7</td></tr>\n' +
          '    <tr><th>Valeurs distinctes</th><td>8, 9, 12, 15 — soit 4 modalités</td></tr>\n' +
          '  </table>',
          '<p>Le nombre de valeurs distinctes est le nombre de <strong>modalités</strong> du caractère. Il est ' +
          'toujours inférieur ou égal à l’effectif total.</p>',
          box('standard', 'Modalités et effectifs d’un caractère', [
      '<p>Pour une série brute $X = (x_1, x_2, \\\\dots, x_N)$, on ordonne les valeurs par ordre croissant :</p>',
      '<div class="math-block">$x_{(1)} \\\\le x_{(2)} \\\\le \\\\dots \\\\le x_{(N)}$</div>',
      '<p>L’ensemble des valeurs distinctes $\{x_1, \\\\dots, x_k\}$ forme les <strong>$k$ modalités</strong> ($k \\\\le N$).</p>'
    ].join('\n'))
        ].join('\n')
      },
      {
        title: 'Regrouper en classes',
        html: [
          '<p>Quand un caractère continu prend beaucoup de valeurs différentes, la série devient illisible ' +
          'sous forme de liste. On la découpe alors en <strong>classes</strong> d’égale <strong>amplitude</strong>.</p>',
          box('formula', 'Découpage en classes et amplitudes', [
      '<div class="box--formula">',
      '  <span class="formula-label">Amplitude d’une classe</span>',
      '  <div class="math-block">$a = \\\\frac{x_{\\\\max} - x_{\\\\min}}{k}$</div>',
      '</div>',
      '<div class="box--formula">',
      '  <span class="formula-label">Centre de la classe $[b_i, b_{i+1}[$</span>',
      '  <div class="math-block">$c_i = \\\\frac{b_i + b_{i+1}}{2}$</div>',
      '</div>'
    ].join('\n')),
          '<p><strong>Exemple.</strong> Des tailles relevées entre 150 cm et 190 cm, découpées en 4 classes ' +
          'd’amplitude 10 :</p>',
          '<table>\n' +
          '    <tr><th>Classe</th><th>Centre</th></tr>\n' +
          '    <tr><td>[150 ; 160[</td><td>155</td></tr>\n' +
          '    <tr><td>[160 ; 170[</td><td>165</td></tr>\n' +
          '    <tr><td>[170 ; 180[</td><td>175</td></tr>\n' +
          '    <tr><td>[180 ; 190[</td><td>185</td></tr>\n' +
          '  </table>',
          '<p>Le <strong>centre de classe</strong> est la valeur que l’on utilisera pour tous les calculs : ' +
          'c’est le compromis qui représente la classe entière.</p>',
          box('pitfall', 'Piège — les bornes de classes', 'warning',
            '    <p>Une valeur égale à une borne appartient à la classe suivante : <code>[150 ; 160[</code> ' +
            'contient 150 mais pas 160. Sans cette règle, une même valeur pourrait être comptée deux fois, ou ' +
            'pas du tout — et l’effectif total ne tomberait plus juste.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Qu’appelle-t-on un individu en statistique ?', opts: ['Une personne interrogée uniquement', 'Un élément de la population étudiée', 'Une modalité'], correct: 1, exp: 'Un individu peut être une personne, un objet, un jour, un site : tout élément de la population.' },
      { stem: 'Le caractère « couleur des yeux » est…', opts: ['quantitatif discret', 'qualitatif', 'quantitatif continu'], correct: 1, exp: 'Ses modalités ne sont pas numériques : il est qualitatif.' },
      { stem: 'Un numéro de téléphone est…', opts: ['quantitatif discret', 'qualitatif', 'quantitatif continu'], correct: 1, exp: 'Écrit avec des chiffres, il ne se calcule pas : il est qualitatif.' },
      { stem: 'Sur la série 3, 5, 5, 8, 5, 3, combien de modalités compte-t-elle ?', opts: ['2', '3', '6'], correct: 1, exp: 'Les valeurs distinctes sont 3, 5 et 8 : trois modalités.' },
      { stem: 'Qu’est-ce que le centre d’une classe [160 ; 170[ ?', opts: ['160', '165', '170'], correct: 1, exp: 'Le centre est la demi-somme des bornes : (160 + 170)/2 = 165.' },
      { stem: 'Une valeur égale à 160 appartient à quelle classe ?', opts: ['[150 ; 160[', '[160 ; 170[', 'Les deux'], correct: 1, exp: 'La borne inférieure appartient à la classe ; la borne supérieure est exclue.' }
    ],

    pitfalls: [
      '<strong>Population confondue avec l’échantillon</strong> : généraliser à tous les clients un résultat obtenu sur 30 personnes.',
      '<strong>Type du caractère mal identifié</strong> : calculer la moyenne de codes postaux.',
      '<strong>Médiane calculée sur une série non triée</strong> : le résultat n’a aucun sens.',
      '<strong>Chevauchement des classes</strong> : une borne comptée dans deux classes et un effectif total faux.',
      '<strong>Moyenne sur les bornes</strong> au lieu des centres de classe.'
    ],

    methodTitle: 'Décrire une série avant tout calcul',
    method: [
      '<strong>Nommer la population</strong> et l’unité statistique (l’individu).',
      '<strong>Identifier le caractère</strong> observé et son type : qualitatif, discret ou continu.',
      '<strong>Trier la série</strong> et compter l’effectif total N.',
      '<strong>Lister les modalités</strong> distinctes, ou découper en classes si le caractère est continu.',
      '<strong>Contrôler</strong> que la somme des effectifs des modalités redonne bien N.'
    ],

    summary: [
      'Population : l’ensemble étudié ; individu : un de ses éléments ; échantillon : une partie de la population.',
      'Caractère : ce qui est observé ; modalité : une valeur possible de ce caractère.',
      'Trois types : qualitatif, quantitatif discret, quantitatif continu (à regrouper en classes).',
      'Effectif n<sub>i</sub> : nombre d’individus portant la modalité ; effectif total N = Σ n<sub>i</sub>.',
      'Le centre d’une classe est la demi-somme de ses bornes ; la borne inférieure appartient à la classe.'
    ],

    checklist: [
      'Je nomme population, individu et caractère sans hésiter.',
      'Je classe un caractère dans son type exact.',
      'Je trie une série et je compte ses modalités.',
      'Je découpe une série en classes de même amplitude et je donne leurs centres.'
    ],

    notions: ['population', 'individu', 'échantillon', 'caractère', 'modalité', 'effectif', 'série ordonnée', 'centre de classe'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprenez les sections 1 et 2 en réécrivant les définitions.' },
      { cls: 'mid', text: '50–69 % — Refaites les exercices de niveau 1 de l’atelier du chapitre 1.' },
      { cls: 'good', text: '70–94 % — Bon niveau : cible le type des caractères et les bornes de classes.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, effectifs et fréquences.' }
    ],

    flashcards: [
      { q: 'Qu’est-ce que « tableau statistique » ?', a: 'tableau statistique : Vous avez trié votre série : 42 notes. Personne ne peut lire une liste de 42 nombres dans un rapport. Pour décider, il faut la même information sous une forme condensée : combien d’élèves ont eu chaque note, quelle proportion cela représente, et combien d’élèves ont eu au moins telle no' },
      { q: 'Qu’est-ce que « pourcentage » ?', a: 'calculer une fréquence relative et une fréquence en pourcentage ;' },
      { q: 'Qu’est-ce que « fréquence cumulée » ?', a: 'fréquence cumulée : calculer une fréquence relative et une fréquence en pourcentage ;' },
      { q: 'Qu’est-ce que « contrôle des sommes » ?', a: 'contrôle des sommes : Les deux contrôles à faire systématiquement : la somme de la colonne des effectifs doit valoir N, et la somme de la colonne des fréquences doit valoir 1 (ou 100 en pourcentage). Une erreur dans un tableau se repère presque toujours ainsi.' },
      { q: 'Qu’est-ce que « comparaison de populations » ?', a: 'comparaison de populations' },
      { q: 'Qu’est-ce que « quartiles » ?', a: 'déterminer médiane et quartiles avec la convention du cours ;' },
      { q: 'Qu’est-ce que « distribution dissymétrique » ?', a: 'distribution dissymétrique' },
      { q: 'Qu’est-ce que « étendue » ?', a: 'calculer l’étendue et l’écart interquartile ;' },
      { q: 'Qu’est-ce que « coefficient de variation » ?', a: 'comparer deux séries par leur coefficient de variation.' },
      { q: 'Qu’est-ce que « homogénéité » ?', a: 'homogénéité : Statistiques B1 › Sommaire › Chapitre 4' },
      { q: 'Qu’est-ce que « diagramme en bâtons » ?', a: 'Un graphique bien choisi fait comprendre en deux secondes ce qu’un tableau met deux minutes à dire. Un graphique mal choisi fait croire le contraire de la vérité : un histogramme à classes inégales lu comme un diagramme en bâtons surestime les classes larges. Choisir la bonne rep' },
      { q: 'Qu’est-ce que « diagramme en barres » ?', a: 'Diagramme en barres : barres plus larges, fréquemment horizontales, pratique quand les libellés sont longs (noms de filières, de villes).' },
      { q: 'Qu’est-ce que « série double » ?', a: 'Quand deux caractères sont relevés sur les mêmes individus, on obtient une série double : un couple (x, y) par individu. On la représente par un nuage de points dans le plan.' },
      { q: 'Qu’est-ce que « coefficient de corrélation » ?', a: 'calculer et interpréter un coefficient de corrélation linéaire ;' },
      { q: 'Qu’est-ce que « prévision » ?', a: 'prévision : Un magasin relève, chaque jour, sa dépense publicitaire et son chiffre d’affaires. Les deux nombres ont-ils un lien, et si oui, peut-on prévoir le second à partir du premier ? Décrire une seule variable ne suffit plus : il faut étudier deux caractères ensemble , mesurer leur liai' },
      { q: 'Qu’est-ce que « corrélation et causalité » ?', a: 'corrélation et causalité : calculer et interpréter un coefficient de corrélation linéaire ;' },
      { q: 'Définissez la population et l’échantillon.', a: 'La population est l’ensemble étudié ; l’échantillon est une partie de cette population.' },
      { q: 'Quels sont les trois types de caractères ?', a: 'Qualitatif, quantitatif discret, quantitatif continu (regroupé en classes).' },
      { q: 'Qu’est-ce qu’une modalité ?', a: 'Une valeur possible du caractère (ou une classe, si le caractère est continu).' },
      { q: 'Comment calcule-t-on le centre d’une classe ?', a: 'C’est la demi-somme des bornes inférieure et supérieure de la classe.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Effectifs, fréquences et cumuls',
    short: 'Effectifs et fréquences',
    toc: 'Tableau statistique, fréquences relatives et en pourcentage, effectifs cumulés croissants et décroissants.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Vous avez trié votre série : 42 notes. Personne ne peut lire une liste de 42 nombres dans un rapport. Pour ' +
      'décider, il faut la même information sous une forme condensée : combien d’élèves ont eu chaque note, ' +
      'quelle proportion cela représente, et combien d’élèves ont eu au moins telle note. C’est exactement le ' +
      'tableau statistique, et il tient en cinq lignes.',

    objectives: [
      'construire un tableau statistique complet à partir d’une série ;',
      'calculer une fréquence relative et une fréquence en pourcentage ;',
      'calculer les effectifs et fréquences cumulés croissants ;',
      'calculer les effectifs cumulés décroissants et lire un tableau.'
    ],

    sections: [
      {
        title: 'Le tableau statistique',
        html: [
          '<p>Une fois les modalités connues, on les range dans un tableau à colonnes : c’est la forme ' +
          'normale de toute donnée statistique.</p>',
          '<table>\n' +
          '    <tr><th>Modalité x<sub>i</sub></th><th>Effectif n<sub>i</sub></th><th>Fréquence f<sub>i</sub></th><th>ECC</th></tr>\n' +
          '    <tr><td>8</td><td>2</td><td>0,10</td><td>2</td></tr>\n' +
          '    <tr><td>9</td><td>1</td><td>0,05</td><td>3</td></tr>\n' +
          '    <tr><td>12</td><td>3</td><td>0,15</td><td>6</td></tr>\n' +
          '    <tr><td>15</td><td>4</td><td>0,20</td><td>10</td></tr>\n' +
          '    <tr><th>Total</th><th>10</th><th>1,00</th><th>—</th></tr>\n' +
          '  </table>',
          '<p><strong>Les deux contrôles à faire systématiquement :</strong> la somme de la colonne des ' +
          'effectifs doit valoir N, et la somme de la colonne des fréquences doit valoir 1 (ou 100 en ' +
          'pourcentage). Une erreur dans un tableau se repère presque toujours ainsi.</p>',
          box('mnemo', 'Mnémotechnique — « Effectif : un compte ; Fréquence : une part »', 'pin',
            '    <p>L’<strong>effectif</strong> est un nombre d’individus, toujours entier. La ' +
            '<strong>fréquence</strong> est une <em>part</em> du total, toujours comprise entre 0 et 1. ' +
            'Une fréquence plus grande que 1 est une erreur arithmétique immédiatement visible.</p>')
        ].join('\n')
      },
      {
        title: 'Fréquences relatives et pourcentages',
        html: [
          '<p><strong>Définition.</strong> La <strong>fréquence relative</strong> d’une modalité est la part ' +
          'de la population qui la porte :</p>',
          '<div class="math-block">$f_i = \\\\frac{n_i}{N} \\\\quad \\\\text{avec} \\\\quad \\\\sum_{i=1}^k f_i = 1 \\\\quad (\\\\text{soit } 100\,\%)$</div>',
          '<p>Contrairement à l’effectif, une fréquence permet de <strong>comparer deux populations de tailles ' +
          'différentes</strong> : 12 sur 30 et 20 sur 50 ne se comparent pas en effectifs, mais leurs ' +
          'fréquences (40 %) sont identiques.</p>',
          box('standard', 'Propriété des fréquences relatives', [
      '<p>La fréquence relative $f_i$ est un nombre sans dimension compris entre 0 et 1 :</p>',
      '<div class="math-block">$0 \\\\le f_i \\\\le 1 \\\\quad \\forall i \\\\in \{1, \\\\dots, k\}$</div>',
      '<p>Elle mesure la proportion relative d’individus présentant la modalité $x_i$.</p>'
    ].join('\n'))
        ].join('\n')
      },
      {
        title: 'Effectifs et fréquences cumulés croissants',
        html: [
          '<p><strong>Définition.</strong> L’<strong>effectif cumulé croissant</strong> (ECC) de la modalité ' +
          'x<sub>i</sub> est le nombre d’individus dont la valeur est <em>inférieure ou égale</em> à ' +
          'x<sub>i</sub> :</p>',
          '<div class="math-block">$ECC_i = \\\\sum_{j=1}^i n_j = n_1 + n_2 + \\\\dots + n_i$</div>',
          '<p>C’est la colonne qui répond à la question « combien de personnes ont au plus cette valeur ? ». ' +
          'Elle est <strong>croissante</strong> et se termine par l’effectif total N.</p>',
          '<p>Exemple d’énoncé classique : « Quel est le nombre d’élèves ayant eu au plus 12 ? » Réponse : ' +
          'l’ECC de la modalité 12, lu directement dans le tableau, sans addition à refaire.</p>',
          box('intuition', 'Pourquoi cette colonne est si utile', 'compass',
            '    <p>Les ECC permettent de répondre en une lecture à toutes les questions du type « au plus », ' +
            '« au moins », « combien sont sous le seuil ? ». Un correcteur de copies, un médecin lisant des ' +
            'résultats ou un ingénieur consultant des temps de réponse utilisent cette lecture quotidiennement.</p>')
        ].join('\n')
      },
      {
        title: 'Effectifs cumulés décroissants',
        html: [
          '<p><strong>Définition.</strong> L’<strong>effectif cumulé décroissant</strong> (ECD) de la modalité ' +
          'x<sub>i</sub> est le nombre d’individus dont la valeur est <em>supérieure ou égale</em> à ' +
          'x<sub>i</sub> :</p>',
          '<div class="math-block">$ECD_i = \\\\sum_{j=i}^k n_j = n_i + n_{i+1} + \\\\dots + n_k$</div>',
          '<p>Cette colonne est <strong>décroissante</strong> et commence par N. Elle répond aux questions ' +
          '« au moins » : « combien de personnes ont au moins 12 ? »</p>',
          '<table>\n' +
          '    <tr><th>Modalité</th><th>n<sub>i</sub></th><th>ECC</th><th>ECD</th></tr>\n' +
          '    <tr><td>8</td><td>2</td><td>2</td><td>10</td></tr>\n' +
          '    <tr><td>9</td><td>1</td><td>3</td><td>8</td></tr>\n' +
          '    <tr><td>12</td><td>3</td><td>6</td><td>7</td></tr>\n' +
          '    <tr><td>15</td><td>4</td><td>10</td><td>4</td></tr>\n' +
          '  </table>',
          box('pitfall', 'Piège — les deux cumuls se lisent dans des sens opposés', 'warning',
            '    <p>ECC et ECD donnent deux réponses différentes à deux questions différentes. « Au plus 12 » ' +
            'se lit dans la colonne ECC (6) ; « au moins 12 » dans la colonne ECD (7). Les confondre est ' +
            'l’erreur la plus fréquente sur les tableaux cumulés.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que vaut la somme des fréquences relatives ?', opts: ['N', '1', '100'], correct: 1, exp: 'Les parts du tout se totalisent à 1, soit 100 %.' },
      { stem: '12 individus sur 30, cela représente…', opts: ['12 %', '40 %', '0,4 %'], correct: 1, exp: '12/30 = 0,4, soit 40 %.' },
      { stem: 'L’effectif cumulé croissant de la dernière modalité vaut…', opts: ['1', 'N', 'la fréquence'], correct: 1, exp: 'La dernière ECC cumule tous les individus : elle vaut N.' },
      { stem: '« Au moins 12 » se lit dans quelle colonne ?', opts: ['Effectif', 'ECC', 'ECD'], correct: 2, exp: 'ECD = nombre d’individus de valeur supérieure ou égale : « au moins ».' },
      { stem: 'Une fréquence vaut 1,35. Que peut-on en conclure ?', opts: ['C’est normal', 'Il y a une erreur de calcul', 'La population est grande'], correct: 1, exp: 'Une fréquence ne peut pas dépasser 1 : le calcul est faux.' },
      { stem: 'Pour comparer deux promotions de tailles différentes, on utilise…', opts: ['les effectifs', 'les fréquences', 'les ECD'], correct: 1, exp: 'Les fréquences ramènent les effectifs à une même base de comparaison.' }
    ],

    pitfalls: [
      '<strong>Somme des effectifs différente de N</strong> : une modalité oubliée dans le tableau.',
      '<strong>Fréquence supérieure à 1</strong> : confusion entre n<sub>i</sub> et f<sub>i</sub>.',
      '<strong>ECC et ECD confondus</strong> : la question « au plus » se lit dans les ECC.',
      '<strong>Cumul non croissant</strong> : la colonne des ECC doit être croissante, sinon il y a une erreur.',
      '<strong>Pourcentage et fréquence mélangés</strong> : additionner 0,4 et 40 % dans la même colonne.'
    ],

    methodTitle: 'Construire un tableau statistique',
    method: [
      '<strong>Lister les modalités</strong> une seule fois, dans l’ordre croissant.',
      '<strong>Compter les effectifs</strong> n<sub>i</sub> de chaque modalité.',
      '<strong>Calculer les fréquences</strong> f<sub>i</sub> = n<sub>i</sub>/N, puis les pourcentages si demandé.',
      '<strong>Cumuler</strong> : ECC de haut en bas, ECD de bas en haut.',
      '<strong>Contrôler</strong> : Σ n<sub>i</sub> = N, Σ f<sub>i</sub> = 1, dernière ECC = N, première ECD = N.'
    ],

    summary: [
      'Tableau statistique : modalités, effectifs, fréquences, cumuls — sur une seule ligne par modalité.',
      'f<sub>i</sub> = n<sub>i</sub>/N ; la somme des fréquences vaut 1 (ou 100 %).',
      'Les fréquences permettent de comparer des populations de tailles différentes.',
      'ECC : nombre d’individus d’une valeur inférieure ou égale — répond à « au plus ».',
      'ECD : nombre d’individus d’une valeur supérieure ou égale — répond à « au moins ».'
    ],

    checklist: [
      'Je construis un tableau complet sans oublier de modalité.',
      'Je vérifie les sommes des effectifs et des fréquences.',
      'Je réponds à une question « au plus » par une lecture d’ECC.',
      'Je réponds à une question « au moins » par une lecture d’ECD.'
    ],

    notions: ['tableau statistique', 'fréquence relative', 'pourcentage', 'ECC', 'ECD', 'fréquence cumulée', 'contrôle des sommes', 'comparaison de populations'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprenez le tableau de la section 1 et refais-le entièrement.' },
      { cls: 'mid', text: '50–69 % — Refaites les exercices de niveau 2 de l’atelier du chapitre 2.' },
      { cls: 'good', text: '70–94 % — Bon niveau : cible la distinction ECC / ECD.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, la tendance centrale.' }
    ],

    flashcards: [
      { q: 'Formule de la fréquence relative ?', a: '<code>f<sub>i</sub> = n<sub>i</sub> / N</code> ; la somme de toutes les fréquences vaut 1.' },
      { q: 'Que répond une ECC ?', a: 'Le nombre d’individus de valeur inférieure ou égale : question « au plus ».' },
      { q: 'Que répond une ECD ?', a: 'Le nombre d’individus de valeur supérieure ou égale : question « au moins ».' },
      { q: 'Quels contrôles faire après un tableau ?', a: 'Σ n<sub>i</sub> = N, Σ f<sub>i</sub> = 1, dernière ECC = N, première ECD = N.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Tendance centrale : moyenne, médiane, mode',
    short: 'Tendance centrale',
    toc: 'Moyenne simple et pondérée, série regroupée, médiane, quartiles, mode.',
    time: '≈ 3 h de travail',

    situation:
      'Deux promotions ont la même moyenne de 12 sur 20. Pourtant l’une est homogène, l’autre oppose ' +
      'quelques excellents élèves à beaucoup d’élèves en difficulté. Un seul nombre ne suffit donc pas à ' +
      'décrire une série : il faut savoir ce qu’il mesure, et connaître les autres indicateurs de position ' +
      'qui racontent une autre partie de l’histoire.',

    objectives: [
      'calculer une moyenne simple et une moyenne pondérée par les effectifs ;',
      'calculer la moyenne d’une série regroupée en classes ;',
      'déterminer médiane et quartiles avec la convention du cours ;',
      'identifier le mode et savoir quand il n’existe pas ou n’est pas unique.'
    ],

    sections: [
      {
        title: 'La moyenne',
        html: [
          '<p><strong>Définition.</strong> La <strong>moyenne</strong> d’une série de n valeurs est la somme des ' +
          'valeurs divisée par leur nombre :</p>',
          '<div class="math-block">$\\\\bar{x} = \\\\frac{1}{n} \\\\sum_{i=1}^n x_i$</div>',
          '<p>Lorsque la série est donnée par un tableau d’effectifs, on pondère chaque modalité par son ' +
          'effectif, ce qui revient au même calcul :</p>',
          '<div class="math-block">$\\\\bar{x} = \\\\frac{1}{N} \\\\sum_{i=1}^k n_i x_i = \\\\sum_{i=1}^k f_i x_i \\\\quad \\\\left(N = \\\\sum_{i=1}^k n_i\\\\right)$</div>',
          '<p><strong>Exemple.</strong> Effectifs 2, 4, 6, 5, 3 pour les notes 1 à 5 :</p>',
          '<pre><code>x̄ = (2·1 + 4·2 + 6·3 + 5·4 + 3·5) / 20\n' +
          '   = (2 + 8 + 18 + 20 + 15) / 20 = 63 / 20 = 3,15</code></pre>',
          box('pitfall', 'Piège — le poids compte, pas le nombre de modalités', 'warning',
            '    <p>Faire la moyenne des modalités (1 + 2 + 3 + 4 + 5)/5 = 3 est <strong>faux</strong> : cela ' +
            'suppose que toutes les notes ont le même effectif. Il faut pondérer : chaque modalité compte ' +
            'autant de fois qu’elle a d’individus.</p>')
        ].join('\n')
      },
      {
        title: 'Moyenne pondérée et série regroupée',
        html: [
          '<p>Le même mot <em>pondéré</em> cache deux situations courantes :</p>',
          '<ul>\n' +
          '    <li><strong>pondération par les effectifs</strong> : on l’a vue, x̄ = Σ n<sub>i</sub>x<sub>i</sub> / N ;</li>\n' +
          '    <li><strong>pondération par des coefficients</strong> : un contrôle de coefficient 2 compte deux ' +
          'fois plus qu’un contrôle de coefficient 1.</li>\n' +
          '  </ul>',
          '<div class="math-block">$\\\\bar{x} = \\\\frac{\\\\sum w_i x_i}{\\\\sum w_i}$</div>',
          '<p>Pour une série <strong>regroupée en classes</strong>, la moyenne se calcule sur les ' +
          '<strong>centres de classe</strong>, pondérés par les effectifs :</p>',
          '<div class="math-block">$\\\\bar{x} = \\\\frac{1}{N} \\\\sum_{i=1}^k n_i c_i \\\\quad \\\\text{avec } c_i = \\\\frac{\\\\text{inf}_i + \\\\text{sup}_i}{2}$</div>',
          box('tech', 'Exemple de calcul sur classes', 'terminal',
            '    <table>\n' +
            '      <tr><th>Classe</th><th>Centre</th><th>Effectif</th><th>n<sub>i</sub>·c<sub>i</sub></th></tr>\n' +
            '      <tr><td>[150 ; 160[</td><td>155</td><td>8</td><td>1 240</td></tr>\n' +
            '      <tr><td>[160 ; 170[</td><td>165</td><td>15</td><td>2 475</td></tr>\n' +
            '      <tr><td>[170 ; 180[</td><td>175</td><td>19</td><td>3 325</td></tr>\n' +
            '      <tr><td>[180 ; 190[</td><td>185</td><td>8</td><td>1 480</td></tr>\n' +
            '    </table>\n' +
            '    <p>x̄ = 8 520 / 50 = 170,4. Le résultat est une <em>approximation</em> : la série d’origine a ' +
            'été perdue en la regroupant.</p>')
        ].join('\n')
      },
      {
        title: 'La médiane et les quartiles',
        html: [
          '<p><strong>Définition.</strong> La <strong>médiane</strong> partage la série ordonnée en deux ' +
          'moitiés : au moins 50 % des valeurs lui sont inférieures ou égales, au moins 50 % lui sont ' +
          'supérieures ou égales.</p>',
          '<p><strong>Convention du cours.</strong> Le rang d’un quantile de niveau p est ' +
          '<code>r = (n + 1) · p</code> :</p>',
          '<ul>\n' +
          '    <li>si r est entier, la valeur est <code>x<sub>(r)</sub></code> ;</li>\n' +
          '    <li>sinon on interpole linéairement entre les deux valeurs encadrantes.</li>\n' +
          '  </ul>',
          '<pre><code>médiane   p = 0,50        Q1 : p = 0,25        Q3 : p = 0,75\n' +
          '\n' +
          'Série 2, 4, 4, 5, 7, 8, 9, 11, 12, 15     (n = 10)\n' +
          'médiane : r = 11 × 0,5 = 5,5  →  (7 + 8)/2 = 7,5\n' +
          'Q1      : r = 11 × 0,25 = 2,75 →  4 + 0,75 × (4 − 4) = 4\n' +
          'Q3      : r = 11 × 0,75 = 8,25 →  11 + 0,25 × (12 − 11) = 11,25</code></pre>',
          '<p>L’<strong>écart interquartile</strong> <code>EI = Q3 − Q1</code> contient les 50 % centraux de ' +
          'la série : c’est une mesure de dispersion, étudiée au chapitre suivant.</p>',
          box('intuition', 'Médiane ou moyenne ?', 'compass',
            '    <p>La médiane résiste aux valeurs extrêmes, la moyenne non. Un salaire moyen peut être tiré ' +
            'vers le haut par une seule très grosse rémunération ; la médiane, elle, ne bouge presque pas. ' +
            'C’est pourquoi les revenus s’annoncent en <em>salaire médian</em> et non en salaire moyen.</p>')
        ].join('\n')
      },
      {
        title: 'Le mode',
        html: [
          '<p><strong>Définition.</strong> Le <strong>mode</strong> est la modalité d’effectif maximal : c’est ' +
          'la valeur la plus fréquente de la série.</p>',
          '<ul>\n' +
          '    <li>Il existe à condition qu’une modalité se détache : si toutes les modalités ont le même ' +
          'effectif, <strong>il n’y a pas de mode</strong>.</li>\n' +
          '    <li>Il peut y avoir <strong>plusieurs modes</strong> : la distribution est alors bimodale ou ' +
          'multimodale.</li>\n' +
          '    <li>C’est le seul indicateur de position qui s’applique à un caractère <strong>qualitatif</strong>.</li>\n' +
          '  </ul>',
          '<p>Sur la série des notes 1 à 5 avec les effectifs 2, 4, 6, 5, 3, l’effectif maximal est 6, obtenu ' +
          'pour la note 3 : le mode est 3. Ici, mode (3) et médiane (3) coïncident, mais la moyenne vaut 3,15 : ' +
          'les trois indicateurs racontent trois choses différentes.</p>',
          box('mnemo', 'Mnémotechnique — « le mode est le plus fréquent »', 'pin',
            '    <p>Rien à calculer pour le mode : c’est la modalité qui revient le plus souvent. Sur un ' +
            'caractère qualitatif (couleur préférée, filière choisie), c’est le <em>seul</em> indicateur de ' +
            'position disponible — d’où son importance.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'La moyenne de la série 4, 6, 8, 10 vaut…', opts: ['6', '7', '8'], correct: 1, exp: '(4 + 6 + 8 + 10)/4 = 7.' },
      { stem: 'Calculer la moyenne des modalités sans pondérer est…', opts: ['correct si les effectifs sont égaux', 'toujours correct', 'toujours faux'], correct: 0, exp: 'Faire la moyenne des modalités revient à supposer des effectifs égaux.' },
      { stem: 'Pour une série en classes, la moyenne utilise…', opts: ['les bornes', 'les centres de classe', 'les effectifs'], correct: 1, exp: 'Le centre de classe représente la classe dans le calcul.' },
      { stem: 'La médiane d’une série ordonnée de 9 valeurs est…', opts: ['la 4e', 'la 5e', 'la moyenne des 4e et 5e'], correct: 1, exp: 'Rang (9 + 1)/2 = 5 : la 5e valeur.' },
      { stem: 'Le mode d’une série existe…', opts: ['toujours', 'si une modalité a un effectif maximal strict', 'si la moyenne est entière'], correct: 1, exp: 'Si toutes les modalités sont également fréquentes, il n’y a pas de mode.' },
      { stem: 'Quel indicateur de position s’applique à un caractère qualitatif ?', opts: ['La moyenne', 'La médiane', 'Le mode'], correct: 2, exp: 'On ne peut pas ordonner un caractère qualitatif : seul le mode reste calculable.' }
    ],

    pitfalls: [
      '<strong>Moyenne des modalités au lieu de la moyenne pondérée</strong> quand les effectifs diffèrent.',
      '<strong>Médiane sur série non triée</strong> : le résultat est faux sans que rien ne le signale.',
      '<strong>Confusion moyenne / médiane</strong> : elles ne coïncident que pour une distribution symétrique.',
      '<strong>Rang de quantile mal appliqué</strong> : oublier le « +1 » de la formule (n + 1)·p.',
      '<strong>Mode annoncé sur série à effectifs égaux</strong> : il n’existe pas dans ce cas.'
    ],

    methodTitle: 'Choisir et calculer un indicateur de position',
    method: [
      '<strong>Trier la série</strong> avant tout calcul de médiane ou de quartile.',
      '<strong>Compter les effectifs</strong> par modalité, ou les centres de classe si la série est regroupée.',
      '<strong>Calculer la moyenne pondérée</strong> Σ n<sub>i</sub>x<sub>i</sub> / N.',
      '<strong>Appliquer le rang</strong> r = (n + 1)·p pour la médiane et les quartiles, en interpolant si besoin.',
      '<strong>Comparer</strong> moyenne, médiane et mode : si elles s’écartent, la distribution est dissymétrique — dis-le.'
    ],

    summary: [
      'Moyenne : x̄ = Σ n<sub>i</sub>x<sub>i</sub> / N, pondérée par les effectifs (ou les coefficients).',
      'Série regroupée : on calcule à partir des centres de classe (résultat approché).',
      'Médiane : valeur de rang (n + 1)/2 dans la série ordonnée ; résiste aux valeurs extrêmes.',
      'Quartiles : rangs (n + 1)/4 et 3(n + 1)/4, avec interpolation si le rang n’est pas entier.',
      'Mode : modalité d’effectif maximal ; peut être absent, unique ou multiple.'
    ],

    checklist: [
      'Je calcule une moyenne pondérée sans oublier un effectif.',
      'Je trouve la médiane et les quartiles avec la convention du cours.',
      'Je calcule la moyenne d’une série regroupée à partir des centres.',
      'J’interprète l’écart entre moyenne et médiane.'
    ],

    notions: ['moyenne', 'moyenne pondérée', 'centre de classe', 'médiane', 'quartiles', 'écart interquartile', 'mode', 'distribution dissymétrique'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprenez le calcul d’effectifs du chapitre 2 avant d’attaquer la moyenne.' },
      { cls: 'mid', text: '50–69 % — Refaites les exercices de niveau 2 de l’atelier du chapitre 3.' },
      { cls: 'good', text: '70–94 % — Bon niveau : cible les rangs de quantiles.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, les mesures de dispersion.' }
    ],

    flashcards: [
      { q: 'Formule de la moyenne pondérée ?', a: '<code>x̄ = Σ n<sub>i</sub>·x<sub>i</sub> / N</code>, avec N = Σ n<sub>i</sub>.' },
      { q: 'Comment calcule-t-on la moyenne d’une série en classes ?', a: 'Avec les centres de classe pondérés par les effectifs ; le résultat est approché.' },
      { q: 'Quel est le rang de la médiane ?', a: '<code>(n + 1)/2</code> dans la série ordonnée ; on interpole si le rang n’est pas entier.' },
      { q: 'Quand n’y a-t-il pas de mode ?', a: 'Quand toutes les modalités ont le même effectif : aucune ne se détache.' }
    ]
  }
];
