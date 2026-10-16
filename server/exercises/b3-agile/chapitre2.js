/**
 * chapitre2.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ag3-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Validateur d’incrément de produit et Definition of Done (DoD)",
    goal: "Vérifier la conformité d’une User Story aux critères stricts de la Definition of Done avant livraison.",
    brief: "<p>Dans le cadre Scrum, un incrément ne peut être considéré comme terminé que s'il satisfait l'intégralité des critères de la <strong>Definition of Done (DoD)</strong> convenue par l'équipe.<br><br>\nPour chaque cas d’application des vérifications au format :<br>\n<code>DOD_CHECK item=&lt;nom&gt; tests=&lt;PASS|FAIL&gt; review=&lt;PASS|FAIL&gt; doc=&lt;PASS|FAIL&gt; staging=&lt;PASS|FAIL&gt;</code>.<br><br>\nRègles :<br>\n- Si tous les 4 critères sont <code>PASS</code> : <code>status=POTENTIALLY_SHIPPABLE missing=NONE</code><br>\n- Sinon : <code>status=REJECTED</code> et <code>missing=&lt;critères_en_échec_séparés_par_virgule&gt;</code> (dans l'ordre : tests, review, doc, staging).<br><br>\nPour chaque ligne, afficher :<br>\n<code>DOD_EVAL item={item} status={status} missing={missing}</code></p>",
    starter: "# Grille d'analyse (ag3-c2-e1) — Validateur d’incrément de produit et Definition of Done (DoD)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Documentation et déploiement staging manquants]\n# Données : DOD_CHECK item=US-202 tests=PASS review=PASS doc=FAIL staging=FAIL\nA_COMPLETER\n\n[Cas 2 — Échec des tests automatisés]\n# Données : DOD_CHECK item=US-303 tests=FAIL review=PASS doc=PASS staging=PASS\nA_COMPLETER\n\n[Cas 3 — Tous les critères en échec]\n# Données : DOD_CHECK item=US-404 tests=FAIL review=FAIL doc=FAIL staging=FAIL\nA_COMPLETER\n",
    hints: [
          "Constituer une liste des critères qui valent FAIL.",
          "Si la liste est vide, status vaut POTENTIALLY_SHIPPABLE et missing vaut NONE.",
          "Sinon, joindre les noms des critères avec une virgule."
    ],
    examples: [
          {
                "stdin": "DOD_CHECK item=US-101 tests=PASS review=PASS doc=PASS staging=PASS",
                "expected": "DOD_EVAL item=US-101 status=POTENTIALLY_SHIPPABLE missing=NONE",
                "note": "Tous les critères sont validés : incrément livrable."
          }
    ],
    tests: [
          {
                "label": "Documentation et déploiement staging manquants",
                "stdin": "cas:1",
                "expected": "DOD_EVAL item=US-202 status=REJECTED missing=doc,staging"
          },
          {
                "label": "Échec des tests automatisés",
                "stdin": "cas:2",
                "expected": "DOD_EVAL item=US-303 status=REJECTED missing=tests"
          },
          {
                "label": "Tous les critères en échec",
                "stdin": "cas:3",
                "expected": "DOD_EVAL item=US-404 status=REJECTED missing=tests,review,doc,staging"
          }
    ],
    solution: "[Exemple]\nDOD_EVAL item=US-101 status=POTENTIALLY_SHIPPABLE missing=NONE\n\n[Cas 1 — Documentation et déploiement staging manquants]\nDOD_EVAL item=US-202 status=REJECTED missing=doc,staging\n\n[Cas 2 — Échec des tests automatisés]\nDOD_EVAL item=US-303 status=REJECTED missing=tests\n\n[Cas 3 — Tous les critères en échec]\nDOD_EVAL item=US-404 status=REJECTED missing=tests,review,doc,staging\n"
  },
  {
    id: "ag3-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Ordonnanceur de Product Backlog par ROI et Réduction de Risque",
    goal: "Classer les éléments du Product Backlog selon un ratio pondéré Valeur Métier / Effort de développement.",
    brief: "<p>Le <strong>Product Owner</strong> priorise continuellement le Product Backlog afin de maximiser le retour sur investissement (ROI) délivré aux utilisateurs à chaque Sprint.<br><br>\nPour chaque cas d’application des éléments de backlog au format :<br>\n<code>BACKLOG_ITEM id=&lt;nom&gt; value=&lt;int&gt; risk_bonus=&lt;int&gt; effort=&lt;int&gt;</code>.<br><br>\nCalcul du score de priorité :<br>\n- <code>score = round((value + risk_bonus) / effort, 2)</code><br><br>\nOrdonnancement :<br>\nTrier les éléments par <strong>score décroissant</strong>. En cas d'égalité stricte de score, trier par ordre alphabétique de l'identifiant <code>id</code>.<br><br>\nAfficher pour chaque élément ordonné :<br>\n<code>RANK rank={rang_1_based} id={id} score={score} effort={effort}</code></p>",
    starter: "# Grille d'analyse (ag3-c2-e2) — Ordonnanceur de Product Backlog par ROI et Réduction de Risque\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois éléments avec égalité départagée par l’identifiant]\n# Données : BACKLOG_ITEM id=US-EXPORT value=40 risk_bonus=10 effort=5\n# Données : BACKLOG_ITEM id=US-DASHBOARD value=40 risk_bonus=10 effort=5\n# Données : BACKLOG_ITEM id=US-AUTH value=90 risk_bonus=10 effort=5\nA_COMPLETER\n\n[Cas 2 — Tâches techniques de réduction de dette]\n# Données : BACKLOG_ITEM id=TECH-CACHE value=20 risk_bonus=80 effort=8\n# Données : BACKLOG_ITEM id=UI-THEME value=30 risk_bonus=0 effort=6\nA_COMPLETER\n\n[Cas 3 — Liste à élément unique]\n# Données : BACKLOG_ITEM id=SINGLE-ITEM value=100 risk_bonus=20 effort=3\nA_COMPLETER\n",
    hints: [
          "Calculer le score avec float(value + risk_bonus) / float(effort).",
          "Trier la liste avec la clé lambda x: (-x[\"score\"], x[\"id\"])."
    ],
    examples: [
          {
                "stdin": "BACKLOG_ITEM id=US-LOGIN value=80 risk_bonus=20 effort=5\nBACKLOG_ITEM id=US-PAYMENT value=100 risk_bonus=50 effort=10",
                "expected": "RANK rank=1 id=US-LOGIN score=20.0 effort=5\nRANK rank=2 id=US-PAYMENT score=15.0 effort=10",
                "note": "US-LOGIN : score (80+20)/5 = 20.0 > US-PAYMENT (100+50)/10 = 15.0."
          }
    ],
    tests: [
          {
                "label": "Trois éléments avec égalité départagée par l’identifiant",
                "stdin": "cas:1",
                "expected": "RANK rank=1 id=US-AUTH score=20.0 effort=5\nRANK rank=2 id=US-DASHBOARD score=10.0 effort=5\nRANK rank=3 id=US-EXPORT score=10.0 effort=5"
          },
          {
                "label": "Tâches techniques de réduction de dette",
                "stdin": "cas:2",
                "expected": "RANK rank=1 id=TECH-CACHE score=12.5 effort=8\nRANK rank=2 id=UI-THEME score=5.0 effort=6"
          },
          {
                "label": "Liste à élément unique",
                "stdin": "cas:3",
                "expected": "RANK rank=1 id=SINGLE-ITEM score=40.0 effort=3"
          }
    ],
    solution: "[Exemple]\nRANK rank=1 id=US-LOGIN score=20.0 effort=5\nRANK rank=2 id=US-PAYMENT score=15.0 effort=10\n\n[Cas 1 — Trois éléments avec égalité départagée par l’identifiant]\nRANK rank=1 id=US-AUTH score=20.0 effort=5\nRANK rank=2 id=US-DASHBOARD score=10.0 effort=5\nRANK rank=3 id=US-EXPORT score=10.0 effort=5\n\n[Cas 2 — Tâches techniques de réduction de dette]\nRANK rank=1 id=TECH-CACHE score=12.5 effort=8\nRANK rank=2 id=UI-THEME score=5.0 effort=6\n\n[Cas 3 — Liste à élément unique]\nRANK rank=1 id=SINGLE-ITEM score=40.0 effort=3\n"
  },
  {
    id: "ag3-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Contrôleur de Timeboxing des événements Scrum selon le Scrum Guide",
    goal: "Vérifier la stricte conformité de la durée des réunions Scrum par rapport aux limites temporelles maximales officielles.",
    brief: "<p>Le <strong>Scrum Guide</strong> définit des boîtes de temps (timeboxes) maximales proportionnelles à la durée du Sprint (pour un Sprint de référence de 4 semaines, réduit proportionnellement pour 2 semaines) :<br>\n- <code>DAILY</code> (Daily Scrum) : <strong>15 minutes maximum</strong>, quelle que soit la durée du sprint.<br>\n- <code>PLANNING</code> (Sprint Planning) : <strong>2 heures par semaine de sprint</strong> (ex: 4h pour 2 sem, 8h pour 4 sem).<br>\n- <code>REVIEW</code> (Sprint Review) : <strong>1 heure par semaine de sprint</strong> (ex: 2h pour 2 sem, 4h pour 4 sem).<br>\n- <code>RETRO</code> (Sprint Retrospective) : <strong>45 minutes par semaine de sprint</strong> (ex: 90 min pour 2 sem, 180 min pour 4 sem).<br><br>\nPour chaque cas d’application des événements au format :<br>\n<code>CEREMONY type=&lt;DAILY|PLANNING|REVIEW|RETRO&gt; sprint_weeks=&lt;int&gt; actual_min=&lt;int&gt;</code>.<br><br>\nRègles :<br>\n- Calculer <code>allowed_min</code> selon le type et <code>sprint_weeks</code>.<br>\n- Si <code>actual_min &lt;= allowed_min</code> : <code>status=COMPLIANT delta=0</code>.<br>\n- Si <code>actual_min &gt; allowed_min</code> : <code>status=TIMEBOX_BREACH delta={actual_min - allowed_min}</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>TIMEBOX_AUDIT type={type} actual={actual_min}m max={allowed_min}m status={status} delta={delta}m</code></p>",
    starter: "# Grille d'analyse (ag3-c2-e3) — Contrôleur de Timeboxing des événements Scrum selon le Scrum Guide\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Planning conforme pour un sprint de deux semaines]\n# Données : CEREMONY type=PLANNING sprint_weeks=2 actual_min=210\nA_COMPLETER\n\n[Cas 2 — Rétrospective dépassant la limite autorisée]\n# Données : CEREMONY type=RETRO sprint_weeks=2 actual_min=110\nA_COMPLETER\n\n[Cas 3 — Revue de sprint conforme de 4 semaines]\n# Données : CEREMONY type=REVIEW sprint_weeks=4 actual_min=240\nA_COMPLETER\n",
    hints: [
          "Pour DAILY, max vaut toujours 15 minutes.",
          "Pour PLANNING, max vaut 120 * sprint_weeks.",
          "Pour REVIEW, max vaut 60 * sprint_weeks.",
          "Pour RETRO, max vaut 45 * sprint_weeks."
    ],
    examples: [
          {
                "stdin": "CEREMONY type=DAILY sprint_weeks=2 actual_min=25",
                "expected": "TIMEBOX_AUDIT type=DAILY actual=25m max=15m status=TIMEBOX_BREACH delta=10m",
                "note": "Daily de 25 minutes dépassant la limite stricte de 15 min de 10 minutes."
          }
    ],
    tests: [
          {
                "label": "Planning conforme pour un sprint de deux semaines",
                "stdin": "cas:1",
                "expected": "TIMEBOX_AUDIT type=PLANNING actual=210m max=240m status=COMPLIANT delta=0m"
          },
          {
                "label": "Rétrospective dépassant la limite autorisée",
                "stdin": "cas:2",
                "expected": "TIMEBOX_AUDIT type=RETRO actual=110m max=90m status=TIMEBOX_BREACH delta=20m"
          },
          {
                "label": "Revue de sprint conforme de 4 semaines",
                "stdin": "cas:3",
                "expected": "TIMEBOX_AUDIT type=REVIEW actual=240m max=240m status=COMPLIANT delta=0m"
          }
    ],
    solution: "[Exemple]\nTIMEBOX_AUDIT type=DAILY actual=25m max=15m status=TIMEBOX_BREACH delta=10m\n\n[Cas 1 — Planning conforme pour un sprint de deux semaines]\nTIMEBOX_AUDIT type=PLANNING actual=210m max=240m status=COMPLIANT delta=0m\n\n[Cas 2 — Rétrospective dépassant la limite autorisée]\nTIMEBOX_AUDIT type=RETRO actual=110m max=90m status=TIMEBOX_BREACH delta=20m\n\n[Cas 3 — Revue de sprint conforme de 4 semaines]\nTIMEBOX_AUDIT type=REVIEW actual=240m max=240m status=COMPLIANT delta=0m\n"
  }
];
