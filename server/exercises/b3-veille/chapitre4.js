/**
 * chapitre4.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
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
  }
];
