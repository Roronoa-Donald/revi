/**
 * chapitre1.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "vt3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les brèves du lundi de la fromagerie du Val",
    "exampleTitle": "Exemple résolu — la revue d'actualité de la brasserie des Cimes",
    "goal": "Classer des informations réelles dans les cinq domaines sectoriels de la veille et choisir la posture de réponse.",
    "brief": "<p><strong>Énoncé.</strong> La fromagerie « Ferme du Val », 45 salariés, affine des fromages AOP en Normandie. Chaque lundi matin, son assistante compile pour la direction les cinq brèves suivantes, relevées la semaine passée dans la presse spécialisée :</p><table><tr><th>n°</th><th>Brève relevée</th></tr><tr><th>1</th><td>« Le concurrent Beillevaire lance une gamme de fromages sans lactose à prix réduit. »</td></tr><tr><th>2</th><td>« Un institut de recherche annonce un procédé d'affinage piloté par capteurs connectés. »</td></tr><tr><th>3</th><td>« Un décret durcit l'étiquetage obligatoire des fromages au lait cru. »</td></tr><tr><th>4</th><td>« Une chaîne de supermarchés publie un appel d'offres pour ses fournisseurs de fromages AOP. »</td></tr><tr><th>5</th><td>« Un sondage prévoit que 68 % des consommateurs exigeront des emballages recyclables d'ici 2027. »</td></tr></table><p>Pour les questions 1 à 5, répondez par le mot exact attendu, en majuscules ; pour la question 6, répondez par un seul mot.</p><ol><li>Quel domaine sectoriel de veille couvre la brève n° 1 ?</li><li>Quel domaine sectoriel couvre la brève n° 2 ?</li><li>Quel domaine sectoriel couvre la brève n° 3 ?</li><li>Quel domaine sectoriel couvre la brève n° 4 ?</li><li>Quel domaine sectoriel couvre la brève n° 5 ?</li><li>Pour ne pas se laisser dépasser par l'évolution annoncée par la brève n° 5, la fromagerie doit-elle adopter une posture proactive ou réactive ?</li></ol>",
    "starter": "# Exercice — Les brèves du lundi de la fromagerie du Val\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : un mot en majuscules. Question 6 : un seul mot.\n\n[Question 1 — Domaine de la brève n° 1]\nA_COMPLETER\n\n[Question 2 — Domaine de la brève n° 2]\nA_COMPLETER\n\n[Question 3 — Domaine de la brève n° 3]\nA_COMPLETER\n\n[Question 4 — Domaine de la brève n° 4]\nA_COMPLETER\n\n[Question 5 — Domaine de la brève n° 5]\nA_COMPLETER\n\n[Question 6 — Posture à adopter]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque brève, demandez-vous qui agit et sur quoi : un rival (concurrentielle), un laboratoire ou une technique (technologique), un texte de loi (juridique), un client ou un appel d'offres (commerciale), la société tout entière (sociétale).",
      "Le domaine se décide sur l'objet de l'information, jamais sur le support : la même revue de presse peut alimenter les cinq domaines.",
      "Une posture proactive agit avant l'échéance, sur la base d'une prévision ; une posture réactive attend que l'événement soit subi."
    ],
    "examples": [
      {
        "stdin": "La brasserie des Cimes relève quatre brèves dans la presse :\n1. « Un tribunal condamne un brasseur pour étiquetage non conforme. »\n2. « Un concurrent rachète une micro-brasserie régionale. »\n3. « Une étude montre que les consommateurs se détournent des bières importées pour des raisons climatiques. »\n4. « Un brasseur tchèque dépose un brevet de fermentation basse consommation. »\n\nRésolution :\n1) La brève n° 1 relève d'une décision de justice : JURIDIQUE.\n2) La brève n° 2 décrit un mouvement d'un rival : CONCURRENTIELLE.\n3) La brève n° 3 décrit une tendance de société : SOCIETALE.\n4) La brève n° 4 décrit une innovation technique brevetée : TECHNOLOGIQUE.\nPosture : pour répondre à la tendance sociétale avant qu'elle ne s'impose, la brasserie agit dès maintenant : PROACTIVE.",
        "expected": "JURIDIQUE — CONCURRENTIELLE — SOCIETALE — TECHNOLOGIQUE — posture PROACTIVE",
        "note": "Un même support (la presse spécialisée) alimente ici quatre domaines différents : c'est l'objet de l'information qui classe, pas sa source."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Domaine de la brève n° 1",
        "stdin": "q:1",
        "expected": "CONCURRENTIELLE||concurrentielle||CONCURRENTIEL||concurrentiel"
      },
      {
        "label": "Question 2 — Domaine de la brève n° 2",
        "stdin": "q:2",
        "expected": "TECHNOLOGIQUE||technologique"
      },
      {
        "label": "Question 3 — Domaine de la brève n° 3",
        "stdin": "q:3",
        "expected": "JURIDIQUE||juridique||JURIDIQUE ET REGLEMENTAIRE||juridique et réglementaire"
      },
      {
        "label": "Question 4 — Domaine de la brève n° 4",
        "stdin": "q:4",
        "expected": "COMMERCIALE||commerciale||COMMERCIALE ET FOURNISSEURS||commerciale et fournisseurs"
      },
      {
        "label": "Question 5 — Domaine de la brève n° 5",
        "stdin": "q:5",
        "expected": "SOCIETALE||sociétale||SOCIÉTALE||societale"
      },
      {
        "label": "Question 6 — Posture à adopter",
        "stdin": "q:6",
        "expected": "PROACTIVE||proactive"
      }
    ],
    "solution": "[Question 1 — Domaine de la brève n° 1]\nCONCURRENTIELLE\n\n[Question 2 — Domaine de la brève n° 2]\nTECHNOLOGIQUE\n\n[Question 3 — Domaine de la brève n° 3]\nJURIDIQUE\n\n[Question 4 — Domaine de la brève n° 4]\nCOMMERCIALE\n\n[Question 5 — Domaine de la brève n° 5]\nSOCIETALE\n\n[Question 6 — Posture à adopter]\nPROACTIVE",
    "takeaway": "1) La brève n° 1 décrit un mouvement d'un rival (gamme nouvelle, prix cassé) : CONCURRENTIELLE.\n2) La brève n° 2 décrit une innovation technique (capteurs, procédé) : TECHNOLOGIQUE.\n3) La brève n° 3 est un texte réglementaire (décret) : JURIDIQUE.\n4) La brève n° 4 est un appel d'offres émanant d'un client : COMMERCIALE.\n5) La brève n° 5 décrit une attente de la société (consommateurs, emballages) : SOCIETALE.\n6) Le sondage annonce une évolution pour 2027 : agir dès maintenant, avant l'échéance, est une posture PROACTIVE.\nContrôle : les cinq brèves couvrent exactement les cinq domaines sectoriels du cours, chacun une fois."
  },
  {
    "id": "vt3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le score de maturité des dispositifs de veille de la mairie de Saint-Rémy",
    "exampleTitle": "Exemple résolu — le score de maturité du cabinet d'architectes Pierre & Toit",
    "goal": "Coter des dispositifs de veille sur une grille de points, en déduire le risque d'obsolescence et prioriser les renforcements.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Saint-Rémy (18 000 habitants) exploite trois dispositifs de veille. Le secrétaire général veut les comparer à l'aide de la grille de cotation suivante, inspirée des référentiels de management de la veille :</p><table><tr><th>Composante</th><th>Modalité</th><th>Points</th></tr><tr><td>Mode de collecte</td><td>Passif (Pull) : consultation manuelle</td><td>20</td></tr><tr><td>Mode de collecte</td><td>Actif (Push) : alertes et flux automatiques</td><td>50</td></tr><tr><td>Fréquence</td><td>ponctuelle</td><td>10</td></tr><tr><td>Fréquence</td><td>périodique</td><td>25</td></tr><tr><td>Fréquence</td><td>permanente</td><td>40</td></tr><tr><td>Alertes automatisées</td><td>oui</td><td>10</td></tr><tr><td>Alertes automatisées</td><td>non</td><td>0</td></tr></table><p>Les trois dispositifs en place sont :</p><table><tr><th>Dispositif</th><th>Mode</th><th>Fréquence</th><th>Alertes</th></tr><tr><td>Veille marchés publics (BOAMP)</td><td>Actif (Push)</td><td>périodique</td><td>oui</td></tr><tr><td>Revue de presse hebdomadaire</td><td>Passif (Pull)</td><td>périodique</td><td>non</td></tr><tr><td>Veille réseaux sociaux de la population</td><td>Actif (Push)</td><td>permanente</td><td>oui</td></tr></table><p>Règles : score d'un dispositif = points du mode + points de la fréquence + points des alertes, plafonné à 100. Risque d'obsolescence : score au moins égal à 80 : FAIBLE ; de 50 à 79 : MOYEN ; inférieur à 50 : ELEVE.</p><p>Consignes : les scores s'écrivent en nombres seuls ; la question 2 se répond par le mot exact (FAIBLE, MOYEN ou ELEVE) ; la question 6 attend une réponse courte, par exemple « la revue de presse ».</p><ol><li>Quel est le score du dispositif « veille marchés publics » ?</li><li>Quel est le niveau de risque de la revue de presse hebdomadaire ?</li><li>Quel est le score de la veille réseaux sociaux ?</li><li>Quel est le score moyen des trois dispositifs, arrondi à l'unité ?</li><li>Combien de dispositifs présentent un risque élevé ?</li><li>Quel dispositif faut-il renforcer en priorité ?</li></ol>",
    "starter": "# Exercice — Le score de maturité des dispositifs de veille de la mairie de Saint-Rémy\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Score de la veille marchés publics]\nA_COMPLETER\n\n[Question 2 — Risque de la revue de presse]\nA_COMPLETER\n\n[Question 3 — Score de la veille réseaux sociaux]\nA_COMPLETER\n\n[Question 4 — Score moyen arrondi à l'unité]\nA_COMPLETER\n\n[Question 5 — Nombre de dispositifs à risque élevé]\nA_COMPLETER\n\n[Question 6 — Dispositif à renforcer en priorité]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque dispositif, additionnez trois nombres de la grille : un pour le mode, un pour la fréquence, un pour les alertes.",
      "La revue de presse cumule les faiblesses : mode passif (20), alertes absentes (0). Vérifiez si sa somme atteint la barre des 50.",
      "Pour la moyenne : additionnez les trois scores puis divisez par 3 ; arrondissez à l'unité. Le dispositif à renforcer est celui dont le risque est le plus élevé."
    ],
    "examples": [
      {
        "stdin": "Un cabinet d'architectes cote deux dispositifs sur la même grille :\n— Veille matériaux : Actif (Push), permanente, alertes oui.\n— Veille salons : Passif (Pull), ponctuelle, alertes non.\n\nRésolution :\n1) Veille matériaux : 50 + 40 + 10 = 100 points, plafonné à 100. Risque FAIBLE.\n2) Veille salons : 20 + 10 + 0 = 30 points. Risque ELEVE.\n3) Score moyen : (100 + 30) / 2 = 65.\n4) Un seul dispositif présente un risque élevé : la veille salons, à renforcer en priorité.",
        "expected": "100 (FAIBLE) — 30 (ELEVE) — moyenne 65 — un dispositif à risque élevé : la veille salons",
        "note": "Le mode passif et la fréquence ponctuelle cumulent leurs faiblesses : 20 + 10 = 30 points avant même de regarder les alertes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Score de la veille marchés publics",
        "stdin": "q:1",
        "expected": "85||85 points"
      },
      {
        "label": "Question 2 — Risque de la revue de presse",
        "stdin": "q:2",
        "expected": "ELEVE||ÉLEVE||élevé||Élevé||risque élevé"
      },
      {
        "label": "Question 3 — Score de la veille réseaux sociaux",
        "stdin": "q:3",
        "expected": "100||100 points"
      },
      {
        "label": "Question 4 — Score moyen arrondi à l'unité",
        "stdin": "q:4",
        "expected": "77||76,67||76.67||76,7||76.7"
      },
      {
        "label": "Question 5 — Nombre de dispositifs à risque élevé",
        "stdin": "q:5",
        "expected": "1||un"
      },
      {
        "label": "Question 6 — Dispositif à renforcer en priorité",
        "stdin": "q:6",
        "expected": "la revue de presse||revue de presse||Revue de presse||la revue de presse hebdomadaire"
      }
    ],
    "solution": "[Question 1 — Score de la veille marchés publics]\n85\n\n[Question 2 — Risque de la revue de presse]\nELEVE\n\n[Question 3 — Score de la veille réseaux sociaux]\n100\n\n[Question 4 — Score moyen arrondi à l'unité]\n77\n\n[Question 5 — Nombre de dispositifs à risque élevé]\n1\n\n[Question 6 — Dispositif à renforcer en priorité]\nla revue de presse",
    "takeaway": "1) Veille marchés publics : 50 (actif) + 25 (périodique) + 10 (alertes) = 85 points.\n2) Revue de presse : 20 + 25 + 0 = 45 points, inférieur à 50 : risque ELEVE.\n3) Veille réseaux sociaux : 50 (actif) + 40 (permanente) + 10 (alertes) = 100 points, plafonné à 100.\n4) Score moyen : (85 + 45 + 100) / 3 = 230 / 3 = 76,67, arrondi à 77.\n5) Seule la revue de presse passe sous la barre des 50 : 1 dispositif à risque élevé.\n6) La revue de presse doit être renforcée en priorité : son information sera obsolète à l'arrivée.\nContrôle : 85 + 45 + 100 = 230, et 230 / 3 = 76,67 ; aucun score ne dépasse le plafond de 100."
  },
  {
    "id": "vt3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Le retour sur investissement des cellules de veille de la banque Sud Crédit",
    "exampleTitle": "Exemple résolu — le ROI des cellules de la coopérative Céréales & Prairies",
    "goal": "Chiffrer bénéfice, gain net, ROI et BCR d'une cellule de veille, puis en déduire la criticité stratégique.",
    "brief": "<p><strong>Énoncé.</strong> La banque régionale Sud Crédit hésite à reconduire le budget de ses deux cellules de veille pour 2026. La direction générale demande un bilan chiffré de l'année 2025 :</p><table><tr><th>Poste 2025</th><th>Cellule « réglementaire »</th><th>Cellule « fintech »</th></tr><tr><td>Coût annuel de la cellule (salaires, outils)</td><td>48 000 €</td><td>30 000 €</td></tr><tr><td>Pertes évitées (amendes, litiges)</td><td>75 000 €</td><td>12 000 €</td></tr><tr><td>Gains d'opportunités captés</td><td>21 000 €</td><td>45 000 €</td></tr></table><p>Formules du cours : bénéfice total = pertes évitées + gains d'opportunités ; gain net = bénéfice total − coût de veille ; ROI = gain net / coût de veille × 100 ; BCR (bénéfice-coût) = bénéfice total / coût de veille. Criticité : ROI au moins égal à 200 % : INDISPENSABLE ; de 50 % à 199 % : RENTABLE ; inférieur à 50 % : A_OPTIMISER.</p><p>Consignes : montants en euros sans espace (par exemple 96000) ; ROI en pourcentage arrondi à l'unité (par exemple 90) ; BCR arrondi à deux décimales avec une virgule (par exemple 1,90) ; criticité en majuscules.</p><ol><li>Quel est le bénéfice total de la cellule « réglementaire » ?</li><li>Quel est le gain net de la cellule « fintech » ?</li><li>Quel est le ROI de la cellule « réglementaire » ?</li><li>Quel est le ROI de la cellule « fintech » ?</li><li>Quel est le BCR de la cellule « fintech », arrondi à deux décimales ?</li><li>Quelle est la criticité de la cellule « réglementaire » ?</li></ol>",
    "starter": "# Exercice — Le retour sur investissement des cellules de veille de la banque Sud Crédit\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Bénéfice total de la cellule réglementaire]\nA_COMPLETER\n\n[Question 2 — Gain net de la cellule fintech]\nA_COMPLETER\n\n[Question 3 — ROI de la cellule réglementaire]\nA_COMPLETER\n\n[Question 4 — ROI de la cellule fintech]\nA_COMPLETER\n\n[Question 5 — BCR de la cellule fintech]\nA_COMPLETER\n\n[Question 6 — Criticité de la cellule réglementaire]\nA_COMPLETER\n",
    "hints": [
      "Commencez par le bénéfice total de chaque cellule : pertes évitées + gains d'opportunités.",
      "Le gain net retranche le coût de veille ; le ROI rapporte ce gain net au coût. Pour la cellule fintech : bénéfice 57 000 €, coût 30 000 €.",
      "Le BCR se calcule sur le bénéfice total (pas sur le gain net) ; la criticité se lit dans la tranche du ROI, ici entre 50 % et 199 %."
    ],
    "examples": [
      {
        "stdin": "Une coopérative agricole chiffre ses deux cellules sur l'année :\n— Cellule « climat » : coût 20 000 € ; pertes évitées 150 000 € ; gains 30 000 €.\n— Cellule « salons » : coût 10 000 € ; pertes évitées 2 000 € ; gains 5 000 €.\n\nRésolution :\n1) Cellule climat : bénéfice 180 000 € ; gain net 160 000 € ; ROI = 160 000 / 20 000 × 100 = 800 % ; BCR = 9,00 → INDISPENSABLE.\n2) Cellule salons : bénéfice 7 000 € ; gain net −3 000 € ; ROI = −30 % ; BCR = 0,70 → A_OPTIMISER.",
        "expected": "climat : ROI 800 %, BCR 9,00, INDISPENSABLE — salons : ROI −30 %, BCR 0,70, A_OPTIMISER",
        "note": "Un BCR inférieur à 1 signifie que les bénéfices ne couvrent même pas les coûts : le gain net est négatif, la cellule détruit de la valeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Bénéfice total de la cellule réglementaire",
        "stdin": "q:1",
        "expected": "96000||96 000||96000 €||96 000 €||96000 euros"
      },
      {
        "label": "Question 2 — Gain net de la cellule fintech",
        "stdin": "q:2",
        "expected": "27000||27 000||27000 €||27 000 €"
      },
      {
        "label": "Question 3 — ROI de la cellule réglementaire",
        "stdin": "q:3",
        "expected": "100||100 %||100%||100 pour cent"
      },
      {
        "label": "Question 4 — ROI de la cellule fintech",
        "stdin": "q:4",
        "expected": "90||90 %||90%"
      },
      {
        "label": "Question 5 — BCR de la cellule fintech",
        "stdin": "q:5",
        "expected": "1,90||1.9||1,9||1.90"
      },
      {
        "label": "Question 6 — Criticité de la cellule réglementaire",
        "stdin": "q:6",
        "expected": "RENTABLE||rentable"
      }
    ],
    "solution": "[Question 1 — Bénéfice total de la cellule réglementaire]\n96000\n\n[Question 2 — Gain net de la cellule fintech]\n27000\n\n[Question 3 — ROI de la cellule réglementaire]\n100\n\n[Question 4 — ROI de la cellule fintech]\n90\n\n[Question 5 — BCR de la cellule fintech]\n1,90\n\n[Question 6 — Criticité de la cellule réglementaire]\nRENTABLE",
    "takeaway": "1) Cellule réglementaire : bénéfice total = 75 000 + 21 000 = 96 000 €.\n2) Cellule fintech : bénéfice total = 12 000 + 45 000 = 57 000 € ; gain net = 57 000 − 30 000 = 27 000 €.\n3) ROI réglementaire = 48 000 / 48 000 × 100 = 100 %.\n4) ROI fintech = 27 000 / 30 000 × 100 = 90 %.\n5) BCR fintech = 57 000 / 30 000 = 1,90.\n6) ROI de 100 %, compris entre 50 % et 199 % : la cellule réglementaire est RENTABLE.\nContrôle : les deux BCR (2,00 et 1,90) sont supérieurs à 1, cohérents avec des gains nets positifs ; 96 000 = 48 000 × 2,00."
  }
];
