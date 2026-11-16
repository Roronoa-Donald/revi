/**
 * chapitre6.js — Études de cas du cours « b3-agile ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ag3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le Program Board du PI Planning du groupe Vega",
    "exampleTitle": "Exemple résolu — les dépendances du PI Planning d'Orbis",
    "goal": "Lire les dépendances inter-équipes d'un Program Board SAFe et repérer inversions critiques et marges.",
    "brief": "<p><strong>Énoncé.</strong> Le groupe Vega lance un Program Increment (PI) de cinq sprints, S1 à S5, avec six équipes synchronisées. Lors du PI Planning, les dépendances suivantes sont épinglées sur le Program Board :</p><table><tr><th>ID</th><th>Équipe fournisseur</th><th>Livre au sprint</th><th>Équipe cliente</th><th>Besoin au sprint</th></tr><tr><th>DEP-01</th><td>Facturation</td><td>S3</td><td>Mobile</td><td>S3</td></tr><tr><th>DEP-02</th><td>Authentification</td><td>S2</td><td>Portail</td><td>S4</td></tr><tr><th>DEP-03</th><td>Data</td><td>S5</td><td>Reporting</td><td>S4</td></tr></table><p>Règle du cours : un fournisseur doit livrer son composant avant, ou au plus tard au sprint du besoin client. Quand le fournisseur livre après le besoin, la dépendance est une <strong>inversion critique</strong> à renégocier immédiatement pendant le breakout.</p><ol><li>Combien de dépendances sont affichées sur le Program Board ?</li><li>Pour DEP-02, quelle est la marge, en sprints, entre la livraison (S2) et le besoin (S4) ?</li><li>Quelle dépendance est en inversion critique ? Répondez par son identifiant.</li><li>De combien de sprints l'équipe Data doit-elle avancer sa livraison (prévue en S5) pour satisfaire le besoin du sprint S4 ?</li><li>Si l'équipe Mobile avait besoin de l'API de facturation dès S1, la dépendance DEP-01 (livraison S3) deviendrait-elle une inversion critique ? Répondez par oui ou non.</li><li>Que doit-il se passer immédiatement pour DEP-03 pendant le breakout du PI Planning : une renégociation entre équipes ou une attente de la fin du PI ? Répondez par un mot.</li></ol>",
    "starter": "# Exercice — Le Program Board du PI Planning du groupe Vega\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Question 5 : oui ou non.\n\n[Question 1 — Dépendances affichées sur le Program Board]\nA_COMPLETER\n\n[Question 2 — Marge de DEP-02, en sprints]\nA_COMPLETER\n\n[Question 3 — Dépendance en inversion critique]\nA_COMPLETER\n\n[Question 4 — Avance nécessaire de l'équipe Data, en sprints]\nA_COMPLETER\n\n[Question 5 — DEP-01 deviendrait-elle critique pour un besoin en S1 ?]\nA_COMPLETER\n\n[Question 6 — Que faire de DEP-03 pendant le breakout]\nA_COMPLETER\n",
    "hints": [
      "Sur un Program Board, chaque flèche va du fournisseur vers le client : ce qui compte, c'est l'ordre des sprints.",
      "Marge = sprint du besoin − sprint de livraison ; une marge négative signe une inversion critique.",
      "1. Comptez les lignes du tableau. 2. Marge de DEP-02 : 4 − 2. 3. Cherchez la livraison postérieure au besoin. 4. Comparez S5 au besoin S4. 5. Un besoin en S1 avec une livraison en S3 : le fournisseur arrive après. 6. Le cours prescrit de renégocier immédiatement, pendant le breakout."
    ],
    "examples": [
      {
        "stdin": "Orbis organise son PI Planning (5 sprints). Dépendances :\nDEP-A : Analytics livre en S2, Insights a besoin en S5.\nDEP-B : Paie livre en S4, Mobile a besoin en S3.\n\n1) Deux dépendances affichées.\n2) Marge de DEP-A : 5 − 2 = 3 sprints.\n3) DEP-B : livraison S4 après le besoin S3 : inversion critique.\n4) DEP-B doit être renégociée immédiatement pendant le breakout.",
        "expected": "2 dépendances — marge DEP-A : 3 sprints — DEP-B en inversion critique — renégociation immédiate",
        "note": "Une inversion critique détectée au PI Planning se renégocie sur place : l'attendre en fin de PI bloque deux équipes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Dépendances affichées sur le Program Board",
        "stdin": "q:1",
        "expected": "3||3 dépendances||trois"
      },
      {
        "label": "Question 2 — Marge de DEP-02, en sprints",
        "stdin": "q:2",
        "expected": "2||2 sprints||deux"
      },
      {
        "label": "Question 3 — Dépendance en inversion critique",
        "stdin": "q:3",
        "expected": "dep-03||DEP-03"
      },
      {
        "label": "Question 4 — Avance nécessaire de l'équipe Data, en sprints",
        "stdin": "q:4",
        "expected": "1||1 sprint||un"
      },
      {
        "label": "Question 5 — DEP-01 deviendrait-elle critique pour un besoin en S1 ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Que faire de DEP-03 pendant le breakout",
        "stdin": "q:6",
        "expected": "renégociation||renegociation||une renégociation"
      }
    ],
    "solution": "[Question 1 — Dépendances affichées sur le Program Board]\n3\n\n[Question 2 — Marge de DEP-02, en sprints]\n2\n\n[Question 3 — Dépendance en inversion critique]\ndep-03\n\n[Question 4 — Avance nécessaire de l'équipe Data, en sprints]\n1\n\n[Question 5 — DEP-01 deviendrait-elle critique pour un besoin en S1 ?]\noui\n\n[Question 6 — Que faire de DEP-03 pendant le breakout]\nrenégociation",
    "takeaway": "1) Trois dépendances sont affichées : DEP-01, DEP-02, DEP-03.\n2) Marge de DEP-02 : 4 − 2 = 2 sprints (l'authentification livre deux sprints avant le besoin du Portail).\n3) DEP-03 : Data livre en S5 alors que Reporting a besoin en S4 : livraison après le besoin, inversion critique.\n4) Pour satisfaire un besoin en S4, Data doit avancer sa livraison d'un sprint (S5 → S4 au plus tard).\n5) Oui : une livraison en S3 pour un besoin en S1 placerait le fournisseur deux sprints après le client : inversion critique.\n6) Une renégociation : l'inversion critique se traite immédiatement pendant le breakout du PI Planning, pas en fin de PI.\nContrôle : DEP-01 est tendue (marge 0), DEP-02 est confortable (marge +2), DEP-03 est critique (marge −1) : seule DEP-03 exige une action immédiate."
  },
  {
    "id": "ag3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'organisation Spotify de StreamLine",
    "exampleTitle": "Exemple résolu — l'organisation de la plateforme Jouveo",
    "goal": "Naviguer dans le modèle Spotify : squads, tribus, chapters et guildes, et repérer les rattachements manquants.",
    "brief": "<p><strong>Énoncé.</strong> StreamLine, plateforme de streaming musical, s'organise selon le modèle popularisé par Spotify : des <strong>squads</strong>, équipes autonomes pluridisciplinaires, regroupées en <strong>tribus</strong> par domaine métier ; des <strong>chapters</strong> (chapitres) transverses qui relient une même compétence au sein d'une tribu ; des <strong>guildes</strong>, communautés d'intérêt facultatives à l'échelle de l'entreprise. Les membres des tribus « Expérience » et « Plateforme » sont :</p><table><tr><th>Membre</th><th>Squad</th><th>Tribu</th><th>Chapter</th><th>Guildes</th></tr><tr><th>Alice</th><td>Lecteur</td><td>Expérience</td><td>Frontend</td><td>Performance, Accessibilité</td></tr><tr><th>Bob</th><td>Encodage</td><td>Plateforme</td><td>Backend</td><td>—</td></tr><tr><th>Chloé</th><td>—</td><td>Expérience</td><td>Design</td><td>Design system</td></tr><tr><th>David</th><td>Recommandation</td><td>—</td><td>Data</td><td>—</td></tr><tr><th>Emma</th><td>Recommandation</td><td>Expérience</td><td>—</td><td>Performance, Accessibilité, Clean code</td></tr></table><ol><li>Combien de membres appartiennent à la squad Recommandation ?</li><li>Quel élément du modèle regroupe des squads travaillant dans le même domaine métier ? Répondez par son nom.</li><li>Quel membre n'est rattaché à aucune squad ? Répondez par son prénom.</li><li>Les guildes sont-elles obligatoires pour chaque membre ? Répondez par oui ou non.</li><li>Quelle structure transverse relie, au sein d'une même tribu, des membres de la même compétence (par exemple tous les développeurs frontend) ? Répondez par son nom.</li><li>Combien de guildes Emma a-t-elle rejointes ?</li></ol>",
    "starter": "# Exercice — L'organisation Spotify de StreamLine\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 : le prénom. Questions 2 et 5 : le nom de la structure.\n\n[Question 1 — Membres de la squad Recommandation]\nA_COMPLETER\n\n[Question 2 — Structure qui regroupe des squads d'un même domaine]\nA_COMPLETER\n\n[Question 3 — Membre sans squad]\nA_COMPLETER\n\n[Question 4 — Les guildes sont-elles obligatoires ?]\nA_COMPLETER\n\n[Question 5 — Structure transverse de compétence dans une tribu]\nA_COMPLETER\n\n[Question 6 — Nombre de guildes d'Emma]\nA_COMPLETER\n",
    "hints": [
      "Dans le modèle Spotify, chaque structure a son périmètre propre : la cellule de base, le regroupement par domaine métier, la ligne de compétence transverse, la communauté d'intérêt.",
      "Squad, tribu et chapter structurent chaque membre ; seule la guilde relève du volontariat.",
      "1. Comptez les lignes portant « Recommandation » dans la colonne Squad. 2. Relisez la définition des quatre structures. 3. Cherchez le tiret dans la colonne Squad. 4. Bob n'a rejoint aucune guilde : qu'en déduire ? 5. Relisez la définition de la structure qui réunit une compétence au sein d'une même tribu. 6. Comptez les guildes listées pour Emma."
    ],
    "examples": [
      {
        "stdin": "Jouveo, plateforme de jeux en ligne, recense trois membres :\nFarid (Squad Tournois, Tribu Jeux, Chapter Backend, 1 guilde).\nGrace (Squad Tournois, Tribu Jeux, Chapter QA, 2 guildes).\nHugo (Squad Boutique, Tribu Commerce, sans chapter, 0 guilde).\n\n1) Deux membres en squad Tournois (Farid, Grace).\n2) La tribu regroupe les squads d'un même domaine.\n3) Hugo n'a pas de chapter : sa fiche est incomplète.\n4) Les guildes restent facultatives (Hugo n'en a aucune).",
        "expected": "2 membres en squad Tournois — la tribu regroupe les squads — Hugo sans chapter — guildes facultatives",
        "note": "Squad, tribu et chapter structurent le membre ; seule la guilde relève du volontariat."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Membres de la squad Recommandation",
        "stdin": "q:1",
        "expected": "2||2 membres||deux"
      },
      {
        "label": "Question 2 — Structure qui regroupe des squads d'un même domaine",
        "stdin": "q:2",
        "expected": "la tribu||tribu||la tribe||tribe"
      },
      {
        "label": "Question 3 — Membre sans squad",
        "stdin": "q:3",
        "expected": "chloé||chloe"
      },
      {
        "label": "Question 4 — Les guildes sont-elles obligatoires ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Structure transverse de compétence dans une tribu",
        "stdin": "q:5",
        "expected": "le chapter||chapter||le chapitre||chapitre"
      },
      {
        "label": "Question 6 — Nombre de guildes d'Emma",
        "stdin": "q:6",
        "expected": "3||3 guildes||trois"
      }
    ],
    "solution": "[Question 1 — Membres de la squad Recommandation]\n2\n\n[Question 2 — Structure qui regroupe des squads d'un même domaine]\nla tribu\n\n[Question 3 — Membre sans squad]\nchloé\n\n[Question 4 — Les guildes sont-elles obligatoires ?]\nnon\n\n[Question 5 — Structure transverse de compétence dans une tribu]\nle chapter\n\n[Question 6 — Nombre de guildes d'Emma]\n3",
    "takeaway": "1) David et Emma appartiennent à la squad Recommandation : 2 membres.\n2) La tribu regroupe des squads travaillant dans le même domaine métier (ici Expérience et Plateforme).\n3) Chloé n'est rattachée à aucune squad : son rattachement est à régler.\n4) Non : les guildes sont des communautés d'intérêt facultatives ; Bob n'en a rejoint aucune.\n5) Le chapter relie, au sein d'une même tribu, les membres d'une même compétence.\n6) Emma a rejoint trois guildes : Performance, Accessibilité et Clean code.\nContrôle : sur cinq membres, deux fiches seulement sont complètes (Alice et Bob) ; Chloé manque de squad, David de tribu et Emma de chapter, soit trois rattachements à corriger."
  },
  {
    "id": "ag3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le radar de maturité des équipes de NordicBank",
    "exampleTitle": "Exemple résolu — le radar des équipes d'AeroFast",
    "goal": "Lire un radar de maturité agile à cinq dimensions, calculer des moyennes et en tirer un plan de coaching.",
    "brief": "<p><strong>Énoncé.</strong> La DSI de NordicBank fait auditer ses deux équipes produit. Un coach évalue chacune sur cinq dimensions du radar agile, de 1 (fragile) à 5 (excellent) :</p><table><tr><th>Dimension</th><th>Culture</th><th>Cadence</th><th>Qualité</th><th>Produit</th><th>Flux</th></tr><tr><th>Équipe Delta</th><td>4</td><td>3</td><td>2</td><td>4</td><td>3</td></tr><tr><th>Équipe Epsilon</th><td>2</td><td>2</td><td>3</td><td>3</td><td>2</td></tr></table><p>Une dimension notée strictement en dessous de 3 signale une vulnérabilité critique qui appelle un coaching ciblé.</p><ol><li>Quelle est la moyenne de l'équipe Delta (arrondie au dixième) ?</li><li>Quelle est la moyenne de l'équipe Epsilon (arrondie au dixième) ?</li><li>Quelle est la dimension la plus faible de l'équipe Delta ?</li><li>Combien de dimensions de l'équipe Epsilon sont sous le seuil critique de 3 ?</li><li>Quelle équipe doit être accompagnée en priorité ? Répondez par son nom.</li><li>La DSI impose un cadrage budgétaire annuel global, puis laisse chaque équipe livrer en sprints de deux semaines. Comment nomme-t-on ce compromis où l'amont et l'aval restent séquentiels autour de sprints agiles ? Répondez par le nom consacré.</li></ol>",
    "starter": "# Exercice — Le radar de maturité des équipes de NordicBank\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : arrondi au dixième. Question 5 : le nom de l'équipe.\n\n[Question 1 — Moyenne de l'équipe Delta]\nA_COMPLETER\n\n[Question 2 — Moyenne de l'équipe Epsilon]\nA_COMPLETER\n\n[Question 3 — Dimension la plus faible de Delta]\nA_COMPLETER\n\n[Question 4 — Dimensions d'Epsilon sous le seuil critique]\nA_COMPLETER\n\n[Question 5 — Équipe à accompagner en priorité]\nA_COMPLETER\n\n[Question 6 — Nom du compromis gouvernance séquentielle + sprints]\nA_COMPLETER\n",
    "hints": [
      "Le radar se lit dimension par dimension : une moyenne flatteuse peut masquer une dimension en détresse.",
      "Le seuil critique du cours est strictement inférieur à 3 : une note de 3 n'alerte pas.",
      "1. Sommez les cinq notes de Delta et divisez par 5. 2. Idem pour Epsilon. 3. Cherchez la note minimale de la ligne Delta. 4. Comptez les notes strictement inférieures à 3 chez Epsilon. 5. Comparez moyennes et alertes. 6. Le nom consacré enchaîne le modèle prédictif anglais, scrum, puis de nouveau le prédictif."
    ],
    "examples": [
      {
        "stdin": "AeroFast audite deux équipes sur cinq dimensions :\nTeam A : culture 5, cadence 4, qualité 4, produit 5, flux 4.\nTeam B : culture 3, cadence 2, qualité 3, produit 4, flux 2.\n\n1) Moyenne A : 22 / 5 = 4,4.\n2) Moyenne B : 14 / 5 = 2,8.\n3) Dimensions B sous 3 : cadence et flux, soit 2 alertes.\n4) Team B à accompagner en priorité.\n5) Moyenne correcte mais alertes ciblées : coaching sur cadence et flux.",
        "expected": "A : 4,4 — B : 2,8 — 2 dimensions critiques — priorité à Team B",
        "note": "Une moyenne correcte peut masquer une dimension en détresse : le radar se lit dimension par dimension."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Moyenne de l'équipe Delta",
        "stdin": "q:1",
        "expected": "3,2||3.2"
      },
      {
        "label": "Question 2 — Moyenne de l'équipe Epsilon",
        "stdin": "q:2",
        "expected": "2,4||2.4"
      },
      {
        "label": "Question 3 — Dimension la plus faible de Delta",
        "stdin": "q:3",
        "expected": "qualité||la qualité||quality"
      },
      {
        "label": "Question 4 — Dimensions d'Epsilon sous le seuil critique",
        "stdin": "q:4",
        "expected": "3||3 dimensions||trois"
      },
      {
        "label": "Question 5 — Équipe à accompagner en priorité",
        "stdin": "q:5",
        "expected": "epsilon||l'équipe epsilon||l’équipe epsilon||l'equipe epsilon"
      },
      {
        "label": "Question 6 — Nom du compromis gouvernance séquentielle + sprints",
        "stdin": "q:6",
        "expected": "water-scrum-fall||le water-scrum-fall"
      }
    ],
    "solution": "[Question 1 — Moyenne de l'équipe Delta]\n3,2\n\n[Question 2 — Moyenne de l'équipe Epsilon]\n2,4\n\n[Question 3 — Dimension la plus faible de Delta]\nqualité\n\n[Question 4 — Dimensions d'Epsilon sous le seuil critique]\n3\n\n[Question 5 — Équipe à accompagner en priorité]\nepsilon\n\n[Question 6 — Nom du compromis gouvernance séquentielle + sprints]\nwater-scrum-fall",
    "takeaway": "1) Moyenne Delta : (4 + 3 + 2 + 4 + 3) / 5 = 16 / 5 = 3,2.\n2) Moyenne Epsilon : (2 + 2 + 3 + 3 + 2) / 5 = 12 / 5 = 2,4.\n3) La dimension la plus faible de Delta est la Qualité (2), seule note sous le seuil critique.\n4) Epsilon compte trois dimensions sous 3 : Culture (2), Cadence (2) et Flux (2).\n5) Epsilon : moyenne la plus basse (2,4) et trois vulnérabilités critiques contre une pour Delta.\n6) Ce compromis s'appelle le Water-Scrum-Fall : gouvernance et homologation séquentielles autour d'une exécution en sprints.\nContrôle : 16 + 12 = 28 points sur les deux équipes ; 28 / 10 = 2,8 de moyenne générale, tirée vers le bas par Epsilon."
  }
];
