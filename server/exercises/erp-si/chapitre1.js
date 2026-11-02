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
    "brief": "<p>Un système d’information comprend notamment du matériel, des logiciels, des données, des personnes et des processus. Le matériel désigne les équipements physiques ; les logiciels regroupent des programmes ; les données sont des informations ; les personnes utilisent ou administrent le système ; les processus décrivent des suites d’activités.</p><p>Pour chaque ressource, choisissez sa composante parmi <code>Materiel</code>, <code>Logiciel</code>, <code>Donnees</code>, <code>Humain</code> et <code>Processus</code>, puis répondez au format <code>Composante: &lt;composante&gt;</code>. Si aucune catégorie ne convient, utilisez <code>Inconnu</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c1-e1) — Composantes du Système d’Information\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Ressource A]\n# Données : progiciel_erp\nA_COMPLETER\n\n[Cas 2 — Ressource B]\n# Données : comptable\nA_COMPLETER\n\n[Cas 3 — Ressource C]\n# Données : procedure_achat\nA_COMPLETER\n",
    "hints": [
      "La ressource désigne-t-elle un équipement, un programme, une information, une personne ou une suite d’activités ?",
      "Appuyez-vous sur le rôle de la ressource et non sur une correspondance mémorisée."
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
    "brief": "<p>Avant l’unification par un ERP, les services d’une entreprise maintiennent leurs propres bases (silos). Une même entité (ex. un client) s’y retrouve avec des informations contradictoires.</p><p>Analysez deux lignes JSON fournies dans les données du cas :<br>Ligne 1 : fiche client issue du CRM (ex. <code>{\"nom\": \"Dupont\", \"ville\": \"Lyon\", \"solde\": 150}</code>)<br>Ligne 2 : fiche client issue de la Comptabilité (ex. <code>{\"nom\": \"Dupont\", \"ville\": \"Paris\", \"solde\": 150}</code>)<br>Comparez les valeurs pour chaque clé commune (triées par ordre alphabétique).<br>Si toutes les valeurs communes sont identiques, utilisez le format <code>Donnees &lt;etat&gt;</code>, où l’état est <code>synchronisees</code>.<br>Sinon, affichez chaque divergence sur une ligne dédiée :<br><code>Divergence &lt;cle&gt;: CRM=&lt;val_crm&gt; vs Compta=&lt;val_compta&gt;</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c1-e2) — Détection des silos de données\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Paire A]\n# Données : {\"adresse\": \"12 Rue Paix\", \"email\": \"a@test.com\", \"nom\": \"Alpha\"}\n# Données : {\"adresse\": \"14 Rue Paix\", \"email\": \"b@test.com\", \"nom\": \"Alpha\"}\nA_COMPLETER\n\n[Cas 2 — Paire B]\n# Données : {\"code\": \"C10\", \"nom\": \"Beta\"}\n# Données : {\"code\": \"C10\", \"nom\": \"Beta\"}\nA_COMPLETER\n\n[Cas 3 — Paire C]\n# Données : {\"nom\": \"Gamma\", \"plafond\": 5000}\n# Données : {\"nom\": \"Gamma\", \"plafond\": 3000}\nA_COMPLETER\n",
    "hints": [
      "Quelles clés apparaissent dans les deux fiches ?",
      "Pour chaque clé commune, comparez les deux valeurs avant de conclure."
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
    "brief": "<p>Le <strong>TCO</strong> (<em>Total Cost of Ownership</em>) quantifie l’ensemble des dépenses directes et indirectes associées à un système d’information sur son cycle de vie (ici, une période de 5 ans).</p><p>Analysez six lignes d’entiers fournies dans les données du cas représentant :<br>1. Coût des licences initiales (EUR)<br>2. Coût de l’intégration et du paramétrage (EUR)<br>3. Coût de la formation initiale des utilisateurs (EUR)<br>4. Coût annuel de la maintenance logicielle (EUR/an)<br>5. Coût annuel de l’hébergement et de l’infrastructure (EUR/an)<br>6. Coût annuel du support utilisateur (EUR/an)<br>Calculez et affiche :<br>- <code>Investissement initial: &lt;somme_initiale&gt; EUR</code><br>- <code>Cout recurrent 5 ans: &lt;somme_annuelle * 5&gt; EUR</code><br>- <code>TCO 5 ans: &lt;total_global&gt; EUR</code></p>",
    "starter": "# Grille d'analyse (erp2-c1-e3) — Calcul du coût total de possession (TCO)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Grand compte multi-sites]\n# Données : 450000\n# Données : 200000\n# Données : 80000\n# Données : 40000\n# Données : 25000\n# Données : 15000\nA_COMPLETER\n\n[Cas 2 — Projet léger]\n# Données : 25000\n# Données : 15000\n# Données : 5000\n# Données : 3000\n# Données : 1000\n# Données : 2000\nA_COMPLETER\n\n[Cas 3 — Budget minimaliste]\n# Données : 10000\n# Données : 5000\n# Données : 2000\n# Données : 1000\n# Données : 500\n# Données : 500\nA_COMPLETER\n",
    "hints": [
      "Quelles dépenses sont payées une seule fois au lancement ?",
      "Quelles dépenses se répètent chaque année, et sur quelle durée les compter ?",
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
        "label": "Projet léger",
        "stdin": "cas:2",
        "expected": "Investissement initial: 45000 EUR\nCout recurrent 5 ans: 30000 EUR\nTCO 5 ans: 75000 EUR"
      },
      {
        "label": "Budget minimaliste",
        "stdin": "cas:3",
        "expected": "Investissement initial: 17000 EUR\nCout recurrent 5 ans: 10000 EUR\nTCO 5 ans: 27000 EUR"
      }
    ],
    "solution": "[Exemple]\nInvestissement initial: 150000 EUR\nCout recurrent 5 ans: 100000 EUR\nTCO 5 ans: 250000 EUR\n\n[Cas 1 — Grand compte multi-sites]\nInvestissement initial: 730000 EUR\nCout recurrent 5 ans: 400000 EUR\nTCO 5 ans: 1130000 EUR\n\n[Cas 2 — Projet léger]\nInvestissement initial: 45000 EUR\nCout recurrent 5 ans: 30000 EUR\nTCO 5 ans: 75000 EUR\n\n[Cas 3 — Budget minimaliste]\nInvestissement initial: 17000 EUR\nCout recurrent 5 ans: 10000 EUR\nTCO 5 ans: 27000 EUR\n"
  }
];
