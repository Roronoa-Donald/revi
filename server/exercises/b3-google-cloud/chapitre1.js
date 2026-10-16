'use strict';

module.exports = [
  {
    "id": "gcp3-c1-e1",
    "chapter": 1,
    "title": "Validateur de Hiérarchie des Ressources et Nommage GCP",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider la conformité d'un identifiant de projet Google Cloud (Project ID) selon la RFC 1035 et modéliser la hiérarchie des ressources.",
    "brief": "<p>Google Cloud organise les ressources selon une hiérarchie stricte :<br>\n<code>ORGANIZATION (niveau 0) &gt; FOLDER (niveau 1) &gt; PROJECT (niveau 2) &gt; RESOURCE (niveau 3)</code>.<br><br>\nRègles de validation d'un Project ID Google Cloud (RFC 1035) :<br>\n- Longueur comprise entre 6 et 30 caractères inclus.<br>\n- Composé uniquement de lettres minuscules (a-z), chiffres (0-9) et traits d'union (-).<br>\n- Doit obligatoirement commencer par une lettre minuscule.<br>\n- Ne doit pas se terminer par un trait d'union.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>VALIDATE_PROJECT_ID id=&lt;str&gt;</code> :<br>\n   - Si valide : <code>PROJECT_ID: id=&lt;id&gt; status=VALID format=RFC1035</code><br>\n   - Si trop court (&lt; 6) : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=TOO_SHORT</code><br>\n   - Si trop long (&gt; 30) : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=TOO_LONG</code><br>\n   - Si ne commence pas par une lettre : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=MUST_START_WITH_LETTER</code><br>\n   - Si se termine par '-' : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=CANNOT_END_WITH_HYPHEN</code><br>\n   - Si caractères non autorisés : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=INVALID_CHARS</code><br>\n2. <code>HIERARCHY_LEVEL type=&lt;ORGANIZATION|FOLDER|PROJECT|RESOURCE&gt;</code> :<br>\n   - <code>HIERARCHY: type=&lt;type&gt; level=&lt;L&gt; parent=&lt;parent&gt;</code></p>",
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
    "goal": "Interroger le référentiel des régions Google Cloud et calculer la répartition équilibrée de machines virtuelles sur les zones de disponibilité.",
    "brief": "<p>Google Cloud déploie son infrastructure en régions géographiques composées d'au moins 3 zones de disponibilité isolées :<br>\nRéférentiel des régions enregistrées :<br>\n- <code>europe-west1</code> : Belgique, 3 zones (a, b, c), empreinte carbone faible (low_carbon=YES)<br>\n- <code>europe-west9</code> : Paris, 3 zones (a, b, c), empreinte carbone faible (low_carbon=YES)<br>\n- <code>us-central1</code> : Iowa, 4 zones (a, b, c, f), empreinte standard (low_carbon=NO)<br>\n- <code>asia-east1</code> : Taïwan, 3 zones (a, b, c), empreinte standard (low_carbon=NO)<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>REGION_INFO region=&lt;nom&gt;</code> :<br>\n   <code>REGION: name=&lt;nom&gt; location=&lt;loc&gt; zones_count=&lt;nb&gt; low_carbon=&lt;YES|NO&gt;</code> (ou <code>REGION: name=&lt;nom&gt; status=UNKNOWN</code> si non répertoriée).<br>\n2. <code>MULTI_ZONE_DEPLOY region=&lt;nom&gt; instance_count=&lt;N&gt;</code> :<br>\n   Répartit les N instances équitablement sur les zones dans l'ordre alphabétique (division entière + reste attribué de gauche à droite) :<br>\n   <code>DEPLOY: region=&lt;nom&gt; total=&lt;N&gt; allocation=&lt;zone1:k1,zone2:k2,...&gt; status=HA_RESILIENT</code>.</p>",
    "starter": "# Grille d'analyse (gcp3-c1-e2) — Sélecteur de Région et Répartition Multi-Zones GCP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Région us-central1 avec 4 zones]\n# Données : MULTI_ZONE_DEPLOY region=us-central1 instance_count=6\nA_COMPLETER\n\n[Cas 2 — Région inconnue]\n# Données : REGION_INFO region=mars-west1\nA_COMPLETER\n\n[Cas 3 — Répartition exacte multiple du nombre de zones]\n# Données : MULTI_ZONE_DEPLOY region=europe-west1 instance_count=9\nA_COMPLETER\n",
    "hints": [
      "Structurez un dictionnaire avec le nom, la localisation, les zones et le statut low_carbon.",
      "Pour répartir N instances sur M zones : base = N // M, reste = N % M. Les reste premières zones reçoivent base + 1."
    ],
    "examples": [
      {
        "stdin": "REGION_INFO region=europe-west9\nMULTI_ZONE_DEPLOY region=europe-west9 instance_count=5",
        "expected": "REGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES\nDEPLOY: region=europe-west9 total=5 allocation=europe-west9-a:2,europe-west9-b:2,europe-west9-c:1 status=HA_RESILIENT",
        "note": "Répartition de 5 VMs sur 3 zones : 2 en zone a, 2 en zone b et 1 en zone c."
      }
    ],
    "tests": [
      {
        "label": "Région us-central1 avec 4 zones",
        "stdin": "cas:1",
        "expected": "DEPLOY: region=us-central1 total=6 allocation=us-central1-a:2,us-central1-b:2,us-central1-c:1,us-central1-f:1 status=HA_RESILIENT"
      },
      {
        "label": "Région inconnue",
        "stdin": "cas:2",
        "expected": "REGION: name=mars-west1 status=UNKNOWN"
      },
      {
        "label": "Répartition exacte multiple du nombre de zones",
        "stdin": "cas:3",
        "expected": "DEPLOY: region=europe-west1 total=9 allocation=europe-west1-a:3,europe-west1-b:3,europe-west1-c:3 status=HA_RESILIENT"
      }
    ],
    "solution": "[Exemple]\nREGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES\nDEPLOY: region=europe-west9 total=5 allocation=europe-west9-a:2,europe-west9-b:2,europe-west9-c:1 status=HA_RESILIENT\n\n[Cas 1 — Région us-central1 avec 4 zones]\nDEPLOY: region=us-central1 total=6 allocation=us-central1-a:2,us-central1-b:2,us-central1-c:1,us-central1-f:1 status=HA_RESILIENT\n\n[Cas 2 — Région inconnue]\nREGION: name=mars-west1 status=UNKNOWN\n\n[Cas 3 — Répartition exacte multiple du nombre de zones]\nDEPLOY: region=europe-west1 total=9 allocation=europe-west1-a:3,europe-west1-b:3,europe-west1-c:3 status=HA_RESILIENT"
  },
  {
    "id": "gcp3-c1-e3",
    "chapter": 1,
    "title": "Parser et Simulateur de Contexte CLI gcloud",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le gestionnaire de configurations gcloud CLI et gérer les contextes de projet, de zone et de compte.",
    "brief": "<p>Le SDK Google Cloud (CLI <code>gcloud</code>) gère des profils de configuration contenant les paramètres par défaut de l'opérateur.<br><br>\nCommandes lues sur STDIN :<br>\n1. <code>gcloud config set &lt;section&gt;/&lt;propriete&gt; &lt;valeur&gt;</code> ou <code>gcloud config set &lt;propriete&gt; &lt;valeur&gt;</code> :<br>\n   Met à jour la valeur et Indiquez <code>UPDATED: &lt;cle&gt;=&lt;valeur&gt;</code>.<br>\n   (Si la clé est sans slash, par exemple <code>project</code>, elle est stockée sous <code>core/project</code> ; <code>account</code> sous <code>core/account</code> ; sinon sous sa forme complète <code>compute/region</code>, <code>compute/zone</code>).<br>\n2. <code>gcloud config get &lt;propriete&gt;</code> :<br>\n   Indiquez <code>GET: &lt;cle&gt;=&lt;valeur&gt;</code> (ou <code>GET: &lt;cle&gt;=(unset)</code> si non définie).<br>\n3. <code>gcloud config list</code> :<br>\n   Indiquez la liste triée alphabétiquement des propriétés définies sous la forme :<br>\n   <code>CONFIG: [&lt;section&gt;] &lt;propriete&gt;=&lt;valeur&gt;</code>.</p>",
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
  }
];
