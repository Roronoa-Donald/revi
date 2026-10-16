/**
 * Pages « examens blancs » et « exercices & projet » du cours « Recherche Opérationnelle » B2.
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 : Modélisation, Résolution Graphique &amp; Simplexe',
      intro: 'Évaluation théorique et appliquée : modélisation de production, résolution par Cramer, itération du simplexe et cas limites.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Modélisation d’un Mix de Production',
          text: 'Une chocolaterie artisanale fabrique deux types de boîtes : « Prestige » ($x_1$) et « Délice » ($x_2$). ' +
          'Une boîte Prestige exige 0,4 kg de cacao et 0,2 kg de noisettes, pour un bénéfice de 12 €. ' +
          'Une boîte Délice exige 0,2 kg de cacao et 0,3 kg de noisettes, pour un bénéfice de 9 €. ' +
          'Le stock disponible est de 80 kg de cacao et 60 kg de noisettes. Formulez le programme linéaire complet.',
          sol: '<strong>1. Variables de décision :</strong><br>' +
            '- $x_1$ = nombre de boîtes Prestige à fabriquer.<br>' +
            '- $x_2$ = nombre de boîtes Délice à fabriquer.<br>' +
            '<strong>2. Fonction objectif :</strong><br>' +
            '$\\text{MAX } Z = 12 x_1 + 9 x_2$ (bénéfice total en euros).<br>' +
            '<strong>3. Contraintes technologiques :</strong><br>' +
            '- Cacao : $0,4 x_1 + 0,2 x_2 \\le 80$<br>' +
            '- Noisettes : $0,2 x_1 + 0,3 x_2 \\le 60$<br>' +
            '<strong>4. Contraintes de non-négativité :</strong><br>' +
            '$x_1 \\ge 0, \\quad x_2 \\ge 0$.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Résolution Graphique &amp; Règle de Cramer',
          text: 'Résolvez graphiquement le problème de la chocolaterie. Calculez les coordonnées exactes du sommet formé par l’intersection des deux contraintes actives par la règle de Cramer. Quelle est la production optimale et le profit maximal associé ?',
          sol: 'Les deux droites frontières sont :<br>' +
            '(D1) $0,4 x_1 + 0,2 x_2 = 80 \\iff 2 x_1 + x_2 = 400$<br>' +
            '(D2) $0,2 x_1 + 0,3 x_2 = 60 \\iff 2 x_1 + 3 x_2 = 600$<br>' +
            'Calcul par la règle de Cramer :<br>' +
            '$\\Delta = 2 \\times 3 - 2 \\times 1 = 6 - 2 = 4$.<br>' +
            '$x_1 = (400 \\times 3 - 600 \\times 1) / 4 = (1200 - 600) / 4 = 600 / 4 = 150$.<br>' +
            '$x_2 = (2 \\times 600 - 2 \\times 400) / 4 = (1200 - 800) / 4 = 400 / 4 = 100$.<br>' +
            'Évaluation des sommets de la région réalisable :<br>' +
            '- $(0, 0) \\to Z = 0 €$<br>' +
            '- $(200, 0) \\to Z = 12 \\times 200 = 2400 €$<br>' +
            '- $(0, 200) \\to Z = 9 \\times 200 = 1800 €$<br>' +
            '- $(150, 100) \\to Z = 12 \\times 150 + 9 \\times 100 = 1800 + 900 = 2700 €$.<br>' +
            '<strong>Optimum :</strong> fabriquer <strong>150 boîtes Prestige</strong> et <strong>100 boîtes Délice</strong> pour un profit maximal de <strong>2 700 €</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Déroulement d’un Tableau du Simplexe',
          text: 'Soit le programme linéaire : MAX $Z = 3 x_1 + 2 x_2$ sous $2 x_1 + x_2 \\le 10$ et $x_1 + 2 x_2 \\le 8$, $x_1, x_2 \\ge 0$. Dressez le tableau initial du simplexe, identifiez la variable entrante et la variable sortante, effectuez le pivot et concluez sur la nouvelle solution.',
          sol: 'Forme standard avec variables d’écart $s_1, s_2 \\ge 0$ :<br>' +
            '$2 x_1 + x_2 + s_1 = 10$<br>' +
            '$x_1 + 2 x_2 + s_2 = 8$<br>' +
            'MAX $Z = 3 x_1 + 2 x_2 + 0 s_1 + 0 s_2$.<br>' +
            '1. <em>Tableau initial</em> : Base = $\{s_1, s_2\}$. Coûts réduits $\\Delta = [3, 2, 0, 0]$.<br>' +
            '- Variable entrante : $\\max(3, 2) = 3 \\to x_1$ entre en base (colonne 1).<br>' +
            '- Ratios : $s_1 \\to 10/2 = 5$ ; $s_2 \\to 8/1 = 8$. Min ratio = $5 \\to s_1$ sort de la base.<br>' +
            '- Pivot : $p = 2$ à la ligne 1.<br>' +
            '2. <em>Pivotage</em> :<br>' +
            '- L1 : $x_1 + 0,5 x_2 + 0,5 s_1 = 5$<br>' +
            '- L2 : $0 x_1 + 1,5 x_2 - 0,5 s_1 + s_2 = 3$<br>' +
            '- Ligne $\\Delta$ : devient $[0, 0,5, -1,5, 0]$ avec $Z = 15$.<br>' +
            'Comme $\\Delta_2 = 0,5 > 0$, l’optimum n’est pas atteint, $x_2$ entrera au tour suivant.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Diagnostic de Dégénérescence & Non-Bornitude',
          text: 'Définissez la dégénérescence dans l’algorithme du simplexe. Quel risque entraîne-t-elle pour l’algorithme et comment la règle de Bland permet-elle d’y remédier ? Quelle condition sur la colonne pivot indique qu’un problème est non borné ?',
          sol: '1. <em>Dégénérescence</em> : elle survient lorsqu’au moins une variable de base a une valeur nulle ($b_i = 0$), résultant d’une égalité dans le calcul du ratio minimum. Lors du pivot, la valeur de $Z$ n’augmente pas ($Z_{k+1} = Z_k$).<br>' +
            '2. <em>Risque de cyclage</em> : une succession de pivots dégénérés peut faire revisiter une même base déjà explorée, enfermant l’algorithme dans une boucle infinie.<br>' +
            '3. <em>Règle de Bland</em> : en choisissant systématiquement la variable de plus petit indice parmi les candidates entrantes et sortantes, Robert Bland a démontré que le cyclage est rigoureusement impossible.<br>' +
            '4. <em>Non-bornitude</em> : si pour une variable entrante ($c_k > 0$), tous les coefficients de sa colonne sont négatifs ou nuls ($a_{ik} \\le 0$ pour tout $i$), la variable $x_k$ peut tendre vers $+\\infty$ sans qu’aucune contrainte ne soit violée, d’où $Z \\to +\\infty$.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 : Dualité, Transport MODI &amp; Ordonnancement PERT',
      intro: 'Sujet d’expertise : théorèmes de dualité, matrice de transport équilibrée, méthode MODI, chemin critique et Ford-Fulkerson.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Construction du Dual &amp; Prix d’Ombre',
          text: 'Soit le programme primal MAX $Z = 5 x_1 + 4 x_2$ sous $x_1 + 2 x_2 \\le 12$ et $3 x_1 + x_2 \\le 15$ avec $x_1, x_2 \\ge 0$. Écrivez le programme dual associé. Sachant que la solution primale optimale est $x_1^* = 3,6$ et $x_2^* = 4,2$, déterminez les prix d’ombre des deux ressources à l’aide des écarts complémentaires.',
          sol: '1. <em>Programme Dual</em> :<br>' +
            'MIN $W = 12 y_1 + 15 y_2$<br>' +
            'sous $y_1 + 3 y_2 \\ge 5$ et $2 y_1 + y_2 \\ge 4$ avec $y_1, y_2 \\ge 0$.<br>' +
            '2. <em>Écarts complémentaires</em> :<br>' +
            'Puisque $x_1^* = 3,6 > 0$ et $x_2^* = 4,2 > 0$, les deux contraintes duales sont saturées avec égalité stricte :<br>' +
            '$y_1 + 3 y_2 = 5$<br>' +
            '$2 y_1 + y_2 = 4$<br>' +
            'En multipliant la première par 2 : $2 y_1 + 6 y_2 = 10$. En soustrayant : $5 y_2 = 6 \\iff y_2^* = 1,2$.<br>' +
            'D’où $y_1^* = 4 - 1,2 = 2,8 / 2 = 1,4$.<br>' +
            '3. <em>Interprétation</em> : le prix d’ombre de la ressource 1 est de <strong>1,40 €</strong> et celui de la ressource 2 est de <strong>1,20 €</strong>. Une unité de ressource 1 en plus augmentera le profit de 1,40 €.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Méthode des Deux Phases',
          text: 'Pourquoi une contrainte du type $2 x_1 + 3 x_2 \\ge 18$ empêche-t-elle de démarrer le simplexe avec l’origine ? Comment formule-t-on le programme de Phase 1 et comment interpréter l’arrêt si Min W = 2 ?',
          sol: '1. La mise sous forme standard donne $2 x_1 + 3 x_2 - e_1 = 18$. À l’origine ($x_1=0, x_2=0$), on aurait $e_1 = -18 < 0$, violant la non-négativité.<br>' +
            '2. On ajoute une variable artificielle $a_1 \\ge 0$ : $2 x_1 + 3 x_2 - e_1 + a_1 = 18$.<br>' +
            '3. La <strong>Phase 1</strong> pose l’objectif MIN $W = a_1$ (somme des variables artificielles).<br>' +
            '4. Si à l’optimum de Phase 1 on trouve $\\min W = 2 > 0$, cela prouve qu’il est impossible d’annuler les variables artificielles tout en respectant le système : le <strong>programme d’origine est irréalisable (faisabilité impossible)</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Optimisation de Transport par MODI',
          text: 'Un tableau de transport équilibré compte 2 usines ($O_1=30, O_2=40$) et 2 clients ($D_1=35, D_2=35$). Coûts : $c_{11}=2, c_{12}=5, c_{21}=4, c_{22}=3$. Calculez la solution par la méthode du Moindre Coût et vérifiez son optimalité par les potentiels MODI ($u_i + v_j = c_{ij}$).',
          sol: '1. <em>Moindre Coût</em> :<br>' +
            '- Min en (1,1) coût 2 : allouer $q = \\min(30, 35) = 30$. $O_1=0$, reste $D_1=5$.<br>' +
            '- Cellules restantes en ligne 2 : (2,1) coût 4 et (2,2) coût 3. Min en (2,2) : allouer $q = \\min(40, 35) = 35$. $D_2=0$, reste $O_2=5$.<br>' +
            '- Dernière cellule (2,1) : allouer $q = 5$.<br>' +
            'Base : $(1,1)=30, (2,1)=5, (2,2)=35$. Coût total = $30 \\times 2 + 5 \\times 4 + 35 \\times 3 = 60 + 20 + 105 = 185 €$.<br>' +
            '2. <em>Potentiels MODI</em> :<br>' +
            '- Poser $u_1 = 0$.<br>' +
            '- Case (1,1) de base : $u_1 + v_1 = c_{11} \\iff 0 + v_1 = 2 \\iff v_1 = 2$.<br>' +
            '- Case (2,1) de base : $u_2 + v_1 = c_{21} \\iff u_2 + 2 = 4 \\iff u_2 = 2$.<br>' +
            '- Case (2,2) de base : $u_2 + v_2 = c_{22} \\iff 2 + v_2 = 3 \\iff v_2 = 1$.<br>' +
            '3. <em>Évaluation de la case vide (1,2)</em> :<br>' +
            '$\\Delta_{12} = c_{12} - (u_1 + v_2) = 5 - (0 + 1) = +4 \\ge 0$.<br>' +
            'Tous les $\\Delta_{ij} \\ge 0$, la solution trouvée est <strong>strictement optimale</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Ordonnancement PERT &amp; Chemin Critique',
          text: 'Un projet comporte 4 tâches : A (durée 3, aucun prédécesseur), B (durée 4, prédécesseur A), C (durée 2, prédécesseur A), D (durée 5, prédécesseurs B et C). Calculez les dates au plus tôt (ES, EF), au plus tard (LS, LF), les marges totales de chaque tâche et donnez le chemin critique.',
          sol: '1. <em>Forward Pass (Dates au plus tôt)</em> :<br>' +
            '- A : $ES = 0, EF = 0 + 3 = 3$<br>' +
            '- B : $ES = 3, EF = 3 + 4 = 7$<br>' +
            '- C : $ES = 3, EF = 3 + 2 = 5$<br>' +
            '- D : $ES = \\max(EF_B, EF_C) = \\max(7, 5) = 7, EF = 7 + 5 = 12$<br>' +
            '<strong>Durée totale du projet = 12 jours.</strong><br>' +
            '2. <em>Backward Pass (Dates au plus tard)</em> :<br>' +
            '- D : $LF = 12, LS = 12 - 5 = 7$<br>' +
            '- B : $LF = LS_D = 7, LS = 7 - 4 = 3$<br>' +
            '- C : $LF = LS_D = 7, LS = 7 - 2 = 5$<br>' +
            '- A : $LF = \\min(LS_B, LS_C) = \\min(3, 5) = 3, LS = 3 - 3 = 0$<br>' +
            '3. <em>Marges totales (MT = LF - EF)</em> :<br>' +
            '- $MT(A) = 3 - 3 = 0$<br>' +
            '- $MT(B) = 7 - 7 = 0$<br>' +
            '- $MT(C) = 7 - 5 = 2$ jours de battement<br>' +
            '- $MT(D) = 12 - 12 = 0$<br>' +
            '<strong>Chemin critique : A &rarr; B &rarr; D</strong> (tâches à marge nulle).'
        }
      ]
    }
  ];

  const htmlSujets = sujets.map((s, idx) => {
    const itemsHtml = s.items.map(it => [
      '    <div class="exam-item">',
      '      <div class="exam-item-head">',
      '        <span class="exam-item-num">' + it.num + '</span>',
      '        <span class="badge">' + it.badge + '</span>',
      '      </div>',
      '      <p class="exam-item-text">' + it.text + '</p>',
      '      <details class="solution-toggle">',
      '        <summary>Voir le corrigé détaillé</summary>',
      '        <div class="solution-content">',
      '          <p>' + it.sol + '</p>',
      '        </div>',
      '      </details>',
      '    </div>'
    ].join('\n')).join('\n');

    return [
      '  <div class="exam-block">',
      '    <h2>' + s.title + '</h2>',
      '    <p class="lead">' + s.intro + '</p>',
      itemsHtml,
      '  </div>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens blancs' }]),
    '  <h1>Examens blancs — Recherche Opérationnelle</h1>',
    '  <p class="lead">Deux sujets complets et corrigés pour vous préparer aux épreuves de cycle ingénieur B2. ' +
    'Entraînez-vous dans les conditions réelles pour maîtriser les calculs manuels et algorithmiques.</p>',
    disclaimer('Ces examens couvrent l’ensemble des compétences d’optimisation linéaire, matricielle et de graphes de décision.'),
    htmlSujets,
    chnav({ href: 'exercices.html', label: 'Exercices et projet' }, { href: '../sommaire.html', label: 'Sommaire' })
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs corrigés — ' + course.brand,
      description: 'Deux épreuves complètes corrigées de Recherche Opérationnelle B2 : simplexe, dualité, transport MODI et chemin critique PERT.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices & Projet ======================== */

