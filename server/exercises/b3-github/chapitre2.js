'use strict';

module.exports = [
  {
    "id": "gh3-c2-e1",
    "chapter": 2,
    "title": "Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer si une fusion de branches peut s’effectuer en Fast-Forward ou requiert un 3-Way Merge avec commit de fusion.",
    "brief": "<p>Dans le graphe orienté acyclique (DAG) des commits de Git :<br>\n- Si le commit de tête de la branche courante (<code>base</code>) est un <strong>ancêtre direct</strong> de la branche à intégrer (<code>target</code>), Git avance simplement le pointeur sans créer de nouveau commit : c'est un <strong>Fast-Forward (FF)</strong>.<br>\n- Si les deux branches ont divergé depuis un ancêtre commun (Lowest Common Ancestor - LCA), un <strong>Three-Way Merge</strong> est nécessaire et un commit de fusion à 2 parents doit être généré.<br><br>\nAnalysez les paramètres du problème pour chaque cas. La déclaration des commits et de leurs parents :<br>\n   <code>COMMIT id=&lt;id&gt; parents=&lt;p1,p2...|NONE&gt;</code>.<br>\n2. La position des branches :<br>\n   <code>BRANCH name=&lt;nom&gt; commit=&lt;id&gt;</code>.<br>\n3. Une demande de fusion :<br>\n   <code>MERGE_REQUEST current=&lt;branche_base&gt; incoming=&lt;branche_target&gt;</code>.<br><br>\nAfficher :<br>\n<code>MERGE_STRATEGY from={incoming} into={current} type={FAST_FORWARD|THREE_WAY_MERGE} lca={lca_id}</code></p>",
    "starter": "# Grille d'analyse (gh3-c2-e1) — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Branches divergentes nécessitant un Three-Way Merge]\n# Données : COMMIT id=C1 parents=NONE\n# Données : COMMIT id=C2 parents=C1\n# Données : COMMIT id=C3 parents=C1\n# Données : BRANCH name=main commit=C2\n# Données : BRANCH name=feature commit=C3\n# Données : MERGE_REQUEST current=main incoming=feature\nA_COMPLETER\n\n[Cas 2 — Arborescence plus profonde avec Fast-Forward valide]\n# Données : COMMIT id=A parents=NONE\n# Données : COMMIT id=B parents=A\n# Données : COMMIT id=C parents=B\n# Données : COMMIT id=D parents=C\n# Données : BRANCH name=prod commit=B\n# Données : BRANCH name=release commit=D\n# Données : MERGE_REQUEST current=prod incoming=release\nA_COMPLETER\n\n[Cas 3 — Divergence après plusieurs commits communs]\n# Données : COMMIT id=R1 parents=NONE\n# Données : COMMIT id=R2 parents=R1\n# Données : COMMIT id=M1 parents=R2\n# Données : COMMIT id=M2 parents=M1\n# Données : COMMIT id=F1 parents=R2\n# Données : BRANCH name=main commit=M2\n# Données : BRANCH name=hotfix commit=F1\n# Données : MERGE_REQUEST current=main incoming=hotfix\nA_COMPLETER\n",
    "hints": [
      "Construire la liste de tous les ancêtres de chaque commit en remontant les parents.",
      "Si base_commit fait partie des ancêtres de incoming_commit, la fusion est FAST_FORWARD.",
      "Sinon, trouver le plus proche ancêtre commun (LCA)."
    ],
    "examples": [
      {
        "stdin": "COMMIT id=C1 parents=NONE\nCOMMIT id=C2 parents=C1\nCOMMIT id=C3 parents=C2\nBRANCH name=main commit=C1\nBRANCH name=feature commit=C3\nMERGE_REQUEST current=main incoming=feature",
        "expected": "MERGE_STRATEGY from=feature into=main type=FAST_FORWARD lca=C1",
        "note": "C1 est un ancêtre direct de C3 : avance rapide du pointeur main vers C3."
      }
    ],
    "tests": [
      {
        "label": "Branches divergentes nécessitant un Three-Way Merge",
        "stdin": "cas:1",
        "expected": "MERGE_STRATEGY from=feature into=main type=THREE_WAY_MERGE lca=C1"
      },
      {
        "label": "Arborescence plus profonde avec Fast-Forward valide",
        "stdin": "cas:2",
        "expected": "MERGE_STRATEGY from=release into=prod type=FAST_FORWARD lca=B"
      },
      {
        "label": "Divergence après plusieurs commits communs",
        "stdin": "cas:3",
        "expected": "MERGE_STRATEGY from=hotfix into=main type=THREE_WAY_MERGE lca=R2"
      }
    ],
    "solution": "[Exemple]\nMERGE_STRATEGY from=feature into=main type=FAST_FORWARD lca=C1\n\n[Cas 1 — Branches divergentes nécessitant un Three-Way Merge]\nMERGE_STRATEGY from=feature into=main type=THREE_WAY_MERGE lca=C1\n\n[Cas 2 — Arborescence plus profonde avec Fast-Forward valide]\nMERGE_STRATEGY from=release into=prod type=FAST_FORWARD lca=B\n\n[Cas 3 — Divergence après plusieurs commits communs]\nMERGE_STRATEGY from=hotfix into=main type=THREE_WAY_MERGE lca=R2"
  },
  {
    "id": "gh3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de Rebase Interactif (git rebase -i)",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l’exécution des instructions de réécriture d’historique git-rebase-todo (pick, squash, reword, drop).",
    "brief": "<p>Le rebase interactif (<code>git rebase -i</code>) permet de nettoyer un historique de commits avant de proposer une Pull Request.<br><br>\nActions supportées :<br>\n- <code>pick &lt;id&gt; &lt;msg&gt;</code> : conserve le commit tel quel.<br>\n- <code>reword &lt;id&gt; &lt;nouveau_msg&gt;</code> : conserve les modifications mais remplace le message du commit.<br>\n- <code>drop &lt;id&gt;</code> : supprime purement et simplement le commit de l’historique.<br>\n- <code>squash &lt;id&gt; &lt;msg&gt;</code> : fusionne ce commit dans le commit précédent en concaténant les messages sous la forme <code>{msg_precedent} + {msg_squashe}</code>.<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nÀ l’issue de la réécriture, afficher le nouvel historique résultant :<br>\nPour chaque commit conservé :<br>\n<code>REBASED_COMMIT id={id} msg=\"{message}\"</code><br>\nEt la ligne finale :<br>\n<code>REBASE_SUMMARY total_commits={n}</code></p>",
    "starter": "# Grille d'analyse (gh3-c2-e2) — Simulateur de Rebase Interactif (git rebase -i)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Suppression de commit avec drop]\n# Données : TODO action=pick commit=A1 msg=Initial skeleton\n# Données : TODO action=drop commit=A2\n# Données : TODO action=pick commit=A3 msg=Ajout module BDD\nA_COMPLETER\n\n[Cas 2 — Plusieurs squashs consécutifs]\n# Données : TODO action=pick commit=10 msg=Feature base\n# Données : TODO action=squash commit=11 msg=WIP test 1\n# Données : TODO action=squash commit=12 msg=WIP test 2\n# Données : TODO action=pick commit=13 msg=Docs\nA_COMPLETER\n\n[Cas 3 — Tous les commits conservés sans modification]\n# Données : TODO action=pick commit=K1 msg=Premier commit\n# Données : TODO action=pick commit=K2 msg=Second commit\nA_COMPLETER\n",
    "hints": [
      "Gérer une liste de commits réécrits.",
      "Lors d’un squash, modifier le dernier commit ajouté dans la liste en combinant les messages."
    ],
    "examples": [
      {
        "stdin": "TODO action=pick commit=C1 msg=feat: ajout login\nTODO action=squash commit=C2 msg=fix: correction typo\nTODO action=reword commit=C3 msg=feat: ajout logout propre",
        "expected": "REBASED_COMMIT id=C1 msg=\"feat: ajout login + fix: correction typo\"\nREBASED_COMMIT id=C3 msg=\"feat: ajout logout propre\"\nREBASE_SUMMARY total_commits=2",
        "note": "C2 a été écrasé (squashed) dans C1, C3 a son message réécrit."
      }
    ],
    "tests": [
      {
        "label": "Suppression de commit avec drop",
        "stdin": "cas:1",
        "expected": "REBASED_COMMIT id=A1 msg=\"Initial skeleton\"\nREBASED_COMMIT id=A3 msg=\"Ajout module BDD\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Plusieurs squashs consécutifs",
        "stdin": "cas:2",
        "expected": "REBASED_COMMIT id=10 msg=\"Feature base + WIP test 1 + WIP test 2\"\nREBASED_COMMIT id=13 msg=\"Docs\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Tous les commits conservés sans modification",
        "stdin": "cas:3",
        "expected": "REBASED_COMMIT id=K1 msg=\"Premier commit\"\nREBASED_COMMIT id=K2 msg=\"Second commit\"\nREBASE_SUMMARY total_commits=2"
      }
    ],
    "solution": "[Exemple]\nREBASED_COMMIT id=C1 msg=\"feat: ajout login + fix: correction typo\"\nREBASED_COMMIT id=C3 msg=\"feat: ajout logout propre\"\nREBASE_SUMMARY total_commits=2\n\n[Cas 1 — Suppression de commit avec drop]\nREBASED_COMMIT id=A1 msg=\"Initial skeleton\"\nREBASED_COMMIT id=A3 msg=\"Ajout module BDD\"\nREBASE_SUMMARY total_commits=2\n\n[Cas 2 — Plusieurs squashs consécutifs]\nREBASED_COMMIT id=10 msg=\"Feature base + WIP test 1 + WIP test 2\"\nREBASED_COMMIT id=13 msg=\"Docs\"\nREBASE_SUMMARY total_commits=2\n\n[Cas 3 — Tous les commits conservés sans modification]\nREBASED_COMMIT id=K1 msg=\"Premier commit\"\nREBASED_COMMIT id=K2 msg=\"Second commit\"\nREBASE_SUMMARY total_commits=2"
  },
  {
    "id": "gh3-c2-e3",
    "chapter": 2,
    "title": "Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)",
    "level": "n3",
    "language": "analyse",
    "goal": "Appliquer l’algorithme de fusion à 3 voies ligne à ligne pour détecter les modifications unilatérales et les conflits.",
    "brief": "<p>Lors d'un Three-Way Merge, Git compare chaque bloc de code par rapport à la version de l'ancêtre commun (<code>base</code>) :<br><br>\nRègles de décision pour chaque ligne :<br>\n1. Si <code>ours == base</code> et <code>theirs == base</code> : aucun changement -> conserver <code>base</code> (statut <code>CLEAN</code>).<br>\n2. Si <code>ours != base</code> et <code>theirs == base</code> : modification unilatérale par notre branche -> adopter <code>ours</code> (statut <code>RESOLVED_OURS</code>).<br>\n3. Si <code>ours == base</code> et <code>theirs != base</code> : modification unilatérale par la branche distante -> adopter <code>theirs</code> (statut <code>RESOLVED_THEIRS</code>).<br>\n4. Si <code>ours == theirs</code> : les deux branches ont fait exactement le même changement -> adopter <code>ours</code> (statut <code>RESOLVED_SAME</code>).<br>\n5. Si <code>ours != theirs</code> et les deux diffèrent de <code>base</code> : conflit de fusion réel (statut <code>CONFLICT</code>).<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nAfficher :<br>\n- Si pas de conflit : <code>MERGE idx={n} status={CLEAN|RESOLVED_OURS|RESOLVED_THEIRS|RESOLVED_SAME} val=\"{val}\"</code><br>\n- Si conflit : <code>MERGE idx={n} status=CONFLICT ours=\"{ours}\" theirs=\"{theirs}\"</code></p>",
    "starter": "# Grille d'analyse (gh3-c2-e3) — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Adoption unilatérale de theirs et ligne inchangée]\n# Données : LINE idx=10 base=debug = False ours=debug = False theirs=debug = True\n# Données : LINE idx=11 base=host = 0.0.0.0 ours=host = 0.0.0.0 theirs=host = 0.0.0.0\nA_COMPLETER\n\n[Cas 2 — Même modification adoptée des deux côtés]\n# Données : LINE idx=5 base=v1.0.0 ours=v1.1.0 theirs=v1.1.0\nA_COMPLETER\n\n[Cas 3 — Série mixte de résolutions et conflits]\n# Données : LINE idx=1 base=A ours=A theirs=B\n# Données : LINE idx=2 base=X ours=Y theirs=Z\n# Données : LINE idx=3 base=M ours=N theirs=M\nA_COMPLETER\n",
    "hints": [
      "Comparer les valeurs par rapport à base.",
      "Ne lever CONFLICT que si ours et theirs ont tous deux divergé de base avec des valeurs différentes."
    ],
    "examples": [
      {
        "stdin": "LINE idx=1 base=port = 80 ours=port = 443 theirs=port = 80\nLINE idx=2 base=timeout = 30 ours=timeout = 60 theirs=timeout = 120",
        "expected": "MERGE idx=1 status=RESOLVED_OURS val=\"port = 443\"\nMERGE idx=2 status=CONFLICT ours=\"timeout = 60\" theirs=\"timeout = 120\"",
        "note": "Ligne 1 résolue en faveur de ours, ligne 2 en conflit."
      }
    ],
    "tests": [
      {
        "label": "Adoption unilatérale de theirs et ligne inchangée",
        "stdin": "cas:1",
        "expected": "MERGE idx=10 status=RESOLVED_THEIRS val=\"debug = True\"\nMERGE idx=11 status=CLEAN val=\"host = 0.0.0.0\""
      },
      {
        "label": "Même modification adoptée des deux côtés",
        "stdin": "cas:2",
        "expected": "MERGE idx=5 status=RESOLVED_SAME val=\"v1.1.0\""
      },
      {
        "label": "Série mixte de résolutions et conflits",
        "stdin": "cas:3",
        "expected": "MERGE idx=1 status=RESOLVED_THEIRS val=\"B\"\nMERGE idx=2 status=CONFLICT ours=\"Y\" theirs=\"Z\"\nMERGE idx=3 status=RESOLVED_OURS val=\"N\""
      }
    ],
    "solution": "[Exemple]\nMERGE idx=1 status=RESOLVED_OURS val=\"port = 443\"\nMERGE idx=2 status=CONFLICT ours=\"timeout = 60\" theirs=\"timeout = 120\"\n\n[Cas 1 — Adoption unilatérale de theirs et ligne inchangée]\nMERGE idx=10 status=RESOLVED_THEIRS val=\"debug = True\"\nMERGE idx=11 status=CLEAN val=\"host = 0.0.0.0\"\n\n[Cas 2 — Même modification adoptée des deux côtés]\nMERGE idx=5 status=RESOLVED_SAME val=\"v1.1.0\"\n\n[Cas 3 — Série mixte de résolutions et conflits]\nMERGE idx=1 status=RESOLVED_THEIRS val=\"B\"\nMERGE idx=2 status=CONFLICT ours=\"Y\" theirs=\"Z\"\nMERGE idx=3 status=RESOLVED_OURS val=\"N\""
  }
];
