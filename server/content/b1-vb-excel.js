/**
 * Cours complet : Programmation VBA sous Excel — B1.
 *
 * Construit à partir du support officiel B1 IT « Programmation VBA »
 * (Dr TCHAZINO Tchamiè, 47 pages, support1.pdf) :
 * - Chapitre 1 : Introduction à VBA, l'onglet Développeur, l'enregistreur de
 *                macros et l'éditeur VBE (Alt+F11).
 * - Chapitre 2 : Le Modèle Objet Excel (Application → Workbooks → Worksheets →
 *                Range / Cells).
 * - Chapitre 3 : Propriétés (Value, Formula, Interior.Color, Font.Bold),
 *                Méthodes (Select, ClearContents, Copy, AutoFit) et Événements
 *                (Workbook_Open, Worksheet_Change).
 * - Chapitre 4 : Variables, Types de données (Integer, Long, Double, String,
 *                Boolean, Variant, Option Explicit), Opérateurs et Fonctions
 *                (Sub vs Function).
 * - Chapitre 5 : Structures de contrôle (If...Then...ElseIf...End If,
 *                Select Case, boucles For...Next, For Each...In,
 *                Do While/Until...Loop).
 * - Chapitre 6 : Boîtes de dialogue (MsgBox, InputBox), Gestion des erreurs
 *                (On Error GoTo) et Formulaires (UserForm).
 */
'use strict';

const chapitres1a3 = require('./b1-vb-excel/chapitres-1-3');
const chapitres4a6 = require('./b1-vb-excel/chapitres-4-6');
const pages = require('./b1-vb-excel/pages');

const chapterList = [].concat(chapitres1a3, chapitres4a6);

const course = {
  id: 'b1-vb-excel',
  slug: 'vba',
  brand: 'VB Excel B1',
  brandIcon: 'chart',
  storeKey: 'b1vbexcel:progress',
  title: 'Programmation VBA sous Excel — B1',
  description:
    'Cours interactif de Programmation VBA sous Excel (B1) — enregistreur de macros, éditeur VBE (Alt+F11), ' +
    'Modèle Objet Excel (Application, Workbooks, Worksheets, Range, Cells, Offset), propriétés, méthodes, ' +
    'événements, variables (Option Explicit), fonctions personnalisées, boucles, MsgBox/InputBox, gestion des ' +
    'erreurs (On Error GoTo) et formulaires UserForm. 18 exercices corrigés et QCM.',
  lead:
    'De la première macro enregistrée jusqu’aux formulaires UserForm et à la gestion des erreurs : ce cours ' +
    'couvre l’intégralité du support officiel du Dr TCHAZINO Tchamiè (47 pages) et vous apprend à automatiser ' +
    'Excel avec rigueur grâce à Visual Basic for Applications (VBA).',
  sources: 'Programmation VBA sous Excel (Dr TCHAZINO Tchamiè, 47 pages, support1.pdf — programme officiel B1 IT)',

  /* Palette vert Excel officielle — contraste WCAG AA ≥ 4.5:1 sur blanc */
  accent: '#217346',
  accentDeep: '#166534',
  accentSoft: '#f0fdf4',
  accentBorder: '#bbf7d0',

  chapters: chapterList.map(chapitre => ({ n: chapitre.n, short: chapitre.short, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapterList);
  }
};

module.exports = course;
