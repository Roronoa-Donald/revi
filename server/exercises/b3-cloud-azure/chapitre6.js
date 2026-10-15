/**
 * Exercices du Chapitre 6 : Surveillance, Gestion des Coûts & Automatisation (IaC & KQL).
 * Préfixe : az3-c6-e
 */
'use strict';

module.exports = [
  {
    id: 'az3-c6-e1',
    chapter: 6,
    title: 'Interpréteur de requêtes Log Analytics KQL',
    level: 'n1',
    language: 'python',
    goal: 'Exécuter un pipeline de requêtes KQL (where, summarize, order by, take) sur un jeu de journaux d’événements Azure.',
    brief: `<p>Le langage KQL (Kusto Query Language) est le standard d'interrogation analytique d'Azure Monitor, Log Analytics et Microsoft Sentinel.<br><br>
Format d'entrée :<br>
Un flux d'événements Azure au format :<br>
<code>EVENT rg=&lt;rg&gt; op=&lt;operation&gt; status=&lt;Success|Failed&gt; duration_ms=&lt;int&gt;</code><br>
Suivi d'une instruction KQL sur la dernière ligne :<br>
<code>KQL where status == "&lt;Success|Failed&gt;" | summarize count() by op | order by count_ desc | take &lt;N&gt;</code><br><br>
Comportement du moteur KQL :<br>
1. Filtrer les événements où <code>status</code> correspond à la valeur demandée.<br>
2. Agréger les occurrences par <code>op</code> (opération), produisant un champ <code>count_</code>.<br>
3. Trier les résultats par <code>count_</code> décroissant (en cas d'égalité, tri alphabétique croissant sur <code>op</code>).<br>
4. Conserver les <code>N</code> premières lignes (opérateur <code>take</code>).<br><br>
Format de sortie attendu :<br>
En-tête : <code>op | count_</code><br>
Chaque ligne : <code>&lt;op&gt; | &lt;count_&gt;</code><br>
(Si aucun événement ne correspond : afficher uniquement l'en-tête).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les événements et exécuter la requête KQL
`,
    hints: [
      'Stocker les événements dans une liste de dictionnaires.',
      'Extraire le filtre status et la limite N depuis la ligne de commande KQL avec re ou split.',
      'Utiliser collections.Counter pour compter les opérations filtrées.'
    ],
    examples: [
      {
        stdin: 'EVENT rg=rg-prod op=RestartVM status=Failed duration_ms=450\nEVENT rg=rg-prod op=DeleteDisk status=Failed duration_ms=1200\nEVENT rg=rg-prod op=RestartVM status=Failed duration_ms=300\nEVENT rg=rg-dev op=RestartVM status=Success duration_ms=150\nKQL where status == "Failed" | summarize count() by op | order by count_ desc | take 2',
        expected: 'op | count_\nRestartVM | 2\nDeleteDisk | 1',
        note: 'Filtrage des événements en échec, agrégation par opération et sélection des 2 premières.'
      }
    ],
    tests: [
      {
        label: 'Requête sur les opérations de sécurité en échec',
        stdin: 'EVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=200\nEVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=220\nEVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=210\nEVENT rg=rg-sec op=RotateSecret status=Failed duration_ms=180\nKQL where status == "Failed" | summarize count() by op | order by count_ desc | take 2',
        expected: 'op | count_\nRevokeKey | 3\nRotateSecret | 1'
      },
      {
        label: 'Requête sur les succès avec take 3',
        stdin: 'EVENT rg=rg-prod op=StartVM status=Success duration_ms=100\nEVENT rg=rg-prod op=StartVM status=Success duration_ms=120\nEVENT rg=rg-prod op=AttachDisk status=Success duration_ms=250\nEVENT rg=rg-prod op=CreateNic status=Success duration_ms=180\nKQL where status == "Success" | summarize count() by op | order by count_ desc | take 3',
        expected: 'op | count_\nStartVM | 2\nAttachDisk | 1\nCreateNic | 1'
      },
      {
        label: 'Aucun événement ne correspondant au filtre',
        stdin: 'EVENT rg=rg-prod op=StartVM status=Success duration_ms=100\nKQL where status == "Failed" | summarize count() by op | order by count_ desc | take 5',
        expected: 'op | count_'
      }
    ],
    solution: `import sys
import re
from collections import Counter

events = []
kql_query = None

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith("EVENT "):
        props = {}
        for part in line[len("EVENT "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        events.append(props)
    elif line.startswith("KQL "):
        kql_query = line[len("KQL "):].strip()

print("op | count_")

if kql_query:
    # Extraction du filtre de statut
    status_match = re.search(r'where\\s+status\\s*==\\s*\"([^\"]+)\"', kql_query)
    target_status = status_match.group(1) if status_match else None
    
    # Extraction du take
    take_match = re.search(r'take\\s+(\\d+)', kql_query)
    limit = int(take_match.group(1)) if take_match else 10
    
    # 1. Filtrer
    filtered_ops = [
        ev.get("op", "unknown") for ev in events
        if target_status is None or ev.get("status") == target_status
    ]
    
    # 2. Agréger
    counts = Counter(filtered_ops)
    
    # 3. Trier par count desc puis op asc
    sorted_items = sorted(counts.items(), key=lambda x: (-x[1], x[0]))
    
    # 4. Take
    for op, cnt in sorted_items[:limit]:
        print(f"{op} | {cnt}")
`
  },
  {
    id: 'az3-c6-e2',
    chapter: 6,
    title: 'Gestionnaire d\'alertes Azure Monitor et suivi budgétaire',
    level: 'n2',
    language: 'python',
    goal: 'Évaluer en temps réel des règles d’alerte sur métriques d’infrastructure (CPU) et surveiller les seuils d’engagement budgétaire Cost Management.',
    brief: `<p>Azure Monitor déclenche des alertes métriques pour automatiser les remédiations, tandis qu'Azure Cost Management avertit les équipes lorsque les dépenses réelles ou prévisionnelles franchissent des pourcentages clés du budget mensuel.<br><br>
Format d'entrée :<br>
1. Définition du budget mensuel :<br>
   <code>BUDGET amount=&lt;float&gt; currency=EUR</code><br>
2. Déclaration des règles d'alerte :<br>
   - <code>ALERT_RULE metric=CPU threshold=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>
   - <code>ALERT_RULE metric=SPEND_ACTUAL threshold_pct=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>
   - <code>ALERT_RULE metric=SPEND_FORECAST threshold_pct=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>
3. Enregistrements télémétriques :<br>
   <code>RECORD metric=&lt;METRIC&gt; value=&lt;float&gt;</code><br><br>
Règles de déclenchement :<br>
- Pour <code>CPU</code> :<br>
  - Si <code>value &gt;= threshold</code> :<br>
    <code>ALERT_FIRED: metric=CPU val=&lt;value:.1f&gt;% threshold=&lt;threshold&gt;% severity=&lt;SevX&gt; action=TRIGGER_ACTION_GROUP</code><br>
  - Sinon : <code>ALERT_OK: metric=CPU val=&lt;value:.1f&gt;%</code><br>
- Pour <code>SPEND_ACTUAL</code> :<br>
  Le seuil en euros vaut <code>amount * (threshold_pct / 100)</code>.<br>
  - Si <code>value &gt;= seuil_euros</code> :<br>
    <code>ALERT_FIRED: metric=SPEND_ACTUAL val=&lt;value:.2f&gt;EUR threshold=&lt;seuil_euros:.2f&gt;EUR (pct=&lt;threshold_pct&gt;%) severity=&lt;SevX&gt; action=NOTIFY_FINOPS</code><br>
  - Sinon : <code>ALERT_OK: metric=SPEND_ACTUAL val=&lt;value:.2f&gt;EUR</code><br>
- Pour <code>SPEND_FORECAST</code> :<br>
  Le seuil en euros vaut <code>amount * (threshold_pct / 100)</code>.<br>
  - Si <code>value &gt;= seuil_euros</code> :<br>
    <code>ALERT_FIRED: metric=SPEND_FORECAST val=&lt;value:.2f&gt;EUR threshold=&lt;seuil_euros:.2f&gt;EUR (pct=&lt;threshold_pct&gt;%) severity=&lt;SevX&gt; action=NOTIFY_FINOPS</code><br>
  - Sinon : <code>ALERT_OK: metric=SPEND_FORECAST val=&lt;value:.2f&gt;EUR</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : surveiller les seuils CPU et budgétaires Azure
`,
    hints: [
      'Calculer les seuils budgétaires effectifs en multipliant le montant du budget par threshold_pct / 100.',
      'Associer chaque métrique à sa sévérité et formater rigoureusement les messages d\'alerte.'
    ],
    examples: [
      {
        stdin: 'BUDGET amount=1000 currency=EUR\nALERT_RULE metric=CPU threshold=80 severity=Sev1\nALERT_RULE metric=SPEND_ACTUAL threshold_pct=80 severity=Sev2\nRECORD metric=CPU value=85.5\nRECORD metric=SPEND_ACTUAL value=750.0',
        expected: 'ALERT_FIRED: metric=CPU val=85.5% threshold=80% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=750.00EUR',
        note: 'Alerte CPU déclenchée à 85.5% et dépense sous le seuil des 80% (800 EUR).'
      }
    ],
    tests: [
      {
        label: 'CPU au-dessus du seuil et dépense réelle sous le seuil',
        stdin: 'BUDGET amount=1200 currency=EUR\nALERT_RULE metric=CPU threshold=75 severity=Sev1\nALERT_RULE metric=SPEND_ACTUAL threshold_pct=85 severity=Sev2\nRECORD metric=CPU value=92.0\nRECORD metric=SPEND_ACTUAL value=800.0',
        expected: 'ALERT_FIRED: metric=CPU val=92.0% threshold=75% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=800.00EUR'
      },
      {
        label: 'Dépassement prévisionnel 100% et dépense réelle à 90%',
        stdin: 'BUDGET amount=500 currency=EUR\nALERT_RULE metric=SPEND_ACTUAL threshold_pct=90 severity=Sev1\nALERT_RULE metric=SPEND_FORECAST threshold_pct=100 severity=Sev1\nRECORD metric=SPEND_ACTUAL value=460.0\nRECORD metric=SPEND_FORECAST value=550.0',
        expected: 'ALERT_FIRED: metric=SPEND_ACTUAL val=460.00EUR threshold=450.00EUR (pct=90%) severity=Sev1 action=NOTIFY_FINOPS\nALERT_FIRED: metric=SPEND_FORECAST val=550.00EUR threshold=500.00EUR (pct=100%) severity=Sev1 action=NOTIFY_FINOPS'
      },
      {
        label: 'Toutes les métriques conformes sous les seuils',
        stdin: 'BUDGET amount=2000 currency=EUR\nALERT_RULE metric=CPU threshold=90 severity=Sev0\nRECORD metric=CPU value=45.0',
        expected: 'ALERT_OK: metric=CPU val=45.0%'
      }
    ],
    solution: `import sys

budget_amount = 0.0
rules = {}

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith("BUDGET "):
        props = {}
        for part in line[len("BUDGET "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        budget_amount = float(props.get("amount", 0.0))
        
    elif line.startswith("ALERT_RULE "):
        props = {}
        for part in line[len("ALERT_RULE "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        m = props.get("metric")
        rules[m] = {
            "threshold": float(props.get("threshold", props.get("threshold_pct", 0))),
            "severity": props.get("severity", "Sev2")
        }
        
    elif line.startswith("RECORD "):
        props = {}
        for part in line[len("RECORD "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        m = props.get("metric")
        val = float(props.get("value", 0.0))
        
        rule = rules.get(m)
        if not rule:
            continue
            
        t_val = rule["threshold"]
        sev = rule["severity"]
        
        if m == "CPU":
            if val >= t_val:
                print(f"ALERT_FIRED: metric=CPU val={val:.1f}% threshold={int(t_val)}% severity={sev} action=TRIGGER_ACTION_GROUP")
            else:
                print(f"ALERT_OK: metric=CPU val={val:.1f}%")
        elif m in ("SPEND_ACTUAL", "SPEND_FORECAST"):
            threshold_eur = budget_amount * (t_val / 100.0)
            if val >= threshold_eur:
                print(f"ALERT_FIRED: metric={m} val={val:.2f}EUR threshold={threshold_eur:.2f}EUR (pct={int(t_val)}%) severity={sev} action=NOTIFY_FINOPS")
            else:
                print(f"ALERT_OK: metric={m} val={val:.2f}EUR")
`
  },
  {
    id: 'az3-c6-e3',
    chapter: 6,
    title: 'Linter et ordonnanceur de gabarit Bicep / ARM',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la validité des déclarations et dépendances (dependsOn) d’un gabarit d’Infrastructure as Code Azure et ordonnancer les déploiements.',
    brief: `<p>Dans les modèles Azure Resource Manager (ARM) ou Bicep, la propriété <code>dependsOn</code> garantit que les ressources prérequises (ex: réseau, sous-réseau, carte réseau) sont déployées avant les ressources dépendantes (ex: machine virtuelle).<br><br>
Format d'entrée :<br>
- Déclaration des paramètres :<br>
  <code>PARAM name=&lt;nom&gt; type=&lt;string|int|bool&gt;</code><br>
- Déclaration des ressources :<br>
  <code>RESOURCE name=&lt;nom&gt; type=&lt;type&gt; dependsOn=[&lt;dep1&gt;,&lt;dep2&gt;]</code> (ou <code>dependsOn=[]</code>).<br><br>
Contrôles de cohérence :<br>
1. Dépendance manquante : si une ressource mentionnée dans <code>dependsOn</code> n'est déclarée dans aucune ligne <code>RESOURCE</code> :<br>
   <code>LINT_FAILED: Missing dependency '&lt;nom_dep&gt;' for resource '&lt;nom_res&gt;'</code><br>
2. Dépendance circulaire : si le graphe des dépendances contient une boucle (ex: A dépend de B qui dépend de A) :<br>
   <code>LINT_FAILED: Circular dependency detected involving '&lt;nom_res&gt;'</code><br>
3. Si le gabarit est valide : déterminer l'ordre d'exécution (tri topologique déterministe où chaque ressource intervient après ses dépendances ; en cas d'indépendance mutuelle, tri alphabétique par nom de ressource) :<br>
   <code>LINT_SUCCESS: resources_count=&lt;N&gt; params_count=&lt;M&gt; execution_order=[&lt;res1&gt;, &lt;res2&gt;, ...]</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser le gabarit IaC, détecter les cycles et déterminer l'ordre d'exécution
`,
    hints: [
      'Construire le graphe des dépendances : chaque ressource possède une liste de prérequis.',
      'Utiliser l\'algorithme de Kahn pour le tri topologique : extraire en priorité les ressources sans dépendances non satisfaites.',
      'Trier la file des ressources prêtes par ordre alphabétique pour assurer un résultat déterministe.'
    ],
    examples: [
      {
        stdin: 'PARAM name=env type=string\nRESOURCE name=vnet01 type=Microsoft.Network/virtualNetworks dependsOn=[]\nRESOURCE name=nic01 type=Microsoft.Network/networkInterfaces dependsOn=[vnet01]\nRESOURCE name=vm01 type=Microsoft.Compute/virtualMachines dependsOn=[nic01]',
        expected: 'LINT_SUCCESS: resources_count=3 params_count=1 execution_order=[vnet01, nic01, vm01]',
        note: 'Gabarit valide déployant dans l\'ordre vnet01 puis nic01 puis vm01.'
      }
    ],
    tests: [
      {
        label: 'Gabarit conforme App Service Plan et WebApp',
        stdin: 'PARAM name=location type=string\nPARAM name=sku type=string\nRESOURCE name=appServicePlan type=Microsoft.Web/serverfarms dependsOn=[]\nRESOURCE name=webApp type=Microsoft.Web/sites dependsOn=[appServicePlan]',
        expected: 'LINT_SUCCESS: resources_count=2 params_count=2 execution_order=[appServicePlan, webApp]'
      },
      {
        label: 'Dépendance manquante non déclarée',
        stdin: 'RESOURCE name=vm01 type=Microsoft.Compute/virtualMachines dependsOn=[storageAccount01]',
        expected: 'LINT_FAILED: Missing dependency \'storageAccount01\' for resource \'vm01\''
      },
      {
        label: 'Dépendance circulaire détectée entre deux ressources',
        stdin: 'RESOURCE name=resA type=TypeA dependsOn=[resB]\nRESOURCE name=resB type=TypeB dependsOn=[resA]',
        expected: 'LINT_FAILED: Circular dependency detected involving \'resA\''
      },
      {
        label: 'Ressources indépendantes triées alphabétiquement',
        stdin: 'RESOURCE name=storage01 type=Microsoft.Storage/storageAccounts dependsOn=[]\nRESOURCE name=kv01 type=Microsoft.KeyVault/vaults dependsOn=[]',
        expected: 'LINT_SUCCESS: resources_count=2 params_count=0 execution_order=[kv01, storage01]'
      }
    ],
    solution: `import sys
import re

params = []
resources = {}
deps = {}

for line in sys.stdin.read().splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith("PARAM "):
        props = {}
        for part in line[len("PARAM "):].split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        params.append(props.get("name", "param"))
        
    elif line.startswith("RESOURCE "):
        # Extraction de dependsOn=[...]
        m = re.search(r'dependsOn=\\[([^\\]]*)\\]', line)
        raw_deps = m.group(1).strip() if m else ""
        dep_list = [d.strip() for d in raw_deps.split(",") if d.strip()]
        
        # Nettoyage de la ligne sans dependsOn pour extraire le reste
        clean_line = re.sub(r'dependsOn=\\[[^\\]]*\\]', '', line[len("RESOURCE "):]).strip()
        props = {}
        for part in clean_line.split():
            if "=" in part:
                k, v = part.split("=", 1)
                props[k] = v
        rname = props.get("name")
        rtype = props.get("type")
        if rname:
            resources[rname] = rtype
            deps[rname] = dep_list

# 1. Contrôle des dépendances manquantes
missing_found = False
for rname, r_deps in deps.items():
    for d in r_deps:
        if d not in resources:
            print(f"LINT_FAILED: Missing dependency '{d}' for resource '{rname}'")
            missing_found = True
            break
    if missing_found:
        break

if not missing_found:
    # 2. Tri topologique (Algorithme de Kahn)
    nodes = list(resources.keys())
    in_degree = {u: len(deps[u]) for u in nodes}
    adj = {u: [] for u in nodes}
    for u in nodes:
        for prereq in deps[u]:
            adj[prereq].append(u)
            
    ready = sorted([u for u in nodes if in_degree[u] == 0])
    order = []
    
    while ready:
        curr = ready.pop(0)
        order.append(curr)
        for dependent in sorted(adj[curr]):
            in_degree[dependent] -= 1
            if in_degree[dependent] == 0:
                ready.append(dependent)
        ready.sort()
        
    if len(order) < len(nodes):
        # Cycle détecté
        unresolved = [u for u in nodes if u not in order]
        first_cycle_node = unresolved[0]
        print(f"LINT_FAILED: Circular dependency detected involving '{first_cycle_node}'")
    else:
        order_str = ", ".join(order)
        print(f"LINT_SUCCESS: resources_count={len(nodes)} params_count={len(params)} execution_order=[{order_str}]")
`
  }
];
