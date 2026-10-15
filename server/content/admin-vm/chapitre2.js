/**
 * Chapitre 2 du cours « Admin VM » B2 — prérequis et architecture.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Prérequis et architecture des hyperviseurs',
  short: 'Prérequis & architecture',
  toc: 'Extensions CPU, virtualisation imbriquée, pile KVM, plan de données et plan de gestion.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un hyperviseur ne s’installe pas au hasard : le firmware doit exposer les extensions de ' +
    'virtualisation, et l’architecture sépare clairement le plan de données du plan de gestion. ' +
    'Comprendre ces couches évite bien des erreurs de conception.',

  objectives: [
    'identifier les prérequis matériels (extensions CPU, RAM, I/O, réseau) ;',
    'expliquer le rôle du BIOS/UEFI et des extensions ;',
    'décrire la pile KVM (noyau, QEMU, libvirt) ;',
    'distinguer plan de données et plan de gestion.'
  ],

  sections: [
    {
      title: 'Prérequis matériels',
      html: [
        '<p>Quatre éléments conditionnent la virtualisation :</p>',
        '<ul>',
        '  <li><strong>Extensions CPU</strong> (VT-x / AMD-V) : base de l’isolation matérielle.</li>',
        '  <li><strong>RAM</strong> : ressource la plus critique, car partagée sans élasticité entre VM.</li>',
        '  <li><strong>I/O disque</strong> : limite directe de la réactivité des VM.</li>',
        '  <li><strong>Réseau</strong> : débit et latence conditionnent migrations et services.</li>',
        '</ul>',
        '<p>Le prérequis principal est la <strong>capacité</strong> (CPU, RAM, I/O), pas une marque ou ' +
        'un modèle précis.</p>',
        box('tech', 'Le firmware décide', 'cpu',
          '    <p>Le BIOS/UEFI expose ou bloque les extensions : sans elles, l’hyperviseur ne peut pas ' +
          'isoler correctement les VM. À côté de VT-x/AMD-V, VT-d/IOMMU isole les accès ' +
          'périphériques, et Secure Boot influence le chargement de certains hyperviseurs.</p>')
      ].join('\n')
    },
    {
      title: 'Virtualisation imbriquée et conflits de couches',
      html: [
        '<p>La <strong>virtualisation imbriquée</strong> (nested) exécute un hyperviseur dans une VM. ' +
        'Elle met en évidence la chaîne d’abstraction : matériel → hyperviseur → VM → hyperviseur → VM.</p>',
        '<p>Elle est utile pour comprendre les couches, pas pour la performance : plus on empile, plus ' +
        'la latence augmente. Elle montre aussi la différence entre isolement logique et limites ' +
        'physiques.</p>',
        '<p>Sur un OS hôte, plusieurs hyperviseurs peuvent entrer en <strong>conflit</strong> : ils ' +
        'cherchent à contrôler les mêmes extensions CPU. Un seul moteur doit posséder l’accès ' +
        'privilégié au processeur.</p>',
        box('pitfall', 'Nested en production', 'warning',
          '    <p>La virtualisation imbriquée est avant tout <strong>pédagogique</strong>. L’utiliser ' +
          'en production mène à des performances insuffisantes et à des dépendances fragiles.</p>')
      ].join('\n')
    },
    {
      title: 'La pile KVM',
      html: [
        '<p>Sur Linux, la virtualisation repose sur trois composants complémentaires :</p>',
        '<ul>',
        '  <li><strong>Noyau</strong> : module KVM qui expose les extensions CPU et fournit ' +
        'l’accélération matérielle.</li>',
        '  <li><strong>QEMU</strong> : crée et exécute les machines virtuelles.</li>',
        '  <li><strong>Libvirt</strong> : couche de pilotage et d’API qui unifie la gestion.</li>',
        '</ul>',
        '<p>Le principe clé : l’accélération matérielle réduit la pénalité de la virtualisation. ' +
        'D’autres architectures (Apple Silicon, ARM) modifient la compatibilité, mais les concepts ' +
        'restent les mêmes.</p>'
      ].join('\n')
    },
    {
      title: 'Architecture d’un hyperviseur',
      html: [
        '<p>Un hyperviseur réunit compute, stockage et réseau sous un pilotage central, avec deux plans :</p>',
        '<ul>',
        '  <li><strong>Plan de données</strong> : exécution des VM et entrées/sorties.</li>',
        '  <li><strong>Plan de gestion</strong> : interface, API, rôles et audit.</li>',
        '</ul>',
        '<p>Les choix initiaux structurent la suite : stockage (LVM-thin pour la souplesse, ZFS pour ' +
        'la robustesse), réseau (plan IP et segmentation), identité (noms clairs, rôles et périmètres). ' +
        'Le <strong>stockage</strong> est le point de défaillance principal : il conditionne toute la ' +
        'plateforme.</p>',
        '<p>Un plan de gestion bien conçu applique le <strong>moindre privilège</strong>, journalise ' +
        'les changements et planifie la maintenance. Un hyperviseur non gouverné expose toutes ses VM.</p>',
        box('intuition', 'Deux plans, deux responsabilités', 'lightbulb',
          '    <p>Le plan de données fait tourner les VM ; le plan de gestion décide qui peut quoi. ' +
          'Les confondre — administrer depuis le réseau des VM — revient à laisser la porte ouverte ' +
          'sur toute la plateforme.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel prérequis permet l’isolation matérielle ?', opts: ['Les extensions CPU', 'Le clavier', 'Le DNS'], correct: 0, exp: 'VT-x / AMD-V exécutent les instructions privilégiées.' },
    { stem: 'Quelle ressource est la plus critique ?', opts: ['La RAM', 'La souris', 'Le lecteur CD'], correct: 0, exp: 'La RAM se partage sans élasticité.' },
    { stem: 'Que fait VT-d / IOMMU ?', opts: ['Isole les accès périphériques', 'Compresse les disques', 'Route le réseau'], correct: 0, exp: 'Il isole les accès matériels directs.' },
    { stem: 'La virtualisation imbriquée est…', opts: ['Surtout pédagogique', 'Plus rapide', 'Obligatoire en production'], correct: 0, exp: 'Empiler des couches augmente la latence.' },
    { stem: 'Quel composant exécute les VM dans KVM ?', opts: ['QEMU', 'Libvirt', 'Le noyau'], correct: 0, exp: 'QEMU crée et exécute les VM.' },
    { stem: 'Rôle de libvirt ?', opts: ['Pilotage et API', 'Accélération CPU', 'Émulation'], correct: 0, exp: 'Libvirt unifie la gestion.' },
    { stem: 'Quel plan exécute les VM ?', opts: ['Le plan de données', 'Le plan de gestion', 'Le firmware'], correct: 0, exp: 'Le plan de données traite l’exécution et les I/O.' },
    { stem: 'Quel est le point de défaillance principal ?', opts: ['Le stockage', 'Le clavier', 'L’écran'], correct: 0, exp: 'Toutes les VM reposent sur le stockage.' }
  ],

  pitfalls: [
    'Croire que la CPU suffit : la RAM limite le nombre de VM.',
    'Utiliser la virtualisation imbriquée en production.',
    'Laisser plusieurs hyperviseurs se disputer les extensions CPU.',
    'Administrer depuis le réseau des VM (plan de gestion exposé).',
    'Négliger les I/O disque, qui conditionnent la réactivité.'
  ],

  methodTitle: 'Préparer et architecturer un hôte',
  method: [
    '<strong>Vérifier</strong> les extensions CPU et le firmware (VT-x/AMD-V, VT-d).',
    '<strong>Dimensionner</strong> la RAM et les I/O selon les charges.',
    '<strong>Choisir</strong> la pile (KVM : noyau, QEMU, libvirt) sans conflit de couches.',
    '<strong>Séparer</strong> plan de données et plan de gestion.',
    '<strong>Sécuriser</strong> le plan de gestion (moindre privilège, audit).'
  ],

  summary: [
    'Prérequis : extensions CPU, RAM, I/O, réseau.',
    'Le firmware expose ou bloque les extensions.',
    'Nested = pédagogique, plus lent ; conflits possibles entre hyperviseurs.',
    'Pile KVM : noyau (CPU), QEMU (VM), libvirt (pilotage).',
    'Plan de données (exécution) et plan de gestion (gouvernance).'
  ],

  checklist: [
    'Je connais les prérequis matériels.',
    'J’explique le rôle du BIOS/UEFI.',
    'Je décris la pile KVM.',
    'Je distingue plan de données et plan de gestion.'
  ],

  notions: ['prérequis', 'VT-x', 'AMD-V', 'VT-d', 'IOMMU', 'Secure Boot', 'virtualisation imbriquée', 'nested', 'KVM', 'QEMU', 'libvirt', 'plan de données', 'plan de gestion', 'stockage', 'compute'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends les prérequis matériels.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la pile KVM.' },
    { cls: 'good', text: '70–89 % — Solide : tu architectures un hôte proprement.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe au cycle de vie des VM, chapitre 3.' }
  ],

  flashcards: [
    { q: 'Quatre prérequis matériels ?', a: 'Extensions CPU, RAM, I/O disque, réseau.' },
    { q: 'Rôle du BIOS/UEFI ?', a: 'Il expose ou bloque les extensions de virtualisation.' },
    { q: 'Nested : intérêt et limite ?', a: 'Pédagogique ; plus lent à cause des couches empilées.' },
    { q: 'Les trois composants de KVM ?', a: 'Noyau (CPU), QEMU (VM), libvirt (pilotage/API).' },
    { q: 'Plan de données vs plan de gestion ?', a: 'Exécution des VM / gouvernance et administration.' },
    { q: 'Point de défaillance principal ?', a: 'Le stockage : toutes les VM en dépendent.' }
  ]
};
