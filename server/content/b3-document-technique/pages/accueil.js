/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Document Technique B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <span class="card__link">Étudier le module ' + ic('arrow-right') + '</span>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    '  <header class="hero">',
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('file') + ' Niveau B3 • Ingénierie &amp; Rédaction Documentaire IT</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Rédaction IT</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules fondamentaux</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs complets</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>Méthodologie pédagogique</h2>',
    box('standard', 'L’Art et la Science de la Documentation Technique en Troisième Année', [
      '<p>En ingénierie informatique de niveau Bachelor 3, concevoir un code élégant ou administrer une infrastructure complexe ne suffit pas : ' +
      'la valeur d’un système réside dans sa pérennité, sa transmissibilité et son exploitabilité opérationnelle. ' +
      'Une documentation absente, obsolète ou mal rédigée constitue une dette technique majeure qui paralyse la maintenance, ' +
      'fragilise les plans de continuité d’activité (PCA) et génère des coûts abyssaux lors des transferts de compétences. ' +
      'Ce cours approfondit l’intégralité des pratiques documentaires professionnelles : ' +
      'l’analyse d’audience par le cadre 5W1H (QQOQCP), ' +
      'la rédaction rigoureuse des Spécifications Fonctionnelles Détaillées (SFD) et Techniques (STD), ' +
      'la constitution des Dossiers d’Architecture Technique (DAT) et d’Exploitation (DEX / Runbooks avec RTO/RPO), ' +
      'la formalisation de contrats d’API sous la spécification OpenAPI 3.0 / Swagger, ' +
      'l’adoption du paradigme Docs-as-Code (Markdown versionné, schémas Mermaid, MkDocs, Docusaurus), ' +
      'et le contrôle qualité automatisé en intégration continue (linters, link checkers, métriques de lisibilité et détection de documentation obsolète). ' +
      'Chaque module comprend 3 exercices de programmation Python 3 exécutables directement dans l’atelier, un QCM de 8 questions et des flashcards.</p>'
    ].join('\n')),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Spécifications, DAT, DEX, OpenAPI &amp; Docs-as-Code',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const rows = chapterList.map(ch => [
    '    <tr>',
    '      <td><strong>Module ' + ch.n + '</strong></td>',
    '      <td><a href="chapitres/chapitre' + ch.n + '.html"><strong>' + ch.title + '</strong></a></td>',
    '      <td>' + ch.toc + '</td>',
    '      <td><span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span></td>',
    '    </tr>'
  ].join('\n')).join('\n');

  const body = [
    '  <h1>Sommaire &amp; Plan d’Études — ' + course.brand + '</h1>',
    '  <p class="lead">Programme détaillé des 6 modules de spécialisation en rédaction technique IT, ingénierie de spécification, architecture système et outillage Docs-as-Code.</p>',
    '',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:12%">Module</th>',
    '        <th style="width:30%">Titre du cours</th>',
    '        <th style="width:43%">Programme &amp; Notions clés</th>',
    '        <th style="width:15%">Statut</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    rows,
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>Ressources transverses d’accompagnement</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4>' + ic('terminal') + ' Bac à sable Rédaction IT</h4>',
    '      <p>Simulateur Python 3 pour exécuter vos algorithmes de linting Markdown, validation OpenAPI et audits de lisibilité.</p>',
    '      <a class="btn" href="atelier.html">Ouvrir le bac à sable</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('book') + ' Cartes de révision</h4>',
    '      <p>36 flashcards de mémorisation active couvrant les typologies documentaires, SFD/STD, DAT/DEX et Docs-as-Code.</p>',
    '      <a class="btn" href="chapitres/cartes.html">Réviser avec les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('file') + ' Formules &amp; Mémento</h4>',
    '      <p>Toutes les règles canoniques : cadre 5W1H, matrice RTM, RTO/RPO, spécification OpenAPI et métriques ASL.</p>',
    '      <a class="btn" href="chapitres/formules.html">Consulter le mémento</a>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l’accueil' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire du cours — ' + course.brand,
      description: 'Vue d’ensemble des 6 chapitres de Document Technique B3 : plan de cours, objectifs pédagogiques et navigation rapide.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier Bac à Sable ======================== */

function atelier(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Sommaire', href: 'sommaire.html' },
    { label: 'Atelier de code libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Atelier de Code &amp; Bac à Sable Document Technique</h1>',
    '  <p class="lead">Automatisez et auditez vos livrables documentaires en Python 3 : validation de schémas OpenAPI, vérificateurs de liens Markdown, matrices de traçabilité RTM et calculs de lisibilité.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="DOC_AUDIT\ntype=API_DOC\npath=/api/v1/auth\ncodes=200,400,500">',
    '    <script type="text/plain" data-lab-starter># Zone libre : automatisez vos validations documentaires, linters et contrats d\'API\nimport re\n\ndef auditer_document_technique():\n    print("Zone libre Document Technique B3 : pret a executer.")\n\nif __name__ == \'__main__\':\n    auditer_document_technique()\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Linter de Liens Markdown &amp; Ancres BrCapitalisées</h4>',
    '      <p>Implémentez un parseur d’ancres internes pour valider que chaque référence <code>#section</code> correspond à un titre réel dans le document.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Générateur Automatique de Matrice RTM</h4>',
    '      <p>Modélisez un algorithme de réconciliation entre exigences métier (Jira/User Stories) et suites de tests d’acceptation (Cucumber/Behave).</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Lancer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code libre — ' + course.brand,
      description: 'Bac à sable interactif en Python pour auditer, tester et automatiser la qualité documentaire IT et la conformité OpenAPI.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
