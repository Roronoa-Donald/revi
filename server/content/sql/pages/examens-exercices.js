/**
 * Pages « examens » et « exercices » du cours « SQL B2 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées de SQL B2</h1>',
    '  <p class="lead">Deux sujets d’entraînement intensif conformes aux épreuves de licence informatique B2, accompagnés de leurs corrigés types et grilles d’évaluation détaillées.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Modélisation Relationnelle, DDL &amp; Jointures Avancées', [
      '<h4>Partie 1 : Questions de cours &amp; Algèbre relationnelle (6 points)</h4>',
      '<ol>',
      '  <li>Définissez les concepts d’intégrité référentielle et de clé primaire composite. Quelle est la différence entre ON DELETE CASCADE et ON DELETE RESTRICT ? (3 pts)</li>',
      '  <li>Expliquez pourquoi l’expression conditionnelle <code>WHERE date_naissance = NULL</code> est une erreur en SQL et comment tester correctement l’absence de valeur (3 pts).</li>',
      '</ol>',
      '<h4>Partie 2 : Requêtes SQL complexes (8 points)</h4>',
      '<p>Soit le schéma relationnel suivant d’une plateforme e-commerce :</p>',
      '<ul>',
      '  <li><code>Clients(id_client, nom, ville, email)</code></li>',
      '  <li><code>Commandes(id_cmd, date_cmd, id_client, montant_total)</code></li>',
      '  <li><code>LignesCommande(id_cmd, ref_produit, quantite, prix_unitaire)</code></li>',
      '</ul>',
      '<ol>',
      '  <li>Écrivez la requête listant tous les clients qui n’ont JAMAIS passé la moindre commande (utiliser une sous-requête avec NOT EXISTS ou un LEFT JOIN) (4 pts).</li>',
      '  <li>Écrivez la requête affichant le total des dépenses par client pour l’année 2025, en ne conservant que les clients ayant dépensé au moins 1 000 €, triés par montant décroissant (4 pts).</li>',
      '</ol>',
      '<h4>Partie 3 : Normalisation &amp; Contraintes DDL (6 points)</h4>',
      '<p>Écrivez l’instruction <code>CREATE TABLE</code> complète pour <code>LignesCommande</code> garantissant que la combinaison <code>(id_cmd, ref_produit)</code> est unique, que la quantité est strictement positive (&gt; 0) et que la suppression d’une commande entraîne la suppression automatique de ses lignes (6 pts).</p>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Intégrité référentielle (3 pts) :</strong> Garantit qu’une clé étrangère dans une table enfant référence une clé primaire existante et valide dans la table parente. <code>CASCADE</code> propage automatiquement la suppression du parent à ses enfants, tandis que <code>RESTRICT</code> bloque la suppression tant qu’au moins un enfant est rattaché.</li>',
      '  <li><strong>Valeurs NULL (3 pts) :</strong> En logique tri-valuée SQL, toute comparaison avec NULL via l’opérateur <code>=</code> produit <code>UNKNOWN</code> et est donc fausse dans un WHERE. Il faut impérativement employer le prédicat <code>IS NULL</code> (ou <code>IS NOT NULL</code>).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Clients sans commande (4 pts) :</strong><br>',
      '    <code>SELECT c.id_client, c.nom FROM Clients c WHERE NOT EXISTS (SELECT 1 FROM Commandes cmd WHERE cmd.id_client = c.id_client);</code></li>',
      '  <li><strong>Total annuel avec seuil (4 pts) :</strong><br>',
      '    <code>SELECT c.id_client, c.nom, SUM(cmd.montant_total) AS total_depenses<br>',
      '    FROM Clients c JOIN Commandes cmd ON c.id_client = cmd.id_client<br>',
      '    WHERE cmd.date_cmd BETWEEN \'2025-01-01\' AND \'2025-12-31\'<br>',
      '    GROUP BY c.id_client, c.nom<br>',
      '    HAVING SUM(cmd.montant_total) &gt;= 1000<br>',
      '    ORDER BY total_depenses DESC;</code></li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<div class="code-block">' +
      'CREATE TABLE LignesCommande (\n' +
      '    id_cmd INT,\n' +
      '    ref_produit VARCHAR(30),\n' +
      '    quantite INT NOT NULL CHECK (quantite &gt; 0),\n' +
      '    prix_unitaire DECIMAL(10,2) NOT NULL CHECK (prix_unitaire &ge; 0),\n' +
      '    PRIMARY KEY (id_cmd, ref_produit),\n' +
      '    FOREIGN KEY (id_cmd) REFERENCES Commandes(id_cmd) ON DELETE CASCADE\n' +
      ');' +
      '</div>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Final — Transactions ACID, Fonctions Analytiques &amp; Triggers', [
      '<h4>Partie 1 : Transactions ACID &amp; Verrous (7 points)</h4>',
      '<ol>',
      '  <li>Détaillez les quatre propriétés ACID d’un SGBD transactionnel (3,5 pts).</li>',
      '  <li>Décrivez les trois anomalies de concurrence classiques (lecture sale, lecture non répétable, lecture fantôme) et le niveau d’isolation minimal requis pour neutraliser chacune d’elles (3,5 pts).</li>',
      '</ol>',
      '<h4>Partie 2 : Fonctions de fenêtrage (Window Functions) (6 points)</h4>',
      '<p>À partir de la table <code>Ventes(vendeur_id, region, montant, date_vente)</code>, écrivez une requête affichant pour chaque vente : le nom du vendeur, sa région, le montant, son rang de vente au sein de sa région (<code>ROW_NUMBER()</code>) ainsi que le montant de la vente précédente effectuée dans la même région (<code>LAG()</code>) (6 pts).</p>',
      '<h4>Partie 3 : Déclencheurs (Triggers) &amp; Optimisation (7 points)</h4>',
      '<ol>',
      '  <li>Écrivez un déclencheur <code>BEFORE UPDATE</code> sur la table <code>ComptesBancaires(id, solde, decouvert_max)</code> interdisant la mise à jour si le nouveau solde est inférieur au découvert autorisé (déclencher une erreur SQL) (4 pts).</li>',
      '  <li>Expliquez la différence de coût d’exécution entre un <code>Seq Scan</code> et un <code>Index Scan</code> sur une table de 10 millions de lignes. Dans quelle situation le planificateur préférera-t-il un parcours séquentiel même si un index existe ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Final', [
      '<h4>Corrigé Partie 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Propriétés ACID (3,5 pts) :</strong> Atomicité (tout ou rien), Cohérence (respect des règles d’intégrité), Isolation (les transactions simultanées ne se perturbent pas), Durabilité (persistance sur disque après COMMIT).</li>',
      '  <li><strong>Anomalies &amp; Niveaux (3,5 pts) :</strong> Lecture sale (résolue par <em>Read Committed</em>), Lecture non répétable (résolue par <em>Repeatable Read</em>), Lecture fantôme (résolue par <em>Serializable</em> ou verrous de plage de clés).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (6 points)</h4>',
      '<div class="code-block">' +
      'SELECT\n' +
      '    vendeur_id,\n' +
      '    region,\n' +
      '    montant,\n' +
      '    ROW_NUMBER() OVER (PARTITION BY region ORDER BY montant DESC) AS rang_region,\n' +
      '    LAG(montant, 1) OVER (PARTITION BY region ORDER BY date_vente ASC) AS montant_precedent\n' +
      'FROM Ventes;' +
      '</div>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Trigger (4 pts) :</strong><br>',
      '    <div class="code-block">' +
      'CREATE TRIGGER check_solde_before_update\n' +
      'BEFORE UPDATE ON ComptesBancaires\n' +
      'FOR EACH ROW\n' +
      'BEGIN\n' +
      '    IF NEW.solde &lt; -NEW.decouvert_max THEN\n' +
      '        SIGNAL SQLSTATE \'45000\' SET MESSAGE_TEXT = \'Depassement de decouvert interdit\';\n' +
      '    END IF;\n' +
      'END;' +
      '    </div></li>',
      '  <li><strong>Optimisation (3 pts) :</strong> Le Seq Scan lit séquentiellement les 10 millions de blocs (coût O(N)). L’Index Scan parcourt un arbre B-Tree de profondeur 3 ou 4 (coût O(log N)). Le planificateur choisit le Seq Scan si la condition de filtrage sélectionne une large fraction de la table (ex: &gt; 20-30 % des lignes), car les lectures aléatoires de l’index deviendraient plus coûteuses qu’une lecture séquentielle continue.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'exercices.html', label: 'Voir le catalogue d’exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs & Corrigés — ' + course.brand,
      description: 'Sujets d’examen complets et corrigés détaillés du cours SQL B2.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices de code ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de code' }
  ]);

  const sections = chapterList.map(ch => [
    '  <h2>Module ' + ch.n + ' — ' + ch.title + '</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 1</span><span class="card__num">sql2-c' + ch.n + '-e1</span></div>',
    '      <h4 class="card__title">Exercice 1</h4>',
    '      <p class="card__desc">Atelier d’application directe des concepts du module ' + ch.n + '.</p>',
    '      <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-1">Résoudre dans le chapitre ' + ic('arrow-right') + '</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 2</span><span class="card__num">sql2-c' + ch.n + '-e2</span></div>',
    '      <h4 class="card__title">Exercice 2</h4>',
    '      <p class="card__desc">Cas pratique approfondi et résolution de contraintes relationnelles.</p>',
    '      <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-2">Résoudre dans le chapitre ' + ic('arrow-right') + '</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Niveau 3</span><span class="card__num">sql2-c' + ch.n + '-e3</span></div>',
    '      <h4 class="card__title">Exercice 3</h4>',
    '      <p class="card__desc">Défi technique avancé de niveau examen professionnel.</p>',
    '      <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-3">Résoudre dans le chapitre ' + ic('arrow-right') + '</a>',
    '    </div>',
    '  </div>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices de Code SQL B2</h1>',
    '  <p class="lead">3 ateliers pratiques progressifs par module (Niveau 1, Niveau 2, Niveau 3), exécutables et corrigés instantanément.</p>',
    '',
    sections,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: '../sommaire.html', label: 'Retour au sommaire' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Liste des 18 exercices de programmation et modélisation SQL B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
