'use strict';

module.exports = [
  {
    "id": "cs2-c2-e1",
    "chapter": 2,
    "title": "Chiffrement symétrique par masque jetable XOR (Vernam)",
    "level": "n1",
    "language": "analyse",
    "goal": "Chiffrement symétrique par masque jetable XOR (Vernam)",
    "brief": "<p>Le masque jetable (One-Time Pad) inventé par Gilbert Vernam repose sur l’opération logique XOR bit à bit. Votre programme reçoit une chaîne hexadécimale représentant le texte en clair (ou chiffré) et une clé ASCII séparées par un point-virgule : <code>flux_hex;cle_ascii</code>.\n\nTraitement :\n1. Convertir le flux hexadécimal en liste d’octets (valeurs 0..255).\n2. Convertir la clé ASCII en liste d’octets de ses codes ASCII.\n3. Pour chaque octet $i$ du flux, calculer $octet_i \\oplus cle_{i \\pmod L}$ où $L$ est la longueur de la clé.\n4. Afficher le résultat sous forme de chaîne hexadécimale en minuscules (2 chiffres par octet).\n\nExemple : <code>48656c6c6f;KEY</code> &rarr; <code>032035272a</code></p>",
    "starter": "# Grille d'analyse (cs2-c2-e1) — Chiffrement symétrique par masque jetable XOR (Vernam)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 032035272a;KEY\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : ffff;AB\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 00112233;CYBER\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 41424344;Z\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "48656c6c6f"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "bebd"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "43486076"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "1b18191e"
      }
    ],
    "solution": "[Exemple]\n032035272a\n\n[Cas 1 — Test de validation 1]\n48656c6c6f\n\n[Cas 2 — Test de validation 2]\nbebd\n\n[Cas 3 — Test de validation 3]\n43486076\n\n[Cas 4 — Test de validation 4]\n1b18191e"
  },
  {
    "id": "cs2-c2-e2",
    "chapter": 2,
    "title": "Contrôle d’intégrité et détection de falsification SHA-256",
    "level": "n2",
    "language": "analyse",
    "goal": "Contrôle d’intégrité et détection de falsification SHA-256",
    "brief": "<p>Les fonctions de hachage cryptographique comme SHA-256 garantissent l’intégrité d’un message : la moindre modification d’un seul bit produit une empreinte radicalement différente (effet avalanche).\n\nEntrée : <code>message_texte;hash_attendu</code>\nTraitement :\n1. Calculer l’empreinte SHA-256 du texte en minuscules hexadécimales.\n2. Comparer avec le <code>hash_attendu</code> (insensible à la casse).\n3. Sortie :\n- Si identique : <code>INTEGRE (&lt;hash_calcule&gt;)</code>\n- Si différent : <code>FALSIFIE (&lt;hash_calcule&gt; != &lt;hash_attendu&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c2-e2) — Contrôle d’intégrité et détection de falsification SHA-256\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : Transfert de 500 EUR;0000000000000000000000000000000000000000000000000000000000000000\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : Cybersecurite B2;4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : Cybersecurite B2;4F488E082C757C61D3E1AC9961723EA2C83A5C80595E6432800739ADEA006A0A\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : Message legitime;1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "FALSIFIE (6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf != 0000000000000000000000000000000000000000000000000000000000000000)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "INTEGRE (4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "INTEGRE (4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "FALSIFIE (9fa3f8dc8ae6867d4a4271408066e8968866ff12a6ad261f4f427d2cd7e7f6e7 != 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef)"
      }
    ],
    "solution": "[Exemple]\nINTEGRE (6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf)\n\n[Cas 1 — Test de validation 1]\nFALSIFIE (6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf != 0000000000000000000000000000000000000000000000000000000000000000)\n\n[Cas 2 — Test de validation 2]\nINTEGRE (4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a)\n\n[Cas 3 — Test de validation 3]\nINTEGRE (4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a)\n\n[Cas 4 — Test de validation 4]\nFALSIFIE (9fa3f8dc8ae6867d4a4271408066e8968866ff12a6ad261f4f427d2cd7e7f6e7 != 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef)"
  },
  {
    "id": "cs2-c2-e3",
    "chapter": 2,
    "title": "Vérification de signature numérique asymétrique RSA",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérification de signature numérique asymétrique RSA",
    "brief": "<p>Dans le schéma de signature RSA, l’émetteur signe un condensat $m$ avec sa clé privée $d$ : $s = m^d \\pmod n$. Le récepteur vérifie la signature à l’aide de la clé publique de l’émetteur $(e, n)$ en calculant : $m’ = s^e \\pmod n$.\n\nEntrée : Quatre entiers séparés par des points-virgules <code>m;s;e;n</code>.\nTraitement : Calculer $m’ = pow(s, e, n)$ grâce à l’exponentiation modulaire efficace.\nSortie :\n- Si $m’ == m$ : <code>VALIDE (m = &lt;m&gt;)</code>\n- Si $m’ <br>e m$ : <code>INVALIDE (obtenu: &lt;m’&gt;, attendu: &lt;m&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c2-e3) — Vérification de signature numérique asymétrique RSA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 42;89;7;187\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 123;2746;17;3233\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 123;999;17;3233\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 7;4;3;33\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "INVALIDE (obtenu: 166, attendu: 42)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "VALIDE (m = 123)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "INVALIDE (obtenu: 2464, attendu: 123)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "INVALIDE (obtenu: 31, attendu: 7)"
      }
    ],
    "solution": "[Exemple]\nVALIDE (m = 42)\n\n[Cas 1 — Test de validation 1]\nINVALIDE (obtenu: 166, attendu: 42)\n\n[Cas 2 — Test de validation 2]\nVALIDE (m = 123)\n\n[Cas 3 — Test de validation 3]\nINVALIDE (obtenu: 2464, attendu: 123)\n\n[Cas 4 — Test de validation 4]\nINVALIDE (obtenu: 31, attendu: 7)"
  }
];
