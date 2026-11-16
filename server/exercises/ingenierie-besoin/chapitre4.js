/**
 * chapitre4.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "User stories : le canevas Connextra d'EcoRide",
    "exampleTitle": "Exemple résolu — les stories de la médiathèque de Rivage",
    "goal": "Découper une user story selon le canevas Connextra : rôle, action et bénéfice, et repérer les stories non conformes.",
    "brief": "<p><strong>Énoncé.</strong> Pour l'application de covoiturage interne EcoRide (société Novaterra), l'équipe a rédigé trois user stories :</p><ul><li><strong>US-1</strong> : « En tant que salarié, je veux publier mon trajet domicile-travail, afin de partager mes frais de carburant. »</li><li><strong>US-2</strong> : « En tant que passagère, je veux réserver une place, afin d'arriver à l'heure au bureau. »</li><li><strong>US-3</strong> : « Je veux recevoir un SMS à chaque réservation de place. »</li></ul><p>Rappel du cours : le canevas canonique d'une user story s'écrit « <strong>En tant que</strong> rôle, <strong>je veux</strong> action, <strong>afin de</strong> bénéfice. »</p><ol><li>Quel est le rôle (le qui) de la US-1 ?</li><li>Quelle est l'action (le je veux) de la US-2 ?</li><li>Quel groupe de mots du canevas introduit le bénéfice ?</li><li>La US-3 respecte-t-elle le canevas Connextra ? Répondez par oui ou non.</li><li>Quelle composante du canevas manque à la US-3 ?</li></ol>",
    "starter": "# Exercice — User stories : le canevas Connextra d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 4 : oui ou non. Question 5 : le rôle, l'action ou le bénéfice.\n\n[Question 1 — Rôle de la US-1]\nA_COMPLETER\n\n[Question 2 — Action de la US-2]\nA_COMPLETER\n\n[Question 3 — Mots du canevas qui introduisent le bénéfice]\nA_COMPLETER\n\n[Question 4 — La US-3 respecte-t-elle le canevas ?]\nA_COMPLETER\n\n[Question 5 — Composante manquante de la US-3]\nA_COMPLETER\n",
    "hints": [
      "Le canevas Connextra raconte une phrase à trois temps : qui agit (rôle), ce qu'il veut faire (action), ce qu'il y gagne (bénéfice).",
      "Repérez les trois marqueurs « En tant que », « je veux » et « afin de » ; le texte qui suit chaque marqueur donne la composante correspondante.",
      "1. US-1 : après « En tant que » vient le rôle. 2. US-2 : après « je veux » vient l'action. 3. Le bénéfice est introduit par « afin de ». 4. US-3 commence par « je veux » sans « En tant que » : elle est non conforme. 5. Le rôle manque."
    ],
    "examples": [
      {
        "stdin": "Médiathèque de Rivage, deux stories :\n- M-1 : « En tant qu'adhérent, je veux prolonger mon prêt en ligne, afin d'éviter les frais de retard. »\n- M-2 : « Je veux être notifié par courriel. »\n\n1) M-1 : rôle = adhérent ; action = prolonger mon prêt en ligne ; bénéfice = éviter les frais de retard (introduit par « afin de »).\n2) M-2 : non conforme, le rôle manque.",
        "expected": "M-1 conforme (adhérent / prolonger / éviter les frais) — M-2 non conforme : rôle manquant",
        "note": "Une story sans rôle ne dit pas pour qui le produit construit : le bénéfice devient invérifiable."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Rôle de la US-1",
        "stdin": "q:1",
        "expected": "le salarié||salarié||un salarié||l'employé||employé"
      },
      {
        "label": "Question 2 — Action de la US-2",
        "stdin": "q:2",
        "expected": "réserver une place||reserver une place||réserver une place dans un trajet||réserver une place de covoiturage"
      },
      {
        "label": "Question 3 — Mots du canevas qui introduisent le bénéfice",
        "stdin": "q:3",
        "expected": "afin de||afin de quel bénéfice||pour"
      },
      {
        "label": "Question 4 — La US-3 respecte-t-elle le canevas ?",
        "stdin": "q:4",
        "expected": "non||non, elle est non conforme||non conforme"
      },
      {
        "label": "Question 5 — Composante manquante de la US-3",
        "stdin": "q:5",
        "expected": "le rôle||rôle||le role||role||l'acteur||acteur"
      }
    ],
    "solution": "[Question 1 — Rôle de la US-1]\nle salarié\n\n[Question 2 — Action de la US-2]\nréserver une place\n\n[Question 3 — Mots du canevas qui introduisent le bénéfice]\nafin de\n\n[Question 4 — La US-3 respecte-t-elle le canevas ?]\nnon\n\n[Question 5 — Composante manquante de la US-3]\nle rôle",
    "takeaway": "1) Le rôle de la US-1 est le salarié ( « En tant que salarié » ).\n2) L'action de la US-2 est « réserver une place » (ce qui suit « je veux »).\n3) Le bénéfice est introduit par « afin de ».\n4) La US-3 ne respecte pas le canevas : elle commence directement par « je veux ».\n5) La composante manquante de la US-3 est le rôle : on ne sait pas pour quel utilisateur le SMS est prévu.\nContrôle : US-1 et US-2 portent les trois marqueurs (En tant que, je veux, afin de) ; US-3 n'en porte qu'un."
  },
  {
    id: "ib2-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Priorisation MoSCoW d’un Backlog",
    goal: "Calculer la répartition des points d’effort par catégorie MoSCoW dans un sprint ou une release.",
    brief: "<p>La méthode <strong>MoSCoW</strong> classe les exigences en 4 catégories : <code>Must</code>, <code>Should</code>, <code>Could</code> et <code>Won't</code>.</p><p>À partir des données du cas :<br>- Première ligne : le nombre <code>N</code> d’exigences.<br>- Les <code>N</code> lignes suivantes : <code>ID;Titre;MoSCoW;Points</code> (Points est un entier &ge; 0).<br>Affiche un dictionnaire JSON avec les totaux par catégorie et le total général au format strict :<br><code>{\"Must\": X, \"Should\": Y, \"Could\": Z, \"Wont\": W, \"Total\": T}</code>.</p>",
    starter: "# Grille d'analyse (ib2-c4-e2) — Priorisation MoSCoW d’un Backlog\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : REQ-01;Paiement;Must;8\n# Données : REQ-02;Remboursement;Must;5\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : US-10;Export;Could;3\n# Données : US-11;Audit;Wont;5\n# Données : US-12;SSO;Must;8\n# Données : US-13;PDF;Should;5\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : US-99;Refonte globale;Won't;13\nA_COMPLETER\n",
    hints: [
          "Initialisez un dictionnaire avec {\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 0}.",
          "Attention à mapper \"Won't\" ou \"Wont\" vers la clé \"Wont\" dans la sortie JSON.",
          "Utilisez json.dumps(res) pour afficher le JSON sur une seule ligne."
    ],
    examples: [
          {
                "stdin": "3\nUS-1;Connexion;Must;5\nUS-2;Filtres;Should;3\nUS-3;Theme sombre;Could;2",
                "expected": "{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}",
                "note": "Must: 5, Should: 3, Could: 2, Wont: 0, Total: 10 points."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}"
          }
    ],
    solution: "[Exemple]\n{\"Must\": 5, \"Should\": 3, \"Could\": 2, \"Wont\": 0, \"Total\": 10}\n\n[Cas 1 — Test 1]\n{\"Must\": 13, \"Should\": 0, \"Could\": 0, \"Wont\": 0, \"Total\": 13}\n\n[Cas 2 — Test 2]\n{\"Must\": 8, \"Should\": 5, \"Could\": 3, \"Wont\": 5, \"Total\": 21}\n\n[Cas 3 — Test 3]\n{\"Must\": 0, \"Should\": 0, \"Could\": 0, \"Wont\": 13, \"Total\": 13}\n",
    takeaway: "À retenir : Calculer la répartition des points d’effort par catégorie MoSCoW dans un sprint ou une release.\nRepère : Must: 5, Should: 3, Could: 2, Wont: 0, Total: 10 points."
  },
  {
    "id": "ib2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "WSJF : chiffrer le coût du retard des fonctionnalités d'EcoRide",
    "exampleTitle": "Exemple résolu — les fonctionnalités logistiques de SaharaLog",
    "goal": "Calculer le coût du retard (CoD) et le score WSJF pour ordonnancer des fonctionnalités par valeur par unité de temps.",
    "brief": "<p><strong>Énoncé.</strong> Le comité produit de Novaterra priorise trois fonctionnalités d'EcoRide avec l'algorithme <strong>WSJF</strong> (Weighted Shortest Job First) issu de SAFe. Rappels :</p><ul><li><strong>CoD</strong> (coût du retard) = valeur métier + criticité temporelle + réduction de risque ;</li><li><strong>Score WSJF</strong> = CoD divisé par la taille du travail.</li></ul><p>Les estimations du comité :</p><table><tr><th>Fonctionnalité</th><th>Valeur métier</th><th>Criticité temporelle</th><th>Réduction de risque</th><th>Taille</th></tr><tr><th>F1</th><td>5</td><td>3</td><td>2</td><td>4</td></tr><tr><th>F2</th><td>8</td><td>5</td><td>3</td><td>4</td></tr><tr><th>F3</th><td>3</td><td>2</td><td>1</td><td>3</td></tr></table><p>Arrondissez les scores au dixième si nécessaire ; répondez par le nombre seul aux questions 1 à 3 et 6.</p><ol><li>Quel est le CoD de la fonctionnalité F2 ?</li><li>Quel est le score WSJF de F1 ?</li><li>Quel est le score WSJF de F2 ?</li><li>Quelle fonctionnalité le comité doit-il lancer en premier ?</li><li>Que désigne le sigle CoD en français ?</li><li>Quel est le score WSJF de F3 ?</li></ol>",
    "starter": "# Exercice — WSJF : chiffrer le coût du retard des fonctionnalités d'EcoRide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 6 : le nombre seul. Question 4 : l'identifiant (F1, F2 ou F3).\n\n[Question 1 — CoD de la fonctionnalité F2]\nA_COMPLETER\n\n[Question 2 — Score WSJF de F1]\nA_COMPLETER\n\n[Question 3 — Score WSJF de F2]\nA_COMPLETER\n\n[Question 4 — Fonctionnalité à lancer en premier]\nA_COMPLETER\n\n[Question 5 — Signification française du sigle CoD]\nA_COMPLETER\n\n[Question 6 — Score WSJF de F3]\nA_COMPLETER\n",
    "hints": [
      "Le CoD additionne les trois composantes de valeur : métier, urgence et réduction de risque ; la taille ne compte pas dans le CoD.",
      "Le score WSJF divise le CoD par la taille : à valeur égale, la fonctionnalité la plus courte sort en tête.",
      "1. CoD de F2 : 8 + 5 + 3. 2. WSJF de F1 : (5 + 3 + 2)/4. 3. WSJF de F2 : 16/4. 4. Le plus grand score se lance en premier. 5. CoD = coût du retard. 6. WSJF de F3 : (3 + 2 + 1)/3."
    ],
    "examples": [
      {
        "stdin": "SaharaLog priorise ses fonctionnalités de suivi de flotte :\nG1 : valeur 6, criticité 4, risque 2, taille 3 ;\nG2 : valeur 3, criticité 1, risque 1, taille 2 ;\nG3 : valeur 9, criticité 6, risque 3, taille 6.\n\n1) CoD de G1 : 6 + 4 + 2 = 12 ; WSJF : 12/3 = 4,0.\n2) G2 : CoD 5 ; WSJF : 5/2 = 2,5.\n3) G3 : CoD 18 ; WSJF : 18/6 = 3,0.\n4) Ordre de lancement : G1 (4,0), puis G3 (3,0), puis G2 (2,5).",
        "expected": "G1 WSJF 4,0 (première) — G3 3,0 — G2 2,5 (dernière)",
        "note": "Le meilleur rapport valeur sur taille gagne, même si une autre fonctionnalité porte une valeur métier brute plus élevée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — CoD de la fonctionnalité F2",
        "stdin": "q:1",
        "expected": "16"
      },
      {
        "label": "Question 2 — Score WSJF de F1",
        "stdin": "q:2",
        "expected": "2,5||2.5"
      },
      {
        "label": "Question 3 — Score WSJF de F2",
        "stdin": "q:3",
        "expected": "4,0||4.0||4"
      },
      {
        "label": "Question 4 — Fonctionnalité à lancer en premier",
        "stdin": "q:4",
        "expected": "F2||la fonctionnalité F2||le paiement intégré des frais"
      },
      {
        "label": "Question 5 — Signification française du sigle CoD",
        "stdin": "q:5",
        "expected": "le coût du retard||coût du retard||cout du retard||le cout du retard"
      },
      {
        "label": "Question 6 — Score WSJF de F3",
        "stdin": "q:6",
        "expected": "2,0||2.0||2"
      }
    ],
    "solution": "[Question 1 — CoD de la fonctionnalité F2]\n16\n\n[Question 2 — Score WSJF de F1]\n2,5\n\n[Question 3 — Score WSJF de F2]\n4,0\n\n[Question 4 — Fonctionnalité à lancer en premier]\nF2\n\n[Question 5 — Signification française du sigle CoD]\nle coût du retard\n\n[Question 6 — Score WSJF de F3]\n2,0",
    "takeaway": "1) CoD de F2 = 8 (valeur) + 5 (criticité) + 3 (risque) = 16.\n2) WSJF de F1 = (5 + 3 + 2)/4 = 10/4 = 2,5.\n3) WSJF de F2 = 16/4 = 4,0.\n4) F2 obtient le meilleur score (4,0 devant 2,5 et 2,0) : c'est elle qu'il faut lancer en premier.\n5) CoD signifie coût du retard (Cost of Delay).\n6) WSJF de F3 = (3 + 2 + 1)/3 = 6/3 = 2,0.\nContrôle : l'ordre WSJF est F2 (4,0), puis F1 (2,5), puis F3 (2,0) ; la somme des tailles vaut 4 + 4 + 3 = 11."
  }
];
