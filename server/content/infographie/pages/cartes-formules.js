/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Infographie B2 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active Infographie</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts indispensables : Colorimétrie &amp; Formats, Calques &amp; Bézier, Textures UV &amp; Normal Mapping, Géométrie 3D &amp; TRS, Éclairage &amp; Shaders PBR, Optimisation GPU &amp; Mipmaps.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento Infographie' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Infographie B2 : notions clés des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento des Formules, Algorithmes &amp; Pipelines Graphiques</h1>',
    '  <p class="lead">Guide de référence rapide : conversions colorimétriques, polynômes de Bézier, calculs matriciels TRS, équations de shaders d’éclairage et métriques d’optimisation GPU.</p>',
    '',
    '  <h2>1. Espaces Colorimétriques &amp; Résolutions</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Espace / Notions</th><th>Type</th><th>Formule ou Caractéristique clé</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>RVB (Synthèse additive)</strong></td><td>Écrans / Web</td><td>Composantes R, V, B dans [0, 255] ou [0.0, 1.0]. Mélange total R=V=B=255 = Blanc pur.</td></tr>',
    '      <tr><td><strong>CMJN (Synthèse soustractive)</strong></td><td>Imprimerie</td><td>C = (1-r-k)/(1-k), M = (1-v-k)/(1-k), J = (1-b-k)/(1-k), K = 1 - max(r, v, b).</td></tr>',
    '      <tr><td><strong>sRVB vs RVB linéaire</strong></td><td>Gamma</td><td>Affichage écran avec correction gamma ~2.2. Les calculs physiques de shaders s’exécutent toujours en espace linéaire.</td></tr>',
    '      <tr><td><strong>DPI vs PPI</strong></td><td>Résolution</td><td>Taille imprimée = (Pixels / DPI) * 2.54 cm. 300 DPI pour impression d’art, 72–150 PPI pour écran.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Algorithmes Vectoriels &amp; Modes de Fusion</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Opération</th><th>Application</th><th>Formule mathématique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Bézier Cubique</strong></td><td>Courbes vectorielles</td><td>B(t) = (1-t)³·P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³·P3 pour t ∈ [0, 1].</td></tr>',
    '      <tr><td><strong>Fusion Multiply</strong></td><td>Ombres / Assombrissement</td><td>R = (A × B) / 255.0. Le blanc (255) est l’élément neutre.</td></tr>',
    '      <tr><td><strong>Fusion Screen</strong></td><td>Lueurs / Éclaircissement</td><td>R = 255.0 - ((255 - A) × (255 - B)) / 255.0. Le noir (0) est neutre.</td></tr>',
    '      <tr><td><strong>Fusion Overlay</strong></td><td>Contraste / Incrustation</td><td>Si A &lt; 128 : (2·A·B)/255 sinon 255 - 2·(255-A)·(255-B)/255.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Texturing, Espace UV &amp; Normal Mapping</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Concept</th><th>Rôle technique</th><th>Formule ou Propriété</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Coordonnées UV</strong></td><td>Plaquage 2D sur 3D</td><td>U ∈ [0, 1] horizontal, V ∈ [0, 1] vertical (origine souvent en bas à gauche ou haut à gauche).</td></tr>',
    '      <tr><td><strong>Atlas de Sprites</strong></td><td>Regroupement de textures</td><td>u_min = c·cw/W, u_max = (c+1)·cw/W, v_min = 1 - (r+1)·ch/H, v_max = 1 - r·ch/H.</td></tr>',
    '      <tr><td><strong>Normal Map Tangente</strong></td><td>Micro-reliefs de surface</td><td>Vecteur (Nx, Ny, Nz) = (2·R/255 - 1, 2·G/255 - 1, 2·B/255 - 1) normalisé à 1.0.</td></tr>',
    '      <tr><td><strong>Bleu neutre (128, 128, 255)</strong></td><td>Normale perpendiculaire</td><td>Correspond au vecteur (0, 0, 1) orienté droit vers l’extérieur de la face.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Modélisation 3D, Maillages &amp; Transformations TRS</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Transformation / Mesure</th><th>Opération</th><th>Formule matricielle / Vectorielle</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Normale de face</strong></td><td>Produit vectoriel de triangle</td><td>n = (B - A) × (C - A) puis N = n / ||n|| pour orienter l’éclairage.</td></tr>',
    '      <tr><td><strong>Transformation TRS</strong></td><td>Mise à l’échelle, Rotation, Translation</td><td>P\' = T · R · S · P. L’ordre canonique applique Scale en premier, puis Rotation, puis Translation.</td></tr>',
    '      <tr><td><strong>Niveaux de Détail (LOD)</strong></td><td>Allègement géométrique</td><td>LOD 0 (100% polygones à distance &lt; d1), LOD 1 (50% sommets), LOD 2 (20% sommets à longue distance).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Équations d’Éclairage &amp; Shaders PBR</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Modèle d’ombrage</th><th>Type d’interaction</th><th>Formule physique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Loi de Lambert</strong></td><td>Lumière diffuse</td><td>Id = max(0.0, N · L) proportionnelle au cosinus de l’angle d’incidence.</td></tr>',
    '      <tr><td><strong>Modèle de Phong</strong></td><td>Reflet spéculaire</td><td>Is = max(0.0, R · V)^shininess où R = 2(N·L)N - L.</td></tr>',
    '      <tr><td><strong>PBR &amp; Énergie</strong></td><td>Conservation de l’énergie</td><td>Lumière totale = Diffuse + Spéculaire ≤ Lumière incidente. Kd + Ks ≤ 1.0.</td></tr>',
    '      <tr><td><strong>Effet Fresnel (Schlick)</strong></td><td>Réflectance selon angle</td><td>F(θ) = F0 + (1 - F0)·(1 - cos θ)⁵. Les surfaces reflètent davantage sous incidence rasante.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Optimisation GPU &amp; Pipeline Temps Réel</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Technique d’optimisation</th><th>Goulot d’étranglement ciblé</th><th>Gain mesurable</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Compression BC1 / BC7 / ASTC</strong></td><td>Bande passante mémoire VRAM</td><td>Ratio de 4x à 16x de réduction de taille par rapport à RGBA8 non compressé.</td></tr>',
    '      <tr><td><strong>Static Batching</strong></td><td>CPU Draw Calls</td><td>Fusionne plusieurs objets partageant un matériau en un seul appel de rendu GPU.</td></tr>',
    '      <tr><td><strong>Chaîne de Mipmaps</strong></td><td>Cache de texture &amp; Aliasing</td><td>Génère des versions demi-résolution jusqu’à 1x1. Surcoût VRAM constant de +33.3%.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <div class="tip">',
    '    <p><strong>Règle d’or du débogage de shader :</strong> Si un maillage apparaît entièrement noir sous une source de lumière, vérifiez en premier lieu que les normales unitaires sont bien orientées vers l’extérieur et que les coordonnées de normales ont été transformées par la matrice normale inverse transposée.</p>',
    '  </div>',
    '',
    chnav({ href: 'cartes.html', label: 'Consulter les cartes de révision' }, { href: 'exercices.html', label: 'Passer aux exercices d’application' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Formules et Mémento — ' + course.brand,
      description: 'Mémento technique et formules clés du cours Infographie B2 : colorimétrie, Bézier, shaders PBR et optimisation GPU.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
