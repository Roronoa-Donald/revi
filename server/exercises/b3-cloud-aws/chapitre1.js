/**
 * server/exercises/b3-cloud-aws/chapitre1.js — Exercices du Chapitre 1
 * Chapitre 1 : Fondements d'AWS, Infrastructure Globale & Modèle de Responsabilité Partagée
 */

module.exports = [
  {
    id: 'aws3-c1-e1',
    chapter: 1,
    title: 'Validateur d\'ARN (Amazon Resource Name) & Parseur de Composants',
    level: 'n1',
    language: 'python',
    goal: 'Valider et décomposer un identifiant de ressource AWS (ARN) selon la spécification officielle.',
    brief: `<p>Un <strong>ARN (Amazon Resource Name)</strong> identifie de manière unique toute ressource dans AWS.<br><br>
Format standard d'un ARN :<br>
<code>arn:partition:service:region:account-id:resource-id</code><br>
ou<br>
<code>arn:partition:service:region:account-id:resourcetype/resource-id</code><br>
ou<br>
<code>arn:partition:service:region:account-id:resourcetype:resource-id</code><br><br>
Règles de validation :<br>
1. Doit commencer par <code>arn:</code>.<br>
2. <code>partition</code> : doit être <code>aws</code>, <code>aws-cn</code> ou <code>aws-us-gov</code>.<br>
3. <code>service</code> : chaîne en minuscules, non vide (ex: <code>s3</code>, <code>ec2</code>, <code>iam</code>).<br>
4. <code>region</code> : code région AWS valide (ex: <code>eu-west-3</code>, <code>us-east-1</code>) ou vide pour les services globaux (ex: S3, IAM, CloudFront).<br>
5. <code>account-id</code> : exactement 12 chiffres décimaux, ou vide pour les services globaux/ressources sans compte explicite (ex: buckets S3).<br>
6. <code>resource</code> : non vide (tout ce qui suit le 5e séparateur deux-points <code>:</code>).<br><br>
Entrée STDIN : <code>ARN_PARSE &lt;arn_string&gt;</code>.<br>
Sortie : Si valide : <code>ARN: partition=&lt;part&gt; service=&lt;svc&gt; region=&lt;reg&gt; account=&lt;acc&gt; resource=&lt;res&gt;</code>.<br>
Si invalide : <code>INVALID_ARN: reason=&lt;raison&gt;</code> (ex: <code>BAD_PREFIX</code>, <code>INVALID_PARTITION</code>, <code>EMPTY_SERVICE</code>, <code>BAD_ACCOUNT</code>, <code>EMPTY_RESOURCE</code>, <code>BAD_SEGMENTS</code>).</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser et valider les ARN AWS
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'ARN_PARSE arn:aws:ec2:eu-west-3:123456789012:instance/i-0123456789abcdef0',
        expected: 'ARN: partition=aws service=ec2 region=eu-west-3 account=123456789012 resource=instance/i-0123456789abcdef0',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Bucket S3 global sans région ni compte',
        stdin: 'ARN_PARSE arn:aws:s3:::mon-bucket-production-2026',
        expected: 'ARN: partition=aws service=s3 region= account= resource=mon-bucket-production-2026\n'
      },
      {
        label: 'Rôle IAM global sans région avec compte 12 chiffres',
        stdin: 'ARN_PARSE arn:aws:iam::112233445566:role/AdminRole',
        expected: 'ARN: partition=aws service=iam region= account=112233445566 resource=role/AdminRole\n'
      },
      {
        label: 'Partition AWS Chine avec fonction Lambda',
        stdin: 'ARN_PARSE arn:aws-cn:lambda:cn-north-1:987654321098:function:ProcessOrders',
        expected: 'ARN: partition=aws-cn service=lambda region=cn-north-1 account=987654321098 resource=function:ProcessOrders\n'
      },
      {
        label: 'Erreur préfixe ARN invalide',
        stdin: 'ARN_PARSE uri:aws:s3:::mon-bucket',
        expected: 'INVALID_ARN: reason=BAD_PREFIX\n'
      },
      {
        label: 'Erreur partition invalide',
        stdin: 'ARN_PARSE arn:google:compute:europe-west1:123456789012:instance/vm1',
        expected: 'INVALID_ARN: reason=INVALID_PARTITION\n'
      },
      {
        label: 'Erreur compte invalide (pas 12 chiffres)',
        stdin: 'ARN_PARSE arn:aws:ec2:us-east-1:12345:instance/i-123',
        expected: 'INVALID_ARN: reason=BAD_ACCOUNT\n'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("ARN_PARSE "):
        continue
    raw_arn = ligne.split("ARN_PARSE ", 1)[1].strip()

    if not raw_arn.startswith("arn:"):
        print("INVALID_ARN: reason=BAD_PREFIX")
        continue

    parts = raw_arn.split(":", 5)
    if len(parts) < 6:
        print("INVALID_ARN: reason=BAD_SEGMENTS")
        continue

    _, partition, service, region, account, resource = parts

    if partition not in ("aws", "aws-cn", "aws-us-gov"):
        print("INVALID_ARN: reason=INVALID_PARTITION")
        continue

    if not service or not service.islower():
        print("INVALID_ARN: reason=EMPTY_SERVICE")
        continue

    if account != "":
        if not (account.isdigit() and len(account) == 12):
            print("INVALID_ARN: reason=BAD_ACCOUNT")
            continue

    if not resource:
        print("INVALID_ARN: reason=EMPTY_RESOURCE")
        continue

    print(f"ARN: partition={partition} service={service} region={region} account={account} resource={resource}")
`
  },
  {
    id: 'aws3-c1-e2',
    chapter: 1,
    title: 'Calculateur de Disponibilité & Temps d\'Arrêt Annuel (SLA Multi-AZ)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la disponibilité globale d\'une architecture en série ou en parallèle et estimer le temps d\'arrêt maximal autorisé par an.',
    brief: `<p>La haute disponibilité dans AWS repose sur la composition de services résilients :<br><br>
1. <strong>Composants en série (dépendance stricte)</strong> :<br>
La défaillance d'un seul composant entraîne la panne globale.<br>
<code>A_total = A_1 * A_2 * ... * A_n</code> (où <code>A_i</code> est la disponibilité en fraction [0..1]).<br><br>
2. <strong>Composants en parallèle (redondance active Multi-AZ)</strong> :<br>
Le système fonctionne tant qu'au moins un composant est actif.<br>
<code>A_total = 1.0 - ((1.0 - A_1) * (1.0 - A_2) * ... * (1.0 - A_n))</code>.<br><br>
3. <strong>Temps d'arrêt annuel maximal (Downtime)</strong> :<br>
Sur une base de 365 jours (soit 8 760 heures = 525 600 minutes) :<br>
<code>Downtime_heures = (1.0 - A_total) * 8760</code>.<br><br>
Entrée STDIN : <code>AVAIL_CALC MODE=&lt;SERIE|PARALLELE&gt; SLA=&lt;pct1,pct2,...&gt;</code>.<br>
Sortie : <code>AVAILABILITY: mode=&lt;MODE&gt; sla=&lt;pct_final:.4f&gt;% downtime_hours=&lt;h:.2f&gt; downtime_minutes=&lt;m:.1f&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la disponibilité globale et le temps d'arrêt annuel
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'AVAIL_CALC MODE=SERIE SLA=99.9,99.95',
        expected: 'AVAILABILITY: mode=SERIE sla=99.8501% downtime_hours=13.14 downtime_minutes=788.1',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Deux zones redondantes en parallèle (99.9% chacune)',
        stdin: 'AVAIL_CALC MODE=PARALLELE SLA=99.9,99.9',
        expected: 'AVAILABILITY: mode=PARALLELE sla=99.9999% downtime_hours=0.01 downtime_minutes=0.5\n'
      },
      {
        label: 'Trois composants critiques en série (99.99%, 99.95%, 99.9%)',
        stdin: 'AVAIL_CALC MODE=SERIE SLA=99.99,99.95,99.9',
        expected: 'AVAILABILITY: mode=SERIE sla=99.8401% downtime_hours=14.01 downtime_minutes=840.6\n'
      },
      {
        label: 'Trois zones Multi-AZ en parallèle (99.5% chacune)',
        stdin: 'AVAIL_CALC MODE=PARALLELE SLA=99.5,99.5,99.5',
        expected: 'AVAILABILITY: mode=PARALLELE sla=100.0000% downtime_hours=0.00 downtime_minutes=0.1\n'
      },
      {
        label: 'Composant unique 99.99% (SLA 4 neuf)',
        stdin: 'AVAIL_CALC MODE=SERIE SLA=99.99',
        expected: 'AVAILABILITY: mode=SERIE sla=99.9900% downtime_hours=0.88 downtime_minutes=52.6\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("AVAIL_CALC "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    mode = params.get("MODE", "SERIE").upper()
    sla_vals = [float(x) / 100.0 for x in params.get("SLA", "").split(",") if x.strip()]

    if not sla_vals:
        continue

    if mode == "SERIE":
        res = 1.0
        for s in sla_vals:
            res *= s
    else:  # PARALLELE
        unavail = 1.0
        for s in sla_vals:
            unavail *= (1.0 - s)
        res = 1.0 - unavail

    pct_final = res * 100.0
    downtime_h = (1.0 - res) * 8760.0
    downtime_m = (1.0 - res) * 525600.0

    print(f"AVAILABILITY: mode={mode} sla={pct_final:.4f}% downtime_hours={downtime_h:.2f} downtime_minutes={downtime_m:.1f}")
`
  },
  {
    id: 'aws3-c1-e3',
    chapter: 1,
    title: 'Auditeur de Responsabilité Partagée AWS (Shared Responsibility Model)',
    level: 'n2',
    language: 'python',
    goal: 'Déterminer qui d\'AWS ou du Client est responsable d\'une tâche de sécurité selon le modèle de service.',
    brief: `<p>Le <strong>modèle de responsabilité partagée</strong> d'AWS distingue :<br>
- <strong>Sécurité DU Cloud (AWS)</strong> : matériel physique, hyperviseurs, installations des centres de données, réseau sous-jacent, patchs des services managés/serverless.<br>
- <strong>Sécurité DANS le Cloud (Client)</strong> : configuration réseau (VPC, Security Groups), gestion des identités IAM, mises à jour des OS d'instances EC2, chiffrement des données au repos/en transit.<br><br>
Règles selon le modèle de service :<br>
1. <strong>IaaS (ex: EC2, EBS, VPC)</strong> :<br>
- Matériel physique, hyperviseur, réseau physique -> <code>AWS</code>.<br>
- Patch OS invité, firewall instance (Security Group), logiciels applicatifs, données -> <code>CUSTOMER</code>.<br>
2. <strong>PaaS (ex: RDS, Elastic Beanstalk)</strong> :<br>
- Patch OS serveur de base de données, infrastructure RDS -> <code>AWS</code>.<br>
- Optimisation des index SQL, gestion des utilisateurs DB, paramètres de chiffrement -> <code>CUSTOMER</code>.<br>
3. <strong>Serverless (ex: Lambda, S3, DynamoDB)</strong> :<br>
- Système d'exploitation, runtime d'exécution (Python/Node.js), haute disponibilité du service -> <code>AWS</code>.<br>
- Code applicatif, permissions IAM de fonction, bucket policies S3, chiffrement applicatif -> <code>CUSTOMER</code>.<br><br>
Entrée STDIN : <code>RESP_AUDIT SERVICE=&lt;IAAS|PAAS|SERVERLESS&gt; ITEM=&lt;tâche_de_sécurité&gt;</code>.<br>
Sortie : <code>SHARED_RESP: service=&lt;svc&gt; item=&lt;item&gt; responsible=&lt;AWS|CUSTOMER&gt; scope=&lt;OF_THE_CLOUD|IN_THE_CLOUD&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier la responsabilité selon la matrice AWS
`,
    hints: [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    examples: [
      {
        stdin: 'RESP_AUDIT SERVICE=IAAS ITEM=GUEST_OS_PATCHING',
        expected: 'SHARED_RESP: service=IAAS item=GUEST_OS_PATCHING responsible=CUSTOMER scope=IN_THE_CLOUD',
        note: "Cas d'usage nominal."
      }
    ],
    tests: [
      {
        label: 'Patch de l hyperviseur physique en IaaS',
        stdin: 'RESP_AUDIT SERVICE=IAAS ITEM=HYPERVISOR_PATCHING',
        expected: 'SHARED_RESP: service=IAAS item=HYPERVISOR_PATCHING responsible=AWS scope=OF_THE_CLOUD\n'
      },
      {
        label: 'Configuration des Security Groups en IaaS',
        stdin: 'RESP_AUDIT SERVICE=IAAS ITEM=SECURITY_GROUP_CONFIG',
        expected: 'SHARED_RESP: service=IAAS item=SECURITY_GROUP_CONFIG responsible=CUSTOMER scope=IN_THE_CLOUD\n'
      },
      {
        label: 'Patch de l OS de base de données RDS en PaaS',
        stdin: 'RESP_AUDIT SERVICE=PAAS ITEM=DATABASE_OS_PATCHING',
        expected: 'SHARED_RESP: service=PAAS item=DATABASE_OS_PATCHING responsible=AWS scope=OF_THE_CLOUD\n'
      },
      {
        label: 'Maintien et patch du runtime Lambda en Serverless',
        stdin: 'RESP_AUDIT SERVICE=SERVERLESS ITEM=RUNTIME_MAINTENANCE',
        expected: 'SHARED_RESP: service=SERVERLESS item=RUNTIME_MAINTENANCE responsible=AWS scope=OF_THE_CLOUD\n'
      },
      {
        label: 'Code source et logique applicative Lambda en Serverless',
        stdin: 'RESP_AUDIT SERVICE=SERVERLESS ITEM=FUNCTION_CODE',
        expected: 'SHARED_RESP: service=SERVERLESS item=FUNCTION_CODE responsible=CUSTOMER scope=IN_THE_CLOUD\n'
      },
      {
        label: 'Chiffrement des données stockées dans un bucket S3',
        stdin: 'RESP_AUDIT SERVICE=SERVERLESS ITEM=DATA_ENCRYPTION_CONFIG',
        expected: 'SHARED_RESP: service=SERVERLESS item=DATA_ENCRYPTION_CONFIG responsible=CUSTOMER scope=IN_THE_CLOUD\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# Matrice de responsabilité
AWS_ITEMS = {
    "IAAS": {"HYPERVISOR_PATCHING", "PHYSICAL_DATA_CENTER_SECURITY", "HARDWARE_MAINTENANCE", "PHYSICAL_NETWORKING"},
    "PAAS": {"HYPERVISOR_PATCHING", "PHYSICAL_DATA_CENTER_SECURITY", "HARDWARE_MAINTENANCE", "PHYSICAL_NETWORKING", "DATABASE_OS_PATCHING", "INFRASTRUCTURE_FAILOVER"},
    "SERVERLESS": {"HYPERVISOR_PATCHING", "PHYSICAL_DATA_CENTER_SECURITY", "HARDWARE_MAINTENANCE", "PHYSICAL_NETWORKING", "RUNTIME_MAINTENANCE", "CONTAINER_ORCHESTRATION", "OS_PATCHING"}
}

for ligne in lignes:
    if not ligne.startswith("RESP_AUDIT "):
        continue
    tokens = ligne.split()
    params = {}
    for t in tokens[1:]:
        if "=" in t:
            k, v = t.split("=", 1)
            params[k.upper()] = v

    service = params.get("SERVICE", "IAAS").upper()
    item = params.get("ITEM", "").upper()

    aws_set = AWS_ITEMS.get(service, set())
    if item in aws_set:
        resp = "AWS"
        scope = "OF_THE_CLOUD"
    else:
        resp = "CUSTOMER"
        scope = "IN_THE_CLOUD"

    print(f"SHARED_RESP: service={service} item={item} responsible={resp} scope={scope}")
`
  }
];
