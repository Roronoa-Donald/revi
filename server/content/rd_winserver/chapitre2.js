/**
 * Chapitre 2 du cours « Windows Server » B2 — haute disponibilité.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Haute disponibilité',
  short: 'Haute disponibilité',
  toc: 'Définition, trois piliers (redondance, failover, supervision), SLA, load balancer et HA virtualisée.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Pour une banque, un hôpital ou une boutique en ligne, chaque minute d’arrêt coûte. La haute ' +
    'disponibilité organise le système pour qu’une panne d’un composant ne devienne pas une panne du ' +
    'service : on duplique, on surveille, on bascule.',

  objectives: [
    'définir la haute disponibilité et son objectif ;',
    'expliquer les trois piliers : redondance, failover, supervision ;',
    'lire un taux de disponibilité (SLA) et son indisponibilité annuelle ;',
    'décrire la HA dans un environnement virtualisé.'
  ],

  sections: [
    {
      title: 'Définition et objectif',
      html: [
        '<p>La <strong>haute disponibilité</strong> (HA, <em>High Availability</em>) regroupe les ' +
        'mécanismes et configurations qui permettent à un système de <strong>continuer à fonctionner ' +
        'malgré la panne d’un composant</strong> — serveur, disque, réseau.</p>',
        '<p>L’objectif : minimiser, voire éviter, les interruptions de service, surtout pour les ' +
        'applications critiques. On ne cherche pas à empêcher la panne, mais à la rendre invisible pour ' +
        'l’utilisateur.</p>',
        box('tech', 'Disponibilité n’est pas sauvegarde', 'shield',
          '    <p>La HA maintient le service pendant une panne ; la sauvegarde permet de <em>revenir en ' +
          'arrière</em> après une perte de données. Les deux se complètent : l’une ne remplace pas ' +
          'l’autre.</p>')
      ].join('\n')
    },
    {
      title: 'Les trois piliers',
      html: [
        '<p>La haute disponibilité repose sur trois mécanismes complémentaires :</p>',
        '<ul>',
        '  <li><strong>Redondance</strong> : dupliquer les composants critiques (serveurs, disques, ' +
        'alimentations, liens réseau) pour supprimer le <strong>point unique de défaillance</strong>.</li>',
        '  <li><strong>Failover (basculement)</strong> : transférer automatiquement l’activité d’un ' +
        'composant défaillant vers un composant redondant, sans intervention humaine.</li>',
        '  <li><strong>Supervision (monitoring)</strong> : surveiller en temps réel l’état des ' +
        'ressources pour détecter les anomalies et déclencher le basculement.</li>',
        '</ul>',
        '<p>Exemple : deux serveurs web en parallèle derrière un <strong>load balancer</strong>. Si l’un ' +
        'tombe, le load balancer détecte l’échec et redirige les utilisateurs vers l’autre — sans ' +
        'interruption perceptible.</p>',
        box('tech', 'Des outils de supervision', 'chart',
          '    <p>Des solutions comme <strong>Zabbix</strong> ou <strong>Nagios</strong> surveillent ' +
          'constamment la disponibilité des serveurs et alertent, ou déclenchent une action, dès qu’une ' +
          'panne est détectée.</p>')
      ].join('\n')
    },
    {
      title: 'Les niveaux de disponibilité (SLA)',
      html: [
        '<p>La disponibilité s’exprime en pourcentage par an. Plus il y a de « 9 », plus ' +
        'l’indisponibilité tolérée est courte — et plus l’infrastructure coûte cher.</p>',
        '<table><thead><tr><th>Disponibilité</th><th>Indisponibilité / an</th></tr></thead><tbody>',
        '<tr><td>99 %</td><td>3 jours 15 h 36 min</td></tr>',
        '<tr><td>99,9 %</td><td>8 h 45 min 36 s</td></tr>',
        '<tr><td>99,99 %</td><td>52 min 34 s</td></tr>',
        '<tr><td>99,999 %</td><td>≈ 5 min 15 s</td></tr>',
        '</tbody></table>',
        '<p>Chaque « 9 » supplémentaire est un saut de complexité : redondance, supervision et ' +
        'procédures doivent suivre.</p>'
      ].join('\n')
    },
    {
      title: 'La HA virtualisée',
      html: [
        '<p>Dans un environnement comme <strong>Proxmox</strong> ou <strong>VMware vSphere</strong>, on ' +
        'regroupe plusieurs hôtes en <strong>cluster</strong>. Les machines virtuelles peuvent alors ' +
        'être redémarrées automatiquement sur un autre hôte en cas de panne matérielle.</p>',
        '<p>Si un hyperviseur tombe, ses VM redémarrent ailleurs selon les règles HA configurées. La ' +
        'haute disponibilité devient une propriété de l’infrastructure, plus seulement de l’application.</p>',
        box('intuition', 'La panne est prévue, pas subie', 'lightbulb',
          '    <p>On ne parie pas sur la fiabilité d’un composant : on admet qu’il tombera un jour et on ' +
          'prépare automatiquement son remplacement. C’est le renversement de perspective de la HA.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que vise la haute disponibilité ?', opts: ['Maintenir le service malgré une panne', 'Restaurer des fichiers', 'Accélérer le réseau'], correct: 0, exp: 'Elle organise la continuité de service.' },
    { stem: 'Citez un pilier de la HA.', opts: ['La redondance', 'La compression', 'Le chiffrement'], correct: 0, exp: 'Redondance, failover et supervision sont les trois piliers.' },
    { stem: 'Que supprime la redondance ?', opts: ['Le point unique de défaillance', 'Les sauvegardes', 'Les utilisateurs'], correct: 0, exp: 'On duplique pour qu’aucun composant soit seul.' },
    { stem: 'Que fait le failover ?', opts: ['Bascule automatiquement l’activité', 'Copie les données', 'Éteint le serveur'], correct: 0, exp: 'L’activité passe au composant redondant, sans intervention.' },
    { stem: 'À quoi sert la supervision ?', opts: ['Détecter les anomalies et déclencher la bascule', 'Ralentir le système', 'Supprimer les logs'], correct: 0, exp: 'Le monitoring observe l’état et alerte ou agit.' },
    { stem: 'Que signifie 99,9 % de disponibilité ?', opts: ['≈ 8 h 45 min d’arrêt par an', 'Zéro arrêt', 'Une journée par mois'], correct: 0, exp: 'Le tableau SLA donne l’indisponibilité annuelle.' },
    { stem: 'Que fait un load balancer ?', opts: ['Répartit les requêtes entre serveurs', 'Compresse les images', 'Sauvegarde les bases'], correct: 0, exp: 'Il distribue la charge et écarte un serveur en panne.' },
    { stem: 'En virtualisation, que permet la HA ?', opts: ['Redémarrer une VM sur un autre hôte', 'Effacer les snapshots', 'Changer l’adresse IP'], correct: 0, exp: 'Les VM redémarrent automatiquement ailleurs.' }
  ],

  pitfalls: [
    'Confondre haute disponibilité et sauvegarde.',
    'Laisser un composant unique sans redondance (point unique de défaillance).',
    'Configurer la redondance sans supervision : personne ne détecte la panne.',
    'Croire qu’un SLA élevé se décrète sans infrastructure adaptée.',
    'Oublier de tester la bascule : un failover jamais éprouvé peut échouer.'
  ],

  methodTitle: 'Concevoir un service hautement disponible',
  method: [
    '<strong>Identifier</strong> les points uniques de défaillance du service.',
    '<strong>Dupliquer</strong> les composants critiques (redondance).',
    '<strong>Automatiser</strong> la bascule vers le composant de secours.',
    '<strong>Superviser</strong> en continu pour détecter et déclencher.',
    '<strong>Tester</strong> la bascule et mesurer le taux de disponibilité obtenu.'
  ],

  summary: [
    'La HA maintient le service malgré la panne d’un composant.',
    'Trois piliers : redondance, failover, supervision.',
    'Un load balancer répartit la charge et écarte un serveur défaillant.',
    'Le SLA exprime la disponibilité annuelle (99 % à 99,999 %).',
    'En virtualisation, les VM redémarrent automatiquement sur un autre hôte.'
  ],

  checklist: [
    'Je définis la HA et son objectif.',
    'Je cite et explique les trois piliers.',
    'Je lis un tableau SLA.',
    'Je décris la HA d’un cluster virtualisé.'
  ],

  notions: ['haute disponibilité', 'HA', 'redondance', 'point unique de défaillance', 'failover', 'basculement', 'supervision', 'monitoring', 'SLA', 'load balancer', 'Zabbix', 'Nagios', 'Proxmox', 'vSphere'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois les trois piliers de la HA.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la lecture des SLA.' },
    { cls: 'good', text: '70–94 % — Solide : vous concevez une redondance supervisée.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : enchaîne sur le clustering, chapitre 3.' }
  ],

  flashcards: [
    { q: 'Que signifie HA ?', a: 'High Availability : maintenir le service malgré une panne.' },
    { q: 'Citez les trois piliers.', a: 'Redondance, failover, supervision.' },
    { q: 'Que supprime la redondance ?', a: 'Le point unique de défaillance.' },
    { q: 'À quoi sert un load balancer ?', a: 'Répartir les requêtes et écarter un serveur en panne.' },
    { q: '99,9 % = combien d’arrêt par an ?', a: 'Environ 8 h 45 min 36 s.' },
    { q: 'Deux outils de supervision ?', a: 'Zabbix et Nagios.' }
  ]
};
