/**
 * Configuration des cours dotés d'ateliers de code.
 *
 * Ce fichier est la source unique partagée par le générateur de pages
 * (`scripts/generate-code-labs.js`) et les tests (`tests/exercises.test.js`,
 * `tests/exercise-solutions.test.js`). Y ajouter un cours suffit à étendre les
 * deux : le catalogue d'exercices reste dans `server/exercises/<cours>.js`.
 *
 * Champs :
 *   - `dir`          : dossier racine du cours (sous la racine du dépôt) ;
 *   - `chapterDir`   : sous-dossier des chapitres (relatif à `dir`) ;
 *   - `chapters`     : nombre de chapitres (`chapitre1.html` … `chapitreN.html`) ;
 *   - `idPrefix`     : préfixe des identifiants d'exercices (« py » → `py-c1-e1`) ;
 *   - `title`        : libellé lisible, utilisé dans les rapports.
 *
 * Le libellé de langage affiché dans un atelier provient, lui, de la liste
 * blanche `server/services/execution/languages.js` : une seule table fait foi.
 */

module.exports = {
  'b1-python': {
    dir: 'b1-python',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'py',
    title: 'Python B1'
  },
  'b1-c-cpp': {
    dir: 'b1-c-cpp',
    chapterDir: 'chapitres',
    chapters: 8,
    idPrefix: 'c',
    title: 'Langage C & C++ B1'
  },
  'b1-algo': {
    dir: 'b1-algo',
    chapterDir: 'chapitres',
    chapters: 10,
    idPrefix: 'algo',
    title: 'Algorithmique B1'
  },
  'b1-php': {
    dir: 'b1-php',
    chapterDir: 'chapitres',
    chapters: 8,
    idPrefix: 'php',
    title: 'PHP B1'
  },
  'b1-algebre': {
    dir: 'b1-algebre',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'al',
    title: 'Algèbre linéaire B1'
  },
  'b1-stats': {
    dir: 'b1-stats',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'st',
    title: 'Statistique descriptive B1'
  },
  'b1-prog-web': {
    dir: 'b1-prog-web',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'web',
    title: 'Programmation Web B1'
  },
  'b1-robotique': {
    dir: 'b1-robotique',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'rb',
    title: 'Club de Robotique B1'
  },
  'b1-linux': {
    dir: 'b1-linux',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'lx',
    title: 'Linux B1'
  },
  'b1-git': {
    dir: 'b1-git',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'gt',
    title: 'Git B1'
  },
  'b1-cyber': {
    dir: 'b1-cyber',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'cy',
    title: 'Cybersécurité B1'
  },
  'b1-merise': {
    dir: 'b1-merise',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'mr',
    title: 'Modélisation (MERISE) B1'
  },
  'b1-droit': {
    dir: 'b1-droit',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'dr',
    title: 'Droit B1'
  },
  'b1-anglais': {
    dir: 'b1-anglais',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'en',
    title: 'Anglais des affaires B1'
  },
  'b1-fr-pro': {
    dir: 'b1-fr-pro',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'fr',
    title: 'Français professionnel B1'
  },
  'b1-reseaux': {
    dir: 'b1-reseaux',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 're',
    title: 'Architecture des réseaux B1'
  },
  'b1-bureautique': {
    dir: 'b1-bureautique',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'bu',
    title: 'Bureautique B1'
  },
  'b1-ccna1': {
    dir: 'b1-ccna1',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'cc',
    title: 'CCNA 1 B1'
  },
  'b1-architecture': {
    dir: 'b1-architecture',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ar',
    title: 'Circuit logique & architecture des ordinateurs B1'
  },
  'b1-admin-windows': {
    dir: 'b1-admin-windows',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'aw',
    title: 'Administration Windows B1'
  },
  'b1-virtualisation': {
    dir: 'b1-virtualisation',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'vt',
    title: 'Virtualisation des serveurs B1'
  },
  'b1-projet': {
    dir: 'b1-projet',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'pr',
    title: 'Projet tutoré B1'
  },
  'b1-sql': {
    dir: 'b1-sql',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'sq',
    title: 'Bases de données & SQL B1'
  },
  'linux': {
    dir: 'linux',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'lx2',
    title: 'Administration Linux B2'
  },
  'php': {
    dir: 'php',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'php2',
    title: 'PHP POO B2'
  },
  'probabilites': {
    dir: 'probabilites',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'pb2',
    title: 'Probabilités B2'
  },
  'rd_java': {
    dir: 'rd_java',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'java2',
    title: 'Java B2'
  },
  'rd_winserver': {
    dir: 'rd_winserver',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ws2',
    title: 'Windows Server B2'
  },
  'admin-vm': {
    dir: 'admin-vm',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'vm2',
    title: 'Administration des machines virtuelles B2'
  },
  'droit': {
    dir: 'droit',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'dr2',
    title: 'Droit informatique B2'
  },
  'react': {
    dir: 'react',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'rx2',
    title: 'React B2'
  },
  'api-rest-flask': {
    dir: 'api-rest-flask',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'fl2',
    title: 'API REST avec Flask B2'
  },
  'erp-si': {
    dir: 'erp-si',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'erp2',
    title: 'ERP & SI B2'
  },
  'ingenierie-besoin': {
    dir: 'ingenierie-besoin',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ib2',
    title: 'Ingénierie du besoin B2'
  },
  'masterclass-apprendre': {
    dir: 'masterclass-apprendre',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'mc2',
    title: 'Masterclass Apprendre à apprendre B2'
  },
  'RD-RO': {
    dir: 'RD-RO',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ro2',
    title: 'Recherche Opérationnelle B2'
  },
  'assembleur': {
    dir: 'assembleur',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'asm2',
    title: 'Architecture & Programmation en Assembleur B2'
  },
  'Cyber securite B2': {
    dir: 'Cyber securite B2',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'cs2',
    title: 'Cybersécurité B2'
  },
  'sql': {
    dir: 'sql',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'sql2',
    title: 'SQL B2'
  },
  'csharp': {
    dir: 'csharp',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'csb2',
    title: 'C# B2'
  },
  'ccna': {
    dir: 'ccna',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'na2',
    title: 'CCNA Réseau B2'
  },
  'uml': {
    dir: 'uml',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'um2',
    title: 'UML B2'
  },
  'uiux': {
    dir: 'uiux',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ux2',
    title: 'UI/UX Design B2'
  },
  'docker': {
    dir: 'docker',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'dk2',
    title: 'Docker B2'
  },
  'infographie': {
    dir: 'infographie',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ig2',
    title: 'Infographie B2'
  },
  'b3-algo': {
    dir: 'b3-algo',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'al3',
    title: 'Algorithmique B3'
  },
  'b3-cloud-computing': {
    dir: 'b3-cloud-computing',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'cc3',
    title: 'Cloud Computing B3'
  },
  'b3-devops': {
    dir: 'b3-devops',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'do3',
    title: 'DevOps B3'
  },
  'b3-document-technique': {
    dir: 'b3-document-technique',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'dt3',
    title: 'Document Technique B3'
  },
  'b3-etude-quantitative': {
    dir: 'b3-etude-quantitative',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'eq3',
    title: 'Étude quantitative & qualitative B3'
  },
  'b3-firewall': {
    dir: 'b3-firewall',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'fw3',
    title: 'Firewall & Sécurité Réseau B3'
  },
  'b3-github': {
    dir: 'b3-github',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'gh3',
    title: 'Git & GitHub B3'
  },
  'b3-linux': {
    dir: 'b3-linux',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'lx3',
    title: 'Linux Avancé B3'
  },
  'b3-agile': {
    dir: 'b3-agile',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ag3',
    title: 'Méthodes Agiles B3'
  },
  'b3-pfsense': {
    dir: 'b3-pfsense',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'pf3',
    title: 'pfSense & Routage B3'
  },
  'b3-reseau-lan': {
    dir: 'b3-reseau-lan',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'lan3',
    title: 'Réseau LAN Avancé B3'
  },
  'b3-sql': {
    dir: 'b3-sql',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'sql3',
    title: 'SQL Avancé B3'
  },
  'b3-veille': {
    dir: 'b3-veille',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'vt3',
    title: 'Veille Technologique & Innovation B3'
  },
  'b3-windows-server': {
    dir: 'b3-windows-server',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'ws3',
    title: 'Windows Server B3'
  },
  'b3-anglais': {
    dir: 'b3-anglais',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'an3',
    title: 'Anglais Professionnel & Technique B3'
  },
  'b3-cloud-azure': {
    dir: 'b3-cloud-azure',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'az3',
    title: 'Cloud Microsoft Azure B3'
  },
  'b3-cryptographie': {
    dir: 'b3-cryptographie',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'cr3',
    title: 'Cryptographie & PKI B3'
  },
  'b3-google-cloud': {
    dir: 'b3-google-cloud',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'gcp3',
    title: 'Google Cloud Platform B3'
  },
  'b3-hacking': {
    dir: 'b3-hacking',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'hk3',
    title: 'Hacking Éthique & Pentest B3'
  },
  'b3-cloud-aws': {
    dir: 'b3-cloud-aws',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'aws3',
    title: 'Services Cloud AWS B3'
  },
  'b3-supervision': {
    dir: 'b3-supervision',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'sup3',
    title: 'Supervision & Observabilité B3'
  },
  'b3-voip': {
    dir: 'b3-voip',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'vo3',
    title: 'VoIP & Téléphonie IP B3'
  },
  'b3-virtualisation': {
    dir: 'b3-virtualisation',
    chapterDir: 'chapitres',
    chapters: 6,
    idPrefix: 'vrt3',
    title: 'Virtualisation Avancée B3'
  }
};
