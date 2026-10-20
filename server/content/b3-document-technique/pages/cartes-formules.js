/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Document Technique B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active en Rédaction Technique IT</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts clés : Typologies &amp; 5W1H, SFD &amp; STD, DAT &amp; DEX (RTO/RPO), Spécifications OpenAPI, Approche Docs-as-Code, Qualité &amp; Maintenance Continue.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento des normes' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Document Technique B3 : notions clés et définitions des ' + chapterList.length + ' chapitres.',
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
    { label: 'Normes &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento des Normes, Canevas &amp; Métriques Documentaires</h1>',
    '  <p class="lead">Guide de référence opérationnelle : grille d’analyse 5W1H, matrice de traçabilité RTM, indicateurs RTO/RPO, spécification OpenAPI 3.0 et métriques de lisibilité.</p>',
    '',
    '  <h2>1. Le Cadre d’Analyse 5W1H (QQOQCP)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:20%">Dimension</th>',
    '        <th style="width:40%">Question directrice</th>',
    '        <th style="width:40%">Application en documentation IT</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>QUI ? (Who)</strong></td>',
    '        <td>À qui s’adresse le document et qui le rédige ?</td>',
    '        <td>Définition explicite de l’audience cible (utilisateur final, développeur, exploitant, auditeur).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>QUOI ? (What)</strong></td>',
    '        <td>De quel produit, composant ou procédure s’agit-il ?</td>',
    '        <td>Périmètre fonctionnel ou technique strict, version logicielle couverte, prérequis matériels.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>QUAND ? (When)</strong></td>',
    '        <td>À quel moment le document intervient-il ?</td>',
    '        <td>Phase de cycle de vie : cadrage, développement, recette, mise en service, astreinte, crise.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>OÙ ? (Where)</strong></td>',
    '        <td>Dans quel environnement le système s’exécute-t-il ?</td>',
    '        <td>Localisation : poste local, environnement de recette (Staging), cloud public, datacenter on-premise.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>POURQUOI ? (Why)</strong></td>',
    '        <td>Quel est l’objectif métier ou opérationnel visé ?</td>',
    '        <td>Justification du besoin, problème résolu, obligation réglementaire ou gain de productivité.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>COMMENT ? (How)</strong></td>',
    '        <td>Par quels moyens et étapes concrètes procéder ?</td>',
    '        <td>Procédure pas-à-pas numérotée, commandes terminales exactes, captures d’écran annotées.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Spécifications &amp; Matrice de Traçabilité (RTM)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Composant RTM</th>',
    '        <th style="width:35%">Rôle &amp; Nature</th>',
    '        <th style="width:40%">Critère de conformité</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Exigence Métier (REQ)</strong></td>',
    '        <td>Besoin fonctionnel ou non fonctionnel émis par le commanditaire.</td>',
    '        <td>Identifiant unique stable (ex. <code>REQ-AUTH-01</code>), description non ambiguë, valeur métier.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Spécification (SFD/STD)</strong></td>',
    '        <td>Traduction de l’exigence en cas d’utilisation ou contrat technique.</td>',
    '        <td>Liaison directe 1..N avec la REQ parente, scénario nominal, règles d’exception, schéma de données.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Cas de Test (TEST)</strong></td>',
    '        <td>Procédure de vérification automatisée ou de recette unitaire.</td>',
    '        <td>Jeu de données d’entrée, résultat attendu opposable, statut de passage (Pass/Fail).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Couverture Totale</strong></td>',
    '        <td>$$Couverture = \\frac{N_{REQ\\_testees}}{N_{REQ\\_totales}} \\times 100\\,\\%$$</td>',
    '        <td>Dans un projet d’envergure, la couverture RTM doit atteindre <strong>100%</strong> des exigences critiques.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Métriques d’Exploitation dans un DEX : RTO &amp; RPO</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>RTO (Recovery Time Objective)</h4>',
    '      <p>Durée maximale d’interruption admissible après un sinistre :</p>',
    '      $$RTO = T_{retablissement\\_service} - T_{sinistre}$$',
    '      <p>Mesure la rapidité d’exécution des procédures de bascule ou de restauration contenues dans le Runbook.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>RPO (Recovery Point Objective)</h4>',
    '      <p>Perte maximale de données tolérée exprimée en temps :</p>',
    '      $$RPO = T_{sinistre} - T_{derniere\\_sauvegarde\\_valide}$$',
    '      <p>Détermine la fréquence obligatoire des sauvegardes (horaire, quotidienne, réplication synchrone en direct).</p>',
    '    </div>',
    '  </div>',
    '',
    '  <h2>4. Spécification OpenAPI 3.0 &amp; Conventions REST</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:20%">Verbe HTTP</th>',
    '        <th style="width:25%">Idempotence</th>',
    '        <th style="width:25%">Codes succès</th>',
    '        <th style="width:30%">Usage canonique</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><code>GET</code></td>',
    '        <td>Oui (Lecture seule)</td>',
    '        <td><code>200 OK</code></td>',
    '        <td>Récupération d’une ressource ou liste sans altération.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><code>POST</code></td>',
    '        <td>Non (Création)</td>',
    '        <td><code>201 Created</code></td>',
    '        <td>Création d’une nouvelle ressource avec en-tête <code>Location</code>.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><code>PUT</code></td>',
    '        <td>Oui (Remplacement)</td>',
    '        <td><code>200 OK</code> / <code>204 No Content</code></td>',
    '        <td>Remplacement complet d’une ressource existante par son nouvel état.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><code>DELETE</code></td>',
    '        <td>Oui (Suppression)</td>',
    '        <td><code>204 No Content</code> / <code>200 OK</code></td>',
    '        <td>Destruction d’une ressource identifiée par son URI.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Métriques de Lisibilité &amp; Longueur Moyenne de Phrase (ASL)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Indicateur</th>',
    '        <th style="width:35%">Formule</th>',
    '        <th style="width:40%">Barème en documentation technique</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Average Sentence Length (ASL)</strong></td>',
    '        <td>$$ASL = \\frac{\\text{Nombre total de mots}}{\\text{Nombre total de phrases}}$$</td>',
    '        <td>- $\\le 15$ mots : Excellente clarté, lecture fluide.<br>- $16$ à $25$ mots : Standard acceptable.<br>- $&gt; 25$ mots : Trop complexe, scission impérative.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Indice Flesch-Kincaid</strong></td>',
    '        <td>$$Score = 206.835 - (1.015 \\times ASL) - (84.6 \\times ASW)$$</td>',
    '        <td>Plus le score est élevé (&gt; 60), plus le texte est accessible et assimilable rapidement par des non-experts.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Flashcards de révision' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Normes &amp; Mémento — ' + course.brand,
      description: 'Mémento des règles, normes et indicateurs du cours Document Technique B3 : 5W1H, RTM, RTO/RPO, OpenAPI et lisibilité ASL.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
