/**
 * Exercices du Chapitre 2 : Conquering Technical Documentation & API Specifications.
 * Préfixe : an3-c2-e
 */
'use strict';

module.exports = [
  {
    id: 'an3-c2-e1',
    chapter: 2,
    title: 'Analyseur et auditeur de conformité RFC 2119',
    level: 'n1',
    language: 'python',
    goal: 'Analyser les mots-clés normatifs d’une spécification technique en anglais (RFC 2119) pour déterminer le niveau d’exigence contractuel.',
    brief: `<p>La norme <b>RFC 2119</b> définit avec rigueur les mots-clés indiquant les exigences impératives, recommandées ou optionnelles dans les standards de l'Internet.<br>
Le script lit sur l'entrée standard des clauses techniques au format :<br>
<code>RFC_CLAUSE id=&lt;ID&gt; text=&lt;clause en anglais&gt;</code>.<br><br>
Règles d'évaluation (recherche de mots entiers, insensible à la casse) :<br>
- Si le texte contient <code>MUST NOT</code> ou <code>SHALL NOT</code> :<br>
  <code>LEVEL=ABSOLUTE_PROHIBITION | PRIORITY=P1_CRITICAL</code><br>
- Sinon, si le texte contient <code>MUST</code>, <code>REQUIRED</code> ou <code>SHALL</code> :<br>
  <code>LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL</code><br>
- Sinon, si le texte contient <code>SHOULD NOT</code> ou <code>NOT RECOMMENDED</code> :<br>
  <code>LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED</code><br>
- Sinon, si le texte contient <code>SHOULD</code> ou <code>RECOMMENDED</code> :<br>
  <code>LEVEL=BEST_PRACTICE | PRIORITY=P2_RECOMMENDED</code><br>
- Sinon, si le texte contient <code>MAY</code> ou <code>OPTIONAL</code> :<br>
  <code>LEVEL=OPTIONAL_FEATURE | PRIORITY=P3_OPTIONAL</code><br>
- Dans les autres cas :<br>
  <code>LEVEL=INFORMATIONAL | PRIORITY=P4_INFO</code><br><br>
Afficher :<br>
<code>RFC_AUDIT: &lt;ID&gt; -&gt; LEVEL=&lt;LEVEL&gt; | PRIORITY=&lt;PRIORITY&gt;</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier chaque clause selon la RFC 2119
`,
    hints: [
      'Traiter les négations ("MUST NOT", "SHALL NOT", "SHOULD NOT") avant les affirmations simples.',
      'Utiliser re.search avec \\b pour ne pas confondre "may" dans un autre mot comme "maybe".'
    ],
    examples: [
      {
        stdin: 'RFC_CLAUSE id=REQ-101 text=The client MUST validate the TLS certificate chain before sending data.',
        expected: 'RFC_AUDIT: REQ-101 -> LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL',
        note: 'Le mot-clé MUST impose une exigence absolue de niveau P1.'
      }
    ],
    tests: [
      {
        label: 'Interdiction absolue MUST NOT',
        stdin: 'RFC_CLAUSE id=REQ-102 text=The gateway MUST NOT forward unauthenticated requests to internal microservices.',
        expected: 'RFC_AUDIT: REQ-102 -> LEVEL=ABSOLUTE_PROHIBITION | PRIORITY=P1_CRITICAL'
      },
      {
        label: 'Recommandation positive SHOULD et clause optionnelle MAY',
        stdin: 'RFC_CLAUSE id=REQ-103 text=Servers SHOULD cache database query responses for at least sixty seconds.\nRFC_CLAUSE id=REQ-104 text=Clients MAY include a custom trace-id header for distributed observability.',
        expected: 'RFC_AUDIT: REQ-103 -> LEVEL=BEST_PRACTICE | PRIORITY=P2_RECOMMENDED\nRFC_AUDIT: REQ-104 -> LEVEL=OPTIONAL_FEATURE | PRIORITY=P3_OPTIONAL'
      },
      {
        label: 'Pratique déconseillée SHOULD NOT et clause descriptive informative',
        stdin: 'RFC_CLAUSE id=REQ-105 text=Applications SHOULD NOT store plaintext passwords in environment variables.\nRFC_CLAUSE id=REQ-106 text=This specification was drafted in accordance with international security guidelines.',
        expected: 'RFC_AUDIT: REQ-105 -> LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED\nRFC_AUDIT: REQ-106 -> LEVEL=INFORMATIONAL | PRIORITY=P4_INFO'
      },
      {
        label: 'Termes synonymes REQUIRED et NOT RECOMMENDED',
        stdin: 'RFC_CLAUSE id=REQ-107 text=Two-factor authentication is REQUIRED for administrator console access.\nRFC_CLAUSE id=REQ-108 text=Using MD5 hashing is NOT RECOMMENDED due to known collision attacks.',
        expected: 'RFC_AUDIT: REQ-107 -> LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL\nRFC_AUDIT: REQ-108 -> LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.match(r'RFC_CLAUSE id=([^\\s]+) text=(.*)', lig)
    if not m:
        continue
    cid = m.group(1)
    text = m.group(2)
    
    if re.search(r'\\b(MUST\\s+NOT|SHALL\\s+NOT)\\b', text, re.I):
        level = 'ABSOLUTE_PROHIBITION'
        prio = 'P1_CRITICAL'
    elif re.search(r'\\b(MUST|REQUIRED|SHALL)\\b', text, re.I):
        level = 'ABSOLUTE_REQUIREMENT'
        prio = 'P1_CRITICAL'
    elif re.search(r'\\b(SHOULD\\s+NOT|NOT\\s+RECOMMENDED)\\b', text, re.I):
        level = 'DEPRECATED_PRACTICE'
        prio = 'P2_RECOMMENDED'
    elif re.search(r'\\b(SHOULD|RECOMMENDED)\\b', text, re.I):
        level = 'BEST_PRACTICE'
        prio = 'P2_RECOMMENDED'
    elif re.search(r'\\b(MAY|OPTIONAL)\\b', text, re.I):
        level = 'OPTIONAL_FEATURE'
        prio = 'P3_OPTIONAL'
    else:
        level = 'INFORMATIONAL'
        prio = 'P4_INFO'
        
    print(f'RFC_AUDIT: {cid} -> LEVEL={level} | PRIORITY={prio}')
`
  },
  {
    id: 'an3-c2-e2',
    chapter: 2,
    title: 'Linter de documentation d’endpoints REST & OpenAPI',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la validité et la complétude de la documentation d’une route d’API REST (méthode HTTP, format de chemin, authentification et codes de retour).',
    brief: `<p>Dans la documentation d'API (type Swagger/OpenAPI ou Stripe/Twilio), chaque endpoint doit respecter des conventions strictes.<br>
Le script lit sur l'entrée standard des définitions d'endpoints au format :<br>
<code>API_ENDPOINT method=&lt;METHOD&gt; path=&lt;PATH&gt; auth=&lt;true|false&gt; status_codes=&lt;c1,c2,...&gt;</code>.<br><br>
Règles de validation :<br>
1. <b>Méthode HTTP</b> : doit appartenir à <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, <code>PATCH</code>. Si invalide : ajouter <code>INVALID_METHOD</code>.<br>
2. <b>Chemin (URI)</b> : doit débuter par <code>/</code> et ne contenir que des caractères alphanumériques, tirets, underscores, slashes et accolades de variables d'URL (<code>{id}</code>). Si invalide : ajouter <code>INVALID_PATH_FORMAT</code>.<br>
3. <b>Succès</b> : la liste des codes doit comporter au moins un code de succès (<code>200</code>, <code>201</code> ou <code>204</code>). Si absent : ajouter <code>MISSING_SUCCESS_STATUS</code>.<br>
4. <b>Authentification</b> : si <code>auth=true</code>, la liste doit contenir au moins un code d'erreur d'authentification ou d'autorisation (<code>401</code> ou <code>403</code>). Si absent : ajouter <code>MISSING_AUTH_ERROR_CODE</code>.<br><br>
Afficher :<br>
- Si aucune anomalie :<br>
  <code>ENDPOINT_STATUS: &lt;METHOD&gt; &lt;PATH&gt; -&gt; VALID</code><br>
- Si des anomalies sont détectées :<br>
  <code>ENDPOINT_STATUS: &lt;METHOD&gt; &lt;PATH&gt; -&gt; INVALID | ISSUES=&lt;issue1,issue2,...&gt;</code> (anomalies triées par ordre alphabétique).</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider chaque endpoint et recenser les anomalies
`,
    hints: [
      'Valider le format du chemin avec une expression régulière : ^/[a-zA-Z0-9/_{}-]+$',
      'Trier la liste des anomalies avec sorted() avant de la joindre avec une virgule.'
    ],
    examples: [
      {
        stdin: 'API_ENDPOINT method=GET path=/api/v1/users auth=true status_codes=200,401,500',
        expected: 'ENDPOINT_STATUS: GET /api/v1/users -> VALID',
        note: 'Méthode GET valide, chemin conforme, code 200 présent et code 401 présent pour auth=true.'
      }
    ],
    tests: [
      {
        label: 'Endpoint avec authentification manquante de code 401/403',
        stdin: 'API_ENDPOINT method=POST path=/api/v1/orders auth=true status_codes=201,400,500',
        expected: 'ENDPOINT_STATUS: POST /api/v1/orders -> INVALID | ISSUES=MISSING_AUTH_ERROR_CODE'
      },
      {
        label: 'Méthode HTTP et chemin non conformes',
        stdin: 'API_ENDPOINT method=FETCH path=api/v1/invalid\\path auth=false status_codes=200',
        expected: 'ENDPOINT_STATUS: FETCH api/v1/invalid\\path -> INVALID | ISSUES=INVALID_METHOD,INVALID_PATH_FORMAT'
      },
      {
        label: 'Absence de code de succès HTTP 2xx',
        stdin: 'API_ENDPOINT method=DELETE path=/api/v1/sessions/{id} auth=false status_codes=404,500',
        expected: 'ENDPOINT_STATUS: DELETE /api/v1/sessions/{id} -> INVALID | ISSUES=MISSING_SUCCESS_STATUS'
      },
      {
        label: 'Endpoint valide avec code 204 No Content',
        stdin: 'API_ENDPOINT method=DELETE path=/api/v1/cache auth=true status_codes=204,401,403',
        expected: 'ENDPOINT_STATUS: DELETE /api/v1/cache -> VALID'
      }
    ],
    solution: `import sys
import re

VALID_METHODS = {'GET', 'POST', 'PUT', 'DELETE', 'PATCH'}
SUCCESS_CODES = {'200', '201', '204'}
AUTH_CODES = {'401', '403'}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_meth = re.search(r'method=([^\\s]+)', lig)
    m_path = re.search(r'path=([^\\s]+)', lig)
    m_auth = re.search(r'auth=([^\\s]+)', lig)
    m_codes = re.search(r'status_codes=([^\\s]+)', lig)
    if not (m_meth and m_path and m_auth and m_codes):
        continue
        
    method = m_meth.group(1)
    path = m_path.group(1)
    auth = m_auth.group(1).lower() == 'true'
    codes = set(m_codes.group(1).split(','))
    
    issues = []
    if method not in VALID_METHODS:
        issues.append('INVALID_METHOD')
    if not re.match(r'^/[a-zA-Z0-9/_\\-{}]+$', path):
        issues.append('INVALID_PATH_FORMAT')
    if not codes.intersection(SUCCESS_CODES):
        issues.append('MISSING_SUCCESS_STATUS')
    if auth and not codes.intersection(AUTH_CODES):
        issues.append('MISSING_AUTH_ERROR_CODE')
        
    if not issues:
        print(f'ENDPOINT_STATUS: {method} {path} -> VALID')
    else:
        issues.sort()
        print(f'ENDPOINT_STATUS: {method} {path} -> INVALID | ISSUES={",".join(issues)}')
`
  },
  {
    id: 'an3-c2-e3',
    chapter: 2,
    title: 'Générateur de sommaire technique Markdown et slugification',
    level: 'n3',
    language: 'python',
    goal: 'Analyser une documentation technique en Markdown, extraire les titres h1, h2, h3 et générer une table des matières indentée avec ancres de liens conformes.',
    brief: `<p>Une documentation technique de qualité professionnelle (fichier <code>README.md</code> ou spécification d'architecture) comporte une table des matières (<i>Table of Contents</i>) structurée permettant une navigation rapide.<br>
Le script lit sur l'entrée standard des lignes d'un document Markdown.<br><br>
Règles d'extraction et de formatage :<br>
- Les lignes de titres commencent par <code># </code> (h1), <code>## </code> (h2) ou <code>### </code> (h3). Ignorer les autres lignes.<br>
- Pour chaque titre, nettoyer les espaces superflus et construire un slug d'ancre :<br>
  * Convertir le texte du titre en minuscules.<br>
  * Remplacer tout caractère qui n'est ni une lettre minuscule, ni un chiffre par un tiret <code>-</code>.<br>
  * Réduire les tirets consécutifs à un seul tiret.<br>
  * Supprimer les tirets au début et à la fin du slug.<br>
- Formatage de la table des matières :<br>
  * Titre h1 : <code>- [&lt;Titre&gt;](#&lt;slug&gt;)</code><br>
  * Titre h2 : <code>  - [&lt;Titre&gt;](#&lt;slug&gt;)</code> (2 espaces d'indentation)<br>
  * Titre h3 : <code>    - [&lt;Titre&gt;](#&lt;slug&gt;)</code> (4 espaces d'indentation)<br><br>
Afficher :<br>
<code>TABLE_OF_CONTENTS_START</code><br>
&lt;lignes du sommaire&gt;<br>
<code>TABLE_OF_CONTENTS_END | COUNT=&lt;nombre_de_titres&gt;</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : extraire les titres et générer le sommaire avec slugs
`,
    hints: [
      'Calculer le niveau de titre selon le nombre de dièses consécutifs (1, 2 ou 3).',
      'Construire le slug avec re.sub(r"[^a-z0-9]+", "-", texte.lower()).strip("-").'
    ],
    examples: [
      {
        stdin: '# Introduction to Cloud API\n## Getting Started\n### Installation Guide',
        expected: 'TABLE_OF_CONTENTS_START\n- [Introduction to Cloud API](#introduction-to-cloud-api)\n  - [Getting Started](#getting-started)\n    - [Installation Guide](#installation-guide)\nTABLE_OF_CONTENTS_END | COUNT=3',
        note: 'Génération de la table des matières avec trois niveaux d\'indentation et slugs conformes.'
      }
    ],
    tests: [
      {
        label: 'README avec texte informatif intercalé et caractères spéciaux',
        stdin: '# Payment Service v2.0!\nThis service handles credit cards.\n## Setup & Configuration\nRun npm install.\n### Environment Variables (ENV)',
        expected: 'TABLE_OF_CONTENTS_START\n- [Payment Service v2.0!](#payment-service-v2-0)\n  - [Setup & Configuration](#setup-configuration)\n    - [Environment Variables (ENV)](#environment-variables-env)\nTABLE_OF_CONTENTS_END | COUNT=3'
      },
      {
        label: 'Sous-sections multiples au niveau h2',
        stdin: '# Architecture\n## Microservices\n## Database Cluster\n## Monitoring & Alerts',
        expected: 'TABLE_OF_CONTENTS_START\n- [Architecture](#architecture)\n  - [Microservices](#microservices)\n  - [Database Cluster](#database-cluster)\n  - [Monitoring & Alerts](#monitoring-alerts)\nTABLE_OF_CONTENTS_END | COUNT=4'
      },
      {
        label: 'Document vide ou sans aucun titre Markdown',
        stdin: 'Just a regular paragraph with no markdown headers.\nAnother note.',
        expected: 'TABLE_OF_CONTENTS_START\nTABLE_OF_CONTENTS_END | COUNT=0'
      },
      {
        label: 'Titres avec tirets existants et espaces multiples',
        stdin: '# Single--Sign-On   SSO\n## SAML 2.0 Auth',
        expected: 'TABLE_OF_CONTENTS_START\n- [Single--Sign-On   SSO](#single-sign-on-sso)\n  - [SAML 2.0 Auth](#saml-2-0-auth)\nTABLE_OF_CONTENTS_END | COUNT=2'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def make_slug(text):
    slug = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')
    return slug

items = []

for lig in lignes:
    m = re.match(r'^(#{1,3})\\s+(.*)', lig)
    if not m:
        continue
    hashes = m.group(1)
    title = m.group(2).strip()
    depth = len(hashes)
    slug = make_slug(title)
    
    if depth == 1:
        indent = ''
    elif depth == 2:
        indent = '  '
    else:
        indent = '    '
        
    items.append(f'{indent}- [{title}](#{slug})')

print('TABLE_OF_CONTENTS_START')
for item in items:
    print(item)
print(f'TABLE_OF_CONTENTS_END | COUNT={len(items)}')
`
  }
];
