/**
 * Contenu du cours « Linux B1 ».
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-linux/.
 *
 * Le découpage suit le support « cours B1 IT/LINUX » (Chap.1 Système, Chap.2
 * Système de fichier, Chap.3 Installation Debian 12, Chap.4 Commandes de base
 * Unix, Chap.5 Gestion des utilisateurs et groupes, TP2 Droits d'accès), 
 * réorganisé en six chapitres qui s'exercent tous en Bash : le terminal simulé
 * lit le même langage que le vrai terminal de la salle TP.
 */
'use strict';

const chapitres = [
  ...require('./b1-linux/chapitres-1-3'),
  ...require('./b1-linux/chapitres-4-6')
];

const pages = require('./b1-linux/pages');

const course = {
  id: 'b1-linux',
  slug: 'lx',
  brand: 'Linux B1',
  brandIcon: 'terminal',

  // Orange de marque, assombri pour garder 4,5:1 sur blanc (texte AA) et un
  // bon contraste du texte blanc sur le bouton principal.
  accent: '#c2410c',
  accentDeep: '#9a3412',
  accentSoft: '#fff1e7',
  accentBorder: '#f6d4bb',

  storeKey: 'b1lx:progress',

  title: 'Linux B1 — arborescence, droits, comptes et scripts',
  description:
    'Cours complet de système Linux niveau B1 : histoire et architecture de GNU/Linux, arborescence et ' +
    'systèmes de fichiers, installation de Debian 12, commandes de base du terminal, comptes utilisateurs ' +
    'et groupes, droits d’accès et scripts shell. Chaque mécanisme du système est scripté en Bash et ' +
    'réellement exécuté dans la page.',
  lead:
    'Sous Linux, tout est fichier et toute action passe par un terminal. Six chapitres pour apprendre à ' +
    'lire l’arborescence, à raisonner en droits d’accès, à gérer comptes et groupes, puis à écrire des ' +
    'scripts Bash qui automatisent le tout — chaque mécanisme étant d’abord programmé et vérifié dans ' +
    'l’atelier, exactement comme on le tapera ensuite dans un vrai terminal.',

  sources: 'le support « Système Linux B1 ITA &amp; ITB » du Dr Abasse KPEGOUNI (système, fichiers, Debian 12, commandes de base, utilisateurs et groupes, TP droits d’accès)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
