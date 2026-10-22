/**
 * Chapitre 4 du cours « Windows Server » B2 — maintenance.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Maintenance de Windows Server',
  short: 'Maintenance',
  toc: 'Maintenance préventive, corrective et évolutive, surveillance, seuils de température et planning.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un serveur ne reste fiable que si on s’en occupe. La maintenance englobe les actions qui ' +
    'garantissent la disponibilité, la performance, la sécurité et la continuité : surveiller, mettre à ' +
    'jour, dépanner, documenter.',

  objectives: [
    'distinguer maintenance préventive, corrective et évolutive ;',
    'surveiller CPU, RAM, disque, réseau et journaux d’événements ;',
    'interpréter les seuils de température du matériel ;',
    'établir un planning de maintenance par fréquence.'
  ],

  sections: [
    {
      title: 'Maintenance préventive',
      html: [
        '<p>La maintenance <strong>préventive</strong> exécute régulièrement des actions destinées à ' +
        '<strong>éviter l’apparition des pannes</strong>, minimiser les risques et anticiper les ' +
        'incidents. Elle réduit les interruptions, garantit la sécurité, optimise les performances et ' +
        'prévient la dégradation matérielle ou logicielle.</p>',
        '<p>Elle couvre : les <strong>mises à jour</strong> (Windows Update, pilotes, BIOS, firmware), la ' +
        '<strong>surveillance</strong> de l’état du système, la <strong>vérification des sauvegardes</strong>, ' +
        'le <strong>contrôle de la sécurité</strong> (comptes inactifs, groupes sensibles, pare-feu, ' +
        'antivirus) et la <strong>vérification du matériel</strong> (température, ventilateurs, SMART).</p>',
        box('tech', 'Mettre à jour sans risque', 'wrench',
          '    <p>Avant une mise à jour : tester sur un serveur de préproduction, prendre un ' +
          '<strong>snapshot</strong> de la VM, puis planifier l’opération après les heures de production. ' +
          'Trois réflexes qui transforment une mise à jour risquée en opération maîtrisée.</p>')
      ].join('\n')
    },
    {
      title: 'Surveiller le système',
      html: [
        '<p>La surveillance s’appuie sur des outils dédiés à chaque ressource :</p>',
        '<table><thead><tr><th>Élément</th><th>Outils</th><th>Objectif</th></tr></thead><tbody>',
        '<tr><td>CPU &amp; RAM</td><td>Task Manager, Resource Monitor</td><td>Détecter surutilisation ou fuite mémoire</td></tr>',
        '<tr><td>Disque</td><td>Performance Monitor, Disk Management</td><td>Anticiper le stockage, repérer les secteurs défectueux</td></tr>',
        '<tr><td>Réseau</td><td>netstat, ping, Wireshark</td><td>Vérifier bande passante, latence, ports ouverts</td></tr>',
        '<tr><td>Journaux</td><td>Event Viewer</td><td>Repérer erreurs, anomalies et alertes</td></tr>',
        '</tbody></table>',
        '<p>Surveiller, c’est aussi vérifier que les sauvegardes ont bien tourné, tester leur restauration, ' +
        'contrôler l’espace des cibles et s’assurer que l’annuaire (AD) est sauvegardé.</p>'
      ].join('\n')
    },
    {
      title: 'Matériel et fréquences',
      html: [
        '<p>Sur les serveurs physiques, on surveille la température du processeur, les ventilateurs, ' +
        'l’état des disques (SMART) et la redondance d’alimentation.</p>',
        '<table><thead><tr><th>État</th><th>Température</th></tr></thead><tbody>',
        '<tr><td>Normal</td><td>30 – 60 °C</td></tr>',
        '<tr><td>Chaud</td><td>60 – 80 °C</td></tr>',
        '<tr><td>Danger</td><td>&gt; 85 °C</td></tr>',
        '<tr><td>Critique</td><td>&gt; 95 °C</td></tr>',
        '</tbody></table>',
        '<p>Un planning type répartit les tâches dans le temps : analyse des logs chaque semaine, ' +
        'nettoyage disque, test de sauvegarde et correctifs chaque mois, mise à jour du firmware et test ' +
        'du PRA chaque trimestre, audit de sécurité et documentation chaque année.</p>',
        box('pitfall', 'Une maintenance sans planning', 'warning',
          '    <p>Sans calendrier, la maintenance se fait « quand on y pense » — c’est-à-dire jamais. Le ' +
          'planning transforme de bonnes intentions en routine vérifiable.</p>')
      ].join('\n')
    },
    {
      title: 'Maintenance corrective et évolutive',
      html: [
        '<p>La maintenance <strong>corrective</strong> intervient <strong>après</strong> une panne ou un ' +
        'dysfonctionnement. Objectifs : restaurer le service au plus vite, identifier la cause, apporter ' +
        'un correctif durable. Exemples : relancer un service (AD DS, DNS, DHCP), corriger un fichier ' +
        'corrompu, résoudre un problème réseau avec <code>ping</code>, <code>tracert</code> ou ' +
        '<code>nslookup</code>.</p>',
        '<p>La maintenance <strong>évolutive</strong> vise à <strong>améliorer, moderniser ou faire ' +
        'évoluer</strong> l’infrastructure : renforcer la sécurité, ajouter des fonctionnalités, ' +
        'améliorer les performances, préparer la croissance. Exemple : migrer une version de Windows ' +
        'Server (2012 R2 → 2016 → 2019 → 2022).</p>',
        box('intuition', 'Anticiper plutôt que réparer', 'lightbulb',
          '    <p>Plus l’effort porte sur le préventif, moins le correctif est fréquent. La maintenance ' +
          'n’est pas une dépense subie mais un investissement qui se mesure en heures d’arrêt évitées.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel type de maintenance évite les pannes ?', opts: ['Préventive', 'Corrective', 'Évolutive'], correct: 0, exp: 'Elle agit régulièrement avant l’incident.' },
    { stem: 'Quand intervient la maintenance corrective ?', opts: ['Après une panne', 'Avant toute panne', 'Jamais'], correct: 0, exp: 'Elle répare un dysfonctionnement survenu.' },
    { stem: 'Quel outil pour les journaux système ?', opts: ['Event Viewer', 'Wireshark', 'Disk Management'], correct: 0, exp: 'L’observateur d’événements liste erreurs et alertes.' },
    { stem: 'Quel outil pour le réseau ?', opts: ['netstat, ping, Wireshark', 'Event Viewer', 'Resource Monitor'], correct: 0, exp: 'Ils vérifient bande passante, latence et ports.' },
    { stem: 'Température « danger » du CPU ?', opts: ['> 85 °C', '> 30 °C', '> 60 °C'], correct: 0, exp: 'Au-delà de 85 °C, risque d’arrêt brutal.' },
    { stem: 'Que faire avant une mise à jour majeure ?', opts: ['Un snapshot de la VM', 'Rien', 'Éteindre le serveur'], correct: 0, exp: 'Le snapshot permet de revenir en arrière.' },
    { stem: 'Tâche hebdomadaire de maintenance ?', opts: ['Analyse des logs', 'Audit de sécurité complet', 'Migration de version'], correct: 0, exp: 'L’analyse des logs est la routine hebdomadaire.' },
    { stem: 'Que vise la maintenance évolutive ?', opts: ['Améliorer et moderniser', 'Réparer une panne', 'Éviter les pannes'], correct: 0, exp: 'Elle fait évoluer l’infrastructure.' }
  ],

  pitfalls: [
    'Mettre à jour un serveur en pleine journée de production.',
    'Ne pas prendre de snapshot avant une modification critique.',
    'Ignorer les journaux : les avertissements précèdent souvent la panne.',
    'Faire du préventif sans jamais tester la restauration.',
    'Rester sur une version obsolète au lieu de planifier une migration.'
  ],

  methodTitle: 'Organiser la maintenance d’un serveur',
  method: [
    '<strong>Surveiller</strong> CPU, RAM, disque, réseau et journaux en continu.',
    '<strong>Prévenir</strong> : mises à jour, sécurité, matériel, sauvegardes vérifiées.',
    '<strong>Planifier</strong> les tâches par fréquence (hebdomadaire à annuelle).',
    '<strong>Corriger</strong> rapidement toute panne en s’appuyant sur les outils de diagnostic.',
    '<strong>Faire évoluer</strong> l’infrastructure pour préparer la croissance.'
  ],

  summary: [
    'Préventive : agir avant la panne (mises à jour, surveillance, sécurité, matériel).',
    'Outils : Task Manager, Performance Monitor, Event Viewer, netstat, Wireshark.',
    'Température : normal 30-60 °C, danger > 85 °C, critique > 95 °C.',
    'Planning : hebdomadaire à annuelle selon la tâche.',
    'Corrective : réparer ; évolutive : moderniser et migrer.'
  ],

  checklist: [
    'Je distingue préventive, corrective et évolutive.',
    'Je connais les outils de surveillance.',
    'J’interprète les seuils de température.',
    'Je sais établir un planning de maintenance.'
  ],

  notions: ['maintenance', 'préventive', 'corrective', 'évolutive', 'mises à jour', 'surveillance', 'Event Viewer', 'Performance Monitor', 'netstat', 'Wireshark', 'SMART', 'planning', 'migration'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez les trois types de maintenance.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les outils de surveillance.' },
    { cls: 'good', text: '70–94 % — Solide : vous planifiez un préventif complet.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : enchaîne sur la virtualisation, chapitre 5.' }
  ],

  flashcards: [
    { q: 'Maintenance préventive ?', a: 'Agir régulièrement pour éviter l’apparition des pannes.' },
    { q: 'Maintenance corrective ?', a: 'Réparer un service après une panne ou un dysfonctionnement.' },
    { q: 'Maintenance évolutive ?', a: 'Améliorer, moderniser ou faire évoluer l’infrastructure.' },
    { q: 'Outil des journaux système ?', a: 'Event Viewer (observateur d’événements).' },
    { q: 'Seuils de température CPU ?', a: 'Normal 30-60 °C, chaud 60-80 °C, danger > 85 °C, critique > 95 °C.' },
    { q: 'Trois réflexes avant une mise à jour ?', a: 'Tester en préproduction, prendre un snapshot, planifier hors production.' }
  ]
};
