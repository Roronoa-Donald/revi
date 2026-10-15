/**
 * Exercices du chapitre 2 — Cybersécurité B2.
 */
'use strict';

module.exports = [
  {
    "id": "cs2-c2-e1",
    "chapter": 2,
    "title": "Chiffrement symétrique par masque jetable XOR (Vernam)",
    "level": "n1",
    "language": "python",
    "goal": "Chiffrement symétrique par masque jetable XOR (Vernam)",
    "brief": "<p>Le masque jetable (One-Time Pad) inventé par Gilbert Vernam repose sur l’opération logique XOR bit à bit. Votre programme reçoit une chaîne hexadécimale représentant le texte en clair (ou chiffré) et une clé ASCII séparées par un point-virgule : <code>flux_hex;cle_ascii</code>.\n\nTraitement :\n1. Convertir le flux hexadécimal en liste d’octets (valeurs 0..255).\n2. Convertir la clé ASCII en liste d’octets de ses codes ASCII.\n3. Pour chaque octet $i$ du flux, calculer $octet_i \\oplus cle_{i \\pmod L}$ où $L$ est la longueur de la clé.\n4. Afficher le résultat sous forme de chaîne hexadécimale en minuscules (2 chiffres par octet).\n\nExemple : <code>48656c6c6f;KEY</code> &rarr; <code>032035272a</code></p>",
    "starter": "import sys\n\nligne = sys.stdin.read().strip()\n\n# À compléter : appliquer l’opération XOR octet par octet avec la clé cyclique\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "48656c6c6f;KEY",
        "expected": "032035272a",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "032035272a;KEY",
        "expected": "48656c6c6f"
      },
      {
        "label": "Test de validation 2",
        "stdin": "ffff;AB",
        "expected": "bebd"
      },
      {
        "label": "Test de validation 3",
        "stdin": "00112233;CYBER",
        "expected": "43486076"
      },
      {
        "label": "Test de validation 4",
        "stdin": "41424344;Z",
        "expected": "1b18191e"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.read().strip()\nif ligne:\n    flux_hex, cle_str = ligne.split(\";\")\n    flux_bytes = bytes.fromhex(flux_hex.strip())\n    cle_bytes = cle_str.encode(\"utf-8\")\n    cle_len = len(cle_bytes)\n    res = bytearray()\n    for i, b in enumerate(flux_bytes):\n        res.append(b ^ cle_bytes[i % cle_len])\n    print(res.hex())\n"
  },
  {
    "id": "cs2-c2-e2",
    "chapter": 2,
    "title": "Contrôle d’intégrité et détection de falsification SHA-256",
    "level": "n2",
    "language": "python",
    "goal": "Contrôle d’intégrité et détection de falsification SHA-256",
    "brief": "<p>Les fonctions de hachage cryptographique comme SHA-256 garantissent l’intégrité d’un message : la moindre modification d’un seul bit produit une empreinte radicalement différente (effet avalanche).\n\nEntrée : <code>message_texte;hash_attendu</code>\nTraitement :\n1. Calculer l’empreinte SHA-256 du texte en minuscules hexadécimales.\n2. Comparer avec le <code>hash_attendu</code> (insensible à la casse).\n3. Sortie :\n- Si identique : <code>INTEGRE (&lt;hash_calcule&gt;)</code>\n- Si différent : <code>FALSIFIE (&lt;hash_calcule&gt; != &lt;hash_attendu&gt;)</code>.</p>",
    "starter": "import sys, hashlib\n\nligne = sys.stdin.read().strip()\n\n# À compléter : calculer l’empreinte SHA-256 et vérifier l’intégrité\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "Transfert de 500 EUR;6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf",
        "expected": "INTEGRE (6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf)",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "Transfert de 500 EUR;0000000000000000000000000000000000000000000000000000000000000000",
        "expected": "FALSIFIE (6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf != 0000000000000000000000000000000000000000000000000000000000000000)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "Cybersecurite B2;4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a",
        "expected": "INTEGRE (4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "Cybersecurite B2;4F488E082C757C61D3E1AC9961723EA2C83A5C80595E6432800739ADEA006A0A",
        "expected": "INTEGRE (4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "Message legitime;1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "expected": "FALSIFIE (9fa3f8dc8ae6867d4a4271408066e8968866ff12a6ad261f4f427d2cd7e7f6e7 != 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef)"
      }
    ],
    "solution": "import sys, hashlib\n\nligne = sys.stdin.read().strip()\nif ligne:\n    msg, att = ligne.split(\";\")\n    h = hashlib.sha256(msg.encode(\"utf-8\")).hexdigest().lower()\n    att_clean = att.strip().lower()\n    if h == att_clean:\n        print(f\"INTEGRE ({h})\")\n    else:\n        print(f\"FALSIFIE ({h} != {att_clean})\")\n"
  },
  {
    "id": "cs2-c2-e3",
    "chapter": 2,
    "title": "Vérification de signature numérique asymétrique RSA",
    "level": "n3",
    "language": "python",
    "goal": "Vérification de signature numérique asymétrique RSA",
    "brief": "<p>Dans le schéma de signature RSA, l’émetteur signe un condensat $m$ avec sa clé privée $d$ : $s = m^d \\pmod n$. Le récepteur vérifie la signature à l’aide de la clé publique de l’émetteur $(e, n)$ en calculant : $m’ = s^e \\pmod n$.\n\nEntrée : Quatre entiers séparés par des points-virgules <code>m;s;e;n</code>.\nTraitement : Calculer $m’ = pow(s, e, n)$ grâce à l’exponentiation modulaire efficace.\nSortie :\n- Si $m’ == m$ : <code>VALIDE (m = &lt;m&gt;)</code>\n- Si $m’ <br>e m$ : <code>INVALIDE (obtenu: &lt;m’&gt;, attendu: &lt;m&gt;)</code>.</p>",
    "starter": "import sys\n\nligne = sys.stdin.read().strip()\n\n# À compléter : vérifier la signature RSA avec pow(s, e, n)\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "42;168;7;187",
        "expected": "VALIDE (m = 42)",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "42;89;7;187",
        "expected": "INVALIDE (obtenu: 166, attendu: 42)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "123;2746;17;3233",
        "expected": "VALIDE (m = 123)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "123;999;17;3233",
        "expected": "INVALIDE (obtenu: 2464, attendu: 123)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "7;4;3;33",
        "expected": "INVALIDE (obtenu: 31, attendu: 7)"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.read().strip()\nif ligne:\n    parts = [int(p.strip()) for p in ligne.split(\";\") if p.strip()]\n    m, s, e, n = parts\n    m_prime = pow(s, e, n)\n    if m_prime == m:\n        print(f\"VALIDE (m = {m})\")\n    else:\n        print(f\"INVALIDE (obtenu: {m_prime}, attendu: {m})\")\n"
  }
];
