/**
 * Pages « cartes de révision » et « mémo » du cours « Windows Server » B2.
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
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Revenez à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo WinServer' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Windows Server B2 : notions clés des ' +
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
    '  <h1>Mémo WinServer</h1>',
    '  <p class="lead">Sauvegarde, haute disponibilité, clusters, maintenance, virtualisation et gestion ' +
    'des VM sur une page. À garder ouvert pendant les exercices et l’atelier.</p>',

    bloc('Sauvegarde', [
      '<ul>',
      '  <li><strong>Complète</strong> : tout, restauration simple, lente et volumineuse.</li>',
      '  <li><strong>Incrémentielle</strong> : depuis la dernière sauvegarde, restauration en chaîne.</li>',
      '  <li><strong>Différentielle</strong> : depuis la dernière complète, restauration = complète + dernière diff.</li>',
      '  <li><strong>3-2-1</strong> : 3 copies, 2 supports, 1 hors site. Toujours tester la restauration.</li>',
      '  <li><strong>PCA</strong> : continuité sans interruption ; <strong>PRA</strong> : reprise rapide.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Haute disponibilité', [
      '<ul>',
      '  <li>Trois piliers : <strong>redondance</strong>, <strong>failover</strong>, <strong>supervision</strong>.</li>',
      '  <li>SLA : 99 % ≈ 3 j 15 h ; 99,9 % ≈ 8 h 45 ; 99,99 % ≈ 52 min ; 99,999 % ≈ 5 min.</li>',
      '  <li>Load balancer : répartit la charge, mais à redonder lui aussi.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Clustering', [
      '<ul>',
      '  <li><strong>Active-passive</strong> : un nœud actif, les autres en veille.</li>',
      '  <li><strong>Active-active</strong> : tous actifs, synchronisation complexe.</li>',
      '  <li><strong>Load balancing</strong> : répartition des requêtes.</li>',
      '  <li><strong>Failover</strong> : stockage partagé, reprise automatique des services.</li>',
      '  <li><strong>Grid</strong> : calcul intensif distribué. Quorum = majorité des nœuds.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Maintenance', [
      '<ul>',
      '  <li><strong>Préventive</strong> : éviter les pannes (mises à jour, surveillance, sécurité, matériel).</li>',
      '  <li><strong>Corrective</strong> : réparer après une panne (Restart-Service, ping, tracert, nslookup).</li>',
      '  <li><strong>Évolutive</strong> : moderniser, migrer (2012 R2 → 2016 → 2019 → 2022).</li>',
      '  <li>Outils : Task Manager, Performance Monitor, Event Viewer, netstat, Wireshark.</li>',
      '  <li>Température CPU : normal 30-60 °C, danger &gt; 85 °C, critique &gt; 95 °C.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Virtualisation &amp; VMware', [
      '<ul>',
      '  <li><strong>Type 1</strong> (bare-metal : ESXi) / <strong>Type 2</strong> (hébergé : Workstation, VirtualBox).</li>',
      '  <li>ESXi héberge, vCenter gère, vSphere Client administre.</li>',
      '  <li>Réseaux : <strong>NAT</strong> (Internet oui, LAN non), <strong>Bridge</strong> (oui/oui), <strong>Host-Only</strong> (non/non).</li>',
      '  <li>Images : <strong>ISO</strong> (optique), <strong>VMDK</strong> (VMware), <strong>VHD/VHDX</strong> (Microsoft).</li>',
      '  <li><strong>vCPU</strong>, <strong>CPU Ready Time</strong> (attente CPU), surallocation, thin provisioning.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Snapshots, clones &amp; templates', [
      '<ul>',
      '  <li><strong>Snapshot</strong> : mémoire + CPU + disques, temporaire ; ne remplace pas une sauvegarde.</li>',
      '  <li><strong>Clone complet</strong> : indépendant ; <strong>clone lié</strong> : dépend de la source.</li>',
      '  <li><strong>Template</strong> : VM préconfigurée, modèle de déploiement standardisé.</li>',
      '  <li><strong>vMotion</strong> : migration à chaud sans interruption.</li>',
      '  <li><strong>Cluster HA</strong> : redémarrage automatique des VM ; <strong>Veeam</strong> : sauvegarde des VM.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre incrémentielle (depuis la dernière) et différentielle (depuis la complète).</li>',
      '    <li>Prendre un snapshot pour une sauvegarde durable.</li>',
      '    <li>Laisser un point unique de défaillance (load balancer, alimentation).</li>',
      '    <li>Supprimer la VM source d’un clone lié.</li>',
      '    <li>Surallouer les vCPU et dégrader le CPU Ready Time.</li>',
      '    <li>Conserver des snapshots pendant des semaines.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo WinServer — ' + course.brand,
      description: 'Mémo du cours Windows Server B2 : sauvegarde, haute disponibilité, clustering, ' +
        'maintenance, virtualisation et gestion des VM sur une page.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
