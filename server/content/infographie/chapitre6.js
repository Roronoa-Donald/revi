/**
 * Chapitre 6 du cours « Infographie B2 » — Optimisation Graphique, Compression GPU &amp; Pipeline Temps Réel.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Optimisation Graphique, Compression GPU &amp; Pipeline Temps Réel',
  short: 'Optimisation &amp; Pipeline GPU',
  toc: 'Goulots d’étranglement de rendu (CPU-bound vs GPU-bound), compression matérielle de textures (BC/DXT, ASTC, ETC2), réduction des Draw Calls par Static Batching et GPU Instancing, efficacité de la chaîne de Mipmaps et gestion de la mémoire VRAM.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Créer des visuels époustouflants ne suffit pas : dans un jeu vidéo, une simulation interactive ou une application WebGL, ' +
    'le moteur doit obligatoirement tenir un taux de rafraîchissement fluide et stable de 60 FPS (16.6 ms par image) ou 120 FPS. ' +
    'Les ralentissements et saccades proviennent de deux goulots distincts : soit le processeur central (CPU) est submergé ' +
    'par une avalanche d’appels de dessin (Draw Calls), soit le processeur graphique (GPU) est saturé par une bande passante mémoire ' +
    'excessive ou des textures non compressées. ' +
    'Ce sixième et dernier module d’Infographie B2 vous livre les clés de l’optimisation industrielle : ' +
    'diagnostiquer les goulots d’étranglement, exploiter les algorithmes de compression de texture par blocs sur silicium (BC, ASTC), ' +
    'fusionner les géométries par Static Batching et calculer avec rigueur la surcharge et les gains de la chaîne de Mipmaps.',

  objectives: [
    'diagnostiquer la nature d’un goulot d’étranglement de rendu : limitation CPU (Draw Calls) vs GPU (Fillrate, VRAM) ;',
    'comprendre le fonctionnement de la compression de textures matérielle par blocs (BC1/BC3/BC7, ASTC, ETC2) ;',
    'calculer la réduction de taille et le débit de bande passante mémoire requis pour 60 images par seconde ;',
    'mettre en œuvre le regroupement de maillages par Static Batching et Instancing pour minimiser les Draw Calls ;',
    'analyser la structure géométrique et le surcoût mémoire exact (+33.3 %) d’une chaîne de Mipmaps jusqu’à 1x1 ;',
    'auditer et profiler un pipeline de rendu graphique complet pour garantir la fluidité temps réel.'
  ],

  sections: [
    {
      title: 'Diagnostic de Performance : CPU-Bound vs GPU-Bound',
      html: [
        '<p>Pour maintenir un affichage fluide à 60 images par seconde, le temps total de calcul par image ne doit jamais dépasser <strong>16.6 millisecondes</strong> :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Scénario CPU-Bound (Goulot Processeur)</h4>',
        '    <ul>',
        '      <li><strong>Symptôme :</strong> Trop d’objets indépendants générant des milliers de <em>Draw Calls</em> par frame.</li>',
        '      <li><strong>Cause :</strong> Le pilote graphique et le CPU passent leur temps à changer de contexte, lier des matériaux et soumettre des commandes au GPU.</li>',
        '      <li><strong>Solutions :</strong> Static Batching, Dynamic Batching, GPU Instancing, réduction du nombre d’objets uniques.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Scénario GPU-Bound (Goulot Carte Graphique)</h4>',
        '    <ul>',
        '      <li><strong>Symptôme :</strong> Le GPU met trop de temps à rasteriser ou exécuter les Fragment Shaders.</li>',
        '      <li><strong>Cause :</strong> Overdraw massif (trop de couches transparentes superposées), shaders trop lourds, ou saturation de la bande passante VRAM.</li>',
        '      <li><strong>Solutions :</strong> Compression de textures matérielle (BC/ASTC), chaînes de Mipmaps, occlusion culling, allègement des shaders.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Compression Matérielle de Textures GPU : BC, ASTC &amp; ETC2',
      html: [
        '<p>Contrairement aux formats JPEG ou PNG qui doivent être intégralement décompressés en mémoire vive (occupant 4 octets par pixel en RGBA8), ' +
        'les formats de compression GPU restent <strong>compressés directement dans la mémoire VRAM</strong> et sont décodés à la volée par le silicium du processeur graphique :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Format</th><th>Bits par pixel (bpp)</th><th>Plateforme cible</th><th>Ratio vs RGBA8 non compressé</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>BC1 (DXT1)</code></td><td>4 bpp (0.5 octet/px)</td><td>PC / Consoles (DirectX, Vulkan)</td><td>Réduction x8.0 (couleur RGB sans alpha ou 1-bit).</td></tr>',
        '    <tr><td><code>BC3 (DXT5)</code></td><td>8 bpp (1.0 octet/px)</td><td>PC / Consoles</td><td>Réduction x4.0 (couleur RGB + alpha graduel).</td></tr>',
        '    <tr><td><code>BC7</code></td><td>8 bpp (1.0 octet/px)</td><td>PC moderne / Consoles récentes</td><td>Réduction x4.0 (haute fidélité RGB/RGBA, sans artefact visible).</td></tr>',
        '    <tr><td><code>ASTC 4x4</code></td><td>8 bpp (1.0 octet/px)</td><td>Mobile moderne (iOS, Android, Apple Silicon)</td><td>Réduction x4.0 (qualité maximale).</td></tr>',
        '    <tr><td><code>ASTC 8x8</code></td><td>2 bpp (0.25 octet/px)</td><td>Mobile moderne</td><td>Réduction x16.0 (idéal pour diffuse et décors lointains).</td></tr>',
        '  </tbody>',
        '</table>',

        box(
          'tip',
          'Pourquoi JPEG et PNG sont-ils interdits comme format VRAM ?',
          '<p>Le GPU a besoin d’un accès aléatoire instantané à n’importe quel texel <code>(u, v)</code>. ' +
          'Pour lire un seul pixel au milieu d’un fichier PNG ou JPEG, il faudrait décompresser toute l’image séquentiellement depuis le début ! ' +
          'Les formats de blocs GPU découpent l’image en blocs indépendants (ex: 4x4 pixels), permettant de calculer l’adresse mémoire exacte d’un bloc en une seule addition.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Batching &amp; Analyse Mathématique de la Chaîne de Mipmaps',
      html: [
        '<p>Pour minimiser les appels de dessin et soulager la mémoire cache :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Static Batching &amp; Instancing</h4>',
        '    <p>Lorsque plusieurs maillages statiques partagent le même matériau, le moteur les fusionne dans un grand tampon de sommets unique. ' +
        'Le nombre d’appels de dessin passe de N à <code>ceil(total_sommets / 65535)</code>, soulageant instantanément le CPU.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Série Géométrique des Mipmaps</h4>',
        '    <p>Une texture carrée de taille <code>L × L</code> génère des niveaux successifs <code>L/2, L/4, ..., 1×1</code>. ' +
        'Le surcoût mémoire total par rapport au niveau 0 seul est donné par la somme de la série géométrique :</p>' +
        '    <pre><code>Somme = 1/4 + 1/16 + 1/64 + ... = 1/3 ≈ +33.33 %</code></pre>' +
        '    <p>Pour seulement un tiers de mémoire supplémentaire, on élimine tout scintillement d’aliasing et on accélère les lectures mémoires de 200 à 400 %.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole d’Optimisation et de Profilage du Pipeline de Rendu GPU',
  method: [
    'Étape 1 — Profiler le Frame Time : Mesurer les temps d’exécution CPU et GPU indépendamment pour identifier le goulot d’étranglement prépondérant.',
    'Étape 2 — Traiter les goulots CPU (Draw Calls) : Fusionner les maillages statiques par Static Batching et utiliser le GPU Instancing pour les objets répétés.',
    'Étape 3 — Compresser les textures sur le matériel : Convertir les assets en BC1/BC7 sur PC/Consoles et en ASTC sur Mobile pour soulager la bande passante VRAM.',
    'Étape 4 — Générer les chaînes de Mipmaps : Activer le mipmapping matériel pour tous les formats POT afin d’optimiser le cache de texture GPU.',
    'Étape 5 — Limiter l’Overdraw et la transparence : Trier les objets opaques de l’avant vers l’arrière (Front-to-Back) pour exploiter le Z-buffer Early Depth Test.',
    'Étape 6 — Valider la tenue du budget 60 FPS : S’assurer que le temps total de calcul par frame reste strictement inférieur à 16.6 ms sans à-coup.'
  ],

  summary: [
    'Pour maintenir 60 FPS, le budget temps d’une frame ne doit pas excéder 16.6 millisecondes pour le CPU et le GPU cumulés.',
    'Une limitation CPU est le plus souvent provoquée par un excès de Draw Calls causés par de trop nombreux changements de matériaux.',
    'Les formats de compression GPU (BC1, BC7, ASTC) restent compressés en mémoire VRAM et sont décodés à la volée en accès direct par bloc.',
    'Une texture 2048x2048 en format BC1 ne pèse que 2 Mo au lieu de 16 Mo en RGBA8 non compressé, divisant la bande passante par 8.',
    'Le Static Batching regroupe les objets partageant un matériau dans un tampon de 65535 sommets pour limiter les appels de dessin.',
    'La chaîne complète de Mipmaps d’une texture carrée n’ajoute qu’un surcoût mémoire constant de 33.3 % tout en évitant l’aliasing.'
  ],

  checklist: [
    'Je sais identifier si une chute de framerate est d’origine CPU-bound ou GPU-bound.',
    'Je comprends pourquoi un GPU ne peut pas utiliser directement une texture au format PNG ou JPEG en mémoire vidéo.',
    'Je connais les caractéristiques et ratios des formats BC1, BC7 et ASTC.',
    'Je sais calculer la bande passante mémoire consommée par une texture à 60 FPS.',
    'Je comprends comment fonctionne le regroupement par Static Batching.',
    'Je sais démontrer pourquoi la surcharge mémoire d’une chaîne de mipmaps carrée vaut 33.33 %.'
  ],

  notions: [
    'Budget frame temps réel (16.6 ms à 60 FPS)',
    'Goulots CPU-bound (Draw Calls) vs GPU-bound (Fillrate, VRAM)',
    'Compression de texture matérielle par blocs (Block Compression)',
    'Formats PC/Consoles (BC1, BC3, BC7) et Mobiles (ASTC, ETC2)',
    'Bande passante mémoire VRAM et accès aléatoire',
    'Static Batching et GPU Instancing',
    'Série géométrique des Mipmaps (surcoût +33.3 %)',
    'Cache de texture GPU et réduction de l’aliasing'
  ],

  pitfalls: [
    'Tenter de charger des images PNG non compressées en pensant économiser du temps CPU : elles occupent 4 fois plus de VRAM et saturent la bande passante.',
    'Avoir des centaines de petits maillages utilisant chacun un matériau distinct, ce qui empêche tout batching et fait exploser le nombre de Draw Calls.',
    'Désactiver la génération de Mipmaps pour « économiser de la mémoire », ce qui ruine les performances du cache GPU et engendre un aliasing insupportable.'
  ],

  questions: [
    {
      stem: 'Quel est le budget temps maximum accordé pour calculer et afficher une image afin de garantir un framerate stable de 60 images par seconde (FPS) ?',
      opts: [
        '100 millisecondes',
        '33.3 millisecondes',
        '16.6 millisecondes',
        '1.0 milliseconde'
      ],
      correct: 2,
      exp: '1 seconde / 60 images = 1000 ms / 60 ≈ 16.66 millisecondes par image pour l’ensemble des calculs CPU et de rendu GPU.'
    },
    {
      stem: 'Quelle est la cause la plus fréquente d’un goulot d’étranglement de rendu de type « CPU-bound » dans une scène 3D complexe ?',
      opts: [
        'Un écran trop lumineux',
        'Un nombre excessif de Draw Calls provoqué par une multitude de petits objets utilisant chacun des matériaux et textures différents',
        'Une batterie trop froide',
        'Un disque dur trop plein'
      ],
      correct: 1,
      exp: 'Chaque objet avec un matériau unique exige que le processeur central prépare et soumette un ordre de tracé (Draw Call) au pilote graphique, saturant le CPU.'
    },
    {
      stem: 'Pourquoi les processeurs graphiques (GPU) ne peuvent-ils pas stocker les textures en mémoire vidéo directement au format PNG ou JPEG ?',
      opts: [
        'Parce que le GPU exige un accès aléatoire instantané par bloc (O(1)) à n’importe quel texel (u, v), impossible avec des formats séquentiels comme JPEG/PNG',
        'Parce que PNG et JPEG sont trop récents pour les cartes graphiques',
        'Parce que les câbles DisplayPort refusent les fichiers compressés',
        'Parce que PNG utilise trop de voyelles'
      ],
      correct: 0,
      exp: 'Le silicium GPU décode des blocs de taille fixe en mémoire instantanément. Décompresser un JPEG nécessiterait de recalculer toute la chaîne de blocs depuis le début.'
    },
    {
      stem: 'Quelle taille en mémoire VRAM occupe une texture carrée 2048x2048 compressée au format standard BC1 (4 bits par pixel) ?',
      opts: [
        '16 Mo',
        '8 Mo',
        '4 Mo',
        '2 Mo'
      ],
      correct: 3,
      exp: '2048 × 2048 = 4 194 304 pixels. Avec 4 bpp (0.5 octet par pixel), cela donne 2 097 152 octets = 2048 Ko = exactement 2.0 Mo (contre 16 Mo en RGBA8 non compressé).'
    },
    {
      stem: 'Quel ratio de réduction de taille le format moderne ASTC 8x8 (2 bits par pixel) offre-t-il par rapport à une texture non compressée RGBA8 (32 bits par pixel) ?',
      opts: [
        '2.0x',
        '4.0x',
        '8.0x',
        '16.0x'
      ],
      correct: 3,
      exp: '32 bpp divisé par 2 bpp = un ratio de compression massif de 16.0x, idéal pour diviser par 16 l’empreinte mémoire des textures sur smartphone.'
    },
    {
      stem: 'Comment la technique du « Static Batching » permet-elle d’accélérer le rendu d’un décor composé de centaines de cailloux et d’arbres immobiles ?',
      opts: [
        'En supprimant les arbres de la scène',
        'En fusionnant la géométrie de tous les maillages partageant le même matériau dans un seul tampon de sommets, réduisant les Draw Calls à un seul appel par lot',
        'En baissant le volume sonore de l’application',
        'En augmentant la vitesse du processeur'
      ],
      correct: 1,
      exp: 'Le Static Batching regroupe les sommets dans un tampon partagé, permettant au GPU de dessiner tous les objets identiques en une seule instruction de dessin.'
    },
    {
      stem: 'Quel est le surcoût mémoire théorique exact apporté par la génération d’une chaîne complète de Mipmaps pour une texture carrée jusqu’au niveau 1x1 ?',
      opts: [
        '+100 % (mémoire doublée)',
        '+50 %',
        '+33.33 % (exactement un tiers)',
        '+5 %'
      ],
      correct: 2,
      exp: 'La somme de la suite géométrique 1/4 + 1/16 + 1/64 + ... converge rigoureusement vers 1/3, soit exactement un surcoût mémoire de +33.33 %.'
    },
    {
      stem: 'Quel est le bénéfice principal des Mipmaps sur le processeur graphique en dehors de l’élimination de l’aliasing ?',
      opts: [
        'Elles réduisent la température de la pièce',
        'Elles améliorent massivement la localité du cache de texture GPU, car les texels consécutifs des niveaux réduits sont contigus en mémoire vidéo',
        'Elles permettent de jouer en réseau sans connexion Internet',
        'Elles créent de la musique d’ambiance'
      ],
      correct: 1,
      exp: 'Sans mipmaps, échantillonner une texture 4K vue de loin saute des centaines de texels entre chaque pixel, créant des défauts de cache incessants qui ruinent la bande passante.'
    }
  ],

  flashcards: [
    {
      q: 'Quel est le budget temps d’une frame à 60 FPS ?',
      a: '16.6 millisecondes maximum pour l’ensemble des calculs CPU et de rendu GPU.'
    },
    {
      q: 'Qu’est-ce qui caractérise une situation CPU-bound en 3D ?',
      a: 'Un nombre excessif de Draw Calls généré par le processeur central, submergeant le pilote de commandes.'
    },
    {
      q: 'Pourquoi utilise-t-on des formats de compression de texture par blocs (BC, ASTC) ?',
      a: 'Car ils restent compressés en VRAM et permettent un accès aléatoire instantané O(1) à n’importe quel texel.'
    },
    {
      q: 'Quel est le ratio de réduction d’une texture BC1 (4 bpp) vs RGBA8 ?',
      a: 'Un facteur 8 (32 / 4 = 8.0x) : une texture 2K pèse 2 Mo au lieu de 16 Mo.'
    },
    {
      q: 'En quoi consiste le Static Batching ?',
      a: 'À combiner les maillages immobiles partageant un même matériau en un seul grand tampon pour réduire les Draw Calls.'
    },
    {
      q: 'Quel est le surcoût mémoire de la chaîne complète de Mipmaps d’une texture carrée ?',
      a: 'Exactement +33.33 % (somme de la série géométrique 1/4 + 1/16 + 1/64 + ... = 1/3).'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la différence CPU/GPU bound, les formats de compression de blocs et le calcul de la série de mipmaps.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon niveau d’ensemble. Approfondissez les calculs de bande passante mémoire et les limites de batching.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise de l’optimisation GPU et du pipeline temps réel.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les profils de performance et l’ingénierie GPU au niveau des directeurs techniques.' }
  ]
};
