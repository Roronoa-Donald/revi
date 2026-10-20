'use strict';

module.exports = [
  {
    "id": "cc3-c2-e1",
    "chapter": 2,
    "title": "Cartographe d’équivalences de services CSP (AWS, Azure, GCP)",
    "level": "n1",
    "language": "analyse",
    "goal": "Associer les dénominations commerciales des services entre les trois géants hyperscalers selon leur catégorie fonctionnelle.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nCatalogue officiel de correspondance :<br>\n- <code>COMPUTE</code> : AWS=<code>EC2</code>, Azure=<code>Virtual_Machines</code>, GCP=<code>Compute_Engine</code><br>\n- <code>STORAGE</code> : AWS=<code>S3</code>, Azure=<code>Blob_Storage</code>, GCP=<code>Cloud_Storage</code><br>\n- <code>RELATIONAL_DB</code> : AWS=<code>RDS</code>, Azure=<code>Azure_SQL</code>, GCP=<code>Cloud_SQL</code><br>\n- <code>SERVERLESS</code> : AWS=<code>Lambda</code>, Azure=<code>Azure_Functions</code>, GCP=<code>Cloud_Functions</code><br>\n- <code>CONTAINER_ORCH</code> : AWS=<code>EKS</code>, Azure=<code>AKS</code>, GCP=<code>GKE</code><br>\n- <code>MESSAGING</code> : AWS=<code>SQS</code>, Azure=<code>Service_Bus</code>, GCP=<code>Cloud_PubSub</code><br><br>\nSi le service source est répertorié :<br>\n<code>EQUIVALENCE: &lt;csp_src&gt;:&lt;service&gt; -&gt; &lt;csp_dst&gt;:&lt;nom_dst&gt; (CATEGORIE=&lt;CAT&gt;)</code><br>\nSinon :<br>\n<code>EQUIVALENCE: &lt;csp_src&gt;:&lt;service&gt; -&gt; INCONNU</code></p>",
    "starter": "# Grille d'analyse (cc3-c2-e1) — Cartographe d’équivalences de services CSP (AWS, Azure, GCP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fonctions Serverless AWS vers Azure]\n# Données : MAPPING csp_src=AWS csp_dst=Azure service=Lambda\nA_COMPLETER\n\n[Cas 2 — Kubernetes managé GCP vers AWS]\n# Données : MAPPING csp_src=GCP csp_dst=AWS service=GKE\nA_COMPLETER\n\n[Cas 3 — Base de données managée Azure vers GCP]\n# Données : MAPPING csp_src=Azure csp_dst=GCP service=Azure_SQL\nA_COMPLETER\n",
    "hints": [
      "Stocker le tableau sous forme d’un dictionnaire indexé par catégorie.",
      "Comparer les noms de manière exacte (sensible à la casse)."
    ],
    "examples": [
      {
        "stdin": "MAPPING csp_src=AWS csp_dst=GCP service=S3\nMAPPING csp_src=Azure csp_dst=AWS service=Virtual_Machines\nMAPPING csp_src=AWS csp_dst=Azure service=OpenSearch",
        "expected": "EQUIVALENCE: AWS:S3 -> GCP:Cloud_Storage (CATEGORIE=STORAGE)\nEQUIVALENCE: Azure:Virtual_Machines -> AWS:EC2 (CATEGORIE=COMPUTE)\nEQUIVALENCE: AWS:OpenSearch -> INCONNU",
        "note": "S3 correspond à Cloud Storage sous GCP, et Virtual Machines à EC2 sous AWS."
      }
    ],
    "tests": [
      {
        "label": "Fonctions Serverless AWS vers Azure",
        "stdin": "cas:1",
        "expected": "EQUIVALENCE: AWS:Lambda -> Azure:Azure_Functions (CATEGORIE=SERVERLESS)"
      },
      {
        "label": "Kubernetes managé GCP vers AWS",
        "stdin": "cas:2",
        "expected": "EQUIVALENCE: GCP:GKE -> AWS:EKS (CATEGORIE=CONTAINER_ORCH)"
      },
      {
        "label": "Base de données managée Azure vers GCP",
        "stdin": "cas:3",
        "expected": "EQUIVALENCE: Azure:Azure_SQL -> GCP:Cloud_SQL (CATEGORIE=RELATIONAL_DB)"
      }
    ],
    "solution": "[Exemple]\nEQUIVALENCE: AWS:S3 -> GCP:Cloud_Storage (CATEGORIE=STORAGE)\nEQUIVALENCE: Azure:Virtual_Machines -> AWS:EC2 (CATEGORIE=COMPUTE)\nEQUIVALENCE: AWS:OpenSearch -> INCONNU\n\n[Cas 1 — Fonctions Serverless AWS vers Azure]\nEQUIVALENCE: AWS:Lambda -> Azure:Azure_Functions (CATEGORIE=SERVERLESS)\n\n[Cas 2 — Kubernetes managé GCP vers AWS]\nEQUIVALENCE: GCP:GKE -> AWS:EKS (CATEGORIE=CONTAINER_ORCH)\n\n[Cas 3 — Base de données managée Azure vers GCP]\nEQUIVALENCE: Azure:Azure_SQL -> GCP:Cloud_SQL (CATEGORIE=RELATIONAL_DB)"
  },
  {
    "id": "cc3-c2-e2",
    "chapter": 2,
    "title": "Calculateur de SLA composé et budget d’erreur annuel",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la disponibilité globale résultante d’une chaîne de services Cloud (série) ou de composants redondés (parallèle) et son indisponibilité annuelle.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas...&gt;</code>.<br>\nChaque SLA est exprimé en pourcentage (ex: <code>99.9,99.95</code>), converti en décimal $p_i = s_i / 100$.<br>\nFormules :<br>\n- <strong>SERIE</strong> (chaîne de dépendances directes) : $P_{total} = \\prod_{i} p_i$<br>\n- <strong>PARALLELE</strong> (redondance active / bascule automatique) : $P_{total} = 1 - \\prod_{i} (1 - p_i)$<br><br>\nCalcul de l’indisponibilité annuelle (base 365 jours = 525 600 minutes) :<br>\n$Downtime = 525600 \\times (1 - P_{total})$ (en minutes).<br>\nAfficher :<br>\n<code>SLA: MODE=&lt;MODE&gt; -&gt; DISPONIBILITE=&lt;pct:.4f&gt;% | INDISPONIBILITE=&lt;downtime:.2f&gt; min/an</code></p>",
    "starter": "# Grille d'analyse (cc3-c2-e2) — Calculateur de SLA composé et budget d’erreur annuel\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chaîne trois tiers Web-App-BDD en série]\n# Données : CALCUL_SLA MODE=SERIE SLAS=99.95,99.9,99.99\nA_COMPLETER\n\n[Cas 2 — Deux passerelles API redondées en parallèle]\n# Données : CALCUL_SLA MODE=PARALLELE SLAS=99.95,99.95\nA_COMPLETER\n\n[Cas 3 — Composant unique]\n# Données : CALCUL_SLA MODE=SERIE SLAS=99.99\nA_COMPLETER\n",
    "hints": [
      "En série, le SLA global est toujours STRICTEMENT INFÉRIEUR au plus faible SLA unitaire.",
      "En parallèle, la redondance réduit drastiquement la probabilité de panne simultanée."
    ],
    "examples": [
      {
        "stdin": "CALCUL_SLA MODE=SERIE SLAS=99.9,99.95\nCALCUL_SLA MODE=PARALLELE SLAS=99.9,99.9",
        "expected": "SLA: MODE=SERIE -> DISPONIBILITE=99.8501% | INDISPONIBILITE=788.14 min/an\nSLA: MODE=PARALLELE -> DISPONIBILITE=99.9999% | INDISPONIBILITE=0.53 min/an",
        "note": "Une chaîne en série de deux services 3 neufs et 3.5 neufs tombe à 99.85%. Deux VM à 99.9% en parallèle montent à 99.9999% (moins d'une minute d'interruption)."
      }
    ],
    "tests": [
      {
        "label": "Chaîne trois tiers Web-App-BDD en série",
        "stdin": "cas:1",
        "expected": "SLA: MODE=SERIE -> DISPONIBILITE=99.8401% | INDISPONIBILITE=840.62 min/an"
      },
      {
        "label": "Deux passerelles API redondées en parallèle",
        "stdin": "cas:2",
        "expected": "SLA: MODE=PARALLELE -> DISPONIBILITE=100.0000% | INDISPONIBILITE=0.13 min/an"
      },
      {
        "label": "Composant unique",
        "stdin": "cas:3",
        "expected": "SLA: MODE=SERIE -> DISPONIBILITE=99.9900% | INDISPONIBILITE=52.56 min/an"
      }
    ],
    "solution": "[Exemple]\nSLA: MODE=SERIE -> DISPONIBILITE=99.8501% | INDISPONIBILITE=788.14 min/an\nSLA: MODE=PARALLELE -> DISPONIBILITE=99.9999% | INDISPONIBILITE=0.53 min/an\n\n[Cas 1 — Chaîne trois tiers Web-App-BDD en série]\nSLA: MODE=SERIE -> DISPONIBILITE=99.8401% | INDISPONIBILITE=840.62 min/an\n\n[Cas 2 — Deux passerelles API redondées en parallèle]\nSLA: MODE=PARALLELE -> DISPONIBILITE=100.0000% | INDISPONIBILITE=0.13 min/an\n\n[Cas 3 — Composant unique]\nSLA: MODE=SERIE -> DISPONIBILITE=99.9900% | INDISPONIBILITE=52.56 min/an"
  },
  {
    "id": "cc3-c2-e3",
    "chapter": 2,
    "title": "Simulateur de passerelle multi-cloud et routage dynamique",
    "level": "n3",
    "language": "analyse",
    "goal": "Aiguiller dynamiquement les flux applicatifs vers le meilleur point de terminaison Cloud sain selon la stratégie opérationnelle choisie.",
    "brief": "<p>Le script enregistre d'abord une série d'endpoints, puis évalue les ordres de routage :<br>\n<code>ENDPOINT csp=&lt;nom&gt; latence=&lt;ms&gt; sante=&lt;UP|DOWN&gt; cout=&lt;usd&gt;</code><br>\n<code>ROUTE strategie=&lt;MIN_LATENCY|MIN_COST|FAILOVER&gt;</code>.<br><br>\nSeuls les endpoints avec <code>sante=UP</code> sont éligibles.<br>\nStratégies :<br>\n- <code>MIN_LATENCY</code> : l’endpoint sain avec la latence la plus faible. En cas d’égalité, départager par le coût le plus faible, puis l’ordre d’apparition.<br>\n- <code>MIN_COST</code> : l’endpoint sain avec le coût le plus faible. En cas d’égalité, départager par la latence la plus faible, puis l’ordre d’apparition.<br>\n- <code>FAILOVER</code> : choisir le premier endpoint sain rencontré dans l'ordre de déclaration.<br><br>\nAfficher :<br>\n<code>ROUTAGE: STRATEGIE=&lt;strat&gt; -&gt; CSP_CHOISI=&lt;csp&gt; (latence=&lt;ms&gt;ms, cout=$&lt;cout:.4f&gt;)</code><br>\nOu si aucun endpoint n’est UP :<br>\n<code>ROUTAGE: STRATEGIE=&lt;strat&gt; -&gt; AUCUN_ENDPOINT_DISPONIBLE</code></p>",
    "starter": "# Grille d'analyse (cc3-c2-e3) — Simulateur de passerelle multi-cloud et routage dynamique\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Basculement après panne du nœud primaire]\n# Données : ENDPOINT csp=AWS_primary latence=10 sante=DOWN cout=0.0020\n# Données : ENDPOINT csp=Azure_backup latence=25 sante=UP cout=0.0025\n# Données : ROUTE strategie=FAILOVER\nA_COMPLETER\n\n[Cas 2 — Tous les nœuds hors service]\n# Données : ENDPOINT csp=AWS_dc1 latence=12 sante=DOWN cout=0.0020\n# Données : ENDPOINT csp=GCP_dc2 latence=18 sante=DOWN cout=0.0030\n# Données : ROUTE strategie=MIN_LATENCY\nA_COMPLETER\n\n[Cas 3 — Égalité de latence résolue par le coût]\n# Données : ENDPOINT csp=CSP_A latence=20 sante=UP cout=0.0050\n# Données : ENDPOINT csp=CSP_B latence=20 sante=UP cout=0.0030\n# Données : ROUTE strategie=MIN_LATENCY\nA_COMPLETER\n",
    "hints": [
      "Garder la liste ordonnée des déclarations d’endpoints.",
      "Filtrer impérativement les hôtes DOWN avant d'appliquer la stratégie."
    ],
    "examples": [
      {
        "stdin": "ENDPOINT csp=AWS_eu_west latence=28 sante=UP cout=0.0040\nENDPOINT csp=GCP_europe latence=19 sante=UP cout=0.0065\nENDPOINT csp=Azure_fr latence=15 sante=DOWN cout=0.0035\nROUTE strategie=MIN_LATENCY\nROUTE strategie=MIN_COST\nROUTE strategie=FAILOVER",
        "expected": "ROUTAGE: STRATEGIE=MIN_LATENCY -> CSP_CHOISI=GCP_europe (latence=19ms, cout=$0.0065)\nROUTAGE: STRATEGIE=MIN_COST -> CSP_CHOISI=AWS_eu_west (latence=28ms, cout=$0.0040)\nROUTAGE: STRATEGIE=FAILOVER -> CSP_CHOISI=AWS_eu_west (latence=28ms, cout=$0.0040)",
        "note": "Azure_fr est ignoré car en état DOWN. GCP l'emporte en latence, AWS en coût."
      }
    ],
    "tests": [
      {
        "label": "Basculement après panne du nœud primaire",
        "stdin": "cas:1",
        "expected": "ROUTAGE: STRATEGIE=FAILOVER -> CSP_CHOISI=Azure_backup (latence=25ms, cout=$0.0025)"
      },
      {
        "label": "Tous les nœuds hors service",
        "stdin": "cas:2",
        "expected": "ROUTAGE: STRATEGIE=MIN_LATENCY -> AUCUN_ENDPOINT_DISPONIBLE"
      },
      {
        "label": "Égalité de latence résolue par le coût",
        "stdin": "cas:3",
        "expected": "ROUTAGE: STRATEGIE=MIN_LATENCY -> CSP_CHOISI=CSP_B (latence=20ms, cout=$0.0030)"
      }
    ],
    "solution": "[Exemple]\nROUTAGE: STRATEGIE=MIN_LATENCY -> CSP_CHOISI=GCP_europe (latence=19ms, cout=$0.0065)\nROUTAGE: STRATEGIE=MIN_COST -> CSP_CHOISI=AWS_eu_west (latence=28ms, cout=$0.0040)\nROUTAGE: STRATEGIE=FAILOVER -> CSP_CHOISI=AWS_eu_west (latence=28ms, cout=$0.0040)\n\n[Cas 1 — Basculement après panne du nœud primaire]\nROUTAGE: STRATEGIE=FAILOVER -> CSP_CHOISI=Azure_backup (latence=25ms, cout=$0.0025)\n\n[Cas 2 — Tous les nœuds hors service]\nROUTAGE: STRATEGIE=MIN_LATENCY -> AUCUN_ENDPOINT_DISPONIBLE\n\n[Cas 3 — Égalité de latence résolue par le coût]\nROUTAGE: STRATEGIE=MIN_LATENCY -> CSP_CHOISI=CSP_B (latence=20ms, cout=$0.0030)"
  }
];
