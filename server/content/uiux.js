/**
 * Contenu du cours « UI/UX Design B2 » (dossier `uiux/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier uiux/.
 */
'use strict';

const chapitres = [
  ...require('./uiux/chapitres-1-3'),
  ...require('./uiux/chapitres-4-6')
];

const pages = require('./uiux/pages');

const course = {
  id: 'uiux',
  slug: 'uiux',
  brand: 'UI/UX Design B2',
  brandIcon: 'palette',

  // Sarcelle / Teal 700 / 800 accessible conforme WCAG AA / AAA (5.47:1 / 7.6:1 sur blanc)
  accent: '#0f766e',
  accentDeep: '#115e59',
  accentSoft: '#f0fdfa',
  accentBorder: '#99f6e4',

  storeKey: 'b2uiux:progress',

  title: 'UI/UX Design B2 — Conception Centrée Utilisateur, Ergonomie Cognitive &amp; Accessibilité Universelle',
  description:
    'Formation complète aux méthodes de conception d’interface (UI) et d’expérience utilisateur (UX) professionnelles : ' +
    'démarche centrée utilisateur (CCU) selon la norme ISO 9241-210, processus du Double Diamant (Design Council), ' +
    'recherche utilisateur qualitative et quantitative, modélisation de Personas basés sur des preuves empiriques, ' +
    'cartographie du parcours émotionnel (Customer Journey Map), tri de cartes et architecture de l’information, ' +
    'psychologie cognitive et ergonomie prédictive (Loi de Fitts, Loi de Hick-Hyman, Loi de Miller, Loi de Jakob), ' +
    'audit d’utilisabilité et évaluation heuristique selon les 10 critères de Jakob Nielsen, ' +
    'prototypage du croquis Lo-Fi au mockup Hi-Fi, système de grille 8pt, échelles modulaires typographiques, ' +
    'méthodologie Atomic Design de Brad Frost (Atomes, Molécules, Organismes, Templates, Pages) et Design Tokens, ' +
    'philosophie Mobile-First, grilles fluides par breakpoints (&lt;640, 640-1023, &gt;=1024px), Thumb Zone de Steven Hoober, ' +
    'dimensionnement ergonomique des cibles tactiles (48x48 px), et accessibilité numérique universelle (WCAG 2.1 niveau AA, ' +
    'formule de luminance relative et ratios de contraste 4.5:1 / 3:1, navigation clavier intégrale et gestion du focus tabindex).',
  lead:
    'Concevez des interfaces élégantes, intuitives, accessibles et fondées sur la psychologie cognitive et la rigueur scientifique. ' +
    'Six chapitres complets alliant théorie ergonomique, méthodes industrielles, 18 ateliers de programmation Python et QCM d’évaluation.',

  sources: 'la norme ISO 9241-210, le Design Council (Double Diamant), le Nielsen Norman Group (NN/g), les standards W3C WCAG 2.1, Material Design et Apple HIG',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
