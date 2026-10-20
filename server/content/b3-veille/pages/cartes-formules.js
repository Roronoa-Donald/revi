/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Veille Technologique & Innovation B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Veille Technologique B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Typologie de Veille, Cycle du Renseignement AFNOR, Sourcing &amp; Dorking, Signaux Faibles, Protocoles Push/Pull, Parseurs RSS/Atom, Normalisation NLP &amp; TF-IDF, Échelle TRL 1-9, Gartner Hype Cycle, Tech Radar et Workflow Kanban.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento méthodologique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Veille Technologique B3 : cycle AFNOR, signaux faibles, RSS, TF-IDF, TRL, Gartner et Tech Radar des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento Méthodologique &amp; Guide Opérationnel — Veille Technologique B3</h1>',
    '  <p class="lead">Guide de référence des normes d’intelligence stratégique, équations mathématiques de scoring, filtres de dorking et matrices d’évaluation prospective.</p>',
    '',
    '  <h2>1. Matrice Posture / Temporalité de Veille (Norme AFNOR XP X50-053)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Mode de Veille</th><th>Ponctuelle (État des lieux)</th><th>Périodique (Bilans ciblés)</th><th>Permanente (Temps réel)</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Passive (Pull)</strong></td><td>Étude de marché ponctuelle, bilan documentaire ciblé</td><td>Revue de presse mensuelle, rapport trimestriel</td><td>Consultation manuelle régulière sans alertes</td></tr>',
    '      <tr><td><strong>Active (Push &amp; Alertes)</strong></td><td>Recherche poussée sur un brevet ou concurrent spécifique</td><td>Abonnement à des newsletters d’ingénierie, flux RSS</td><td>Détection de signaux faibles, alertes zero-day, webhooks</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Opérateurs de Recherche Avancée &amp; Google Dorks pour Ingénieurs</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Opérateur</th><th>Syntaxe Technique</th><th>Objectif en Veille Technologique</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>site:</code></td><td><code>site:github.com "zero trust"</code></td><td>Restreindre la recherche à un domaine spécifique ou une forge logicielle</td></tr>',
    '      <tr><td><code>filetype:</code></td><td><code>filetype:pdf "whitepaper" "ebpf"</code></td><td>Cibler des publications académiques, livres blancs ou spécifications</td></tr>',
    '      <tr><td><code>inurl:</code></td><td><code>inurl:advisory "cve-2025"</code></td><td>Détecter des bulletins de sécurité officiels et avis de vulnérabilité</td></tr>',
    '      <tr><td><code>intitle:</code></td><td><code>intitle:"benchmark" "postgresql"</code></td><td>Isoler les articles dont le titre annonce un banc d’essai comparatif</td></tr>',
    '      <tr><td>Exclusion (<code>-</code>)</td><td><code>"quantum computing" -crypto -gaming</code></td><td>Éliminer le bruit informationnel et les polysémies indésirables</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Modèles Mathématiques &amp; Formules de Traitement</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Similarité Lexicale de Jaccard</h4>',
    '      <p>Mesure le chevauchement lexical entre deux ensembles de mots $A$ et $B$ pour la déduplication de flux :</p>',
    '      <pre><code>J(A, B) = |A ∩ B| / |A ∪ B|</code></pre>',
    '      <p>Seuil standard : si $J(A, B) \\ge 0.60$, les deux articles sont considérés comme doublons quasi-stricts.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Pondération TF-IDF Standardisée</h4>',
    '      <p>Quantifie la spécificité d’un terme $q$ au sein d’un document $d$ dans un corpus de $N$ documents :</p>',
    '      <pre><code>TF(q, d) = occurrences(q, d) / total_mots(d)\nIDF(q) = ln((N + 1) / (DF(q) + 1)) + 1\nScore(d) = ∑ [TF(q, d) × IDF(q)]</code></pre>',
    '    </div>',
    '  </div>',
    '',
    '  <h2>4. Grille des Niveaux de Maturité Technologique (TRL 1 à 9)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Niveau TRL</th><th>Désignation Officielle</th><th>Macro-Phase</th><th>Livrable Exigible</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>TRL 1</strong></td><td>Principes de base observés</td><td>Recherche fondamentale</td><td>Articles scientifiques, hypothèses</td></tr>',
    '      <tr><td><strong>TRL 2</strong></td><td>Concept technologique formulé</td><td>Recherche amont</td><td>Notes de cadrage, brevets préliminaires</td></tr>',
    '      <tr><td><strong>TRL 3</strong></td><td>Preuve de concept expérimentale (PoC)</td><td>Recherche appliquée</td><td>Maquette de laboratoire validée</td></tr>',
    '      <tr><td><strong>TRL 4</strong></td><td>Validation en environnement de laboratoire</td><td>Développement</td><td>Composants logiciels interconnectés</td></tr>',
    '      <tr><td><strong>TRL 5</strong></td><td>Validation en environnement représentatif</td><td>Développement</td><td>Test sur jeu de données réaliste</td></tr>',
    '      <tr><td><strong>TRL 6</strong></td><td>Démonstration de prototype en environnement représentatif</td><td>Développement</td><td>Pilote fonctionnel complet</td></tr>',
    '      <tr><td><strong>TRL 7</strong></td><td>Démonstration de prototype en environnement opérationnel</td><td>Industrialisation</td><td>Bêta-test en conditions réelles de production</td></tr>',
    '      <tr><td><strong>TRL 8</strong></td><td>Système complet, qualifié et certifié</td><td>Industrialisation</td><td>Documentation d’exploitation, audits</td></tr>',
    '      <tr><td><strong>TRL 9</strong></td><td>Système éprouvé en production commerciale</td><td>Déploiement</td><td>Exploitation courante, maintenance continue</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Les 4 Anneaux du Tech Radar ThoughtWorks</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>ADOPT (Score: 100)</h4>',
    '      <p>Technologie mûre, solide et sans risque majeur. Recommandée par défaut pour l’ensemble des nouveaux projets de l’entreprise.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>TRIAL (Score: 75)</h4>',
    '      <p>Technologie prometteuse ayant passé le stade de PoC. Prête pour un projet pilote sur un périmètre à risques maîtrisés.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>ASSESS (Score: 50)</h4>',
    '      <p>Technologie émergente méritant une veille active, une étude d’impact et des expérimentations courtes en laboratoire de R&amp;D.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>HOLD (Score: 25)</h4>',
    '      <p>Technologie déconseillée pour de nouveaux développements, présentant des risques d’obsolescence, de sécurité ou de verrouillage propriétaire.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'cartes.html', label: 'Revenir aux cartes de révision' }, { href: 'examens.html', label: 'Consulter les examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento méthodologique — ' + course.brand,
      description: 'Guide des formules et normes de veille technologique B3 : AFNOR, dorking, Jaccard, TF-IDF, TRL, Gartner et Tech Radar.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
