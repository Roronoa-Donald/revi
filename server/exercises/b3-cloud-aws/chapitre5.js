'use strict';

module.exports = [
  {
    "id": "aws3-c5-e1",
    "chapter": 5,
    "title": "Calculateur de Coûts & Cycle de Vie Amazon S3 (Standard vs Glacier)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer les coûts de stockage mensuels d'un volume de données selon la classe de stockage S3 choisie.",
    "brief": "<p>Amazon S3 propose plusieurs classes de stockage avec un compromis entre coût au Go et frais d'accès :<br><br>\nTarifs indicatifs de stockage par GiB et par mois :<br>\n- <code>STANDARD</code> : 0.023 $ / GiB (accès instantané, aucun frais de récupération).<br>\n- <code>STANDARD_IA</code> (Infrequent Access) : 0.0125 $ / GiB + 0.01 $ / GiB récupéré.<br>\n- <code>GLACIER_FLEXIBLE</code> : 0.0036 $ / GiB + 0.03 $ / GiB récupéré (restauration en quelques minutes à plusieurs heures).<br>\n- <code>DEEP_ARCHIVE</code> : 0.00099 $ / GiB + 0.05 $ / GiB récupéré (restauration en 12 à 48 heures).<br><br>\nEntrée STDIN :<br>\n<code>S3_COST SIZE_GIB=&lt;g&gt; CLASS=&lt;CLASSE&gt; RETRIEVE_GIB=&lt;r&gt;</code>.<br><br>\nSortie :<br>\n<code>S3_BILL: class=&lt;cls&gt; storage_cost=&lt;sc:.2f&gt;$ retrieval_cost=&lt;rc:.2f&gt;$ total_cost=&lt;tot:.2f&gt;$</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c5-e1) — Calculateur de Coûts & Cycle de Vie Amazon S3 (Standard vs Glacier)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Stockage Infrequent Access (10 000 GiB avec 200 GiB récupérés)]\n# Données : S3_COST SIZE_GIB=10000 CLASS=STANDARD_IA RETRIEVE_GIB=200\nA_COMPLETER\n\n[Cas 2 — Archivage Glacier Flexible (50 000 GiB avec 100 GiB récupérés)]\n# Données : S3_COST SIZE_GIB=50000 CLASS=GLACIER_FLEXIBLE RETRIEVE_GIB=100\nA_COMPLETER\n\n[Cas 3 — Archivage froid profond Glacier Deep Archive (100 000 GiB sans extraction)]\n# Données : S3_COST SIZE_GIB=100000 CLASS=DEEP_ARCHIVE RETRIEVE_GIB=0\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "S3_COST SIZE_GIB=1000 CLASS=STANDARD RETRIEVE_GIB=500",
        "expected": "S3_BILL: class=STANDARD storage_cost=23.00$ retrieval_cost=0.00$ total_cost=23.00$",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Stockage Infrequent Access (10 000 GiB avec 200 GiB récupérés)",
        "stdin": "cas:1",
        "expected": "S3_BILL: class=STANDARD_IA storage_cost=125.00$ retrieval_cost=2.00$ total_cost=127.00$\n"
      },
      {
        "label": "Archivage Glacier Flexible (50 000 GiB avec 100 GiB récupérés)",
        "stdin": "cas:2",
        "expected": "S3_BILL: class=GLACIER_FLEXIBLE storage_cost=180.00$ retrieval_cost=3.00$ total_cost=183.00$\n"
      },
      {
        "label": "Archivage froid profond Glacier Deep Archive (100 000 GiB sans extraction)",
        "stdin": "cas:3",
        "expected": "S3_BILL: class=DEEP_ARCHIVE storage_cost=99.00$ retrieval_cost=0.00$ total_cost=99.00$\n"
      }
    ],
    "solution": "[Exemple]\nS3_BILL: class=STANDARD storage_cost=23.00$ retrieval_cost=0.00$ total_cost=23.00$\n\n[Cas 1 — Stockage Infrequent Access (10 000 GiB avec 200 GiB récupérés)]\nS3_BILL: class=STANDARD_IA storage_cost=125.00$ retrieval_cost=2.00$ total_cost=127.00$\n\n\n[Cas 2 — Archivage Glacier Flexible (50 000 GiB avec 100 GiB récupérés)]\nS3_BILL: class=GLACIER_FLEXIBLE storage_cost=180.00$ retrieval_cost=3.00$ total_cost=183.00$\n\n\n[Cas 3 — Archivage froid profond Glacier Deep Archive (100 000 GiB sans extraction)]\nS3_BILL: class=DEEP_ARCHIVE storage_cost=99.00$ retrieval_cost=0.00$ total_cost=99.00$"
  },
  {
    "id": "aws3-c5-e2",
    "chapter": 5,
    "title": "Validateur de Nom de Bucket S3 & Détecteur de Risques Publics",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la conformité syntaxique globale d'un nom de bucket S3 et auditer les paramètres S3 Block Public Access.",
    "brief": "<p>Les règles de nommage universelles d'Amazon S3 imposent des contraintes strictes :<br><br>\n1. <strong>Règles de nom de bucket</strong> :<br>\n- Longueur comprise entre 3 et 63 caractères inclus.<br>\n- Uniquement lettres minuscules, chiffres, points <code>.</code> et tirets <code>-</code>.<br>\n- Doit obligatoirement commencer et se terminer par une lettre ou un chiffre.<br>\n- Ne doit pas ressembler à une adresse IP décimale à 4 octets (ex: <code>192.168.1.1</code>).<br>\n- Ne doit pas comporter deux points adjacents (<code>..</code>) ni de points et tirets contigus (<code>.-</code> ou <code>-.</code>).<br><br>\n2. <strong>Audit de sécurité (S3 Block Public Access)</strong> :<br>\nLes 4 paramètres doivent être à <code>true</code> : <code>BlockPublicAcls</code>, <code>IgnorePublicAcls</code>, <code>BlockPublicPolicy</code>, <code>RestrictPublicBuckets</code>.<br>\nSi l'un d'eux est à <code>false</code> -> statut de risque <code>EXPOSED</code>, sinon <code>SECURE</code>.<br><br>\nEntrée STDIN :<br>\n<code>S3_AUDIT BUCKET=&lt;nom&gt; BPA=&lt;bpa1,bpa2,bpa3,bpa4&gt;</code>.<br><br>\nSortie :<br>\nSi nom valide : <code>BUCKET_AUDIT: bucket=&lt;nom&gt; name_status=VALID security_status=&lt;SECURE|EXPOSED&gt;</code>.<br>\nSi nom invalide : <code>BUCKET_AUDIT: bucket=&lt;nom&gt; name_status=INVALID reason=&lt;BAD_LENGTH|BAD_CHARS|BAD_EDGES|IP_FORMAT|BAD_DOT_DASH&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c5-e2) — Validateur de Nom de Bucket S3 & Détecteur de Risques Publics\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bucket valide mais exposé (un flag BPA à false)]\n# Données : S3_AUDIT BUCKET=data-lake-raw-logs BPA=true,true,false,true\nA_COMPLETER\n\n[Cas 2 — Erreur majuscules dans le nom]\n# Données : S3_AUDIT BUCKET=MonBucketInvalid BPA=true,true,true,true\nA_COMPLETER\n\n[Cas 3 — Erreur tiret adjacent à un point]\n# Données : S3_AUDIT BUCKET=data.-backup-bucket BPA=true,true,true,true\nA_COMPLETER\n\n[Cas 4 — Erreur format adresse IP]\n# Données : S3_AUDIT BUCKET=192.168.1.50 BPA=true,true,true,true\nA_COMPLETER\n\n[Cas 5 — Erreur longueur inférieure à 3 caractères]\n# Données : S3_AUDIT BUCKET=ab BPA=true,true,true,true\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "S3_AUDIT BUCKET=mon-bucket-prod-2026 BPA=true,true,true,true",
        "expected": "BUCKET_AUDIT: bucket=mon-bucket-prod-2026 name_status=VALID security_status=SECURE",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Bucket valide mais exposé (un flag BPA à false)",
        "stdin": "cas:1",
        "expected": "BUCKET_AUDIT: bucket=data-lake-raw-logs name_status=VALID security_status=EXPOSED\n"
      },
      {
        "label": "Erreur majuscules dans le nom",
        "stdin": "cas:2",
        "expected": "BUCKET_AUDIT: bucket=MonBucketInvalid name_status=INVALID reason=BAD_CHARS\n"
      },
      {
        "label": "Erreur tiret adjacent à un point",
        "stdin": "cas:3",
        "expected": "BUCKET_AUDIT: bucket=data.-backup-bucket name_status=INVALID reason=BAD_DOT_DASH\n"
      },
      {
        "label": "Erreur format adresse IP",
        "stdin": "cas:4",
        "expected": "BUCKET_AUDIT: bucket=192.168.1.50 name_status=INVALID reason=IP_FORMAT\n"
      },
      {
        "label": "Erreur longueur inférieure à 3 caractères",
        "stdin": "cas:5",
        "expected": "BUCKET_AUDIT: bucket=ab name_status=INVALID reason=BAD_LENGTH\n"
      }
    ],
    "solution": "[Exemple]\nBUCKET_AUDIT: bucket=mon-bucket-prod-2026 name_status=VALID security_status=SECURE\n\n[Cas 1 — Bucket valide mais exposé (un flag BPA à false)]\nBUCKET_AUDIT: bucket=data-lake-raw-logs name_status=VALID security_status=EXPOSED\n\n\n[Cas 2 — Erreur majuscules dans le nom]\nBUCKET_AUDIT: bucket=MonBucketInvalid name_status=INVALID reason=BAD_CHARS\n\n\n[Cas 3 — Erreur tiret adjacent à un point]\nBUCKET_AUDIT: bucket=data.-backup-bucket name_status=INVALID reason=BAD_DOT_DASH\n\n\n[Cas 4 — Erreur format adresse IP]\nBUCKET_AUDIT: bucket=192.168.1.50 name_status=INVALID reason=IP_FORMAT\n\n\n[Cas 5 — Erreur longueur inférieure à 3 caractères]\nBUCKET_AUDIT: bucket=ab name_status=INVALID reason=BAD_LENGTH"
  },
  {
    "id": "aws3-c5-e3",
    "chapter": 5,
    "title": "Calculateur de Capacité Provisionnée Amazon DynamoDB (RCU & WCU)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer précisément les unités de capacité de lecture (RCU) et d'écriture (WCU) requises pour une table DynamoDB.",
    "brief": "<p>Dans Amazon DynamoDB, la capacité provisionnée se calcule selon la taille d'élément et le mode de cohérence :<br><br>\n1. <strong>Calcul des Read Capacity Units (RCU)</strong> :<br>\n- Unité de base : blocs de <strong>4 KB</strong> arrondis au supérieur : <code>Blocs_R = math.ceil(Item_Size_KB / 4.0)</code> (ou 1 si size &lt;= 4).<br>\n- Mode <code>EVENTUAL</code> (Éventuellement cohérent) : 0.5 RCU par lecture par seconde :<br>\n<code>RCU = Blocs_R * Reads_Sec * 0.5</code>.<br>\n- Mode <code>STRONG</code> (Fortement cohérent) : 1 RCU par lecture par seconde :<br>\n<code>RCU = Blocs_R * Reads_Sec * 1.0</code>.<br>\n- Mode <code>TRANSACTIONAL</code> (Lectures transactionnelles) : 2 RCU par lecture par seconde :<br>\n<code>RCU = Blocs_R * Reads_Sec * 2.0</code>.<br>\nArrondir le RCU final à l'entier supérieur : <code>math.ceil(RCU)</code>.<br><br>\n2. <strong>Calcul des Write Capacity Units (WCU)</strong> :<br>\n- Unité de base : blocs de <strong>1 KB</strong> arrondis au supérieur : <code>Blocs_W = math.ceil(Item_Size_KB / 1.0)</code>.<br>\n- Mode <code>STANDARD</code> : 1 WCU par écriture par seconde :<br>\n<code>WCU = Blocs_W * Writes_Sec * 1.0</code>.<br>\n- Mode <code>TRANSACTIONAL</code> : 2 WCU par écriture par seconde :<br>\n<code>WCU = Blocs_W * Writes_Sec * 2.0</code>.<br><br>\nEntrée STDIN :<br>\n<code>DYNAMO_CAP SIZE_KB=&lt;k&gt; READS_SEC=&lt;r&gt; WRITES_SEC=&lt;w&gt; READ_MODE=&lt;EVENTUAL|STRONG|TRANSACTIONAL&gt; WRITE_MODE=&lt;STANDARD|TRANSACTIONAL&gt;</code>.<br><br>\nSortie : <code>DYNAMO_SIZING: size=&lt;k&gt;KB rcu=&lt;rcu&gt; wcu=&lt;wcu&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c5-e3) — Calculateur de Capacité Provisionnée Amazon DynamoDB (RCU & WCU)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Item de 10 KB avec lectures fortement cohérentes]\n# Données : DYNAMO_CAP SIZE_KB=10.0 READS_SEC=200 WRITES_SEC=20 READ_MODE=STRONG WRITE_MODE=STANDARD\nA_COMPLETER\n\n[Cas 2 — Transactions complètes ACID en lecture et écriture]\n# Données : DYNAMO_CAP SIZE_KB=2.0 READS_SEC=50 WRITES_SEC=30 READ_MODE=TRANSACTIONAL WRITE_MODE=TRANSACTIONAL\nA_COMPLETER\n\n[Cas 3 — Lecture avec fractionnement (RCU arrondi au supérieur)]\n# Données : DYNAMO_CAP SIZE_KB=1.0 READS_SEC=5 WRITES_SEC=5 READ_MODE=EVENTUAL WRITE_MODE=STANDARD\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "DYNAMO_CAP SIZE_KB=3.5 READS_SEC=100 WRITES_SEC=50 READ_MODE=EVENTUAL WRITE_MODE=STANDARD",
        "expected": "DYNAMO_SIZING: size=3.5KB rcu=50 wcu=200",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Item de 10 KB avec lectures fortement cohérentes",
        "stdin": "cas:1",
        "expected": "DYNAMO_SIZING: size=10.0KB rcu=600 wcu=200\n"
      },
      {
        "label": "Transactions complètes ACID en lecture et écriture",
        "stdin": "cas:2",
        "expected": "DYNAMO_SIZING: size=2.0KB rcu=100 wcu=120\n"
      },
      {
        "label": "Lecture avec fractionnement (RCU arrondi au supérieur)",
        "stdin": "cas:3",
        "expected": "DYNAMO_SIZING: size=1.0KB rcu=3 wcu=5\n"
      }
    ],
    "solution": "[Exemple]\nDYNAMO_SIZING: size=3.5KB rcu=50 wcu=200\n\n[Cas 1 — Item de 10 KB avec lectures fortement cohérentes]\nDYNAMO_SIZING: size=10.0KB rcu=600 wcu=200\n\n\n[Cas 2 — Transactions complètes ACID en lecture et écriture]\nDYNAMO_SIZING: size=2.0KB rcu=100 wcu=120\n\n\n[Cas 3 — Lecture avec fractionnement (RCU arrondi au supérieur)]\nDYNAMO_SIZING: size=1.0KB rcu=3 wcu=5"
  }
];
