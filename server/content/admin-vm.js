/**
 * Contenu du cours « Admin VM » B2 (dossier `admin-vm/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier admin-vm/.
 *
 * Les sept modules historiques sont condensés en six chapitres : introduction à
 * la virtualisation, prérequis et architecture, cycle de vie et ressources,
 * stockage, réseau virtualisé, puis administration avancée. Chaque chapitre
 * s'exerce en PowerShell (scripts d'administration lus sur l'entrée standard).
 */
'use strict';

const chapitres = [
  ...require('./admin-vm/chapitres-1-3'),
  ...require('./admin-vm/chapitres-4-6')
];

const pages = require('./admin-vm/pages');

const course = {
  id: 'admin-vm',
  slug: 'admin-vm',
  brand: 'Admin VM B2',
  brandIcon: 'blocks',

  // Bleu ciel de marque, assombri pour garder 4,5:1 sur blanc (texte AA).
  accent: '#0369a1',
  accentDeep: '#075985',
  accentSoft: '#f0f9ff',
  accentBorder: '#bae6fd',

  storeKey: 'b2adminvm:progress',

  title: 'Admin VM B2 — virtualisation, stockage, réseau et haute disponibilité',
  description:
    'Cours complet d’administration des machines virtuelles niveau B2 : hyperviseurs de type 1 et 2, ' +
    'prérequis matériels et architecture, cycle de vie et ressources des VM, stockage (LVM, NFS/iSCSI, ' +
    'GFS), réseau virtualisé (bridge, VLAN, DMZ), puis administration avancée (réservations, clusters, ' +
    'migration, sauvegarde et durcissement). Chaque notion est mise en œuvre dans un script PowerShell.',
  lead:
    'Administrer des machines virtuelles, c’est comprendre sur quoi elles reposent et comment elles se ' +
    'partagent. Six chapitres pour choisir un hyperviseur, vérifier ses prérequis, cycler une VM, ' +
    'structurer le stockage, cloisonner le réseau et administrer un cluster — chaque mécanisme étant ' +
    'prolongé par un script PowerShell.',

  sources: 'le cours historique Admin VM (modules 1 à 7 : introduction, prérequis, architecture, cycle de vie, stockage, réseau, administration avancée)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
