'use strict';

module.exports = [
  {
    "id": "lan3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de métrique de coût OSPF et sélection du meilleur chemin",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le coût OSPF cumulé de chemins concurrents à partir de la bande passante de référence.",
    "brief": "<p>Le protocole <strong>OSPFv2 (Open Shortest Path First - RFC 2328)</strong> calcule le coût d'une interface selon la formule standard :<br>\n<code>coût = max(1, ref_bandwidth // interface_bandwidth)</code> (en Mbps).<br>\nPar défaut, la bande passante de référence historique est 100 Mbps (ce qui donne un coût de 1 pour FastEthernet, Gigabit et 10G sans différenciation). En réseau de campus moderne, on configure <code>auto-cost reference-bandwidth</code> à 10000 (10 Gbps) ou 100000 (100 Gbps).<br><br>\nLe coût total d'un chemin vers une destination est la somme des coûts de chaque tronçon (interface de sortie le long du chemin). Le chemin au coût total le plus bas est injecté dans la table de routage (Best Path).<br><br>\nAnalysez les paramètres du problème pour chaque cas...&gt;</code> (vitesses des interfaces en Mbps).<br><br>\nPour chaque chemin (triés par id alphabétique), afficher :<br>\n<code>OSPF_PATH id={id} total_cost={total_cost} hops_count={len(hops)} status={BEST_PATH|BACKUP_PATH}</code><br>\nEt la ligne finale élisant le meilleur chemin :<br>\n<code>OSPF_ROUTE best_path={winner_id} metric={winner_cost}</code></p>",
    "starter": "# Grille d'analyse (lan3-c4-e1) — Calculateur de métrique de coût OSPF et sélection du meilleur chemin\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\n# Données : OSPF_CONFIG ref_bw=100\n# Données : PATH id=P1 hops=100,100\n# Données : PATH id=P2 hops=1000,1000\nA_COMPLETER\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\n# Données : OSPF_CONFIG ref_bw=100000\n# Données : PATH id=FIBRE hops=100000\n# Données : PATH id=CUIVRE hops=10000,10000\nA_COMPLETER\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\n# Données : OSPF_CONFIG ref_bw=1000\n# Données : PATH id=DIRECT_SLOW hops=2\n# Données : PATH id=DETOUR_FAST hops=100,100\nA_COMPLETER\n",
    "hints": [
      "Calculer pour chaque saut : max(1, ref_bw // bw).",
      "Sommer les coûts pour obtenir total_cost.",
      "Le chemin minimal (départage par id alphabétique) est BEST_PATH."
    ],
    "examples": [
      {
        "stdin": "OSPF_CONFIG ref_bw=10000\nPATH id=PATH_A hops=1000,1000,1000\nPATH id=PATH_B hops=10000,100\nPATH id=PATH_C hops=10000,10000",
        "expected": "OSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2",
        "note": "PATH_C traverse deux liens 10G (coût 1 + 1 = 2) et bat PATH_A (coût 10+10+10 = 30)."
      }
    ],
    "tests": [
      {
        "label": "Bande passante de référence par défaut 100 Mbps sans différenciation au-delà",
        "stdin": "cas:1",
        "expected": "OSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2"
      },
      {
        "label": "Chemin à saut unique très rapide surpassant un chemin multi-sauts",
        "stdin": "cas:2",
        "expected": "OSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1"
      },
      {
        "label": "Liaisons lentes pénalisées (T1/E1)",
        "stdin": "cas:3",
        "expected": "OSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20"
      }
    ],
    "solution": "[Exemple]\nOSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\nOSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\nOSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\nOSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20"
  },
  {
    "id": "lan3-c4-e2",
    "chapter": 4,
    "title": "Parseur et classificateur de paquets LSA OSPF (Types 1 à 7)",
    "level": "n2",
    "language": "analyse",
    "goal": "Classer les annonces d'état de liens (LSA) selon leur type, leur portée de diffusion et leur rôle émetteur.",
    "brief": "<p>Dans une architecture OSPF multi-aires, différents types de <strong>Link-State Advertisements (LSA)</strong> circulent pour construire la base de données topologique (LSDB) :<br><br>\nClassification officielle des LSAs :<br>\n- <strong>Type 1 (Router LSA) :</strong> Émis par <em>chaque routeur interne</em>, portée <code>INTRA_AREA</code>.<br>\n- <strong>Type 2 (Network LSA) :</strong> Émis par le <em>Designated Router (DR)</em> sur réseau multi-accès broadcast, portée <code>INTRA_AREA</code>.<br>\n- <strong>Type 3 (Summary LSA) :</strong> Émis par un <em>ABR (Area Border Router)</em> pour annoncer des réseaux d'autres aires, portée <code>INTER_AREA</code>.<br>\n- <strong>Type 4 (ASBR Summary LSA) :</strong> Émis par un <em>ABR</em> pour indiquer la route vers un ASBR, portée <code>INTER_AREA</code>.<br>\n- <strong>Type 5 (AS External LSA) :</strong> Émis par un <em>ASBR (Autonomous System Boundary Router)</em> pour injecter des routes redistribuées (BGP, RIP, statique), portée <code>EXTERNAL_AS</code>.<br>\n- <strong>Type 7 (NSSA External LSA) :</strong> Émis par un <em>ASBR</em> dans une aire NSSA, portée <code>NSSA_LOCAL</code>.<br><br>\nl’étude de cas comporte dans l’énoncé du cas des annonces LSA capturées :<br>\n<code>LSA id=&lt;nom&gt; type=&lt;1|2|3|4|5|7&gt; adv_router=&lt;ip&gt; area=&lt;int&gt;</code><br><br>\nPour chaque LSA, afficher :<br>\n<code>LSA_REPORT id={id} type={type} name={lsa_name} emitter={emitter_role} scope={scope}</code></p>",
    "starter": "# Grille d'analyse (lan3-c4-e2) — Parseur et classificateur de paquets LSA OSPF (Types 1 à 7)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Annonces de Type 4 et Type 7 NSSA]\n# Données : LSA id=L_ASBR type=4 adv_router=10.0.0.254 area=2\n# Données : LSA id=L_NSSA type=7 adv_router=172.16.50.1 area=10\nA_COMPLETER\n\n[Cas 2 — Plusieurs LSAs Type 1 dans différentes aires]\n# Données : LSA id=R_BB type=1 adv_router=1.1.1.1 area=0\n# Données : LSA id=R_A1 type=1 adv_router=2.2.2.2 area=1\nA_COMPLETER\n\n[Cas 3 — LSA Type 5 traversant le backbone]\n# Données : LSA id=EXT_ROUTE type=5 adv_router=198.51.100.1 area=0\nA_COMPLETER\n",
    "hints": [
      "Gérer un dictionnaire de mapping pour les types 1, 2, 3, 4, 5, 7.",
      "Exemple: 1 -> (\"Router LSA\", \"INTERNAL_ROUTER\", \"INTRA_AREA\")."
    ],
    "examples": [
      {
        "stdin": "LSA id=L1 type=1 adv_router=1.1.1.1 area=0\nLSA id=L2 type=2 adv_router=2.2.2.2 area=0\nLSA id=L3 type=3 adv_router=10.0.0.1 area=1\nLSA id=L4 type=5 adv_router=192.168.1.1 area=0",
        "expected": "LSA_REPORT id=L1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=L2 type=2 name=Network_LSA emitter=DR scope=INTRA_AREA\nLSA_REPORT id=L3 type=3 name=Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L4 type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS",
        "note": "L1 est un LSA Type 1 intra-zone ; L3 est un Type 3 inter-zone émis par un ABR ; L4 est un Type 5 externe."
      }
    ],
    "tests": [
      {
        "label": "Annonces de Type 4 et Type 7 NSSA",
        "stdin": "cas:1",
        "expected": "LSA_REPORT id=L_ASBR type=4 name=ASBR_Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L_NSSA type=7 name=NSSA_External_LSA emitter=ASBR scope=NSSA_LOCAL"
      },
      {
        "label": "Plusieurs LSAs Type 1 dans différentes aires",
        "stdin": "cas:2",
        "expected": "LSA_REPORT id=R_BB type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=R_A1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA"
      },
      {
        "label": "LSA Type 5 traversant le backbone",
        "stdin": "cas:3",
        "expected": "LSA_REPORT id=EXT_ROUTE type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS"
      }
    ],
    "solution": "[Exemple]\nLSA_REPORT id=L1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=L2 type=2 name=Network_LSA emitter=DR scope=INTRA_AREA\nLSA_REPORT id=L3 type=3 name=Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L4 type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS\n\n[Cas 1 — Annonces de Type 4 et Type 7 NSSA]\nLSA_REPORT id=L_ASBR type=4 name=ASBR_Summary_LSA emitter=ABR scope=INTER_AREA\nLSA_REPORT id=L_NSSA type=7 name=NSSA_External_LSA emitter=ASBR scope=NSSA_LOCAL\n\n[Cas 2 — Plusieurs LSAs Type 1 dans différentes aires]\nLSA_REPORT id=R_BB type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\nLSA_REPORT id=R_A1 type=1 name=Router_LSA emitter=INTERNAL_ROUTER scope=INTRA_AREA\n\n[Cas 3 — LSA Type 5 traversant le backbone]\nLSA_REPORT id=EXT_ROUTE type=5 name=AS_External_LSA emitter=ASBR scope=EXTERNAL_AS"
  },
  {
    "id": "lan3-c4-e3",
    "chapter": 4,
    "title": "Filtre d'injection de routes dans une aire OSPF Stub, Totally Stubby & NSSA",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer l'acceptation ou le filtrage des LSAs selon la politique de zone OSPF configurée sur l'ABR.",
    "brief": "<p>Pour alléger la table de routage et préserver la mémoire des routeurs de succursales, OSPF définit des types de zones spéciales :<br><br>\nRègles de filtrage des LSAs selon le type de zone :<br>\n- <strong>STANDARD (Zone normale) :</strong> Accepte tous les types de LSA (1, 2, 3, 4, 5).<br>\n- <strong>STUB :</strong> Bloque les routes externes (Type 4 et 5 rejetés) ; accepte Type 1, 2, 3.<br>\n- <strong>TOTALLY_STUBBY (Spécifique Cisco) :</strong> Bloque les routes externes (Type 4 et 5) ET les routes inter-zones (Type 3 rejetés) ; n'accepte que Type 1 et 2.<br>\n- <strong>NSSA (Not-So-Stubby Area) :</strong> Bloque les routes externes Type 4 et 5 classiques, mais accepte les Type 7 générés localement ; accepte Type 1, 2, 3, 7.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br>\n- Si bloqué : <code>action=DROP result=BLOCKED_BY_AREA_POLICY</code>.<br><br>\nAfficher :<br>\n<code>OSPF_FILTER id={id} area={area_id} lsa_type={lsa_type} action={action} result={result}</code></p>",
    "starter": "# Grille d'analyse (lan3-c4-e3) — Filtre d'injection de routes dans une aire OSPF Stub, Totally Stubby & NSSA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Zone Totally Stubby bloquant même les Summary Type 3]\n# Données : AREA_CONFIG area_id=20 type=TOTALLY_STUBBY\n# Données : INCOMING_LSA id=T1 lsa_type=1 prefix=10.20.0.0/16\n# Données : INCOMING_LSA id=T3 lsa_type=3 prefix=172.16.0.0/16\n# Données : INCOMING_LSA id=T5 lsa_type=5 prefix=8.8.8.8/32\nA_COMPLETER\n\n[Cas 2 — Zone NSSA autorisant le Type 7 et bloquant le Type 5]\n# Données : AREA_CONFIG area_id=30 type=NSSA\n# Données : INCOMING_LSA id=N7 lsa_type=7 prefix=198.51.100.0/24\n# Données : INCOMING_LSA id=N5 lsa_type=5 prefix=203.0.113.0/24\nA_COMPLETER\n\n[Cas 3 — Zone standard acceptant tout]\n# Données : AREA_CONFIG area_id=0 type=STANDARD\n# Données : INCOMING_LSA id=S3 lsa_type=3 prefix=10.0.0.0/8\n# Données : INCOMING_LSA id=S4 lsa_type=4 prefix=1.1.1.1/32\n# Données : INCOMING_LSA id=S5 lsa_type=5 prefix=100.64.0.0/10\nA_COMPLETER\n",
    "hints": [
      "Créer un set de types LSA autorisés selon le type d'aire.",
      "STANDARD: {1, 2, 3, 4, 5}.",
      "STUB: {1, 2, 3}.",
      "TOTALLY_STUBBY: {1, 2}.",
      "NSSA: {1, 2, 3, 7}."
    ],
    "examples": [
      {
        "stdin": "AREA_CONFIG area_id=10 type=STUB\nINCOMING_LSA id=L1 lsa_type=1 prefix=10.10.0.0/16\nINCOMING_LSA id=L2 lsa_type=3 prefix=192.168.0.0/24\nINCOMING_LSA id=L3 lsa_type=5 prefix=0.0.0.0/0",
        "expected": "OSPF_FILTER id=L1 area=10 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L2 area=10 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L3 area=10 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY",
        "note": "L1 (Type 1) et L2 (Type 3) entrent dans la zone Stub ; L3 (Type 5 externe) est bloqué."
      }
    ],
    "tests": [
      {
        "label": "Zone Totally Stubby bloquant même les Summary Type 3",
        "stdin": "cas:1",
        "expected": "OSPF_FILTER id=T1 area=20 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=T3 area=20 lsa_type=3 action=DROP result=BLOCKED_BY_AREA_POLICY\nOSPF_FILTER id=T5 area=20 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY"
      },
      {
        "label": "Zone NSSA autorisant le Type 7 et bloquant le Type 5",
        "stdin": "cas:2",
        "expected": "OSPF_FILTER id=N7 area=30 lsa_type=7 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=N5 area=30 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY"
      },
      {
        "label": "Zone standard acceptant tout",
        "stdin": "cas:3",
        "expected": "OSPF_FILTER id=S3 area=0 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S4 area=0 lsa_type=4 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S5 area=0 lsa_type=5 action=PERMIT result=INJECTED_INTO_AREA"
      }
    ],
    "solution": "[Exemple]\nOSPF_FILTER id=L1 area=10 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L2 area=10 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=L3 area=10 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY\n\n[Cas 1 — Zone Totally Stubby bloquant même les Summary Type 3]\nOSPF_FILTER id=T1 area=20 lsa_type=1 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=T3 area=20 lsa_type=3 action=DROP result=BLOCKED_BY_AREA_POLICY\nOSPF_FILTER id=T5 area=20 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY\n\n[Cas 2 — Zone NSSA autorisant le Type 7 et bloquant le Type 5]\nOSPF_FILTER id=N7 area=30 lsa_type=7 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=N5 area=30 lsa_type=5 action=DROP result=BLOCKED_BY_AREA_POLICY\n\n[Cas 3 — Zone standard acceptant tout]\nOSPF_FILTER id=S3 area=0 lsa_type=3 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S4 area=0 lsa_type=4 action=PERMIT result=INJECTED_INTO_AREA\nOSPF_FILTER id=S5 area=0 lsa_type=5 action=PERMIT result=INJECTED_INTO_AREA"
  }
];
