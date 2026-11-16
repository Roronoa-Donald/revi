/**
 * chapitre5.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ag3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "La vélocité de l'équipe Orion et l'atterrissage de la version 2.0",
    "exampleTitle": "Exemple résolu — la vélocité de l'équipe Lumen",
    "goal": "Calculer une vélocité moyenne sur plusieurs sprints et en déduire le nombre de sprints pour vider un backlog.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe Orion développe un portail de réservation de salles pour l'université. Sur ses six derniers sprints, elle a livré (points conformes à la Definition of Done uniquement) :</p><table><tr><th>Sprint</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>S5</th><th>S6</th></tr><tr><th>Points livrés</th><td>34</td><td>28</td><td>40</td><td>32</td><td>36</td><td>28</td></tr></table><p>Le Product Backlog restant pour la version 2.0 représente <strong>190 points</strong>. Le sprint S7 offre une capacité de 33 points ; la Product Owner y sélectionne, dans l'ordre de priorité : ST-A (13 points), ST-B (8), ST-C (5), ST-D (3), ST-E (8).</p><p>Répondez par le nombre seul, sauf pour les questions 5 et 6.</p><ol><li>Combien de points l'équipe a-t-elle livrés au total sur les six sprints ?</li><li>Quelle est la vélocité moyenne de l'équipe (points par sprint) ?</li><li>En restant sur cette vélocité moyenne, combien de sprints faut-il pour terminer les 190 points restants (arrondissez au sprint supérieur) ?</li><li>Sans dépasser la capacité de 33 points du sprint S7 et en respectant l'ordre de priorité, combien de points la PO peut-elle engager ?</li><li>La direction veut comparer la vélocité d'Orion (33) à celle de l'équipe Lyra (55) pour désigner la « meilleure » équipe. Cette comparaison a-t-elle un sens ? Répondez par oui ou non.</li><li>Dans la vélocité, ne compte-t-on que les points estimés au Sprint Planning ou uniquement les points réellement terminés selon la DoD ? Répondez en un mot : estimés ou terminés.</li></ol>",
    "starter": "# Exercice — La vélocité de l'équipe Orion et l'atterrissage de la version 2.0\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Question 5 : oui ou non. Question 6 : estimés ou terminés.\n\n[Question 1 — Points livrés sur les six sprints]\nA_COMPLETER\n\n[Question 2 — Vélocité moyenne]\nA_COMPLETER\n\n[Question 3 — Sprints nécessaires pour 190 points]\nA_COMPLETER\n\n[Question 4 — Points engageables au sprint S7]\nA_COMPLETER\n\n[Question 5 — La comparaison avec Lyra a-t-elle un sens ?]\nA_COMPLETER\n\n[Question 6 — Que compte la vélocité : estimés ou terminés ?]\nA_COMPLETER\n",
    "hints": [
      "La vélocité est un fait d'équipe : la moyenne des points réellement livrés et conformes à la DoD, sprint après sprint.",
      "Pour prévoir un atterrissage, divisez le backlog restant par la vélocité moyenne et arrondissez au sprint supérieur.",
      "1. Additionnez les six sprints. 2. Divisez par 6. 3. 190 / vélocité, arrondi au-dessus. 4. Cumulez les stories dans l'ordre de priorité et arrêtez-vous juste avant de dépasser la capacité. 5. Chaque équipe estime différemment : ses points ne sont pas comparables. 6. Seul le travail conforme à la DoD compte."
    ],
    "examples": [
      {
        "stdin": "L'équipe Lumen a livré sur quatre sprints : 18, 22, 20, 24 points.\nLe backlog restant vaut 90 points.\n\n1) Total : 18 + 22 + 20 + 24 = 84 points.\n2) Vélocité moyenne : 84 / 4 = 21 points par sprint.\n3) 90 / 21 = 4,3 → 5 sprints.\n4) La vélocité ne compte que les stories terminées conformes à la DoD.",
        "expected": "total 84 — vélocité 21 — 5 sprints pour 90 points — ne compter que le terminé",
        "note": "La vélocité est un fait d'équipe, pas un objectif ni un instrument de comparaison entre équipes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Points livrés sur les six sprints",
        "stdin": "q:1",
        "expected": "198||198 points"
      },
      {
        "label": "Question 2 — Vélocité moyenne",
        "stdin": "q:2",
        "expected": "33||33 points||33 points par sprint"
      },
      {
        "label": "Question 3 — Sprints nécessaires pour 190 points",
        "stdin": "q:3",
        "expected": "6||6 sprints||six"
      },
      {
        "label": "Question 4 — Points engageables au sprint S7",
        "stdin": "q:4",
        "expected": "29||29 points"
      },
      {
        "label": "Question 5 — La comparaison avec Lyra a-t-elle un sens ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Que compte la vélocité : estimés ou terminés ?",
        "stdin": "q:6",
        "expected": "terminés||termines||les points terminés"
      }
    ],
    "solution": "[Question 1 — Points livrés sur les six sprints]\n198\n\n[Question 2 — Vélocité moyenne]\n33\n\n[Question 3 — Sprints nécessaires pour 190 points]\n6\n\n[Question 4 — Points engageables au sprint S7]\n29\n\n[Question 5 — La comparaison avec Lyra a-t-elle un sens ?]\nnon\n\n[Question 6 — Que compte la vélocité : estimés ou terminés ?]\nterminés",
    "takeaway": "1) Total livré : 34 + 28 + 40 + 32 + 36 + 28 = 198 points.\n2) Vélocité moyenne : 198 / 6 = 33 points par sprint.\n3) 190 / 33 = 5,76 : il faut arrondir au sprint supérieur, soit 6 sprints.\n4) Cumul dans l'ordre de priorité : 13 + 8 + 5 + 3 = 29 points ; ajouter ST-E porterait à 37, au-delà de la capacité de 33. La PO engage 29 points.\n5) Non : chaque équipe estime avec ses propres cartes et son propre référentiel ; les points d'Orion et de Lyra ne sont pas comparables.\n6) Terminés : la vélocité ne compte que les points réellement finis et conformes à la Definition of Done.\nContrôle : 6 sprints × 33 points = 198 ≥ 190, et 5 sprints × 33 = 165 < 190 : l'arrondi au supérieur est bien nécessaire."
  },
  {
    "id": "ag3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le burn-down du sprint 9 de l'équipe Atlas",
    "exampleTitle": "Exemple résolu — le burn-down du sprint 4 de l'équipe Nova",
    "goal": "Lire un burn-down de sprint, comparer le reste à faire à la ligne idéale et chiffrer le Scope Creep.",
    "brief": "<p><strong>Énoncé.</strong> L'équipe Atlas, qui développe l'intranet RH d'un groupe industriel, a engagé <strong>60 points</strong> pour un sprint de <strong>10 jours ouvrés</strong>. Chaque soir, le Scrum Master relève le reste à faire et les points ajoutés en cours de sprint :</p><table><tr><th>Jour</th><th>J2</th><th>J4</th><th>J6</th><th>J8</th><th>J10</th></tr><tr><th>Reste à faire (points)</th><td>52</td><td>47</td><td>38</td><td>25</td><td>4</td></tr><tr><th>Points ajoutés</th><td>0</td><td>5</td><td>0</td><td>3</td><td>0</td></tr></table><p>La ligne idéale descend en ligne droite de 60 points au jour 0 jusqu'à 0 point au jour 10.</p><ol><li>Quelle est la pente idéale, en points par jour ouvré ?</li><li>Quel est le reste à faire idéal au jour 4 ?</li><li>Au jour 2, l'équipe est-elle en avance ou en retard sur la ligne idéale ? Répondez par avance ou retard.</li><li>Combien de points ont été ajoutés au Sprint Backlog en cours de sprint ?</li><li>Combien de points restent à faire au dernier jour du sprint ?</li><li>Comment nomme-t-on, en anglais, l'ajout de périmètre non prévu en cours de sprint ? Répondez par l'expression consacrée.</li></ol>",
    "starter": "# Exercice — Le burn-down du sprint 9 de l'équipe Atlas\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2, 4 et 5 : le nombre seul. Question 3 : avance ou retard.\n\n[Question 1 — Pente idéale (points par jour)]\nA_COMPLETER\n\n[Question 2 — Reste à faire idéal au jour 4]\nA_COMPLETER\n\n[Question 3 — Position au jour 2 par rapport à l'idéal]\nA_COMPLETER\n\n[Question 4 — Points ajoutés au Sprint Backlog en cours de sprint]\nA_COMPLETER\n\n[Question 5 — Reste à faire au jour 10]\nA_COMPLETER\n\n[Question 6 — Nom anglais de l'ajout de périmètre en cours de sprint]\nA_COMPLETER\n",
    "hints": [
      "La ligne idéale relie l'engagement du sprint (jour 0) au zéro (dernier jour) : sa pente est constante.",
      "Au-dessus de la ligne idéale, il reste trop à faire : retard ; en dessous, avance.",
      "1. Pente = engagement / nombre de jours. 2. Reste idéal = 60 − 4 × pente. 3. Comparez 52 au reste idéal du jour 2. 4. Additionnez les points ajoutés. 5. Lisez la dernière colonne. 6. L'expression consacrée commence par « scope »."
    ],
    "examples": [
      {
        "stdin": "L'équipe Nova engage 40 points pour 10 jours ouvrés.\nRelevés : J2 : 30 restants, 0 ajouté ; J5 : 24 restants, 4 ajoutés ; J10 : 0 restant.\n\n1) Pente idéale : 40 / 10 = 4 points/jour.\n2) Reste idéal à J5 : 40 − 5 × 4 = 20 points.\n3) À J5, 24 > 20 : l'équipe est en retard.\n4) Scope Creep total : 4 points.\n5) À J10 : 0 point restant, l'objectif est atteint.",
        "expected": "pente 4 — idéal à J5 : 20 — retard à J5 — 4 points ajoutés — 0 restant à J10",
        "note": "Les points ajoutés en cours de sprint redressent la ligne du reste à faire : c'est la signature du Scope Creep."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Pente idéale (points par jour)",
        "stdin": "q:1",
        "expected": "6||6 points||6 points par jour"
      },
      {
        "label": "Question 2 — Reste à faire idéal au jour 4",
        "stdin": "q:2",
        "expected": "36||36 points"
      },
      {
        "label": "Question 3 — Position au jour 2 par rapport à l'idéal",
        "stdin": "q:3",
        "expected": "retard||en retard"
      },
      {
        "label": "Question 4 — Points ajoutés au Sprint Backlog en cours de sprint",
        "stdin": "q:4",
        "expected": "8||8 points"
      },
      {
        "label": "Question 5 — Reste à faire au jour 10",
        "stdin": "q:5",
        "expected": "4||4 points"
      },
      {
        "label": "Question 6 — Nom anglais de l'ajout de périmètre en cours de sprint",
        "stdin": "q:6",
        "expected": "scope creep||le scope creep||dérive de périmètre||derive de perimetre"
      }
    ],
    "solution": "[Question 1 — Pente idéale (points par jour)]\n6\n\n[Question 2 — Reste à faire idéal au jour 4]\n36\n\n[Question 3 — Position au jour 2 par rapport à l'idéal]\nretard\n\n[Question 4 — Points ajoutés au Sprint Backlog en cours de sprint]\n8\n\n[Question 5 — Reste à faire au jour 10]\n4\n\n[Question 6 — Nom anglais de l'ajout de périmètre en cours de sprint]\nscope creep",
    "takeaway": "1) Pente idéale : 60 / 10 = 6 points par jour ouvré.\n2) Reste idéal au jour 4 : 60 − 4 × 6 = 36 points.\n3) Au jour 2, le reste idéal vaut 60 − 2 × 6 = 48 points ; l'équipe affiche 52, au-dessus de la ligne : elle est en retard.\n4) Scope Creep total : 5 + 3 = 8 points ajoutés en cours de sprint.\n5) Au jour 10, il reste 4 points : le sprint ne terminera pas son engagement.\n6) L'ajout de périmètre non prévu en cours de sprint s'appelle le Scope Creep (dérive de périmètre).\nContrôle : reste idéal au jour 10 = 60 − 10 × 6 = 0 ; les 4 points restants plus les 8 ajoutés expliquent le décalage constaté dès J2."
  },
  {
    "id": "ag3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La fourchette de livraison de la version 3.0 de Fluxo",
    "exampleTitle": "Exemple résolu — la version 2.0 de l'agenda TimeSync",
    "goal": "Bâtir une prévision de release à trois scénarios (optimiste, médian, pessimiste) à partir des vélocités observées.",
    "brief": "<p><strong>Énoncé.</strong> Fluxo édite un logiciel de facturation pour les artisans. La version 3.0 doit livrer un Product Backlog restant de <strong>240 points</strong>. Sur les huit derniers sprints, l'équipe a observé : vélocité minimale <strong>28</strong> points, vélocité maximale <strong>52</strong> points, vélocité moyenne <strong>40</strong> points.</p><p>La direction demande une prévision. La méthode du cours consiste à bâtir trois scénarios en arrondissant chaque nombre de sprints au sprint supérieur : scénario optimiste (vélocité maximale), scénario médian (vélocité moyenne), scénario pessimiste (vélocité minimale).</p><ol><li>Combien de sprints exige le scénario optimiste ?</li><li>Combien de sprints exige le scénario médian ?</li><li>Combien de sprints exige le scénario pessimiste ?</li><li>Quelle est l'amplitude de la fourchette, en sprints (pessimiste moins optimiste) ?</li><li>La direction veut une seule date ferme. Quelle borne l'équipe doit-elle communiquer pour un engagement prudent : optimiste, médian ou pessimiste ?</li><li>Comment s'appelle la zone d'incertitude qui se resserre au fil des sprints, à mesure que le backlog restant diminue ? Répondez par son nom.</li></ol>",
    "starter": "# Exercice — La fourchette de livraison de la version 3.0 de Fluxo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Question 5 : optimiste, médian ou pessimiste.\n\n[Question 1 — Sprints du scénario optimiste]\nA_COMPLETER\n\n[Question 2 — Sprints du scénario médian]\nA_COMPLETER\n\n[Question 3 — Sprints du scénario pessimiste]\nA_COMPLETER\n\n[Question 4 — Amplitude de la fourchette]\nA_COMPLETER\n\n[Question 5 — Borne à communiquer pour un engagement prudent]\nA_COMPLETER\n\n[Question 6 — Zone d'incertitude qui se resserre au fil des sprints]\nA_COMPLETER\n",
    "hints": [
      "Chaque scénario divise le backlog restant par la vélocité correspondante, puis arrondit au sprint supérieur.",
      "L'optimiste utilise la meilleure vélocité observée, le pessimiste la pire : l'amplitude mesure l'incertitude.",
      "1. 240 / 52, arrondi au-dessus. 2. 240 / 40. 3. 240 / 28. 4. Pessimiste − optimiste. 5. Pour tenir un engagement, se fier au scénario le plus lent. 6. Le nom de cette zone commence par « cône »."
    ],
    "examples": [
      {
        "stdin": "TimeSync prépare sa version 2 avec 100 points restants.\nVélocités observées : minimale 15, moyenne 22, maximale 30.\n\n1) Optimiste : 100 / 30 = 3,33 → 4 sprints.\n2) Médian : 100 / 22 = 4,55 → 5 sprints.\n3) Pessimiste : 100 / 15 = 6,67 → 7 sprints.\n4) Amplitude : 7 − 4 = 3 sprints.\n5) Engagement prudent : 7 sprints.",
        "expected": "optimiste 4 — médian 5 — pessimiste 7 — amplitude 3 — engagement prudent : 7 sprints",
        "note": "Une date unique cache l'incertitude ; la fourchette la rend visible et discutable."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sprints du scénario optimiste",
        "stdin": "q:1",
        "expected": "5||5 sprints||cinq"
      },
      {
        "label": "Question 2 — Sprints du scénario médian",
        "stdin": "q:2",
        "expected": "6||6 sprints||six"
      },
      {
        "label": "Question 3 — Sprints du scénario pessimiste",
        "stdin": "q:3",
        "expected": "9||9 sprints||neuf"
      },
      {
        "label": "Question 4 — Amplitude de la fourchette",
        "stdin": "q:4",
        "expected": "4||4 sprints"
      },
      {
        "label": "Question 5 — Borne à communiquer pour un engagement prudent",
        "stdin": "q:5",
        "expected": "pessimiste||la borne pessimiste||le scénario pessimiste"
      },
      {
        "label": "Question 6 — Zone d'incertitude qui se resserre au fil des sprints",
        "stdin": "q:6",
        "expected": "le cône d'incertitude||le cône d’incertitude||cône d'incertitude||cône d’incertitude||le cône d'incertitude"
      }
    ],
    "solution": "[Question 1 — Sprints du scénario optimiste]\n5\n\n[Question 2 — Sprints du scénario médian]\n6\n\n[Question 3 — Sprints du scénario pessimiste]\n9\n\n[Question 4 — Amplitude de la fourchette]\n4\n\n[Question 5 — Borne à communiquer pour un engagement prudent]\npessimiste\n\n[Question 6 — Zone d'incertitude qui se resserre au fil des sprints]\nle cône d'incertitude",
    "takeaway": "1) Optimiste : 240 / 52 = 4,61, arrondi au sprint supérieur : 5 sprints.\n2) Médian : 240 / 40 = 6 sprints exactement.\n3) Pessimiste : 240 / 28 = 8,57, arrondi au sprint supérieur : 9 sprints.\n4) Amplitude : 9 − 5 = 4 sprints d'écart entre le meilleur et le pire scénario.\n5) Pour un engagement prudent, l'équipe communique la borne pessimiste : 9 sprints.\n6) Cette zone d'incertitude qui se resserre au fil du projet s'appelle le cône d'incertitude.\nContrôle : 5 sprints × 52 = 260 ≥ 240 ; 4 sprints × 52 = 208 < 240 ; 9 sprints × 28 = 252 ≥ 240 : chaque arrondi au supérieur couvre bien le backlog."
  }
];
