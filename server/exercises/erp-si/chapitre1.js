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
    "title": "L'inventaire des composantes du SI chez MécaPrécis",
    "exampleTitle": "Exemple résolu — le SI de la boulangerie Le Fournil des Cimes",
    "goal": "Classer les ressources réelles d'une entreprise selon les cinq composantes fondamentales d'un système d'information.",
    "brief": "<p><strong>Énoncé.</strong> MécaPrécis est une PME industrielle de 85 salariés qui usine des pièces métalliques pour le secteur aéronautique. Sa directrice des systèmes d'information dresse l'inventaire des ressources qui font vivre le système d'information, en vue d'un futur projet ERP. Le cours distingue cinq composantes : le <strong>matériel</strong> (équipements physiques), les <strong>logiciels</strong> (programmes), les <strong>données</strong> (informations enregistrées), la composante <strong>humaine</strong> (personnes) et les <strong>processus</strong> (suites d'activités organisées). Son inventaire :</p><table><tr><th>N°</th><th>Ressource inventoriée</th></tr><tr><th>R1</th><td>Le serveur Dell PowerEdge qui héberge la base de données de production</td></tr><tr><th>R2</th><td>Le progiciel de gestion intégré Sage X3 qui gère les achats, les stocks et la comptabilité</td></tr><tr><th>R3</th><td>Le fichier des 1 240 clients avec leur encours de créance</td></tr><tr><th>R4</th><td>Le magasinier qui enregistre chaque entrée et sortie de stock sur son terminal</td></tr><tr><th>R5</th><td>La procédure « traiter une commande client », formalisée en cinq étapes</td></tr></table><p>Pour les questions 1 à 5, répondez par un seul mot : matériel, logiciel, données, humain ou processus.</p><ol><li>À quelle composante appartient la ressource R1 ?</li><li>À quelle composante appartient la ressource R2 ?</li><li>À quelle composante appartient la ressource R3 ?</li><li>À quelle composante appartient la ressource R4 ?</li><li>À quelle composante appartient la ressource R5 ?</li><li>Combien de composantes fondamentales ce modèle du SI distingue-t-il ?</li></ol>",
    "starter": "# Exercice — L'inventaire des composantes du SI chez MécaPrécis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : un seul mot (matériel, logiciel, données, humain ou processus).\n\n[Question 1 — Composante de la ressource R1]\nA_COMPLETER\n\n[Question 2 — Composante de la ressource R2]\nA_COMPLETER\n\n[Question 3 — Composante de la ressource R3]\nA_COMPLETER\n\n[Question 4 — Composante de la ressource R4]\nA_COMPLETER\n\n[Question 5 — Composante de la ressource R5]\nA_COMPLETER\n\n[Question 6 — Nombre de composantes fondamentales]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque ressource, demandez-vous si on peut la toucher (matériel), la lancer (logiciel), la consulter (données), lui parler (humain) ou la dérouler étape par étape (processus).",
      "Attention au piège classique : un progiciel comme Sage X3 n'est pas une donnée, c'est le logiciel qui manipule les données.",
      "1. R1 est un équipement physique. 2. R2 est un programme. 3. R3 est une information enregistrée. 4. R4 est une personne. 5. R5 est une suite d'activités. 6. Comptez les composantes citées dans le rappel du cours."
    ],
    "examples": [
      {
        "stdin": "Le Fournil des Cimes, boulangerie industrielle de 40 salariés, inventorie son SI :\nR1 le scanner de code-barres de la ligne de conditionnement ;\nR2 le logiciel de facturation ;\nR3 le fichier des recettes de production ;\nR4 la boulangère responsable des commandes ;\nR5 le circuit de validation des commandes en trois étapes.\n\n1) R1 : matériel (équipement physique).\n2) R2 : logiciel (programme).\n3) R3 : données (information enregistrée).\n4) R4 : humain (personne).\n5) R5 : processus (suite d'activités).\n6) Le modèle en compte 5 composantes.",
        "expected": "R1 matériel — R2 logiciel — R3 données — R4 humain — R5 processus — 5 composantes",
        "note": "La même grille de lecture s'applique à toute entreprise : seul le métier change, jamais les cinq composantes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Composante de la ressource R1",
        "stdin": "q:1",
        "expected": "matériel||materiel||la composante matérielle||le matériel"
      },
      {
        "label": "Question 2 — Composante de la ressource R2",
        "stdin": "q:2",
        "expected": "logiciel||logiciels||un logiciel||la composante logicielle"
      },
      {
        "label": "Question 3 — Composante de la ressource R3",
        "stdin": "q:3",
        "expected": "données||donnees||des données||les données||la composante données"
      },
      {
        "label": "Question 4 — Composante de la ressource R4",
        "stdin": "q:4",
        "expected": "humain||humaine||personnes||les personnes||la composante humaine"
      },
      {
        "label": "Question 5 — Composante de la ressource R5",
        "stdin": "q:5",
        "expected": "processus||un processus||des processus||la composante processus"
      },
      {
        "label": "Question 6 — Nombre de composantes fondamentales",
        "stdin": "q:6",
        "expected": "5||cinq"
      }
    ],
    "solution": "[Question 1 — Composante de la ressource R1]\nmatériel\n\n[Question 2 — Composante de la ressource R2]\nlogiciel\n\n[Question 3 — Composante de la ressource R3]\ndonnées\n\n[Question 4 — Composante de la ressource R4]\nhumain\n\n[Question 5 — Composante de la ressource R5]\nprocessus\n\n[Question 6 — Nombre de composantes fondamentales]\n5",
    "takeaway": "1) R1, le serveur Dell PowerEdge, est un équipement physique : composante matérielle.\n2) R2, le progiciel Sage X3, est un programme : composante logicielle.\n3) R3, le fichier des 1 240 clients, est une information enregistrée : composante données.\n4) R4, le magasinier, est une personne qui utilise le SI : composante humaine.\n5) R5, la procédure en cinq étapes, est une suite d'activités organisée : composante processus.\n6) Le modèle du cours distingue 5 composantes fondamentales : matériel, logiciels, données, humain, processus.\nContrôle : les cinq ressources inventoriées couvrent chacune une composante différente, l'inventaire est complet."
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
      "Pour chaque clé commune, comparez les deux valeurs avant de conclure.",
      "Comparez chaque champ clé des deux systèmes (ville, statut, montant) champ par champ et signalez toute discordance exacte sous la forme CRM=... vs Compta=..."
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
    "solution": "[Exemple]\nDivergence ville: CRM=Lyon vs Compta=Paris\n\n[Cas 1 — Deux divergences simultanées]\nDivergence adresse: CRM=12 Rue Paix vs Compta=14 Rue Paix\nDivergence email: CRM=a@test.com vs Compta=b@test.com\n\n[Cas 2 — Fiches parfaitement synchronisées]\nDonnees synchronisees\n\n[Cas 3 — Divergence sur un montant numérique]\nDivergence plafond: CRM=5000 vs Compta=3000\n",
    "takeaway": "À retenir : Comparer deux fiches issues d’applications cloisonnées et identifier les données discordantes.\nRepère : La ville est différente entre les deux services."
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
    "solution": "[Exemple]\nInvestissement initial: 150000 EUR\nCout recurrent 5 ans: 100000 EUR\nTCO 5 ans: 250000 EUR\n\n[Cas 1 — Grand compte multi-sites]\nInvestissement initial: 730000 EUR\nCout recurrent 5 ans: 400000 EUR\nTCO 5 ans: 1130000 EUR\n\n[Cas 2 — Projet léger]\nInvestissement initial: 45000 EUR\nCout recurrent 5 ans: 30000 EUR\nTCO 5 ans: 75000 EUR\n\n[Cas 3 — Budget minimaliste]\nInvestissement initial: 17000 EUR\nCout recurrent 5 ans: 10000 EUR\nTCO 5 ans: 27000 EUR\n",
    "takeaway": "À retenir : Évaluer le TCO sur 5 ans d’un projet ERP intégrant investissement initial et coûts récurrents.\nRepère : Projet PME classique sur 5 ans."
  }
];
