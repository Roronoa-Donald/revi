/**
 * Contenu du cours « Google Cloud Platform B3 » (dossier `b3-google-cloud/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-google-cloud/.
 */
'use strict';

const chapitres = [
  ...require('./b3-google-cloud/chapitres-1-3'),
  ...require('./b3-google-cloud/chapitres-4-6')
];

const pages = require('./b3-google-cloud/pages');

const course = {
  id: 'b3-google-cloud',
  slug: 'b3-google-cloud',
  brand: 'Google Cloud Platform B3',
  brandIcon: 'cloud',

  // Bleu Google officiel conforme WCAG AA/AAA (4.54:1 / 7.52:1 sur fond blanc)
  accent: '#1a73e8',
  accentDeep: '#174ea6',
  accentSoft: '#eff6ff',
  accentBorder: '#bfdbfe',

  storeKey: 'b3gcp:progress',

  title: 'Google Cloud Platform B3 — Architecture Globale, Hiérarchie des Ressources &amp; CLI gcloud, Sécurité des Identités IAM, Calcul Compute Engine, GKE &amp; Cloud Run, Réseau VPC &amp; Cloud Load Balancing, Stockage GCS, Cloud Spanner &amp; Pub/Sub, Observabilité Cloud Operations, FinOps &amp; Terraform',
  description:
    'Formation d’excellence en ingénierie et architecture Cloud Google pour le Bachelor 3 : ' +
    'structure physique mondiale des datacenters (Régions, Zones de disponibilité isolées, réseau privé mondial Anycast et PoP edge), hiérarchie organisationnelle (Organisation racine liée au domaine, Dossiers hiérarchiques, Projets et Ressources), conventions de nommage et identifiants de projets (Project ID RFC 1035, Project Name et Project Number), quotas de ressources et maîtrise des outils d\'administration (Google Cloud Console, Cloud Shell avec stockage persistant et SDK gcloud CLI), ' +
    'sécurité des identités et des accès (Cloud IAM, principe du moindre privilège, typologie des membres, rôles primitifs dépréciés, rôles prédéfinis managés, création de rôles personnalisés avec permissions atomiques, liaisons de politiques IAM et conditions contextuelles CEL, gouvernance des comptes de service, risques majeurs des clés JSON privées et déploiement de Workload Identity Federation sans clé), ' +
    'services de calcul et virtualisation (familles de machines Compute Engine E2, N2, C2, M2, instances Spot avec réduction jusqu\'à 91%, disques persistants Standard/Balanced/SSD/Extreme, calcul de SLA mono-zone 99.5% vs multi-zones 99.99%, Groupes d\'Instances Gérés MIG avec auto-scaling et auto-healing par Health Check, clusters Google Kubernetes Engine GKE Standard vs GKE Autopilot, et architectures Serverless modernes avec Cloud Run, concurrence élevée, scale-to-zero et traffic splitting), ' +
    'réseau virtuel logiciel (VPC mondial sur SDN Andromeda, mode sous-réseaux personnalisé, plan d\'adressage CIDR, les 4 adresses IP réservées par sous-réseau, passerelle Cloud NAT pour sorties sécurisées sans IP publique, règles de pare-feu avec état ordonnées par priorité de 0 à 65535 et Network Tags, interconnexions VPC Peering, Cloud VPN HA IPsec IKEv2 avec Cloud Router/BGP, Cloud Interconnect, et répartiteurs de charge mondiaux Anycast Global External HTTP(S) Load Balancer avec URL Maps et Cloud Armor WAF/DDoS), ' +
    'stockage distribué et moteurs de données (Google Cloud Storage avec 11 9s de durabilité, classes Standard, Nearline 30j, Coldline 90j, Archive 365j, règles d\'Object Lifecycle Management, Uniform Bucket-Level Access et Signed URLs, bases relationnelles Cloud SQL avec réplication HA zonale vs Cloud Spanner NewSQL mondial à cohérence stricte ACID et horloges atomiques TrueTime, bases NoSQL Firestore en temps réel vs Cloud Bigtable large-colonne sub-milliseconde, et ingestion asynchrone découplée avec Cloud Pub/Sub, topics et abonnements Pull/Push), ' +
    'et enfin observabilité, FinOps et automatisation déclarative (Google Cloud Operations Suite avec Cloud Monitoring, métriques, alertes et tableaux de bord, Cloud Logging avec requêtes de filtrage et Log Sinks vers BigQuery/GCS/PubSub, diagnostics de latence Cloud Trace et profilage Cloud Profiler, gestion financière FinOps avec budgets, alertes de seuil 50%/90%/100%, remises d\'usage continu SUD automatiques et engagements CUD 1 an/3 ans, et Infrastructure as Code avec Terraform, provider Google, état distant sécurisé sur backend GCS avec verrouillage et zéro secret en dur).',
  lead:
    'Maîtrisez l’ingénierie et l’architecture sur Google Cloud : hiérarchie des projets, IAM & Workload Identity, Compute Engine & MIG, GKE Autopilot, Cloud Run, réseau VPC mondial, Cloud Storage Lifecycle, Spanner, Pub/Sub, FinOps et Terraform. ' +
    'Six modules complets, 18 exercices interactifs de code en Python 3 et 48 QCM d’évaluation.',

  sources: 'Supports de cours officiels Services Cloud (Google Cloud) B3-ASI (Enseignant : AGOUTOCO-POKO Caleb Benaja), Documentation officielle Google Cloud Architecture Center, Référentiels d\'examen Google Cloud Certified Associate Cloud Engineer (ACE) et Professional Cloud Architect (PCA)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
