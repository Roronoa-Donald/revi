/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Docker B2 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active Docker</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les principes indispensables : Namespaces &amp; Cgroups, Layers &amp; UnionFS, Dockerfile &amp; Multi-Stage, Volumes &amp; Réseaux, Docker Compose et Durcissement en production.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento Docker' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Docker B2 : notions clés des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento des Commandes, Architectures &amp; Directives Docker</h1>',
    '  <p class="lead">Guide de référence rapide : primitives noyau Linux, cycle de vie des conteneurs, directives Dockerfile clés, syntaxe Compose et bonnes pratiques de sécurité en production.</p>',
    '',
    '  <h2>1. Primitives d’Isolation du Noyau Linux</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Mécanisme</th><th>Type de primitive</th><th>Rôle et Périmètre isolé</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><strong>PID Namespace</strong></td><td>Namespace</td><td>Isole l’arborescence des processus : le conteneur dispose de son propre PID 1 sans voir l’hôte.</td></tr>',
    '      <tr><td><strong>NET Namespace</strong></td><td>Namespace</td><td>Isole les interfaces réseau (eth0), tables de routage et ports d’écoute.</td></tr>',
    '      <tr><td><strong>MNT Namespace</strong></td><td>Namespace</td><td>Isole les points de montage et la racine du système de fichiers (chroot avancé).</td></tr>',
    '      <tr><td><strong>IPC Namespace</strong></td><td>Namespace</td><td>Isole les communications inter-processus (mémoire partagée POSIX, sémaphores).</td></tr>',
    '      <tr><td><strong>UTS Namespace</strong></td><td>Namespace</td><td>Isole le nom d’hôte (hostname) et le nom de domaine NIS du conteneur.</td></tr>',
    '      <tr><td><strong>USER Namespace</strong></td><td>Namespace</td><td>Mappe l’UID 0 (root dans le conteneur) vers un UID standard non-privilégié sur la machine hôte.</td></tr>',
    '      <tr><td><strong>Cgroups (v1/v2)</strong></td><td>Control Groups</td><td>Limite et comptabilise la consommation des ressources matérielles (CPU, RAM, E/S disques).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Commandes Essentielles du Cycle de Vie</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Commande CLI</th><th>Action effectuée</th><th>Impact sur le conteneur</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>docker run -d -p 80:80 --name web nginx</code></td><td>Crée et démarre un conteneur en arrière-plan</td><td>Passe de l’état Absent à Running directement.</td></tr>',
    '      <tr><td><code>docker exec -it web sh</code></td><td>Exécute une commande dans un conteneur actif</td><td>Ouvre un shell interactif sans redémarrer le conteneur.</td></tr>',
    '      <tr><td><code>docker stop web</code></td><td>Arrêt propre du conteneur</td><td>Envoie SIGTERM (délai 10s) puis SIGKILL si nécessaire.</td></tr>',
    '      <tr><td><code>docker rm -f web</code></td><td>Suppression forcée</td><td>Stoppe et détruit le conteneur et sa couche Writable.</td></tr>',
    '      <tr><td><code>docker logs -f --tail 100 web</code></td><td>Consultation des flux stdout/stderr</td><td>Affiche et suit les 100 dernières lignes de journalisation.</td></tr>',
    '      <tr><td><code>docker inspect web</code></td><td>Affichage des métadonnées bas niveau</td><td>Retourne la configuration complète en JSON (IP, volumes, cgroups).</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Directives Dockerfile &amp; Multi-Stage Build</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Directive</th><th>Usage recommandé</th><th>Règle d’optimisation / Sécurité</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>FROM image:tag [AS stage]</code></td><td>Déclare l’image parente de base</td><td>Préférer des tags précis (ex: <code>node:20-alpine</code>) à <code>latest</code>.</td></tr>',
    '      <tr><td><code>WORKDIR /chemin</code></td><td>Définit le répertoire courant d’exécution</td><td>Toujours utiliser des chemins absolus (crée le dossier si absent).</td></tr>',
    '      <tr><td><code>COPY src dest</code></td><td>Copie des fichiers locaux de l’hôte</td><td>Privilégier COPY à ADD pour les fichiers simples (meilleure transparence).</td></tr>',
    '      <tr><td><code>RUN commande &amp;&amp; nettoyage</code></td><td>Exécute une commande et crée un layer</td><td>Chaîner avec <code>&amp;&amp;</code> et supprimer les caches apt/pip dans le même layer.</td></tr>',
    '      <tr><td><code>USER nonroot</code></td><td>Bascule vers un utilisateur non-privilégié</td><td>Obligatoire en production pour éliminer le risque d’exécution root.</td></tr>',
    '      <tr><td><code>COPY --from=stage binaire dest</code></td><td>Multi-stage : extrait l’artefact compilé</td><td>Isole les compilateurs lourds hors de l’image finale de production.</td></tr>',
    '      <tr><td><code>CMD ["exec", "arg"]</code></td><td>Commande ou arguments par défaut</td><td>Utiliser la forme JSON exec form pour recevoir correctement les signaux UNIX.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Stockage, Réseau &amp; Docker Compose</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Pilotes de Stockage &amp; Persistance</h4>',
    '      <ul>',
    '        <li><strong>Volumes nommés :</strong> Gérés par Docker dans <code>/var/lib/docker/volumes/</code>. Recommandés pour les bases de données (persistance garantie).</li>',
    '        <li><strong>Bind Mounts :</strong> Liés directement à un chemin de l’hôte (ex: <code>./src:/app</code>). Idéaux en développement pour le rechargement à chaud (Hot Reload).</li>',
    '        <li><strong>Tmpfs Mounts :</strong> Stockés en RAM pure. Données volatiles et ultra-rapides (clés éphémères, jetons).</li>',
    '      </ul>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Réseaux &amp; Docker Compose</h4>',
    '      <ul>',
    '        <li><strong>Bridge Network :</strong> Réseau privé virtuel par défaut. Dans un réseau personnalisé, résolution DNS automatique par nom de service.</li>',
    '        <li><strong>Host Network :</strong> Supprime l’isolation réseau : le conteneur partage directement la pile réseau de l’hôte.</li>',
    '        <li><strong>depends_on :</strong> Définit l’ordre d’instanciation sans garantir que l’application applicative interne est prête (utiliser healthcheck).</li>',
    '      </ul>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'simulateur-examen.html', label: 'Simulateur d’examen B2' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento &amp; Commandes — ' + course.brand,
      description: 'Mémento complet des commandes Docker, directives Dockerfile et architecture Compose.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
