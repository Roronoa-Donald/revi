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
  },
  {
    "id": "fw3-c2-e1",
    "chapter": 2,
    "title": "Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le moteur conntrack de suivi de sessions TCP selon la RFC 793 et classifier les paquets reçus.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nRègles de transition d'état conntrack par session identifiée par son quadruplet bidirectionnel <code>{min(ip1:p1, ip2:p2) &lt;-&gt; max(ip1:p1, ip2:p2)}</code> :<br>\n1. Un premier paquet avec <code>flags=SYN</code> initie une session : état = <code>NEW</code> (phase de négociation).<br>\n2. La réponse avec <code>flags=SYN_ACK</code> dans le sens inverse : état = <code>NEW</code> (attente du handshake 3-voies).<br>\n3. Le paquet de confirmation avec <code>flags=ACK</code> clôture le handshake : la session devient <code>ESTABLISHED</code>.<br>\n4. Tout paquet ultérieur (<code>DATA</code>, <code>ACK</code>) sur une session connue en <code>ESTABLISHED</code> : état = <code>ESTABLISHED</code>.<br>\n5. Un paquet <code>FIN</code> ou <code>RST</code> sur une session <code>ESTABLISHED</code> est classifié <code>ESTABLISHED</code> et ferme la session (supprimée de la table après traitement).<br>\n6. Tout paquet (<code>ACK</code>, <code>DATA</code>, <code>FIN</code>, <code>RST</code>, <code>SYN_ACK</code>) reçu hors d'une session active ou sans handshake préalable est classifié <code>INVALID</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>CONNTRACK id={id} state={NEW|ESTABLISHED|INVALID}</code></p>",
    "starter": "# Grille d'analyse (fw3-c2-e1) — Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Paquet DATA légitime après handshake puis fermeture FIN]\n# Données : PACKET id=1 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=SYN\n# Données : PACKET id=2 src=203.0.113.1 dst=10.0.0.5 sport=443 dport=4000 flags=SYN_ACK\n# Données : PACKET id=3 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=ACK\n# Données : PACKET id=4 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=DATA\n# Données : PACKET id=5 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=FIN\n# Données : PACKET id=6 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=DATA\nA_COMPLETER\n\n[Cas 2 — Attaque par paquets orphelins ACK et RST sans handshake]\n# Données : PACKET id=10 src=198.51.100.22 dst=10.0.0.1 sport=60000 dport=22 flags=ACK\n# Données : PACKET id=11 src=198.51.100.22 dst=10.0.0.1 sport=60000 dport=22 flags=RST\nA_COMPLETER\n\n[Cas 3 — Multiples sessions concurrentes avec rejet hors session]\n# Données : PACKET id=A1 src=10.1.1.1 dst=8.8.8.8 sport=1000 dport=53 flags=SYN\n# Données : PACKET id=B1 src=10.2.2.2 dst=1.1.1.1 sport=2000 dport=80 flags=SYN\n# Données : PACKET id=A2 src=8.8.8.8 dst=10.1.1.1 sport=53 dport=1000 flags=SYN_ACK\n# Données : PACKET id=A3 src=10.1.1.1 dst=8.8.8.8 sport=1000 dport=53 flags=ACK\n# Données : PACKET id=C1 src=172.16.0.4 dst=10.1.1.1 sport=3000 dport=22 flags=DATA\nA_COMPLETER\n",
    "hints": [
      "Normaliser la clé de session pour identifier la connexion dans les deux sens.",
      "Suivre les étapes du handshake : SYN -> SYN_ACK -> ACK avant de passer en ESTABLISHED."
    ],
    "examples": [
      {
        "stdin": "PACKET id=1 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=SYN\nPACKET id=2 src=192.168.1.10 dst=10.0.0.2 sport=80 dport=54321 flags=SYN_ACK\nPACKET id=3 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=ACK",
        "expected": "CONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED",
        "note": "Handshake complet à 3 voies TCP."
      }
    ],
    "tests": [
      {
        "label": "Paquet DATA légitime après handshake puis fermeture FIN",
        "stdin": "cas:1",
        "expected": "CONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED\nCONNTRACK id=4 state=ESTABLISHED\nCONNTRACK id=5 state=ESTABLISHED\nCONNTRACK id=6 state=INVALID"
      },
      {
        "label": "Attaque par paquets orphelins ACK et RST sans handshake",
        "stdin": "cas:2",
        "expected": "CONNTRACK id=10 state=INVALID\nCONNTRACK id=11 state=INVALID"
      },
      {
        "label": "Multiples sessions concurrentes avec rejet hors session",
        "stdin": "cas:3",
        "expected": "CONNTRACK id=A1 state=NEW\nCONNTRACK id=B1 state=NEW\nCONNTRACK id=A2 state=NEW\nCONNTRACK id=A3 state=ESTABLISHED\nCONNTRACK id=C1 state=INVALID"
      }
    ],
    "solution": "[Exemple]\nCONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED\n\n[Cas 1 — Paquet DATA légitime après handshake puis fermeture FIN]\nCONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED\nCONNTRACK id=4 state=ESTABLISHED\nCONNTRACK id=5 state=ESTABLISHED\nCONNTRACK id=6 state=INVALID\n\n[Cas 2 — Attaque par paquets orphelins ACK et RST sans handshake]\nCONNTRACK id=10 state=INVALID\nCONNTRACK id=11 state=INVALID\n\n[Cas 3 — Multiples sessions concurrentes avec rejet hors session]\nCONNTRACK id=A1 state=NEW\nCONNTRACK id=B1 state=NEW\nCONNTRACK id=A2 state=NEW\nCONNTRACK id=A3 state=ESTABLISHED\nCONNTRACK id=C1 state=INVALID"
  },
  {
    "id": "fw3-c2-e2",
    "chapter": 2,
    "title": "Purge et gestion des délais d’expiration (Timeouts) conntrack",
    "level": "n2",
    "language": "analyse",
    "goal": "Gérer la durée de vie des entrées conntrack selon le protocole et leur dernier timestamp d’activité.",
    "brief": "<p>Un pare-feu stateful alloue de la mémoire pour chaque session. Pour prévenir l'épuisement de la RAM, les entrées inactives doivent expirer selon des délais stricts (RFC et bonnes pratiques Linux netfilter) :<br>\n- <code>TCP:ESTABLISHED</code> : timeout = <code>3600</code> secondes.<br>\n- <code>TCP:SYN_SENT</code> : timeout = <code>60</code> secondes.<br>\n- <code>UDP:GENERIC</code> : timeout = <code>30</code> secondes.<br>\n- <code>ICMP:ECHO</code> : timeout = <code>10</code> secondes.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Des entrées de session : <code>SESSION id=&lt;id&gt; proto=&lt;TCP|UDP|ICMP&gt; state=&lt;state&gt; last_seen=&lt;secondes&gt;</code>.<br>\n2. Une commande finale : <code>PURGE now=&lt;secondes&gt;</code>.<br><br>\nUne session expire si <code>(now - last_seen) &gt; timeout</code>.<br>\nIndiquez pour chaque cas la liste des sessions purgées dans l'ordre de leur déclaration, puis le nombre restant :<br>\n<code>PURGED: {id1}, {id2}, ...</code> (ou <code>PURGED: NONE</code> si aucune)<br>\n<code>REMAINING: {nb_restantes} sessions actives</code></p>",
    "starter": "# Grille d'analyse (fw3-c2-e2) — Purge et gestion des délais d’expiration (Timeouts) conntrack\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sessions mixtes avec conservation ICMP active et TCP expirés]\n# Données : SESSION id=S10 proto=TCP state=ESTABLISHED last_seen=3000\n# Données : SESSION id=S11 proto=ICMP state=ECHO last_seen=7195\n# Données : SESSION id=S12 proto=TCP state=SYN_SENT last_seen=7100\n# Données : PURGE now=7200\nA_COMPLETER\n\n[Cas 2 — Aucune session expirée]\n# Données : SESSION id=A1 proto=TCP state=ESTABLISHED last_seen=1000\n# Données : SESSION id=A2 proto=UDP state=GENERIC last_seen=1020\n# Données : PURGE now=1030\nA_COMPLETER\n\n[Cas 3 — Toutes les sessions conservées et expirées en chaîne]\n# Données : SESSION id=U1 proto=UDP state=GENERIC last_seen=100\n# Données : SESSION id=T1 proto=TCP state=SYN_SENT last_seen=100\n# Données : SESSION id=I1 proto=ICMP state=ECHO last_seen=100\n# Données : PURGE now=200\nA_COMPLETER\n",
    "hints": [
      "Associer chaque couple (proto, state) à sa durée limite.",
      "Calculer l’inactivité : now - last_seen."
    ],
    "examples": [
      {
        "stdin": "SESSION id=S1 proto=TCP state=ESTABLISHED last_seen=1000\nSESSION id=S2 proto=UDP state=GENERIC last_seen=4800\nPURGE now=5000",
        "expected": "PURGED: S1, S2\nREMAINING: 0 sessions actives",
        "note": "S1 inactive depuis 4000s (> 3600s) et S2 inactive depuis 200s (> 30s) : toutes purgées."
      }
    ],
    "tests": [
      {
        "label": "Sessions mixtes avec conservation ICMP active et TCP expirés",
        "stdin": "cas:1",
        "expected": "PURGED: S10, S12\nREMAINING: 1 sessions actives"
      },
      {
        "label": "Aucune session expirée",
        "stdin": "cas:2",
        "expected": "PURGED: NONE\nREMAINING: 2 sessions actives"
      },
      {
        "label": "Toutes les sessions conservées et expirées en chaîne",
        "stdin": "cas:3",
        "expected": "PURGED: U1, T1, I1\nREMAINING: 0 sessions actives"
      }
    ],
    "solution": "[Exemple]\nPURGED: S1, S2\nREMAINING: 0 sessions actives\n\n[Cas 1 — Sessions mixtes avec conservation ICMP active et TCP expirés]\nPURGED: S10, S12\nREMAINING: 1 sessions actives\n\n[Cas 2 — Aucune session expirée]\nPURGED: NONE\nREMAINING: 2 sessions actives\n\n[Cas 3 — Toutes les sessions conservées et expirées en chaîne]\nPURGED: U1, T1, I1\nREMAINING: 0 sessions actives"
  },
  {
    "id": "fw3-c2-e3",
    "chapter": 2,
    "title": "Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les combinaisons illégales de flags TCP caractéristiques des outils de reconnaissance furtive.",
    "brief": "<p>Les attaquants exploitent les spécifications de la RFC 793 pour contourner les pare-feux stateless et cartographier les ports ouverts via des combinaisons atypiques de flags TCP.<br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles d'analyse et de classification :<br>\n1. <code>SYN,FIN</code> : Paquet contradictoire demandant l'ouverture et la fermeture simultanées -> <code>SYN_FIN_ANOMALY</code> (Danger élevé).<br>\n2. <code>FIN,PSH,URG</code> (dans n'importe quel ordre) : Arbre de Noël allumé -> <code>XMAS_TREE_SCAN</code> (Sonde Nmap -sX).<br>\n3. <code>NONE</code> (aucun flag activé) : Paquet fantôme -> <code>NULL_SCAN</code> (Sonde Nmap -sN).<br>\n4. Uniquement <code>FIN</code> : Paquet de fin isolé sans handshake -> <code>FIN_SCAN</code> (Sonde Nmap -sF).<br>\n5. Toute autre combinaison standard (ex: <code>SYN</code> seul, <code>ACK</code> seul, <code>SYN,ACK</code>) -> <code>TRAFIC_STANDARD</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>SCAN_ALERT: {src} -> {dst}:{dport} [{flags}] => {CLASSIFICATION}</code></p>",
    "starter": "# Grille d'analyse (fw3-c2-e3) — Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection Null scan et Syn-Fin anomaly]\n# Données : PROBE src=198.51.100.5 dst=10.0.0.10 dport=80 flags=NONE\n# Données : PROBE src=198.51.100.6 dst=10.0.0.10 dport=443 flags=SYN,FIN\nA_COMPLETER\n\n[Cas 2 — Détection FIN scan isolé et trafic standard]\n# Données : PROBE src=203.0.113.8 dst=10.0.0.2 dport=3306 flags=FIN\n# Données : PROBE src=10.0.0.20 dst=172.16.0.5 dport=80 flags=SYN\nA_COMPLETER\n\n[Cas 3 — Variante Xmas scan avec ordre désordonné des flags]\n# Données : PROBE src=192.0.2.1 dst=192.168.1.1 dport=8080 flags=URG,FIN,PSH\nA_COMPLETER\n",
    "hints": [
      "Découper la chaîne flags par virgule et manipuler un set de flags.",
      "Comparer les ensembles pour gérer l’ordre des flags dans Xmas Scan."
    ],
    "examples": [
      {
        "stdin": "PROBE src=192.168.1.100 dst=10.0.0.1 dport=22 flags=FIN,PSH,URG",
        "expected": "SCAN_ALERT: 192.168.1.100 -> 10.0.0.1:22 [FIN,PSH,URG] => XMAS_TREE_SCAN",
        "note": "Sonde de type Xmas Scan avec FIN, PSH et URG actifs."
      }
    ],
    "tests": [
      {
        "label": "Détection Null scan et Syn-Fin anomaly",
        "stdin": "cas:1",
        "expected": "SCAN_ALERT: 198.51.100.5 -> 10.0.0.10:80 [NONE] => NULL_SCAN\nSCAN_ALERT: 198.51.100.6 -> 10.0.0.10:443 [SYN,FIN] => SYN_FIN_ANOMALY"
      },
      {
        "label": "Détection FIN scan isolé et trafic standard",
        "stdin": "cas:2",
        "expected": "SCAN_ALERT: 203.0.113.8 -> 10.0.0.2:3306 [FIN] => FIN_SCAN\nSCAN_ALERT: 10.0.0.20 -> 172.16.0.5:80 [SYN] => TRAFIC_STANDARD"
      },
      {
        "label": "Variante Xmas scan avec ordre désordonné des flags",
        "stdin": "cas:3",
        "expected": "SCAN_ALERT: 192.0.2.1 -> 192.168.1.1:8080 [URG,FIN,PSH] => XMAS_TREE_SCAN"
      }
    ],
    "solution": "[Exemple]\nSCAN_ALERT: 192.168.1.100 -> 10.0.0.1:22 [FIN,PSH,URG] => XMAS_TREE_SCAN\n\n[Cas 1 — Détection Null scan et Syn-Fin anomaly]\nSCAN_ALERT: 198.51.100.5 -> 10.0.0.10:80 [NONE] => NULL_SCAN\nSCAN_ALERT: 198.51.100.6 -> 10.0.0.10:443 [SYN,FIN] => SYN_FIN_ANOMALY\n\n[Cas 2 — Détection FIN scan isolé et trafic standard]\nSCAN_ALERT: 203.0.113.8 -> 10.0.0.2:3306 [FIN] => FIN_SCAN\nSCAN_ALERT: 10.0.0.20 -> 172.16.0.5:80 [SYN] => TRAFIC_STANDARD\n\n[Cas 3 — Variante Xmas scan avec ordre désordonné des flags]\nSCAN_ALERT: 192.0.2.1 -> 192.168.1.1:8080 [URG,FIN,PSH] => XMAS_TREE_SCAN"
  },
  {
    "id": "fw3-c3-e1",
    "chapter": 3,
    "title": "Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter le moteur séquentiel d’évaluation des règles de filtrage avec politique de refus par défaut.",
    "brief": "<p>Dans un pare-feu réseau, les listes de contrôle d'accès (ACL) sont lues séquentiellement de haut en bas : la <strong>première règle qui correspond</strong> au paquet détermine son sort (<code>First-Match-Wins</code>). Si aucune règle ne correspond, la politique de sécurité implicite applique un refus (<code>DEFAULT_DROP</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas. Des règles ordonnées :<br>\n<code>RULE id=&lt;id&gt; action=&lt;PERMIT|DENY&gt; proto=&lt;TCP|UDP|ICMP|ANY&gt; src=&lt;ip|ANY&gt; dst=&lt;ip|ANY&gt; dport=&lt;port|ANY&gt;</code>.<br>\n2. Des paquets à évaluer :<br>\n<code>PACKET id=&lt;pid&gt; proto=&lt;proto&gt; src=&lt;ip&gt; dst=&lt;ip&gt; dport=&lt;port&gt;</code>.<br><br>\nPour chaque paquet, afficher :<br>\n<code>EVAL packet={pid} action={PERMIT|DENY} matched={rule_id|DEFAULT_DROP}</code></p>",
    "starter": "# Grille d'analyse (fw3-c3-e1) — Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Paquet ne correspondant à aucune règle menant au DEFAULT_DROP]\n# Données : RULE id=R10 action=PERMIT proto=UDP src=10.0.0.1 dst=8.8.8.8 dport=53\n# Données : PACKET id=P3 proto=TCP src=10.0.0.1 dst=8.8.8.8 dport=53\nA_COMPLETER\n\n[Cas 2 — Filtrage par adresses IP spécifiques et ANY sur le port]\n# Données : RULE id=ADM1 action=PERMIT proto=TCP src=192.168.1.100 dst=10.0.0.1 dport=22\n# Données : RULE id=BLOCK_ADM action=DENY proto=TCP src=ANY dst=10.0.0.1 dport=22\n# Données : RULE id=WEB action=PERMIT proto=TCP src=ANY dst=ANY dport=80\n# Données : PACKET id=T1 proto=TCP src=192.168.1.100 dst=10.0.0.1 dport=22\n# Données : PACKET id=T2 proto=TCP src=192.168.1.105 dst=10.0.0.1 dport=22\n# Données : PACKET id=T3 proto=TCP src=192.168.1.105 dst=172.16.0.2 dport=80\nA_COMPLETER\n\n[Cas 3 — Protocole ICMP sans numéro de port]\n# Données : RULE id=PING action=PERMIT proto=ICMP src=ANY dst=10.0.0.1 dport=ANY\n# Données : PACKET id=IC1 proto=ICMP src=192.168.1.20 dst=10.0.0.1 dport=0\n# Données : PACKET id=IC2 proto=ICMP src=192.168.1.20 dst=10.0.0.2 dport=0\nA_COMPLETER\n",
    "hints": [
      "Stocker les règles dans une liste ordonnée.",
      "Pour chaque critère, une valeur ANY correspond toujours à toute valeur du paquet.",
      "S’arrêter dès la première règle correspondante."
    ],
    "examples": [
      {
        "stdin": "RULE id=R1 action=PERMIT proto=TCP src=ANY dst=10.0.0.10 dport=443\nRULE id=R2 action=DENY proto=ANY src=ANY dst=10.0.0.10 dport=ANY\nPACKET id=P1 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=443\nPACKET id=P2 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=22",
        "expected": "EVAL packet=P1 action=PERMIT matched=R1\nEVAL packet=P2 action=DENY matched=R2",
        "note": "P1 matche R1 en premier (PERMIT), P2 ne matche pas R1 mais matche R2 (DENY)."
      }
    ],
    "tests": [
      {
        "label": "Paquet ne correspondant à aucune règle menant au DEFAULT_DROP",
        "stdin": "cas:1",
        "expected": "EVAL packet=P3 action=DENY matched=DEFAULT_DROP"
      },
      {
        "label": "Filtrage par adresses IP spécifiques et ANY sur le port",
        "stdin": "cas:2",
        "expected": "EVAL packet=T1 action=PERMIT matched=ADM1\nEVAL packet=T2 action=DENY matched=BLOCK_ADM\nEVAL packet=T3 action=PERMIT matched=WEB"
      },
      {
        "label": "Protocole ICMP sans numéro de port",
        "stdin": "cas:3",
        "expected": "EVAL packet=IC1 action=PERMIT matched=PING\nEVAL packet=IC2 action=DENY matched=DEFAULT_DROP"
      }
    ],
    "solution": "[Exemple]\nEVAL packet=P1 action=PERMIT matched=R1\nEVAL packet=P2 action=DENY matched=R2\n\n[Cas 1 — Paquet ne correspondant à aucune règle menant au DEFAULT_DROP]\nEVAL packet=P3 action=DENY matched=DEFAULT_DROP\n\n[Cas 2 — Filtrage par adresses IP spécifiques et ANY sur le port]\nEVAL packet=T1 action=PERMIT matched=ADM1\nEVAL packet=T2 action=DENY matched=BLOCK_ADM\nEVAL packet=T3 action=PERMIT matched=WEB\n\n[Cas 3 — Protocole ICMP sans numéro de port]\nEVAL packet=IC1 action=PERMIT matched=PING\nEVAL packet=IC2 action=DENY matched=DEFAULT_DROP"
  },
  {
    "id": "fw3-c3-e2",
    "chapter": 3,
    "title": "Détecteur d’anomalies et masquage de règles (Rule Shadowing)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser une politique de sécurité pour détecter les règles masquées (shadowed) ou redondantes.",
    "brief": "<p>Une anomalie fréquente dans les jeux de règles de pare-feu est le <strong>masquage de règle</strong> (<em>Shadowing</em>) : une règle antérieure <code>R1</code> est plus générale ou identique à une règle suivante <code>R2</code>, rendant <code>R2</code> totalement inaccessible.<br><br>\nCritères simplifiés pour que R1 masque R2 (R1 placée avant R2) :<br>\n- Protocole : <code>R1.proto == R2.proto</code> ou <code>R1.proto == 'ANY'</code>.<br>\n- Source : <code>R1.src == R2.src</code> ou <code>R1.src == 'ANY'</code>.<br>\n- Destination : <code>R1.dst == R2.dst</code> ou <code>R1.dst == 'ANY'</code>.<br>\n- Port destination : <code>R1.dport == R2.dport</code> ou <code>R1.dport == 'ANY'</code>.<br><br>\nSi ces 4 conditions d'inclusion sont réunies pour au moins une règle antérieure R1 :<br>\n- Si <code>R1.action != R2.action</code> : R2 est masquée et son action ne s'appliquera jamais -> <code>SHADOWED by {R1.id}</code>.<br>\n- Si <code>R1.action == R2.action</code> : R2 est redondante et inutile -> <code>REDUNDANT with {R1.id}</code>.<br>\n- Sinon : la règle est active et valide -> <code>OK</code>.<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPour chaque règle déclarée, afficher :<br>\n<code>ANALYZE rule={id} status={OK | SHADOWED by {r1} | REDUNDANT with {r1}}</code></p>",
    "starter": "# Grille d'analyse (fw3-c3-e2) — Détecteur d’anomalies et masquage de règles (Rule Shadowing)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection d’une redondance parfaite entre deux règles]\n# Données : RULE id=R1 action=PERMIT proto=TCP src=ANY dst=10.0.0.5 dport=443\n# Données : RULE id=R2 action=PERMIT proto=TCP src=192.168.1.1 dst=10.0.0.5 dport=443\n# Données : RULE id=R3 action=PERMIT proto=TCP src=ANY dst=10.0.0.5 dport=80\nA_COMPLETER\n\n[Cas 2 — Règles spécifiques d’abord puis règle générale : politique saine]\n# Données : RULE id=R1 action=PERMIT proto=TCP src=10.0.0.50 dst=10.0.0.1 dport=22\n# Données : RULE id=R2 action=DENY proto=TCP src=ANY dst=10.0.0.1 dport=22\n# Données : RULE id=R3 action=PERMIT proto=TCP src=ANY dst=ANY dport=80\nA_COMPLETER\n\n[Cas 3 — Multiples masquages en cascade]\n# Données : RULE id=A1 action=DENY proto=TCP src=ANY dst=ANY dport=22\n# Données : RULE id=A2 action=PERMIT proto=TCP src=192.168.1.1 dst=ANY dport=22\n# Données : RULE id=A3 action=DENY proto=TCP src=192.168.1.2 dst=ANY dport=22\nA_COMPLETER\n",
    "hints": [
      "Parcourir chaque règle i et vérifier si une règle j antérieure (j < i) englobe tous ses critères.",
      "S’arrêter au premier antécédent j qui englobe la règle i."
    ],
    "examples": [
      {
        "stdin": "RULE id=R1 action=DENY proto=ANY src=ANY dst=ANY dport=ANY\nRULE id=R2 action=PERMIT proto=TCP src=10.0.0.1 dst=10.0.0.2 dport=80",
        "expected": "ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=SHADOWED by R1",
        "note": "R1 bloque tout le trafic, donc R2 située après ne sera jamais atteinte."
      }
    ],
    "tests": [
      {
        "label": "Détection d’une redondance parfaite entre deux règles",
        "stdin": "cas:1",
        "expected": "ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=REDUNDANT with R1\nANALYZE rule=R3 status=OK"
      },
      {
        "label": "Règles spécifiques d’abord puis règle générale : politique saine",
        "stdin": "cas:2",
        "expected": "ANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=OK\nANALYZE rule=R3 status=OK"
      },
      {
        "label": "Multiples masquages en cascade",
        "stdin": "cas:3",
        "expected": "ANALYZE rule=A1 status=OK\nANALYZE rule=A2 status=SHADOWED by A1\nANALYZE rule=A3 status=REDUNDANT with A1"
      }
    ],
    "solution": "[Exemple]\nANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=SHADOWED by R1\n\n[Cas 1 — Détection d’une redondance parfaite entre deux règles]\nANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=REDUNDANT with R1\nANALYZE rule=R3 status=OK\n\n[Cas 2 — Règles spécifiques d’abord puis règle générale : politique saine]\nANALYZE rule=R1 status=OK\nANALYZE rule=R2 status=OK\nANALYZE rule=R3 status=OK\n\n[Cas 3 — Multiples masquages en cascade]\nANALYZE rule=A1 status=OK\nANALYZE rule=A2 status=SHADOWED by A1\nANALYZE rule=A3 status=REDUNDANT with A1"
  },
  {
    "id": "fw3-c3-e3",
    "chapter": 3,
    "title": "Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler les translations SNAT pour le trafic sortant et DNAT (Port Forwarding) pour le trafic entrant.",
    "brief": "<p>Le mécanisme NAT (Network Address Translation) permet de masquer le plan d'adressage privé ou d'exposer des services internes.<br><br>\nAnalysez les données fournies pour chaque cas. Configuration SNAT :<br>\n<code>CONFIG_SNAT public_ip=&lt;ip&gt; start_port=&lt;p&gt;</code> (alloue les ports sortants séquentiellement : start_port, start_port+1, ...).<br>\n2. Règles DNAT :<br>\n<code>CONFIG_DNAT ext_ip=&lt;ip&gt; ext_port=&lt;p&gt; int_ip=&lt;ip&gt; int_port=&lt;p&gt;</code>.<br>\n3. Paquets réseau :<br>\n<code>PACKET dir=&lt;OUTBOUND|INBOUND&gt; src=&lt;ip:port&gt; dst=&lt;ip:port&gt;</code>.<br><br>\nRègles de translation :<br>\n- <code>OUTBOUND</code> (LAN vers Internet) : applique le SNAT.<br>\n  L'IP et le port source privés <code>src</code> sont remplacés par <code>public_ip:alloué</code>. La destination <code>dst</code> reste inchangée. L'association inverse est mémorisée dans la table d'état.<br>\n- <code>INBOUND</code> (Internet vers LAN) :<br>\n  a) Si <code>dst</code> correspond à une règle <code>CONFIG_DNAT</code> : la destination <code>dst</code> est réécrite vers <code>int_ip:int_port</code>.<br>\n  b) Sinon si <code>dst</code> correspond au port alloué d'une session SNAT existante : la destination <code>dst</code> est restaurée vers l'IP:port interne de l'hôte LAN.<br>\n  c) Sinon : le paquet n'est pas translaté (<code>DROP_NO_ROUTE</code>).<br><br>\nPour chaque paquet, afficher :<br>\n<code>NAT dir={dir} in={src_in}->{dst_in} out={src_out}->{dst_out}</code><br>\n(ou <code>NAT dir={dir} in={src_in}->{dst_in} out=DROP_NO_ROUTE</code> si rejet)</p>",
    "starter": "# Grille d'analyse (fw3-c3-e3) — Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — DNAT Port Forwarding entrant vers serveur web DMZ]\n# Données : CONFIG_DNAT ext_ip=198.51.100.1 ext_port=80 int_ip=10.0.0.10 int_port=8080\n# Données : PACKET dir=INBOUND src=203.0.113.5:12345 dst=198.51.100.1:80\nA_COMPLETER\n\n[Cas 2 — Aller-retour complet : SNAT sortant puis réponse retour]\n# Données : CONFIG_SNAT public_ip=198.51.100.1 start_port=50000\n# Données : PACKET dir=OUTBOUND src=192.168.1.10:4500 dst=8.8.8.8:53\n# Données : PACKET dir=INBOUND src=8.8.8.8:53 dst=198.51.100.1:50000\nA_COMPLETER\n\n[Cas 3 — Paquet entrant sans DNAT ni session SNAT correspondante]\n# Données : CONFIG_SNAT public_ip=198.51.100.1 start_port=40000\n# Données : PACKET dir=INBOUND src=1.2.3.4:9999 dst=198.51.100.1:22\nA_COMPLETER\n",
    "hints": [
      "Gérer un compteur incrémental pour les ports SNAT dynamiques.",
      "Mémoriser les sessions SNAT : port_alloué -> (src_interne_ip, src_interne_port)."
    ],
    "examples": [
      {
        "stdin": "CONFIG_SNAT public_ip=198.51.100.1 start_port=40000\nPACKET dir=OUTBOUND src=192.168.1.50:52001 dst=93.184.216.34:80",
        "expected": "NAT dir=OUTBOUND in=192.168.1.50:52001->93.184.216.34:80 out=198.51.100.1:40000->93.184.216.34:80",
        "note": "Translation SNAT avec réécriture de la source vers l’IP publique et premier port alloué 40000."
      }
    ],
    "tests": [
      {
        "label": "DNAT Port Forwarding entrant vers serveur web DMZ",
        "stdin": "cas:1",
        "expected": "NAT dir=INBOUND in=203.0.113.5:12345->198.51.100.1:80 out=203.0.113.5:12345->10.0.0.10:8080"
      },
      {
        "label": "Aller-retour complet : SNAT sortant puis réponse retour",
        "stdin": "cas:2",
        "expected": "NAT dir=OUTBOUND in=192.168.1.10:4500->8.8.8.8:53 out=198.51.100.1:50000->8.8.8.8:53\nNAT dir=INBOUND in=8.8.8.8:53->198.51.100.1:50000 out=8.8.8.8:53->192.168.1.10:4500"
      },
      {
        "label": "Paquet entrant sans DNAT ni session SNAT correspondante",
        "stdin": "cas:3",
        "expected": "NAT dir=INBOUND in=1.2.3.4:9999->198.51.100.1:22 out=DROP_NO_ROUTE"
      }
    ],
    "solution": "[Exemple]\nNAT dir=OUTBOUND in=192.168.1.50:52001->93.184.216.34:80 out=198.51.100.1:40000->93.184.216.34:80\n\n[Cas 1 — DNAT Port Forwarding entrant vers serveur web DMZ]\nNAT dir=INBOUND in=203.0.113.5:12345->198.51.100.1:80 out=203.0.113.5:12345->10.0.0.10:8080\n\n[Cas 2 — Aller-retour complet : SNAT sortant puis réponse retour]\nNAT dir=OUTBOUND in=192.168.1.10:4500->8.8.8.8:53 out=198.51.100.1:50000->8.8.8.8:53\nNAT dir=INBOUND in=8.8.8.8:53->198.51.100.1:50000 out=8.8.8.8:53->192.168.1.10:4500\n\n[Cas 3 — Paquet entrant sans DNAT ni session SNAT correspondante]\nNAT dir=INBOUND in=1.2.3.4:9999->198.51.100.1:22 out=DROP_NO_ROUTE"
  },
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
  },
  {
    "id": "fw3-c5-e1",
    "chapter": 5,
    "title": "Filtrage de domaines DNS & inspection du Server Name Indication (SNI TLS)",
    "level": "n1",
    "language": "analyse",
    "goal": "Classer les noms d’hôtes extraits de l’extension SNI TLS selon leur catégorie de réputation et appliquer la politique de sécurité.",
    "brief": "<p>Un pare-feu nouvelle génération (NGFW) inspecte le champ <strong>SNI (Server Name Indication)</strong> du message TLS <em>Client Hello</em> pour identifier le site web visité sans avoir besoin de déchiffrer tout le trafic.<br><br>\nBase de réputation et politique d'entreprise :<br>\n- Domaines contenant <code>phish</code>, <code>malware</code> ou finissant par <code>.evil</code> : catégorie <code>MALWARE</code> -> Action <code>BLOCK</code>.<br>\n- Domaines contenant <code>casino</code>, <code>bet</code> ou finissant par <code>.gamble</code> : catégorie <code>GAMBLING</code> -> Action <code>BLOCK</code>.<br>\n- Domaines contenant <code>facebook</code>, <code>tiktok</code>, <code>instagram</code> : catégorie <code>SOCIAL_MEDIA</code> -> Action <code>BLOCK</code>.<br>\n- Tous les autres domaines : catégorie <code>BUSINESS_TECH</code> -> Action <code>ALLOW</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>SNI_INSPECT id={id} host={host} category={CAT} action={ALLOW|BLOCK}</code></p>",
    "starter": "# Grille d'analyse (fw3-c5-e1) — Filtrage de domaines DNS & inspection du Server Name Indication (SNI TLS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Blocage des réseaux sociaux et sites de jeux]\n# Données : SNI_EVENT id=E1 client_ip=10.0.0.5 host=www.facebook.com\n# Données : SNI_EVENT id=E2 client_ip=10.0.0.5 host=sports.bet365.com\n# Données : SNI_EVENT id=E3 client_ip=10.0.0.5 host=api.github.com\nA_COMPLETER\n\n[Cas 2 — Détection de malware avec extension spéciale]\n# Données : SNI_EVENT id=M1 client_ip=172.16.1.20 host=trojan-downloader.evil\n# Données : SNI_EVENT id=M2 client_ip=172.16.1.20 host=roulette.online.gamble\nA_COMPLETER\n\n[Cas 3 — Trafic légitime professionnel varié]\n# Données : SNI_EVENT id=B1 client_ip=192.168.1.15 host=pypi.org\n# Données : SNI_EVENT id=B2 client_ip=192.168.1.15 host=stackoverflow.com\nA_COMPLETER\n",
    "hints": [
      "Convertir l’hôte en minuscules avant l’analyse.",
      "Tester dans l’ordre : MALWARE, GAMBLING, SOCIAL_MEDIA, puis défaut BUSINESS_TECH."
    ],
    "examples": [
      {
        "stdin": "SNI_EVENT id=1 client_ip=192.168.1.10 host=login-bank.phishing-portal.com\nSNI_EVENT id=2 client_ip=192.168.1.10 host=docs.python.org",
        "expected": "SNI_INSPECT id=1 host=login-bank.phishing-portal.com category=MALWARE action=BLOCK\nSNI_INSPECT id=2 host=docs.python.org category=BUSINESS_TECH action=ALLOW",
        "note": "Le domaine de phishing est bloqué, la documentation technique est autorisée."
      }
    ],
    "tests": [
      {
        "label": "Blocage des réseaux sociaux et sites de jeux",
        "stdin": "cas:1",
        "expected": "SNI_INSPECT id=E1 host=www.facebook.com category=SOCIAL_MEDIA action=BLOCK\nSNI_INSPECT id=E2 host=sports.bet365.com category=GAMBLING action=BLOCK\nSNI_INSPECT id=E3 host=api.github.com category=BUSINESS_TECH action=ALLOW"
      },
      {
        "label": "Détection de malware avec extension spéciale",
        "stdin": "cas:2",
        "expected": "SNI_INSPECT id=M1 host=trojan-downloader.evil category=MALWARE action=BLOCK\nSNI_INSPECT id=M2 host=roulette.online.gamble category=GAMBLING action=BLOCK"
      },
      {
        "label": "Trafic légitime professionnel varié",
        "stdin": "cas:3",
        "expected": "SNI_INSPECT id=B1 host=pypi.org category=BUSINESS_TECH action=ALLOW\nSNI_INSPECT id=B2 host=stackoverflow.com category=BUSINESS_TECH action=ALLOW"
      }
    ],
    "solution": "[Exemple]\nSNI_INSPECT id=1 host=login-bank.phishing-portal.com category=MALWARE action=BLOCK\nSNI_INSPECT id=2 host=docs.python.org category=BUSINESS_TECH action=ALLOW\n\n[Cas 1 — Blocage des réseaux sociaux et sites de jeux]\nSNI_INSPECT id=E1 host=www.facebook.com category=SOCIAL_MEDIA action=BLOCK\nSNI_INSPECT id=E2 host=sports.bet365.com category=GAMBLING action=BLOCK\nSNI_INSPECT id=E3 host=api.github.com category=BUSINESS_TECH action=ALLOW\n\n[Cas 2 — Détection de malware avec extension spéciale]\nSNI_INSPECT id=M1 host=trojan-downloader.evil category=MALWARE action=BLOCK\nSNI_INSPECT id=M2 host=roulette.online.gamble category=GAMBLING action=BLOCK\n\n[Cas 3 — Trafic légitime professionnel varié]\nSNI_INSPECT id=B1 host=pypi.org category=BUSINESS_TECH action=ALLOW\nSNI_INSPECT id=B2 host=stackoverflow.com category=BUSINESS_TECH action=ALLOW"
  },
  {
    "id": "fw3-c5-e2",
    "chapter": 5,
    "title": "Limiteur de débit et protection anti-DoS par fenêtre glissante",
    "level": "n2",
    "language": "analyse",
    "goal": "Implémenter un limiteur de débit par IP pour contrer les rafales de requêtes et dénis de service.",
    "brief": "<p>Pour protéger les serveurs contre les inondations et attaques par force brute, les modules NGFW/UTM intègrent des mécanismes de <strong>Rate Limiting</strong>.<br><br>\nRègles de filtrage par fenêtre glissante :<br>\n- Taille de la fenêtre : <code>5</code> secondes.<br>\n- Quota maximal : <code>3</code> requêtes autorisées dans l'intervalle <code>[ts - 4, ts]</code> (inclusif).<br>\n- Lorsqu'une requête arrive à l'instant <code>ts</code> pour une adresse <code>ip</code> :<br>\n  On compte combien de requêtes antérieures de cette même IP se situent dans <code>[ts - 4, ts]</code>.<br>\n  Si le compte (requête courante comprise) est <code>&lt;= 3</code> : la requête est admise (<code>PASSED</code>).<br>\n  Si le compte dépasse 3 : la requête est rejetée (<code>DROPPED</code>) et n'est pas comptabilisée dans les requêtes acceptées.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque requête, afficher :<br>\n<code>RATE_LIMIT ip={ip} ts={ts} status={PASSED|DROPPED} active_in_window={count}</code></p>",
    "starter": "# Grille d'analyse (fw3-c5-e2) — Limiteur de débit et protection anti-DoS par fenêtre glissante\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Expiration de fenêtre permettant de nouvelles requêtes]\n# Données : REQ ts=1 ip=10.0.0.1\n# Données : REQ ts=2 ip=10.0.0.1\n# Données : REQ ts=3 ip=10.0.0.1\n# Données : REQ ts=4 ip=10.0.0.1\n# Données : REQ ts=6 ip=10.0.0.1\nA_COMPLETER\n\n[Cas 2 — Deux adresses IP distinctes avec quotas indépendants]\n# Données : REQ ts=10 ip=192.168.1.1\n# Données : REQ ts=10 ip=192.168.1.2\n# Données : REQ ts=11 ip=192.168.1.1\n# Données : REQ ts=11 ip=192.168.1.2\n# Données : REQ ts=12 ip=192.168.1.1\n# Données : REQ ts=12 ip=192.168.1.1\nA_COMPLETER\n\n[Cas 3 — Trafic régulier et espacé sans dépassement]\n# Données : REQ ts=10 ip=10.0.0.8\n# Données : REQ ts=15 ip=10.0.0.8\n# Données : REQ ts=20 ip=10.0.0.8\nA_COMPLETER\n",
    "hints": [
      "Maintenez l’historique horodaté des requêtes acceptées pour chaque adresse IP source.",
      "Rejetez toute requête excédant le seuil de débit maximal autorisé dans la fenêtre glissante d’observation."
    ],
    "examples": [
      {
        "stdin": "REQ ts=10 ip=192.168.1.5\nREQ ts=11 ip=192.168.1.5\nREQ ts=12 ip=192.168.1.5\nREQ ts=13 ip=192.168.1.5",
        "expected": "RATE_LIMIT ip=192.168.1.5 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.5 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.5 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.5 ts=13 status=DROPPED active_in_window=4",
        "note": "La 4e requête à ts=13 dépasse le quota de 3 dans la fenêtre [9, 13]."
      }
    ],
    "tests": [
      {
        "label": "Expiration de fenêtre permettant de nouvelles requêtes",
        "stdin": "cas:1",
        "expected": "RATE_LIMIT ip=10.0.0.1 ts=1 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.1 ts=2 status=PASSED active_in_window=2\nRATE_LIMIT ip=10.0.0.1 ts=3 status=PASSED active_in_window=3\nRATE_LIMIT ip=10.0.0.1 ts=4 status=DROPPED active_in_window=4\nRATE_LIMIT ip=10.0.0.1 ts=6 status=PASSED active_in_window=3"
      },
      {
        "label": "Deux adresses IP distinctes avec quotas indépendants",
        "stdin": "cas:2",
        "expected": "RATE_LIMIT ip=192.168.1.1 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.2 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.1 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.2 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.1 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.1 ts=12 status=DROPPED active_in_window=4"
      },
      {
        "label": "Trafic régulier et espacé sans dépassement",
        "stdin": "cas:3",
        "expected": "RATE_LIMIT ip=10.0.0.8 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=15 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=20 status=PASSED active_in_window=1"
      }
    ],
    "solution": "[Exemple]\nRATE_LIMIT ip=192.168.1.5 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.5 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.5 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.5 ts=13 status=DROPPED active_in_window=4\n\n[Cas 1 — Expiration de fenêtre permettant de nouvelles requêtes]\nRATE_LIMIT ip=10.0.0.1 ts=1 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.1 ts=2 status=PASSED active_in_window=2\nRATE_LIMIT ip=10.0.0.1 ts=3 status=PASSED active_in_window=3\nRATE_LIMIT ip=10.0.0.1 ts=4 status=DROPPED active_in_window=4\nRATE_LIMIT ip=10.0.0.1 ts=6 status=PASSED active_in_window=3\n\n[Cas 2 — Deux adresses IP distinctes avec quotas indépendants]\nRATE_LIMIT ip=192.168.1.1 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.2 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=192.168.1.1 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.2 ts=11 status=PASSED active_in_window=2\nRATE_LIMIT ip=192.168.1.1 ts=12 status=PASSED active_in_window=3\nRATE_LIMIT ip=192.168.1.1 ts=12 status=DROPPED active_in_window=4\n\n[Cas 3 — Trafic régulier et espacé sans dépassement]\nRATE_LIMIT ip=10.0.0.8 ts=10 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=15 status=PASSED active_in_window=1\nRATE_LIMIT ip=10.0.0.8 ts=20 status=PASSED active_in_window=1"
  },
  {
    "id": "fw3-c5-e3",
    "chapter": 5,
    "title": "Moteur Deep Packet Inspection (DPI) et détection de signatures L7",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser le contenu applicatif des requêtes HTTP pour détecter les injections SQL, XSS et traversées de répertoires.",
    "brief": "<p>Le moteur <strong>DPI (Deep Packet Inspection)</strong> examine la charge utile (payload) au-delà des en-têtes réseau et transport pour neutraliser les attaques applicatives.<br><br>\nSignatures d'attaques à détecter (insensible à la casse) :<br>\n1. <strong>SQL Injection</strong> : présence de <code>union select</code>, <code>' or '1'='1</code>, <code>sleep(</code> ou <code>drop table</code>.<br>\n   -> Menace : <code>SQL_INJECTION</code>, Action : <code>BLOCK</code>.<br>\n2. <strong>Cross-Site Scripting (XSS)</strong> : présence de <code>&lt;script&gt;</code>, <code>javascript:</code> ou <code>onerror=</code>.<br>\n   -> Menace : <code>XSS_ATTACK</code>, Action : <code>BLOCK</code>.<br>\n3. <strong>Path Traversal</strong> : présence de <code>../</code>, <code>..\\</code> ou <code>/etc/passwd</code>.<br>\n   -> Menace : <code>PATH_TRAVERSAL</code>, Action : <code>BLOCK</code>.<br>\n4. Sinon : charge utile saine.<br>\n   -> Menace : <code>CLEAN</code>, Action : <code>ALLOW</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque ligne, afficher :<br>\n<code>DPI_ALERT id={id} threat={THREAT} action={BLOCK|ALLOW}</code></p>",
    "starter": "# Grille d'analyse (fw3-c5-e3) — Moteur Deep Packet Inspection (DPI) et détection de signatures L7\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection XSS et Path Traversal]\n# Données : PAYLOAD id=X1 payload=name=<script>alert(document.cookie)</script>\n# Données : PAYLOAD id=T1 payload=file=../../etc/passwd\nA_COMPLETER\n\n[Cas 2 — Variantes SQL Injection avec apostrophes et sleep]\n# Données : PAYLOAD id=S1 payload=user=' OR '1'='1\n# Données : PAYLOAD id=S2 payload=benchmark(10000000,MD5(1)) OR SLEEP(5)\nA_COMPLETER\n\n[Cas 3 — Payloads légitimes avec du texte complexe]\n# Données : PAYLOAD id=C1 payload=message=Bonjour, voici mon rapport mensuel.\n# Données : PAYLOAD id=C2 payload=path=/var/www/html/index.php\nA_COMPLETER\n",
    "hints": [
      "Normaliser la charge utile en minuscules.",
      "Tester dans l’ordre de la spécification : SQLi, XSS, Path Traversal, puis CLEAN."
    ],
    "examples": [
      {
        "stdin": "PAYLOAD id=P1 payload=id=1 UNION SELECT username, password FROM users\nPAYLOAD id=P2 payload=q=ordinateur+portable",
        "expected": "DPI_ALERT id=P1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=P2 threat=CLEAN action=ALLOW",
        "note": "P1 contient une signature SQLi évidente, P2 est une recherche utilisateur standard."
      }
    ],
    "tests": [
      {
        "label": "Détection XSS et Path Traversal",
        "stdin": "cas:1",
        "expected": "DPI_ALERT id=X1 threat=XSS_ATTACK action=BLOCK\nDPI_ALERT id=T1 threat=PATH_TRAVERSAL action=BLOCK"
      },
      {
        "label": "Variantes SQL Injection avec apostrophes et sleep",
        "stdin": "cas:2",
        "expected": "DPI_ALERT id=S1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=S2 threat=SQL_INJECTION action=BLOCK"
      },
      {
        "label": "Payloads légitimes avec du texte complexe",
        "stdin": "cas:3",
        "expected": "DPI_ALERT id=C1 threat=CLEAN action=ALLOW\nDPI_ALERT id=C2 threat=CLEAN action=ALLOW"
      }
    ],
    "solution": "[Exemple]\nDPI_ALERT id=P1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=P2 threat=CLEAN action=ALLOW\n\n[Cas 1 — Détection XSS et Path Traversal]\nDPI_ALERT id=X1 threat=XSS_ATTACK action=BLOCK\nDPI_ALERT id=T1 threat=PATH_TRAVERSAL action=BLOCK\n\n[Cas 2 — Variantes SQL Injection avec apostrophes et sleep]\nDPI_ALERT id=S1 threat=SQL_INJECTION action=BLOCK\nDPI_ALERT id=S2 threat=SQL_INJECTION action=BLOCK\n\n[Cas 3 — Payloads légitimes avec du texte complexe]\nDPI_ALERT id=C1 threat=CLEAN action=ALLOW\nDPI_ALERT id=C2 threat=CLEAN action=ALLOW"
  },
  {
    "id": "fw3-c6-e1",
    "chapter": 6,
    "title": "Compilateur de règles vers les syntaxes iptables et nftables",
    "level": "n1",
    "language": "analyse",
    "goal": "Traduire une politique de sécurité déclarative en commandes concrètes pour les moteurs netfilter iptables et nftables.",
    "brief": "<p>L'administration d'un pare-feu Linux repose sur <strong>iptables</strong> (hérité) ou <strong>nftables</strong> (standard moderne).<br><br>\nSpécification de conversion d'une règle :<br>\n<code>RULE chain=&lt;INPUT|FORWARD|OUTPUT&gt; proto=&lt;tcp|udp|ANY&gt; src=&lt;ip|ANY&gt; dst=&lt;ip|ANY&gt; dport=&lt;p|ANY&gt; target=&lt;ACCEPT|DROP&gt;</code>.<br><br>\nRègles de génération :<br>\n1. Syntaxe <strong>iptables</strong> :<br>\n   <code>iptables -A {chain} [options] -j {target}</code><br>\n   - Si <code>proto != 'ANY'</code> : ajouter <code>-p {proto}</code>.<br>\n   - Si <code>src != 'ANY'</code> : ajouter <code>-s {src}</code>.<br>\n   - Si <code>dst != 'ANY'</code> : ajouter <code>-d {dst}</code>.<br>\n   - Si <code>dport != 'ANY'</code> : ajouter <code>--dport {dport}</code> (placé après le protocole si présent).<br>\n2. Syntaxe <strong>nftables</strong> :<br>\n   <code>nft add rule inet filter {chain_lower} [clauses] counter {target_lower}</code><br>\n   - Si <code>src != 'ANY'</code> : ajouter <code>ip saddr {src}</code>.<br>\n   - Si <code>dst != 'ANY'</code> : ajouter <code>ip daddr {dst}</code>.<br>\n   - Si <code>proto != 'ANY' et dport != 'ANY'</code> : ajouter <code>{proto} dport {dport}</code>.<br>\n   - Si <code>proto != 'ANY' et dport == 'ANY'</code> : ajouter <code>ip protocol {proto}</code>.<br><br>\nPour chaque règle en entrée, afficher :<br>\n<code>IPTABLES: {commande_iptables}</code><br>\n<code>NFTABLES: {commande_nftables}</code></p>",
    "starter": "# Grille d'analyse (fw3-c6-e1) — Compilateur de règles vers les syntaxes iptables et nftables\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Règle de transfert FORWARD avec blocage complet]\n# Données : RULE chain=FORWARD proto=udp src=192.168.1.50 dst=ANY dport=53 target=DROP\nA_COMPLETER\n\n[Cas 2 — Règle simple sans port spécifique]\n# Données : RULE chain=OUTPUT proto=tcp src=ANY dst=198.51.100.2 dport=ANY target=ACCEPT\nA_COMPLETER\n\n[Cas 3 — Règle globale tout trafic]\n# Données : RULE chain=INPUT proto=ANY src=ANY dst=ANY dport=ANY target=DROP\nA_COMPLETER\n",
    "hints": [
      "Construire les listes d’arguments dans l’ordre demandé puis joindre par des espaces.",
      "Convertir en minuscules pour nftables (ex: chain.lower(), target.lower())."
    ],
    "examples": [
      {
        "stdin": "RULE chain=INPUT proto=tcp src=ANY dst=10.0.0.1 dport=22 target=ACCEPT",
        "expected": "IPTABLES: iptables -A INPUT -p tcp -d 10.0.0.1 --dport 22 -j ACCEPT\nNFTABLES: nft add rule inet filter input ip daddr 10.0.0.1 tcp dport 22 counter accept",
        "note": "Ouverture du port SSH 22 sur l’interface d’écoute."
      }
    ],
    "tests": [
      {
        "label": "Règle de transfert FORWARD avec blocage complet",
        "stdin": "cas:1",
        "expected": "IPTABLES: iptables -A FORWARD -p udp -s 192.168.1.50 --dport 53 -j DROP\nNFTABLES: nft add rule inet filter forward ip saddr 192.168.1.50 udp dport 53 counter drop"
      },
      {
        "label": "Règle simple sans port spécifique",
        "stdin": "cas:2",
        "expected": "IPTABLES: iptables -A OUTPUT -p tcp -d 198.51.100.2 -j ACCEPT\nNFTABLES: nft add rule inet filter output ip daddr 198.51.100.2 ip protocol tcp counter accept"
      },
      {
        "label": "Règle globale tout trafic",
        "stdin": "cas:3",
        "expected": "IPTABLES: iptables -A INPUT -j DROP\nNFTABLES: nft add rule inet filter input counter drop"
      }
    ],
    "solution": "[Exemple]\nIPTABLES: iptables -A INPUT -p tcp -d 10.0.0.1 --dport 22 -j ACCEPT\nNFTABLES: nft add rule inet filter input ip daddr 10.0.0.1 tcp dport 22 counter accept\n\n[Cas 1 — Règle de transfert FORWARD avec blocage complet]\nIPTABLES: iptables -A FORWARD -p udp -s 192.168.1.50 --dport 53 -j DROP\nNFTABLES: nft add rule inet filter forward ip saddr 192.168.1.50 udp dport 53 counter drop\n\n[Cas 2 — Règle simple sans port spécifique]\nIPTABLES: iptables -A OUTPUT -p tcp -d 198.51.100.2 -j ACCEPT\nNFTABLES: nft add rule inet filter output ip daddr 198.51.100.2 ip protocol tcp counter accept\n\n[Cas 3 — Règle globale tout trafic]\nIPTABLES: iptables -A INPUT -j DROP\nNFTABLES: nft add rule inet filter input counter drop"
  },
  {
    "id": "fw3-c6-e2",
    "chapter": 6,
    "title": "Parseur et agrégateur statistique de journaux de pare-feu (Logs)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser un flux de logs de pare-feu format syslog et extraire les métriques de sécurité essentielles.",
    "brief": "<p>L'exploitation des journaux (logs) permet de mesurer l'efficacité du pare-feu et de détecter les tendances d'attaque.<br><br>\nFormat des lignes de logs lues dans l’énoncé du cas :<br>\n<code>firewall: [ACTION] IN=&lt;if&gt; OUT=&lt;if&gt; SRC=&lt;ip&gt; DST=&lt;ip&gt; PROTO=&lt;proto&gt; SPT=&lt;p&gt; DPT=&lt;p&gt;</code><br>\noù <code>ACTION</code> est <code>DROP</code> ou <code>ACCEPT</code>.<br><br>\nMétriques à calculer :<br>\n- <code>total</code> : nombre total de lignes analysées.<br>\n- <code>dropped</code> : nombre de paquets avec <code>[DROP]</code>.<br>\n- <code>accepted</code> : nombre de paquets avec <code>[ACCEPT]</code>.<br>\n- <code>top_blocked_port</code> : numéro de port destination <code>DPT</code> ayant cumulé le plus grand nombre de <code>DROP</code> (en cas d'égalité, le plus petit numéro de port numérique). Si aucun DROP : <code>NONE</code>.<br>\n- <code>top_attacker_ip</code> : adresse IP source <code>SRC</code> ayant généré le plus grand nombre de <code>DROP</code> (en cas d'égalité, la plus petite par ordre alphabétique). Si aucun DROP : <code>NONE</code>.<br><br>\nSortie attendue :<br>\n<code>LOG_SUMMARY total={total} dropped={dropped} accepted={accepted} top_blocked_port={p} top_attacker_ip={ip}</code></p>",
    "starter": "# Grille d'analyse (fw3-c6-e2) — Parseur et agrégateur statistique de journaux de pare-feu (Logs)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Scans massifs multi-ports avec une IP dominante]\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=198.51.100.88 DST=10.0.0.1 PROTO=TCP SPT=1000 DPT=23\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=198.51.100.88 DST=10.0.0.1 PROTO=TCP SPT=1001 DPT=23\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=198.51.100.99 DST=10.0.0.1 PROTO=TCP SPT=2000 DPT=445\n# Données : firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=10.0.0.50 DST=8.8.8.8 PROTO=UDP SPT=5300 DPT=53\nA_COMPLETER\n\n[Cas 2 — Trafic 100% accepté sans aucun drop]\n# Données : firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.1 DST=10.0.0.1 PROTO=TCP SPT=3000 DPT=443\n# Données : firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.2 DST=10.0.0.1 PROTO=TCP SPT=3001 DPT=443\nA_COMPLETER\n\n[Cas 3 — Départage d’égalité entre ports bloqués]\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=1.1.1.1 DST=10.0.0.1 PROTO=TCP SPT=10 DPT=80\n# Données : firewall: [DROP] IN=eth0 OUT= SRC=2.2.2.2 DST=10.0.0.1 PROTO=TCP SPT=11 DPT=22\nA_COMPLETER\n",
    "hints": [
      "Utiliser des dictionnaires pour compter les occurrences de SRC et DPT pour les lignes DROP.",
      "Trier par fréquence décroissante puis par la clé secondaire pour départager les égalités."
    ],
    "examples": [
      {
        "stdin": "firewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45000 DPT=22\nfirewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.10 DST=10.0.0.2 PROTO=TCP SPT=50000 DPT=80\nfirewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45001 DPT=22",
        "expected": "LOG_SUMMARY total=3 dropped=2 accepted=1 top_blocked_port=22 top_attacker_ip=203.0.113.5",
        "note": "2 drops sur le port 22 par la même IP 203.0.113.5."
      }
    ],
    "tests": [
      {
        "label": "Scans massifs multi-ports avec une IP dominante",
        "stdin": "cas:1",
        "expected": "LOG_SUMMARY total=4 dropped=3 accepted=1 top_blocked_port=23 top_attacker_ip=198.51.100.88"
      },
      {
        "label": "Trafic 100% accepté sans aucun drop",
        "stdin": "cas:2",
        "expected": "LOG_SUMMARY total=2 dropped=0 accepted=2 top_blocked_port=NONE top_attacker_ip=NONE"
      },
      {
        "label": "Départage d’égalité entre ports bloqués",
        "stdin": "cas:3",
        "expected": "LOG_SUMMARY total=2 dropped=2 accepted=0 top_blocked_port=22 top_attacker_ip=1.1.1.1"
      }
    ],
    "solution": "[Exemple]\nLOG_SUMMARY total=3 dropped=2 accepted=1 top_blocked_port=22 top_attacker_ip=203.0.113.5\n\n[Cas 1 — Scans massifs multi-ports avec une IP dominante]\nLOG_SUMMARY total=4 dropped=3 accepted=1 top_blocked_port=23 top_attacker_ip=198.51.100.88\n\n[Cas 2 — Trafic 100% accepté sans aucun drop]\nLOG_SUMMARY total=2 dropped=0 accepted=2 top_blocked_port=NONE top_attacker_ip=NONE\n\n[Cas 3 — Départage d’égalité entre ports bloqués]\nLOG_SUMMARY total=2 dropped=2 accepted=0 top_blocked_port=22 top_attacker_ip=1.1.1.1"
  },
  {
    "id": "fw3-c6-e3",
    "chapter": 6,
    "title": "Détecteur de force brute et bannissement dynamique (Fail2ban SIEM)",
    "level": "n3",
    "language": "analyse",
    "goal": "Surveiller les échecs répétés d’authentification et déclencher le blocage dynamique de l’IP attaquante.",
    "brief": "<p>Les outils de sécurité active (comme <strong>Fail2ban</strong> ou les playbooks SOAR/SIEM) observent les journaux de connexion et appliquent un bannissement temporaire ou définitif lorsqu'une IP dépasse un seuil d'échecs.<br><br>\nParamètres de la jail de sécurité :<br>\n- <code>findtime</code> : <code>60</code> secondes (fenêtre d'observation glissante <code>[ts - 59, ts]</code>).<br>\n- <code>maxretry</code> : <code>3</code> échecs.<br><br>\nComportement :<br>\n1. Dès qu'une IP accumule son 3e échec dans la fenêtre de 60s, elle devient immédiatement bannie (<code>BANNED</code>). Une fois bannie, elle reste bannie pour tous les événements suivants.<br>\n2. Pour chaque événement <code>AUTH_FAIL ts=&lt;ts&gt; ip=&lt;ip&gt; service=&lt;ssh|rdp&gt;</code> reçu :<br>\n   - Si l'IP est déjà bannie :<br>\n     <code>BAN_ACTION ip={ip} status=ALREADY_BANNED</code><br>\n   - Sinon si le nombre d'échecs dans la fenêtre atteint 3 :<br>\n     l'IP passe à l'état bannie et on Indiquez :<br>\n     <code>BAN_ACTION ip={ip} status=TRIGGER_BAN rule=\"nft add element inet filter blocklist {{ {ip} }}\"</code><br>\n   - Sinon :<br>\n     <code>BAN_ACTION ip={ip} status=MONITORING attempts={nb_dans_fenetre}</code><br><br>\nAnalysez les données fournies pour chaque cas.</p>",
    "starter": "# Grille d'analyse (fw3-c6-e3) — Détecteur de force brute et bannissement dynamique (Fail2ban SIEM)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Événement ultérieur sur une IP déjà bannie]\n# Données : AUTH_FAIL ts=10 ip=198.51.100.1 service=ssh\n# Données : AUTH_FAIL ts=20 ip=198.51.100.1 service=ssh\n# Données : AUTH_FAIL ts=30 ip=198.51.100.1 service=ssh\n# Données : AUTH_FAIL ts=40 ip=198.51.100.1 service=ssh\nA_COMPLETER\n\n[Cas 2 — Échecs espacés de plus de 60 secondes sans bannissement]\n# Données : AUTH_FAIL ts=10 ip=10.0.0.5 service=ssh\n# Données : AUTH_FAIL ts=80 ip=10.0.0.5 service=ssh\n# Données : AUTH_FAIL ts=150 ip=10.0.0.5 service=ssh\nA_COMPLETER\n\n[Cas 3 — Deux adresses IP attaquantes distinctes]\n# Données : AUTH_FAIL ts=50 ip=1.1.1.1 service=ssh\n# Données : AUTH_FAIL ts=51 ip=2.2.2.2 service=rdp\n# Données : AUTH_FAIL ts=52 ip=1.1.1.1 service=ssh\n# Données : AUTH_FAIL ts=53 ip=1.1.1.1 service=ssh\nA_COMPLETER\n",
    "hints": [
      "Garder la trace des IPs déjà bannies dans un ensemble (set).",
      "Pour les IPs non bannies, filtrer les échecs récents où t >= ts - 59."
    ],
    "examples": [
      {
        "stdin": "AUTH_FAIL ts=100 ip=203.0.113.50 service=ssh\nAUTH_FAIL ts=120 ip=203.0.113.50 service=ssh\nAUTH_FAIL ts=140 ip=203.0.113.50 service=ssh",
        "expected": "BAN_ACTION ip=203.0.113.50 status=MONITORING attempts=1\nBAN_ACTION ip=203.0.113.50 status=MONITORING attempts=2\nBAN_ACTION ip=203.0.113.50 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 203.0.113.50 }\"",
        "note": "Le 3e échec dans les 60s déclenche le bannissement immédiat."
      }
    ],
    "tests": [
      {
        "label": "Événement ultérieur sur une IP déjà bannie",
        "stdin": "cas:1",
        "expected": "BAN_ACTION ip=198.51.100.1 status=MONITORING attempts=1\nBAN_ACTION ip=198.51.100.1 status=MONITORING attempts=2\nBAN_ACTION ip=198.51.100.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 198.51.100.1 }\"\nBAN_ACTION ip=198.51.100.1 status=ALREADY_BANNED"
      },
      {
        "label": "Échecs espacés de plus de 60 secondes sans bannissement",
        "stdin": "cas:2",
        "expected": "BAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1"
      },
      {
        "label": "Deux adresses IP attaquantes distinctes",
        "stdin": "cas:3",
        "expected": "BAN_ACTION ip=1.1.1.1 status=MONITORING attempts=1\nBAN_ACTION ip=2.2.2.2 status=MONITORING attempts=1\nBAN_ACTION ip=1.1.1.1 status=MONITORING attempts=2\nBAN_ACTION ip=1.1.1.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 1.1.1.1 }\""
      }
    ],
    "solution": "[Exemple]\nBAN_ACTION ip=203.0.113.50 status=MONITORING attempts=1\nBAN_ACTION ip=203.0.113.50 status=MONITORING attempts=2\nBAN_ACTION ip=203.0.113.50 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 203.0.113.50 }\"\n\n[Cas 1 — Événement ultérieur sur une IP déjà bannie]\nBAN_ACTION ip=198.51.100.1 status=MONITORING attempts=1\nBAN_ACTION ip=198.51.100.1 status=MONITORING attempts=2\nBAN_ACTION ip=198.51.100.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 198.51.100.1 }\"\nBAN_ACTION ip=198.51.100.1 status=ALREADY_BANNED\n\n[Cas 2 — Échecs espacés de plus de 60 secondes sans bannissement]\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\nBAN_ACTION ip=10.0.0.5 status=MONITORING attempts=1\n\n[Cas 3 — Deux adresses IP attaquantes distinctes]\nBAN_ACTION ip=1.1.1.1 status=MONITORING attempts=1\nBAN_ACTION ip=2.2.2.2 status=MONITORING attempts=1\nBAN_ACTION ip=1.1.1.1 status=MONITORING attempts=2\nBAN_ACTION ip=1.1.1.1 status=TRIGGER_BAN rule=\"nft add element inet filter blocklist { 1.1.1.1 }\""
  }
];
