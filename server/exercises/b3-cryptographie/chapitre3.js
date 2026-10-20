'use strict';

module.exports = [
  {
    "id": "cr3-c3-e1",
    "chapter": 3,
    "title": "Vérificateur d'Intégrité et Comparateur d'Empreintes (MD5, SHA-1, SHA-256)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer et vérifier les empreintes cryptographiques avec MD5, SHA-1 et SHA-256 et évaluer leur conformité de sécurité NIST.",
    "brief": "<p>Les fonctions de hachage condensent un message en une empreinte de taille fixe.<br>\nStatuts de sécurité NIST :<br>\n- <code>md5</code> : 128 bits, <code>DEPRECATED (collision vulnerable)</code><br>\n- <code>sha1</code> : 160 bits, <code>DEPRECATED (SHAttered attack)</code><br>\n- <code>sha256</code> : 256 bits, <code>SECURE (NIST recommended)</code><br><br>\nCommandes lues sur STDIN :<br>\n1. <code>HASH algo=&lt;md5|sha1|sha256&gt; text=&lt;texte&gt;</code> :<br>\n   <code>HASH: algo=&lt;ALGO&gt; bits=&lt;B&gt; status=&lt;STATUS&gt; digest=&lt;DIGEST&gt;</code><br>\n2. <code>VERIFY algo=&lt;algo&gt; expected=&lt;hex&gt; text=&lt;texte&gt;</code> :<br>\n   - Si conforme : <code>VERIFY: algo=&lt;ALGO&gt; match=OK</code><br>\n   - Sinon : <code>VERIFY: algo=&lt;ALGO&gt; match=MISMATCH (integrity compromised)</code></p>",
    "starter": "# Grille d'analyse (cr3-c3-e1) — Vérificateur d'Intégrité et Comparateur d'Empreintes (MD5, SHA-1, SHA-256)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Empreinte MD5 obsolète]\n# Données : HASH algo=md5 text=HELLO\nA_COMPLETER\n\n[Cas 2 — Vérification intégrité conforme]\n# Données : VERIFY algo=sha256 expected=a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e text=Hello World\nA_COMPLETER\n\n[Cas 3 — Détection d altération de données]\n# Données : VERIFY algo=sha256 expected=ffff text=Hello World\nA_COMPLETER\n",
    "hints": [
      "Utilisez hashlib.md5(), hashlib.sha1() ou hashlib.sha256() sur les données text.encode(\"utf-8\").",
      "Comparez les empreintes en convertissant les deux chaînes en minuscules avec .lower()."
    ],
    "examples": [
      {
        "stdin": "HASH algo=sha256 text=SECURITE_INFORMATIQUE",
        "expected": "HASH: algo=SHA256 bits=256 status=SECURE (NIST recommended) digest=55be6350223b3da0e894a709edc0b1a193fe56325c97e8750262240935ef1958",
        "note": "Empreinte SHA-256 standard NIST avec 256 bits de sécurité."
      }
    ],
    "tests": [
      {
        "label": "Empreinte MD5 obsolète",
        "stdin": "cas:1",
        "expected": "HASH: algo=MD5 bits=128 status=DEPRECATED (collision vulnerable) digest=eb61eead90e3b899c6bcbe27ac581660"
      },
      {
        "label": "Vérification intégrité conforme",
        "stdin": "cas:2",
        "expected": "VERIFY: algo=SHA256 match=OK"
      },
      {
        "label": "Détection d altération de données",
        "stdin": "cas:3",
        "expected": "VERIFY: algo=SHA256 match=MISMATCH (integrity compromised)"
      }
    ],
    "solution": "[Exemple]\nHASH: algo=SHA256 bits=256 status=SECURE (NIST recommended) digest=55be6350223b3da0e894a709edc0b1a193fe56325c97e8750262240935ef1958\n\n[Cas 1 — Empreinte MD5 obsolète]\nHASH: algo=MD5 bits=128 status=DEPRECATED (collision vulnerable) digest=eb61eead90e3b899c6bcbe27ac581660\n\n[Cas 2 — Vérification intégrité conforme]\nVERIFY: algo=SHA256 match=OK\n\n[Cas 3 — Détection d altération de données]\nVERIFY: algo=SHA256 match=MISMATCH (integrity compromised)"
  },
  {
    "id": "cr3-c3-e2",
    "chapter": 3,
    "title": "Implémentation du Mécanisme HMAC (RFC 2104) et Intégrité Authentifiée",
    "level": "n2",
    "language": "analyse",
    "goal": "Implémenter le calcul et la validation d'un code d'authentification de message HMAC-SHA256 selon la RFC 2104.",
    "brief": "<p>HMAC garantit intégrité et authenticité partagée avec une clé secrète K.<br>\nConstruction RFC 2104 (bloc 64 octets pour SHA-256) :<br>\n- Clé ajustée à 64 octets (hachée si trop longue, complétée par des 0x00 si trop courte).<br>\n- Constantes : <code>ipad = 0x36 * 64</code>, <code>opad = 0x5C * 64</code>.<br>\n- <code>HMAC(K, M) = H((K ^ opad) || H((K ^ ipad) || M))</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>HMAC CALC key=&lt;cle&gt; text=&lt;texte&gt;</code> : produit <code>HMAC: algo=SHA256 key_len=&lt;L&gt; tag=&lt;tag_hex&gt;</code>.<br>\n2. <code>HMAC VERIFY key=&lt;cle&gt; tag=&lt;tag_hex&gt; text=&lt;texte&gt;</code> :<br>\n   - Si conforme : <code>HMAC_VERIFY: status=AUTHENTIC</code><br>\n   - Sinon : <code>HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c3-e2) — Implémentation du Mécanisme HMAC (RFC 2104) et Intégrité Authentifiée\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vérification HMAC valide]\n# Données : HMAC VERIFY key=SECRET_SHARED_KEY tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f text=TRANSACTION amount=5000 from=alice to=bob\nA_COMPLETER\n\n[Cas 2 — Détection d altération de montant dans HMAC]\n# Données : HMAC VERIFY key=SECRET_SHARED_KEY tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f text=TRANSACTION amount=9999 from=alice to=bob\nA_COMPLETER\n\n[Cas 3 — Rejet HMAC avec mauvaise clé secrète]\n# Données : HMAC VERIFY key=WRONG_KEY tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f text=TRANSACTION amount=5000 from=alice to=bob\nA_COMPLETER\n",
    "hints": [
      "Normalisez la clé à 64 octets puis calculez inner = sha256(ipad + msg) et outer = sha256(opad + inner).",
      "Le module standard hmac.new(key, msg, hashlib.sha256).hexdigest() produit également le résultat conforme."
    ],
    "examples": [
      {
        "stdin": "HMAC CALC key=SECRET_SHARED_KEY text=TRANSACTION amount=5000 from=alice to=bob",
        "expected": "HMAC: algo=SHA256 key_len=17 tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f",
        "note": "Code HMAC garantissant l authenticité du message avec la clé partagée."
      }
    ],
    "tests": [
      {
        "label": "Vérification HMAC valide",
        "stdin": "cas:1",
        "expected": "HMAC_VERIFY: status=AUTHENTIC"
      },
      {
        "label": "Détection d altération de montant dans HMAC",
        "stdin": "cas:2",
        "expected": "HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY"
      },
      {
        "label": "Rejet HMAC avec mauvaise clé secrète",
        "stdin": "cas:3",
        "expected": "HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY"
      }
    ],
    "solution": "[Exemple]\nHMAC: algo=SHA256 key_len=17 tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f\n\n[Cas 1 — Vérification HMAC valide]\nHMAC_VERIFY: status=AUTHENTIC\n\n[Cas 2 — Détection d altération de montant dans HMAC]\nHMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY\n\n[Cas 3 — Rejet HMAC avec mauvaise clé secrète]\nHMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY"
  },
  {
    "id": "cr3-c3-e3",
    "chapter": 3,
    "title": "Simulateur d'Attaque des Anniversaires et Détection de Collision",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la probabilité théorique de collision du paradoxe des anniversaires et rechercher une collision concrète sur un hachage tronqué.",
    "brief": "<p>Pour un espace d'empreintes de taille <code>N = 2^b</code>, la probabilité d'avoir au moins une collision après <code>k</code> essais vaut :<br>\n<code>P(collision) = 1 - exp(- (k * (k - 1)) / (2 * N))</code>.<br>\nLe seuil de probabilité 50% est atteint dès <code>k_{50%} = ceil(sqrt(2 * ln(2) * N))</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>COLLISION PROB bits=&lt;b&gt; attempts=&lt;k&gt;</code> :<br>\n   <code>PROB: bits=&lt;b&gt; N=&lt;N&gt; attempts=&lt;k&gt; prob=&lt;P:.4f&gt; threshold_50=&lt;k_50&gt;</code><br>\n2. <code>COLLISION SEARCH prefix=&lt;pref&gt; bits=&lt;b&gt; max_attempts=&lt;M&gt;</code> :<br>\n   Teste séquentiellement les messages <code>&lt;pref&gt;-0</code>, <code>&lt;pref&gt;-1</code>, etc. sur les <code>b // 4</code> premiers caractères hexadécimaux de SHA-256.<br>\n   - Si collision trouvée : <code>COLLISION_FOUND: hash=&lt;h&gt; msg1=&lt;pref&gt;-&lt;j&gt; msg2=&lt;pref&gt;-&lt;i&gt; attempts=&lt;total&gt;</code><br>\n   - Si non trouvée : <code>NO_COLLISION: tested=&lt;M&gt;</code></p>",
    "starter": "# Grille d'analyse (cr3-c3-e3) — Simulateur d'Attaque des Anniversaires et Détection de Collision\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Calcul probabilité collision 32 bits]\n# Données : COLLISION PROB bits=32 attempts=50000\nA_COMPLETER\n\n[Cas 2 — Recherche effective de collision sur 12 bits]\n# Données : COLLISION SEARCH prefix=NONCE bits=12 max_attempts=500\nA_COMPLETER\n\n[Cas 3 — Pas de collision détectée sous la limite max]\n# Données : COLLISION SEARCH prefix=NONCE bits=16 max_attempts=10\nA_COMPLETER\n",
    "hints": [
      "Appliquez la formule du paradoxe des anniversaires P = 1 - exp(-k(k-1)/(2N)) et déterminez le seuil à 50%.",
      "Pour la recherche de collision, extrayez le préfixe hexadécimal tronqué et détectez le premier doublon d'empreinte."
    ],
    "examples": [
      {
        "stdin": "COLLISION PROB bits=16 attempts=300",
        "expected": "PROB: bits=16 N=65536 attempts=300 prob=0.4956 threshold_50=302",
        "note": "Seulement 300 tirages sur 65536 valeurs suffisent pour atteindre près de 50% de chance de collision."
      }
    ],
    "tests": [
      {
        "label": "Calcul probabilité collision 32 bits",
        "stdin": "cas:1",
        "expected": "PROB: bits=32 N=4294967296 attempts=50000 prob=0.2525 threshold_50=77163"
      },
      {
        "label": "Recherche effective de collision sur 12 bits",
        "stdin": "cas:2",
        "expected": "COLLISION_FOUND: hash=167 msg1=NONCE-52 msg2=NONCE-166 attempts=167"
      },
      {
        "label": "Pas de collision détectée sous la limite max",
        "stdin": "cas:3",
        "expected": "NO_COLLISION: tested=10"
      }
    ],
    "solution": "[Exemple]\nPROB: bits=16 N=65536 attempts=300 prob=0.4956 threshold_50=302\n\n[Cas 1 — Calcul probabilité collision 32 bits]\nPROB: bits=32 N=4294967296 attempts=50000 prob=0.2525 threshold_50=77163\n\n[Cas 2 — Recherche effective de collision sur 12 bits]\nCOLLISION_FOUND: hash=167 msg1=NONCE-52 msg2=NONCE-166 attempts=167\n\n[Cas 3 — Pas de collision détectée sous la limite max]\nNO_COLLISION: tested=10"
  }
];
