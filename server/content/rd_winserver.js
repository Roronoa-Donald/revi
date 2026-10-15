/**
 * Contenu du cours « Windows Server » B2 (dossier `rd_winserver/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier rd_winserver/.
 *
 * Le découpage répartit les cinq modules historiques du cours RD WinServer en
 * six chapitres : sauvegarde, haute disponibilité, clustering, maintenance,
 * virtualisation et gestion des VM. Chaque chapitre s'exerce en PowerShell :
 * des scripts d'administration lus sur l'entrée standard.
 */
'use strict';

const chapitres = [
  ...require('./rd_winserver/chapitres-1-3'),
  ...require('./rd_winserver/chapitres-4-6')
];

const pages = require('./rd_winserver/pages');

const course = {
  id: 'rd_winserver',
  slug: 'rd_winserver',
  brand: 'Windows Server B2',
  brandIcon: 'cpu',

  // Indigo, assombri pour garder 4,5:1 sur blanc (texte AA) et un bon contraste
  // du texte blanc sur le bouton principal.
  accent: '#4f46e5',
  accentDeep: '#4338ca',
  accentSoft: '#eef2ff',
  accentBorder: '#c7d2fe',

  storeKey: 'b2winserver:progress',

  title: 'Windows Server B2 — administration, haute disponibilité et virtualisation',
  description:
    'Cours complet d’administration Windows Server niveau B2 : sauvegarde et reprise, haute ' +
    'disponibilité, clustering, maintenance préventive et corrective, virtualisation VMware (ESXi, ' +
    'réseaux virtuels, vCPU), puis snapshots, clones et sauvegarde des VM. Chaque notion est mise en ' +
    'œuvre dans un script PowerShell.',
  lead:
    'Administrer un serveur, c’est savoir le protéger, le rendre disponible et le faire évoluer. Six ' +
    'chapitres pour choisir et tester une stratégie de sauvegarde, concevoir un service hautement ' +
    'disponible, distinguer les cinq types de clusters, organiser la maintenance, administrer des VM ' +
    'sous VMware, puis les protéger avec snapshots, clones, templates et sauvegarde — chaque mécanisme ' +
    'étant prolongé par un script PowerShell.',

  sources: 'le cours historique RD WinServer (modules 1 à 5 : sauvegarde, haute disponibilité, maintenance, virtualisation/VMware, snapshots/clones)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
