/**
 * Exercices Chapitre 4 — pfSense & Routage B3.
 * Segmentation Réseau : VLANs 802.1Q & DMZ Sécurisée.
 */
'use strict';

module.exports = [
  {
    id: 'pf3-c4-e1',
    chapter: 4,
    title: 'Validateur d\'encapsulation 802.1Q et calcul de sous-interfaces VLAN',
    level: 'n1',
    language: 'python',
    goal: 'Valider les trames 802.1Q et les mapper vers la sous-interface pfSense correspondante.',
    brief: `<p>Dans FreeBSD/pfSense, la segmentation par <strong>VLAN 802.1Q</strong> permet de faire transiter plusieurs réseaux logiques isolés sur un même câble physique (Trunk). Chaque sous-interface est identifiée sous la forme <code>parent.tag</code> (ex: <code>em0.10</code>).<br><br>
Le script lit sur l'entrée standard :<br>
- Les déclarations de sous-interfaces :<br>
  <code>VLAN_SUBIF parent=&lt;iface&gt; tag=&lt;int&gt; name=&lt;nom&gt; subnet=&lt;cidr&gt;</code><br>
- Les trames en entrée du pare-feu :<br>
  <code>FRAME id=&lt;nom&gt; ingress_if=&lt;iface&gt; tag=&lt;int|0&gt; payload_bytes=&lt;int&gt;</code><br>
  (une valeur de <code>tag=0</code> désigne une trame non étiquetée / untagged).<br><br>
Règles :<br>
- Si <code>tag == 0</code> : rejetée par défaut sur un port trunk sans VLAN natif autorisé :<br>
  <code>status=DROPPED subif=NONE subnet=NONE</code>.<br>
- Si <code>tag &gt; 0</code> :<br>
  Vérifier si une sous-interface correspond exactement à <code>parent == ingress_if</code> et <code>tag == tag</code> :<br>
  - Si trouvée :<br>
    <code>status=ACCEPTED subif={ingress_if}.{tag} subnet={subnet}</code>.<br>
  - Si non trouvée :<br>
    <code>status=DROPPED subif=UNKNOWN subnet=NONE</code>.<br><br>
Pour chaque trame, afficher :<br>
<code>8021Q_EVAL id={id} tag={tag} status={status} subif={subif} subnet={subnet}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : enregistrer les sous-interfaces et évaluer chaque trame
`,
    hints: [
      'Stocker les VLANs sous une clé composite (parent, tag).',
      'Traiter tag=0 comme non étiqueté (DROPPED).'
    ],
    examples: [
      {
        stdin: 'VLAN_SUBIF parent=em0 tag=10 name=LAN subnet=192.168.10.0/24\nVLAN_SUBIF parent=em0 tag=20 name=DMZ subnet=192.168.20.0/24\nFRAME id=F1 ingress_if=em0 tag=10 payload_bytes=512\nFRAME id=F2 ingress_if=em0 tag=99 payload_bytes=64\nFRAME id=F3 ingress_if=em0 tag=0 payload_bytes=128',
        expected: '8021Q_EVAL id=F1 tag=10 status=ACCEPTED subif=em0.10 subnet=192.168.10.0/24\n8021Q_EVAL id=F2 tag=99 status=DROPPED subif=UNKNOWN subnet=NONE\n8021Q_EVAL id=F3 tag=0 status=DROPPED subif=NONE subnet=NONE',
        note: 'F1 est acceptée sur em0.10, F2 a un tag inconnu, F3 est rejetée car non taguée.'
      }
    ],
    tests: [
      {
        label: 'Sous-interface sur carte réseau igb0',
        stdin: 'VLAN_SUBIF parent=igb0 tag=100 name=MGMT subnet=10.100.0.0/24\nFRAME id=ADMIN_FRAME ingress_if=igb0 tag=100 payload_bytes=1024',
        expected: '8021Q_EVAL id=ADMIN_FRAME tag=100 status=ACCEPTED subif=igb0.100 subnet=10.100.0.0/24'
      },
      {
        label: 'Interface parente différente avec le même tag',
        stdin: 'VLAN_SUBIF parent=em0 tag=30 name=GUEST subnet=172.16.30.0/24\nFRAME id=TEST_WRONG_PARENT ingress_if=em1 tag=30 payload_bytes=256',
        expected: '8021Q_EVAL id=TEST_WRONG_PARENT tag=30 status=DROPPED subif=UNKNOWN subnet=NONE'
      },
      {
        label: 'Trames non taguées répétées',
        stdin: 'VLAN_SUBIF parent=vtnet0 tag=50 name=SERVERS subnet=192.168.50.0/24\nFRAME id=RAW1 ingress_if=vtnet0 tag=0 payload_bytes=64\nFRAME id=RAW2 ingress_if=vtnet0 tag=0 payload_bytes=128',
        expected: '8021Q_EVAL id=RAW1 tag=0 status=DROPPED subif=NONE subnet=NONE\n8021Q_EVAL id=RAW2 tag=0 status=DROPPED subif=NONE subnet=NONE'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

subifs = {}

for ligne in lignes:
    if ligne.startswith("VLAN_SUBIF "):
        parts = ligne.split()
        parent = None
        tag = None
        subnet = None
        for p in parts[1:]:
            if p.startswith("parent="):
                parent = p.split("=", 1)[1]
            elif p.startswith("tag="):
                tag = int(p.split("=", 1)[1])
            elif p.startswith("subnet="):
                subnet = p.split("=", 1)[1]
        if parent and tag is not None:
            subifs[(parent, tag)] = subnet

    elif ligne.startswith("FRAME "):
        parts = ligne.split()
        fid = None
        ingress_if = None
        tag = None
        for p in parts[1:]:
            if p.startswith("id="):
                fid = p.split("=", 1)[1]
            elif p.startswith("ingress_if="):
                ingress_if = p.split("=", 1)[1]
            elif p.startswith("tag="):
                tag = int(p.split("=", 1)[1])

        if tag == 0:
            status = "DROPPED"
            subif = "NONE"
            subnet = "NONE"
        elif (ingress_if, tag) in subifs:
            status = "ACCEPTED"
            subif = f"{ingress_if}.{tag}"
            subnet = subifs[(ingress_if, tag)]
        else:
            status = "DROPPED"
            subif = "UNKNOWN"
            subnet = "NONE"

        print(f"8021Q_EVAL id={fid} tag={tag} status={status} subif={subif} subnet={subnet}")
`
  },
  {
    id: 'pf3-c4-e2',
    chapter: 4,
    title: 'Contrôleur de matrice de flux inter-VLANs et filtrage DMZ',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le pare-feu à état entre zones réseau (LAN, DMZ, WAN) et bloquer l\'initiation illégitime DMZ vers LAN.',
    brief: `<p>Le principe fondamental d'architecture sécurisée d'une <strong>DMZ (Zone Démilitarisée)</strong> stipule qu'un serveur DMZ ne doit <em>jamais pouvoir initier</em> une nouvelle connexion vers le réseau interne sécurisé (LAN). En revanche, le LAN peut initier des flux vers la DMZ, et la DMZ peut répondre (flux établi).<br><br>
Le script lit sur l'entrée standard d'abord les règles de politique de sécurité :<br>
<code>POLICY src=&lt;zone&gt; dst=&lt;zone&gt; port=&lt;int|ANY&gt; action=&lt;PASS|BLOCK&gt;</code><br>
Puis des demandes de flux réseau :<br>
<code>FLOW id=&lt;nom&gt; src=&lt;zone&gt; dst=&lt;zone&gt; port=&lt;int&gt; state=&lt;NEW|ESTABLISHED&gt;</code><br><br>
Règles d'évaluation dans pfSense :<br>
1. Si <code>state == 'ESTABLISHED'</code> :<br>
   Le paquet appartient à une session déjà approuvée dans la table d'états :<br>
   <code>action=PASS reason=STATE_ESTABLISHED</code>.<br>
2. Si <code>state == 'NEW'</code> :<br>
   Parcourir les règles <code>POLICY</code> dans l'ordre de déclaration (First-Match Wins) :<br>
   - La règle correspond si <code>rule.src == flow.src</code> et <code>rule.dst == flow.dst</code> et (<code>rule.port == 'ANY'</code> ou <code>int(rule.port) == flow.port</code>).<br>
   - Si correspondance : <code>action={rule.action} reason=RULE_MATCH</code>.<br>
   - Si aucune règle ne correspond (Default Deny pfSense) :<br>
     <code>action=BLOCK reason=DEFAULT_DENY</code>.<br><br>
Pour chaque flux, afficher :<br>
<code>FLOW_REPORT id={id} src={src} dst={dst} port={port} action={action} reason={reason}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : charger les politiques de zones et évaluer les flux réseau
`,
    hints: [
      'Vérifier d\'abord si state == "ESTABLISHED".',
      'Si NEW, chercher la première règle POLICY correspondante ou appliquer DEFAULT_DENY.'
    ],
    examples: [
      {
        stdin: 'POLICY src=LAN dst=DMZ port=ANY action=PASS\nPOLICY src=DMZ dst=LAN port=ANY action=BLOCK\nPOLICY src=DMZ dst=WAN port=53 action=PASS\nFLOW id=F1 src=LAN dst=DMZ port=80 state=NEW\nFLOW id=F2 src=DMZ dst=LAN port=445 state=NEW\nFLOW id=F3 src=DMZ dst=LAN port=80 state=ESTABLISHED\nFLOW id=F4 src=DMZ dst=WAN port=22 state=NEW',
        expected: 'FLOW_REPORT id=F1 src=LAN dst=DMZ port=80 action=PASS reason=RULE_MATCH\nFLOW_REPORT id=F2 src=DMZ dst=LAN port=445 action=BLOCK reason=RULE_MATCH\nFLOW_REPORT id=F3 src=DMZ dst=LAN port=80 action=PASS reason=STATE_ESTABLISHED\nFLOW_REPORT id=F4 src=DMZ dst=WAN port=22 action=BLOCK reason=DEFAULT_DENY',
        note: 'F1 est autorisée par la règle LAN->DMZ, F2 est bloquée (DMZ->LAN), F3 passe car déjà établie, F4 est rejetée par Default Deny.'
      }
    ],
    tests: [
      {
        label: 'Autorisation DNS explicite depuis la DMZ vers le WAN',
        stdin: 'POLICY src=DMZ dst=WAN port=53 action=PASS\nFLOW id=DNS_QUERY src=DMZ dst=WAN port=53 state=NEW',
        expected: 'FLOW_REPORT id=DNS_QUERY src=DMZ dst=WAN port=53 action=PASS reason=RULE_MATCH'
      },
      {
        label: 'Tentative de rebond SSH depuis la DMZ vers le LAN bloquée',
        stdin: 'POLICY src=DMZ dst=LAN port=ANY action=BLOCK\nFLOW id=SSH_BREACH src=DMZ dst=LAN port=22 state=NEW',
        expected: 'FLOW_REPORT id=SSH_BREACH src=DMZ dst=LAN port=22 action=BLOCK reason=RULE_MATCH'
      },
      {
        label: 'Flux établi passant sans règle explicite',
        stdin: 'FLOW id=TCP_REPLY src=DMZ dst=LAN port=443 state=ESTABLISHED',
        expected: 'FLOW_REPORT id=TCP_REPLY src=DMZ dst=LAN port=443 action=PASS reason=STATE_ESTABLISHED'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

policies = []

for ligne in lignes:
    if ligne.startswith("POLICY "):
        parts = ligne.split()
        src = None
        dst = None
        port = None
        act = None
        for p in parts[1:]:
            if p.startswith("src="):
                src = p.split("=", 1)[1]
            elif p.startswith("dst="):
                dst = p.split("=", 1)[1]
            elif p.startswith("port="):
                port = p.split("=", 1)[1]
            elif p.startswith("action="):
                act = p.split("=", 1)[1]
        policies.append({"src": src, "dst": dst, "port": port, "action": act})

    elif ligne.startswith("FLOW "):
        parts = ligne.split()
        fid = None
        src = None
        dst = None
        port = None
        state = None
        for p in parts[1:]:
            if p.startswith("id="):
                fid = p.split("=", 1)[1]
            elif p.startswith("src="):
                src = p.split("=", 1)[1]
            elif p.startswith("dst="):
                dst = p.split("=", 1)[1]
            elif p.startswith("port="):
                port = int(p.split("=", 1)[1])
            elif p.startswith("state="):
                state = p.split("=", 1)[1]

        if state == "ESTABLISHED":
            action = "PASS"
            reason = "STATE_ESTABLISHED"
        else:
            action = "BLOCK"
            reason = "DEFAULT_DENY"
            for pol in policies:
                if pol["src"] == src and pol["dst"] == dst:
                    if pol["port"] == "ANY" or int(pol["port"]) == port:
                        action = pol["action"]
                        reason = "RULE_MATCH"
                        break

        print(f"FLOW_REPORT id={fid} src={src} dst={dst} port={port} action={action} reason={reason}")
`
  },
  {
    id: 'pf3-c4-e3',
    chapter: 4,
    title: 'Auditeur de fuite d\'isolation réseau (VLAN Hopping & Double Tagging)',
    level: 'n3',
    language: 'python',
    goal: 'Détecter les attaques par double étiquetage 802.1Q (Double Tagging) visant à contourner l\'isolation VLAN.',
    brief: `<p>L'attaque par <strong>Double Tagging (VLAN Hopping)</strong> exploite le comportement des commutateurs qui dépouillent le tag externe du VLAN natif d'un lien Trunk, permettant au tag interne d'atteindre un VLAN cible non autorisé sans traverser le pare-feu.<br><br>
Le script lit sur l'entrée standard d'abord la configuration du lien Trunk :<br>
<code>TRUNK_CONFIG native_vlan=&lt;int&gt; allowed_vlans=&lt;vlan1,vlan2,...&gt;</code><br>
Puis des paquets analysés par la sonde réseau :<br>
<code>PACKET id=&lt;nom&gt; outer_tag=&lt;int|NONE&gt; inner_tag=&lt;int|NONE&gt; dst_ip=&lt;ip&gt;</code><br><br>
Critères de détection et d'audit :<br>
1. <strong>Double marquage (outer_tag != NONE et inner_tag != NONE) :</strong><br>
   - Si <code>outer_tag == native_vlan</code> :<br>
     Attaque confirmée par stripping du tag natif !<br>
     <code>status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan={inner_tag} action=ALERT_DROP</code><br>
   - Sinon (outer_tag != native_vlan mais double tag présent) :<br>
     <code>status=REJECTED type=INVALID_NESTED_TAG target_vlan={inner_tag} action=DROP</code><br>
2. <strong>Simple marquage (outer_tag != NONE et inner_tag == NONE) :</strong><br>
   - Si <code>outer_tag</code> figure dans <code>allowed_vlans</code> :<br>
     <code>status=VALID type=STANDARD_TAGGED target_vlan={outer_tag} action=FORWARD</code><br>
   - Sinon :<br>
     <code>status=BLOCKED type=UNAUTHORIZED_VLAN target_vlan={outer_tag} action=DROP</code><br>
3. <strong>Trame non étiquetée (outer_tag == NONE) :</strong><br>
   <code>status=NATIVE type=UNTAGGED target_vlan={native_vlan} action=FORWARD</code><br><br>
Pour chaque paquet, afficher :<br>
<code>AUDIT_VLAN id={id} status={status} type={type} target_vlan={target_vlan} action={action}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la configuration Trunk et auditer chaque paquet
`,
    hints: [
      'Convertir allowed_vlans en un ensemble d\'entiers.',
      'Comparer outer_tag avec native_vlan lorsque deux tags sont présents.'
    ],
    examples: [
      {
        stdin: 'TRUNK_CONFIG native_vlan=1 allowed_vlans=10,20,30\nPACKET id=PKT1 outer_tag=1 inner_tag=20 dst_ip=192.168.20.10\nPACKET id=PKT2 outer_tag=10 inner_tag=NONE dst_ip=192.168.10.5\nPACKET id=PKT3 outer_tag=99 inner_tag=NONE dst_ip=10.0.0.1\nPACKET id=PKT4 outer_tag=NONE inner_tag=NONE dst_ip=192.168.1.1',
        expected: 'AUDIT_VLAN id=PKT1 status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan=20 action=ALERT_DROP\nAUDIT_VLAN id=PKT2 status=VALID type=STANDARD_TAGGED target_vlan=10 action=FORWARD\nAUDIT_VLAN id=PKT3 status=BLOCKED type=UNAUTHORIZED_VLAN target_vlan=99 action=DROP\nAUDIT_VLAN id=PKT4 status=NATIVE type=UNTAGGED target_vlan=1 action=FORWARD',
        note: 'PKT1 est une attaque par Double Tagging exploitant le VLAN natif 1 ; PKT2 est légitime sur VLAN 10 ; PKT3 est bloqué (VLAN 99 non autorisé).'
      }
    ],
    tests: [
      {
        label: 'Détection d\'attaque sur VLAN natif personnalisé (VLAN 99)',
        stdin: 'TRUNK_CONFIG native_vlan=99 allowed_vlans=10,20\nPACKET id=EXPLOIT outer_tag=99 inner_tag=10 dst_ip=192.168.10.50',
        expected: 'AUDIT_VLAN id=EXPLOIT status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan=10 action=ALERT_DROP'
      },
      {
        label: 'Double tag sans correspondance VLAN natif',
        stdin: 'TRUNK_CONFIG native_vlan=1 allowed_vlans=10,20\nPACKET id=MALFORMED outer_tag=50 inner_tag=20 dst_ip=192.168.20.2',
        expected: 'AUDIT_VLAN id=MALFORMED status=REJECTED type=INVALID_NESTED_TAG target_vlan=20 action=DROP'
      },
      {
        label: 'Trames autorisées sur VLANs distincts',
        stdin: 'TRUNK_CONFIG native_vlan=1 allowed_vlans=100,200\nPACKET id=P1 outer_tag=100 inner_tag=NONE dst_ip=10.100.0.1\nPACKET id=P2 outer_tag=200 inner_tag=NONE dst_ip=10.200.0.1',
        expected: 'AUDIT_VLAN id=P1 status=VALID type=STANDARD_TAGGED target_vlan=100 action=FORWARD\nAUDIT_VLAN id=P2 status=VALID type=STANDARD_TAGGED target_vlan=200 action=FORWARD'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

native_vlan = 1
allowed_vlans = set()

for ligne in lignes:
    if ligne.startswith("TRUNK_CONFIG "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("native_vlan="):
                native_vlan = int(p.split("=", 1)[1])
            elif p.startswith("allowed_vlans="):
                raw = p.split("=", 1)[1]
                allowed_vlans = {int(x.strip()) for x in raw.split(",") if x.strip()}

    elif ligne.startswith("PACKET "):
        parts = ligne.split()
        pid = None
        outer = None
        inner = None
        for p in parts[1:]:
            if p.startswith("id="):
                pid = p.split("=", 1)[1]
            elif p.startswith("outer_tag="):
                val = p.split("=", 1)[1]
                outer = None if val == "NONE" else int(val)
            elif p.startswith("inner_tag="):
                val = p.split("=", 1)[1]
                inner = None if val == "NONE" else int(val)

        if outer is not None and inner is not None:
            if outer == native_vlan:
                status = "ATTACK_DETECTED"
                ptype = "DOUBLE_TAGGING"
                target_vlan = inner
                action = "ALERT_DROP"
            else:
                status = "REJECTED"
                ptype = "INVALID_NESTED_TAG"
                target_vlan = inner
                action = "DROP"
        elif outer is not None and inner is None:
            if outer in allowed_vlans:
                status = "VALID"
                ptype = "STANDARD_TAGGED"
                target_vlan = outer
                action = "FORWARD"
            else:
                status = "BLOCKED"
                ptype = "UNAUTHORIZED_VLAN"
                target_vlan = outer
                action = "DROP"
        else:
            status = "NATIVE"
            ptype = "UNTAGGED"
            target_vlan = native_vlan
            action = "FORWARD"

        print(f"AUDIT_VLAN id={pid} status={status} type={ptype} target_vlan={target_vlan} action={action}")
`
  }
];
