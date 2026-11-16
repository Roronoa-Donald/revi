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
  },
  {
    "id": "vt3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La requête booléenne du veilleur de la startup AgriSense",
    "exampleTitle": "Exemple résolu — la requête de l'ONG Eau-Sahel",
    "goal": "Construire une requête de recherche booléenne normalisée, fragment par fragment, puis l'assembler.",
    "brief": "<p><strong>Énoncé.</strong> La startup AgriSense fabrique des capteurs pour l'agriculture. Son veilleur paramètre une alerte documentaire sur les moteurs de recherche et bases ouvertes. Paramètres retenus :</p><table><tr><th>Paramètre</th><th>Valeur</th></tr><tr><td>Terme principal</td><td>agriculture de précision</td></tr><tr><td>Termes obligatoires</td><td>capteur, drone</td></tr><tr><td>Termes exclus</td><td>amateur, jardinage</td></tr><tr><td>Domaine</td><td>hal.science</td></tr><tr><td>Format</td><td>pdf</td></tr></table><p>Règles de normalisation : le terme principal se place entre guillemets droits \" \" ; les termes obligatoires se regroupent entre parenthèses reliés par OR, par ordre alphabétique ; les termes exclus sont précédés d'un tiret, par ordre alphabétique ; les filtres de domaine et de format terminent la requête (site: et filetype:).</p><p>Consignes : chaque fragment s'écrit sans espace superflu ; la question 6 s'écrit sur une seule ligne.</p><ol><li>Écrivez le fragment du terme principal, avec ses guillemets.</li><li>Écrivez le fragment des termes obligatoires.</li><li>Écrivez le fragment des termes exclus.</li><li>Écrivez le filtre de domaine.</li><li>Écrivez le filtre de format.</li><li>Assemblez la requête complète.</li></ol>",
    "starter": "# Exercice — La requête booléenne du veilleur de la startup AgriSense\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Terme principal entre guillemets]\nA_COMPLETER\n\n[Question 2 — Fragment des termes obligatoires]\nA_COMPLETER\n\n[Question 3 — Fragment des termes exclus]\nA_COMPLETER\n\n[Question 4 — Filtre de domaine]\nA_COMPLETER\n\n[Question 5 — Filtre de format]\nA_COMPLETER\n\n[Question 6 — Requête complète assemblée]\nA_COMPLETER\n",
    "hints": [
      "Quatre blocs se succèdent toujours dans le même ordre : terme principal, obligatoires, exclus, puis filtres.",
      "Tri alphabétique : capteur vient avant drone ; amateur vient avant jardinage.",
      "Assemblage final : guillemets, parenthèses, exclusions, puis site: et filetype: sans espace superflue."
    ],
    "examples": [
      {
        "stdin": "L'ONG Eau-Sahel surveille les publications sur les forages. Paramètres :\nterme principal « ressource en eau » ; obligatoires : forage, puits ; exclus : arrosage, jeu ; domaine : who.int ; format : pdf.\n\nRésolution :\n1) Terme principal : \"ressource en eau\".\n2) Obligatoires triés : (forage OR puits).\n3) Exclus triés : -arrosage -jeu.\n4) Filtre de domaine : site:who.int.\n5) Filtre de format : filetype:pdf.\n6) Requête assemblée : \"ressource en eau\" (forage OR puits) -arrosage -jeu site:who.int filetype:pdf.",
        "expected": "\"ressource en eau\" (forage OR puits) -arrosage -jeu site:who.int filetype:pdf",
        "note": "Les termes sont triés par ordre alphabétique à l'intérieur de chaque fragment : forage avant puits, arrosage avant jeu."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Terme principal entre guillemets",
        "stdin": "q:1",
        "expected": "\"agriculture de précision\"||agriculture de précision||\"agriculture de précision\""
      },
      {
        "label": "Question 2 — Fragment des termes obligatoires",
        "stdin": "q:2",
        "expected": "(capteur OR drone)||capteur OR drone||(capteur or drone)"
      },
      {
        "label": "Question 3 — Fragment des termes exclus",
        "stdin": "q:3",
        "expected": "-amateur -jardinage"
      },
      {
        "label": "Question 4 — Filtre de domaine",
        "stdin": "q:4",
        "expected": "site:hal.science"
      },
      {
        "label": "Question 5 — Filtre de format",
        "stdin": "q:5",
        "expected": "filetype:pdf"
      },
      {
        "label": "Question 6 — Requête complète assemblée",
        "stdin": "q:6",
        "expected": "\"agriculture de précision\" (capteur OR drone) -amateur -jardinage site:hal.science filetype:pdf||\"agriculture de précision\" (capteur OR drone) -amateur -jardinage filetype:pdf site:hal.science||agriculture de précision (capteur OR drone) -amateur -jardinage site:hal.science filetype:pdf"
      }
    ],
    "solution": "[Question 1 — Terme principal entre guillemets]\n\"agriculture de précision\"\n\n[Question 2 — Fragment des termes obligatoires]\n(capteur OR drone)\n\n[Question 3 — Fragment des termes exclus]\n-amateur -jardinage\n\n[Question 4 — Filtre de domaine]\nsite:hal.science\n\n[Question 5 — Filtre de format]\nfiletype:pdf\n\n[Question 6 — Requête complète assemblée]\n\"agriculture de précision\" (capteur OR drone) -amateur -jardinage site:hal.science filetype:pdf",
    "takeaway": "1) \"agriculture de précision\" — le terme principal se cite entre guillemets droits.\n2) (capteur OR drone) — obligatoires reliés par OR, triés : capteur avant drone.\n3) -amateur -jardinage — exclusions préfixées d'un tiret, triées : amateur avant jardinage.\n4) site:hal.science — le filtre de domaine suit les deux-points, sans espace.\n5) filetype:pdf — le filtre de format se construit de la même façon.\n6) \"agriculture de précision\" (capteur OR drone) -amateur -jardinage site:hal.science filetype:pdf.\nContrôle : chaque fragment des questions 1 à 5 se retrouve tel quel, dans l'ordre, dans la requête de la question 6."
  },
  {
    "id": "vt3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La fiabilité des sources de la chargée de veille juridique de la banque Filia",
    "exampleTitle": "Exemple résolu — la fiabilité des sources de l'ONG Eau-Sahel",
    "goal": "Noter des sources sur la grille pondérée du cours, décider de leur niveau de fiabilité et écarter la source non fiable.",
    "brief": "<p><strong>Énoncé.</strong> La banque en ligne Filia suit l'actualité RGPD et protection des données. Sa chargée de veille note trois sources sur la grille pondérée du cours (chaque axe reçoit une note de 1 à 5) :</p><table><tr><th>Axe (poids)</th><th>Légifrance</th><th>Blog d'un cabinet d'avocats</th><th>Forum juridique non modéré</th></tr><tr><td>Autorité (30 %)</td><td>5</td><td>4</td><td>2</td></tr><tr><td>Neutralité (25 %)</td><td>5</td><td>3</td><td>2</td></tr><tr><td>Traçabilité (20 %)</td><td>5</td><td>4</td><td>1</td></tr><tr><td>Croisement (15 %)</td><td>5</td><td>3</td><td>1</td></tr><tr><td>Fraîcheur (10 %)</td><td>4</td><td>4</td><td>4</td></tr></table><p>Règles : score d'une source = (30 × autorité + 25 × neutralité + 20 × traçabilité + 15 × croisement + 10 × fraîcheur) / 5, sur 100. Niveaux : score au moins égal à 80 : FIABLE ; de 50 à 79 : A_CONFIRMER ; inférieur à 50 : NON_FIABLE.</p><p>Consignes : scores en nombres seuls ; niveaux en majuscules ; la question 6 attend une réponse courte, par exemple « le forum ».</p><ol><li>Quel est le score de Légifrance ?</li><li>Quel est le score du forum ?</li><li>Quel est le niveau de fiabilité du blog d'avocats ?</li><li>Quel est le niveau de fiabilité du forum ?</li><li>Combien de sources atteignent le niveau FIABLE ?</li><li>Quelle source ne doit jamais être citée sans recoupement préalable ?</li></ol>",
    "starter": "# Exercice — La fiabilité des sources de la chargée de veille juridique de la banque Filia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Score de Légifrance]\nA_COMPLETER\n\n[Question 2 — Score du forum]\nA_COMPLETER\n\n[Question 3 — Niveau du blog d'avocats]\nA_COMPLETER\n\n[Question 4 — Niveau du forum]\nA_COMPLETER\n\n[Question 5 — Nombre de sources FIABLE]\nA_COMPLETER\n\n[Question 6 — Source à ne jamais citer sans recoupement]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque source, multipliez chaque note par le poids de son axe, additionnez, puis divisez par 5.",
      "Légifrance : (150 + 125 + 100 + 75 + 40) / 5. Le forum : (60 + 50 + 20 + 15 + 40) / 5.",
      "Classez ensuite les scores : 80 et plus FIABLE, 50 à 79 A_CONFIRMER, en dessous NON_FIABLE ; la source non fiable est celle de la question 4."
    ],
    "examples": [
      {
        "stdin": "L'ONG Eau-Sahel note trois sources sur la même grille :\n— OMS : autorité 5, neutralité 5, traçabilité 5, croisement 4, fraîcheur 5.\n— Compte d'un influenceur sur un réseau social : 2, 1, 2, 2, 5.\n— Rapport anonyme trouvé en ligne : 3, 3, 1, 2, 3.\n\nRésolution :\n1) OMS : (150 + 125 + 100 + 60 + 50) / 5 = 485 / 5 = 97 → FIABLE.\n2) Influenceur : (60 + 25 + 40 + 30 + 50) / 5 = 205 / 5 = 41 → NON_FIABLE.\n3) Rapport anonyme : (90 + 75 + 20 + 30 + 30) / 5 = 245 / 5 = 49 → NON_FIABLE, à un point de la barre des 50.",
        "expected": "OMS 97 FIABLE — influenceur 41 NON_FIABLE — rapport anonyme 49 NON_FIABLE",
        "note": "Une source peut être fraîche et gratuite (fraîcheur 5) et rester non fiable : les axes se compensent dans le score, jamais dans la décision."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Score de Légifrance",
        "stdin": "q:1",
        "expected": "98||98/100"
      },
      {
        "label": "Question 2 — Score du forum",
        "stdin": "q:2",
        "expected": "37"
      },
      {
        "label": "Question 3 — Niveau du blog d'avocats",
        "stdin": "q:3",
        "expected": "A_CONFIRMER||a_confirmer||A CONFIRMER||à confirmer"
      },
      {
        "label": "Question 4 — Niveau du forum",
        "stdin": "q:4",
        "expected": "NON_FIABLE||non_fiable||NON FIABLE||non fiable"
      },
      {
        "label": "Question 5 — Nombre de sources FIABLE",
        "stdin": "q:5",
        "expected": "1||une"
      },
      {
        "label": "Question 6 — Source à ne jamais citer sans recoupement",
        "stdin": "q:6",
        "expected": "le forum||forum||le forum juridique||le forum juridique non modéré"
      }
    ],
    "solution": "[Question 1 — Score de Légifrance]\n98\n\n[Question 2 — Score du forum]\n37\n\n[Question 3 — Niveau du blog d'avocats]\nA_CONFIRMER\n\n[Question 4 — Niveau du forum]\nNON_FIABLE\n\n[Question 5 — Nombre de sources FIABLE]\n1\n\n[Question 6 — Source à ne jamais citer sans recoupement]\nle forum",
    "takeaway": "1) Légifrance : (30×5 + 25×5 + 20×5 + 15×5 + 10×4) / 5 = (150 + 125 + 100 + 75 + 40) / 5 = 490 / 5 = 98.\n2) Forum : (60 + 50 + 20 + 15 + 40) / 5 = 185 / 5 = 37.\n3) Blog d'avocats : (120 + 75 + 80 + 45 + 40) / 5 = 360 / 5 = 72, compris entre 50 et 79 : A_CONFIRMER.\n4) Forum : 37, inférieur à 50 : NON_FIABLE.\n5) Seule Légifrance atteint 80 : 1 source FIABLE.\n6) Le forum ne doit jamais être cité sans recoupement préalable.\nContrôle : score maximal possible = (150 + 125 + 100 + 75 + 50) / 5 = 100 ; Légifrance, à 98, en est très proche, ce qui est cohérent pour un journal officiel."
  },
  {
    "id": "vt3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le signal faible du bureau d'études Bois & Habitat",
    "exampleTitle": "Exemple résolu — les signaux de l'agence de tendances Demain",
    "goal": "Qualifier des séries d'occurrences (signal faible, tendance lourde, bruit de fond) à partir du volume et de l'accélération.",
    "brief": "<p><strong>Énoncé.</strong> Le bureau d'études Bois & Habitat, spécialisé en constructions bois, relève chaque trimestre le nombre d'appels d'offres publics mentionnant trois termes. Relevés de l'année :</p><table><tr><th>Terme</th><th>T1</th><th>T2</th><th>T3</th><th>T4</th></tr><tr><td>« bois lamellé-collé »</td><td>3</td><td>5</td><td>8</td><td>16</td></tr><tr><td>« maison modulaire »</td><td>55</td><td>60</td><td>68</td><td>75</td></tr><tr><td>« chaux-chanvre »</td><td>2</td><td>3</td><td>2</td><td>3</td></tr></table><p>Règles : TENDANCE_LOURDE si le volume du dernier trimestre est au moins égal à 50 et que la série est croissante ; SIGNAL_FAIBLE si le volume du dernier trimestre est inférieur à 20 et que l'accélération sur le dernier trimestre atteint au moins +100 % ; BRUIT_DE_FOND dans les autres cas (volume très faible, sans accélération).</p><p>Consignes : l'accélération se calcule entre T3 et T4, arrondie à l'unité (par exemple 100) ; les qualifications s'écrivent avec des tirets, en majuscules ; la question 6 attend une réponse courte.</p><ol><li>Quel est le volume du terme « maison modulaire » au quatrième trimestre ?</li><li>Quelle est l'accélération du terme « bois lamellé-collé » entre T3 et T4, en pourcentage ?</li><li>Quelle est la qualification du terme « bois lamellé-collé » ?</li><li>Quelle est la qualification du terme « maison modulaire » ?</li><li>Quelle est la qualification du terme « chaux-chanvre » ?</li><li>Quel terme mérite un atelier prospectif dès ce trimestre ?</li></ol>",
    "starter": "# Exercice — Le signal faible du bureau d'études Bois & Habitat\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Volume T4 de « maison modulaire »]\nA_COMPLETER\n\n[Question 2 — Accélération T3-T4 de « bois lamellé-collé »]\nA_COMPLETER\n\n[Question 3 — Qualification de « bois lamellé-collé »]\nA_COMPLETER\n\n[Question 4 — Qualification de « maison modulaire »]\nA_COMPLETER\n\n[Question 5 — Qualification de « chaux-chanvre »]\nA_COMPLETER\n\n[Question 6 — Terme à traiter en atelier prospectif]\nA_COMPLETER\n",
    "hints": [
      "Lisez d'abord les volumes du quatrième trimestre : seul un volume faible (inférieur à 20) peut cacher un signal faible.",
      "L'accélération se mesure sur le dernier trimestre : (T4 − T3) / T3. Pour le bois lamellé-collé : (16 − 8) / 8.",
      "La maison modulaire dépasse 50 mentions et croît régulièrement : c'est une tendance lourde. Le chaux-chanvre oscille sans accélérer : c'est du bruit de fond."
    ],
    "examples": [
      {
        "stdin": "L'agence de tendances Demain relève quatre trimestres d'occurrences :\n— « influenceur virtuel » : 2, 4, 7, 14.\n— « réalité augmentée » : 60, 64, 70, 80.\n— « QR code » : 4, 3, 4, 3.\n\nRésolution :\n1) « influenceur virtuel » : volume final 14, inférieur à 20 ; accélération (14 − 7) / 7 = +100 % → SIGNAL_FAIBLE.\n2) « réalité augmentée » : volume final 80, au moins égal à 50, série croissante → TENDANCE_LOURDE.\n3) « QR code » : volume très faible, erratique, accélération (3 − 4) / 4 = −25 % → BRUIT_DE_FOND.",
        "expected": "influenceur virtuel SIGNAL_FAIBLE — réalité augmentée TENDANCE_LOURDE — QR code BRUIT_DE_FOND",
        "note": "L'accélération se mesure sur le dernier trimestre : un volume encore faible qui double en trois mois annonce une rupture, pas une mode."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Volume T4 de « maison modulaire »",
        "stdin": "q:1",
        "expected": "75||75 mentions"
      },
      {
        "label": "Question 2 — Accélération T3-T4 de « bois lamellé-collé »",
        "stdin": "q:2",
        "expected": "100||+100||100 %||+100 %||100%"
      },
      {
        "label": "Question 3 — Qualification de « bois lamellé-collé »",
        "stdin": "q:3",
        "expected": "SIGNAL_FAIBLE||signal faible"
      },
      {
        "label": "Question 4 — Qualification de « maison modulaire »",
        "stdin": "q:4",
        "expected": "TENDANCE_LOURDE||tendance lourde"
      },
      {
        "label": "Question 5 — Qualification de « chaux-chanvre »",
        "stdin": "q:5",
        "expected": "BRUIT_DE_FOND||bruit de fond"
      },
      {
        "label": "Question 6 — Terme à traiter en atelier prospectif",
        "stdin": "q:6",
        "expected": "le bois lamellé-collé||bois lamellé-collé||le bois lamellé colle||bois lamellé collé"
      }
    ],
    "solution": "[Question 1 — Volume T4 de « maison modulaire »]\n75\n\n[Question 2 — Accélération T3-T4 de « bois lamellé-collé »]\n100\n\n[Question 3 — Qualification de « bois lamellé-collé »]\nSIGNAL_FAIBLE\n\n[Question 4 — Qualification de « maison modulaire »]\nTENDANCE_LOURDE\n\n[Question 5 — Qualification de « chaux-chanvre »]\nBRUIT_DE_FOND\n\n[Question 6 — Terme à traiter en atelier prospectif]\nle bois lamellé-collé",
    "takeaway": "1) « maison modulaire » : 75 mentions au quatrième trimestre.\n2) « bois lamellé-collé » : (16 − 8) / 8 = +100 % entre T3 et T4.\n3) « bois lamellé-collé » : volume final 16 (inférieur à 20) et accélération de +100 % : SIGNAL_FAIBLE.\n4) « maison modulaire » : volume final 75 (au moins 50), série croissante : TENDANCE_LOURDE.\n5) « chaux-chanvre » : volume très faible, oscillations sans accélération : BRUIT_DE_FOND.\n6) L'atelier prospectif porte sur le bois lamellé-collé : c'est le seul signal faible, à traiter avant qu'il ne devienne une tendance lourde.\nContrôle : 3 + 5 + 8 = 16 ; la série double bien sur le dernier trimestre, et la maison modulaire passe de 55 à 75 sans jamais baisser."
  },
  {
    "id": "vt3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le flux RSS de la compagnie aérienne TransAéro",
    "exampleTitle": "Exemple résolu — le flux RSS de l'éditeur de logiciels Néoware",
    "goal": "Lire un flux de syndication RSS, repérer l'item le plus récent et distinguer collecte Push et Pull.",
    "brief": "<p><strong>Énoncé.</strong> L'agence de voyages Escapade, 12 salariés, revend les billets de la compagnie régionale TransAéro. L'assistante de l'agence s'est abonnée au flux RSS des communiqués de TransAéro. Ce matin, le flux contenait exactement :</p><p><code>&lt;item&gt;&lt;guid&gt;ta-101&lt;/guid&gt;&lt;title&gt;TransAéro ouvre une liaison directe vers Funchal&lt;/title&gt;&lt;link&gt;https://transaero.example/communiques/101&lt;/link&gt;&lt;pubDate&gt;2025-11-03&lt;/pubDate&gt;&lt;/item&gt;</code><br><code>&lt;item&gt;&lt;guid&gt;ta-102&lt;/guid&gt;&lt;title&gt;TransAéro baisse ses tarifs dernière minute de 12 %&lt;/title&gt;&lt;link&gt;https://transaero.example/communiques/102&lt;/link&gt;&lt;pubDate&gt;2025-11-18&lt;/pubDate&gt;&lt;/item&gt;</code><br><code>&lt;item&gt;&lt;guid&gt;ta-103&lt;/guid&gt;&lt;title&gt;TransAéro remplace ses Boeing par des Airbus A320neo&lt;/title&gt;&lt;link&gt;https://transaero.example/communiques/103&lt;/link&gt;&lt;pubDate&gt;2025-11-10&lt;/pubDate&gt;&lt;/item&gt;</code></p><p>Consignes : les dates s'écrivent au format AAAA-MM-JJ ; les questions 4 et 5 se répondent par un seul mot.</p><ol><li>Combien d'items compte le flux ?</li><li>Quel est le guid de l'item le plus récent ?</li><li>Quelle est la date de publication de l'item ta-103 ?</li><li>S'abonner à ce flux plutôt que de consulter le site chaque matin relève-t-il d'une collecte PUSH ou PULL ?</li><li>La surveillance des tarifs du partenaire aérien relève de quel domaine sectoriel de veille ?</li></ol>",
    "starter": "# Exercice — Le flux RSS de la compagnie aérienne TransAéro\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre d'items du flux]\nA_COMPLETER\n\n[Question 2 — Guid de l'item le plus récent]\nA_COMPLETER\n\n[Question 3 — Date de publication de l'item ta-103]\nA_COMPLETER\n\n[Question 4 — Mode de collecte PUSH ou PULL]\nA_COMPLETER\n\n[Question 5 — Domaine sectoriel concerné]\nA_COMPLETER\n",
    "hints": [
      "Comptez les balises <item> : chacune décrit un communiqué, avec son guid, son titre et sa date.",
      "L'ordre d'apparition dans un flux ne dit rien de la fraîcheur : comparez les pubDate entre elles.",
      "Dans une collecte Push, l'information vient vers le veilleur (alertes, flux) ; en Pull, le veilleur va la chercher. Un partenaire commercial se surveille côté relation clients et fournisseurs."
    ],
    "examples": [
      {
        "stdin": "L'éditeur de logiciels Néoware publie un flux RSS :\n<item><guid>sw-11</guid><title>Néoware publie la version 4.0 de sa suite</title><pubDate>2026-01-05</pubDate></item>\n<item><guid>sw-12</guid><title>Correctif de sécurité critique sur la suite 4.0</title><pubDate>2026-01-12</pubDate></item>\n\nRésolution :\n1) Le flux compte 2 items.\n2) Le plus récent est sw-12 (publié le 2026-01-12, après le 2026-01-05).\n3) La date de sw-11 est le 2026-01-05.\n4) L'abonnement au flux est une collecte PUSH.\n5) Le correctif de sécurité relève de la veille TECHNOLOGIQUE.",
        "expected": "2 items — plus récent sw-12 — PUSH — TECHNOLOGIQUE",
        "note": "Le premier item du flux n'est pas forcément le plus ancien ni le plus récent : la balise pubDate tranche toujours."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'items du flux",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Guid de l'item le plus récent",
        "stdin": "q:2",
        "expected": "ta-102"
      },
      {
        "label": "Question 3 — Date de publication de l'item ta-103",
        "stdin": "q:3",
        "expected": "2025-11-10"
      },
      {
        "label": "Question 4 — Mode de collecte PUSH ou PULL",
        "stdin": "q:4",
        "expected": "PUSH||push"
      },
      {
        "label": "Question 5 — Domaine sectoriel concerné",
        "stdin": "q:5",
        "expected": "COMMERCIALE||commerciale||COMMERCIALE ET FOURNISSEURS||commerciale et fournisseurs"
      }
    ],
    "solution": "[Question 1 — Nombre d'items du flux]\n3\n\n[Question 2 — Guid de l'item le plus récent]\nta-102\n\n[Question 3 — Date de publication de l'item ta-103]\n2025-11-10\n\n[Question 4 — Mode de collecte PUSH ou PULL]\nPUSH\n\n[Question 5 — Domaine sectoriel concerné]\nCOMMERCIALE",
    "takeaway": "1) Le flux contient 3 items : ta-101, ta-102 et ta-103.\n2) Dates : ta-101 le 2025-11-03, ta-102 le 2025-11-18, ta-103 le 2025-11-10. Le plus récent est ta-102.\n3) L'item ta-103 est publié le 2025-11-10.\n4) L'abonnement au flux pousse l'information vers l'agence : collecte PUSH.\n5) TransAéro est un partenaire fournisseur dont Escapade revend les billets : la surveillance de ses tarifs relève de la veille COMMERCIALE.\nContrôle : les trois dates sont distinctes ; 2025-11-18 (ta-102) est postérieure à 2025-11-10 (ta-103), donc le guid le plus récent n'est pas le dernier de la liste."
  },
  {
    "id": "vt3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Le dédoublonnage du portail Villes & Mobilités",
    "exampleTitle": "Exemple résolu — le dédoublonnage du portail Mer & Littoral",
    "goal": "Appliquer l'indice de Jaccard pour détecter des quasi-doublons de titres et nettoyer une URL de ses paramètres de suivi.",
    "brief": "<p><strong>Énoncé.</strong> Le portail d'actualité Villes & Mobilités agrège des flux RSS et des newsletters. Ce matin, trois articles sont arrivés :</p><table><tr><th>Article</th><th>Titre</th></tr><tr><td>A1</td><td>« Lille installe 80 bornes de recharge en centre-ville »</td></tr><tr><td>A2</td><td>« Lille installe 80 bornes de recharge »</td></tr><tr><td>A3</td><td>« Le gouvernement accélère le déploiement des bornes de recharge »</td></tr></table><p>Règles : l'indice de Jaccard compare les ensembles de mots des titres, en minuscules, ponctuation retirée, chaque mot compté une seule fois : J(A, B) = |A ∩ B| / |A ∪ B|. À partir de 0,60, les deux articles sont des quasi-doublons (DOUBLON_TITRE). Par ailleurs, l'URL canonique d'un article supprime les paramètres de suivi utm_*, ref et source, mais conserve les autres paramètres.</p><p>Consignes : les indices s'écrivent avec une virgule, arrondis à deux décimales (par exemple 0,67) ; la question 4 attend le code exact ; la question 6 est une URL exacte.</p><ol><li>Combien de mots distincts compte le titre A1 ?</li><li>Quel est l'indice de Jaccard J(A1, A2) ?</li><li>Quel est l'indice de Jaccard J(A1, A3) ?</li><li>A1 et A2 sont-ils DOUBLON_TITRE ou des articles distincts ?</li><li>Combien d'articles le portail publiera-t-il au final ?</li><li>Écrivez l'URL canonique de « https://villes-mobilites.example/bornes?utm_source=rss&amp;id=41 ».</li></ol>",
    "starter": "# Exercice — Le dédoublonnage du portail Villes & Mobilités\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de mots distincts du titre A1]\nA_COMPLETER\n\n[Question 2 — Indice de Jaccard J(A1, A2)]\nA_COMPLETER\n\n[Question 3 — Indice de Jaccard J(A1, A3)]\nA_COMPLETER\n\n[Question 4 — Verdict sur A1 et A2]\nA_COMPLETER\n\n[Question 5 — Nombre d'articles publiés]\nA_COMPLETER\n\n[Question 6 — URL canonique nettoyée]\nA_COMPLETER\n",
    "hints": [
      "Listez d'abord les ensembles de mots : A1 = {lille, installe, 80, bornes, de, recharge, en, centre, ville} ; A2 = {lille, installe, 80, bornes, de, recharge}.",
      "J(A1, A2) = 6 / 9 : l'ensemble de A2 est entièrement contenu dans celui de A1. Pour A1 et A3, seuls bornes, de et recharge sont communs.",
      "Un indice au moins égal à 0,60 entraîne la suppression d'un des deux titres ; dans l'URL, seul id=41 est un paramètre métier, utm_source est un paramètre de suivi."
    ],
    "examples": [
      {
        "stdin": "Le portail Mer & Littoral compare deux titres :\n— M1 : « Brest teste un ferry électrique sur la rade »\n— M2 : « Brest teste un ferry électrique »\n\nRésolution :\n1) M1 : 8 mots distincts {brest, teste, un, ferry, électrique, sur, la, rade}.\n2) M2 : 5 mots. J(M1, M2) = 5 / 8 = 0,63, au moins égal à 0,60 → DOUBLON_TITRE.\n3) L'article M1 est arrivé avec l'URL « https://mer-littoral.example/ferry?utm_campaign=nl&rubrique=5 » ; URL canonique : https://mer-littoral.example/ferry?rubrique=5.",
        "expected": "J = 0,63 → DOUBLON_TITRE — URL canonique https://mer-littoral.example/ferry?rubrique=5",
        "note": "Les paramètres de suivi disparaissent de l'URL canonique ; les paramètres métier, comme une rubrique, restent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de mots distincts du titre A1",
        "stdin": "q:1",
        "expected": "9||neuf"
      },
      {
        "label": "Question 2 — Indice de Jaccard J(A1, A2)",
        "stdin": "q:2",
        "expected": "0,67||0.67||0,7"
      },
      {
        "label": "Question 3 — Indice de Jaccard J(A1, A3)",
        "stdin": "q:3",
        "expected": "0,21||0.21||0,214||0.214"
      },
      {
        "label": "Question 4 — Verdict sur A1 et A2",
        "stdin": "q:4",
        "expected": "DOUBLON_TITRE||doublon titre||DOUBLON||doublon"
      },
      {
        "label": "Question 5 — Nombre d'articles publiés",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — URL canonique nettoyée",
        "stdin": "q:6",
        "expected": "https://villes-mobilites.example/bornes?id=41"
      }
    ],
    "solution": "[Question 1 — Nombre de mots distincts du titre A1]\n9\n\n[Question 2 — Indice de Jaccard J(A1, A2)]\n0,67\n\n[Question 3 — Indice de Jaccard J(A1, A3)]\n0,21\n\n[Question 4 — Verdict sur A1 et A2]\nDOUBLON_TITRE\n\n[Question 5 — Nombre d'articles publiés]\n2\n\n[Question 6 — URL canonique nettoyée]\nhttps://villes-mobilites.example/bornes?id=41",
    "takeaway": "1) A1 = {lille, installe, 80, bornes, de, recharge, en, centre, ville} : 9 mots distincts.\n2) A2 = 6 mots, tous présents dans A1 : J(A1, A2) = 6 / 9 = 0,67.\n3) A3 = 8 mots ; mots communs avec A1 : {bornes, de, recharge} ; union = 9 + 8 − 3 = 14 ; J(A1, A3) = 3 / 14 = 0,21.\n4) J(A1, A2) = 0,67, au moins égal à 0,60 : DOUBLON_TITRE.\n5) A2 est écarté comme doublon ; le portail publie A1 et A3 : 2 articles.\n6) utm_source est un paramètre de suivi, id=41 est un paramètre métier : URL canonique https://villes-mobilites.example/bornes?id=41.\nContrôle : 6 / 9 = 0,667 et 3 / 14 = 0,214 ; seul le premier dépasse le seuil de 0,60."
  },
  {
    "id": "vt3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de collecte du robot de l'association Aurevie",
    "exampleTitle": "Exemple résolu — le plan de collecte de la bibliothèque numérique Liréa",
    "goal": "Planifier une collecte multi-sources, calculer la charge horaire et vérifier la conformité d'un pic sous plafond.",
    "brief": "<p><strong>Énoncé.</strong> L'association Aurevie, observatoire des mobilités urbaines, programme son robot de collecte. Sources et périodes de relevé :</p><table><tr><th>Groupe</th><th>Nombre de sources</th><th>Période de relevé</th></tr><tr><td>A — presse quotidienne</td><td>30 flux</td><td>toutes les 30 minutes</td></tr><tr><td>B — blogs spécialisés</td><td>20 flux</td><td>toutes les heures</td></tr><tr><td>C — alertes hebdomadaires</td><td>10 flux</td><td>le lundi à 8 h 00</td></tr></table><p>Le serveur de l'association plafonne le robot à 100 requêtes par heure. Le lundi, le groupe C est déclenché à 8 h 00 en une seule salve.</p><p>Consignes : les réponses numériques s'écrivent en nombres seuls ; la question 4 attend OUI ou NON en majuscules.</p><ol><li>Combien de requêtes par heure le groupe A génère-t-il ?</li><li>Combien de requêtes par heure le groupe B génère-t-il ?</li><li>Combien de requêtes le robot adresse-t-il entre 8 h et 9 h le lundi ?</li><li>Le pic du lundi respecte-t-il le plafond de 100 requêtes par heure ?</li><li>Combien de requêtes par heure reçoit chaque source du groupe A ?</li><li>Si le groupe A passait à un relevé toutes les 15 minutes, combien de requêtes le pic du lundi 8 h–9 h atteindrait-il ?</li></ol>",
    "starter": "# Exercice — Le plan de collecte du robot de l'association Aurevie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Requêtes par heure du groupe A]\nA_COMPLETER\n\n[Question 2 — Requêtes par heure du groupe B]\nA_COMPLETER\n\n[Question 3 — Requêtes sur le créneau du lundi 8 h-9 h]\nA_COMPLETER\n\n[Question 4 — Respect du plafond de 100 requêtes/heure]\nA_COMPLETER\n\n[Question 5 — Requêtes par heure reçues par une source du groupe A]\nA_COMPLETER\n\n[Question 6 — Pic du lundi avec un relevé toutes les 15 minutes]\nA_COMPLETER\n",
    "hints": [
      "Un relevé toutes les 30 minutes, c'est 2 relevés par heure ; toutes les heures, c'est 1 ; toutes les 15 minutes, c'est 4.",
      "Le pic du lundi cumule les trois groupes sur la même fenêtre d'une heure : additionnez les requêtes horaires de A et B, plus la salve de C.",
      "Pour la question 6, recalculez uniquement le groupe A (30 flux × 4 relevés), puis recomposez le pic complet avant de conclure."
    ],
    "examples": [
      {
        "stdin": "La bibliothèque numérique Liréa programme son robot :\n— Groupe X : 8 flux, relevés toutes les 20 minutes.\n— Groupe Y : 15 flux, relevés une fois par heure.\n— Hebdomadaire : 5 flux, déclenchés le lundi à 8 h.\nPlafond du serveur : 50 requêtes par heure.\n\nRésolution :\n1) Groupe X : 8 × 3 = 24 requêtes par heure.\n2) Groupe Y : 15 × 1 = 15 requêtes par heure.\n3) Pic du lundi : 24 + 15 + 5 = 44 requêtes.\n4) 44 ≤ 50 : le plafond est respecté.",
        "expected": "X : 24 requêtes/heure — Y : 15 requêtes/heure — pic lundi 44 ≤ 50, conforme",
        "note": "Le pic se calcule toujours sur la fenêtre horaire la plus chargée : le lundi matin cumule les trois groupes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Requêtes par heure du groupe A",
        "stdin": "q:1",
        "expected": "60"
      },
      {
        "label": "Question 2 — Requêtes par heure du groupe B",
        "stdin": "q:2",
        "expected": "20"
      },
      {
        "label": "Question 3 — Requêtes sur le créneau du lundi 8 h-9 h",
        "stdin": "q:3",
        "expected": "90"
      },
      {
        "label": "Question 4 — Respect du plafond de 100 requêtes/heure",
        "stdin": "q:4",
        "expected": "OUI||oui"
      },
      {
        "label": "Question 5 — Requêtes par heure reçues par une source du groupe A",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — Pic du lundi avec un relevé toutes les 15 minutes",
        "stdin": "q:6",
        "expected": "150"
      }
    ],
    "solution": "[Question 1 — Requêtes par heure du groupe A]\n60\n\n[Question 2 — Requêtes par heure du groupe B]\n20\n\n[Question 3 — Requêtes sur le créneau du lundi 8 h-9 h]\n90\n\n[Question 4 — Respect du plafond de 100 requêtes/heure]\nOUI\n\n[Question 5 — Requêtes par heure reçues par une source du groupe A]\n2\n\n[Question 6 — Pic du lundi avec un relevé toutes les 15 minutes]\n150",
    "takeaway": "1) Groupe A : 30 flux × 2 relevés par heure = 60 requêtes par heure.\n2) Groupe B : 20 flux × 1 = 20 requêtes par heure.\n3) Pic du lundi : 60 + 20 + 10 = 90 requêtes entre 8 h et 9 h.\n4) 90 ≤ 100 : le plafond est respecté, réponse OUI.\n5) Chaque source du groupe A est relevée 2 fois par heure (toutes les 30 minutes).\n6) Groupe A à 15 minutes : 30 × 4 = 120 requêtes par heure ; pic = 120 + 20 + 10 = 150.\nContrôle : à 15 minutes, 120 + 20 = 140 dépasse déjà le plafond avant même la salve hebdomadaire ; il faudrait décaler le groupe C ou espacer les relevés."
  },
  {
    "id": "vt3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "L'index de recherche du service communication de la mairie",
    "exampleTitle": "Exemple résolu — l'index de recherche du musée régional",
    "goal": "Tokeniser une phrase, retirer les mots vides et produire la liste normalisée d'un index de recherche.",
    "brief": "<p><strong>Énoncé.</strong> Le service communication de la mairie de Saint-Rémy veut indexer l'actualité suivante, publiée sur le site de la ville :</p><p><code>« La Mairie lance une nouvelle enquête sur les déplacements des habitants du quartier. »</code></p><p>La liste de mots vides de l'index est :</p><table><tr><th colspan=\"5\">Mots vides retenus par l'index</th></tr><tr><td>le</td><td>la</td><td>les</td><td>un</td><td>une</td></tr><tr><td>du</td><td>de</td><td>des</td><td>et</td><td>ou</td></tr><tr><td>en</td><td>sur</td><td>par</td><td>pour</td><td>avec</td></tr><tr><td>au</td><td colspan=\"4\"></td></tr></table><p>Règles : les tokens sont découpés sur les espaces, la ponctuation est retirée ; les mots vides sont ensuite éliminés ; tout est mis en minuscules pour l'index.</p><p>Consignes : la question 4 s'écrit sur une seule ligne, mots séparés par des espaces, dans l'ordre d'apparition ; la question 5 attend un seul mot.</p><ol><li>Combien de tokens bruts compte la phrase ?</li><li>Combien de ces tokens sont des mots vides ?</li><li>Combien de tokens restent après filtrage ?</li><li>Écrivez la liste finale normalisée, en minuscules, dans l'ordre d'apparition.</li><li>Quel token viendra en tête de l'index alphabétique ?</li></ol>",
    "starter": "# Exercice — L'index de recherche du service communication de la mairie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de tokens bruts]\nA_COMPLETER\n\n[Question 2 — Nombre de mots vides dans la phrase]\nA_COMPLETER\n\n[Question 3 — Nombre de tokens après filtrage]\nA_COMPLETER\n\n[Question 4 — Liste normalisée en minuscules]\nA_COMPLETER\n\n[Question 5 — Token en tête de l'index alphabétique]\nA_COMPLETER\n",
    "hints": [
      "Découpez d'abord la phrase sur les espaces : La, Mairie, lance, une, nouvelle… en retirant le point final.",
      "Barrez ensuite les tokens présents dans la liste de mots vides : La, une, sur, les, des, du.",
      "La liste normalisée conserve l'ordre d'apparition ; l'index alphabétique, lui, trie : déplacements précède enquête, habitants, lance, mairie, nouvelle et quartier."
    ],
    "examples": [
      {
        "stdin": "Le musée régional indexe la phrase : « Le musée régional ouvre une nouvelle aile au public. »\n\nRésolution :\n1) Tokens bruts : Le, musée, régional, ouvre, une, nouvelle, aile, au, public → 9 tokens.\n2) Mots vides présents : Le, une, au → 3 tokens.\n3) Après filtrage : musée, régional, ouvre, nouvelle, aile, public → 6 tokens.\n4) Liste normalisée : « musée régional ouvre nouvelle aile public ».\n5) En tête de l'index alphabétique : « aile ».",
        "expected": "9 tokens — 3 mots vides — 6 restants — liste : musée régional ouvre nouvelle aile public — tête alphabétique : aile",
        "note": "La ponctuation disparaît au découpage, la casse à la normalisation : « Le » et « le » comptent pour un seul mot vide."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de tokens bruts",
        "stdin": "q:1",
        "expected": "13||treize"
      },
      {
        "label": "Question 2 — Nombre de mots vides dans la phrase",
        "stdin": "q:2",
        "expected": "6||six"
      },
      {
        "label": "Question 3 — Nombre de tokens après filtrage",
        "stdin": "q:3",
        "expected": "7||sept"
      },
      {
        "label": "Question 4 — Liste normalisée en minuscules",
        "stdin": "q:4",
        "expected": "mairie lance nouvelle enquête déplacements habitants quartier||mairie lance nouvelle enquete deplacements habitants quartier"
      },
      {
        "label": "Question 5 — Token en tête de l'index alphabétique",
        "stdin": "q:5",
        "expected": "déplacements||deplacements"
      }
    ],
    "solution": "[Question 1 — Nombre de tokens bruts]\n13\n\n[Question 2 — Nombre de mots vides dans la phrase]\n6\n\n[Question 3 — Nombre de tokens après filtrage]\n7\n\n[Question 4 — Liste normalisée en minuscules]\nmairie lance nouvelle enquête déplacements habitants quartier\n\n[Question 5 — Token en tête de l'index alphabétique]\ndéplacements",
    "takeaway": "1) Tokens bruts : La, Mairie, lance, une, nouvelle, enquête, sur, les, déplacements, des, habitants, du, quartier → 13 tokens.\n2) Mots vides présents : La, une, sur, les, des, du → 6 tokens.\n3) Après filtrage : Mairie, lance, nouvelle, enquête, déplacements, habitants, quartier → 7 tokens.\n4) Liste normalisée : mairie lance nouvelle enquête déplacements habitants quartier.\n5) Par ordre alphabétique : déplacements, enquête, habitants, lance, mairie, nouvelle, quartier ; la tête est « déplacements ».\nContrôle : 13 − 6 = 7 ; la somme des effectifs retrouvés redonne bien le nombre de tokens restants."
  },
  {
    "id": "vt3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le classement des notices de brevets par TF-IDF",
    "exampleTitle": "Exemple résolu — le classement des résumés d'articles par TF-IDF",
    "goal": "Calculer IDF et TF, composer un score TF-IDF par document et classer les documents d'un corpus.",
    "brief": "<p><strong>Énoncé.</strong> La documentaliste de l'équipementier optique LumenOptic cherche, dans un corpus de trois notices de brevets, celles qui répondent à la requête « verre autonome ». Relevés :</p><table><tr><th>Notice</th><th>Occurrences « verre »</th><th>Occurrences « autonome »</th><th>Total de mots</th></tr><tr><td>N1</td><td>6</td><td>3</td><td>30</td></tr><tr><td>N2</td><td>5</td><td>2</td><td>20</td></tr><tr><td>N3</td><td>0</td><td>10</td><td>25</td></tr></table><p>Formules du cours : TF(t, d) = count(t dans d) / total_mots(d) ; IDF(t) = ln((N + 1) / (DF + 1)) + 1, avec N = 3 documents ; Score(d) = somme des TF(q, d) × IDF(q) pour chaque terme q de la requête.</p><p>Valeurs utiles : ln(4/3) ≈ 0,29 ; ln(2) ≈ 0,69.</p><p>Consignes : TF et IDF s'écrivent avec une virgule, arrondis à deux décimales (par exemple 0,25) ; le score s'arrondit à deux décimales.</p><ol><li>Quel est l'IDF du terme « verre » ?</li><li>Quel est l'IDF du terme « autonome » ?</li><li>Quel est le TF du terme « verre » dans la notice N2 ?</li><li>Quel est le score de la notice N1 ?</li><li>Quel est le score de la notice N2 ?</li><li>Quelle notice arrive en tête du classement ?</li></ol>",
    "starter": "# Exercice — Le classement des notices de brevets par TF-IDF\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — IDF du terme « verre »]\nA_COMPLETER\n\n[Question 2 — IDF du terme « autonome »]\nA_COMPLETER\n\n[Question 3 — TF du terme « verre » dans N2]\nA_COMPLETER\n\n[Question 4 — Score de la notice N1]\nA_COMPLETER\n\n[Question 5 — Score de la notice N2]\nA_COMPLETER\n\n[Question 6 — Notice en tête du classement]\nA_COMPLETER\n",
    "hints": [
      "« verre » apparaît dans N1 et N2 (DF = 2) ; « autonome » apparaît dans les trois notices (DF = 3).",
      "IDF(verre) = ln(4/3) + 1 ; IDF(autonome) = ln(4/4) + 1 = 1. Puis TF(verre, N2) = 5/20.",
      "Score(N1) = 0,20 × 1,29 + 0,10 × 1,00 ; Score(N2) = 0,25 × 1,29 + 0,10 × 1,00 ; arrondissez chaque score final à deux décimales avant de classer."
    ],
    "examples": [
      {
        "stdin": "Un centre de documentation interroge son corpus (N = 3) avec la requête « drone parcelle » :\n— R1 : drone 4, parcelle 2, total 20 mots.\n— R2 : drone 2, parcelle 0, total 20 mots.\n— R3 : drone 0, parcelle 4, total 40 mots.\nDF(drone) = 2 et DF(parcelle) = 2, donc IDF = 1,29 pour les deux termes.\n\nRésolution :\n1) R1 : TF(drone) = 4/20 = 0,20 ; TF(parcelle) = 2/20 = 0,10 ; score = (0,20 + 0,10) × 1,29 = 0,39.\n2) R2 : score = 0,10 × 1,29 = 0,13.\n3) R3 : score = 0,10 × 1,29 = 0,13.\n4) Classement : R1 (0,39) devant R2 et R3 (0,13).",
        "expected": "R1 : 0,39 — R2 : 0,13 — R3 : 0,13 — R1 en tête",
        "note": "Un terme présent dans tous les documents (DF = N) reçoit IDF = 1 : il ne départage plus les documents, seul son TF les différencie."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — IDF du terme « verre »",
        "stdin": "q:1",
        "expected": "1,29||1.29"
      },
      {
        "label": "Question 2 — IDF du terme « autonome »",
        "stdin": "q:2",
        "expected": "1,00||1||1,0||1.0||1.00"
      },
      {
        "label": "Question 3 — TF du terme « verre » dans N2",
        "stdin": "q:3",
        "expected": "0,25||0.25||25 %||25%"
      },
      {
        "label": "Question 4 — Score de la notice N1",
        "stdin": "q:4",
        "expected": "0,36||0.36"
      },
      {
        "label": "Question 5 — Score de la notice N2",
        "stdin": "q:5",
        "expected": "0,42||0.42"
      },
      {
        "label": "Question 6 — Notice en tête du classement",
        "stdin": "q:6",
        "expected": "N2||la notice N2||n2"
      }
    ],
    "solution": "[Question 1 — IDF du terme « verre »]\n1,29\n\n[Question 2 — IDF du terme « autonome »]\n1,00\n\n[Question 3 — TF du terme « verre » dans N2]\n0,25\n\n[Question 4 — Score de la notice N1]\n0,36\n\n[Question 5 — Score de la notice N2]\n0,42\n\n[Question 6 — Notice en tête du classement]\nN2",
    "takeaway": "1) IDF(verre) = ln(4/3) + 1 = 0,29 + 1 = 1,29.\n2) IDF(autonome) = ln(4/4) + 1 = 1,00.\n3) TF(verre, N2) = 5 / 20 = 0,25.\n4) N1 : TF(verre) = 6/30 = 0,20 ; TF(autonome) = 3/30 = 0,10 ; score = 0,20 × 1,29 + 0,10 × 1,00 = 0,258 + 0,100 = 0,36.\n5) N2 : 0,25 × 1,29 + 0,10 × 1,00 = 0,3225 + 0,100 = 0,42.\n6) Classement : N2 (0,42) > N3 (0,40) > N1 (0,36) ; N2 arrive en tête.\nContrôle : les trois scores pondèrent la rareté : « verre », plus rare (IDF 1,29), pèse plus lourd que « autonome » (IDF 1,00)."
  },
  {
    "id": "vt3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le filtre anti-bruit de la cellule de veille du laboratoire Galiena",
    "exampleTitle": "Exemple résolu — le filtre anti-bruit du service documentation d'un constructeur",
    "goal": "Appliquer un classificateur bayésien naïf sur des effectifs d'apprentissage et trancher entre pertinent et bruit.",
    "brief": "<p><strong>Énoncé.</strong> Le laboratoire pharmaceutique Galiena reçoit des alertes par courriel. Son historique d'apprentissage compte 40 alertes étiquetées à la main : 24 pertinentes, 16 bruits. Décompte des deux mots surveillés :</p><table><tr><th>Mot</th><th>Alertes pertinentes concernées (sur 24)</th><th>Alertes bruits concernées (sur 16)</th></tr><tr><td>« essai »</td><td>12</td><td>4</td></tr><tr><td>« promo »</td><td>3</td><td>12</td></tr></table><p>Règle de décision (bayésienne, à facteurs constants près) : le score d'une classe pour une alerte est le produit de l'effectif de la classe par l'effectif du mot dans cette classe, pour chaque mot présent dans l'alerte (un mot absent de l'alerte compte pour 1). La classe au score le plus élevé l'emporte ; les dénominateurs constants se compensent dans la comparaison.</p><p>Trois alertes sont arrivées ce matin : l'alerte A contient « essai » et « promo » ; l'alerte B contient « essai » ; l'alerte C contient « promo ».</p><p>Consignes : les scores s'écrivent en nombres seuls ; les verdicts s'écrivent en majuscules.</p><ol><li>Quel est le score PERTINENT de l'alerte A ?</li><li>Quel est le score BRUIT de l'alerte A ?</li><li>Quel est le verdict pour l'alerte A ?</li><li>Quel est le verdict pour l'alerte B ?</li><li>Quel est le verdict pour l'alerte C ?</li><li>Quel est le score BRUIT de l'alerte C ?</li></ol>",
    "starter": "# Exercice — Le filtre anti-bruit de la cellule de veille du laboratoire Galiena\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Score PERTINENT de l'alerte A]\nA_COMPLETER\n\n[Question 2 — Score BRUIT de l'alerte A]\nA_COMPLETER\n\n[Question 3 — Verdict pour l'alerte A]\nA_COMPLETER\n\n[Question 4 — Verdict pour l'alerte B]\nA_COMPLETER\n\n[Question 5 — Verdict pour l'alerte C]\nA_COMPLETER\n\n[Question 6 — Score BRUIT de l'alerte C]\nA_COMPLETER\n",
    "hints": [
      "Pour l'alerte A, les deux mots comptent : score PERTINENT = 24 × 12 × 3 ; score BRUIT = 16 × 4 × 12.",
      "Pour l'alerte B, un seul mot compte : 24 × 12 côté pertinent, 16 × 4 côté bruit.",
      "Pour l'alerte C : 24 × 3 côté pertinent contre 16 × 12 côté bruit ; comparez toujours les deux scores de la même alerte avant de conclure."
    ],
    "examples": [
      {
        "stdin": "Le service documentation d'un constructeur a étiqueté 30 alertes : 18 utiles, 12 bruits.\n« urgent » concerne 9 alertes utiles et 9 bruits ; « budget » concerne 6 utiles et 1 bruit.\nAlerte X : contient « urgent » et « budget ».\n\nRésolution :\n1) Score utile : 18 × 9 × 6 = 972.\n2) Score bruit : 12 × 9 × 1 = 108.\n3) 972 > 108 : l'alerte X est UTILE.",
        "expected": "utile 972 — bruit 108 → UTILE",
        "note": "Un mot très discriminant (« budget ») renverse le verdict malgré un mot neutre, présent autant dans les deux classes (« urgent »)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Score PERTINENT de l'alerte A",
        "stdin": "q:1",
        "expected": "864"
      },
      {
        "label": "Question 2 — Score BRUIT de l'alerte A",
        "stdin": "q:2",
        "expected": "768"
      },
      {
        "label": "Question 3 — Verdict pour l'alerte A",
        "stdin": "q:3",
        "expected": "PERTINENT||pertinent"
      },
      {
        "label": "Question 4 — Verdict pour l'alerte B",
        "stdin": "q:4",
        "expected": "PERTINENT||pertinent"
      },
      {
        "label": "Question 5 — Verdict pour l'alerte C",
        "stdin": "q:5",
        "expected": "BRUIT||bruit"
      },
      {
        "label": "Question 6 — Score BRUIT de l'alerte C",
        "stdin": "q:6",
        "expected": "192"
      }
    ],
    "solution": "[Question 1 — Score PERTINENT de l'alerte A]\n864\n\n[Question 2 — Score BRUIT de l'alerte A]\n768\n\n[Question 3 — Verdict pour l'alerte A]\nPERTINENT\n\n[Question 4 — Verdict pour l'alerte B]\nPERTINENT\n\n[Question 5 — Verdict pour l'alerte C]\nBRUIT\n\n[Question 6 — Score BRUIT de l'alerte C]\n192",
    "takeaway": "1) Alerte A : score PERTINENT = 24 × 12 × 3 = 864.\n2) Alerte A : score BRUIT = 16 × 4 × 12 = 768.\n3) 864 > 768 : l'alerte A est classée PERTINENT, avec une marge faible.\n4) Alerte B (« essai » seul) : 24 × 12 = 288 contre 16 × 4 = 64 : PERTINENTE.\n5) Alerte C (« promo » seul) : 24 × 3 = 72 contre 16 × 12 = 192 : BRUIT.\n6) Score BRUIT de l'alerte C = 16 × 12 = 192.\nContrôle : le mot « promo » est présent dans 12 des 16 bruits contre 3 des 24 pertinentes ; il entraîne seul le classement de l'alerte C, alors que « essai » l'emporte dans les alertes A et B."
  },
  {
    "id": "vt3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "La feuille de route TRL du constructeur Astra Mobil",
    "exampleTitle": "Exemple résolu — la feuille de route TRL de la compagnie Aéronord",
    "goal": "Lire l'échelle TRL, situer des technologies réelles et identifier la plus mature et la moins mature.",
    "brief": "<p><strong>Énoncé.</strong> Le bureau d'études du constructeur automobile Astra Mobil dresse l'état de maturité de quatre technologies de son plan produit :</p><table><tr><th>Technologie</th><th>TRL</th></tr><tr><td>Batterie solide</td><td>4</td></tr><tr><td>Pile à hydrogène</td><td>8</td></tr><tr><td>Recharge inductive</td><td>9</td></tr><tr><td>Rétroviseurs caméra</td><td>7</td></tr></table><p>Rappel du cours : TRL 1 à 3, recherche amont ; TRL 4 à 6, développement technologique ; TRL 7 à 9, industrialisation et déploiement. TRL 9 : système opérationnel éprouvé en conditions réelles et en production.</p><p>Consignes : la question 3 attend le nom du tableau ; les questions 5 et 6 attendent une réponse courte.</p><ol><li>Combien de niveaux compte l'échelle TRL ?</li><li>Quel est le TRL de la pile à hydrogène ?</li><li>Quelle technologie du tableau est éprouvée en conditions réelles ?</li><li>Quel est le TRL de la batterie solide ?</li><li>Quelle est la technologie la moins mature du tableau ?</li><li>Dans quelle macro-phase se situe la batterie solide ?</li></ol>",
    "starter": "# Exercice — La feuille de route TRL du constructeur Astra Mobil\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de niveaux de l'échelle TRL]\nA_COMPLETER\n\n[Question 2 — TRL de la pile à hydrogène]\nA_COMPLETER\n\n[Question 3 — Technologie éprouvée en conditions réelles]\nA_COMPLETER\n\n[Question 4 — TRL de la batterie solide]\nA_COMPLETER\n\n[Question 5 — Technologie la moins mature]\nA_COMPLETER\n\n[Question 6 — Macro-phase de la batterie solide]\nA_COMPLETER\n",
    "hints": [
      "L'échelle TRL va de 1 (principes observés) à 9 (éprouvé en production) : le niveau le plus haut du tableau est celui d'une technologie déjà en service.",
      "Rangez les quatre TRL par ordre croissant : 4 < 7 < 8 < 9 ; la moins mature est la plus petite valeur.",
      "La batterie solide, à TRL 4, tombe dans la tranche 4 à 6 du cours : développement technologique, avec faisabilité démontrée mais pas de prototype complet en conditions réelles."
    ],
    "examples": [
      {
        "stdin": "La compagnie aérienne Aéronord évalue trois technologies :\n— taxi volant électrique : TRL 3 ;\n— biocarburant d'origine algale : TRL 8 ;\n— wi-fi embarqué haut débit : TRL 9.\n\nRésolution :\n1) L'échelle compte 9 niveaux.\n2) Le wi-fi embarqué (TRL 9) est éprouvé en conditions réelles.\n3) Le taxi volant (TRL 3) est le moins mature : recherche amont, principe démontré mais pas de prototype intégré.\n4) Le biocarburant (TRL 8) est en industrialisation et déploiement.",
        "expected": "9 niveaux — wi-fi en tête (TRL 9) — taxi volant le moins mature (TRL 3) — biocarburant en industrialisation",
        "note": "Le TRL mesure la maturité, pas l'intérêt : une technologie prometteuse peut rester des années au stade de recherche amont."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de niveaux de l'échelle TRL",
        "stdin": "q:1",
        "expected": "9||neuf"
      },
      {
        "label": "Question 2 — TRL de la pile à hydrogène",
        "stdin": "q:2",
        "expected": "8||TRL 8||trl 8"
      },
      {
        "label": "Question 3 — Technologie éprouvée en conditions réelles",
        "stdin": "q:3",
        "expected": "la recharge inductive||recharge inductive||la recharge inductive par induction"
      },
      {
        "label": "Question 4 — TRL de la batterie solide",
        "stdin": "q:4",
        "expected": "4||TRL 4||trl 4"
      },
      {
        "label": "Question 5 — Technologie la moins mature",
        "stdin": "q:5",
        "expected": "la batterie solide||batterie solide"
      },
      {
        "label": "Question 6 — Macro-phase de la batterie solide",
        "stdin": "q:6",
        "expected": "developpement technologique||développement technologique||developpement||développement"
      }
    ],
    "solution": "[Question 1 — Nombre de niveaux de l'échelle TRL]\n9\n\n[Question 2 — TRL de la pile à hydrogène]\n8\n\n[Question 3 — Technologie éprouvée en conditions réelles]\nla recharge inductive\n\n[Question 4 — TRL de la batterie solide]\n4\n\n[Question 5 — Technologie la moins mature]\nla batterie solide\n\n[Question 6 — Macro-phase de la batterie solide]\ndeveloppement technologique",
    "takeaway": "1) L'échelle TRL compte 9 niveaux.\n2) La pile à hydrogène est à TRL 8.\n3) La recharge inductive, à TRL 9, est éprouvée en conditions réelles et en production.\n4) La batterie solide est à TRL 4.\n5) La moins mature est la batterie solide (TRL 4, contre 7, 8 et 9 pour les autres).\n6) TRL 4 appartient à la tranche 4 à 6 : la batterie solide est en développement technologique.\nContrôle : 4 < 7 < 8 < 9 ; la batterie solide est la seule de la tranche 4 à 6, les trois autres sont en industrialisation."
  },
  {
    "id": "vt3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le cycle du hype des technologies de la mutuelle Prévia",
    "exampleTitle": "Exemple résolu — le cycle du hype d'une mairie de 20 000 habitants",
    "goal": "Situer des technologies sur le cycle du hype à partir d'indicateurs chiffrés et en déduire la conduite à tenir.",
    "brief": "<p><strong>Énoncé.</strong> La directrice des systèmes d'information de la mutuelle d'assurance Prévia note cinq technologies selon deux indicateurs :</p><table><tr><th>Technologie</th><th>Intérêt médiatique (0-100)</th><th>Adoptions réelles (0-100)</th></tr><tr><td>IA générative</td><td>90</td><td>25</td></tr><tr><td>Ordinateur quantique</td><td>35</td><td>2</td></tr><tr><td>Metavers</td><td>20</td><td>10</td></tr><tr><td>Blockchain</td><td>45</td><td>35</td></tr><tr><td>Signature électronique</td><td>15</td><td>85</td></tr></table><p>Barème, à appliquer dans l'ordre jusqu'à la première règle satisfaite :</p><ol><li>adoptions réelles au moins égales à 60 : PLATEAU_PRODUCTIVITY ;</li><li>sinon, intérêt médiatique au moins égal à 70 : PEAK_EXPECTATIONS ;</li><li>sinon, intérêt au plus égal à 30 et adoptions au plus égales à 20 : TROUGH_DISILLUSIONMENT ;</li><li>sinon, adoptions au plus égales à 5 : INNOVATION_TRIGGER ;</li><li>sinon : SLOPE_ENLIGHTENMENT.</li></ol><p>Consignes : les phases s'écrivent en majuscules avec des tirets bas ; la question 6 attend une réponse courte.</p><ol><li>Quelle est la phase de l'IA générative ?</li><li>Quelle est la phase de l'ordinateur quantique ?</li><li>Quelle est la phase du metavers ?</li><li>Quelle est la phase de la blockchain ?</li><li>Quelle est la phase de la signature électronique ?</li><li>Quelle technologie ne doit recevoir aucun investissement lourd cette année ?</li></ol>",
    "starter": "# Exercice — Le cycle du hype des technologies de la mutuelle Prévia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Phase de l'IA générative]\nA_COMPLETER\n\n[Question 2 — Phase de l'ordinateur quantique]\nA_COMPLETER\n\n[Question 3 — Phase du metavers]\nA_COMPLETER\n\n[Question 4 — Phase de la blockchain]\nA_COMPLETER\n\n[Question 5 — Phase de la signature électronique]\nA_COMPLETER\n\n[Question 6 — Technologie sans investissement lourd cette année]\nA_COMPLETER\n",
    "hints": [
      "Appliquez le barème dans l'ordre et arrêtez-vous à la première règle satisfaite ; commencez toujours par le test des adoptions réelles.",
      "IA générative : 25 < 60, puis 90 ≥ 70. Ordinateur quantique : 35 < 70, 35 > 30, mais 2 ≤ 5. Metavers : 20 ≤ 30 et 10 ≤ 20.",
      "La signature électronique dépasse 60 en adoptions réelles : plateau. La technologie à ne pas surinvestir est celle du pic, où les promesses dépassent les usages."
    ],
    "examples": [
      {
        "stdin": "Une mairie de 20 000 habitants note cinq technologies :\n— réalité augmentée : intérêt 85, adoptions 15 ;\n— télétravail : intérêt 10, adoptions 90 ;\n— assistant vocal : intérêt 15, adoptions 10 ;\n— cloud souverain : intérêt 45, adoptions 35 ;\n— ordinateur quantique : intérêt 35, adoptions 2.\n\nRésolution :\n1) Réalité augmentée : 15 < 60 ; 85 ≥ 70 → PEAK_EXPECTATIONS.\n2) Télétravail : 90 ≥ 60 → PLATEAU_PRODUCTIVITY.\n3) Assistant vocal : 15 ≤ 30 et 10 ≤ 20 → TROUGH_DISILLUSIONMENT.\n4) Cloud souverain : aucun des tests précédents → SLOPE_ENLIGHTENMENT.\n5) Ordinateur quantique : 2 ≤ 5 → INNOVATION_TRIGGER.",
        "expected": "RA : PIC — télétravail : PLATEAU — vocal : CREUX — cloud : PENTE — quantique : DECLENCHEMENT",
        "note": "Le pic est la pire phase pour engager des dépenses lourdes ; le creux est au contraire le bon moment pour prototyper à bas coût."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Phase de l'IA générative",
        "stdin": "q:1",
        "expected": "PEAK_EXPECTATIONS||peak expectations||PIC||pic"
      },
      {
        "label": "Question 2 — Phase de l'ordinateur quantique",
        "stdin": "q:2",
        "expected": "INNOVATION_TRIGGER||innovation trigger||DECLENCHEMENT||declenchement"
      },
      {
        "label": "Question 3 — Phase du metavers",
        "stdin": "q:3",
        "expected": "TROUGH_DISILLUSIONMENT||trough disillusionment||CREUX||creux"
      },
      {
        "label": "Question 4 — Phase de la blockchain",
        "stdin": "q:4",
        "expected": "SLOPE_ENLIGHTENMENT||slope enlightenment||PENTE||pente"
      },
      {
        "label": "Question 5 — Phase de la signature électronique",
        "stdin": "q:5",
        "expected": "PLATEAU_PRODUCTIVITY||plateau productivity||PLATEAU||plateau"
      },
      {
        "label": "Question 6 — Technologie sans investissement lourd cette année",
        "stdin": "q:6",
        "expected": "l'IA générative||IA générative||IA generative||l'IA generative"
      }
    ],
    "solution": "[Question 1 — Phase de l'IA générative]\nPEAK_EXPECTATIONS\n\n[Question 2 — Phase de l'ordinateur quantique]\nINNOVATION_TRIGGER\n\n[Question 3 — Phase du metavers]\nTROUGH_DISILLUSIONMENT\n\n[Question 4 — Phase de la blockchain]\nSLOPE_ENLIGHTENMENT\n\n[Question 5 — Phase de la signature électronique]\nPLATEAU_PRODUCTIVITY\n\n[Question 6 — Technologie sans investissement lourd cette année]\nl'IA générative",
    "takeaway": "1) IA générative : adoptions 25 < 60 ; intérêt 90 ≥ 70 : PEAK_EXPECTATIONS.\n2) Ordinateur quantique : 35 < 70 ; 35 > 30 ; adoptions 2 ≤ 5 : INNOVATION_TRIGGER.\n3) Metavers : intérêt 20 ≤ 30 et adoptions 10 ≤ 20 : TROUGH_DISILLUSIONMENT.\n4) Blockchain : aucun test satisfait avant le dernier : SLOPE_ENLIGHTENMENT.\n5) Signature électronique : adoptions 85 ≥ 60 : PLATEAU_PRODUCTIVITY.\n6) L'IA générative est au pic des attentes : la mutuelle doit s'abstenir d'investissement lourd cette année et observer.\nContrôle : chaque technologie tombe dans une phase différente ; l'ordre d'application du barème évite tout double classement."
  },
  {
    "id": "vt3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La lecture PESTEL de la coopérative Prairies & Montagnes",
    "exampleTitle": "Exemple résolu — la lecture PESTEL d'un réseau de bibliothèques",
    "goal": "Classer des facteurs d'environnement dans les six catégories PESTEL et compter opportunités et menaces.",
    "brief": "<p><strong>Énoncé.</strong> La coopérative laitière Prairies &amp; Montagnes, 220 éleveurs, prépare son plan stratégique 2030. Son directeur a listé six facteurs d'environnement :</p><table><tr><th>n°</th><th>Facteur</th></tr><tr><th>1</th><td>« La nouvelle politique agricole commune finance la conversion en agriculture biologique. »</td></tr><tr><th>2</th><td>« Le prix du lait s'effondre de 15 % sur les marchés mondiaux. »</td></tr><tr><th>3</th><td>« Les consommateurs exigent des produits locaux certifiés. »</td></tr><tr><th>4</th><td>« La robotisation de la traite réduit fortement le coût de main-d'œuvre. »</td></tr><tr><th>5</th><td>« Les sécheresses répétées pénalisent le fourrage. »</td></tr><tr><th>6</th><td>« Un durcissement des normes d'étiquetage est annoncé. »</td></tr></table><p>Catégories PESTEL : POLITIQUE, ECONOMIQUE, SOCIOLOGIQUE, TECHNOLOGIQUE, ECOLOGIQUE, LEGAL. Un facteur favorable est une opportunité ; un facteur défavorable est une menace.</p><p>Consignes : les catégories s'écrivent en majuscules ; la question 6 attend un seul mot.</p><ol><li>Quelle est la catégorie PESTEL du facteur n° 1 ?</li><li>Quelle est la catégorie du facteur n° 2 ?</li><li>Quelle est la catégorie du facteur n° 5 ?</li><li>Quelle est la catégorie du facteur n° 6 ?</li><li>Combien de facteurs sont des opportunités ?</li><li>Le facteur n° 4 est-il une opportunité ou une menace ?</li></ol>",
    "starter": "# Exercice — La lecture PESTEL de la coopérative Prairies & Montagnes\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Catégorie du facteur n° 1]\nA_COMPLETER\n\n[Question 2 — Catégorie du facteur n° 2]\nA_COMPLETER\n\n[Question 3 — Catégorie du facteur n° 5]\nA_COMPLETER\n\n[Question 4 — Catégorie du facteur n° 6]\nA_COMPLETER\n\n[Question 5 — Nombre d'opportunités]\nA_COMPLETER\n\n[Question 6 — Nature du facteur n° 4]\nA_COMPLETER\n",
    "hints": [
      "Un financement public relève du politique ; un prix de marché, de l'économique ; une exigence des consommateurs, du sociologique.",
      "La robotisation est une technique : catégorie technologique. Le fourrage pénalisé par la sécheresse relève de l'écologique ; une norme d'étiquetage, du légal.",
      "Comptez les facteurs favorables (1, 3, 4) puis les défavorables (2, 5, 6) : la somme doit faire six."
    ],
    "examples": [
      {
        "stdin": "Un réseau de bibliothèques liste trois facteurs :\n1. « Le budget de l'État pour la lecture publique augmente. »\n2. « La fréquentation des bibliothèques de proximité baisse. »\n3. « Les livres audio enregistrent une croissance de 40 %. »\n\nRésolution :\n1) Budget de l'État : POLITIQUE, opportunité.\n2) Fréquentation en baisse : SOCIOLOGIQUE, menace.\n3) Essor du livre audio : TECHNOLOGIQUE, opportunité.",
        "expected": "1 : POLITIQUE opportunité — 2 : SOCIOLOGIQUE menace — 3 : TECHNOLOGIQUE opportunité",
        "note": "Un même thème peut changer de catégorie selon l'angle : la baisse de fréquentation est sociologique, pas économique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Catégorie du facteur n° 1",
        "stdin": "q:1",
        "expected": "POLITIQUE||politique"
      },
      {
        "label": "Question 2 — Catégorie du facteur n° 2",
        "stdin": "q:2",
        "expected": "ECONOMIQUE||economique||ÉCONOMIQUE||économique"
      },
      {
        "label": "Question 3 — Catégorie du facteur n° 5",
        "stdin": "q:3",
        "expected": "ECOLOGIQUE||écologique||ÉCOLOGIQUE||ecologique"
      },
      {
        "label": "Question 4 — Catégorie du facteur n° 6",
        "stdin": "q:4",
        "expected": "LEGAL||legal||LÉGAL||légal"
      },
      {
        "label": "Question 5 — Nombre d'opportunités",
        "stdin": "q:5",
        "expected": "3||trois"
      },
      {
        "label": "Question 6 — Nature du facteur n° 4",
        "stdin": "q:6",
        "expected": "OPPORTUNITE||opportunité||OPPORTUNITÉ||opportunite||une opportunité"
      }
    ],
    "solution": "[Question 1 — Catégorie du facteur n° 1]\nPOLITIQUE\n\n[Question 2 — Catégorie du facteur n° 2]\nECONOMIQUE\n\n[Question 3 — Catégorie du facteur n° 5]\nECOLOGIQUE\n\n[Question 4 — Catégorie du facteur n° 6]\nLEGAL\n\n[Question 5 — Nombre d'opportunités]\n3\n\n[Question 6 — Nature du facteur n° 4]\nOPPORTUNITE",
    "takeaway": "1) Financement public : POLITIQUE.\n2) Effondrement du prix du lait : ECONOMIQUE.\n3) Sécheresses répétées : ECOLOGIQUE.\n4) Normes d'étiquetage : LEGAL.\n5) Opportunités : financement public (1), demande de produits locaux (3), robotisation (4) → 3 opportunités.\n6) La robotisation réduit les coûts : c'est une OPPORTUNITE.\nContrôle : 3 opportunités + 3 menaces (prix du lait, sécheresses, normes) = 6 facteurs, la liste est complète."
  },
  {
    "id": "vt3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le digest hebdomadaire de la communauté d'agglomération Grand Lac",
    "exampleTitle": "Exemple résolu — le digest hebdomadaire d'une université",
    "goal": "Hiérarchiser des brèves par criticité, choisir le livrable adapté à chaque événement et respecter l'entonnoir informationnel.",
    "brief": "<p><strong>Énoncé.</strong> La chargée de veille de la communauté d'agglomération Grand Lac (9 communes) prépare le Curated Digest du lundi matin. Brèves collectées cette semaine :</p><table><tr><th>Brève</th><th>Source</th><th>Objet</th><th>Criticité</th></tr><tr><td>B1</td><td>CERT-FR</td><td>Faille critique activée dans le portail de paiement des cantines</td><td>CRITIQUE</td></tr><tr><td>B2</td><td>Blog tech d'un journaliste</td><td>Refonte de l'interface du logiciel de billetterie des piscines</td><td>FAIBLE</td></tr><tr><td>B3</td><td>Préfecture</td><td>Décret modifiant le calcul des subventions aux associations</td><td>MOYENNE</td></tr><tr><td>B4</td><td>Observatoire régional</td><td>Fréquentation touristique en hausse de 12 %</td><td>FAIBLE</td></tr></table><p>Rappel du cours : la flash note est un livrable d'une page maximum, diffusé en urgence lors d'un événement critique ; le Curated Digest hebdomadaire retient de 3 à 5 faits marquants priorisés par criticité ; l'entonnoir informationnel place l'essentiel en tête de document.</p><p>Consignes : la question 1 attend le nom du livrable (par exemple « flash note ») ; les questions 2, 4 et 5 attendent l'identifiant de la brève ; la question 6 attend une réponse très courte.</p><ol><li>Quel livrable convient pour la brève B1, diffusé immédiatement et sans attendre le digest ?</li><li>Quelle brève ouvrira le digest, en tête de page ?</li><li>Un Curated Digest retient entre 3 et combien de faits marquants ?</li><li>Quelle brève relève de la veille juridique et réglementaire ?</li><li>Quelle brève relève de la veille sociétale ?</li><li>Dans chaque livrable, où l'essentiel doit-il apparaître ?</li></ol>",
    "starter": "# Exercice — Le digest hebdomadaire de la communauté d'agglomération Grand Lac\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Livrable adapté à la brève B1]\nA_COMPLETER\n\n[Question 2 — Brève qui ouvre le digest]\nA_COMPLETER\n\n[Question 3 — Nombre maximal de faits du digest]\nA_COMPLETER\n\n[Question 4 — Brève relevant de la veille juridique]\nA_COMPLETER\n\n[Question 5 — Brève relevant de la veille sociétale]\nA_COMPLETER\n\n[Question 6 — Emplacement de l'essentiel]\nA_COMPLETER\n",
    "hints": [
      "Un événement critique (faille activée) ne peut pas attendre le lundi : il déclenche le livrable court d'urgence.",
      "Le digest s'ouvre sur la criticité la plus haute, pas sur l'ordre d'arrivée des brèves.",
      "Un décret relève de la réglementation ; une statistique de fréquentation touristique décrit la société. L'essentiel se place là où le lecteur commence."
    ],
    "examples": [
      {
        "stdin": "Une université collecte trois brèves :\n— une faille critique dans le portail d'inscription (CRITIQUE) ;\n— un appel à projets ANR (MOYENNE) ;\n— une hausse des inscriptions de 8 % (FAIBLE).\n\nRésolution :\n1) La faille déclenche une flash note immédiate.\n2) Elle ouvre aussi le digest du lundi, en tête de page.\n3) Le digest retient de 3 à 5 faits marquants.\n4) L'appel à projets relève de la veille juridique (règlement d'appel).\n5) La hausse des inscriptions relève de la veille sociétale.\n6) L'essentiel apparaît en tête du document (entonnoir informationnel).",
        "expected": "flash note pour la faille — digest : 3 à 5 faits — l'essentiel en tête du document",
        "note": "Un décideur lit une note de veille de haut en bas : ce qu'il ne voit pas en tête, il ne le lira pas."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Livrable adapté à la brève B1",
        "stdin": "q:1",
        "expected": "flash note||Flash Note||bulletin d'alerte flash||flash||la flash note"
      },
      {
        "label": "Question 2 — Brève qui ouvre le digest",
        "stdin": "q:2",
        "expected": "B1||la brève B1||b1||la brève B1 (faille critique)"
      },
      {
        "label": "Question 3 — Nombre maximal de faits du digest",
        "stdin": "q:3",
        "expected": "5||cinq"
      },
      {
        "label": "Question 4 — Brève relevant de la veille juridique",
        "stdin": "q:4",
        "expected": "B3||la brève B3||b3"
      },
      {
        "label": "Question 5 — Brève relevant de la veille sociétale",
        "stdin": "q:5",
        "expected": "B4||la brève B4||b4"
      },
      {
        "label": "Question 6 — Emplacement de l'essentiel",
        "stdin": "q:6",
        "expected": "en tête de document||en tête||au début||au début du document"
      }
    ],
    "solution": "[Question 1 — Livrable adapté à la brève B1]\nflash note\n\n[Question 2 — Brève qui ouvre le digest]\nB1\n\n[Question 3 — Nombre maximal de faits du digest]\n5\n\n[Question 4 — Brève relevant de la veille juridique]\nB3\n\n[Question 5 — Brève relevant de la veille sociétale]\nB4\n\n[Question 6 — Emplacement de l'essentiel]\nen tête de document",
    "takeaway": "1) La faille activée est un événement critique : elle appelle une flash note, diffusée immédiatement.\n2) Le digest s'ouvre sur la brève la plus critique : B1.\n3) Le Curated Digest hebdomadaire retient de 3 à 5 faits marquants : maximum 5.\n4) Le décret de la préfecture (B3) relève de la veille juridique et réglementaire.\n5) La statistique de fréquentation touristique (B4) relève de la veille sociétale.\n6) L'essentiel doit apparaître en tête de document, conformément à l'entonnoir informationnel.\nContrôle : la faille (B1) cumule les deux livrables, flash note immédiate puis tête du digest ; les quatre brèves tiennent dans le format de 3 à 5 faits."
  },
  {
    "id": "vt3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le radar technologique du groupe de presse La Dépêche du Matin",
    "exampleTitle": "Exemple résolu — le radar technologique d'une banque en ligne",
    "goal": "Lire un Tech Radar (quadrants et anneaux), calculer son indice moyen et mesurer l'effet d'un mouvement.",
    "brief": "<p><strong>Énoncé.</strong> Le comité d'architecture du groupe de presse La Dépêche du Matin publie son radar semestriel :</p><table><tr><th>Technologie</th><th>Quadrant</th><th>Anneau</th></tr><tr><td>Rust</td><td>Langages et cadres</td><td>TRIAL</td></tr><tr><td>Kubernetes</td><td>Plateformes</td><td>ADOPT</td></tr><tr><td>eBPF</td><td>Techniques</td><td>ASSESS</td></tr><tr><td>SVN</td><td>Outils</td><td>HOLD</td></tr><tr><td>Grafana</td><td>Outils</td><td>ADOPT</td></tr></table><p>Barème des anneaux (cours) : ADOPT vaut 100 points, TRIAL 75, ASSESS 50, HOLD 25. L'indice du radar est la moyenne des points des technologies placées ; le radar compte quatre anneaux et quatre quadrants.</p><p>Consignes : les réponses numériques s'écrivent en nombres seuls ; la question 4 demande un dénombrement.</p><ol><li>Combien d'anneaux compte le radar ?</li><li>Combien de points vaut la technologie Rust ?</li><li>Combien de points vaut la technologie SVN ?</li><li>Combien de technologies sont placées en anneau ADOPT ?</li><li>Quel est l'indice moyen du radar, arrondi à l'unité ?</li><li>Si eBPF passait d'ASSESS à TRIAL au semestre suivant, l'indice moyen augmenterait-il de combien de points ?</li></ol>",
    "starter": "# Exercice — Le radar technologique du groupe de presse La Dépêche du Matin\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre d'anneaux du radar]\nA_COMPLETER\n\n[Question 2 — Points de la technologie Rust]\nA_COMPLETER\n\n[Question 3 — Points de la technologie SVN]\nA_COMPLETER\n\n[Question 4 — Technologies en anneau ADOPT]\nA_COMPLETER\n\n[Question 5 — Indice moyen du radar]\nA_COMPLETER\n\n[Question 6 — Gain de points si eBPF passe en TRIAL]\nA_COMPLETER\n",
    "hints": [
      "Traduisez d'abord chaque anneau en points : TRIAL 75, ADOPT 100, ASSESS 50, HOLD 25.",
      "Indice actuel : (75 + 100 + 50 + 25 + 100) / 5. Avec eBPF en TRIAL, son score passe de 50 à 75.",
      "Les deux seules technologies en ADOPT sont Kubernetes et Grafana ; pour la question 6, comparez l'indice avant et après le mouvement d'eBPF."
    ],
    "examples": [
      {
        "stdin": "Une banque en ligne place sur son radar :\n— Kafka (Plateformes, TRIAL) ;\n— Vue.js (Langages, ADOPT) ;\n— Istio (Techniques, ASSESS) ;\n— SOAP (Outils, HOLD).\n\nRésolution :\n1) Points : 75 + 100 + 50 + 25 = 250.\n2) Indice moyen : 250 / 4 = 62,5, arrondi à 63.\n3) Le radar compte 4 anneaux.",
        "expected": "indice moyen 62,5 arrondi à 63 — 4 anneaux",
        "note": "L'indice moyen se lit comme une photographie du patrimoine : sous 60, la dette technologique domine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'anneaux du radar",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Points de la technologie Rust",
        "stdin": "q:2",
        "expected": "75||75 points"
      },
      {
        "label": "Question 3 — Points de la technologie SVN",
        "stdin": "q:3",
        "expected": "25||25 points"
      },
      {
        "label": "Question 4 — Technologies en anneau ADOPT",
        "stdin": "q:4",
        "expected": "2||deux||2 (Kubernetes et Grafana)||deux (Kubernetes et Grafana)"
      },
      {
        "label": "Question 5 — Indice moyen du radar",
        "stdin": "q:5",
        "expected": "70||70 points"
      },
      {
        "label": "Question 6 — Gain de points si eBPF passe en TRIAL",
        "stdin": "q:6",
        "expected": "5||5 points"
      }
    ],
    "solution": "[Question 1 — Nombre d'anneaux du radar]\n4\n\n[Question 2 — Points de la technologie Rust]\n75\n\n[Question 3 — Points de la technologie SVN]\n25\n\n[Question 4 — Technologies en anneau ADOPT]\n2\n\n[Question 5 — Indice moyen du radar]\n70\n\n[Question 6 — Gain de points si eBPF passe en TRIAL]\n5",
    "takeaway": "1) Le radar compte 4 anneaux : ADOPT, TRIAL, ASSESS, HOLD.\n2) Rust est en TRIAL : 75 points.\n3) SVN est en HOLD : 25 points.\n4) Kubernetes et Grafana sont en ADOPT : 2 technologies.\n5) Indice moyen = (75 + 100 + 50 + 25 + 100) / 5 = 350 / 5 = 70.\n6) eBPF passerait de 50 à 75 points : nouvel indice = 375 / 5 = 75, soit +5 points.\nContrôle : 350 + 25 = 375, et 75 − 70 = 5 ; le gain se lit aussi directement : 25 points supplémentaires répartis sur 5 technologies."
  },
  {
    "id": "vt3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le tableau Kanban de la cellule de veille de la maison d'édition Boréal",
    "exampleTitle": "Exemple résolu — le tableau Kanban d'une cellule de banque de données économiques",
    "goal": "Lire un tableau Kanban de veille, calculer des lead times, identifier le goulot d'étranglement et chiffrer un renfort.",
    "brief": "<p><strong>Énoncé.</strong> La cellule de veille de la maison d'édition Boréal (marché du livre) fait défiler ses dossiers dans un Kanban à quatre étapes : Collecte, Analyse, Validation, Diffusion. Durées de la semaine, en heures :</p><table><tr><th>Dossier</th><th>Collecte</th><th>Analyse</th><th>Validation</th><th>Diffusion</th></tr><tr><td>D1</td><td>2</td><td>6</td><td>1</td><td>1</td></tr><tr><td>D2</td><td>4</td><td>4</td><td>2</td><td>1</td></tr><tr><td>D3</td><td>1</td><td>8</td><td>2</td><td>2</td></tr><tr><td>D4</td><td>3</td><td>5</td><td>1</td><td>1</td></tr><tr><td>D5</td><td>2</td><td>7</td><td>1</td><td>2</td></tr></table><p>Définitions : le lead time d'un dossier est la somme des durées de ses quatre étapes ; le goulot est l'étape qui totalise le plus d'heures sur la semaine.</p><p>Consignes : les durées s'écrivent en nombres seuls (heures) ; la question 3 attend le nom de l'étape.</p><ol><li>Quel est le lead time du dossier D3 ?</li><li>Quel est le lead time moyen des cinq dossiers, arrondi à une décimale ?</li><li>Quelle étape est le goulot d'étranglement ?</li><li>Combien d'heures l'étape Analyse a-t-elle consommées au total ?</li><li>Combien de dossiers dépassent strictement 11 heures de lead time ?</li><li>Un second analyste se consacre entièrement à l'étape Analyse : au mieux, en combien d'heures les cinq dossiers traversent-ils cette étape ?</li></ol>",
    "starter": "# Exercice — Le tableau Kanban de la cellule de veille de la maison d'édition Boréal\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Lead time du dossier D3]\nA_COMPLETER\n\n[Question 2 — Lead time moyen arrondi à une décimale]\nA_COMPLETER\n\n[Question 3 — Étape goulot d'étranglement]\nA_COMPLETER\n\n[Question 4 — Heures consommées par l'étape Analyse]\nA_COMPLETER\n\n[Question 5 — Dossiers au-delà de 11 heures]\nA_COMPLETER\n\n[Question 6 — Durée d'analyse avec un second analyste]\nA_COMPLETER\n",
    "hints": [
      "Lead time de D3 = 1 + 8 + 2 + 2. Additionnez colonne par colonne pour obtenir les totaux d'étapes.",
      "Totaux d'étapes : Collecte 12 h, Analyse 30 h, Validation 7 h, Diffusion 7 h ; le goulot est la colonne la plus lourde.",
      "Lead times : D1 10 h, D2 11 h, D3 13 h, D4 10 h, D5 12 h. Seuls ceux qui dépassent strictement 11 h comptent pour la question 5 ; pour la question 6, divisez la charge d'analyse par deux analystes."
    ],
    "examples": [
      {
        "stdin": "Une cellule de banque de données économiques suit quatre dossiers :\n— E1 : collecte 1 h, analyse 3 h, validation 1 h, diffusion 1 h ;\n— E2 : collecte 2 h, analyse 2 h, validation 1 h, diffusion 1 h ;\n— E3 : collecte 1 h, analyse 4 h, validation 2 h, diffusion 1 h ;\n— E4 : collecte 2 h, analyse 3 h, validation 1 h, diffusion 2 h.\n\nRésolution :\n1) Lead times : E1 6 h ; E2 6 h ; E3 8 h ; E4 8 h. Moyenne : 28 / 4 = 7 h.\n2) Totaux par étape : collecte 6 h ; analyse 12 h ; validation 5 h ; diffusion 5 h → goulot : l'analyse.\n3) Avec deux analystes en parallèle : 12 / 2 = 6 h.",
        "expected": "lead moyen 7 h — goulot : analyse — avec deux analystes : 6 h",
        "note": "Ajouter un analyste au goulot divise sa durée par deux ; en ajouter ailleurs ne change rien au délai."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Lead time du dossier D3",
        "stdin": "q:1",
        "expected": "13||13 h||13 heures"
      },
      {
        "label": "Question 2 — Lead time moyen arrondi à une décimale",
        "stdin": "q:2",
        "expected": "11,2||11.2||11,2 h"
      },
      {
        "label": "Question 3 — Étape goulot d'étranglement",
        "stdin": "q:3",
        "expected": "l'analyse||analyse||l'étape analyse||Analyse"
      },
      {
        "label": "Question 4 — Heures consommées par l'étape Analyse",
        "stdin": "q:4",
        "expected": "30||30 h||30 heures"
      },
      {
        "label": "Question 5 — Dossiers au-delà de 11 heures",
        "stdin": "q:5",
        "expected": "2||deux||2 (D3 et D5)||deux (D3 et D5)"
      },
      {
        "label": "Question 6 — Durée d'analyse avec un second analyste",
        "stdin": "q:6",
        "expected": "15||15 h||15 heures"
      }
    ],
    "solution": "[Question 1 — Lead time du dossier D3]\n13\n\n[Question 2 — Lead time moyen arrondi à une décimale]\n11,2\n\n[Question 3 — Étape goulot d'étranglement]\nl'analyse\n\n[Question 4 — Heures consommées par l'étape Analyse]\n30\n\n[Question 5 — Dossiers au-delà de 11 heures]\n2\n\n[Question 6 — Durée d'analyse avec un second analyste]\n15",
    "takeaway": "1) D3 : 1 + 8 + 2 + 2 = 13 heures.\n2) Lead times : 10 + 11 + 13 + 10 + 12 = 56 ; moyenne = 56 / 5 = 11,2 heures.\n3) Totaux d'étapes : Collecte 12 h, Analyse 30 h, Validation 7 h, Diffusion 7 h : le goulot est l'Analyse.\n4) L'Analyse a consommé 30 heures.\n5) D3 (13 h) et D5 (12 h) dépassent strictement 11 h : 2 dossiers.\n6) Deux analystes en parallèle : 30 / 2 = 15 heures au mieux.\nContrôle : 12 + 30 + 7 + 7 = 56 heures, identique à la somme des lead times ; la charge de l'analyse égale plus du double de chaque autre étape."
  }
];
