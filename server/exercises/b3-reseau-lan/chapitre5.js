'use strict';

module.exports = [
  {
    "id": "lan3-c5-e1",
    "chapter": 5,
    "title": "Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le mécanisme Cisco Port Security et les modes de réaction face aux adresses MAC non autorisées.",
    "brief": "<p>La fonctionnalité <strong>Port Security</strong> limite les adresses MAC autorisées sur un port à celles qui sont configurées ou apprises, jusqu'au quota <code>max_mac</code>.<br><br>\nPour une trame non autorisée, ce modèle distingue trois modes :<br>\n- <strong>protect :</strong> la trame est détruite sans alerte ni incrément de compteur ; le port reste <code>UP</code> (<code>action=DROP_SILENT</code>).<br>\n- <strong>restrict :</strong> la trame est détruite, le compteur et l'alerte sont activés ; le port reste <code>UP</code> (<code>action=DROP_ALERT</code>).<br>\n- <strong>shutdown :</strong> le port passe en <code>ERR_DISABLE</code> (<code>action=PORT_SHUTDOWN</code>). Dans ce scénario sans rétablissement, les trames suivantes sont rejetées avec <code>action=DROP state=ERR_DISABLE</code>.<br><br>\nEn pratique, après diagnostic et correction de la cause, une réactivation manuelle (<code>shutdown</code> puis <code>no shutdown</code>) ou une récupération automatique configurée peut être possible selon la plateforme.<br><br>\nChaque cas commence par <code>PORT_SEC port=&lt;port&gt; max_mac=&lt;quota&gt; mode=&lt;protect|restrict|shutdown&gt; sticky_macs=&lt;adresses|NONE&gt;</code>, suivi des trames <code>FRAME id=&lt;nom&gt; src_mac=&lt;mac&gt;</code>.<br>\nPour chaque trame, afficher :<br>\n<code>PORT_SEC_REPORT id={id} port={port} mac={src_mac} status={PERMIT|VIOLATION|PORT_DOWN} action={action} state={state}</code></p>",
    "starter": "# Grille d'analyse (lan3-c5-e1) — Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\n# Données : PORT_SEC port=Gi0/1 max_mac=1 mode=restrict sticky_macs=00:00:00:00:00:01\n# Données : FRAME id=R1 src_mac=00:00:00:00:00:01\n# Données : FRAME id=R2 src_mac=00:00:00:00:00:99\n# Données : FRAME id=R3 src_mac=00:00:00:00:00:01\nA_COMPLETER\n\n[Cas 2 — Mode protect silencieux]\n# Données : PORT_SEC port=Fa0/5 max_mac=1 mode=protect sticky_macs=NONE\n# Données : FRAME id=P1 src_mac=00:50:56:00:00:01\n# Données : FRAME id=P2 src_mac=00:50:56:00:00:02\nA_COMPLETER\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\n# Données : PORT_SEC port=Eth1 max_mac=2 mode=shutdown sticky_macs=NONE\n# Données : FRAME id=D1 src_mac=00:01:02:03:04:01\n# Données : FRAME id=D2 src_mac=00:01:02:03:04:02\n# Données : FRAME id=D3 src_mac=00:01:02:03:04:03\nA_COMPLETER\n",
    "hints": [
      "Le mécanisme de sécurité Port Security surveille le nombre d’adresses MAC distinctes autorisées sur un port de commutateur.",
      "Si une adresse inconnue dépasse le quota, seul le mode shutdown du scénario place le port en err-disable."
    ],
    "examples": [
      {
        "stdin": "PORT_SEC port=Fa0/1 max_mac=1 mode=shutdown sticky_macs=00:11:22:33:44:01\nFRAME id=F1 src_mac=00:11:22:33:44:01\nFRAME id=F2 src_mac=00:aa:bb:cc:dd:02\nFRAME id=F3 src_mac=00:11:22:33:44:01",
        "expected": "PORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE",
        "note": "F1 est autorisée ; F2 déclenche le shutdown du port ; F3 arrive sur un port désactivé."
      }
    ],
    "tests": [
      {
        "label": "Mode restrict conservant le port UP avec drop et alerte",
        "stdin": "cas:1",
        "expected": "PORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP"
      },
      {
        "label": "Mode protect silencieux",
        "stdin": "cas:2",
        "expected": "PORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP"
      },
      {
        "label": "Apprentissage dynamique jusqu'à max_mac=2",
        "stdin": "cas:3",
        "expected": "PORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE"
      }
    ],
    "solution": "[Exemple]\nPORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\nPORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\n\n[Cas 2 — Mode protect silencieux]\nPORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\nPORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE"
  },
  {
    "id": "lan3-c5-e2",
    "chapter": 5,
    "title": "Validateur de base de données de liaison DHCP Snooping",
    "level": "n2",
    "language": "analyse",
    "goal": "Filtrer les messages DHCP selon le statut de confiance des ports et alimenter la base de liaison (Binding DB).",
    "brief": "<p>L'attaque par serveur DHCP pirate (Rogue DHCP Server) permet à un attaquant de distribuer de fausses passerelles et de faux serveurs DNS aux postes du réseau. La parade <strong>DHCP Snooping</strong> classe les ports du commutateur en deux catégories :<br>\n- <strong>Ports de confiance (TRUSTED) :</strong> Reliés aux serveurs DHCP légitimes ou aux uplinks de distribution. Tous les messages DHCP y sont autorisés.<br>\n- <strong>Ports non fiables (UNTRUSTED) :</strong> Reliés aux utilisateurs finals. Seules les requêtes clients (<code>DISCOVER</code>, <code>REQUEST</code>) y sont autorisées. Si une réponse serveur (<code>OFFER</code> ou <code>ACK</code>) y est détectée, elle est immédiatement détruite et signalée comme attaque Rogue DHCP.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si <code>port.trust == 'UNTRUSTED'</code> et <code>type in ['OFFER', 'ACK']</code> :<br>\n   <code>status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER</code>.<br>\n2. Si <code>port.trust == 'UNTRUSTED'</code> et <code>type in ['DISCOVER', 'REQUEST']</code> :<br>\n   <code>status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST</code>.<br>\n3. Si <code>port.trust == 'TRUSTED'</code> :<br>\n   <code>status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC</code>.<br>\n   (Si de plus <code>type == 'ACK'</code> et <code>assigned_ip != '0.0.0.0'</code>, la liaison est insérée dans la base de données Snooping).<br><br>\nPour chaque message, afficher :<br>\n<code>DHCP_SNOOP_REPORT id={id} port={port} type={type} status={status} action={action} reason={reason}</code></p>",
    "starter": "# Grille d'analyse (lan3-c5-e2) — Validateur de base de données de liaison DHCP Snooping\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tentative d'émission de DHCP ACK frauduleux sur port utilisateur]\n# Données : PORT_TRUST name=Fa0/12 trust=UNTRUSTED\n# Données : DHCP_MSG id=ROGUE_ACK port=Fa0/12 type=ACK client_mac=00:aa:bb:cc:dd:ee assigned_ip=10.0.0.99 vlan=1\nA_COMPLETER\n\n[Cas 2 — Requête REQUEST valide émise sur port untrusted]\n# Données : PORT_TRUST name=Gi0/2 trust=UNTRUSTED\n# Données : DHCP_MSG id=REQ1 port=Gi0/2 type=REQUEST client_mac=00:50:56:11:22:33 assigned_ip=172.16.1.100 vlan=20\nA_COMPLETER\n\n[Cas 3 — Uplink de distribution de confiance acheminant Discover et Offer]\n# Données : PORT_TRUST name=Trunk1 trust=TRUSTED\n# Données : DHCP_MSG id=UPL1 port=Trunk1 type=DISCOVER client_mac=00:00:00:00:00:01 assigned_ip=0.0.0.0 vlan=100\n# Données : DHCP_MSG id=UPL2 port=Trunk1 type=OFFER client_mac=00:00:00:00:00:01 assigned_ip=10.100.0.5 vlan=100\nA_COMPLETER\n",
    "hints": [
      "Mémoriser le statut de chaque port (TRUSTED ou UNTRUSTED).",
      "Identifier les réponses serveur OFFER et ACK arrivant sur port UNTRUSTED."
    ],
    "examples": [
      {
        "stdin": "PORT_TRUST name=Gi0/1 trust=UNTRUSTED\nPORT_TRUST name=Gi0/24 trust=TRUSTED\nDHCP_MSG id=M1 port=Gi0/1 type=DISCOVER client_mac=00:11:22:33:44:01 assigned_ip=0.0.0.0 vlan=10\nDHCP_MSG id=M2 port=Gi0/1 type=OFFER client_mac=00:11:22:33:44:01 assigned_ip=192.168.10.50 vlan=10\nDHCP_MSG id=M3 port=Gi0/24 type=ACK client_mac=00:11:22:33:44:01 assigned_ip=192.168.10.50 vlan=10",
        "expected": "DHCP_SNOOP_REPORT id=M1 port=Gi0/1 type=DISCOVER status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST\nDHCP_SNOOP_REPORT id=M2 port=Gi0/1 type=OFFER status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER\nDHCP_SNOOP_REPORT id=M3 port=Gi0/24 type=ACK status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC",
        "note": "M1 est un Discover client normal ; M2 est une tentative d'usurpation DHCP serveur sur port non fiable ; M3 est la réponse légitime du serveur."
      }
    ],
    "tests": [
      {
        "label": "Tentative d'émission de DHCP ACK frauduleux sur port utilisateur",
        "stdin": "cas:1",
        "expected": "DHCP_SNOOP_REPORT id=ROGUE_ACK port=Fa0/12 type=ACK status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER"
      },
      {
        "label": "Requête REQUEST valide émise sur port untrusted",
        "stdin": "cas:2",
        "expected": "DHCP_SNOOP_REPORT id=REQ1 port=Gi0/2 type=REQUEST status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST"
      },
      {
        "label": "Uplink de distribution de confiance acheminant Discover et Offer",
        "stdin": "cas:3",
        "expected": "DHCP_SNOOP_REPORT id=UPL1 port=Trunk1 type=DISCOVER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC\nDHCP_SNOOP_REPORT id=UPL2 port=Trunk1 type=OFFER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC"
      }
    ],
    "solution": "[Exemple]\nDHCP_SNOOP_REPORT id=M1 port=Gi0/1 type=DISCOVER status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST\nDHCP_SNOOP_REPORT id=M2 port=Gi0/1 type=OFFER status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER\nDHCP_SNOOP_REPORT id=M3 port=Gi0/24 type=ACK status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC\n\n[Cas 1 — Tentative d'émission de DHCP ACK frauduleux sur port utilisateur]\nDHCP_SNOOP_REPORT id=ROGUE_ACK port=Fa0/12 type=ACK status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER\n\n[Cas 2 — Requête REQUEST valide émise sur port untrusted]\nDHCP_SNOOP_REPORT id=REQ1 port=Gi0/2 type=REQUEST status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST\n\n[Cas 3 — Uplink de distribution de confiance acheminant Discover et Offer]\nDHCP_SNOOP_REPORT id=UPL1 port=Trunk1 type=DISCOVER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC\nDHCP_SNOOP_REPORT id=UPL2 port=Trunk1 type=OFFER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC"
  },
  {
    "id": "lan3-c5-e3",
    "chapter": 5,
    "title": "Filtre anti-usurpation Dynamic ARP Inspection (DAI)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser des trames ARP en les comparant à des liaisons fournies, sans conclure à une attaque sur ce seul indice.",
    "brief": "<p>Un empoisonnement de cache ARP peut détourner certaines communications si un attaquant parvient à faire accepter une fausse liaison. <strong>Dynamic ARP Inspection (DAI)</strong> vérifie les messages ARP sur les ports non fiables selon les liaisons DHCP ou les ACL ARP configurées.<br><br>\nDans cette grille simplifiée, tous les messages proviennent de ports non fiables et seules les liaisons <code>BINDING</code> fournies sont utilisées ; aucune ACL ARP n'est modélisée. Une différence de liaison ne prouve pas une attaque : elle peut aussi résulter d'une configuration erronée ou périmée. Les actions et alertes ci-dessous sont celles du modèle, pas une garantie sur chaque commutateur.<br><br>\n1. Si <code>(sender_mac, sender_ip, vlan)</code> correspond à une liaison : <code>status=PERMIT action=FORWARD reason=BINDING_MATCH</code>.<br>\n2. Si <code>sender_ip</code> est enregistré pour ce VLAN avec une autre MAC : <code>status=DENY action=DROP_ALERT reason=BINDING_MISMATCH</code>.<br>\n3. Si <code>sender_ip</code> n'est pas enregistré pour ce VLAN : <code>status=DENY action=DROP reason=UNKNOWN_HOST_BINDING</code>.<br><br>\nPour chaque message, indiquez : <code>DAI_AUDIT id={id} vlan={vlan} sender_ip={sender_ip} sender_mac={sender_mac} status={status} action={action} reason={reason}</code>.</p>",
    "starter": "# Grille d'analyse (lan3-c5-e3) — Filtre anti-usurpation Dynamic ARP Inspection (DAI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\n# Données : BINDING mac=00:00:00:00:00:01 ip=10.0.0.1 vlan=10\n# Données : BINDING mac=00:00:00:00:00:02 ip=10.0.0.1 vlan=20\n# Données : ARP_FRAME id=A1 vlan=10 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\n# Données : ARP_FRAME id=A2 vlan=20 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\nA_COMPLETER\n\n[Cas 2 — Requête conforme à la liaison]\n# Données : BINDING mac=00:22:33:44:55:66 ip=172.16.10.5 vlan=5\n# Données : ARP_FRAME id=OK vlan=5 sender_mac=00:22:33:44:55:66 sender_ip=172.16.10.5 target_ip=172.16.10.1\nA_COMPLETER\n\n[Cas 3 — Hôte absent de la base de ce VLAN]\n# Données : BINDING mac=00:11:11:11:11:11 ip=192.168.1.5 vlan=1\n# Données : ARP_FRAME id=UNKNOWN vlan=1 sender_mac=00:99:99:99:99:99 sender_ip=192.168.1.200 target_ip=192.168.1.1\nA_COMPLETER\n",
    "hints": [
      "Normalisez les adresses MAC en minuscules.",
      "Comparez chaque couple (vlan, sender_ip) à la MAC enregistrée dans les liaisons fournies."
    ],
    "examples": [
      {
        "stdin": "BINDING mac=00:11:22:33:44:01 ip=192.168.1.10 vlan=10\nBINDING mac=00:11:22:33:44:02 ip=192.168.1.20 vlan=10\nARP_FRAME id=ARP1 vlan=10 sender_mac=00:11:22:33:44:01 sender_ip=192.168.1.10 target_ip=192.168.1.1\nARP_FRAME id=ARP2 vlan=10 sender_mac=00:aa:bb:cc:dd:ee sender_ip=192.168.1.10 target_ip=192.168.1.20\nARP_FRAME id=ARP3 vlan=10 sender_mac=00:11:22:33:44:99 sender_ip=192.168.1.99 target_ip=192.168.1.1",
        "expected": "DAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING",
        "note": "ARP1 correspond à la liaison ; ARP2 présente une MAC différente ; ARP3 n'a pas de liaison dans ce VLAN."
      }
    ],
    "tests": [
      {
        "label": "VLANs multiples avec la même IP privée dans des domaines isolés",
        "stdin": "cas:1",
        "expected": "DAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=BINDING_MISMATCH"
      },
      {
        "label": "Requête conforme à la liaison",
        "stdin": "cas:2",
        "expected": "DAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH"
      },
      {
        "label": "Hôte absent de la base de ce VLAN",
        "stdin": "cas:3",
        "expected": "DAI_AUDIT id=UNKNOWN vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING"
      }
    ],
    "solution": "[Exemple]\nDAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\nDAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\n\n[Cas 2 — Requête conforme à la liaison]\nDAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH\n\n[Cas 3 — Hôte absent de la base de ce VLAN]\nDAI_AUDIT id=UNKNOWN vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING"
  }
];
