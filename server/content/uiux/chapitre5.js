/**
 * Chapitre 5 du cours « UI/UX Design B2 » — Design Responsive, Ergonomie Mobile &amp; Touch Targets.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Design Responsive, Ergonomie Mobile &amp; Touch Targets',
  short: 'Responsive &amp; Ergonomie Mobile',
  toc: 'Philosophie Mobile-First (Luke Wroblewski), breakpoints et grilles adaptatives, ergonomie tactile et Thumb Zone (Steven Hoober), dimensionnement des cibles tactiles (norme 48x48 px), adaptation des composants et navigation sous contrainte d’espace.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Plus de 65 % du trafic web mondial s’effectue désormais sur smartphone, pourtant de nombreux sites e-commerce ' +
    'continuent d’être pensés sur d’immenses écrans 4K avant d’être rabougris pour mobile à la dernière minute. ' +
    'Conséquence : des boutons minuscules espacés de 4 pixels impossibles à presser sans zoomer, ' +
    'un menu burger placé dans le coin supérieur gauche inaccessible au pouce avec une seule main, ' +
    'et des formulaires interminables qui masquent les champs derrière le clavier virtuel. ' +
    'Ce module forme les concepteurs aux principes rigoureux de la démarche Mobile-First, ' +
    'à l’architecture des grilles fluides par paliers (breakpoints) et à la cartographie ergonomique de la Thumb Zone ' +
    'pour garantir des expériences tactiles fluides, rapides et sans friction.',

  objectives: [
    'adopter la démarche de conception Mobile-First pour prioriser les fonctionnalités essentielles ;',
    'définir et implémenter les paliers de rupture (breakpoints) pour mobile (4 col), tablette (8 col) et desktop (12 col) ;',
    'cartographier la Thumb Zone de Steven Hoober sur mobile (zone naturelle, étirée et difficile) ;',
    'auditer et dimensionner les cibles tactiles selon la norme minimale de 48x48 px (WCAG 2.5.5 / Android) ;',
    'adapter les schémas de navigation (Bottom Navigation Bar vs Menu Tiroir) selon la densité d’information ;',
    'anticiper les contraintes contextuelles du mobile (soleil, mouvement, connexions instables, clavier virtuel).'
  ],

  sections: [
    {
      title: 'Philosophie Mobile-First et Hiérarchie Sous Contrainte',
      html: [
        '<p>Théorisée par Luke Wroblewski en 2009, l’approche <strong>Mobile-First</strong> postule que concevoir ' +
        'pour le plus petit écran en premier lieu force l’équipe à éliminer le superflu et à hiérarchiser ' +
        'l’information de manière implacable :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Approche Traditionnelle (Graceful Degradation)</h4>',
        '    <p>On conçoit une maquette desktop complexe à 12 colonnes avec des barres latérales, des survols de souris ' +
        '    et des menus déroulants géants. Puis, on tente de faire « rentrer » tout ce contenu sur un écran de 375 px ' +
        '    en masquant arbitrairement des sections. Le résultat est souvent lourd, lent et bancal.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Approche Mobile-First (Progressive Enhancement)</h4>',
        '    <p>On conçoit d’abord l’expérience mobile la plus pure et la plus rapide : un seul chemin critique, ' +
        '    une typographie lisible, des actions prioritaires. Ensuite, au fur et à mesure que l’écran s’élargit ' +
        '    (tablette, desktop), on enrichit la présentation avec des colonnes supplémentaires et du contenu d’accompagnement.</p>',
        '  </div>',
        '</div>',

        box(
          'tip',
          'Règle d’Or du Mobile-First',
          '<p>Si une information ou une fonctionnalité n’est pas assez importante pour figurer sur l’écran mobile, ' +
          'elle n’a probablement rien à faire sur la version desktop non plus. La contrainte d’espace révèle ' +
          'la véritable valeur produit.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Grilles Fluides et Paliers de Breakpoints Standardisés',
      html: [
        '<p>Un système de design moderne s’appuie sur des colonnes adaptatives et des gouttières ' +
        'calibrées sur des points de rupture universels :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Palier (Breakpoint)</th>',
        '      <th>Largeur de Viewport</th>',
        '      <th>Nombre de Colonnes</th>',
        '      <th>Gouttières (Gutters)</th>',
        '      <th>Type de Disposition</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Mobile</strong></td>',
        '      <td>&lt; 640 px</td>',
        '      <td>4 colonnes</td>',
        '      <td>16 px</td>',
        '      <td>Colonne unique verticale, cartes pleine largeur</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Tablette</strong></td>',
        '      <td>640 px à 1023 px</td>',
        '      <td>8 colonnes</td>',
        '      <td>24 px</td>',
        '      <td>Grille 2 colonnes, cartes côte à côte</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Desktop</strong></td>',
        '      <td>1024 px à 1439 px</td>',
        '      <td>12 colonnes</td>',
        '      <td>24 ou 32 px</td>',
        '      <td>Disposition 3 colonnes avec barre latérale</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Large Desktop</strong></td>',
        '      <td>&gt;= 1440 px</td>',
        '      <td>12 colonnes (centrées)</td>',
        '      <td>32 px</td>',
        '      <td>Grille 4 colonnes avec largeur maximale fixée (max-width)</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        '<p>Sur les grands écrans (&gt;= 1440 px), il est impératif d’encadrer le contenu dans un conteneur ' +
        'à largeur maximale (par exemple <code>max-width: 1280px; margin: 0 auto;</code>) afin d’éviter des longueurs de ligne ' +
        'de lecture excessives (dépassant 80 caractères par ligne), ce qui fatiguerait considérablement les yeux.</p>'
      ].join('\n')
    },
    {
      title: 'Ergonomie Tactile : La Thumb Zone de Steven Hoober',
      html: [
        '<p>Les recherches empiriques de Steven Hoober (2013) sur des milliers d’utilisateurs mobiles ont révélé ' +
        'que <strong>49 % des personnes manipulent leur smartphone à une seule main</strong>, en s’appuyant ' +
        'exclusivement sur leur pouce pour naviguer :</p>',

        '<div class="grid grid-3">',
        '  <div class="card" style="border-top: 4px solid #16a34a;">',
        '    <h4>Zone Naturelle (Confort Maximal)</h4>',
        '    <p>Située dans la moitié inférieure de l’écran (Y entre 450 et 750 px sur un écran de 844 px). ' +
        '    Le pouce s’y déplace sans effort ni tension musculaire. C’est l’emplacement idéal pour ' +
        '    les boutons d’action principaux (CTA), la barre de validation et les onglets de navigation.</p>',
        '  </div>',
        '  <div class="card" style="border-top: 4px solid #ca8a04;">',
        '    <h4>Zone Étirée (Effort Modéré)</h4>',
        '    <p>Située au centre de l’écran. Le pouce doit s’étendre ou se replier légèrement. ' +
        '    Convient pour les éléments de contenu secondaire, les cartes de lecture ou les champs de formulaire.</p>',
        '  </div>',
        '  <div class="card" style="border-top: 4px solid #dc2626;">',
        '    <h4>Zone Difficile (Zone Rouge)</h4>',
        '    <p>Située dans le tiers supérieur de l’écran (Y &lt; 250 px), en particulier le coin supérieur opposé à la main. ' +
        '    Inaccessible sans changer la prise en main ou utiliser une seconde main. Réservée aux actions rares ou passives ' +
        '    (titres de page, informations de statut, actions destructives protégées).</p>',
        '  </div>',
        '</div>',

        box(
          'important',
          'Conséquence sur la Barre de Navigation',
          '<p>Le menu hamburger placé tout en haut à gauche est une hérésie ergonomique sur grand smartphone moderne. ' +
          'La pratique recommandée aujourd’hui est la <strong>Bottom Navigation Bar (Tab Bar)</strong>, ' +
          'ancrée en bas de l’écran directement dans la Zone Naturelle du pouce.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Taille Minimale des Cibles Tactiles (Touch Target Size)',
      html: [
        '<p>Contrairement au pointeur d’une souris d’ordinateur qui est précis au pixel près, ' +
        'le doigt humain est une surface molle et imprécise (phénomène du <em>fat finger</em>). ' +
        'La pulpe d’un pouce d’adulte couvre une surface moyenne de 10 à 14 mm de diamètre :</p>',

        '<ul>',
        '  <li><strong>Norme Android Material Design :</strong> cible tactile minimale de <strong>48 x 48 dp (pixels)</strong>.</li>',
        '  <li><strong>Norme Apple iOS Human Interface Guidelines :</strong> cible tactile minimale de <strong>44 x 44 pt</strong>.</li>',
        '  <li><strong>Standard W3C WCAG 2.1 (Critère 2.5.5) :</strong> taille de cible recommandée d’au moins <strong>44 x 44 px</strong> (et 24 x 24 px en seuil strict AA dans WCAG 2.2).</li>',
        '</ul>',

        box(
          'tip',
          'Astuce Visuelle vs Cible Tactile Réelle',
          '<p>Une icône peut visuellement mesurer 20 x 20 px tout en respectant la norme si sa zone cliquable ' +
          'est étendue à l’aide d’un rembourrage interne (<code>padding: 14px;</code>) ou d’un pseudo-élément invisible, ' +
          'offrant ainsi les 48 x 48 px requis pour un appui sans erreur.</p>'
        )
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Conception et d’Audit d’une Interface Mobile Responsive',
  method: [
    'Étape 1 — Définir le chemin critique mobile : Lister les 3 actions fondamentales qu’un utilisateur mobile pressé doit accomplir en moins de 30 secondes.',
    'Étape 2 — Établir la grille fluide : Configurer les colonnes pour 4 (Mobile), 8 (Tablette) et 12 (Desktop) avec les marges de sécurité appropriées.',
    'Étape 3 — Positionner les actions dans la Thumb Zone : Placer le CTA principal et la barre de navigation dans le tiers inférieur (Zone Naturelle).',
    'Étape 4 — Dimensionner toutes les cibles tactiles : Vérifier qu’aucun bouton ni lien cliquable ne mesure moins de 48 x 48 px de surface interactive.',
    'Étape 5 — Gérer l’interaction avec le clavier virtuel : S’assurer que l’apparition du clavier sur mobile ne masque ni le champ en cours de saisie ni le bouton de confirmation.',
    'Étape 6 — Tester sur appareil réel en conditions nomades : Valider l’interface à une seule main, en marchant et sous forte luminosité ambiante.'
  ],

  summary: [
    'Le Mobile-First contraint à une hiérarchisation stricte de l’information avant d’enrichir l’expérience sur grand écran.',
    'Les breakpoints standards structurent l’affichage : &lt;640px (Mobile 4 col), 640-1023px (Tablette 8 col), &gt;=1024px (Desktop 12 col).',
    'Sur grand écran, le contenu doit être borné par un max-width pour conserver une longueur de ligne de lecture confortable.',
    'Près de la moitié des sessions mobiles s’effectuent à une seule main : la Thumb Zone privilégie le bas de l’écran.',
    'Le coin supérieur gauche est le point le plus difficile d’accès pour un utilisateur tenant son téléphone d’une main.',
    'La taille minimale d’une cible tactile est de 48x48 px (Android) ou 44x44 pt (iOS) pour éviter les frappes accidentelles.'
  ],

  checklist: [
    'Je comprends la différence fondamentale entre Graceful Degradation et Progressive Enhancement.',
    'Je sais découper une mise en page selon les 4 grands paliers de breakpoints responsive.',
    'Je sais pourquoi le menu hamburger en haut à gauche pose un sérieux problème d’ergonomie sur smartphone.',
    'Je connais la délimitation de la Zone Naturelle du pouce selon Steven Hoober.',
    'Je m’assure que tous les boutons et liens respectent le seuil de 48 x 48 px de cible tactile.',
    'Je sais comment étendre la surface tactile d’une petite icône sans altérer sa taille visuelle.'
  ],

  notions: [
    'Philosophie Mobile-First (Luke Wroblewski)',
    'Progressive Enhancement vs Degradation',
    'Breakpoints responsive (&lt;640, 640-1023, &gt;=1024px)',
    'Grilles fluides (4, 8 et 12 colonnes)',
    'Thumb Zone de Steven Hoober',
    'Zone Naturelle vs Zone Difficile',
    'Taille de cible tactile (Touch Target 48x48 px)',
    'Bottom Navigation Bar (Tab Bar)'
  ],

  pitfalls: [
    'Concevoir d’abord sur écran 4K puis tenter de tout entasser sur mobile : cela produit des interfaces surchargées et illisibles.',
    'Placer les boutons d’action critique tout en haut de l’écran sur mobile, obligeant l’utilisateur à utiliser ses deux mains.',
    'Créer des liens texte trop rapprochés les uns des autres (moins de 8 px d’écart), provoquant des clics parasites fréquents.',
    'Oublier de tester le comportement des formulaires lorsque le clavier virtuel du smartphone s’ouvre et réduit la hauteur d’écran de 50 %.'
  ],

  questions: [
    {
      stem: 'Quel est le postulat central de la méthode Mobile-First popularisée par Luke Wroblewski ?',
      opts: [
        'Interdire formellement aux utilisateurs de visiter le site depuis un ordinateur de bureau',
        'Concevoir d’abord pour le plus petit écran afin de forcer la hiérarchisation stricte de l’information et éliminer le superflu',
        'Créer deux sites web totalement indépendants avec deux bases de code distinctes',
        'Utiliser uniquement des images basse résolution pour économiser la bande passante 3G'
      ],
      correct: 1,
      exp: 'Le Mobile-First utilise la contrainte d’espace pour isoler les fonctionnalités essentielles et délivrer un produit épuré, qui sera ensuite enrichi sur grand écran.'
    },
    {
      stem: 'Dans un système de grille responsive standardisé, combien de colonnes utilise-t-on habituellement sur un viewport mobile inférieur à 640 px ?',
      opts: [
        '12 colonnes très serrées',
        '4 colonnes avec gouttières de 16 px',
        'Aucune colonne, le CSS l’interdit',
        '24 colonnes'
      ],
      correct: 1,
      exp: 'Sur écran mobile étroit (&lt; 640 px), la grille standard se compose de 4 colonnes, ce qui permet d’agencer des cartes pleine largeur ou en demi-largeur proprement.'
    },
    {
      stem: 'Selon les travaux de Steven Hoober sur la Thumb Zone, où se situe la «Zone Naturelle» d’un smartphone tenu à une seule main ?',
      opts: [
        'Tout en haut à gauche de l’écran',
        'Dans le tiers inférieur et central de l’écran (proche de la base du pouce)',
        'Uniquement sur la bordure droite du téléphone',
        'En plein centre géométrique exact à 1 pixel près'
      ],
      correct: 1,
      exp: 'Le pouce pivote autour de son articulation carpienne : la zone la plus naturelle d’accès sans effort s’étend dans le bas de l’écran, d’où l’efficacité des barres de navigation inférieures.'
    },
    {
      stem: 'Quelle est la taille minimale recommandée pour une cible tactile (Touch Target) selon les guidelines Android et WCAG 2.5.5 ?',
      opts: [
        '12 x 12 px',
        '48 x 48 px (ou 44 x 44 pt sur iOS)',
        '100 x 100 px obligatoirement',
        '8 x 8 px'
      ],
      correct: 1,
      exp: 'La pulpe du doigt mesure entre 10 et 14 mm : un carré d’au moins 48x48 px garantit que l’utilisateur peut appuyer sur l’élément sans toucher accidentellement un voisin.'
    },
    {
      stem: 'Pourquoi est-il fortement déconseillé de placer le menu de navigation principal (burger) en haut à gauche sur un grand smartphone ?',
      opts: [
        'Parce que le coin supérieur gauche est en Zone Difficile pour un utilisateur tenant son téléphone de la main droite',
        'Parce que le navigateur Safari masque systématiquement ce coin',
        'Parce que cela consomme trop de batterie',
        'Parce que le format SVG n’est pas supporté à cet endroit'
      ],
      correct: 0,
      exp: 'Pour un droitier manipulant son téléphone à une main, le coin haut gauche exige une extension pénible du pouce ou l’emploi de la seconde main, nuisant à l’ergonomie.'
    },
    {
      stem: 'Comment une icône visuelle de 24 x 24 px peut-elle être rendue conforme à la norme de cible tactile de 48 x 48 px ?',
      opts: [
        'En quadruplant la résolution de son fichier PNG',
        'En lui appliquant une zone de clic invisible élargie (padding de 12 px ou pseudo-élément transparent) atteignant 48 x 48 px',
        'C’est impossible, l’icône doit obligatoirement être agrandie visuellement',
        'En forçant l’utilisateur à double-cliquer'
      ],
      correct: 1,
      exp: 'La cible tactile (touch target) est la surface interactive cliquable, qui peut être plus large que le graphisme visible grâce à un padding adapté.'
    },
    {
      stem: 'Pourquoi applique-t-on un «max-width» sur le conteneur principal lors de l’affichage sur un écran Ultra-Wide (ex: 2560 px) ?',
      opts: [
        'Pour éviter que les lignes de texte ne deviennent trop longues (au-delà de 75-80 caractères), ce qui rendrait la lecture pénible',
        'Pour réduire la facture d’électricité du moniteur',
        'Parce que le langage HTML ne supporte pas les largeurs supérieures à 1920 px',
        'Pour masquer les bords de l’image de fond'
      ],
      correct: 0,
      exp: 'Si une ligne de texte s’étale sur 2000 pixels, l’œil humain perd le fil à chaque retour à la ligne. Un max-width (ex: 1280 px centré) préserve la lisibilité typographique.'
    },
    {
      stem: 'Quel problème d’interaction critique survient fréquemment sur mobile lors de la saisie d’un formulaire si la vue n’est pas optimisée ?',
      opts: [
        'La batterie se décharge instantanément',
        'Le clavier virtuel surgissant du bas de l’écran masque le champ de saisie actif ou le bouton de soumission',
        'Le processeur du téléphone redémarre systématiquement',
        'L’écran passe automatiquement en noir et blanc'
      ],
      correct: 1,
      exp: 'Le clavier virtuel occupe environ 40 à 50 % de la hauteur du viewport : l’interface doit scroller automatiquement pour maintenir le champ actif et le bouton de validation visibles.'
    }
  ],

  flashcards: [
    {
      q: 'Qu’est-ce que l’approche Mobile-First de Luke Wroblewski ?',
      a: 'Concevoir d’abord pour l’écran mobile le plus restreint afin de prioriser l’essentiel, avant d’enrichir l’interface sur les écrans plus larges.'
    },
    {
      q: 'Quels sont les nombres de colonnes usuels pour Mobile, Tablette et Desktop ?',
      a: '4 colonnes sur mobile (&lt;640px), 8 sur tablette (640-1023px) et 12 sur desktop (&gt;=1024px).'
    },
    {
      q: 'Qu’est-ce que la Thumb Zone de Steven Hoober ?',
      a: 'La cartographie ergonomique de l’écran mobile selon la facilité d’accès au pouce à une main : Zone Naturelle (bas), Étirée (centre) et Difficile (haut).'
    },
    {
      q: 'Quelle est la taille minimale recommandée d’une cible tactile ?',
      a: '48 x 48 px selon Android et WCAG 2.5.5 (44 x 44 pt sur iOS).'
    },
    {
      q: 'Pourquoi privilégier la Bottom Navigation Bar (Tab Bar) sur mobile ?',
      a: 'Elle se situe directement dans la Zone Naturelle du pouce, offrant un accès immédiat aux sections clés sans effort.'
    },
    {
      q: 'Pourquoi limiter la largeur maximale (max-width) sur très grand écran ?',
      a: 'Pour maintenir les lignes de texte entre 45 et 80 caractères et préserver le confort de lecture de l’œil humain.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la Thumb Zone, les breakpoints et la taille minimale des cibles tactiles.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes notions d’ergonomie mobile. Approfondissez les grilles fluides et l’impact du clavier virtuel.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des principes Mobile-First et de l’ergonomie tactile.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous concevez des interfaces mobiles et responsive d’une ergonomie irréprochable.' }
  ]
};
