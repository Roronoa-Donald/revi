/**
 * Contenu du cours « Cloud Microsoft Azure B3 » (dossier `b3-cloud-azure/`).
 *
 * Les données de ce cours sont mises en page par `scripts/generate-courses.js`
 * (voir `scripts/course-kit.js`) : aucune page n'est écrite à la main ici, et
 * aucune page ne doit être éditée à la main dans le dossier b3-cloud-azure/.
 */
'use strict';

const chapitres = [
  ...require('./b3-cloud-azure/chapitres-1-3'),
  ...require('./b3-cloud-azure/chapitres-4-6')
];

const pages = require('./b3-cloud-azure/pages');

const course = {
  id: 'b3-cloud-azure',
  slug: 'b3-cloud-azure',
  brand: 'Cloud Azure B3',
  brandIcon: 'cloud',

  // Bleu Azure officiel conforme WCAG AA/AAA (4.53:1 / 9.89:1 sur fond blanc)
  accent: '#0078d4',
  accentDeep: '#004578',
  accentSoft: '#f0f9ff',
  accentBorder: '#bae6fd',

  storeKey: 'b3cloudazure:progress',

  title: 'Cloud Microsoft Azure B3 — Architecture ARM, Microsoft Entra ID, Azure RBAC, Calcul VMSS, Réseau Virtuel VNet, Azure Blob Storage, Observabilité KQL &amp; FinOps',
  description:
    'Formation d’excellence en ingénierie Cloud Microsoft Azure pour le Bachelor 3 : ' +
    'structure globale des datacenters (Régions, Zones de Disponibilité indépendantes AZ 1/2/3, Paires Régionales), hiérarchie de gouvernance ARM (Root Management Group, Abonnements, Resource Groups), conventions de nommage du Cloud Adoption Framework (CAF) et optimisation financière FinOps (Pay-As-You-Go vs Reserved Instances), ' +
    'sécurité des identités et des accès (Microsoft Entra ID / ex-Azure AD, Managed Identities sans mot de passe, contrôle d’accès basé sur les rôles Azure RBAC avec Actions/NotActions, règles de conformité Azure Policy et coffre-fort Azure Key Vault avec Soft-Delete et Purge Protection), ' +
    'services de calcul et virtualisation (dimensionnement des séries B, D, E, F, disques managés Standard HDD/SSD, Premium SSD et Ultra Disk, Availability Sets avec domaines de panne et de mise à jour, Availability Zones avec SLA 99.99%, groupes élastiques VMSS avec auto-scaling et cooldown, et PaaS managé Azure App Service avec slots de staging et swap sans interruption), ' +
    'réseau virtuel Azure VNet (plan d’adressage CIDR, les 5 adresses IP réservées par Azure dans chaque subnet, groupes de sécurité réseau NSG avec priorité de règles et règles par défaut, passerelle d’administration sécurisée Azure Bastion sans IP publique, et interconnexion privée VNet Peering Hub-and-Spoke avec transit de passerelle), ' +
    'stockage distribué et bases managées (comptes de stockage standard v2, Blob Storage avec gestion automatique du cycle de vie Hot/Cool/Cold/Archive, partages de fichiers SMB/NFS Azure Files, signatures d’accès partagé SAS Tokens et comparatif d’architectures Azure SQL Database vs Cosmos DB), ' +
    'et enfin observabilité analytique, gouvernance et automatisation (métriques temps réel Azure Monitor, alertes avec Action Groups, analyse avancée de logs dans Log Analytics avec requêtes KQL Kusto, Secure Score Microsoft Defender for Cloud, budgets Cost Management et Infrastructure as Code déclarative avec templates Bicep et ARM).',
  lead:
    'Maîtrisez l’architecture, la sécurité, le réseau et l’automatisation du Cloud Microsoft Azure : gouvernance ARM, Entra ID, RBAC, VMSS, sous-réseaux VNet, Blob Lifecycle, requêtes analytiques KQL et Infrastructure as Code Bicep. ' +
    'Six modules complets combinant rigueur d’ingénierie Cloud (AZ-104), 18 exercices interactifs de code de manière méthodique et 48 QCM d’évaluation.',

  sources: 'Supports de cours officiels Services Cloud AZURE B3-ASI (Enseignant : AGOUTOCO-POKO Caleb Benaja), Documentation Microsoft Learn Azure, Référentiels d\'examen Microsoft Certified Azure Administrator (AZ-104) et Azure Solutions Architect Expert (AZ-305)',

  chapters: chapitres.map(chapitre => ({ n: chapitre.n, title: chapitre.title })),

  render(kit) {
    return pages.render(kit, course, chapitres);
  }
};

module.exports = course;
