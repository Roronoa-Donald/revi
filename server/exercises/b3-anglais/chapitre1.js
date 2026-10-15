/**
 * Exercices du Chapitre 1 : Advanced IT Terminology, Acronyms & Cloud Architecture Lexicon.
 * Préfixe : an3-c1-e
 */
'use strict';

module.exports = [
  {
    id: 'an3-c1-e1',
    chapter: 1,
    title: 'Analyseur et expanseur d’acronymes IT critiques',
    level: 'n1',
    language: 'python',
    goal: 'Analyser une séquence d’acronymes techniques anglophones et restituer leur forme développée ainsi que leur domaine technologique normalisé.',
    brief: `<p>Dans les équipes d'ingénierie internationales, la maîtrise exacte des acronymes IT est indispensable pour rédiger et interpréter des spécifications techniques sans ambiguïté.<br>
Le script lit sur l'entrée standard une liste de requêtes au format :<br>
<code>ACRONYM &lt;CODE&gt;</code>.<br><br>
Table des acronymes normalisés :<br>
- <code>API</code> : <code>FULL="Application Programming Interface" | DOMAIN=DEV</code><br>
- <code>CI/CD</code> : <code>FULL="Continuous Integration / Continuous Delivery" | DOMAIN=DEVOPS</code><br>
- <code>IaaS</code> : <code>FULL="Infrastructure as a Service" | DOMAIN=CLOUD</code><br>
- <code>PaaS</code> : <code>FULL="Platform as a Service" | DOMAIN=CLOUD</code><br>
- <code>SaaS</code> : <code>FULL="Software as a Service" | DOMAIN=CLOUD</code><br>
- <code>SSH</code> : <code>FULL="Secure Shell" | DOMAIN=NETWORKING_SECURITY</code><br>
- <code>TLS</code> : <code>FULL="Transport Layer Security" | DOMAIN=NETWORKING_SECURITY</code><br>
- <code>DNS</code> : <code>FULL="Domain Name System" | DOMAIN=NETWORKING</code><br>
- <code>REST</code> : <code>FULL="Representational State Transfer" | DOMAIN=ARCHITECTURE</code><br>
- <code>CLI</code> : <code>FULL="Command-Line Interface" | DOMAIN=SYSTEM</code><br>
- <code>GUI</code> : <code>FULL="Graphical User Interface" | DOMAIN=SYSTEM</code><br>
- <code>SLA</code> : <code>FULL="Service Level Agreement" | DOMAIN=GOVERNANCE</code><br><br>
Pour chaque ligne :<br>
- Si l'acronyme est connu (la comparaison doit être insensible à la casse pour les lettres) :<br>
  <code>EXPAND: &lt;CODE&gt; -&gt; FULL="&lt;Nom Développé&gt;" | DOMAIN=&lt;DOMAINE&gt;</code><br>
- Si l'acronyme est inconnu :<br>
  <code>EXPAND: &lt;CODE&gt; -&gt; UNKNOWN</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : associer chaque acronyme à son expansion et son domaine
`,
    hints: [
      'Stocker les correspondances dans un dictionnaire avec des clés en majuscules.',
      'Veiller à préserver la casse d\'origine du paramètre CODE dans l\'affichage final.'
    ],
    examples: [
      {
        stdin: 'ACRONYM API\nACRONYM SSH',
        expected: 'EXPAND: API -> FULL="Application Programming Interface" | DOMAIN=DEV\nEXPAND: SSH -> FULL="Secure Shell" | DOMAIN=NETWORKING_SECURITY',
        note: 'Expansion de deux acronymes clés en DEV et NETWORKING_SECURITY.'
      }
    ],
    tests: [
      {
        label: 'Acronymes Cloud IaaS, PaaS et SaaS',
        stdin: 'ACRONYM IaaS\nACRONYM PaaS\nACRONYM SaaS',
        expected: 'EXPAND: IaaS -> FULL="Infrastructure as a Service" | DOMAIN=CLOUD\nEXPAND: PaaS -> FULL="Platform as a Service" | DOMAIN=CLOUD\nEXPAND: SaaS -> FULL="Software as a Service" | DOMAIN=CLOUD'
      },
      {
        label: 'Acronymes DevOps, Architecture et Système',
        stdin: 'ACRONYM CI/CD\nACRONYM REST\nACRONYM CLI',
        expected: 'EXPAND: CI/CD -> FULL="Continuous Integration / Continuous Delivery" | DOMAIN=DEVOPS\nEXPAND: REST -> FULL="Representational State Transfer" | DOMAIN=ARCHITECTURE\nEXPAND: CLI -> FULL="Command-Line Interface" | DOMAIN=SYSTEM'
      },
      {
        label: 'Gouvernance SLA et gestion des acronymes inconnus',
        stdin: 'ACRONYM SLA\nACRONYM XYZ123\nACRONYM TLS',
        expected: 'EXPAND: SLA -> FULL="Service Level Agreement" | DOMAIN=GOVERNANCE\nEXPAND: XYZ123 -> UNKNOWN\nEXPAND: TLS -> FULL="Transport Layer Security" | DOMAIN=NETWORKING_SECURITY'
      },
      {
        label: 'Réseaux et Interfaces graphiques',
        stdin: 'ACRONYM DNS\nACRONYM GUI',
        expected: 'EXPAND: DNS -> FULL="Domain Name System" | DOMAIN=NETWORKING\nEXPAND: GUI -> FULL="Graphical User Interface" | DOMAIN=SYSTEM'
      }
    ],
    solution: `import sys

TABLE = {
    'API': ('Application Programming Interface', 'DEV'),
    'CI/CD': ('Continuous Integration / Continuous Delivery', 'DEVOPS'),
    'IAAS': ('Infrastructure as a Service', 'CLOUD'),
    'PAAS': ('Platform as a Service', 'CLOUD'),
    'SAAS': ('Software as a Service', 'CLOUD'),
    'SSH': ('Secure Shell', 'NETWORKING_SECURITY'),
    'TLS': ('Transport Layer Security', 'NETWORKING_SECURITY'),
    'DNS': ('Domain Name System', 'NETWORKING'),
    'REST': ('Representational State Transfer', 'ARCHITECTURE'),
    'CLI': ('Command-Line Interface', 'SYSTEM'),
    'GUI': ('Graphical User Interface', 'SYSTEM'),
    'SLA': ('Service Level Agreement', 'GOVERNANCE')
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('ACRONYM '):
        continue
    code = lig[len('ACRONYM '):].strip()
    cle = code.upper()
    if cle in TABLE:
        full, domain = TABLE[cle]
        print(f'EXPAND: {code} -> FULL="{full}" | DOMAIN={domain}')
    else:
        print(f'EXPAND: {code} -> UNKNOWN')
`
  },
  {
    id: 'an3-c1-e2',
    chapter: 1,
    title: 'Linter de précision terminologique technique en anglais',
    level: 'n2',
    language: 'python',
    goal: 'Détecter les termes vagues ou familiers dans une phrase technique et les remplacer par la terminologie précise requise en ingénierie.',
    brief: `<p>En communication technique anglophone, les termes familiers comme <i>"broken"</i> ou <i>"slow"</i> manquent de rigueur et ralentissent le diagnostic d'incident.<br>
Le script lit sur l'entrée standard des phrases techniques introduites par :<br>
<code>CHECK_VOCAB &lt;phrase&gt;</code>.<br><br>
Règles de substitution terminologique (sensibles aux mots entiers, insensibles à la casse lors de la détection) :<br>
- <code>"broken"</code> -&gt; <code>"experiencing an outage"</code><br>
- <code>"slow"</code> -&gt; <code>"experiencing high latency"</code><br>
- <code>"bad thing"</code> -&gt; <code>"security vulnerability"</code><br>
- <code>"fixed the code"</code> -&gt; <code>"patched the codebase"</code><br>
- <code>"crashed"</code> -&gt; <code>"terminated unexpectedly"</code><br>
- <code>"hacked"</code> -&gt; <code>"compromised"</code><br><br>
Pour chaque ligne, calculer le nombre total de remplacements effectués (<code>FLAGS</code>).<br>
Afficher :<br>
<code>LINT_RESULT: ORIGINAL="&lt;phrase_initiale&gt;" | REVISED="&lt;phrase_corrigée&gt;" | FLAGS=&lt;nombre&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : identifier les termes imprécis et générer la version révisée
`,
    hints: [
      'Remplacer d\'abord les locutions de plusieurs mots ("fixed the code", "bad thing") avant les mots isolés.',
      'Utiliser des expressions régulières avec \\b pour respecter les frontières de mots.'
    ],
    examples: [
      {
        stdin: 'CHECK_VOCAB The website is broken and the server is slow',
        expected: 'LINT_RESULT: ORIGINAL="The website is broken and the server is slow" | REVISED="The website is experiencing an outage and the server is experiencing high latency" | FLAGS=2',
        note: 'Deux termes imprécis remplacés par les formulations techniques officielles.'
      }
    ],
    tests: [
      {
        label: 'Vulnérabilité et correction de code',
        stdin: 'CHECK_VOCAB We discovered a bad thing in auth and fixed the code yesterday',
        expected: 'LINT_RESULT: ORIGINAL="We discovered a bad thing in auth and fixed the code yesterday" | REVISED="We discovered a security vulnerability in auth and patched the codebase yesterday" | FLAGS=2'
      },
      {
        label: 'Incident critique avec crash et compromission',
        stdin: 'CHECK_VOCAB The payment worker crashed after the database was hacked',
        expected: 'LINT_RESULT: ORIGINAL="The payment worker crashed after the database was hacked" | REVISED="The payment worker terminated unexpectedly after the database was compromised" | FLAGS=2'
      },
      {
        label: 'Texte déjà précis sans défaut terminologique',
        stdin: 'CHECK_VOCAB The API gateway is operating under nominal load with low response times',
        expected: 'LINT_RESULT: ORIGINAL="The API gateway is operating under nominal load with low response times" | REVISED="The API gateway is operating under nominal load with low response times" | FLAGS=0'
      },
      {
        label: 'Combinaison multiple avec plusieurs occurrences',
        stdin: 'CHECK_VOCAB Our cluster is broken and slow',
        expected: 'LINT_RESULT: ORIGINAL="Our cluster is broken and slow" | REVISED="Our cluster is experiencing an outage and experiencing high latency" | FLAGS=2'
      }
    ],
    solution: `import sys
import re

PATTERNS = [
    (r'\\bfixed the code\\b', 'patched the codebase'),
    (r'\\bbad thing\\b', 'security vulnerability'),
    (r'\\bbroken\\b', 'experiencing an outage'),
    (r'\\bslow\\b', 'experiencing high latency'),
    (r'\\bcrashed\\b', 'terminated unexpectedly'),
    (r'\\bhacked\\b', 'compromised')
]

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('CHECK_VOCAB '):
        continue
    phrase = lig[len('CHECK_VOCAB '):].strip()
    revised = phrase
    flags = 0
    for pattern, repl in PATTERNS:
        matches = len(re.findall(pattern, revised, flags=re.IGNORECASE))
        if matches > 0:
            flags += matches
            revised = re.sub(pattern, repl, revised, flags=re.IGNORECASE)
    print(f'LINT_RESULT: ORIGINAL="{phrase}" | REVISED="{revised}" | FLAGS={flags}')
`
  },
  {
    id: 'an3-c1-e3',
    chapter: 1,
    title: 'Classificateur de modèle Cloud (IaaS vs PaaS vs SaaS)',
    level: 'n3',
    language: 'python',
    goal: 'Classifier une architecture hébergée selon le modèle de responsabilité partagée Cloud (IaaS, PaaS, SaaS) et expliciter la responsabilité de l’équipe cliente.',
    brief: `<p>Le modèle de responsabilité partagée (<i>Shared Responsibility Model</i>) définit rigoureusement quelles couches de l'infrastructure sont gérées par le fournisseur Cloud (<i>Cloud Service Provider</i>) ou par le client.<br>
Le script reçoit sur l'entrée standard des lignes au format :<br>
<code>SERVICE name=&lt;nom&gt; provider_manages=&lt;c1,c2,...&gt;</code>.<br><br>
Règles de classification :<br>
- <b>SaaS</b> : Le fournisseur gère l'ensemble des couches logicielles et d'infrastructure : <code>application</code>, <code>data_hosting</code>, <code>runtime</code>, <code>os</code>, <code>hardware</code>.<br>
  Responsabilité client : <code>CONFIGURATION_AND_USER_ACCESS</code>.<br>
- <b>PaaS</b> : Le fournisseur gère <code>runtime</code>, <code>os</code>, <code>hardware</code>, mais <b>ne gère pas</b> <code>application</code>.<br>
  Responsabilité client : <code>APPLICATION_CODE_AND_DATA_SCHEMAS</code>.<br>
- <b>IaaS</b> : Le fournisseur gère <code>hardware</code> et <code>virtualization</code>, mais <b>ne gère pas</b> <code>os</code> ni <code>runtime</code>.<br>
  Responsabilité client : <code>OS_PATCHING_RUNTIME_AND_APP_STACK</code>.<br>
- Dans les autres cas : Modèle <code>HYBRID_OR_CUSTOM</code> et responsabilité <code>SHARED_GOVERNANCE_AUDIT</code>.<br><br>
Afficher :<br>
<code>CLOUD_EVAL: &lt;nom&gt; -&gt; MODEL=&lt;MODÈLE&gt; | CLIENT_RESPONSIBILITY=&lt;RESPONSABILITÉ&gt;</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : déduire le modèle Cloud selon les couches gérées par le fournisseur
`,
    hints: [
      'Extraire la liste des couches gérées par le fournisseur et la transformer en ensemble (set).',
      'Vérifier l\'appartenance aux différents modèles par inclusion ensembliste.'
    ],
    examples: [
      {
        stdin: 'SERVICE name=VirtualMachineCluster provider_manages=hardware,virtualization',
        expected: 'CLOUD_EVAL: VirtualMachineCluster -> MODEL=IaaS | CLIENT_RESPONSIBILITY=OS_PATCHING_RUNTIME_AND_APP_STACK',
        note: 'Le fournisseur gère uniquement hardware et virtualization : modèle IaaS.'
      }
    ],
    tests: [
      {
        label: 'Plateforme managée PaaS',
        stdin: 'SERVICE name=ManagedAppEngine provider_manages=hardware,os,runtime',
        expected: 'CLOUD_EVAL: ManagedAppEngine -> MODEL=PaaS | CLIENT_RESPONSIBILITY=APPLICATION_CODE_AND_DATA_SCHEMAS'
      },
      {
        label: 'Logiciel hébergé SaaS complet',
        stdin: 'SERVICE name=EnterpriseCRM provider_manages=hardware,os,runtime,application,data_hosting',
        expected: 'CLOUD_EVAL: EnterpriseCRM -> MODEL=SaaS | CLIENT_RESPONSIBILITY=CONFIGURATION_AND_USER_ACCESS'
      },
      {
        label: 'Modèle hybride ou configuration personnalisée',
        stdin: 'SERVICE name=OnPremPrivateApp provider_manages=monitoring_only',
        expected: 'CLOUD_EVAL: OnPremPrivateApp -> MODEL=HYBRID_OR_CUSTOM | CLIENT_RESPONSIBILITY=SHARED_GOVERNANCE_AUDIT'
      },
      {
        label: 'Multiples services simultanés',
        stdin: 'SERVICE name=ComputeEC2 provider_manages=hardware,virtualization\nSERVICE name=CollabSuite provider_manages=hardware,os,runtime,application,data_hosting',
        expected: 'CLOUD_EVAL: ComputeEC2 -> MODEL=IaaS | CLIENT_RESPONSIBILITY=OS_PATCHING_RUNTIME_AND_APP_STACK\nCLOUD_EVAL: CollabSuite -> MODEL=SaaS | CLIENT_RESPONSIBILITY=CONFIGURATION_AND_USER_ACCESS'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_name = re.search(r'name=([^\\s]+)', lig)
    m_pm = re.search(r'provider_manages=([^\\s]+)', lig)
    if not (m_name and m_pm):
        continue
    name = m_name.group(1)
    layers = set(m_pm.group(1).lower().split(','))
    
    # SaaS: application, data_hosting, runtime, os, hardware
    saas_req = {'application', 'data_hosting', 'runtime', 'os', 'hardware'}
    paas_req = {'runtime', 'os', 'hardware'}
    iaas_req = {'hardware', 'virtualization'}
    
    if saas_req.issubset(layers):
        model = 'SaaS'
        resp = 'CONFIGURATION_AND_USER_ACCESS'
    elif paas_req.issubset(layers) and 'application' not in layers:
        model = 'PaaS'
        resp = 'APPLICATION_CODE_AND_DATA_SCHEMAS'
    elif iaas_req.issubset(layers) and 'os' not in layers and 'runtime' not in layers:
        model = 'IaaS'
        resp = 'OS_PATCHING_RUNTIME_AND_APP_STACK'
    else:
        model = 'HYBRID_OR_CUSTOM'
        resp = 'SHARED_GOVERNANCE_AUDIT'
        
    print(f'CLOUD_EVAL: {name} -> MODEL={model} | CLIENT_RESPONSIBILITY={resp}')
`
  }
];
