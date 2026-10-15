/**
 * Contenu du cours « Administration Windows » B1.
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b1-admin-windows/.
 *
 * Le découpage suit les supports B1 du module (dossier « cours B1 IT /
 * ADMIN_WINDOWS », Dr Abasse KPEGOUNI) : introduction à l'administration
 * (rôle, tâches, qualités, types, outils), Windows Server 2012 R2 (éditions,
 * options d'installation, configuration requise, SAM), configuration initiale
 * (Gestionnaire de serveur, pare-feu, nom, IP statique, activation, accès à
 * distance), Active Directory AD DS (domaine/arbre/forêt, installation d'un
 * contrôleur de domaine, gestion des objets : UO, utilisateurs, groupes).
 * Six chapitres qui s'exercent tous en Bash : chaque règle — familles de
 * tâches, limites des éditions, syntaxes de session, profils du pare-feu,
 * validation d'IPv4, arborescences de domaines, matrice des informations AD,
 * cycle des comptes et des groupes — est simulée par un script qui reproduit
 * l'analyse exacte du support.
 */
'use strict';

const chapitres = [
  ...require('./b1-admin-windows/chapitres-1-3'),
  ...require('./b1-admin-windows/chapitres-4-6')
];

const pages = require('./b1-admin-windows/pages');

const course = {
  id: 'b1-admin-windows',
  slug: 'aw',
  brand: 'Administration Windows B1',
  brandIcon: 'cpu',
  accent: '#0369a1',
  accentDeep: '#075985',
  accentSoft: '#f0f9ff',
  accentBorder: '#bae6fd',

  storeKey: 'b1adminwindows:progress',

  title: 'Administration Windows : de Windows Server à Active Directory',
  description:
    'Cours complet B1 aligné sur les supports du module : l’administration système et l’administrateur ' +
    '(tâches, qualités, types d’administration, outils Windows), Windows Server 2012 R2 (histoire, ' +
    'éditions Foundation à Datacenter, Server Core contre interface graphique, configuration requise, ' +
    'SAM), la configuration initiale (Gestionnaire de serveur, pare-feu et ses trois profils, ' +
    'renommage, adresse IP statique en GUI et PowerShell, activation, accès à distance) et Active ' +
    'Directory AD DS (domaine, arbre, forêt, installation d’un contrôleur de domaine, unités ' +
    'd’organisation, utilisateurs et groupes). Chaque règle est scriptée en Bash et réellement ' +
    'exécutée dans la page.',

  lead:
    'Administrer Windows, c’est une suite d’actes précis : comprendre le métier d’administrateur, ' +
    'choisir la bonne édition de Windows Server 2012 R2, mettre le serveur d’aplomb (pare-feu, nom, ' +
    'IP, activation, accès distant), puis bâtir l’annuaire d’entreprise — installer AD DS, promouvoir ' +
    'un contrôleur de domaine, peupler le domaine d’unités d’organisation, d’utilisateurs et de ' +
    'groupes. Six chapitres pour ancrer chaque geste : chacun est d’abord programmé et vérifié dans ' +
    'l’atelier, puis rejoué tel quel sur les cas du support.',

  sources:
    'les supports B1 « Base de l’Administration Windows » (IT_B1A et IT_B1B) du Dr Abasse KPEGOUNI : ' +
    'introduction à l’administration Windows, installation du serveur Active Directory AD DS, gestion ' +
    'des objets AD DS (unités d’organisation, utilisateurs, groupes)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
