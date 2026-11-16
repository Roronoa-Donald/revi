'use strict';

module.exports = [
  {
    "id": "um2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La réservation de trains sur le réseau Vertigo",
    "exampleTitle": "Exemple résolu — l'emprunt à la médiathèque de Sourdun",
    "goal": "Distinguer les relations include (inclusion obligatoire) et extend (extension conditionnelle) dans un diagramme de cas d'utilisation.",
    "brief": "<p><strong>Énoncé.</strong> Le réseau ferroviaire Vertigo refond son site de réservation. L'analyste modélise <strong>5 cas d'utilisation</strong> :</p><ul><li>« Réserver un trajet » : cas de base, toujours exécuté par le voyageur ;</li><li>« Identifier le voyageur » : inclus systématiquement dans « Réserver un trajet » ;</li><li>« Payer le trajet » : inclus systématiquement dans « Réserver un trajet » ;</li><li>« Souscrire une assurance » : ne se déclenche que si le voyageur coche l'option ; la flèche part de « Souscrire une assurance » vers « Réserver un trajet » ;</li><li>« Payer en trois fois » : étend « Payer le trajet » uniquement si le montant dépasse 100 €.</li></ul><p>Un voyageur effectue une réservation simple : il coche l'assurance, mais paie en une fois un trajet de 62 €. Répondez par le mot exact attendu ; les questions fermées se répondent par oui, non, vrai ou faux selon la formulation.</p><ol><li>La relation entre « Réserver un trajet » et « Identifier le voyageur » est-elle un include ou un extend ?</li><li>Combien de cas d'utilisation s'exécutent au total lors de cette réservation avec assurance ?</li><li>Le cas « Payer en trois fois » s'est-il déclenché pour ce trajet de 62 € ?</li><li>« Dans une relation extend, la flèche part du cas étendant vers le cas de base. » Cette affirmation est-elle vraie ou fausse ?</li><li>Le voyageur peut-il éviter l'exécution d'un cas inclus, comme « Identifier le voyageur » ?</li><li>Quel est le cas de base que « Souscrire une assurance » étend ?</li></ol>",
    "starter": "# Exercice — La réservation de trains sur le réseau Vertigo\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui, non, vrai ou faux.\n\n[Question 1 — Type de la relation vers « Identifier le voyageur »]\nA_COMPLETER\n\n[Question 2 — Nombre de cas exécutés lors de la réservation]\nA_COMPLETER\n\n[Question 3 — « Payer en trois fois » s'est-il déclenché ?]\nA_COMPLETER\n\n[Question 4 — Sens de la flèche d'une relation extend]\nA_COMPLETER\n\n[Question 5 — Un cas inclus peut-il être évité ?]\nA_COMPLETER\n\n[Question 6 — Cas de base étendu par « Souscrire une assurance »]\nA_COMPLETER\n",
    "hints": [
      "Un cas inclus s'exécute toujours quand le cas de base s'exécute ; un cas étendant ne s'exécute que si sa condition d'extension est vraie.",
      "Comptez le scénario pas à pas : le cas de base, chaque cas inclus systématiquement, puis les cas étendants dont la condition est vérifiée.",
      "Vérifiez la condition de chaque extension (option cochée, montant supérieur à 100 €), déroulez le scénario du voyageur, puis relisez le sens officiel de la flèche extend."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Sourdun modélise l'emprunt :\n« Emprunter un ouvrage » inclut systématiquement « Vérifier la carte » et « Enregistrer le prêt ».\n« Emprunter un jeu vidéo » étend « Emprunter un ouvrage » si l'adhérent a 16 ans ou plus.\nUn adhérent de 20 ans emprunte un jeu vidéo.\n\n1) « Vérifier la carte » est relié par un include : il s'exécute toujours.\n2) « Emprunter un jeu vidéo » est un extend conditionnel (16 ans ou plus).\n3) Cas exécutés : Emprunter un ouvrage + Vérifier la carte + Enregistrer le prêt + Emprunter un jeu vidéo = 4.\n4) La flèche de l'extend part de « Emprunter un jeu vidéo » (étendant) vers « Emprunter un ouvrage » (base) : vrai.\n5) L'adhérent ne peut éviter ni « Vérifier la carte » ni « Enregistrer le prêt » : ce sont des inclusions.",
        "expected": "include pour Vérifier la carte — extend pour le jeu vidéo — 4 cas exécutés — flèche de l'étendant vers la base : vrai — inclusions inévitables",
        "note": "Un cas inclus s'exécute toujours ; un cas étendant ne s'exécute que si sa condition est vraie."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type de la relation vers « Identifier le voyageur »",
        "stdin": "q:1",
        "expected": "include||inclusion||<<include>>"
      },
      {
        "label": "Question 2 — Nombre de cas exécutés lors de la réservation",
        "stdin": "q:2",
        "expected": "4"
      },
      {
        "label": "Question 3 — « Payer en trois fois » s'est-il déclenché ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Sens de la flèche d'une relation extend",
        "stdin": "q:4",
        "expected": "vrai"
      },
      {
        "label": "Question 5 — Un cas inclus peut-il être évité ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Cas de base étendu par « Souscrire une assurance »",
        "stdin": "q:6",
        "expected": "Réserver un trajet||Reserver un trajet||reserver un trajet"
      }
    ],
    "solution": "[Question 1 — Type de la relation vers « Identifier le voyageur »]\ninclude\n\n[Question 2 — Nombre de cas exécutés lors de la réservation]\n4\n\n[Question 3 — « Payer en trois fois » s'est-il déclenché ?]\nnon\n\n[Question 4 — Sens de la flèche d'une relation extend]\nvrai\n\n[Question 5 — Un cas inclus peut-il être évité ?]\nnon\n\n[Question 6 — Cas de base étendu par « Souscrire une assurance »]\nRéserver un trajet",
    "takeaway": "1) « Identifier le voyageur » est systématiquement exécuté : la relation est un include.\n2) Scénario : « Réserver un trajet » + « Identifier le voyageur » + « Payer le trajet » (inclusions) + « Souscrire une assurance » (option cochée) = 4 cas.\n3) Non : 62 € ne dépassent pas 100 €, la condition de l'extension n'est pas remplie.\n4) Vrai : la flèche extend part toujours du cas étendant vers le cas de base.\n5) Non : un cas inclus ne peut pas être évité, il fait partie intégrante du cas de base.\n6) « Souscrire une assurance » étend le cas de base « Réserver un trajet ».\nContrôle : sans assurance, le voyageur n'exécuterait que 3 cas (base + 2 inclusions) ; avec l'option cochée, 4."
  },
  {
    "id": "um2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Les acteurs du carnet de notes du lycée Ampère",
    "exampleTitle": "Exemple résolu — les acteurs du dossier patient de l'hôpital Saint-Roch",
    "goal": "Propager la généralisation d'acteurs pour établir l'ensemble des cas d'utilisation accessibles à chaque acteur.",
    "brief": "<p><strong>Énoncé.</strong> Le lycée Ampère modélise l'accès à son carnet de notes numériques. Le diagramme comporte <strong>4 acteurs</strong> et <strong>4 cas d'utilisation</strong> :</p><table><tr><th>Acteur</th><th>Hérite de</th><th>Cas directement associés</th></tr><tr><td>Personnel</td><td>—</td><td>Consulter l'emploi du temps</td></tr><tr><td>Enseignant</td><td>Personnel</td><td>Saisir les notes</td></tr><tr><td>Censeur</td><td>Personnel</td><td>Valider les absences</td></tr><tr><td>Proviseur</td><td>Censeur</td><td>Éditer les bulletins</td></tr></table><p>Rappel : un acteur spécialisé hérite de tous les cas d'utilisation associés à ses ancêtres. Répondez par des nombres, le nom exact d'un acteur, ou oui/non.</p><ol><li>Combien de cas d'utilisation l'acteur Enseignant peut-il exécuter au total ?</li><li>Combien de cas d'utilisation l'acteur Proviseur peut-il exécuter au total ?</li><li>L'acteur Censeur peut-il exécuter « Consulter l'emploi du temps » ?</li><li>Combien d'acteurs peuvent exécuter « Valider les absences » ?</li><li>Quel acteur est la racine de la hiérarchie, celui dont les trois autres héritent directement ou indirectement ?</li><li>Combien de cas d'utilisation sont associés directement à l'acteur Personnel ?</li></ol>",
    "starter": "# Exercice — Les acteurs du carnet de notes du lycée Ampère\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Total des cas de l'acteur Enseignant]\nA_COMPLETER\n\n[Question 2 — Total des cas de l'acteur Proviseur]\nA_COMPLETER\n\n[Question 3 — Le Censeur peut-il consulter l'emploi du temps ?]\nA_COMPLETER\n\n[Question 4 — Nombre d'acteurs pouvant valider les absences]\nA_COMPLETER\n\n[Question 5 — Racine de la hiérarchie d'acteurs]\nA_COMPLETER\n\n[Question 6 — Cas directement associés à Personnel]\nA_COMPLETER\n",
    "hints": [
      "La généralisation d'acteurs fonctionne comme un héritage : l'acteur spécialisé obtient tous les cas de son parent, en plus des siens.",
      "Remontez la chaîne d'héritage de chaque acteur jusqu'à la racine et faites l'union des cas rencontrés, sans compter deux fois un même cas.",
      "Établissez la liste de chaque acteur (Enseignant : son cas + ceux de Personnel ; Proviseur : son cas + ceux de Censeur et de Personnel), puis comptez les acteurs qui voient chaque cas."
    ],
    "examples": [
      {
        "stdin": "L'hôpital Saint-Roch modélise son dossier patient avec 3 acteurs :\nSoignant, associé à « Consulter le dossier patient » ;\nMédecin, qui hérite de Soignant, associé à « Prescrire un examen » ;\nChirurgien, qui hérite de Médecin, associé à « Planifier une intervention ».\n\n1) Soignant exécute 1 cas (Consulter le dossier patient).\n2) Médecin hérite de Soignant : 2 cas (Consulter, Prescrire).\n3) Chirurgien hérite de Médecin : 3 cas (Consulter, Prescrire, Planifier).\n4) « Prescrire un examen » est accessible à 2 acteurs : Médecin et Chirurgien.\n5) La racine de la hiérarchie est Soignant.",
        "expected": "Soignant : 1 cas — Médecin : 2 cas — Chirurgien : 3 cas — 2 acteurs peuvent prescrire — racine : Soignant",
        "note": "Chaque acteur spécialisé cumule ses cas propres et ceux de toute sa lignée d'ancêtres."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Total des cas de l'acteur Enseignant",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Total des cas de l'acteur Proviseur",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Le Censeur peut-il consulter l'emploi du temps ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Nombre d'acteurs pouvant valider les absences",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — Racine de la hiérarchie d'acteurs",
        "stdin": "q:5",
        "expected": "Personnel||personnel"
      },
      {
        "label": "Question 6 — Cas directement associés à Personnel",
        "stdin": "q:6",
        "expected": "1"
      }
    ],
    "solution": "[Question 1 — Total des cas de l'acteur Enseignant]\n2\n\n[Question 2 — Total des cas de l'acteur Proviseur]\n3\n\n[Question 3 — Le Censeur peut-il consulter l'emploi du temps ?]\noui\n\n[Question 4 — Nombre d'acteurs pouvant valider les absences]\n2\n\n[Question 5 — Racine de la hiérarchie d'acteurs]\nPersonnel\n\n[Question 6 — Cas directement associés à Personnel]\n1",
    "takeaway": "1) Enseignant : « Saisir les notes » + « Consulter l'emploi du temps » (hérité de Personnel) = 2 cas.\n2) Proviseur : « Éditer les bulletins » + « Valider les absences » (hérité de Censeur) + « Consulter l'emploi du temps » = 3 cas.\n3) Oui : Censeur hérite de Personnel, donc de « Consulter l'emploi du temps ».\n4) « Valider les absences » est accessible à Censeur et, par héritage, à Proviseur : 2 acteurs.\n5) La racine est Personnel : Enseignant et Censeur en héritent directement, Proviseur indirectement.\n6) Personnel possède 1 cas directement associé : « Consulter l'emploi du temps ».\nContrôle : l'union des accès de Proviseur (3 cas) et d'Enseignant (2 cas) couvre les 4 cas du système."
  },
  {
    "id": "um2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit des cas d'utilisation de la billetterie du stade Éclat",
    "exampleTitle": "Exemple résolu — l'audit de la cantine du collège Verlaine",
    "goal": "Détecter les anomalies d'un diagramme de cas d'utilisation : acteur interne, cas orphelin et couverture des cas.",
    "brief": "<p><strong>Énoncé.</strong> La billetterie du stade Éclat doit être modélisée. L'analyste stagiaire propose le diagramme suivant, que son responsable audite :</p><ul><li>Système modélisé : « Billetterie Éclat » ;</li><li>Acteurs : Spectateur (externe), Partenaire (externe), Kiosque (externe), BaseBillets (interne au système) ;</li><li>Cas d'utilisation : « Acheter un billet », « Payer par carte », « Consulter le programme », « Réserver une loge », « Exporter les statistiques » ;</li><li>Associations acteur-cas : Spectateur — « Acheter un billet » ; Spectateur — « Consulter le programme » ; Partenaire — « Réserver une loge » ; Kiosque — « Acheter un billet » ;</li><li>Inclusion : « Acheter un billet » inclut « Payer par carte ».</li></ul><p>Le cas « Exporter les statistiques » n'est relié à aucun acteur et n'est inclus dans aucun autre cas. Rappels : un acteur est toujours externe au système modélisé ; un cas est orphelin s'il n'est relié à aucun acteur, directement ni indirectement. Répondez par des nombres, un nom exact, ou oui/non.</p><ol><li>Combien d'acteurs correctement externes compte le diagramme ?</li><li>Quel acteur est incorrect car interne au système ? Répondez par son nom.</li><li>Quel cas d'utilisation est orphelin ?</li><li>Le cas « Payer par carte » est-il orphelin ?</li><li>Combien de cas sont reliés à au moins un acteur, directement ou par inclusion ?</li><li>Un module interne au logiciel modélisé peut-il être représenté comme acteur ?</li></ol>",
    "starter": "# Exercice — L'audit des cas d'utilisation de la billetterie du stade Éclat\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre d'acteurs correctement externes]\nA_COMPLETER\n\n[Question 2 — Acteur incorrect car interne]\nA_COMPLETER\n\n[Question 3 — Cas d'utilisation orphelin]\nA_COMPLETER\n\n[Question 4 — « Payer par carte » est-il orphelin ?]\nA_COMPLETER\n\n[Question 5 — Nombre de cas reliés à un acteur]\nA_COMPLETER\n\n[Question 6 — Un module interne peut-il être un acteur ?]\nA_COMPLETER\n",
    "hints": [
      "Un acteur est toujours situé hors de la frontière du système : un composant interne (base de données, service technique) n'est jamais un acteur.",
      "Un cas relié à aucun acteur mais inclus dans un cas relié n'est pas orphelin : l'inclusion lui donne un accès indirect.",
      "Parcourez la liste des acteurs (interne ou externe ?), puis chaque cas (associé directement, inclus, ou isolé ?) avant de compter la couverture."
    ],
    "examples": [
      {
        "stdin": "Le collège Verlaine audite son logiciel de cantine :\nSystème : « Cantine Verlaine ».\nActeurs : Élève (externe), Parent (externe), Cantine (interne au système).\nCas : « Réserver un repas » (lié à Élève), « Payer la cantine » (inclus dans « Réserver un repas »), « Signaler une allergie » (lié à Parent), « Générer les factures » (aucun lien).\n\n1) 2 acteurs sont correctement externes : Élève et Parent.\n2) « Cantine » est une anomalie : module interne représenté comme acteur.\n3) « Générer les factures » est orphelin : aucun acteur, aucune inclusion.\n4) « Payer la cantine » n'est pas orphelin : inclus dans un cas relié à Élève.\n5) 3 cas sur 4 sont reliés directement ou indirectement à un acteur.\n6) Un module interne ne peut jamais figurer comme acteur.",
        "expected": "2 acteurs externes — Cantine : acteur interne anormal — orphelin : Générer les factures — 3 cas reliés sur 4 — un module interne n'est pas un acteur",
        "note": "Deux règles d'or : l'acteur est externe ; tout cas doit être atteignable depuis un acteur, directement ou par inclusion."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'acteurs correctement externes",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Acteur incorrect car interne",
        "stdin": "q:2",
        "expected": "BaseBillets||Basebillets||basebillets||Base Billets||base de billets||la base de billets"
      },
      {
        "label": "Question 3 — Cas d'utilisation orphelin",
        "stdin": "q:3",
        "expected": "Exporter les statistiques||exporter les statistiques||Exporter statistiques||exporter statistiques"
      },
      {
        "label": "Question 4 — « Payer par carte » est-il orphelin ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Nombre de cas reliés à un acteur",
        "stdin": "q:5",
        "expected": "4"
      },
      {
        "label": "Question 6 — Un module interne peut-il être un acteur ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre d'acteurs correctement externes]\n3\n\n[Question 2 — Acteur incorrect car interne]\nBaseBillets\n\n[Question 3 — Cas d'utilisation orphelin]\nExporter les statistiques\n\n[Question 4 — « Payer par carte » est-il orphelin ?]\nnon\n\n[Question 5 — Nombre de cas reliés à un acteur]\n4\n\n[Question 6 — Un module interne peut-il être un acteur ?]\nnon",
    "takeaway": "1) Spectateur, Partenaire et Kiosque sont externes : 3 acteurs corrects.\n2) BaseBillets est interne au système : sa représentation comme acteur est une anomalie.\n3) « Exporter les statistiques » n'est relié à aucun acteur ni inclusion : c'est le cas orphelin.\n4) Non : « Payer par carte » est inclus dans « Acheter un billet », lui-même relié à Spectateur et Kiosque.\n5) Cas reliés directement ou indirectement : « Acheter un billet », « Consulter le programme », « Réserver une loge » et « Payer par carte » (par inclusion) = 4 cas sur 5.\n6) Non : un module interne appartient au système, il ne peut pas être acteur.\nContrôle : 4 cas couverts + 1 orphelin = 5 cas ; 3 acteurs externes valides + 1 anomalie d'acteur = 4 acteurs déclarés."
  }
];
