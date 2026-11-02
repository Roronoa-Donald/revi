'use strict';

module.exports = [
  {
    "id": "gcp3-c2-e1",
    "chapter": 2,
    "title": "Analyse de liaisons IAM et audit des rôles de base",
    "level": "n1",
    "language": "analyse",
    "goal": "Examiner des liaisons locales sans confondre leur présence avec un accès IAM effectif.",
    "brief": "<p>Cette grille maintient uniquement un registre fictif de liaisons locales entre membres et rôles. Elle ne calcule pas l’accès effectif à une ressource : celui-ci dépend de la permission demandée, des autres liaisons et de leur héritage, des conditions ainsi que des règles IAM <em>deny</em> applicables et de leurs exceptions.<br>\nLa présence d’une liaison ne prouve donc pas l’accès ; son absence du registre local ne prouve pas un refus. Les rôles de base <code>roles/viewer</code>, <code>roles/editor</code> et <code>roles/owner</code> sont très larges et déconseillés en production ; ils ne sont pas déclarés obsolètes par cette grille.<br><br>\n<code>BIND role=&lt;role&gt; member=&lt;type:id&gt;</code> enregistre une liaison et retourne <code>BIND_OK: role=&lt;role&gt; member=&lt;member&gt; type=&lt;BASIC_CAUTION_PROD|PREDEFINED&gt;</code>. Les autres rôles cités dans les cas sont prédéfinis.<br>\n<code>CHECK_ROLE member=&lt;member&gt; role=&lt;role&gt;</code> cherche seulement la paire exacte dans le registre et retourne <code>LIAISON: PRESENT member=&lt;member&gt; role=&lt;role&gt;</code> ou <code>LIAISON: ABSENTE member=&lt;member&gt; role=&lt;role&gt;</code>.<br>\n<code>AUDIT_PRIMITIVE_ROLES</code> retourne <code>AUDIT: OK (zero basic roles in use)</code> ou <code>AUDIT: WARNING basic_count=&lt;N&gt; members=&lt;m1,m2,...&gt;</code>, membres triés lexicalement.<br>\nUn contexte indiquant qu’un deny peut s’appliquer ne modifie pas le constat de liaison : l’évaluation du deny sort du périmètre. Voir les <a href=\"https://docs.cloud.google.com/iam/docs/deny-overview\">politiques IAM deny</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c2-e1) — Analyse de liaisons IAM et audit des rôles de base\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison recherchée absente du registre local]\n# Données : BIND role=roles/compute.viewer member=user:bob@corp.com\n# Données : CHECK_ROLE member=user:bob@corp.com role=roles/compute.admin\nA_COMPLETER\n\n[Cas 2 — Audit de deux rôles de base]\n# Données : BIND role=roles/editor member=user:dev@corp.com\n# Données : BIND role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com\n# Données : AUDIT_PRIMITIVE_ROLES\nA_COMPLETER\n\n[Cas 3 — Liaison présente malgré un deny éventuellement applicable]\n# Données : BIND role=roles/storage.objectViewer member=user:lea@corp.com\n# Données : CONTEXTE deny_applicable=POSSIBLE\n# Données : CHECK_ROLE member=user:lea@corp.com role=roles/storage.objectViewer\nA_COMPLETER\n",
    "hints": [
      "Cherchez uniquement la paire membre-rôle dans le registre local ; ne déduisez aucune décision d’accès.",
      "Pour l’audit, comptez les liaisons aux trois rôles de base et triez les membres concernés."
    ],
    "examples": [
      {
        "stdin": "BIND role=roles/storage.objectViewer member=user:alice@cloud.corp\nCHECK_ROLE member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT_PRIMITIVE_ROLES",
        "expected": "BIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED\nLIAISON: PRESENT member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero basic roles in use)",
        "note": "La liaison locale est présente ; les conditions et refus éventuels ne sont pas évalués."
      }
    ],
    "tests": [
      {
        "label": "Liaison recherchée absente du registre local",
        "stdin": "cas:1",
        "expected": "BIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED\nLIAISON: ABSENTE member=user:bob@corp.com role=roles/compute.admin"
      },
      {
        "label": "Audit de deux rôles de base",
        "stdin": "cas:2",
        "expected": "BIND_OK: role=roles/editor member=user:dev@corp.com type=BASIC_CAUTION_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=BASIC_CAUTION_PROD\nAUDIT: WARNING basic_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com"
      },
      {
        "label": "Liaison présente malgré un deny éventuellement applicable",
        "stdin": "cas:3",
        "expected": "BIND_OK: role=roles/storage.objectViewer member=user:lea@corp.com type=PREDEFINED\nLIAISON: PRESENT member=user:lea@corp.com role=roles/storage.objectViewer"
      }
    ],
    "solution": "[Exemple]\nBIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED\nLIAISON: PRESENT member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero basic roles in use)\n\n[Cas 1 — Liaison recherchée absente du registre local]\nBIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED\nLIAISON: ABSENTE member=user:bob@corp.com role=roles/compute.admin\n\n[Cas 2 — Audit de deux rôles de base]\nBIND_OK: role=roles/editor member=user:dev@corp.com type=BASIC_CAUTION_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=BASIC_CAUTION_PROD\nAUDIT: WARNING basic_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com\n\n[Cas 3 — Liaison présente malgré un deny éventuellement applicable]\nBIND_OK: role=roles/storage.objectViewer member=user:lea@corp.com type=PREDEFINED\nLIAISON: PRESENT member=user:lea@corp.com role=roles/storage.objectViewer"
  },
  {
    "id": "gcp3-c2-e2",
    "chapter": 2,
    "title": "Générateur et Linter de Rôles Personnalisés (Custom Roles)",
    "level": "n2",
    "language": "analyse",
    "goal": "Valider la structure et la liste de permissions atomiques d'un rôle IAM personnalisé Google Cloud.",
    "brief": "<p>Un rôle personnalisé (Custom Role) GCP permet d'assembler des permissions atomiques précises.<br><br>\nRègles de conformité :<br>\n- <code>stage</code> doit appartenir à <code>ALPHA</code>, <code>BETA</code>, <code>GA</code>, <code>DEPRECATED</code>.<br>\n- Chaque permission doit respecter le format standard à 3 segments : <code>&lt;service&gt;.&lt;resource&gt;.&lt;action&gt;</code> (ex: <code>compute.instances.create</code>, <code>storage.buckets.get</code>).<br>\n- Les permissions d'administration d'organisation (ex: commençant par <code>resourcemanager.organizations.</code>) sont strictement interdites dans un projet.<br><br>\nParamètres soumis à l’analyse :<br>\n<code>CUSTOM_ROLE_LINT id=&lt;id&gt; stage=&lt;stage&gt; perms=&lt;p1,p2,...&gt;</code>.<br>\nRésultats d’analyse attendus :<br>\n- Si valide : <code>ROLE_LINT: id=&lt;id&gt; stage=&lt;stage&gt; perms_count=&lt;N&gt; status=VALID</code><br>\n- Si stage invalide : <code>ROLE_LINT: id=&lt;id&gt; status=INVALID reason=INVALID_STAGE</code><br>\n- Si permission mal formée (ne comporte pas exactement 2 points) : <code>ROLE_LINT: id=&lt;id&gt; status=INVALID reason=MALFORMED_PERMISSION perm=&lt;p&gt;</code><br>\n- Si permission d'organisation interdite : <code>ROLE_LINT: id=&lt;id&gt; status=INVALID reason=FORBIDDEN_ORG_PERMISSION perm=&lt;p&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c2-e2) — Générateur et Linter de Rôles Personnalisés (Custom Roles)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet stage invalide]\n# Données : CUSTOM_ROLE_LINT id=roleDev stage=PRODUCTION perms=compute.instances.get\nA_COMPLETER\n\n[Cas 2 — Rejet permission mal formée]\n# Données : CUSTOM_ROLE_LINT id=roleDev stage=GA perms=compute.instances,storage.buckets.get\nA_COMPLETER\n\n[Cas 3 — Rejet permission d organisation au niveau projet]\n# Données : CUSTOM_ROLE_LINT id=roleSec stage=BETA perms=compute.instances.list,resourcemanager.organizations.setIamPolicy\nA_COMPLETER\n",
    "hints": [
      "Validez d abord le stage dans (\"ALPHA\", \"BETA\", \"GA\", \"DEPRECATED\").",
      "Découpez les permissions sur la virgule et testez p.count(\".\") == 2 et non p.startswith(\"resourcemanager.organizations.\")."
    ],
    "examples": [
      {
        "stdin": "CUSTOM_ROLE_LINT id=devCustomStorage stage=GA perms=storage.buckets.get,storage.objects.list,storage.objects.get",
        "expected": "ROLE_LINT: id=devCustomStorage stage=GA perms_count=3 status=VALID",
        "note": "Rôle personnalisé conforme avec 3 permissions atomiques Cloud Storage."
      }
    ],
    "tests": [
      {
        "label": "Rejet stage invalide",
        "stdin": "cas:1",
        "expected": "ROLE_LINT: id=roleDev status=INVALID reason=INVALID_STAGE"
      },
      {
        "label": "Rejet permission mal formée",
        "stdin": "cas:2",
        "expected": "ROLE_LINT: id=roleDev status=INVALID reason=MALFORMED_PERMISSION perm=compute.instances"
      },
      {
        "label": "Rejet permission d organisation au niveau projet",
        "stdin": "cas:3",
        "expected": "ROLE_LINT: id=roleSec status=INVALID reason=FORBIDDEN_ORG_PERMISSION perm=resourcemanager.organizations.setIamPolicy"
      }
    ],
    "solution": "[Exemple]\nROLE_LINT: id=devCustomStorage stage=GA perms_count=3 status=VALID\n\n[Cas 1 — Rejet stage invalide]\nROLE_LINT: id=roleDev status=INVALID reason=INVALID_STAGE\n\n[Cas 2 — Rejet permission mal formée]\nROLE_LINT: id=roleDev status=INVALID reason=MALFORMED_PERMISSION perm=compute.instances\n\n[Cas 3 — Rejet permission d organisation au niveau projet]\nROLE_LINT: id=roleSec status=INVALID reason=FORBIDDEN_ORG_PERMISSION perm=resourcemanager.organizations.setIamPolicy"
  },
  {
    "id": "gcp3-c2-e3",
    "chapter": 2,
    "title": "Gouvernance des Comptes de Service et Rotation de Clés",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer l'âge des clés de comptes de service Google Cloud et promouvoir les identités sans clé (Workload Identity).",
    "brief": "<p>Dans Google Cloud, les comptes de service (Service Accounts - SA) permettent aux applications d'interagir avec les API :<br>\nNom de compte standard : <code>&lt;nom&gt;@&lt;projet&gt;.iam.gserviceaccount.com</code>.<br><br>\nTypes d'authentification :<br>\n1. <code>WORKLOAD_IDENTITY</code> : identité fédérée sans clé JSON stockée (recommandation Google, risque = ZERO).<br>\n2. Clé de compte de service utilisateur (User-Managed Key) : clé au format JSON exportable.<br>\n   Règle de conformité de sécurité CIS GCP : rotation obligatoire tous les 90 jours maximum.<br>\n   - Si <code>age_days &gt; 90</code> : <code>EXPIRED_REQUIRES_ROTATION</code><br>\n   - Si <code>age_days &lt;= 90</code> : <code>ACTIVE_COMPLIANT</code><br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>AUDIT_SA email=&lt;sa_email&gt; auth_mode=WORKLOAD_IDENTITY</code> :<br>\n   <code>SA_AUDIT: email=&lt;email&gt; mode=WORKLOAD_IDENTITY status=HIGHLY_SECURE risk=ZERO</code><br>\n2. <code>AUDIT_SA email=&lt;sa_email&gt; auth_mode=SERVICE_ACCOUNT_KEY key_id=&lt;id&gt; age_days=&lt;N&gt;</code> :<br>\n   <code>SA_AUDIT: email=&lt;email&gt; key_id=&lt;id&gt; age_days=&lt;N&gt; status=&lt;ACTIVE_COMPLIANT|EXPIRED_REQUIRES_ROTATION&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c2-e3) — Gouvernance des Comptes de Service et Rotation de Clés\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Clé de compte de service expirée dépassant 90 jours]\n# Données : AUDIT_SA email=backup-sa@proj-prod.iam.gserviceaccount.com auth_mode=SERVICE_ACCOUNT_KEY key_id=key-xyz-999 age_days=120\nA_COMPLETER\n\n[Cas 2 — Clé exactement au seuil de 90 jours]\n# Données : AUDIT_SA email=ci-runner@proj-prod.iam.gserviceaccount.com auth_mode=SERVICE_ACCOUNT_KEY key_id=key-limit-90 age_days=90\nA_COMPLETER\n",
    "hints": [
      "Branchez selon auth_mode == \"WORKLOAD_IDENTITY\" ou \"SERVICE_ACCOUNT_KEY\".",
      "Comparez int(age_days) <= 90 pour le statut de conformité."
    ],
    "examples": [
      {
        "stdin": "AUDIT_SA email=gke-app@proj-prod.iam.gserviceaccount.com auth_mode=WORKLOAD_IDENTITY\nAUDIT_SA email=legacy-app@proj-prod.iam.gserviceaccount.com auth_mode=SERVICE_ACCOUNT_KEY key_id=key-abc-123 age_days=45",
        "expected": "SA_AUDIT: email=gke-app@proj-prod.iam.gserviceaccount.com mode=WORKLOAD_IDENTITY status=HIGHLY_SECURE risk=ZERO\nSA_AUDIT: email=legacy-app@proj-prod.iam.gserviceaccount.com key_id=key-abc-123 age_days=45 status=ACTIVE_COMPLIANT",
        "note": "Comparatif d un compte fédéré sans clé et d un compte avec clé conforme récente."
      }
    ],
    "tests": [
      {
        "label": "Clé de compte de service expirée dépassant 90 jours",
        "stdin": "cas:1",
        "expected": "SA_AUDIT: email=backup-sa@proj-prod.iam.gserviceaccount.com key_id=key-xyz-999 age_days=120 status=EXPIRED_REQUIRES_ROTATION"
      },
      {
        "label": "Clé exactement au seuil de 90 jours",
        "stdin": "cas:2",
        "expected": "SA_AUDIT: email=ci-runner@proj-prod.iam.gserviceaccount.com key_id=key-limit-90 age_days=90 status=ACTIVE_COMPLIANT"
      }
    ],
    "solution": "[Exemple]\nSA_AUDIT: email=gke-app@proj-prod.iam.gserviceaccount.com mode=WORKLOAD_IDENTITY status=HIGHLY_SECURE risk=ZERO\nSA_AUDIT: email=legacy-app@proj-prod.iam.gserviceaccount.com key_id=key-abc-123 age_days=45 status=ACTIVE_COMPLIANT\n\n[Cas 1 — Clé de compte de service expirée dépassant 90 jours]\nSA_AUDIT: email=backup-sa@proj-prod.iam.gserviceaccount.com key_id=key-xyz-999 age_days=120 status=EXPIRED_REQUIRES_ROTATION\n\n[Cas 2 — Clé exactement au seuil de 90 jours]\nSA_AUDIT: email=ci-runner@proj-prod.iam.gserviceaccount.com key_id=key-limit-90 age_days=90 status=ACTIVE_COMPLIANT"
  }
];
