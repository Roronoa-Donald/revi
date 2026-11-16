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
  },
  {
    "id": "erp2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le circuit de validation des demandes d'achat chez Navalis",
    "exampleTitle": "Exemple résolu — les notes de frais du cabinet Apsara",
    "goal": "Aiguiller une demande de dépense vers le bon niveau de validation d'un workflow, en respectant les bornes des paliers.",
    "brief": "<p><strong>Énoncé.</strong> Navalis, équipementier naval de 210 salariés, paramètre le moteur de workflow de son ERP pour les demandes d'achat. Les règles de gestion validées par la direction :</p><ul><li>jusqu'à <strong>500 € inclus</strong> : validation automatique, sans intervention humaine ;</li><li>de <strong>500,01 € à 5 000 € inclus</strong> : validation par le responsable de service ;</li><li>de <strong>5 000,01 € à 50 000 € inclus</strong> : validation par le directeur des opérations ;</li><li>au-delà de <strong>50 000 €</strong> : validation par la direction générale.</li></ul><p>Un lundi matin, cinq demandes sont enregistrées :</p><table><tr><th>Demande</th><th>Objet de la dépense</th><th>Montant</th></tr><tr><th>D1</th><td>Consommables de bureau</td><td>324,50 €</td></tr><tr><th>D2</th><td>Dix licences antivirus</td><td>2 450 €</td></tr><tr><th>D3</th><td>Centre d'usinage à commande numérique</td><td>87 500 €</td></tr><tr><th>D4</th><td>Contrat de maintenance annuel des machines</td><td>5 000 €</td></tr><tr><th>D5</th><td>Écran d'affichage pour l'atelier</td><td>500 €</td></tr></table><p>Pour les questions 1 à 5, répondez par le validateur exact : automatique, responsable de service, directeur des opérations ou direction générale. Attention aux bornes : un montant égal à une borne appartient au palier qui l'inclut.</p><ol><li>Qui valide la demande D1 ?</li><li>Qui valide la demande D2 ?</li><li>Qui valide la demande D3 ?</li><li>Qui valide la demande D4, dont le montant atteint exactement 5 000 € ?</li><li>Qui valide la demande D5, dont le montant atteint exactement 500 € ?</li><li>Combien de demandes passent par un validateur humain ?</li></ol>",
    "starter": "# Exercice — Le circuit de validation des demandes d'achat chez Navalis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : le validateur exact ; question 6 : un nombre.\n\n[Question 1 — Validateur de la demande D1]\nA_COMPLETER\n\n[Question 2 — Validateur de la demande D2]\nA_COMPLETER\n\n[Question 3 — Validateur de la demande D3]\nA_COMPLETER\n\n[Question 4 — Validateur de la demande D4 (5 000 €)]\nA_COMPLETER\n\n[Question 5 — Validateur de la demande D5 (500 €)]\nA_COMPLETER\n\n[Question 6 — Demandes passant par un validateur humain]\nA_COMPLETER\n",
    "hints": [
      "Un workflow applique des règles de gestion : chaque montant est comparé à des bornes, sans interprétation possible.",
      "Les paliers sont fermés à droite : « jusqu'à 500 € inclus » et « jusqu'à 5 000 € inclus » signifient qu'un montant égal à la borne reste dans ce palier.",
      "1. D1 : 324,50 est inférieur ou égal à 500. 2. D2 : entre 500,01 et 5 000. 3. D3 : supérieur à 50 000. 4. D4 : exactement 5 000, borne incluse du palier directeur. 5. D5 : exactement 500, borne incluse du palier automatique. 6. Comptez les demandes hors validation automatique."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Apsara paramètre la validation de ses notes de frais :\njusqu'à 200 € inclus : validation automatique ; jusqu'à 2 000 € inclus : manager ; au-delà : direction.\nTrois notes sont soumises : 150 €, 200 € et 1 500 €.\n\n1) 150 € : validation automatique.\n2) 200 € : borne incluse, validation automatique.\n3) 1 500 € : validation par le manager.\n4) Une seule note passe par un validateur humain.",
        "expected": "150 € automatique — 200 € automatique (borne incluse) — 1 500 € manager — 1 seule note avec validateur humain",
        "note": "Un montant exactement égal à une borne appartient toujours au palier qui l'inclut : c'est la règle d'or des workflows."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Validateur de la demande D1",
        "stdin": "q:1",
        "expected": "automatique||validation automatique||auto"
      },
      {
        "label": "Question 2 — Validateur de la demande D2",
        "stdin": "q:2",
        "expected": "responsable de service||le responsable de service||manager||le manager"
      },
      {
        "label": "Question 3 — Validateur de la demande D3",
        "stdin": "q:3",
        "expected": "direction générale||la direction générale||direction generale||la direction generale||dg||la dg"
      },
      {
        "label": "Question 4 — Validateur de la demande D4 (5 000 €)",
        "stdin": "q:4",
        "expected": "directeur des opérations||le directeur des opérations||directeur des operations||le directeur des operations||directeur||le directeur"
      },
      {
        "label": "Question 5 — Validateur de la demande D5 (500 €)",
        "stdin": "q:5",
        "expected": "automatique||validation automatique||auto"
      },
      {
        "label": "Question 6 — Demandes passant par un validateur humain",
        "stdin": "q:6",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — Validateur de la demande D1]\nautomatique\n\n[Question 2 — Validateur de la demande D2]\nresponsable de service\n\n[Question 3 — Validateur de la demande D3]\ndirection générale\n\n[Question 4 — Validateur de la demande D4 (5 000 €)]\ndirecteur des opérations\n\n[Question 5 — Validateur de la demande D5 (500 €)]\nautomatique\n\n[Question 6 — Demandes passant par un validateur humain]\n3",
    "takeaway": "1) D1 (324,50 €) est inférieure ou égale à 500 € : validation automatique.\n2) D2 (2 450 €) se situe entre 500,01 € et 5 000 € : validation par le responsable de service.\n3) D3 (87 500 €) dépasse 50 000 € : validation par la direction générale.\n4) D4 atteint exactement 5 000 € : la borne est incluse dans le palier « 500,01 à 5 000 € », donc validation par le directeur des opérations.\n5) D5 atteint exactement 500 € : borne incluse du premier palier, donc validation automatique.\n6) Les demandes à validateur humain sont D2, D3 et D4 : 3 demandes (D1 et D5 sont automatiques).\nContrôle : 5 demandes au total − 2 automatiques = 3 demandes à validateur humain."
  },
  {
    "id": "erp2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le robot RPA du contrôle de factures de Solivac",
    "exampleTitle": "Exemple résolu — le robot de factures du pépiniériste Vertalys",
    "goal": "Vérifier par le calcul la cohérence HT-TTC de factures saisies par un robot RPA et repérer les anomalies.",
    "brief": "<p><strong>Énoncé.</strong> Solivac, fabricant d'équipements de climatisation, reçoit chaque semaine des centaines de factures fournisseurs papier. Un robot RPA les scanne (reconnaissance optique de caractères), saisit le numéro, le montant HT et le montant TTC dans l'ERP, puis contrôle que TTC = HT × 1,20 (TVA à 20 %). Tant que le contrôle n'est pas bon, le paiement reste bloqué. Cette semaine, trois factures sont extraites :</p><table><tr><th>Facture</th><th>Fournisseur</th><th>Montant HT lu</th><th>Montant TTC lu</th></tr><tr><th>FA-2027-101</th><td>NordFournitures</td><td>1 250,00 €</td><td>1 500,00 €</td></tr><tr><th>FA-2027-102</th><td>DecoPro</td><td>840,00 €</td><td>1 050,00 €</td></tr><tr><th>FA-2027-103</th><td>Outillage Sud</td><td>2 300,00 €</td><td>2 700,00 €</td></tr></table><p>Pour les montants, répondez par le nombre seul, sans unité ; pour la question 2, répondez par le mot : conforme ou anormale.</p><ol><li>Quel montant TTC théorique le robot calcule-t-il pour la facture FA-2027-101, en euros ?</li><li>La facture FA-2027-101 est-elle conforme ou anormale ?</li><li>Quel montant TTC théorique pour la facture FA-2027-102, en euros ?</li><li>Quel est l'écart, en euros, entre le TTC lu et le TTC théorique de la facture FA-2027-102 ?</li><li>Quel montant TTC théorique pour la facture FA-2027-103, en euros ?</li><li>Combien de factures le robot doit-il signaler en anomalie ?</li></ol>",
    "starter": "# Exercice — Le robot RPA du contrôle de factures de Solivac\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, sans unité ; question 2 : le mot conforme ou anormale.\n\n[Question 1 — TTC théorique de FA-2027-101 (en €)]\nA_COMPLETER\n\n[Question 2 — Statut de FA-2027-101]\nA_COMPLETER\n\n[Question 3 — TTC théorique de FA-2027-102 (en €)]\nA_COMPLETER\n\n[Question 4 — Écart de FA-2027-102 (en €)]\nA_COMPLETER\n\n[Question 5 — TTC théorique de FA-2027-103 (en €)]\nA_COMPLETER\n\n[Question 6 — Nombre de factures en anomalie]\nA_COMPLETER\n",
    "hints": [
      "La TVA à 20 % se calcule toujours sur le hors taxes : TTC théorique = HT × 1,20.",
      "La facture est conforme si le TTC lu est exactement égal au TTC théorique ; sinon le robot bloque le paiement.",
      "1. FA-101 : 1 250 × 1,20. 2. Comparez au TTC lu. 3. FA-102 : 840 × 1,20. 4. Écart = TTC lu − TTC théorique. 5. FA-103 : 2 300 × 1,20. 6. Comptez les factures dont le TTC lu diffère du TTC théorique."
    ],
    "examples": [
      {
        "stdin": "Chez Vertalys, pépiniériste, le robot RPA contrôle deux factures (TVA 20 %) :\nFA-88 : HT 400 €, TTC lu 480 € ; FA-89 : HT 600 €, TTC lu 750 €.\n\n1) FA-88 : 400 × 1,20 = 480 € théoriques : conforme.\n2) FA-89 : 600 × 1,20 = 720 € théoriques, contre 750 € lus.\n3) Écart FA-89 : 750 − 720 = 30 € : anormale.\n4) Une seule facture est signalée en anomalie.",
        "expected": "FA-88 conforme (480 €) — FA-89 anormale (720 € attendus, 30 € d'écart) — 1 anomalie",
        "note": "L'écart vient souvent d'une mauvaise lecture optique ou d'un taux de TVA différent : le contrôle arithmétique du robot protège le paiement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — TTC théorique de FA-2027-101 (en €)",
        "stdin": "q:1",
        "expected": "1500||1 500||1500,00||1 500,00"
      },
      {
        "label": "Question 2 — Statut de FA-2027-101",
        "stdin": "q:2",
        "expected": "conforme"
      },
      {
        "label": "Question 3 — TTC théorique de FA-2027-102 (en €)",
        "stdin": "q:3",
        "expected": "1008||1 008||1008,00||1 008,00"
      },
      {
        "label": "Question 4 — Écart de FA-2027-102 (en €)",
        "stdin": "q:4",
        "expected": "42||42,00||42.00"
      },
      {
        "label": "Question 5 — TTC théorique de FA-2027-103 (en €)",
        "stdin": "q:5",
        "expected": "2760||2 760||2760,00||2 760,00"
      },
      {
        "label": "Question 6 — Nombre de factures en anomalie",
        "stdin": "q:6",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — TTC théorique de FA-2027-101 (en €)]\n1500\n\n[Question 2 — Statut de FA-2027-101]\nconforme\n\n[Question 3 — TTC théorique de FA-2027-102 (en €)]\n1008\n\n[Question 4 — Écart de FA-2027-102 (en €)]\n42\n\n[Question 5 — TTC théorique de FA-2027-103 (en €)]\n2760\n\n[Question 6 — Nombre de factures en anomalie]\n2",
    "takeaway": "1) FA-2027-101 : 1 250,00 × 1,20 = 1 500,00 € de TTC théorique.\n2) Le TTC lu (1 500,00 €) est identique au TTC théorique : la facture est conforme.\n3) FA-2027-102 : 840,00 × 1,20 = 1 008,00 € de TTC théorique.\n4) Écart : 1 050,00 − 1 008,00 = 42,00 € : la facture est anormale.\n5) FA-2027-103 : 2 300,00 × 1,20 = 2 760,00 € de TTC théorique, contre 2 700,00 € lus (écart de 60 €).\n6) Deux factures divergent du TTC théorique (FA-2027-102 et FA-2027-103) : 2 factures sont signalées en anomalie.\nContrôle : 1 250 + 250 = 1 500 (OK) ; 840 + 168 = 1 008 ≠ 1 050 ; 2 300 + 460 = 2 760 ≠ 2 700."
  },
  {
    "id": "erp2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le cycle de vie des commandes du site Marin et Fils",
    "exampleTitle": "Exemple résolu — le cycle de vie des devis de l'Atelier Loire",
    "goal": "Valider ou refuser les transitions d'états d'une commande conformément au diagramme BPMN du processus.",
    "brief": "<p><strong>Énoncé.</strong> Marin et Fils, vendeur de matériel de marine en ligne, a modélisé dans son ERP le cycle de vie d'une commande client. Le diagramme BPMN définit des états et des transitions strictes :</p><ul><li><strong>BROUILLON</strong> peut passer à VALIDÉ ou ANNULÉ ;</li><li><strong>VALIDÉ</strong> peut passer à EN PRÉPARATION ou ANNULÉ ;</li><li><strong>EN PRÉPARATION</strong> peut passer à EXPÉDIÉ ;</li><li><strong>EXPÉDIÉ</strong> peut passer à LIVRÉ ou RETOURNÉ ;</li><li><strong>LIVRÉ</strong>, <strong>ANNULÉ</strong> et <strong>RETOURNÉ</strong> sont des états finaux : aucune transition n'en sort.</li></ul><p>Vendredi soir, le superviseur des ventes examine cinq demandes de changement d'état :</p><table><tr><th>Commande</th><th>État actuel</th><th>Transition demandée</th></tr><tr><th>C-118</th><td>BROUILLON</td><td>passer à VALIDÉ</td></tr><tr><th>C-204</th><td>BROUILLON</td><td>passer à EXPÉDIÉ</td></tr><tr><th>C-231</th><td>VALIDÉ</td><td>passer à ANNULÉ</td></tr><tr><th>C-305</th><td>LIVRÉ</td><td>repasser à EN PRÉPARATION</td></tr><tr><th>C-312</th><td>EN PRÉPARATION</td><td>passer à ANNULÉ</td></tr></table><p>Pour les questions 1 à 5, répondez par le mot : autorisée ou interdite.</p><ol><li>La transition demandée pour C-118 est-elle autorisée ou interdite ?</li><li>La transition demandée pour C-204 (sauter la validation) ?</li><li>La transition demandée pour C-231 (annuler une commande validée) ?</li><li>La transition demandée pour C-305 (rouvrir une commande livrée) ?</li><li>La transition demandée pour C-312 (annuler une commande en préparation) ?</li><li>Depuis l'état EN PRÉPARATION, quelle est la seule transition autorisée ? Répondez par l'état cible.</li></ol>",
    "starter": "# Exercice — Le cycle de vie des commandes du site Marin et Fils\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : autorisée ou interdite ; question 6 : l'état cible.\n\n[Question 1 — Transition de C-118]\nA_COMPLETER\n\n[Question 2 — Transition de C-204]\nA_COMPLETER\n\n[Question 3 — Transition de C-231]\nA_COMPLETER\n\n[Question 4 — Transition de C-305]\nA_COMPLETER\n\n[Question 5 — Transition de C-312]\nA_COMPLETER\n\n[Question 6 — Sortie unique depuis EN PRÉPARATION]\nA_COMPLETER\n",
    "hints": [
      "Un cycle de vie est une machine à états : seules les transitions dessinées dans le modèle sont possibles, aucune autre.",
      "Les états finaux sont des culs-de-sac : une fois la commande livrée, annulée ou retournée, plus aucune transition ne peut en sortir.",
      "1. C-118 : BROUILLON vers VALIDÉ, transition dessinée. 2. C-204 : BROUILLON n'a que deux sorties, VALIDÉ et ANNULÉ. 3. C-231 : VALIDÉ peut être annulé. 4. C-305 : LIVRÉ est un état final. 5. C-312 : EN PRÉPARATION n'a qu'une seule sortie. 6. Relisez la liste des sorties de EN PRÉPARATION."
    ],
    "examples": [
      {
        "stdin": "L'Atelier Loire modélise ses devis : BROUILLON peut passer à ENVOYÉ ou ANNULÉ ;\nENVOYÉ peut passer à ACCEPTÉ ou REFUSÉ ; ACCEPTÉ peut passer à CONTRAT.\nTrois demandes : un devis BROUILLON que l'on veut ACCEPTÉ ;\nun devis ENVOYÉ que l'on veut REFUSÉ ; un devis ACCEPTÉ que l'on veut passer en CONTRAT.\n\n1) BROUILLON vers ACCEPTÉ : interdite (il faut passer par ENVOYÉ).\n2) ENVOYÉ vers REFUSÉ : autorisée.\n3) ACCEPTÉ vers CONTRAT : autorisée.",
        "expected": "BROUILLON vers ACCEPTÉ interdite — ENVOYÉ vers REFUSÉ autorisée — ACCEPTÉ vers CONTRAT autorisée",
        "note": "Impossible de sauter des étapes : la machine à états force le respect du processus métier dessiné en BPMN."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Transition de C-118",
        "stdin": "q:1",
        "expected": "autorisée||autorisee||transition autorisée||transition autorisee"
      },
      {
        "label": "Question 2 — Transition de C-204",
        "stdin": "q:2",
        "expected": "interdite||transition interdite"
      },
      {
        "label": "Question 3 — Transition de C-231",
        "stdin": "q:3",
        "expected": "autorisée||autorisee||transition autorisée||transition autorisee"
      },
      {
        "label": "Question 4 — Transition de C-305",
        "stdin": "q:4",
        "expected": "interdite||transition interdite"
      },
      {
        "label": "Question 5 — Transition de C-312",
        "stdin": "q:5",
        "expected": "interdite||transition interdite"
      },
      {
        "label": "Question 6 — Sortie unique depuis EN PRÉPARATION",
        "stdin": "q:6",
        "expected": "expédié||expedie||vers expédié||vers expedie||l'état expédié||l’état expédié"
      }
    ],
    "solution": "[Question 1 — Transition de C-118]\nautorisée\n\n[Question 2 — Transition de C-204]\ninterdite\n\n[Question 3 — Transition de C-231]\nautorisée\n\n[Question 4 — Transition de C-305]\ninterdite\n\n[Question 5 — Transition de C-312]\ninterdite\n\n[Question 6 — Sortie unique depuis EN PRÉPARATION]\nexpédié",
    "takeaway": "1) C-118 : BROUILLON vers VALIDÉ figure dans le modèle : transition autorisée.\n2) C-204 : BROUILLON ne peut aller qu'à VALIDÉ ou ANNULÉ : passer directement à EXPÉDIÉ est interdit.\n3) C-231 : VALIDÉ vers ANNULÉ figure dans le modèle : transition autorisée.\n4) C-305 : LIVRÉ est un état final, aucune sortie n'existe : transition interdite.\n5) C-312 : EN PRÉPARATION ne peut aller qu'à EXPÉDIÉ : l'annulation à ce stade est interdite.\n6) Depuis EN PRÉPARATION, la seule transition autorisée est EXPÉDIÉ.\nContrôle : sur 5 demandes, 2 sont autorisées (C-118, C-231) et 3 interdites (C-204, C-305, C-312)."
  },
  {
    "id": "erp2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Du spaghetti au bus : les interfaces de la clinique Saint-Paul",
    "exampleTitle": "Exemple résolu — les applications de la communauté de communes du Val Clair",
    "goal": "Comparer le nombre d'interfaces d'une architecture point-à-point et d'une architecture en bus de services.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Saint-Paul exploite huit applications : le logiciel de facturation, le dossier patient, le système du laboratoire, la gestion des stocks de pharmacie, la paie, le planning des soignants, le portail des patients et l'outil de reporting de la direction. Aujourd'hui, ces huit applications sont reliées deux à deux en point-à-point : chaque paire d'applications échange par une interface spécifique (architecture spaghetti). La direction étudie leur remplacement par un bus de services (ESB) : chaque application serait alors reliée une seule fois au bus.</p><p>Rappel : relier N applications deux à deux exige N × (N − 1) ÷ 2 interfaces ; un bus exige une interface par application. Répondez par le nombre seul, sauf la question 5 (un nom).</p><ol><li>Combien d'interfaces compte aujourd'hui l'architecture point-à-point de la clinique ?</li><li>Avec un bus ESB, combien de connecteurs seraient nécessaires ?</li><li>Combien d'interfaces le bus ferait-il économiser à la clinique ?</li><li>Si deux applications seulement devaient dialoguer, combien d'interfaces le point-à-point exigerait-il ?</li><li>Dans ce cas à deux applications, quel modèle est le plus simple à mettre en place : le point-à-point ou le bus ?</li><li>Quelle est la formule qui donne le nombre d'interfaces point-à-point en fonction du nombre N d'applications ?</li></ol>",
    "starter": "# Exercice — Du spaghetti au bus : les interfaces de la clinique Saint-Paul\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul ; question 6 : la formule au format N*(N-1)/2.\n\n[Question 1 — Interfaces en point-à-point (8 applications)]\nA_COMPLETER\n\n[Question 2 — Connecteurs avec un bus ESB]\nA_COMPLETER\n\n[Question 3 — Économie d'interfaces apportée par le bus]\nA_COMPLETER\n\n[Question 4 — Interfaces point-à-point pour 2 applications]\nA_COMPLETER\n\n[Question 5 — Modèle le plus simple pour 2 applications]\nA_COMPLETER\n\n[Question 6 — Formule du nombre d'interfaces point-à-point]\nA_COMPLETER\n",
    "hints": [
      "En point-à-point, chaque application doit savoir parler à toutes les autres : le nombre d'interfaces croît bien plus vite que le nombre d'applications.",
      "Le bus centralise les échanges : une application n'a plus qu'une seule interface à maintenir, la sienne vers le bus.",
      "1. Point-à-point : 8 × 7 ÷ 2. 2. Bus : une interface par application. 3. Économie = point-à-point − bus. 4. Pour 2 applications : 2 × 1 ÷ 2. 5. Comparez une interface directe contre un bus à administrer. 6. Généralisez avec N applications."
    ],
    "examples": [
      {
        "stdin": "La communauté de communes du Val Clair exploite 6 applications en point-à-point.\n1) Point-à-point : 6 × 5 ÷ 2 = 15 interfaces.\n2) Bus ESB : 6 connecteurs.\n3) Économie : 15 − 6 = 9 interfaces.\n4) Avec 2 applications seulement : 2 × 1 ÷ 2 = 1 interface en point-à-point,\ncontre 2 connecteurs avec un bus : le point-à-point suffit.",
        "expected": "15 interfaces point-à-point — 6 connecteurs bus — 9 interfaces économisées — pour 2 applications : 1 interface, le point-à-point suffit",
        "note": "Le bus ne se justifie qu'au-delà de quelques applications : en dessous de trois, le point-à-point reste plus léger."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Interfaces en point-à-point (8 applications)",
        "stdin": "q:1",
        "expected": "28"
      },
      {
        "label": "Question 2 — Connecteurs avec un bus ESB",
        "stdin": "q:2",
        "expected": "8"
      },
      {
        "label": "Question 3 — Économie d'interfaces apportée par le bus",
        "stdin": "q:3",
        "expected": "20"
      },
      {
        "label": "Question 4 — Interfaces point-à-point pour 2 applications",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Modèle le plus simple pour 2 applications",
        "stdin": "q:5",
        "expected": "point-à-point||point a point||le point-à-point||point-a-point||point à point||le point à point"
      },
      {
        "label": "Question 6 — Formule du nombre d'interfaces point-à-point",
        "stdin": "q:6",
        "expected": "N*(N-1)/2||n*(n-1)/2||N(N-1)/2||N × (N − 1) ÷ 2||N x (N - 1) / 2"
      }
    ],
    "solution": "[Question 1 — Interfaces en point-à-point (8 applications)]\n28\n\n[Question 2 — Connecteurs avec un bus ESB]\n8\n\n[Question 3 — Économie d'interfaces apportée par le bus]\n20\n\n[Question 4 — Interfaces point-à-point pour 2 applications]\n1\n\n[Question 5 — Modèle le plus simple pour 2 applications]\npoint-à-point\n\n[Question 6 — Formule du nombre d'interfaces point-à-point]\nN*(N-1)/2",
    "takeaway": "1) Huit applications reliées deux à deux : 8 × 7 ÷ 2 = 28 interfaces.\n2) Avec un bus, chaque application se branche une seule fois : 8 connecteurs.\n3) Économie : 28 − 8 = 20 interfaces à maintenir en moins.\n4) Deux applications : 2 × 1 ÷ 2 = 1 interface en point-à-point.\n5) Pour deux applications, une seule interface directe suffit : le point-à-point est plus simple qu'un bus à administrer.\n6) La formule générale est N × (N − 1) ÷ 2.\nContrôle : 28 interfaces pour 8 applications, soit plus de trois interfaces par application en moyenne, contre une seule avec le bus."
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
    "solution": "[Exemple]\n{\"items_count\": 10, \"order_id\": \"CMD-88\", \"total_ht\": 150.0, \"vendor_id\": \"FOURN_12\"}\n\n[Cas 1 — Commande multi-lignes]\n{\"items_count\": 15, \"order_id\": \"PO-900\", \"total_ht\": 247.5, \"vendor_id\": \"ACME\"}\n\n[Cas 2 — Commande sans articles]\n{\"items_count\": 0, \"order_id\": \"CMD-00\", \"total_ht\": 0.0, \"vendor_id\": \"TEST\"}\n\n[Cas 3 — Ligne unique avec décimales]\n{\"items_count\": 20, \"order_id\": \"PO-101\", \"total_ht\": 99.8, \"vendor_id\": \"SUPPLY\"}\n",
    "takeaway": "À retenir : Transformer un message reçu d’un partenaire vers le format canonique de l’ERP.\nRepère : Mapping pivot avec calculs de somme."
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
    "solution": "[Exemple]\n[{\"email\": \"alice@site.fr\", \"nom\": \"ALICE MARTIN\", \"version\": 2}]\n\n[Cas 1 — Plusieurs contacts distincts avec doublon]\n[{\"email\": \"bob@test.com\", \"nom\": \"ROBERT\", \"version\": 3}, {\"email\": \"claire@test.com\", \"nom\": \"CLAIRE\", \"version\": 1}]\n\n[Cas 2 — Aucun doublon]\n[{\"email\": \"adam@domaine.fr\", \"nom\": \"ADAM\", \"version\": 1}, {\"email\": \"zack@domaine.fr\", \"nom\": \"ZACK\", \"version\": 1}]\n\n[Cas 3 — Liste vide]\n[]\n",
    "takeaway": "À retenir : Filtrer et dédupliquer une liste de contacts importés dans l’ERP en conservant l’enregistrement le plus récent.\nRepère : La version 2 a écrasé la version 1."
  },
  {
    "id": "erp2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le rapprochement à trois voies d'Aquaterre",
    "exampleTitle": "Exemple résolu — le rapprochement des raccords de Plomberie Réunie",
    "goal": "Contrôler la concordance bon de commande, bon de réception et facture avant de payer un fournisseur.",
    "brief": "<p><strong>Énoncé.</strong> Aquaterre, installateur de réseaux d'eau, reçoit la facture FA-1188 de son fournisseur Valvexp pour la commande de vannes industrielles BC-7712. Dans l'ERP, le paiement n'est autorisé que si les trois documents concordent : c'est le rapprochement à trois voies du cycle Procure-to-Pay.</p><table><tr><th>Document</th><th>Quantité</th><th>Prix unitaire</th></tr><tr><th>Bon de commande BC-7712</th><td>60</td><td>22,00 €</td></tr><tr><th>Bon de réception BR-3391</th><td>55</td><td>—</td></tr><tr><th>Facture FA-1188</th><td>60</td><td>22,00 €</td></tr></table><p>Répondez par le nombre seul, sauf la question 2 (le nom d'un document) et la question 5 (autorise ou bloque).</p><ol><li>Quelle quantité d'articles le magasinier a-t-il réellement réceptionnée ?</li><li>Quel document du cycle P2P atteste la réception effective des marchandises ?</li><li>Quel est l'écart de quantité entre la facture et le bon de réception ?</li><li>Quel est l'écart de prix unitaire entre la commande et la facture, en euros ?</li><li>Le contrôle à trois voies autorise-t-il ou bloque-t-il le paiement de la facture ?</li><li>Combien d'unités supplémentaires faut-il réceptionner pour que la facture devienne payable ?</li></ol>",
    "starter": "# Exercice — Le rapprochement à trois voies d'Aquaterre\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Nombres seuls ; question 2 : le nom du document ; question 5 : autorise ou bloque.\n\n[Question 1 — Quantité réellement réceptionnée]\nA_COMPLETER\n\n[Question 2 — Document qui atteste la réception]\nA_COMPLETER\n\n[Question 3 — Écart de quantité facture / réception]\nA_COMPLETER\n\n[Question 4 — Écart de prix unitaire (en €)]\nA_COMPLETER\n\n[Question 5 — Décision du contrôle sur le paiement]\nA_COMPLETER\n\n[Question 6 — Unités à réceptionner en plus]\nA_COMPLETER\n",
    "hints": [
      "Le rapprochement à trois voies compare quantité commandée, quantité reçue et quantité facturée, ainsi que prix convenu et prix facturé.",
      "Tant qu'un des trois documents diverge des autres, l'ERP bloque le paiement : c'est un contrôle interne du cycle P2P.",
      "1. Lisez la ligne du bon de réception. 2. Parmi commande, réception et facture, lequel prouve l'arrivée des marchandises ? 3. Écart = quantité facturée − quantité reçue. 4. Comparez les deux prix unitaires. 5. Tout écart bloque le paiement. 6. L'écart de quantité doit être comblé."
    ],
    "examples": [
      {
        "stdin": "Plomberie Réunie contrôle une commande de 100 raccords à 15,00 € l'unité.\nBon de réception : 100 raccords reçus. Facture : 100 raccords à 15,00 €.\n\n1) Quantité reçue : 100.\n2) Écart de quantité : 100 − 100 = 0.\n3) Écart de prix : 15,00 − 15,00 = 0 €.\n4) Les trois documents concordent : paiement autorisé.",
        "expected": "100 reçus — écart de quantité 0 — écart de prix 0 € — paiement autorisé",
        "note": "Trois documents identiques, paiement automatique : le rapprochement protège du paiement de marchandises jamais livrées."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Quantité réellement réceptionnée",
        "stdin": "q:1",
        "expected": "55"
      },
      {
        "label": "Question 2 — Document qui atteste la réception",
        "stdin": "q:2",
        "expected": "bon de réception||le bon de réception||bon de reception||le bon de reception||BR||le BR"
      },
      {
        "label": "Question 3 — Écart de quantité facture / réception",
        "stdin": "q:3",
        "expected": "5"
      },
      {
        "label": "Question 4 — Écart de prix unitaire (en €)",
        "stdin": "q:4",
        "expected": "0||0,00||0.00||0 €"
      },
      {
        "label": "Question 5 — Décision du contrôle sur le paiement",
        "stdin": "q:5",
        "expected": "bloque||bloqué||blocage||il bloque"
      },
      {
        "label": "Question 6 — Unités à réceptionner en plus",
        "stdin": "q:6",
        "expected": "5"
      }
    ],
    "solution": "[Question 1 — Quantité réellement réceptionnée]\n55\n\n[Question 2 — Document qui atteste la réception]\nbon de réception\n\n[Question 3 — Écart de quantité facture / réception]\n5\n\n[Question 4 — Écart de prix unitaire (en €)]\n0\n\n[Question 5 — Décision du contrôle sur le paiement]\nbloque\n\n[Question 6 — Unités à réceptionner en plus]\n5",
    "takeaway": "1) Le bon de réception BR-3391 atteste de 55 vannes reçues.\n2) C'est le bon de réception qui atteste la réception effective des marchandises.\n3) Écart de quantité : 60 facturées − 55 reçues = 5.\n4) Écart de prix : 22,00 − 22,00 = 0 € (le prix facturé est conforme au prix convenu).\n5) La facture porte sur 60 unités alors que 5 manquent à la réception : le contrôle bloque le paiement.\n6) Il faut réceptionner les 5 unités manquantes pour que les trois documents concordent et que la facture soit payable.\nContrôle : 55 reçues + 5 manquantes = 60 facturées."
  },
  {
    "id": "erp2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Remise volume et marge chez SportOuest",
    "exampleTitle": "Exemple résolu — la remise des vélos de Cyclovia",
    "goal": "Appliquer une grille tarifaire dégressive par volume puis mesurer la marge brute d'une commande du cycle Order-to-Cash.",
    "brief": "<p><strong>Énoncé.</strong> SportOuest, équipementier pour collectivités, applique dans le module Ventes de son ERP une remise quantitative sur les gilets de sécurité haute visibilité :</p><ul><li>moins de 10 unités : 0 % ;</li><li>de 10 à 49 unités : 5 % ;</li><li>de 50 à 99 unités : 10 % ;</li><li>100 unités et plus : 15 %.</li></ul><p>La municipalité de Plogoff commande <strong>60 gilets</strong>. Le tarif catalogue est de <strong>45,00 € HT</strong> l'unité et le coût de revient de <strong>27,00 € HT</strong> l'unité. La marge brute se calcule sur le prix de vente remisé.</p><p>Répondez par le nombre seul, sans unité ni symbole (les pourcentages s'écrivent par exemple 10 ou 33,3).</p><ol><li>Quel taux de remise (en %) s'applique à cette commande ?</li><li>Quel est le prix unitaire HT remisé, en euros ?</li><li>Quel est le chiffre d'affaires HT total de la commande, en euros ?</li><li>Quelle est la marge brute totale, en euros ?</li><li>Quel est le taux de marge brute (marge ÷ CA HT), arrondi à une décimale ?</li><li>Si la municipalité portait sa commande à 100 gilets, quel taux de remise s'appliquerait ?</li></ol>",
    "starter": "# Exercice — Remise volume et marge chez SportOuest\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, sans unité ni symbole.\n\n[Question 1 — Taux de remise applicable (en %)]\nA_COMPLETER\n\n[Question 2 — Prix unitaire HT remisé (en €)]\nA_COMPLETER\n\n[Question 3 — Chiffre d'affaires HT total (en €)]\nA_COMPLETER\n\n[Question 4 — Marge brute totale (en €)]\nA_COMPLETER\n\n[Question 5 — Taux de marge brute (en %)]\nA_COMPLETER\n\n[Question 6 — Remise pour une commande de 100 gilets (en %)]\nA_COMPLETER\n",
    "hints": [
      "La grille dégressive se lit par paliers : c'est la quantité commandée qui sélectionne le taux, et le taux s'applique au prix catalogue.",
      "Marge brute = CA HT remisé − (coût de revient × quantité) ; le taux de marge rapporte cette marge au CA.",
      "1. 60 gilets tombent dans le palier 50 à 99. 2. Prix remisé = 45,00 × (1 − remise). 3. CA = prix remisé × 60. 4. Marge = CA − 27,00 × 60. 5. Taux = marge ÷ CA × 100. 6. 100 unités atteignent le dernier palier."
    ],
    "examples": [
      {
        "stdin": "Cyclovia vend des vélos de ville : catalogue 120,00 € HT, coût de revient 75,00 € HT.\nUne entreprise en commande 20 : palier 5 % (de 10 à 49 unités).\n\n1) Remise : 5 %.\n2) Prix remisé : 120,00 × 0,95 = 114,00 €.\n3) CA HT : 20 × 114,00 = 2 280 €.\n4) Marge brute : 2 280 − 20 × 75,00 = 2 280 − 1 500 = 780 €.\n5) Taux de marge : 780 ÷ 2 280 × 100 = 34,2 %.",
        "expected": "remise 5 % — prix remisé 114,00 € — CA 2 280 € — marge 780 € — taux de marge 34,2 %",
        "note": "La remise réduit le CA mais pas le coût de revient : le taux de marge se dégrade à mesure que la remise augmente."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taux de remise applicable (en %)",
        "stdin": "q:1",
        "expected": "10||10 %||10%"
      },
      {
        "label": "Question 2 — Prix unitaire HT remisé (en €)",
        "stdin": "q:2",
        "expected": "40,50||40.50||40,5||40.5"
      },
      {
        "label": "Question 3 — Chiffre d'affaires HT total (en €)",
        "stdin": "q:3",
        "expected": "2430||2 430||2430,00||2 430,00"
      },
      {
        "label": "Question 4 — Marge brute totale (en €)",
        "stdin": "q:4",
        "expected": "810||810,00"
      },
      {
        "label": "Question 5 — Taux de marge brute (en %)",
        "stdin": "q:5",
        "expected": "33,3||33.3"
      },
      {
        "label": "Question 6 — Remise pour une commande de 100 gilets (en %)",
        "stdin": "q:6",
        "expected": "15||15 %||15%"
      }
    ],
    "solution": "[Question 1 — Taux de remise applicable (en %)]\n10\n\n[Question 2 — Prix unitaire HT remisé (en €)]\n40,50\n\n[Question 3 — Chiffre d'affaires HT total (en €)]\n2430\n\n[Question 4 — Marge brute totale (en €)]\n810\n\n[Question 5 — Taux de marge brute (en %)]\n33,3\n\n[Question 6 — Remise pour une commande de 100 gilets (en %)]\n15",
    "takeaway": "1) 60 gilets tombent dans le palier 50 à 99 unités : remise de 10 %.\n2) Prix unitaire remisé : 45,00 × (1 − 0,10) = 40,50 €.\n3) CA HT : 60 × 40,50 = 2 430 €.\n4) Marge brute : 2 430 − (60 × 27,00) = 2 430 − 1 620 = 810 €.\n5) Taux de marge brute : 810 ÷ 2 430 × 100 = 33,3 %.\n6) 100 unités atteignent le palier supérieur : remise de 15 %.\nContrôle : coût total 1 620 € + marge 810 € = CA 2 430 €."
  },
  {
    "id": "erp2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les besoins nets de la table RE-450 chez Boisvert",
    "exampleTitle": "Exemple résolu — les besoins nets du fauteuil FE-12 chez Mobilia",
    "goal": "Calculer un besoin net MRP à partir des besoins bruts, du stock, des réceptions prévues et du stock de sécurité, puis dimensionner l'ordre de fabrication.",
    "brief": "<p><strong>Énoncé.</strong> L'atelier Boisvert fabrique des tables de restaurant. Pour la semaine 12, le module de planification calcule les besoins de la table référence RE-450 :</p><ul><li>besoins bruts (commandes clients fermes et prévisions) : <strong>220 tables</strong> ;</li><li>stock initial disponible en entrepôt : <strong>80 tables</strong> ;</li><li>réceptions prévues (ordres de fabrication en cours de finition) : <strong>60 tables</strong> ;</li><li>stock de sécurité imposé : <strong>30 tables</strong> ;</li><li>taille de lot de lancement : <strong>50 tables</strong> (les ordres sont arrondis au lot supérieur).</li></ul><p>Rappel : besoin net = besoins bruts − stock initial − réceptions prévues + stock de sécurité (jamais négatif). Répondez par le nombre seul ; question 3 par oui ou non.</p><ol><li>Quelles ressources totales (stock initial + réceptions prévues) sont disponibles pour la semaine ?</li><li>Quel est le besoin net de la semaine 12 ?</li><li>Un ordre de fabrication doit-il être lancé ?</li><li>Le besoin net étant arrondi au lot de 50, combien d'unités compte l'ordre de fabrication proposé ?</li><li>Une fois l'ordre réceptionné et le besoin brut consommé, quel stock reste-t-il en fin de semaine ?</li><li>S'il n'y avait pas de stock de sécurité, quel serait le besoin net ?</li></ol>",
    "starter": "# Exercice — Les besoins nets de la table RE-450 chez Boisvert\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul ; question 3 : oui ou non.\n\n[Question 1 — Ressources disponibles (stock + réceptions)]\nA_COMPLETER\n\n[Question 2 — Besoin net de la semaine 12]\nA_COMPLETER\n\n[Question 3 — Lancement d'un ordre de fabrication]\nA_COMPLETER\n\n[Question 4 — Quantité de l'ordre proposé (lot de 50)]\nA_COMPLETER\n\n[Question 5 — Stock restant en fin de semaine]\nA_COMPLETER\n\n[Question 6 — Besoin net sans stock de sécurité]\nA_COMPLETER\n",
    "hints": [
      "Le MRP compare la demande (besoins bruts augmentés du stock de sécurité) aux ressources (stock disponible et réceptions déjà planifiées).",
      "L'ordre de fabrication couvre le besoin net arrondi au lot supérieur ; le stock final s'obtient en retranchant le besoin brut des ressources augmentées de l'ordre.",
      "1. Ressources = 80 + 60. 2. Besoin net = 220 − 80 − 60 + 30. 3. Besoin net nul ? Sinon lancement. 4. Arrondissez au multiple de 50 supérieur. 5. Stock final = 80 + 60 + ordre − 220. 6. Refaites le calcul sans le + 30."
    ],
    "examples": [
      {
        "stdin": "Mobilia produit le fauteuil FE-12 : besoins bruts 150, stock initial 40,\nréceptions prévues 50, stock de sécurité 20, lot de 40.\n\n1) Ressources : 40 + 50 = 90.\n2) Besoin net : 150 − 40 − 50 + 20 = 80.\n3) Ordre nécessaire : oui.\n4) 80 est un multiple exact du lot de 40 : ordre de 80.\n5) Stock final : 40 + 50 + 80 − 150 = 20 (le stock de sécurité est tenu).\n6) Sans sécurité : 150 − 90 = 60.",
        "expected": "ressources 90 — besoin net 80 — ordre de 80 — stock final 20 — sans sécurité : 60",
        "note": "Le stock de sécurité majore le besoin net : sans lui, l'atelier finirait la semaine à stock zéro, sans protection."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ressources disponibles (stock + réceptions)",
        "stdin": "q:1",
        "expected": "140"
      },
      {
        "label": "Question 2 — Besoin net de la semaine 12",
        "stdin": "q:2",
        "expected": "110"
      },
      {
        "label": "Question 3 — Lancement d'un ordre de fabrication",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Quantité de l'ordre proposé (lot de 50)",
        "stdin": "q:4",
        "expected": "150"
      },
      {
        "label": "Question 5 — Stock restant en fin de semaine",
        "stdin": "q:5",
        "expected": "70"
      },
      {
        "label": "Question 6 — Besoin net sans stock de sécurité",
        "stdin": "q:6",
        "expected": "80"
      }
    ],
    "solution": "[Question 1 — Ressources disponibles (stock + réceptions)]\n140\n\n[Question 2 — Besoin net de la semaine 12]\n110\n\n[Question 3 — Lancement d'un ordre de fabrication]\noui\n\n[Question 4 — Quantité de l'ordre proposé (lot de 50)]\n150\n\n[Question 5 — Stock restant en fin de semaine]\n70\n\n[Question 6 — Besoin net sans stock de sécurité]\n80",
    "takeaway": "1) Ressources disponibles : 80 + 60 = 140 tables.\n2) Besoin net : 220 − 80 − 60 + 30 = 110 tables.\n3) Le besoin net est positif : un ordre de fabrication doit être lancé.\n4) 110 arrondi au lot de 50 supérieur : 3 lots, soit 150 tables.\n5) Stock final : 80 + 60 + 150 − 220 = 70 tables, au-dessus du stock de sécurité de 30.\n6) Sans stock de sécurité : 220 − 80 − 60 = 80 tables.\nContrôle : avec l'ordre de 150, le stock final (70) respecte la sécurité (30) ; sans sécurité, le besoin net passerait de 110 à 80, soit exactement le stock de sécurité retranché."
  },
  {
    "id": "erp2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "L'écriture d'achat de la société Brumaire",
    "exampleTitle": "Exemple résolu — l'écriture de prestation de Prestalia",
    "goal": "Vérifier l'équilibre débit-crédit d'une écriture comptable en partie double saisie dans l'ERP.",
    "brief": "<p><strong>Énoncé.</strong> Le 14 mars, la société Brumaire (negoce de composants électroniques) enregistre dans le module comptable de son ERP l'achat de marchandises auprès du fournisseur Sedelec : 1 200,00 € HT, TVA à 20 % (240,00 €), règlement à 30 jours. L'écriture générée :</p><table><tr><th>Compte</th><th>Libellé</th><th>Débit</th><th>Crédit</th></tr><tr><th>607000</th><td>Achats de marchandises</td><td>1 200,00 €</td><td>—</td></tr><tr><th>445660</th><td>TVA déductible</td><td>240,00 €</td><td>—</td></tr><tr><th>401000</th><td>Fournisseur Sedelec</td><td>—</td><td>1 440,00 €</td></tr></table><p>Rappel : en partie double, tout ce qui est débité doit être crédité à l'identique. Répondez par le nombre seul pour les montants, oui ou non pour la question 3, et le numéro de compte pour la question 4.</p><ol><li>Quel est le total des débits de l'écriture, en euros ?</li><li>Quel est le total des crédits, en euros ?</li><li>L'écriture est-elle équilibrée ?</li><li>Quel compte est crédité dans cette écriture ?</li><li>Quel montant de TVA est enregistré au débit du compte 445660, en euros ?</li><li>Si le comptable ne saisissait que 1 200,00 € au crédit du compte fournisseur, quel écart de déséquilibre apparaîtrait, en euros ?</li></ol>",
    "starter": "# Exercice — L'écriture d'achat de la société Brumaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Montants : le nombre seul ; question 3 : oui ou non ; question 4 : le numéro de compte.\n\n[Question 1 — Total des débits (en €)]\nA_COMPLETER\n\n[Question 2 — Total des crédits (en €)]\nA_COMPLETER\n\n[Question 3 — Écriture équilibrée ?]\nA_COMPLETER\n\n[Question 4 — Compte crédité]\nA_COMPLETER\n\n[Question 5 — TVA au débit du 445660 (en €)]\nA_COMPLETER\n\n[Question 6 — Écart si le crédit n'était que de 1 200,00 € (en €)]\nA_COMPLETER\n",
    "hints": [
      "La partie double traduit chaque opération en au moins deux mouvements : les emplois au débit, les ressources au crédit.",
      "L'achat crée une charge (débit 607) et une créance d'État sur la TVA (débit 4456), financées par une dette fournisseur (crédit 401).",
      "1. Additionnez la colonne débit. 2. Additionnez la colonne crédit. 3. Comparez les deux totaux. 4. Cherchez la ligne qui porte un montant en crédit. 5. La TVA vaut 20 % du HT. 6. Recalculez le crédit total avec 1 200,00 € et comparez au débit."
    ],
    "examples": [
      {
        "stdin": "Prestalia facture une prestation de conseil : 500,00 € HT, TVA 20 % (100,00 €),\nrèglement immédiat par le client.\nÉcriture : 411000 Clients, débit 600,00 ; 706000 Prestations de services, crédit 500,00 ;\n445710 TVA collectée, crédit 100,00.\n\n1) Total des débits : 600,00 €.\n2) Total des crédits : 500,00 + 100,00 = 600,00 €.\n3) Écriture équilibrée : oui.",
        "expected": "débits 600,00 € — crédits 600,00 € — écriture équilibrée",
        "note": "Toute écriture déséquilibrée est refusée par l'ERP : la partie double est un garde-fou automatique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Total des débits (en €)",
        "stdin": "q:1",
        "expected": "1440||1 440||1440,00||1 440,00"
      },
      {
        "label": "Question 2 — Total des crédits (en €)",
        "stdin": "q:2",
        "expected": "1440||1 440||1440,00||1 440,00"
      },
      {
        "label": "Question 3 — Écriture équilibrée ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Compte crédité",
        "stdin": "q:4",
        "expected": "401000||401||le compte 401||401000 fournisseurs||le compte fournisseur"
      },
      {
        "label": "Question 5 — TVA au débit du 445660 (en €)",
        "stdin": "q:5",
        "expected": "240||240,00"
      },
      {
        "label": "Question 6 — Écart si le crédit n'était que de 1 200,00 € (en €)",
        "stdin": "q:6",
        "expected": "240||240,00"
      }
    ],
    "solution": "[Question 1 — Total des débits (en €)]\n1440\n\n[Question 2 — Total des crédits (en €)]\n1440\n\n[Question 3 — Écriture équilibrée ?]\noui\n\n[Question 4 — Compte crédité]\n401000\n\n[Question 5 — TVA au débit du 445660 (en €)]\n240\n\n[Question 6 — Écart si le crédit n'était que de 1 200,00 € (en €)]\n240",
    "takeaway": "1) Total des débits : 1 200,00 + 240,00 = 1 440,00 €.\n2) Total des crédits : 1 440,00 €.\n3) Débit = crédit = 1 440,00 € : l'écriture est équilibrée.\n4) Le compte crédité est le 401000 Fournisseur Sedelec, qui enregistre la dette.\n5) La TVA déductible portée au débit du 445660 est de 240,00 € (20 % de 1 200,00 €).\n6) Avec 1 200,00 € au crédit seulement : 1 440,00 − 1 200,00 = 240,00 € de déséquilibre (la TVA manquante).\nContrôle : 1 200,00 × 1,20 = 1 440,00 €, le montant exact de la dette fournisseur."
  },
  {
    "id": "erp2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La valorisation du stock de résine au PMP",
    "exampleTitle": "Exemple résolu — le stock d'adhésif chez Adhexa",
    "goal": "Recalculer le prix moyen pondéré d'un stock après chaque entrée en magasin et valoriser la sortie de l'atelier.",
    "brief": "<p><strong>Énoncé.</strong> Composites Nautiques, chantier de construction de bateaux, valorise son stock de résine au <strong>PMP</strong> (prix moyen pondéré), recalculé à chaque entrée : nouveau PMP = (ancienne quantité × ancien PMP + quantité entrée × prix d'entrée) ÷ nouvelle quantité totale. Le mois dernier :</p><ul><li>stock initial : <strong>300 kg</strong> de résine à <strong>10,00 €/kg</strong> ;</li><li>première entrée (réception de la commande R-81) : <strong>200 kg</strong> à <strong>15,00 €/kg</strong> ;</li><li>seconde entrée (réception de la commande R-84) : <strong>300 kg</strong> à <strong>16,00 €/kg</strong> ;</li><li>puis l'atelier consomme une sortie de <strong>100 kg</strong>.</li></ul><p>Les montants s'écrivent avec une virgule et deux décimales si besoin (par exemple 12,00). Répondez par le nombre seul.</p><ol><li>Après la première entrée, quelle est la quantité totale en stock, en kg ?</li><li>Quel est le nouveau PMP après la première entrée, en €/kg ?</li><li>Quelle est la valeur du stock après la première entrée, en euros ?</li><li>Quel est le PMP après la seconde entrée, en €/kg ?</li><li>Quelle est la valeur du stock après la seconde entrée, en euros ?</li><li>À quel prix la sortie de 100 kg de l'atelier est-elle valorisée, en €/kg ?</li></ol>",
    "starter": "# Exercice — La valorisation du stock de résine au PMP\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, virgule et deux décimales si besoin (par exemple 12,00).\n\n[Question 1 — Quantité en stock après la première entrée (en kg)]\nA_COMPLETER\n\n[Question 2 — PMP après la première entrée (en €/kg)]\nA_COMPLETER\n\n[Question 3 — Valeur du stock après la première entrée (en €)]\nA_COMPLETER\n\n[Question 4 — PMP après la seconde entrée (en €/kg)]\nA_COMPLETER\n\n[Question 5 — Valeur du stock après la seconde entrée (en €)]\nA_COMPLETER\n\n[Question 6 — Prix de valorisation de la sortie de 100 kg (en €/kg)]\nA_COMPLETER\n",
    "hints": [
      "Le PMP mélange la valeur de l'ancien stock et celle de l'entrée : c'est une moyenne pondérée par les quantités, pas une simple moyenne des prix.",
      "Les sorties n'ont aucun effet sur le PMP : elles partent au PMP en vigueur ; seules les entrées modifient la moyenne.",
      "1. Quantité = 300 + 200. 2. PMP = (300 × 10,00 + 200 × 15,00) ÷ 500. 3. Valeur = quantité × PMP. 4. Refaites le calcul avec le stock obtenu et l'entrée à 16,00 €. 5. Valeur = nouvelle quantité × nouveau PMP. 6. La sortie part au PMP courant, pas au dernier prix d'achat."
    ],
    "examples": [
      {
        "stdin": "Adhexa gère un stock d'adhésif au PMP : stock initial 100 kg à 8,00 €/kg,\npuis entrée de 100 kg à 10,00 €/kg.\n\n1) Nouvelle quantité : 200 kg.\n2) PMP : (100 × 8,00 + 100 × 10,00) ÷ 200 = 9,00 €/kg.\n3) Valeur du stock : 200 × 9,00 = 1 800,00 €.\n4) Une sortie de 50 kg part à 9,00 €/kg : le PMP ne change pas.",
        "expected": "quantité 200 kg — PMP 9,00 €/kg — valeur 1 800,00 € — sortie valorisée à 9,00 €/kg",
        "note": "La sortie ne modifie pas le PMP : tant qu'aucune nouvelle entrée n'a lieu, chaque départ part au même prix moyen."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Quantité en stock après la première entrée (en kg)",
        "stdin": "q:1",
        "expected": "500"
      },
      {
        "label": "Question 2 — PMP après la première entrée (en €/kg)",
        "stdin": "q:2",
        "expected": "12,00||12.00||12||12,0||12.0"
      },
      {
        "label": "Question 3 — Valeur du stock après la première entrée (en €)",
        "stdin": "q:3",
        "expected": "6000||6 000||6000,00||6 000,00"
      },
      {
        "label": "Question 4 — PMP après la seconde entrée (en €/kg)",
        "stdin": "q:4",
        "expected": "13,50||13.50||13,5||13.5"
      },
      {
        "label": "Question 5 — Valeur du stock après la seconde entrée (en €)",
        "stdin": "q:5",
        "expected": "10800||10 800||10800,00||10 800,00"
      },
      {
        "label": "Question 6 — Prix de valorisation de la sortie de 100 kg (en €/kg)",
        "stdin": "q:6",
        "expected": "13,50||13.50||13,5||13.5"
      }
    ],
    "solution": "[Question 1 — Quantité en stock après la première entrée (en kg)]\n500\n\n[Question 2 — PMP après la première entrée (en €/kg)]\n12,00\n\n[Question 3 — Valeur du stock après la première entrée (en €)]\n6000\n\n[Question 4 — PMP après la seconde entrée (en €/kg)]\n13,50\n\n[Question 5 — Valeur du stock après la seconde entrée (en €)]\n10800\n\n[Question 6 — Prix de valorisation de la sortie de 100 kg (en €/kg)]\n13,50",
    "takeaway": "1) Quantité après la première entrée : 300 + 200 = 500 kg.\n2) PMP : (300 × 10,00 + 200 × 15,00) ÷ 500 = (3 000 + 3 000) ÷ 500 = 12,00 €/kg.\n3) Valeur du stock : 500 × 12,00 = 6 000,00 €.\n4) PMP après la seconde entrée : (500 × 12,00 + 300 × 16,00) ÷ 800 = (6 000 + 4 800) ÷ 800 = 13,50 €/kg.\n5) Valeur du stock : 800 × 13,50 = 10 800,00 €.\n6) La sortie de 100 kg part au PMP en vigueur : 13,50 €/kg (le dernier prix d'achat, 16,00 €, n'est pas utilisé).\nContrôle : après la sortie, il reste 700 kg × 13,50 € = 9 450,00 € ; 10 800,00 − 1 350,00 = 9 450,00 €."
  },
  {
    "id": "erp2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La commande économique de lave-linge chez Delmas",
    "exampleTitle": "Exemple résolu — la commande économique d'aspirateurs chez Electradom",
    "goal": "Appliquer la formule de Wilson pour minimiser le coût total de gestion d'un stock.",
    "brief": "<p><strong>Énoncé.</strong> Delmas Électroménager, distributeur régional, vend chaque année <strong>3 600 lave-linge LW-300</strong>. Chaque commande passée au fabricant coûte <strong>50 €</strong> (frais administratifs et transport), et détenir une unité en stock pendant un an coûte <strong>4 €</strong> (capital immobilisé, assurance, entreposage). La formule de Wilson donne la quantité économique : Q* = racine carrée de (2 × D × S ÷ H), où D est la demande annuelle, S le coût de passation d'une commande et H le coût de possession unitaire annuel.</p><p>Répondez par le nombre seul, sans unité.</p><ol><li>Quelle est la quantité économique de commande Q* ?</li><li>Combien de commandes par an cette quantité implique-t-elle ?</li><li>Quel est le coût annuel total de passation des commandes, en euros ?</li><li>Le stock moyen étant de Q* ÷ 2, quel est le coût annuel de possession, en euros ?</li><li>Quel est le coût total annuel de gestion du stock (passation + possession), en euros ?</li><li>Sur une année de 360 jours, combien de jours s'écoulent en moyenne entre deux commandes ?</li></ol>",
    "starter": "# Exercice — La commande économique de lave-linge chez Delmas\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, sans unité.\n\n[Question 1 — Quantité économique Q*]\nA_COMPLETER\n\n[Question 2 — Nombre de commandes par an]\nA_COMPLETER\n\n[Question 3 — Coût annuel de passation (en €)]\nA_COMPLETER\n\n[Question 4 — Coût annuel de possession (en €)]\nA_COMPLETER\n\n[Question 5 — Coût total annuel de gestion (en €)]\nA_COMPLETER\n\n[Question 6 — Jours entre deux commandes (année de 360 jours)]\nA_COMPLETER\n",
    "hints": [
      "La formule de Wilson arbitre entre deux coûts qui varient en sens inverse : commander souvent coûte des passations, stocker beaucoup coûte de la possession.",
      "À la quantité économique, le coût de passation et le coût de possession s'équilibrent exactement.",
      "1. Q* = racine carrée de (2 × 3 600 × 50 ÷ 4). 2. Commandes = 3 600 ÷ Q*. 3. Passation = nombre de commandes × 50. 4. Stock moyen = Q* ÷ 2 ; possession = stock moyen × 4. 5. Additionnez passation et possession. 6. 360 ÷ nombre de commandes."
    ],
    "examples": [
      {
        "stdin": "Electradom écoule 3 200 aspirateurs par an ; passation 25 € par commande,\npossession 4 € par unité et par an.\n\n1) Q* = racine carrée de (2 × 3 200 × 25 ÷ 4) = racine de 40 000 = 200 unités.\n2) Commandes par an : 3 200 ÷ 200 = 16.\n3) Passation : 16 × 25 = 400 €.\n4) Stock moyen 100 unités ; possession : 100 × 4 = 400 €.\n5) Coût total : 400 + 400 = 800 €.",
        "expected": "Q* 200 — 16 commandes — passation 400 € — possession 400 € — total 800 €",
        "note": "À la quantité de Wilson, passation et possession sont égales : c'est la signature de l'optimum."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Quantité économique Q*",
        "stdin": "q:1",
        "expected": "300"
      },
      {
        "label": "Question 2 — Nombre de commandes par an",
        "stdin": "q:2",
        "expected": "12"
      },
      {
        "label": "Question 3 — Coût annuel de passation (en €)",
        "stdin": "q:3",
        "expected": "600||600,00"
      },
      {
        "label": "Question 4 — Coût annuel de possession (en €)",
        "stdin": "q:4",
        "expected": "600||600,00"
      },
      {
        "label": "Question 5 — Coût total annuel de gestion (en €)",
        "stdin": "q:5",
        "expected": "1200||1 200||1200,00||1 200,00"
      },
      {
        "label": "Question 6 — Jours entre deux commandes (année de 360 jours)",
        "stdin": "q:6",
        "expected": "30||30 jours"
      }
    ],
    "solution": "[Question 1 — Quantité économique Q*]\n300\n\n[Question 2 — Nombre de commandes par an]\n12\n\n[Question 3 — Coût annuel de passation (en €)]\n600\n\n[Question 4 — Coût annuel de possession (en €)]\n600\n\n[Question 5 — Coût total annuel de gestion (en €)]\n1200\n\n[Question 6 — Jours entre deux commandes (année de 360 jours)]\n30",
    "takeaway": "1) Q* = racine carrée de (2 × 3 600 × 50 ÷ 4) = racine carrée de 90 000 = 300 unités.\n2) Nombre de commandes : 3 600 ÷ 300 = 12 commandes par an.\n3) Coût annuel de passation : 12 × 50 = 600 €.\n4) Stock moyen : 300 ÷ 2 = 150 unités ; coût de possession : 150 × 4 = 600 €.\n5) Coût total annuel de gestion : 600 + 600 = 1 200 €.\n6) Intervalle entre deux commandes : 360 ÷ 12 = 30 jours.\nContrôle : à l'optimum de Wilson, passation (600 €) = possession (600 €), et leur somme (1 200 €) est le coût minimal."
  },
  {
    "id": "erp2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "SaaS ou on-premise : le choix de la PME Textura",
    "exampleTitle": "Exemple résolu — le choix de l'agence Pictalys",
    "goal": "Comparer sur six ans le coût d'un ERP en mode SaaS (OPEX) et en mode on-premise (CAPEX), puis trancher.",
    "brief": "<p><strong>Énoncé.</strong> Textura, PME de 120 salariés (fabrique de revêtements muraux), doit choisir entre deux offres ERP pour remplacer sa gestion des ventes et de sa production :</p><ul><li><strong>offre SaaS</strong> : abonnement tout compris de 26 400 € par an, hébergement et mises à jour inclus, sans investissement de départ ;</li><li><strong>offre on-premise</strong> : licences et serveurs à acquérir pour 118 000 €, plus une maintenance annuelle de 16 000 €.</li></ul><p>La direction compare les deux offres sur un horizon de <strong>6 ans</strong>. Répondez par le nombre seul pour les montants, et par le mot exact pour les questions 3, 5 et 6.</p><ol><li>Quel est le coût total de l'offre SaaS sur 6 ans, en euros ?</li><li>Quel est le coût total de l'offre on-premise sur 6 ans, en euros ?</li><li>Quel modèle est le moins coûteux sur 6 ans ?</li><li>Quel est l'écart total entre les deux offres sur 6 ans, en euros ?</li><li>Quel modèle relève d'une dépense d'investissement (CAPEX) ?</li><li>À quelle catégorie de dépense appartient l'abonnement SaaS annuel ?</li></ol>",
    "starter": "# Exercice — SaaS ou on-premise : le choix de la PME Textura\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Montants : le nombre seul ; questions 3, 5 et 6 : le mot exact.\n\n[Question 1 — Coût total SaaS sur 6 ans (en €)]\nA_COMPLETER\n\n[Question 2 — Coût total on-premise sur 6 ans (en €)]\nA_COMPLETER\n\n[Question 3 — Modèle le moins coûteux sur 6 ans]\nA_COMPLETER\n\n[Question 4 — Écart entre les deux offres (en €)]\nA_COMPLETER\n\n[Question 5 — Modèle relevant du CAPEX]\nA_COMPLETER\n\n[Question 6 — Catégorie de dépense de l'abonnement SaaS]\nA_COMPLETER\n",
    "hints": [
      "Le SaaS se paie à l'usage par abonnement ; l'on-premise exige d'acheter licences et serveurs, puis de les maintenir.",
      "CAPEX (capital expenditure) désigne l'investissement immobilisé ; OPEX (operational expenditure) désigne la dépense de fonctionnement récurrente.",
      "1. SaaS : 26 400 × 6. 2. On-premise : 118 000 + 16 000 × 6. 3. Comparez les deux totaux. 4. Écart = plus grand − plus petit. 5. Quel modèle exige d'acheter des actifs ? 6. Un abonnement annuel est une charge de fonctionnement."
    ],
    "examples": [
      {
        "stdin": "L'agence Pictalys compare sur 5 ans un ERP SaaS à 18 000 €/an\net un ERP on-premise à 90 000 € d'investissement + 12 000 €/an de maintenance.\n\n1) SaaS : 18 000 × 5 = 90 000 €.\n2) On-premise : 90 000 + 12 000 × 5 = 150 000 €.\n3) Le SaaS est moins coûteux sur 5 ans, avec 60 000 € d'écart.\n4) L'on-premise relève du CAPEX, l'abonnement SaaS de l'OPEX.",
        "expected": "SaaS 90 000 € — on-premise 150 000 € — SaaS retenu, écart 60 000 € — CAPEX pour l'on-premise, OPEX pour le SaaS",
        "note": "L'abonnement paraît cher chaque année, mais sans investissement initial il reste souvent gagnant sur les premières années."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coût total SaaS sur 6 ans (en €)",
        "stdin": "q:1",
        "expected": "158400||158 400"
      },
      {
        "label": "Question 2 — Coût total on-premise sur 6 ans (en €)",
        "stdin": "q:2",
        "expected": "214000||214 000"
      },
      {
        "label": "Question 3 — Modèle le moins coûteux sur 6 ans",
        "stdin": "q:3",
        "expected": "saas||le saas||cloud||le cloud"
      },
      {
        "label": "Question 4 — Écart entre les deux offres (en €)",
        "stdin": "q:4",
        "expected": "55600||55 600"
      },
      {
        "label": "Question 5 — Modèle relevant du CAPEX",
        "stdin": "q:5",
        "expected": "on-premise||on premise||l'on-premise||l’on-premise||onpremise"
      },
      {
        "label": "Question 6 — Catégorie de dépense de l'abonnement SaaS",
        "stdin": "q:6",
        "expected": "opex||l'opex||l’opex||dépense de fonctionnement||depense de fonctionnement"
      }
    ],
    "solution": "[Question 1 — Coût total SaaS sur 6 ans (en €)]\n158400\n\n[Question 2 — Coût total on-premise sur 6 ans (en €)]\n214000\n\n[Question 3 — Modèle le moins coûteux sur 6 ans]\nsaas\n\n[Question 4 — Écart entre les deux offres (en €)]\n55600\n\n[Question 5 — Modèle relevant du CAPEX]\non-premise\n\n[Question 6 — Catégorie de dépense de l'abonnement SaaS]\nopex",
    "takeaway": "1) Coût total SaaS : 26 400 × 6 = 158 400 €.\n2) Coût total on-premise : 118 000 + 16 000 × 6 = 118 000 + 96 000 = 214 000 €.\n3) Sur 6 ans, le SaaS est le modèle le moins coûteux.\n4) Écart : 214 000 − 158 400 = 55 600 €.\n5) L'on-premise exige l'achat de licences et de serveurs : c'est une dépense d'investissement, le CAPEX.\n6) L'abonnement SaaS annuel est une charge de fonctionnement : l'OPEX.\nContrôle : 158 400 + 55 600 = 214 000 €, l'écart retrouve le total on-premise."
  },
  {
    "id": "erp2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "La matrice des risques du projet ERP de Ferrovia",
    "exampleTitle": "Exemple résolu — la matrice des risques de la banque Solventia",
    "goal": "Coter chaque risque d'un projet ERP (probabilité × impact), le classer selon des seuils de criticité et prioriser les actions.",
    "brief": "<p><strong>Énoncé.</strong> Le groupe Ferrovia (matériel ferroviaire, 800 salariés) prépare le déploiement d'un ERP sur ses trois sites. Le comité de pilotage cote chaque risque sur deux échelles de 1 à 5 : la <strong>probabilité</strong> d'occurrence et l'<strong>impact</strong> sur le projet. Le score de criticité est le produit des deux. Les seuils validés : score supérieur ou égal à 15 : <strong>critique</strong> ; de 8 à 14 : <strong>majeur</strong> ; en dessous de 8 : <strong>modéré</strong>. Le registre initial :</p><table><tr><th>Code</th><th>Risque</th><th>Probabilité</th><th>Impact</th></tr><tr><th>R1</th><td>Reprise des données erronée</td><td>4</td><td>4</td></tr><tr><th>R2</th><td>Résistance au changement des équipes</td><td>5</td><td>3</td></tr><tr><th>R3</th><td>Dérive du planning de déploiement</td><td>3</td><td>2</td></tr><tr><th>R4</th><td>Départ du chef de projet en cours de route</td><td>2</td><td>5</td></tr><tr><th>R5</th><td>Surcoût des licences en renégociation</td><td>2</td><td>2</td></tr></table><p>Répondez par le nombre seul, sauf les questions de niveau (un mot : critique, majeur ou modéré) et la question 6 (un code).</p><ol><li>Quel est le score de criticité du risque R1 ?</li><li>Quel est le niveau du risque R1 ?</li><li>Quel est le score du risque R2 ?</li><li>Quel est le niveau du risque R4 ?</li><li>Combien de risques sont classés critiques ?</li><li>Quel est le seul risque de niveau majeur ? Répondez par son code (par exemple R3).</li></ol>",
    "starter": "# Exercice — La matrice des risques du projet ERP de Ferrovia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Scores : le nombre seul ; niveaux : un mot (critique, majeur, modéré).\n\n[Question 1 — Score du risque R1]\nA_COMPLETER\n\n[Question 2 — Niveau du risque R1]\nA_COMPLETER\n\n[Question 3 — Score du risque R2]\nA_COMPLETER\n\n[Question 4 — Niveau du risque R4]\nA_COMPLETER\n\n[Question 5 — Nombre de risques critiques]\nA_COMPLETER\n\n[Question 6 — Code du seul risque majeur]\nA_COMPLETER\n",
    "hints": [
      "La criticité combine la chance que le risque se réalise et l'ampleur des dégâts s'il se réalise.",
      "Appliquez les seuils dans l'ordre : à partir de 15 le risque est critique, à partir de 8 il est majeur, sinon il est modéré.",
      "1. R1 : 4 × 4. 2. Comparez le score aux seuils. 3. R2 : 5 × 3. 4. R4 : 2 × 5 = 10. 5. Comptez les scores supérieurs ou égaux à 15. 6. Cherchez le score compris entre 8 et 14."
    ],
    "examples": [
      {
        "stdin": "La banque Solventia cote trois risques de son projet SI :\nrégression logicielle (probabilité 5, impact 5) ; retard de formation (3, 3) ;\npanne fournisseur (1, 4).\n\n1) Régression : 5 × 5 = 25, critique.\n2) Retard de formation : 3 × 3 = 9, majeur.\n3) Panne fournisseur : 1 × 4 = 4, modéré.\n4) Un seul risque critique.",
        "expected": "régression 25 critique — formation 9 majeur — panne 4 modéré — 1 risque critique",
        "note": "Un impact énorme mais très improbable reste un risque à surveiller : le score reflète le produit des deux dimensions."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Score du risque R1",
        "stdin": "q:1",
        "expected": "16"
      },
      {
        "label": "Question 2 — Niveau du risque R1",
        "stdin": "q:2",
        "expected": "critique||un risque critique"
      },
      {
        "label": "Question 3 — Score du risque R2",
        "stdin": "q:3",
        "expected": "15"
      },
      {
        "label": "Question 4 — Niveau du risque R4",
        "stdin": "q:4",
        "expected": "majeur||risque majeur"
      },
      {
        "label": "Question 5 — Nombre de risques critiques",
        "stdin": "q:5",
        "expected": "2"
      },
      {
        "label": "Question 6 — Code du seul risque majeur",
        "stdin": "q:6",
        "expected": "R4||r4"
      }
    ],
    "solution": "[Question 1 — Score du risque R1]\n16\n\n[Question 2 — Niveau du risque R1]\ncritique\n\n[Question 3 — Score du risque R2]\n15\n\n[Question 4 — Niveau du risque R4]\nmajeur\n\n[Question 5 — Nombre de risques critiques]\n2\n\n[Question 6 — Code du seul risque majeur]\nR4",
    "takeaway": "1) R1 : 4 × 4 = 16.\n2) 16 est supérieur ou égal à 15 : le risque R1 est critique.\n3) R2 : 5 × 3 = 15.\n4) R4 : 2 × 5 = 10, compris entre 8 et 14 : niveau majeur.\n5) Scores : R1 = 16 (critique), R2 = 15 (critique), R3 = 6 (modéré), R4 = 10 (majeur), R5 = 4 (modéré) : 2 risques critiques.\n6) Le seul risque majeur est R4 (départ du chef de projet).\nContrôle : somme des scores = 16 + 15 + 6 + 10 + 4 = 51 ; les deux risques critiques (31 à eux deux) concentrent plus de 60 % de la criticité totale."
  },
  {
    "id": "erp2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "L'urbanisation du SI du groupe Verlaine",
    "exampleTitle": "Exemple résolu — l'urbanisation de la mutuelle Sérénia",
    "goal": "Mesurer l'effet d'une urbanisation du SI : interfaces supprimées, dette applicative retirée et connecteurs du bus.",
    "brief": "<p><strong>Énoncé.</strong> Le groupe Verlaine (trois filiales industrielles) a laissé son système d'information croître sans gouvernance : <strong>16 applications métier</strong> aujourd'hui, toutes reliées deux à deux par des interfaces spécifiques en point-à-point (architecture spaghetti). Le plan d'urbanisation prévoit de remplacer <strong>10 applications</strong> par un ERP unique ; les <strong>6 applications restantes</strong> (site e-commerce, entrepôt automatisé, BI, CRM avancé, GMAO, portail RH) se brancheront sur un bus de services (ESB) aux côtés de l'ERP.</p><p>Rappels : relier N applications deux à deux exige N × (N − 1) ÷ 2 interfaces ; sur un bus, chaque application n'exige qu'un connecteur. Répondez par le nombre seul.</p><ol><li>Combien d'interfaces compte l'architecture spaghetti actuelle ?</li><li>Après migration, combien d'applications sont reliées au bus (ERP compris) ?</li><li>Combien de connecteurs le bus compte-t-il après migration ?</li><li>Combien d'interfaces la migration supprime-t-elle ?</li><li>De combien d'applications la dette applicative est-elle allégée ?</li><li>Quand une application branchée au bus évolue, combien de connecteurs faut-il reprendre ?</li></ol>",
    "starter": "# Exercice — L'urbanisation du SI du groupe Verlaine\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, sans unité.\n\n[Question 1 — Interfaces de l'architecture spaghetti actuelle]\nA_COMPLETER\n\n[Question 2 — Applications reliées au bus après migration]\nA_COMPLETER\n\n[Question 3 — Connecteurs du bus après migration]\nA_COMPLETER\n\n[Question 4 — Interfaces supprimées par la migration]\nA_COMPLETER\n\n[Question 5 — Applications retirées de la dette applicative]\nA_COMPLETER\n\n[Question 6 — Connecteurs à reprendre quand une application évolue]\nA_COMPLETER\n",
    "hints": [
      "L'urbanisation vise deux maux du SI : la dette applicative (vieilles applications coûteuses à maintenir) et les interfaces en spaghetti.",
      "Sur un bus, une application ne connaît que le bus : quand elle change, seul son propre connecteur est impacté.",
      "1. Interfaces actuelles : 16 × 15 ÷ 2. 2. Après migration, il reste 6 applications + l'ERP. 3. Un connecteur par application branchée. 4. Interfaces supprimées = interfaces actuelles − connecteurs du bus. 5. Comptez les applications remplacées. 6. Le bus isole chaque application des autres."
    ],
    "examples": [
      {
        "stdin": "La mutuelle Sérénia urbanise son SI : 10 applications en point-à-point,\ndont 6 remplacées par un ERP ; les 4 applications restantes rejoignent le bus avec l'ERP.\n\n1) Interfaces actuelles : 10 × 9 ÷ 2 = 45.\n2) Applications après migration : 4 + 1 (ERP) = 5.\n3) Connecteurs du bus : 5.\n4) Interfaces supprimées : 45 − 5 = 40.\n5) Dette applicative allégée de 6 applications.",
        "expected": "45 interfaces — 5 applications sur le bus — 5 connecteurs — 40 interfaces supprimées — dette allégée de 6 applications",
        "note": "Remplacer les applications ne suffit pas : sans bus, les interfaces spécifiques renaîtraient aussitôt."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Interfaces de l'architecture spaghetti actuelle",
        "stdin": "q:1",
        "expected": "120"
      },
      {
        "label": "Question 2 — Applications reliées au bus après migration",
        "stdin": "q:2",
        "expected": "7"
      },
      {
        "label": "Question 3 — Connecteurs du bus après migration",
        "stdin": "q:3",
        "expected": "7"
      },
      {
        "label": "Question 4 — Interfaces supprimées par la migration",
        "stdin": "q:4",
        "expected": "113"
      },
      {
        "label": "Question 5 — Applications retirées de la dette applicative",
        "stdin": "q:5",
        "expected": "10"
      },
      {
        "label": "Question 6 — Connecteurs à reprendre quand une application évolue",
        "stdin": "q:6",
        "expected": "1||un"
      }
    ],
    "solution": "[Question 1 — Interfaces de l'architecture spaghetti actuelle]\n120\n\n[Question 2 — Applications reliées au bus après migration]\n7\n\n[Question 3 — Connecteurs du bus après migration]\n7\n\n[Question 4 — Interfaces supprimées par la migration]\n113\n\n[Question 5 — Applications retirées de la dette applicative]\n10\n\n[Question 6 — Connecteurs à reprendre quand une application évolue]\n1",
    "takeaway": "1) Interfaces actuelles : 16 × 15 ÷ 2 = 120.\n2) Après migration : 6 applications restantes + 1 ERP = 7 applications sur le bus.\n3) Le bus exige un connecteur par application : 7 connecteurs.\n4) Interfaces supprimées : 120 − 7 = 113.\n5) La dette applicative est allégée des 10 applications remplacées par l'ERP.\n6) Quand une application évolue, seul son connecteur vers le bus est repris : 1 seul.\nContrôle : 7 applications reliées deux à deux exigeraient 7 × 6 ÷ 2 = 21 interfaces ; le bus les remplace par 7 connecteurs, et chaque application ne dépend plus que du bus."
  }
];
