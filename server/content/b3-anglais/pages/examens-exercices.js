/**
 * Pages « examens » et « exercices » du cours « Anglais B3 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Anglais B3</h1>',
    '  <p class="lead">Deux épreuves complètes d’anglais technique et professionnel conformes aux exigences académiques et aux évaluations en milieu professionnel de niveau Bachelor 3 : documentation d’API, gestion d’incidents, animation d’équipe agile, SLA et soutenance technique.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Terminologie, Documentation d’API &amp; Communication d’Incident', [
      '<h4>Partie 1 : Précision Terminologique &amp; Acronymes Critiques (6 points)</h4>',
      '<ol>',
      '  <li>Définissez avec précision en anglais la différence entre un <i>glitch</i>, un <i>bug</i>, une <i>vulnerability</i> et un <i>exploit</i>. Donnez un exemple concret pour chacun. (3 pts)</li>',
      '  <li>Explicitez la différence entre les acronymes IaaS, PaaS et SaaS selon le modèle de responsabilité partagée. Quelle couche spécifique de la pile est gérée par le client en PaaS mais par le fournisseur en SaaS ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Analyse de Spécification Technique &amp; RFC 2119 (7 points)</h4>',
      '<ol>',
      '  <li>Soit la clause suivante issue d’un projet de microservices : <i>"The authentication gateway SHOULD NOT store raw bearer tokens in plaintext; it MUST hash incoming API keys before persistence and it MAY cache validation decisions for up to sixty seconds."</i> Identifiez les trois mots-clés RFC 2119, indiquez leur niveau d’obligation contractuel et traduisez cette exigence pour l’équipe de développement. (4 pts)</li>',
      '  <li>Citez les 4 composantes fondamentales d’un endpoint REST documenté selon les standards OpenAPI. Pourquoi l’absence d’un code de retour 401 ou 403 sur un endpoint sécurisé constitue-t-elle une anomalie critique de documentation ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Rédaction Professionnelle &amp; Diagnostic d’Email Malade (7 points)</h4>',
      '<ol>',
      '  <li>Diagnostiquez les trois défauts majeurs de l’email suivant :<br><code>Subject: hey</code><br><code>Yo, the database stuff is broken, fix it asap cause we gonna lose money. thx</code><br>Réécrivez cet email sous une forme professionnelle, précise et actionnable à destination du Tech Lead d’infrastructure. (4 pts)</li>',
      '  <li>Quelles sont les six sections obligatoires d’un rapport de bug (<i>Bug Report</i>) professionnel pour qu’il soit immédiatement qualifié par l’équipe de développement sans demande d’informations complémentaires ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Glitch vs Bug vs Vulnerability vs Exploit (3 pts) :</strong> ' +
      '  1. <em>Glitch :</em> un dysfonctionnement temporaire ou éphémère ne perturbant pas durablement le système (ex. un saut d’affichage d’un pixel ou un micro-délai de rafraîchissement d’UI). ' +
      '  2. <em>Bug :</em> une erreur reproductible dans le code source causant un comportement inattendu ou erroné (ex. une exception de division par zéro lors du calcul du panier). ' +
      '  3. <em>Vulnerability :</em> une faille ou faiblesse de sécurité dans la conception ou le code pouvant être compromise (ex. une absence de validation des entrées menant à une injection SQL). ' +
      '  4. <em>Exploit :</em> un code, script ou payload malveillant tirant activement parti d’une vulnérabilité pour compromettre le système (ex. un script automatisé exploitant la CVE Log4j pour exécuter du code à distance).</li>',
      '  <li><strong>Modèle de responsabilité partagée (3 pts) :</strong> ' +
      '  En IaaS, le fournisseur gère le matériel et la virtualisation, le client gère l’OS, le runtime et l’application. En PaaS, le fournisseur gère en plus l’OS et le runtime (ex. Node.js/Python), le client gère le code applicatif et les données. En SaaS, le fournisseur gère l’ensemble de la pile applicative. La couche spécifique gérée par le client en PaaS et par le fournisseur en SaaS est l’<strong>application elle-même</strong> (son code source, son déploiement et sa maintenance applicative).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Analyse RFC 2119 (4 pts) :</strong> ' +
      '  1. <code>SHOULD NOT</code> : pratique fortement déconseillée (P2 — Recommended) ; stocker les tokens en clair est proscrit sauf contrainte technique absolue dûment documentée. ' +
      '  2. <code>MUST</code> : exigence absolue et impérative (P1 — Critical) ; le hachage des clés d’API avant stockage en base est une obligation contractuelle non négociable. ' +
      '  3. <code>MAY</code> : fonctionnalité purement optionnelle (P3 — Optional) ; la passerelle a le droit mais non l’obligation de mettre en cache les décisions d’authentification pour une durée maximale de 60 secondes.</li>',
      '  <li><strong>Documentation OpenAPI d’endpoints REST (3 pts) :</strong> ' +
      '  Les 4 composantes sont : la méthode HTTP (GET, POST, etc.), l’URI de chemin (/api/v1/...), les paramètres d’en-tête ou de payload (dont auth Bearer), et les codes de statut HTTP de retour. L’absence de codes 401 (Unauthorized) ou 403 (Forbidden) sur un endpoint sécurisé est critique car elle empêche les intégrateurs tiers d’implémenter correctement la gestion des échecs d’authentification et de renouvellement de token.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Diagnostic et réécriture de l’email malade (4 pts) :</strong> ' +
      '  Défauts : 1. Sujet vague et non professionnel (<i>"hey"</i> ne donne aucun contexte ni composant) ; 2. Salutation et clôture relâchées (<i>"Yo"</i>, <i>"thx"</i>) ; 3. Corps imprécis contenant de l’argot (<i>"stuff"</i>, <i>"broken"</i>, <i>"asap"</i>, <i>"gonna"</i>). ' +
      '  Version professionnelle corrigée :<br>' +
      '  <code>Subject: PROD: Database Connection Pool Outage on Payments Cluster</code><br>' +
      '  <code>Hi Peter,</code><br>' +
      '  <code>We are currently observing high connection timeout rates on the PostgreSQL payments replica in production. This is causing HTTP 500 errors on the checkout service for approximately 25% of active users. Could the infrastructure team please inspect connection limits and scale up pool capacity? Thank you, Best regards, Alex.</code></li>',
      '  <li><strong>Les 6 sections d’un Bug Report (3 pts) :</strong> ' +
      '  1. <code>Title</code> (intitulé précis et descriptif) ; 2. <code>Environment</code> (OS, navigateur, version, commit) ; 3. <code>Steps to Reproduce</code> (étapes numérotées 1, 2, 3...) ; 4. <code>Expected Behavior</code> ; 5. <code>Actual Behavior</code> ; 6. <code>Severity / Priority</code> (Critical, Major, Minor, Trivial).</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Agilité, Métriques SLA, Support Utilisateur &amp; Soutenance', [
      '<h4>Partie 1 : Animation Agile &amp; Négociation de SLA (6 points)</h4>',
      '<ol>',
      '  <li>Rédigez en anglais l’intervention typique d’un ingénieur Cloud lors d’un Daily Standup meeting, en respectant les trois rubriques standard (Yesterday, Today, Blockers). Intégrez une demande polie d’aide sur un problème de réseau virtuel. (3 pts)</li>',
      '  <li>Un contrat de service international garantit une disponibilité de 99.95 % sur un mois de 30 jours (43 200 minutes). Calculez le downtime maximal autorisé en minutes. Si le service enregistre une coupure réelle cumulée de 65 minutes et que la pénalité contractuelle est de 400 $ par heure entamée d’excédent, déterminez le montant exact de la pénalité financière due. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Support Technique &amp; Post-Mortem Blameless (7 points)</h4>',
      '<ol>',
      '  <li>Traduisez le message d’erreur technique suivant en une explication bienveillante et orientée utilisateur final (Support Client) : <i>"Fatal Error 502: Bad Gateway. Connection pool to upstream microservice exhausted after socket timeout."</i> Quels sont les 3 principes d’empathie à respecter ? (3 pts)</li>',
      '  <li>Expliquez pourquoi les géants de la tech (Google, AWS, Netflix) imposent des <i>Blameless Post-Mortems</i>. Appliquez la méthode des 5 Pourquoi (<i>5-Whys</i>) à un incident de certificat SSL expiré pour remonter de la panne initiale jusqu’au défaut d’architecture systémique sans jamais incriminer d’individu. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Présentation Technique &amp; Méthode STAR (7 points)</h4>',
      '<ol>',
      '  <li>Dans le cadre d’une présentation technique internationale de 5 minutes, citez et illustrez par une phrase en anglais les 4 phases de balisage verbal (<i>Signposting</i>) : Starting, Outlining, Transition, et Concluding/Q&amp;A. (3 pts)</li>',
      '  <li>En entretien d’embauche technique pour un poste d’ingénieur DevOps international, formulez une réponse modèle selon la structure STAR (Situation, Task, Action, Result) décrivant comment vous avez accéléré un pipeline CI/CD en incluant un résultat quantifié. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Intervention de Daily Standup (3 pts) :</strong><br>' +
      '  <code>"Yesterday, I finished automating the staging Kubernetes cluster provisioning using Terraform. Today, I plan to deploy the ingress controller and configure TLS termination. As for blockers, I am currently stuck on cross-VPC peering routing tables; could someone from the networking team pair with me for fifteen minutes after the standup? Thanks."</code></li>',
      '  <li><strong>Calcul de SLA et pénalités (3 pts) :</strong><br>' +
      '  Temps total $= 30 \\times 24 \\times 60 = 43\\,200$ minutes. ' +
      '  Downtime autorisé $= 43\\,200 \\times (100 - 99.95) / 100 = 43\\,200 \\times 0.0005 = 21.60$ minutes. ' +
      '  Excédent de downtime $= 65 - 21.60 = 43.40$ minutes. ' +
      '  Heures entamées pénalisables $= \\lceil 43.40 / 60 \\rceil = 1$ heure. ' +
      '  Pénalité financière $= 1 \\times 400 = 400$ USD.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Traduction de message d’erreur support (3 pts) :</strong><br>' +
      '  Message utilisateur bienveillant : <i>"Our payment service is temporarily unavailable due to high demand. No charges have been made to your payment card. Please wait a few moments and refresh the page, or try again shortly."</i> ' +
      '  Les 3 principes d’empathie sont : 1. Rassurer l’usager (aucune perte d’argent ni de données) ; 2. Éviter tout jargon technique (pas de socket, gateway ou microservice) ; 3. Fournir une consigne d’action claire (patienter et rafraîchir).</li>',
      '  <li><strong>Post-Mortem Blameless et 5 Pourquoi (4 pts) :</strong><br>' +
      '  Le principe <em>blameless</em> stipule que blâmer un ingénieur masque les vulnérabilités de l’infrastructure et crée une culture de la dissimulation. ' +
      '  Exemple des 5 Pourquoi : ' +
      '  1. <em>Pourquoi l’accès web a-t-il échoué ?</em> Le certificat TLS a expiré. ' +
      '  2. <em>Pourquoi le certificat a-t-il expiré sans alerte ?</em> Le renouvellement manuel programmé sur l’agenda n’a pas été réalisé. ' +
      '  3. <em>Pourquoi le renouvellement était-il manuel ?</em> Aucune autorité automatisée (ACME / Let’s Encrypt) n’était branchée sur le proxy inverse. ' +
      '  4. <em>Pourquoi l’outil ACME n’était-il pas déployé ?</em> La configuration du reverse proxy n’était pas gérée sous forme d’Infrastructure as Code (IaC). ' +
      '  5. <em>Cause racine systémique :</em> L’infrastructure de certificats manquait d’automatisation déclarative et d’une surveillance synthétique des dates d’expiration. ' +
      '  Action corrective : Déployer Cert-Manager avec renouvellement automatique et alertes Prometheus à J-30.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Balisage verbal en présentation (3 pts) :</strong><br>' +
      '  1. <em>Starting :</em> <i>"Today, I would like to present our distributed database observability platform."</i><br>' +
      '  2. <em>Outlining :</em> <i>"I have divided my presentation into three main sections: the latency bottleneck, our caching architecture, and benchmark results."</i><br>' +
      '  3. <em>Transition :</em> <i>"Moving on to our caching layer, let’s examine how Redis was integrated into the query pipeline."</i><br>' +
      '  4. <em>Concluding &amp; Q&amp;A :</em> <i>"To sum up, this architecture reduced p99 latency by 55%. Thank you for your attention, I would now be glad to take any questions."</i></li>',
      '  <li><strong>Réponse modèle STAR d’entretien (4 pts) :</strong><br>' +
      '  <strong>S :</strong> <i>"At my previous internship, our continuous integration test suite took forty-five minutes to run on every pull request, causing major deployment bottlenecks."</i><br>' +
      '  <strong>T :</strong> <i>"My mission was to cut pipeline execution time by at least 50% to accelerate feedback loops for a team of twenty engineers."</i><br>' +
      '  <strong>A :</strong> <i>"I analyzed test execution traces, identified unparallelized database seed scripts, configured Docker layer caching on GitHub Actions self-hosted runners, and split unit tests across four parallel workers."</i><br>' +
      '  <strong>R :</strong> <i>"As a result, build and test duration dropped from 45 minutes to 11 minutes (a 75% speedup), saving approximately thirty engineering hours per week and preventing merge queue congestions."</i></li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Mémento technique' }, { href: 'exercices.html', label: 'Catalogue des exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs &amp; Épreuves corrigées — ' + course.brand,
      description: 'Examens d’anglais technique B3 : Contrôle Continu et Examen Terminal avec corrigés types détaillés.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Catalogue des Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Catalogue des exercices' }
  ]);

  const exByChapter = [
    {
      n: 1,
      title: 'Advanced IT Terminology, Acronyms &amp; Cloud Architecture Lexicon',
      items: [
        { id: 'an3-c1-e1', title: 'Analyseur et expanseur d’acronymes IT critiques', level: 'Niveau 1', desc: 'Développer des acronymes normalisés (API, CI/CD, IaaS, SSH, TLS, SLA) et qualifier leur domaine technique.' },
        { id: 'an3-c1-e2', title: 'Linter de précision terminologique technique en anglais', level: 'Niveau 2', desc: 'Remplacer le jargon familier (broken, slow, bad thing) par des formulations d’ingénierie rigoureuses.' },
        { id: 'an3-c1-e3', title: 'Classificateur de modèle Cloud (IaaS vs PaaS vs SaaS)', level: 'Niveau 3', desc: 'Classifier un service selon le modèle de responsabilité partagée et expliciter le périmètre client.' }
      ]
    },
    {
      n: 2,
      title: 'Conquering Technical Documentation &amp; API Specifications',
      items: [
        { id: 'an3-c2-e1', title: 'Analyseur et auditeur de conformité RFC 2119', level: 'Niveau 1', desc: 'Auditer les clauses techniques en anglais selon les mots-clés normatifs MUST, SHOULD et MAY.' },
        { id: 'an3-c2-e2', title: 'Linter de documentation d’endpoints REST &amp; OpenAPI', level: 'Niveau 2', desc: 'Vérifier la validité des routes HTTP, des formats d’URI, des statuts 2xx et des codes d’authentification.' },
        { id: 'an3-c2-e3', title: 'Générateur de sommaire technique Markdown et slugification', level: 'Niveau 3', desc: 'Extraire les titres d’une documentation README et générer une table des matières indentée avec slugs.' }
      ]
    },
    {
      n: 3,
      title: 'Professional Written Communication — Emails, Bug Reports &amp; Post-Mortems',
      items: [
        { id: 'an3-c3-e1', title: 'Analyseur de registre et tonalité d’emails IT professionnels', level: 'Niveau 1', desc: 'Détecter les salutations familières, les objets vagues et l’argot pour qualifier le registre d’un email.' },
        { id: 'an3-c3-e2', title: 'Validateur de structure de rapport de bug technique', level: 'Niveau 2', desc: 'Vérifier les sections obligatoires (Title, Environment, Steps, Expected, Actual, Severity) d’un ticket.' },
        { id: 'an3-c3-e3', title: 'Générateur d’alerte d’escalade d’incident pour le management', level: 'Niveau 3', desc: 'Formater un bulletin d’incident critique SEV-1 avec métriques d’impact, statut et contournement.' }
      ]
    },
    {
      n: 4,
      title: 'Spoken English for Agile Teams — Standups, Retrospectives &amp; SLA Metrics',
      items: [
        { id: 'an3-c4-e1', title: 'Parseur de compte-rendu de Stand-up Meeting Agile', level: 'Niveau 1', desc: 'Extraire les réalisations passées, les tâches du jour et les blocages déclarés lors de la mêlée.' },
        { id: 'an3-c4-e2', title: 'Calculateur de conformité SLA, Uptime et pénalités', level: 'Niveau 2', desc: 'Calculer le downtime mensuel toléré pour des contrats à trois ou quatre 9 et évaluer les pénalités.' },
        { id: 'an3-c4-e3', title: 'Extracteur de rétrospective agile : Sentiments et plan d’action', level: 'Niveau 3', desc: 'Dénombrer les réussites et difficultés et formaliser la liste ordonnée des actions assignées.' }
      ]
    },
    {
      n: 5,
      title: 'IT Support, Incident Management &amp; Technical Translation',
      items: [
        { id: 'an3-c5-e1', title: 'Traducteur d’erreurs techniques en langage utilisateur bienveillant', level: 'Niveau 1', desc: 'Traduire des exceptions cryptiques en messages d’assistance empathiques et compréhensibles.' },
        { id: 'an3-c5-e2', title: 'Matrice de sévérité d’incident et calcul de SLA de réponse', level: 'Niveau 2', desc: 'Classifier un incident en SEV-1 à SEV-4 selon l’impact et l’urgence et fixer les délais de résolution.' },
        { id: 'an3-c5-e3', title: 'Validateur de Post-Mortem Blameless et chaîne des 5 Pourquoi', level: 'Niveau 3', desc: 'Garantir l’absence de culpabilisation individuelle et valider la remédiation par garde-fous systémiques.' }
      ]
    },
    {
      n: 6,
      title: 'Technical Presentations, Pitching &amp; International Career',
      items: [
        { id: 'an3-c6-e1', title: 'Validateur de structure de réponse d’entretien STAR', level: 'Niveau 1', desc: 'Vérifier la complétude et l’impact chiffré d’une réponse d’entretien selon Situation, Task, Action, Result.' },
        { id: 'an3-c6-e2', title: 'Analyseur de balisage verbal de présentation technique', level: 'Niveau 2', desc: 'Détecter les marqueurs de signposting (Starting, Outlining, Transition, Concluding, Q&A) dans un discours.' },
        { id: 'an3-c6-e3', title: 'Évaluateur de CV technique : Verbes d’action et mots-clés ATS', level: 'Niveau 3', desc: 'Mesurer la densité de mots-clés et qualifier la force des verbes d’action pour les filtres ATS.' }
      ]
    }
  ];

  const htmlSections = exByChapter.map(ch => [
    '  <div class="card" style="margin-bottom: 24px;">',
    '    <h3>Module ' + ch.n + ' — ' + ch.title + '</h3>',
    '    <ul style="list-style: none; padding-left: 0; margin-top: 12px;">',
    ch.items.map(it => [
      '      <li style="padding: 10px 0; border-bottom: 1px solid var(--color-border, #e7e1d7);">',
      '        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">',
      '          <strong><a href="chapitre' + ch.n + '.html#' + it.id + '">' + it.id + ' — ' + it.title + '</a></strong>',
      '          <span class="badge">' + it.level + '</span>',
      '        </div>',
      '        <p style="margin: 4px 0 0; font-size: 0.88rem; color: var(--color-text-muted, #78716c);">' + it.desc + '</p>',
      '      </li>'
    ].join('\n')).join('\n'),
    '    </ul>',
    '  </div>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices de Code Interactifs — Anglais B3</h1>',
    '  <p class="lead">L’ensemble des 18 ateliers d’études de cas pratiques intégrés au cours, répartis à raison de 3 exercices par module avec validation instantanée par tests automatisés.</p>',
    '',
    htmlSections,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens' }, { href: 'chapitre1.html', label: 'Accéder au Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des 18 exercices — ' + course.brand,
      description: 'Inventaire des 18 exercices interactifs d’études de cas d’anglais technique B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
