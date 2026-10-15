/**
 * Pages « cartes de révision » et « mémo » du cours « Admin VM » B2.
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
    '  <p class="lead">Clique une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans ' +
    'les deux sens. Reviens à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo VM' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Admin VM B2 : notions clés des ' +
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
    '  <h1>Mémo VM</h1>',
    '  <p class="lead">Hyperviseurs, cycle de vie, stockage, réseau, clusters et sauvegarde sur une ' +
    'page. À garder ouvert pendant les exercices et l’atelier.</p>',

    bloc('Virtualisation', [
      '<ul>',
      '  <li><strong>Type 1</strong> (bare-metal : Proxmox, ESXi) → production ; <strong>type 2</strong> (Workstation, VirtualBox) → tests.</li>',
      '  <li>Types : serveur, poste (VDI), stockage, réseau.</li>',
      '  <li>Vocabulaire : host, guest, vCPU, snapshot, template, cluster.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Prérequis &amp; architecture', [
      '<ul>',
      '  <li>Prérequis : extensions CPU (VT-x / AMD-V), RAM, I/O, réseau.</li>',
      '  <li>Pile KVM : noyau (CPU), QEMU (VM), libvirt (pilotage).</li>',
      '  <li>Plan de données (exécution) et plan de gestion (gouvernance).</li>',
      '  <li>Nested : pédagogique et plus lent.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Cycle de vie &amp; ressources', [
      '<ul>',
      '  <li>Phases : conception, provisioning, exploitation, retrait.</li>',
      '  <li>vCPU : partage temporel ; RAM : non élastique ; disque thin/thick.</li>',
      '  <li>Template → clone : standardiser puis décliner.</li>',
      '  <li>Snapshot (retour rapide) ≠ sauvegarde (résilience).</li>',
      '</ul>'
    ].join('\n')),

    bloc('Stockage', [
      '<ul>',
      '  <li>LVM : PV (disque), VG (pool), LV (disque de VM).</li>',
      '  <li>Types : Directory, LVM-thin, ZFS, Ceph.</li>',
      '  <li>Protocoles : NFS (fichier), iSCSI (disque réseau).</li>',
      '  <li>Sauvegarde GFS : quotidien 7 j, hebdo 4 sem., mensuel 6 à 12 mois.</li>',
      '  <li>Règle d’or : 3 copies, 2 supports, 1 hors site.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Réseau', [
      '<ul>',
      '  <li>Bridge (switch virtuel), NAT (Internet), VLAN (segmentation), pare-feu (filtrage).</li>',
      '  <li>VLAN 10 utilisateurs, 20 serveurs, 30 DMZ.</li>',
      '  <li>DMZ : services exposés — jamais la base de données.</li>',
      '  <li>Diagnostic : connectivité, chemin, filtrage, segmentation.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Administration avancée', [
      '<ul>',
      '  <li>Réservation (minimum), limite (plafond), shares (priorité).</li>',
      '  <li>Cluster : quorum (décision), fencing (isolement), failover (redémarrage).</li>',
      '  <li>Migration dépend du stockage partagé, du réseau et de la charge.</li>',
      '  <li>Sauvegarde avancée : déduplication, chiffrement, restauration granulaire.</li>',
      '  <li>Un hyperviseur non patché expose toutes ses VM.</li>',
      '</ul>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Confondre hyperviseur de type 1 et OS hôte.</li>',
      '    <li>Utiliser la virtualisation imbriquée en production.</li>',
      '    <li>Prendre un snapshot pour une sauvegarde durable.</li>',
      '    <li>Surallouer les vCPU et dégrader toutes les VM.</li>',
      '    <li>Exposer une base de données en DMZ.</li>',
      '    <li>Négliger le quorum ou le durcissement de l’hôte.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo VM — ' + course.brand,
      description: 'Mémo du cours Admin VM B2 : hyperviseurs, architecture, cycle de vie, stockage, ' +
        'réseau, clusters et sauvegarde sur une page.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
