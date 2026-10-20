'use strict';

module.exports = [
  {
    "id": "cc3-c6-e1",
    "chapter": 6,
    "title": "Arbre de décision des 6 R de la migration applicative Cloud",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer l’arbre de décision méthodologique (Gartner / AWS 6R) pour choisir la trajectoire de migration adaptée à chaque application.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nRègles de décision séquentielles :<br>\n1. Si <code>usage == OBSOLETE</code> -&gt; <code>STRATEGIE=RETIRE (DECOMMISSIONNER)</code><br>\n2. Sinon si <code>compat_cloud == INCOMPATIBLE</code> et <code>valeur_metier == FAIBLE</code> -&gt; <code>STRATEGIE=RETAIN (CONSERVER_SUR_SITE)</code><br>\n3. Sinon si <code>existe_saas == OUI</code> et <code>valeur_metier == FAIBLE</code> -&gt; <code>STRATEGIE=REPURCHASE (ADOPTER_SAAS)</code><br>\n4. Sinon si <code>valeur_metier == FORTE</code> et <code>remaniement_code == OUI</code> -&gt; <code>STRATEGIE=REFACTOR (REFONTE_CLOUD_NATIVE)</code><br>\n5. Sinon si <code>compat_cloud == ADAPTABLE</code> -&gt; <code>STRATEGIE=REPLATFORM (OPTIMISATION_PLATEFORME)</code><br>\n6. Sinon -&gt; <code>STRATEGIE=REHOST (LIFT_AND_SHIFT)</code><br><br>\nAfficher :<br>\n<code>DECISION_6R: &lt;app&gt; -&gt; STRATEGIE=&lt;STRATEGIE&gt; (&lt;ACTION&gt;)</code></p>",
    "starter": "# Grille d'analyse (cc3-c6-e1) — Arbre de décision des 6 R de la migration applicative Cloud\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Migration brute d’une VM legacy compatible (Rehost)]\n# Données : MIGRATION app=compta_legacy usage=ACTIF valeur_metier=FAIBLE compat_cloud=NATIVE existe_saas=NON remaniement_code=NON\nA_COMPLETER\n\n[Cas 2 — Application conservée sur site faute de retour sur investissement]\n# Données : MIGRATION app=pilotage_usine usage=ACTIF valeur_metier=FAIBLE compat_cloud=INCOMPATIBLE existe_saas=NON remaniement_code=NON\nA_COMPLETER\n\n[Cas 3 — Adaptation de conteneurs managés (Replatform)]\n# Données : MIGRATION app=api_catalogue usage=ACTIF valeur_metier=FAIBLE compat_cloud=ADAPTABLE existe_saas=NON remaniement_code=NON\nA_COMPLETER\n",
    "hints": [
      "Traiter les règles dans l’ordre exact pour respecter les priorités d’arbitrage.",
      "Rehost est le plus rapide (Lift & Shift), Refactor apporte le maximum de valeur cloud-native."
    ],
    "examples": [
      {
        "stdin": "MIGRATION app=intranet_v1 usage=OBSOLETE valeur_metier=FAIBLE compat_cloud=INCOMPATIBLE existe_saas=NON remaniement_code=NON\nMIGRATION app=crm_maison usage=ACTIF valeur_metier=FAIBLE compat_cloud=ADAPTABLE existe_saas=OUI remaniement_code=NON\nMIGRATION app=moteur_reco usage=ACTIF valeur_metier=FORTE compat_cloud=ADAPTABLE existe_saas=NON remaniement_code=OUI",
        "expected": "DECISION_6R: intranet_v1 -> STRATEGIE=RETIRE (DECOMMISSIONNER)\nDECISION_6R: crm_maison -> STRATEGIE=REPURCHASE (ADOPTER_SAAS)\nDECISION_6R: moteur_reco -> STRATEGIE=REFACTOR (REFONTE_CLOUD_NATIVE)",
        "note": "L’intranet obsolète est décommissionné, le CRM bascule sur un SaaS du marché, et le moteur cœur est refactorisé."
      }
    ],
    "tests": [
      {
        "label": "Migration brute d’une VM legacy compatible (Rehost)",
        "stdin": "cas:1",
        "expected": "DECISION_6R: compta_legacy -> STRATEGIE=REHOST (LIFT_AND_SHIFT)"
      },
      {
        "label": "Application conservée sur site faute de retour sur investissement",
        "stdin": "cas:2",
        "expected": "DECISION_6R: pilotage_usine -> STRATEGIE=RETAIN (CONSERVER_SUR_SITE)"
      },
      {
        "label": "Adaptation de conteneurs managés (Replatform)",
        "stdin": "cas:3",
        "expected": "DECISION_6R: api_catalogue -> STRATEGIE=REPLATFORM (OPTIMISATION_PLATEFORME)"
      }
    ],
    "solution": "[Exemple]\nDECISION_6R: intranet_v1 -> STRATEGIE=RETIRE (DECOMMISSIONNER)\nDECISION_6R: crm_maison -> STRATEGIE=REPURCHASE (ADOPTER_SAAS)\nDECISION_6R: moteur_reco -> STRATEGIE=REFACTOR (REFONTE_CLOUD_NATIVE)\n\n[Cas 1 — Migration brute d’une VM legacy compatible (Rehost)]\nDECISION_6R: compta_legacy -> STRATEGIE=REHOST (LIFT_AND_SHIFT)\n\n[Cas 2 — Application conservée sur site faute de retour sur investissement]\nDECISION_6R: pilotage_usine -> STRATEGIE=RETAIN (CONSERVER_SUR_SITE)\n\n[Cas 3 — Adaptation de conteneurs managés (Replatform)]\nDECISION_6R: api_catalogue -> STRATEGIE=REPLATFORM (OPTIMISATION_PLATEFORME)"
  },
  {
    "id": "cc3-c6-e2",
    "chapter": 6,
    "title": "Calculateur comparatif de TCO : CAPEX sur site vs OPEX Cloud sur 3 ans",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer le coût total de possession (Total Cost of Ownership) sur un cycle d’investissement de 3 ans et calculer le retour sur investissement (ROI).",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nFormules sur 3 ans :<br>\n- Sur site (CAPEX matériel + maintenance annuelle) :<br>\n  $TCO_{onprem} = capex + 3 \\times opex\\_onprem\\_an$<br>\n- Cloud (Frais de migration initiaux + consommation récurrente) :<br>\n  $TCO_{cloud} = migration + 3 \\times opex\\_cloud\\_an$<br>\n- Économie nette : $Eco = TCO_{onprem} - TCO_{cloud}$<br>\n- ROI (Retour sur investissement) : $ROI = (Eco / TCO_{onprem}) \\times 100$ (en %)<br><br>\nAfficher :<br>\n<code>TCO_COMPARE: &lt;projet&gt; -&gt; ONPREM_3ANS=$&lt;TCO_onprem:.2f&gt; | CLOUD_3ANS=$&lt;TCO_cloud:.2f&gt; | ECONOMIE=$&lt;Eco:.2f&gt; (ROI=&lt;ROI:.1f&gt;%)</code></p>",
    "starter": "# Grille d'analyse (cc3-c6-e2) — Calculateur comparatif de TCO : CAPEX sur site vs OPEX Cloud sur 3 ans\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Gros projet infrastructure bancaire]\n# Données : TCO projet=core_banking capex=600000 opex_onprem_an=150000 migration=80000 opex_cloud_an=200000\nA_COMPLETER\n\n[Cas 2 — Projet à rentabilité serrée]\n# Données : TCO projet=serveurs_fichiers capex=80000 opex_onprem_an=20000 migration=15000 opex_cloud_an=35000\nA_COMPLETER\n\n[Cas 3 — Migration coûteuse sans gain d’échelle immédiat]\n# Données : TCO projet=app_monolithique capex=50000 opex_onprem_an=10000 migration=25000 opex_cloud_an=18000\nA_COMPLETER\n",
    "hints": [
      "Le modèle Cloud remplace les dépenses d’investissement lourdes (CAPEX) par des dépenses d’exploitation lissées (OPEX).",
      "Un ROI positif indique que la migration génère un gain net sur la période triennale."
    ],
    "examples": [
      {
        "stdin": "TCO projet=portail_ecom capex=150000 opex_onprem_an=40000 migration=30000 opex_cloud_an=50000",
        "expected": "TCO_COMPARE: portail_ecom -> ONPREM_3ANS=$270000.00 | CLOUD_3ANS=$180000.00 | ECONOMIE=$90000.00 (ROI=33.3%)",
        "note": "Sur site : 150k + 3*40k = 270k. Cloud : 30k + 3*50k = 180k. Économie de 90 000$ (ROI de 33.3%)."
      }
    ],
    "tests": [
      {
        "label": "Gros projet infrastructure bancaire",
        "stdin": "cas:1",
        "expected": "TCO_COMPARE: core_banking -> ONPREM_3ANS=$1050000.00 | CLOUD_3ANS=$680000.00 | ECONOMIE=$370000.00 (ROI=35.2%)"
      },
      {
        "label": "Projet à rentabilité serrée",
        "stdin": "cas:2",
        "expected": "TCO_COMPARE: serveurs_fichiers -> ONPREM_3ANS=$140000.00 | CLOUD_3ANS=$120000.00 | ECONOMIE=$20000.00 (ROI=14.3%)"
      },
      {
        "label": "Migration coûteuse sans gain d’échelle immédiat",
        "stdin": "cas:3",
        "expected": "TCO_COMPARE: app_monolithique -> ONPREM_3ANS=$80000.00 | CLOUD_3ANS=$79000.00 | ECONOMIE=$1000.00 (ROI=1.2%)"
      }
    ],
    "solution": "[Exemple]\nTCO_COMPARE: portail_ecom -> ONPREM_3ANS=$270000.00 | CLOUD_3ANS=$180000.00 | ECONOMIE=$90000.00 (ROI=33.3%)\n\n[Cas 1 — Gros projet infrastructure bancaire]\nTCO_COMPARE: core_banking -> ONPREM_3ANS=$1050000.00 | CLOUD_3ANS=$680000.00 | ECONOMIE=$370000.00 (ROI=35.2%)\n\n[Cas 2 — Projet à rentabilité serrée]\nTCO_COMPARE: serveurs_fichiers -> ONPREM_3ANS=$140000.00 | CLOUD_3ANS=$120000.00 | ECONOMIE=$20000.00 (ROI=14.3%)\n\n[Cas 3 — Migration coûteuse sans gain d’échelle immédiat]\nTCO_COMPARE: app_monolithique -> ONPREM_3ANS=$80000.00 | CLOUD_3ANS=$79000.00 | ECONOMIE=$1000.00 (ROI=1.2%)"
  },
  {
    "id": "cc3-c6-e3",
    "chapter": 6,
    "title": "Analyseur FinOps d’arbitrage de tarification (On-Demand, Réservé, Spot)",
    "level": "n3",
    "language": "analyse",
    "goal": "Segmenter les types de charges de travail et appliquer les leviers tarifaires Cloud optimaux (Instances Réservées, Spot et À la Demande) pour réduire la facture.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nParamètres :<br>\n- <code>rate</code> : tarif horaire catalogue On-Demand.<br>\n- <code>base_h</code> : heures de charge continue stable -&gt; éligibles aux Instances Réservées (remise de 40%, soit coefficient 0.60).<br>\n- <code>batch_h</code> : heures de calculs tolérants aux pannes -&gt; éligibles aux Instances Spot (remise de 70%, soit coefficient 0.30).<br>\n- <code>burst_h</code> : pics de trafic imprévisibles -&gt; traités en On-Demand (plein tarif, coefficient 1.00).<br><br>\nCalculs :<br>\n- Coût naïf (tout payé en On-Demand) : $C_{naif} = (b\\_h + bt\\_h + bu\\_h) \\times rate$<br>\n- Coûts optimisés FinOps :<br>\n  $C_{ri} = b\\_h \\times (rate \\times 0.60)$<br>\n  $C_{spot} = bt\\_h \\times (rate \\times 0.30)$<br>\n  $C_{od} = bu\\_h \\times rate$<br>\n  $C_{finops} = C_{ri} + C_{spot} + C_{od}$<br>\n- Économie totale : $Gain = C_{naif} - C_{finops}$, Réduction en % = $(Gain / C_{naif}) \\times 100$.<br><br>\nAfficher :<br>\n<code>FINOPS_OPTIM: &lt;nom&gt; -&gt; COUT_NAIF=$&lt;C_naif:.2f&gt; | COUT_FINOPS=$&lt;C_finops:.2f&gt; (RI=$&lt;C_ri:.2f&gt;, SPOT=$&lt;C_spot:.2f&gt;, OD=$&lt;C_od:.2f&gt;) | ECONOMIE=$&lt;Gain:.2f&gt; (-&lt;pct:.1f&gt;%)</code></p>",
    "starter": "# Grille d'analyse (cc3-c6-e3) — Analyseur FinOps d’arbitrage de tarification (On-Demand, Réservé, Spot)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Gros traitement big data asynchrone dominant]\n# Données : FINOPS charge=pipeline_etl rate=1.20 base_h=200 batch_h=2000 burst_h=100\nA_COMPLETER\n\n[Cas 2 — Trafic principalement imprévisible avec peu de base]\n# Données : FINOPS charge=campagne_promo rate=0.50 base_h=100 batch_h=50 burst_h=800\nA_COMPLETER\n\n[Cas 3 — Parc 100% stable en production continue]\n# Données : FINOPS charge=serveurs_erp rate=2.00 base_h=5000 batch_h=0 burst_h=0\nA_COMPLETER\n",
    "hints": [
      "Le socle continu représente souvent 60% à 80% des heures annuelles : le réserver est le levier FinOps le plus immédiat.",
      "Les interruptions d’instances Spot (préavis de 2 minutes) sont acceptables pour les traitements asynchrones."
    ],
    "examples": [
      {
        "stdin": "FINOPS charge=plateforme_saas rate=0.80 base_h=1000 batch_h=400 burst_h=200",
        "expected": "FINOPS_OPTIM: plateforme_saas -> COUT_NAIF=$1280.00 | COUT_FINOPS=$736.00 (RI=$480.00, SPOT=$96.00, OD=$160.00) | ECONOMIE=$544.00 (-42.5%)",
        "note": "Naïf : 1600h * 0.80$ = 1280$. En FinOps : 1000*0.48 + 400*0.24 + 200*0.80 = 736$. Économie de 544$ (-42.5%)."
      }
    ],
    "tests": [
      {
        "label": "Gros traitement big data asynchrone dominant",
        "stdin": "cas:1",
        "expected": "FINOPS_OPTIM: pipeline_etl -> COUT_NAIF=$2760.00 | COUT_FINOPS=$984.00 (RI=$144.00, SPOT=$720.00, OD=$120.00) | ECONOMIE=$1776.00 (-64.3%)"
      },
      {
        "label": "Trafic principalement imprévisible avec peu de base",
        "stdin": "cas:2",
        "expected": "FINOPS_OPTIM: campagne_promo -> COUT_NAIF=$475.00 | COUT_FINOPS=$437.50 (RI=$30.00, SPOT=$7.50, OD=$400.00) | ECONOMIE=$37.50 (-7.9%)"
      },
      {
        "label": "Parc 100% stable en production continue",
        "stdin": "cas:3",
        "expected": "FINOPS_OPTIM: serveurs_erp -> COUT_NAIF=$10000.00 | COUT_FINOPS=$6000.00 (RI=$6000.00, SPOT=$0.00, OD=$0.00) | ECONOMIE=$4000.00 (-40.0%)"
      }
    ],
    "solution": "[Exemple]\nFINOPS_OPTIM: plateforme_saas -> COUT_NAIF=$1280.00 | COUT_FINOPS=$736.00 (RI=$480.00, SPOT=$96.00, OD=$160.00) | ECONOMIE=$544.00 (-42.5%)\n\n[Cas 1 — Gros traitement big data asynchrone dominant]\nFINOPS_OPTIM: pipeline_etl -> COUT_NAIF=$2760.00 | COUT_FINOPS=$984.00 (RI=$144.00, SPOT=$720.00, OD=$120.00) | ECONOMIE=$1776.00 (-64.3%)\n\n[Cas 2 — Trafic principalement imprévisible avec peu de base]\nFINOPS_OPTIM: campagne_promo -> COUT_NAIF=$475.00 | COUT_FINOPS=$437.50 (RI=$30.00, SPOT=$7.50, OD=$400.00) | ECONOMIE=$37.50 (-7.9%)\n\n[Cas 3 — Parc 100% stable en production continue]\nFINOPS_OPTIM: serveurs_erp -> COUT_NAIF=$10000.00 | COUT_FINOPS=$6000.00 (RI=$6000.00, SPOT=$0.00, OD=$0.00) | ECONOMIE=$4000.00 (-40.0%)"
  }
];
