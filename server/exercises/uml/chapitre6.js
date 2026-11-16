'use strict';

module.exports = [
  {
    "id": "um2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "La machine à états de la barrière du parking Silo 4",
    "exampleTitle": "Exemple résolu — la machine à états du distributeur GobeletPressé",
    "goal": "Lire une machine à états UML : états, transitions, événements déclencheurs et scénario d'exécution.",
    "brief": "<p><strong>Énoncé.</strong> La société ParcPlus modélise la barrière d'accès du parking Silo 4 par une machine à états UML comportant <strong>3 états</strong> : Fermée, Ouverte et Bloquée. Les transitions :</p><ul><li>Fermée —sur événement « badge accepté »→ Ouverte ;</li><li>Ouverte —sur événement « voiture passée »→ Fermée ;</li><li>Fermée —sur événement « 3 refus de badge »→ Bloquée ;</li><li>Bloquée —sur événement « appel du standard »→ Fermée.</li></ul><p>Scénario du mardi matin : un premier usager présente un badge accepté et passe ; puis un second usager présente trois fois un badge invalide. Répondez par des nombres, le nom d'un état ou d'un événement, ou oui/non.</p><ol><li>Combien d'états compte la machine ?</li><li>Quel événement fait passer la barrière de l'état Fermée à l'état Ouverte ?</li><li>Dans quel état se trouve la barrière juste après le passage de la première voiture ?</li><li>Dans quel état se trouve la barrière à la fin du scénario du mardi matin ?</li><li>Combien de transitions partent de l'état Fermée ?</li><li>Depuis l'état Bloquée, l'événement « badge accepté » déclenche-t-il une transition ?</li></ol>",
    "starter": "# Exercice — La machine à états de la barrière du parking Silo 4\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour les questions 3 et 4, répondez par le nom de l'état (ex. Ouverte).\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre d'états de la machine]\nA_COMPLETER\n\n[Question 2 — Événement menant de Fermée à Ouverte]\nA_COMPLETER\n\n[Question 3 — État après le passage de la première voiture]\nA_COMPLETER\n\n[Question 4 — État à la fin du scénario]\nA_COMPLETER\n\n[Question 5 — Transitions sortant de Fermée]\nA_COMPLETER\n\n[Question 6 — « badge accepté » a-t-il un effet depuis Bloquée ?]\nA_COMPLETER\n",
    "hints": [
      "Un état représente une situation stable de l'objet ; une transition relie deux états et se déclenche sur un événement.",
      "Déroulez le scénario pas à pas en partant de l'état initial : chaque événement consommé vous place dans un nouvel état.",
      "Suivez le premier usager (badge accepté puis voiture passée), puis le second (3 refus) ; comptez enfin les flèches sortant de l'état Fermée."
    ],
    "examples": [
      {
        "stdin": "Le distributeur GobeletPressé possède 4 états : Veille, Saisie, Préparation, HorsService.\nTransitions :\nVeille —pièce insérée→ Saisie ;\nSaisie —boisson choisie→ Préparation ;\nPréparation —boisson servie→ Veille ;\nVeille —panne signalée→ HorsService ;\nHorsService —technicien intervenu→ Veille.\nScénario : un client insère une pièce, choisit une boisson et est servi.\n\n1) La machine compte 4 états.\n2) Après le service, la machine revient à l'état Veille.\n3) La panne mène de Veille à HorsService.\n4) « boisson choisie » fait passer de Saisie à Préparation.\n5) 2 transitions partent de Veille (pièce insérée, panne signalée).",
        "expected": "4 états — retour en Veille après service — panne : Veille vers HorsService — « boisson choisie » : Saisie vers Préparation — 2 transitions sortent de Veille",
        "note": "Seuls les événements prévus par une transition sortante de l'état courant ont un effet : les autres sont ignorés."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'états de la machine",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Événement menant de Fermée à Ouverte",
        "stdin": "q:2",
        "expected": "badge accepté||badge accepte||badge valide||le badge accepté"
      },
      {
        "label": "Question 3 — État après le passage de la première voiture",
        "stdin": "q:3",
        "expected": "Fermée||Fermee||fermee"
      },
      {
        "label": "Question 4 — État à la fin du scénario",
        "stdin": "q:4",
        "expected": "Bloquée||Bloquee||bloquee"
      },
      {
        "label": "Question 5 — Transitions sortant de Fermée",
        "stdin": "q:5",
        "expected": "2"
      },
      {
        "label": "Question 6 — « badge accepté » a-t-il un effet depuis Bloquée ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre d'états de la machine]\n3\n\n[Question 2 — Événement menant de Fermée à Ouverte]\nbadge accepté\n\n[Question 3 — État après le passage de la première voiture]\nFermée\n\n[Question 4 — État à la fin du scénario]\nBloquée\n\n[Question 5 — Transitions sortant de Fermée]\n2\n\n[Question 6 — « badge accepté » a-t-il un effet depuis Bloquée ?]\nnon",
    "takeaway": "1) La machine compte 3 états : Fermée, Ouverte, Bloquée.\n2) L'événement « badge accepté » fait passer de Fermée à Ouverte.\n3) Après le passage de la première voiture, l'événement « voiture passée » ramène la barrière en Fermée.\n4) Les trois refus successifs du second usager font passer la barrière de Fermée à Bloquée : c'est l'état final du scénario.\n5) Deux transitions partent de Fermée (vers Ouverte et vers Bloquée).\n6) Non : depuis Bloquée, seule la transition « appel du standard » est prévue ; « badge accepté » est sans effet.\nContrôle : scénario complet — Fermée, puis Ouverte, puis Fermée, puis Bloquée : 3 transitions franchies, l'état final est Bloquée."
  },
  {
    "id": "um2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Les interfaces des composants du poste de péage du Soleil",
    "exampleTitle": "Exemple résolu — les interfaces de la box domotique MaisonCo",
    "goal": "Assembler des composants UML en appariant interfaces fournies (lollipop) et interfaces requises (socket), versions comprises.",
    "brief": "<p><strong>Énoncé.</strong> L'autoroute du Soleil automatise ses postes de péage. Le diagramme de composants décrit <strong>3 composants</strong> et <strong>2 connecteurs d'assemblage</strong> :</p><ul><li>« ApplicationPéage » requiert l'interface <code>IPaiement</code> en version 1.2 minimum et l'interface <code>ILecturePlaque</code> en version 2.0 minimum ;</li><li>« ModuleBancaire » fournit l'interface <code>IPaiement</code> en version 1.5 ;</li><li>« CaméraLecture » fournit l'interface <code>ILecturePlaque</code> en version 2.1 ;</li><li>un connecteur relie ApplicationPéage à ModuleBancaire via IPaiement, un autre relie ApplicationPéage à CaméraLecture via ILecturePlaque.</li></ul><p>Rappel : une interface fournie se dessine en « sucette » (lollipop), une interface requise en « prise » (socket) ; un connecteur est valide si le fournisseur offre l'interface dans une version supérieure ou égale au minimum exigé. Répondez par le nom d'un composant, oui/non, un nombre, ou le mot exact demandé.</p><ol><li>Quel composant fournit l'interface IPaiement ?</li><li>Quel composant requiert l'interface ILecturePlaque ?</li><li>La version fournie de IPaiement (1.5) couvre-t-elle le besoin minimal (1.2) ?</li><li>Combien de connecteurs d'assemblage le diagramme décrit-il ?</li><li>Quel symbole en demi-cercle ouvert représente une interface requise ?</li><li>Le composant CaméraLecture requiert-il l'interface IPaiement ?</li></ol>",
    "starter": "# Exercice — Les interfaces des composants du poste de péage du Soleil\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour les questions 1 et 2, répondez par le nom du composant (ex. ModuleBancaire).\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Fournisseur de l'interface IPaiement]\nA_COMPLETER\n\n[Question 2 — Demandeur de l'interface ILecturePlaque]\nA_COMPLETER\n\n[Question 3 — La version 1.5 couvre-t-elle le besoin 1.2 ?]\nA_COMPLETER\n\n[Question 4 — Nombre de connecteurs d'assemblage]\nA_COMPLETER\n\n[Question 5 — Symbole d'une interface requise]\nA_COMPLETER\n\n[Question 6 — CaméraLecture requiert-il IPaiement ?]\nA_COMPLETER\n",
    "hints": [
      "Fournir une interface, c'est exposer des services ; requérir une interface, c'en consommer : le connecteur relie une prise à une sucette.",
      "Comparez les numéros de version comme des nombres décimaux : le fournisseur doit atteindre au moins le minimum exigé.",
      "Dressez le tableau fournisseur/demandeur pour chaque interface, vérifiez chaque version, puis comptez les connecteurs décrits."
    ],
    "examples": [
      {
        "stdin": "La box MaisonCo assemble ses périphériques :\n« BoxDomotique » requiert IEclairage en version 3.0 minimum et IThermostat en version 1.0 minimum.\n« PasserellePhilips » fournit IEclairage en version 2.5.\n« RégulateurCo » fournit IThermostat en version 1.4.\n\n1) IEclairage est fournie par PasserellePhilips.\n2) 2.5 < 3.0 : la connexion IEclairage est refusée, la version est trop ancienne.\n3) IThermostat : 1.4 ≥ 1.0, la connexion est valide.\n4) Une interface requise se dessine en socket (demi-cercle ouvert).",
        "expected": "IEclairage fournie par PasserellePhilips — connexion IEclairage refusée (2.5 < 3.0) — IThermostat valide (1.4 ≥ 1.0) — symbole requis : socket",
        "note": "Un connecteur n'est valide que si la version fournie atteint la version minimale exigée par le demandeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Fournisseur de l'interface IPaiement",
        "stdin": "q:1",
        "expected": "ModuleBancaire||module bancaire||Modulebancaire||modulebancaire"
      },
      {
        "label": "Question 2 — Demandeur de l'interface ILecturePlaque",
        "stdin": "q:2",
        "expected": "ApplicationPéage||ApplicationPeage||application péage||applicationpeage||Application Peage"
      },
      {
        "label": "Question 3 — La version 1.5 couvre-t-elle le besoin 1.2 ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Nombre de connecteurs d'assemblage",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — Symbole d'une interface requise",
        "stdin": "q:5",
        "expected": "socket||la socket||une socket||prise||la prise"
      },
      {
        "label": "Question 6 — CaméraLecture requiert-il IPaiement ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Fournisseur de l'interface IPaiement]\nModuleBancaire\n\n[Question 2 — Demandeur de l'interface ILecturePlaque]\nApplicationPéage\n\n[Question 3 — La version 1.5 couvre-t-elle le besoin 1.2 ?]\noui\n\n[Question 4 — Nombre de connecteurs d'assemblage]\n2\n\n[Question 5 — Symbole d'une interface requise]\nsocket\n\n[Question 6 — CaméraLecture requiert-il IPaiement ?]\nnon",
    "takeaway": "1) IPaiement est fournie par ModuleBancaire (sucette côté ModuleBancaire).\n2) ILecturePlaque est requise par ApplicationPéage (socket côté ApplicationPéage).\n3) Oui : 1.5 >= 1.2, la version fournie couvre le besoin minimal.\n4) Le diagramme décrit 2 connecteurs d'assemblage.\n5) Une interface requise se représente par une socket (demi-cercle ouvert).\n6) Non : CaméraLecture fournit ILecturePlaque et ne requiert aucune interface.\nContrôle : IPaiement (1.5 >= 1.2) et ILecturePlaque (2.1 >= 2.0) : les deux connecteurs sont valides."
  },
  {
    "id": "um2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le déploiement de la plateforme de visioconférence Claravox",
    "exampleTitle": "Exemple résolu — le déploiement de la librairie LivreLoisir",
    "goal": "Lire un diagramme de déploiement : nœuds d'exécution, artefacts hébergés et chemins de communication.",
    "brief": "<p><strong>Énoncé.</strong> La plateforme de visioconférence Claravox déploie son infrastructure sur <strong>4 nœuds</strong> :</p><table><tr><th>Nœud</th><th>Nature</th><th>Artefact hébergé</th></tr><tr><td>ServeurWeb</td><td>machine virtuelle</td><td>portail.war</td></tr><tr><td>ServeurVisio</td><td>conteneur Docker</td><td>moteur-visio.jar</td></tr><tr><td>BaseDonnées</td><td>serveur physique</td><td>claravox.schema</td></tr><tr><td>SmartphoneClient</td><td>terminal Android</td><td>app-mobile.apk</td></tr></table><p>Trois chemins de communication relient les nœuds : SmartphoneClient —HTTPS→ ServeurWeb ; ServeurWeb —WebSocket→ ServeurVisio ; ServeurVisio —SQL→ BaseDonnées. Répondez par des nombres, le nom d'un artefact, un protocole, ou oui/non.</p><ol><li>Combien de nœuds compte le diagramme de déploiement ?</li><li>Quel artefact est hébergé sur le nœud ServeurVisio ?</li><li>Quel protocole relie le smartphone au serveur web ?</li><li>Combien d'artefacts au total sont déployés ?</li><li>Combien de chemins de communication sont décrits ?</li><li>Un nœud de déploiement représente-t-il une ressource d'exécution, matérielle ou virtuelle ?</li></ol>",
    "starter": "# Exercice — Le déploiement de la plateforme de visioconférence Claravox\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Pour la question 2, répondez par le nom de l'artefact (ex. portail.war).\n# Les questions fermées se répondent par oui ou non.\n\n[Question 1 — Nombre de nœuds]\nA_COMPLETER\n\n[Question 2 — Artefact hébergé par ServeurVisio]\nA_COMPLETER\n\n[Question 3 — Protocole entre smartphone et serveur web]\nA_COMPLETER\n\n[Question 4 — Nombre total d'artefacts]\nA_COMPLETER\n\n[Question 5 — Nombre de chemins de communication]\nA_COMPLETER\n\n[Question 6 — Un nœud est-il une ressource d'exécution ?]\nA_COMPLETER\n",
    "hints": [
      "Un nœud de déploiement est une ressource d'exécution (machine physique, virtuelle, conteneur, terminal) ; un artefact est un fichier déployé dessus.",
      "Les chemins de communication relient deux nœuds et portent un protocole : comptez-les séparément des artefacts.",
      "Parcourez le tableau ligne à ligne (un nœud, un artefact), puis la liste des chemins avec leur protocole avant de répondre."
    ],
    "examples": [
      {
        "stdin": "La librairie en ligne LivreLoisir déploie 3 nœuds :\nServeurBoutique (machine virtuelle) hébergeant boutique.war ;\nServeurPaiement (conteneur Docker) hébergeant pay.jar ;\nTerminalMagasin (caisse enregistreuse) hébergeant caisse.exe.\nChemins : TerminalMagasin —REST→ ServeurBoutique ; ServeurBoutique —TLS→ ServeurPaiement.\n\n1) Le diagramme compte 3 nœuds.\n2) 3 artefacts sont déployés (boutique.war, pay.jar, caisse.exe).\n3) 2 chemins de communication sont décrits.\n4) Le protocole REST relie la caisse à la boutique.\n5) caisse.exe est hébergé par TerminalMagasin.",
        "expected": "3 nœuds — 3 artefacts — 2 chemins — REST entre caisse et boutique — caisse.exe sur TerminalMagasin",
        "note": "Nœud et artefact se lisent ensemble : l'artefact vit physiquement dans le nœud qui l'exécute."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de nœuds",
        "stdin": "q:1",
        "expected": "4"
      },
      {
        "label": "Question 2 — Artefact hébergé par ServeurVisio",
        "stdin": "q:2",
        "expected": "moteur-visio.jar||moteur visio.jar||moteur-visio"
      },
      {
        "label": "Question 3 — Protocole entre smartphone et serveur web",
        "stdin": "q:3",
        "expected": "HTTPS||https"
      },
      {
        "label": "Question 4 — Nombre total d'artefacts",
        "stdin": "q:4",
        "expected": "4"
      },
      {
        "label": "Question 5 — Nombre de chemins de communication",
        "stdin": "q:5",
        "expected": "3"
      },
      {
        "label": "Question 6 — Un nœud est-il une ressource d'exécution ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Nombre de nœuds]\n4\n\n[Question 2 — Artefact hébergé par ServeurVisio]\nmoteur-visio.jar\n\n[Question 3 — Protocole entre smartphone et serveur web]\nHTTPS\n\n[Question 4 — Nombre total d'artefacts]\n4\n\n[Question 5 — Nombre de chemins de communication]\n3\n\n[Question 6 — Un nœud est-il une ressource d'exécution ?]\noui",
    "takeaway": "1) Le diagramme compte 4 nœuds : ServeurWeb, ServeurVisio, BaseDonnées, SmartphoneClient.\n2) ServeurVisio héberge l'artefact moteur-visio.jar.\n3) Le smartphone communique avec le serveur web via HTTPS.\n4) 4 artefacts sont déployés : portail.war, moteur-visio.jar, claravox.schema, app-mobile.apk.\n5) 3 chemins de communication : HTTPS, WebSocket, SQL.\n6) Oui : un nœud représente une ressource d'exécution, matérielle (serveur physique, terminal) ou virtuelle (machine virtuelle, conteneur).\nContrôle : 4 nœuds pour 4 artefacts (un par nœud) et 3 chemins reliant les nœuds de bout en bout."
  }
];
