'use strict';

module.exports = [
  {
    "id": "aws3-c2-e1",
    "chapter": 2,
    "title": "Moteur d'Évaluation de Politiques IAM JSON (Deny / Allow / Default Deny)",
    "level": "n1",
    "language": "analyse",
    "goal": "Implémenter l'algorithme d'évaluation officiel des politiques d'autorisation IAM d'AWS.",
    "brief": "<p>Dans AWS IAM, chaque requête API est évaluée selon un ordre strict :<br><br>\n1. <strong>Default Deny</strong> : Par défaut, toute requête est refusée.<br>\n2. <strong>Explicit Deny prioritaire</strong> : Si au moins une déclaration applicable comporte <code>Effect: Deny</code>, la décision finale est <code>DENY</code>, quoi qu'il arrive.<br>\n3. <strong>Explicit Allow</strong> : Si aucune déclaration ne refuse la requête et qu'au moins une déclaration comporte <code>Effect: Allow</code>, la décision est <code>ALLOW</code>.<br>\n4. <strong>Refus implicite</strong> : Si aucune déclaration ne s'applique, la décision finale reste <code>DENY</code>.<br><br>\nLes actions supportent le préfixe avec joker (ex: <code>s3:Get*</code> correspond à <code>s3:GetObject</code>, <code>s3:GetBucketLocation</code> ; <code>*</code> correspond à tout).<br><br>\nFormat d'Données du cas :<br>\n<code>ACTION=&lt;action_demandée&gt; STATEMENTS=&lt;Effect:Action_pattern;Effect:Action_pattern;...&gt;</code><br><br>\nRésultat d’analyse attendu : <code>IAM_EVAL: action=&lt;act&gt; decision=&lt;ALLOW|DENY&gt; reason=&lt;EXPLICIT_DENY|EXPLICIT_ALLOW|DEFAULT_DENY&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c2-e1) — Moteur d'Évaluation de Politiques IAM JSON (Deny / Allow / Default Deny)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deny explicite prioritaire sur un Allow générique]\n# Données : ACTION=s3:DeleteBucket STATEMENTS=Allow:s3:*;Deny:s3:DeleteBucket\nA_COMPLETER\n\n[Cas 2 — Refus par défaut (aucune politique correspondante)]\n# Données : ACTION=ec2:RunInstances STATEMENTS=Allow:s3:GetObject;Allow:s3:ListBucket\nA_COMPLETER\n\n[Cas 3 — Allow complet avec joker universel (*)]\n# Données : ACTION=iam:CreateUser STATEMENTS=Allow:*\nA_COMPLETER\n\n[Cas 4 — Deny avec joker sur les suppressions]\n# Données : ACTION=dynamodb:DeleteItem STATEMENTS=Allow:dynamodb:*;Deny:*:Delete*\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée les données d’entrée.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "ACTION=s3:GetObject STATEMENTS=Allow:s3:Get*;Deny:s3:PutObject",
        "expected": "IAM_EVAL: action=s3:GetObject decision=ALLOW reason=EXPLICIT_ALLOW",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Deny explicite prioritaire sur un Allow générique",
        "stdin": "cas:1",
        "expected": "IAM_EVAL: action=s3:DeleteBucket decision=DENY reason=EXPLICIT_DENY\n"
      },
      {
        "label": "Refus par défaut (aucune politique correspondante)",
        "stdin": "cas:2",
        "expected": "IAM_EVAL: action=ec2:RunInstances decision=DENY reason=DEFAULT_DENY\n"
      },
      {
        "label": "Allow complet avec joker universel (*)",
        "stdin": "cas:3",
        "expected": "IAM_EVAL: action=iam:CreateUser decision=ALLOW reason=EXPLICIT_ALLOW\n"
      },
      {
        "label": "Deny avec joker sur les suppressions",
        "stdin": "cas:4",
        "expected": "IAM_EVAL: action=dynamodb:DeleteItem decision=DENY reason=EXPLICIT_DENY\n"
      }
    ],
    "solution": "[Exemple]\nIAM_EVAL: action=s3:GetObject decision=ALLOW reason=EXPLICIT_ALLOW\n\n[Cas 1 — Deny explicite prioritaire sur un Allow générique]\nIAM_EVAL: action=s3:DeleteBucket decision=DENY reason=EXPLICIT_DENY\n\n\n[Cas 2 — Refus par défaut (aucune politique correspondante)]\nIAM_EVAL: action=ec2:RunInstances decision=DENY reason=DEFAULT_DENY\n\n\n[Cas 3 — Allow complet avec joker universel (*)]\nIAM_EVAL: action=iam:CreateUser decision=ALLOW reason=EXPLICIT_ALLOW\n\n\n[Cas 4 — Deny avec joker sur les suppressions]\nIAM_EVAL: action=dynamodb:DeleteItem decision=DENY reason=EXPLICIT_DENY"
  },
  {
    "id": "aws3-c2-e2",
    "chapter": 2,
    "title": "Auditeur de Clés d'Accès IAM & Détecteur d'Inactivité / Rotation",
    "level": "n2",
    "language": "analyse",
    "goal": "Auditer le rapport d'identifiants IAM (Credential Report) et identifier les clés compromises, inactives ou périmées.",
    "brief": "<p>Les bonnes pratiques de sécurité AWS exigent une rotation régulière des clés d'accès programmatiques (Access Keys) :<br><br>\nRègles d'audit d'une clé :<br>\n1. <strong>Format valide</strong> : Une clé d'accès IAM permanente commence obligatoirement par le préfixe <code>AKIA</code> et comporte exactement 20 caractères alphanumériques majuscules.<br>\nSi ce n'est pas le cas -> <code>ALERT_MALFORMED_KEY</code>.<br>\n2. <strong>Statut inactif</strong> : Si <code>STATUS=Inactive</code> -> <code>NOTICE_KEY_INACTIVE</code> (ne pose pas de risque immédiat mais doit être supprimée).<br>\n3. <strong>Périmètre d'âge (Rotation)</strong> :<br>\n- Si <code>STATUS=Active</code> et <code>AGE_DAYS &gt; 90</code> -> <code>ALERT_ROTATION_REQUIRED</code> (dépassement du seuil de 90 jours préconisé par AWS).<br>\n- Si <code>STATUS=Active</code> et <code>AGE_DAYS &lt;= 90</code> -> <code>KEY_COMPLIANT</code>.<br><br>\nDonnées du cas : <code>KEY_AUDIT USER=&lt;username&gt; KEY_ID=&lt;key&gt; STATUS=&lt;Active|Inactive&gt; AGE_DAYS=&lt;n&gt;</code>.<br>\nRésultat d’analyse attendu : <code>AUDIT: user=&lt;u&gt; key=&lt;k&gt; status=&lt;s&gt; age_days=&lt;n&gt; verdict=&lt;VERDICT&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c2-e2) — Auditeur de Clés d'Accès IAM & Détecteur d'Inactivité / Rotation\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Clé active ayant dépassé 90 jours (120 jours)]\n# Données : KEY_AUDIT USER=admin-bob KEY_ID=AKIA1122334455667788 STATUS=Active AGE_DAYS=120\nA_COMPLETER\n\n[Cas 2 — Clé inactive conservée (40 jours)]\n# Données : KEY_AUDIT USER=svc-app KEY_ID=AKIA9988776655443322 STATUS=Inactive AGE_DAYS=40\nA_COMPLETER\n\n[Cas 3 — Clé malformée (préfixe invalide)]\n# Données : KEY_AUDIT USER=hacker KEY_ID=ASIA1122334455667788 STATUS=Active AGE_DAYS=10\nA_COMPLETER\n\n[Cas 4 — Clé exactement au seuil limite de 90 jours]\n# Données : KEY_AUDIT USER=ops-charlie KEY_ID=AKIAABCDEF0123456789 STATUS=Active AGE_DAYS=90\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée les données d’entrée.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "KEY_AUDIT USER=dev-alice KEY_ID=AKIAIOSFODNN7EXAMPLE STATUS=Active AGE_DAYS=45",
        "expected": "AUDIT: user=dev-alice key=AKIAIOSFODNN7EXAMPLE status=Active age_days=45 verdict=KEY_COMPLIANT",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Clé active ayant dépassé 90 jours (120 jours)",
        "stdin": "cas:1",
        "expected": "AUDIT: user=admin-bob key=AKIA1122334455667788 status=Active age_days=120 verdict=ALERT_ROTATION_REQUIRED\n"
      },
      {
        "label": "Clé inactive conservée (40 jours)",
        "stdin": "cas:2",
        "expected": "AUDIT: user=svc-app key=AKIA9988776655443322 status=Inactive age_days=40 verdict=NOTICE_KEY_INACTIVE\n"
      },
      {
        "label": "Clé malformée (préfixe invalide)",
        "stdin": "cas:3",
        "expected": "AUDIT: user=hacker key=ASIA1122334455667788 status=Active age_days=10 verdict=ALERT_MALFORMED_KEY\n"
      },
      {
        "label": "Clé exactement au seuil limite de 90 jours",
        "stdin": "cas:4",
        "expected": "AUDIT: user=ops-charlie key=AKIAABCDEF0123456789 status=Active age_days=90 verdict=KEY_COMPLIANT\n"
      }
    ],
    "solution": "[Exemple]\nAUDIT: user=dev-alice key=AKIAIOSFODNN7EXAMPLE status=Active age_days=45 verdict=KEY_COMPLIANT\n\n[Cas 1 — Clé active ayant dépassé 90 jours (120 jours)]\nAUDIT: user=admin-bob key=AKIA1122334455667788 status=Active age_days=120 verdict=ALERT_ROTATION_REQUIRED\n\n\n[Cas 2 — Clé inactive conservée (40 jours)]\nAUDIT: user=svc-app key=AKIA9988776655443322 status=Inactive age_days=40 verdict=NOTICE_KEY_INACTIVE\n\n\n[Cas 3 — Clé malformée (préfixe invalide)]\nAUDIT: user=hacker key=ASIA1122334455667788 status=Active age_days=10 verdict=ALERT_MALFORMED_KEY\n\n\n[Cas 4 — Clé exactement au seuil limite de 90 jours]\nAUDIT: user=ops-charlie key=AKIAABCDEF0123456789 status=Active age_days=90 verdict=KEY_COMPLIANT"
  },
  {
    "id": "aws3-c2-e3",
    "chapter": 2,
    "title": "Évaluateur de Politiques de Contrôle des Services AWS Organizations (SCP)",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier si une action est autorisée à travers l'arborescence hiérarchique d'unités organisationnelles (OUs) avec des SCPs.",
    "brief": "<p>Les <strong>Service Control Policies (SCPs)</strong> dans AWS Organizations définissent les garde-fous maximaux pour les comptes membres :<br><br>\nRègles d'évaluation des SCPs :<br>\n1. Les SCPs ne confèrent pas de droits, elles définissent une <strong>limite supérieure</strong> de permissions.<br>\n2. Pour qu'une action soit autorisée sur un compte cible :<br>\n- Aucun niveau de l'arborescence (du Root jusqu'au compte) ne doit comporter de <code>Deny</code> explicite sur l'action.<br>\n- CHAQUE niveau traversé (Root, OUs intermédiaires, Compte) doit explicitement comporter un <code>Allow</code> sur l'action (politique <code>FullAWSAccess</code> par défaut).<br>\n3. Si un seul niveau bloque l'action (absence d'Allow ou présence d'un Deny), l'action est interdite (<code>BLOCKED</code>).<br><br>\nDonnées du cas :<br>\n<code>SCP_CHECK ACTION=&lt;action&gt; HIERARCHY=&lt;Niveau1:Allow/Deny;Niveau2:Allow/Deny;...&gt;</code>.<br><br>\nRésultat d’analyse attendu : Si autorisée : <code>SCP_RESULT: action=&lt;act&gt; status=ALLOWED</code>.<br>\nSi bloquée : <code>SCP_RESULT: action=&lt;act&gt; status=BLOCKED blocked_by=&lt;Niveau&gt; reason=&lt;EXPLICIT_DENY|NO_ALLOW_FOUND&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c2-e3) — Évaluateur de Politiques de Contrôle des Services AWS Organizations (SCP)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Blocage par Deny explicite au niveau de l OU Core]\n# Données : SCP_CHECK ACTION=s3:DeleteBucket HIERARCHY=Root:Allow;CoreOU:Deny;Account:Allow\nA_COMPLETER\n\n[Cas 2 — Blocage par absence d Allow au niveau Root]\n# Données : SCP_CHECK ACTION=dynamodb:PutItem HIERARCHY=Root:None;AppOU:Allow;Account:Allow\nA_COMPLETER\n\n[Cas 3 — Blocage par Deny sur le compte final]\n# Données : SCP_CHECK ACTION=iam:CreateUser HIERARCHY=Root:Allow;DevOU:Allow;Account:Deny\nA_COMPLETER\n\n[Cas 4 — Arborescence à 4 niveaux validée]\n# Données : SCP_CHECK ACTION=ec2:RunInstances HIERARCHY=Root:Allow;EuropeOU:Allow;ProdOU:Allow;Account:Allow\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée les données d’entrée.",
      "Respectez la casse et les séparateurs attendus en sortie."
    ],
    "examples": [
      {
        "stdin": "SCP_CHECK ACTION=ec2:StopInstances HIERARCHY=Root:Allow;CoreOU:Allow;Account:Allow",
        "expected": "SCP_RESULT: action=ec2:StopInstances status=ALLOWED",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Blocage par Deny explicite au niveau de l OU Core",
        "stdin": "cas:1",
        "expected": "SCP_RESULT: action=s3:DeleteBucket status=BLOCKED blocked_by=CoreOU reason=EXPLICIT_DENY\n"
      },
      {
        "label": "Blocage par absence d Allow au niveau Root",
        "stdin": "cas:2",
        "expected": "SCP_RESULT: action=dynamodb:PutItem status=BLOCKED blocked_by=Root reason=NO_ALLOW_FOUND\n"
      },
      {
        "label": "Blocage par Deny sur le compte final",
        "stdin": "cas:3",
        "expected": "SCP_RESULT: action=iam:CreateUser status=BLOCKED blocked_by=Account reason=EXPLICIT_DENY\n"
      },
      {
        "label": "Arborescence à 4 niveaux validée",
        "stdin": "cas:4",
        "expected": "SCP_RESULT: action=ec2:RunInstances status=ALLOWED\n"
      }
    ],
    "solution": "[Exemple]\nSCP_RESULT: action=ec2:StopInstances status=ALLOWED\n\n[Cas 1 — Blocage par Deny explicite au niveau de l OU Core]\nSCP_RESULT: action=s3:DeleteBucket status=BLOCKED blocked_by=CoreOU reason=EXPLICIT_DENY\n\n\n[Cas 2 — Blocage par absence d Allow au niveau Root]\nSCP_RESULT: action=dynamodb:PutItem status=BLOCKED blocked_by=Root reason=NO_ALLOW_FOUND\n\n\n[Cas 3 — Blocage par Deny sur le compte final]\nSCP_RESULT: action=iam:CreateUser status=BLOCKED blocked_by=Account reason=EXPLICIT_DENY\n\n\n[Cas 4 — Arborescence à 4 niveaux validée]\nSCP_RESULT: action=ec2:RunInstances status=ALLOWED"
  }
];
