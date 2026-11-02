'use strict';

module.exports = [
  {
    "id": "pf3-c5-e1",
    "chapter": 5,
    "title": "Analyse pédagogique de certificats et de CRL OpenVPN",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les certificats et l'état d'une CRL dans un modèle pédagogique OpenVPN.",
    "brief": [
      "<p>Cette grille est un <strong>modèle pédagogique</strong>, pas une validation de PKI ni une prédiction du comportement d'un serveur OpenVPN réel. L'égalité entre noms d'émetteurs ne vérifie aucune signature, chaîne de confiance ou authentification supplémentaire. Une CRL est facultative et sa publication peut être retardée ; une session déjà établie n'est pas traitée ici.</p>",
      "<p>Chaque cas fournit une autorité <code>CA cn=&lt;nom&gt;</code>, une liste <code>CRL selected=&lt;YES|NO&gt; state=&lt;CURRENT|STALE|MISSING&gt; revoked=&lt;numéros|NONE&gt;</code>, un instant <code>TIMESTAMP current=&lt;int&gt;</code> et des lignes <code>CERT id=&lt;nom&gt; cn=&lt;client&gt; issuer=&lt;nom_ca&gt; serial=&lt;int&gt; algo=&lt;RSA|ECDSA|DSA&gt; key_len=&lt;int&gt; valid_from=&lt;int&gt; valid_to=&lt;int&gt;</code>. Les numéros révoqués sont séparés par des virgules ; <code>NONE</code> signifie qu'aucun numéro n'est fourni, et ne prouve pas qu'une CRL absente ou obsolète est vide.</p>",
      "<p>Dans ce modèle, <code>CURRENT</code> signifie que la CRL pertinente est supposée valide et appliquée ; <code>STALE</code> désigne une liste obsolète ou périmée et <code>MISSING</code> une liste indisponible. Même une liste valide ne renseigne que sur les révocations qui y ont déjà été publiées. <code>INDETERMINATE</code> indique un état de révocation non établi, et non un refus réel : OpenVPN peut se comporter différemment selon sa configuration et sa version.</p>",
      "<p>Appliquer la première règle correspondante, dans cet ordre :</p>",
      "<ol>",
      "<li>Si <code>issuer != CA.cn</code> : <code>status=REJECTED reason=UNTRUSTED_ISSUER</code>.</li>",
      "<li>Si <code>current &lt; valid_from</code> : <code>status=REJECTED reason=NOT_YET_VALID</code> ; si <code>current &gt; valid_to</code> : <code>status=REJECTED reason=EXPIRED_CERTIFICATE</code>.</li>",
      "<li>Si <code>algo == DSA</code> : <code>status=REJECTED reason=INSECURE_ALGORITHM</code> ; si <code>algo == RSA</code> et <code>key_len &lt; 2048</code> : <code>status=REJECTED reason=WEAK_KEY_LENGTH</code>.</li>",
      "<li>Si <code>selected == NO</code> : <code>status=INDETERMINATE reason=CRL_NOT_CONFIGURED</code>.</li>",
      "<li>Si la CRL sélectionnée a l'état <code>MISSING</code> : <code>status=INDETERMINATE reason=CRL_UNAVAILABLE</code> ; si elle a l'état <code>STALE</code> : <code>status=INDETERMINATE reason=CRL_STALE</code>.</li>",
      "<li>Avec une CRL <code>CURRENT</code>, si <code>serial</code> figure dans <code>revoked</code> : <code>status=REJECTED reason=REVOKED_CERTIFICATE</code>. Sinon : <code>status=ACCEPTED reason=VALID_CREDENTIALS</code>, uniquement au regard des données du modèle.</li>",
      "</ol>",
      "<p>Pour chaque certificat, saisir une ligne : <code>OPENVPN_PKI id={id} status={status} reason={reason} client={cn} serial={serial}</code>.</p>"
    ].join("\n"),
    "starter": [
      "# Grille d'analyse (pf3-c5-e1) — Analyse pédagogique de certificats et de CRL OpenVPN",
      "# Complétez la résolution demandée sous chaque cas ci-dessous :",
      "",
      "[Cas 1 — Certificat expiré ou pas encore valide]",
      "# Données : CA cn=ROOT_CA",
      "# Données : CRL selected=YES state=CURRENT revoked=NONE",
      "# Données : TIMESTAMP current=1700000000",
      "# Données : CERT id=EXP cn=charlie issuer=ROOT_CA serial=110 algo=RSA key_len=2048 valid_from=1600000000 valid_to=1650000000",
      "# Données : CERT id=FUT cn=david issuer=ROOT_CA serial=111 algo=RSA key_len=2048 valid_from=1750000000 valid_to=1800000000",
      "A_COMPLETER",
      "",
      "[Cas 2 — Clé RSA faible ou algorithme DSA obsolète]",
      "# Données : CA cn=COMPANY_CA",
      "# Données : CRL selected=YES state=CURRENT revoked=NONE",
      "# Données : TIMESTAMP current=1700000000",
      "# Données : CERT id=WEAK cn=legit issuer=COMPANY_CA serial=120 algo=RSA key_len=1024 valid_from=1690000000 valid_to=1710000000",
      "# Données : CERT id=DSA_LEGACY cn=oldgw issuer=COMPANY_CA serial=121 algo=DSA key_len=1024 valid_from=1690000000 valid_to=1710000000",
      "# Données : CERT id=ECDSA_OK cn=modern issuer=COMPANY_CA serial=122 algo=ECDSA key_len=256 valid_from=1690000000 valid_to=1710000000",
      "A_COMPLETER",
      "",
      "[Cas 3 — CRL appliquée avec certificat révoqué et témoin]",
      "# Données : CA cn=TEST_CA",
      "# Données : CRL selected=YES state=CURRENT revoked=999",
      "# Données : TIMESTAMP current=1700000000",
      "# Données : CERT id=REVOKED cn=testuser issuer=TEST_CA serial=999 algo=RSA key_len=4096 valid_from=1600000000 valid_to=1800000000",
      "# Données : CERT id=GOOD cn=control issuer=TEST_CA serial=1000 algo=RSA key_len=4096 valid_from=1600000000 valid_to=1800000000",
      "A_COMPLETER",
      "",
      "[Cas 4 — CRL non sélectionnée]",
      "# Données : CA cn=TEST_CA",
      "# Données : CRL selected=NO state=MISSING revoked=NONE",
      "# Données : TIMESTAMP current=1700000000",
      "# Données : CERT id=NO_CRL cn=testuser issuer=TEST_CA serial=999 algo=RSA key_len=4096 valid_from=1600000000 valid_to=1800000000",
      "A_COMPLETER",
      "",
      "[Cas 5 — CRL sélectionnée mais obsolète]",
      "# Données : CA cn=TEST_CA",
      "# Données : CRL selected=YES state=STALE revoked=NONE",
      "# Données : TIMESTAMP current=1700000000",
      "# Données : CERT id=STALE_CRL cn=testuser issuer=TEST_CA serial=999 algo=RSA key_len=4096 valid_from=1600000000 valid_to=1800000000",
      "A_COMPLETER",
      "",
      "[Cas 6 — CRL sélectionnée mais indisponible]",
      "# Données : CA cn=TEST_CA",
      "# Données : CRL selected=YES state=MISSING revoked=NONE",
      "# Données : TIMESTAMP current=1700000000",
      "# Données : CERT id=MISSING_CRL cn=testuser issuer=TEST_CA serial=999 algo=RSA key_len=4096 valid_from=1600000000 valid_to=1800000000",
      "A_COMPLETER",
      ""
    ].join("\n"),
    "hints": [
      "Appliquer les rejets connus, puis vérifier la sélection, l'état et le contenu de la CRL.",
      "INDETERMINATE signale une information insuffisante : il ne prédit pas la décision réelle d'OpenVPN."
    ],
    "examples": [
      {
        "stdin": "CA cn=PFSENSE_INTERNAL_CA\nCRL selected=YES state=CURRENT revoked=104,109\nTIMESTAMP current=1700000000\nCERT id=C1 cn=alice issuer=PFSENSE_INTERNAL_CA serial=101 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000\nCERT id=C2 cn=bob issuer=PFSENSE_INTERNAL_CA serial=104 algo=RSA key_len=2048 valid_from=1690000000 valid_to=1720000000\nCERT id=C3 cn=eve issuer=ROGUE_CA serial=200 algo=RSA key_len=4096 valid_from=1690000000 valid_to=1720000000",
        "expected": "OPENVPN_PKI id=C1 status=ACCEPTED reason=VALID_CREDENTIALS client=alice serial=101\nOPENVPN_PKI id=C2 status=REJECTED reason=REVOKED_CERTIFICATE client=bob serial=104\nOPENVPN_PKI id=C3 status=REJECTED reason=UNTRUSTED_ISSUER client=eve serial=200",
        "note": "Dans le modèle, C1 est accepté, C2 figure dans la CRL appliquée et C3 a un nom d'émetteur différent."
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
        "label": "CRL appliquée avec certificat révoqué et témoin",
        "stdin": "cas:3",
        "expected": "OPENVPN_PKI id=REVOKED status=REJECTED reason=REVOKED_CERTIFICATE client=testuser serial=999\nOPENVPN_PKI id=GOOD status=ACCEPTED reason=VALID_CREDENTIALS client=control serial=1000"
      },
      {
        "label": "CRL non sélectionnée",
        "stdin": "cas:4",
        "expected": "OPENVPN_PKI id=NO_CRL status=INDETERMINATE reason=CRL_NOT_CONFIGURED client=testuser serial=999"
      },
      {
        "label": "CRL sélectionnée mais obsolète",
        "stdin": "cas:5",
        "expected": "OPENVPN_PKI id=STALE_CRL status=INDETERMINATE reason=CRL_STALE client=testuser serial=999"
      },
      {
        "label": "CRL sélectionnée mais indisponible",
        "stdin": "cas:6",
        "expected": "OPENVPN_PKI id=MISSING_CRL status=INDETERMINATE reason=CRL_UNAVAILABLE client=testuser serial=999"
      }
    ],
    "solution": [
      "[Exemple]",
      "OPENVPN_PKI id=C1 status=ACCEPTED reason=VALID_CREDENTIALS client=alice serial=101",
      "OPENVPN_PKI id=C2 status=REJECTED reason=REVOKED_CERTIFICATE client=bob serial=104",
      "OPENVPN_PKI id=C3 status=REJECTED reason=UNTRUSTED_ISSUER client=eve serial=200",
      "",
      "[Cas 1 — Certificat expiré ou pas encore valide]",
      "OPENVPN_PKI id=EXP status=REJECTED reason=EXPIRED_CERTIFICATE client=charlie serial=110",
      "OPENVPN_PKI id=FUT status=REJECTED reason=NOT_YET_VALID client=david serial=111",
      "",
      "[Cas 2 — Clé RSA faible ou algorithme DSA obsolète]",
      "OPENVPN_PKI id=WEAK status=REJECTED reason=WEAK_KEY_LENGTH client=legit serial=120",
      "OPENVPN_PKI id=DSA_LEGACY status=REJECTED reason=INSECURE_ALGORITHM client=oldgw serial=121",
      "OPENVPN_PKI id=ECDSA_OK status=ACCEPTED reason=VALID_CREDENTIALS client=modern serial=122",
      "",
      "[Cas 3 — CRL appliquée avec certificat révoqué et témoin]",
      "OPENVPN_PKI id=REVOKED status=REJECTED reason=REVOKED_CERTIFICATE client=testuser serial=999",
      "OPENVPN_PKI id=GOOD status=ACCEPTED reason=VALID_CREDENTIALS client=control serial=1000",
      "",
      "[Cas 4 — CRL non sélectionnée]",
      "OPENVPN_PKI id=NO_CRL status=INDETERMINATE reason=CRL_NOT_CONFIGURED client=testuser serial=999",
      "",
      "[Cas 5 — CRL sélectionnée mais obsolète]",
      "OPENVPN_PKI id=STALE_CRL status=INDETERMINATE reason=CRL_STALE client=testuser serial=999",
      "",
      "[Cas 6 — CRL sélectionnée mais indisponible]",
      "OPENVPN_PKI id=MISSING_CRL status=INDETERMINATE reason=CRL_UNAVAILABLE client=testuser serial=999"
    ].join("\n")
  },
  {
    "id": "pf3-c5-e2",
    "chapter": 5,
    "title": "Classement pédagogique de propositions IKEv2 (IPsec)",
    "level": "n2",
    "language": "analyse",
    "goal": "Classer des propositions IKEv2 selon une politique pédagogique datée, sans présumer de leur compatibilité.",
    "brief": [
      "<p>Cette grille applique une <strong>politique pédagogique version 2026-10-30</strong>, non exhaustive : elle ne démontre ni une conformité ANSSI/NIST ni la sécurité ou la compatibilité d'une configuration réelle. Les identifiants IANA ne sont pas ordonnés par force : 14 est MODP 2048 bits, 19 est P-256, 20 est P-384 et 22 est MODP 1024 bits déprécié. Le groupe 31 (Curve25519) est connu mais hors de cette politique, sans être qualifié de faible.</p>",
      "<p>Pour chaque ligne <code>IKE_PROPOSAL id=&lt;nom&gt; phase=&lt;1|2&gt; enc=&lt;algorithme&gt; key_len=&lt;int&gt; hash=&lt;algorithme&gt; dh_group=&lt;numéro&gt;</code>, <code>phase=1</code> représente l'échange IKE ; <code>phase=2</code> suppose un échange DH supplémentaire configuré pour PFS lors du renouvellement d'un Child SA. Une phase 2 sans PFS est hors de ce modèle. Le premier Child SA IKEv2 utilise le groupe de phase 1. Vérifier dans la réalité les versions et propositions des deux pairs ; le champ <code>hash</code> est un repère simplifié et ne représente pas nécessairement une intégrité ESP distincte pour un mode AEAD.</p>",
      "<p>Appliquer la première règle correspondante :</p>",
      "<ol>",
      "<li>Si <code>enc</code> appartient à <code>DES, 3DES, RC4</code> : <code>status=REJECTED reason=INSECURE_CIPHER level=NONE</code>.</li>",
      "<li>Si <code>hash</code> appartient à <code>MD5, SHA1</code> : <code>status=REJECTED reason=WEAK_HASH level=NONE</code>.</li>",
      "<li>Si <code>dh_group</code> appartient à <code>1, 2, 5, 22, 23, 24</code> : <code>status=REJECTED reason=WEAK_DH_GROUP level=NONE</code>.</li>",
      "<li>Si <code>dh_group</code> n'appartient pas à la liste retenue <code>14, 19, 20</code> : <code>status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE</code>. Cela signifie seulement que le groupe est hors de cette politique, pas qu'il est faible ou interdit partout.</li>",
      "<li>Si <code>enc</code> est <code>AES-CBC</code> ou <code>AES-GCM</code> et <code>key_len &lt; 128</code> : <code>status=REJECTED reason=WEAK_KEY_LENGTH level=NONE</code>.</li>",
      "<li>Sinon : <code>status=APPROVED reason=NONE</code> ; attribuer <code>level=HIGH</code> uniquement si <code>dh_group</code> vaut 19 ou 20 et <code>key_len &gt;= 256</code>, sinon <code>level=STANDARD</code>. Ces niveaux sont des étiquettes du modèle, pas une mesure de force ni une garantie réelle.</li>",
      "</ol>",
      "<p>Pour chaque proposition, saisir une ligne : <code>IPSEC_AUDIT id={id} phase={phase} status={status} reason={reason} level={level}</code>.</p>"
    ].join("\n"),
    "starter": [
      "# Grille d'analyse (pf3-c5-e2) — Classement pédagogique de propositions IKEv2 (IPsec)",
      "# Complétez la résolution demandée sous chaque cas ci-dessous :",
      "",
      "[Cas 1 — Groupes déconseillés ou dépréciés]",
      "# Données : IKE_PROPOSAL id=WEAK_DH2 phase=1 enc=AES-CBC key_len=256 hash=SHA256 dh_group=2",
      "# Données : IKE_PROPOSAL id=WEAK_DH22 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=22",
      "# Données : IKE_PROPOSAL id=WEAK_DH23 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=23",
      "# Données : IKE_PROPOSAL id=WEAK_DH24 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=24",
      "A_COMPLETER",
      "",
      "[Cas 2 — Groupes hors de cette politique]",
      "# Données : IKE_PROPOSAL id=GROUP15 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=15",
      "# Données : IKE_PROPOSAL id=GROUP21 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=21",
      "# Données : IKE_PROPOSAL id=GROUP31 phase=2 enc=AES-GCM key_len=256 hash=SHA256 dh_group=31",
      "A_COMPLETER",
      "",
      "[Cas 3 — Limites de clé et niveau standard]",
      "# Données : IKE_PROPOSAL id=SHORT_KEY phase=2 enc=AES-CBC key_len=64 hash=SHA256 dh_group=14",
      "# Données : IKE_PROPOSAL id=MODP14 phase=1 enc=AES-CBC key_len=256 hash=SHA256 dh_group=14",
      "# Données : IKE_PROPOSAL id=ECP19_128 phase=1 enc=AES-GCM key_len=128 hash=SHA256 dh_group=19",
      "A_COMPLETER",
      "",
      "[Cas 4 — Niveau pédagogique HIGH sur groupes retenus]",
      "# Données : IKE_PROPOSAL id=ECP19_256 phase=1 enc=AES-GCM key_len=256 hash=SHA384 dh_group=19",
      "# Données : IKE_PROPOSAL id=ECP20_256 phase=1 enc=AES-CBC key_len=256 hash=SHA384 dh_group=20",
      "# Données : IKE_PROPOSAL id=CHACHA_MODERN phase=2 enc=CHACHA20-POLY1305 key_len=256 hash=SHA512 dh_group=20",
      "A_COMPLETER",
      ""
    ].join("\n"),
    "hints": [
      "Appliquer les règles dans l'ordre, puis comparer le groupe à la liste explicite.",
      "Un groupe hors politique, comme 31, n'est pas automatiquement faible ; HIGH est une étiquette pédagogique."
    ],
    "examples": [
      {
        "stdin": "IKE_PROPOSAL id=PROP1 phase=1 enc=AES-GCM key_len=256 hash=SHA384 dh_group=19\nIKE_PROPOSAL id=PROP2 phase=1 enc=3DES key_len=168 hash=SHA256 dh_group=14\nIKE_PROPOSAL id=PROP3 phase=2 enc=AES-CBC key_len=128 hash=MD5 dh_group=14\nIKE_PROPOSAL id=PROP4 phase=1 enc=AES-CBC key_len=128 hash=SHA256 dh_group=14\nIKE_PROPOSAL id=PROP5 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=22\nIKE_PROPOSAL id=PROP6 phase=1 enc=AES-GCM key_len=256 hash=SHA256 dh_group=31",
        "expected": "IPSEC_AUDIT id=PROP1 phase=1 status=APPROVED reason=NONE level=HIGH\nIPSEC_AUDIT id=PROP2 phase=1 status=REJECTED reason=INSECURE_CIPHER level=NONE\nIPSEC_AUDIT id=PROP3 phase=2 status=REJECTED reason=WEAK_HASH level=NONE\nIPSEC_AUDIT id=PROP4 phase=1 status=APPROVED reason=NONE level=STANDARD\nIPSEC_AUDIT id=PROP5 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE\nIPSEC_AUDIT id=PROP6 phase=1 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE",
        "note": "PROP1 et PROP4 sont classés selon le modèle ; PROP2 et PROP3 utilisent des algorithmes écartés ; PROP5 utilise le groupe 22 déprécié et PROP6 est seulement hors de la politique retenue."
      }
    ],
    "tests": [
      {
        "label": "Groupes déconseillés ou dépréciés",
        "stdin": "cas:1",
        "expected": "IPSEC_AUDIT id=WEAK_DH2 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE\nIPSEC_AUDIT id=WEAK_DH22 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE\nIPSEC_AUDIT id=WEAK_DH23 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE\nIPSEC_AUDIT id=WEAK_DH24 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE"
      },
      {
        "label": "Groupes hors de cette politique",
        "stdin": "cas:2",
        "expected": "IPSEC_AUDIT id=GROUP15 phase=1 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE\nIPSEC_AUDIT id=GROUP21 phase=1 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE\nIPSEC_AUDIT id=GROUP31 phase=2 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE"
      },
      {
        "label": "Limites de clé et niveau standard",
        "stdin": "cas:3",
        "expected": "IPSEC_AUDIT id=SHORT_KEY phase=2 status=REJECTED reason=WEAK_KEY_LENGTH level=NONE\nIPSEC_AUDIT id=MODP14 phase=1 status=APPROVED reason=NONE level=STANDARD\nIPSEC_AUDIT id=ECP19_128 phase=1 status=APPROVED reason=NONE level=STANDARD"
      },
      {
        "label": "Niveau pédagogique HIGH sur groupes retenus",
        "stdin": "cas:4",
        "expected": "IPSEC_AUDIT id=ECP19_256 phase=1 status=APPROVED reason=NONE level=HIGH\nIPSEC_AUDIT id=ECP20_256 phase=1 status=APPROVED reason=NONE level=HIGH\nIPSEC_AUDIT id=CHACHA_MODERN phase=2 status=APPROVED reason=NONE level=HIGH"
      }
    ],
    "solution": [
      "[Exemple]",
      "IPSEC_AUDIT id=PROP1 phase=1 status=APPROVED reason=NONE level=HIGH",
      "IPSEC_AUDIT id=PROP2 phase=1 status=REJECTED reason=INSECURE_CIPHER level=NONE",
      "IPSEC_AUDIT id=PROP3 phase=2 status=REJECTED reason=WEAK_HASH level=NONE",
      "IPSEC_AUDIT id=PROP4 phase=1 status=APPROVED reason=NONE level=STANDARD",
      "IPSEC_AUDIT id=PROP5 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE",
      "IPSEC_AUDIT id=PROP6 phase=1 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE",
      "",
      "[Cas 1 — Groupes déconseillés ou dépréciés]",
      "IPSEC_AUDIT id=WEAK_DH2 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE",
      "IPSEC_AUDIT id=WEAK_DH22 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE",
      "IPSEC_AUDIT id=WEAK_DH23 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE",
      "IPSEC_AUDIT id=WEAK_DH24 phase=1 status=REJECTED reason=WEAK_DH_GROUP level=NONE",
      "",
      "[Cas 2 — Groupes hors de cette politique]",
      "IPSEC_AUDIT id=GROUP15 phase=1 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE",
      "IPSEC_AUDIT id=GROUP21 phase=1 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE",
      "IPSEC_AUDIT id=GROUP31 phase=2 status=REJECTED reason=NOT_IN_POLICY_GROUP level=NONE",
      "",
      "[Cas 3 — Limites de clé et niveau standard]",
      "IPSEC_AUDIT id=SHORT_KEY phase=2 status=REJECTED reason=WEAK_KEY_LENGTH level=NONE",
      "IPSEC_AUDIT id=MODP14 phase=1 status=APPROVED reason=NONE level=STANDARD",
      "IPSEC_AUDIT id=ECP19_128 phase=1 status=APPROVED reason=NONE level=STANDARD",
      "",
      "[Cas 4 — Niveau pédagogique HIGH sur groupes retenus]",
      "IPSEC_AUDIT id=ECP19_256 phase=1 status=APPROVED reason=NONE level=HIGH",
      "IPSEC_AUDIT id=ECP20_256 phase=1 status=APPROVED reason=NONE level=HIGH",
      "IPSEC_AUDIT id=CHACHA_MODERN phase=2 status=APPROVED reason=NONE level=HIGH"
    ].join("\n")
  },
  {
    "id": "pf3-c5-e3",
    "chapter": 5,
    "title": "Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling)",
    "level": "n3",
    "language": "analyse",
    "goal": "Déterminer la passerelle de sortie pour le trafic client selon la configuration VPN Full ou Split Tunnel.",
    "brief": "<p>Dans un déploiement client-à-passerelle (OpenVPN ou IPsec IKEv2 Mobile), le mode de routage détermine le chemin emprunté par les flux du télétravailleur :<br>\n- <strong>Full Tunneling (Redirect Gateway) :</strong> <em>tout</em> le trafic (y compris la navigation Internet personnelle) est encapsulé dans le VPN vers le pare-feu central.<br>\n- <strong>Split Tunneling :</strong> seuls les sous-réseaux d'entreprise spécifiés passent par le tunnel VPN ; le reste sort directement via la box Internet locale.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Si <code>type == 'FULL'</code> :<br>\n   Tous les paquets sont encapsulés vers le tunnel :<br>\n   <code>tunnel=YES gw={tunnel_gw} path=TUNNEL_DEFAULT</code><br>\n2. Si <code>type == 'SPLIT'</code> :<br>\n   Vérifier si <code>dst_ip</code> appartient à au moins un sous-réseau d'entreprise déclaré dans <code>ROUTE</code> (en vérifiant l’appartenance de l’adresse au sous-réseau CIDR) :<br>\n   - Si oui :<br>\n     <code>tunnel=YES gw={tunnel_gw} path=CORPORATE_ROUTE subnet={matched_subnet}</code><br>\n     (en cas d'appartenance à plusieurs sous-réseaux, retenir le premier sous-réseau correspondant dans l'ordre de déclaration).<br>\n   - Si non :<br>\n     <code>tunnel=NO gw={local_gw} path=DIRECT_INTERNET</code><br><br>\nPour chaque paquet, afficher :<br>\n<code>VPN_ROUTE id={id} dst={dst_ip} tunnel={tunnel} gw={gw} path={path}</code></p>",
    "starter": "# Grille d'analyse (pf3-c5-e3) — Calculateur de routage de tunnel VPN (Split Tunneling vs Full Tunneling)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode FULL Tunneling envoyant tout vers la passerelle VPN]\n# Données : VPN_MODE type=FULL tunnel_gw=10.200.0.1 local_gw=192.168.0.254\n# Données : ROUTE subnet=192.168.10.0/24\n# Données : PACKET id=P_INT dst_ip=192.168.10.5\n# Données : PACKET id=P_WEB dst_ip=142.250.200.46\nA_COMPLETER\n\n[Cas 2 — Mode SPLIT sans aucun réseau correspondant]\n# Données : VPN_MODE type=SPLIT tunnel_gw=10.0.0.1 local_gw=192.168.1.254\n# Données : ROUTE subnet=172.20.0.0/16\n# Données : PACKET id=EXT1 dst_ip=1.1.1.1\n# Données : PACKET id=EXT2 dst_ip=9.9.9.9\nA_COMPLETER\n\n[Cas 3 — Sous-réseau CIDR /32 spécifique]\n# Données : VPN_MODE type=SPLIT tunnel_gw=10.8.0.1 local_gw=192.168.1.1\n# Données : ROUTE subnet=198.51.100.50/32\n# Données : PACKET id=TARGET dst_ip=198.51.100.50\n# Données : PACKET id=NEIGHBOR dst_ip=198.51.100.51\nA_COMPLETER\n",
    "hints": [
      "Utiliser la notation CIDR du réseau et la notation CIDR du réseau.",
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
