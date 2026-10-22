'use strict';

module.exports = [
  {
    "id": "lan3-c3-e1",
    "chapter": 3,
    "title": "Simulateur d'élection de routeur maître VRRP v2/v3 (RFC 5798)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler l'élection du routeur MASTER dans un groupe de redondance VRRP.",
    "brief": "<p>Le protocole <strong>VRRP (Virtual Router Redundancy Protocol - RFC 5798)</strong> permet à plusieurs routeurs ou commutateurs de niveau 3 de partager une passerelle virtuelle (VIP) pour éliminer le point unique de défaillance (SPOF).<br><br>\nRègles d'élection VRRP par groupe VRID :<br>\n- Si <code>alive == 'NO'</code> : le routeur est hors service &rarr; <code>role=INIT</code>.<br>\n- Parmi les routeurs actifs (<code>alive == 'YES'</code>) :<br>\n  1. Le routeur ayant la plus forte priorité (<code>prio</code>, valeur de 1 à 254) est élu <strong>MASTER</strong>.<br>\n  2. En cas d'égalité sur la priorité, le routeur ayant la plus grande adresse IP physique (comparaison numérique IPv4) devient <strong>MASTER</strong>.<br>\n  3. Tous les autres routeurs actifs prennent le rôle <strong>BACKUP</strong>.<br><br>\nl’étude de cas comporte dans l’énoncé du cas des déclarations de routeurs VRRP :<br>\n<code>VRRP_ROUTER name=&lt;nom&gt; vrid=&lt;int&gt; prio=&lt;int&gt; ip=&lt;ip&gt; alive=&lt;YES|NO&gt;</code><br><br>\nPour chaque routeur (triés par VRID puis par nom alphabétique), afficher :<br>\n<code>VRRP_STATUS vrid={vrid} router={name} role={role} prio={prio} ip={ip}</code><br>\nEt pour chaque groupe VRID, la ligne de synthèse :<br>\n<code>VRRP_MASTER vrid={vrid} router={master_name} ip={master_ip}</code></p>",
    "starter": "# Grille d'analyse (lan3-c3-e1) — Simulateur d'élection de routeur maître VRRP v2/v3 (RFC 5798)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Départage par adresse IP la plus élevée en cas d'égalité de priorité]\n# Données : VRRP_ROUTER name=GW-A vrid=1 prio=100 ip=10.0.0.1 alive=YES\n# Données : VRRP_ROUTER name=GW-B vrid=1 prio=100 ip=10.0.0.2 alive=YES\nA_COMPLETER\n\n[Cas 2 — Plusieurs groupes VRID indépendants]\n# Données : VRRP_ROUTER name=R1_LAN vrid=1 prio=200 ip=192.168.1.1 alive=YES\n# Données : VRRP_ROUTER name=R2_LAN vrid=1 prio=100 ip=192.168.1.2 alive=YES\n# Données : VRRP_ROUTER name=R1_DMZ vrid=2 prio=100 ip=172.16.1.1 alive=YES\n# Données : VRRP_ROUTER name=R2_DMZ vrid=2 prio=250 ip=172.16.1.2 alive=YES\nA_COMPLETER\n\n[Cas 3 — Tous les membres d'un VRID sont hors service]\n# Données : VRRP_ROUTER name=DOWN1 vrid=5 prio=100 ip=1.1.1.1 alive=NO\n# Données : VRRP_ROUTER name=DOWN2 vrid=5 prio=120 ip=1.1.1.2 alive=NO\nA_COMPLETER\n",
    "hints": [
      "Regrouper les routeurs par VRID dans un dictionnaire.",
      "Comparer les routeurs actifs avec la clé : (prio, la notation CIDR du réseau).",
      "Le maximum de cette clé est le MASTER."
    ],
    "examples": [
      {
        "stdin": "VRRP_ROUTER name=R1 vrid=10 prio=150 ip=192.168.10.2 alive=YES\nVRRP_ROUTER name=R2 vrid=10 prio=100 ip=192.168.10.3 alive=YES\nVRRP_ROUTER name=R3 vrid=10 prio=200 ip=192.168.10.4 alive=NO",
        "expected": "VRRP_STATUS vrid=10 router=R1 role=MASTER prio=150 ip=192.168.10.2\nVRRP_STATUS vrid=10 router=R2 role=BACKUP prio=100 ip=192.168.10.3\nVRRP_STATUS vrid=10 router=R3 role=INIT prio=200 ip=192.168.10.4\nVRRP_MASTER vrid=10 router=R1 ip=192.168.10.2",
        "note": "R3 est tombé (alive=NO). R1 a la plus forte priorité parmi les vivants (150 vs 100) et devient MASTER."
      }
    ],
    "tests": [
      {
        "label": "Départage par adresse IP la plus élevée en cas d'égalité de priorité",
        "stdin": "cas:1",
        "expected": "VRRP_STATUS vrid=1 router=GW-A role=BACKUP prio=100 ip=10.0.0.1\nVRRP_STATUS vrid=1 router=GW-B role=MASTER prio=100 ip=10.0.0.2\nVRRP_MASTER vrid=1 router=GW-B ip=10.0.0.2"
      },
      {
        "label": "Plusieurs groupes VRID indépendants",
        "stdin": "cas:2",
        "expected": "VRRP_STATUS vrid=1 router=R1_LAN role=MASTER prio=200 ip=192.168.1.1\nVRRP_STATUS vrid=1 router=R2_LAN role=BACKUP prio=100 ip=192.168.1.2\nVRRP_MASTER vrid=1 router=R1_LAN ip=192.168.1.1\nVRRP_STATUS vrid=2 router=R1_DMZ role=BACKUP prio=100 ip=172.16.1.1\nVRRP_STATUS vrid=2 router=R2_DMZ role=MASTER prio=250 ip=172.16.1.2\nVRRP_MASTER vrid=2 router=R2_DMZ ip=172.16.1.2"
      },
      {
        "label": "Tous les membres d'un VRID sont hors service",
        "stdin": "cas:3",
        "expected": "VRRP_STATUS vrid=5 router=DOWN1 role=INIT prio=100 ip=1.1.1.1\nVRRP_STATUS vrid=5 router=DOWN2 role=INIT prio=120 ip=1.1.1.2\nVRRP_MASTER vrid=5 router=NONE ip=NONE"
      }
    ],
    "solution": "[Exemple]\nVRRP_STATUS vrid=10 router=R1 role=MASTER prio=150 ip=192.168.10.2\nVRRP_STATUS vrid=10 router=R2 role=BACKUP prio=100 ip=192.168.10.3\nVRRP_STATUS vrid=10 router=R3 role=INIT prio=200 ip=192.168.10.4\nVRRP_MASTER vrid=10 router=R1 ip=192.168.10.2\n\n[Cas 1 — Départage par adresse IP la plus élevée en cas d'égalité de priorité]\nVRRP_STATUS vrid=1 router=GW-A role=BACKUP prio=100 ip=10.0.0.1\nVRRP_STATUS vrid=1 router=GW-B role=MASTER prio=100 ip=10.0.0.2\nVRRP_MASTER vrid=1 router=GW-B ip=10.0.0.2\n\n[Cas 2 — Plusieurs groupes VRID indépendants]\nVRRP_STATUS vrid=1 router=R1_LAN role=MASTER prio=200 ip=192.168.1.1\nVRRP_STATUS vrid=1 router=R2_LAN role=BACKUP prio=100 ip=192.168.1.2\nVRRP_MASTER vrid=1 router=R1_LAN ip=192.168.1.1\nVRRP_STATUS vrid=2 router=R1_DMZ role=BACKUP prio=100 ip=172.16.1.1\nVRRP_STATUS vrid=2 router=R2_DMZ role=MASTER prio=250 ip=172.16.1.2\nVRRP_MASTER vrid=2 router=R2_DMZ ip=172.16.1.2\n\n[Cas 3 — Tous les membres d'un VRID sont hors service]\nVRRP_STATUS vrid=5 router=DOWN1 role=INIT prio=100 ip=1.1.1.1\nVRRP_STATUS vrid=5 router=DOWN2 role=INIT prio=120 ip=1.1.1.2\nVRRP_MASTER vrid=5 router=NONE ip=NONE"
  },
  {
    "id": "lan3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de basculement FHRP par suivi d'interface (Object Tracking)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la priorité effective d'un routeur HSRP/VRRP en cas de panne de lien montant et déterminer le basculement.",
    "brief": "<p>Le mécanisme d'<strong>Object Tracking</strong> permet à un routeur FHRP actif de surveiller l'état de son interface WAN vers le FAI. Si cette liaison tombe, sa priorité est décrémentée (<code>effective_prio = base_prio - decrement</code>). Si sa priorité devient inférieure à celle du routeur Standby et que la préemption (preempt) est activée, le Standby prend le relais immédiatement.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Calcul de la priorité effective pour chaque routeur :<br>\n   - Si <code>if_state == 'DOWN'</code> : <code>eff_prio = base_prio - decrement</code>.<br>\n   - Si <code>if_state == 'UP'</code> : <code>eff_prio = base_prio</code>.<br>\n2. Évaluation de la préemption :<br>\n   - Le routeur initialement <code>STANDBY</code> devient <code>ACTIVE</code> (Failover) SI et SEULEMENT SI :<br>\n     <code>standby.eff_prio &gt; active.eff_prio</code> ET <code>standby.preempt == 'YES'</code>.<br>\n   - Dans ce cas, l'ancien actif devient <code>STANDBY</code>.<br>\n   - Sinon, les rôles initiaux sont conservés.<br><br>\nPour chaque routeur (triés par nom alphabétique), afficher :<br>\n<code>TRACK_REPORT router={name} track_if={track_if} if_state={if_state} eff_prio={eff_prio} final_role={final_role} failover={YES|NO}</code></p>",
    "starter": "# Grille d'analyse (lan3-c3-e2) — Détecteur de basculement FHRP par suivi d'interface (Object Tracking)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Préemption désactivée sur le standby empêchant le basculement]\n# Données : TRACKED_ROUTER name=R_ACT init_role=ACTIVE base_prio=120 preempt=YES track_if=WAN1 decrement=50 if_state=DOWN\n# Données : TRACKED_ROUTER name=R_STBY init_role=STANDBY base_prio=100 preempt=NO track_if=WAN2 decrement=10 if_state=UP\nA_COMPLETER\n\n[Cas 2 — Décrément insuffisant pour passer sous le standby]\n# Données : TRACKED_ROUTER name=CORE1 init_role=ACTIVE base_prio=150 preempt=YES track_if=Serial0 decrement=10 if_state=DOWN\n# Données : TRACKED_ROUTER name=CORE2 init_role=STANDBY base_prio=100 preempt=YES track_if=Serial0 decrement=10 if_state=UP\nA_COMPLETER\n\n[Cas 3 — Liaison nominale UP conservant les priorités de base]\n# Données : TRACKED_ROUTER name=R_A init_role=ACTIVE base_prio=110 preempt=YES track_if=Eth1 decrement=30 if_state=UP\n# Données : TRACKED_ROUTER name=R_B init_role=STANDBY base_prio=100 preempt=YES track_if=Eth1 decrement=30 if_state=UP\nA_COMPLETER\n",
    "hints": [
      "Calculer eff_prio pour les deux routeurs.",
      "Vérifier si le Standby surpasse l'Actif et possède preempt == \"YES\"."
    ],
    "examples": [
      {
        "stdin": "TRACKED_ROUTER name=R1 init_role=ACTIVE base_prio=110 preempt=YES track_if=Gi0/0 decrement=20 if_state=DOWN\nTRACKED_ROUTER name=R2 init_role=STANDBY base_prio=100 preempt=YES track_if=Gi0/0 decrement=20 if_state=UP",
        "expected": "TRACK_REPORT router=R1 track_if=Gi0/0 if_state=DOWN eff_prio=90 final_role=STANDBY failover=YES\nTRACK_REPORT router=R2 track_if=Gi0/0 if_state=UP eff_prio=100 final_role=ACTIVE failover=YES",
        "note": "La panne WAN fait chuter la priorité de R1 à 90 (110 - 20). R2 (priorité 100 avec preempt=YES) prend le rôle ACTIVE."
      }
    ],
    "tests": [
      {
        "label": "Préemption désactivée sur le standby empêchant le basculement",
        "stdin": "cas:1",
        "expected": "TRACK_REPORT router=R_ACT track_if=WAN1 if_state=DOWN eff_prio=70 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_STBY track_if=WAN2 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
      },
      {
        "label": "Décrément insuffisant pour passer sous le standby",
        "stdin": "cas:2",
        "expected": "TRACK_REPORT router=CORE1 track_if=Serial0 if_state=DOWN eff_prio=140 final_role=ACTIVE failover=NO\nTRACK_REPORT router=CORE2 track_if=Serial0 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
      },
      {
        "label": "Liaison nominale UP conservant les priorités de base",
        "stdin": "cas:3",
        "expected": "TRACK_REPORT router=R_A track_if=Eth1 if_state=UP eff_prio=110 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_B track_if=Eth1 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
      }
    ],
    "solution": "[Exemple]\nTRACK_REPORT router=R1 track_if=Gi0/0 if_state=DOWN eff_prio=90 final_role=STANDBY failover=YES\nTRACK_REPORT router=R2 track_if=Gi0/0 if_state=UP eff_prio=100 final_role=ACTIVE failover=YES\n\n[Cas 1 — Préemption désactivée sur le standby empêchant le basculement]\nTRACK_REPORT router=R_ACT track_if=WAN1 if_state=DOWN eff_prio=70 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_STBY track_if=WAN2 if_state=UP eff_prio=100 final_role=STANDBY failover=NO\n\n[Cas 2 — Décrément insuffisant pour passer sous le standby]\nTRACK_REPORT router=CORE1 track_if=Serial0 if_state=DOWN eff_prio=140 final_role=ACTIVE failover=NO\nTRACK_REPORT router=CORE2 track_if=Serial0 if_state=UP eff_prio=100 final_role=STANDBY failover=NO\n\n[Cas 3 — Liaison nominale UP conservant les priorités de base]\nTRACK_REPORT router=R_A track_if=Eth1 if_state=UP eff_prio=110 final_role=ACTIVE failover=NO\nTRACK_REPORT router=R_B track_if=Eth1 if_state=UP eff_prio=100 final_role=STANDBY failover=NO"
  },
  {
    "id": "lan3-c3-e3",
    "chapter": 3,
    "title": "Répartiteur de charge GLBP (Gateway Load Balancing Protocol)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler l'assignation dynamique des adresses MAC virtuelles (AVF) par l'AVG selon les algorithmes GLBP.",
    "brief": "<p>Contrairement à HSRP/VRRP où un seul équipement route le trafic pendant que les autres dorment, le protocole <strong>GLBP (Gateway Load Balancing Protocol)</strong> permet à tous les routeurs membres de router le trafic simultanément.<br>\nL'<strong>AVG (Active Virtual Gateway)</strong> répond aux requêtes ARP des clients en distribuant différentes adresses MAC virtuelles associées aux <strong>AVF (Active Virtual Forwarders)</strong>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. <strong>round-robin :</strong> Les AVFs sont assignés cycliquement selon leur <code>id</code> croissant (requête 0 &rarr; 1er AVF, requête 1 &rarr; 2e AVF, etc.).<br>\n2. <strong>host-dependent :</strong> L'AVF est sélectionné selon le hachage de l'adresse MAC du client (dernier octet décimal de client_mac modulo le nombre d'AVFs). Un client reçoit toujours la même MAC.<br>\n3. <strong>weighted :</strong> Chaque AVF est répété proportionnellement à son <code>weight</code> (ex: AVF1 weight=2, AVF2 weight=1 donne la séquence <code>[AVF1, AVF1, AVF2]</code> déroulée cycliquement au fil des requêtes).<br><br>\nPour chaque requête ARP client, afficher :<br>\n<code>GLBP_REPLY client={client_id} assigned_avf={avf_name} vmac={avf_vmac} mode={mode}</code></p>",
    "starter": "# Grille d'analyse (lan3-c3-e3) — Répartiteur de charge GLBP (Gateway Load Balancing Protocol)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode host-dependent liant un client à une même MAC virtuelle]\n# Données : GLBP_CONFIG group=2 mode=host-dependent\n# Données : AVF id=1 name=GW1 vmac=00:07:b4:00:02:01 weight=10\n# Données : AVF id=2 name=GW2 vmac=00:07:b4:00:02:02 weight=10\n# Données : ARP_REQ client_id=HOST_A client_mac=00:00:00:00:00:00\n# Données : ARP_REQ client_id=HOST_B client_mac=00:00:00:00:00:01\n# Données : ARP_REQ client_id=HOST_A client_mac=00:00:00:00:00:00\nA_COMPLETER\n\n[Cas 2 — Mode weighted avec poids inégaux (2 pour 1)]\n# Données : GLBP_CONFIG group=3 mode=weighted\n# Données : AVF id=1 name=CORE_STRONG vmac=00:07:b4:00:03:01 weight=2\n# Données : AVF id=2 name=CORE_WEAK vmac=00:07:b4:00:03:02 weight=1\n# Données : ARP_REQ client_id=C1 client_mac=00:aa:bb:cc:dd:01\n# Données : ARP_REQ client_id=C2 client_mac=00:aa:bb:cc:dd:02\n# Données : ARP_REQ client_id=C3 client_mac=00:aa:bb:cc:dd:03\n# Données : ARP_REQ client_id=C4 client_mac=00:aa:bb:cc:dd:04\nA_COMPLETER\n\n[Cas 3 — Groupe à 3 forwarders en round-robin]\n# Données : GLBP_CONFIG group=4 mode=round-robin\n# Données : AVF id=1 name=F1 vmac=00:07:b4:00:04:01 weight=1\n# Données : AVF id=2 name=F2 vmac=00:07:b4:00:04:02 weight=1\n# Données : AVF id=3 name=F3 vmac=00:07:b4:00:04:03 weight=1\n# Données : ARP_REQ client_id=X client_mac=00:11:22:33:44:55\n# Données : ARP_REQ client_id=Y client_mac=00:11:22:33:44:56\n# Données : ARP_REQ client_id=Z client_mac=00:11:22:33:44:57\nA_COMPLETER\n",
    "hints": [
      "Trier les AVFs par ID croissant.",
      "Pour round-robin : compteur global modulo nombre d'AVFs.",
      "Pour host-dependent : dernier octet de client_mac modulo nombre d'AVFs.",
      "Pour weighted : construire la liste pondérée et la dérouler cycliquement."
    ],
    "examples": [
      {
        "stdin": "GLBP_CONFIG group=1 mode=round-robin\nAVF id=1 name=AVF1 vmac=00:07:b4:00:01:01 weight=100\nAVF id=2 name=AVF2 vmac=00:07:b4:00:01:02 weight=100\nARP_REQ client_id=PC1 client_mac=00:11:22:33:44:01\nARP_REQ client_id=PC2 client_mac=00:11:22:33:44:02\nARP_REQ client_id=PC3 client_mac=00:11:22:33:44:03",
        "expected": "GLBP_REPLY client=PC1 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin\nGLBP_REPLY client=PC2 assigned_avf=AVF2 vmac=00:07:b4:00:01:02 mode=round-robin\nGLBP_REPLY client=PC3 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin",
        "note": "Distribution cyclique en Round-Robin : AVF1, AVF2, puis AVF1."
      }
    ],
    "tests": [
      {
        "label": "Mode host-dependent liant un client à une même MAC virtuelle",
        "stdin": "cas:1",
        "expected": "GLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent\nGLBP_REPLY client=HOST_B assigned_avf=GW2 vmac=00:07:b4:00:02:02 mode=host-dependent\nGLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent"
      },
      {
        "label": "Mode weighted avec poids inégaux (2 pour 1)",
        "stdin": "cas:2",
        "expected": "GLBP_REPLY client=C1 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C2 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C3 assigned_avf=CORE_WEAK vmac=00:07:b4:00:03:02 mode=weighted\nGLBP_REPLY client=C4 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted"
      },
      {
        "label": "Groupe à 3 forwarders en round-robin",
        "stdin": "cas:3",
        "expected": "GLBP_REPLY client=X assigned_avf=F1 vmac=00:07:b4:00:04:01 mode=round-robin\nGLBP_REPLY client=Y assigned_avf=F2 vmac=00:07:b4:00:04:02 mode=round-robin\nGLBP_REPLY client=Z assigned_avf=F3 vmac=00:07:b4:00:04:03 mode=round-robin"
      }
    ],
    "solution": "[Exemple]\nGLBP_REPLY client=PC1 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin\nGLBP_REPLY client=PC2 assigned_avf=AVF2 vmac=00:07:b4:00:01:02 mode=round-robin\nGLBP_REPLY client=PC3 assigned_avf=AVF1 vmac=00:07:b4:00:01:01 mode=round-robin\n\n[Cas 1 — Mode host-dependent liant un client à une même MAC virtuelle]\nGLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent\nGLBP_REPLY client=HOST_B assigned_avf=GW2 vmac=00:07:b4:00:02:02 mode=host-dependent\nGLBP_REPLY client=HOST_A assigned_avf=GW1 vmac=00:07:b4:00:02:01 mode=host-dependent\n\n[Cas 2 — Mode weighted avec poids inégaux (2 pour 1)]\nGLBP_REPLY client=C1 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C2 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\nGLBP_REPLY client=C3 assigned_avf=CORE_WEAK vmac=00:07:b4:00:03:02 mode=weighted\nGLBP_REPLY client=C4 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01 mode=weighted\n\n[Cas 3 — Groupe à 3 forwarders en round-robin]\nGLBP_REPLY client=X assigned_avf=F1 vmac=00:07:b4:00:04:01 mode=round-robin\nGLBP_REPLY client=Y assigned_avf=F2 vmac=00:07:b4:00:04:02 mode=round-robin\nGLBP_REPLY client=Z assigned_avf=F3 vmac=00:07:b4:00:04:03 mode=round-robin"
  }
];
