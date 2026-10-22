/**
 * chapitre5.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "erp2-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Équilibre comptable en partie double",
    goal: "Vérifier la stricte égalité entre le total Débit et le total Crédit d’une écriture comptable dans l’ERP.",
    brief: "<p>Dans le module comptable d’un ERP, toute écriture enregistrée doit impérativement respecter le principe de la <strong>partie double</strong> : la somme de tous les montants au débit doit être rigoureusement égale à la somme de tous les montants au crédit.</p><p>Analyse l’ensemble des lignes d’écritures fournies dans le cas. Chaque ligne contient :<br><code>compte montant_debit montant_credit</code> (ex. <code>411000 1200.00 0.00</code>).<br>Calcule la somme totale des débits et la somme totale des crédits.<br>- Si <code>abs(total_debit - total_credit) &lt; 0.01</code> :<br>  affiche <code>Ecriture equilibree: &lt;total&gt; EUR</code> (affiché avec 2 décimales).<br>- Sinon :<br>  affiche <code>Ecriture desequilibree: Debit=&lt;d&gt; Credit=&lt;c&gt; Ecart=&lt;e&gt; EUR</code>.</p>",
    starter: "# Grille d'analyse (erp2-c5-e1) — Équilibre comptable en partie double\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Écriture déséquilibrée avec écart]\n# Données : 607000 500.0 0.0\n# Données : 401000 0.0 450.0\nA_COMPLETER\n\n[Cas 2 — Règlement fournisseur avec banque équilibré]\n# Données : 401000 2500.50 0.0\n# Données : 512000 0.0 2500.50\nA_COMPLETER\n\n[Cas 3 — Opération complexe à 4 lignes]\n# Données : 512000 1000.0 0.0\n# Données : 627000 20.0 0.0\n# Données : 411000 0.0 1020.0\nA_COMPLETER\n",
    hints: [
          "Pour chaque ligne, découpe avec l’extraction des champs pour extraire compte, debit, credit.",
          "total_debit = sum(float(l’extraction des champs[1]) for l in lignes).",
          "total_credit = sum(float(l’extraction des champs[2]) for l in lignes)."
    ],
    examples: [
          {
                "stdin": "411000 1200.0 0.0\n707000 0.0 1000.0\n445710 0.0 200.0",
                "expected": "Ecriture equilibree: 1200.00 EUR",
                "note": "Débit = 1200.00, Crédit = 1000 + 200 = 1200.00."
          }
    ],
    tests: [
          {
                "label": "Écriture déséquilibrée avec écart",
                "stdin": "cas:1",
                "expected": "Ecriture desequilibree: Debit=500.00 Credit=450.00 Ecart=50.00 EUR"
          },
          {
                "label": "Règlement fournisseur avec banque équilibré",
                "stdin": "cas:2",
                "expected": "Ecriture equilibree: 2500.50 EUR"
          },
          {
                "label": "Opération complexe à 4 lignes",
                "stdin": "cas:3",
                "expected": "Ecriture equilibree: 1020.00 EUR"
          }
    ],
    solution: "[Exemple]\nEcriture equilibree: 1200.00 EUR\n\n[Cas 1 — Écriture déséquilibrée avec écart]\nEcriture desequilibree: Debit=500.00 Credit=450.00 Ecart=50.00 EUR\n\n[Cas 2 — Règlement fournisseur avec banque équilibré]\nEcriture equilibree: 2500.50 EUR\n\n[Cas 3 — Opération complexe à 4 lignes]\nEcriture equilibree: 1020.00 EUR\n"
  },
  {
    id: "erp2-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Valorisation des stocks au PMP",
    goal: "Calculer le nouveau Prix Moyen Pondéré et la valeur totale du stock après une entrée de marchandises.",
    brief: "<p>Dans le module Gestion des Stocks de l’ERP, la méthode comptable du <strong>PMP</strong> (<em>Prix Moyen Pondéré</em> après chaque entrée) recalcule la valeur unitaire moyenne du stock :</p><p><code>Nouveau PMP = ((Ancienne Qte * Ancien PMP) + (Qte Entree * Prix Entree)) / (Ancienne Qte + Qte Entree)</code>.</p><p>Analyse deux lignes fournies dans les données du cas :<br>Ligne 1 : État actuel du stock : <code>qte_ancienne pmp_ancien</code> (ex. <code>100 10.0</code>)<br>Ligne 2 : Entrée en magasin : <code>qte_entree prix_entree</code> (ex. <code>50 13.0</code>)<br>Calcule :<br>- La nouvelle quantité totale en stock (entier ou float)<br>- Le nouveau PMP unitaire arrondi à 2 décimales<br>- La valeur totale du stock : <code>round(nouvelle_qte * nouveau_pmp, 2)</code><br>Affiche : <code>Nouveau stock: &lt;qte&gt; | Nouveau PMP: &lt;pmp&gt; EUR | Valeur totale: &lt;valeur&gt; EUR</code>.</p>",
    starter: "# Grille d'analyse (erp2-c5-e2) — Valorisation des stocks au PMP\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Stock initial nul (première entrée)]\n# Données : 0 0.0\n# Données : 80 25.50\nA_COMPLETER\n\n[Cas 2 — Entrée à prix inférieur dépréciant le stock]\n# Données : 200 15.0\n# Données : 100 9.0\nA_COMPLETER\n\n[Cas 3 — Calcul avec arrondis aux centimes]\n# Données : 75 14.20\n# Données : 35 18.90\nA_COMPLETER\n",
    hints: [
          "valeur_anc = qte_anc * pmp_anc.",
          "valeur_in = qte_in * prix_in.",
          "nouvelle_qte = qte_anc + qte_in.",
          "nouveau_pmp = round((valeur_anc + valeur_in) / nouvelle_qte, 2)."
    ],
    examples: [
          {
                "stdin": "100 10.0\n50 13.0",
                "expected": "Nouveau stock: 150 | Nouveau PMP: 11.00 EUR | Valeur totale: 1650.00 EUR",
                "note": "(100*10 + 50*13) / 150 = 1650 / 150 = 11.00 EUR."
          }
    ],
    tests: [
          {
                "label": "Stock initial nul (première entrée)",
                "stdin": "cas:1",
                "expected": "Nouveau stock: 80 | Nouveau PMP: 25.50 EUR | Valeur totale: 2040.00 EUR"
          },
          {
                "label": "Entrée à prix inférieur dépréciant le stock",
                "stdin": "cas:2",
                "expected": "Nouveau stock: 300 | Nouveau PMP: 13.00 EUR | Valeur totale: 3900.00 EUR"
          },
          {
                "label": "Calcul avec arrondis aux centimes",
                "stdin": "cas:3",
                "expected": "Nouveau stock: 110 | Nouveau PMP: 15.70 EUR | Valeur totale: 1727.00 EUR"
          }
    ],
    solution: "[Exemple]\nNouveau stock: 150 | Nouveau PMP: 11.00 EUR | Valeur totale: 1650.00 EUR\n\n[Cas 1 — Stock initial nul (première entrée)]\nNouveau stock: 80 | Nouveau PMP: 25.50 EUR | Valeur totale: 2040.00 EUR\n\n[Cas 2 — Entrée à prix inférieur dépréciant le stock]\nNouveau stock: 300 | Nouveau PMP: 13.00 EUR | Valeur totale: 3900.00 EUR\n\n[Cas 3 — Calcul avec arrondis aux centimes]\nNouveau stock: 110 | Nouveau PMP: 15.70 EUR | Valeur totale: 1727.00 EUR\n"
  },
  {
    id: "erp2-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Formule de Wilson (Quantité Économique)",
    goal: "Déterminer la taille optimale de lot de commande (EOQ) pour minimiser les coûts logistiques.",
    brief: "<p>La <strong>formule de Wilson</strong> (ou modèle EOQ - <em>Economic Order Quantity</em>) permet au module d’approvisionnement d’optimiser la politique de réassort en arbitrant entre coût de commande et coût de stockage :</p><p><code>Q = sqrt((2 * D * S) / H)</code></p><p>où :<br>- <code>D</code> = Demande annuelle totale en unités (int)<br>- <code>S</code> = Coût fixe de passation d’une commande (EUR)<br>- <code>H</code> = Coût annuel de possession/stockage d’une unité (EUR/unité/an).</p><p>Analyse 3 lignes fournies dans les données du cas (D, S, H en nombres flottants ou entiers).<br>Calcule :<br>- La quantité économique optimale <code>Q</code> (arrondie à l’entier le plus proche avec <code>round(Q)</code>)<br>- Le nombre optimal de commandes par an : <code>N = round(D / Q_arrondi, 1)</code>.<br>Affiche : <code>Quantite economique: &lt;Q&gt; unites | Commandes par an: &lt;N&gt;</code>.</p>",
    starter: "# Grille d'analyse (erp2-c5-e3) — Formule de Wilson (Quantité Économique)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Produit à forte rotation]\n# Données : 100\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Coût de possession élevé]\n# Données : 40\n# Données : 10\nA_COMPLETER\n\n[Cas 3 — Petite série artisanale]\n# Données : 15\n# Données : 1.5\nA_COMPLETER\n",
    hints: [
          "q_opt = math.sqrt((2 * d * s) / h).",
          "q_arrondi = round(q_opt).",
          "nb_cmd = round(d / q_arrondi, 1)."
    ],
    examples: [
          {
                "stdin": "1000\n50\n4",
                "expected": "Quantite economique: 158 unites | Commandes par an: 6.3",
                "note": "sqrt(2*1000*50/4) = sqrt(25000) = 158.11 -> 158."
          }
    ],
    tests: [
          {
                "label": "Produit à forte rotation",
                "stdin": "cas:1",
                "expected": "Quantite economique: 707 unites | Commandes par an: 7.1"
          },
          {
                "label": "Coût de possession élevé",
                "stdin": "cas:2",
                "expected": "Quantite economique: 80 unites | Commandes par an: 10.0"
          },
          {
                "label": "Petite série artisanale",
                "stdin": "cas:3",
                "expected": "Quantite economique: 63 unites | Commandes par an: 3.2"
          }
    ],
    solution: "[Exemple]\nQuantite economique: 158 unites | Commandes par an: 6.3\n\n[Cas 1 — Produit à forte rotation]\nQuantite economique: 707 unites | Commandes par an: 7.1\n\n[Cas 2 — Coût de possession élevé]\nQuantite economique: 80 unites | Commandes par an: 10.0\n\n[Cas 3 — Petite série artisanale]\nQuantite economique: 63 unites | Commandes par an: 3.2\n"
  }
];
