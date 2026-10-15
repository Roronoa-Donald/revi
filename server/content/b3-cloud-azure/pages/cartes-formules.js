/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Cloud Microsoft Azure B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Cloud Microsoft Azure B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts clés de l\'administration Cloud Azure : Hiérarchie ARM, Cloud Adoption Framework, Microsoft Entra ID, Azure RBAC, Azure Policy, Séries de VM, VMSS, VNet, Adresses Réservées, NSG, Blob Storage Lifecycle, SAS Tokens, Azure SQL vs Cosmos DB, Log Analytics KQL et Cost Management.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Cloud Microsoft Azure B3 : Architecture, Sécurité, Calcul, Réseau, Stockage et Surveillance des ' + chapterList.length + ' modules.',
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
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Cloud Microsoft Azure B3</h1>',
    '  <p class="lead">Guide de référence des hiérarchies de gouvernance, matrices RBAC, paliers de SLA calcul, découpage CIDR réseau VNet, tarifs de stockage Blob et opérateurs analytiques KQL.</p>',
    '',
    '  <h2>1. Hiérarchie de Gouvernance Azure ARM &amp; Cloud Adoption Framework (CAF)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Niveau Hiérarchique</th><th>Rôle et Responsabilité</th><th>Règle de Nommage CAF</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Root Management Group</strong></td><td>Gouvernance globale du Tenant (stratégies racine, conformité groupe)</td><td><code>mg-root</code></td></tr>',
    '      <tr><td><strong>Management Group</strong></td><td>Regroupement logique d\'abonnements par environnement ou entité métier</td><td><code>mg-prod</code>, <code>mg-core</code></td></tr>',
    '      <tr><td><strong>Subscription (Abonnement)</strong></td><td>Frontière de facturation, de quotas et d\'isolation de sécurité</td><td><code>sub-corp-prod-01</code></td></tr>',
    '      <tr><td><strong>Resource Group</strong></td><td>Conteneur logique regroupant des ressources partageant le même cycle de vie</td><td><code>rg-&lt;app&gt;-&lt;env&gt;-&lt;region&gt;-&lt;num&gt;</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Matrice des Rôles Fondamentaux Azure RBAC</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Rôle RBAC</th><th>Périmètre des Actions autorisées</th><th>Exclusions (NotActions)</th><th>Cas d\'usage</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Owner</strong></td><td><code>*</code> (Accès total absolu)</td><td>Aucune (<code>[]</code>)</td><td>Administrateur responsable de l\'abonnement</td></tr>',
    '      <tr><td><strong>Contributor</strong></td><td><code>*</code> (Création, modification, suppression de ressources)</td><td>Délégation de droits RBAC et suppression de Resource Groups</td><td>Ingénieurs DevOps et administrateurs d\'infrastructure</td></tr>',
    '      <tr><td><strong>Reader</strong></td><td><code>*/read</code> (Consultation en lecture seule)</td><td>Toute action d\'écriture ou modification</td><td>Auditeurs, équipes de support niveau 1</td></tr>',
    '      <tr><td><strong>VM Operator</strong></td><td>Démarrage, redémarrage et lecture de machines virtuelles</td><td>Suppression de machines virtuelles</td><td>Exploitation courante et astreinte système</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Disponibilité Théorique (SLA) &amp; Séries de Calcul Azure</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Architecture de Calcul</th><th>SLA Contractuel</th><th>Indisponibilité max / an</th><th>Série de VM recommandée</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Single VM (Disque HDD Standard)</strong></td><td>95.00%</td><td>≈ 438 heures</td><td>Non recommandé en production</td></tr>',
    '      <tr><td><strong>Single VM (Disque SSD Standard)</strong></td><td>99.50%</td><td>≈ 43.8 heures</td><td><code>B-series</code> (Burstable dev/test)</td></tr>',
    '      <tr><td><strong>Single VM (Disque SSD Premium)</strong></td><td>99.90%</td><td>≈ 8.76 heures</td><td><code>D-series</code> (Usage général)</td></tr>',
    '      <tr><td><strong>Availability Set (Ensemble de disp.)</strong></td><td>99.95%</td><td>≈ 4.38 heures</td><td><code>E-series</code> (Mémoire intensive)</td></tr>',
    '      <tr><td><strong>Availability Zones (3 Datacenters)</strong></td><td>99.99%</td><td>≈ 52.6 minutes</td><td><code>F-series</code> (Calcul haute performance)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Adressage Réseau Azure VNet : Les 5 Adresses IP Réservées</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Offset IP</th><th>Attribution Système Azure</th><th>Fonction SDN</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>.0</code></td><td>Network ID (Adresse réseau)</td><td>Identifiant de sous-réseau IP</td></tr>',
    '      <tr><td><code>.1</code></td><td>Default Gateway</td><td>Passerelle de routage interne du VNet gérée par Azure</td></tr>',
    '      <tr><td><code>.2</code></td><td>DNS Resolver Primaire</td><td>Résolveur DNS Azure (168.63.129.16 routé en sous-réseau)</td></tr>',
    '      <tr><td><code>.3</code></td><td>DNS Resolver Secondaire</td><td>Résolution de secours et mapping Azure</td></tr>',
    '      <tr><td><code>.&lt;dernière&gt;</code> (ex: .255)</td><td>Broadcast Address</td><td>Réservée par protocole IP (non broadcastée dans Azure)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Règles par Défaut des Network Security Groups (NSG Inbound)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Priorité</th><th>Nom de la Règle</th><th>Source</th><th>Port / Proto</th><th>Action</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>65000</strong></td><td><code>AllowVNetInBound</code></td><td><code>VirtualNetwork</code></td><td>* / ANY</td><td><span class="badge badge--success">ALLOW</span></td></tr>',
    '      <tr><td><strong>65001</strong></td><td><code>AllowAzureLoadBalancerInBound</code></td><td><code>AzureLoadBalancer</code></td><td>* / ANY</td><td><span class="badge badge--success">ALLOW</span></td></tr>',
    '      <tr><td><strong>65500</strong></td><td><code>DenyAllInBound</code></td><td><code>*</code> (Internet et tout tiers)</td><td>* / ANY</td><td><span class="badge badge--danger">DENY</span></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>6. Paliers de Stockage Azure Blob &amp; Tarifs Indicatifs</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Palier (Access Tier)</th><th>Coût Stockage / Go / mois</th><th>Latence d\'accès</th><th>Cas d\'usage recommandé</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Hot</strong></td><td>0.0184 USD</td><td>Millisecondes</td><td>Données fréquemment consultées et modifiées</td></tr>',
    '      <tr><td><strong>Cool</strong></td><td>0.0100 USD</td><td>Millisecondes</td><td>Données conservées au moins 30 jours (sauvegardes court terme)</td></tr>',
    '      <tr><td><strong>Cold</strong></td><td>0.0036 USD</td><td>Millisecondes</td><td>Données conservées au moins 90 jours (accès rare)</td></tr>',
    '      <tr><td><strong>Archive</strong></td><td>0.00099 USD</td><td>Plusieurs heures (réhydratation)</td><td>Archivage légal conservé au moins 180 jours</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>7. Opérateurs Analytiques Fondamentaux KQL (Kusto Query Language)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Opérateur KQL</th><th>Rôle</th><th>Exemple de Syntaxe</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><code>where</code></td><td>Filtrage de lignes selon une condition booléenne</td><td><code>where status == "Failed" and duration_ms &gt; 500</code></td></tr>',
    '      <tr><td><code>project</code></td><td>Sélection et renommage des colonnes du résultat</td><td><code>project Timestamp, OperationName, Caller</code></td></tr>',
    '      <tr><td><code>summarize</code></td><td>Agrégation de données statistiques (comptage, moyenne)</td><td><code>summarize count() by OperationName</code></td></tr>',
    '      <tr><td><code>order by</code></td><td>Tri croissant (asc) ou décroissant (desc)</td><td><code>order by count_ desc</code></td></tr>',
    '      <tr><td><code>take</code> / <code>limit</code></td><td>Restriction du nombre de lignes retournées</td><td><code>take 10</code></td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Formules & Mémento — ' + course.brand,
      description: 'Mémento technique et fiches de référence opérationnelles Cloud Microsoft Azure B3.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
