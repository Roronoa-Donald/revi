/**
 * chapitre4.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "erp2-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Rapprochement à trois voies (Three-Way Matching)",
    goal: "Vérifier la concordance entre le bon de commande, le bon de réception et la facture fournisseur dans le cycle P2P.",
    brief: "<p>Le <strong>Three-Way Matching</strong> est le contrôle interne fondamental du cycle Procure-to-Pay (P2P). Avant de payer une facture fournisseur, l’ERP compare trois documents :<br>1. Le <strong>Bon de Commande</strong> (quantité commandée et prix unitaire convenu)<br>2. Le <strong>Bon de Réception</strong> (quantité physiquement reçue en entrepôt)<br>3. La <strong>Facture</strong> (quantité facturée et prix unitaire facturé).</p><p>Lit 3 lignes sur l’entrée standard :<br>Ligne 1 : <code>qte_commandee prix_commande</code> (ex. <code>100 15.0</code>)<br>Ligne 2 : <code>qte_recue</code> (ex. <code>100</code>)<br>Ligne 3 : <code>qte_facturee prix_facture</code> (ex. <code>100 15.0</code>)<br>- Si <code>qte_recue == qte_commandee == qte_facturee</code> ET <code>abs(prix_commande - prix_facture) &lt; 0.01</code> :<br>  affiche <code>Rapprochement valide: Bon a payer</code>.<br>- Sinon, affiche <code>Anomalie rapprochement:</code> suivi des motifs d’anomalie parmi <code>Ecart quantite</code> et/ou <code>Ecart prix</code>.</p>",
    starter: "# Grille d'analyse (erp2-c4-e1) — Rapprochement à trois voies (Three-Way Matching)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Écart de quantité livrée et facturée]\n# Données : 50 20.0\n# Données : 40\n# Données : 50 20.0\nA_COMPLETER\n\n[Cas 2 — Écart de prix unitaire]\n# Données : 200 10.0\n# Données : 200\n# Données : 200 12.5\nA_COMPLETER\n\n[Cas 3 — Double écart quantité et prix]\n# Données : 10 100.0\n# Données : 8\n# Données : 10 110.0\nA_COMPLETER\n",
    hints: [
          "Vérifie d’abord si les 3 quantités sont strictement égales.",
          "Vérifie ensuite si abs(prix_cmd - prix_fac) < 0.01.",
          "Si écarts, ajoute \"Ecart quantite\" et/ou \"Ecart prix\" à une liste."
    ],
    examples: [
          {
                "stdin": "100 15.0\n100\n100 15.0",
                "expected": "Rapprochement valide: Bon a payer",
                "note": "Quantités et prix parfaitement concordants."
          }
    ],
    tests: [
          {
                "label": "Écart de quantité livrée et facturée",
                "stdin": "cas:1",
                "expected": "Anomalie rapprochement: Ecart quantite"
          },
          {
                "label": "Écart de prix unitaire",
                "stdin": "cas:2",
                "expected": "Anomalie rapprochement: Ecart prix"
          },
          {
                "label": "Double écart quantité et prix",
                "stdin": "cas:3",
                "expected": "Anomalie rapprochement: Ecart quantite, Ecart prix"
          }
    ],
    solution: "[Exemple]\nRapprochement valide: Bon a payer\n\n[Cas 1 — Écart de quantité livrée et facturée]\nAnomalie rapprochement: Ecart quantite\n\n[Cas 2 — Écart de prix unitaire]\nAnomalie rapprochement: Ecart prix\n\n[Cas 3 — Double écart quantité et prix]\nAnomalie rapprochement: Ecart quantite, Ecart prix\n"
  },
  {
    id: "erp2-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Remise sur volume et marge commerciale (O2C)",
    goal: "Calculer le chiffre d’affaires remisé et le taux de marge brute dans le cycle Order-to-Cash.",
    brief: "<p>Dans le module Ventes d’un ERP, la tarification applique automatiquement des remises quantitatives selon le volume d’achat client :</p><ul>\n  <li>Moins de 10 unités : <code>0%</code> de remise</li>\n  <li>De 10 à 49 unités inclus : <code>5%</code> de remise</li>\n  <li>De 50 à 99 unités inclus : <code>10%</code> de remise</li>\n  <li>100 unités ou plus : <code>15%</code> de remise</li>\n</ul><p>Lit 3 lignes sur l’entrée standard :<br>1. Prix unitaire de vente catalogue HT (float, ex. <code>50.0</code>)<br>2. Coût de revient unitaire HT (float, ex. <code>30.0</code>)<br>3. Quantité commandée (int, ex. <code>20</code>)<br>Calcule :<br>- Le pourcentage de remise appliquée (int : 0, 5, 10 ou 15)<br>- Le chiffre d’affaires total HT remisé : <code>round(qte * prix_unitaire * (1 - remise/100), 2)</code><br>- La marge brute totale : <code>round(ca_ht - (qte * cout_revient), 2)</code><br>- Le taux de marge commerciale : <code>round((marge / ca_ht) * 100, 1)</code> en %<br>Affiche : <code>Remise: &lt;r&gt;% | CA HT: &lt;ca&gt; EUR | Marge: &lt;m&gt; EUR | Taux: &lt;t&gt;%</code>.</p>",
    starter: "# Grille d'analyse (erp2-c4-e2) — Remise sur volume et marge commerciale (O2C)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Vente au détail sans remise]\n# Données : 100.0\n# Données : 60.0\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Gros volume palier 15%]\n# Données : 20.0\n# Données : 10.0\n# Données : 150\nA_COMPLETER\n\n[Cas 3 — Palier 10%]\n# Données : 80.0\n# Données : 50.0\n# Données : 50\nA_COMPLETER\n",
    hints: [
          "Détermine le taux de remise selon la quantité.",
          "ca_ht = round(qte * prix_unit * (1 - remise / 100), 2).",
          "cout_total = qte * cout_unit.",
          "marge = round(ca_ht - cout_total, 2).",
          "taux = round((marge / ca_ht) * 100, 1)."
    ],
    examples: [
          {
                "stdin": "50.0\n30.0\n20",
                "expected": "Remise: 5% | CA HT: 950.00 EUR | Marge: 350.00 EUR | Taux: 36.8%",
                "note": "20 unités -> 5% de remise sur 50 EUR soit 47.50 EUR/u."
          }
    ],
    tests: [
          {
                "label": "Vente au détail sans remise",
                "stdin": "cas:1",
                "expected": "Remise: 0% | CA HT: 500.00 EUR | Marge: 200.00 EUR | Taux: 40.0%"
          },
          {
                "label": "Gros volume palier 15%",
                "stdin": "cas:2",
                "expected": "Remise: 15% | CA HT: 2550.00 EUR | Marge: 1050.00 EUR | Taux: 41.2%"
          },
          {
                "label": "Palier 10%",
                "stdin": "cas:3",
                "expected": "Remise: 10% | CA HT: 3600.00 EUR | Marge: 1100.00 EUR | Taux: 30.6%"
          }
    ],
    solution: "[Exemple]\nRemise: 5% | CA HT: 950.00 EUR | Marge: 350.00 EUR | Taux: 36.8%\n\n[Cas 1 — Vente au détail sans remise]\nRemise: 0% | CA HT: 500.00 EUR | Marge: 200.00 EUR | Taux: 40.0%\n\n[Cas 2 — Gros volume palier 15%]\nRemise: 15% | CA HT: 2550.00 EUR | Marge: 1050.00 EUR | Taux: 41.2%\n\n[Cas 3 — Palier 10%]\nRemise: 10% | CA HT: 3600.00 EUR | Marge: 1100.00 EUR | Taux: 30.6%\n"
  },
  {
    id: "erp2-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Calcul des Besoins Nets (MRP / CBN)",
    goal: "Calculer le besoin net d’approvisionnement ou de fabrication selon l’équation fondamentale du MRP.",
    brief: "<p>Le <strong>MRP</strong> (<em>Material Requirements Planning</em> / Calcul des Besoins Nets) est l’algorithme central des modules de production et de gestion des stocks de l’ERP.</p><p>Pour une période donnée, la formule canonique est :<br><code>Besoin Net = max(0, Besoin Brut - Stock Initial - Receptions Prevues + Stock Securite)</code>.</p><p>Lit 4 entiers positifs sur l’entrée standard :<br>1. <code>Besoin Brut</code> (commandes clients et besoins de production)<br>2. <code>Stock Initial</code> (quantité actuellement disponible en magasin)<br>3. <code>Receptions Prevues</code> (commandes fournisseurs déjà en cours de livraison)<br>4. <code>Stock Securite</code> (seuil d’alerte minimal requis en magasin)<br>Calcule le <code>Besoin Net</code> :<br>- Si <code>Besoin Net &gt; 0</code> : affiche <code>Besoin net: &lt;valeur&gt; | Ordre de fabrication: OUI</code>.<br>- Si <code>Besoin Net == 0</code> : affiche <code>Besoin net: 0 | Ordre de fabrication: NON</code>.</p>",
    starter: "# Grille d'analyse (erp2-c4-e3) — Calcul des Besoins Nets (MRP / CBN)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Stock suffisant sans besoin de réapprovisionnement]\n# Données : 100\n# Données : 10\n# Données : 20\nA_COMPLETER\n\n[Cas 2 — Stock initial nul]\n# Données : 0\n# Données : 50\n# Données : 25\nA_COMPLETER\n\n[Cas 3 — Équilibre parfait avec stock de sécurité atteint]\n# Données : 50\n# Données : 70\n# Données : 20\nA_COMPLETER\n",
    hints: [
          "Ressources disponibles = stock_initial + receptions_prevues.",
          "Demande totale = besoin_brut + stock_securite.",
          "besoin_net = max(0, demande_totale - ressources_disponibles)."
    ],
    examples: [
          {
                "stdin": "150\n50\n20\n30",
                "expected": "Besoin net: 110 | Ordre de fabrication: OUI",
                "note": "150 - 50 - 20 + 30 = 110."
          }
    ],
    tests: [
          {
                "label": "Stock suffisant sans besoin de réapprovisionnement",
                "stdin": "cas:1",
                "expected": "Besoin net: 0 | Ordre de fabrication: NON"
          },
          {
                "label": "Stock initial nul",
                "stdin": "cas:2",
                "expected": "Besoin net: 175 | Ordre de fabrication: OUI"
          },
          {
                "label": "Équilibre parfait avec stock de sécurité atteint",
                "stdin": "cas:3",
                "expected": "Besoin net: 0 | Ordre de fabrication: NON"
          }
    ],
    solution: "[Exemple]\nBesoin net: 110 | Ordre de fabrication: OUI\n\n[Cas 1 — Stock suffisant sans besoin de réapprovisionnement]\nBesoin net: 0 | Ordre de fabrication: NON\n\n[Cas 2 — Stock initial nul]\nBesoin net: 175 | Ordre de fabrication: OUI\n\n[Cas 3 — Équilibre parfait avec stock de sécurité atteint]\nBesoin net: 0 | Ordre de fabrication: NON\n"
  }
];
