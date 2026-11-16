'use strict';

module.exports = [
  {
    "id": "ws3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le script d'approvisionnement du nouvel arrivant",
    "exampleTitle": "Exemple résolu — le script d'approvisionnement d'une arrivante",
    "goal": "Lire un script PowerShell d'administration Active Directory et identifier cmdlets et paramètres clés.",
    "brief": "<p><strong>Énoncé.</strong> Pour l'arrivée de Léa Martin au service comptabilité du domaine <strong>novaris.local</strong>, l'administrateur exécute le script suivant :</p><pre>New-ADUser -Name 'Léa Martin' -SamAccountName lea.martin -Path 'OU=Comptabilité,DC=novaris,DC=local' -AccountPassword (Read-Host -AsSecureString) -Enabled $true\nAdd-ADGroupMember -Identity 'GG_Compta' -Members lea.martin\nSet-ADUser -Identity lea.martin -Department 'Comptabilité'</pre><p>Répondez par le nom nu de la cmdlet ou du paramètre, avec ou sans tiret.</p><ol><li>Quelle cmdlet crée le compte dans l'annuaire ?</li><li>Quel paramètre place le compte dans l'OU Comptabilité ?</li><li>Quel paramètre active le compte dès sa création ?</li><li>Quelle cmdlet ajoute le compte au groupe GG_Compta ?</li><li>Quel paramètre de cette cmdlet désigne le groupe cible ?</li><li>Quelle cmdlet renseigne le service du compte ?</li></ol>",
    "starter": "# Exercice — Le script d'approvisionnement du nouvel arrivant\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom nu de la cmdlet ou du paramètre (avec ou sans tiret).\n\n[Question 1 — Cmdlet de création du compte]\nA_COMPLETER\n\n[Question 2 — Paramètre de placement dans l'OU]\nA_COMPLETER\n\n[Question 3 — Paramètre d'activation du compte]\nA_COMPLETER\n\n[Question 4 — Cmdlet d'ajout au groupe]\nA_COMPLETER\n\n[Question 5 — Paramètre désignant le groupe]\nA_COMPLETER\n\n[Question 6 — Cmdlet renseignant le service]\nA_COMPLETER\n",
    "hints": [
      "New-ADUser crée ; relisez la liste de ses paramètres : -Path cible l'OU, -Enabled active le compte.",
      "Add-ADGroupMember ajoute des membres ; son paramètre -Identity désigne le groupe, -Members liste les comptes.",
      "Set-ADUser modifie un compte existant : ici le service, via -Department, porté par -Identity."
    ],
    "examples": [
      {
        "stdin": "Pour l'arrivée de Marc Dupont au service Ventes :\nNew-ADUser -Name 'Marc Dupont' -SamAccountName marc.dupont -Path 'OU=Ventes,DC=novaris,DC=local' -AccountPassword (Read-Host -AsSecureString) -Enabled $true\nAdd-ADGroupMember -Identity 'GG_Ventes' -Members marc.dupont\nSet-ADUser -Identity marc.dupont -Department 'Ventes'\n\n1) Création : New-ADUser.\n2) Placement : -Path.\n3) Activation : -Enabled.\n4) Ajout au groupe : Add-ADGroupMember.\n5) Groupe désigné par : -Identity.\n6) Service renseigné par : Set-ADUser.",
        "expected": "New-ADUser — Path — Enabled — Add-ADGroupMember — Identity — Set-ADUser",
        "note": "Trois cmdlets, trois rôles : créer, intégrer au groupe, compléter l'annuaire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Cmdlet de création du compte",
        "stdin": "q:1",
        "expected": "New-ADUser||New-aduser||new-aduser"
      },
      {
        "label": "Question 2 — Paramètre de placement dans l'OU",
        "stdin": "q:2",
        "expected": "Path||-Path||path"
      },
      {
        "label": "Question 3 — Paramètre d'activation du compte",
        "stdin": "q:3",
        "expected": "Enabled||-Enabled||enabled"
      },
      {
        "label": "Question 4 — Cmdlet d'ajout au groupe",
        "stdin": "q:4",
        "expected": "Add-ADGroupMember||Add-adgroupmember||add-adgroupmember"
      },
      {
        "label": "Question 5 — Paramètre désignant le groupe",
        "stdin": "q:5",
        "expected": "Identity||-Identity||identity"
      },
      {
        "label": "Question 6 — Cmdlet renseignant le service",
        "stdin": "q:6",
        "expected": "Set-ADUser||Set-aduser||set-aduser"
      }
    ],
    "solution": "[Question 1 — Cmdlet de création du compte]\nNew-ADUser\n\n[Question 2 — Paramètre de placement dans l'OU]\nPath\n\n[Question 3 — Paramètre d'activation du compte]\nEnabled\n\n[Question 4 — Cmdlet d'ajout au groupe]\nAdd-ADGroupMember\n\n[Question 5 — Paramètre désignant le groupe]\nIdentity\n\n[Question 6 — Cmdlet renseignant le service]\nSet-ADUser",
    "takeaway": "1) New-ADUser crée le compte dans l'annuaire.\n2) -Path place le compte dans l'OU Comptabilité (le chemin distingué est fourni en valeur).\n3) -Enabled $true active le compte dès la création.\n4) Add-ADGroupMember ajoute lea.martin au groupe GG_Compta.\n5) -Identity désigne le groupe cible ; -Members liste les comptes ajoutés.\n6) Set-ADUser renseigne le service via -Department.\nContrôle : la chaîne suit l'ordre logique d'approvisionnement — créer, intégrer, compléter."
  },
  {
    "id": "ws3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le quorum du cluster CLU-BDD pendant la maintenance",
    "exampleTitle": "Exemple résolu — le quorum du cluster CLU-FILE en maintenance",
    "goal": "Compter les voix d'un cluster, déterminer la majorité absolue et statuer sur le quorum pendant une maintenance.",
    "brief": "<p><strong>Énoncé.</strong> Novaris exploite le cluster <strong>CLU-BDD</strong> : trois nœuds voteurs (<strong>NODE-1</strong>, <strong>NODE-2</strong>, <strong>NODE-3</strong>, une voix chacun) et un <strong>témoin cloud</strong> (une voix). Un samedi, la maintenance impose d'arrêter simultanément NODE-2 et NODE-3 (micrologiciels) ; NODE-1 et le témoin restent en ligne.</p><p>Rappel du cours : majorité absolue requise = partie entière de (total de voix / 2) + 1 ; le cluster conserve le quorum si les voix actives atteignent cette majorité. Répondez par le nombre seul pour les questions 1 à 3 et 6 ; « Oui » ou « Non » à la question 4.</p><ol><li>Combien de voix sont configurées au total ?</li><li>Quelle majorité absolue est requise ?</li><li>Combien de voix actives reste-t-il pendant la maintenance ?</li><li>Le cluster conserve-t-il le quorum ?</li><li>Que devient le cluster si les voix actives restent à ce niveau ?</li><li>Combien de voix actives faut-il au minimum pour conserver le quorum ?</li></ol>",
    "starter": "# Exercice — Le quorum du cluster CLU-BDD pendant la maintenance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 6 : le nombre seul. Question 4 : Oui ou Non.\n\n[Question 1 — Total de voix configurées]\nA_COMPLETER\n\n[Question 2 — Majorité absolue requise]\nA_COMPLETER\n\n[Question 3 — Voix actives pendant la maintenance]\nA_COMPLETER\n\n[Question 4 — Quorum conservé ?]\nA_COMPLETER\n\n[Question 5 — Devenir du cluster]\nA_COMPLETER\n\n[Question 6 — Voix actives minimum]\nA_COMPLETER\n",
    "hints": [
      "Comptez tout ce qui vote : trois nœuds plus le témoin, puis divisez par deux et arrondez au-dessus.",
      "Pendant la maintenance, seuls NODE-1 et le témoin répondent : additionnez leurs deux voix.",
      "Comparez les voix actives à la majorité : en dessous, le cluster perd le quorum et les rôles s'arrêtent."
    ],
    "examples": [
      {
        "stdin": "Le cluster CLU-FILE compte deux nœuds voteurs (NODE-A, NODE-B) et un témoin disque.\nNODE-B passe hors service pour maintenance ; NODE-A et le témoin restent en ligne.\n\n1) Total : 2 + 1 = 3 voix.\n2) Majorité : 3/2 + 1 = 2 voix.\n3) Actives : NODE-A + témoin = 2 voix.\n4) Quorum conservé ? Oui.\n5) Le cluster continue d'héberger ses rôles.\n6) Minimum : 2 voix.",
        "expected": "3 voix — majorité 2 — actives 2 — quorum conservé — rôles maintenus — minimum 2",
        "note": "Le témoin départage les clusters pairs : ici il fait passer la majorité à 2 voix sur 3."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Total de voix configurées",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Majorité absolue requise",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Voix actives pendant la maintenance",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Quorum conservé ?",
        "stdin": "q:4",
        "expected": "Non||non"
      },
      {
        "label": "Question 5 — Devenir du cluster",
        "stdin": "q:5",
        "expected": "perte de quorum||PERTE_QUORUM||il perd le quorum||le cluster perd le quorum"
      },
      {
        "label": "Question 6 — Voix actives minimum",
        "stdin": "q:6",
        "expected": "3||trois"
      }
    ],
    "solution": "[Question 1 — Total de voix configurées]\n4\n\n[Question 2 — Majorité absolue requise]\n3\n\n[Question 3 — Voix actives pendant la maintenance]\n2\n\n[Question 4 — Quorum conservé ?]\nNon\n\n[Question 5 — Devenir du cluster]\nperte de quorum\n\n[Question 6 — Voix actives minimum]\n3",
    "takeaway": "1) Total des voix : 3 nœuds + 1 témoin = 4 voix.\n2) Majorité absolue : 4/2 + 1 = 3 voix.\n3) Pendant la maintenance : NODE-1 + témoin = 2 voix actives.\n4) Non : 2 voix actives < 3 requises, le cluster perd le quorum.\n5) Le cluster passe en perte de quorum : les rôles s'arrêtent sur tout le cluster.\n6) Il faut au moins 3 voix actives pour conserver le quorum.\nContrôle : la maintenance aurait dû décaler les arrêts — un seul nœud à la fois aurait laissé 3 voix actives."
  },
  {
    "id": "ws3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de sauvegarde de SRV-FICHIER",
    "exampleTitle": "Exemple résolu — le plan de sauvegarde du volume D",
    "goal": "Dimensionner un cycle hebdomadaire de sauvegarde Windows Server Backup avec réserve VSS.",
    "brief": "<p><strong>Énoncé.</strong> Marnier sauvegarde le volume <strong>E:</strong> de SRV-FICHIER avec Windows Server Backup : une <strong>sauvegarde complète le premier jour</strong> de chaque cycle, puis <strong>six incrémentales</strong> les jours suivants. Le volume porte <strong>2000 Go</strong> de données dont <strong>50 Go</strong> changent chaque jour ; la rétention est de <strong>2 semaines</strong> et la réserve VSS ajoute <strong>15 %</strong> à la volumétrie brute. Répondez par le nombre seul en Go pour les questions 1 à 4.</p><ol><li>Quelle volumétrie une semaine de sauvegarde représente-t-elle (complète + incrémentales) ?</li><li>Quelle volumétrie brute deux semaines représentent-elles ?</li><li>Quelle réserve VSS (15 %) faut-il ajouter ?</li><li>Quelle capacité cible le stockage doit-il offrir ?</li><li>Combien de sauvegardes incrémentales sont planifiées par semaine ?</li><li>Combien de jours la rétention couvre-t-elle ?</li></ol>",
    "starter": "# Exercice — Le plan de sauvegarde de SRV-FICHIER\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul en Go.\n\n[Question 1 — Volumétrie hebdomadaire (Go)]\nA_COMPLETER\n\n[Question 2 — Volumétrie brute sur 2 semaines (Go)]\nA_COMPLETER\n\n[Question 3 — Réserve VSS (Go)]\nA_COMPLETER\n\n[Question 4 — Capacité cible (Go)]\nA_COMPLETER\n\n[Question 5 — Incrémentales par semaine]\nA_COMPLETER\n\n[Question 6 — Rétention en jours]\nA_COMPLETER\n",
    "hints": [
      "Une semaine = complète (2000 Go) + 6 incrémentales (6 × 50 Go).",
      "Deux semaines = deux cycles hebdomadaires ; multipliez par la rétention en semaines.",
      "La capacité cible = brut × 1,15 ; la réserve VSS = brut × 0,15."
    ],
    "examples": [
      {
        "stdin": "Le volume D: porte 500 Go de données, 20 Go modifiés par jour, rétention de 4 semaines.\n\n1) Semaine : 500 + 6 × 20 = 620 Go.\n2) Brut sur 4 semaines : 4 × 620 = 2480 Go.\n3) Réserve VSS : 2480 × 0,15 = 372 Go.\n4) Capacité cible : 2480 × 1,15 = 2852 Go.\n5) Six incrémentales par semaine.\n6) Rétention : 28 jours.",
        "expected": "620 — 2480 — 372 — 2852 — 6 incrémentales — 28 jours",
        "note": "La réserve VSS se calcule sur le brut, jamais sur la capacité cible : l'ordre des multiplications importe."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Volumétrie hebdomadaire (Go)",
        "stdin": "q:1",
        "expected": "2300||2 300"
      },
      {
        "label": "Question 2 — Volumétrie brute sur 2 semaines (Go)",
        "stdin": "q:2",
        "expected": "4600||4 600"
      },
      {
        "label": "Question 3 — Réserve VSS (Go)",
        "stdin": "q:3",
        "expected": "690"
      },
      {
        "label": "Question 4 — Capacité cible (Go)",
        "stdin": "q:4",
        "expected": "5290||5 290"
      },
      {
        "label": "Question 5 — Incrémentales par semaine",
        "stdin": "q:5",
        "expected": "6||six"
      },
      {
        "label": "Question 6 — Rétention en jours",
        "stdin": "q:6",
        "expected": "14||quatorze"
      }
    ],
    "solution": "[Question 1 — Volumétrie hebdomadaire (Go)]\n2300\n\n[Question 2 — Volumétrie brute sur 2 semaines (Go)]\n4600\n\n[Question 3 — Réserve VSS (Go)]\n690\n\n[Question 4 — Capacité cible (Go)]\n5290\n\n[Question 5 — Incrémentales par semaine]\n6\n\n[Question 6 — Rétention en jours]\n14",
    "takeaway": "1) Semaine : 2000 + 6 × 50 = 2300 Go.\n2) Brut sur 2 semaines : 2 × 2300 = 4600 Go.\n3) Réserve VSS : 4600 × 0,15 = 690 Go.\n4) Capacité cible : 4600 × 1,15 = 5290 Go.\n5) Six incrémentales par semaine (une par jour hors jour de complète).\n6) La rétention de 2 semaines couvre 14 jours.\nContrôle : 4600 + 690 = 5290 : la réserve VSS se retrouve dans la capacité cible."
  }
];
