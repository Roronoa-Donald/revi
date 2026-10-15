/**
 * Chapitre 6 du cours « Windows Server » B2 — snapshots, clones et sauvegarde VM.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Snapshots, clones & templates',
  short: 'Snapshots & clones',
  toc: 'Snapshots, clones complet/lié, templates, vMotion, cluster HA et sauvegarde Veeam.',
  time: '≈ 2 h 30 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Avant une mise à jour risquée, on prend un snapshot ; pour déployer dix serveurs identiques, on ' +
    'clone ou on part d’un template ; pour équilibrer la charge, on migre une VM à chaud. Ces gestes ' +
    'du quotidien de l’administrateur ont chacun leurs règles.',

  objectives: [
    'définir un snapshot et le distinguer d’une sauvegarde ;',
    'comparer clone complet et clone lié ;',
    'expliquer l’usage d’un template ;',
    'situer vMotion, le cluster HA et la sauvegarde Veeam.'
  ],

  sections: [
    {
      title: 'Le snapshot',
      html: [
        '<p>Un <strong>snapshot</strong> (instantané) capture l’état d’une VM à un instant donné : le ' +
        'contenu de la mémoire, l’état du processeur et l’état des disques virtuels. Il permet de ' +
        '<strong>revenir en arrière</strong> en cas de problème après un changement critique.</p>',
        '<p>Deux précautions : les snapshots <strong>consomment de l’espace disque</strong> au fil du ' +
        'temps, et il ne faut <strong>pas les conserver longtemps</strong> en production.</p>',
        '<table><thead><tr><th>Critère</th><th>Snapshot</th><th>Sauvegarde</th></tr></thead><tbody>',
        '<tr><td>Conservation</td><td>Temporaire (court terme)</td><td>Long terme</td></tr>',
        '<tr><td>Utilité</td><td>Revenir avant/après un changement</td><td>Restaurer après une perte</td></tr>',
        '<tr><td>Espace disque</td><td>Consomme de plus en plus</td><td>Planifié</td></tr>',
        '</tbody></table>',
        box('pitfall', 'Snapshot n’est pas sauvegarde', 'warning',
          '    <p>Un snapshot vit sur le même stockage que la VM : si le stockage disparaît, le ' +
          'snapshot aussi. Il ne remplace jamais une sauvegarde hors site.</p>')
      ].join('\n')
    },
    {
      title: 'Clones complet et lié',
      html: [
        '<p>Un <strong>clone</strong> est une copie d’une VM existante. Deux variantes :</p>',
        '<ul>',
        '  <li><strong>Clone complet</strong> : copie indépendante (fichiers disque et configuration). ' +
        'Il fonctionne même si la VM d’origine est supprimée.</li>',
        '  <li><strong>Clone lié</strong> (linked clone) : la nouvelle VM partage une partie de ses ' +
        'fichiers disque avec l’originale. Moins gourmand en espace, mais <strong>dépendant de la ' +
        'source</strong> : si elle est supprimée, le clone lié ne fonctionne plus.</li>',
        '</ul>',
        '<table><thead><tr><th>Critère</th><th>Clone complet</th><th>Clone lié</th></tr></thead><tbody>',
        '<tr><td>Indépendance</td><td>Totale</td><td>Dépend de la source</td></tr>',
        '<tr><td>Espace disque</td><td>Plus volumineux</td><td>Moins gourmand</td></tr>',
        '<tr><td>Si la source est supprimée</td><td>Continue de fonctionner</td><td>Ne fonctionne plus</td></tr>',
        '</tbody></table>'
      ].join('\n')
    },
    {
      title: 'Templates et vMotion',
      html: [
        '<p>Un <strong>template</strong> est une VM préconfigurée et souvent figée en lecture seule : ' +
        'système installé, outils de base, paramètres réseau et sécurité prédéfinis. Il sert de ' +
        '<strong>modèle</strong> pour créer de nouvelles VM, ce qui standardise les déploiements, fait ' +
        'gagner du temps et garantit la cohérence.</p>',
        '<p><strong>vMotion</strong> migre une VM <strong>en cours d’exécution</strong> d’un hôte ' +
        'physique vers un autre, <strong>sans interruption de service</strong>. Exemple : une VM ' +
        'devenue lente parce que d’autres VM surchargent son hôte est déplacée vers un hôte moins ' +
        'sollicité ; les performances reviennent.</p>',
        box('tech', 'Un template, des déploiements', 'layers',
          '    <p>Un template bien tenu contient les mises à jour et les bases de sécurité à jour. ' +
          'Chaque VM créée en hérite : le déploiement devient reproductible plutôt qu’artisanal.</p>')
      ].join('\n')
    },
    {
      title: 'Cluster HA et sauvegarde Veeam',
      html: [
        '<p>La fonctionnalité essentielle pour la haute disponibilité des VM est le <strong>cluster de ' +
        'virtualisation</strong>. Avec un <strong>cluster HA</strong>, les VM redémarrent ' +
        'automatiquement sur un autre hôte disponible en cas de panne, ce qui minimise l’impact des ' +
        'défaillances matérielles.</p>',
        '<p><strong>Veeam</strong> est un outil de <strong>sauvegarde automatique</strong> des VM. Il ' +
        'configure des sauvegardes quotidiennes et permet de restaurer rapidement une VM supprimée par ' +
        'erreur.</p>',
        '<p>Bonnes pratiques : documenter chaque action, surveiller les performances avec vCenter, ' +
        'prendre un snapshot avant chaque mise à jour majeure, configurer des sauvegardes automatiques ' +
        'et activer la HA.</p>',
        box('intuition', 'Plusieurs filets, pas un seul', 'lightbulb',
          '    <p>Snapshot pour un retour immédiat, sauvegarde Veeam pour la perte durable, cluster HA ' +
          'pour la panne matérielle : trois protections pour trois menaces différentes. En cumuler ' +
          'plusieurs, c’est couvrir tous les scénarios.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que capture un snapshot ?', opts: ['Mémoire, processeur et disques virtuels', 'Seulement les fichiers', 'Le réseau'], correct: 0, exp: 'Il enregistre l’état complet de la VM à un instant donné.' },
    { stem: 'Durée de conservation d’un snapshot ?', opts: ['Temporaire', 'Long terme', 'Permanente'], correct: 0, exp: 'Il ne doit pas rester longtemps en production.' },
    { stem: 'Que fait un clone complet ?', opts: ['Copie indépendante de la VM', 'Partage les disques', 'Supprime la source'], correct: 0, exp: 'Il fonctionne même si la source est supprimée.' },
    { stem: 'Faiblesse d’un clone lié ?', opts: ['Il dépend de la VM source', 'Il est trop gros', 'Il est trop lent'], correct: 0, exp: 'Si la source est supprimée, il cesse de fonctionner.' },
    { stem: 'À quoi sert un template ?', opts: ['Standardiser les déploiements', 'Sauvegarder les données', 'Migrer à chaud'], correct: 0, exp: 'C’est un modèle de VM préconfigurée.' },
    { stem: 'Que fait vMotion ?', opts: ['Migrer une VM à chaud sans interruption', 'Éteindre un hôte', 'Cloner un template'], correct: 0, exp: 'La VM change d’hôte en cours d’exécution.' },
    { stem: 'En cas de panne, que fait un cluster HA ?', opts: ['Redémarre les VM sur un autre hôte', 'Efface les snapshots', 'Réinstalle ESXi'], correct: 0, exp: 'Les VM redémarrent automatiquement ailleurs.' },
    { stem: 'Que permet Veeam ?', opts: ['Sauvegarde automatique et restauration rapide', 'Compiler du code', 'Créer des réseaux'], correct: 0, exp: 'Il sauvegarde les VM et restaure rapidement.' }
  ],

  pitfalls: [
    'Confondre snapshot et sauvegarde : le snapshot ne protège pas d’une perte du stockage.',
    'Conserver des snapshots pendant des semaines en production.',
    'Supprimer la VM source d’un clone lié, qui cesse alors de fonctionner.',
    'Se servir d’un template obsolète, sans les mises à jour de sécurité.',
    'Compter sur un cluster HA sans surveiller les hôtes.'
  ],

  methodTitle: 'Protéger et déployer des VM',
  method: [
    '<strong>Prendre</strong> un snapshot avant tout changement critique, puis le purger.',
    '<strong>Distinguer</strong> snapshot (court terme) et sauvegarde (long terme).',
    '<strong>Cloner</strong> ou déployer depuis un template selon le besoin.',
    '<strong>Migrer</strong> à chaud avec vMotion pour équilibrer la charge.',
    '<strong>Protéger</strong> par le cluster HA et la sauvegarde automatique Veeam.'
  ],

  summary: [
    'Snapshot : mémoire + CPU + disques, temporaire, ne remplace pas une sauvegarde.',
    'Clone complet : indépendant ; clone lié : dépendant de la source.',
    'Template : VM préconfigurée qui standardise les déploiements.',
    'vMotion : migration à chaud sans interruption.',
    'Cluster HA et Veeam : redémarrage automatique et sauvegarde des VM.'
  ],

  checklist: [
    'Je distingue snapshot et sauvegarde.',
    'Je compare clone complet et clone lié.',
    'J’explique l’intérêt d’un template.',
    'Je situe vMotion, cluster HA et Veeam.'
  ],

  notions: ['snapshot', 'instantané', 'clone complet', 'clone lié', 'linked clone', 'template', 'vMotion', 'cluster HA', 'Veeam', 'restauration', 'bonnes pratiques'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends la différence snapshot / sauvegarde.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les clones complet / lié.' },
    { cls: 'good', text: '70–89 % — Solide : tu protèges et déploies des VM correctement.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est bouclé, place aux examens blancs.' }
  ],

  flashcards: [
    { q: 'Que capture un snapshot ?', a: 'La mémoire, l’état du processeur et les disques virtuels.' },
    { q: 'Snapshot vs sauvegarde ?', a: 'Snapshot : court terme ; sauvegarde : long terme.' },
    { q: 'Clone complet ?', a: 'Copie indépendante, fonctionne même si la source est supprimée.' },
    { q: 'Clone lié ?', a: 'Partage des disques avec la source : moins d’espace mais dépendant.' },
    { q: 'À quoi sert vMotion ?', a: 'Migrer une VM en cours d’exécution sans interruption.' },
    { q: 'Que protège un cluster HA ?', a: 'Il redémarre automatiquement les VM sur un autre hôte.' }
  ]
};
