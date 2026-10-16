'use strict';

module.exports = [
  {
    "id": "pf3-c5-e1",
    "chapter": 5,
    "title": "Validateur de certificat X.509 et chaîne de confiance PKI OpenVPN",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la validité cryptographique et l'état de révocation des certificats clients pour le serveur OpenVPN.",
    "brief": "<p>Dans pfSense (<em>System &gt; Cert. Manager</em>), l'authentification des clients <strong>OpenVPN</strong> repose sur une Autorité de Certification (CA) interne et une liste de révocation (CRL). Un certificat n'est accepté que s'il est valide temporellement, signé par la CA racine, non révoqué et basé sur une cryptographie robuste.<br><br>\nAnalysez les paramètres du problème pour chaque cas...|NONE&gt;</code><br>\n- L'horodatage courant d'audit :<br>\n  <code>TIMESTAMP current=&lt;int&gt;</code><br>\n- Les certificats présentés par les clients VPN :<br>\n  <code>CERT id=&lt;nom&gt; cn=&lt;nom_client&gt; issuer=&lt;nom_ca&gt; serial=&lt;int&gt; algo=&lt;RSA|ECDSA|DSA&gt; key_len=&lt;int&gt; valid_from=&lt;int&gt; valid_to=&lt;int&gt;</code><br><br>\nRègles de validation (ordre de priorité des rejets) :<br>\n1. Si <code>issuer != CA.cn</code> : <code>status=REJECTED reason=UNTRUSTED_ISSUER</code>.<br>\n2. Si <code>serial</code> est dans la liste <code>revoked</code> : <code>status=REJECTED reason=REVOKED_CERTIFICATE</code>.<br>\n3. Si <code>current &lt; valid_from</code> : <code>status=REJECTED reason=NOT_YET_VALID</code>.<br>\n4. Si <code>current &gt; valid_to</code> : <code>status=REJECTED reason=EXPIRED_CERTIFICATE</code>.<br>\n5. Si <code>algo == 'DSA'</code> : <code>status=REJECTED reason=INSECURE_ALGORITHM</code>.<br>\n6. Si <code>algo == 'RSA' et key_len &lt; 2048</code> : <code>status=REJECTED reason=WEAK_KEY_LENGTH</code>.<br>\n7. Sinon : <code>status=ACCEPTED reason=VALID_CREDENTIALS</code>.<br><br>\nPour chaque certificat, afficher :<br>\n<code>OPENVPN_PKI id={id} status={status} reason={reason} client={cn} serial={serial}</code></p>",
    "starter": "# Grille d'analyse (pf3-c5-e1) — Validateur de certificat X.509 et chaîne de confiance PKI OpenVPN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Certificat expiré ou pas encore valide]\n# Données : CA cn=ROOT_CA\n# Données : CRL revoked=NONE\n# Données : TIMESTAMP current=1700000000\n# Données : CERT id=EXP cn=charlie issuer=ROOT_CA serial=110 algo=RSA key_len=2048 valid_from=1600000000 valid_to=1650000000\n# Données : CERT id=FUT cn=david issuer=ROOT_CA serial=111 algo=RSA key_len=2048 valid_from=1750000000 valid_to=1800000000\nA_COMPLETER\n\n[Cas 2 — Clé RSA faible ou algorithme DSA obsolète]\n# Données : CA cn=COMPANY_CA\n# Données : CRL revoked=NONE\n# Données : TIMESTAMP current=1700000000\n# Données : CERT id=WEAK cn=legit issuer=COMPANY_CA serial=120 algo=RSA key_len=1024 valid_from=1690000000 valid_to=1710000000\n# Données : CERT id=DSA_LEGACY cn=oldgw issuer=COMPANY_CA serial=121 algo=DSA key_len=1024 valid_from=1690000000 valid_to=1710000000\n# Données : CERT id=ECDSA_OK cn=modern issuer=COMPANY_CA serial=122 algo=ECDSA key_len=256 valid_from=1690000000 valid_to=1710000000\nA_COMPLETER\n\n[Cas 3 — CRL vide avec certificat valide]\n# Données : CA cn=TEST_CA\n# Données : CRL revoked=NONE\n# Données : TIMESTAMP current=1700000000\n# Données : CERT id=TEST cn=testuser issuer=TEST_CA serial=999 algo=RSA key_len=4096 valid_from=1600000000 valid_to=1800000000\nA_COMPLETER\n",
    "hints": [
      "Stocker les numéros de série révoqués dans un set.",
      "Suivre précisément l'ordre des vérifications de sécurité."
    ],
    "examples": [
      {
        "stdin": "CA cn=PFSENSE_INTERNAL_CA\nCRL revoked=104,109\nTIMESTAMP current=1700000000\nCERT id=C1 cn=alice issuer=PFSENSE_INTERNAL_CA serial=101 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000\nCERT id=C2 cn=bob issuer=PFSENSE_INTERNAL_CA serial=104 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000\nCERT id=C3 cn=eve issuer=ROGUE_CA serial=200 algo=RSA key_len=4096 valid_from=1690000000 valid_to=1720000000",
        "expected": "OPENVPN_PKI id=C1 status=ACCEPTED reason=VALID_CREDENTIALS client=alice serial=101\nOPENVPN_PKI id=C2 status=REJECTED reason=REVOKED_CERTIFICATE client=bob serial=104\nOPENVPN_PKI id=C3 status=REJECTED reason=UNTRUSTED_ISSUER client=eve serial=200",
        "note": "C1 est accepté, C2 est révoqué dans la CRL, C3 est signé par une autorité non reconnue."
      }
    ],
    "tests": [
      {
        "label": "Certificat expiré ou pas encore valide",
        "stdin": "cas:1",
        "expected": "OPENVPN_PKI id=EXP status=REJECTED reason=EXPIRED_CERTIFICATE client=charlie serial=110\nOPENVPN_PKI id=FUT status=REJECTED reason=NOT_YET_VALID client=david serial=111"
      },
      {
        "label": "Clé RSA faible ou algorithme DSA obsolète",
        "stdin": "cas:2",
        "expected": "OPENVPN_PKI id=WEAK status=REJECTED reason=WEAK_KEY_LENGTH client=legit serial=120\nOPENVPN_PKI id=DSA_LEGACY status=REJECTED reason=INSECURE_ALGORITHM client=oldgw serial=121\nOPENVPN_PKI id=ECDSA_OK status=ACCEPTED reason=VALID_CREDENTIALS client=modern serial=122"
      },
      {
        "label": "CRL vide avec certificat valide",
        "stdin": "cas:3",
        "expected": "OPENVPN_PKI id=TEST status=ACCEPTED reason=VALID_CREDENTIALS client=testuser serial=999"
      }
    ],
    "solution": "[Exemple]\nOPENVPN_PKI id=C1 status=ACCEPTED reason=VALID_CREDENTIALS client=alice serial=101\nOPENVPN_PKI id=C2 status=REJECTED reason=REVOKED_CERTIFICATE client=bob serial=104\nOPENVPN_PKI id=C3 status=REJECTED reason=UNTRUSTED_ISSUER client=eve serial=200\n\n[Cas 1 — Certificat expiré ou pas encore valide]\nOPENVPN_PKI id=EXP status=REJECTED reason=EXPIRED_CERTIFICATE client=charlie serial=110\nOPENVPN_PKI id=FUT status=REJECTED reason=NOT_YET_VALID client=david serial=111\n\n[Cas 2 — Clé RSA faible ou algorithme DSA obsolète]\nOPENVPN_PKI id=WEAK status=REJECTED reason=WEAK_KEY_LENGTH client=legit serial=120\nOPENVPN_PKI id=DSA_LEGACY status=REJECTED reason=INSECURE_ALGORITHM client=oldgw serial=121\nOPENVPN_PKI id=ECDSA_OK status=ACCEPTED reason=VALID_CREDENTIALS client=modern serial=122\n\n[Cas 3 — CRL vide avec certificat valide]\nOPENVPN_PKI id=TEST status=ACCEPTED reason=VALID_CREDENTIALS client=testuser serial=999"
  },
  {
    "id": "pf3-c5-e2",
    "chapter": 5,
    "title": "Validateur de proposition cryptographique IPsec (IKEv2 & ESP)",
    "level": "n2",
    "language": "analyse",
    "goal": "Auditer la conformité ANSSI/NIST des propositions IKEv2 Phase 1 et Phase 2 dans pfSense.",
    "brief": "<p>Lors de l'établissement d'un tunnel VPN <strong>IPsec Site-à-Site</strong>, pfSense négocie les paramètres de chiffrement (IKE Phase 1 et ESP Phase 2). Les algorithmes obsolètes ou cassés (DES, 3DES, MD5, groupes Diffie-Hellman faibles) doivent impérativement être rejetés.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si <code>enc</code> figure parmi <code>DES, 3DES, RC4</code> :<br>\n   <code>status=REJECTED reason=INSECURE_CIPHER level=NONE</code>.<br>\n2. Si <code>hash</code> figure parmi <code>MD5, SHA1</code> :<br>\n   <code>status=REJECTED reason=WEAK_HASH level=NONE</code>.<br>\n3. Si <code>dh_group &lt; 14</code> (groupes 1, 2, 5 modp obsolètes) :<br>\n   <code>status=REJECTED reason=WEAK_DH_GROUP level=NONE</code>.<br>\n4. Si <code>enc in ['AES-CBC', 'AES-GCM'] et key_len &lt; 128</code> :<br>\n   <code>status=REJECTED reason=WEAK_KEY_LENGTH level=NONE</code>.<br>\n5. Si tous les critères sont satisfaits :<br>\n   <code>status=APPROVED reason=NONE</code>.<br>\n   Le niveau de sécurité est évalué :<br>\n   - Si <code>dh_group &gt;= 19</code> (courbes elliptiques NIST P-256 ou plus) et <code>key_len &gt;= 256</code> : <code>level=HIGH</code>.<br>\n   - Sinon : <code>level=STANDARD</code>.<br><br>\nPour chaque proposition, afficher :<br>\n<code>IPSEC_AUDIT id={id} phase={phase} status={status} reason={reason} level={level}</code></p>",
    "starter": "# Grille d'analyse (pf3-c5-e2) — Validateur de proposition cryptographique IPsec (IKEv2 & ESP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet du groupe DH 2 obsolète]\n# Données : IKE_PROPOSAL id=WEAK_DH phase=1 enc=AES-CBC key_len=256 hash=SHA256 dh_group=2\nA_COMPLETER\n\n[Cas 2 — Rejet de clé AES trop courte (< 128)]\n# Données : IKE_PROPOSAL id=SHORT_KEY phase=2 enc=AES-CBC key_len=64 hash=SHA256 dh_group=14\nA_COMPLETER\n\n[Cas 3 — Validation proposition Phase 2 moderne ChaCha20]\n# Données : IKE_PROPOSAL id=CHACHA_MODERN phase=2 enc=CHACHA20-POLY1305 key_len=256 hash=SHA512 dh_group=20\nA_COMPLETER\n",
    "hints": [
      "Rejeter en priorité les chiffrements cassés (DES, 3DES, RC4).",
      "Vérifier le groupe DH >= 14 (DH 14 = 2048-bit MODP)."
    ],
    "examples": [
      {
        "stdin": "IKE_PROPOSAL id=PROP1 phase=1 enc=AES-GCM key_len=256 hash=SHA384 dh_group=19\nIKE_PROPOSAL id=PROP2 phase=1 enc=3DES key_len=168 hash=SHA256 dh_group=14\nIKE_PROPOSAL id=PROP3 phase=2 enc=AES-CBC key_len=128 hash=MD5 dh_group=14\nIKE_PROPOSAL id=PROP4 phase=1 enc=AES-CBC key_len=128 hash=SHA256 dh_group=14",
        "expected": "IPSEC_AUDIT id=PROP1 phase=1 status=APPROVED reason=NONE level=HIGH\nIPSEC_AUDIT id=PROP2 phase=1 status=REJECTED reason=INSECURE_CIPHER level=NONE\nIPSEC_AUDIT id=PROP3 phase=2 status=REJECTED reason=WEAK_HASH level=NONE\nIPSEC_AUDIT id=PROP4 phase=1 status=APPROVED reason=NONE level=STANDARD",
        "note": "PROP1 est approuvé en niveau HIGH (ECDH 19 + AES 256) ; PROP2 rejette 3DES ; PROP3 rejette MD5 ; PROP4 est standard."
      }
    ],
    "tests": [
      {
        "label": "Rejet du groupe DH 2 obsolète",
        "stdin": "cas:1",
        "expected": "IPSEC_AUDIT id=WEAK_DH phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE"
      },
      {
        "label": "Rejet de clé AES trop courte (< 128)",
        "stdin": "cas:2",
        "expected": "IPSEC_AUDIT id=SHORT_KEY phase=2 status=REJECTED reason=WEAK_KEY_LENGTH level=NONE"
      },
      {
        "label": "Validation proposition Phase 2 moderne ChaCha20",
        "stdin": "cas:3",
        "expected": "IPSEC_AUDIT id=CHACHA_MODERN phase=2 status=APPROVED reason=NONE level=HIGH"
      }
    ],
    "solution": "[Exemple]\nIPSEC_AUDIT id=PROP1 phase=1 status=APPROVED reason=NONE level=HIGH\nIPSEC_AUDIT id=PROP2 phase=1 status=REJECTED reason=INSECURE_CIPHER level=NONE\nIPSEC_AUDIT id=PROP3 phase=2 status=REJECTED reason=WEAK_HASH level=NONE\nIPSEC_AUDIT id=PROP4 phase=1 status=APPROVED reason=NONE level=STANDARD\n\n[Cas 1 — Rejet du groupe DH 2 obsolète]\nIPSEC_AUDIT id=WEAK_DH phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE\n\n[Cas 2 — Rejet de clé AES trop courte (< 128)]\nIPSEC_AUDIT id=SHORT_KEY phase=2 status=REJECTED reason=WEAK_KEY_LENGTH level=NONE\n\n[Cas 3 — Validation proposition Phase 2 moderne ChaCha20]\nIPSEC_AUDIT id=CHACHA_MODERN phase=2 status=APPROVED reason=NONE level=HIGH"
  },
  {
    "id": "pf3-c5-e3",
    "chapter": 5,
    "title": "Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling)",
    "level": "n3",
    "language": "analyse",
    "goal": "Déterminer la passerelle de sortie pour le trafic client selon la configuration VPN Full ou Split Tunnel.",
    "brief": "<p>Dans un déploiement client-à-passerelle (OpenVPN ou IPsec IKEv2 Mobile), le mode de routage détermine le chemin emprunté par les flux du télétravailleur :<br>\n- <strong>Full Tunneling (Redirect Gateway) :</strong> <em>tout</em> le trafic (y compris la navigation Internet personnelle) est encapsulé dans le VPN vers le pare-feu central.<br>\n- <strong>Split Tunneling :</strong> seuls les sous-réseaux d'entreprise spécifiés passent par le tunnel VPN ; le reste sort directement via la box Internet locale.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si <code>type == 'FULL'</code> :<br>\n   Tous les paquets sont encapsulés vers le tunnel :<br>\n   <code>tunnel=YES gw={tunnel_gw} path=TUNNEL_DEFAULT</code><br>\n2. Si <code>type == 'SPLIT'</code> :<br>\n   Vérifier si <code>dst_ip</code> appartient à au moins un sous-réseau d'entreprise déclaré dans <code>ROUTE</code> (à tester avec le module Python <code>ipaddress</code>) :<br>\n   - Si oui :<br>\n     <code>tunnel=YES gw={tunnel_gw} path=CORPORATE_ROUTE subnet={matched_subnet}</code><br>\n     (en cas d'appartenance à plusieurs sous-réseaux, retenir le premier sous-réseau correspondant dans l'ordre de déclaration).<br>\n   - Si non :<br>\n     <code>tunnel=NO gw={local_gw} path=DIRECT_INTERNET</code><br><br>\nPour chaque paquet, afficher :<br>\n<code>VPN_ROUTE id={id} dst={dst_ip} tunnel={tunnel} gw={gw} path={path}</code></p>",
    "starter": "# Grille d'analyse (pf3-c5-e3) — Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode FULL Tunneling envoyant tout vers la passerelle VPN]\n# Données : VPN_MODE type=FULL tunnel_gw=10.200.0.1 local_gw=192.168.0.254\n# Données : ROUTE subnet=192.168.10.0/24\n# Données : PACKET id=P_INT dst_ip=192.168.10.5\n# Données : PACKET id=P_WEB dst_ip=142.250.200.46\nA_COMPLETER\n\n[Cas 2 — Mode SPLIT sans aucun réseau correspondant]\n# Données : VPN_MODE type=SPLIT tunnel_gw=10.0.0.1 local_gw=192.168.1.254\n# Données : ROUTE subnet=172.20.0.0/16\n# Données : PACKET id=EXT1 dst_ip=1.1.1.1\n# Données : PACKET id=EXT2 dst_ip=9.9.9.9\nA_COMPLETER\n\n[Cas 3 — Sous-réseau CIDR /32 spécifique]\n# Données : VPN_MODE type=SPLIT tunnel_gw=10.8.0.1 local_gw=192.168.1.1\n# Données : ROUTE subnet=198.51.100.50/32\n# Données : PACKET id=TARGET dst_ip=198.51.100.50\n# Données : PACKET id=NEIGHBOR dst_ip=198.51.100.51\nA_COMPLETER\n",
    "hints": [
      "Utiliser ipaddress.ip_network(subnet) et ipaddress.ip_address(dst_ip).",
      "Vérifier `ip in net` pour tester l'appartenance au sous-réseau."
    ],
    "examples": [
      {
        "stdin": "VPN_MODE type=SPLIT tunnel_gw=10.8.0.1 local_gw=192.168.1.1\nROUTE subnet=10.0.0.0/8\nROUTE subnet=172.16.50.0/24\nPACKET id=P1 dst_ip=10.5.20.1\nPACKET id=P2 dst_ip=8.8.8.8\nPACKET id=P3 dst_ip=172.16.50.10",
        "expected": "VPN_ROUTE id=P1 dst=10.5.20.1 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=10.0.0.0/8\nVPN_ROUTE id=P2 dst=8.8.8.8 tunnel=NO gw=192.168.1.1 path=DIRECT_INTERNET\nVPN_ROUTE id=P3 dst=172.16.50.10 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=172.16.50.0/24",
        "note": "P1 et P3 sont routés dans le tunnel VPN d'entreprise ; P2 (Google DNS) sort directement par la passerelle locale."
      }
    ],
    "tests": [
      {
        "label": "Mode FULL Tunneling envoyant tout vers la passerelle VPN",
        "stdin": "cas:1",
        "expected": "VPN_ROUTE id=P_INT dst=192.168.10.5 tunnel=YES gw=10.200.0.1 path=TUNNEL_DEFAULT\nVPN_ROUTE id=P_WEB dst=142.250.200.46 tunnel=YES gw=10.200.0.1 path=TUNNEL_DEFAULT"
      },
      {
        "label": "Mode SPLIT sans aucun réseau correspondant",
        "stdin": "cas:2",
        "expected": "VPN_ROUTE id=EXT1 dst=1.1.1.1 tunnel=NO gw=192.168.1.254 path=DIRECT_INTERNET\nVPN_ROUTE id=EXT2 dst=9.9.9.9 tunnel=NO gw=192.168.1.254 path=DIRECT_INTERNET"
      },
      {
        "label": "Sous-réseau CIDR /32 spécifique",
        "stdin": "cas:3",
        "expected": "VPN_ROUTE id=TARGET dst=198.51.100.50 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=198.51.100.50/32\nVPN_ROUTE id=NEIGHBOR dst=198.51.100.51 tunnel=NO gw=192.168.1.1 path=DIRECT_INTERNET"
      }
    ],
    "solution": "[Exemple]\nVPN_ROUTE id=P1 dst=10.5.20.1 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=10.0.0.0/8\nVPN_ROUTE id=P2 dst=8.8.8.8 tunnel=NO gw=192.168.1.1 path=DIRECT_INTERNET\nVPN_ROUTE id=P3 dst=172.16.50.10 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=172.16.50.0/24\n\n[Cas 1 — Mode FULL Tunneling envoyant tout vers la passerelle VPN]\nVPN_ROUTE id=P_INT dst=192.168.10.5 tunnel=YES gw=10.200.0.1 path=TUNNEL_DEFAULT\nVPN_ROUTE id=P_WEB dst=142.250.200.46 tunnel=YES gw=10.200.0.1 path=TUNNEL_DEFAULT\n\n[Cas 2 — Mode SPLIT sans aucun réseau correspondant]\nVPN_ROUTE id=EXT1 dst=1.1.1.1 tunnel=NO gw=192.168.1.254 path=DIRECT_INTERNET\nVPN_ROUTE id=EXT2 dst=9.9.9.9 tunnel=NO gw=192.168.1.254 path=DIRECT_INTERNET\n\n[Cas 3 — Sous-réseau CIDR /32 spécifique]\nVPN_ROUTE id=TARGET dst=198.51.100.50 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=198.51.100.50/32\nVPN_ROUTE id=NEIGHBOR dst=198.51.100.51 tunnel=NO gw=192.168.1.1 path=DIRECT_INTERNET"
  }
];
