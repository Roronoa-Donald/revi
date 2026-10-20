/**
 * Pages « cartes de révision » et « mémo » du cours « ERP & SI » B2.
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav } = require('./helpers');

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Clique sur une carte pour révéler la réponse. Objectif : répondre sans hésiter dans ' +
    'les deux sens pour ancrer durablement les concepts clés des ERP et des systèmes d’information.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo ERP &amp; SI' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours ERP & Systèmes d’Information B2 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo synthétique ERP &amp; Systèmes d’Information</h1>',
    '  <p class="lead">Toutes les formules de gestion, règles comptables, notations BPMN et équations clés ' +
    'réunies sur une seule page de référence.</p>',

    bloc('1. Composantes du SI &amp; Modélisation du TCO', [
      '<pre><code>// Les 5 composantes interdépendantes du SI\nSI = Matériel (Hardware) + Logiciel (Software) + Données (Data) + Processus (Workflows) + Humains (Acteurs)\n\n// Calcul du TCO (Total Cost of Ownership) sur 5 ans\nTCO_OnPremise = Capex_initial + 5 * (Maintenance_licences_18% + Admin_sys + Energie + Sauvegardes)\nTCO_SaaS      = Integration_initiale + 5 * (Abonnement_mensuel * 12 + Support_Cloud)</code></pre>'
    ].join('\n')),

    bloc('2. Modélisation de Processus BPMN 2.0', [
      '<pre><code>// Événements (Cercles)\n[O] Fin fin cercle épais  |  (o) Intermédiaire double cercle  |  ( ) Début cercle simple\n\n// Passerelles (Losanges - Gateways)\n[X]  Exclusive (XOR) : un seul chemin conditionnel possible\n[+]  Parallèle (AND) : tous les chemins s’exécutent simultanément\n[O]  Inclusive (OR)  : un ou plusieurs chemins selon conditions\n\n// Organisation des responsabilités\nPool : organisation ou entité juridique externe\nLane : rôle métier, service ou département au sein de l’organisation</code></pre>'
    ].join('\n')),

    bloc('3. Intégration Applicative &amp; Formats Pivots', [
      '<pre><code>// Comparatif des topologies d’intégration\nPoint-à-point : N * (N - 1) / 2 interfaces  -&gt; Complexité spaghetti ingérable\nESB (Hub)     : N interfaces vers le bus   -&gt; Découplage, routage et médiation\n\n// Paradigmes d’intégration de données\nETL (Extract - Transform - Load) : transformation avant chargement (DWH classique)\nELT (Extract - Load - Transform) : chargement brut puis transformation dans le Cloud Data Warehouse</code></pre>'
    ].join('\n')),

    bloc('4. Cycles Métiers &amp; Calcul des Besoins Nets (MRP)', [
      '<pre><code>// Cycle Procure-to-Pay (P2P - Fournisseurs)\nDemande d’Achat (DA) -&gt; Bon de Commande (PO) -&gt; Bon de Réception (GR) -&gt; Three-Way Matching -&gt; Règlement\n\n// Cycle Order-to-Cash (O2C - Clients)\nDevis -&gt; Bon de Commande client -&gt; Bon de Livraison (Décrémentation stock) -&gt; Facture -&gt; Encaissement\n\n// Équation fondamentale du Besoin Net en MRP\nBesoin_Net = max(0, Besoin_Brut - Stock_Initial - Receptions_Prevues + Stock_Securite)</code></pre>'
    ].join('\n')),

    bloc('5. Règles Comptables &amp; Formules de Stock', [
      '<pre><code>// Comptabilité en partie double\n&Sigma; Débits = &Sigma; Crédits (Égalité absolue)\nBilan : Actif (Emplois) = Passif (Ressources)\n\n// Valorisation des stocks au CMUP (après chaque nouvelle entrée)\nCMUP_nouveau = ((Stock_ancien * CMUP_ancien) + (Quantite_recue * Prix_achat_unitaire)) / (Stock_ancien + Quantite_recue)\n\n// Modèle de Wilson (Quantité économique de commande - EOQ)\nQ* = &radic;( (2 * D * C_s) / C_p )\navec D = Demande annuelle, C_s = Coût de passation de commande, C_p = Coût unitaire de possession</code></pre>'
    ].join('\n')),

    bloc('6. Conduite de Projet ERP &amp; Criticité des Risques', [
      '<pre><code>// Évaluation matricielle de la criticité d’un risque\nCriticité (C) = Probabilité d’occurrence (P) * Gravité de l’impact (G)\n\n// Niveaux de criticité\nC &lt; 6   : Risque faible (surveillance de routine)\n6 &le; C &le; 12 : Risque modéré (plan d’action préventif obligatoire)\nC &gt; 12  : Risque critique (revue hebdomadaire en comité de direction, plan de contingence)</code></pre>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices/exercices.html', label: 'Exercices &amp; Projet ERP' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo ERP & SI — ' + course.brand,
      description: 'Fiche mémo synthétique du cours ERP & Systèmes d’Information B2 : TCO, BPMN, cycles P2P/O2C, équation MRP, CMUP, formule de Wilson et matrice des risques.',
      active: 'memo',
      body
    }
  };
}

module.exports = { cartes, formules };
