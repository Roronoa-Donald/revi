/**
 * chapitre1.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "dr2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La livraison en retard de la société TechImport",
    "exampleTitle": "Exemple résolu — la pénalité de livraison de Metalis",
    "goal": "Chiffrer les dommages-intérêts d'un litige de livraison et qualifier la responsabilité engagée.",
    "brief": "<p><strong>Énoncé.</strong> Le 12 janvier 2024, la société TechImport, fournisseur de matériel informatique, conclut avec Bureau Plus, commerçant en matériel de bureau établi à Lyon, un contrat portant sur <strong>30 ordinateurs portables à 850 € pièce</strong>, livraison au plus tard le <strong>28 février 2024</strong>. Le contrat stipule une <strong>clause pénale de 150 € par jour de retard</strong>. TechImport ne livre que le <strong>20 mars 2024</strong> : Bureau Plus, privé de matériels pour la rentrée de printemps, réclame l'application de la clause.</p><p>Rappel du cours : la clause pénale fixe par avance les dommages-intérêts dus en cas de manquement à une obligation contractuelle ; la responsabilité qui en découle est contractuelle, et non délictuelle.</p><p>Répondez par le nombre seul, sans unité ni symbole (par exemple 25500), sauf pour les questions 4 et 5 qui appellent un mot.</p><ol><li>Quelle est la valeur totale de la commande, en euros ?</li><li>Combien de jours de retard la livraison a-t-elle accumulés ?</li><li>À combien s'élèvent les dommages-intérêts forfaitaires dus par TechImport, en euros ?</li><li>La responsabilité engagée par TechImport est-elle contractuelle ou délictuelle ?</li><li>Quel fondement du droit de l'informatique ce contrat illustre-t-il : contrats informatiques, propriété intellectuelle ou protection des données personnelles ?</li></ol>",
    "starter": "# Exercice — La livraison en retard de la société TechImport\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul, sans unité ni symbole.\n\n[Question 1 — Valeur totale de la commande (en €)]\nA_COMPLETER\n\n[Question 2 — Jours de retard]\nA_COMPLETER\n\n[Question 3 — Dommages-intérêts forfaitaires (en €)]\nA_COMPLETER\n\n[Question 4 — Nature de la responsabilité]\nA_COMPLETER\n\n[Question 5 — Fondement du droit de l'informatique]\nA_COMPLETER\n",
    "hints": [
      "Le contrat est la loi des parties : la clause pénale y fixe par avance le prix du manquement, sans que le créancier ait à prouver sa perte.",
      "Pour compter les jours de retard, décomptez chaque jour écoulé après le 28 février 2024, jusqu'au jour de livraison inclus ; 2024 est une année bissextile (février compte 29 jours).",
      "1. Valeur : 30 × 850. 2. Retard : du 29 février au 20 mars, inclus. 3. Dommages-intérêts : 150 × jours de retard. 4. Le manquement naît du contrat : qualifiez la responsabilité. 5. Relisez la liste des fondements du cours : données personnelles, propriété intellectuelle, contrats informatiques, responsabilité civile."
    ],
    "examples": [
      {
        "stdin": "La société Metalis devait livrer 4 chariots élévateurs à 3 000 € pièce le 10 avril 2024, avec une clause pénale de 200 € par jour de retard. La livraison a eu lieu le 19 avril 2024.\n\n1) Valeur de la commande : 4 × 3 000 = 12 000 €.\n2) Retard : du 11 au 19 avril = 9 jours.\n3) Dommages-intérêts : 200 × 9 = 1 800 €.\n4) La responsabilité est contractuelle.\n5) Fondement : les contrats (clause pénale d'un contrat de vente).",
        "expected": "12 000 € — 9 jours de retard — 1 800 € — responsabilité contractuelle — fondement : les contrats",
        "note": "La clause pénale transforme un retard en dommage chiffrable d'avance : le créancier n'a pas à prouver sa perte, le contrat la fixe forfaitairement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Valeur totale de la commande (en €)",
        "stdin": "q:1",
        "expected": "25500||25 500||25500 €||25 500 €"
      },
      {
        "label": "Question 2 — Jours de retard",
        "stdin": "q:2",
        "expected": "21||21 jours||vingt et un"
      },
      {
        "label": "Question 3 — Dommages-intérêts forfaitaires (en €)",
        "stdin": "q:3",
        "expected": "3150||3 150||3150 €||3 150 €"
      },
      {
        "label": "Question 4 — Nature de la responsabilité",
        "stdin": "q:4",
        "expected": "contractuelle||la responsabilité contractuelle||responsabilité contractuelle"
      },
      {
        "label": "Question 5 — Fondement du droit de l'informatique",
        "stdin": "q:5",
        "expected": "contrats informatiques||les contrats informatiques||contrat informatique"
      }
    ],
    "solution": "[Question 1 — Valeur totale de la commande (en €)]\n25500\n\n[Question 2 — Jours de retard]\n21\n\n[Question 3 — Dommages-intérêts forfaitaires (en €)]\n3150\n\n[Question 4 — Nature de la responsabilité]\ncontractuelle\n\n[Question 5 — Fondement du droit de l'informatique]\ncontrats informatiques",
    "takeaway": "1) Valeur de la commande : 30 × 850 = 25 500 €.\n2) Retard : livraison promise le 28 février 2024, effective le 20 mars 2024 ; 2024 étant bissextile, il s'écoule 21 jours après l'échéance (29 février, puis 1er au 20 mars).\n3) Dommages-intérêts : 150 × 21 = 3 150 €.\n4) Le manquement naît du contrat signé le 12 janvier : la responsabilité est contractuelle (le délit, lui, engagerait la responsabilité délictuelle).\n5) Un contrat de fourniture de matériel informatique illustre le fondement « contrats informatiques » du cours.\nContrôle : 3 150 / 150 = 21 jours ; 25 500 + 3 150 = 28 650 €, somme que TechImport recevra si la pénale s'ajoute au prix."
  },
  {
    "id": "dr2-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La licence de gestion annulée de l'association LireEnLigne",
    "exampleTitle": "Exemple résolu — le pressoir annoncé de la cave des Trois Chênes",
    "goal": "Reconnaître le dol comme vice du consentement et en tirer la nullité du contrat avec restitution.",
    "brief": "<p><strong>Énoncé.</strong> Le 15 mars 2024, l'association LireEnLigne acquiert auprès de l'éditeur Softika une licence du logiciel de gestion de médiathèque pour <strong>1 200 €</strong>. Le devis, signé des deux parties, garantissait par écrit la gestion simultanée de <strong>500 adhérents connectés</strong>. Après installation, la capacité réelle du logiciel est de <strong>50 sessions simultanées</strong> : l'association n'aurait jamais signé sans cette garantie écrite. Elle demande l'annulation du contrat.</p><p>Rappel du cours : le consentement doit être libre et éclairé. Un mensonge caractérisé de l'une des parties, déterminant pour le consentement de l'autre, constitue un <strong>dol</strong>, un vice du consentement sanctionné par la <strong>nullité</strong> du contrat, avec restitution de ce qui a été versé.</p><p>Répondez par le nombre seul (par exemple 1200) pour la question 3 ; par le mot exact attendu pour les autres questions.</p><ol><li>Quel vice du consentement le mensonge écrit de Softika constitue-t-il ?</li><li>Quelle sanction l'association peut-elle obtenir ?</li><li>Quel montant Softika devra-t-il restituer à l'association, en euros ?</li><li>Le consentement de l'association était-il libre et éclairé ?</li><li>Quel fondement du droit de l'informatique cette licence illustre-t-il ?</li></ol>",
    "starter": "# Exercice — La licence de gestion annulée de l'association LireEnLigne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 3 : le nombre seul, sans unité ni symbole.\n\n[Question 1 — Vice du consentement]\nA_COMPLETER\n\n[Question 2 — Sanction encourue]\nA_COMPLETER\n\n[Question 3 — Montant restitué (en €)]\nA_COMPLETER\n\n[Question 4 — Consentement libre et éclairé]\nA_COMPLETER\n\n[Question 5 — Fondement du droit de l'informatique]\nA_COMPLETER\n",
    "hints": [
      "Le dol suppose trois éléments : une manœuvre ou un mensonge, son caractère déterminant (sans lui, la victime n'aurait pas signé) et l'intention de tromper.",
      "La nullité anéantit le contrat comme s'il n'avait jamais existé : chaque partie restitue ce qu'elle a reçu — ici, l'éditeur rend le prix.",
      "1. Cherchez le nom du vice dans le rappel du cours. 2. Nommez la sanction attachée à ce vice. 3. Reprenez le prix payé le 15 mars. 4. Un consentement vicié n'est pas éclairé. 5. Une licence de logiciel relève du même fondement que l'exercice 1."
    ],
    "examples": [
      {
        "stdin": "La cave des Trois Chênes a acheté un pressoir annoncé dans le devis comme traitant « 5 000 kg de raisin par jour » pour 8 000 €. Capacité réelle : 800 kg par jour. Le mensonge figure par écrit dans le devis.\n\n1) Le vice : le dol (mensonge caractérisé et déterminant).\n2) La sanction : la nullité du contrat.\n3) Restitution : 8 000 €.\n4) Consentement éclairé : non.\n5) Fondement : les contrats (vente de matériel).",
        "expected": "dol — nullité du contrat — restitution de 8 000 € — consentement non éclairé — fondement : les contrats",
        "note": "Le dol exige un mensonge déterminant : sans la garantie écrite, la victime n'aurait pas signé. La nullité efface le contrat, d'où la restitution intégrale."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vice du consentement",
        "stdin": "q:1",
        "expected": "dol||le dol"
      },
      {
        "label": "Question 2 — Sanction encourue",
        "stdin": "q:2",
        "expected": "nullité||la nullité du contrat||l'annulation du contrat||annulation du contrat||nullité du contrat"
      },
      {
        "label": "Question 3 — Montant restitué (en €)",
        "stdin": "q:3",
        "expected": "1200||1 200||1200 €||1 200 €"
      },
      {
        "label": "Question 4 — Consentement libre et éclairé",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Fondement du droit de l'informatique",
        "stdin": "q:5",
        "expected": "contrats informatiques||les contrats informatiques||contrat informatique"
      }
    ],
    "solution": "[Question 1 — Vice du consentement]\ndol\n\n[Question 2 — Sanction encourue]\nnullité\n\n[Question 3 — Montant restitué (en €)]\n1200\n\n[Question 4 — Consentement libre et éclairé]\nnon\n\n[Question 5 — Fondement du droit de l'informatique]\ncontrats informatiques",
    "takeaway": "1) La garantie écrite de 500 adhérents est un mensonge caractérisé et déterminant : c'est un dol.\n2) La sanction du dol est la nullité du contrat (annulation).\n3) La licence a coûté 1 200 € : c'est le montant à restituer.\n4) Trompée sur la capacité essentielle du logiciel, l'association n'a pas consenti de façon libre et éclairée : non.\n5) Une licence de logiciel de gestion illustre le fondement « contrats informatiques » du cours.\nContrôle : la garantie promise (500) est dix fois supérieure à la capacité réelle (50) ; l'écart est si manifeste qu'il écarte la simple erreur d'appréciation."
  },
  {
    "id": "dr2-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le choix du statut de la startup Filament",
    "exampleTitle": "Exemple résolu — le statut de la coopérative Vélo Nord",
    "goal": "Réaliser le partage du capital social d'une création d'entreprise et arbitrer entre SARL et SAS.",
    "brief": "<p><strong>Énoncé.</strong> Awa, développeuse, et Brama, commercial, créent en 2025 la startup <strong>Filament</strong>, plateforme de covoiturage. Ils constituent un capital social de <strong>20 000 €</strong>, divisé en parts sociales d'une <strong>valeur nominale de 100 €</strong> : Awa reçoit <strong>60 %</strong> des parts, Brama <strong>40 %</strong>. Ils hésitent entre deux formes sociales et veulent préparer une levée de fonds en organisant librement leur gouvernance.</p><p>Rappel du cours : la <strong>SARL</strong> impose une organisation fixée par la loi, avec un gérant obligatoirement personne physique ; la <strong>SAS</strong> offre une liberté statutaire maximale (gouvernance, clauses d'agrément, assemblées) et est la forme prisée des investisseurs pour une levée de fonds. Dans les deux formes, le capital est librement fixé par les statuts, sans minimum légal, et la responsabilité des associés est limitée à leurs apports.</p><p>Répondez par le nombre seul, sans unité ni symbole (par exemple 120), sauf pour les questions 5 et 6 qui appellent un sigle.</p><ol><li>Combien de parts sociales compose le capital ?</li><li>Combien de parts Awa détient-elle ?</li><li>Quel montant Brama a-t-il apporté au capital, en euros ?</li><li>Combien de parts suffisent pour dépasser la moitié des voix ?</li><li>Quelle forme sociale recommandez-vous pour organiser librement la gouvernance et préparer la levée de fonds ?</li><li>Dans quelle forme le dirigeant est-il obligatoirement une personne physique, appelée gérant ?</li></ol>",
    "starter": "# Exercice — Le choix du statut de la startup Filament\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Questions 5 et 6 : un sigle (SARL ou SAS).\n\n[Question 1 — Nombre de parts du capital]\nA_COMPLETER\n\n[Question 2 — Parts détenues par Awa]\nA_COMPLETER\n\n[Question 3 — Apport de Brama au capital (en €)]\nA_COMPLETER\n\n[Question 4 — Parts pour dépasser la moitié des voix]\nA_COMPLETER\n\n[Question 5 — Forme recommandée pour la levée de fonds]\nA_COMPLETER\n\n[Question 6 — Forme à gérant personne physique obligatoire]\nA_COMPLETER\n",
    "hints": [
      "Le nombre de parts s'obtient en divisant le capital par la valeur nominale d'une part ; la répartition en pourcentage s'applique ensuite à ce nombre.",
      "La majorité absolue exige plus de la moitié des voix : avec un nombre pair de parts, il faut atteindre la moitié plus une.",
      "1. Parts : 20 000 / 100. 2. Awa : 60 % du nombre de parts. 3. Brama : 40 % du capital. 4. Majorité : plus de la moitié de 200. 5. Relisez la liberté statutaire de chaque forme. 6. Cherchez la forme dont le dirigeant est nécessairement une personne physique."
    ],
    "examples": [
      {
        "stdin": "La coopérative Vélo Nord est constituée d'un capital de 15 000 €, en parts de 250 € ; Karim détient 70 % des parts, Alice 30 %.\n\n1) Nombre de parts : 15 000 / 250 = 60.\n2) Karim détient 70 % de 60 = 42 parts.\n3) Alice a apporté 30 % de 15 000 = 4 500 €.\n4) Majorité absolue : plus de la moitié de 60, soit 31 parts.\n5) Pour une gouvernance flexible : la SAS.\n6) Gérant personne physique obligatoire : la SARL.",
        "expected": "60 parts — 42 pour Karim — 4 500 € pour Alice — majorité à 31 parts — SAS — gérant obligatoire en SARL",
        "note": "La liberté statutaire de la SAS se paie par une rédaction des statuts plus soignée ; la SARL impose une organisation par la loi, mais rassure associés et banques."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de parts du capital",
        "stdin": "q:1",
        "expected": "200||200 parts"
      },
      {
        "label": "Question 2 — Parts détenues par Awa",
        "stdin": "q:2",
        "expected": "120||120 parts"
      },
      {
        "label": "Question 3 — Apport de Brama au capital (en €)",
        "stdin": "q:3",
        "expected": "8000||8 000||8000 €||8 000 €"
      },
      {
        "label": "Question 4 — Parts pour dépasser la moitié des voix",
        "stdin": "q:4",
        "expected": "101"
      },
      {
        "label": "Question 5 — Forme recommandée pour la levée de fonds",
        "stdin": "q:5",
        "expected": "SAS||la SAS||une SAS"
      },
      {
        "label": "Question 6 — Forme à gérant personne physique obligatoire",
        "stdin": "q:6",
        "expected": "SARL||la SARL||une SARL"
      }
    ],
    "solution": "[Question 1 — Nombre de parts du capital]\n200\n\n[Question 2 — Parts détenues par Awa]\n120\n\n[Question 3 — Apport de Brama au capital (en €)]\n8000\n\n[Question 4 — Parts pour dépasser la moitié des voix]\n101\n\n[Question 5 — Forme recommandée pour la levée de fonds]\nSAS\n\n[Question 6 — Forme à gérant personne physique obligatoire]\nSARL",
    "takeaway": "1) Le capital se divise en 20 000 / 100 = 200 parts.\n2) Awa détient 60 % de 200 = 120 parts.\n3) Brama a apporté 40 % de 20 000 = 8 000 €.\n4) La moitié de 200 est 100 : il faut 101 parts pour dépasser la moitié des voix.\n5) Pour organiser librement la gouvernance et accueillir des investisseurs, la SAS s'impose.\n6) C'est la SARL qui impose un gérant, nécessairement personne physique.\nContrôle : 120 + 80 = 200 parts ; 12 000 € (Awa, 60 %) + 8 000 € (Brama, 40 %) = 20 000 €, le capital annoncé."
  }
];
