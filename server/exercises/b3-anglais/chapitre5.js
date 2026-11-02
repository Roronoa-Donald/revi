/**
 * chapitre5.js — Études de cas du cours « b3-anglais ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "an3-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Choisir un message de support clair et prudent",
    goal: "Lire des messages d'assistance en anglais et choisir une formulation adaptée sans affirmer un état de paiement non vérifié.",
    brief: "<p>Pour chaque ligne <code>TRANSLATE_ERROR code=&lt;CODE&gt;</code>, choisissez le message anglais le plus adapté parmi les propositions suivantes. Pour un code inconnu, utilisez le message général D.</p><ul><li><b>A</b> : <em>Your session has expired. Please sign in again.</em></li><li><b>B</b> : <em>We could not confirm your payment status. Please check it or contact support before trying again.</em></li><li><b>C</b> : <em>Too many requests were sent. Please wait before sending another request; check any pending payment first.</em></li><li><b>D</b> : <em>An unexpected issue occurred. Please check its status or contact support before trying again.</em></li><li><b>E</b> : <em>Your uploaded file exceeds the 10 MB limit. Please compress it before re-uploading.</em></li><li><b>F</b> : <em>Your account has been temporarily locked for security. Please reset your password or contact support.</em></li></ul><p>Répondez par <code>SUPPORT_MESSAGE: [&lt;CODE&gt;] -&gt; &lt;LETTRE&gt;</code>. Cette sélection à choix fermé n'évalue pas toutes les autres formulations correctes possibles.</p>",
    starter: "# Grille d'analyse (an3-c5-e1) — Choisir un message de support clair et prudent\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Erreur de passerelle de paiement 502]\n# Données : TRANSLATE_ERROR code=ERR_PAYMENT_GATEWAY_502\nA_COMPLETER\n\n[Cas 2 — Erreur de dépassement de quota de requêtes]\n# Données : TRANSLATE_ERROR code=ERR_RATE_LIMIT_EXCEEDED\nA_COMPLETER\n\n[Cas 3 — Code d’erreur interne inconnu]\n# Données : TRANSLATE_ERROR code=ERR_INTERNAL_CORRUPTED_CACHE_POINTER\nA_COMPLETER\n\n[Cas 4 — Fichier trop lourd et compte verrouillé]\n# Données : TRANSLATE_ERROR code=ERR_FILE_TOO_LARGE\n# Données : TRANSLATE_ERROR code=ERR_ACCOUNT_LOCKED\nA_COMPLETER\n",
    hints: [
          "Une erreur 502 ne confirme ni l'échec ni la réussite d'un paiement.",
          "Pour un code inconnu, choisissez le message général ; ne supposez pas que l'équipe a déjà été avertie."
    ],
    examples: [
          {
                "stdin": "TRANSLATE_ERROR code=ERR_AUTH_JWT_EXPIRED",
                "expected": "SUPPORT_MESSAGE: [ERR_AUTH_JWT_EXPIRED] -> A",
                "note": "Le message A décrit une session expirée sans exposer le jargon du jeton."
          }
    ],
    tests: [
          {
                "label": "Erreur de passerelle de paiement 502",
                "stdin": "cas:1",
                "expected": "SUPPORT_MESSAGE: [ERR_PAYMENT_GATEWAY_502] -> B"
          },
          {
                "label": "Erreur de dépassement de quota de requêtes",
                "stdin": "cas:2",
                "expected": "SUPPORT_MESSAGE: [ERR_RATE_LIMIT_EXCEEDED] -> C"
          },
          {
                "label": "Code d’erreur interne inconnu",
                "stdin": "cas:3",
                "expected": "SUPPORT_MESSAGE: [ERR_INTERNAL_CORRUPTED_CACHE_POINTER] -> D"
          },
          {
                "label": "Fichier trop lourd et compte verrouillé",
                "stdin": "cas:4",
                "expected": "SUPPORT_MESSAGE: [ERR_FILE_TOO_LARGE] -> E\nSUPPORT_MESSAGE: [ERR_ACCOUNT_LOCKED] -> F"
          }
    ],
    solution: "[Exemple]\nSUPPORT_MESSAGE: [ERR_AUTH_JWT_EXPIRED] -> A\n\n[Cas 1 — Erreur de passerelle de paiement 502]\nSUPPORT_MESSAGE: [ERR_PAYMENT_GATEWAY_502] -> B\n\n[Cas 2 — Erreur de dépassement de quota de requêtes]\nSUPPORT_MESSAGE: [ERR_RATE_LIMIT_EXCEEDED] -> C\n\n[Cas 3 — Code d’erreur interne inconnu]\nSUPPORT_MESSAGE: [ERR_INTERNAL_CORRUPTED_CACHE_POINTER] -> D\n\n[Cas 4 — Fichier trop lourd et compte verrouillé]\nSUPPORT_MESSAGE: [ERR_FILE_TOO_LARGE] -> E\nSUPPORT_MESSAGE: [ERR_ACCOUNT_LOCKED] -> F\n"
  },
  {
    id: "an3-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Matrice de sévérité d’incident et calcul de SLA de réponse",
    goal: "Déterminer le niveau de sévérité ITIL (SEV-1 à SEV-4) d’un incident technique et fixer les délais maximaux de prise en charge et de résolution.",
    brief: "<p>Dans les centres d'opérations réseau (NOC) et équipes SRE internationales, la matrice de sévérité croise l'<b>Impact</b> sur le métier et l'<b>Urgence</b> technique pour fixer contractuellement les fenêtres de réponse.<br>\nPour chaque cas d’application des signalements d'incidents :<br>\n<code>INCIDENT_EVAL id=&lt;id&gt; impact=&lt;CRITICAL|MAJOR|MODERATE|LOW&gt; urgency=&lt;IMMEDIATE|HIGH|NORMAL|LOW&gt;</code>.<br><br>\nMatrice ITIL de classification :<br>\n- <b>SEV-1 (Critical Outage)</b> : Si <code>impact=CRITICAL</code> et <code>urgency=IMMEDIATE</code>.<br>\n  SLA : <code>RESPONSE=15m | RESOLUTION=4h</code><br>\n- <b>SEV-2 (Major Incident)</b> : Si l'une des combinaisons suivantes est vérifiée :<br>\n  * <code>impact=CRITICAL</code> et <code>urgency=HIGH</code><br>\n  * <code>impact=MAJOR</code> et (<code>urgency=IMMEDIATE</code> ou <code>urgency=HIGH</code>)<br>\n  * <code>impact=MODERATE</code> et <code>urgency=IMMEDIATE</code><br>\n  SLA : <code>RESPONSE=30m | RESOLUTION=8h</code><br>\n- <b>SEV-3 (Minor Incident)</b> : Si l'une des combinaisons suivantes est vérifiée :<br>\n  * <code>impact=MODERATE</code> et (<code>urgency=HIGH</code> ou <code>urgency=NORMAL</code>)<br>\n  * <code>impact=MAJOR</code> et <code>urgency=NORMAL</code><br>\n  * <code>impact=LOW</code> et <code>urgency=IMMEDIATE</code><br>\n  SLA : <code>RESPONSE=2h | RESOLUTION=24h</code><br>\n- <b>SEV-4 (Cosmetic / Low Impact)</b> : Dans toutes les autres situations.<br>\n  SLA : <code>RESPONSE=8h | RESOLUTION=72h</code><br><br>\nAfficher :<br>\n<code>INCIDENT_CLASSIFICATION: &lt;id&gt; -&gt; LEVEL=&lt;LEVEL&gt; | SLA_RESPONSE=&lt;RESPONSE&gt; | SLA_RESOLUTION=&lt;RESOLUTION&gt;</code></p>",
    starter: "# Grille d'analyse (an3-c5-e2) — Matrice de sévérité d’incident et calcul de SLA de réponse\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Incident SEV-2 majeur (Impact Major et Urgence High)]\n# Données : INCIDENT_EVAL id=INC-402 impact=MAJOR urgency=HIGH\nA_COMPLETER\n\n[Cas 2 — Incident SEV-3 mineur]\n# Données : INCIDENT_EVAL id=INC-403 impact=MODERATE urgency=NORMAL\nA_COMPLETER\n\n[Cas 3 — Incident SEV-4 cosmétique et basse priorité]\n# Données : INCIDENT_EVAL id=INC-404 impact=LOW urgency=LOW\nA_COMPLETER\n\n[Cas 4 — Multiples incidents traités simultanément]\n# Données : INCIDENT_EVAL id=INC-801 impact=MODERATE urgency=IMMEDIATE\n# Données : INCIDENT_EVAL id=INC-802 impact=LOW urgency=IMMEDIATE\nA_COMPLETER\n",
    hints: [
          "Tester les règles de sévérité dans l'ordre décroissant de gravité (SEV-1, puis SEV-2, puis SEV-3, puis SEV-4).",
          "Normaliser les valeurs d'impact et d'urgence en majuscules."
    ],
    examples: [
          {
                "stdin": "INCIDENT_EVAL id=INC-401 impact=CRITICAL urgency=IMMEDIATE",
                "expected": "INCIDENT_CLASSIFICATION: INC-401 -> LEVEL=SEV-1 (Critical Outage) | SLA_RESPONSE=15m | SLA_RESOLUTION=4h",
                "note": "Impact critique et urgence immédiate : incident majeur SEV-1."
          }
    ],
    tests: [
          {
                "label": "Incident SEV-2 majeur (Impact Major et Urgence High)",
                "stdin": "cas:1",
                "expected": "INCIDENT_CLASSIFICATION: INC-402 -> LEVEL=SEV-2 (Major Incident) | SLA_RESPONSE=30m | SLA_RESOLUTION=8h"
          },
          {
                "label": "Incident SEV-3 mineur",
                "stdin": "cas:2",
                "expected": "INCIDENT_CLASSIFICATION: INC-403 -> LEVEL=SEV-3 (Minor Incident) | SLA_RESPONSE=2h | SLA_RESOLUTION=24h"
          },
          {
                "label": "Incident SEV-4 cosmétique et basse priorité",
                "stdin": "cas:3",
                "expected": "INCIDENT_CLASSIFICATION: INC-404 -> LEVEL=SEV-4 (Cosmetic / Low Impact) | SLA_RESPONSE=8h | SLA_RESOLUTION=72h"
          },
          {
                "label": "Multiples incidents traités simultanément",
                "stdin": "cas:4",
                "expected": "INCIDENT_CLASSIFICATION: INC-801 -> LEVEL=SEV-2 (Major Incident) | SLA_RESPONSE=30m | SLA_RESOLUTION=8h\nINCIDENT_CLASSIFICATION: INC-802 -> LEVEL=SEV-3 (Minor Incident) | SLA_RESPONSE=2h | SLA_RESOLUTION=24h"
          }
    ],
    solution: "[Exemple]\nINCIDENT_CLASSIFICATION: INC-401 -> LEVEL=SEV-1 (Critical Outage) | SLA_RESPONSE=15m | SLA_RESOLUTION=4h\n\n[Cas 1 — Incident SEV-2 majeur (Impact Major et Urgence High)]\nINCIDENT_CLASSIFICATION: INC-402 -> LEVEL=SEV-2 (Major Incident) | SLA_RESPONSE=30m | SLA_RESOLUTION=8h\n\n[Cas 2 — Incident SEV-3 mineur]\nINCIDENT_CLASSIFICATION: INC-403 -> LEVEL=SEV-3 (Minor Incident) | SLA_RESPONSE=2h | SLA_RESOLUTION=24h\n\n[Cas 3 — Incident SEV-4 cosmétique et basse priorité]\nINCIDENT_CLASSIFICATION: INC-404 -> LEVEL=SEV-4 (Cosmetic / Low Impact) | SLA_RESPONSE=8h | SLA_RESOLUTION=72h\n\n[Cas 4 — Multiples incidents traités simultanément]\nINCIDENT_CLASSIFICATION: INC-801 -> LEVEL=SEV-2 (Major Incident) | SLA_RESPONSE=30m | SLA_RESOLUTION=8h\nINCIDENT_CLASSIFICATION: INC-802 -> LEVEL=SEV-3 (Minor Incident) | SLA_RESPONSE=2h | SLA_RESOLUTION=24h\n"
  },
  {
    id: "an3-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Validateur de Post-Mortem Blameless et chaîne des 5 Pourquoi",
    goal: "Auditer un rapport post-mortem d’ingénierie (RCA) pour garantir l’absence de culpabilisation individuelle (blameless) et la présence d’une analyse systémique par les 5 Pourquoi.",
    brief: "<p>La culture d'ingénierie moderne (Google SRE, Netflix, AWS) prescrit des <i>Blameless Post-Mortems</i> : les pannes ne sont jamais imputées à une erreur humaine individuelle mais à un manque de garde-fous systémiques (manque de tests, d'alertes ou d'automatisation).<br>\nLe cas présente à l'analyse les blocs d'un post-mortem :<br>\n<code>POSTMORTEM id=&lt;id&gt; author=&lt;author&gt;</code><br>\n<code>WHY_1: &lt;cause 1&gt;</code><br>\n<code>WHY_2: &lt;cause 2&gt;</code><br>\n<code>WHY_3: &lt;cause 3&gt;</code><br>\n<code>WHY_4: &lt;cause 4&gt;</code><br>\n<code>WHY_5: &lt;cause 5 racine&gt;</code><br>\n<code>REMEDIATION: &lt;action corrective&gt;</code><br><br>\nRègles d'audit :<br>\n1. <b>Principe Blameless</b> : Aucun des champs <code>WHY_1</code> à <code>WHY_5</code> ni <code>REMEDIATION</code> ne doit contenir de vocabulaire de culpabilisation individuelle : <code>blame</code>, <code>fault</code>, <code>careless</code>, <code>lazy</code>, <code>fired</code>, <code>stupid</code> (insensible à la casse, mots entiers). Si présent : <code>REJECTED | REASON=BLAMELESS_VIOLATION_DETECTED</code>.<br>\n2. <b>Chaîne causale complète</b> : Les 5 questions (<code>WHY_1</code> à <code>WHY_5</code>) doivent toutes être présentes et non vides. Si une est manquante : <code>REJECTED | REASON=INCOMPLETE_5_WHYS_CHAIN</code>.<br>\n3. <b>Action corrective systémique</b> : Le champ <code>REMEDIATION</code> doit mentionner au moins un mot-clé de protection automatisée de l'infrastructure : <code>automate</code>, <code>test</code>, <code>lint</code>, <code>monitor</code>, <code>alert</code>, <code>circuit breaker</code>, <code>canary</code>, <code>safeguard</code>. Si absent : <code>REJECTED | REASON=NON_SYSTEMIC_REMEDIATION</code>.<br><br>\nAfficher :<br>\n- Si conforme : <code>POSTMORTEM_EVAL: &lt;id&gt; -&gt; STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS</code><br>\n- Si non conforme : <code>POSTMORTEM_EVAL: &lt;id&gt; -&gt; STATUS=REJECTED | REASON=&lt;motif&gt;</code></p>",
    starter: "# Grille d'analyse (an3-c5-e3) — Validateur de Post-Mortem Blameless et chaîne des 5 Pourquoi\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Violation du principe blameless avec désignation de coupable]\n# Données : POSTMORTEM id=PM-102 author=Manager\n# Données : WHY_1: Production crashed\n# Données : WHY_2: Wrong config uploaded\n# Données : WHY_3: The intern was careless\n# Données : WHY_4: Lack of training\n# Données : WHY_5: Onboarding was rushed\n# Données : REMEDIATION: Train developers\nA_COMPLETER\n\n[Cas 2 — Chaîne des 5 pourquoi incomplète (arrêt au 3ème pourquoi)]\n# Données : POSTMORTEM id=PM-103 author=SRETeam\n# Données : WHY_1: Memory leak caused OOM kill\n# Données : WHY_2: Buffer was not freed in loop\n# Données : WHY_3: Garbage collector was overwhelmed\n# Données : REMEDIATION: Add alert when memory usage exceeds 80%\nA_COMPLETER\n\n[Cas 3 — Remédiation non systémique sans garde-fou technique]\n# Données : POSTMORTEM id=PM-104 author=TechLead\n# Données : WHY_1: API returned 500 errors\n# Données : WHY_2: Certificate expired\n# Données : WHY_3: Certificate was renewed manually\n# Données : WHY_4: Nobody tracked the calendar date\n# Données : WHY_5: Renewal was not managed by infrastructure as code\n# Données : REMEDIATION: Remind engineers to write dates in their paper notebook\nA_COMPLETER\n\n[Cas 4 — Post-mortem validé avec remédiation par circuit breaker]\n# Données : POSTMORTEM id=PM-105 author=LeadArchitect\n# Données : WHY_1: Downstream inventory service cascaded failure\n# Données : WHY_2: HTTP calls queued up indefinitely\n# Données : WHY_3: Connection timeout was set to infinite\n# Données : WHY_4: Default client settings were used\n# Données : WHY_5: No resilient design pattern was enforced across services\n# Données : REMEDIATION: Implement circuit breaker with strict 2-second timeout and canary testing\nA_COMPLETER\n",
    hints: [
          "Rassembler toutes les lignes de texte pour effectuer la recherche de mots de blâme en une passe.",
          "Vérifier que les clés WHY_1 à WHY_5 existent toutes dans le dictionnaire extrait."
    ],
    examples: [
          {
                "stdin": "POSTMORTEM id=PM-101 author=DevOpsLead\nWHY_1: The payment service failed to process transactions\nWHY_2: The database connection pool was exhausted\nWHY_3: A slow query locked the table for forty seconds\nWHY_4: The query lacked an index on the user_id column\nWHY_5: Automated migration checks did not flag unindexed foreign keys\nREMEDIATION: Add automated lint step in CI pipeline to require indexes on foreign keys",
                "expected": "POSTMORTEM_EVAL: PM-101 -> STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS",
                "note": "Analyse systémique rigoureuse débouchant sur un garde-fou automatisé en CI."
          }
    ],
    tests: [
          {
                "label": "Violation du principe blameless avec désignation de coupable",
                "stdin": "cas:1",
                "expected": "POSTMORTEM_EVAL: PM-102 -> STATUS=REJECTED | REASON=BLAMELESS_VIOLATION_DETECTED"
          },
          {
                "label": "Chaîne des 5 pourquoi incomplète (arrêt au 3ème pourquoi)",
                "stdin": "cas:2",
                "expected": "POSTMORTEM_EVAL: PM-103 -> STATUS=REJECTED | REASON=INCOMPLETE_5_WHYS_CHAIN"
          },
          {
                "label": "Remédiation non systémique sans garde-fou technique",
                "stdin": "cas:3",
                "expected": "POSTMORTEM_EVAL: PM-104 -> STATUS=REJECTED | REASON=NON_SYSTEMIC_REMEDIATION"
          },
          {
                "label": "Post-mortem validé avec remédiation par circuit breaker",
                "stdin": "cas:4",
                "expected": "POSTMORTEM_EVAL: PM-105 -> STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS"
          }
    ],
    solution: "[Exemple]\nPOSTMORTEM_EVAL: PM-101 -> STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS\n\n[Cas 1 — Violation du principe blameless avec désignation de coupable]\nPOSTMORTEM_EVAL: PM-102 -> STATUS=REJECTED | REASON=BLAMELESS_VIOLATION_DETECTED\n\n[Cas 2 — Chaîne des 5 pourquoi incomplète (arrêt au 3ème pourquoi)]\nPOSTMORTEM_EVAL: PM-103 -> STATUS=REJECTED | REASON=INCOMPLETE_5_WHYS_CHAIN\n\n[Cas 3 — Remédiation non systémique sans garde-fou technique]\nPOSTMORTEM_EVAL: PM-104 -> STATUS=REJECTED | REASON=NON_SYSTEMIC_REMEDIATION\n\n[Cas 4 — Post-mortem validé avec remédiation par circuit breaker]\nPOSTMORTEM_EVAL: PM-105 -> STATUS=APPROVED | BLAMELESS=TRUE | DEPTH=5_WHYS\n"
  }
];
