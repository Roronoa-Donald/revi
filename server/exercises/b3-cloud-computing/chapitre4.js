'use strict';

module.exports = [
  {
    "id": "cc3-c4-e1",
    "chapter": 4,
    "title": "Calculateur d’indicateur d’efficacité énergétique PUE et DCiE",
    "level": "n1",
    "language": "analyse",
    "goal": "Mesurer la proportion d’énergie gaspillée dans le refroidissement et la distribution électrique d’un datacenter face à l’énergie utile consommée par les serveurs IT.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nFormules standards Green IT :<br>\n- $PUE = E_{totale} / E_{IT}$ (arrondi à 2 décimales)<br>\n- $DCiE = (E_{IT} / E_{totale}) \\times 100$ (Data Center Infrastructure Efficiency en %, arrondi à 1 décimale)<br>\n- $Pertes = E_{totale} - E_{IT}$ (énergie consommée par la climatisation, éclairage, onduleurs)<br><br>\nÉvaluation de l'efficacité :<br>\n- Si $PUE &lt; 1.20$ : <code>NOTE=EXCELLENT</code> (standard hyperscale moderne)<br>\n- Sinon si $PUE &lt; 1.50$ : <code>NOTE=BON</code><br>\n- Sinon si $PUE &lt; 2.00$ : <code>NOTE=MOYEN</code><br>\n- Sinon : <code>NOTE=INEFFICACE</code><br><br>\nAfficher :<br>\n<code>PUE_AUDIT: nom=&lt;nom&gt; | PUE=&lt;pue:.2f&gt; | DCiE=&lt;dcie:.1f&gt;% | PERTES=&lt;pertes&gt; kWh | NOTE=&lt;NOTE&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c4-e1) — Calculateur d’indicateur d’efficacité énergétique PUE et DCiE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Datacenter régional moderne certifié]\n# Données : DATACENTER nom=dc_lyon E_TOTALE_KWH=140000 E_IT_KWH=100000\nA_COMPLETER\n\n[Cas 2 — Datacenter moyen vieillissant]\n# Données : DATACENTER nom=dc_legacy E_TOTALE_KWH=180000 E_IT_KWH=100000\nA_COMPLETER\n\n[Cas 3 — Hyperscaler ultra-optimisé en free-cooling]\n# Données : DATACENTER nom=google_hamina E_TOTALE_KWH=108000 E_IT_KWH=100000\nA_COMPLETER\n",
    "hints": [
      "Le PUE idéal théorique est 1.0 (100% de l’énergie va aux serveurs informatiques).",
      "Le DCiE est simplement l’inverse mathématique du PUE multiplié par 100."
    ],
    "examples": [
      {
        "stdin": "DATACENTER nom=hyperscale_nordic E_TOTALE_KWH=112000 E_IT_KWH=100000\nDATACENTER nom=salle_serveur_locale E_TOTALE_KWH=250000 E_IT_KWH=100000",
        "expected": "PUE_AUDIT: nom=hyperscale_nordic | PUE=1.12 | DCiE=89.3% | PERTES=12000 kWh | NOTE=EXCELLENT\nPUE_AUDIT: nom=salle_serveur_locale | PUE=2.50 | DCiE=40.0% | PERTES=150000 kWh | NOTE=INEFFICACE",
        "note": "Une salle serveur traditionnelle gaspille souvent 1.5 fois plus d’énergie en climatisation que pour les serveurs eux-mêmes."
      }
    ],
    "tests": [
      {
        "label": "Datacenter régional moderne certifié",
        "stdin": "cas:1",
        "expected": "PUE_AUDIT: nom=dc_lyon | PUE=1.40 | DCiE=71.4% | PERTES=40000 kWh | NOTE=BON"
      },
      {
        "label": "Datacenter moyen vieillissant",
        "stdin": "cas:2",
        "expected": "PUE_AUDIT: nom=dc_legacy | PUE=1.80 | DCiE=55.6% | PERTES=80000 kWh | NOTE=MOYEN"
      },
      {
        "label": "Hyperscaler ultra-optimisé en free-cooling",
        "stdin": "cas:3",
        "expected": "PUE_AUDIT: nom=google_hamina | PUE=1.08 | DCiE=92.6% | PERTES=8000 kWh | NOTE=EXCELLENT"
      }
    ],
    "solution": "[Exemple]\nPUE_AUDIT: nom=hyperscale_nordic | PUE=1.12 | DCiE=89.3% | PERTES=12000 kWh | NOTE=EXCELLENT\nPUE_AUDIT: nom=salle_serveur_locale | PUE=2.50 | DCiE=40.0% | PERTES=150000 kWh | NOTE=INEFFICACE\n\n[Cas 1 — Datacenter régional moderne certifié]\nPUE_AUDIT: nom=dc_lyon | PUE=1.40 | DCiE=71.4% | PERTES=40000 kWh | NOTE=BON\n\n[Cas 2 — Datacenter moyen vieillissant]\nPUE_AUDIT: nom=dc_legacy | PUE=1.80 | DCiE=55.6% | PERTES=80000 kWh | NOTE=MOYEN\n\n[Cas 3 — Hyperscaler ultra-optimisé en free-cooling]\nPUE_AUDIT: nom=google_hamina | PUE=1.08 | DCiE=92.6% | PERTES=8000 kWh | NOTE=EXCELLENT"
  },
  {
    "id": "cc3-c4-e2",
    "chapter": 4,
    "title": "Simulateur d’empreinte carbone et réduction CO2 par migration Cloud",
    "level": "n2",
    "language": "analyse",
    "goal": "Quantifier les émissions de gaz à effet de serre (tCO2e) et l’économie carbone permise par la mutualisation Cloud et l’efficacité énergétique.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nParamètres :<br>\n- <code>charge_kwh</code> : énergie utile IT annuelle en kWh.<br>\n- <code>fact_onprem</code> et <code>fact_cloud</code> : intensité carbone du mix électrique en g CO2e/kWh.<br>\n- <code>charge_onprem</code> et <code>charge_cloud</code> : taux d'utilisation moyen des serveurs (ex: 0.15 vs 0.60).<br><br>\nFormules :<br>\n- Sur site :<br>\n  $E_{tot\\_onprem} = charge\\_kwh \\times pue\\_onprem$<br>\n  $CO2_{onprem} = (E_{tot\\_onprem} \\times fact\\_onprem) / 1\\,000\\,000$ (en tonnes de CO2e)<br>\n- Dans le Cloud :<br>\n  Grâce au taux d'utilisation mutualisé, l'énergie IT utile requise est réduite :<br>\n  $E_{it\\_cloud} = charge\\_kwh \\times (charge\\_onprem / charge\\_cloud)$<br>\n  $E_{tot\\_cloud} = E_{it\\_cloud} \\times pue\\_cloud$<br>\n  $CO2_{cloud} = (E_{tot\\_cloud} \\times fact\\_cloud) / 1\\,000\\,000$ (en tonnes)<br>\n- Gain net : $Gain = CO2_{onprem} - CO2_{cloud}$, Réduction en % = $(Gain / CO2_{onprem}) \\times 100$.<br><br>\nAfficher :<br>\n<code>EMPREINTE: ONPREM=&lt;CO2_onprem:.2f&gt; tCO2e | CLOUD=&lt;CO2_cloud:.2f&gt; tCO2e | GAIN=&lt;Gain:.2f&gt; tCO2e (-&lt;pct:.1f&gt;%)</code></p>",
    "starter": "# Grille d'analyse (cc3-c4-e2) — Simulateur d’empreinte carbone et réduction CO2 par migration Cloud\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Migration entreprise moyenne mix standard]\n# Données : CARBONE charge_kwh=200000 pue_onprem=1.80 fact_onprem=250.0 charge_onprem=0.20 pue_cloud=1.20 fact_cloud=100.0 charge_cloud=0.50\nA_COMPLETER\n\n[Cas 2 — Environnement déjà décarboné localement]\n# Données : CARBONE charge_kwh=100000 pue_onprem=1.60 fact_onprem=60.0 charge_onprem=0.25 pue_cloud=1.10 fact_cloud=40.0 charge_cloud=0.50\nA_COMPLETER\n\n[Cas 3 — Petite infrastructure fortement optimisée]\n# Données : CARBONE charge_kwh=50000 pue_onprem=1.50 fact_onprem=200.0 charge_onprem=0.30 pue_cloud=1.15 fact_cloud=80.0 charge_cloud=0.60\nA_COMPLETER\n",
    "hints": [
      "Le Cloud cumule trois gains majeurs : meilleur PUE, serveurs plus chargés (moins de machines allumées à vide) et électricité décarbonée.",
      "Diviser par 1 000 000 pour convertir les grammes en tonnes."
    ],
    "examples": [
      {
        "stdin": "CARBONE charge_kwh=500000 pue_onprem=2.00 fact_onprem=350.0 charge_onprem=0.15 pue_cloud=1.15 fact_cloud=50.0 charge_cloud=0.60",
        "expected": "EMPREINTE: ONPREM=350.00 tCO2e | CLOUD=7.19 tCO2e | GAIN=342.81 tCO2e (-97.9%)",
        "note": "La transition du fioul/charbon local vers un datacenter nordique hydro-électrique permet près de 98% de décarbonation."
      }
    ],
    "tests": [
      {
        "label": "Migration entreprise moyenne mix standard",
        "stdin": "cas:1",
        "expected": "EMPREINTE: ONPREM=90.00 tCO2e | CLOUD=9.60 tCO2e | GAIN=80.40 tCO2e (-89.3%)"
      },
      {
        "label": "Environnement déjà décarboné localement",
        "stdin": "cas:2",
        "expected": "EMPREINTE: ONPREM=9.60 tCO2e | CLOUD=2.20 tCO2e | GAIN=7.40 tCO2e (-77.1%)"
      },
      {
        "label": "Petite infrastructure fortement optimisée",
        "stdin": "cas:3",
        "expected": "EMPREINTE: ONPREM=15.00 tCO2e | CLOUD=2.30 tCO2e | GAIN=12.70 tCO2e (-84.7%)"
      }
    ],
    "solution": "[Exemple]\nEMPREINTE: ONPREM=350.00 tCO2e | CLOUD=7.19 tCO2e | GAIN=342.81 tCO2e (-97.9%)\n\n[Cas 1 — Migration entreprise moyenne mix standard]\nEMPREINTE: ONPREM=90.00 tCO2e | CLOUD=9.60 tCO2e | GAIN=80.40 tCO2e (-89.3%)\n\n[Cas 2 — Environnement déjà décarboné localement]\nEMPREINTE: ONPREM=9.60 tCO2e | CLOUD=2.20 tCO2e | GAIN=7.40 tCO2e (-77.1%)\n\n[Cas 3 — Petite infrastructure fortement optimisée]\nEMPREINTE: ONPREM=15.00 tCO2e | CLOUD=2.30 tCO2e | GAIN=12.70 tCO2e (-84.7%)"
  },
  {
    "id": "cc3-c4-e3",
    "chapter": 4,
    "title": "Optimiseur d’extinction automatique d’instances (Auto-Shutdown FinOps)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer les économies financières et énergétiques générées par l’extinction automatique des environnements de dev/test hors des heures ouvrées.",
    "brief": "<p>Une semaine civile compte 168 heures (7 jours $\\times$ 24 heures).<br>\nLes heures ouvrées (lundi au vendredi, 8h-18h) représentent 50 heures par semaine.<br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPour chaque instance :<br>\n- Coût standard (24h/7j) : $C_{std} = 168 \\times cout\\_h$<br>\n- Coût optimisé : si <code>auto_shutdown == OUI</code>, $C_{opt} = 50 \\times cout\\_h$, sinon $C_{opt} = C_{std}$<br>\n- Économie unitaire : $Gain = C_{std} - C_{opt}$<br>\nAfficher par instance :<br>\n<code>INSTANCE: &lt;id&gt; -&gt; STANDARD=$&lt;C_std:.2f&gt; | OPTIMISE=$&lt;C_opt:.2f&gt; | GAIN=$&lt;Gain:.2f&gt;</code><br><br>\nAfficher ensuite la ligne de synthèse finale :<br>\n<code>TOTAL: STANDARD=$&lt;Tot_std:.2f&gt; | OPTIMISE=$&lt;Tot_opt:.2f&gt; | GAIN_GLOBAL=$&lt;Tot_gain:.2f&gt; (-&lt;pct:.1f&gt;%)</code></p>",
    "starter": "# Grille d'analyse (cc3-c4-e3) — Optimiseur d’extinction automatique d’instances (Auto-Shutdown FinOps)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Environnement de développement 100% éteignable]\n# Données : INSTANCE id=worker_dev cout_h=0.25 auto_shutdown=OUI\n# Données : INSTANCE id=front_dev cout_h=0.15 auto_shutdown=OUI\nA_COMPLETER\n\n[Cas 2 — Flotte mixte avec gros serveurs de calcul]\n# Données : INSTANCE id=compute_ai cout_h=3.00 auto_shutdown=OUI\n# Données : INSTANCE id=gateway_prod cout_h=0.50 auto_shutdown=NON\nA_COMPLETER\n\n[Cas 3 — Production critique sans coupure]\n# Données : INSTANCE id=core_bank cout_h=5.00 auto_shutdown=NON\nA_COMPLETER\n",
    "hints": [
      "L’extinction automatique permet d’économiser 118 heures de fonctionnement par semaine (soit plus de 70% d’économie sur les instances concernées).",
      "Calculer le total sur l’ensemble du parc d’instances analysé."
    ],
    "examples": [
      {
        "stdin": "INSTANCE id=web_dev cout_h=0.40 auto_shutdown=OUI\nINSTANCE id=api_test cout_h=0.60 auto_shutdown=OUI\nINSTANCE id=db_prod cout_h=1.50 auto_shutdown=NON",
        "expected": "INSTANCE: web_dev -> STANDARD=$67.20 | OPTIMISE=$20.00 | GAIN=$47.20\nINSTANCE: api_test -> STANDARD=$100.80 | OPTIMISE=$30.00 | GAIN=$70.80\nINSTANCE: db_prod -> STANDARD=$252.00 | OPTIMISE=$252.00 | GAIN=$0.00\nTOTAL: STANDARD=$420.00 | OPTIMISE=$302.00 | GAIN_GLOBAL=$118.00 (-28.1%)",
        "note": "La base de données de production tourne en continu 24/7, mais le dev et le test sont éteints les soirs et week-ends."
      }
    ],
    "tests": [
      {
        "label": "Environnement de développement 100% éteignable",
        "stdin": "cas:1",
        "expected": "INSTANCE: worker_dev -> STANDARD=$42.00 | OPTIMISE=$12.50 | GAIN=$29.50\nINSTANCE: front_dev -> STANDARD=$25.20 | OPTIMISE=$7.50 | GAIN=$17.70\nTOTAL: STANDARD=$67.20 | OPTIMISE=$20.00 | GAIN_GLOBAL=$47.20 (-70.2%)"
      },
      {
        "label": "Flotte mixte avec gros serveurs de calcul",
        "stdin": "cas:2",
        "expected": "INSTANCE: compute_ai -> STANDARD=$504.00 | OPTIMISE=$150.00 | GAIN=$354.00\nINSTANCE: gateway_prod -> STANDARD=$84.00 | OPTIMISE=$84.00 | GAIN=$0.00\nTOTAL: STANDARD=$588.00 | OPTIMISE=$234.00 | GAIN_GLOBAL=$354.00 (-60.2%)"
      },
      {
        "label": "Production critique sans coupure",
        "stdin": "cas:3",
        "expected": "INSTANCE: core_bank -> STANDARD=$840.00 | OPTIMISE=$840.00 | GAIN=$0.00\nTOTAL: STANDARD=$840.00 | OPTIMISE=$840.00 | GAIN_GLOBAL=$0.00 (-0.0%)"
      }
    ],
    "solution": "[Exemple]\nINSTANCE: web_dev -> STANDARD=$67.20 | OPTIMISE=$20.00 | GAIN=$47.20\nINSTANCE: api_test -> STANDARD=$100.80 | OPTIMISE=$30.00 | GAIN=$70.80\nINSTANCE: db_prod -> STANDARD=$252.00 | OPTIMISE=$252.00 | GAIN=$0.00\nTOTAL: STANDARD=$420.00 | OPTIMISE=$302.00 | GAIN_GLOBAL=$118.00 (-28.1%)\n\n[Cas 1 — Environnement de développement 100% éteignable]\nINSTANCE: worker_dev -> STANDARD=$42.00 | OPTIMISE=$12.50 | GAIN=$29.50\nINSTANCE: front_dev -> STANDARD=$25.20 | OPTIMISE=$7.50 | GAIN=$17.70\nTOTAL: STANDARD=$67.20 | OPTIMISE=$20.00 | GAIN_GLOBAL=$47.20 (-70.2%)\n\n[Cas 2 — Flotte mixte avec gros serveurs de calcul]\nINSTANCE: compute_ai -> STANDARD=$504.00 | OPTIMISE=$150.00 | GAIN=$354.00\nINSTANCE: gateway_prod -> STANDARD=$84.00 | OPTIMISE=$84.00 | GAIN=$0.00\nTOTAL: STANDARD=$588.00 | OPTIMISE=$234.00 | GAIN_GLOBAL=$354.00 (-60.2%)\n\n[Cas 3 — Production critique sans coupure]\nINSTANCE: core_bank -> STANDARD=$840.00 | OPTIMISE=$840.00 | GAIN=$0.00\nTOTAL: STANDARD=$840.00 | OPTIMISE=$840.00 | GAIN_GLOBAL=$0.00 (-0.0%)"
  }
];
