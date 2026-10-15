/**
 * Exercices du Chapitre 5 : Signatures Numériques, PKI & Gestion des Certificats X.509.
 * Préfixe : cr3-c5-e
 */
'use strict';

module.exports = [
  {
    id: 'cr3-c5-e1',
    chapter: 5,
    title: 'Simulateur de Signature Numérique et Vérification (RSA Sign & Verify)',
    level: 'n1',
    language: 'python',
    goal: 'Implémenter la signature numérique RSA d\'un message haché et sa vérification avec la clé publique.',
    brief: `<p>Une signature numérique lie cryptographiquement l'empreinte d'un message à la clé privée de l'émetteur :<br>
- Empreinte : <code>h = int(sha256(M), 16) mod n</code>.<br>
- Signature : <code>sig = pow(h, d, n)</code>.<br>
- Vérification : <code>h_recupere = pow(sig, e, n)</code>.<br>
- Si <code>h == h_recupere</code>, la signature est valide.<br><br>
Commandes lues sur STDIN :<br>
1. <code>SIGN n=&lt;n&gt; d=&lt;d&gt; text=&lt;texte&gt;</code> : produit <code>SIGN: n=&lt;n&gt; digest_mod=&lt;h&gt; sig=&lt;sig&gt;</code>.<br>
2. <code>VERIFY n=&lt;n&gt; e=&lt;e&gt; sig=&lt;sig&gt; text=&lt;texte&gt;</code> :<br>
   - Si valide : <code>VERIFY: status=VALID_SIGNATURE (authentic & untampered)</code><br>
   - Si invalide : <code>VERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)</code></p>`,
    starter: `import sys
import hashlib

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la signature numérique et sa vérification RSA
`,
    hints: [
      'Calculez h = int(hashlib.sha256(text.encode("utf-8")).hexdigest(), 16) % n.',
      'Pour vérifier, calculez pow(sig, e, n) et comparez directement avec h.'
    ],
    examples: [
      {
        stdin: 'SIGN n=3233 d=2753 text=CONTRAT_OFFICIEL',
        expected: 'SIGN: n=3233 digest_mod=566 sig=1706',
        note: 'Signature calculée avec la clé privée (d=2753) sur le condensé modulo 3233.'
      }
    ],
    tests: [
      {
        label: 'Vérification signature valide',
        stdin: 'VERIFY n=3233 e=17 sig=1706 text=CONTRAT_OFFICIEL',
        expected: 'VERIFY: status=VALID_SIGNATURE (authentic & untampered)'
      },
      {
        label: 'Détection d altération de message sous signature',
        stdin: 'VERIFY n=3233 e=17 sig=1706 text=CONTRAT_FALSIFIE',
        expected: 'VERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)'
      },
      {
        label: 'Rejet signature numérique corrompue',
        stdin: 'VERIFY n=3233 e=17 sig=9999 text=CONTRAT_OFFICIEL',
        expected: 'VERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)'
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
    
    n = int(params['n'])
    raw = params['text'].encode('utf-8')
    h = int(hashlib.sha256(raw).hexdigest(), 16) % n
    if cmd == 'SIGN':
        d = int(params['d'])
        sig = pow(h, d, n)
        print(f'SIGN: n={n} digest_mod={h} sig={sig}')
    elif cmd == 'VERIFY':
        e = int(params['e'])
        sig = int(params['sig'])
        h_rec = pow(sig, e, n)
        if h == h_rec:
            print('VERIFY: status=VALID_SIGNATURE (authentic & untampered)')
        else:
            print('VERIFY: status=INVALID_SIGNATURE (tampered message or wrong key)')
`
  },
  {
    id: 'cr3-c5-e2',
    chapter: 5,
    title: 'Validateur de Structure et de Validité Temporelle de Certificat X.509',
    level: 'n2',
    language: 'python',
    goal: 'Valider la conformité temporelle et l\'admissibilité du nom de domaine (Common Name et SAN avec wildcards) d\'un certificat X.509.',
    brief: `<p>Un certificat X.509 lie une identité à une clé publique.<br>
Critères de validation :<br>
1. Validité temporelle :<br>
   - Si <code>date &lt; not_before</code> : <code>STATUS=INVALID reason=NOT_YET_VALID</code><br>
   - Si <code>date &gt; not_after</code> : <code>STATUS=INVALID reason=CERTIFICATE_EXPIRED</code><br>
2. Correspondance du nom d'hôte :<br>
   - Le FQDN doit correspondre à <code>cn</code> ou à un nom dans <code>san</code>.<br>
   - Un wildcard <code>*.domaine.corp</code> couvre tout sous-domaine de niveau 1 (ex: <code>web.domaine.corp</code>).<br>
   - Si aucune correspondance : <code>STATUS=INVALID reason=HOSTNAME_MISMATCH</code>.<br>
3. Si conforme : <code>STATUS=VALID fqdn=&lt;fqdn&gt; valid_until=&lt;not_after&gt; ca=&lt;is_ca&gt;</code>.<br><br>
Commande STDIN : <code>CERT_VALIDATE fqdn=&lt;fqdn&gt; date=&lt;date&gt; cn=&lt;cn&gt; san=&lt;san&gt; not_before=&lt;date&gt; not_after=&lt;date&gt; is_ca=&lt;bool&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la validation temporelle et d'identité X.509
`,
    hints: [
      'Comparez lexicographiquement les dates au format ISO YYYY-MM-DD.',
      'Pour les wildcards, vérifiez si le motif commence par "*." et découpez le nom pour tester qu il s agit d un sous-domaine direct sans point supplémentaire.'
    ],
    examples: [
      {
        stdin: 'CERT_VALIDATE fqdn=api.cloud.corp date=2026-10-15 cn=api.cloud.corp san=*.cloud.corp,cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false',
        expected: 'STATUS=VALID fqdn=api.cloud.corp valid_until=2027-01-01 ca=false',
        note: 'Certificat en cours de validité avec correspondance exacte FQDN.'
      }
    ],
    tests: [
      {
        label: 'Validation FQDN par wildcard SAN',
        stdin: 'CERT_VALIDATE fqdn=web.cloud.corp date=2026-10-15 cn=cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false',
        expected: 'STATUS=VALID fqdn=web.cloud.corp valid_until=2027-01-01 ca=false'
      },
      {
        label: 'Rejet FQDN ne figurant ni dans CN ni dans SAN',
        stdin: 'CERT_VALIDATE fqdn=hacker.net date=2026-10-15 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false',
        expected: 'STATUS=INVALID reason=HOSTNAME_MISMATCH'
      },
      {
        label: 'Rejet certificat expiré',
        stdin: 'CERT_VALIDATE fqdn=api.cloud.corp date=2028-05-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false',
        expected: 'STATUS=INVALID reason=CERTIFICATE_EXPIRED'
      },
      {
        label: 'Rejet certificat pas encore valide',
        stdin: 'CERT_VALIDATE fqdn=api.cloud.corp date=2025-11-01 cn=api.cloud.corp san=*.cloud.corp not_before=2026-01-01 not_after=2027-01-01 is_ca=false',
        expected: 'STATUS=INVALID reason=NOT_YET_VALID'
      }
    ],
    solution: `import sys

def match_hostname(fqdn, pattern):
    fqdn = fqdn.lower()
    pattern = pattern.lower()
    if pattern == fqdn:
        return True
    if pattern.startswith('*.'):
        domain_suffix = pattern[2:]
        if fqdn.endswith('.' + domain_suffix):
            sub = fqdn[:-len(domain_suffix)-1]
            if '.' not in sub and len(sub) > 0:
                return True
    return False

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    params = {}
    for p in line.strip().split():
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
    
    fqdn = params['fqdn'].lower()
    d_cur = params['date']
    cn = params['cn']
    sans = [s.strip() for s in params.get('san', '').split(',') if s.strip()]
    nb = params['not_before']
    na = params['not_after']
    is_ca = params['is_ca']
    
    if d_cur < nb:
        print('STATUS=INVALID reason=NOT_YET_VALID')
        continue
    if d_cur > na:
        print('STATUS=INVALID reason=CERTIFICATE_EXPIRED')
        continue
    
    matched = match_hostname(fqdn, cn)
    if not matched:
        for s in sans:
            if match_hostname(fqdn, s):
                matched = True
                break
    if not matched:
        print('STATUS=INVALID reason=HOSTNAME_MISMATCH')
        continue
    
    print(f'STATUS=VALID fqdn={fqdn} valid_until={na} ca={is_ca}')
`
  },
  {
    id: 'cr3-c5-e3',
    chapter: 5,
    title: 'Contrôleur de Chaîne de Certification PKI et Révocation (CRL/OCSP)',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la validité d\'une chaîne de confiance PKI complète et contrôler l\'absence de certificats révoqués dans la liste CRL.',
    brief: `<p>Contrôle de conformité d'une chaîne PKI :<br>
- Ligne d'en-tête : <code>PKI_CHAIN trust_root=&lt;root&gt; crl_revoked=&lt;s1,s2,...&gt;</code>.<br>
- Certificats (de la feuille à la racine) : <code>CERT subject=&lt;s&gt; issuer=&lt;i&gt; serial=&lt;ser&gt; is_ca=&lt;bool&gt;</code>.<br><br>
Règles :<br>
1. Révocation : si un serial est dans <code>crl_revoked</code> : <code>CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=&lt;ser&gt; subject=&lt;s&gt;</code>.<br>
2. Liaison : pour tout certificat i &lt; N-1, <code>cert[i].issuer == cert[i+1].subject</code>. Sinon <code>CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=&lt;cert[i].subject&gt;</code>.<br>
3. Émetteur : <code>cert[i+1].is_ca == True</code>. Sinon <code>CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=&lt;cert[i+1].subject&gt;</code>.<br>
4. Racine : le dernier certificat doit être auto-signé (<code>issuer == subject</code>) et égal à <code>trust_root</code>. Sinon <code>CHAIN: INVALID reason=UNTRUSTED_ROOT root=&lt;root&gt;</code>.<br>
5. Succès : <code>CHAIN: VALID depth=&lt;N&gt; root=&lt;root&gt; leaf=&lt;leaf&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la validation de chaîne PKI et contrôle de révocation
`,
    hints: [
      'Contrôlez en premier la révocation en testant si serial in revoked.',
      'Parcourez ensuite de i=0 à len(certs)-2 pour valider cert[i].issuer == cert[i+1].subject.'
    ],
    examples: [
      {
        stdin: `PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999
CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false
CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true
CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true`,
        expected: 'CHAIN: VALID depth=3 root=DigiTrust_Root_CA leaf=api.bank.com',
        note: 'Chaîne PKI 3 niveaux intacte liée à la racine de confiance.'
      }
    ],
    tests: [
      {
        label: 'Rejet certificat révoqué dans la CRL',
        stdin: `PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-1001
CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false
CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true
CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true`,
        expected: 'CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=SN-1001 subject=api.bank.com'
      },
      {
        label: 'Rupture de liaison d émetteur dans la chaîne',
        stdin: `PKI_CHAIN trust_root=DigiTrust_Root_CA crl_revoked=SN-999
CERT subject=api.bank.com issuer=Rogue_Intermediate serial=SN-1001 is_ca=false
CERT subject=DigiTrust_Intermediate_CA issuer=DigiTrust_Root_CA serial=SN-2001 is_ca=true
CERT subject=DigiTrust_Root_CA issuer=DigiTrust_Root_CA serial=SN-3001 is_ca=true`,
        expected: 'CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=api.bank.com'
      },
      {
        label: 'Racine non présente dans le magasin de confiance',
        stdin: `PKI_CHAIN trust_root=Official_Root_CA crl_revoked=none
CERT subject=api.bank.com issuer=DigiTrust_Intermediate_CA serial=SN-1001 is_ca=false
CERT subject=DigiTrust_Intermediate_CA issuer=Fake_Root_CA serial=SN-2001 is_ca=true
CERT subject=Fake_Root_CA issuer=Fake_Root_CA serial=SN-3001 is_ca=true`,
        expected: 'CHAIN: INVALID reason=UNTRUSTED_ROOT root=Fake_Root_CA'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

if not lignes:
    sys.exit(0)

header = lignes[0].strip().split()
params = {}
for p in header[1:]:
    if '=' in p:
        k, v = p.split('=', 1)
        params[k] = v

trust_root = params['trust_root']
revoked = set([s.strip() for s in params.get('crl_revoked', '').split(',') if s.strip()])

certs = []
for line in lignes[1:]:
    cp = {}
    for p in line.strip().split()[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            cp[k] = v
    cp['is_ca'] = cp.get('is_ca', 'false') == 'true'
    certs.append(cp)

# 1. Révocation
for c in certs:
    if c['serial'] in revoked:
        print(f'CHAIN: INVALID reason=REVOKED_CERTIFICATE serial={c["serial"]} subject={c["subject"]}')
        sys.exit(0)

# 2. Chaînage des émetteurs
for i in range(len(certs) - 1):
    leaf = certs[i]
    issuer = certs[i+1]
    if leaf['issuer'] != issuer['subject']:
        print(f'CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert={leaf["subject"]}')
        sys.exit(0)
    if not issuer['is_ca']:
        print(f'CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject={issuer["subject"]}')
        sys.exit(0)

# 3. Racine
root = certs[-1]
if root['subject'] != root['issuer'] or root['subject'] != trust_root:
    print(f'CHAIN: INVALID reason=UNTRUSTED_ROOT root={root["subject"]}')
    sys.exit(0)

if not root['is_ca']:
    print(f'CHAIN: INVALID reason=ROOT_NOT_CA subject={root["subject"]}')
    sys.exit(0)

print(f'CHAIN: VALID depth={len(certs)} root={trust_root} leaf={certs[0]["subject"]}')
`
  }
];
