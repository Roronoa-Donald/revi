/**
 * chapitre4.js — Études de cas du cours « b3-anglais ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "an3-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Parseur de compte-rendu de Stand-up Meeting Agile",
    goal: "Extraire les réalisations passées, les objectifs du jour et les blocages déclarés lors d’un Daily Standup meeting en anglais.",
    brief: "<p>Le stand-up meeting quotidien en méthode Agile repose sur 3 questions clés : <i>What did you do yesterday? What will you do today? Are there any blockers?</i><br>\nPour chaque cas d’application des interventions au format :<br>\n<code>STANDUP speaker=&lt;nom&gt; yesterday=&lt;texte&gt; today=&lt;texte&gt; blocker=&lt;texte&gt;</code>.<br><br>\nRègles d'évaluation :<br>\n- Si <code>blocker</code> vaut <code>none</code>, <code>no blockers</code> ou <code>all good</code> (insensible à la casse) :<br>\n  Le statut est <code>ON_TRACK</code> et la valeur normalisée du bloqueur devient <code>NONE</code>.<br>\n- Si un bloqueur réel est mentionné :<br>\n  Le statut est <code>BLOCKED</code> et le texte du bloqueur est conservé.<br><br>\nAfficher :<br>\n<code>STANDUP_REPORT: &lt;nom&gt; -&gt; STATUS=&lt;STATUS&gt; | YESTERDAY=\"&lt;yesterday&gt;\" | TODAY=\"&lt;today&gt;\" | BLOCKER=\"&lt;blocker&gt;\"</code></p>",
    starter: "# Grille d'analyse (an3-c4-e1) — Parseur de compte-rendu de Stand-up Meeting Agile\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Développeur bloqué par les droits d’accès Cloud]\n# Données : STANDUP speaker=Bob yesterday=Refactored database schema today=Deploying migration to staging blocker=Waiting for AWS IAM permissions\nA_COMPLETER\n\n[Cas 2 — Statut sans bloqueur avec formulation no blockers]\n# Données : STANDUP speaker=Charlie yesterday=Investigated Redis latency today=Benchmarking cluster throughput blocker=No blockers\nA_COMPLETER\n\n[Cas 3 — Multiples intervenants lors de la mêlée]\n# Données : STANDUP speaker=David yesterday=Updated API docs today=Reviewing PRs blocker=all good\n# Données : STANDUP speaker=Elena yesterday=Configured CI pipeline today=Adding Docker cache blocker=Docker daemon crashing on runner\nA_COMPLETER\n\n[Cas 4 — Bloqueur sous forme de dépendance externe]\n# Données : STANDUP speaker=Fiona yesterday=Finished design mocks today=Slicing CSS layout blocker=Blocked by frontend team review\nA_COMPLETER\n",
    hints: [
          "Extraire les champs speaker, yesterday, today et blocker à l'aide d'expressions régulières.",
          "Tester si le bloqueur correspond à l'un des termes de non-blocage (none, no blockers, all good)."
    ],
    examples: [
          {
                "stdin": "STANDUP speaker=Alice yesterday=Merged pull request 42 today=Writing unit tests for auth blocker=none",
                "expected": "STANDUP_REPORT: Alice -> STATUS=ON_TRACK | YESTERDAY=\"Merged pull request 42\" | TODAY=\"Writing unit tests for auth\" | BLOCKER=\"NONE\"",
                "note": "Alice est débloquée et poursuit ses tests unitaires."
          }
    ],
    tests: [
          {
                "label": "Développeur bloqué par les droits d’accès Cloud",
                "stdin": "cas:1",
                "expected": "STANDUP_REPORT: Bob -> STATUS=BLOCKED | YESTERDAY=\"Refactored database schema\" | TODAY=\"Deploying migration to staging\" | BLOCKER=\"Waiting for AWS IAM permissions\""
          },
          {
                "label": "Statut sans bloqueur avec formulation no blockers",
                "stdin": "cas:2",
                "expected": "STANDUP_REPORT: Charlie -> STATUS=ON_TRACK | YESTERDAY=\"Investigated Redis latency\" | TODAY=\"Benchmarking cluster throughput\" | BLOCKER=\"NONE\""
          },
          {
                "label": "Multiples intervenants lors de la mêlée",
                "stdin": "cas:3",
                "expected": "STANDUP_REPORT: David -> STATUS=ON_TRACK | YESTERDAY=\"Updated API docs\" | TODAY=\"Reviewing PRs\" | BLOCKER=\"NONE\"\nSTANDUP_REPORT: Elena -> STATUS=BLOCKED | YESTERDAY=\"Configured CI pipeline\" | TODAY=\"Adding Docker cache\" | BLOCKER=\"Docker daemon crashing on runner\""
          },
          {
                "label": "Bloqueur sous forme de dépendance externe",
                "stdin": "cas:4",
                "expected": "STANDUP_REPORT: Fiona -> STATUS=BLOCKED | YESTERDAY=\"Finished design mocks\" | TODAY=\"Slicing CSS layout\" | BLOCKER=\"Blocked by frontend team review\""
          }
    ],
    solution: "[Exemple]\nSTANDUP_REPORT: Alice -> STATUS=ON_TRACK | YESTERDAY=\"Merged pull request 42\" | TODAY=\"Writing unit tests for auth\" | BLOCKER=\"NONE\"\n\n[Cas 1 — Développeur bloqué par les droits d’accès Cloud]\nSTANDUP_REPORT: Bob -> STATUS=BLOCKED | YESTERDAY=\"Refactored database schema\" | TODAY=\"Deploying migration to staging\" | BLOCKER=\"Waiting for AWS IAM permissions\"\n\n[Cas 2 — Statut sans bloqueur avec formulation no blockers]\nSTANDUP_REPORT: Charlie -> STATUS=ON_TRACK | YESTERDAY=\"Investigated Redis latency\" | TODAY=\"Benchmarking cluster throughput\" | BLOCKER=\"NONE\"\n\n[Cas 3 — Multiples intervenants lors de la mêlée]\nSTANDUP_REPORT: David -> STATUS=ON_TRACK | YESTERDAY=\"Updated API docs\" | TODAY=\"Reviewing PRs\" | BLOCKER=\"NONE\"\nSTANDUP_REPORT: Elena -> STATUS=BLOCKED | YESTERDAY=\"Configured CI pipeline\" | TODAY=\"Adding Docker cache\" | BLOCKER=\"Docker daemon crashing on runner\"\n\n[Cas 4 — Bloqueur sous forme de dépendance externe]\nSTANDUP_REPORT: Fiona -> STATUS=BLOCKED | YESTERDAY=\"Finished design mocks\" | TODAY=\"Slicing CSS layout\" | BLOCKER=\"Blocked by frontend team review\"\n"
  },
  {
    id: "an3-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Calculateur de conformité SLA, Uptime et pénalités",
    goal: "Calculer le temps d’indisponibilité autorisé par un contrat SLA en anglais, comparer avec le downtime réel et calculer les pénalités applicables.",
    brief: "<p>Dans les contrats de service internationaux (<i>Service Level Agreements</i>), le taux de disponibilité (ex: 99.9% <i>\"three nines\"</i>, 99.95%, 99.99%) détermine le temps de panne maximal toléré avant pénalités financières.<br>\nPour chaque cas d’application des lignes au format :<br>\n<code>SLA_RECORD client=&lt;nom&gt; target_pct=&lt;pct&gt; actual_down_min=&lt;min&gt; days=&lt;jours&gt; penalty_per_hour=&lt;usd&gt;</code>.<br><br>\nFormules et calculs :<br>\n1. <b>Minutes totales du mois</b> : <code>total_min = days * 24 * 60</code>.<br>\n2. <b>Downtime autorisé en minutes</b> : <code>allowed_min = total_min * (100.0 - target_pct) / 100.0</code> (arrondi à 2 décimales).<br>\n3. <b>Contrôle de dépassement</b> :<br>\n   - Si <code>actual_down_min &lt;= allowed_min</code> :<br>\n     <code>SLA_EVAL: &lt;client&gt; -&gt; STATUS=SLA_MET | ACTUAL=&lt;actual&gt;m | ALLOWED=&lt;allowed&gt;m | PENALTY=0 USD</code><br>\n   - Si <code>actual_down_min &gt; allowed_min</code> :<br>\n     Excédent en minutes : <code>excess_min = actual_down_min - allowed_min</code>.<br>\n     Heures d'excédent facturables : arrondi supérieur à l'heure entière (<code>math.ceil(excess_min / 60.0)</code>).<br>\n     Pénalité financière : <code>penalty = excess_hours * penalty_per_hour</code>.<br>\n     <code>SLA_EVAL: &lt;client&gt; -&gt; STATUS=SLA_BREACHED | ACTUAL=&lt;actual&gt;m | ALLOWED=&lt;allowed&gt;m | PENALTY=&lt;penalty&gt; USD</code><br><br>\nLes durées <code>ACTUAL</code> et <code>ALLOWED</code> doivent être formatées avec 2 décimales (ex: <code>43.20m</code>).</p>",
    starter: "# Grille d'analyse (an3-c4-e2) — Calculateur de conformité SLA, Uptime et pénalités\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Dépassement de SLA de 4 nines (99.99%) sur 30 jours]\n# Données : SLA_RECORD client=HealthCloud target_pct=99.99 actual_down_min=120 days=30 penalty_per_hour=1000\nA_COMPLETER\n\n[Cas 2 — Mois de 31 jours avec respect strict du SLA]\n# Données : SLA_RECORD client=MediaStream target_pct=99.95 actual_down_min=15 days=31 penalty_per_hour=250\nA_COMPLETER\n\n[Cas 3 — Multiples clients et dépassement d’une fraction d’heure]\n# Données : SLA_RECORD client=BankCorp target_pct=99.9 actual_down_min=50 days=30 penalty_per_hour=600\n# Données : SLA_RECORD client=RetailApp target_pct=99.5 actual_down_min=100 days=30 penalty_per_hour=150\nA_COMPLETER\n\n[Cas 4 — Excédent exact supérieur à 60 minutes engendrant 2 heures]\n# Données : SLA_RECORD client=LogisticsGlobal target_pct=99.9 actual_down_min=105 days=30 penalty_per_hour=400\nA_COMPLETER\n",
    hints: [
          "Utiliser math.ceil pour convertir l'excédent de minutes en heures pleines pénalisables.",
          "Formater les nombres à virgule avec :.2f."
    ],
    examples: [
          {
                "stdin": "SLA_RECORD client=FinTechCorp target_pct=99.9 actual_down_min=30 days=30 penalty_per_hour=500",
                "expected": "SLA_EVAL: FinTechCorp -> STATUS=SLA_MET | ACTUAL=30.00m | ALLOWED=43.20m | PENALTY=0 USD",
                "note": "30 jours à 99.9% autorisent 43.20 minutes de coupure. 30 minutes réelles respectent le contrat."
          }
    ],
    tests: [
          {
                "label": "Dépassement de SLA de 4 nines (99.99%) sur 30 jours",
                "stdin": "cas:1",
                "expected": "SLA_EVAL: HealthCloud -> STATUS=SLA_BREACHED | ACTUAL=120.00m | ALLOWED=4.32m | PENALTY=2000 USD"
          },
          {
                "label": "Mois de 31 jours avec respect strict du SLA",
                "stdin": "cas:2",
                "expected": "SLA_EVAL: MediaStream -> STATUS=SLA_MET | ACTUAL=15.00m | ALLOWED=22.32m | PENALTY=0 USD"
          },
          {
                "label": "Multiples clients et dépassement d’une fraction d’heure",
                "stdin": "cas:3",
                "expected": "SLA_EVAL: BankCorp -> STATUS=SLA_BREACHED | ACTUAL=50.00m | ALLOWED=43.20m | PENALTY=600 USD\nSLA_EVAL: RetailApp -> STATUS=SLA_MET | ACTUAL=100.00m | ALLOWED=216.00m | PENALTY=0 USD"
          },
          {
                "label": "Excédent exact supérieur à 60 minutes engendrant 2 heures",
                "stdin": "cas:4",
                "expected": "SLA_EVAL: LogisticsGlobal -> STATUS=SLA_BREACHED | ACTUAL=105.00m | ALLOWED=43.20m | PENALTY=800 USD"
          }
    ],
    solution: "[Exemple]\nSLA_EVAL: FinTechCorp -> STATUS=SLA_MET | ACTUAL=30.00m | ALLOWED=43.20m | PENALTY=0 USD\n\n[Cas 1 — Dépassement de SLA de 4 nines (99.99%) sur 30 jours]\nSLA_EVAL: HealthCloud -> STATUS=SLA_BREACHED | ACTUAL=120.00m | ALLOWED=4.32m | PENALTY=2000 USD\n\n[Cas 2 — Mois de 31 jours avec respect strict du SLA]\nSLA_EVAL: MediaStream -> STATUS=SLA_MET | ACTUAL=15.00m | ALLOWED=22.32m | PENALTY=0 USD\n\n[Cas 3 — Multiples clients et dépassement d’une fraction d’heure]\nSLA_EVAL: BankCorp -> STATUS=SLA_BREACHED | ACTUAL=50.00m | ALLOWED=43.20m | PENALTY=600 USD\nSLA_EVAL: RetailApp -> STATUS=SLA_MET | ACTUAL=100.00m | ALLOWED=216.00m | PENALTY=0 USD\n\n[Cas 4 — Excédent exact supérieur à 60 minutes engendrant 2 heures]\nSLA_EVAL: LogisticsGlobal -> STATUS=SLA_BREACHED | ACTUAL=105.00m | ALLOWED=43.20m | PENALTY=800 USD\n"
  },
  {
    id: "an3-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Extracteur de rétrospective agile : Sentiments et plan d’action",
    goal: "Compiler les retours d’une rétrospective de sprint en anglais, dénombrer les points positifs et les axes d’amélioration, et formaliser la liste ordonnée des actions assignées.",
    brief: "<p>À la fin de chaque itération (sprint), la rétrospective identifie ce qui a bien fonctionné (<i>What went well</i>), les difficultés rencontrées (<i>What could be improved</i>) et les actions concrètes à mener (<i>Action Items</i>).<br>\nPour chaque cas d’application des retours au format :<br>\n<code>RETRO_ENTRY type=&lt;GOOD|CHALLENGE|ACTION&gt; owner=&lt;nom&gt; text=&lt;contenu en anglais&gt;</code>.<br><br>\nRègles de traitement :<br>\n1. Compter le nombre total d'entrées de chaque type : <code>GOOD</code>, <code>CHALLENGE</code> et <code>ACTION</code>.<br>\n2. Conserver les entrées de type <code>ACTION</code> dans leur ordre d'apparition et les formater :<br>\n   <code>[ACTION #&lt;i&gt;] Owner: &lt;owner&gt; -&gt; &lt;text&gt;</code> (l'indice &lt;i&gt; commence à 1).<br><br>\nAfficher :<br>\n<code>RETRO_SUMMARY: POSITIVE=&lt;nb_good&gt; | CHALLENGES=&lt;nb_challenge&gt; | ACTIONS=&lt;nb_action&gt;</code><br>\nPuis chaque ligne d'action formatée (s'il y en a).</p>",
    starter: "# Grille d'analyse (an3-c4-e3) — Extracteur de rétrospective agile : Sentiments et plan d’action\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Rétrospective avec plusieurs actions concrètes]\n# Données : RETRO_ENTRY type=GOOD owner=DevOps text=CI pipeline build time dropped by 40%\n# Données : RETRO_ENTRY type=GOOD owner=QA text=Test coverage reached 85%\n# Données : RETRO_ENTRY type=CHALLENGE owner=SecOps text=Two secrets committed by mistake\n# Données : RETRO_ENTRY type=ACTION owner=Alex text=Deploy git-secrets pre-commit hook\n# Données : RETRO_ENTRY type=ACTION owner=Maria text=Rotate exposed staging API tokens\nA_COMPLETER\n\n[Cas 2 — Rétrospective sans aucune action immédiate]\n# Données : RETRO_ENTRY type=GOOD owner=Frontend text=UI design system adopted by all pages\n# Données : RETRO_ENTRY type=CHALLENGE owner=Backend text=Redis cache missed too many sessions\nA_COMPLETER\n\n[Cas 3 — Multiples difficultés nécessitant plusieurs chantiers]\n# Données : RETRO_ENTRY type=CHALLENGE owner=All text=Sprint backlog was overcommitted\n# Données : RETRO_ENTRY type=CHALLENGE owner=All text=Standups exceeded 15 minutes\n# Données : RETRO_ENTRY type=ACTION owner=ScrumMaster text=Enforce 15-minute timebox on daily standup\nA_COMPLETER\n\n[Cas 4 — Succès uniquement]\n# Données : RETRO_ENTRY type=GOOD owner=Team text=All user stories delivered ahead of schedule\nA_COMPLETER\n",
    hints: [
          "Garder une liste dédiée pour stocker les actions avec leur owner et text.",
          "Formater le sommaire avant d'afficher la liste des actions."
    ],
    examples: [
          {
                "stdin": "RETRO_ENTRY type=GOOD owner=Team text=Zero downtime during database migration\nRETRO_ENTRY type=CHALLENGE owner=Team text=Documentation PR was reviewed late\nRETRO_ENTRY type=ACTION owner=Sarah text=Automate doc linting in Github Actions",
                "expected": "RETRO_SUMMARY: POSITIVE=1 | CHALLENGES=1 | ACTIONS=1\n[ACTION #1] Owner: Sarah -> Automate doc linting in Github Actions",
                "note": "Une synthèse équilibrée et une action assignée à Sarah."
          }
    ],
    tests: [
          {
                "label": "Rétrospective avec plusieurs actions concrètes",
                "stdin": "cas:1",
                "expected": "RETRO_SUMMARY: POSITIVE=2 | CHALLENGES=1 | ACTIONS=2\n[ACTION #1] Owner: Alex -> Deploy git-secrets pre-commit hook\n[ACTION #2] Owner: Maria -> Rotate exposed staging API tokens"
          },
          {
                "label": "Rétrospective sans aucune action immédiate",
                "stdin": "cas:2",
                "expected": "RETRO_SUMMARY: POSITIVE=1 | CHALLENGES=1 | ACTIONS=0"
          },
          {
                "label": "Multiples difficultés nécessitant plusieurs chantiers",
                "stdin": "cas:3",
                "expected": "RETRO_SUMMARY: POSITIVE=0 | CHALLENGES=2 | ACTIONS=1\n[ACTION #1] Owner: ScrumMaster -> Enforce 15-minute timebox on daily standup"
          },
          {
                "label": "Succès uniquement",
                "stdin": "cas:4",
                "expected": "RETRO_SUMMARY: POSITIVE=1 | CHALLENGES=0 | ACTIONS=0"
          }
    ],
    solution: "[Exemple]\nRETRO_SUMMARY: POSITIVE=1 | CHALLENGES=1 | ACTIONS=1\n[ACTION #1] Owner: Sarah -> Automate doc linting in Github Actions\n\n[Cas 1 — Rétrospective avec plusieurs actions concrètes]\nRETRO_SUMMARY: POSITIVE=2 | CHALLENGES=1 | ACTIONS=2\n[ACTION #1] Owner: Alex -> Deploy git-secrets pre-commit hook\n[ACTION #2] Owner: Maria -> Rotate exposed staging API tokens\n\n[Cas 2 — Rétrospective sans aucune action immédiate]\nRETRO_SUMMARY: POSITIVE=1 | CHALLENGES=1 | ACTIONS=0\n\n[Cas 3 — Multiples difficultés nécessitant plusieurs chantiers]\nRETRO_SUMMARY: POSITIVE=0 | CHALLENGES=2 | ACTIONS=1\n[ACTION #1] Owner: ScrumMaster -> Enforce 15-minute timebox on daily standup\n\n[Cas 4 — Succès uniquement]\nRETRO_SUMMARY: POSITIVE=1 | CHALLENGES=0 | ACTIONS=0\n"
  }
];
