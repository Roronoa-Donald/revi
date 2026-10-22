/**
 * Chapitre 2 du cours « Google Cloud Platform B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Sécurité des Identités IAM, Comptes de Service & Stratégies d\'Accès',
  short: 'IAM, Rôles &amp; Comptes de Service',
  toc: 'Gestion des identités et des accès (Cloud IAM), principe du moindre privilège (Least Privilege), typologie des membres (utilisateurs, groupes Workspace, comptes de service), taxonomie des rôles (rôles primitifs dépréciés, rôles prédéfinis recommandés, rôles personnalisés), liaisons de rôles (Role Bindings) et conditions IAM CEL, gouvernance des comptes de service, risques des clés JSON exportées et déploiement de Workload Identity Federation sans clé.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un contexte d\'entreprise où des centaines de collaborateurs, de pipelines CI/CD et de microservices interagissent quotidiennement avec les API de Google Cloud, une mauvaise gestion des identités constitue le vecteur d\'attaque le plus critique. L\'utilisation persistante de rôles primitifs comme « Editor », l\'absence de révision des droits et la dissémination de clés privées JSON de comptes de service sur des dépôts de code entraînent régulièrement des fuites de données massives ou des piratages de calcul (crypto-jacking). En tant qu\'ingénieur sécurité Cloud B3, vous devez maîtriser la politique IAM de Google Cloud, appliquer strictement le moindre privilège avec des rôles prédéfinis ou sur mesure, et éradiquer les clés statiques au profit de Workload Identity.',
  objectives: [
    'maîtriser le triptyque IAM de Google Cloud : Membres (Who), Rôles (Can do what) et Ressources (On which resource) ;',
    'appliquer le principe du moindre privilège et bannir définitivement les rôles primitifs en production ;',
    'concevoir, tester et valider des rôles personnalisés (Custom Roles) à base de permissions atomiques ;',
    'configurer des liaisons de politiques IAM (Role Bindings) et des conditions d\'accès basées sur CEL (Common Expression Language) ;',
    'auditer le cycle de vie des comptes de service et mettre en place la rotation obligatoire des clés de moins de 90 jours ;',
    'analyser et résoudre méthodologiquement des évaluateurs de droits IAM, des linters de rôles personnalisés et des auditeurs de sécurité de comptes de service.'
  ],
  sections: [
    {
      title: 'Modèle Fondamental Cloud IAM &amp; Principe du Moindre Privilège',
      html: [
        '<p>Cloud IAM (Identity and Access Management) est le service centralisé de Google Cloud qui contrôle les autorisations d\'accès aux ressources. Il répond de manière déterministe à la question : <em>Qui</em> (identité) peut accomplir <em>quelle action</em> (rôle) sur <em>quelle ressource</em> ?</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Les Membres (Principals)</h4>',
        '    <ul>',
        '      <li><strong>Compte Google :</strong> <code>user:alice@gmail.com</code> ou compte d\'entreprise Google Workspace.</li>',
        '      <li><strong>Groupe Google :</strong> <code>group:devops@entreprise.com</code> (recommandé pour attribuer les droits en masse).</li>',
        '      <li><strong>Domaine Cloud Identity :</strong> <code>domain:entreprise.com</code>.</li>',
        '      <li><strong>Compte de service :</strong> <code>serviceAccount:app@proj.iam.gserviceaccount.com</code>.</li>',
        '      <li><strong>Public :</strong> <code>allUsers</code> ou <code>allAuthenticatedUsers</code>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Les Rôles (Collections)</h4>',
        '    <p>Un rôle regroupe un ensemble cohérent de <strong>permissions atomiques</strong>.</p>',
        '    <p>Exemple : le rôle <code>roles/storage.objectViewer</code> contient les permissions <code>storage.objects.get</code> et <code>storage.objects.list</code>.</p>',
        '    <p>On n\'attribue jamais une permission brute directement à un utilisateur : on lui attribue un rôle.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Les Ressources Cibles</h4>',
        '    <p>Le périmètre d\'application de la politique IAM.</p>',
        '    <p>Les autorisations peuvent être attachées à l\'Organisation, à un Dossier, à un Projet, ou même à une ressource spécifique (ex: un bucket Cloud Storage précis ou une table BigQuery).</p>',
        '  </div>',
        '</div>',
        box('standard', 'Le Principe du Moindre Privilège (Principle of Least Privilege)', [
          '<p>Règle d\'or de la cybersécurité : <em>chaque identité (humaine ou applicative) ne doit posséder que les autorisations strictement nécessaires à l\'exécution de sa tâche légitime, et rien de plus</em>. Donner à un développeur le rôle Editor sur tout le projet alors qu\'il n\'a besoin que d\'accéder aux logs constitue une violation grave des normes de conformité (ISO 27001, SOC 2).</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Typologie des Rôles : Primitifs, Prédéfinis &amp; Personnalisés (Custom)',
      html: [
        '<p>Google Cloud classe les rôles selon trois niveaux de granularité distincts :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Rôles Primitifs (Basiques)</h4>',
        '    <ul>',
        '      <li>Historiques : <code>Owner</code>, <code>Editor</code>, <code>Viewer</code>.</li>',
        '      <li>S\'appliquent uniformément à tous les services du projet.</li>',
        '      <li><span style="color:#b91c1c;font-weight:700;">DANGEREUX :</span> accordent des privilèges démesurés. <code>Editor</code> peut modifier le réseau et supprimer des VM. À bannir en production.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Rôles Prédéfinis (Predefined)</h4>',
        '    <ul>',
        '      <li>Conçus et maintenus par les ingénieurs Google pour chaque service.</li>',
        '      <li>Exemples : <code>roles/compute.networkAdmin</code>, <code>roles/pubsub.publisher</code>, <code>roles/cloudsql.client</code>.</li>',
        '      <li><span style="color:#15803d;font-weight:700;">RECOMMANDÉS :</span> alignés sur les responsabilités métiers courantes et mis à jour automatiquement lors de l\'ajout de fonctionnalités.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Rôles Personnalisés (Custom)</h4>',
        '    <ul>',
        '      <li>Créés sur mesure pour respecter un besoin chirurgical.</li>',
        '      <li>Composés d\'une liste explicite de permissions au format <code>service.resource.action</code>.</li>',
        '      <li>Cycle de vie : <code>ALPHA</code>, <code>BETA</code>, <code>GA</code>, <code>DEPRECATED</code>.</li>',
        '      <li>Restrictions : ne peuvent pas contenir de permissions d\'administration d\'organisation.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Liaisons IAM (Role Bindings) &amp; Conditions d\'Accès CEL',
      html: [
        '<p>Une politique IAM se matérialise sous la forme d\'un document JSON/YAML contenant un ensemble de liaisons (<code>bindings</code>). Chaque liaison associe un rôle à une liste de membres :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure d\'une Liaison IAM</h4>',
        '    <pre><code>bindings:\n- role: "roles/storage.objectViewer"\n  members:\n  - "user:dev1@cloud.corp"\n  - "group:analystes@cloud.corp"\n- role: "roles/compute.instanceAdmin.v1"\n  members:\n  - "serviceAccount:ci-runner@prod.iam.gserviceaccount.com"</code></pre>',
        '    <p>Une même politique peut contenir des dizaines de liaisons réparties selon les besoins opérationnels.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Conditions IAM avec CEL (Common Expression Language)</h4>',
        '    <p>Les conditions IAM permettent de restreindre l\'activation d\'un rôle selon des critères contextuels dynamiques :</p>',
        '    <ul>',
        '      <li><strong>Plage horaire :</strong> accès valide uniquement pendant les heures ouvrées (ex: <code>request.time.getHours("Europe/Paris") &gt;= 8</code>).</li>',
        '      <li><strong>Date d\'expiration :</strong> accès temporaire pour un prestataire révoqué automatiquement après une date.</li>',
        '      <li><strong>Attributs de ressources :</strong> restreindre l\'accès aux seuls buckets commençant par <code>gs://finance-</code>.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Comptes de Service, Risques des Clés &amp; Workload Identity',
      html: [
        '<p>Un compte de service (Service Account) est une identité spéciale représentant une application ou une VM, et non un être humain. Son adresse se termine obligatoirement par <code>@&lt;projet&gt;.iam.gserviceaccount.com</code> :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Le Danger Critique des Clés JSON Téléchargées</h4>',
        '    <ul>',
        '      <li>Une clé de compte de service est un fichier JSON contenant une clé privée RSA valide 10 ans par défaut.</li>',
        '      <li>Si ce fichier est commité dans Git, stocké sur un PC portable ou partagé sur Slack, un pirate acquiert un accès direct permanent à votre infrastructure Cloud.</li>',
        '      <li>Le référentiel CIS GCP Benchmark impose une <strong>rotation obligatoire tous les 90 jours</strong> pour toute clé utilisateur existante.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>La Solution Moderne : Workload Identity</h4>',
        '    <p>Recommandation absolue de Google pour sécuriser conteneurs et pipelines CI/CD :</p>',
        '    <ul>',
        '      <li><strong>GKE Workload Identity :</strong> lie un ServiceAccount Kubernetes standard à un compte de service GCP IAM sans aucune clé secrète dans le pod.</li>',
        '      <li><strong>Workload Identity Federation :</strong> permet à des services externes (GitHub Actions, AWS, Azure, GitLab) d\'échanger des jetons OIDC contre des jetons d\'accès Google Cloud temporaires à durée de vie courte (1 heure). <strong>Zéro clé statique à gérer !</strong></li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', 'Impersonation de Compte de Service', [
          '<p>Au lieu de donner aux administrateurs des droits permanents sur les données, on leur accorde le rôle <code>roles/iam.serviceAccountTokenCreator</code> sur un compte de service dédié. L\'administrateur « endosse » temporairement l\'identité du compte via la commande <code>gcloud --impersonate-service-account</code>, garantissant une traçabilité parfaite dans les journaux d\'audit.</p>'
        ])
      ].join('\n')
    }
  ],
  method: [
    'Inventaire des besoins et cartographie des rôles : identifier les permissions réelles requises par les équipes et sélectionner systématiquement des rôles prédéfinis spécifiques plutôt que primitifs.',
    'Structuration des affectations via des groupes Workspace : n\'attribuer jamais de rôles IAM à des adresses email individuelles, mais uniquement à des groupes d\'entreprise (ex: group:dev-backend@corp.com) pour faciliter le cycle de vie RH.',
    'Gouvernance stricte des comptes de service : interdire la création de clés JSON utilisateur via les contraintes de politique d\'organisation (constraints/iam.disableServiceAccountKeyCreation).',
    'Déploiement de Workload Identity Federation : configurer l\'authentification fédérée sans clé pour tous les clusters GKE et les pipelines de déploiement continu (GitHub Actions / GitLab CI).'
  ],
  summary: [
    'Cloud IAM applique le principe du moindre privilège en liant des Membres à des Rôles sur des Ressources ciblées.',
    'Les rôles primitifs (Viewer, Editor, Owner) sont trop permissifs et proscrits en production au profit des rôles prédéfinis ou sur mesure (Custom Roles).',
    'Les rôles personnalisés se composent de permissions atomiques au format service.resource.action et suivent un cycle de vie contrôlé.',
    'Les conditions IAM CEL permettent d\'ajouter des restrictions contextuelles d\'accès temporelles ou par nom de ressource.',
    'Les clés de comptes de service statiques présentent un risque majeur de sécurité ; elles doivent être remplacées par Workload Identity Federation.'
  ],
  checklist: [
    'Savez-vous expliquer la différence entre un membre, un rôle et une permission atomique dans GCP ?',
    'Pouvez-vous justifier pourquoi le rôle Editor ne doit jamais être accordé en production ?',
    'Connaissez-vous le format d\'une permission Google Cloud (service.resource.action) ?',
    'Savez-vous écrire une condition IAM CEL pour restreindre un accès dans le temps ?',
    'Comprenez-vous le fonctionnement et les bénéfices de Workload Identity par rapport à une clé JSON ?'
  ],
  notions: [
    { term: 'Cloud IAM', def: 'Système d\'autorisation centralisé de Google Cloud contrôlant qui peut effectuer quelles actions sur quelles ressources.' },
    { term: 'Rôle Prédéfini (Predefined Role)', def: 'Rôle managé par Google offrant un ensemble précis de permissions adaptées à un métier ou un service particulier.' },
    { term: 'Compte de Service (Service Account)', def: 'Identité Google Cloud non humaine utilisée par des applications et des serveurs pour interagir avec les API de façon sécurisée.' },
    { term: 'Conditions IAM (CEL)', def: 'Expressions logiques basées sur Common Expression Language conditionnant l\'application d\'un rôle à des critères temporels ou de contexte.' },
    { term: 'Workload Identity Federation', def: 'Mécanisme permettant à des charges de travail externes ou conteneurisées d\'accéder aux ressources GCP sans manipuler de clés privées statiques.' }
  ],
  pitfalls: [
    'Attribuer le rôle Owner ou Editor à une application pour « faciliter les tests », lui ouvrant ainsi les droits de modification sur l\'intégralité du projet.',
    'Télécharger une clé JSON de compte de service et l\'ajouter dans un dépôt Git public ou privé : des robots scannent en permanence le web pour exploiter ces clés.',
    'Assigner des droits IAM directement à des comptes utilisateurs personnels sans passer par des groupes d\'entreprise, rendant l\'audit d\'accès ingérable lors des départs de salariés.',
    'Ignorer les clés de compte de service anciennes sans mettre en place de politique de rotation sous 90 jours.'
  ],
  questions: [
    {
      stem: 'Pourquoi l\'attribution de rôles primitifs (comme roles/editor) est-elle proscrite dans un environnement de production ?',
      opts: ['Parce qu\'ils sont payants', 'Parce qu\'ils accordent des privilèges excessifs sur tous les services du projet et violent le moindre privilège', 'Parce qu\'ils ne fonctionnent pas avec Linux', 'Parce qu\'ils empêchent l\'accès à la console'],
      correct: 1,
      exp: 'Les rôles primitifs accordent des permissions très larges sur l\'ensemble des services GCP, ce qui expose l\'entreprise à des erreurs catastrophiques ou à des failles de sécurité majeures.'
    },
    {
      stem: 'Quelle est la recommandation de sécurité officielle de Google Cloud pour authentifier des conteneurs GKE auprès des API GCP sans manipuler de clés statiques ?',
      opts: ['Télécharger une clé JSON sur chaque conteneur', 'Utiliser GKE Workload Identity pour lier le compte Kubernetes au compte IAM', 'Donner le rôle Owner au cluster', 'Désactiver l\'authentification sur les API'],
      correct: 1,
      exp: 'GKE Workload Identity associe directement le ServiceAccount Kubernetes au compte de service GCP, éliminant totalement le besoin de générer ou de stocker des clés JSON privées.'
    },
    {
      stem: 'Quel est le format standard d\'une permission atomique dans Google Cloud ?',
      opts: ['action:resource:service', 'service.resource.action (ex: compute.instances.create)', 'service/action/resource', 'permission_service_action'],
      correct: 1,
      exp: 'Les permissions atomiques GCP respectent rigoureusement la convention à trois segments « service.resource.action » (ex: storage.buckets.list ou compute.instances.start).'
    },
    {
      stem: 'Selon le référentiel de conformité CIS Google Cloud Benchmark, quel est l\'âge maximal autorisé pour une clé de compte de service avant rotation obligatoire ?',
      opts: ['30 jours', '90 jours', '180 jours', '365 jours'],
      correct: 1,
      exp: 'Le benchmark CIS GCP impose une rotation obligatoire des clés gérées par l\'utilisateur au minimum tous les 90 jours pour limiter la durée d\'exposition en cas de fuite discrète.'
    },
    {
      stem: 'Quel langage d\'expression est utilisé pour définir des conditions d\'accès dynamiques dans les liaisons IAM Google Cloud ?',
      opts: ['SQL', 'JavaScript', 'CEL (Common Expression Language)', 'Bash'],
      correct: 2,
      exp: 'Google Cloud utilise CEL (Common Expression Language), un langage d\'expression rapide et sûr développé par Google, pour évaluer les conditions logiques et temporelles d\'activation des rôles.'
    }
  ],
  flashcards: [
    {
      q: 'Qu\'est-ce que le principe du moindre privilège dans Google Cloud IAM ?',
      a: 'La règle accordant à chaque utilisateur ou application uniquement les permissions strictement nécessaires à sa mission.'
    },
    {
      q: 'Pourquoi les rôles primitifs (Viewer, Editor, Owner) sont-ils déconseillés ?',
      a: 'Car ils s\'appliquent globalement à tous les services du projet sans granularité, octroyant des droits excessifs.'
    },
    {
      q: 'Quelle est la structure d\'un nom de compte de service dans Google Cloud ?',
      a: '[nom]@[projet-id].iam.gserviceaccount.com.'
    },
    {
      q: 'Quel est le risque majeur des clés privées JSON de comptes de service ?',
      a: 'Le risque de fuite accidentelle (Git, postes) offrant un accès permanent non contrôlé à l\'infrastructure.'
    },
    {
      q: 'Comment Workload Identity améliore-t-il la sécurité des conteneurs ?',
      a: 'Il remplace les clés JSON statiques par des jetons temporaires éphémères négociés automatiquement.'
    },
    {
      q: 'Quel est le délai de rotation recommandé par le CIS Benchmark pour les clés de comptes de service ?',
      a: 'Tous les 90 jours au maximum.'
    }
  ],
  mastery: [
    {
      title: 'Mise en œuvre du principe du moindre privilège',
      desc: 'Remplacer méthodiquement tous les rôles primitifs par des rôles prédéfinis ciblés dans les projets d\'entreprise.'
    },
    {
      title: 'Création et linter de rôles personnalisés de manière méthodique',
      desc: 'Programmer des validateurs vérifiant la syntaxe atomique des permissions et l\'absence de privilèges d\'organisation interdits.'
    },
    {
      title: 'Sécurisation et gouvernance des comptes de service',
      desc: 'Auditer l\'âge des clés privées et planifier la rotation automatisée à 90 jours conformément aux règles CIS.'
    },
    {
      title: 'Déploiement de configurations Workload Identity',
      desc: 'Configurer l\'authentification fédérée sans clé pour les pods GKE et les pipelines d\'intégration continue.'
    },
    {
      title: 'Rédaction de conditions d\'accès dynamiques avec CEL',
      desc: 'Restreindre les accès aux plages de travail et aux ressources labellisées via des conditions IAM avancées.'
    }
  ]
};
