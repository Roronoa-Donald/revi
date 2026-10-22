'use strict';

module.exports = [
  {
    "id": "gcp3-c2-e1",
    "chapter": 2,
    "title": "Évaluateur de Politiques et Liaisons IAM (Bindings & Least Privilege)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les liaisons de rôles IAM Google Cloud, vérifier les droits des membres et auditer la présence de rôles primitifs déconseillés.",
    "brief": "<p>Google Cloud IAM associe des membres (principals) à des rôles selon des liaisons (bindings) :<br>\nClassification des rôles :<br>\n- Rôles primitifs historiques : <code>roles/viewer</code>, <code>roles/editor</code>, <code>roles/owner</code> (statut : <code>PRIMITIVE_DEPRECATED_FOR_PROD</code>).<br>\n- Rôles prédéfinis : débutent par <code>roles/</code> et comportent un point (ex: <code>roles/storage.objectViewer</code>, <code>roles/compute.instanceAdmin.v1</code>) (statut : <code>PREDEFINED_RECOMMENDED</code>).<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>BIND role=&lt;role&gt; member=&lt;type:id&gt;</code> :<br>\n   Associe le membre au rôle et Indiquez :<br>\n   <code>BIND_OK: role=&lt;role&gt; member=&lt;member&gt; type=&lt;status&gt;</code>.<br>\n2. <code>CHECK_ROLE member=&lt;member&gt; role=&lt;role&gt;</code> :<br>\n   - Si le membre possède le rôle : <code>ACCESS: GRANTED member=&lt;member&gt; role=&lt;role&gt;</code>.<br>\n   - Sinon : <code>ACCESS: DENIED member=&lt;member&gt; role=&lt;role&gt;</code>.<br>\n3. <code>AUDIT_PRIMITIVE_ROLES</code> :<br>\n   - Si aucun membre n'a de rôle primitif : <code>AUDIT: OK (zero primitive roles in use)</code>.<br>\n   - Sinon : <code>AUDIT: WARNING primitive_count=&lt;N&gt; members=&lt;m1,m2,...&gt;</code> (liste ordonnée).</p>",
    "starter": "# Grille d'analyse (gcp3-c2-e1) — Évaluateur de Politiques et Liaisons IAM (Bindings & Least Privilege)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection d accès refusé pour rôle non attribué]\n# Données : BIND role=roles/compute.viewer member=user:bob@corp.com\n# Données : CHECK_ROLE member=user:bob@corp.com role=roles/compute.admin\nA_COMPLETER\n\n[Cas 2 — Audit signalant des rôles primitifs dangereux en production]\n# Données : BIND role=roles/editor member=user:dev@corp.com\n# Données : BIND role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com\n# Données : AUDIT_PRIMITIVE_ROLES\nA_COMPLETER\n",
    "hints": [
      "Stockez les liaisons dans un ensemble ou un dictionnaire (role, member).",
      "Un rôle est primitif s il est exactement \"roles/viewer\", \"roles/editor\" ou \"roles/owner\".",
      "Triez la liste des membres dans l audit pour garantir une sortie déterministe."
    ],
    "examples": [
      {
        "stdin": "BIND role=roles/storage.objectViewer member=user:alice@cloud.corp\nCHECK_ROLE member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT_PRIMITIVE_ROLES",
        "expected": "BIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED_RECOMMENDED\nACCESS: GRANTED member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero primitive roles in use)",
        "note": "Attribution conforme d un rôle prédéterminé respectant le moindre privilège."
      }
    ],
    "tests": [
      {
        "label": "Détection d accès refusé pour rôle non attribué",
        "stdin": "cas:1",
        "expected": "BIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED_RECOMMENDED\nACCESS: DENIED member=user:bob@corp.com role=roles/compute.admin"
      },
      {
        "label": "Audit signalant des rôles primitifs dangereux en production",
        "stdin": "cas:2",
        "expected": "BIND_OK: role=roles/editor member=user:dev@corp.com type=PRIMITIVE_DEPRECATED_FOR_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=PRIMITIVE_DEPRECATED_FOR_PROD\nAUDIT: WARNING primitive_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com"
      }
    ],
    "solution": "[Exemple]\nBIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED_RECOMMENDED\nACCESS: GRANTED member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero primitive roles in use)\n\n[Cas 1 — Détection d accès refusé pour rôle non attribué]\nBIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED_RECOMMENDED\nACCESS: DENIED member=user:bob@corp.com role=roles/compute.admin\n\n[Cas 2 — Audit signalant des rôles primitifs dangereux en production]\nBIND_OK: role=roles/editor member=user:dev@corp.com type=PRIMITIVE_DEPRECATED_FOR_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=PRIMITIVE_DEPRECATED_FOR_PROD\nAUDIT: WARNING primitive_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com"
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
