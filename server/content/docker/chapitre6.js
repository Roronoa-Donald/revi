/**
 * Chapitre 6 du cours « Docker B2 » — Sécurité, Production &amp; Optimisation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Sécurité, Production &amp; Optimisation',
  short: 'Sécurité &amp; Production',
  toc: 'Durcissement des conteneurs selon le CIS Docker Benchmark, abandon des privilèges root (directive USER), limitation des Linux Capabilities, scans de vulnérabilités (Trivy), quotas de ressources Cgroups (RAM, CPU, PID limit), et rotation des journaux en production.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un serveur de production hébergeant une dizaine d’applications conteneurisées est victime d’une intrusion majeure : ' +
    'un pirate a exploité une faille de type Remote Code Execution (RCE) dans une bibliothèque vulnérable d’un conteneur web. ' +
    'Comme le conteneur tournait avec l’utilisateur root par défaut et sans aucune restriction de capabilities Linux, ' +
    'l’attaquant a réussi à charger un module noyau malveillant, à s’évader du conteneur (Container Escape) et à compromettre ' +
    'l’intégralité de l’infrastructure physique de l’entreprise. ' +
    'Dans le même temps, un second conteneur victime d’une fuite mémoire a provoqué l’intervention brutale de l’OOM-Killer ' +
    'qui a fauché le processus de base de données principal, faute de quotas mémoire configurés. ' +
    'Ce dernier module d’expertise forme les ingénieurs à verrouiller intégralement leurs conteneurs en production : ' +
    'bannir les privilèges root, filtrer les capabilities du noyau, poser des garde-fous stricts de CPU/mémoire ' +
    'et intégrer l’audit continu de sécurité dans la chaîne d’intégration continue (DevSecOps).',

  objectives: [
    'appliquer les recommandations essentielles du standard de sécurité CIS Docker Benchmark ;',
    'bannir l’exécution en utilisateur root et configurer des utilisateurs dédiés non-privilégiés (USER) ;',
    'restreindre les privilèges du noyau Linux avec la gestion fine des Capabilities (--cap-drop / --cap-add) ;',
    'comprendre les dangers critiques du flag --privileged et les vecteurs d’évasion de conteneur ;',
    'configurer des quotas stricts de ressources cgroups (--memory, --cpus, --pids-limit) pour immuniser l’hôte ;',
    'automatiser la rotation des journaux de logs (logging drivers) pour empêcher la saturation du disque.'
  ],

  sections: [
    {
      title: 'Le Principe du Moindre Privilège : Bannir l’Utilisateur Root',
      html: [
        '<p>Par défaut, si aucune directive <code>USER</code> n’est spécifiée dans le Dockerfile, ' +
        'le processus s’exécute sous le compte <strong>root (UID 0)</strong>. ' +
        'Bien que cloisonné par les namespaces, un attaquant qui parvient à exécuter du code arbitraire ' +
        'en tant que root dispose d’un pouvoir bien supérieur pour tenter une évasion de conteneur :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Anti-pattern : Exécution Root</h4>',
        '    <pre><code>FROM node:18-alpine\n' +
        'WORKDIR /app\n' +
        'COPY . .\n' +
        'CMD ["node", "server.js"]  # S\'execute en UID 0 (root) !</code></pre>',
        '    <p>Si l’application présente une faille de téléversement de fichier ou d’injection de commande, ' +
        '    le pirate peut modifier les fichiers système du conteneur, manipuler les interfaces réseau ' +
        '    et chercher une faille de noyau pour s’évader sur l’hôte.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Bonne Pratique : Utilisateur Dédié Non-Root</h4>',
        '    <pre><code>FROM node:18-alpine\n' +
        'RUN addgroup -S appgroup &amp;&amp; adduser -S appuser -G appgroup\n' +
        'WORKDIR /app\n' +
        'COPY --chown=appuser:appgroup . .\n' +
        'USER appuser  # Bascule en utilisateur sans privileges\n' +
        'CMD ["node", "server.js"]</code></pre>',
        '    <p>Même en cas de compromission totale de l’application, le pirate est confiné dans un compte ' +
        '    sans aucun droit d’administration, bloquant net la quasi-totalité des attaques d’évasion.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Linux Capabilities et Dangers Mortels de --privileged',
      html: [
        '<p>Sous Linux, les super-pouvoirs du compte root sont découpés en privilèges granulaires appelés <strong>Capabilities</strong>. ' +
        'Docker active par défaut un sous-ensemble restreint (comme <code>CAP_CHOWN</code>, <code>CAP_NET_BIND_SERVICE</code>) ' +
        'et désactive les plus dangereuses (comme <code>CAP_SYS_ADMIN</code> ou <code>CAP_SYS_MODULE</code>) :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Option Docker CLI</th>',
        '      <th>Action de Sécurité</th>',
        '      <th>Niveau de Risque / Recommandation</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>--cap-drop=ALL</strong></td>',
        '      <td>Retire l’intégralité des privilèges noyau accordés au conteneur.</td>',
        '      <td><strong>Excellence sécuritaire :</strong> À appliquer par défaut sur toutes les applications de production.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>--cap-add=NET_BIND_SERVICE</strong></td>',
        '      <td>Accorde uniquement le droit d’écouter sur un port inférieur à 1024 (ex: port 80/443).</td>',
        '      <td>Recommandé : n’ajouter que le strict minimum de capabilities indispensables.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>--privileged</strong></td>',
        '      <td>Désactive TOUTES les barrières : accorde toutes les capabilities et l’accès direct à <code>/dev</code>.</td>',
        '      <td><strong>DANGER MORTEL :</strong> Équivaut à donner l’accès root physique sur l’hôte. Formellement interdit en production.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>--read-only</strong></td>',
        '      <td>Monte la racine du conteneur en lecture seule intégrale.</td>',
        '      <td>Empêche tout attaquant de déposer un script malveillant sur le système de fichiers.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Quotas de Ressources Cgroups : Prévenir le Déni de Service (DoS)',
      html: [
        '<p>Sans limites explicites de ressources, un seul conteneur victime d’une boucle infinie ' +
        'ou d’une fuite de mémoire peut consommer 100 % du processeur et de la RAM de la machine physique, ' +
        'paralysant l’ensemble des autres services hébergés :</p>',

        '<ul>',
        '  <li><code>--memory="512m"</code> : plafonne la mémoire vive allouée. Si le conteneur dépasse ce seuil, le gestionnaire OOM (Out Of Memory) de son cgroup le termine immédiatement sans affecter les autres conteneurs.</li>',
        '  <li><code>--memory-swap="1g"</code> : limite la mémoire totale cumulée (RAM + espace de swap). Si égal à <code>--memory</code>, le conteneur n’a pas le droit d’utiliser de swap sur disque.</li>',
        '  <li><code>--cpus="1.5"</code> : garantit que le conteneur ne peut pas consommer plus de 150 % de temps de calcul processeur (soit l’équivalent d’un cœur et demi sur une période CFS de 100 ms).</li>',
        '  <li><code>--pids-limit=100</code> : plafonne le nombre total de processus simultanés dans le conteneur, immunisant l’hôte contre les attaques de type <em>Fork Bomb</em>.</li>',
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Scans de Vulnérabilités et Rotation des Logs en Production',
      html: [
        '<p>Deux mesures opérationnelles indispensables complètent le durcissement en environnement de production :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Scans de Vulnérabilités (Trivy / Docker Scout)</h4>',
        '    <p>Avant tout déploiement dans le registre, l’image doit être scannée par un outil de sécurité automatisé :</p>',
        '    <pre><code>trivy image --severity HIGH,CRITICAL mon-image:v1.0</code></pre>',
        '    <p>L’analyse compare les versions des bibliothèques système et paquets applicatifs contre les bases nationales de CVE ' +
        '    et bloque automatiquement le pipeline CI/CD si une faille critique est détectée.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Rotation des Logs (Logging Drivers)</h4>',
        '    <p>Par défaut, Docker stocke les journaux dans des fichiers JSON non limités qui peuvent saturer le disque en quelques semaines. ' +
        '    Configurez une rotation dans <code>/etc/docker/daemon.json</code> :</p>',
        '    <pre><code>{\n' +
        '  "log-driver": "json-file",\n' +
        '  "log-opts": {\n' +
        '    "max-size": "10m",\n' +
        '    "max-file": "3"\n' +
        '  }\n' +
        '}</code></pre>',
        '    <p>Les journaux sont ainsi bornés à 3 fichiers de 10 Mo maximum par conteneur.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Durcissement et Déploiement Sécurisé en Production',
  method: [
    'Étape 1 — Scannage statique des vulnérabilités : Passer l’image au crible avec Trivy ou Docker Scout pour éliminer les failles HIGH et CRITICAL.',
    'Étape 2 — Forcer un utilisateur non-root : Vérifier que le Dockerfile comporte une directive USER non nulle et sans droits sudo.',
    'Étape 3 — Restreindre les Linux Capabilities : Lancer le conteneur avec « --cap-drop=ALL » et ne réactiver que les permissions indispensables.',
    'Étape 4 — Poser des plafonds de ressources stricts : Configurer obligatoirement --memory, --cpus et --pids-limit pour prévenir tout déni de service.',
    'Étape 5 — Activer le système de fichiers en lecture seule : Appliquer « --read-only » avec un volume tmpfs temporaire uniquement pour les répertoires d’écriture nécessaires (/tmp).',
    'Étape 6 — Configurer la politique de redémarrage et la rotation des logs : Définir restart: unless-stopped et vérifier la rotation des fichiers de journalisation.'
  ],

  summary: [
    'Le principe du moindre privilège impose d’exécuter les conteneurs sous un utilisateur non-root dédié (directive USER).',
    'Le flag --privileged désactive toutes les protections d’isolation et doit être formellement banni en production.',
    'La stratégie --cap-drop=ALL retire l’intégralité des privilèges noyau pour ne conserver que le strict minimum.',
    'Les quotas cgroups (--memory, --cpus, --pids-limit) protègent l’hôte contre les fuites de mémoire et les fork-bombs.',
    'L’option --read-only fige le système de fichiers du conteneur et empêche l’injection de scripts malveillants persistants.',
    'La rotation des logs (max-size et max-file) prévient la saturation accidentelle de l’espace disque de la machine hôte.'
  ],

  checklist: [
    'Je comprends pourquoi exécuter un conteneur en root est un risque de sécurité majeur.',
    'Je sais comment créer et déclarer un utilisateur non-privilégié dans un Dockerfile.',
    'Je sais expliquer pourquoi le drapeau --privileged est dangereux pour l’hôte physique.',
    'Je maîtrise l’usage de --cap-drop=ALL combiné à --cap-add ciblé.',
    'Je sais configurer des plafonds de mémoire RAM et de processeur CPU avec les cgroups.',
    'Je sais configurer la rotation automatique des logs pour éviter la saturation du disque.'
  ],

  notions: [
    'CIS Docker Benchmark',
    'Exécution non-root (directive USER)',
    'Linux Capabilities (cap-drop / cap-add)',
    'Risques du drapeau --privileged',
    'Système de fichiers en lecture seule (--read-only)',
    'Quotas cgroups (--memory, --cpus, --pids-limit)',
    'Scans de vulnérabilités CVE (Trivy)',
    'Rotation des journaux (logging drivers)'
  ],

  pitfalls: [
    'Utiliser le drapeau --privileged en production pour résoudre un problème de droits de fichiers au lieu d’ajuster les permissions.',
    'Ne pas fixer de limite mémoire (--memory), permettant à un conteneur défaillant de saturer la RAM et de déclencher l’OOM-Killer sur l’hôte.',
    'Laisser le conteneur s’exécuter en root par défaut sans directive USER dans le Dockerfile.',
    'Oublier de configurer la rotation des logs, aboutissant au blocage complet du serveur par saturation de la partition /var.',
    'Ignorer les alertes de sécurité des scanners de vulnérabilités CVE dans les pipelines CI/CD.'
  ],

  questions: [
    {
      stem: 'Pourquoi est-il impératif de déclarer un utilisateur non-root avec la directive « USER » dans un Dockerfile de production ?',
      opts: [
        'Parce que root consomme deux fois plus de bande passante réseau',
        'Pour respecter le principe du moindre privilège : si l’application est compromise, l’attaquant n’a pas les droits d’administration nécessaires pour modifier le système ou s’évader sur l’hôte',
        'Parce que le système de fichiers Linux interdit aux utilisateurs root d’écrire dans des fichiers',
        'C’est une obligation technique du compilateur Go'
      ],
      correct: 1,
      exp: 'S’exécuter en tant qu’utilisateur non-privilégié neutralise la plupart des attaques d’évasion de conteneur et restreint drastiquement le rayon d’action d’un pirate.'
    },
    {
      stem: 'Que produit l’utilisation du drapeau « --privileged » lors du lancement d’un conteneur avec « docker run » ?',
      opts: [
        'Il attribue une adresse IP publique gratuite au conteneur',
        'Il désactive pratiquement toutes les barrières d’isolation du noyau, accorde toutes les Linux Capabilities et donne un accès direct à tous les périphériques de l’hôte physique',
        'Il compresse les fichiers de l’image pour économiser de la mémoire',
        'Il crypte le trafic TCP en HTTPS'
      ],
      correct: 1,
      exp: '--privileged retire toutes les protections de sécurité : un processus dans le conteneur peut charger des modules noyau et prendre le contrôle total du serveur physique en quelques secondes.'
    },
    {
      stem: 'Quelle option CLI permet d’immuniser un serveur hôte contre une attaque de type « Fork Bomb » (création infinie de processus fils) lancée depuis un conteneur ?',
      opts: [
        '--pids-limit=100',
        '--no-fork',
        '--kill-process',
        '--safe-mode'
      ],
      correct: 0,
      exp: '--pids-limit plafonne le nombre de threads et processus simultanés que le conteneur peut créer, empêchant la saturation de la table des processus du noyau Linux.'
    },
    {
      stem: 'Quelle combinaison d’options permet d’appliquer la stratégie de sécurité maximale concernant les Linux Capabilities d’un conteneur ?',
      opts: [
        '--cap-add=ALL',
        '--cap-drop=ALL puis --cap-add uniquement pour le strict minimum nécessaire (ex: NET_BIND_SERVICE)',
        '--no-capabilities',
        '--kernel-bypass'
      ],
      correct: 1,
      exp: 'Retirer toutes les capabilities par défaut (--cap-drop=ALL) puis réactiver uniquement le privilège indispensable applique le principe de défense en profondeur le plus strict.'
    },
    {
      stem: 'Que se passe-t-il sur un serveur hôte si un conteneur sans limite de mémoire spécifiée subit une fuite de mémoire RAM massive ?',
      opts: [
        'Le conteneur redémarre instantanément en douceur',
        'Le conteneur peut consommer toute la mémoire disponible de la machine physique jusqu’à ce que le noyau Linux invoque l’OOM-Killer, qui peut abattre d’autres processus vitaux de l’hôte',
        'Le serveur hôte augmente automatiquement sa mémoire physique',
        'Docker sauvegarde la mémoire sur un disque virtuel'
      ],
      correct: 1,
      exp: 'Sans plafond cgroup (--memory), le conteneur engloutit la RAM de l’hôte physique, provoquant un arrêt d’urgence par l’OOM-Killer qui peut tuer les processus de l’OS ou d’autres conteneurs sains.'
    },
    {
      stem: 'À quoi sert l’option « --read-only » lors de l’exécution d’un conteneur Docker ?',
      opts: [
        'Elle interdit aux utilisateurs de lire les fichiers',
        'Elle monte le système de fichiers racine du conteneur en lecture seule intégrale, empêchant tout attaquant d’y déposer des malwares ou des scripts malveillants',
        'Elle désactive la webcam de la machine',
        'Elle permet de lire les logs sans mot de passe'
      ],
      correct: 1,
      exp: 'Un système de fichiers en lecture seule (--read-only) rend le conteneur immuable à l’exécution, bloquant le dépôt de tout binaire ou script pirate sur son arborescence.'
    },
    {
      stem: 'Quel outil open source de sécurité est couramment intégré dans les chaînes CI/CD pour scanner les images Docker à la recherche de CVE connues ?',
      opts: [
        'Trivy',
        'Photoshop',
        'VLC',
        'Apache Benchmark'
      ],
      correct: 0,
      exp: 'Trivy (Aqua Security) est un scanner de vulnérabilités de référence pour conteneurs, capable de détecter les failles dans les paquets OS et les dépendances applicatives.'
    },
    {
      stem: 'Pourquoi est-il crucial de configurer les options « max-size » et « max-file » dans le pilote de journalisation de Docker ?',
      opts: [
        'Pour éviter que les fichiers journaux JSON ne grossissent indéfiniment jusqu’à saturer l’intégralité de la partition disque du serveur hôte',
        'Pour accélérer la vitesse de frappe au clavier',
        'Pour rendre les journaux anonymes au sens du RGPD',
        'Parce que le format JSON ne supporte pas plus de 100 lignes'
      ],
      correct: 0,
      exp: 'Par défaut, Docker ne purge pas les logs : une application bavarde peut générer des dizaines de gigaoctets de logs et bloquer totalement le serveur hôte par saturation disque.'
    }
  ],

  flashcards: [
    {
      q: 'Pourquoi bannir root dans un conteneur de production ?',
      a: 'Pour limiter les dégâts en cas de faille applicative et neutraliser les vecteurs d’évasion vers la machine hôte.'
    },
    {
      q: 'Pourquoi le flag --privileged est-il formellement interdit en prod ?',
      a: 'Il désactive toute l’isolation de sécurité et accorde des privilèges équivalents au root physique sur l’hôte.'
    },
    {
      q: 'Quelle est la règle d’or des Linux Capabilities ?',
      a: '--cap-drop=ALL pour tout retirer, puis réactiver uniquement le strict minimum indispensable avec --cap-add.'
    },
    {
      q: 'À quoi sert --pids-limit ?',
      a: 'À plafonner le nombre de processus pour empêcher une attaque par saturation de table (Fork Bomb).'
    },
    {
      q: 'Quel est le rôle de --read-only ?',
      a: 'Monter la racine du conteneur en lecture seule pour empêcher la persistance de charges virales ou scripts pirates.'
    },
    {
      q: 'Pourquoi configurer la rotation des logs ?',
      a: 'Pour plafonner la taille des fichiers journaux sur disque et éviter une saturation fatale du serveur hôte.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la directive USER, les risques du mode privilégié et les quotas de ressources.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bonnes connaissances en sécurité. Approfondissez les Linux Capabilities et le durcissement Cgroups.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise des pratiques de sécurité de production selon le CIS Benchmark.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous sécurisez, monitorez et durcissez les conteneurs Docker au plus haut niveau de conformité industrielle.' }
  ]
};
