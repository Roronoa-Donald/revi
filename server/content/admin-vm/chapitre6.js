/**
 * Chapitre 6 du cours « Admin VM » B2 — administration avancée.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Administration avancée',
  short: 'Admin avancée',
  toc: 'Réservations, limites et shares, cluster HA, migration, sauvegarde avancée, monitoring et sécurité.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Quand plusieurs VM cohabitent sur un cluster, la question n’est plus « ça marche ? » mais « qui ' +
    'passe d’abord, et que se passe-t-il si un nœud tombe ? ». L’administration avancée arbitre les ' +
    'ressources et garantit la continuité.',

  objectives: [
    'réguler les ressources avec réservations, limites et shares ;',
    'expliquer cluster, quorum, fencing et failover ;',
    'décrire la migration et ses dépendances ;',
    'situer sauvegarde avancée, monitoring et durcissement.'
  ],

  sections: [
    {
      title: 'Gestion avancée des ressources',
      html: [
        '<ul>',
        '  <li><strong>Réservations</strong> : minimum garanti pour une VM critique.</li>',
        '  <li><strong>Limites</strong> : plafonner CPU et RAM d’une VM.</li>',
        '  <li><strong>Shares</strong> : priorité relative entre VM en cas de contention.</li>',
        '</ul>',
        '<p>Exemple : un serveur de bases de données reçoit une réservation de RAM plus élevée, pour ' +
        'être servi en priorité quand l’hôte est sous pression.</p>',
        box('tech', 'Garantir plutôt que promettre', 'scale',
          '    <p>Une réservation s’oppose à la surallocation : elle réserve vraiment une part de ' +
          'ressource. C’est le bon outil pour les services critiques, à condition d’en réserver peu ' +
          'et bien.</p>')
      ].join('\n')
    },
    {
      title: 'Cluster, quorum, fencing et failover',
      html: [
        '<p>Un <strong>cluster</strong> relie plusieurs hyperviseurs pour assurer la continuité :</p>',
        '<ul>',
        '  <li><strong>Quorum</strong> : garantit la prise de décision (majorité des nœuds).</li>',
        '  <li><strong>Fencing</strong> : isole un nœud instable pour éviter le « split brain ».</li>',
        '  <li><strong>Failover</strong> : redémarre les VM sur un autre nœud.</li>',
        '</ul>',
        '<p>La redondance réduit le risque d’arrêt : en cas de panne d’un nœud, ses VM reprennent ' +
        'ailleurs selon les règles HA configurées.</p>'
      ].join('\n')
    },
    {
      title: 'Migration',
      html: [
        '<p>La <strong>migration</strong> déplace une VM d’un nœud à un autre. Elle illustre le lien ' +
        'entre réseau, stockage et RAM :</p>',
        '<ul>',
        '  <li><strong>Stockage partagé</strong> : facilite la mobilité.</li>',
        '  <li><strong>Réseau</strong> : conditionne la durée du transfert.</li>',
        '  <li><strong>Charge</strong> : impacte la stabilité de l’opération.</li>',
        '</ul>',
        '<p>Plus les dépendances sont fortes, plus la migration est délicate. Une migration à chaud ' +
        'réussit quand les ressources sont correctement dimensionnées.</p>'
      ].join('\n')
    },
    {
      title: 'Sauvegarde avancée, monitoring et sécurité',
      html: [
        '<p>La sauvegarde avancée ajoute : <strong>déduplication</strong> (réduction d’espace), ' +
        '<strong>chiffrement</strong> (protection des sauvegardes) et <strong>restauration ' +
        'granulaire</strong> (un fichier ou une VM entière).</p>',
        '<p>Le <strong>monitoring</strong> suit des métriques (CPU, RAM, I/O, latence), des seuils ' +
        'd’alerte et la gouvernance des usages.</p>',
        '<p>Le durcissement consiste à désactiver l’accès root en SSH si possible, activer le pare-feu ' +
        'au niveau Datacenter, séparer les comptes, auditer les logs et planifier les mises à jour ' +
        'avec un snapshot préalable. Un hyperviseur non patché expose <strong>toutes</strong> ses VM.</p>',
        box('intuition', 'La sécurité d’un hôte vaut celle de ses VM', 'lightbulb',
          '    <p>Compromettre l’hyperviseur, c’est accéder à toutes ses machines. C’est pourquoi le ' +
          'durcissement et les mises à jour de l’hôte sont prioritaires : ils protègent l’ensemble de ' +
          'la plateforme.</p>')
      ].join('\n')
    },
      {
        "title": "Continuité de Service : Migration à Chaud (VMware vMotion) & Haute Disponibilité (vSphere HA)",
        "html": "<div class=\"box box--tech\"><div class=\"box__title\">vMotion et haute disponibilité</div><p>Dans un cluster d’hyperviseurs, deux mécanismes contribuent à la continuité, sous réserve d’une configuration et de ressources adaptées :</p><ul><li><strong>VMware vMotion :</strong> déplace une VM en cours d’exécution vers un autre hôte en cherchant à minimiser l’interruption. Une partie de la mémoire est copiée pendant l’exécution, puis une <strong>pause de bascule</strong> est nécessaire. Sa durée et son impact dépendent de la charge, du réseau et des applications ; des applications sensibles peuvent être perturbées.</li><li><strong>Haute disponibilité vSphere HA :</strong> surveille les hôtes et peut redémarrer leurs VM sur des hôtes sains après une panne. Un redémarrage n’est pas une continuité sans interruption.</li></ul><p>Source : <a href=\"https://knowledge.broadcom.com/external/article/407273/sensitive-virtual-machines-become-impact.html\">impact de la pause vMotion sur les applications sensibles</a>, consulté le 30 octobre 2026.</p></div>"
      }
  ],

  questions: [
    { stem: 'Que garantit une réservation ?', opts: ['Un minimum de ressource', 'Un maximum', 'Une priorité'], correct: 0, exp: 'Elle réserve une part de CPU ou de RAM.' },
    { stem: 'Que fait une limite ?', opts: ['Plafonne une ressource', 'Réserve un minimum', 'Priorise'], correct: 0, exp: 'Elle empêche une VM de consommer au-delà.' },
    { stem: 'À quoi servent les shares ?', opts: ['Priorité relative entre VM', 'Chiffrer', 'Segmenter'], correct: 0, exp: 'Elles départagent la contention.' },
    { stem: 'Que garantit le quorum ?', opts: ['La prise de décision', 'Le chiffrement', 'La migration'], correct: 0, exp: 'La majorité des nœuds décide.' },
    { stem: 'Que fait le fencing ?', opts: ['Isole un nœud instable', 'Sauvegarde les VM', 'Monitore'], correct: 0, exp: 'Il évite le split brain.' },
    { stem: 'Que facilite le stockage partagé ?', opts: ['La migration', 'Le chiffrement', 'Le NAT'], correct: 0, exp: 'Il rend la VM mobile entre nœuds.' },
    { stem: 'Que réduit la déduplication ?', opts: ['L’espace de sauvegarde', 'La latence', 'Les VLAN'], correct: 0, exp: 'Elle élimine les données redondantes.' },
    { stem: 'Que protège une sauvegarde chiffrée ?', opts: ['Les données sauvegardées', 'Le réseau', 'Les vCPU'], correct: 0, exp: 'Le chiffrement protège la sauvegarde elle-même.' }
  ],

  pitfalls: [
    'Réserver trop de ressources et freiner la densité.',
    'Oublier le quorum : un cluster peut se diviser (split brain).',
    'Migrer sans stockage partagé ni réseau adapté.',
    'Négliger le durcissement de l’hyperviseur.',
    'Sauvegarder sans chiffrer ni tester la restauration.'
  ],

  methodTitle: 'Administrer un cluster de VM',
  method: [
    '<strong>Réguler</strong> les ressources : réservations, limites, shares.',
    '<strong>Configurer</strong> le cluster (quorum, fencing, HA).',
    '<strong>Planifier</strong> les migrations selon stockage, réseau et charge.',
    '<strong>Sauvegarder</strong> avec déduplication, chiffrement et restauration granulaire.',
    '<strong>Surveiller</strong> et <strong>durcir</strong> l’hyperviseur.'
  ],

  summary: [
    'Réservations (minimum), limites (plafond), shares (priorité).',
    'Cluster : quorum (décision), fencing (isolement), failover (redémarrage).',
    'Migration dépend du stockage partagé, du réseau et de la charge.',
    'Sauvegarde avancée : déduplication, chiffrement, restauration granulaire.',
    'Monitoring et durcissement protègent toutes les VM.'
  ],

  checklist: [
    'Je régule les ressources (réservation/limite/share).',
    'J’explique quorum, fencing et failover.',
    'Je décris la migration et ses dépendances.',
    'Je situe sauvegarde avancée, monitoring et durcissement.'
  ],

  notions: ['réservation', 'limite', 'shares', 'cluster', 'quorum', 'fencing', 'failover', 'migration', 'stockage partagé', 'déduplication', 'chiffrement', 'restauration granulaire', 'monitoring', 'durcissement'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez réservations, limites et shares.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur cluster et migration.' },
    { cls: 'good', text: '70–94 % — Solide : vous administrez un cluster sereinement.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est bouclé, place aux examens blancs.' }
  ],

  flashcards: [
    { q: 'Réservation vs limite ?', a: 'Réservation : minimum garanti ; limite : plafond.' },
    { q: 'À quoi servent les shares ?', a: 'Priorité relative entre VM sous contention.' },
    { q: 'Rôle du quorum ?', a: 'Garantir la prise de décision (majorité des nœuds).' },
    { q: 'Que fait le fencing ?', a: 'Isoler un nœud instable pour éviter le split brain.' },
    { q: 'De quoi dépend une migration ?', a: 'Stockage partagé, réseau et charge.' },
    { q: 'Trois apports de la sauvegarde avancée ?', a: 'Déduplication, chiffrement, restauration granulaire.' }
  ]
};
