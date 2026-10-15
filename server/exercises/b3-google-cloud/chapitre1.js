/**
 * Exercices du Chapitre 1 : Architecture Globale, Hiérarchie des Ressources & CLI gcloud.
 * Préfixe : gcp3-c1-e
 */
'use strict';

module.exports = [
  {
    id: 'gcp3-c1-e1',
    chapter: 1,
    title: 'Validateur de Hiérarchie des Ressources et Nommage GCP',
    level: 'n1',
    language: 'python',
    goal: 'Valider la conformité d\'un identifiant de projet Google Cloud (Project ID) selon la RFC 1035 et modéliser la hiérarchie des ressources.',
    brief: `<p>Google Cloud organise les ressources selon une hiérarchie stricte :<br>
<code>ORGANIZATION (niveau 0) &gt; FOLDER (niveau 1) &gt; PROJECT (niveau 2) &gt; RESOURCE (niveau 3)</code>.<br><br>
Règles de validation d'un Project ID Google Cloud (RFC 1035) :<br>
- Longueur comprise entre 6 et 30 caractères inclus.<br>
- Composé uniquement de lettres minuscules (a-z), chiffres (0-9) et traits d'union (-).<br>
- Doit obligatoirement commencer par une lettre minuscule.<br>
- Ne doit pas se terminer par un trait d'union.<br><br>
Commandes lues sur STDIN :<br>
1. <code>VALIDATE_PROJECT_ID id=&lt;str&gt;</code> :<br>
   - Si valide : <code>PROJECT_ID: id=&lt;id&gt; status=VALID format=RFC1035</code><br>
   - Si trop court (&lt; 6) : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=TOO_SHORT</code><br>
   - Si trop long (&gt; 30) : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=TOO_LONG</code><br>
   - Si ne commence pas par une lettre : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=MUST_START_WITH_LETTER</code><br>
   - Si se termine par '-' : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=CANNOT_END_WITH_HYPHEN</code><br>
   - Si caractères non autorisés : <code>PROJECT_ID: id=&lt;id&gt; status=INVALID reason=INVALID_CHARS</code><br>
2. <code>HIERARCHY_LEVEL type=&lt;ORGANIZATION|FOLDER|PROJECT|RESOURCE&gt;</code> :<br>
   - <code>HIERARCHY: type=&lt;type&gt; level=&lt;L&gt; parent=&lt;parent&gt;</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la validation Project ID et hiérarchie GCP
`,
    hints: [
      'Vérifiez la longueur avant de tester les expressions régulières ou les caractères.',
      'Testez si id[0].isalpha() et id[0].islower() pour le premier caractère.',
      'Pour les niveaux : ORGANIZATION -> (0, NONE), FOLDER -> (1, ORGANIZATION), PROJECT -> (2, FOLDER), RESOURCE -> (3, PROJECT).'
    ],
    examples: [
      {
        stdin: 'VALIDATE_PROJECT_ID id=tp-cloud-b3-prod\nHIERARCHY_LEVEL type=PROJECT',
        expected: 'PROJECT_ID: id=tp-cloud-b3-prod status=VALID format=RFC1035\nHIERARCHY: type=PROJECT level=2 parent=FOLDER',
        note: 'Project ID conforme RFC 1035 et positionnement au niveau 2 de la hiérarchie.'
      }
    ],
    tests: [
      {
        label: 'Rejet Project ID trop court',
        stdin: 'VALIDATE_PROJECT_ID id=my-vm',
        expected: 'PROJECT_ID: id=my-vm status=INVALID reason=TOO_SHORT'
      },
      {
        label: 'Rejet Project ID avec majuscules non autorisées',
        stdin: 'VALIDATE_PROJECT_ID id=projet-PROD-2026',
        expected: 'PROJECT_ID: id=projet-PROD-2026 status=INVALID reason=INVALID_CHARS'
      },
      {
        label: 'Rejet Project ID commençant par un chiffre',
        stdin: 'VALIDATE_PROJECT_ID id=123-projet-cloud',
        expected: 'PROJECT_ID: id=123-projet-cloud status=INVALID reason=MUST_START_WITH_LETTER'
      },
      {
        label: 'Rejet Project ID se terminant par un tiret',
        stdin: 'VALIDATE_PROJECT_ID id=mon-projet-cloud-',
        expected: 'PROJECT_ID: id=mon-projet-cloud- status=INVALID reason=CANNOT_END_WITH_HYPHEN'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

hierarchy_map = {
    'ORGANIZATION': (0, 'NONE'),
    'FOLDER': (1, 'ORGANIZATION'),
    'PROJECT': (2, 'FOLDER'),
    'RESOURCE': (3, 'PROJECT')
}

for line in lignes:
    parts = line.split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
    
    if cmd == 'VALIDATE_PROJECT_ID':
        pid = params.get('id', '')
        if len(pid) < 6:
            print(f'PROJECT_ID: id={pid} status=INVALID reason=TOO_SHORT')
        elif len(pid) > 30:
            print(f'PROJECT_ID: id={pid} status=INVALID reason=TOO_LONG')
        elif not (pid[0].isalpha() and pid[0].islower()):
            print(f'PROJECT_ID: id={pid} status=INVALID reason=MUST_START_WITH_LETTER')
        elif pid.endswith('-'):
            print(f'PROJECT_ID: id={pid} status=INVALID reason=CANNOT_END_WITH_HYPHEN')
        elif not re.match(r'^[a-z0-9-]+$', pid):
            print(f'PROJECT_ID: id={pid} status=INVALID reason=INVALID_CHARS')
        else:
            print(f'PROJECT_ID: id={pid} status=VALID format=RFC1035')
            
    elif cmd == 'HIERARCHY_LEVEL':
        t = params.get('type', '').upper()
        if t in hierarchy_map:
            lvl, par = hierarchy_map[t]
            print(f'HIERARCHY: type={t} level={lvl} parent={par}')
`
  },
  {
    id: 'gcp3-c1-e2',
    chapter: 1,
    title: 'Sélecteur de Région et Répartition Multi-Zones GCP',
    level: 'n2',
    language: 'python',
    goal: 'Interroger le référentiel des régions Google Cloud et calculer la répartition équilibrée de machines virtuelles sur les zones de disponibilité.',
    brief: `<p>Google Cloud déploie son infrastructure en régions géographiques composées d'au moins 3 zones de disponibilité isolées :<br>
Référentiel des régions enregistrées :<br>
- <code>europe-west1</code> : Belgique, 3 zones (a, b, c), empreinte carbone faible (low_carbon=YES)<br>
- <code>europe-west9</code> : Paris, 3 zones (a, b, c), empreinte carbone faible (low_carbon=YES)<br>
- <code>us-central1</code> : Iowa, 4 zones (a, b, c, f), empreinte standard (low_carbon=NO)<br>
- <code>asia-east1</code> : Taïwan, 3 zones (a, b, c), empreinte standard (low_carbon=NO)<br><br>
Commandes lues sur STDIN :<br>
1. <code>REGION_INFO region=&lt;nom&gt;</code> :<br>
   <code>REGION: name=&lt;nom&gt; location=&lt;loc&gt; zones_count=&lt;nb&gt; low_carbon=&lt;YES|NO&gt;</code> (ou <code>REGION: name=&lt;nom&gt; status=UNKNOWN</code> si non répertoriée).<br>
2. <code>MULTI_ZONE_DEPLOY region=&lt;nom&gt; instance_count=&lt;N&gt;</code> :<br>
   Répartit les N instances équitablement sur les zones dans l'ordre alphabétique (division entière + reste attribué de gauche à droite) :<br>
   <code>DEPLOY: region=&lt;nom&gt; total=&lt;N&gt; allocation=&lt;zone1:k1,zone2:k2,...&gt; status=HA_RESILIENT</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter l'analyse des régions et la répartition multi-zones
`,
    hints: [
      'Structurez un dictionnaire avec le nom, la localisation, les zones et le statut low_carbon.',
      'Pour répartir N instances sur M zones : base = N // M, reste = N % M. Les reste premières zones reçoivent base + 1.'
    ],
    examples: [
      {
        stdin: 'REGION_INFO region=europe-west9\nMULTI_ZONE_DEPLOY region=europe-west9 instance_count=5',
        expected: 'REGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES\nDEPLOY: region=europe-west9 total=5 allocation=europe-west9-a:2,europe-west9-b:2,europe-west9-c:1 status=HA_RESILIENT',
        note: 'Répartition de 5 VMs sur 3 zones : 2 en zone a, 2 en zone b et 1 en zone c.'
      }
    ],
    tests: [
      {
        label: 'Région us-central1 avec 4 zones',
        stdin: 'MULTI_ZONE_DEPLOY region=us-central1 instance_count=6',
        expected: 'DEPLOY: region=us-central1 total=6 allocation=us-central1-a:2,us-central1-b:2,us-central1-c:1,us-central1-f:1 status=HA_RESILIENT'
      },
      {
        label: 'Région inconnue',
        stdin: 'REGION_INFO region=mars-west1',
        expected: 'REGION: name=mars-west1 status=UNKNOWN'
      },
      {
        label: 'Répartition exacte multiple du nombre de zones',
        stdin: 'MULTI_ZONE_DEPLOY region=europe-west1 instance_count=9',
        expected: 'DEPLOY: region=europe-west1 total=9 allocation=europe-west1-a:3,europe-west1-b:3,europe-west1-c:3 status=HA_RESILIENT'
      }
    ],
    solution: `import sys

regions_db = {
    'europe-west1': {'loc': 'Belgique', 'zones': ['a', 'b', 'c'], 'low_carbon': 'YES'},
    'europe-west9': {'loc': 'Paris', 'zones': ['a', 'b', 'c'], 'low_carbon': 'YES'},
    'us-central1': {'loc': 'Iowa', 'zones': ['a', 'b', 'c', 'f'], 'low_carbon': 'NO'},
    'asia-east1': {'loc': 'Taïwan', 'zones': ['a', 'b', 'c'], 'low_carbon': 'NO'}
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for line in lignes:
    parts = line.split()
    cmd = parts[0]
    params = {}
    for p in parts[1:]:
        if '=' in p:
            k, v = p.split('=', 1)
            params[k] = v
            
    reg_name = params.get('region', '')
    if cmd == 'REGION_INFO':
        if reg_name in regions_db:
            info = regions_db[reg_name]
            print(f"REGION: name={reg_name} location={info['loc']} zones_count={len(info['zones'])} low_carbon={info['low_carbon']}")
        else:
            print(f"REGION: name={reg_name} status=UNKNOWN")
            
    elif cmd == 'MULTI_ZONE_DEPLOY':
        count = int(params.get('instance_count', 0))
        if reg_name in regions_db:
            zones = sorted(regions_db[reg_name]['zones'])
            m = len(zones)
            base = count // m
            rem = count % m
            allocs = []
            for idx, z in enumerate(zones):
                nb = base + (1 if idx < rem else 0)
                allocs.append(f"{reg_name}-{z}:{nb}")
            alloc_str = ','.join(allocs)
            print(f"DEPLOY: region={reg_name} total={count} allocation={alloc_str} status=HA_RESILIENT")
        else:
            print(f"DEPLOY: region={reg_name} status=FAILED_UNKNOWN_REGION")
`
  },
  {
    id: 'gcp3-c1-e3',
    chapter: 1,
    title: 'Parser et Simulateur de Contexte CLI gcloud',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le gestionnaire de configurations gcloud CLI et gérer les contextes de projet, de zone et de compte.',
    brief: `<p>Le SDK Google Cloud (CLI <code>gcloud</code>) gère des profils de configuration contenant les paramètres par défaut de l'opérateur.<br><br>
Commandes lues sur STDIN :<br>
1. <code>gcloud config set &lt;section&gt;/&lt;propriete&gt; &lt;valeur&gt;</code> ou <code>gcloud config set &lt;propriete&gt; &lt;valeur&gt;</code> :<br>
   Met à jour la valeur et affiche <code>UPDATED: &lt;cle&gt;=&lt;valeur&gt;</code>.<br>
   (Si la clé est sans slash, par exemple <code>project</code>, elle est stockée sous <code>core/project</code> ; <code>account</code> sous <code>core/account</code> ; sinon sous sa forme complète <code>compute/region</code>, <code>compute/zone</code>).<br>
2. <code>gcloud config get &lt;propriete&gt;</code> :<br>
   Affiche <code>GET: &lt;cle&gt;=&lt;valeur&gt;</code> (ou <code>GET: &lt;cle&gt;=(unset)</code> si non définie).<br>
3. <code>gcloud config list</code> :<br>
   Affiche la liste triée alphabétiquement des propriétés définies sous la forme :<br>
   <code>CONFIG: [&lt;section&gt;] &lt;propriete&gt;=&lt;valeur&gt;</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter le gestionnaire de configuration CLI gcloud
`,
    hints: [
      'Normalisez les clés simples : "project" -> ("core", "project"), "account" -> ("core", "account").',
      'Pour "compute/region" -> section "compute", propriété "region".',
      'Triez les sections et les propriétés pour la commande "config list".'
    ],
    examples: [
      {
        stdin: `gcloud config set project tp-module1-prod
gcloud config set compute/region europe-west9
gcloud config get project
gcloud config list`,
        expected: `UPDATED: core/project=tp-module1-prod
UPDATED: compute/region=europe-west9
GET: core/project=tp-module1-prod
CONFIG: [compute] region=europe-west9
CONFIG: [core] project=tp-module1-prod`,
        note: 'Mise à jour des propriétés core et compute et affichage de la configuration active.'
      }
    ],
    tests: [
      {
        label: 'Lecture d une propriété non définie',
        stdin: 'gcloud config get compute/zone',
        expected: 'GET: compute/zone=(unset)'
      },
      {
        label: 'Configuration du compte utilisateur et écrasement de valeur',
        stdin: `gcloud config set account dev@cloud.corp
gcloud config set account lead@cloud.corp
gcloud config get account`,
        expected: `UPDATED: core/account=dev@cloud.corp
UPDATED: core/account=lead@cloud.corp
GET: core/account=lead@cloud.corp`
      },
      {
        label: 'Configuration multiple complète et liste ordonnée',
        stdin: `gcloud config set project gcp-bank-prod
gcloud config set compute/region europe-west1
gcloud config set compute/zone europe-west1-b
gcloud config list`,
        expected: `UPDATED: core/project=gcp-bank-prod
UPDATED: compute/region=europe-west1
UPDATED: compute/zone=europe-west1-b
CONFIG: [compute] region=europe-west1
CONFIG: [compute] zone=europe-west1-b
CONFIG: [core] project=gcp-bank-prod`
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

cfg = {}

def normalize_key(raw_key):
    if '/' in raw_key:
        sec, prop = raw_key.split('/', 1)
        return sec, prop
    if raw_key in ('project', 'account'):
        return 'core', raw_key
    return 'core', raw_key

for line in lignes:
    parts = line.strip().split()
    if len(parts) >= 3 and parts[0] == 'gcloud' and parts[1] == 'config':
        sub = parts[2]
        if sub == 'set' and len(parts) >= 5:
            raw_key = parts[3]
            val = parts[4]
            sec, prop = normalize_key(raw_key)
            if sec not in cfg:
                cfg[sec] = {}
            cfg[sec][prop] = val
            print(f"UPDATED: {sec}/{prop}={val}")
        elif sub == 'get' and len(parts) >= 4:
            raw_key = parts[3]
            sec, prop = normalize_key(raw_key)
            val = cfg.get(sec, {}).get(prop, '(unset)')
            print(f"GET: {sec}/{prop}={val}")
        elif sub == 'list':
            for sec in sorted(cfg.keys()):
                for prop in sorted(cfg[sec].keys()):
                    val = cfg[sec][prop]
                    print(f"CONFIG: [{sec}] {prop}={val}")
`
  }
];
