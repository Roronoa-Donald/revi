'use strict';

module.exports = [
  {
    "id": "ws3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les commutateurs virtuels de l'hôte HYP-01",
    "exampleTitle": "Exemple résolu — les commutateurs virtuels de l'hôte HYP-02",
    "goal": "Déduire l'accessibilité réseau des VM selon le type de commutateur virtuel Hyper-V.",
    "brief": "<p><strong>Énoncé.</strong> Amina exploite l'hôte Hyper-V <strong>HYP-01</strong> avec trois commutateurs virtuels :</p><ul><li><strong>vSwitch-Ext</strong> (Externe, relié au réseau physique, gestion de l'hôte autorisée) : VM SRV-Web et SRV-Messagerie ;</li><li><strong>vSwitch-Int</strong> (Interne) : VM SRV-Test, serveur de recette ;</li><li><strong>vSwitch-Priv</strong> (Privé) : VM SRV-Lab et SRV-Lab2, banc d'essai isolé.</li></ul><p>Rappel du cours : un commutateur Externe relie les VM au réseau physique et à l'hôte ; un commutateur Interne relie les VM entre elles et à l'hôte, jamais au réseau physique ; un commutateur Privé relie les VM entre elles uniquement. Deux VM sur deux commutateurs différents ne communiquent pas directement. Répondez par « Oui » ou « Non » aux questions 2 à 6 ; la question 1 appelle des noms de VM.</p><ol><li>Quelles VM sont raccordées au réseau physique ?</li><li>SRV-Test peut-elle joindre l'hôte HYP-01 ?</li><li>SRV-Test peut-elle joindre le réseau physique ?</li><li>SRV-Lab peut-elle joindre l'hôte HYP-01 ?</li><li>SRV-Lab peut-elle joindre SRV-Lab2 ?</li><li>SRV-Web peut-elle joindre SRV-Test ?</li></ol>",
    "starter": "# Exercice — Les commutateurs virtuels de l'hôte HYP-01\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 6 : Oui ou Non. Question 1 : les noms des VM.\n\n[Question 1 — VM raccordées au réseau physique]\nA_COMPLETER\n\n[Question 2 — SRV-Test joint l'hôte ?]\nA_COMPLETER\n\n[Question 3 — SRV-Test joint le réseau physique ?]\nA_COMPLETER\n\n[Question 4 — SRV-Lab joint l'hôte ?]\nA_COMPLETER\n\n[Question 5 — SRV-Lab joint SRV-Lab2 ?]\nA_COMPLETER\n\n[Question 6 — SRV-Web joint SRV-Test ?]\nA_COMPLETER\n",
    "hints": [
      "Classez chaque commutateur : Externe va jusqu'au réseau physique, Interne s'arrête à l'hôte, Privé s'arrête aux VM.",
      "SRV-Test est sur le commutateur Interne : elle atteint l'hôte et les VM du même commutateur, rien de plus.",
      "SRV-Web et SRV-Test sont sur deux commutateurs distincts : aucune communication directe entre elles."
    ],
    "examples": [
      {
        "stdin": "L'hôte HYP-02 porte deux commutateurs :\nvSwitch-LAN (Externe, gestion de l'hôte autorisée) : VM PORTAIL et VM BACKUP ;\nvSwitch-Banc (Privé) : VM TEST1 et VM TEST2.\n\n1) Raccordées au réseau physique : PORTAIL et BACKUP.\n2) BACKUP joint l'hôte ? Oui (Externe avec gestion autorisée).\n3) TEST1 joint le réseau physique ? Non (Privé).\n4) TEST1 joint l'hôte ? Non (Privé).\n5) TEST1 joint TEST2 ? Oui (même commutateur Privé).\n6) PORTAIL joint TEST1 ? Non (commutateurs différents).",
        "expected": "PORTAIL et BACKUP — Oui — Non — Non — Oui — Non",
        "note": "Le type du commutateur fixe la frontière : Privé coupe l'hôte et le réseau physique, Interne coupe seulement le réseau physique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — VM raccordées au réseau physique",
        "stdin": "q:1",
        "expected": "SRV-Web et SRV-Messagerie||SRV-Web, SRV-Messagerie||srv-web et srv-messagerie"
      },
      {
        "label": "Question 2 — SRV-Test joint l'hôte ?",
        "stdin": "q:2",
        "expected": "Oui||oui"
      },
      {
        "label": "Question 3 — SRV-Test joint le réseau physique ?",
        "stdin": "q:3",
        "expected": "Non||non"
      },
      {
        "label": "Question 4 — SRV-Lab joint l'hôte ?",
        "stdin": "q:4",
        "expected": "Non||non"
      },
      {
        "label": "Question 5 — SRV-Lab joint SRV-Lab2 ?",
        "stdin": "q:5",
        "expected": "Oui||oui"
      },
      {
        "label": "Question 6 — SRV-Web joint SRV-Test ?",
        "stdin": "q:6",
        "expected": "Non||non"
      }
    ],
    "solution": "[Question 1 — VM raccordées au réseau physique]\nSRV-Web et SRV-Messagerie\n\n[Question 2 — SRV-Test joint l'hôte ?]\nOui\n\n[Question 3 — SRV-Test joint le réseau physique ?]\nNon\n\n[Question 4 — SRV-Lab joint l'hôte ?]\nNon\n\n[Question 5 — SRV-Lab joint SRV-Lab2 ?]\nOui\n\n[Question 6 — SRV-Web joint SRV-Test ?]\nNon",
    "takeaway": "1) SRV-Web et SRV-Messagerie sont sur le commutateur Externe : elles seules atteignent le réseau physique.\n2) Oui : SRV-Test est sur le commutateur Interne, qui relie les VM à l'hôte.\n3) Non : un commutateur Interne n'atteint jamais le réseau physique.\n4) Non : un commutateur Privé isole les VM de l'hôte.\n5) Oui : SRV-Lab et SRV-Lab2 partagent le même commutateur Privé.\n6) Non : SRV-Web (Externe) et SRV-Test (Interne) sont sur deux commutateurs distincts.\nContrôle : chaque question se tranche par deux identifications — le type de commutateur, puis la position (même commutateur ou non) de la source et de la cible."
  },
  {
    "id": "ws3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La mémoire dynamique des VM de l'hôte HYP-01",
    "exampleTitle": "Exemple résolu — la mémoire dynamique de l'hôte HYP-02",
    "goal": "Calculer la cible mémoire, borner entre minimum et maximum, puis contrôler la pression sur l'hôte.",
    "brief": "<p><strong>Énoncé.</strong> L'hôte HYP-01 dispose de <strong>32 768 Mo</strong> de RAM physique. Amina active la mémoire dynamique sur trois VM :</p><table><tr><th>VM</th><th>Minimum (Mo)</th><th>Maximum (Mo)</th><th>Tampon</th><th>Demande (Mo)</th></tr><tr><th>VM-ERP</th><td>4096</td><td>16384</td><td>25 %</td><td>8192</td></tr><tr><th>VM-BI</th><td>8192</td><td>16384</td><td>25 %</td><td>14000</td></tr><tr><th>VM-DHCP</th><td>2048</td><td>4096</td><td>20 %</td><td>1200</td></tr></table><p>Rappel du cours : cible = demande × (1 + tampon) ; l'allocation est bornée entre le minimum et le maximum de la VM. Si la cible dépasse le maximum, la VM est « au plafond maximal » ; si elle descend sous le minimum, la VM est « au seuil minimal ». Répondez par le nombre seul en Mo pour les questions 1, 2 et 4 ; les questions 3 et 5 appellent le statut, la question 6 « Oui » ou « Non ».</p><ol><li>Quelle est la cible calculée pour VM-ERP ?</li><li>Quelle est la mémoire allouée à VM-BI ?</li><li>Quel est le statut de VM-BI ?</li><li>Quelle est la mémoire allouée à VM-DHCP ?</li><li>Quel est le statut de VM-DHCP ?</li><li>La somme des allocations dépasse-t-elle la RAM physique de l'hôte ?</li></ol>",
    "starter": "# Exercice — La mémoire dynamique des VM de l'hôte HYP-01\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 4 : le nombre seul en Mo. Questions 3 et 5 : le statut.\n\n[Question 1 — Cible de VM-ERP (Mo)]\nA_COMPLETER\n\n[Question 2 — Allocation de VM-BI (Mo)]\nA_COMPLETER\n\n[Question 3 — Statut de VM-BI]\nA_COMPLETER\n\n[Question 4 — Allocation de VM-DHCP (Mo)]\nA_COMPLETER\n\n[Question 5 — Statut de VM-DHCP]\nA_COMPLETER\n\n[Question 6 — Dépassement de la RAM de l'hôte ?]\nA_COMPLETER\n",
    "hints": [
      "Calculez d'abord la cible : demande × (1 + tampon/100), puis bornez-la entre minimum et maximum.",
      "VM-BI : 14000 × 1,25 = 17 500 Mo, au-delà du maximum 16 384 : l'allocation est coupée au plafond.",
      "Additionnez enfin les trois allocations et comparez à 32 768 Mo : la pression se lit en un seul total."
    ],
    "examples": [
      {
        "stdin": "L'hôte HYP-02 dispose de 16 384 Mo. Trois VM :\nVM-Web : min 2048, max 8192, tampon 20 %, demande 3000 ;\nVM-SQL : min 4096, max 12288, tampon 20 %, demande 2000 ;\nVM-DC : min 1024, max 2048, tampon 0 %, demande 1500.\n\n1) VM-Web : cible 3000 × 1,2 = 3600 Mo, allouée 3600 (optimale).\n2) VM-SQL : cible 2400 Mo < 4096, allouée 4096 (seuil minimal).\n3) VM-DC : cible 1500 Mo, allouée 1500 (optimale).\nTotal : 3600 + 4096 + 1500 = 9196 Mo, sous contrôle.",
        "expected": "VM-Web 3600 — VM-SQL 4096 (seuil minimal) — VM-DC 1500 — total 9196, sous contrôle",
        "note": "Le tampon se calcule sur la demande courante, jamais sur le minimum : la borne n'intervient qu'après."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Cible de VM-ERP (Mo)",
        "stdin": "q:1",
        "expected": "10240||10 240"
      },
      {
        "label": "Question 2 — Allocation de VM-BI (Mo)",
        "stdin": "q:2",
        "expected": "16384||16 384"
      },
      {
        "label": "Question 3 — Statut de VM-BI",
        "stdin": "q:3",
        "expected": "au plafond maximal||plafond maximal||PLAFOND_MAX||plafond"
      },
      {
        "label": "Question 4 — Allocation de VM-DHCP (Mo)",
        "stdin": "q:4",
        "expected": "2048"
      },
      {
        "label": "Question 5 — Statut de VM-DHCP",
        "stdin": "q:5",
        "expected": "au seuil minimal||seuil minimal||SEUIL_MIN||seuil"
      },
      {
        "label": "Question 6 — Dépassement de la RAM de l'hôte ?",
        "stdin": "q:6",
        "expected": "Non||non"
      }
    ],
    "solution": "[Question 1 — Cible de VM-ERP (Mo)]\n10240\n\n[Question 2 — Allocation de VM-BI (Mo)]\n16384\n\n[Question 3 — Statut de VM-BI]\nau plafond maximal\n\n[Question 4 — Allocation de VM-DHCP (Mo)]\n2048\n\n[Question 5 — Statut de VM-DHCP]\nau seuil minimal\n\n[Question 6 — Dépassement de la RAM de l'hôte ?]\nNon",
    "takeaway": "1) VM-ERP : cible = 8192 × 1,25 = 10 240 Mo, dans les bornes ; allocation 10 240 Mo.\n2) VM-BI : cible = 14000 × 1,25 = 17 500 Mo, au-delà du maximum : l'allocation est coupée à 16 384 Mo.\n3) VM-BI est au plafond maximal.\n4) VM-DHCP : cible = 1200 × 1,2 = 1440 Mo, sous le minimum : l'allocation est relevée à 2048 Mo.\n5) VM-DHCP est au seuil minimal.\n6) Total = 10 240 + 16 384 + 2048 = 28 672 Mo, contre 32 768 Mo disponibles : Non, l'hôte tient la charge.\nContrôle : la pression vaut 28 672 / 32 768 = 87,5 % de la RAM physique."
  },
  {
    "id": "ws3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La chaîne de disques de la VM de formation",
    "exampleTitle": "Exemple résolu — la chaîne de disques de la VM de test",
    "goal": "Suivre une chaîne de disques VHDX et points de contrôle, fusionner un checkpoint et vérifier la taille cumulée.",
    "brief": "<p><strong>Énoncé.</strong> La VM de formation FORM-VM s'appuie sur une chaîne de disques gérée par points de contrôle Hyper-V :</p><ul><li><strong>Base.vhdx</strong> (disque de base) : 40 000 Mo ;</li><li><strong>Snap1.avhdx</strong> (différentiel, parent Base.vhdx) : 6000 Mo ;</li><li><strong>Snap2.avhdx</strong> (différentiel, parent Snap1.avhdx) : 2500 Mo.</li></ul><p>Rappel du cours : fusionner un point de contrôle revient à écrire son disque différentiel dans son parent immédiat — la taille du parent augmente d'autant, le disque différentiel disparaît, et tout petit-fils est rattaché directement au parent. Amina fusionne Snap1 dans Base.vhdx. Répondez par le nombre seul en Mo pour les questions 1, 2 et 5.</p><ol><li>Quelle est la taille cumulée de la chaîne avant la fusion ?</li><li>Après la fusion, quelle est la taille de Base.vhdx ?</li><li>Après la fusion, quel est le parent de Snap2.avhdx ?</li><li>Combien de disques reste-t-il dans la chaîne après la fusion ?</li><li>Quelle est la taille cumulée de la chaîne après la fusion ?</li><li>Que constate-t-on en comparant les réponses 1 et 5 ?</li></ol>",
    "starter": "# Exercice — La chaîne de disques de la VM de formation\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 5 : le nombre seul en Mo.\n\n[Question 1 — Taille cumulée avant fusion (Mo)]\nA_COMPLETER\n\n[Question 2 — Taille de Base.vhdx après fusion (Mo)]\nA_COMPLETER\n\n[Question 3 — Parent de Snap2.avhdx après fusion]\nA_COMPLETER\n\n[Question 4 — Nombre de disques restants]\nA_COMPLETER\n\n[Question 5 — Taille cumulée après fusion (Mo)]\nA_COMPLETER\n\n[Question 6 — Constat sur la taille cumulée]\nA_COMPLETER\n",
    "hints": [
      "Avant fusion, la chaîne vaut la somme des trois disques : 40 000 + 6000 + 2500.",
      "La fusion de Snap1 écrit 6000 Mo dans Base.vhdx ; Snap2 perd son parent et se rattache à Base.vhdx.",
      "Recalculez la somme après fusion : 46 000 + 2500 ; comparez à la somme d'avant."
    ],
    "examples": [
      {
        "stdin": "La VM de test possède : Base.vhdx (20 000 Mo), Snap1.avhdx (5000 Mo, parent Base.vhdx),\nSnap2.avhdx (2000 Mo, parent Snap1.avhdx). L'administrateur fusionne Snap1 dans Base.vhdx.\n\n1) Avant fusion : 20 000 + 5000 + 2000 = 27 000 Mo.\n2) Base.vhdx passe à 25 000 Mo.\n3) Snap2.avhdx a pour parent Base.vhdx.\n4) Il reste 2 disques.\n5) Après fusion : 25 000 + 2000 = 27 000 Mo.\n6) La taille cumulée est inchangée.",
        "expected": "27 000 — 25 000 — parent Base.vhdx — 2 disques — 27 000 — inchangée",
        "note": "Une fusion déplace des données le long de la chaîne : elle ne crée ni ne détruit d'espace."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille cumulée avant fusion (Mo)",
        "stdin": "q:1",
        "expected": "48500||48 500"
      },
      {
        "label": "Question 2 — Taille de Base.vhdx après fusion (Mo)",
        "stdin": "q:2",
        "expected": "46000||46 000"
      },
      {
        "label": "Question 3 — Parent de Snap2.avhdx après fusion",
        "stdin": "q:3",
        "expected": "Base.vhdx||le parent Base.vhdx"
      },
      {
        "label": "Question 4 — Nombre de disques restants",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Taille cumulée après fusion (Mo)",
        "stdin": "q:5",
        "expected": "48500||48 500"
      },
      {
        "label": "Question 6 — Constat sur la taille cumulée",
        "stdin": "q:6",
        "expected": "la taille cumulée est inchangée||elle est inchangée||inchangée||elle ne change pas"
      }
    ],
    "solution": "[Question 1 — Taille cumulée avant fusion (Mo)]\n48500\n\n[Question 2 — Taille de Base.vhdx après fusion (Mo)]\n46000\n\n[Question 3 — Parent de Snap2.avhdx après fusion]\nBase.vhdx\n\n[Question 4 — Nombre de disques restants]\n2\n\n[Question 5 — Taille cumulée après fusion (Mo)]\n48500\n\n[Question 6 — Constat sur la taille cumulée]\nla taille cumulée est inchangée",
    "takeaway": "1) Avant fusion : 40 000 + 6000 + 2500 = 48 500 Mo.\n2) Snap1 fusionne dans Base.vhdx : 40 000 + 6000 = 46 000 Mo.\n3) Snap2.avhdx, orphelin de parent, se rattache directement à Base.vhdx.\n4) Il reste 2 disques : Base.vhdx et Snap2.avhdx.\n5) Après fusion : 46 000 + 2500 = 48 500 Mo.\n6) La taille cumulée est inchangée : la fusion déplace les blocs de Snap1 dans Base, elle ne crée ni ne détruit d'espace.\nContrôle : 48 500 avant = 48 500 après ; seule la répartition entre disques change."
  }
];
