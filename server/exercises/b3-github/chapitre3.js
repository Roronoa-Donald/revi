'use strict';

module.exports = [
  {
    "id": "gh3-c3-e1",
    "chapter": 3,
    "title": "Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser le journal des mouvements de têtes (reflog) pour identifier et sauver un commit devenu orphelin après un reset accidentel.",
    "brief": "<p>Lorsqu'un développeur exécute par erreur <code>git reset --hard HEAD~3</code> ou supprime une branche locale avant d'avoir poussé, les commits semblent perdus.<br>\nEn réalité, Git ne supprime jamais immédiatement les objets : ils restent référencés dans le <strong>Reflog (Reference Log)</strong> jusqu'à la collecte des déchets (Garbage Collection <code>git gc</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas. La liste des commits actuellement accessibles par les branches actives :<br>\n   <code>ACTIVE_BRANCH name=&lt;nom&gt; tip=&lt;hash&gt; ancestors=&lt;h1,h2...|NONE&gt;</code>.<br>\n2. Les entrées chronologiques du reflog de HEAD (du plus récent au plus ancien) :<br>\n   <code>REFLOG_ENTRY id=&lt;HEAD@{n}&gt; commit=&lt;hash&gt; action=&lt;action&gt; desc=&lt;message&gt;</code>.<br><br>\nUn commit est considéré comme <strong>orphelin (Dangling)</strong> s'il figure dans le reflog mais n'apparaît ni comme tête (tip) ni comme ancêtre d'aucune branche active.<br><br>\nPour chaque commit orphelin identifié dans le reflog (dans l'ordre d'apparition), afficher :<br>\n<code>RESCUE_CANDIDATE reflog={id} commit={hash} action=\"{action}\" desc=\"{desc}\" status=DANGLING</code><br>\nSi aucun commit orphelin n'est trouvé :<br>\n<code>RESCUE_SUMMARY: ALL_COMMITS_REFERENCED</code></p>",
    "starter": "# Grille d'analyse (gh3-c3-e1) — Explorateur de Reflog et récupération de commits orphelins (Dangling Commits)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tous les commits du reflog sont accessibles dans les branches]\n# Données : ACTIVE_BRANCH name=main tip=C2 ancestors=C1\n# Données : REFLOG_ENTRY id=HEAD@{0} commit=C2 action=checkout desc=moving to main\n# Données : REFLOG_ENTRY id=HEAD@{1} commit=C1 action=commit desc=Init\nA_COMPLETER\n\n[Cas 2 — Multiples commits orphelins après rebases multiples]\n# Données : ACTIVE_BRANCH name=main tip=M2 ancestors=M1\n# Données : ACTIVE_BRANCH name=dev tip=D1 ancestors=M1\n# Données : REFLOG_ENTRY id=HEAD@{0} commit=M2 action=checkout desc=to main\n# Données : REFLOG_ENTRY id=HEAD@{1} commit=LOST1 action=commit desc=Secret code\n# Données : REFLOG_ENTRY id=HEAD@{2} commit=LOST2 action=commit desc=Old prototype\nA_COMPLETER\n\n[Cas 3 — Commit orphelin unique après suppression de branche]\n# Données : ACTIVE_BRANCH name=main tip=100 ancestors=NONE\n# Données : REFLOG_ENTRY id=HEAD@{0} commit=999 action=branch_delete desc=Temporary fix\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "RESCUE_SUMMARY: ALL_COMMITS_REFERENCED"
      },
      {
        "label": "Multiples commits orphelins après rebases multiples",
        "stdin": "cas:2",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{1} commit=LOST1 action=\"commit\" desc=\"Secret code\" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=LOST2 action=\"commit\" desc=\"Old prototype\" status=DANGLING"
      },
      {
        "label": "Commit orphelin unique après suppression de branche",
        "stdin": "cas:3",
        "expected": "RESCUE_CANDIDATE reflog=HEAD@{0} commit=999 action=\"branch_delete\" desc=\"Temporary fix\" status=DANGLING"
      }
    ],
    "solution": "[Exemple]\nRESCUE_CANDIDATE reflog=HEAD@{1} commit=C3 action=\"commit\" desc=\"Feature perdue\" status=DANGLING\n\n[Cas 1 — Tous les commits du reflog sont accessibles dans les branches]\nRESCUE_SUMMARY: ALL_COMMITS_REFERENCED\n\n[Cas 2 — Multiples commits orphelins après rebases multiples]\nRESCUE_CANDIDATE reflog=HEAD@{1} commit=LOST1 action=\"commit\" desc=\"Secret code\" status=DANGLING\nRESCUE_CANDIDATE reflog=HEAD@{2} commit=LOST2 action=\"commit\" desc=\"Old prototype\" status=DANGLING\n\n[Cas 3 — Commit orphelin unique après suppression de branche]\nRESCUE_CANDIDATE reflog=HEAD@{0} commit=999 action=\"branch_delete\" desc=\"Temporary fix\" status=DANGLING"
  },
  {
    "id": "gh3-c3-e2",
    "chapter": 3,
    "title": "Détecteur de régression dichotomique automatique (git bisect)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler la recherche dichotomique de Git Bisect pour identifier le premier commit ayant introduit un bogue.",
    "brief": "<p>L'outil <code>git bisect</code> effectue une recherche binaire (dichotomie) dans l'historique des commits pour trouver la régression en un minimum de tests ($O(\\log N)$).<br><br>\nAlgorithme :<br>\n1. On dispose d'une liste ordonnée chronologiquement de $N$ commits : <code>[c_0, c_1, ..., c_{N-1}]</code>.<br>\n   Le commit initial $c_0$ est certifié <code>GOOD</code> (sain), et le commit final $c_{N-1}$ est <code>BAD</code> (défaillant).<br>\n2. Tant que l'intervalle <code>[low, high]</code> contient plus d'un commit suspect :<br>\n   On choisit le commit médian : <code>mid = (low + high) // 2</code>.<br>\n   On évalue l'état du commit <code>mid</code> (fourni par la table des statuts) :<br>\n   - Si <code>mid == BAD</code> : la régression a eu lieu à <code>mid</code> ou avant -> <code>high = mid</code>.<br>\n   - Si <code>mid == GOOD</code> : la régression a eu lieu après <code>mid</code> -> <code>low = mid + 1</code>.<br>\n   On Indiquez chaque étape : <code>BISECT_STEP step={k} testing={commit_id} verdict={GOOD|BAD} remaining={high - low + 1}</code>.<br>\n3. Dès que <code>low == high</code>, le premier commit défaillant est identifié :<br>\n   <code>FIRST_BAD_COMMIT id={commit_id}</code>.<br><br>\nAnalysez les données fournies pour chaque cas...&gt;</code><br>\n<code>STATUSES &lt;c_id&gt;=&lt;GOOD|BAD&gt; ...</code></p>",
    "starter": "# Grille d'analyse (gh3-c3-e2) — Détecteur de régression dichotomique automatique (git bisect)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Historique de 8 commits avec bogue introduit tardivement]\n# Données : HISTORY commits=v1,v2,v3,v4,v5,v6,v7,v8\n# Données : STATUSES v1=GOOD v2=GOOD v3=GOOD v4=GOOD v5=GOOD v6=GOOD v7=BAD v8=BAD\nA_COMPLETER\n\n[Cas 2 — Bogue introduit dès le deuxième commit]\n# Données : HISTORY commits=A,B,C,D\n# Données : STATUSES A=GOOD B=BAD C=BAD D=BAD\nA_COMPLETER\n\n[Cas 3 — Seulement 3 commits dans l’historique]\n# Données : HISTORY commits=1,2,3\n# Données : STATUSES 1=GOOD 2=GOOD 3=BAD\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "BISECT_STEP step=1 testing=v4 verdict=GOOD remaining=4\nBISECT_STEP step=2 testing=v6 verdict=GOOD remaining=2\nBISECT_STEP step=3 testing=v7 verdict=BAD remaining=1\nFIRST_BAD_COMMIT id=v7"
      },
      {
        "label": "Bogue introduit dès le deuxième commit",
        "stdin": "cas:2",
        "expected": "BISECT_STEP step=1 testing=B verdict=BAD remaining=2\nBISECT_STEP step=2 testing=A verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=B"
      },
      {
        "label": "Seulement 3 commits dans l’historique",
        "stdin": "cas:3",
        "expected": "BISECT_STEP step=1 testing=2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=3"
      }
    ],
    "solution": "[Exemple]\nBISECT_STEP step=1 testing=C3 verdict=BAD remaining=3\nBISECT_STEP step=2 testing=C2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=C3\n\n[Cas 1 — Historique de 8 commits avec bogue introduit tardivement]\nBISECT_STEP step=1 testing=v4 verdict=GOOD remaining=4\nBISECT_STEP step=2 testing=v6 verdict=GOOD remaining=2\nBISECT_STEP step=3 testing=v7 verdict=BAD remaining=1\nFIRST_BAD_COMMIT id=v7\n\n[Cas 2 — Bogue introduit dès le deuxième commit]\nBISECT_STEP step=1 testing=B verdict=BAD remaining=2\nBISECT_STEP step=2 testing=A verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=B\n\n[Cas 3 — Seulement 3 commits dans l’historique]\nBISECT_STEP step=1 testing=2 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=3"
  },
  {
    "id": "gh3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de pile de remisage (git stash LIFO stack)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le comportement en pile LIFO (Last-In, First-Out) des commandes git stash.",
    "brief": "<p>La commande <code>git stash</code> enregistre temporairement les modifications en cours sur une pile LIFO sans créer de commit formel.<br><br>\nCommandes à exécuter :<br>\n- <code>push &lt;message&gt;</code> : empile une nouvelle entrée au sommet <code>stash@{0}</code>. Les entrées existantes sont décalées : <code>stash@{k} -> stash@{k+1}</code>.<br>\n- <code>pop</code> : extrait et supprime l'entrée la plus récente <code>stash@{0}</code>.<br>\n- <code>apply &lt;idx&gt;</code> : applique l'entrée <code>stash@{idx}</code> sans la supprimer de la pile.<br>\n- <code>drop &lt;idx&gt;</code> : supprime l'entrée <code>stash@{idx}</code> de la pile (les entrées d'indice supérieur sont décrémentées d'une unité).<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPour chaque action, afficher :<br>\n<code>STASH_OP action={action} result={OK|STACK_EMPTY|INDEX_OUT_OF_BOUNDS} current_size={taille} top=\"{msg_du_sommet|EMPTY}\"</code></p>",
    "starter": "# Grille d'analyse (gh3-c3-e3) — Gestionnaire de pile de remisage (git stash LIFO stack)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dépilement sur une pile vide]\n# Données : STASH_CMD action=pop\nA_COMPLETER\n\n[Cas 2 — Succession de push, apply et drop spécifique]\n# Données : STASH_CMD action=push arg=Fix CSS\n# Données : STASH_CMD action=push arg=Refactor API\n# Données : STASH_CMD action=apply arg=1\n# Données : STASH_CMD action=drop arg=0\nA_COMPLETER\n\n[Cas 3 — Drop avec index hors limites]\n# Données : STASH_CMD action=push arg=Seul élément\n# Données : STASH_CMD action=drop arg=5\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "STASH_OP action=pop result=STACK_EMPTY current_size=0 top=\"EMPTY\""
      },
      {
        "label": "Succession de push, apply et drop spécifique",
        "stdin": "cas:2",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Fix CSS\"\nSTASH_OP action=push result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=apply result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=drop result=OK current_size=1 top=\"Fix CSS\""
      },
      {
        "label": "Drop avec index hors limites",
        "stdin": "cas:3",
        "expected": "STASH_OP action=push result=OK current_size=1 top=\"Seul élément\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top=\"Seul élément\""
      }
    ],
    "solution": "[Exemple]\nSTASH_OP action=push result=OK current_size=1 top=\"WIP sur formulaire\"\nSTASH_OP action=pop result=OK current_size=0 top=\"EMPTY\"\n\n[Cas 1 — Dépilement sur une pile vide]\nSTASH_OP action=pop result=STACK_EMPTY current_size=0 top=\"EMPTY\"\n\n[Cas 2 — Succession de push, apply et drop spécifique]\nSTASH_OP action=push result=OK current_size=1 top=\"Fix CSS\"\nSTASH_OP action=push result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=apply result=OK current_size=2 top=\"Refactor API\"\nSTASH_OP action=drop result=OK current_size=1 top=\"Fix CSS\"\n\n[Cas 3 — Drop avec index hors limites]\nSTASH_OP action=push result=OK current_size=1 top=\"Seul élément\"\nSTASH_OP action=drop result=INDEX_OUT_OF_BOUNDS current_size=1 top=\"Seul élément\""
  }
];
