/**
 * Exercices du Chapitre 1 : Fondements, Principes de Sécurité et Chiffrements Historiques.
 * Préfixe : cr3-c1-e
 */
'use strict';

module.exports = [
  {
    id: 'cr3-c1-e1',
    chapter: 1,
    title: 'Chiffrement et Déchiffrement de César et Substitution Affine',
    level: 'n1',
    language: 'python',
    goal: 'Implémenter les chiffrements classiques de César (décalage mod 26) et de substitution affine avec calcul d\'inverse modulaire.',
    brief: `<p>Dans la cryptographie classique, le chiffrement par décalage de César applique la transformation :
<code>C = (P + k) mod 26</code>.
Le chiffrement par substitution affine généralise ce principe selon :
<code>C = (a * P + b) mod 26</code>, où la clé multiplicative <code>a</code> doit être strictement première avec 26 (<code>pgcd(a, 26) == 1</code>) pour garantir l'inversibilité.<br><br>
Le script lit sur STDIN des commandes sous les formes suivantes :<br>
1. <code>CAESAR ENC k=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>
   Décale chaque lettre de <code>k</code> positions (A=0, ..., Z=25). Les minuscules sont converties en majuscules, les caractères non alphabétiques sont préservés.<br>
2. <code>CAESAR DEC k=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>
   Déchiffre le texte avec la clé <code>k</code>.<br>
3. <code>AFFINE ENC a=&lt;entier&gt; b=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>
   Si <code>pgcd(a, 26) != 1</code>, affiche <code>ERROR: gcd(a,26)!=1</code>.<br>
   Sinon chiffre selon <code>C = (a * P + b) mod 26</code>.<br>
4. <code>AFFINE DEC a=&lt;entier&gt; b=&lt;entier&gt; text=&lt;texte&gt;</code> :<br>
   Si <code>pgcd(a, 26) != 1</code>, affiche <code>ERROR: gcd(a,26)!=1</code>.<br>
   Sinon calcule <code>a_inv = pow(a, -1, 26)</code> et déchiffre selon <code>P = (a_inv * (C - b)) mod 26</code>.<br><br>
Pour toute opération réussie :<br>
<code>OUT: &lt;texte_resultat&gt;</code></p>`,
    starter: `import sys
import math
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter César et substitution affine mod 26
`,
    hints: [
      'Pour isoler text=, découpez la ligne en recherchant text= afin de préserver les espaces dans le message.',
      'Utilisez math.gcd(a, 26) pour tester l inversibilité et pow(a, -1, 26) pour calculer l inverse modulaire en Python 3.8+.'
    ],
    examples: [
      {
        stdin: 'CAESAR ENC k=3 text=ATTAQUE A L\'AUBE',
        expected: 'OUT: DWWDTXH D O\'DXEH',
        note: 'Chiffrement de César avec décalage de 3 positions.'
      }
    ],
    tests: [
      {
        label: 'Déchiffrement de César',
        stdin: 'CAESAR DEC k=3 text=DWWDTXH D O\'DXEH',
        expected: 'OUT: ATTAQUE A L\'AUBE'
      },
      {
        label: 'Chiffrement affine valide',
        stdin: 'AFFINE ENC a=5 b=8 text=SECRET',
        expected: 'OUT: UCSPCZ'
      },
      {
        label: 'Déchiffrement affine valide',
        stdin: 'AFFINE DEC a=5 b=8 text=UCSPCZ',
        expected: 'OUT: SECRET'
      },
      {
        label: 'Rejet clé affine non inversible',
        stdin: 'AFFINE ENC a=4 b=3 text=HELLO',
        expected: 'ERROR: gcd(a,26)!=1'
      }
    ],
    solution: `import sys
import math
import re

def parse_line(line):
    m = re.match(r'^([A-Z]+)\\s+([A-Z]+)\\s+(.*)$', line)
    if not m:
        return None, None, {}
    cmd, action, rest = m.groups()
    params = {}
    if 'text=' in rest:
        before_text, text_val = rest.split('text=', 1)
        params['text'] = text_val
        for p in before_text.strip().split():
            if '=' in p:
                k, v = p.split('=', 1)
                params[k] = v
    else:
        for p in rest.strip().split():
            if '=' in p:
                k, v = p.split('=', 1)
                params[k] = v
    return cmd, action, params

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    cmd, action, params = parse_line(line)
    if not cmd:
        continue
    if cmd == 'CAESAR':
        k = int(params['k']) % 26
        shift = k if action == 'ENC' else -k
        res = []
        for ch in params.get('text', '').upper():
            if 'A' <= ch <= 'Z':
                res.append(chr((ord(ch) - 65 + shift) % 26 + 65))
            else:
                res.append(ch)
        print('OUT: ' + ''.join(res))
    elif cmd == 'AFFINE':
        a = int(params['a'])
        b = int(params['b'])
        if math.gcd(a, 26) != 1:
            print('ERROR: gcd(a,26)!=1')
            continue
        if action == 'ENC':
            res = []
            for ch in params.get('text', '').upper():
                if 'A' <= ch <= 'Z':
                    res.append(chr(((ord(ch) - 65) * a + b) % 26 + 65))
                else:
                    res.append(ch)
            print('OUT: ' + ''.join(res))
        else:
            a_inv = pow(a, -1, 26)
            res = []
            for ch in params.get('text', '').upper():
                if 'A' <= ch <= 'Z':
                    res.append(chr((a_inv * (ord(ch) - 65 - b)) % 26 + 65))
                else:
                    res.append(ch)
            print('OUT: ' + ''.join(res))
`
  },
  {
    id: 'cr3-c1-e2',
    chapter: 1,
    title: 'Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)',
    level: 'n2',
    language: 'python',
    goal: 'Réaliser le chiffrement et le déchiffrement polyalphabétique de Vigenère et valider les propriétés de sécurité d\'un masque jetable (One-Time Pad).',
    brief: `<p>Le chiffre de Vigenère utilise une clé alphabétique répétée pour masquer les fréquences de lettres. Le masque jetable (Vernam / OTP) offre une confidentialité théorique parfaite si et seulement si la clé est purement aléatoire, au moins aussi longue que le message, et jamais réutilisée.<br><br>
Commandes lues sur STDIN :<br>
1. <code>VIGENERE ENC key=&lt;cle&gt; text=&lt;texte&gt;</code> : chiffre le texte.<br>
2. <code>VIGENERE DEC key=&lt;cle&gt; text=&lt;texte&gt;</code> : déchiffre le texte.<br>
3. <code>OTP VERIFY key_len=&lt;k&gt; text_len=&lt;t&gt; reuse=&lt;true|false&gt;</code> :<br>
   - Si <code>key_len &lt; text_len</code> : <code>OTP: INVALID (key shorter than message)</code><br>
   - Sinon si <code>reuse == true</code> : <code>OTP: INVALID (key reused, vulnerable to two-time pad attack)</code><br>
   - Sinon : <code>OTP: VALID (perfect secrecy achieved)</code><br><br>
Pour les opérations VIGENERE : <code>OUT: &lt;texte_resultat&gt;</code>.</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter Vigenère et vérificateur OTP
`,
    hints: [
      'Maintenez un index ki incrémenté uniquement lorsque le caractère courant est une lettre alphabétique.',
      'Pour OTP, vérifiez d abord si key_len < text_len, puis si reuse est true, sinon déclarez valide.'
    ],
    examples: [
      {
        stdin: 'VIGENERE ENC key=SECRET text=MESSAGE CONFIDENTIEL',
        expected: 'OUT: EIUJEZW GQEJBVIPKMXD',
        note: 'Chiffrement polyalphabétique avec la clé SECRET répétée.'
      }
    ],
    tests: [
      {
        label: 'Déchiffrement de Vigenère',
        stdin: 'VIGENERE DEC key=SECRET text=EIUJEZW GQEJBVIPKMXD',
        expected: 'OUT: MESSAGE CONFIDENTIEL'
      },
      {
        label: 'Validation OTP conforme',
        stdin: 'OTP VERIFY key_len=64 text_len=64 reuse=false',
        expected: 'OTP: VALID (perfect secrecy achieved)'
      },
      {
        label: 'Clé OTP trop courte',
        stdin: 'OTP VERIFY key_len=32 text_len=64 reuse=false',
        expected: 'OTP: INVALID (key shorter than message)'
      },
      {
        label: 'Réutilisation de clé OTP interdite',
        stdin: 'OTP VERIFY key_len=128 text_len=64 reuse=true',
        expected: 'OTP: INVALID (key reused, vulnerable to two-time pad attack)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if line.startswith('VIGENERE'):
        m = re.match(r'^VIGENERE\\s+(ENC|DEC)\\s+key=(\\S+)\\s+text=(.*)$', line)
        if not m:
            continue
        action, key, text = m.groups()
        key = key.upper()
        res = []
        ki = 0
        klen = len(key)
        for ch in text.upper():
            if 'A' <= ch <= 'Z':
                shift = ord(key[ki % klen]) - 65
                if action == 'DEC':
                    shift = -shift
                res.append(chr((ord(ch) - 65 + shift) % 26 + 65))
                ki += 1
            else:
                res.append(ch)
        print('OUT: ' + ''.join(res))
    elif line.startswith('OTP'):
        m = re.match(r'^OTP\\s+VERIFY\\s+key_len=(\\d+)\\s+text_len=(\\d+)\\s+reuse=(true|false)$', line)
        if not m:
            continue
        klen, tlen, reuse = int(m.group(1)), int(m.group(2)), m.group(3) == 'true'
        if klen < tlen:
            print('OTP: INVALID (key shorter than message)')
        elif reuse:
            print('OTP: INVALID (key reused, vulnerable to two-time pad attack)')
        else:
            print('OTP: VALID (perfect secrecy achieved)')
`
  },
  {
    id: 'cr3-c1-e3',
    chapter: 1,
    title: 'Analyse Fréquentielle et Indice de Coïncidence (IC) pour Cryptanalyse',
    level: 'n3',
    language: 'python',
    goal: 'Calculer l\'Indice de Coïncidence (IC) d\'un texte et identifier les fréquences majeures pour distinguer chiffrement monoalphabétique et polyalphabétique.',
    brief: `<p>L'Indice de Coïncidence de Friedman est défini par :<br>
<code>IC = sum(f_i * (f_i - 1)) / (N * (N - 1))</code><br>
où <code>f_i</code> est la fréquence de chaque lettre (A-Z) et <code>N</code> est le nombre total de lettres.<br><br>
Commandes sur STDIN : <code>ANALYZE text=&lt;texte&gt;</code><br>
1. Si <code>N &lt; 2</code> : <code>ERROR: TEXT_TOO_SHORT</code>.<br>
2. Calculer <code>IC</code> (4 décimales).<br>
3. Qualifier le type :<br>
   - Si <code>IC &gt;= 0.0650</code> : <code>TYPE=MONOALPHABETIC</code><br>
   - Sinon si <code>IC &gt;= 0.0450</code> : <code>TYPE=POLYALPHABETIC_SHORT_KEY</code><br>
   - Sinon : <code>TYPE=POLYALPHABETIC_OR_RANDOM</code><br>
4. Identifier le top 3 : <code>TOP=L1(c1),L2(c2),L3(c3)</code> trié par occurrences décroissantes puis alphabétiquement.<br><br>
Format de sortie : <code>N=&lt;N&gt; IC=&lt;IC:.4f&gt; TYPE=&lt;TYPE&gt; TOP=&lt;TOP&gt;</code>.</p>`,
    starter: `import sys
import collections

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'Indice de Coïncidence et qualifier le chiffrement
`,
    hints: [
      'Filtrez les caractères avec [ch for ch in text.upper() if "A" <= ch <= "Z"].',
      'Triez les fréquences avec sorted(counts.items(), key=lambda x: (-x[1], x[0])).'
    ],
    examples: [
      {
        stdin: 'ANALYZE text=LE PETIT CHAPERON ROUGE SE PROMENAIT DANS LA FORET TOUT SEUL ET RENCONTRA LE LOUP',
        expected: 'N=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=E(11),T(8),O(7)',
        note: 'Distribution naturelle en français produisant un IC élevé (0.0751 > 0.065).'
      }
    ],
    tests: [
      {
        label: 'Texte chiffré par César conservant l IC monoalphabétique',
        stdin: 'ANALYZE text=OH SHWLW FKDSHURQ URXJH VH SURPHQDLW GDQV OD IRUHW WRXW VHXO HW UHQFRQWUD OH ORXS',
        expected: 'N=67 IC=0.0751 TYPE=MONOALPHABETIC TOP=H(11),W(8),R(7)'
      },
      {
        label: 'Texte aplati polyalphabétique ou aléatoire',
        stdin: 'ANALYZE text=WZKX PLMZ OJQY RTVA BXZP QWMC VBNM LKJH GFDS AZXC VBNM QWER TYUI OPAS DFGH JKLL ZXC',
        expected: 'N=67 IC=0.0294 TYPE=POLYALPHABETIC_OR_RANDOM TOP=Z(5),L(4),M(4)'
      },
      {
        label: 'Texte trop court pour le calcul d IC',
        stdin: 'ANALYZE text=A',
        expected: 'ERROR: TEXT_TOO_SHORT'
      }
    ],
    solution: `import sys
import collections

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if not 'text=' in line:
        continue
    text = line.split('text=', 1)[1]
    letters = [ch for ch in text.upper() if 'A' <= ch <= 'Z']
    n = len(letters)
    if n < 2:
        print('ERROR: TEXT_TOO_SHORT')
        continue
    counts = collections.Counter(letters)
    num = sum(f * (f - 1) for f in counts.values())
    den = n * (n - 1)
    ic = num / den
    if ic >= 0.0650:
        typ = 'MONOALPHABETIC'
    elif ic >= 0.0450:
        typ = 'POLYALPHABETIC_SHORT_KEY'
    else:
        typ = 'POLYALPHABETIC_OR_RANDOM'
    
    sorted_letters = sorted(counts.items(), key=lambda x: (-x[1], x[0]))
    top3 = sorted_letters[:3]
    top_str = ','.join(f'{l}({c})' for l, c in top3)
    print(f'N={n} IC={ic:.4f} TYPE={typ} TOP={top_str}')
`
  }
];
