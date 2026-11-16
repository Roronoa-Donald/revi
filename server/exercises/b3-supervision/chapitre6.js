'use strict';

module.exports = [
  {
    "id": "sup3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le flapping du capteur de température de la salle serveurs Datalium",
    "exampleTitle": "Exemple résolu — le lien WAN qui clignote de l'agence BourseVoyages",
    "goal": "Reconnaître un flapping, compter les changements d'état et citer les deux techniques d'amortissement.",
    "brief": "<p><strong>Énoncé.</strong> Dans la salle serveurs de Datalium, un capteur de température est supervisé avec un seuil critique fixé à <strong>28 °C</strong> : chaque relevé au-dessus du seuil fait passer l'alerte en état actif, chaque relevé sous le seuil la résout immédiatement. Relevés effectués toutes les cinq minutes :</p><table><tr><th>Relevé</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr><tr><th>Température (°C)</th><td>27,5</td><td>28,5</td><td>27,8</td><td>28,6</td><td>27,7</td><td>28,4</td><td>27,6</td><td>28,7</td><td>27,9</td></tr></table><ol><li>Combien de relevés dépassent le seuil critique de 28 °C ?</li><li>Combien de changements d'état (allers-retours entre alerte et normal) la supervision enregistre-t-elle ?</li><li>Comment nomme-t-on cette oscillation rapide d'une alerte entre deux états ?</li><li>Quelle technique consiste à n'alerter qu'après un dépassement maintenu pendant une durée minimale ?</li><li>Quelle technique sépare le seuil de déclenchement du seuil de résolution ?</li></ol>",
    "starter": "# Exercice — Le flapping du capteur de température de la salle serveurs Datalium\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nombre seul. Questions 3, 4 et 5 : un court libellé.\n\n[Question 1 — Relevés au-dessus du seuil]\nA_COMPLETER\n\n[Question 2 — Changements d'état enregistrés]\nA_COMPLETER\n\n[Question 3 — Nom du phénomène d'oscillation]\nA_COMPLETER\n\n[Question 4 — Technique du dépassement maintenu]\nA_COMPLETER\n\n[Question 5 — Technique des deux seuils séparés]\nA_COMPLETER\n",
    "hints": [
      "Comparez chaque relevé au seuil de 28 °C et notez l'état correspondant : la série alterne régulièrement au-dessus et au-dessous.",
      "Chaque frontière entre deux relevés consécutifs d'états différents compte pour un changement d'état : comptez-les un par un.",
      "1. Repérez les relevés 28,5 ; 28,6 ; 28,4 ; 28,7. 2. Neuf relevés qui alternent donnent huit frontières. 3. Nommez l'oscillation rapide. 4. La technique filtre les pics trop courts. 5. La technique écarte le seuil d'alerte du seuil de résolution."
    ],
    "examples": [
      {
        "stdin": "Le lien WAN de l'agence BourseVoyages est supervisé sur la latence, seuil critique à 50 ms.\nRelevés : 48 ms, 55 ms, 47 ms, 56 ms, 49 ms.\n\n1) Deux relevés dépassent 50 ms (55 et 56).\n2) Les états alternent normal, alerte, normal, alerte, normal : 4 changements d'état.\n3) C'est du flapping.\n4) Un hystérésis sépare les seuils : alerter à 50 ms, ne résoudre que sous 45 ms.",
        "expected": "2 relevés au-dessus de 50 ms — 4 changements d'état — flapping — solution : alerter à 50 ms mais ne résoudre que sous 45 ms",
        "note": "Un lien qui clignote noie le NOC sous les notifications : hystérésis et temporisation sont les deux amortisseurs de référence contre la fatigue d'alerte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Relevés au-dessus du seuil",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Changements d'état enregistrés",
        "stdin": "q:2",
        "expected": "8||huit||8 changements d'état"
      },
      {
        "label": "Question 3 — Nom du phénomène d'oscillation",
        "stdin": "q:3",
        "expected": "flapping||le flapping||du flapping"
      },
      {
        "label": "Question 4 — Technique du dépassement maintenu",
        "stdin": "q:4",
        "expected": "la temporisation||temporisation||le délai de confirmation||debounce||la temporisation (debounce)"
      },
      {
        "label": "Question 5 — Technique des deux seuils séparés",
        "stdin": "q:5",
        "expected": "l'hystérésis||hystérésis||l'hysteresis||hysteresis||l'hystérésis (double seuil)"
      }
    ],
    "solution": "[Question 1 — Relevés au-dessus du seuil]\n4\n\n[Question 2 — Changements d'état enregistrés]\n8\n\n[Question 3 — Nom du phénomène d'oscillation]\nflapping\n\n[Question 4 — Technique du dépassement maintenu]\nla temporisation\n\n[Question 5 — Technique des deux seuils séparés]\nl'hystérésis",
    "takeaway": "1) Quatre relevés dépassent 28 °C : 28,5 (relevé 2), 28,6 (relevé 4), 28,4 (relevé 6) et 28,7 (relevé 8).\n2) Les neuf relevés alternent normal, alerte, normal, alerte, normal, alerte, normal, alerte, normal : 8 changements d'état.\n3) Cette oscillation rapide d'une alerte entre deux états s'appelle le flapping.\n4) La temporisation (délai de confirmation) n'alerte qu'après un dépassement maintenu pendant une durée minimale : les pics isolés sont ignorés.\n5) L'hystérésis sépare le seuil de déclenchement du seuil de résolution : l'alerte éteinte ne se rallume pas dès le premier frémissement.\nContrôle : quatre relevés au-dessus du seuil et quatre retours sous le seuil donnent exactement huit changements d'état pour neuf relevés, la signature du flapping."
  },
  {
    "id": "sup3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "La saturation du disque de la base de données SerenData",
    "exampleTitle": "Exemple résolu — le disque de l'entrepôt de données EntrepotGros",
    "goal": "Mener un capacity planning linéaire : croissance moyenne, semaines avant saturation et seuil d'alerte.",
    "brief": "<p><strong>Énoncé.</strong> La base de données SerenData vit sur un volume de <strong>2 000 Go</strong>. L'occupation actuelle est de <strong>1 250 Go</strong>. L'équipe exploitation relève l'accroissement du volume sur les quatre dernières semaines :</p><table><tr><th>Semaine</th><th>S-4</th><th>S-3</th><th>S-2</th><th>S-1</th></tr><tr><th>Croissance (Go)</th><td>+45</td><td>+50</td><td>+42</td><td>+43</td></tr></table><p>Hypothèse de travail : la croissance reste linéaire, égale à la moyenne des quatre semaines. Le seuil d'alerte disque est fixé à <strong>85 % du volume total</strong>.</p><ol><li>Quelle est la croissance moyenne par semaine, en Go ?</li><li>Quel est l'espace encore libre, en Go ?</li><li>Combien de semaines complètes peuvent s'écouler avant saturation du volume ?</li><li>Quelle est la croissance moyenne par jour, arrondie à 2 décimales (en Go) ?</li><li>À combien de Go utilisés correspond le seuil d'alerte de 85 % ?</li></ol>",
    "starter": "# Exercice — La saturation du disque de la base de données SerenData\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses sont des nombres seuls.\n\n[Question 1 — Croissance moyenne hebdomadaire (en Go)]\nA_COMPLETER\n\n[Question 2 — Espace libre (en Go)]\nA_COMPLETER\n\n[Question 3 — Semaines complètes avant saturation]\nA_COMPLETER\n\n[Question 4 — Croissance moyenne par jour (en Go, 2 décimales)]\nA_COMPLETER\n\n[Question 5 — Seuil d'alerte 85 % (en Go utilisés)]\nA_COMPLETER\n",
    "hints": [
      "La croissance moyenne est la somme des quatre accroissements divisée par quatre.",
      "Divisez l'espace libre par la croissance hebdomadaire et prenez la partie entière : la semaine où le disque déborde ne compte pas comme semaine complète.",
      "1. Moyenne = (45 + 50 + 42 + 43) / 4. 2. Libre = 2 000 − 1 250. 3. Partie entière de 750 / 45. 4. Divisez la croissance hebdomadaire par 7. 5. Le seuil s'applique au volume total : 0,85 × 2 000."
    ],
    "examples": [
      {
        "stdin": "L'entrepôt de données EntrepotGros occupe 3 100 Go d'un volume de 4 000 Go.\nCroissances des quatre dernières semaines : +60, +70, +55, +75 Go.\nSeuil d'alerte à 85 % du volume total.\n\n1) Croissance moyenne : (60 + 70 + 55 + 75) / 4 = 65 Go par semaine.\n2) Espace libre : 4 000 − 3 100 = 900 Go.\n3) 900 / 65 = 13,8 : 13 semaines complètes avant saturation.\n4) Par jour : 65 / 7 = 9,29 Go.\n5) Seuil : 0,85 × 4 000 = 3 400 Go utilisés.",
        "expected": "croissance 65 Go par semaine — 900 Go libres — 13 semaines complètes — 9,29 Go par jour — seuil à 3 400 Go",
        "note": "La partie entière compte les semaines entièrement écoulées : à la fin de la 13e semaine il reste de la place, la 14e sature le volume."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Croissance moyenne hebdomadaire (en Go)",
        "stdin": "q:1",
        "expected": "45||45 go||45 Go"
      },
      {
        "label": "Question 2 — Espace libre (en Go)",
        "stdin": "q:2",
        "expected": "750||750 go||750 Go"
      },
      {
        "label": "Question 3 — Semaines complètes avant saturation",
        "stdin": "q:3",
        "expected": "16||16 semaines||seize semaines"
      },
      {
        "label": "Question 4 — Croissance moyenne par jour (en Go, 2 décimales)",
        "stdin": "q:4",
        "expected": "6,43||6.43"
      },
      {
        "label": "Question 5 — Seuil d'alerte 85 % (en Go utilisés)",
        "stdin": "q:5",
        "expected": "1700||1 700||1700 go||1 700 go"
      }
    ],
    "solution": "[Question 1 — Croissance moyenne hebdomadaire (en Go)]\n45\n\n[Question 2 — Espace libre (en Go)]\n750\n\n[Question 3 — Semaines complètes avant saturation]\n16\n\n[Question 4 — Croissance moyenne par jour (en Go, 2 décimales)]\n6,43\n\n[Question 5 — Seuil d'alerte 85 % (en Go utilisés)]\n1700",
    "takeaway": "1) Croissance moyenne : (45 + 50 + 42 + 43) / 4 = 180 / 4 = 45 Go par semaine.\n2) Espace libre : 2 000 − 1 250 = 750 Go.\n3) 750 / 45 = 16,67 : seize semaines complètes peuvent s'écouler ; la dix-septième sature le volume.\n4) Croissance journalière : 45 / 7 = 6,43 Go par jour.\n5) Seuil d'alerte : 0,85 × 2 000 = 1 700 Go utilisés, soit 300 Go de marge au-dessus de l'occupation actuelle.\nContrôle : seize semaines × 45 Go = 720 Go consommés ; il reste alors 30 Go, et la dix-septième semaine de 45 Go fait déborder le volume."
  },
  {
    "id": "sup3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La panne détectée trop tard : le cache Redis de MediaPlace",
    "exampleTitle": "Exemple résolu — la passerelle d'API de VoyageDirect",
    "goal": "Analyser le post-mortem d'une panne détectée tardivement et évaluer le gain d'une auto-remédiation.",
    "brief": "<p><strong>Énoncé.</strong> La plateforme de médias en ligne MediaPlace a subi un incident sur son cache Redis un dimanche matin. Chronologie établie au post-mortem :</p><table><tr><th>Heure</th><th>Événement</th></tr><tr><th>02 h 20</th><td>le cache Redis cesse de répondre ; les pages des internautes mettent trois fois plus de temps à charger</td></tr><tr><th>03 h 05</th><td>un internaute appelle le support ; l'ingénieur d'astreinte est prévenu manuellement</td></tr><tr><th>03 h 12</th><td>l'ingénieur exécute le runbook : redémarrage du service Redis</td></tr><tr><th>03 h 15</th><td>service rétabli, latence revenue à la normale</td></tr></table><p>Constat du post-mortem : la supervision surveillait le processus Redis (présent en mémoire) mais aucune sonde ne mesurait la latence réelle des réponses. Politique d'auto-remédiation envisagée : si la latence dépasse 2 secondes pendant 5 minutes, redémarrage automatique du service, opération qui dure 3 minutes.</p><ol><li>Combien de temps les utilisateurs ont-ils été impactés ?</li><li>Combien de temps après le début de l'incident l'équipe a-t-elle été prévenue ?</li><li>Quelle métrique manquait à la supervision pour détecter la panne dès 02 h 20 ?</li><li>Avec l'automatisation, à quelle heure le service aurait-il été rétabli ?</li><li>Combien de minutes d'impact l'automatisation aurait-elle évitées ?</li></ol>",
    "starter": "# Exercice — La panne détectée trop tard : le cache Redis de MediaPlace\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 5 : le nombre de minutes. Question 3 : un court libellé. Question 4 : l'heure au format 02 h 28.\n\n[Question 1 — Durée d'impact utilisateur (en minutes)]\nA_COMPLETER\n\n[Question 2 — Délai de prévention de l'équipe (en minutes)]\nA_COMPLETER\n\n[Question 3 — Métrique manquante dans la supervision]\nA_COMPLETER\n\n[Question 4 — Heure de rétablissement avec l'automatisation]\nA_COMPLETER\n\n[Question 5 — Minutes d'impact évitées]\nA_COMPLETER\n",
    "hints": [
      "L'impact utilisateur court du premier symptôme (02 h 20) au rétablissement complet (03 h 15).",
      "Un processus présent en mémoire n'est pas un service qui répond : surveillez ce que vit l'utilisateur, pas seulement ce que voit le système.",
      "1. De 02 h 20 à 03 h 15. 2. De 02 h 20 à 03 h 05. 3. Ce que les internautes subissent et qu'aucune sonde ne mesurait. 4. Détection à 02 h 25 (5 minutes), redémarrage de 3 minutes. 5. Comparez l'impact réel et l'impact automatisé."
    ],
    "examples": [
      {
        "stdin": "La passerelle d'API de VoyageDirect a bloqué le renouvellement des jetons d'authentification\nà 21 h 30 : les clients recevaient des pages d'erreur. Le support s'en est aperçu à 22 h 10\net le service a été rétabli à 22 h 20.\nAutomatisation envisagée : si le taux d'erreurs dépasse 5 % pendant 4 minutes,\npurge et rechargement de la passerelle en 4 minutes.\n\n1) Impact : de 21 h 30 à 22 h 20 = 50 minutes.\n2) Prévention : 40 minutes après le début.\n3) Métrique manquante : le taux d'erreurs des réponses.\n4) Automatisé : détection à 21 h 34, rétablissement à 21 h 38.\n5) Évité : 50 − 8 = 42 minutes.",
        "expected": "impact 50 minutes — prévention après 40 minutes — métrique manquante : le taux d'erreurs — rétablissement automatisé à 21 h 38 — 42 minutes évitées",
        "note": "Une panne détectée par les clients plutôt que par la supervision coûte toujours plus cher : la métrique manquante du post-mortem devient la première sonde à déployer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Durée d'impact utilisateur (en minutes)",
        "stdin": "q:1",
        "expected": "55||55 minutes||55 min"
      },
      {
        "label": "Question 2 — Délai de prévention de l'équipe (en minutes)",
        "stdin": "q:2",
        "expected": "45||45 minutes||45 min"
      },
      {
        "label": "Question 3 — Métrique manquante dans la supervision",
        "stdin": "q:3",
        "expected": "la latence||latence||le temps de réponse||la latence (le temps de réponse)"
      },
      {
        "label": "Question 4 — Heure de rétablissement avec l'automatisation",
        "stdin": "q:4",
        "expected": "02:28||02h28||02 h 28||2h28"
      },
      {
        "label": "Question 5 — Minutes d'impact évitées",
        "stdin": "q:5",
        "expected": "47||47 minutes||47 min"
      }
    ],
    "solution": "[Question 1 — Durée d'impact utilisateur (en minutes)]\n55\n\n[Question 2 — Délai de prévention de l'équipe (en minutes)]\n45\n\n[Question 3 — Métrique manquante dans la supervision]\nla latence\n\n[Question 4 — Heure de rétablissement avec l'automatisation]\n02:28\n\n[Question 5 — Minutes d'impact évitées]\n47",
    "takeaway": "1) L'impact court de 02 h 20 à 03 h 15 : 55 minutes pour les utilisateurs.\n2) L'équipe a été prévenue à 03 h 05, soit 45 minutes après le début de l'incident.\n3) La supervision ne mesurait pas la latence (le temps de réponse) du service : le processus était présent, mais il ne répondait plus.\n4) Avec l'automatisation : latence anormale constatée à 02 h 25 (5 minutes de maintien), puis redémarrage de 3 minutes : service rétabli à 02 h 28.\n5) Impact réel : 55 minutes ; impact automatisé : 8 minutes ; l'automatisation aurait évité 47 minutes d'impact.\nContrôle : 5 minutes de détection + 3 minutes de redémarrage = 8 minutes, et 55 − 8 = 47 minutes : les deux résultats se recoupent."
  }
];
