'use strict';

module.exports = [
  {
    "id": "fw3-c1-e1",
    "chapter": 1,
    "title": "Classificateur de génération et d’architecture de pare-feu",
    "level": "n1",
    "language": "analyse",
    "goal": "Identifier la génération technologique et l’architecture d’un pare-feu selon ses capacités d’inspection.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nRègles de classification :<br>\n1. Si <code>ia_zero_day=OUI</code> et <code>couche_max=L7</code> :<br>\n   <code>GENERATION=GEN4_NGFW</code>, <code>TYPE=PAREFEU_NOUVELLE_GENERATION</code>.<br>\n2. Sinon si <code>utm_modules=OUI</code> et <code>couche_max=L7</code> :<br>\n   <code>GENERATION=GEN3_UTM</code>, <code>TYPE=GESTION_UNIFIEE_MENACES</code>.<br>\n3. Sinon si <code>suivi_etat=OUI</code> et (<code>couche_max=L4</code> ou <code>couche_max=L7</code>) :<br>\n   <code>GENERATION=GEN2_STATEFUL</code>, <code>TYPE=INSPECTION_AVEC_ETAT</code>.<br>\n4. Sinon si <code>suivi_etat=NON</code> et (<code>couche_max=L3</code> ou <code>couche_max=L4</code>) :<br>\n   <code>GENERATION=GEN1_STATELESS</code>, <code>TYPE=FILTRAGE_PAQUETS_STATIQUE</code>.<br>\n5. Sinon :<br>\n   <code>GENERATION=INDETERMINEE</code>, <code>TYPE=PASSERELLE_GENERIQUE</code>.<br><br>\nAfficher :<br>\n<code>FIREWALL_CLASS: {nom} -> {GENERATION} | {TYPE}</code></p>",
    "starter": "# Grille d'analyse (fw3-c1-e1) — Classificateur de génération et d’architecture de pare-feu\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Appliance UTM intégrée FortiGate]\n# Données : EQUIPEMENT nom=FortiGate60F couche_max=L7 suivi_etat=OUI utm_modules=OUI ia_zero_day=NON\nA_COMPLETER\n\n[Cas 2 — Pare-feu stateful classique Cisco ASA]\n# Données : EQUIPEMENT nom=CiscoASA5505 couche_max=L4 suivi_etat=OUI utm_modules=NON ia_zero_day=NON\nA_COMPLETER\n\n[Cas 3 — Routeur avec simples ACLs stateless]\n# Données : EQUIPEMENT nom=RouteurBorder couche_max=L3 suivi_etat=NON utm_modules=NON ia_zero_day=NON\nA_COMPLETER\n",
    "hints": [
      "Évaluer les critères dans l’ordre de la spécification.",
      "Extraire les arguments par découpage ou regex."
    ],
    "examples": [
      {
        "stdin": "EQUIPEMENT nom=PaloAlto5200 couche_max=L7 suivi_etat=OUI utm_modules=OUI ia_zero_day=OUI",
        "expected": "FIREWALL_CLASS: PaloAlto5200 -> GEN4_NGFW | PAREFEU_NOUVELLE_GENERATION",
        "note": "Inspection L7 avec IA et détection zero-day : 4e génération NGFW."
      }
    ],
    "tests": [
      {
        "label": "Appliance UTM intégrée FortiGate",
        "stdin": "cas:1",
        "expected": "FIREWALL_CLASS: FortiGate60F -> GEN3_UTM | GESTION_UNIFIEE_MENACES"
      },
      {
        "label": "Pare-feu stateful classique Cisco ASA",
        "stdin": "cas:2",
        "expected": "FIREWALL_CLASS: CiscoASA5505 -> GEN2_STATEFUL | INSPECTION_AVEC_ETAT"
      },
      {
        "label": "Routeur avec simples ACLs stateless",
        "stdin": "cas:3",
        "expected": "FIREWALL_CLASS: RouteurBorder -> GEN1_STATELESS | FILTRAGE_PAQUETS_STATIQUE"
      }
    ],
    "solution": "[Exemple]\nFIREWALL_CLASS: PaloAlto5200 -> GEN4_NGFW | PAREFEU_NOUVELLE_GENERATION\n\n[Cas 1 — Appliance UTM intégrée FortiGate]\nFIREWALL_CLASS: FortiGate60F -> GEN3_UTM | GESTION_UNIFIEE_MENACES\n\n[Cas 2 — Pare-feu stateful classique Cisco ASA]\nFIREWALL_CLASS: CiscoASA5505 -> GEN2_STATEFUL | INSPECTION_AVEC_ETAT\n\n[Cas 3 — Routeur avec simples ACLs stateless]\nFIREWALL_CLASS: RouteurBorder -> GEN1_STATELESS | FILTRAGE_PAQUETS_STATIQUE"
  },
  {
    "id": "fw3-c1-e2",
    "chapter": 1,
    "title": "Auditeur de séparation des zones de confiance réseau",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la légitimité des flux inter-zones selon le modèle de confiance (Trusted, Untrusted, DMZ, Management).",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nRègles fondamentales de la matrice de confiance :<br>\n1. <code>DMZ -&gt; LAN</code> : <strong>INTERDICTION ABSOLUE</strong> (violation de la règle d'or de la DMZ).<br>\n   <code>VERDICT=REJET_CRITIQUE_VIOLATION_DMZ_VERS_LAN</code>.<br>\n2. <code>WAN -&gt; LAN</code> : <strong>INTERDICTION PAR DÉFAUT</strong>.<br>\n   <code>VERDICT=REJET_SECURITE_WAN_DIRECT_VERS_LAN</code>.<br>\n3. <code>WAN -&gt; DMZ</code> : Autorisé UNIQUEMENT si port $\\in \\{80, 443\\}$ et proto=TCP.<br>\n   Si conforme : <code>VERDICT=AUTORISE_SERVICE_PUBLIC_DMZ</code>.<br>\n   Sinon : <code>VERDICT=REJET_PORT_NON_PUBLIC_DMZ</code>.<br>\n4. <code>LAN -&gt; WAN</code> ou <code>LAN -&gt; DMZ</code> : Toujours autorisé.<br>\n   <code>VERDICT=AUTORISE_FLUX_SORTANT_DEPUIS_LAN</code>.<br>\n5. <code>MGMT</code> : Seul le <code>LAN</code> peut accéder à <code>MGMT</code> sur le port 22 (SSH) ou 443 (HTTPS WebUI).<br>\n   Si $src=LAN$ et port $\\in \\{22, 443\\}$ : <code>VERDICT=AUTORISE_ADMINISTRATION_MGMT</code>.<br>\n   Sinon : <code>VERDICT=REJET_ACCES_ZONE_MGMT_RESTREINTE</code>.<br><br>\nAfficher :<br>\n<code>ZONE_AUDIT: {src_zone}->{dst_zone}:{proto}/{port} -> {VERDICT}</code></p>",
    "starter": "# Grille d'analyse (fw3-c1-e2) — Auditeur de séparation des zones de confiance réseau\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trafic web public entrant vers serveur DMZ]\n# Données : FLUX src_zone=WAN dst_zone=DMZ port=443 proto=TCP\nA_COMPLETER\n\n[Cas 2 — Tentative directe WAN vers LAN bloquée]\n# Données : FLUX src_zone=WAN dst_zone=LAN port=22 proto=TCP\nA_COMPLETER\n\n[Cas 3 — Administration légitime depuis LAN vers MGMT]\n# Données : FLUX src_zone=LAN dst_zone=MGMT port=22 proto=TCP\nA_COMPLETER\n",
    "hints": [
      "Traiter en priorité l’interdiction absolue de DMZ vers LAN.",
      "Valider les ports autorisés vers la DMZ et vers MGMT."
    ],
    "examples": [
      {
        "stdin": "FLUX src_zone=DMZ dst_zone=LAN port=3306 proto=TCP",
        "expected": "ZONE_AUDIT: DMZ->LAN:TCP/3306 -> REJET_CRITIQUE_VIOLATION_DMZ_VERS_LAN",
        "note": "Une machine de la DMZ compromise ne doit JAMAIS initier de flux vers le LAN interne."
      }
    ],
    "tests": [
      {
        "label": "Trafic web public entrant vers serveur DMZ",
        "stdin": "cas:1",
        "expected": "ZONE_AUDIT: WAN->DMZ:TCP/443 -> AUTORISE_SERVICE_PUBLIC_DMZ"
      },
      {
        "label": "Tentative directe WAN vers LAN bloquée",
        "stdin": "cas:2",
        "expected": "ZONE_AUDIT: WAN->LAN:TCP/22 -> REJET_SECURITE_WAN_DIRECT_VERS_LAN"
      },
      {
        "label": "Administration légitime depuis LAN vers MGMT",
        "stdin": "cas:3",
        "expected": "ZONE_AUDIT: LAN->MGMT:TCP/22 -> AUTORISE_ADMINISTRATION_MGMT"
      }
    ],
    "solution": "[Exemple]\nZONE_AUDIT: DMZ->LAN:TCP/3306 -> REJET_CRITIQUE_VIOLATION_DMZ_VERS_LAN\n\n[Cas 1 — Trafic web public entrant vers serveur DMZ]\nZONE_AUDIT: WAN->DMZ:TCP/443 -> AUTORISE_SERVICE_PUBLIC_DMZ\n\n[Cas 2 — Tentative directe WAN vers LAN bloquée]\nZONE_AUDIT: WAN->LAN:TCP/22 -> REJET_SECURITE_WAN_DIRECT_VERS_LAN\n\n[Cas 3 — Administration légitime depuis LAN vers MGMT]\nZONE_AUDIT: LAN->MGMT:TCP/22 -> AUTORISE_ADMINISTRATION_MGMT"
  },
  {
    "id": "fw3-c1-e3",
    "chapter": 1,
    "title": "Moteur de filtrage de paquets sans état (Stateless Packet Filter)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler un pare-feu statique de première génération appliquant une liste de règles IP/Port indépendantes.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nLigne finale de paquet :<br>\n<code>PACKET src=&lt;IP&gt; dst=&lt;IP&gt; proto=&lt;TCP|UDP|ICMP&gt; dport=&lt;N&gt;</code>.<br><br>\nPrincipe d'évaluation :<br>\n- Parcourir les règles dans l'ordre d'apparition (First Match Wins).<br>\n- Un paquet concorde avec une règle si tous les champs spécifiés correspondent (<code>ANY</code> concorde avec tout).<br>\n- Dès qu'une règle concorde, l'action de cette règle est appliquée immédiatement.<br>\n- Si aucune règle ne concorde : appliquer la politique par défaut <code>DEFAULT_DROP (AUCUNE_REGLE)</code>.<br><br>\nAfficher :<br>\n<code>PACKET_DECISION: {action} (MATCH_RULE={id_ou_NONE}) -> {src}:{proto}/{dport}->{dst}</code></p>",
    "starter": "# Grille d'analyse (fw3-c1-e3) — Moteur de filtrage de paquets sans état (Stateless Packet Filter)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Paquet bloqué par règle drop explicite]\n# Données : RULE id=10 src=203.0.113.5 dst=ANY proto=ANY dport=ANY action=DROP\n# Données : RULE id=20 src=ANY dst=ANY proto=TCP dport=22 action=ACCEPT\n# Données : PACKET src=203.0.113.5 dst=192.168.1.1 proto=TCP dport=22\nA_COMPLETER\n\n[Cas 2 — Paquet tombant sur la politique par défaut]\n# Données : RULE id=100 src=192.168.1.0/24 dst=ANY proto=UDP dport=53 action=ACCEPT\n# Données : PACKET src=10.0.0.1 dst=8.8.8.8 proto=TCP dport=80\nA_COMPLETER\n\n[Cas 3 — Règle Reject avec code d’erreur simulé]\n# Données : RULE id=50 src=ANY dst=192.168.1.254 proto=TCP dport=23 action=REJECT\n# Données : RULE id=60 src=ANY dst=ANY proto=ANY dport=ANY action=DROP\n# Données : PACKET src=172.16.0.4 dst=192.168.1.254 proto=TCP dport=23\nA_COMPLETER\n",
    "hints": [
      "Gérer ANY comme joker universel sur chaque critère.",
      "Arrêter l’évaluation dès la première règle correspondante."
    ],
    "examples": [
      {
        "stdin": "RULE id=1 src=ANY dst=192.168.1.10 proto=TCP dport=80 action=ACCEPT\nRULE id=2 src=ANY dst=192.168.1.10 proto=TCP dport=443 action=ACCEPT\nRULE id=3 src=ANY dst=ANY proto=ANY dport=ANY action=DROP\nPACKET src=10.0.0.5 dst=192.168.1.10 proto=TCP dport=80",
        "expected": "PACKET_DECISION: ACCEPT (MATCH_RULE=1) -> 10.0.0.5:TCP/80->192.168.1.10",
        "note": "Le paquet concorde avec la règle 1 (port 80) : action ACCEPT immédiate."
      }
    ],
    "tests": [
      {
        "label": "Paquet bloqué par règle drop explicite",
        "stdin": "cas:1",
        "expected": "PACKET_DECISION: DROP (MATCH_RULE=10) -> 203.0.113.5:TCP/22->192.168.1.1"
      },
      {
        "label": "Paquet tombant sur la politique par défaut",
        "stdin": "cas:2",
        "expected": "PACKET_DECISION: DEFAULT_DROP (MATCH_RULE=NONE) -> 10.0.0.1:TCP/80->8.8.8.8"
      },
      {
        "label": "Règle Reject avec code d’erreur simulé",
        "stdin": "cas:3",
        "expected": "PACKET_DECISION: REJECT (MATCH_RULE=50) -> 172.16.0.4:TCP/23->192.168.1.254"
      }
    ],
    "solution": "[Exemple]\nPACKET_DECISION: ACCEPT (MATCH_RULE=1) -> 10.0.0.5:TCP/80->192.168.1.10\n\n[Cas 1 — Paquet bloqué par règle drop explicite]\nPACKET_DECISION: DROP (MATCH_RULE=10) -> 203.0.113.5:TCP/22->192.168.1.1\n\n[Cas 2 — Paquet tombant sur la politique par défaut]\nPACKET_DECISION: DEFAULT_DROP (MATCH_RULE=NONE) -> 10.0.0.1:TCP/80->8.8.8.8\n\n[Cas 3 — Règle Reject avec code d’erreur simulé]\nPACKET_DECISION: REJECT (MATCH_RULE=50) -> 172.16.0.4:TCP/23->192.168.1.254"
  }
];
