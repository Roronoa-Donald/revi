'use strict';

module.exports = [
  {
    "id": "cr3-c5-e1",
    "chapter": 5,
    "title": "Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)",
    "level": "n1",
    "language": "analyse",
    "goal": "Effectuer un calcul RSA brut jouet, reconnaître ses limites et distinguer une signature RSA-PSS réelle.",
    "brief": "<p>Ce calcul jouet de RSA brut avec un très petit module ne fournit aucune garantie de sécurité. La réduction de SHA-256 modulo <code>n</code> crée facilement des collisions : une égalité ne prouve ni l’authenticité ni l’absence d’altération. En pratique, utiliser une bibliothèque et un schéma standard comme RSA-PSS (RFC 8017).<br><br>\nDans ce modèle pédagogique : <code>h = int(sha256(M), 16) mod n</code>, <code>sig = pow(h, d, n)</code> et <code>h_recupere = pow(sig, e, n)</code>.<br>\n1. <code>SIGN n=&lt;n&gt; d=&lt;d&gt; text=&lt;texte&gt;</code> produit <code>SIGN: n=&lt;n&gt; digest_mod=&lt;h&gt; sig=&lt;sig&gt;</code>.<br>\n2. <code>VERIFY n=&lt;n&gt; e=&lt;e&gt; sig=&lt;sig&gt; text=&lt;texte&gt;</code> :<br>\n   - Si <code>sig &lt; 0</code> ou <code>sig &gt;= n</code> : <code>VERIFY: status=SIGNATURE_OUT_OF_RANGE</code>.<br>\n   - Si les valeurs réduites coïncident : <code>VERIFY: status=TOY_MATCH (no_security_guarantee)</code>.<br>\n   - Sinon : <code>VERIFY: status=TOY_MISMATCH</code>.<br>\nComparer notamment deux messages distincts avec la même signature dans les cas 1 et 4.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e1) — Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Égalité des valeurs pour le premier message]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_OFFICIEL\nA_COMPLETER\n\n[Cas 2 — Valeurs réduites différentes]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_FALSIFIE\nA_COMPLETER\n\n[Cas 3 — Signature hors de la plage du module]\n# Données : VERIFY n=3233 e=17 sig=9999 text=CONTRAT_OFFICIEL\nA_COMPLETER\n\n[Cas 4 — Collision avec un autre message]\n# Données : VERIFY n=3233 e=17 sig=1706 text=CONTRAT_COLLISION_13147\nA_COMPLETER\n",
    "hints": [
      "Calculez h = int(hashlib.sha256(text.encode(\"utf-8\")).hexdigest(), 16) % n.",
      "Vérifiez d’abord 0 <= sig < n, puis comparez pow(sig, e, n) à h : une égalité ne prouve pas la sécurité."
    ],
    "examples": [
      {
        "stdin": "SIGN n=3233 d=2753 text=CONTRAT_OFFICIEL",
        "expected": "SIGN: n=3233 digest_mod=566 sig=1706",
        "note": "Calcul jouet avec un petit module, sans garantie de sécurité."
      }
    ],
    "tests": [
      {
        "label": "Égalité des valeurs pour le premier message",
        "stdin": "cas:1",
        "expected": "VERIFY: status=TOY_MATCH (no_security_guarantee)"
      },
      {
        "label": "Valeurs réduites différentes",
        "stdin": "cas:2",
        "expected": "VERIFY: status=TOY_MISMATCH"
      },
      {
        "label": "Signature hors de la plage du module",
        "stdin": "cas:3",
        "expected": "VERIFY: status=SIGNATURE_OUT_OF_RANGE"
      },
      {
        "label": "Collision avec un autre message",
        "stdin": "cas:4",
        "expected": "VERIFY: status=TOY_MATCH (no_security_guarantee)"
      }
    ],
    "solution": "[Exemple]\nSIGN: n=3233 digest_mod=566 sig=1706\n\n[Cas 1 — Égalité des valeurs pour le premier message]\nVERIFY: status=TOY_MATCH (no_security_guarantee)\n\n[Cas 2 — Valeurs réduites différentes]\nVERIFY: status=TOY_MISMATCH\n\n[Cas 3 — Signature hors de la plage du module]\nVERIFY: status=SIGNATURE_OUT_OF_RANGE\n\n[Cas 4 — Collision avec un autre message]\nVERIFY: status=TOY_MATCH (no_security_guarantee)"
  },
  {
    "id": "cr3-c5-e2",
    "chapter": 5,
    "title": "Contrôle Partiel d’un Nom DNS SAN et des Dates d’un Certificat X.509",
    "level": "n2",
    "language": "analyse",
    "goal": "Contrôler les dates et un nom DNS dans le SAN sans prétendre valider complètement le certificat.",
    "brief": "<p>Ce modèle vérifie uniquement des dates ISO et un nom DNS dans des entrées dNSName du SAN. Selon la RFC 9525, le CN est ignoré pour identifier le service, même s’il correspond au nom demandé. Le SAN contient ici une liste de noms séparés par des virgules, comparés sans tenir compte de la casse ; <code>san=-</code> indique un SAN absent.<br>\nUne entrée <code>*.cloud.corp</code> ne couvre qu’un seul label à gauche : <code>web.cloud.corp</code>, mais ni <code>cloud.corp</code> ni <code>api.dev.cloud.corp</code>.<br>\nContrôle partiel seulement : chaîne : non contrôlée ; les signatures, l’ancre de confiance, les contraintes et usages, ainsi que la révocation restent à vérifier. Le champ <code>is_ca</code> est seulement recopié et n’est pas validé.<br><br>\nRègles :<br>\n1. Si <code>date &lt; not_before</code> : <code>STATUS=INVALID reason=NOT_YET_VALID</code>.<br>\n2. Si <code>date &gt; not_after</code> : <code>STATUS=INVALID reason=CERTIFICATE_EXPIRED</code> ; les deux bornes sont incluses.<br>\n3. Si aucun DNS-ID du SAN ne correspond : <code>STATUS=INVALID reason=HOSTNAME_MISMATCH</code>.<br>\n4. Si ces deux contrôles passent : <code>STATUS=PARTIAL fqdn=&lt;fqdn&gt; valid_until=&lt;not_after&gt; ca=&lt;is_ca&gt; chain=NOT_CHECKED</code>.<br><br>\nParamètres : <code>CERT_VALIDATE fqdn=&lt;fqdn&gt; date=&lt;date&gt; cn=&lt;cn&gt; san=&lt;san&gt; not_before=&lt;date&gt; not_after=&lt;date&gt; is_ca=&lt;bool&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e2) — Contrôle Partiel d’un Nom DNS SAN et des Dates d’un Certificat X.509\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Correspondance partielle par wildcard SAN]\n# Données : CERT_VALIDATE fqdn=web.cloud.corp date=2026-10-15 cn=cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 2 — CN correspondant mais SAN absent]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=- not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 3 — Rejet certificat expiré]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2028-05-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 4 — Rejet certificat pas encore valide]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2025-11-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 5 — CN correspondant mais SAN différent]\n# Données : CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=www.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 6 — Wildcard ne couvrant pas deux labels]\n# Données : CERT_VALIDATE fqdn=api.dev.cloud.corp date=2026-10-15 cn=api.dev.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n\n[Cas 7 — Wildcard ne couvrant pas le domaine racine]\n# Données : CERT_VALIDATE fqdn=cloud.corp date=2026-10-15 cn=cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false\nA_COMPLETER\n",
    "hints": [
      "Comparez les dates ISO YYYY-MM-DD avec bornes incluses, puis ignorez le CN pour la correspondance du nom.",
      "Un wildcard complet dans le label le plus à gauche couvre exactement un label ; même si les contrôles passent, la chaîne reste non contrôlée."
    ],
    "examples": [
      {
        "stdin": "CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=*.cloud.corp,cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false",
        "expected": "STATUS=PARTIAL fqdn=api.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED",
        "note": "Dates et wildcard SAN correspondent ; la chaîne n’est pas vérifiée."
      }
    ],
    "tests": [
      {
        "label": "Correspondance partielle par wildcard SAN",
        "stdin": "cas:1",
        "expected": "STATUS=PARTIAL fqdn=web.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED"
      },
      {
        "label": "CN correspondant mais SAN absent",
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
      },
      {
        "label": "CN correspondant mais SAN différent",
        "stdin": "cas:5",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      },
      {
        "label": "Wildcard ne couvrant pas deux labels",
        "stdin": "cas:6",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      },
      {
        "label": "Wildcard ne couvrant pas le domaine racine",
        "stdin": "cas:7",
        "expected": "STATUS=INVALID reason=HOSTNAME_MISMATCH"
      }
    ],
    "solution": "[Exemple]\nSTATUS=PARTIAL fqdn=api.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED\n\n[Cas 1 — Correspondance partielle par wildcard SAN]\nSTATUS=PARTIAL fqdn=web.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED\n\n[Cas 2 — CN correspondant mais SAN absent]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH\n\n[Cas 3 — Rejet certificat expiré]\nSTATUS=INVALID reason=CERTIFICATE_EXPIRED\n\n[Cas 4 — Rejet certificat pas encore valide]\nSTATUS=INVALID reason=NOT_YET_VALID\n\n[Cas 5 — CN correspondant mais SAN différent]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH\n\n[Cas 6 — Wildcard ne couvrant pas deux labels]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH\n\n[Cas 7 — Wildcard ne couvrant pas le domaine racine]\nSTATUS=INVALID reason=HOSTNAME_MISMATCH"
  },
  {
    "id": "cr3-c5-e3",
    "chapter": 5,
    "title": "Contrôle Partiel de Chaîne PKI et de Liste de Révocation Fictive",
    "level": "n3",
    "language": "analyse",
    "goal": "Effectuer un contrôle partiel des noms et d’une liste de révocation fictive, sans valider une chaîne PKI réelle.",
    "brief": "<p>Ce modèle contrôle uniquement des chaînes de noms et des numéros de série dans une liste fictive. Les signatures des certificats et de la liste sont non vérifiées ; les dates, contraintes complètes, usages, identité du service, authenticité de l’ancre et fraîcheur de révocation ne sont pas vérifiés non plus. Il ne valide pas une chaîne PKI réelle et n’interroge pas OCSP. Tous les diagnostics, même négatifs, ne concernent que les données fictives et ne certifient pas le statut réel.<br>\nUn sujet égal à l’émetteur indique ici un certificat auto-émis, pas la preuve qu’il est auto-signé. <code>trust_root</code> est seulement un nom attendu, non une ancre cryptographique vérifiée.<br><br>\nLigne d’en-tête : <code>PKI_CHAIN trust_root=&lt;root&gt; crl_revoked=&lt;s1,s2,...&gt;</code>.<br>\nCertificats de la feuille à la racine : <code>CERT subject=&lt;s&gt; issuer=&lt;i&gt; serial=&lt;ser&gt; is_ca=&lt;bool&gt;</code>.<br><br>\nRègles de ce modèle :<br>\n1. Si un numéro de série figure dans la liste : <code>CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=&lt;ser&gt; subject=&lt;s&gt;</code>.<br>\n2. Pour tout certificat i &lt; N-1, comparer <code>cert[i].issuer == cert[i+1].subject</code> ; sinon <code>CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=&lt;cert[i].subject&gt;</code>.<br>\n3. Vérifier l’indicateur déclaré <code>cert[i+1].is_ca == true</code> ; sinon <code>CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=&lt;cert[i+1].subject&gt;</code>.<br>\n4. Le dernier sujet doit égaler son émetteur et <code>trust_root</code> ; sinon <code>CHAIN: INVALID reason=UNTRUSTED_ROOT root=&lt;root&gt;</code>.<br>\n5. Si ces seuls contrôles passent : <code>CHAIN: PARTIAL depth=&lt;N&gt; root=&lt;root&gt; leaf=&lt;leaf&gt; signatures=NOT_CHECKED</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c5-e3) — Contrôle Partiel de Chaîne PKI et de Liste de Révocation Fictive\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Numéro de série présent dans la liste fictive]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-1001\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 2 — Rupture de liaison des noms d’émetteur]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\n# Données : CERT subject=api.bank.com issuer=Rogue_Intermediate serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 3 — Nom de racine différent du nom attendu]\n# Données : PKI_CHAIN trust_root=Official_Root_CA crl_revoked=none\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=Fake_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=Fake_Root_CA issuer=Fake_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 4 — Noms cohérents mais signatures non contrôlées]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n\n[Cas 5 — Émetteur intermédiaire sans indicateur CA]\n# Données : PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\n# Données : CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\n# Données : CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=false\n# Données : CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true\nA_COMPLETER\n",
    "hints": [
      "Comparez les numéros de série à la liste fictive avant de vérifier les noms et les indicateurs CA.",
      "Des noms cohérents ne vérifient pas les signatures ni l’ancre de confiance : le verdict positif reste partiel."
    ],
    "examples": [
      {
        "stdin": "PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999\nCERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false\nCERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true\nCERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true",
        "expected": "CHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED",
        "note": "Contrôles de noms et liste fictive seulement ; les signatures et la confiance réelle ne sont pas vérifiées."
      }
    ],
    "tests": [
      {
        "label": "Numéro de série présent dans la liste fictive",
        "stdin": "cas:1",
        "expected": "CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=SN-1001 subject=api.bank.com"
      },
      {
        "label": "Rupture de liaison des noms d’émetteur",
        "stdin": "cas:2",
        "expected": "CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=api.bank.com"
      },
      {
        "label": "Nom de racine différent du nom attendu",
        "stdin": "cas:3",
        "expected": "CHAIN: INVALID reason=UNTRUSTED_ROOT root=Fake_Root_CA"
      },
      {
        "label": "Noms cohérents mais signatures non contrôlées",
        "stdin": "cas:4",
        "expected": "CHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED"
      },
      {
        "label": "Émetteur intermédiaire sans indicateur CA",
        "stdin": "cas:5",
        "expected": "CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=DigiTrust_Intermediate_CA"
      }
    ],
    "solution": "[Exemple]\nCHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED\n\n[Cas 1 — Numéro de série présent dans la liste fictive]\nCHAIN: INVALID reason=REVOKED_CERTIFICATE serial=SN-1001 subject=api.bank.com\n\n[Cas 2 — Rupture de liaison des noms d’émetteur]\nCHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=api.bank.com\n\n[Cas 3 — Nom de racine différent du nom attendu]\nCHAIN: INVALID reason=UNTRUSTED_ROOT root=Fake_Root_CA\n\n[Cas 4 — Noms cohérents mais signatures non contrôlées]\nCHAIN: PARTIAL depth=3 root=DigiTrust_Root_CA leaf=api.bank.com signatures=NOT_CHECKED\n\n[Cas 5 — Émetteur intermédiaire sans indicateur CA]\nCHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=DigiTrust_Intermediate_CA"
  }
];
