/**
 * chapitre4.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "erp2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le rapprochement à trois voies d'Aquaterre",
    "exampleTitle": "Exemple résolu — le rapprochement des raccords de Plomberie Réunie",
    "goal": "Contrôler la concordance bon de commande, bon de réception et facture avant de payer un fournisseur.",
    "brief": "<p><strong>Énoncé.</strong> Aquaterre, installateur de réseaux d'eau, reçoit la facture FA-1188 de son fournisseur Valvexp pour la commande de vannes industrielles BC-7712. Dans l'ERP, le paiement n'est autorisé que si les trois documents concordent : c'est le rapprochement à trois voies du cycle Procure-to-Pay.</p><table><tr><th>Document</th><th>Quantité</th><th>Prix unitaire</th></tr><tr><th>Bon de commande BC-7712</th><td>60</td><td>22,00 €</td></tr><tr><th>Bon de réception BR-3391</th><td>55</td><td>—</td></tr><tr><th>Facture FA-1188</th><td>60</td><td>22,00 €</td></tr></table><p>Répondez par le nombre seul, sauf la question 2 (le nom d'un document) et la question 5 (autorise ou bloque).</p><ol><li>Quelle quantité d'articles le magasinier a-t-il réellement réceptionnée ?</li><li>Quel document du cycle P2P atteste la réception effective des marchandises ?</li><li>Quel est l'écart de quantité entre la facture et le bon de réception ?</li><li>Quel est l'écart de prix unitaire entre la commande et la facture, en euros ?</li><li>Le contrôle à trois voies autorise-t-il ou bloque-t-il le paiement de la facture ?</li><li>Combien d'unités supplémentaires faut-il réceptionner pour que la facture devienne payable ?</li></ol>",
    "starter": "# Exercice — Le rapprochement à trois voies d'Aquaterre\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Nombres seuls ; question 2 : le nom du document ; question 5 : autorise ou bloque.\n\n[Question 1 — Quantité réellement réceptionnée]\nA_COMPLETER\n\n[Question 2 — Document qui atteste la réception]\nA_COMPLETER\n\n[Question 3 — Écart de quantité facture / réception]\nA_COMPLETER\n\n[Question 4 — Écart de prix unitaire (en €)]\nA_COMPLETER\n\n[Question 5 — Décision du contrôle sur le paiement]\nA_COMPLETER\n\n[Question 6 — Unités à réceptionner en plus]\nA_COMPLETER\n",
    "hints": [
      "Le rapprochement à trois voies compare quantité commandée, quantité reçue et quantité facturée, ainsi que prix convenu et prix facturé.",
      "Tant qu'un des trois documents diverge des autres, l'ERP bloque le paiement : c'est un contrôle interne du cycle P2P.",
      "1. Lisez la ligne du bon de réception. 2. Parmi commande, réception et facture, lequel prouve l'arrivée des marchandises ? 3. Écart = quantité facturée − quantité reçue. 4. Comparez les deux prix unitaires. 5. Tout écart bloque le paiement. 6. L'écart de quantité doit être comblé."
    ],
    "examples": [
      {
        "stdin": "Plomberie Réunie contrôle une commande de 100 raccords à 15,00 € l'unité.\nBon de réception : 100 raccords reçus. Facture : 100 raccords à 15,00 €.\n\n1) Quantité reçue : 100.\n2) Écart de quantité : 100 − 100 = 0.\n3) Écart de prix : 15,00 − 15,00 = 0 €.\n4) Les trois documents concordent : paiement autorisé.",
        "expected": "100 reçus — écart de quantité 0 — écart de prix 0 € — paiement autorisé",
        "note": "Trois documents identiques, paiement automatique : le rapprochement protège du paiement de marchandises jamais livrées."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Quantité réellement réceptionnée",
        "stdin": "q:1",
        "expected": "55"
      },
      {
        "label": "Question 2 — Document qui atteste la réception",
        "stdin": "q:2",
        "expected": "bon de réception||le bon de réception||bon de reception||le bon de reception||BR||le BR"
      },
      {
        "label": "Question 3 — Écart de quantité facture / réception",
        "stdin": "q:3",
        "expected": "5"
      },
      {
        "label": "Question 4 — Écart de prix unitaire (en €)",
        "stdin": "q:4",
        "expected": "0||0,00||0.00||0 €"
      },
      {
        "label": "Question 5 — Décision du contrôle sur le paiement",
        "stdin": "q:5",
        "expected": "bloque||bloqué||blocage||il bloque"
      },
      {
        "label": "Question 6 — Unités à réceptionner en plus",
        "stdin": "q:6",
        "expected": "5"
      }
    ],
    "solution": "[Question 1 — Quantité réellement réceptionnée]\n55\n\n[Question 2 — Document qui atteste la réception]\nbon de réception\n\n[Question 3 — Écart de quantité facture / réception]\n5\n\n[Question 4 — Écart de prix unitaire (en €)]\n0\n\n[Question 5 — Décision du contrôle sur le paiement]\nbloque\n\n[Question 6 — Unités à réceptionner en plus]\n5",
    "takeaway": "1) Le bon de réception BR-3391 atteste de 55 vannes reçues.\n2) C'est le bon de réception qui atteste la réception effective des marchandises.\n3) Écart de quantité : 60 facturées − 55 reçues = 5.\n4) Écart de prix : 22,00 − 22,00 = 0 € (le prix facturé est conforme au prix convenu).\n5) La facture porte sur 60 unités alors que 5 manquent à la réception : le contrôle bloque le paiement.\n6) Il faut réceptionner les 5 unités manquantes pour que les trois documents concordent et que la facture soit payable.\nContrôle : 55 reçues + 5 manquantes = 60 facturées."
  },
  {
    "id": "erp2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Remise volume et marge chez SportOuest",
    "exampleTitle": "Exemple résolu — la remise des vélos de Cyclovia",
    "goal": "Appliquer une grille tarifaire dégressive par volume puis mesurer la marge brute d'une commande du cycle Order-to-Cash.",
    "brief": "<p><strong>Énoncé.</strong> SportOuest, équipementier pour collectivités, applique dans le module Ventes de son ERP une remise quantitative sur les gilets de sécurité haute visibilité :</p><ul><li>moins de 10 unités : 0 % ;</li><li>de 10 à 49 unités : 5 % ;</li><li>de 50 à 99 unités : 10 % ;</li><li>100 unités et plus : 15 %.</li></ul><p>La municipalité de Plogoff commande <strong>60 gilets</strong>. Le tarif catalogue est de <strong>45,00 € HT</strong> l'unité et le coût de revient de <strong>27,00 € HT</strong> l'unité. La marge brute se calcule sur le prix de vente remisé.</p><p>Répondez par le nombre seul, sans unité ni symbole (les pourcentages s'écrivent par exemple 10 ou 33,3).</p><ol><li>Quel taux de remise (en %) s'applique à cette commande ?</li><li>Quel est le prix unitaire HT remisé, en euros ?</li><li>Quel est le chiffre d'affaires HT total de la commande, en euros ?</li><li>Quelle est la marge brute totale, en euros ?</li><li>Quel est le taux de marge brute (marge ÷ CA HT), arrondi à une décimale ?</li><li>Si la municipalité portait sa commande à 100 gilets, quel taux de remise s'appliquerait ?</li></ol>",
    "starter": "# Exercice — Remise volume et marge chez SportOuest\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, sans unité ni symbole.\n\n[Question 1 — Taux de remise applicable (en %)]\nA_COMPLETER\n\n[Question 2 — Prix unitaire HT remisé (en €)]\nA_COMPLETER\n\n[Question 3 — Chiffre d'affaires HT total (en €)]\nA_COMPLETER\n\n[Question 4 — Marge brute totale (en €)]\nA_COMPLETER\n\n[Question 5 — Taux de marge brute (en %)]\nA_COMPLETER\n\n[Question 6 — Remise pour une commande de 100 gilets (en %)]\nA_COMPLETER\n",
    "hints": [
      "La grille dégressive se lit par paliers : c'est la quantité commandée qui sélectionne le taux, et le taux s'applique au prix catalogue.",
      "Marge brute = CA HT remisé − (coût de revient × quantité) ; le taux de marge rapporte cette marge au CA.",
      "1. 60 gilets tombent dans le palier 50 à 99. 2. Prix remisé = 45,00 × (1 − remise). 3. CA = prix remisé × 60. 4. Marge = CA − 27,00 × 60. 5. Taux = marge ÷ CA × 100. 6. 100 unités atteignent le dernier palier."
    ],
    "examples": [
      {
        "stdin": "Cyclovia vend des vélos de ville : catalogue 120,00 € HT, coût de revient 75,00 € HT.\nUne entreprise en commande 20 : palier 5 % (de 10 à 49 unités).\n\n1) Remise : 5 %.\n2) Prix remisé : 120,00 × 0,95 = 114,00 €.\n3) CA HT : 20 × 114,00 = 2 280 €.\n4) Marge brute : 2 280 − 20 × 75,00 = 2 280 − 1 500 = 780 €.\n5) Taux de marge : 780 ÷ 2 280 × 100 = 34,2 %.",
        "expected": "remise 5 % — prix remisé 114,00 € — CA 2 280 € — marge 780 € — taux de marge 34,2 %",
        "note": "La remise réduit le CA mais pas le coût de revient : le taux de marge se dégrade à mesure que la remise augmente."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taux de remise applicable (en %)",
        "stdin": "q:1",
        "expected": "10||10 %||10%"
      },
      {
        "label": "Question 2 — Prix unitaire HT remisé (en €)",
        "stdin": "q:2",
        "expected": "40,50||40.50||40,5||40.5"
      },
      {
        "label": "Question 3 — Chiffre d'affaires HT total (en €)",
        "stdin": "q:3",
        "expected": "2430||2 430||2430,00||2 430,00"
      },
      {
        "label": "Question 4 — Marge brute totale (en €)",
        "stdin": "q:4",
        "expected": "810||810,00"
      },
      {
        "label": "Question 5 — Taux de marge brute (en %)",
        "stdin": "q:5",
        "expected": "33,3||33.3"
      },
      {
        "label": "Question 6 — Remise pour une commande de 100 gilets (en %)",
        "stdin": "q:6",
        "expected": "15||15 %||15%"
      }
    ],
    "solution": "[Question 1 — Taux de remise applicable (en %)]\n10\n\n[Question 2 — Prix unitaire HT remisé (en €)]\n40,50\n\n[Question 3 — Chiffre d'affaires HT total (en €)]\n2430\n\n[Question 4 — Marge brute totale (en €)]\n810\n\n[Question 5 — Taux de marge brute (en %)]\n33,3\n\n[Question 6 — Remise pour une commande de 100 gilets (en %)]\n15",
    "takeaway": "1) 60 gilets tombent dans le palier 50 à 99 unités : remise de 10 %.\n2) Prix unitaire remisé : 45,00 × (1 − 0,10) = 40,50 €.\n3) CA HT : 60 × 40,50 = 2 430 €.\n4) Marge brute : 2 430 − (60 × 27,00) = 2 430 − 1 620 = 810 €.\n5) Taux de marge brute : 810 ÷ 2 430 × 100 = 33,3 %.\n6) 100 unités atteignent le palier supérieur : remise de 15 %.\nContrôle : coût total 1 620 € + marge 810 € = CA 2 430 €."
  },
  {
    "id": "erp2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les besoins nets de la table RE-450 chez Boisvert",
    "exampleTitle": "Exemple résolu — les besoins nets du fauteuil FE-12 chez Mobilia",
    "goal": "Calculer un besoin net MRP à partir des besoins bruts, du stock, des réceptions prévues et du stock de sécurité, puis dimensionner l'ordre de fabrication.",
    "brief": "<p><strong>Énoncé.</strong> L'atelier Boisvert fabrique des tables de restaurant. Pour la semaine 12, le module de planification calcule les besoins de la table référence RE-450 :</p><ul><li>besoins bruts (commandes clients fermes et prévisions) : <strong>220 tables</strong> ;</li><li>stock initial disponible en entrepôt : <strong>80 tables</strong> ;</li><li>réceptions prévues (ordres de fabrication en cours de finition) : <strong>60 tables</strong> ;</li><li>stock de sécurité imposé : <strong>30 tables</strong> ;</li><li>taille de lot de lancement : <strong>50 tables</strong> (les ordres sont arrondis au lot supérieur).</li></ul><p>Rappel : besoin net = besoins bruts − stock initial − réceptions prévues + stock de sécurité (jamais négatif). Répondez par le nombre seul ; question 3 par oui ou non.</p><ol><li>Quelles ressources totales (stock initial + réceptions prévues) sont disponibles pour la semaine ?</li><li>Quel est le besoin net de la semaine 12 ?</li><li>Un ordre de fabrication doit-il être lancé ?</li><li>Le besoin net étant arrondi au lot de 50, combien d'unités compte l'ordre de fabrication proposé ?</li><li>Une fois l'ordre réceptionné et le besoin brut consommé, quel stock reste-t-il en fin de semaine ?</li><li>S'il n'y avait pas de stock de sécurité, quel serait le besoin net ?</li></ol>",
    "starter": "# Exercice — Les besoins nets de la table RE-450 chez Boisvert\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul ; question 3 : oui ou non.\n\n[Question 1 — Ressources disponibles (stock + réceptions)]\nA_COMPLETER\n\n[Question 2 — Besoin net de la semaine 12]\nA_COMPLETER\n\n[Question 3 — Lancement d'un ordre de fabrication]\nA_COMPLETER\n\n[Question 4 — Quantité de l'ordre proposé (lot de 50)]\nA_COMPLETER\n\n[Question 5 — Stock restant en fin de semaine]\nA_COMPLETER\n\n[Question 6 — Besoin net sans stock de sécurité]\nA_COMPLETER\n",
    "hints": [
      "Le MRP compare la demande (besoins bruts augmentés du stock de sécurité) aux ressources (stock disponible et réceptions déjà planifiées).",
      "L'ordre de fabrication couvre le besoin net arrondi au lot supérieur ; le stock final s'obtient en retranchant le besoin brut des ressources augmentées de l'ordre.",
      "1. Ressources = 80 + 60. 2. Besoin net = 220 − 80 − 60 + 30. 3. Besoin net nul ? Sinon lancement. 4. Arrondissez au multiple de 50 supérieur. 5. Stock final = 80 + 60 + ordre − 220. 6. Refaites le calcul sans le + 30."
    ],
    "examples": [
      {
        "stdin": "Mobilia produit le fauteuil FE-12 : besoins bruts 150, stock initial 40,\nréceptions prévues 50, stock de sécurité 20, lot de 40.\n\n1) Ressources : 40 + 50 = 90.\n2) Besoin net : 150 − 40 − 50 + 20 = 80.\n3) Ordre nécessaire : oui.\n4) 80 est un multiple exact du lot de 40 : ordre de 80.\n5) Stock final : 40 + 50 + 80 − 150 = 20 (le stock de sécurité est tenu).\n6) Sans sécurité : 150 − 90 = 60.",
        "expected": "ressources 90 — besoin net 80 — ordre de 80 — stock final 20 — sans sécurité : 60",
        "note": "Le stock de sécurité majore le besoin net : sans lui, l'atelier finirait la semaine à stock zéro, sans protection."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ressources disponibles (stock + réceptions)",
        "stdin": "q:1",
        "expected": "140"
      },
      {
        "label": "Question 2 — Besoin net de la semaine 12",
        "stdin": "q:2",
        "expected": "110"
      },
      {
        "label": "Question 3 — Lancement d'un ordre de fabrication",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Quantité de l'ordre proposé (lot de 50)",
        "stdin": "q:4",
        "expected": "150"
      },
      {
        "label": "Question 5 — Stock restant en fin de semaine",
        "stdin": "q:5",
        "expected": "70"
      },
      {
        "label": "Question 6 — Besoin net sans stock de sécurité",
        "stdin": "q:6",
        "expected": "80"
      }
    ],
    "solution": "[Question 1 — Ressources disponibles (stock + réceptions)]\n140\n\n[Question 2 — Besoin net de la semaine 12]\n110\n\n[Question 3 — Lancement d'un ordre de fabrication]\noui\n\n[Question 4 — Quantité de l'ordre proposé (lot de 50)]\n150\n\n[Question 5 — Stock restant en fin de semaine]\n70\n\n[Question 6 — Besoin net sans stock de sécurité]\n80",
    "takeaway": "1) Ressources disponibles : 80 + 60 = 140 tables.\n2) Besoin net : 220 − 80 − 60 + 30 = 110 tables.\n3) Le besoin net est positif : un ordre de fabrication doit être lancé.\n4) 110 arrondi au lot de 50 supérieur : 3 lots, soit 150 tables.\n5) Stock final : 80 + 60 + 150 − 220 = 70 tables, au-dessus du stock de sécurité de 30.\n6) Sans stock de sécurité : 220 − 80 − 60 = 80 tables.\nContrôle : avec l'ordre de 150, le stock final (70) respecte la sécurité (30) ; sans sécurité, le besoin net passerait de 110 à 80, soit exactement le stock de sécurité retranché."
  }
];
