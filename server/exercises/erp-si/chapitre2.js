/**
 * chapitre2.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "erp2-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Circuit d’approbation de Workflow",
    goal: "Aiguiller une demande d’achat vers le bon palier hiérarchique de validation selon son montant.",
    brief: "<p>Dans un moteur de Workflow d’ERP, les demandes de dépenses sont routées automatiquement vers différents niveaux d’autorité selon des règles de gestion prédéfinies :</p><ul>\n  <li>Jusqu’à <code>500 EUR</code> inclus &rarr; <code>Validation automatique</code></li>\n  <li>De <code>500.01</code> à <code>5000 EUR</code> inclus &rarr; <code>Validation Manager</code></li>\n  <li>De <code>5000.01</code> à <code>50000 EUR</code> inclus &rarr; <code>Validation Directeur</code></li>\n  <li>Strictement supérieur à <code>50000 EUR</code> &rarr; <code>Validation Direction Generale</code></li>\n</ul><p>Lit le montant de la dépense sur l’entrée standard (nombre flottant ou entier positif) et affiche la décision sous la forme :<br><code>Circuit: &lt;Niveau d’approbation&gt;</code>.</p>",
    starter: "# Grille d'analyse (erp2-c2-e1) — Circuit d’approbation de Workflow\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Seuil manager]\n# Données : 2450.50\nA_COMPLETER\n\n[Cas 2 — Seuil directeur exact]\n# Données : 50000\nA_COMPLETER\n\n[Cas 3 — Gros investissement direction générale]\n# Données : 120000\nA_COMPLETER\n",
    hints: [
          "Utilise une série de conditions if / elif / else ordonnées du plus petit au plus grand seuil.",
          "Exemple : if montant <= 500: circuit = \"Validation automatique\"."
    ],
    examples: [
          {
                "stdin": "350",
                "expected": "Circuit: Validation automatique",
                "note": "Montant inférieur à 500 EUR."
          }
    ],
    tests: [
          {
                "label": "Seuil manager",
                "stdin": "cas:1",
                "expected": "Circuit: Validation Manager"
          },
          {
                "label": "Seuil directeur exact",
                "stdin": "cas:2",
                "expected": "Circuit: Validation Directeur"
          },
          {
                "label": "Gros investissement direction générale",
                "stdin": "cas:3",
                "expected": "Circuit: Validation Direction Generale"
          }
    ],
    solution: "[Exemple]\nCircuit: Validation automatique\n\n[Cas 1 — Seuil manager]\nCircuit: Validation Manager\n\n[Cas 2 — Seuil directeur exact]\nCircuit: Validation Directeur\n\n[Cas 3 — Gros investissement direction générale]\nCircuit: Validation Direction Generale\n"
  },
  {
    id: "erp2-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Automate RPA de contrôle de facture",
    goal: "Vérifier la cohérence arithmétique d’une facture extraite par un robot RPA.",
    brief: "<p>Un robot d’automatisation (RPA) extrait des données comptables depuis des factures scannées (OCR). Avant injection dans l’ERP, il doit vérifier que le montant TTC correspond exactement au montant HT majoré de la TVA (20%).</p><p>Lit trois lignes sur l’entrée standard :<br>1. Le numéro de facture (ex. <code>FAC-2026-081</code>)<br>2. Le montant Hors Taxes (HT) en flottant (ex. <code>100.00</code>)<br>3. Le montant Toutes Taxes Comprises (TTC) extrait de la facture (ex. <code>120.00</code>)<br>Calcule le TTC théorique avec <code>round(ht * 1.20, 2)</code>.<br>- Si la différence absolue entre le TTC extrait et le calculé est inférieure à <code>0.01</code> : affiche <code>Facture &lt;num&gt; conforme: HT=&lt;ht&gt; TTC=&lt;ttc&gt; EUR</code>.<br>- Sinon : affiche <code>Anomalie facture &lt;num&gt;: TTC attendu &lt;attendu&gt; vs extrait &lt;extrait&gt; EUR</code>.</p>",
    starter: "# Grille d'analyse (erp2-c2-e2) — Automate RPA de contrôle de facture\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Facture avec centimes exacte]\n# Données : FAC-2026-042\n# Données : 250.50\n# Données : 300.60\nA_COMPLETER\n\n[Cas 2 — Écart de calcul détecté par le robot]\n# Données : FAC-2026-099\n# Données : 500.00\n# Données : 620.00\nA_COMPLETER\n\n[Cas 3 — Facture de service]\n# Données : FAC-2026-115\n# Données : 1500.00\n# Données : 1800.00\nA_COMPLETER\n",
    hints: [
          "ttc_theorique = round(ht * 1.20, 2).",
          "Compare abs(ttc_lu - ttc_theorique) < 0.01 pour tolérer les micro-arrondis.",
          "Formate les nombres avec :.2f pour un affichage soigné."
    ],
    examples: [
          {
                "stdin": "FAC-2026-001\n100.0\n120.0",
                "expected": "Facture FAC-2026-001 conforme: HT=100.00 TTC=120.00 EUR",
                "note": "100 + 20% = 120."
          }
    ],
    tests: [
          {
                "label": "Facture avec centimes exacte",
                "stdin": "cas:1",
                "expected": "Facture FAC-2026-042 conforme: HT=250.50 TTC=300.60 EUR"
          },
          {
                "label": "Écart de calcul détecté par le robot",
                "stdin": "cas:2",
                "expected": "Anomalie facture FAC-2026-099: TTC attendu 600.00 vs extrait 620.00 EUR"
          },
          {
                "label": "Facture de service",
                "stdin": "cas:3",
                "expected": "Facture FAC-2026-115 conforme: HT=1500.00 TTC=1800.00 EUR"
          }
    ],
    solution: "[Exemple]\nFacture FAC-2026-001 conforme: HT=100.00 TTC=120.00 EUR\n\n[Cas 1 — Facture avec centimes exacte]\nFacture FAC-2026-042 conforme: HT=250.50 TTC=300.60 EUR\n\n[Cas 2 — Écart de calcul détecté par le robot]\nAnomalie facture FAC-2026-099: TTC attendu 600.00 vs extrait 620.00 EUR\n\n[Cas 3 — Facture de service]\nFacture FAC-2026-115 conforme: HT=1500.00 TTC=1800.00 EUR\n"
  },
  {
    id: "erp2-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Machine à états de commande (BPMN)",
    goal: "Valider le respect des transitions du cycle de vie d’une commande dans l’ERP.",
    brief: "<p>Dans un processus modélisé (BPMN), les commandes traversent des états successifs selon un cycle strict :</p><ul>\n  <li><code>BROUILLON</code> &rarr; peut passer à <code>VALIDE</code> ou <code>ANNULE</code></li>\n  <li><code>VALIDE</code> &rarr; peut passer à <code>EN_PREPARATION</code> ou <code>ANNULE</code></li>\n  <li><code>EN_PREPARATION</code> &rarr; peut passer à <code>EXPEDIE</code></li>\n  <li><code>EXPEDIE</code> &rarr; peut passer à <code>LIVRE</code> ou <code>RETOURNE</code></li>\n  <li><code>LIVRE</code>, <code>ANNULE</code>, <code>RETOURNE</code> &rarr; états finaux (aucune transition autorisée).</li>\n</ul><p>Lit deux lignes sur l’entrée standard (l’état actuel puis l’état demandé, en majuscules).<br>- Si la transition est autorisée : affiche <code>Transition autorisee: &lt;actuel&gt; -&gt; &lt;cible&gt;</code>.<br>- Sinon : affiche <code>Transition interdite: de &lt;actuel&gt; vers &lt;cible&gt;</code>.</p>",
    starter: "# Grille d'analyse (erp2-c2-e3) — Machine à états de commande (BPMN)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Saut d’étape interdit]\n# Données : BROUILLON\n# Données : EXPEDIE\nA_COMPLETER\n\n[Cas 2 — Annulation en cours de préparation]\n# Données : VALIDE\n# Données : ANNULE\nA_COMPLETER\n\n[Cas 3 — Modification d’une commande déjà livrée]\n# Données : LIVRE\n# Données : EN_PREPARATION\nA_COMPLETER\n",
    hints: [
          "Définis un dictionnaire associant chaque état de départ à un ensemble (set) d’états cibles autorisés.",
          "Exemple : transitions = {\"BROUILLON\": {\"VALIDE\", \"ANNULE\"}, ...}."
    ],
    examples: [
          {
                "stdin": "BROUILLON\nVALIDE",
                "expected": "Transition autorisee: BROUILLON -> VALIDE",
                "note": "Validation normale du devis."
          }
    ],
    tests: [
          {
                "label": "Saut d’étape interdit",
                "stdin": "cas:1",
                "expected": "Transition interdite: de BROUILLON vers EXPEDIE"
          },
          {
                "label": "Annulation en cours de préparation",
                "stdin": "cas:2",
                "expected": "Transition autorisee: VALIDE -> ANNULE"
          },
          {
                "label": "Modification d’une commande déjà livrée",
                "stdin": "cas:3",
                "expected": "Transition interdite: de LIVRE vers EN_PREPARATION"
          }
    ],
    solution: "[Exemple]\nTransition autorisee: BROUILLON -> VALIDE\n\n[Cas 1 — Saut d’étape interdit]\nTransition interdite: de BROUILLON vers EXPEDIE\n\n[Cas 2 — Annulation en cours de préparation]\nTransition autorisee: VALIDE -> ANNULE\n\n[Cas 3 — Modification d’une commande déjà livrée]\nTransition interdite: de LIVRE vers EN_PREPARATION\n"
  }
];
