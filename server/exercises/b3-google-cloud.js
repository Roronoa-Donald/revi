'use strict';

module.exports = [
  {
    "id": "gcp3-c1-e1",
    "chapter": 1,
    "title": "Validateur de Hiérarchie des Ressources et Nommage GCP",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider la conformité d'un identifiant de projet Google Cloud (Project ID) selon la RFC 1035 et modéliser la hiérarchie des ressources.",
    "brief": "<p>Google Cloud organise les ressources selon une hiérarchie stricte :<br>\n<code>ORGANIZATION (niveau 0) &gt; FOLDER (niveau 1) &gt; PROJECT (niveau 2) &gt; RESOURCE (niveau 3)</code>.<br><br>\nRègles de validation d'un Project ID Google Cloud (RFC 1035) :<br>\n- Longueur comprise entre 6 et 30 caractères inclus.<br>\n- Composé uniquement de lettres minuscules (a-z), chiffres (0-9) et traits d'union (-).<br>\n- Doit obligatoirement commencer par une lettre minuscule.<br>\n- Ne doit pas se terminer par un trait d'union.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>VALIDATE_PROJECT_ID id=&lt;str&gt;</code> :<br>\n   - Si valide : <code>PROJECT_ID: id=&lt;id&gt; status=VALID format=RFC1035</code><br>\n   - Si trop court (&lt; 6) : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=TOO_SHORT</code><br>\n   - Si trop long (&gt; 30) : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=TOO_LONG</code><br>\n   - Si ne commence pas par une lettre : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=MUST_START_WITH_LETTER</code><br>\n   - Si se termine par '-' : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=CANNOT_END_WITH_HYPHEN</code><br>\n   - Si caractères non autorisés : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=INVALID_CHARS</code><br>\n2. <code>HIERARCHY_LEVEL type=&lt;ORGANIZATION|FOLDER|PROJECT|RESOURCE&gt;</code> :<br>\n   - <code>HIERARCHY: type=&lt;type&gt; level=&lt;L&gt; parent=&lt;parent&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c1-e1) — Validateur de Hiérarchie des Ressources et Nommage GCP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet Project ID trop court]\n# Données : VALIDATE_PROJECT_ID id=my-vm\nA_COMPLETER\n\n[Cas 2 — Rejet Project ID avec majuscules non autorisées]\n# Données : VALIDATE_PROJECT_ID id=projet-PROD-2026\nA_COMPLETER\n\n[Cas 3 — Rejet Project ID commençant par un chiffre]\n# Données : VALIDATE_PROJECT_ID id=123-projet-cloud\nA_COMPLETER\n\n[Cas 4 — Rejet Project ID se terminant par un tiret]\n# Données : VALIDATE_PROJECT_ID id=mon-projet-cloud-\nA_COMPLETER\n",
    "hints": [
      "Vérifiez la longueur avant de tester les expressions régulières ou les caractères.",
      "Testez si id[0].isalpha() et id[0].islower() pour le premier caractère.",
      "Pour les niveaux : ORGANIZATION -> (0, NONE), FOLDER -> (1, ORGANIZATION), PROJECT -> (2, FOLDER), RESOURCE -> (3, PROJECT)."
    ],
    "examples": [
      {
        "stdin": "VALIDATE_PROJECT_ID id=tp-cloud-b3-prod\nHIERARCHY_LEVEL type=PROJECT",
        "expected": "PROJECT_ID: id=tp-cloud-b3-prod status=VALID format=RFC1035\nHIERARCHY: type=PROJECT level=2 parent=FOLDER",
        "note": "Project ID conforme RFC 1035 et positionnement au niveau 2 de la hiérarchie."
      }
    ],
    "tests": [
      {
        "label": "Rejet Project ID trop court",
        "stdin": "cas:1",
        "expected": "PROJECT_ID: id=my-vm status=INVALID reason=TOO_SHORT"
      },
      {
        "label": "Rejet Project ID avec majuscules non autorisées",
        "stdin": "cas:2",
        "expected": "PROJECT_ID: id=projet-PROD-2026 status=INVALID reason=INVALID_CHARS"
      },
      {
        "label": "Rejet Project ID commençant par un chiffre",
        "stdin": "cas:3",
        "expected": "PROJECT_ID: id=123-projet-cloud status=INVALID reason=MUST_START_WITH_LETTER"
      },
      {
        "label": "Rejet Project ID se terminant par un tiret",
        "stdin": "cas:4",
        "expected": "PROJECT_ID: id=mon-projet-cloud- status=INVALID reason=CANNOT_END_WITH_HYPHEN"
      }
    ],
    "solution": "[Exemple]\nPROJECT_ID: id=tp-cloud-b3-prod status=VALID format=RFC1035\nHIERARCHY: type=PROJECT level=2 parent=FOLDER\n\n[Cas 1 — Rejet Project ID trop court]\nPROJECT_ID: id=my-vm status=INVALID reason=TOO_SHORT\n\n[Cas 2 — Rejet Project ID avec majuscules non autorisées]\nPROJECT_ID: id=projet-PROD-2026 status=INVALID reason=INVALID_CHARS\n\n[Cas 3 — Rejet Project ID commençant par un chiffre]\nPROJECT_ID: id=123-projet-cloud status=INVALID reason=MUST_START_WITH_LETTER\n\n[Cas 4 — Rejet Project ID se terminant par un tiret]\nPROJECT_ID: id=mon-projet-cloud- status=INVALID reason=CANNOT_END_WITH_HYPHEN"
  },
  {
    "id": "gcp3-c1-e2",
    "chapter": 1,
    "title": "Sélecteur de Région et Répartition Multi-Zones GCP",
    "level": "n2",
    "language": "analyse",
    "goal": "Répartir fictivement des instances entre zones et distinguer répartition et résilience démontrée.",
    "brief": "<p>Utilisez ce référentiel figé pour la grille : il ne constitue ni un inventaire officiel à jour ni une mesure actuelle de l’empreinte carbone.<br>\n- <code>europe-west1</code> : Belgique, zones a, b, c, low_carbon=YES<br>\n- <code>europe-west9</code> : Paris, zones a, b, c, low_carbon=YES<br>\n- <code>us-central1</code> : Iowa, zones a, b, c, f, low_carbon=NO<br>\n- <code>asia-east1</code> : Taïwan, zones a, b, c, low_carbon=NO<br><br>\n<code>REGION_INFO region=&lt;nom&gt;</code> retourne <code>REGION: name=&lt;nom&gt; location=&lt;lieu&gt; zones_count=&lt;N&gt; low_carbon=&lt;YES|NO&gt;</code>, ou <code>REGION: name=&lt;nom&gt; status=UNKNOWN</code> si elle est absente du référentiel.<br><br>\n<code>MULTI_ZONE_DEPLOY region=&lt;nom&gt; instance_count=&lt;N&gt;</code> simule une répartition dans une région connue. Si N est inférieur à 1, retourner <code>DEPLOY: region=&lt;nom&gt; total=&lt;N&gt; status=INVALID_INSTANCE_COUNT</code>.<br>\nSinon, répartir les instances sur les zones dans l’ordre donné : division entière, puis reste attribué de gauche à droite. Afficher chaque zone, y compris celles qui reçoivent zéro instance, et le statut :<br>\n- <code>SINGLE_ZONE_NO_REDUNDANCY</code> si une seule zone reçoit des instances ;<br>\n- <code>MULTI_ZONE_NO_GUARANTEE</code> si plusieurs zones en reçoivent.<br>\nFormat : <code>DEPLOY: region=&lt;nom&gt; total=&lt;N&gt; allocation=&lt;zone1:n1,zone2:n2,...&gt; status=&lt;statut&gt;</code>.<br><br>\nLa répartition ne crée aucune ressource et ne démontre pas la haute disponibilité. Il faut notamment vérifier capacité et quotas, dépendances, contrôles de santé, charge et basculement. Voir les <a href=\"https://docs.cloud.google.com/architecture/framework/reliability\">principes de conception pour la disponibilité</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c1-e2) — Sélecteur de Région et Répartition Multi-Zones GCP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Répartition dans quatre zones]\n# Données : MULTI_ZONE_DEPLOY region=us-central1 instance_count=6\nA_COMPLETER\n\n[Cas 2 — Région absente du référentiel]\n# Données : REGION_INFO region=mars-west1\nA_COMPLETER\n\n[Cas 3 — Une seule instance ne crée pas de redondance]\n# Données : MULTI_ZONE_DEPLOY region=europe-west9 instance_count=1\nA_COMPLETER\n\n[Cas 4 — Zéro instance est invalide]\n# Données : MULTI_ZONE_DEPLOY region=europe-west9 instance_count=0\nA_COMPLETER\n\n[Cas 5 — Deux zones occupées ne garantissent pas la résilience]\n# Données : MULTI_ZONE_DEPLOY region=europe-west9 instance_count=2\nA_COMPLETER\n\n[Cas 6 — Répartition exacte sur trois zones]\n# Données : MULTI_ZONE_DEPLOY region=europe-west1 instance_count=9\nA_COMPLETER\n\n[Cas 7 — Nombre négatif invalide]\n# Données : MULTI_ZONE_DEPLOY region=europe-west1 instance_count=-2\nA_COMPLETER\n",
    "hints": [
      "Pour N instances et M zones, calculez le quotient et le reste ; les premières zones reçoivent une instance supplémentaire.",
      "Comptez les zones réellement occupées et ne déduisez jamais un basculement fonctionnel de la seule répartition."
    ],
    "examples": [
      {
        "stdin": "REGION_INFO region=europe-west9\nMULTI_ZONE_DEPLOY region=europe-west9 instance_count=5",
        "expected": "REGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES\nDEPLOY: region=europe-west9 total=5 allocation=europe-west9-a:2,europe-west9-b:2,europe-west9-c:1 status=MULTI_ZONE_NO_GUARANTEE",
        "note": "Les cinq instances sont réparties sur trois zones ; la résilience reste à vérifier séparément."
      }
    ],
    "tests": [
      {
        "label": "Répartition dans quatre zones",
        "stdin": "cas:1",
        "expected": "DEPLOY: region=us-central1 total=6 allocation=us-central1-a:2,us-central1-b:2,us-central1-c:1,us-central1-f:1 status=MULTI_ZONE_NO_GUARANTEE"
      },
      {
        "label": "Région absente du référentiel",
        "stdin": "cas:2",
        "expected": "REGION: name=mars-west1 status=UNKNOWN"
      },
      {
        "label": "Une seule instance ne crée pas de redondance",
        "stdin": "cas:3",
        "expected": "DEPLOY: region=europe-west9 total=1 allocation=europe-west9-a:1,europe-west9-b:0,europe-west9-c:0 status=SINGLE_ZONE_NO_REDUNDANCY"
      },
      {
        "label": "Zéro instance est invalide",
        "stdin": "cas:4",
        "expected": "DEPLOY: region=europe-west9 total=0 status=INVALID_INSTANCE_COUNT"
      },
      {
        "label": "Deux zones occupées ne garantissent pas la résilience",
        "stdin": "cas:5",
        "expected": "DEPLOY: region=europe-west9 total=2 allocation=europe-west9-a:1,europe-west9-b:1,europe-west9-c:0 status=MULTI_ZONE_NO_GUARANTEE"
      },
      {
        "label": "Répartition exacte sur trois zones",
        "stdin": "cas:6",
        "expected": "DEPLOY: region=europe-west1 total=9 allocation=europe-west1-a:3,europe-west1-b:3,europe-west1-c:3 status=MULTI_ZONE_NO_GUARANTEE"
      },
      {
        "label": "Nombre négatif invalide",
        "stdin": "cas:7",
        "expected": "DEPLOY: region=europe-west1 total=-2 status=INVALID_INSTANCE_COUNT"
      }
    ],
    "solution": "[Exemple]\nREGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES\nDEPLOY: region=europe-west9 total=5 allocation=europe-west9-a:2,europe-west9-b:2,europe-west9-c:1 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 1 — Répartition dans quatre zones]\nDEPLOY: region=us-central1 total=6 allocation=us-central1-a:2,us-central1-b:2,us-central1-c:1,us-central1-f:1 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 2 — Région absente du référentiel]\nREGION: name=mars-west1 status=UNKNOWN\n\n[Cas 3 — Une seule instance ne crée pas de redondance]\nDEPLOY: region=europe-west9 total=1 allocation=europe-west9-a:1,europe-west9-b:0,europe-west9-c:0 status=SINGLE_ZONE_NO_REDUNDANCY\n\n[Cas 4 — Zéro instance est invalide]\nDEPLOY: region=europe-west9 total=0 status=INVALID_INSTANCE_COUNT\n\n[Cas 5 — Deux zones occupées ne garantissent pas la résilience]\nDEPLOY: region=europe-west9 total=2 allocation=europe-west9-a:1,europe-west9-b:1,europe-west9-c:0 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 6 — Répartition exacte sur trois zones]\nDEPLOY: region=europe-west1 total=9 allocation=europe-west1-a:3,europe-west1-b:3,europe-west1-c:3 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 7 — Nombre négatif invalide]\nDEPLOY: region=europe-west1 total=-2 status=INVALID_INSTANCE_COUNT"
  },
  {
    "id": "gcp3-c1-e3",
    "chapter": 1,
    "title": "Parser et Simulateur de Contexte CLI gcloud",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le gestionnaire de configurations gcloud CLI et gérer les contextes de projet, de zone et de compte.",
    "brief": "<p>Le SDK Google Cloud (CLI <code>gcloud</code>) gère des profils de configuration contenant les paramètres par défaut de l'opérateur.<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>gcloud config set &lt;section&gt;/&lt;propriete&gt; &lt;valeur&gt;</code> ou <code>gcloud config set &lt;propriete&gt; &lt;valeur&gt;</code> :<br>\n   Met à jour la valeur et Indiquez <code>UPDATED: &lt;cle&gt;=&lt;valeur&gt;</code>.<br>\n   (Si la clé est sans slash, par exemple <code>project</code>, elle est stockée sous <code>core/project</code> ; <code>account</code> sous <code>core/account</code> ; sinon sous sa forme complète <code>compute/region</code>, <code>compute/zone</code>).<br>\n2. <code>gcloud config get &lt;propriete&gt;</code> :<br>\n   Indiquez <code>GET: &lt;cle&gt;=&lt;valeur&gt;</code> (ou <code>GET: &lt;cle&gt;=(unset)</code> si non définie).<br>\n3. <code>gcloud config list</code> :<br>\n   Indiquez la liste triée alphabétiquement des propriétés définies sous la forme :<br>\n   <code>CONFIG: [&lt;section&gt;] &lt;propriete&gt;=&lt;valeur&gt;</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c1-e3) — Parser et Simulateur de Contexte CLI gcloud\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Lecture d une propriété non définie]\n# Données : gcloud config get compute/zone\nA_COMPLETER\n\n[Cas 2 — Configuration du compte utilisateur et écrasement de valeur]\n# Données : gcloud config set account dev@cloud.corp\n# Données : gcloud config set account lead@cloud.corp\n# Données : gcloud config get account\nA_COMPLETER\n\n[Cas 3 — Configuration multiple complète et liste ordonnée]\n# Données : gcloud config set project gcp-bank-prod\n# Données : gcloud config set compute/region europe-west1\n# Données : gcloud config set compute/zone europe-west1-b\n# Données : gcloud config list\nA_COMPLETER\n",
    "hints": [
      "Normalisez les clés simples : \"project\" -> (\"core\", \"project\"), \"account\" -> (\"core\", \"account\").",
      "Pour \"compute/region\" -> section \"compute\", propriété \"region\".",
      "Triez les sections et les propriétés pour la commande \"config list\"."
    ],
    "examples": [
      {
        "stdin": "gcloud config set project tp-module1-prod\ngcloud config set compute/region europe-west9\ngcloud config get project\ngcloud config list",
        "expected": "UPDATED: core/project=tp-module1-prod\nUPDATED: compute/region=europe-west9\nGET: core/project=tp-module1-prod\nCONFIG: [compute] region=europe-west9\nCONFIG: [core] project=tp-module1-prod",
        "note": "Mise à jour des propriétés core et compute et affichage de la configuration active."
      }
    ],
    "tests": [
      {
        "label": "Lecture d une propriété non définie",
        "stdin": "cas:1",
        "expected": "GET: compute/zone=(unset)"
      },
      {
        "label": "Configuration du compte utilisateur et écrasement de valeur",
        "stdin": "cas:2",
        "expected": "UPDATED: core/account=dev@cloud.corp\nUPDATED: core/account=lead@cloud.corp\nGET: core/account=lead@cloud.corp"
      },
      {
        "label": "Configuration multiple complète et liste ordonnée",
        "stdin": "cas:3",
        "expected": "UPDATED: core/project=gcp-bank-prod\nUPDATED: compute/region=europe-west1\nUPDATED: compute/zone=europe-west1-b\nCONFIG: [compute] region=europe-west1\nCONFIG: [compute] zone=europe-west1-b\nCONFIG: [core] project=gcp-bank-prod"
      }
    ],
    "solution": "[Exemple]\nUPDATED: core/project=tp-module1-prod\nUPDATED: compute/region=europe-west9\nGET: core/project=tp-module1-prod\nCONFIG: [compute] region=europe-west9\nCONFIG: [core] project=tp-module1-prod\n\n[Cas 1 — Lecture d une propriété non définie]\nGET: compute/zone=(unset)\n\n[Cas 2 — Configuration du compte utilisateur et écrasement de valeur]\nUPDATED: core/account=dev@cloud.corp\nUPDATED: core/account=lead@cloud.corp\nGET: core/account=lead@cloud.corp\n\n[Cas 3 — Configuration multiple complète et liste ordonnée]\nUPDATED: core/project=gcp-bank-prod\nUPDATED: compute/region=europe-west1\nUPDATED: compute/zone=europe-west1-b\nCONFIG: [compute] region=europe-west1\nCONFIG: [compute] zone=europe-west1-b\nCONFIG: [core] project=gcp-bank-prod"
  },
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
  },
  {
    "id": "gcp3-c3-e1",
    "chapter": 3,
    "title": "Dimensionneur d'Instances Compute Engine et Calcul de SLA Composite",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier les caractéristiques des séries de VM Compute Engine et calculer le SLA de disponibilité.",
    "brief": "<p>Google Compute Engine (GCE) propose différentes familles de machines virtuelles :<br>\nCatalogue des séries standard :<br>\n- <code>e2-micro</code> : vcpu=2, ram_gb=1, family=COST_OPTIMIZED<br>\n- <code>e2-medium</code> : vcpu=2, ram_gb=4, family=COST_OPTIMIZED<br>\n- <code>e2-standard-4</code> : vcpu=4, ram_gb=16, family=GENERAL_PURPOSE<br>\n- <code>n2-standard-8</code> : vcpu=8, ram_gb=32, family=GENERAL_PURPOSE<br>\n- <code>c2-standard-16</code> : vcpu=16, ram_gb=64, family=COMPUTE_OPTIMIZED<br><br>\nSLA de disponibilité mensuel Compute Engine :<br>\n- Déploiement mono-zone (Single-Zone VM) : <code>sla=99.5% max_downtime_monthly=216m</code><br>\n- Déploiement multi-zones (Multi-Zone MIG / HA) : <code>sla=99.99% max_downtime_monthly=4.32m</code><br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>GCE_SIZE machine_type=&lt;type&gt;</code> :<br>\n   <code>GCE: type=&lt;type&gt; vcpu=&lt;v&gt; ram_gb=&lt;r&gt; family=&lt;fam&gt;</code> (ou <code>GCE: type=&lt;type&gt; status=UNKNOWN</code>).<br>\n2. <code>GCE_SLA multi_zone=&lt;true|false&gt;</code> :<br>\n   <code>GCE_SLA: multi_zone=&lt;bool&gt; sla=&lt;sla&gt; max_downtime=&lt;time&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c3-e1) — Dimensionneur d'Instances Compute Engine et Calcul de SLA Composite\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Machine optimisée pour le calcul intensif c2]\n# Données : GCE_SIZE machine_type=c2-standard-16\nA_COMPLETER\n\n[Cas 2 — Machine inconnue]\n# Données : GCE_SIZE machine_type=quantum-turbo-99\nA_COMPLETER\n\n[Cas 3 — SLA mono-zone standard]\n# Données : GCE_SLA multi_zone=false\nA_COMPLETER\n",
    "hints": [
      "Structurez les machines dans un dictionnaire type -> (vcpu, ram, family).",
      "Branchez multi_zone == \"true\" vs \"false\" pour le calcul de SLA."
    ],
    "examples": [
      {
        "stdin": "GCE_SIZE machine_type=e2-standard-4\nGCE_SLA multi_zone=true",
        "expected": "GCE: type=e2-standard-4 vcpu=4 ram_gb=16 family=GENERAL_PURPOSE\nGCE_SLA: multi_zone=true sla=99.99% max_downtime=4.32m",
        "note": "Machine polyvalente 4 vCPU et SLA haute disponibilité multi-zones."
      }
    ],
    "tests": [
      {
        "label": "Machine optimisée pour le calcul intensif c2",
        "stdin": "cas:1",
        "expected": "GCE: type=c2-standard-16 vcpu=16 ram_gb=64 family=COMPUTE_OPTIMIZED"
      },
      {
        "label": "Machine inconnue",
        "stdin": "cas:2",
        "expected": "GCE: type=quantum-turbo-99 status=UNKNOWN"
      },
      {
        "label": "SLA mono-zone standard",
        "stdin": "cas:3",
        "expected": "GCE_SLA: multi_zone=false sla=99.5% max_downtime=216m"
      }
    ],
    "solution": "[Exemple]\nGCE: type=e2-standard-4 vcpu=4 ram_gb=16 family=GENERAL_PURPOSE\nGCE_SLA: multi_zone=true sla=99.99% max_downtime=4.32m\n\n[Cas 1 — Machine optimisée pour le calcul intensif c2]\nGCE: type=c2-standard-16 vcpu=16 ram_gb=64 family=COMPUTE_OPTIMIZED\n\n[Cas 2 — Machine inconnue]\nGCE: type=quantum-turbo-99 status=UNKNOWN\n\n[Cas 3 — SLA mono-zone standard]\nGCE_SLA: multi_zone=false sla=99.5% max_downtime=216m"
  },
  {
    "id": "gcp3-c3-e2",
    "chapter": 3,
    "title": "Moteur d'Auto-scaling pour Groupes d'Instances Gérés (MIG)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer la taille cible d'un Managed Instance Group (MIG) selon la charge CPU cible et les limites d'échelle.",
    "brief": "<p>Un groupe d'instances géré (MIG) ajuste automatiquement le nombre d'instances selon la formule :<br>\n<code>desired = math.ceil(current_instances * (current_cpu / target_cpu))</code>.<br>\nLa valeur calculée doit être bornée :<br>\n- Si <code>desired &gt; max_instances</code> : <code>desired = max_instances</code>.<br>\n- Si <code>desired &lt; min_instances</code> : <code>desired = min_instances</code>.<br><br>\nActions :<br>\n- Si <code>desired &gt; current_instances</code> : <code>action=SCALE_UP</code><br>\n- Si <code>desired &lt; current_instances</code> : <code>action=SCALE_DOWN</code><br>\n- Si <code>desired == current_instances</code> : <code>action=NO_CHANGE</code><br><br>\nParamètres soumis à l’analyse :<br>\n<code>MIG_AUTOSCALE min=&lt;min&gt; max=&lt;max&gt; target_cpu=&lt;t&gt; current_instances=&lt;c&gt; current_cpu=&lt;cur_cpu&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>MIG: current=&lt;c&gt; target_cpu=&lt;t&gt; current_cpu=&lt;cur_cpu&gt; desired=&lt;d&gt; action=&lt;action&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c3-e2) — Moteur d'Auto-scaling pour Groupes d'Instances Gérés (MIG)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Diminution de charge entraînant un Scale-down]\n# Données : MIG_AUTOSCALE min=2 max=10 target_cpu=0.60 current_instances=6 current_cpu=0.25\nA_COMPLETER\n\n[Cas 2 — Plafonnement au maximum d instances autorisées]\n# Données : MIG_AUTOSCALE min=2 max=8 target_cpu=0.50 current_instances=6 current_cpu=0.95\nA_COMPLETER\n\n[Cas 3 — Charge stable sans changement d échelle]\n# Données : MIG_AUTOSCALE min=2 max=10 target_cpu=0.70 current_instances=4 current_cpu=0.70\nA_COMPLETER\n",
    "hints": [
      "Convertissez target_cpu et current_cpu en float.",
      "Utilisez math.ceil(cur * (cur_cpu / target_cpu)) puis appliquez max(min_val, min(max_val, desired))."
    ],
    "examples": [
      {
        "stdin": "MIG_AUTOSCALE min=2 max=10 target_cpu=0.60 current_instances=3 current_cpu=0.85",
        "expected": "MIG: current=3 target_cpu=0.60 current_cpu=0.85 desired=5 action=SCALE_UP",
        "note": "3 * (0.85 / 0.60) = 4.25 -> 5 instances, déclenchant un Scale-up."
      }
    ],
    "tests": [
      {
        "label": "Diminution de charge entraînant un Scale-down",
        "stdin": "cas:1",
        "expected": "MIG: current=6 target_cpu=0.60 current_cpu=0.25 desired=3 action=SCALE_DOWN"
      },
      {
        "label": "Plafonnement au maximum d instances autorisées",
        "stdin": "cas:2",
        "expected": "MIG: current=6 target_cpu=0.50 current_cpu=0.95 desired=8 action=SCALE_UP"
      },
      {
        "label": "Charge stable sans changement d échelle",
        "stdin": "cas:3",
        "expected": "MIG: current=4 target_cpu=0.70 current_cpu=0.70 desired=4 action=NO_CHANGE"
      }
    ],
    "solution": "[Exemple]\nMIG: current=3 target_cpu=0.60 current_cpu=0.85 desired=5 action=SCALE_UP\n\n[Cas 1 — Diminution de charge entraînant un Scale-down]\nMIG: current=6 target_cpu=0.60 current_cpu=0.25 desired=3 action=SCALE_DOWN\n\n[Cas 2 — Plafonnement au maximum d instances autorisées]\nMIG: current=6 target_cpu=0.50 current_cpu=0.95 desired=8 action=SCALE_UP\n\n[Cas 3 — Charge stable sans changement d échelle]\nMIG: current=4 target_cpu=0.70 current_cpu=0.70 desired=4 action=NO_CHANGE"
  },
  {
    "id": "gcp3-c3-e3",
    "chapter": 3,
    "title": "Déployeur Serverless Cloud Run et Répartition de Trafic Multi-Révisions",
    "level": "n3",
    "language": "analyse",
    "goal": "Valider la répartition de trafic entre révisions Cloud Run et simuler le routage d'une requête client.",
    "brief": "<p>Google Cloud Run permet de répartir le trafic HTTP entre plusieurs révisions (Canary Release / Blue-Green) :<br><br>\nOpérations soumises à l’analyse :<br>\n1. <code>VALIDATE_SPLIT revs=&lt;r1:p1,r2:p2,...&gt;</code> :<br>\n   - Vérifie que la somme des pourcentages vaut exactement 100.<br>\n   - Si valide : <code>SPLIT: status=VALID revs_count=&lt;N&gt; allocation=&lt;revs&gt;</code><br>\n   - Si somme != 100 : <code>SPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=&lt;S&gt;</code><br>\n2. <code>ROUTE_REQUEST req_id=&lt;id&gt; revs=&lt;r1:p1,r2:p2,...&gt;</code> :<br>\n   - Calcule <code>hash_val = sum(ord(c) for c in req_id) % 100</code>.<br>\n   - Parcourt les révisions dans l'ordre de gauche à droite. La requête est attribuée à la première révision dont le cumul des pourcentages dépasse strictement <code>hash_val</code>.<br>\n   - <code>ROUTE: req_id=&lt;id&gt; bucket=&lt;hash_val&gt; target_revision=&lt;rev&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c3-e3) — Déployeur Serverless Cloud Run et Répartition de Trafic Multi-Révisions\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet somme de pourcentages différente de 100]\n# Données : VALIDATE_SPLIT revs=v1:70,v2:20\nA_COMPLETER\n\n[Cas 2 — Routage tombant dans la seconde révision canary]\n# Données : ROUTE_REQUEST req_id=REQ-CANARY-XYZ revs=v1:10,v2:90\nA_COMPLETER\n\n[Cas 3 — Répartition multi-révisions à 3 versions]\n# Données : VALIDATE_SPLIT revs=v1:50,v2:30,v3:20\n# Données : ROUTE_REQUEST req_id=USER-ABC revs=v1:50,v2:30,v3:20\nA_COMPLETER\n",
    "hints": [
      "La répartition de trafic Cloud Run Traffic Split affecte des pourcentages stricts entre les différentes révisions du conteneur.",
      "Vérifiez que la somme des quotas de trafic alloués aux révisions déployées atteint exactement 100%."
    ],
    "examples": [
      {
        "stdin": "VALIDATE_SPLIT revs=v1:80,v2:20\nROUTE_REQUEST req_id=REQ-1001 revs=v1:80,v2:20",
        "expected": "SPLIT: status=VALID revs_count=2 allocation=v1:80,v2:20\nROUTE: req_id=REQ-1001 bucket=71 target_revision=v1",
        "note": "Routage déterministe avec Canary deployment 80/20."
      }
    ],
    "tests": [
      {
        "label": "Rejet somme de pourcentages différente de 100",
        "stdin": "cas:1",
        "expected": "SPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=90"
      },
      {
        "label": "Routage tombant dans la seconde révision canary",
        "stdin": "cas:2",
        "expected": "ROUTE: req_id=REQ-CANARY-XYZ bucket=35 target_revision=v2"
      },
      {
        "label": "Répartition multi-révisions à 3 versions",
        "stdin": "cas:3",
        "expected": "SPLIT: status=VALID revs_count=3 allocation=v1:50,v2:30,v3:20\nROUTE: req_id=USER-ABC bucket=62 target_revision=v2"
      }
    ],
    "solution": "[Exemple]\nSPLIT: status=VALID revs_count=2 allocation=v1:80,v2:20\nROUTE: req_id=REQ-1001 bucket=71 target_revision=v1\n\n[Cas 1 — Rejet somme de pourcentages différente de 100]\nSPLIT: status=INVALID reason=SUM_MUST_BE_100 current_sum=90\n\n[Cas 2 — Routage tombant dans la seconde révision canary]\nROUTE: req_id=REQ-CANARY-XYZ bucket=35 target_revision=v2\n\n[Cas 3 — Répartition multi-révisions à 3 versions]\nSPLIT: status=VALID revs_count=3 allocation=v1:50,v2:30,v3:20\nROUTE: req_id=USER-ABC bucket=62 target_revision=v2"
  },
  {
    "id": "gcp3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de Sous-réseaux VPC et Adresses IP Réservées GCP",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le nombre d'adresses IP totales et utilisables dans un sous-réseau VPC Google Cloud en tenant compte des 4 adresses réservées.",
    "brief": "<p>Dans un sous-réseau Google Cloud VPC, 4 adresses IP sont systématiquement réservées par l'infrastructure :<br>\n- <code>première (.0)</code> : Adresse réseau (Network)<br>\n- <code>seconde (.1)</code> : Passerelle par défaut du sous-réseau (Default Gateway)<br>\n- <code>troisième (.2)</code> : Réservée par Google (DNS interne)<br>\n- <code>dernière (.255 pour /24)</code> : Réservée par Google (Diffusion/Broadcast)<br><br>\nAdresses utilisables pour les instances = <code>2^(32 - prefix) - 4</code>.<br><br>\nParamètres soumis à l’analyse :<br>\n<code>SUBNET_CALC cidr=&lt;IP/prefix&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>SUBNET: cidr=&lt;cidr&gt; total_ips=&lt;T&gt; usable_ips=&lt;U&gt; gateway=&lt;gw_ip&gt;</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c4-e1) — Calculateur de Sous-réseaux VPC et Adresses IP Réservées GCP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau de production plus large /20]\n# Données : SUBNET_CALC cidr=172.16.0.0/20\nA_COMPLETER\n\n[Cas 2 — Sous-réseau compact /28]\n# Données : SUBNET_CALC cidr=192.168.1.32/28\nA_COMPLETER\n",
    "hints": [
      "Utilisez le module standard la notation CIDR du réseau.",
      "Le nombre total d’adresses du bloc CIDR /n vaut 2^(32 - n).",
      "L’adresse de passerelle par défaut (gateway) est la deuxième adresse du sous-réseau (.1)."
    ],
    "examples": [
      {
        "stdin": "SUBNET_CALC cidr=10.10.0.0/24",
        "expected": "SUBNET: cidr=10.10.0.0/24 total_ips=256 usable_ips=252 gateway=10.10.0.1",
        "note": "Sous-réseau /24 standard avec 252 IP assignables à des instances."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau de production plus large /20",
        "stdin": "cas:1",
        "expected": "SUBNET: cidr=172.16.0.0/20 total_ips=4096 usable_ips=4092 gateway=172.16.0.1"
      },
      {
        "label": "Sous-réseau compact /28",
        "stdin": "cas:2",
        "expected": "SUBNET: cidr=192.168.1.32/28 total_ips=16 usable_ips=12 gateway=192.168.1.33"
      }
    ],
    "solution": "[Exemple]\nSUBNET: cidr=10.10.0.0/24 total_ips=256 usable_ips=252 gateway=10.10.0.1\n\n[Cas 1 — Sous-réseau de production plus large /20]\nSUBNET: cidr=172.16.0.0/20 total_ips=4096 usable_ips=4092 gateway=172.16.0.1\n\n[Cas 2 — Sous-réseau compact /28]\nSUBNET: cidr=192.168.1.32/28 total_ips=16 usable_ips=12 gateway=192.168.1.33"
  },
  {
    "id": "gcp3-c4-e2",
    "chapter": 4,
    "title": "Évaluateur et Linter de Règles de Pare-feu VPC (VPC Firewall Rules)",
    "level": "n2",
    "language": "analyse",
    "goal": "Évaluer le filtrage de flux réseau face à une liste ordonnée de règles de pare-feu VPC Google Cloud.",
    "brief": "<p>Les règles de pare-feu VPC appliquent un filtrage avec état (stateful) ordonné par priorité (0 à 65535, la priorité la plus petite s'appliquant en premier) :<br>\nChaque règle est définie par :<br>\n<code>RULE priority=&lt;p&gt; action=&lt;ALLOW|DENY&gt; proto=&lt;tcp|udp|icmp&gt; port=&lt;port&gt;</code>.<br>\n(port peut valoir un entier ou 'all').<br><br>\nCommande de test :<br>\n<code>TEST_PACKET proto=&lt;proto&gt; port=&lt;port&gt;</code>.<br>\nParcourt les règles chargées dans l'ordre de priorité croissante :<br>\n- La première règle correspondante décide : <code>PACKET: proto=&lt;proto&gt; port=&lt;port&gt; action=&lt;ALLOW|DENY&gt; matched_priority=&lt;p&gt;</code>.<br>\n- Si aucune règle ne correspond, la règle implicite s'applique : <code>PACKET: proto=&lt;proto&gt; port=&lt;port&gt; action=DENY matched_priority=65535 (implicit_deny)</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c4-e2) — Évaluateur et Linter de Règles de Pare-feu VPC (VPC Firewall Rules)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Application de la règle de refus implicite 65535]\n# Données : RULE priority=500 action=ALLOW proto=udp port=53\n# Données : TEST_PACKET proto=tcp port=8080\nA_COMPLETER\n\n[Cas 2 — Règle de blocage prioritaire écrasant une règle permissive de priorité plus basse]\n# Données : RULE priority=100 action=DENY proto=tcp port=22\n# Données : RULE priority=1000 action=ALLOW proto=tcp port=all\n# Données : TEST_PACKET proto=tcp port=22\n# Données : TEST_PACKET proto=tcp port=80\nA_COMPLETER\n",
    "hints": [
      "Stockez les règles et triez-les par priorité croissante.",
      "Une règle correspond si rule_proto == test_proto et (rule_port == \"all\" ou int(rule_port) == int(test_port))."
    ],
    "examples": [
      {
        "stdin": "RULE priority=1000 action=ALLOW proto=tcp port=443\nRULE priority=1000 action=ALLOW proto=tcp port=80\nRULE priority=2000 action=DENY proto=tcp port=all\nTEST_PACKET proto=tcp port=443\nTEST_PACKET proto=tcp port=22",
        "expected": "PACKET: proto=tcp port=443 action=ALLOW matched_priority=1000\nPACKET: proto=tcp port=22 action=DENY matched_priority=2000",
        "note": "Le port 443 est autorisé à priorité 1000, le port 22 est bloqué à priorité 2000."
      }
    ],
    "tests": [
      {
        "label": "Application de la règle de refus implicite 65535",
        "stdin": "cas:1",
        "expected": "PACKET: proto=tcp port=8080 action=DENY matched_priority=65535 (implicit_deny)"
      },
      {
        "label": "Règle de blocage prioritaire écrasant une règle permissive de priorité plus basse",
        "stdin": "cas:2",
        "expected": "PACKET: proto=tcp port=22 action=DENY matched_priority=100\nPACKET: proto=tcp port=80 action=ALLOW matched_priority=1000"
      }
    ],
    "solution": "[Exemple]\nPACKET: proto=tcp port=443 action=ALLOW matched_priority=1000\nPACKET: proto=tcp port=22 action=DENY matched_priority=2000\n\n[Cas 1 — Application de la règle de refus implicite 65535]\nPACKET: proto=tcp port=8080 action=DENY matched_priority=65535 (implicit_deny)\n\n[Cas 2 — Règle de blocage prioritaire écrasant une règle permissive de priorité plus basse]\nPACKET: proto=tcp port=22 action=DENY matched_priority=100\nPACKET: proto=tcp port=80 action=ALLOW matched_priority=1000"
  },
  {
    "id": "gcp3-c4-e3",
    "chapter": 4,
    "title": "Simulateur de Répartiteur de Charge Global HTTP(S) et URL Maps",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le routage de requêtes Anycast d'un Global External HTTP(S) Load Balancer selon les règles d'URL Map.",
    "brief": "<p>Un répartiteur de charge mondial Cloud Load Balancing utilise une URL Map pour acheminer le trafic :<br>\nRègles de routage chargées :<br>\n<code>ROUTE_MAP host=&lt;host&gt; path_prefix=&lt;prefix&gt; backend=&lt;service&gt; protocol=&lt;HTTP|HTTPS&gt;</code>.<br>\n(host peut être un domaine exact ou wildcard <code>*</code>).<br><br>\nCommande de requête :<br>\n<code>DISPATCH_REQUEST host=&lt;host&gt; path=&lt;path&gt;</code>.<br>\nRecherche de la correspondance la plus spécifique (préfixe de chemin le plus long correspondant) :<br>\n- Si trouvé : <code>DISPATCH: host=&lt;host&gt; path=&lt;path&gt; backend=&lt;service&gt; protocol=&lt;proto&gt; status=FORWARDED</code><br>\n- Si aucun backend ne correspond : <code>DISPATCH: host=&lt;host&gt; path=&lt;path&gt; status=404_NOT_FOUND</code></p>",
    "starter": "# Grille d'analyse (gcp3-c4-e3) — Simulateur de Répartiteur de Charge Global HTTP(S) et URL Maps\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Routage générique avec hôte wildcard]\n# Données : ROUTE_MAP host=* path_prefix=/static backend=cdn-static-backend protocol=HTTPS\n# Données : DISPATCH_REQUEST host=web.store.com path=/static/logo.svg\nA_COMPLETER\n\n[Cas 2 — Rejet requête sans backend configuré 404]\n# Données : ROUTE_MAP host=secure.bank.corp path_prefix=/api backend=banking-backend protocol=HTTPS\n# Données : DISPATCH_REQUEST host=other.site.org path=/index.html\nA_COMPLETER\n",
    "hints": [
      "Stockez les règles et filtrez d abord par correspondance d hôte (exact ou \"*\").",
      "Sélectionnez la règle dont path_prefix correspond au début de path avec la longueur maximale."
    ],
    "examples": [
      {
        "stdin": "ROUTE_MAP host=api.cloud.corp path_prefix=/v1/users backend=user-service-backend protocol=HTTPS\nROUTE_MAP host=api.cloud.corp path_prefix=/ backend=default-api-backend protocol=HTTPS\nDISPATCH_REQUEST host=api.cloud.corp path=/v1/users/list\nDISPATCH_REQUEST host=api.cloud.corp path=/health",
        "expected": "DISPATCH: host=api.cloud.corp path=/v1/users/list backend=user-service-backend protocol=HTTPS status=FORWARDED\nDISPATCH: host=api.cloud.corp path=/health backend=default-api-backend protocol=HTTPS status=FORWARDED",
        "note": "Le préfixe le plus spécifique /v1/users l emporte sur la racine /."
      }
    ],
    "tests": [
      {
        "label": "Routage générique avec hôte wildcard",
        "stdin": "cas:1",
        "expected": "DISPATCH: host=web.store.com path=/static/logo.svg backend=cdn-static-backend protocol=HTTPS status=FORWARDED"
      },
      {
        "label": "Rejet requête sans backend configuré 404",
        "stdin": "cas:2",
        "expected": "DISPATCH: host=other.site.org path=/index.html status=404_NOT_FOUND"
      }
    ],
    "solution": "[Exemple]\nDISPATCH: host=api.cloud.corp path=/v1/users/list backend=user-service-backend protocol=HTTPS status=FORWARDED\nDISPATCH: host=api.cloud.corp path=/health backend=default-api-backend protocol=HTTPS status=FORWARDED\n\n[Cas 1 — Routage générique avec hôte wildcard]\nDISPATCH: host=web.store.com path=/static/logo.svg backend=cdn-static-backend protocol=HTTPS status=FORWARDED\n\n[Cas 2 — Rejet requête sans backend configuré 404]\nDISPATCH: host=other.site.org path=/index.html status=404_NOT_FOUND"
  },
  {
    "id": "gcp3-c5-e1",
    "chapter": 5,
    "title": "Analyse du cycle de vie et des classes Cloud Storage",
    "level": "n1",
    "language": "analyse",
    "goal": "Évaluer une condition de cycle de vie sans assimiler une simulation à une transition réelle.",
    "brief": "<p>Pour cette grille, les quatre classes <code>STANDARD</code>, <code>NEARLINE</code>, <code>COLDLINE</code> et <code>ARCHIVE</code> sont utilisées dans des buckets non zonaux compatibles. Les durées minimales de facturation de Nearline, Coldline et Archive sont respectivement de 30, 90 et 365 jours ; ce ne sont pas automatiquement les seuils d’âge des règles.<br>\nLa classe <code>RAPID</code> est la cinquième classe : elle est réservée à Rapid Bucket zonal. L’action de cycle de vie <code>SetStorageClass</code> n’est pas prise en charge sur ces buckets et ne permet pas d’y faire transiter des objets depuis les autres classes via cette action.<br><br>\nPour <code>LIFECYCLE_EVAL bucket_type=&lt;NON_ZONAL|RAPID&gt; current_class=&lt;class&gt; age_days=&lt;N&gt; target_class=&lt;class&gt; min_age=&lt;M&gt;</code>, afficher <code>LIFECYCLE: current=&lt;cur&gt; target=&lt;target&gt; age=&lt;N&gt; action=&lt;action&gt; status=&lt;statut&gt;</code>.<br>\n- Si le bucket ou l’une des classes est Rapid : <code>action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS</code>.<br>\n- Pour les transitions non zonales compatibles présentées ici, si <code>age_days &gt;= min_age</code> : <code>action=TRANSITION_ELIGIBLE status=CONDITION_MET</code> ; sinon : <code>action=NONE status=CONDITION_NOT_MET</code>.<br>\nCette grille ne vérifie ni les autres conditions ni les frais, et ne réalise pas de transition. Une règle de cycle de vie est exécutée de façon asynchrone ; une condition remplie ne prouve pas qu’une transition a déjà eu lieu. Sources : <a href=\"https://docs.cloud.google.com/storage/docs/storage-classes\">classes de stockage</a> et <a href=\"https://docs.cloud.google.com/storage/docs/rapid/rapid-bucket\">Rapid Bucket</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e1) — Analyse du cycle de vie et des classes Cloud Storage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Condition d âge non atteinte]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=NEARLINE age_days=60 target_class=COLDLINE min_age=90\nA_COMPLETER\n\n[Cas 2 — Objet ancien admissible à une transition vers Archive]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=COLDLINE age_days=400 target_class=ARCHIVE min_age=365\nA_COMPLETER\n\n[Cas 3 — Transition impossible depuis un bucket Rapid]\n# Données : LIFECYCLE_EVAL bucket_type=RAPID current_class=RAPID age_days=100 target_class=NEARLINE min_age=30\nA_COMPLETER\n\n[Cas 4 — Rapid ne constitue pas une cible de transition non zonale]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=100 target_class=RAPID min_age=30\nA_COMPLETER\n\n[Cas 5 — Condition satisfaite exactement au seuil]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=30 target_class=NEARLINE min_age=30\nA_COMPLETER\n",
    "hints": [
      "Écartez d’abord les scénarios Rapid pour SetStorageClass, puis comparez l’âge de l’objet au seuil de la règle.",
      "Une condition satisfaite indique une éligibilité dans la grille, pas une transition réellement exécutée."
    ],
    "examples": [
      {
        "stdin": "LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=35 target_class=NEARLINE min_age=30",
        "expected": "LIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_ELIGIBLE status=CONDITION_MET",
        "note": "La condition simulée est satisfaite ; aucune transition réelle n’est observée."
      }
    ],
    "tests": [
      {
        "label": "Condition d âge non atteinte",
        "stdin": "cas:1",
        "expected": "LIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET"
      },
      {
        "label": "Objet ancien admissible à une transition vers Archive",
        "stdin": "cas:2",
        "expected": "LIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
      },
      {
        "label": "Transition impossible depuis un bucket Rapid",
        "stdin": "cas:3",
        "expected": "LIFECYCLE: current=RAPID target=NEARLINE age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS"
      },
      {
        "label": "Rapid ne constitue pas une cible de transition non zonale",
        "stdin": "cas:4",
        "expected": "LIFECYCLE: current=STANDARD target=RAPID age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS"
      },
      {
        "label": "Condition satisfaite exactement au seuil",
        "stdin": "cas:5",
        "expected": "LIFECYCLE: current=STANDARD target=NEARLINE age=30 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
      }
    ],
    "solution": "[Exemple]\nLIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_ELIGIBLE status=CONDITION_MET\n\n[Cas 1 — Condition d âge non atteinte]\nLIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET\n\n[Cas 2 — Objet ancien admissible à une transition vers Archive]\nLIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_ELIGIBLE status=CONDITION_MET\n\n[Cas 3 — Transition impossible depuis un bucket Rapid]\nLIFECYCLE: current=RAPID target=NEARLINE age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS\n\n[Cas 4 — Rapid ne constitue pas une cible de transition non zonale]\nLIFECYCLE: current=STANDARD target=RAPID age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS\n\n[Cas 5 — Condition satisfaite exactement au seuil]\nLIFECYCLE: current=STANDARD target=NEARLINE age=30 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
  },
  {
    "id": "gcp3-c5-e2",
    "chapter": 5,
    "title": "Sélecteur de données GCP et objectifs de disponibilité",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer des services candidats et conditionner les objectifs SLA à la configuration donnée.",
    "brief": "<p>Cette matrice pédagogique propose un service à étudier ; elle ne démontre pas qu’il est le seul choix adapté. Un objectif mensuel de disponibilité (SLO du SLA) ne garantit pas l’absence de panne et reste soumis aux conditions du contrat.<br><br>\nPour les cas relationnels, <code>SELECT_DB model=RELATIONAL choice=&lt;SQL|SPANNER&gt; ... eligible=&lt;YES|NO|UNKNOWN&gt;</code> désigne le service étudié. <code>eligible=YES</code> suppose ici que les conditions de couverture du SLA sont réunies ; en cas de données insuffisantes ou de non-couverture, afficher <code>slo_mensuel=NON_DETERMINE</code> plutôt qu’inventer un objectif.<br>\nCloud SQL : pour une instance HA admissible à cœurs dédiés, <code>edition=ENTERPRISE</code> donne <code>99.95%</code> et <code>edition=ENTERPRISE_PLUS</code> donne <code>99.99%</code>. Le SLA exclut notamment les instances à cœurs partagés et mono-zone ; son calcul est par instance et mois calendaire. Vérifier aussi moteur, maintenance et autres exclusions.<br>\nSpanner : une configuration <code>MULTI_REGION</code> ou <code>DUAL_REGION</code> admissible a un objectif de <code>99.999%</code> ; une configuration <code>REGIONAL</code> a un objectif de <code>99.99%</code> hors Stockholm et <code>99.95%</code> à Stockholm. Si la configuration ou la région nécessaire manque, l’objectif est non déterminé. Le calcul est mensuel par projet et région.<br>\nPour les autres modèles de cette grille, proposer Firestore pour <code>NOSQL_DOCUMENT</code>, Bigtable pour <code>NOSQL_WIDE_COLUMN</code>, ou Cloud Storage pour <code>OBJECT_STORAGE</code>.<br>\nRetourner <code>RECOMMENDATION: service=&lt;nom&gt; &lt;attributs...&gt;</code>. Références consultées le 30 octobre 2026 : <a href=\"https://cloud.google.com/sql/sla\">SLA Cloud SQL</a> et <a href=\"https://cloud.google.com/spanner/sla\">SLA Spanner</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e2) — Sélecteur de données GCP et objectifs de disponibilité\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cloud SQL Enterprise en haute disponibilité]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=DEDICATED eligible=YES\nA_COMPLETER\n\n[Cas 2 — Cloud SQL Enterprise Plus en haute disponibilité]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE_PLUS availability=HA instance=DEDICATED eligible=YES\nA_COMPLETER\n\n[Cas 3 — Couverture Cloud SQL absente ou inconnue]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=SHARED_CORE eligible=NO\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=SINGLE_ZONE instance=DEDICATED eligible=NO\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=DEDICATED eligible=UNKNOWN\nA_COMPLETER\n\n[Cas 4 — Spanner régional hors Stockholm et birégional]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=PARIS eligible=YES\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=DUAL_REGION eligible=YES\nA_COMPLETER\n\n[Cas 5 — Spanner régional à Stockholm]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=STOCKHOLM eligible=YES\nA_COMPLETER\n\n[Cas 6 — Configuration Spanner non précisée]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=UNKNOWN eligible=UNKNOWN\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=UNKNOWN eligible=YES\nA_COMPLETER\n\n[Cas 7 — Trois modèles non relationnels]\n# Données : SELECT_DB model=NOSQL_WIDE_COLUMN\n# Données : SELECT_DB model=NOSQL_DOCUMENT\n# Données : SELECT_DB model=OBJECT_STORAGE\nA_COMPLETER\n",
    "hints": [
      "Ne déduisez pas le SLO de la seule échelle régionale ou mondiale : vérifiez l’édition, la haute disponibilité, la configuration et la couverture.",
      "Distinguez l’objectif contractuel mensuel d’une garantie de fonctionnement continu."
    ],
    "examples": [
      {
        "stdin": "SELECT_DB model=RELATIONAL scale=GLOBAL choice=SPANNER config=MULTI_REGION eligible=YES",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=MULTI_REGION slo_mensuel=99.999%",
        "note": "Objectif mensuel de la configuration indiquée, sous réserve des conditions du SLA."
      }
    ],
    "tests": [
      {
        "label": "Cloud SQL Enterprise en haute disponibilité",
        "stdin": "cas:1",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=99.95%"
      },
      {
        "label": "Cloud SQL Enterprise Plus en haute disponibilité",
        "stdin": "cas:2",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE_PLUS availability=HA slo_mensuel=99.99%"
      },
      {
        "label": "Couverture Cloud SQL absente ou inconnue",
        "stdin": "cas:3",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=SINGLE_ZONE slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE"
      },
      {
        "label": "Spanner régional hors Stockholm et birégional",
        "stdin": "cas:4",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=PARIS slo_mensuel=99.99%\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=DUAL_REGION slo_mensuel=99.999%"
      },
      {
        "label": "Spanner régional à Stockholm",
        "stdin": "cas:5",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=STOCKHOLM slo_mensuel=99.95%"
      },
      {
        "label": "Configuration Spanner non précisée",
        "stdin": "cas:6",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=UNKNOWN slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=UNKNOWN slo_mensuel=NON_DETERMINE"
      },
      {
        "label": "Trois modèles non relationnels",
        "stdin": "cas:7",
        "expected": "RECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS\nRECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW\nRECOMMENDATION: service=Cloud_Storage type=BLOB_STORE"
      }
    ],
    "solution": "[Exemple]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=MULTI_REGION slo_mensuel=99.999%\n\n[Cas 1 — Cloud SQL Enterprise en haute disponibilité]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=99.95%\n\n[Cas 2 — Cloud SQL Enterprise Plus en haute disponibilité]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE_PLUS availability=HA slo_mensuel=99.99%\n\n[Cas 3 — Couverture Cloud SQL absente ou inconnue]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=SINGLE_ZONE slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\n\n[Cas 4 — Spanner régional hors Stockholm et birégional]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=PARIS slo_mensuel=99.99%\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=DUAL_REGION slo_mensuel=99.999%\n\n[Cas 5 — Spanner régional à Stockholm]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=STOCKHOLM slo_mensuel=99.95%\n\n[Cas 6 — Configuration Spanner non précisée]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=UNKNOWN slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=UNKNOWN slo_mensuel=NON_DETERMINE\n\n[Cas 7 — Trois modèles non relationnels]\nRECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS\nRECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW\nRECOMMENDATION: service=Cloud_Storage type=BLOB_STORE"
  },
  {
    "id": "gcp3-c5-e3",
    "chapter": 5,
    "title": "Analyse de messages et de relivraison Pub/Sub",
    "level": "n3",
    "language": "analyse",
    "goal": "Distinguer acquittement observé, délai en cours et possibilité de relivraison.",
    "brief": "<p>Cette grille représente un abonnement Pub/Sub standard et un message encore retenu, sans simuler de file de lettres mortes ni de requête réelle.<br>\n<code>CREATE_SUB sub=&lt;nom&gt; ack_deadline=&lt;secondes&gt;</code> retourne <code>SUB_READY: name=&lt;nom&gt; ack_deadline=&lt;secondes&gt;s</code>.<br>\n<code>DELIVER_MSG sub=&lt;nom&gt; msg_id=&lt;id&gt; elapsed_time=&lt;secondes&gt; effective_deadline=&lt;secondes&gt; ack=&lt;YES|NO|NACK&gt;</code> décrit une observation. <code>effective_deadline</code> est le délai effectif fourni dans le cas, compte tenu d’une éventuelle prolongation ; <code>ack=YES</code> signifie qu’un acquittement a déjà été accepté, <code>ack=NO</code> qu’aucun n’est connu, et <code>ack=NACK</code> qu’un refus a été émis.<br>\nPour un abonnement connu, retourner <code>DELIVERY: sub=&lt;nom&gt; msg_id=&lt;id&gt; status=&lt;statut&gt; action=&lt;action&gt;</code> :<br>\n- acquittement accepté : <code>status=ACKNOWLEDGED action=NONE</code> ; cela ne prouve pas l’absence de doublons dans une livraison standard ;<br>\n- sans acquittement avant le délai effectif : <code>status=WAITING_FOR_ACK action=NONE</code> ;<br>\n- sans acquittement à partir du délai effectif : <code>status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE</code> ;<br>\n- refus explicite : <code>status=NACKED action=REDELIVERY_POSSIBLE</code>.<br>\nSi l’abonnement est inconnu, retourner <code>DELIVERY: sub=&lt;nom&gt; status=ERROR_SUBSCRIPTION_NOT_FOUND</code>.<br><br>\nUne nouvelle tentative peut cibler le même client ou un autre ; elle n’est ni la preuve d’une panne ni une livraison immédiate garantie. La politique de retry, les prolongations, la rétention et une éventuelle file de lettres mortes influencent le parcours. Voir la <a href=\"https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy\">politique de retry Pub/Sub</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e3) — Analyse de messages et de relivraison Pub/Sub\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Prolongation du délai encore en cours]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=10\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-1 elapsed_time=14 effective_deadline=30 ack=NO\nA_COMPLETER\n\n[Cas 2 — Abonnement inconnu]\n# Données : DELIVER_MSG sub=unknown-sub msg_id=MSG-1 elapsed_time=5 effective_deadline=10 ack=NO\nA_COMPLETER\n\n[Cas 3 — Délai atteint sans acquittement connu]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-2 elapsed_time=30 effective_deadline=30 ack=NO\nA_COMPLETER\n\n[Cas 4 — Refus explicite du message]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-3 elapsed_time=3 effective_deadline=30 ack=NACK\nA_COMPLETER\n\n[Cas 5 — Acquittement explicitement accepté]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-4 elapsed_time=6 effective_deadline=30 ack=YES\nA_COMPLETER\n",
    "hints": [
      "Ne supposez jamais qu’un message est acquitté à partir du seul temps écoulé : l’état ack est fourni.",
      "Comparez elapsed_time au délai effectif, éventuellement prolongé ; une relivraison est possible, pas certaine."
    ],
    "examples": [
      {
        "stdin": "CREATE_SUB sub=order-processor ack_deadline=10\nDELIVER_MSG sub=order-processor msg_id=ORD-999 elapsed_time=6 effective_deadline=10 ack=YES\nDELIVER_MSG sub=order-processor msg_id=ORD-1000 elapsed_time=14 effective_deadline=10 ack=NO",
        "expected": "SUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=NONE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE",
        "note": "Le premier acquittement est connu ; une nouvelle tentative est possible pour le second message."
      }
    ],
    "tests": [
      {
        "label": "Prolongation du délai encore en cours",
        "stdin": "cas:1",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=10s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=WAITING_FOR_ACK action=NONE"
      },
      {
        "label": "Abonnement inconnu",
        "stdin": "cas:2",
        "expected": "DELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND"
      },
      {
        "label": "Délai atteint sans acquittement connu",
        "stdin": "cas:3",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-2 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE"
      },
      {
        "label": "Refus explicite du message",
        "stdin": "cas:4",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-3 status=NACKED action=REDELIVERY_POSSIBLE"
      },
      {
        "label": "Acquittement explicitement accepté",
        "stdin": "cas:5",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-4 status=ACKNOWLEDGED action=NONE"
      }
    ],
    "solution": "[Exemple]\nSUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=NONE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE\n\n[Cas 1 — Prolongation du délai encore en cours]\nSUB_READY: name=analytics-sink ack_deadline=10s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=WAITING_FOR_ACK action=NONE\n\n[Cas 2 — Abonnement inconnu]\nDELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND\n\n[Cas 3 — Délai atteint sans acquittement connu]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-2 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE\n\n[Cas 4 — Refus explicite du message]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-3 status=NACKED action=REDELIVERY_POSSIBLE\n\n[Cas 5 — Acquittement explicitement accepté]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-4 status=ACKNOWLEDGED action=NONE"
  },
  {
    "id": "gcp3-c6-e1",
    "chapter": 6,
    "title": "Interpréteur de Filtres Cloud Logging et Détection d'Incidents",
    "level": "n1",
    "language": "analyse",
    "goal": "Filtrer des flux d'événements Google Cloud Logging selon le type de ressource et le niveau de sévérité.",
    "brief": "<p>Google Cloud Logging structure les événements avec un type de ressource et un niveau de gravité :<br>\nHiérarchie des sévérités :<br>\n<code>DEBUG (0) &lt; INFO (1) &lt; NOTICE (2) &lt; WARNING (3) &lt; ERROR (4) &lt; CRITICAL (5)</code>.<br><br>\nFormat d'un log : <code>resource_type:severity:message</code> (ex: <code>gce_instance:ERROR:Disk quota exceeded</code>).<br><br>\nParamètres soumis à l’analyse :<br>\n<code>LOG_QUERY target_resource=&lt;res&gt; min_severity=&lt;sev&gt; logs=&lt;log1;log2;...&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n<code>LOG_RESULTS: resource=&lt;res&gt; min_sev=&lt;sev&gt; total=&lt;T&gt; matched=&lt;M&gt; critical_count=&lt;C&gt;</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c6-e1) — Interpréteur de Filtres Cloud Logging et Détection d'Incidents\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Filtrage ne retenant aucun log correspondant]\n# Données : LOG_QUERY target_resource=cloud_run min_severity=ERROR logs=gce_instance:ERROR:Crash;cloud_run:INFO:Deploy success\nA_COMPLETER\n\n[Cas 2 — Tous les logs correspondent pour sévérité minimale DEBUG]\n# Données : LOG_QUERY target_resource=gke_cluster min_severity=DEBUG logs=gke_cluster:DEBUG:Pod init;gke_cluster:INFO:Pod scheduled;gke_cluster:CRITICAL:Node down\nA_COMPLETER\n",
    "hints": [
      "Créez un dictionnaire associant chaque sévérité à son niveau numérique (DEBUG=0 ... CRITICAL=5).",
      "Un log correspond si log_resource == target_resource et log_sev_level >= min_sev_level."
    ],
    "examples": [
      {
        "stdin": "LOG_QUERY target_resource=gce_instance min_severity=WARNING logs=gce_instance:INFO:Boot ok;gce_instance:ERROR:Disk full;cloud_run:ERROR:Timeout;gce_instance:CRITICAL:Kernel panic",
        "expected": "LOG_RESULTS: resource=gce_instance min_sev=WARNING total=4 matched=2 critical_count=1",
        "note": "2 logs GCE correspondent avec sévérité >= WARNING dont 1 critique."
      }
    ],
    "tests": [
      {
        "label": "Filtrage ne retenant aucun log correspondant",
        "stdin": "cas:1",
        "expected": "LOG_RESULTS: resource=cloud_run min_sev=ERROR total=2 matched=0 critical_count=0"
      },
      {
        "label": "Tous les logs correspondent pour sévérité minimale DEBUG",
        "stdin": "cas:2",
        "expected": "LOG_RESULTS: resource=gke_cluster min_sev=DEBUG total=3 matched=3 critical_count=1"
      }
    ],
    "solution": "[Exemple]\nLOG_RESULTS: resource=gce_instance min_sev=WARNING total=4 matched=2 critical_count=1\n\n[Cas 1 — Filtrage ne retenant aucun log correspondant]\nLOG_RESULTS: resource=cloud_run min_sev=ERROR total=2 matched=0 critical_count=0\n\n[Cas 2 — Tous les logs correspondent pour sévérité minimale DEBUG]\nLOG_RESULTS: resource=gke_cluster min_sev=DEBUG total=3 matched=3 critical_count=1"
  },
  {
    "id": "gcp3-c6-e2",
    "chapter": 6,
    "title": "Moteur d'Alertes Budgétaires et Optimisation FinOps (CUD & SUD)",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer le coût net remisé avec les remises d'engagement (CUD) et générer des alertes de budget GCP.",
    "brief": "<p>Google Cloud propose deux mécanismes majeurs de réduction tarifaire Compute Engine :<br>\n- <code>CUD (Committed Use Discount)</code> : engagement d'1 an (-37%) ou 3 ans (-55%).<br>\n- <code>SUD (Sustained Use Discount)</code> : réduction automatique jusqu'à -20% si exécuté 100% du mois sans engagement.<br><br>\nRègles de calcul (non cumulables, CUD prioritaire) :<br>\n- Si <code>commit_years == 3</code> : <code>discount = 0.55</code>.<br>\n- Sinon si <code>commit_years == 1</code> : <code>discount = 0.37</code>.<br>\n- Sinon (commit_years == 0) : si <code>runtime_pct == 100</code> : <code>discount = 0.20</code> ; sinon <code>discount = 0.00</code>.<br><br>\nCoût net : <code>net_cost = base_cost * (1 - discount)</code>.<br>\nAlerte budgétaire face au seuil de référence :<br>\n- Si <code>net_cost &gt; budget</code> : <code>alert=BUDGET_EXCEEDED</code><br>\n- Si <code>net_cost &gt;= 0.90 * budget</code> : <code>alert=WARNING_90_PCT</code><br>\n- Sinon : <code>alert=OK</code><br><br>\nParamètres soumis à l’analyse : <code>FINOPS_EVAL base_cost=&lt;cost&gt; runtime_pct=&lt;pct&gt; commit_years=&lt;0|1|3&gt; budget=&lt;budget&gt;</code>.<br>\nRésultat d’analyse attendu : <code>FINOPS: base=&lt;cost&gt; discount_pct=&lt;pct&gt; net_cost=&lt;net:.2f&gt; budget=&lt;budget&gt; alert=&lt;alert&gt;</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c6-e2) — Moteur d'Alertes Budgétaires et Optimisation FinOps (CUD & SUD)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Alerte dépassement de budget]\n# Données : FINOPS_EVAL base_cost=2000 runtime_pct=50 commit_years=0 budget=1500\nA_COMPLETER\n\n[Cas 2 — Alerte seuil 90% du budget atteint]\n# Données : FINOPS_EVAL base_cost=1000 runtime_pct=100 commit_years=1 budget=650\nA_COMPLETER\n\n[Cas 3 — Remise automatique SUD sans engagement]\n# Données : FINOPS_EVAL base_cost=500 runtime_pct=100 commit_years=0 budget=450\nA_COMPLETER\n",
    "hints": [
      "Calculez discount_pct (55, 37, 20 ou 0).",
      "Calculez net_cost = base * (1.0 - discount_pct / 100.0).",
      "Vérifiez net_cost > budget, puis net_cost >= 0.90 * budget, sinon OK."
    ],
    "examples": [
      {
        "stdin": "FINOPS_EVAL base_cost=1000 runtime_pct=100 commit_years=3 budget=600",
        "expected": "FINOPS: base=1000 discount_pct=55 net_cost=450.00 budget=600 alert=OK",
        "note": "Engagement 3 ans apportant 55% de remise : coût net de 450$ sous le budget de 600$."
      }
    ],
    "tests": [
      {
        "label": "Alerte dépassement de budget",
        "stdin": "cas:1",
        "expected": "FINOPS: base=2000 discount_pct=0 net_cost=2000.00 budget=1500 alert=BUDGET_EXCEEDED"
      },
      {
        "label": "Alerte seuil 90% du budget atteint",
        "stdin": "cas:2",
        "expected": "FINOPS: base=1000 discount_pct=37 net_cost=630.00 budget=650 alert=WARNING_90_PCT"
      },
      {
        "label": "Remise automatique SUD sans engagement",
        "stdin": "cas:3",
        "expected": "FINOPS: base=500 discount_pct=20 net_cost=400.00 budget=450 alert=OK"
      }
    ],
    "solution": "[Exemple]\nFINOPS: base=1000 discount_pct=55 net_cost=450.00 budget=600 alert=OK\n\n[Cas 1 — Alerte dépassement de budget]\nFINOPS: base=2000 discount_pct=0 net_cost=2000.00 budget=1500 alert=BUDGET_EXCEEDED\n\n[Cas 2 — Alerte seuil 90% du budget atteint]\nFINOPS: base=1000 discount_pct=37 net_cost=630.00 budget=650 alert=WARNING_90_PCT\n\n[Cas 3 — Remise automatique SUD sans engagement]\nFINOPS: base=500 discount_pct=20 net_cost=400.00 budget=450 alert=OK"
  },
  {
    "id": "gcp3-c6-e3",
    "chapter": 6,
    "title": "Linter et Validateur de Manifeste Terraform pour GCP",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer un extrait de code Terraform HCL pour Google Cloud et détecter les mauvaises pratiques de sécurité.",
    "brief": "<p>Terraform automatise le déploiement déclaratif de ressources Google Cloud.<br><br>\nRègles d'audit de sécurité et de conformité :<br>\n1. <code>HARDCODED_SECRETS</code> : le code ne doit jamais contenir <code>credentials = file(...)</code> ou de chaînes de clé privée (utiliser Application Default Credentials ou Workload Identity).<br>\n2. <code>MISSING_PROJECT</code> : toute ressource doit hériter d'un projet explicite ou du bloc provider.<br>\n3. <code>OPEN_FIREWALL</code> : une règle pare-feu autorisant <code>0.0.0.0/0</code> sur le port <code>22</code> (SSH) ou <code>3389</code> (RDP) doit être rejetée.<br><br>\nParamètres soumis à l’analyse : <code>TF_LINT res_type=&lt;type&gt; res_name=&lt;nom&gt; props=&lt;k1:v1,k2:v2,...&gt;</code>.<br>\nRésultats d’analyse attendus :<br>\n- Si valide : <code>TF_AUDIT: resource=&lt;type&gt;.&lt;name&gt; status=VALID_HCL security=COMPLIANT</code><br>\n- Si secret en dur : <code>TF_AUDIT: resource=&lt;type&gt;.&lt;name&gt; status=REJECTED reason=HARDCODED_SECRETS</code><br>\n- Si pare-feu trop ouvert : <code>TF_AUDIT: resource=&lt;type&gt;.&lt;name&gt; status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=&lt;p&gt;</code></p>",
    "starter": "# Grille d'analyse (gcp3-c6-e3) — Linter et Validateur de Manifeste Terraform pour GCP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet clé de compte de service en dur dans le manifeste]\n# Données : TF_LINT res_type=provider res_name=google props=credentials:file(sa-key.json),project:demo-corp\nA_COMPLETER\n\n[Cas 2 — Rejet règle de pare-feu ouvrant SSH 0.0.0.0/0 à tout Internet]\n# Données : TF_LINT res_type=google_compute_firewall res_name=allow_ssh props=source_ranges:0.0.0.0/0,ports:22\nA_COMPLETER\n\n[Cas 3 — Rejet règle pare-feu ouvrant RDP 3389 à tout Internet]\n# Données : TF_LINT res_type=google_compute_firewall res_name=allow_rdp props=source_ranges:0.0.0.0/0,ports:3389\nA_COMPLETER\n",
    "hints": [
      "Analysez chaque couple cle:valeur dans props.",
      "Si cle == \"credentials\" ou \"file(\" dans valeur -> HARDCODED_SECRETS.",
      "Si source_ranges == \"0.0.0.0/0\" et port in (\"22\", \"3389\") -> OPEN_INGRESS_MANAGEMENT_PORT."
    ],
    "examples": [
      {
        "stdin": "TF_LINT res_type=google_compute_instance res_name=web_vm props=machine_type:e2-medium,zone:europe-west9-a",
        "expected": "TF_AUDIT: resource=google_compute_instance.web_vm status=VALID_HCL security=COMPLIANT",
        "note": "Ressource Compute Engine Terraform valide et conforme."
      }
    ],
    "tests": [
      {
        "label": "Rejet clé de compte de service en dur dans le manifeste",
        "stdin": "cas:1",
        "expected": "TF_AUDIT: resource=provider.google status=REJECTED reason=HARDCODED_SECRETS"
      },
      {
        "label": "Rejet règle de pare-feu ouvrant SSH 0.0.0.0/0 à tout Internet",
        "stdin": "cas:2",
        "expected": "TF_AUDIT: resource=google_compute_firewall.allow_ssh status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=22"
      },
      {
        "label": "Rejet règle pare-feu ouvrant RDP 3389 à tout Internet",
        "stdin": "cas:3",
        "expected": "TF_AUDIT: resource=google_compute_firewall.allow_rdp status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=3389"
      }
    ],
    "solution": "[Exemple]\nTF_AUDIT: resource=google_compute_instance.web_vm status=VALID_HCL security=COMPLIANT\n\n[Cas 1 — Rejet clé de compte de service en dur dans le manifeste]\nTF_AUDIT: resource=provider.google status=REJECTED reason=HARDCODED_SECRETS\n\n[Cas 2 — Rejet règle de pare-feu ouvrant SSH 0.0.0.0/0 à tout Internet]\nTF_AUDIT: resource=google_compute_firewall.allow_ssh status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=22\n\n[Cas 3 — Rejet règle pare-feu ouvrant RDP 3389 à tout Internet]\nTF_AUDIT: resource=google_compute_firewall.allow_rdp status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=3389"
  }
];
