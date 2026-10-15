/**
 * Chapitre 3 du cours « DevOps B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Conteneurisation Docker, Multi-Stage Builds &amp; Infrastructure as Code (IaC)',
  short: 'Conteneurs Docker &amp; IaC',
  toc: 'Mécanismes d’isolation Linux du noyau (namespaces, cgroups), ordonnancement de couches Dockerfile, Multi-Stage Builds, sécurité non-root et idempotence IaC.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Le célèbre syndrome « mais ça fonctionnait pourtant sur ma machine ! » traduit l’hétérogénéité chronique des environnements de développement, de test et de production. Pour éradiquer ces divergences et garantir une portabilité stricte, l’industrie s’est convertie à la conteneurisation et à l’Infrastructure as Code (IaC). Toutefois, de nombreux conteneurs déployés en entreprise s’avèrent pachydermiques (plusieurs gigaoctets), lents à construire en CI et truffés de vulnérabilités critiques car construits sans discernement sous privilèges root. L’ingénieur DevOps B3 doit maîtriser l’ingénierie fine des conteneurs Linux (namespaces, cgroups, OverlayFS), concevoir des Dockerfiles ultra-optimisés tirant parti du cache de couches et des builds multi-étapes (Multi-Stage Builds), et piloter ses parcs de serveurs par du code déclaratif idempotent.',
  objectives: [
    'décortiquer les mécanismes d’isolation sous-jacents du noyau Linux : Namespaces, Control Groups (cgroups) et Chroot/Pivot_root ;',
    'différencier architecturalement la conteneurisation de la virtualisation lourde par hyperviseur ;',
    'ordonnancer méthodiquement les instructions d’un Dockerfile pour maximiser l’efficacité du cache de couches (Layer Caching) ;',
    'concevoir des Multi-Stage Builds pour diviser la taille d’image par dix et réduire la surface d’attaque CVE ;',
    'appliquer les règles de sécurité indispensables des conteneurs : exécution non-root, suppression d’outils de build et images minimales (Alpine, Distroless) ;',
    'modéliser et vérifier l’idempotence et la convergence d’état en Infrastructure as Code (IaC).'
  ],
  sections: [
    {
      title: 'Conteneurisation vs Virtualisation Lourde : Les Primitives du Noyau Linux',
      html: [
        '<p>Contrairement à une machine virtuelle (VM) qui embarque un système d’exploitation invité complet au-dessus d’un hyperviseur (Type 1 ou 2), un conteneur Linux n’est pas une machine virtuelle. C’est un <strong>processus standard du système d’exploitation hôte</strong> isolé par des fonctionnalités natives du noyau Linux (Linux Kernel) :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Namespaces (Isolation)</h4>',
        '    <p>Cloisonnent la vue du système pour le processus : <code>pid</code> (arbre des processus), <code>net</code> (interfaces réseau, ports, tables de routage), <code>mnt</code> (points de montage disque), <code>ipc</code> (mémoire partagée), <code>uts</code> (nom d’hôte) et <code>user</code> (mappage des UID/GID).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Control Groups - cgroups (Plafonds)</h4>',
        '    <p>Régulent et mesurent la consommation physique des ressources matérielles allouées au conteneur : plafonnement du temps CPU (quota), mémoire vive maximale (RAM limit / OOM killer) et débit d’entrées/sorties disque (I/O throttle).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Chroot &amp; Pivot_root (Système de fichiers)</h4>',
        '    <p>Isolent la racine du système de fichiers (<code>/</code>), empêchant le processus de naviguer hors de l’arborescence fournie par l’image de base du conteneur.</p>',
        '  </div>',
        '</div>',
        '<p style="margin-top:16px">Puisqu’il partage directement le noyau du serveur hôte, le conteneur démarre en quelques millisecondes, ne consomme aucun overhead de virtualisation matérielle et offre des performances quasi-natives.</p>'
      ].join('\n')
    },
    {
      title: 'Le Système de Fichiers en Couches (OverlayFS) &amp; Optimisation du Cache',
      html: [
        '<p>Une image Docker est constituée d’un empilement de <strong>couches immuables en lecture seule (read-only layers)</strong> gérées par un système de fichiers d’union (typiquement <em>OverlayFS</em> sous Linux). Chaque instruction du Dockerfile (<code>FROM</code>, <code>RUN</code>, <code>COPY</code>, <code>ADD</code>) génère une nouvelle couche identifiée par une empreinte cryptographique (hash SHA-256).</p>',
        '<p>Lors de la commande <code>docker build</code>, Docker compare le hash de chaque couche avec son cache local : si l’instruction et les fichiers injectés sont strictement identiques, la couche est réutilisée instantanément (<code>Using cache</code>). En revanche, <strong>dès qu’une couche est invalidée, toutes les couches suivantes sont obligatoirement reconstruites</strong>.</p>',
        box('warning', 'L’Erreur Classique d’Ordonnancement Dockerfile', [
          '<p>Copier tout le projet avant d’installer les dépendances brise le cache à chaque modification du moindre fichier source :</p>',
          '<pre><code># INEFFECTIF (invalide le cache des dépendances à chaque commit) :\nCOPY . .\nRUN npm install\n\n# OPTIMAL (le cache de npm install est conservé tant que package.json ne change pas) :\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .</code></pre>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Multi-Stage Builds &amp; Durcissement de Sécurité',
      html: [
        '<p>Pour compiler une application (TypeScript, Go, Rust, Java), l’environnement nécessite des compilateurs, des SDKs et des paquets de développement lourds (plusieurs centaines de mégaoctets). Conserver ces outils dans l’image de production finale constitue une triple hérésie : image obèse, transfert réseau lent et vulnérabilités de sécurité critiques (surface d’attaque CVE démesurée).</p>',
        '<p>Le <strong>Multi-Stage Build</strong> résout ce dilemme en scindant le Dockerfile en étapes distinctes :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Étape 1 : Builder (Compilation)</h4>',
        '    <p>Image complète équipée de tous les outils nécessaires. Elle compile le binaire exécutable ou minifie les artéfacts web, puis est jetée.</p>',
        '    <pre><code>FROM golang:1.21 AS builder\nWORKDIR /src\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /bin/api</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Étape 2 : Runtime (Production Épurée)</h4>',
        '    <p>Image minimale (Scratch, Alpine ou Distroless). On ne copie que l’artéfact final via <code>COPY --from=builder</code>. Aucun compilateur ni shell n’est conservé.</p>',
        '    <pre><code>FROM alpine:3.19\nRUN adduser -D appuser\nUSER appuser\nCOPY --from=builder /bin/api /bin/api\nENTRYPOINT ["/bin/api"]</code></pre>',
        '  </div>',
        '</div>',
        '<p style="margin-top:16px">Résultat : une image dont la taille passe de 1.1 Go à 15 Mo, sans vulnérabilité système résiduelle et s’exécutant sous un utilisateur non privilégié (<code>USER appuser</code>).</p>'
      ].join('\n')
    },
    {
      title: 'Infrastructure as Code (IaC) &amp; Le Principe d’Idempotence',
      html: [
        '<p>L’<strong>Infrastructure as Code (IaC)</strong> formalise l’infrastructure réseau et serveur sous forme de fichiers texte versionnés sur Git, éliminant les interventions manuelles sur console (ClickOps). Deux paradigmes s’opposent :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Approche Impérative (Scripts Bash, CLI)</h4>',
        '    <p>Décrit <em>comment</em> exécuter une succession d’ordres (ex. <code>aws ec2 create-instance ...</code>). Si le script est relancé deux fois, il risque de dupliquer la ressource ou d’échouer brutalement.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Approche Déclarative (Terraform, CloudFormation)</h4>',
        '    <p>Décrit <em>l’état cible désiré</em> (ex. « il doit exister exactement 3 VM avec tel tag »). Le moteur compare l’état réel et l’état désiré, calculant le delta strict nécessaire.</p>',
        '  </div>',
        '</div>',
        '<h4 style="margin-top:20px">Idempotence &amp; Détection de Dérive (Configuration Drift)</h4>',
        '<p>Une opération est dite <strong>idempotente</strong> si son application répétée $N$ fois produit exactement le même résultat que son application unique, sans effet secondaire imprévu :</p>',
        '$$f(f(x)) = f(x)$$',
        '<p>Si un opérateur modifie manuellement un groupe de sécurité en production, l’infrastructure entre en état de <strong>Drift (Dérive)</strong>. Un moteur d’IaC moderne détecte ce désalignement lors du <code>plan</code> et restaure la configuration déclarée lors du <code>apply</code> pour garantir la convergence absolue vers l’état de référence.</p>'
      ].join('\n')
    }
  ],
  methodTitle: 'Démarche d’Optimisation et de Sécurisation de Conteneurs Docker',
  method: [
    'Sélectionner une image de base minimale, officielle et vérifiée (Alpine ou Distroless).',
    'Ordonnancer scrupuleusement les instructions Dockerfile de la moins volatile à la plus fréquemment modifiée.',
    'Isoler les manifestes de dépendances (package.json, requirements.txt) pour réutiliser le cache de téléchargement.',
    'Implémenter un Multi-Stage Build scindant l’environnement de compilation de l’image d’exécution finale.',
    'Créer et déclarer un utilisateur système dédié non privilégié (USER nonroot) pour l’exécution du processus.',
    'Vérifier l’idempotence et la convergence d’état de toute ressource d’Infrastructure as Code (IaC).'
  ],
  summary: [
    'Les conteneurs Linux s’appuient sur les Namespaces (isolation) et les cgroups (quotas), partageant le noyau hôte.',
    'Une image Docker est un empilement de couches immuables (OverlayFS) identifiées par hash cryptographique.',
    'Toute modification d’une couche invalide toutes les couches suivantes : ordonner du statique vers le dynamique.',
    'Le Multi-Stage Build réduit l’empreinte de plus de 80% et élimine les compilateurs et failles de l’image de prod.',
    'Exécuter un conteneur sous root constitue un risque d’élévation de privilège critique sur la machine hôte.',
    'L’IaC déclarative garantit l’idempotence et détecte la dérive de configuration (Drift) par rapport à Git.'
  ],
  checklist: [
    'Je sais expliquer le rôle des Namespaces et des cgroups du noyau Linux.',
    'Je sais différencier l’isolation par conteneur de la virtualisation lourde par hyperviseur.',
    'Je sais ordonnancer un Dockerfile pour maximiser le taux de succès du cache de build.',
    'Je sais écrire un Dockerfile multi-étapes (Multi-Stage Build) fonctionnel.',
    'Je sais durcir un conteneur en configurant un utilisateur non-root et en supprimant les shells inutiles.',
    'Je sais définir l’idempotence en IaC et expliquer comment un moteur détecte le drift.'
  ],
  notions: [
    'Namespaces Linux (pid, net, mnt, uts)',
    'Control Groups - cgroups (CPU, RAM)',
    'Conteneur vs Machine Virtuelle',
    'Système de couches OverlayFS',
    'Layer Caching &amp; Ordonnancement',
    'Multi-Stage Builds Docker',
    'Durcissement de conteneur &amp; Non-root',
    'Idempotence &amp; Dérive en IaC (Drift)'
  ],
  pitfalls: [
    'Placer l’instruction COPY . . avant l’installation des dépendances dans un Dockerfile, détruisant tout le cache de couches à chaque commit.',
    'Conserver les compilateurs et SDKs dans l’image finale de production au lieu d’utiliser un Multi-Stage Build épuré.',
    'Exécuter les conteneurs sous le compte utilisateur root en production, exposant l’hôte aux failles d’évasion de conteneur.',
    'Écrire des scripts d’automatisation impératifs non idempotents qui échouent ou dupliquent les ressources lorsqu’ils sont exécutés une deuxième fois.'
  ],
  questions: [
    {
      stem: 'Quel mécanisme du noyau Linux permet d’isoler la table des processus (PID) et les interfaces réseau d’un conteneur ?',
      opts: [
        'L’hyperviseur KVM',
        'Les Namespaces Linux (pid, net)',
        'Le protocole DNS',
        'Le BIOS physique du serveur'
      ],
      correct: 1,
      exp: 'Les Namespaces Linux restreignent ce qu’un processus peut voir : les namespaces pid et net lui fournissent une table des processus et des interfaces réseau virtuelles dédiées.'
    },
    {
      stem: 'Quelle composante du noyau Linux est responsable de limiter la mémoire vive (RAM) maximale consommée par un conteneur ?',
      opts: [
        'Les cgroups (Control Groups)',
        'Les tables IPTables',
        'Le système de fichiers Ext4',
        'Le serveur SSH'
      ],
      correct: 0,
      exp: 'Les cgroups (Control Groups) contrôlent et plafonnent la quantité de ressources physiques (mémoire vive, temps CPU, entrées/sorties) allouables à un groupe de processus.'
    },
    {
      stem: 'Pourquoi est-il crucial de placer la commande « COPY package.json » avant « COPY . . » dans un Dockerfile Node.js ?',
      opts: [
        'Car Docker refuse de compiler si les fichiers JavaScript sont copiés en premier',
        'Pour éviter d’invalider le cache de l’installation des dépendances à chaque modification d’un fichier source de l’application',
        'Pour chiffrer les dépendances de production',
        'Pour réduire automatiquement la taille de la RAM hôte'
      ],
      correct: 1,
      exp: 'Si le code source change, la couche correspondante et toutes les suivantes sont invalidées. Isoler la copie des manifestes de dépendances permet de réutiliser le cache de téléchargement de paquets.'
    },
    {
      stem: 'Quel est l’avantage architectural majeur d’un Dockerfile « Multi-Stage Build » ?',
      opts: [
        'Il permet d’exécuter plusieurs systèmes d’exploitation différents dans le même conteneur',
        'Il sépare l’étape de compilation de l’étape de runtime pour produire une image de production ultra-légère exempte d’outils de build et de compilateurs',
        'Il double automatiquement la mémoire allouée au conteneur',
        'Il empêche l’utilisation de Git'
      ],
      correct: 1,
      exp: 'Le Multi-Stage Build isole les outils de build lourds dans un stage temporaire et ne transfère que le binaire final dans l’image de production, réduisant la taille et éliminant les CVE.'
    },
    {
      stem: 'Pourquoi est-il formellement déconseillé de laisser un conteneur s’exécuter par défaut sous l’utilisateur « root » en production ?',
      opts: [
        'Car root consomme trop de bande passante réseau',
        'Car une faille de fuite de conteneur (container breakout) donnerait immédiatement à l’attaquant les privilèges administrateur complets sur le serveur hôte',
        'Car Docker interdit le déploiement en production des images root',
        'Car les logs ne peuvent pas être enregistrés sous root'
      ],
      correct: 1,
      exp: 'En cas de vulnérabilité permettant d’échapper au conteneur, un processus tournant sous UID 0 (root) s’octroie un accès root direct sur le noyau de la machine hôte. Il faut toujours créer un utilisateur non privilégié.'
    },
    {
      stem: 'En Infrastructure as Code (IaC), que signifie la propriété d’« Idempotence » ?',
      opts: [
        'Le script doit s’exécuter obligatoirement en moins d’une seconde',
        'L’application répétée d’une configuration produit le même état final sans créer de duplication ni d’effets secondaires non désirés',
        'L’infrastructure doit être réinitialisée et détruite chaque matin',
        'Les serveurs doivent tous être localisés dans la même zone géographique'
      ],
      correct: 1,
      exp: 'Une opération idempotente converge vers l’état cible : qu’elle soit exécutée une fois ou cent fois consécutives, l’infrastructure reste conforme sans altération non sollicitée.'
    },
    {
      stem: 'Comment qualifie-t-on la situation où la réalité des ressources de production ne correspond plus au code source de configuration déclaré sur Git ?',
      opts: [
        'La dérive de configuration (Configuration Drift)',
        'La compilation sémantique',
        'Le multi-threading',
        'L’équilibrage de charge dynamique'
      ],
      correct: 0,
      exp: 'Le Configuration Drift survient lorsque des modifications manuelles (ou des pannes non réconciliées) désalignent l’infrastructure réelle par rapport au code d’infrastructure versionné.'
    },
    {
      stem: 'Parmi ces types d’images de base de conteneur, laquelle offre la surface d’attaque la plus restreinte pour héberger un binaire compilé en Go ou Rust ?',
      opts: [
        'Ubuntu Desktop 22.04 LTS complète',
        'Une image Scratch ou Distroless (contenant uniquement le binaire et les certificats TLS de base)',
        'Debian GNU/Linux avec suite de développement gcc préinstallée',
        'CentOS 7 avec serveur de messagerie'
      ],
      correct: 1,
      exp: 'Les images Scratch ou Distroless ne contiennent ni shell (/bin/sh), ni gestionnaire de paquets, ni outils de diagnostic : un assaillant qui injecte du code ne dispose d’aucun binaire pour pivoter.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les primitives du noyau Linux qui rendent possibles les conteneurs Docker ?',
      a: 'Les Namespaces (cloisonnement de la vue système) et les cgroups (plafonnement et régulation des ressources physiques CPU, mémoire, I/O).'
    },
    {
      q: 'Quelle est la différence fondamentale entre un conteneur et une machine virtuelle ?',
      a: 'La VM virtualise le matériel et exécute un OS complet avec son propre noyau via un hyperviseur. Le conteneur est un simple processus isolé partageant le noyau de l’hôte.'
    },
    {
      q: 'Comment fonctionne le système de couches (OverlayFS) dans Docker ?',
      a: 'L’image est un empilement de couches en lecture seule identifiées par hash. Seule la couche supérieure du conteneur en exécution est inscriptible (Copy-on-Write).'
    },
    {
      q: 'Quel est l’intérêt majeur d’un Multi-Stage Build Docker ?',
      a: 'Il permet de compiler l’application avec des outils lourds puis d’extraire uniquement l’exécutable final dans une image minimale, divisant la taille par 10 et éliminant les failles CVE.'
    },
    {
      q: 'Qu’est-ce que l’idempotence en Infrastructure as Code (IaC) ?',
      a: 'La propriété selon laquelle ré-exécuter le script d’infrastructure N fois produit exactement le même état nominal sans multiplier les ressources ni provoquer d’erreur.'
    },
    {
      q: 'Qu’appelle-t-on le « Configuration Drift » ?',
      a: 'L’écart progressif qui se creuse entre l’état réel de l’infrastructure en production (modifiée manuellement) et l’état théorique déclaré dans le code IaC sur Git.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez la distinction conteneur/VM, les namespaces/cgroups et les principes du cache Docker.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les mécanismes de Multi-Stage Builds et l’idempotence IaC.'
    },
    {
      cls: 'high',
      text: '8/8 : Excellent ! Vous maîtrisez parfaitement l’ingénierie des conteneurs Linux et l’Infrastructure as Code.'
    }
  ]
};