function exercices(course) {
  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices & Projet' }]),
    '  <h1>Exercices d’application &amp; Projet intégrateur</h1>',
    '  <p class="lead">Mettez en pratique vos acquis à travers des études de cas d’optimisation avancées et réalisez ' +
    'le grand projet intégrateur : constituer le <strong>Dossier d’Optimisation Linéaire &amp; d’Ordonnancement Décisionnel (MODI)</strong>.</p>',

    '  <h2>Ateliers d’application ciblés</h2>',

    box('info', 'Atelier 1 — Résolution Analytique Complète de PL 2D', [
      '<p><strong>Énoncé :</strong> À partir d’un cahier des charges de production à $m$ contraintes linéaires ' +
      '$a_{i1} x_1 + a_{i2} x_2 \\le b_i$ et une fonction objectif $Z = c_1 x_1 + c_2 x_2$, ' +
      'déterminez analytiquement toutes les intersections de frontières par la règle de Cramer, délimitez la région réalisable ' +
      'et démontrez les coordonnées exactes du sommet optimal.</p>',
      '<p><strong>Livrable :</strong> Résolution géométrique et algébrique justifiée avec étude des cas de dégénérescence ou parallélisme ($\\Delta = 0$).</p>'
    ].join('\n')),

    box('tip', 'Atelier 2 — Optimisation Logistique avec Matrice de Transport et MODI', [
      '<p><strong>Énoncé :</strong> À partir d’une matrice de distribution $m \\times n$, établissez la solution initiale par la règle du Moindre Coût, ' +
      'déterminez le système de potentiels $(u_i, v_j)$, identifiez le coût marginal le plus négatif et retracez la boucle fermée ' +
      'de transfert de flux $\\theta$ jusqu’à l’arrêt optimal.</p>',
      '<p><strong>Critère de réussite :</strong> Preuve formelle d’optimalité certifiée par des coûts réduits tous positifs ou nuls ($\\Delta_{ij} \\ge 0$).</p>'
    ].join('\n')),

    box('warning', 'Atelier 3 — Ordonnancement de Chantier Industriel PERT / CPM', [
      '<p><strong>Énoncé :</strong> À partir d’un dictionnaire des antériorités de 12 tâches, construisez le réseau PERT, ' +
      'calculez les dates au plus tôt ($ES, EF$), les dates au plus tard ($LS, LF$) et les marges totales et libres. ' +
      'Isolez l’ensemble des chemins critiques et déterminez l’impact d’un aléa de 3 jours sur une tâche non critique.</p>',
      '<p><strong>Livrable :</strong> Tableau complet des marges et diagramme de réseau annoté.</p>'
    ].join('\n')),

    '  <h2>Projet intégrateur : Dossier MODI (Modélisation &amp; Optimisation Décisionnelle Industrielle)</h2>',
    '  <p>Ce projet d’envergure industrielle consiste à concevoir et formaliser une étude d’optimisation globale pour une chaîne de production et de distribution internationale sans approximation empirique.</p>',

    box('standard', 'Cahier des charges du Projet MODI', [
      '<h3>1. Module Modélisation &amp; Simplexe Deux Phases</h3>',
      '<ul>',
      '  <li>Formulation mathématique rigoureuse d’un problème de mix de production multi-usines.</li>',
      '  <li>Mise sous forme standard avec variables d’écart, d’excès et variables artificielles.</li>',
      '  <li>Résolution manuelle pas à pas de la Phase 1 (faisabilité) puis de la Phase 2 (optimalité).</li>',
      '  <li>Application de la règle de Bland pour prévenir tout cyclage.</li>',
      '</ul>',
      '<h3>2. Module Dualité &amp; Sensibilité Économique</h3>',
      '<ul>',
      '  <li>Écriture du programme dual associé et démonstration de l’égalité des optimums ($Z^* = W^*$).</li>',
      '  <li>Interprétation économique détaillée des prix d’ombre (shadow prices) sur chaque ressource contrainte.</li>',
      '  <li>Détermination des intervalles de stabilité des coefficients économiques $c_j$ et des disponibilités $b_i$.</li>',
      '</ul>',
      '<h3>3. Module Distribution Logistique &amp; Transport</h3>',
      '<ul>',
      '  <li>Équilibrage de la matrice offre/demande par ajout d’entrepôts fictifs si nécessaire.</li>',
      '  <li>Initialisation par la méthode de Vogel (VAM) et optimisation pas à pas par MODI.</li>',
      '  <li>Résolution du problème d’affectation de chauffeurs par l’algorithme Hongrois.</li>',
      '</ul>',
      '<h3>4. Module Gestion de Projet &amp; Flots Maximaux</h3>',
      '<ul>',
      '  <li>Construction du réseau PERT/CPM avec identification formelle des goulets d’étranglement.</li>',
      '  <li>Calcul de la capacité de débit maximal de la chaîne logistique par l’algorithme de Ford-Fulkerson.</li>',
      '  <li>Vérification du théorème Min-Cut Max-Flow sur la coupe de capacité minimale.</li>',
      '</ul>'
    ].join('\n')),

    box('info', 'Barème d’évaluation du Projet MODI (Total : 20 points)', [
      '<table class="table">',
      '  <thead><tr><th>Composante évaluée</th><th>Barème</th><th>Critères de notation</th></tr></thead>',
      '  <tbody>',
      '    <tr><td><strong>Modélisation &amp; Résolution Simplexe</strong></td><td>6 pts</td><td>Formulation standard exacte, tableaux de Dantzig complets et justifications des pivots.</td></tr>',
      '    <tr><td><strong>Analyse Duale &amp; Sensibilité</strong></td><td>4 pts</td><td>Transposition duale rigoureuse, prix d’ombre et analyse marginale des ressources.</td></tr>',
      '    <tr><td><strong>Plan de Transport &amp; Affectation</strong></td><td>5 pts</td><td>Initialisation VAM/Moindre Coût, cycle de marchepied et matrice hongroise.</td></tr>',
      '    <tr><td><strong>Réseau PERT &amp; Coupe Minimale</strong></td><td>3 pts</td><td>Calculs forward/backward sans faille, marges totales et coupe de Ford-Fulkerson.</td></tr>',
      '    <tr><td><strong>Rigueur méthodologique &amp; Rédaction</strong></td><td>2 pts</td><td>Structure claire, notations mathématiques normalisées et synthèse décisionnelle.</td></tr>',
      '  </tbody>',
      '</table>'
    ].join('\n')),

    chnav({ href: 'formules.html', label: 'Mémo des formules de RO' }, { href: 'examens.html', label: 'Examens blancs corrigés' })
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices d’application &amp; Projet MODI — ' + course.brand,
      description: 'Ateliers d’optimisation linéaire et grand dossier de recherche opérationnelle MODI noté sur 20.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
