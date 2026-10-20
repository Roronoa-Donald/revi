/**
 * Chapitre 1 du cours « Admin VM » B2 — introduction à la virtualisation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Introduction à la virtualisation',
  short: 'Introduction',
  toc: 'Définition, avantages, grands types, hyperviseur type 1/2, panorama des solutions et vocabulaire.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Un serveur physique coûte cher, consomme et se remplace. La virtualisation permet d’exécuter ' +
    'plusieurs ordinateurs complets sur une seule machine, comme des appartements dans un immeuble : ' +
    'chacun a ses règles, sans partager ses murs.',

  objectives: [
    'définir la virtualisation et ses avantages ;',
    'distinguer hyperviseur de type 1 et de type 2 ;',
    'situer les grands types de virtualisation ;',
    'employer le vocabulaire : hôte, invité, vCPU, snapshot, template, cluster.'
  ],

  sections: [
    {
      title: 'Qu’est-ce que la virtualisation',
      html: [
        '<p>La virtualisation permet d’exécuter plusieurs <strong>machines virtuelles</strong> (VM) sur ' +
        'un seul serveur physique. Chaque VM fonctionne comme un ordinateur complet : son propre ' +
        'système, ses logiciels, ses ressources (CPU, RAM, disque).</p>',
        '<p>L’image de l’immeuble aide : le serveur physique est le bâtiment, chaque VM est un ' +
        'appartement indépendant, avec ses règles et ses occupants.</p>',
        box('tech', 'Une évaluation théorique', 'book',
          '    <p>L’évaluation de ce module est <strong>100 % théorique</strong> : on attend des ' +
          'définitions claires, des comparaisons justes et la capacité à relier les notions — pas de ' +
          'manipulation d’outil.</p>')
      ].join('\n')
    },
    {
      title: 'Pourquoi virtualiser',
      html: [
        '<p>Quatre bénéfices structurent la décision :</p>',
        '<ul>',
        '  <li><strong>Consolidation</strong> : un serveur physique héberge 5 à 20 VM selon la charge.</li>',
        '  <li><strong>Économies</strong> : moins d’achats matériels, moins d’énergie, moins de maintenance.</li>',
        '  <li><strong>Disponibilité</strong> : snapshots, sauvegardes et restauration rapide.</li>',
        '  <li><strong>Agilité</strong> : une VM se crée en quelques minutes pour un projet ou un cours.</li>',
        '</ul>',
        '<p>Exemple : une PME qui avait quatre serveurs physiques (fichiers, application, base de ' +
        'données, sauvegarde) passe à un serveur plus un NAS. Elle réduit ses coûts d’énergie et son ' +
        'temps d’administration.</p>',
        box('intuition', 'Mutualiser sans mélanger', 'lightbulb',
          '    <p>La virtualisation donne l’illusion de machines séparées sur un matériel unique. ' +
          'L’isolation est la garantie : si une VM tombe, les autres continuent — à condition de bien ' +
          'dimensionner les ressources partagées.</p>')
      ].join('\n')
    },
    {
      title: 'Les grands types de virtualisation',
      html: [
        '<table><thead><tr><th>Type</th><th>Objectif</th><th>Exemples</th></tr></thead><tbody>',
        '<tr><td>Serveur</td><td>Héberger plusieurs OS sur un serveur</td><td>Proxmox, ESXi, Hyper-V</td></tr>',
        '<tr><td>Poste (VDI)</td><td>Postes virtuels centralisés</td><td>VMware Horizon, Citrix</td></tr>',
        '<tr><td>Stockage</td><td>Pool de disques mutualisé</td><td>NAS/SAN, Ceph</td></tr>',
        '<tr><td>Réseau</td><td>Segmentation et routeurs virtuels</td><td>VLAN, pfSense</td></tr>',
        '</tbody></table>',
        '<p>La virtualisation de serveurs est la plus répandue : c’est elle qui transforme une salle ' +
        'machine en une plateforme souple.</p>'
      ].join('\n')
    },
    {
      title: 'Hyperviseurs : type 1 et type 2',
      html: [
        '<table><thead><tr><th>Type</th><th>Fonctionnement</th><th>Pour qui ?</th><th>Exemples</th></tr></thead><tbody>',
        '<tr><td>Type 1 (bare-metal)</td><td>Installe directement sur le serveur</td><td>Production, entreprises</td><td>Proxmox VE, ESXi</td></tr>',
        '<tr><td>Type 2 (hébergé)</td><td>Installe sur un OS existant</td><td>Tests, formation</td><td>VMware Workstation, VirtualBox</td></tr>',
        '</tbody></table>',
        '<p>Règle simple : <strong>type 1 pour la production, type 2 pour apprendre et tester</strong>. ' +
        'Parmi les solutions : Proxmox VE (open-source, KVM + LXC), VMware ESXi (référence entreprise), ' +
        'Workstation et VirtualBox (poste de travail).</p>',
        '<p>Vocabulaire à connaître : <code>host</code> (serveur physique), <code>guest</code> (OS de ' +
        'la VM), <code>vCPU</code> (cœur virtuel), <code>snapshot</code> (photo d’une VM), ' +
        '<code>template</code> (modèle réutilisable), <code>cluster</code> (groupe de serveurs pour la ' +
        'HA et la migration).</p>',
        box('pitfall', 'Hyperviseur n’est pas OS hôte', 'warning',
          '    <p>Un hyperviseur de type 1 <strong>pilote directement le matériel</strong> : il n’y a ' +
          'pas d’« OS hôte » sous lui. Confondre les deux mène à un mauvais choix d’architecture.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que permet la virtualisation ?', opts: ['Exécuter plusieurs VM sur un serveur', 'Compresser des fichiers', 'Chiffrer le réseau'], correct: 0, exp: 'Plusieurs machines virtuelles sur un seul matériel.' },
    { stem: 'Un hyperviseur de type 1 s’installe…', opts: ['Directement sur le matériel', 'Sur un OS existant', 'Dans une VM'], correct: 0, exp: 'C’est un hyperviseur bare-metal.' },
    { stem: 'Exemple de type 2 ?', opts: ['VirtualBox', 'ESXi', 'Proxmox VE'], correct: 0, exp: 'Les hyperviseurs hébergés s’installent sur un OS.' },
    { stem: 'Quel type pour la production ?', opts: ['Type 1', 'Type 2', 'Aucun des deux'], correct: 0, exp: 'Le bare-metal vise la production.' },
    { stem: 'Que désigne le « host » ?', opts: ['Le serveur physique', 'L’OS de la VM', 'Le disque virtuel'], correct: 0, exp: 'Le host héberge les invités (guests).' },
    { stem: 'Que désigne le « guest » ?', opts: ['L’OS installé dans la VM', 'Le serveur physique', 'Le switch virtuel'], correct: 0, exp: 'L’invité s’exécute dans la machine virtuelle.' },
    { stem: 'Que fait la consolidation ?', opts: ['Regrouper plusieurs serveurs sur un seul', 'Supprimer des VM', 'Chiffrer les sauvegardes'], correct: 0, exp: 'Moins de machines physiques, plus de VM.' },
    { stem: 'Quel est un type de virtualisation ?', opts: ['Stockage', 'Compilation', 'Impression'], correct: 0, exp: 'Serveur, poste, stockage et réseau.' }
  ],

  pitfalls: [
    'Confondre hyperviseur de type 1 et OS hôte.',
    'Choisir un hyperviseur de type 2 pour de la production critique.',
    'Croire que la consolidation se fait sans dimensionner les ressources.',
    'Négliger la disponibilité lors du passage à la virtualisation.',
    'Mélanger le vocabulaire host / guest.'
  ],

  methodTitle: 'Décider d’une plateforme virtualisée',
  method: [
    '<strong>Lister</strong> les serveurs à consolider et leurs charges.',
    '<strong>Choisir</strong> le type d’hyperviseur selon production ou test.',
    '<strong>Comparer</strong> les solutions (coût, compétence, haute disponibilité).',
    '<strong>Dimensionner</strong> CPU, RAM, stockage et réseau.',
    '<strong>Prévoir</strong> snapshots, sauvegardes et vocabulaire commun.'
  ],

  summary: [
    'La virtualisation exécute plusieurs VM sur un serveur physique.',
    'Avantages : consolidation, économies, disponibilité, agilité.',
    'Type 1 pour la production, type 2 pour les tests.',
    'Types : serveur, poste, stockage, réseau.',
    'Vocabulaire : host, guest, vCPU, snapshot, template, cluster.'
  ],

  checklist: [
    'Je définis la virtualisation et ses avantages.',
    'Je distingue type 1 et type 2.',
    'Je cite les grands types de virtualisation.',
    'Je maîtrise le vocabulaire essentiel.'
  ],

  notions: ['virtualisation', 'VM', 'consolidation', 'hyperviseur', 'type 1', 'bare-metal', 'type 2', 'Proxmox', 'ESXi', 'Hyper-V', 'VirtualBox', 'host', 'guest', 'vCPU', 'snapshot', 'template', 'cluster'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends la différence type 1 / type 2.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le vocabulaire.' },
    { cls: 'good', text: '70–89 % — Solide : tu justifies un choix d’hyperviseur.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe aux prérequis et à l’architecture, chapitre 2.' }
  ],

  flashcards: [
    { q: 'Que fait la virtualisation ?', a: 'Exécuter plusieurs VM sur un seul serveur physique.' },
    { q: 'Avantages principaux ?', a: 'Consolidation, économies, disponibilité, agilité.' },
    { q: 'Type 1 vs type 2 ?', a: 'Type 1 sur le matériel (production) ; type 2 sur un OS hôte (tests).' },
    { q: 'Quatre grands types ?', a: 'Serveur, poste (VDI), stockage, réseau.' },
    { q: 'Host vs guest ?', a: 'Host : serveur physique ; guest : OS de la VM.' },
    { q: 'Que sont snapshot et template ?', a: 'Snapshot : photo d’une VM ; template : modèle réutilisable.' }
  ]
};
