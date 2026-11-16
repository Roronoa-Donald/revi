/**
 * Chapitre 4 du cours « DevOps B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Déploiement Continu (CD), Stratégies de Release &amp; Feature Flags',
  short: 'Déploiement Continu &amp; Releases',
  toc: 'Continuous Delivery vs Continuous Deployment, déploiements sans interruption (Rolling, Blue/Green, Canary) et découplage par Feature Flags.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Déployer une application en production le vendredi soir en coupant le service pendant deux heures pour « maintenance planifiée » appartient au passé de l’informatique d’entreprise. Dans une économie numérique mondialisée fonctionnant 24h/24, toute indisponibilité programmée entraîne des pertes directes de chiffre d’affaires et dégrade la réputation de l’organisation. Les équipes DevOps modernes doivent réaliser des mises en production continues en plein milieu de journée sans aucune interruption perceptible pour les utilisateurs (Zero-Downtime Deployment). Pour parvenir à ce niveau d’excellence, l’ingénieur B3 doit concevoir des stratégies de release avancées (Blue/Green, Canary progressive) avec coupe-circuit automatisé, et maîtriser le découplage entre le déploiement technique de code et la publication métier par le biais de Feature Flags.',
  objectives: [
    'distinguer avec rigueur la Livraison Continue (Continuous Delivery) du Déploiement Continu (Continuous Deployment) ;',
    'concevoir une architecture de déploiement sans interruption (Zero Downtime) via Rolling Updates ;',
    'implémenter la stratégie Blue/Green et piloter la bascule instantanée de routeur réseau et le retour arrière (Rollback) ;',
    'paramétrer une Canary Release progressive avec monitoring d’erreurs HTTP 5xx et coupe-circuit automatisé ;',
    'découpler le déploiement de code de l’activation métier via des Feature Flags (Toggles) ;',
    'analyser et résoudre méthodologiquement des simulateurs de bascule Blue/Green, de routage Canary et d’évaluation de Feature Flags.'
  ],
  sections: [
    {
      title: 'Continuous Delivery vs Continuous Deployment : La Frontière Décisionnelle',
      html: [
        '<p>Bien que regroupés sous l’acronyme commun <strong>CD</strong>, la Livraison Continue et le Déploiement Continu désignent deux niveaux d’automatisation distincts de la chaîne logicielle :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Livraison Continue (Continuous Delivery)</h4>',
        '    <p>Chaque modification franchissant avec succès le pipeline de CI produit un artéfact (image Docker, binaire) <strong>rigoureusement qualifié et prêt pour la production</strong>. Cependant, la mise en production finale requiert une <em>décision humaine explicite</em> (clic sur un bouton par le Release Manager ou approbation managériale).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Déploiement Continu (Continuous Deployment)</h4>',
        '    <p>L’automatisation est intégrale : chaque commit validé par la suite de tests et les scanners de sécurité est <strong>automatiquement déployé en production</strong> sans aucune intervention humaine. C’est le modèle adopté par des géants comme Netflix, Amazon ou Spotify (des milliers de déploiements quotidiens).</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Stratégies de Déploiement Sans Interruption (Zero-Downtime)',
      html: [
        '<p>Pour renouveler un parc de serveurs ou de pods sans impacter les utilisateurs en session, trois architectures de référence coexistent :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th style="width:20%">Stratégie</th>',
        '      <th style="width:40%">Fonctionnement technique</th>',
        '      <th style="width:40%">Avantages &amp; Contraintes</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>Rolling Update (Progressif)</strong></td>',
        '      <td>Remplacement séquentiel des instances anciennes par les nouvelles instances une par une (ou par petits lots <code>maxSurge</code> / <code>maxUnavailable</code>).</td>',
        '      <td>Ne nécessite aucune surcapacité matérielle majeure. En revanche, les versions N et N+1 cohabitent temporairement en direct.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Blue/Green (Miroir)</strong></td>',
        '      <td>Deux environnements de production identiques : l’un est actif (Blue), l’autre reçoit la nouvelle version (Green). Une fois les tests de fumée validés sur Green, le routeur/équilibreur bascule 100% du trafic.</td>',
        '      <td>Bascule instantanée et rollback immédiat en re-routant vers Blue. En contrepartie, double le coût d’infrastructure le temps du déploiement.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>Canary Release (Canari)</strong></td>',
        '      <td>Acheminement d’une fraction infime du trafic réel (ex. 2% ou 5%) vers la version canari. Si les métriques télémétriques (taux d’erreur, latence) restent stables, la part de trafic est augmentée progressivement (25%, 50%, 100%).</td>',
        '      <td>Détection immédiate des régressions sur trafic réel sans compromettre l’ensemble des utilisateurs. Nécessite un outillage de routage fin (Service Mesh, Ingress).</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',
        box('warning', 'Le Piège des Schémas de Base de Données', [
          '<p>Le déploiement sans interruption impose la règle de <strong>compatibilité bidirectionnelle de la base de données</strong> : la base de données doit supporter simultanément l’ancienne version (N) et la nouvelle version (N+1). On applique le patron <em>Expand and Contract (Parallel Run)</em> : ajouter d’abord la nouvelle colonne sans supprimer l’ancienne, déployer le code qui écrit dans les deux, migrer les données, et seulement plus tard supprimer l’ancienne colonne.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Feature Flags (Toggles) : Découpler Déploiement et Publication',
      html: [
        '<p>L’un des axiomes les plus puissants du DevOps moderne affirme : <strong>« Deploy ≠ Release » (Déployer n’est pas Publier)</strong>.</p>',
        '<ul>',
        '  <li><strong>Le Déploiement (Deploy) :</strong> Est une opération purement technique d’acheminement de code sur les serveurs de production.</li>',
        '  <li><strong>La Publication (Release) :</strong> Est une décision métier rendant une fonctionnalité visible et exploitable par les utilisateurs ciblés.</li>',
        '</ul>',
        '<p>Les <strong>Feature Flags (ou basculeurs de fonctionnalités)</strong> insèrent des embranchements conditionnels dynamiques dans le code source contrôlés à chaud via une interface de pilotage centralisée (LaunchDarkly, Unleash, Flagsmith) sans recompiler ni re-déployer :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Release Flags (Gradual Rollout)</h4>',
        '    <p>Activation d’une nouvelle fonctionnalité pour 5% des utilisateurs, puis 20%, puis 100%, avec analyse en temps réel de l’impact sur les performances et les ventes.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Targeting Flags (Ciblage)</h4>',
        '    <p>Activation exclusive pour les collaborateurs internes de l’entreprise (Dogfooding), les testeurs bêta ou les clients premium ayant souscrit à une option payante.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Ops Flags (Kill Switch)</h4>',
        '    <p>Disjoncteur d’urgence permettant de désactiver instantanément une sous-partie coûteuse de l’application (moteur de recommandation IA) si la charge serveur menace de faire s’effondrer le site.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Gouvernance &amp; Dette Technique des Flags', [
          '<p>Un Feature Flag temporaire doit avoir une durée de vie limitée. Une fois une fonctionnalité déployée à 100% et stabilisée, le code conditionnel doit être promptement nettoyé. Laisser des centaines de flags obsolètes crée un labyrinthe logique instable source de pannes graves (ex. faillite de Knight Capital en 2012 causée par la réactivation accidentelle d’un vieux drapeau mort).</p>'
        ].join('\n'))
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie de Déploiement Continu Sans Interruption (Zero Downtime)',
  method: [
    'Valider la stratégie de packaging immuable et la traçabilité des artéfacts testés en staging.',
    'Concevoir le schéma de base de données selon le patron Expand and Contract pour assurer la compatibilité N / N+1.',
    'Sélectionner la stratégie d’aiguillage : Rolling Update pour l’économie de ressources, Blue/Green ou Canary pour la sécurité.',
    'Configurer l’observation télémétrique temps réel (taux d’erreurs HTTP 5xx, latence P99) sur la version canari.',
    'Programmer un disjoncteur automatique (Circuit Breaker) déclenchant le rollback immédiat en cas d’anomalie.',
    'Découpler le déploiement technique de la visibilité utilisateur via une plateforme centralisée de Feature Flags.'
  ],
  summary: [
    'Continuous Delivery requiert une approbation humaine, tandis que Continuous Deployment automatise la prod de bout en bout.',
    'Le déploiement sans interruption élimine les maintenances nocturnes en faisant cohabiter temporairement deux versions.',
    'Le Blue/Green maintient deux environnements complets et bascule le routeur instantanément avec retour arrière direct.',
    'La Canary Release expose un faible pourcentage de trafic réel pour valider le comportement sous charge.',
    'Le patron Expand and Contract est indispensable pour faire évoluer une base de données sans bloquer le service.',
    'Les Feature Flags séparent le déploiement technique de la publication métier (Deploy ≠ Release).'
  ],
  checklist: [
    'Je sais distinguer formellement la Livraison Continue (Delivery) du Déploiement Continu (Deployment).',
    'Je sais dimensionner une mise à jour Rolling Update avec maxSurge et maxUnavailable.',
    'Je maîtrise l’architecture réseau d’un basculement Blue/Green et de son rollback.',
    'Je sais orchestrer les paliers de routage progressif d’une Canary Release.',
    'Je sais appliquer les phases du patron Expand and Contract sur une table de base de données relationnelle.',
    'Je sais expliquer le fonctionnement d’un Feature Flag et d’un Kill Switch opérationnel.'
  ],
  notions: [
    'Continuous Delivery vs Deployment',
    'Déploiement Zero-Downtime',
    'Rolling Updates (maxSurge, maxUnavailable)',
    'Blue/Green Deployment &amp; Bascule',
    'Canary Releases &amp; Détection d’erreurs',
    'Patron Expand and Contract pour BDD',
    'Découplage Deploy vs Release',
    'Feature Flags &amp; Kill Switches'
  ],
  pitfalls: [
    'Effectuer une migration de base de données cassante en une seule passe lors d’un déploiement sans coupure, ignorant le patron Expand and Contract.',
    'Confondre le déploiement technique (Deploy) avec la publication fonctionnelle (Release) pour les utilisateurs finaux.',
    'Oublier d’implémenter un retour arrière automatique (Rollback) ou un coupe-circuit lors d’un déploiement Canary en cas d’explosion des erreurs HTTP 5xx.',
    'Laisser des dizaines de Feature Flags obsolètes s’accumuler dans le code source sans jamais les décommissionner.'
  ],
  questions: [
    {
      stem: 'Quelle différence fondamentale sépare la Livraison Continue (Continuous Delivery) du Déploiement Continu (Continuous Deployment) ?',
      opts: [
        "La livraison continue exclut toute phase de tests automatisés et pousse chaque commit en production sans aucune vérification préalable du code",
        "La livraison continue est strictement réservée aux applications mobiles natives tandis que le déploiement continu ne s’applique qu’aux logiciels embarqués",
        "Le déploiement continu envoie automatiquement chaque commit validé en production sans validation humaine, tandis que la livraison continue requiert une approbation manuelle pour la mise en prod",
        "Le déploiement continu fonctionne exclusivement sur l’infrastructure du cloud AWS et demeure impossible sur des serveurs physiques on-premise"
      ],
      correct: 2,
      exp: 'En Continuous Delivery, le paquet est prêt et testé, mais un humain déclenche le passage en production. En Continuous Deployment, l’ensemble de la chaîne est automatisé de bout en bout jusqu’à la prod.'
    },
    {
      stem: 'Dans une stratégie de déploiement Blue/Green, comment s’effectue la bascule vers la nouvelle version du logiciel ?',
      opts: [
        "En réinstallant manuellement le système d’exploitation de chacun des serveurs de l’ancien environnement, un par un, pendant la nuit",
        "En coupant l’alimentation électrique du datacenter pendant dix minutes afin de forcer le redémarrage complet de tous les services",
        "En demandant à chaque client final de vider manuellement le cache de son navigateur pour recharger la nouvelle version déployée",
        "En basculant instantanément l’aiguillage du trafic au niveau du routeur ou de l’équilibreur de charge vers le nouvel environnement (Green)"
      ],
      correct: 3,
      exp: 'L’environnement Green est déployé et vérifié à blanc à côté de l’environnement Blue actif. La bascule se fait en modifiant la cible du répartiteur de charge en une fraction de seconde.'
    },
    {
      stem: 'Quel est l’intérêt majeur d’une « Canary Release » (déploiement canari) par rapport à un déploiement massif classique ?',
      opts: [
        "Elle achemine d’abord un très faible pourcentage du trafic réel (ex. 5%) vers la nouvelle version pour détecter les anomalies avant de généraliser le déploiement",
        "Elle divise par deux la facture de bande passante réseau de l’entreprise en répartissant les requêtes sur deux hébergeurs distincts",
        "Elle supprime entièrement le besoin de surveiller les journaux de production puisque la nouvelle version est présumée stable par défaut",
        "Elle permet de compiler le code applicatif directement dans le navigateur de chaque client afin d’alléger les serveurs de production"
      ],
      correct: 0,
      exp: 'À l’image des canaris autrefois descendus dans les mines de charbon pour détecter le coup de grisou, la Canary Release expose un échantillon d’utilisateurs réels pour tester la fiabilité sans exposer l’ensemble du public.'
    },
    {
      stem: 'Pourquoi le patron de conception « Expand and Contract » est-il obligatoire pour faire du Zero-Downtime Deployment sur une base de données ?',
      opts: [
        "Pour compresser les tables de données volumineuses et libérer de l’espace disque sur les serveurs de base de données en production",
        "Pour assurer que le schéma de base de données reste compatible simultanément avec l’ancienne version et la nouvelle version du code durant la phase de transition",
        "Pour désactiver temporairement les clés primaires et les contraintes d’intégrité sur les tables transactionnelles durant la migration",
        "Pour convertir automatiquement une base MySQL relationnelle en base documentaire MongoDB sans réécriture du code applicatif"
      ],
      correct: 1,
      exp: 'Pendant un déploiement sans coupure, des instances de l’ancienne et de la nouvelle version tournent conjointement. Le schéma de base doit donc pouvoir être lu et écrit par les deux versions sans erreur.'
    },
    {
      stem: 'Que signifie l’adage DevOps « Deploy is not Release » (Déployer n’est pas Publier) ?',
      opts: [
        "Le code applicatif ne doit en aucun cas être envoyé sur les serveurs de production avant la signature du contrat de maintenance",
        "Il faut obligatoirement deux équipes juridiques distinctes, l’une chargée du déploiement technique et l’autre de la publication",
        "L’acheminement technique du code sur l’infrastructure de production est décorrélé de son activation fonctionnelle visible par les utilisateurs finaux",
        "Le déploiement du code s’effectue uniquement sur support physique, par envoi postal de DVD gravés vers chaque datacenter"
      ],
      correct: 2,
      exp: 'On peut déployer du code en production de manière continue tout en maintenant la fonctionnalité éteinte derrière un Feature Flag jusqu’au moment commercial ou marketing opportun.'
    },
    {
      stem: 'Qu’est-ce qu’un « Kill Switch » implémenté via un Feature Flag en exploitation ?',
      opts: [
        "Un script d’urgence qui détruit intégralement la base de données afin d’empêcher toute exfiltration lors d’une attaque pirate",
        "Un bouton physique de mise hors tension situé sur la façade de chacun des serveurs physiques de production",
        "Un protocole de déconnexion automatique et forcée de tous les développeurs connectés chaque soir à la fermeture des bureaux",
        "Un interrupteur logiciel d’urgence permettant de désactiver instantanément une fonctionnalité défaillante ou trop lourde sans re-déployer de code"
      ],
      correct: 3,
      exp: 'Un Kill Switch permet aux équipes d’astreinte de désactiver à chaud un composant causant une surcharge CPU ou un bogue critique par simple changement de configuration instantané.'
    },
    {
      stem: 'Quel risque technique majeur engendre l’accumulation excessive de Feature Flags non nettoyés dans une base de code ?',
      opts: [
        "Une saturation progressive de l’espace disque du serveur Git due au volume croissant des fichiers de configuration de drapeaux",
        "Une dette technique exponentielle due à la combinatoire d’embranchements conditionnels (code spaghetti) et au risque d’activation de code mort",
        "Un allongement drastique du temps de compilation, chaque drapeau devant être évalué dynamiquement au lancement du programme",
        "Une obligation réglementaire de déclarer chaque nouveau drapeau auprès de la CNIL avant toute mise en production"
      ],
      correct: 1,
      exp: 'Chaque drapeau ajoute des branches logiques if/else. Si les vieux flags ne sont pas élagués après généralisation, la combinatoire des tests devient ingérable et des comportements imprévus surviennent.'
    },
    {
      stem: 'Dans une stratégie Rolling Update sous Kubernetes, que spécifie le paramètre « maxUnavailable » ?',
      opts: [
        "Le nombre ou pourcentage maximum de pods autorisés à être indisponibles simultanément durant la mise à jour progressive",
        "La durée maximale en minutes tolérée pour un incident de production avant le déclenchement de la procédure d’escalade",
        "Le nombre maximal de développeurs autorisés à soumettre des commits simultanément sur le dépôt du projet",
        "La quantité de mémoire vive maximale allouée à chaque conteneur lors de sa recréation par le contrôleur"
      ],
      correct: 0,
      exp: 'maxUnavailable garantit qu’un pourcentage suffisant de répliques reste opérationnel en continu pour continuer à absorber le trafic usuel sans dégradation de service.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence entre Continuous Delivery et Continuous Deployment ?',
      a: 'Continuous Delivery garantit que le logiciel est publiable à tout moment avec validation humaine manuelle. Continuous Deployment pousse automatiquement chaque commit vert en production.'
    },
    {
      q: 'Qu’est-ce que le déploiement Blue/Green ?',
      a: 'Technique exploitant deux environnements identiques (Blue actif, Green nouveau) où la mise en production s’effectue par bascule instantanée du routeur réseau avec rollback immédiat possible.'
    },
    {
      q: 'Comment fonctionne une Canary Release ?',
      a: 'Acheminement progressif du trafic réel (ex. 5% puis 25% puis 100%) vers la nouvelle version avec surveillance continue des métriques pour couper en cas d’anomalie.'
    },
    {
      q: 'Pourquoi dit-on que « Déployer n’est pas Publier » (Deploy ≠ Release) ?',
      a: 'Le déploiement est l’installation technique du binaire sur les serveurs, tandis que la publication (Release) est l’activation fonctionnelle pour les utilisateurs, pilotée par Feature Flags.'
    },
    {
      q: 'Qu’est-ce que le patron « Expand and Contract » pour les bases de données ?',
      a: 'Méthode de migration de schéma en plusieurs étapes assurant la compatibilité simultanée des versions N et N+1 de l’application pour permettre le déploiement sans coupure (Zero Downtime).'
    },
    {
      q: 'Quel est le rôle d’un Feature Flag de type « Kill Switch » ?',
      a: 'Permettre d’éteindre instantanément une fonctionnalité en production via un panneau de contrôle pour protéger la stabilité du système sans nécessiter de hotfix ou de re-déploiement.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la distinction Delivery/Deployment, les concepts Blue/Green et Canary.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez le découplage Deploy/Release et le patron Expand & Contract.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez parfaitement les stratégies de déploiement continu et la gestion des releases modernes.'
    }
  ]
};
