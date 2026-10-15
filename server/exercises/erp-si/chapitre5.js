/**
 * Chapitre 5 — Modules fonctionnels de l'ERP.
 *
 * Trois fiches Python sur les calculs clés des modules fonctionnels :
 *   - erp2-c5-e1 : module Comptabilité — équilibre de la partie double (Débit/Crédit) ;
 *   - erp2-c5-e2 : module Stocks/Achats — calcul du Prix Moyen Pondéré (PMP) ;
 *   - erp2-c5-e3 : module Logistique/Appro — formule de Wilson (quantité économique).
 */
'use strict';

module.exports = [
  {
    id: 'erp2-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'python',
    title: 'Équilibre comptable en partie double',
    goal: 'Vérifier la stricte égalité entre le total Débit et le total Crédit d’une écriture comptable dans l’ERP.',
    brief: '<p>Dans le module comptable d’un ERP, toute écriture enregistrée doit impérativement respecter le principe ' +
      'de la <strong>partie double</strong> : la somme de tous les montants au débit doit être rigoureusement égale ' +
      'à la somme de tous les montants au crédit.</p>' +
      '<p>Lit l’ensemble des lignes d’écritures sur l’entrée standard jusqu’à EOF. Chaque ligne contient :<br>' +
      '<code>compte montant_debit montant_credit</code> (ex. <code>411000 1200.00 0.00</code>).<br>' +
      'Calcule la somme totale des débits et la somme totale des crédits.<br>' +
      '- Si <code>abs(total_debit - total_credit) &lt; 0.01</code> :<br>' +
      '  affiche <code>Ecriture equilibree: &lt;total&gt; EUR</code> (affiché avec 2 décimales).<br>' +
      '- Sinon :<br>' +
      '  affiche <code>Ecriture desequilibree: Debit=&lt;d&gt; Credit=&lt;c&gt; Ecart=&lt;e&gt; EUR</code>.</p>',
    starter: `import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\n\n# À compléter : sommer les débits et les crédits et vérifier l'équilibre.\n`,
    hints: [
      'Pour chaque ligne, découpe avec l.split() pour extraire compte, debit, credit.',
      'total_debit = sum(float(l.split()[1]) for l in lignes).',
      'total_credit = sum(float(l.split()[2]) for l in lignes).'
    ],
    examples: [
      {
        stdin: '411000 1200.0 0.0\n707000 0.0 1000.0\n445710 0.0 200.0',
        expected: 'Ecriture equilibree: 1200.00 EUR',
        note: 'Débit = 1200.00, Crédit = 1000 + 200 = 1200.00.'
      }
    ],
    tests: [
      {
        label: 'Écriture déséquilibrée avec écart',
        stdin: '607000 500.0 0.0\n401000 0.0 450.0',
        expected: 'Ecriture desequilibree: Debit=500.00 Credit=450.00 Ecart=50.00 EUR'
      },
      {
        label: 'Règlement fournisseur avec banque équilibré',
        stdin: '401000 2500.50 0.0\n512000 0.0 2500.50',
        expected: 'Ecriture equilibree: 2500.50 EUR'
      },
      {
        label: 'Opération complexe à 4 lignes',
        stdin: '512000 1000.0 0.0\n627000 20.0 0.0\n411000 0.0 1020.0',
        expected: 'Ecriture equilibree: 1020.00 EUR'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

total_debit = 0.0
total_credit = 0.0

for l in lignes:
    parties = l.split()
    total_debit += float(parties[1])
    total_credit += float(parties[2])

ecart = round(abs(total_debit - total_credit), 2)

if ecart < 0.01:
    print(f"Ecriture equilibree: {total_debit:.2f} EUR")
else:
    print(f"Ecriture desequilibree: Debit={total_debit:.2f} Credit={total_credit:.2f} Ecart={ecart:.2f} EUR")
`
  },
  {
    id: 'erp2-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'python',
    title: 'Valorisation des stocks au PMP',
    goal: 'Calculer le nouveau Prix Moyen Pondéré et la valeur totale du stock après une entrée de marchandises.',
    brief: '<p>Dans le module Gestion des Stocks de l’ERP, la méthode comptable du <strong>PMP</strong> ' +
      '(<em>Prix Moyen Pondéré</em> après chaque entrée) recalcule la valeur unitaire moyenne du stock :</p>' +
      '<p><code>Nouveau PMP = ((Ancienne Qte * Ancien PMP) + (Qte Entree * Prix Entree)) / (Ancienne Qte + Qte Entree)</code>.</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      'Ligne 1 : État actuel du stock : <code>qte_ancienne pmp_ancien</code> (ex. <code>100 10.0</code>)<br>' +
      'Ligne 2 : Entrée en magasin : <code>qte_entree prix_entree</code> (ex. <code>50 13.0</code>)<br>' +
      'Calcule :<br>' +
      '- La nouvelle quantité totale en stock (entier ou float)<br>' +
      '- Le nouveau PMP unitaire arrondi à 2 décimales<br>' +
      '- La valeur totale du stock : <code>round(nouvelle_qte * nouveau_pmp, 2)</code><br>' +
      'Affiche : <code>Nouveau stock: &lt;qte&gt; | Nouveau PMP: &lt;pmp&gt; EUR | Valeur totale: &lt;valeur&gt; EUR</code>.</p>',
    starter: `qte_anc, pmp_anc = [float(x) for x in input().strip().split()]\nqte_in, prix_in = [float(x) for x in input().strip().split()]\n\n# À compléter : calculer le nouveau PMP et la valorisation globale.\n`,
    hints: [
      'valeur_anc = qte_anc * pmp_anc.',
      'valeur_in = qte_in * prix_in.',
      'nouvelle_qte = qte_anc + qte_in.',
      'nouveau_pmp = round((valeur_anc + valeur_in) / nouvelle_qte, 2).'
    ],
    examples: [
      {
        stdin: '100 10.0\n50 13.0',
        expected: 'Nouveau stock: 150 | Nouveau PMP: 11.00 EUR | Valeur totale: 1650.00 EUR',
        note: '(100*10 + 50*13) / 150 = 1650 / 150 = 11.00 EUR.'
      }
    ],
    tests: [
      {
        label: 'Stock initial nul (première entrée)',
        stdin: '0 0.0\n80 25.50',
        expected: 'Nouveau stock: 80 | Nouveau PMP: 25.50 EUR | Valeur totale: 2040.00 EUR'
      },
      {
        label: 'Entrée à prix inférieur dépréciant le stock',
        stdin: '200 15.0\n100 9.0',
        expected: 'Nouveau stock: 300 | Nouveau PMP: 13.00 EUR | Valeur totale: 3900.00 EUR'
      },
      {
        label: 'Calcul avec arrondis aux centimes',
        stdin: '75 14.20\n35 18.90',
        expected: 'Nouveau stock: 110 | Nouveau PMP: 15.70 EUR | Valeur totale: 1727.00 EUR'
      }
    ],
    solution: `qte_anc, pmp_anc = [float(x) for x in input().strip().split()]
qte_in, prix_in = [float(x) for x in input().strip().split()]

valeur_anc = qte_anc * pmp_anc
valeur_in = qte_in * prix_in
nouvelle_qte = int(qte_anc + qte_in) if (qte_anc + qte_in).is_integer() else (qte_anc + qte_in)

nouveau_pmp = round((valeur_anc + valeur_in) / nouvelle_qte, 2)
valeur_totale = round(nouvelle_qte * nouveau_pmp, 2)

print(f"Nouveau stock: {nouvelle_qte} | Nouveau PMP: {nouveau_pmp:.2f} EUR | Valeur totale: {valeur_totale:.2f} EUR")
`
  },
  {
    id: 'erp2-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'python',
    title: 'Formule de Wilson (Quantité Économique)',
    goal: 'Déterminer la taille optimale de lot de commande (EOQ) pour minimiser les coûts logistiques.',
    brief: '<p>La <strong>formule de Wilson</strong> (ou modèle EOQ - <em>Economic Order Quantity</em>) permet ' +
      'au module d’approvisionnement d’optimiser la politique de réassort en arbitrant entre coût de commande et coût de stockage :</p>' +
      '<p><code>Q = sqrt((2 * D * S) / H)</code></p>' +
      '<p>où :<br>' +
      '- <code>D</code> = Demande annuelle totale en unités (int)<br>' +
      '- <code>S</code> = Coût fixe de passation d’une commande (EUR)<br>' +
      '- <code>H</code> = Coût annuel de possession/stockage d’une unité (EUR/unité/an).</p>' +
      '<p>Lit 3 lignes sur l’entrée standard (D, S, H en nombres flottants ou entiers).<br>' +
      'Calcule :<br>' +
      '- La quantité économique optimale <code>Q</code> (arrondie à l’entier le plus proche avec <code>round(Q)</code>)<br>' +
      '- Le nombre optimal de commandes par an : <code>N = round(D / Q_arrondi, 1)</code>.<br>' +
      'Affiche : <code>Quantite economique: &lt;Q&gt; unites | Commandes par an: &lt;N&gt;</code>.</p>',
    starter: `import math\n\nd = float(input().strip())\ns = float(input().strip())\nh = float(input().strip())\n\n# À compléter : appliquer la formule de Wilson.\n`,
    hints: [
      'q_opt = math.sqrt((2 * d * s) / h).',
      'q_arrondi = round(q_opt).',
      'nb_cmd = round(d / q_arrondi, 1).'
    ],
    examples: [
      {
        stdin: '1000\n50\n4',
        expected: 'Quantite economique: 158 unites | Commandes par an: 6.3',
        note: 'sqrt(2*1000*50/4) = sqrt(25000) = 158.11 -> 158.'
      }
    ],
    tests: [
      {
        label: 'Produit à forte rotation',
        stdin: '5000\n100\n2',
        expected: 'Quantite economique: 707 unites | Commandes par an: 7.1'
      },
      {
        label: 'Coût de possession élevé',
        stdin: '800\n40\n10',
        expected: 'Quantite economique: 80 unites | Commandes par an: 10.0'
      },
      {
        label: 'Petite série artisanale',
        stdin: '200\n15\n1.5',
        expected: 'Quantite economique: 63 unites | Commandes par an: 3.2'
      }
    ],
    solution: `import math

d = float(input().strip())
s = float(input().strip())
h = float(input().strip())

q_opt = math.sqrt((2.0 * d * s) / h)
q_arrondi = int(round(q_opt))
nb_cmd = round(d / q_arrondi, 1)

print(f"Quantite economique: {q_arrondi} unites | Commandes par an: {nb_cmd:.1f}")
`
  }
];
