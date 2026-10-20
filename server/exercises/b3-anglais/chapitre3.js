/**
 * chapitre3.js — Études de cas du cours « b3-anglais ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "an3-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Analyseur de registre et tonalité d’emails IT professionnels",
    goal: "Auditer la structure, la formule d’appel, le sujet et le vocabulaire d’un email technique anglophone selon les standards de l’industrie.",
    brief: "<p>Dans les échanges avec des équipes internationales et des clients, un email vague ou rédigé dans un registre familier nuit à la crédibilité technique et ralentit la résolution des incidents.<br>\nPour chaque cas d’application les composantes d'un email au format :<br>\n<code>SUBJECT: &lt;objet&gt;</code><br>\n<code>GREETING: &lt;salutation&gt;</code><br>\n<code>BODY: &lt;corps&gt;</code><br>\n<code>CLOSING: &lt;formule de politesse&gt;</code><br><br>\nRègles d'audit :<br>\n1. <b>Sujet (Subject)</b> : Les objets vagues d'un seul mot (comme <i>\"hey\"</i>, <i>\"problem\"</i>, <i>\"help\"</i>, <i>\"urgent\"</i>) sont rejetés. Le sujet doit comporter au moins 3 mots et mentionner un composant système ou une sévérité (ex: <code>PROD</code>, <code>API</code>, <code>PAYMENT</code>, <code>DATABASE</code>, <code>AUTH</code>, <code>500</code>, <code>URGENT:</code>). Si ce n'est pas le cas : ajouter <code>VAGUE_SUBJECT</code>.<br>\n2. <b>Salutation (Greeting)</b> : Les termes ultra-familiers (<i>\"hey\"</i>, <i>\"yo\"</i>, <i>\"sup\"</i>, <i>\"hi guys\"</i>) ajoutent <code>INFORMAL_GREETING</code>. Les formules acceptables débutent par <code>Hi &lt;Name&gt;</code>, <code>Hello &lt;Name&gt;</code> ou <code>Dear &lt;Team&gt;</code>.<br>\n3. <b>Argot & Langage relâché dans le corps (Body)</b> : Présence de mots tels que <code>asap</code>, <code>gonna</code>, <code>wanna</code>, <code>stuff</code>, <code>broken</code> (insensible à la casse, mots entiers). Si au moins un est présent : ajouter <code>SLANG_IN_BODY</code>.<br>\n4. <b>Clôture (Closing)</b> : Les formules professionnelles sont <code>Best regards</code>, <code>Regards</code>, <code>Sincerely</code>, <code>Thank you</code>. Des termes tels que <code>thx</code>, <code>bye</code>, <code>cheers</code> ou l'absence de formule ajoutent <code>UNPROFESSIONAL_CLOSING</code>.<br><br>\nDétermination du registre :<br>\n- Si 0 défaut : <code>REGISTER=PROFESSIONAL</code><br>\n- Si 1 défaut : <code>REGISTER=ACCEPTABLE</code><br>\n- Si 2 défauts ou plus : <code>REGISTER=UNPROFESSIONAL</code><br><br>\nAfficher :<br>\n<code>EMAIL_AUDIT: REGISTER=&lt;REGISTER&gt; | DEFECTS=&lt;nb&gt; | ISSUES=&lt;issue1,issue2,...&gt;</code> (ou <code>ISSUES=NONE</code> si 0 défaut, triées alphabétiquement).</p>",
    starter: "# Grille d'analyse (an3-c3-e1) — Analyseur de registre et tonalité d’emails IT professionnels\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Email malade typique avec 4 défauts critiques]\n# Données : SUBJECT: hey\n# Données : GREETING: Yo,\n# Données : BODY: The login stuff is broken, fix it asap cause we gonna lose money.\n# Données : CLOSING: thx\nA_COMPLETER\n\n[Cas 2 — Email acceptable avec seulement une salutation informelle]\n# Données : SUBJECT: PROD: Latency spike on User Database\n# Données : GREETING: Hey,\n# Données : BODY: We noticed a query latency spike following the latest migration.\n# Données : CLOSING: Regards,\nA_COMPLETER\n\n[Cas 3 — Email avec sujet trop court et argot dans le corps]\n# Données : SUBJECT: Quick help\n# Données : GREETING: Hello Sarah,\n# Données : BODY: I wanna ask about the staging credentials.\n# Données : CLOSING: Sincerely,\nA_COMPLETER\n\n[Cas 4 — Email formel adressé à une équipe]\n# Données : SUBJECT: Scheduled Maintenance: Core Router Upgrade on Saturday\n# Données : GREETING: Dear Infrastructure Team,\n# Données : BODY: Please find attached the maintenance schedule for the core router migration.\n# Données : CLOSING: Thank you,\nA_COMPLETER\n",
    hints: [
          "Extraire les 4 champs via un dictionnaire en repérant les préfixes SUBJECT:, GREETING:, BODY:, CLOSING:.",
          "Vérifier les mots interdits avec re.search(r\"\\b...\\b\", body, re.IGNORECASE)."
    ],
    examples: [
          {
                "stdin": "SUBJECT: URGENT: Payment API failing with Error 500\nGREETING: Hi Peter,\nBODY: The payment webhook gateway returned 500 errors for ten minutes.\nCLOSING: Best regards,",
                "expected": "EMAIL_AUDIT: REGISTER=PROFESSIONAL | DEFECTS=0 | ISSUES=NONE",
                "note": "Email clair, précis, formule d'appel professionnelle et absence d'argot."
          }
    ],
    tests: [
          {
                "label": "Email malade typique avec 4 défauts critiques",
                "stdin": "cas:1",
                "expected": "EMAIL_AUDIT: REGISTER=UNPROFESSIONAL | DEFECTS=4 | ISSUES=INFORMAL_GREETING,SLANG_IN_BODY,UNPROFESSIONAL_CLOSING,VAGUE_SUBJECT"
          },
          {
                "label": "Email acceptable avec seulement une salutation informelle",
                "stdin": "cas:2",
                "expected": "EMAIL_AUDIT: REGISTER=ACCEPTABLE | DEFECTS=1 | ISSUES=INFORMAL_GREETING"
          },
          {
                "label": "Email avec sujet trop court et argot dans le corps",
                "stdin": "cas:3",
                "expected": "EMAIL_AUDIT: REGISTER=UNPROFESSIONAL | DEFECTS=2 | ISSUES=SLANG_IN_BODY,VAGUE_SUBJECT"
          },
          {
                "label": "Email formel adressé à une équipe",
                "stdin": "cas:4",
                "expected": "EMAIL_AUDIT: REGISTER=PROFESSIONAL | DEFECTS=0 | ISSUES=NONE"
          }
    ],
    solution: "[Exemple]\nEMAIL_AUDIT: REGISTER=PROFESSIONAL | DEFECTS=0 | ISSUES=NONE\n\n[Cas 1 — Email malade typique avec 4 défauts critiques]\nEMAIL_AUDIT: REGISTER=UNPROFESSIONAL | DEFECTS=4 | ISSUES=INFORMAL_GREETING,SLANG_IN_BODY,UNPROFESSIONAL_CLOSING,VAGUE_SUBJECT\n\n[Cas 2 — Email acceptable avec seulement une salutation informelle]\nEMAIL_AUDIT: REGISTER=ACCEPTABLE | DEFECTS=1 | ISSUES=INFORMAL_GREETING\n\n[Cas 3 — Email avec sujet trop court et argot dans le corps]\nEMAIL_AUDIT: REGISTER=UNPROFESSIONAL | DEFECTS=2 | ISSUES=SLANG_IN_BODY,VAGUE_SUBJECT\n\n[Cas 4 — Email formel adressé à une équipe]\nEMAIL_AUDIT: REGISTER=PROFESSIONAL | DEFECTS=0 | ISSUES=NONE\n"
  },
  {
    id: "an3-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Validateur de structure de rapport de bug technique",
    goal: "Vérifier la conformité d’un ticket d’anomalie rédigé en anglais pour s’assurer qu’il contient les sections obligatoires requises par l’équipe de développement.",
    brief: "<p>Un rapport de bug (<i>Bug Report</i>) doit permettre une reproduction immédiate sans allers-retours inutiles.<br>\nPour chaque cas d’application un ensemble de champs au format :<br>\n<code>&lt;CHAMP&gt;: &lt;valeur&gt;</code>.<br><br>\nChamps obligatoires requis :<br>\n1. <code>TITLE</code> : intitulé clair du bug (au moins 4 mots).<br>\n2. <code>ENVIRONMENT</code> : environnement d'exécution (ex: OS, navigateur ou cluster).<br>\n3. <code>STEPS</code> : étapes de reproduction. Doit comporter au moins deux étapes numérotées distinctes séparées par un point-virgule ou retour à la ligne (ex: <code>1. Login; 2. Click Pay</code>).<br>\n4. <code>EXPECTED</code> : comportement attendu.<br>\n5. <code>ACTUAL</code> : comportement réel observé.<br>\n6. <code>SEVERITY</code> : doit valoir exactement <code>CRITICAL</code>, <code>MAJOR</code>, <code>MINOR</code> ou <code>TRIVIAL</code>.<br><br>\nRègles de validation :<br>\n- Si un champ obligatoire est manquant, ajouter son nom dans la liste des anomalies.<br>\n- Si le champ <code>SEVERITY</code> est présent mais non valide, ajouter <code>INVALID_SEVERITY</code>.<br>\n- Si <code>STEPS</code> est présent mais ne contient pas au moins deux étapes numérotées (recherche de <code>1.</code> et <code>2.</code>), ajouter <code>INSUFFICIENT_STEPS</code>.<br>\n- Si <code>TITLE</code> est présent mais fait moins de 4 mots, ajouter <code>VAGUE_TITLE</code>.<br><br>\nAfficher :<br>\n- Si aucune anomalie :<br>\n  <code>BUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY=&lt;SEVERITY&gt;</code><br>\n- Si anomalies :<br>\n  <code>BUG_REPORT_STATUS: REJECTED | ISSUES=&lt;anomalie1,anomalie2,...&gt;</code> (triées alphabétiquement).</p>",
    starter: "# Grille d'analyse (an3-c3-e2) — Validateur de structure de rapport de bug technique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Rapport incomplet sans environnement ni étapes suffisantes]\n# Données : TITLE: Crash button\n# Données : STEPS: Just clicked it\n# Données : EXPECTED: Working fine\n# Données : ACTUAL: App closes\n# Données : SEVERITY: MAJOR\nA_COMPLETER\n\n[Cas 2 — Sévérité invalide et comportement attendu manquant]\n# Données : TITLE: User profile avatar fails to upload on mobile\n# Données : ENVIRONMENT: iOS 17 Safari\n# Données : STEPS: 1. Tap upload; 2. Select PNG photo\n# Données : ACTUAL: Red toast error displayed\n# Données : SEVERITY: HIGH_PRIORITY\nA_COMPLETER\n\n[Cas 3 — Rapport complet mineur bien documenté]\n# Données : TITLE: Typo in French translation of settings header\n# Données : ENVIRONMENT: Staging Ubuntu Firefox 119\n# Données : STEPS: 1. Open settings; 2. Switch language to French\n# Données : EXPECTED: Label displays Préférences\n# Données : ACTUAL: Label displays Prefrences\n# Données : SEVERITY: MINOR\nA_COMPLETER\n\n[Cas 4 — Aucun champ présent dans le rapport]\n# Données : This is not formatted as key value pairs\nA_COMPLETER\n",
    hints: [
          "Stocker les champs dans un dictionnaire avec la clé en majuscules.",
          "Vérifier la présence des séquences \"1.\" et \"2.\" dans le texte des STEPS."
    ],
    examples: [
          {
                "stdin": "TITLE: Payment modal freezes on checkout click\nENVIRONMENT: Production Chrome 120 macOS 14\nSTEPS: 1. Add item to cart; 2. Click checkout button\nEXPECTED: Modal displays Stripe payment fields\nACTUAL: Modal spins indefinitely with no network call\nSEVERITY: CRITICAL",
                "expected": "BUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY: CRITICAL",
                "note": "Toutes les rubriques requises sont complètes et conformes."
          }
    ],
    tests: [
          {
                "label": "Rapport incomplet sans environnement ni étapes suffisantes",
                "stdin": "cas:1",
                "expected": "BUG_REPORT_STATUS: REJECTED | ISSUES=ENVIRONMENT,INSUFFICIENT_STEPS,VAGUE_TITLE"
          },
          {
                "label": "Sévérité invalide et comportement attendu manquant",
                "stdin": "cas:2",
                "expected": "BUG_REPORT_STATUS: REJECTED | ISSUES=EXPECTED,INVALID_SEVERITY"
          },
          {
                "label": "Rapport complet mineur bien documenté",
                "stdin": "cas:3",
                "expected": "BUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY: MINOR"
          },
          {
                "label": "Aucun champ présent dans le rapport",
                "stdin": "cas:4",
                "expected": "BUG_REPORT_STATUS: REJECTED | ISSUES=ACTUAL,ENVIRONMENT,EXPECTED,SEVERITY,STEPS,TITLE"
          }
    ],
    solution: "[Exemple]\nBUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY: CRITICAL\n\n[Cas 1 — Rapport incomplet sans environnement ni étapes suffisantes]\nBUG_REPORT_STATUS: REJECTED | ISSUES=ENVIRONMENT,INSUFFICIENT_STEPS,VAGUE_TITLE\n\n[Cas 2 — Sévérité invalide et comportement attendu manquant]\nBUG_REPORT_STATUS: REJECTED | ISSUES=EXPECTED,INVALID_SEVERITY\n\n[Cas 3 — Rapport complet mineur bien documenté]\nBUG_REPORT_STATUS: READY_FOR_TRIAGE | SEVERITY: MINOR\n\n[Cas 4 — Aucun champ présent dans le rapport]\nBUG_REPORT_STATUS: REJECTED | ISSUES=ACTUAL,ENVIRONMENT,EXPECTED,SEVERITY,STEPS,TITLE\n"
  },
  {
    id: "an3-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Générateur d’alerte d’escalade d’incident pour le management",
    goal: "Générer un communiqué d’escalade d’incident critique (Executive Incident Broadcast) formaté en anglais pour les parties prenantes.",
    brief: "<p>Lors d'une panne majeure en production, l'équipe d'astreinte (SRE / Incident Commander) doit publier un bulletin d'incident synthétique et standardisé à destination des directeurs et partenaires internationaux.<br>\nPour chaque cas d’application une ligne au format :<br>\n<code>INCIDENT_DATA id=&lt;id&gt; service=&lt;srv&gt; impact_pct=&lt;pct&gt; downtime_min=&lt;min&gt; eta_min=&lt;eta&gt; workaround=&lt;yes|no&gt;</code>.<br><br>\nRègles de génération :<br>\n- <b>Objet (SUBJECT)</b> : <code>[INCIDENT &lt;id&gt;] SEV-1 Outage: &lt;service&gt; (&lt;impact_pct&gt;% users affected)</code><br>\n- <b>Statut (STATUS)</b> :<br>\n  * Si <code>eta_min == 0</code> : <code>RESOLVED_MONITORING</code><br>\n  * Si <code>eta_min &lt;= 30</code> : <code>ACTIVE_MITIGATION_IN_PROGRESS</code><br>\n  * Si <code>eta_min &gt; 30</code> : <code>CRITICAL_EXECUTIVE_ESCALATION</code><br>\n- <b>Impact (IMPACT)</b> : <code>&lt;service&gt; degraded for &lt;downtime_min&gt; minutes</code><br>\n- <b>ETA Résolution (ETA_RESOLUTION)</b> : <code>&lt;eta_min&gt; minutes</code> (ou <code>Immediate / Stable</code> si eta_min vaut 0)<br>\n- <b>Contournement (WORKAROUND)</b> :<br>\n  * Si <code>workaround=yes</code> : <code>Available - traffic redirected to secondary region</code><br>\n  * Si <code>workaround=no</code> : <code>None available - full engineering mobilization</code><br><br>\nFormat attendu :<br>\n<code>--- INCIDENT BROADCAST ---</code><br>\n<code>SUBJECT: ...</code><br>\n<code>STATUS: ...</code><br>\n<code>IMPACT: ...</code><br>\n<code>ETA_RESOLUTION: ...</code><br>\n<code>WORKAROUND: ...</code><br>\n<code>--- END BROADCAST ---</code></p>",
    starter: "# Grille d'analyse (an3-c3-e3) — Générateur d’alerte d’escalade d’incident pour le management\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Incident résolu avec ETA à 0]\n# Données : INCIDENT_DATA id=INC-7010 service=AuthGateway impact_pct=10 downtime_min=15 eta_min=0 workaround=no\nA_COMPLETER\n\n[Cas 2 — Escalade critique sans contournement avec ETA supérieure à 30 min]\n# Données : INCIDENT_DATA id=INC-9999 service=PostgresMaster impact_pct=100 downtime_min=65 eta_min=45 workaround=no\nA_COMPLETER\n\n[Cas 3 — Deux incidents consécutifs]\n# Données : INCIDENT_DATA id=INC-1100 service=SearchEngine impact_pct=40 downtime_min=25 eta_min=15 workaround=yes\n# Données : INCIDENT_DATA id=INC-1101 service=BillingEngine impact_pct=95 downtime_min=50 eta_min=60 workaround=no\nA_COMPLETER\n\n[Cas 4 — ETA limite exacte à 30 minutes]\n# Données : INCIDENT_DATA id=INC-3300 service=QueueBroker impact_pct=50 downtime_min=30 eta_min=30 workaround=yes\nA_COMPLETER\n",
    hints: [
          "Extraire les paramètres via des regex : r\"(\\w+)=([^\\s]+)\".",
          "Convertir les valeurs numériques d'impact, downtime et eta en entiers."
    ],
    examples: [
          {
                "stdin": "INCIDENT_DATA id=INC-8902 service=CheckoutAPI impact_pct=85 downtime_min=42 eta_min=20 workaround=yes",
                "expected": "--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-8902] SEV-1 Outage: CheckoutAPI (85% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: CheckoutAPI degraded for 42 minutes\nETA_RESOLUTION: 20 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---",
                "note": "Incident avec mitigation en cours et contournement actif vers la région secondaire."
          }
    ],
    tests: [
          {
                "label": "Incident résolu avec ETA à 0",
                "stdin": "cas:1",
                "expected": "--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-7010] SEV-1 Outage: AuthGateway (10% users affected)\nSTATUS: RESOLVED_MONITORING\nIMPACT: AuthGateway degraded for 15 minutes\nETA_RESOLUTION: Immediate / Stable\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---"
          },
          {
                "label": "Escalade critique sans contournement avec ETA supérieure à 30 min",
                "stdin": "cas:2",
                "expected": "--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-9999] SEV-1 Outage: PostgresMaster (100% users affected)\nSTATUS: CRITICAL_EXECUTIVE_ESCALATION\nIMPACT: PostgresMaster degraded for 65 minutes\nETA_RESOLUTION: 45 minutes\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---"
          },
          {
                "label": "Deux incidents consécutifs",
                "stdin": "cas:3",
                "expected": "--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-1100] SEV-1 Outage: SearchEngine (40% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: SearchEngine degraded for 25 minutes\nETA_RESOLUTION: 15 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-1101] SEV-1 Outage: BillingEngine (95% users affected)\nSTATUS: CRITICAL_EXECUTIVE_ESCALATION\nIMPACT: BillingEngine degraded for 50 minutes\nETA_RESOLUTION: 60 minutes\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---"
          },
          {
                "label": "ETA limite exacte à 30 minutes",
                "stdin": "cas:4",
                "expected": "--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-3300] SEV-1 Outage: QueueBroker (50% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: QueueBroker degraded for 30 minutes\nETA_RESOLUTION: 30 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---"
          }
    ],
    solution: "[Exemple]\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-8902] SEV-1 Outage: CheckoutAPI (85% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: CheckoutAPI degraded for 42 minutes\nETA_RESOLUTION: 20 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---\n\n[Cas 1 — Incident résolu avec ETA à 0]\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-7010] SEV-1 Outage: AuthGateway (10% users affected)\nSTATUS: RESOLVED_MONITORING\nIMPACT: AuthGateway degraded for 15 minutes\nETA_RESOLUTION: Immediate / Stable\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---\n\n[Cas 2 — Escalade critique sans contournement avec ETA supérieure à 30 min]\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-9999] SEV-1 Outage: PostgresMaster (100% users affected)\nSTATUS: CRITICAL_EXECUTIVE_ESCALATION\nIMPACT: PostgresMaster degraded for 65 minutes\nETA_RESOLUTION: 45 minutes\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---\n\n[Cas 3 — Deux incidents consécutifs]\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-1100] SEV-1 Outage: SearchEngine (40% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: SearchEngine degraded for 25 minutes\nETA_RESOLUTION: 15 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-1101] SEV-1 Outage: BillingEngine (95% users affected)\nSTATUS: CRITICAL_EXECUTIVE_ESCALATION\nIMPACT: BillingEngine degraded for 50 minutes\nETA_RESOLUTION: 60 minutes\nWORKAROUND: None available - full engineering mobilization\n--- END BROADCAST ---\n\n[Cas 4 — ETA limite exacte à 30 minutes]\n--- INCIDENT BROADCAST ---\nSUBJECT: [INCIDENT INC-3300] SEV-1 Outage: QueueBroker (50% users affected)\nSTATUS: ACTIVE_MITIGATION_IN_PROGRESS\nIMPACT: QueueBroker degraded for 30 minutes\nETA_RESOLUTION: 30 minutes\nWORKAROUND: Available - traffic redirected to secondary region\n--- END BROADCAST ---\n"
  }
];
