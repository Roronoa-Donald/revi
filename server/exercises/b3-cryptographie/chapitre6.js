/**
 * Exercices du Chapitre 6 : Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique.
 * Préfixe : cr3-c6-e
 */
'use strict';

module.exports = [
  {
    id: 'cr3-c6-e1',
    chapter: 6,
    title: 'Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)',
    level: 'n1',
    language: 'python',
    goal: 'Analyser une suite cryptographique TLS pour déterminer sa version, ses primitives, sa garantie de confidentialité persistante (PFS) et sa conformité.',
    brief: `<p>Une suite TLS définit l'assemblage de primitives cryptographiques pour une session.<br>
Règles :<br>
1. Suites TLS 1.3 : (ex: <code>TLS_AES_256_GCM_SHA384</code>, <code>TLS_AES_128_GCM_SHA256</code>, <code>TLS_CHACHA20_POLY1305_SHA256</code>) :<br>
   <code>ver=TLS1.3 kex=ECDHE/DHE enc=&lt;algo&gt; pfs=YES status=SECURE</code>.<br>
2. Suites TLS 1.2 : comportent <code>_WITH_</code> :<br>
   - <code>pfs=YES</code> si l'échange contient <code>DHE</code> ou <code>ECDHE</code>, sinon <code>pfs=NO</code>.<br>
   - Si le chiffrement contient <code>RC4</code>, <code>DES</code>, <code>3DES</code>, <code>NULL</code> ou <code>EXPORT</code> :<br>
     <code>status=INSECURE (deprecated cipher)</code><br>
   - Sinon si <code>pfs == NO</code> : <code>status=WEAK (no forward secrecy)</code><br>
   - Sinon : <code>status=SECURE</code>.<br><br>
Commande : <code>PARSE_SUITE suite=&lt;nom_suite&gt;</code>.<br>
Sortie : <code>SUITE: &lt;nom&gt; ver=&lt;ver&gt; kex=&lt;kex&gt; enc=&lt;enc&gt; pfs=&lt;pfs&gt; status=&lt;status&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'analyseur de suite cryptographique TLS
`,
    hints: [
      'Identifiez d abord si la suite est TLS 1.3 via sa présence dans la liste blanche TLS 1.3.',
      'Pour TLS 1.2, découpez sur "_WITH_" pour isoler kex_part et l algorithme de chiffrement.'
    ],
    examples: [
      {
        stdin: 'PARSE_SUITE suite=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
        expected: 'SUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM_SHA256 pfs=YES status=SECURE',
        note: 'Suite TLS 1.2 moderne avec échange ECDHE apportant la confidentialité persistante.'
      }
    ],
    tests: [
      {
        label: 'Suite standard TLS 1.3',
        stdin: 'PARSE_SUITE suite=TLS_AES_256_GCM_SHA384',
        expected: 'SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=ECDHE/DHE enc=AES_256_GCM pfs=YES status=SECURE'
      },
      {
        label: 'Suite TLS 1.2 sans confidentialité persistante',
        stdin: 'PARSE_SUITE suite=TLS_RSA_WITH_AES_256_CBC_SHA256',
        expected: 'SUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC_SHA256 pfs=NO status=WEAK (no forward secrecy)'
      },
      {
        label: 'Suite TLS dépréciée et vulnérable',
        stdin: 'PARSE_SUITE suite=TLS_RSA_WITH_RC4_128_SHA',
        expected: 'SUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128_SHA pfs=NO status=INSECURE (deprecated cipher)'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    if not 'suite=' in line:
        continue
    suite = line.split('suite=', 1)[1].strip()
    
    if suite in ('TLS_AES_256_GCM_SHA384', 'TLS_AES_128_GCM_SHA256', 'TLS_CHACHA20_POLY1305_SHA256'):
        enc = suite.replace('TLS_', '').rsplit('_', 1)[0]
        print(f'SUITE: {suite} ver=TLS1.3 kex=ECDHE/DHE enc={enc} pfs=YES status=SECURE')
        continue
    
    if '_WITH_' in suite:
        prefix, rest = suite.split('_WITH_', 1)
        kex_part = prefix.replace('TLS_', '')
        has_pfs = 'DHE' in kex_part
        pfs_str = 'YES' if has_pfs else 'NO'
        
        if any(bad in rest for bad in ('RC4', 'DES', '3DES', 'NULL', 'EXPORT')):
            status = 'INSECURE (deprecated cipher)'
        elif not has_pfs:
            status = 'WEAK (no forward secrecy)'
        else:
            status = 'SECURE'
        
        print(f'SUITE: {suite} ver=TLS1.2 kex={kex_part} enc={rest} pfs={pfs_str} status={status}')
`
  },
  {
    id: 'cr3-c6-e2',
    chapter: 6,
    title: 'Simulateur de Négociation TLS 1.3 et Validation de Confidentialité Persistante (PFS)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l\'établissement de session TLS 1.3 (1-RTT et 0-RTT PSK) et dériver le secret maître éphémère.',
    brief: `<p>TLS 1.3 (RFC 8446) accélère la poignée de mains à 1 aller-retour (1-RTT) ou 0 aller-retour (0-RTT avec risque de rejeu) :<br>
Règles :<br>
- Si <code>server_version == 'TLSv1.2'</code> : <code>TLS1.2: rtt=2-RTT pfs=CONDITIONAL status=LEGACY_HANDSHAKE</code>.<br>
- Si version autre : <code>STATUS=REJECTED (TLS version unsupported: &lt;v&gt;)</code>.<br>
- Pour TLSv1.3, groupes autorisés : <code>x25519</code>, <code>secp256r1</code>, <code>secp384r1</code>.<br>
- Si non supporté : <code>STATUS=REJECTED (unsupported elliptic group: &lt;grp&gt;)</code>.<br>
- Dériver <code>master_secret</code> sur 16 caractères hexadécimaux de <code>sha256(client_share:server_share:group)</code>.<br><br>
Sortie : <code>TLS1.3: rtt=&lt;rtt&gt; group=&lt;grp&gt; pfs=PERFECT_FORWARD_SECRECY master_secret=&lt;ms&gt; status=ESTABLISHED</code>.</p>`,
    starter: `import sys
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la négociation TLS 1.3 et validation PFS
`,
    hints: [
      'Validez d abord server_version avant de tester les groupes de négociation.',
      'Concaténez f"{client_share}:{server_share}:{group}".encode("utf-8") et prenez hexdigest()[:16] pour master_secret.'
    ],
    examples: [
      {
        stdin: 'TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 psk_mode=none',
        expected: 'TLS1.3: rtt=1-RTT group=x25519 pfs=PERFECT_FORWARD_SECRECY master_secret=f91a13a53fa8daae status=ESTABLISHED',
        note: 'Poignée de mains 1-RTT avec échange éphémère x25519 garantissant le PFS.'
      }
    ],
    tests: [
      {
        label: 'Reprise de session TLS 1.3 en mode 0-RTT',
        stdin: 'TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 psk_mode=0-rtt',
        expected: 'TLS1.3: rtt=0-RTT (early data) group=x25519 pfs=PERFECT_FORWARD_SECRECY master_secret=f91a13a53fa8daae status=ESTABLISHED'
      },
      {
        label: 'Négociation de repli en TLS 1.2',
        stdin: 'TLS_HANDSHAKE client_version=TLSv1.2 server_version=TLSv1.2 group=secp256r1 client_share=A1B2 server_share=C3D4 psk_mode=none',
        expected: 'TLS1.2: rtt=2-RTT pfs=CONDITIONAL status=LEGACY_HANDSHAKE'
      },
      {
        label: 'Rejet version obsolète TLS 1.0',
        stdin: 'TLS_HANDSHAKE client_version=TLSv1.0 server_version=TLSv1.0 group=none client_share=none server_share=none psk_mode=none',
        expected: 'STATUS=REJECTED (TLS version unsupported: TLSv1.0)'
      }
    ],
    solution: `import sys
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
    
    cv = params.get('client_version', '')
    sv = params.get('server_version', '')
    grp = params.get('group', 'x25519')
    c_share = params.get('client_share', '')
    s_share = params.get('server_share', '')
    psk = params.get('psk_mode', 'none')
    
    if sv not in ('TLSv1.3', 'TLSv1.2'):
        print(f'STATUS=REJECTED (TLS version unsupported: {sv})')
        continue
    
    if sv == 'TLSv1.2':
        print('TLS1.2: rtt=2-RTT pfs=CONDITIONAL status=LEGACY_HANDSHAKE')
        continue
    
    valid_groups = {'x25519', 'secp256r1', 'secp384r1'}
    if grp not in valid_groups:
        print(f'STATUS=REJECTED (unsupported elliptic group: {grp})')
        continue
    
    rtt = '0-RTT (early data)' if psk == '0-rtt' else '1-RTT'
    combo = f'{c_share}:{s_share}:{grp}'.encode('utf-8')
    ms = hashlib.sha256(combo).hexdigest()[:16]
    print(f'TLS1.3: rtt={rtt} group={grp} pfs=PERFECT_FORWARD_SECRECY master_secret={ms} status=ESTABLISHED')
`
  },
  {
    id: 'cr3-c6-e3',
    chapter: 6,
    title: 'Auditeur de Conformité Cryptographique et Transition Post-Quantique (NIST PQC)',
    level: 'n3',
    language: 'python',
    goal: 'Auditer l\'inventaire cryptographique d\'une organisation et planifier la migration vers les standards post-quantiques NIST.',
    brief: `<p>L'ordinateur quantique menace les fondations asymétriques (Shor) et affaiblit les clés symétriques (Grover) :<br>
Règles d'audit :<br>
1. <code>ASYMMETRIC</code> (RSA, ECC, DH) : <code>pqc_ready=NO status=VULNERABLE_QUANTUM action=MIGRATE_TO_ML_KEM_OR_ML_DSA</code>.<br>
2. <code>SYMMETRIC</code> : si <code>key_size &lt; 256</code> -&gt; <code>pqc_ready=NO status=INSUFFICIENT_SECURITY action=UPGRADE_TO_AES_256</code> ; sinon -&gt; <code>pqc_ready=YES status=QUANTUM_SAFE action=MAINTAIN</code>.<br>
3. <code>HASH</code> : si <code>key_size &lt; 256</code> -&gt; <code>pqc_ready=NO status=DEPRECATED action=MIGRATE_TO_SHA_256_OR_SHA_3</code> ; sinon -&gt; <code>pqc_ready=YES status=QUANTUM_SAFE action=MAINTAIN</code>.<br>
4. <code>PQC</code> (ML-KEM, ML-DSA, SLH-DSA) : <code>pqc_ready=YES status=NIST_STANDARDIZED action=PRODUCTION_READY</code>.<br><br>
Sortie : <code>AUDIT: algo=&lt;name&gt; type=&lt;type&gt; key_size=&lt;key_size&gt; pqc_ready=&lt;pqc&gt; status=&lt;status&gt; action=&lt;action&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la résistance quantique selon les normes NIST PQC
`,
    hints: [
      'Branchez selon t == "ASYMMETRIC", "SYMMETRIC", "HASH", "PQC".',
      'Pour SYMMETRIC et HASH, comparez key_size < 256 vs key_size >= 256.'
    ],
    examples: [
      {
        stdin: 'AUDIT_ALGO name=RSA key_size=2048 type=ASYMMETRIC',
        expected: 'AUDIT: algo=RSA type=ASYMMETRIC key_size=2048 pqc_ready=NO status=VULNERABLE_QUANTUM action=MIGRATE_TO_ML_KEM_OR_ML_DSA',
        note: 'RSA repose sur la factorisation entière cassée par l algorithme de Shor.'
      }
    ],
    tests: [
      {
        label: 'Clé symétrique 128 bits vulnérable à l accélération de Grover',
        stdin: 'AUDIT_ALGO name=AES_128 key_size=128 type=SYMMETRIC',
        expected: 'AUDIT: algo=AES_128 type=SYMMETRIC key_size=128 pqc_ready=NO status=INSUFFICIENT_SECURITY action=UPGRADE_TO_AES_256'
      },
      {
        label: 'AES-256 résistant à Grover avec 128 bits de sécurité résiduelle',
        stdin: 'AUDIT_ALGO name=AES_256 key_size=256 type=SYMMETRIC',
        expected: 'AUDIT: algo=AES_256 type=SYMMETRIC key_size=256 pqc_ready=YES status=QUANTUM_SAFE action=MAINTAIN'
      },
      {
        label: 'Algorithme post-quantique basé sur les réseaux euclidiens standardisé',
        stdin: 'AUDIT_ALGO name=ML_KEM_768 key_size=768 type=PQC',
        expected: 'AUDIT: algo=ML_KEM_768 type=PQC key_size=768 pqc_ready=YES status=NIST_STANDARDIZED action=PRODUCTION_READY'
      },
      {
        label: 'Empreinte courte dépréciée et non post-quantique',
        stdin: 'AUDIT_ALGO name=SHA_1 key_size=160 type=HASH',
        expected: 'AUDIT: algo=SHA_1 type=HASH key_size=160 pqc_ready=NO status=DEPRECATED action=MIGRATE_TO_SHA_256_OR_SHA_3'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
    
    name = params.get('name', '')
    k_size = int(params.get('key_size', 0))
    t = params.get('type', '').upper()
    
    if t == 'ASYMMETRIC':
        pqc = 'NO'
        status = 'VULNERABLE_QUANTUM'
        action = 'MIGRATE_TO_ML_KEM_OR_ML_DSA'
    elif t == 'SYMMETRIC':
        if k_size < 256:
            pqc = 'NO'
            status = 'INSUFFICIENT_SECURITY'
            action = 'UPGRADE_TO_AES_256'
        else:
            pqc = 'YES'
            status = 'QUANTUM_SAFE'
            action = 'MAINTAIN'
    elif t == 'HASH':
        if k_size < 256:
            pqc = 'NO'
            status = 'DEPRECATED'
            action = 'MIGRATE_TO_SHA_256_OR_SHA_3'
        else:
            pqc = 'YES'
            status = 'QUANTUM_SAFE'
            action = 'MAINTAIN'
    elif t == 'PQC':
        pqc = 'YES'
        status = 'NIST_STANDARDIZED'
        action = 'PRODUCTION_READY'
    else:
        continue
    
    print(f'AUDIT: algo={name} type={t} key_size={k_size} pqc_ready={pqc} status={status} action={action}')
`
  }
];
