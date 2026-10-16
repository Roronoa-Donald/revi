'use strict';

module.exports = [
  {
    "id": "fw3-c4-e1",
    "chapter": 4,
    "title": "Contrôleur de conformité des flux de sécurité DMZ",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la conformité des flux réseau selon la matrice de sécurité inter-zones et interdire formellement DMZ vers LAN.",
    "brief": "<p>La <strong>Zone Démilitarisée (DMZ)</strong> héberge les serveurs publics de l'entreprise. La règle cardinale de sécurité réseau stipule qu'<strong>aucune connexion ne doit jamais pouvoir être initiée depuis la DMZ vers le réseau interne LAN</strong> (car un pirate ayant compromis un serveur web en DMZ pourrait pivoter vers les postes internes).<br><br>\nMatrice de conformité des flux initiés :<br>\n1. <code>DMZ -&gt; LAN</code> : Toujours <code>VIOLATION_CRITIQUE_DMZ_VERS_LAN</code> quel que soit le port.<br>\n2. <code>WAN -&gt; DMZ</code> : Autorisé uniquement sur les ports publics <code>80, 443, 25, 53</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>\n3. <code>LAN -&gt; DMZ</code> : Autorisé pour l'administration et les services <code>80, 443, 22, 3306</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>\n4. <code>LAN -&gt; WAN</code> : Autorisé pour la navigation <code>80, 443, 53</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>\n5. <code>DMZ -&gt; WAN</code> : Autorisé uniquement pour les mises à jour et DNS <code>80, 443, 53</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>\n6. <code>WAN -&gt; LAN</code> : Toujours <code>VIOLATION_WAN_VERS_LAN_INTERDIT</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque flux, afficher :<br>\n<code>AUDIT flow={id} status={CONFORME | motif_rejet}</code></p>",
    "starter": "# Grille d'analyse (fw3-c4-e1) — Contrôleur de conformité des flux de sécurité DMZ\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tentative de connexion WAN directe vers le LAN]\n# Données : FLOW id=W1 src_zone=WAN dst_zone=LAN dport=22\n# Données : FLOW id=W2 src_zone=WAN dst_zone=DMZ dport=80\nA_COMPLETER\n\n[Cas 2 — Flux applicatif LAN vers base de données DMZ et service non autorisé]\n# Données : FLOW id=L1 src_zone=LAN dst_zone=DMZ dport=3306\n# Données : FLOW id=L2 src_zone=LAN dst_zone=DMZ dport=139\n# Données : FLOW id=D1 src_zone=DMZ dst_zone=WAN dport=443\n# Données : FLOW id=D2 src_zone=DMZ dst_zone=WAN dport=22\nA_COMPLETER\n\n[Cas 3 — Navigation LAN vers Internet WAN légitime et interdite]\n# Données : FLOW id=N1 src_zone=LAN dst_zone=WAN dport=80\n# Données : FLOW id=N2 src_zone=LAN dst_zone=WAN dport=6667\nA_COMPLETER\n",
    "hints": [
      "Traiter en priorité les violations absolues (DMZ->LAN et WAN->LAN).",
      "Vérifier si le port destination fait partie de la liste blanche autorisée pour le couple (src, dst)."
    ],
    "examples": [
      {
        "stdin": "FLOW id=F1 src_zone=WAN dst_zone=DMZ dport=443\nFLOW id=F2 src_zone=DMZ dst_zone=LAN dport=3306",
        "expected": "AUDIT flow=F1 status=CONFORME\nAUDIT flow=F2 status=VIOLATION_CRITIQUE_DMZ_VERS_LAN",
        "note": "F1 est conforme (HTTPS public en DMZ), F2 est une violation critique majeure de DMZ vers LAN."
      }
    ],
    "tests": [
      {
        "label": "Tentative de connexion WAN directe vers le LAN",
        "stdin": "cas:1",
        "expected": "AUDIT flow=W1 status=VIOLATION_WAN_VERS_LAN_INTERDIT\nAUDIT flow=W2 status=CONFORME"
      },
      {
        "label": "Flux applicatif LAN vers base de données DMZ et service non autorisé",
        "stdin": "cas:2",
        "expected": "AUDIT flow=L1 status=CONFORME\nAUDIT flow=L2 status=SERVICE_NON_AUTORISE\nAUDIT flow=D1 status=CONFORME\nAUDIT flow=D2 status=SERVICE_NON_AUTORISE"
      },
      {
        "label": "Navigation LAN vers Internet WAN légitime et interdite",
        "stdin": "cas:3",
        "expected": "AUDIT flow=N1 status=CONFORME\nAUDIT flow=N2 status=SERVICE_NON_AUTORISE"
      }
    ],
    "solution": "[Exemple]\nAUDIT flow=F1 status=CONFORME\nAUDIT flow=F2 status=VIOLATION_CRITIQUE_DMZ_VERS_LAN\n\n[Cas 1 — Tentative de connexion WAN directe vers le LAN]\nAUDIT flow=W1 status=VIOLATION_WAN_VERS_LAN_INTERDIT\nAUDIT flow=W2 status=CONFORME\n\n[Cas 2 — Flux applicatif LAN vers base de données DMZ et service non autorisé]\nAUDIT flow=L1 status=CONFORME\nAUDIT flow=L2 status=SERVICE_NON_AUTORISE\nAUDIT flow=D1 status=CONFORME\nAUDIT flow=D2 status=SERVICE_NON_AUTORISE\n\n[Cas 3 — Navigation LAN vers Internet WAN légitime et interdite]\nAUDIT flow=N1 status=CONFORME\nAUDIT flow=N2 status=SERVICE_NON_AUTORISE"
  },
  {
    "id": "fw3-c4-e2",
    "chapter": 4,
    "title": "Évaluateur d’architectures et topologies pare-feu",
    "level": "n2",
    "language": "analyse",
    "goal": "Classifier l’architecture réseau (Dual-Homed, Triple-Homed, Back-to-Back) et calculer son score de résilience.",
    "brief": "<p>L'architecture de déploiement des pare-feux conditionne la résistance globale du système informatique face aux intrusions :<br><br>\nModèles d'architecture :<br>\n1. <strong>Dual-Homed Bastion</strong> : 1 seul pare-feu, 2 zones (<code>LAN, WAN</code>). Pas de DMZ.<br>\n   - <code>ARCHITECTURE=DUAL_HOMED</code>, <code>SCORE=4/10</code>, <code>VERDICT=INSUFFISANT_PAS_DE_DMZ</code>.<br>\n2. <strong>Triple-Homed (Screened Subnet unique)</strong> : 1 seul pare-feu, 3 zones (<code>LAN, DMZ, WAN</code>).<br>\n   - Si <code>constructeurs=1</code> : <code>ARCHITECTURE=TRIPLE_HOMED</code>, <code>SCORE=7/10</code>, <code>VERDICT=ACCEPTABLE_SPOF_FIREWALL_UNIQUE</code>.<br>\n3. <strong>Back-to-Back (Pare-feux en cascade avec DMZ sandwich)</strong> : au moins 2 pare-feux distincts encadrant la DMZ.<br>\n   - Si <code>constructeurs &gt;= 2</code> : <code>ARCHITECTURE=BACK_TO_BACK_HETEROGENE</code>, <code>SCORE=9/10</code>, <code>VERDICT=EXCELLENT_DEFENSE_EN_PROFONDEUR</code>.<br>\n   - Si <code>constructeurs == 1</code> : <code>ARCHITECTURE=BACK_TO_BACK_HOMOGENE</code>, <code>SCORE=8/10</code>, <code>VERDICT=TRES_BON_VULNERABILITE_COMMUNE_POSSIBLE</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>TOPOLOGY_AUDIT nom={nom} arch={ARCHITECTURE} score={SCORE} verdict={VERDICT}</code></p>",
    "starter": "# Grille d'analyse (fw3-c4-e2) — Évaluateur d’architectures et topologies pare-feu\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Petite entreprise avec un seul pare-feu 3 pattes]\n# Données : TOPOLOGY nom=PME_Site firewalls=1 zones=LAN,DMZ,WAN constructeurs=1\nA_COMPLETER\n\n[Cas 2 — Routeur basique sans DMZ]\n# Données : TOPOLOGY nom=Agence_Locale firewalls=1 zones=LAN,WAN constructeurs=1\nA_COMPLETER\n\n[Cas 3 — Back-to-back avec équipements du même fabricant]\n# Données : TOPOLOGY nom=Campus_Univ firewalls=2 zones=LAN,DMZ,WAN constructeurs=1\nA_COMPLETER\n",
    "hints": [
      "Compter le nombre de pare-feux et la présence de la zone DMZ.",
      "Distinguer les topologies Back-to-Back selon le nombre de constructeurs différents."
    ],
    "examples": [
      {
        "stdin": "TOPOLOGY nom=Siege_Banque firewalls=2 zones=LAN,DMZ,WAN constructeurs=2",
        "expected": "TOPOLOGY_AUDIT nom=Siege_Banque arch=BACK_TO_BACK_HETEROGENE score=9/10 verdict=EXCELLENT_DEFENSE_EN_PROFONDEUR",
        "note": "Double pare-feu hétérogène (ex: Fortinet en frontal + Cisco en interne) : standard bancaire."
      }
    ],
    "tests": [
      {
        "label": "Petite entreprise avec un seul pare-feu 3 pattes",
        "stdin": "cas:1",
        "expected": "TOPOLOGY_AUDIT nom=PME_Site arch=TRIPLE_HOMED score=7/10 verdict=ACCEPTABLE_SPOF_FIREWALL_UNIQUE"
      },
      {
        "label": "Routeur basique sans DMZ",
        "stdin": "cas:2",
        "expected": "TOPOLOGY_AUDIT nom=Agence_Locale arch=DUAL_HOMED score=4/10 verdict=INSUFFISANT_PAS_DE_DMZ"
      },
      {
        "label": "Back-to-back avec équipements du même fabricant",
        "stdin": "cas:3",
        "expected": "TOPOLOGY_AUDIT nom=Campus_Univ arch=BACK_TO_BACK_HOMOGENE score=8/10 verdict=TRES_BON_VULNERABILITE_COMMUNE_POSSIBLE"
      }
    ],
    "solution": "[Exemple]\nTOPOLOGY_AUDIT nom=Siege_Banque arch=BACK_TO_BACK_HETEROGENE score=9/10 verdict=EXCELLENT_DEFENSE_EN_PROFONDEUR\n\n[Cas 1 — Petite entreprise avec un seul pare-feu 3 pattes]\nTOPOLOGY_AUDIT nom=PME_Site arch=TRIPLE_HOMED score=7/10 verdict=ACCEPTABLE_SPOF_FIREWALL_UNIQUE\n\n[Cas 2 — Routeur basique sans DMZ]\nTOPOLOGY_AUDIT nom=Agence_Locale arch=DUAL_HOMED score=4/10 verdict=INSUFFISANT_PAS_DE_DMZ\n\n[Cas 3 — Back-to-back avec équipements du même fabricant]\nTOPOLOGY_AUDIT nom=Campus_Univ arch=BACK_TO_BACK_HOMOGENE score=8/10 verdict=TRES_BON_VULNERABILITE_COMMUNE_POSSIBLE"
  },
  {
    "id": "fw3-c4-e3",
    "chapter": 4,
    "title": "Passerelle d’administration sécurisée et Bastion SSH / Jump Host",
    "level": "n3",
    "language": "analyse",
    "goal": "Valider les accès d’administration via un hôte bastion avec authentification forte et MFA.",
    "brief": "<p>Dans une infrastructure sécurisée, les serveurs critiques de production ne doivent jamais être accessibles directement en SSH depuis le réseau bureautique LAN. Tout accès administrateur doit obligatoirement transiter par un <strong>Bastion SSH (Jump Host)</strong> avec authentification forte (MFA).<br><br>\nRègles de validation :<br>\n1. Si le port demandé n'est pas <code>22</code> : <code>DENY</code>, motif <code>PORT_NON_ADMINISTRATIF</code>.<br>\n2. Si la cible <code>target_zone == 'PROD'</code> :<br>\n   a) Si <code>via_bastion == 'NON'</code> : <code>DENY</code>, motif <code>ACCES_DIRECT_INTERDIT_PASSER_PAR_BASTION</code>.<br>\n   b) Si <code>via_bastion == 'OUI'</code> et <code>mfa_valid == 'NON'</code> : <code>DENY</code>, motif <code>MFA_REQUIS</code>.<br>\n   c) Si <code>via_bastion == 'OUI'</code> et <code>mfa_valid == 'OUI'</code> : <code>PERMIT</code>, motif <code>SESSION_BASTION_VALIDEE</code>.<br>\n3. Si la cible <code>target_zone == 'BASTION'</code> :<br>\n   a) Si <code>mfa_valid == 'OUI'</code> : <code>PERMIT</code>, motif <code>AUTHENTIFICATION_BASTION_OK</code>.<br>\n   b) Sinon : <code>DENY</code>, motif <code>MFA_REQUIS</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>BASTION_GATEWAY req={id} decision={PERMIT|DENY} motif={MOTIF}</code></p>",
    "starter": "# Grille d'analyse (fw3-c4-e3) — Passerelle d’administration sécurisée et Bastion SSH / Jump Host\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Connexion directe avec port non SSH]\n# Données : ACCESS_REQ id=T1 user=bob target_zone=PROD port=80 via_bastion=NON mfa_valid=NON\nA_COMPLETER\n\n[Cas 2 — Échec MFA lors de la tentative de connexion au bastion]\n# Données : ACCESS_REQ id=T2 user=charlie target_zone=BASTION port=22 via_bastion=NON mfa_valid=NON\n# Données : ACCESS_REQ id=T3 user=charlie target_zone=BASTION port=22 via_bastion=NON mfa_valid=OUI\nA_COMPLETER\n\n[Cas 3 — Passage par bastion mais sans validation MFA vers PROD]\n# Données : ACCESS_REQ id=T4 user=david target_zone=PROD port=22 via_bastion=OUI mfa_valid=NON\nA_COMPLETER\n",
    "hints": [
      "Vérifier d’abord le port SSH (22).",
      "Exiger obligatoirement le passage par le bastion et le MFA valide pour la zone PROD."
    ],
    "examples": [
      {
        "stdin": "ACCESS_REQ id=R1 user=alice target_zone=PROD port=22 via_bastion=NON mfa_valid=OUI\nACCESS_REQ id=R2 user=alice target_zone=PROD port=22 via_bastion=OUI mfa_valid=OUI",
        "expected": "BASTION_GATEWAY req=R1 decision=DENY motif=ACCES_DIRECT_INTERDIT_PASSER_PAR_BASTION\nBASTION_GATEWAY req=R2 decision=PERMIT motif=SESSION_BASTION_VALIDEE",
        "note": "R1 tente une connexion directe non autorisée ; R2 transite par le bastion avec MFA."
      }
    ],
    "tests": [
      {
        "label": "Connexion directe avec port non SSH",
        "stdin": "cas:1",
        "expected": "BASTION_GATEWAY req=T1 decision=DENY motif=PORT_NON_ADMINISTRATIF"
      },
      {
        "label": "Échec MFA lors de la tentative de connexion au bastion",
        "stdin": "cas:2",
        "expected": "BASTION_GATEWAY req=T2 decision=DENY motif=MFA_REQUIS\nBASTION_GATEWAY req=T3 decision=PERMIT motif=AUTHENTIFICATION_BASTION_OK"
      },
      {
        "label": "Passage par bastion mais sans validation MFA vers PROD",
        "stdin": "cas:3",
        "expected": "BASTION_GATEWAY req=T4 decision=DENY motif=MFA_REQUIS"
      }
    ],
    "solution": "[Exemple]\nBASTION_GATEWAY req=R1 decision=DENY motif=ACCES_DIRECT_INTERDIT_PASSER_PAR_BASTION\nBASTION_GATEWAY req=R2 decision=PERMIT motif=SESSION_BASTION_VALIDEE\n\n[Cas 1 — Connexion directe avec port non SSH]\nBASTION_GATEWAY req=T1 decision=DENY motif=PORT_NON_ADMINISTRATIF\n\n[Cas 2 — Échec MFA lors de la tentative de connexion au bastion]\nBASTION_GATEWAY req=T2 decision=DENY motif=MFA_REQUIS\nBASTION_GATEWAY req=T3 decision=PERMIT motif=AUTHENTIFICATION_BASTION_OK\n\n[Cas 3 — Passage par bastion mais sans validation MFA vers PROD]\nBASTION_GATEWAY req=T4 decision=DENY motif=MFA_REQUIS"
  }
];
