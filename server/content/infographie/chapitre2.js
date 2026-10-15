/**
 * Chapitre 2 du cours « Infographie B2 » — Traitement d’Image, Calques &amp; Tracés Vectoriels.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Traitement d’Image, Calques &amp; Tracés Vectoriels',
  short: 'Traitement &amp; Vectoriel',
  toc: 'Algorithmique de manipulation d’image 2D, modes de fusion de calques (Multiply, Screen, Overlay), histogrammes et correction de niveaux (Levels), courbes de Bézier cubiques et polynômes de Bernstein, masquage et anti-aliasing.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Que ce soit dans les logiciels de création graphique professionnels (Photoshop, Illustrator, GIMP, Figma) ' +
    'ou dans les moteurs de rendu 2D/3D, le traitement d’image et le dessin vectoriel reposent sur des modèles ' +
    'mathématiques stricts. Les modes de fusion de calques ne sont pas des filtres magiques : ils combinent ' +
    'les canaux de couleur via des équations arithmétiques précises (multiplication normalisée, produit inverse, incrustation). ' +
    'De même, les courbes douces et les typographies vectorielles sont régies par les courbes paramétriques de Bézier. ' +
    'Ce deuxième module vous plonge au cœur des algorithmes fondamentaux de la 2D numérique : ' +
    'comprendre et programmer les modes de fusion, analyser et réétalonner les histogrammes de tonalité, ' +
    'et évaluer rigoureusement les trajectoires et tangentes de courbes de Bézier cubiques.',

  objectives: [
    'maîtriser les équations mathématiques des modes de fusion clés : Multiply (assombrissement), Screen (éclaircissement) et Overlay (contraste) ;',
    'analyser un histogramme de luminosité et comprendre le réglage des points noir, blanc et gamma (Levels) ;',
    'comprendre la formulation des courbes de Bézier polynomiales de Bernstein de degré 2 (quadratique) et degré 3 (cubique) ;',
    'calculer la position d’un point B(t) et les vecteurs tangents le long d’une courbe de Bézier ;',
    'distinguer les ordres de continuité géométrique G0/G1/G2 et paramétrique C0/C1/C2 à la jonction de courbes ;',
    'simuler des algorithmes de filtrage spatial, de masquage de calques et d’anti-aliasing.'
  ],

  sections: [
    {
      title: 'Algorithmique des Modes de Fusion de Calques',
      html: [
        '<p>La superposition de calques graphiques consiste à calculer la couleur finale résultante à partir de la couleur de base <code>A</code> (calque inférieur) et de la couleur du calque supérieur <code>B</code>. Dans un espace 8 bits normalisé dans [0.0, 1.0] (ou [0, 255]), les trois modes cardinaux sont :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Mode de fusion</th><th>Effet visuel</th><th>Formule sur [0, 255]</th><th>Élément neutre</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Multiply (Produit)</strong></td><td>Assombrit l’image en simulant deux diapositives superposées.</td><td><code>R = (A × B) / 255.0</code></td><td>Blanc (255) n’a aucun effet.</td></tr>',
        '    <tr><td><strong>Screen (Superposition)</strong></td><td>Éclaircit l’image en simulant la projection de deux faisceaux.</td><td><code>R = 255.0 - ((255 - A) × (255 - B)) / 255.0</code></td><td>Noir (0) n’a aucun effet.</td></tr>',
        '    <tr><td><strong>Overlay (Incrustation)</strong></td><td>Accentue le contraste : assombrit les tons sombres et éclaircit les tons clairs.</td><td>Si <code>A &lt; 128</code> : <code>(2·A·B)/255</code><br>Sinon : <code>255 - 2·(255-A)·(255-B)/255</code></td><td>Gris moyen (128) neutre.</td></tr>',
        '  </tbody>',
        '</table>',

        box(
          'tip',
          'Pourquoi Multiply et Screen sont-ils duaux ?',
          '<p>Le mode <strong>Screen</strong> est exactement l’inverse symétrique du mode Multiply : ' +
          'on inverse les couleurs (1 - x), on applique un Multiply, puis on réinverse le résultat. ' +
          'C’est pour cette raison que Multiply retient le noir tandis que Screen retient le blanc.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Histogrammes de Luminance &amp; Correction de Niveaux (Levels)',
      html: [
        '<p>L’histogramme d’une image représente la distribution statistique des pixels en fonction de leur luminosité (de 0 pour le noir absolu à 255 pour le blanc pur) :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Diagnostic de l’Histogramme</h4>',
        '    <ul>',
        '      <li><strong>Sous-exposition :</strong> Accumulation massive des pixels sur la gauche (près de 0), absence de tons clairs.</li>',
        '      <li><strong>Surexposition :</strong> Pics saturés sur la droite (près de 255), détails brûlés et irrécupérables.</li>',
        '      <li><strong>Faible contraste :</strong> Valeurs concentrées dans une bande étroite centrale, sans noirs francs ni blancs éclatants.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Étalonnage par les Niveaux (Levels)</h4>',
        '    <p>La transformation ré-étire l’intervalle utile <code>[in_black, in_white]</code> vers la plage complète <code>[0, 255]</code> :</p>',
        '    <pre><code>val_norm = (pixel - in_black) / (in_white - in_black)\\n' +
        'val_gamma = val_norm ** (1.0 / gamma)\\n' +
        'pixel_final = clamp(round(val_gamma * 255), 0, 255)</code></pre>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Courbes de Bézier Cubiques &amp; Tracés Vectoriels',
      html: [
        '<p>Développées par Pierre Bézier pour la conception de carrosseries chez Renault, les courbes de Bézier permettent de tracer des contours parfaits à l’aide de quelques points de contrôle :</p>',

        '<p>Une courbe cubique utilise 4 points : le point de départ <code>P0</code>, deux poignées de contrôle <code>P1</code> et <code>P2</code> régissant les tangentes, et le point d’arrivée <code>P3</code> :</p>',
        '<pre><code>B(t) = (1 - t)³ · P0 + 3(1 - t)²t · P1 + 3(1 - t)t² · P2 + t³ · P3    pour t ∈ [0, 1]</code></pre>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Type de Continuité</th><th>Définition géométrique</th><th>Contrainte sur les poignées</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>C0 / G0</strong></td><td>Continuité de position : les courbes se touchent.</td><td><code>P3_segmentA = P0_segmentB</code>.</td></tr>',
        '    <tr><td><strong>G1</strong></td><td>Continuité géométrique de tangente : jonction fluide sans angle vif.</td><td>Les points <code>P2_A</code>, le point de jonction et <code>P1_B</code> sont alignés.</td></tr>',
        '    <tr><td><strong>C1</strong></td><td>Continuité paramétrique : tangentes colinéaires et de même longueur.</td><td>Les vecteurs de poignées ont la même direction et la même amplitude.</td></tr>',
        '    <tr><td><strong>C2 / G2</strong></td><td>Continuité de courbure : accélération fluide sans à-coup visuel.</td><td>Dérivées secondes continues (utilisé en modélisation automobile et design de polices).</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Traitement d’Image et d’Évaluation Vectorielle de Bézier',
  method: [
    'Étape 1 — Définir le mode de fusion : Choisir Multiply pour incruster des ombres, Screen pour des lumières et reflets, ou Overlay pour dynamiser le contraste.',
    'Étape 2 — Appliquer la formule de fusion : Normaliser les composantes RVB sur [0.0, 1.0], exécuter l’opération arithmétique et ré-échantillonner sur [0, 255].',
    'Étape 3 — Inspecter l’histogramme de tonalité : Localiser les pics de distribution et ajuster les bornes noires, blanches et la médiane gamma (Levels).',
    'Étape 4 — Positionner les points de contrôle de Bézier : Fixer les ancres P0 et P3, puis orienter les tangentes de courbure via les poignées P1 et P2.',
    'Étape 5 — Évaluer la courbe polynomiale : Appliquer la formule de Bernstein pour le paramètre t souhaité (notamment t=0.5 pour le point médian).',
    'Étape 6 — Vérifier la continuité géométrique : Garantir l’alignement des poignées pour obtenir une jonction fluide de classe G1 entre segments.'
  ],

  summary: [
    'Le mode Multiply multiplie les valeurs normalisées des pixels et produit toujours une couleur égale ou plus sombre.',
    'Le mode Screen éclaircit l’image et préserve les hautes lumières sans saturer excessivement les tons moyens.',
    'Le mode Overlay accentue le contraste en appliquant Multiply aux ombres (A < 128) et Screen aux lumières (A >= 128).',
    'Un histogramme équilibré exploite toute l’étendue dynamique de 0 à 255 sans écrêtage massif aux extrêmes.',
    'Les courbes de Bézier cubiques combinent les points de contrôle via les polynômes de Bernstein de degré 3.',
    'L’alignement des poignées de contrôle de part et d’autre d’un nœud garantit au moins une continuité de tangente G1.'
  ],

  checklist: [
    'Je connais par cœur les formules arithmétiques de Multiply, Screen et Overlay.',
    'Je sais identifier un calque sous-exposé ou manquant de contraste à partir de son histogramme.',
    'Je sais appliquer la formule de Bézier cubique pour calculer les coordonnées d’un point à t=0.5.',
    'Je comprends la différence fondamentale entre continuité géométrique G1 et continuité paramétrique C1.',
    'Je comprends le rôle des masques d’écrêtage et des canaux alpha dans la composition 2D.'
  ],

  notions: [
    'Modes de fusion arithmétiques (Multiply, Screen, Overlay)',
    'Éléments neutres de fusion (Noir, Blanc, Gris 128)',
    'Histogramme de luminance et quantification',
    'Correction de niveaux (Points noir/blanc et gamma)',
    'Polynômes de Bernstein et courbes de Bézier',
    'Points de contrôle et vecteurs tangents',
    'Continuités géométriques G0, G1, G2 et paramétriques C0, C1',
    'Filtrage spatial et anti-aliasing'
  ],

  pitfalls: [
    'Diviser par 255 avant d’arrondir ou oublier la normalisation sur [0.0, 1.0] lors du calcul manuel des modes de fusion.',
    'Croire que déplacer une poignée de contrôle de Bézier déplace directement la courbe : elle attire la courbe sans que celle-ci ne passe nécessairement par la poignée.',
    'Confondre un masque de fusion (niveaux de gris modifiant l’opacité) et un masque d’écrêtage (découpage vectoriel ou basé sur la forme du calque inférieur).'
  ],

  questions: [
    {
      stem: 'Quelle formule définit le mode de fusion Multiply (Produit) pour deux pixels A et B dont les valeurs sont dans l’intervalle [0, 255] ?',
      opts: [
        'R = A + B',
        'R = (A * B) / 255.0',
        'R = max(A, B)',
        'R = sqrt(A * B)'
      ],
      correct: 1,
      exp: 'Multiply normalise les valeurs sur [0, 1], les multiplie, puis remet à l’échelle [0, 255], ce qui équivaut à (A * B) / 255.0.'
    },
    {
      stem: 'Quel est l’élément neutre du mode de fusion Screen (Superposition) ?',
      opts: [
        'Le blanc pur (255)',
        'Le noir pur (0)',
        'Le gris moyen (128)',
        'Le rouge pur (255, 0, 0)'
      ],
      correct: 1,
      exp: 'Dans le mode Screen, superposer du noir pur (valeur 0) ne modifie pas le calque inférieur (255 - ((255 - A) * 255) / 255 = A).'
    },
    {
      stem: 'Comment réagit le mode de fusion Overlay (Incrustation) face à une valeur de calque de base égale à 128 (gris moyen) ?',
      opts: [
        'Il rend l’image entièrement transparente',
        'Il laisse le calque supérieur inchangé ou agit comme pivot neutre de contraste',
        'Il inverse toutes les couleurs du calque',
        'Il supprime tous les pixels impairs'
      ],
      correct: 1,
      exp: 'Le gris moyen 128 est le point de bascule neutre d’Overlay : les pixels plus sombres sont assombris, les plus clairs sont éclaircis.'
    },
    {
      stem: 'Combien de points de contrôle au total définissent une courbe de Bézier cubique 2D standard ?',
      opts: [
        '2 points',
        '3 points',
        '4 points (2 extrémités et 2 poignées de contrôle)',
        '6 points'
      ],
      correct: 2,
      exp: 'Une courbe de Bézier cubique est régie par un polynôme de degré 3 comportant 4 coefficients : P0 (départ), P1 (tangente départ), P2 (tangente fin), et P3 (arrivée).'
    },
    {
      stem: 'À quelle valeur paramétrique t se situe le point médian d’une courbe de Bézier définie sur [0, 1] ?',
      opts: [
        't = 0.0',
        't = 0.5',
        't = 1.0',
        't = 2.0'
      ],
      correct: 1,
      exp: 'Le paramètre t varie de façon continue de 0.0 (origine P0) à 1.0 (destination P3) ; le milieu paramétrique correspond exactement à t = 0.5.'
    },
    {
      stem: 'Quelle condition garantit une continuité de tangente fluide de type G1 à la jonction de deux segments de courbe de Bézier ?',
      opts: [
        'Les deux segments doivent être de même couleur',
        'La dernière poignée du premier segment, le point d’ancrage commun et la première poignée du second segment doivent être colinéaires (alignés sur la même droite)',
        'Les deux segments doivent avoir exactement la même longueur',
        'Le paramètre t doit être égal à 0'
      ],
      correct: 1,
      exp: 'Pour que la transition soit lisse sans angle aigu (continuité G1), les tangentes entrante et sortante doivent partager la même direction.'
    },
    {
      stem: 'Que signifie un histogramme dont toutes les barres sont concentrées dans le quart gauche (valeurs 0 à 60) ?',
      opts: [
        'L’image est fortement sous-exposée et manque de tons clairs',
        'L’image est en très haute résolution 4K',
        'L’image est surexposée avec des zones brûlées',
        'L’image ne contient aucun pixel valide'
      ],
      correct: 0,
      exp: 'La concentration à gauche indique que l’immense majorité des pixels a une luminance très basse, typique d’une image sombre ou sous-exposée.'
    },
    {
      stem: 'Quel est le rôle d’un masque de fusion (Layer Mask) en infographie matricielle ?',
      opts: [
        'Supprimer définitivement les pixels indésirables du disque dur',
        'Définir l’opacité locale du calque de manière non-destructive grâce à une carte en niveaux de gris (le blanc révèle, le noir masque)',
        'Accélérer la fréquence de rafraîchissement de l’écran',
        'Changer la résolution DPI du document'
      ],
      correct: 1,
      exp: 'Le masque de fusion permet d’occulter des portions de calque sans détruire les données d’origine, préservant la possibilité de retouches ultérieures.'
    }
  ],

  flashcards: [
    {
      q: 'Quelle est la formule du mode de fusion Multiply ?',
      a: 'R = (A × B) / 255.0. Il assombrit toujours le calque inférieur, et le blanc est neutre.'
    },
    {
      q: 'Quelle est la formule du mode de fusion Screen ?',
      a: 'R = 255 - ((255 - A) × (255 - B)) / 255. Il éclaircit toujours, et le noir est neutre.'
    },
    {
      q: 'Comment fonctionne le mode Overlay ?',
      a: 'Il applique Multiply si le fond est sombre (< 128) et Screen si le fond est clair (≥ 128), renforçant le contraste.'
    },
    {
      q: 'Combien de points de contrôle possède une courbe de Bézier cubique ?',
      a: '4 points : 2 points d’ancrage aux extrémités (P0 et P3) et 2 poignées directrices de tangentes (P1 et P2).'
    },
    {
      q: 'Quelle est la condition géométrique pour une continuité G1 ?',
      a: 'Les deux poignées entourant le point de jonction doivent être parfaitement alignées avec ce point.'
    },
    {
      q: 'À quoi sert le réglage des Niveaux (Levels) ?',
      a: 'À étendre le contraste en ré-étirant les bornes utiles de l’histogramme vers la plage dynamique complète [0, 255].'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez les équations de Multiply, Screen et la géométrie des courbes de Bézier.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon niveau d’ensemble. Approfondissez les conditions de continuité C1/G1 et l’interprétation fine des histogrammes.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des mathématiques de la 2D et du traitement d’image.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les algorithmes de fusion et les courbes paramétriques au niveau expert.' }
  ]
};
