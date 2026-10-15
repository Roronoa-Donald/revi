/**
 * Chapitre 4 du cours « Admin VM » B2 — stockage et gestion des volumes.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Stockage et gestion des volumes',
  short: 'Stockage',
  toc: 'LVM (PV/VG/LV), types de stockage Proxmox, NFS vs iSCSI, snapshots vs backup, stratégie GFS.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Toutes les VM reposent sur le stockage. Une panne disque n’arrête pas une machine : elle arrête ' +
    'plusieurs services. Prioriser la fiabilité avant la performance est le premier réflexe d’un ' +
    'administrateur.',

  objectives: [
    'expliquer LVM et ses trois notions (PV, VG, LV) ;',
    'comparer les types de stockage (Directory, LVM-thin, ZFS, Ceph) ;',
    'distinguer NFS et iSCSI ;',
    'structurer une sauvegarde avec la stratégie GFS.'
  ],

  sections: [
    {
      title: 'Pourquoi le stockage est critique',
      html: [
        '<p>Toute la plateforme de virtualisation repose sur le stockage : une panne disque entraîne ' +
        'l’arrêt de plusieurs services simultanément.</p>',
        '<ul>',
        '  <li>Prioriser la <strong>fiabilité</strong> avant la performance.</li>',
        '  <li>Planifier <strong>sauvegarde</strong> et redondance (RAID/NAS).</li>',
        '  <li>Séparer le stockage des VM du stockage des sauvegardes.</li>',
        '</ul>',
        box('tech', 'Le point de défaillance principal', 'database',
          '    <p>Contrairement à une VM qu’on peut redémarrer ailleurs, un stockage perdu met en ' +
          'danger toutes les VM qui y reposent à la fois. C’est pourquoi il se pense en premier.</p>')
      ].join('\n')
    },
    {
      title: 'LVM en trois notions',
      html: [
        '<p>LVM (Logical Volume Manager) ajoute une couche d’abstraction entre les disques et les ' +
        'volumes logiques :</p>',
        '<ul>',
        '  <li><strong>PV</strong> (Physical Volume) : un disque ou une partition physique.</li>',
        '  <li><strong>VG</strong> (Volume Group) : le pool regroupant les PV.</li>',
        '  <li><strong>LV</strong> (Logical Volume) : le volume logique, qui devient le disque d’une VM.</li>',
        '</ul>',
        '<p>LVM permet d’<strong>agrandir un disque de VM</strong> sans tout réinstaller. Le mode ' +
        '<em>thin</em> est souple mais exige une surveillance pour éviter la saturation du pool.</p>'
      ].join('\n')
    },
    {
      title: 'Types de stockage et protocoles',
      html: [
        '<table><thead><tr><th>Type</th><th>Usage</th><th>Avantage</th></tr></thead><tbody>',
        '<tr><td>Directory</td><td>ISO, backups, templates</td><td>Simple à configurer</td></tr>',
        '<tr><td>LVM-thin</td><td>Disques de VM</td><td>Souple et rapide</td></tr>',
        '<tr><td>ZFS</td><td>Snapshots, compression</td><td>Robuste et performant</td></tr>',
        '<tr><td>Ceph</td><td>Cluster multi-nœuds</td><td>Haute dispo scalable</td></tr>',
        '</tbody></table>',
        '<table><thead><tr><th>Protocole</th><th>Principe</th><th>Limite</th></tr></thead><tbody>',
        '<tr><td>NFS</td><td>Partage fichier</td><td>Moins rapide sur gros I/O</td></tr>',
        '<tr><td>iSCSI</td><td>Disque réseau</td><td>Configuration plus technique</td></tr>',
        '</tbody></table>',
        '<p>Pour un petit laboratoire, NFS suffit ; en production, on privilégie iSCSI ou ZFS.</p>'
      ].join('\n')
    },
    {
      title: 'Snapshots, sauvegardes et GFS',
      html: [
        '<p>Un <strong>snapshot</strong> est rapide et local, mais vulnérable : il repose sur le même ' +
        'stockage que la VM. Une <strong>sauvegarde</strong> est une copie externe, essentielle en cas ' +
        'de panne. Règle d’or : <strong>3 copies, 2 supports différents, 1 hors site</strong>.</p>',
        '<p>La stratégie <strong>GFS</strong> (Grandfather-Father-Son) structure la rétention : ' +
        'quotidien sur 7 jours, hebdomadaire sur 4 semaines, mensuel sur 6 à 12 mois. Le principe — ' +
        'régularité et tests — compte plus que l’outil.</p>',
        box('pitfall', 'Un snapshot n’est pas une sauvegarde', 'warning',
          '    <p>Conserver des snapshots en croyant être protégé est une erreur fréquente : si le ' +
          'stockage disparaît, snapshots et VM disparaissent ensemble. La copie externe reste la seule ' +
          'vraie protection.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que représente un PV ?', opts: ['Un disque physique', 'Un volume logique', 'Un pool'], correct: 0, exp: 'Le Physical Volume est un disque ou une partition.' },
    { stem: 'Que regroupe un VG ?', opts: ['Les PV en un pool', 'Les VM', 'Les VLAN'], correct: 0, exp: 'Le Volume Group agrège les disques physiques.' },
    { stem: 'À quoi sert un LV ?', opts: ['Devenir le disque d’une VM', 'Router le réseau', 'Sauvegarder'], correct: 0, exp: 'Le Logical Volume est le volume utilisé par la VM.' },
    { stem: 'Quel stockage pour ISO et backups ?', opts: ['Directory', 'Ceph', 'LVM-thin'], correct: 0, exp: 'Directory est simple et adapté aux fichiers.' },
    { stem: 'NFS vs iSCSI ?', opts: ['Partage fichier vs disque réseau', 'Réseau vs stockage', 'Aucune différence'], correct: 0, exp: 'NFS partage des fichiers, iSCSI un disque en réseau.' },
    { stem: 'Que structure la stratégie GFS ?', opts: ['La rétention des sauvegardes', 'Les VLAN', 'Les vCPU'], correct: 0, exp: 'Grandfather-Father-Son organise les fréquences.' },
    { stem: 'Règle d’or de sauvegarde ?', opts: ['3-2-1', '1-1-1', '5-5-5'], correct: 0, exp: '3 copies, 2 supports, 1 hors site.' },
    { stem: 'Un snapshot est-il une sauvegarde ?', opts: ['Non', 'Oui', 'Toujours'], correct: 0, exp: 'Il est local et temporaire.' }
  ],

  pitfalls: [
    'Considérer un snapshot comme une sauvegarde.',
    'Laisser un pool thin se saturer sans surveillance.',
    'Mélanger stockage des VM et stockage des sauvegardes.',
    'Choisir un protocole inadapté à la charge (NFS sur gros I/O).',
    'Négliger de tester les restaurations.'
  ],

  methodTitle: 'Structurer le stockage',
  method: [
    '<strong>Prévoir</strong> la redondance et la sauvegarde avant la performance.',
    '<strong>Organiser</strong> LVM : PV, VG, puis LV pour les VM.',
    '<strong>Choisir</strong> le type et le protocole selon les besoins.',
    '<strong>Séparer</strong> stockage des VM et stockage des sauvegardes.',
    '<strong>Appliquer</strong> GFS et tester régulièrement les restaurations.'
  ],

  summary: [
    'Le stockage est le point de défaillance principal.',
    'LVM : PV (disque), VG (pool), LV (disque de VM).',
    'Types : Directory, LVM-thin, ZFS, Ceph ; protocoles : NFS, iSCSI.',
    'Snapshot local et rapide, sauvegarde externe et durable.',
    'GFS : quotidien 7 j, hebdo 4 sem., mensuel 6 à 12 mois.'
  ],

  checklist: [
    'J’explique LVM (PV, VG, LV).',
    'Je compare les types de stockage.',
    'Je distingue NFS et iSCSI.',
    'Je structure une stratégie GFS.'
  ],

  notions: ['stockage', 'LVM', 'PV', 'VG', 'LV', 'LVM-thin', 'ZFS', 'Ceph', 'Directory', 'NFS', 'iSCSI', 'snapshot', 'backup', 'GFS', '3-2-1', 'RAID'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends LVM (PV, VG, LV).' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur NFS vs iSCSI.' },
    { cls: 'good', text: '70–89 % — Solide : tu structures stockage et sauvegardes.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe au réseau virtualisé, chapitre 5.' }
  ],

  flashcards: [
    { q: 'LVM : PV, VG, LV ?', a: 'Disque physique, groupe de volumes (pool), volume logique.' },
    { q: 'Quatre types de stockage Proxmox ?', a: 'Directory, LVM-thin, ZFS, Ceph.' },
    { q: 'NFS vs iSCSI ?', a: 'NFS : partage fichier ; iSCSI : disque réseau performant.' },
    { q: 'Snapshot vs backup ?', a: 'Snapshot local et rapide ; backup copie externe durable.' },
    { q: 'Règle d’or de sauvegarde ?', a: '3 copies, 2 supports différents, 1 hors site.' },
    { q: 'Stratégie GFS ?', a: 'Quotidien 7 j, hebdo 4 semaines, mensuel 6 à 12 mois.' }
  ]
};
