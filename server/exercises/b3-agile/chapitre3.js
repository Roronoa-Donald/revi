/**
 * chapitre3.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ag3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le tableau Kanban du support de Cloudia",
    "exampleTitle": "Exemple résolu — le tableau de l'équipe éditoriale de PubliWeb",
    "goal": "Lire un tableau Kanban, vérifier les limites de travail en cours (WIP) et repérer la surcharge.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe de support niveau 2 de Cloudia, éditeur d'un logiciel de gestion, suit son travail sur un tableau Kanban à cinq colonnes. La limite WIP d'une colonne est le nombre maximal de cartes autorisées simultanément dans cette colonne. Lundi matin, le tableau affiche :</p><table><tr><th>Colonne</th><th>Limite WIP</th><th>Cartes en cours</th></tr><tr><th>À faire</th><td>—</td><td>12</td></tr><tr><th>Analyse</th><td>3</td><td>3</td></tr><tr><th>Développement</th><td>4</td><td>5</td></tr><tr><th>Revue de code</th><td>3</td><td>1</td></tr><tr><th>Test</th><td>2</td><td>2</td></tr></table><ol><li>Combien de colonnes du tableau ont une limite WIP définie ?</li><li>Quelle colonne dépasse sa limite WIP ? Répondez par son nom exact.</li><li>De combien de cartes cette colonne dépasse-t-elle sa limite ?</li><li>Combien de cartes sont en cours de traitement dans le flux (toutes colonnes sauf « À faire ») ?</li><li>Que doit faire l'équipe avant d'entamer de nouvelles cartes : terminer le travail en cours ou en tirer de nouvelles de la colonne « À faire » ? Répondez de façon courte.</li><li>Une colonne qui dépasse régulièrement sa limite WIP révèle quoi dans le flux ? Répondez en quelques mots.</li></ol>",
    "starter": "# Exercice — Le tableau Kanban du support de Cloudia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nom exact de la colonne. Questions 5 et 6 : quelques mots suffisent.\n\n[Question 1 — Colonnes dotées d'une limite WIP]\nA_COMPLETER\n\n[Question 2 — Colonne en dépassement de limite]\nA_COMPLETER\n\n[Question 3 — Dépassement, en cartes]\nA_COMPLETER\n\n[Question 4 — Cartes en cours dans le flux]\nA_COMPLETER\n\n[Question 5 — Que faire avant d'entamer de nouvelles cartes]\nA_COMPLETER\n\n[Question 6 — Ce que révèle un dépassement récurrent]\nA_COMPLETER\n",
    "hints": [
      "Une limite WIP n'est pas un objectif de remplissage : c'est un plafond qui protège l'équipe de la surcharge.",
      "Comparez, colonne par colonne, les cartes en cours à la limite : dépassement strict, pleine capacité ou capacité restante.",
      "1. Comptez les colonnes avec un chiffre dans la ligne « Limite WIP ». 2. Cherchez current > limite. 3. Calculez la différence. 4. Additionnez les cartes des colonnes hors « À faire ». 5. Rappelez-vous « Stop starting, start finishing ». 6. Un dépassement récent et répété signale l'étape qui bride le flux."
    ],
    "examples": [
      {
        "stdin": "L'équipe éditoriale de PubliWeb affiche : Idées (sans limite, 20 cartes),\nRédaction (limite 3, 4 cartes), Relecture (limite 2, 2 cartes), Publication (limite 1, 1 carte).\n\n1) Trois colonnes ont une limite : Rédaction, Relecture, Publication.\n2) Rédaction dépasse sa limite.\n3) Dépassement : 4 − 3 = 1 carte.\n4) Cartes dans le flux : 4 + 2 + 1 = 7.\n5) L'équipe doit terminer les rédactions en cours avant d'en commencer une nouvelle.",
        "expected": "3 colonnes limitées — Rédaction en dépassement de 1 carte — 7 cartes dans le flux — terminer avant de commencer",
        "note": "Le principe « Stop starting, start finishing » impose de finir le travail en cours dès qu'une limite WIP est atteinte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Colonnes dotées d'une limite WIP",
        "stdin": "q:1",
        "expected": "4||4 colonnes||quatre"
      },
      {
        "label": "Question 2 — Colonne en dépassement de limite",
        "stdin": "q:2",
        "expected": "développement||developpement||la colonne développement||dev"
      },
      {
        "label": "Question 3 — Dépassement, en cartes",
        "stdin": "q:3",
        "expected": "1||1 carte"
      },
      {
        "label": "Question 4 — Cartes en cours dans le flux",
        "stdin": "q:4",
        "expected": "11||11 cartes"
      },
      {
        "label": "Question 5 — Que faire avant d'entamer de nouvelles cartes",
        "stdin": "q:5",
        "expected": "terminer le travail en cours||finir le travail en cours||terminer le travail||finir le travail"
      },
      {
        "label": "Question 6 — Ce que révèle un dépassement récurrent",
        "stdin": "q:6",
        "expected": "un goulot d'étranglement||un goulot d’étranglement||goulot d'étranglement||goulot d’étranglement||un goulot||goulot||le goulot d'étranglement||le goulot d’étranglement"
      }
    ],
    "solution": "[Question 1 — Colonnes dotées d'une limite WIP]\n4\n\n[Question 2 — Colonne en dépassement de limite]\ndéveloppement\n\n[Question 3 — Dépassement, en cartes]\n1\n\n[Question 4 — Cartes en cours dans le flux]\n11\n\n[Question 5 — Que faire avant d'entamer de nouvelles cartes]\nterminer le travail en cours\n\n[Question 6 — Ce que révèle un dépassement récurrent]\nun goulot d'étranglement",
    "takeaway": "1) Quatre colonnes ont une limite : Analyse (3), Développement (4), Revue de code (3), Test (2). La colonne « À faire » n'en a pas.\n2) Développement : 5 cartes pour une limite de 4, c'est la seule en dépassement.\n3) Dépassement : 5 − 4 = 1 carte.\n4) Cartes dans le flux : 3 + 5 + 1 + 2 = 11 cartes.\n5) Terminer le travail en cours : tant que la limite de Développement est dépassée, l'équipe ne tire pas de nouvelles cartes (« Stop starting, start finishing »).\n6) Un dépassement récurrent révèle un goulot d'étranglement : l'étape n'absorbe pas le débit demandé et bride tout le flux en amont.\nContrôle : 12 cartes « À faire » + 11 cartes dans le flux = 23 cartes visibles sur le tableau."
  },
  {
    "id": "ag3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les délais de traitement des demandes du Crédit Urbain",
    "exampleTitle": "Exemple résolu — les demandes de matériel de la mairie de Bonneval",
    "goal": "Calculer le Lead Time, le Cycle Time et le temps d'attente d'une demande, puis le temps de cycle moyen de l'équipe.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe « prêts immo » du Crédit Urbain traite les demandes de crédit immobilier. Pour piloter son flux, elle relève pour chaque demande trois dates : la réception du dossier (création), le début de l'instruction (prise en charge) et l'émission de l'offre de prêt (livraison). Les quatre demandes de la semaine 18, datées en jours du mois, donnent :</p><table><tr><th>Demande</th><th>Reçue le</th><th>Prise en charge le</th><th>Offre émise le</th></tr><tr><th>DEM-104</th><td>jour 2</td><td>jour 9</td><td>jour 20</td></tr><tr><th>DEM-105</th><td>jour 5</td><td>jour 5</td><td>jour 12</td></tr><tr><th>DEM-106</th><td>jour 8</td><td>jour 14</td><td>jour 21</td></tr><tr><th>DEM-107</th><td>jour 10</td><td>jour 18</td><td>jour 25</td></tr></table><p>Définitions : Lead Time = livraison − création ; Cycle Time = livraison − prise en charge ; temps d'attente = prise en charge − création.</p><ol><li>Quel est le Lead Time de DEM-104, en jours ?</li><li>Quel est le Cycle Time de DEM-104, en jours ?</li><li>Quel est le temps d'attente de DEM-107, en jours ?</li><li>Quelle demande a le Lead Time le plus long ? Répondez par son identifiant.</li><li>Quel est le Cycle Time moyen de l'équipe (arrondi au dixième si nécessaire) ?</li><li>Pour DEM-106, que vaut la somme du temps d'attente et du Cycle Time (en jours) ?</li></ol>",
    "starter": "# Exercice — Les délais de traitement des demandes du Crédit Urbain\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 4 : l'identifiant de la demande. Autres questions : le nombre seul.\n\n[Question 1 — Lead Time de DEM-104]\nA_COMPLETER\n\n[Question 2 — Cycle Time de DEM-104]\nA_COMPLETER\n\n[Question 3 — Temps d'attente de DEM-107]\nA_COMPLETER\n\n[Question 4 — Demande au Lead Time le plus long]\nA_COMPLETER\n\n[Question 5 — Cycle Time moyen de l'équipe]\nA_COMPLETER\n\n[Question 6 — Attente + Cycle Time de DEM-106]\nA_COMPLETER\n",
    "hints": [
      "Le Lead Time court pour le client (de la demande à la livraison) ; le Cycle Time court pour l'équipe (du démarrage du travail à la livraison).",
      "Le temps d'attente est la partie du Lead Time pendant laquelle personne ne travaille sur la demande.",
      "1. Lead = offre émise − réception. 2. Cycle = offre émise − prise en charge. 3. Attente = prise en charge − réception. 4. Calculez les quatre Lead Times et comparez. 5. Moyenne des Cycle Times. 6. Pour une même demande : attente + cycle = lead."
    ],
    "examples": [
      {
        "stdin": "La mairie de Bonneval relève trois demandes de matériel (jours du mois) :\nREQ-7 : créée le 3, démarrée le 8, livrée le 13.\nREQ-8 : créée le 6, démarrée le 6, livrée le 10.\nREQ-9 : créée le 9, démarrée le 15, livrée le 18.\n\n1) REQ-7 : lead = 13 − 3 = 10 j, cycle = 13 − 8 = 5 j, attente = 5 j.\n2) REQ-9 : attente = 15 − 9 = 6 j.\n3) Cycle moyen : (5 + 4 + 3) / 3 = 4 j.\n4) REQ-9 : attente 6 + cycle 3 = 9 j, égal au lead (18 − 9).",
        "expected": "REQ-7 : lead 10 j, cycle 5 j — REQ-9 : attente 6 j — cycle moyen 4 j — attente + cycle = lead",
        "note": "Le Lead Time se décompose toujours : attente avant prise en charge + temps de traitement actif."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Lead Time de DEM-104",
        "stdin": "q:1",
        "expected": "18||18 jours||18 j"
      },
      {
        "label": "Question 2 — Cycle Time de DEM-104",
        "stdin": "q:2",
        "expected": "11||11 jours||11 j"
      },
      {
        "label": "Question 3 — Temps d'attente de DEM-107",
        "stdin": "q:3",
        "expected": "8||8 jours||8 j"
      },
      {
        "label": "Question 4 — Demande au Lead Time le plus long",
        "stdin": "q:4",
        "expected": "dem-104||DEM-104"
      },
      {
        "label": "Question 5 — Cycle Time moyen de l'équipe",
        "stdin": "q:5",
        "expected": "8||8,0||8.0||8 jours"
      },
      {
        "label": "Question 6 — Attente + Cycle Time de DEM-106",
        "stdin": "q:6",
        "expected": "13||13 jours||13 j"
      }
    ],
    "solution": "[Question 1 — Lead Time de DEM-104]\n18\n\n[Question 2 — Cycle Time de DEM-104]\n11\n\n[Question 3 — Temps d'attente de DEM-107]\n8\n\n[Question 4 — Demande au Lead Time le plus long]\ndem-104\n\n[Question 5 — Cycle Time moyen de l'équipe]\n8\n\n[Question 6 — Attente + Cycle Time de DEM-106]\n13",
    "takeaway": "1) Lead Time de DEM-104 : 20 − 2 = 18 jours.\n2) Cycle Time de DEM-104 : 20 − 9 = 11 jours.\n3) Temps d'attente de DEM-107 : 18 − 10 = 8 jours.\n4) Lead Times : DEM-104 : 18 ; DEM-105 : 7 ; DEM-106 : 13 ; DEM-107 : 15. Le plus long est DEM-104.\n5) Cycle Times : 11, 7, 7, 7. Moyenne : 32 / 4 = 8 jours.\n6) DEM-106 : attente 14 − 8 = 6 et cycle 21 − 14 = 7 ; 6 + 7 = 13, exactement son Lead Time (21 − 8).\nContrôle : pour chaque demande, attente + cycle = lead (18 = 7 + 11 ; 7 = 0 + 7 ; 13 = 6 + 7 ; 15 = 8 + 7)."
  },
  {
    "id": "ag3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La chaîne de remboursements de Vitalia et la loi de Little",
    "exampleTitle": "Exemple résolu — la chaîne de modération de Streamo",
    "goal": "Appliquer la loi de Little (débit = WIP / temps de cycle) pour identifier le goulot d'étranglement d'une chaîne de valeur.",
    "brief": "<p><strong>Énoncé.</strong> Vitalia, mutuelle santé, traite les demandes de remboursement en trois étapes successives. Sur un mois de régime stable, le responsable des opérations relève le travail en cours moyen (WIP, en dossiers) et le temps de cycle moyen (en jours) de chaque étape :</p><table><tr><th>Étape</th><th>WIP moyen (dossiers)</th><th>Temps de cycle moyen (jours)</th></tr><tr><th>Réception et contrôle</th><td>12</td><td>2</td></tr><tr><th>Instruction du dossier</th><td>10</td><td>5</td></tr><tr><th>Paiement et notification</th><td>9</td><td>3</td></tr></table><p>Rappel de la loi de Little : débit (dossiers par jour) = WIP / temps de cycle.</p><ol><li>Quel est le débit de l'étape « Réception et contrôle », en dossiers par jour ?</li><li>Quel est le débit de l'étape « Instruction du dossier », en dossiers par jour ?</li><li>Quelle étape constitue le goulot d'étranglement de la chaîne ? Répondez par son nom exact.</li><li>Quelle est la cadence maximale de l'ensemble de la chaîne, en dossiers par jour ?</li><li>Le WIP de l'instruction restant à 10 dossiers, quel temps de cycle (en jours) faudrait-il atteindre pour porter son débit à 5 dossiers par jour ?</li><li>Si l'étape « Paiement et notification » double sa cadence sans que l'instruction change, quel est le nouveau débit maximal de la chaîne, en dossiers par jour ?</li></ol>",
    "starter": "# Exercice — La chaîne de remboursements de Vitalia et la loi de Little\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 3 : le nom exact de l'étape. Autres questions : le nombre seul.\n\n[Question 1 — Débit de Réception et contrôle]\nA_COMPLETER\n\n[Question 2 — Débit de Instruction du dossier]\nA_COMPLETER\n\n[Question 3 — Goulot d'étranglement de la chaîne]\nA_COMPLETER\n\n[Question 4 — Cadence maximale de la chaîne]\nA_COMPLETER\n\n[Question 5 — Temps de cycle cible pour un débit de 5]\nA_COMPLETER\n\n[Question 6 — Nouveau débit si le paiement double sa cadence]\nA_COMPLETER\n",
    "hints": [
      "La loi de Little relie trois variables d'un système stable : le travail en cours, le temps de cycle et le débit.",
      "Le débit d'une étape se calcule en divisant son WIP par son temps de cycle moyen.",
      "1. Réception : 12 / 2. 2. Instruction : 10 / 5. 3. Le goulot est l'étape au débit minimal. 4. La chaîne ne va pas plus vite que son goulot. 5. Retournez la loi de Little : CT = WIP / débit visé. 6. Accélérer une étape non goulot ne change pas le débit global."
    ],
    "examples": [
      {
        "stdin": "Streamo modère les vidéos en trois étapes (WIP, temps de cycle en heures) :\nDépôt : WIP 8, CT 2 h. Analyse IA : WIP 6, CT 3 h. Décision humaine : WIP 4, CT 1 h.\n\n1) Dépôt : 8 / 2 = 4 vidéos/h.\n2) Analyse IA : 6 / 3 = 2 vidéos/h.\n3) Goulot : analyse IA (débit minimal).\n4) Cadence maximale de la chaîne : 2 vidéos/h.\n5) Pour porter l'analyse à 3 vidéos/h avec WIP 6 : CT = 6 / 3 = 2 h.",
        "expected": "débit dépôt 4/h — analyse IA 2/h — goulot : analyse IA — cadence chaîne 2/h — CT cible 2 h",
        "note": "Le goulot impose sa cadence à toute la chaîne : accélérer les autres étapes ne change pas le débit global."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Débit de Réception et contrôle",
        "stdin": "q:1",
        "expected": "6||6 dossiers||6 dossiers par jour||6/j"
      },
      {
        "label": "Question 2 — Débit de Instruction du dossier",
        "stdin": "q:2",
        "expected": "2||2 dossiers||2 dossiers par jour||2/j"
      },
      {
        "label": "Question 3 — Goulot d'étranglement de la chaîne",
        "stdin": "q:3",
        "expected": "instruction du dossier||l'instruction du dossier||l’instruction du dossier||instruction"
      },
      {
        "label": "Question 4 — Cadence maximale de la chaîne",
        "stdin": "q:4",
        "expected": "2||2 dossiers||2 dossiers par jour||2/j"
      },
      {
        "label": "Question 5 — Temps de cycle cible pour un débit de 5",
        "stdin": "q:5",
        "expected": "2||2 jours||2 j"
      },
      {
        "label": "Question 6 — Nouveau débit si le paiement double sa cadence",
        "stdin": "q:6",
        "expected": "2||2 dossiers||2 dossiers par jour||2/j"
      }
    ],
    "solution": "[Question 1 — Débit de Réception et contrôle]\n6\n\n[Question 2 — Débit de Instruction du dossier]\n2\n\n[Question 3 — Goulot d'étranglement de la chaîne]\ninstruction du dossier\n\n[Question 4 — Cadence maximale de la chaîne]\n2\n\n[Question 5 — Temps de cycle cible pour un débit de 5]\n2\n\n[Question 6 — Nouveau débit si le paiement double sa cadence]\n2",
    "takeaway": "1) Réception et contrôle : 12 / 2 = 6 dossiers par jour.\n2) Instruction du dossier : 10 / 5 = 2 dossiers par jour.\n3) L'instruction a le débit minimal (2 contre 6 et 3) : c'est le goulot d'étranglement.\n4) La chaîne ne dépasse jamais le débit de son goulot : 2 dossiers par jour.\n5) CT = WIP / débit visé = 10 / 5 = 2 jours (contre 5 aujourd'hui).\n6) Le paiement passerait de 3 à 6 dossiers par jour, mais le goulot reste l'instruction à 2 : le débit maximal de la chaîne reste 2 dossiers par jour.\nContrôle : pour élever le débit global, seule l'étape goulot compte ; les débits des autres étapes (6 et 3, puis 6 après doublement) restent au-dessus du goulot à 2."
  }
];
