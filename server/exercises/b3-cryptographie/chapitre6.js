'use strict';

module.exports = [
  {
    "id": "cr3-c6-e1",
    "chapter": 6,
    "title": "Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une suite cryptographique TLS pour déterminer sa version, ses primitives, sa garantie de confidentialité persistante (PFS) et sa conformité.",
    "brief": "<p>Une suite TLS définit l'assemblage de primitives cryptographiques pour une session.<br>\nRègles :<br>\n1. Suites TLS 1.3 : (ex: <code>TLS_AES_256_GCM_SHA384</code>, <code>TLS_AES_128_GCM_SHA256</code>, <code>TLS_CHACHA20_POLY1305_SHA256</code>) :<br>\n   <code>ver=TLS1.3 kex=ECDHE/DHE enc=&lt;algo&gt; pfs=YES status=SECURE</code>.<br>\n2. Suites TLS 1.2 : comportent <code>_WITH_</code> :<br>\n   - <code>pfs=YES</code> si l'échange contient <code>DHE</code> ou <code>ECDHE</code>, sinon <code>pfs=NO</code>.<br>\n   - Si le chiffrement contient <code>RC4</code>, <code>DES</code>, <code>3DES</code>, <code>NULL</code> ou <code>EXPORT</code> :<br>\n     <code>status=INSECURE (deprecated cipher)</code><br>\n   - Sinon si <code>pfs == NO</code> : <code>status=WEAK (no forward secrecy)</code><br>\n   - Sinon : <code>status=SECURE</code>.<br><br>\nCommande : <code>PARSE_SUITE suite=&lt;nom_suite&gt;</code>.<br>\nRésultat d’analyse attendu : <code>SUITE: &lt;nom&gt; ver=&lt;ver&gt; kex=&lt;kex&gt; enc=&lt;enc&gt; pfs=&lt;pfs&gt; status=&lt;status&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e1) — Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Suite standard TLS 1.3]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384\nA_COMPLETER\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_AES_256_CBC_SHA256\nA_COMPLETER\n\n[Cas 3 — Suite TLS dépréciée et vulnérable]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_RC4_128_SHA\nA_COMPLETER\n",
    "hints": [
      "Identifiez d abord si la suite est TLS 1.3 via sa présence dans la liste blanche TLS 1.3.",
      "Pour TLS 1.2, découpez sur \"_WITH_\" pour isoler kex_part et l algorithme de chiffrement."
    ],
    "examples": [
      {
        "stdin": "PARSE_SUITE suite=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
        "expected": "SUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM_SHA256 pfs=YES status=SECURE",
        "note": "Suite TLS 1.2 moderne avec échange ECDHE apportant la confidentialité persistante."
      }
    ],
    "tests": [
      {
        "label": "Suite standard TLS 1.3",
        "stdin": "cas:1",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=ECDHE/DHE enc=AES_256_GCM pfs=YES status=SECURE"
      },
      {
        "label": "Suite TLS 1.2 sans confidentialité persistante",
        "stdin": "cas:2",
        "expected": "SUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC_SHA256 pfs=NO status=WEAK (no forward secrecy)"
      },
      {
        "label": "Suite TLS dépréciée et vulnérable",
        "stdin": "cas:3",
        "expected": "SUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128_SHA pfs=NO status=INSECURE (deprecated cipher)"
      }
    ],
    "solution": "[Exemple]\nSUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM_SHA256 pfs=YES status=SECURE\n\n[Cas 1 — Suite standard TLS 1.3]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=ECDHE/DHE enc=AES_256_GCM pfs=YES status=SECURE\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\nSUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC_SHA256 pfs=NO status=WEAK (no forward secrecy)\n\n[Cas 3 — Suite TLS dépréciée et vulnérable]\nSUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128_SHA pfs=NO status=INSECURE (deprecated cipher)"
  },
  {
    "id": "cr3-c6-e2",
    "chapter": 6,
    "title": "Simulateur de Négociation TLS 1.3 et Validation de Confidentialité Persistante (PFS)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l'établissement de session TLS 1.3 (1-RTT et 0-RTT PSK) et dériver le secret maître éphémère.",
    "brief": "<p>TLS 1.3 (RFC 8446) accélère la poignée de mains à 1 aller-retour (1-RTT) ou 0 aller-retour (0-RTT avec risque de rejeu) :<br>\nRègles :<br>\n- Si <code>server_version == 'TLSv1.2'</code> : <code>TLS1.2: rtt=2-RTT pfs=CONDITIONAL status=LEGACY_HANDSHAKE</code>.<br>\n- Si version autre : <code>STATUS=REJECTED (TLS version unsupported: &lt;v&gt;)</code>.<br>\n- Pour TLSv1.3, groupes autorisés : <code>x25519</code>, <code>secp256r1</code>, <code>secp384r1</code>.<br>\n- Si non supporté : <code>STATUS=REJECTED (unsupported elliptic group: &lt;grp&gt;)</code>.<br>\n- Dériver <code>master_secret</code> sur 16 caractères hexadécimaux de <code>sha256(client_share:server_share:group)</code>.<br><br>\nRésultat d’analyse attendu : <code>TLS1.3: rtt=&lt;rtt&gt; group=&lt;grp&gt; pfs=PERFECT_FORWARD_SECRECY master_secret=&lt;ms&gt; status=ESTABLISHED</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e2) — Simulateur de Négociation TLS 1.3 et Validation de Confidentialité Persistante (PFS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Reprise de session TLS 1.3 en mode 0-RTT]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 psk_mode=0-rtt\nA_COMPLETER\n\n[Cas 2 — Négociation de repli en TLS 1.2]\n# Données : TLS_HANDSHAKE client_version=TLSv1.2 server_version=TLSv1.2 group=secp256r1 client_share=A1B2 server_share=C3D4 psk_mode=none\nA_COMPLETER\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\n# Données : TLS_HANDSHAKE client_version=TLSv1.0 server_version=TLSv1.0 group=none client_share=none server_share=none psk_mode=none\nA_COMPLETER\n",
    "hints": [
      "Validez d abord server_version avant de tester les groupes de négociation.",
      "Concaténez f\"{client_share}:{server_share}:{group}\".encode(\"utf-8\") et prenez hexdigest()[:16] pour master_secret."
    ],
    "examples": [
      {
        "stdin": "TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 psk_mode=none",
        "expected": "TLS1.3: rtt=1-RTT group=x25519 pfs=PERFECT_FORWARD_SECRECY master_secret=f91a13a53fa8daae status=ESTABLISHED",
        "note": "Poignée de mains 1-RTT avec échange éphémère x25519 garantissant le PFS."
      }
    ],
    "tests": [
      {
        "label": "Reprise de session TLS 1.3 en mode 0-RTT",
        "stdin": "cas:1",
        "expected": "TLS1.3: rtt=0-RTT (early data) group=x25519 pfs=PERFECT_FORWARD_SECRECY master_secret=f91a13a53fa8daae status=ESTABLISHED"
      },
      {
        "label": "Négociation de repli en TLS 1.2",
        "stdin": "cas:2",
        "expected": "TLS1.2: rtt=2-RTT pfs=CONDITIONAL status=LEGACY_HANDSHAKE"
      },
      {
        "label": "Rejet version obsolète TLS 1.0",
        "stdin": "cas:3",
        "expected": "STATUS=REJECTED (TLS version unsupported: TLSv1.0)"
      }
    ],
    "solution": "[Exemple]\nTLS1.3: rtt=1-RTT group=x25519 pfs=PERFECT_FORWARD_SECRECY master_secret=f91a13a53fa8daae status=ESTABLISHED\n\n[Cas 1 — Reprise de session TLS 1.3 en mode 0-RTT]\nTLS1.3: rtt=0-RTT (early data) group=x25519 pfs=PERFECT_FORWARD_SECRECY master_secret=f91a13a53fa8daae status=ESTABLISHED\n\n[Cas 2 — Négociation de repli en TLS 1.2]\nTLS1.2: rtt=2-RTT pfs=CONDITIONAL status=LEGACY_HANDSHAKE\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\nSTATUS=REJECTED (TLS version unsupported: TLSv1.0)"
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
