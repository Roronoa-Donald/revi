'use strict';

module.exports = [
  {
    "id": "cr3-c6-e1",
    "chapter": 6,
    "title": "Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une suite et les paramètres TLS négociés sans déduire la PFS du seul nom TLS 1.3.",
    "brief": "<p>En TLS 1.3, la suite indique l’AEAD et la fonction de hachage HKDF ; elle ne détermine ni le mode d’échange, ni le groupe, ni la PFS. Le mode, le groupe et la phase doivent être connus séparément. Ce modèle traite les paramètres des cas sans vérifier une négociation réelle ni la sécurité globale. <code>dhe</code> désigne ici un échange éphémère sans PSK ; ce n’est pas un mode PSK TLS.<br><br>\nPour les suites TLS 1.3 du modèle, analyser <code>PARSE_SUITE suite=&lt;nom&gt; mode=&lt;mode&gt; group=&lt;groupe&gt; phase=&lt;phase&gt;</code>. Pour chaque paramètre absent, afficher <code>UNKNOWN</code> ; si des informations nécessaires manquent, afficher <code>pfs=UNKNOWN status=PARAMETERS_REQUIRED</code>.<br>\nEn <code>phase=1-rtt</code>, <code>mode=psk_ke group=none</code> donne <code>pfs=NO</code> dans ce modèle ; <code>mode=dhe</code> ou <code>mode=psk_dhe_ke</code> avec un groupe éphémère donne <code>pfs=CONDITIONAL</code>, sous réserve d’authentification et d’effacement des secrets éphémères. En <code>phase=0-rtt</code>, la PFS est <code>NOT_GUARANTEED</code>, quel que soit le mode ultérieur ; les données anticipées présentent un risque de rejeu. Lorsque ces paramètres sont indiqués, <code>status=PARAMETERS_ONLY</code> n’est pas une certification de sécurité.<br>\nPour les suites avec <code>_WITH_</code>, on suppose TLS 1.2 : leur nom ne prouve pas la version négociée. Extraire échange, chiffrement et hachage. Un échange ECDHE/DHE indique <code>pfs=CONDITIONAL status=PARAMETERS_ONLY</code> ; RSA statique indique <code>pfs=NO status=WEAK_NO_PFS</code>. RC4, DES, 3DES, NULL ou EXPORT conduit à <code>status=INSECURE</code>.<br><br>\nFormat TLS 1.3 : <code>SUITE: &lt;nom&gt; ver=TLS1.3 kex=&lt;mode&gt; group=&lt;groupe&gt; phase=&lt;phase&gt; enc=&lt;algorithme&gt; hash=&lt;hachage&gt; pfs=&lt;pfs&gt; status=&lt;statut&gt;</code>.<br>\nFormat TLS 1.2 : <code>SUITE: &lt;nom&gt; ver=TLS1.2 kex=&lt;échange&gt; enc=&lt;algorithme&gt; hash=&lt;hachage&gt; pfs=&lt;pfs&gt; status=&lt;statut&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e1) — Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Suite TLS 1.3 sans paramètres négociés]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384\nA_COMPLETER\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_AES_256_CBC_SHA256\nA_COMPLETER\n\n[Cas 3 — Suite TLS avec chiffrement déprécié]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_RC4_128_SHA\nA_COMPLETER\n\n[Cas 4 — TLS 1.3 avec PSK seul en 1-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_ke group=none phase=1-rtt\nA_COMPLETER\n\n[Cas 5 — TLS 1.3 avec PSK et échange éphémère en 1-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_dhe_ke group=x25519 phase=1-rtt\nA_COMPLETER\n\n[Cas 6 — Même suite et échange, données anticipées 0-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_dhe_ke group=x25519 phase=0-rtt\nA_COMPLETER\n\n[Cas 7 — Handshake initial TLS 1.3 avec échange éphémère]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=dhe group=x25519 phase=1-rtt\nA_COMPLETER\n",
    "hints": [
      "Le nom TLS 1.3 indique l’AEAD et le hachage, mais ne révèle pas le mode d’échange ni le groupe.",
      "Distinguez les données 0-RTT, le mode PSK seul et le mode PSK avec échange éphémère en 1-RTT ; ne concluez pas à une sécurité globale."
    ],
    "examples": [
      {
        "stdin": "PARSE_SUITE suite=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
        "expected": "SUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM hash=SHA256 pfs=CONDITIONAL status=PARAMETERS_ONLY",
        "note": "L’échange ECDHE permet la PFS sous hypothèses ; la configuration complète n’est pas auditée."
      }
    ],
    "tests": [
      {
        "label": "Suite TLS 1.3 sans paramètres négociés",
        "stdin": "cas:1",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=UNKNOWN group=UNKNOWN phase=UNKNOWN enc=AES_256_GCM hash=SHA384 pfs=UNKNOWN status=PARAMETERS_REQUIRED"
      },
      {
        "label": "Suite TLS 1.2 sans confidentialité persistante",
        "stdin": "cas:2",
        "expected": "SUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC hash=SHA256 pfs=NO status=WEAK_NO_PFS"
      },
      {
        "label": "Suite TLS avec chiffrement déprécié",
        "stdin": "cas:3",
        "expected": "SUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128 hash=SHA pfs=NO status=INSECURE"
      },
      {
        "label": "TLS 1.3 avec PSK seul en 1-RTT",
        "stdin": "cas:4",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_ke group=none phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=NO status=PARAMETERS_ONLY"
      },
      {
        "label": "TLS 1.3 avec PSK et échange éphémère en 1-RTT",
        "stdin": "cas:5",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY"
      },
      {
        "label": "Même suite et échange, données anticipées 0-RTT",
        "stdin": "cas:6",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=0-rtt enc=AES_256_GCM hash=SHA384 pfs=NOT_GUARANTEED status=PARAMETERS_ONLY"
      },
      {
        "label": "Handshake initial TLS 1.3 avec échange éphémère",
        "stdin": "cas:7",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=dhe group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY"
      }
    ],
    "solution": "[Exemple]\nSUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM hash=SHA256 pfs=CONDITIONAL status=PARAMETERS_ONLY\n\n[Cas 1 — Suite TLS 1.3 sans paramètres négociés]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=UNKNOWN group=UNKNOWN phase=UNKNOWN enc=AES_256_GCM hash=SHA384 pfs=UNKNOWN status=PARAMETERS_REQUIRED\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\nSUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC hash=SHA256 pfs=NO status=WEAK_NO_PFS\n\n[Cas 3 — Suite TLS avec chiffrement déprécié]\nSUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128 hash=SHA pfs=NO status=INSECURE\n\n[Cas 4 — TLS 1.3 avec PSK seul en 1-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_ke group=none phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=NO status=PARAMETERS_ONLY\n\n[Cas 5 — TLS 1.3 avec PSK et échange éphémère en 1-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY\n\n[Cas 6 — Même suite et échange, données anticipées 0-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=0-rtt enc=AES_256_GCM hash=SHA384 pfs=NOT_GUARANTEED status=PARAMETERS_ONLY\n\n[Cas 7 — Handshake initial TLS 1.3 avec échange éphémère]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=dhe group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY"
  },
  {
    "id": "cr3-c6-e2",
    "chapter": 6,
    "title": "Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS)",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer les phases TLS 1.3 et calculer un identifiant public purement illustratif, sans dériver de secret TLS.",
    "brief": "<p>TLS 1.3 (RFC 9846 ; RFC 8446 historique) peut transmettre des données 0-RTT avant la fin de la poignée de mains : leur confidentialité persistante n’est pas garantie par le protocole et elles peuvent être rejouées. En 1-RTT, un échange éphémère authentifié peut fournir la PFS si les secrets éphémères sont effacés ; le mode PSK seul ne la fournit pas par son échange. Le serveur peut refuser les données anticipées.<br><br>\nCe modèle ne simule pas le protocole réel, ni la validation des pairs. Les cas 0-RTT supposent un PSK ; <code>dhe</code> désigne ici un échange éphémère sans PSK, pas un mode PSK TLS. TLS dérive ses secrets avec HKDF à partir notamment du PSK et/ou d’un secret d’échange, selon la phase et le transcript. On calcule ici seulement <code>demo_id = sha256(client_share:server_share:group)[:16]</code> sur la chaîne encodée en UTF-8, puis en conservant les 16 premiers caractères hexadécimaux. Il n’est pas un secret, une clé ou une dérivation TLS ; les valeurs sont publiques et synthétiques. En 0-RTT, les parts éventuelles sont données après coup pour cet identifiant, pas pour dériver les données anticipées.<br><br>\nRègles du modèle :<br>\n- Pour un handshake initial TLSv1.2, <code>mode=dhe</code> donne <code>pfs=CONDITIONAL</code> sous les hypothèses ci-dessus ; <code>mode=rsa</code> (RSA statique) donne <code>pfs=NO</code>, sinon <code>pfs=UNKNOWN</code>. Format : <code>TLS1.2: rtt=2-RTT pfs=&lt;pfs&gt; status=MODEL_ONLY</code>.<br>\n- Pour une autre version que TLSv1.2 ou TLSv1.3 : <code>STATUS=REJECTED (TLS version unsupported: &lt;v&gt;)</code>.<br>\n- Pour TLSv1.3 en mode <code>dhe</code> ou <code>psk_dhe_ke</code>, accepter seulement <code>x25519</code>, <code>secp256r1</code>, <code>secp384r1</code> ; sinon <code>STATUS=REJECTED (unsupported elliptic group: &lt;grp&gt;)</code>. En mode <code>psk_ke</code>, il n’y a ni groupe ni parts : utiliser <code>none</code>.<br>\n- En <code>phase=0-rtt</code>, afficher <code>pfs=NOT_GUARANTEED</code>. En <code>phase=1-rtt</code>, afficher <code>pfs=NO</code> pour <code>psk_ke</code>, sinon <code>pfs=CONDITIONAL</code> sous les hypothèses ci-dessus.<br>\nFormat : <code>TLS1.3: phase=&lt;phase&gt; mode=&lt;mode&gt; group=&lt;grp&gt; pfs=&lt;pfs&gt; demo_id=&lt;id&gt; status=MODEL_ONLY</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e2) — Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Données anticipées 0-RTT avec PSK et échange ultérieur]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=psk_dhe_ke phase=0-rtt\nA_COMPLETER\n\n[Cas 2 — Handshake initial TLS 1.2 avec RSA statique]\n# Données : TLS_HANDSHAKE client_version=TLSv1.2 server_version=TLSv1.2 group=none client_share=none server_share=none mode=rsa phase=1-rtt\nA_COMPLETER\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\n# Données : TLS_HANDSHAKE client_version=TLSv1.0 server_version=TLSv1.0 group=none client_share=none server_share=none mode=none phase=1-rtt\nA_COMPLETER\n\n[Cas 4 — Données 1-RTT avec PSK et échange éphémère]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=psk_dhe_ke phase=1-rtt\nA_COMPLETER\n\n[Cas 5 — Données 1-RTT avec PSK seul]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=none client_share=none server_share=none mode=psk_ke phase=1-rtt\nA_COMPLETER\n\n[Cas 6 — Données anticipées 0-RTT avec PSK seul]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=none client_share=none server_share=none mode=psk_ke phase=0-rtt\nA_COMPLETER\n\n[Cas 7 — Groupe non pris en charge par le modèle]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=legacy1024 client_share=A1B2 server_share=C3D4 mode=dhe phase=1-rtt\nA_COMPLETER\n",
    "hints": [
      "Distinguez la phase des données du mode d’échange négocié ; 0-RTT ne termine pas le handshake et ne garantit pas la PFS.",
      "Pour l’identifiant public uniquement, concaténez client_share, server_share et group avec « : », puis prenez les 16 premiers caractères hexadécimaux de SHA-256."
    ],
    "examples": [
      {
        "stdin": "TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=dhe phase=1-rtt",
        "expected": "TLS1.3: phase=1-rtt mode=dhe group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY",
        "note": "Échange éphémère illustratif ; le hachage public n’est pas un secret TLS."
      }
    ],
    "tests": [
      {
        "label": "Données anticipées 0-RTT avec PSK et échange ultérieur",
        "stdin": "cas:1",
        "expected": "TLS1.3: phase=0-rtt mode=psk_dhe_ke group=x25519 pfs=NOT_GUARANTEED demo_id=f91a13a53fa8daae status=MODEL_ONLY"
      },
      {
        "label": "Handshake initial TLS 1.2 avec RSA statique",
        "stdin": "cas:2",
        "expected": "TLS1.2: rtt=2-RTT pfs=NO status=MODEL_ONLY"
      },
      {
        "label": "Rejet version obsolète TLS 1.0",
        "stdin": "cas:3",
        "expected": "STATUS=REJECTED (TLS version unsupported: TLSv1.0)"
      },
      {
        "label": "Données 1-RTT avec PSK et échange éphémère",
        "stdin": "cas:4",
        "expected": "TLS1.3: phase=1-rtt mode=psk_dhe_ke group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY"
      },
      {
        "label": "Données 1-RTT avec PSK seul",
        "stdin": "cas:5",
        "expected": "TLS1.3: phase=1-rtt mode=psk_ke group=none pfs=NO demo_id=882e45d0b744de68 status=MODEL_ONLY"
      },
      {
        "label": "Données anticipées 0-RTT avec PSK seul",
        "stdin": "cas:6",
        "expected": "TLS1.3: phase=0-rtt mode=psk_ke group=none pfs=NOT_GUARANTEED demo_id=882e45d0b744de68 status=MODEL_ONLY"
      },
      {
        "label": "Groupe non pris en charge par le modèle",
        "stdin": "cas:7",
        "expected": "STATUS=REJECTED (unsupported elliptic group: legacy1024)"
      }
    ],
    "solution": "[Exemple]\nTLS1.3: phase=1-rtt mode=dhe group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 1 — Données anticipées 0-RTT avec PSK et échange ultérieur]\nTLS1.3: phase=0-rtt mode=psk_dhe_ke group=x25519 pfs=NOT_GUARANTEED demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 2 — Handshake initial TLS 1.2 avec RSA statique]\nTLS1.2: rtt=2-RTT pfs=NO status=MODEL_ONLY\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\nSTATUS=REJECTED (TLS version unsupported: TLSv1.0)\n\n[Cas 4 — Données 1-RTT avec PSK et échange éphémère]\nTLS1.3: phase=1-rtt mode=psk_dhe_ke group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 5 — Données 1-RTT avec PSK seul]\nTLS1.3: phase=1-rtt mode=psk_ke group=none pfs=NO demo_id=882e45d0b744de68 status=MODEL_ONLY\n\n[Cas 6 — Données anticipées 0-RTT avec PSK seul]\nTLS1.3: phase=0-rtt mode=psk_ke group=none pfs=NOT_GUARANTEED demo_id=882e45d0b744de68 status=MODEL_ONLY\n\n[Cas 7 — Groupe non pris en charge par le modèle]\nSTATUS=REJECTED (unsupported elliptic group: legacy1024)"
  },
  {
    "id": "cr3-c6-e3",
    "chapter": 6,
    "title": "Auditeur de Conformité Cryptographique et Transition Post-Quantique (NIST PQC)",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer l'inventaire cryptographique d'une organisation et planifier la migration vers les standards post-quantiques NIST.",
    "brief": "<p>L'ordinateur quantique menace les fondations asymétriques (Shor) et affaiblit les clés symétriques (Grover) :<br>\nRègles d'audit :<br>\n1. <code>ASYMMETRIC</code> (RSA, ECC, DH) : <code>pqc_ready=NO status=VULNERABLE_QUANTUM action=MIGRATE_TO_ML_KEM_OR_ML_DSA</code>.<br>\n2. <code>SYMMETRIC</code> : si <code>key_size &lt; 256</code> -&gt; <code>pqc_ready=NO status=INSUFFICIENT_SECURITY action=UPGRADE_TO_AES_256</code> ; sinon -&gt; <code>pqc_ready=YES status=QUANTUM_SAFE action=MAINTAIN</code>.<br>\n3. <code>HASH</code> : si <code>key_size &lt; 256</code> -&gt; <code>pqc_ready=NO status=DEPRECATED action=MIGRATE_TO_SHA_256_OR_SHA_3</code> ; sinon -&gt; <code>pqc_ready=YES status=QUANTUM_SAFE action=MAINTAIN</code>.<br>\n4. <code>PQC</code> (ML-KEM, ML-DSA, SLH-DSA) : <code>pqc_ready=YES status=NIST_STANDARDIZED action=PRODUCTION_READY</code>.<br><br>\nRésultat d’analyse attendu : <code>AUDIT: algo=&lt;name&gt; type=&lt;type&gt; key_size=&lt;key_size&gt; pqc_ready=&lt;pqc&gt; status=&lt;status&gt; action=&lt;action&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e3) — Auditeur de Conformité Cryptographique et Transition Post-Quantique (NIST PQC)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Clé symétrique 128 bits vulnérable à l accélération de Grover]\n# Données : AUDIT_ALGO name=AES_128 key_size=128 type=SYMMETRIC\nA_COMPLETER\n\n[Cas 2 — AES-256 résistant à Grover avec 128 bits de sécurité résiduelle]\n# Données : AUDIT_ALGO name=AES_256 key_size=256 type=SYMMETRIC\nA_COMPLETER\n\n[Cas 3 — Algorithme post-quantique basé sur les réseaux euclidiens standardisé]\n# Données : AUDIT_ALGO name=ML_KEM_768 key_size=768 type=PQC\nA_COMPLETER\n\n[Cas 4 — Empreinte courte dépréciée et non post-quantique]\n# Données : AUDIT_ALGO name=SHA_1 key_size=160 type=HASH\nA_COMPLETER\n",
    "hints": [
      "Branchez selon t == \"ASYMMETRIC\", \"SYMMETRIC\", \"HASH\", \"PQC\".",
      "Pour SYMMETRIC et HASH, comparez key_size < 256 vs key_size >= 256."
    ],
    "examples": [
      {
        "stdin": "AUDIT_ALGO name=RSA key_size=2048 type=ASYMMETRIC",
        "expected": "AUDIT: algo=RSA type=ASYMMETRIC key_size=2048 pqc_ready=NO status=VULNERABLE_QUANTUM action=MIGRATE_TO_ML_KEM_OR_ML_DSA",
        "note": "RSA repose sur la factorisation entière cassée par l algorithme de Shor."
      }
    ],
    "tests": [
      {
        "label": "Clé symétrique 128 bits vulnérable à l accélération de Grover",
        "stdin": "cas:1",
        "expected": "AUDIT: algo=AES_128 type=SYMMETRIC key_size=128 pqc_ready=NO status=INSUFFICIENT_SECURITY action=UPGRADE_TO_AES_256"
      },
      {
        "label": "AES-256 résistant à Grover avec 128 bits de sécurité résiduelle",
        "stdin": "cas:2",
        "expected": "AUDIT: algo=AES_256 type=SYMMETRIC key_size=256 pqc_ready=YES status=QUANTUM_SAFE action=MAINTAIN"
      },
      {
        "label": "Algorithme post-quantique basé sur les réseaux euclidiens standardisé",
        "stdin": "cas:3",
        "expected": "AUDIT: algo=ML_KEM_768 type=PQC key_size=768 pqc_ready=YES status=NIST_STANDARDIZED action=PRODUCTION_READY"
      },
      {
        "label": "Empreinte courte dépréciée et non post-quantique",
        "stdin": "cas:4",
        "expected": "AUDIT: algo=SHA_1 type=HASH key_size=160 pqc_ready=NO status=DEPRECATED action=MIGRATE_TO_SHA_256_OR_SHA_3"
      }
    ],
    "solution": "[Exemple]\nAUDIT: algo=RSA type=ASYMMETRIC key_size=2048 pqc_ready=NO status=VULNERABLE_QUANTUM action=MIGRATE_TO_ML_KEM_OR_ML_DSA\n\n[Cas 1 — Clé symétrique 128 bits vulnérable à l accélération de Grover]\nAUDIT: algo=AES_128 type=SYMMETRIC key_size=128 pqc_ready=NO status=INSUFFICIENT_SECURITY action=UPGRADE_TO_AES_256\n\n[Cas 2 — AES-256 résistant à Grover avec 128 bits de sécurité résiduelle]\nAUDIT: algo=AES_256 type=SYMMETRIC key_size=256 pqc_ready=YES status=QUANTUM_SAFE action=MAINTAIN\n\n[Cas 3 — Algorithme post-quantique basé sur les réseaux euclidiens standardisé]\nAUDIT: algo=ML_KEM_768 type=PQC key_size=768 pqc_ready=YES status=NIST_STANDARDIZED action=PRODUCTION_READY\n\n[Cas 4 — Empreinte courte dépréciée et non post-quantique]\nAUDIT: algo=SHA_1 type=HASH key_size=160 pqc_ready=NO status=DEPRECATED action=MIGRATE_TO_SHA_256_OR_SHA_3"
  }
];
