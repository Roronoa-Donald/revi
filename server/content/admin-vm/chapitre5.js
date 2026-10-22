/**
 * Chapitre 5 du cours « Admin VM » B2 — réseau virtualisé et segmentation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Réseau virtualisé et segmentation',
  short: 'Réseau',
  toc: 'Bridge, NAT, VLAN, DMZ et pare-feu, diagnostic réseau et scénario type.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Relier des VM entre elles et au monde extérieur ne suffit pas : il faut aussi cloisonner. Le ' +
    'réseau virtualisé repose sur un switch logique (le bridge), une segmentation (les VLAN) et un ' +
    'filtrage (le pare-feu) — comme un bâtiment avec couloirs et portes.',

  objectives: [
    'décrire les briques réseau (bridge, NAT, VLAN, pare-feu) ;',
    'expliquer le modèle du bridge virtuel ;',
    'situer les VLAN et la DMZ ;',
    'diagnostiquer un problème réseau par étapes.'
  ],

  sections: [
    {
      title: 'Les briques réseau',
      html: [
        '<ul>',
        '  <li><strong>Bridge (vmbr)</strong> : switch virtuel relié au réseau physique.</li>',
        '  <li><strong>NAT</strong> : permet aux VM d’accéder à Internet sans IP publique.</li>',
        '  <li><strong>VLAN</strong> : segmentation logique dans un même switch.</li>',
        '  <li><strong>Pare-feu virtuel</strong> : filtre le trafic entre zones.</li>',
        '</ul>',
        '<p>Un bridge, c’est comme une multiprise : plusieurs VM s’y branchent. Un <strong>bridge ' +
        'principal</strong> porte le LAN de production, un <strong>bridge isolé</strong> sert aux tests ' +
        'ou à la DMZ. Point clé : le bridge <strong>transporte</strong> le trafic, il ne porte pas les ' +
        'politiques de sécurité.</p>',
        box('tech', 'Le bridge ne filtre pas', 'network',
          '    <p>Confondre bridge et pare-feu est une erreur classique : le bridge commute, le ' +
          'pare-feu décide. La sécurité vient du filtrage et de la segmentation, pas du switch.</p>')
      ].join('\n')
    },
    {
      title: 'VLAN et segmentation',
      html: [
        '<p>Les VLAN isolent les flux sans multiplier les switchs physiques :</p>',
        '<ul>',
        '  <li><strong>VLAN 10</strong> : utilisateurs.</li>',
        '  <li><strong>VLAN 20</strong> : serveurs.</li>',
        '  <li><strong>VLAN 30</strong> : DMZ.</li>',
        '</ul>',
        '<p>Le tagging VLAN est un mécanisme <strong>logique</strong> : il structure le trafic mais ' +
        '<strong>ne remplace pas le pare-feu</strong>. Deux VLAN séparés restent joignables si un ' +
        'routeur les relie sans filtrage.</p>'
      ].join('\n')
    },
    {
      title: 'DMZ et pare-feu',
      html: [
        '<p>Une <strong>DMZ</strong> héberge les services exposés (web, mail) et doit être isolée du ' +
        'LAN.</p>',
        '<ul>',
        '  <li>Placer les VM web en DMZ.</li>',
        '  <li>N’autoriser que les ports nécessaires.</li>',
        '  <li>Utiliser un pare-feu (pfSense, OPNsense).</li>',
        '  <li>Ne <strong>jamais</strong> mettre la base de données en DMZ.</li>',
        '</ul>',
        box('pitfall', 'La base de données en DMZ', 'warning',
          '    <p>Exposer la base de données revient à publier l’actif le plus sensible. La DMZ ne ' +
          'contient que ce qui doit être joignable de l’extérieur ; les données restent dans le LAN.</p>')
      ].join('\n')
    },
    {
      title: 'Diagnostiquer et scénario type',
      html: [
        '<p>Diagnostiquer un réseau virtuel suit un ordre : <strong>connectivité</strong> (la VM ' +
        'atteint-elle sa cible ?), <strong>chemin</strong> (par quelles zones passe le trafic ?), ' +
        '<strong>filtrage</strong> (quelles règles bloquent ?), <strong>segmentation</strong> (VLAN et ' +
        'DMZ respectés ?).</p>',
        '<p>Scénario : une agence veut héberger un site web et un ERP interne.</p>',
        '<ul>',
        '  <li>Web en DMZ (VLAN 30), ERP en LAN (VLAN 20), utilisateurs en VLAN 10.</li>',
        '  <li>Pare-feu : LAN et DMZ uniquement sur le port 443.</li>',
        '  <li>Résultat : le site est accessible, l’ERP reste protégé.</li>',
        '</ul>',
        box('intuition', 'Cloisonner pour limiter', 'lightbulb',
          '    <p>Les VLAN, la DMZ et le filtrage limitent la propagation en cas d’incident : si le ' +
          'web est compromis, le cloisonnement empêche l’attaquant d’atteindre directement le LAN.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qu’est-ce qu’un bridge ?', opts: ['Un switch virtuel', 'Un pare-feu', 'Un VLAN'], correct: 0, exp: 'Il relie les VM entre elles et au réseau physique.' },
    { stem: 'À quoi sert le NAT ?', opts: ['Accéder à Internet sans IP publique', 'Filtrer le trafic', 'Segmenter'], correct: 0, exp: 'La VM sort via l’hôte.' },
    { stem: 'Que fait un VLAN ?', opts: ['Segmente logiquement', 'Filtrez les paquets', 'Chiffre'], correct: 0, exp: 'Il isole les flux dans un même switch.' },
    { stem: 'Le tagging VLAN remplace-t-il un pare-feu ?', opts: ['Non', 'Oui', 'Toujours'], correct: 0, exp: 'Il structure mais ne filtre pas.' },
    { stem: 'Où placer un serveur web exposé ?', opts: ['En DMZ', 'Dans le LAN', 'Sur le contrôleur de domaine'], correct: 0, exp: 'La DMZ accueille les services exposés.' },
    { stem: 'Où ne jamais mettre la base de données ?', opts: ['En DMZ', 'Dans le LAN', 'Derrière le pare-feu'], correct: 0, exp: 'Elle contient les données les plus sensibles.' },
    { stem: 'VLAN des serveurs ?', opts: ['20', '10', '30'], correct: 0, exp: 'VLAN 20 pour les serveurs, 10 utilisateurs, 30 DMZ.' },
    { stem: 'Premier réflexe de diagnostic ?', opts: ['Tester la connectivité', 'Réinstaller', 'Changer de switch'], correct: 0, exp: 'On vérifie d’abord si la cible est atteignable.' }
  ],

  pitfalls: [
    'Confondre bridge (commutation) et pare-feu (filtrage).',
    'Croire que des VLAN séparés protègent sans filtrage.',
    'Exposer une base de données en DMZ.',
    'Ouvrir des ports « au cas où » au lieu du strict nécessaire.',
    'Oublier de tester le chemin réel du trafic.'
  ],

  methodTitle: 'Cloisonner un réseau virtuel',
  method: [
    '<strong>Définir</strong> les zones : utilisateurs, serveurs, DMZ.',
    '<strong>Relier</strong> avec des bridges (principal et isolé).',
    '<strong>Segmenter</strong> par VLAN (10, 20, 30).',
    '<strong>Filtrer</strong> avec un pare-feu (ports stricts).',
    '<strong>Diagnostiquer</strong> connectivité, chemin, filtrage, segmentation.'
  ],

  summary: [
    'Briques : bridge (switch), NAT (Internet), VLAN (segmentation), pare-feu (filtrage).',
    'Le bridge commute, il ne filtre pas.',
    'VLAN 10 utilisateurs, 20 serveurs, 30 DMZ.',
    'DMZ pour les services exposés ; jamais la base de données.',
    'Diagnostic : connectivité, chemin, filtrage, segmentation.'
  ],

  checklist: [
    'Je décris les briques réseau.',
    'J’explique le modèle du bridge.',
    'Je situe les VLAN et la DMZ.',
    'Je diagnostique un problème réseau par étapes.'
  ],

  notions: ['bridge', 'vmbr', 'NAT', 'VLAN', 'tagging', 'DMZ', 'pare-feu', 'pfSense', 'OPNsense', 'segmentation', 'filtrage', 'diagnostic'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez les briques réseau.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur VLAN et DMZ.' },
    { cls: 'good', text: '70–94 % — Solide : vous cloisonnez et diagnostiques.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe à l’administration avancée, chapitre 6.' }
  ],

  flashcards: [
    { q: 'Bridge vs pare-feu ?', a: 'Le bridge commute le trafic ; le pare-feu le filtre.' },
    { q: 'Que fait le NAT ?', a: 'Il donne accès à Internet via l’adresse de l’hôte.' },
    { q: 'Rôle d’un VLAN ?', a: 'Segmenter logiquement les flux dans un même switch.' },
    { q: 'Que place-t-on en DMZ ?', a: 'Les services exposés : web, mail — jamais la base de données.' },
    { q: 'Diagnostic réseau : quatre étapes ?', a: 'Connectivité, chemin, filtrage, segmentation.' },
    { q: 'VLAN 10 / 20 / 30 ?', a: 'Utilisateurs, serveurs, DMZ.' }
  ]
};
