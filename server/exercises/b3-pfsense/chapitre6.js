/**
 * Exercices Chapitre 6 — pfSense & Routage B3.
 * Haute Disponibilité (CARP/pfsync) & Sécurité Avancée (IDS/IPS).
 */
'use strict';

module.exports = [
  {
    id: 'pf3-c6-e1',
    chapter: 6,
    title: 'Simulateur d\'élection de maître CARP (Common Address Redundancy Protocol)',
    level: 'n1',
    language: 'python',
    goal: 'Simuler l\'élection du pare-feu MASTER dans un cluster pfSense en comparant les paramètres advskew CARP.',
    brief: `<p>Le protocole <strong>CARP (Common Address Redundancy Protocol)</strong> sous FreeBSD/pfSense permet à deux pare-feux de partager une adresse IP virtuelle (VIP) liée à un identifiant virtuel (VHID). Chaque nœud diffuse des annonces périodiques calculées par :<br>
<code>intervalle = advbase + (advskew / 256.0)</code> (en secondes).<br>
Le nœud opérationnel ayant le plus petit <code>advskew</code> transmet ses annonces le plus rapidement et devient le <strong>MASTER</strong>. Les autres deviennent <strong>BACKUP</strong>.<br><br>
Le script lit sur l'entrée standard des déclarations de nœuds CARP :<br>
<code>CARP_NODE name=&lt;nom&gt; vhid=&lt;int&gt; advbase=&lt;int&gt; advskew=&lt;int&gt; alive=&lt;YES|NO&gt;</code><br><br>
Règles d'élection par groupe VHID :<br>
1. Si <code>alive == 'NO'</code> : le nœud est hors service :<br>
   <code>role=INIT_DOWN</code>.<br>
2. Parmi les nœuds actifs (<code>alive == 'YES'</code>) pour un VHID donné :<br>
   - Le nœud ayant la plus petite valeur d'<code>advskew</code> (en cas d'égalité, le premier dans l'ordre alphabétique du nom) est élu <code>role=MASTER</code>.<br>
   - Tous les autres nœuds actifs de ce VHID prennent le rôle <code>role=BACKUP</code>.<br>
3. Calcul de l'intervalle d'annonce pour chaque nœud :<br>
   <code>interval = advbase + (advskew / 256.0)</code> formaté à 3 décimales (ex: <code>1.000s</code>).<br><br>
Afficher les résultats triés par <code>vhid</code> croissant, puis par <code>name</code> alphabétique :<br>
<code>CARP_ELECTION vhid={vhid} node={name} role={role} advskew={advskew} interval={interval:.3f}s</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : regrouper les nœuds par VHID, élire le MASTER et formater les intervalles
`,
    hints: [
      'Regrouper les nœuds par vhid dans un dictionnaire.',
      'Pour chaque vhid, identifier le nœud actif avec le minimum advskew.'
    ],
    examples: [
      {
        stdin: 'CARP_NODE name=fw01 vhid=1 advbase=1 advskew=0 alive=YES\nCARP_NODE name=fw02 vhid=1 advbase=1 advskew=100 alive=YES\nCARP_NODE name=fw01_dmz vhid=2 advbase=1 advskew=0 alive=NO\nCARP_NODE name=fw02_dmz vhid=2 advbase=1 advskew=100 alive=YES',
        expected: 'CARP_ELECTION vhid=1 node=fw01 role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=1 node=fw02 role=BACKUP advskew=100 interval=1.391s\nCARP_ELECTION vhid=2 node=fw01_dmz role=INIT_DOWN advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=fw02_dmz role=MASTER advskew=100 interval=1.391s',
        note: 'Pour VHID 1, fw01 (advskew 0) est MASTER. Pour VHID 2, fw01_dmz est DOWN donc fw02_dmz devient MASTER.'
      }
    ],
    tests: [
      {
        label: 'Cluster à 3 nœuds avec départage alphabétique sur égalité advskew',
        stdin: 'CARP_NODE name=node-b vhid=10 advbase=1 advskew=50 alive=YES\nCARP_NODE name=node-a vhid=10 advbase=1 advskew=50 alive=YES\nCARP_NODE name=node-c vhid=10 advbase=1 advskew=100 alive=YES',
        expected: 'CARP_ELECTION vhid=10 node=node-a role=MASTER advskew=50 interval=1.195s\nCARP_ELECTION vhid=10 node=node-b role=BACKUP advskew=50 interval=1.195s\nCARP_ELECTION vhid=10 node=node-c role=BACKUP advskew=100 interval=1.391s'
      },
      {
        label: 'Tous les nœuds d\'un VHID sont hors service',
        stdin: 'CARP_NODE name=srv1 vhid=5 advbase=2 advskew=0 alive=NO\nCARP_NODE name=srv2 vhid=5 advbase=2 advskew=10 alive=NO',
        expected: 'CARP_ELECTION vhid=5 node=srv1 role=INIT_DOWN advskew=0 interval=2.000s\nCARP_ELECTION vhid=5 node=srv2 role=INIT_DOWN advskew=10 interval=2.039s'
      },
      {
        label: 'Plusieurs groupes VHID distincts',
        stdin: 'CARP_NODE name=wan_pri vhid=1 advbase=1 advskew=0 alive=YES\nCARP_NODE name=lan_sec vhid=2 advbase=1 advskew=100 alive=YES\nCARP_NODE name=lan_pri vhid=2 advbase=1 advskew=0 alive=YES',
        expected: 'CARP_ELECTION vhid=1 node=wan_pri role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=lan_pri role=MASTER advskew=0 interval=1.000s\nCARP_ELECTION vhid=2 node=lan_sec role=BACKUP advskew=100 interval=1.391s'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

nodes = []

for ligne in lignes:
    if not ligne.startswith("CARP_NODE "):
        continue
    parts = ligne.split()
    name = None
    vhid = None
    advbase = 1
    advskew = 0
    alive = "NO"
    for p in parts[1:]:
        if p.startswith("name="):
            name = p.split("=", 1)[1]
        elif p.startswith("vhid="):
            vhid = int(p.split("=", 1)[1])
        elif p.startswith("advbase="):
            advbase = int(p.split("=", 1)[1])
        elif p.startswith("advskew="):
            advskew = int(p.split("=", 1)[1])
        elif p.startswith("alive="):
            alive = p.split("=", 1)[1]

    nodes.append({
        "name": name,
        "vhid": vhid,
        "advbase": advbase,
        "advskew": advskew,
        "alive": alive
    })

# Group by vhid
by_vhid = {}
for n in nodes:
    by_vhid.setdefault(n["vhid"], []).append(n)

# Determine role for each node
results = []
for vhid in sorted(by_vhid.keys()):
    group = by_vhid[vhid]
    alive_nodes = [n for n in group if n["alive"] == "YES"]

    master_name = None
    if alive_nodes:
        # Min advskew, tie-break by name
        alive_sorted = sorted(alive_nodes, key=lambda x: (x["advskew"], x["name"]))
        master_name = alive_sorted[0]["name"]

    for n in sorted(group, key=lambda x: x["name"]):
        if n["alive"] == "NO":
            role = "INIT_DOWN"
        elif n["name"] == master_name:
            role = "MASTER"
        else:
            role = "BACKUP"

        interval = n["advbase"] + (n["advskew"] / 256.0)
        results.append(f"CARP_ELECTION vhid={vhid} node={n['name']} role={role} advskew={n['advskew']} interval={interval:.3f}s")

for r in results:
    print(r)
`
  },
  {
    id: 'pf3-c6-e2',
    chapter: 6,
    title: 'Parseur d\'alertes IDS/IPS Snort/Suricata et blocage IP dynamique',
    level: 'n2',
    language: 'python',
    goal: 'Analyser les alertes remontées par Snort dans pfSense et alimenter la table de blocage snort2c.',
    brief: `<p>Le module IDS/IPS (Snort ou Suricata) sur pfSense inspecte le trafic réseau en temps réel. Lorsque l'option de blocage automatique est activée, les adresses IP sources d'attaques à haute sévérité (Priorité 1) sont insérées dynamiquement dans la table de filtrage pf <code>snort2c</code> (DROP immédiat), sauf si l'adresse figure dans la liste blanche (Pass List / Whitelist).<br><br>
Le script lit sur l'entrée standard :<br>
- Les adresses IP en liste blanche (adresses de passerelle, DNS interne, etc.) :<br>
  <code>WHITELIST ips=&lt;ip1,ip2,...|NONE&gt;</code><br>
- Les alertes Snort générées :<br>
  <code>SNORT_ALERT sid=&lt;int&gt; priority=&lt;1|2|3&gt; src_ip=&lt;ip&gt; dst_ip=&lt;ip&gt; msg=&lt;message_sans_espaces&gt;</code><br><br>
Règles de réaction du moteur IPS :<br>
1. Si <code>src_ip</code> est présente dans la <code>WHITELIST</code> :<br>
   <code>action=WHITELIST_PASS action_type=BYPASS detail=PROTECTED_HOST</code>.<br>
2. Sinon, selon le niveau de priorité de l'alerte :<br>
   - <strong>Priorité 1 (Critique / Attaque active) :</strong><br>
     <code>action=BLOCK_IP action_type=PF_SNORT2C detail=DROP_TRAFFIC</code>.<br>
   - <strong>Priorité 2 (Moyenne / Scan ou violation de politique) :</strong><br>
     <code>action=LOG_ONLY action_type=SURVEILLANCE detail=ALERT_RECORDED</code>.<br>
   - <strong>Priorité 3 (Faible / Info réseau) :</strong><br>
     <code>action=IGNORE action_type=PASS detail=NO_ACTION</code>.<br><br>
Pour chaque alerte, afficher :<br>
<code>IPS_REPORT sid={sid} priority={priority} src={src_ip} action={action} type={action_type} detail={detail}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : lire la liste blanche et réagir aux alertes Snort/Suricata
`,
    hints: [
      'Gérer un set pour la WHITELIST.',
      'Vérifier d\'abord si src_ip est whitelistée avant d\'évaluer la priorité.'
    ],
    examples: [
      {
        stdin: 'WHITELIST ips=192.168.1.1,192.168.1.254\nSNORT_ALERT sid=2001001 priority=1 src_ip=203.0.113.88 dst_ip=192.168.1.50 msg=ET_EXPLOIT_Buffer_Overflow\nSNORT_ALERT sid=2002002 priority=1 src_ip=192.168.1.1 dst_ip=192.168.1.50 msg=ET_DNS_High_Volume\nSNORT_ALERT sid=2003003 priority=2 src_ip=198.51.100.12 dst_ip=192.168.1.50 msg=ET_SCAN_Nmap_SYN\nSNORT_ALERT sid=2004004 priority=3 src_ip=198.51.100.15 dst_ip=192.168.1.50 msg=ET_INFO_ICMP_Ping',
        expected: 'IPS_REPORT sid=2001001 priority=1 src=203.0.113.88 action=BLOCK_IP type=PF_SNORT2C detail=DROP_TRAFFIC\nIPS_REPORT sid=2002002 priority=1 src=192.168.1.1 action=WHITELIST_PASS type=BYPASS detail=PROTECTED_HOST\nIPS_REPORT sid=2003003 priority=2 src=198.51.100.12 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED\nIPS_REPORT sid=2004004 priority=3 src=198.51.100.15 action=IGNORE type=PASS detail=NO_ACTION',
        note: 'L\'attaque critique externe est bloquée dans snort2c ; le routeur interne whitelisté est préservé.'
      }
    ],
    tests: [
      {
        label: 'Alerte critique bloquée sans whitelist déclarée',
        stdin: 'WHITELIST ips=NONE\nSNORT_ALERT sid=2100001 priority=1 src_ip=45.33.32.156 dst_ip=10.0.0.1 msg=MALWARE_CnC_Beacon',
        expected: 'IPS_REPORT sid=2100001 priority=1 src=45.33.32.156 action=BLOCK_IP type=PF_SNORT2C detail=DROP_TRAFFIC'
      },
      {
        label: 'Scans répétés de priorité 2 avec journalisation seule',
        stdin: 'WHITELIST ips=NONE\nSNORT_ALERT sid=2200001 priority=2 src_ip=185.220.101.5 dst_ip=10.0.0.2 msg=SCAN_PORT_80\nSNORT_ALERT sid=2200002 priority=2 src_ip=185.220.101.5 dst_ip=10.0.0.2 msg=SCAN_PORT_443',
        expected: 'IPS_REPORT sid=2200001 priority=2 src=185.220.101.5 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED\nIPS_REPORT sid=2200002 priority=2 src=185.220.101.5 action=LOG_ONLY type=SURVEILLANCE detail=ALERT_RECORDED'
      },
      {
        label: 'Hôte autorisé en liste blanche déclenchant priorité 2',
        stdin: 'WHITELIST ips=10.0.0.254\nSNORT_ALERT sid=2300001 priority=2 src_ip=10.0.0.254 dst_ip=10.0.0.10 msg=POLICY_INTERNAL_SCAN',
        expected: 'IPS_REPORT sid=2300001 priority=2 src=10.0.0.254 action=WHITELIST_PASS type=BYPASS detail=PROTECTED_HOST'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

whitelist = set()

for ligne in lignes:
    if ligne.startswith("WHITELIST "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("ips="):
                raw = p.split("=", 1)[1]
                if raw != "NONE":
                    whitelist = {x.strip() for x in raw.split(",") if x.strip()}

    elif ligne.startswith("SNORT_ALERT "):
        parts = ligne.split()
        sid = None
        priority = None
        src_ip = None
        for p in parts[1:]:
            if p.startswith("sid="):
                sid = int(p.split("=", 1)[1])
            elif p.startswith("priority="):
                priority = int(p.split("=", 1)[1])
            elif p.startswith("src_ip="):
                src_ip = p.split("=", 1)[1]

        if src_ip in whitelist:
            action = "WHITELIST_PASS"
            action_type = "BYPASS"
            detail = "PROTECTED_HOST"
        elif priority == 1:
            action = "BLOCK_IP"
            action_type = "PF_SNORT2C"
            detail = "DROP_TRAFFIC"
        elif priority == 2:
            action = "LOG_ONLY"
            action_type = "SURVEILLANCE"
            detail = "ALERT_RECORDED"
        else:
            action = "IGNORE"
            action_type = "PASS"
            detail = "NO_ACTION"

        print(f"IPS_REPORT sid={sid} priority={priority} src={src_ip} action={action} type={action_type} detail={detail}")
`
  },
  {
    id: 'pf3-c6-e3',
    chapter: 6,
    title: 'Auditeur de synchronisation d\'états pfsync et dérive de configuration XMLRPC',
    level: 'n3',
    language: 'python',
    goal: 'Contrôler la cohérence de la table d\'états pfsync et détecter la dérive de configuration XMLRPC entre nœuds HA.',
    brief: `<p>Dans une architecture de haute disponibilité pfSense (HA), deux mécanismes garantissent la continuité de service sans coupure :<br>
- <strong>pfsync :</strong> réplique les sessions réseau de la table d'états du pare-feu primaire vers le secondaire.<br>
- <strong>XMLRPC Sync :</strong> synchronise les sections de configuration (<code>config.xml</code>) du primaire vers le secondaire.<br><br>
Le script lit sur l'entrée standard :<br>
- Les états enregistrés sur le nœud primaire :<br>
  <code>STATE_PRI id=&lt;nom&gt; proto=&lt;tcp|udp&gt; endpoints=&lt;src_dst&gt; state=&lt;ESTABLISHED|SYN_SENT|FIN_WAIT&gt;</code><br>
- Les états enregistrés sur le nœud secondaire :<br>
  <code>STATE_SEC id=&lt;nom&gt; proto=&lt;tcp|udp&gt; endpoints=&lt;src_dst&gt; state=&lt;ESTABLISHED|SYN_SENT|FIN_WAIT&gt;</code><br>
- Les condensats de hachage des sections de configuration :<br>
  <code>CONFIG_SECTION name=&lt;nom&gt; pri_hash=&lt;str&gt; sec_hash=&lt;str&gt;</code><br><br>
Règles d'audit :<br>
1. <strong>Synchronisation pfsync (pour chaque état présent sur le primaire) :</strong><br>
   - Si l'ID d'état est absent du secondaire :<br>
     <code>status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE</code><br>
   - Si l'ID est présent mais avec un <code>state</code> différent :<br>
     <code>status=OUT_OF_SYNC issue=STATE_MISMATCH action=UPDATE_STATE</code><br>
   - Si l'ID et l'état sont identiques :<br>
     <code>status=SYNC_OK issue=NONE action=NONE</code><br>
   Afficher les états du primaire triés par <code>id</code> :<br>
   <code>PFSYNC_AUDIT id={id} status={status} issue={issue} action={action}</code><br><br>
2. <strong>Synchronisation XMLRPC (pour chaque section de configuration) :</strong><br>
   - Si <code>pri_hash == sec_hash</code> :<br>
     <code>status=IN_SYNC action=NONE</code><br>
   - Si <code>pri_hash != sec_hash</code> :<br>
     <code>status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC</code><br>
   Afficher les sections triées par <code>name</code> :<br>
   <code>XMLRPC_AUDIT section={name} status={status} action={action}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : comparer les états pfsync et les hashes XMLRPC
`,
    hints: [
      'Comparer les clés du primaire avec celles du secondaire.',
      'Trier les sorties pfsync par id, et XMLRPC par name.'
    ],
    examples: [
      {
        stdin: 'STATE_PRI id=S1 proto=tcp endpoints=10.0.0.5:443->1.1.1.1:443 state=ESTABLISHED\nSTATE_PRI id=S2 proto=tcp endpoints=10.0.0.6:80->2.2.2.2:80 state=ESTABLISHED\nSTATE_PRI id=S3 proto=tcp endpoints=10.0.0.7:22->3.3.3.3:22 state=FIN_WAIT\nSTATE_SEC id=S1 proto=tcp endpoints=10.0.0.5:443->1.1.1.1:443 state=ESTABLISHED\nSTATE_SEC id=S3 proto=tcp endpoints=10.0.0.7:22->3.3.3.3:22 state=ESTABLISHED\nCONFIG_SECTION name=filter pri_hash=a1b2 sec_hash=a1b2\nCONFIG_SECTION name=nat pri_hash=c3d4 sec_hash=e5f6',
        expected: 'PFSYNC_AUDIT id=S1 status=SYNC_OK issue=NONE action=NONE\nPFSYNC_AUDIT id=S2 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE\nPFSYNC_AUDIT id=S3 status=OUT_OF_SYNC issue=STATE_MISMATCH action=UPDATE_STATE\nXMLRPC_AUDIT section=filter status=IN_SYNC action=NONE\nXMLRPC_AUDIT section=nat status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC',
        note: 'S1 est synchronisé ; S2 est manquant sur le secours ; S3 a un état désynchronisé (FIN_WAIT vs ESTABLISHED) ; la section nat présente une dérive de configuration.'
      }
    ],
    tests: [
      {
        label: 'Cluster parfaitement synchronisé sans dérive',
        stdin: 'STATE_PRI id=S10 proto=udp endpoints=192.168.1.10:53->8.8.8.8:53 state=ESTABLISHED\nSTATE_SEC id=S10 proto=udp endpoints=192.168.1.10:53->8.8.8.8:53 state=ESTABLISHED\nCONFIG_SECTION name=aliases pri_hash=ff00 sec_hash=ff00',
        expected: 'PFSYNC_AUDIT id=S10 status=SYNC_OK issue=NONE action=NONE\nXMLRPC_AUDIT section=aliases status=IN_SYNC action=NONE'
      },
      {
        label: 'Dérive globale de configuration XMLRPC sur plusieurs sections',
        stdin: 'CONFIG_SECTION name=system pri_hash=1111 sec_hash=2222\nCONFIG_SECTION name=openvpn pri_hash=3333 sec_hash=4444',
        expected: 'XMLRPC_AUDIT section=openvpn status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC\nXMLRPC_AUDIT section=system status=CONFIG_DRIFT action=TRIGGER_XMLRPC_SYNC'
      },
      {
        label: 'États manquants multiples sur le secondaire',
        stdin: 'STATE_PRI id=A1 proto=tcp endpoints=1.1.1.1->2.2.2.2 state=ESTABLISHED\nSTATE_PRI id=A2 proto=tcp endpoints=1.1.1.1->3.3.3.3 state=SYN_SENT',
        expected: 'PFSYNC_AUDIT id=A1 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE\nPFSYNC_AUDIT id=A2 status=OUT_OF_SYNC issue=MISSING_ON_SECONDARY action=RESYNC_STATE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

pri_states = {}
sec_states = {}
configs = {}

for ligne in lignes:
    if ligne.startswith("STATE_PRI "):
        parts = ligne.split()
        sid = None
        state = None
        for p in parts[1:]:
            if p.startswith("id="):
                sid = p.split("=", 1)[1]
            elif p.startswith("state="):
                state = p.split("=", 1)[1]
        pri_states[sid] = state

    elif ligne.startswith("STATE_SEC "):
        parts = ligne.split()
        sid = None
        state = None
        for p in parts[1:]:
            if p.startswith("id="):
                sid = p.split("=", 1)[1]
            elif p.startswith("state="):
                state = p.split("=", 1)[1]
        sec_states[sid] = state

    elif ligne.startswith("CONFIG_SECTION "):
        parts = ligne.split()
        name = None
        pri_h = None
        sec_h = None
        for p in parts[1:]:
            if p.startswith("name="):
                name = p.split("=", 1)[1]
            elif p.startswith("pri_hash="):
                pri_h = p.split("=", 1)[1]
            elif p.startswith("sec_hash="):
                sec_h = p.split("=", 1)[1]
        configs[name] = (pri_h, sec_h)

for sid in sorted(pri_states.keys()):
    p_st = pri_states[sid]
    if sid not in sec_states:
        status = "OUT_OF_SYNC"
        issue = "MISSING_ON_SECONDARY"
        action = "RESYNC_STATE"
    elif sec_states[sid] != p_st:
        status = "OUT_OF_SYNC"
        issue = "STATE_MISMATCH"
        action = "UPDATE_STATE"
    else:
        status = "SYNC_OK"
        issue = "NONE"
        action = "NONE"
    print(f"PFSYNC_AUDIT id={sid} status={status} issue={issue} action={action}")

for name in sorted(configs.keys()):
    pri_h, sec_h = configs[name]
    if pri_h == sec_h:
        status = "IN_SYNC"
        action = "NONE"
    else:
        status = "CONFIG_DRIFT"
        action = "TRIGGER_XMLRPC_SYNC"
    print(f"XMLRPC_AUDIT section={name} status={status} action={action}")
`
  }
];
