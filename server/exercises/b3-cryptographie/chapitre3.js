/**
 * Exercices du Chapitre 3 : Fonctions de Hachage, Intégrité et Authentification de Message (MAC).
 * Préfixe : cr3-c3-e
 */
'use strict';

module.exports = [
  {
    id: 'cr3-c3-e1',
    chapter: 3,
    title: 'Vérificateur d\'Intégrité et Comparateur d\'Empreintes (MD5, SHA-1, SHA-256)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer et vérifier les empreintes cryptographiques avec MD5, SHA-1 et SHA-256 et évaluer leur conformité de sécurité NIST.',
    brief: `<p>Les fonctions de hachage condensent un message en une empreinte de taille fixe.<br>
Statuts de sécurité NIST :<br>
- <code>md5</code> : 128 bits, <code>DEPRECATED (collision vulnerable)</code><br>
- <code>sha1</code> : 160 bits, <code>DEPRECATED (SHAttered attack)</code><br>
- <code>sha256</code> : 256 bits, <code>SECURE (NIST recommended)</code><br><br>
Commandes lues sur STDIN :<br>
1. <code>HASH algo=&lt;md5|sha1|sha256&gt; text=&lt;texte&gt;</code> :<br>
   <code>HASH: algo=&lt;ALGO&gt; bits=&lt;B&gt; status=&lt;STATUS&gt; digest=&lt;DIGEST&gt;</code><br>
2. <code>VERIFY algo=&lt;algo&gt; expected=&lt;hex&gt; text=&lt;texte&gt;</code> :<br>
   - Si conforme : <code>VERIFY: algo=&lt;ALGO&gt; match=OK</code><br>
   - Sinon : <code>VERIFY: algo=&lt;ALGO&gt; match=MISMATCH (integrity compromised)</code></p>`,
    starter: `import sys
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le calcul et la vérification d'empreintes
`,
    hints: [
      'Utilisez hashlib.md5(), hashlib.sha1() ou hashlib.sha256() sur les données text.encode("utf-8").',
      'Comparez les empreintes en convertissant les deux chaînes en minuscules avec .lower().'
    ],
    examples: [
      {
        stdin: 'HASH algo=sha256 text=SECURITE_INFORMATIQUE',
        expected: 'HASH: algo=SHA256 bits=256 status=SECURE (NIST recommended) digest=55be6350223b3da0e894a709edc0b1a193fe56325c97e8750262240935ef1958',
        note: 'Empreinte SHA-256 standard NIST avec 256 bits de sécurité.'
      }
    ],
    tests: [
      {
        label: 'Empreinte MD5 obsolète',
        stdin: 'HASH algo=md5 text=HELLO',
        expected: 'HASH: algo=MD5 bits=128 status=DEPRECATED (collision vulnerable) digest=eb61eead90e3b899c6bcbe27ac581660'
      },
      {
        label: 'Vérification intégrité conforme',
        stdin: 'VERIFY algo=sha256 expected=a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e text=Hello World',
        expected: 'VERIFY: algo=SHA256 match=OK'
      },
      {
        label: 'Détection d altération de données',
        stdin: 'VERIFY algo=sha256 expected=ffff text=Hello World',
        expected: 'VERIFY: algo=SHA256 match=MISMATCH (integrity compromised)'
      }
    ],
    solution: `import sys
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
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
    
    algo = params['algo'].lower()
    raw = params['text'].encode('utf-8')
    if algo == 'md5':
        h = hashlib.md5(raw).hexdigest().lower()
        bits = 128
        status = 'DEPRECATED (collision vulnerable)'
    elif algo == 'sha1':
        h = hashlib.sha1(raw).hexdigest().lower()
        bits = 160
        status = 'DEPRECATED (SHAttered attack)'
    elif algo == 'sha256':
        h = hashlib.sha256(raw).hexdigest().lower()
        bits = 256
        status = 'SECURE (NIST recommended)'
    else:
        continue
    
    if cmd == 'HASH':
        print(f'HASH: algo={algo.upper()} bits={bits} status={status} digest={h}')
    elif cmd == 'VERIFY':
        exp = params['expected'].lower()
        if h == exp:
            print(f'VERIFY: algo={algo.upper()} match=OK')
        else:
            print(f'VERIFY: algo={algo.upper()} match=MISMATCH (integrity compromised)')
`
  },
  {
    id: 'cr3-c3-e2',
    chapter: 3,
    title: 'Implémentation du Mécanisme HMAC (RFC 2104) et Intégrité Authentifiée',
    level: 'n2',
    language: 'python',
    goal: 'Implémenter le calcul et la validation d\'un code d\'authentification de message HMAC-SHA256 selon la RFC 2104.',
    brief: `<p>HMAC garantit intégrité et authenticité partagée avec une clé secrète K.<br>
Construction RFC 2104 (bloc 64 octets pour SHA-256) :<br>
- Clé ajustée à 64 octets (hachée si trop longue, complétée par des 0x00 si trop courte).<br>
- Constantes : <code>ipad = 0x36 * 64</code>, <code>opad = 0x5C * 64</code>.<br>
- <code>HMAC(K, M) = H((K ^ opad) || H((K ^ ipad) || M))</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>HMAC CALC key=&lt;cle&gt; text=&lt;texte&gt;</code> : produit <code>HMAC: algo=SHA256 key_len=&lt;L&gt; tag=&lt;tag_hex&gt;</code>.<br>
2. <code>HMAC VERIFY key=&lt;cle&gt; tag=&lt;tag_hex&gt; text=&lt;texte&gt;</code> :<br>
   - Si conforme : <code>HMAC_VERIFY: status=AUTHENTIC</code><br>
   - Sinon : <code>HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY</code>.</p>`,
    starter: `import sys
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le protocole HMAC-SHA256 RFC 2104
`,
    hints: [
      'Normalisez la clé à 64 octets puis calculez inner = sha256(ipad + msg) et outer = sha256(opad + inner).',
      'Le module standard hmac.new(key, msg, hashlib.sha256).hexdigest() produit également le résultat conforme.'
    ],
    examples: [
      {
        stdin: 'HMAC CALC key=SECRET_SHARED_KEY text=TRANSACTION amount=5000 from=alice to=bob',
        expected: 'HMAC: algo=SHA256 key_len=17 tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f',
        note: 'Code HMAC garantissant l authenticité du message avec la clé partagée.'
      }
    ],
    tests: [
      {
        label: 'Vérification HMAC valide',
        stdin: 'HMAC VERIFY key=SECRET_SHARED_KEY tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f text=TRANSACTION amount=5000 from=alice to=bob',
        expected: 'HMAC_VERIFY: status=AUTHENTIC'
      },
      {
        label: 'Détection d altération de montant dans HMAC',
        stdin: 'HMAC VERIFY key=SECRET_SHARED_KEY tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f text=TRANSACTION amount=9999 from=alice to=bob',
        expected: 'HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY'
      },
      {
        label: 'Rejet HMAC avec mauvaise clé secrète',
        stdin: 'HMAC VERIFY key=WRONG_KEY tag=6a6208b649730f219b0ee67e60670beb6da40f5b2719cdd342f2cfeb3a7a575f text=TRANSACTION amount=5000 from=alice to=bob',
        expected: 'HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY'
      }
    ],
    solution: `import sys
import hashlib

def compute_hmac_sha256(key_str, msg_str):
    k_bytes = key_str.encode('utf-8')
    m_bytes = msg_str.encode('utf-8')
    block_size = 64
    if len(k_bytes) > block_size:
        k_bytes = hashlib.sha256(k_bytes).digest()
    if len(k_bytes) < block_size:
        k_bytes = k_bytes + b'\\x00' * (block_size - len(k_bytes))
    
    ipad = bytes([b ^ 0x36 for b in k_bytes])
    opad = bytes([b ^ 0x5c for b in k_bytes])
    
    inner = hashlib.sha256(ipad + m_bytes).digest()
    outer = hashlib.sha256(opad + inner).hexdigest().lower()
    return outer

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
    
    key = params['key']
    text = params['text']
    tag = compute_hmac_sha256(key, text)
    if action == 'CALC':
        print(f'HMAC: algo=SHA256 key_len={len(key)} tag={tag}')
    elif action == 'VERIFY':
        expected = params['tag'].lower()
        if tag == expected:
            print('HMAC_VERIFY: status=AUTHENTIC')
        else:
            print('HMAC_VERIFY: status=TAMPERED_OR_INVALID_KEY')
`
  },
  {
    id: 'cr3-c3-e3',
    chapter: 3,
    title: 'Simulateur d\'Attaque des Anniversaires et Détection de Collision',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la probabilité théorique de collision du paradoxe des anniversaires et rechercher une collision concrète sur un hachage tronqué.',
    brief: `<p>Pour un espace d'empreintes de taille <code>N = 2^b</code>, la probabilité d'avoir au moins une collision après <code>k</code> essais vaut :<br>
<code>P(collision) = 1 - exp(- (k * (k - 1)) / (2 * N))</code>.<br>
Le seuil de probabilité 50% est atteint dès <code>k_{50%} = ceil(sqrt(2 * ln(2) * N))</code>.<br><br>
Commandes lues sur STDIN :<br>
1. <code>COLLISION PROB bits=&lt;b&gt; attempts=&lt;k&gt;</code> :<br>
   <code>PROB: bits=&lt;b&gt; N=&lt;N&gt; attempts=&lt;k&gt; prob=&lt;P:.4f&gt; threshold_50=&lt;k_50&gt;</code><br>
2. <code>COLLISION SEARCH prefix=&lt;pref&gt; bits=&lt;b&gt; max_attempts=&lt;M&gt;</code> :<br>
   Teste séquentiellement les messages <code>&lt;pref&gt;-0</code>, <code>&lt;pref&gt;-1</code>, etc. sur les <code>b // 4</code> premiers caractères hexadécimaux de SHA-256.<br>
   - Si collision trouvée : <code>COLLISION_FOUND: hash=&lt;h&gt; msg1=&lt;pref&gt;-&lt;j&gt; msg2=&lt;pref&gt;-&lt;i&gt; attempts=&lt;total&gt;</code><br>
   - Si non trouvée : <code>NO_COLLISION: tested=&lt;M&gt;</code></p>`,
    starter: `import sys
import math
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le calcul de probabilité et la recherche de collision
`,
    hints: [
      'Pour COLLISION PROB, utilisez math.exp(-(k*(k-1))/(2.0*N)) et math.ceil(math.sqrt(2.0*math.log(2)*N)).',
      'Pour COLLISION SEARCH, tronquez hexdigest()[:b//4] et indexez dans un dictionnaire vu[h] = index.'
    ],
    examples: [
      {
        stdin: 'COLLISION PROB bits=16 attempts=300',
        expected: 'PROB: bits=16 N=65536 attempts=300 prob=0.4956 threshold_50=302',
        note: 'Seulement 300 tirages sur 65536 valeurs suffisent pour atteindre près de 50% de chance de collision.'
      }
    ],
    tests: [
      {
        label: 'Calcul probabilité collision 32 bits',
        stdin: 'COLLISION PROB bits=32 attempts=50000',
        expected: 'PROB: bits=32 N=4294967296 attempts=50000 prob=0.2525 threshold_50=77163'
      },
      {
        label: 'Recherche effective de collision sur 12 bits',
        stdin: 'COLLISION SEARCH prefix=NONCE bits=12 max_attempts=500',
        expected: 'COLLISION_FOUND: hash=167 msg1=NONCE-52 msg2=NONCE-166 attempts=167'
      },
      {
        label: 'Pas de collision détectée sous la limite max',
        stdin: 'COLLISION SEARCH prefix=NONCE bits=16 max_attempts=10',
        expected: 'NO_COLLISION: tested=10'
      }
    ],
    solution: `import sys
import math
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.strip().split()
    cmd = parts[0]
    sub = parts[1]
    params = {}
    for p in parts[2:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
    
    if sub == 'PROB':
        b = int(params['bits'])
        k = int(params['attempts'])
        N = 2 ** b
        exponent = -(k * (k - 1)) / (2.0 * N)
        prob = 1.0 - math.exp(exponent)
        k50 = math.ceil(math.sqrt(2.0 * math.log(2) * N))
        print(f'PROB: bits={b} N={N} attempts={k} prob={prob:.4f} threshold_50={k50}')
    elif sub == 'SEARCH':
        prefix = params['prefix']
        b = int(params['bits'])
        max_att = int(params['max_attempts'])
        hex_chars = b // 4
        seen = {}
        found = False
        for i in range(max_att):
            msg = f'{prefix}-{i}'
            h = hashlib.sha256(msg.encode('utf-8')).hexdigest()[:hex_chars]
            if h in seen:
                print(f'COLLISION_FOUND: hash={h} msg1={prefix}-{seen[h]} msg2={msg} attempts={i+1}')
                found = True
                break
            seen[h] = i
        if not found:
            print(f'NO_COLLISION: tested={max_att}')
`
  }
];
