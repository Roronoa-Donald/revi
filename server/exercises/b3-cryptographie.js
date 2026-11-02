'use strict';

module.exports = [
  {
    "id": "cr3-c1-e1",
    "chapter": 1,
    "title": "Chiffrement et Déchiffrement de César et Substitution Affine",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser des cas de chiffrements de César et de substitution affine, avec calcul d’inverse modulaire.",
    "brief": "<p>Dans la cryptographie classique, le chiffrement par décalage de César applique la transformation :\n<code>C = (P + k) mod 26</code>.\nLe chiffrement par substitution affine généralise ce principe selon :\n<code>C = (a * P + b) mod 26</code>, où la clé multiplicative <code>a</code> doit être strictement première avec 26 (<code>pgcd(a, 26) == 1</code>) pour garantir l'inversibilité.<br><br>\nAnalysez les données fournies pour chaque cas. <code>CAESAR ENC k=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Décale chaque lettre de <code>k</code> positions (A=0, ..., Z=25). Les minuscules sont converties en majuscules, les caractères non alphabétiques sont préservés.<br>\n2. <code>CAESAR DEC k=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Déchiffre le texte avec la clé <code>k</code>.<br>\n3. <code>AFFINE ENC a=&lt;entier&gt; b=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Si <code>pgcd(a, 26) != 1</code>, utilisez le format <code>ERROR: &lt;motif&gt;</code> avec le motif <code>gcd(a,26)!=1</code>.<br>\n   Sinon chiffre selon <code>C = (a * P + b) mod 26</code>.<br>\n4. <code>AFFINE DEC a=&lt;entier&gt; b=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>\n   Si <code>pgcd(a, 26) != 1</code>, utilisez le format <code>ERROR: &lt;motif&gt;</code> avec le motif <code>gcd(a,26)!=1</code>.<br>\n   Sinon calcule <code>a_inv = pow(a, -1, 26)</code> et déchiffre selon <code>P = (a_inv * (C - b)) mod 26</code>.<br><br>\nPour toute opération réussie :<br>\n<code>OUT: &lt;texte_resultat&gt;</code></p>",
    "starter": "# Grille d'analyse (cr3-c1-e1) — Chiffrement de César et substitution affine\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déchiffrement de César]\n# Données : CAESAR DEC k=3 text=DWWDTXH D O'DXEH\nA_COMPLETER\n\n[Cas 2 — Opération B]\n# Données : AFFINE ENC a=5 b=8 text=SECRET\nA_COMPLETER\n\n[Cas 3 — Opération C]\n# Données : AFFINE DEC a=5 b=8 text=PCJW\nA_COMPLETER\n\n[Cas 4 — Opération D]\n# Données : AFFINE ENC a=4 b=3 text=HELLO\nA_COMPLETER\n",
    "hints": [
      "Comment associer chaque lettre à son indice sans modifier les espaces et la ponctuation ?",
      "Pour le chiffre affine, que faut-il vérifier sur a et 26 avant de chercher l’inverse modulaire ?"
    ],
    "examples": [
      {
        "stdin": "CAESAR ENC k=3 text=BONJOUR",
        "expected": "OUT: ERQMRXU",
        "note": "Chiffrement de César avec décalage de 3 positions."
      }
    ],
    "tests": [
      {
        "label": "Déchiffrement de César",
        "stdin": "cas:1",
        "expected": "OUT: ATTAQUE A L'AUBE"
      },
      {
        "label": "Chiffrement affine valide",
        "stdin": "cas:2",
        "expected": "OUT: UCSPCZ"
      },
      {
        "label": "Déchiffrement affine valide",
        "stdin": "cas:3",
        "expected": "OUT: REVI"
      },
      {
        "label": "Rejet clé affine non inversible",
        "stdin": "cas:4",
        "expected": "ERROR: gcd(a,26)!=1"
      }
    ],
    "solution": "[Exemple]\nOUT: ERQMRXU\n\n[Cas 1 — Déchiffrement de César]\nOUT: ATTAQUE A L'AUBE\n\n[Cas 2 — Chiffrement affine valide]\nOUT: UCSPCZ\n\n[Cas 3 — Déchiffrement affine valide]\nOUT: REVI\n\n[Cas 4 — Rejet clé affine non inversible]\nERROR: gcd(a,26)!=1"
  },
  {
    "id": "cr3-c1-e2",
    "chapter": 1,
    "title": "Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser Vigenère et examiner deux conditions nécessaires déclarées sans prétendre prouver la sécurité d’un masque jetable.",
    "brief": "<p>Le chiffre de Vigenère utilise une clé alphabétique répétée. Le masque jetable (Vernam / OTP) assure la confidentialité parfaite sous les hypothèses suivantes : clé secrète, uniformément aléatoire, indépendante du message, au moins aussi longue que lui et jamais réutilisée. Les longueurs et l’indicateur de réemploi sont des valeurs déclarées ; aucune clé ni aucun historique ne sont vérifiés. Ces paramètres ne permettent pas de démontrer la confidentialité parfaite : ils ne vérifient ni le secret, ni la distribution, ni l’indépendance. Une clé de zéros, assez longue et utilisée une seule fois, laisse pourtant le clair inchangé sous XOR.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>VIGENERE ENC key=&lt;cle&gt; text=&lt;texte&gt;</code> : chiffre le texte.<br>\n2. <code>VIGENERE DEC key=&lt;cle&gt; text=&lt;texte&gt;</code> : déchiffre le texte.<br>\n3. <code>OTP VERIFY key_len=&lt;k&gt; text_len=&lt;t&gt; reuse=&lt;true|false&gt;</code> compare seulement les longueurs déclarées et l’indicateur de réemploi :<br>\n   Utilisez <code>OTP: &lt;statut&gt; (&lt;detail&gt;)</code>. Les statuts possibles sont <code>INVALID</code> et <code>CONDITIONS_NECESSAIRES_OK</code>. Les détails possibles sont <code>key shorter than message</code>, <code>key reused, vulnerable to two-time pad attack</code> et <code>perfect secrecy not verified</code>. Vérifiez d’abord la longueur, ensuite le réemploi, puis l’absence de ces deux motifs de rejet.<br><br>\nPour VIGENERE : <code>OUT: &lt;texte_resultat&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c1-e2) — Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Opération A]\n# Données : VIGENERE DEC key=SECRET text=EIUJEZW GQEJBVIPKMXD\nA_COMPLETER\n\n[Cas 2 — Opération B]\n# Données : OTP VERIFY key_len=64 text_len=64 reuse=false\nA_COMPLETER\n\n[Cas 3 — Opération C]\n# Données : OTP VERIFY key_len=32 text_len=64 reuse=false\nA_COMPLETER\n\n[Cas 4 — Opération D]\n# Données : OTP VERIFY key_len=128 text_len=64 reuse=true\nA_COMPLETER\n",
    "hints": [
      "Pour Vigenère, avancez dans la clé uniquement sur les lettres et conservez les espaces.",
      "La longueur et le non-réemploi sont nécessaires mais ne prouvent ni le secret, ni l’uniformité, ni l’indépendance de la clé."
    ],
    "examples": [
      {
        "stdin": "VIGENERE ENC key=LUNE text=BONJOUR",
        "expected": "OUT: MIANZOE",
        "note": "Chiffrement polyalphabétique avec la clé LUNE répétée."
      }
    ],
    "tests": [
      {
        "label": "Déchiffrement de Vigenère",
        "stdin": "cas:1",
        "expected": "OUT: MESSAGE CONFIDENTIEL"
      },
      {
        "label": "Conditions nécessaires satisfaites, sécurité non vérifiée",
        "stdin": "cas:2",
        "expected": "OTP: CONDITIONS_NECESSAIRES_OK (perfect secrecy not verified)"
      },
      {
        "label": "Clé OTP trop courte",
        "stdin": "cas:3",
        "expected": "OTP: INVALID (key shorter than message)"
      },
      {
        "label": "Réutilisation de clé OTP interdite",
        "stdin": "cas:4",
        "expected": "OTP: INVALID (key reused, vulnerable to two-time pad attack)"
      }
    ],
    "solution": "[Exemple]\nOUT: MIANZOE\n\n[Cas 1 — Déchiffrement de Vigenère]\nOUT: MESSAGE CONFIDENTIEL\n\n[Cas 2 — Conditions nécessaires satisfaites, sécurité non vérifiée]\nOTP: CONDITIONS_NECESSAIRES_OK (perfect secrecy not verified)\n\n[Cas 3 — Clé OTP trop courte]\nOTP: INVALID (key shorter than message)\n\n[Cas 4 — Réutilisation de clé OTP interdite]\nOTP: INVALID (key reused, vulnerable to two-time pad attack)"
  },
  {
    "id": "cr3-c1-e3",
    "chapter": 1,
    "title": "Analyse Fréquentielle et Indice de Coïncidence (IC) pour Cryptanalyse",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer l’indice de coïncidence et les fréquences, puis appliquer un barème indicatif sans identifier le chiffrement avec certitude.",
    "brief": "<p>L'Indice de Coïncidence de Friedman est défini par :<br>\n<code>IC = sum(f_i * (f_i - 1)) / (N * (N - 1))</code><br>\noù <code>f_i</code> est la fréquence de chaque lettre (A-Z) et <code>N</code> est le nombre total de lettres.<br><br>\nOpérations soumises à l’analyse : <code>ANALYZE text=&lt;texte&gt;</code><br>\n1. Si <code>N &lt; 2</code>, utilisez le format <code>ERROR: &lt;motif&gt;</code> avec le motif <code>TEXT_TOO_SHORT</code>.<br>\n2. Calculer <code>IC</code> (4 décimales).<br>\n3. Attribuer une catégorie selon le barème fictif ci-dessous ; elle suggère une piste, sans identifier avec certitude le type de chiffrement :<br>\n   - Si <code>IC &gt;= 0.0650</code> : <code>TYPE=MONOALPHABETIC</code><br>\n   - Sinon si <code>IC &gt;= 0.0450</code> : <code>TYPE=POLYALPHABETIC_SHORT_KEY</code><br>\n   - Sinon : <code>TYPE=POLYALPHABETIC_OR_RANDOM</code><br>\n4. Identifier le top 3 : <code>TOP=L1(c1),L2(c2),L3(c3)</code> trié par occurrences décroissantes puis alphabétiquement.<br><br>\nFormat de sortie : <code>N=&lt;N&gt; IC=&lt;IC:.4f&gt; TYPE=&lt;TYPE&gt; TOP=&lt;TOP&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c1-e3) — Analyse Fréquentielle et Indice de Coïncidence (IC) pour Cryptanalyse\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Texte A]\n# Données : ANALYZE text=OH SHWLW FKDSHURQ URXJH VH SURPHQDLW GDQV OD IRUHW WRXW VHXO HW UHQFRQWUD OH ORXS\nA_COMPLETER\n\n[Cas 2 — Texte B]\n# Données : ANALYZE text=WZKX PLMZ OJQY RTVA BXZP QWMC VBNM LKJH GFDS AZXC VBNM QWER TYUI OPAS DFGH JKLL ZXC\nA_COMPLETER\n\n[Cas 3 — Texte C]\n# Données : ANALYZE text=A\nA_COMPLETER\n",
    "hints": [
      "Filtrez le texte pour ne conserver que les 26 lettres de l'alphabet en majuscules.",
      "Classez les lettres par nombre d'occurrences décroissant, puis par ordre alphabétique en cas d'égalité."
    ],
    "examples": [
      {
        "stdin": "ANALYZE text=LE PETIT CHAPERON ROUGE SE PROMENAIT DANS LA FORET TOUT SEUL ET RENCONTRA LE LOUP",
        "expected": "N=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=E(11),T(8),O(7)",
        "note": "Distribution naturelle en français produisant un IC élevé (0.0751 > 0.065)."
      }
    ],
    "tests": [
      {
        "label": "Texte chiffré par César conservant l IC monoalphabétique",
        "stdin": "cas:1",
        "expected": "N=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=H(11),W(8),R(7)"
      },
      {
        "label": "Texte aplati polyalphabétique ou aléatoire",
        "stdin": "cas:2",
        "expected": "N=67 IC=0.0294 TYPE=POLYALPHABETIC_OR_RANDOM TOP=Z(5),L(4),M(4)"
      },
      {
        "label": "Texte trop court pour le calcul d IC",
        "stdin": "cas:3",
        "expected": "ERROR: TEXT_TOO_SHORT"
      }
    ],
    "solution": "[Exemple]\nN=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=E(11),T(8),O(7)\n\n[Cas 1 — Texte chiffré par César conservant l IC monoalphabétique]\nN=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=H(11),W(8),R(7)\n\n[Cas 2 — Texte aplati polyalphabétique ou aléatoire]\nN=67 IC=0.0294 TYPE=POLYALPHABETIC_OR_RANDOM TOP=Z(5),L(4),M(4)\n\n[Cas 3 — Texte trop court pour le calcul d IC]\nERROR: TEXT_TOO_SHORT"
  },
  {
    "id": "cr3-c2-e1",
    "chapter": 2,
    "title": "Générateur Pseudo-Aléatoire LFSR et Chiffrement de Flux (Stream Cipher)",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter un registre à décalage à rétroaction linéaire (LFSR) et effectuer un chiffrement de flux par XOR.",
    "brief": "<p>Un LFSR (Linear Feedback Shift Register) est la brique de base des chiffrements par flux matériels (A5/1, E0).<br><br>\nFonctionnement :<br>\n- À chaque cycle : le bit le plus à droite est émis (retiré du registre).<br>\n- Le bit injecté à gauche (position 0) est le XOR des bits situés aux indices <code>taps</code> (0-indexés). Si un tap dépasse la longueur restante, il est XORé avec le bit émis.<br>\n- Chaque octet du texte clair est chiffré par XOR avec 8 bits consécutifs du LFSR assemblés selon <code>(byte &lt;&lt; 1) | bit</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>LFSR ENC seed=&lt;bits&gt; taps=&lt;t1,t2,...&gt; text=&lt;texte&gt;</code> : produit <code>HEX: &lt;hex_str&gt;</code>.<br>\n2. <code>LFSR DEC seed=&lt;bits&gt; taps=&lt;t1,t2,...&gt; hex=&lt;hex_str&gt;</code> : produit <code>PLAIN: &lt;texte&gt;</code>.</p>",
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
    "brief": "<p>La norme PKCS#7 (RFC 5652) complète un message pour que sa taille en octets soit un multiple exact du bloc <code>B</code>.<br>\n- Nombre d'octets ajoutés : <code>p = B - (len(M) mod B)</code> (si multiple exact, <code>p = B</code>).<br>\n- Chaque octet de padding a pour valeur <code>p</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>PAD block_size=&lt;B&gt; text=&lt;texte&gt;</code> :<br>\n   <code>PADDED: len=&lt;L&gt; pad=&lt;p&gt; hex=&lt;hex&gt;</code><br>\n2. <code>UNPAD block_size=&lt;B&gt; hex=&lt;hex&gt;</code> :<br>\n   - Si taille non multiple de B : <code>ERROR: INVALID_BLOCK_ALIGNMENT</code><br>\n   - Si les p derniers octets ne valent pas tous p : <code>ERROR: INVALID_PADDING</code><br>\n   - Sinon : <code>UNPADDED: len=&lt;L&gt; text=&lt;texte&gt;</code></p>",
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
    "brief": "<p>En mode CBC, chaque bloc clair est XORé avec le bloc chiffré précédent avant d'entrer dans la fonction de bloc :<br>\n<code>C_0 = E_K(P_0 ^ IV)</code>, puis <code>C_i = E_K(P_i ^ C_{i-1})</code>.<br>\nFonction de bloc pédagogique sur 4 octets :<br>\n<code>E_K([x0, x1, x2, x3]) = [(x1 ^ k0), (x2 ^ k1), (x3 ^ k2), (x0 ^ k3)]</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>CBC ENC key=&lt;key_hex&gt; iv=&lt;iv_hex&gt; text=&lt;texte&gt;</code> :<br>\n   <code>CBC_ENC: blocks=&lt;N&gt; hex=&lt;cipher_hex&gt;</code><br>\n2. <code>CBC DEC key=&lt;key_hex&gt; iv=&lt;iv_hex&gt; hex=&lt;cipher_hex&gt;</code> :<br>\n   <code>CBC_DEC: blocks=&lt;N&gt; text=&lt;plain_text&gt;</code></p>",
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
  },
  {
    "id": "cr3-c3-e1",
    "chapter": 3,
    "title": "Vérificateur d'Intégrité et Comparateur d'Empreintes (MD5, SHA-1, SHA-256)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer et vérifier les empreintes cryptographiques avec MD5, SHA-1 et SHA-256 et évaluer leur conformité de sécurité NIST.",
    "brief": "<p>Les fonctions de hachage condensent un message en une empreinte de taille fixe.<br>\nStatuts de sécurité NIST :<br>\n- <code>md5</code> : 128 bits, <code>DEPRECATED (collision vulnerable)</code><br>\n- <code>sha1</code> : 160 bits, <code>DEPRECATED (SHAttered attack)</code><br>\n- <code>sha256</code> : 256 bits, <code>SECURE (NIST recommended)</code><br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>HASH algo=&lt;md5|sha1|sha256&gt; text=&lt;texte&gt;</code> :<br>\n   <code>HASH: algo=&lt;ALGO&gt; bits=&lt;B&gt; status=&lt;STATUS&gt; digest=&lt;DIGEST&gt;</code><br>\n2. <code>VERIFY algo=&lt;algo&gt; expected=&lt;hex&gt; text=&lt;texte&gt;</code> :<br>\n   - Si conforme : <code>VERIFY: algo=&lt;ALGO&gt; match=OK</code><br>\n   - Sinon : <code>VERIFY: algo=&lt;ALGO&gt; match=MISMATCH (integrity compromised)</code></p>",
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
    "brief": "<p>HMAC garantit intégrité et authenticité partagée avec une clé secrète K.<br>\nConstruction RFC 2104 (bloc 64 octets pour SHA-256) :<br>\n- Clé ajustée à 64 octets (hachée si trop longue, complétée par des 0x00 si trop courte).<br>\n- Constantes : <code>ipad = 0x36 * 64</code>, <code>opad = 0x5C * 64</code>.<br>\n- <code>HMAC(K, M) = H((K ^ opad) || H((K ^ ipad) || M))</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>HMAC CALC key=&lt;cle&gt; text=&lt;texte&gt;</code> : produit <code>HMAC: algo=SHA256 key_len=&lt;L&gt; tag=&lt;tag_hex&gt;</code>.<br>\n2. <code>HMAC VERIFY key=&lt;cle&gt; tag=&lt;tag_hex&gt; text=&lt;texte&gt;</code> :<br>\n   - Si conforme : <code>HMAC_VERIFY: status=AUTHENTIC</code><br>\n   - Sinon : <code>HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY</code>.</p>",
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
    "brief": "<p>Pour un espace d'empreintes de taille <code>N = 2^b</code>, la probabilité d'avoir au moins une collision après <code>k</code> essais vaut :<br>\n<code>P(collision) = 1 - exp(- (k * (k - 1)) / (2 * N))</code>.<br>\nLe seuil de probabilité 50% est atteint dès <code>k_{50%} = ceil(sqrt(2 * ln(2) * N))</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>COLLISION PROB bits=&lt;b&gt; attempts=&lt;k&gt;</code> :<br>\n   <code>PROB: bits=&lt;b&gt; N=&lt;N&gt; attempts=&lt;k&gt; prob=&lt;P:.4f&gt; threshold_50=&lt;k_50&gt;</code><br>\n2. <code>COLLISION SEARCH prefix=&lt;pref&gt; bits=&lt;b&gt; max_attempts=&lt;M&gt;</code> :<br>\n   Testez séquentiellement les messages <code>&lt;pref&gt;-0</code>, <code>&lt;pref&gt;-1</code>, etc. sur les <code>b // 4</code> premiers caractères hexadécimaux de SHA-256.<br>\n   - Si collision trouvée : <code>COLLISION_FOUND: hash=&lt;h&gt; msg1=&lt;pref&gt;-&lt;j&gt; msg2=&lt;pref&gt;-&lt;i&gt; attempts=&lt;total&gt;</code><br>\n   - Si non trouvée : <code>NO_COLLISION: tested=&lt;M&gt;</code></p>",
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
  },
  {
    "id": "cr3-c4-e1",
    "chapter": 4,
    "title": "Algorithme d'Euclide Étendu et Inverse Modulaire",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter l'algorithme d'Euclide étendu, calculer les coefficients de Bézout (u, v) et déterminer l'inverse modulaire d'un entier.",
    "brief": "<p>Pour deux entiers <code>a</code> et <code>b</code>, le théorème de Bézout garantit :<br>\n<code>a * u + b * v = pgcd(a, b)</code>.<br>\nSi <code>pgcd(a, m) == 1</code>, l'inverse modulaire <code>inv = a^(-1) mod m</code> existe et vérifie <code>(a * inv) mod m == 1</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>EUCLID a=&lt;a&gt; b=&lt;b&gt;</code> :<br>\n   <code>EUCLID: a=&lt;a&gt; b=&lt;b&gt; gcd=&lt;g&gt; u=&lt;u&gt; v=&lt;v&gt;</code><br>\n2. <code>MODINV a=&lt;a&gt; m=&lt;m&gt;</code> :<br>\n   - Si <code>pgcd(a, m) != 1</code> : <code>ERROR: NO_MODULAR_INVERSE (gcd!=1)</code><br>\n   - Sinon : <code>MODINV: a=&lt;a&gt; m=&lt;m&gt; inv=&lt;inv&gt; check=(a*inv)%m=1</code></p>",
    "starter": "# Grille d'analyse (cr3-c4-e1) — Algorithme d'Euclide Étendu et Inverse Modulaire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Calcul inverse modulaire valide]\n# Données : MODINV a=17 m=3120\nA_COMPLETER\n\n[Cas 2 — Rejet entier non inversible car pgcd != 1]\n# Données : MODINV a=6 m=15\nA_COMPLETER\n\n[Cas 3 — Euclide étendu sur deux nombres premiers]\n# Données : EUCLID a=61 b=53\nA_COMPLETER\n",
    "hints": [
      "Implémentez la récursion d Euclide étendu : si b == 0 retourner (a, 1, 0) sinon (g, u1, v1) = ext(b, a%b) et retourner (g, v1, u1 - (a//b)*v1).",
      "Normalisez l inverse modulaire avec inv = u % m."
    ],
    "examples": [
      {
        "stdin": "EUCLID a=252 b=105",
        "expected": "EUCLID: a=252 b=105 gcd=21 u=-2 v=5",
        "note": "PGCD(252, 105) = 21 avec relation 252 * (-2) + 105 * 5 = 21."
      }
    ],
    "tests": [
      {
        "label": "Calcul inverse modulaire valide",
        "stdin": "cas:1",
        "expected": "MODINV: a=17 m=3120 inv=2753 check=(a*inv)%m=1"
      },
      {
        "label": "Rejet entier non inversible car pgcd != 1",
        "stdin": "cas:2",
        "expected": "ERROR: NO_MODULAR_INVERSE (gcd!=1)"
      },
      {
        "label": "Euclide étendu sur deux nombres premiers",
        "stdin": "cas:3",
        "expected": "EUCLID: a=61 b=53 gcd=1 u=20 v=-23"
      }
    ],
    "solution": "[Exemple]\nEUCLID: a=252 b=105 gcd=21 u=-2 v=5\n\n[Cas 1 — Calcul inverse modulaire valide]\nMODINV: a=17 m=3120 inv=2753 check=(a*inv)%m=1\n\n[Cas 2 — Rejet entier non inversible car pgcd != 1]\nERROR: NO_MODULAR_INVERSE (gcd!=1)\n\n[Cas 3 — Euclide étendu sur deux nombres premiers]\nEUCLID: a=61 b=53 gcd=1 u=20 v=-23"
  },
  {
    "id": "cr3-c4-e2",
    "chapter": 4,
    "title": "Simulateur du Protocole d'Échange de Clés Diffie-Hellman",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l'échange de clés Diffie-Hellman et démontrer la vulnérabilité à l'attaque de l'homme du milieu (MITM) en l'absence d'authentification.",
    "brief": "<p>Diffie-Hellman permet d'établir un secret commun à travers un canal public sans transmettre le secret :<br>\n- Clés publiques : <code>A = (g^a) mod p</code> et <code>B = (g^b) mod p</code>.<br>\n- Secrets partagés : <code>S_A = (B^a) mod p</code> et <code>S_B = (A^b) mod p</code> (avec <code>S_A == S_B</code>).<br>\nEn attaque Man-in-the-Middle (Mallory avec clés <code>m_a</code> et <code>m_b</code>) :<br>\n- Mallory intercepte et substitue ses propres clés publiques, négociant deux secrets distincts <code>S_{AM}</code> et <code>S_{BM}</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>DH EXCHANGE p=&lt;p&gt; g=&lt;g&gt; a=&lt;a&gt; b=&lt;b&gt;</code> :<br>\n   <code>DH: p=&lt;p&gt; g=&lt;g&gt; pub_alice=&lt;A&gt; pub_bob=&lt;B&gt; shared_secret=&lt;S&gt;</code><br>\n2. <code>DH MITM p=&lt;p&gt; g=&lt;g&gt; a=&lt;a&gt; b=&lt;b&gt; m_a=&lt;ma&gt; m_b=&lt;mb&gt;</code> :<br>\n   <code>MITM: secret_alice_mallory=&lt;S_AM&gt; secret_bob_mallory=&lt;S_BM&gt; status=COMPROMISED</code></p>",
    "starter": "# Grille d'analyse (cr3-c4-e2) — Simulateur du Protocole d'Échange de Clés Diffie-Hellman\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Diffie-Hellman avec modulus supérieur]\n# Données : DH EXCHANGE p=997 g=7 a=123 b=456\nA_COMPLETER\n\n[Cas 2 — Simulation attaque de l homme du milieu sans certificat]\n# Données : DH MITM p=23 g=5 a=6 b=15 m_a=3 m_b=4\nA_COMPLETER\n",
    "hints": [
      "Utilisez la fonction intégrée pow(base, exp, mod) pour une exponentiation modulaire rapide et exacte.",
      "Pour le MITM, Alice calcule pow(M_A, a, p) et Bob calcule pow(M_B, b, p)."
    ],
    "examples": [
      {
        "stdin": "DH EXCHANGE p=23 g=5 a=6 b=15",
        "expected": "DH: p=23 g=5 pub_alice=8 pub_bob=19 shared_secret=2",
        "note": "Alice et Bob dérivent le même secret partagé 2 sur un canal non sécurisé."
      }
    ],
    "tests": [
      {
        "label": "Diffie-Hellman avec modulus supérieur",
        "stdin": "cas:1",
        "expected": "DH: p=997 g=7 pub_alice=781 pub_bob=966 shared_secret=949"
      },
      {
        "label": "Simulation attaque de l homme du milieu sans certificat",
        "stdin": "cas:2",
        "expected": "MITM: secret_alice_mallory=6 secret_bob_mallory=3 status=COMPROMISED"
      }
    ],
    "solution": "[Exemple]\nDH: p=23 g=5 pub_alice=8 pub_bob=19 shared_secret=2\n\n[Cas 1 — Diffie-Hellman avec modulus supérieur]\nDH: p=997 g=7 pub_alice=781 pub_bob=966 shared_secret=949\n\n[Cas 2 — Simulation attaque de l homme du milieu sans certificat]\nMITM: secret_alice_mallory=6 secret_bob_mallory=3 status=COMPROMISED"
  },
  {
    "id": "cr3-c4-e3",
    "chapter": 4,
    "title": "Moteur Cryptographique RSA (Génération de Clés, Chiffrement et Déchiffrement)",
    "level": "n3",
    "language": "analyse",
    "goal": "Implémenter le cryptosystème asymétrique RSA (génération de clés, chiffrement et déchiffrement).",
    "brief": "<p>Algorithme RSA :<br>\n- <code>n = p * q</code>, <code>phi = (p - 1) * (q - 1)</code>.<br>\n- Clé publique : <code>(e, n)</code> avec <code>pgcd(e, phi) == 1</code>.<br>\n- Clé privée : <code>d = pow(e, -1, phi)</code>.<br>\n- Chiffrement : pour chaque caractère, <code>c = pow(ord(ch), e, n)</code>.<br>\n- Déchiffrement : <code>m = pow(c, d, n)</code> puis <code>chr(m)</code>.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>RSA KEYGEN p=&lt;p&gt; q=&lt;q&gt; e=&lt;e&gt;</code> : produit <code>RSA_KEYGEN: n=&lt;n&gt; phi=&lt;phi&gt; e=&lt;e&gt; d=&lt;d&gt;</code> (ou <code>ERROR: gcd(e,phi)!=1</code>).<br>\n2. <code>RSA ENC n=&lt;n&gt; e=&lt;e&gt; text=&lt;texte&gt;</code> : produit <code>RSA_ENC: cipher=&lt;c0,c1,...&gt;</code>.<br>\n3. <code>RSA DEC n=&lt;n&gt; d=&lt;d&gt; cipher=&lt;c0,c1,...&gt;</code> : produit <code>RSA_DEC: text=&lt;texte&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c4-e3) — Moteur Cryptographique RSA (Génération de Clés, Chiffrement et Déchiffrement)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chiffrement RSA caractère par caractère]\n# Données : RSA ENC n=3233 e=17 text=CRYPTO\nA_COMPLETER\n\n[Cas 2 — Déchiffrement RSA avec exposant privé]\n# Données : RSA DEC n=3233 d=2753 cipher=641,1859,99,2933,2159,1307\nA_COMPLETER\n\n[Cas 3 — Rejet exposant public non premier avec phi]\n# Données : RSA KEYGEN p=61 q=53 e=16\nA_COMPLETER\n",
    "hints": [
      "Calculez phi = (p - 1) * (q - 1) et testez math.gcd(e, phi) == 1 avant d inverser avec pow(e, -1, phi).",
      "Pour le chiffrement de texte, appliquez pow(ord(ch), e, n) et pour le déchiffrement chr(pow(c, d, n))."
    ],
    "examples": [
      {
        "stdin": "RSA KEYGEN p=61 q=53 e=17",
        "expected": "RSA_KEYGEN: n=3233 phi=3120 e=17 d=2753",
        "note": "Bi-clé RSA standard avec n=3233, e=17 et d=2753."
      }
    ],
    "tests": [
      {
        "label": "Chiffrement RSA caractère par caractère",
        "stdin": "cas:1",
        "expected": "RSA_ENC: cipher=641,1859,99,2933,2159,1307"
      },
      {
        "label": "Déchiffrement RSA avec exposant privé",
        "stdin": "cas:2",
        "expected": "RSA_DEC: text=CRYPTO"
      },
      {
        "label": "Rejet exposant public non premier avec phi",
        "stdin": "cas:3",
        "expected": "ERROR: gcd(e,phi)!=1"
      }
    ],
    "solution": "[Exemple]\nRSA_KEYGEN: n=3233 phi=3120 e=17 d=2753\n\n[Cas 1 — Chiffrement RSA caractère par caractère]\nRSA_ENC: cipher=641,1859,99,2933,2159,1307\n\n[Cas 2 — Déchiffrement RSA avec exposant privé]\nRSA_DEC: text=CRYPTO\n\n[Cas 3 — Rejet exposant public non premier avec phi]\nERROR: gcd(e,phi)!=1"
  },
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
  },
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
