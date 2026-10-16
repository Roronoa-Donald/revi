'use strict';

module.exports = [
  {
    "id": "pf3-c4-e1",
    "chapter": 4,
    "title": "Validateur d'encapsulation 802.1Q et calcul de sous-interfaces VLAN",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider les trames 802.1Q et les mapper vers la sous-interface pfSense correspondante.",
    "brief": "<p>Dans FreeBSD/pfSense, la segmentation par <strong>VLAN 802.1Q</strong> permet de faire transiter plusieurs réseaux logiques isolés sur un même câble physique (Trunk). Chaque sous-interface est identifiée sous la forme <code>parent.tag</code> (ex: <code>em0.10</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles :<br>\n- Si <code>tag == 0</code> : rejetée par défaut sur un port trunk sans VLAN natif autorisé :<br>\n  <code>status=DROPPED subif=NONE subnet=NONE</code>.<br>\n- Si <code>tag &gt; 0</code> :<br>\n  Vérifier si une sous-interface correspond exactement à <code>parent == ingress_if</code> et <code>tag == tag</code> :<br>\n  - Si trouvée :<br>\n    <code>status=ACCEPTED subif={ingress_if}.{tag} subnet={subnet}</code>.<br>\n  - Si non trouvée :<br>\n    <code>status=DROPPED subif=UNKNOWN subnet=NONE</code>.<br><br>\nPour chaque trame, afficher :<br>\n<code>8021Q_EVAL id={id} tag={tag} status={status} subif={subif} subnet={subnet}</code></p>",
    "starter": "# Grille d'analyse (pf3-c4-e1) — Validateur d'encapsulation 802.1Q et calcul de sous-interfaces VLAN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-interface sur carte réseau igb0]\n# Données : VLAN_SUBIF parent=igb0 tag=100 name=MGMT subnet=10.100.0.0/24\n# Données : FRAME id=ADMIN_FRAME ingress_if=igb0 tag=100 payload_bytes=1024\nA_COMPLETER\n\n[Cas 2 — Interface parente différente avec le même tag]\n# Données : VLAN_SUBIF parent=em0 tag=30 name=GUEST subnet=172.16.30.0/24\n# Données : FRAME id=TEST_WRONG_PARENT ingress_if=em1 tag=30 payload_bytes=256\nA_COMPLETER\n\n[Cas 3 — Trames non taguées répétées]\n# Données : VLAN_SUBIF parent=vtnet0 tag=50 name=SERVERS subnet=192.168.50.0/24\n# Données : FRAME id=RAW1 ingress_if=vtnet0 tag=0 payload_bytes=64\n# Données : FRAME id=RAW2 ingress_if=vtnet0 tag=0 payload_bytes=128\nA_COMPLETER\n",
    "hints": [
      "Stocker les VLANs sous une clé composite (parent, tag).",
      "Traiter tag=0 comme non étiqueté (DROPPED)."
    ],
    "examples": [
      {
        "stdin": "VLAN_SUBIF parent=em0 tag=10 name=LAN subnet=192.168.10.0/24\nVLAN_SUBIF parent=em0 tag=20 name=DMZ subnet=192.168.20.0/24\nFRAME id=F1 ingress_if=em0 tag=10 payload_bytes=512\nFRAME id=F2 ingress_if=em0 tag=99 payload_bytes=64\nFRAME id=F3 ingress_if=em0 tag=0 payload_bytes=128",
        "expected": "8021Q_EVAL id=F1 tag=10 status=ACCEPTED subif=em0.10 subnet=192.168.10.0/24\n8021Q_EVAL id=F2 tag=99 status=DROPPED subif=UNKNOWN subnet=NONE\n8021Q_EVAL id=F3 tag=0 status=DROPPED subif=NONE subnet=NONE",
        "note": "F1 est acceptée sur em0.10, F2 a un tag inconnu, F3 est rejetée car non taguée."
      }
    ],
    "tests": [
      {
        "label": "Sous-interface sur carte réseau igb0",
        "stdin": "cas:1",
        "expected": "8021Q_EVAL id=ADMIN_FRAME tag=100 status=ACCEPTED subif=igb0.100 subnet=10.100.0.0/24"
      },
      {
        "label": "Interface parente différente avec le même tag",
        "stdin": "cas:2",
        "expected": "8021Q_EVAL id=TEST_WRONG_PARENT tag=30 status=DROPPED subif=UNKNOWN subnet=NONE"
      },
      {
        "label": "Trames non taguées répétées",
        "stdin": "cas:3",
        "expected": "8021Q_EVAL id=RAW1 tag=0 status=DROPPED subif=NONE subnet=NONE\n8021Q_EVAL id=RAW2 tag=0 status=DROPPED subif=NONE subnet=NONE"
      }
    ],
    "solution": "[Exemple]\n8021Q_EVAL id=F1 tag=10 status=ACCEPTED subif=em0.10 subnet=192.168.10.0/24\n8021Q_EVAL id=F2 tag=99 status=DROPPED subif=UNKNOWN subnet=NONE\n8021Q_EVAL id=F3 tag=0 status=DROPPED subif=NONE subnet=NONE\n\n[Cas 1 — Sous-interface sur carte réseau igb0]\n8021Q_EVAL id=ADMIN_FRAME tag=100 status=ACCEPTED subif=igb0.100 subnet=10.100.0.0/24\n\n[Cas 2 — Interface parente différente avec le même tag]\n8021Q_EVAL id=TEST_WRONG_PARENT tag=30 status=DROPPED subif=UNKNOWN subnet=NONE\n\n[Cas 3 — Trames non taguées répétées]\n8021Q_EVAL id=RAW1 tag=0 status=DROPPED subif=NONE subnet=NONE\n8021Q_EVAL id=RAW2 tag=0 status=DROPPED subif=NONE subnet=NONE"
  },
  {
    "id": "pf3-c4-e2",
    "chapter": 4,
    "title": "Contrôleur de matrice de flux inter-VLANs et filtrage DMZ",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le pare-feu à état entre zones réseau (LAN, DMZ, WAN) et bloquer l'initiation illégitime DMZ vers LAN.",
    "brief": "<p>Le principe fondamental d'architecture sécurisée d'une <strong>DMZ (Zone Démilitarisée)</strong> stipule qu'un serveur DMZ ne doit <em>jamais pouvoir initier</em> une nouvelle connexion vers le réseau interne sécurisé (LAN). En revanche, le LAN peut initier des flux vers la DMZ, et la DMZ peut répondre (flux établi).<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si <code>state == 'ESTABLISHED'</code> :<br>\n   Le paquet appartient à une session déjà approuvée dans la table d'états :<br>\n   <code>action=PASS reason=STATE_ESTABLISHED</code>.<br>\n2. Si <code>state == 'NEW'</code> :<br>\n   Parcourir les règles <code>POLICY</code> dans l'ordre de déclaration (First-Match Wins) :<br>\n   - La règle correspond si <code>rule.src == flow.src</code> et <code>rule.dst == flow.dst</code> et (<code>rule.port == 'ANY'</code> ou <code>int(rule.port) == flow.port</code>).<br>\n   - Si correspondance : <code>action={rule.action} reason=RULE_MATCH</code>.<br>\n   - Si aucune règle ne correspond (Default Deny pfSense) :<br>\n     <code>action=BLOCK reason=DEFAULT_DENY</code>.<br><br>\nPour chaque flux, afficher :<br>\n<code>FLOW_REPORT id={id} src={src} dst={dst} port={port} action={action} reason={reason}</code></p>",
    "starter": "# Grille d'analyse (pf3-c4-e2) — Contrôleur de matrice de flux inter-VLANs et filtrage DMZ\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Autorisation DNS explicite depuis la DMZ vers le WAN]\n# Données : POLICY src=DMZ dst=WAN port=53 action=PASS\n# Données : FLOW id=DNS_QUERY src=DMZ dst=WAN port=53 state=NEW\nA_COMPLETER\n\n[Cas 2 — Tentative de rebond SSH depuis la DMZ vers le LAN bloquée]\n# Données : POLICY src=DMZ dst=LAN port=ANY action=BLOCK\n# Données : FLOW id=SSH_BREACH src=DMZ dst=LAN port=22 state=NEW\nA_COMPLETER\n\n[Cas 3 — Flux établi passant sans règle explicite]\n# Données : FLOW id=TCP_REPLY src=DMZ dst=LAN port=443 state=ESTABLISHED\nA_COMPLETER\n",
    "hints": [
      "Vérifier d'abord si state == \"ESTABLISHED\".",
      "Si NEW, chercher la première règle POLICY correspondante ou appliquer DEFAULT_DENY."
    ],
    "examples": [
      {
        "stdin": "POLICY src=LAN dst=DMZ port=ANY action=PASS\nPOLICY src=DMZ dst=LAN port=ANY action=BLOCK\nPOLICY src=DMZ dst=WAN port=53 action=PASS\nFLOW id=F1 src=LAN dst=DMZ port=80 state=NEW\nFLOW id=F2 src=DMZ dst=LAN port=445 state=NEW\nFLOW id=F3 src=DMZ dst=LAN port=80 state=ESTABLISHED\nFLOW id=F4 src=DMZ dst=WAN port=22 state=NEW",
        "expected": "FLOW_REPORT id=F1 src=LAN dst=DMZ port=80 action=PASS reason=RULE_MATCH\nFLOW_REPORT id=F2 src=DMZ dst=LAN port=445 action=BLOCK reason=RULE_MATCH\nFLOW_REPORT id=F3 src=DMZ dst=LAN port=80 action=PASS reason=STATE_ESTABLISHED\nFLOW_REPORT id=F4 src=DMZ dst=WAN port=22 action=BLOCK reason=DEFAULT_DENY",
        "note": "F1 est autorisée par la règle LAN->DMZ, F2 est bloquée (DMZ->LAN), F3 passe car déjà établie, F4 est rejetée par Default Deny."
      }
    ],
    "tests": [
      {
        "label": "Autorisation DNS explicite depuis la DMZ vers le WAN",
        "stdin": "cas:1",
        "expected": "FLOW_REPORT id=DNS_QUERY src=DMZ dst=WAN port=53 action=PASS reason=RULE_MATCH"
      },
      {
        "label": "Tentative de rebond SSH depuis la DMZ vers le LAN bloquée",
        "stdin": "cas:2",
        "expected": "FLOW_REPORT id=SSH_BREACH src=DMZ dst=LAN port=22 action=BLOCK reason=RULE_MATCH"
      },
      {
        "label": "Flux établi passant sans règle explicite",
        "stdin": "cas:3",
        "expected": "FLOW_REPORT id=TCP_REPLY src=DMZ dst=LAN port=443 action=PASS reason=STATE_ESTABLISHED"
      }
    ],
    "solution": "[Exemple]\nFLOW_REPORT id=F1 src=LAN dst=DMZ port=80 action=PASS reason=RULE_MATCH\nFLOW_REPORT id=F2 src=DMZ dst=LAN port=445 action=BLOCK reason=RULE_MATCH\nFLOW_REPORT id=F3 src=DMZ dst=LAN port=80 action=PASS reason=STATE_ESTABLISHED\nFLOW_REPORT id=F4 src=DMZ dst=WAN port=22 action=BLOCK reason=DEFAULT_DENY\n\n[Cas 1 — Autorisation DNS explicite depuis la DMZ vers le WAN]\nFLOW_REPORT id=DNS_QUERY src=DMZ dst=WAN port=53 action=PASS reason=RULE_MATCH\n\n[Cas 2 — Tentative de rebond SSH depuis la DMZ vers le LAN bloquée]\nFLOW_REPORT id=SSH_BREACH src=DMZ dst=LAN port=22 action=BLOCK reason=RULE_MATCH\n\n[Cas 3 — Flux établi passant sans règle explicite]\nFLOW_REPORT id=TCP_REPLY src=DMZ dst=LAN port=443 action=PASS reason=STATE_ESTABLISHED"
  },
  {
    "id": "pf3-c4-e3",
    "chapter": 4,
    "title": "Auditeur de fuite d'isolation réseau (VLAN Hopping & Double Tagging)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les attaques par double étiquetage 802.1Q (Double Tagging) visant à contourner l'isolation VLAN.",
    "brief": "<p>L'attaque par <strong>Double Tagging (VLAN Hopping)</strong> exploite le comportement des commutateurs qui dépouillent le tag externe du VLAN natif d'un lien Trunk, permettant au tag interne d'atteindre un VLAN cible non autorisé sans traverser le pare-feu.<br><br>\nAnalysez les paramètres du problème pour chaque cas...&gt;</code><br>\nPuis des paquets analysés par la sonde réseau :<br>\n<code>PACKET id=&lt;nom&gt; outer_tag=&lt;int|NONE&gt; inner_tag=&lt;int|NONE&gt; dst_ip=&lt;ip&gt;</code><br><br>\nCritères de détection et d'audit :<br>\n1. <strong>Double marquage (outer_tag != NONE et inner_tag != NONE) :</strong><br>\n   - Si <code>outer_tag == native_vlan</code> :<br>\n     Attaque confirmée par stripping du tag natif !<br>\n     <code>status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan={inner_tag} action=ALERT_DROP</code><br>\n   - Sinon (outer_tag != native_vlan mais double tag présent) :<br>\n     <code>status=REJECTED type=INVALID_NESTED_TAG target_vlan={inner_tag} action=DROP</code><br>\n2. <strong>Simple marquage (outer_tag != NONE et inner_tag == NONE) :</strong><br>\n   - Si <code>outer_tag</code> figure dans <code>allowed_vlans</code> :<br>\n     <code>status=VALID type=STANDARD_TAGGED target_vlan={outer_tag} action=FORWARD</code><br>\n   - Sinon :<br>\n     <code>status=BLOCKED type=UNAUTHORIZED_VLAN target_vlan={outer_tag} action=DROP</code><br>\n3. <strong>Trame non étiquetée (outer_tag == NONE) :</strong><br>\n   <code>status=NATIVE type=UNTAGGED target_vlan={native_vlan} action=FORWARD</code><br><br>\nPour chaque paquet, afficher :<br>\n<code>AUDIT_VLAN id={id} status={status} type={type} target_vlan={target_vlan} action={action}</code></p>",
    "starter": "# Grille d'analyse (pf3-c4-e3) — Auditeur de fuite d'isolation réseau (VLAN Hopping & Double Tagging)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection d'attaque sur VLAN natif personnalisé (VLAN 99)]\n# Données : TRUNK_CONFIG native_vlan=99 allowed_vlans=10,20\n# Données : PACKET id=EXPLOIT outer_tag=99 inner_tag=10 dst_ip=192.168.10.50\nA_COMPLETER\n\n[Cas 2 — Double tag sans correspondance VLAN natif]\n# Données : TRUNK_CONFIG native_vlan=1 allowed_vlans=10,20\n# Données : PACKET id=MALFORMED outer_tag=50 inner_tag=20 dst_ip=192.168.20.2\nA_COMPLETER\n\n[Cas 3 — Trames autorisées sur VLANs distincts]\n# Données : TRUNK_CONFIG native_vlan=1 allowed_vlans=100,200\n# Données : PACKET id=P1 outer_tag=100 inner_tag=NONE dst_ip=10.100.0.1\n# Données : PACKET id=P2 outer_tag=200 inner_tag=NONE dst_ip=10.200.0.1\nA_COMPLETER\n",
    "hints": [
      "Convertir allowed_vlans en un ensemble d'entiers.",
      "Comparer outer_tag avec native_vlan lorsque deux tags sont présents."
    ],
    "examples": [
      {
        "stdin": "TRUNK_CONFIG native_vlan=1 allowed_vlans=10,20,30\nPACKET id=PKT1 outer_tag=1 inner_tag=20 dst_ip=192.168.20.10\nPACKET id=PKT2 outer_tag=10 inner_tag=NONE dst_ip=192.168.10.5\nPACKET id=PKT3 outer_tag=99 inner_tag=NONE dst_ip=10.0.0.1\nPACKET id=PKT4 outer_tag=NONE inner_tag=NONE dst_ip=192.168.1.1",
        "expected": "AUDIT_VLAN id=PKT1 status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan=20 action=ALERT_DROP\nAUDIT_VLAN id=PKT2 status=VALID type=STANDARD_TAGGED target_vlan=10 action=FORWARD\nAUDIT_VLAN id=PKT3 status=BLOCKED type=UNAUTHORIZED_VLAN target_vlan=99 action=DROP\nAUDIT_VLAN id=PKT4 status=NATIVE type=UNTAGGED target_vlan=1 action=FORWARD",
        "note": "PKT1 est une attaque par Double Tagging exploitant le VLAN natif 1 ; PKT2 est légitime sur VLAN 10 ; PKT3 est bloqué (VLAN 99 non autorisé)."
      }
    ],
    "tests": [
      {
        "label": "Détection d'attaque sur VLAN natif personnalisé (VLAN 99)",
        "stdin": "cas:1",
        "expected": "AUDIT_VLAN id=EXPLOIT status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan=10 action=ALERT_DROP"
      },
      {
        "label": "Double tag sans correspondance VLAN natif",
        "stdin": "cas:2",
        "expected": "AUDIT_VLAN id=MALFORMED status=REJECTED type=INVALID_NESTED_TAG target_vlan=20 action=DROP"
      },
      {
        "label": "Trames autorisées sur VLANs distincts",
        "stdin": "cas:3",
        "expected": "AUDIT_VLAN id=P1 status=VALID type=STANDARD_TAGGED target_vlan=100 action=FORWARD\nAUDIT_VLAN id=P2 status=VALID type=STANDARD_TAGGED target_vlan=200 action=FORWARD"
      }
    ],
    "solution": "[Exemple]\nAUDIT_VLAN id=PKT1 status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan=20 action=ALERT_DROP\nAUDIT_VLAN id=PKT2 status=VALID type=STANDARD_TAGGED target_vlan=10 action=FORWARD\nAUDIT_VLAN id=PKT3 status=BLOCKED type=UNAUTHORIZED_VLAN target_vlan=99 action=DROP\nAUDIT_VLAN id=PKT4 status=NATIVE type=UNTAGGED target_vlan=1 action=FORWARD\n\n[Cas 1 — Détection d'attaque sur VLAN natif personnalisé (VLAN 99)]\nAUDIT_VLAN id=EXPLOIT status=ATTACK_DETECTED type=DOUBLE_TAGGING target_vlan=10 action=ALERT_DROP\n\n[Cas 2 — Double tag sans correspondance VLAN natif]\nAUDIT_VLAN id=MALFORMED status=REJECTED type=INVALID_NESTED_TAG target_vlan=20 action=DROP\n\n[Cas 3 — Trames autorisées sur VLANs distincts]\nAUDIT_VLAN id=P1 status=VALID type=STANDARD_TAGGED target_vlan=100 action=FORWARD\nAUDIT_VLAN id=P2 status=VALID type=STANDARD_TAGGED target_vlan=200 action=FORWARD"
  }
];
