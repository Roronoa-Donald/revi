/**
 * Chapitre 5 du cours « Infographie B2 » — Éclairage, Shaders Programmables &amp; Rendu PBR.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Éclairage, Shaders Programmables &amp; Rendu PBR',
  short: 'Éclairage &amp; Shaders PBR',
  toc: 'Pipeline graphique programmable (Vertex &amp; Fragment Shaders), modèles d’illumination empiriques (Lambert, Phong, Blinn-Phong), principes du rendu basé sur la physique (PBR), théorie des micro-facettes (Cook-Torrance), approximation de Fresnel (Schlick) et conservation de l’énergie.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'À l’ère du pipeline fixe OpenGL 1.x, l’éclairage 3D se résumait à une formule approximative figée dans le silicium. ' +
    'L’introduction des shaders programmables (Vertex Shaders et Fragment/Pixel Shaders) a totalement révolutionné l’infographie, ' +
    'permettant aux développeurs d’écrire des programmes sur-mesure exécutés en parallèle sur des milliers de cœurs GPU. ' +
    'De la loi empirique du cosinus de Lambert jusqu’aux modèles de rendu basé sur la physique (PBR - Physically Based Rendering) ' +
    'utilisés par Unreal Engine, Unity et Blender, l’éclairage numérique simule aujourd’hui fidèlement les interactions réelles ' +
    'entre les photons et la matière. ' +
    'Ce cinquième module explore la physique de la lumière : comprendre les équations d’ombrage, ' +
    'décomposer les flux diffus et spéculaires, appréhender la réflectance de Fresnel et respecter la loi cardinale de conservation de l’énergie.',

  objectives: [
    'comprendre le rôle respectif du Vertex Shader (transformation des sommets) et du Fragment Shader (coloration des pixels) ;',
    'maîtriser la loi du cosinus de Lambert pour le calcul de la diffusion lumineuse idéale (produit scalaire N · L) ;',
    'analyser le modèle empirique de Phong et l’amélioration de Blinn-Phong (vecteur mi-chemin H) pour le reflet spéculaire ;',
    'comprendre les fondements du PBR (Physically Based Rendering) : modèle de micro-facettes et distribution GGX ;',
    'appliquer l’approximation de Schlick pour l’effet de Fresnel (augmentation de la réflectance sous incidence rasante) ;',
    'vérifier la règle physique de conservation de l’énergie (la lumière réfléchie ne peut dépasser la lumière incidente).'
  ],

  sections: [
    {
      title: 'Pipeline Graphique Programmable : Vertex vs Fragment Shader',
      html: [
        '<p>Le pipeline de rendu moderne confie le traitement visuel à de petits programmes spécialisés exécutés massivement en parallèle sur le processeur graphique :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Vertex Shader (Shader de Sommets)</h4>',
        '    <ul>',
        '      <li><strong>Exécution :</strong> Une fois par sommet du maillage 3D.</li>',
        '      <li><strong>Mission :</strong> Multiplie la position 3D par la matrice Model-View-Projection (MVP) pour projeter le sommet dans l’espace écran (Clip Space).</li>',
        '      <li><strong>Sortie :</strong> Coordonnées homogènes <code>gl_Position</code>, normales et UVs interpolés pour les pixels.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Fragment / Pixel Shader (Shader de Pixels)</h4>',
        '    <ul>',
        '      <li><strong>Exécution :</strong> Une fois pour chaque fragment de pixel couvert par un triangle rasterisé.</li>',
        '      <li><strong>Mission :</strong> Échantillonne les textures, calcule l’éclairage (Lambert, spéculaire, ombres) et détermine la couleur finale RGBA.</li>',
        '      <li><strong>Sortie :</strong> Couleur de pixel <code>FragColor</code> transmise au Framebuffer.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Modèles d’Illumination Empiriques : Lambert &amp; Phong',
      html: [
        '<p>Avant le PBR, l’industrie s’appuyait sur des approximations visuelles rapides :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr><th>Composante</th><th>Modèle</th><th>Formule mathématique</th><th>Signification physique</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><strong>Diffuse (Mate)</strong></td><td>Loi de Lambert</td><td><code>Id = max(0.0, N · L)</code></td><td>L’énergie reçue dépend du cosinus de l’angle entre la normale <code>N</code> et la lumière <code>L</code>.</td></tr>',
        '    <tr><td><strong>Spéculaire (Brillante)</strong></td><td>Phong</td><td><code>Is = max(0.0, R · V)^shininess</code></td><td>Reflet brillant le long du rayon réfléchi <code>R = 2(N·L)N - L</code> vu par la caméra <code>V</code>.</td></tr>',
        '    <tr><td><strong>Spéculaire Optimisé</strong></td><td>Blinn-Phong</td><td><code>Is = max(0.0, N · H)^shininess</code></td><td>Utilisez le vecteur mi-chemin <code>H = normalize(L + V)</code>, plus rapide à calculer sur GPU.</td></tr>',
        '  </tbody>',
        '</table>',

        box(
          'tip',
          'Pourquoi Blinn-Phong est-il plus performant que Phong ?',
          '<p>Le calcul du vecteur réfléchi <code>R</code> chez Phong exige une formule vectorielle coûteuse pour chaque fragment. ' +
          'Blinn-Phong calcule simplement la demi-somme unitaire <code>H = normalize(L + V)</code>, ce qui est quasi instantané ' +
          'lorsque la lumière ou la caméra est directionnelle (infiniment lointaine).</p>'
        )
      ].join('\n')
    },
    {
      title: 'Physically Based Rendering (PBR) &amp; Conservation de l’Énergie',
      html: [
        '<p>Le modèle PBR garantit qu’un matériau réagit de manière photoréaliste et cohérente sous n’importe quelle condition d’éclairage :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Conservation de l’Énergie</h4>',
        '    <p>Une surface ne peut jamais réémettre plus de lumière qu’elle n’en reçoit. L’énergie lumineuse incidente se divise en deux flux exclusifs :</p>' +
        '    <pre><code>kd * Diffuse + ks * Speculaire <= Lumiere_Incidente\n' +
        'kd + ks <= 1.0</code></pre>' +
        '    <p>Un métal parfait (Metallic = 1.0) n’a aucune réfraction interne : <code>kd = 0</code>, toute la couleur provient du reflet spéculaire.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Effet Fresnel (Formule de Schlick)</h4>',
        '    <p>Tout matériau devient un miroir presque parfait lorsqu’il est observé sous un angle très rasant (incidence tangentielle) :</p>' +
        '    <pre><code>F(θ) = F0 + (1.0 - F0) * (1.0 - cos θ)⁵</code></pre>' +
        '    <p>Où <code>F0</code> est la réflectance sous incidence normale (environ 0.04 pour les diélectriques/plastiques, et &gt; 0.70 pour les métaux purs).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Programmation de Shader d’Éclairage et Rendu PBR',
  method: [
    'Étape 1 — Définir le Vertex Shader : Projeter la géométrie en espace écran (gl_Position = MVP * vec4(position, 1.0)) et transmettre la normale interpolée.',
    'Étape 2 — Normaliser les vecteurs dans le Fragment Shader : Ré-exécuter normalize() sur N, L et V pour corriger la désynchronisation d’interpolation raster.',
    'Étape 3 — Calculer la composante diffuse de Lambert : Évaluer dot(N, L) et brider à zéro avec max(0.0, dot) pour masquer les faces tournées vers l’ombre.',
    'Étape 4 — Évaluer le reflet spéculaire : Calculer le vecteur mi-chemin H = normalize(L + V) et élever pow(max(0.0, dot(N, H)), shininess) selon Blinn-Phong.',
    'Étape 5 — Intégrer l’effet de Fresnel : Appliquer la formule de Schlick F0 + (1 - F0) * (1 - dot(N, V))^5 pour rehausser les reflets rasants.',
    'Étape 6 — Garantir la conservation d’énergie : Ajuster kd = (1.0 - ks) * (1.0 - metallic) pour s’assurer que kd + ks ≤ 1.0 sur toute la surface.'
  ],

  summary: [
    'Le Vertex Shader transforme les sommets dans l’espace écran, tandis que le Fragment Shader calcule la couleur de chaque pixel.',
    'La loi de Lambert stipule que l’intensité diffuse est proportionnelle au produit scalaire de la normale et de la direction lumineuse (N · L).',
    'Si le produit scalaire N · L est négatif, la face est orientée à l’opposé de la source lumineuse et l’intensité diffuse vaut 0.0.',
    'Blinn-Phong remplace le rayon réfléchi par le vecteur mi-chemin H = normalize(L + V).',
    'La conservation de l’énergie en PBR impose que la somme de la lumière diffuse et spéculaire ne dépasse jamais 100 % de l’énergie incidente.',
    'L’effet de Fresnel (Schlick) montre que la réflectivité d’une surface augmente drastiquement sous un angle de vue rasant.'
  ],

  checklist: [
    'Je comprends le rôle et le point d’entrée de gl_Position dans un Vertex Shader.',
    'Je sais calculer la contribution diffuse de Lambert à partir de deux vecteurs unitaires.',
    'Je sais expliquer la différence entre le modèle de Phong et le modèle de Blinn-Phong.',
    'Je comprends pourquoi un matériau métallique n’a pratiquement aucune composante diffuse.',
    'Je maîtrise le principe de conservation de l’énergie et l’approximation de Fresnel de Schlick.'
  ],

  notions: [
    'Vertex Shader vs Fragment / Pixel Shader',
    'Loi du cosinus de Lambert (Lumière diffuse)',
    'Produit scalaire (Dot product) et clamping max(0, N·L)',
    'Modèle spéculaire de Phong et vecteur réfléchi R',
    'Modèle de Blinn-Phong et vecteur mi-chemin H',
    'Physically Based Rendering (PBR)',
    'Théorie des micro-facettes (Cook-Torrance, GGX)',
    'Effet de Fresnel et approximation de Schlick',
    'Conservation de l’énergie (Kd + Ks ≤ 1.0)'
  ],

  pitfalls: [
    'Calculer le produit scalaire de Lambert sans avoir préalablement normalisé les vecteurs N et L, faussant complètement l’intensité.',
    'Oublier de brider (clamp) le produit scalaire à 0 avec max(0.0, dot), créant des intensités négatives parasites sur les faces cachées.',
    'Additionner des composantes spéculaire et diffuse sans vérifier que leur somme totale n’excède pas 1.0 (violation de la conservation d’énergie).'
  ],

  questions: [
    {
      stem: 'Quel programme du pipeline graphique GPU s’exécute pour chaque pixel rasterisé afin de calculer sa couleur finale ?',
      opts: [
        'Le Vertex Shader',
        'Le Fragment / Pixel Shader',
        'Le BIOS de la carte mère',
        'Le compilateur GCC'
      ],
      correct: 1,
      exp: 'Le Fragment Shader calcule l’illumination, les ombres et les textures pour chaque fragment de pixel affiché à l’écran.'
    },
    {
      stem: 'Selon la loi du cosinus de Lambert, quelle formule mathématique donne l’intensité de lumière diffuse reçue par une surface ?',
      opts: [
        'Id = N × L',
        'Id = max(0.0, N · L)',
        'Id = N + L',
        'Id = ||N|| / ||L||'
      ],
      correct: 1,
      exp: 'L’intensité dépend du cosinus de l’angle d’incidence calculé par le produit scalaire N · L, borné à zéro pour les angles supérieurs à 90°.'
    },
    {
      stem: 'Que vaut l’intensité diffuse de Lambert si le vecteur normal N et la direction vers la lumière L forment un angle de 90 degrés (incidence rasante) ?',
      opts: [
        '1.0',
        '0.5',
        '0.0',
        '-1.0'
      ],
      correct: 2,
      exp: 'Le cosinus de 90° vaut 0. Le produit scalaire de deux vecteurs orthogonaux est nul, donc l’intensité reçue est exactement 0.0.'
    },
    {
      stem: 'Quel avantage calculatoire majeur présente le modèle de Blinn-Phong par rapport au modèle de Phong classique ?',
      opts: [
        'Il supprime le besoin de Fragment Shader',
        'Il utilise le vecteur mi-chemin H = normalize(L + V), éliminant le calcul coûteux du rayon réfléchi R pour chaque pixel',
        'Il double la résolution de la texture',
        'Il désactive les ombres portées'
      ],
      correct: 1,
      exp: 'Calculer le vecteur mi-chemin H entre la lumière et la vue est bien plus direct et économique pour les GPU que de calculer le reflet R = 2(N·L)N - L.'
    },
    {
      stem: 'Que stipule le principe fondamental de conservation de l’énergie dans le rendu basé sur la physique (PBR) ?',
      opts: [
        'La facture d’électricité du serveur ne doit pas dépasser 100 euros',
        'La quantité totale de lumière réfléchie (diffuse + spéculaire) par une surface ne peut en aucun cas excéder la quantité de lumière qu’elle a reçue',
        'Les objets en métal doivent toujours être froids au toucher',
        'La lumière doit toujours voyager à la même vitesse dans tous les shaders'
      ],
      correct: 1,
      exp: 'Physiquement, une surface passive ne crée pas d’énergie. La somme des fractions diffuse (Kd) et spéculaire (Ks) doit être inférieure ou égale à 1.0.'
    },
    {
      stem: 'Pourquoi un métal pur (comme l’or ou le cuivre avec Metallic = 1.0) ne possède-t-il pratiquement aucune composante de lumière diffuse en PBR ?',
      opts: [
        'Parce que les métaux sont transparents',
        'Parce que les métaux conduisent l’électricité et absorbent immédiatement par leurs électrons libres toute lumière réfractée à l’intérieur, toute réflexion visible étant spéculaire',
        'Parce que le GPU refuse de peindre le métal en diffus',
        'Parce que les métaux ne supportent pas la loi de Lambert'
      ],
      correct: 1,
      exp: 'Chez les métaux conducteurs, la lumière qui pénètre sous la surface est absorbée au lieu d’être rediffusée. Toute la couleur vient donc du reflet spéculaire teinté.'
    },
    {
      stem: 'Quel phénomène physique l’approximation de Fresnel de Schlick modélise-t-elle avec précision ?',
      opts: [
        'La décoloration des pigments sous le soleil',
        'L’augmentation spectaculaire de la réflectivité spéculaire d’une surface lorsque le regard de l’observateur devient presque rasant (tangent à la surface)',
        'La vitesse du son dans l’air',
        'Le clignotement des diodes LED'
      ],
      correct: 1,
      exp: 'L’effet de Fresnel explique pourquoi une vitre ou une flaque d’eau apparaît transparente vue de dessus, mais devient un miroir éclatant vue de biais sous incidence rasante.'
    },
    {
      stem: 'Dans l’équation de Fresnel de Schlick F(θ) = F0 + (1 - F0) * (1 - cos θ)⁵, que représente le paramètre F0 ?',
      opts: [
        'La distance focale de la caméra',
        'La réflectance de base de la surface sous un angle de vue perpendiculaire normal (à 0 degré)',
        'Le niveau de charge de la batterie',
        'La rugosité maximale du matériau'
      ],
      correct: 1,
      exp: 'F0 est la réflectance minimale observée face à la surface. Pour la plupart des non-métaux (eau, verre, plastique), F0 vaut environ 0.04 (4 % de réflexion).'
    }
  ],

  flashcards: [
    {
      q: 'Quel est le rôle du Vertex Shader ?',
      a: 'Transformer les coordonnées 3D des sommets dans l’espace écran via les matrices de projection (MVP).'
    },
    {
      q: 'Quel est le rôle du Fragment Shader ?',
      a: 'Calculer la couleur finale RGBA de chaque fragment de pixel après échantillonnage et éclairage.'
    },
    {
      q: 'Quelle est la formule de diffusion de Lambert ?',
      a: 'Id = max(0.0, N · L). Elle est proportionnelle au cosinus de l’angle d’incidence lumineuse.'
    },
    {
      q: 'Qu’est-ce que le vecteur mi-chemin H en Blinn-Phong ?',
      a: 'Le vecteur unitaire médian entre la lumière L et la caméra V : H = normalize(L + V).'
    },
    {
      q: 'Qu’impose la conservation de l’énergie en PBR ?',
      a: 'Lumière diffuse + Lumière spéculaire ≤ Lumière incidente (Kd + Ks ≤ 1.0).'
    },
    {
      q: 'Qu’est-ce que l’effet Fresnel ?',
      a: 'Le phénomène physique où une surface réfléchit bien plus de lumière sous un angle de vue rasant.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la différence Vertex/Fragment Shader, la loi de Lambert et la conservation d’énergie.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle théorique. Approfondissez le vecteur mi-chemin Blinn-Phong et l’effet Fresnel de Schlick.' },
    { cls: 'good', text: '7/8 : Très bonne compréhension des shaders et des fondements physiques du PBR.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous maîtrisez les modèles d’éclairage et l’optique du rendu 3D au niveau expert.' }
  ]
};
