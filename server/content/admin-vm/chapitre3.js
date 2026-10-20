/**
 * Chapitre 3 du cours « Admin VM » B2 — cycle de vie et ressources des VM.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Cycle de vie et ressources des VM',
  short: 'Cycle de vie',
  toc: 'Concepts, cycle de vie, allocation vCPU/RAM/disque, identité réseau, snapshots, clones et templates.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Une VM se crée, vit et meurt comme un service. Sans cycle de vie clair, elle devient un risque : ' +
    'ressources mal dimensionnées, sauvegardes oubliées, dépendances invisibles. Le cycle de vie est le ' +
    'cadre qui garde le contrôle.',

  objectives: [
    'définir VM, template, clone et snapshot ;',
    'décrire les quatre phases du cycle de vie ;',
    'allouer vCPU, RAM et disque selon la charge ;',
    'distinguer clone complet et clone lié.'
  ],

  sections: [
    {
      title: 'Concepts essentiels',
      html: [
        '<ul>',
        '  <li><strong>VM</strong> : unité d’exécution isolée avec ses ressources.</li>',
        '  <li><strong>Template</strong> : modèle standardisé pour uniformiser les déploiements.</li>',
        '  <li><strong>Clone</strong> : duplication d’un état existant.</li>',
        '  <li><strong>Snapshot</strong> : point de retour temporel.</li>',
        '</ul>',
        '<p>Ces notions se combinent pour accélérer la création sans perdre le contrôle : on part d’un ' +
        'template, on clone, on prend un snapshot avant modification.</p>'
      ].join('\n')
    },
    {
      title: 'Les quatre phases du cycle de vie',
      html: [
        '<ol>',
        '  <li><strong>Conception</strong> : objectifs, charges, criticité.</li>',
        '  <li><strong>Provisioning</strong> : ressources, stockage, réseau.</li>',
        '  <li><strong>Exploitation</strong> : supervision, mises à jour, sauvegarde.</li>',
        '  <li><strong>Retrait</strong> : archivage, nettoyage, traçabilité.</li>',
        '</ol>',
        '<p>Une VM sans cycle de vie clair devient vite un risque : personne ne sait ce qu’elle fait, ' +
        'ni si on peut l’éteindre.</p>',
        box('tech', 'Tracer pour pouvoir retirer', 'clipboard',
          '    <p>La phase de retrait est la plus souvent oubliée. Archiver les données utiles, ' +
          'libérer les ressources et consigner la suppression évitent de laisser traîner des VM ' +
          '« zombies » qui consomment sans servir.</p>')
      ].join('\n')
    },
    {
      title: 'Allocation de ressources',
      html: [
        '<ul>',
        '  <li><strong>vCPU</strong> : partage temporel du CPU physique — allouer plus que nécessaire ' +
        'crée de l’attente.</li>',
        '  <li><strong>RAM</strong> : ressource non élastique, à dimensionner finement.</li>',
        '  <li><strong>Disque</strong> : <em>thin</em> pour la souplesse, <em>thick</em> pour la ' +
        'performance garantie.</li>',
        '</ul>',
        '<p>Principe : dimensionner selon la charge réelle et la priorité du service, pas selon le ' +
        '« au cas où ».</p>',
        box('pitfall', 'La surallocation de vCPU', 'warning',
          '    <p>Quand le total de vCPU dépasse les cœurs physiques, les VM attendent leur tour : le ' +
          'CPU Ready Time s’allonge et toutes les performances baissent. La surallocation doit rester ' +
          'maîtrisée et proportionnée aux charges réelles.</p>')
      ].join('\n')
    },
    {
      title: 'Réseau, snapshots et clones',
      html: [
        '<p>Le réseau donne une identité et un périmètre à la VM : le <strong>bridge</strong> relie ' +
        'virtuel et physique, le <strong>VLAN</strong> isole logiquement les flux, l’adressage assure ' +
        'lisibilité et gouvernance.</p>',
        '<p>Un <strong>snapshot</strong> fige l’état d’une VM à un instant T : utile pour revenir en ' +
        'arrière après un changement, il <strong>ne remplace pas une sauvegarde externe</strong>.</p>',
        '<p>Un <strong>clone complet</strong> est indépendant mais plus lourd ; un <strong>clone ' +
        'lié</strong> est rapide mais dépend de sa base (souvent un template). La stratégie ' +
        'template → clone garantit cohérence et rapidité.</p>',
        box('intuition', 'Standardiser puis décliner', 'lightbulb',
          '    <p>Un template fige la qualité ; les clones la diffusent sans réinventer. C’est la même ' +
          'logique qu’une recette de cuisine : on maîtrise la base, puis on la duplique.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que duplique un clone ?', opts: ['Un état existant', 'Un snapshot', 'Un réseau'], correct: 0, exp: 'Le clone copie une VM ou un template.' },
    { stem: 'Première phase du cycle de vie ?', opts: ['Conception', 'Retrait', 'Exploitation'], correct: 0, exp: 'On définit les besoins avant de provisionner.' },
    { stem: 'Que fait la phase de provisioning ?', opts: ['Allouer les ressources', 'Archiver', 'Superviser'], correct: 0, exp: 'On attribue CPU, RAM, stockage, réseau.' },
    { stem: 'Quelle ressource est non élastique ?', opts: ['La RAM', 'Le vCPU', 'Le réseau'], correct: 0, exp: 'La RAM ne se partage pas dynamiquement.' },
    { stem: 'Disque thin : avantage ?', opts: ['Souplesse', 'Performance garantie', 'Chiffrement'], correct: 0, exp: 'L’espace est alloué selon l’usage réel.' },
    { stem: 'Un snapshot remplace-t-il une sauvegarde ?', opts: ['Non', 'Oui', 'Toujours'], correct: 0, exp: 'Il vit sur le même stockage et reste temporaire.' },
    { stem: 'Clone lié : faiblesse ?', opts: ['Il dépend de sa base', 'Il est trop gros', 'Il est trop lent'], correct: 0, exp: 'Si la base disparaît, le clone lié ne fonctionne plus.' },
    { stem: 'Que garantit un template ?', opts: ['Cohérence et rapidité', 'Le chiffrement', 'La migration'], correct: 0, exp: 'Un modèle standardise les déploiements.' }
  ],

  pitfalls: [
    'Utiliser un snapshot comme sauvegarde durable.',
    'Surallouer les vCPU et dégrader toutes les VM.',
    'Allouer la RAM « au cas où », sans dimensionnement fin.',
    'Oublier la phase de retrait (VM zombies).',
    'Supprimer la base d’un clone lié, qui cesse de fonctionner.'
  ],

  methodTitle: 'Cycler une VM proprement',
  method: [
    '<strong>Concevoir</strong> : objectifs, charges, criticité.',
    '<strong>Provisionner</strong> à partir d’un template (cohérence).',
    '<strong>Exploiter</strong> : superviser, mettre à jour, sauvegarder.',
    '<strong>Protéger</strong> par snapshots (court terme) et sauvegardes (long terme).',
    '<strong>Retirer</strong> : archiver, nettoyer, tracer.'
  ],

  summary: [
    'VM, template, clone et snapshot se combinent pour créer vite et bien.',
    'Cycle de vie : conception, provisioning, exploitation, retrait.',
    'vCPU (partage temporel), RAM (non élastique), disque thin/thick.',
    'Bridge pour le lien réseau, VLAN pour l’isolation.',
    'Snapshot = retour rapide ; backup = résilience.'
  ],

  checklist: [
    'Je définis VM, template, clone, snapshot.',
    'Je décris les quatre phases du cycle de vie.',
    'Je dimensionne vCPU, RAM et disque.',
    'Je distingue clone complet et clone lié.'
  ],

  notions: ['VM', 'template', 'clone', 'clone complet', 'clone lié', 'snapshot', 'cycle de vie', 'conception', 'provisioning', 'exploitation', 'retrait', 'vCPU', 'RAM', 'thin', 'thick', 'bridge', 'VLAN'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends les quatre phases du cycle de vie.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur l’allocation des ressources.' },
    { cls: 'good', text: '70–89 % — Solide : tu cycles une VM sans laisser de risque.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe au stockage et aux volumes, chapitre 4.' }
  ],

  flashcards: [
    { q: 'Quatre phases du cycle de vie ?', a: 'Conception, provisioning, exploitation, retrait.' },
    { q: 'vCPU : comment ça marche ?', a: 'Partage temporel du CPU physique entre VM.' },
    { q: 'Thin vs thick ?', a: 'Thin : souple, alloué à l’usage ; thick : réservé d’avance.' },
    { q: 'Snapshot vs backup ?', a: 'Snapshot : retour rapide (court terme) ; backup : résilience.' },
    { q: 'Clone complet vs lié ?', a: 'Complet : indépendant ; lié : dépend de sa base.' },
    { q: 'À quoi sert un template ?', a: 'À standardiser les déploiements de VM.' }
  ]
};
