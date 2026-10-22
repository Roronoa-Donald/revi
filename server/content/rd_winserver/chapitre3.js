/**
 * Chapitre 3 du cours « Windows Server » B2 — clustering.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Clustering',
  short: 'Clustering',
  toc: 'Principe, quorum, et les cinq types de clusters : active-passive, active-active, load balancing, failover, grid.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Mettre deux serveurs côte à côte ne suffit pas : il faut qu’ils coopèrent. Le clustering regroupe ' +
    'plusieurs nœuds pour qu’ils fonctionnent comme un seul système, avec haute disponibilité, ' +
    'répartition de charge et tolérance aux pannes.',

  objectives: [
    'définir le clustering et ses trois bénéfices ;',
    'expliquer le rôle du quorum ;',
    'distinguer active-passive, active-active, load balancing, failover et grid ;',
    'choisir le type de cluster adapté à un besoin.'
  ],

  sections: [
    {
      title: 'Qu’est-ce qu’un cluster',
      html: [
        '<p>Le <strong>clustering</strong> (grappes de serveurs) regroupe plusieurs serveurs, ou ' +
        '<strong>nœuds</strong>, pour qu’ils fonctionnent comme un seul système. Il apporte trois ' +
        'bénéfices :</p>',
        '<ul>',
        '  <li>la <strong>haute disponibilité</strong> ;</li>',
        '  <li>la <strong>répartition de charge</strong> ;</li>',
        '  <li>la <strong>tolérance aux pannes</strong>.</li>',
        '</ul>',
        '<p>Exemple : une boutique en ligne déployée sur trois serveurs en cluster. Si l’un tombe, les ' +
        'autres prennent le relais (failover) et le trafic se répartit (load balancing). Le service ne ' +
        's’interrompt pas.</p>',
        box('tech', 'Le quorum', 'users',
          '    <p>Dans un cluster, le <strong>quorum</strong> est la majorité des nœuds nécessaire pour ' +
          'décider qui fait quoi. Si le quorum est perdu, le cluster cesse de rendre le service : c’est ' +
          'ce qui évite le « split brain », deux moitiés qui se croient seules.</p>')
      ].join('\n')
    },
    {
      title: 'Active-passive et active-active',
      html: [
        '<p><strong>Active-passive</strong> : un ou plusieurs nœuds traitent les requêtes, les autres ' +
        'sont en veille, prêts à prendre le relais. Configuration simple, mais le nœud passif ne ' +
        'travaille pas et la bascule peut être perceptible.</p>',
        '<p><strong>Active-active</strong> : tous les nœuds sont actifs et partagent les tâches. ' +
        'Meilleure performance et forte tolérance aux pannes, mais la synchronisation est plus délicate.</p>',
        '<table><thead><tr><th>Type</th><th>Tous actifs ?</th><th>Performance</th><th>Complexité</th></tr></thead><tbody>',
        '<tr><td>Active-passive</td><td>Non</td><td>Limitée (nœud en veille)</td><td>Faible</td></tr>',
        '<tr><td>Active-active</td><td>Oui</td><td>Élevée (répartition)</td><td>Élevée</td></tr>',
        '</tbody></table>'
      ].join('\n')
    },
    {
      title: 'Load balancing et failover',
      html: [
        '<p><strong>Load balancing cluster</strong> : un répartiteur de charge distribue les requêtes ' +
        'entre plusieurs serveurs actifs. Idéal pour la performance et la mise à l’échelle horizontale. ' +
        'Limite : ce n’est pas un failover complet, et le répartiteur devient un point critique s’il ' +
        'n’est pas lui-même redondant.</p>',
        '<p><strong>Failover cluster</strong> : chaque nœud partage un <strong>même espace de ' +
        'stockage</strong> (SAN/NAS). Si un nœud échoue, un autre reprend les services avec le même état. ' +
        'Tolérance aux pannes élevée et cohérence des données, mais dépendance au stockage partagé.</p>',
        box('pitfall', 'Le répartiteur de charge, point critique', 'warning',
          '    <p>Un load balancer unique redevient le point unique de défaillance du service. Pour une ' +
          'vraie HA, il faut le redonder lui aussi.</p>')
      ].join('\n')
    },
    {
      title: 'Grid cluster et tableau récapitulatif',
      html: [
        '<p><strong>Grid cluster / compute cluster</strong> : utilisé pour le calcul intensif distribué. ' +
        'Plusieurs nœuds traitent en parallèle des calculs complexes (simulation météo, rendu 3D, ' +
        'intelligence artificielle). Cas d’usage : laboratoires, universités, industrie scientifique.</p>',
        '<table><thead><tr><th>Type</th><th>Tous actifs ?</th><th>Haute disponibilité</th><th>Usage</th></tr></thead><tbody>',
        '<tr><td>Active-Passive</td><td>Non</td><td>Oui</td><td>Applications critiques</td></tr>',
        '<tr><td>Active-Active</td><td>Oui</td><td>Oui</td><td>Performance et disponibilité</td></tr>',
        '<tr><td>Load Balancing</td><td>Oui</td><td>Oui si redondant</td><td>Sites web, APIs</td></tr>',
        '<tr><td>Failover</td><td>Non</td><td>Très haute</td><td>Bases de données</td></tr>',
        '<tr><td>Grid</td><td>Oui</td><td>Souvent non</td><td>Calculs complexes</td></tr>',
        '</tbody></table>',
        box('intuition', 'Un type par besoin', 'lightbulb',
          '    <p>Il n’y a pas de « meilleur » cluster : active-passive privilégie la simplicité, ' +
          'active-active la performance, failover la cohérence des données, grid la puissance de calcul. ' +
          'Le bon choix dépend du service à protéger.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que regroupe un cluster ?', opts: ['Plusieurs serveurs en un seul système', 'Des fichiers', 'Des utilisateurs'], correct: 0, exp: 'Les nœuds coopèrent comme un ensemble.' },
    { stem: 'Citez un bénéfice du clustering.', opts: ['Tolérance aux pannes', 'Compression', 'Chiffrement'], correct: 0, exp: 'HA, répartition de charge et tolérance aux pannes.' },
    { stem: 'Dans un cluster active-passive…', opts: ['Un nœud actif, d’autres en veille', 'Tous actifs', 'Aucun nœud actif'], correct: 0, exp: 'Le passif prend le relais en cas de panne.' },
    { stem: 'Inconvénient d’active-passive ?', opts: ['Sous-utilisation du nœud passif', 'Aucune tolérance', 'Trop rapide'], correct: 0, exp: 'Le nœud en veille ne travaille pas.' },
    { stem: 'Dans un cluster active-active…', opts: ['Tous les nœuds sont actifs', 'Un seul nœud travaille', 'Aucun nœud ne travaille'], correct: 0, exp: 'Les nœuds partagent les tâches.' },
    { stem: 'Que distribue un load balancer ?', opts: ['Les requêtes entre serveurs', 'Les sauvegardes', 'Les adresses MAC'], correct: 0, exp: 'Il équilibre la charge entre les serveurs actifs.' },
    { stem: 'Sur quoi repose un failover cluster ?', opts: ['Un stockage partagé', 'Un seul disque local', 'Aucun disque'], correct: 0, exp: 'Un autre nœud reprend les services avec le même état.' },
    { stem: 'À quoi sert un grid cluster ?', opts: ['Au calcul intensif distribué', 'À héberger un site vitrine', 'À sauvegarder'], correct: 0, exp: 'Plusieurs nœuds calculent en parallèle.' }
  ],

  pitfalls: [
    'Croire que répartir la charge protège aussi contre une panne : il faut un failover.',
    'Laisser le load balancer sans redondance.',
    'Configurer un failover cluster sans stockage partagé.',
    'Négliger le quorum : perdre la majorité arrête le cluster.',
    'Choisir active-active sans maîtriser la synchronisation.'
  ],

  methodTitle: 'Choisir un type de cluster',
  method: [
    '<strong>Définir</strong> le besoin : disponibilité, performance ou calcul.',
    '<strong>Choisir</strong> le type : active-passive, active-active, load balancing, failover ou grid.',
    '<strong>Sécuriser</strong> le quorum et le stockage partagé si nécessaire.',
    '<strong>Redonder</strong> les points critiques, comme le répartiteur de charge.',
    '<strong>Valider</strong> la bascule et la répartition en conditions réelles.'
  ],

  summary: [
    'Un cluster regroupe des nœuds en un seul système.',
    'Trois bénéfices : haute disponibilité, répartition de charge, tolérance aux pannes.',
    'Active-passive : simple, mais un nœud en veille.',
    'Active-active : performant, mais synchronisation complexe.',
    'Load balancing, failover (stockage partagé) et grid (calcul) complètent la panoplie.'
  ],

  checklist: [
    'Je définis le clustering et ses bénéfices.',
    'Je distingue les cinq types de clusters.',
    'J’explique le rôle du quorum.',
    'Je choisis un type adapté à un besoin.'
  ],

  notions: ['clustering', 'nœud', 'quorum', 'split brain', 'active-passive', 'active-active', 'load balancing', 'failover cluster', 'grid cluster', 'SAN', 'NAS', 'stockage partagé', 'tolérance aux pannes'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez les cinq types de clusters.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le tableau récapitulatif.' },
    { cls: 'good', text: '70–94 % — Solide : vous choisissez le bon type selon le besoin.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : enchaîne sur la maintenance, chapitre 4.' }
  ],

  flashcards: [
    { q: 'Que regroupe un cluster ?', a: 'Plusieurs serveurs (nœuds) agissant comme un seul système.' },
    { q: 'Trois bénéfices du clustering ?', a: 'Haute disponibilité, répartition de charge, tolérance aux pannes.' },
    { q: 'Active-passive ?', a: 'Un nœud actif, les autres en veille prêts à basculer.' },
    { q: 'Active-active ?', a: 'Tous les nœuds actifs, partageant les tâches.' },
    { q: 'Sur quoi repose un failover cluster ?', a: 'Un stockage partagé (SAN/NAS) commun aux nœuds.' },
    { q: 'À quoi sert un grid cluster ?', a: 'Au calcul intensif distribué (météo, rendu 3D, IA).' }
  ]
};
