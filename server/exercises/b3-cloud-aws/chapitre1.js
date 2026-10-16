'use strict';

module.exports = [
  {
    "id": "aws3-c1-e1",
    "chapter": 1,
    "title": "Validateur d'ARN (Amazon Resource Name) & Parseur de Composants",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider et décomposer un identifiant de ressource AWS (ARN) selon la spécification officielle.",
    "brief": "<p>Un <strong>ARN (Amazon Resource Name)</strong> identifie de manière unique toute ressource dans AWS.<br><br>\nFormat standard d'un ARN :<br>\n<code>arn:partition:service:region:account-id:resource-id</code><br>\nou<br>\n<code>arn:partition:service:region:account-id:resourcetype/resource-id</code><br>\nou<br>\n<code>arn:partition:service:region:account-id:resourcetype:resource-id</code><br><br>\nRègles de validation :<br>\n1. Doit commencer par <code>arn:</code>.<br>\n2. <code>partition</code> : doit être <code>aws</code>, <code>aws-cn</code> ou <code>aws-us-gov</code>.<br>\n3. <code>service</code> : chaîne en minuscules, non vide (ex: <code>s3</code>, <code>ec2</code>, <code>iam</code>).<br>\n4. <code>region</code> : code région AWS valide (ex: <code>eu-west-3</code>, <code>us-east-1</code>) ou vide pour les services globaux (ex: S3, IAM, CloudFront).<br>\n5. <code>account-id</code> : exactement 12 chiffres décimaux, ou vide pour les services globaux/ressources sans compte explicite (ex: buckets S3).<br>\n6. <code>resource</code> : non vide (tout ce qui suit le 5e séparateur deux-points <code>:</code>).<br><br>\nEntrée STDIN : <code>ARN_PARSE &lt;arn_string&gt;</code>.<br>\nSortie : Si valide : <code>ARN: partition=&lt;part&gt; service=&lt;svc&gt; region=&lt;reg&gt; account=&lt;acc&gt; resource=&lt;res&gt;</code>.<br>\nSi invalide : <code>INVALID_ARN: reason=&lt;raison&gt;</code> (ex: <code>BAD_PREFIX</code>, <code>INVALID_PARTITION</code>, <code>EMPTY_SERVICE</code>, <code>BAD_ACCOUNT</code>, <code>EMPTY_RESOURCE</code>, <code>BAD_SEGMENTS</code>).</p>",
    "starter": "# Grille d'analyse (aws3-c1-e1) — Validateur d'ARN (Amazon Resource Name) & Parseur de Composants\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bucket S3 global sans région ni compte]\n# Données : ARN_PARSE arn:aws:s3:::mon-bucket-production-2026\nA_COMPLETER\n\n[Cas 2 — Rôle IAM global sans région avec compte 12 chiffres]\n# Données : ARN_PARSE arn:aws:iam::112233445566:role/AdminRole\nA_COMPLETER\n\n[Cas 3 — Partition AWS Chine avec fonction Lambda]\n# Données : ARN_PARSE arn:aws-cn:lambda:cn-north-1:987654321098:function:ProcessOrders\nA_COMPLETER\n\n[Cas 4 — Erreur préfixe ARN invalide]\n# Données : ARN_PARSE uri:aws:s3:::mon-bucket\nA_COMPLETER\n\n[Cas 5 — Erreur partition invalide]\n# Données : ARN_PARSE arn:google:compute:europe-west1:123456789012:instance/vm1\nA_COMPLETER\n\n[Cas 6 — Erreur compte invalide (pas 12 chiffres)]\n# Données : ARN_PARSE arn:aws:ec2:us-east-1:12345:instance/i-123\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "ARN_PARSE arn:aws:ec2:eu-west-3:123456789012:instance/i-0123456789abcdef0",
        "expected": "ARN: partition=aws service=ec2 region=eu-west-3 account=123456789012 resource=instance/i-0123456789abcdef0",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Bucket S3 global sans région ni compte",
        "stdin": "cas:1",
        "expected": "ARN: partition=aws service=s3 region= account= resource=mon-bucket-production-2026\n"
      },
      {
        "label": "Rôle IAM global sans région avec compte 12 chiffres",
        "stdin": "cas:2",
        "expected": "ARN: partition=aws service=iam region= account=112233445566 resource=role/AdminRole\n"
      },
      {
        "label": "Partition AWS Chine avec fonction Lambda",
        "stdin": "cas:3",
        "expected": "ARN: partition=aws-cn service=lambda region=cn-north-1 account=987654321098 resource=function:ProcessOrders\n"
      },
      {
        "label": "Erreur préfixe ARN invalide",
        "stdin": "cas:4",
        "expected": "INVALID_ARN: reason=BAD_PREFIX\n"
      },
      {
        "label": "Erreur partition invalide",
        "stdin": "cas:5",
        "expected": "INVALID_ARN: reason=INVALID_PARTITION\n"
      },
      {
        "label": "Erreur compte invalide (pas 12 chiffres)",
        "stdin": "cas:6",
        "expected": "INVALID_ARN: reason=BAD_ACCOUNT\n"
      }
    ],
    "solution": "[Exemple]\nARN: partition=aws service=ec2 region=eu-west-3 account=123456789012 resource=instance/i-0123456789abcdef0\n\n[Cas 1 — Bucket S3 global sans région ni compte]\nARN: partition=aws service=s3 region= account= resource=mon-bucket-production-2026\n\n\n[Cas 2 — Rôle IAM global sans région avec compte 12 chiffres]\nARN: partition=aws service=iam region= account=112233445566 resource=role/AdminRole\n\n\n[Cas 3 — Partition AWS Chine avec fonction Lambda]\nARN: partition=aws-cn service=lambda region=cn-north-1 account=987654321098 resource=function:ProcessOrders\n\n\n[Cas 4 — Erreur préfixe ARN invalide]\nINVALID_ARN: reason=BAD_PREFIX\n\n\n[Cas 5 — Erreur partition invalide]\nINVALID_ARN: reason=INVALID_PARTITION\n\n\n[Cas 6 — Erreur compte invalide (pas 12 chiffres)]\nINVALID_ARN: reason=BAD_ACCOUNT"
  },
  {
    "id": "aws3-c1-e2",
    "chapter": 1,
    "title": "Calculateur de Disponibilité & Temps d'Arrêt Annuel (SLA Multi-AZ)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la disponibilité globale d'une architecture en série ou en parallèle et estimer le temps d'arrêt maximal autorisé par an.",
    "brief": "<p>La haute disponibilité dans AWS repose sur la composition de services résilients :<br><br>\n1. <strong>Composants en série (dépendance stricte)</strong> :<br>\nLa défaillance d'un seul composant entraîne la panne globale.<br>\n<code>A_total = A_1 * A_2 * ... * A_n</code> (où <code>A_i</code> est la disponibilité en fraction [0..1]).<br><br>\n2. <strong>Composants en parallèle (redondance active Multi-AZ)</strong> :<br>\nLe système fonctionne tant qu'au moins un composant est actif.<br>\n<code>A_total = 1.0 - ((1.0 - A_1) * (1.0 - A_2) * ... * (1.0 - A_n))</code>.<br><br>\n3. <strong>Temps d'arrêt annuel maximal (Downtime)</strong> :<br>\nSur une base de 365 jours (soit 8 760 heures = 525 600 minutes) :<br>\n<code>Downtime_heures = (1.0 - A_total) * 8760</code>.<br><br>\nEntrée STDIN : <code>AVAIL_CALC MODE=&lt;SERIE|PARALLELE&gt; SLA=&lt;pct1,pct2,...&gt;</code>.<br>\nSortie : <code>AVAILABILITY: mode=&lt;MODE&gt; sla=&lt;pct_final:.4f&gt;% downtime_hours=&lt;h:.2f&gt; downtime_minutes=&lt;m:.1f&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c1-e2) — Calculateur de Disponibilité & Temps d'Arrêt Annuel (SLA Multi-AZ)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux zones redondantes en parallèle (99.9% chacune)]\n# Données : AVAIL_CALC MODE=PARALLELE SLA=99.9,99.9\nA_COMPLETER\n\n[Cas 2 — Trois composants critiques en série (99.99%, 99.95%, 99.9%)]\n# Données : AVAIL_CALC MODE=SERIE SLA=99.99,99.95,99.9\nA_COMPLETER\n\n[Cas 3 — Trois zones Multi-AZ en parallèle (99.5% chacune)]\n# Données : AVAIL_CALC MODE=PARALLELE SLA=99.5,99.5,99.5\nA_COMPLETER\n\n[Cas 4 — Composant unique 99.99% (SLA 4 neuf)]\n# Données : AVAIL_CALC MODE=SERIE SLA=99.99\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "AVAIL_CALC MODE=SERIE SLA=99.9,99.95",
        "expected": "AVAILABILITY: mode=SERIE sla=99.8501% downtime_hours=13.14 downtime_minutes=788.1",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Deux zones redondantes en parallèle (99.9% chacune)",
        "stdin": "cas:1",
        "expected": "AVAILABILITY: mode=PARALLELE sla=99.9999% downtime_hours=0.01 downtime_minutes=0.5\n"
      },
      {
        "label": "Trois composants critiques en série (99.99%, 99.95%, 99.9%)",
        "stdin": "cas:2",
        "expected": "AVAILABILITY: mode=SERIE sla=99.8401% downtime_hours=14.01 downtime_minutes=840.6\n"
      },
      {
        "label": "Trois zones Multi-AZ en parallèle (99.5% chacune)",
        "stdin": "cas:3",
        "expected": "AVAILABILITY: mode=PARALLELE sla=100.0000% downtime_hours=0.00 downtime_minutes=0.1\n"
      },
      {
        "label": "Composant unique 99.99% (SLA 4 neuf)",
        "stdin": "cas:4",
        "expected": "AVAILABILITY: mode=SERIE sla=99.9900% downtime_hours=0.88 downtime_minutes=52.6\n"
      }
    ],
    "solution": "[Exemple]\nAVAILABILITY: mode=SERIE sla=99.8501% downtime_hours=13.14 downtime_minutes=788.1\n\n[Cas 1 — Deux zones redondantes en parallèle (99.9% chacune)]\nAVAILABILITY: mode=PARALLELE sla=99.9999% downtime_hours=0.01 downtime_minutes=0.5\n\n\n[Cas 2 — Trois composants critiques en série (99.99%, 99.95%, 99.9%)]\nAVAILABILITY: mode=SERIE sla=99.8401% downtime_hours=14.01 downtime_minutes=840.6\n\n\n[Cas 3 — Trois zones Multi-AZ en parallèle (99.5% chacune)]\nAVAILABILITY: mode=PARALLELE sla=100.0000% downtime_hours=0.00 downtime_minutes=0.1\n\n\n[Cas 4 — Composant unique 99.99% (SLA 4 neuf)]\nAVAILABILITY: mode=SERIE sla=99.9900% downtime_hours=0.88 downtime_minutes=52.6"
  },
  {
    "id": "aws3-c1-e3",
    "chapter": 1,
    "title": "Auditeur de Responsabilité Partagée AWS (Shared Responsibility Model)",
    "level": "n2",
    "language": "analyse",
    "goal": "Déterminer qui d'AWS ou du Client est responsable d'une tâche de sécurité selon le modèle de service.",
    "brief": "<p>Le <strong>modèle de responsabilité partagée</strong> d'AWS distingue :<br>\n- <strong>Sécurité DU Cloud (AWS)</strong> : matériel physique, hyperviseurs, installations des centres de données, réseau sous-jacent, patchs des services managés/serverless.<br>\n- <strong>Sécurité DANS le Cloud (Client)</strong> : configuration réseau (VPC, Security Groups), gestion des identités IAM, mises à jour des OS d'instances EC2, chiffrement des données au repos/en transit.<br><br>\nRègles selon le modèle de service :<br>\n1. <strong>IaaS (ex: EC2, EBS, VPC)</strong> :<br>\n- Matériel physique, hyperviseur, réseau physique -> <code>AWS</code>.<br>\n- Patch OS invité, firewall instance (Security Group), logiciels applicatifs, données -> <code>CUSTOMER</code>.<br>\n2. <strong>PaaS (ex: RDS, Elastic Beanstalk)</strong> :<br>\n- Patch OS serveur de base de données, infrastructure RDS -> <code>AWS</code>.<br>\n- Optimisation des index SQL, gestion des utilisateurs DB, paramètres de chiffrement -> <code>CUSTOMER</code>.<br>\n3. <strong>Serverless (ex: Lambda, S3, DynamoDB)</strong> :<br>\n- Système d'exploitation, runtime d'exécution (Python/Node.js), haute disponibilité du service -> <code>AWS</code>.<br>\n- Code applicatif, permissions IAM de fonction, bucket policies S3, chiffrement applicatif -> <code>CUSTOMER</code>.<br><br>\nEntrée STDIN : <code>RESP_AUDIT SERVICE=&lt;IAAS|PAAS|SERVERLESS&gt; ITEM=&lt;tâche_de_sécurité&gt;</code>.<br>\nSortie : <code>SHARED_RESP: service=&lt;svc&gt; item=&lt;item&gt; responsible=&lt;AWS|CUSTOMER&gt; scope=&lt;OF_THE_CLOUD|IN_THE_CLOUD&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c1-e3) — Auditeur de Responsabilité Partagée AWS (Shared Responsibility Model)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Patch de l hyperviseur physique en IaaS]\n# Données : RESP_AUDIT SERVICE=IAAS ITEM=HYPERVISOR_PATCHING\nA_COMPLETER\n\n[Cas 2 — Configuration des Security Groups en IaaS]\n# Données : RESP_AUDIT SERVICE=IAAS ITEM=SECURITY_GROUP_CONFIG\nA_COMPLETER\n\n[Cas 3 — Patch de l OS de base de données RDS en PaaS]\n# Données : RESP_AUDIT SERVICE=PAAS ITEM=DATABASE_OS_PATCHING\nA_COMPLETER\n\n[Cas 4 — Maintien et patch du runtime Lambda en Serverless]\n# Données : RESP_AUDIT SERVICE=SERVERLESS ITEM=RUNTIME_MAINTENANCE\nA_COMPLETER\n\n[Cas 5 — Code source et logique applicative Lambda en Serverless]\n# Données : RESP_AUDIT SERVICE=SERVERLESS ITEM=FUNCTION_CODE\nA_COMPLETER\n\n[Cas 6 — Chiffrement des données stockées dans un bucket S3]\n# Données : RESP_AUDIT SERVICE=SERVERLESS ITEM=DATA_ENCRYPTION_CONFIG\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée STDIN.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "RESP_AUDIT SERVICE=IAAS ITEM=GUEST_OS_PATCHING",
        "expected": "SHARED_RESP: service=IAAS item=GUEST_OS_PATCHING responsible=CUSTOMER scope=IN_THE_CLOUD",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Patch de l hyperviseur physique en IaaS",
        "stdin": "cas:1",
        "expected": "SHARED_RESP: service=IAAS item=HYPERVISOR_PATCHING responsible=AWS scope=OF_THE_CLOUD\n"
      },
      {
        "label": "Configuration des Security Groups en IaaS",
        "stdin": "cas:2",
        "expected": "SHARED_RESP: service=IAAS item=SECURITY_GROUP_CONFIG responsible=CUSTOMER scope=IN_THE_CLOUD\n"
      },
      {
        "label": "Patch de l OS de base de données RDS en PaaS",
        "stdin": "cas:3",
        "expected": "SHARED_RESP: service=PAAS item=DATABASE_OS_PATCHING responsible=AWS scope=OF_THE_CLOUD\n"
      },
      {
        "label": "Maintien et patch du runtime Lambda en Serverless",
        "stdin": "cas:4",
        "expected": "SHARED_RESP: service=SERVERLESS item=RUNTIME_MAINTENANCE responsible=AWS scope=OF_THE_CLOUD\n"
      },
      {
        "label": "Code source et logique applicative Lambda en Serverless",
        "stdin": "cas:5",
        "expected": "SHARED_RESP: service=SERVERLESS item=FUNCTION_CODE responsible=CUSTOMER scope=IN_THE_CLOUD\n"
      },
      {
        "label": "Chiffrement des données stockées dans un bucket S3",
        "stdin": "cas:6",
        "expected": "SHARED_RESP: service=SERVERLESS item=DATA_ENCRYPTION_CONFIG responsible=CUSTOMER scope=IN_THE_CLOUD\n"
      }
    ],
    "solution": "[Exemple]\nSHARED_RESP: service=IAAS item=GUEST_OS_PATCHING responsible=CUSTOMER scope=IN_THE_CLOUD\n\n[Cas 1 — Patch de l hyperviseur physique en IaaS]\nSHARED_RESP: service=IAAS item=HYPERVISOR_PATCHING responsible=AWS scope=OF_THE_CLOUD\n\n\n[Cas 2 — Configuration des Security Groups en IaaS]\nSHARED_RESP: service=IAAS item=SECURITY_GROUP_CONFIG responsible=CUSTOMER scope=IN_THE_CLOUD\n\n\n[Cas 3 — Patch de l OS de base de données RDS en PaaS]\nSHARED_RESP: service=PAAS item=DATABASE_OS_PATCHING responsible=AWS scope=OF_THE_CLOUD\n\n\n[Cas 4 — Maintien et patch du runtime Lambda en Serverless]\nSHARED_RESP: service=SERVERLESS item=RUNTIME_MAINTENANCE responsible=AWS scope=OF_THE_CLOUD\n\n\n[Cas 5 — Code source et logique applicative Lambda en Serverless]\nSHARED_RESP: service=SERVERLESS item=FUNCTION_CODE responsible=CUSTOMER scope=IN_THE_CLOUD\n\n\n[Cas 6 — Chiffrement des données stockées dans un bucket S3]\nSHARED_RESP: service=SERVERLESS item=DATA_ENCRYPTION_CONFIG responsible=CUSTOMER scope=IN_THE_CLOUD"
  }
];
