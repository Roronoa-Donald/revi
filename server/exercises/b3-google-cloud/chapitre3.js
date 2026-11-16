'use strict';

module.exports = [
  {
    "id": "gcp3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Dimensionner et chiffrer les VM de Bistronomie",
    "exampleTitle": "Exemple résolu — les serveurs de Vertigo Studio",
    "goal": "Lire les caractéristiques des familles de machines Compute Engine et calculer un coût mensuel à partir du prix horaire.",
    "brief": "<p><strong>Énoncé.</strong> Bistronomie, plateforme tourangelle de click &amp; collect pour restaurants, héberge son API de commandes sur Compute Engine, en région europe-west9. Les machines tournent 24 h/24 ; le mois de référence compte <strong>730 heures</strong>. Les types de machines retenus et les tarifs horaires fournis par le service financier sont :</p><table><tr><th>Type de machine</th><th>vCPU</th><th>RAM (Go)</th><th>Prix horaire</th></tr><tr><th>e2-medium</th><td>2</td><td>4</td><td>0,034 $</td></tr><tr><th>e2-standard-2</th><td>2</td><td>8</td><td>0,067 $</td></tr><tr><th>e2-standard-4</th><td>4</td><td>16</td><td>0,134 $</td></tr></table><p>L'API de production exige une e2-standard-4 ; le serveur de démonstration peut se contenter d'une e2-standard-2 ; la VM de veille technologique tourne sur une e2-medium.</p><ol><li>Combien de vCPU possède une e2-standard-4 ?</li><li>Quel est le coût mensuel, en dollars, de l'API de production (e2-standard-4 en continu) ?</li><li>Quel est le coût mensuel du serveur de démonstration (e2-standard-2 en continu) ?</li><li>Quel est le coût mensuel de la VM de veille (e2-medium en continu) ?</li><li>Le serveur de démonstration passe d'une e2-standard-4 à une e2-standard-2 : quelle économie mensuelle, en dollars, ce repli procure-t-il ?</li></ol>",
    "starter": "# Exercice — Dimensionner et chiffrer les VM de Bistronomie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses sont des nombres : vCPU, puis dollars (arrondis au centime).\n\n[Question 1 — vCPU d'une e2-standard-4]\nA_COMPLETER\n\n[Question 2 — Coût mensuel de l'API de production (e2-standard-4)]\nA_COMPLETER\n\n[Question 3 — Coût mensuel du serveur de démonstration (e2-standard-2)]\nA_COMPLETER\n\n[Question 4 — Coût mensuel de la VM de veille (e2-medium)]\nA_COMPLETER\n\n[Question 5 — Économie mensuelle du repli e2-standard-4 vers e2-standard-2]\nA_COMPLETER\n",
    "hints": [
      "Le coût mensuel d'une machine en continu s'obtient en multipliant le prix horaire par le nombre d'heures du mois.",
      "L'économie d'un repli de gamme se calcule par différence entre les deux coûts mensuels.",
      "1. Lisez la colonne vCPU du tableau. 2. 730 × 0,134. 3. 730 × 0,067. 4. 730 × 0,034. 5. Soustrayez le coût de la petite machine à celui de la grande."
    ],
    "examples": [
      {
        "stdin": "Vertigo Studio, tournages de drone dans les Alpes, exploite trois VM 24 h/24 (mois de 730 heures) :\n- vm-montage : 0,20 $/h ;\n- vm-tests : 0,10 $/h ;\n- vm-mini : 0,05 $/h.\n\n1) vm-montage : 730 × 0,20 = 146,00 $/mois.\n2) vm-tests : 730 × 0,10 = 73,00 $/mois.\n3) vm-mini : 730 × 0,05 = 36,50 $/mois.\n4) Remplacer vm-montage par une machine à 0,10 $/h économise 146,00 − 73,00 = 73,00 $/mois.",
        "expected": "montage : 146 $ — tests : 73 $ — mini : 36,50 $ — économie : 73 $",
        "note": "Une VM arrêtée ne coûte plus de calcul, mais ses disques persistants restent facturés : le repli de gamme se raisonne machine par machine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — vCPU d'une e2-standard-4",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Coût mensuel de l'API de production (e2-standard-4)",
        "stdin": "q:2",
        "expected": "97,82||97.82||97,8"
      },
      {
        "label": "Question 3 — Coût mensuel du serveur de démonstration (e2-standard-2)",
        "stdin": "q:3",
        "expected": "48,91||48.91"
      },
      {
        "label": "Question 4 — Coût mensuel de la VM de veille (e2-medium)",
        "stdin": "q:4",
        "expected": "24,82||24.82"
      },
      {
        "label": "Question 5 — Économie mensuelle du repli e2-standard-4 vers e2-standard-2",
        "stdin": "q:5",
        "expected": "48,91||48.91"
      }
    ],
    "solution": "[Question 1 — vCPU d'une e2-standard-4]\n4\n\n[Question 2 — Coût mensuel de l'API de production (e2-standard-4)]\n97,82\n\n[Question 3 — Coût mensuel du serveur de démonstration (e2-standard-2)]\n48,91\n\n[Question 4 — Coût mensuel de la VM de veille (e2-medium)]\n24,82\n\n[Question 5 — Économie mensuelle du repli e2-standard-4 vers e2-standard-2]\n48,91",
    "takeaway": "1) Une e2-standard-4 offre 4 vCPU (et 16 Go de RAM).\n2) API de production : 730 × 0,134 = 97,82 $ par mois.\n3) Serveur de démonstration : 730 × 0,067 = 48,91 $ par mois.\n4) VM de veille : 730 × 0,034 = 24,82 $ par mois.\n5) Économie du repli : 97,82 − 48,91 = 48,91 $ par mois — exactement le prix de la petite machine.\nContrôle : 48,91 + 24,82 = 73,73 $ pour la démonstration et la veille réunies, soit moins que la seule machine de production."
  },
  {
    "id": "gcp3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'auto-scaling du MIG de Festilia",
    "exampleTitle": "Exemple résolu — l'auto-scaling de TalentBridge",
    "goal": "Calculer la capacité cible d'un groupe d'instances géré avec auto-scaling CPU et respecter les bornes min et max.",
    "brief": "<p><strong>Énoncé.</strong> Festilia, billetterie toulousaine de festivals, absorbe les mises en vente avec un groupe d'instances géré (MIG) doté d'un auto-scaling basé sur une <strong>CPU cible de 60 %</strong>, avec les bornes <strong>minimum 3</strong> et <strong>maximum 15</strong> instances. Rappel du cours : la capacité cible se calcule ainsi : capacité actuelle × CPU observée ÷ CPU cible, arrondie à l'entier supérieur.</p><p>Trois situations sont observées :</p><ul><li><strong>Montée :</strong> 8 instances tournent à 75 % de CPU moyenne ;</li><li><strong>Pointe d'ouverture :</strong> 12 instances tournent à 80 % de CPU moyenne ;</li><li><strong>Détente :</strong> 10 instances retombent à 45 % de CPU moyenne.</li></ul><ol><li>Quelle capacité cible l'auto-scaler calcule-t-il en montée (8 instances à 75 %) ?</li><li>En pointe, la formule demande 16 instances : combien le MIG peut-il en exécuter au maximum ?</li><li>Quelle capacité cible la formule donne-t-elle en détente (10 instances à 45 %), arrondie à l'entier supérieur ?</li><li>La charge s'effondre à 5 % : le MIG peut-il descendre sous 3 instances ?</li><li>Que fait automatiquement le MIG lorsqu'une de ses instances ne répond plus au health check ?</li></ol>",
    "starter": "# Exercice — L'auto-scaling du MIG de Festilia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre d'instances. Question 4 : oui ou non. Question 5 : réponse courte.\n\n[Question 1 — Capacité cible en montée]\nA_COMPLETER\n\n[Question 2 — Capacité plafonnée en pointe]\nA_COMPLETER\n\n[Question 3 — Capacité cible en détente]\nA_COMPLETER\n\n[Question 4 — Descente sous 3 instances possible ?]\nA_COMPLETER\n\n[Question 5 — Réaction du MIG à une instance défaillante]\nA_COMPLETER\n",
    "hints": [
      "Appliquez la formule capacité actuelle × CPU observée ÷ CPU cible, puis arrondissez à l'entier supérieur.",
      "La capacité calculée ne sort jamais de l'intervalle [minimum ; maximum] : confrontez toujours le résultat aux bornes.",
      "1. 8 × 75 ÷ 60. 2. La formule demande 16, mais la borne maximum est 15. 3. 10 × 45 ÷ 60 = 7,5. 4. La borne minimum protège un socle d'instances. 5. L'auto-healing fait vivre le MIG, pas seulement l'auto-scaling."
    ],
    "examples": [
      {
        "stdin": "TalentBridge, plateforme de recrutement, exploite un MIG avec CPU cible 50 %,\nbornes min 4 et max 10.\n- Montée : 6 instances à 75 % → 6 × 75 ÷ 50 = 9 instances.\n- Pointe : 10 instances à 80 % → 10 × 80 ÷ 50 = 16 demandées, plafonnées à 10.\n- Détente : 4 instances à 25 % → 4 × 25 ÷ 50 = 2, mais la borne minimum impose 4.\n- Une instance défaillante est recréée automatiquement (auto-healing).\n\n1) Montée : 9 instances.\n2) Pointe : 10 instances (plafond max).\n3) Détente : le calcul donne 2, la borne min impose 4.\n4) Non, jamais sous 4 instances.\n5) Le MIG la recrée automatiquement.",
        "expected": "montée : 9 — pointe : 10 (plafond) — détente : 4 (plancher) — jamais sous 4 — recréation automatique",
        "note": "Les bornes min et max transforment le calcul brut en décision encadrée : l'auto-scaler ne fait jamais sortir la flotte de l'intervalle défini."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Capacité cible en montée",
        "stdin": "q:1",
        "expected": "10"
      },
      {
        "label": "Question 2 — Capacité plafonnée en pointe",
        "stdin": "q:2",
        "expected": "15"
      },
      {
        "label": "Question 3 — Capacité cible en détente",
        "stdin": "q:3",
        "expected": "8"
      },
      {
        "label": "Question 4 — Descente sous 3 instances possible ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Réaction du MIG à une instance défaillante",
        "stdin": "q:5",
        "expected": "il la recrée||la recrée||il la recrée automatiquement||il la remplace||la remplace automatiquement||il recrée l instance||recrée automatiquement une instance"
      }
    ],
    "solution": "[Question 1 — Capacité cible en montée]\n10\n\n[Question 2 — Capacité plafonnée en pointe]\n15\n\n[Question 3 — Capacité cible en détente]\n8\n\n[Question 4 — Descente sous 3 instances possible ?]\nnon\n\n[Question 5 — Réaction du MIG à une instance défaillante]\nil la recrée",
    "takeaway": "1) Montée : 8 × 75 ÷ 60 = 10, donc 10 instances.\n2) La formule demande 12 × 80 ÷ 60 = 16 instances, mais la borne maximum limite le MIG à 15 instances.\n3) Détente : 10 × 45 ÷ 60 = 7,5, arrondi à l'entier supérieur : 8 instances.\n4) Non : la borne minimum de 3 instances interdit de descendre plus bas, même à 5 % de charge.\n5) Grâce à l'auto-healing, le MIG recrée automatiquement l'instance défaillante, dans une zone saine si possible.\nContrôle : en montée, 10 instances à 60 % offrent la même capacité totale que 8 instances à 75 % (10 × 60 = 600 = 8 × 75)."
  },
  {
    "id": "gcp3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Serverless : Cloud Run et App Engine pour SnapPhoto",
    "exampleTitle": "Exemple résolu — le service d'AquaQuiz",
    "goal": "Dimensionner le nombre d'instances d'un service Cloud Run selon la simultanéité et choisir le bon service serverless.",
    "brief": "<p><strong>Énoncé.</strong> SnapPhoto, imprimeur photo lillois, a conteneurisé son service de retouche avec Docker et prépare le Black Friday. Le service Cloud Run est configuré avec <strong>40 requêtes simultanées par instance</strong> (concurrency) et <strong>2 instances minimum</strong> pour éviter les démarrages à froid. Les prévisions de trafic : un pic de <strong>600 requêtes par seconde</strong> le jour de l'événement, et environ 80 requêtes par seconde en trafic habituel.</p><p>L'équipe hésite aussi entre Cloud Run, qui exécute directement un conteneur, et App Engine, qui déploie du code avec un fichier <code>app.yaml</code> et des versions nommées.</p><ol><li>Combien d'instances faut-il au pic pour absorber 600 requêtes/s avec 40 requêtes simultanées par instance ?</li><li>La concurrency est portée à 80 requêtes simultanées par instance : combien d'instances suffisent alors au pic ?</li><li>Combien d'instances restent garanties en permanence grâce au paramètre minimum ?</li><li>Quel service managé exécute directement le conteneur Docker de SnapPhoto ?</li><li>Quel service serverless historique déploie du code sans conteneur, piloté par un fichier app.yaml ?</li><li>Cloud Run peut-il réduire le service à zéro instance hors trafic, pour n'être presque plus facturé ?</li></ol>",
    "starter": "# Exercice — Serverless : Cloud Run et App Engine pour SnapPhoto\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul. Questions 4 et 5 : le nom du service. Question 6 : oui ou non.\n\n[Question 1 — Instances nécessaires au pic (40 requêtes par instance)]\nA_COMPLETER\n\n[Question 2 — Instances nécessaires au pic (80 requêtes par instance)]\nA_COMPLETER\n\n[Question 3 — Instances garanties en permanence]\nA_COMPLETER\n\n[Question 4 — Service exécutant le conteneur Docker]\nA_COMPLETER\n\n[Question 5 — Service déployant du code via app.yaml]\nA_COMPLETER\n\n[Question 6 — Réduction à zéro instance hors trafic possible ?]\nA_COMPLETER\n",
    "hints": [
      "Le nombre d'instances nécessaires est le débit total divisé par la capacité d'une instance, arrondi à l'entier supérieur.",
      "Augmenter la concurrency réduit le nombre d'instances nécessaires pour un même débit : c'est l'avantage de Cloud Run face à une machine par requête.",
      "1. 600 ÷ 40. 2. 600 ÷ 80 = 7,5. 3. Relisez le paramètre minimum. 4. L'un des deux services est spécialisé dans les conteneurs. 5. L'autre est le service serverless originel de Google Cloud. 6. Sans minimum, Cloud Run supprime les instances inactives."
    ],
    "examples": [
      {
        "stdin": "AquaQuiz, jeux quiz en ligne, expose un service conteneurisé sur Cloud Run :\n30 requêtes simultanées par instance, 3 instances minimum. Pic : 900 requêtes/s.\n\n1) Instances au pic : 900 ÷ 30 = 30.\n2) Avec 90 requêtes par instance : 900 ÷ 90 = 10 instances.\n3) 3 instances restent garanties en permanence.\n4) Le conteneur s'exécute sur Cloud Run.\n5) Le code sans conteneur avec app.yaml, c'est App Engine.\n6) Oui, sans minimum, Cloud Run peut descendre à zéro instance.",
        "expected": "pic : 30 instances — à 90 requêtes par instance : 10 — minimum garanti : 3 — conteneur : Cloud Run — app.yaml : App Engine — zéro instance possible",
        "note": "Une concurrency plus élevée concentre le trafic sur moins d'instances : le même pic coûte moins cher, à condition que l'instance supporte la charge."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Instances nécessaires au pic (40 requêtes par instance)",
        "stdin": "q:1",
        "expected": "15"
      },
      {
        "label": "Question 2 — Instances nécessaires au pic (80 requêtes par instance)",
        "stdin": "q:2",
        "expected": "8"
      },
      {
        "label": "Question 3 — Instances garanties en permanence",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Service exécutant le conteneur Docker",
        "stdin": "q:4",
        "expected": "Cloud Run||cloud run"
      },
      {
        "label": "Question 5 — Service déployant du code via app.yaml",
        "stdin": "q:5",
        "expected": "App Engine||app engine"
      },
      {
        "label": "Question 6 — Réduction à zéro instance hors trafic possible ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Instances nécessaires au pic (40 requêtes par instance)]\n15\n\n[Question 2 — Instances nécessaires au pic (80 requêtes par instance)]\n8\n\n[Question 3 — Instances garanties en permanence]\n2\n\n[Question 4 — Service exécutant le conteneur Docker]\nCloud Run\n\n[Question 5 — Service déployant du code via app.yaml]\nApp Engine\n\n[Question 6 — Réduction à zéro instance hors trafic possible ?]\noui",
    "takeaway": "1) Au pic : 600 ÷ 40 = 15 instances.\n2) Avec une concurrency de 80 : 600 ÷ 80 = 7,5, arrondi à 8 instances.\n3) Le paramètre minimum garantit 2 instances en permanence, quel que soit le trafic.\n4) Cloud Run exécute directement le conteneur Docker, sans machine virtuelle à gérer.\n5) App Engine déploie du code sans conteneur, piloté par le fichier app.yaml, avec des versions nommées.\n6) Oui : sans instance minimum, Cloud Run peut descendre à zéro instance inactive et n'est alors presque plus facturé.\nContrôle : 15 instances × 40 requêtes = 600 requêtes/s exactement ; 8 × 80 = 640, de quoi absorber les à-coups au-delà du pic prévu."
  }
];
