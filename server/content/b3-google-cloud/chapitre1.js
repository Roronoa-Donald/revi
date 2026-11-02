/**
 * Chapitre 1 du cours « Google Cloud Platform B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Architecture Globale, Hiérarchie des Ressources & CLI gcloud',
  short: 'Architecture, Hiérarchie &amp; gcloud',
  toc: 'Structure mondiale des datacenters Google (Régions, Zones de disponibilité, PoP Edge Network), hiérarchie organisationnelle des ressources (Organisation, Dossiers, Projets, Ressources), règles de nommage et identifiants de projets (RFC 1035), gestion des quotas et facturation, et maîtrise des outils d\'administration (Google Cloud Console, Cloud Shell et SDK gcloud CLI).',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Lorsqu\'une entreprise amorce sa migration ou le déploiement de ses applications critiques sur Google Cloud Platform, une mauvaise structuration initiale des projets et des environnements engendre une perte de contrôle totale : autorisations IAM chaotiques, fuites budgétaires impossibles à isoler et dépassements imprévus de quotas d\'infrastructure. En tant qu\'architecte Cloud B3, vous devez concevoir dès le premier jour une hiérarchie organisationnelle rigoureuse conforme aux recommandations de Google, sélectionner les régions optimales en termes de latence et d\'empreinte carbone, et automatiser l\'administration quotidienne via le SDK gcloud CLI.',
  objectives: [
    'comprendre l\'infrastructure physique planétaire de Google Cloud : Régions, Zones de disponibilité et réseau mondial en fibre optique ;',
    'maîtriser la hiérarchie des ressources GCP : Organisation, Dossiers (Folders), Projets et Ressources ;',
    'différencier Project ID (RFC 1035), Project Name et Project Number et appliquer les conventions de nommage ;',
    'analyser le modèle de facturation, les comptes de facturation (Billing Accounts) et la gestion des quotas d\'API ;',
    'maîtriser le SDK gcloud CLI : initialisation, gestion des configurations actives, commutation de contextes et Cloud Shell ;',
    'analyser et résoudre méthodologiquement des validateurs de Project ID, des sélecteurs de régions multi-zones et des parsers de configuration CLI.'
  ],
  sections: [
    {
      title: 'Infrastructure Mondiale de Google Cloud : Régions, Zones &amp; Réseau Edge',
      html: [
        '<p>Google Cloud s\'appuie sur la même infrastructure matérielle et réseau que celle qui alimente Google Search, YouTube et Gmail. Cette infrastructure est structurée selon un maillage mondial rigoureux :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Régions Géographiques</h4>',
        '    <p>Une région est un emplacement géographique indépendant (ex: <code>europe-west9</code> à Paris, <code>europe-west1</code> en Belgique, <code>us-central1</code> dans l\'Iowa).</p>',
        '    <p>Les régions sont choisies selon la proximité des utilisateurs (faible latence), la conformité réglementaire (RGPD) et l\'empreinte carbone (indicateur <em>Low Carbon</em>).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Zones de Disponibilité (AZ)</h4>',
        '    <p>Chaque région comprend <strong>au moins 3 zones</strong> (ex: <code>europe-west9-a</code>, <code>b</code>, <code>c</code>). Certaines zones peuvent partager un centre de données : consultez la <a href="https://cloud.google.com/about/locations">carte Google Cloud</a>, consultée le 30 octobre 2026.</p>',
        '    <p>Les zones sont conçues comme des domaines de défaillance distincts. Répartir les composants et examiner leurs dépendances reste nécessaire : cette organisation ne supprime pas automatiquement tous les points uniques de défaillance (SPOF).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Réseau Mondial Privé (Edge)</h4>',
        '    <p>Google possède l\'un des plus grands réseaux privés en fibre optique au monde (câbles sous-marins transocéaniques).</p>',
        '    <p>Grâce à plus de 180 points de présence (Points of Presence - PoP), le trafic des utilisateurs entre dans le réseau Google au plus près de leur localisation via le routage Anycast.</p>',
        '  </div>',
        '</div>',
        box('standard', 'Niveaux de Service Réseau : Premium vs Standard Tier', [
          '<p>Google Cloud propose deux niveaux de transit réseau mondial :</p>',
          '<ul>',
          '  <li><strong>Premium Tier (par défaut) :</strong> le trafic est injecté immédiatement dans le réseau privé en fibre de Google au PoP le plus proche de l\'utilisateur, garantissant latence minimale et débit maximal.</li>',
          '  <li><strong>Standard Tier :</strong> le trafic transite sur l\'Internet public (FAI tiers) jusqu\'à la région cible, offrant une alternative économique pour les charges tolérantes à la gigue.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Hiérarchie Organisationnelle des Ressources Google Cloud',
      html: [
        '<p>Toutes les ressources créées dans Google Cloud s\'inscrivent dans une arborescence stricte où les politiques de sécurité (IAM) et les règles d\'organisation se propagent par héritage du haut vers le bas :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les 4 Niveaux de la Hiérarchie</h4>',
        '    <ol>',
        '      <li><strong>Organisation (Niveau 0) :</strong> Racine absolue liée au nom de domaine de l\'entreprise (ex: <code>entreprise.com</code> via Cloud Identity ou Google Workspace).</li>',
        '      <li><strong>Dossiers / Folders (Niveau 1) :</strong> Regroupements logiques hiérarchiques par département (ex: <code>Finance</code>, <code>Ingenierie</code>) ou environnement (<code>Prod</code>, <code>Staging</code>).</li>',
        '      <li><strong>Projets (Niveau 2) :</strong> Unité fondamentale de base. Toutes les ressources doivent être rattachées à un projet.</li>',
        '      <li><strong>Ressources (Niveau 3) :</strong> Instances Compute Engine, tables BigQuery, buckets Cloud Storage.</li>',
        '    </ol>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Les 3 Identifiants d\'un Projet GCP</h4>',
        '    <ul>',
        '      <li><strong>Project ID :</strong> Identifiant permanent et <em>unique au monde</em> choisi lors de la création (6 à 30 caractères, minuscules, chiffres, tirets). Immuable.</li>',
        '      <li><strong>Project Name :</strong> Nom lisible par l\'humain (ex: <code>Plateforme Vente Prod</code>). Modifiable à tout moment, non unique.</li>',
        '      <li><strong>Project Number :</strong> Numéro entier généré automatiquement par Google (ex: <code>102938475612</code>), utilisé par les comptes de service système.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', 'Héritage des Politiques IAM dans la Hiérarchie', [
          '<p>Une autorisation <em>allow</em> accordée sur un dossier est héritée par ses descendants : supprimer une liaison <em>allow</em> au niveau d\'un projet ne retire pas le rôle accordé par le dossier. Toutefois, une politique IAM <em>deny</em> applicable, attachée à une organisation, un dossier ou un projet, peut refuser des permissions prises en charge pour le principal ciblé, même si un rôle hérité les accorde. Le refus ne supprime pas le rôle ; il prime sur les autorisations.</p>',
          '<p>Une règle <em>deny</em> peut prévoir des exceptions de principaux ou de permissions ; une autre règle applicable reste évaluée. Sa condition porte sur les tags de ressource : si elle est vraie ou ne peut pas être évaluée, le refus s\'applique. La propagation des changements n\'est pas instantanée. Référence consultée le 30 octobre 2026 : <a href="https://docs.cloud.google.com/iam/docs/deny-overview">politiques IAM deny</a>.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Gestion des Quotas, Facturation &amp; Comptes de Facturation',
      html: [
        '<p>Pour protéger l\'infrastructure contre les abus et éviter des factures catastrophiques, Google Cloud applique deux types de garde-fous :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Comptes de Facturation (Cloud Billing Accounts)</h4>',
        '    <ul>',
        '      <li>Un compte de facturation est lié à un moyen de paiement (carte bancaire, facturation mensuelle sur devis pour les grands comptes).</li>',
        '      <li>Un compte de facturation peut être associé à <strong>plusieurs projets</strong>. Un projet sans compte de facturation actif ne peut exécuter aucun service payant.</li>',
        '      <li>Rôles dédiés : <code>Billing Account Administrator</code> (gestion financière) et <code>Billing Account User</code> (liaison d\'un projet au compte).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Quotas de Ressources &amp; Limites de Débit</h4>',
        '    <ul>',
        '      <li><strong>Quotas d\'allocation :</strong> limitent le volume maximal d\'une ressource dans une région (ex: 24 vCPUs de type N2 par région).</li>',
        '      <li><strong>Quotas de taux (Rate limits) :</strong> limitent la fréquence d\'appels à une API (ex: 1 000 requêtes de création par minute).</li>',
        '      <li>Les quotas préviennent les dérives de coûts imprévues et peuvent être augmentés sur demande justifiée via la console.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Administration avec le SDK gcloud CLI &amp; Cloud Shell',
      html: [
        '<p>L\'interface graphique (Google Cloud Console) est idéale pour l\'exploration, mais l\'automatisation d\'ingénierie repose sur les outils en ligne de commande :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Cloud Shell</h4>',
        '    <ul>',
        '      <li>Machine virtuelle Debian éphémère accessible directement dans le navigateur, gratuite avec 5 Go de stockage persistant dans <code>$HOME</code>.</li>',
        '      <li>SDK <code>gcloud</code>, <code>kubectl</code>, <code>terraform</code>, Python, Docker et Node.js préinstallés et pré-authentifiés avec le compte connecté.</li>',
        '      <li>Mode <em>Boîte de boost (Boost mode)</em> temporaire doublant la puissance CPU/RAM de la session.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Le SDK gcloud CLI</h4>',
        '    <p>Outil unifié pour piloter tous les services Google Cloud :</p>',
        '    <pre><code># Initialisation et authentification\ngcloud init\ngcloud auth login\n\n# Gestion des configurations\ngcloud config set project mon-projet-prod\ngcloud config set compute/region europe-west9\ngcloud config list</code></pre>',
        '    <p>Le SDK organise ses propriétés en sections : <code>core/project</code>, <code>core/account</code>, <code>compute/region</code>, <code>compute/zone</code>.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Conception de l\'arbre organisationnel : définir l\'arborescence de dossiers par direction et environnement (Dossier Production vs Hors-Production) sous l\'Organisation racine.',
    'Gouvernance des projets et respect du standard RFC 1035 : nommer rigoureusement les identifiants Project ID selon la nomenclature d\'entreprise en minuscules sans tiret terminal.',
    'Rattachement financier et monitoring budgétaire : associer chaque projet à son compte de facturation (Cloud Billing) et définir les budgets d\'alerte dès l\'initialisation.',
    'Automatisation via configurations gcloud CLI : créer des profils de configuration nommés (gcloud config configurations) pour isoler les contextes de travail Dev et Prod.'
  ],
  summary: [
    'Google Cloud déploie ses services sur des Régions géographiques indépendantes comprenant chacune au moins 3 Zones de disponibilité reliées par un réseau en fibre privé.',
    'La hiérarchie des ressources suit l\'ordre Organisation > Dossiers > Projets > Ressources : les autorisations IAM allow sont héritées, mais une politique deny applicable peut refuser des permissions prises en charge.',
    'Le Project ID est l\'identifiant unique permanent mondial (6 à 30 caractères, conforme RFC 1035), tandis que le Project Name est modifiable et le Project Number est généré par Google.',
    'Les comptes de facturation (Cloud Billing) alimentent les projets, et les quotas protègent l\'infrastructure contre les emballements de consommation.',
    'Le SDK gcloud CLI et Cloud Shell constituent les outils standards d\'ingénierie pour piloter, configurer et automatiser les déploiements GCP.'
  ],
  checklist: [
    'Savez-vous citer les 4 niveaux de la hiérarchie des ressources Google Cloud et leur ordre d\'héritage ?',
    'Connaissez-vous les règles strictes de format d\'un Project ID selon la RFC 1035 ?',
    'Comprenez-vous la différence entre Région, Zone de disponibilité et Point de présence (PoP) ?',
    'Savez-vous manipuler les configurations actives du SDK gcloud CLI (set, get, list) ?',
    'Pouvez-vous expliquer le rôle d\'un compte de facturation et son lien avec les projets Google Cloud ?'
  ],
  notions: [
    { term: 'Région GCP', def: 'Emplacement géographique indépendant composé d\'au moins trois zones de disponibilité isolées et reliées par un réseau à très faible latence.' },
    { term: 'Hiérarchie Organisationnelle', def: 'Arborescence GCP structurée en Organisation, Dossiers, Projets et Ressources permettant la délégation et l\'héritage des politiques de sécurité.' },
    { term: 'Project ID', def: 'Identifiant permanent, unique au monde et immuable d\'un projet Google Cloud respectant la norme RFC 1035.' },
    { term: 'Cloud Shell', def: 'Environnement de terminal Linux Debian dans le navigateur avec 5 Go de stockage et les outils d\'administration Cloud préconfigurés.' },
    { term: 'SDK gcloud CLI', def: 'Outil officiel en ligne de commande permettant de gérer et automatiser les ressources et configurations Google Cloud.' }
  ],
  pitfalls: [
    'Tenter de modifier le Project ID après la création d\'un projet : le Project ID est strictement immuable, seul le Project Name peut être changé.',
    'Attribuer des rôles IAM trop permissifs à l\'Organisation en supposant qu\'une modification allow au niveau d\'un projet supprime le rôle hérité ; un deny applicable peut refuser certaines permissions, sous conditions.',
    'Oublier de relier un projet à un compte de facturation actif : toutes les API de calcul, de stockage et de bases de données restent bloquées.',
    'Travailler dans la mauvaise configuration gcloud CLI sans vérifier le projet actif, risquant de supprimer accidentellement des ressources de production.'
  ],
  questions: [
    {
      stem: 'Quel est l\'ordre exact de la hiérarchie organisationnelle des ressources dans Google Cloud du niveau racine vers les ressources ?',
      opts: ['Projet > Dossier > Organisation > Ressource', 'Organisation > Dossiers > Projets > Ressources', 'Dossier > Organisation > Projet > Ressource', 'Ressource > Projet > Dossier > Organisation'],
      correct: 1,
      exp: 'La hiérarchie Google Cloud s\'organise strictement du haut vers le bas : Organisation (niveau 0) > Dossiers (niveau 1) > Projets (niveau 2) > Ressources (niveau 3).'
    },
    {
      stem: 'Laquelle de ces chaînes est un identifiant Project ID Google Cloud VALIDE selon la RFC 1035 ?',
      opts: ['mon-projet-cloud-2026', 'PROJET_PROD_1', '123-mon-projet', 'projet-super-cloud-de-test-pour-la-production-mondiale-2026'],
      correct: 0,
      exp: '« mon-projet-cloud-2026 » est valide : entre 6 et 30 caractères, lettres minuscules, chiffres et tirets, commençant par une lettre et ne se terminant pas par un tiret.'
    },
    {
      stem: 'Combien de zones de disponibilité au minimum une région Google Cloud contient-elle ?',
      opts: ['1 zone', '2 zones', '3 zones', '5 zones'],
      correct: 2,
      exp: 'Une région comprend au moins 3 zones. Leur présence ne garantit pas à elle seule la haute disponibilité : celle-ci dépend notamment de la redondance des composants et du basculement.'
    },
    {
      stem: 'Quelle commande gcloud permet de définir le projet actif dans la configuration courante ?',
      opts: ['gcloud projects select [ID]', 'gcloud config set project [ID]', 'gcloud switch project [ID]', 'gcloud use [ID]'],
      correct: 1,
      exp: 'La syntaxe standard du SDK gcloud pour définir le projet actif est « gcloud config set project [ID] » (ou « gcloud config set core/project [ID] »).'
    },
    {
      stem: 'Que se passe-t-il si un utilisateur reçoit le rôle Viewer au niveau d\'un dossier contenant 5 projets ?',
      opts: ['L\'utilisateur doit demander une validation pour chaque projet', 'Le rôle allow est hérité, mais un deny applicable peut refuser certaines permissions', 'L\'utilisateur ne peut lire que le premier projet créé', 'Le rôle est bloqué car il doit être attribué à l\'organisation'],
      correct: 1,
      exp: 'La liaison allow est héritée par les projets descendants. Une règle deny applicable au principal et aux permissions prises en charge peut toutefois les refuser ; ses conditions et exceptions doivent être vérifiées, ainsi que les autres règles deny applicables.'
    }
  ],
  flashcards: [
      { q: "Qu’est-ce que « La hiérarchie des ressources suit l'ordre strict » ?", a: "Organisation > Dossiers > Projets > Ressources : les autorisations allow sont héritées, mais un deny applicable peut refuser des permissions prises en charge." },
      { q: "Comment distinguer Project ID, Project Name et Project Number dans Google Cloud ?", a: "L'ID est mondial et immuable, de 6 à 30 caractères avec une syntaxe de type RFC 1035 ; le nom est modifiable et le numéro est attribué par Google." },
      { q: "Comment les groupes d'instances gérés (MIG) améliorent-ils l'élasticité et la disponibilité ?", a: "L'autoscaling ajuste le nombre de VM ; l'autohealing configuré utilise une sonde de santé pour recréer une instance défaillante." },
      { q: "Que prend en charge GKE Autopilot et comment sont facturées ses ressources ?", a: "Google gère les nœuds ; la facturation porte généralement sur les ressources demandées par les Pods, parfois sur les nœuds, avec d'éventuels frais de cluster." },
      { q: "Quelles adresses IPv4 une plage principale de sous-réseau Google Cloud réserve-t-elle ?", a: "Les deux premières et les deux dernières : en /24, .0, .1, .254 et .255. Il reste 2^(32-p) - 4 adresses utilisables pour un préfixe /p autorisé ; la plage comporte au moins huit adresses." },
      { q: "Comment Public Cloud NAT donne-t-il un accès sortant aux VM sans IP publique ?", a: "Il traduit leur adresse privée en une adresse IP publique du NAT pour les connexions sortantes, sans exposer directement les VM." },
      { q: "Que peut automatiser Object Lifecycle Management dans Cloud Storage ?", a: "Selon des règles comme l'âge, il peut changer la classe de stockage ou supprimer des objets." },
      { q: "Comment Cloud Logging peut-il conserver ou analyser durablement des journaux ?", a: "Il collecte les journaux configurés et des sinks peuvent les router vers Cloud Storage ou BigQuery." },
      { q: "Comment Cloud Trace et Cloud Profiler aident-ils à diagnostiquer les performances ?", a: "Trace mesure la latence des requêtes ; Profiler échantillonne notamment l'utilisation du processeur et de la mémoire par le code." },
    {
      q: 'Quels sont les 4 niveaux de la hiérarchie Google Cloud ?',
      a: '1. Organisation (racine liée au domaine) ; 2. Dossiers (Folders) ; 3. Projets ; 4. Ressources.'
    },
    {
      q: 'Quelles sont les caractéristiques d\'un Project ID Google Cloud ?',
      a: 'Unique au monde, immuable, 6 à 30 caractères, minuscules/chiffres/tirets, commence par une lettre et ne finit pas par un tiret (RFC 1035).'
    },
    {
      q: 'Quelle est la différence entre Project Name, Project ID et Project Number ?',
      a: 'Name = affichage modifiable ; ID = identifiant permanent unique mondial ; Number = entier système généré par Google.'
    },
    {
      q: 'Qu\'est-ce que Cloud Shell dans Google Cloud ?',
      a: 'Une machine virtuelle Linux gratuite dans le navigateur avec 5 Go d\'espace persistant et le SDK gcloud préconfiguré.'
    },
    {
      q: 'Comment s\'applique l\'héritage des autorisations IAM dans la hiérarchie ?',
      a: 'Une liaison allow est héritée par les descendants. Une règle deny applicable peut refuser des permissions prises en charge pour le principal, sous réserve de ses conditions et exceptions.'
    },
    {
      q: 'Quelle est la différence entre le niveau réseau Premium Tier et Standard Tier dans GCP ?',
      a: 'Premium Tier utilise le réseau privé mondial en fibre de Google dès le PoP edge le plus proche ; Standard Tier utilise l\'Internet public.'
    }
  ],
  mastery: [
    {
      title: 'Conception d\'architectures organisationnelles conformes',
      desc: 'Modéliser des hiérarchies Organisation/Dossiers/Projets selon les bonnes pratiques de gouvernance GCP.'
    },
    {
      title: 'Validation automatisée de Project IDs de manière méthodique',
      desc: 'Développer des linters garantissant la stricte conformité RFC 1035 des identifiants d\'infrastructure.'
    },
    {
      title: 'Sélection et déploiement multi-zones résilient',
      desc: 'Répartir équitablement des parcs de machines virtuelles sur les zones de disponibilité d\'une région.'
    },
    {
      title: 'Pilotage expert du SDK gcloud CLI',
      desc: 'Créer, basculer et automatiser les profils de configuration active du SDK en ligne de commande.'
    },
    {
      title: 'Gestion des quotas et contrôle budgétaire',
      desc: 'Configurer les alertes de facturation et auditer les quotas régionaux pour prévenir toute rupture de service.'
    }
  ]
};
