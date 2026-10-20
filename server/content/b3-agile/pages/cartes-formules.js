/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Méthodes Agiles B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Méthodes Agiles B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Manifeste Agile, Rôles &amp; Cérémonies Scrum, Flux Kanban &amp; Loi de Little, User Stories INVEST, Vélocité &amp; Burn-down, et Scaling d’Entreprise (SAFe/Spotify).</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Méthodes Agiles B3 : définitions, rituels et formules de gestion de projet des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento Technique &amp; Guide Méthodologique — Méthodes Agiles B3</h1>',
    '  <p class="lead">Guide de référence opérationnelle pour Product Owners, Scrum Masters et Tech Leads : règles du Manifeste Agile, timeboxes Scrum, équations de flux Kanban, critères INVEST et matrices de scaling.</p>',
    '',
    '  <h2>1. Les 4 Valeurs du Manifeste Agile (2001)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Priorité Agile (À Gauche)</th><th>Élément Traditionnel (À Droite)</th><th>Signification Opérationnelle</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Les individus et leurs interactions</strong></td><td>plus que les processus et les outils</td><td>Privilégier la communication directe et l’auto-organisation sur les règles rigides.</td></tr>',
    '      <tr><td><strong>Des logiciels opérationnels</strong></td><td>plus qu’une documentation exhaustive</td><td>La valeur réside dans un code testé et déployé, pas dans des spécifications théoriques.</td></tr>',
    '      <tr><td><strong>La collaboration avec les clients</strong></td><td>plus que la négociation contractuelle</td><td>Co-construire la solution en continu avec les utilisateurs plutôt que figer un cahier des charges.</td></tr>',
    '      <tr><td><strong>L’adaptation au changement</strong></td><td>plus que le suivi d’un plan</td><td>Accueillir le changement comme un avantage concurrentiel plutôt que s’enfermer dans un planning.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Le Cadre Scrum : Événements &amp; Timeboxes Officielles</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Événement Scrum</th><th>Timebox Max (Sprint 4 sem.)</th><th>Timebox Max (Sprint 2 sem.)</th><th>Objectif Principal</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Sprint</strong></td><td>1 mois calendaire</td><td>2 semaines</td><td>Conteneur temporel pour produire un incrément Done.</td></tr>',
    '      <tr><td><strong>Sprint Planning</strong></td><td>8 heures max</td><td>4 heures max</td><td>Définir l’Objectif de Sprint (Sprint Goal) et le Sprint Backlog.</td></tr>',
    '      <tr><td><strong>Daily Scrum</strong></td><td>15 minutes strictes</td><td>15 minutes strictes</td><td>Synchronisation quotidienne des Developers face au Sprint Goal.</td></tr>',
    '      <tr><td><strong>Sprint Review</strong></td><td>4 heures max</td><td>2 heures max</td><td>Démonstration de l’incrément et feedback des parties prenantes.</td></tr>',
    '      <tr><td><strong>Sprint Retrospective</strong></td><td>3 heures max</td><td>1 h 30 max</td><td>Inspection et amélioration continue des personnes, relations et processus.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Métriques Kanban &amp; Formules de Flux (Loi de Little)</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Loi de Little (Théorème Fondamental de Little)</h4>',
    '      <p>Dans tout système en flux continu stable :<br><code>WIP = Throughput &times; Cycle_Time</code><br>ou encore :<br><code>Throughput = WIP / Cycle_Time</code></p>',
    '      <p><strong>WIP (Work In Progress)</strong> : Nombre moyen d’éléments en cours de traitement.<br><strong>Throughput (Débit)</strong> : Nombre d’éléments terminés par unité de temps (ex: cartes/jour).<br><strong>Cycle Time</strong> : Durée moyenne de séjour actif d’un élément dans le système.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Distinction Lead Time vs Cycle Time</h4>',
    '      <p><strong>Lead Time</strong> : Temps total écoulé entre la création de la demande et sa mise à disposition client.<br><code>Lead_Time = t_done - t_created</code></p>',
    '      <p><strong>Cycle Time</strong> : Temps de travail effectif pendant lequel l’équipe a développé la tâche.<br><code>Cycle_Time = t_done - t_started</code></p>',
    '      <p><strong>Temps d’attente (Wait Time)</strong> : <code>Wait_Time = Lead_Time - Cycle_Time</code></p>',
    '    </div>',
    '  </div>',
    '',
    '  <h2>4. Critères de Qualité des User Stories (INVEST)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Lettre</th><th>Critère INVEST</th><th>Règle Métier &amp; Bonnes Pratiques</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>I</strong></td><td><strong>Independent</strong></td><td>La story doit pouvoir être développée et livrée sans dépendance stricte envers une autre.</td></tr>',
    '      <tr><td><strong>N</strong></td><td><strong>Negotiable</strong></td><td>La story n’est pas un contrat figé ; les détails sont ajustés lors de la conversation.</td></tr>',
    '      <tr><td><strong>V</strong></td><td><strong>Valuable</strong></td><td>Elle apporte une valeur tangible démontrable pour l’utilisateur final ou le métier.</td></tr>',
    '      <tr><td><strong>E</strong></td><td><strong>Estimable</strong></td><td>L’équipe comprend suffisamment le besoin pour lui affecter un effort relatif en Story Points.</td></tr>',
    '      <tr><td><strong>S</strong></td><td><strong>Small</strong></td><td>Elle doit pouvoir être facilement conçue, codée et testée au sein d’un seul Sprint.</td></tr>',
    '      <tr><td><strong>T</strong></td><td><strong>Testable</strong></td><td>Elle dispose de critères d’acceptation vérifiables (Gherkin Given-When-Then).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Estimation Relative : Suite de Fibonacci Modifiée &amp; Vélocité</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Suite de Fibonacci Modifiée</h4>',
    '      <p>Échelle standard de Story Points utilisée en Planning Poker :<br><code>[0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?]</code></p>',
    '      <p>Pourquoi des écarts croissants ? La loi de Weber-Fechner démontre que plus une tâche est volumineuse, plus l’incertitude grandit : distinguer 20 de 21 est illusoire, alors que distinguer 13 de 20 est pertinent.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Calcul de Vélocité &amp; Projection de Release</h4>',
    '      <p><strong>Vélocité moyenne ($V_{moy}$)</strong> :<br><code>V_moy = Somme(Points_Terminés_Derniers_Sprints) / Nb_Sprints</code></p>',
    '      <p><strong>Nombre de Sprints nécessaires</strong> :<br><code>Sprints_Requis = ceil(Backlog_Restant / V_moy)</code></p>',
    '      <p><strong>Cône d’incertitude</strong> : Calculer la fourchette $S_{opt} = ceil(B / V_{max})$ et $S_{pess} = ceil(B / V_{min})$.</p>',
    '    </div>',
    '  </div>',
    '',
    '  <h2>6. Agilité à l’Échelle : Modèle Spotify &amp; PI Planning SAFe</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Structure</th><th>Périmètre &amp; Rôle</th><th>Exemple Typique</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>Squad</strong></td><td>Cellule autonome pluridisciplinaire (6 à 9 personnes) avec PO et Tech Lead.</td><td>Squad « Moteur de Recherche », Squad « Panier &amp; Checkout ».</td></tr>',
    '      <tr><td><strong>Tribe</strong></td><td>Fédération de Squads collaborant sur un même domaine d’affaires (max 100-150 pers.).</td><td>Tribe « E-Commerce », Tribe « Plateforme &amp; Core Data ».</td></tr>',
    '      <tr><td><strong>Chapter</strong></td><td>Ligne de compétence transverse partageant les mêmes savoir-faire techniques.</td><td>Chapitre « Développeurs Backend », Chapitre « Ingénieurs QA ».</td></tr>',
    '      <tr><td><strong>Guild</strong></td><td>Communauté d’intérêt transversale libre réunissant des passionnés de toute l’entreprise.</td><td>Guilde « Sécurité Applicative », Guilde « Accessibilité Web ».</td></tr>',
    '      <tr><td><strong>PI Planning (SAFe)</strong></td><td>Événement cadencé de 2 jours réunissant toutes les équipes d’un train (ART) pour aligner les 5 sprints.</td><td>Program Board avec fils de dépendances et identification des risques ROAM.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'examens.html', label: 'Passer les examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento technique &amp; Formules — ' + course.brand,
      description: 'Aide-mémoire des règles du Manifeste Agile, rituels Scrum, équations de flux Kanban et critères INVEST.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
