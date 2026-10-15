/**
 * Exercices Chapitre 3 — Git & GitHub B3.
 * Investigation Médico-légale, Reflog & Sauvetage d’Historique.
 */
'use strict';

module.exports = [
  {
    id: 'gh3-c3-e1',
    chapter: 3,
    title: 'Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)',
    level: 'n1',
    language: 'python',
    goal: 'Analyser le journal des mouvements de têtes (reflog) pour identifier et sauver un commit devenu orphelin après un reset accidentel.',
    brief: `<p>Lorsqu'un développeur exécute par erreur <code>git reset --hard HEAD~3</code> ou supprime une branche locale avant d'avoir poussé, les commits semblent perdus.<br>
En réalité, Git ne supprime jamais immédiatement les objets : ils restent référencés dans le <strong>Reflog (Reference Log)</strong> jusqu'à la collecte des déchets (Garbage Collection <code>git gc</code>).<br><br>
Le script lit sur l'entrée standard :<br>
1. La liste des commits actuellement accessibles par les branches actives :<br>
   <code>ACTIVE_BRANCH name=&lt;nom&gt; tip=&lt;hash&gt; ancestors=&lt;h1,h2...|NONE&gt;</code>.<br>
2. Les entrées chronologiques du reflog de HEAD (du plus récent au plus ancien) :<br>
   <code>REFLOG_ENTRY id=&lt;HEAD@{n}&gt; commit=&lt;hash&gt; action=&lt;action&gt; desc=&lt;message&gt;</code>.<br><br>
Un commit est considéré comme <strong>orphelin (Dangling)</strong> s'il figure dans le reflog mais n'apparaît ni comme tête (tip) ni comme ancêtre d'aucune branche active.<br><br>
Pour chaque commit orphelin identifié dans le reflog (dans l'ordre d'apparition), afficher :<br>
<code>RESCUE_CANDIDATE reflog={id} commit={hash} action="{action}" desc="{desc}" status=DANGLING</code><br>
Si aucun commit orphelin n'est trouvé :<br>
<code>RESCUE_SUMMARY: ALL_COMMITS_REFERENCED</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser le reflog et retrouver les commits orphelins
`,
    hints: [
      'Constituer un ensemble (set) de tous les commits accessibles par les branches actives.',
      'Parcourir les entrées de reflog et vérifier l’appartenance au set.'
    ],
    examples: [
      {
        stdin: 'ACTIVE_BRANCH name=main tip=C1 ancestors=NONE\nREFLOG_ENTRY id=HEAD@{0} commit=C1 action=reset desc=moving to C1\nREFLOG_ENTRY id=HEAD@{1} commit=C3 action=commit desc=Feature perdue',
        expected: 'RESCUE_CANDIDATE reflog=HEAD@{1} commit=C3 action="commit" desc="Feature perdue" status=DANGLING',
        note: 'C3 a été abandonné par le reset to C1 et n’est plus dans main.'
      }
    ],
    tests: [
      {
        label: 'Tous les commits du reflog sont accessibles dans les branches',
        stdin: 'ACTIVE_BRANCH name=main tip=C2 ancestors=C1\nREFLOG_ENTRY id=HEAD@{0} commit=C2 action=checkout desc=moving to main\nREFLOG_ENTRY id=HEAD@{1} commit=C1 action=commit desc=Init',
        expected: 'RESCUE_SUMMARY: ALL_COMMITS_REFERENCED'
      },
      {
        label: 'Multiples commits orphelins après rebases multiples',
        stdin: 'ACTIVE_BRANCH name=main tip=M2 ancestors=M1\nACTIVE_BRANCH name=dev tip=D1 ancestors=M1\nREFLOG_ENTRY id=HEAD@{0} commit=M2 action=checkout desc=to main\nREFLOG_ENTRY id=HEAD@{1} commit=LOST1 action=commit desc=Secret code\nREFLOG_ENTRY id=HEAD@{2} commit=LOST2 action=commit desc=Old prototype',
        expected: 'RESCUE_CANDIDATE reflog=HEAD@{1} commit=LOST1 action="commit" desc="Secret code" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=LOST2 action="commit" desc="Old prototype" status=DANGLING'
      },
      {
        label: 'Commit orphelin unique après suppression de branche',
        stdin: 'ACTIVE_BRANCH name=main tip=100 ancestors=NONE\nREFLOG_ENTRY id=HEAD@{0} commit=999 action=branch_delete desc=Temporary fix',
        expected: 'RESCUE_CANDIDATE reflog=HEAD@{0} commit=999 action="branch_delete" desc="Temporary fix" status=DANGLING'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

reachable = set()
reflogs = []

for lig in lignes:
    if lig.startswith('ACTIVE_BRANCH'):
        m = re.search(r'name=([^\\s]+)\\s+tip=([^\\s]+)\\s+ancestors=([^\\s]+)', lig)
        if m:
            bname, tip, anc = m.groups()
            reachable.add(tip)
            if anc != 'NONE':
                for a in anc.split(','):
                    if a.strip():
                        reachable.add(a.strip())
    elif lig.startswith('REFLOG_ENTRY'):
        m = re.search(r'id=([^\\s]+)\\s+commit=([^\\s]+)\\s+action=([^\\s]+)\\s+desc=(.*)', lig)
        if m:
            rid, cid, act, desc = m.groups()
            reflogs.append({
                'id': rid,
                'commit': cid,
                'action': act,
                'desc': desc.strip()
            })

dangling = []
seen_dangling_commits = set()

for entry in reflogs:
    if entry['commit'] not in reachable and entry['commit'] not in seen_dangling_commits:
        dangling.append(entry)
        seen_dangling_commits.add(entry['commit'])

if dangling:
    for d in dangling:
        print(f'RESCUE_CANDIDATE reflog={d["id"]} commit={d["commit"]} action="{d["action"]}" desc="{d["desc"]}" status=DANGLING')
else:
    print('RESCUE_SUMMARY: ALL_COMMITS_REFERENCED')
`
  },
  {
    id: 'gh3-c3-e2',
    chapter: 3,
    title: 'Détecteur de régression dichotomique automatique (git bisect)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler la recherche dichotomique de Git Bisect pour identifier le premier commit ayant introduit un bogue.',
    brief: `<p>L'outil <code>git bisect</code> effectue une recherche binaire (dichotomie) dans l'historique des commits pour trouver la régression en un minimum de tests ($O(\\log N)$).<br><br>
Algorithme :<br>
1. On dispose d'une liste ordonnée chronologiquement de $N$ commits : <code>[c_0, c_1, ..., c_{N-1}]</code>.<br>
   Le commit initial $c_0$ est certifié <code>GOOD</code> (sain), et le commit final $c_{N-1}$ est <code>BAD</code> (défaillant).<br>
2. Tant que l'intervalle <code>[low, high]</code> contient plus d'un commit suspect :<br>
   On choisit le commit médian : <code>mid = (low + high) // 2</code>.<br>
   On évalue l'état du commit <code>mid</code> (fourni par la table des statuts) :<br>
   - Si <code>mid == BAD</code> : la régression a eu lieu à <code>mid</code> ou avant -> <code>high = mid</code>.<br>
   - Si <code>mid == GOOD</code> : la régression a eu lieu après <code>mid</code> -> <code>low = mid + 1</code>.<br>
   On affiche chaque étape : <code>BISECT_STEP step={k} testing={commit_id} verdict={GOOD|BAD} remaining={high - low + 1}</code>.<br>
3. Dès que <code>low == high</code>, le premier commit défaillant est identifié :<br>
   <code>FIRST_BAD_COMMIT id={commit_id}</code>.<br><br>
Le script lit la liste chronologique des commits et leur statut réel :<br>
<code>HISTORY commits=&lt;c1,c2,c3...&gt;</code><br>
<code>STATUSES &lt;c_id&gt;=&lt;GOOD|BAD&gt; ...</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la dichotomie git bisect
`,
    hints: [
      'Initialiser low = 0 et high = len(commits) - 1.',
      'Calculer mid = (low + high) // 2 à chaque étape.',
      'S’arrêter quand low == high.'
    ],
    examples: [
      {
        stdin: 'HISTORY commits=C1,C2,C3,C4,C5\nSTATUSES C1=GOOD C2=GOOD C3=BAD C4=BAD C5=BAD',
        expected: 'BISECT_STEP step=1 testing=C3 verdict=BAD remaining=3\nBISECT_STEP step=2 testing=C2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=C3',
        note: 'C3 est identifié comme le premier commit ayant introduit le bogue en 2 étapes.'
      }
    ],
    tests: [
      {
        label: 'Historique de 8 commits avec bogue introduit tardivement',
        stdin: 'HISTORY commits=v1,v2,v3,v4,v5,v6,v7,v8\nSTATUSES v1=GOOD v2=GOOD v3=GOOD v4=GOOD v5=GOOD v6=GOOD v7=BAD v8=BAD',
        expected: 'BISECT_STEP step=1 testing=v4 verdict=GOOD remaining=4\nBISECT_STEP step=2 testing=v6 verdict=GOOD remaining=2\nBISECT_STEP step=3 testing=v7 verdict=BAD remaining=1\nFIRST_BAD_COMMIT id=v7'
      },
      {
        label: 'Bogue introduit dès le deuxième commit',
        stdin: 'HISTORY commits=A,B,C,D\nSTATUSES A=GOOD B=BAD C=BAD D=BAD',
        expected: 'BISECT_STEP step=1 testing=B verdict=BAD remaining=2\nBISECT_STEP step=2 testing=A verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=B'
      },
      {
        label: 'Seulement 3 commits dans l’historique',
        stdin: 'HISTORY commits=1,2,3\nSTATUSES 1=GOOD 2=GOOD 3=BAD',
        expected: 'BISECT_STEP step=1 testing=2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=3'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

commits = []
statuses = {}

for lig in lignes:
    if lig.startswith('HISTORY'):
        m = re.search(r'commits=([^\\s]+)', lig)
        if m:
            commits = [c.strip() for c in m.group(1).split(',') if c.strip()]
    elif lig.startswith('STATUSES'):
        pairs = lig[len('STATUSES'):].strip().split()
        for p in pairs:
            if '=' in p:
                k, v = p.split('=', 1)
                statuses[k.strip()] = v.strip()

low = 0
high = len(commits) - 1
step = 1

while low < high:
    mid = (low + high) // 2
    cid = commits[mid]
    verd = statuses.get(cid, 'GOOD')
    
    if verd == 'BAD':
        high = mid
    else:
        low = mid + 1
        
    remaining = high - low + 1
    print(f"BISECT_STEP step={step} testing={cid} verdict={verd} remaining={remaining}")
    step += 1

print(f"FIRST_BAD_COMMIT id={commits[low]}")
`
  },
  {
    id: 'gh3-c3-e3',
    chapter: 3,
    title: 'Gestionnaire de pile de remisage (git stash LIFO stack)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le comportement en pile LIFO (Last-In, First-Out) des commandes git stash.',
    brief: `<p>La commande <code>git stash</code> enregistre temporairement les modifications en cours sur une pile LIFO sans créer de commit formel.<br><br>
Commandes à exécuter :<br>
- <code>push &lt;message&gt;</code> : empile une nouvelle entrée au sommet <code>stash@{0}</code>. Les entrées existantes sont décalées : <code>stash@{k} -> stash@{k+1}</code>.<br>
- <code>pop</code> : extrait et supprime l'entrée la plus récente <code>stash@{0}</code>.<br>
- <code>apply &lt;idx&gt;</code> : applique l'entrée <code>stash@{idx}</code> sans la supprimer de la pile.<br>
- <code>drop &lt;idx&gt;</code> : supprime l'entrée <code>stash@{idx}</code> de la pile (les entrées d'indice supérieur sont décrémentées d'une unité).<br><br>
Le script lit les commandes sur l'entrée standard :<br>
<code>STASH_CMD action=&lt;push|pop|apply|drop&gt; [arg=&lt;val&gt;]</code>.<br><br>
Pour chaque action, afficher :<br>
<code>STASH_OP action={action} result={OK|STACK_EMPTY|INDEX_OUT_OF_BOUNDS} current_size={taille} top="{msg_du_sommet|EMPTY}"</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la pile LIFO de git stash
`,
    hints: [
      'Gérer une liste Python où l’indice 0 représente stash@{0}.',
      'Lors d’un push, insérer à l’indice 0 avec stack.insert(0, msg).'
    ],
    examples: [
      {
        stdin: 'STASH_CMD action=push arg=WIP sur formulaire\nSTASH_CMD action=pop',
        expected: 'STASH_OP action=push result=OK current_size=1 top="WIP sur formulaire"\nSTASH_OP action=pop result=OK current_size=0 top="EMPTY"',
        note: 'Empilement puis dépilement immédiat de la réserve.'
      }
    ],
    tests: [
      {
        label: 'Dépilement sur une pile vide',
        stdin: 'STASH_CMD action=pop',
        expected: 'STASH_OP action=pop result=STACK_EMPTY current_size=0 top="EMPTY"'
      },
      {
        label: 'Succession de push, apply et drop spécifique',
        stdin: 'STASH_CMD action=push arg=Fix CSS\nSTASH_CMD action=push arg=Refactor API\nSTASH_CMD action=apply arg=1\nSTASH_CMD action=drop arg=0',
        expected: 'STASH_OP action=push result=OK current_size=1 top="Fix CSS"\nSTASH_OP action=push result=OK current_size=2 top="Refactor API"\nSTASH_OP action=apply result=OK current_size=2 top="Refactor API"\nSTASH_OP action=drop result=OK current_size=1 top="Fix CSS"'
      },
      {
        label: 'Drop avec index hors limites',
        stdin: 'STASH_CMD action=push arg=Seul élément\nSTASH_CMD action=drop arg=5',
        expected: 'STASH_OP action=push result=OK current_size=1 top="Seul élément"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top="Seul élément"'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

stack = [] # stack[0] est stash@{0}

for lig in lignes:
    m = re.search(r'action=([^\\s]+)(?:\\s+arg=(.*))?', lig)
    if not m:
        continue
    act = m.group(1)
    arg = m.group(2).strip() if m.group(2) else ''
    
    res = 'OK'
    
    if act == 'push':
        stack.insert(0, arg)
    elif act == 'pop':
        if not stack:
            res = 'STACK_EMPTY'
        else:
            stack.pop(0)
    elif act == 'apply':
        idx = int(arg) if arg.isdigit() else 0
        if idx >= len(stack):
            res = 'INDEX_OUT_OF_BOUNDS'
    elif act == 'drop':
        idx = int(arg) if arg.isdigit() else 0
        if idx >= len(stack):
            res = 'INDEX_OUT_OF_BOUNDS'
        else:
            stack.pop(idx)
            
    top_val = stack[0] if stack else 'EMPTY'
    print(f'STASH_OP action={act} result={res} current_size={len(stack)} top="{top_val}"')
`
  }
];
