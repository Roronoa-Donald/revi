/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Google Cloud Platform B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Google Cloud Platform B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux de l\'architecture et de l\'ingénierie Google Cloud : Hiérarchie des ressources, SDK gcloud CLI, IAM et moindre privilège, Comptes de service et Workload Identity, Compute Engine et Managed Instance Groups (MIG), GKE et Cloud Run, Réseau VPC et adresses réservées, Règles de pare-feu et Cloud Load Balancing, Classes Cloud Storage et cycle de vie, Cloud SQL et Spanner, Cloud Pub/Sub, Operations Suite (Monitoring/Logging), FinOps (CUD/SUD) et Terraform pour GCP.</p>',
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
      description: 'Flashcards de révision du cours Google Cloud Platform B3 : Architecture, IAM, Calcul, Réseau, Données et FinOps des ' + chapterList.length + ' modules.',
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
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Google Cloud Platform B3</h1>',
    '  <p class="lead">Synthèse condensée des commandes CLI indispensables, matrices de décision de stockage, règles réseau VPC, principes IAM et syntaxes Terraform pour Google Cloud.</p>',
    '',
    '  <h2>1. Commandes Clés du SDK gcloud CLI</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Catégorie</th><th>Commande gcloud</th><th>Action / Description</th></tr></thead>',
    '    <tbody>',
    '      <tr><td>Authentification</td><td><code>gcloud auth login</code></td><td>Connecte l\'opérateur via le navigateur web</td></tr>',
    '      <tr><td>ADC</td><td><code>gcloud auth application-default login</code></td><td>Génère les identifiants locaux pour le code SDK et Terraform</td></tr>',
    '      <tr><td>Configuration</td><td><code>gcloud config set project [ID]</code></td><td>Définit le projet actif dans la configuration courante</td></tr>',
    '      <tr><td>Région par défaut</td><td><code>gcloud config set compute/region [REG]</code></td><td>Configure la région de calcul par défaut (ex: europe-west9)</td></tr>',
    '      <tr><td>Composants</td><td><code>gcloud components update</code></td><td>Met à jour les binaires du SDK Google Cloud</td></tr>',
    '      <tr><td>Instances VM</td><td><code>gcloud compute instances list</code></td><td>Liste toutes les VM Compute Engine du projet actif</td></tr>',
    '      <tr><td>Connexion SSH</td><td><code>gcloud compute ssh [VM_NAME]</code></td><td>Ouvre une session SSH sécurisée avec gestion automatique des clés</td></tr>',
    '      <tr><td>Stockage GCS</td><td><code>gcloud storage ls gs://[BUCKET]</code></td><td>Liste les objets d\'un bucket Cloud Storage (remplace gsutil)</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Matrice des Rôles IAM et Bonnes Pratiques de Sécurité</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Niveau de Rôle</th><th>Exemples / Syntaxe</th><th>Recommandation &amp; Statut</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Primitif (Basique)</strong></td><td><code>roles/viewer</code>, <code>roles/editor</code>, <code>roles/owner</code></td><td><span style="color:#b91c1c;font-weight:700;">PROSCRIT EN PRODUCTION</span> — Trop large, viole le moindre privilège.</td></tr>',
    '      <tr><td><strong>Prédéfini</strong></td><td><code>roles/storage.objectViewer</code>, <code>roles/compute.instanceAdmin.v1</code></td><td><span style="color:#15803d;font-weight:700;">RECOMMANDÉ</span> — Spécifique à un service, maintenu automatiquement par Google.</td></tr>',
    '      <tr><td><strong>Personnalisé (Custom)</strong></td><td><code>projects/[ID]/roles/[ROLE_NAME]</code></td><td><span style="color:#0369a1;font-weight:700;">AVANCÉ</span> — Assemblage sur mesure de permissions atomiques précises.</td></tr>',
    '      <tr><td><strong>Comptes de Service</strong></td><td><code>[NAME]@[PROJ].iam.gserviceaccount.com</code></td><td>Utiliser <strong>Workload Identity</strong> ; bannir les clés JSON exportées.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Matrice de Sélection des Moteurs de Données GCP</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Service GCP</th><th>Modèle de Données</th><th>Échelle / Portée</th><th>Latence / SLA</th><th>Cas d\'Usage Recommandé</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>Cloud SQL</strong></td><td>Relationnel (MySQL, PostgreSQL, SQL Server)</td><td>Régionale (HA multi-zones)</td><td>Standard (SLA 99.95%)</td><td>Applications web d\'entreprise, ERP, CMS classiques</td></tr>',
    '      <tr><td><strong>Cloud Spanner</strong></td><td>Relationnel NewSQL à cohérence stricte</td><td>Mondiale multi-régions</td><td>Faible (SLA 99.999%)</td><td>Systèmes bancaires, réservations mondiales, haute concurrence</td></tr>',
    '      <tr><td><strong>Firestore</strong></td><td>NoSQL orienté document (collections/docs)</td><td>Régionale ou Multi-région</td><td>Faible temps réel</td><td>Applications mobiles, profils utilisateurs, synchronisation</td></tr>',
    '      <tr><td><strong>Cloud Bigtable</strong></td><td>NoSQL large-colonne (Wide-column)</td><td>Régionale (clusters multi-zones)</td><td>Sub-milliseconde</td><td>Télémétrie IoT, séries temporelles, analyse financière</td></tr>',
    '      <tr><td><strong>Cloud Storage (GCS)</strong></td><td>Objets non structurés (Blobs, fichiers)</td><td>Régionale, Dual-region, Multi-region</td><td>Standard (11 9s durabilité)</td><td>Sauvegardes, datalakes, assets web, vidéos, exports</td></tr>',
    '      <tr><td><strong>BigQuery</strong></td><td>Entrepôt de données (Data Warehouse) OLAP</td><td>Multi-région (US, EU)</td><td>Secondes sur téraoctets</td><td>Analytics décisionnel, requêtes SQL massives, business intelligence</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Règles Réseau VPC, Adressage &amp; Load Balancing</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Adresses Réservées dans un Sous-Réseau VPC</h4>',
    '      <p>Chaque sous-réseau VPC réserve obligatoirement 4 adresses IP :</p>',
    '      <ul>',
    '        <li><code>.0</code> : Adresse réseau (Network)</li>',
    '        <li><code>.1</code> : Passerelle par défaut (Default Gateway)</li>',
    '        <li><code>.2</code> : Réservé par Google (DNS interne)</li>',
    '        <li><code>.255</code> (dernière) : Réservé par Google (Broadcast)</li>',
    '      </ul>',
    '      <p>Nombre d\'adresses assignables à des VMs = <code>2^(32 - prefix) - 4</code>.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Architecture Global External HTTP(S) Load Balancer</h4>',
    '      <ul>',
    '        <li><strong>Global Forwarding Rule :</strong> Adresse IP Anycast mondiale publique sur ports 80/443.</li>',
    '        <li><strong>Target HTTP(S) Proxy :</strong> Terminaison TLS avec certificats gérés par Google.</li>',
    '        <li><strong>URL Map :</strong> Routage par hôte et préfixes d\'URL vers les services backend.</li>',
    '        <li><strong>Backend Service :</strong> Groupe de backends (MIG de VMs ou NEG Cloud Run) supervisé par Health Check.</li>',
    '      </ul>',
    '    </div>',
    '  </div>',
    '',
    '  <h2>5. Formules et Bonnes Pratiques FinOps (CUD &amp; SUD)</h2>',
    '  <table class="table">',
    '    <thead><tr><th>Mécanisme</th><th>Engagement</th><th>Remise Moyenne</th><th>Application</th></tr></thead>',
    '    <tbody>',
    '      <tr><td><strong>SUD (Sustained Use Discount)</strong></td><td>Aucun (automatique)</td><td>Jusqu\'à 20% à 30%</td><td>Appliqué dès qu\'une instance tourne plus de 25% du mois civil.</td></tr>',
    '      <tr><td><strong>CUD 1 an (Committed Use)</strong></td><td>Engagement 1 an</td><td>Environ 37% de remise</td><td>Pour les charges de travail stables et pérennes.</td></tr>',
    '      <tr><td><strong>CUD 3 ans (Committed Use)</strong></td><td>Engagement 3 ans</td><td>Environ 55% de remise</td><td>Rentabilité maximale pour le socle d\'infrastructure critique.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes de révision' }, { href: 'exercices.html', label: 'Catalogue des 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento & Guide Opérationnel — ' + course.brand,
      description: 'Mémento opérationnel Google Cloud Platform B3 : Commandes CLI, Matrices IAM, Comparatifs de stockage et Formules FinOps.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
