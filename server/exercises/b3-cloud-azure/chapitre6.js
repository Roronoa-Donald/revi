'use strict';

module.exports = [
  {
    "id": "az3-c6-e1",
    "chapter": 6,
    "title": "Interpréteur de requêtes Log Analytics KQL",
    "level": "n1",
    "language": "analyse",
    "goal": "Exécuter un pipeline de requêtes KQL (where, summarize, order by, take) sur un jeu de journaux d’événements Azure.",
    "brief": "<p>Le langage KQL (Kusto Query Language) est le standard d'interrogation analytique d'Azure Monitor, Log Analytics et Microsoft Sentinel.<br><br>\nFormat d'entrée :<br>\nUn flux d'événements Azure au format :<br>\n<code>EVENT rg=&lt;rg&gt; op=&lt;operation&gt; status=&lt;Success|Failed&gt; duration_ms=&lt;int&gt;</code><br>\nSuivi d'une instruction KQL sur la dernière ligne :<br>\n<code>KQL where status == \"&lt;Success|Failed&gt;\" | summarize count() by op | order by count_ desc | take &lt;N&gt;</code><br><br>\nComportement du moteur KQL :<br>\n1. Filtrer les événements où <code>status</code> correspond à la valeur demandée.<br>\n2. Agréger les occurrences par <code>op</code> (opération), produisant un champ <code>count_</code>.<br>\n3. Trier les résultats par <code>count_</code> décroissant (en cas d'égalité, tri alphabétique croissant sur <code>op</code>).<br>\n4. Conserver les <code>N</code> premières lignes (opérateur <code>take</code>).<br><br>\nFormat de sortie attendu :<br>\nEn-tête : <code>op | count_</code><br>\nChaque ligne : <code>&lt;op&gt; | &lt;count_&gt;</code><br>\n(Si aucun événement ne correspond : afficher uniquement l'en-tête).</p>",
    "starter": "# Grille d'analyse (az3-c6-e1) — Interpréteur de requêtes Log Analytics KQL\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Requête sur les opérations de sécurité en échec]\n# Données : EVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=200\n# Données : EVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=220\n# Données : EVENT rg=rg-sec op=RevokeKey status=Failed duration_ms=210\n# Données : EVENT rg=rg-sec op=RotateSecret status=Failed duration_ms=180\n# Données : KQL where status == \"Failed\" | summarize count() by op | order by count_ desc | take 2\nA_COMPLETER\n\n[Cas 2 — Requête sur les succès avec take 3]\n# Données : EVENT rg=rg-prod op=StartVM status=Success duration_ms=100\n# Données : EVENT rg=rg-prod op=StartVM status=Success duration_ms=120\n# Données : EVENT rg=rg-prod op=AttachDisk status=Success duration_ms=250\n# Données : EVENT rg=rg-prod op=CreateNic status=Success duration_ms=180\n# Données : KQL where status == \"Success\" | summarize count() by op | order by count_ desc | take 3\nA_COMPLETER\n\n[Cas 3 — Aucun événement ne correspondant au filtre]\n# Données : EVENT rg=rg-prod op=StartVM status=Success duration_ms=100\n# Données : KQL where status == \"Failed\" | summarize count() by op | order by count_ desc | take 5\nA_COMPLETER\n",
    "hints": [
      "Stocker les événements dans une liste de dictionnaires.",
      "Extraire le filtre status et la limite N depuis la ligne de commande KQL avec re ou split.",
      "Utiliser collections.Counter pour compter les opérations filtrées."
    ],
    "examples": [
      {
        "stdin": "EVENT rg=rg-prod op=RestartVM status=Failed duration_ms=450\nEVENT rg=rg-prod op=DeleteDisk status=Failed duration_ms=1200\nEVENT rg=rg-prod op=RestartVM status=Failed duration_ms=300\nEVENT rg=rg-dev op=RestartVM status=Success duration_ms=150\nKQL where status == \"Failed\" | summarize count() by op | order by count_ desc | take 2",
        "expected": "op | count_\nRestartVM | 2\nDeleteDisk | 1",
        "note": "Filtrage des événements en échec, agrégation par opération et sélection des 2 premières."
      }
    ],
    "tests": [
      {
        "label": "Requête sur les opérations de sécurité en échec",
        "stdin": "cas:1",
        "expected": "op | count_\nRevokeKey | 3\nRotateSecret | 1"
      },
      {
        "label": "Requête sur les succès avec take 3",
        "stdin": "cas:2",
        "expected": "op | count_\nStartVM | 2\nAttachDisk | 1\nCreateNic | 1"
      },
      {
        "label": "Aucun événement ne correspondant au filtre",
        "stdin": "cas:3",
        "expected": "op | count_"
      }
    ],
    "solution": "[Exemple]\nop | count_\nRestartVM | 2\nDeleteDisk | 1\n\n[Cas 1 — Requête sur les opérations de sécurité en échec]\nop | count_\nRevokeKey | 3\nRotateSecret | 1\n\n[Cas 2 — Requête sur les succès avec take 3]\nop | count_\nStartVM | 2\nAttachDisk | 1\nCreateNic | 1\n\n[Cas 3 — Aucun événement ne correspondant au filtre]\nop | count_"
  },
  {
    "id": "az3-c6-e2",
    "chapter": 6,
    "title": "Gestionnaire d'alertes Azure Monitor et suivi budgétaire",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer en temps réel des règles d’alerte sur métriques d’infrastructure (CPU) et surveiller les seuils d’engagement budgétaire Cost Management.",
    "brief": "<p>Azure Monitor déclenche des alertes métriques pour automatiser les remédiations, tandis qu'Azure Cost Management avertit les équipes lorsque les dépenses réelles ou prévisionnelles franchissent des pourcentages clés du budget mensuel.<br><br>\nFormat d'entrée :<br>\n1. Définition du budget mensuel :<br>\n   <code>BUDGET amount=&lt;float&gt; currency=EUR</code><br>\n2. Déclaration des règles d'alerte :<br>\n   - <code>ALERT_RULE metric=CPU threshold=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>\n   - <code>ALERT_RULE metric=SPEND_ACTUAL threshold_pct=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>\n   - <code>ALERT_RULE metric=SPEND_FORECAST threshold_pct=&lt;int&gt; severity=&lt;Sev0..Sev4&gt;</code><br>\n3. Enregistrements télémétriques :<br>\n   <code>RECORD metric=&lt;METRIC&gt; value=&lt;float&gt;</code><br><br>\nRègles de déclenchement :<br>\n- Pour <code>CPU</code> :<br>\n  - Si <code>value &gt;= threshold</code> :<br>\n    <code>ALERT_FIRED: metric=CPU val=&lt;value:.1f&gt;% threshold=&lt;threshold&gt;% severity=&lt;SevX&gt; action=TRIGGER_ACTION_GROUP</code><br>\n  - Sinon : <code>ALERT_OK: metric=CPU val=&lt;value:.1f&gt;%</code><br>\n- Pour <code>SPEND_ACTUAL</code> :<br>\n  Le seuil en euros vaut <code>amount * (threshold_pct / 100)</code>.<br>\n  - Si <code>value &gt;= seuil_euros</code> :<br>\n    <code>ALERT_FIRED: metric=SPEND_ACTUAL val=&lt;value:.2f&gt;EUR threshold=&lt;seuil_euros:.2f&gt;EUR (pct=&lt;threshold_pct&gt;%) severity=&lt;SevX&gt; action=NOTIFY_FINOPS</code><br>\n  - Sinon : <code>ALERT_OK: metric=SPEND_ACTUAL val=&lt;value:.2f&gt;EUR</code><br>\n- Pour <code>SPEND_FORECAST</code> :<br>\n  Le seuil en euros vaut <code>amount * (threshold_pct / 100)</code>.<br>\n  - Si <code>value &gt;= seuil_euros</code> :<br>\n    <code>ALERT_FIRED: metric=SPEND_FORECAST val=&lt;value:.2f&gt;EUR threshold=&lt;seuil_euros:.2f&gt;EUR (pct=&lt;threshold_pct&gt;%) severity=&lt;SevX&gt; action=NOTIFY_FINOPS</code><br>\n  - Sinon : <code>ALERT_OK: metric=SPEND_FORECAST val=&lt;value:.2f&gt;EUR</code></p>",
    "starter": "# Grille d'analyse (az3-c6-e2) — Gestionnaire d'alertes Azure Monitor et suivi budgétaire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — CPU au-dessus du seuil et dépense réelle sous le seuil]\n# Données : BUDGET amount=1200 currency=EUR\n# Données : ALERT_RULE metric=CPU threshold=75 severity=Sev1\n# Données : ALERT_RULE metric=SPEND_ACTUAL threshold_pct=85 severity=Sev2\n# Données : RECORD metric=CPU value=92.0\n# Données : RECORD metric=SPEND_ACTUAL value=800.0\nA_COMPLETER\n\n[Cas 2 — Dépassement prévisionnel 100% et dépense réelle à 90%]\n# Données : BUDGET amount=500 currency=EUR\n# Données : ALERT_RULE metric=SPEND_ACTUAL threshold_pct=90 severity=Sev1\n# Données : ALERT_RULE metric=SPEND_FORECAST threshold_pct=100 severity=Sev1\n# Données : RECORD metric=SPEND_ACTUAL value=460.0\n# Données : RECORD metric=SPEND_FORECAST value=550.0\nA_COMPLETER\n\n[Cas 3 — Toutes les métriques conformes sous les seuils]\n# Données : BUDGET amount=2000 currency=EUR\n# Données : ALERT_RULE metric=CPU threshold=90 severity=Sev0\n# Données : RECORD metric=CPU value=45.0\nA_COMPLETER\n",
    "hints": [
      "Calculer les seuils budgétaires effectifs en multipliant le montant du budget par threshold_pct / 100.",
      "Associer chaque métrique à sa sévérité et formater rigoureusement les messages d'alerte."
    ],
    "examples": [
      {
        "stdin": "BUDGET amount=1000 currency=EUR\nALERT_RULE metric=CPU threshold=80 severity=Sev1\nALERT_RULE metric=SPEND_ACTUAL threshold_pct=80 severity=Sev2\nRECORD metric=CPU value=85.5\nRECORD metric=SPEND_ACTUAL value=750.0",
        "expected": "ALERT_FIRED: metric=CPU val=85.5% threshold=80% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=750.00EUR",
        "note": "Alerte CPU déclenchée à 85.5% et dépense sous le seuil des 80% (800 EUR)."
      }
    ],
    "tests": [
      {
        "label": "CPU au-dessus du seuil et dépense réelle sous le seuil",
        "stdin": "cas:1",
        "expected": "ALERT_FIRED: metric=CPU val=92.0% threshold=75% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=800.00EUR"
      },
      {
        "label": "Dépassement prévisionnel 100% et dépense réelle à 90%",
        "stdin": "cas:2",
        "expected": "ALERT_FIRED: metric=SPEND_ACTUAL val=460.00EUR threshold=450.00EUR (pct=90%) severity=Sev1 action=NOTIFY_FINOPS\nALERT_FIRED: metric=SPEND_FORECAST val=550.00EUR threshold=500.00EUR (pct=100%) severity=Sev1 action=NOTIFY_FINOPS"
      },
      {
        "label": "Toutes les métriques conformes sous les seuils",
        "stdin": "cas:3",
        "expected": "ALERT_OK: metric=CPU val=45.0%"
      }
    ],
    "solution": "[Exemple]\nALERT_FIRED: metric=CPU val=85.5% threshold=80% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=750.00EUR\n\n[Cas 1 — CPU au-dessus du seuil et dépense réelle sous le seuil]\nALERT_FIRED: metric=CPU val=92.0% threshold=75% severity=Sev1 action=TRIGGER_ACTION_GROUP\nALERT_OK: metric=SPEND_ACTUAL val=800.00EUR\n\n[Cas 2 — Dépassement prévisionnel 100% et dépense réelle à 90%]\nALERT_FIRED: metric=SPEND_ACTUAL val=460.00EUR threshold=450.00EUR (pct=90%) severity=Sev1 action=NOTIFY_FINOPS\nALERT_FIRED: metric=SPEND_FORECAST val=550.00EUR threshold=500.00EUR (pct=100%) severity=Sev1 action=NOTIFY_FINOPS\n\n[Cas 3 — Toutes les métriques conformes sous les seuils]\nALERT_OK: metric=CPU val=45.0%"
  },
  {
    "id": "az3-c6-e3",
    "chapter": 6,
    "title": "Linter et ordonnanceur de gabarit Bicep / ARM",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la validité des déclarations et dépendances (dependsOn) d’un gabarit d’Infrastructure as Code Azure et ordonnancer les déploiements.",
    "brief": "<p>Dans les modèles Azure Resource Manager (ARM) ou Bicep, la propriété <code>dependsOn</code> garantit que les ressources prérequises (ex: réseau, sous-réseau, carte réseau) sont déployées avant les ressources dépendantes (ex: machine virtuelle).<br><br>\nFormat d'entrée :<br>\n- Déclaration des paramètres :<br>\n  <code>PARAM name=&lt;nom&gt; type=&lt;string|int|bool&gt;</code><br>\n- Déclaration des ressources :<br>\n  <code>RESOURCE name=&lt;nom&gt; type=&lt;type&gt; dependsOn=[&lt;dep1&gt;,&lt;dep2&gt;]</code> (ou <code>dependsOn=[]</code>).<br><br>\nContrôles de cohérence :<br>\n1. Dépendance manquante : si une ressource mentionnée dans <code>dependsOn</code> n'est déclarée dans aucune ligne <code>RESOURCE</code> :<br>\n   <code>LINT_FAILED: Missing dependency '&lt;nom_dep&gt;' for resource '&lt;nom_res&gt;'</code><br>\n2. Dépendance circulaire : si le graphe des dépendances contient une boucle (ex: A dépend de B qui dépend de A) :<br>\n   <code>LINT_FAILED: Circular dependency detected involving '&lt;nom_res&gt;'</code><br>\n3. Si le gabarit est valide : déterminer l'ordre d'exécution (tri topologique déterministe où chaque ressource intervient après ses dépendances ; en cas d'indépendance mutuelle, tri alphabétique par nom de ressource) :<br>\n   <code>LINT_SUCCESS: resources_count=&lt;N&gt; params_count=&lt;M&gt; execution_order=[&lt;res1&gt;, &lt;res2&gt;, ...]</code></p>",
    "starter": "# Grille d'analyse (az3-c6-e3) — Linter et ordonnanceur de gabarit Bicep / ARM\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Gabarit conforme App Service Plan et WebApp]\n# Données : PARAM name=location type=string\n# Données : PARAM name=sku type=string\n# Données : RESOURCE name=appServicePlan type=Microsoft.Web/serverfarms dependsOn=[]\n# Données : RESOURCE name=webApp type=Microsoft.Web/sites dependsOn=[appServicePlan]\nA_COMPLETER\n\n[Cas 2 — Dépendance manquante non déclarée]\n# Données : RESOURCE name=vm01 type=Microsoft.Compute/virtualMachines dependsOn=[storageAccount01]\nA_COMPLETER\n\n[Cas 3 — Dépendance circulaire détectée entre deux ressources]\n# Données : RESOURCE name=resA type=TypeA dependsOn=[resB]\n# Données : RESOURCE name=resB type=TypeB dependsOn=[resA]\nA_COMPLETER\n\n[Cas 4 — Ressources indépendantes triées alphabétiquement]\n# Données : RESOURCE name=storage01 type=Microsoft.Storage/storageAccounts dependsOn=[]\n# Données : RESOURCE name=kv01 type=Microsoft.KeyVault/vaults dependsOn=[]\nA_COMPLETER\n",
    "hints": [
      "Construire le graphe des dépendances : chaque ressource possède une liste de prérequis.",
      "Utiliser l'algorithme de Kahn pour le tri topologique : extraire en priorité les ressources sans dépendances non satisfaites.",
      "Trier la file des ressources prêtes par ordre alphabétique pour assurer un résultat déterministe."
    ],
    "examples": [
      {
        "stdin": "PARAM name=env type=string\nRESOURCE name=vnet01 type=Microsoft.Network/virtualNetworks dependsOn=[]\nRESOURCE name=nic01 type=Microsoft.Network/networkInterfaces dependsOn=[vnet01]\nRESOURCE name=vm01 type=Microsoft.Compute/virtualMachines dependsOn=[nic01]",
        "expected": "LINT_SUCCESS: resources_count=3 params_count=1 execution_order=[vnet01, nic01, vm01]",
        "note": "Gabarit valide déployant dans l'ordre vnet01 puis nic01 puis vm01."
      }
    ],
    "tests": [
      {
        "label": "Gabarit conforme App Service Plan et WebApp",
        "stdin": "cas:1",
        "expected": "LINT_SUCCESS: resources_count=2 params_count=2 execution_order=[appServicePlan, webApp]"
      },
      {
        "label": "Dépendance manquante non déclarée",
        "stdin": "cas:2",
        "expected": "LINT_FAILED: Missing dependency 'storageAccount01' for resource 'vm01'"
      },
      {
        "label": "Dépendance circulaire détectée entre deux ressources",
        "stdin": "cas:3",
        "expected": "LINT_FAILED: Circular dependency detected involving 'resA'"
      },
      {
        "label": "Ressources indépendantes triées alphabétiquement",
        "stdin": "cas:4",
        "expected": "LINT_SUCCESS: resources_count=2 params_count=0 execution_order=[kv01, storage01]"
      }
    ],
    "solution": "[Exemple]\nLINT_SUCCESS: resources_count=3 params_count=1 execution_order=[vnet01, nic01, vm01]\n\n[Cas 1 — Gabarit conforme App Service Plan et WebApp]\nLINT_SUCCESS: resources_count=2 params_count=2 execution_order=[appServicePlan, webApp]\n\n[Cas 2 — Dépendance manquante non déclarée]\nLINT_FAILED: Missing dependency 'storageAccount01' for resource 'vm01'\n\n[Cas 3 — Dépendance circulaire détectée entre deux ressources]\nLINT_FAILED: Circular dependency detected involving 'resA'\n\n[Cas 4 — Ressources indépendantes triées alphabétiquement]\nLINT_SUCCESS: resources_count=2 params_count=0 execution_order=[kv01, storage01]"
  }
];
