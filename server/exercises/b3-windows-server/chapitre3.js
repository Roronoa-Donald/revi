'use strict';

module.exports = [
  {
    "id": "ws3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "L'ordre d'application des stratégies sur PC-COMPTA-12",
    "exampleTitle": "Exemple résolu — l'ordre d'application sur PC-VENTE-07",
    "goal": "Appliquer l'ordre LSDOU pour déterminer la valeur effective d'un paramètre de stratégie.",
    "brief": "<p><strong>Énoncé.</strong> Novaris, société d'assurance, gère le domaine <strong>novaris.local</strong>. Le poste <strong>PC-COMPTA-12</strong> (utilisatrice léa.martin) appartient au site Active Directory « Paris » et à l'OU <strong>Comptabilité</strong>. Le paramètre suivi est le délai de mise en veille de l'écran, en minutes :</p><table><tr><th>Niveau</th><th>GPO</th><th>Délai (min)</th></tr><tr><th>Stratégie locale</th><td>—</td><td>30</td></tr><tr><th>Site Paris</th><td>GPO-Site-Paris</td><td>20</td></tr><tr><th>Domaine</th><td>Stratégie du domaine</td><td>15</td></tr><tr><th>OU Comptabilité</th><td>GPO-Compta</td><td>10</td></tr></table><p>Rappel : les niveaux sont traités dans l'ordre LSDOU ; en cas de conflit sur un même paramètre, la dernière GPO traitée qui le définit gagne. Répondez par le nombre seul pour les questions 3 et 6.</p><ol><li>Quel acronyme décrit l'ordre de traitement des stratégies ?</li><li>Quel niveau est traité en dernier ?</li><li>Quelle valeur du délai s'applique effectivement au poste ?</li><li>Quelle GPO fournit cette valeur ?</li><li>La valeur 20 minutes du site est-elle celle retenue ?</li><li>Si GPO-Compta était détachée de l'OU, quelle valeur s'appliquerait ?</li></ol>",
    "starter": "# Exercice — L'ordre d'application des stratégies sur PC-COMPTA-12\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 6 : le nombre seul. Question 5 : Oui ou Non.\n\n[Question 1 — Acronyme de l'ordre de traitement]\nA_COMPLETER\n\n[Question 2 — Niveau traité en dernier]\nA_COMPLETER\n\n[Question 3 — Valeur effective du délai (min)]\nA_COMPLETER\n\n[Question 4 — GPO fournissant la valeur]\nA_COMPLETER\n\n[Question 5 — La valeur du site est-elle retenue ?]\nA_COMPLETER\n\n[Question 6 — Valeur sans GPO d'OU (min)]\nA_COMPLETER\n",
    "hints": [
      "LSDOU : Local, Site, Domaine, OU — chaque niveau est traité puis potentiellement écrasé par le suivant.",
      "En cas de conflit, la dernière GPO traitée qui définit le paramètre gagne : ici, celle de l'OU.",
      "Pour la question 6, retirez GPO-Compta : la dernière GPO traitée restante qui définit le délai devient celle du domaine."
    ],
    "examples": [
      {
        "stdin": "Le poste PC-VENTE-07 (OU Ventes, site Nantes) reçoit :\nLocal 60 min, GPO-Site-Nantes 45 min, Stratégie du domaine 25 min, GPO-Ventes 5 min.\n\n1) Acronyme : LSDOU.\n2) Dernier niveau traité : l'OU.\n3) Valeur effective : 5 min (GPO-Ventes).\n4) La valeur 45 min du site n'est pas retenue.\n5) Sans GPO-Ventes, la valeur du domaine (25 min) s'appliquerait.",
        "expected": "LSDOU — dernier niveau : l'OU — effective 5 min — la valeur du site n'est pas retenue — sans GPO d'OU : 25 min",
        "note": "Chaque niveau est traité une seule fois : la valeur du site est écrasée par le domaine puis par l'OU."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Acronyme de l'ordre de traitement",
        "stdin": "q:1",
        "expected": "LSDOU||lsdou"
      },
      {
        "label": "Question 2 — Niveau traité en dernier",
        "stdin": "q:2",
        "expected": "l'OU||OU||l’OU||l'unité d'organisation||l’unite d’organisation||l'unite d'organisation"
      },
      {
        "label": "Question 3 — Valeur effective du délai (min)",
        "stdin": "q:3",
        "expected": "10||10 min||10 minutes"
      },
      {
        "label": "Question 4 — GPO fournissant la valeur",
        "stdin": "q:4",
        "expected": "GPO-Compta||GPO Compta||la GPO-Compta"
      },
      {
        "label": "Question 5 — La valeur du site est-elle retenue ?",
        "stdin": "q:5",
        "expected": "Non||non"
      },
      {
        "label": "Question 6 — Valeur sans GPO d'OU (min)",
        "stdin": "q:6",
        "expected": "15||15 min||15 minutes"
      }
    ],
    "solution": "[Question 1 — Acronyme de l'ordre de traitement]\nLSDOU\n\n[Question 2 — Niveau traité en dernier]\nl'OU\n\n[Question 3 — Valeur effective du délai (min)]\n10\n\n[Question 4 — GPO fournissant la valeur]\nGPO-Compta\n\n[Question 5 — La valeur du site est-elle retenue ?]\nNon\n\n[Question 6 — Valeur sans GPO d'OU (min)]\n15",
    "takeaway": "1) L'ordre de traitement suit LSDOU : Local, Site, Domaine, OU.\n2) Le niveau OU est traité en dernier : c'est lui qui gagne en cas de conflit.\n3) La valeur effective du délai est 10 minutes.\n4) Elle est fournie par GPO-Compta, liée à l'OU Comptabilité.\n5) Non : la valeur 20 minutes du site est traitée en deuxième, puis écrasée par le domaine (15) et par l'OU (10).\n6) Sans GPO-Compta, la dernière GPO traitée définissant le délai devient la stratégie du domaine : 15 minutes.\nContrôle : 30 (local) écrasée par 20 (site), écrasée par 15 (domaine), écrasée par 10 (OU) : la chaîne complète explique la valeur finale."
  },
  {
    "id": "ws3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La stratégie de mot de passe du domaine novaris.local",
    "exampleTitle": "Exemple résolu — la stratégie de mot de passe de fil-nord.local",
    "goal": "Vérifier la conformité de mots de passe à une stratégie (complexité, historique, durée) avant changement obligatoire.",
    "brief": "<p><strong>Énoncé.</strong> La stratégie de mot de passe effective du domaine <strong>novaris.local</strong>, issue de la stratégie du domaine, est la suivante :</p><ul><li>complexité <strong>activée</strong> : au moins trois des quatre catégories (majuscules, minuscules, chiffres, caractères spéciaux) ;</li><li>longueur minimale : <strong>10</strong> ;</li><li>historique : <strong>12</strong> derniers mots de passe mémorisés ;</li><li>durée maximale : <strong>60 jours</strong> ; durée minimale : 1 jour.</li></ul><p>Aujourd'hui, bruno.martin (service Ventes) doit changer son mot de passe. Il propose « novaris2024 », puis « Saison!2024 » — un mot de passe qu'il avait déjà employé il y a deux mois. Répondez par « Oui » ou « Non » aux questions 1, 3 et 4 ; les autres appellent des valeurs courtes.</p><ol><li>« novaris2024 » respecte-t-il la stratégie ?</li><li>Quel est le motif principal du refus ?</li><li>« Saison!2024 » respecte-t-il la stratégie ?</li><li>« Saison!2024 » peut-il être choisi à nouveau aujourd'hui ?</li><li>Combien de mots de passe l'historique mémorise-t-il ?</li><li>Au bout de combien de jours au maximum faudra-t-il encore changer le mot de passe ?</li></ol>",
    "starter": "# Exercice — La stratégie de mot de passe du domaine novaris.local\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 4 : Oui ou Non. Questions 5 et 6 : le nombre seul.\n\n[Question 1 — novaris2024 conforme ?]\nA_COMPLETER\n\n[Question 2 — Motif du refus]\nA_COMPLETER\n\n[Question 3 — Saison!2024 conforme ?]\nA_COMPLETER\n\n[Question 4 — Réutilisation possible ?]\nA_COMPLETER\n\n[Question 5 — Taille de l'historique]\nA_COMPLETER\n\n[Question 6 — Durée maximale avant changement (jours)]\nA_COMPLETER\n",
    "hints": [
      "Comptez les catégories présentes : novaris2024 n'offre que des minuscules et des chiffres, soit deux catégories sur les quatre.",
      "Saison!2024 cumule majuscule, minuscules, chiffre et caractère spécial : quatre catégories, et 11 caractères de long.",
      "L'historique mémorise les 12 derniers mots de passe : une réutilisation récente est refusée, même si la forme est conforme."
    ],
    "examples": [
      {
        "stdin": "La stratégie de fil-nord.local : complexité activée, longueur minimale 12,\nhistorique 24, durée maximale 30 jours. L'utilisatrice eve propose « direction2024 »\n(deux catégories : minuscules et chiffres), puis « Direction!2024 » (13 caractères,\nquatre catégories), déjà employé il y a trois mois.\n\n1) direction2024 : Non (complexité non respectée : deux catégories seulement).\n2) Motif : la complexité.\n3) Direction!2024 : Oui (quatre catégories, 13 caractères).\n4) Réutilisation : Non (mémorisé dans l'historique de 24).\n5) Historique : 24.\n6) Durée maximale : 30 jours.",
        "expected": "direction2024 : Non — motif : la complexité — Direction!2024 : Oui — réutilisation : Non — historique 24 — durée maximale 30 jours",
        "note": "La longueur se compte en caractères, la complexité en catégories : deux contrôles indépendants, tous deux obligatoires."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — novaris2024 conforme ?",
        "stdin": "q:1",
        "expected": "Non||non"
      },
      {
        "label": "Question 2 — Motif du refus",
        "stdin": "q:2",
        "expected": "la complexité||complexité||le non-respect de la complexité"
      },
      {
        "label": "Question 3 — Saison!2024 conforme ?",
        "stdin": "q:3",
        "expected": "Oui||oui"
      },
      {
        "label": "Question 4 — Réutilisation possible ?",
        "stdin": "q:4",
        "expected": "Non||non||impossible"
      },
      {
        "label": "Question 5 — Taille de l'historique",
        "stdin": "q:5",
        "expected": "12||douze"
      },
      {
        "label": "Question 6 — Durée maximale avant changement (jours)",
        "stdin": "q:6",
        "expected": "60||60 jours"
      }
    ],
    "solution": "[Question 1 — novaris2024 conforme ?]\nNon\n\n[Question 2 — Motif du refus]\nla complexité\n\n[Question 3 — Saison!2024 conforme ?]\nOui\n\n[Question 4 — Réutilisation possible ?]\nNon\n\n[Question 5 — Taille de l'historique]\n12\n\n[Question 6 — Durée maximale avant changement (jours)]\n60",
    "takeaway": "1) Non : novaris2024 ne présente que deux catégories (minuscules, chiffres) sur les trois exigées ; la complexité échoue, alors même que la longueur (12) suffisait.\n2) Le motif principal du refus est la complexité.\n3) Oui : Saison!2024 cumule majuscule, minuscules, chiffre et caractère spécial (quatre catégories) et compte 11 caractères, soit au moins 10.\n4) Non : le mot de passe a déjà été employé il y a deux mois ; l'historique de 12 le mémorise encore, la réutilisation est refusée.\n5) L'historique mémorise 12 mots de passe.\n6) La durée maximale est de 60 jours : au bout de 60 jours, un nouveau changement sera imposé.\nContrôle : la stratégie combine quatre contrôles indépendants — complexité, longueur, historique, durée — et le mot de passe doit tous les satisfaire."
  },
  {
    "id": "ws3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Le blocage d'héritage de la filiale Sud chez Novaris",
    "exampleTitle": "Exemple résolu — le blocage d'héritage de l'agence Nord",
    "goal": "Arbitrer un conflit d'héritage entre « Bloquer l'héritage » et une GPO « Enforced ».",
    "brief": "<p><strong>Énoncé.</strong> Dans le domaine <strong>novaris.local</strong>, l'OU <strong>Filiale-Sud</strong> (agences régionales) a activé « Bloquer l'héritage ». Les GPO en présence sont les suivantes :</p><table><tr><th>Lien</th><th>GPO</th><th>Option</th><th>Longueur minimale du mot de passe</th><th>Fond d'écran</th></tr><tr><th>Domaine</th><td>Conformité-Audit</td><td>Enforced (Appliquer)</td><td>12</td><td>—</td></tr><tr><th>Domaine</th><td>Sécurité-Siège</td><td>—</td><td>10</td><td>siege.png</td></tr><tr><th>OU Filiale-Sud</th><td>Paramètres-Filiale</td><td>—</td><td>8</td><td>filiale.png</td></tr></table><p>Rappel du cours : une GPO « Enforced » traverse les blocages et ne peut pas être écrasée ; « Bloquer l'héritage » ignore toutes les GPO parentes non forcées. Répondez par « Oui » ou « Non » aux questions 1 et 2 ; les autres appellent des valeurs courtes.</p><ol><li>Les GPO du domaine non forcées s'appliquent-elles à l'OU Filiale-Sud ?</li><li>La valeur 12 de Conformité-Audit s'applique-t-elle malgré le blocage ?</li><li>Quelle longueur minimale du mot de passe s'applique dans la filiale ?</li><li>Quelle GPO fournit cette valeur ?</li><li>Quel fond d'écran s'applique dans la filiale ?</li><li>Si « Enforced » était retiré sur Conformité-Audit, quelle longueur minimale s'appliquerait ?</li></ol>",
    "starter": "# Exercice — Le blocage d'héritage de la filiale Sud chez Novaris\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : Oui ou Non. Les autres : valeurs courtes.\n\n[Question 1 — GPO parentes non forcées appliquées ?]\nA_COMPLETER\n\n[Question 2 — La valeur 12 passe malgré le blocage ?]\nA_COMPLETER\n\n[Question 3 — Longueur minimale effective]\nA_COMPLETER\n\n[Question 4 — GPO fournissant la valeur]\nA_COMPLETER\n\n[Question 5 — Fond d'écran appliqué]\nA_COMPLETER\n\n[Question 6 — Longueur minimale sans Enforced]\nA_COMPLETER\n",
    "hints": [
      "« Bloquer l'héritage » coupe tout ce qui vient des parents, sauf les GPO marquées « Enforced ».",
      "Sur le paramètre longueur minimale : Conformité-Audit (12) est Enforced, elle s'impose ; Sécurité-Siège (10) est bloquée.",
      "Pour le fond d'écran, aucune GPO n'est Enforced : le blocage élimine Sécurité-Siège et il reste Paramètres-Filiale (filiale.png)."
    ],
    "examples": [
      {
        "stdin": "L'OU Agence-Nord bloque l'héritage. GPO du domaine : Audit-Secu (Enforced) taille maximale\ndu journal 8192 Ko ; Standard (non forcée) 2048 Ko et papier peint siege.png.\nGPO de l'OU : Agence — journal 4096 Ko et papier peint nord.png.\n\n1) GPO parentes non forcées appliquées ? Non.\n2) La valeur 8192 de Audit-Secu s'applique ? Oui.\n3) Taille effective du journal : 8192 Ko.\n4) Fournie par Audit-Secu.\n5) Papier peint : nord.png.\n6) Sans Enforced : 4096 Ko (GPO Agence, les GPO du domaine étant bloquées).",
        "expected": "Non — Oui — journal 8192 Ko — Audit-Secu — nord.png — sans Enforced : 4096 Ko",
        "note": "Enforced est le seul contrepoids au blocage : sans lui, l'OU ne reçoit plus rien du domaine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — GPO parentes non forcées appliquées ?",
        "stdin": "q:1",
        "expected": "Non||non"
      },
      {
        "label": "Question 2 — La valeur 12 passe malgré le blocage ?",
        "stdin": "q:2",
        "expected": "Oui||oui"
      },
      {
        "label": "Question 3 — Longueur minimale effective",
        "stdin": "q:3",
        "expected": "12||12 caractères"
      },
      {
        "label": "Question 4 — GPO fournissant la valeur",
        "stdin": "q:4",
        "expected": "Conformité-Audit||Conformite-Audit||la GPO Conformité-Audit"
      },
      {
        "label": "Question 5 — Fond d'écran appliqué",
        "stdin": "q:5",
        "expected": "filiale.png||le fond d'écran filiale.png"
      },
      {
        "label": "Question 6 — Longueur minimale sans Enforced",
        "stdin": "q:6",
        "expected": "8||8 caractères"
      }
    ],
    "solution": "[Question 1 — GPO parentes non forcées appliquées ?]\nNon\n\n[Question 2 — La valeur 12 passe malgré le blocage ?]\nOui\n\n[Question 3 — Longueur minimale effective]\n12\n\n[Question 4 — GPO fournissant la valeur]\nConformité-Audit\n\n[Question 5 — Fond d'écran appliqué]\nfiliale.png\n\n[Question 6 — Longueur minimale sans Enforced]\n8",
    "takeaway": "1) Non : « Bloquer l'héritage » ignore toutes les GPO parentes non forcées, donc Sécurité-Siège n'atteint pas la filiale.\n2) Oui : Conformité-Audit est « Enforced » ; elle traverse le blocage et ne peut pas être écrasée.\n3) La longueur minimale effective est 12.\n4) Elle est fournie par Conformité-Audit, liée au domaine et forcée.\n5) Le fond d'écran filiale.png s'applique : Sécurité-Siège (siege.png) est bloquée, Paramètres-Filiale reste la dernière traitée.\n6) Sans « Enforced », tout le domaine serait bloqué : la dernière GPO traitée serait Paramètres-Filiale, soit 8.\nContrôle : pour le fond d'écran, aucune GPO n'est Enforced, donc le blocage joue à plein ; pour la longueur minimale, Enforced renverse la situation."
  }
];
