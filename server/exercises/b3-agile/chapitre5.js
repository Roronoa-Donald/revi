/**
 * chapitre5.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ag3-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Calculateur de Vélocité moyenne et estimation d’atterrissage de Release",
    goal: "Calculer la vélocité moyenne d’une équipe sur les derniers sprints et estimer le nombre de sprints nécessaires pour terminer le backlog restant.",
    brief: "<p>La <strong>Vélocité</strong> mesure la quantité moyenne de Story Points achevés (conformes à la Definition of Done) par une équipe par Sprint.<br><br>\nPour chaque cas d’application une commande au format :<br>\n<code>RELEASE_PLAN history=&lt;s1,s2,s3,...&gt; backlog_pts=&lt;int&gt;</code>.<br><br>\nCalculs :<br>\n- <code>avg_velocity = round(sum(history) / len(history), 1)</code><br>\n- Sprints restants requis : <code>sprints_needed = math.ceil(backlog_pts / avg_velocity)</code><br><br>\nAfficher :<br>\n<code>VELOCITY_REPORT history_count={n} avg_velocity={avg_velocity} remaining_pts={backlog_pts} sprints_needed={sprints_needed}</code></p>",
    starter: "# Grille d'analyse (ag3-c5-e1) — Calculateur de Vélocité moyenne et estimation d’atterrissage de Release\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq sprints d’historique avec charge importante]\n# Données : RELEASE_PLAN history=30,32,28,34,31 backlog_pts=155\nA_COMPLETER\n\n[Cas 2 — Vélocité exactement multiple du backlog]\n# Données : RELEASE_PLAN history=20,20 backlog_pts=40\nA_COMPLETER\n\n[Cas 3 — Faible vélocité avec grand nombre de sprints requis]\n# Données : RELEASE_PLAN history=10,12,8 backlog_pts=85\nA_COMPLETER\n",
    hints: [
          "Parser les points d’historique séparés par des virgules en entiers.",
          "Calculer avg_velocity = round(somme / nb, 1).",
          "Utiliser math.ceil(backlog / avg_velocity) pour arrondir au sprint supérieur entier."
    ],
    examples: [
          {
                "stdin": "RELEASE_PLAN history=20,25,24 backlog_pts=60",
                "expected": "VELOCITY_REPORT history_count=3 avg_velocity=23.0 remaining_pts=60 sprints_needed=3",
                "note": "Vélocité moyenne = 69 / 3 = 23.0. 60 / 23 = 2.61 -> 3 sprints nécessaires."
          }
    ],
    tests: [
          {
                "label": "Cinq sprints d’historique avec charge importante",
                "stdin": "cas:1",
                "expected": "VELOCITY_REPORT history_count=5 avg_velocity=31.0 remaining_pts=155 sprints_needed=5"
          },
          {
                "label": "Vélocité exactement multiple du backlog",
                "stdin": "cas:2",
                "expected": "VELOCITY_REPORT history_count=2 avg_velocity=20.0 remaining_pts=40 sprints_needed=2"
          },
          {
                "label": "Faible vélocité avec grand nombre de sprints requis",
                "stdin": "cas:3",
                "expected": "VELOCITY_REPORT history_count=3 avg_velocity=10.0 remaining_pts=85 sprints_needed=9"
          }
    ],
    solution: "[Exemple]\nVELOCITY_REPORT history_count=3 avg_velocity=23.0 remaining_pts=60 sprints_needed=3\n\n[Cas 1 — Cinq sprints d’historique avec charge importante]\nVELOCITY_REPORT history_count=5 avg_velocity=31.0 remaining_pts=155 sprints_needed=5\n\n[Cas 2 — Vélocité exactement multiple du backlog]\nVELOCITY_REPORT history_count=2 avg_velocity=20.0 remaining_pts=40 sprints_needed=2\n\n[Cas 3 — Faible vélocité avec grand nombre de sprints requis]\nVELOCITY_REPORT history_count=3 avg_velocity=10.0 remaining_pts=85 sprints_needed=9\n"
  },
  {
    id: "ag3-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Traceur de Sprint Burn-down et détection de Dérive de Périmètre (Scope Creep)",
    goal: "Analyser le reste à faire quotidien d’un Sprint, identifier le Scope Creep et évaluer l’avance ou le retard sur la trajectoire idéale.",
    brief: "<p>Le <strong>Sprint Burn-down chart</strong> trace jour après jour les Story Points restants par rapport à la pente idéale.<br><br>\nParamètres initiaux (Sprint de 10 jours ouvrés) :<br>\n- <code>SPRINT_INIT initial_pts=&lt;int&gt; total_days=10</code>.<br>\nPente idéale quotidienne : <code>ideal_burn_per_day = initial_pts / 10.0</code>.<br>\nLe reste idéal au jour <code>d</code> est <code>ideal_rem = round(initial_pts - (d * ideal_burn_per_day), 1)</code>.<br><br>\nPour chaque jour de relevé :<br>\n<code>DAY_LOG day=&lt;int&gt; actual_rem=&lt;int&gt; added_pts=&lt;int&gt;</code>.<br><br>\nRègles :<br>\n- Si <code>added_pts &gt; 0</code> : <code>scope_creep=YES(+{added_pts}pts)</code>, sinon <code>scope_creep=NO</code>.<br>\n- Si <code>actual_rem &gt; ideal_rem</code> : <code>trend=BEHIND</code>.<br>\n- Si <code>actual_rem &lt;= ideal_rem</code> : <code>trend=ON_TRACK</code>.<br><br>\nPour chaque jour, afficher :<br>\n<code>BURNDOWN_TRACK day={day} actual={actual_rem} ideal={ideal_rem} trend={trend} creep={scope_creep}</code></p>",
    starter: "# Grille d'analyse (ag3-c5-e2) — Traceur de Sprint Burn-down et détection de Dérive de Périmètre (Scope Creep)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Progression rapide en avance constante sur la ligne idéale]\n# Données : SPRINT_INIT initial_pts=50 total_days=10\n# Données : DAY_LOG day=3 actual_rem=30 added_pts=0\n# Données : DAY_LOG day=5 actual_rem=20 added_pts=0\nA_COMPLETER\n\n[Cas 2 — Accumulation sévère de Scope Creep]\n# Données : SPRINT_INIT initial_pts=30 total_days=10\n# Données : DAY_LOG day=4 actual_rem=25 added_pts=5\nA_COMPLETER\n\n[Cas 3 — Dernier jour du sprint avec achèvement complet]\n# Données : SPRINT_INIT initial_pts=20 total_days=10\n# Données : DAY_LOG day=10 actual_rem=0 added_pts=0\nA_COMPLETER\n",
    hints: [
          "Récupérer initial_pts depuis la ligne SPRINT_INIT.",
          "Pour chaque jour d, ideal_rem = round(initial_pts - (d * (initial_pts / 10.0)), 1)."
    ],
    examples: [
          {
                "stdin": "SPRINT_INIT initial_pts=40 total_days=10\nDAY_LOG day=1 actual_rem=36 added_pts=0\nDAY_LOG day=2 actual_rem=34 added_pts=2",
                "expected": "BURNDOWN_TRACK day=1 actual=36 ideal=36.0 trend=ON_TRACK creep=NO\nBURNDOWN_TRACK day=2 actual=34 ideal=32.0 trend=BEHIND creep=YES(+2pts)",
                "note": "Jour 1 : 36 restant conforme à la ligne idéale 36.0. Jour 2 : 34 restant > idéal 32.0 avec ajout de 2 points."
          }
    ],
    tests: [
          {
                "label": "Progression rapide en avance constante sur la ligne idéale",
                "stdin": "cas:1",
                "expected": "BURNDOWN_TRACK day=3 actual=30 ideal=35.0 trend=ON_TRACK creep=NO\nBURNDOWN_TRACK day=5 actual=20 ideal=25.0 trend=ON_TRACK creep=NO"
          },
          {
                "label": "Accumulation sévère de Scope Creep",
                "stdin": "cas:2",
                "expected": "BURNDOWN_TRACK day=4 actual=25 ideal=18.0 trend=BEHIND creep=YES(+5pts)"
          },
          {
                "label": "Dernier jour du sprint avec achèvement complet",
                "stdin": "cas:3",
                "expected": "BURNDOWN_TRACK day=10 actual=0 ideal=0.0 trend=ON_TRACK creep=NO"
          }
    ],
    solution: "[Exemple]\nBURNDOWN_TRACK day=1 actual=36 ideal=36.0 trend=ON_TRACK creep=NO\nBURNDOWN_TRACK day=2 actual=34 ideal=32.0 trend=BEHIND creep=YES(+2pts)\n\n[Cas 1 — Progression rapide en avance constante sur la ligne idéale]\nBURNDOWN_TRACK day=3 actual=30 ideal=35.0 trend=ON_TRACK creep=NO\nBURNDOWN_TRACK day=5 actual=20 ideal=25.0 trend=ON_TRACK creep=NO\n\n[Cas 2 — Accumulation sévère de Scope Creep]\nBURNDOWN_TRACK day=4 actual=25 ideal=18.0 trend=BEHIND creep=YES(+5pts)\n\n[Cas 3 — Dernier jour du sprint avec achèvement complet]\nBURNDOWN_TRACK day=10 actual=0 ideal=0.0 trend=ON_TRACK creep=NO\n"
  },
  {
    id: "ag3-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Simulateur de Prévision Probabiliste de Release (Pessimiste, Médian, Optimiste)",
    goal: "Calculer la fourchette d’atterrissage d’une Release en intégrant les trois scénarios de vélocité de l’équipe.",
    brief: "<p>En gestion prévisionnelle agile, une date d'engagement unique est un anti-pattern. On modélise un cône d'incertitude à trois bornes :<br>\n- <strong>Scénario Optimiste (Best case)</strong> : basé sur la vélocité maximale observée (<code>v_max</code>).<br>\n- <strong>Scénario Médian (Expected case)</strong> : basé sur la vélocité médiane/moyenne (<code>v_med</code>).<br>\n- <strong>Scénario Pessimiste (Worst case)</strong> : basé sur la vélocité minimale observée (<code>v_min</code>).<br><br>\nPour chaque cas d’application des paramètres au format :<br>\n<code>CONE_FORECAST release=&lt;nom&gt; backlog_pts=&lt;int&gt; v_min=&lt;int&gt; v_med=&lt;int&gt; v_max=&lt;int&gt;</code>.<br><br>\nCalculs (en arrondissant chaque sprint nécessaire au plafond supérieur <code>math.ceil</code>) :<br>\n- <code>sprints_best = math.ceil(backlog_pts / v_max)</code><br>\n- <code>sprints_med = math.ceil(backlog_pts / v_med)</code><br>\n- <code>sprints_worst = math.ceil(backlog_pts / v_min)</code><br><br>\nAfficher :<br>\n<code>FORECAST_RANGE release={release} best={sprints_best}sprints expected={sprints_med}sprints worst={sprints_worst}sprints spread={sprints_worst - sprints_best}sprints</code></p>",
    starter: "# Grille d'analyse (ag3-c5-e3) — Simulateur de Prévision Probabiliste de Release (Pessimiste, Médian, Optimiste)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Vélocité stable avec faible dispersion]\n# Données : CONE_FORECAST release=PILOTE backlog_pts=60 v_min=18 v_med=20 v_max=22\nA_COMPLETER\n\n[Cas 2 — Forte incertitude sur équipe nouvelle]\n# Données : CONE_FORECAST release=PROJET_X backlog_pts=120 v_min=10 v_med=25 v_max=40\nA_COMPLETER\n\n[Cas 3 — Petit backlog d’appoint]\n# Données : CONE_FORECAST release=HOTFIX_PACK backlog_pts=25 v_min=5 v_med=10 v_max=15\nA_COMPLETER\n",
    hints: [
          "Calculer les 3 valeurs avec math.ceil(backlog_pts / v).",
          "L’écart (spread) vaut sprints_worst - sprints_best."
    ],
    examples: [
          {
                "stdin": "CONE_FORECAST release=V2.0 backlog_pts=100 v_min=15 v_med=22 v_max=30",
                "expected": "FORECAST_RANGE release=V2.0 best=4sprints expected=5sprints worst=7sprints spread=3sprints",
                "note": "Best: 100/30=4 sprints, Med: 100/22=5 sprints, Worst: 100/15=7 sprints. Spread: 7 - 4 = 3 sprints."
          }
    ],
    tests: [
          {
                "label": "Vélocité stable avec faible dispersion",
                "stdin": "cas:1",
                "expected": "FORECAST_RANGE release=PILOTE best=3sprints expected=3sprints worst=4sprints spread=1sprints"
          },
          {
                "label": "Forte incertitude sur équipe nouvelle",
                "stdin": "cas:2",
                "expected": "FORECAST_RANGE release=PROJET_X best=3sprints expected=5sprints worst=12sprints spread=9sprints"
          },
          {
                "label": "Petit backlog d’appoint",
                "stdin": "cas:3",
                "expected": "FORECAST_RANGE release=HOTFIX_PACK best=2sprints expected=3sprints worst=5sprints spread=3sprints"
          }
    ],
    solution: "[Exemple]\nFORECAST_RANGE release=V2.0 best=4sprints expected=5sprints worst=7sprints spread=3sprints\n\n[Cas 1 — Vélocité stable avec faible dispersion]\nFORECAST_RANGE release=PILOTE best=3sprints expected=3sprints worst=4sprints spread=1sprints\n\n[Cas 2 — Forte incertitude sur équipe nouvelle]\nFORECAST_RANGE release=PROJET_X best=3sprints expected=5sprints worst=12sprints spread=9sprints\n\n[Cas 3 — Petit backlog d’appoint]\nFORECAST_RANGE release=HOTFIX_PACK best=2sprints expected=3sprints worst=5sprints spread=3sprints\n"
  }
];
