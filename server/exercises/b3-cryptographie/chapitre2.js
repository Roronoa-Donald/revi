'use strict';

module.exports = [
  {
    "id": "cr3-c2-e1",
    "chapter": 2,
    "title": "Générateur Pseudo-Aléatoire LFSR et Chiffrement de Flux (Stream Cipher)",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter un registre à décalage à rétroaction linéaire (LFSR) et effectuer un chiffrement de flux par XOR.",
    "brief": "<p>Un LFSR (Linear Feedback Shift Register) est la brique de base des chiffrements par flux matériels (A5/1, E0).<br><br>\nFonctionnement :<br>\n- À chaque cycle : le bit le plus à droite est émis (retiré du registre).<br>\n- Le bit injecté à gauche (position 0) est le XOR des bits situés aux indices <code>taps</code> (0-indexés). Si un tap dépasse la longueur restante, il est XORé avec le bit émis.<br>\n- Chaque octet du texte clair est chiffré par XOR avec 8 bits consécutifs du LFSR assemblés selon <code>(byte &lt;&lt; 1) | bit</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>LFSR ENC seed=&lt;bits&gt; taps=&lt;t1,t2,...&gt; text=&lt;texte&gt;</code> : produit <code>HEX: &lt;hex_str&gt;</code>.<br>\n2. <code>LFSR DEC seed=&lt;bits&gt; taps=&lt;t1,t2,...&gt; hex=&lt;hex_str&gt;</code> : produit <code>PLAIN: &lt;texte&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c2-e1) — Générateur Pseudo-Aléatoire LFSR et Chiffrement de Flux (Stream Cipher)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déchiffrement de flux LFSR symétrique]\n# Données : LFSR DEC seed=1011 taps=0,3 hex=9515F5DF0D51\nA_COMPLETER\n\n[Cas 2 — Chiffrement de flux avec seed 5 bits]\n# Données : LFSR ENC seed=11001 taps=1,4 text=SECRET_KEY\nA_COMPLETER\n\n[Cas 3 — Déchiffrement de flux seed 5 bits]\n# Données : LFSR DEC seed=11001 taps=1,4 hex=C907F84D71D129752C53\nA_COMPLETER\n",
    "hints": [
      "Générez 8 bits par octet en décalant bit_val = (bit_val << 1) | bit pour former chaque octet de clé.",
      "Le chiffrement et le déchiffrement de flux utilisent la même opération bit à bit XOR : p ^ k et c ^ k."
    ],
    "examples": [
      {
        "stdin": "LFSR ENC seed=1011 taps=0,3 text=CRYPTO",
        "expected": "HEX: 9515F5DF0D51",
        "note": "Génération de 6 octets de flux à partir de la seed 1011 et XOR avec CRYPTO."
      }
    ],
    "tests": [
      {
        "label": "Déchiffrement de flux LFSR symétrique",
        "stdin": "cas:1",
        "expected": "PLAIN: CRYPTO"
      },
      {
        "label": "Chiffrement de flux avec seed 5 bits",
        "stdin": "cas:2",
        "expected": "HEX: C907F84D71D129752C53"
      },
      {
        "label": "Déchiffrement de flux seed 5 bits",
        "stdin": "cas:3",
        "expected": "PLAIN: SECRET_KEY"
      }
    ],
    "solution": "[Exemple]\nHEX: 9515F5DF0D51\n\n[Cas 1 — Déchiffrement de flux LFSR symétrique]\nPLAIN: CRYPTO\n\n[Cas 2 — Chiffrement de flux avec seed 5 bits]\nHEX: C907F84D71D129752C53\n\n[Cas 3 — Déchiffrement de flux seed 5 bits]\nPLAIN: SECRET_KEY"
  },
  {
    "id": "cr3-c2-e2",
    "chapter": 2,
    "title": "Validateur et Applicateur de Bourrage PKCS#7 (Padding & Unpadding)",
    "level": "n2",
    "language": "analyse",
    "goal": "Implémenter le bourrage et débourrage PKCS#7 selon la RFC 5652 avec détection des blocs corrompus ou mal alignés.",
    "brief": "<p>La norme PKCS#7 (RFC 5652) complète un message pour que sa taille en octets soit un multiple exact du bloc <code>B</code>.<br>\n- Nombre d'octets ajoutés : <code>p = B - (len(M) mod B)</code> (si multiple exact, <code>p = B</code>).<br>\n- Chaque octet de padding a pour valeur <code>p</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>PAD block_size=&lt;B&gt; text=&lt;texte&gt;</code> :<br>\n   <code>PADDED: len=&lt;L&gt; pad=&lt;p&gt; hex=&lt;hex&gt;</code><br>\n2. <code>UNPAD block_size=&lt;B&gt; hex=&lt;hex&gt;</code> :<br>\n   - Si taille non multiple de B : <code>ERROR: INVALID_BLOCK_ALIGNMENT</code><br>\n   - Si les p derniers octets ne valent pas tous p : <code>ERROR: INVALID_PADDING</code><br>\n   - Sinon : <code>UNPADDED: len=&lt;L&gt; text=&lt;texte&gt;</code></p>",
    "starter": "# Grille d'analyse (cr3-c2-e2) — Validateur et Applicateur de Bourrage PKCS#7 (Padding & Unpadding)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Débourrage PKCS#7 valide]\n# Données : UNPAD block_size=16 hex=434F4E464944454E5449414C04040404\nA_COMPLETER\n\n[Cas 2 — Bourrage bloc complet quand longueur multiple de B]\n# Données : PAD block_size=16 text=EXACT16BYTESMSG!\nA_COMPLETER\n\n[Cas 3 — Rejet octet de bourrage corrompu]\n# Données : UNPAD block_size=16 hex=434F4E464944454E5449414C04040405\nA_COMPLETER\n\n[Cas 4 — Rejet bloc non aligné sur la taille de bloc]\n# Données : UNPAD block_size=16 hex=434F4E4649\nA_COMPLETER\n",
    "hints": [
      "Le bourrage PKCS#7 complète un bloc de taille B en ajoutant P octets valant chacun la valeur numérique P.",
      "Pour valider le débourrage, vérifiez que tous les P derniers octets correspondent bien à la valeur P."
    ],
    "examples": [
      {
        "stdin": "PAD block_size=16 text=CONFIDENTIAL",
        "expected": "PADDED: len=16 pad=4 hex=434F4E464944454E5449414C04040404",
        "note": "Texte de 12 octets bourré avec 4 octets 0x04 pour atteindre 16 octets."
      }
    ],
    "tests": [
      {
        "label": "Débourrage PKCS#7 valide",
        "stdin": "cas:1",
        "expected": "UNPADDED: len=12 text=CONFIDENTIAL"
      },
      {
        "label": "Bourrage bloc complet quand longueur multiple de B",
        "stdin": "cas:2",
        "expected": "PADDED: len=32 pad=16 hex=4558414354313642595445534D53472110101010101010101010101010101010"
      },
      {
        "label": "Rejet octet de bourrage corrompu",
        "stdin": "cas:3",
        "expected": "ERROR: INVALID_PADDING"
      },
      {
        "label": "Rejet bloc non aligné sur la taille de bloc",
        "stdin": "cas:4",
        "expected": "ERROR: INVALID_BLOCK_ALIGNMENT"
      }
    ],
    "solution": "[Exemple]\nPADDED: len=16 pad=4 hex=434F4E464944454E5449414C04040404\n\n[Cas 1 — Débourrage PKCS#7 valide]\nUNPADDED: len=12 text=CONFIDENTIAL\n\n[Cas 2 — Bourrage bloc complet quand longueur multiple de B]\nPADDED: len=32 pad=16 hex=4558414354313642595445534D53472110101010101010101010101010101010\n\n[Cas 3 — Rejet octet de bourrage corrompu]\nERROR: INVALID_PADDING\n\n[Cas 4 — Rejet bloc non aligné sur la taille de bloc]\nERROR: INVALID_BLOCK_ALIGNMENT"
  },
  {
    "id": "cr3-c2-e3",
    "chapter": 2,
    "title": "Simulateur de Mode Opératoire CBC (Cipher Block Chaining)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le chiffrement et déchiffrement en mode Cipher Block Chaining (CBC) avec vecteur d'initialisation IV et padding PKCS#7 sur des blocs de 4 octets.",
    "brief": "<p>En mode CBC, chaque bloc clair est XORé avec le bloc chiffré précédent avant d'entrer dans la fonction de bloc :<br>\n<code>C_0 = E_K(P_0 ^ IV)</code>, puis <code>C_i = E_K(P_i ^ C_{i-1})</code>.<br>\nFonction de bloc pédagogique sur 4 octets :<br>\n<code>E_K([x0, x1, x2, x3]) = [(x1 ^ k0), (x2 ^ k1), (x3 ^ k2), (x0 ^ k3)]</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>CBC ENC key=&lt;key_hex&gt; iv=&lt;iv_hex&gt; text=&lt;texte&gt;</code> :<br>\n   <code>CBC_ENC: blocks=&lt;N&gt; hex=&lt;cipher_hex&gt;</code><br>\n2. <code>CBC DEC key=&lt;key_hex&gt; iv=&lt;iv_hex&gt; hex=&lt;cipher_hex&gt;</code> :<br>\n   <code>CBC_DEC: blocks=&lt;N&gt; text=&lt;plain_text&gt;</code></p>",
    "starter": "# Grille d'analyse (cr3-c2-e3) — Simulateur de Mode Opératoire CBC (Cipher Block Chaining)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déchiffrement CBC et débourrage réussi]\n# Données : CBC DEC key=A1B2C3D4 iv=10203040 hex=D3DBD387353E0B539CBA93AA\nA_COMPLETER\n\n[Cas 2 — Chiffrement CBC avec message multiple exact de 4]\n# Données : CBC ENC key=FF00AA55 iv=01020304 text=TEST\nA_COMPLETER\n\n[Cas 3 — Déchiffrement CBC message multiple exact de 4]\n# Données : CBC DEC key=FF00AA55 iv=01020304 hex=B850FA00ABFEAEE9\nA_COMPLETER\n\n[Cas 4 — Rejet données non alignées sur 4 octets]\n# Données : CBC DEC key=A1B2C3D4 iv=10203040 hex=D3DB\nA_COMPLETER\n",
    "hints": [
      "Implémentez block_enc et block_dec puis chaînez avec le bloc précédent prev initialized à iv.",
      "En déchiffrement, souvenez-vous que P_i = D_K(C_i) ^ prev, et mettez à jour prev = C_i après."
    ],
    "examples": [
      {
        "stdin": "CBC ENC key=A1B2C3D4 iv=10203040 text=CRYPTO_OK",
        "expected": "CBC_ENC: blocks=3 hex=D3DBD387353E0B539CBA93AA",
        "note": "Texte de 9 octets bourré à 12 octets et chiffré en mode CBC."
      }
    ],
    "tests": [
      {
        "label": "Déchiffrement CBC et débourrage réussi",
        "stdin": "cas:1",
        "expected": "CBC_DEC: blocks=3 text=CRYPTO_OK"
      },
      {
        "label": "Chiffrement CBC avec message multiple exact de 4",
        "stdin": "cas:2",
        "expected": "CBC_ENC: blocks=2 hex=B850FA00ABFEAEE9"
      },
      {
        "label": "Déchiffrement CBC message multiple exact de 4",
        "stdin": "cas:3",
        "expected": "CBC_DEC: blocks=2 text=TEST"
      },
      {
        "label": "Rejet données non alignées sur 4 octets",
        "stdin": "cas:4",
        "expected": "ERROR: INVALID_BLOCK_ALIGNMENT"
      }
    ],
    "solution": "[Exemple]\nCBC_ENC: blocks=3 hex=D3DBD387353E0B539CBA93AA\n\n[Cas 1 — Déchiffrement CBC et débourrage réussi]\nCBC_DEC: blocks=3 text=CRYPTO_OK\n\n[Cas 2 — Chiffrement CBC avec message multiple exact de 4]\nCBC_ENC: blocks=2 hex=B850FA00ABFEAEE9\n\n[Cas 3 — Déchiffrement CBC message multiple exact de 4]\nCBC_DEC: blocks=2 text=TEST\n\n[Cas 4 — Rejet données non alignées sur 4 octets]\nERROR: INVALID_BLOCK_ALIGNMENT"
  }
];
