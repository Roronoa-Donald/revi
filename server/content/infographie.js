/**
 * Contenu du cours « Infographie B2 » (dossier `infographie/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier infographie/.
 */
'use strict';

const chapitres = [
  ...require('./infographie/chapitres-1-3'),
  ...require('./infographie/chapitres-4-6')
];

const pages = require('./infographie/pages');

const course = {
  id: 'infographie',
  slug: 'infographie',
  brand: 'Infographie B2',
  brandIcon: 'image',

  // Rose 700 / 800 accessible conforme WCAG AA / AAA (6.28:1 / 8.01:1 sur blanc)
  accent: '#be123c',
  accentDeep: '#9f1239',
  accentSoft: '#fff1f2',
  accentBorder: '#fecdd3',

  storeKey: 'b2infographie:progress',

  title: 'Infographie B2 — Colorimétrie, Vectoriel, Texturing, Modélisation 3D &amp; Rendu PBR',
  description:
    'Formation complète à l’infographie numérique 2D et 3D et aux pipelines graphiques temps réel : ' +
    'physique de la lumière et synthèses de couleur additive RVB et soustractive CMJN, espaces colorimétriques sRVB vs RVB linéaire (courbe gamma 2.2), ' +
    'résolution spatiale DPI/PPI et typologie des formats (SVG vectoriel, PNG sans perte, JPEG avec compression DCT, WebP moderne), ' +
    'modes de fusion de calques (Multiply, Screen, Overlay), histogrammes de luminance et correction de niveaux (Levels), ' +
    'tracés vectoriels, courbes de Bézier cubiques et polynômes de Bernstein, continuités géométriques G0/G1/G2 et paramétriques C0/C1, ' +
    'dépliage UV et coordonnées paramétriques normalisées [0, 1], contraintes GPU des textures Power of Two (POT), ' +
    'atlas de textures (Texture Atlasing), modes de filtrage bilinéaire et trilinéaire, cartographie de relief par Normal Maps en espace tangent (TBN), ' +
    'maillages polygonaux triangulés, winding order CCW et Back-Face Culling, calcul de la normale unitaire par produit vectoriel, ' +
    'composition des transformations affines 4x4 en coordonnées homogènes (ordre canonique Scale -&gt; Rotation -&gt; Translation TRS), ' +
    'systèmes de niveaux de détail (LOD), pipeline programmable (Vertex &amp; Fragment Shaders), modèles d’illumination de Lambert et de Blinn-Phong, ' +
    'rendu basé sur la physique (PBR), approximation de Fresnel de Schlick, règle cardinale de conservation de l’énergie, ' +
    'et optimisation GPU de production (compression par blocs BC1/BC7/ASTC, réduction des Draw Calls par Static Batching et calcul du surcoût de +33.3 % des chaînes de Mipmaps).',
  lead:
    'Maîtrisez les fondements mathématiques et techniques de la création visuelle numérique et du rendu 3D temps réel. ' +
    'Six chapitres complets combinant théories de l’image, algorithmes géométriques, 18 ateliers de programmation Python et QCM d’évaluation.',

  sources: 'les spécifications Khronos Group (OpenGL, Vulkan), les documentations officielles Blender, Unity et Unreal Engine, et les traités de référence Real-Time Rendering',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
