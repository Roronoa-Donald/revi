/**
 * Chapitre 2 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le séminaire annuel de la PME",
    "exampleTitle": "Exemple résolu — la journée portes ouvertes",
    "goal": "Appliquer le principe multiplicatif, dénombrer des codes avec et sans répétition et distinguer ordre et non-ordre.",
    "brief": "<p><strong>Énoncé.</strong> Une PME organise son séminaire annuel. Au déjeuner, chaque salarié compose son repas en choisissant <strong>1 entrée parmi 3</strong>, <strong>1 plat parmi 4</strong> et <strong>1 dessert parmi 2</strong>. L’après-midi, un coffre contenant les lots du jeu est fermé par un <strong>code de 3 chiffres</strong> choisis parmi <code>1, 2, 3, 4, 5</code> (les chiffres peuvent se répéter ou devoir être tous distincts selon les questions). Enfin, <strong>6 volontaires</strong> se proposent pour être les 2 porte-parole du jeu.</p><ol><li>Combien de menus différents peut-on composer pour le déjeuner ?</li><li>Le coffre est protégé par un code de 3 chiffres <strong>pouvant se répéter</strong> (par exemple 2-2-5). Combien de codes possibles ?</li><li>Le directeur exige un code de 3 chiffres <strong>tous distincts</strong>. Combien de codes possibles ?</li><li>Pour ouvrir le coffre, l’ordre des chiffres du code compte-t-il ? Répondez par oui ou non.</li><li>Combien de binômes différents de 2 porte-parole peut-on former avec les 6 volontaires (l’ordre n’a pas d’importance) ?</li></ol><p>Donnez le nombre demandé, la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le séminaire annuel de la PME\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (nombre entier, oui ou non pour la question 4).\n\n[Question 1 — Nombre de menus possibles]\nA_COMPLETER\n\n[Question 2 — Codes de 3 chiffres avec répétition]\nA_COMPLETER\n\n[Question 3 — Codes de 3 chiffres tous distincts]\nA_COMPLETER\n\n[Question 4 — L’ordre compte-t-il (oui ou non)]\nA_COMPLETER\n\n[Question 5 — Nombre de binômes de porte-parole]\nA_COMPLETER\n",
    "hints": [
      "Principe multiplicatif : des choix successifs se multiplient — le nombre de menus est le produit du nombre d’entrées, de plats et de desserts.",
      "Un code est une suite ordonnée : chaque position compte. Avec répétition autorisée, chaque position offre 5 chiffres ; sans répétition, les choix se retirent un à un (5, puis 4, puis 3).",
      "Pour les porte-parole, l’ordre ne compte pas : un binôme est un sous-ensemble de 2 personnes parmi 6, compté par la combinaison C(6,2) = 6 × 5 / 2."
    ],
    "examples": [
      {
        "stdin": "Une journée portes ouvertes propose 2 visites guidées, 3 ateliers et 2 horaires de passage ; un badge d’accès porte 2 lettres distinctes choisies parmi A, B, C, D ; 4 bénévoles animent l’accueil et l’on choisit 1 responsable.\n\n1) Programmes possibles : 2 × 3 × 2 = 12.\n2) Badges possibles : A(4,2) = 4 × 3 = 12.\n3) Choix du responsable : 4.\n4) Binômes de 2 bénévoles : C(4,2) = 6.",
        "expected": "12 programmes — 12 badges — 4 responsables — 6 binômes",
        "note": "Code, podium ou badge : l’ordre compte (arrangement) ; binôme, délégation ou jury : l’ordre ne compte pas (combinaison)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de menus possibles",
        "stdin": "q:1",
        "expected": "24"
      },
      {
        "label": "Question 2 — Codes de 3 chiffres avec répétition",
        "stdin": "q:2",
        "expected": "125"
      },
      {
        "label": "Question 3 — Codes de 3 chiffres tous distincts",
        "stdin": "q:3",
        "expected": "60"
      },
      {
        "label": "Question 4 — L’ordre compte-t-il",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Nombre de binômes de porte-parole",
        "stdin": "q:5",
        "expected": "15"
      }
    ],
    "solution": "[Question 1 — Nombre de menus possibles]\n24\n\n[Question 2 — Codes de 3 chiffres avec répétition]\n125\n\n[Question 3 — Codes de 3 chiffres tous distincts]\n60\n\n[Question 4 — L’ordre compte-t-il (oui ou non)]\noui\n\n[Question 5 — Nombre de binômes de porte-parole]\n15",
    "takeaway": "1) Principe multiplicatif : 3 entrées × 4 plats × 2 desserts = 24 menus.\n2) Code de 3 chiffres avec répétition : chaque position offre 5 choix, d’où 5 × 5 × 5 = 5³ = 125 codes.\n3) Code de 3 chiffres distincts : c’est un arrangement A(5,3) = 5 × 4 × 3 = 60 codes (à chaque chiffre choisi, il en reste un de moins pour la position suivante).\n4) Oui : 1-2-5 et 5-2-1 sont deux codes différents — l’ordre compte, c’est bien un dénombrement de suites ordonnées.\n5) Un binôme est un choix non ordonné de 2 personnes parmi 6 : C(6,2) = (6 × 5)/2 = 15 binômes.\nContrôle : A(5,3) = C(5,3) × 3! = 10 × 6 = 60 — chaque sous-ensemble de 3 chiffres donne 3! = 6 codes ordonnés, la cohérence arrangement/combinaison est vérifiée."
  },
  {
    "id": "pb2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le prélèvement du poste de contrôle qualité",
    "exampleTitle": "Exemple résolu — le contrôle des fusibles",
    "goal": "Dénombrer des prélèvements sans ordre par combinaisons et en déduire des probabilités sur un tirage simultané.",
    "brief": "<p><strong>Énoncé.</strong> Au poste de contrôle qualité, <strong>10 pièces</strong> viennent de sortir de la chaîne : <strong>4 sont estampillées « premium »</strong> et 6 sont standard. L’agent en prélève <strong>3 au hasard et simultanément</strong> : l’ordre du prélèvement n’a pas d’importance. On appelle X le nombre de pièces premium obtenues dans le prélèvement.</p><ol><li>Combien de prélèvements différents de 3 pièces peut-on former ?</li><li>Combien de prélèvements contiennent exactement 2 pièces premium ?</li><li>En déduire la probabilité d’obtenir exactement 2 pièces premium.</li><li>Combien de prélèvements ne contiennent aucune pièce premium ?</li><li>En déduire la probabilité qu’aucune pièce premium ne soit prélevée.</li></ol><p>Rappel : C(n,k) = n!/(k!(n−k)!). Donnez les probabilités en fraction réduite ou en décimal exact, la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le prélèvement du poste de contrôle qualité\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (entier, ou fraction réduite / décimal exact).\n\n[Question 1 — Nombre de prélèvements de 3 pièces]\nA_COMPLETER\n\n[Question 2 — Prélèvements avec exactement 2 premium]\nA_COMPLETER\n\n[Question 3 — Probabilité d’exactement 2 premium]\nA_COMPLETER\n\n[Question 4 — Prélèvements sans pièce premium]\nA_COMPLETER\n\n[Question 5 — Probabilité d’aucune premium]\nA_COMPLETER\n",
    "hints": [
      "Prélever 3 pièces simultanément parmi 10, sans ordre, se compte par une combinaison : C(10,3) = 10 × 9 × 8 / 3!.",
      "Pour « exactement 2 premium » : choisissez 2 pièces parmi les 4 premium ET 1 pièce parmi les 6 standard — deux étapes successives, donc un produit de combinaisons.",
      "Chaque probabilité s’obtient en rapportant les prélèvements favorables au nombre total de prélèvements. Contrôle : comptez aussi les cas « exactement 1 » et « exactement 3 » premium — la somme de tous les cas doit redonner le total de la question 1."
    ],
    "examples": [
      {
        "stdin": "Un contrôleur reçoit 8 fusibles dont 3 défectueux ; il en prélève 2 simultanément.\n\n1) Prélèvements possibles : C(8,2) = 28.\n2) Exactement 1 défectueux : C(3,1) × C(5,1) = 3 × 5 = 15.\n3) P(exactement 1 défectueux) = 15/28.\n4) Aucun défectueux : C(5,2) = 10, donc P = 10/28 = 5/14.",
        "expected": "28 prélèvements — 15 avec un défectueux — P = 15/28 — 10 sans défaut, P = 5/14",
        "note": "« Exactement k » se décompose toujours en deux choix combinés : k dans la catégorie visée, le complément dans les autres."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de prélèvements de 3 pièces",
        "stdin": "q:1",
        "expected": "120"
      },
      {
        "label": "Question 2 — Prélèvements avec exactement 2 premium",
        "stdin": "q:2",
        "expected": "36"
      },
      {
        "label": "Question 3 — Probabilité d’exactement 2 premium",
        "stdin": "q:3",
        "expected": "3/10||0,3"
      },
      {
        "label": "Question 4 — Prélèvements sans pièce premium",
        "stdin": "q:4",
        "expected": "20"
      },
      {
        "label": "Question 5 — Probabilité d’aucune premium",
        "stdin": "q:5",
        "expected": "1/6"
      }
    ],
    "solution": "[Question 1 — Nombre de prélèvements de 3 pièces]\n120\n\n[Question 2 — Prélèvements avec exactement 2 premium]\n36\n\n[Question 3 — Probabilité d’exactement 2 premium]\n3/10\n\n[Question 4 — Prélèvements sans pièce premium]\n20\n\n[Question 5 — Probabilité d’aucune premium]\n1/6",
    "takeaway": "1) Prélever 3 pièces simultanément parmi 10 : C(10,3) = (10 × 9 × 8)/(3 × 2 × 1) = 720/6 = 120 prélèvements.\n2) Exactement 2 premium : choisir 2 pièces parmi les 4 premium et 1 parmi les 6 standard : C(4,2) × C(6,1) = 6 × 6 = 36.\n3) Tous les prélèvements sont équiprobables : P(X = 2) = 36/120 = 3/10 = 0,3.\n4) Aucune premium : les 3 pièces viennent des 6 standard : C(6,3) = (6 × 5 × 4)/6 = 20.\n5) P(X = 0) = 20/120 = 1/6.\nContrôle de cohérence (recensement complet) : exactement 3 premium : C(4,3) = 4 ; exactement 1 premium : C(4,1) × C(6,2) = 4 × 15 = 60 ; avec les cas 0 (20), 2 (36) et 3 (4) : 4 + 36 + 60 + 20 = 120 — on retrouve le total de la question 1, la loi de X est complète et la somme des probabilités vaut 1."
  },
  {
    "id": "pb2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Les mots de passe du Wi-Fi visiteur",
    "exampleTitle": "Exemple résolu — les badges du garage",
    "goal": "Compter des anagrammes avec lettres répétées et calculer des probabilités sur les réarrangements équiprobables d’un mot.",
    "brief": "<p><strong>Énoncé.</strong> Pour sécuriser le réseau Wi-Fi des visiteurs, le service informatique génère des mots de passe provisoires en mélangeant les lettres de mots faciles à retenir. Deux mots servent de base : <code>SALSA</code> (lettres S, A, L, S, A) et <code>CODE</code> (lettres toutes distinctes). Tous les réarrangements d’un mot sont équiprobables.</p><ol><li>Combien d’anagrammes distincts peut-on former avec les lettres du mot SALSA ?</li><li>Combien d’anagrammes distincts peut-on former avec les lettres du mot CODE ?</li><li>Un anagramme de SALSA est choisi au hasard : quelle est la probabilité qu’il commence par la lettre S ?</li><li>Quelle est la probabilité qu’un anagramme de SALSA se termine par la lettre L ?</li><li>Quelle est la probabilité qu’un anagramme de CODE commence par une voyelle (O ou E) ?</li></ol><p>Rappel : le nombre d’anagrammes d’un mot de n lettres dont les effectifs sont n₁, n₂, … vaut n!/(n₁! × n₂! × …). Donnez les probabilités en fraction réduite ou en décimal exact, la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Les mots de passe du Wi-Fi visiteur\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (entier, ou fraction réduite / décimal exact).\n\n[Question 1 — Anagrammes distincts de SALSA]\nA_COMPLETER\n\n[Question 2 — Anagrammes distincts de CODE]\nA_COMPLETER\n\n[Question 3 — Probabilité de commencer par S]\nA_COMPLETER\n\n[Question 4 — Probabilité de se terminer par L]\nA_COMPLETER\n\n[Question 5 — Probabilité de commencer par une voyelle]\nA_COMPLETER\n",
    "hints": [
      "Pour SALSA (5 lettres : deux S, deux A, une L), partez des 5! = 120 permutations de 5 lettres distinctes, puis divisez par les factorielles des effectifs des lettres répétées.",
      "Pour une position imposée (commencer par S, se terminer par L), fixez cette lettre puis comptez les anagrammes des lettres restantes : c’est le même comptage sur un mot plus court, avec ses propres répétitions.",
      "Chaque probabilité s’obtient en rapportant les anagrammes favorables au nombre total d’anagrammes du mot. Contrôle : pour SALSA, les probabilités de commencer par S, par A et par L doivent sommer à 1."
    ],
    "examples": [
      {
        "stdin": "Un garage distribue des badges formés sur le mot MOTO et des étiquettes sur le mot ROND.\n\n1) Anagrammes de MOTO (deux O) : 4!/2! = 12.\n2) Anagrammes de ROND (lettres distinctes) : 4! = 24.\n3) Anagrammes de MOTO commençant par M : il reste O, T, O, soit 3!/2! = 3 — probabilité 3/12 = 1/4.",
        "expected": "MOTO : 12 anagrammes — ROND : 24 — P(commencer par M) = 1/4",
        "note": "Chaque lettre répétée divise le comptage : les deux O identiques divisent les 24 permutations de MOTO par 2! = 2."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Anagrammes distincts de SALSA",
        "stdin": "q:1",
        "expected": "30"
      },
      {
        "label": "Question 2 — Anagrammes distincts de CODE",
        "stdin": "q:2",
        "expected": "24"
      },
      {
        "label": "Question 3 — Probabilité de commencer par S",
        "stdin": "q:3",
        "expected": "2/5||0,4"
      },
      {
        "label": "Question 4 — Probabilité de se terminer par L",
        "stdin": "q:4",
        "expected": "1/5||0,2"
      },
      {
        "label": "Question 5 — Probabilité de commencer par une voyelle",
        "stdin": "q:5",
        "expected": "1/2||0,5"
      }
    ],
    "solution": "[Question 1 — Anagrammes distincts de SALSA]\n30\n\n[Question 2 — Anagrammes distincts de CODE]\n24\n\n[Question 3 — Probabilité de commencer par S]\n2/5\n\n[Question 4 — Probabilité de se terminer par L]\n1/5\n\n[Question 5 — Probabilité de commencer par une voyelle]\n1/2",
    "takeaway": "1) SALSA compte 5 lettres : deux S, deux A, une L. Anagrammes : 5!/(2! × 2!) = 120/4 = 30.\n2) CODE compte 4 lettres toutes distinctes : 4! = 24 anagrammes.\n3) Commencer par S : il reste à arranger A, A, L, S, soit 4!/2! = 12 anagrammes. Probabilité : 12/30 = 2/5 = 0,4.\n4) Terminer par L : il reste à arranger S, A, S, A, soit 4!/(2! × 2!) = 6 anagrammes. Probabilité : 6/30 = 1/5 = 0,2.\n5) Commencer par une voyelle de CODE (O ou E) : 2 choix pour la première lettre, puis 3! = 6 arrangements du reste, soit 2 × 6 = 12 anagrammes favorables. Probabilité : 12/24 = 1/2 = 0,5.\nContrôle : pour SALSA, commencer par S (12 cas), par A (4!/2! = 12 cas) ou par L (4!/(2!×2!) = 6 cas) : 12 + 12 + 6 = 30 — on retrouve le total, et 12/30 + 12/30 + 6/30 = 1."
  }
];
