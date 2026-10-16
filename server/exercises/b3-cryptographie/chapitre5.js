'use strict';

module.exports = [
  {
    "id": "cr3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter la signature numérique RSA d'un message haché et sa vérification avec la clé publique.",
    "brief": "<p>Une signature numérique lie cryptographiquement l'empreinte d'un message à la clé privée de l'émetteur :<br>\n- Empreinte : <code>h = int(sha256(M), 16) mod n</code>.<br>\n- Signature : <code>sig = pow(h, d, n)</code>.<br>\n- Vérification : <code>h_recupere = pow(sig, e, n)</code>.<br>\n- Si <code>h == h_recupere</code>, la signature est valide.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>SIGN n=&lt;n&gt; d=&lt;d&gt; text=&lt;texte&gt;</code> : produit <code>SIGN: n=&lt;n&gt; digest_mod=&lt;h&gt; sig=&lt;sig&gt;</code>.<br>\n2. <code>VERIFY n=&lt;n&gt; e=&lt;e&gt; sig=&lt;sig&gt; text=&lt;texte&gt;</code> :<br>\n   - Si valide : <code>VERIFY: status=VALID_SIGNATURE (authentic & untampered)</code><br>\n   - Si invalide : <code>VERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)</code></p>",
    "starter": "# Grille d'analyse (cr3-c5-e1) — Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vérification signature valide]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_OFFICIEL\nA_COMPLETER\n\n[Cas 2 — Détection d altération de message sous signature]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_FALSIFIE\nA_COMPLETER\n\n[Cas 3 — Rejet signature numérique corrompue]\n# Données : VERIFY n=3233 e=17 sig=9999 text=CONTRAT_OFFICIEL\nA_COMPLETER\n",
    "hints": [
      "Calculez h = int(hashlib.sha256(text.encode(\"utf-8\")).hexdigest(), 16) % n.",
      "Pour vérifier, calculez pow(sig, e, n) et comparez directement avec h."
    ],
    "examples": [
      {
        "stdin": "SIGN n=3233 d=2753 text=CONTRAT_OFFICIEL",
        "expected": "SIGN: n=3233 digest_mod=566 sig=1706",
        "note": "Signature calculée avec la clé privée (d=2753) sur le condensé modulo 3233."
      }
    ],
    "tests": [
      {
        "label": "Vérification signature valide",
        "stdin": "cas:1",
        "expected": "VERIFY: status=VALID_SIGNATURE (authentic & untampered)"
      },
      {
        "label": "Détection d altération de message sous signature",
        "stdin": "cas:2",
        "expected": "VERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)"
      },
      {
        "label": "Rejet signature numérique corrompue",
        "stdin": "cas:3",
        "expected": "VERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)"
      }
    ],
    "solution": "[Exemple]\nSIGN: n=3233 digest_mod=566 sig=1706\n\n[Cas 1 — Vérification signature valide]\nVERIFY: status=VALID_SIGNATURE (authentic & untampered)\n\n[Cas 2 — Détection d altération de message sous signature]\nVERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)\n\n[Cas 3 — Rejet signature numérique corrompue]\nVERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)"
  },
  {
    "id": "cr3-c5-e2",
    "chapter": 5,
    "title": "Validateur de Structure et de Validité Temporelle de Certificat X.509",
    "level": "n2",
    "language": "analyse",
    "goal": "Valider la conformité temporelle et l'admissibilité du nom de domaine (Common Name et SAN avec wildcards) d'un certificat X.509.",
    "brief": "<p>Un certificat X.509 lie une identité à une clé publique.<br>\nCritères de validation :<br>\n1. Validité temporelle :<br>\n   - Si <code>date &lt; not_before</code> : <code>STATUS=INVALID reason=NOT_YET_VALID</code><br>\n   - Si <code>date &gt; not_after</code> : <code>STATUS=INVALID reason=CERTIFICATE_EXPIRED</code><br>\n2. Correspondance du nom d'hôte :<br>\n   - Le FQDN doit correspondre à <code>cn</code> ou à un nom dans <code>san</code>.<br>\n   - Un wildcard <code>*.domaine.corp</code> couvre tout sous-domaine de niveau 1 (ex: <code>web.domaine.corp</code>).<br>\n   - Si aucune correspondance : <code>STATUS=INVALID reason=HOSTNAME_MISMATCH</code>.<br>\n3. Si conforme : <code>STATUS=VALID fqdn=&lt;fqdn&gt; valid_until=&lt;not_after&gt; ca=&lt;is_ca&gt;</code>.<br><br>\nCommande STDIN : <code>CERT_VALIDATE fqdn=&lt;fqdn&gt; date=&lt;date&gt; cn=&lt;cn&gt; san=&lt;san&gt; not_before=&lt;date&gt; not_after=&lt;date&gt; is_ca=&lt;bool&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e2) — Validateur de Structure et de Validité Temporelle de Certificat X.509\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Validation FQDN par wildcard SAN]\n# Données : CERT_VALIDATE fqdn=web.cloud.corp date=2026-10-15 cn=cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 2 — Rejet FQDN ne figurant ni dans CN ni dans SAN]\n# Données : CERT_VALIDATE fqdn=hacker.net date=2026-10-15 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 3 — Rejet certificat expiré]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2028-05-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 4 — Rejet certificat pas encore valide]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2025-11-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n",
    "hints": [
      "Comparez lexicographiquement les dates au format ISO YYYY-MM-DD.",
      "Pour les wildcards, vérifiez si le motif commence par \"*.\" et découpez le nom pour tester qu il s agit d un sous-domaine direct sans point supplémentaire."
    ],
    "examples": [
      {
        "stdin": "CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=*.cloud.corp,cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false",
        "expected": "STATUS=VALID fqdn=api.cloud.corp valid_until=2027-01-01 ca=false",
        "note": "Certificat en cours de validité avec correspondance exacte FQDN."
      }
    ],
    "tests": [
      {
        "label": "Validation FQDN par wildcard SAN",
        "stdin": "cas:1",
        "expected": "STATUS=VALID fqdn=web.cloud.corp valid_until=2027-01-01 ca=false"
      },
      {
        "label": "Rejet FQDN ne figurant ni dans CN ni dans SAN",
        "stdin": "cas:2",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      },
      {
        "label": "Rejet certificat expiré",
        "stdin": "cas:3",
        "expected": "STATUS=INVALID reason=CERTIFICATE_EXPIRED"
      },
      {
        "label": "Rejet certificat pas encore valide",
        "stdin": "cas:4",
        "expected": "STATUS=INVALID reason=NOT_YET_VALID"
      }
    ],
    "solution": "[Exemple]\nSTATUS=VALID fqdn=api.cloud.corp valid_until=2027-01-01 ca=false\n\n[Cas 1 — Validation FQDN par wildcard SAN]\nSTATUS=VALID fqdn=web.cloud.corp valid_until=2027-01-01 ca=false\n\n[Cas 2 — Rejet FQDN ne figurant ni dans CN ni dans SAN]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH\n\n[Cas 3 — Rejet certificat expiré]\nSTATUS=INVALID reason=CERTIFICATE_EXPIRED\n\n[Cas 4 — Rejet certificat pas encore valide]\nSTATUS=INVALID reason=NOT_YET_VALID"
  },
  {
    "id": "cr3-c5-e3",
    "chapter": 5,
    "title": "Contrôleur de Chaîne de Certification PKI et Révocation (CRL/OCSP)",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la validité d'une chaîne de confiance PKI complète et contrôler l'absence de certificats révoqués dans la liste CRL.",
    "brief": "<p>Contrôle de conformité d'une chaîne PKI :<br>\n- Ligne d'en-tête : <code>PKI_CHAIN trust_root=&lt;root&gt; crl_revoked=&lt;s1,s2,...&gt;</code>.<br>\n- Certificats (de la feuille à la racine) : <code>CERT subject=&lt;s&gt; issuer=&lt;i&gt; serial=&lt;ser&gt; is_ca=&lt;bool&gt;</code>.<br><br>\nRègles :<br>\n1. Révocation : si un serial est dans <code>crl_revoked</code> : <code>CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=&lt;ser&gt; subject=&lt;s&gt;</code>.<br>\n2. Liaison : pour tout certificat i &lt; N-1, <code>cert[i].issuer == cert[i+1].subject</code>. Sinon <code>CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=&lt;cert[i].subject&gt;</code>.<br>\n3. Émetteur : <code>cert[i+1].is_ca == True</code>. Sinon <code>CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=&lt;cert[i+1].subject&gt;</code>.<br>\n4. Racine : le dernier certificat doit être auto-signé (<code>issuer == subject</code>) et égal à <code>trust_root</code>. Sinon <code>CHAIN: INVALID reason=UNTRUSTED_ROOT root=&lt;root&gt;</code>.<br>\n5. Succès : <code>CHAIN: VALID depth=&lt;N&gt; root=&lt;root&gt; leaf=&lt;leaf&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e3) — Contrôleur de Chaîne de Certification PKI et Révocation (CRL/OCSP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet certificat révoqué dans la CRL]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-1001\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 2 — Rupture de liaison d émetteur dans la chaîne]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\n# Données : CERT subject=api.bank.com issuer=Rogue_Intermediate serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 3 — Racine non présente dans le magasin de confiance]\n# Données : PKI_CHAIN trust_root=Official_Root_CA crl_revoked=none\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=Fake_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=Fake_Root_CA issuer=Fake_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n",
    "hints": [
      "Contrôlez en premier la révocation en testant si serial in revoked.",
      "Parcourez ensuite de i=0 à len(certs)-2 pour valider cert[i].issuer == cert[i+1].subject."
    ],
    "examples": [
      {
        "stdin": "PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\nCERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\nCERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\nCERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true",
        "expected": "CHAIN: VALID depth=3 root=DigiTrust_Root_CA leaf=api.bank.com",
        "note": "Chaîne PKI 3 niveaux intacte liée à la racine de confiance."
      }
    ],
    "tests": [
      {
        "label": "Rejet certificat révoqué dans la CRL",
        "stdin": "cas:1",
        "expected": "CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=SN-1001 subject=api.bank.com"
      },
      {
        "label": "Rupture de liaison d émetteur dans la chaîne",
        "stdin": "cas:2",
        "expected": "CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=api.bank.com"
      },
      {
        "label": "Racine non présente dans le magasin de confiance",
        "stdin": "cas:3",
        "expected": "CHAIN: INVALID reason=UNTRUSTED_ROOT root=Fake_Root_CA"
      }
    ],
    "solution": "[Exemple]\nCHAIN: VALID depth=3 root=DigiTrust_Root_CA leaf=api.bank.com\n\n[Cas 1 — Rejet certificat révoqué dans la CRL]\nCHAIN: INVALID reason=REVOKED_CERTIFICATE serial=SN-1001 subject=api.bank.com\n\n[Cas 2 — Rupture de liaison d émetteur dans la chaîne]\nCHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=api.bank.com\n\n[Cas 3 — Racine non présente dans le magasin de confiance]\nCHAIN: INVALID reason=UNTRUSTED_ROOT root=Fake_Root_CA"
  }
];
