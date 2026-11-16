/**
 * chapitre6.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
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
