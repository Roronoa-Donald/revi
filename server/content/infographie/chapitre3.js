/**
 * Chapitre 3 du cours « Infographie B2 » — Texturing, Espace UV &amp; Cartographie de Relief (Normal Mapping).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Texturing, Espace UV &amp; Cartographie de Relief (Normal Mapping)',
  short: 'Textures &amp; UV Mapping',
  toc: 'Dépliage UV et coordonnées normalisées [0, 1], contraintes GPU des textures Power of Two (POT), atlas de textures (Texture Atlasing), filtrage bilinéaire et trilinéaire, cartographie de normales en espace tangent (Tangent Space Normal Maps) et encodage RVB.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un maillage 3D nu n’est qu’une carcasse de polygones grisâtres. Pour lui donner vie et réalisme, ' +
    'le pipeline graphique applique le processus de plaquage de textures (Texture Mapping). ' +
    'Cette opération exige d’établir une correspondance bidirectionnelle rigoureuse entre chaque sommet 3D (X, Y, Z) ' +
    'et un point sur une image 2D grâce aux coordonnées paramétriques UV. ' +
    'Pour optimiser la mémoire vidéo et les accès du processeur graphique (GPU), les textures doivent respecter ' +
    'des contraintes matérielles strictes : dimensions en puissances de deux (Power of Two), atlas de textures ' +
    'pour réduire les ruptures de rendu, et calcul d’effets de micro-reliefs via des Normal Maps encodées en espace tangent. ' +
    'Ce module décortique le cycle complet du texturing moderne : des calculs de coordonnées d’atlas jusqu’au ' +
    'décodage des normales de surface dans les shaders de pixels.',

  objectives: [
    'comprendre le principe du dépliage UV (UV Unwrapping) et l’échantillonnage de texels dans l’intervalle normalisé [0.0, 1.0] ;',
    'analyser la contrainte matérielle des textures en puissances de deux (POT : 256, 512, 1024, 2048) pour le GPU ;',
    'concevoir et découper un atlas de textures (Texture Atlas / Sprite Sheet) pour optimiser les appels de dessin ;',
    'distinguer les modes de filtrage de texture : Nearest Neighbor (pixels bruts), Bilinéaire et Trilinéaire ;',
    'maîtriser le fonctionnement physique et mathématique des Normal Maps en espace tangent (TBN) ;',
    'implémenter des décodeurs RVB vers vecteurs normaux 3D pour shaders de rendu en temps réel.'
  ],

  sections: [
    {
      title: 'Espace UV &amp; Contraintes Matérielles GPU (Power of Two)',
      html: [
        '<p>Chaque sommet d’un maillage 3D embarque, en plus de sa position dans l’espace, un couple de coordonnées de texture <code>(u, v)</code> :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Repère Normalisé UV</h4>',
        '    <ul>',
        '      <li><strong>Axe U :</strong> Coordonnée horizontale variant de 0.0 (gauche) à 1.0 (droite).</li>',
        '      <li><strong>Axe V :</strong> Coordonnée verticale variant de 0.0 (bas ou haut selon les API OpenGL/DirectX) à 1.0.</li>',
        '      <li><strong>Indépendance de résolution :</strong> Les coordonnées UV étant normalisées, on peut remplacer une texture 512x512 par une texture 2048x2048 sans modifier le maillage 3D.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Textures Power of Two (POT)</h4>',
        '    <ul>',
        '      <li><strong>Dimensions compatibles :</strong> <code>2^n</code> (ex: 64, 128, 256, 512, 1024, 2048, 4096).</li>',
        '      <li><strong>Bénéfice matériel :</strong> Adressage binaire ultra-rapide par décalage de bits (bitwise shift) au lieu de divisions coûteuses sur l’ALU du GPU.</li>',
        '      <li><strong>Chaîne de Mipmaps :</strong> Le GPU divise par 2 à chaque niveau jusqu’à 1x1 sans reste ni artefact de rééchantillonnage.</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        box(
          'tip',
          'Que se passe-t-il avec une texture NPOT (Non-Power of Two) ?',
          '<p>Les GPU récents supportent l’affichage des textures NPOT (ex: 800x600), mais avec des restrictions sévères : ' +
          'impossibilité de générer des chaînes de mipmaps matérielles complètes et désactivation du mode de répétition en boucle (Wrap / Repeat mode).</p>'
        )
      ].join('\n')
    },
    {
      title: 'Atlas de Textures &amp; Découpage de Sprites',
      html: [
        '<p>Dans un moteur de jeu ou une application graphique temps réel, chaque texture distincte implique un changement d’état sur le GPU. ' +
        'Pour maximiser les performances, on regroupe des dizaines d’éléments dans un <strong>atlas de textures</strong> unique :</p>',

        '<p>Pour une grille de <code>nb_cols</code> colonnes et <code>nb_rows</code> lignes, les coordonnées UV de la tuile située à la colonne <code>c</code> et à la ligne <code>r</code> se calculent selon :</p>',
        '<pre><code>u_min = (c * tuile_w) / atlas_W\\n' +
        'u_max = ((c + 1) * tuile_w) / atlas_W\\n' +
        'v_min = 1.0 - ((r + 1) * tuile_h) / atlas_H\\n' +
        'v_max = 1.0 - (r * tuile_h) / atlas_H</code></pre>',

        box(
          'standard',
          'Modes de Filtrage : Bilinéaire et Trilinéaire',
          '<p>Lorsque le pixel affiché à l’écran ne correspond pas exactement à un texel de la texture :</p>' +
          '<ul>' +
          '  <li><strong>Nearest Neighbor :</strong> Prend le texel le plus proche. Produit un effet pixelisé (style rétro).</li>' +
          '  <li><strong>Bilinéaire :</strong> Calcule une moyenne pondérée entre les 4 texels voisins les plus proches. Lisse les pixels.</li>' +
          '  <li><strong>Trilinéaire :</strong> Réalise un filtrage bilinéaire sur les deux niveaux de mipmaps adjacents et effectue une interpolation linéaire entre les deux. Élimine toute coupure visible lors des transitions de distance.</li>' +
          '</ul>'
        )
      ].join('\n')
    },
    {
      title: 'Cartographie de Relief : Normal Mapping en Espace Tangent',
      html: [
        '<p>Le <strong>Normal Mapping</strong> est la technique reine de l’infographie 3D pour simuler des micro-détails (briques, peau, gravures, boulons) sans alourdir le nombre de polygones du maillage :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Principe de Fonctionnement</h4>',
        '    <p>Une texture 2D stocke directement le vecteur normal 3D <code>(Nx, Ny, Nz)</code> sous forme de couleur <code>(R, V, B)</code>. ' +
        'Le pixel shader lit cette couleur, la convertit en vecteur, et l’utilise pour calculer les reflets et ombrages comme si la géométrie physique était bosselée.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Décodage Shader de l’Espace Tangent</h4>',
        '    <p>Les canaux couleur [0, 255] sont ré-étirés vers l’intervalle vectoriel [-1.0, 1.0] :</p>',
        '    <pre><code>Nx = (R / 255.0) * 2.0 - 1.0\\n' +
        'Ny = (G / 255.0) * 2.0 - 1.0\\n' +
        'Nz = (B / 255.0) * 2.0 - 1.0\\n' +
        'N = normalize(vec3(Nx, Ny, Nz))</code></pre>',
        '  </div>',
        '</div>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Couleur RVB</th><th>Vecteur Normal résultant</th><th>Orientation physique sur la face</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>(128, 128, 255)</code></td><td><code>(0.0, 0.0, 1.0)</code></td><td>Perpendiculaire parfaite (bleu ciel classique).</td></tr>',
        '    <tr><td><code>(255, 128, 128)</code></td><td><code>(1.0, 0.0, 0.0)</code></td><td>Pente inclinée vers la droite (+X / axe Tangente).</td></tr>',
        '    <tr><td><code>(128, 255, 128)</code></td><td><code>(0.0, 1.0, 0.0)</code></td><td>Pente inclinée vers le haut (+Y / axe Bitangente).</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Texturing, Dépliage UV et Décodage de Normal Maps',
  method: [
    'Étape 1 — Déplier le maillage en coordonnées UV : Projeter les sommets 3D sur le plan 2D normalisé [0.0, 1.0] en minimisant l’étirement (stretching).',
    'Étape 2 — Imposer la contrainte Power of Two (POT) : Dimensionner la texture en puissances de deux (ex: 1024x1024, 2048x2048) pour optimiser le GPU et les Mipmaps.',
    'Étape 3 — Agencer les assets dans un Texture Atlas : Regrouper les sous-textures et calculer précisément les plages [u_min, u_max] et [v_min, v_max].',
    'Étape 4 — Configurer le filtrage : Sélectionner le filtrage bilinéaire ou trilinéaire pour éviter l’effet de pixellisation et les ruptures de transitions.',
    'Étape 5 — Générer la Normal Map en espace tangent : Enregistrer les perturbations de normale sous forme de triplet RVB où le bleu (0, 0, 1) code la face plane.',
    'Étape 6 — Décoder dans le Fragment Shader : Transformer les composantes [0, 255] en vecteur unitaire [-1.0, 1.0] via la formule (RVB / 255) * 2 - 1.'
  ],

  summary: [
    'Les coordonnées de texture UV normalisées dans [0, 1] découplent la géométrie 3D de la résolution de l’image.',
    'Les textures en puissances de deux (POT) optimisent les adresses mémoire du GPU et autorisent des chaînes de mipmaps parfaites.',
    'L’atlas de textures regroupe plusieurs éléments pour minimiser les changements de matériaux et les Draw Calls.',
    'Le filtrage trilinéaire interpole entre les 4 texels voisins et entre les 2 niveaux de mipmaps les plus proches.',
    'Le bleu ciel (128, 128, 255) d’une normal map correspond au vecteur neutre (0, 0, 1) perpendiculaire à la surface.',
    'L’espace tangent (TBN : Tangente, Bitangente, Normale) permet d’appliquer la même normal map sur des objets animés ou déformés.'
  ],

  checklist: [
    'Je sais expliquer ce qu’est un texel et comment il se mappe sur un pixel de l’écran.',
    'Je connais la règle des dimensions en puissances de deux (POT : 256, 512, 1024, 2048).',
    'Je sais calculer les coordonnées UV de découpage d’un sous-élément dans un atlas de sprites.',
    'Je comprends la différence entre filtrage bilinéaire et trilinéaire.',
    'Je maîtrise la formule de transformation entre couleur RVB et vecteur normal unitaire dans un shader.'
  ],

  notions: [
    'Dépliage UV et coordonnées paramétriques (u, v)',
    'Textures Power of Two (POT) vs NPOT',
    'Atlas de textures (Texture Atlasing / Spritesheets)',
    'Filtrage bilinéaire, trilinéaire et anisotrope',
    'Normal Mapping en espace tangent (Tangent Space)',
    'Repère TBN (Tangente, Bitangente, Normale)',
    'Encodage et décodage vectoriel RVB dans les shaders'
  ],

  pitfalls: [
    'Utiliser des textures de dimensions arbitraires (ex: 1000x750) dans un moteur 3D temps réel, empêchant l’utilisation optimale du cache et des mipmaps.',
    'Oublier de normaliser le vecteur normal après décodage de la Normal Map, ce qui provoque des aberrations d’intensité lumineuse.',
    'Confondre l’espace tangent (relatif à la surface du triangle) et l’espace monde (absolu dans la scène 3D).'
  ],

  questions: [
    {
      stem: 'Quel intervalle de valeurs standard les coordonnées de texture UV utilisent-elles pour couvrir l’intégralité d’une image ?',
      opts: [
        'De -1.0 à +1.0',
        'De 0.0 à 1.0',
        'De 0 à 255',
        'De 0 à 1024'
      ],
      correct: 1,
      exp: 'Les coordonnées UV sont normalisées : (0, 0) correspond à un coin de la texture et (1, 1) au coin diagonalement opposé.'
    },
    {
      stem: 'Pourquoi exige-t-on traditionnellement que les textures 3D aient des dimensions en puissances de deux (Power of Two : 512, 1024, 2048) ?',
      opts: [
        'Parce que le GPU calcule les adresses mémoire par de simples décalages de bits binaires et nécessite des dimensions divisibles par 2 pour générer la chaîne de mipmaps',
        'Parce que les câbles HDMI ne supportent que les puissances de deux',
        'Pour réduire le prix de vente de la carte graphique',
        'Pour empêcher la copie illégale des textures'
      ],
      correct: 0,
      exp: 'La division binaire par 2 s’effectue en un seul cycle d’horloge (bit shift), garantissant des accès mémoire ultra-rapides et des mipmaps sans reste.'
    },
    {
      stem: 'Quel est l’intérêt architectural majeur de concevoir un « Texture Atlas » regroupant plusieurs textures d’objets dans un seul grand fichier image ?',
      opts: [
        'Augmenter le nombre de polygones du modèle 3D',
        'Réduire le nombre de changements de matériaux et de Draw Calls envoyés par le CPU au processeur graphique',
        'Désactiver la carte son de la machine',
        'Accélérer la connexion Wi-Fi'
      ],
      correct: 1,
      exp: 'Chaque texture distincte oblige le pilote GPU à changer d’état (Texture Binding). Un atlas permet de rendre des dizaines d’objets en un seul appel groupé.'
    },
    {
      stem: 'Quel type de filtrage de texture interpole à la fois entre les 4 texels voisins et entre les deux niveaux de mipmaps adjacents ?',
      opts: [
        'Nearest Neighbor',
        'Filtrage bilinéaire',
        'Filtrage trilinéaire',
        'Filtrage par seuillage'
      ],
      correct: 2,
      exp: 'Le filtrage trilinéaire combine un filtrage bilinéaire sur chaque niveau de mipmap et une interpolation linéaire entre les deux niveaux consécutifs.'
    },
    {
      stem: 'Dans une Normal Map en espace tangent, quelle couleur représente une surface parfaitement plane dont la normale pointe droit vers l’extérieur ?',
      opts: [
        'Rouge pur (255, 0, 0)',
        'Vert pur (0, 255, 0)',
        'Bleu ciel neutre (128, 128, 255)',
        'Noir pur (0, 0, 0)'
      ],
      correct: 2,
      exp: 'Après décodage shader : R=128 donne Nx≈0, V=128 donne Ny≈0, et B=255 donne Nz=+1. Le vecteur est (0, 0, 1), perpendiculaire à la face.'
    },
    {
      stem: 'Quelle formule de shader convertit la composante de couleur rouge R (comprise entre 0 et 255) en composante de normale spatiale Nx (comprise entre -1.0 et +1.0) ?',
      opts: [
        'Nx = R / 255.0',
        'Nx = (R / 255.0) * 2.0 - 1.0',
        'Nx = R - 128.0',
        'Nx = 1.0 - (R / 128.0)'
      ],
      correct: 1,
      exp: 'R / 255 normalise sur [0, 1]. En multipliant par 2 puis en soustrayant 1, on remet à l’échelle sur l’intervalle symétrique [-1.0, 1.0].'
    },
    {
      stem: 'Quelle composante géométrique manque-t-il si un maillage 3D possède des positions (X, Y, Z) et des normales (Nx, Ny, Nz) mais pas de tangentes (T) pour utiliser une Normal Map en espace tangent ?',
      opts: [
        'Le repère TBN ne peut pas être construit et les perturbations de la normale ne peuvent pas être alignées sur la surface',
        'Le processeur refuse de démarrer',
        'L’écran passe automatiquement en noir et blanc',
        'La texture devient invisible'
      ],
      correct: 0,
      exp: 'Le repère TBN (Tangente, Bitangente, Normale) est indispensable pour transformer le vecteur lu dans la texture tangent-space vers l’espace monde ou objet.'
    },
    {
      stem: 'Que permet le filtrage anisotrope par rapport au filtrage trilinéaire standard ?',
      opts: [
        'Il augmente la vitesse du ventilateur du GPU',
        'Il améliore considérablement la netteté des textures observées sous un angle de vue très rasant (ex: sol fuyant vers l’horizon)',
        'Il compresse les fichiers MP3',
        'Il divise la consommation électrique par deux'
      ],
      correct: 1,
      exp: 'L’anisotropie échantillonne la texture selon une ellipse non-isotrope, évitant le flou excessif lorsque la surface est fortement inclinée par rapport à la caméra.'
    }
  ],

  flashcards: [
    {
      q: 'Que représentent les coordonnées UV ?',
      a: 'Des coordonnées normalisées [0, 1] associant chaque sommet 3D à un point 2D sur la texture.'
    },
    {
      q: 'Qu’est-ce qu’une texture Power of Two (POT) ?',
      a: 'Une texture dont la largeur et la hauteur sont des puissances de deux (256, 512, 1024, etc.), optimale pour le GPU.'
    },
    {
      q: 'Pourquoi utilise-t-on des atlas de textures ?',
      a: 'Pour regrouper de nombreuses textures en une seule image, évitant les changements d’état et réduisant les Draw Calls.'
    },
    {
      q: 'Quelle est la différence entre filtrage bilinéaire et trilinéaire ?',
      a: 'Le bilinéaire interpole 4 texels voisins ; le trilinéaire interpole en plus entre deux niveaux de mipmaps adjacents.'
    },
    {
      q: 'Pourquoi une Normal Map apparaît-elle bleu ciel ?',
      a: 'Parce que le canal bleu (Z=+1) domine pour indiquer une normale pointant perpendiculairement à la surface (128, 128, 255).'
    },
    {
      q: 'Comment décoder un canal couleur [0, 255] en composante normale [-1, 1] ?',
      a: 'Par la transformation linéaire : (C / 255.0) × 2.0 - 1.0.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez les coordonnées UV normalisées, les contraintes POT et la signification du bleu dans les Normal Maps.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle de connaissances. Approfondissez le calcul de découpage d’atlas et le repère TBN.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise du texturing et des shaders de relief.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les coordonnées UV et le Normal Mapping au niveau d’un ingénieur rendu 3D.' }
  ]
};
