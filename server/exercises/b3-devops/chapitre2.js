'use strict';

module.exports = [
  {
    "id": "do3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le versioning sémantique de l'application MétéoLive",
    "exampleTitle": "Exemple résolu — le versioning sémantique d'AgendaPro",
    "goal": "Déterminer la prochaine version SemVer 2.0.0 d'un livrable selon la nature du changement apporté.",
    "brief": "<p><strong>Énoncé.</strong> MétéoLive diffuse ses prévisions météo à 800 000 utilisateurs. L'application est actuellement en version <strong>2.4.7</strong> (MAJOR.MINOR.PATCH). L'équipe produit planifie les changements suivants :</p><p><strong>A.</strong> Corriger un bug d'affichage des températures (rétrocompatible) — <strong>B.</strong> Ajouter les cartes de vent (nouvelle fonctionnalité rétrocompatible) — <strong>C.</strong> Refondre l'API publique en cassant la compatibilité ascendante — <strong>D.</strong> Publier un correctif de sécurité urgent (rétrocompatible).</p><p>Règles SemVer 2.0.0 : une correction rétrocompatible incrémente PATCH ; une fonctionnalité rétrocompatible incrémente MINOR et remet PATCH à zéro ; une rupture de compatibilité incrémente MAJOR et remet MINOR et PATCH à zéro. Répondez par le numéro de version complet pour les questions de version, et par le nom exact de la composante pour la question 4.</p><ol><li>Quelle est la version après le changement A seul (depuis 2.4.7) ?</li><li>Quelle est la version après le changement B seul (depuis 2.4.7) ?</li><li>Quelle est la version après le changement C seul (depuis 2.4.7) ?</li><li>Quelle composante de la version (major, minor ou patch) une correction rétrocompatible incrémente-t-elle ?</li><li>Le changement C est livré (version de la question 3), puis le changement D est appliqué : quelle est la version finale ?</li></ol>",
    "starter": "# Exercice — Le versioning sémantique de l'application MétéoLive\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Version après le correctif A]\nA_COMPLETER\n\n[Question 2 — Version après la fonctionnalité B]\nA_COMPLETER\n\n[Question 3 — Version après la rupture C]\nA_COMPLETER\n\n[Question 4 — Composante incrémentée par un correctif]\nA_COMPLETER\n\n[Question 5 — Version après le changement D]\nA_COMPLETER\n",
    "hints": [
      "Une version SemVer se lit MAJOR.MINOR.PATCH : 2.4.7 signifie major 2, minor 4, patch 7.",
      "Correctif : PATCH + 1 ; fonctionnalité : MINOR + 1 et PATCH à zéro ; rupture : MAJOR + 1, MINOR et PATCH à zéro.",
      "1. Identifiez la nature de chaque changement. 2. Appliquez l'incrément correspondant depuis la version 2.4.7. 3. Pour la question 5, repartez de la version obtenue après le changement C."
    ],
    "examples": [
      {
        "stdin": "AgendaPro est en version 1.3.2. Changement A : corriger un bug de synchronisation (rétrocompatible). Changement B : ajouter les calendriers partagés (fonctionnalité rétrocompatible). Changement C : changer le format des données (rupture de compatibilité).\n\n1) Après le correctif : 1.3.3.\n2) Après la fonctionnalité : 1.4.0.\n3) Après la rupture : 2.0.0.\n4) Un correctif incrémente PATCH.\n5) Un correctif de sécurité appliqué à 2.0.0 donne 2.0.1.",
        "expected": "1.3.3 — 1.4.0 — 2.0.0 — PATCH — 2.0.1",
        "note": "Seule la composante concernée est incrémentée ; les composantes à sa droite sont remises à zéro, sauf pour un correctif qui ne touche à rien d'autre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Version après le correctif A",
        "stdin": "q:1",
        "expected": "2.4.8||v2.4.8"
      },
      {
        "label": "Question 2 — Version après la fonctionnalité B",
        "stdin": "q:2",
        "expected": "2.5.0||v2.5.0||2.5"
      },
      {
        "label": "Question 3 — Version après la rupture C",
        "stdin": "q:3",
        "expected": "3.0.0||v3.0.0||3.0"
      },
      {
        "label": "Question 4 — Composante incrémentée par un correctif",
        "stdin": "q:4",
        "expected": "patch||le patch"
      },
      {
        "label": "Question 5 — Version après le changement D",
        "stdin": "q:5",
        "expected": "3.0.1||v3.0.1"
      }
    ],
    "solution": "[Question 1 — Version après le correctif A]\n2.4.8\n\n[Question 2 — Version après la fonctionnalité B]\n2.5.0\n\n[Question 3 — Version après la rupture C]\n3.0.0\n\n[Question 4 — Composante incrémentée par un correctif]\npatch\n\n[Question 5 — Version après le changement D]\n3.0.1",
    "takeaway": "1) Correctif : PATCH passe de 7 à 8, la version devient 2.4.8.\n2) Fonctionnalité : MINOR passe de 4 à 5 et PATCH est remis à zéro : 2.5.0.\n3) Rupture de compatibilité : MAJOR passe de 2 à 3, MINOR et PATCH sont remis à zéro : 3.0.0.\n4) Une correction rétrocompatible incrémente PATCH, la troisième composante.\n5) Correctif de sécurité appliqué à 3.0.0 : PATCH est incrémenté, ce qui donne 3.0.1.\nContrôle : chaque incrément ne modifie que la composante concernée et remet à zéro celles situées à sa droite."
  },
  {
    "id": "do3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La semaine d'intégration continue de l'équipe PayShop",
    "exampleTitle": "Exemple résolu — la semaine CI de l'équipe LivraisonDirect",
    "goal": "Mesurer le taux de réussite des builds d'intégration continue et quantifier le temps gagné en parallélisant les jobs du pipeline.",
    "brief": "<p><strong>Énoncé.</strong> PayShop exploite un service de paiement en ligne. Son pipeline GitHub Actions exécute trois jobs <strong>séquentiels</strong> : lint (2 minutes), tests unitaires (8 minutes), scan de sécurité (5 minutes). Les builds de la semaine dernière sont résumés ci-dessous :</p><table><tr><th>Jour</th><th>Lundi</th><th>Mardi</th><th>Mercredi</th><th>Jeudi</th><th>Vendredi</th></tr><tr><th>Builds lancés</th><td>8</td><td>7</td><td>6</td><td>8</td><td>6</td></tr><tr><th>Builds réussis</th><td>6</td><td>6</td><td>5</td><td>6</td><td>5</td></tr></table><p>Par ailleurs, le test <code>test_paiement_differe</code> échoue environ une fois sur trois sans aucun changement de code. L'équipe étudie l'exécution des trois jobs en parallèle. Répondez par la valeur seule (taux de réussite à l'unité près).</p><ol><li>Combien de builds ont été lancés la semaine dernière ?</li><li>Quel est le taux de réussite des builds (en %) ?</li><li>Quelle est la durée actuelle du pipeline (en minutes) ?</li><li>Quelle serait la durée du pipeline si les trois jobs s'exécutaient en parallèle (en minutes) ?</li><li>Combien de minutes seraient économisées par build ?</li><li>Quel nom précis donne-t-on à un test qui échoue de façon aléatoire sans changement de code ?</li></ol>",
    "starter": "# Exercice — La semaine d'intégration continue de l'équipe PayShop\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Builds lancés dans la semaine]\nA_COMPLETER\n\n[Question 2 — Taux de réussite des builds en %]\nA_COMPLETER\n\n[Question 3 — Durée actuelle du pipeline en minutes]\nA_COMPLETER\n\n[Question 4 — Durée avec les jobs en parallèle en minutes]\nA_COMPLETER\n\n[Question 5 — Minutes économisées par build]\nA_COMPLETER\n\n[Question 6 — Nom du test qui échoue aléatoirement]\nA_COMPLETER\n",
    "hints": [
      "Le taux de réussite d'un pipeline se mesure en divisant les builds réussis par les builds lancés.",
      "Des jobs en parallèle démarrent tous en même temps : la durée totale devient celle du job le plus long.",
      "1. Additionnez les builds lancés. 2. Additionnez les builds réussis et divisez par le total. 3. Additionnez 2 + 8 + 5 pour la durée séquentielle. 4. Prenez le maximum des trois jobs. 5. Soustrayez les deux durées."
    ],
    "examples": [
      {
        "stdin": "L'équipe LivraisonDirect (suivi de livraisons) : pipeline en trois jobs séquentiels : build 4 min, tests 6 min, scan 2 min. Semaine : 40 builds lancés, 30 réussis. Le test test_adresse_client échoue une fois sur cinq sans changement de code.\n\n1) 40 builds lancés.\n2) Taux de réussite : 30 / 40 × 100 = 75 %.\n3) Durée séquentielle : 4 + 6 + 2 = 12 minutes.\n4) Durée parallèle : max(4, 6, 2) = 6 minutes.\n5) Économie : 12 − 6 = 6 minutes par build.\n6) C'est un test instable (flaky).",
        "expected": "40 — 75 % — 12 min — 6 min — 6 min économisées — test flaky",
        "note": "En parallèle, le pipeline n'attend que le job le plus lent : les autres terminent pendant ce temps."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Builds lancés dans la semaine",
        "stdin": "q:1",
        "expected": "35"
      },
      {
        "label": "Question 2 — Taux de réussite des builds en %",
        "stdin": "q:2",
        "expected": "80||80%||80 %"
      },
      {
        "label": "Question 3 — Durée actuelle du pipeline en minutes",
        "stdin": "q:3",
        "expected": "15"
      },
      {
        "label": "Question 4 — Durée avec les jobs en parallèle en minutes",
        "stdin": "q:4",
        "expected": "8"
      },
      {
        "label": "Question 5 — Minutes économisées par build",
        "stdin": "q:5",
        "expected": "7"
      },
      {
        "label": "Question 6 — Nom du test qui échoue aléatoirement",
        "stdin": "q:6",
        "expected": "flaky||test flaky||un test flaky||instable||test instable||un test instable||flaky test"
      }
    ],
    "solution": "[Question 1 — Builds lancés dans la semaine]\n35\n\n[Question 2 — Taux de réussite des builds en %]\n80\n\n[Question 3 — Durée actuelle du pipeline en minutes]\n15\n\n[Question 4 — Durée avec les jobs en parallèle en minutes]\n8\n\n[Question 5 — Minutes économisées par build]\n7\n\n[Question 6 — Nom du test qui échoue aléatoirement]\nflaky",
    "takeaway": "1) Builds lancés : 8 + 7 + 6 + 8 + 6 = 35.\n2) Builds réussis : 6 + 6 + 5 + 6 + 5 = 28. Taux de réussite : 28 / 35 × 100 = 80 %.\n3) Pipeline séquentiel : 2 + 8 + 5 = 15 minutes.\n4) Pipeline parallèle : la durée est celle du job le plus long, soit 8 minutes.\n5) Économie par build : 15 − 8 = 7 minutes.\n6) Un test qui échoue de façon aléatoire sans changement de code est un test instable (flaky).\nContrôle : 35 builds à 15 minutes représentent 525 minutes de pipeline dans la semaine ; ramenées à 8 minutes, elles tomberaient à 280 minutes, soit 245 minutes économisées."
  },
  {
    "id": "do3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "GitFlow ou trunk-based development pour VisioTeam ?",
    "exampleTitle": "Exemple résolu — le choix de branchement de CRM Nova",
    "goal": "Comparer GitFlow et le trunk-based development à partir d'indicateurs mesurables et connaître le rôle de chaque branche.",
    "brief": "<p><strong>Énoncé.</strong> VisioTeam édite une solution de visioconférence développée par <strong>12 développeurs</strong>. Chaque branche de fonctionnalité vit en moyenne <strong>3 semaines</strong> avant sa fusion. Le mois dernier, l'équipe a résolu <strong>45 conflits de fusion</strong>, chacun demandant en moyenne <strong>40 minutes</strong>. Elle s'interroge sur un passage au trunk-based development, où chaque développeur fusionne sur la branche principale au moins <strong>une fois par jour ouvré</strong> (5 jours par semaine).</p><p>GitFlow s'appuie sur les branches : <code>main</code> (production), <code>develop</code> (intégration), <code>feature</code>, <code>release</code> et <code>hotfix</code>. Répondez par la valeur seule aux questions 1 et 6.</p><ol><li>Combien d'heures au total ont été consacrées aux conflits de fusion le mois dernier ?</li><li>Dans GitFlow, quelle branche reçoit les fusions des branches feature ?</li><li>Quelle branche de GitFlow sert à corriger en urgence un défaut en production ?</li><li>Quelle stratégie de branchement recommande de fusionner sur la branche principale au moins une fois par jour ?</li><li>En trunk-based, comment masque-t-on une fonctionnalité inachevée déjà fusionnée sur la branche principale ?</li><li>Si chacun des 12 développeurs fusionnait une fois par jour ouvré, combien de fusions par semaine recevrait la branche principale ?</li></ol>",
    "starter": "# Exercice — GitFlow ou trunk-based development pour VisioTeam ?\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Heures consacrées aux conflits]\nA_COMPLETER\n\n[Question 2 — Branche recevant les features]\nA_COMPLETER\n\n[Question 3 — Branche des correctifs urgents]\nA_COMPLETER\n\n[Question 4 — Stratégie de fusion quotidienne]\nA_COMPLETER\n\n[Question 5 — Mécanisme masquant une fonctionnalité inachevée]\nA_COMPLETER\n\n[Question 6 — Fusions par semaine en trunk-based]\nA_COMPLETER\n",
    "hints": [
      "Plus une branche vit longtemps, plus elle diverge de la branche principale et plus sa fusion génère de conflits.",
      "GitFlow sépare main, develop, feature, release et hotfix ; le trunk-based fusionne tout sur une branche principale unique.",
      "1. Multipliez 45 conflits par 40 minutes puis convertissez en heures. 2. Associez chaque branche GitFlow à son rôle. 3. Pour la question 6, multipliez le nombre de développeurs par le nombre de jours ouvrés."
    ],
    "examples": [
      {
        "stdin": "CRM Nova : 9 développeurs, 60 conflits de 15 minutes chacun le mois dernier. Passage au trunk-based avec une fusion par jour ouvré (5 jours) et par développeur.\n\n1) Temps consacré : 60 × 15 = 900 minutes, soit 15 heures.\n2) Les branches feature fusionnent dans develop.\n3) Le correctif urgent de production utilise hotfix.\n4) La fusion quotidienne est le trunk-based development.\n5) Une fonctionnalité inachevée est masquée avec des feature flags.\n6) Fusions par semaine : 9 × 5 = 45.",
        "expected": "15 heures — develop — hotfix — trunk-based — feature flags — 45 fusions par semaine",
        "note": "Des branches courtes et fréquentes réduisent la taille des différences, donc les conflits."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Heures consacrées aux conflits",
        "stdin": "q:1",
        "expected": "30||30 heures||30 h"
      },
      {
        "label": "Question 2 — Branche recevant les features",
        "stdin": "q:2",
        "expected": "develop||la branche develop"
      },
      {
        "label": "Question 3 — Branche des correctifs urgents",
        "stdin": "q:3",
        "expected": "hotfix||la branche hotfix"
      },
      {
        "label": "Question 4 — Stratégie de fusion quotidienne",
        "stdin": "q:4",
        "expected": "trunk-based||le trunk-based||trunk based||developpement trunk-based||trunk based development||trunk-based development"
      },
      {
        "label": "Question 5 — Mécanisme masquant une fonctionnalité inachevée",
        "stdin": "q:5",
        "expected": "feature flags||feature flag||feature toggle||feature toggles||drapeaux de fonctionnalites||des feature flags"
      },
      {
        "label": "Question 6 — Fusions par semaine en trunk-based",
        "stdin": "q:6",
        "expected": "60"
      }
    ],
    "solution": "[Question 1 — Heures consacrées aux conflits]\n30\n\n[Question 2 — Branche recevant les features]\ndevelop\n\n[Question 3 — Branche des correctifs urgents]\nhotfix\n\n[Question 4 — Stratégie de fusion quotidienne]\ntrunk-based\n\n[Question 5 — Mécanisme masquant une fonctionnalité inachevée]\nfeature flags\n\n[Question 6 — Fusions par semaine en trunk-based]\n60",
    "takeaway": "1) 45 conflits × 40 minutes = 1 800 minutes, soit 30 heures consacrées aux conflits.\n2) Dans GitFlow, les branches feature fusionnent dans la branche develop.\n3) La correction urgente d'un défaut en production utilise une branche hotfix.\n4) Fusionner au moins une fois par jour sur la branche principale est le trunk-based development.\n5) Une fonctionnalité inachevée y est masquée grâce à des feature flags.\n6) 12 développeurs × 5 jours ouvrés = 60 fusions par semaine.\nContrôle : 1 800 minutes divisées par 60 redonnent 30 heures ; et 60 fusions hebdomadaires maintiennent de petites différences, donc moins de conflits."
  }
];
