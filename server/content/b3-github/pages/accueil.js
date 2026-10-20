/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Git & GitHub B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('code') + ' Niveau B3 • Ingénierie Git, Graphe DAG, CI/CD Actions &amp; Gouvernance</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Laboratoire Git &amp; GitHub</a>',
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
    '  <h2>Architecture &amp; Philosophie de Git &amp; GitHub en Troisième Année</h2>',
    box('standard', 'Du Contrôle de Version Élémentaire à l’Ingénierie des Dépôts d’Entreprise', [
      '<p>En troisième année de Bachelor en Ingénierie Informatique, Git n’est plus appréhendé comme une simple collection de commandes mémorisées (<code>add</code>, <code>commit</code>, <code>push</code>), mais comme un système de fichiers adressable par contenu reposant sur un graphe orienté acyclique (DAG - Directed Acyclic Graph) hautement performant et mathématiquement rigoureux.</p>',
      '<p>Ce cours approfondit l’intégralité des rouages internes et des pratiques industrielles indispensables à un ingénieur logiciel ou DevOps : ' +
      'la mécanique exacte de stockage des quatre types d’objets (blobs, trees, commits, annotated tags) avec hachage cryptographique SHA-1 et SHA-256, ' +
      'la topologie des fusions avancées (calcul du Lowest Common Ancestor LCA, fusion tridirectionnelle et réécriture d’historique par rebase interactif), ' +
      'les techniques de résurrection de données via le journal de références <code>git reflog</code> et l’isolation de régressions par recherche dichotomique binaire <code>git bisect</code>, ' +
      'la gouvernance collaborative d’équipe (Trunk-Based Development, règles de protection de branches GitHub, validation formelle Conventional Commits), ' +
      'l’automatisation CI/CD complète par GitHub Actions (déclencheurs, exécuteurs, matrices multi-plateformes et durcissement de sécurité contre les injections de commandes et fuites de secrets), ' +
      'et enfin la gestion de dépôts à grande échelle (Git LFS pour les fichiers volumineux, hooks automatisés de pré-validation et assainissement d’historique par <code>git-filter-repo</code> pour purger les secrets compromis).</p>'
    ]),
    '',
    chnav(null, { href: 'chapitres/chapitre1.html', label: 'Commencer par le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Ingénierie Git, DAG, GitHub Actions &amp; Sécurité B3',
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
    '  <p class="lead">Programme détaillé des 6 modules de spécialisation en interne Git, topologies de fusion, reflog, workflows d’entreprise, GitHub Actions et sécurité des dépôts.</p>',
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
    '  <h2>Ressources transversales &amp; Outils de révision</h2>',
    '  <div class="grid grid--3">',
    '    <div class="card">',
    '      <h3>' + ic('terminal') + ' Laboratoire Interactif</h3>',
    '      <p>Console Python 3 avec éditeur intégré pour simuler les arbres d’objets Git, inspecter les commits et auditer les workflows GitHub Actions.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir le lab</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('file') + ' Cartes &amp; Syntaxes</h3>',
    '      <p>Toutes les commandes de plomberie Git, schémas de fusions, matrices de workflows et expressions de protection regroupées en aide-mémoire.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">Consulter les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('award') + ' Examens &amp; Annales</h3>',
    '      <p>Deux sujets d’examen complets corrigés avec barème détaillé pour valider les compétences en ingénierie de dépôts et CI/CD.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Passer les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav(
      { label: 'Accueil du cours', href: 'index.html' },
      { label: 'Module 1 : Modèle Objet &amp; Arborescence Interne', href: 'chapitres/chapitre1.html' }
    ),
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Plan complet des 6 modules d’ingénierie Git & GitHub B3.',
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
    { label: 'Laboratoire Git libre' }
  ]);

  const body = [
    crumbs,
    '  <h1>Laboratoire Interactif &amp; Bac à Sable Git &amp; GitHub</h1>',
    '  <p class="lead">Expérimentez et automatisez vos outils de plomberie Git selon les grilles d’analyse : hachage d’objets, parcours de graphes DAG, résolution de conflits et validation de workflows CI/CD.</p>',
    '',
    '  <div class="lab" data-lab',
    '       data-language="analyse"',
    '       data-height="420"',
    '       data-stdin="GIT_BLOB\nBonjour Git B3!">',
    '    <script type="text/plain" data-lab-starter># Zone libre : rédigez vos grilles d\'analyse et cas d\'application.\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Génération de pointeurs Git LFS</h4>',
    '      <p>Calculez le hash SHA-256 de fichiers binaires volumineux et assemblez le texte formel du pointeur LFS selon la spécification v1.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Analyseur de workflows GitHub Actions</h4>',
    '      <p>Construisez un parseur YAML détectant les failles d’injection de code dans les blocs <code>run:</code> manipulant les contextes d’événements.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Laboratoire Git libre — ' + course.brand,
      description: 'Bac à sable interactif par cas d’application pour tester vos algorithmes d’ingénierie Git et GitHub.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
