/**
 * Chapitre 4 — Processus métiers & Cycles ERP.
 *
 * Trois fiches Python sur les grands cycles de gestion de l'entreprise :
 *   - erp2-c4-e1 : rapprochement à 3 voies (Three-Way Matching) dans le cycle P2P ;
 *   - erp2-c4-e2 : calcul de remise sur volume et marge commerciale (cycle O2C) ;
 *   - erp2-c4-e3 : calcul des besoins nets (MRP / CBN) en gestion de production.
 */
'use strict';

module.exports = [
  {
    id: 'erp2-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'python',
    title: 'Rapprochement à trois voies (Three-Way Matching)',
    goal: 'Vérifier la concordance entre le bon de commande, le bon de réception et la facture fournisseur dans le cycle P2P.',
    brief: '<p>Le <strong>Three-Way Matching</strong> est le contrôle interne fondamental du cycle Procure-to-Pay (P2P). ' +
      'Avant de payer une facture fournisseur, l’ERP compare trois documents :<br>' +
      '1. Le <strong>Bon de Commande</strong> (quantité commandée et prix unitaire convenu)<br>' +
      '2. Le <strong>Bon de Réception</strong> (quantité physiquement reçue en entrepôt)<br>' +
      '3. La <strong>Facture</strong> (quantité facturée et prix unitaire facturé).</p>' +
      '<p>Lit 3 lignes sur l’entrée standard :<br>' +
      'Ligne 1 : <code>qte_commandee prix_commande</code> (ex. <code>100 15.0</code>)<br>' +
      'Ligne 2 : <code>qte_recue</code> (ex. <code>100</code>)<br>' +
      'Ligne 3 : <code>qte_facturee prix_facture</code> (ex. <code>100 15.0</code>)<br>' +
      '- Si <code>qte_recue == qte_commandee == qte_facturee</code> ET <code>abs(prix_commande - prix_facture) &lt; 0.01</code> :<br>' +
      '  affiche <code>Rapprochement valide: Bon a payer</code>.<br>' +
      '- Sinon, affiche <code>Anomalie rapprochement:</code> suivi des motifs d’anomalie parmi <code>Ecart quantite</code> et/ou <code>Ecart prix</code>.</p>',
    starter: `qte_cmd, prix_cmd = [float(x) for x in input().strip().split()]\nqte_recue = float(input().strip())\nqte_fac, prix_fac = [float(x) for x in input().strip().split()]\n\n# À compléter : comparer les trois documents et valider le bon à payer.\n`,
    hints: [
      'Vérifie d’abord si les 3 quantités sont strictement égales.',
      'Vérifie ensuite si abs(prix_cmd - prix_fac) < 0.01.',
      'Si écarts, ajoute "Ecart quantite" et/ou "Ecart prix" à une liste.'
    ],
    examples: [
      {
        stdin: '100 15.0\n100\n100 15.0',
        expected: 'Rapprochement valide: Bon a payer',
        note: 'Quantités et prix parfaitement concordants.'
      }
    ],
    tests: [
      {
        label: 'Écart de quantité livrée et facturée',
        stdin: '50 20.0\n40\n50 20.0',
        expected: 'Anomalie rapprochement: Ecart quantite'
      },
      {
        label: 'Écart de prix unitaire',
        stdin: '200 10.0\n200\n200 12.5',
        expected: 'Anomalie rapprochement: Ecart prix'
      },
      {
        label: 'Double écart quantité et prix',
        stdin: '10 100.0\n8\n10 110.0',
        expected: 'Anomalie rapprochement: Ecart quantite, Ecart prix'
      }
    ],
    solution: `qte_cmd, prix_cmd = [float(x) for x in input().strip().split()]
qte_recue = float(input().strip())
qte_fac, prix_fac = [float(x) for x in input().strip().split()]

anomalies = []

if not (qte_cmd == qte_recue == qte_fac):
    anomalies.append("Ecart quantite")

if abs(prix_cmd - prix_fac) >= 0.01:
    anomalies.append("Ecart prix")

if not anomalies:
    print("Rapprochement valide: Bon a payer")
else:
    print(f"Anomalie rapprochement: {', '.join(anomalies)}")
`
  },
  {
    id: 'erp2-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'python',
    title: 'Remise sur volume et marge commerciale (O2C)',
    goal: 'Calculer le chiffre d’affaires remisé et le taux de marge brute dans le cycle Order-to-Cash.',
    brief: '<p>Dans le module Ventes d’un ERP, la tarification applique automatiquement des remises ' +
      'quantitatives selon le volume d’achat client :</p>' +
      '<ul>\n' +
      '  <li>Moins de 10 unités : <code>0%</code> de remise</li>\n' +
      '  <li>De 10 à 49 unités inclus : <code>5%</code> de remise</li>\n' +
      '  <li>De 50 à 99 unités inclus : <code>10%</code> de remise</li>\n' +
      '  <li>100 unités ou plus : <code>15%</code> de remise</li>\n' +
      '</ul>' +
      '<p>Lit 3 lignes sur l’entrée standard :<br>' +
      '1. Prix unitaire de vente catalogue HT (float, ex. <code>50.0</code>)<br>' +
      '2. Coût de revient unitaire HT (float, ex. <code>30.0</code>)<br>' +
      '3. Quantité commandée (int, ex. <code>20</code>)<br>' +
      'Calcule :<br>' +
      '- Le pourcentage de remise appliquée (int : 0, 5, 10 ou 15)<br>' +
      '- Le chiffre d’affaires total HT remisé : <code>round(qte * prix_unitaire * (1 - remise/100), 2)</code><br>' +
      '- La marge brute totale : <code>round(ca_ht - (qte * cout_revient), 2)</code><br>' +
      '- Le taux de marge commerciale : <code>round((marge / ca_ht) * 100, 1)</code> en %<br>' +
      'Affiche : <code>Remise: &lt;r&gt;% | CA HT: &lt;ca&gt; EUR | Marge: &lt;m&gt; EUR | Taux: &lt;t&gt;%</code>.</p>',
    starter: `prix_unit = float(input().strip())\ncout_unit = float(input().strip())\nqte = int(input().strip())\n\n# À compléter : calculer la remise, le CA, la marge brute et le taux de marge.\n`,
    hints: [
      'Détermine le taux de remise selon la quantité.',
      'ca_ht = round(qte * prix_unit * (1 - remise / 100), 2).',
      'cout_total = qte * cout_unit.',
      'marge = round(ca_ht - cout_total, 2).',
      'taux = round((marge / ca_ht) * 100, 1).'
    ],
    examples: [
      {
        stdin: '50.0\n30.0\n20',
        expected: 'Remise: 5% | CA HT: 950.00 EUR | Marge: 350.00 EUR | Taux: 36.8%',
        note: '20 unités -> 5% de remise sur 50 EUR soit 47.50 EUR/u.'
      }
    ],
    tests: [
      {
        label: 'Vente au détail sans remise',
        stdin: '100.0\n60.0\n5',
        expected: 'Remise: 0% | CA HT: 500.00 EUR | Marge: 200.00 EUR | Taux: 40.0%'
      },
      {
        label: 'Gros volume palier 15%',
        stdin: '20.0\n10.0\n150',
        expected: 'Remise: 15% | CA HT: 2550.00 EUR | Marge: 1050.00 EUR | Taux: 41.2%'
      },
      {
        label: 'Palier 10%',
        stdin: '80.0\n50.0\n50',
        expected: 'Remise: 10% | CA HT: 3600.00 EUR | Marge: 1100.00 EUR | Taux: 30.6%'
      }
    ],
    solution: `prix_unit = float(input().strip())
cout_unit = float(input().strip())
qte = int(input().strip())

if qte >= 100:
    remise = 15
elif qte >= 50:
    remise = 10
elif qte >= 10:
    remise = 5
else:
    remise = 0

ca_ht = round(qte * prix_unit * (1 - remise / 100.0), 2)
cout_total = round(qte * cout_unit, 2)
marge = round(ca_ht - cout_total, 2)
taux = round((marge / ca_ht) * 100.0, 1)

print(f"Remise: {remise}% | CA HT: {ca_ht:.2f} EUR | Marge: {marge:.2f} EUR | Taux: {taux:.1f}%")
`
  },
  {
    id: 'erp2-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'python',
    title: 'Calcul des Besoins Nets (MRP / CBN)',
    goal: 'Calculer le besoin net d’approvisionnement ou de fabrication selon l’équation fondamentale du MRP.',
    brief: '<p>Le <strong>MRP</strong> (<em>Material Requirements Planning</em> / Calcul des Besoins Nets) est l’algorithme ' +
      'central des modules de production et de gestion des stocks de l’ERP.</p>' +
      '<p>Pour une période donnée, la formule canonique est :<br>' +
      '<code>Besoin Net = max(0, Besoin Brut - Stock Initial - Receptions Prevues + Stock Securite)</code>.</p>' +
      '<p>Lit 4 entiers positifs sur l’entrée standard :<br>' +
      '1. <code>Besoin Brut</code> (commandes clients et besoins de production)<br>' +
      '2. <code>Stock Initial</code> (quantité actuellement disponible en magasin)<br>' +
      '3. <code>Receptions Prevues</code> (commandes fournisseurs déjà en cours de livraison)<br>' +
      '4. <code>Stock Securite</code> (seuil d’alerte minimal requis en magasin)<br>' +
      'Calcule le <code>Besoin Net</code> :<br>' +
      '- Si <code>Besoin Net &gt; 0</code> : affiche <code>Besoin net: &lt;valeur&gt; | Ordre de fabrication: OUI</code>.<br>' +
      '- Si <code>Besoin Net == 0</code> : affiche <code>Besoin net: 0 | Ordre de fabrication: NON</code>.</p>',
    starter: `besoin_brut = int(input().strip())\nstock_initial = int(input().strip())\nreceptions_prevues = int(input().strip())\nstock_securite = int(input().strip())\n\n# À compléter : appliquer l'algorithme MRP pour calculer le besoin net.\n`,
    hints: [
      'Ressources disponibles = stock_initial + receptions_prevues.',
      'Demande totale = besoin_brut + stock_securite.',
      'besoin_net = max(0, demande_totale - ressources_disponibles).'
    ],
    examples: [
      {
        stdin: '150\n50\n20\n30',
        expected: 'Besoin net: 110 | Ordre de fabrication: OUI',
        note: '150 - 50 - 20 + 30 = 110.'
      }
    ],
    tests: [
      {
        label: 'Stock suffisant sans besoin de réapprovisionnement',
        stdin: '80\n100\n10\n20',
        expected: 'Besoin net: 0 | Ordre de fabrication: NON'
      },
      {
        label: 'Stock initial nul',
        stdin: '200\n0\n50\n25',
        expected: 'Besoin net: 175 | Ordre de fabrication: OUI'
      },
      {
        label: 'Équilibre parfait avec stock de sécurité atteint',
        stdin: '100\n50\n70\n20',
        expected: 'Besoin net: 0 | Ordre de fabrication: NON'
      }
    ],
    solution: `besoin_brut = int(input().strip())
stock_initial = int(input().strip())
receptions_prevues = int(input().strip())
stock_securite = int(input().strip())

besoin_net = max(0, besoin_brut - stock_initial - receptions_prevues + stock_securite)

if besoin_net > 0:
    print(f"Besoin net: {besoin_net} | Ordre de fabrication: OUI")
else:
    print("Besoin net: 0 | Ordre de fabrication: NON")
`
  }
];
