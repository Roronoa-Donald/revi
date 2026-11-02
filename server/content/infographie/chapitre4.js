/**
 * Chapitre 4 du cours « Infographie B2 » — Modélisation 3D, Maillages Polygonaux &amp; Transformations TRS.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Modélisation 3D, Maillages Polygonaux &amp; Transformations TRS',
  short: 'Modélisation 3D &amp; TRS',
  toc: 'Structure des maillages (Sommets, Arêtes, Faces triangulaires), sens de parcours (Winding Order) et Back-Face Culling, calcul de normale unitaire par produit vectoriel, matrices de transformations affines 4x4 (Translation, Rotation, Scale TRS) et Niveaux de Détail (LOD).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Dans l’univers de la 3D numérique, tout objet complexe — du personnage articulé au décor architectural — ' +
    'est discrétisé sous forme d’un maillage polygonal (Polygon Mesh). ' +
    'Les surfaces sont souvent décomposées en triangles pour le rendu temps réel : ' +
    'trois sommets non alignés définissent un plan unique et une normale orientée par leur ordre. ' +
    'Cependant, manipuler des maillages exige une rigueur mathématique sans faille : ' +
    'l’ordre des sommets (Winding Order) détermine si une face regarde la caméra ou doit être ignorée (Back-Face Culling), ' +
    'les transformations géométriques obéissent à des multiplications de matrices affines 4x4 non-commutatives, ' +
    'et la performance requiert d’adapter la densité polygonale à la distance de la caméra (Niveaux de Détail LOD). ' +
    'Ce quatrième module structure les fondements mathématiques et géométriques indispensables pour tout développeur 3D.',

  objectives: [
    'analyser la structure de données d’un maillage 3D (buffers de sommets VBO, index de faces EBO, normales, UVs) ;',
    'comprendre l’importance du sens de parcours (Counter-Clockwise CCW) et le mécanisme de Back-Face Culling ;',
    'calculer le vecteur normal unitaire d’un triangle par produit vectoriel de deux vecteurs directeurs ;',
    'maîtriser la composition des matrices de transformations affines 4x4 en coordonnées homogènes (TRS) ;',
    'expliquer pourquoi l’ordre canonique Scale -&gt; Rotation -&gt; Translation est impératif pour éviter les déformations ;',
    'implémenter des algorithmes de sélection de Niveaux de Détail (LOD - Level of Detail) en fonction de la distance caméra.'
  ],

  sections: [
    {
      title: 'Maillages Polygonaux, Triangulation &amp; Back-Face Culling',
      html: [
        '<p>Un maillage 3D est un ensemble de primitives géométriques reliées entre elles :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Pourquoi utiliser des triangles pour les surfaces ?</h4>',
        '    <ul>',
        '      <li><strong>Planéité :</strong> trois points non alignés définissent un plan unique. S’ils sont alignés ou confondus, le triangle est dégénéré et sa normale unitaire n’est pas définie. Un quadrangle peut être voilé.</li>',
        '      <li><strong>Optimisation matérielle :</strong> Les pipelines de rasterisation des GPU sont câblés en silicium pour découper et interpoler des triangles en parallèle.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Sens de Parcours (Winding Order) &amp; Culling</h4>',
        '    <ul>',
        '      <li><strong>Sens anti-horaire (CCW) :</strong> Par convention (OpenGL/Vulkan), les sommets A, B, C ordonnés dans le sens trigonométrique indiquent une face avant (Front Face).</li>',
        '      <li><strong>Back-Face Culling :</strong> Élimine instantanément ~50 % des triangles de la scène (ceux qui tournent le dos à la caméra), doublant les performances du GPU.</li>',
        '    </ul>',
        '  </div>',
        '</div>',

        box(
          'tip',
          'Calcul de la Normale de Face par Produit Vectoriel',
          '<p>Soit un triangle non dégénéré défini par les sommets non alignés <code>A</code>, <code>B</code> et <code>C</code> :</p>' +
          '<pre><code>u = B - A    (vecteur directeur 1)\n' +
          'v = C - A    (vecteur directeur 2)\n' +
          'n = u × v    (produit vectoriel orthogonal)\n' +
          'nx = u.y * v.z - u.z * v.y\n' +
          'ny = u.z * v.x - u.x * v.z\n' +
          'nz = u.x * v.y - u.y * v.x\n' +
          'N = n / ||n|| (normale unitaire de longueur 1.0)</code></pre>' +
          '<p>Si la norme de <code>n</code> est nulle, aucune normale unitaire ne peut être calculée : ne pas diviser par zéro. Les API graphiques acceptent aussi des primitives de points et de lignes.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Transformations Affines 3D &amp; Ordre Matriciel TRS',
      html: [
        '<p>Pour manipuler un objet dans l’espace tridimensionnel sans perte d’information, on utilise des matrices 4x4 en <strong>coordonnées homogènes</strong> <code>(x, y, z, w=1)</code> :</p>',

        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Scale (Mise à l’échelle)</h4>',
        '    <p>Multiplie les coordonnées par des facteurs <code>(sx, sy, sz)</code>. S’applique par rapport à l’origine locale <code>(0,0,0)</code> de l’objet.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Rotation (Orientation)</h4>',
        '    <p>Fait tourner l’objet autour de ses axes locaux (angles d’Euler ou quaternions). Doit s’appliquer avant toute translation.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Translation (Position)</h4>',
        '    <p>Déplace le centre de l’objet vers sa position finale dans l’espace monde <code>(tx, ty, tz)</code>.</p>',
        '  </div>',
        '</div>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Ordre d’application au point P</th><th>Formule matricielle</th><th>Conséquence géométrique</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Canonique : Scale -&gt; Rotation -&gt; Translation</strong></td><td><code>P\' = T · R · S · P</code></td><td>L’objet grandit sur place, pivote sur lui-même, puis se déplace. Comportement naturel attendu.</td></tr>',
        '    <tr><td><strong>Erroné : Translation -&gt; Rotation -&gt; Scale</strong></td><td><code>P\' = S · R · T · P</code></td><td>L’objet tourne en orbite autour de l’origine du monde et sa forme est cisaillée par l’échelle.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Niveaux de Détail (LOD - Level of Detail)',
      html: [
        '<p>Afficher un modèle haute définition de 100 000 polygones lorsqu’il ne fait que 10 pixels de haut à l’écran est un gaspillage majeur de ressources GPU. La technique du <strong>LOD</strong> adapte la complexité géométrique à la distance :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Palier LOD</th><th>Distance à la caméra</th><th>Pourcentage de polygones</th><th>Usage type</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>LOD 0</strong></td><td>Proche (&lt; 15 m)</td><td>100 % (maillage complet haute fidélité)</td><td>Vue subjective, gros plan cinématique.</td></tr>',
        '    <tr><td><strong>LOD 1</strong></td><td>Moyenne (15 m à 40 m)</td><td>~50 % (arêtes fusionnées par décimation)</td><td>Plan moyen, silhouette détaillée.</td></tr>',
        '    <tr><td><strong>LOD 2</strong></td><td>Lointaine (&gt; 40 m)</td><td>~20 % (forme cubique simplifiée / billboard)</td><td>Arrière-plan lointain, horizon.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Modélisation Géométrique et de Transformation TRS',
  method: [
    'Étape 1 — Définir les sommets et faces : Structurer la surface en triangles non dégénérés et ordonner leurs sommets selon la convention choisie.',
    'Étape 2 — Calculer la normale unitaire : Calculer n = (B - A) × (C - A), puis N = n / ||n|| seulement si la norme est non nulle.',
    'Étape 3 — Configurer le Back-Face Culling : Activer l’élimination des faces arrière pour doubler le débit de rasterisation sur les volumes fermés.',
    'Étape 4 — Composer les transformations géométriques : Multiplier les matrices affines dans l’ordre canonique TRS : Scale en premier, puis Rotation, puis Translation.',
    'Étape 5 — Projeter en coordonnées homogènes : Appliquer la transformation 4x4 au point P(x, y, z, 1) pour obtenir sa position monde sans distorsion orbitale.',
    'Étape 6 — Générer les paliers de LOD : Créer des versions décimées à 50 % et 20 % de polygones pour alléger la charge GPU selon la distance caméra.'
  ],

  summary: [
    'Trois sommets non alignés définissent une face triangulaire plane ; les API graphiques proposent aussi des points et des lignes.',
    'Le sens de parcours CCW (Counter-Clockwise) définit la face avant et active le Back-Face Culling.',
    'Le produit vectoriel u × v de deux arêtes d’un triangle produit un vecteur orthogonal à la face.',
    'Une normale doit impérativement être normalisée (divisée par sa norme) pour que les calculs d’ombrage soient exacts.',
    'L’ordre canonique de multiplication matricielle est Translation × Rotation × Scale appliquée au sommet.',
    'Le système de LOD réduit le nombre de polygones des objets lointains sans dégradation perceptible pour le joueur.'
  ],

  checklist: [
    'Je sais expliquer pourquoi les quads sont systématiquement découpés en triangles pour le GPU.',
    'Je comprends comment le Back-Face Culling permet d’ignorer la moitié des faces d’un maillage fermé.',
    'Je sais calculer les composantes (nx, ny, nz) d’un produit vectoriel de deux vecteurs 3D.',
    'Je connais l’ordre canonique TRS et je sais pourquoi il ne doit pas être inversé.',
    'Je comprends la règle de sélection de LOD selon la distance à la caméra.'
  ],

  notions: [
    'Maillages polygonaux (Vertices, Edges, Faces)',
    'Triangulation et planéité géométrique',
    'Sens de parcours (Winding Order CCW vs CW)',
    'Élimination des faces arrière (Back-Face Culling)',
    'Produit vectoriel (Cross Product) et normale de face',
    'Coordonnées homogènes 4D et matrices 4x4',
    'Ordre des transformations affines TRS (Scale, Rotate, Translate)',
    'Niveaux de Détail géométriques (LOD)'
  ],

  pitfalls: [
    'Inverser l’ordre de deux sommets d’un triangle (ex: CW au lieu de CCW), ce qui retourne la normale vers l’intérieur et rend le triangle invisible à cause du Back-Face Culling.',
    'Appliquer la translation avant la rotation : l’objet effectue une révolution orbitale au lieu de tourner sur son propre centre de masse.',
    'Oublier de normaliser le résultat du produit vectoriel : la longueur de la normale fausse les équations de réflectance diffuse.'
  ],

  questions: [
    {
      stem: 'Pourquoi utilise-t-on souvent des triangles non dégénérés pour représenter une surface 3D ?',
      opts: [
        'Parce que les triangles consomment moins d’électricité que les carrés',
        'Parce que trois sommets non alignés définissent un plan unique et une face sans torsion',
        'Parce que les cartes mères ne savent compter que jusqu’à 3',
        'Pour des raisons purement esthétiques'
      ],
      correct: 1,
      exp: 'Trois points non alignés définissent un plan unique. Des points alignés produisent un triangle dégénéré sans normale unitaire ; les API graphiques gèrent aussi des points et des lignes.'
    },
    {
      stem: 'Quel est le rôle du mécanisme de « Back-Face Culling » dans un moteur de rendu 3D ?',
      opts: [
        'Changer la couleur du fond d’écran',
        'Rejeter avant le calcul d’ombrage tous les triangles dont la normale pointe à l’opposé de la caméra, éliminant environ 50 % des faces invisibles',
        'Augmenter le volume sonore des dialogues',
        'Sauvegarder la partie sur disque dur'
      ],
      correct: 1,
      exp: 'Sur un objet fermé (sphère, personnage, véhicule), les faces arrière sont masquées par les faces avant. Les éliminer d’emblée divise le travail de rasterisation par deux.'
    },
    {
      stem: 'Quelle opération mathématique entre deux vecteurs directeurs u et v d’un triangle produit un vecteur orthogonal à la surface ?',
      opts: [
        'Le produit scalaire (Dot Product)',
        'Le produit vectoriel (Cross Product)',
        'L’addition vectorielle',
        'La division composante par composante'
      ],
      correct: 1,
      exp: 'Le produit vectoriel u × v génère par définition un vecteur perpendiculaire au plan formé par u et v, orienté selon la règle de la main droite.'
    },
    {
      stem: 'Dans quel ordre canonique les transformations affines doivent-elles être composées matriciellement pour transformer un sommet P sans déformation orbitale parasite ?',
      opts: [
        'P\' = Scale · Translation · Rotation · P',
        'P\' = Translation · Rotation · Scale · P',
        'P\' = Rotation · Scale · Translation · P',
        'L’ordre n’a aucune importance car la multiplication matricielle est commutative'
      ],
      correct: 1,
      exp: 'Les matrices s’appliquent de droite à gauche : d’abord l’échelle (S) par rapport à l’origine, puis la rotation (R) autour des axes locaux, et enfin la translation (T) vers la position monde.'
    },
    {
      stem: 'Que se passe-t-il si un programmeur applique une translation T AVANT d’appliquer une rotation R sur un objet 3D ?',
      opts: [
        'Le programme plante immédiatement',
        'L’objet pivote autour de l’origine du monde (révolution orbitale) au lieu de pivoter sur son propre centre de gravité',
        'L’objet devient invisible',
        'La résolution de l’écran diminue'
      ],
      correct: 1,
      exp: 'Si la translation est effectuée en premier, le centre de l’objet s’éloigne de l’origine ; la rotation ultérieure le fait alors décrire un grand cercle autour de l’origine.'
    },
    {
      stem: 'Pourquoi utilise-t-on des coordonnées homogènes à 4 composantes (X, Y, Z, W=1) et des matrices 4x4 plutôt que des matrices 3x3 en géométrie 3D ?',
      opts: [
        'Pour pouvoir représenter les translations et les projections perspectives sous forme de simples multiplications matricielles linéaires',
        'Parce que le chiffre 4 porte chance',
        'Pour doubler la mémoire vive consommée',
        'Pour empêcher les attaques par injection SQL'
      ],
      correct: 0,
      exp: 'En 3D euclidienne (3x3), la translation est une addition (P + T). En coordonnées homogènes 4x4, elle devient une multiplication linéaire unifiée avec la rotation et le scale.'
    },
    {
      stem: 'Quel est l’objectif principal des Niveaux de Détail (LOD - Level of Detail) dans un jeu vidéo 3D ?',
      opts: [
        'Changer la musique selon la zone',
        'Substituer un maillage allégé comptant moins de polygones lorsque l’objet s’éloigne de la caméra, réduisant la charge géométrique du GPU',
        'Empêcher le joueur de tricher',
        'Ajouter des armes supplémentaires'
      ],
      correct: 1,
      exp: 'À grande distance, un objet occupe très peu de pixels. Utiliser un modèle simplifié de quelques centaines de polygones au lieu de 50 000 économise massivement le temps de calcul.'
    },
    {
      stem: 'Quelle formule donne la norme (longueur euclidienne) d’un vecteur 3D n = (nx, ny, nz) pour le normaliser ?',
      opts: [
        'norme = nx + ny + nz',
        'norme = sqrt(nx*nx + ny*ny + nz*nz)',
        'norme = max(nx, ny, nz)',
        'norme = nx * ny * nz'
      ],
      correct: 1,
      exp: 'La norme euclidienne correspond à la racine carrée de la somme des carrés des trois composantes cartésiennes.'
    }
  ],

  flashcards: [
    {
      q: 'Pourquoi les moteurs 3D utilisent-ils des triangles ?',
      a: 'Trois sommets non alignés définissent une face plane sans torsion ; les triangles sont souvent utilisés pour les surfaces, mais les API acceptent aussi points et lignes.'
    },
    {
      q: 'À quoi sert le Back-Face Culling ?',
      a: 'À rejeter les faces orientées à l’opposé de la caméra, éliminant environ 50 % des polygones de la scène.'
    },
    {
      q: 'Comment calcule-t-on la normale d’un triangle ?',
      a: 'Par le produit vectoriel n = (B - A) × (C - A), puis N = n / ||n|| si sa norme est non nulle ; un triangle dégénéré n’a pas de normale unitaire définie.'
    },
    {
      q: 'Quel est l’ordre canonique des transformations TRS ?',
      a: 'Scale d’abord, puis Rotation, puis Translation (P\' = T · R · S · P).'
    },
    {
      q: 'Pourquoi utilise-t-on des matrices 4x4 homogènes ?',
      a: 'Pour combiner rotation, mise à l’échelle et translation en une seule multiplication matricielle linéaire.'
    },
    {
      q: 'Quel est le bénéfice des Niveaux de Détail (LOD) ?',
      a: 'Réduire le nombre de sommets affichés pour les objets éloignés afin de maintenir un framerate élevé.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez le rôle du triangle, le Back-Face Culling et le calcul de normale par produit vectoriel.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle de géométrie 3D. Approfondissez l’ordre TRS et l’utilité des coordonnées homogènes 4x4.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des mathématiques de la modélisation 3D.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les maillages et les transformations affines au niveau d’un ingénieur moteur 3D.' }
  ]
};
