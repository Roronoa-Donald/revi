/**
 * Chapitre 4 — Probabilités B2.
 * Mode d'évaluation mathématique structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "pb2-c4-e1",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le questionnaire à choix forcé de l’entretien",
    "exampleTitle": "Exemple résolu — le quiz de sécurité informatique",
    "goal": "Reconnaître une loi binomiale et calculer P(X = k) puis P(X ≥ k) pour de petits effectifs.",
    "brief": "<p><strong>Énoncé.</strong> Un candidat passe le test final d’un entretien de stage. Il comporte <strong>4 questions fermées</strong> : chacune se répond par « vrai » ou « faux », et le candidat, complètement dépassé, répond <strong>au hasard</strong>. Les questions sont indépendantes. On note X le nombre de bonnes réponses.</p><ol><li>Quelle est la loi de X ? Répondez par un seul mot.</li><li>Quelle est la probabilité d’avoir tout juste (X = 4) ?</li><li>Quelle est la probabilité de tout rater (X = 0) ?</li><li>Quelle est la probabilité d’avoir exactement 2 bonnes réponses ?</li><li>Le candidat est reçu s’il obtient au moins 3 bonnes réponses : quelle est sa probabilité d’être reçu ?</li><li>Combien de bonnes réponses peut-il espérer en moyenne ?</li></ol><p>Rappel : pour une loi binomiale, P(X = k) = C(n,k) × p<sup>k</sup> × (1−p)<sup>n−k</sup>. Donnez les probabilités en fraction réduite ou en décimal exact, la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le questionnaire à choix forcé de l’entretien\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (fraction réduite ou décimal exact) ; un mot pour la question 1.\n\n[Question 1 — Loi de X (un mot)]\nA_COMPLETER\n\n[Question 2 — Probabilité de tout juste P(X = 4)]\nA_COMPLETER\n\n[Question 3 — Probabilité de tout rater P(X = 0)]\nA_COMPLETER\n\n[Question 4 — Probabilité P(X = 2)]\nA_COMPLETER\n\n[Question 5 — Probabilité d’être reçu P(X ≥ 3)]\nA_COMPLETER\n\n[Question 6 — Nombre moyen de bonnes réponses E(X)]\nA_COMPLETER\n",
    "hints": [
      "X compte le nombre de succès sur un nombre fixé (4) d’épreuves indépendantes à deux issues de même probabilité : la situation type de la loi binomiale, avec p = 0,5.",
      "Chaque suite de 4 réponses a la même probabilité (0,5)⁴ : comptez les suites favorables par le coefficient binomial C(4,k), puis multipliez.",
      "« Au moins 3 » regroupe les cas X = 3 et X = 4 : additionnez leurs probabilités. L’espérance d’une loi binomiale vaut n × p."
    ],
    "examples": [
      {
        "stdin": "Un quiz de sécurité comporte 3 questions à choix forcé (2 réponses possibles chacune) ; on répond au hasard. X = nombre de bonnes réponses suit B(3 ; 0,5).\n\n1) P(X = 3) = (0,5)³ = 1/8.\n2) P(X = 0) = (0,5)³ = 1/8.\n3) P(X = 1) = C(3,1) × (0,5)³ = 3/8.\n4) E(X) = 3 × 0,5 = 1,5.",
        "expected": "P(X = 3) = 1/8 — P(X = 0) = 1/8 — P(X = 1) = 3/8 — E(X) = 1,5",
        "note": "Avec p = 0,5, toutes les suites de n réponses sont équiprobables : P(X = k) = C(n,k)/2ⁿ, un comptage de chemins."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Loi de X",
        "stdin": "q:1",
        "expected": "binomiale||loi binomiale"
      },
      {
        "label": "Question 2 — Probabilité de tout juste P(X = 4)",
        "stdin": "q:2",
        "expected": "1/16||0,0625"
      },
      {
        "label": "Question 3 — Probabilité de tout rater P(X = 0)",
        "stdin": "q:3",
        "expected": "1/16||0,0625"
      },
      {
        "label": "Question 4 — Probabilité P(X = 2)",
        "stdin": "q:4",
        "expected": "3/8||0,375||6/16"
      },
      {
        "label": "Question 5 — Probabilité d’être reçu P(X ≥ 3)",
        "stdin": "q:5",
        "expected": "5/16||0,3125"
      },
      {
        "label": "Question 6 — Nombre moyen de bonnes réponses E(X)",
        "stdin": "q:6",
        "expected": "2||2,0"
      }
    ],
    "solution": "[Question 1 — Loi de X (un mot)]\nbinomiale\n\n[Question 2 — Probabilité de tout juste P(X = 4)]\n1/16\n\n[Question 3 — Probabilité de tout rater P(X = 0)]\n1/16\n\n[Question 4 — Probabilité P(X = 2)]\n3/8\n\n[Question 5 — Probabilité d’être reçu P(X ≥ 3)]\n5/16\n\n[Question 6 — Nombre moyen de bonnes réponses E(X)]\n2",
    "takeaway": "1) Nombre de succès sur 4 épreuves indépendantes, deux issues, même probabilité : X suit la loi binomiale B(4 ; 0,5).\n2) P(X = 4) = C(4,4) × (0,5)⁴ × (0,5)⁰ = 1 × (1/2)⁴ = 1/16 = 0,0625 : une seule suite (tout bon) sur les 16 suites possibles.\n3) P(X = 0) = (0,5)⁴ = 1/16 = 0,0625 (tout faux est une suite unique, tout comme tout bon).\n4) P(X = 2) = C(4,2) × (0,5)² × (0,5)² = 6 × 1/16 = 6/16 = 3/8 = 0,375.\n5) P(X ≥ 3) = P(X = 3) + P(X = 4) = C(4,3)/16 + 1/16 = 4/16 + 1/16 = 5/16 = 0,3125.\n6) E(X) = n × p = 4 × 0,5 = 2 bonnes réponses en moyenne.\nContrôle : la loi complète est P(X = k) = C(4,k)/16 pour k = 0, 1, 2, 3, 4, soit 1/16 + 4/16 + 6/16 + 4/16 + 1/16 = 16/16 = 1 (OK). Répondre au hasard ne rapporte que 5 chances sur 16 d’être reçu : réviser reste la meilleure stratégie."
  },
  {
    "id": "pb2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le contrôle des bouteilles sur la chaîne d’embouteillage",
    "exampleTitle": "Exemple résolu — le contrôle des cartes électroniques",
    "goal": "Lire les paramètres d’une loi binomiale : espérance, variance, écart-type, et vérifier ses conditions d’application.",
    "brief": "<p><strong>Énoncé.</strong> Une chaîne d’embouteillage remplit des bouteilles de 75 cl. Chaque bouteille a une probabilité <code>p = 0,2</code> d’être remplie hors tolérance. Le contrôle qualité prélève au hasard <strong>25 bouteilles</strong> dans une production en très grande série et note X le nombre de bouteilles hors tolérance.</p><p>Rappels : pour une loi binomiale B(n, p), E(X) = n·p, V(X) = n·p·(1−p) et σ(X) = √V(X).</p><ol><li>Quelle est la loi de X ? Répondez par un seul mot.</li><li>Calculer l’espérance E(X).</li><li>Calculer la variance V(X).</li><li>En déduire l’écart-type σ(X).</li><li>Après réglage de la machine, la probabilité de défaut tombe à 0,1 : quelle est la nouvelle espérance pour un prélèvement de 25 bouteilles ?</li><li>Le prélèvement au hasard dans une très grande série autorise-t-il l’indépendance des 25 contrôles ? Répondez par oui ou non.</li></ol><p>Donnez les valeurs en décimal exact, la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le contrôle des bouteilles sur la chaîne d’embouteillage\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal exact) ; un mot ou oui/non sinon.\n\n[Question 1 — Loi de X (un mot)]\nA_COMPLETER\n\n[Question 2 — Espérance E(X)]\nA_COMPLETER\n\n[Question 3 — Variance V(X)]\nA_COMPLETER\n\n[Question 4 — Écart-type σ(X)]\nA_COMPLETER\n\n[Question 5 — Nouvelle espérance après réglage]\nA_COMPLETER\n\n[Question 6 — Indépendance des 25 contrôles (oui ou non)]\nA_COMPLETER\n",
    "hints": [
      "On compte le nombre de « succès » (bouteille hors tolérance) sur 25 contrôles indépendants de même probabilité 0,2 : la situation se traduit par une loi binomiale de paramètres n = 25 et p = 0,2.",
      "Les formules du cours donnent directement E = n·p et V = n·p·(1−p) ; l’écart-type est la racine carrée de la variance.",
      "Après réglage, seul p change : recalculez n × p avec la nouvelle valeur. Dans une très grande série, prélever 25 bouteilles au hasard rend les contrôles pratiquement indépendants (le tirage ne modifie presque pas les proportions)."
    ],
    "examples": [
      {
        "stdin": "Un atelier contrôle 20 cartes électroniques ; chaque carte a une probabilité 0,1 d’être défectueuse. X = nombre de cartes défectueuses.\n\n1) E(X) = 20 × 0,1 = 2.\n2) V(X) = 20 × 0,1 × 0,9 = 1,8.\n3) Si l’on contrôle 50 cartes : E = 50 × 0,1 = 5 et V = 50 × 0,1 × 0,9 = 4,5.",
        "expected": "E = 2 — V = 1,8 — pour 50 cartes : E = 5, V = 4,5",
        "note": "Espérance et variance d’une binomiale se lisent sur n et p : aucun tableau n’est nécessaire, même sans calculatrice."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Loi de X",
        "stdin": "q:1",
        "expected": "binomiale||loi binomiale"
      },
      {
        "label": "Question 2 — Espérance E(X)",
        "stdin": "q:2",
        "expected": "5||5,0"
      },
      {
        "label": "Question 3 — Variance V(X)",
        "stdin": "q:3",
        "expected": "4||4,0"
      },
      {
        "label": "Question 4 — Écart-type σ(X)",
        "stdin": "q:4",
        "expected": "2||2,0"
      },
      {
        "label": "Question 5 — Nouvelle espérance après réglage",
        "stdin": "q:5",
        "expected": "2,5||5/2"
      },
      {
        "label": "Question 6 — Indépendance des 25 contrôles",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Loi de X (un mot)]\nbinomiale\n\n[Question 2 — Espérance E(X)]\n5\n\n[Question 3 — Variance V(X)]\n4\n\n[Question 4 — Écart-type σ(X)]\n2\n\n[Question 5 — Nouvelle espérance après réglage]\n2,5\n\n[Question 6 — Indépendance des 25 contrôles (oui ou non)]\noui",
    "takeaway": "1) Nombre de bouteilles hors tolérance sur 25 prélèvements indépendants de même probabilité : X suit la loi binomiale B(25 ; 0,2).\n2) E(X) = n × p = 25 × 0,2 = 5 bouteilles hors tolérance attendues en moyenne.\n3) V(X) = n × p × (1−p) = 25 × 0,2 × 0,8 = 4.\n4) σ(X) = √V(X) = √4 = 2 bouteilles.\n5) Après réglage : E = 25 × 0,1 = 2,5 bouteilles hors tolérance en moyenne — l’espérance est divisée par deux quand p est divisé par deux.\n6) Oui : prélever 25 bouteilles au hasard dans une très grande série laisse les proportions quasi inchangées d’un prélèvement à l’autre, les 25 contrôles peuvent être traités comme indépendants — c’est la condition qui autorise la loi binomiale.\nContrôle d’ordre de grandeur : E(X) = 5 avec σ(X) = 2, un jour où l’on relève 12 bouteilles hors tolérance, l’écart à la moyenne dépasse 3σ : alerte matérielle plutôt que hasard."
  },
  {
    "id": "pb2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le standard du SAV aux heures de pointe",
    "exampleTitle": "Exemple résolu — les courriels du service réclamations",
    "goal": "Appliquer la loi de Poisson : adapter le paramètre à la durée, calculer une probabilité élémentaire et passer au complément.",
    "brief": "<p><strong>Énoncé.</strong> Aux heures de pointe, le standard du service après-vente reçoit en moyenne <strong>2 appels par minute</strong>. On note X le nombre d’appels reçus pendant une minute donnée : X suit la loi de Poisson de paramètre λ = 2, de formule <code>P(X = k) = λ<sup>k</sup> × e<sup>(−λ)</sup> / k!</code>. On prendra <code>e<sup>(−2)</sup> = 0,135</code> et <code>e<sup>(−1)</sup> = 0,368</code> dans tous les calculs. Le tableau de bord du standard affiche de plus, pour une minute : <code>P(X = 0) = 0,135</code> et <code>P(X = 2) = 0,27</code>.</p><ol><li>Quelle est l’espérance E(X) du nombre d’appels pendant une minute ?</li><li>Sur 10 minutes, combien d’appels le standard reçoit-il en moyenne ?</li><li>Vérifier par le calcul P(X = 1) = λ × e<sup>(−λ)</sup>, en utilisant e<sup>(−2)</sup> = 0,135.</li><li>Calculer P(X ≥ 3), la probabilité de recevoir au moins 3 appels pendant une minute.</li><li>Pendant 30 secondes, le paramètre devient λ = 1 : quelle est la probabilité de ne recevoir aucun appel ?</li><li>En 20 secondes, le paramètre vaut 2/3 : le standard reçoit-il en moyenne plus d’un appel, moins d’un appel, ou exactement un appel toutes les 20 secondes ? Répondez par un seul mot : plus, moins ou un.</li></ol><p>Donnez les probabilités en décimal (au millième près, en utilisant les valeurs fournies), la valeur seule, sans texte.</p>",
    "starter": "# Exercice — Le standard du SAV aux heures de pointe\n# Lisez l’énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponse attendue : la valeur seule (décimal au millième) ; un mot pour les questions 1, 2 et 6.\n\n[Question 1 — Espérance E(X) sur une minute]\nA_COMPLETER\n\n[Question 2 — Nombre moyen d’appels sur 10 minutes]\nA_COMPLETER\n\n[Question 3 — Probabilité P(X = 1)]\nA_COMPLETER\n\n[Question 4 — Probabilité P(X ≥ 3)]\nA_COMPLETER\n\n[Question 5 — Probabilité d’aucun appel en 30 secondes]\nA_COMPLETER\n\n[Question 6 — Plus, moins ou un appel en 20 secondes]\nA_COMPLETER\n",
    "hints": [
      "Le paramètre λ est un taux moyen par intervalle : pour 10 minutes, multipliez le taux par la durée ; pour 30 secondes ou 20 secondes, adaptez la proportion (une minute = trois fois vingt secondes).",
      "Pour k = 1, la formule de Poisson se réduit à λ × e^(−λ) : remplacez λ par 2 et e^(−2) par la valeur fournie.",
      "« Au moins 3 appels » est le complément des cas 0, 1 et 2 : additionnez d’abord ces trois probabilités (deux viennent du tableau de bord, la troisième du calcul). Contrôle : la somme des quatre cas (0, 1, 2, au moins 3) doit redonner 1."
    ],
    "examples": [
      {
        "stdin": "Le service réclamations reçoit en moyenne 1 courriel par heure ; Y = nombre de courriels pendant une heure suit la loi de Poisson de paramètre λ = 1. On prendra e^(−1) = 0,368.\n\n1) E(Y) = λ = 1.\n2) Sur 4 heures : 4 × 1 = 4 courriels attendus.\n3) P(Y = 0) = e^(−1) = 0,368.\n4) P(Y = 1) = λ × e^(−λ) = 1 × 0,368 = 0,368.\n5) P(Y ≥ 2) = 1 − (0,368 + 0,368) = 0,264.",
        "expected": "E(Y) = 1 — sur 4 h : 4 courriels — P(0) = 0,368 — P(1) = 0,368 — P(≥ 2) = 0,264",
        "note": "λ suit la durée observée : le taux moyen se multiplie par le nombre d’unités de temps choisies."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Espérance E(X) sur une minute",
        "stdin": "q:1",
        "expected": "2||2,0"
      },
      {
        "label": "Question 2 — Nombre moyen d’appels sur 10 minutes",
        "stdin": "q:2",
        "expected": "20||20 appels"
      },
      {
        "label": "Question 3 — Probabilité P(X = 1)",
        "stdin": "q:3",
        "expected": "0,27||0,270||0,271"
      },
      {
        "label": "Question 4 — Probabilité P(X ≥ 3)",
        "stdin": "q:4",
        "expected": "0,325||0,323"
      },
      {
        "label": "Question 5 — Probabilité d’aucun appel en 30 secondes",
        "stdin": "q:5",
        "expected": "0,368||0,3679"
      },
      {
        "label": "Question 6 — Plus, moins ou un appel en 20 secondes",
        "stdin": "q:6",
        "expected": "moins"
      }
    ],
    "solution": "[Question 1 — Espérance E(X) sur une minute]\n2\n\n[Question 2 — Nombre moyen d’appels sur 10 minutes]\n20\n\n[Question 3 — Probabilité P(X = 1)]\n0,27\n\n[Question 4 — Probabilité P(X ≥ 3)]\n0,325\n\n[Question 5 — Probabilité d’aucun appel en 30 secondes]\n0,368\n\n[Question 6 — Plus, moins ou un appel en 20 secondes]\nmoins",
    "takeaway": "1) Pour une loi de Poisson, E(X) = λ : l’espérance vaut 2 appels par minute (et V(X) = 2 également).\n2) Le taux moyen est proportionnel à la durée : sur 10 minutes, E = 2 × 10 = 20 appels attendus.\n3) P(X = 1) = λ¹ × e^(−λ)/1! = 2 × 0,135 = 0,27 : la formule retrouve bien la valeur attendue pour le cas k = 1.\n4) P(X ≥ 3) = 1 − [P(X = 0) + P(X = 1) + P(X = 2)] = 1 − (0,135 + 0,27 + 0,27) = 1 − 0,675 = 0,325.\n5) Sur 30 secondes, le paramètre est divisé par deux : λ = 1. P(Y = 0) = e^(−1) = 0,368.\n6) Sur 20 secondes (un tiers de minute), le paramètre vaut λ = 2/3 ≈ 0,67 : en moyenne le standard reçoit moins d’un appel toutes les 20 secondes.\nContrôle : 0,135 + 0,27 + 0,27 + 0,325 = 1 — les quatre cas (0, 1, 2, au moins 3 appels) partitionnent bien toutes les minutes possibles.\nLecture métier : une minute sur trois amène au moins 3 appels — c’est aux heures de pointe qu’il faut renforcer le standard."
  }
];
