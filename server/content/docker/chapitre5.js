/**
 * Chapitre 5 du cours « Docker B2 » — Orchestration avec Docker Compose.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Orchestration avec Docker Compose',
  short: 'Orchestration avec Docker Compose',
  toc: 'Infrastructure as Code pour conteneurs, structure du fichier docker-compose.yml (services, networks, volumes), gestion des dépendances depends_on, healthchecks applicatifs et conditions de santé, interpolation de variables d’environnement (.env) et pilotage multi-conteneurs.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Dans une start-up en pleine expansion, le déploiement de l’application sur la machine de test nécessite ' +
    'd’exécuter à la main un script shell complexe contenant 14 commandes « docker run » consécutives avec ' +
    'des dizaines de variables d’environnement, des ports et des volumes en ligne de commande. ' +
    'Régulièrement, un développeur oublie un argument ou lance l’API avant la base de données, provoquant des crashs en cascade. ' +
    'De plus, nettoyer l’environnement demande d’arrêter et supprimer chaque conteneur un par un. ' +
    'Pour professionnaliser ce flux de travail, l’équipe décide de standardiser l’ensemble de la pile sous Docker Compose. ' +
    'Ce module forme les étudiants à modéliser des architectures multi-services déclaratives, ' +
    'à orchestrer le cycle de vie applicatif d’une seule commande (« docker compose up -d »), ' +
    'et à fiabiliser les dépendances de démarrage à l’aide de sondes de santé (Healthchecks).',

  objectives: [
    'comprendre l’apport de l’approche déclarative (Infrastructure as Code) face aux scripts impératifs docker run ;',
    'structurer un fichier docker-compose.yml complet (sections services, networks, volumes) ;',
    'configurer des services avec directives build, image, ports, environment, env_file et restart ;',
    'analyser les limites de la directive depends_on et la compléter avec des sondes de santé (Healthchecks) ;',
    'maîtriser l’interpolation de variables d’environnement et les fichiers .env dans Compose ;',
    'piloter des piles applicatives complètes avec les commandes CLI (up, down, ps, logs, exec).'
  ],

  sections: [
    {
      title: 'Du Script Impératif à la Déclaration d’Infrastructure as Code',
      html: [
        '<p>Lancer plusieurs conteneurs interconnectés par des commandes CLI brutes est fastidieux, fragile et non reproductible :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Approche Impérative (Scripts Shell)</h4>',
        '    <p>Le développeur écrit un script <code>start.sh</code> rempli de commandes :</p>',
        '    <pre><code>docker network create mynet\n' +
        'docker volume create dbdata\n' +
        'docker run -d --net mynet -v dbdata:/var/lib/postgresql/data postgres\n' +
        'docker run -d --net mynet -p 8080:8080 myapi</code></pre>',
        '    <p>Aucune gestion de l’état désiré, pas de mécanisme de nettoyage automatique, et code difficile à maintenir.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Approche Déclarative (Docker Compose)</h4>',
        '    <p>L’architecture complète est déclarée dans un fichier <code>docker-compose.yml</code> :</p>',
        '    <pre><code>services:\n' +
        '  db:\n' +
        '    image: postgres:15-alpine\n' +
        '    volumes: [pgdata:/var/lib/postgresql/data]\n' +
        '  api:\n' +
        '    build: ./api\n' +
        '    ports: ["8080:8080"]</code></pre>',
        '    <p>Une seule commande <code>docker compose up -d</code> crée les réseaux, volumes et conteneurs nécessaires.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Structure Complète du Fichier docker-compose.yml',
      html: [
        '<p>La spécification moderne de Docker Compose (spécification Compose unifiée) ' +
        'articule la configuration en trois grands blocs de niveau racine :</p>',

        '<table class="table">',
        '  <thead>',
        '    <tr>',
        '      <th>Bloc Racine</th>',
        '      <th>Rôle</th>',
        '      <th>Éléments configurables clés</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><strong>services:</strong></td>',
        '      <td>Définit chaque conteneur applicatif de la pile.</td>',
        '      <td><code>image</code> ou <code>build</code>, <code>ports</code>, <code>environment</code>, <code>volumes</code>, <code>depends_on</code>, <code>restart</code>.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>networks:</strong></td>',
        '      <td>Définit les réseaux virtuels partagés entre les services.</td>',
        '      <td>Driver (bridge par défaut), sous-réseau IPAM, isolation réseau entre tiers.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><strong>volumes:</strong></td>',
        '      <td>Définit les volumes managés persistants créés automatiquement.</td>',
        '      <td>Driver de stockage, options de montage pour persister les données.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>',

        box(
          'tip',
          'Création Automatique du Réseau par Défaut',
          '<p>Lorsque vous exécutez <code>docker compose up</code> dans un dossier nommé <code>projet</code>, ' +
          'Compose crée automatiquement un réseau bridge isolé nommé <code>projet_default</code>. ' +
          'Tous les services déclarés dans le fichier rejoignent ce réseau et peuvent immédiatement ' +
          'communiquer entre eux par leur nom de service (ex: <code>http://db:5432</code> ou <code>http://redis:6379</code>) ' +
          'sans avoir besoin de déclarer manuellement de réseau personnalisé.</p>'
        )
      ].join('\n')
    },
    {
      title: 'Dépendances depends_on vs Sondes de Santé (Healthchecks)',
      html: [
        '<p>L’un des pièges les plus célèbres de Docker Compose réside dans la directive <code>depends_on</code> :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Piège de depends_on Classique</h4>',
        '    <p>Écrire simplement <code>depends_on: [db]</code> indique à Docker de démarrer le conteneur <code>db</code> ' +
        '    avant le conteneur <code>api</code>. Cependant, pour Docker, un conteneur est « démarré » dès que son processus est spawné ! ' +
        '    Or, une base de données PostgreSQL ou MySQL prend 5 à 15 secondes pour initialiser ses tables et écouter sur le port TCP. ' +
        '    L’API démarre, tente de se connecter immédiatement, échoue et s’arrête en erreur (CrashLoop).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Solution Professionnelle : Healthcheck</h4>',
        '    <p>On définit une sonde de santé sur la base de données et on attend qu’elle soit saine :</p>',
        '    <pre><code>services:\n' +
        '  db:\n' +
        '    image: postgres:15-alpine\n' +
        '    healthcheck:\n' +
        '      test: ["CMD-SHELL", "pg_isready -U postgres"]\n' +
        '      interval: 5s\n' +
        '      timeout: 3s\n' +
        '      retries: 5\n' +
        '  api:\n' +
        '    build: .\n' +
        '    depends_on:\n' +
        '      db:\n' +
        '        condition: service_healthy</code></pre>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Gestion des Variables d’Environnement et Fichiers .env',
      html: [
        '<p>Docker Compose lit automatiquement le fichier <code>.env</code> présent dans le même répertoire ' +
        'et remplace les variables selon des syntaxes d’interpolation normalisées :</p>',

        '<ul>',
        '  <li><code>${VARIABLE}</code> : insère la valeur définie dans <code>.env</code>. Si la variable n’existe pas, renvoie une chaîne vide.</li>',
        '  <li><code>${VARIABLE:-valeur_par_defaut}</code> : utilise la variable si elle existe et n’est pas vide, sinon applique <code>valeur_par_defaut</code>.</li>',
        '  <li><code>${VARIABLE:?message_erreur}</code> : bloque immédiatement le lancement avec une erreur si la variable obligatoire est manquante.</li>',
        '</ul>',

        box(
          'important',
          'Règle de Sécurité des Fichiers .env',
          '<p>Le fichier <code>.env</code> contient généralement des secrets de configuration ' +
          '(mots de passe de base de données, clés API privées, tokens de signature JWT). ' +
          'Il doit <strong>impérativement figurer dans votre fichier .gitignore</strong> et ne jamais être commité dans le dépôt git. ' +
          'Fournissez à la place un fichier modèle <code>.env.example</code> contenant des valeurs fictives documentées.</p>'
        )
      ].join('\n')
    }
  ],

  methodTitle: 'Protocole de Déploiement et de Gestion d’une Pile Docker Compose',
  method: [
    'Étape 1 — Rédiger le fichier docker-compose.yml : Définir les services, volumes et dépendances d’état de santé.',
    'Étape 2 — Préparer le fichier de variables d’environnement : Créer un fichier .env local avec les identifiants et clés de chiffrement.',
    'Étape 3 — Lancer la pile en arrière-plan : Exécuter « docker compose up -d » pour télécharger les images, compiler les services et instancier les conteneurs.',
    'Étape 4 — Vérifier l’état de santé des services : Lancer « docker compose ps » et constater que les conteneurs affichent le statut « healthy ».',
    'Étape 5 — Suivre les journaux consolidés : Observer les flux d’interaction entre conteneurs avec « docker compose logs -f ».',
    'Étape 6 — Arrêter et nettoyer la pile proprement : Éteindre les conteneurs avec « docker compose down » ou « docker compose down -v » pour purger les volumes de données.'
  ],

  summary: [
    'Docker Compose fournit un format déclaratif (Infrastructure as Code) unifiant la gestion multi-conteneurs.',
    'Par défaut, Compose crée un réseau bridge privé dédié et connecte tous les services déclarés avec résolution DNS interne.',
    'depends_on seul ne garantit que le lancement du conteneur cible, pas sa disponibilité applicative interne.',
    'L’association de healthcheck avec condition: service_healthy garantit un ordre de démarrage parfaitement fiable.',
    'Le fichier .env permet de paramétrer la pile par interpolation sans coder de valeurs sensibles en dur.',
    'La commande docker compose down arrête les conteneurs et supprime le réseau virtuel associé en une seule opération.'
  ],

  checklist: [
    'Je comprends l’intérêt de l’approche déclarative par rapport à une suite de commandes docker run.',
    'Je sais structurer les trois grands blocs : services, networks et volumes.',
    'Je sais pourquoi depends_on classique peut conduire à un plantage d’application au démarrage.',
    'Je sais configurer une directive healthcheck avec interval, timeout et retries.',
    'Je maîtrise la syntaxe d’interpolation ${VAR:-default} dans les fichiers YAML Compose.',
    'Je sais pourquoi le fichier .env ne doit jamais être versionné dans git.'
  ],

  notions: [
    'Infrastructure as Code pour conteneurs',
    'Structure du fichier docker-compose.yml',
    'Blocs racine services, networks, volumes',
    'Réseau virtuel automatique de projet',
    'Directive depends_on et ses limites',
    'Healthcheck et condition: service_healthy',
    'Interpolation de variables et fichier .env',
    'Cycle de vie CLI (up, down, ps, logs, exec)'
  ],

  pitfalls: [
    'Croire que depends_on attend que PostgreSQL ou MySQL soit prêt à accepter des requêtes SQL.',
    'Commiter le fichier .env contenant des mots de passe en clair dans un dépôt git public.',
    'Oublier les guillemets autour des ports dans YAML (ex: ports: - 80:80 au lieu de "80:80"), pouvant être interprété comme un nombre sexagésimal.',
    'Utiliser docker compose down -v en pensant simplement arrêter la pile : le flag -v détruit irréversiblement tous les volumes de données associés.'
  ],

  questions: [
    {
      stem: 'Quel est l’avantage fondamental de Docker Compose par rapport à des scripts de déploiement composés de commandes « docker run » ?',
      opts: [
        'Il permet d’exécuter du code Java sans machine virtuelle',
        'Il adopte une approche déclarative (Infrastructure as Code) permettant de décrire l’ensemble de la pile multi-conteneurs dans un fichier unique versionnable',
        'Il supprime le besoin de disposer d’un système d’exploitation',
        'Il rend les conteneurs compatibles avec les smartphones des années 1990'
      ],
      correct: 1,
      exp: 'Docker Compose centralise l’architecture (services, volumes, réseaux, configurations) dans un fichier YAML déclaratif garantissant des déploiements reproductibles et unifiés.'
    },
    {
      stem: 'Pourquoi une directive « depends_on: [database] » classique est-elle souvent insuffisante pour empêcher un conteneur d’API de crasher au démarrage ?',
      opts: [
        'Parce que Compose ne lit pas cette directive',
        'Parce que depends_on attend uniquement que le conteneur database soit démarré au sens système, pas que le moteur de base de données ait terminé son initialisation interne et écoute sur le port réseau',
        'Parce que le port de la base de données est toujours fermé par défaut',
        'Parce que les conteneurs refusent de communiquer entre eux sans clé SSH'
      ],
      correct: 1,
      exp: 'Démarré ne signifie pas prêt : la base a besoin de quelques secondes pour charger ses fichiers et démarrer son écoute. Sans sonde healthcheck, l’API tente une connexion immédiate et plante.'
    },
    {
      stem: 'Quelle configuration Compose moderne permet d’attendre qu’un service de base de données soit pleinement opérationnel avant de lancer l’API ?',
      opts: [
        'sleep 30 dans le script shell',
        'Une directive healthcheck sur la base de données combinée à « depends_on: db: { condition: service_healthy } » dans l’API',
        'En redémarrant le serveur physique',
        'En désactivant le pare-feu'
      ],
      correct: 1,
      exp: 'L’option condition: service_healthy suspend le démarrage du service consommateur jusqu’à ce que le test de santé (healthcheck) du service requis réussisse avec succès.'
    },
    {
      stem: 'Que fait Docker Compose par défaut concernant le réseau lorsque l’on exécute « docker compose up » dans un projet sans déclaration explicite de bloc networks ?',
      opts: [
        'Il désactive toute connectivité réseau pour tous les services',
        'Il crée automatiquement un réseau bridge dédié portant le nom du projet et y connecte tous les services avec résolution DNS par nom',
        'Il connecte tous les services au Wi-Fi public le plus proche',
        'Il oblige l’utilisateur à saisir manuellement une adresse IPv6'
      ],
      correct: 1,
      exp: 'Compose instancie un réseau par défaut (projet_default) sur lequel tous les conteneurs sont automatiquement branchés et peuvent se joindre directement par leur nom de service.'
    },
    {
      stem: 'Que produit la syntaxe d’interpolation « ${DB_PORT:-5432} » dans un fichier docker-compose.yml si la variable DB_PORT n’est pas définie dans l’environnement ni dans le fichier .env ?',
      opts: [
        'Le fichier plante avec une erreur de syntaxe YAML',
        'La valeur par défaut « 5432 » est utilisée',
        'La valeur est remplacée par le mot « NULL »',
        'Le port 80 est attribué automatiquement'
      ],
      correct: 1,
      exp: 'La syntaxe ${VAR:-defaut} permet de fournir une valeur de repli robuste lorsque la variable d’environnement n’est pas renseignée.'
    },
    {
      stem: 'Pourquoi est-il impératif d’ajouter le fichier « .env » dans le fichier « .gitignore » du projet ?',
      opts: [
        'Pour éviter que Git ne ralentisse la compilation',
        'Pour empêcher la fuite de secrets de production (mots de passe, clés d’API, jetons de chiffrement) sur un référentiel de code partagé',
        'Parce que Git ne supporte pas les fichiers commençant par un point',
        'C’est une obligation légale de la CNIL sous peine d’amende'
      ],
      correct: 1,
      exp: 'Le fichier .env renferme les secrets et identifiants sensibles de la configuration locale : il ne doit jamais être commité ni poussé sur un dépôt partagé (GitHub, GitLab).'
    },
    {
      stem: 'Quelle commande Docker Compose permet d’arrêter tous les conteneurs de la pile ET de supprimer définitivement tous les volumes de données persistants associés ?',
      opts: [
        'docker compose stop',
        'docker compose down -v',
        'docker compose delete --all',
        'docker compose rm --clean'
      ],
      correct: 1,
      exp: 'docker compose down éteint les conteneurs et supprime le réseau. L’adjonction du drapeau -v (ou --volumes) détruit en plus les volumes nommés déclarés dans le fichier.'
    },
    {
      stem: 'Quelle politique de redémarrage (restart) permet à un conteneur Compose de redémarrer automatiquement en cas de crash ou de redémarrage de l’hôte, SAUF si l’administrateur l’a explicitement arrêté ?',
      opts: [
        'restart: no',
        'restart: unless-stopped',
        'restart: always-force',
        'restart: on-reboot'
      ],
      correct: 1,
      exp: 'unless-stopped relance automatiquement le conteneur dans tous les cas, sauf si une commande manuelle docker stop ou docker compose stop a été explicitement exécutée.'
    }
  ],

  flashcards: [
    {
      q: 'Quel est le rôle de Docker Compose ?',
      a: 'Orchestrer et gérer des applications multi-conteneurs de manière déclarative à travers un fichier docker-compose.yml unique.'
    },
    {
      q: 'Pourquoi depends_on seul est-il insuffisant ?',
      a: 'Il attend uniquement que le conteneur soit démarré au sens système, pas que le service applicatif (ex: SQL) soit prêt.'
    },
    {
      q: 'Comment s’assurer qu’un service dépend d’une base de données prête ?',
      a: 'En combinant une directive healthcheck sur la base avec condition: service_healthy dans depends_on.'
    },
    {
      q: 'Que fait docker compose down ?',
      a: 'Il arrête et supprime les conteneurs et le réseau virtuel de la pile sans supprimer les volumes (sauf avec l’option -v).'
    },
    {
      q: 'À quoi sert la syntaxe ${VAR:-default} ?',
      a: 'À interpoler la variable VAR si elle existe dans .env, sinon utiliser la valeur de repli default.'
    },
    {
      q: 'Comment deux services Compose communiquent-ils entre eux ?',
      a: 'Via le réseau bridge automatique de projet en utilisant simplement le nom du service comme nom d’hôte DNS.'
    }
  ],

  mastery: [
    { cls: 'low', text: 'Moins de 4/8 : Révisez la structure YAML Compose, la commande up et le rôle de depends_on.' },
    { cls: 'mid', text: 'De 4 à 6/8 : Bon socle acquis. Approfondissez les Healthchecks et la gestion des variables d’environnement.' },
    { cls: 'good', text: '7/8 : Très bonne maîtrise de l’orchestration multi-conteneurs sous Docker Compose.' },
    { cls: 'top', text: '8/8 : Score parfait ! Vous architectez des environnements de déploiement déclaratifs d’une fiabilité exemplaire.' }
  ]
};
