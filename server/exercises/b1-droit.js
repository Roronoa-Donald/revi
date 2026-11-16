/**
 * Catalogue des 18 études de cas du cours « b1-droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Droit objectif et droits subjectifs",
    goal: "Trier des énoncés entre règles de droit (objectif) et prérogatives (subjectif), puis dresser le bilan.",
    brief: "<p>Classez chaque énoncé juridique proposé sans indice préalable : indiquez <code>libelle : regle</code> s’il relève du droit objectif (norme générale et abstraite) ou <code>libelle : prerogative</code> s’il relève d’un droit subjectif reconnu à un sujet de droit. Terminez par <code>bilan : X regles / Y prerogatives</code>.</p>",
    starter: "# Grille d'analyse (dr-c1-e1) — Droit objectif et droits subjectifs\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un droit civique]\n# Données : droit de vote\nA_COMPLETER\n\n[Cas 2 — Deux normes générales]\n# Données : loi\n# Données : decret\nA_COMPLETER\n\n[Cas 3 — Cinq éléments mixtes]\n# Données : code penal\n# Données : droit a l image\n# Données : coutume\n# Données : droit de propriete\n# Données : arrrete\nA_COMPLETER\n",
    hints: [
      "Le code pénal ou une loi s’appliquent-ils à tous (règle générale) ou accordent-ils un pouvoir individuel ?",
      "Une prérogative commence souvent par « droit à… » ou « droit de… » ; comptez les deux catégories avant le bilan final.",
      "Vérifiez que chaque ligne suit « libelle : regle » ou « libelle : prerogative » puis « bilan : X regles / Y prerogatives » sans accent."
    ],
    examples: [
          {
                "stdin": "3\ncode civil\ndroit de propriete\nreglement\n",
                "expected": "code civil : regle\ndroit de propriete : prerogative\nreglement : regle\nbilan : 2 regles / 1 prerogatives"
          }
    ],
    tests: [
          {
                "label": "Un droit civique",
                "stdin": "cas:1",
                "expected": "droit de vote : prerogative\nbilan : 0 regles / 1 prerogatives"
          },
          {
                "label": "Deux normes générales",
                "stdin": "cas:2",
                "expected": "loi : regle\ndecret : regle\nbilan : 2 regles / 0 prerogatives"
          },
          {
                "label": "Cinq éléments mixtes",
                "stdin": "cas:3",
                "expected": "code penal : regle\ndroit a l image : prerogative\ncoutume : regle\ndroit de propriete : prerogative\narrrete : regle\nbilan : 3 regles / 2 prerogatives"
          }
    ],
    solution: "[Exemple]\ncode civil : regle\ndroit de propriete : prerogative\nreglement : regle\nbilan : 2 regles / 1 prerogatives\n\n[Cas 1 — Un droit civique]\ndroit de vote : prerogative\nbilan : 0 regles / 1 prerogatives\n\n[Cas 2 — Deux normes générales]\nloi : regle\ndecret : regle\nbilan : 2 regles / 0 prerogatives\n\n[Cas 3 — Cinq éléments mixtes]\ncode penal : regle\ndroit a l image : prerogative\ncoutume : regle\ndroit de propriete : prerogative\narrrete : regle\nbilan : 3 regles / 2 prerogatives\n",
    takeaway: "À retenir : Trier des énoncés entre règles de droit (objectif) et prérogatives (subjectif), puis dresser le bilan."
  },
  {
    "id": "dr-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les affiches du grand marché de Sokodé",
    "exampleTitle": "Exemple résolu — les règlements du marché de Dapaong",
    "goal": "Trier des textes réels entre règle de droit, règle morale et mesure individuelle à l'aide des deux caractères de la règle de droit.",
    "brief": "<p><strong>Énoncé.</strong> Le samedi 12 avril 2025, M. Abalo Tchaa, conseiller municipal de la commune de Sokodé, dresse pour le bureau du maire la liste des textes qui encadrent la vie du grand marché. Pour chaque texte, il doit dire s'il s'agit d'une règle de droit, d'une règle morale ou d'une mesure individuelle :</p><table><tr><th>Texte</th><th>Contenu</th></tr><tr><th>1</th><td>La délibération du marché : « tout commerçant qui refuse le contrôle de son registre des ventes est passible d'une amende ».</td></tr><tr><th>2</th><td>Le rappel de l'imam du quartier : « soyez honnêtes dans vos pesées et charitables envers les nécessiteux ».</td></tr><tr><th>3</th><td>L'autorisation d'occupation : « la société Etex SARL est autorisée à occuper le kiosque n° 12 jusqu'au 31 décembre 2025 ».</td></tr><tr><th>4</th><td>La loi qui fixe la majorité à dix-huit ans révolus.</td></tr><tr><th>5</th><td>La note de service : « M. Kwami Adjallé est affecté à la caisse centrale du marché à compter du 1er juin 2025 ».</td></tr></table><p>Pour les questions 1 à 5, répondez strictement par <code>regle de droit</code>, <code>regle morale</code> ou <code>mesure individuelle</code>.</p><ol><li>Qualifiez le texte 1.</li><li>Qualifiez le texte 2.</li><li>Qualifiez le texte 3.</li><li>Qualifiez le texte 4.</li><li>Qualifiez le texte 5.</li><li>Le texte 2 est général ; quel second caractère lui manque-t-il pour être une règle de droit ? (réponse courte)</li></ol>",
    "starter": "# Exercice — Les affiches du grand marché de Sokodé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : repondez par regle de droit, regle morale ou mesure individuelle.\n\n[Question 1 — Qualification du texte 1]\nA_COMPLETER\n\n[Question 2 — Qualification du texte 2]\nA_COMPLETER\n\n[Question 3 — Qualification du texte 3]\nA_COMPLETER\n\n[Question 4 — Qualification du texte 4]\nA_COMPLETER\n\n[Question 5 — Qualification du texte 5]\nA_COMPLETER\n\n[Question 6 — Le caractère manquant du texte 2]\nA_COMPLETER\n",
    "hints": [
      "La règle de droit a deux caractères : générale et abstraite (elle vise des situations, jamais des personnes nommées) ; obligatoire et coercitive (sanction appliquée par l'autorité publique).",
      "Un texte qui vise une personne ou une situation nommément désignée n'est pas une règle : c'est une mesure individuelle.",
      "Le texte 2 est général, mais sa violation n'attire aucune sanction étatique : dites quel caractère lui manque."
    ],
    "examples": [
      {
        "stdin": "Au marché de Dapaong, trois textes sont affichés à la porte du bureau du maire :\n- « la loi interdit le vol sur les étals du marché » ;\n- « il faut saluer et respecter les anciens du marché » ;\n- « le sieur Tchalim est autorisé à occuper l'étal n° 7 jusqu'à la fin de la saison ».\n\n1) La loi interdisant le vol : générale et coercitive : règle de droit.\n2) Le respect des anciens : générale mais sans sanction étatique : règle morale.\n3) L'autorisation d'occupation : vise un occupant désigné : mesure individuelle.",
        "expected": "loi : regle de droit — respect des anciens : regle morale — autorisation : mesure individuelle",
        "note": "Deux questions suffisent : le texte vise-t-il tous (général) ? Sa violation est-elle sanctionnée par l'État (coercitif) ?"
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Qualification du texte 1",
        "stdin": "q:1",
        "expected": "regle de droit||une regle de droit"
      },
      {
        "label": "Question 2 — Qualification du texte 2",
        "stdin": "q:2",
        "expected": "regle morale||une regle morale"
      },
      {
        "label": "Question 3 — Qualification du texte 3",
        "stdin": "q:3",
        "expected": "mesure individuelle||une mesure individuelle"
      },
      {
        "label": "Question 4 — Qualification du texte 4",
        "stdin": "q:4",
        "expected": "regle de droit||une regle de droit"
      },
      {
        "label": "Question 5 — Qualification du texte 5",
        "stdin": "q:5",
        "expected": "mesure individuelle||une mesure individuelle"
      },
      {
        "label": "Question 6 — Le caractère manquant du texte 2",
        "stdin": "q:6",
        "expected": "obligatoire et coercitive||coercitive||obligatoire||le caractere obligatoire et coercitif"
      }
    ],
    "solution": "[Question 1 — Qualification du texte 1]\nregle de droit\n\n[Question 2 — Qualification du texte 2]\nregle morale\n\n[Question 3 — Qualification du texte 3]\nmesure individuelle\n\n[Question 4 — Qualification du texte 4]\nregle de droit\n\n[Question 5 — Qualification du texte 5]\nmesure individuelle\n\n[Question 6 — Le caractère manquant du texte 2]\nobligatoire et coercitive",
    "takeaway": "1) Le texte 1 est une délibération générale assortie d'une amende : générale et coercitive : règle de droit.\n2) Le texte 2 (honnêteté, charité) est général mais non coercitif — aucune sanction étatique ne suit sa violation : règle morale.\n3) Le texte 3 (kiosque n° 12 pour la société Etex) vise une société désignée : mesure individuelle.\n4) Le texte 4 (majorité à dix-huit ans révolus) est une règle générale et obligatoire posée par la loi : règle de droit.\n5) Le texte 5 (affectation de M. Adjallé) désigne nommément une personne : mesure individuelle.\n6) Le texte 2 possède le caractère général et abstrait ; il lui manque le caractère obligatoire et coercitif : sa violation n'attire pas de sanction appliquée par l'autorité publique, contrairement au vol puni par le Code pénal. C'est ce caractère contraignant et coercitif qui distingue la règle de droit des règles de morale et de religion."
  },
  {
    "id": "dr-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "La revue de presse du palais de justice de Lomé",
    "exampleTitle": "Exemple résolu — la revue de presse du palais de justice de Kara",
    "goal": "Classer des sanctions réelles par famille : pénale, civile, administrative ou disciplinaire.",
    "brief": "<p><strong>Énoncé.</strong> Le samedi 22 février 2025, le bureau de presse du palais de justice de Lomé publie sa revue hebdomadaire des décisions rendues au Togo. Le rédacteur, Maître Essohana Bamnan, doit indiquer pour chaque décision la famille de la sanction prononcée :</p><table><tr><th>Décision</th><th>Résumé de la décision</th></tr><tr><th>1</th><td>Le TPI de Lomé condamne un voleur de motos à six mois d'emprisonnement et 100 000 FCFA d'amende.</td></tr><tr><th>2</th><td>La Cour d'Appel de Lomé condamne un bailleur à verser 250 000 FCFA de dommages-intérêts à son locataire expulsé sans aucune procédure.</td></tr><tr><th>3</th><td>Le maire de Kara retire pour un mois l'autorisation d'occupation d'un restaurant qui trouble le voisinage.</td></tr><tr><th>4</th><td>Le conseil de discipline de la société Sotralog licencie un chauffeur pris en état d'ivresse au volant d'un camion de l'entreprise.</td></tr><tr><th>5</th><td>L'Université de Kara inflige un avertissement écrit à un étudiant surpris en fraude pendant un examen.</td></tr></table><p>Pour les questions 1 à 5, répondez strictement par <code>penale</code>, <code>civile</code>, <code>administrative</code> ou <code>disciplinaire</code>.</p><ol><li>Quelle est la famille de la sanction dans la décision 1 ?</li><li>Quelle est la famille de la sanction dans la décision 2 ?</li><li>Quelle est la famille de la sanction dans la décision 3 ?</li><li>Quelle est la famille de la sanction dans la décision 4 ?</li><li>Quelle est la famille de la sanction dans la décision 5 ?</li><li>À qui les dommages-intérêts de la décision 2 sont-ils versés : à la victime ou à l'État ? (réponse courte)</li></ol>",
    "starter": "# Exercice — La revue de presse du palais de justice de Lomé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : repondez par penale, civile, administrative ou disciplinaire.\n\n[Question 1 — Famille de la sanction dans la décision 1]\nA_COMPLETER\n\n[Question 2 — Famille de la sanction dans la décision 2]\nA_COMPLETER\n\n[Question 3 — Famille de la sanction dans la décision 3]\nA_COMPLETER\n\n[Question 4 — Famille de la sanction dans la décision 4]\nA_COMPLETER\n\n[Question 5 — Famille de la sanction dans la décision 5]\nA_COMPLETER\n\n[Question 6 — Destinataire des dommages-intérêts]\nA_COMPLETER\n",
    "hints": [
      "Quatre familles : pénales (amendes, emprisonnement), civiles (dommages-intérêts versés à la victime), administratives (suspension d'activité, retrait d'autorisation), disciplinaires (avertissement, blâme, licenciement).",
      "Repérez qui prononce la sanction et dans quel cadre : l'État répressif, la victime indemnisée, l'administration, ou un cadre professionnel ou institutionnel.",
      "Les décisions 4 et 5 sont prononcées dans deux cadres différents (entreprise, université), mais toutes deux sanctionnent un manquement interne : même famille."
    ],
    "examples": [
      {
        "stdin": "Trois décisions retenues par la presse judiciaire à Kara :\n- le TPI de Kara condamne un escroc à 200 000 FCFA d'amende ;\n- un juge condamne un maçon à verser 150 000 FCFA de dommages-intérêts à un client blessé ;\n- la mairie suspend pour deux semaines l'autorisation d'un débit de boissons.\n\n1) L'amende : sanction pénale.\n2) Les dommages-intérêts versés au client : sanction civile.\n3) La suspension prononcée par la mairie : sanction administrative.",
        "expected": "amende : penale — dommages-interets : civile — suspension : administrative",
        "note": "La nature de la sanction (amende, dommages-intérêts, suspension) révèle sa famille ; son auteur la confirme."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Famille de la sanction dans la décision 1",
        "stdin": "q:1",
        "expected": "penale||sanction penale||la sanction penale"
      },
      {
        "label": "Question 2 — Famille de la sanction dans la décision 2",
        "stdin": "q:2",
        "expected": "civile||sanction civile||la sanction civile"
      },
      {
        "label": "Question 3 — Famille de la sanction dans la décision 3",
        "stdin": "q:3",
        "expected": "administrative||sanction administrative||la sanction administrative"
      },
      {
        "label": "Question 4 — Famille de la sanction dans la décision 4",
        "stdin": "q:4",
        "expected": "disciplinaire||sanction disciplinaire||la sanction disciplinaire"
      },
      {
        "label": "Question 5 — Famille de la sanction dans la décision 5",
        "stdin": "q:5",
        "expected": "disciplinaire||sanction disciplinaire||la sanction disciplinaire"
      },
      {
        "label": "Question 6 — Destinataire des dommages-intérêts",
        "stdin": "q:6",
        "expected": "a la victime||la victime||victime"
      }
    ],
    "solution": "[Question 1 — Famille de la sanction dans la décision 1]\npenale\n\n[Question 2 — Famille de la sanction dans la décision 2]\ncivile\n\n[Question 3 — Famille de la sanction dans la décision 3]\nadministrative\n\n[Question 4 — Famille de la sanction dans la décision 4]\ndisciplinaire\n\n[Question 5 — Famille de la sanction dans la décision 5]\ndisciplinaire\n\n[Question 6 — Destinataire des dommages-intérêts]\na la victime",
    "takeaway": "1) Décision 1 : l'emprisonnement et l'amende sont prononcés par la juridiction pénale contre le voleur : sanction pénale.\n2) Décision 2 : les 250 000 FCFA de dommages-intérêts réparent le préjudice du locataire : sanction civile.\n3) Décision 3 : le maire, autorité administrative, retire l'autorisation d'occupation : sanction administrative.\n4) Décision 4 : le conseil de discipline licencie le chauffeur pour un manquement professionnel : sanction disciplinaire.\n5) Décision 5 : l'avertissement de l'université sanctionne une fraude dans un cadre institutionnel : sanction disciplinaire.\n6) Les dommages-intérêts de la décision 2 sont versés à la victime (le locataire expulsé), et non à l'État : c'est ce qui distingue la sanction civile de la sanction pénale, dont l'amende profite à l'État.\nContrôle : les cinq décisions couvrent les quatre familles du cours (2 disciplinaires, et une de chaque autre famille)."
  },
  {
    "id": "dr-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le dossier du tailleur du grand marché",
    "exampleTitle": "Exemple résolu — le dossier des bailleurs d'Atakpamé",
    "goal": "Identifier la loi, la coutume, la jurisprudence et la doctrine dans le dossier d'un litige, et dire laquelle s'impose au juge.",
    "brief": "<p><strong>Énoncé.</strong> Le 3 mars 2025, au TPI de Lomé, M. Essohana Kpognon, tailleur au grand marché, réclame 300 000 FCFA de dommages-intérêts à son confrère M. Bissi Sodji qui, pour lui prendre une commande de mariage, a répété à la cliente que « les costumes d'Essohana décousent au premier essayage » — allégation fausse. La loi ne prévoit pas expressément ce cas. Pour instruire le dossier, la greffière réunit quatre documents :</p><table><tr><th>Document</th><th>Contenu</th></tr><tr><th>1</th><td>Le Code des obligations, voté par l'Assemblée nationale et promulgué par le Président de la République : « quiconque cause, par sa faute, un dommage à autrui, répare ce dommage ».</td></tr><tr><th>2</th><td>La pratique des tailleurs du grand marché : « on ne dénigre jamais le travail d'un confrère », pratique constante, répandue et tenue pour obligatoire depuis des décennies.</td></tr><tr><th>3</th><td>Un arrêt rendu en 2019 par la Cour Suprême confirmant la condamnation d'un commerçant de Kara pour dénigrement public d'une concurrente.</td></tr><tr><th>4</th><td>La chronique d'un professeur de l'Université de Lomé (2023) : « le dénigrement est la faute civile la plus coûteuse pour le petit commerce ».</td></tr></table><p>Pour les questions 1 à 4, répondez par un seul mot : <code>loi</code>, <code>coutume</code>, <code>jurisprudence</code> ou <code>doctrine</code>.</p><ol><li>Quelle source le document 1 représente-t-il ?</li><li>Quelle source le document 2 représente-t-il ?</li><li>Quelle source le document 3 représente-t-il ?</li><li>Quelle source le document 4 représente-t-il ?</li><li>La jurisprudence et la doctrine sont-elles des sources directes ou indirectes du droit ? (réponse courte)</li><li>En cas de conflit entre la coutume et la loi, laquelle le juge applique-t-il ? (un mot)</li></ol>",
    "starter": "# Exercice — Le dossier du tailleur du grand marché\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : repondez par un seul mot (loi, coutume, jurisprudence ou doctrine).\n\n[Question 1 — Source représentée par le document 1]\nA_COMPLETER\n\n[Question 2 — Source représentée par le document 2]\nA_COMPLETER\n\n[Question 3 — Source représentée par le document 3]\nA_COMPLETER\n\n[Question 4 — Source représentée par le document 4]\nA_COMPLETER\n\n[Question 5 — Sources directes ou indirectes]\nA_COMPLETER\n\n[Question 6 — La source qui l'emporte en cas de conflit]\nA_COMPLETER\n",
    "hints": [
      "Sources directes : la loi (texte voté par le Parlement et promulgué) et la coutume (élément matériel : pratique constante ; élément psychologique : croyance au caractère obligatoire).",
      "Le document 3 est une décision juridictionnelle concordante ; le document 4 est l'opinion d'un auteur.",
      "En cas de conflit dans un système codifié, le juge revient toujours au texte voté par le Parlement."
    ],
    "examples": [
      {
        "stdin": "À Atakpamé, un litige entre bailleurs et locataires est instruit avec quatre documents :\n- la loi sur les baux d'habitation, votée et promulguée ;\n- la pratique constante des propriétaires du quartier : « on ne congédie pas un locataire pendant les fêtes », tenue pour obligatoire ;\n- un arrêt de la Cour d'Appel de Lomé rendu en 2021 sur un congé abusif ;\n- un article d'un professeur sur la protection des locataires.\n\n1) La loi votée et promulguée : source directe (la loi).\n2) La pratique constante et obligatoire : source directe (la coutume).\n3) L'arrêt : source indirecte (la jurisprudence).\n4) L'article du professeur : source indirecte (la doctrine).\n5) En cas de conflit, le juge applique la loi.",
        "expected": "loi — coutume — jurisprudence — doctrine — la loi s'impose au juge",
        "note": "Loi et coutume créent la règle ; jurisprudence et doctrine l'interprètent et l'inspirent, sans s'imposer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Source représentée par le document 1",
        "stdin": "q:1",
        "expected": "loi||la loi"
      },
      {
        "label": "Question 2 — Source représentée par le document 2",
        "stdin": "q:2",
        "expected": "coutume||la coutume"
      },
      {
        "label": "Question 3 — Source représentée par le document 3",
        "stdin": "q:3",
        "expected": "jurisprudence||la jurisprudence"
      },
      {
        "label": "Question 4 — Source représentée par le document 4",
        "stdin": "q:4",
        "expected": "doctrine||la doctrine"
      },
      {
        "label": "Question 5 — Sources directes ou indirectes",
        "stdin": "q:5",
        "expected": "indirectes||indirecte||sources indirectes||des sources indirectes"
      },
      {
        "label": "Question 6 — La source qui l'emporte en cas de conflit",
        "stdin": "q:6",
        "expected": "loi||la loi"
      }
    ],
    "solution": "[Question 1 — Source représentée par le document 1]\nloi\n\n[Question 2 — Source représentée par le document 2]\ncoutume\n\n[Question 3 — Source représentée par le document 3]\njurisprudence\n\n[Question 4 — Source représentée par le document 4]\ndoctrine\n\n[Question 5 — Sources directes ou indirectes]\nindirectes\n\n[Question 6 — La source qui l'emporte en cas de conflit]\nloi",
    "takeaway": "1) Le document 1 est un texte voté par l'Assemblée nationale et promulgué par le Président de la République : c'est une loi — source directe du droit.\n2) Le document 2 est une pratique constante et répandue, tenue pour obligatoire depuis des décennies : c'est une coutume — source directe, avec son élément matériel (répétition prolongée) et son élément psychologique (croyance au caractère obligatoire).\n3) Le document 3 est une décision juridictionnelle concordante rendue sur des faits non expressément prévus par la loi : c'est de la jurisprudence — source indirecte.\n4) Le document 4 est l'opinion d'un professeur sur le droit : c'est de la doctrine — source indirecte, qui influence sans s'imposer.\n5) La jurisprudence et la doctrine sont des sources indirectes : elles interprètent et inspirent la règle, mais ne la créent pas.\n6) En cas de conflit entre la coutume et la loi, le juge applique la loi : dans les systèmes codifiés, la loi l'emporte sur la coutume.\nApplication au cas : le juge du TPI de Lomé pourra fonder sa décision sur le Code des obligations (document 1) : « quiconque cause, par sa faute, un dommage à autrui, répare ce dommage » ; la coutume, l'arrêt de 2019 et la chronique du professeur ne feront que confirmer l'interprétation."
  },
  {
    "id": "dr-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "De l'Assemblée nationale au Journal officiel",
    "exampleTitle": "Exemple résolu — la loi sur les pharmacies de garde de Kara",
    "goal": "Ordonner les quatre étapes d'établissement d'une loi (adoption, promulgation, publication, jour franc) et dater son entrée en vigueur.",
    "brief": "<p><strong>Énoncé.</strong> En 2025, le Parlement togolais examine le projet de loi « portant protection des consommateurs dans le commerce en ligne », destiné à encadrer les ventes menées sur les réseaux sociaux à Lomé. Le journaliste du quotidien <em>L'Éveil</em> retrace le dossier législatif :</p><table><tr><th>Étape</th><th>Date</th></tr><tr><th>Adoption du texte par l'Assemblée nationale</th><td>mardi 4 novembre 2025</td></tr><tr><th>Promulgation par le Président de la République</th><td>vendredi 14 novembre 2025</td></tr><tr><th>Parution au Journal officiel de la République togolaise</th><td>samedi 22 novembre 2025</td></tr></table><p>Rappel du cours : la loi entre en vigueur après le jour franc, un délai de vingt-quatre heures suivant la parution. Répondez aux dates au format JJ/MM/AAAA (par exemple 15/03/2024).</p><ol><li>Quel organe adopte la loi ? (réponse courte)</li><li>La promulgation et la publication sont deux actes différents : lequel est accompli par le Président de la République ? (un mot)</li><li>Combien d'heures après la parution le jour franc dure-t-il ? (un nombre)</li><li>À quelle date tombe le jour franc de cette loi ?</li><li>À quelle date la loi entre-t-elle en vigueur ?</li><li>Le 26 novembre 2025, un vendeur de Lomé invoque son ignorance de la loi nouvelle pour la contester : est-il recevable ? (oui/non)</li></ol>",
    "starter": "# Exercice — De l'Assemblée nationale au Journal officiel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Dates au format JJ/MM/AAAA (par exemple 15/03/2024).\n\n[Question 1 — L'organe qui adopte la loi]\nA_COMPLETER\n\n[Question 2 — L'acte accompli par le Président]\nA_COMPLETER\n\n[Question 3 — Durée du jour franc]\nA_COMPLETER\n\n[Question 4 — Date du jour franc]\nA_COMPLETER\n\n[Question 5 — Date d'entrée en vigueur]\nA_COMPLETER\n\n[Question 6 — Recevabilité de l'ignorance de la loi]\nA_COMPLETER\n",
    "hints": [
      "Une loi naît en quatre gestes : adoption (Parlement), promulgation (Président), publication (journal officiel), jour franc — A-P-P-J.",
      "Le jour franc est un délai de vingt-quatre heures qui court à partir de la parution au Journal officiel, ni à partir du vote, ni à partir de la promulgation.",
      "La loi entre en vigueur le lendemain du jour franc ; après ce délai, nul n'est censé ignorer la loi."
    ],
    "examples": [
      {
        "stdin": "La loi sur les pharmacies de garde de Kara :\n- adoption par l'Assemblée nationale le 10 février 2026 ;\n- promulgation par le Président de la République le 20 février 2026 ;\n- parution au Journal officiel le mercredi 25 février 2026.\n\n1) La loi est adoptée par l'Assemblée nationale (le Parlement).\n2) La promulgation est l'acte du Président de la République.\n3) Le jour franc dure 24 heures.\n4) Jour franc : le 26/02/2026.\n5) Entrée en vigueur : le 27/02/2026.\n6) Après cette date, nul n'est censé ignorer la loi.",
        "expected": "adoption : assemblee nationale — promulgation — 24 heures — jour franc le 26/02/2026 — en vigueur le 27/02/2026",
        "note": "Parution le 25/02, jour franc le 26/02 (vingt-quatre heures), entrée en vigueur le 27/02 : la loi ne dispose que pour l'avenir."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — L'organe qui adopte la loi",
        "stdin": "q:1",
        "expected": "assemblee nationale||l'assemblee nationale||l assemblee nationale||parlement||le parlement"
      },
      {
        "label": "Question 2 — L'acte accompli par le Président",
        "stdin": "q:2",
        "expected": "promulgation||la promulgation"
      },
      {
        "label": "Question 3 — Durée du jour franc",
        "stdin": "q:3",
        "expected": "24||24 heures||24 h||vingt-quatre||vingt quatre"
      },
      {
        "label": "Question 4 — Date du jour franc",
        "stdin": "q:4",
        "expected": "23/11/2025||23/11/25||23/11||23 novembre 2025"
      },
      {
        "label": "Question 5 — Date d'entrée en vigueur",
        "stdin": "q:5",
        "expected": "24/11/2025||24/11/25||24/11||24 novembre 2025"
      },
      {
        "label": "Question 6 — Recevabilité de l'ignorance de la loi",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — L'organe qui adopte la loi]\nassemblee nationale\n\n[Question 2 — L'acte accompli par le Président]\npromulgation\n\n[Question 3 — Durée du jour franc]\n24\n\n[Question 4 — Date du jour franc]\n23/11/2025\n\n[Question 5 — Date d'entrée en vigueur]\n24/11/2025\n\n[Question 6 — Recevabilité de l'ignorance de la loi]\nnon",
    "takeaway": "1) La loi est adoptée par l'Assemblée nationale — le Parlement togolais.\n2) La promulgation est l'acte par lequel le Président de la République reconnaît le texte voté comme loi de la République et ordonne son exécution ; la publication, elle, porte la loi à la connaissance des citoyens par son insertion au Journal officiel.\n3) Le jour franc est un délai de vingt-quatre heures : 24 heures après la parution.\n4) La loi est parue le samedi 22 novembre 2025 : le jour franc s'écoule le dimanche 23/11/2025.\n5) La loi entre en vigueur le lendemain du jour franc, soit le lundi 24/11/2025.\n6) Non : après l'écoulement du jour franc, « nul n'est censé ignorer la loi » — le vendeur du 26 novembre ne peut pas invoquer son ignorance pour contester la loi entrée en vigueur.\nContrôle : parution 22/11 → jour franc 23/11 → vigueur 24/11 : trois dates successives, dans l'ordre A-P-P-J (adoption 04/11, promulgation 14/11, publication 22/11, jour franc 23/11)."
  },
  {
    "id": "dr-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Quatre textes en conflit au port de Lomé",
    "exampleTitle": "Exemple résolu — les textes du chantier de Cinkassé",
    "goal": "Placer des textes dans les quatre blocs de la hiérarchie des normes et départager deux conflits de normes.",
    "brief": "<p><strong>Énoncé.</strong> La société Agbo Déco SARL, entreprise de BTP établie à Lomé, travaille sur un chantier du port autonome. Le lundi 5 mai 2025, son gérant consulte Maître Akouvi Sika avec cinq textes qui se chevauchent sur le chantier :</p><table><tr><th>Texte</th><th>Description</th></tr><tr><th>1</th><td>La Constitution de la République togolaise (Ve République, promulguée en 2024).</td></tr><tr><th>2</th><td>Le traité international de libre-échange ratifié par le Togo, ouvrant les marchés de services.</td></tr><tr><th>3</th><td>La loi organique fixant le statut de la HAAC.</td></tr><tr><th>4</th><td>Le décret pris en Conseil des ministres pour organiser l'enregistrement des entreprises de BTP.</td></tr><tr><th>5</th><td>L'arrêté du maire de Lomé fixant les horaires de livraison des camions dans le quartier du port.</td></tr></table><p>Pour les questions 1 à 4, répondez par le nom du bloc : <code>constitutionnalite</code>, <code>conventionnalite</code>, <code>legalite</code> ou <code>reglementaire</code>.</p><ol><li>Dans quel bloc de la hiérarchie se place le texte 1 ?</li><li>Dans quel bloc de la hiérarchie se place le texte 2 ?</li><li>Dans quel bloc de la hiérarchie se place le texte 3 ?</li><li>Dans quel bloc de la hiérarchie se place le texte 5 ?</li><li>En cas de conflit entre le texte 3 (loi organique) et le texte 4 (décret), quelle norme l'emporte ? (un mot)</li><li>En cas de conflit entre le texte 2 (traité) et le texte 3 (loi organique), quelle norme l'emporte ? (un mot)</li></ol>",
    "starter": "# Exercice — Quatre textes en conflit au port de Lomé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : nom du bloc (constitutionnalite, conventionnalite, legalite ou reglementaire).\n\n[Question 1 — Bloc du texte 1]\nA_COMPLETER\n\n[Question 2 — Bloc du texte 2]\nA_COMPLETER\n\n[Question 3 — Bloc du texte 3]\nA_COMPLETER\n\n[Question 4 — Bloc du texte 5]\nA_COMPLETER\n\n[Question 5 — La norme qui l'emporte : loi contre décret]\nA_COMPLETER\n\n[Question 6 — La norme qui l'emporte : traité contre loi]\nA_COMPLETER\n",
    "hints": [
      "La pyramide des normes : Constitution (bloc de constitutionnalité), puis traités et accords internationaux (conventionnalité), puis lois organiques, ordinaires et ordonnances (légalité), puis décrets et arrêtés (bloc réglementaire).",
      "Un décret vit sous la légalité ; un arrêté vit dans le bloc réglementaire ; la HAAC, pouvoir public, est organisée par une loi organique.",
      "En cas de conflit, la norme supérieure l'emporte : comparez le rang des deux textes dans la pyramide."
    ],
    "examples": [
      {
        "stdin": "Sur un chantier de Cinkassé, quatre textes :\n- la Constitution ;\n- une convention internationale douanière ratifiée par le Togo ;\n- une loi ordinaire sur les marchés publics ;\n- un arrêté du préfet de Tône sur les accès au chantier.\n\n1) Constitution : bloc de constitutionnalité (sommet de la pyramide).\n2) Convention : bloc de conventionnalité.\n3) Loi ordinaire : bloc de légalité.\n4) Arrêté préfectoral : bloc réglementaire.\n5) Conflit loi contre arrêté : la loi l'emporte. Conflit convention contre loi : la convention l'emporte.",
        "expected": "constitutionnalite — conventionnalite — legalite — reglementaire — la loi — la convention",
        "note": "Chaque règle doit être conforme à celle qui lui est supérieure : Constitution, puis traités, puis lois, puis règlements."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Bloc du texte 1",
        "stdin": "q:1",
        "expected": "constitutionnalite||bloc de constitutionnalite||le bloc de constitutionnalite"
      },
      {
        "label": "Question 2 — Bloc du texte 2",
        "stdin": "q:2",
        "expected": "conventionnalite||bloc de conventionnalite||le bloc de conventionnalite"
      },
      {
        "label": "Question 3 — Bloc du texte 3",
        "stdin": "q:3",
        "expected": "legalite||bloc de legalite||le bloc de legalite"
      },
      {
        "label": "Question 4 — Bloc du texte 5",
        "stdin": "q:4",
        "expected": "reglementaire||bloc reglementaire||le bloc reglementaire"
      },
      {
        "label": "Question 5 — La norme qui l'emporte : loi contre décret",
        "stdin": "q:5",
        "expected": "loi||la loi||la loi organique||loi organique"
      },
      {
        "label": "Question 6 — La norme qui l'emporte : traité contre loi",
        "stdin": "q:6",
        "expected": "traite||le traite||le traite international"
      }
    ],
    "solution": "[Question 1 — Bloc du texte 1]\nconstitutionnalite\n\n[Question 2 — Bloc du texte 2]\nconventionnalite\n\n[Question 3 — Bloc du texte 3]\nlegalite\n\n[Question 4 — Bloc du texte 5]\nreglementaire\n\n[Question 5 — La norme qui l'emporte : loi contre décret]\nloi\n\n[Question 6 — La norme qui l'emporte : traité contre loi]\ntraite",
    "takeaway": "1) Le texte 1 est la Constitution : bloc de constitutionnalité, sommet de la hiérarchie.\n2) Le texte 2 est un traité international ratifié par le Togo : bloc de conventionnalité, placé sous la Constitution et au-dessus des lois.\n3) Le texte 3 est une loi organique (statut d'un pouvoir public, la HAAC) : bloc de légalité.\n4) Le texte 5 est un arrêté municipal : bloc réglementaire, avec les décrets et autres textes de l'exécutif.\n5) Conflit loi organique (texte 3) contre décret (texte 4) : le décret vit sous la légalité, c'est la loi qui l'emporte.\n6) Conflit traité (texte 2) contre loi organique (texte 3) : le traité occupe un rang supérieur aux lois dans la pyramide, c'est le traité qui l'emporte.\nRègle générale : la hiérarchie des normes impose à chaque règle d'être conforme à celle qui lui est supérieure — Constitution, puis traités, puis lois, puis règlements — et, en cas de conflit, la norme supérieure l'emporte. Le gérant d'Agbo Déco pourra donc écarter l'arrêté et le décret contraires à la loi, et la loi contraire au traité, mais jamais un texte de la Constitution."
  },
  {
    "id": "dr-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Quatre dossiers au bureau d'ordre",
    "exampleTitle": "Exemple résolu — le bureau d'ordre de Kara",
    "goal": "Router des dossiers entre le TPI, la Cour d'Appel et la Cour Suprême selon leur degré de juridiction.",
    "brief": "<p><strong>Énoncé.</strong> Le lundi 6 octobre 2025, au bureau d'ordre du palais de justice de Lomé, le greffier reçoit quatre dossiers :</p><table><tr><th>Dossier</th><th>Situation</th></tr><tr><th>A</th><td>Mme Ayélé Dzitri réclame 400 000 FCFA de loyers impayés à son locataire de Tokoin : première demande, le litige n'a jamais été jugé.</td></tr><tr><th>B</th><td>La SARL Mawuli Trans, condamnée par le TPI de Lomé le 3 juin 2025, veut faire réexaminer le litige par une juridiction supérieure.</td></tr><tr><th>C</th><td>Après l'appel, une question de droit a été tranchée de façon divergente : une partie veut saisir le juge suprême.</td></tr><tr><th>D</th><td>Un vol avec violence a été commis au marché d'Adawlato : le ministère public engage les poursuites pour la première fois.</td></tr></table><p>Pour les questions 1 à 4, répondez par la juridiction concernée, en la nommant de façon courte (par exemple : <code>tpi de lome</code>).</p><ol><li>Devant quelle juridiction le dossier A doit-il être porté en premier ?</li><li>Devant quelle juridiction le litige du dossier B sera-t-il réexaminé ?</li><li>Quelle juridiction connaîtra du dossier C ?</li><li>Devant quelle juridiction le dossier D sera-t-il jugé en premier ressort ?</li><li>Comment s'appelle le principe qui permet à tout plaideur insatisfait de porter son affaire devant une juridiction supérieure ? (réponse courte)</li></ol>",
    "starter": "# Exercice — Quatre dossiers au bureau d'ordre\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : nommez la juridiction (par exemple : tpi de lome).\n\n[Question 1 — Juridiction compétente pour le dossier A]\nA_COMPLETER\n\n[Question 2 — Juridiction compétente pour le dossier B]\nA_COMPLETER\n\n[Question 3 — Juridiction compétente pour le dossier C]\nA_COMPLETER\n\n[Question 4 — Juridiction compétente pour le dossier D]\nA_COMPLETER\n\n[Question 5 — Le principe du recours au degré supérieur]\nA_COMPLETER\n",
    "hints": [
      "Juridictions de droit commun : les Tribunaux de Première Instance (TPI) jugent en premier degré ; les Cours d'Appel réexaminent les décisions des TPI ; la Cour Suprême est le juge suprême (civil, pénal, administratif).",
      "Un litige jamais jugé commence toujours au premier degré ; seule une décision déjà rendue peut être portée au degré supérieur.",
      "Le TPI est compétent en premier ressort pour les affaires civiles comme pour les affaires pénales."
    ],
    "examples": [
      {
        "stdin": "Au bureau d'ordre de Kara, trois dossiers :\n- une demande de pension alimentaire jamais jugée ;\n- l'appel d'une décision du TPI de Kara rendue en février ;\n- un pourvoi contestant l'application du droit après l'appel.\n\n1) Pension alimentaire, première demande : TPI de Kara.\n2) Appel d'une décision du TPI : Cour d'Appel.\n3) Pourvoi sur une question de droit : Cour Suprême.",
        "expected": "tpi de kara — cour d'appel — cour supreme",
        "note": "Premier degré au TPI, réexamen à la Cour d'Appel, contrôle du droit à la Cour Suprême : le routage suit le degré."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Juridiction compétente pour le dossier A",
        "stdin": "q:1",
        "expected": "tpi de lome||tribunal de premiere instance de lome||le tpi de lome||tpi"
      },
      {
        "label": "Question 2 — Juridiction compétente pour le dossier B",
        "stdin": "q:2",
        "expected": "cour d'appel de lome||cour d appel de lome||la cour d'appel de lome||cour d'appel||la cour d'appel"
      },
      {
        "label": "Question 3 — Juridiction compétente pour le dossier C",
        "stdin": "q:3",
        "expected": "cour supreme||la cour supreme"
      },
      {
        "label": "Question 4 — Juridiction compétente pour le dossier D",
        "stdin": "q:4",
        "expected": "tpi de lome||tribunal de premiere instance de lome||le tpi de lome||tpi"
      },
      {
        "label": "Question 5 — Le principe du recours au degré supérieur",
        "stdin": "q:5",
        "expected": "double degre||le double degre de juridiction||double degre de juridiction"
      }
    ],
    "solution": "[Question 1 — Juridiction compétente pour le dossier A]\ntpi de lome\n\n[Question 2 — Juridiction compétente pour le dossier B]\ncour d'appel de lome\n\n[Question 3 — Juridiction compétente pour le dossier C]\ncour supreme\n\n[Question 4 — Juridiction compétente pour le dossier D]\ntpi de lome\n\n[Question 5 — Le principe du recours au degré supérieur]\ndouble degre",
    "takeaway": "1) Dossier A : le litige de loyers n'a jamais été jugé : première demande, premier degré : le TPI de Lomé, juridiction de droit commun de premier degré.\n2) Dossier B : Mawuli Trans, condamnée en premier degré, veut faire réexaminer le litige : la Cour d'Appel de Lomé, deuxième degré, examine les appels des décisions des TPI.\n3) Dossier C : après l'appel, la question de droit relève du juge suprême : la Cour Suprême (civil, pénal, administratif), saisie par la voie du pourvoi.\n4) Dossier D : le vol avec violence d'Adawlato est jugé en premier ressort par le TPI de Lomé — le TPI est compétent en premier degré pour le civil comme pour le pénal.\n5) Le principe est le double degré de juridiction : tout plaideur insatisfait peut porter son affaire devant une juridiction supérieure, qui examine à nouveau le litige — un rattrapage des erreurs éventuelles des premiers juges.\nContrôle : les dossiers A et D vont au premier degré (TPI de Lomé), le dossier B au deuxième (Cour d'Appel), le dossier C au juge suprême (Cour Suprême) : chaque dossier suit son degré."
  },
  {
    "id": "dr-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Woyo Transport contre Tetteh : le parcours judiciaire",
    "exampleTitle": "Exemple résolu — Agbo Imprim contre la mairie de Kpalimé",
    "goal": "Dérouler le double degré de juridiction sur un litige réel et délimiter le rôle de chaque degré.",
    "brief": "<p><strong>Énoncé.</strong> Le 12 janvier 2024, M. Tetteh Adjo confie à la SARL Woyo Transport le transport de sa marchandise de Lomé à Cinkassé. Le camion n'arrive jamais : la marchandise est perdue, et M. Tetteh assigne la société en paiement de dommages-intérêts. Le dossier enchaîne trois étapes :</p><table><tr><th>Date</th><th>Étape</th></tr><tr><th>15 mars 2024</th><td>Le TPI de Lomé condamne Woyo Transport à payer 1 200 000 FCFA de dommages-intérêts à M. Tetteh.</td></tr><tr><th>20 février 2025</th><td>Saisie de l'appel, la Cour d'Appel de Lomé examine à nouveau le litige et réduit la condamnation à 800 000 FCFA.</td></tr><tr><th>25 février 2025</th><td>Woyo Transport demande à son avocat « une troisième instance pour faire rejuger les faits une dernière fois ».</td></tr></table><ol><li>Quelle juridiction a jugé le litige en premier degré ? (nom court)</li><li>Quel est le rôle de la Cour d'Appel : réexaminer le litige, ou seulement vérifier la forme de la décision ? (réponse courte)</li><li>Quelle est la seule juridiction compétente pour l'étape suivante ? (nom court)</li><li>Une « troisième instance pour rejuger les faits » existe-t-elle ? (oui/non)</li><li>Devant cette juridiction suivante, les faits sont-ils réexaminés, ou seul le droit est-il vérifié ? (réponse courte)</li><li>À quoi sert le double degré de juridiction ? (expression du cours)</li></ol>",
    "starter": "# Exercice — Woyo Transport contre Tetteh : le parcours judiciaire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — La juridiction du premier degré]\nA_COMPLETER\n\n[Question 2 — Le rôle de la Cour d'Appel]\nA_COMPLETER\n\n[Question 3 — La juridiction de l'étape suivante]\nA_COMPLETER\n\n[Question 4 — L'existence d'une troisième instance sur les faits]\nA_COMPLETER\n\n[Question 5 — Ce que contrôle la juridiction suivante]\nA_COMPLETER\n\n[Question 6 — L'utilité du double degré]\nA_COMPLETER\n",
    "hints": [
      "Le TPI est la juridiction de droit commun de premier degré ; la Cour d'Appel, deuxième degré, examine les appels des décisions des TPI ; la Cour Suprême est le juge suprême.",
      "Le double degré donne deux regards sur chaque affaire, pas un rejugement sans fin.",
      "Après l'appel, la juridiction suprême contrôle l'application du droit, sans redébatre les faits."
    ],
    "examples": [
      {
        "stdin": "La société Agbo Imprim, condamnée par le TPI de Kpalimé le 10 mai 2024, obtient de la Cour d'Appel un réexamen du litige le 12 janvier 2025, puis veut saisir le juge suprême sur une question de droit.\n\n1) Premier degré : TPI de Kpalimé.\n2) Deuxième degré : la Cour d'Appel réexamine le litige.\n3) Juge suprême : la Cour Suprême, qui vérifie le droit, pas les faits.\n4) Le double degré est un rattrapage des erreurs éventuelles des premiers juges.",
        "expected": "tpi de kpalime — reexamine le litige — cour supreme (controle du droit) — double degre : rattrapage des erreurs",
        "note": "Deux regards sur le litige, puis un contrôle du droit seulement : c'est le double degré."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La juridiction du premier degré",
        "stdin": "q:1",
        "expected": "tpi de lome||tribunal de premiere instance de lome||le tpi de lome||tpi"
      },
      {
        "label": "Question 2 — Le rôle de la Cour d'Appel",
        "stdin": "q:2",
        "expected": "reexaminer le litige||reexamine le litige||elle reexamine le litige||examiner a nouveau le litige"
      },
      {
        "label": "Question 3 — La juridiction de l'étape suivante",
        "stdin": "q:3",
        "expected": "cour supreme||la cour supreme"
      },
      {
        "label": "Question 4 — L'existence d'une troisième instance sur les faits",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Ce que contrôle la juridiction suivante",
        "stdin": "q:5",
        "expected": "le droit||droit||seul le droit"
      },
      {
        "label": "Question 6 — L'utilité du double degré",
        "stdin": "q:6",
        "expected": "rattraper les erreurs||le rattrapage des erreurs||rattrapage des erreurs||rattraper les erreurs des premiers juges"
      }
    ],
    "solution": "[Question 1 — La juridiction du premier degré]\ntpi de lome\n\n[Question 2 — Le rôle de la Cour d'Appel]\nreexaminer le litige\n\n[Question 3 — La juridiction de l'étape suivante]\ncour supreme\n\n[Question 4 — L'existence d'une troisième instance sur les faits]\nnon\n\n[Question 5 — Ce que contrôle la juridiction suivante]\nle droit\n\n[Question 6 — L'utilité du double degré]\nrattraper les erreurs",
    "takeaway": "1) Le litige a été jugé en premier degré par le TPI de Lomé, juridiction de droit commun du premier degré (décision du 15 mars 2024).\n2) La Cour d'Appel de Lomé, deuxième degré, a réexaminé le litige : elle a rediscuté le fond et réduit la condamnation de 1 200 000 FCFA à 800 000 FCFA — elle ne fait pas que vérifier la forme.\n3) La seule juridiction compétente pour l'étape suivante est la Cour Suprême, juge suprême (civil, pénal, administratif), saisie par la voie du pourvoi en cassation.\n4) Non : le double degré donne deux regards sur l'affaire, pas un rejugement sans fin ; aucune juridiction n'existe pour « rejuger les faits une troisième fois ».\n5) Devant la Cour Suprême, les faits ne sont pas réexaminés : seul le droit est vérifié — elle contrôle la conformité au droit des décisions rendues en dernier ressort.\n6) Le double degré de juridiction est le rattrapage des erreurs éventuelles des premiers juges : un second examen du litige, gage de bonne justice.\nConclusion sur les parties : Woyo Transport peut seulement se pourvoir en cassation sur une question de droit ; M. Tetteh peut faire exécuter la décision de la Cour d'Appel (800 000 FCFA) par les voies légales."
  },
  {
    "id": "dr-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La bailleuse d'Atakpamé et la justice privée",
    "exampleTitle": "Exemple résolu — le voisin clôturier de Dapaong",
    "goal": "Appliquer la maxime « nul ne peut se faire justice » et les garanties de l'organisation judiciaire à un fait divers.",
    "brief": "<p><strong>Énoncé.</strong> Le samedi 8 février 2025, à Atakpamé, M. Tetteh Kpodé doit trois mois de loyer, soit 150 000 FCFA, à sa bailleuse, Mme Ama Tchandi. Excédée, Mme Tchandi décide de « se rendre justice elle-même » : avec deux neveux, elle force le cadenas de l'appartement, emporte le téléviseur et le réfrigérateur du locataire, et annonce les conserver « jusqu'au paiement intégral ». M. Kpodé saisit la police, puis le tribunal. Le soir même, à la réunion du comité de quartier, un ancien propose : « dorénavant, nous réglerons nos différends entre nous : le comité jugera et ses décisions s'imposeront à tous ».</p><ol><li>Quelle maxime du cours Mme Tchandi a-t-elle violée ? (la formule du cours)</li><li>À qui appartient la fonction de juger ? (un mot)</li><li>Le comité de quartier peut-il légalement juger les différends et imposer ses décisions aux habitants ? (oui/non)</li><li>Comment appelle-t-on la garantie qui interdit de déplacer ou de suspendre arbitrairement un juge ? (un mot)</li><li>Quel organe veille à l'indépendance de la magistrature ? (réponse courte)</li><li>Le principe « le pouvoir arrête le pouvoir » (Montesquieu) porte quel nom ? (réponse courte)</li></ol>",
    "starter": "# Exercice — La bailleuse d'Atakpamé et la justice privée\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — La maxime violée]\nA_COMPLETER\n\n[Question 2 — Le titulaire de la fonction de juger]\nA_COMPLETER\n\n[Question 3 — Le pouvoir du comité de quartier]\nA_COMPLETER\n\n[Question 4 — La garantie des juges contre l'arbitraire]\nA_COMPLETER\n\n[Question 5 — L'organe gardien de l'indépendance]\nA_COMPLETER\n\n[Question 6 — Le nom du principe de Montesquieu]\nA_COMPLETER\n",
    "hints": [
      "Juger est une fonction étatique exercée par un service public : la justice — le particulier ne peut pas se rendre justice lui-même.",
      "Les trois principes de l'organisation judiciaire : séparation des pouvoirs, égalité de tous devant la loi, double degré de juridiction.",
      "L'indépendance des juges est protégée par leur inamovibilité et par l'organe qui veille à cette indépendance."
    ],
    "examples": [
      {
        "stdin": "À Dapaong, un voisin, furieux qu'un mur empiète sur son terrain, le démolit lui-même une nuit, sans aucune décision de justice.\n\n1) Maxime violée : nul ne peut se faire justice.\n2) La fonction de juger appartient à l'État.\n3) La victime doit saisir le tribunal : toute exécution privée est interdite.\n4) L'indépendance du juge est garantie par son inamovibilité, veillée par le Conseil Supérieur de la Magistrature.",
        "expected": "nul ne peut se faire justice — juger appartient a l'etat — interdiction de la justice privee — inamovibilite, conseil superieur de la magistrature",
        "note": "La seule riposte admise sans juge est la légitime défense, strictement encadrée ; tout le reste passe par le tribunal."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La maxime violée",
        "stdin": "q:1",
        "expected": "nul ne peut se faire justice||nul ne peut se faire justice a soi-meme||nul ne peut se rendre justice a soi-meme"
      },
      {
        "label": "Question 2 — Le titulaire de la fonction de juger",
        "stdin": "q:2",
        "expected": "etat||l'etat||l etat"
      },
      {
        "label": "Question 3 — Le pouvoir du comité de quartier",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — La garantie des juges contre l'arbitraire",
        "stdin": "q:4",
        "expected": "inamovibilite||l'inamovibilite||l inamovibilite"
      },
      {
        "label": "Question 5 — L'organe gardien de l'indépendance",
        "stdin": "q:5",
        "expected": "conseil superieur de la magistrature||csm||le conseil superieur de la magistrature"
      },
      {
        "label": "Question 6 — Le nom du principe de Montesquieu",
        "stdin": "q:6",
        "expected": "separation des pouvoirs||la separation des pouvoirs"
      }
    ],
    "solution": "[Question 1 — La maxime violée]\nnul ne peut se faire justice\n\n[Question 2 — Le titulaire de la fonction de juger]\netat\n\n[Question 3 — Le pouvoir du comité de quartier]\nnon\n\n[Question 4 — La garantie des juges contre l'arbitraire]\ninamovibilite\n\n[Question 5 — L'organe gardien de l'indépendance]\nconseil superieur de la magistrature\n\n[Question 6 — Le nom du principe de Montesquieu]\nseparation des pouvoirs",
    "takeaway": "1) En forçant le cadenas et en saisissant les biens de son locataire pour se payer elle-même, Mme Tchandi a violé la maxime « nul ne peut se faire justice » : la fonction de juger appartient à l'État, qui l'exerce par un service public.\n2) La fonction de juger appartient à l'État : le créancier doit saisir le juge et faire exécuter sa décision par les voies légales, pas se payer de sa propre main.\n3) Non : le comité de quartier n'a pas le pouvoir de juger ni d'imposer ses décisions — toute justice privée est interdite ; il peut tout au plus tenter une médiation, sans contrainte.\n4) La garantie est l'inamovibilité des juges : ils ne peuvent être déplacés ou suspendus arbitrairement — une protection contre la pression de l'exécutif, pas un privilège.\n5) Le Conseil Supérieur de la Magistrature veille à l'indépendance du pouvoir judiciaire.\n6) « Le pouvoir arrête le pouvoir » résume la séparation des pouvoirs (Montesquieu) : législatif, exécutif et judiciaire indépendants, chaque pouvoir limitant les autres.\nConclusion : Mme Tchandi devra restituer les biens saisis et répondre de la voie de fait devant le tribunal ; M. Kpodé reste redevable des 150 000 FCFA de loyers impayés, mais le recouvrement passe par le juge."
  },
  {
    "id": "dr-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le rôle d'audience du TPI de Lomé",
    "exampleTitle": "Exemple résolu — le rôle d'audience du TPI de Kara",
    "goal": "Distinguer personnes physiques et personnes morales, et classer ces dernières entre droit public et droit privé.",
    "brief": "<p><strong>Énoncé.</strong> Le lundi 17 mai 2025, le greffier du TPI de Lomé dresse la liste des parties inscrites au rôle de la semaine pour le rapport d'audience :</p><table><tr><th>N°</th><th>Partie inscrite au rôle</th></tr><tr><th>1</th><td>M. Kossi Agbéko, commerçant au marché d'Adawlato, agissant en son nom personnel.</td></tr><tr><th>2</th><td>La société Sotratex SARL, immatriculée au registre du commerce et du crédit mobilier.</td></tr><tr><th>3</th><td>La commune de Lomé, représentée par son maire.</td></tr><tr><th>4</th><td>L'association des commerçantes de tissus d'Adawlato, déclarée à la préfecture du Golfe.</td></tr><tr><th>5</th><td>L'Université de Lomé, établissement public d'enseignement supérieur.</td></tr></table><p>Pour les questions 2 à 4, répondez par <code>droit public</code> ou <code>droit prive</code>.</p><ol><li>La partie 1 est-elle une personne physique ou une personne morale ?</li><li>La partie 3 est une personne morale : de droit public ou de droit privé ?</li><li>La partie 4 est une personne morale : de droit public ou de droit privé ?</li><li>La partie 5 est une personne morale : de droit public ou de droit privé ?</li><li>Combien de personnes morales figurent dans la liste ? (un nombre en chiffres)</li></ol>",
    "starter": "# Exercice — Le rôle d'audience du TPI de Lomé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 4 : repondez par droit public ou droit prive.\n\n[Question 1 — Nature de la partie 1]\nA_COMPLETER\n\n[Question 2 — La personne morale partie 3]\nA_COMPLETER\n\n[Question 3 — La personne morale partie 4]\nA_COMPLETER\n\n[Question 4 — La personne morale partie 5]\nA_COMPLETER\n\n[Question 5 — Nombre de personnes morales]\nA_COMPLETER\n",
    "hints": [
      "Toute personne morale est un groupement reconnu par le droit : de droit public (collectivités publiques, établissements publics) ou de droit privé (sociétés, associations, fondations).",
      "L'État, une commune, une université publique relèvent du droit public ; une société commerciale ou une association relève du droit privé, même si elle est déclarée en préfecture.",
      "Comptez ensuite les groupements de la liste : l'être humain qui agit en son nom n'en fait pas partie."
    ],
    "examples": [
      {
        "stdin": "Au TPI de Kara, le rôle de la semaine compte quatre parties : un agriculteur agissant en son nom, une mutuelle d'épargne déclarée, le ministère de la Santé, une fondation d'aide à l'enfance.\n\n1) L'agriculteur : personne physique.\n2) La mutuelle : personne morale de droit privé.\n3) Le ministère : personne morale de droit public.\n4) La fondation : personne morale de droit privé.\nTotal des personnes morales : 3.",
        "expected": "agriculteur : physique — mutuelle : prive — ministere : public — fondation : prive — 3 morales",
        "note": "Le patrimoine de la personne morale est propre et distinct de celui de ses membres : elle contracte et plaide en son nom."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nature de la partie 1",
        "stdin": "q:1",
        "expected": "personne physique||physique||une personne physique"
      },
      {
        "label": "Question 2 — La personne morale partie 3",
        "stdin": "q:2",
        "expected": "droit public||de droit public||public||personne morale de droit public"
      },
      {
        "label": "Question 3 — La personne morale partie 4",
        "stdin": "q:3",
        "expected": "droit prive||de droit prive||prive||personne morale de droit prive"
      },
      {
        "label": "Question 4 — La personne morale partie 5",
        "stdin": "q:4",
        "expected": "droit public||de droit public||public||personne morale de droit public"
      },
      {
        "label": "Question 5 — Nombre de personnes morales",
        "stdin": "q:5",
        "expected": "4||quatre"
      }
    ],
    "solution": "[Question 1 — Nature de la partie 1]\npersonne physique\n\n[Question 2 — La personne morale partie 3]\ndroit public\n\n[Question 3 — La personne morale partie 4]\ndroit prive\n\n[Question 4 — La personne morale partie 5]\ndroit public\n\n[Question 5 — Nombre de personnes morales]\n4",
    "takeaway": "1) La partie 1, M. Kossi Agbéko, est un être humain agissant en son nom personnel : une personne physique.\n2) La partie 3, la commune de Lomé, est une collectivité publique : personne morale de droit public.\n3) La partie 4, l'association des commerçantes, est un groupement à caractère désintéressé : personne morale de droit privé.\n4) La partie 5, l'Université de Lomé, est un établissement public : personne morale de droit public.\n5) Les parties 2, 3, 4 et 5 sont des groupements reconnus par le droit : 4 personnes morales (une seule personne physique, la partie 1).\nContrôle : 1 personne physique + 4 personnes morales = 5 parties inscrites au rôle. La société Sotratex SARL (partie 2) est une personne morale de droit privé ; elle possède son propre patrimoine, distinct de celui de ses membres : c'est elle qui contracte et plaide en son nom."
  },
  {
    "id": "dr-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le livre de famille des Ayélé d'Aného",
    "exampleTitle": "Exemple résolu — le livre de famille de Kpalimé",
    "goal": "Qualifier naissance, décès, absence et disparition, et dater le début et la fin de la personnalité juridique.",
    "brief": "<p><strong>Énoncé.</strong> La famille Ayélé, pêcheurs à Aného, tient son livre de famille à jour. En juillet 2025, le notaire chargé de régler la succession du patriarche dresse la situation de la famille :</p><table><tr><th>Événement</th><th>Faits</th></tr><tr><th>1</th><td>Le 3 mars 2025 naît à la maternité d'Aného un garçon, vivant et viable.</td></tr><tr><th>2</th><td>Le patriarche, M. Fousséni Ayélé, 78 ans, décède à l'hôpital d'Aného le 10 avril 2025.</td></tr><tr><th>3</th><td>Le cousin Kodjo est parti travailler au Nigeria en 2019 ; depuis six ans, plus aucune nouvelle de lui.</td></tr><tr><th>4</th><td>L'oncle Yaovi a disparu en mer lors du naufrage de sa pirogue le 7 juin 2025 ; son corps n'a jamais été retrouvé.</td></tr></table><p>Répondez aux dates au format JJ/MM/AAAA (par exemple 15/03/2024).</p><ol><li>À quelle date la personnalité juridique du nouveau-né a-t-elle commencé ?</li><li>À quelle date la personnalité juridique du patriarche a-t-elle pris fin ?</li><li>Comment se nomme la situation du cousin Kodjo ? (un mot)</li><li>Comment se nomme la situation de l'oncle Yaovi ? (un mot)</li><li>Combien d'années sans nouvelles le droit exige-t-il pour retenir l'absence ? (un nombre)</li></ol>",
    "starter": "# Exercice — Le livre de famille des Ayélé d'Aného\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Dates au format JJ/MM/AAAA (par exemple 15/03/2024).\n\n[Question 1 — Début de la personnalité du nouveau-né]\nA_COMPLETER\n\n[Question 2 — Fin de la personnalité du patriarche]\nA_COMPLETER\n\n[Question 3 — La situation du cousin Kodjo]\nA_COMPLETER\n\n[Question 4 — La situation de l'oncle Yaovi]\nA_COMPLETER\n\n[Question 5 — Le délai exigé pour l'absence]\nA_COMPLETER\n",
    "hints": [
      "La personnalité juridique de la personne physique s'acquiert à la naissance (vivante et viable) et se perd au décès.",
      "Absence : la personne a quitté son domicile et reste sans nouvelles pendant un long délai, sans certitude de décès. Disparition : le corps est introuvable mais le décès est probable au regard des circonstances (naufrage, crash).",
      "Pour la question 5, le délai exigé par le cours est plus court que les six ans écoulés depuis le départ de Kodjo : relisez la définition de l'absence."
    ],
    "examples": [
      {
        "stdin": "À Kpalimé, le livre de famille note : une fille née vivante et viable le 12 juillet 2024 ; un grand-père décédé le 3 janvier 2025 ; un oncle parti au Bénin sans donner de nouvelles depuis exactement cinq ans ; un cousin disparu dans le crash d'un avion, corps introuvable.\n\n1) Naissance vivante et viable : personnalité le 12/07/2024.\n2) Décès : fin de la personnalité le 03/01/2025.\n3) L'oncle sans nouvelles depuis cinq ans : absence.\n4) Le corps du cousin introuvable après un crash : disparition (décès probable).\n5) Délai d'absence : cinq ans.",
        "expected": "12/07/2024 — 03/01/2025 — absence — disparition — 5 ans",
        "note": "Absence = attente sans certitude de décès ; disparition = circonstances accidentelles rendant le décès probable."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Début de la personnalité du nouveau-né",
        "stdin": "q:1",
        "expected": "03/03/2025||3/3/2025||03/03||3 mars 2025"
      },
      {
        "label": "Question 2 — Fin de la personnalité du patriarche",
        "stdin": "q:2",
        "expected": "10/04/2025||10/4/2025||10/04||10 avril 2025"
      },
      {
        "label": "Question 3 — La situation du cousin Kodjo",
        "stdin": "q:3",
        "expected": "absence||l'absence||l absence"
      },
      {
        "label": "Question 4 — La situation de l'oncle Yaovi",
        "stdin": "q:4",
        "expected": "disparition||la disparition"
      },
      {
        "label": "Question 5 — Le délai exigé pour l'absence",
        "stdin": "q:5",
        "expected": "5||cinq||5 ans||cinq ans"
      }
    ],
    "solution": "[Question 1 — Début de la personnalité du nouveau-né]\n03/03/2025\n\n[Question 2 — Fin de la personnalité du patriarche]\n10/04/2025\n\n[Question 3 — La situation du cousin Kodjo]\nabsence\n\n[Question 4 — La situation de l'oncle Yaovi]\ndisparition\n\n[Question 5 — Le délai exigé pour l'absence]\n5",
    "takeaway": "1) Le garçon est né vivant et viable le 3 mars 2025 : sa personnalité juridique a commencé à la naissance, le 03/03/2025.\n2) La personnalité juridique du patriarche s'est éteinte à son décès, le 10/04/2025.\n3) Kodjo a quitté son domicile et reste sans nouvelles depuis six ans, sans certitude de décès : c'est une absence (situation d'attente).\n4) Yaovi a disparu en mer lors d'un naufrage et son corps est introuvable : le décès est probable au regard des circonstances : c'est une disparition (présomption de décès).\n5) Le droit exige cinq ans sans nouvelles pour retenir l'absence : les six ans écoulés depuis le départ de Kodjo (2019-2025) suffisent donc largement.\nContrôle : la personnalité du nouveau-né commence à sa naissance (03/03/2025) ; celle du patriarche s'achève à son décès (10/04/2025) ; l'absence (sans nouvelles, 5 ans) se distingue de la disparition (décès probable, corps introuvable) par la certitude du décès."
  },
  {
    "id": "dr-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La succession de Kwami Tchalim",
    "exampleTitle": "Exemple résolu — la succession de Mme Sika de Sokodé",
    "goal": "Appliquer l'exception de l'enfant simplement conçu à une succession et calculer les parts des héritiers.",
    "brief": "<p><strong>Énoncé.</strong> M. Kwami Tchalim, 45 ans, commerçant à Kara, décède le 20 janvier 2025 dans un accident sur la route Lomé–Kara. Il laisse une maison évaluée à 11 000 000 FCFA et une épargne de 7 000 000 FCFA, soit un actif successoral de 18 000 000 FCFA. De son vivant, il avait deux enfants adultes : Awa (26 ans) et Batcho (23 ans) ; sa veuve était enceinte de cinq mois, l'enfant ayant été conçu en août 2024. En février 2025, Awa et Batcho partagent l'actif entre eux deux, à raison de 9 000 000 FCFA chacun. Le 15 mai 2025, la veuve accouche d'un garçon, vivant et viable ; elle réclame sa part au nom de l'enfant.</p><p>Répondez à la date au format JJ/MM/AAAA (par exemple 15/03/2024), et au montant en FCFA sans espace (par exemple 2500000).</p><ol><li>À quelle date l'enfant a-t-il acquis la personnalité juridique ?</li><li>Pour recueillir la succession de son père, à quel moment la personnalité de l'enfant est-elle réputée avoir commencé ? (un mot)</li><li>L'enfant pouvait-il recueillir la succession ouverte le 20 janvier 2025 ? (oui/non)</li><li>Le partage de février 2025, conclu sans compter l'enfant, doit-il être repris ? (oui/non)</li><li>L'actif de 18 000 000 FCFA étant réparti en trois parts égales entre les trois enfants, quel est le montant d'une part, en FCFA ?</li></ol>",
    "starter": "# Exercice — La succession de Kwami Tchalim\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Date au format JJ/MM/AAAA ; montant en FCFA sans espace (par exemple 2500000).\n\n[Question 1 — L'acquisition de la personnalité juridique]\nA_COMPLETER\n\n[Question 2 — Le point de départ retenu pour la succession]\nA_COMPLETER\n\n[Question 3 — La capacité de l'enfant à recueillir la succession]\nA_COMPLETER\n\n[Question 4 — Le sort du partage de février 2025]\nA_COMPLETER\n\n[Question 5 — Le montant d'une part]\nA_COMPLETER\n",
    "hints": [
      "Principe : la personnalité s'acquiert à la naissance vivante et viable. Exception : dans l'intérêt de l'enfant, elle remonte à la date présumée de la conception.",
      "L'enfant avait été conçu en août 2024, avant le décès de son père (20 janvier 2025) : l'exception joue pour lui permettre de recueillir la succession.",
      "Pour la part : divisez l'actif successoral par le nombre d'enfants qui devaient être comptés dès l'ouverture de la succession, puis vérifiez que trois parts reconstituent l'actif."
    ],
    "examples": [
      {
        "stdin": "Mme Sika de Sokodé décède le 4 avril 2025 en laissant un actif de 12 000 000 FCFA, deux enfants adultes et une fille née vivante et viable le 10 juin 2025, conçue en janvier 2025.\n\n1) La fille acquiert la personnalité à sa naissance : le 10/06/2025.\n2) Pour la succession, sa personnalité remonte à sa conception (janvier 2025).\n3) Elle recueille la succession ouverte le 4 avril 2025.\n4) Le partage doit être repris en comptant trois enfants.\n5) Une part : 12 000 000 / 3 = 4 000 000 FCFA.",
        "expected": "10/06/2025 — la conception — oui — oui — 4000000 fcfa",
        "note": "L'exception de l'enfant simplement conçu ne joue que dans son intérêt, et seulement s'il naît vivant et viable."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — L'acquisition de la personnalité juridique",
        "stdin": "q:1",
        "expected": "15/05/2025||15/5/2025||15/05||15 mai 2025"
      },
      {
        "label": "Question 2 — Le point de départ retenu pour la succession",
        "stdin": "q:2",
        "expected": "conception||la conception||sa conception||a la conception||a sa conception"
      },
      {
        "label": "Question 3 — La capacité de l'enfant à recueillir la succession",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Le sort du partage de février 2025",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Le montant d'une part",
        "stdin": "q:5",
        "expected": "6000000||6 000 000||6.000.000||6000000 fcfa||6 000 000 fcfa"
      }
    ],
    "solution": "[Question 1 — L'acquisition de la personnalité juridique]\n15/05/2025\n\n[Question 2 — Le point de départ retenu pour la succession]\nconception\n\n[Question 3 — La capacité de l'enfant à recueillir la succession]\noui\n\n[Question 4 — Le sort du partage de février 2025]\noui\n\n[Question 5 — Le montant d'une part]\n6000000",
    "takeaway": "1) L'enfant a acquis la personnalité juridique à sa naissance, vivante et viable, le 15/05/2025.\n2) Pour recueillir la succession de son père décédé avant sa naissance, sa personnalité est réputée remonter à sa conception (août 2024) : l'exception de l'enfant simplement conçu joue dans son intérêt.\n3) Oui : conçu au moment de l'ouverture de la succession (20 janvier 2025) et né vivant et viable, l'enfant devait être compté parmi les héritiers — il recueille la succession de son père.\n4) Oui : le partage de février 2025, arrêté entre les seuls Awa et Batcho, a écarté un héritier ; il doit être repris en comptant les trois enfants.\n5) Une part : 18 000 000 / 3 = 6 000 000 FCFA. Contrôle : 3 x 6 000 000 = 18 000 000 FCFA, on retrouve l'actif successoral (11 000 000 + 7 000 000).\nRemarque : si l'enfant était né sans vie, il n'aurait jamais eu la personnalité juridique — l'exception ne joue que dans l'intérêt d'un enfant né vivant et viable. La veuve agit au nom de l'enfant ; Awa et Batcho, qui ont reçu chacun 9 000 000 FCFA, doivent restituer le trop-perçu."
  },
  {
    "id": "dr-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "La loi des registres du commerce",
    "exampleTitle": "Exemple résolu — la loi sur les taxis de Lomé",
    "goal": "Calculer l'entrée en vigueur d'une loi à partir de sa publication au Journal officiel et du jour franc.",
    "brief": "<p><strong>Énoncé.</strong> La loi « portant modernisation des registres du commerce » est adoptée par l'Assemblée nationale le 5 mai 2025, promulguée par le Président de la République le 15 mai 2025, puis publiée au Journal officiel de la République togolaise le jeudi 22 mai 2025. Le tableau du dossier législatif reste incomplet :</p><table><tr><th>Étape</th><th>Date</th></tr><tr><th>Adoption par l'Assemblée nationale</th><td>05/05/2025</td></tr><tr><th>Promulgation par le Président de la République</th><td>15/05/2025</td></tr><tr><th>Parution au Journal officiel</th><td>22/05/2025</td></tr><tr><th>Jour franc</th><td>à déterminer</td></tr><tr><th>Entrée en vigueur</th><td>à déterminer</td></tr></table><p>Rappel du cours : la loi n'entre en vigueur qu'après le jour franc, un délai de vingt-quatre heures suivant la parution. Répondez aux dates au format JJ/MM/AAAA (par exemple 15/03/2024).</p><ol><li>De quel événement le délai du jour franc commence-t-il à courir : le vote, la promulgation, ou la parution au Journal officiel ? (réponse courte)</li><li>Combien d'heures compte le jour franc ? (un nombre)</li><li>À quelle date tombe le jour franc de cette loi ?</li><li>À quelle date la loi entre-t-elle en vigueur ?</li><li>Le 26 mai 2025, une commerçante d'Adawlato conteste la loi nouvelle en invoquant son ignorance : son argument est-il recevable ? (oui/non)</li></ol>",
    "starter": "# Exercice — La loi des registres du commerce\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Dates au format JJ/MM/AAAA (par exemple 15/03/2024).\n\n[Question 1 — Le point de départ du jour franc]\nA_COMPLETER\n\n[Question 2 — Durée du jour franc]\nA_COMPLETER\n\n[Question 3 — Date du jour franc]\nA_COMPLETER\n\n[Question 4 — Date d'entrée en vigueur]\nA_COMPLETER\n\n[Question 5 — Recevabilité de l'ignorance de la loi]\nA_COMPLETER\n",
    "hints": [
      "Le jour franc court à partir de la parution au Journal officiel — ni à partir du vote, ni à partir de la promulgation.",
      "Le jour franc est un délai de vingt-quatre heures : il s'écoule le jour suivant la parution.",
      "La loi entre en vigueur le lendemain du jour franc ; passé ce délai, nul n'est censé ignorer la loi."
    ],
    "examples": [
      {
        "stdin": "La loi sur les taxis de Lomé est publiée au Journal officiel le mardi 10 juin 2026.\n\n1) Le délai du jour franc court à partir de la parution au Journal officiel.\n2) Le jour franc compte 24 heures.\n3) Jour franc : le 11/06/2026.\n4) Entrée en vigueur : le 12/06/2026.\n5) Après le 12/06/2026, aucun chauffeur ne peut invoquer son ignorance de la loi.",
        "expected": "parution — 24 heures — jour franc le 11/06/2026 — en vigueur le 12/06/2026",
        "note": "Parution le 10, jour franc le 11 (vingt-quatre heures), entrée en vigueur le 12 : trois dates à poser dans cet ordre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le point de départ du jour franc",
        "stdin": "q:1",
        "expected": "la parution||parution||la publication||publication||la parution au journal officiel||parution au journal officiel"
      },
      {
        "label": "Question 2 — Durée du jour franc",
        "stdin": "q:2",
        "expected": "24||24 heures||24 h||vingt-quatre||vingt quatre"
      },
      {
        "label": "Question 3 — Date du jour franc",
        "stdin": "q:3",
        "expected": "23/05/2025||23/5/2025||23/05||23 mai 2025"
      },
      {
        "label": "Question 4 — Date d'entrée en vigueur",
        "stdin": "q:4",
        "expected": "24/05/2025||24/5/2025||24/05||24 mai 2025"
      },
      {
        "label": "Question 5 — Recevabilité de l'ignorance de la loi",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Le point de départ du jour franc]\nla parution\n\n[Question 2 — Durée du jour franc]\n24\n\n[Question 3 — Date du jour franc]\n23/05/2025\n\n[Question 4 — Date d'entrée en vigueur]\n24/05/2025\n\n[Question 5 — Recevabilité de l'ignorance de la loi]\nnon",
    "takeaway": "1) Le délai du jour franc court à partir de la parution au Journal officiel : ni le vote (05/05/2025), ni la promulgation (15/05/2025) ne le déclenchent.\n2) Le jour franc est un délai de vingt-quatre heures : 24 heures après la parution.\n3) La loi est parue le jeudi 22/05/2025 : le jour franc s'écoule le vendredi 23/05/2025.\n4) La loi entre en vigueur le lendemain du jour franc, soit le samedi 24/05/2025.\n5) Non : après l'écoulement du jour franc, « nul n'est censé ignorer la loi » — la commerçante du 26 mai ne peut pas invoquer son ignorance pour contester une loi déjà entrée en vigueur.\nContrôle : parution 22/05 → jour franc 23/05 → entrée en vigueur 24/05 : trois dates successives, conformes à la chronologie adoption → promulgation → publication → jour franc."
  },
  {
    "id": "dr-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le plafonnement des loyers d'entrepôt à Tsévié",
    "exampleTitle": "Exemple résolu — le plafonnement des loyers d'Aného",
    "goal": "Qualifier des situations dans le temps (éteinte, en cours, née après) et appliquer la non-rétroactivité et l'effet immédiat de la loi nouvelle.",
    "brief": "<p><strong>Énoncé.</strong> Depuis le 1er avril 2022, Mme Sika Alipo loue un entrepôt à Tsévié à la société AgroSud SARL, moyennant 350 000 FCFA par mois, par bail écrit courant jusqu'au 31 mars 2027. Une loi sur les baux commerciaux est adoptée le 15 octobre 2024, promulguée le 1er décembre 2024, puis publiée au Journal officiel le vendredi 6 décembre 2024 ; elle plafonne à 300 000 FCFA le loyer mensuel des entrepôts et n'aborde rien d'autre. État du dossier au 15 décembre 2024 :</p><table><tr><th>Situation</th><th>Détail</th></tr><tr><th>Loyers d'avril 2022 à novembre 2024</th><td>tous payés et quittancés (dernière quittance : 30/11/2024).</td></tr><tr><th>Loyer de décembre 2024</th><td>exigible le 5 décembre, encore impayé le 15 décembre.</td></tr><tr><th>Loyers de janvier 2025 à mars 2027</th><td>à échoir.</td></tr><tr><th>Litige sur les charges d'entretien</th><td>né en 2023, jugé définitivement en dernier ressort le 10 mai 2024.</td></tr></table><p>Répondez à la date au format JJ/MM/AAAA (par exemple 15/03/2024), et au montant en FCFA sans espace (par exemple 250000).</p><ol><li>À quelle date la loi nouvelle est-elle entrée en vigueur ?</li><li>Les loyers payés jusqu'en novembre 2024 sont des situations éteintes, en cours, ou nées après l'entrée en vigueur ? (réponse courte)</li><li>Le loyer de décembre 2024, exigible et impayé, est une situation éteinte, en cours, ou née après ? (réponse courte)</li><li>Quel loyer mensuel maximum AgroSud peut-elle être tenue de payer à partir de janvier 2025, en FCFA ?</li><li>Le litige des charges jugé le 10 mai 2024 peut-il être rouvert par la loi nouvelle ? (oui/non)</li><li>AgroSud peut-elle exiger le remboursement du « trop-perçu » des loyers d'avant décembre 2024 ? (oui/non)</li></ol>",
    "starter": "# Exercice — Le plafonnement des loyers d'entrepôt à Tsévié\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Date au format JJ/MM/AAAA ; montant en FCFA sans espace (par exemple 250000).\n\n[Question 1 — Date d'entrée en vigueur de la loi nouvelle]\nA_COMPLETER\n\n[Question 2 — Nature des loyers payés jusqu'en novembre 2024]\nA_COMPLETER\n\n[Question 3 — Nature du loyer de décembre 2024]\nA_COMPLETER\n\n[Question 4 — Le loyer plafonné à partir de janvier 2025]\nA_COMPLETER\n\n[Question 5 — Réouverture possible du litige de charges]\nA_COMPLETER\n\n[Question 6 — Remboursement du trop-perçu antérieur]\nA_COMPLETER\n",
    "hints": [
      "Datez d'abord l'entrée en vigueur : parution au Journal officiel (06/12/2024), jour franc de vingt-quatre heures, puis vigueur le lendemain.",
      "Classez ensuite chaque situation : éteinte avant l'entrée en vigueur, en cours à cette date, ou née après.",
      "Une situation éteinte reste sous la loi ancienne (non-rétroactivité) ; une situation en cours ou nouvelle passe sous la loi nouvelle (effet immédiat) : « la loi ne dispose que pour l'avenir » (article 2 du code civil)."
    ],
    "examples": [
      {
        "stdin": "À Aného, un bail de 200 000 FCFA par mois court de 2021 à 2026. Une loi plafonnant le loyer à 150 000 FCFA est publiée le 1er mars 2026 : jour franc le 2 mars, entrée en vigueur le 3 mars 2026. Au 10 mars 2026 : les loyers jusqu'à février 2026 sont payés et quittancés ; le loyer de mars 2026, exigible le 5, est impayé ; les loyers suivants sont à échoir.\n\n1) Loyers payés jusqu'en février : situations éteintes → loi ancienne, aucun remboursement.\n2) Loyer de mars 2026 impayé : situation en cours → loi nouvelle : 150 000 FCFA.\n3) Loyers suivants : situations nées après → loi nouvelle.",
        "expected": "en vigueur le 03/03/2026 — loyers payes : eteintes — loyer de mars : en cours — nouveau plafond : 150000 fcfa",
        "note": "Éteinte : loi ancienne ; en cours ou nouvelle : loi nouvelle — l'article 2 du code civil résume : la loi ne dispose que pour l'avenir."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Date d'entrée en vigueur de la loi nouvelle",
        "stdin": "q:1",
        "expected": "08/12/2024||8/12/2024||08/12||8 décembre 2024"
      },
      {
        "label": "Question 2 — Nature des loyers payés jusqu'en novembre 2024",
        "stdin": "q:2",
        "expected": "eteintes||eteinte||situations eteintes||situation eteinte||des situations eteintes"
      },
      {
        "label": "Question 3 — Nature du loyer de décembre 2024",
        "stdin": "q:3",
        "expected": "en cours||encours||situation en cours||une situation en cours"
      },
      {
        "label": "Question 4 — Le loyer plafonné à partir de janvier 2025",
        "stdin": "q:4",
        "expected": "300000||300 000||300.000||300000 fcfa||300 000 fcfa"
      },
      {
        "label": "Question 5 — Réouverture possible du litige de charges",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Remboursement du trop-perçu antérieur",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Date d'entrée en vigueur de la loi nouvelle]\n08/12/2024\n\n[Question 2 — Nature des loyers payés jusqu'en novembre 2024]\neteintes\n\n[Question 3 — Nature du loyer de décembre 2024]\nen cours\n\n[Question 4 — Le loyer plafonné à partir de janvier 2025]\n300000\n\n[Question 5 — Réouverture possible du litige de charges]\nnon\n\n[Question 6 — Remboursement du trop-perçu antérieur]\nnon",
    "takeaway": "1) La loi est publiée le vendredi 06/12/2024 : jour franc le 07/12/2024 (vingt-quatre heures), entrée en vigueur le 08/12/2024.\n2) Les loyers d'avril 2022 à novembre 2024 sont payés et quittancés : situations éteintes avant l'entrée en vigueur.\n3) Le loyer de décembre 2024, exigible le 5 et impayé au 15 décembre, n'a pas fini de produire ses effets : situation en cours à l'entrée en vigueur.\n4) Les loyers de janvier 2025 à mars 2027 sont des situations nées après l'entrée en vigueur : effet immédiat de la loi nouvelle, plafond de 300 000 FCFA.\n5) Non : le litige des charges, jugé définitivement en dernier ressort le 10 mai 2024, est une situation éteinte bien avant la loi nouvelle ; la rouvrir serait lui donner un effet rétroactif — la loi ne dispose que pour l'avenir (article 2 du code civil).\n6) Non : exiger le remboursement des 50 000 FCFA de « trop-perçu » mensuel d'avant décembre 2024 rendrait la loi rétroactive ; les loyers régulièrement payés restent acquis, sous la loi ancienne.\nContrôle : le loyer de décembre 2024 (situation en cours) passe sous la loi nouvelle : AgroSud ne peut être tenue que de 300 000 FCFA dès décembre 2024, comme pour tous les mois suivants."
  },
  {
    "id": "dr-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La réforme du transport urbain de Lomé",
    "exampleTitle": "Exemple résolu — la réforme des kiosques de Kara",
    "goal": "Reconnaître une abrogation expresse et une abrogation tacite, et délimiter leurs effets dans le temps.",
    "brief": "<p><strong>Énoncé.</strong> La loi n° 12 de 2016 régit le transport urbain à Lomé. Trois de ses articles s'appliquent aux taxis-motos :</p><ul><li>article 4 : « les taxis-motos doivent être de couleur jaune » ;</li><li>article 9 : « tout conducteur doit être âgé d'au moins 21 ans » ;</li><li>article 15 : « l'autorisation d'exercer est délivrée pour deux ans ».</li></ul><p>La loi n° 7 de 2025, portant réforme du transport, est publiée au Journal officiel le 10 janvier 2025. Elle contient :</p><ul><li>article 1er : « sont abrogées les dispositions de la loi n° 12 de 2016 relatives à la couleur des véhicules de transport » ;</li><li>article 3 : « l'autorisation d'exercer le transport urbain est délivrée pour cinq ans » — l'article 15 de la loi de 2016 n'est pas cité.</li></ul><p>Pour les questions 2 et 4, répondez strictement par <code>expresse</code> ou <code>tacite</code>.</p><ol><li>L'article 4 de la loi de 2016 est-il abrogé ? (oui/non)</li><li>Cette abrogation est-elle expresse ou tacite ?</li><li>L'article 15 de la loi de 2016 (autorisation de deux ans) est-il abrogé ? (oui/non)</li><li>Cette seconde abrogation est-elle expresse ou tacite ?</li><li>L'article 9 (âge minimum de 21 ans), ni visé ni contredit par la loi nouvelle, est-il abrogé ? (oui/non)</li><li>L'abrogation anéantit-elle les effets passés régulièrement produits, ou agit-elle seulement pour l'avenir ? (réponse courte)</li></ol>",
    "starter": "# Exercice — La réforme du transport urbain de Lomé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 4 : repondez strictement par expresse ou tacite.\n\n[Question 1 — Le sort de l'article 4]\nA_COMPLETER\n\n[Question 2 — La nature de la première abrogation]\nA_COMPLETER\n\n[Question 3 — Le sort de l'article 15]\nA_COMPLETER\n\n[Question 4 — La nature de la seconde abrogation]\nA_COMPLETER\n\n[Question 5 — Le sort de l'article 9]\nA_COMPLETER\n\n[Question 6 — La portée de l'abrogation dans le temps]\nA_COMPLETER\n",
    "hints": [
      "Abrogation expresse : le texte nouveau l'énonce (« sont abrogées les dispositions… »). Abrogation tacite : une disposition nouvelle incompatible avec l'ancienne suffit, sans la citer.",
      "Comparez l'article 3 de la loi de 2025 (cinq ans) et l'article 15 de la loi de 2016 (deux ans) : deux durées pour une même autorisation sont incompatibles.",
      "L'abrogation met fin à la force obligatoire de la loi pour l'avenir : les effets passés régulièrement produits restent acquis."
    ],
    "examples": [
      {
        "stdin": "La loi de 2014 sur les kiosques de Kara prévoit : ouverture à 7 heures (article 2) et taxe forfaitaire de 5 000 FCFA (article 6). La loi de 2027 contient : article 1er « sont abrogées les dispositions sur la taxe forfaitaire » ; article 4 « l'ouverture se fait à 6 heures » (sans citer l'article 2).\n\n1) La taxe de 5 000 FCFA : abrogée expressément (énoncée par le texte nouveau).\n2) L'ouverture à 7 heures : abrogée tacitement (incompatible avec 6 heures).\n3) Les taxes régulièrement payées avant 2027 restent acquises : l'abrogation vaut pour l'avenir.",
        "expected": "taxe : abrogation expresse — ouverture : abrogation tacite — effets passes acquis, abrogation pour l'avenir",
        "note": "Une incompatibilité silencieuse abroge autant qu'une déclaration : c'est l'abrogation tacite."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le sort de l'article 4",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — La nature de la première abrogation",
        "stdin": "q:2",
        "expected": "expresse||abrogation expresse||l'abrogation expresse||l abrogation expresse"
      },
      {
        "label": "Question 3 — Le sort de l'article 15",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — La nature de la seconde abrogation",
        "stdin": "q:4",
        "expected": "tacite||abrogation tacite||l'abrogation tacite||l abrogation tacite"
      },
      {
        "label": "Question 5 — Le sort de l'article 9",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — La portée de l'abrogation dans le temps",
        "stdin": "q:6",
        "expected": "pour l'avenir||pour l avenir||pour l'avenir||l'avenir||l avenir||avenir||seulement pour l'avenir||seulement pour l avenir||seulement l'avenir"
      }
    ],
    "solution": "[Question 1 — Le sort de l'article 4]\noui\n\n[Question 2 — La nature de la première abrogation]\nexpresse\n\n[Question 3 — Le sort de l'article 15]\noui\n\n[Question 4 — La nature de la seconde abrogation]\ntacite\n\n[Question 5 — Le sort de l'article 9]\nnon\n\n[Question 6 — La portée de l'abrogation dans le temps]\npour l'avenir",
    "takeaway": "1) Oui : l'article 1er de la loi de 2025 abroge expressément les dispositions de la loi de 2016 relatives à la couleur des véhicules — l'article 4 (couleur jaune) est abrogé.\n2) L'abrogation est expresse : le texte nouveau l'énonce noir sur blanc (« sont abrogées les dispositions… »).\n3) Oui : l'article 15 (autorisation de deux ans) est incompatible avec l'article 3 de la loi de 2025 (autorisation de cinq ans) : deux durées contraires pour une même autorisation ne peuvent coexister — l'article 15 est abrogé.\n4) L'abrogation est tacite (implicite) : la loi de 2025 ne cite pas l'article 15, mais sa disposition nouvelle lui est incompatible.\n5) Non : l'article 9 (âge minimum de 21 ans) n'est ni visé ni contredit par la loi nouvelle ; il conserve sa force obligatoire.\n6) L'abrogation met fin à la force obligatoire de la loi pour l'avenir : les effets passés régulièrement produits restent acquis — les autorisations valablement délivrées pour deux ans avant la réforme ont produit leurs effets ; seules les nouvelles demandent cinq ans.\nContrôle : sur trois articles, un est abrogé expressément (article 4), un tacitement (article 15), un survit (article 9) : les trois sorties possibles d'une réforme."
  },
  {
    "id": "dr-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le bail de Tokoin et le scooter de Gbémassi",
    "exampleTitle": "Exemple résolu — le bail de Kpalimé et la montre d'Awa",
    "goal": "Vérifier les quatre conditions de validité d'un contrat (capacité, consentement, objet, cause) sur deux cas togolais.",
    "brief": "<p><strong>Énoncé.</strong> Le 5 avril 2025, à Lomé, Mme Akouvi Dede, propriétaire d'une maison à Tokoin, conclut par écrit un bail avec M. Sename Kpodjé, salarié de 30 ans : loyer de 120 000 FCFA par mois, durée de deux ans, portant sur l'appartement de trois pièces désigné au titre foncier. Les deux parties sont majeures et saines d'esprit, elles consentent librement, l'objet est certain et licite, la cause aussi.</p><p>Le 12 avril 2025, ailleurs à Lomé, M. Gbémassi, lycéen de 16 ans, signe seul, sans ses parents, l'achat d'un scooter d'occasion de 800 000 FCFA ; son père, alerté, refuse de ratifier l'engagement.</p><ol><li>Citez, dans l'ordre du cours, les quatre conditions de validité du contrat (quatre mots séparés par des espaces).</li><li>Le bail du 5 avril 2025 est-il valablement formé ? (oui/non)</li><li>Quelle condition de validité manque dans l'achat du scooter par Gbémassi ? (un mot)</li><li>L'objet du contrat doit être certain et… ? (un mot)</li><li>Complétez la chaîne du cours : personnalité → capacité → … ? (un mot)</li></ol>",
    "starter": "# Exercice — Le bail de Tokoin et le scooter de Gbémassi\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : quatre mots dans l'ordre, séparés par des espaces.\n\n[Question 1 — Les quatre conditions de validité]\nA_COMPLETER\n\n[Question 2 — La validité du bail]\nA_COMPLETER\n\n[Question 3 — La condition manquante pour le scooter]\nA_COMPLETER\n\n[Question 4 — Le second caractère de l'objet]\nA_COMPLETER\n\n[Question 5 — Le maillon manquant de la chaîne]\nA_COMPLETER\n",
    "hints": [
      "Quatre conditions : capacité des parties, consentement libre et éclairé, objet certain et licite, cause licite — C-C-O-C.",
      "Un contrat est exposé à la nullité quand une condition manque : testez chaque case pour le bail, puis pour le scooter.",
      "Sans personnalité juridique, pas de capacité ; et sans capacité, pas de contrat valable : c'est la chaîne du cours."
    ],
    "examples": [
      {
        "stdin": "À Kpalimé, Mme Tchalim, 35 ans, loue par écrit une parcelle clôturée à un salarié majeur : loyer de 75 000 FCFA par mois, consentement libre, objet et cause licites. Le même mois, Awa, 15 ans, signe seule l'achat d'une montre de 90 000 FCFA, sans son tuteur.\n\n1) Le bail de Mme Tchalim : les quatre conditions sont réunies (capacité, consentement, objet, cause) : contrat valable.\n2) Awa, mineure : il manque la capacité ; son tuteur peut refuser de ratifier.\n3) Chaîne : personnalité → capacité → contrat.",
        "expected": "capacite — consentement — objet — cause ; bail valide ; montre : capacite manquante",
        "note": "Une seule condition manquante expose le contrat à la nullité : les quatre cases doivent être cochées avant de signer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Les quatre conditions de validité",
        "stdin": "q:1",
        "expected": "capacite consentement objet cause||capacite consentement objet et cause"
      },
      {
        "label": "Question 2 — La validité du bail",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — La condition manquante pour le scooter",
        "stdin": "q:3",
        "expected": "capacite||la capacite"
      },
      {
        "label": "Question 4 — Le second caractère de l'objet",
        "stdin": "q:4",
        "expected": "licite"
      },
      {
        "label": "Question 5 — Le maillon manquant de la chaîne",
        "stdin": "q:5",
        "expected": "contrat||le contrat"
      }
    ],
    "solution": "[Question 1 — Les quatre conditions de validité]\ncapacite consentement objet cause\n\n[Question 2 — La validité du bail]\noui\n\n[Question 3 — La condition manquante pour le scooter]\ncapacite\n\n[Question 4 — Le second caractère de l'objet]\nlicite\n\n[Question 5 — Le maillon manquant de la chaîne]\ncontrat",
    "takeaway": "1) Les quatre conditions de validité, dans l'ordre du cours : capacité, consentement, objet, cause (C-C-O-C).\n2) Oui : les parties sont majeures (capacité), consentent librement (consentement), le bail porte sur un appartement déterminé (objet certain et licite) et la jouissance du logement contre le loyer forme une cause licite : le bail est valablement formé.\n3) Gbémassi, 16 ans, mineur, a contracté seul sans son représentant légal, qui refuse de ratifier : c'est la capacité qui manque.\n4) L'objet du contrat doit être certain et licite.\n5) La chaîne du cours est : personnalité → capacité → contrat. Sans personnalité juridique pas de capacité (chapitre 4), et sans capacité pas de contrat valable : l'achat du scooter de Gbémassi est exposé à la nullité.\nContrôle : le bail coche les quatre cases du C-C-O-C ; l'achat du scooter n'en coche que trois (consentement, objet, cause) : une seule case manquante suffit à menacer le contrat."
  },
  {
    "id": "dr-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Trois signatures viciées à Kara",
    "exampleTitle": "Exemple résolu — trois signatures viciées à Dapaong",
    "goal": "Identifier l'erreur, le dol et la violence, et dire leur sanction : la nullité relative.",
    "brief": "<p><strong>Énoncé.</strong> Début 2025, trois ventes sont conclues à Kara :</p><table><tr><th>Vente</th><th>Faits</th></tr><tr><th>V1</th><td>Le 10 janvier, M. Bissi vend sa voiture d'occasion à M. Tetteh pour 2 500 000 FCFA en assurant que le compteur affiche 60 000 km ; il avait manipulé le compteur et le savait : le véhicule avait 190 000 km.</td></tr><tr><th>V2</th><td>Le 20 février, Mme Awa achète une parcelle en croyant acquérir un terrain constructible ; la parcelle est en zone inondable non constructible — un point que l'acheteuse ignorait et que le vendeur ignorait aussi.</td></tr><tr><th>V3</th><td>Le 5 mars, un créancier fait signer à M. Kodjo une reconnaissance de dette de 900 000 FCFA en le menaçant de le dénoncer à son employeur pour une faute qu'il a inventée.</td></tr></table><p>Pour les questions 1 à 3, répondez par un seul mot : <code>erreur</code>, <code>dol</code> ou <code>violence</code>.</p><ol><li>Quel est le vice du consentement dans la vente V1 ?</li><li>Quel est le vice du consentement dans la vente V2 ?</li><li>Quel est le vice du consentement dans la vente V3 ?</li><li>Quelle est la sanction de ces trois vices du consentement ? (réponse courte)</li><li>Qui peut agir en nullité : la victime du vice, ou n'importe laquelle des parties ? (réponse courte)</li><li>La lésion (déséquilibre excessif des prestations) annule-t-elle automatiquement le contrat ? (oui/non)</li></ol>",
    "starter": "# Exercice — Trois signatures viciées à Kara\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : repondez par un seul mot (erreur, dol ou violence).\n\n[Question 1 — Le vice du consentement dans V1]\nA_COMPLETER\n\n[Question 2 — Le vice du consentement dans V2]\nA_COMPLETER\n\n[Question 3 — Le vice du consentement dans V3]\nA_COMPLETER\n\n[Question 4 — La sanction des vices du consentement]\nA_COMPLETER\n\n[Question 5 — Le titulaire de l'action en nullité]\nA_COMPLETER\n\n[Question 6 — L'effet automatique de la lésion]\nA_COMPLETER\n",
    "hints": [
      "Trois vices : l'erreur (croyance fausse), le dol (manœuvres frauduleuses destinées à tromper), la violence (contrainte physique ou morale).",
      "Demandez-vous si l'auteur de la croyance fausse savait : le mensonge délibéré du vendeur change l'erreur en dol.",
      "La sanction des vices du consentement est relative : elle protège la victime, et seule elle peut agir."
    ],
    "examples": [
      {
        "stdin": "À Dapaong : un vendeur de motos cache que la sienne a été accidentée (il le sait) ; un acheteur croit acheter un champ de maïs alors que le terrain est une rizière (personne ne le savait) ; un débiteur signe sous la menace d'une dénonciation calomnieuse.\n\n1) Le vendeur qui cache l'accident : manœuvre frauduleuse : dol.\n2) L'acheteur trompé sans fraude de l'autre partie : croyance fausse : erreur.\n3) La signature sous menace : violence.\n4) Sanction : nullité relative ; seule la victime peut agir.",
        "expected": "dol — erreur — violence — nullite relative — la victime peut agir",
        "note": "Ce qui distingue le dol de l'erreur : la manœuvre ; la violence ajoute la contrainte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le vice du consentement dans V1",
        "stdin": "q:1",
        "expected": "dol||le dol"
      },
      {
        "label": "Question 2 — Le vice du consentement dans V2",
        "stdin": "q:2",
        "expected": "erreur||l'erreur||l erreur"
      },
      {
        "label": "Question 3 — Le vice du consentement dans V3",
        "stdin": "q:3",
        "expected": "violence||la violence"
      },
      {
        "label": "Question 4 — La sanction des vices du consentement",
        "stdin": "q:4",
        "expected": "nullite relative||la nullite relative"
      },
      {
        "label": "Question 5 — Le titulaire de l'action en nullité",
        "stdin": "q:5",
        "expected": "la victime||victime||seule la victime||la victime du vice"
      },
      {
        "label": "Question 6 — L'effet automatique de la lésion",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Le vice du consentement dans V1]\ndol\n\n[Question 2 — Le vice du consentement dans V2]\nerreur\n\n[Question 3 — Le vice du consentement dans V3]\nviolence\n\n[Question 4 — La sanction des vices du consentement]\nnullite relative\n\n[Question 5 — Le titulaire de l'action en nullité]\nla victime\n\n[Question 6 — L'effet automatique de la lésion]\nnon",
    "takeaway": "1) V1 : Bissi a menti sciemment sur le compteur (manipulation) pour obtenir le consentement : ce sont des manœuvres frauduleuses destinées à tromper : c'est un dol.\n2) V2 : Mme Awa s'est trompée sur la constructibilité de la parcelle, sans fraude de l'autre partie (le vendeur ignorait aussi) : c'est une erreur (croyance fausse).\n3) V3 : Kodjo a signé sous la menace d'une dénonciation calomnieuse à son employeur : c'est une violence (contrainte morale).\n4) Les trois vices du consentement (erreur, dol, violence) emportent la nullité relative.\n5) La nullité relative protège la victime : seule elle peut agir — le contrat est anéanti pour la protéger, pas au nom de l'ordre public.\n6) Non : la lésion (déséquilibre excessif des prestations) n'est sanctionnée que dans les cas prévus par la loi ; elle n'annule pas automatiquement le contrat.\nContrôle : V1 dol, V2 erreur, V3 violence : les trois vices du cours, tous sanctionnés par la même nullité relative."
  },
  {
    "id": "dr-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Mariage à Lomé, crues à Cinkassé, accident du Mono",
    "exampleTitle": "Exemple résolu — anniversaire à Kara, éboulement à Kpalimé, étal renversé à Atakpamé",
    "goal": "Qualifier la responsabilité contractuelle ou délictuelle, les recours de l'inexécution et la force majeure.",
    "brief": "<p><strong>Énoncé.</strong> Été 2025, trois litiges parviennent au cabinet de Maître Akouvi Sika :</p><table><tr><th>Litige</th><th>Faits</th></tr><tr><th>L1</th><td>La société Mabo Déco s'était engagée par contrat à livrer 300 chaises le 10 juin 2025 pour un mariage à Lomé ; elle n'a rien livré, sans excuse ; le client a dû louer en urgence : préjudice de 400 000 FCFA.</td></tr><tr><th>L2</th><td>Le transporteur Sotraliv devait acheminer des vivres à Cinkassé le 15 août 2025 ; des crues exceptionnelles, non annoncées, ont coupé la route pendant dix jours : la livraison fut impossible.</td></tr><tr><th>L3</th><td>Le 20 juillet 2025, M. Tetteh renverse Mme Dede, piétonne, sur le boulevard du Mono à Lomé ; ils ne se connaissent pas et aucun contrat ne les lie ; ordonnances : 250 000 FCFA.</td></tr></table><ol><li>La responsabilité engagée dans le litige L1 est-elle contractuelle ou délictuelle ? (un mot)</li><li>Comment s'appelle le recours qui contraint le débiteur à faire ce qui était promis ? (deux mots)</li><li>Après « imprévisible » et « irrésistible », quel est le troisième critère de la force majeure ? (un mot)</li><li>Dans le litige L2, Sotraliv est-il dispensé de son obligation par la force majeure ? (oui/non)</li><li>La responsabilité engagée dans le litige L3 est-elle contractuelle ou délictuelle ? (un mot)</li><li>Outre l'exécution forcée, quel recours pécuniaire le créancier du litige L1 peut-il demander au débiteur fautif ? (deux mots)</li></ol>",
    "starter": "# Exercice — Mariage à Lomé, crues à Cinkassé, accident du Mono\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — La nature de la responsabilité dans L1]\nA_COMPLETER\n\n[Question 2 — Le recours qui contraint le débiteur]\nA_COMPLETER\n\n[Question 3 — Le troisième critère de la force majeure]\nA_COMPLETER\n\n[Question 4 — La dispense de Sotraliv]\nA_COMPLETER\n\n[Question 5 — La nature de la responsabilité dans L3]\nA_COMPLETER\n\n[Question 6 — Le recours pécuniaire du créancier]\nA_COMPLETER\n",
    "hints": [
      "Responsabilité contractuelle : une obligation née d'un contrat entre les parties ; responsabilité délictuelle : un dommage causé à autrui sans contrat.",
      "La force majeure exige trois critères cumulatifs : événement imprévisible, irrésistible et extérieur ; alors le débiteur est dispensé.",
      "Face à l'inexécution, le créancier dispose de deux recours : contraindre à exécuter, et/ou obtenir une somme d'argent qui répare le préjudice."
    ],
    "examples": [
      {
        "stdin": "À Kara, un traiteur n'a pas livré le gâteau promis pour un anniversaire (contrat, préjudice de 80 000 FCFA). À Kpalimé, un éboulement non annoncé a coupé la route d'un livreur pendant une semaine. Sur le marché d'Atakpamé, un client renverse l'étal d'un vendeur qu'il ne connaît pas (dommage de 60 000 FCFA).\n\n1) Traiteur : responsabilité contractuelle (obligation née du contrat).\n2) Recours : exécution forcée et/ou dommages-intérêts.\n3) Éboulement : imprévisible, irrésistible, extérieur : force majeure ; le livreur est dispensé.\n4) Étal renversé sans contrat : responsabilité délictuelle.",
        "expected": "contractuelle — execution forcee et dommages-interets — force majeure : dispense — delictuelle",
        "note": "Un contrat entre les parties ? contractuelle. Aucun contrat ? délictuelle. L'impossible par force majeure ? le débiteur est dispensé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La nature de la responsabilité dans L1",
        "stdin": "q:1",
        "expected": "contractuelle||responsabilite contractuelle||la responsabilite contractuelle"
      },
      {
        "label": "Question 2 — Le recours qui contraint le débiteur",
        "stdin": "q:2",
        "expected": "execution forcee||l'execution forcee||l execution forcee"
      },
      {
        "label": "Question 3 — Le troisième critère de la force majeure",
        "stdin": "q:3",
        "expected": "exterieur"
      },
      {
        "label": "Question 4 — La dispense de Sotraliv",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — La nature de la responsabilité dans L3",
        "stdin": "q:5",
        "expected": "delictuelle||responsabilite delictuelle||la responsabilite delictuelle"
      },
      {
        "label": "Question 6 — Le recours pécuniaire du créancier",
        "stdin": "q:6",
        "expected": "dommages-interets||dommages interets||des dommages-interets||des dommages et interets||dommages et interets"
      }
    ],
    "solution": "[Question 1 — La nature de la responsabilité dans L1]\ncontractuelle\n\n[Question 2 — Le recours qui contraint le débiteur]\nexecution forcee\n\n[Question 3 — Le troisième critère de la force majeure]\nexterieur\n\n[Question 4 — La dispense de Sotraliv]\noui\n\n[Question 5 — La nature de la responsabilité dans L3]\ndelictuelle\n\n[Question 6 — Le recours pécuniaire du créancier]\ndommages-interets",
    "takeaway": "1) L1 : l'obligation de livrer les chaises est née du contrat entre Mabo Déco et le client : la responsabilité engagée est contractuelle.\n2) Le recours qui contraint le débiteur à exécuter ce qui était promis est l'exécution forcée.\n3) Après « imprévisible » et « irrésistible », le troisième critère de la force majeure est l'extériorité : l'événement doit être extérieur au débiteur.\n4) Oui : les crues exceptionnelles, non annoncées (imprévisibles), qui ont coupé la route dix jours (irrésistibles) et qui ne viennent pas de Sotraliv (extérieures), remplissent les trois critères cumulatifs : le transporteur est dispensé de son obligation.\n5) L3 : aucun contrat ne lie M. Tetteh et Mme Dede ; le dommage est causé à autrui sans contrat : la responsabilité est délictuelle — des dommages-intérêts répareront les 250 000 FCFA d'ordonnances.\n6) Outre l'exécution forcée, le créancier de L1 peut demander des dommages-intérêts : 400 000 FCFA pour le préjudice de la location en urgence.\nContrôle : L1 contractuelle (contrat), L3 délictuelle (sans contrat), L2 ni l'une ni l'autre — la force majeure libère le débiteur : les trois issues d'un litige d'exécution."
  }
];
