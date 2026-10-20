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
    "brief": "<p>Un Système d’Information (SI) est un ensemble organisé de ressources réparties en 5 composantes : <strong>Materiel</strong> (serveurs, postes, réseaux), <strong>Logiciel</strong> (ERP, OS, outils), <strong>Donnees</strong> (bases SQL, fichiers clients), <strong>Humain</strong> (utilisateurs, DSI, comptables) et <strong>Processus</strong> (procédures de vente, validation de congés, chaîne d’approvisionnement).</p><p>Lit un identifiant de ressource sur l’entrée standard (en minuscules, sans espaces) et affiche sa composante :<br>- <code>serveur</code>, <code>routeur</code>, <code>ordinateur</code> &rarr; <code>Materiel</code><br>- <code>progiciel_erp</code>, <code>systeme_os</code>, <code>antivirus</code> &rarr; <code>Logiciel</code><br>- <code>base_clients</code>, <code>catalogue_produits</code>, <code>factures_pdf</code> &rarr; <code>Donnees</code><br>- <code>administrateur</code>, <code>comptable</code>, <code>chef_projet</code> &rarr; <code>Humain</code><br>- <code>procedure_achat</code>, <code>cycle_facturation</code>, <code>validation_conges</code> &rarr; <code>Processus</code><br>Pour toute autre valeur non répertoriée, affiche <code>Inconnu</code>.</p>",
    "starter": "# Grille d'analyse (erp2-c1-e1) — Composantes du Système d’Information\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Ressource logicielle]\n# Données : progiciel_erp\nA_COMPLETER\n\n[Cas 2 — Ressource humaine]\n# Données : comptable\nA_COMPLETER\n\n[Cas 3 — Procédure métier]\n# Données : procedure_achat\nA_COMPLETER\n",
    "hints": [
      "Utilise un la grille de critères associant chaque mot-clé à sa composante.",
      "Utilise table.get(ressource, \"Inconnu\") pour la valeur par défaut."
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
    "brief": "<p>Avant l’unification par un ERP, les services d’une entreprise maintiennent leurs propres bases (silos). Une même entité (ex. un client) s’y retrouve avec des informations contradictoires.</p><p>Lit deux lignes JSON sur l’entrée standard :<br>Ligne 1 : fiche client issue du CRM (ex. <code>{\"nom\": \"Dupont\", \"ville\": \"Lyon\", \"solde\": 150}</code>)<br>Ligne 2 : fiche client issue de la Comptabilité (ex. <code>{\"nom\": \"Dupont\", \"ville\": \"Paris\", \"solde\": 150}</code>)<br>Compare les valeurs pour chaque clé commune (triées par ordre alphabétique).<br>Si toutes les valeurs communes sont identiques, affiche : <code>Donnees synchronisees</code>.<br>Sinon, affiche chaque divergence sur une ligne dédiée :<br><code>Divergence &lt;cle&gt;: CRM=&lt;val_crm&gt; vs Compta=&lt;val_compta&gt;</code>.</p>",
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
    "brief": "<p>Le <strong>TCO</strong> (<em>Total Cost of Ownership</em>) quantifie l’ensemble des dépenses directes et indirectes associées à un système d’information sur son cycle de vie (généralement 5 ans).</p><p>Lit six lignes d’entiers sur l’entrée standard représentant :<br>1. Coût des licences initiales (EUR)<br>2. Coût de l’intégration et du paramétrage (EUR)<br>3. Coût de la formation initiale des utilisateurs (EUR)<br>4. Coût annuel de la maintenance logicielle (EUR/an)<br>5. Coût annuel de l’hébergement et de l’infrastructure (EUR/an)<br>6. Coût annuel du support utilisateur (EUR/an)<br>Calcule et affiche :<br>- <code>Investissement initial: &lt;somme_initiale&gt; EUR</code><br>- <code>Cout recurrent 5 ans: &lt;somme_annuelle * 5&gt; EUR</code><br>- <code>TCO 5 ans: &lt;total_global&gt; EUR</code></p>",
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
  }
];
