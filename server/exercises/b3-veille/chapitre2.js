/**
 * chapitre2.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
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
  }
];
