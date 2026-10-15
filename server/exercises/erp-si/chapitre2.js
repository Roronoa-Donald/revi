/**
 * Chapitre 2 — Automatisation des processus & RPA.
 *
 * Trois fiches Python pour implémenter la logique des workflows et de l'automatisation :
 *   - erp2-c2-e1 : moteur de règles de validation hiérarchique de workflow ;
 *   - erp2-c2-e2 : automate RPA de contrôle de facture fournisseur ;
 *   - erp2-c2-e3 : machine à états finis de cycle de commande (BPMN).
 */
'use strict';

module.exports = [
  {
    id: 'erp2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'python',
    title: 'Circuit d’approbation de Workflow',
    goal: 'Aiguiller une demande d’achat vers le bon palier hiérarchique de validation selon son montant.',
    brief: '<p>Dans un moteur de Workflow d’ERP, les demandes de dépenses sont routées automatiquement ' +
      'vers différents niveaux d’autorité selon des règles de gestion prédéfinies :</p>' +
      '<ul>\n' +
      '  <li>Jusqu’à <code>500 EUR</code> inclus &rarr; <code>Validation automatique</code></li>\n' +
      '  <li>De <code>500.01</code> à <code>5000 EUR</code> inclus &rarr; <code>Validation Manager</code></li>\n' +
      '  <li>De <code>5000.01</code> à <code>50000 EUR</code> inclus &rarr; <code>Validation Directeur</code></li>\n' +
      '  <li>Strictement supérieur à <code>50000 EUR</code> &rarr; <code>Validation Direction Generale</code></li>\n' +
      '</ul>' +
      '<p>Lit le montant de la dépense sur l’entrée standard (nombre flottant ou entier positif) ' +
      'et affiche la décision sous la forme :<br>' +
      '<code>Circuit: &lt;Niveau d’approbation&gt;</code>.</p>',
    starter: `montant = float(input().strip())\n\n# À compléter : déterminer le palier d'approbation requis.\n`,
    hints: [
      'Utilise une série de conditions if / elif / else ordonnées du plus petit au plus grand seuil.',
      'Exemple : if montant <= 500: circuit = "Validation automatique".'
    ],
    examples: [
      {
        stdin: '350',
        expected: 'Circuit: Validation automatique',
        note: 'Montant inférieur à 500 EUR.'
      }
    ],
    tests: [
      {
        label: 'Seuil manager',
        stdin: '2450.50',
        expected: 'Circuit: Validation Manager'
      },
      {
        label: 'Seuil directeur exact',
        stdin: '50000',
        expected: 'Circuit: Validation Directeur'
      },
      {
        label: 'Gros investissement direction générale',
        stdin: '120000',
        expected: 'Circuit: Validation Direction Generale'
      }
    ],
    solution: `montant = float(input().strip())

if montant <= 500:
    circuit = "Validation automatique"
elif montant <= 5000:
    circuit = "Validation Manager"
elif montant <= 50000:
    circuit = "Validation Directeur"
else:
    circuit = "Validation Direction Generale"

print(f"Circuit: {circuit}")
`
  },
  {
    id: 'erp2-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'python',
    title: 'Automate RPA de contrôle de facture',
    goal: 'Vérifier la cohérence arithmétique d’une facture extraite par un robot RPA.',
    brief: '<p>Un robot d’automatisation (RPA) extrait des données comptables depuis des factures scannées (OCR). ' +
      'Avant injection dans l’ERP, il doit vérifier que le montant TTC correspond exactement au montant HT majoré de la TVA (20%).</p>' +
      '<p>Lit trois lignes sur l’entrée standard :<br>' +
      '1. Le numéro de facture (ex. <code>FAC-2026-081</code>)<br>' +
      '2. Le montant Hors Taxes (HT) en flottant (ex. <code>100.00</code>)<br>' +
      '3. Le montant Toutes Taxes Comprises (TTC) extrait de la facture (ex. <code>120.00</code>)<br>' +
      'Calcule le TTC théorique avec <code>round(ht * 1.20, 2)</code>.<br>' +
      '- Si la différence absolue entre le TTC extrait et le calculé est inférieure à <code>0.01</code> : ' +
      'affiche <code>Facture &lt;num&gt; conforme: HT=&lt;ht&gt; TTC=&lt;ttc&gt; EUR</code>.<br>' +
      '- Sinon : affiche <code>Anomalie facture &lt;num&gt;: TTC attendu &lt;attendu&gt; vs extrait &lt;extrait&gt; EUR</code>.</p>',
    starter: `num_facture = input().strip()\nht = float(input().strip())\nttc_lu = float(input().strip())\n\n# À compléter : valider l'intégrité de la facture avec la TVA à 20%.\n`,
    hints: [
      'ttc_theorique = round(ht * 1.20, 2).',
      'Compare abs(ttc_lu - ttc_theorique) < 0.01 pour tolérer les micro-arrondis.',
      'Formate les nombres avec :.2f pour un affichage soigné.'
    ],
    examples: [
      {
        stdin: 'FAC-2026-001\n100.0\n120.0',
        expected: 'Facture FAC-2026-001 conforme: HT=100.00 TTC=120.00 EUR',
        note: '100 + 20% = 120.'
      }
    ],
    tests: [
      {
        label: 'Facture avec centimes exacte',
        stdin: 'FAC-2026-042\n250.50\n300.60',
        expected: 'Facture FAC-2026-042 conforme: HT=250.50 TTC=300.60 EUR'
      },
      {
        label: 'Écart de calcul détecté par le robot',
        stdin: 'FAC-2026-099\n500.00\n620.00',
        expected: 'Anomalie facture FAC-2026-099: TTC attendu 600.00 vs extrait 620.00 EUR'
      },
      {
        label: 'Facture de service',
        stdin: 'FAC-2026-115\n1500.00\n1800.00',
        expected: 'Facture FAC-2026-115 conforme: HT=1500.00 TTC=1800.00 EUR'
      }
    ],
    solution: `num_facture = input().strip()
ht = float(input().strip())
ttc_lu = float(input().strip())

ttc_theorique = round(ht * 1.20, 2)

if abs(ttc_lu - ttc_theorique) < 0.01:
    print(f"Facture {num_facture} conforme: HT={ht:.2f} TTC={ttc_lu:.2f} EUR")
else:
    print(f"Anomalie facture {num_facture}: TTC attendu {ttc_theorique:.2f} vs extrait {ttc_lu:.2f} EUR")
`
  },
  {
    id: 'erp2-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'python',
    title: 'Machine à états de commande (BPMN)',
    goal: 'Valider le respect des transitions du cycle de vie d’une commande dans l’ERP.',
    brief: '<p>Dans un processus modélisé (BPMN), les commandes traversent des états successifs selon un cycle strict :</p>' +
      '<ul>\n' +
      '  <li><code>BROUILLON</code> &rarr; peut passer à <code>VALIDE</code> ou <code>ANNULE</code></li>\n' +
      '  <li><code>VALIDE</code> &rarr; peut passer à <code>EN_PREPARATION</code> ou <code>ANNULE</code></li>\n' +
      '  <li><code>EN_PREPARATION</code> &rarr; peut passer à <code>EXPEDIE</code></li>\n' +
      '  <li><code>EXPEDIE</code> &rarr; peut passer à <code>LIVRE</code> ou <code>RETOURNE</code></li>\n' +
      '  <li><code>LIVRE</code>, <code>ANNULE</code>, <code>RETOURNE</code> &rarr; états finaux (aucune transition autorisée).</li>\n' +
      '</ul>' +
      '<p>Lit deux lignes sur l’entrée standard (l’état actuel puis l’état demandé, en majuscules).<br>' +
      '- Si la transition est autorisée : affiche <code>Transition autorisee: &lt;actuel&gt; -&gt; &lt;cible&gt;</code>.<br>' +
      '- Sinon : affiche <code>Transition interdite: de &lt;actuel&gt; vers &lt;cible&gt;</code>.</p>',
    starter: `actuel = input().strip().upper()\ncible = input().strip().upper()\n\n# À compléter : valider la transition d'état du processus.\n`,
    hints: [
      'Définis un dictionnaire associant chaque état de départ à un ensemble (set) d’états cibles autorisés.',
      'Exemple : transitions = {"BROUILLON": {"VALIDE", "ANNULE"}, ...}.'
    ],
    examples: [
      {
        stdin: 'BROUILLON\nVALIDE',
        expected: 'Transition autorisee: BROUILLON -> VALIDE',
        note: 'Validation normale du devis.'
      }
    ],
    tests: [
      {
        label: 'Saut d’étape interdit',
        stdin: 'BROUILLON\nEXPEDIE',
        expected: 'Transition interdite: de BROUILLON vers EXPEDIE'
      },
      {
        label: 'Annulation en cours de préparation',
        stdin: 'VALIDE\nANNULE',
        expected: 'Transition autorisee: VALIDE -> ANNULE'
      },
      {
        label: 'Modification d’une commande déjà livrée',
        stdin: 'LIVRE\nEN_PREPARATION',
        expected: 'Transition interdite: de LIVRE vers EN_PREPARATION'
      }
    ],
    solution: `actuel = input().strip().upper()
cible = input().strip().upper()

transitions = {
    'BROUILLON': {'VALIDE', 'ANNULE'},
    'VALIDE': {'EN_PREPARATION', 'ANNULE'},
    'EN_PREPARATION': {'EXPEDIE'},
    'EXPEDIE': {'LIVRE', 'RETOURNE'},
    'LIVRE': set(),
    'ANNULE': set(),
    'RETOURNE': set()
}

autorisees = transitions.get(actuel, set())

if cible in autorisees:
    print(f"Transition autorisee: {actuel} -> {cible}")
else:
    print(f"Transition interdite: de {actuel} vers {cible}")
`
  }
];
