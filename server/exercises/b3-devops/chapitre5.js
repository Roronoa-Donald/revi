'use strict';

module.exports = [
  {
    "id": "do3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les métriques DORA du trimestre de LivraisonExpress",
    "exampleTitle": "Exemple résolu — les métriques DORA du trimestre d'AssurVite",
    "goal": "Calculer les quatre métriques DORA d'une équipe à partir de ses chiffres de livraison réels.",
    "brief": "<p><strong>Énoncé.</strong> LivraisonExpress exploite une plateforme de suivi de colis. Sur le dernier trimestre, soit <strong>90 jours</strong>, l'équipe a enregistré :</p><ul><li><strong>180 déploiements</strong> en production ;</li><li><strong>27</strong> d'entre eux ont provoqué un incident (déploiements en échec) ;</li><li>un délai moyen de <strong>48 heures</strong> entre le commit et son déploiement (lead time) ;</li><li>un temps moyen de restauration de <strong>2 heures</strong> après un déploiement en échec (MTTR).</li></ul><p>Répondez par la valeur seule ; les taux se donnent à l'unité près.</p><ol><li>Quelle est la fréquence de déploiement moyenne (en déploiements par jour) ?</li><li>Quel est le taux d'échec des déploiements (en %) ?</li><li>Quel est le lead time moyen, exprimé en jours ?</li><li>Que signifie l'acronyme MTTR dans le cadre DORA ?</li><li>Combien d'heures au total ont été consacrées à restaurer les 27 déploiements en échec ?</li><li>Quelle métrique DORA mesure le délai entre le commit et son exécution en production ?</li></ol>",
    "starter": "# Exercice — Les métriques DORA du trimestre de LivraisonExpress\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Fréquence de déploiement par jour]\nA_COMPLETER\n\n[Question 2 — Taux d'échec des déploiements en %]\nA_COMPLETER\n\n[Question 3 — Lead time en jours]\nA_COMPLETER\n\n[Question 4 — Signification de MTTR]\nA_COMPLETER\n\n[Question 5 — Temps total de restauration en heures]\nA_COMPLETER\n\n[Question 6 — Métrique mesurant le commit jusqu'à la production]\nA_COMPLETER\n",
    "hints": [
      "Les quatre métriques DORA : fréquence de déploiement, lead time, taux d'échec, temps de restauration (MTTR).",
      "La fréquence divise le nombre de déploiements par le nombre de jours ; le taux d'échec divise les déploiements en échec par le total des déploiements.",
      "1. Divisez 180 par 90. 2. Divisez 27 par 180 et multipliez par 100. 3. Convertissez 48 heures en jours. 4. MTTR : mean time to restore. 5. Multipliez les 27 incidents par le MTTR moyen. 6. Le délai commit vers production est le lead time."
    ],
    "examples": [
      {
        "stdin": "AssurVite sur 60 jours : 90 déploiements, dont 9 en échec ; lead time de 24 heures ; MTTR de 4 heures.\n\n1) Fréquence : 90 / 60 = 1,5 déploiement par jour.\n2) Taux d'échec : 9 / 90 × 100 = 10 %.\n3) Lead time : 24 heures, soit 1 jour.\n4) MTTR : mean time to restore (temps moyen de restauration).\n5) Restauration totale : 9 × 4 = 36 heures.\n6) Le délai commit vers production est le lead time.",
        "expected": "1,5 par jour — 10 % — 1 jour — mean time to restore — 36 heures — lead time",
        "note": "Le taux d'échec est la seule métrique DORA que l'on cherche à baisser : les trois autres mesurent de la vitesse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Fréquence de déploiement par jour",
        "stdin": "q:1",
        "expected": "2||2 deploiements par jour||2 par jour"
      },
      {
        "label": "Question 2 — Taux d'échec des déploiements en %",
        "stdin": "q:2",
        "expected": "15||15%||15 %"
      },
      {
        "label": "Question 3 — Lead time en jours",
        "stdin": "q:3",
        "expected": "2||2 jours"
      },
      {
        "label": "Question 4 — Signification de MTTR",
        "stdin": "q:4",
        "expected": "temps moyen de restauration||mean time to restore||temps moyen de reparation||delai moyen de restauration"
      },
      {
        "label": "Question 5 — Temps total de restauration en heures",
        "stdin": "q:5",
        "expected": "54"
      },
      {
        "label": "Question 6 — Métrique mesurant le commit jusqu'à la production",
        "stdin": "q:6",
        "expected": "lead time||le lead time||lead time for changes||delai de mise en production"
      }
    ],
    "solution": "[Question 1 — Fréquence de déploiement par jour]\n2\n\n[Question 2 — Taux d'échec des déploiements en %]\n15\n\n[Question 3 — Lead time en jours]\n2\n\n[Question 4 — Signification de MTTR]\ntemps moyen de restauration\n\n[Question 5 — Temps total de restauration en heures]\n54\n\n[Question 6 — Métrique mesurant le commit jusqu'à la production]\nlead time",
    "takeaway": "1) Fréquence de déploiement : 180 / 90 = 2 déploiements par jour.\n2) Taux d'échec : 27 / 180 × 100 = 15 %.\n3) Lead time : 48 heures, soit 2 jours.\n4) MTTR signifie mean time to restore : le temps moyen de restauration du service après un échec.\n5) Temps total de restauration : 27 × 2 = 54 heures.\n6) Le délai entre le commit et son exécution en production est le lead time.\nContrôle : 2 déploiements par jour sur 90 jours redonnent bien les 180 déploiements de l'énoncé."
  },
  {
    "id": "do3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le post-mortem de la panne de SantéConnect",
    "exampleTitle": "Exemple résolu — le post-mortem de la panne de MairieConnect",
    "goal": "Reconstituer la chronologie d'un incident, mesurer MTTD, durée totale et temps de réparation, dans une approche sans blâme.",
    "brief": "<p><strong>Énoncé.</strong> SantéConnect exploite une plateforme de téléconsultation. À la suite d'une panne, l'équipe rédige le post-mortem. Chronologie de l'incident :</p><table><tr><th>Heure</th><th>Événement</th></tr><tr><td>14h02</td><td>Déploiement de la version 3.8.0 en production</td></tr><tr><td>14h15</td><td>Premières erreurs HTTP 500 pour les patients (début de l'impact)</td></tr><tr><td>14h20</td><td>Alerte Prometheus déclenchée</td></tr><tr><td>14h35</td><td>Début du rollback vers la version 3.7.9</td></tr><tr><td>14h45</td><td>Service rétabli (fin de l'incident)</td></tr></table><p>Le MTTD mesure le temps entre le début de l'impact et sa détection. Répondez par la valeur seule (en minutes).</p><ol><li>Quel est le temps de détection de l'incident, MTTD (en minutes) ?</li><li>Quelle est la durée totale de l'incident (en minutes) ?</li><li>Quel est le temps de réparation après détection (en minutes) ?</li><li>Combien de minutes se sont écoulées entre le déploiement et le début de l'impact ?</li><li>Comment se nomme l'opération qui a rétabli le service ?</li><li>Dans un post-mortem sans blâme, que recherche-t-on plutôt qu'un coupable ?</li></ol>",
    "starter": "# Exercice — Le post-mortem de la panne de SantéConnect\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — MTTD en minutes]\nA_COMPLETER\n\n[Question 2 — Durée totale en minutes]\nA_COMPLETER\n\n[Question 3 — Temps de réparation après détection]\nA_COMPLETER\n\n[Question 4 — Déploiement jusqu'à impact en minutes]\nA_COMPLETER\n\n[Question 5 — Nom de l'opération de rétablissement]\nA_COMPLETER\n\n[Question 6 — Ce que recherche le post-mortem sans blâme]\nA_COMPLETER\n",
    "hints": [
      "Un incident commence au début de l'impact utilisateur et se termine au rétablissement du service.",
      "MTTD = détection − début de l'impact ; durée totale = rétablissement − début de l'impact.",
      "1. Calculez 14h20 − 14h15. 2. Calculez 14h45 − 14h15. 3. Calculez 14h45 − 14h20. 4. Calculez 14h15 − 14h02. 5. Le service a été rétabli en revenant à la version précédente. 6. Le post-mortem sans blâme vise les causes racines."
    ],
    "examples": [
      {
        "stdin": "MairieConnect (rendez-vous en mairie) : déploiement à 09h00, premières erreurs à 09h10, alerte à 09h25, rollback à 09h40, service rétabli à 09h50.\n\n1) MTTD : 09h25 − 09h10 = 15 minutes.\n2) Durée totale : 09h50 − 09h10 = 40 minutes.\n3) Réparation après détection : 09h50 − 09h25 = 25 minutes.\n4) Déploiement jusqu'à impact : 09h10 − 09h00 = 10 minutes.\n5) Le service a été rétabli par le rollback.\n6) On recherche les causes racines.",
        "expected": "15 min — 40 min — 25 min — 10 min — rollback — causes racines",
        "note": "Un MTTD court limite la durée de l'incident : la détection compte autant que la réparation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — MTTD en minutes",
        "stdin": "q:1",
        "expected": "5"
      },
      {
        "label": "Question 2 — Durée totale en minutes",
        "stdin": "q:2",
        "expected": "30"
      },
      {
        "label": "Question 3 — Temps de réparation après détection",
        "stdin": "q:3",
        "expected": "25"
      },
      {
        "label": "Question 4 — Déploiement jusqu'à impact en minutes",
        "stdin": "q:4",
        "expected": "13"
      },
      {
        "label": "Question 5 — Nom de l'opération de rétablissement",
        "stdin": "q:5",
        "expected": "rollback||le rollback||retour arriere||rollback vers la version precedente"
      },
      {
        "label": "Question 6 — Ce que recherche le post-mortem sans blâme",
        "stdin": "q:6",
        "expected": "les causes racines||causes racines||cause racine||root cause||les causes fondamentales||causes fondamentales"
      }
    ],
    "solution": "[Question 1 — MTTD en minutes]\n5\n\n[Question 2 — Durée totale en minutes]\n30\n\n[Question 3 — Temps de réparation après détection]\n25\n\n[Question 4 — Déploiement jusqu'à impact en minutes]\n13\n\n[Question 5 — Nom de l'opération de rétablissement]\nrollback\n\n[Question 6 — Ce que recherche le post-mortem sans blâme]\nles causes racines",
    "takeaway": "1) MTTD : 14h20 − 14h15 = 5 minutes.\n2) Durée totale : 14h45 − 14h15 = 30 minutes.\n3) Temps de réparation après détection : 14h45 − 14h20 = 25 minutes.\n4) Déploiement jusqu'à impact : 14h15 − 14h02 = 13 minutes.\n5) Le service a été rétabli par le rollback vers la version 3.7.9.\n6) Un post-mortem sans blâme recherche les causes racines, pas un coupable.\nContrôle : MTTD + temps de réparation = 5 + 25 = 30 minutes, la durée totale de l'incident."
  },
  {
    "id": "do3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La fiabilité du LMS Studia : MTBF, MTTR et disponibilité",
    "exampleTitle": "Exemple résolu — la fiabilité de l'extranet Rhône Habitat",
    "goal": "Calculer MTBF, MTTR et disponibilité d'un service sur une fenêtre d'observation et en déduire le SLA atteignable.",
    "brief": "<p><strong>Énoncé.</strong> Studia édite une plateforme d'e-learning utilisée par 30 000 étudiants. Sur une fenêtre d'observation de <strong>4 semaines</strong>, soit <strong>672 heures</strong>, l'équipe relève <strong>6 incidents</strong> et une indisponibilité cumulée de <strong>6 heures</strong>. Définitions : MTBF = temps de fonctionnement / nombre d'incidents, où temps de fonctionnement = fenêtre − indisponibilité ; MTTR = indisponibilité / nombre d'incidents ; disponibilité = temps de fonctionnement / fenêtre × 100. Répondez par la valeur seule ; la disponibilité se donne à une décimale près.</p><ol><li>Quel est le temps de fonctionnement total (en heures) ?</li><li>Quel est le MTBF (en heures) ?</li><li>Quel est le MTTR (en heures) ?</li><li>Quelle est la disponibilité sur la fenêtre (en %) ?</li><li>Quel engagement la plateforme atteint-elle : 99 %, 99,9 % ou 99,99 % ?</li><li>Si l'équipe divise son MTTR par deux sans changer le MTBF, la disponibilité augmente-t-elle ou diminue-t-elle ?</li></ol>",
    "starter": "# Exercice — La fiabilité du LMS Studia : MTBF, MTTR et disponibilité\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Temps de fonctionnement en heures]\nA_COMPLETER\n\n[Question 2 — MTBF en heures]\nA_COMPLETER\n\n[Question 3 — MTTR en heures]\nA_COMPLETER\n\n[Question 4 — Disponibilité en %]\nA_COMPLETER\n\n[Question 5 — Engagement atteint]\nA_COMPLETER\n\n[Question 6 — Effet d'un MTTR divisé par deux]\nA_COMPLETER\n",
    "hints": [
      "La fiabilité se mesure avec le MTBF (espacement des pannes), la réactivité avec le MTTR (durée des réparations).",
      "Temps de fonctionnement = fenêtre − indisponibilité ; disponibilité = temps de fonctionnement / fenêtre × 100.",
      "1. Soustrayez 6 de 672. 2. Divisez le temps de fonctionnement par le nombre d'incidents. 3. Divisez l'indisponibilité par le nombre d'incidents. 4. Divisez le temps de fonctionnement par 672. 5. Comparez avec les engagements proposés. 6. Moins d'indisponibilité à fenêtre égale améliore la disponibilité."
    ],
    "examples": [
      {
        "stdin": "Extranet Rhône Habitat : 30 jours, soit 720 heures ; 4 incidents ; indisponibilité cumulée de 6 heures.\n\n1) Fonctionnement : 720 − 6 = 714 heures.\n2) MTBF : 714 / 4 = 178,5 heures.\n3) MTTR : 6 / 4 = 1,5 heure.\n4) Disponibilité : 714 / 720 × 100 = 99,2 %.\n5) La plateforme atteint 99 %.\n6) Un MTTR divisé par deux augmente la disponibilité.",
        "expected": "714 h — MTBF 178,5 h — MTTR 1,5 h — 99,2 % — 99 % — augmente",
        "note": "Moins de pannes ou des réparations plus rapides : les deux voies améliorent la disponibilité."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Temps de fonctionnement en heures",
        "stdin": "q:1",
        "expected": "666"
      },
      {
        "label": "Question 2 — MTBF en heures",
        "stdin": "q:2",
        "expected": "111"
      },
      {
        "label": "Question 3 — MTTR en heures",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Disponibilité en %",
        "stdin": "q:4",
        "expected": "99,1||99.1||99,1%||99.1%||99,1 %||99.1 %"
      },
      {
        "label": "Question 5 — Engagement atteint",
        "stdin": "q:5",
        "expected": "99||99%||99 %"
      },
      {
        "label": "Question 6 — Effet d'un MTTR divisé par deux",
        "stdin": "q:6",
        "expected": "augmente||elle augmente||la disponibilite augmente"
      }
    ],
    "solution": "[Question 1 — Temps de fonctionnement en heures]\n666\n\n[Question 2 — MTBF en heures]\n111\n\n[Question 3 — MTTR en heures]\n1\n\n[Question 4 — Disponibilité en %]\n99,1\n\n[Question 5 — Engagement atteint]\n99\n\n[Question 6 — Effet d'un MTTR divisé par deux]\naugmente",
    "takeaway": "1) Temps de fonctionnement : 672 − 6 = 666 heures.\n2) MTBF : 666 / 6 = 111 heures.\n3) MTTR : 6 / 6 = 1 heure.\n4) Disponibilité : 666 / 672 × 100 = 99,1 %.\n5) 99,1 % dépasse 99 % mais pas 99,9 % : la plateforme atteint l'engagement 99 %.\n6) Diviser le MTTR par deux réduit l'indisponibilité à fenêtre égale : la disponibilité augmente.\nContrôle : 6 incidents espacés de 111 heures et réparés en 1 heure occupent 6 × (111 + 1) = 672 heures, toute la fenêtre."
  }
];
