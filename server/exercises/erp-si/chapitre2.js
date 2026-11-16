/**
 * chapitre2.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "erp2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le circuit de validation des demandes d'achat chez Navalis",
    "exampleTitle": "Exemple résolu — les notes de frais du cabinet Apsara",
    "goal": "Aiguiller une demande de dépense vers le bon niveau de validation d'un workflow, en respectant les bornes des paliers.",
    "brief": "<p><strong>Énoncé.</strong> Navalis, équipementier naval de 210 salariés, paramètre le moteur de workflow de son ERP pour les demandes d'achat. Les règles de gestion validées par la direction :</p><ul><li>jusqu'à <strong>500 € inclus</strong> : validation automatique, sans intervention humaine ;</li><li>de <strong>500,01 € à 5 000 € inclus</strong> : validation par le responsable de service ;</li><li>de <strong>5 000,01 € à 50 000 € inclus</strong> : validation par le directeur des opérations ;</li><li>au-delà de <strong>50 000 €</strong> : validation par la direction générale.</li></ul><p>Un lundi matin, cinq demandes sont enregistrées :</p><table><tr><th>Demande</th><th>Objet de la dépense</th><th>Montant</th></tr><tr><th>D1</th><td>Consommables de bureau</td><td>324,50 €</td></tr><tr><th>D2</th><td>Dix licences antivirus</td><td>2 450 €</td></tr><tr><th>D3</th><td>Centre d'usinage à commande numérique</td><td>87 500 €</td></tr><tr><th>D4</th><td>Contrat de maintenance annuel des machines</td><td>5 000 €</td></tr><tr><th>D5</th><td>Écran d'affichage pour l'atelier</td><td>500 €</td></tr></table><p>Pour les questions 1 à 5, répondez par le validateur exact : automatique, responsable de service, directeur des opérations ou direction générale. Attention aux bornes : un montant égal à une borne appartient au palier qui l'inclut.</p><ol><li>Qui valide la demande D1 ?</li><li>Qui valide la demande D2 ?</li><li>Qui valide la demande D3 ?</li><li>Qui valide la demande D4, dont le montant atteint exactement 5 000 € ?</li><li>Qui valide la demande D5, dont le montant atteint exactement 500 € ?</li><li>Combien de demandes passent par un validateur humain ?</li></ol>",
    "starter": "# Exercice — Le circuit de validation des demandes d'achat chez Navalis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : le validateur exact ; question 6 : un nombre.\n\n[Question 1 — Validateur de la demande D1]\nA_COMPLETER\n\n[Question 2 — Validateur de la demande D2]\nA_COMPLETER\n\n[Question 3 — Validateur de la demande D3]\nA_COMPLETER\n\n[Question 4 — Validateur de la demande D4 (5 000 €)]\nA_COMPLETER\n\n[Question 5 — Validateur de la demande D5 (500 €)]\nA_COMPLETER\n\n[Question 6 — Demandes passant par un validateur humain]\nA_COMPLETER\n",
    "hints": [
      "Un workflow applique des règles de gestion : chaque montant est comparé à des bornes, sans interprétation possible.",
      "Les paliers sont fermés à droite : « jusqu'à 500 € inclus » et « jusqu'à 5 000 € inclus » signifient qu'un montant égal à la borne reste dans ce palier.",
      "1. D1 : 324,50 est inférieur ou égal à 500. 2. D2 : entre 500,01 et 5 000. 3. D3 : supérieur à 50 000. 4. D4 : exactement 5 000, borne incluse du palier directeur. 5. D5 : exactement 500, borne incluse du palier automatique. 6. Comptez les demandes hors validation automatique."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Apsara paramètre la validation de ses notes de frais :\njusqu'à 200 € inclus : validation automatique ; jusqu'à 2 000 € inclus : manager ; au-delà : direction.\nTrois notes sont soumises : 150 €, 200 € et 1 500 €.\n\n1) 150 € : validation automatique.\n2) 200 € : borne incluse, validation automatique.\n3) 1 500 € : validation par le manager.\n4) Une seule note passe par un validateur humain.",
        "expected": "150 € automatique — 200 € automatique (borne incluse) — 1 500 € manager — 1 seule note avec validateur humain",
        "note": "Un montant exactement égal à une borne appartient toujours au palier qui l'inclut : c'est la règle d'or des workflows."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Validateur de la demande D1",
        "stdin": "q:1",
        "expected": "automatique||validation automatique||auto"
      },
      {
        "label": "Question 2 — Validateur de la demande D2",
        "stdin": "q:2",
        "expected": "responsable de service||le responsable de service||manager||le manager"
      },
      {
        "label": "Question 3 — Validateur de la demande D3",
        "stdin": "q:3",
        "expected": "direction générale||la direction générale||direction generale||la direction generale||dg||la dg"
      },
      {
        "label": "Question 4 — Validateur de la demande D4 (5 000 €)",
        "stdin": "q:4",
        "expected": "directeur des opérations||le directeur des opérations||directeur des operations||le directeur des operations||directeur||le directeur"
      },
      {
        "label": "Question 5 — Validateur de la demande D5 (500 €)",
        "stdin": "q:5",
        "expected": "automatique||validation automatique||auto"
      },
      {
        "label": "Question 6 — Demandes passant par un validateur humain",
        "stdin": "q:6",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — Validateur de la demande D1]\nautomatique\n\n[Question 2 — Validateur de la demande D2]\nresponsable de service\n\n[Question 3 — Validateur de la demande D3]\ndirection générale\n\n[Question 4 — Validateur de la demande D4 (5 000 €)]\ndirecteur des opérations\n\n[Question 5 — Validateur de la demande D5 (500 €)]\nautomatique\n\n[Question 6 — Demandes passant par un validateur humain]\n3",
    "takeaway": "1) D1 (324,50 €) est inférieure ou égale à 500 € : validation automatique.\n2) D2 (2 450 €) se situe entre 500,01 € et 5 000 € : validation par le responsable de service.\n3) D3 (87 500 €) dépasse 50 000 € : validation par la direction générale.\n4) D4 atteint exactement 5 000 € : la borne est incluse dans le palier « 500,01 à 5 000 € », donc validation par le directeur des opérations.\n5) D5 atteint exactement 500 € : borne incluse du premier palier, donc validation automatique.\n6) Les demandes à validateur humain sont D2, D3 et D4 : 3 demandes (D1 et D5 sont automatiques).\nContrôle : 5 demandes au total − 2 automatiques = 3 demandes à validateur humain."
  },
  {
    "id": "erp2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le robot RPA du contrôle de factures de Solivac",
    "exampleTitle": "Exemple résolu — le robot de factures du pépiniériste Vertalys",
    "goal": "Vérifier par le calcul la cohérence HT-TTC de factures saisies par un robot RPA et repérer les anomalies.",
    "brief": "<p><strong>Énoncé.</strong> Solivac, fabricant d'équipements de climatisation, reçoit chaque semaine des centaines de factures fournisseurs papier. Un robot RPA les scanne (reconnaissance optique de caractères), saisit le numéro, le montant HT et le montant TTC dans l'ERP, puis contrôle que TTC = HT × 1,20 (TVA à 20 %). Tant que le contrôle n'est pas bon, le paiement reste bloqué. Cette semaine, trois factures sont extraites :</p><table><tr><th>Facture</th><th>Fournisseur</th><th>Montant HT lu</th><th>Montant TTC lu</th></tr><tr><th>FA-2027-101</th><td>NordFournitures</td><td>1 250,00 €</td><td>1 500,00 €</td></tr><tr><th>FA-2027-102</th><td>DecoPro</td><td>840,00 €</td><td>1 050,00 €</td></tr><tr><th>FA-2027-103</th><td>Outillage Sud</td><td>2 300,00 €</td><td>2 700,00 €</td></tr></table><p>Pour les montants, répondez par le nombre seul, sans unité ; pour la question 2, répondez par le mot : conforme ou anormale.</p><ol><li>Quel montant TTC théorique le robot calcule-t-il pour la facture FA-2027-101, en euros ?</li><li>La facture FA-2027-101 est-elle conforme ou anormale ?</li><li>Quel montant TTC théorique pour la facture FA-2027-102, en euros ?</li><li>Quel est l'écart, en euros, entre le TTC lu et le TTC théorique de la facture FA-2027-102 ?</li><li>Quel montant TTC théorique pour la facture FA-2027-103, en euros ?</li><li>Combien de factures le robot doit-il signaler en anomalie ?</li></ol>",
    "starter": "# Exercice — Le robot RPA du contrôle de factures de Solivac\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, sans unité ; question 2 : le mot conforme ou anormale.\n\n[Question 1 — TTC théorique de FA-2027-101 (en €)]\nA_COMPLETER\n\n[Question 2 — Statut de FA-2027-101]\nA_COMPLETER\n\n[Question 3 — TTC théorique de FA-2027-102 (en €)]\nA_COMPLETER\n\n[Question 4 — Écart de FA-2027-102 (en €)]\nA_COMPLETER\n\n[Question 5 — TTC théorique de FA-2027-103 (en €)]\nA_COMPLETER\n\n[Question 6 — Nombre de factures en anomalie]\nA_COMPLETER\n",
    "hints": [
      "La TVA à 20 % se calcule toujours sur le hors taxes : TTC théorique = HT × 1,20.",
      "La facture est conforme si le TTC lu est exactement égal au TTC théorique ; sinon le robot bloque le paiement.",
      "1. FA-101 : 1 250 × 1,20. 2. Comparez au TTC lu. 3. FA-102 : 840 × 1,20. 4. Écart = TTC lu − TTC théorique. 5. FA-103 : 2 300 × 1,20. 6. Comptez les factures dont le TTC lu diffère du TTC théorique."
    ],
    "examples": [
      {
        "stdin": "Chez Vertalys, pépiniériste, le robot RPA contrôle deux factures (TVA 20 %) :\nFA-88 : HT 400 €, TTC lu 480 € ; FA-89 : HT 600 €, TTC lu 750 €.\n\n1) FA-88 : 400 × 1,20 = 480 € théoriques : conforme.\n2) FA-89 : 600 × 1,20 = 720 € théoriques, contre 750 € lus.\n3) Écart FA-89 : 750 − 720 = 30 € : anormale.\n4) Une seule facture est signalée en anomalie.",
        "expected": "FA-88 conforme (480 €) — FA-89 anormale (720 € attendus, 30 € d'écart) — 1 anomalie",
        "note": "L'écart vient souvent d'une mauvaise lecture optique ou d'un taux de TVA différent : le contrôle arithmétique du robot protège le paiement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — TTC théorique de FA-2027-101 (en €)",
        "stdin": "q:1",
        "expected": "1500||1 500||1500,00||1 500,00"
      },
      {
        "label": "Question 2 — Statut de FA-2027-101",
        "stdin": "q:2",
        "expected": "conforme"
      },
      {
        "label": "Question 3 — TTC théorique de FA-2027-102 (en €)",
        "stdin": "q:3",
        "expected": "1008||1 008||1008,00||1 008,00"
      },
      {
        "label": "Question 4 — Écart de FA-2027-102 (en €)",
        "stdin": "q:4",
        "expected": "42||42,00||42.00"
      },
      {
        "label": "Question 5 — TTC théorique de FA-2027-103 (en €)",
        "stdin": "q:5",
        "expected": "2760||2 760||2760,00||2 760,00"
      },
      {
        "label": "Question 6 — Nombre de factures en anomalie",
        "stdin": "q:6",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — TTC théorique de FA-2027-101 (en €)]\n1500\n\n[Question 2 — Statut de FA-2027-101]\nconforme\n\n[Question 3 — TTC théorique de FA-2027-102 (en €)]\n1008\n\n[Question 4 — Écart de FA-2027-102 (en €)]\n42\n\n[Question 5 — TTC théorique de FA-2027-103 (en €)]\n2760\n\n[Question 6 — Nombre de factures en anomalie]\n2",
    "takeaway": "1) FA-2027-101 : 1 250,00 × 1,20 = 1 500,00 € de TTC théorique.\n2) Le TTC lu (1 500,00 €) est identique au TTC théorique : la facture est conforme.\n3) FA-2027-102 : 840,00 × 1,20 = 1 008,00 € de TTC théorique.\n4) Écart : 1 050,00 − 1 008,00 = 42,00 € : la facture est anormale.\n5) FA-2027-103 : 2 300,00 × 1,20 = 2 760,00 € de TTC théorique, contre 2 700,00 € lus (écart de 60 €).\n6) Deux factures divergent du TTC théorique (FA-2027-102 et FA-2027-103) : 2 factures sont signalées en anomalie.\nContrôle : 1 250 + 250 = 1 500 (OK) ; 840 + 168 = 1 008 ≠ 1 050 ; 2 300 + 460 = 2 760 ≠ 2 700."
  },
  {
    "id": "erp2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le cycle de vie des commandes du site Marin et Fils",
    "exampleTitle": "Exemple résolu — le cycle de vie des devis de l'Atelier Loire",
    "goal": "Valider ou refuser les transitions d'états d'une commande conformément au diagramme BPMN du processus.",
    "brief": "<p><strong>Énoncé.</strong> Marin et Fils, vendeur de matériel de marine en ligne, a modélisé dans son ERP le cycle de vie d'une commande client. Le diagramme BPMN définit des états et des transitions strictes :</p><ul><li><strong>BROUILLON</strong> peut passer à VALIDÉ ou ANNULÉ ;</li><li><strong>VALIDÉ</strong> peut passer à EN PRÉPARATION ou ANNULÉ ;</li><li><strong>EN PRÉPARATION</strong> peut passer à EXPÉDIÉ ;</li><li><strong>EXPÉDIÉ</strong> peut passer à LIVRÉ ou RETOURNÉ ;</li><li><strong>LIVRÉ</strong>, <strong>ANNULÉ</strong> et <strong>RETOURNÉ</strong> sont des états finaux : aucune transition n'en sort.</li></ul><p>Vendredi soir, le superviseur des ventes examine cinq demandes de changement d'état :</p><table><tr><th>Commande</th><th>État actuel</th><th>Transition demandée</th></tr><tr><th>C-118</th><td>BROUILLON</td><td>passer à VALIDÉ</td></tr><tr><th>C-204</th><td>BROUILLON</td><td>passer à EXPÉDIÉ</td></tr><tr><th>C-231</th><td>VALIDÉ</td><td>passer à ANNULÉ</td></tr><tr><th>C-305</th><td>LIVRÉ</td><td>repasser à EN PRÉPARATION</td></tr><tr><th>C-312</th><td>EN PRÉPARATION</td><td>passer à ANNULÉ</td></tr></table><p>Pour les questions 1 à 5, répondez par le mot : autorisée ou interdite.</p><ol><li>La transition demandée pour C-118 est-elle autorisée ou interdite ?</li><li>La transition demandée pour C-204 (sauter la validation) ?</li><li>La transition demandée pour C-231 (annuler une commande validée) ?</li><li>La transition demandée pour C-305 (rouvrir une commande livrée) ?</li><li>La transition demandée pour C-312 (annuler une commande en préparation) ?</li><li>Depuis l'état EN PRÉPARATION, quelle est la seule transition autorisée ? Répondez par l'état cible.</li></ol>",
    "starter": "# Exercice — Le cycle de vie des commandes du site Marin et Fils\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : autorisée ou interdite ; question 6 : l'état cible.\n\n[Question 1 — Transition de C-118]\nA_COMPLETER\n\n[Question 2 — Transition de C-204]\nA_COMPLETER\n\n[Question 3 — Transition de C-231]\nA_COMPLETER\n\n[Question 4 — Transition de C-305]\nA_COMPLETER\n\n[Question 5 — Transition de C-312]\nA_COMPLETER\n\n[Question 6 — Sortie unique depuis EN PRÉPARATION]\nA_COMPLETER\n",
    "hints": [
      "Un cycle de vie est une machine à états : seules les transitions dessinées dans le modèle sont possibles, aucune autre.",
      "Les états finaux sont des culs-de-sac : une fois la commande livrée, annulée ou retournée, plus aucune transition ne peut en sortir.",
      "1. C-118 : BROUILLON vers VALIDÉ, transition dessinée. 2. C-204 : BROUILLON n'a que deux sorties, VALIDÉ et ANNULÉ. 3. C-231 : VALIDÉ peut être annulé. 4. C-305 : LIVRÉ est un état final. 5. C-312 : EN PRÉPARATION n'a qu'une seule sortie. 6. Relisez la liste des sorties de EN PRÉPARATION."
    ],
    "examples": [
      {
        "stdin": "L'Atelier Loire modélise ses devis : BROUILLON peut passer à ENVOYÉ ou ANNULÉ ;\nENVOYÉ peut passer à ACCEPTÉ ou REFUSÉ ; ACCEPTÉ peut passer à CONTRAT.\nTrois demandes : un devis BROUILLON que l'on veut ACCEPTÉ ;\nun devis ENVOYÉ que l'on veut REFUSÉ ; un devis ACCEPTÉ que l'on veut passer en CONTRAT.\n\n1) BROUILLON vers ACCEPTÉ : interdite (il faut passer par ENVOYÉ).\n2) ENVOYÉ vers REFUSÉ : autorisée.\n3) ACCEPTÉ vers CONTRAT : autorisée.",
        "expected": "BROUILLON vers ACCEPTÉ interdite — ENVOYÉ vers REFUSÉ autorisée — ACCEPTÉ vers CONTRAT autorisée",
        "note": "Impossible de sauter des étapes : la machine à états force le respect du processus métier dessiné en BPMN."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Transition de C-118",
        "stdin": "q:1",
        "expected": "autorisée||autorisee||transition autorisée||transition autorisee"
      },
      {
        "label": "Question 2 — Transition de C-204",
        "stdin": "q:2",
        "expected": "interdite||transition interdite"
      },
      {
        "label": "Question 3 — Transition de C-231",
        "stdin": "q:3",
        "expected": "autorisée||autorisee||transition autorisée||transition autorisee"
      },
      {
        "label": "Question 4 — Transition de C-305",
        "stdin": "q:4",
        "expected": "interdite||transition interdite"
      },
      {
        "label": "Question 5 — Transition de C-312",
        "stdin": "q:5",
        "expected": "interdite||transition interdite"
      },
      {
        "label": "Question 6 — Sortie unique depuis EN PRÉPARATION",
        "stdin": "q:6",
        "expected": "expédié||expedie||vers expédié||vers expedie||l'état expédié||l’état expédié"
      }
    ],
    "solution": "[Question 1 — Transition de C-118]\nautorisée\n\n[Question 2 — Transition de C-204]\ninterdite\n\n[Question 3 — Transition de C-231]\nautorisée\n\n[Question 4 — Transition de C-305]\ninterdite\n\n[Question 5 — Transition de C-312]\ninterdite\n\n[Question 6 — Sortie unique depuis EN PRÉPARATION]\nexpédié",
    "takeaway": "1) C-118 : BROUILLON vers VALIDÉ figure dans le modèle : transition autorisée.\n2) C-204 : BROUILLON ne peut aller qu'à VALIDÉ ou ANNULÉ : passer directement à EXPÉDIÉ est interdit.\n3) C-231 : VALIDÉ vers ANNULÉ figure dans le modèle : transition autorisée.\n4) C-305 : LIVRÉ est un état final, aucune sortie n'existe : transition interdite.\n5) C-312 : EN PRÉPARATION ne peut aller qu'à EXPÉDIÉ : l'annulation à ce stade est interdite.\n6) Depuis EN PRÉPARATION, la seule transition autorisée est EXPÉDIÉ.\nContrôle : sur 5 demandes, 2 sont autorisées (C-118, C-231) et 3 interdites (C-204, C-305, C-312)."
  }
];
