/**
 * Exercices Chapitre 1 — Firewall & Sécurité Réseau B3.
 * Introduction, Concepts Fondamentaux & Évolution des Pare-feux.
 */
'use strict';

module.exports = [
  {
    id: 'fw3-c1-e1',
    chapter: 1,
    title: 'Classificateur de génération et d’architecture de pare-feu',
    level: 'n1',
    language: 'python',
    goal: 'Identifier la génération technologique et l’architecture d’un pare-feu selon ses capacités d’inspection.',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format :<br>\n<code>EQUIPEMENT nom=&lt;nom&gt; couche_max=&lt;L3|L4|L7&gt; suivi_etat=&lt;OUI|NON&gt; utm_modules=&lt;OUI|NON&gt; ia_zero_day=&lt;OUI|NON&gt;</code>.<br><br>\nRègles de classification :<br>\n1. Si <code>ia_zero_day=OUI</code> et <code>couche_max=L7</code> :<br>\n   <code>GENERATION=GEN4_NGFW</code>, <code>TYPE=PAREFEU_NOUVELLE_GENERATION</code>.<br>\n2. Sinon si <code>utm_modules=OUI</code> et <code>couche_max=L7</code> :<br>\n   <code>GENERATION=GEN3_UTM</code>, <code>TYPE=GESTION_UNIFIEE_MENACES</code>.<br>\n3. Sinon si <code>suivi_etat=OUI</code> et (<code>couche_max=L4</code> ou <code>couche_max=L7</code>) :<br>\n   <code>GENERATION=GEN2_STATEFUL</code>, <code>TYPE=INSPECTION_AVEC_ETAT</code>.<br>\n4. Sinon si <code>suivi_etat=NON</code> et (<code>couche_max=L3</code> ou <code>couche_max=L4</code>) :<br>\n   <code>GENERATION=GEN1_STATELESS</code>, <code>TYPE=FILTRAGE_PAQUETS_STATIQUE</code>.<br>\n5. Sinon :<br>\n   <code>GENERATION=INDETERMINEE</code>, <code>TYPE=PASSERELLE_GENERIQUE</code>.<br><br>\nAfficher :<br>\n<code>FIREWALL_CLASS: {nom} -> {GENERATION} | {TYPE}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier la génération et le type de pare-feu
`,
    hints: [
      'Évaluer les critères dans l’ordre de la spécification.',
      'Extraire les arguments par découpage ou regex.'
    ],
    examples: [
      {
        stdin: 'EQUIPEMENT nom=PaloAlto5200 couche_max=L7 suivi_etat=OUI utm_modules=OUI ia_zero_day=OUI',
        expected: 'FIREWALL_CLASS: PaloAlto5200 -> GEN4_NGFW | PAREFEU_NOUVELLE_GENERATION',
        note: 'Inspection L7 avec IA et détection zero-day : 4e génération NGFW.'
      }
    ],
    tests: [
      {
        label: 'Appliance UTM intégrée FortiGate',
        stdin: 'EQUIPEMENT nom=FortiGate60F couche_max=L7 suivi_etat=OUI utm_modules=OUI ia_zero_day=NON',
        expected: 'FIREWALL_CLASS: FortiGate60F -> GEN3_UTM | GESTION_UNIFIEE_MENACES'
      },
      {
        label: 'Pare-feu stateful classique Cisco ASA',
        stdin: 'EQUIPEMENT nom=CiscoASA5505 couche_max=L4 suivi_etat=OUI utm_modules=NON ia_zero_day=NON',
        expected: 'FIREWALL_CLASS: CiscoASA5505 -> GEN2_STATEFUL | INSPECTION_AVEC_ETAT'
      },
      {
        label: 'Routeur avec simples ACLs stateless',
        stdin: 'EQUIPEMENT nom=RouteurBorder couche_max=L3 suivi_etat=NON utm_modules=NON ia_zero_day=NON',
        expected: 'FIREWALL_CLASS: RouteurBorder -> GEN1_STATELESS | FILTRAGE_PAQUETS_STATIQUE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+)\\s+couche_max=([^\\s]+)\\s+suivi_etat=([^\\s]+)\\s+utm_modules=([^\\s]+)\\s+ia_zero_day=([^\\s]+)', lig)
    if not m:
        continue
    nom, couche, etat, utm, ia = m.groups()
    
    if ia == 'OUI' and couche == 'L7':
        gen = 'GEN4_NGFW'
        typ = 'PAREFEU_NOUVELLE_GENERATION'
    elif utm == 'OUI' and couche == 'L7':
        gen = 'GEN3_UTM'
        typ = 'GESTION_UNIFIEE_MENACES'
    elif etat == 'OUI' and couche in ['L4', 'L7']:
        gen = 'GEN2_STATEFUL'
        typ = 'INSPECTION_AVEC_ETAT'
    elif etat == 'NON' and couche in ['L3', 'L4']:
        gen = 'GEN1_STATELESS'
        typ = 'FILTRAGE_PAQUETS_STATIQUE'
    else:
        gen = 'INDETERMINEE'
        typ = 'PASSERELLE_GENERIQUE'
        
    print(f"FIREWALL_CLASS: {nom} -> {gen} | {typ}")
`
  },
  {
    id: 'fw3-c1-e2',
    chapter: 1,
    title: 'Auditeur de séparation des zones de confiance réseau',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la légitimité des flux inter-zones selon le modèle de confiance (Trusted, Untrusted, DMZ, Management).',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>FLUX src_zone=&lt;LAN|WAN|DMZ|MGMT&gt; dst_zone=&lt;LAN|WAN|DMZ|MGMT&gt; port=&lt;N&gt; proto=&lt;TCP|UDP&gt;</code>.<br><br>\nRègles fondamentales de la matrice de confiance :<br>\n1. <code>DMZ -&gt; LAN</code> : <strong>INTERDICTION ABSOLUE</strong> (violation de la règle d\'or de la DMZ).<br>\n   <code>VERDICT=REJET_CRITIQUE_VIOLATION_DMZ_VERS_LAN</code>.<br>\n2. <code>WAN -&gt; LAN</code> : <strong>INTERDICTION PAR DÉFAUT</strong>.<br>\n   <code>VERDICT=REJET_SECURITE_WAN_DIRECT_VERS_LAN</code>.<br>\n3. <code>WAN -&gt; DMZ</code> : Autorisé UNIQUEMENT si port $\\in \\{80, 443\\}$ et proto=TCP.<br>\n   Si conforme : <code>VERDICT=AUTORISE_SERVICE_PUBLIC_DMZ</code>.<br>\n   Sinon : <code>VERDICT=REJET_PORT_NON_PUBLIC_DMZ</code>.<br>\n4. <code>LAN -&gt; WAN</code> ou <code>LAN -&gt; DMZ</code> : Toujours autorisé.<br>\n   <code>VERDICT=AUTORISE_FLUX_SORTANT_DEPUIS_LAN</code>.<br>\n5. <code>MGMT</code> : Seul le <code>LAN</code> peut accéder à <code>MGMT</code> sur le port 22 (SSH) ou 443 (HTTPS WebUI).<br>\n   Si $src=LAN$ et port $\\in \\{22, 443\\}$ : <code>VERDICT=AUTORISE_ADMINISTRATION_MGMT</code>.<br>\n   Sinon : <code>VERDICT=REJET_ACCES_ZONE_MGMT_RESTREINTE</code>.<br><br>\nAfficher :<br>\n<code>ZONE_AUDIT: {src_zone}->{dst_zone}:{proto}/{port} -> {VERDICT}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer le respect des frontières de zones de confiance
`,
    hints: [
      'Traiter en priorité l’interdiction absolue de DMZ vers LAN.',
      'Valider les ports autorisés vers la DMZ et vers MGMT.'
    ],
    examples: [
      {
        stdin: 'FLUX src_zone=DMZ dst_zone=LAN port=3306 proto=TCP',
        expected: 'ZONE_AUDIT: DMZ->LAN:TCP/3306 -> REJET_CRITIQUE_VIOLATION_DMZ_VERS_LAN',
        note: 'Une machine de la DMZ compromise ne doit JAMAIS initier de flux vers le LAN interne.'
      }
    ],
    tests: [
      {
        label: 'Trafic web public entrant vers serveur DMZ',
        stdin: 'FLUX src_zone=WAN dst_zone=DMZ port=443 proto=TCP',
        expected: 'ZONE_AUDIT: WAN->DMZ:TCP/443 -> AUTORISE_SERVICE_PUBLIC_DMZ'
      },
      {
        label: 'Tentative directe WAN vers LAN bloquée',
        stdin: 'FLUX src_zone=WAN dst_zone=LAN port=22 proto=TCP',
        expected: 'ZONE_AUDIT: WAN->LAN:TCP/22 -> REJET_SECURITE_WAN_DIRECT_VERS_LAN'
      },
      {
        label: 'Administration légitime depuis LAN vers MGMT',
        stdin: 'FLUX src_zone=LAN dst_zone=MGMT port=22 proto=TCP',
        expected: 'ZONE_AUDIT: LAN->MGMT:TCP/22 -> AUTORISE_ADMINISTRATION_MGMT'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'src_zone=([^\\s]+)\\s+dst_zone=([^\\s]+)\\s+port=(\\d+)\\s+proto=([^\\s]+)', lig)
    if not m:
        continue
    src, dst, port_str, proto = m.groups()
    port = int(port_str)
    
    if src == 'DMZ' and dst == 'LAN':
        verdict = 'REJET_CRITIQUE_VIOLATION_DMZ_VERS_LAN'
    elif src == 'WAN' and dst == 'LAN':
        verdict = 'REJET_SECURITE_WAN_DIRECT_VERS_LAN'
    elif src == 'WAN' and dst == 'DMZ':
        if port in [80, 443] and proto == 'TCP':
            verdict = 'AUTORISE_SERVICE_PUBLIC_DMZ'
        else:
            verdict = 'REJET_PORT_NON_PUBLIC_DMZ'
    elif dst == 'MGMT':
        if src == 'LAN' and port in [22, 443] and proto == 'TCP':
            verdict = 'AUTORISE_ADMINISTRATION_MGMT'
        else:
            verdict = 'REJET_ACCES_ZONE_MGMT_RESTREINTE'
    elif src == 'LAN' and dst in ['WAN', 'DMZ']:
        verdict = 'AUTORISE_FLUX_SORTANT_DEPUIS_LAN'
    else:
        verdict = 'REJET_SECURITE_WAN_DIRECT_VERS_LAN'
        
    print(f"ZONE_AUDIT: {src}->{dst}:{proto}/{port} -> {verdict}")
`
  },
  {
    id: 'fw3-c1-e3',
    chapter: 1,
    title: 'Moteur de filtrage de paquets sans état (Stateless Packet Filter)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler un pare-feu statique de première génération appliquant une liste de règles IP/Port indépendantes.',
    brief: '<p>Le script lit sur l\'entrée standard une liste de règles puis un paquet à évaluer :<br>\nLignes de règles :<br>\n<code>RULE id=&lt;N&gt; src=&lt;IP|ANY&gt; dst=&lt;IP|ANY&gt; proto=&lt;TCP|UDP|ICMP|ANY&gt; dport=&lt;N|ANY&gt; action=&lt;ACCEPT|DROP|REJECT&gt;</code>.<br>\nLigne finale de paquet :<br>\n<code>PACKET src=&lt;IP&gt; dst=&lt;IP&gt; proto=&lt;TCP|UDP|ICMP&gt; dport=&lt;N&gt;</code>.<br><br>\nPrincipe d\'évaluation :<br>\n- Parcourir les règles dans l\'ordre d\'apparition (First Match Wins).<br>\n- Un paquet concorde avec une règle si tous les champs spécifiés correspondent (<code>ANY</code> concorde avec tout).<br>\n- Dès qu\'une règle concorde, l\'action de cette règle est appliquée immédiatement.<br>\n- Si aucune règle ne concorde : appliquer la politique par défaut <code>DEFAULT_DROP (AUCUNE_REGLE)</code>.<br><br>\nAfficher :<br>\n<code>PACKET_DECISION: {action} (MATCH_RULE={id_ou_NONE}) -> {src}:{proto}/{dport}->{dst}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer le paquet contre les règles stateless dans l'ordre
`,
    hints: [
      'Gérer ANY comme joker universel sur chaque critère.',
      'Arrêter l’évaluation dès la première règle correspondante.'
    ],
    examples: [
      {
        stdin: `RULE id=1 src=ANY dst=192.168.1.10 proto=TCP dport=80 action=ACCEPT
RULE id=2 src=ANY dst=192.168.1.10 proto=TCP dport=443 action=ACCEPT
RULE id=3 src=ANY dst=ANY proto=ANY dport=ANY action=DROP
PACKET src=10.0.0.5 dst=192.168.1.10 proto=TCP dport=80`,
        expected: 'PACKET_DECISION: ACCEPT (MATCH_RULE=1) -> 10.0.0.5:TCP/80->192.168.1.10',
        note: 'Le paquet concorde avec la règle 1 (port 80) : action ACCEPT immédiate.'
      }
    ],
    tests: [
      {
        label: 'Paquet bloqué par règle drop explicite',
        stdin: `RULE id=10 src=203.0.113.5 dst=ANY proto=ANY dport=ANY action=DROP
RULE id=20 src=ANY dst=ANY proto=TCP dport=22 action=ACCEPT
PACKET src=203.0.113.5 dst=192.168.1.1 proto=TCP dport=22`,
        expected: 'PACKET_DECISION: DROP (MATCH_RULE=10) -> 203.0.113.5:TCP/22->192.168.1.1'
      },
      {
        label: 'Paquet tombant sur la politique par défaut',
        stdin: `RULE id=100 src=192.168.1.0/24 dst=ANY proto=UDP dport=53 action=ACCEPT
PACKET src=10.0.0.1 dst=8.8.8.8 proto=TCP dport=80`,
        expected: 'PACKET_DECISION: DEFAULT_DROP (MATCH_RULE=NONE) -> 10.0.0.1:TCP/80->8.8.8.8'
      },
      {
        label: 'Règle Reject avec code d’erreur simulé',
        stdin: `RULE id=50 src=ANY dst=192.168.1.254 proto=TCP dport=23 action=REJECT
RULE id=60 src=ANY dst=ANY proto=ANY dport=ANY action=DROP
PACKET src=172.16.0.4 dst=192.168.1.254 proto=TCP dport=23`,
        expected: 'PACKET_DECISION: REJECT (MATCH_RULE=50) -> 172.16.0.4:TCP/23->192.168.1.254'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

rules = []
packet = None

for lig in lignes:
    if lig.startswith('RULE'):
        m = re.search(r'id=([^\\s]+)\\s+src=([^\\s]+)\\s+dst=([^\\s]+)\\s+proto=([^\\s]+)\\s+dport=([^\\s]+)\\s+action=([^\\s]+)', lig)
        if m:
            rules.append({
                'id': m.group(1),
                'src': m.group(2),
                'dst': m.group(3),
                'proto': m.group(4),
                'dport': m.group(5),
                'action': m.group(6)
            })
    elif lig.startswith('PACKET'):
        m = re.search(r'src=([^\\s]+)\\s+dst=([^\\s]+)\\s+proto=([^\\s]+)\\s+dport=([^\\s]+)', lig)
        if m:
            packet = {
                'src': m.group(1),
                'dst': m.group(2),
                'proto': m.group(3),
                'dport': m.group(4)
            }

if packet:
    match_rule = None
    for r in rules:
        # Match src
        if r['src'] != 'ANY' and r['src'] != packet['src']:
            continue
        # Match dst
        if r['dst'] != 'ANY' and r['dst'] != packet['dst']:
            continue
        # Match proto
        if r['proto'] != 'ANY' and r['proto'] != packet['proto']:
            continue
        # Match dport
        if r['dport'] != 'ANY' and r['dport'] != packet['dport']:
            continue
            
        match_rule = r
        break
        
    if match_rule:
        action = match_rule['action']
        rid = match_rule['id']
    else:
        action = 'DEFAULT_DROP'
        rid = 'NONE'
        
    print(f"PACKET_DECISION: {action} (MATCH_RULE={rid}) -> {packet['src']}:{packet['proto']}/{packet['dport']}->{packet['dst']}")
`
  }
];
