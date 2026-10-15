/**
 * Contenu du cours « Linux Avancé B3 » (dossier `b3-linux/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-linux/.
 */
'use strict';

const chapitres = [
  ...require('./b3-linux/chapitres-1-3'),
  ...require('./b3-linux/chapitres-4-6')
];

const pages = require('./b3-linux/pages');

const course = {
  id: 'b3-linux',
  slug: 'b3-linux',
  brand: 'Linux Avancé B3',
  brandIcon: 'terminal',

  // Amber sobre conforme WCAG AA/AAA (5.02:1 / 8.5:1 sur blanc)
  accent: '#b45309',
  accentDeep: '#78350f',
  accentSoft: '#fffbeb',
  accentBorder: '#fde68a',

  storeKey: 'b3linux:progress',

  title: 'Linux Avancé B3 — Noyau Linux, Systemd, Stockage LVM/RAID, Conteneurs Cgroups v2 &amp; Durcissement Sécuritaire',
  description:
    'Formation d’excellence en ingénierie système Linux pour le Bachelor 3 : ' +
    'architecture interne du noyau et diagnostic système (/proc, /sys, espace d’adressage virtuel VMMAP, détection de violations W^X, traçabilité des appels système avec strace et codes errno), ' +
    'gestion avancée de l’init avec systemd (PID 1, syntaxe déclarative des unités service/timer, graphe de dépendances directed acyclic graph DAG, détection de cycles After/Before/Requires et requêtes journald avec décodage des priorités RFC 5424), ' +
    'ingénierie du stockage d’entreprise (Logical Volume Manager LVM, calcul des Physical Extents PE, snapshots Copy-On-Write COW, surveillance d’états et reconstruction RAID logiciel mdadm, et détection de saturation des métadonnées d’inodes vs blocs de données), ' +
    'fondements de la conteneurisation moderne (les 8 Namespaces Linux PID/MNT/NET/IPC/UTS/USER/CGROUP/TIME, hiérarchie unifiée Cgroups v2 sous /sys/fs/cgroup, régulation stricte cpu.max et memory.max, et mécanique de sacrifice de l’OOM Killer avec oom_score_adj), ' +
    'réseau virtuel avancé et routage par politiques (interconnexion de conteneurs avec paires veth et ponts logiciels Linux bridge, suite moderne iproute2, Policy-Based Routing PBR avec tables multiples via ip rule et séquence de résolution /etc/nsswitch.conf), ' +
    'et durcissement sécuritaire du noyau Linux (paramétrage /etc/sysctl.conf, randomisation ASLR, masquage de pointeurs kptr_restrict, architecture modulaire PAM avec drapeaux required/requisite/sufficient, et traçabilité inaltérable avec auditd pour la détection d’élévations de privilèges EUID=0).',
  lead:
    'Maîtrisez les composants profonds du noyau Linux, l’orchestration systemd, le stockage LVM, la conteneurisation Cgroups v2 et le durcissement sécuritaire en entreprise. ' +
    'Six modules approfondis combinant formalisme théorique, 18 ateliers de programmation interactive en Python 3 et 48 QCM d’évaluation.',

  sources: 'Documentation officielle du noyau Linux (kernel.org), spécifications systemd (Lennart Poettering / Freedesktop), guides de durcissement ANSSI et CIS Benchmarks Linux',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
