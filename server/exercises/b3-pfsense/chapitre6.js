'use strict';

module.exports = [
  {
    "id": "pf3-c6-e1",
    "chapter": 6,
    "title": "Simulateur d'élection de maître CARP (Common Address Redundancy Protocol)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler l'élection du pare-feu MASTER dans un cluster pfSense en comparant les paramètres advskew CARP.",
    "brief": "<p>Le protocole <strong>CARP (Common Address Redundancy Protocol)</strong> sous FreeBSD/pfSense permet à deux pare-feux de partager une adresse IP virtuelle (VIP) liée à un identifiant virtuel (VHID). Chaque nœud diffuse des annonces périodiques calculées par :<br>\n<code>intervalle = advbase + (advskew / 256.0)</code> (en secondes).<br>\nLe nœud opérationnel ayant le plus petit <code>advskew</code> transmet ses annonces le plus rapidement et devient le <strong>MASTER</strong>. Les autres deviennent <strong>BACKUP</strong>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si <code>alive == 'NO'</code> : le nœud est hors service :<br>\n   <code>role=INIT_DOWN</code>.<br>\n2. Parmi les nœuds actifs (<code>alive == 'YES'</code>) pour un VHID donné :<br>\n   - Le nœud ayant la plus petite valeur d'<code>advskew</code> (en cas d'égalité, le premier dans l'ordre alphabétique du nom) est élu <code>role=MASTER</code>.<br>\n   - Tous les autres nœuds actifs de ce VHID prennent le rôle <code>role=BACKUP</code>.<br>\n3. Calcul de l'intervalle d'annonce pour chaque nœud :<br>\n   <code>interval = advbase + (advskew / 256.0)</code> formaté à 3 décimales (ex: <code>1.000s</code>).<br><br>\nAfficher les résultats triés par <code>vhid</code> croissant, puis par <code>name</code> alphabétique :<br>\n<code>CARP_ELECTION vhid={vhid} node={name} role={role} advskew={advskew} interval={interval:.3f}s</code></p>",
    "starter": "# Grille d'analyse (pf3-c6-e1) — Simulateur d'élection de maître CARP (Common Address Redundancy Protocol)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cluster à 3 nœuds avec départage alphabétique sur égalité advskew]\n# Données : CARP_NODE name=node-b vhid=10 advbase=1 advskew=50 alive=YES\n# Données : CARP_NODE name=node-a vhid=10 advbase=1 advskew=50 alive=YES\n# Données : CARP_NODE name=node-c vhid=10 advbase=1 advskew=100 alive=YES\nA_COMPLETER\n\n[Cas 2 — Tous les nœuds d'un VHID sont hors service]\n# Données : CARP_NODE name=srv1 vhid=5 advbase=2 advskew=0 alive=NO\n# Données : CARP_NODE name=srv2 vhid=5 advbase=2 advskew=10 alive=NO\nA_COMPLETER\n\n[Cas 3 — Plusieurs groupes VHID distincts]\n# Données : CARP_NODE name=wan_pri vhid=1 advbase=1 advskew=0 alive=YES\n# Données : CARP_NODE name=lan_sec vhid=2 advbase=1 advskew=100 alive=YES\n# Données : CARP_NODE name=lan_pri vhid=2 advbase=1 advskew=0 alive=YES\nA_COMPLETER\n",
    "hints": [
      "Regrouper les nœuds par vhid dans un dictionnaire.",
      "Pour chaque vhid, identifier le nœud actif avec le minimum advskew."
    ],
    "examples": [
      {
        "stdin": "CARP_NODE name=fw01 vhid=1 advbase=1 advskew=0 alive=YES\nCARP_NODE name=fw02 vhid=1 advbase=1 advskew=100 alive=YES\nCARP_NODE name=fw01_dmz vhid=2 advbase=1 advskew=0 alive=NO\nCARP_NODE name=fw02_dmz vhid=2 advbase=1 advskew=100 alive=YES",
        "expected": "CARP_ELECTION vhid=1 node=fw01 role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=1 node=fw02 role=BACKUP advskew=100 interval=1.391s\nCARP_ELECTION vhid=2 node=fw01_dmz role=INIT_DOWN advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=fw02_dmz role=MASTER advskew=100 interval=1.391s",
        "note": "Pour VHID 1, fw01 (advskew 0) est MASTER. Pour VHID 2, fw01_dmz est DOWN donc fw02_dmz devient MASTER."
      }
    ],
    "tests": [
      {
        "label": "Cluster à 3 nœuds avec départage alphabétique sur égalité advskew",
        "stdin": "cas:1",
        "expected": "CARP_ELECTION vhid=10 node=node-a role=MASTER advskew=50 interval=1.195s\nCARP_ELECTION vhid=10 node=node-b role=BACKUP advskew=50 interval=1.195s\nCARP_ELECTION vhid=10 node=node-c role=BACKUP advskew=100 interval=1.391s"
      },
      {
        "label": "Tous les nœuds d'un VHID sont hors service",
        "stdin": "cas:2",
        "expected": "CARP_ELECTION vhid=5 node=srv1 role=INIT_DOWN advskew=0 interval=2.000s\nCARP_ELECTION vhid=5 node=srv2 role=INIT_DOWN advskew=10 interval=2.039s"
      },
      {
        "label": "Plusieurs groupes VHID distincts",
        "stdin": "cas:3",
        "expected": "CARP_ELECTION vhid=1 node=wan_pri role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=lan_pri role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=lan_sec role=BACKUP advskew=100 interval=1.391s"
      }
    ],
    "solution": "[Exemple]\nCARP_ELECTION vhid=1 node=fw01 role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=1 node=fw02 role=BACKUP advskew=100 interval=1.391s\nCARP_ELECTION vhid=2 node=fw01_dmz role=INIT_DOWN advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=fw02_dmz role=MASTER advskew=100 interval=1.391s\n\n[Cas 1 — Cluster à 3 nœuds avec départage alphabétique sur égalité advskew]\nCARP_ELECTION vhid=10 node=node-a role=MASTER advskew=50 interval=1.195s\nCARP_ELECTION vhid=10 node=node-b role=BACKUP advskew=50 interval=1.195s\nCARP_ELECTION vhid=10 node=node-c role=BACKUP advskew=100 interval=1.391s\n\n[Cas 2 — Tous les nœuds d'un VHID sont hors service]\nCARP_ELECTION vhid=5 node=srv1 role=INIT_DOWN advskew=0 interval=2.000s\nCARP_ELECTION vhid=5 node=srv2 role=INIT_DOWN advskew=10 interval=2.039s\n\n[Cas 3 — Plusieurs groupes VHID distincts]\nCARP_ELECTION vhid=1 node=wan_pri role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=lan_pri role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=lan_sec role=BACKUP advskew=100 interval=1.391s"
  },
  {
    "id": "pf3-c6-e2",
    "chapter": 6,
    "title": "Parseur d'alertes IDS/IPS Snort/Suricata et blocage IP dynamique",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser les alertes remontées par Snort dans pfSense et alimenter la table de blocage snort2c.",
    "brief": "<p>Le module IDS/IPS (Snort ou Suricata) sur pfSense inspecte le trafic réseau en temps réel. Lorsque l'option de blocage automatique est activée, les adresses IP sources d'attaques à haute sévérité (Priorité 1) sont insérées dynamiquement dans la table de filtrage pf <code>snort2c</code> (DROP immédiat), sauf si l'adresse figure dans la liste blanche (Pass List / Whitelist).<br><br>\nAnalysez les paramètres du problème pour chaque cas.) :<br>\n  <code>WHITELIST ips=&lt;ip1,ip2,...|NONE&gt;</code><br>\n- Les alertes Snort générées :<br>\n  <code>SNORT_ALERT sid=&lt;int&gt; priority=&lt;1|2|3&gt; src_ip=&lt;ip&gt; dst_ip=&lt;ip&gt; msg=&lt;message_sans_espaces&gt;</code><br><br>\nRègles de réaction du moteur IPS :<br>\n1. Si <code>src_ip</code> est présente dans la <code>WHITELIST</code> :<br>\n   <code>action=WHITELIST_PASS action_type=BYPASS detail=PROTECTED_HOST</code>.<br>\n2. Sinon, selon le niveau de priorité de l'alerte :<br>\n   - <strong>Priorité 1 (Critique / Attaque active) :</strong><br>\n     <code>action=BLOCK_IP action_type=PF_SNORT2C detail=DROP_TRAFFIC</code>.<br>\n   - <strong>Priorité 2 (Moyenne / Scan ou violation de politique) :</strong><br>\n     <code>action=LOG_ONLY action_type=SURVEILLANCE detail=ALERT_RECORDED</code>.<br>\n   - <strong>Priorité 3 (Faible / Info réseau) :</strong><br>\n     <code>action=IGNORE action_type=PASS detail=NO_ACTION</code>.<br><br>\nPour chaque alerte, afficher :<br>\n<code>IPS_REPORT sid={sid} priority={priority} src={src_ip} action={action} type={action_type} detail={detail}</code></p>",
    "starter": "# Grille d'analyse (pf3-c6-e2) — Parseur d'alertes IDS/IPS Snort/Suricata et blocage IP dynamique\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Alerte critique bloquée sans whitelist déclarée]\n# Données : WHITELIST ips=NONE\n# Données : SNORT_ALERT sid=2100001 priority=1 src_ip=45.33.32.156 dst_ip=10.0.0.1 msg=MALWARE_CnC_Beacon\nA_COMPLETER\n\n[Cas 2 — Scans répétés de priorité 2 avec journalisation seule]\n# Données : WHITELIST ips=NONE\n# Données : SNORT_ALERT sid=2200001 priority=2 src_ip=185.220.101.5 dst_ip=10.0.0.2 msg=SCAN_PORT_80\n# Données : SNORT_ALERT sid=2200002 priority=2 src_ip=185.220.101.5 dst_ip=10.0.0.2 msg=SCAN_PORT_443\nA_COMPLETER\n\n[Cas 3 — Hôte autorisé en liste blanche déclenchant priorité 2]\n# Données : WHITELIST ips=10.0.0.254\n# Données : SNORT_ALERT sid=2300001 priority=2 src_ip=10.0.0.254 dst_ip=10.0.0.10 msg=POLICY_INTERNAL_SCAN\nA_COMPLETER\n",
    "hints": [
      "Gérer un set pour la WHITELIST.",
      "Vérifier d'abord si src_ip est whitelistée avant d'évaluer la priorité."
    ],
    "examples": [
      {
        "stdin": "WHITELIST ips=192.168.1.1,192.168.1.254\nSNORT_ALERT sid=2001001 priority=1 src_ip=203.0.113.88 dst_ip=192.168.1.50 msg=ET_EXPLOIT_Buffer_Overflow\nSNORT_ALERT sid=2002002 priority=1 src_ip=192.168.1.1 dst_ip=192.168.1.50 msg=ET_DNS_High_Volume\nSNORT_ALERT sid=2003003 priority=2 src_ip=198.51.100.12 dst_ip=192.168.1.50 msg=ET_SCAN_Nmap_SYN\nSNORT_ALERT sid=2004004 priority=3 src_ip=198.51.100.15 dst_ip=192.168.1.50 msg=ET_INFO_ICMP_Ping",
        "expected": "IPS_REPORT sid=2001001 priority=1 src=203.0.113.88 action=BLOCK_IP type=PF_SNORT2C detail=DROP_TRAFFIC\nIPS_REPORT sid=2002002 priority=1 src=192.168.1.1 action=WHITELIST_PASS type=BYPASS detail=PROTECTED_HOST\nIPS_REPORT sid=2003003 priority=2 src=198.51.100.12 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED\nIPS_REPORT sid=2004004 priority=3 src=198.51.100.15 action=IGNORE type=PASS detail=NO_ACTION",
        "note": "L'attaque critique externe est bloquée dans snort2c ; le routeur interne whitelisté est préservé."
      }
    ],
    "tests": [
      {
        "label": "Alerte critique bloquée sans whitelist déclarée",
        "stdin": "cas:1",
        "expected": "IPS_REPORT sid=2100001 priority=1 src=45.33.32.156 action=BLOCK_IP type=PF_SNORT2C detail=DROP_TRAFFIC"
      },
      {
        "label": "Scans répétés de priorité 2 avec journalisation seule",
        "stdin": "cas:2",
        "expected": "IPS_REPORT sid=2200001 priority=2 src=185.220.101.5 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED\nIPS_REPORT sid=2200002 priority=2 src=185.220.101.5 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED"
      },
      {
        "label": "Hôte autorisé en liste blanche déclenchant priorité 2",
        "stdin": "cas:3",
        "expected": "IPS_REPORT sid=2300001 priority=2 src=10.0.0.254 action=WHITELIST_PASS type=BYPASS detail=PROTECTED_HOST"
      }
    ],
    "solution": "[Exemple]\nIPS_REPORT sid=2001001 priority=1 src=203.0.113.88 action=BLOCK_IP type=PF_SNORT2C detail=DROP_TRAFFIC\nIPS_REPORT sid=2002002 priority=1 src=192.168.1.1 action=WHITELIST_PASS type=BYPASS detail=PROTECTED_HOST\nIPS_REPORT sid=2003003 priority=2 src=198.51.100.12 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED\nIPS_REPORT sid=2004004 priority=3 src=198.51.100.15 action=IGNORE type=PASS detail=NO_ACTION\n\n[Cas 1 — Alerte critique bloquée sans whitelist déclarée]\nIPS_REPORT sid=2100001 priority=1 src=45.33.32.156 action=BLOCK_IP type=PF_SNORT2C detail=DROP_TRAFFIC\n\n[Cas 2 — Scans répétés de priorité 2 avec journalisation seule]\nIPS_REPORT sid=2200001 priority=2 src=185.220.101.5 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED\nIPS_REPORT sid=2200002 priority=2 src=185.220.101.5 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED\n\n[Cas 3 — Hôte autorisé en liste blanche déclenchant priorité 2]\nIPS_REPORT sid=2300001 priority=2 src=10.0.0.254 action=WHITELIST_PASS type=BYPASS detail=PROTECTED_HOST"
  },
  {
    "id": "pf3-c6-e3",
    "chapter": 6,
    "title": "Auditeur de synchronisation d'états pfsync et dérive de configuration XMLRPC",
    "level": "n3",
    "language": "analyse",
    "goal": "Contrôler la cohérence de la table d'états pfsync et détecter la dérive de configuration XMLRPC entre nœuds HA.",
    "brief": "<p>Dans une architecture de haute disponibilité pfSense (HA), deux mécanismes garantissent la continuité de service sans coupure :<br>\n- <strong>pfsync :</strong> réplique les sessions réseau de la table d'états du pare-feu primaire vers le secondaire.<br>\n- <strong>XMLRPC Sync :</strong> synchronise les sections de configuration (<code>config.xml</code>) du primaire vers le secondaire.<br><br>\nAnalysez les paramètres du problème pour chaque cas. <strong>Synchronisation pfsync (pour chaque état présent sur le primaire) :</strong><br>\n   - Si l'ID d'état est absent du secondaire :<br>\n     <code>status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE</code><br>\n   - Si l'ID est présent mais avec un <code>state</code> différent :<br>\n     <code>status=OUT_OF_SYNC issue=STATE_MISMATCH action=UPDATE_STATE</code><br>\n   - Si l'ID et l'état sont identiques :<br>\n     <code>status=SYNC_OK issue=NONE action=NONE</code><br>\n   Afficher les états du primaire triés par <code>id</code> :<br>\n   <code>PFSYNC_AUDIT id={id} status={status} issue={issue} action={action}</code><br><br>\n2. <strong>Synchronisation XMLRPC (pour chaque section de configuration) :</strong><br>\n   - Si <code>pri_hash == sec_hash</code> :<br>\n     <code>status=IN_SYNC action=NONE</code><br>\n   - Si <code>pri_hash != sec_hash</code> :<br>\n     <code>status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC</code><br>\n   Afficher les sections triées par <code>name</code> :<br>\n   <code>XMLRPC_AUDIT section={name} status={status} action={action}</code></p>",
    "starter": "# Grille d'analyse (pf3-c6-e3) — Auditeur de synchronisation d'états pfsync et dérive de configuration XMLRPC\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cluster parfaitement synchronisé sans dérive]\n# Données : STATE_PRI id=S10 proto=udp endpoints=192.168.1.10:53->8.8.8.8:53 state=ESTABLISHED\n# Données : STATE_SEC id=S10 proto=udp endpoints=192.168.1.10:53->8.8.8.8:53 state=ESTABLISHED\n# Données : CONFIG_SECTION name=aliases pri_hash=ff00 sec_hash=ff00\nA_COMPLETER\n\n[Cas 2 — Dérive globale de configuration XMLRPC sur plusieurs sections]\n# Données : CONFIG_SECTION name=system pri_hash=1111 sec_hash=2222\n# Données : CONFIG_SECTION name=openvpn pri_hash=3333 sec_hash=4444\nA_COMPLETER\n\n[Cas 3 — États manquants multiples sur le secondaire]\n# Données : STATE_PRI id=A1 proto=tcp endpoints=1.1.1.1->2.2.2.2 state=ESTABLISHED\n# Données : STATE_PRI id=A2 proto=tcp endpoints=1.1.1.1->3.3.3.3 state=SYN_SENT\nA_COMPLETER\n",
    "hints": [
      "Comparer les clés du primaire avec celles du secondaire.",
      "Trier les sorties pfsync par id, et XMLRPC par name."
    ],
    "examples": [
      {
        "stdin": "STATE_PRI id=S1 proto=tcp endpoints=10.0.0.5:443->1.1.1.1:443 state=ESTABLISHED\nSTATE_PRI id=S2 proto=tcp endpoints=10.0.0.6:80->2.2.2.2:80 state=ESTABLISHED\nSTATE_PRI id=S3 proto=tcp endpoints=10.0.0.7:22->3.3.3.3:22 state=FIN_WAIT\nSTATE_SEC id=S1 proto=tcp endpoints=10.0.0.5:443->1.1.1.1:443 state=ESTABLISHED\nSTATE_SEC id=S3 proto=tcp endpoints=10.0.0.7:22->3.3.3.3:22 state=ESTABLISHED\nCONFIG_SECTION name=filter pri_hash=a1b2 sec_hash=a1b2\nCONFIG_SECTION name=nat pri_hash=c3d4 sec_hash=e5f6",
        "expected": "PFSYNC_AUDIT id=S1 status=SYNC_OK issue=NONE action=NONE\nPFSYNC_AUDIT id=S2 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE\nPFSYNC_AUDIT id=S3 status=OUT_OF_SYNC issue=STATE_MISMATCH action=UPDATE_STATE\nXMLRPC_AUDIT section=filter status=IN_SYNC action=NONE\nXMLRPC_AUDIT section=nat status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC",
        "note": "S1 est synchronisé ; S2 est manquant sur le secours ; S3 a un état désynchronisé (FIN_WAIT vs ESTABLISHED) ; la section nat présente une dérive de configuration."
      }
    ],
    "tests": [
      {
        "label": "Cluster parfaitement synchronisé sans dérive",
        "stdin": "cas:1",
        "expected": "PFSYNC_AUDIT id=S10 status=SYNC_OK issue=NONE action=NONE\nXMLRPC_AUDIT section=aliases status=IN_SYNC action=NONE"
      },
      {
        "label": "Dérive globale de configuration XMLRPC sur plusieurs sections",
        "stdin": "cas:2",
        "expected": "XMLRPC_AUDIT section=openvpn status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC\nXMLRPC_AUDIT section=system status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC"
      },
      {
        "label": "États manquants multiples sur le secondaire",
        "stdin": "cas:3",
        "expected": "PFSYNC_AUDIT id=A1 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE\nPFSYNC_AUDIT id=A2 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE"
      }
    ],
    "solution": "[Exemple]\nPFSYNC_AUDIT id=S1 status=SYNC_OK issue=NONE action=NONE\nPFSYNC_AUDIT id=S2 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE\nPFSYNC_AUDIT id=S3 status=OUT_OF_SYNC issue=STATE_MISMATCH action=UPDATE_STATE\nXMLRPC_AUDIT section=filter status=IN_SYNC action=NONE\nXMLRPC_AUDIT section=nat status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC\n\n[Cas 1 — Cluster parfaitement synchronisé sans dérive]\nPFSYNC_AUDIT id=S10 status=SYNC_OK issue=NONE action=NONE\nXMLRPC_AUDIT section=aliases status=IN_SYNC action=NONE\n\n[Cas 2 — Dérive globale de configuration XMLRPC sur plusieurs sections]\nXMLRPC_AUDIT section=openvpn status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC\nXMLRPC_AUDIT section=system status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC\n\n[Cas 3 — États manquants multiples sur le secondaire]\nPFSYNC_AUDIT id=A1 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE\nPFSYNC_AUDIT id=A2 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE"
  }
];
