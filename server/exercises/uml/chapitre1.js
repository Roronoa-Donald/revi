'use strict';

module.exports = [
  {
    "id": "um2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le choix des diagrammes pour la médiathèque de Brivelle",
    "exampleTitle": "Exemple résolu — le choix des diagrammes de l'application Vel'Cloud",
    "goal": "Choisir le diagramme UML adapté à chaque besoin de modélisation et distinguer familles structurelle et comportementale.",
    "brief": "<p><strong>Énoncé.</strong> La ville de Brivelle refond le logiciel de sa médiathèque municipale. Le chef de projet a listé <strong>quatre besoins de modélisation</strong> et affecte à chacun un diagramme UML 2.5 :</p><table><tr><th>Repère</th><th>Besoin de l'équipe</th><th>Diagramme retenu</th></tr><tr><th>A</th><td>Recenser ce que le système devra faire pour les adhérents et les bibliothécaires</td><td>Cas d'utilisation</td></tr><tr><th>B</th><td>Décrire les données du domaine et leurs liens : Adhérent, Ouvrage, Emprunt</td><td>Classes</td></tr><tr><th>C</th><td>Montrer l'ordre des échanges entre l'écran d'emprunt et le serveur lors d'un prêt</td><td>Séquence</td></tr><tr><th>D</th><td>Représenter le cycle de vie d'un ouvrage : neuf, emprunté, réservé, retiré</td><td>États-transitions</td></tr></table><p>Rappel : UML 2.5 compte 14 diagrammes officiels, répartis en 7 diagrammes structurels et 7 diagrammes comportementaux. Répondez par le mot exact attendu ; pour les questions 3 et 5, donnez le nom du diagramme (un seul mot suffit).</p><ol><li>Combien de diagrammes officiels la norme UML 2.5 définit-elle ?</li><li>Le diagramme retenu pour le besoin A est-il structurel ou comportemental ?</li><li>Quel diagramme a été retenu pour le besoin B ?</li><li>À quelle famille (structurelle ou comportementale) appartient le diagramme retenu pour le besoin C ?</li><li>Quel diagramme a été retenu pour le besoin D ?</li><li>Combien de diagrammes structurels la norme compte-t-elle ?</li></ol>",
    "starter": "# Exercice — Le choix des diagrammes pour la médiathèque de Brivelle\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour les questions 3 et 5, répondez par le nom du diagramme (un seul mot).\n\n[Question 1 — Nombre de diagrammes officiels UML 2.5]\nA_COMPLETER\n\n[Question 2 — Famille du diagramme retenu pour le besoin A]\nA_COMPLETER\n\n[Question 3 — Diagramme retenu pour le besoin B]\nA_COMPLETER\n\n[Question 4 — Famille du diagramme retenu pour le besoin C]\nA_COMPLETER\n\n[Question 5 — Diagramme retenu pour le besoin D]\nA_COMPLETER\n\n[Question 6 — Nombre de diagrammes structurels]\nA_COMPLETER\n",
    "hints": [
      "Un diagramme structurel décrit ce que le système est : ses éléments et leurs liens statiques. Un diagramme comportemental décrit ce que le système fait : scénarios, échanges, cycles de vie.",
      "La famille comportementale regroupe cas d'utilisation, séquence, communication, timing, vue d'ensemble des interactions, activités et états-transitions ; la famille structurelle regroupe classes, objets, composants, déploiement, paquetages, structures composites et profils.",
      "Pour chaque besoin, demandez-vous si l'on décrit une organisation durable (données, architecture) ou un déroulement dans le temps (dialogue, cycle de vie) ; la norme compte ensuite 7 diagrammes de chaque famille sur 14."
    ],
    "examples": [
      {
        "stdin": "L'application de location de vélos Vel'Cloud est refondue. Trois besoins :\nBesoin 1 : décrire les classes Vélo, Station et Bornette ainsi que leurs liens → diagramme de classes.\nBesoin 2 : montrer le dialogue entre l'application mobile et le serveur lors d'une réservation → diagramme de séquence.\nBesoin 3 : représenter le cycle de vie d'une bornette (libre, occupée, hors service) → diagramme d'états-transitions.\n\n1) La norme UML 2.5 définit 14 diagrammes officiels.\n2) Le besoin 1 conduit au diagramme de classes : il est structurel.\n3) Le besoin 2 conduit au diagramme de séquence : il est comportemental.\n4) Le besoin 3 conduit au diagramme d'états-transitions : il est comportemental.\n5) La norme compte 7 diagrammes structurels (et 7 comportementaux).",
        "expected": "14 diagrammes — besoin 1 : classes (structurel) — besoin 2 : séquence (comportemental) — besoin 3 : états-transitions (comportemental) — 7 structurels",
        "note": "Les trois quarts des besoins courants se satisfont avec quatre diagrammes : cas d'utilisation, classes, séquence et états-transitions."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de diagrammes officiels UML 2.5",
        "stdin": "q:1",
        "expected": "14"
      },
      {
        "label": "Question 2 — Famille du diagramme retenu pour le besoin A",
        "stdin": "q:2",
        "expected": "comportemental||comportementale"
      },
      {
        "label": "Question 3 — Diagramme retenu pour le besoin B",
        "stdin": "q:3",
        "expected": "classes||le diagramme de classes||diagramme de classes||classe"
      },
      {
        "label": "Question 4 — Famille du diagramme retenu pour le besoin C",
        "stdin": "q:4",
        "expected": "comportementale||comportemental"
      },
      {
        "label": "Question 5 — Diagramme retenu pour le besoin D",
        "stdin": "q:5",
        "expected": "etats-transitions||états-transitions||etats transitions||états transitions||machine a etats||machine à états||etats||états"
      },
      {
        "label": "Question 6 — Nombre de diagrammes structurels",
        "stdin": "q:6",
        "expected": "7"
      }
    ],
    "solution": "[Question 1 — Nombre de diagrammes officiels UML 2.5]\n14\n\n[Question 2 — Famille du diagramme retenu pour le besoin A]\ncomportemental\n\n[Question 3 — Diagramme retenu pour le besoin B]\nclasses\n\n[Question 4 — Famille du diagramme retenu pour le besoin C]\ncomportementale\n\n[Question 5 — Diagramme retenu pour le besoin D]\netats-transitions\n\n[Question 6 — Nombre de diagrammes structurels]\n7",
    "takeaway": "1) La norme UML 2.5 définit 14 diagrammes officiels.\n2) Le besoin A (recenser les attentes des utilisateurs) relève du diagramme de cas d'utilisation, qui appartient à la famille comportementale.\n3) Le besoin B (décrire Adhérent, Ouvrage, Emprunt et leurs liens) conduit au diagramme de classes.\n4) Le besoin C (ordre des échanges écran-serveur) conduit au diagramme de séquence, de la famille comportementale.\n5) Le besoin D (cycle de vie d'un ouvrage) conduit au diagramme d'états-transitions.\n6) La norme compte 7 diagrammes structurels sur 14 (les 7 autres sont comportementaux).\nContrôle : seul le besoin B est couvert par un diagramme structurel ; A, C et D décrivent des comportements."
  },
  {
    "id": "um2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Les contraintes OCL de la banque en ligne du Crédit Lumière",
    "exampleTitle": "Exemple résolu — les contraintes OCL du vidéoclub CinéBox",
    "goal": "Lire un invariant OCL simple, l'évaluer sur des instances concrètes et rappeler qu'OCL est un langage déclaratif sans effet de bord.",
    "brief": "<p><strong>Énoncé.</strong> La banque en ligne du Crédit Lumière spécifie sa classe <code>Compte</code> à l'aide du langage de contraintes OCL. Le concepteur écrit :</p><p><code>context Compte inv: self.solde &gt;= -200</code></p><p>Cette règle se lit : « le solde de tout compte doit rester supérieur ou égal à -200 €, le découvert maximal autorisé ». L'agence du centre contrôle <strong>5 comptes</strong> :</p><table><tr><th>Compte</th><th>c1</th><th>c2</th><th>c3</th><th>c4</th><th>c5</th></tr><tr><th>Solde (en €)</th><td>350</td><td>-150</td><td>-200</td><td>-250</td><td>0</td></tr></table><p>OCL est un langage déclaratif : évaluer une contrainte ne modifie jamais l'état du système. Répondez par le mot exact attendu ; les questions fermées se répondent par oui ou non.</p><ol><li>Quel mot-clé OCL (« inv », « pre » ou « post ») marque une règle qui doit rester vraie pour toute instance de la classe ?</li><li>Le compte c2, avec un solde de -150 €, respecte-t-il l'invariant ?</li><li>Le compte c3, avec un solde d'exactement -200 €, respecte-t-il l'invariant ?</li><li>Combien de comptes violent l'invariant ?</li><li>Quel mot-clé OCL désigne l'instance courante sur laquelle la contrainte est évaluée ?</li><li>L'évaluation de la contrainte peut-elle modifier le solde d'un compte ?</li></ol>",
    "starter": "# Exercice — Les contraintes OCL de la banque en ligne du Crédit Lumière\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Mot-clé OCL d'une règle toujours vraie]\nA_COMPLETER\n\n[Question 2 — Le compte c2 respecte-t-il l'invariant ?]\nA_COMPLETER\n\n[Question 3 — Le compte c3 respecte-t-il l'invariant ?]\nA_COMPLETER\n\n[Question 4 — Nombre de comptes en violation]\nA_COMPLETER\n\n[Question 5 — Mot-clé désignant l'instance courante]\nA_COMPLETER\n\n[Question 6 — La contrainte peut-elle modifier le solde ?]\nA_COMPLETER\n",
    "hints": [
      "Un invariant est une règle d'intégrité : elle doit être vérifiée en permanence par toute instance valide de la classe, pas seulement au moment de la création.",
      "Attention à l'opérateur >= : la borne est incluse. Comparez chaque solde à -200 en tenant compte du sens de l'opération.",
      "Classez les comptes en deux colonnes (conformes, non conformes), comptez les non conformes, puis rappelez-vous qu'OCL ne fait qu'observer sans jamais modifier."
    ],
    "examples": [
      {
        "stdin": "Le vidéoclub CinéBox spécifie sa classe Abonnement avec l'invariant OCL :\ncontext Abonnement inv: self.pointsFidelite >= 0\nContrôle de 4 abonnés : a1 : 120 points — a2 : 45 points — a3 : 0 points — a4 : -10 points.\n\n1) « inv » marque un invariant : la règle doit rester vraie pour tout abonnement.\n2) a3, avec exactement 0 point, respecte l'invariant : la borne 0 est incluse dans « >= ».\n3) a4, avec -10 points, viole l'invariant : c'est le seul abonnement en infraction.\n4) « self » désigne l'instance courante évaluée.\n5) L'évaluation d'une contrainte OCL ne modifie jamais l'état du système : les points restent inchangés.",
        "expected": "inv — a3 (0 point) conforme, borne incluse — 1 violation (a4) — self — OCL sans effet de bord",
        "note": "L'opérateur >= inclut sa borne : 0 point est conforme ; OCL observe le modèle sans jamais le modifier."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mot-clé OCL d'une règle toujours vraie",
        "stdin": "q:1",
        "expected": "inv"
      },
      {
        "label": "Question 2 — Le compte c2 respecte-t-il l'invariant ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Le compte c3 respecte-t-il l'invariant ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Nombre de comptes en violation",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Mot-clé désignant l'instance courante",
        "stdin": "q:5",
        "expected": "self"
      },
      {
        "label": "Question 6 — La contrainte peut-elle modifier le solde ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Mot-clé OCL d'une règle toujours vraie]\ninv\n\n[Question 2 — Le compte c2 respecte-t-il l'invariant ?]\noui\n\n[Question 3 — Le compte c3 respecte-t-il l'invariant ?]\noui\n\n[Question 4 — Nombre de comptes en violation]\n1\n\n[Question 5 — Mot-clé désignant l'instance courante]\nself\n\n[Question 6 — La contrainte peut-elle modifier le solde ?]\nnon",
    "takeaway": "1) « inv » (invariant) introduit une règle qui doit rester vraie pour toute instance de Compte ; « pre » et « post » encadrent l'exécution d'une opération.\n2) c2 : -150 >= -200, l'invariant est respecté.\n3) c3 : -200 >= -200, la borne est incluse dans l'opérateur >=, l'invariant est respecté.\n4) Seul c4 (-250 < -200) viole l'invariant : 1 compte en infraction.\n5) « self » désigne l'instance courante sur laquelle la contrainte est évaluée.\n6) Non : OCL est déclaratif et sans effet de bord, son évaluation ne change aucun solde.\nContrôle : conformes c1 (350), c2 (-150), c3 (-200), c5 (0) — 4 conformes + 1 violente = 5 comptes contrôlés."
  },
  {
    "id": "um2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "L'architecture Entity-Control-Boundary de la boutique Pêche & Mer",
    "exampleTitle": "Exemple résolu — l'architecture ECB de l'application BookRoom",
    "goal": "Affecter les stéréotypes du motif ECB (entité, contrôle, frontière) et détecter les couplages interdits entre frontières et entités.",
    "brief": "<p><strong>Énoncé.</strong> La boutique en ligne « Pêche &amp; Mer » applique le motif d'analyse Entity-Control-Boundary (ECB) à son module de commande. Le concepteur stéréotype <strong>4 classes</strong> :</p><table><tr><th>Classe</th><th>Rôle</th><th>Stéréotype</th></tr><tr><td>EcranPaiement</td><td>Écran de paiement affiché au client</td><td>&lt;&lt;boundary&gt;&gt;</td></tr><tr><td>PanierCtrl</td><td>Orchestration du paiement du panier</td><td>&lt;&lt;control&gt;&gt;</td></tr><tr><td>Commande</td><td>Données métier persistantes</td><td>&lt;&lt;entity&gt;&gt;</td></tr><tr><td>EcranConfirmation</td><td>Écran de confirmation affiché au client</td><td>&lt;&lt;boundary&gt;&gt;</td></tr></table><p>Il propose ensuite <strong>4 relations</strong> :</p><p><code>R1 : EcranPaiement → PanierCtrl<br>R2 : PanierCtrl → Commande<br>R3 : EcranPaiement → Commande<br>R4 : Commande → EcranConfirmation</code></p><p>Règles du motif ECB : une frontière (<code>&lt;&lt;boundary&gt;&gt;</code>) dialogue avec l'utilisateur mais ne touche jamais directement une entité (<code>&lt;&lt;entity&gt;&gt;</code>) ; toute interaction avec les entités passe par un contrôleur (<code>&lt;&lt;control&gt;&gt;</code>) ; et une entité ne doit jamais dépendre d'une frontière. Répondez par le mot exact attendu, oui ou non, un nombre, ou le nom d'une classe.</p><ol><li>Quel stéréotype porte une classe qui contient les données métier persistantes ?</li><li>Quel stéréotype porte la classe EcranPaiement ?</li><li>La relation R1 (EcranPaiement → PanierCtrl) est-elle conforme au motif ECB ?</li><li>La relation R3 (EcranPaiement → Commande) est-elle conforme au motif ECB ?</li><li>Combien de relations non conformes compte la proposition ?</li><li>Quelle classe existante faut-il insérer entre EcranPaiement et Commande pour rendre R3 conforme ? Répondez par son nom.</li></ol>",
    "starter": "# Exercice — L'architecture Entity-Control-Boundary de la boutique Pêche & Mer\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Stéréotype des données métier persistantes]\nA_COMPLETER\n\n[Question 2 — Stéréotype de la classe EcranPaiement]\nA_COMPLETER\n\n[Question 3 — La relation R1 est-elle conforme ?]\nA_COMPLETER\n\n[Question 4 — La relation R3 est-elle conforme ?]\nA_COMPLETER\n\n[Question 5 — Nombre de relations non conformes]\nA_COMPLETER\n\n[Question 6 — Classe à insérer pour corriger R3]\nA_COMPLETER\n",
    "hints": [
      "Le motif ECB sépare les responsabilités : les frontières capturent les entrées-sorties, les entités portent les données durables, les contrôleurs orchestrent le travail.",
      "Examinez le stéréotype de la source et celui de la cible de chaque relation : une frontière vers une entité directe est interdite, de même qu'une entité vers une frontière.",
      "Classez R1 à R4 en deux colonnes (conformes, interdites), comptez les interdites, puis cherchez parmi les 4 classes celle qui joue le rôle d'intermédiaire autorisé."
    ],
    "examples": [
      {
        "stdin": "L'application de réservation de salles BookRoom stéréotype 4 classes :\nEcranReservation <<boundary>>, ReservationCtrl <<control>>, Salle <<entity>>, EcranAide <<boundary>>.\nRelations proposées :\nR1 : EcranReservation -> ReservationCtrl\nR2 : ReservationCtrl -> Salle\nR3 : EcranReservation -> Salle\n\n1) Les données métier persistantes portent le stéréotype <<entity>> : c'est la classe Salle.\n2) EcranReservation, qui affiche l'écran au client, porte <<boundary>>.\n3) R1, d'une frontière vers un contrôleur, est conforme.\n4) R3, d'une frontière vers une entité sans passer par un contrôleur, n'est pas conforme.\n5) Une seule relation non conforme : R3.\n6) Pour rendre R3 conforme, il faut passer par ReservationCtrl, le contrôleur du module.",
        "expected": "entity pour Salle — boundary pour EcranReservation — R1 conforme — R3 interdite — 1 relation non conforme — passer par le contrôleur ReservationCtrl",
        "note": "Le motif ECB isole les entités : toute frontière doit passer par un contrôleur pour les atteindre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Stéréotype des données métier persistantes",
        "stdin": "q:1",
        "expected": "entity||entite||entité||<<entity>>"
      },
      {
        "label": "Question 2 — Stéréotype de la classe EcranPaiement",
        "stdin": "q:2",
        "expected": "boundary||frontiere||frontière||<<boundary>>"
      },
      {
        "label": "Question 3 — La relation R1 est-elle conforme ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — La relation R3 est-elle conforme ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Nombre de relations non conformes",
        "stdin": "q:5",
        "expected": "2"
      },
      {
        "label": "Question 6 — Classe à insérer pour corriger R3",
        "stdin": "q:6",
        "expected": "PanierCtrl||Panierctrl||panierctrl||Panier Ctrl"
      }
    ],
    "solution": "[Question 1 — Stéréotype des données métier persistantes]\nentity\n\n[Question 2 — Stéréotype de la classe EcranPaiement]\nboundary\n\n[Question 3 — La relation R1 est-elle conforme ?]\noui\n\n[Question 4 — La relation R3 est-elle conforme ?]\nnon\n\n[Question 5 — Nombre de relations non conformes]\n2\n\n[Question 6 — Classe à insérer pour corriger R3]\nPanierCtrl",
    "takeaway": "1) Les données métier persistantes portent le stéréotype <<entity>> : ici, la classe Commande.\n2) EcranPaiement est affichée au client : elle porte le stéréotype <<boundary>>.\n3) R1 relie une frontière à un contrôleur : conforme au motif ECB.\n4) R3 relie une frontière à une entité sans passer par un contrôleur : non conforme.\n5) Deux relations sont interdites : R3 (frontière vers entité directe) et R4 (entité dépendant d'une frontière).\n6) PanierCtrl, le contrôleur du module, doit s'intercaler entre EcranPaiement et Commande.\nContrôle : R1 et R2 sont conformes ; R3 et R4 corrigées via PanierCtrl, le modèle devient entièrement conforme."
  }
];
