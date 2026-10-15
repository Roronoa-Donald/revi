/**
 * Exercices Chapitre 2 — Git & GitHub B3.
 * Stratégies de Branches, Rebase & Résolution de Conflits à 3 Voies.
 */
'use strict';

module.exports = [
  {
    id: 'gh3-c2-e1',
    chapter: 2,
    title: 'Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge',
    level: 'n1',
    language: 'python',
    goal: 'Déterminer si une fusion de branches peut s’effectuer en Fast-Forward ou requiert un 3-Way Merge avec commit de fusion.',
    brief: `<p>Dans le graphe orienté acyclique (DAG) des commits de Git :<br>
- Si le commit de tête de la branche courante (<code>base</code>) est un <strong>ancêtre direct</strong> de la branche à intégrer (<code>target</code>), Git avance simplement le pointeur sans créer de nouveau commit : c'est un <strong>Fast-Forward (FF)</strong>.<br>
- Si les deux branches ont divergé depuis un ancêtre commun (Lowest Common Ancestor - LCA), un <strong>Three-Way Merge</strong> est nécessaire et un commit de fusion à 2 parents doit être généré.<br><br>
Le script lit sur l'entrée standard :<br>
1. La déclaration des commits et de leurs parents :<br>
   <code>COMMIT id=&lt;id&gt; parents=&lt;p1,p2...|NONE&gt;</code>.<br>
2. La position des branches :<br>
   <code>BRANCH name=&lt;nom&gt; commit=&lt;id&gt;</code>.<br>
3. Une demande de fusion :<br>
   <code>MERGE_REQUEST current=&lt;branche_base&gt; incoming=&lt;branche_target&gt;</code>.<br><br>
Afficher :<br>
<code>MERGE_STRATEGY from={incoming} into={current} type={FAST_FORWARD|THREE_WAY_MERGE} lca={lca_id}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser les ancêtres et déterminer la stratégie de fusion
`,
    hints: [
      'Construire la liste de tous les ancêtres de chaque commit en remontant les parents.',
      'Si base_commit fait partie des ancêtres de incoming_commit, la fusion est FAST_FORWARD.',
      'Sinon, trouver le plus proche ancêtre commun (LCA).'
    ],
    examples: [
      {
        stdin: 'COMMIT id=C1 parents=NONE\nCOMMIT id=C2 parents=C1\nCOMMIT id=C3 parents=C2\nBRANCH name=main commit=C1\nBRANCH name=feature commit=C3\nMERGE_REQUEST current=main incoming=feature',
        expected: 'MERGE_STRATEGY from=feature into=main type=FAST_FORWARD lca=C1',
        note: 'C1 est un ancêtre direct de C3 : avance rapide du pointeur main vers C3.'
      }
    ],
    tests: [
      {
        label: 'Branches divergentes nécessitant un Three-Way Merge',
        stdin: 'COMMIT id=C1 parents=NONE\nCOMMIT id=C2 parents=C1\nCOMMIT id=C3 parents=C1\nBRANCH name=main commit=C2\nBRANCH name=feature commit=C3\nMERGE_REQUEST current=main incoming=feature',
        expected: 'MERGE_STRATEGY from=feature into=main type=THREE_WAY_MERGE lca=C1'
      },
      {
        label: 'Arborescence plus profonde avec Fast-Forward valide',
        stdin: 'COMMIT id=A parents=NONE\nCOMMIT id=B parents=A\nCOMMIT id=C parents=B\nCOMMIT id=D parents=C\nBRANCH name=prod commit=B\nBRANCH name=release commit=D\nMERGE_REQUEST current=prod incoming=release',
        expected: 'MERGE_STRATEGY from=release into=prod type=FAST_FORWARD lca=B'
      },
      {
        label: 'Divergence après plusieurs commits communs',
        stdin: 'COMMIT id=R1 parents=NONE\nCOMMIT id=R2 parents=R1\nCOMMIT id=M1 parents=R2\nCOMMIT id=M2 parents=M1\nCOMMIT id=F1 parents=R2\nBRANCH name=main commit=M2\nBRANCH name=hotfix commit=F1\nMERGE_REQUEST current=main incoming=hotfix',
        expected: 'MERGE_STRATEGY from=hotfix into=main type=THREE_WAY_MERGE lca=R2'
      }
    ],
    solution: `import sys
import re
from collections import deque

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

parents_map = {} # commit -> list of parents
branches = {} # branch_name -> commit
merge_req = None

for lig in lignes:
    if lig.startswith('COMMIT'):
        m = re.search(r'id=([^\\s]+)\\s+parents=([^\\s]+)', lig)
        if m:
            cid, pstr = m.groups()
            if pstr == 'NONE':
                parents_map[cid] = []
            else:
                parents_map[cid] = [p.strip() for p in pstr.split(',') if p.strip()]
    elif lig.startswith('BRANCH'):
        m = re.search(r'name=([^\\s]+)\\s+commit=([^\\s]+)', lig)
        if m:
            bname, bcommit = m.groups()
            branches[bname] = bcommit
    elif lig.startswith('MERGE_REQUEST'):
        m = re.search(r'current=([^\\s]+)\\s+incoming=([^\\s]+)', lig)
        if m:
            merge_req = m.groups()

def get_ancestors_with_depth(start):
    # BFS pour obtenir la distance minimale vers chaque ancêtre
    visited = {}
    q = deque([(start, 0)])
    visited[start] = 0
    while q:
        curr, d = q.popleft()
        for p in parents_map.get(curr, []):
            if p not in visited or visited[p] > d + 1:
                visited[p] = d + 1
                q.append((p, d + 1))
    return visited

if merge_req:
    curr_branch, inc_branch = merge_req
    curr_commit = branches[curr_branch]
    inc_commit = branches[inc_branch]
    
    curr_anc = get_ancestors_with_depth(curr_commit)
    inc_anc = get_ancestors_with_depth(inc_commit)
    
    # Fast-Forward si curr_commit est dans les ancêtres de inc_commit
    if curr_commit in inc_anc:
        mtype = 'FAST_FORWARD'
        lca = curr_commit
    else:
        mtype = 'THREE_WAY_MERGE'
        # Trouver l'ancêtre commun le plus proche (somme des distances minimale)
        common = set(curr_anc.keys()) & set(inc_anc.keys())
        if common:
            lca = min(common, key=lambda c: curr_anc[c] + inc_anc[c])
        else:
            lca = 'NONE'
            
    print(f"MERGE_STRATEGY from={inc_branch} into={curr_branch} type={mtype} lca={lca}")
`
  },
  {
    id: 'gh3-c2-e2',
    chapter: 2,
    title: 'Simulateur de Rebase Interactif (git rebase -i)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l’exécution des instructions de réécriture d’historique git-rebase-todo (pick, squash, reword, drop).',
    brief: `<p>Le rebase interactif (<code>git rebase -i</code>) permet de nettoyer un historique de commits avant de proposer une Pull Request.<br><br>
Actions supportées :<br>
- <code>pick &lt;id&gt; &lt;msg&gt;</code> : conserve le commit tel quel.<br>
- <code>reword &lt;id&gt; &lt;nouveau_msg&gt;</code> : conserve les modifications mais remplace le message du commit.<br>
- <code>drop &lt;id&gt;</code> : supprime purement et simplement le commit de l’historique.<br>
- <code>squash &lt;id&gt; &lt;msg&gt;</code> : fusionne ce commit dans le commit précédent en concaténant les messages sous la forme <code>{msg_precedent} + {msg_squashe}</code>.<br><br>
Le script lit les commandes ordonnées de haut en bas :<br>
<code>TODO action=&lt;pick|reword|drop|squash&gt; commit=&lt;id&gt; [msg=&lt;message&gt;]</code>.<br><br>
À l’issue de la réécriture, afficher le nouvel historique résultant :<br>
Pour chaque commit conservé :<br>
<code>REBASED_COMMIT id={id} msg="{message}"</code><br>
Et la ligne finale :<br>
<code>REBASE_SUMMARY total_commits={n}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : exécuter les actions du rebase interactif
`,
    hints: [
      'Gérer une liste de commits réécrits.',
      'Lors d’un squash, modifier le dernier commit ajouté dans la liste en combinant les messages.'
    ],
    examples: [
      {
        stdin: 'TODO action=pick commit=C1 msg=feat: ajout login\nTODO action=squash commit=C2 msg=fix: correction typo\nTODO action=reword commit=C3 msg=feat: ajout logout propre',
        expected: 'REBASED_COMMIT id=C1 msg="feat: ajout login + fix: correction typo"\nREBASED_COMMIT id=C3 msg="feat: ajout logout propre"\nREBASE_SUMMARY total_commits=2',
        note: 'C2 a été écrasé (squashed) dans C1, C3 a son message réécrit.'
      }
    ],
    tests: [
      {
        label: 'Suppression de commit avec drop',
        stdin: 'TODO action=pick commit=A1 msg=Initial skeleton\nTODO action=drop commit=A2\nTODO action=pick commit=A3 msg=Ajout module BDD',
        expected: 'REBASED_COMMIT id=A1 msg="Initial skeleton"\nREBASED_COMMIT id=A3 msg="Ajout module BDD"\nREBASE_SUMMARY total_commits=2'
      },
      {
        label: 'Plusieurs squashs consécutifs',
        stdin: 'TODO action=pick commit=10 msg=Feature base\nTODO action=squash commit=11 msg=WIP test 1\nTODO action=squash commit=12 msg=WIP test 2\nTODO action=pick commit=13 msg=Docs',
        expected: 'REBASED_COMMIT id=10 msg="Feature base + WIP test 1 + WIP test 2"\nREBASED_COMMIT id=13 msg="Docs"\nREBASE_SUMMARY total_commits=2'
      },
      {
        label: 'Tous les commits conservés sans modification',
        stdin: 'TODO action=pick commit=K1 msg=Premier commit\nTODO action=pick commit=K2 msg=Second commit',
        expected: 'REBASED_COMMIT id=K1 msg="Premier commit"\nREBASED_COMMIT id=K2 msg="Second commit"\nREBASE_SUMMARY total_commits=2'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

rebased = []

for lig in lignes:
    m = re.search(r'action=([^\\s]+)\\s+commit=([^\\s]+)(?:\\s+msg=(.*))?', lig)
    if not m:
        continue
    action, cid, msg = m.groups()
    msg = msg.strip() if msg else ''
    
    if action == 'drop':
        continue
    elif action == 'pick':
        rebased.append({'id': cid, 'msg': msg})
    elif action == 'reword':
        rebased.append({'id': cid, 'msg': msg})
    elif action == 'squash':
        if rebased:
            prev = rebased[-1]
            prev['msg'] = f"{prev['msg']} + {msg}"

for c in rebased:
    print(f'REBASED_COMMIT id={c["id"]} msg="{c["msg"]}"')
print(f"REBASE_SUMMARY total_commits={len(rebased)}")
`
  },
  {
    id: 'gh3-c2-e3',
    chapter: 2,
    title: 'Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)',
    level: 'n3',
    language: 'python',
    goal: 'Appliquer l’algorithme de fusion à 3 voies ligne à ligne pour détecter les modifications unilatérales et les conflits.',
    brief: `<p>Lors d'un Three-Way Merge, Git compare chaque bloc de code par rapport à la version de l'ancêtre commun (<code>base</code>) :<br><br>
Règles de décision pour chaque ligne :<br>
1. Si <code>ours == base</code> et <code>theirs == base</code> : aucun changement -> conserver <code>base</code> (statut <code>CLEAN</code>).<br>
2. Si <code>ours != base</code> et <code>theirs == base</code> : modification unilatérale par notre branche -> adopter <code>ours</code> (statut <code>RESOLVED_OURS</code>).<br>
3. Si <code>ours == base</code> et <code>theirs != base</code> : modification unilatérale par la branche distante -> adopter <code>theirs</code> (statut <code>RESOLVED_THEIRS</code>).<br>
4. Si <code>ours == theirs</code> : les deux branches ont fait exactement le même changement -> adopter <code>ours</code> (statut <code>RESOLVED_SAME</code>).<br>
5. Si <code>ours != theirs</code> et les deux diffèrent de <code>base</code> : conflit de fusion réel (statut <code>CONFLICT</code>).<br><br>
Le script lit sur l'entrée standard des comparaisons de lignes au format :<br>
<code>LINE idx=&lt;n&gt; base=&lt;texte&gt; ours=&lt;texte&gt; theirs=&lt;texte&gt;</code>.<br><br>
Afficher :<br>
- Si pas de conflit : <code>MERGE idx={n} status={CLEAN|RESOLVED_OURS|RESOLVED_THEIRS|RESOLVED_SAME} val="{val}"</code><br>
- Si conflit : <code>MERGE idx={n} status=CONFLICT ours="{ours}" theirs="{theirs}"</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : implémenter la résolution de fusion à 3 voies
`,
    hints: [
      'Comparer les valeurs par rapport à base.',
      'Ne lever CONFLICT que si ours et theirs ont tous deux divergé de base avec des valeurs différentes.'
    ],
    examples: [
      {
        stdin: 'LINE idx=1 base=port = 80 ours=port = 443 theirs=port = 80\nLINE idx=2 base=timeout = 30 ours=timeout = 60 theirs=timeout = 120',
        expected: 'MERGE idx=1 status=RESOLVED_OURS val="port = 443"\nMERGE idx=2 status=CONFLICT ours="timeout = 60" theirs="timeout = 120"',
        note: 'Ligne 1 résolue en faveur de ours, ligne 2 en conflit.'
      }
    ],
    tests: [
      {
        label: 'Adoption unilatérale de theirs et ligne inchangée',
        stdin: 'LINE idx=10 base=debug = False ours=debug = False theirs=debug = True\nLINE idx=11 base=host = 0.0.0.0 ours=host = 0.0.0.0 theirs=host = 0.0.0.0',
        expected: 'MERGE idx=10 status=RESOLVED_THEIRS val="debug = True"\nMERGE idx=11 status=CLEAN val="host = 0.0.0.0"'
      },
      {
        label: 'Même modification adoptée des deux côtés',
        stdin: 'LINE idx=5 base=v1.0.0 ours=v1.1.0 theirs=v1.1.0',
        expected: 'MERGE idx=5 status=RESOLVED_SAME val="v1.1.0"'
      },
      {
        label: 'Série mixte de résolutions et conflits',
        stdin: 'LINE idx=1 base=A ours=A theirs=B\nLINE idx=2 base=X ours=Y theirs=Z\nLINE idx=3 base=M ours=N theirs=M',
        expected: 'MERGE idx=1 status=RESOLVED_THEIRS val="B"\nMERGE idx=2 status=CONFLICT ours="Y" theirs="Z"\nMERGE idx=3 status=RESOLVED_OURS val="N"'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'idx=([^\\s]+)\\s+base=(.*?)\\s+ours=(.*?)\\s+theirs=(.*)', lig)
    if not m:
        continue
    idx, base, ours, theirs = m.groups()
    
    if ours == base and theirs == base:
        print(f'MERGE idx={idx} status=CLEAN val="{base}"')
    elif ours != base and theirs == base:
        print(f'MERGE idx={idx} status=RESOLVED_OURS val="{ours}"')
    elif ours == base and theirs != base:
        print(f'MERGE idx={idx} status=RESOLVED_THEIRS val="{theirs}"')
    elif ours == theirs:
        print(f'MERGE idx={idx} status=RESOLVED_SAME val="{ours}"')
    else:
        print(f'MERGE idx={idx} status=CONFLICT ours="{ours}" theirs="{theirs}"')
`
  }
];
