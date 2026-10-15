/**
 * server/exercises/b3-cloud-aws/chapitre5.js — Exercices du Chapitre 5
 * Chapitre 5 : Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB
 */

module.exports = [
  {
    id: 'aws3-c5-e1',
    chapter: 5,
    title: 'Calculateur de Coûts & Cycle de Vie Amazon S3 (Standard vs Glacier)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer les coûts de stockage mensuels d\'un volume de données selon la classe de stockage S3 choisie.',
    brief: `<p>Amazon S3 propose plusieurs classes de stockage avec un compromis entre coût au Go et frais d\'accès :<br><br>
Tarifs indicatifs de stockage par GiB et par mois :<br>
- <code>STANDARD</code> : 0.023 $ / GiB (accès instantané, aucun frais de récupération).<br>
- <code>STANDARD_IA</code> (Infrequent Access) : 0.0125 $ / GiB + 0.01 $ / GiB récupéré.<br>
- <code>GLACIER_FLEXIBLE</code> : 0.0036 $ / GiB + 0.03 $ / GiB récupéré (restauration en quelques minutes à plusieurs heures).<br>
- <code>DEEP_ARCHIVE</code> : 0.00099 $ / GiB + 0.05 $ / GiB récupéré (restauration en 12 à 48 heures).<br><br>
Entrée STDIN :<br>
<code>S3_COST SIZE_GIB=&lt;g&gt; CLASS=&lt;CLASSE&gt; RETRIEVE_GIB=&lt;r&gt;</code>.<br><br>
Sortie :<br>
<code>S3_BILL: class=&lt;cls&gt; storage_cost=&lt;sc:.2f&gt;$ retrieval_cost=&lt;rc:.2f&gt;$ total_cost=&lt;tot:.2f&gt;$</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la facture de stockage S3
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'S3_COST SIZE_GIB=1000 CLASS=STANDARD RETRIEVE_GIB=500',
        expected: 'S3_BILL: class=STANDARD storage_cost=23.00$ retrieval_cost=0.00$ total_cost=23.00$',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Stockage Infrequent Access (10 000 GiB avec 200 GiB récupérés)',
        stdin: 'S3_COST SIZE_GIB=10000 CLASS=STANDARD_IA RETRIEVE_GIB=200',
        expected: 'S3_BILL: class=STANDARD_IA storage_cost=125.00$ retrieval_cost=2.00$ total_cost=127.00$\n'
      },
      {
        label: 'Archivage Glacier Flexible (50 000 GiB avec 100 GiB récupérés)',
        stdin: 'S3_COST SIZE_GIB=50000 CLASS=GLACIER_FLEXIBLE RETRIEVE_GIB=100',
        expected: 'S3_BILL: class=GLACIER_FLEXIBLE storage_cost=180.00$ retrieval_cost=3.00$ total_cost=183.00$\n'
      },
      {
        label: 'Archivage froid profond Glacier Deep Archive (100 000 GiB sans extraction)',
        stdin: 'S3_COST SIZE_GIB=100000 CLASS=DEEP_ARCHIVE RETRIEVE_GIB=0',
        expected: 'S3_BILL: class=DEEP_ARCHIVE storage_cost=99.00$ retrieval_cost=0.00$ total_cost=99.00$\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

PRICING = {
    "STANDARD": {"storage": 0.023, "retrieval": 0.0},
    "STANDARD_IA": {"storage": 0.0125, "retrieval": 0.01},
    "GLACIER_FLEXIBLE": {"storage": 0.0036, "retrieval": 0.03},
    "DEEP_ARCHIVE": {"storage": 0.00099, "retrieval": 0.05}
}

for ligne in lignes:
    if not ligne.startswith("S3_COST "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    size_gib = float(params.get("SIZE_GIB", "0"))
    s3_class = params.get("CLASS", "STANDARD").upper()
    ret_gib = float(params.get("RETRIEVE_GIB", "0"))

    rates = PRICING.get(s3_class, PRICING["STANDARD"])
    storage_cost = size_gib * rates["storage"]
    retrieval_cost = ret_gib * rates["retrieval"]
    total = storage_cost + retrieval_cost

    print(f"S3_BILL: class={s3_class} storage_cost={storage_cost:.2f}$ retrieval_cost={retrieval_cost:.2f}$ total_cost={total:.2f}$")
`
  },
  {
    id: 'aws3-c5-e2',
    chapter: 5,
    title: 'Validateur de Nom de Bucket S3 & Détecteur de Risques Publics',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la conformité syntaxique globale d\'un nom de bucket S3 et auditer les paramètres S3 Block Public Access.',
    brief: `<p>Les règles de nommage universelles d\'Amazon S3 imposent des contraintes strictes :<br><br>
1. <strong>Règles de nom de bucket</strong> :<br>
- Longueur comprise entre 3 et 63 caractères inclus.<br>
- Uniquement lettres minuscules, chiffres, points <code>.</code> et tirets <code>-</code>.<br>
- Doit obligatoirement commencer et se terminer par une lettre ou un chiffre.<br>
- Ne doit pas ressembler à une adresse IP décimale à 4 octets (ex: <code>192.168.1.1</code>).<br>
- Ne doit pas comporter deux points adjacents (<code>..</code>) ni de points et tirets contigus (<code>.-</code> ou <code>-.</code>).<br><br>
2. <strong>Audit de sécurité (S3 Block Public Access)</strong> :<br>
Les 4 paramètres doivent être à <code>true</code> : <code>BlockPublicAcls</code>, <code>IgnorePublicAcls</code>, <code>BlockPublicPolicy</code>, <code>RestrictPublicBuckets</code>.<br>
Si l'un d'eux est à <code>false</code> -> statut de risque <code>EXPOSED</code>, sinon <code>SECURE</code>.<br><br>
Entrée STDIN :<br>
<code>S3_AUDIT BUCKET=&lt;nom&gt; BPA=&lt;bpa1,bpa2,bpa3,bpa4&gt;</code>.<br><br>
Sortie :<br>
Si nom valide : <code>BUCKET_AUDIT: bucket=&lt;nom&gt; name_status=VALID security_status=&lt;SECURE|EXPOSED&gt;</code>.<br>
Si nom invalide : <code>BUCKET_AUDIT: bucket=&lt;nom&gt; name_status=INVALID reason=&lt;BAD_LENGTH|BAD_CHARS|BAD_EDGES|IP_FORMAT|BAD_DOT_DASH&gt;</code>.</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider le nom du bucket et l'exposition publique
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'S3_AUDIT BUCKET=mon-bucket-prod-2026 BPA=true,true,true,true',
        expected: 'BUCKET_AUDIT: bucket=mon-bucket-prod-2026 name_status=VALID security_status=SECURE',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Bucket valide mais exposé (un flag BPA à false)',
        stdin: 'S3_AUDIT BUCKET=data-lake-raw-logs BPA=true,true,false,true',
        expected: 'BUCKET_AUDIT: bucket=data-lake-raw-logs name_status=VALID security_status=EXPOSED\n'
      },
      {
        label: 'Erreur majuscules dans le nom',
        stdin: 'S3_AUDIT BUCKET=MonBucketInvalid BPA=true,true,true,true',
        expected: 'BUCKET_AUDIT: bucket=MonBucketInvalid name_status=INVALID reason=BAD_CHARS\n'
      },
      {
        label: 'Erreur tiret adjacent à un point',
        stdin: 'S3_AUDIT BUCKET=data.-backup-bucket BPA=true,true,true,true',
        expected: 'BUCKET_AUDIT: bucket=data.-backup-bucket name_status=INVALID reason=BAD_DOT_DASH\n'
      },
      {
        label: 'Erreur format adresse IP',
        stdin: 'S3_AUDIT BUCKET=192.168.1.50 BPA=true,true,true,true',
        expected: 'BUCKET_AUDIT: bucket=192.168.1.50 name_status=INVALID reason=IP_FORMAT\n'
      },
      {
        label: 'Erreur longueur inférieure à 3 caractères',
        stdin: 'S3_AUDIT BUCKET=ab BPA=true,true,true,true',
        expected: 'BUCKET_AUDIT: bucket=ab name_status=INVALID reason=BAD_LENGTH\n'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ip_regex = re.compile(r"^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$")

for ligne in lignes:
    if not ligne.startswith("S3_AUDIT "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    bucket = params.get("BUCKET", "")
    bpa_flags = [x.strip().lower() == "true" for x in params.get("BPA", "").split(",") if x.strip()]

    # Validation du nom
    if not (3 <= len(bucket) <= 63):
        print(f"BUCKET_AUDIT: bucket={bucket} name_status=INVALID reason=BAD_LENGTH")
        continue

    if not re.match(r"^[a-z0-9.-]+$", bucket):
        print(f"BUCKET_AUDIT: bucket={bucket} name_status=INVALID reason=BAD_CHARS")
        continue

    if not (bucket[0].isalnum() and bucket[-1].isalnum()):
        print(f"BUCKET_AUDIT: bucket={bucket} name_status=INVALID reason=BAD_EDGES")
        continue

    if ip_regex.match(bucket):
        print(f"BUCKET_AUDIT: bucket={bucket} name_status=INVALID reason=IP_FORMAT")
        continue

    if ".." in bucket or ".-" in bucket or "-." in bucket:
        print(f"BUCKET_AUDIT: bucket={bucket} name_status=INVALID reason=BAD_DOT_DASH")
        continue

    # Sécurité BPA
    sec_status = "SECURE" if all(bpa_flags) and len(bpa_flags) == 4 else "EXPOSED"
    print(f"BUCKET_AUDIT: bucket={bucket} name_status=VALID security_status={sec_status}")
`
  },
  {
    id: 'aws3-c5-e3',
    chapter: 5,
    title: 'Calculateur de Capacité Provisionnée Amazon DynamoDB (RCU & WCU)',
    level: 'n3',
    language: 'python',
    goal: 'Calculer précisément les unités de capacité de lecture (RCU) et d\'écriture (WCU) requises pour une table DynamoDB.',
    brief: `<p>Dans Amazon DynamoDB, la capacité provisionnée se calcule selon la taille d\'élément et le mode de cohérence :<br><br>
1. <strong>Calcul des Read Capacity Units (RCU)</strong> :<br>
- Unité de base : blocs de <strong>4 KB</strong> arrondis au supérieur : <code>Blocs_R = math.ceil(Item_Size_KB / 4.0)</code> (ou 1 si size &lt;= 4).<br>
- Mode <code>EVENTUAL</code> (Éventuellement cohérent) : 0.5 RCU par lecture par seconde :<br>
<code>RCU = Blocs_R * Reads_Sec * 0.5</code>.<br>
- Mode <code>STRONG</code> (Fortement cohérent) : 1 RCU par lecture par seconde :<br>
<code>RCU = Blocs_R * Reads_Sec * 1.0</code>.<br>
- Mode <code>TRANSACTIONAL</code> (Lectures transactionnelles) : 2 RCU par lecture par seconde :<br>
<code>RCU = Blocs_R * Reads_Sec * 2.0</code>.<br>
Arrondir le RCU final à l'entier supérieur : <code>math.ceil(RCU)</code>.<br><br>
2. <strong>Calcul des Write Capacity Units (WCU)</strong> :<br>
- Unité de base : blocs de <strong>1 KB</strong> arrondis au supérieur : <code>Blocs_W = math.ceil(Item_Size_KB / 1.0)</code>.<br>
- Mode <code>STANDARD</code> : 1 WCU par écriture par seconde :<br>
<code>WCU = Blocs_W * Writes_Sec * 1.0</code>.<br>
- Mode <code>TRANSACTIONAL</code> : 2 WCU par écriture par seconde :<br>
<code>WCU = Blocs_W * Writes_Sec * 2.0</code>.<br><br>
Entrée STDIN :<br>
<code>DYNAMO_CAP SIZE_KB=&lt;k&gt; READS_SEC=&lt;r&gt; WRITES_SEC=&lt;w&gt; READ_MODE=&lt;EVENTUAL|STRONG|TRANSACTIONAL&gt; WRITE_MODE=&lt;STANDARD|TRANSACTIONAL&gt;</code>.<br><br>
Sortie : <code>DYNAMO_SIZING: size=&lt;k&gt;KB rcu=&lt;rcu&gt; wcu=&lt;wcu&gt;</code>.</p>`,
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les RCU et WCU pour DynamoDB
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'DYNAMO_CAP SIZE_KB=3.5 READS_SEC=100 WRITES_SEC=50 READ_MODE=EVENTUAL WRITE_MODE=STANDARD',
        expected: 'DYNAMO_SIZING: size=3.5KB rcu=50 wcu=200',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Item de 10 KB avec lectures fortement cohérentes',
        stdin: 'DYNAMO_CAP SIZE_KB=10.0 READS_SEC=200 WRITES_SEC=20 READ_MODE=STRONG WRITE_MODE=STANDARD',
        expected: 'DYNAMO_SIZING: size=10.0KB rcu=600 wcu=200\n'
      },
      {
        label: 'Transactions complètes ACID en lecture et écriture',
        stdin: 'DYNAMO_CAP SIZE_KB=2.0 READS_SEC=50 WRITES_SEC=30 READ_MODE=TRANSACTIONAL WRITE_MODE=TRANSACTIONAL',
        expected: 'DYNAMO_SIZING: size=2.0KB rcu=100 wcu=120\n'
      },
      {
        label: 'Lecture avec fractionnement (RCU arrondi au supérieur)',
        stdin: 'DYNAMO_CAP SIZE_KB=1.0 READS_SEC=5 WRITES_SEC=5 READ_MODE=EVENTUAL WRITE_MODE=STANDARD',
        expected: 'DYNAMO_SIZING: size=1.0KB rcu=3 wcu=5\n'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("DYNAMO_CAP "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    size_kb = float(params.get("SIZE_KB", "1.0"))
    reads_sec = int(params.get("READS_SEC", "0"))
    writes_sec = int(params.get("WRITES_SEC", "0"))
    read_mode = params.get("READ_MODE", "EVENTUAL").upper()
    write_mode = params.get("WRITE_MODE", "STANDARD").upper()

    # RCU
    blocks_r = math.ceil(size_kb / 4.0)
    factor_r = 0.5 if read_mode == "EVENTUAL" else (1.0 if read_mode == "STRONG" else 2.0)
    rcu = math.ceil(blocks_r * reads_sec * factor_r)

    # WCU
    blocks_w = math.ceil(size_kb / 1.0)
    factor_w = 1.0 if write_mode == "STANDARD" else 2.0
    wcu = math.ceil(blocks_w * writes_sec * factor_w)

    print(f"DYNAMO_SIZING: size={size_kb}KB rcu={rcu} wcu={wcu}")
`
  }
];
