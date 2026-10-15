/**
 * Contenu du cours « Assembleur » B2 (dossier `assembleur/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier assembleur/.
 */
'use strict';

const chapitres = [
  ...require('./assembleur/chapitres-1-3'),
  ...require('./assembleur/chapitres-4-6')
];

const pages = require('./assembleur/pages');

const course = {
  id: 'assembleur',
  slug: 'assembleur',
  brand: 'Assembleur B2',
  brandIcon: 'cpu',

  // Orange 700 / Orange 800 accessible conforme WCAG AA (5.18:1 / 7.31:1 sur blanc)
  accent: '#c2410c',
  accentDeep: '#9a3412',
  accentSoft: '#fff7ed',
  accentBorder: '#fed7aa',

  storeKey: 'b2asm:progress',

  title: 'Architecture &amp; Programmation en Assembleur B2 — Du Transistor au Noyau Linux',
  description:
    'Cours complet d’Architecture des Ordinateurs et Programmation Assembleur niveau B2 : ' +
    'représentation de l’information (binaire, hexadécimal, complément à 2, virgule flottante IEEE 754), ' +
    'modèle de von Neumann et microarchitecture du CPU (ALU, registres x86_64, cycle fetch-decode-execute, drapeaux EFLAGS), ' +
    'mémoire et bus (SRAM, DRAM, Little-Endian, segmentation, pagination, GPIO AVR), ' +
    'structure d’un programme assembleur (sections ELF, directives NASM, symboles globaux, alignement mémoire), ' +
    'jeu d’instructions x86 (MOV, LEA, arithmétique, modes d’adressage SIB, équivalents AVR) et ' +
    'contrôle de flux, gestion de la pile, conventions d’appel (cdecl, System V AMD64 ABI) et appels système Linux.',
  lead:
    'Comprenez enfin ce qui se passe sous le capot de votre machine. ' +
    'Six chapitres d’ingénierie matérielle et logicielle pour maîtriser les registres, dompter la pile ' +
    'et dialoguer directement avec le processeur et le noyau du système.',

  sources: 'le cours d’Architecture et Programmation en Assembleur B2, les manuels d’architecture logicielle Intel 64 et IA-32, la documentation NASM et la spécification System V AMD64 ABI',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
