/**
 * chapitre5.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
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
  }
];
