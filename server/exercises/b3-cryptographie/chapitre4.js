'use strict';

module.exports = [
  {
    "id": "cr3-c4-e1",
    "chapter": 4,
    "title": "Algorithme d'Euclide Étendu et Inverse Modulaire",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter l'algorithme d'Euclide étendu, calculer les coefficients de Bézout (u, v) et déterminer l'inverse modulaire d'un entier.",
    "brief": "<p>Pour deux entiers <code>a</code> et <code>b</code>, le théorème de Bézout garantit :<br>\n<code>a * u + b * v = pgcd(a, b)</code>.<br>\nSi <code>pgcd(a, m) == 1</code>, l'inverse modulaire <code>inv = a^(-1) mod m</code> existe et vérifie <code>(a * inv) mod m == 1</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>EUCLID a=&lt;a&gt; b=&lt;b&gt;</code> :<br>\n   <code>EUCLID: a=&lt;a&gt; b=&lt;b&gt; gcd=&lt;g&gt; u=&lt;u&gt; v=&lt;v&gt;</code><br>\n2. <code>MODINV a=&lt;a&gt; m=&lt;m&gt;</code> :<br>\n   - Si <code>pgcd(a, m) != 1</code> : <code>ERROR: NO_MODULAR_INVERSE (gcd!=1)</code><br>\n   - Sinon : <code>MODINV: a=&lt;a&gt; m=&lt;m&gt; inv=&lt;inv&gt; check=(a*inv)%m=1</code></p>",
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
    "brief": "<p>Diffie-Hellman permet d'établir un secret commun à travers un canal public sans transmettre le secret :<br>\n- Clés publiques : <code>A = (g^a) mod p</code> et <code>B = (g^b) mod p</code>.<br>\n- Secrets partagés : <code>S_A = (B^a) mod p</code> et <code>S_B = (A^b) mod p</code> (avec <code>S_A == S_B</code>).<br>\nEn attaque Man-in-the-Middle (Mallory avec clés <code>m_a</code> et <code>m_b</code>) :<br>\n- Mallory intercepte et substitue ses propres clés publiques, négociant deux secrets distincts <code>S_{AM}</code> et <code>S_{BM}</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>DH EXCHANGE p=&lt;p&gt; g=&lt;g&gt; a=&lt;a&gt; b=&lt;b&gt;</code> :<br>\n   <code>DH: p=&lt;p&gt; g=&lt;g&gt; pub_alice=&lt;A&gt; pub_bob=&lt;B&gt; shared_secret=&lt;S&gt;</code><br>\n2. <code>DH MITM p=&lt;p&gt; g=&lt;g&gt; a=&lt;a&gt; b=&lt;b&gt; m_a=&lt;ma&gt; m_b=&lt;mb&gt;</code> :<br>\n   <code>MITM: secret_alice_mallory=&lt;S_AM&gt; secret_bob_mallory=&lt;S_BM&gt; status=COMPROMISED</code></p>",
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
    "brief": "<p>Algorithme RSA :<br>\n- <code>n = p * q</code>, <code>phi = (p - 1) * (q - 1)</code>.<br>\n- Clé publique : <code>(e, n)</code> avec <code>pgcd(e, phi) == 1</code>.<br>\n- Clé privée : <code>d = pow(e, -1, phi)</code>.<br>\n- Chiffrement : pour chaque caractère, <code>c = pow(ord(ch), e, n)</code>.<br>\n- Déchiffrement : <code>m = pow(c, d, n)</code> puis <code>chr(m)</code>.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>RSA KEYGEN p=&lt;p&gt; q=&lt;q&gt; e=&lt;e&gt;</code> : produit <code>RSA_KEYGEN: n=&lt;n&gt; phi=&lt;phi&gt; e=&lt;e&gt; d=&lt;d&gt;</code> (ou <code>ERROR: gcd(e,phi)!=1</code>).<br>\n2. <code>RSA ENC n=&lt;n&gt; e=&lt;e&gt; text=&lt;texte&gt;</code> : produit <code>RSA_ENC: cipher=&lt;c0,c1,...&gt;</code>.<br>\n3. <code>RSA DEC n=&lt;n&gt; d=&lt;d&gt; cipher=&lt;c0,c1,...&gt;</code> : produit <code>RSA_DEC: text=&lt;texte&gt;</code>.</p>",
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
  }
];
