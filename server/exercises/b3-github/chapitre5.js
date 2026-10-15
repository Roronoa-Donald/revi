/**
 * Exercices Chapitre 5 — Git & GitHub B3.
 * Automatisation CI/CD avec GitHub Actions & Sécurité des Pipelines.
 */
'use strict';

module.exports = [
  {
    id: 'gh3-c5-e1',
    chapter: 5,
    title: 'Validateur de structure de workflow GitHub Actions',
    level: 'n1',
    language: 'python',
    goal: 'Analyser la spécification d’un pipeline GitHub Actions et valider la présence des blocs obligatoires.',
    brief: `<p>Un workflow GitHub Actions (fichier <code>.github/workflows/*.yml</code>) doit respecter une arborescence minimale :<br><br>
Critères de conformité :<br>
1. <code>name</code> : doit être renseigné (chaîne non vide).<br>
2. Déclencheurs <code>on:</code> : au moins un événement déclencheur parmi <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code>, <code>schedule</code>.<br>
3. <code>jobs</code> : au moins un job déclaré. Chaque job doit obligatoirement comporter :<br>
   - Une cible d'exécution <code>runs-on</code> (ex: <code>ubuntu-latest</code>, <code>windows-latest</code>).<br>
   - Au moins une étape <code>step</code> déclarée.<br><br>
Le script lit la description linéaire d'un workflow :<br>
<code>NAME=&lt;nom&gt;</code><br>
<code>TRIGGERS=&lt;trig1,trig2...&gt;</code><br>
<code>JOB id=&lt;id&gt; runs_on=&lt;runner|NONE&gt; steps_count=&lt;n&gt;</code>.<br><br>
Pour le workflow, afficher :<br>
<code>WORKFLOW_AUDIT name="{nom}" status={VALID | ERREUR} triggers_count={n} jobs_count={m}</code><br>
Erreurs possibles : <code>MISSING_NAME</code>, <code>MISSING_TRIGGERS</code>, <code>NO_JOBS</code>, <code>JOB_MISSING_RUNS_ON</code>, <code>JOB_ZERO_STEPS</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider la structure du workflow GitHub Actions
`,
    hints: [
      'Valider les prérequis dans l’ordre : name, triggers, jobs, puis les contraintes par job.',
      'S’arrêter au premier défaut identifié.'
    ],
    examples: [
      {
        stdin: 'NAME=CI-Pipeline\nTRIGGERS=push,pull_request\nJOB id=build runs_on=ubuntu-latest steps_count=3',
        expected: 'WORKFLOW_AUDIT name="CI-Pipeline" status=VALID triggers_count=2 jobs_count=1',
        note: 'Workflow complet et bien formé.'
      }
    ],
    tests: [
      {
        label: 'Job sans runner runs_on spécifié',
        stdin: 'NAME=Test-Suite\nTRIGGERS=push\nJOB id=unit-tests runs_on=NONE steps_count=2',
        expected: 'WORKFLOW_AUDIT name="Test-Suite" status=JOB_MISSING_RUNS_ON triggers_count=1 jobs_count=1'
      },
      {
        label: 'Déclencheurs absents',
        stdin: 'NAME=Nightly-Release\nTRIGGERS=\nJOB id=release runs_on=ubuntu-latest steps_count=1',
        expected: 'WORKFLOW_AUDIT name="Nightly-Release" status=MISSING_TRIGGERS triggers_count=0 jobs_count=1'
      },
      {
        label: 'Workflow avec plusieurs jobs valides et job sans steps',
        stdin: 'NAME=Deploy-Prod\nTRIGGERS=workflow_dispatch\nJOB id=lint runs_on=ubuntu-latest steps_count=2\nJOB id=deploy runs_on=ubuntu-latest steps_count=0',
        expected: 'WORKFLOW_AUDIT name="Deploy-Prod" status=JOB_ZERO_STEPS triggers_count=1 jobs_count=2'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

w_name = ''
triggers = []
jobs = []

for lig in lignes:
    if lig.startswith('NAME='):
        w_name = lig[len('NAME='):].strip()
    elif lig.startswith('TRIGGERS='):
        trig_str = lig[len('TRIGGERS='):].strip()
        if trig_str:
            triggers = [t.strip() for t in trig_str.split(',') if t.strip()]
    elif lig.startswith('JOB'):
        m = re.search(r'id=([^\\s]+)\\s+runs_on=([^\\s]+)\\s+steps_count=([^\\s]+)', lig)
        if m:
            jid, ron, scnt = m.groups()
            jobs.append({
                'id': jid,
                'runs_on': ron,
                'steps_count': int(scnt)
            })

if not w_name:
    status = 'MISSING_NAME'
elif not triggers:
    status = 'MISSING_TRIGGERS'
elif not jobs:
    status = 'NO_JOBS'
else:
    status = 'VALID'
    for j in jobs:
        if j['runs_on'] == 'NONE' or not j['runs_on']:
            status = 'JOB_MISSING_RUNS_ON'
            break
        if j['steps_count'] <= 0:
            status = 'JOB_ZERO_STEPS'
            break

print(f'WORKFLOW_AUDIT name="{w_name}" status={status} triggers_count={len(triggers)} jobs_count={len(jobs)}')
`
  },
  {
    id: 'gh3-c5-e2',
    chapter: 5,
    title: 'Générateur et évaluateur de matrice de build (strategy: matrix)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le produit cartésien des axes d’une matrice de test GitHub Actions et gérer les exclusions.',
    brief: `<p>La directive <code>strategy: matrix</code> permet d'exécuter un job en parallèle sur de multiples combinaisons d'environnements (OS x Version de langage).<br><br>
Spécification :<br>
- Liste d'OS : <code>os=&lt;os1,os2...&gt;</code>.<br>
- Liste de versions de runtime : <code>version=&lt;v1,v2...&gt;</code>.<br>
- Exclusions optionnelles (<code>EXCLUDE os=&lt;os&gt; version=&lt;v&gt;</code>).<br><br>
Le script lit la définition sur l'entrée standard :<br>
<code>MATRIX_DEF os=&lt;liste_os&gt; version=&lt;liste_versions&gt;</code><br>
Puis zéro, une ou plusieurs lignes <code>EXCLUDE os=&lt;os&gt; version=&lt;v&gt;</code>.<br><br>
Le script doit calculer la liste des combinaisons valides (produit cartésien moins exclusions), triée par OS puis par version, et afficher :<br>
Chaque combinaison :<br>
<code>JOB_INSTANCE os={os} version={v} tag="{os}-{v}"</code><br>
Et la ligne récapitulative :<br>
<code>MATRIX_TOTAL instances={n} excluded={nb_exclus}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le produit cartésien de la matrice
`,
    hints: [
      'Générer toutes les paires (o, v) via deux boucles imbriquées.',
      'Filtrer les paires présentes dans l’ensemble des exclusions.'
    ],
    examples: [
      {
        stdin: 'MATRIX_DEF os=ubuntu,macos version=3.11,3.12\nEXCLUDE os=macos version=3.11',
        expected: 'JOB_INSTANCE os=ubuntu version=3.11 tag="ubuntu-3.11"\nJOB_INSTANCE os=ubuntu version=3.12 tag="ubuntu-3.12"\nJOB_INSTANCE os=macos version=3.12 tag="macos-3.12"\nMATRIX_TOTAL instances=3 excluded=1',
        note: '4 combinaisons initiales moins 1 exclusion = 3 instances exécutées.'
      }
    ],
    tests: [
      {
        label: 'Matrice 3x2 complète sans aucune exclusion',
        stdin: 'MATRIX_DEF os=ubuntu,windows,macos version=18,20',
        expected: 'JOB_INSTANCE os=ubuntu version=18 tag="ubuntu-18"\nJOB_INSTANCE os=ubuntu version=20 tag="ubuntu-20"\nJOB_INSTANCE os=windows version=18 tag="windows-18"\nJOB_INSTANCE os=windows version=20 tag="windows-20"\nJOB_INSTANCE os=macos version=18 tag="macos-18"\nJOB_INSTANCE os=macos version=20 tag="macos-20"\nMATRIX_TOTAL instances=6 excluded=0'
      },
      {
        label: 'Multiples exclusions croisées',
        stdin: 'MATRIX_DEF os=ubuntu,windows version=10,11,12\nEXCLUDE os=windows version=10\nEXCLUDE os=windows version=11',
        expected: 'JOB_INSTANCE os=ubuntu version=10 tag="ubuntu-10"\nJOB_INSTANCE os=ubuntu version=11 tag="ubuntu-11"\nJOB_INSTANCE os=ubuntu version=12 tag="ubuntu-12"\nJOB_INSTANCE os=windows version=12 tag="windows-12"\nMATRIX_TOTAL instances=4 excluded=2'
      },
      {
        label: 'Toutes les combinaisons d’un OS exclues',
        stdin: 'MATRIX_DEF os=linux,bsd version=1.0\nEXCLUDE os=bsd version=1.0',
        expected: 'JOB_INSTANCE os=linux version=1.0 tag="linux-1.0"\nMATRIX_TOTAL instances=1 excluded=1'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

os_list = []
ver_list = []
excludes = set()

for lig in lignes:
    if lig.startswith('MATRIX_DEF'):
        m = re.search(r'os=([^\\s]+)\\s+version=([^\\s]+)', lig)
        if m:
            os_list = [o.strip() for o in m.group(1).split(',') if o.strip()]
            ver_list = [v.strip() for v in m.group(2).split(',') if v.strip()]
    elif lig.startswith('EXCLUDE'):
        m = re.search(r'os=([^\\s]+)\\s+version=([^\\s]+)', lig)
        if m:
            excludes.add((m.group(1).strip(), m.group(2).strip()))

instances = []
excluded_count = 0

for o in os_list:
    for v in ver_list:
        if (o, v) in excludes:
            excluded_count += 1
        else:
            instances.append((o, v))

for o, v in instances:
    print(f'JOB_INSTANCE os={o} version={v} tag="{o}-{v}"')

print(f"MATRIX_TOTAL instances={len(instances)} excluded={excluded_count}")
`
  },
  {
    id: 'gh3-c5-e3',
    chapter: 5,
    title: 'Détecteur d’injections de commandes et fuites de secrets dans les Actions',
    level: 'n3',
    language: 'python',
    goal: 'Auditer les étapes de scripts GitHub Actions pour détecter les failles d’injection de commande et divulgation de secrets.',
    brief: `<p>Dans GitHub Actions, l’utilisation imprudente d’expressions de contexte dans la directive <code>run:</code> expose le runner à une exécution de code arbitraire (RCE) ou à l'exfiltration de jetons secrets.<br><br>
Vulnérabilités à détecter :<br>
1. <strong>Fuite de secret (Secret Leak)</strong> : présence de <code>secrets.</code> ou <code>GITHUB_TOKEN</code> à l'intérieur d'une commande <code>echo</code> ou <code>print</code>.<br>
   -> Verdict : <code>VULN_EXPOSED_SECRET</code>.<br>
2. <strong>Injection de commande shell</strong> : concaténation directe d'entrées utilisateur non fiables au sein de la ligne de commande <code>run:</code>, telles que <code>\${{ github.event.issue.title }}</code>, <code>\${{ github.event.issue.body }}</code>, <code>\${{ github.event.comment.body }}</code>, <code>\${{ github.head_ref }}</code>.<br>
   (La bonne pratique est de passer par des variables d'environnement <code>env:</code>).<br>
   -> Verdict : <code>VULN_COMMAND_INJECTION</code>.<br>
3. Sinon : étape conforme (<code>SECURE</code>).<br><br>
Le script lit sur l'entrée standard :<br>
<code>STEP_INSPECT id=&lt;id&gt; cmd=&lt;commande_du_step&gt;</code>.<br><br>
Pour chaque étape, afficher :<br>
<code>ACTION_AUDIT step={id} status={SECURE|VULN_EXPOSED_SECRET|VULN_COMMAND_INJECTION}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la sécurité des étapes GitHub Actions
`,
    hints: [
      'Vérifier d’abord si echo affiche un secret.',
      'Vérifier la présence d’expressions de contexte non assainies dans la commande.'
    ],
    examples: [
      {
        stdin: 'STEP_INSPECT id=1 cmd=echo "Le titre est ${{ github.event.issue.title }}"\nSTEP_INSPECT id=2 cmd=echo ${{ secrets.AWS_KEY }}',
        expected: 'ACTION_AUDIT step=1 status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=2 status=VULN_EXPOSED_SECRET',
        note: 'Le step 1 permet l’injection via un titre malveillant, le step 2 fait fuiter la clé AWS.'
      }
    ],
    tests: [
      {
        label: 'Commande saine avec variable d’environnement sécurisée',
        stdin: 'STEP_INSPECT id=OK1 cmd=pytest tests/\nSTEP_INSPECT id=OK2 cmd=echo "Build version $BUILD_NUM"',
        expected: 'ACTION_AUDIT step=OK1 status=SECURE\nACTION_AUDIT step=OK2 status=SECURE'
      },
      {
        label: 'Injection via corps de commentaire ou head_ref',
        stdin: 'STEP_INSPECT id=INJ1 cmd=git checkout ${{ github.head_ref }}\nSTEP_INSPECT id=INJ2 cmd=python process.py "${{ github.event.comment.body }}"',
        expected: 'ACTION_AUDIT step=INJ1 status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=INJ2 status=VULN_COMMAND_INJECTION'
      },
      {
        label: 'Fuite du jeton GITHUB_TOKEN',
        stdin: 'STEP_INSPECT id=L1 cmd=echo "Token is ${{ secrets.GITHUB_TOKEN }}"',
        expected: 'ACTION_AUDIT step=L1 status=VULN_EXPOSED_SECRET'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

UNTRUSTED_PATTERNS = [
    'github.event.issue.title',
    'github.event.issue.body',
    'github.event.comment.body',
    'github.head_ref'
]

for lig in lignes:
    m = re.search(r'id=([^\\s]+)\\s+cmd=(.*)', lig)
    if not m:
        continue
    sid, cmd = m.groups()
    cmd = cmd.strip()
    
    # Vérifier fuite de secret
    if re.search(r'(echo|print).*secrets\.', cmd) or re.search(r'(echo|print).*GITHUB_TOKEN', cmd):
        status = 'VULN_EXPOSED_SECRET'
    elif any(pat in cmd for pat in UNTRUSTED_PATTERNS):
        status = 'VULN_COMMAND_INJECTION'
    else:
        status = 'SECURE'
        
    print(f"ACTION_AUDIT step={sid} status={status}")
`
  }
];
