/**
 * Contenu du cours « Administration Linux » B2.
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier linux/.
 *
 * Le découpage suit le cours historique d'administration Linux (Debian) :
 * terminal et arborescence, manipulation de fichiers et recherche, droits et
 * comptes, réseau et SSH, scripts Bash, services et planification — six
 * chapitres qui s'exercent tous en Bash, exécuté réellement dans la page.
 */
'use strict';

const chapitres = [
  ...require('./linux/chapitres-1-3'),
  ...require('./linux/chapitres-4-6')
];

const pages = require('./linux/pages');

const course = {
  id: 'linux',
  slug: 'linux',
  brand: 'Administration Linux B2',
  brandIcon: 'terminal',

  // Orange de marque, assombri pour garder 4,5:1 sur blanc (texte AA) et un
  // bon contraste du texte blanc sur le bouton principal.
  accent: '#c2410c',
  accentDeep: '#9a3412',
  accentSoft: '#fff1e7',
  accentBorder: '#f6d4bb',

  storeKey: 'b2linux:progress',

  title: 'Administration Linux B2 — fichiers, droits, réseau et services',
  description:
    'Cours complet d’administration Linux niveau B2 : terminal et arborescence FHS, manipulation de ' +
    'fichiers, droits et comptes, configuration réseau statique et SSH, scripts Bash, puis supervision ' +
    'des services, des processus et des tâches planifiées. Chaque mécanisme du serveur est scripté en ' +
    'Bash et réellement exécuté dans la page.',
  lead:
    'Administrer un serveur, c’est piloter un système en ligne de commande. Six chapitres pour maîtriser ' +
    'l’arborescence, manipuler fichiers et liens, calculer des droits justes, gérer les comptes, ' +
    'configurer le réseau et SSH, écrire des scripts Bash, puis superviser services et processus — chaque ' +
    'mécanisme étant d’abord programmé et vérifié dans l’atelier, exactement comme sur une vraie machine.',

  sources: 'le cours historique d’administration Linux (Debian) : terminal, fichiers, droits, réseau, scripts et services',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
