/**
 * server/exercises/b3-virtualisation/chapitre4.js — Exercices du Chapitre 4
 * Chapitre 4 : Réseaux Virtuels & Sécurité (vSwitch, VDS & VLANs)
 */
'use strict';

module.exports = [
  {
    id: 'vrt3-c4-e1',
    chapter: 4,
    title: 'Validateur de Configuration vSwitch & Modes de Balisage VLAN (VST, EST, VGT)',
    level: 'n1',
    language: 'python',
    goal: 'Qualifier le mode de balisage VLAN (VST, EST, VGT) et valider la redondance des uplinks sur un Port Group vSwitch.',
    brief: `<p>Sur un commutateur virtuel VMware vSwitch (Standard ou Distribué), le routage des trames 802.1Q dépend de l'identifiant VLAN configuré :<br><br>
1. <strong>Modes de balisage VLAN</strong> :<br>
- <code>VLAN_ID == 0</code> : Mode <code>EST</code> (<em>External Switch Tagging</em>, le commutateur physique externe gère le VLAN).<br>
- <code>1 &le; VLAN_ID &le; 4094</code> : Mode <code>VST</code> (<em>Virtual Switch Tagging</em>, le vSwitch insère et retire le tag 802.1Q).<br>
- <code>VLAN_ID == 4095</code> : Mode <code>VGT</code> (<em>Virtual Guest Tagging</em>, trunking direct jusqu'à l'OS de la machine virtuelle).<br>
- Autre valeur : <code>INVALID_VLAN</code>.<br><br>
2. <strong>Support des trames Jumbo</strong> :<br>
- Si <code>MTU &ge; 9000</code> : <code>JUMBO_ENABLED</code>.<br>
- Sinon : <code>STANDARD_MTU</code>.<br><br>
3. <strong>Redondance des adaptateurs physiques (Uplinks)</strong> :<br>
- Si la liste <code>UPLINKS</code> contient 2 cartes ou plus : <code>REDUNDANT</code>.<br>
- Sinon : <code>SINGLE_UPLINK_WARNING</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>PG=&lt;nom&gt; VLAN=&lt;id&gt; UPLINKS=&lt;vmnic0,vmnic1,...&gt; MTU=&lt;1500|9000&gt;</code>.<br><br>
Format de sortie :<br>
<code>PG:&lt;nom&gt; | VLAN:&lt;id&gt; | MODE:&lt;mode&gt; | FRAMES:&lt;frames&gt; | REDUNDANCY:&lt;red&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la configuration du Port Group, identifier le mode VLAN et vérifier la redondance
`,
    hints: [
      "Vérifiez les valeurs réservées 0 (EST) et 4095 (VGT).",
      "Comptez le nombre de cartes dans la chaîne séparée par des virgules pour évaluer la redondance."
    ],
    examples: [
      {
        stdin: 'PG=VM-Network VLAN=10 UPLINKS=vmnic0,vmnic1 MTU=1500\nPG=Management VLAN=0 UPLINKS=vmnic0 MTU=1500\nPG=vMotion-IP VLAN=4095 UPLINKS=vmnic2,vmnic3 MTU=9000',
        expected: `PG:VM-Network | VLAN:10 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT
PG:Management | VLAN:0 | MODE:EST | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING
PG:vMotion-IP | VLAN:4095 | MODE:VGT | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT
`,
        note: 'Validation des 3 modes VLAN canoniques VST, EST et VGT avec Jumbo Frames.'
      }
    ],
    tests: [
      {
        label: 'VLAN ID invalide et MTU supérieure à 9000',
        stdin: 'PG=Storage-iSCSI VLAN=50 UPLINKS=vmnic1,vmnic2 MTU=9000\nPG=Bad-VLAN VLAN=5000 UPLINKS=vmnic0 MTU=1500',
        expected: `PG:Storage-iSCSI | VLAN:50 | MODE:VST | FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT
PG:Bad-VLAN | VLAN:5000 | MODE:INVALID_VLAN | FRAMES:STANDARD_MTU | REDUNDANCY:SINGLE_UPLINK_WARNING
`
      },
      {
        label: 'VLAN limite 4094 en mode VST',
        stdin: 'PG=Guest-Trunk VLAN=4094 UPLINKS=vmnic0,vmnic1,vmnic2 MTU=1500',
        expected: 'PG:Guest-Trunk | VLAN:4094 | MODE:VST | FRAMES:STANDARD_MTU | REDUNDANCY:REDUNDANT\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    pg = parts.get("PG", "PG")
    vlan_id = int(parts.get("VLAN", 0))
    uplinks_str = parts.get("UPLINKS", "")
    mtu = int(parts.get("MTU", 1500))

    if vlan_id == 0:
        mode = "EST"
    elif 1 <= vlan_id <= 4094:
        mode = "VST"
    elif vlan_id == 4095:
        mode = "VGT"
    else:
        mode = "INVALID_VLAN"

    frames = "JUMBO_ENABLED" if mtu >= 9000 else "STANDARD_MTU"

    uplinks = [u.strip() for u in uplinks_str.split(",") if u.strip()]
    redundancy = "REDUNDANT" if len(uplinks) >= 2 else "SINGLE_UPLINK_WARNING"

    print(f"PG:{pg} | VLAN:{vlan_id} | MODE:{mode} | FRAMES:{frames} | REDUNDANCY:{redundancy}")
`
  },
  {
    id: 'vrt3-c4-e2',
    chapter: 4,
    title: 'Simulateur de Politiques de Sécurité vSwitch (Promiscuous, MAC Changes, Forged Transmits)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le score de durcissement sécuritaire d\'un vSwitch et filtrer les actions réseau non autorisées.',
    brief: `<p>Les politiques de sécurité de niveau 2 sur un commutateur virtuel régulent les comportements des cartes vNIC :<br><br>
1. <strong>Paramètres de sécurité (REJECT par défaut)</strong> :<br>
- <code>PROMISC</code> (Mode promiscuous) : autorise ou refuse l'écoute de tout le trafic du vSwitch.<br>
- <code>MAC_CHANGE</code> : autorise ou refuse la modification de l'adresse MAC par l'OS invité.<br>
- <code>FORGED_TX</code> : autorise ou refuse l'émission de trames dont la MAC source est falsifiée.<br><br>
2. <strong>Score de durcissement (Hardening Score sur 100%)</strong> :<br>
Chaque paramètre configuré à <code>REJECT</code> rapporte 33.33 points (soit 100% si tous à REJECT, 66.7% si deux, 33.3% si un, 0.0% si aucun).<br>
Statut :<br>
- <code>HARDENED</code> si score &ge; 99.0%<br>
- <code>PERMISSIVE</code> si 50.0% &le; score &lt; 99.0%<br>
- <code>VULNERABLE</code> si score &lt; 50.0%<br><br>
3. <strong>Filtrage des actions</strong> :<br>
Pour une action donnée :<br>
- <code>SNIFF</code> : <code>PERMITTED</code> si PROMISC=ACCEPT sinon <code>BLOCKED</code>.<br>
- <code>RECV_NEW_MAC</code> : <code>PERMITTED</code> si MAC_CHANGE=ACCEPT sinon <code>BLOCKED</code>.<br>
- <code>SEND_SPOOFED_MAC</code> : <code>PERMITTED</code> si FORGED_TX=ACCEPT sinon <code>BLOCKED</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>PG=&lt;nom&gt; PROMISC=&lt;ACCEPT|REJECT&gt; MAC_CHANGE=&lt;ACCEPT|REJECT&gt; FORGED_TX=&lt;ACCEPT|REJECT&gt; ACTIONS=&lt;a1,a2,...&gt;</code>.<br><br>
Format de sortie :<br>
<code>PG:&lt;nom&gt; | HARDENING:&lt;score:.1f&gt;% (&lt;statut&gt;) | RESULTS:&lt;action1&gt;=&lt;PERMITTED|BLOCKED&gt;,&lt;action2&gt;=...</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer le niveau de durcissement et filtrer les actions réseau
`,
    hints: [
      "Calculez le score en accordant (100.0 / 3.0) pour chaque règle configurée à REJECT.",
      "Vérifiez pour chaque action si la règle correspondante est à ACCEPT (PERMITTED) ou REJECT (BLOCKED)."
    ],
    examples: [
      {
        stdin: 'PG=Secured-LAN PROMISC=REJECT MAC_CHANGE=REJECT FORGED_TX=REJECT ACTIONS=SNIFF,SEND_SPOOFED_MAC\nPG=Lab-Monitor PROMISC=ACCEPT MAC_CHANGE=ACCEPT FORGED_TX=REJECT ACTIONS=SNIFF,RECV_NEW_MAC,SEND_SPOOFED_MAC',
        expected: `PG:Secured-LAN | HARDENING:100.0% (HARDENED) | RESULTS:SNIFF=BLOCKED,SEND_SPOOFED_MAC=BLOCKED
PG:Lab-Monitor | HARDENING:33.3% (VULNERABLE) | RESULTS:SNIFF=PERMITTED,RECV_NEW_MAC=PERMITTED,SEND_SPOOFED_MAC=BLOCKED
`,
        note: 'Port Group entièrement durci vs Port Group permissif pour sonde d\'écoute.'
      }
    ],
    tests: [
      {
        label: 'Configuration intermédiaire permise',
        stdin: 'PG=Proxy-Net PROMISC=REJECT MAC_CHANGE=ACCEPT FORGED_TX=REJECT ACTIONS=SNIFF,RECV_NEW_MAC',
        expected: 'PG:Proxy-Net | HARDENING:66.7% (PERMISSIVE) | RESULTS:SNIFF=BLOCKED,RECV_NEW_MAC=PERMITTED\n'
      },
      {
        label: 'Toutes les options permissives à 0% de durcissement',
        stdin: 'PG=Zero-Sec PROMISC=ACCEPT MAC_CHANGE=ACCEPT FORGED_TX=ACCEPT ACTIONS=SEND_SPOOFED_MAC',
        expected: 'PG:Zero-Sec | HARDENING:0.0% (VULNERABLE) | RESULTS:SEND_SPOOFED_MAC=PERMITTED\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    pg = parts.get("PG", "PG")
    promisc = parts.get("PROMISC", "REJECT").upper()
    mac_change = parts.get("MAC_CHANGE", "REJECT").upper()
    forged_tx = parts.get("FORGED_TX", "REJECT").upper()
    actions_str = parts.get("ACTIONS", "")

    rejections = sum(1 for v in [promisc, mac_change, forged_tx] if v == "REJECT")
    score = (rejections / 3.0) * 100.0

    if score >= 99.0:
        statut = "HARDENED"
    elif score >= 50.0:
        statut = "PERMISSIVE"
    else:
        statut = "VULNERABLE"

    results = []
    for a in actions_str.split(","):
        a = a.strip()
        if not a:
            continue
        if a == "SNIFF":
            res = "PERMITTED" if promisc == "ACCEPT" else "BLOCKED"
        elif a == "RECV_NEW_MAC":
            res = "PERMITTED" if mac_change == "ACCEPT" else "BLOCKED"
        elif a == "SEND_SPOOFED_MAC":
            res = "PERMITTED" if forged_tx == "ACCEPT" else "BLOCKED"
        else:
            res = "UNKNOWN"
        results.append(f"{a}={res}")

    res_str = ",".join(results)
    print(f"PG:{pg} | HARDENING:{score:.1f}% ({statut}) | RESULTS:{res_str}")
`
  },
  {
    id: 'vrt3-c4-e3',
    chapter: 4,
    title: 'Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)',
    level: 'n3',
    language: 'python',
    goal: 'Modéliser l\'algorithme de lissage de trafic réseau (Token Bucket) et calculer la durée de transfert et le débit effectif.',
    brief: `<p>Le Traffic Shaping sur un vSwitch régule la bande passante selon un algorithme de seau à jetons (Token Bucket) :<br><br>
1. <strong>Paramètres du profil de régulation</strong> :<br>
- <code>AVG_KBPS</code> : Débit moyen permanent alloué (en kbps).<br>
- <code>PEAK_KBPS</code> : Débit maximal autorisé en période de pic (en kbps).<br>
- <code>BURST_KB</code> : Capacité maximale du tampon de rafale (en Ko).<br><br>
2. <strong>Calculs pour un transfert de <code>TRANSFER_MB</code> Mo</strong> :<br>
- Volume total en kilobits : <code>total_kbits = TRANSFER_MB * 8000.0</code> (unité réseau : 1 Mo = 1 000 Ko = 8 000 kb).<br>
- Capacité de rafale en kilobits : <code>burst_kbits = min(total_kbits, BURST_KB * 8.0)</code>.<br>
- Durée de la phase de rafale : <code>burst_time_s = burst_kbits / PEAK_KBPS</code>.<br>
- Volume restant à écouler au débit moyen : <code>remaining_kbits = total_kbits - burst_kbits</code>.<br>
- Durée de la phase moyenne : <code>avg_time_s = remaining_kbits / AVG_KBPS</code>.<br>
- Durée totale du transfert : <code>total_time_s = burst_time_s + avg_time_s</code>.<br>
- Débit moyen effectif global : <code>effective_rate_kbps = total_kbits / total_time_s</code>.<br><br>
Format d'entrée (sur STDIN) :<br>
Lignes : <code>PROFILE=&lt;nom&gt; AVG_KBPS=&lt;n&gt; PEAK_KBPS=&lt;n&gt; BURST_KB=&lt;n&gt; TRANSFER_MB=&lt;n&gt;</code>.<br><br>
Format de sortie :<br>
<code>PROFILE:&lt;nom&gt; | BURST_TIME:&lt;burst_time_s:.2f&gt;s | TOTAL_TIME:&lt;total_time_s:.2f&gt;s | EFFECTIVE_RATE:&lt;effective_rate_kbps:.1f&gt;kbps</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la phase de rafale et la durée globale de transfert sous Traffic Shaping
`,
    hints: [
      "Convertissez les Mo en kilobits réseau : total_kbits = TRANSFER_MB * 8000.0.",
      "La rafale n'absorbe qu'au plus min(total_kbits, BURST_KB * 8.0) avant retour au débit moyen."
    ],
    examples: [
      {
        stdin: 'PROFILE=Web-Policy AVG_KBPS=10000 PEAK_KBPS=40000 BURST_KB=5000 TRANSFER_MB=10\nPROFILE=DB-Replication AVG_KBPS=50000 PEAK_KBPS=100000 BURST_KB=10000 TRANSFER_MB=50',
        expected: `PROFILE:Web-Policy | BURST_TIME:1.00s | TOTAL_TIME:5.00s | EFFECTIVE_RATE:16000.0kbps
PROFILE:DB-Replication | BURST_TIME:0.80s | TOTAL_TIME:7.20s | EFFECTIVE_RATE:55555.6kbps
`,
        note: 'Calcul pour 10 Mo avec rafale 5 Mo vs 50 Mo avec rafale 10 Mo.'
      }
    ],
    tests: [
      {
        label: 'Transfert très court entièrement contenu dans la rafale',
        stdin: 'PROFILE=Quick-Burst AVG_KBPS=5000 PEAK_KBPS=20000 BURST_KB=4000 TRANSFER_MB=1',
        expected: 'PROFILE:Quick-Burst | BURST_TIME:0.40s | TOTAL_TIME:0.40s | EFFECTIVE_RATE:20000.0kbps\n'
      },
      {
        label: 'Très gros transfert dominé par le débit moyen',
        stdin: 'PROFILE=Heavy-Transfer AVG_KBPS=20000 PEAK_KBPS=80000 BURST_KB=10000 TRANSFER_MB=200',
        expected: 'PROFILE:Heavy-Transfer | BURST_TIME:1.00s | TOTAL_TIME:77.00s | EFFECTIVE_RATE:20779.2kbps\n'
      }
    ],
    solution: `import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    parts = dict(p.split("=", 1) for p in line.split())
    prof = parts.get("PROFILE", "Prof")
    avg_kbps = float(parts.get("AVG_KBPS", 10000))
    peak_kbps = float(parts.get("PEAK_KBPS", 20000))
    burst_kb = float(parts.get("BURST_KB", 1000))
    transfer_mb = float(parts.get("TRANSFER_MB", 10))

    total_kbits = transfer_mb * 8000.0
    burst_cap_kbits = burst_kb * 8.0

    burst_kbits = min(total_kbits, burst_cap_kbits)
    burst_time = burst_kbits / peak_kbps

    remaining_kbits = total_kbits - burst_kbits
    avg_time = remaining_kbits / avg_kbps

    total_time = burst_time + avg_time
    effective_rate = total_kbits / total_time

    print(f"PROFILE:{prof} | BURST_TIME:{burst_time:.2f}s | TOTAL_TIME:{total_time:.2f}s | EFFECTIVE_RATE:{effective_rate:.1f}kbps")
`
  }
];
