/**
 * chapitre5.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "erp2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "L'écriture d'achat de la société Brumaire",
    "exampleTitle": "Exemple résolu — l'écriture de prestation de Prestalia",
    "goal": "Vérifier l'équilibre débit-crédit d'une écriture comptable en partie double saisie dans l'ERP.",
    "brief": "<p><strong>Énoncé.</strong> Le 14 mars, la société Brumaire (negoce de composants électroniques) enregistre dans le module comptable de son ERP l'achat de marchandises auprès du fournisseur Sedelec : 1 200,00 € HT, TVA à 20 % (240,00 €), règlement à 30 jours. L'écriture générée :</p><table><tr><th>Compte</th><th>Libellé</th><th>Débit</th><th>Crédit</th></tr><tr><th>607000</th><td>Achats de marchandises</td><td>1 200,00 €</td><td>—</td></tr><tr><th>445660</th><td>TVA déductible</td><td>240,00 €</td><td>—</td></tr><tr><th>401000</th><td>Fournisseur Sedelec</td><td>—</td><td>1 440,00 €</td></tr></table><p>Rappel : en partie double, tout ce qui est débité doit être crédité à l'identique. Répondez par le nombre seul pour les montants, oui ou non pour la question 3, et le numéro de compte pour la question 4.</p><ol><li>Quel est le total des débits de l'écriture, en euros ?</li><li>Quel est le total des crédits, en euros ?</li><li>L'écriture est-elle équilibrée ?</li><li>Quel compte est crédité dans cette écriture ?</li><li>Quel montant de TVA est enregistré au débit du compte 445660, en euros ?</li><li>Si le comptable ne saisissait que 1 200,00 € au crédit du compte fournisseur, quel écart de déséquilibre apparaîtrait, en euros ?</li></ol>",
    "starter": "# Exercice — L'écriture d'achat de la société Brumaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Montants : le nombre seul ; question 3 : oui ou non ; question 4 : le numéro de compte.\n\n[Question 1 — Total des débits (en €)]\nA_COMPLETER\n\n[Question 2 — Total des crédits (en €)]\nA_COMPLETER\n\n[Question 3 — Écriture équilibrée ?]\nA_COMPLETER\n\n[Question 4 — Compte crédité]\nA_COMPLETER\n\n[Question 5 — TVA au débit du 445660 (en €)]\nA_COMPLETER\n\n[Question 6 — Écart si le crédit n'était que de 1 200,00 € (en €)]\nA_COMPLETER\n",
    "hints": [
      "La partie double traduit chaque opération en au moins deux mouvements : les emplois au débit, les ressources au crédit.",
      "L'achat crée une charge (débit 607) et une créance d'État sur la TVA (débit 4456), financées par une dette fournisseur (crédit 401).",
      "1. Additionnez la colonne débit. 2. Additionnez la colonne crédit. 3. Comparez les deux totaux. 4. Cherchez la ligne qui porte un montant en crédit. 5. La TVA vaut 20 % du HT. 6. Recalculez le crédit total avec 1 200,00 € et comparez au débit."
    ],
    "examples": [
      {
        "stdin": "Prestalia facture une prestation de conseil : 500,00 € HT, TVA 20 % (100,00 €),\nrèglement immédiat par le client.\nÉcriture : 411000 Clients, débit 600,00 ; 706000 Prestations de services, crédit 500,00 ;\n445710 TVA collectée, crédit 100,00.\n\n1) Total des débits : 600,00 €.\n2) Total des crédits : 500,00 + 100,00 = 600,00 €.\n3) Écriture équilibrée : oui.",
        "expected": "débits 600,00 € — crédits 600,00 € — écriture équilibrée",
        "note": "Toute écriture déséquilibrée est refusée par l'ERP : la partie double est un garde-fou automatique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Total des débits (en €)",
        "stdin": "q:1",
        "expected": "1440||1 440||1440,00||1 440,00"
      },
      {
        "label": "Question 2 — Total des crédits (en €)",
        "stdin": "q:2",
        "expected": "1440||1 440||1440,00||1 440,00"
      },
      {
        "label": "Question 3 — Écriture équilibrée ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Compte crédité",
        "stdin": "q:4",
        "expected": "401000||401||le compte 401||401000 fournisseurs||le compte fournisseur"
      },
      {
        "label": "Question 5 — TVA au débit du 445660 (en €)",
        "stdin": "q:5",
        "expected": "240||240,00"
      },
      {
        "label": "Question 6 — Écart si le crédit n'était que de 1 200,00 € (en €)",
        "stdin": "q:6",
        "expected": "240||240,00"
      }
    ],
    "solution": "[Question 1 — Total des débits (en €)]\n1440\n\n[Question 2 — Total des crédits (en €)]\n1440\n\n[Question 3 — Écriture équilibrée ?]\noui\n\n[Question 4 — Compte crédité]\n401000\n\n[Question 5 — TVA au débit du 445660 (en €)]\n240\n\n[Question 6 — Écart si le crédit n'était que de 1 200,00 € (en €)]\n240",
    "takeaway": "1) Total des débits : 1 200,00 + 240,00 = 1 440,00 €.\n2) Total des crédits : 1 440,00 €.\n3) Débit = crédit = 1 440,00 € : l'écriture est équilibrée.\n4) Le compte crédité est le 401000 Fournisseur Sedelec, qui enregistre la dette.\n5) La TVA déductible portée au débit du 445660 est de 240,00 € (20 % de 1 200,00 €).\n6) Avec 1 200,00 € au crédit seulement : 1 440,00 − 1 200,00 = 240,00 € de déséquilibre (la TVA manquante).\nContrôle : 1 200,00 × 1,20 = 1 440,00 €, le montant exact de la dette fournisseur."
  },
  {
    "id": "erp2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La valorisation du stock de résine au PMP",
    "exampleTitle": "Exemple résolu — le stock d'adhésif chez Adhexa",
    "goal": "Recalculer le prix moyen pondéré d'un stock après chaque entrée en magasin et valoriser la sortie de l'atelier.",
    "brief": "<p><strong>Énoncé.</strong> Composites Nautiques, chantier de construction de bateaux, valorise son stock de résine au <strong>PMP</strong> (prix moyen pondéré), recalculé à chaque entrée : nouveau PMP = (ancienne quantité × ancien PMP + quantité entrée × prix d'entrée) ÷ nouvelle quantité totale. Le mois dernier :</p><ul><li>stock initial : <strong>300 kg</strong> de résine à <strong>10,00 €/kg</strong> ;</li><li>première entrée (réception de la commande R-81) : <strong>200 kg</strong> à <strong>15,00 €/kg</strong> ;</li><li>seconde entrée (réception de la commande R-84) : <strong>300 kg</strong> à <strong>16,00 €/kg</strong> ;</li><li>puis l'atelier consomme une sortie de <strong>100 kg</strong>.</li></ul><p>Les montants s'écrivent avec une virgule et deux décimales si besoin (par exemple 12,00). Répondez par le nombre seul.</p><ol><li>Après la première entrée, quelle est la quantité totale en stock, en kg ?</li><li>Quel est le nouveau PMP après la première entrée, en €/kg ?</li><li>Quelle est la valeur du stock après la première entrée, en euros ?</li><li>Quel est le PMP après la seconde entrée, en €/kg ?</li><li>Quelle est la valeur du stock après la seconde entrée, en euros ?</li><li>À quel prix la sortie de 100 kg de l'atelier est-elle valorisée, en €/kg ?</li></ol>",
    "starter": "# Exercice — La valorisation du stock de résine au PMP\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, virgule et deux décimales si besoin (par exemple 12,00).\n\n[Question 1 — Quantité en stock après la première entrée (en kg)]\nA_COMPLETER\n\n[Question 2 — PMP après la première entrée (en €/kg)]\nA_COMPLETER\n\n[Question 3 — Valeur du stock après la première entrée (en €)]\nA_COMPLETER\n\n[Question 4 — PMP après la seconde entrée (en €/kg)]\nA_COMPLETER\n\n[Question 5 — Valeur du stock après la seconde entrée (en €)]\nA_COMPLETER\n\n[Question 6 — Prix de valorisation de la sortie de 100 kg (en €/kg)]\nA_COMPLETER\n",
    "hints": [
      "Le PMP mélange la valeur de l'ancien stock et celle de l'entrée : c'est une moyenne pondérée par les quantités, pas une simple moyenne des prix.",
      "Les sorties n'ont aucun effet sur le PMP : elles partent au PMP en vigueur ; seules les entrées modifient la moyenne.",
      "1. Quantité = 300 + 200. 2. PMP = (300 × 10,00 + 200 × 15,00) ÷ 500. 3. Valeur = quantité × PMP. 4. Refaites le calcul avec le stock obtenu et l'entrée à 16,00 €. 5. Valeur = nouvelle quantité × nouveau PMP. 6. La sortie part au PMP courant, pas au dernier prix d'achat."
    ],
    "examples": [
      {
        "stdin": "Adhexa gère un stock d'adhésif au PMP : stock initial 100 kg à 8,00 €/kg,\npuis entrée de 100 kg à 10,00 €/kg.\n\n1) Nouvelle quantité : 200 kg.\n2) PMP : (100 × 8,00 + 100 × 10,00) ÷ 200 = 9,00 €/kg.\n3) Valeur du stock : 200 × 9,00 = 1 800,00 €.\n4) Une sortie de 50 kg part à 9,00 €/kg : le PMP ne change pas.",
        "expected": "quantité 200 kg — PMP 9,00 €/kg — valeur 1 800,00 € — sortie valorisée à 9,00 €/kg",
        "note": "La sortie ne modifie pas le PMP : tant qu'aucune nouvelle entrée n'a lieu, chaque départ part au même prix moyen."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Quantité en stock après la première entrée (en kg)",
        "stdin": "q:1",
        "expected": "500"
      },
      {
        "label": "Question 2 — PMP après la première entrée (en €/kg)",
        "stdin": "q:2",
        "expected": "12,00||12.00||12||12,0||12.0"
      },
      {
        "label": "Question 3 — Valeur du stock après la première entrée (en €)",
        "stdin": "q:3",
        "expected": "6000||6 000||6000,00||6 000,00"
      },
      {
        "label": "Question 4 — PMP après la seconde entrée (en €/kg)",
        "stdin": "q:4",
        "expected": "13,50||13.50||13,5||13.5"
      },
      {
        "label": "Question 5 — Valeur du stock après la seconde entrée (en €)",
        "stdin": "q:5",
        "expected": "10800||10 800||10800,00||10 800,00"
      },
      {
        "label": "Question 6 — Prix de valorisation de la sortie de 100 kg (en €/kg)",
        "stdin": "q:6",
        "expected": "13,50||13.50||13,5||13.5"
      }
    ],
    "solution": "[Question 1 — Quantité en stock après la première entrée (en kg)]\n500\n\n[Question 2 — PMP après la première entrée (en €/kg)]\n12,00\n\n[Question 3 — Valeur du stock après la première entrée (en €)]\n6000\n\n[Question 4 — PMP après la seconde entrée (en €/kg)]\n13,50\n\n[Question 5 — Valeur du stock après la seconde entrée (en €)]\n10800\n\n[Question 6 — Prix de valorisation de la sortie de 100 kg (en €/kg)]\n13,50",
    "takeaway": "1) Quantité après la première entrée : 300 + 200 = 500 kg.\n2) PMP : (300 × 10,00 + 200 × 15,00) ÷ 500 = (3 000 + 3 000) ÷ 500 = 12,00 €/kg.\n3) Valeur du stock : 500 × 12,00 = 6 000,00 €.\n4) PMP après la seconde entrée : (500 × 12,00 + 300 × 16,00) ÷ 800 = (6 000 + 4 800) ÷ 800 = 13,50 €/kg.\n5) Valeur du stock : 800 × 13,50 = 10 800,00 €.\n6) La sortie de 100 kg part au PMP en vigueur : 13,50 €/kg (le dernier prix d'achat, 16,00 €, n'est pas utilisé).\nContrôle : après la sortie, il reste 700 kg × 13,50 € = 9 450,00 € ; 10 800,00 − 1 350,00 = 9 450,00 €."
  },
  {
    "id": "erp2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La commande économique de lave-linge chez Delmas",
    "exampleTitle": "Exemple résolu — la commande économique d'aspirateurs chez Electradom",
    "goal": "Appliquer la formule de Wilson pour minimiser le coût total de gestion d'un stock.",
    "brief": "<p><strong>Énoncé.</strong> Delmas Électroménager, distributeur régional, vend chaque année <strong>3 600 lave-linge LW-300</strong>. Chaque commande passée au fabricant coûte <strong>50 €</strong> (frais administratifs et transport), et détenir une unité en stock pendant un an coûte <strong>4 €</strong> (capital immobilisé, assurance, entreposage). La formule de Wilson donne la quantité économique : Q* = racine carrée de (2 × D × S ÷ H), où D est la demande annuelle, S le coût de passation d'une commande et H le coût de possession unitaire annuel.</p><p>Répondez par le nombre seul, sans unité.</p><ol><li>Quelle est la quantité économique de commande Q* ?</li><li>Combien de commandes par an cette quantité implique-t-elle ?</li><li>Quel est le coût annuel total de passation des commandes, en euros ?</li><li>Le stock moyen étant de Q* ÷ 2, quel est le coût annuel de possession, en euros ?</li><li>Quel est le coût total annuel de gestion du stock (passation + possession), en euros ?</li><li>Sur une année de 360 jours, combien de jours s'écoulent en moyenne entre deux commandes ?</li></ol>",
    "starter": "# Exercice — La commande économique de lave-linge chez Delmas\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, sans unité.\n\n[Question 1 — Quantité économique Q*]\nA_COMPLETER\n\n[Question 2 — Nombre de commandes par an]\nA_COMPLETER\n\n[Question 3 — Coût annuel de passation (en €)]\nA_COMPLETER\n\n[Question 4 — Coût annuel de possession (en €)]\nA_COMPLETER\n\n[Question 5 — Coût total annuel de gestion (en €)]\nA_COMPLETER\n\n[Question 6 — Jours entre deux commandes (année de 360 jours)]\nA_COMPLETER\n",
    "hints": [
      "La formule de Wilson arbitre entre deux coûts qui varient en sens inverse : commander souvent coûte des passations, stocker beaucoup coûte de la possession.",
      "À la quantité économique, le coût de passation et le coût de possession s'équilibrent exactement.",
      "1. Q* = racine carrée de (2 × 3 600 × 50 ÷ 4). 2. Commandes = 3 600 ÷ Q*. 3. Passation = nombre de commandes × 50. 4. Stock moyen = Q* ÷ 2 ; possession = stock moyen × 4. 5. Additionnez passation et possession. 6. 360 ÷ nombre de commandes."
    ],
    "examples": [
      {
        "stdin": "Electradom écoule 3 200 aspirateurs par an ; passation 25 € par commande,\npossession 4 € par unité et par an.\n\n1) Q* = racine carrée de (2 × 3 200 × 25 ÷ 4) = racine de 40 000 = 200 unités.\n2) Commandes par an : 3 200 ÷ 200 = 16.\n3) Passation : 16 × 25 = 400 €.\n4) Stock moyen 100 unités ; possession : 100 × 4 = 400 €.\n5) Coût total : 400 + 400 = 800 €.",
        "expected": "Q* 200 — 16 commandes — passation 400 € — possession 400 € — total 800 €",
        "note": "À la quantité de Wilson, passation et possession sont égales : c'est la signature de l'optimum."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Quantité économique Q*",
        "stdin": "q:1",
        "expected": "300"
      },
      {
        "label": "Question 2 — Nombre de commandes par an",
        "stdin": "q:2",
        "expected": "12"
      },
      {
        "label": "Question 3 — Coût annuel de passation (en €)",
        "stdin": "q:3",
        "expected": "600||600,00"
      },
      {
        "label": "Question 4 — Coût annuel de possession (en €)",
        "stdin": "q:4",
        "expected": "600||600,00"
      },
      {
        "label": "Question 5 — Coût total annuel de gestion (en €)",
        "stdin": "q:5",
        "expected": "1200||1 200||1200,00||1 200,00"
      },
      {
        "label": "Question 6 — Jours entre deux commandes (année de 360 jours)",
        "stdin": "q:6",
        "expected": "30||30 jours"
      }
    ],
    "solution": "[Question 1 — Quantité économique Q*]\n300\n\n[Question 2 — Nombre de commandes par an]\n12\n\n[Question 3 — Coût annuel de passation (en €)]\n600\n\n[Question 4 — Coût annuel de possession (en €)]\n600\n\n[Question 5 — Coût total annuel de gestion (en €)]\n1200\n\n[Question 6 — Jours entre deux commandes (année de 360 jours)]\n30",
    "takeaway": "1) Q* = racine carrée de (2 × 3 600 × 50 ÷ 4) = racine carrée de 90 000 = 300 unités.\n2) Nombre de commandes : 3 600 ÷ 300 = 12 commandes par an.\n3) Coût annuel de passation : 12 × 50 = 600 €.\n4) Stock moyen : 300 ÷ 2 = 150 unités ; coût de possession : 150 × 4 = 600 €.\n5) Coût total annuel de gestion : 600 + 600 = 1 200 €.\n6) Intervalle entre deux commandes : 360 ÷ 12 = 30 jours.\nContrôle : à l'optimum de Wilson, passation (600 €) = possession (600 €), et leur somme (1 200 €) est le coût minimal."
  }
];
