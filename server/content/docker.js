/**
 * Contenu du cours « Docker B2 » (dossier `docker/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier docker/.
 */
'use strict';

const chapitres = [
  ...require('./docker/chapitres-1-3'),
  ...require('./docker/chapitres-4-6')
];

const pages = require('./docker/pages');

const course = {
  id: 'docker',
  slug: 'docker',
  brand: 'Docker B2',
  brandIcon: 'blocks',

  // Bleu Marine / Sky 700 / 800 accessible conforme WCAG AA / AAA (5.93:1 / 7.92:1 sur blanc)
  accent: '#0369a1',
  accentDeep: '#075985',
  accentSoft: '#f0f9ff',
  accentBorder: '#bae6fd',

  storeKey: 'b2docker:progress',

  title: 'Docker B2 — Conteneurisation Linux, Dockerfile, Réseau &amp; Orchestration Compose',
  description:
    'Formation complète à la conteneurisation logicielle et à l’ingénierie DevOps sous Docker : ' +
    'fondements de l’isolation noyau Linux (Namespaces PID, NET, MNT, IPC, UTS, USER et Cgroups v1/v2), ' +
    'comparaison rigoureuse VM vs Conteneur, architecture modulaire du moteur Docker (CLI, dockerd, containerd, containerd-shim, runc OCI), ' +
    'système de fichiers en couches OverlayFS (lowerdir, upperdir, merged), stratégie Copy-On-Write (CoW) et masquage Whiteout, ' +
    'registres d’images (Docker Hub, GHCR, Harbor) et épinglage immuable par digests cryptographiques SHA256, ' +
    'conception et optimisation de Dockerfiles (Build Cache, .dockerignore, CMD vs ENTRYPOINT en forme exec), ' +
    'architecture Multi-Stage Build pour la réduction drastique de taille et de surface d’attaque, ' +
    'cycle de vie des conteneurs, modes réseau (Bridge, Host, None, DNS interne à 127.0.0.11), port mapping NAT iptables, ' +
    'persistance des données (Volumes managés vs Bind Mounts vs Tmpfs), ' +
    'orchestration multi-services avec Docker Compose (spécification Compose, depends_on fiabilisé par healthcheck et condition: service_healthy, fichiers .env), ' +
    'et durcissement de production selon le CIS Docker Benchmark (abandon du compte root via USER, Linux Capabilities --cap-drop=ALL, ' +
    'quotas cgroups --memory/--cpus/--pids-limit, scans de vulnérabilités Trivy et rotation des journaux json-file).',
  lead:
    'Maîtrisez la conteneurisation industrielle de l’isolation noyau bas niveau jusqu’à l’orchestration multi-services en production. ' +
    'Six chapitres complets combinant théorie des systèmes, architectures Cloud Native, 18 ateliers de programmation Python et QCM d’évaluation.',

  sources: 'la documentation officielle Docker Engine, la spécification Open Container Initiative (OCI), le standard Docker Compose et le guide de sécurité CIS Docker Benchmark',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
