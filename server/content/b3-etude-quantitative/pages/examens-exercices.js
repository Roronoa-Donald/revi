/**
 * Pages « examens » et « exercices » du cours « Étude Quantitative & Qualitative B3 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées d’Étude Quantitative &amp; Qualitative B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences méthodologiques et académiques de niveau Bachelor 3 / Licence 3.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Épistémologie, Échantillonnage de Cochran &amp; Conception de Questionnaires', [
      '<h4>Partie 1 : Fondements Épistémologiques &amp; Cadrage de Recherche (6 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément le paradigme positiviste (quantitatif) du paradigme interprétativiste (qualitatif) selon leur mode de raisonnement (déductif vs inductif), la nature de leurs données et leur objectif scientifique. (3 pts)</li>',
      '  <li>Expliquez le principe de la triangulation méthodologique selon Denzin. Citez les quatre types de triangulation et montrez pourquoi elle est indispensable pour éliminer les biais d’un chercheur isolé. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Théorie de l’Échantillonnage &amp; Formule de Cochran (7 points)</h4>',
      '<ol>',
      '  <li>Une DSI souhaite mesurer la satisfaction de ses utilisateurs vis-à-vis d’un nouvel ERP d’entreprise. La population totale compte $N = 1\\,200$ collaborateurs. Avec un niveau de confiance de 95% ($z = 1.96$), une marge d’erreur souhaitée de 5% ($e = 0.05$) et une hypothèse de variabilité maximale ($p = 0.5$), calculez la taille d’échantillon brute $n_0$, puis la taille corrigée pour population finie $n$. (4 pts)</li>',
      '  <li>La population de 1 200 personnes se décompose en 3 départements : Ingénierie (600 salariés), Opérations (360 salariés) et Support (240 salariés). Calculez la répartition de l’échantillon stratifié proportionnel pour chaque département. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Conception de Questionnaires &amp; Échelles de Mesure (7 points)</h4>',
      '<ol>',
      '  <li>Identifiez et expliquez les deux biais méthodologiques majeurs présents dans la question suivante : <em>« Ne pensez-vous pas que le nouveau portail cloud est rapide et ergonomique ? »</em>. Proposez une reformulation neutre et conforme. (3 pts)</li>',
      '  <li>Une question de satisfaction mesurée sur une échelle de Likert de 1 à 5 auprès de 100 répondants donne la distribution suivante : 1 (5 réponses), 2 (10), 3 (20), 4 (45), 5 (20). Calculez la moyenne pondérée $\\mu$, la variance $\\sigma^2$ et l’écart-type $\\sigma$. Interprétez le niveau de consensus. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Positivisme vs Interprétativisme (3 pts) :</strong> Le paradigme positiviste repose sur un raisonnement déductif (partir de théories existantes pour tester des hypothèses chiffrées), traite des données numériques quantifiables et vise la mesure objective et la généralisation statistique. À l’inverse, le paradigme interprétativiste privilégie un raisonnement inductif (partir des observations du terrain pour faire émerger des concepts), traite des données textuelles et qualitatives (mots, vécus, récits) et vise la compréhension approfondie du sens donné par les acteurs.</li>',
      '  <li><strong>Triangulation de Denzin (3 pts) :</strong> La triangulation consiste à croiser plusieurs angles d’approche pour valider la robustesse des conclusions. Les 4 types sont : triangulation des données (sources variées dans le temps et l’espace), triangulation des chercheurs (plusieurs observateurs indépendants), triangulation théorique (confrontation de grilles d’analyse différentes) et triangulation méthodologique (combinaison quantitatif et qualitatif). Elle neutralise la subjectivité d’un chercheur unique.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Calcul de Cochran (4 pts) :</strong><br>' +
      '    $$n_0 = \\frac{1.96^2 \\times 0.5 \\times 0.5}{0.05^2} = \\frac{3.8416 \\times 0.25}{0.0025} = 384.16$$<br>' +
      '    Correction pour population finie ($N = 1\\,200$) :<br>' +
      '    $$n = \\frac{n_0}{1 + \\frac{n_0 - 1}{N}} = \\frac{384.16}{1 + \\frac{383.16}{1200}} = \\frac{384.16}{1 + 0.3193} = \\frac{384.16}{1.3193} \\approx 291.18 \\rightarrow 292\\text{ répondants}$$</li>',
      '  <li><strong>Échantillon stratifié proportionnel (3 pts) :</strong><br>' +
      '    - Ingénierie : $W_1 = 600/1200 = 50.0\\% \\rightarrow n_1 = \\text{round}(292 \\times 0.50) = 146$ collaborateurs.<br>' +
      '    - Opérations : $W_2 = 360/1200 = 30.0\\% \\rightarrow n_2 = \\text{round}(292 \\times 0.30) = 88$ collaborateurs.<br>' +
      '    - Support : $W_3 = 240/1200 = 20.0\\% \\rightarrow n_3 = \\text{round}(292 \\times 0.20) = 58$ collaborateurs.<br>' +
      '    Total : $146 + 88 + 58 = 292$.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Analyse de Biais de Formulation (3 pts) :</strong><br>' +
      '    1. <em>Biais suggestif (Leading question) :</em> La formule « Ne pensez-vous pas » oriente psychologiquement le répondant vers l’assentiment.<br>' +
      '    2. <em>Biais double détente (Double-barrelled) :</em> « rapide et ergonomique » évalue deux dimensions indépendantes (un système peut être très rapide mais difficile à utiliser).<br>' +
      '    <em>Reformulation neutre :</em> Découper en deux items distincts sur échelle de Likert neutre : « Comment évaluez-vous la rapidité du portail cloud ? » et « Comment évaluez-vous l’ergonomie du portail cloud ? ».</li>',
      '  <li><strong>Calculs Likert (4 pts) :</strong><br>' +
      '    $$\\mu = \\frac{1(5) + 2(10) + 3(20) + 4(45) + 5(20)}{100} = \\frac{5 + 20 + 60 + 180 + 100}{100} = \\frac{365}{100} = 3.65$$<br>' +
      '    $$\\sigma^2 = \\frac{5(1-3.65)^2 + 10(2-3.65)^2 + 20(3-3.65)^2 + 45(4-3.65)^2 + 20(5-3.65)^2}{100} = 1.1275$$<br>' +
      '    $$\\sigma = \\sqrt{1.1275} \\approx 1.06$$<br>' +
      '    <em>Interprétation :</em> La moyenne de 3.65/5.00 indique une appréciation modérément positive, avec un écart-type modéré (1.06) traduisant un regroupement majoritaire sur les notes 4 et 5 malgré une minorité insatisfaite.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Collecte Qualitative, Tests Statistiques (Chi-deux, Pearson) &amp; Rédaction de Mémoire', [
      '<h4>Partie 1 : Collecte Qualitative &amp; Focus Groups (6 points)</h4>',
      '<ol>',
      '  <li>Lors de l’organisation d’un focus group de 8 personnes, le modérateur constate qu’un responsable d’équipe accapare 55% du temps de parole total. Quels sont les impacts négatifs majeurs de ce biais de dominance sur la validité scientifique des données ? Quelles techniques d’animation le modérateur doit-il mobiliser pour rétablir l’équilibre ? (3 pts)</li>',
      '  <li>Deux chercheurs codent indépendamment 20 séquences comportementales in situ. Ils obtiennent un accord sur 17 séquences. Calculez le taux d’accord brut $P_0$. Selon le référentiel de Miles &amp; Huberman ($P_0 \\ge 85\\%$), la grille d’observation est-elle scientifiquement validée ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Analyse Statistique Bivariée (8 points)</h4>',
      '<ol>',
      '  <li>Une enquête analyse l’adoption d’une certification de cybersécurité selon le profil métier (Dev vs Ops). Sur 100 professionnels interrogés :<br>' +
      '    - Développeurs : 40 certifiés, 10 non certifiés (Total = 50).<br>' +
      '    - Ops : 20 certifiés, 30 non certifiés (Total = 50).<br>' +
      '    Calculez les effectifs théoriques pour chaque case, la statistique du Chi-deux $\\chi^2$, et concluez au seuil critique $\\alpha = 0.05$ (valeur critique pour 1 ddl = 3.84). Existe-t-il un lien statistiquement significatif entre le métier et la certification ? (5 pts)</li>',
      '  <li>Une étude mesure la corrélation linéaire entre l’expérience en années ($X$) et le score de test de détection d’incidents ($Y$) sur 5 ingénieurs : $X = [1, 2, 3, 4, 5]$ et $Y = [2, 4, 5, 4, 5]$. Calculez le coefficient de corrélation linéaire de Pearson $r$ et qualifiez la force de la relation. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Restitution &amp; Rédaction du Mémoire Professionnel CDP Sup (6 points)</h4>',
      '<ol>',
      '  <li>Présentez les 6 composantes académiques obligatoires de l’ossature d’un mémoire professionnel selon le référentiel CDP Sup. Expliquez le rôle charnière de la section « Discussion » par rapport aux sections « Résultats » et « Revue de Littérature ». (4 pts)</li>',
      '  <li>Pourquoi est-il méthodologiquement inacceptable de formuler des recommandations managériales qui ne découlent pas directement des résultats empiriques démontrés dans le mémoire ? (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Biais de dominance en Focus Group (3 pts) :</strong> Ce biais engendre l’effet Asch (conformisme de groupe) : les autres participants taisent leurs divergences par peur du conflit ou respect hiérarchique, biaisant gravement la représentativité des opinions exprimées. Pour rétablir l’équilibre, le modérateur doit distribuer explicitement la parole (« Merci pour ce point de vue, donnons maintenant la parole à ceux qui ne se sont pas encore exprimés »), utiliser des techniques de post-it anonymes (brainwriting) ou solliciter nominativement les participants discrets.</li>',
      '  <li><strong>Accord inter-observateurs (3 pts) :</strong><br>' +
      '    $$P_0 = \\frac{17}{20} \\times 100 = 85.0\\%$$<br>' +
      '    Le seuil de Miles &amp; Huberman ($85\\%$) est exactement atteint. La grille est considérée comme scientifiquement fiable et reproductible, les définitions des codes comportementaux étant suffisamment claires pour deux observateurs indépendants.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Test du Chi-deux (5 pts) :</strong><br>' +
      '    Totaux : $R_1 = 50$, $R_2 = 50$, $C_1 = 40+20 = 60$, $C_2 = 10+30 = 40$, $N = 100$.<br>' +
      '    Effectifs théoriques sous $H_0$ :<br>' +
      '    $E_a = (50 \\times 60) / 100 = 30$, $E_b = (50 \\times 40) / 100 = 20$, $E_c = (50 \\times 60) / 100 = 30$, $E_d = (50 \\times 40) / 100 = 20$.<br>' +
      '    Calcul de $\\chi^2$ :<br>' +
      '    $$\\chi^2 = \\frac{(40-30)^2}{30} + \\frac{(10-20)^2}{20} + \\frac{(20-30)^2}{30} + \\frac{(30-20)^2}{20} = \\frac{100}{30} + \\frac{100}{20} + \\frac{100}{30} + \\frac{100}{20} = 3.33 + 5.00 + 3.33 + 5.00 = 16.67$$<br>' +
      '    Comme $\\chi^2 = 16.67 > 3.84$ (valeur critique à $p < 0.05$), on rejette catégoriquement l’hypothèse nulle $H_0$. Il existe une dépendance statistique hautement significative entre le métier et la détention de la certification de cybersécurité.</li>',
      '  <li><strong>Coefficient de Pearson (3 pts) :</strong><br>' +
      '    Moyennes : $\\bar{x} = 3.0$, $\\bar{y} = 4.0$.<br>' +
      '    Écarts : $\\sum (x_i - \\bar{x})^2 = 4 + 1 + 0 + 1 + 4 = 10$.<br>' +
      '    $\\sum (y_i - \\bar{y})^2 = 4 + 0 + 1 + 0 + 1 = 6$.<br>' +
      '    $\\sum (x_i - \\bar{x})(y_i - \\bar{y}) = (-2)(-2) + (-1)(0) + (0)(1) + (1)(0) + (2)(1) = 4 + 0 + 0 + 0 + 2 = 6$.<br>' +
      '    $$r = \\frac{6}{\\sqrt{10 \\times 6}} = \\frac{6}{\\sqrt{60}} = \\frac{6}{7.746} \\approx 0.775$$<br>' +
      '    $r = 0.775 \\ge 0.70$ : il existe une relation linéaire forte et positive entre les années d’expérience et le score d’incident.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Les 6 piliers du Mémoire &amp; Section Discussion (4 pts) :</strong> Les 6 composantes canoniques sont : 1. Problématique, 2. Revue de littérature, 3. Cadre méthodologique, 4. Résultats empiriques, 5. Discussion et limites, 6. Recommandations managériales/techniques.<br>' +
      '    La section Discussion est le pivot réflexif : elle ne répète pas les chiffres bruts des résultats, mais confronte les constats de terrain aux modèles théoriques de la revue de littérature pour expliquer les concordances et divergences, tout en formulant avec humilité scientifique les limites méthodologiques de l’enquête.</li>',
      '  <li><strong>Ancrage empirique des préconisations (2 pts) :</strong> Dans un mémoire professionnel d’ingénieur, des recommandations non appuyées sur les résultats empiriques relèvent de l’opinion subjective arbitraire et invalident la rigueur scientifique de la recherche. Chaque préconisation doit être justifiée par une preuve chiffrée ou qualitative établie dans le mémoire.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Mémento des formules' }, { href: 'exercices.html', label: 'Consulter le catalogue des ateliers' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs corrigés — ' + course.brand,
      description: 'Sujets et corrigés d’examens de niveau Bachelor 3 en Étude Quantitative & Qualitative : contrôle continu et examen terminal.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Pratiques ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Catalogue des ateliers' }
  ]);

  const cardsHtml = chapterList.map(ch => [
    '    <div class="card">',
    '      <div class="card__head">',
    '        <span class="badge">Module ' + ch.n + '</span>',
    '        <span class="card__num">3 ateliers</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitre' + ch.n + '.html">' + ch.title + '</a></h3>',
    '      <p class="card__desc">' + ch.toc + '</p>',
    '      <ul class="bullet-list">',
    '        <li><strong>Exercice 1 (Niveau 1) :</strong> Algorithme d’acquisition et calcul de base.</li>',
    '        <li><strong>Exercice 2 (Niveau 2) :</strong> Modélisation bivariée et application de formules normées.</li>',
    '        <li><strong>Exercice 3 (Niveau 3) :</strong> Audit critique, détection de biais et consolidation globale.</li>',
    '      </ul>',
    '      <div class="card__foot">',
    '        <a class="btn" href="chapitre' + ch.n + '.html">Ouvrir les ateliers du Module ' + ch.n + '</a>',
    '      </div>',
    '    </div>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Programmation en Python 3</h1>',
    '  <p class="lead">Chaque module de cours intègre 3 ateliers interactifs avec exécution en temps réel dans le navigateur, vérifications automatisées et aide pédagogique contextualisée.</p>',
    '',
    '  <div class="grid grid-2">' + cardsHtml + '</div>',
    '',
    chnav({ href: 'examens.html', label: 'Examens blancs' }, { href: 'chapitre1.html', label: 'Commencer par le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des ateliers — ' + course.brand,
      description: 'Présentation des 18 ateliers de programmation Python 3 du cours d’Étude Quantitative & Qualitative B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
