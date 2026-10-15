/**
 * Chapitre 1 du cours « Windows Server » B2 — sauvegarde des données.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Sauvegarde des données',
  short: 'Sauvegarde',
  toc: 'Types de sauvegarde, comparaison, stratégie 3-2-1, étapes d’un plan, PCA et PRA.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Une erreur humaine, un disque qui lâche, un rançongiciel : la perte de données n’est pas une ' +
    'hypothèse, c’est une question de temps. La sauvegarde est le filet de sécurité de l’infrastructure — ' +
    'à condition de choisir le bon type et de tester la restauration.',

  objectives: [
    'distinguer sauvegarde complète, incrémentielle et différentielle ;',
    'comparer vitesse, espace disque et difficulté de restauration ;',
    'appliquer la stratégie 3-2-1 ;',
    'situer le PCA et le PRA et leurs objectifs respectifs.'
  ],

  sections: [
    {
      title: 'À quoi sert une sauvegarde',
      html: [
        '<p>La sauvegarde regroupe l’infrastructure, les technologies et les processus qui <strong>copient ' +
        'les données</strong> d’une organisation afin de pouvoir les restaurer en cas de défaillance. Elle ' +
        's’accompagne d’un plan de reprise après sinistre et d’une stratégie adaptée.</p>',
        '<p>Elle protège contre les erreurs humaines, les pannes matérielles, les virus, les coupures de ' +
        'courant et les sinistres. Une restauration rapide évite des heures d’arrêt et des pertes ' +
        'irréversibles.</p>',
        box('tech', 'Sauvegarder n’est pas archiver', 'database',
          '    <p>Une sauvegarde sert à <em>restaurer</em> après un incident ; une archive sert à ' +
          '<em>conserver</em> une version pour des raisons légales ou historiques. Confondre les deux ' +
          'mène à des stratégies incohérentes.</p>')
      ].join('\n')
    },
    {
      title: 'Les trois types de sauvegarde',
      html: [
        '<p>Il existe une grande variété de sauvegardes, mais trois types structurent presque toutes les ' +
        'stratégies :</p>',
        '<ul>',
        '  <li><strong>Complète</strong> : on copie l’ensemble des données (fichiers, dossiers, images ' +
        'système). Une seule sauvegarde suffit pour tout restaurer.</li>',
        '  <li><strong>Incrémentielle</strong> : après une complète, on ne copie que les modifications ' +
        'depuis la <strong>dernière sauvegarde</strong>, quelle qu’elle soit.</li>',
        '  <li><strong>Différentielle</strong> : après une complète, on copie toutes les modifications ' +
        'depuis la <strong>dernière complète</strong>.</li>',
        '</ul>',
        box('pitfall', 'Le piège de la restauration incrémentielle', 'warning',
          '    <p>Une incrémentielle est rapide et légère, mais pour restaurer il faut la complète ' +
          '<strong>et toute la chaîne</strong> des incrémentielles. Une seule manquante et la ' +
          'restauration échoue : c’est sa faiblesse.</p>')
      ].join('\n')
    },
    {
      title: 'Comparer les trois types',
      html: [
        '<p>Le choix dépend de l’arbitrage entre <strong>temps de sauvegarde</strong>, <strong>espace ' +
        'consommé</strong> et <strong>sévérité de la restauration</strong>.</p>',
        '<table><thead><tr><th>Critère</th><th>Complète</th><th>Incrémentielle</th><th>Différentielle</th></tr></thead><tbody>',
        '<tr><td>Données copiées</td><td>Tout, à chaque fois</td><td>Depuis la dernière sauvegarde</td><td>Depuis la dernière complète</td></tr>',
        '<tr><td>Vitesse</td><td>Lente</td><td>Très rapide</td><td>Intermédiaire</td></tr>',
        '<tr><td>Espace disque</td><td>Beaucoup</td><td>Peu</td><td>Moyen (grossit chaque jour)</td></tr>',
        '<tr><td>Restauration</td><td>Simple (1 jeu)</td><td>Complexe (toute la chaîne)</td><td>Facile (complète + dernière diff.)</td></tr>',
        '</tbody></table>',
        '<p>La sauvegarde complète est simple et sûre mais lourde ; l’incrémentielle est légère mais ' +
        'fragile ; la différentielle offre un compromis apprécié en production.</p>'
      ].join('\n')
    },
    {
      title: 'Stratégie 3-2-1, PCA et PRA',
      html: [
        '<p>La <strong>stratégie 3-2-1</strong> répartit les copies pour résister à tout type de ' +
        'sinistre : <strong>3</strong> copies des données, sur <strong>2</strong> supports différents, ' +
        'dont <strong>1</strong> hors site.</p>',
        '<p>Un plan efficace suit quatre étapes : déterminer l’importance des données, décider fréquence ' +
        'et régulation, déployer les sauvegardes, puis <strong>tester la restauration</strong>. Une ' +
        'stratégie jamais testée est une stratégie supposée.</p>',
        '<p>Deux plans complètent la sauvegarde : le <strong>PCA</strong> (Plan de Continuité d’Activité) ' +
        'vise à ce que le service ne s’arrête jamais ; le <strong>PRA</strong> (Plan de Reprise ' +
        'd’Activité) prépare la remise en service la plus rapide possible après une interruption.</p>',
        box('intuition', 'Tester vaut mieux que supposer', 'lightbulb',
          '    <p>Une simulation de restauration révèle les maillons faibles : média illisible, étape ' +
          'manquante, mot de passe perdu. Mieux vaut le découvrir un mardi calme que le jour du ' +
          'sinistre.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quelle sauvegarde copie l’ensemble des données ?', opts: ['Complète', 'Incrementielle', 'Differentielle'], correct: 0, exp: 'La complète copie tout, à chaque fois.' },
    { stem: 'Une incrementalielle copie les modifications depuis…', opts: ['La dernière sauvegarde', 'La dernière complète', 'Le début du mois'], correct: 0, exp: 'Elle repart de la sauvegarde précédente, quelle qu’elle soit.' },
    { stem: 'Une differentielle copie les modifications depuis…', opts: ['La dernière complète', 'La dernière sauvegarde', 'La veille'], correct: 0, exp: 'Elle s’appuie toujours sur la complète de référence.' },
    { stem: 'Quelle sauvegarde est la plus rapide ?', opts: ['Incrementielle', 'Complete', 'Differentielle'], correct: 0, exp: 'Peu de données ont changé : elle dure une fraction du temps.' },
    { stem: 'Quelle restauration est la plus simple ?', opts: ['Complete', 'Incrementielle', 'Differentielle'], correct: 0, exp: 'Un seul jeu de données à remettre.' },
    { stem: 'Que signifie la stratégie 3-2-1 ?', opts: ['3 copies, 2 supports, 1 hors site', '3, 2 et 1 jours', '3 serveurs'], correct: 0, exp: 'Trois copies, sur deux types de supports, dont une hors site.' },
    { stem: 'Quel plan vise la continuité sans arrêt ?', opts: ['PCA', 'PRA', 'SLA'], correct: 0, exp: 'Le PCA cherche à ne jamais interrompre le service.' },
    { stem: 'Que faut-il impérativement tester ?', opts: ['La restauration', 'La couleur des icônes', 'Le nom du serveur'], correct: 0, exp: 'Une stratégie non testée peut échouer au pire moment.' }
  ],

  pitfalls: [
    'Confondre différentielle (depuis la complète) et incrémentielle (depuis la dernière sauvegarde).',
    'Oublier un maillon de la chaîne incrémentielle et rendre la restauration impossible.',
    'Ne jamais tester la restauration.',
    'Négliger la copie hors site prévue par la stratégie 3-2-1.',
    'Considérer qu’une sauvegarde complète quotidienne est toujours la meilleure option, sans tenir compte du temps.'
  ],

  methodTitle: 'Choisir et vérifier une sauvegarde',
  method: [
    '<strong>Classer</strong> les données par criticité et disponibilité attendue.',
    '<strong>Choisir</strong> le type : complète, incrémentielle ou différentielle.',
    '<strong>Planifier</strong> la fréquence et réguler la qualité.',
    '<strong>Déployer</strong> puis appliquer la règle 3-2-1.',
    '<strong>Tester</strong> la restauration avant de déclarer la stratégie fiable.'
  ],

  summary: [
    'Trois types : complète (tout), incrémentielle (depuis la dernière), différentielle (depuis la complète).',
    'Complète : restauration simple mais lente et volumineuse.',
    'Incrementielle : rapide et légère mais restauration en chaîne.',
    'Differentielle : intermédiaire, restauration = complète + dernière différentielle.',
    'Stratégie 3-2-1, quatre étapes, PCA (continuité) et PRA (reprise).'
  ],

  checklist: [
    'Je distingue les trois types sans hésiter.',
    'Je sais expliquer la restauration de chacun.',
    'J’applique la stratégie 3-2-1.',
    'Je prévois toujours un test de restauration.'
  ],

  notions: ['sauvegarde', 'complète', 'incrémentielle', 'différentielle', 'stratégie 3-2-1', 'PCA', 'PRA', 'restauration', 'hors site', 'fréquence', 'régulation'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprends la différence incrémentielle / différentielle.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les tableaux comparatifs.' },
    { cls: 'good', text: '70–89 % — Solide : tu choisis le bon type et la bonne restauration.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe à la haute disponibilité, chapitre 2.' }
  ],

  flashcards: [
    { q: 'Que copie une sauvegarde complète ?', a: 'L’intégralité des données, à chaque exécution.' },
    { q: 'Incrementielle : modifications depuis quoi ?', a: 'Depuis la dernière sauvegarde, complète ou incrémentielle.' },
    { q: 'Differentielle : modifications depuis quoi ?', a: 'Depuis la dernière sauvegarde complète.' },
    { q: 'Quelle restauration est la plus simple ?', a: 'La complète : un seul jeu à remettre.' },
    { q: 'Que signifie 3-2-1 ?', a: '3 copies des données, 2 supports différents, 1 copie hors site.' },
    { q: 'Différence PCA / PRA ?', a: 'PCA : continuité sans interruption ; PRA : reprise rapide après interruption.' }
  ]
};
