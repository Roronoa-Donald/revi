/**
 * Exercices du Chapitre 2 : Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux).
 * Préfixe : cr3-c2-e
 */
'use strict';

module.exports = [
  {
    id: 'cr3-c2-e1',
    chapter: 2,
    title: 'Générateur Pseudo-Aléatoire LFSR et Chiffrement de Flux (Stream Cipher)',
    level: 'n1',
    language: 'python',
    goal: 'Implémenter un registre à décalage à rétroaction linéaire (LFSR) et effectuer un chiffrement de flux par XOR.',
    brief: `<p>Un LFSR (Linear Feedback Shift Register) est la brique de base des chiffrements par flux matériels (A5/1, E0).<br><br>
Fonctionnement :<br>
- À chaque cycle : le bit le plus à droite est émis (retiré du registre).<br>
- Le bit injecté à gauche (position 0) est le XOR des bits situés aux indices <code>taps</code> (0-indexés). Si un tap dépasse la longueur restante, il est XORé avec le bit émis.<br>
- Chaque octet du texte clair est chiffré par XOR avec 8 bits consécutifs du LFSR assemblés selon <code>(byte &lt;&lt; 1) | bit</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>LFSR ENC seed=&lt;bits&gt; taps=&lt;t1,t2,...&gt; text=&lt;texte&gt;</code> : produit <code>HEX: &lt;hex_str&gt;</code>.<br>
2. <code>LFSR DEC seed=&lt;bits&gt; taps=&lt;t1,t2,...&gt; hex=&lt;hex_str&gt;</code> : produit <code>PLAIN: &lt;texte&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le LFSR et le chiffrement de flux XOR
`,
    hints: [
      'Générez 8 bits par octet en décalant bit_val = (bit_val << 1) | bit pour former chaque octet de clé.',
      'Le chiffrement et le déchiffrement de flux utilisent la même opération bit à bit XOR : p ^ k et c ^ k.'
    ],
    examples: [
      {
        stdin: 'LFSR ENC seed=1011 taps=0,3 text=CRYPTO',
        expected: 'HEX: 9515F5DF0D51',
        note: 'Génération de 6 octets de flux à partir de la seed 1011 et XOR avec CRYPTO.'
      }
    ],
    tests: [
      {
        label: 'Déchiffrement de flux LFSR symétrique',
        stdin: 'LFSR DEC seed=1011 taps=0,3 hex=9515F5DF0D51',
        expected: 'PLAIN: CRYPTO'
      },
      {
        label: 'Chiffrement de flux avec seed 5 bits',
        stdin: 'LFSR ENC seed=11001 taps=1,4 text=SECRET_KEY',
        expected: 'HEX: C907F84D71D129752C53'
      },
      {
        label: 'Déchiffrement de flux seed 5 bits',
        stdin: 'LFSR DEC seed=11001 taps=1,4 hex=C907F84D71D129752C53',
        expected: 'PLAIN: SECRET_KEY'
      }
    ],
    solution: `import sys

def lfsr_keystream(state_str, taps_list, length_bytes):
    reg = [int(b) for b in state_str]
    stream_bytes = []
    for _ in range(length_bytes):
        byte_val = 0
        for _ in range(8):
            bit = reg.pop()
            fb = 0
            for t in taps_list:
                fb ^= reg[t] if t < len(reg) else bit
            reg.insert(0, fb)
            byte_val = (byte_val << 1) | bit
        stream_bytes.append(byte_val)
    return stream_bytes

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    action = parts[1]
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
    
    seed = params['seed']
    taps = [int(x) for x in params['taps'].split(',') if x.strip()]
    if action == 'ENC':
        data = params['text'].encode('utf-8')
        ks = lfsr_keystream(seed, taps, len(data))
        cipher = bytes([p ^ k for p, k in zip(data, ks)])
        print('HEX: ' + cipher.hex().upper())
    elif action == 'DEC':
        cipher = bytes.fromhex(params['hex'])
        ks = lfsr_keystream(seed, taps, len(cipher))
        plain = bytes([c ^ k for c, k in zip(cipher, ks)])
        print('PLAIN: ' + plain.decode('utf-8', errors='replace'))
`
  },
  {
    id: 'cr3-c2-e2',
    chapter: 2,
    title: 'Validateur et Applicateur de Bourrage PKCS#7 (Padding & Unpadding)',
    level: 'n2',
    language: 'python',
    goal: 'Implémenter le bourrage et débourrage PKCS#7 selon la RFC 5652 avec détection des blocs corrompus ou mal alignés.',
    brief: `<p>La norme PKCS#7 (RFC 5652) complète un message pour que sa taille en octets soit un multiple exact du bloc <code>B</code>.<br>
- Nombre d'octets ajoutés : <code>p = B - (len(M) mod B)</code> (si multiple exact, <code>p = B</code>).<br>
- Chaque octet de padding a pour valeur <code>p</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>PAD block_size=&lt;B&gt; text=&lt;texte&gt;</code> :<br>
   <code>PADDED: len=&lt;L&gt; pad=&lt;p&gt; hex=&lt;hex&gt;</code><br>
2. <code>UNPAD block_size=&lt;B&gt; hex=&lt;hex&gt;</code> :<br>
   - Si taille non multiple de B : <code>ERROR: INVALID_BLOCK_ALIGNMENT</code><br>
   - Si les p derniers octets ne valent pas tous p : <code>ERROR: INVALID_PADDING</code><br>
   - Sinon : <code>UNPADDED: len=&lt;L&gt; text=&lt;texte&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le padding et unpadding PKCS#7
`,
    hints: [
      'Calculez p = B - (len(data) % B) pour le padding.',
      'Pour l unpad, vérifiez data[-p:] == bytes([p] * p).'
    ],
    examples: [
      {
        stdin: 'PAD block_size=16 text=CONFIDENTIAL',
        expected: 'PADDED: len=16 pad=4 hex=434F4E464944454E5449414C04040404',
        note: 'Texte de 12 octets bourré avec 4 octets 0x04 pour atteindre 16 octets.'
      }
    ],
    tests: [
      {
        label: 'Débourrage PKCS#7 valide',
        stdin: 'UNPAD block_size=16 hex=434F4E464944454E5449414C04040404',
        expected: 'UNPADDED: len=12 text=CONFIDENTIAL'
      },
      {
        label: 'Bourrage bloc complet quand longueur multiple de B',
        stdin: 'PAD block_size=16 text=EXACT16BYTESMSG!',
        expected: 'PADDED: len=32 pad=16 hex=4558414354313642595445534D53472110101010101010101010101010101010'
      },
      {
        label: 'Rejet octet de bourrage corrompu',
        stdin: 'UNPAD block_size=16 hex=434F4E464944454E5449414C04040405',
        expected: 'ERROR: INVALID_PADDING'
      },
      {
        label: 'Rejet bloc non aligné sur la taille de bloc',
        stdin: 'UNPAD block_size=16 hex=434F4E4649',
        expected: 'ERROR: INVALID_BLOCK_ALIGNMENT'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    action = parts[0]
    params = {}
    if 'text=' in line:
        before, txt = line.split('text=', 1)
        params['text'] = txt
        for p in before.strip().split()[1:]:
            if '=' in p:
                k, v = p.split('=', 1)
                params[k] = v
    else:
        for p in parts[1:]:
            if '=' in p:
                k, v = p.split('=', 1)
                params[k] = v
    
    b_size = int(params['block_size'])
    if action == 'PAD':
        data = params['text'].encode('utf-8')
        p = b_size - (len(data) % b_size)
        padded = data + bytes([p] * p)
        print(f'PADDED: len={len(padded)} pad={p} hex={padded.hex().upper()}')
    elif action == 'UNPAD':
        try:
            data = bytes.fromhex(params['hex'])
        except ValueError:
            print('ERROR: INVALID_HEX')
            continue
        if len(data) == 0 or len(data) % b_size != 0:
            print('ERROR: INVALID_BLOCK_ALIGNMENT')
            continue
        p = data[-1]
        if p < 1 or p > b_size or data[-p:] != bytes([p] * p):
            print('ERROR: INVALID_PADDING')
            continue
        unpadded = data[:-p]
        print(f'UNPADDED: len={len(unpadded)} text={unpadded.decode("utf-8", errors="replace")}')
`
  },
  {
    id: 'cr3-c2-e3',
    chapter: 2,
    title: 'Simulateur de Mode Opératoire CBC (Cipher Block Chaining)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le chiffrement et déchiffrement en mode Cipher Block Chaining (CBC) avec vecteur d\'initialisation IV et padding PKCS#7 sur des blocs de 4 octets.',
    brief: `<p>En mode CBC, chaque bloc clair est XORé avec le bloc chiffré précédent avant d'entrer dans la fonction de bloc :<br>
<code>C_0 = E_K(P_0 ^ IV)</code>, puis <code>C_i = E_K(P_i ^ C_{i-1})</code>.<br>
Fonction de bloc pédagogique sur 4 octets :<br>
<code>E_K([x0, x1, x2, x3]) = [(x1 ^ k0), (x2 ^ k1), (x3 ^ k2), (x0 ^ k3)]</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>CBC ENC key=&lt;key_hex&gt; iv=&lt;iv_hex&gt; text=&lt;texte&gt;</code> :<br>
   <code>CBC_ENC: blocks=&lt;N&gt; hex=&lt;cipher_hex&gt;</code><br>
2. <code>CBC DEC key=&lt;key_hex&gt; iv=&lt;iv_hex&gt; hex=&lt;cipher_hex&gt;</code> :<br>
   <code>CBC_DEC: blocks=&lt;N&gt; text=&lt;plain_text&gt;</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le chiffrement et déchiffrement CBC 4 octets
`,
    hints: [
      'Implémentez block_enc et block_dec puis chaînez avec le bloc précédent prev initialized à iv.',
      'En déchiffrement, souvenez-vous que P_i = D_K(C_i) ^ prev, et mettez à jour prev = C_i après.'
    ],
    examples: [
      {
        stdin: 'CBC ENC key=A1B2C3D4 iv=10203040 text=CRYPTO_OK',
        expected: 'CBC_ENC: blocks=3 hex=D3DBD387353E0B539CBA93AA',
        note: 'Texte de 9 octets bourré à 12 octets et chiffré en mode CBC.'
      }
    ],
    tests: [
      {
        label: 'Déchiffrement CBC et débourrage réussi',
        stdin: 'CBC DEC key=A1B2C3D4 iv=10203040 hex=D3DBD387353E0B539CBA93AA',
        expected: 'CBC_DEC: blocks=3 text=CRYPTO_OK'
      },
      {
        label: 'Chiffrement CBC avec message multiple exact de 4',
        stdin: 'CBC ENC key=FF00AA55 iv=01020304 text=TEST',
        expected: 'CBC_ENC: blocks=2 hex=B850FA00ABFEAEE9'
      },
      {
        label: 'Déchiffrement CBC message multiple exact de 4',
        stdin: 'CBC DEC key=FF00AA55 iv=01020304 hex=B850FA00ABFEAEE9',
        expected: 'CBC_DEC: blocks=2 text=TEST'
      },
      {
        label: 'Rejet données non alignées sur 4 octets',
        stdin: 'CBC DEC key=A1B2C3D4 iv=10203040 hex=D3DB',
        expected: 'ERROR: INVALID_BLOCK_ALIGNMENT'
      }
    ],
    solution: `import sys

def block_enc(b4, k4):
    return bytes([b4[1] ^ k4[0], b4[2] ^ k4[1], b4[3] ^ k4[2], b4[0] ^ k4[3]])

def block_dec(c4, k4):
    return bytes([c4[3] ^ k4[3], c4[0] ^ k4[0], c4[1] ^ k4[1], c4[2] ^ k4[2]])

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    action = parts[1]
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
    
    key = bytes.fromhex(params['key'])
    iv = bytes.fromhex(params['iv'])
    if action == 'ENC':
        raw = params['text'].encode('utf-8')
        p = 4 - (len(raw) % 4)
        padded = raw + bytes([p] * p)
        blocks = [padded[i:i+4] for i in range(0, len(padded), 4)]
        cipher_blocks = []
        prev = iv
        for b in blocks:
            xored = bytes([x ^ y for x, y in zip(b, prev)])
            c = block_enc(xored, key)
            cipher_blocks.append(c)
            prev = c
        out_hex = b''.join(cipher_blocks).hex().upper()
        print(f'CBC_ENC: blocks={len(blocks)} hex={out_hex}')
    elif action == 'DEC':
        try:
            cipher_bytes = bytes.fromhex(params['hex'])
        except ValueError:
            print('ERROR: INVALID_HEX')
            continue
        if len(cipher_bytes) == 0 or len(cipher_bytes) % 4 != 0:
            print('ERROR: INVALID_BLOCK_ALIGNMENT')
            continue
        blocks = [cipher_bytes[i:i+4] for i in range(0, len(cipher_bytes), 4)]
        plain_blocks = []
        prev = iv
        for c in blocks:
            dec = block_dec(c, key)
            p = bytes([x ^ y for x, y in zip(dec, prev)])
            plain_blocks.append(p)
            prev = c
        raw = b''.join(plain_blocks)
        pad_val = raw[-1]
        if pad_val < 1 or pad_val > 4 or raw[-pad_val:] != bytes([pad_val] * pad_val):
            print('ERROR: INVALID_PADDING')
            continue
        unpadded = raw[:-pad_val]
        print(f'CBC_DEC: blocks={len(blocks)} text={unpadded.decode("utf-8", errors="replace")}')
`
  }
];
