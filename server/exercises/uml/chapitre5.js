'use strict';

module.exports = [
  {
    "id": "um2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le tri des dossiers du péri-scolaire de Vellecomte",
    "exampleTitle": "Exemple résolu — la préparation des commandes de ColisVite",
    "goal": "Suivre un chemin d'exécution dans un diagramme d'activités avec nœud de décision et gardes.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Vellecomte traite les inscriptions au péri-scolaire avec le diagramme d'activités suivant :</p><p><code>Départ → Recevoir le dossier → Vérifier la complétude → Décision<br>[dossier complet] → Enregistrer l'inscription → Arrivée<br>[sinon] → Renvoyer au demandeur → Arrivée</code></p><p>Le lundi matin, le service reçoit <strong>12 dossiers</strong> : <strong>9 complets</strong> et <strong>3 incomplets</strong>. Rappel : chaque branche sortant d'un nœud de décision porte une garde entre crochets ; pour un jeton donné, exactement une garde vraie est suivie. Répondez par des nombres ou oui/non.</p><ol><li>Combien de branches sortent du nœud de décision ?</li><li>Combien de dossiers empruntent la branche [dossier complet] ?</li><li>Combien de dossiers passent par l'action « Renvoyer au demandeur » ?</li><li>Combien de dossiers aboutissent à un nœud d'arrivée ?</li><li>Une garde est-elle obligatoire sur chaque branche sortant d'une décision ?</li><li>Un diagramme d'activités peut-il comporter plusieurs nœuds d'arrivée ?</li></ol>",
    "starter": "# Exercice — Le tri des dossiers du péri-scolaire de Vellecomte\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre de branches sortant de la décision]\nA_COMPLETER\n\n[Question 2 — Dossiers sur la branche « dossier complet »]\nA_COMPLETER\n\n[Question 3 — Dossiers passant par « Renvoyer au demandeur »]\nA_COMPLETER\n\n[Question 4 — Dossiers aboutissant à une arrivée]\nA_COMPLETER\n\n[Question 5 — Garde obligatoire sur chaque branche ?]\nA_COMPLETER\n\n[Question 6 — Plusieurs nœuds d'arrivée autorisés ?]\nA_COMPLETER\n",
    "hints": [
      "Le nœud de décision, dessiné en losange, route chaque jeton vers la première branche dont la garde est vraie.",
      "Traitez chaque dossier indépendamment : sa complétude détermine sa branche, puis comptez les effectifs par branche.",
      "Comptez les branches du losange, répartissez les 12 dossiers selon leur garde (9 et 3), puis vérifiez que chaque chemin mène bien à une arrivée."
    ],
    "examples": [
      {
        "stdin": "L'entrepôt ColisVite prépare ses commandes :\nDépart → Extraire la commande → Contrôler le stock → Décision\n[stock suffisant] → Emballer → Étiqueter → Arrivée\n[sinon] → Commander à l'entrepôt central → Arrivée\nSur la journée : 20 commandes, 15 avec stock suffisant, 5 en réassort.\n\n1) La décision possède 2 branches sortantes.\n2) 15 commandes passent par Emballer puis Étiqueter.\n3) 5 commandes passent par « Commander à l'entrepôt central ».\n4) Les 20 commandes aboutissent à une arrivée.\n5) Chaque branche porte bien une garde.\n6) Le diagramme utilise ici 2 nœuds d'arrivée : c'est autorisé.",
        "expected": "2 branches — 15 colis emballés — 5 en réassort — 20 aboutissent — gardes obligatoires — plusieurs arrivées autorisées",
        "note": "La décision ne duplique pas le jeton : chaque dossier suit exactement une branche."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de branches sortant de la décision",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Dossiers sur la branche « dossier complet »",
        "stdin": "q:2",
        "expected": "9"
      },
      {
        "label": "Question 3 — Dossiers passant par « Renvoyer au demandeur »",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Dossiers aboutissant à une arrivée",
        "stdin": "q:4",
        "expected": "12"
      },
      {
        "label": "Question 5 — Garde obligatoire sur chaque branche ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Plusieurs nœuds d'arrivée autorisés ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Nombre de branches sortant de la décision]\n2\n\n[Question 2 — Dossiers sur la branche « dossier complet »]\n9\n\n[Question 3 — Dossiers passant par « Renvoyer au demandeur »]\n3\n\n[Question 4 — Dossiers aboutissant à une arrivée]\n12\n\n[Question 5 — Garde obligatoire sur chaque branche ?]\noui\n\n[Question 6 — Plusieurs nœuds d'arrivée autorisés ?]\noui",
    "takeaway": "1) Le nœud de décision possède 2 branches sortantes : [dossier complet] et [sinon].\n2) 9 dossiers complets empruntent la branche [dossier complet].\n3) 3 dossiers incomplets passent par « Renvoyer au demandeur ».\n4) Les 12 dossiers aboutissent tous à un nœud d'arrivée (9 par une arrivée, 3 par l'autre).\n5) Oui : chaque branche sortant d'une décision porte une garde.\n6) Oui : un diagramme d'activités peut comporter plusieurs nœuds d'arrivée.\nContrôle : 9 dossiers sur la première branche + 3 sur la seconde = 12 dossiers traités, aucun perdu."
  },
  {
    "id": "um2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le service en parallèle du restaurant Le Bocage d'Argent",
    "exampleTitle": "Exemple résolu — l'assemblage du studio Instantané",
    "goal": "Raisonner sur le parallélisme fork/join : branches concurrentes, barrière de synchronisation et jeton unique en sortie.",
    "brief": "<p><strong>Énoncé.</strong> Le restaurant « Le Bocage d'Argent » modélise la préparation d'un menu. Après l'action « Enregistrer la commande », une barre de fork lance <strong>trois branches parallèles</strong> :</p><table><tr><th>Branche</th><th>Action</th><th>Durée</th></tr><tr><td>B1</td><td>Préparer l'entrée</td><td>12 minutes</td></tr><tr><td>B2</td><td>Préparer le plat</td><td>25 minutes</td></tr><tr><td>B3</td><td>Préparer le dessert</td><td>8 minutes</td></tr></table><p>Une barre de join attend l'achèvement des trois branches avant l'action « Servir le client ». Rappel : le join ne laisse passer le flux que lorsque toutes les branches entrantes sont terminées. Répondez par des nombres, le nom d'une action, ou oui/non.</p><ol><li>Combien de branches la barre de fork lance-t-elle en parallèle ?</li><li>Combien de branches doivent être terminées pour franchir le join ?</li><li>Quelle branche, dernière à se terminer, déclenche le franchissement du join ?</li><li>Après 12 minutes, combien de branches restent inachevées ?</li><li>Combien de flux ressortent du join une fois toutes les branches terminées ?</li><li>Le join se franchit-il dès qu'une seule branche est terminée ?</li></ol>",
    "starter": "# Exercice — Le service en parallèle du restaurant Le Bocage d'Argent\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour la question 3, répondez par le nom de l'action (ex. Préparer le plat).\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre de branches lancées par le fork]\nA_COMPLETER\n\n[Question 2 — Branches attendues par le join]\nA_COMPLETER\n\n[Question 3 — Dernière branche à se terminer]\nA_COMPLETER\n\n[Question 4 — Branches inachevées après 12 minutes]\nA_COMPLETER\n\n[Question 5 — Flux sortant du join]\nA_COMPLETER\n\n[Question 6 — Le join se franchit-il à la première fin de branche ?]\nA_COMPLETER\n",
    "hints": [
      "La barre de fork duplique le jeton : chaque branche reçoit son propre jeton et avance à son rythme.",
      "La barre de join est une barrière de synchronisation : elle attend le dernier jeton, quelle que soit l'ordre d'arrivée.",
      "Classez les branches par durée croissante pour identifier la dernière terminée, puis comptez à un instant donné celles qui ne sont pas finies."
    ],
    "examples": [
      {
        "stdin": "Le studio photo Instantané modélise une commande :\nAprès « Recevoir la commande », un fork lance 3 branches :\nA « Développer les photos » (20 minutes), B « Imprimer le cadre » (35 minutes), C « Préparer le carton d'invitation » (10 minutes).\nUn join attend les trois branches avant « Assembler la commande ».\n\n1) Le fork lance 3 branches parallèles.\n2) Le join attend les 3 branches.\n3) La branche B (35 minutes) se termine en dernier : c'est elle qui déclenche le join.\n4) Après 20 minutes, seule la branche B reste inachevée : 1 branche.\n5) Un seul flux ressort du join vers « Assembler la commande ».",
        "expected": "3 branches — 3 attendues au join — « Imprimer le cadre » dernière (35 min) — après 20 min : 1 branche restante — 1 flux en sortie",
        "note": "La durée la plus longue impose le rythme : le join attend le jeton le plus lent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de branches lancées par le fork",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Branches attendues par le join",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Dernière branche à se terminer",
        "stdin": "q:3",
        "expected": "Préparer le plat||preparer le plat||Preparer le plat||B2||le plat||plat"
      },
      {
        "label": "Question 4 — Branches inachevées après 12 minutes",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Flux sortant du join",
        "stdin": "q:5",
        "expected": "1"
      },
      {
        "label": "Question 6 — Le join se franchit-il à la première fin de branche ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre de branches lancées par le fork]\n3\n\n[Question 2 — Branches attendues par le join]\n3\n\n[Question 3 — Dernière branche à se terminer]\nPréparer le plat\n\n[Question 4 — Branches inachevées après 12 minutes]\n1\n\n[Question 5 — Flux sortant du join]\n1\n\n[Question 6 — Le join se franchit-il à la première fin de branche ?]\nnon",
    "takeaway": "1) Le fork lance 3 branches parallèles : B1, B2, B3.\n2) Le join attend l'achèvement des 3 branches.\n3) Le plat (25 minutes) est le plus long à préparer : « Préparer le plat » se termine en dernier et déclenche le join.\n4) Après 12 minutes, l'entrée (12 min) et le dessert (8 min) sont prêts : seul le plat reste, soit 1 branche inachevée.\n5) Un seul flux ressort du join, vers « Servir le client ».\n6) Non : le join attend toutes les branches, pas seulement la première terminée.\nContrôle : le service démarre après 25 minutes, la durée de la branche la plus lente."
  },
  {
    "id": "um2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Les couloirs de traitement des sinistres de l'assureur Sécuria",
    "exampleTitle": "Exemple résolu — la note de frais du cabinet Astel",
    "goal": "Lire un diagramme d'activités à couloirs (swimlanes) et identifier le responsable de chaque action.",
    "brief": "<p><strong>Énoncé.</strong> L'assureur Sécuria modélise le traitement d'un sinistre habitation avec <strong>3 couloirs</strong> : Assuré, Guichet Sinistres et Expert. Les actions, dans l'ordre :</p><table><tr><th>Ordre</th><th>Action</th><th>Couloir responsable</th></tr><tr><td>1</td><td>Déclarer le sinistre</td><td>Assuré</td></tr><tr><td>2</td><td>Enregistrer le dossier</td><td>Guichet Sinistres</td></tr><tr><td>3</td><td>Estimer les dégâts</td><td>Expert</td></tr><tr><td>4</td><td>Décision [devis ≤ 1 500 €]</td><td>Guichet Sinistres</td></tr><tr><td>5a (si oui)</td><td>Indemniser directement</td><td>Guichet Sinistres</td></tr><tr><td>5b (sinon)</td><td>Mandater un réparateur</td><td>Expert</td></tr></table><p>Rappel : un couloir (swimlane) matérialise qui exécute chaque action du processus. Répondez par des nombres, le nom d'un couloir, ou oui/non.</p><ol><li>Combien de couloirs compte le diagramme ?</li><li>Dans quel couloir se trouve l'action « Estimer les dégâts » ?</li><li>Combien d'actions sont affectées au couloir Guichet Sinistres (hormis le nœud de décision) ?</li><li>Qui est responsable de l'action « Déclarer le sinistre » ?</li><li>Un couloir indique-t-il qui exécute chaque action ?</li><li>Combien d'actions, hors nœuds de contrôle et décision, compte le processus ?</li></ol>",
    "starter": "# Exercice — Les couloirs de traitement des sinistres de l'assureur Sécuria\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour les questions 2 et 4, répondez par le nom du couloir (ex. Expert).\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre de couloirs]\nA_COMPLETER\n\n[Question 2 — Couloir de « Estimer les dégâts »]\nA_COMPLETER\n\n[Question 3 — Actions du couloir Guichet Sinistres]\nA_COMPLETER\n\n[Question 4 — Responsable de « Déclarer le sinistre »]\nA_COMPLETER\n\n[Question 5 — Le couloir indique-t-il le responsable ?]\nA_COMPLETER\n\n[Question 6 — Nombre total d'actions]\nA_COMPLETER\n",
    "hints": [
      "Chaque action est dessinée dans le couloir de celui qui l'exécute : la position dans le couloir donne le responsable.",
      "Ne confondez pas le nœud de décision (losange) avec les actions (rectangles arrondis) : seules les actions comptent dans les dénombrements.",
      "Listez les actions couloir par couloir (Assuré, Guichet Sinistres, Expert), additionnez-les, puis contrôlez avec le tableau."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Astel modélise sa note de frais avec 2 couloirs : Employé et Direction.\nActions :\n1. « Remplir la note de frais » — Employé\n2. « Joindre les justificatifs » — Employé\n3. « Contrôler la note » — Direction\n4. Décision [montant ≤ 80 €]\n5a (si oui) « Rembourser » — Direction ; 5b (sinon) « Faire valider par la direction générale » — Direction.\n\n1) Le diagramme compte 2 couloirs.\n2) « Joindre les justificatifs » est exécutée par l'Employé.\n3) La Direction exécute 3 actions : Contrôler, Rembourser, Faire valider.\n4) Le processus compte 5 actions au total (hors décision).\n5) Le couloir indique bien le responsable de chaque action.",
        "expected": "2 couloirs — justificatifs : Employé — 3 actions pour la Direction — 5 actions au total — le couloir donne le responsable",
        "note": "Le couloir répond à la question « qui fait quoi » : c'est la lecture première d'un diagramme d'activités à swimlanes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de couloirs",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Couloir de « Estimer les dégâts »",
        "stdin": "q:2",
        "expected": "Expert||expert||l'Expert||l'expert||couloir Expert"
      },
      {
        "label": "Question 3 — Actions du couloir Guichet Sinistres",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Responsable de « Déclarer le sinistre »",
        "stdin": "q:4",
        "expected": "Assuré||assure||l'Assuré||l'assure"
      },
      {
        "label": "Question 5 — Le couloir indique-t-il le responsable ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Nombre total d'actions",
        "stdin": "q:6",
        "expected": "5"
      }
    ],
    "solution": "[Question 1 — Nombre de couloirs]\n3\n\n[Question 2 — Couloir de « Estimer les dégâts »]\nExpert\n\n[Question 3 — Actions du couloir Guichet Sinistres]\n2\n\n[Question 4 — Responsable de « Déclarer le sinistre »]\nAssuré\n\n[Question 5 — Le couloir indique-t-il le responsable ?]\noui\n\n[Question 6 — Nombre total d'actions]\n5",
    "takeaway": "1) Le diagramme compte 3 couloirs : Assuré, Guichet Sinistres, Expert.\n2) « Estimer les dégâts » est exécutée par l'Expert.\n3) Le Guichet Sinistres exécute 2 actions : « Enregistrer le dossier » et « Indemniser directement ».\n4) « Déclarer le sinistre » est le fait de l'Assuré.\n5) Oui : le couloir matérialise le responsable de chaque action.\n6) Le processus compte 5 actions : Déclarer, Enregistrer, Estimer, Indemniser, Mandater (hors décision).\nContrôle : 1 action (Assuré) + 2 (Guichet Sinistres) + 2 (Expert) = 5 actions, réparties sur 3 couloirs."
  }
];
