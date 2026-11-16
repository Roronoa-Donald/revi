'use strict';

module.exports = [
  {
    "id": "do3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le budget d'erreur de la plateforme VidéoStream",
    "exampleTitle": "Exemple résolu — le budget d'erreur de RadioWeb",
    "goal": "Calculer le budget d'erreur d'un SLO, sa consommation et son reste à partir d'un volume de requêtes réel.",
    "brief": "<p><strong>Énoncé.</strong> VidéoStream exploite une plateforme de vidéo à la demande. Son contrat de fiabilité fixe un SLO de <strong>99,9 % de requêtes réussies</strong> sur une fenêtre glissante de <strong>30 jours</strong>. Le SLI retenu est la part de requêtes réussies. Sur la dernière fenêtre, la plateforme a servi <strong>3 600 000 requêtes</strong>, dont <strong>2 700 ont échoué</strong>. Le budget d'erreur est la part de pannes tolérée : 100 % − SLO, appliquée au volume total.</p><p>Répondez par la valeur seule ; les pourcentages se donnent à l'unité près.</p><ol><li>Quel est le budget d'erreur mensuel, en nombre de requêtes ?</li><li>Combien de requêtes ont réussi ?</li><li>Quel pourcentage du budget a été consommé ?</li><li>Combien de requêtes en échec reste-t-il avant d'épuiser le budget ?</li><li>Le SLO est-il respecté (oui ou non) ?</li><li>Que signifie l'acronyme SLI ?</li></ol>",
    "starter": "# Exercice — Le budget d'erreur de la plateforme VidéoStream\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Budget d'erreur mensuel en requêtes]\nA_COMPLETER\n\n[Question 2 — Requêtes ayant réussi]\nA_COMPLETER\n\n[Question 3 — Pourcentage du budget consommé]\nA_COMPLETER\n\n[Question 4 — Budget restant en requêtes]\nA_COMPLETER\n\n[Question 5 — SLO respecté ?]\nA_COMPLETER\n\n[Question 6 — Signification de SLI]\nA_COMPLETER\n",
    "hints": [
      "Le budget d'erreur traduit le SLO en une quantité de pannes tolérée sur la fenêtre.",
      "Budget = (100 % − SLO) × volume total ; consommation = échecs observés / budget × 100.",
      "1. Calculez 0,1 % de 3 600 000. 2. Soustrayez les échecs du volume total. 3. Divisez 2 700 par le budget. 4. Soustrayez les échecs du budget. 5. Comparez le taux de réussite réel à 99,9 %. 6. SLI : service level indicator."
    ],
    "examples": [
      {
        "stdin": "RadioWeb (radios en ligne) : SLO de 99,5 % de requêtes réussies sur 30 jours ; 2 000 000 requêtes servies, dont 8 000 en échec.\n\n1) Budget : 0,5 % × 2 000 000 = 10 000 requêtes.\n2) Réussies : 2 000 000 − 8 000 = 1 992 000.\n3) Consommation : 8 000 / 10 000 × 100 = 80 %.\n4) Restant : 10 000 − 8 000 = 2 000 requêtes.\n5) Taux de réussite : 99,6 % ≥ 99,5 % : oui.\n6) SLI : service level indicator (indicateur de niveau de service).",
        "expected": "10 000 — 1 992 000 — 80 % — 2 000 — oui — service level indicator",
        "note": "Tant que le budget n'est pas épuisé, l'équipe peut déployer ; au-delà, la fiabilité reprend la priorité."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Budget d'erreur mensuel en requêtes",
        "stdin": "q:1",
        "expected": "3600||3 600"
      },
      {
        "label": "Question 2 — Requêtes ayant réussi",
        "stdin": "q:2",
        "expected": "3597300||3 597 300"
      },
      {
        "label": "Question 3 — Pourcentage du budget consommé",
        "stdin": "q:3",
        "expected": "75||75%||75 %"
      },
      {
        "label": "Question 4 — Budget restant en requêtes",
        "stdin": "q:4",
        "expected": "900"
      },
      {
        "label": "Question 5 — SLO respecté ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Signification de SLI",
        "stdin": "q:6",
        "expected": "indicateur de niveau de service||service level indicator||indicateur du niveau de service"
      }
    ],
    "solution": "[Question 1 — Budget d'erreur mensuel en requêtes]\n3600\n\n[Question 2 — Requêtes ayant réussi]\n3597300\n\n[Question 3 — Pourcentage du budget consommé]\n75\n\n[Question 4 — Budget restant en requêtes]\n900\n\n[Question 5 — SLO respecté ?]\noui\n\n[Question 6 — Signification de SLI]\nindicateur de niveau de service",
    "takeaway": "1) Budget d'erreur : (100 % − 99,9 %) × 3 600 000 = 0,1 % × 3 600 000 = 3 600 requêtes.\n2) Requêtes réussies : 3 600 000 − 2 700 = 3 597 300.\n3) Budget consommé : 2 700 / 3 600 × 100 = 75 %.\n4) Budget restant : 3 600 − 2 700 = 900 requêtes en échec tolérées.\n5) Taux de réussite réel : 3 597 300 / 3 600 000 × 100 = 99,925 %, supérieur à 99,9 % : le SLO est respecté.\n6) SLI signifie service level indicator : l'indicateur de niveau de service sur lequel le SLO s'appuie.\nContrôle : budget consommé + budget restant = 2 700 + 900 = 3 600 requêtes, soit tout le budget."
  },
  {
    "id": "do3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le budget d'erreur du service de paiement FlotteBank",
    "exampleTitle": "Exemple résolu — le budget d'erreur de MessageriePro",
    "goal": "Suivre la consommation du budget d'erreur d'un SLO de disponibilité et appliquer la politique de gel des déploiements.",
    "brief": "<p><strong>Énoncé.</strong> FlotteBank exploite son service de paiement avec un SLO de disponibilité de <strong>99,95 %</strong>. La fenêtre glissante couvre <strong>30 jours</strong>, soit <strong>43 200 minutes</strong>. Ce mois-ci, l'équipe a enregistré <strong>3 incidents</strong> totalisant <strong>14 minutes</strong> d'indisponibilité. Politique SRE interne : les déploiements sont gelés dès que le budget est épuisé ; une vigilance renforcée est déclenchée à partir de <strong>80 %</strong> du budget consommé. Répondez par la valeur seule (à une décimale près si nécessaire).</p><ol><li>Quel est le budget d'erreur mensuel (en minutes) ?</li><li>Quelle est l'indisponibilité totale du mois (en minutes) ?</li><li>Quel est le budget restant (en minutes) ?</li><li>Quel pourcentage du budget a été consommé (à une décimale) ?</li><li>L'équipe peut-elle encore déployer sans restriction (oui ou non) ?</li><li>Un quatrième incident de 10 minutes survient : quelle politique SRE l'équipe doit-elle appliquer ?</li></ol>",
    "starter": "# Exercice — Le budget d'erreur du service de paiement FlotteBank\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Budget d'erreur mensuel en minutes]\nA_COMPLETER\n\n[Question 2 — Indisponibilité du mois en minutes]\nA_COMPLETER\n\n[Question 3 — Budget restant en minutes]\nA_COMPLETER\n\n[Question 4 — Pourcentage du budget consommé]\nA_COMPLETER\n\n[Question 5 — Déploiements encore autorisés ?]\nA_COMPLETER\n\n[Question 6 — Politique après le quatrième incident]\nA_COMPLETER\n",
    "hints": [
      "Le budget d'erreur de disponibilité est l'indisponibilité tolérée : (100 % − SLO) × durée de la fenêtre.",
      "Consommation = indisponibilité / budget × 100 ; le reste est la différence entre les deux.",
      "1. Calculez 0,05 % de 43 200. 2. Relevez l'indisponibilité observée. 3. Soustrayez 14 du budget. 4. Divisez 14 par le budget. 5. Comparez au seuil de vigilance de 80 %. 6. Un nouvel incident de 10 minutes fait basculer le total au-delà du budget."
    ],
    "examples": [
      {
        "stdin": "MessageriePro (messagerie d'entreprise) : SLO de disponibilité de 99,9 % sur 30 jours (43 200 minutes) ; indisponibilité de 50 minutes ce mois-ci.\n\n1) Budget : 0,1 % × 43 200 = 43,2 minutes.\n2) Indisponibilité : 50 minutes.\n3) Restant : 43,2 − 50 = −6,8 minutes, budget dépassé.\n4) Consommation : 50 / 43,2 × 100 = 115,7 %.\n5) Déploiements : non.\n6) Politique : gel des déploiements.",
        "expected": "43,2 min — 50 min — −6,8 min — 115,7 % — non — gel des déploiements",
        "note": "Un budget négatif signifie que le SLO est déjà violé : la fiabilité reprend la priorité sur les nouveautés."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Budget d'erreur mensuel en minutes",
        "stdin": "q:1",
        "expected": "21,6||21.6"
      },
      {
        "label": "Question 2 — Indisponibilité du mois en minutes",
        "stdin": "q:2",
        "expected": "14"
      },
      {
        "label": "Question 3 — Budget restant en minutes",
        "stdin": "q:3",
        "expected": "7,6||7.6"
      },
      {
        "label": "Question 4 — Pourcentage du budget consommé",
        "stdin": "q:4",
        "expected": "64,8||64.8||64,8%||64.8%||64,8 %||64.8 %"
      },
      {
        "label": "Question 5 — Déploiements encore autorisés ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Politique après le quatrième incident",
        "stdin": "q:6",
        "expected": "gel des deploiements||arret des deploiements||geler les deploiements||le gel des deploiements||gel||freeze"
      }
    ],
    "solution": "[Question 1 — Budget d'erreur mensuel en minutes]\n21,6\n\n[Question 2 — Indisponibilité du mois en minutes]\n14\n\n[Question 3 — Budget restant en minutes]\n7,6\n\n[Question 4 — Pourcentage du budget consommé]\n64,8\n\n[Question 5 — Déploiements encore autorisés ?]\noui\n\n[Question 6 — Politique après le quatrième incident]\ngel des deploiements",
    "takeaway": "1) Budget d'erreur : (100 % − 99,95 %) × 43 200 = 0,05 % × 43 200 = 21,6 minutes.\n2) Indisponibilité du mois : 14 minutes.\n3) Budget restant : 21,6 − 14 = 7,6 minutes.\n4) Consommation : 14 / 21,6 × 100 = 64,8 %.\n5) 64,8 % est sous le seuil de vigilance de 80 % et le budget n'est pas épuisé : oui, l'équipe peut encore déployer.\n6) Le quatrième incident ajoute 10 minutes : le total (24 minutes) dépasse le budget de 21,6 minutes, l'équipe doit appliquer le gel des déploiements.\nContrôle : avec 7,6 minutes restantes avant l'incident, une coupure de 10 minutes dépasse nécessairement le budget."
  },
  {
    "id": "do3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "L'alerte qui oscille sur le monitoring de GreenMarket",
    "exampleTitle": "Exemple résolu — l'alerte flappante de l'API ColisExpress",
    "goal": "Analyser une séquence d'états d'alerte Prometheus, compter les bascules et choisir le bon amortissement.",
    "brief": "<p><strong>Énoncé.</strong> GreenMarket exploite un site de e-commerce supervisé avec Prometheus. L'alerte <strong>LatenceP95AuDelaDe500ms</strong> est évaluée toutes les 5 minutes. L'équipe extrait la séquence de ses états (OK = sain, FIRING = alerte déclenchée) :</p><p><code>OK — FIRING — OK — FIRING — OK — FIRING — FIRING — OK — FIRING</code></p><p>Une bascule est un changement d'état entre deux évaluations consécutives. Une alerte est dite en <strong>flapping</strong> à partir de <strong>3 bascules</strong>. Les signaux dorés sont : latence, trafic, erreurs, saturation.</p><ol><li>Combien de bascules compte la séquence ?</li><li>Combien de fois l'alerte se déclenche-t-elle (passages de OK à FIRING) ?</li><li>Quel est l'état final de la séquence ?</li><li>Cette alerte est-elle en flapping (oui ou non) ?</li><li>Quelle clause Prometheus faut-il ajouter pour exiger que la condition reste vraie 10 minutes avant d'alerter ?</li><li>Lequel des quatre signaux dorés cette alerte surveille-t-elle ?</li></ol>",
    "starter": "# Exercice — L'alerte qui oscille sur le monitoring de GreenMarket\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de bascules]\nA_COMPLETER\n\n[Question 2 — Nombre de déclenchements OK vers FIRING]\nA_COMPLETER\n\n[Question 3 — État final de la séquence]\nA_COMPLETER\n\n[Question 4 — Alerte en flapping ?]\nA_COMPLETER\n\n[Question 5 — Clause Prometheus à ajouter]\nA_COMPLETER\n\n[Question 6 — Signal doré surveillé]\nA_COMPLETER\n",
    "hints": [
      "Le flapping vient d'un seuil franchi par intermittence : l'alerte s'allume et s'éteint sans que l'incident soit résolu.",
      "Une bascule se compte dès que deux états consécutifs diffèrent ; la séquence compte 9 évaluations, donc 8 intervalles.",
      "1. Comparez chaque état au précédent. 2. Comptez les passages de OK à FIRING. 3. Lisez le dernier état. 4. Comparez au seuil de 3 bascules. 5. La clause for maintient la condition pendant une durée donnée. 6. Une latence au-delà de 500 ms surveille la latence."
    ],
    "examples": [
      {
        "stdin": "API de ColisExpress, alerte TauxErreurs5xxAuDelaDe1Pourcent, évaluée toutes les 5 minutes.\nSéquence : OK — FIRING — FIRING — OK — FIRING — OK\n\n1) Bascules : OK→FIRING, FIRING→OK, OK→FIRING, FIRING→OK, soit 4.\n2) Déclenchements (OK→FIRING) : 2.\n3) État final : OK.\n4) 4 ≥ 3 : oui, l'alerte flappe.\n5) Clause : for: 5m.\n6) Signal surveillé : les erreurs.",
        "expected": "4 bascules — 2 déclenchements — OK — flapping oui — for: 5m — erreurs",
        "note": "La clause for filtre les micro-pannes : l'alerte ne part que si la condition persiste."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de bascules",
        "stdin": "q:1",
        "expected": "7"
      },
      {
        "label": "Question 2 — Nombre de déclenchements OK vers FIRING",
        "stdin": "q:2",
        "expected": "4"
      },
      {
        "label": "Question 3 — État final de la séquence",
        "stdin": "q:3",
        "expected": "firing"
      },
      {
        "label": "Question 4 — Alerte en flapping ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Clause Prometheus à ajouter",
        "stdin": "q:5",
        "expected": "for: 10m||for:10m||for 10m"
      },
      {
        "label": "Question 6 — Signal doré surveillé",
        "stdin": "q:6",
        "expected": "latence||la latence"
      }
    ],
    "solution": "[Question 1 — Nombre de bascules]\n7\n\n[Question 2 — Nombre de déclenchements OK vers FIRING]\n4\n\n[Question 3 — État final de la séquence]\nfiring\n\n[Question 4 — Alerte en flapping ?]\noui\n\n[Question 5 — Clause Prometheus à ajouter]\nfor: 10m\n\n[Question 6 — Signal doré surveillé]\nlatence",
    "takeaway": "1) Les bascules se comptent entre évaluations consécutives : OK→FIRING (1), FIRING→OK (2), OK→FIRING (3), FIRING→OK (4), OK→FIRING (5), FIRING→FIRING (aucune), FIRING→OK (6), OK→FIRING (7) : 7 bascules.\n2) Les passages de OK à FIRING se produisent aux évaluations 1→2, 3→4, 5→6 et 8→9 : 4 déclenchements.\n3) L'état final de la séquence est FIRING.\n4) 7 bascules dépassent le seuil de 3 : oui, l'alerte est en flapping.\n5) La clause for: 10m exige que la condition reste vraie 10 minutes avant d'envoyer l'alerte.\n6) Une latence P95 au-delà de 500 ms surveille la latence, l'un des quatre signaux dorés.\nContrôle : 9 évaluations forment 8 intervalles ; un seul intervalle ne change pas d'état (FIRING→FIRING), d'où 8 − 1 = 7 bascules."
  }
];
