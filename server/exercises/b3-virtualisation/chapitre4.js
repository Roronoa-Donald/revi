'use strict';

module.exports = [
  {
    "id": "vrt3-c4-e1",
    "chapter": 4,
    "title": "Validateur de Configuration vSwitch & Modes de Balisage VLAN (VST, EST, VGT)",
    "level": "n1",
    "language": "analyse",
    "goal": "Qualifier le mode de balisage VLAN (VST, EST, VGT) et valider la redondance des uplinks sur un Port Group vSwitch.",
    "brief": "<p>Sur un commutateur virtuel VMware vSwitch (Standard ou Distribué), le routage des trames 802.1Q dépend de l'identifiant VLAN configuré :<br><br>\n1. <strong>Modes de balisage VLAN</strong> :<br>\n- <code>VLAN_ID == 0</code> : Mode <code>EST</code> (<em>External Switch Tagging</em>, le commutateur physique externe gère le VLAN).<br>\n- <code>1 &le; VLAN_ID &le; 4094</code> : Mode <code>VST</code> (<em>Virtual Switch Tagging</em>, le vSwitch insère et retire le tag 802.1Q).<br>\n- <code>VLAN_ID == 4095</code> : Mode <code>VGT</code> (<em>Virtual Guest Tagging</em>, trunking direct jusqu'à l'OS de la machine virtuelle).<br>\n- Autre valeur : <code>INVALID_VLAN</code>.<br><br>\n2. <strong>Support des trames Jumbo</strong> :<br>\n- Si <code>MTU &ge; 9000</code> : <code>JUMBO_ENABLED</code>.<br>\n- Sinon : <code>STANDARD_MTU</code>.<br><br>\n3. <strong>Redondance des adaptateurs physiques (Uplinks)</strong> :<br>\n- Si la liste <code>UPLINKS</code> contient 2 cartes ou plus : <code>REDUNDANT</code>.<br>\n- Sinon : <code>SINGLE_UPLINK_WARNING</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>PG=&lt;nom&gt; VLAN=&lt;id&gt; UPLINKS=&lt;vmnic0,vmnic1,...&gt; MTU=&lt;1500|9000&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>PG:&lt;nom&gt; | VLAN:&lt;id&gt; | MODE:&lt;mode&gt; | FRAMES:&lt;frames&gt; | REDUNDANCY:&lt;red&gt;</code></p>",
    "starter": "# Grille d'analyse (vrt3-c4-e1) — Validateur de Configuration vSwitch & Modes de Balisage VLAN (VST, EST, VGT)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VLAN ID invalide et MTU supérieure à 9000]\n# Données : PG=Storage-iSCSI VLAN=50 UPLINKS=vmnic1,vmnic2 MTU=9000\n# Données : PG=Bad-VLAN VLAN=5000 UPLINKS=vmnic0 MTU=1500\nA_COMPLETER\n\n[Cas 2 — VLAN limite 4094 en mode VST]\n# Données : PG=Guest-Trunk VLAN=4094 UPLINKS=vmnic0,vmnic1,vmnic2 MTU=1500\nA_COMPLETER\n",
    "hints": [
      "Vérifiez les valeurs réservées 0 (EST) et 4095 (VGT).",
      "Comptez le nombre de cartes dans la chaîne séparée par des virgules pour évaluer la redondance."
    ],
    "examples": [
      {
        "stdin": "PG=VM-Network VLAN=10 UPLINKS=vmnic0,vmnic1 MTU=1500\nPG=Management VLAN=0 UPLINKS=vmnic0 MTU=1500\nPG=vMotion-IP VLAN=4095 UPLINKS=vmnic2,vmnic3 MTU=9000",
        "expected": "PG:VM-Network | VLAN:10 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT\nPG:Management | VLAN:0 | MODE:EST | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\nPG:vMotion-IP | VLAN:4095 | MODE:VGT | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\n",
        "note": "Validation des 3 modes VLAN canoniques VST, EST et VGT avec Jumbo Frames."
      }
    ],
    "tests": [
      {
        "label": "VLAN ID invalide et MTU supérieure à 9000",
        "stdin": "cas:1",
        "expected": "PG:Storage-iSCSI | VLAN:50 | MODE:VST | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\nPG:Bad-VLAN | VLAN:5000 | MODE:INVALID_VLAN | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\n"
      },
      {
        "label": "VLAN limite 4094 en mode VST",
        "stdin": "cas:2",
        "expected": "PG:Guest-Trunk | VLAN:4094 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT\n"
      }
    ],
    "solution": "[Exemple]\nPG:VM-Network | VLAN:10 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT\nPG:Management | VLAN:0 | MODE:EST | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\nPG:vMotion-IP | VLAN:4095 | MODE:VGT | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\n\n\n[Cas 1 — VLAN ID invalide et MTU supérieure à 9000]\nPG:Storage-iSCSI | VLAN:50 | MODE:VST | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT\nPG:Bad-VLAN | VLAN:5000 | MODE:INVALID_VLAN | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING\n\n\n[Cas 2 — VLAN limite 4094 en mode VST]\nPG:Guest-Trunk | VLAN:4094 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT"
  },
  {
    "id": "vrt3-c4-e2",
    "chapter": 4,
    "title": "Simulateur de Politiques de Sécurité vSwitch (Promiscuous, MAC Changes, Forged Transmits)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le score de durcissement sécuritaire d'un vSwitch et filtrer les actions réseau non autorisées.",
    "brief": "<p>Les politiques de sécurité de niveau 2 sur un commutateur virtuel régulent les comportements des cartes vNIC :<br><br>\n1. <strong>Paramètres de sécurité (REJECT par défaut)</strong> :<br>\n- <code>PROMISC</code> (Mode promiscuous) : autorise ou refuse l'écoute de tout le trafic du vSwitch.<br>\n- <code>MAC_CHANGE</code> : autorise ou refuse la modification de l'adresse MAC par l'OS invité.<br>\n- <code>FORGED_TX</code> : autorise ou refuse l'émission de trames dont la MAC source est falsifiée.<br><br>\n2. <strong>Score de durcissement (Hardening Score sur 100%)</strong> :<br>\nChaque paramètre configuré à <code>REJECT</code> rapporte 33.33 points (soit 100% si tous à REJECT, 66.7% si deux, 33.3% si un, 0.0% si aucun).<br>\nStatut :<br>\n- <code>HARDENED</code> si score &ge; 99.0%<br>\n- <code>PERMISSIVE</code> si 50.0% &le; score &lt; 99.0%<br>\n- <code>VULNERABLE</code> si score &lt; 50.0%<br><br>\n3. <strong>Filtrage des actions</strong> :<br>\nPour une action donnée :<br>\n- <code>SNIFF</code> : <code>PERMITTED</code> si PROMISC=ACCEPT sinon <code>BLOCKED</code>.<br>\n- <code>RECV_NEW_MAC</code> : <code>PERMITTED</code> si MAC_CHANGE=ACCEPT sinon <code>BLOCKED</code>.<br>\n- <code>SEND_SPOOFED_MAC</code> : <code>PERMITTED</code> si FORGED_TX=ACCEPT sinon <code>BLOCKED</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>PG=&lt;nom&gt; PROMISC=&lt;ACCEPT|REJECT&gt; MAC_CHANGE=&lt;ACCEPT|REJECT&gt; FORGED_TX=&lt;ACCEPT|REJECT&gt; ACTIONS=&lt;a1,a2,...&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>PG:&lt;nom&gt; | HARDENING:&lt;score:.1f&gt;% (&lt;statut&gt;) | RESULTS:&lt;action1&gt;=&lt;PERMITTED|BLOCKED&gt;,&lt;action2&gt;=...</code></p>",
    "starter": "# Grille d'analyse (vrt3-c4-e2) — Simulateur de Politiques de Sécurité vSwitch (Promiscuous, MAC Changes, Forged Transmits)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Configuration intermédiaire permise]\n# Données : PG=Proxy-Net PROMISC=REJECT MAC_CHANGE=ACCEPT FORGED_TX=REJECT ACTIONS=SNIFF,RECV_NEW_MAC\nA_COMPLETER\n\n[Cas 2 — Toutes les options permissives à 0% de durcissement]\n# Données : PG=Zero-Sec PROMISC=ACCEPT MAC_CHANGE=ACCEPT FORGED_TX=ACCEPT ACTIONS=SEND_SPOOFED_MAC\nA_COMPLETER\n",
    "hints": [
      "Calculez le score en accordant (100.0 / 3.0) pour chaque règle configurée à REJECT.",
      "Vérifiez pour chaque action si la règle correspondante est à ACCEPT (PERMITTED) ou REJECT (BLOCKED)."
    ],
    "examples": [
      {
        "stdin": "PG=Secured-LAN PROMISC=REJECT MAC_CHANGE=REJECT FORGED_TX=REJECT ACTIONS=SNIFF,SEND_SPOOFED_MAC\nPG=Lab-Monitor PROMISC=ACCEPT MAC_CHANGE=ACCEPT FORGED_TX=REJECT ACTIONS=SNIFF,RECV_NEW_MAC,SEND_SPOOFED_MAC",
        "expected": "PG:Secured-LAN | HARDENING:100.0% (HARDENED) | RESULTS:SNIFF=BLOCKED,SEND_SPOOFED_MAC=BLOCKED\nPG:Lab-Monitor | HARDENING:33.3% (VULNERABLE) | RESULTS:SNIFF=PERMITTED,RECV_NEW_MAC=PERMITTED,SEND_SPOOFED_MAC=BLOCKED\n",
        "note": "Port Group entièrement durci vs Port Group permissif pour sonde d'écoute."
      }
    ],
    "tests": [
      {
        "label": "Configuration intermédiaire permise",
        "stdin": "cas:1",
        "expected": "PG:Proxy-Net | HARDENING:66.7% (PERMISSIVE) | RESULTS:SNIFF=BLOCKED,RECV_NEW_MAC=PERMITTED\n"
      },
      {
        "label": "Toutes les options permissives à 0% de durcissement",
        "stdin": "cas:2",
        "expected": "PG:Zero-Sec | HARDENING:0.0% (VULNERABLE) | RESULTS:SEND_SPOOFED_MAC=PERMITTED\n"
      }
    ],
    "solution": "[Exemple]\nPG:Secured-LAN | HARDENING:100.0% (HARDENED) | RESULTS:SNIFF=BLOCKED,SEND_SPOOFED_MAC=BLOCKED\nPG:Lab-Monitor | HARDENING:33.3% (VULNERABLE) | RESULTS:SNIFF=PERMITTED,RECV_NEW_MAC=PERMITTED,SEND_SPOOFED_MAC=BLOCKED\n\n\n[Cas 1 — Configuration intermédiaire permise]\nPG:Proxy-Net | HARDENING:66.7% (PERMISSIVE) | RESULTS:SNIFF=BLOCKED,RECV_NEW_MAC=PERMITTED\n\n\n[Cas 2 — Toutes les options permissives à 0% de durcissement]\nPG:Zero-Sec | HARDENING:0.0% (VULNERABLE) | RESULTS:SEND_SPOOFED_MAC=PERMITTED"
  },
  {
    "id": "vrt3-c4-e3",
    "chapter": 4,
    "title": "Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)",
    "level": "n3",
    "language": "analyse",
    "goal": "Modéliser l'algorithme de lissage de trafic réseau (Token Bucket) et calculer la durée de transfert et le débit effectif.",
    "brief": "<p>Le Traffic Shaping sur un vSwitch régule la bande passante selon un algorithme de seau à jetons (Token Bucket) :<br><br>\n1. <strong>Paramètres du profil de régulation</strong> :<br>\n- <code>AVG_KBPS</code> : Débit moyen permanent alloué (en kbps).<br>\n- <code>PEAK_KBPS</code> : Débit maximal autorisé en période de pic (en kbps).<br>\n- <code>BURST_KB</code> : Capacité maximale du tampon de rafale (en Ko).<br><br>\n2. <strong>Calculs pour un transfert de <code>TRANSFER_MB</code> Mo</strong> :<br>\n- Volume total en kilobits : <code>total_kbits = TRANSFER_MB * 8000.0</code> (unité réseau : 1 Mo = 1 000 Ko = 8 000 kb).<br>\n- Capacité de rafale en kilobits : <code>burst_kbits = min(total_kbits, BURST_KB * 8.0)</code>.<br>\n- Durée de la phase de rafale : <code>burst_time_s = burst_kbits / PEAK_KBPS</code>.<br>\n- Volume restant à écouler au débit moyen : <code>remaining_kbits = total_kbits - burst_kbits</code>.<br>\n- Durée de la phase moyenne : <code>avg_time_s = remaining_kbits / AVG_KBPS</code>.<br>\n- Durée totale du transfert : <code>total_time_s = burst_time_s + avg_time_s</code>.<br>\n- Débit moyen effectif global : <code>effective_rate_kbps = total_kbits / total_time_s</code>.<br><br>\nFormat d'entrée (les données d’entrée) :<br>\nLignes : <code>PROFILE=&lt;nom&gt; AVG_KBPS=&lt;n&gt; PEAK_KBPS=&lt;n&gt; BURST_KB=&lt;n&gt; TRANSFER_MB=&lt;n&gt;</code>.<br><br>\nFormat de sortie :<br>\n<code>PROFILE:&lt;nom&gt; | BURST_TIME:&lt;burst_time_s:.2f&gt;s | TOTAL_TIME:&lt;total_time_s:.2f&gt;s | EFFECTIVE_RATE:&lt;effective_rate_kbps:.1f&gt;kbps</code></p>",
    "starter": "# Grille d'analyse (vrt3-c4-e3) — Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Transfert très court entièrement contenu dans la rafale]\n# Données : PROFILE=Quick-Burst AVG_KBPS=5000 PEAK_KBPS=20000 BURST_KB=4000 TRANSFER_MB=1\nA_COMPLETER\n\n[Cas 2 — Très gros transfert dominé par le débit moyen]\n# Données : PROFILE=Heavy-Transfer AVG_KBPS=20000 PEAK_KBPS=80000 BURST_KB=10000 TRANSFER_MB=200\nA_COMPLETER\n",
    "hints": [
      "Convertissez les Mo en kilobits réseau : total_kbits = TRANSFER_MB * 8000.0.",
      "La rafale n'absorbe qu'au plus min(total_kbits, BURST_KB * 8.0) avant retour au débit moyen."
    ],
    "examples": [
      {
        "stdin": "PROFILE=Web-Policy AVG_KBPS=10000 PEAK_KBPS=40000 BURST_KB=5000 TRANSFER_MB=10\nPROFILE=DB-Replication AVG_KBPS=50000 PEAK_KBPS=100000 BURST_KB=10000 TRANSFER_MB=50",
        "expected": "PROFILE:Web-Policy | BURST_TIME:1.00s | TOTAL_TIME:5.00s | EFFECTIVE_RATE:16000.0kbps\nPROFILE:DB-Replication | BURST_TIME:0.80s | TOTAL_TIME:7.20s | EFFECTIVE_RATE:55555.6kbps\n",
        "note": "Calcul pour 10 Mo avec rafale 5 Mo vs 50 Mo avec rafale 10 Mo."
      }
    ],
    "tests": [
      {
        "label": "Transfert très court entièrement contenu dans la rafale",
        "stdin": "cas:1",
        "expected": "PROFILE:Quick-Burst | BURST_TIME:0.40s | TOTAL_TIME:0.40s | EFFECTIVE_RATE:20000.0kbps\n"
      },
      {
        "label": "Très gros transfert dominé par le débit moyen",
        "stdin": "cas:2",
        "expected": "PROFILE:Heavy-Transfer | BURST_TIME:1.00s | TOTAL_TIME:77.00s | EFFECTIVE_RATE:20779.2kbps\n"
      }
    ],
    "solution": "[Exemple]\nPROFILE:Web-Policy | BURST_TIME:1.00s | TOTAL_TIME:5.00s | EFFECTIVE_RATE:16000.0kbps\nPROFILE:DB-Replication | BURST_TIME:0.80s | TOTAL_TIME:7.20s | EFFECTIVE_RATE:55555.6kbps\n\n\n[Cas 1 — Transfert très court entièrement contenu dans la rafale]\nPROFILE:Quick-Burst | BURST_TIME:0.40s | TOTAL_TIME:0.40s | EFFECTIVE_RATE:20000.0kbps\n\n\n[Cas 2 — Très gros transfert dominé par le débit moyen]\nPROFILE:Heavy-Transfer | BURST_TIME:1.00s | TOTAL_TIME:77.00s | EFFECTIVE_RATE:20779.2kbps"
  }
];
