'use strict';

module.exports = [
  {
    "id": "um2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le diagramme de séquence du badgage de bus à Héricourt",
    "exampleTitle": "Exemple résolu — le paiement au restaurant universitaire",
    "goal": "Lire un diagramme de séquence : lignes de vie, ordre chronologique des messages, appels synchrones et retours.",
    "brief": "<p><strong>Énoncé.</strong> La régie de bus de la ville d'Héricourt modélise la validation d'un titre de transport sans contact. Le diagramme de séquence comporte <strong>3 lignes de vie</strong> : Voyageur, Validateur et ServeurST. Les messages, dans l'ordre chronologique (le temps s'écoule de haut en bas) :</p><p><code>1. Voyageur -&gt; Validateur : badger(carte)<br>2. Validateur -&gt; ServeurST : verifierSolde(carte)<br>3. ServeurST --&gt; Validateur : soldeOK<br>4. Validateur --&gt; Voyageur : ticketDelivre</code></p><p>Rappel : une flèche pleine (<code>-&gt;</code>) représente un appel synchrone ; une flèche en pointillés (<code>--&gt;</code>) représente un message de retour. Répondez par des nombres, un nom exact, ou oui/non.</p><ol><li>Combien de lignes de vie compte le diagramme ?</li><li>Quel est le nom du premier message émis ?</li><li>Quel participant reçoit l'appel « verifierSolde(carte) » ?</li><li>Combien de messages de retour (flèches pointillées) compte le scénario ?</li><li>Qui émet le dernier message du scénario ?</li><li>L'appel « badger(carte) » est-il synchrone ?</li></ol>",
    "starter": "# Exercice — Le diagramme de séquence du badgage de bus à Héricourt\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour la question 2, donnez le message avec ses parenthèses (ex. valider(carte)).\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre de lignes de vie]\nA_COMPLETER\n\n[Question 2 — Premier message émis]\nA_COMPLETER\n\n[Question 3 — Destinataire de « verifierSolde(carte) »]\nA_COMPLETER\n\n[Question 4 — Nombre de messages de retour]\nA_COMPLETER\n\n[Question 5 — Émetteur du dernier message]\nA_COMPLETER\n\n[Question 6 — « badger(carte) » est-il synchrone ?]\nA_COMPLETER\n",
    "hints": [
      "Une ligne de vie est un participant du scénario, dessiné par un rectangle en tête et une ligne verticale pointillée.",
      "Le temps s'écoule de haut en bas : numérotez les messages dans l'ordre du diagramme avant de répondre.",
      "Repérez la nature de chaque flèche (pleine ou pointillée), puis suivez les émetteurs et destinataires de chaque message numéroté."
    ],
    "examples": [
      {
        "stdin": "Le restaurant universitaire modélise le paiement au comptoir avec 3 lignes de vie : Etudiant, Caisse, TerminalBancaire.\n1. Etudiant -> Caisse : presenterCarte()\n2. Caisse -> TerminalBancaire : debiterRepas()\n3. TerminalBancaire --> Caisse : paiementAccepte\n4. Caisse --> Etudiant : ticketImprime\n\n1) Le diagramme compte 3 lignes de vie.\n2) Le premier message émis est presenterCarte().\n3) L'appel « debiterRepas() » est reçu par TerminalBancaire.\n4) Le scénario compte 2 messages de retour (paiementAccepte, ticketImprime).\n5) Le dernier message, ticketImprime, est émis par la Caisse.\n6) presenterCarte() est représenté par une flèche pleine : c'est un appel synchrone.",
        "expected": "3 lignes de vie — premier message : presenterCarte() — debiterRepas() reçu par TerminalBancaire — 2 retours — dernier émetteur : la Caisse — appel synchrone",
        "note": "Chaque appel synchrone plein est généralement suivi de sa flèche en pointillés : le compte des retours égale souvent le compte des appels."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de lignes de vie",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Premier message émis",
        "stdin": "q:2",
        "expected": "badger(carte)||badger (carte)||badger"
      },
      {
        "label": "Question 3 — Destinataire de « verifierSolde(carte) »",
        "stdin": "q:3",
        "expected": "ServeurST||Serveur ST||serveurst"
      },
      {
        "label": "Question 4 — Nombre de messages de retour",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — Émetteur du dernier message",
        "stdin": "q:5",
        "expected": "Validateur||validateur||le Validateur||le validateur"
      },
      {
        "label": "Question 6 — « badger(carte) » est-il synchrone ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Nombre de lignes de vie]\n3\n\n[Question 2 — Premier message émis]\nbadger(carte)\n\n[Question 3 — Destinataire de « verifierSolde(carte) »]\nServeurST\n\n[Question 4 — Nombre de messages de retour]\n2\n\n[Question 5 — Émetteur du dernier message]\nValidateur\n\n[Question 6 — « badger(carte) » est-il synchrone ?]\noui",
    "takeaway": "1) Le diagramme compte 3 lignes de vie : Voyageur, Validateur, ServeurST.\n2) Le premier message, en haut du diagramme, est badger(carte).\n3) L'appel verifierSolde(carte) est envoyé par le Validateur : c'est le ServeurST qui le reçoit.\n4) Deux messages de retour en pointillés : soldeOK et ticketDelivre.\n5) Le dernier message ticketDelivre est émis par le Validateur.\n6) Oui : badger(carte) est dessiné avec une flèche pleine, c'est un appel synchrone.\nContrôle : 2 appels synchrones (badger, verifierSolde) et 2 retours (soldeOK, ticketDelivre) : le scénario est équilibré."
  },
  {
    "id": "um2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les fragments combinés du distributeur de la banque Aurore",
    "exampleTitle": "Exemple résolu — le paiement du site de fleurs Botanic",
    "goal": "Interpréter les fragments combinés alt, opt et loop selon un contexte d'exécution donné.",
    "brief": "<p><strong>Énoncé.</strong> La banque Aurore modélise le retrait d'espèces à son distributeur à l'aide de trois fragments combinés :</p><ul><li>un fragment <strong>loop</strong> de bornes [1..3] contenant « Saisir le code » puis « Vérifier le code » ;</li><li>un fragment <strong>alt</strong> : branche [code valide] contenant « Demander le montant » puis « Distribuer les billets » ; branche [sinon] contenant « Afficher code erroné » ;</li><li>un fragment <strong>opt</strong> muni de la garde [montant ≥ 200] contenant « Proposer un reçu détaillé ».</li></ul><p>Contexte d'exécution : la cliente saisit un code valide dès la première tentative et demande 250 €. Répondez par alt, opt ou loop, des nombres, oui/non, ou le nom de la branche.</p><ol><li>Quel type de fragment modélise une alternative exclusive entre plusieurs branches ?</li><li>Combien de fois le bloc « Saisir le code » s'exécute-t-il dans ce scénario ?</li><li>Quelle branche du fragment alt s'exécute : [code valide] ou [sinon] ?</li><li>Le fragment opt « Proposer un reçu détaillé » s'exécute-t-il pour un retrait de 250 € ?</li><li>Quel est le nombre maximal d'itérations autorisé par le loop ?</li><li>Un fragment opt comporte-t-il une branche else ?</li></ol>",
    "starter": "# Exercice — Les fragments combinés du distributeur de la banque Aurore\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Fragment d'alternative exclusive]\nA_COMPLETER\n\n[Question 2 — Exécutions de « Saisir le code »]\nA_COMPLETER\n\n[Question 3 — Branche du alt exécutée]\nA_COMPLETER\n\n[Question 4 — L'opt s'exécute-t-il pour 250 € ?]\nA_COMPLETER\n\n[Question 5 — Maximum d'itérations du loop]\nA_COMPLETER\n\n[Question 6 — Un opt a-t-il une branche else ?]\nA_COMPLETER\n",
    "hints": [
      "alt offre plusieurs branches exclusives ; opt est un cas particulier d'alt à une seule branche conditionnelle ; loop répète son corps.",
      "Le loop s'arrête dès que sa condition de sortie est atteinte : un code valide dès la première saisie met fin à la boucle au minimum de la borne.",
      "Évaluez chaque garde avec le contexte (code valide au premier essai, montant de 250 €), puis appliquez la sémantique de chaque fragment pour dérouler le scénario."
    ],
    "examples": [
      {
        "stdin": "Le site de fleurs Botanic modélise son paiement :\nUn fragment loop [1..5] contenant « Ajouter un article au panier ».\nUn fragment opt avec la garde [total ≥ 50] contenant « Offrir la livraison ».\nUn fragment alt : branche [code promo valide] « Appliquer la remise » ; branche [sinon] « Payer le prix plein ».\nContexte : la cliente ajoute 3 articles, total 64 €, code promo expiré.\n\n1) Le loop s'exécute 3 fois (3 articles ajoutés).\n2) L'opt s'exécute : 64 ≥ 50, la livraison est offerte.\n3) Le code promo étant expiré, c'est la branche [sinon] du alt qui s'exécute.\n4) L'alternative exclusive est modélisée par alt.\n5) Le loop autorise au maximum 5 itérations.",
        "expected": "loop : 3 itérations — livraison offerte (64 ≥ 50) — branche [sinon] du alt — alternative : alt — maximum 5 itérations",
        "note": "Chaque garde s'évalue avec le contexte d'exécution : c'est elle qui décide de la branche empruntée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Fragment d'alternative exclusive",
        "stdin": "q:1",
        "expected": "alt"
      },
      {
        "label": "Question 2 — Exécutions de « Saisir le code »",
        "stdin": "q:2",
        "expected": "1"
      },
      {
        "label": "Question 3 — Branche du alt exécutée",
        "stdin": "q:3",
        "expected": "code valide||[code valide]||la branche code valide||branche [code valide]"
      },
      {
        "label": "Question 4 — L'opt s'exécute-t-il pour 250 € ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Maximum d'itérations du loop",
        "stdin": "q:5",
        "expected": "3"
      },
      {
        "label": "Question 6 — Un opt a-t-il une branche else ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Fragment d'alternative exclusive]\nalt\n\n[Question 2 — Exécutions de « Saisir le code »]\n1\n\n[Question 3 — Branche du alt exécutée]\ncode valide\n\n[Question 4 — L'opt s'exécute-t-il pour 250 € ?]\noui\n\n[Question 5 — Maximum d'itérations du loop]\n3\n\n[Question 6 — Un opt a-t-il une branche else ?]\nnon",
    "takeaway": "1) L'alternative exclusive entre plusieurs branches est le fragment alt.\n2) Le code est valide dès la première tentative : « Saisir le code » s'exécute 1 fois (borne minimale du loop atteinte).\n3) La branche [code valide] du alt s'exécute.\n4) Oui : 250 >= 200, la garde de l'opt est vraie, « Proposer un reçu détaillé » s'exécute.\n5) Le loop [1..3] autorise au maximum 3 itérations.\n6) Non : opt n'a pas de branche else ; si la garde est fausse, le fragment est simplement sauté.\nContrôle : scénario déroulé — Saisir puis Vérifier le code (1 fois), Demander le montant et Distribuer les billets, puis Proposer un reçu détaillé."
  },
  {
    "id": "um2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "L'équilibrage des appels de la commande de Fleurs d'Avril",
    "exampleTitle": "Exemple résolu — la réservation du club RacketClub",
    "goal": "Vérifier l'équilibre d'une trace d'interaction : appels ouverts, retours correspondants et profondeur d'imbrication.",
    "brief": "<p><strong>Énoncé.</strong> Le site de vente « Fleurs d'Avril » trace la validation d'une commande entre <strong>4 lignes de vie</strong> : Client, Panier, Stock et Paiement. Chaque appel synchrone ouvert doit être refermé par un message de retour avant la fin du scénario. La trace, dans l'ordre :</p><p><code>1. Client -&gt; Panier : valider()<br>2. Panier -&gt; Stock : reserver()<br>3. Stock --&gt; Panier : reservationOK<br>4. Panier -&gt; Paiement : debiter()<br>5. Paiement --&gt; Panier : paiementAccepte<br>6. Panier --&gt; Client : commandeConfirmee</code></p><p>Rappel : un appel synchrone (<code>-&gt;</code>) reste « ouvert » jusqu'au retour (<code>--&gt;</code>) qui le referme ; les appels ouverts s'empilent. Répondez par des nombres, un nom exact, ou oui/non.</p><ol><li>Combien d'appels synchrones (flèches pleines) compte la trace ?</li><li>Juste après le message « reserver() » (ligne 2), combien d'appels ouverts non refermés ?</li><li>Quel message de retour referme l'appel « debiter() » ?</li><li>La trace est-elle équilibrée : tous les appels refermés à la fin ?</li><li>Quel participant n'émet jamais d'appel synchrone vers un autre ?</li><li>Quelle profondeur maximale d'imbrication la pile d'activation atteint-elle ?</li></ol>",
    "starter": "# Exercice — L'équilibrage des appels de la commande de Fleurs d'Avril\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre d'appels synchrones]\nA_COMPLETER\n\n[Question 2 — Appels ouverts après « reserver() »]\nA_COMPLETER\n\n[Question 3 — Retour refermant « debiter() »]\nA_COMPLETER\n\n[Question 4 — La trace est-elle équilibrée ?]\nA_COMPLETER\n\n[Question 5 — Participant n'émettant aucun appel]\nA_COMPLETER\n\n[Question 6 — Profondeur maximale d'imbrication]\nA_COMPLETER\n",
    "hints": [
      "Chaque flèche pleine ouvre une activation ; chaque flèche en pointillés referme la plus récente activation ouverte correspondante.",
      "Comptez les flèches pleines et les flèches pointillées séparément : une trace équilibrée en compte autant.",
      "Déroulez la trace ligne à ligne en empilant les appels ouverts et en les dépilant à chaque retour ; notez la taille maximale de la pile."
    ],
    "examples": [
      {
        "stdin": "Le club RacketClub trace une réservation de terrain entre 2 lignes de vie : Adherent et Portail.\n1. Adherent -> Portail : consulterPlanning()\n2. Portail --> Adherent : planningEnvoye\n3. Adherent -> Portail : reserver()\n\n1) La trace compte 2 appels synchrones (consulterPlanning, reserver).\n2) Elle compte 1 seul message de retour (planningEnvoye).\n3) Après le message « reserver() », 1 appel reste ouvert sans retour.\n4) La trace n'est pas équilibrée : « reserver() » n'est jamais refermé.",
        "expected": "2 appels — 1 retour — 1 appel non refermé (reserver) — trace non équilibrée",
        "note": "Une pile d'activation non vide en fin de trace signale un appel jamais refermé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'appels synchrones",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Appels ouverts après « reserver() »",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — Retour refermant « debiter() »",
        "stdin": "q:3",
        "expected": "paiementAccepte||paiementaccepte"
      },
      {
        "label": "Question 4 — La trace est-elle équilibrée ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Participant n'émettant aucun appel",
        "stdin": "q:5",
        "expected": "Stock||stock||le Stock||le stock"
      },
      {
        "label": "Question 6 — Profondeur maximale d'imbrication",
        "stdin": "q:6",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — Nombre d'appels synchrones]\n3\n\n[Question 2 — Appels ouverts après « reserver() »]\n2\n\n[Question 3 — Retour refermant « debiter() »]\npaiementAccepte\n\n[Question 4 — La trace est-elle équilibrée ?]\noui\n\n[Question 5 — Participant n'émettant aucun appel]\nStock\n\n[Question 6 — Profondeur maximale d'imbrication]\n2",
    "takeaway": "1) Trois appels synchrones : valider(), reserver(), debiter().\n2) Après la ligne 2, valider() et reserver() sont ouverts : 2 appels non refermés.\n3) L'appel debiter() est refermé par le retour paiementAccepte.\n4) Oui : 3 appels et 3 retours, la pile est vide à la fin.\n5) Stock n'émet que le retour reservationOK : jamais d'appel synchrone.\n6) La pile atteint la profondeur 2 (valider() puis reserver() imbriqué), avant de redescendre.\nContrôle : appels ouverts ligne à ligne — 1 ; 2 ; 1 ; 2 ; 1 ; 0 : la pile revient à vide, la trace est équilibrée."
  }
];
