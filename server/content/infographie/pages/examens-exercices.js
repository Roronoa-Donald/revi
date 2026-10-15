/**
 * Pages « examens » et « exercices » du cours « Infographie B2 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées Infographie B2</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences académiques universitaires de niveau Bachelor 2 / Licence 2 en informatique graphique, traitement d’image et rendu 3D.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Colorimétrie, Vectoriel, Bézier &amp; Texturing', [
      '<h4>Partie 1 : Colorimétrie et Synthèse des Couleurs (6 points)</h4>',
      '<ol>',
      '  <li>Distinguez la synthèse additive (RVB) de la synthèse soustractive (CMJN). Pourquoi l’imprimerie utilise-t-elle le noir (K) en complément des trois couleurs primaires Cyan, Magenta et Jaune ? (3 pts)</li>',
      '  <li>Expliquez la différence entre l’espace de couleur sRVB et l’espace RVB linéaire. Pourquoi les calculs physiques d’éclairage dans les shaders doivent-ils impérativement être effectués en espace linéaire ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Tracés Vectoriels et Courbes de Bézier (6 points)</h4>',
      '<p>Soit une courbe de Bézier cubique 2D définie par les 4 points de contrôle : <code>P0 = (0, 0)</code>, <code>P1 = (0, 100)</code>, <code>P2 = (100, 100)</code> et <code>P3 = (100, 0)</code>.</p>',
      '<ol>',
      '  <li>Rappelez la formule générale des polynômes de Bernstein pour une courbe cubique. Calculez les coordonnées exactes du point <code>B(0.5)</code> situé au milieu de la courbe. (3 pts)</li>',
      '  <li>Définissez la continuité géométrique G0, G1 et la continuité paramétrique C0, C1 à la jonction de deux segments de courbe de Bézier. Quelles sont les conditions sur les tangentes ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Textures et Normal Mapping (8 points)</h4>',
      '<ol>',
      '  <li>Expliquez la différence technique entre une Bump Map, une Normal Map et une Displacement Map en termes d’impact sur la géométrie et le rendu. (4 pts)</li>',
      '  <li>Dans une Normal Map en espace tangent, pourquoi la couleur dominante d’une surface plane est-elle le bleu ciel (128, 128, 255) ? Détaillez la formule de décodage shader qui transforme cette couleur en vecteur normal unitaire 3D. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Synthèse additive vs soustractive (3 pts) :</strong> La synthèse additive (RVB) part de l’obscurité (noir = 0,0,0) et additionne des faisceaux lumineux pour créer la lumière (blanc = 255,255,255), utilisée par les écrans. La synthèse soustractive (CMJN) part d’un support blanc et applique des encres qui absorbent (soustraient) certaines longueurs d’onde. Le noir (K, Key) est ajouté car le mélange des encres C+M+J donne un brun boueux et coûteux en encre, alors que l’encre noire pure offre un contraste maximal, des textes nets et une réduction des coûts.</li>',
      '  <li><strong>sRVB vs RVB linéaire (3 pts) :</strong> Le profil sRVB applique une compression gamma (~2.2) pour compenser la perception non-linéaire de l’œil humain. Les lois physiques d’illumination (Lambert, Phong, réfraction) sont linéaires (l’intensité double si la source double). Réaliser des additions de lumière en espace sRVB engendre des bandes sombres et une décoloration des dégradés. Le GPU doit dégammaiser (sRVB vers linéaire), calculer l’éclairage, puis réappliquer le gamma à l’affichage.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Bézier cubique à t=0.5 (3 pts) :</strong> Formule : <code>B(t) = (1-t)³·P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³·P3</code>. Pour t = 0.5, les coefficients sont 0.125, 0.375, 0.375 et 0.125. <code>X(0.5) = 0 + 0.375×0 + 0.375×100 + 0.125×100 = 50.0</code>. <code>Y(0.5) = 0 + 0.375×100 + 0.375×100 + 0 = 75.0</code>. Le point est donc exactement (50.00, 75.00).</li>',
      '  <li><strong>Continuités G0/G1 vs C0/C1 (3 pts) :</strong> C0 / G0 exige que l’extrémité de la première courbe coïncide avec le départ de la seconde (P3_a = P0_b). G1 impose que les tangentes aient la même direction (points alignés), sans exiger la même vitesse. C1 impose que les dérivées première soient strictement identiques en direction et en norme (vitesse paramétrique continue).</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Bump vs Normal vs Displacement (4 pts) :</strong> La Bump Map est une texture en niveaux de gris codant la hauteur, perturbant la normale de manière approximative sans altérer les sommets. La Normal Map encode directement les coordonnées 3D de la normale (X, Y, Z) dans les canaux (R, V, B), offrant un ombrage très réaliste sans surcoût géométrique. La Displacement Map déplace physiquement les sommets du maillage sur le GPU (tessellation), modifiant la silhouette réelle mais au prix d’un coût géométrique élevé.</li>',
      '  <li><strong>Décodage de la Normal Map (4 pts) :</strong> Les composantes spatiales X, Y, Z sont dans [-1, 1], alors que les canaux RVB d’une texture sont stockés dans [0, 255]. Le bleu neutre (128, 128, 255) donne : <code>Nx = (128/255)×2 - 1 ≈ 0.0</code>, <code>Ny = (128/255)×2 - 1 ≈ 0.0</code>, <code>Nz = (255/255)×2 - 1 = +1.0</code>. Le vecteur normal unitaire résultant est (0, 0, 1), ce qui correspond exactement à la normale orthogonale de la surface orientée vers la caméra en espace tangent.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Géométrie 3D, Shaders PBR &amp; Optimisation GPU', [
      '<h4>Partie 1 : Géométrie 3D et Transformations TRS (6 points)</h4>',
      '<ol>',
      '  <li>Donnez la définition et l’algorithme de calcul de la normale unitaire à une face polygonale triangulaire définie par trois sommets A, B et C en sens trigonométrique. Pourquoi le sens de parcours (winding order) est-il capital pour le Back-Face Culling ? (3 pts)</li>',
      '  <li>Soit un objet 3D devant subir une mise à l’échelle S, une rotation R et une translation T. Dans quel ordre les matrices doivent-elles être multipliées pour transformer un sommet P, et pourquoi ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Éclairage Physique et Shaders PBR (6 points)</h4>',
      '<ol>',
      '  <li>Énoncez la loi du cosinus de Lambert pour la réflectance diffuse. Que vaut l’intensité lumineuse si l’angle entre la normale N et la direction de la lumière L est de 90° ? Et si l’angle est de 120° ? (3 pts)</li>',
      '  <li>Définissez le principe fondamental de conservation de l’énergie dans le rendu basé sur la physique (PBR - Physically Based Rendering). Comment se répartit l’énergie entre composante diffuse et composante spéculaire selon la rugosité (Roughness) et la métallicité (Metallic) ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Optimisation du Pipeline de Rendu Temps Réel (8 points)</h4>',
      '<ol>',
      '  <li>Une scène 3D de jeu vidéo contient 2 500 objets statiques (arbres, cailloux, barrières) utilisant 5 matériaux distincts. Avant optimisation, la scène génère 2 500 Draw Calls et fait chuter le framerate à 22 FPS sur le CPU. Expliquez comment le <em>Static Batching</em> et l’<em>Instanced Rendering</em> permettent de ramener le nombre d’appels à moins de 10 Draw Calls. (4 pts)</li>',
      '  <li>Expliquez l’utilité d’une chaîne de <em>Mipmaps</em> pour le rendu des textures sur GPU. Quel est son impact sur le phénomène d’aliasing (scintillement moiré), le cache de texture GPU et l’empreinte mémoire VRAM globale ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Normale de triangle &amp; Winding Order (3 pts) :</strong> On calcule les deux vecteurs directeurs <code>u = B - A</code> et <code>v = C - A</code>. Le produit vectoriel <code>n = u × v</code> donne le vecteur orthogonal : <code>nx = uy·vz - uz·vy</code>, <code>ny = uz·vx - ux·vz</code>, <code>nz = ux·vy - uy·vx</code>. On normalise ensuite <code>N = n / ||n||</code>. Le sens de parcours CCW (Counter-Clockwise) garantit que la normale pointe vers l’extérieur du volume. Si le triangle tourne le dos à la caméra (produit scalaire avec le regard &gt; 0), le GPU élimine le triangle lors du Back-Face Culling sans gaspiller de temps de calcul.</li>',
      '  <li><strong>Ordre des transformations TRS (3 pts) :</strong> La formule matricielle appliquée au point est <code>P\' = T · R · S · P</code>. Les transformations s’appliquent de droite à gauche : d’abord la mise à l’échelle (Scale, centrée sur l’origine locale de l’objet), puis la rotation (orientée autour de l’origine), et enfin la translation (qui positionne l’objet dans l’espace monde). Si la translation était appliquée avant la rotation, l’objet tournerait autour de l’origine du monde et son échelle déformerait sa trajectoire.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Loi de Lambert (3 pts) :</strong> <code>Id = max(0.0, N · L) = max(0.0, cos θ)</code> où θ est l’angle d’incidence. À 90° (incidence rasante), <code>cos(90°) = 0</code>, l’intensité vaut 0.0. À 120° (surface orientée à l’opposé de la source), <code>cos(120°) = -0.5</code>, la fonction max renvoie 0.0 : la face est dans l’ombre propre.</li>',
      '  <li><strong>Conservation d’énergie en PBR (3 pts) :</strong> La somme de la lumière réfléchie (spéculaire) et de la lumière diffusée (diffuse) ne peut en aucun cas excéder la quantité totale de lumière reçue : <code>Kd + Ks ≤ 1.0</code>. Un matériau métallique (Metallic ≈ 1) absorbe la réfraction et n’a pratiquement aucune composante diffuse (Kd ≈ 0), sa couleur se trouvant dans la réflexion spéculaire teintée. La rugosité (Roughness) étale les micro-facettes : un reflet net et concentré pour une faible rugosité, et un reflet large et atténué pour une forte rugosité, tout en conservant l’énergie globale.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Static Batching &amp; Instancing (4 pts) :</strong> Chaque Draw Call génère un coût de communication CPU-GPU (changement de contexte de pilote, binding de shader et de matériau). Avec le Static Batching, le moteur combine les maillages des objets immobiles partageant le même matériau en un seul grand tampon de sommets (VBO). Avec l’Instancing, une seule géométrie est dupliquée des centaines de fois avec un tampon de matrices de transformation. Au lieu de 2 500 appels, le GPU ne reçoit que quelques commandes (1 ou 2 par matériau sous la limite des 65535 sommets), libérant le CPU et permettant d’atteindre 60 FPS constants.</li>',
      '  <li><strong>Mipmaps &amp; VRAM (4 pts) :</strong> Les Mipmaps précalculent des versions filtrées de la texture à des résolutions successives divisées par 2 (2048, 1024, 512, ... jusqu’à 1x1). Utilité : (1) élimine l’aliasing et le scintillement des textures distantes où un pixel d’écran couvre plusieurs texels ; (2) optimise le cache de texture du GPU car les texels accédés sont contigus en mémoire, réduisant drastiquement les défauts de cache et la bande passante requise. Le surcoût mémoire VRAM est modeste et parfaitement borné : la série géométrique 1/4 + 1/16 + 1/64 + ... ajoute exactement 33.3% d’espace mémoire par rapport au niveau 0 seul.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'cartes.html', label: 'Réviser avec les flashcards' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs &amp; Corrigés — ' + course.brand,
      description: 'Épreuves types corrigées d’examen B2 en infographie 2D/3D, mathématiques graphiques, shaders et optimisation GPU.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Pratiques ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const items = chapterList.map(ch => [
    '    <section class="card" style="margin-bottom: var(--space-4);">',
    '      <div class="card__head">',
    '        <span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</span>',
    '        <span class="card__num">Module ' + ch.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitre' + ch.n + '.html#exercices">Exercices du Module ' + ch.n + ' — ' + ch.title + '</a></h3>',
    '      <p class="card__desc">' + ch.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' 3 exercices interactifs en Python</span>',
    '        <span class="card__link"><a class="btn btn--sm" href="chapitre' + ch.n + '.html#exercices">Pratiquer sur le Chapitre ' + ch.n + ' ' + ic('arrow-right') + '</a></span>',
    '      </div>',
    '    </section>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices Pratiques Infographie B2</h1>',
    '  <p class="lead">Accédez aux 18 ateliers d’algorithmique graphique et de simulation exécutables directement dans le navigateur, vérifiés automatiquement par le moteur de tests.</p>',
    '',
    items,
    '',
    chnav({ href: 'simulateur-examen.html', label: 'Passer les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir l’atelier libre de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Catalogue des Exercices Pratiques — ' + course.brand,
      description: 'Accès rapide aux 18 ateliers pratiques de traitement d’image, de 3D et de shaders Infographie B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
