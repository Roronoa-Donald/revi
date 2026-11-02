/**
 * Chapitre 4 du cours « UI/UX Design B2 » — Wireframing, Grilles, Design Systems &amp; Atomic Design.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Wireframing, Grilles, Design Systems &amp; Atomic Design',
  short: 'Grilles &amp; Atomic Design',
  toc: 'Prototypes basse fidélité (Lo-Fi) vs haute fidélité (Hi-Fi), système de grille 8pt (8-point Grid System), échelles typographiques modulaires, méthodologie Atomic Design (Brad Frost), Design Tokens et cohérence d’interface.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une entreprise technologique en forte croissance voit son produit se fragmenter : ' +
    'au fil des ans, plus de 47 variantes de boutons ont été codées, 18 teintes de gris différentes coexistent dans le CSS, ' +
    'et chaque page utilise des marges arbitraires (13px, 19px, 27px) générant un rendu visuel chaotique et amateur. ' +
    'Les développeurs passent la moitié de leur temps à redévelopper des composants existants, tandis que les designers ' +
    'repartent de zéro à chaque fonctionnalité. ' +
    'Pour restaurer l’ordre, la cohérence visuelle et l’efficacité de production, l’équipe entreprend la création d’un Design System formel. ' +
    'Ce module forme les étudiants à structurer leurs composants selon l’Atomic Design de Brad Frost, ' +
    'à discipliner leurs espacements sur une grille 8pt et à orchestrer des Design Tokens industrialisables.',

  objectives: [
    'distinguer les niveaux de fidélité d’un prototype (du croquis papier au prototype cliquable haute fidélité) ;',
    'appliquer rigoureusement le système de grille 8pt (8-point grid system) pour harmoniser marges et dimensions ;',
    'calculer une échelle modulaire typographique (Modular Scale) pour garantir une hiérarchie de texte harmonieuse ;',
    'décomposer une interface complexe selon les 5 strates de l’Atomic Design (Atomes, Molécules, Organismes, Templates, Pages) ;',
    'définir et exporter des Design Tokens (couleurs, rayons, espacements) exploitables directement par les développeurs ;',
    'comprendre les mécanismes de disposition dynamique (Auto Layout) et de redimensionnement de conteneurs.'
  ],

  sections: [
    {
      title: 'Du Croquis Papier au Prototype Haute Fidélité (Hi-Fi)',
      html: [
        '<p>La conception d’une interface ne commence jamais par des détails graphiques léchés, mais progresse ' +
        'à travers des niveaux de fidélité croissants :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Niveau de fidélité</th>',
        '      <th>Support &amp; Outils</th>',
        '      <th>Objectif principal</th>',
        '      <th>Contenu représenté</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Croquis / Esquisse</strong></td>',
        '      <td>Papier, crayon, tableau blanc</td>',
        '      <td>Idéation rapide sans coût (Crazy 8), explorer 10 pistes en 10 minutes.</td>',
        '      <td>Formes géométriques simples, boîtes barrées pour les images, texte ondulé.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Wireframe Lo-Fi</strong></td>',
        '      <td>Balsamiq, Figma (niveaux de gris)</td>',
        '      <td>Valider l’architecture de l’information, la disposition et la hiérarchie.</td>',
        '      <td>Nuances de gris, typographie système neutre, absence totale de couleur de marque.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Mockup Hi-Fi</strong></td>',
        '      <td>Figma, Sketch, Adobe XD</td>',
        '      <td>Représentation visuelle pixel-perfect finale du produit.</td>',
        '      <td>Couleurs réelles, typographie officielle, iconographie, vraies données textuelles.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Prototype interactif</strong></td>',
        '      <td>Figma, ProtoPie, Framer</td>',
        '      <td>Simuler l’expérience dynamique et tester la cinématique avec les utilisateurs.</td>',
        '      <td>Transitions animées, micro-interactions, états survol (hover) et clic (active).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Le Système de Grille 8pt et Échelles Typographiques',
      html: [
        '<p>Une échelle d’espacement partagée peut faciliter la cohérence visuelle. ' +
        'La <strong>grille 8pt (8-point Grid System)</strong> est une convention de projet parmi d’autres :</p>',

        '<ul>',
        '  <li><strong>Multiples de 8 :</strong> une équipe peut choisir des espacements tels que <code>8, 16, 24, 32, 40 ou 48 px</code> pour composer son interface.</li>',
        '  <li><strong>Demi-grille de 4 :</strong> selon les règles du projet, une échelle de 4 px peut servir à des ajustements plus fins, par exemple entre une icône et son libellé.</li>',
        '  <li><strong>Limites :</strong> ces valeurs ne garantissent pas un rendu net : la densité, le zoom, les transformations et les besoins d’accessibilité comptent aussi. Elles ne sont pas imposées universellement.</li>',
        '</ul>',

        '<p><strong>L’Échelle Modulaire Typographique (Modular Scale) :</strong><br>' +
        'Au lieu de choisir des tailles de texte au hasard, on applique un ratio géométrique harmonique depuis une taille de base (généralement 16px) :<br>' +
        '<code>Taille = Base * (Ratio)^k</code>. Exemples de ratios majeurs : Major Third (1.250), Perfect Fourth (1.333), Golden Ratio (1.618).'
      ].join('\n')
    },
    {
      title: 'L’Atomic Design de Brad Frost et les Design Tokens',
      html: [
        '<p>Pour concevoir des interfaces modulaires et scalables, Brad Frost a modélisé en 2013 la méthodologie de l’<strong>Atomic Design</strong>, ' +
        'inspirée de la chimie fondamentale :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Les 5 Niveaux de l’Atomic Design</h4>',
        '    <ol>',
        '      <li><strong>Atomes :</strong> Éléments indivisibles de base (couleurs, polices, boutons, champs de saisie, icônes).</li>',
        '      <li><strong>Molécules :</strong> Combinaisons simples d’atomes fonctionnant ensemble (ex: un champ texte + un label + un bouton = barre de recherche).</li>',
        '      <li><strong>Organismes :</strong> Assemblages complexes de molécules et d’atomes formant une section autonome d’interface (ex: barre de navigation complète avec logo, recherche et profil).</li>',
        '      <li><strong>Templates :</strong> Squelettes de pages organisant les organismes dans une grille spatiale sans contenu réel.</li>',
        '      <li><strong>Pages :</strong> Instances concrètes des templates garnies avec les vrais contenus finaux (textes réels, photos).</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Design Tokens : La Source Unique de Vérité</h4>',
        '    <p>Un <strong>Design Token</strong> est une variable agnostique de plateforme qui stocke une décision de design ' +
        'sous un nom sémantique (ex: <code>color-primary-base: #0f766e</code>, <code>spacing-md: 16px</code>).</p>',
        '    <ul>',
        '      <li>Permet de synchroniser instantanément les maquettes Figma, le code CSS/Web, l’application iOS (Swift) et Android (Kotlin).</li>',
        '      <li>Facilite la refonte globale ou l’implémentation d’un thème sombre (Dark Mode) en modifiant une seule ligne de token.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Méthodologie de Construction d’un Design System d’Entreprise',
  method: [
    'Étape 1 — Inventorier l’existant (UI Audit) : Répertorier tous les boutons, couleurs et polices dispersés dans le produit actuel.',
    'Étape 2 — Établir les Tokens fondamentaux : Définir la palette de couleurs sémantiques, l’échelle typographique et l’échelle de grille 8pt.',
    'Étape 3 — Forger les Atomes : Créer les composants élémentaires avec tous leurs états d’interaction (Default, Hover, Active, Focus, Disabled).',
    'Étape 4 — Assembler les Molécules et Organismes : Composer les formulaires et barres de navigation avec l’Auto Layout de Figma.',
    'Étape 5 — Structurer la documentation : Rédiger les guidelines d’usage (quand utiliser ce composant, critères d’accessibilité, règles de responsive).',
    'Étape 6 — Synchroniser avec le référentiel de code : Exporter les tokens en format JSON/CSS pour alimenter directement les feuilles de style des développeurs.'
  ],

  summary: [
    'Le cycle de design progresse du croquis papier rapide au prototype interactif haute fidélité.',
    'Une grille 8pt peut faciliter un rythme d’espacement cohérent, sans garantir le rendu sur tous les écrans.',
    'Une échelle typographique modulaire repose sur une taille de base multipliée par un ratio harmonique.',
    'L’Atomic Design décompose l’interface en 5 niveaux hiérarchiques : Atomes, Molécules, Organismes, Templates et Pages.',
    'Les Design Tokens encapsulent les décisions de design dans des variables transverses réutilisables entre Figma et le code.',
    'L’Auto Layout permet aux composants de s’adapter automatiquement à la taille de leurs contenus et de leur conteneur.'
  ],

  checklist: [
    'Je sais distinguer un wireframe Lo-Fi d’un mockup Hi-Fi.',
    'Je maîtrise la règle de dimensionnement et d’espacement de la grille 8pt.',
    'Je sais calculer les crans d’une échelle typographique modulaire.',
    'Je sais classer un élément dans les 5 strates de l’Atomic Design de Brad Frost.',
    'Je comprends le rôle d’un Design Token dans la synchronisation design/développement.',
    'Je sais pourquoi les Atomes doivent définir leurs états complets (hover, focus, disabled).'
  ],

  notions: [
    'Niveaux de fidélité (Lo-Fi vs Hi-Fi)',
    'Système de grille 8pt (8-point Grid)',
    'Demi-grille 4pt (micro-espacements)',
    'Échelle typographique modulaire',
    'Atomic Design de Brad Frost',
    'Atomes, Molécules, Organismes',
    'Templates et Pages',
    'Design Tokens sémantiques'
  ],

  pitfalls: [
    'Utiliser des marges arbitraires impaires (ex: 13px, 17px) qui détruisent l’alignement et le rythme visuel.',
    'Mettre de la couleur et des logos dès le premier wireframe : cela distrait les testeurs de l’architecture de l’information.',
    'Confondre une Molécule et un Organisme : un organisme est autonome et complexe (ex: Header complet), la molécule est un petit groupe indissociable (ex: recherche).',
    'Coder des valeurs en dur dans le CSS (ex: hexadécimaux bruts) au lieu de consommer les variables des Design Tokens.',
    'Concevoir des maquettes statiques sans prévoir le comportement de redimensionnement dynamique (Auto Layout).'
  ],

  questions: [
    {
      stem: 'Quel est un intérêt possible d’une échelle d’espacement partagée, telle qu’une grille 8pt ?',
      opts: [
        'Le chiffre 8 porte bonheur selon la tradition typographique',
        'Elle facilite la cohérence des espacements entre les composants du projet',
        'Cela permet de compresser les images au format JPEG plus rapidement',
        'C’est le seul système accepté par le W3C pour valider le code HTML'
      ],
      correct: 1,
      exp: 'Une échelle partagée facilite les choix cohérents ; elle ne garantit pas le rendu sur tous les écrans.'
    },
    {
      stem: 'Quand une équipe peut-elle utiliser une demi-grille de 4 px ?',
      opts: [
        'Pour les marges de toutes les grandes cartes de contenu',
        'Lorsque la convention de son projet prévoit ces espacements, par exemple pour un ajustement fin',
        'Uniquement sur les écrans de télévision 4K',
        'Elle est formellement interdite sans exception'
      ],
      correct: 1,
      exp: 'Une échelle de 4 px peut servir à des ajustements fins si l’équipe la retient ; ses usages ne sont pas universels.'
    },
    {
      stem: 'Dans l’Atomic Design de Brad Frost, à quelle strate appartient une barre de navigation complète comprenant un logo, une barre de recherche et un menu profil ?',
      opts: ['Un Atome', 'Une Molécule', 'Un Organisme', 'Un Template'],
      correct: 2,
      exp: 'Un Organisme est un composant d’interface complet et autonome formé de l’assemblage de plusieurs molécules (la recherche) et atomes (le logo, le profil).'
    },
    {
      stem: 'Quelle est la différence fondamentale entre un «Template» et une «Page» en Atomic Design ?',
      opts: [
        'Le template est codé en HTML, la page en PHP',
        'Le template est le squelette structurel avec des données factices ou vides, tandis que la page est l’instance concrète garnie avec les vraies données réelles finales',
        'Le template est réservé au mobile, la page au desktop',
        'Il n’y a aucune différence technique'
      ],
      correct: 1,
      exp: 'Le template définit la mise en page et les conteneurs abstraits. La page injecte le contenu réel pour tester la résistance du layout face aux données réelles (textes longs, photos).'
    },
    {
      stem: 'Qu’est-ce qu’un «Design Token» dans un système de design moderne ?',
      opts: [
        'Un jeton cryptographique pour payer les designers en Bitcoin',
        'Une variable nommée de manière sémantique qui encapsule une décision de design (couleur, espacement, police) partageable entre outils de design et code source',
        'Un cookie de session HTTP pour sécuriser Figma',
        'Une police de caractères sous licence libre'
      ],
      correct: 1,
      exp: 'Les Design Tokens sont les briques atomiques de variables (ex: color-primary, spacing-md) qui unifient le langage visuel entre designers et ingénieurs logiciels.'
    },
    {
      stem: 'Pourquoi recommande-t-on de réaliser les premiers wireframes en niveaux de gris (Lo-Fi) sans couleurs ?',
      opts: [
        'Pour économiser l’encre lors des impressions papier',
        'Pour focaliser l’attention des parties prenantes sur la hiérarchie de l’information et le parcours sans que les débats ne dérivent sur les préférences de couleurs',
        'Parce que les navigateurs ne savent pas afficher de couleurs avant la compilation',
        'C’est une obligation légale selon la norme ISO'
      ],
      correct: 1,
      exp: 'La couleur est émotionnelle et polarisante. Travailler en gris oblige l’équipe à valider la structure, les flux et l’utilisabilité avant de parler d’esthétique.'
    },
    {
      stem: 'Comment calcule-t-on la taille d’un titre H1 dans une échelle typographique modulaire de base 16px avec un ratio Major Third de 1.25 au cran k=3 ?',
      opts: [
        '16 + 1.25 * 3 = 19.75px',
        '16 * (1.25)^3 = 16 * 1.953 = environ 31px',
        '16 * 3 = 48px',
        '1.25^16 = un nombre infini'
      ],
      correct: 1,
      exp: 'L’échelle géométrique applique la puissance du ratio : 16 * 1.25^3 = 31.25px, ce qui s’arrondit proprement à 31px dans les feuilles de style CSS.'
    },
    {
      stem: 'Dans Figma ou les outils UI modernes, quel est le bénéfice fondamental de la fonctionnalité «Auto Layout» (équivalent de Flexbox) ?',
      opts: [
        'Elle génère automatiquement des images par intelligence artificielle',
        'Elle permet aux conteneurs et boutons de s’étirer ou de se contracter automatiquement lorsque leur contenu textuel change ou que la langue change',
        'Elle corrige automatiquement les fautes d’orthographe',
        'Elle bloque les calques pour empêcher toute modification'
      ],
      correct: 1,
      exp: 'L’Auto Layout reproduit le flux dynamique du web : un bouton s’agrandit naturellement si son libellé est plus long (ex: traduction allemande), sans retouche manuelle du designer.'
    }
  ],

  flashcards: [
    {
      q: 'Qu’est-ce que le système de grille 8pt ?',
      a: 'Une convention de projet qui utilise notamment des multiples de 8 pour les espacements ; elle peut faciliter la cohérence sans garantir la netteté du rendu.'
    },
    {
      q: 'Quand utilise-t-on la demi-grille de 4px ?',
      a: 'Selon la convention du projet, pour des ajustements plus fins, par exemple entre une icône et son libellé.'
    },
    {
      q: 'Quels sont les 5 niveaux de l’Atomic Design de Brad Frost ?',
      a: '1. Atomes, 2. Molécules, 3. Organismes, 4. Templates, 5. Pages.'
    },
    {
      q: 'Qu’est-ce qu’un Design Token ?',
      a: 'Une variable sémantique (ex: spacing-lg: 24px) synchronisant une décision de design entre les maquettes et le code source de production.'
    },
    {
      q: 'Pourquoi les wireframes initiaux doivent-ils être en niveaux de gris ?',
      a: 'Pour tester et valider l’utilisabilité et la structure sans être distrait par des discussions esthétiques sur les couleurs.'
    },
    {
      q: 'Qu’est-ce qu’une échelle typographique modulaire (Modular Scale) ?',
      a: 'Une suite géométrique de tailles de texte calculée à partir d’une taille de base multipliée par un ratio harmonique fixe.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la grille 8pt, les niveaux de fidélité et la hiérarchie de l’Atomic Design.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle acquis. Approfondissez les Design Tokens et le calcul d’échelles typographiques modulaires.' },
    { cls: 'good', text: '7/8 : Excellente maîtrise des systèmes de design modulaires et de la composition d’interface.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous architecturez des Design Systems au niveau des meilleurs standards de l’industrie.' }
  ]
};
