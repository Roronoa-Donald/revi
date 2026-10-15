/**
 * Pages « examens » et « exercices » du cours « Docker B2 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées Docker B2</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences académiques universitaires de niveau Bachelor 2 / Licence 2 en administration système et conteneurisation DevOps.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Isolation Noyau, Images &amp; Dockerfile', [
      '<h4>Partie 1 : Fondements de la Conteneurisation (6 points)</h4>',
      '<ol>',
      '  <li>Expliquez la différence fondamentale d’architecture entre une machine virtuelle de type 2 (VirtualBox) et un conteneur Docker. Quels composants matériels ou logiciels sont virtualisés ou partagés dans chaque cas ? (3 pts)</li>',
      '  <li>Détaillez le rôle respectif des Namespaces Linux et des Control Groups (cgroups) dans la création d’un conteneur. Citez au moins 4 types de namespaces distincts. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Système de Fichiers en Couches &amp; OverlayFS (6 points)</h4>',
      '<p>Un serveur Docker héberge trois applications web basées sur l’image parente <code>node:18-alpine</code> (150 Mo). Chaque application ajoute 30 Mo de code source spécifique.</p>',
      '<ol>',
      '  <li>Expliquez le mécanisme d’Union File System (OverlayFS) et le principe de Copy-On-Write (CoW). Quel est l’espace disque physique total réellement consommé par ces trois images sur l’hôte ? (3 pts)</li>',
      '  <li>Que se passe-t-il exactement sur le disque si l’un des conteneurs supprime le fichier <code>/etc/hosts</code> appartenant à l’image parente en lecture seule ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Rédaction et Optimisation de Dockerfile (8 points)</h4>',
      '<p>Soit le Dockerfile suivant pour une application Node.js :</p>',
      '<pre><code>FROM ubuntu:22.04\\n' +
      'RUN apt-get update\\n' +
      'RUN apt-get install -y nodejs npm\\n' +
      'COPY . /app\\n' +
      'WORKDIR /app\\n' +
      'RUN npm install\\n' +
      'CMD node server.js</code></pre>',
      '<ol>',
      '  <li>Identifiez au moins 4 anti-patterns critiques dans ce Dockerfile (taille d’image, invalidation de cache, sécurité, signaux UNIX). (4 pts)</li>',
      '  <li>Rédigez le Dockerfile corrigé et optimisé respectant les meilleures pratiques de production (image de base légère, ordre des couches de cache, utilisateur non-root, forme exec de CMD). (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>VM vs Conteneur (3 pts) :</strong> La VM virtualise le matériel complet via un hyperviseur et embarque son propre système d’exploitation invité (Guest OS avec noyau, pilotes et services système). Le conteneur Docker s’exécute directement sur l’OS hôte, partage son noyau Linux unique et n’embarque que les binaires et bibliothèques utilisateurs de l’application.</li>',
      '  <li><strong>Namespaces et Cgroups (3 pts) :</strong> Les <em>Namespaces</em> créent une bulle d’illusion spatiale en isolant la vue des ressources système (PID pour les processus, NET pour le réseau, MNT pour les points de montage, IPC pour la mémoire partagée, UTS pour le nom d’hôte, USER pour les identifiants). Les <em>Cgroups</em> contrôlent et limitent la consommation quantitative des ressources matérielles (plafond CPU, quota mémoire RAM, E/S disque).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>OverlayFS &amp; Stockage (3 pts) :</strong> OverlayFS superpose des couches en lecture seule (Image Layers) et une couche supérieure en lecture-écriture (Container Writable Layer). La couche de base <code>node:18-alpine</code> (150 Mo) n’est stockée qu’une seule fois. Espace réel = <code>150 Mo + (3 * 30 Mo) = 240 Mo</code> (au lieu de 540 Mo sans déduplication).</li>',
      '  <li><strong>Suppression et Whiteout (3 pts) :</strong> La couche d’image inférieure étant strictement immuable (Read-Only), le fichier d’origine n’est pas effacé. Le pilote OverlayFS crée un fichier spécial de masquage (<em>whiteout file</em>) dans la couche Container Layer, rendant le fichier invisible au conteneur sans modifier l’image partagée.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Anti-patterns identifiés (4 pts) :</strong><br>',
      '    1. Image de base lourde (Ubuntu 22.04 &gt; 80 Mo) avec installation inutile d’outils système complets.<br>',
      '    2. <code>RUN apt-get update</code> isolé brisant le cache et absence de nettoyage de <code>/var/lib/apt/lists/*</code>.<br>',
      '    3. <code>COPY . /app</code> placé AVANT <code>npm install</code> : tout changement d’un fichier source invalide le cache des dépendances <code>node_modules</code>.<br>',
      '    4. Exécution par défaut en utilisateur superadministrateur <code>root</code>.<br>',
      '    5. <code>CMD node server.js</code> en forme shell qui lance un sous-shell <code>/bin/sh -c</code> bloquant la réception des signaux SIGTERM.</li>',
      '  <li><strong>Dockerfile corrigé (4 pts) :</strong><br>',
      '    <code>FROM node:18-alpine\\n' +
      '    WORKDIR /app\\n' +
      '    COPY package*.json ./\\n' +
      '    RUN npm ci --only=production\\n' +
      '    COPY . .\\n' +
      '    USER node\\n' +
      '    EXPOSE 3000\\n' +
      '    CMD ["node", "server.js"]</code></li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Réseaux, Multi-Stage, Docker Compose &amp; Sécurité', [
      '<h4>Partie 1 : Architecture Docker Engine &amp; Spécification OCI (5 points)</h4>',
      '<ol>',
      '  <li>Détaillez le rôle de <code>dockerd</code>, <code>containerd</code>, <code>containerd-shim</code> et <code>runc</code> lors du démarrage d’un conteneur avec la commande <code>docker run</code>. (3 pts)</li>',
      '  <li>Quel est l’intérêt architectural d’avoir découplé le démon Docker de l’exécuteur de conteneur <code>containerd-shim</code> ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Réseau et Résolution DNS Interne (5 points)</h4>',
      '<ol>',
      '  <li>Quelle est la différence fondamentale de comportement entre le réseau bridge par défaut (<code>docker0</code>) et un réseau bridge personnalisé créé via <code>docker network create</code> ? (2.5 pts)</li>',
      '  <li>Comment un conteneur <code>api</code> peut-il communiquer avec un conteneur <code>database</code> situé sur le même réseau bridge personnalisé ? Expliquez le fonctionnement du serveur DNS intégré de Docker. (2.5 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Déploiement Multi-Services avec Docker Compose (6 points)</h4>',
      '<p>On souhaite déployer une architecture à trois niveaux : une interface web Nginx (port 80), une API Python Flask (port 5000) et une base de données PostgreSQL (port 5432).</p>',
      '<ol>',
      '  <li>Rédigez le fichier <code>docker-compose.yml</code> complet avec déclaration des services, des volumes de données persistants pour PostgreSQL, et d’un réseau privé interne. (4 pts)</li>',
      '  <li>Pourquoi la directive <code>depends_on</code> seule ne suffit-elle pas pour garantir que l’API ne crashe pas au démarrage en tentant de se connecter à PostgreSQL ? Comment sécuriser cette initialisation ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 4 : Durcissement et Sécurité en Production (4 points)</h4>',
      '<ol>',
      '  <li>Expliquez les risques liés à l’utilisation de conteneurs privilégiés (flag <code>--privileged</code>). Pourquoi ce flag doit-il être formellement banni en production ? (2 pts)</li>',
      '  <li>Comment contraindre la mémoire maximale (OOM) et le temps de calcul CPU d’un conteneur à l’aide des commandes CLI Docker ? (2 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Pile logicielle Docker (3 pts) :</strong> Le client CLI envoie la requête HTTP au démon <code>dockerd</code> via la socket Unix. <code>dockerd</code> gère les images et le réseau puis délègue l’exécution à <code>containerd</code>. <code>containerd</code> appelle le runtime de bas niveau <code>runc</code> (conforme OCI) pour configurer les namespaces/cgroups et lancer le processus conteneurisé. <code>runc</code> s’arrête une fois le processus lancé et laisse <code>containerd-shim</code> superviser le conteneur.</li>',
      '  <li><strong>Avantage de containerd-shim (2 pts) :</strong> <code>containerd-shim</code> maintient les descripteurs de fichiers (stdin/stdout/stderr) et l’état du conteneur sans dépendre du démon <code>dockerd</code>. Cela permet de redémarrer ou mettre à jour le démon Docker sans interrompre l’exécution des conteneurs actifs (Live Restore).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (5 points)</h4>',
      '<ul>',
      '  <li><strong>Réseau bridge par défaut vs personnalisé (2.5 pts) :</strong> Sur le bridge par défaut, les conteneurs ne peuvent communiquer entre eux que par adresse IP ou liens historiques dépréciés <code>--link</code>. Sur un réseau bridge personnalisé, Docker active automatiquement un serveur DNS interne à l’adresse <code>127.0.0.11</code> permettant la résolution automatique des noms d’hôtes par nom de conteneur.</li>',
      '  <li><strong>Communication et DNS interne (2.5 pts) :</strong> Le conteneur <code>api</code> contacte l’hôte <code>database:5432</code>. Le resolver DNS intégré intercepte la requête, résout le nom <code>database</code> en son adresse IP interne privée sur le sous-réseau bridge et achemine les paquets TCP sans exposer le port 5432 sur la machine hôte physique.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Fichier docker-compose.yml (4 pts) :</strong><br>',
      '    <pre><code>services:\\n' +
      '  web:\\n' +
      '    image: nginx:alpine\\n' +
      '    ports:\\n' +
      '      - "80:80"\\n' +
      '    depends_on:\\n' +
      '      - api\\n' +
      '    networks:\\n' +
      '      - app-net\\n' +
      '\\n' +
      '  api:\\n' +
      '    build: ./api\\n' +
      '    environment:\\n' +
      '      - DB_HOST=db\\n' +
      '    depends_on:\\n' +
      '      db:\\n' +
      '        condition: service_healthy\\n' +
      '    networks:\\n' +
      '      - app-net\\n' +
      '\\n' +
      '  db:\\n' +
      '    image: postgres:15-alpine\\n' +
      '    environment:\\n' +
      '      POSTGRES_PASSWORD: secret\\n' +
      '    volumes:\\n' +
      '      - pgdata:/var/lib/postgresql/data\\n' +
      '    healthcheck:\\n' +
      '      test: ["CMD-SHELL", "pg_isready -U postgres"]\\n' +
      '      interval: 5s\\n' +
      '      retries: 5\\n' +
      '    networks:\\n' +
      '      - app-net\\n' +
      '\\n' +
      'volumes:\\n' +
      '  pgdata:\\n' +
      '\\n' +
      'networks:\\n' +
      '  app-net:</code></pre></li>',
      '  <li><strong>Sécurisation de depends_on (2 pts) :</strong> <code>depends_on</code> garantit uniquement que le conteneur cible est démarré au sens du système, pas que le démon de base de données PostgreSQL a terminé son initialisation et accepte les connexions TCP. La solution consiste à associer une directive <code>healthcheck</code> sur PostgreSQL et utiliser <code>condition: service_healthy</code> dans l’API.</li>',
      '</ul>',
      '<h4>Corrigé Partie 4 (4 points)</h4>',
      '<ul>',
      '  <li><strong>Risques de --privileged (2 pts) :</strong> Le flag <code>--privileged</code> désactive l’ensemble de l’isolation de sécurité (accès direct à tous les périphériques <code>/dev</code> de l’hôte, toutes les Linux Capabilities activées, désactivation des profils AppArmor/Seccomp). Une faille applicative permet une évasion immédiate du conteneur et la prise de contrôle totale de l’OS hôte physique.</li>',
      '  <li><strong>Quotas de ressources (2 pts) :</strong> En ligne de commande : <code>docker run --memory="512m" --cpus="1.5" ...</code>. Cela configure directement les contrôleurs mémoire et CPU CFS des cgroups noyau, empêchant un conteneur en fuite de mémoire ou en boucle infinie de paralyser le serveur hôte.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'cartes.html', label: 'Réviser avec les flashcards' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs &amp; Corrigés — ' + course.brand,
      description: 'Épreuves types corrigées d’examen B2 en conteneurisation Docker, Dockerfile et Compose.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Pratiques ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const items = chapterList.map(ch => [
    '    <section class="card" style="margin-bottom: var(--space-4);">',
    '      <div class="card__head">',
    '        <span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</span>',
    '        <span class="card__num">Module ' + ch.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitre' + ch.n + '.html#exercices">Exercices du Module ' + ch.n + ' — ' + ch.title + '</a></h3>',
    '      <p class="card__desc">' + ch.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' 3 exercices interactifs en Python</span>',
    '        <span class="card__link"><a class="btn btn--sm" href="chapitre' + ch.n + '.html#exercices">Pratiquer sur le Chapitre ' + ch.n + ' ' + ic('arrow-right') + '</a></span>',
    '      </div>',
    '    </section>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices Pratiques Docker B2</h1>',
    '  <p class="lead">Accédez aux 18 ateliers de programmation et de simulation exécutables directement dans le navigateur, vérifiés automatiquement par le moteur de tests.</p>',
    '',
    items,
    '',
    chnav({ href: 'simulateur-examen.html', label: 'Passer les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir l’atelier libre de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Catalogue des Exercices Pratiques — ' + course.brand,
      description: 'Accès rapide aux 18 ateliers pratiques de simulation et d’architecture Docker B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
