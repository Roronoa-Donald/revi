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
        "title": "Prérequis intégré : Initiation à la syntaxe des cmdlets PowerShell pour les ateliers",
        "html": "<div class=\"box box--tech\"><div class=\"box__title\">Structure d’une commande PowerShell (Verbe-Nom, variables et entrées/sorties)</div><p>Dans les ateliers pratiques de ce cours, vos scripts d’automatisation Windows Server s’écrivent en <strong>PowerShell</strong> :</p><ul><li><strong>Syntaxe <code>Verbe-Nom</code> (Cmdlets) :</strong> chaque commande associe un verbe d’action standard (<code>Get-</code> pour lire, <code>New-</code> pour créer, <code>Set-</code> pour modifier, <code>Start-</code>/<code>Stop-</code>) à un nom au singulier (ex. <code>Get-Service -Name wuauserv</code>, <code>Get-VM</code>) ;</li><li><strong>Variables et calcul :</strong> toute variable commence par <code>$</code> (ex. <code>$seuil = [int][Console]::ReadLine()</code>) ;</li><li><strong>Affichage :</strong> <code>Write-Output \"Texte : $valeur\"</code> envoie la ligne de résultat attendue sur la sortie standard.</li></ul></div>"
      },
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
        box('tech', 'Perspective moderne — Windows Server 2022/2025 &amp; Règle 3-2-1-1-0', 'terminal',
          '    <p>Face aux cyberattaques modernes par rançongiciel (ransomware) qui tentent d’effacer ou de chiffrer les sauvegardes en premier lieu, la règle 3-2-1 a évolué vers la <strong>règle 3-2-1-1-0</strong> :</p>\n' +
          '    <ul>\n' +
          '      <li><strong>3</strong> copies des données critiques ;</li>\n' +
          '      <li><strong>2</strong> supports de stockage physiques distincts (ex. NAS + disque local) ;</li>\n' +
          '      <li><strong>1</strong> copie hors site (Cloud Azure / AWS ou centre distant) ;</li>\n' +
          '      <li><strong>1</strong> copie <strong>immuable ou déconnectée (air-gap)</strong>, protégée en écriture seule (WORM) ;</li>\n' +
          '      <li><strong>0</strong> erreur lors des vérifications automatisées de restauration.</li>\n' +
          '    </ul>\n' +
          '    <p>Sur Windows Server 2022 et 2025 comme sur 2012 R2, l’administration s’appuie sur l’outil natif <code>wbadmin.exe</code> et les cmdlets PowerShell dédiées (<code>Start-WBBackup</code>).</p>'),
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
    { cls: 'low', text: '&lt; 50 % — Reprenez la différence incrémentielle / différentielle.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur les tableaux comparatifs.' },
    { cls: 'good', text: '70–94 % — Solide : vous choisissez le bon type et la bonne restauration.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : passe à la haute disponibilité, chapitre 2.' }
  ],

  flashcards: [
      { q: 'Qu’est-ce que « stratégie 3-2-1 » ?', a: 'appliquer la stratégie 3-2-1 ;' },
      { q: 'Qu’est-ce que « basculement » ?', a: 'Failover (basculement) : transférer automatiquement l’activité d’un composant défaillant vers un composant redondant, sans intervention humaine.' },
      { q: 'Qu’est-ce que « monitoring » ?', a: 'Supervision (monitoring) : surveiller en temps réel l’état des ressources pour détecter les anomalies et déclencher le basculement.' },
      { q: 'Qu’est-ce que « quorum » ?', a: 'expliquer le rôle du quorum ;' },
      { q: 'Qu’est-ce que « split brain » ?', a: 'Dans un cluster, le quorum est la majorité des nœuds nécessaire pour décider qui fait quoi. Si le quorum est perdu, le cluster cesse de rendre le service : c’est ce qui évite le « split brain », deux moitiés qui se croient seules.' },
      { q: 'Qu’est-ce que « load balancing » ?', a: 'distinguer active-passive, active-active, load balancing, failover et grid ;' },
      { q: 'Qu’est-ce que « mises à jour » ?', a: 'Elle couvre : les mises à jour (Windows Update, pilotes, BIOS, firmware), la surveillance de l’état du système, la vérification des sauvegardes , le contrôle de la sécurité (comptes inactifs, groupes sensibles, pare-feu, antivirus) et la vérification du matériel (température, ven' },
      { q: 'Qu’est-ce que « Performance Monitor » ?', a: 'Performance Monitor, Disk Management' },
      { q: 'Qu’est-ce que « hyperviseur » ?', a: 'Plutôt que d’installer un serveur par machine, on exécute plusieurs machines virtuelles sur un même hôte. Comprendre l’hyperviseur, les réseaux virtuels et l’allocation de ressources est la base de toute infrastructure moderne.' },
      { q: 'Qu’est-ce que « bare-metal » ?', a: 'Le script lit le type de l’hyperviseur ( 1 ou 2 ), puis le nom du produit. Affichez produit : NOM (bare-metal) pour le type 1 et produit : NOM (heberge) pour le type 2.' },
      { q: 'Qu’est-ce que « VMware ESXi » ?', a: 'VMware ESXi : situer ESXi, vCenter et vSphere Client ;' },
      { q: 'Qu’est-ce que « instantané » ?', a: 'Un snapshot (instantané) capture l’état d’une VM à un instant donné : le contenu de la mémoire, l’état du processeur et l’état des disques virtuels. Il permet de revenir en arrière en cas de problème après un changement critique.' },
      { q: 'Qu’est-ce que « linked clone » ?', a: 'Clone lié (linked clone) : la nouvelle VM partage une partie de ses fichiers disque avec l’originale. Moins gourmand en espace, mais dépendant de la source : si elle est supprimée, le clone lié ne fonctionne plus.' },
      { q: 'Qu’est-ce que « template » ?', a: 'Avant une mise à jour risquée, on prend un snapshot ; pour déployer dix serveurs identiques, on clone ou on part d’un template ; pour équilibrer la charge, on migre une VM à chaud. Ces gestes du quotidien de l’administrateur ont chacun leurs règles.' },
    { q: 'Que copie une sauvegarde complète ?', a: 'L’intégralité des données, à chaque exécution.' },
    { q: 'Incrementielle : modifications depuis quoi ?', a: 'Depuis la dernière sauvegarde, complète ou incrémentielle.' },
    { q: 'Differentielle : modifications depuis quoi ?', a: 'Depuis la dernière sauvegarde complète.' },
    { q: 'Quelle restauration est la plus simple ?', a: 'La complète : un seul jeu à remettre.' },
    { q: 'Que signifie 3-2-1 ?', a: '3 copies des données, 2 supports différents, 1 copie hors site.' },
    { q: 'Différence PCA / PRA ?', a: 'PCA : continuité sans interruption ; PRA : reprise rapide après interruption.' }
  ]
};
