/**
 * Exercices du Chapitre 4 : Cryptographie Asymétrique & Arithmétique Modulaire.
 * Préfixe : cr3-c4-e
 */
'use strict';

module.exports = [
  {
    id: 'cr3-c4-e1',
    chapter: 4,
    title: 'Algorithme d\'Euclide Étendu et Inverse Modulaire',
    level: 'n1',
    language: 'python',
    goal: 'Implémenter l\'algorithme d\'Euclide étendu, calculer les coefficients de Bézout (u, v) et déterminer l\'inverse modulaire d\'un entier.',
    brief: `<p>Pour deux entiers <code>a</code> et <code>b</code>, le théorème de Bézout garantit :<br>
<code>a * u + b * v = pgcd(a, b)</code>.<br>
Si <code>pgcd(a, m) == 1</code>, l'inverse modulaire <code>inv = a^(-1) mod m</code> existe et vérifie <code>(a * inv) mod m == 1</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>EUCLID a=&lt;a&gt; b=&lt;b&gt;</code> :<br>
   <code>EUCLID: a=&lt;a&gt; b=&lt;b&gt; gcd=&lt;g&gt; u=&lt;u&gt; v=&lt;v&gt;</code><br>
2. <code>MODINV a=&lt;a&gt; m=&lt;m&gt;</code> :<br>
   - Si <code>pgcd(a, m) != 1</code> : <code>ERROR: NO_MODULAR_INVERSE (gcd!=1)</code><br>
   - Sinon : <code>MODINV: a=&lt;a&gt; m=&lt;m&gt; inv=&lt;inv&gt; check=(a*inv)%m=1</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'algorithme d'Euclide étendu et inverse modulaire
`,
    hints: [
      'Implémentez la récursion d Euclide étendu : si b == 0 retourner (a, 1, 0) sinon (g, u1, v1) = ext(b, a%b) et retourner (g, v1, u1 - (a//b)*v1).',
      'Normalisez l inverse modulaire avec inv = u % m.'
    ],
    examples: [
      {
        stdin: 'EUCLID a=252 b=105',
        expected: 'EUCLID: a=252 b=105 gcd=21 u=-2 v=5',
        note: 'PGCD(252, 105) = 21 avec relation 252 * (-2) + 105 * 5 = 21.'
      }
    ],
    tests: [
      {
        label: 'Calcul inverse modulaire valide',
        stdin: 'MODINV a=17 m=3120',
        expected: 'MODINV: a=17 m=3120 inv=2753 check=(a*inv)%m=1'
      },
      {
        label: 'Rejet entier non inversible car pgcd != 1',
        stdin: 'MODINV a=6 m=15',
        expected: 'ERROR: NO_MODULAR_INVERSE (gcd!=1)'
      },
      {
        label: 'Euclide étendu sur deux nombres premiers',
        stdin: 'EUCLID a=61 b=53',
        expected: 'EUCLID: a=61 b=53 gcd=1 u=20 v=-23'
      }
    ],
    solution: `import sys

def ext_euclid(a, b):
    if b == 0:
        return a, 1, 0
    g, u1, v1 = ext_euclid(b, a % b)
    u = v1
    v = u1 - (a // b) * v1
    return g, u, v

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = int(v)
    
    if cmd == 'EUCLID':
        a, b = params['a'], params['b']
        g, u, v = ext_euclid(a, b)
        print(f'EUCLID: a={a} b={b} gcd={g} u={u} v={v}')
    elif cmd == 'MODINV':
        a, m = params['a'], params['m']
        g, u, v = ext_euclid(a, m)
        if g != 1:
            print('ERROR: NO_MODULAR_INVERSE (gcd!=1)')
        else:
            inv = u % m
            chk = (a * inv) % m
            print(f'MODINV: a={a} m={m} inv={inv} check=(a*inv)%m={chk}')
`
  },
  {
    id: 'cr3-c4-e2',
    chapter: 4,
    title: 'Simulateur du Protocole d\'Échange de Clés Diffie-Hellman',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l\'échange de clés Diffie-Hellman et démontrer la vulnérabilité à l\'attaque de l\'homme du milieu (MITM) en l\'absence d\'authentification.',
    brief: `<p>Diffie-Hellman permet d'établir un secret commun à travers un canal public sans transmettre le secret :<br>
- Clés publiques : <code>A = (g^a) mod p</code> et <code>B = (g^b) mod p</code>.<br>
- Secrets partagés : <code>S_A = (B^a) mod p</code> et <code>S_B = (A^b) mod p</code> (avec <code>S_A == S_B</code>).<br>
En attaque Man-in-the-Middle (Mallory avec clés <code>m_a</code> et <code>m_b</code>) :<br>
- Mallory intercepte et substitue ses propres clés publiques, négociant deux secrets distincts <code>S_{AM}</code> et <code>S_{BM}</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>DH EXCHANGE p=&lt;p&gt; g=&lt;g&gt; a=&lt;a&gt; b=&lt;b&gt;</code> :<br>
   <code>DH: p=&lt;p&gt; g=&lt;g&gt; pub_alice=&lt;A&gt; pub_bob=&lt;B&gt; shared_secret=&lt;S&gt;</code><br>
2. <code>DH MITM p=&lt;p&gt; g=&lt;g&gt; a=&lt;a&gt; b=&lt;b&gt; m_a=&lt;ma&gt; m_b=&lt;mb&gt;</code> :<br>
   <code>MITM: secret_alice_mallory=&lt;S_AM&gt; secret_bob_mallory=&lt;S_BM&gt; status=COMPROMISED</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter Diffie-Hellman et simulation MITM
`,
    hints: [
      'Utilisez la fonction intégrée pow(base, exp, mod) pour une exponentiation modulaire rapide et exacte.',
      'Pour le MITM, Alice calcule pow(M_A, a, p) et Bob calcule pow(M_B, b, p).'
    ],
    examples: [
      {
        stdin: 'DH EXCHANGE p=23 g=5 a=6 b=15',
        expected: 'DH: p=23 g=5 pub_alice=8 pub_bob=19 shared_secret=2',
        note: 'Alice et Bob dérivent le même secret partagé 2 sur un canal non sécurisé.'
      }
    ],
    tests: [
      {
        label: 'Diffie-Hellman avec modulus supérieur',
        stdin: 'DH EXCHANGE p=997 g=7 a=123 b=456',
        expected: 'DH: p=997 g=7 pub_alice=781 pub_bob=966 shared_secret=949'
      },
      {
        label: 'Simulation attaque de l homme du milieu sans certificat',
        stdin: 'DH MITM p=23 g=5 a=6 b=15 m_a=3 m_b=4',
        expected: 'MITM: secret_alice_mallory=6 secret_bob_mallory=3 status=COMPROMISED'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    sub = parts[1]
    params = {}
    for p in parts[2:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = int(v)
    
    p = params['p']
    g = params['g']
    a = params['a']
    b = params['b']
    
    if sub == 'EXCHANGE':
        A = pow(g, a, p)
        B = pow(g, b, p)
        sa = pow(B, a, p)
        print(f'DH: p={p} g={g} pub_alice={A} pub_bob={B} shared_secret={sa}')
    elif sub == 'MITM':
        ma = params['m_a']
        mb = params['m_b']
        MA = pow(g, ma, p)
        MB = pow(g, mb, p)
        s_alice = pow(MA, a, p)
        s_bob = pow(MB, b, p)
        print(f'MITM: secret_alice_mallory={s_alice} secret_bob_mallory={s_bob} status=COMPROMISED')
`
  },
  {
    id: 'cr3-c4-e3',
    chapter: 4,
    title: 'Moteur Cryptographique RSA (Génération de Clés, Chiffrement et Déchiffrement)',
    level: 'n3',
    language: 'python',
    goal: 'Implémenter le cryptosystème asymétrique RSA (génération de clés, chiffrement et déchiffrement).',
    brief: `<p>Algorithme RSA :<br>
- <code>n = p * q</code>, <code>phi = (p - 1) * (q - 1)</code>.<br>
- Clé publique : <code>(e, n)</code> avec <code>pgcd(e, phi) == 1</code>.<br>
- Clé privée : <code>d = pow(e, -1, phi)</code>.<br>
- Chiffrement : pour chaque caractère, <code>c = pow(ord(ch), e, n)</code>.<br>
- Déchiffrement : <code>m = pow(c, d, n)</code> puis <code>chr(m)</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>RSA KEYGEN p=&lt;p&gt; q=&lt;q&gt; e=&lt;e&gt;</code> : produit <code>RSA_KEYGEN: n=&lt;n&gt; phi=&lt;phi&gt; e=&lt;e&gt; d=&lt;d&gt;</code> (ou <code>ERROR: gcd(e,phi)!=1</code>).<br>
2. <code>RSA ENC n=&lt;n&gt; e=&lt;e&gt; text=&lt;texte&gt;</code> : produit <code>RSA_ENC: cipher=&lt;c0,c1,...&gt;</code>.<br>
3. <code>RSA DEC n=&lt;n&gt; d=&lt;d&gt; cipher=&lt;c0,c1,...&gt;</code> : produit <code>RSA_DEC: text=&lt;texte&gt;</code>.</p>`,
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la génération de clé, chiffrement et déchiffrement RSA
`,
    hints: [
      'Calculez phi = (p - 1) * (q - 1) et testez math.gcd(e, phi) == 1 avant d inverser avec pow(e, -1, phi).',
      'Pour le chiffrement de texte, appliquez pow(ord(ch), e, n) et pour le déchiffrement chr(pow(c, d, n)).'
    ],
    examples: [
      {
        stdin: 'RSA KEYGEN p=61 q=53 e=17',
        expected: 'RSA_KEYGEN: n=3233 phi=3120 e=17 d=2753',
        note: 'Bi-clé RSA standard avec n=3233, e=17 et d=2753.'
      }
    ],
    tests: [
      {
        label: 'Chiffrement RSA caractère par caractère',
        stdin: 'RSA ENC n=3233 e=17 text=CRYPTO',
        expected: 'RSA_ENC: cipher=641,1859,99,2933,2159,1307'
      },
      {
        label: 'Déchiffrement RSA avec exposant privé',
        stdin: 'RSA DEC n=3233 d=2753 cipher=641,1859,99,2933,2159,1307',
        expected: 'RSA_DEC: text=CRYPTO'
      },
      {
        label: 'Rejet exposant public non premier avec phi',
        stdin: 'RSA KEYGEN p=61 q=53 e=16',
        expected: 'ERROR: gcd(e,phi)!=1'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    sub = parts[1]
    params = {}
    if 'text=' in line:
        before, txt = line.split('text=', 1)
        params['text'] = txt
        for p in before.strip().split()[2:]:
            if '=' in p:
                k, v = p.split('=', 1)
                params[k] = v
    else:
        for p in parts[2:]:
            if '=' in p:
                k, v = p.split('=', 1)
                params[k] = v
    
    if sub == 'KEYGEN':
        p, q, e = int(params['p']), int(params['q']), int(params['e'])
        n = p * q
        phi = (p - 1) * (q - 1)
        if math.gcd(e, phi) != 1:
            print('ERROR: gcd(e,phi)!=1')
            continue
        d = pow(e, -1, phi)
        print(f'RSA_KEYGEN: n={n} phi={phi} e={e} d={d}')
    elif sub == 'ENC':
        n, e = int(params['n']), int(params['e'])
        txt = params['text']
        cipher_vals = [str(pow(ord(ch), e, n)) for ch in txt]
        print('RSA_ENC: cipher=' + ','.join(cipher_vals))
    elif sub == 'DEC':
        n, d = int(params['n']), int(params['d'])
        cipher_vals = [int(x) for x in params['cipher'].split(',') if x.strip()]
        chars = [chr(pow(c, d, n)) for c in cipher_vals]
        print('RSA_DEC: text=' + ''.join(chars))
`
  }
];
