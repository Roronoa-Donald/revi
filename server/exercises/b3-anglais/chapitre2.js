/**
 * chapitre2.js — Études de cas du cours « b3-anglais ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "an3-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Analyseur et auditeur de conformité RFC 2119",
    goal: "Analyser les mots-clés normatifs d’une spécification technique en anglais (RFC 2119) pour déterminer le niveau d’exigence contractuel.",
    brief: "<p>La norme <b>RFC 2119</b> définit avec rigueur les mots-clés indiquant les exigences impératives, recommandées ou optionnelles dans les standards de l'Internet.<br>\nPour chaque cas d’application des clauses techniques au format :<br>\n<code>RFC_CLAUSE id=&lt;ID&gt; text=&lt;clause en anglais&gt;</code>.<br><br>\nRègles d'évaluation (recherche de mots entiers, insensible à la casse) :<br>\n- Si le texte contient <code>MUST NOT</code> ou <code>SHALL NOT</code> :<br>\n  <code>LEVEL=ABSOLUTE_PROHIBITION | PRIORITY=P1_CRITICAL</code><br>\n- Sinon, si le texte contient <code>MUST</code>, <code>REQUIRED</code> ou <code>SHALL</code> :<br>\n  <code>LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL</code><br>\n- Sinon, si le texte contient <code>SHOULD NOT</code> ou <code>NOT RECOMMENDED</code> :<br>\n  <code>LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED</code><br>\n- Sinon, si le texte contient <code>SHOULD</code> ou <code>RECOMMENDED</code> :<br>\n  <code>LEVEL=BEST_PRACTICE | PRIORITY=P2_RECOMMENDED</code><br>\n- Sinon, si le texte contient <code>MAY</code> ou <code>OPTIONAL</code> :<br>\n  <code>LEVEL=OPTIONAL_FEATURE | PRIORITY=P3_OPTIONAL</code><br>\n- Dans les autres cas :<br>\n  <code>LEVEL=INFORMATIONAL | PRIORITY=P4_INFO</code><br><br>\nAfficher :<br>\n<code>RFC_AUDIT: &lt;ID&gt; -&gt; LEVEL=&lt;LEVEL&gt; | PRIORITY=&lt;PRIORITY&gt;</code></p>",
    starter: "# Grille d'analyse (an3-c2-e1) — Analyseur et auditeur de conformité RFC 2119\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Interdiction absolue MUST NOT]\n# Données : RFC_CLAUSE id=REQ-102 text=The gateway MUST NOT forward unauthenticated requests to internal microservices.\nA_COMPLETER\n\n[Cas 2 — Recommandation positive SHOULD et clause optionnelle MAY]\n# Données : RFC_CLAUSE id=REQ-103 text=Servers SHOULD cache database query responses for at least sixty seconds.\n# Données : RFC_CLAUSE id=REQ-104 text=Clients MAY include a custom trace-id header for distributed observability.\nA_COMPLETER\n\n[Cas 3 — Pratique déconseillée SHOULD NOT et clause descriptive informative]\n# Données : RFC_CLAUSE id=REQ-105 text=Applications SHOULD NOT store plaintext passwords in environment variables.\n# Données : RFC_CLAUSE id=REQ-106 text=This specification was drafted in accordance with international security guidelines.\nA_COMPLETER\n\n[Cas 4 — Termes synonymes REQUIRED et NOT RECOMMENDED]\n# Données : RFC_CLAUSE id=REQ-107 text=Two-factor authentication is REQUIRED for administrator console access.\n# Données : RFC_CLAUSE id=REQ-108 text=Using MD5 hashing is NOT RECOMMENDED due to known collision attacks.\nA_COMPLETER\n",
    hints: [
          "Traiter les négations (\"MUST NOT\", \"SHALL NOT\", \"SHOULD NOT\") avant les affirmations simples.",
          "Utiliser re.search avec \\b pour ne pas confondre \"may\" dans un autre mot comme \"maybe\"."
    ],
    examples: [
          {
                "stdin": "RFC_CLAUSE id=REQ-101 text=The client MUST validate the TLS certificate chain before sending data.",
                "expected": "RFC_AUDIT: REQ-101 -> LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL",
                "note": "Le mot-clé MUST impose une exigence absolue de niveau P1."
          }
    ],
    tests: [
          {
                "label": "Interdiction absolue MUST NOT",
                "stdin": "cas:1",
                "expected": "RFC_AUDIT: REQ-102 -> LEVEL=ABSOLUTE_PROHIBITION | PRIORITY=P1_CRITICAL"
          },
          {
                "label": "Recommandation positive SHOULD et clause optionnelle MAY",
                "stdin": "cas:2",
                "expected": "RFC_AUDIT: REQ-103 -> LEVEL=BEST_PRACTICE | PRIORITY=P2_RECOMMENDED\nRFC_AUDIT: REQ-104 -> LEVEL=OPTIONAL_FEATURE | PRIORITY=P3_OPTIONAL"
          },
          {
                "label": "Pratique déconseillée SHOULD NOT et clause descriptive informative",
                "stdin": "cas:3",
                "expected": "RFC_AUDIT: REQ-105 -> LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED\nRFC_AUDIT: REQ-106 -> LEVEL=INFORMATIONAL | PRIORITY=P4_INFO"
          },
          {
                "label": "Termes synonymes REQUIRED et NOT RECOMMENDED",
                "stdin": "cas:4",
                "expected": "RFC_AUDIT: REQ-107 -> LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL\nRFC_AUDIT: REQ-108 -> LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED"
          }
    ],
    solution: "[Exemple]\nRFC_AUDIT: REQ-101 -> LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL\n\n[Cas 1 — Interdiction absolue MUST NOT]\nRFC_AUDIT: REQ-102 -> LEVEL=ABSOLUTE_PROHIBITION | PRIORITY=P1_CRITICAL\n\n[Cas 2 — Recommandation positive SHOULD et clause optionnelle MAY]\nRFC_AUDIT: REQ-103 -> LEVEL=BEST_PRACTICE | PRIORITY=P2_RECOMMENDED\nRFC_AUDIT: REQ-104 -> LEVEL=OPTIONAL_FEATURE | PRIORITY=P3_OPTIONAL\n\n[Cas 3 — Pratique déconseillée SHOULD NOT et clause descriptive informative]\nRFC_AUDIT: REQ-105 -> LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED\nRFC_AUDIT: REQ-106 -> LEVEL=INFORMATIONAL | PRIORITY=P4_INFO\n\n[Cas 4 — Termes synonymes REQUIRED et NOT RECOMMENDED]\nRFC_AUDIT: REQ-107 -> LEVEL=ABSOLUTE_REQUIREMENT | PRIORITY=P1_CRITICAL\nRFC_AUDIT: REQ-108 -> LEVEL=DEPRECATED_PRACTICE | PRIORITY=P2_RECOMMENDED\n"
  },
  {
    id: "an3-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Linter de documentation d’endpoints REST & OpenAPI",
    goal: "Vérifier la validité et la complétude de la documentation d’une route d’API REST (méthode HTTP, format de chemin, authentification et codes de retour).",
    brief: "<p>Dans la documentation d'API (type Swagger/OpenAPI ou Stripe/Twilio), chaque endpoint doit respecter des conventions strictes.<br>\nPour chaque cas d’application des définitions d'endpoints au format :<br>\n<code>API_ENDPOINT method=&lt;METHOD&gt; path=&lt;PATH&gt; auth=&lt;true|false&gt; status_codes=&lt;c1,c2,...&gt;</code>.<br><br>\nRègles de validation :<br>\n1. <b>Méthode HTTP</b> : doit appartenir à <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, <code>PATCH</code>. Si invalide : ajouter <code>INVALID_METHOD</code>.<br>\n2. <b>Chemin (URI)</b> : doit débuter par <code>/</code> et ne contenir que des caractères alphanumériques, tirets, underscores, slashes et accolades de variables d'URL (<code>{id}</code>). Si invalide : ajouter <code>INVALID_PATH_FORMAT</code>.<br>\n3. <b>Succès</b> : la liste des codes doit comporter au moins un code de succès (<code>200</code>, <code>201</code> ou <code>204</code>). Si absent : ajouter <code>MISSING_SUCCESS_STATUS</code>.<br>\n4. <b>Authentification</b> : si <code>auth=true</code>, la liste doit contenir au moins un code d'erreur d'authentification ou d'autorisation (<code>401</code> ou <code>403</code>). Si absent : ajouter <code>MISSING_AUTH_ERROR_CODE</code>.<br><br>\nAfficher :<br>\n- Si aucune anomalie :<br>\n  <code>ENDPOINT_STATUS: &lt;METHOD&gt; &lt;PATH&gt; -&gt; VALID</code><br>\n- Si des anomalies sont détectées :<br>\n  <code>ENDPOINT_STATUS: &lt;METHOD&gt; &lt;PATH&gt; -&gt; INVALID | ISSUES=&lt;issue1,issue2,...&gt;</code> (anomalies triées par ordre alphabétique).</p>",
    starter: "# Grille d'analyse (an3-c2-e2) — Linter de documentation d’endpoints REST & OpenAPI\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Endpoint avec authentification manquante de code 401/403]\n# Données : API_ENDPOINT method=POST path=/api/v1/orders auth=true status_codes=201,400,500\nA_COMPLETER\n\n[Cas 2 — Méthode HTTP et chemin non conformes]\n# Données : API_ENDPOINT method=FETCH path=api/v1/invalid\\path auth=false status_codes=200\nA_COMPLETER\n\n[Cas 3 — Absence de code de succès HTTP 2xx]\n# Données : API_ENDPOINT method=DELETE path=/api/v1/sessions/{id} auth=false status_codes=404,500\nA_COMPLETER\n\n[Cas 4 — Endpoint valide avec code 204 No Content]\n# Données : API_ENDPOINT method=DELETE path=/api/v1/cache auth=true status_codes=204,401,403\nA_COMPLETER\n",
    hints: [
          "Valider le format du chemin avec une expression régulière : ^/[a-zA-Z0-9/_{}-]+$",
          "Trier la liste des anomalies avec sorted() avant de la joindre avec une virgule."
    ],
    examples: [
          {
                "stdin": "API_ENDPOINT method=GET path=/api/v1/users auth=true status_codes=200,401,500",
                "expected": "ENDPOINT_STATUS: GET /api/v1/users -> VALID",
                "note": "Méthode GET valide, chemin conforme, code 200 présent et code 401 présent pour auth=true."
          }
    ],
    tests: [
          {
                "label": "Endpoint avec authentification manquante de code 401/403",
                "stdin": "cas:1",
                "expected": "ENDPOINT_STATUS: POST /api/v1/orders -> INVALID | ISSUES=MISSING_AUTH_ERROR_CODE"
          },
          {
                "label": "Méthode HTTP et chemin non conformes",
                "stdin": "cas:2",
                "expected": "ENDPOINT_STATUS: FETCH api/v1/invalid\\path -> INVALID | ISSUES=INVALID_METHOD,INVALID_PATH_FORMAT"
          },
          {
                "label": "Absence de code de succès HTTP 2xx",
                "stdin": "cas:3",
                "expected": "ENDPOINT_STATUS: DELETE /api/v1/sessions/{id} -> INVALID | ISSUES=MISSING_SUCCESS_STATUS"
          },
          {
                "label": "Endpoint valide avec code 204 No Content",
                "stdin": "cas:4",
                "expected": "ENDPOINT_STATUS: DELETE /api/v1/cache -> VALID"
          }
    ],
    solution: "[Exemple]\nENDPOINT_STATUS: GET /api/v1/users -> VALID\n\n[Cas 1 — Endpoint avec authentification manquante de code 401/403]\nENDPOINT_STATUS: POST /api/v1/orders -> INVALID | ISSUES=MISSING_AUTH_ERROR_CODE\n\n[Cas 2 — Méthode HTTP et chemin non conformes]\nENDPOINT_STATUS: FETCH api/v1/invalid\\path -> INVALID | ISSUES=INVALID_METHOD,INVALID_PATH_FORMAT\n\n[Cas 3 — Absence de code de succès HTTP 2xx]\nENDPOINT_STATUS: DELETE /api/v1/sessions/{id} -> INVALID | ISSUES=MISSING_SUCCESS_STATUS\n\n[Cas 4 — Endpoint valide avec code 204 No Content]\nENDPOINT_STATUS: DELETE /api/v1/cache -> VALID\n"
  },
  {
    id: "an3-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Générateur de sommaire technique Markdown et slugification",
    goal: "Analyser une documentation technique en Markdown, extraire les titres h1, h2, h3 et générer une table des matières indentée avec ancres de liens conformes.",
    brief: "<p>Une documentation technique de qualité professionnelle (fichier <code>README.md</code> ou spécification d'architecture) comporte une table des matières (<i>Table of Contents</i>) structurée permettant une navigation rapide.<br>\nPour chaque cas d’application des lignes d'un document Markdown.<br><br>\nRègles d'extraction et de formatage :<br>\n- Les lignes de titres commencent par <code># </code> (h1), <code>## </code> (h2) ou <code>### </code> (h3). Ignorer les autres lignes.<br>\n- Pour chaque titre, nettoyer les espaces superflus et construire un slug d'ancre :<br>\n  * Convertir le texte du titre en minuscules.<br>\n  * Remplacer tout caractère qui n'est ni une lettre minuscule, ni un chiffre par un tiret <code>-</code>.<br>\n  * Réduire les tirets consécutifs à un seul tiret.<br>\n  * Supprimer les tirets au début et à la fin du slug.<br>\n- Formatage de la table des matières :<br>\n  * Titre h1 : <code>- [&lt;Titre&gt;](#&lt;slug&gt;)</code><br>\n  * Titre h2 : <code>  - [&lt;Titre&gt;](#&lt;slug&gt;)</code> (2 espaces d'indentation)<br>\n  * Titre h3 : <code>    - [&lt;Titre&gt;](#&lt;slug&gt;)</code> (4 espaces d'indentation)<br><br>\nAfficher :<br>\n<code>TABLE_OF_CONTENTS_START</code><br>\n&lt;lignes du sommaire&gt;<br>\n<code>TABLE_OF_CONTENTS_END | COUNT=&lt;nombre_de_titres&gt;</code></p>",
    starter: "# Grille d'analyse (an3-c2-e3) — Générateur de sommaire technique Markdown et slugification\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — README avec texte informatif intercalé et caractères spéciaux]\n# Données : # Payment Service v2.0!\n# Données : This service handles credit cards.\n# Données : ## Setup & Configuration\n# Données : Run npm install.\n# Données : ### Environment Variables (ENV)\nA_COMPLETER\n\n[Cas 2 — Sous-sections multiples au niveau h2]\n# Données : # Architecture\n# Données : ## Microservices\n# Données : ## Database Cluster\n# Données : ## Monitoring & Alerts\nA_COMPLETER\n\n[Cas 3 — Document vide ou sans aucun titre Markdown]\n# Données : Just a regular paragraph with no markdown headers.\n# Données : Another note.\nA_COMPLETER\n\n[Cas 4 — Titres avec tirets existants et espaces multiples]\n# Données : # Single--Sign-On   SSO\n# Données : ## SAML 2.0 Auth\nA_COMPLETER\n",
    hints: [
          "Calculer le niveau de titre selon le nombre de dièses consécutifs (1, 2 ou 3).",
          "Construire le slug avec re.sub(r\"[^a-z0-9]+\", \"-\", texte.lower()).strip(\"-\")."
    ],
    examples: [
          {
                "stdin": "# Introduction to Cloud API\n## Getting Started\n### Installation Guide",
                "expected": "TABLE_OF_CONTENTS_START\n- [Introduction to Cloud API](#introduction-to-cloud-api)\n  - [Getting Started](#getting-started)\n    - [Installation Guide](#installation-guide)\nTABLE_OF_CONTENTS_END | COUNT=3",
                "note": "Génération de la table des matières avec trois niveaux d'indentation et slugs conformes."
          }
    ],
    tests: [
          {
                "label": "README avec texte informatif intercalé et caractères spéciaux",
                "stdin": "cas:1",
                "expected": "TABLE_OF_CONTENTS_START\n- [Payment Service v2.0!](#payment-service-v2-0)\n  - [Setup & Configuration](#setup-configuration)\n    - [Environment Variables (ENV)](#environment-variables-env)\nTABLE_OF_CONTENTS_END | COUNT=3"
          },
          {
                "label": "Sous-sections multiples au niveau h2",
                "stdin": "cas:2",
                "expected": "TABLE_OF_CONTENTS_START\n- [Architecture](#architecture)\n  - [Microservices](#microservices)\n  - [Database Cluster](#database-cluster)\n  - [Monitoring & Alerts](#monitoring-alerts)\nTABLE_OF_CONTENTS_END | COUNT=4"
          },
          {
                "label": "Document vide ou sans aucun titre Markdown",
                "stdin": "cas:3",
                "expected": "TABLE_OF_CONTENTS_START\nTABLE_OF_CONTENTS_END | COUNT=0"
          },
          {
                "label": "Titres avec tirets existants et espaces multiples",
                "stdin": "cas:4",
                "expected": "TABLE_OF_CONTENTS_START\n- [Single--Sign-On   SSO](#single-sign-on-sso)\n  - [SAML 2.0 Auth](#saml-2-0-auth)\nTABLE_OF_CONTENTS_END | COUNT=2"
          }
    ],
    solution: "[Exemple]\nTABLE_OF_CONTENTS_START\n- [Introduction to Cloud API](#introduction-to-cloud-api)\n  - [Getting Started](#getting-started)\n    - [Installation Guide](#installation-guide)\nTABLE_OF_CONTENTS_END | COUNT=3\n\n[Cas 1 — README avec texte informatif intercalé et caractères spéciaux]\nTABLE_OF_CONTENTS_START\n- [Payment Service v2.0!](#payment-service-v2-0)\n  - [Setup & Configuration](#setup-configuration)\n    - [Environment Variables (ENV)](#environment-variables-env)\nTABLE_OF_CONTENTS_END | COUNT=3\n\n[Cas 2 — Sous-sections multiples au niveau h2]\nTABLE_OF_CONTENTS_START\n- [Architecture](#architecture)\n  - [Microservices](#microservices)\n  - [Database Cluster](#database-cluster)\n  - [Monitoring & Alerts](#monitoring-alerts)\nTABLE_OF_CONTENTS_END | COUNT=4\n\n[Cas 3 — Document vide ou sans aucun titre Markdown]\nTABLE_OF_CONTENTS_START\nTABLE_OF_CONTENTS_END | COUNT=0\n\n[Cas 4 — Titres avec tirets existants et espaces multiples]\nTABLE_OF_CONTENTS_START\n- [Single--Sign-On   SSO](#single-sign-on-sso)\n  - [SAML 2.0 Auth](#saml-2-0-auth)\nTABLE_OF_CONTENTS_END | COUNT=2\n"
  }
];
