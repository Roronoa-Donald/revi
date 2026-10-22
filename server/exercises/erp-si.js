/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "erp2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Composantes du Système d’Information",
    "goal": "Qualifier un élément de l’entreprise selon les 5 composantes fondamentales du SI.",
    "brief": "<p>Un Système d’Information (SI) est un ensemble organisé de ressources réparties en 5 composantes : <strong>Materiel</strong> (serveurs, postes, réseaux), <strong>Logiciel</strong> (ERP, OS, outils), <strong>Donnees</strong> (bases SQL, fichiers clients), <strong>Humain</strong> (utilisateurs, DSI, comptables) et <strong>Processus</strong> (procédures de vente, validation de congés, chaîne d’approvisionnement).</p><p>Analyse un identifiant de ressource fourni(e) dans les données du cas (en minuscules, sans espaces) et affiche sa composante :<br>- <code>serveur</code>, <code>routeur</code>, <code>ordinateur</code> &rarr; <code>Materiel</code><br>- <code>progiciel_erp</code>, <code>systeme_os</code>, <code>antivirus</code> &rarr; <code>Logiciel</code><br>- <code>base_clients</code>, <code>catalogue_produits</code>, <code>factures_pdf</code> &rarr; <code>Donnees</code><br>- <code>administrateur</code>, <code>comptable</code>, <code>chef_projet</code> &rarr; <code>Humain</code><br>- <code>procedure_achat</code>, <code>cycle_facturation</code>, <code>validation_conges</code> &rarr; <code>Processus</code><br>Pour toute autre valeur non répertoriée, affiche <code>Inconnu</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c1-e1) — Composantes du Système d’Information\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Ressource logicielle]\n# Données : progiciel_erp\nA_COMPLETER\n\n[Cas 2 — Ressource humaine]\n# Données : comptable\nA_COMPLETER\n\n[Cas 3 — Procédure métier]\n# Données : procedure_achat\nA_COMPLETER\n",
    "hints": [
      "Utilisez un la grille de critères associant chaque mot-clé à sa composante.",
      "Utilisez table.get(ressource, \"Inconnu\") pour la valeur par défaut."
    ],
    "examples": [
      {
        "stdin": "serveur",
        "expected": "Composante: Materiel",
        "note": "Le serveur physique relève de la composante matérielle."
      }
    ],
    "tests": [
      {
        "label": "Ressource logicielle",
        "stdin": "cas:1",
        "expected": "Composante: Logiciel"
      },
      {
        "label": "Ressource humaine",
        "stdin": "cas:2",
        "expected": "Composante: Humain"
      },
      {
        "label": "Procédure métier",
        "stdin": "cas:3",
        "expected": "Composante: Processus"
      }
    ],
    "solution": "[Exemple]\nComposante: Materiel\n\n[Cas 1 — Ressource logicielle]\nComposante: Logiciel\n\n[Cas 2 — Ressource humaine]\nComposante: Humain\n\n[Cas 3 — Procédure métier]\nComposante: Processus\n"
  },
  {
    "id": "erp2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Détection des silos de données",
    "goal": "Comparer deux fiches issues d’applications cloisonnées et identifier les données discordantes.",
    "brief": "<p>Avant l’unification par un ERP, les services d’une entreprise maintiennent leurs propres bases (silos). Une même entité (ex. un client) s’y retrouve avec des informations contradictoires.</p><p>Analyse deux lignes JSON fournies dans les données du cas :<br>Ligne 1 : fiche client issue du CRM (ex. <code>{\"nom\": \"Dupont\", \"ville\": \"Lyon\", \"solde\": 150}</code>)<br>Ligne 2 : fiche client issue de la Comptabilité (ex. <code>{\"nom\": \"Dupont\", \"ville\": \"Paris\", \"solde\": 150}</code>)<br>Comparez les valeurs pour chaque clé commune (triées par ordre alphabétique).<br>Si toutes les valeurs communes sont identiques, affiche : <code>Donnees synchronisees</code>.<br>Sinon, affichezz chaque divergence sur une ligne dédiée :<br><code>Divergence &lt;cle&gt;: CRM=&lt;val_crm&gt; vs Compta=&lt;val_compta&gt;</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c1-e2) — Détection des silos de données\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux divergences simultanées]\n# Données : {\"adresse\": \"12 Rue Paix\", \"email\": \"a@test.com\", \"nom\": \"Alpha\"}\n# Données : {\"adresse\": \"14 Rue Paix\", \"email\": \"b@test.com\", \"nom\": \"Alpha\"}\nA_COMPLETER\n\n[Cas 2 — Fiches parfaitement synchronisées]\n# Données : {\"code\": \"C10\", \"nom\": \"Beta\"}\n# Données : {\"code\": \"C10\", \"nom\": \"Beta\"}\nA_COMPLETER\n\n[Cas 3 — Divergence sur un montant numérique]\n# Données : {\"nom\": \"Gamma\", \"plafond\": 5000}\n# Données : {\"nom\": \"Gamma\", \"plafond\": 3000}\nA_COMPLETER\n",
    "hints": [
      "Identifiez les entités clientes présentes simultanément dans le module CRM et le module Comptabilité.",
      "Comparez les montants enregistrés pour détecter les discordances d’encours client entre les deux modules."
    ],
    "examples": [
      {
        "stdin": "{\"nom\": \"Dupont\", \"solde\": 150, \"ville\": \"Lyon\"}\n{\"nom\": \"Dupont\", \"solde\": 150, \"ville\": \"Paris\"}",
        "expected": "Divergence ville: CRM=Lyon vs Compta=Paris",
        "note": "La ville est différente entre les deux services."
      }
    ],
    "tests": [
      {
        "label": "Deux divergences simultanées",
        "stdin": "cas:1",
        "expected": "Divergence adresse: CRM=12 Rue Paix vs Compta=14 Rue Paix\nDivergence email: CRM=a@test.com vs Compta=b@test.com"
      },
      {
        "label": "Fiches parfaitement synchronisées",
        "stdin": "cas:2",
        "expected": "Donnees synchronisees"
      },
      {
        "label": "Divergence sur un montant numérique",
        "stdin": "cas:3",
        "expected": "Divergence plafond: CRM=5000 vs Compta=3000"
      }
    ],
    "solution": "[Exemple]\nDivergence ville: CRM=Lyon vs Compta=Paris\n\n[Cas 1 — Deux divergences simultanées]\nDivergence adresse: CRM=12 Rue Paix vs Compta=14 Rue Paix\nDivergence email: CRM=a@test.com vs Compta=b@test.com\n\n[Cas 2 — Fiches parfaitement synchronisées]\nDonnees synchronisees\n\n[Cas 3 — Divergence sur un montant numérique]\nDivergence plafond: CRM=5000 vs Compta=3000\n"
  },
  {
    "id": "erp2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Calcul du coût total de possession (TCO)",
    "goal": "Évaluer le TCO sur 5 ans d’un projet ERP intégrant investissement initial et coûts récurrents.",
    "brief": "<p>Le <strong>TCO</strong> (<em>Total Cost of Ownership</em>) quantifie l’ensemble des dépenses directes et indirectes associées à un système d’information sur son cycle de vie (généralement 5 ans).</p><p>Analyse six lignes d’entiers fournies dans les données du cas représentant :<br>1. Coût des licences initiales (EUR)<br>2. Coût de l’intégration et du paramétrage (EUR)<br>3. Coût de la formation initiale des utilisateurs (EUR)<br>4. Coût annuel de la maintenance logicielle (EUR/an)<br>5. Coût annuel de l’hébergement et de l’infrastructure (EUR/an)<br>6. Coût annuel du support utilisateur (EUR/an)<br>Calculez et affiche :<br>- <code>Investissement initial: &lt;somme_initiale&gt; EUR</code><br>- <code>Cout recurrent 5 ans: &lt;somme_annuelle * 5&gt; EUR</code><br>- <code>TCO 5 ans: &lt;total_global&gt; EUR</code></p>",
    "starter": "# Grille d'analyse (erp2-c1-e3) — Calcul du coût total de possession (TCO)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Grand compte multi-sites]\n# Données : 450000\n# Données : 80000\n# Données : 40000\n# Données : 25000\n# Données : 15000\nA_COMPLETER\n\n[Cas 2 — Projet léger sans hébergement dédié]\n# Données : 25000\n# Données : 5000\n# Données : 3000\n# Données : 1000\n# Données : 2000\nA_COMPLETER\n\n[Cas 3 — Budget minimaliste]\n# Données : 10000\n# Données : 2000\n# Données : 1000\n# Données : 500\n# Données : 500\nA_COMPLETER\n",
    "hints": [
      "Investissement initial = licences + integration + formation.",
      "Coût récurrent 5 ans = (maintenance_an + infra_an + support_an) * 5.",
      "TCO = initial + recurrent."
    ],
    "examples": [
      {
        "stdin": "50000\n80000\n20000\n10000\n6000\n4000",
        "expected": "Investissement initial: 150000 EUR\nCout recurrent 5 ans: 100000 EUR\nTCO 5 ans: 250000 EUR",
        "note": "Projet PME classique sur 5 ans."
      }
    ],
    "tests": [
      {
        "label": "Grand compte multi-sites",
        "stdin": "cas:1",
        "expected": "Investissement initial: 730000 EUR\nCout recurrent 5 ans: 400000 EUR\nTCO 5 ans: 1130000 EUR"
      },
      {
        "label": "Projet léger sans hébergement dédié",
        "stdin": "cas:2",
        "expected": "Investissement initial: 45000 EUR\nCout recurrent 5 ans: 30000 EUR\nTCO 5 ans: 75000 EUR"
      },
      {
        "label": "Budget minimaliste",
        "stdin": "cas:3",
        "expected": "Investissement initial: 17000 EUR\nCout recurrent 5 ans: 10000 EUR\nTCO 5 ans: 27000 EUR"
      }
    ],
    "solution": "[Exemple]\nInvestissement initial: 150000 EUR\nCout recurrent 5 ans: 100000 EUR\nTCO 5 ans: 250000 EUR\n\n[Cas 1 — Grand compte multi-sites]\nInvestissement initial: 730000 EUR\nCout recurrent 5 ans: 400000 EUR\nTCO 5 ans: 1130000 EUR\n\n[Cas 2 — Projet léger sans hébergement dédié]\nInvestissement initial: 45000 EUR\nCout recurrent 5 ans: 30000 EUR\nTCO 5 ans: 75000 EUR\n\n[Cas 3 — Budget minimaliste]\nInvestissement initial: 17000 EUR\nCout recurrent 5 ans: 10000 EUR\nTCO 5 ans: 27000 EUR\n"
  },
  {
    "id": "erp2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Circuit d’approbation de Workflow",
    "goal": "Aiguiller une demande d’achat vers le bon palier hiérarchique de validation selon son montant.",
    "brief": "<p>Dans un moteur de Workflow d’ERP, les demandes de dépenses sont routées automatiquement vers différents niveaux d’autorité selon des règles de gestion prédéfinies :</p><ul>\n  <li>Jusqu’à <code>500 EUR</code> inclus &rarr; <code>Validation automatique</code></li>\n  <li>De <code>500.01</code> à <code>5000 EUR</code> inclus &rarr; <code>Validation Manager</code></li>\n  <li>De <code>5000.01</code> à <code>50000 EUR</code> inclus &rarr; <code>Validation Directeur</code></li>\n  <li>Strictement supérieur à <code>50000 EUR</code> &rarr; <code>Validation Direction Generale</code></li>\n</ul><p>Analyse le montant de la dépense fourni(e) dans les données du cas (nombre flottant ou entier positif) et affiche la décision sous la forme :<br><code>Circuit: &lt;Niveau d’approbation&gt;</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c2-e1) — Circuit d’approbation de Workflow\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Seuil manager]\n# Données : 2450.50\nA_COMPLETER\n\n[Cas 2 — Seuil directeur exact]\n# Données : 50000\nA_COMPLETER\n\n[Cas 3 — Gros investissement direction générale]\n# Données : 120000\nA_COMPLETER\n",
    "hints": [
      "Utilisez une série de conditions if / elif / else ordonnées du plus petit au plus grand seuil.",
      "Exemple : if montant <= 500: circuit = \"Validation automatique\"."
    ],
    "examples": [
      {
        "stdin": "350",
        "expected": "Circuit: Validation automatique",
        "note": "Montant inférieur à 500 EUR."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nCircuit: Validation automatique\n\n[Cas 1 — Seuil manager]\nCircuit: Validation Manager\n\n[Cas 2 — Seuil directeur exact]\nCircuit: Validation Directeur\n\n[Cas 3 — Gros investissement direction générale]\nCircuit: Validation Direction Generale\n"
  },
  {
    "id": "erp2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Automate RPA de contrôle de facture",
    "goal": "Vérifier la cohérence arithmétique d’une facture extraite par un robot RPA.",
    "brief": "<p>Un robot d’automatisation (RPA) extrait des données comptables depuis des factures scannées (OCR). Avant injection dans l’ERP, il doit vérifier que le montant TTC correspond exactement au montant HT majoré de la TVA (20%).</p><p>Analyse trois lignes fournies dans les données du cas :<br>1. Le numéro de facture (ex. <code>FAC-2026-081</code>)<br>2. Le montant Hors Taxes (HT) en flottant (ex. <code>100.00</code>)<br>3. Le montant Toutes Taxes Comprises (TTC) extrait de la facture (ex. <code>120.00</code>)<br>Calculez le TTC théorique avec <code>round(ht * 1.20, 2)</code>.<br>- Si la différence absolue entre le TTC extrait et le calculé est inférieure à <code>0.01</code> : affiche <code>Facture &lt;num&gt; conforme: HT=&lt;ht&gt; TTC=&lt;ttc&gt; EUR</code>.<br>- Sinon : affiche <code>Anomalie facture &lt;num&gt;: TTC attendu &lt;attendu&gt; vs extrait &lt;extrait&gt; EUR</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c2-e2) — Automate RPA de contrôle de facture\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Facture avec centimes exacte]\n# Données : FAC-2026-042\n# Données : 250.50\n# Données : 300.60\nA_COMPLETER\n\n[Cas 2 — Écart de calcul détecté par le robot]\n# Données : FAC-2026-099\n# Données : 500.00\n# Données : 620.00\nA_COMPLETER\n\n[Cas 3 — Facture de service]\n# Données : FAC-2026-115\n# Données : 1500.00\n# Données : 1800.00\nA_COMPLETER\n",
    "hints": [
      "ttc_theorique = round(ht * 1.20, 2).",
      "Comparez abs(ttc_lu - ttc_theorique) < 0.01 pour tolérer les micro-arrondis.",
      "Formate les nombres avec :.2f pour un affichage soigné."
    ],
    "examples": [
      {
        "stdin": "FAC-2026-001\n100.0\n120.0",
        "expected": "Facture FAC-2026-001 conforme: HT=100.00 TTC=120.00 EUR",
        "note": "100 + 20% = 120."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nFacture FAC-2026-001 conforme: HT=100.00 TTC=120.00 EUR\n\n[Cas 1 — Facture avec centimes exacte]\nFacture FAC-2026-042 conforme: HT=250.50 TTC=300.60 EUR\n\n[Cas 2 — Écart de calcul détecté par le robot]\nAnomalie facture FAC-2026-099: TTC attendu 600.00 vs extrait 620.00 EUR\n\n[Cas 3 — Facture de service]\nFacture FAC-2026-115 conforme: HT=1500.00 TTC=1800.00 EUR\n"
  },
  {
    "id": "erp2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Machine à états de commande (BPMN)",
    "goal": "Valider le respect des transitions du cycle de vie d’une commande dans l’ERP.",
    "brief": "<p>Dans un processus modélisé (BPMN), les commandes traversent des états successifs selon un cycle strict :</p><ul>\n  <li><code>BROUILLON</code> &rarr; peut passer à <code>VALIDE</code> ou <code>ANNULE</code></li>\n  <li><code>VALIDE</code> &rarr; peut passer à <code>EN_PREPARATION</code> ou <code>ANNULE</code></li>\n  <li><code>EN_PREPARATION</code> &rarr; peut passer à <code>EXPEDIE</code></li>\n  <li><code>EXPEDIE</code> &rarr; peut passer à <code>LIVRE</code> ou <code>RETOURNE</code></li>\n  <li><code>LIVRE</code>, <code>ANNULE</code>, <code>RETOURNE</code> &rarr; états finaux (aucune transition autorisée).</li>\n</ul><p>Analyse deux lignes fournies dans les données du cas (l’état actuel puis l’état demandé, en majuscules).<br>- Si la transition est autorisée : affiche <code>Transition autorisee: &lt;actuel&gt; -&gt; &lt;cible&gt;</code>.<br>- Sinon : affiche <code>Transition interdite: de &lt;actuel&gt; vers &lt;cible&gt;</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c2-e3) — Machine à états de commande (BPMN)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Saut d’étape interdit]\n# Données : BROUILLON\n# Données : EXPEDIE\nA_COMPLETER\n\n[Cas 2 — Annulation en cours de préparation]\n# Données : VALIDE\n# Données : ANNULE\nA_COMPLETER\n\n[Cas 3 — Modification d’une commande déjà livrée]\n# Données : LIVRE\n# Données : EN_PREPARATION\nA_COMPLETER\n",
    "hints": [
      "Définissez un dictionnaire associant chaque état de départ à un ensemble (set) d’états cibles autorisés.",
      "Exemple : transitions = {\"BROUILLON\": {\"VALIDE\", \"ANNULE\"}, ...}."
    ],
    "examples": [
      {
        "stdin": "BROUILLON\nVALIDE",
        "expected": "Transition autorisee: BROUILLON -> VALIDE",
        "note": "Validation normale du devis."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nTransition autorisee: BROUILLON -> VALIDE\n\n[Cas 1 — Saut d’étape interdit]\nTransition interdite: de BROUILLON vers EXPEDIE\n\n[Cas 2 — Annulation en cours de préparation]\nTransition autorisee: VALIDE -> ANNULE\n\n[Cas 3 — Modification d’une commande déjà livrée]\nTransition interdite: de LIVRE vers EN_PREPARATION\n"
  },
  {
    "id": "erp2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Point-à-Point vs Hub d’intégration EAI",
    "goal": "Calculer la complexité d’interconnexion entre N applications d’entreprise.",
    "brief": "<p>Dans une intégration <strong>Point-à-Point</strong> (spaghetti), relier <code>N</code> applications deux à deux requiert <code>N * (N - 1) / 2</code> interfaces spécifiques. À l’inverse, une architecture orientée <strong>Hub EAI ou ESB</strong> ne nécessite qu’un connecteur par application vers le bus central, soit exactement <code>N</code> interfaces.</p><p>Analyse le nombre entier d’applications <code>N</code> fourni(e) dans les données du cas (<code>N &gt;= 2</code>).<br>Calculez le nombre d’interfaces nécessaires dans les deux modèles ainsi que le gain d’interfaces apporté par le Hub.<br>Affichez le résultat sous la forme :<br><code>Point-a-Point: &lt;X&gt; | Hub ESB: &lt;Y&gt; | Gain: &lt;Z&gt; interfaces</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c3-e1) — Point-à-Point vs Hub d’intégration EAI\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux applications]\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Dix applications en SI d’entreprise]\n# Données : 10\nA_COMPLETER\n\n[Cas 3 — Vingt applications hétérogènes]\n# Données : 20\nA_COMPLETER\n",
    "hints": [
      "Point-à-point = n * (n - 1) // 2.",
      "Hub ESB = n.",
      "Gain = point_a_point - hub_esb."
    ],
    "examples": [
      {
        "stdin": "6",
        "expected": "Point-a-Point: 15 | Hub ESB: 6 | Gain: 9 interfaces",
        "note": "Pour 6 applications : 15 interfaces spécifiques contre 6 avec un bus."
      }
    ],
    "tests": [
      {
        "label": "Deux applications",
        "stdin": "cas:1",
        "expected": "Point-a-Point: 1 | Hub ESB: 2 | Gain: -1 interfaces"
      },
      {
        "label": "Dix applications en SI d’entreprise",
        "stdin": "cas:2",
        "expected": "Point-a-Point: 45 | Hub ESB: 10 | Gain: 35 interfaces"
      },
      {
        "label": "Vingt applications hétérogènes",
        "stdin": "cas:3",
        "expected": "Point-a-Point: 190 | Hub ESB: 20 | Gain: 170 interfaces"
      }
    ],
    "solution": "[Exemple]\nPoint-a-Point: 15 | Hub ESB: 6 | Gain: 9 interfaces\n\n[Cas 1 — Deux applications]\nPoint-a-Point: 1 | Hub ESB: 2 | Gain: -1 interfaces\n\n[Cas 2 — Dix applications en SI d’entreprise]\nPoint-a-Point: 45 | Hub ESB: 10 | Gain: 35 interfaces\n\n[Cas 3 — Vingt applications hétérogènes]\nPoint-a-Point: 190 | Hub ESB: 20 | Gain: 170 interfaces\n"
  },
  {
    "id": "erp2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Mappage de message pivot EDI / JSON",
    "goal": "Transformer un message reçu d’un partenaire vers le format canonique de l’ERP.",
    "brief": "<p>Un middleware EAI reçoit des messages hétérogènes et les mappe vers le format pivot interne de l’ERP.</p><p>Lit un objet JSON représentant une commande externe au format partenaire :<br><code>{\"ref_ext\": \"CMD-88\", \"partenaire\": \"FOURN_12\", \"lignes\": [{\"article\": \"A1\", \"qte\": 10, \"prix\": 15.0}, ...]}</code>.<br>Transforme ce payload en objet pivot ERP canonique contenant :<br>- <code>\"order_id\"</code>: valeur de ref_ext<br>- <code>\"vendor_id\"</code>: valeur de partenaire<br>- <code>\"items_count\"</code>: nombre total d’articles physiques (somme des <code>qte</code>)<br>- <code>\"total_ht\"</code>: montant total calculé <code>round(somme(qte * prix), 2)</code><br>Affichez le dictionnaire pivot sérialisé en JSON compact trié (<code>json.dumps(..., sort_keys=True)</code>).</p>",
    "starter": "# Grille d'analyse (erp2-c3-e2) — Mappage de message pivot EDI / JSON\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Commande multi-lignes]\n# Données : {\"ref_ext\": \"PO-900\", \"partenaire\": \"ACME\", \"lignes\": [{\"article\": \"CLAVIER\", \"qte\": 5, \"prix\": 25.5}, {\"article\": \"SOURIS\", \"qte\": 10, \"prix\": 12.0}]}\nA_COMPLETER\n\n[Cas 2 — Commande sans articles]\n# Données : {\"ref_ext\": \"CMD-00\", \"partenaire\": \"TEST\", \"lignes\": []}\nA_COMPLETER\n\n[Cas 3 — Ligne unique avec décimales]\n# Données : {\"ref_ext\": \"PO-101\", \"partenaire\": \"SUPPLY\", \"lignes\": [{\"article\": \"CABLE\", \"qte\": 20, \"prix\": 4.99}]}\nA_COMPLETER\n",
    "hints": [
      "Itère sur message.get(\"lignes\", []).",
      "total_ht = round(sum(ligne[\"qte\"] * ligne[\"prix\"] for ligne in lignes), 2).",
      "items_count = sum(ligne[\"qte\"] for ligne in lignes)."
    ],
    "examples": [
      {
        "stdin": "{\"lignes\": [{\"article\": \"A1\", \"prix\": 15.0, \"qte\": 10}], \"partenaire\": \"FOURN_12\", \"ref_ext\": \"CMD-88\"}",
        "expected": "{\"items_count\": 10, \"order_id\": \"CMD-88\", \"total_ht\": 150.0, \"vendor_id\": \"FOURN_12\"}",
        "note": "Mapping pivot avec calculs de somme."
      }
    ],
    "tests": [
      {
        "label": "Commande multi-lignes",
        "stdin": "cas:1",
        "expected": "{\"items_count\": 15, \"order_id\": \"PO-900\", \"total_ht\": 247.5, \"vendor_id\": \"ACME\"}"
      },
      {
        "label": "Commande sans articles",
        "stdin": "cas:2",
        "expected": "{\"items_count\": 0, \"order_id\": \"CMD-00\", \"total_ht\": 0.0, \"vendor_id\": \"TEST\"}"
      },
      {
        "label": "Ligne unique avec décimales",
        "stdin": "cas:3",
        "expected": "{\"items_count\": 20, \"order_id\": \"PO-101\", \"total_ht\": 99.8, \"vendor_id\": \"SUPPLY\"}"
      }
    ],
    "solution": "[Exemple]\n{\"items_count\": 10, \"order_id\": \"CMD-88\", \"total_ht\": 150.0, \"vendor_id\": \"FOURN_12\"}\n\n[Cas 1 — Commande multi-lignes]\n{\"items_count\": 15, \"order_id\": \"PO-900\", \"total_ht\": 247.5, \"vendor_id\": \"ACME\"}\n\n[Cas 2 — Commande sans articles]\n{\"items_count\": 0, \"order_id\": \"CMD-00\", \"total_ht\": 0.0, \"vendor_id\": \"TEST\"}\n\n[Cas 3 — Ligne unique avec décimales]\n{\"items_count\": 20, \"order_id\": \"PO-101\", \"total_ht\": 99.8, \"vendor_id\": \"SUPPLY\"}\n"
  },
  {
    "id": "erp2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Pipeline ETL : Déduplication de flux",
    "goal": "Filtrer et dédupliquer une liste de contacts importés dans l’ERP en conservant l’enregistrement le plus récent.",
    "brief": "<p>Une étape clé d’un processus ETL (Extract-Transform-Load) lors de l’alimentation de l’ERP consiste à éliminer les doublons tout en conservant les données les plus à jour (Master Data Management).</p><p>Analyse une liste JSON de contacts fourni(e) dans les données du cas. Chaque fiche contient :<br><code>{\"email\": \"...\", \"nom\": \"...\", \"version\": int}</code>.<br>1. Si un même <code>email</code> apparaît plusieurs fois (insensible à la casse), conserve uniquement la fiche ayant le plus grand numéro de <code>version</code>.<br>2. Passez la valeur du champ <code>nom</code> en majuscules (.upper()).<br>3. Normalise l’email en minuscules (.lower()).<br>Affichez la liste finale dédupliquée, <strong>triée par ordre alphabétique de l’email</strong>, avec <code>json.dumps(..., sort_keys=True)</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c3-e3) — Pipeline ETL : Déduplication de flux\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Plusieurs contacts distincts avec doublon]\n# Données : [{\"email\": \"bob@test.com\", \"nom\": \"Bob\", \"version\": 1}, {\"email\": \"claire@test.com\", \"nom\": \"Claire\", \"version\": 1}, {\"email\": \"bob@test.com\", \"nom\": \"Robert\", \"version\": 3}]\nA_COMPLETER\n\n[Cas 2 — Aucun doublon]\n# Données : [{\"email\": \"zack@domaine.fr\", \"nom\": \"Zack\", \"version\": 1}, {\"email\": \"adam@domaine.fr\", \"nom\": \"Adam\", \"version\": 1}]\nA_COMPLETER\n\n[Cas 3 — Liste vide]\n# Données : []\nA_COMPLETER\n",
    "hints": [
      "Utilisez un dictionnaire indexé par email.lower().",
      "Si un email existe déjà, compare les numéros de version.",
      "Extrayez les valeurs et trie la liste résultante avec sorted(..., key=lambda c: c[\"email\"])."
    ],
    "examples": [
      {
        "stdin": "[{\"email\": \"ALICE@site.fr\", \"nom\": \"Alice\", \"version\": 1}, {\"email\": \"alice@site.fr\", \"nom\": \"Alice Martin\", \"version\": 2}]",
        "expected": "[{\"email\": \"alice@site.fr\", \"nom\": \"ALICE MARTIN\", \"version\": 2}]",
        "note": "La version 2 a écrasé la version 1."
      }
    ],
    "tests": [
      {
        "label": "Plusieurs contacts distincts avec doublon",
        "stdin": "cas:1",
        "expected": "[{\"email\": \"bob@test.com\", \"nom\": \"ROBERT\", \"version\": 3}, {\"email\": \"claire@test.com\", \"nom\": \"CLAIRE\", \"version\": 1}]"
      },
      {
        "label": "Aucun doublon",
        "stdin": "cas:2",
        "expected": "[{\"email\": \"adam@domaine.fr\", \"nom\": \"ADAM\", \"version\": 1}, {\"email\": \"zack@domaine.fr\", \"nom\": \"ZACK\", \"version\": 1}]"
      },
      {
        "label": "Liste vide",
        "stdin": "cas:3",
        "expected": "[]"
      }
    ],
    "solution": "[Exemple]\n[{\"email\": \"alice@site.fr\", \"nom\": \"ALICE MARTIN\", \"version\": 2}]\n\n[Cas 1 — Plusieurs contacts distincts avec doublon]\n[{\"email\": \"bob@test.com\", \"nom\": \"ROBERT\", \"version\": 3}, {\"email\": \"claire@test.com\", \"nom\": \"CLAIRE\", \"version\": 1}]\n\n[Cas 2 — Aucun doublon]\n[{\"email\": \"adam@domaine.fr\", \"nom\": \"ADAM\", \"version\": 1}, {\"email\": \"zack@domaine.fr\", \"nom\": \"ZACK\", \"version\": 1}]\n\n[Cas 3 — Liste vide]\n[]\n"
  },
  {
    "id": "erp2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Rapprochement à trois voies (Three-Way Matching)",
    "goal": "Vérifier la concordance entre le bon de commande, le bon de réception et la facture fournisseur dans le cycle P2P.",
    "brief": "<p>Le <strong>Three-Way Matching</strong> est le contrôle interne fondamental du cycle Procure-to-Pay (P2P). Avant de payer une facture fournisseur, l’ERP compare trois documents :<br>1. Le <strong>Bon de Commande</strong> (quantité commandée et prix unitaire convenu)<br>2. Le <strong>Bon de Réception</strong> (quantité physiquement reçue en entrepôt)<br>3. La <strong>Facture</strong> (quantité facturée et prix unitaire facturé).</p><p>Analyse 3 lignes fournies dans les données du cas :<br>Ligne 1 : <code>qte_commandee prix_commande</code> (ex. <code>100 15.0</code>)<br>Ligne 2 : <code>qte_recue</code> (ex. <code>100</code>)<br>Ligne 3 : <code>qte_facturee prix_facture</code> (ex. <code>100 15.0</code>)<br>- Si <code>qte_recue == qte_commandee == qte_facturee</code> ET <code>abs(prix_commande - prix_facture) &lt; 0.01</code> :<br>  affiche <code>Rapprochement valide: Bon a payer</code>.<br>- Sinon, affichezz <code>Anomalie rapprochement:</code> suivi des motifs d’anomalie parmi <code>Ecart quantite</code> et/ou <code>Ecart prix</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c4-e1) — Rapprochement à trois voies (Three-Way Matching)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Écart de quantité livrée et facturée]\n# Données : 50 20.0\n# Données : 40\n# Données : 50 20.0\nA_COMPLETER\n\n[Cas 2 — Écart de prix unitaire]\n# Données : 200 10.0\n# Données : 200\n# Données : 200 12.5\nA_COMPLETER\n\n[Cas 3 — Double écart quantité et prix]\n# Données : 10 100.0\n# Données : 8\n# Données : 10 110.0\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d’abord si les 3 quantités sont strictement égales.",
      "Vérifiez ensuite si abs(prix_cmd - prix_fac) < 0.01.",
      "Si écarts, ajoute \"Ecart quantite\" et/ou \"Ecart prix\" à une liste."
    ],
    "examples": [
      {
        "stdin": "100 15.0\n100\n100 15.0",
        "expected": "Rapprochement valide: Bon a payer",
        "note": "Quantités et prix parfaitement concordants."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nRapprochement valide: Bon a payer\n\n[Cas 1 — Écart de quantité livrée et facturée]\nAnomalie rapprochement: Ecart quantite\n\n[Cas 2 — Écart de prix unitaire]\nAnomalie rapprochement: Ecart prix\n\n[Cas 3 — Double écart quantité et prix]\nAnomalie rapprochement: Ecart quantite, Ecart prix\n"
  },
  {
    "id": "erp2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Remise sur volume et marge commerciale (O2C)",
    "goal": "Calculer le chiffre d’affaires remisé et le taux de marge brute dans le cycle Order-to-Cash.",
    "brief": "<p>Dans le module Ventes d’un ERP, la tarification applique automatiquement des remises quantitatives selon le volume d’achat client :</p><ul>\n  <li>Moins de 10 unités : <code>0%</code> de remise</li>\n  <li>De 10 à 49 unités inclus : <code>5%</code> de remise</li>\n  <li>De 50 à 99 unités inclus : <code>10%</code> de remise</li>\n  <li>100 unités ou plus : <code>15%</code> de remise</li>\n</ul><p>Analyse 3 lignes fournies dans les données du cas :<br>1. Prix unitaire de vente catalogue HT (float, ex. <code>50.0</code>)<br>2. Coût de revient unitaire HT (float, ex. <code>30.0</code>)<br>3. Quantité commandée (int, ex. <code>20</code>)<br>Calcule :<br>- Le pourcentage de remise appliquée (int : 0, 5, 10 ou 15)<br>- Le chiffre d’affaires total HT remisé : <code>round(qte * prix_unitaire * (1 - remise/100), 2)</code><br>- La marge brute totale : <code>round(ca_ht - (qte * cout_revient), 2)</code><br>- Le taux de marge commerciale : <code>round((marge / ca_ht) * 100, 1)</code> en %<br>Affiche : <code>Remise: &lt;r&gt;% | CA HT: &lt;ca&gt; EUR | Marge: &lt;m&gt; EUR | Taux: &lt;t&gt;%</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c4-e2) — Remise sur volume et marge commerciale (O2C)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Vente au détail sans remise]\n# Données : 100.0\n# Données : 60.0\n# Données : 5\nA_COMPLETER\n\n[Cas 2 — Gros volume palier 15%]\n# Données : 20.0\n# Données : 10.0\n# Données : 150\nA_COMPLETER\n\n[Cas 3 — Palier 10%]\n# Données : 80.0\n# Données : 50.0\n# Données : 50\nA_COMPLETER\n",
    "hints": [
      "Détermine le taux de remise selon la quantité.",
      "ca_ht = round(qte * prix_unit * (1 - remise / 100), 2).",
      "cout_total = qte * cout_unit.",
      "marge = round(ca_ht - cout_total, 2).",
      "taux = round((marge / ca_ht) * 100, 1)."
    ],
    "examples": [
      {
        "stdin": "50.0\n30.0\n20",
        "expected": "Remise: 5% | CA HT: 950.00 EUR | Marge: 350.00 EUR | Taux: 36.8%",
        "note": "20 unités -> 5% de remise sur 50 EUR soit 47.50 EUR/u."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nRemise: 5% | CA HT: 950.00 EUR | Marge: 350.00 EUR | Taux: 36.8%\n\n[Cas 1 — Vente au détail sans remise]\nRemise: 0% | CA HT: 500.00 EUR | Marge: 200.00 EUR | Taux: 40.0%\n\n[Cas 2 — Gros volume palier 15%]\nRemise: 15% | CA HT: 2550.00 EUR | Marge: 1050.00 EUR | Taux: 41.2%\n\n[Cas 3 — Palier 10%]\nRemise: 10% | CA HT: 3600.00 EUR | Marge: 1100.00 EUR | Taux: 30.6%\n"
  },
  {
    "id": "erp2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Calcul des Besoins Nets (MRP / CBN)",
    "goal": "Calculer le besoin net d’approvisionnement ou de fabrication selon l’équation fondamentale du MRP.",
    "brief": "<p>Le <strong>MRP</strong> (<em>Material Requirements Planning</em> / Calcul des Besoins Nets) est l’algorithme central des modules de production et de gestion des stocks de l’ERP.</p><p>Pour une période donnée, la formule canonique est :<br><code>Besoin Net = max(0, Besoin Brut - Stock Initial - Receptions Prevues + Stock Securite)</code>.</p><p>Analyse 4 entiers positifs fournies dans les données du cas :<br>1. <code>Besoin Brut</code> (commandes clients et besoins de production)<br>2. <code>Stock Initial</code> (quantité actuellement disponible en magasin)<br>3. <code>Receptions Prevues</code> (commandes fournisseurs déjà en cours de livraison)<br>4. <code>Stock Securite</code> (seuil d’alerte minimal requis en magasin)<br>Calculez le <code>Besoin Net</code> :<br>- Si <code>Besoin Net &gt; 0</code> : affiche <code>Besoin net: &lt;valeur&gt; | Ordre de fabrication: OUI</code>.<br>- Si <code>Besoin Net == 0</code> : affiche <code>Besoin net: 0 | Ordre de fabrication: NON</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c4-e3) — Calcul des Besoins Nets (MRP / CBN)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Stock suffisant sans besoin de réapprovisionnement]\n# Données : 100\n# Données : 10\n# Données : 20\nA_COMPLETER\n\n[Cas 2 — Stock initial nul]\n# Données : 0\n# Données : 50\n# Données : 25\nA_COMPLETER\n\n[Cas 3 — Équilibre parfait avec stock de sécurité atteint]\n# Données : 50\n# Données : 70\n# Données : 20\nA_COMPLETER\n",
    "hints": [
      "Ressources disponibles = stock_initial + receptions_prevues.",
      "Demande totale = besoin_brut + stock_securite.",
      "besoin_net = max(0, demande_totale - ressources_disponibles)."
    ],
    "examples": [
      {
        "stdin": "150\n50\n20\n30",
        "expected": "Besoin net: 110 | Ordre de fabrication: OUI",
        "note": "150 - 50 - 20 + 30 = 110."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nBesoin net: 110 | Ordre de fabrication: OUI\n\n[Cas 1 — Stock suffisant sans besoin de réapprovisionnement]\nBesoin net: 0 | Ordre de fabrication: NON\n\n[Cas 2 — Stock initial nul]\nBesoin net: 175 | Ordre de fabrication: OUI\n\n[Cas 3 — Équilibre parfait avec stock de sécurité atteint]\nBesoin net: 0 | Ordre de fabrication: NON\n"
  },
  {
    "id": "erp2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Équilibre comptable en partie double",
    "goal": "Vérifier la stricte égalité entre le total Débit et le total Crédit d’une écriture comptable dans l’ERP.",
    "brief": "<p>Dans le module comptable d’un ERP, toute écriture enregistrée doit impérativement respecter le principe de la <strong>partie double</strong> : la somme de tous les montants au débit doit être rigoureusement égale à la somme de tous les montants au crédit.</p><p>Analyse l’ensemble des lignes d’écritures fournies dans le cas. Chaque ligne contient :<br><code>compte montant_debit montant_credit</code> (ex. <code>411000 1200.00 0.00</code>).<br>Calculez la somme totale des débits et la somme totale des crédits.<br>- Si <code>abs(total_debit - total_credit) &lt; 0.01</code> :<br>  affiche <code>Ecriture equilibree: &lt;total&gt; EUR</code> (affiché avec 2 décimales).<br>- Sinon :<br>  affiche <code>Ecriture desequilibree: Debit=&lt;d&gt; Credit=&lt;c&gt; Ecart=&lt;e&gt; EUR</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c5-e1) — Équilibre comptable en partie double\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Écriture déséquilibrée avec écart]\n# Données : 607000 500.0 0.0\n# Données : 401000 0.0 450.0\nA_COMPLETER\n\n[Cas 2 — Règlement fournisseur avec banque équilibré]\n# Données : 401000 2500.50 0.0\n# Données : 512000 0.0 2500.50\nA_COMPLETER\n\n[Cas 3 — Opération complexe à 4 lignes]\n# Données : 512000 1000.0 0.0\n# Données : 627000 20.0 0.0\n# Données : 411000 0.0 1020.0\nA_COMPLETER\n",
    "hints": [
      "Pour chaque ligne, découpe avec l’extraction des champs pour extraire compte, debit, credit.",
      "total_debit = sum(float(l’extraction des champs[1]) for l in lignes).",
      "total_credit = sum(float(l’extraction des champs[2]) for l in lignes)."
    ],
    "examples": [
      {
        "stdin": "411000 1200.0 0.0\n707000 0.0 1000.0\n445710 0.0 200.0",
        "expected": "Ecriture equilibree: 1200.00 EUR",
        "note": "Débit = 1200.00, Crédit = 1000 + 200 = 1200.00."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nEcriture equilibree: 1200.00 EUR\n\n[Cas 1 — Écriture déséquilibrée avec écart]\nEcriture desequilibree: Debit=500.00 Credit=450.00 Ecart=50.00 EUR\n\n[Cas 2 — Règlement fournisseur avec banque équilibré]\nEcriture equilibree: 2500.50 EUR\n\n[Cas 3 — Opération complexe à 4 lignes]\nEcriture equilibree: 1020.00 EUR\n"
  },
  {
    "id": "erp2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Valorisation des stocks au PMP",
    "goal": "Calculer le nouveau Prix Moyen Pondéré et la valeur totale du stock après une entrée de marchandises.",
    "brief": "<p>Dans le module Gestion des Stocks de l’ERP, la méthode comptable du <strong>PMP</strong> (<em>Prix Moyen Pondéré</em> après chaque entrée) recalcule la valeur unitaire moyenne du stock :</p><p><code>Nouveau PMP = ((Ancienne Qte * Ancien PMP) + (Qte Entree * Prix Entree)) / (Ancienne Qte + Qte Entree)</code>.</p><p>Analyse deux lignes fournies dans les données du cas :<br>Ligne 1 : État actuel du stock : <code>qte_ancienne pmp_ancien</code> (ex. <code>100 10.0</code>)<br>Ligne 2 : Entrée en magasin : <code>qte_entree prix_entree</code> (ex. <code>50 13.0</code>)<br>Calcule :<br>- La nouvelle quantité totale en stock (entier ou float)<br>- Le nouveau PMP unitaire arrondi à 2 décimales<br>- La valeur totale du stock : <code>round(nouvelle_qte * nouveau_pmp, 2)</code><br>Affiche : <code>Nouveau stock: &lt;qte&gt; | Nouveau PMP: &lt;pmp&gt; EUR | Valeur totale: &lt;valeur&gt; EUR</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c5-e2) — Valorisation des stocks au PMP\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Stock initial nul (première entrée)]\n# Données : 0 0.0\n# Données : 80 25.50\nA_COMPLETER\n\n[Cas 2 — Entrée à prix inférieur dépréciant le stock]\n# Données : 200 15.0\n# Données : 100 9.0\nA_COMPLETER\n\n[Cas 3 — Calcul avec arrondis aux centimes]\n# Données : 75 14.20\n# Données : 35 18.90\nA_COMPLETER\n",
    "hints": [
      "valeur_anc = qte_anc * pmp_anc.",
      "valeur_in = qte_in * prix_in.",
      "nouvelle_qte = qte_anc + qte_in.",
      "nouveau_pmp = round((valeur_anc + valeur_in) / nouvelle_qte, 2)."
    ],
    "examples": [
      {
        "stdin": "100 10.0\n50 13.0",
        "expected": "Nouveau stock: 150 | Nouveau PMP: 11.00 EUR | Valeur totale: 1650.00 EUR",
        "note": "(100*10 + 50*13) / 150 = 1650 / 150 = 11.00 EUR."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nNouveau stock: 150 | Nouveau PMP: 11.00 EUR | Valeur totale: 1650.00 EUR\n\n[Cas 1 — Stock initial nul (première entrée)]\nNouveau stock: 80 | Nouveau PMP: 25.50 EUR | Valeur totale: 2040.00 EUR\n\n[Cas 2 — Entrée à prix inférieur dépréciant le stock]\nNouveau stock: 300 | Nouveau PMP: 13.00 EUR | Valeur totale: 3900.00 EUR\n\n[Cas 3 — Calcul avec arrondis aux centimes]\nNouveau stock: 110 | Nouveau PMP: 15.70 EUR | Valeur totale: 1727.00 EUR\n"
  },
  {
    "id": "erp2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Formule de Wilson (Quantité Économique)",
    "goal": "Déterminer la taille optimale de lot de commande (EOQ) pour minimiser les coûts logistiques.",
    "brief": "<p>La <strong>formule de Wilson</strong> (ou modèle EOQ - <em>Economic Order Quantity</em>) permet au module d’approvisionnement d’optimiser la politique de réassort en arbitrant entre coût de commande et coût de stockage :</p><p><code>Q = sqrt((2 * D * S) / H)</code></p><p>où :<br>- <code>D</code> = Demande annuelle totale en unités (int)<br>- <code>S</code> = Coût fixe de passation d’une commande (EUR)<br>- <code>H</code> = Coût annuel de possession/stockage d’une unité (EUR/unité/an).</p><p>Analyse 3 lignes fournies dans les données du cas (D, S, H en nombres flottants ou entiers).<br>Calcule :<br>- La quantité économique optimale <code>Q</code> (arrondie à l’entier le plus proche avec <code>round(Q)</code>)<br>- Le nombre optimal de commandes par an : <code>N = round(D / Q_arrondi, 1)</code>.<br>Affiche : <code>Quantite economique: &lt;Q&gt; unites | Commandes par an: &lt;N&gt;</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c5-e3) — Formule de Wilson (Quantité Économique)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Produit à forte rotation]\n# Données : 100\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Coût de possession élevé]\n# Données : 40\n# Données : 10\nA_COMPLETER\n\n[Cas 3 — Petite série artisanale]\n# Données : 15\n# Données : 1.5\nA_COMPLETER\n",
    "hints": [
      "q_opt = math.sqrt((2 * d * s) / h).",
      "q_arrondi = round(q_opt).",
      "nb_cmd = round(d / q_arrondi, 1)."
    ],
    "examples": [
      {
        "stdin": "1000\n50\n4",
        "expected": "Quantite economique: 158 unites | Commandes par an: 6.3",
        "note": "sqrt(2*1000*50/4) = sqrt(25000) = 158.11 -> 158."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nQuantite economique: 158 unites | Commandes par an: 6.3\n\n[Cas 1 — Produit à forte rotation]\nQuantite economique: 707 unites | Commandes par an: 7.1\n\n[Cas 2 — Coût de possession élevé]\nQuantite economique: 80 unites | Commandes par an: 10.0\n\n[Cas 3 — Petite série artisanale]\nQuantite economique: 63 unites | Commandes par an: 3.2\n"
  },
  {
    "id": "erp2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Comparateur Cloud SaaS vs On-Premise",
    "goal": "Arbitrer entre modèle OPEX (abonnement SaaS) et CAPEX (licences On-Premise) sur un horizon temporel donné.",
    "brief": "<p>Lors du choix d’un ERP, la direction financière compare le modèle <strong>SaaS</strong> (coût purement opérationnel annuel) et le modèle <strong>On-Premise</strong> (investissement initial lourd amorti avec redevance de maintenance annuelle).</p><p>Analyse 4 entiers fournies dans les données du cas :<br>1. <code>Duree</code> (nombre d’années d’analyse, ex. <code>5</code>)<br>2. <code>Abonnement_SaaS_an</code> (coût annuel tout compris du SaaS en EUR)<br>3. <code>Investissement_OnPrem</code> (coût initial licences + serveurs en EUR)<br>4. <code>Maintenance_OnPrem_an</code> (coût annuel de maintenance logicielle et infra en EUR)<br>Calculez le coût total sur la durée pour chaque option :<br>- <code>Total SaaS = Duree * Abonnement_SaaS_an</code><br>- <code>Total On-Premise = Investissement_OnPrem + (Duree * Maintenance_OnPrem_an)</code><br>Affiche :<br><code>SaaS: &lt;total_saas&gt; EUR | On-Premise: &lt;total_onprem&gt; EUR | Recommandation: &lt;SaaS / On-Premise / Indifferent&gt;</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c6-e1) — Comparateur Cloud SaaS vs On-Premise\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — On-premise plus rentable sur longue durée]\n# Données : 40000\n# Données : 120000\n# Données : 18000\nA_COMPLETER\n\n[Cas 2 — Coûts strictement identiques]\n# Données : 25000\n# Données : 60000\n# Données : 10000\nA_COMPLETER\n\n[Cas 3 — Court terme 3 ans en faveur du Cloud]\n# Données : 20000\n# Données : 80000\n# Données : 10000\nA_COMPLETER\n",
    "hints": [
      "total_saas = duree * saas_an.",
      "total_onprem = onprem_init + (duree * onprem_an).",
      "Si total_saas < total_onprem: recommandation = \"SaaS\"."
    ],
    "examples": [
      {
        "stdin": "5\n30000\n100000\n15000",
        "expected": "SaaS: 150000 EUR | On-Premise: 175000 EUR | Recommandation: SaaS",
        "note": "SaaS = 150 k€ vs On-Premise = 100 + 75 = 175 k€."
      }
    ],
    "tests": [
      {
        "label": "On-premise plus rentable sur longue durée",
        "stdin": "cas:1",
        "expected": "SaaS: 400000 EUR | On-Premise: 300000 EUR | Recommandation: On-Premise"
      },
      {
        "label": "Coûts strictement identiques",
        "stdin": "cas:2",
        "expected": "SaaS: 100000 EUR | On-Premise: 100000 EUR | Recommandation: Indifferent"
      },
      {
        "label": "Court terme 3 ans en faveur du Cloud",
        "stdin": "cas:3",
        "expected": "SaaS: 60000 EUR | On-Premise: 110000 EUR | Recommandation: SaaS"
      }
    ],
    "solution": "[Exemple]\nSaaS: 150000 EUR | On-Premise: 175000 EUR | Recommandation: SaaS\n\n[Cas 1 — On-premise plus rentable sur longue durée]\nSaaS: 400000 EUR | On-Premise: 300000 EUR | Recommandation: On-Premise\n\n[Cas 2 — Coûts strictement identiques]\nSaaS: 100000 EUR | On-Premise: 100000 EUR | Recommandation: Indifferent\n\n[Cas 3 — Court terme 3 ans en faveur du Cloud]\nSaaS: 60000 EUR | On-Premise: 110000 EUR | Recommandation: SaaS\n"
  },
  {
    "id": "erp2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Matrice des risques projet ERP",
    "goal": "Classer les risques d’un déploiement d’ERP selon leur score de criticité (Probabilité x Impact).",
    "brief": "<p>Le déploiement d’un ERP présente des risques organisationnels et techniques majeurs. Chaque risque est noté sur une échelle de 1 à 5 en <strong>Probabilité</strong> et en <strong>Impact</strong> :</p><p><code>Score = Probabilite * Impact</code> (de 1 à 25).<br>- Si <code>Score &gt;= 15</code> &rarr; Niveau <code>CRITIQUE</code><br>- Si <code>Score &gt;= 8</code> et <code>&lt; 15</code> &rarr; Niveau <code>MAJEUR</code><br>- Si <code>Score &lt; 8</code> &rarr; Niveau <code>MODERE</code>.</p><p>Analyse l’ensemble des lignes fournies dans le cas. Chaque ligne contient :<br><code>nom_risque probabilite impact</code> (ex. <code>resistance_changement 4 4</code>).<br>Affichez chaque risque sur une ligne, <strong>trié par score strictement décroissant</strong> (puis par ordre alphabétique du nom en cas d’égalité de score), sous la forme :<br><code>[&lt;NIVEAU&gt;] &lt;nom_risque&gt; (score: &lt;score&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c6-e2) — Matrice des risques projet ERP\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Égalité de score triée alphabétiquement]\n# Données : qualite_donnees 3 4\n# Données : formation_insuffisante 4 3\nA_COMPLETER\n\n[Cas 2 — Risque critique maximum]\n# Données : perte_donnees 5 5\n# Données : sous_estimation_budget 2 3\nA_COMPLETER\n\n[Cas 3 — Risques modérés]\n# Données : delai_signature 2 2\n# Données : conflit_horaire 1 3\nA_COMPLETER\n",
    "hints": [
      "Pour chaque ligne, nom, p, i = l’extraction des champs; score = int(p) * int(i).",
      "Triez la liste avec key=lambda r: (-r[\"score\"], r[\"nom\"])."
    ],
    "examples": [
      {
        "stdin": "resistance_utilisateurs 4 4\nderive_planning 3 3\npanne_materielle 1 5",
        "expected": "[CRITIQUE] resistance_utilisateurs (score: 16)\n[MAJEUR] derive_planning (score: 9)\n[MODERE] panne_materielle (score: 5)",
        "note": "Classement ordonné du plus critique au plus modéré."
      }
    ],
    "tests": [
      {
        "label": "Égalité de score triée alphabétiquement",
        "stdin": "cas:1",
        "expected": "[MAJEUR] formation_insuffisante (score: 12)\n[MAJEUR] qualite_donnees (score: 12)"
      },
      {
        "label": "Risque critique maximum",
        "stdin": "cas:2",
        "expected": "[CRITIQUE] perte_donnees (score: 25)\n[MODERE] sous_estimation_budget (score: 6)"
      },
      {
        "label": "Risques modérés",
        "stdin": "cas:3",
        "expected": "[MODERE] delai_signature (score: 4)\n[MODERE] conflit_horaire (score: 3)"
      }
    ],
    "solution": "[Exemple]\n[CRITIQUE] resistance_utilisateurs (score: 16)\n[MAJEUR] derive_planning (score: 9)\n[MODERE] panne_materielle (score: 5)\n\n[Cas 1 — Égalité de score triée alphabétiquement]\n[MAJEUR] formation_insuffisante (score: 12)\n[MAJEUR] qualite_donnees (score: 12)\n\n[Cas 2 — Risque critique maximum]\n[CRITIQUE] perte_donnees (score: 25)\n[MODERE] sous_estimation_budget (score: 6)\n\n[Cas 3 — Risques modérés]\n[MODERE] delai_signature (score: 4)\n[MODERE] conflit_horaire (score: 3)\n"
  },
  {
    "id": "erp2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Maturité et Urbanisation du SI",
    "goal": "Évaluer le degré de maturité d’un Système d’Information selon la grille d’urbanisation d’entreprise.",
    "brief": "<p>L’<strong>urbanisation du SI</strong> analyse l’organisation des applications selon quatre stades de maturité :</p><ul>\n  <li>Moyenne de 1.0 à 1.9 &rarr; Stade <code>Silos cloisonnes</code> (applications disparates, redondances)</li>\n  <li>Moyenne de 2.0 à 2.7 &rarr; Stade <code>SI Integre</code> (ERP central avec base de données unifiée)</li>\n  <li>Moyenne de 2.8 à 3.4 &rarr; Stade <code>SI Urbanise</code> (découpage en blocs métiers et bus ESB)</li>\n  <li>Moyenne de 3.5 à 4.0 &rarr; Stade <code>Entreprise Composable</code> (micro-services, API ouvertes, cloud hybride)</li>\n</ul><p>Analyse 4 notes entières de 1 à 4 fournies dans les données du cas évaluant les 4 piliers d’urbanisation :<br>1. Gouvernance et qualité des données (1-4)<br>2. Automatisation et interopérabilité des flux (1-4)<br>3. Modularité et découplage architectural (1-4)<br>4. Agilité et orientation services / API (1-4)<br>Calculez la moyenne arithmétique arrondie à 2 décimales.<br>Affiche : <code>Moyenne: &lt;moyenne&gt;/4 | Maturite: &lt;Stade&gt;</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c6-e3) — Maturité et Urbanisation du SI\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — SI historique en silos]\n# Données : 2\n# Données : 1\n# Données : 1\nA_COMPLETER\n\n[Cas 2 — SI hautement urbanisé]\n# Données : 3\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Entreprise composable d’avant-garde]\n# Données : 4\n# Données : 4\n# Données : 3\nA_COMPLETER\n",
    "hints": [
      "moyenne = round(sum(notes) / 4.0, 2).",
      "Comparez la moyenne aux différents seuils de la grille."
    ],
    "examples": [
      {
        "stdin": "2\n3\n2\n2",
        "expected": "Moyenne: 2.25/4 | Maturite: SI Integre",
        "note": "Moyenne 2.25 -> SI Intégré."
      }
    ],
    "tests": [
      {
        "label": "SI historique en silos",
        "stdin": "cas:1",
        "expected": "Moyenne: 1.25/4 | Maturite: Silos cloisonnes"
      },
      {
        "label": "SI hautement urbanisé",
        "stdin": "cas:2",
        "expected": "Moyenne: 3.25/4 | Maturite: SI Urbanise"
      },
      {
        "label": "Entreprise composable d’avant-garde",
        "stdin": "cas:3",
        "expected": "Moyenne: 3.75/4 | Maturite: Entreprise Composable"
      }
    ],
    "solution": "[Exemple]\nMoyenne: 2.25/4 | Maturite: SI Integre\n\n[Cas 1 — SI historique en silos]\nMoyenne: 1.25/4 | Maturite: Silos cloisonnes\n\n[Cas 2 — SI hautement urbanisé]\nMoyenne: 3.25/4 | Maturite: SI Urbanise\n\n[Cas 3 — Entreprise composable d’avant-garde]\nMoyenne: 3.75/4 | Maturite: Entreprise Composable\n"
  }
];
