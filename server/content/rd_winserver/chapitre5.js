/**
 * Chapitre 5 du cours « Windows Server » B2 — virtualisation et VMware.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Virtualisation & VMware',
  short: 'Virtualisation',
  toc: 'Hyperviseur type 1/2, ESXi/vCenter/vSphere, réseaux virtuels, images disque, vCPU et thin provisioning.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Plutôt que d’installer un serveur par machine, on exécute plusieurs machines virtuelles sur un ' +
    'même hôte. Comprendre l’hyperviseur, les réseaux virtuels et l’allocation de ressources est la ' +
    'base de toute infrastructure moderne.',

  objectives: [
    'distinguer hyperviseur de type 1 et de type 2 ;',
    'situer ESXi, vCenter et vSphere Client ;',
    'comparer les modes réseau NAT, Bridge et Host-Only ;',
    'interpréter vCPU, CPU Ready Time et thin provisioning.'
  ],

  sections: [
    {
      title: 'Hyperviseur de type 1 et de type 2',
      html: [
        '<p>Un <strong>hyperviseur</strong> est un logiciel qui crée et gère des <strong>machines ' +
        'virtuelles</strong> (VM). On en distingue deux familles :</p>',
        '<table><thead><tr><th>Type</th><th>Description</th><th>Exemples</th></tr></thead><tbody>',
        '<tr><td>Type 1 (bare-metal)</td><td>Virtualise directement sur le matériel, sans OS intermédiaire</td><td>VMware ESXi</td></tr>',
        '<tr><td>Type 2 (hébergé)</td><td>S’installe sur un OS existant (Windows, Linux, macOS)</td><td>VMware Workstation, VirtualBox</td></tr>',
        '</tbody></table>',
        '<p>Dans un environnement VMware professionnel : <strong>ESXi</strong> est l’hyperviseur qui ' +
        'héberge les VM, <strong>vCenter</strong> gère centralement plusieurs hôtes et les clusters, ' +
        '<strong>vSphere Client</strong> est l’interface web d’administration.</p>',
        box('tech', 'Un exemple concret', 'server',
          '    <p>Max ouvre vSphere Client, choisit un hôte ESXi, alloue 2 vCPU, 8 Go de RAM et 100 Go ' +
          'de stockage, puis crée une VM Ubuntu Server. Tout le provisionnement passe par l’interface ' +
          'web ; ESXi exécute, vCenter orchestre.</p>')
      ].join('\n')
    },
    {
      title: 'Les réseaux virtuels',
      html: [
        '<p>Une VM se connecte au réseau selon trois modes principaux :</p>',
        '<ul>',
        '  <li><strong>NAT</strong> : la VM sort via l’adresse de l’hôte, qui sert de passerelle. Accès ' +
        'Internet sécurisé, mais la VM n’est pas joignable depuis le réseau local.</li>',
        '  <li><strong>Bridge (pont)</strong> : la VM se comporte comme une machine physique du réseau, ' +
        'avec sa propre adresse obtenue par DHCP. Elle est accessible partout.</li>',
        '  <li><strong>Host-Only</strong> : réseau privé entre l’hôte et les VM, sans Internet par ' +
        'défaut. Idéal pour des environnements de test isolés.</li>',
        '</ul>',
        '<table><thead><tr><th>Mode</th><th>Internet</th><th>Accès depuis le LAN</th></tr></thead><tbody>',
        '<tr><td>NAT</td><td>Oui</td><td>Non</td></tr>',
        '<tr><td>Bridge</td><td>Oui</td><td>Oui</td></tr>',
        '<tr><td>Host-Only</td><td>Non</td><td>Non</td></tr>',
        '</tbody></table>'
      ].join('\n')
    },
    {
      title: 'Images disque',
      html: [
        '<p>Une <strong>image disque</strong> est un fichier qui représente tout le contenu d’un disque ' +
        'dur ou d’un support optique.</p>',
        '<ul>',
        '  <li><strong>ISO</strong> : image d’un disque optique (CD/DVD), copie secteur par secteur. ' +
        'Sert à installer un système dans une VM.</li>',
        '  <li><strong>VMDK</strong> : format principalement utilisé par <strong>VMware</strong> ; peut ' +
        'être <em>thick</em> (espace réservé d’avance) ou <em>thin</em> (alloué dynamiquement).</li>',
        '  <li><strong>VHD / VHDX</strong> : format <strong>Microsoft</strong>, utilisé surtout avec ' +
        'Hyper-V. VHDX est la version améliorée, plus tolérante aux erreurs.</li>',
        '</ul>',
        box('tech', 'Thin provisioning', 'layers',
          '    <p>Le <em>thin provisioning</em> n’alloue que l’espace réellement utilisé : la VM ' +
          's’agrandit au fil du temps. Le <em>thick</em> réserve tout de suite l’espace complet. Le ' +
          'premier économise le stockage, le second garantit l’espace.</p>')
      ].join('\n')
    },
    {
      title: 'vCPU, CPU Ready Time et surallocation',
      html: [
        '<p>Un <strong>vCPU</strong> est un processeur virtuel alloué à une VM ; il correspond à un ' +
        'cœur (ou un thread) du processeur de l’hôte. Une VM peut en recevoir plusieurs.</p>',
        '<p>Le <strong>CPU Ready Time</strong> mesure le temps qu’une VM attend pour obtenir du temps ' +
        'processeur : c’est l’indicateur clé de contention CPU dans VMware.</p>',
        '<p>La <strong>surallocation</strong> (overcommit) survient quand le total de vCPU alloués ' +
        'dépasse le nombre de cœurs physiques. Conséquence principale : le CPU Ready Time s’allonge et ' +
        'les performances se dégradent.</p>',
        box('intuition', 'Allouer plus n’est pas mieux', 'lightbulb',
          '    <p>Donner 8 vCPU à une VM qui n’en utilise que 2 ne la rend pas plus rapide : cela crée ' +
          'de l’attente pour tout le monde. On dimensionne les ressources, on ne les empile pas.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qu’est-ce qu’un hyperviseur ?', opts: ['Un logiciel qui gère des VM', 'Un antivirus', 'Un switch réseau'], correct: 0, exp: 'Il crée et exécute des machines virtuelles.' },
    { stem: 'L’hyperviseur de type 1 s’installe…', opts: ['Directement sur le matériel', 'Sur un OS hôte', 'Dans une VM'], correct: 0, exp: 'C’est un hyperviseur bare-metal.' },
    { stem: 'Exemple d’hyperviseur de type 1 ?', opts: ['ESXi', 'VirtualBox', 'Workstation'], correct: 0, exp: 'ESXi s’exécute directement sur le serveur.' },
    { stem: 'Rôle de vCenter ?', opts: ['Gestion centralisée des hôtes', 'Créer des images ISO', 'Sauvegarder les VM'], correct: 0, exp: 'Il administre plusieurs hôtes et les clusters.' },
    { stem: 'En NAT, la VM est-elle accessible depuis le LAN ?', opts: ['Non', 'Oui', 'Parfois'], correct: 0, exp: 'Elle sort via l’hôte mais n’est pas joignable de l’extérieur.' },
    { stem: 'Quel mode met la VM sur le même réseau que l’hôte ?', opts: ['Bridge', 'NAT', 'Host-Only'], correct: 0, exp: 'Le pont intègre la VM au réseau physique.' },
    { stem: 'Quel format pour VMware ?', opts: ['VMDK', 'VHDX', 'ISO'], correct: 0, exp: 'VMDK est le format de disque de VMware.' },
    { stem: 'Que mesure le CPU Ready Time ?', opts: ['Le temps d’attente CPU d’une VM', 'La RAM libre', 'Le débit réseau'], correct: 0, exp: 'Il indique la contention CPU.' }
  ],

  pitfalls: [
    'Confondre hyperviseur de type 1 (bare-metal) et de type 2 (hébergé).',
    'Attendre qu’une VM en NAT soit joignable depuis le réseau local.',
    'Confondre VMDK (VMware) et VHDX (Microsoft).',
    'Surallouer les vCPU et dégrader le CPU Ready Time de tous.',
    'Croire que thin provisioning réserve l’espace à l’avance.'
  ],

  methodTitle: 'Provisionner et connecter une VM',
  method: [
    '<strong>Choisir</strong> l’hyperviseur : type 1 en production, type 2 pour le poste de travail.',
    '<strong>Gérer</strong> l’infrastructure avec vCenter et vSphere Client.',
    '<strong>Connecter</strong> la VM selon le besoin : NAT, Bridge ou Host-Only.',
    '<strong>Sélectionner</strong> le format d’image adapté (ISO, VMDK, VHDX).',
    '<strong>Dimensionner</strong> les vCPU sans surallocation excessive.'
  ],

  summary: [
    'Type 1 (ESXi) sur le matériel ; type 2 (Workstation, VirtualBox) sur un OS.',
    'ESXi héberge, vCenter gère, vSphere Client administre.',
    'NAT : Internet via l’hôte ; Bridge : sur le réseau ; Host-Only : réseau privé.',
    'ISO : optique ; VMDK : VMware ; VHD/VHDX : Microsoft.',
    'vCPU, CPU Ready Time et surallocation mesurent et limitent la contention CPU.'
  ],

  checklist: [
    'Je distingue les deux types d’hyperviseur.',
    'Je situe ESXi, vCenter et vSphere Client.',
    'Je compare NAT, Bridge et Host-Only.',
    'J’explique vCPU, CPU Ready Time et thin provisioning.'
  ],

  notions: ['hyperviseur', 'type 1', 'bare-metal', 'type 2', 'VMware ESXi', 'vCenter', 'vSphere Client', 'NAT', 'bridge', 'host-only', 'ISO', 'VMDK', 'VHDX', 'vCPU', 'CPU Ready Time', 'surallocation', 'thin provisioning'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends les deux types d’hyperviseur.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les modes réseau.' },
    { cls: 'good', text: '70–89 % — Solide : tu dimensionnes et connectes une VM.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : enchaîne sur les snapshots, chapitre 6.' }
  ],

  flashcards: [
    { q: 'Type 1 vs type 2 ?', a: 'Type 1 sur le matériel (ESXi) ; type 2 sur un OS (Workstation, VirtualBox).' },
    { q: 'Rôles ESXi / vCenter / vSphere Client ?', a: 'ESXi héberge, vCenter gère, vSphere Client administre.' },
    { q: 'Trois modes réseau d’une VM ?', a: 'NAT, Bridge, Host-Only.' },
    { q: 'Format de disque VMware ? Microsoft ?', a: 'VMDK pour VMware ; VHD/VHDX pour Microsoft.' },
    { q: 'Que mesure le CPU Ready Time ?', a: 'Le temps d’attente d’une VM pour obtenir du CPU.' },
    { q: 'Qu’est-ce que le thin provisioning ?', a: 'Allouer l’espace disque dynamiquement, selon l’usage réel.' }
  ]
};
