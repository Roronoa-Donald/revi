/**
 * Exercices Chapitre 5 — pfSense & Routage B3.
 * VPNs Sécurisés : OpenVPN (SSL/TLS) & IPsec Site-à-Site.
 */
'use strict';

module.exports = [
  {
    id: 'pf3-c5-e1',
    chapter: 5,
    title: 'Validateur de certificat X.509 et chaîne de confiance PKI OpenVPN',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la validité cryptographique et l\'état de révocation des certificats clients pour le serveur OpenVPN.',
    brief: `<p>Dans pfSense (<em>System &gt; Cert. Manager</em>), l'authentification des clients <strong>OpenVPN</strong> repose sur une Autorité de Certification (CA) interne et une liste de révocation (CRL). Un certificat n'est accepté que s'il est valide temporellement, signé par la CA racine, non révoqué et basé sur une cryptographie robuste.<br><br>
Le script lit sur l'entrée standard :<br>
- La CA de référence :<br>
  <code>CA cn=&lt;nom_ca&gt;</code><br>
- La liste des numéros de série révoqués (CRL) :<br>
  <code>CRL revoked=&lt;serial1,serial2,...|NONE&gt;</code><br>
- L'horodatage courant d'audit :<br>
  <code>TIMESTAMP current=&lt;int&gt;</code><br>
- Les certificats présentés par les clients VPN :<br>
  <code>CERT id=&lt;nom&gt; cn=&lt;nom_client&gt; issuer=&lt;nom_ca&gt; serial=&lt;int&gt; algo=&lt;RSA|ECDSA|DSA&gt; key_len=&lt;int&gt; valid_from=&lt;int&gt; valid_to=&lt;int&gt;</code><br><br>
Règles de validation (ordre de priorité des rejets) :<br>
1. Si <code>issuer != CA.cn</code> : <code>status=REJECTED reason=UNTRUSTED_ISSUER</code>.<br>
2. Si <code>serial</code> est dans la liste <code>revoked</code> : <code>status=REJECTED reason=REVOKED_CERTIFICATE</code>.<br>
3. Si <code>current &lt; valid_from</code> : <code>status=REJECTED reason=NOT_YET_VALID</code>.<br>
4. Si <code>current &gt; valid_to</code> : <code>status=REJECTED reason=EXPIRED_CERTIFICATE</code>.<br>
5. Si <code>algo == 'DSA'</code> : <code>status=REJECTED reason=INSECURE_ALGORITHM</code>.<br>
6. Si <code>algo == 'RSA' et key_len &lt; 2048</code> : <code>status=REJECTED reason=WEAK_KEY_LENGTH</code>.<br>
7. Sinon : <code>status=ACCEPTED reason=VALID_CREDENTIALS</code>.<br><br>
Pour chaque certificat, afficher :<br>
<code>OPENVPN_PKI id={id} status={status} reason={reason} client={cn} serial={serial}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la PKI et vérifier chaque certificat client OpenVPN
`,
    hints: [
      'Stocker les numéros de série révoqués dans un set.',
      'Suivre précisément l\'ordre des vérifications de sécurité.'
    ],
    examples: [
      {
        stdin: 'CA cn=PFSENSE_INTERNAL_CA\nCRL revoked=104,109\nTIMESTAMP current=1700000000\nCERT id=C1 cn=alice issuer=PFSENSE_INTERNAL_CA serial=101 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000\nCERT id=C2 cn=bob issuer=PFSENSE_INTERNAL_CA serial=104 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000\nCERT id=C3 cn=eve issuer=ROGUE_CA serial=200 algo=RSA key_len=4096 valid_from=1690000000 valid_to=1720000000',
        expected: 'OPENVPN_PKI id=C1 status=ACCEPTED reason=VALID_CREDENTIALS client=alice serial=101\nOPENVPN_PKI id=C2 status=REJECTED reason=REVOKED_CERTIFICATE client=bob serial=104\nOPENVPN_PKI id=C3 status=REJECTED reason=UNTRUSTED_ISSUER client=eve serial=200',
        note: 'C1 est accepté, C2 est révoqué dans la CRL, C3 est signé par une autorité non reconnue.'
      }
    ],
    tests: [
      {
        label: 'Certificat expiré ou pas encore valide',
        stdin: 'CA cn=ROOT_CA\nCRL revoked=NONE\nTIMESTAMP current=1700000000\nCERT id=EXP cn=charlie issuer=ROOT_CA serial=110 algo=RSA key_len=2048 valid_from=1600000000 valid_to=1650000000\nCERT id=FUT cn=david issuer=ROOT_CA serial=111 algo=RSA key_len=2048 valid_from=1750000000 valid_to=1800000000',
        expected: 'OPENVPN_PKI id=EXP status=REJECTED reason=EXPIRED_CERTIFICATE client=charlie serial=110\nOPENVPN_PKI id=FUT status=REJECTED reason=NOT_YET_VALID client=david serial=111'
      },
      {
        label: 'Clé RSA faible ou algorithme DSA obsolète',
        stdin: 'CA cn=COMPANY_CA\nCRL revoked=NONE\nTIMESTAMP current=1700000000\nCERT id=WEAK cn=legit issuer=COMPANY_CA serial=120 algo=RSA key_len=1024 valid_from=1690000000 valid_to=1710000000\nCERT id=DSA_LEGACY cn=oldgw issuer=COMPANY_CA serial=121 algo=DSA key_len=1024 valid_from=1690000000 valid_to=1710000000\nCERT id=ECDSA_OK cn=modern issuer=COMPANY_CA serial=122 algo=ECDSA key_len=256 valid_from=1690000000 valid_to=1710000000',
        expected: 'OPENVPN_PKI id=WEAK status=REJECTED reason=WEAK_KEY_LENGTH client=legit serial=120\nOPENVPN_PKI id=DSA_LEGACY status=REJECTED reason=INSECURE_ALGORITHM client=oldgw serial=121\nOPENVPN_PKI id=ECDSA_OK status=ACCEPTED reason=VALID_CREDENTIALS client=modern serial=122'
      },
      {
        label: 'CRL vide avec certificat valide',
        stdin: 'CA cn=TEST_CA\nCRL revoked=NONE\nTIMESTAMP current=1700000000\nCERT id=TEST cn=testuser issuer=TEST_CA serial=999 algo=RSA key_len=4096 valid_from=1600000000 valid_to=1800000000',
        expected: 'OPENVPN_PKI id=TEST status=ACCEPTED reason=VALID_CREDENTIALS client=testuser serial=999'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ca_cn = None
revoked = set()
current_ts = 0

for ligne in lignes:
    if ligne.startswith("CA "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("cn="):
                ca_cn = p.split("=", 1)[1]

    elif ligne.startswith("CRL "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("revoked="):
                raw = p.split("=", 1)[1]
                if raw != "NONE":
                    revoked = {int(x.strip()) for x in raw.split(",") if x.strip()}

    elif ligne.startswith("TIMESTAMP "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("current="):
                current_ts = int(p.split("=", 1)[1])

    elif ligne.startswith("CERT "):
        parts = ligne.split()
        cid = None
        cn = None
        issuer = None
        serial = None
        algo = None
        key_len = None
        valid_from = None
        valid_to = None
        for p in parts[1:]:
            if p.startswith("id="):
                cid = p.split("=", 1)[1]
            elif p.startswith("cn="):
                cn = p.split("=", 1)[1]
            elif p.startswith("issuer="):
                issuer = p.split("=", 1)[1]
            elif p.startswith("serial="):
                serial = int(p.split("=", 1)[1])
            elif p.startswith("algo="):
                algo = p.split("=", 1)[1]
            elif p.startswith("key_len="):
                key_len = int(p.split("=", 1)[1])
            elif p.startswith("valid_from="):
                valid_from = int(p.split("=", 1)[1])
            elif p.startswith("valid_to="):
                valid_to = int(p.split("=", 1)[1])

        if issuer != ca_cn:
            status = "REJECTED"
            reason = "UNTRUSTED_ISSUER"
        elif serial in revoked:
            status = "REJECTED"
            reason = "REVOKED_CERTIFICATE"
        elif current_ts < valid_from:
            status = "REJECTED"
            reason = "NOT_YET_VALID"
        elif current_ts > valid_to:
            status = "REJECTED"
            reason = "EXPIRED_CERTIFICATE"
        elif algo == "DSA":
            status = "REJECTED"
            reason = "INSECURE_ALGORITHM"
        elif algo == "RSA" and key_len < 2048:
            status = "REJECTED"
            reason = "WEAK_KEY_LENGTH"
        else:
            status = "ACCEPTED"
            reason = "VALID_CREDENTIALS"

        print(f"OPENVPN_PKI id={cid} status={status} reason={reason} client={cn} serial={serial}")
`
  },
  {
    id: 'pf3-c5-e2',
    chapter: 5,
    title: 'Validateur de proposition cryptographique IPsec (IKEv2 & ESP)',
    level: 'n2',
    language: 'python',
    goal: 'Auditer la conformité ANSSI/NIST des propositions IKEv2 Phase 1 et Phase 2 dans pfSense.',
    brief: `<p>Lors de l'établissement d'un tunnel VPN <strong>IPsec Site-à-Site</strong>, pfSense négocie les paramètres de chiffrement (IKE Phase 1 et ESP Phase 2). Les algorithmes obsolètes ou cassés (DES, 3DES, MD5, groupes Diffie-Hellman faibles) doivent impérativement être rejetés.<br><br>
Le script lit sur l'entrée standard des propositions cryptographiques :<br>
<code>IKE_PROPOSAL id=&lt;nom&gt; phase=&lt;1|2&gt; enc=&lt;cipher&gt; key_len=&lt;int&gt; hash=&lt;hash&gt; dh_group=&lt;int&gt;</code><br><br>
Règles de validation selon les recommandations ANSSI :<br>
1. Si <code>enc</code> figure parmi <code>DES, 3DES, RC4</code> :<br>
   <code>status=REJECTED reason=INSECURE_CIPHER level=NONE</code>.<br>
2. Si <code>hash</code> figure parmi <code>MD5, SHA1</code> :<br>
   <code>status=REJECTED reason=WEAK_HASH level=NONE</code>.<br>
3. Si <code>dh_group &lt; 14</code> (groupes 1, 2, 5 modp obsolètes) :<br>
   <code>status=REJECTED reason=WEAK_DH_GROUP level=NONE</code>.<br>
4. Si <code>enc in ['AES-CBC', 'AES-GCM'] et key_len &lt; 128</code> :<br>
   <code>status=REJECTED reason=WEAK_KEY_LENGTH level=NONE</code>.<br>
5. Si tous les critères sont satisfaits :<br>
   <code>status=APPROVED reason=NONE</code>.<br>
   Le niveau de sécurité est évalué :<br>
   - Si <code>dh_group &gt;= 19</code> (courbes elliptiques NIST P-256 ou plus) et <code>key_len &gt;= 256</code> : <code>level=HIGH</code>.<br>
   - Sinon : <code>level=STANDARD</code>.<br><br>
Pour chaque proposition, afficher :<br>
<code>IPSEC_AUDIT id={id} phase={phase} status={status} reason={reason} level={level}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la sécurité de chaque proposition IPsec
`,
    hints: [
      'Rejeter en priorité les chiffrements cassés (DES, 3DES, RC4).',
      'Vérifier le groupe DH >= 14 (DH 14 = 2048-bit MODP).'
    ],
    examples: [
      {
        stdin: 'IKE_PROPOSAL id=PROP1 phase=1 enc=AES-GCM key_len=256 hash=SHA384 dh_group=19\nIKE_PROPOSAL id=PROP2 phase=1 enc=3DES key_len=168 hash=SHA256 dh_group=14\nIKE_PROPOSAL id=PROP3 phase=2 enc=AES-CBC key_len=128 hash=MD5 dh_group=14\nIKE_PROPOSAL id=PROP4 phase=1 enc=AES-CBC key_len=128 hash=SHA256 dh_group=14',
        expected: 'IPSEC_AUDIT id=PROP1 phase=1 status=APPROVED reason=NONE level=HIGH\nIPSEC_AUDIT id=PROP2 phase=1 status=REJECTED reason=INSECURE_CIPHER level=NONE\nIPSEC_AUDIT id=PROP3 phase=2 status=REJECTED reason=WEAK_HASH level=NONE\nIPSEC_AUDIT id=PROP4 phase=1 status=APPROVED reason=NONE level=STANDARD',
        note: 'PROP1 est approuvé en niveau HIGH (ECDH 19 + AES 256) ; PROP2 rejette 3DES ; PROP3 rejette MD5 ; PROP4 est standard.'
      }
    ],
    tests: [
      {
        label: 'Rejet du groupe DH 2 obsolète',
        stdin: 'IKE_PROPOSAL id=WEAK_DH phase=1 enc=AES-CBC key_len=256 hash=SHA256 dh_group=2',
        expected: 'IPSEC_AUDIT id=WEAK_DH phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE'
      },
      {
        label: 'Rejet de clé AES trop courte (< 128)',
        stdin: 'IKE_PROPOSAL id=SHORT_KEY phase=2 enc=AES-CBC key_len=64 hash=SHA256 dh_group=14',
        expected: 'IPSEC_AUDIT id=SHORT_KEY phase=2 status=REJECTED reason=WEAK_KEY_LENGTH level=NONE'
      },
      {
        label: 'Validation proposition Phase 2 moderne ChaCha20',
        stdin: 'IKE_PROPOSAL id=CHACHA_MODERN phase=2 enc=CHACHA20-POLY1305 key_len=256 hash=SHA512 dh_group=20',
        expected: 'IPSEC_AUDIT id=CHACHA_MODERN phase=2 status=APPROVED reason=NONE level=HIGH'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("IKE_PROPOSAL "):
        continue
    parts = ligne.split()
    pid = None
    phase = None
    enc = None
    key_len = None
    hsh = None
    dh_group = None
    for p in parts[1:]:
        if p.startswith("id="):
            pid = p.split("=", 1)[1]
        elif p.startswith("phase="):
            phase = int(p.split("=", 1)[1])
        elif p.startswith("enc="):
            enc = p.split("=", 1)[1]
        elif p.startswith("key_len="):
            key_len = int(p.split("=", 1)[1])
        elif p.startswith("hash="):
            hsh = p.split("=", 1)[1]
        elif p.startswith("dh_group="):
            dh_group = int(p.split("=", 1)[1])

    if enc in ["DES", "3DES", "RC4"]:
        status = "REJECTED"
        reason = "INSECURE_CIPHER"
        level = "NONE"
    elif hsh in ["MD5", "SHA1"]:
        status = "REJECTED"
        reason = "WEAK_HASH"
        level = "NONE"
    elif dh_group < 14:
        status = "REJECTED"
        reason = "WEAK_DH_GROUP"
        level = "NONE"
    elif enc in ["AES-CBC", "AES-GCM"] and key_len < 128:
        status = "REJECTED"
        reason = "WEAK_KEY_LENGTH"
        level = "NONE"
    else:
        status = "APPROVED"
        reason = "NONE"
        if dh_group >= 19 and key_len >= 256:
            level = "HIGH"
        else:
            level = "STANDARD"

    print(f"IPSEC_AUDIT id={pid} phase={phase} status={status} reason={reason} level={level}")
`
  },
  {
    id: 'pf3-c5-e3',
    chapter: 5,
    title: 'Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling)',
    level: 'n3',
    language: 'python',
    goal: 'Déterminer la passerelle de sortie pour le trafic client selon la configuration VPN Full ou Split Tunnel.',
    brief: `<p>Dans un déploiement client-à-passerelle (OpenVPN ou IPsec IKEv2 Mobile), le mode de routage détermine le chemin emprunté par les flux du télétravailleur :<br>
- <strong>Full Tunneling (Redirect Gateway) :</strong> <em>tout</em> le trafic (y compris la navigation Internet personnelle) est encapsulé dans le VPN vers le pare-feu central.<br>
- <strong>Split Tunneling :</strong> seuls les sous-réseaux d'entreprise spécifiés passent par le tunnel VPN ; le reste sort directement via la box Internet locale.<br><br>
Le script lit sur l'entrée standard :<br>
- Le mode de fonctionnement VPN :<br>
  <code>VPN_MODE type=&lt;FULL|SPLIT&gt; tunnel_gw=&lt;ip&gt; local_gw=&lt;ip&gt;</code><br>
- Les sous-réseaux d'entreprise déclarés (uniquement actifs en mode SPLIT) :<br>
  <code>ROUTE subnet=&lt;cidr&gt;</code><br>
- Les paquets à acheminer :<br>
  <code>PACKET id=&lt;nom&gt; dst_ip=&lt;ip&gt;</code><br><br>
Règles d'acheminement :<br>
1. Si <code>type == 'FULL'</code> :<br>
   Tous les paquets sont encapsulés vers le tunnel :<br>
   <code>tunnel=YES gw={tunnel_gw} path=TUNNEL_DEFAULT</code><br>
2. Si <code>type == 'SPLIT'</code> :<br>
   Vérifier si <code>dst_ip</code> appartient à au moins un sous-réseau d'entreprise déclaré dans <code>ROUTE</code> (à tester avec le module Python <code>ipaddress</code>) :<br>
   - Si oui :<br>
     <code>tunnel=YES gw={tunnel_gw} path=CORPORATE_ROUTE subnet={matched_subnet}</code><br>
     (en cas d'appartenance à plusieurs sous-réseaux, retenir le premier sous-réseau correspondant dans l'ordre de déclaration).<br>
   - Si non :<br>
     <code>tunnel=NO gw={local_gw} path=DIRECT_INTERNET</code><br><br>
Pour chaque paquet, afficher :<br>
<code>VPN_ROUTE id={id} dst={dst_ip} tunnel={tunnel} gw={gw} path={path}</code></p>`,
    starter: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : lire la configuration VPN et calculer la route de chaque paquet
`,
    hints: [
      'Utiliser ipaddress.ip_network(subnet) et ipaddress.ip_address(dst_ip).',
      'Vérifier `ip in net` pour tester l\'appartenance au sous-réseau.'
    ],
    examples: [
      {
        stdin: 'VPN_MODE type=SPLIT tunnel_gw=10.8.0.1 local_gw=192.168.1.1\nROUTE subnet=10.0.0.0/8\nROUTE subnet=172.16.50.0/24\nPACKET id=P1 dst_ip=10.5.20.1\nPACKET id=P2 dst_ip=8.8.8.8\nPACKET id=P3 dst_ip=172.16.50.10',
        expected: 'VPN_ROUTE id=P1 dst=10.5.20.1 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=10.0.0.0/8\nVPN_ROUTE id=P2 dst=8.8.8.8 tunnel=NO gw=192.168.1.1 path=DIRECT_INTERNET\nVPN_ROUTE id=P3 dst=172.16.50.10 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=172.16.50.0/24',
        note: 'P1 et P3 sont routés dans le tunnel VPN d\'entreprise ; P2 (Google DNS) sort directement par la passerelle locale.'
      }
    ],
    tests: [
      {
        label: 'Mode FULL Tunneling envoyant tout vers la passerelle VPN',
        stdin: 'VPN_MODE type=FULL tunnel_gw=10.200.0.1 local_gw=192.168.0.254\nROUTE subnet=192.168.10.0/24\nPACKET id=P_INT dst_ip=192.168.10.5\nPACKET id=P_WEB dst_ip=142.250.200.46',
        expected: 'VPN_ROUTE id=P_INT dst=192.168.10.5 tunnel=YES gw=10.200.0.1 path=TUNNEL_DEFAULT\nVPN_ROUTE id=P_WEB dst=142.250.200.46 tunnel=YES gw=10.200.0.1 path=TUNNEL_DEFAULT'
      },
      {
        label: 'Mode SPLIT sans aucun réseau correspondant',
        stdin: 'VPN_MODE type=SPLIT tunnel_gw=10.0.0.1 local_gw=192.168.1.254\nROUTE subnet=172.20.0.0/16\nPACKET id=EXT1 dst_ip=1.1.1.1\nPACKET id=EXT2 dst_ip=9.9.9.9',
        expected: 'VPN_ROUTE id=EXT1 dst=1.1.1.1 tunnel=NO gw=192.168.1.254 path=DIRECT_INTERNET\nVPN_ROUTE id=EXT2 dst=9.9.9.9 tunnel=NO gw=192.168.1.254 path=DIRECT_INTERNET'
      },
      {
        label: 'Sous-réseau CIDR /32 spécifique',
        stdin: 'VPN_MODE type=SPLIT tunnel_gw=10.8.0.1 local_gw=192.168.1.1\nROUTE subnet=198.51.100.50/32\nPACKET id=TARGET dst_ip=198.51.100.50\nPACKET id=NEIGHBOR dst_ip=198.51.100.51',
        expected: 'VPN_ROUTE id=TARGET dst=198.51.100.50 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=198.51.100.50/32\nVPN_ROUTE id=NEIGHBOR dst=198.51.100.51 tunnel=NO gw=192.168.1.1 path=DIRECT_INTERNET'
      }
    ],
    solution: `import sys
import ipaddress

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

mode_type = "SPLIT"
tunnel_gw = ""
local_gw = ""
corporate_routes = []

for ligne in lignes:
    if ligne.startswith("VPN_MODE "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("type="):
                mode_type = p.split("=", 1)[1]
            elif p.startswith("tunnel_gw="):
                tunnel_gw = p.split("=", 1)[1]
            elif p.startswith("local_gw="):
                local_gw = p.split("=", 1)[1]

    elif ligne.startswith("ROUTE "):
        parts = ligne.split()
        for p in parts[1:]:
            if p.startswith("subnet="):
                sub = p.split("=", 1)[1]
                corporate_routes.append((sub, ipaddress.ip_network(sub)))

    elif ligne.startswith("PACKET "):
        parts = ligne.split()
        pid = None
        dst_ip = None
        for p in parts[1:]:
            if p.startswith("id="):
                pid = p.split("=", 1)[1]
            elif p.startswith("dst_ip="):
                dst_ip = p.split("=", 1)[1]

        ip_obj = ipaddress.ip_address(dst_ip)

        if mode_type == "FULL":
            tunnel = "YES"
            gw = tunnel_gw
            path = "TUNNEL_DEFAULT"
        else:
            matched_sub = None
            for sub_str, net_obj in corporate_routes:
                if ip_obj in net_obj:
                    matched_sub = sub_str
                    break

            if matched_sub:
                tunnel = "YES"
                gw = tunnel_gw
                path = f"CORPORATE_ROUTE subnet={matched_sub}"
            else:
                tunnel = "NO"
                gw = local_gw
                path = "DIRECT_INTERNET"

        print(f"VPN_ROUTE id={pid} dst={dst_ip} tunnel={tunnel} gw={gw} path={path}")
`
  }
];
