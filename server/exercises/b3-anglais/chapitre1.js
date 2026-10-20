/**
 * chapitre1.js — Études de cas du cours « b3-anglais ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "an3-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Analyseur et expanseur d’acronymes IT critiques",
    goal: "Analyser une séquence d’acronymes techniques anglophones et restituer leur forme développée ainsi que leur domaine technologique normalisé.",
    brief: "<p>Dans les équipes d'ingénierie internationales, la maîtrise exacte des acronymes IT est indispensable pour rédiger et interpréter des spécifications techniques sans ambiguïté.<br>\nPour chaque cas d’application une liste de requêtes au format :<br>\n<code>ACRONYM &lt;CODE&gt;</code>.<br><br>\nTable des acronymes normalisés :<br>\n- <code>API</code> : <code>FULL=\"Application Programming Interface\" | DOMAIN=DEV</code><br>\n- <code>CI/CD</code> : <code>FULL=\"Continuous Integration / Continuous Delivery\" | DOMAIN=DEVOPS</code><br>\n- <code>IaaS</code> : <code>FULL=\"Infrastructure as a Service\" | DOMAIN=CLOUD</code><br>\n- <code>PaaS</code> : <code>FULL=\"Platform as a Service\" | DOMAIN=CLOUD</code><br>\n- <code>SaaS</code> : <code>FULL=\"Software as a Service\" | DOMAIN=CLOUD</code><br>\n- <code>SSH</code> : <code>FULL=\"Secure Shell\" | DOMAIN=NETWORKING_SECURITY</code><br>\n- <code>TLS</code> : <code>FULL=\"Transport Layer Security\" | DOMAIN=NETWORKING_SECURITY</code><br>\n- <code>DNS</code> : <code>FULL=\"Domain Name System\" | DOMAIN=NETWORKING</code><br>\n- <code>REST</code> : <code>FULL=\"Representational State Transfer\" | DOMAIN=ARCHITECTURE</code><br>\n- <code>CLI</code> : <code>FULL=\"Command-Line Interface\" | DOMAIN=SYSTEM</code><br>\n- <code>GUI</code> : <code>FULL=\"Graphical User Interface\" | DOMAIN=SYSTEM</code><br>\n- <code>SLA</code> : <code>FULL=\"Service Level Agreement\" | DOMAIN=GOVERNANCE</code><br><br>\nPour chaque ligne :<br>\n- Si l'acronyme est connu (la comparaison doit être insensible à la casse pour les lettres) :<br>\n  <code>EXPAND: &lt;CODE&gt; -&gt; FULL=\"&lt;Nom Développé&gt;\" | DOMAIN=&lt;DOMAINE&gt;</code><br>\n- Si l'acronyme est inconnu :<br>\n  <code>EXPAND: &lt;CODE&gt; -&gt; UNKNOWN</code></p>",
    starter: "# Grille d'analyse (an3-c1-e1) — Analyseur et expanseur d’acronymes IT critiques\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Acronymes Cloud IaaS, PaaS et SaaS]\n# Données : ACRONYM IaaS\n# Données : ACRONYM PaaS\n# Données : ACRONYM SaaS\nA_COMPLETER\n\n[Cas 2 — Acronymes DevOps, Architecture et Système]\n# Données : ACRONYM CI/CD\n# Données : ACRONYM REST\n# Données : ACRONYM CLI\nA_COMPLETER\n\n[Cas 3 — Gouvernance SLA et gestion des acronymes inconnus]\n# Données : ACRONYM SLA\n# Données : ACRONYM XYZ123\n# Données : ACRONYM TLS\nA_COMPLETER\n\n[Cas 4 — Réseaux et Interfaces graphiques]\n# Données : ACRONYM DNS\n# Données : ACRONYM GUI\nA_COMPLETER\n",
    hints: [
          "Stocker les correspondances dans un dictionnaire avec des clés en majuscules.",
          "Veiller à préserver la casse d'origine du paramètre CODE dans l'affichage final."
    ],
    examples: [
          {
                "stdin": "ACRONYM API\nACRONYM SSH",
                "expected": "EXPAND: API -> FULL=\"Application Programming Interface\" | DOMAIN=DEV\nEXPAND: SSH -> FULL=\"Secure Shell\" | DOMAIN=NETWORKING_SECURITY",
                "note": "Expansion de deux acronymes clés en DEV et NETWORKING_SECURITY."
          }
    ],
    tests: [
          {
                "label": "Acronymes Cloud IaaS, PaaS et SaaS",
                "stdin": "cas:1",
                "expected": "EXPAND: IaaS -> FULL=\"Infrastructure as a Service\" | DOMAIN=CLOUD\nEXPAND: PaaS -> FULL=\"Platform as a Service\" | DOMAIN=CLOUD\nEXPAND: SaaS -> FULL=\"Software as a Service\" | DOMAIN=CLOUD"
          },
          {
                "label": "Acronymes DevOps, Architecture et Système",
                "stdin": "cas:2",
                "expected": "EXPAND: CI/CD -> FULL=\"Continuous Integration / Continuous Delivery\" | DOMAIN=DEVOPS\nEXPAND: REST -> FULL=\"Representational State Transfer\" | DOMAIN=ARCHITECTURE\nEXPAND: CLI -> FULL=\"Command-Line Interface\" | DOMAIN=SYSTEM"
          },
          {
                "label": "Gouvernance SLA et gestion des acronymes inconnus",
                "stdin": "cas:3",
                "expected": "EXPAND: SLA -> FULL=\"Service Level Agreement\" | DOMAIN=GOVERNANCE\nEXPAND: XYZ123 -> UNKNOWN\nEXPAND: TLS -> FULL=\"Transport Layer Security\" | DOMAIN=NETWORKING_SECURITY"
          },
          {
                "label": "Réseaux et Interfaces graphiques",
                "stdin": "cas:4",
                "expected": "EXPAND: DNS -> FULL=\"Domain Name System\" | DOMAIN=NETWORKING\nEXPAND: GUI -> FULL=\"Graphical User Interface\" | DOMAIN=SYSTEM"
          }
    ],
    solution: "[Exemple]\nEXPAND: API -> FULL=\"Application Programming Interface\" | DOMAIN=DEV\nEXPAND: SSH -> FULL=\"Secure Shell\" | DOMAIN=NETWORKING_SECURITY\n\n[Cas 1 — Acronymes Cloud IaaS, PaaS et SaaS]\nEXPAND: IaaS -> FULL=\"Infrastructure as a Service\" | DOMAIN=CLOUD\nEXPAND: PaaS -> FULL=\"Platform as a Service\" | DOMAIN=CLOUD\nEXPAND: SaaS -> FULL=\"Software as a Service\" | DOMAIN=CLOUD\n\n[Cas 2 — Acronymes DevOps, Architecture et Système]\nEXPAND: CI/CD -> FULL=\"Continuous Integration / Continuous Delivery\" | DOMAIN=DEVOPS\nEXPAND: REST -> FULL=\"Representational State Transfer\" | DOMAIN=ARCHITECTURE\nEXPAND: CLI -> FULL=\"Command-Line Interface\" | DOMAIN=SYSTEM\n\n[Cas 3 — Gouvernance SLA et gestion des acronymes inconnus]\nEXPAND: SLA -> FULL=\"Service Level Agreement\" | DOMAIN=GOVERNANCE\nEXPAND: XYZ123 -> UNKNOWN\nEXPAND: TLS -> FULL=\"Transport Layer Security\" | DOMAIN=NETWORKING_SECURITY\n\n[Cas 4 — Réseaux et Interfaces graphiques]\nEXPAND: DNS -> FULL=\"Domain Name System\" | DOMAIN=NETWORKING\nEXPAND: GUI -> FULL=\"Graphical User Interface\" | DOMAIN=SYSTEM\n"
  },
  {
    id: "an3-c1-e2",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Linter de précision terminologique technique en anglais",
    goal: "Détecter les termes vagues ou familiers dans une phrase technique et les remplacer par la terminologie précise requise en ingénierie.",
    brief: "<p>En communication technique anglophone, les termes familiers comme <i>\"broken\"</i> ou <i>\"slow\"</i> manquent de rigueur et ralentissent le diagnostic d'incident.<br>\nPour chaque cas d’application des phrases techniques introduites par :<br>\n<code>CHECK_VOCAB &lt;phrase&gt;</code>.<br><br>\nRègles de substitution terminologique (sensibles aux mots entiers, insensibles à la casse lors de la détection) :<br>\n- <code>\"broken\"</code> -&gt; <code>\"experiencing an outage\"</code><br>\n- <code>\"slow\"</code> -&gt; <code>\"experiencing high latency\"</code><br>\n- <code>\"bad thing\"</code> -&gt; <code>\"security vulnerability\"</code><br>\n- <code>\"fixed the code\"</code> -&gt; <code>\"patched the codebase\"</code><br>\n- <code>\"crashed\"</code> -&gt; <code>\"terminated unexpectedly\"</code><br>\n- <code>\"hacked\"</code> -&gt; <code>\"compromised\"</code><br><br>\nPour chaque ligne, calculer le nombre total de remplacements effectués (<code>FLAGS</code>).<br>\nAfficher :<br>\n<code>LINT_RESULT: ORIGINAL=\"&lt;phrase_initiale&gt;\" | REVISED=\"&lt;phrase_corrigée&gt;\" | FLAGS=&lt;nombre&gt;</code></p>",
    starter: "# Grille d'analyse (an3-c1-e2) — Linter de précision terminologique technique en anglais\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Vulnérabilité et correction de code]\n# Données : CHECK_VOCAB We discovered a bad thing in auth and fixed the code yesterday\nA_COMPLETER\n\n[Cas 2 — Incident critique avec crash et compromission]\n# Données : CHECK_VOCAB The payment worker crashed after the database was hacked\nA_COMPLETER\n\n[Cas 3 — Texte déjà précis sans défaut terminologique]\n# Données : CHECK_VOCAB The API gateway is operating under nominal load with low response times\nA_COMPLETER\n\n[Cas 4 — Combinaison multiple avec plusieurs occurrences]\n# Données : CHECK_VOCAB Our cluster is broken and slow\nA_COMPLETER\n",
    hints: [
          "Remplacer d'abord les locutions de plusieurs mots (\"fixed the code\", \"bad thing\") avant les mots isolés.",
          "Utiliser des expressions régulières avec \\b pour respecter les frontières de mots."
    ],
    examples: [
          {
                "stdin": "CHECK_VOCAB The website is broken and the server is slow",
                "expected": "LINT_RESULT: ORIGINAL=\"The website is broken and the server is slow\" | REVISED=\"The website is experiencing an outage and the server is experiencing high latency\" | FLAGS=2",
                "note": "Deux termes imprécis remplacés par les formulations techniques officielles."
          }
    ],
    tests: [
          {
                "label": "Vulnérabilité et correction de code",
                "stdin": "cas:1",
                "expected": "LINT_RESULT: ORIGINAL=\"We discovered a bad thing in auth and fixed the code yesterday\" | REVISED=\"We discovered a security vulnerability in auth and patched the codebase yesterday\" | FLAGS=2"
          },
          {
                "label": "Incident critique avec crash et compromission",
                "stdin": "cas:2",
                "expected": "LINT_RESULT: ORIGINAL=\"The payment worker crashed after the database was hacked\" | REVISED=\"The payment worker terminated unexpectedly after the database was compromised\" | FLAGS=2"
          },
          {
                "label": "Texte déjà précis sans défaut terminologique",
                "stdin": "cas:3",
                "expected": "LINT_RESULT: ORIGINAL=\"The API gateway is operating under nominal load with low response times\" | REVISED=\"The API gateway is operating under nominal load with low response times\" | FLAGS=0"
          },
          {
                "label": "Combinaison multiple avec plusieurs occurrences",
                "stdin": "cas:4",
                "expected": "LINT_RESULT: ORIGINAL=\"Our cluster is broken and slow\" | REVISED=\"Our cluster is experiencing an outage and experiencing high latency\" | FLAGS=2"
          }
    ],
    solution: "[Exemple]\nLINT_RESULT: ORIGINAL=\"The website is broken and the server is slow\" | REVISED=\"The website is experiencing an outage and the server is experiencing high latency\" | FLAGS=2\n\n[Cas 1 — Vulnérabilité et correction de code]\nLINT_RESULT: ORIGINAL=\"We discovered a bad thing in auth and fixed the code yesterday\" | REVISED=\"We discovered a security vulnerability in auth and patched the codebase yesterday\" | FLAGS=2\n\n[Cas 2 — Incident critique avec crash et compromission]\nLINT_RESULT: ORIGINAL=\"The payment worker crashed after the database was hacked\" | REVISED=\"The payment worker terminated unexpectedly after the database was compromised\" | FLAGS=2\n\n[Cas 3 — Texte déjà précis sans défaut terminologique]\nLINT_RESULT: ORIGINAL=\"The API gateway is operating under nominal load with low response times\" | REVISED=\"The API gateway is operating under nominal load with low response times\" | FLAGS=0\n\n[Cas 4 — Combinaison multiple avec plusieurs occurrences]\nLINT_RESULT: ORIGINAL=\"Our cluster is broken and slow\" | REVISED=\"Our cluster is experiencing an outage and experiencing high latency\" | FLAGS=2\n"
  },
  {
    id: "an3-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Classificateur de modèle Cloud (IaaS vs PaaS vs SaaS)",
    goal: "Classifier une architecture hébergée selon le modèle de responsabilité partagée Cloud (IaaS, PaaS, SaaS) et expliciter la responsabilité de l’équipe cliente.",
    brief: "<p>Le modèle de responsabilité partagée (<i>Shared Responsibility Model</i>) définit rigoureusement quelles couches de l'infrastructure sont gérées par le fournisseur Cloud (<i>Cloud Service Provider</i>) ou par le client.<br>\nLe cas reçoit sur l'entrée standard des lignes au format :<br>\n<code>SERVICE name=&lt;nom&gt; provider_manages=&lt;c1,c2,...&gt;</code>.<br><br>\nRègles de classification :<br>\n- <b>SaaS</b> : Le fournisseur gère l'ensemble des couches logicielles et d'infrastructure : <code>application</code>, <code>data_hosting</code>, <code>runtime</code>, <code>os</code>, <code>hardware</code>.<br>\n  Responsabilité client : <code>CONFIGURATION_AND_USER_ACCESS</code>.<br>\n- <b>PaaS</b> : Le fournisseur gère <code>runtime</code>, <code>os</code>, <code>hardware</code>, mais <b>ne gère pas</b> <code>application</code>.<br>\n  Responsabilité client : <code>APPLICATION_CODE_AND_DATA_SCHEMAS</code>.<br>\n- <b>IaaS</b> : Le fournisseur gère <code>hardware</code> et <code>virtualization</code>, mais <b>ne gère pas</b> <code>os</code> ni <code>runtime</code>.<br>\n  Responsabilité client : <code>OS_PATCHING_RUNTIME_AND_APP_STACK</code>.<br>\n- Dans les autres cas : Modèle <code>HYBRID_OR_CUSTOM</code> et responsabilité <code>SHARED_GOVERNANCE_AUDIT</code>.<br><br>\nAfficher :<br>\n<code>CLOUD_EVAL: &lt;nom&gt; -&gt; MODEL=&lt;MODÈLE&gt; | CLIENT_RESPONSIBILITY=&lt;RESPONSABILITÉ&gt;</code></p>",
    starter: "# Grille d'analyse (an3-c1-e3) — Classificateur de modèle Cloud (IaaS vs PaaS vs SaaS)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Plateforme managée PaaS]\n# Données : SERVICE name=ManagedAppEngine provider_manages=hardware,os,runtime\nA_COMPLETER\n\n[Cas 2 — Logiciel hébergé SaaS complet]\n# Données : SERVICE name=EnterpriseCRM provider_manages=hardware,os,runtime,application,data_hosting\nA_COMPLETER\n\n[Cas 3 — Modèle hybride ou configuration personnalisée]\n# Données : SERVICE name=OnPremPrivateApp provider_manages=monitoring_only\nA_COMPLETER\n\n[Cas 4 — Multiples services simultanés]\n# Données : SERVICE name=ComputeEC2 provider_manages=hardware,virtualization\n# Données : SERVICE name=CollabSuite provider_manages=hardware,os,runtime,application,data_hosting\nA_COMPLETER\n",
    hints: [
          "Extraire la liste des couches gérées par le fournisseur et la transformer en ensemble (set).",
          "Vérifier l'appartenance aux différents modèles par inclusion ensembliste."
    ],
    examples: [
          {
                "stdin": "SERVICE name=VirtualMachineCluster provider_manages=hardware,virtualization",
                "expected": "CLOUD_EVAL: VirtualMachineCluster -> MODEL=IaaS | CLIENT_RESPONSIBILITY=OS_PATCHING_RUNTIME_AND_APP_STACK",
                "note": "Le fournisseur gère uniquement hardware et virtualization : modèle IaaS."
          }
    ],
    tests: [
          {
                "label": "Plateforme managée PaaS",
                "stdin": "cas:1",
                "expected": "CLOUD_EVAL: ManagedAppEngine -> MODEL=PaaS | CLIENT_RESPONSIBILITY=APPLICATION_CODE_AND_DATA_SCHEMAS"
          },
          {
                "label": "Logiciel hébergé SaaS complet",
                "stdin": "cas:2",
                "expected": "CLOUD_EVAL: EnterpriseCRM -> MODEL=SaaS | CLIENT_RESPONSIBILITY=CONFIGURATION_AND_USER_ACCESS"
          },
          {
                "label": "Modèle hybride ou configuration personnalisée",
                "stdin": "cas:3",
                "expected": "CLOUD_EVAL: OnPremPrivateApp -> MODEL=HYBRID_OR_CUSTOM | CLIENT_RESPONSIBILITY=SHARED_GOVERNANCE_AUDIT"
          },
          {
                "label": "Multiples services simultanés",
                "stdin": "cas:4",
                "expected": "CLOUD_EVAL: ComputeEC2 -> MODEL=IaaS | CLIENT_RESPONSIBILITY=OS_PATCHING_RUNTIME_AND_APP_STACK\nCLOUD_EVAL: CollabSuite -> MODEL=SaaS | CLIENT_RESPONSIBILITY=CONFIGURATION_AND_USER_ACCESS"
          }
    ],
    solution: "[Exemple]\nCLOUD_EVAL: VirtualMachineCluster -> MODEL=IaaS | CLIENT_RESPONSIBILITY=OS_PATCHING_RUNTIME_AND_APP_STACK\n\n[Cas 1 — Plateforme managée PaaS]\nCLOUD_EVAL: ManagedAppEngine -> MODEL=PaaS | CLIENT_RESPONSIBILITY=APPLICATION_CODE_AND_DATA_SCHEMAS\n\n[Cas 2 — Logiciel hébergé SaaS complet]\nCLOUD_EVAL: EnterpriseCRM -> MODEL=SaaS | CLIENT_RESPONSIBILITY=CONFIGURATION_AND_USER_ACCESS\n\n[Cas 3 — Modèle hybride ou configuration personnalisée]\nCLOUD_EVAL: OnPremPrivateApp -> MODEL=HYBRID_OR_CUSTOM | CLIENT_RESPONSIBILITY=SHARED_GOVERNANCE_AUDIT\n\n[Cas 4 — Multiples services simultanés]\nCLOUD_EVAL: ComputeEC2 -> MODEL=IaaS | CLIENT_RESPONSIBILITY=OS_PATCHING_RUNTIME_AND_APP_STACK\nCLOUD_EVAL: CollabSuite -> MODEL=SaaS | CLIENT_RESPONSIBILITY=CONFIGURATION_AND_USER_ACCESS\n"
  }
];
