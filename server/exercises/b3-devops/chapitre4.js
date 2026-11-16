'use strict';

module.exports = [
  {
    "id": "do3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "La bascule blue-green du portail AssuranceDirecte",
    "exampleTitle": "Exemple résolu — la bascule blue-green de BilletterieLive",
    "goal": "Suivre un déploiement blue-green : validation sur l'environnement inactif, bascule du routeur et retour arrière.",
    "brief": "<p><strong>Énoncé.</strong> AssuranceDirecte exploite un portail de gestion de contrats visité par 200 000 assurés par jour. L'équipe pratique le déploiement blue-green : deux environnements jumeaux, <strong>BLUE</strong> et <strong>GREEN</strong>. Actuellement, le routeur envoie tout le trafic vers <strong>BLUE</strong>, qui exécute la version <strong>4.2.1</strong>. L'équipe déploie la version <strong>4.3.0</strong> sur <strong>GREEN</strong>, y déroule ses tests de santé (réussis), puis bascule le routeur sur GREEN.</p><ol><li>Quelle est la version en ligne immédiatement après la bascule ?</li><li>Quel environnement devient inactif (idle) ?</li><li>Combien de temps les utilisateurs sont-ils interrompus par la bascule (en minutes) ?</li><li>Une anomalie majeure est découverte 10 minutes après la bascule : sur quel environnement le routeur doit-il être rebasculé ?</li><li>Comment se nomme cette opération de retour arrière ?</li></ol>",
    "starter": "# Exercice — La bascule blue-green du portail AssuranceDirecte\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Version en ligne après la bascule]\nA_COMPLETER\n\n[Question 2 — Environnement devenu inactif]\nA_COMPLETER\n\n[Question 3 — Interruption des utilisateurs en minutes]\nA_COMPLETER\n\n[Question 4 — Environnement de la rebascule]\nA_COMPLETER\n\n[Question 5 — Nom de l'opération de retour arrière]\nA_COMPLETER\n",
    "hints": [
      "Le blue-green entretient deux jumeaux de production : un seul reçoit le trafic à la fois.",
      "La nouvelle version est déployée et validée sur l'environnement inactif avant qu'aucun utilisateur ne la voie.",
      "1. Identifiez l'environnement pointé par le routeur après la bascule. 2. L'autre devient inactif. 3. La bascule ne modifie qu'une configuration de routeur. 4. En cas d'anomalie, on repart vers l'ancien environnement. 5. Ce retour s'appelle le rollback."
    ],
    "examples": [
      {
        "stdin": "BilletterieLive (vente de billets) : BLUE actif en 1.8.0, déploiement de la 1.9.0 sur GREEN, tests de santé réussis, routeur basculé sur GREEN.\n\n1) Version en ligne : 1.9.0.\n2) BLUE devient inactif.\n3) Interruption : 0 minute.\n4) En cas d'anomalie : rebascule sur BLUE.\n5) L'opération est un rollback.",
        "expected": "1.9.0 — BLUE — 0 minute — BLUE — rollback",
        "note": "Le rollback est immédiat : l'ancien environnement exécute toujours l'ancienne version, aucun redéploiement n'est nécessaire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Version en ligne après la bascule",
        "stdin": "q:1",
        "expected": "4.3.0||v4.3.0||4.3"
      },
      {
        "label": "Question 2 — Environnement devenu inactif",
        "stdin": "q:2",
        "expected": "blue||l’environnement blue||l'environnement blue"
      },
      {
        "label": "Question 3 — Interruption des utilisateurs en minutes",
        "stdin": "q:3",
        "expected": "0||zero||aucune||aucun"
      },
      {
        "label": "Question 4 — Environnement de la rebascule",
        "stdin": "q:4",
        "expected": "blue||l’environnement blue||l'environnement blue"
      },
      {
        "label": "Question 5 — Nom de l'opération de retour arrière",
        "stdin": "q:5",
        "expected": "rollback||un rollback||retour arriere||roll back"
      }
    ],
    "solution": "[Question 1 — Version en ligne après la bascule]\n4.3.0\n\n[Question 2 — Environnement devenu inactif]\nblue\n\n[Question 3 — Interruption des utilisateurs en minutes]\n0\n\n[Question 4 — Environnement de la rebascule]\nblue\n\n[Question 5 — Nom de l'opération de retour arrière]\nrollback",
    "takeaway": "1) Après la bascule, le routeur envoie le trafic vers GREEN, qui exécute la 4.3.0 : la version en ligne est 4.3.0.\n2) BLUE, qui a conservé la version 4.2.1, devient inactif (idle).\n3) La bascule ne modifie que la cible du routeur : les utilisateurs subissent 0 minute d'interruption.\n4) Pour annuler le changement, on rebascule le routeur sur BLUE, resté intact.\n5) Cette rebascule s'appelle le rollback.\nContrôle : le rollback est aussi rapide que la bascule initiale, puisque l'ancien environnement n'a jamais cessé de tourner."
  },
  {
    "id": "do3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le déploiement canari du moteur de recherche de VenteEnLigne",
    "exampleTitle": "Exemple résolu — le déploiement canari de StreamVision",
    "goal": "Router progressivement le trafic vers une version canari, surveiller le taux d'erreur et décider de la promotion ou du retour arrière.",
    "brief": "<p><strong>Énoncé.</strong> VenteEnLigne traite <strong>40 000 requêtes de recherche par heure</strong> sur son site de grande distribution. L'équipe déploie son nouveau moteur de recherche en <strong>canari</strong> : le trafic est routé par paliers de <strong>5 %, puis 20 %, puis 50 %, puis 100 %</strong>. À chaque palier, le taux d'erreur est mesuré ; au-delà d'un <strong>seuil de 1 %</strong>, le déploiement est automatiquement interrompu et annulé. Mesures : 0,4 % au palier 5 % ; 0,5 % au palier 20 % ; 1,8 % au palier 50 %. Répondez par la valeur seule.</p><ol><li>Combien de requêtes par heure le canari sert-il au premier palier (5 % de 40 000) ?</li><li>Au palier 20 %, combien de requêtes par heure la version stable sert-elle encore ?</li><li>Quel est le dernier palier validé avant l'arrêt du déploiement (en %) ?</li><li>Quel est le taux d'erreur mesuré au palier où le déploiement s'arrête (en %) ?</li><li>Comment se nomme l'action automatiquement déclenchée quand le seuil est dépassé ?</li><li>Comment nomme-t-on la part d'utilisateurs exposée à une version défaillante ?</li></ol>",
    "starter": "# Exercice — Le déploiement canari du moteur de recherche de VenteEnLigne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Requêtes servies par le canari à 5 %]\nA_COMPLETER\n\n[Question 2 — Requêtes servies par la version stable à 20 %]\nA_COMPLETER\n\n[Question 3 — Dernier palier validé en %]\nA_COMPLETER\n\n[Question 4 — Taux d'erreur au palier de l'arrêt]\nA_COMPLETER\n\n[Question 5 — Action déclenchée au-delà du seuil]\nA_COMPLETER\n\n[Question 6 — Part d'utilisateurs exposée]\nA_COMPLETER\n",
    "hints": [
      "Un canari expose d'abord la nouvelle version à un petit échantillon du trafic avant de la généraliser.",
      "À chaque palier : part du canari × trafic total pour la nouvelle version, le reste pour la version stable.",
      "1. Calculez 5 % de 40 000. 2. Calculez 80 % de 40 000. 3. Comparez chaque taux d'erreur au seuil de 1 %. 4. Repérez le premier palier qui dépasse le seuil. 5. Au-delà du seuil, le pipeline annule le déploiement. 6. La part exposée s'appelle le rayon d'impact (blast radius)."
    ],
    "examples": [
      {
        "stdin": "StreamVision (vidéo à la demande) : 60 000 requêtes par heure, paliers 10 %, 25 %, 50 %, 100 %, seuil 0,5 %. Taux mesurés : 0,2 %, 0,3 %, 0,2 %, 0,4 %.\n\n1) Canari à 10 % : 6 000 req/h.\n2) Stable à 25 % : 75 % × 60 000 = 45 000 req/h.\n3) Tous les paliers passent : le dernier validé est 100 %.\n4) Aucun palier ne dépasse 0,5 % (maximum 0,4 %) : pas d'arrêt.\n5) Le déploiement est promu à 100 % : promotion.\n6) La part exposée est le rayon d'impact (blast radius).",
        "expected": "6 000 req/h — 45 000 req/h — 100 % — aucun arrêt (maximum 0,4 %) — promotion à 100 % — rayon d'impact",
        "note": "Tant que le taux d'erreur reste sous le seuil, le canari avance ; le premier dépassement l'interrompt."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Requêtes servies par le canari à 5 %",
        "stdin": "q:1",
        "expected": "2000||2 000"
      },
      {
        "label": "Question 2 — Requêtes servies par la version stable à 20 %",
        "stdin": "q:2",
        "expected": "32000||32 000"
      },
      {
        "label": "Question 3 — Dernier palier validé en %",
        "stdin": "q:3",
        "expected": "20||20%||20 %"
      },
      {
        "label": "Question 4 — Taux d'erreur au palier de l'arrêt",
        "stdin": "q:4",
        "expected": "1,8||1.8||1,8%||1.8%||1,8 %||1.8 %"
      },
      {
        "label": "Question 5 — Action déclenchée au-delà du seuil",
        "stdin": "q:5",
        "expected": "rollback||rollback automatique||retour arriere||retour arriere automatique"
      },
      {
        "label": "Question 6 — Part d'utilisateurs exposée",
        "stdin": "q:6",
        "expected": "rayon d’impact||rayon d'impact||rayon d impact||le rayon d’impact||le rayon d'impact||blast radius"
      }
    ],
    "solution": "[Question 1 — Requêtes servies par le canari à 5 %]\n2000\n\n[Question 2 — Requêtes servies par la version stable à 20 %]\n32000\n\n[Question 3 — Dernier palier validé en %]\n20\n\n[Question 4 — Taux d'erreur au palier de l'arrêt]\n1,8\n\n[Question 5 — Action déclenchée au-delà du seuil]\nrollback\n\n[Question 6 — Part d'utilisateurs exposée]\nrayon d’impact",
    "takeaway": "1) Canari au premier palier : 5 % × 40 000 = 2 000 requêtes par heure.\n2) Version stable au palier 20 % : 80 % × 40 000 = 32 000 requêtes par heure.\n3) Les paliers 5 % (0,4 %) et 20 % (0,5 %) restent sous le seuil de 1 % : le dernier palier validé est 20 %.\n4) Au palier 50 %, le taux d'erreur atteint 1,8 % : il dépasse le seuil de 1 %, le déploiement s'arrête à ce palier.\n5) Le pipeline déclenche automatiquement un rollback.\n6) La part d'utilisateurs exposée à la version défaillante s'appelle le rayon d'impact (blast radius).\nContrôle : 2 000 + 38 000 = 40 000 req/h au premier palier ; 8 000 + 32 000 = 40 000 req/h au deuxième."
  },
  {
    "id": "do3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La mise à jour progressive de la plateforme RésaPlus",
    "exampleTitle": "Exemple résolu — la mise à jour progressive de CineBooking",
    "goal": "Dimensionner une mise à jour continue Kubernetes via maxSurge et maxUnavailable et vérifier la garantie de capacité.",
    "brief": "<p><strong>Énoncé.</strong> RésaPlus édite un service de réservation de salles. Son déploiement Kubernetes fait tourner <strong>8 pods</strong> de la version 1. L'équipe lance une mise à jour progressive (rolling update) vers la version 2 avec <strong>maxSurge = 2</strong> et <strong>maxUnavailable = 0</strong> : durant l'opération, le cluster peut dépasser la cible d'au plus 2 pods, et aucune indisponibilité n'est tolérée. Les anciens pods sont remplacés par lots de 2. L'équipe étudie ensuite la configuration <strong>maxSurge = 0 et maxUnavailable = 2</strong>. Répondez par la valeur seule aux questions numériques.</p><ol><li>Quel est le nombre maximal de pods simultanément en cours pendant la mise à jour ?</li><li>Quel est le nombre minimal de pods disponibles à tout moment ?</li><li>Combien de vagues successives faut-il pour remplacer les 8 anciens pods par lots de 2 ?</li><li>Avec maxSurge = 0 et maxUnavailable = 2, quel serait le nombre minimal de pods disponibles ?</li><li>Quel paramètre doit rester à 0 pour garantir une capacité constante pendant la mise à jour ?</li><li>Mise à jour terminée, l'équipe veut activer la nouvelle fonctionnalité pour 10 % des utilisateurs seulement : quel mécanisme doit-elle utiliser ?</li></ol>",
    "starter": "# Exercice — La mise à jour progressive de la plateforme RésaPlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre maximal de pods]\nA_COMPLETER\n\n[Question 2 — Nombre minimal de pods disponibles]\nA_COMPLETER\n\n[Question 3 — Nombre de vagues de remplacement]\nA_COMPLETER\n\n[Question 4 — Minimum disponible avec maxSurge à 0]\nA_COMPLETER\n\n[Question 5 — Paramètre garantissant la capacité]\nA_COMPLETER\n\n[Question 6 — Mécanisme de publication à 10 % des utilisateurs]\nA_COMPLETER\n",
    "hints": [
      "maxSurge autorise des pods supplémentaires au-delà de la cible ; maxUnavailable autorise des pods manquants.",
      "Avec maxUnavailable = 0, la capacité ne baisse jamais ; avec maxSurge = 0, elle ne dépasse jamais la cible.",
      "1. Calculez 8 + 2 pour le maximum. 2. Calculez 8 − 0 pour le minimum. 3. Divisez 8 pods par lots de 2. 4. Calculez 8 − 2. 5. Une capacité constante impose zéro pod indisponible. 6. La publication progressive d'une fonctionnalité passe par des feature flags."
    ],
    "examples": [
      {
        "stdin": "CineBooking (billetterie de cinéma) : 6 pods, mise à jour progressive avec maxSurge = 1 et maxUnavailable = 0, remplacement par lots de 1.\n\n1) Maximum : 6 + 1 = 7 pods.\n2) Minimum disponible : 6 − 0 = 6 pods.\n3) Vagues : 6 pods par lots de 1, soit 6 vagues.\n4) Avec maxSurge = 0 et maxUnavailable = 2 : 6 − 2 = 4 pods au minimum.\n5) La capacité constante exige maxUnavailable = 0.\n6) Publication à une part d'utilisateurs : feature flags.",
        "expected": "7 pods — 6 pods — 6 vagues — 4 pods — maxUnavailable — feature flags",
        "note": "maxSurge privilégie la vitesse en ajoutant de la capacité ; maxUnavailable en en retirant. Seul maxUnavailable = 0 préserve le service."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre maximal de pods",
        "stdin": "q:1",
        "expected": "10"
      },
      {
        "label": "Question 2 — Nombre minimal de pods disponibles",
        "stdin": "q:2",
        "expected": "8"
      },
      {
        "label": "Question 3 — Nombre de vagues de remplacement",
        "stdin": "q:3",
        "expected": "4"
      },
      {
        "label": "Question 4 — Minimum disponible avec maxSurge à 0",
        "stdin": "q:4",
        "expected": "6"
      },
      {
        "label": "Question 5 — Paramètre garantissant la capacité",
        "stdin": "q:5",
        "expected": "maxunavailable||max unavailable||maxunavailable=0||maxunavailable = 0"
      },
      {
        "label": "Question 6 — Mécanisme de publication à 10 % des utilisateurs",
        "stdin": "q:6",
        "expected": "feature flags||feature flag||feature toggle||feature toggles||drapeaux de fonctionnalites||des feature flags"
      }
    ],
    "solution": "[Question 1 — Nombre maximal de pods]\n10\n\n[Question 2 — Nombre minimal de pods disponibles]\n8\n\n[Question 3 — Nombre de vagues de remplacement]\n4\n\n[Question 4 — Minimum disponible avec maxSurge à 0]\n6\n\n[Question 5 — Paramètre garantissant la capacité]\nmaxunavailable\n\n[Question 6 — Mécanisme de publication à 10 % des utilisateurs]\nfeature flags",
    "takeaway": "1) Maximum : 8 + maxSurge = 8 + 2 = 10 pods.\n2) Minimum : 8 − maxUnavailable = 8 − 0 = 8 pods disponibles.\n3) 8 pods remplacés par lots de 2 : 8 / 2 = 4 vagues (créer 2, détruire 2, quatre fois).\n4) Avec maxSurge = 0 et maxUnavailable = 2 : 8 − 2 = 6 pods au minimum.\n5) Une capacité constante impose zéro pod indisponible : maxUnavailable = 0.\n6) La publication progressive à une part des utilisateurs passe par des feature flags.\nContrôle : à chaque vague, le total monte à 10 (2 pods supplémentaires) puis redescend à 8, sans jamais passer sous 8."
  }
];
