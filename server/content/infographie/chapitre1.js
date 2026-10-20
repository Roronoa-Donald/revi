/**
 * Chapitre 1 du cours « Infographie B2 » — Colorimétrie, Espaces de Couleur &amp; Formats Graphiques.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Colorimétrie, Espaces de Couleur &amp; Formats Graphiques',
  short: 'Colorimétrie &amp; Formats',
  toc: 'Physique de la lumière, synthèses additive (RVB) et soustractive (CMJN), modèles HSL/HSV, espaces sRVB vs RVB linéaire (gamma 2.2), résolution spatiale (DPI vs PPI), et typologie des formats (SVG vectoriel, PNG sans perte, JPEG avec compression DCT, WebP moderne).',
  time: '≈ 2 h 45 de travail',
  free: true,

  situation:
    'L’image numérique ne se résume pas à un simple tableau de pixels colorés. Concevoir des graphismes ' +
    'fidèles sur écran et reproductibles à l’impression exige de maîtriser les fondations physiques de la perception visuelle. ' +
    'Des erreurs récurrentes dans l’industrie — dégradés assombris, textes baveux à l’impression ou images web surdimensionnées — ' +
    'découlent d’une mauvaise compréhension des espaces colorimétriques (RVB vs CMJN, courbe gamma sRVB) ' +
    'ou d’un choix inadapté de format de fichier. ' +
    'Ce premier module pose les bases indispensables pour tout infographiste et développeur graphique : ' +
    'comprendre la lumière, convertir rigoureusement les coordonnées de couleurs, calculer les résolutions physiques d’affichage ' +
    'et sélectionner le bon format d’encodage (vectoriel SVG ou raster PNG/JPEG/WebP).',

  objectives: [
    'distinguer avec rigueur la synthèse additive (RVB pour écrans) de la synthèse soustractive (CMJN pour impression) ;',
    'comprendre la courbe de transfert gamma 2.2 et la distinction vitale entre espace sRVB et RVB linéaire ;',
    'manipuler les modèles de couleur perceptuels HSL (Teinte, Saturation, Luminosité) et HSV ;',
    'calculer la résolution spatiale, les dimensions physiques d’impression et la densité de pixels (DPI vs PPI) ;',
    'analyser les mécanismes de compression et les cas d’usage des formats standards (SVG, PNG, JPEG, WebP) ;',
    'implémenter des convertisseurs et classificateurs de formats d’images en Python.'
  ],

  sections: [
    {
      title: 'Physique de la Lumière &amp; Modèles de Synthèse des Couleurs',
      html: [
        '<p>La couleur perçue par l’œil humain résulte de la stimulation de trois types de photorécepteurs rétiniens (les cônes S, M, L sensibles aux longueurs d’onde courtes, moyennes et longues). Deux modèles physiques fondamentaux permettent de reproduire cette sensation :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Synthèse Additive (Modèle RVB)</h4>',
        '    <ul>',
        '      <li><strong>Principe physique :</strong> Émission directe de photons lumineux à partir d’un support noir (écran éteint).</li>',
        '      <li><strong>Couleurs primaires :</strong> Rouge, Vert, Bleu.</li>',
        '      <li><strong>Mélange complet :</strong> R=255, V=255, B=255 produit le Blanc pur.</li>',
        '      <li><strong>Applications :</strong> Moniteurs LCD/OLED, téléviseurs, smartphones, projecteurs vidéo, Web.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Synthèse Soustractive (Modèle CMJN)</h4>',
        '    <ul>',
        '      <li><strong>Principe physique :</strong> Absorption sélective de la lumière ambiante par des pigments d’encre sur papier blanc.</li>',
        '      <li><strong>Couleurs primaires :</strong> Cyan (absorbe le rouge), Magenta (absorbe le vert), Jaune (absorbe le bleu).</li>',
        '      <li><strong>Le Noir (K / Key) :</strong> Ajouté pour produire un noir profond, économiser les encres coûteuses et accentuer la netteté des textes.</li>',
        '      <li><strong>Applications :</strong> Impression offset, sérigraphie, imprimantes laser et jet d’encre.</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        box(
          'tip',
          'Pourquoi K et non B pour le Noir en imprimerie ?',
          '<p>La lettre <strong>K</strong> désigne la <em>Key plate</em> (plaque maîtresse d’encrage noir utilisée pour aligner les détails et les repères d’impression). ' +
          'Cela évite également toute confusion avec la lettre B désignant le Bleu (Blue) dans le système RVB.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Espaces Colorimétriques : sRVB, Linéaire et Gamma 2.2',
      html: [
        '<p>L’œil humain possède une sensibilité logarithmique à la luminance : il perçoit avec une finesse bien plus grande les variations dans les tons sombres que dans les tons très lumineux. ' +
        'Pour exploiter au mieux les 8 bits par canal (256 nuances) du codage classique, l’industrie a standardisé l’espace <strong>sRVB</strong> avec une courbe de compression non linéaire (courbe gamma approximée par <code>γ ≈ 2.2</code>) :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Espace</th><th>Type d’encodage</th><th>Utilisation dans le pipeline</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>sRVB (Gamma corrigé)</strong></td><td>Non-linéaire (puissance 1/2.2)</td><td>Stockage des textures, affichage sur les moniteurs, photos web.</td></tr>',
        '    <tr><td><strong>RVB Linéaire</strong></td><td>Linéaire (physiquement exact)</td><td>Calculs d’éclairage dans les shaders GPU, additions de flux lumineux, réfraction.</td></tr>',
        '  </tbody>',
        '</table>',

        box(
          'warning',
          'L’erreur classique des calculs d’éclairage en sRVB',
          '<p>Si vous additionnez deux sources de lumière ou calculez un produit scalaire de Lambert directement sur des valeurs sRVB sans les convertir au préalable en RVB linéaire, ' +
          'les dégradés apparaissent ternes, les contours d’ombres présentent des bandes grisâtres artificielles et la physique du rendu est faussée. ' +
          'Un pipeline graphique moderne dégammaise à la lecture de la texture (sRVB -&gt; linéaire) et regammaise à la sortie du framebuffer (linéaire -&gt; sRVB).</p>'
        )
      ].join('\n')
    },
    {
      title: 'Résolution Spatiale &amp; Typologie des Formats Numériques',
      html: [
        '<p>La distinction entre image vectorielle et image matricielle (raster) détermine la fidélité géométrique et le poids des assets graphiques :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Image Vectorielle (SVG)</h4>',
        '    <p>Composée de primitives mathématiques (points, segments, courbes de Bézier cubiques, polygones). Redimensionnable à l’infini sans aucune pixellisation. Idéale pour les logos, icônes et interfaces réactives.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Image Matricielle / Raster (PNG, JPEG, WebP)</h4>',
        '    <p>Grille fixe de pixels. Dépendant de la résolution. PNG utilise la compression sans perte Deflate (canal alpha parfait). JPEG utilise la DCT avec perte (photos). WebP combine les deux avec un taux de compression supérieur de 25 à 35 %.</p>',
        '  </div>',
        '</div>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Format</th><th>Type de compression</th><th>Canal Alpha</th><th>Cas d’usage préférentiel</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>SVG</code></td><td>Vectoriel (texte XML)</td><td>Oui (vectoriel)</td><td>Logos, typographies, icônes vectorielles, graphiques web.</td></tr>',
        '    <tr><td><code>PNG</code></td><td>Sans perte (Deflate / LZ77)</td><td>Oui (8 bits complets)</td><td>Captures d’écran, graphismes avec transparence, textures UI.</td></tr>',
        '    <tr><td><code>JPEG</code></td><td>Avec perte (DCT + quantification)</td><td>Non</td><td>Photographies réalistes, scènes complexes sans transparence.</td></tr>',
        '    <tr><td><code>WebP</code></td><td>Avec ou sans perte (VP8/VP8L)</td><td>Oui</td><td>Format universel web moderne pour optimiser le temps de chargement.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole d’Étalonnage Colorimétrique et Choix de Format Graphique',
  method: [
    'Étape 1 — Identifier le support de destination : Écran (web, jeu, UI) -> synthèse additive RVB ; Impression papier -> synthèse soustractive CMJN.',
    'Étape 2 — Fixer l’espace de calcul : Pour les shaders et l’éclairage physique, convertir impérativement les textures sRVB en RVB linéaire.',
    'Étape 3 — Déterminer la résolution requise : Pour l’impression, calculer la taille minimale en pixels selon la formule (cm / 2.54) * 300 DPI.',
    'Étape 4 — Analyser la nature du visuel : Formes géométriques simples, logos ou icônes -> format vectoriel SVG sans perte de netteté.',
    'Étape 5 — Choisir l’encodage raster adapté : Visuels avec transparence nette -> PNG ou WebP lossless ; photographies réalistes -> WebP lossy ou JPEG haute qualité.',
    'Étape 6 — Valider la fidélité des contrastes : Vérifier l’histogramme pour éviter tout écrêtage excessif dans les tons sombres ou brûlés.'
  ],

  summary: [
    'La synthèse additive RVB combine la lumière sur écran, tandis que la synthèse soustractive CMJN absorbe la lumière sur papier.',
    'L’encre noire (K) en imprimerie garantit un contraste parfait et un séchage rapide tout en économisant les encres primaires.',
    'L’espace sRVB applique une compression gamma (≈ 2.2) pour maximiser les nuances perçues par l’œil dans les tons sombres.',
    'Les shaders 3D doivent toujours effectuer leurs calculs d’éclairage en RVB linéaire pour respecter les lois physiques.',
    '1 pouce équivaut à 2.54 cm : la formule de taille physique imprimée est (Pixels / DPI) × 2.54 cm.',
    'Le format vectoriel SVG repose sur des descriptions géométriques XML, garantissant une netteté absolue à tout facteur de zoom.'
  ],

  checklist: [
    'Je sais expliquer la différence physique entre synthèse additive et synthèse soustractive.',
    'Je connais la formule de conversion théorique entre valeurs RVB et pourcentages CMJN.',
    'Je comprends l’impact de la correction gamma 2.2 sur les dégradés et les calculs de shaders.',
    'Je sais calculer la taille physique d’une image en centimètres à partir de sa résolution en DPI.',
    'Je sais quand privilégier un fichier vectoriel SVG plutôt qu’une image matricielle raster.',
    'Je connais les caractéristiques de compression de PNG, JPEG et WebP.'
  ],

  notions: [
    'Synthèse additive RVB (Écrans)',
    'Synthèse soustractive CMJN (Impression)',
    'Rôle de la plaque maîtresse noire (Key plate K)',
    'Espace colorimétrique sRVB vs RVB linéaire',
    'Correction de gamma et perception oculaire',
    'Résolution spatiale (Pixels, DPI, PPI)',
    'Formats vectoriels (SVG, courbes de Bézier)',
    'Formats matriciels raster (PNG, JPEG, WebP)'
  ],

  pitfalls: [
    'Confondre DPI (points d’encre par pouce chez l’imprimeur) et PPI (pixels d’écran par pouce sur moniteur).',
    'Enregistrer une photographie en PNG au lieu de JPEG ou WebP, ce qui multiplie son poids par 5 ou 10 inutilement.',
    'Oublier que le format JPEG ne supporte aucun canal alpha de transparence.',
    'Effectuer des mélanges de lumière physique directement en espace sRVB sans passage préalable en linéaire.'
  ],

  questions: [
    {
      stem: 'Quel est le résultat du mélange additif maximal des trois composantes primaires Rouge, Vert et Bleu (R=255, V=255, B=255) ?',
      opts: [
        'Noir pur',
        'Blanc pur',
        'Gris neutre à 50 %',
        'Brun sombre'
      ],
      correct: 1,
      exp: 'En synthèse additive, la superposition de tous les flux lumineux primaires à intensité maximale produit la lumière blanche.'
    },
    {
      stem: 'Pourquoi ajoute-t-on la composante noire K (Key) aux trois encres primaires Cyan, Magenta et Jaune en imprimerie quadrichromique ?',
      opts: [
        'Pour empêcher le papier de brûler sous la presse',
        'Parce que le mélange de C, M et J ne donne qu’un brun foncé terne et coûteux en encre, alors que K apporte profondeur, netteté et contraste',
        'Pour convertir automatiquement l’image au format SVG',
        'Parce que les encres de couleur ne sèchent jamais sans encre noire'
      ],
      correct: 1,
      exp: 'Le noir pur K permet d’obtenir un contraste élevé, des textes nets et une opacité parfaite tout en réduisant considérablement la quantité d’encre déposée.'
    },
    {
      stem: 'Pourquoi les calculs d’éclairage dans les shaders GPU doivent-ils s’effectuer en espace RVB linéaire plutôt qu’en sRVB ?',
      opts: [
        'Parce que la carte graphique ne sait pas faire de multiplication en sRVB',
        'Parce que les lois physiques de propagation lumineuse sont linéaires (l’intensité double si la source double), alors que sRVB est compressé par une courbe gamma non-linéaire',
        'Parce que sRVB est un format breveté et payant',
        'Parce que sRVB ne prend en charge que les images en noir et blanc'
      ],
      correct: 1,
      exp: 'L’éclairage physique repose sur des additions et produits scalaires linéaires. Appliquer ces opérations sur des valeurs non-linéaires déforme la réponse lumineuse.'
    },
    {
      stem: 'Quelle formule permet de calculer la largeur physique d’une image imprimée en centimètres connaissant sa largeur en pixels L et sa résolution en DPI ?',
      opts: [
        'Largeur_cm = (L * DPI) / 2.54',
        'Largeur_cm = (L / DPI) * 2.54',
        'Largeur_cm = L * 2.54 * DPI',
        'Largeur_cm = DPI / (L * 2.54)'
      ],
      correct: 1,
      exp: 'L / DPI donne la dimension physique en pouces. Comme 1 pouce équivaut à 2.54 centimètres, on multiplie ce résultat par 2.54.'
    },
    {
      stem: 'Quelle caractéristique fondamentale différencie une image vectorielle SVG d’une image raster PNG ?',
      opts: [
        'Le SVG ne peut être affiché que sur des écrans cathodiques',
        'Le SVG est défini par des équations géométriques scalables sans perte de netteté, tandis que le PNG est une grille finie de pixels qui pixellise à l’agrandissement',
        'Le PNG est plus léger que le SVG pour toutes les icônes simples',
        'Le SVG ne supporte pas les couleurs'
      ],
      correct: 1,
      exp: 'Le format vectoriel décrit mathématiquement les formes, permettant un affichage parfait à n’importe quelle échelle ou résolution d’écran.'
    },
    {
      stem: 'Quel format d’image matricielle est à la fois sans perte (lossless), supporte un canal alpha 8 bits pour la transparence et est universellement géré par les navigateurs ?',
      opts: [
        'JPEG',
        'BMP',
        'PNG',
        'TIFF'
      ],
      correct: 2,
      exp: 'Le format PNG supporte une transparence progressive sur 256 niveaux (alpha 8 bits) et utilise une compression sans perte éprouvée (Deflate).'
    },
    {
      stem: 'Pourquoi le format JPEG est-il inadapté pour enregistrer des icônes d’interface ou des captures d’écran avec du texte contrasté ?',
      opts: [
        'Parce qu’il produit des artéfacts de compression par blocs (DCT 8x8) et des halos de flou autour des arêtes nettes',
        'Parce qu’il refuse d’enregistrer les images de moins de 10 mégapixels',
        'Parce qu’il convertit toutes les couleurs en noir et blanc',
        'Parce qu’il nécessite une connexion Internet permanente pour être ouvert'
      ],
      correct: 0,
      exp: 'La transformée en cosinus discrète (DCT) de JPEG quantifie les hautes fréquences spatiales, créant des artéfacts visibles (ringing) autour des contours nets.'
    },
    {
      stem: 'Quel avantage majeur apporte le format WebP développé par Google par rapport aux formats historiques JPEG et PNG ?',
      opts: [
        'Il supprime le besoin de carte graphique',
        'Il offre un taux de compression supérieur d’environ 25 à 35 % à qualité visuelle équivalente, avec support du canal alpha et du mode avec/sans perte',
        'Il augmente la résolution de l’écran physiquement',
        'Il n’a besoin d’aucun octet pour stocker les images'
      ],
      correct: 1,
      exp: 'WebP réutilise les algorithmes de prédiction intra-image du codec vidéo VP8, offrant une réduction de poids majeure pour le web moderne.'
    }
  ],

  flashcards: [
    {
      q: 'Qu’est-ce que la synthèse additive ?',
      a: 'Le mélange de faisceaux lumineux (Rouge, Vert, Bleu) sur fond noir ; leur addition complète produit du blanc pur.'
    },
    {
      q: 'Qu’est-ce que la synthèse soustractive ?',
      a: 'L’absorption de lumière par des pigments (Cyan, Magenta, Jaune, Noir) sur fond blanc ; leur superposition retient la lumière.'
    },
    {
      q: 'Pourquoi l’espace sRVB utilise-t-il une courbe gamma ≈ 2.2 ?',
      a: 'Pour allouer plus de bits aux tons sombres, compensant la sensibilité non-linéaire de l’œil humain.'
    },
    {
      q: 'Comment calculer la taille imprimée d’une image ?',
      a: 'Taille en cm = (Nombre de pixels / DPI) × 2.54.'
    },
    {
      q: 'Pourquoi le format SVG ne pixellise-t-il jamais ?',
      a: 'Parce qu’il décrit les tracés par des formules mathématiques (polygones, courbes de Bézier) recalculées à chaque échelle.'
    },
    {
      q: 'Le format JPEG supporte-t-il la transparence (canal alpha) ?',
      a: 'Non, le format JPEG ne dispose pas de canal alpha ; pour la transparence, on utilise PNG, WebP ou SVG.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la différence RVB vs CMJN, le rôle du gamma sRVB et les calculs de résolution DPI.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle théorique. Approfondissez la gestion des espaces linéaires dans les shaders et les spécificités des formats raster.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise de la colorimétrie et des formats graphiques.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les fondations colorimétriques et de compression d’image au niveau expert.' }
  ]
};
