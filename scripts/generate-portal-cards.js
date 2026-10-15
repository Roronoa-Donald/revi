'use strict';

const fs = require('fs');
const path = require('path');
const { COURSES, COURSE_DIRS } = require('../server/courses');

const ROOT = path.resolve(__dirname, '..');

const keywordsMap = {
  'linux': 'administration debian redhat bash commandes shell terminal',
  'php': 'poo objet web backend programmation composer',
  'probabilites': 'statistiques maths variables aléatoires lois proba bernoulli poisson',
  'rd_java': 'java objet poo backend jvm classes interfaces',
  'rd_winserver': 'windows server active directory powershell gpo dhcp dns hyper-v',
  'admin-vm': 'administration machines virtuelles proxmox lvm vlan hyperviseur',
  'droit': 'droit informatique rgpd propriété intellectuelle contrats licence',
  'react': 'frontend jsx composants state hooks dom virtuel javascript',
  'api-rest-flask': 'api rest flask python microservices json backend endpoints',
  'erp-si': 'erp pgp sap système information processus modélisation gestion',
  'ingenierie-besoin': 'ingénierie besoin spécifications exigences cahier des charges uml',
  'masterclass-apprendre': 'apprendre mémorisation méthode travail révision pédagogie',
  'RD-RO': 'recherche opérationnelle programmation linéaire simplexe graphes optimisation',
  'assembleur': 'assembleur avr nasm x86 registres mémoire processeur binaire',
  'Cyber securite B2': 'cybersécurité sécurité nmap snort firewall cryptographie pentest',
  'sql': 'sql base de données requêtes select jointures index sgbd',
  'csharp': 'csharp dotnet .net poo microsoft visual studio objet',
  'ccna': 'ccna réseau cisco ipv4 ipv6 routage commutation vlan lan',
  'uml': 'uml modélisation diagrammes classes cas utilisation séquence etats',
  'uiux': 'ui ux design wireframes maquettes figma ergonomie prototypage wcag',
  'docker': 'docker conteneurs images dockerfile compose volumes devops',
  'infographie': 'infographie infographie 2d 3d photoshop blender modélisation rendu',
  'preparation-web': 'atelier codage projets web html css js exercices intégration',
  'epreuves': 'annales examens partiels épreuves sujets corrigés',
  'b1-admin-windows': 'administration windows server 2012 r2 ad active directory domaines',
  'b1-algebre': 'algèbre linéaire matrices espaces vectoriels systèmes linéaires calcul',
  'b1-algo': 'algorithmique algo pseudo-code tri recherche structures de données',
  'b1-anglais': 'anglais des affaires vocabulaire communication business pro',
  'b1-reseaux': 'architecture des réseaux modèle osi tcp ip adresses câbles switches',
  'b1-bureautique': 'bureautique word excel bureautique tableur documents traitement texte',
  'b1-ccna1': 'ccna 1 introduction aux réseaux cisco matériel protocoles lan',
  'b1-architecture': 'circuits logiques booléen portes logiques architecture ordinateur cpu mémoire',
  'b1-robotique': 'robotique capteurs arduino électronique microcontrôleur robots',
  'b1-cyber': 'cybersécurité bases hygiène numérique mots de passe menaces attaques',
  'b1-droit': 'droit règles lois propriété données protection juridique',
  'b1-fr-pro': 'français professionnel rédaction synthèse expression communication',
  'b1-git': 'git versioning commit branch merge github commandes dépôt',
  'b1-c-cpp': 'langage c cpp c++ syntaxe pointeurs fonctions compilation structures',
  'b1-linux': 'linux commandes de base shell debian terminal fichiers navigation',
  'b1-merise': 'merise modélisation relationnelle mcd mld mcd modèle conceptuel données',
  'b1-php': 'php introduction syntaxe formulaires variables scripts web dynamique',
  'b1-prog-web': 'programmation web frontend html css javascript pages formulaires',
  'b1-projet': 'gestion projet cycle méthode planning livrables travail équipe',
  'b1-python': 'python syntaxe bases programmation scripts listes dictionnaires',
  'b1-sql': 'sql découverte requêtes sélection tables relationnel débutant',
  'b1-stats': 'statistiques descriptives moyenne médiane variance écart-type tableaux données',
  'b1-vb-excel': 'visual basic excel macros automatisations scripts vb vba tableur',
  'b1-virtualisation': 'virtualisation serveurs hyperviseurs vm machines virtuelles bases',
  'b3-algo': 'algorithmique avancée complexité graphes programmation dynamique arbres',
  'b3-cloud-computing': 'cloud computing iaas paas saas virtualisation architectures distribuées',
  'b3-devops': 'devops ci cd pipelines gitlab github actions automatisation conteneurs',
  'b3-document-technique': 'document technique rédaction documentation spécifications rapports ingénieur',
  'b3-etude-quantitative': 'étude quantitative qualitative sondages panels analyse données',
  'b3-firewall': 'firewall pare-feu filtrage iptables pf règles sécurité périmètre',
  'b3-github': 'git github collaboration pull requests workflows release actions',
  'b3-linux': 'linux avancé administration services systemd kernel scripts sécurité',
  'b3-agile': 'méthodes agiles scrum kanban sprint product owner user stories',
  'b3-pfsense': 'pfsense routage vpn nat filtrage passerelle réseau sécurité',
  'b3-reseau-lan': 'réseau lan avancé vlan spanning tree lacp agrégation commutateurs',
  'b3-sql': 'sql avancé requêtes imbriquées partitionnement triggers procédures stockées',
  'b3-veille': 'veille technologique curation innovation prospective flux rss techno',
  'b3-windows-server': 'windows server avancé hyper-v clustering haute disponibilité ad fs',
  'b3-anglais': 'anglais technique négociation présentations vocabulaire tech b3',
  'b3-cloud-azure': 'microsoft azure cloud vm vnet blob storage ressources cloud azure',
  'b3-cryptographie': 'cryptographie pki certificats ssl tls chiffrement symétrique asymétrique',
  'b3-google-cloud': 'google cloud platform gcp compute engine cloud storage gke kubernetes',
  'b3-hacking': 'hacking éthique tests intrusion scan vulnérabilités kali metasploit',
  'b3-cloud-aws': 'services cloud aws ec2 s3 lambda vpc iam dynamodb architectures',
  'b3-supervision': 'supervision nagios zabbix prometheus grafana monitoring métriques alertes',
  'b3-voip': 'téléphonie voip asterisk sip codecs trunk rtp communications unifiées',
  'b3-virtualisation': 'virtualisation avancée sdn vsan proxmox vmware cluster migration live'
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateCards() {
  return COURSE_DIRS.map((id, idx) => {
    const c = COURSES[id];
    let chapCount = 0;
    const chapDir = path.join(ROOT, id, 'chapitres');
    if (fs.existsSync(chapDir)) {
      chapCount = fs.readdirSync(chapDir).filter(f => f.startsWith('chapitre') && f.endsWith('.html')).length;
    }
    const hasSommaire = fs.existsSync(path.join(ROOT, id, 'sommaire.html'));
    const href = hasSommaire ? `${encodeURI(id)}/sommaire.html` : `${encodeURI(id)}/index.html`;
    const shortcut = id === 'preparation-web' ? '12 projets' : (id === 'epreuves' ? 'Annales' : (chapCount ? `${chapCount} chap` : 'Cours'));
    const accent = (c.theme && c.theme.accent) || '#2563eb';
    const kw = keywordsMap[id] || '';
    const titleSearch = escapeHtml((c.name + ' ' + id + ' ' + kw + ' ' + c.level).toLowerCase());
    const levelLabel = c.level.toUpperCase();

    return `            <a href="${href}" class="card portal-card" style="--course-accent: ${accent}; --bf-i: ${idx};" data-level="${c.level}" data-title="${titleSearch}">
                <div class="card__head">
                    <span class="card__icon" aria-hidden="true" style="color: ${accent};">
                        <svg class="ic" aria-hidden="true" focusable="false"><use href="/assets/img/ui-icons.svg#i-${c.icon}"></use></svg>
                    </span>
                    <span class="badge-level badge-level--${c.level}">${levelLabel}</span>
                </div>
                <span class="card__title">${escapeHtml(c.name)}</span>
                <div class="card__foot">
                    <span class="badge-free">Ch. 1 gratuit</span>
                    <span class="card__shortcut">${shortcut}</span>
                </div>
            </a>`;
  }).join('\n\n');
}

module.exports = { generateCards };

if (require.main === module) {
  const cards = generateCards();
  console.log(`Généré ${COURSE_DIRS.length} cartes, longueur: ${cards.length} caractères.`);
}
