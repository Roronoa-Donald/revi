/**
 * Chapitre 6 du cours « Cloud Microsoft Azure B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Surveillance, Gestion des Coûts &amp; Automatisation (IaC &amp; KQL)',
  short: 'Surveillance, FinOps &amp; IaC',
  toc: 'Observabilité de bout en bout avec Azure Monitor, collecte de métriques et alertes automatisées (Action Groups), analyse des journaux dans un espace Log Analytics Workspace avec le langage de requête KQL (Kusto Query Language), évaluation de la posture de sécurité avec Microsoft Defender for Cloud et le Secure Score, gouvernance financière FinOps avec Azure Cost Management et budgets d’alerte, et automatisation déclarative par Infrastructure as Code (IaC Bicep et templates ARM).',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans un parc de plusieurs centaines de machines virtuelles et microservices dans le Cloud, attendre qu\'un utilisateur signale une panne ou découvrir une facture mensuelle imprévue avec 15 000 euros de surcoût révèle un défaut critique de gouvernance. En tant qu\'ingénieur DevOps et Cloud B3, vous devez instrumenter la supervision continue avec Azure Monitor, configurer des alertes intelligentes sur seuils CPU et budgétaires, auditer les logs de sécurité et d\'application via des requêtes analytiques KQL puissantes dans Log Analytics, améliorer le Secure Score dans Defender for Cloud et industrialiser les déploiements de ressources reproductibles grâce à des gabarits Infrastructure as Code Bicep / ARM.',
  objectives: [
    'maîtriser la collecte télémétrique (métriques, logs d\'activité, diagnostics) avec Azure Monitor ;',
    'configurer des règles d\'alerte métriques et budgétaires déclenchant des Action Groups (email, SMS, webhooks) ;',
    'interroger efficacement les journaux d\'infrastructure avec KQL (Kusto Query Language) : where, project, summarize, order by, take ;',
    'évaluer et renforcer la posture de sécurité de l\'entreprise avec Microsoft Defender for Cloud et le Secure Score ;',
    'maîtriser les principes du FinOps, le suivi des budgets Cost Management et les prévisions de dépenses (Forecast) ;',
    'concevoir, valider et ordonnancer des gabarits déclaratifs d\'Infrastructure as Code (IaC Bicep et ARM templates) ;',
    'analyser et résoudre méthodologiquement des moteurs d\'exécution KQL, des gestionnaires d\'alertes métriques et des linters de gabarits IaC.'
  ],
  sections: [
    {
      title: 'Observabilité Globale avec Azure Monitor &amp; Règles d\'Alerte',
      html: [
        '<p>Azure Monitor est la plateforme unifiée de collecte, d\'analyse et d\'action sur la télémétrie de l\'ensemble des ressources Azure et sur site :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Les Deux Piliers Télémétriques</h4>',
        '    <ul>',
        '      <li><strong>Métriques (Metrics) :</strong> données numériques légères collectées en temps quasi réel (intervalles d\'une minute) décrivant l\'état instantané des ressources (pourcentage CPU, mémoire disponible, octets réseau, IOPS disque). Idéales pour l\'alerte immédiate et l\'auto-scaling.</li>',
        '      <li><strong>Journaux (Logs) :</strong> enregistrements textuels structurés ou semi-structurés (événements système, Activity Logs ARM, logs d\'authentification Entra ID, Syslog Linux). Stockés et indexés dans Log Analytics.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Règles d\'Alerte &amp; Action Groups</h4>',
        '    <ul>',
        '      <li><strong>Condition d\'alerte :</strong> évaluation d\'une métrique (ex: CPU &gt; 80% pendant 5 min) ou d\'une requête de log.</li>',
        '      <li><strong>Sévérités normalisées :</strong> de <code>Sev0</code> (Critique - service interrompu) à <code>Sev4</code> (Informationnelle / Audit).</li>',
        '      <li><strong>Action Groups (Groupes d\'actions) :</strong> définissent la cible de la notification : envoi d\'emails, SMS, notifications push, appel de webhooks (Teams/Slack), déclenchement d\'une Azure Automation Runbook ou d\'une Azure Function pour auto-remédiation.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Analyse Avancée des Journaux avec Log Analytics &amp; KQL (Kusto Query Language)',
      html: [
        '<p>Un Log Analytics Workspace est l\'environnement d\'ingestion et d\'indexation où convergent les journaux de vos serveurs, réseaux et services PaaS. KQL est le langage de requête déclaratif ultra-rapide utilisé pour explorer ces téraoctets de données :</p>',
        '<table class="table">',
        '  <thead><tr><th>Opérateur KQL</th><th>Rôle et Fonction</th><th>Exemple Concret de Syntaxe</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><code>where</code></td><td>Filtrez les lignes correspondant à un prédicat logique booléen.</td><td><code>AzureActivity | where Status == "Failed" and DurationMs &gt; 1000</code></td></tr>',
        '    <tr><td><code>project</code></td><td>Sélectionne, ordonne ou renomme les colonnes à afficher dans le résultat.</td><td><code>| project TimeGenerated, OperationName, Caller, ResourceGroup</code></td></tr>',
        '    <tr><td><code>summarize</code></td><td>Agrège les lignes par regroupement (fonctions <code>count()</code>, <code>avg()</code>, <code>sum()</code>, <code>dcount()</code>).</td><td><code>| summarize FailureCount = count() by OperationName</code></td></tr>',
        '    <tr><td><code>order by</code> / <code>sort by</code></td><td>Triez les enregistrements de manière ascendante (<code>asc</code>) ou descendante (<code>desc</code>).</td><td><code>| order by FailureCount desc</code></td></tr>',
        '    <tr><td><code>take</code> / <code>limit</code></td><td>Restreint le nombre d\'enregistrements renvoyés par la requête.</td><td><code>| take 10</code></td></tr>',
        '  </tbody>',
        '</table>',
        box('standard', 'Exemple de Requête KQL d\'Audit des Défaillances Système', [
          '<pre><code>AzureActivity\n| where TimeGenerated >= ago(24h)\n| where Status == "Failed"\n| summarize TotalErreurs = count() by OperationName, Caller\n| order by TotalErreurs desc\n| take 5</code></pre>',
          '<p>Cette requête identifie en une fraction de seconde les 5 opérations ayant provoqué le plus grand nombre d\'échecs au cours des dernières 24 heures ainsi que les comptes administrateurs ou services à l\'origine des requêtes.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Microsoft Defender for Cloud, FinOps Budgets &amp; Infrastructure as Code (Bicep)',
      html: [
        '<p>La maîtrise globale du Cloud conjugue posture de sécurité, contrôle budgétaire et industrialisation du code :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Sécurité : Defender for Cloud &amp; Secure Score</h4>',
        '    <ul>',
        '      <li><strong>Secure Score :</strong> note globale sur 100% reflétant la conformité de votre tenant face aux recommandations de sécurité Microsoft et aux standards internationaux (ISO 27001, CIS Benchmark).</li>',
        '      <li><strong>Recommandations automatisées :</strong> chiffrements des disques non activés, ports d\'administration ouverts sur Internet, authentification MFA non requise.</li>',
        '      <li><strong>Protection contre les menaces :</strong> alertes en temps réel sur les attaques par force brute RDP/SSH et les comportements suspects de conteneurs ou bases de données.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>FinOps &amp; IaC (Bicep / ARM)</h4>',
        '    <ul>',
        '      <li><strong>Azure Cost Management :</strong> création de budgets mensuels alertant à 80% (Spend réel) et 100% (Spend prévisionnel Forecast).</li>',
        '      <li><strong>Bicep :</strong> langage déclaratif moderne conçu par Microsoft comme une évolution élégante des templates JSON ARM : syntaxe concise, vérification de types à la compilation, et gestion automatique des dépendances <code>dependsOn</code>.</li>',
        '      <li><strong>Idempotence :</strong> redéployer un template Bicep plusieurs fois produit toujours le même état cible sans créer de doublons.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Déploiement centralisé d\'un Log Analytics Workspace : activer les paramètres de diagnostic (Diagnostic Settings) sur toutes les ressources pour acheminer automatiquement métriques et logs vers Log Analytics.',
    'Création des alertes métriques et des budgets d\'avertissement FinOps : associer des Action Groups aux alertes CPU/RAM et fixer des seuils d\'alerte budgétaire à 80% (réel) et 100% (prévisionnel).',
    'Optimisation du Secure Score dans Defender for Cloud : passer en revue les recommandations prioritaires et appliquer les remédiations (chiffrement, suppression d\'IP publiques, MFA obligatoire).',
    'Automatisation des déploiements par templates Bicep : écrire l\'infrastructure complète en code déclaratif Bicep, valider l\'absence de dépendances circulaires et industrialiser dans une chaîne CI/CD.'
  ],
  summary: [
    'Azure Monitor centralise les métriques (données numériques temps réel) et les logs (événements structurés) pour assurer l\'observabilité totale.',
    'Les Action Groups automatisent les notifications et les remédiations lors du déclenchement d\'alertes de sévérité Sev0 à Sev4.',
    'KQL (Kusto Query Language) offre un pipeline d\'opérateurs hautement performant (where, summarize, project, order by, take) pour explorer les journaux.',
    'Microsoft Defender for Cloud évalue la posture de sécurité globale via le Secure Score et détecte les menaces actives.',
    'Azure Cost Management contrôle les budgets FinOps, tandis qu\'Infrastructure as Code (Bicep / ARM) garantit des déploiements déclaratifs et idempotents.'
  ],
  checklist: [
    'Connaissez-vous la différence d\'utilisation entre les métriques Azure Monitor et les journaux Log Analytics ?',
    'Savez-vous écrire une requête KQL filtrant les erreurs et regroupant par nom d\'opération ?',
    'Comprenez-vous le rôle du Secure Score dans l\'évaluation de la sécurité d\'un tenant Azure ?',
    'Quelle est la différence entre une alerte budgétaire sur dépense réelle (Actual) et prévisionnelle (Forecasted) ?',
    'Pourquoi l\'Infrastructure as Code avec Bicep est-elle supérieure à l\'administration manuelle par le portail web ?'
  ],
  notions: [
    { term: 'Log Analytics Workspace', def: 'Environnement de stockage et d\'indexation centralisé de télémétrie Azure où sont exécutées les requêtes d\'analyse KQL.' },
    { term: 'KQL (Kusto Query Language)', def: 'Langage de requête en pipeline utilisé dans Azure Monitor, Microsoft Sentinel et Azure Data Explorer pour le traitement de logs massifs.' },
    { term: 'Action Group', def: 'Collection de récepteurs de notifications (emails, SMS, webhooks, fonctions) déclenchée lors de l\'activation d\'une règle d\'alerte Azure Monitor.' },
    { term: 'Secure Score', def: 'Indicateur chiffré en pourcentage mesurant la posture de sécurité d\'un environnement Azure par rapport aux recommandations de Microsoft Defender.' },
    { term: 'Bicep', def: 'Langage de programmation déclaratif spécifique à Azure (DSL) simplifiant l\'écriture de gabarits d\'Infrastructure as Code (IaC).' }
  ],
  pitfalls: [
    'Rédiger des requêtes KQL sans filtre temporel (ago(1h) ou ago(24h)), forçant Log Analytics à scanner des mois de logs et dégradant les temps de réponse.',
    'Configurer des alertes de sévérité Sev0 sans notification téléphonique ni astreinte, laissant des incidents critiques non traités.',
    'Ne surveiller que les dépenses réelles et ignorer les prévisions (Forecast) : le budget peut être déjà dépassé avant que l\'alerte sur le spend réel ne se déclenche.',
    'Créer des dépendances circulaires dans un gabarit Bicep (ex: ressource A dépend de B qui dépend de A), provoquant l\'échec immédiat de la validation ARM.'
  ],
  questions: [
    {
      stem: 'Quel opérateur KQL est utilisé pour filtrer les lignes d\'une table de journaux selon une condition logique ?',
      opts: ['select', 'filter', 'where', 'having'],
      correct: 2,
      exp: 'En langage KQL (Kusto Query Language), l\'opérateur where permet de filtrer les enregistrements d\'une table selon un prédicat booléen (ex: where Status == "Failed").'
    },
    {
      stem: 'Quel opérateur KQL permet d\'agréger des résultats pour calculer le nombre d\'occurrences d\'un événement par catégorie (ex: par type d\'opération) ?',
      opts: ['group by', 'summarize count() by', 'aggregate()', 'count_distinct'],
      correct: 1,
      exp: 'L\'opérateur summarize count() by <colonne> regroupe les enregistrements par les valeurs distinctes de la colonne et calcule le total d\'occurrences pour chaque groupe.'
    },
    {
      stem: 'Quel outil de surveillance de la sécurité fournit le Secure Score pour évaluer la posture de conformité d\'un tenant Azure ?',
      opts: [
        'Azure Cost Management',
        'Microsoft Defender for Cloud',
        'Azure Network Watcher',
        'Azure Bastion'
      ],
      correct: 1,
      exp: 'Microsoft Defender for Cloud (anciennement Azure Security Center) évalue en continu les configurations et calcule le Secure Score avec des recommandations prioritaires.'
    },
    {
      stem: 'Dans Azure Monitor, quel composant regroupe la liste des destinataires (adresses email, numéros SMS, webhooks Teams/Slack) appelés lorsqu\'une alerte se déclenche ?',
      opts: ['Notification Hub', 'Action Group', 'Alert Manager', 'Dispatch Queue'],
      correct: 1,
      exp: 'Un Action Group regroupe l\'ensemble des actions de notification et de remédiation automatisée à exécuter lors du déclenchement d\'une règle d\'alerte.'
    },
    {
      stem: 'Quelle est la sévérité d\'alerte Azure Monitor correspondant au niveau d\'urgence le plus critique (panne majeure bloquante) ?',
      opts: ['Sev0', 'Sev1', 'Sev3', 'Sev4'],
      correct: 0,
      exp: 'Les alertes Azure Monitor s\'échelonnent de Sev0 (Critique absolue / panne totale) à Sev4 (Informationnelle / Audit).'
    },
    {
      stem: 'Quel est l\'avantage du langage déclaratif Bicep par rapport aux templates JSON Azure Resource Manager (ARM) traditionnels ?',
      opts: [
        'Bicep ne fonctionne que sous Linux',
        'Syntaxe beaucoup plus concise et lisible, absence de guillemets et accolades superflues, et validation de types native',
        'Bicep est payant tandis qu\'ARM est gratuit',
        'Bicep supprime les règles de pare-feu'
      ],
      correct: 1,
      exp: 'Bicep est un DSL moderne conçu par Microsoft offrant une syntaxe modulaire et épurée tout en compilant directement en templates ARM standards de manière totalement transparente.'
    },
    {
      stem: 'Dans un budget Azure Cost Management, quelle est la différence entre une alerte basée sur "Actual" et une alerte basée sur "Forecasted" ?',
      opts: [
        'Actual concerne les devises en euros, Forecasted en dollars',
        'Actual se déclenche sur les dépenses réelles déjà facturées, Forecasted sur la projection mathématique de dépassement d\'ici la fin du mois',
        'Forecasted s\'applique uniquement aux disques SSD',
        'Il n\'y a aucune différence technique'
      ],
      correct: 1,
      exp: 'Une alerte "Actual" surveille la somme réellement consommée à l\'instant T, tandis que "Forecasted" utilise l\'analyse prédictive de consommation pour alerter dès que la trajectoire projetée dépasse le budget avant la fin du cycle mensuel.'
    },
    {
      stem: 'Que se passe-t-il lors du déploiement d\'un gabarit d\'Infrastructure as Code ARM ou Bicep contenant une dépendance circulaire entre deux ressources ?',
      opts: [
        'Le moteur ARM crée une ressource fictive pour casser la boucle',
        'Le déploiement échoue immédiatement lors de l\'étape de validation préalable avec une erreur de dépendance circulaire',
        'Le déploiement prend 48 heures',
        'Azure ignore la directive dependsOn'
      ],
      correct: 1,
      exp: 'Le moteur d\'orchestration ARM construit un graphe acyclique dirigé (DAG) avant tout déploiement. Si une boucle est détectée, la validation échoue immédiatement et aucune ressource n\'est créée.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre les métriques et les logs dans Azure Monitor ?',
      a: 'Les métriques sont des valeurs numériques légères en temps quasi réel idéales pour l\'alerte immédiate ; les logs sont des événements textuels détaillés analysés dans Log Analytics.'
    },
    {
      q: 'Quels sont les opérateurs de base de la structure d\'une requête KQL ?',
      a: 'Table | where <filtre> | project <colonnes> | summarize <agrégat> by <groupe> | order by <tri> | take <limite>.'
    },
    {
      q: 'Qu\'est-ce que le Secure Score dans Microsoft Defender for Cloud ?',
      a: 'Une note en pourcentage mesurant la posture de sécurité d\'un abonnement Azure en fonction du respect des bonnes pratiques et recommandations de sécurité.'
    },
    {
      q: 'À quoi sert un Action Group dans Azure Monitor ?',
      a: 'À définir les cibles et moyens de notification (emails, SMS, webhooks, Azure Functions) activés lors du déclenchement d\'une règle d\'alerte.'
    },
    {
      q: 'Quel est l\'intérêt d\'une alerte de budget "Forecasted" par rapport à "Actual" dans Cost Management ?',
      a: 'Elle alerte par anticipation dès que la tendance de consommation prédit un dépassement du budget d\'ici la fin du mois, avant même que l\'argent ne soit dépensé.'
    },
    {
      q: 'Qu\'est-ce que Bicep dans l\'écosystème Azure ?',
      a: 'Un langage déclaratif d\'Infrastructure as Code (DSL) concis et modulaire qui simplifie la création de gabarits Azure et se compile en templates JSON ARM.'
    }
  ],
  mastery: [
    {
      title: 'Création d\'un centre opérationnel d\'observabilité (SOC) avec Log Analytics',
      desc: 'Centraliser les Diagnostic Settings de tous les VNets, VMs et passerelles dans un workspace et concevoir des classeurs (Workbooks) interactifs.'
    },
    {
      title: 'Développement de requêtes KQL avancées de détection d\'anomalies',
      desc: 'Écrire des requêtes corrélant les logs d\'accès web et les journaux de sécurité pour isoler les attaques par déni de service et tentatives d\'intrusion.'
    },
    {
      title: 'Gouvernance FinOps proactive et alertes de prévision budgétaire',
      desc: 'Structurer des budgets départementaux avec suivi de trajectoire (Forecast) et automatisation de l\'extinction des VMs de dev en cas de dépassement.'
    },
    {
      title: 'Industrialisation complète de l\'infrastructure par modules Bicep',
      desc: 'Développer des modules Bicep réutilisables (réseau, sécurité, calcul, stockage) testés par linters et déployés automatiquement via GitHub Actions.'
    },
    {
      title: 'Automatisation d\'évaluation d\'alertes et de templates de manière méthodique',
      desc: 'Programmer des moteurs de requêtes KQL, des gestionnaires de seuils d\'alertes métriques et des validateurs topologiques de dépendances IaC.'
    }
  ]
};
