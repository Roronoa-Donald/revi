/**
 * chapitre6.js — Études de cas du cours « b3-anglais ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "an3-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Validateur de structure de réponse d’entretien STAR",
    goal: "Vérifier la complétude et l’impact d’une réponse d’entretien technique en anglais selon la méthode STAR (Situation, Task, Action, Result).",
    brief: "<p>Dans les entretiens d'embauche internationaux (FAANG, scale-ups tech), les recruteurs évaluent les compétences comportementales via la méthode <b>STAR</b>.<br>\nPour chaque cas d’application les composantes d'une réponse :<br>\n<code>CANDIDATE name=&lt;nom&gt;</code><br>\n<code>SITUATION: &lt;texte&gt;</code><br>\n<code>TASK: &lt;texte&gt;</code><br>\n<code>ACTION: &lt;texte&gt;</code><br>\n<code>RESULT: &lt;texte&gt;</code><br><br>\nRègles d'évaluation :<br>\n1. <b>Complétude</b> : Les 4 rubriques doivent comporter chacune au moins 5 mots. Si une rubrique a moins de 5 mots, ajouter <code>INCOMPLETE_SECTION</code>.<br>\n2. <b>Prise de responsabilité (Action)</b> : La section <code>ACTION</code> doit employer des verbes d'action à la première personne (<i>\"I designed\"</i>, <i>\"I implemented\"</i>, <i>\"I optimized\"</i>, <i>\"I led\"</i>, <i>\"I configured\"</i>, <i>\"I resolved\"</i>). La détection recherche la présence de <code>I </code> suivi d'un verbe d'action au passé (insensible à la casse). Si absent : ajouter <code>ACTION_LACKS_FIRST_PERSON_OWNERSHIP</code>.<br>\n3. <b>Impact mesurable (Result)</b> : La section <code>RESULT</code> doit contenir au moins une métrique chiffrée ou mot-clé d'impact quantifié (ex: signe <code>%</code>, chiffre avec unité, mots <code>reduced</code>, <code>increased</code>, <code>improved</code>, <code>saved</code>, <code>latency</code>, <code>uptime</code>). Si absent : ajouter <code>RESULT_LACKS_QUANTIFIABLE_METRIC</code>.<br><br>\nAfficher :<br>\n- Si conforme (0 anomalie) :<br>\n  <code>STAR_EVAL: &lt;nom&gt; -&gt; STATUS=PASS | FEEDBACK=\"Exemplary STAR answer with quantified outcome\"</code><br>\n- Si non conforme :<br>\n  <code>STAR_EVAL: &lt;nom&gt; -&gt; STATUS=NEEDS_IMPROVEMENT | ISSUES=&lt;issue1,issue2,...&gt;</code> (triées alphabétiquement).</p>",
    starter: "# Grille d'analyse (an3-c6-e1) — Validateur de structure de réponse d’entretien STAR\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Action sans prise de responsabilité personnelle (utilisation exclusive du passif ou we)]\n# Données : CANDIDATE name=AliceSmith\n# Données : SITUATION: The legacy monolithic backend was difficult to deploy and scale reliably.\n# Données : TASK: The engineering roadmap required migrating the auth module to Docker containers.\n# Données : ACTION: The team worked together and containers were deployed to the Kubernetes cluster.\n# Données : RESULT: We increased deployment frequency by 30% without incident.\nA_COMPLETER\n\n[Cas 2 — Résultat vague sans aucune métrique mesurable]\n# Données : CANDIDATE name=BobMartin\n# Données : SITUATION: Users reported intermittent disconnections during high volume live streaming events.\n# Données : TASK: I was assigned to rewrite the WebSocket connection handshake handler.\n# Données : ACTION: I redesigned the handshake protocol using lightweight binary payloads.\n# Données : RESULT: Everyone was much happier and the service felt much better overall.\nA_COMPLETER\n\n[Cas 3 — Section trop courte et résultat non quantifié]\n# Données : CANDIDATE name=ClaraO\n# Données : SITUATION: Server broke down.\n# Données : TASK: Fix it quickly.\n# Données : ACTION: I rebooted it.\n# Données : RESULT: It worked fine.\nA_COMPLETER\n\n[Cas 4 — Candidat avec impact chiffré en temps d’exécution]\n# Données : CANDIDATE name=DavidLee\n# Données : SITUATION: Automated end-to-end integration test runs took forty-five minutes on each commit.\n# Données : TASK: I was tasked with accelerating feedback loops for the thirty developers on staff.\n# Données : ACTION: I parallelized the test suite across eight ephemeral runner nodes.\n# Données : RESULT: The build pipeline finished in 6 minutes saving over fifty engineering hours weekly.\nA_COMPLETER\n",
    hints: [
          "Stocker les 4 rubriques dans un dictionnaire.",
          "Tester la présence de \"I <action>\" dans la section ACTION et les mots de métrique dans RESULT."
    ],
    examples: [
          {
                "stdin": "CANDIDATE name=JohnDoe\nSITUATION: Our microservices architecture experienced heavy latency spikes during Black Friday.\nTASK: My task was to identify the bottleneck and stabilize the checkout database cluster.\nACTION: I implemented connection pooling and configured Redis caching for user sessions.\nRESULT: We reduced database latency by 45% and maintained 99.99% uptime throughout the peak.",
                "expected": "STAR_EVAL: JohnDoe -> STATUS=PASS | FEEDBACK=\"Exemplary STAR answer with quantified outcome\"",
                "note": "Réponse modèle avec appropriation personnelle et impact chiffré (-45% de latence)."
          }
    ],
    tests: [
          {
                "label": "Action sans prise de responsabilité personnelle (utilisation exclusive du passif ou we)",
                "stdin": "cas:1",
                "expected": "STAR_EVAL: AliceSmith -> STATUS=NEEDS_IMPROVEMENT | ISSUES=ACTION_LACKS_FIRST_PERSON_OWNERSHIP"
          },
          {
                "label": "Résultat vague sans aucune métrique mesurable",
                "stdin": "cas:2",
                "expected": "STAR_EVAL: BobMartin -> STATUS=NEEDS_IMPROVEMENT | ISSUES=RESULT_LACKS_QUANTIFIABLE_METRIC"
          },
          {
                "label": "Section trop courte et résultat non quantifié",
                "stdin": "cas:3",
                "expected": "STAR_EVAL: ClaraO -> STATUS=NEEDS_IMPROVEMENT | ISSUES=INCOMPLETE_SECTION,RESULT_LACKS_QUANTIFIABLE_METRIC"
          },
          {
                "label": "Candidat avec impact chiffré en temps d’exécution",
                "stdin": "cas:4",
                "expected": "STAR_EVAL: DavidLee -> STATUS=PASS | FEEDBACK=\"Exemplary STAR answer with quantified outcome\""
          }
    ],
    solution: "[Exemple]\nSTAR_EVAL: JohnDoe -> STATUS=PASS | FEEDBACK=\"Exemplary STAR answer with quantified outcome\"\n\n[Cas 1 — Action sans prise de responsabilité personnelle (utilisation exclusive du passif ou we)]\nSTAR_EVAL: AliceSmith -> STATUS=NEEDS_IMPROVEMENT | ISSUES=ACTION_LACKS_FIRST_PERSON_OWNERSHIP\n\n[Cas 2 — Résultat vague sans aucune métrique mesurable]\nSTAR_EVAL: BobMartin -> STATUS=NEEDS_IMPROVEMENT | ISSUES=RESULT_LACKS_QUANTIFIABLE_METRIC\n\n[Cas 3 — Section trop courte et résultat non quantifié]\nSTAR_EVAL: ClaraO -> STATUS=NEEDS_IMPROVEMENT | ISSUES=INCOMPLETE_SECTION,RESULT_LACKS_QUANTIFIABLE_METRIC\n\n[Cas 4 — Candidat avec impact chiffré en temps d’exécution]\nSTAR_EVAL: DavidLee -> STATUS=PASS | FEEDBACK=\"Exemplary STAR answer with quantified outcome\"\n"
  },
  {
    id: "an3-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Analyseur de balisage verbal de présentation technique",
    goal: "Détecter les marqueurs de transition et de balisage verbal (Signposting) dans le script d’une présentation technique en anglais et évaluer la fluidité de la structure.",
    brief: "<p>Dans une présentation technique internationale (conférence, soutenance ou démo client), l'orateur doit baliser son discours avec des locutions de transition (<i>Signposts</i>) pour guider son auditoire.<br>\nPour chaque cas d’application le texte intégral de la trancasion d'une présentation.<br><br>\nCatégories de balises verbales (recherche insensible à la casse) :<br>\n1. <code>STARTING</code> : contient au moins une expression parmi <code>today i'd like to talk about</code>, <code>today i will present</code>, <code>the purpose of this talk is</code>, <code>welcome everyone</code>.<br>\n2. <code>OUTLINING</code> : contient au moins une expression parmi <code>i have divided my talk into</code>, <code>to begin with</code>, <code>first we will look at</code>, <code>firstly</code>.<br>\n3. <code>TRANSITION</code> : contient au moins une expression parmi <code>moving on to</code>, <code>turning now to</code>, <code>let's pivot to</code>, <code>next let's examine</code>.<br>\n4. <code>CONCLUDING</code> : contient au moins une expression parmi <code>in conclusion</code>, <code>to sum up</code>, <code>to wrap up</code>, <code>finally</code>.<br>\n5. <code>QA_SESSION</code> : contient au moins une expression parmi <code>thank you for your attention</code>, <code>i'd be happy to take questions</code>, <code>any questions</code>.<br><br>\nRègles d'évaluation :<br>\n- Recenser la liste des catégories identifiées (triées dans l'ordre de la liste ci-dessus : <code>STARTING</code>, <code>OUTLINING</code>, <code>TRANSITION</code>, <code>CONCLUDING</code>, <code>QA_SESSION</code>).<br>\n- Calculer le score (nombre de catégories présentes sur 5).<br>\n- Qualification :<br>\n  * Si score &gt;= 4 : <code>QUALITY=EXCELLENT_FLOW</code><br>\n  * Si score == 3 : <code>QUALITY=GOOD_FLOW</code><br>\n  * Si score &lt;= 2 : <code>QUALITY=POOR_TRANSITIONS</code><br><br>\nAfficher :<br>\n<code>SIGNPOST_EVAL: DETECTED=&lt;cat1,cat2,...&gt; | SCORE=&lt;score&gt;/5 | QUALITY=&lt;QUALITY&gt;</code> (ou <code>DETECTED=NONE</code> si 0 catégorie).</p>",
    starter: "# Grille d'analyse (an3-c6-e2) — Analyseur de balisage verbal de présentation technique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Présentation avec 3 catégories (Good flow)]\n# Données : Today I'd like to talk about cloud cost reduction. Moving on to our reserved instances strategy. To sum up, we saved thirty thousand dollars.\nA_COMPLETER\n\n[Cas 2 — Discours informel sans transitions verbales explicites (Poor transitions)]\n# Données : Here is the code. Look at line 40. Now look at the chart. That is all.\nA_COMPLETER\n\n[Cas 3 — Présentation avec amorce, plan et questions sans transition]\n# Données : Welcome everyone! To begin with, we inspect the microservice topology. I'd be happy to take questions now.\nA_COMPLETER\n\n[Cas 4 — Excellente présentation avec 4 catégories sur 5]\n# Données : The purpose of this talk is to review zero trust security. I have divided my talk into three sections. Next let's examine identity verification. Finally, automated policy engines enforce access.\nA_COMPLETER\n",
    hints: [
          "Normaliser le texte d'entrée en minuscules pour faciliter les recherches de sous-chaînes.",
          "Conserver l'ordre prédéfini des 5 catégories lors de l'affichage."
    ],
    examples: [
          {
                "stdin": "Welcome everyone. Today I will present our new API gateway. Firstly, we examine the problem. Moving on to our architecture. In conclusion, performance improved by 50%. Thank you for your attention, any questions?",
                "expected": "SIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,TRANSITION,CONCLUDING,QA_SESSION | SCORE=5/5 | QUALITY=EXCELLENT_FLOW",
                "note": "Les 5 catégories de signposts sont toutes représentées : structure exemplaire."
          }
    ],
    tests: [
          {
                "label": "Présentation avec 3 catégories (Good flow)",
                "stdin": "cas:1",
                "expected": "SIGNPOST_EVAL: DETECTED=STARTING,TRANSITION,CONCLUDING | SCORE=3/5 | QUALITY=GOOD_FLOW"
          },
          {
                "label": "Discours informel sans transitions verbales explicites (Poor transitions)",
                "stdin": "cas:2",
                "expected": "SIGNPOST_EVAL: DETECTED=NONE | SCORE=0/5 | QUALITY=POOR_TRANSITIONS"
          },
          {
                "label": "Présentation avec amorce, plan et questions sans transition",
                "stdin": "cas:3",
                "expected": "SIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,QA_SESSION | SCORE=3/5 | QUALITY=GOOD_FLOW"
          },
          {
                "label": "Excellente présentation avec 4 catégories sur 5",
                "stdin": "cas:4",
                "expected": "SIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,TRANSITION,CONCLUDING | SCORE=4/5 | QUALITY=EXCELLENT_FLOW"
          }
    ],
    solution: "[Exemple]\nSIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,TRANSITION,CONCLUDING,QA_SESSION | SCORE=5/5 | QUALITY=EXCELLENT_FLOW\n\n[Cas 1 — Présentation avec 3 catégories (Good flow)]\nSIGNPOST_EVAL: DETECTED=STARTING,TRANSITION,CONCLUDING | SCORE=3/5 | QUALITY=GOOD_FLOW\n\n[Cas 2 — Discours informel sans transitions verbales explicites (Poor transitions)]\nSIGNPOST_EVAL: DETECTED=NONE | SCORE=0/5 | QUALITY=POOR_TRANSITIONS\n\n[Cas 3 — Présentation avec amorce, plan et questions sans transition]\nSIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,QA_SESSION | SCORE=3/5 | QUALITY=GOOD_FLOW\n\n[Cas 4 — Excellente présentation avec 4 catégories sur 5]\nSIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,TRANSITION,CONCLUDING | SCORE=4/5 | QUALITY=EXCELLENT_FLOW\n"
  },
  {
    id: "an3-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Évaluateur de CV technique : Verbes d’action et mots-clés ATS",
    goal: "Analyser le contenu d’un CV technique anglophone, mesurer le taux d’adéquation aux mots-clés de l’offre d’emploi et évaluer la force des verbes d’action pour les filtres ATS.",
    brief: "<p>Les systèmes de tri automatisé de CV (<i>Applicant Tracking Systems - ATS</i>) pénalisent les verbes passifs ou faibles (<i>\"worked on\"</i>, <i>\"helped with\"</i>) et favorisent les verbes d'action à fort impact (<i>\"engineered\"</i>, <i>\"architected\"</i>, <i>\"optimized\"</i>) ainsi que la présence des mots-clés requis par le poste.<br>\nPour chaque cas d’application :<br>\n<code>JOB_ROLE: &lt;intitulé du poste&gt;</code><br>\n<code>KEYWORDS: &lt;kw1,kw2,...&gt;</code><br>\n<code>EXPERIENCE_BULLETS:</code><br>\nsuivi d'une ou plusieurs lignes débutant par <code>- </code>.<br><br>\nRègles d'évaluation :<br>\n1. <b>Adéquation des mots-clés (Keywords Match)</b> : Compter combien de mots-clés de la liste <code>KEYWORDS</code> apparaissent dans le texte des puces d'expérience (insensible à la casse).<br>\n   Calculer le pourcentage de correspondance : <code>match_pct = round(nb_trouves / total_mots_cles * 100)</code>.<br>\n2. <b>Audit des verbes d'action en tête de puce</b> : Extraire le premier mot de chaque puce (après le tiret et l'espace) :<br>\n   - <b>Verbes d'action forts (STRONG)</b> : <code>engineered</code>, <code>architected</code>, <code>deployed</code>, <code>spearheaded</code>, <code>optimized</code>, <code>automated</code>, <code>implemented</code>, <code>designed</code>, <code>scaled</code>.<br>\n   - <b>Verbes faibles / passifs (WEAK)</b> : <code>worked</code>, <code>helped</code>, <code>assisted</code>, <code>responsible</code>, <code>did</code>, <code>tried</code>.<br>\n3. <b>Classement ATS (ATS_RATING)</b> :<br>\n   - <code>HIGH</code> : Si <code>match_pct &gt;= 75</code> et <code>nb_weak == 0</code> et <code>nb_strong &gt;= 2</code>.<br>\n   - <code>LOW</code> : Si <code>match_pct &lt; 50</code> ou <code>nb_weak &gt;= 2</code>.<br>\n   - <code>MEDIUM</code> : Dans les autres cas.<br><br>\nAfficher :<br>\n<code>ATS_AUDIT: ROLE=&lt;JOB_ROLE&gt; | MATCH=&lt;match_pct&gt;% (&lt;nb_trouves&gt;/&lt;total&gt;) | STRONG_VERBS=&lt;nb_strong&gt; | WEAK_VERBS=&lt;nb_weak&gt; | RATING=&lt;RATING&gt;</code></p>",
    starter: "# Grille d'analyse (an3-c6-e3) — Évaluateur de CV technique : Verbes d’action et mots-clés ATS\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — CV avec verbes faibles pénalisant la note ATS]\n# Données : JOB_ROLE: DevOps Engineer\n# Données : KEYWORDS: docker,ci/cd,ansible,linux\n# Données : EXPERIENCE_BULLETS:\n# Données : - Worked with Docker containers and Linux systems\n# Données : - Helped with CI/CD setup for testing\n# Données : - Assisted senior developers on Ansible playbooks\nA_COMPLETER\n\n[Cas 2 — Taux de mots-clés insuffisant inférieur à 50%]\n# Données : JOB_ROLE: Security Engineer\n# Données : KEYWORDS: cryptography,siem,soc,penetration,pki\n# Données : EXPERIENCE_BULLETS:\n# Données : - Implemented security awareness training program\n# Données : - Designed corporate password policy handbook\nA_COMPLETER\n\n[Cas 3 — CV équilibré avec notation moyenne (MEDIUM)]\n# Données : JOB_ROLE: Backend Developer\n# Données : KEYWORDS: python,fastapi,postgresql,redis\n# Données : EXPERIENCE_BULLETS:\n# Données : - Engineered RESTful microservices using Python and FastAPI\n# Données : - Worked on PostgreSQL database query optimization\nA_COMPLETER\n\n[Cas 4 — Verbes forts multiples atteignant le palier HIGH]\n# Données : JOB_ROLE: SRE Lead\n# Données : KEYWORDS: prometheus,grafana,alertmanager\n# Données : EXPERIENCE_BULLETS:\n# Données : - Automated telemetry collection using Prometheus and Alertmanager\n# Données : - Spearheaded observability dashboards in Grafana for platform reliability\nA_COMPLETER\n",
    hints: [
          "Extraire le premier mot de chaque puce avec l’extraction des champs[1] après le tiret.",
          "Rechercher chaque mot-clé dans l'ensemble du texte d'expérience converti en minuscules."
    ],
    examples: [
          {
                "stdin": "JOB_ROLE: Senior Cloud Architect\nKEYWORDS: kubernetes,terraform,aws,docker\nEXPERIENCE_BULLETS:\n- Architected multi-region AWS cloud infrastructure with Terraform\n- Engineered Kubernetes deployment pipelines and Docker container security\n- Optimized database query caching reducing memory consumption by 30%",
                "expected": "ATS_AUDIT: ROLE=Senior Cloud Architect | MATCH=100% (4/4) | STRONG_VERBS=3 | WEAK_VERBS=0 | RATING=HIGH",
                "note": "100% des mots-clés trouvés et 3 verbes d'action à fort impact : note ATS maximale (HIGH)."
          }
    ],
    tests: [
          {
                "label": "CV avec verbes faibles pénalisant la note ATS",
                "stdin": "cas:1",
                "expected": "ATS_AUDIT: ROLE=DevOps Engineer | MATCH=100% (4/4) | STRONG_VERBS=0 | WEAK_VERBS=3 | RATING=LOW"
          },
          {
                "label": "Taux de mots-clés insuffisant inférieur à 50%",
                "stdin": "cas:2",
                "expected": "ATS_AUDIT: ROLE=Security Engineer | MATCH=0% (0/5) | STRONG_VERBS=2 | WEAK_VERBS=0 | RATING=LOW"
          },
          {
                "label": "CV équilibré avec notation moyenne (MEDIUM)",
                "stdin": "cas:3",
                "expected": "ATS_AUDIT: ROLE=Backend Developer | MATCH=75% (3/4) | STRONG_VERBS=1 | WEAK_VERBS=1 | RATING=MEDIUM"
          },
          {
                "label": "Verbes forts multiples atteignant le palier HIGH",
                "stdin": "cas:4",
                "expected": "ATS_AUDIT: ROLE=SRE Lead | MATCH=100% (3/3) | STRONG_VERBS=2 | WEAK_VERBS=0 | RATING=HIGH"
          }
    ],
    solution: "[Exemple]\nATS_AUDIT: ROLE=Senior Cloud Architect | MATCH=100% (4/4) | STRONG_VERBS=3 | WEAK_VERBS=0 | RATING=HIGH\n\n[Cas 1 — CV avec verbes faibles pénalisant la note ATS]\nATS_AUDIT: ROLE=DevOps Engineer | MATCH=100% (4/4) | STRONG_VERBS=0 | WEAK_VERBS=3 | RATING=LOW\n\n[Cas 2 — Taux de mots-clés insuffisant inférieur à 50%]\nATS_AUDIT: ROLE=Security Engineer | MATCH=0% (0/5) | STRONG_VERBS=2 | WEAK_VERBS=0 | RATING=LOW\n\n[Cas 3 — CV équilibré avec notation moyenne (MEDIUM)]\nATS_AUDIT: ROLE=Backend Developer | MATCH=75% (3/4) | STRONG_VERBS=1 | WEAK_VERBS=1 | RATING=MEDIUM\n\n[Cas 4 — Verbes forts multiples atteignant le palier HIGH]\nATS_AUDIT: ROLE=SRE Lead | MATCH=100% (3/3) | STRONG_VERBS=2 | WEAK_VERBS=0 | RATING=HIGH\n"
  }
];
