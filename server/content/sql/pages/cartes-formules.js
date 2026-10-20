/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « SQL B2 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active</h1>',
    '  <p class="lead">36 fiches synthétiques pour consolider la syntaxe SQL, la modélisation relationnelle, les jointures, les propriétés ACID et l’optimisation des index.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento des formules' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours SQL B2 : notions clés des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento &amp; Syntaxe de Référence SQL ANSI</h1>',
    '  <p class="lead">Synthèse opérationnelle des commandes DDL/DML, expressions conditionnelles, fonctions de fenêtrage et niveaux d’isolation transactionnels.</p>',
    '',
    '  <h2>1. Définition de Données (DDL) &amp; Contraintes</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Commande / Clause</th><th>Syntaxe type</th><th>Rôle &amp; Comportement</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>CREATE TABLE</strong></td><td><code>CREATE TABLE t (id INT PRIMARY KEY, nom VARCHAR(50) NOT NULL);</code></td><td>Création d’une nouvelle table avec clé primaire et contrainte de présence.</td></tr>',
    '      <tr><td><strong>FOREIGN KEY</strong></td><td><code>FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE CASCADE</code></td><td>Maintien de l’intégrité référentielle avec suppression en cascade.</td></tr>',
    '      <tr><td><strong>CHECK</strong></td><td><code>CHECK (prix &gt; 0 AND stock &ge; 0)</code></td><td>Validation de domaine sur les colonnes lors des insertions et mises à jour.</td></tr>',
    '      <tr><td><strong>ALTER TABLE</strong></td><td><code>ALTER TABLE t ADD COLUMN date_creation DATE DEFAULT CURRENT_DATE;</code></td><td>Modification de la structure d’une table existante sans perte de données.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Manipulation (DML) &amp; Fonctions Scalaires</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Fonction / Opérateur</th><th>Exemple</th><th>Résultat &amp; Particularité</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>COALESCE</strong></td><td><code>COALESCE(val1, val2, \'Defaut\')</code></td><td>Renvoie la première valeur non-NULL (court-circuit logique).</td></tr>',
    '      <tr><td><strong>LIKE</strong></td><td><code>WHERE code LIKE \'A%_9\'</code></td><td>% = 0..N caractères quelconques, _ = exactement 1 caractère.</td></tr>',
    '      <tr><td><strong>CASE WHEN</strong></td><td><code>CASE WHEN age &ge; 18 THEN \'Majeur\' ELSE \'Mineur\' END</code></td><td>Expression conditionnelle avec branches ordonnées évaluées séquentiellement.</td></tr>',
    '      <tr><td><strong>TRUNCATE vs DELETE</strong></td><td><code>TRUNCATE TABLE logs;</code></td><td>TRUNCATE réinitialise l’espace sans journaliser ligne par ligne (DDL irréversible).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Jointures &amp; Algèbre Relationnelle</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Type de Jointure</th><th>Opération mathématique</th><th>Traitement des lignes sans correspondance</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>INNER JOIN</strong></td><td>Intersection (A ∩ B)</td><td>Seules les lignes ayant une clé commune sont conservées.</td></tr>',
    '      <tr><td><strong>LEFT JOIN</strong></td><td>A ∪ (A ∩ B)</td><td>Toutes les lignes de la table gauche sont conservées, complétées par NULL à droite.</td></tr>',
    '      <tr><td><strong>FULL OUTER JOIN</strong></td><td>Union complète (A ∪ B)</td><td>Toutes les lignes des deux tables sont conservées avec NULL pour les manques.</td></tr>',
    '      <tr><td><strong>CROSS JOIN</strong></td><td>Produit cartésien (A × B)</td><td>Associe chaque ligne de A à toutes les lignes de B (taille = |A| * |B|).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Fonctions de Fenêtrage (Window Functions)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Fonction analytique</th><th>Clause OVER</th><th>Description de l’effet</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>ROW_NUMBER()</strong></td><td><code>OVER (PARTITION BY dept ORDER BY score DESC)</code></td><td>Attribution d’un numéro séquentiel unique (1, 2, 3...) par partition.</td></tr>',
    '      <tr><td><strong>RANK()</strong></td><td><code>OVER (ORDER BY note DESC)</code></td><td>Classement avec ex aequo générant des sauts dans la numérotation (1, 2, 2, 4).</td></tr>',
    '      <tr><td><strong>DENSE_RANK()</strong></td><td><code>OVER (ORDER BY note DESC)</code></td><td>Classement avec ex aequo sans saut dans la séquence (1, 2, 2, 3).</td></tr>',
    '      <tr><td><strong>LAG(col, n)</strong></td><td><code>OVER (ORDER BY date_op ASC)</code></td><td>Accès à la valeur située n lignes en amont dans la partition ordonnée.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Transactions ACID &amp; Niveaux d’Isolation ANSI/ISO</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Niveau d’Isolation</th><th>Lecture Sale (Dirty Read)</th><th>Lecture Non Répétable</th><th>Lecture Fantôme (Phantom)</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Read Uncommitted</strong></td><td>Possible</td><td>Possible</td><td>Possible</td></tr>',
    '      <tr><td><strong>Read Committed</strong></td><td>Neutralisée</td><td>Possible</td><td>Possible</td></tr>',
    '      <tr><td><strong>Repeatable Read</strong></td><td>Neutralisée</td><td>Neutralisée</td><td>Possible (selon SGBD)</td></tr>',
    '      <tr><td><strong>Serializable</strong></td><td>Neutralisée</td><td>Neutralisée</td><td>Neutralisée (isolation totale)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Flashcards de révision' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento & Syntaxe SQL — ' + course.brand,
      description: 'Synthèse des clauses SQL ANSI, fonctions analytiques et niveaux d’isolation transactionnels.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
