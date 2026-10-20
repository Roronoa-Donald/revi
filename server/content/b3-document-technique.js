/**
 * Contenu du cours « Document Technique B3 » (dossier `b3-document-technique/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-document-technique/.
 */
'use strict';

const chapitres = [
  ...require('./b3-document-technique/chapitres-1-3'),
  ...require('./b3-document-technique/chapitres-4-6')
];

const pages = require('./b3-document-technique/pages');

const course = {
  id: 'b3-document-technique',
  slug: 'b3-document-technique',
  brand: 'Document Technique B3',
  brandIcon: 'file',

  // Slate sobre & accessible conforme WCAG AA/AAA (8.35:1 / 12.63:1 sur blanc)
  accent: '#334155',
  accentDeep: '#1e293b',
  accentSoft: '#f8fafc',
  accentBorder: '#cbd5e1',

  storeKey: 'b3doctech:progress',

  title: 'Élaboration de Document Technique B3 — Typologie, Spécifications, Exploitation, OpenAPI &amp; Docs-as-Code',
  description:
    'Formation d’excellence en ingénierie de la documentation technique pour le Bachelor 3 : ' +
    'typologie des livrables et profilage des audiences (QQOQCP / 5W1H, calibrage du jargon, pyramide inversée), ' +
    'spécifications fonctionnelles et techniques détaillées (SFD/STD, diagrammes Use Case, matrices de traçabilité des exigences RTM, ' +
    'flux réseau et matrices d’ouverture des flux), dossiers d’architecture et d’exploitation (DAT, DEX, Runbooks pas-à-pas, ' +
    'politiques de sauvegarde et bascule PRA RTO/RPO), documentation d’API REST (approche API-First, spécification OpenAPI 3.0, ' +
    'sémantique des codes HTTP, schémas JSON et portails Swagger UI), paradigme moderne Docs-as-Code (Markdown GFM, ' +
    'diagrammes textuels Mermaid.js, générateurs statiques MkDocs et Docusaurus, validation continue en pipelines CI/CD), ' +
    'et gouvernance de la qualité documentaire (métriques de lisibilité ASL, vérification automatisée des liens internes/externes, ' +
    'détection algorithmique des stale docs et intégration dans la Definition of Done).',
  lead:
    'Maîtrisez la conception, la formalisation rigoureuse et l’industrialisation automatisée des livrables techniques en entreprise. ' +
    'Six modules complets combinant fondements méthodologiques, 18 ateliers de programmation interactive en Python 3 et 48 QCM d’évaluation.',

  sources: 'le cours Support_Elaboration Document Technique.pdf (Yan NYAKU), document_technique.docx, la spécification OpenAPI 3.0, la norme CommonMark et les référentiels Docs-as-Code',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
