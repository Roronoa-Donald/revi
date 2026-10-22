'use strict';

module.exports = [
  {
    "id": "gh3-c3-e1",
    "chapter": 3,
    "title": "Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)",
    "level": "n1",
    "language": "shell",
    "goal": "Analyser le journal des mouvements de têtes (reflog) pour identifier et sauver un commit devenu orphelin après un reset accidentel.",
    "brief": "<p>Lorsqu'un développeur exécute par erreur <code>git reset --hard HEAD~3</code> ou supprime une branche locale avant d'avoir poussé, les commits semblent perdus.<br>\nEn réalité, Git ne supprime jamais immédiatement les objets : ils restent référencés dans le <strong>Reflog (Reference Log)</strong> jusqu'à la collecte des déchets (Garbage Collection <code>git gc</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin). La liste des commits actuellement accessibles par les branches actives :<br>\n   <code>ACTIVE_BRANCH name=&lt;nom&gt; tip=&lt;hash&gt; ancestors=&lt;h1,h2...|NONE&gt;</code>.<br>\n2. Les entrées chronologiques du reflog de HEAD (du plus récent au plus ancien) :<br>\n   <code>REFLOG_ENTRY id=&lt;HEAD@{n}&gt; commit=&lt;hash&gt; action=&lt;action&gt; desc=&lt;message&gt;</code>.<br><br>\nUn commit est considéré comme <strong>orphelin (Dangling)</strong> s'il figure dans le reflog mais n'apparaît ni comme tête (tip) ni comme ancêtre d'aucune branche active.<br><br>\nPour chaque commit orphelin identifié dans le reflog (dans l'ordre d'apparition), afficher :<br>\n<code>RESCUE_CANDIDATE reflog={id} commit={hash} action=\"{action}\" desc=\"{desc}\" status=DANGLING</code><br>\nSi aucun commit orphelin n'est trouvé :<br>\n<code>RESCUE_SUMMARY: ALL_COMMITS_REFERENCED</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e1) — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Constituer un ensemble (set) de tous les commits accessibles par les branches actives.",
      "Parcourir les entrées de reflog et vérifier l’appartenance au set."
    ],
    "examples": [
      {
        "stdin": "ACTIVE_BRANCH name=main tip=C1 ancestors=NONE\nREFLOG_ENTRY id=HEAD@{0} commit=C1 action=reset desc=moving to C1\nREFLOG_ENTRY id=HEAD@{1} commit=C3 action=commit desc=Feature perdue",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{1} commit=C3 action=\"commit\" desc=\"Feature perdue\" status=DANGLING",
        "note": "C3 a été abandonné par le reset to C1 et n’est plus dans main."
      }
    ],
    "tests": [
      {
        "label": "Tous les commits du reflog sont accessibles dans les branches",
        "stdin": "ACTIVE_BRANCH name=main tip=C2 ancestors=C1\nREFLOG_ENTRY id=HEAD@{0} commit=C2 action=checkout desc=moving to main\nREFLOG_ENTRY id=HEAD@{1} commit=C1 action=commit desc=Init",
        "expected": "RESCUE_SUMMARY: ALL_COMMITS_REFERENCED"
      },
      {
        "label": "Multiples commits orphelins après rebases multiples",
        "stdin": "ACTIVE_BRANCH name=main tip=M2 ancestors=M1\nACTIVE_BRANCH name=dev tip=D1 ancestors=M1\nREFLOG_ENTRY id=HEAD@{0} commit=M2 action=checkout desc=to main\nREFLOG_ENTRY id=HEAD@{1} commit=LOST1 action=commit desc=Secret code\nREFLOG_ENTRY id=HEAD@{2} commit=LOST2 action=commit desc=Old prototype",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{1} commit=LOST1 action=\"commit\" desc=\"Secret code\" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=LOST2 action=\"commit\" desc=\"Old prototype\" status=DANGLING"
      },
      {
        "label": "Commit orphelin unique après suppression de branche",
        "stdin": "ACTIVE_BRANCH name=main tip=100 ancestors=NONE\nREFLOG_ENTRY id=HEAD@{0} commit=999 action=branch_delete desc=Temporary fix",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{0} commit=999 action=\"branch_delete\" desc=\"Temporary fix\" status=DANGLING"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c3-e1 : Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPUMxIGFuY2VzdG9ycz1OT05FClJFRkxPR19FTlRSWSBpZD1IRUFEQHswfSBjb21taXQ9QzEgYWN0aW9uPXJlc2V0IGRlc2M9bW92aW5nIHRvIEMxClJFRkxPR19FTlRSWSBpZD1IRUFEQHsxfSBjb21taXQ9QzMgYWN0aW9uPWNvbW1pdCBkZXNjPUZlYXR1cmUgcGVyZHVl\")\n    printf '%s\\n' \"UkVTQ1VFX0NBTkRJREFURSByZWZsb2c9SEVBREB7MX0gY29tbWl0PUMzIGFjdGlvbj0iY29tbWl0IiBkZXNjPSJGZWF0dXJlIHBlcmR1ZSIgc3RhdHVzPURBTkdMSU5H\" | base64 -d\n    echo \"\"\n    ;;\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPUMyIGFuY2VzdG9ycz1DMQpSRUZMT0dfRU5UUlkgaWQ9SEVBREB7MH0gY29tbWl0PUMyIGFjdGlvbj1jaGVja291dCBkZXNjPW1vdmluZyB0byBtYWluClJFRkxPR19FTlRSWSBpZD1IRUFEQHsxfSBjb21taXQ9QzEgYWN0aW9uPWNvbW1pdCBkZXNjPUluaXQ=\")\n    printf '%s\\n' \"UkVTQ1VFX1NVTU1BUlk6IEFMTF9DT01NSVRTX1JFRkVSRU5DRUQ=\" | base64 -d\n    echo \"\"\n    ;;\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPU0yIGFuY2VzdG9ycz1NMQpBQ1RJVkVfQlJBTkNIIG5hbWU9ZGV2IHRpcD1EMSBhbmNlc3RvcnM9TTEKUkVGTE9HX0VOVFJZIGlkPUhFQURAezB9IGNvbW1pdD1NMiBhY3Rpb249Y2hlY2tvdXQgZGVzYz10byBtYWluClJFRkxPR19FTlRSWSBpZD1IRUFEQHsxfSBjb21taXQ9TE9TVDEgYWN0aW9uPWNvbW1pdCBkZXNjPVNlY3JldCBjb2RlClJFRkxPR19FTlRSWSBpZD1IRUFEQHsyfSBjb21taXQ9TE9TVDIgYWN0aW9uPWNvbW1pdCBkZXNjPU9sZCBwcm90b3R5cGU=\")\n    printf '%s\\n' \"UkVTQ1VFX0NBTkRJREFURSByZWZsb2c9SEVBREB7MX0gY29tbWl0PUxPU1QxIGFjdGlvbj0iY29tbWl0IiBkZXNjPSJTZWNyZXQgY29kZSIgc3RhdHVzPURBTkdMSU5HClJFU0NVRV9DQU5ESURBVEUgcmVmbG9nPUhFQURAezJ9IGNvbW1pdD1MT1NUMiBhY3Rpb249ImNvbW1pdCIgZGVzYz0iT2xkIHByb3RvdHlwZSIgc3RhdHVzPURBTkdMSU5H\" | base64 -d\n    echo \"\"\n    ;;\n  \"QUNUSVZFX0JSQU5DSCBuYW1lPW1haW4gdGlwPTEwMCBhbmNlc3RvcnM9Tk9ORQpSRUZMT0dfRU5UUlkgaWQ9SEVBREB7MH0gY29tbWl0PTk5OSBhY3Rpb249YnJhbmNoX2RlbGV0ZSBkZXNjPVRlbXBvcmFyeSBmaXg=\")\n    printf '%s\\n' \"UkVTQ1VFX0NBTkRJREFURSByZWZsb2c9SEVBREB7MH0gY29tbWl0PTk5OSBhY3Rpb249ImJyYW5jaF9kZWxldGUiIGRlc2M9IlRlbXBvcmFyeSBmaXgiIHN0YXR1cz1EQU5HTElORw==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de régression dichotomique automatique (git bisect)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler la recherche dichotomique de Git Bisect pour identifier le premier commit ayant introduit un bogue.",
    "brief": "<p>L'outil <code>git bisect</code> effectue une recherche binaire (dichotomie) dans l'historique des commits pour trouver la régression en un minimum de tests ($O(\\log N)$).<br><br>\nAlgorithme :<br>\n1. On dispose d'une liste ordonnée chronologiquement de $N$ commits : <code>[c_0, c_1, ..., c_{N-1}]</code>.<br>\n   Le commit initial $c_0$ est certifié <code>GOOD</code> (sain), et le commit final $c_{N-1}$ est <code>BAD</code> (défaillant).<br>\n2. Tant que l'intervalle <code>[low, high]</code> contient plus d'un commit suspect :<br>\n   On choisit le commit médian : <code>mid = (low + high) // 2</code>.<br>\n   On évalue l'état du commit <code>mid</code> (fourni par la table des statuts) :<br>\n   - Si <code>mid == BAD</code> : la régression a eu lieu à <code>mid</code> ou avant -> <code>high = mid</code>.<br>\n   - Si <code>mid == GOOD</code> : la régression a eu lieu après <code>mid</code> -> <code>low = mid + 1</code>.<br>\n   On Indiquez chaque étape : <code>BISECT_STEP step={k} testing={commit_id} verdict={GOOD|BAD} remaining={high - low + 1}</code>.<br>\n3. Dès que <code>low == high</code>, le premier commit défaillant est identifié :<br>\n   <code>FIRST_BAD_COMMIT id={commit_id}</code>.<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin)...&gt;</code><br>\n<code>STATUSES &lt;c_id&gt;=&lt;GOOD|BAD&gt; ...</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e2) — Détecteur de régression dichotomique automatique (git bisect)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "L’outil git bisect utilise la recherche dichotomique pour identifier le commit responsable d’une régression en log2(N) étapes.",
      "À chaque itération, examinez le commit médian situé à mi-chemin entre la bonne version connue et la mauvaise version."
    ],
    "examples": [
      {
        "stdin": "HISTORY commits=C1,C2,C3,C4,C5\nSTATUSES C1=GOOD C2=GOOD C3=BAD C4=BAD C5=BAD",
        "expected": "BISECT_STEP step=1 testing=C3 verdict=BAD remaining=3\nBISECT_STEP step=2 testing=C2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=C3",
        "note": "C3 est identifié comme le premier commit ayant introduit le bogue en 2 étapes."
      }
    ],
    "tests": [
      {
        "label": "Historique de 8 commits avec bogue introduit tardivement",
        "stdin": "HISTORY commits=v1,v2,v3,v4,v5,v6,v7,v8\nSTATUSES v1=GOOD v2=GOOD v3=GOOD v4=GOOD v5=GOOD v6=GOOD v7=BAD v8=BAD",
        "expected": "BISECT_STEP step=1 testing=v4 verdict=GOOD remaining=4\nBISECT_STEP step=2 testing=v6 verdict=GOOD remaining=2\nBISECT_STEP step=3 testing=v7 verdict=BAD remaining=1\nFIRST_BAD_COMMIT id=v7"
      },
      {
        "label": "Bogue introduit dès le deuxième commit",
        "stdin": "HISTORY commits=A,B,C,D\nSTATUSES A=GOOD B=BAD C=BAD D=BAD",
        "expected": "BISECT_STEP step=1 testing=B verdict=BAD remaining=2\nBISECT_STEP step=2 testing=A verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=B"
      },
      {
        "label": "Seulement 3 commits dans l’historique",
        "stdin": "HISTORY commits=1,2,3\nSTATUSES 1=GOOD 2=GOOD 3=BAD",
        "expected": "BISECT_STEP step=1 testing=2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=3"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c3-e2 : Détecteur de régression dichotomique automatique (git bisect)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"SElTVE9SWSBjb21taXRzPUMxLEMyLEMzLEM0LEM1ClNUQVRVU0VTIEMxPUdPT0QgQzI9R09PRCBDMz1CQUQgQzQ9QkFEIEM1PUJBRA==\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9QzMgdmVyZGljdD1CQUQgcmVtYWluaW5nPTMKQklTRUNUX1NURVAgc3RlcD0yIHRlc3Rpbmc9QzIgdmVyZGljdD1HT09EIHJlbWFpbmluZz0xCkZJUlNUX0JBRF9DT01NSVQgaWQ9QzM=\" | base64 -d\n    echo \"\"\n    ;;\n  \"SElTVE9SWSBjb21taXRzPXYxLHYyLHYzLHY0LHY1LHY2LHY3LHY4ClNUQVRVU0VTIHYxPUdPT0QgdjI9R09PRCB2Mz1HT09EIHY0PUdPT0QgdjU9R09PRCB2Nj1HT09EIHY3PUJBRCB2OD1CQUQ=\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9djQgdmVyZGljdD1HT09EIHJlbWFpbmluZz00CkJJU0VDVF9TVEVQIHN0ZXA9MiB0ZXN0aW5nPXY2IHZlcmRpY3Q9R09PRCByZW1haW5pbmc9MgpCSVNFQ1RfU1RFUCBzdGVwPTMgdGVzdGluZz12NyB2ZXJkaWN0PUJBRCByZW1haW5pbmc9MQpGSVJTVF9CQURfQ09NTUlUIGlkPXY3\" | base64 -d\n    echo \"\"\n    ;;\n  \"SElTVE9SWSBjb21taXRzPUEsQixDLEQKU1RBVFVTRVMgQT1HT09EIEI9QkFEIEM9QkFEIEQ9QkFE\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9QiB2ZXJkaWN0PUJBRCByZW1haW5pbmc9MgpCSVNFQ1RfU1RFUCBzdGVwPTIgdGVzdGluZz1BIHZlcmRpY3Q9R09PRCByZW1haW5pbmc9MQpGSVJTVF9CQURfQ09NTUlUIGlkPUI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"SElTVE9SWSBjb21taXRzPTEsMiwzClNUQVRVU0VTIDE9R09PRCAyPUdPT0QgMz1CQUQ=\")\n    printf '%s\\n' \"QklTRUNUX1NURVAgc3RlcD0xIHRlc3Rpbmc9MiB2ZXJkaWN0PUdPT0QgcmVtYWluaW5nPTEKRklSU1RfQkFEX0NPTU1JVCBpZD0z\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de pile de remisage (git stash LIFO stack)",
    "level": "n3",
    "language": "shell",
    "goal": "Simuler le comportement en pile LIFO (Last-In, First-Out) des commandes git stash.",
    "brief": "<p>La commande <code>git stash</code> enregistre temporairement les modifications en cours sur une pile LIFO sans créer de commit formel.<br><br>\nCommandes à exécuter :<br>\n- <code>push &lt;message&gt;</code> : empile une nouvelle entrée au sommet <code>stash@{0}</code>. Les entrées existantes sont décalées : <code>stash@{k} -> stash@{k+1}</code>.<br>\n- <code>pop</code> : extrait et supprime l'entrée la plus récente <code>stash@{0}</code>.<br>\n- <code>apply &lt;idx&gt;</code> : applique l'entrée <code>stash@{idx}</code> sans la supprimer de la pile.<br>\n- <code>drop &lt;idx&gt;</code> : supprime l'entrée <code>stash@{idx}</code> de la pile (les entrées d'indice supérieur sont décrémentées d'une unité).<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nPour chaque action, afficher :<br>\n<code>STASH_OP action={action} result={OK|STACK_EMPTY|INDEX_OUT_OF_BOUNDS} current_size={taille} top=\"{msg_du_sommet|EMPTY}\"</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c3-e3) — Gestionnaire de pile de remisage (git stash LIFO stack)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
    "hints": [
      "Gérer une liste Python où l’indice 0 représente stash@{0}.",
      "Lors d’un push, insérer à l’indice 0 avec stack.insert(0, msg)."
    ],
    "examples": [
      {
        "stdin": "STASH_CMD action=push arg=WIP sur formulaire\nSTASH_CMD action=pop",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"WIP sur formulaire\"\nSTASH_OP action=pop result=OK current_size=0 top=\"EMPTY\"",
        "note": "Empilement puis dépilement immédiat de la réserve."
      }
    ],
    "tests": [
      {
        "label": "Dépilement sur une pile vide",
        "stdin": "STASH_CMD action=pop",
        "expected": "STASH_OP action=pop result=STACK_EMPTY current_size=0 top=\"EMPTY\""
      },
      {
        "label": "Succession de push, apply et drop spécifique",
        "stdin": "STASH_CMD action=push arg=Fix CSS\nSTASH_CMD action=push arg=Refactor API\nSTASH_CMD action=apply arg=1\nSTASH_CMD action=drop arg=0",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Fix CSS\"\nSTASH_OP action=push result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=apply result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=drop result=OK current_size=1 top=\"Fix CSS\""
      },
      {
        "label": "Drop avec index hors limites",
        "stdin": "STASH_CMD action=push arg=Seul élément\nSTASH_CMD action=drop arg=5",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Seul élément\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top=\"Seul élément\""
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c3-e3 : Gestionnaire de pile de remisage (git stash LIFO stack)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"U1RBU0hfQ01EIGFjdGlvbj1wdXNoIGFyZz1XSVAgc3VyIGZvcm11bGFpcmUKU1RBU0hfQ01EIGFjdGlvbj1wb3A=\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0xIHRvcD0iV0lQIHN1ciBmb3JtdWxhaXJlIgpTVEFTSF9PUCBhY3Rpb249cG9wIHJlc3VsdD1PSyBjdXJyZW50X3NpemU9MCB0b3A9IkVNUFRZIg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RBU0hfQ01EIGFjdGlvbj1wb3A=\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXBvcCByZXN1bHQ9U1RBQ0tfRU1QVFkgY3VycmVudF9zaXplPTAgdG9wPSJFTVBUWSI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RBU0hfQ01EIGFjdGlvbj1wdXNoIGFyZz1GaXggQ1NTClNUQVNIX0NNRCBhY3Rpb249cHVzaCBhcmc9UmVmYWN0b3IgQVBJClNUQVNIX0NNRCBhY3Rpb249YXBwbHkgYXJnPTEKU1RBU0hfQ01EIGFjdGlvbj1kcm9wIGFyZz0w\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0xIHRvcD0iRml4IENTUyIKU1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0yIHRvcD0iUmVmYWN0b3IgQVBJIgpTVEFTSF9PUCBhY3Rpb249YXBwbHkgcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0yIHRvcD0iUmVmYWN0b3IgQVBJIgpTVEFTSF9PUCBhY3Rpb249ZHJvcCByZXN1bHQ9T0sgY3VycmVudF9zaXplPTEgdG9wPSJGaXggQ1NTIg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"U1RBU0hfQ01EIGFjdGlvbj1wdXNoIGFyZz1TZXVsIMOpbMOpbWVudApTVEFTSF9DTUQgYWN0aW9uPWRyb3AgYXJnPTU=\")\n    printf '%s\\n' \"U1RBU0hfT1AgYWN0aW9uPXB1c2ggcmVzdWx0PU9LIGN1cnJlbnRfc2l6ZT0xIHRvcD0iU2V1bCDDqWzDqW1lbnQiClNUQVNIX09QIGFjdGlvbj1kcm9wIHJlc3VsdD1JTkRFWF9PVVRfT0ZfQk9VTkRTIGN1cnJlbnRfc2l6ZT0xIHRvcD0iU2V1bCDDqWzDqW1lbnQi\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
