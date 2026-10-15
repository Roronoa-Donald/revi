/**
 * Exercices Chapitre 4 — Firewall & Sécurité Réseau B3.
 * Architectures de sécurité réseau, DMZ & Bastions.
 */
'use strict';

module.exports = [
  {
    id: 'fw3-c4-e1',
    chapter: 4,
    title: 'Contrôleur de conformité des flux de sécurité DMZ',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la conformité des flux réseau selon la matrice de sécurité inter-zones et interdire formellement DMZ vers LAN.',
    brief: `<p>La <strong>Zone Démilitarisée (DMZ)</strong> héberge les serveurs publics de l'entreprise. La règle cardinale de sécurité réseau stipule qu'<strong>aucune connexion ne doit jamais pouvoir être initiée depuis la DMZ vers le réseau interne LAN</strong> (car un pirate ayant compromis un serveur web en DMZ pourrait pivoter vers les postes internes).<br><br>
Matrice de conformité des flux initiés :<br>
1. <code>DMZ -&gt; LAN</code> : Toujours <code>VIOLATION_CRITIQUE_DMZ_VERS_LAN</code> quel que soit le port.<br>
2. <code>WAN -&gt; DMZ</code> : Autorisé uniquement sur les ports publics <code>80, 443, 25, 53</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>
3. <code>LAN -&gt; DMZ</code> : Autorisé pour l'administration et les services <code>80, 443, 22, 3306</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>
4. <code>LAN -&gt; WAN</code> : Autorisé pour la navigation <code>80, 443, 53</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>
5. <code>DMZ -&gt; WAN</code> : Autorisé uniquement pour les mises à jour et DNS <code>80, 443, 53</code> -> <code>CONFORME</code> (sinon <code>SERVICE_NON_AUTORISE</code>).<br>
6. <code>WAN -&gt; LAN</code> : Toujours <code>VIOLATION_WAN_VERS_LAN_INTERDIT</code>.<br><br>
Le script lit sur l'entrée standard des flux au format :<br>
<code>FLOW id=&lt;id&gt; src_zone=&lt;WAN|LAN|DMZ&gt; dst_zone=&lt;WAN|LAN|DMZ&gt; dport=&lt;port&gt;</code>.<br><br>
Pour chaque flux, afficher :<br>
<code>AUDIT flow={id} status={CONFORME | motif_rejet}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la matrice de flux inter-zones
`,
    hints: [
      'Traiter en priorité les violations absolues (DMZ->LAN et WAN->LAN).',
      'Vérifier si le port destination fait partie de la liste blanche autorisée pour le couple (src, dst).'
    ],
    examples: [
      {
        stdin: 'FLOW id=F1 src_zone=WAN dst_zone=DMZ dport=443\nFLOW id=F2 src_zone=DMZ dst_zone=LAN dport=3306',
        expected: 'AUDIT flow=F1 status=CONFORME\nAUDIT flow=F2 status=VIOLATION_CRITIQUE_DMZ_VERS_LAN',
        note: 'F1 est conforme (HTTPS public en DMZ), F2 est une violation critique majeure de DMZ vers LAN.'
      }
    ],
    tests: [
      {
        label: 'Tentative de connexion WAN directe vers le LAN',
        stdin: 'FLOW id=W1 src_zone=WAN dst_zone=LAN dport=22\nFLOW id=W2 src_zone=WAN dst_zone=DMZ dport=80',
        expected: 'AUDIT flow=W1 status=VIOLATION_WAN_VERS_LAN_INTERDIT\nAUDIT flow=W2 status=CONFORME'
      },
      {
        label: 'Flux applicatif LAN vers base de données DMZ et service non autorisé',
        stdin: 'FLOW id=L1 src_zone=LAN dst_zone=DMZ dport=3306\nFLOW id=L2 src_zone=LAN dst_zone=DMZ dport=139\nFLOW id=D1 src_zone=DMZ dst_zone=WAN dport=443\nFLOW id=D2 src_zone=DMZ dst_zone=WAN dport=22',
        expected: 'AUDIT flow=L1 status=CONFORME\nAUDIT flow=L2 status=SERVICE_NON_AUTORISE\nAUDIT flow=D1 status=CONFORME\nAUDIT flow=D2 status=SERVICE_NON_AUTORISE'
      },
      {
        label: 'Navigation LAN vers Internet WAN légitime et interdite',
        stdin: 'FLOW id=N1 src_zone=LAN dst_zone=WAN dport=80\nFLOW id=N2 src_zone=LAN dst_zone=WAN dport=6667',
        expected: 'AUDIT flow=N1 status=CONFORME\nAUDIT flow=N2 status=SERVICE_NON_AUTORISE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

AUTH_PORTS = {
    ('WAN', 'DMZ'): {80, 443, 25, 53},
    ('LAN', 'DMZ'): {80, 443, 22, 3306},
    ('LAN', 'WAN'): {80, 443, 53},
    ('DMZ', 'WAN'): {80, 443, 53}
}

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+src_zone=([^\\s]+)\\s+dst_zone=([^\\s]+)\\s+dport=([^\\s]+)', lig)
    if not m:
        continue
    fid, src, dst, dport = m.groups()
    dport = int(dport)
    
    if src == 'DMZ' and dst == 'LAN':
        status = 'VIOLATION_CRITIQUE_DMZ_VERS_LAN'
    elif src == 'WAN' and dst == 'LAN':
        status = 'VIOLATION_WAN_VERS_LAN_INTERDIT'
    elif (src, dst) in AUTH_PORTS:
        if dport in AUTH_PORTS[(src, dst)]:
            status = 'CONFORME'
        else:
            status = 'SERVICE_NON_AUTORISE'
    else:
        status = 'SERVICE_NON_AUTORISE'
        
    print(f"AUDIT flow={fid} status={status}")
`
  },
  {
    id: 'fw3-c4-e2',
    chapter: 4,
    title: 'Évaluateur d’architectures et topologies pare-feu',
    level: 'n2',
    language: 'python',
    goal: 'Classifier l’architecture réseau (Dual-Homed, Triple-Homed, Back-to-Back) et calculer son score de résilience.',
    brief: `<p>L'architecture de déploiement des pare-feux conditionne la résistance globale du système informatique face aux intrusions :<br><br>
Modèles d'architecture :<br>
1. <strong>Dual-Homed Bastion</strong> : 1 seul pare-feu, 2 zones (<code>LAN, WAN</code>). Pas de DMZ.<br>
   - <code>ARCHITECTURE=DUAL_HOMED</code>, <code>SCORE=4/10</code>, <code>VERDICT=INSUFFISANT_PAS_DE_DMZ</code>.<br>
2. <strong>Triple-Homed (Screened Subnet unique)</strong> : 1 seul pare-feu, 3 zones (<code>LAN, DMZ, WAN</code>).<br>
   - Si <code>constructeurs=1</code> : <code>ARCHITECTURE=TRIPLE_HOMED</code>, <code>SCORE=7/10</code>, <code>VERDICT=ACCEPTABLE_SPOF_FIREWALL_UNIQUE</code>.<br>
3. <strong>Back-to-Back (Pare-feux en cascade avec DMZ sandwich)</strong> : au moins 2 pare-feux distincts encadrant la DMZ.<br>
   - Si <code>constructeurs &gt;= 2</code> : <code>ARCHITECTURE=BACK_TO_BACK_HETEROGENE</code>, <code>SCORE=9/10</code>, <code>VERDICT=EXCELLENT_DEFENSE_EN_PROFONDEUR</code>.<br>
   - Si <code>constructeurs == 1</code> : <code>ARCHITECTURE=BACK_TO_BACK_HOMOGENE</code>, <code>SCORE=8/10</code>, <code>VERDICT=TRES_BON_VULNERABILITE_COMMUNE_POSSIBLE</code>.<br><br>
Le script lit sur l'entrée standard des descriptions d'infrastructures :<br>
<code>TOPOLOGY nom=&lt;nom&gt; firewalls=&lt;nb&gt; zones=&lt;liste_zones&gt; constructeurs=&lt;nb&gt;</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>TOPOLOGY_AUDIT nom={nom} arch={ARCHITECTURE} score={SCORE} verdict={VERDICT}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier la topologie et attribuer le score de résilience
`,
    hints: [
      'Compter le nombre de pare-feux et la présence de la zone DMZ.',
      'Distinguer les topologies Back-to-Back selon le nombre de constructeurs différents.'
    ],
    examples: [
      {
        stdin: 'TOPOLOGY nom=Siege_Banque firewalls=2 zones=LAN,DMZ,WAN constructeurs=2',
        expected: 'TOPOLOGY_AUDIT nom=Siege_Banque arch=BACK_TO_BACK_HETEROGENE score=9/10 verdict=EXCELLENT_DEFENSE_EN_PROFONDEUR',
        note: 'Double pare-feu hétérogène (ex: Fortinet en frontal + Cisco en interne) : standard bancaire.'
      }
    ],
    tests: [
      {
        label: 'Petite entreprise avec un seul pare-feu 3 pattes',
        stdin: 'TOPOLOGY nom=PME_Site firewalls=1 zones=LAN,DMZ,WAN constructeurs=1',
        expected: 'TOPOLOGY_AUDIT nom=PME_Site arch=TRIPLE_HOMED score=7/10 verdict=ACCEPTABLE_SPOF_FIREWALL_UNIQUE'
      },
      {
        label: 'Routeur basique sans DMZ',
        stdin: 'TOPOLOGY nom=Agence_Locale firewalls=1 zones=LAN,WAN constructeurs=1',
        expected: 'TOPOLOGY_AUDIT nom=Agence_Locale arch=DUAL_HOMED score=4/10 verdict=INSUFFISANT_PAS_DE_DMZ'
      },
      {
        label: 'Back-to-back avec équipements du même fabricant',
        stdin: 'TOPOLOGY nom=Campus_Univ firewalls=2 zones=LAN,DMZ,WAN constructeurs=1',
        expected: 'TOPOLOGY_AUDIT nom=Campus_Univ arch=BACK_TO_BACK_HOMOGENE score=8/10 verdict=TRES_BON_VULNERABILITE_COMMUNE_POSSIBLE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+)\\s+firewalls=([^\\s]+)\\s+zones=([^\\s]+)\\s+constructeurs=([^\\s]+)', lig)
    if not m:
        continue
    nom, nb_fw, zones_str, nb_const = m.groups()
    nb_fw = int(nb_fw)
    nb_const = int(nb_const)
    zones = set(zones_str.split(','))
    
    if nb_fw >= 2 and 'DMZ' in zones:
        if nb_const >= 2:
            arch = 'BACK_TO_BACK_HETEROGENE'
            score = '9/10'
            verdict = 'EXCELLENT_DEFENSE_EN_PROFONDEUR'
        else:
            arch = 'BACK_TO_BACK_HOMOGENE'
            score = '8/10'
            verdict = 'TRES_BON_VULNERABILITE_COMMUNE_POSSIBLE'
    elif nb_fw == 1 and 'DMZ' in zones:
        arch = 'TRIPLE_HOMED'
        score = '7/10'
        verdict = 'ACCEPTABLE_SPOF_FIREWALL_UNIQUE'
    else:
        arch = 'DUAL_HOMED'
        score = '4/10'
        verdict = 'INSUFFISANT_PAS_DE_DMZ'
        
    print(f"TOPOLOGY_AUDIT nom={nom} arch={arch} score={score} verdict={verdict}")
`
  },
  {
    id: 'fw3-c4-e3',
    chapter: 4,
    title: 'Passerelle d’administration sécurisée et Bastion SSH / Jump Host',
    level: 'n3',
    language: 'python',
    goal: 'Valider les accès d’administration via un hôte bastion avec authentification forte et MFA.',
    brief: `<p>Dans une infrastructure sécurisée, les serveurs critiques de production ne doivent jamais être accessibles directement en SSH depuis le réseau bureautique LAN. Tout accès administrateur doit obligatoirement transiter par un <strong>Bastion SSH (Jump Host)</strong> avec authentification forte (MFA).<br><br>
Règles de validation :<br>
1. Si le port demandé n'est pas <code>22</code> : <code>DENY</code>, motif <code>PORT_NON_ADMINISTRATIF</code>.<br>
2. Si la cible <code>target_zone == 'PROD'</code> :<br>
   a) Si <code>via_bastion == 'NON'</code> : <code>DENY</code>, motif <code>ACCES_DIRECT_INTERDIT_PASSER_PAR_BASTION</code>.<br>
   b) Si <code>via_bastion == 'OUI'</code> et <code>mfa_valid == 'NON'</code> : <code>DENY</code>, motif <code>MFA_REQUIS</code>.<br>
   c) Si <code>via_bastion == 'OUI'</code> et <code>mfa_valid == 'OUI'</code> : <code>PERMIT</code>, motif <code>SESSION_BASTION_VALIDEE</code>.<br>
3. Si la cible <code>target_zone == 'BASTION'</code> :<br>
   a) Si <code>mfa_valid == 'OUI'</code> : <code>PERMIT</code>, motif <code>AUTHENTIFICATION_BASTION_OK</code>.<br>
   b) Sinon : <code>DENY</code>, motif <code>MFA_REQUIS</code>.<br><br>
Le script lit sur l'entrée standard des requêtes :<br>
<code>ACCESS_REQ id=&lt;id&gt; user=&lt;login&gt; target_zone=&lt;PROD|BASTION&gt; port=&lt;p&gt; via_bastion=&lt;OUI|NON&gt; mfa_valid=&lt;OUI|NON&gt;</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>BASTION_GATEWAY req={id} decision={PERMIT|DENY} motif={MOTIF}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : contrôler la politique d'accès d'administration
`,
    hints: [
      'Vérifier d’abord le port SSH (22).',
      'Exiger obligatoirement le passage par le bastion et le MFA valide pour la zone PROD.'
    ],
    examples: [
      {
        stdin: 'ACCESS_REQ id=R1 user=alice target_zone=PROD port=22 via_bastion=NON mfa_valid=OUI\nACCESS_REQ id=R2 user=alice target_zone=PROD port=22 via_bastion=OUI mfa_valid=OUI',
        expected: 'BASTION_GATEWAY req=R1 decision=DENY motif=ACCES_DIRECT_INTERDIT_PASSER_PAR_BASTION\nBASTION_GATEWAY req=R2 decision=PERMIT motif=SESSION_BASTION_VALIDEE',
        note: 'R1 tente une connexion directe non autorisée ; R2 transite par le bastion avec MFA.'
      }
    ],
    tests: [
      {
        label: 'Connexion directe avec port non SSH',
        stdin: 'ACCESS_REQ id=T1 user=bob target_zone=PROD port=80 via_bastion=NON mfa_valid=NON',
        expected: 'BASTION_GATEWAY req=T1 decision=DENY motif=PORT_NON_ADMINISTRATIF'
      },
      {
        label: 'Échec MFA lors de la tentative de connexion au bastion',
        stdin: 'ACCESS_REQ id=T2 user=charlie target_zone=BASTION port=22 via_bastion=NON mfa_valid=NON\nACCESS_REQ id=T3 user=charlie target_zone=BASTION port=22 via_bastion=NON mfa_valid=OUI',
        expected: 'BASTION_GATEWAY req=T2 decision=DENY motif=MFA_REQUIS\nBASTION_GATEWAY req=T3 decision=PERMIT motif=AUTHENTIFICATION_BASTION_OK'
      },
      {
        label: 'Passage par bastion mais sans validation MFA vers PROD',
        stdin: 'ACCESS_REQ id=T4 user=david target_zone=PROD port=22 via_bastion=OUI mfa_valid=NON',
        expected: 'BASTION_GATEWAY req=T4 decision=DENY motif=MFA_REQUIS'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+user=([^\\s]+)\\s+target_zone=([^\\s]+)\\s+port=([^\\s]+)\\s+via_bastion=([^\\s]+)\\s+mfa_valid=([^\\s]+)', lig)
    if not m:
        continue
    rid, user, target, port, via_b, mfa = m.groups()
    port = int(port)
    
    if port != 22:
        decision = 'DENY'
        motif = 'PORT_NON_ADMINISTRATIF'
    elif target == 'PROD':
        if via_b != 'OUI':
            decision = 'DENY'
            motif = 'ACCES_DIRECT_INTERDIT_PASSER_PAR_BASTION'
        elif mfa != 'OUI':
            decision = 'DENY'
            motif = 'MFA_REQUIS'
        else:
            decision = 'PERMIT'
            motif = 'SESSION_BASTION_VALIDEE'
    elif target == 'BASTION':
        if mfa == 'OUI':
            decision = 'PERMIT'
            motif = 'AUTHENTIFICATION_BASTION_OK'
        else:
            decision = 'DENY'
            motif = 'MFA_REQUIS'
    else:
        decision = 'DENY'
        motif = 'PORT_NON_ADMINISTRATIF'
        
    print(f"BASTION_GATEWAY req={rid} decision={decision} motif={motif}")
`
  }
];
