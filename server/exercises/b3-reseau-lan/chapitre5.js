/**
 * Exercices Chapitre 5 — Réseau LAN Avancé B3.
 * Sécurité Avancée des Commutateurs LAN (Port Security, DHCP Snooping & DAI).
 */
'use strict';

module.exports = [
  {
    id: 'lan3-c5-e1',
    chapter: 5,
    title: 'Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)',
    level: 'n1',
    language: 'python',
    goal: 'Simuler le mécanisme Cisco Port Security et les modes de réaction face aux adresses MAC non autorisées.',
    brief: `<p>La fonctionnalité <strong>Port Security</strong> sur les commutateurs de niveau 2 restreint l'accès d'un port aux seules adresses MAC approuvées (statiques ou apprises dynamiquement jusqu'à un quota <code>max_mac</code>).<br><br>
Modes de violation lorsqu'une adresse MAC non autorisée émet une trame :<br>
- <strong>protect :</strong> Détruit silencieusement la trame sans générer de log ni incrémenter de compteur ; le port reste opérationnel pour les MACs légitimes (&rarr; <code>action=DROP_SILENT state=UP</code>).<br>
- <strong>restrict :</strong> Détruit la trame, incrémente le compteur de violations et émet un piège SNMP / log syslog ; le port reste UP (&rarr; <code>action=DROP_ALERT state=UP</code>).<br>
- <strong>shutdown :</strong> Désactive immédiatement le port physique qui passe en état d'erreur irrécupérable <code>ERR_DISABLE</code> (&rarr; <code>action=PORT_SHUTDOWN state=ERR_DISABLE</code>). Toutes les trames suivantes reçues sur ce port sont rejetées (&rarr; <code>action=DROP state=ERR_DISABLE</code>).<br><br>
Le script lit sur l'entrée standard :<br>
- La configuration du port :<br>
  <code>PORT_SEC port=&lt;nom&gt; max_mac=&lt;int&gt; mode=&lt;protect|restrict|shutdown&gt; sticky_macs=&lt;mac1,mac2,...|NONE&gt;</code><br>
- Les trames arrivant sur le port :<br>
  <code>FRAME id=&lt;nom&gt; src_mac=&lt;mac&gt;</code><br><br>
Pour chaque trame, afficher :<br>
<code>PORT_SEC_REPORT id={id} port={port} mac={src_mac} status={PERMIT|VIOLATION|PORT_DOWN} action={action} state={state}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : gérer la table des MACs autorisées et réagir aux violations
`,
    hints: [
      'Stocker les MACs connues dans une liste ordonnée ou un set.',
      'Si le port est déjà en ERR_DISABLE, rejeter toute nouvelle trame (PORT_DOWN).',
      'Si une nouvelle MAC arrive alors que len(known) < max_mac, l\'ajouter sans violation.'
    ],
    examples: [
      {
        stdin: 'PORT_SEC port=Fa0/1 max_mac=1 mode=shutdown sticky_macs=00:11:22:33:44:01\nFRAME id=F1 src_mac=00:11:22:33:44:01\nFRAME id=F2 src_mac=00:aa:bb:cc:dd:02\nFRAME id=F3 src_mac=00:11:22:33:44:01',
        expected: 'PORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE',
        note: 'F1 est autorisée ; F2 déclenche le shutdown du port ; F3 arrive sur un port désactivé.'
      }
    ],
    tests: [
      {
        label: 'Mode restrict conservant le port UP avec drop et alerte',
        stdin: 'PORT_SEC port=Gi0/1 max_mac=1 mode=restrict sticky_macs=00:00:00:00:00:01\nFRAME id=R1 src_mac=00:00:00:00:00:01\nFRAME id=R2 src_mac=00:00:00:00:00:99\nFRAME id=R3 src_mac=00:00:00:00:00:01',
        expected: 'PORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP'
      },
      {
        label: 'Mode protect silencieux',
        stdin: 'PORT_SEC port=Fa0/5 max_mac=1 mode=protect sticky_macs=NONE\nFRAME id=P1 src_mac=00:50:56:00:00:01\nFRAME id=P2 src_mac=00:50:56:00:00:02',
        expected: 'PORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP'
      },
      {
        label: 'Apprentissage dynamique jusqu\'à max_mac=2',
        stdin: 'PORT_SEC port=Eth1 max_mac=2 mode=shutdown sticky_macs=NONE\nFRAME id=D1 src_mac=00:01:02:03:04:01\nFRAME id=D2 src_mac=00:01:02:03:04:02\nFRAME id=D3 src_mac=00:01:02:03:04:03',
        expected: 'PORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

port_name = ""
max_mac = 1
mode = "shutdown"
known_macs = set()
port_state = "UP"

for ligne in lignes:
    if ligne.startswith("PORT_SEC "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("port="):
                port_name = p.split("=", 1)[1]
            elif p.startswith("max_mac="):
                max_mac = int(p.split("=", 1)[1])
            elif p.startswith("mode="):
                mode = p.split("=", 1)[1]
            elif p.startswith("sticky_macs="):
                raw = p.split("=", 1)[1]
                if raw != "NONE":
                    known_macs = {x.strip().lower() for x in raw.split(",") if x.strip()}

    elif ligne.startswith("FRAME "):
        parts = ligne.split()
        fid = None
        src_mac = ""
        for p in parts[1:]:
            if p.startswith("id="):
                fid = p.split("=", 1)[1]
            elif p.startswith("src_mac="):
                src_mac = p.split("=", 1)[1].lower()

        if port_state == "ERR_DISABLE":
            status = "PORT_DOWN"
            action = "DROP"
            state = "ERR_DISABLE"
        elif src_mac in known_macs:
            status = "PERMIT"
            action = "FORWARD"
            state = "UP"
        elif len(known_macs) < max_mac:
            known_macs.add(src_mac)
            status = "PERMIT"
            action = "FORWARD"
            state = "UP"
        else: # Violation !
            status = "VIOLATION"
            if mode == "protect":
                action = "DROP_SILENT"
                state = "UP"
            elif mode == "restrict":
                action = "DROP_ALERT"
                state = "UP"
            else: # shutdown
                action = "PORT_SHUTDOWN"
                state = "ERR_DISABLE"
                port_state = "ERR_DISABLE"

        print(f"PORT_SEC_REPORT id={fid} port={port_name} mac={src_mac} status={status} action={action} state={state}")
`
  },
  {
    id: 'lan3-c5-e2',
    chapter: 5,
    title: 'Validateur de base de données de liaison DHCP Snooping',
    level: 'n2',
    language: 'python',
    goal: 'Filtrer les messages DHCP selon le statut de confiance des ports et alimenter la base de liaison (Binding DB).',
    brief: `<p>L'attaque par serveur DHCP pirate (Rogue DHCP Server) permet à un attaquant de distribuer de fausses passerelles et de faux serveurs DNS aux postes du réseau. La parade <strong>DHCP Snooping</strong> classe les ports du commutateur en deux catégories :<br>
- <strong>Ports de confiance (TRUSTED) :</strong> Reliés aux serveurs DHCP légitimes ou aux uplinks de distribution. Tous les messages DHCP y sont autorisés.<br>
- <strong>Ports non fiables (UNTRUSTED) :</strong> Reliés aux utilisateurs finals. Seules les requêtes clients (<code>DISCOVER</code>, <code>REQUEST</code>) y sont autorisées. Si une réponse serveur (<code>OFFER</code> ou <code>ACK</code>) y est détectée, elle est immédiatement détruite et signalée comme attaque Rogue DHCP.<br><br>
Le script lit sur l'entrée standard :<br>
- La configuration de confiance des ports :<br>
  <code>PORT_TRUST name=&lt;nom&gt; trust=&lt;TRUSTED|UNTRUSTED&gt;</code><br>
- Les paquets DHCP interceptés :<br>
  <code>DHCP_MSG id=&lt;nom&gt; port=&lt;nom&gt; type=&lt;DISCOVER|OFFER|REQUEST|ACK&gt; client_mac=&lt;mac&gt; assigned_ip=&lt;ip&gt; vlan=&lt;int&gt;</code><br><br>
Règles de traitement :<br>
1. Si <code>port.trust == 'UNTRUSTED'</code> et <code>type in ['OFFER', 'ACK']</code> :<br>
   <code>status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER</code>.<br>
2. Si <code>port.trust == 'UNTRUSTED'</code> et <code>type in ['DISCOVER', 'REQUEST']</code> :<br>
   <code>status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST</code>.<br>
3. Si <code>port.trust == 'TRUSTED'</code> :<br>
   <code>status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC</code>.<br>
   (Si de plus <code>type == 'ACK'</code> et <code>assigned_ip != '0.0.0.0'</code>, la liaison est insérée dans la base de données Snooping).<br><br>
Pour chaque message, afficher :<br>
<code>DHCP_SNOOP_REPORT id={id} port={port} type={type} status={status} action={action} reason={reason}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les ports et sécuriser les échanges DHCP
`,
    hints: [
      'Mémoriser le statut de chaque port (TRUSTED ou UNTRUSTED).',
      'Identifier les réponses serveur OFFER et ACK arrivant sur port UNTRUSTED.'
    ],
    examples: [
      {
        stdin: 'PORT_TRUST name=Gi0/1 trust=UNTRUSTED\nPORT_TRUST name=Gi0/24 trust=TRUSTED\nDHCP_MSG id=M1 port=Gi0/1 type=DISCOVER client_mac=00:11:22:33:44:01 assigned_ip=0.0.0.0 vlan=10\nDHCP_MSG id=M2 port=Gi0/1 type=OFFER client_mac=00:11:22:33:44:01 assigned_ip=192.168.10.50 vlan=10\nDHCP_MSG id=M3 port=Gi0/24 type=ACK client_mac=00:11:22:33:44:01 assigned_ip=192.168.10.50 vlan=10',
        expected: 'DHCP_SNOOP_REPORT id=M1 port=Gi0/1 type=DISCOVER status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST\nDHCP_SNOOP_REPORT id=M2 port=Gi0/1 type=OFFER status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER\nDHCP_SNOOP_REPORT id=M3 port=Gi0/24 type=ACK status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC',
        note: 'M1 est un Discover client normal ; M2 est une tentative d\'usurpation DHCP serveur sur port non fiable ; M3 est la réponse légitime du serveur.'
      }
    ],
    tests: [
      {
        label: 'Tentative d\'émission de DHCP ACK frauduleux sur port utilisateur',
        stdin: 'PORT_TRUST name=Fa0/12 trust=UNTRUSTED\nDHCP_MSG id=ROGUE_ACK port=Fa0/12 type=ACK client_mac=00:aa:bb:cc:dd:ee assigned_ip=10.0.0.99 vlan=1',
        expected: 'DHCP_SNOOP_REPORT id=ROGUE_ACK port=Fa0/12 type=ACK status=SECURITY_VIOLATION action=DROP reason=ROGUE_DHCP_SERVER'
      },
      {
        label: 'Requête REQUEST valide émise sur port untrusted',
        stdin: 'PORT_TRUST name=Gi0/2 trust=UNTRUSTED\nDHCP_MSG id=REQ1 port=Gi0/2 type=REQUEST client_mac=00:50:56:11:22:33 assigned_ip=172.16.1.100 vlan=20',
        expected: 'DHCP_SNOOP_REPORT id=REQ1 port=Gi0/2 type=REQUEST status=PERMIT action=FORWARD reason=LEGIT_CLIENT_REQUEST'
      },
      {
        label: 'Uplink de distribution de confiance acheminant Discover et Offer',
        stdin: 'PORT_TRUST name=Trunk1 trust=TRUSTED\nDHCP_MSG id=UPL1 port=Trunk1 type=DISCOVER client_mac=00:00:00:00:00:01 assigned_ip=0.0.0.0 vlan=100\nDHCP_MSG id=UPL2 port=Trunk1 type=OFFER client_mac=00:00:00:00:00:01 assigned_ip=10.100.0.5 vlan=100',
        expected: 'DHCP_SNOOP_REPORT id=UPL1 port=Trunk1 type=DISCOVER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC\nDHCP_SNOOP_REPORT id=UPL2 port=Trunk1 type=OFFER status=PERMIT action=FORWARD reason=TRUSTED_PORT_TRAFFIC'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

trust_map = {}

for ligne in lignes:
    if ligne.startswith("PORT_TRUST "):
        parts = ligne.split()
        pname = ""
        trust = "UNTRUSTED"
        for p in parts[1:]:
            if p.startswith("name="):
                pname = p.split("=", 1)[1]
            elif p.startswith("trust="):
                trust = p.split("=", 1)[1]
        trust_map[pname] = trust

    elif ligne.startswith("DHCP_MSG "):
        parts = ligne.split()
        mid = None
        port = ""
        mtype = ""
        for p in parts[1:]:
            if p.startswith("id="):
                mid = p.split("=", 1)[1]
            elif p.startswith("port="):
                port = p.split("=", 1)[1]
            elif p.startswith("type="):
                mtype = p.split("=", 1)[1]

        t_val = trust_map.get(port, "UNTRUSTED")

        if t_val == "UNTRUSTED" and mtype in ["OFFER", "ACK"]:
            status = "SECURITY_VIOLATION"
            action = "DROP"
            reason = "ROGUE_DHCP_SERVER"
        elif t_val == "UNTRUSTED":
            status = "PERMIT"
            action = "FORWARD"
            reason = "LEGIT_CLIENT_REQUEST"
        else: # TRUSTED
            status = "PERMIT"
            action = "FORWARD"
            reason = "TRUSTED_PORT_TRAFFIC"

        print(f"DHCP_SNOOP_REPORT id={mid} port={port} type={mtype} status={status} action={action} reason={reason}")
`
  },
  {
    id: 'lan3-c5-e3',
    chapter: 5,
    title: 'Filtre anti-usurpation Dynamic ARP Inspection (DAI)',
    level: 'n3',
    language: 'python',
    goal: 'Valider les trames ARP en croisant les couples (IP, MAC) avec la base de données DHCP Snooping.',
    brief: `<p>L'attaque par <strong>empoisonnement de cache ARP (ARP Poisoning / ARP Spoofing)</strong> permet à un pirate d'intercepter tout le trafic d'un sous-réseau en s'interposant entre les postes et la passerelle (Man-in-the-Middle).<br>
Le mécanisme <strong>Dynamic ARP Inspection (DAI)</strong> intercepte toutes les requêtes et réponses ARP sur les ports non fiables et valide la cohérence du couple <code>(sender_ip, sender_mac)</code> par rapport à la base de liaison <strong>DHCP Snooping Binding Database</strong>.<br><br>
Le script lit sur l'entrée standard :<br>
- Les liaisons valides enregistrées dans la base Snooping :<br>
  <code>BINDING mac=&lt;mac&gt; ip=&lt;ip&gt; vlan=&lt;int&gt;</code><br>
- Les paquets ARP circulant sur le réseau :<br>
  <code>ARP_FRAME id=&lt;nom&gt; vlan=&lt;int&gt; sender_mac=&lt;mac&gt; sender_ip=&lt;ip&gt; target_ip=&lt;ip&gt;</code><br><br>
Règles d'inspection DAI :<br>
Pour chaque paquet ARP :<br>
1. Si le couple <code>(sender_mac, sender_ip, vlan)</code> correspond exactement à une entrée de la base BINDING :<br>
   <code>status=PERMIT action=FORWARD reason=BINDING_MATCH</code>.<br>
2. Si <code>sender_ip</code> existe dans la base pour ce <code>vlan</code> mais avec une <code>mac</code> différente (usurpation d'IP avérée) :<br>
   <code>status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED</code>.<br>
3. Si <code>sender_ip</code> n'existe pas du tout dans la base de données :<br>
   <code>status=DENY action=DROP reason=UNKNOWN_HOST_BINDING</code>.<br><br>
Pour chaque paquet ARP, afficher :<br>
<code>DAI_AUDIT id={id} vlan={vlan} sender_ip={sender_ip} sender_mac={sender_mac} status={status} action={action} reason={reason}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : charger la table BINDING et inspecter chaque paquet ARP
`,
    hints: [
      'Normaliser les adresses MAC en minuscules.',
      'Gérer un dictionnaire indexé par (vlan, sender_ip) renvoyant la MAC légitime.'
    ],
    examples: [
      {
        stdin: 'BINDING mac=00:11:22:33:44:01 ip=192.168.1.10 vlan=10\nBINDING mac=00:11:22:33:44:02 ip=192.168.1.20 vlan=10\nARP_FRAME id=ARP1 vlan=10 sender_mac=00:11:22:33:44:01 sender_ip=192.168.1.10 target_ip=192.168.1.1\nARP_FRAME id=ARP2 vlan=10 sender_mac=00:aa:bb:cc:dd:ee sender_ip=192.168.1.10 target_ip=192.168.1.20\nARP_FRAME id=ARP3 vlan=10 sender_mac=00:11:22:33:44:99 sender_ip=192.168.1.99 target_ip=192.168.1.1',
        expected: 'DAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING',
        note: 'ARP1 est légitime ; ARP2 usurpe l\'IP 192.168.1.10 avec une fausse MAC ; ARP3 est inconnu dans le bail DHCP.'
      }
    ],
    tests: [
      {
        label: 'VLANs multiples avec la même IP privée dans des domaines isolés',
        stdin: 'BINDING mac=00:00:00:00:00:01 ip=10.0.0.1 vlan=10\nBINDING mac=00:00:00:00:00:02 ip=10.0.0.1 vlan=20\nARP_FRAME id=A1 vlan=10 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\nARP_FRAME id=A2 vlan=20 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254',
        expected: 'DAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=ARP_SPOOFING_DETECTED'
      },
      {
        label: 'Toutes requêtes ARP légitimes',
        stdin: 'BINDING mac=00:22:33:44:55:66 ip=172.16.10.5 vlan=5\nARP_FRAME id=OK vlan=5 sender_mac=00:22:33:44:55:66 sender_ip=172.16.10.5 target_ip=172.16.10.1',
        expected: 'DAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH'
      },
      {
        label: 'Hôte inconnu non attribué par DHCP',
        stdin: 'BINDING mac=00:11:11:11:11:11 ip=192.168.1.5 vlan=1\nARP_FRAME id=ROGUE vlan=1 sender_mac=00:99:99:99:99:99 sender_ip=192.168.1.200 target_ip=192.168.1.1',
        expected: 'DAI_AUDIT id=ROGUE vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# Clé : (vlan, ip) -> mac_legitime
bindings = {}

for ligne in lignes:
    if ligne.startswith("BINDING "):
        parts = ligne.split()
        mac = ""
        ip = ""
        vlan = 1
        for p in parts[1:]:
            if p.startswith("mac="):
                mac = p.split("=", 1)[1].lower()
            elif p.startswith("ip="):
                ip = p.split("=", 1)[1]
            elif p.startswith("vlan="):
                vlan = int(p.split("=", 1)[1])
        bindings[(vlan, ip)] = mac

    elif ligne.startswith("ARP_FRAME "):
        parts = ligne.split()
        aid = None
        vlan = 1
        sender_mac = ""
        sender_ip = ""
        for p in parts[1:]:
            if p.startswith("id="):
                aid = p.split("=", 1)[1]
            elif p.startswith("vlan="):
                vlan = int(p.split("=", 1)[1])
            elif p.startswith("sender_mac="):
                sender_mac = p.split("=", 1)[1].lower()
            elif p.startswith("sender_ip="):
                sender_ip = p.split("=", 1)[1]

        key = (vlan, sender_ip)
        if key in bindings:
            if bindings[key] == sender_mac:
                status = "PERMIT"
                action = "FORWARD"
                reason = "BINDING_MATCH"
            else:
                status = "DENY"
                action = "DROP_ALERT"
                reason = "ARP_SPOOFING_DETECTED"
        else:
            status = "DENY"
            action = "DROP"
            reason = "UNKNOWN_HOST_BINDING"

        print(f"DAI_AUDIT id={aid} vlan={vlan} sender_ip={sender_ip} sender_mac={sender_mac} status={status} action={action} reason={reason}")
`
  }
];
