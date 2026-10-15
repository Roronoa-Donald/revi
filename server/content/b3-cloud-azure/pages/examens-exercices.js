/**
 * Pages « examens » et « exercices » du cours « Cloud Microsoft Azure B3 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Cloud Microsoft Azure B3</h1>',
    '  <p class="lead">Deux épreuves complètes d’ingénierie Cloud Azure conformes aux exigences académiques Bachelor 3 et au standard de certification Microsoft Certified Azure Administrator (AZ-104) : gouvernance ARM, sécurité Entra ID &amp; RBAC, calcul VMSS, réseau VNet, stockage et observabilité KQL.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Architecture Globale, Identité Entra ID &amp; Calcul Azure', [
      '<h4>Partie 1 : Fondations ARM &amp; Résilience Régionale (6 points)</h4>',
      '<ol>',
      '  <li>Explicitez la différence fondamentale entre une Région Azure, une Zone de Disponibilité (Availability Zone) et une Paire Régionale (Paired Region). Quel est l\'impact sur le choix du type de réplication de stockage (LRS vs ZRS vs GRS) ? (3 pts)</li>',
      '  <li>Selon le Cloud Adoption Framework (CAF), quelle convention de nommage recommandez-vous pour un groupe de ressources hébergeant le back-end de facturation en production sur la région France Central ? Détaillez chaque segment. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Identité Microsoft Entra ID &amp; Contrôle d\'Accès RBAC (7 points)</h4>',
      '<ol>',
      '  <li>Un ingénieur système doit pouvoir démarrer et redémarrer des machines virtuelles dans un groupe de ressources, mais ne doit sous aucun prétexte pouvoir les supprimer ni modifier les attributions de droits. Quels rôles prédéfinis ou quelles définitions d\'actions/NotActions devez-vous configurer ? Justifiez pourquoi le rôle Contributor ne convient pas. (4 pts)</li>',
      '  <li>Quelle est la différence entre Azure Policy et Azure RBAC ? Donnez un exemple de politique permettant d\'interdire le déploiement de ressources hors de l\'Union Européenne. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Calcul &amp; Haute Disponibilité (7 points)</h4>',
      '<ol>',
      '  <li>Calculez le SLA composite d\'une application web reposant sur : un niveau Web (VM unique SSD Premium, SLA 99.9%), un niveau Métier (Availability Set, SLA 99.95%) et une base de données managée (Availability Zones, SLA 99.99%). Quelle est l\'indisponibilité annuelle maximale tolérée ? (4 pts)</li>',
      '  <li>Expliquez le fonctionnement du mécanisme de Cooldown (refroidissement) dans une règle d\'auto-scaling VMSS. Pourquoi son absence provoque-t-elle un phénomène de battement (flapping) ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Région, Zones et Paires (3 pts) :</strong> ' +
      '  Une Région Azure est un ensemble de datacenters reliés par un réseau dédié à faible latence (ex: France Central). Une Zone de Disponibilité (AZ) est un datacenter physiquement distinct au sein d\'une région, doté d\'une alimentation, d\'un refroidissement et d\'un réseau indépendants. Une Paire Régionale regroupe deux régions d\'une même zone géographique distantes d\'au moins 480 km (ex: France Central &amp; France South, West Europe &amp; North Europe). ' +
      '  Impact réplication : LRS réplique 3 fois dans un seul datacenter (vulnérable aux pannes de salle) ; ZRS réplique sur 3 AZ distinctes de la région (résiste à la destruction d\'un datacenter) ; GRS réplique 3 fois localement (LRS) puis de manière asynchrone 3 fois dans la région jumelée (résilience en cas de catastrophe régionale majeure).</li>',
      '  <li><strong>Nomenclature CAF (3 pts) :</strong> ' +
      '  Format recommandé : <code>rg-billing-prod-fc-01</code>. ' +
      '  Segment 1 (<code>rg-</code>) : type de ressource (Resource Group). ' +
      '  Segment 2 (<code>billing</code>) : nom de l\'application ou charge de travail. ' +
      '  Segment 3 (<code>prod</code>) : environnement opérationnel. ' +
      '  Segment 4 (<code>fc</code>) : code géographique abrégé pour France Central. ' +
      '  Segment 5 (<code>01</code>) : numéro d\'instance à deux chiffres.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Rôle RBAC d\'administration restreinte (4 pts) :</strong> ' +
      '  Le rôle <code>Contributor</code> ne convient pas car il accorde les droits complets de création, modification et suppression sur toutes les ressources du groupe (y compris <code>Microsoft.Compute/virtualMachines/delete</code>). ' +
      '  La solution requise est d\'attribuer le rôle personnalisé ou prédéfini <code>Virtual Machine Contributor</code> restreint, ou un rôle spécifique avec les actions : ' +
      '  <code>Actions: ["Microsoft.Compute/virtualMachines/start/action", "Microsoft.Compute/virtualMachines/restart/action", "Microsoft.Compute/virtualMachines/read"]</code> ' +
      '  et <code>NotActions: ["Microsoft.Compute/virtualMachines/delete", "Microsoft.Authorization/*/Write"]</code>.</li>',
      '  <li><strong>Azure Policy vs Azure RBAC (3 pts) :</strong> ' +
      '  RBAC gère <em>qui</em> (identité) a le droit d\'effectuer une action. Azure Policy gère <em>quelles propriétés</em> les ressources créées doivent posséder (gouvernance et garde-fous). ' +
      '  Exemple de Policy : règle <code>allowedLocations</code> avec effet <code>deny</code> restreignant les localisations à <code>["westeurope", "northeurope", "francecentral"]</code>. Toute tentative de création en dehors est rejetée par ARM dès la phase de validation.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Calcul du SLA composite (4 pts) :</strong> ' +
      '  SLA = 0.999 * 0.9995 * 0.9999 = 0.998400475, soit <strong>99.8400%</strong>. ' +
      '  Indisponibilité annuelle = (1 - 0.998400475) * 8760 heures = <strong>14.01 heures</strong> par an (environ 14 h et 40 secondes).</li>',
      '  <li><strong>Rôle du Cooldown dans VMSS (3 pts) :</strong> ' +
      '  Le Cooldown impose un délai d\'attente (ex: 5 à 10 minutes) après une opération de scale-out ou scale-in avant qu\'une nouvelle règle de mise à l\'échelle ne puisse être évaluée. ' +
      '  Sans Cooldown, les nouvelles instances en cours de boot ne traitent pas encore de charge, la métrique moyenne reste temporairement élevée, ce qui déclenche des ajouts en cascade superflus puis des suppressions brutales dès que les instances sont prêtes (battement destructeur / flapping).</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Terminal — Architecture Réseau VNet, Stockage &amp; Observabilité KQL', [
      '<h4>Partie 1 : Architecture Réseau Hub-and-Spoke &amp; Sécurité NSG (7 points)</h4>',
      '<ol>',
      '  <li>Une entreprise dispose d\'un VNet Hub (<code>10.0.0.0/16</code>) hébergeant un Azure Firewall et une Azure VPN Gateway, et de deux VNets Spokes (Spoke-Web en <code>10.1.0.0/16</code> et Spoke-DB en <code>10.2.0.0/16</code>). ' +
      '  Comment configurer les VNet Peerings et les options de transit de passerelle pour permettre aux spokes d\'utiliser la passerelle VPN du Hub ? (3.5 pts)</li>',
      '  <li>Dans un sous-réseau <code>10.1.1.0/24</code>, quelles sont les adresses IP exactes réservées par Azure et à quoi sert chacune ? Pourquoi une règle NSG Inbound de priorité 200 autorisant le port 443 prend-elle le pas sur la règle par défaut DenyAllInBound de priorité 65500 ? (3.5 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Stockage Distribué, Cycle de Vie &amp; Jetons SAS (6 points)</h4>',
      '<ol>',
      '  <li>Une plateforme de logs génère 20 To de données par mois. Les logs doivent être accessibles instantanément pendant 15 jours, puis conservés à moindre coût pendant 60 jours pour consultation mensuelle, puis archivés pendant 5 ans avant destruction. ' +
      '  Proposez la politique exacte de Lifecycle Management en précisant les paliers Azure Blob Storage et les gains financiers attendus. (3 pts)</li>',
      '  <li>Expliquez comment fonctionne un jeton Shared Access Signature (SAS) au niveau d\'Azure Blob Storage. Quels sont les paramètres obligatoires d\'un jeton pour garantir qu\'une application cliente ne puisse que télécharger un fichier précis pendant une durée de 30 minutes sans compromettre la clé d\'accès du compte de stockage ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Observabilité KQL &amp; Gestion des Coûts FinOps (7 points)</h4>',
      '<ol>',
      '  <li>Rédigez une requête KQL (Kusto Query Language) analysant la table <code>AzureActivity</code> pour renvoyer les 5 opérations ayant généré le plus d\'échecs (<code>Status == "Failed"</code>) au cours des dernières 24 heures, avec le décompte associé ordonné de manière décroissante. (4 pts)</li>',
      '  <li>Quelles sont les trois stratégies majeures de réduction des coûts (FinOps) sous Azure pour une flotte de calcul prévisible ? Précisez le niveau d\'économie moyen apporté par les Reserved Instances (1 an et 3 ans) par rapport au Pay-As-You-Go. (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Terminal', [
      '<h4>Corrigé Partie 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Transit de passerelle dans Hub-and-Spoke (3.5 pts) :</strong> ' +
      '  Sur le peering Hub -&gt; Spoke : activer <code>Allow Gateway Transit</code> (autorise les spokes à utiliser la passerelle locale du hub). ' +
      '  Sur le peering Spoke -&gt; Hub : activer <code>Use Remote Gateways</code> (indique au réseau virtuel spoke d\'utiliser la passerelle distante du hub). ' +
      '  Les spokes ne sont pas interconnectés directement par défaut : le routage inter-spoke passe par l\'Azure Firewall du Hub via des tables de routage définies par l\'utilisateur (UDR / User Defined Routes).</li>',
      '  <li><strong>Adresses IP réservées et priorités NSG (3.5 pts) :</strong> ' +
      '  Dans <code>10.1.1.0/24</code>, les 5 IPs réservées sont : ' +
      '  - <code>10.1.1.0</code> : Network ID. ' +
      '  - <code>10.1.1.1</code> : Passerelle par défaut Azure (Default Gateway). ' +
      '  - <code>10.1.1.2</code> : Résolveur DNS Azure principal. ' +
      '  - <code>10.1.1.3</code> : Résolveur DNS Azure de secours. ' +
      '  - <code>10.1.1.255</code> : Adresse de broadcast réservée. ' +
      '  Priorités NSG : Les règles sont évaluées par ordre strictement croissant de priorité (100 à 4096). La règle 200 (Allow 443) est évaluée bien avant la règle par défaut 65500 (DenyAllInBound). Dès qu\'une règle matche le paquet, son action s\'applique immédiatement et l\'évaluation s\'arrête.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Politique de Lifecycle Management (3 pts) :</strong> ' +
      '  Règle configurée : ' +
      '  - J0 à J15 : Palier <code>Hot</code> (0.0184 $/Go) pour ingestion et consultation rapide. ' +
      '  - J15 : Transition vers le palier <code>Cool</code> (0.0100 $/Go) car l\'accès devient rare (économie ≈ 45%). ' +
      '  - J75 : Transition vers le palier <code>Archive</code> (0.00099 $/Go) pour rétention longue durée (économie &gt; 94%). ' +
      '  - J1825 (5 ans) : Suppression automatique (<code>DeleteBlob</code>). ' +
      '  Cette politique réduit la facture de stockage de plus de 85% par rapport à une conservation continue en palier Hot.</li>',
      '  <li><strong>Sécurisation par Jeton SAS (3 pts) :</strong> ' +
      '  Le jeton SAS est une URI signée avec la clé du compte ou une identité Entra ID, qui accorde des privilèges délimités dans le temps sans exposer les clés maîtresses. ' +
      '  Paramètres obligatoires : ' +
      '  - <code>sp=r</code> : permission restreinte à la lecture uniquement (pas d\'écriture ni suppression). ' +
      '  - <code>st</code> et <code>se</code> : fenêtre de validité stricte (ex: début à T, expiration à T + 30 min). ' +
      '  - <code>spr=https</code> : protocole HTTPS obligatoire pour empêcher l\'interception réseau. ' +
      '  - Scope délimité au blob spécifique (pas au conteneur complet).</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Requête KQL analytique (4 pts) :</strong> ' +
      '  <code>AzureActivity</code><br>' +
      '  <code>| where TimeGenerated &gt;= ago(24h) and StatusValue == "Failed"</code><br>' +
      '  <code>| summarize FailureCount = count() by OperationNameValue</code><br>' +
      '  <code>| order by FailureCount desc</code><br>' +
      '  <code>| take 5</code></li>',
      '  <li><strong>Stratégies FinOps Azure (3 pts) :</strong> ' +
      '  1. Dimensionnement adéquat (Right-sizing) : ajuster la taille des VMs à la consommation CPU/RAM réelle mesurée par Azure Advisor. ' +
      '  2. Arrêt automatique des environnements de dev/test hors des heures ouvrées. ' +
      '  3. Instances Réservées (Azure Reserved Instances - RI) : engagement sur 1 an (≈ 30% à 40% de réduction) ou 3 ans (≈ 55% à 65% de réduction) sur les ressources de calcul stables. ' +
      '  Avantage complémentaire : Azure Hybrid Benefit (AHB) permettant de réutiliser les licences Windows Server existantes pour économiser jusqu\'à 40% supplémentaires.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'exercices.html', label: 'Voir le catalogue d\'exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Épreuves types corrigées d\'ingénierie Cloud Microsoft Azure B3 : Contrôle Continu et Examen Terminal.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Catalogue d'Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de code' }
  ]);

  const exByChapitre = [
    {
      chNum: 1,
      title: 'Architecture globale, Régions, Souscriptions & Hiérarchie ARM',
      items: [
        { id: 'az3-c1-e1', title: 'Validateur de hiérarchie ARM & Conventions de nommage CAF', level: 'Niveau 1', goal: 'Valider la structure hiérarchique de gestion Azure et vérifier la conformité du nommage CAF.' },
        { id: 'az3-c1-e2', title: 'Sélecteur de région, Zones de disponibilité et Paires géographiques', level: 'Niveau 2', goal: 'Déterminer la résilience géographique et la stratégie de réplication minimale.' },
        { id: 'az3-c1-e3', title: 'Estimateur de coûts TCO et optimisation par Instances Réservées (RI)', level: 'Niveau 3', goal: 'Calculer le budget mensuel d’une flotte de VMs et simuler l’économie apportée par les réservations.' }
      ]
    },
    {
      chNum: 2,
      title: 'Identité Microsoft Entra ID (Azure AD), RBAC & Gouvernance',
      items: [
        { id: 'az3-c2-e1', title: 'Évaluateur de permissions Azure RBAC', level: 'Niveau 1', goal: 'Analyser une définition de rôle RBAC et déterminer les autorisations administratives.' },
        { id: 'az3-c2-e2', title: 'Auditeur de conformité Azure Policy', level: 'Niveau 2', goal: 'Auditer des ressources Cloud Azure contre des règles de gouvernance déclaratives.' },
        { id: 'az3-c2-e3', title: 'Analyseur de sécurité Azure Key Vault & Expiration de secrets', level: 'Niveau 3', goal: 'Auditer la sécurité d’un Key Vault et l’état d’expiration de ses secrets.' }
      ]
    },
    {
      chNum: 3,
      title: 'Calcul & Virtualisation Azure (Azure Compute, VMSS & PaaS)',
      items: [
        { id: 'az3-c3-e1', title: 'Dimensionneur de VM Azure et calcul de SLA combiné', level: 'Niveau 1', goal: 'Sélectionner la série de VM optimale et calculer le SLA composite d’une architecture multi-tiers.' },
        { id: 'az3-c3-e2', title: 'Simulateur d\'Auto-scaling VMSS', level: 'Niveau 2', goal: 'Simuler le comportement d’un Virtual Machine Scale Set sous charge variable avec cooldown.' },
        { id: 'az3-c3-e3', title: 'Gestionnaire de déploiement Azure App Service & Slot Swap', level: 'Niveau 3', goal: 'Simuler le déploiement sur les slots de pré-production avec vérification de sonde de santé.' }
      ]
    },
    {
      chNum: 4,
      title: 'Réseau Virtuel Azure (Azure Virtual Network - VNet & Sécurité)',
      items: [
        { id: 'az3-c4-e1', title: 'Calculateur d\'adressage Azure VNet & Adresses IP réservées', level: 'Niveau 1', goal: 'Calculer la plage IP d’un sous-réseau Azure en déduisant les 5 adresses réservées.' },
        { id: 'az3-c4-e2', title: 'Moteur d\'évaluation de règles de sécurité NSG', level: 'Niveau 2', goal: 'Évaluer le filtrage d’un paquet réseau par un groupe de sécurité selon la priorité des règles.' },
        { id: 'az3-c4-e3', title: 'Validateur de Peering VNet & Topologie Hub-and-Spoke', level: 'Niveau 3', goal: 'Vérifier la validité de liens d’interconnexion en détectant les chevauchements CIDR.' }
      ]
    },
    {
      chNum: 5,
      title: 'Stockage Azure (Blob, Files, Disques) et Données Managées',
      items: [
        { id: 'az3-c5-e1', title: 'Simulateur de cycle de vie Azure Blob Storage', level: 'Niveau 1', goal: 'Appliquer des règles de gestion automatique du cycle de vie des données Blob Storage.' },
        { id: 'az3-c5-e2', title: 'Validateur de requêtes avec jetons SAS', level: 'Niveau 2', goal: 'Valider la conformité d’appels API clients face aux permissions et contraintes d’un jeton SAS.' },
        { id: 'az3-c5-e3', title: 'Sélecteur d\'architecture de données Azure', level: 'Niveau 3', goal: 'Recommander le service de stockage ou de base de données managé Azure adéquat.' }
      ]
    },
    {
      chNum: 6,
      title: 'Surveillance, Gestion des Coûts & Automatisation (IaC & KQL)',
      items: [
        { id: 'az3-c6-e1', title: 'Interpréteur de requêtes Log Analytics KQL', level: 'Niveau 1', goal: 'Exécuter un pipeline de requêtes KQL sur un jeu de journaux d’événements Azure.' },
        { id: 'az3-c6-e2', title: 'Gestionnaire d\'alertes Azure Monitor et suivi budgétaire', level: 'Niveau 2', goal: 'Évaluer des alertes métriques et surveiller les seuils d’engagement budgétaire FinOps.' },
        { id: 'az3-c6-e3', title: 'Linter et ordonnanceur de gabarit Bicep / ARM', level: 'Niveau 3', goal: 'Vérifier la validité des dépendances d’un gabarit IaC Azure et ordonnancer les déploiements.' }
      ]
    }
  ];

  const sectionsHtml = exByChapitre.map(section => {
    const cardsHtml = section.items.map(item => [
      '    <div class="card">',
      '      <div class="card__head">',
      '        <span class="badge">' + item.level + '</span>',
      '        <span class="card__num"><code>' + item.id + '</code></span>',
      '      </div>',
      '      <h4><a href="chapitre' + section.chNum + '.html#' + item.id + '">' + item.title + '</a></h4>',
      '      <p>' + item.goal + '</p>',
      '      <div class="card__foot">',
      '        <a class="card__link" href="chapitre' + section.chNum + '.html#' + item.id + '">Ouvrir dans le Module ' + section.chNum + ' ' + ic('arrow-right') + '</a>',
      '      </div>',
      '    </div>'
    ].join('\n')).join('\n');

    return [
      '  <h2>Module ' + section.chNum + ' — ' + section.title + '</h2>',
      '  <div class="grid grid-3">',
      cardsHtml,
      '  </div>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices de Code Interactifs — Cloud Microsoft Azure B3</h1>',
    '  <p class="lead">Entraînez-vous sur les 18 ateliers pratiques en Python 3 intégrés à chaque module de cours : hiérarchie CAF, RBAC, VMSS auto-scaling, sous-réseaux VNet, règles NSG, cycle de vie Blob, requêtes KQL et linter IaC Bicep.</p>',
    '',
    sectionsHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens' }, { href: 'chapitre1.html', label: 'Accéder au Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Liste complète des 18 exercices de code lab en Python 3 du cours Cloud Microsoft Azure B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
