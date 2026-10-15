/**
 * server/exercises/b3-supervision/chapitre1.js — Exercices du Chapitre 1
 * Chapitre 1 : Introduction & Fondements de la Supervision Informatique
 */

module.exports = [
  {
    id: 'sup3-c1-e1',
    chapter: 1,
    title: 'Calculateur de Disponibilité SLA, MTBF et MTTR',
    level: 'n1',
    language: 'python',
    goal: 'Calculer les indicateurs fondamentaux de fiabilité et de maintenabilité opérationnelle : MTBF, MTTR et taux de disponibilité globale.',
    brief: `<p>Dans un centre de supervision (NOC), les indicateurs clés de performance (KPI) permettent de mesurer la qualité de service :<br><br>
1. <strong>MTTR (Mean Time To Repair)</strong> : Temps moyen nécessaire pour rétablir le service après une panne :<br>
<code>MTTR = Indisponibilité_totale_heures / Nombre_de_pannes</code> (0.00 si aucune panne).<br><br>
2. <strong>MTBF (Mean Time Between Failures)</strong> : Temps moyen écoulé entre deux pannes consécutives (temps effectif de fonctionnement) :<br>
<code>MTBF = Temps_de_fonctionnement_heures / Nombre_de_pannes</code> (ou total des heures si aucune panne).<br><br>
3. <strong>Disponibilité globale (%)</strong> :<br>
<code>Disponibilité = (Temps_de_fonctionnement_heures / Total_heures) * 100</code>.<br><br>
Entrée STDIN : <code>SLA_CALC TOTAL_HOURS=&lt;h&gt; OUTAGES=&lt;m1,m2,...|NONE&gt;</code> (les durées de coupures sont données en minutes).<br>
Sortie : <code>SLA: uptime_hours=&lt;up:.2f&gt; downtime_hours=&lt;down:.2f&gt; failures=&lt;n&gt; mttr_hours=&lt;mttr:.2f&gt; mtbf_hours=&lt;mtbf:.2f&gt; availability=&lt;pct:.4f&gt;%</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser SLA_CALC et calculer MTTR, MTBF et disponibilité
`,
    hints: [
      "Convertissez les minutes de coupure en heures en divisant par 60.0.",
      "Gérez le cas OUTAGES=NONE où le nombre de pannes est égal à zéro."
    ],
    examples: [
      {
        stdin: 'SLA_CALC TOTAL_HOURS=720 OUTAGES=45,15',
        expected: 'SLA: uptime_hours=719.00 downtime_hours=1.00 failures=2 mttr_hours=0.50 mtbf_hours=359.50 availability=99.8611%',
        note: "Cas d'usage nominal avec 2 pannes sur un mois de 720h."
      }
    ],
    tests: [
      {
        label: 'Mois parfait sans aucune panne',
        stdin: 'SLA_CALC TOTAL_HOURS=720 OUTAGES=NONE',
        expected: 'SLA: uptime_hours=720.00 downtime_hours=0.00 failures=0 mttr_hours=0.00 mtbf_hours=720.00 availability=100.0000%\n'
      },
      {
        label: 'Trois pannes cumulées sur une semaine de 168h',
        stdin: 'SLA_CALC TOTAL_HOURS=168 OUTAGES=120,60,180',
        expected: 'SLA: uptime_hours=162.00 downtime_hours=6.00 failures=3 mttr_hours=2.00 mtbf_hours=54.00 availability=96.4286%\n'
      },
      {
        label: 'Une seule coupure de 26 minutes sur une année complète (8760h)',
        stdin: 'SLA_CALC TOTAL_HOURS=8760 OUTAGES=26',
        expected: 'SLA: uptime_hours=8759.57 downtime_hours=0.43 failures=1 mttr_hours=0.43 mtbf_hours=8759.57 availability=99.9951%\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("SLA_CALC "):
        continue
    parts = ligne.split("SLA_CALC ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    total_hours = float(params.get("TOTAL_HOURS", "0"))
    outages_str = params.get("OUTAGES", "NONE")

    if outages_str == "NONE" or not outages_str.strip():
        outages = []
    else:
        outages = [float(x.strip()) for x in outages_str.split(",") if x.strip()]

    n_failures = len(outages)
    total_downtime_hours = sum(outages) / 60.0
    uptime_hours = max(0.0, total_hours - total_downtime_hours)

    if n_failures > 0:
        mttr = total_downtime_hours / n_failures
        mtbf = uptime_hours / n_failures
    else:
        mttr = 0.0
        mtbf = total_hours

    avail_pct = (uptime_hours / total_hours * 100.0) if total_hours > 0 else 100.0

    print(f"SLA: uptime_hours={uptime_hours:.2f} downtime_hours={total_downtime_hours:.2f} failures={n_failures} mttr_hours={mttr:.2f} mtbf_hours={mtbf:.2f} availability={avail_pct:.4f}%")
`
  },
  {
    id: 'sup3-c1-e2',
    chapter: 1,
    title: 'Matrice de Criticité & Priorisation d’Incidents de Supervision',
    level: 'n2',
    language: 'python',
    goal: 'Qualifier et classifier le niveau de gravité d\'une alerte selon la couche réseau/système, le nombre d\'utilisateurs et la redondance.',
    brief: `<p>Pour prioriser l'action des équipes d'exploitation sans provoquer de fatigue d'alerte, chaque événement doit être qualifié :<br><br>
Règles de classification :<br>
1. <strong>P1-CRITICAL</strong> : Si (<code>USERS &gt;= 100</code> ET <code>REDUNDANT=NO</code>) OU (<code>LAYER=database</code> ET <code>USERS &gt;= 50</code>).<br>
2. <strong>P2-HIGH</strong> : Sinon, si <code>USERS &gt;= 50</code> OU (<code>REDUNDANT=NO</code> ET <code>LAYER in [network, server]</code>).<br>
3. <strong>P3-MEDIUM</strong> : Sinon, si <code>USERS &gt;= 10</code>.<br>
4. <strong>P4-LOW</strong> : Tous les autres cas.<br><br>
Entrée STDIN : <code>INCIDENT SERVICE=&lt;nom&gt; LAYER=&lt;network|server|database|application&gt; USERS=&lt;n&gt; REDUNDANT=&lt;YES|NO&gt;</code>.<br>
Sortie : <code>INCIDENT_PRIORITY: service=&lt;nom&gt; layer=&lt;layer&gt; users=&lt;n&gt; priority=&lt;P1-CRITICAL|P2-HIGH|P3-MEDIUM|P4-LOW&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les alertes de supervision selon la matrice de criticité
`,
    hints: [
      "Extrayez les paramètres clé=valeur de chaque ligne INCIDENT.",
      "Vérifiez les conditions dans l'ordre de priorité décroissant (P1 puis P2 puis P3 puis P4)."
    ],
    examples: [
      {
        stdin: 'INCIDENT SERVICE=Switch-Core-01 LAYER=network USERS=250 REDUNDANT=NO',
        expected: 'INCIDENT_PRIORITY: service=Switch-Core-01 layer=network users=250 priority=P1-CRITICAL',
        note: "Coupure réseau sans redondance avec 250 utilisateurs."
      }
    ],
    tests: [
      {
        label: 'Base de données principale sans redondance 80 utilisateurs',
        stdin: 'INCIDENT SERVICE=Postgres-Primary LAYER=database USERS=80 REDUNDANT=NO',
        expected: 'INCIDENT_PRIORITY: service=Postgres-Primary layer=database users=80 priority=P1-CRITICAL\n'
      },
      {
        label: 'Serveur DHCP sans redondance avec 5 utilisateurs',
        stdin: 'INCIDENT SERVICE=DHCP-Primary LAYER=server USERS=5 REDUNDANT=NO',
        expected: 'INCIDENT_PRIORITY: service=DHCP-Primary layer=server users=5 priority=P2-HIGH\n'
      },
      {
        label: 'Serveur Web Nginx redondant avec 30 utilisateurs',
        stdin: 'INCIDENT SERVICE=Nginx-Web-Front LAYER=application USERS=30 REDUNDANT=YES',
        expected: 'INCIDENT_PRIORITY: service=Nginx-Web-Front layer=application users=30 priority=P3-MEDIUM\n'
      },
      {
        label: 'Service NTP interne redondant avec 0 utilisateur direct',
        stdin: 'INCIDENT SERVICE=NTP-Internal LAYER=server USERS=0 REDUNDANT=YES',
        expected: 'INCIDENT_PRIORITY: service=NTP-Internal layer=server users=0 priority=P4-LOW\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("INCIDENT "):
        continue
    parts = ligne.split("INCIDENT ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    service = params.get("SERVICE", "unknown")
    layer = params.get("LAYER", "server").lower()
    users = int(params.get("USERS", "0"))
    redundant = params.get("REDUNDANT", "YES").upper() == "YES"

    if (users >= 100 and not redundant) or (layer == "database" and users >= 50):
        priority = "P1-CRITICAL"
    elif users >= 50 or (not redundant and layer in ["network", "server"]):
        priority = "P2-HIGH"
    elif users >= 10:
        priority = "P3-MEDIUM"
    else:
        priority = "P4-LOW"

    print(f"INCIDENT_PRIORITY: service={service} layer={layer} users={users} priority={priority}")
`
  },
  {
    id: 'sup3-c1-e3',
    chapter: 1,
    title: 'Auditeur de Respect SLO et Budget d’Erreur (Error Budget)',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la consommation du budget d\'indisponibilité alloué par un objectif de niveau de service (SLO).',
    brief: `<p>Dans la démarche SRE / DevOps, le budget d'erreur quantifie la marge d'indisponibilité permise avant de violer le contrat de service :<br><br>
1. <code>Minutes_totales = PERIOD_DAYS * 24 * 60</code>.<br>
2. <code>Budget_autorisé_minutes = Minutes_totales * (1.0 - (SLO / 100.0))</code>.<br>
3. <code>Budget_consommé_minutes = Somme(durées_coupures_minutes)</code>.<br>
4. <code>Budget_restant_minutes = Budget_autorisé - Budget_consommé</code>.<br>
5. <code>Pourcentage_consommé = (Budget_consommé / Budget_autorisé) * 100.0</code> (ou 0.0% si autorisé est nul).<br>
6. Statut : <code>COMPLIANT</code> si consommé &lt;= autorisé, sinon <code>BREACHED</code>.<br><br>
Entrée STDIN : <code>ERROR_BUDGET SLO=&lt;pct&gt; PERIOD_DAYS=&lt;j&gt; OUTAGES=&lt;m1,m2,...|NONE&gt;</code>.<br>
Sortie : <code>BUDGET: period_days=&lt;j&gt; allowed_min=&lt;all:.1f&gt; consumed_min=&lt;cons:.1f&gt; remaining_min=&lt;rem:.1f&gt; consumed_pct=&lt;pct:.2f&gt;% status=&lt;COMPLIANT|BREACHED&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le budget d'erreur et évaluer la conformité SLO
`,
    hints: [
      "Calculez le nombre total de minutes sur la période.",
      "Arrondissez allowed_min, consumed_min et remaining_min à 1 décimale, consumed_pct à 2 décimales."
    ],
    examples: [
      {
        stdin: 'ERROR_BUDGET SLO=99.9 PERIOD_DAYS=30 OUTAGES=12,18,5',
        expected: 'BUDGET: period_days=30 allowed_min=43.2 consumed_min=35.0 remaining_min=8.2 consumed_pct=81.02% status=COMPLIANT',
        note: "35 minutes consommées sur 43.2 minutes autorisées : conforme."
      }
    ],
    tests: [
      {
        label: 'Dépassement du budget sur un mois à 99.95%',
        stdin: 'ERROR_BUDGET SLO=99.95 PERIOD_DAYS=30 OUTAGES=15,10',
        expected: 'BUDGET: period_days=30 allowed_min=21.6 consumed_min=25.0 remaining_min=-3.4 consumed_pct=115.74% status=BREACHED\n'
      },
      {
        label: 'Semaine parfaite sans coupure à 99.0%',
        stdin: 'ERROR_BUDGET SLO=99.0 PERIOD_DAYS=7 OUTAGES=NONE',
        expected: 'BUDGET: period_days=7 allowed_min=100.8 consumed_min=0.0 remaining_min=100.8 consumed_pct=0.00% status=COMPLIANT\n'
      },
      {
        label: 'Budget exactement consommé à 100%',
        stdin: 'ERROR_BUDGET SLO=99.9 PERIOD_DAYS=10 OUTAGES=14.4',
        expected: 'BUDGET: period_days=10 allowed_min=14.4 consumed_min=14.4 remaining_min=0.0 consumed_pct=100.00% status=COMPLIANT\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ERROR_BUDGET "):
        continue
    parts = ligne.split("ERROR_BUDGET ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    slo = float(params.get("SLO", "99.0"))
    days = int(params.get("PERIOD_DAYS", "30"))
    outages_str = params.get("OUTAGES", "NONE")

    total_min = days * 24 * 60
    allowed_min = round(total_min * (1.0 - (slo / 100.0)), 6)

    if outages_str == "NONE" or not outages_str.strip():
        outages = []
    else:
        outages = [float(x.strip()) for x in outages_str.split(",") if x.strip()]

    consumed_min = round(sum(outages), 6)
    remaining_min = round(allowed_min - consumed_min, 6)
    if abs(remaining_min) < 1e-9:
        remaining_min = 0.0

    consumed_pct = (consumed_min / allowed_min * 100.0) if allowed_min > 0 else 0.0
    status = "COMPLIANT" if consumed_min <= allowed_min + 1e-9 else "BREACHED"

    print(f"BUDGET: period_days={days} allowed_min={allowed_min:.1f} consumed_min={consumed_min:.1f} remaining_min={remaining_min:.1f} consumed_pct={consumed_pct:.2f}% status={status}")
`
  }
];
