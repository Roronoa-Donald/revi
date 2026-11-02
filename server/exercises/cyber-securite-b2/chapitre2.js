'use strict';

module.exports = [
  {
    "id": "cs2-c2-e1",
    "chapter": 2,
    "title": "Chiffrement symétrique par masque jetable XOR (Vernam)",
    "level": "n1",
    "language": "analyse",
    "goal": "Chiffrement symétrique par masque jetable XOR (Vernam)",
    "brief": "<p>Le masque jetable (One-Time Pad) inventé par Gilbert Vernam repose sur l’opération logique XOR bit à bit. L’étude de cas comporte une chaîne hexadécimale représentant le texte en clair (ou chiffré) et une clé ASCII séparées par un point-virgule : <code>flux_hex;cle_ascii</code>.\n\nTraitement :\n1. Convertir le flux hexadécimal en liste d’octets (valeurs 0..255).\n2. Convertir la clé ASCII en liste d’octets de ses codes ASCII.\n3. Pour chaque octet $i$ du flux, calculer $octet_i \\oplus cle_{i \\pmod L}$ où $L$ est la longueur de la clé.\n4. Afficher le résultat sous forme de chaîne hexadécimale en minuscules (2 chiffres par octet).</p>",
    "starter": "# Grille d'analyse (cs2-c2-e1) — Chiffrement symétrique par masque jetable XOR (Vernam)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 032035272a;KEY\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : ffff;AB\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 00112233;CYBER\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 41424344;Z\nA_COMPLETER\n",
    "hints": [
      "Le masque jetable (chiffre de Vernam) applique un OU exclusif (XOR) bit à bit entre le message clair et la clé.",
      "L’opération XOR est involutive : le chiffrement et le déchiffrement utilisent exactement la même opération."
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
    "title": "Comparaison SHA-256 et fiabilité de la référence",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer des empreintes en tenant compte de la fiabilité de la référence",
    "brief": "<p>Une empreinte SHA-256 ne détecte une modification par comparaison que si la référence est fiable : un adversaire peut modifier à la fois le message et l’empreinte fournie. La fiabilité est une hypothèse de la grille, à établir en pratique par une référence authentifiée, un MAC tel que HMAC ou une signature vérifiée avec une clé publique authentifiée.</p><p>Chaque cas est au format <code>provenance;message_texte;hash_attendu</code>, avec une provenance <code>fiable</code> ou <code>non_fiable</code>. Calculez SHA-256 sur les octets UTF-8 exacts du message, affichez l’empreinte en minuscules et comparez les empreintes sans tenir compte de la casse hexadécimale.</p><p>Répondez selon le format <code>SHA256=&lt;empreinte&gt; | COMPARAISON=&lt;IDENTIQUE ou DIFFERENTE&gt; | CONCLUSION=&lt;conclusion&gt;</code>. Avec une référence fiable, la conclusion est <code>AUCUNE_MODIFICATION_DETECTEE</code> si les empreintes correspondent, sinon <code>DIFFERENCE_DETECTEE</code>. Avec une référence non fiable, concluez toujours <code>INTEGRITE_NON_ETABLIE</code>, même en cas de correspondance. Une différence ne prouve pas une falsification, et une correspondance garde un risque résiduel de collision.</p>",
    "starter": "# Grille d'analyse (cs2-c2-e2) — Comparaison SHA-256 et fiabilité de la référence\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : fiable;Transfert de 500 EUR;0000000000000000000000000000000000000000000000000000000000000000\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : fiable;Cybersecurite B2;4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : fiable;Cybersecurite B2;4F488E082C757C61D3E1AC9961723EA2C83A5C80595E6432800739ADEA006A0A\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : non_fiable;Transfert de 900 EUR;30f821c94461cff75f24ea420033f1511b157cb7167a5efe43ade362b92c4140\nA_COMPLETER\n\n[Cas 5 — Test de validation 5]\n# Données : non_fiable;Transfert de 900 EUR;0000000000000000000000000000000000000000000000000000000000000000\nA_COMPLETER\n\n[Cas 6 — Test de validation 6]\n# Données : fiable;Message legitime;1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef\nA_COMPLETER\n",
    "hints": [
      "Calculez l’empreinte des octets exacts puis comparez-la à la référence sans distinguer majuscules et minuscules hexadécimales.",
      "Une correspondance avec une référence non fiable n’établit pas l’intégrité ; une différence ne permet pas d’attribuer une intention."
    ],
    "examples": [
      {
        "stdin": "fiable;Transfert de 500 EUR;6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf",
        "expected": "SHA256=6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf | COMPARAISON=IDENTIQUE | CONCLUSION=AUCUNE_MODIFICATION_DETECTEE",
        "note": "La fiabilité de la référence est supposée dans cet exemple."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "cas:1",
        "expected": "SHA256=6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf | COMPARAISON=DIFFERENTE | CONCLUSION=DIFFERENCE_DETECTEE"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "SHA256=4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a | COMPARAISON=IDENTIQUE | CONCLUSION=AUCUNE_MODIFICATION_DETECTEE"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "SHA256=4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a | COMPARAISON=IDENTIQUE | CONCLUSION=AUCUNE_MODIFICATION_DETECTEE"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "SHA256=30f821c94461cff75f24ea420033f1511b157cb7167a5efe43ade362b92c4140 | COMPARAISON=IDENTIQUE | CONCLUSION=INTEGRITE_NON_ETABLIE"
      },
      {
        "label": "Test de validation 5",
        "stdin": "cas:5",
        "expected": "SHA256=30f821c94461cff75f24ea420033f1511b157cb7167a5efe43ade362b92c4140 | COMPARAISON=DIFFERENTE | CONCLUSION=INTEGRITE_NON_ETABLIE"
      },
      {
        "label": "Test de validation 6",
        "stdin": "cas:6",
        "expected": "SHA256=9fa3f8dc8ae6867d4a4271408066e8968866ff12a6ad261f4f427d2cd7e7f6e7 | COMPARAISON=DIFFERENTE | CONCLUSION=DIFFERENCE_DETECTEE"
      }
    ],
    "solution": "[Exemple]\nSHA256=6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf | COMPARAISON=IDENTIQUE | CONCLUSION=AUCUNE_MODIFICATION_DETECTEE\n\n[Cas 1 — Test de validation 1]\nSHA256=6b120e5d190c04b00f51804bdd3daa3cfe22d81210f31321f69794f879c513bf | COMPARAISON=DIFFERENTE | CONCLUSION=DIFFERENCE_DETECTEE\n\n[Cas 2 — Test de validation 2]\nSHA256=4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a | COMPARAISON=IDENTIQUE | CONCLUSION=AUCUNE_MODIFICATION_DETECTEE\n\n[Cas 3 — Test de validation 3]\nSHA256=4f488e082c757c61d3e1ac9961723ea2c83a5c80595e6432800739adea006a0a | COMPARAISON=IDENTIQUE | CONCLUSION=AUCUNE_MODIFICATION_DETECTEE\n\n[Cas 4 — Test de validation 4]\nSHA256=30f821c94461cff75f24ea420033f1511b157cb7167a5efe43ade362b92c4140 | COMPARAISON=IDENTIQUE | CONCLUSION=INTEGRITE_NON_ETABLIE\n\n[Cas 5 — Test de validation 5]\nSHA256=30f821c94461cff75f24ea420033f1511b157cb7167a5efe43ade362b92c4140 | COMPARAISON=DIFFERENTE | CONCLUSION=INTEGRITE_NON_ETABLIE\n\n[Cas 6 — Test de validation 6]\nSHA256=9fa3f8dc8ae6867d4a4271408066e8968866ff12a6ad261f4f427d2cd7e7f6e7 | COMPARAISON=DIFFERENTE | CONCLUSION=DIFFERENCE_DETECTEE"
  },
  {
    "id": "cs2-c2-e3",
    "chapter": 2,
    "title": "Vérification de signature numérique asymétrique RSA",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérification de signature numérique asymétrique RSA",
    "brief": "<p>Ce modèle RSA jouet illustre uniquement une égalité arithmétique : le RSA brut n’est pas un schéma de signature sûr contre les falsifications. Ici, <code>VALIDE</code> signifie seulement que l’égalité est vérifiée, sans établir l’intégrité ni l’identité. En pratique, utiliser un schéma normalisé tel que RSA-PSS et authentifier la clé publique du signataire.</p><p>Dans ce modèle, l’émetteur calcule $s = m^d \\pmod n$ à partir d’un entier $m$ et de sa clé privée $d$. Le récepteur calcule $m' = s^e \\pmod n$ avec $(e, n)$.\n\nEntrée : Quatre entiers séparés par des points-virgules <code>m;s;e;n</code>.\nTraitement : Calculer $m' = pow(s, e, n)$ grâce à l’exponentiation modulaire efficace.\nRésultat d’analyse attendu :\n- Si $m' == m$ : <code>VALIDE (m = &lt;m&gt;)</code>\n- Si $m' \\ne m$ : <code>INVALIDE (obtenu: &lt;m'&gt;, attendu: &lt;m&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c2-e3) — Vérification de signature numérique asymétrique RSA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 42;89;7;187\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 123;2746;17;3233\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 123;999;17;3233\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 7;4;3;33\nA_COMPLETER\n",
    "hints": [
      "Dans cette grille, VALIDE désigne une égalité arithmétique et non une signature résistante aux falsifications.",
      "Une signature réelle utilise un schéma sûr tel que RSA-PSS et se vérifie avec une clé publique authentifiée."
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
