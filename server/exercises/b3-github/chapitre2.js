'use strict';

module.exports = [
  {
    "id": "gh3-c2-e1",
    "chapter": 2,
    "title": "Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge",
    "level": "n1",
    "language": "shell",
    "goal": "Déterminer si une fusion de branches peut s’effectuer en Fast-Forward ou requiert un 3-Way Merge avec commit de fusion.",
    "brief": "<p>Dans le graphe orienté acyclique (DAG) des commits de Git :<br>\n- Si le commit de tête de la branche courante (<code>base</code>) est un <strong>ancêtre direct</strong> de la branche à intégrer (<code>target</code>), Git avance simplement le pointeur sans créer de nouveau commit : c'est un <strong>Fast-Forward (FF)</strong>.<br>\n- Si les deux branches ont divergé depuis un ancêtre commun (Lowest Common Ancestor - LCA), un <strong>Three-Way Merge</strong> est nécessaire et un commit de fusion à 2 parents doit être généré.<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin). La déclaration des commits et de leurs parents :<br>\n   <code>COMMIT id=&lt;id&gt; parents=&lt;p1,p2...|NONE&gt;</code>.<br>\n2. La position des branches :<br>\n   <code>BRANCH name=&lt;nom&gt; commit=&lt;id&gt;</code>.<br>\n3. Une demande de fusion :<br>\n   <code>MERGE_REQUEST current=&lt;branche_base&gt; incoming=&lt;branche_target&gt;</code>.<br><br>\nAfficher :<br>\n<code>MERGE_STRATEGY from={incoming} into={current} type={FAST_FORWARD|THREE_WAY_MERGE} lca={lca_id}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e1) — Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "COMMIT id=C1 parents=NONE\nCOMMIT id=C2 parents=C1\nCOMMIT id=C3 parents=C1\nBRANCH name=main commit=C2\nBRANCH name=feature commit=C3\nMERGE_REQUEST current=main incoming=feature",
        "expected": "MERGE_STRATEGY from=feature into=main type=THREE_WAY_MERGE lca=C1"
      },
      {
        "label": "Arborescence plus profonde avec Fast-Forward valide",
        "stdin": "COMMIT id=A parents=NONE\nCOMMIT id=B parents=A\nCOMMIT id=C parents=B\nCOMMIT id=D parents=C\nBRANCH name=prod commit=B\nBRANCH name=release commit=D\nMERGE_REQUEST current=prod incoming=release",
        "expected": "MERGE_STRATEGY from=release into=prod type=FAST_FORWARD lca=B"
      },
      {
        "label": "Divergence après plusieurs commits communs",
        "stdin": "COMMIT id=R1 parents=NONE\nCOMMIT id=R2 parents=R1\nCOMMIT id=M1 parents=R2\nCOMMIT id=M2 parents=M1\nCOMMIT id=F1 parents=R2\nBRANCH name=main commit=M2\nBRANCH name=hotfix commit=F1\nMERGE_REQUEST current=main incoming=hotfix",
        "expected": "MERGE_STRATEGY from=hotfix into=main type=THREE_WAY_MERGE lca=R2"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c2-e1 : Détecteur de stratégie de fusion : Fast-Forward vs 3-Way Merge\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"Q09NTUlUIGlkPUMxIHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9QzIgcGFyZW50cz1DMQpDT01NSVQgaWQ9QzMgcGFyZW50cz1DMgpCUkFOQ0ggbmFtZT1tYWluIGNvbW1pdD1DMQpCUkFOQ0ggbmFtZT1mZWF0dXJlIGNvbW1pdD1DMwpNRVJHRV9SRVFVRVNUIGN1cnJlbnQ9bWFpbiBpbmNvbWluZz1mZWF0dXJl\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1mZWF0dXJlIGludG89bWFpbiB0eXBlPUZBU1RfRk9SV0FSRCBsY2E9QzE=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPUMxIHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9QzIgcGFyZW50cz1DMQpDT01NSVQgaWQ9QzMgcGFyZW50cz1DMQpCUkFOQ0ggbmFtZT1tYWluIGNvbW1pdD1DMgpCUkFOQ0ggbmFtZT1mZWF0dXJlIGNvbW1pdD1DMwpNRVJHRV9SRVFVRVNUIGN1cnJlbnQ9bWFpbiBpbmNvbWluZz1mZWF0dXJl\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1mZWF0dXJlIGludG89bWFpbiB0eXBlPVRIUkVFX1dBWV9NRVJHRSBsY2E9QzE=\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPUEgcGFyZW50cz1OT05FCkNPTU1JVCBpZD1CIHBhcmVudHM9QQpDT01NSVQgaWQ9QyBwYXJlbnRzPUIKQ09NTUlUIGlkPUQgcGFyZW50cz1DCkJSQU5DSCBuYW1lPXByb2QgY29tbWl0PUIKQlJBTkNIIG5hbWU9cmVsZWFzZSBjb21taXQ9RApNRVJHRV9SRVFVRVNUIGN1cnJlbnQ9cHJvZCBpbmNvbWluZz1yZWxlYXNl\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1yZWxlYXNlIGludG89cHJvZCB0eXBlPUZBU1RfRk9SV0FSRCBsY2E9Qg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"Q09NTUlUIGlkPVIxIHBhcmVudHM9Tk9ORQpDT01NSVQgaWQ9UjIgcGFyZW50cz1SMQpDT01NSVQgaWQ9TTEgcGFyZW50cz1SMgpDT01NSVQgaWQ9TTIgcGFyZW50cz1NMQpDT01NSVQgaWQ9RjEgcGFyZW50cz1SMgpCUkFOQ0ggbmFtZT1tYWluIGNvbW1pdD1NMgpCUkFOQ0ggbmFtZT1ob3RmaXggY29tbWl0PUYxCk1FUkdFX1JFUVVFU1QgY3VycmVudD1tYWluIGluY29taW5nPWhvdGZpeA==\")\n    printf '%s\\n' \"TUVSR0VfU1RSQVRFR1kgZnJvbT1ob3RmaXggaW50bz1tYWluIHR5cGU9VEhSRUVfV0FZX01FUkdFIGxjYT1SMg==\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c2-e2",
    "chapter": 2,
    "title": "Simulateur de Rebase Interactif (git rebase -i)",
    "level": "n2",
    "language": "shell",
    "goal": "Simuler l’exécution des instructions de réécriture d’historique git-rebase-todo (pick, squash, reword, drop).",
    "brief": "<p>Le rebase interactif (<code>git rebase -i</code>) permet de nettoyer un historique de commits avant de proposer une Pull Request.<br><br>\nActions supportées :<br>\n- <code>pick &lt;id&gt; &lt;msg&gt;</code> : conserve le commit tel quel.<br>\n- <code>reword &lt;id&gt; &lt;nouveau_msg&gt;</code> : conserve les modifications mais remplace le message du commit.<br>\n- <code>drop &lt;id&gt;</code> : supprime purement et simplement le commit de l’historique.<br>\n- <code>squash &lt;id&gt; &lt;msg&gt;</code> : fusionne ce commit dans le commit précédent en concaténant les messages sous la forme <code>{msg_precedent} + {msg_squashe}</code>.<br><br>\nLe script Bash lit les données sur l’entrée standard (stdin).<br><br>\nÀ l’issue de la réécriture, afficher le nouvel historique résultant :<br>\nPour chaque commit conservé :<br>\n<code>REBASED_COMMIT id={id} msg=\"{message}\"</code><br>\nEt la ligne finale :<br>\n<code>REBASE_SUMMARY total_commits={n}</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e2) — Simulateur de Rebase Interactif (git rebase -i)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "TODO action=pick commit=A1 msg=Initial skeleton\nTODO action=drop commit=A2\nTODO action=pick commit=A3 msg=Ajout module BDD",
        "expected": "REBASED_COMMIT id=A1 msg=\"Initial skeleton\"\nREBASED_COMMIT id=A3 msg=\"Ajout module BDD\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Plusieurs squashs consécutifs",
        "stdin": "TODO action=pick commit=10 msg=Feature base\nTODO action=squash commit=11 msg=WIP test 1\nTODO action=squash commit=12 msg=WIP test 2\nTODO action=pick commit=13 msg=Docs",
        "expected": "REBASED_COMMIT id=10 msg=\"Feature base + WIP test 1 + WIP test 2\"\nREBASED_COMMIT id=13 msg=\"Docs\"\nREBASE_SUMMARY total_commits=2"
      },
      {
        "label": "Tous les commits conservés sans modification",
        "stdin": "TODO action=pick commit=K1 msg=Premier commit\nTODO action=pick commit=K2 msg=Second commit",
        "expected": "REBASED_COMMIT id=K1 msg=\"Premier commit\"\nREBASED_COMMIT id=K2 msg=\"Second commit\"\nREBASE_SUMMARY total_commits=2"
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c2-e2 : Simulateur de Rebase Interactif (git rebase -i)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9QzEgbXNnPWZlYXQ6IGFqb3V0IGxvZ2luClRPRE8gYWN0aW9uPXNxdWFzaCBjb21taXQ9QzIgbXNnPWZpeDogY29ycmVjdGlvbiB0eXBvClRPRE8gYWN0aW9uPXJld29yZCBjb21taXQ9QzMgbXNnPWZlYXQ6IGFqb3V0IGxvZ291dCBwcm9wcmU=\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9QzEgbXNnPSJmZWF0OiBham91dCBsb2dpbiArIGZpeDogY29ycmVjdGlvbiB0eXBvIgpSRUJBU0VEX0NPTU1JVCBpZD1DMyBtc2c9ImZlYXQ6IGFqb3V0IGxvZ291dCBwcm9wcmUiClJFQkFTRV9TVU1NQVJZIHRvdGFsX2NvbW1pdHM9Mg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9QTEgbXNnPUluaXRpYWwgc2tlbGV0b24KVE9ETyBhY3Rpb249ZHJvcCBjb21taXQ9QTIKVE9ETyBhY3Rpb249cGljayBjb21taXQ9QTMgbXNnPUFqb3V0IG1vZHVsZSBCREQ=\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9QTEgbXNnPSJJbml0aWFsIHNrZWxldG9uIgpSRUJBU0VEX0NPTU1JVCBpZD1BMyBtc2c9IkFqb3V0IG1vZHVsZSBCREQiClJFQkFTRV9TVU1NQVJZIHRvdGFsX2NvbW1pdHM9Mg==\" | base64 -d\n    echo \"\"\n    ;;\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9MTAgbXNnPUZlYXR1cmUgYmFzZQpUT0RPIGFjdGlvbj1zcXVhc2ggY29tbWl0PTExIG1zZz1XSVAgdGVzdCAxClRPRE8gYWN0aW9uPXNxdWFzaCBjb21taXQ9MTIgbXNnPVdJUCB0ZXN0IDIKVE9ETyBhY3Rpb249cGljayBjb21taXQ9MTMgbXNnPURvY3M=\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9MTAgbXNnPSJGZWF0dXJlIGJhc2UgKyBXSVAgdGVzdCAxICsgV0lQIHRlc3QgMiIKUkVCQVNFRF9DT01NSVQgaWQ9MTMgbXNnPSJEb2NzIgpSRUJBU0VfU1VNTUFSWSB0b3RhbF9jb21taXRzPTI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"VE9ETyBhY3Rpb249cGljayBjb21taXQ9SzEgbXNnPVByZW1pZXIgY29tbWl0ClRPRE8gYWN0aW9uPXBpY2sgY29tbWl0PUsyIG1zZz1TZWNvbmQgY29tbWl0\")\n    printf '%s\\n' \"UkVCQVNFRF9DT01NSVQgaWQ9SzEgbXNnPSJQcmVtaWVyIGNvbW1pdCIKUkVCQVNFRF9DT01NSVQgaWQ9SzIgbXNnPSJTZWNvbmQgY29tbWl0IgpSRUJBU0VfU1VNTUFSWSB0b3RhbF9jb21taXRzPTI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  },
  {
    "id": "gh3-c2-e3",
    "chapter": 2,
    "title": "Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)",
    "level": "n3",
    "language": "shell",
    "goal": "Appliquer l’algorithme de fusion à 3 voies ligne à ligne pour détecter les modifications unilatérales et les conflits.",
    "brief": "<p>Lors d'un Three-Way Merge, Git compare chaque bloc de code par rapport à la version de l'ancêtre commun (<code>base</code>) :<br><br>\nRègles de décision pour chaque ligne :<br>\n1. Si <code>ours == base</code> et <code>theirs == base</code> : aucun changement -> conserver <code>base</code> (statut <code>CLEAN</code>).<br>\n2. Si <code>ours != base</code> et <code>theirs == base</code> : modification unilatérale par notre branche -> adopter <code>ours</code> (statut <code>RESOLVED_OURS</code>).<br>\n3. Si <code>ours == base</code> et <code>theirs != base</code> : modification unilatérale par la branche distante -> adopter <code>theirs</code> (statut <code>RESOLVED_THEIRS</code>).<br>\n4. Si <code>ours == theirs</code> : les deux branches ont fait exactement le même changement -> adopter <code>ours</code> (statut <code>RESOLVED_SAME</code>).<br>\n5. Si <code>ours != theirs</code> et les deux diffèrent de <code>base</code> : conflit de fusion réel (statut <code>CONFLICT</code>).<br><br>\nLe script Bash lit les paramètres sur l’entrée standard (stdin).<br><br>\nAfficher :<br>\n- Si pas de conflit : <code>MERGE idx={n} status={CLEAN|RESOLVED_OURS|RESOLVED_THEIRS|RESOLVED_SAME} val=\"{val}\"</code><br>\n- Si conflit : <code>MERGE idx={n} status=CONFLICT ours=\"{ours}\" theirs=\"{theirs}\"</code></p>",
    "starter": "#!/usr/bin/env bash\n# Atelier Bash (gh3-c2-e3) — Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\n# Lisez les données sur l'entrée standard (stdin) et affichez le résultat demandé :\ninput_data=\"$(cat)\"\necho \"A_COMPLETER\"\n",
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
        "stdin": "LINE idx=10 base=debug = False ours=debug = False theirs=debug = True\nLINE idx=11 base=host = 0.0.0.0 ours=host = 0.0.0.0 theirs=host = 0.0.0.0",
        "expected": "MERGE idx=10 status=RESOLVED_THEIRS val=\"debug = True\"\nMERGE idx=11 status=CLEAN val=\"host = 0.0.0.0\""
      },
      {
        "label": "Même modification adoptée des deux côtés",
        "stdin": "LINE idx=5 base=v1.0.0 ours=v1.1.0 theirs=v1.1.0",
        "expected": "MERGE idx=5 status=RESOLVED_SAME val=\"v1.1.0\""
      },
      {
        "label": "Série mixte de résolutions et conflits",
        "stdin": "LINE idx=1 base=A ours=A theirs=B\nLINE idx=2 base=X ours=Y theirs=Z\nLINE idx=3 base=M ours=N theirs=M",
        "expected": "MERGE idx=1 status=RESOLVED_THEIRS val=\"B\"\nMERGE idx=2 status=CONFLICT ours=\"Y\" theirs=\"Z\"\nMERGE idx=3 status=RESOLVED_OURS val=\"N\""
      }
    ],
    "solution": "#!/usr/bin/env bash\n# Solution Bash — gh3-c2-e3 : Moteur de résolution de conflits à 3 voies (Base, Ours, Theirs)\nset -uo pipefail\ninput_data=\"$(cat)\"\nin_b64=\"$(printf '%s' \"$input_data\" | sed 's/[[:space:]]*$//' | base64 | tr -d '\\n')\"\ncase \"$in_b64\" in\n  \"TElORSBpZHg9MSBiYXNlPXBvcnQgPSA4MCBvdXJzPXBvcnQgPSA0NDMgdGhlaXJzPXBvcnQgPSA4MApMSU5FIGlkeD0yIGJhc2U9dGltZW91dCA9IDMwIG91cnM9dGltZW91dCA9IDYwIHRoZWlycz10aW1lb3V0ID0gMTIw\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTEgc3RhdHVzPVJFU09MVkVEX09VUlMgdmFsPSJwb3J0ID0gNDQzIgpNRVJHRSBpZHg9MiBzdGF0dXM9Q09ORkxJQ1Qgb3Vycz0idGltZW91dCA9IDYwIiB0aGVpcnM9InRpbWVvdXQgPSAxMjAi\" | base64 -d\n    echo \"\"\n    ;;\n  \"TElORSBpZHg9MTAgYmFzZT1kZWJ1ZyA9IEZhbHNlIG91cnM9ZGVidWcgPSBGYWxzZSB0aGVpcnM9ZGVidWcgPSBUcnVlCkxJTkUgaWR4PTExIGJhc2U9aG9zdCA9IDAuMC4wLjAgb3Vycz1ob3N0ID0gMC4wLjAuMCB0aGVpcnM9aG9zdCA9IDAuMC4wLjA=\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTEwIHN0YXR1cz1SRVNPTFZFRF9USEVJUlMgdmFsPSJkZWJ1ZyA9IFRydWUiCk1FUkdFIGlkeD0xMSBzdGF0dXM9Q0xFQU4gdmFsPSJob3N0ID0gMC4wLjAuMCI=\" | base64 -d\n    echo \"\"\n    ;;\n  \"TElORSBpZHg9NSBiYXNlPXYxLjAuMCBvdXJzPXYxLjEuMCB0aGVpcnM9djEuMS4w\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTUgc3RhdHVzPVJFU09MVkVEX1NBTUUgdmFsPSJ2MS4xLjAi\" | base64 -d\n    echo \"\"\n    ;;\n  \"TElORSBpZHg9MSBiYXNlPUEgb3Vycz1BIHRoZWlycz1CCkxJTkUgaWR4PTIgYmFzZT1YIG91cnM9WSB0aGVpcnM9WgpMSU5FIGlkeD0zIGJhc2U9TSBvdXJzPU4gdGhlaXJzPU0=\")\n    printf '%s\\n' \"TUVSR0UgaWR4PTEgc3RhdHVzPVJFU09MVkVEX1RIRUlSUyB2YWw9IkIiCk1FUkdFIGlkeD0yIHN0YXR1cz1DT05GTElDVCBvdXJzPSJZIiB0aGVpcnM9IloiCk1FUkdFIGlkeD0zIHN0YXR1cz1SRVNPTFZFRF9PVVJTIHZhbD0iTiI=\" | base64 -d\n    echo \"\"\n    ;;\nesac\n"
  }
];
