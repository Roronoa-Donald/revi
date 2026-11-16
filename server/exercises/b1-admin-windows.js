'use strict';

module.exports = [
  {
    "id": "aw-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La matinée d'Aïcha au support de Sahel Distribution",
    "exampleTitle": "Exemple résolu — la matinée du cybercafé Le Web du Quartier",
    "goal": "Ranger chaque demande reçue au support informatique dans sa famille de tâches : comptes, assistance, logiciels, matériel, sécurité.",
    "brief": "<p><strong>Énoncé.</strong> Aïcha est administratrice système chez <strong>Sahel Distribution</strong>, une PME de négoce de Lomé qui emploie 30 salariés. Ce lundi matin, le support reçoit cinq demandes, notées au fur et à mesure dans le registre :</p><table><tr><th>N°</th><th>Demande reçue ce matin</th></tr><tr><td>1</td><td>La comptable a oublié son mot de passe : il faut le réinitialiser.</td></tr><tr><td>2</td><td>Le nouveau stagiaire ne sait pas utiliser le logiciel de paie : il faut lui expliquer, et tenir la documentation à jour.</td></tr><tr><td>3</td><td>Le correctif de l'antivirus des serveurs doit être installé (mettre à jour, « patcher »).</td></tr><tr><td>4</td><td>L'écran d'un poste de la logistique est en panne : il faut le remplacer.</td></tr><tr><td>5</td><td>Les données de l'entreprise doivent disposer de sauvegardes fiables et régulières, avec un contrôle d'accès.</td></tr></table><p>Rappel du cours : l'administrateur gère les <strong>comptes</strong> utilisateurs, <strong>assiste et éduque</strong> les utilisateurs (répondre aux questions, tenir une documentation à jour), gère les <strong>logiciels</strong> (installer, configurer, mettre à jour), le <strong>matériel</strong> (panne, remplacement, ajout) et la <strong>sécurité</strong> du système et des utilisateurs (sauvegardes fiables et régulières, contrôle d'accès, prévention des usages abusifs).</p><p>Répondez par un seul mot à chaque question : <code>comptes</code>, <code>assistance</code>, <code>logiciels</code>, <code>materiel</code> ou <code>securite</code>.</p><ol><li>À quelle famille de tâches appartient la demande n° 1 ?</li><li>À quelle famille de tâches appartient la demande n° 2 ?</li><li>À quelle famille de tâches appartient la demande n° 3 ?</li><li>À quelle famille de tâches appartient la demande n° 4 ?</li><li>À quelle famille de tâches appartient la demande n° 5 ?</li></ol>",
    "starter": "# Exercice — La matinée d'Aïcha au support de Sahel Distribution\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un seul mot : comptes, assistance, logiciels, materiel ou securite.\n\n[Question 1 — Famille de la demande n° 1]\nA_COMPLETER\n\n[Question 2 — Famille de la demande n° 2]\nA_COMPLETER\n\n[Question 3 — Famille de la demande n° 3]\nA_COMPLETER\n\n[Question 4 — Famille de la demande n° 4]\nA_COMPLETER\n\n[Question 5 — Famille de la demande n° 5]\nA_COMPLETER\n",
    "hints": [
      "Le cours résume les familles de tâches de l'administrateur : comptes, assistance, logiciels, matériel, sécurité — plus la maintenance de premier niveau.",
      "Cherchez le verbe dominant de chaque demande : réinitialiser, expliquer et documenter, installer ou patcher, remplacer une pièce, sauvegarder et contrôler les accès.",
      "Contrôle final : les cinq demandes du registre couvrent les cinq familles du cours, chacune exactement une fois."
    ],
    "examples": [
      {
        "stdin": "Le cybercafé Le Web du Quartier tient le même registre : « créer le compte du nouveau vendeur », puis « remplacer la souris hors service du poste 4 », puis « installer la mise à jour du navigateur sur tous les postes ».\n\n1) Créer le compte du vendeur : comptes.\n2) Remplacer la souris en panne : materiel.\n3) Installer la mise à jour du navigateur : logiciels.",
        "expected": "comptes — materiel — logiciels",
        "note": "Chaque demande se qualifie par son action dominante : créer un compte, remplacer du matériel, installer une mise à jour."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Famille de la demande n° 1",
        "stdin": "q:1",
        "expected": "comptes"
      },
      {
        "label": "Question 2 — Famille de la demande n° 2",
        "stdin": "q:2",
        "expected": "assistance"
      },
      {
        "label": "Question 3 — Famille de la demande n° 3",
        "stdin": "q:3",
        "expected": "logiciels"
      },
      {
        "label": "Question 4 — Famille de la demande n° 4",
        "stdin": "q:4",
        "expected": "materiel||materiel||la gestion du materiel"
      },
      {
        "label": "Question 5 — Famille de la demande n° 5",
        "stdin": "q:5",
        "expected": "securite||securite"
      }
    ],
    "solution": "[Question 1 — Famille de la demande n° 1]\ncomptes\n\n[Question 2 — Famille de la demande n° 2]\nassistance\n\n[Question 3 — Famille de la demande n° 3]\nlogiciels\n\n[Question 4 — Famille de la demande n° 4]\nmateriel\n\n[Question 5 — Famille de la demande n° 5]\nsecurite",
    "takeaway": "1) Réinitialiser le mot de passe de la comptable, c'est gérer un compte utilisateur : famille comptes.\n2) Expliquer le logiciel de paie au stagiaire et tenir la documentation à jour, c'est assister et éduquer les utilisateurs : famille assistance.\n3) Installer le correctif de l'antivirus (« patcher », mettre à jour), c'est gérer les logiciels : famille logiciels.\n4) Remplacer l'écran en panne, c'est gérer le matériel (panne, remplacement, ajout) : famille matériel.\n5) Sauvegardes fiables et contrôle d'accès relèvent de la sécurité du système et des utilisateurs : famille sécurité.\nContrôle : les cinq familles du cours (Comptes, Assistance, Logiciels, Matériel, Sécurité) sont utilisées chacune exactement une fois."
  },
  {
    "id": "aw-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Trois périmètres pour l'administrateur de TransitRapide",
    "exampleTitle": "Exemple résolu — le réseau du lycée technique",
    "goal": "Distinguer les trois types d'administration (poste de travail, serveurs, réseau) au fil d'une journée réelle.",
    "brief": "<p><strong>Énoncé.</strong> Babacar est administrateur chez <strong>TransitRapide</strong>, une société de transport de colis qui compte un siège, un entrepôt et une vingtaine de chauffeurs. Le cours distingue trois types d'administration : l'administration d'un <strong>poste (station) de travail</strong> — les PC des utilisateurs : mises à jour, logiciels, pannes —, l'administration des <strong>serveurs</strong> — les machines qui rendent des services à toute l'entreprise — et l'administration du <strong>réseau</strong> — les liaisons, les accès distants, les équipements d'interconnexion. Voici son planning de la journée :</p><table><tr><th>N°</th><th>Intervention planifiée</th></tr><tr><td>1</td><td>Mettre à jour le PC portable du commercial (station de travail).</td></tr><tr><td>2</td><td>Installer un nouveau rôle sur le serveur de fichiers.</td></tr><tr><td>3</td><td>Configurer l'accès distant entre le siège et l'entrepôt.</td></tr><tr><td>4</td><td>Dépanner le PC de la facturation, qui ne démarre plus.</td></tr><tr><td>5</td><td>Héberger le dossier partagé de toute l'entreprise sur le serveur.</td></tr></table><p>Répondez par un seul mot aux questions 1 à 5 : <code>poste</code>, <code>serveurs</code> ou <code>reseau</code>.</p><ol><li>Quel type d'administration pour l'intervention n° 1 ?</li><li>Quel type d'administration pour l'intervention n° 2 ?</li><li>Quel type d'administration pour l'intervention n° 3 ?</li><li>Quel type d'administration pour l'intervention n° 4 ?</li><li>Quel type d'administration pour l'intervention n° 5 ?</li><li>Un poste de travail sert-il un seul utilisateur ou toute l'entreprise ?</li></ol>",
    "starter": "# Exercice — Trois périmètres pour l'administrateur de TransitRapide\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : un seul mot (poste, serveurs ou reseau). Question 6 : réponse très courte.\n\n[Question 1 — Type de l'intervention n° 1]\nA_COMPLETER\n\n[Question 2 — Type de l'intervention n° 2]\nA_COMPLETER\n\n[Question 3 — Type de l'intervention n° 3]\nA_COMPLETER\n\n[Question 4 — Type de l'intervention n° 4]\nA_COMPLETER\n\n[Question 5 — Type de l'intervention n° 5]\nA_COMPLETER\n\n[Question 6 — Combien d'utilisateurs sert un poste de travail ?]\nA_COMPLETER\n",
    "hints": [
      "Trois types d'administration : poste de travail (les PC des utilisateurs), serveurs (les services rendus à toute l'entreprise), réseau (les liaisons et les accès distants).",
      "Pour chaque intervention, demandez-vous qui est servi : une personne, toute l'entreprise, ou aucun des deux — seulement une liaison entre sites.",
      "Contrôle de cohérence : les cinq interventions se répartissent 2 / 2 / 1 entre les trois types ; vérifiez votre répartition."
    ],
    "examples": [
      {
        "stdin": "Un lycée technique ouvre trois chantiers : « remettre en état le PC du laboratoire de langues », « installer le rôle DHCP sur le serveur du lycée », « relier le bâtiment A au bâtiment B par fibre optique ».\n\n1) Le PC du laboratoire : poste.\n2) Le rôle DHCP : serveurs.\n3) La fibre entre les bâtiments : reseau.",
        "expected": "poste — serveurs — reseau",
        "note": "La question à se poser : la machine sert-elle un utilisateur, toute l'entreprise, ou relie-t-elle seulement des sites ?"
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type de l'intervention n° 1",
        "stdin": "q:1",
        "expected": "poste||poste de travail||administration de poste"
      },
      {
        "label": "Question 2 — Type de l'intervention n° 2",
        "stdin": "q:2",
        "expected": "serveurs||serveur"
      },
      {
        "label": "Question 3 — Type de l'intervention n° 3",
        "stdin": "q:3",
        "expected": "reseau||administration reseau"
      },
      {
        "label": "Question 4 — Type de l'intervention n° 4",
        "stdin": "q:4",
        "expected": "poste||poste de travail"
      },
      {
        "label": "Question 5 — Type de l'intervention n° 5",
        "stdin": "q:5",
        "expected": "serveurs||serveur"
      },
      {
        "label": "Question 6 — Combien d'utilisateurs sert un poste de travail ?",
        "stdin": "q:6",
        "expected": "un seul utilisateur||un utilisateur||un seul||un||1"
      }
    ],
    "solution": "[Question 1 — Type de l'intervention n° 1]\nposte\n\n[Question 2 — Type de l'intervention n° 2]\nserveurs\n\n[Question 3 — Type de l'intervention n° 3]\nreseau\n\n[Question 4 — Type de l'intervention n° 4]\nposte\n\n[Question 5 — Type de l'intervention n° 5]\nserveurs\n\n[Question 6 — Combien d'utilisateurs sert un poste de travail ?]\nun seul utilisateur",
    "takeaway": "1) Le PC portable du commercial est une station de travail : administration de poste.\n2) Installer un rôle sur le serveur de fichiers touche une machine qui rend un service à toute l'entreprise : administration des serveurs.\n3) Configurer l'accès distant entre le siège et l'entrepôt concerne une liaison : administration réseau.\n4) Le PC de la facturation est une station de travail : administration de poste.\n5) Héberger le dossier partagé de toute l'entreprise est un service du serveur : administration des serveurs.\n6) Un poste de travail sert un seul utilisateur ; un serveur sert toute l'entreprise — c'est pourquoi la rigueur exigée n'est pas la même.\nContrôle : poste (n° 1 et 4), serveurs (n° 2 et 5), réseau (n° 3) — répartition 2 / 2 / 1."
  },
  {
    "id": "aw-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "L'entretien d'embauche de l'hôpital privé Le Relais",
    "exampleTitle": "Exemple résolu — l'entretien de la mairie",
    "goal": "Reconnaître les trois qualités de l'administrateur, son double titre système et réseau, et les consoles d'administration Windows.",
    "brief": "<p><strong>Énoncé.</strong> L'hôpital privé <strong>Le Relais</strong> (120 lits, 60 postes de travail, 4 serveurs) recrute son premier administrateur système. L'annonce, rédigée par les ressources humaines, exige « patience, rigueur, discrétion, bon sens, technicité ». Au cours de l'entretien, la directrice des systèmes d'information veut vérifier que le candidat connaît le vocabulaire exact du cours.</p><p>Rappel du cours : trois qualités décrivent un bon administrateur — la <strong>technicité</strong> (maîtriser les systèmes, les outils, les commandes), la <strong>rigueur</strong> (procédures suivies à la lettre, vérifications systématiques) et le <strong>bon sens</strong> (mesurer les risques avant d'agir, ne rien faire d'inutilement risqué). L'administrateur qui gère aussi les commutateurs, routeurs et liaisons télécoms est un administrateur <strong>système et réseau</strong>. Les consoles du cours : Gestionnaire des tâches (<code>taskmgr</code>), Gestionnaire de l'ordinateur (<code>compmgmt.msc</code>), Analyseur de performances (<code>perfmon</code>), Observateur d'événements (<code>eventvwr.msc</code>), PowerShell.</p><p>Répondez par un seul mot ou une expression très courte.</p><ol><li>« Suivre les procédures à la lettre, avec des vérifications systématiques » : de quelle qualité du cours s'agit-il ?</li><li>« Mesurer les risques avant d'agir, ne rien faire d'inutilement risqué » : de quelle qualité s'agit-il ?</li><li>« Maîtriser les systèmes, les outils et les commandes » : de quelle qualité s'agit-il ?</li><li>Combien de mots de l'annonce ne font PAS partie des trois qualités du cours ?</li><li>Le poste gère aussi les commutateurs, routeurs et liaisons télécoms : quel titre complet portera le recruté ?</li><li>Quelle console Windows regroupe la gestion des utilisateurs et groupes locaux, l'Observateur d'événements, le Gestionnaire de services et le partitionnement des disques ?</li></ol>",
    "starter": "# Exercice — L'entretien d'embauche de l'hôpital privé Le Relais\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un mot ou une expression très courte.\n\n[Question 1 — Qualité : procédures et vérifications]\nA_COMPLETER\n\n[Question 2 — Qualité : mesurer les risques]\nA_COMPLETER\n\n[Question 3 — Qualité : maîtriser systèmes et commandes]\nA_COMPLETER\n\n[Question 4 — Nombre d'intrus dans l'annonce]\nA_COMPLETER\n\n[Question 5 — Titre complet du recruté]\nA_COMPLETER\n\n[Question 6 — Console qui regroupe les quatre volets]\nA_COMPLETER\n",
    "hints": [
      "Trois qualités seulement sont citées par le cours ; l'annonce en liste cinq — deux mots sont des intrus.",
      "Pour chaque définition, repérez le mot-clé : « procédures et vérifications », « risques avant d'agir », « maîtrise des systèmes, outils et commandes ».",
      "Pour la question 6, relisez la liste des consoles du cours : tâches, ordinateur, performances, événements — laquelle « regroupe » plusieurs d'entre elles ?"
    ],
    "examples": [
      {
        "stdin": "Une mairie reçoit un candidat : on lui demande « de vérifier chaque sauvegarde avant de repartir le soir », puis « de savoir jongler avec les commandes de Windows », et on annonce qu'il gérera « aussi les routeurs et les liaisons entre bâtiments ».\n\n1) Vérifier chaque sauvegarde systématiquement : la rigueur.\n2) Jongler avec les commandes : la technicite.\n3) Gérer aussi routeurs et liaisons : administrateur systeme et reseau.",
        "expected": "rigueur — technicite — administrateur systeme et reseau",
        "note": "La rigueur se reconnaît aux vérifications systématiques, la technicité à la maîtrise des commandes ; le réseau ajouté au système donne le titre complet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Qualité : procédures et vérifications",
        "stdin": "q:1",
        "expected": "rigueur||la rigueur"
      },
      {
        "label": "Question 2 — Qualité : mesurer les risques",
        "stdin": "q:2",
        "expected": "bon sens||le bon sens"
      },
      {
        "label": "Question 3 — Qualité : maîtriser systèmes et commandes",
        "stdin": "q:3",
        "expected": "technicite||la technicite"
      },
      {
        "label": "Question 4 — Nombre d'intrus dans l'annonce",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Titre complet du recruté",
        "stdin": "q:5",
        "expected": "administrateur systeme et reseau||systeme et reseau||admin systeme et reseau"
      },
      {
        "label": "Question 6 — Console qui regroupe les quatre volets",
        "stdin": "q:6",
        "expected": "gestionnaire de l'ordinateur||gestionnaire de l’ordinateur||gestionnaire de l ordinateur||compmgmt.msc||compmgmt"
      }
    ],
    "solution": "[Question 1 — Qualité : procédures et vérifications]\nrigueur\n\n[Question 2 — Qualité : mesurer les risques]\nbon sens\n\n[Question 3 — Qualité : maîtriser systèmes et commandes]\ntechnicite\n\n[Question 4 — Nombre d'intrus dans l'annonce]\n2\n\n[Question 5 — Titre complet du recruté]\nadministrateur systeme et reseau\n\n[Question 6 — Console qui regroupe les quatre volets]\ngestionnaire de l'ordinateur",
    "takeaway": "1) Procédures suivies à la lettre et vérifications systématiques : c'est la définition de la rigueur.\n2) Mesurer les risques avant d'agir, ne rien faire d'inutilement risqué : c'est le bon sens.\n3) Maîtriser les systèmes, les outils et les commandes : c'est la technicité.\n4) L'annonce liste cinq mots ; trois seulement (rigueur, bon sens, technicité) sont les qualités du cours. Les intrus « patience » et « discrétion » ne font pas partie de la liste : 2 mots.\n5) Gérer aussi commutateurs, routeurs et liaisons télécoms : le recruté portera le titre d'administrateur système et réseau.\n6) Le Gestionnaire de l'ordinateur (compmgmt.msc) regroupe la gestion des utilisateurs et groupes locaux, l'Observateur d'événements, le Gestionnaire de services et le partitionnement des disques.\nContrôle : technicité, rigueur, bon sens — les trois qualités du cours, chacune illustrée par une définition de l'entretien."
  },
  {
    "id": "aw-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Quatre clients, quatre éditions chez InformatiquePlus",
    "exampleTitle": "Exemple résolu — deux appels d'un revendeur",
    "goal": "Choisir l'édition de Windows Server 2012 adaptée à chaque client : Foundation, Essential, Standard ou Datacenter.",
    "brief": "<p><strong>Énoncé.</strong> <strong>InformatiquePlus</strong> est un revendeur qui conseille ses clients sur <strong>Windows Server 2012</strong>. Ce matin, quatre dossiers sont ouverts :</p><table><tr><th>Client</th><th>Situation</th></tr><tr><td>Cabinet Fiducia</td><td>12 utilisateurs, une seule machine physique, aucune virtualisation prévue.</td></tr><tr><td>Étude Topo</td><td>20 utilisateurs, deux processeurs, aucune virtualisation prévue.</td></tr><tr><td>Immo Gazelle</td><td>toutes les fonctionnalités, licence devant couvrir 2 machines virtuelles.</td></tr><tr><td>SahelCloud</td><td>hébergeur, usage intensif de la virtualisation : 12 machines virtuelles.</td></tr></table><p>Rappel du cours (éditions de Windows Server 2012) :</p><table><tr><th>Édition</th><th>Limites</th></tr><tr><td>Foundation</td><td>TPE ; 15 utilisateurs max ; pas de virtualisation ; 1 processeur ; machine physique</td></tr><tr><td>Essential</td><td>25 utilisateurs max ; pas de virtualisation ; 2 processeurs</td></tr><tr><td>Standard</td><td>toutes les fonctionnalités ; licence couvrant 2 machines virtuelles</td></tr><tr><td>Datacenter</td><td>usage intensif des machines virtuelles ; VM illimitées par licence</td></tr></table><p>Répondez par le nom d'une édition (un seul mot) aux questions 1 à 4, et par oui/non à la question 5.</p><ol><li>Quelle édition conseiller au Cabinet Fiducia ?</li><li>Quelle édition conseiller à l'Étude Topo ?</li><li>Quelle édition conseiller à Immo Gazelle ?</li><li>Quelle édition conseiller à SahelCloud ?</li><li>Les éditions Standard et Datacenter offrent-elles les mêmes fonctionnalités ?</li></ol>",
    "starter": "# Exercice — Quatre clients, quatre éditions chez InformatiquePlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : une édition (un seul mot). Question 5 : oui/non.\n\n[Question 1 — Édition pour le Cabinet Fiducia]\nA_COMPLETER\n\n[Question 2 — Édition pour l'Étude Topo]\nA_COMPLETER\n\n[Question 3 — Édition pour Immo Gazelle]\nA_COMPLETER\n\n[Question 4 — Édition pour SahelCloud]\nA_COMPLETER\n\n[Question 5 — Standard et Datacenter : mêmes fonctionnalités ?]\nA_COMPLETER\n",
    "hints": [
      "Deux éditions du haut de gamme se distinguent uniquement par le nombre de machines virtuelles couvertes par la licence : deux pour l'une, illimité pour l'autre.",
      "Pour les deux premiers clients, regardez le nombre d'utilisateurs (15 max pour la plus petite édition, 25 pour la suivante) et l'absence de virtualisation.",
      "Contrôle : chaque client reçoit une édition différente ; les deux derniers se départagent uniquement par le nombre de VM couvertes."
    ],
    "examples": [
      {
        "stdin": "Un revendeur reçoit deux appels : une librairie de 9 personnes, sans virtualisation, sur une machine physique ; puis un studio qui prévoit 5 machines virtuelles sur une seule licence.\n\n1) La librairie : foundation.\n2) Le studio : datacenter.",
        "expected": "foundation — datacenter",
        "note": "La limite décisive : le nombre d'utilisateurs pour les petites éditions, le nombre de VM couvertes par la licence pour Standard et Datacenter."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Édition pour le Cabinet Fiducia",
        "stdin": "q:1",
        "expected": "foundation"
      },
      {
        "label": "Question 2 — Édition pour l'Étude Topo",
        "stdin": "q:2",
        "expected": "essential"
      },
      {
        "label": "Question 3 — Édition pour Immo Gazelle",
        "stdin": "q:3",
        "expected": "standard"
      },
      {
        "label": "Question 4 — Édition pour SahelCloud",
        "stdin": "q:4",
        "expected": "datacenter"
      },
      {
        "label": "Question 5 — Standard et Datacenter : mêmes fonctionnalités ?",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Édition pour le Cabinet Fiducia]\nfoundation\n\n[Question 2 — Édition pour l'Étude Topo]\nessential\n\n[Question 3 — Édition pour Immo Gazelle]\nstandard\n\n[Question 4 — Édition pour SahelCloud]\ndatacenter\n\n[Question 5 — Standard et Datacenter : mêmes fonctionnalités ?]\noui",
    "takeaway": "1) Cabinet Fiducia : 12 utilisateurs (moins de 15), pas de virtualisation, machine physique — c'est la cible de Foundation.\n2) Étude Topo : 20 utilisateurs (moins de 25, plus de 15), deux processeurs, pas de virtualisation — c'est la cible d'Essential.\n3) Immo Gazelle : toutes les fonctionnalités avec exactement 2 machines virtuelles couvertes par la licence — c'est Standard.\n4) SahelCloud : usage intensif de la virtualisation, 12 VM — il faut des VM illimitées par licence : Datacenter.\n5) Oui : Standard et Datacenter offrent les mêmes fonctionnalités (64 sockets, 4 To de RAM) ; seule la couverture des VM change (2 contre illimité).\nContrôle : Foundation, Essential, Standard, Datacenter — les quatre éditions du cours, chacune choisie une fois."
  },
  {
    "id": "aw-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le parc de la menuiserie Duval face à la configuration requise",
    "exampleTitle": "Exemple résolu — le serveur recyclé d'une agence",
    "goal": "Vérifier machine par machine la configuration requise de Windows Server 2012 R2 (RAM, disque) et repérer le composant à renforcer.",
    "brief": "<p><strong>Énoncé.</strong> La menuiserie <strong>Duval</strong> veut installer Windows Server 2012 R2 sur une machine de son parc. La configuration requise du cours : processeur 3,1 GHz 64 bits (recommandé), <strong>2 Go de RAM minimum</strong> (8 Go recommandés), <strong>60 Go d'espace disque</strong>, carte réseau Gigabit Ethernet (10/100/1000base-T). L'état des quatre machines du parc :</p><table><tr><th>Machine</th><th>RAM</th><th>Disque</th></tr><tr><td>M-01</td><td>8 Go</td><td>500 Go</td></tr><tr><td>M-02</td><td>4 Go</td><td>60 Go</td></tr><tr><td>M-03</td><td>2 Go</td><td>40 Go</td></tr><tr><td>M-04</td><td>1 Go</td><td>120 Go</td></tr></table><p>Répondez aux questions 1 à 3 par un nombre (en Go), aux questions 4 et 5 par oui/non, et à la question 6 par un seul mot.</p><ol><li>Quelle est la RAM minimale requise (en Go) ?</li><li>Quelle est la RAM recommandée (en Go) ?</li><li>Quel est l'espace disque minimal requis (en Go) ?</li><li>La machine M-01 est-elle installable telle quelle ?</li><li>La machine M-03 est-elle installable telle quelle ?</li><li>Quel composant faut-il renforcer sur M-04 : le processeur, la RAM ou le disque ?</li></ol>",
    "starter": "# Exercice — Le parc de la menuiserie Duval face à la configuration requise\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : un nombre en Go. Questions 4 et 5 : oui/non. Question 6 : un seul mot.\n\n[Question 1 — RAM minimale requise]\nA_COMPLETER\n\n[Question 2 — RAM recommandée]\nA_COMPLETER\n\n[Question 3 — Espace disque minimal requis]\nA_COMPLETER\n\n[Question 4 — M-01 installable telle quelle ?]\nA_COMPLETER\n\n[Question 5 — M-03 installable telle quelle ?]\nA_COMPLETER\n\n[Question 6 — Composant à renforcer sur M-04]\nA_COMPLETER\n",
    "hints": [
      "La configuration requise fixe deux seuils à comparer : la mémoire vive (minimum et recommandé) et l'espace disque.",
      "Une machine est installable si sa RAM atteint au moins le minimum ET son disque au moins le minimum ; comparez chaque ligne du tableau aux deux seuils.",
      "Pour M-04, comparez composant par composant : un seul est sous son seuil — c'est celui qu'il faut renforcer."
    ],
    "examples": [
      {
        "stdin": "Une agence veut recycler un serveur : 2 Go de RAM et 320 Go de disque. Le minimum du cours : 2 Go de RAM, 60 Go de disque.\n\n1) RAM minimale : 2 Go.\n2) Disque minimal : 60 Go.\n3) Le serveur recyclé (2 Go, 320 Go) atteint les deux seuils : installable, oui.",
        "expected": "2 — 60 — oui",
        "note": "Une machine juste au minimum est installable ; c'est sous le minimum qu'il faut renforcer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — RAM minimale requise",
        "stdin": "q:1",
        "expected": "2||2 go"
      },
      {
        "label": "Question 2 — RAM recommandée",
        "stdin": "q:2",
        "expected": "8||8 go"
      },
      {
        "label": "Question 3 — Espace disque minimal requis",
        "stdin": "q:3",
        "expected": "60||60 go"
      },
      {
        "label": "Question 4 — M-01 installable telle quelle ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — M-03 installable telle quelle ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Composant à renforcer sur M-04",
        "stdin": "q:6",
        "expected": "la ram||ram||memoire vive||la memoire vive"
      }
    ],
    "solution": "[Question 1 — RAM minimale requise]\n2\n\n[Question 2 — RAM recommandée]\n8\n\n[Question 3 — Espace disque minimal requis]\n60\n\n[Question 4 — M-01 installable telle quelle ?]\noui\n\n[Question 5 — M-03 installable telle quelle ?]\nnon\n\n[Question 6 — Composant à renforcer sur M-04]\nla ram",
    "takeaway": "1) La RAM minimale de Windows Server 2012 R2 est 2 Go.\n2) La RAM recommandée est 8 Go.\n3) L'espace disque minimal est 60 Go.\n4) M-01 : 8 Go de RAM (plus que le minimum, au niveau du recommandé) et 500 Go de disque (plus de 60) : installable telle quelle.\n5) M-03 : 2 Go de RAM (le minimum est atteint) mais 40 Go de disque (moins de 60) : non installable, le disque est trop petit.\n6) M-04 : 1 Go de RAM (moins de 2) alors que le disque (120 Go) dépasse le minimum : c'est la RAM qu'il faut renforcer.\nContrôle : seules M-01 et M-02 passent les deux seuils ; M-03 échoue sur le disque, M-04 sur la RAM."
  },
  {
    "id": "aw-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Trois écritures pour une session chez Delta Confection",
    "exampleTitle": "Exemple résolu — les sessions de la coopérative Karité",
    "goal": "Écrire les syntaxes d'ouverture de session (SAM locale, NetBIOS, UPN) et reconnaître la base SAM.",
    "brief": "<p><strong>Énoncé.</strong> <strong>Delta Confection</strong> vient d'installer son premier serveur, <strong>SRV-DELTA</strong>. L'entreprise prépare l'annuaire du domaine <strong>delta.local</strong>, dont le nom NetBIOS est <strong>DELTA</strong>. Koffi est un utilisateur du domaine ; <code>admin</code> est un compte local du serveur, enregistré dans la base SAM de la machine. Le cours donne trois écritures :</p><ul><li>session <strong>locale</strong> (base SAM de la machine) : <code>nom_machine\\utilisateur</code> ;</li><li>session de <strong>domaine, forme NetBIOS</strong> : <code>NOM_NETBIOS\\login</code> ;</li><li>session de <strong>domaine, forme UPN</strong> (forme d'adresse e-mail) : <code>login@nom_dns_domaine</code>.</li></ul><p>Consignes : aux questions 1 à 3, écrivez la syntaxe exacte ; aux questions 4 à 6, répondez très court.</p><ol><li>Écrivez la syntaxe complète de la session LOCALE de admin sur le serveur SRV-DELTA.</li><li>Écrivez la session de koffi au domaine, forme NetBIOS.</li><li>Écrivez l'UPN de koffi dans le domaine delta.local.</li><li>Comment s'appelle la base de données des comptes locaux de la machine (son sigle) ?</li><li>Dans la forme UPN, quel signe relie l'identité au domaine : l'antislash ou l'arobase ?</li><li>Vrai ou faux : la forme SRV-DELTA\\koffi est la bonne forme pour ouvrir une session de domaine.</li></ol>",
    "starter": "# Exercice — Trois écritures pour une session chez Delta Confection\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : syntaxe exacte. Questions 4 à 6 : réponse très courte.\n\n[Question 1 — Session locale de admin sur SRV-DELTA]\nA_COMPLETER\n\n[Question 2 — Session NetBIOS de koffi]\nA_COMPLETER\n\n[Question 3 — UPN de koffi]\nA_COMPLETER\n\n[Question 4 — Sigle de la base des comptes locaux]\nA_COMPLETER\n\n[Question 5 — Signe de la forme UPN]\nA_COMPLETER\n\n[Question 6 — SRV-DELTA\\koffi : bonne forme pour le domaine ?]\nA_COMPLETER\n",
    "hints": [
      "Deux formes utilisent l'antislash (locale et NetBIOS), une seule utilise l'arobase (UPN) : le signe indique la famille.",
      "Identifiez d'abord le contexte : compte local de la machine, domaine par son nom NetBIOS, ou domaine par son nom DNS complet.",
      "Contrôle : la forme machine\\utilisateur ne parle jamais au domaine — c'est la forme locale du cours, celle de la SAM."
    ],
    "examples": [
      {
        "stdin": "La coopérative Karité exploite le serveur SRV-KAR, le domaine karite.local (NetBIOS KARITE), l'utilisatrice binta et le compte local administrateur.\n\n1) Session locale : SRV-KAR\\administrateur.\n2) Session NetBIOS de binta : KARITE\\binta.\n3) UPN de binta : binta@karite.local.",
        "expected": "SRV-KAR\\administrateur — KARITE\\binta — binta@karite.local",
        "note": "Le contexte commande l'écriture : la machine pour la SAM, le NetBIOS avec l'antislash, le DNS complet avec l'arobase."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Session locale de admin sur SRV-DELTA",
        "stdin": "q:1",
        "expected": "SRV-DELTA\\admin"
      },
      {
        "label": "Question 2 — Session NetBIOS de koffi",
        "stdin": "q:2",
        "expected": "DELTA\\koffi"
      },
      {
        "label": "Question 3 — UPN de koffi",
        "stdin": "q:3",
        "expected": "koffi@delta.local"
      },
      {
        "label": "Question 4 — Sigle de la base des comptes locaux",
        "stdin": "q:4",
        "expected": "sam||security account manager||la sam"
      },
      {
        "label": "Question 5 — Signe de la forme UPN",
        "stdin": "q:5",
        "expected": "arobase||l'arobase||l’arobase||l arobase||@"
      },
      {
        "label": "Question 6 — SRV-DELTA\\koffi : bonne forme pour le domaine ?",
        "stdin": "q:6",
        "expected": "faux||non"
      }
    ],
    "solution": "[Question 1 — Session locale de admin sur SRV-DELTA]\nSRV-DELTA\\admin\n\n[Question 2 — Session NetBIOS de koffi]\nDELTA\\koffi\n\n[Question 3 — UPN de koffi]\nkoffi@delta.local\n\n[Question 4 — Sigle de la base des comptes locaux]\nsam\n\n[Question 5 — Signe de la forme UPN]\narobase\n\n[Question 6 — SRV-DELTA\\koffi : bonne forme pour le domaine ?]\nfaux",
    "takeaway": "1) La session locale s'écrit avec le nom de la machine : SRV-DELTA\\admin — c'est la base SAM de la machine qui vérifie ce compte.\n2) La forme NetBIOS du domaine : DELTA\\koffi (antislash, préfixe NetBIOS en majuscules).\n3) L'UPN, forme d'adresse e-mail : koffi@delta.local (arobase, nom DNS complet du domaine).\n4) La base de données des comptes locaux est la SAM (Security Account Manager), composant du registre qui contient les mots de passe locaux.\n5) Dans la forme UPN, c'est l'arobase qui relie l'identité au domaine ; l'antislash sert aux formes locale et NetBIOS.\n6) Faux : la forme machine\\utilisateur est la forme locale (SAM) — piège du cours. Pour le domaine, koffi doit utiliser DELTA\\koffi ou koffi@delta.local.\nContrôle : deux écritures avec l'antislash (locale, NetBIOS), une avec l'arobase (UPN)."
  },
  {
    "id": "aw-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Premier tour du Gestionnaire de serveur chez BâtirPlus",
    "exampleTitle": "Exemple résolu — la prise en main du serveur d'une agence",
    "goal": "Situer chaque action de configuration dans la bonne zone du Gestionnaire de serveur.",
    "brief": "<p><strong>Énoncé.</strong> La PME de BTP <strong>BâtirPlus</strong> vient d'installer Windows Server 2012 R2 sur son serveur <strong>SRV-BTP</strong>. Le nouvel administrateur découvre le <strong>Gestionnaire de serveur</strong>, point central d'administration de Windows Server. Le cours décrit ses zones : le <strong>tableau de bord</strong> (ajouter des rôles et fonctionnalités, ajouter d'autres serveurs à gérer, créer des groupes de serveurs), <strong>serveur local</strong> (propriétés de la machine : nom, domaine ou groupe de travail, pare-feu, bureau à distance, cartes réseau, fuseau horaire), les menus <strong>Gérer</strong> et <strong>Outils</strong> (toutes les consoles d'administration), et le <strong>centre de notifications</strong> (erreurs et actions à suivre après l'installation d'un rôle).</p><p>Le premier matin, cinq actions sont à réaliser :</p><table><tr><th>N°</th><th>Action à réaliser</th></tr><tr><td>1</td><td>Renommer la machine SRV-BTP.</td></tr><tr><td>2</td><td>Ajouter le rôle Impression au serveur.</td></tr><tr><td>3</td><td>Après l'installation du rôle, lire les messages d'erreur et les actions à suivre.</td></tr><tr><td>4</td><td>Ouvrir la console « Pare-feu Windows avec fonctions avancées ».</td></tr><tr><td>5</td><td>Activer le bureau à distance sur le serveur.</td></tr></table><p>Répondez par un seul mot ou une expression très courte à chaque question.</p><ol><li>Dans quelle zone du Gestionnaire de serveur réaliser l'action n° 1 ?</li><li>Dans quelle zone réaliser l'action n° 2 ?</li><li>Dans quelle zone réaliser l'action n° 3 ?</li><li>Dans quelle zone réaliser l'action n° 4 ?</li><li>Comment s'appelle le composant de Windows Server décrit comme le « point central d'administration » ?</li></ol>",
    "starter": "# Exercice — Premier tour du Gestionnaire de serveur chez BâtirPlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un mot ou une expression très courte.\n\n[Question 1 — Zone pour renommer la machine]\nA_COMPLETER\n\n[Question 2 — Zone pour ajouter le rôle Impression]\nA_COMPLETER\n\n[Question 3 — Zone pour lire les messages d'erreur]\nA_COMPLETER\n\n[Question 4 — Zone pour ouvrir la console Pare-feu]\nA_COMPLETER\n\n[Question 5 — Le point central d'administration]\nA_COMPLETER\n",
    "hints": [
      "Quatre zones à connaître : tableau de bord (rôles, serveurs, groupes de serveurs), serveur local (propriétés de la machine), outils (consoles d'administration), centre de notifications (messages après installation d'un rôle).",
      "Demandez-vous si l'action modifie la machine elle-même, ajoute un service, consulte un message, ou ouvre une console existante.",
      "Contrôle : deux actions touchent les propriétés de la machine elle-même ; une ajoute un service ; une consulte un message ; une ouvre une console."
    ],
    "examples": [
      {
        "stdin": "Une agence prend en main son serveur : « configurer la carte réseau », puis « ajouter le rôle DHCP », puis « consulter les erreurs après l'installation du rôle ».\n\n1) Configurer la carte réseau : serveur local.\n2) Ajouter le rôle DHCP : tableau de bord.\n3) Consulter les erreurs : notifications.",
        "expected": "serveur local — tableau de bord — notifications",
        "note": "La carte réseau et le nom vivent dans serveur local ; les rôles s'ajoutent depuis le tableau de bord ; les messages d'erreur arrivent au centre de notifications."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Zone pour renommer la machine",
        "stdin": "q:1",
        "expected": "serveur local||serveurlocal||le serveur local"
      },
      {
        "label": "Question 2 — Zone pour ajouter le rôle Impression",
        "stdin": "q:2",
        "expected": "tableau de bord||tableaudebord||le tableau de bord"
      },
      {
        "label": "Question 3 — Zone pour lire les messages d'erreur",
        "stdin": "q:3",
        "expected": "notifications||centre de notifications||le centre de notifications"
      },
      {
        "label": "Question 4 — Zone pour ouvrir la console Pare-feu",
        "stdin": "q:4",
        "expected": "outils||le menu outils||menu outils||les outils"
      },
      {
        "label": "Question 5 — Le point central d'administration",
        "stdin": "q:5",
        "expected": "gestionnaire de serveur||le gestionnaire de serveur"
      }
    ],
    "solution": "[Question 1 — Zone pour renommer la machine]\nserveur local\n\n[Question 2 — Zone pour ajouter le rôle Impression]\ntableau de bord\n\n[Question 3 — Zone pour lire les messages d'erreur]\nnotifications\n\n[Question 4 — Zone pour ouvrir la console Pare-feu]\noutils\n\n[Question 5 — Le point central d'administration]\ngestionnaire de serveur",
    "takeaway": "1) Renommer la machine est une propriété de la machine : zone serveur local (cliquer sur le nom actuel, Modifier, puis redémarrer).\n2) Ajouter le rôle Impression se fait depuis le tableau de bord (Ajouter des rôles et fonctionnalités).\n3) Les messages d'erreur et actions à suivre après l'installation d'un rôle s'affichent dans le centre de notifications.\n4) La console « Pare-feu Windows avec fonctions avancées » s'ouvre depuis le menu Outils, qui rassemble toutes les consoles d'administration.\n5) Le point central d'administration de Windows Server est le Gestionnaire de serveur.\nContrôle : actions n° 1 et 5 (bureau à distance) dans serveur local ; n° 2 tableau de bord ; n° 3 notifications ; n° 4 outils."
  },
  {
    "id": "aw-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Le pare-feu à trois profils du serveur du ComptoirNiger",
    "exampleTitle": "Exemple résolu — le serveur de TP du formateur",
    "goal": "Traiter le pare-feu Windows sur ses trois profils (domaine, privé, public) et écrire les commandes netsh et PowerShell du cours.",
    "brief": "<p><strong>Énoncé.</strong> Au <strong>ComptoirNiger</strong>, le serveur de fichiers devient inaccessible par intermittence : le partage fonctionne au siège mais pas depuis l'ordinateur portable du dirigeant connecté en déplacement. Le support du cours rappelle que le pare-feu Windows possède <strong>trois profils</strong> — <strong>domaine</strong>, <strong>privé</strong> et <strong>public</strong> — et que toute manipulation doit cibler les trois (« il faut bien penser à désactiver le pare-feu pour les 3 profils » en laboratoire). L'état actuel du pare-feu du serveur :</p><table><tr><th>Profil</th><th>État actuel</th></tr><tr><td>Domaine</td><td>Désactivé</td></tr><tr><td>Privé</td><td>Activé</td></tr><tr><td>Public</td><td>Désactivé</td></tr></table><p>Rappel du cours, trois façons de traiter le pare-feu : la console « Pare-feu Windows avec fonctions avancées » ; la commande <code>netsh advfirewall set allprofiles state off</code> (réactiver avec <code>state on</code>) ; la cmdlet PowerShell <code>Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False</code>.</p><ol><li>Citez les trois profils du pare-feu (un mot chacun, séparés par des espaces).</li><li>D'après le tableau, quel profil encore activé explique la panne intermittente du dirigeant en déplacement ?</li><li>Écrivez la commande netsh qui désactive le pare-feu pour TOUS les profils.</li><li>Écrivez la cmdlet PowerShell équivalente (profils, puis état).</li><li>À l'installation de Windows Server, le pare-feu est-il activé ou désactivé par défaut ? (un seul mot)</li></ol>",
    "starter": "# Exercice — Le pare-feu à trois profils du serveur du ComptoirNiger\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : trois mots séparés par des espaces. Questions 3 et 4 : commandes exactes du cours.\n\n[Question 1 — Les trois profils du pare-feu]\nA_COMPLETER\n\n[Question 2 — Le profil encore activé]\nA_COMPLETER\n\n[Question 3 — Commande netsh pour tous les profils]\nA_COMPLETER\n\n[Question 4 — Cmdlet PowerShell équivalente]\nA_COMPLETER\n\n[Question 5 — État du pare-feu par défaut]\nA_COMPLETER\n",
    "hints": [
      "Trois profils, un par contexte de connexion : le domaine de l'entreprise, les réseaux privés, les réseaux publics.",
      "La panne n'apparaît que dans certaines situations : cherchez le profil qui correspond au réseau du moment du dirigeant, et regardez s'il est encore activé dans le tableau.",
      "Pour les commandes, recopiez la syntaxe exacte du cours : netsh traite tous les profils d'un coup ; la cmdlet PowerShell enchaîne le paramètre des profils puis l'état False."
    ],
    "examples": [
      {
        "stdin": "Le formateur prépare un serveur de TP : profil domaine inactif, profil public actif, profil privé inactif. Il veut tout désactiver pour le laboratoire, puis pouvoir réactiver.\n\n1) Le profil encore actif : public.\n2) La commande netsh : netsh advfirewall set allprofiles state off.\n3) Pour réactiver : netsh advfirewall set allprofiles state on.",
        "expected": "public — netsh advfirewall set allprofiles state off — netsh advfirewall set allprofiles state on",
        "note": "Un seul profil oublié suffit à couper un service ; la commande netsh traite les trois profils d'un seul coup (allprofiles)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Les trois profils du pare-feu",
        "stdin": "q:1",
        "expected": "domaine prive public"
      },
      {
        "label": "Question 2 — Le profil encore activé",
        "stdin": "q:2",
        "expected": "prive||le prive||profil prive"
      },
      {
        "label": "Question 3 — Commande netsh pour tous les profils",
        "stdin": "q:3",
        "expected": "netsh advfirewall set allprofiles state off"
      },
      {
        "label": "Question 4 — Cmdlet PowerShell équivalente",
        "stdin": "q:4",
        "expected": "set-netfirewallprofile -profile domain,public,private -enabled false||set-netfirewallprofile -profile domain public private -enabled false"
      },
      {
        "label": "Question 5 — État du pare-feu par défaut",
        "stdin": "q:5",
        "expected": "active||activee"
      }
    ],
    "solution": "[Question 1 — Les trois profils du pare-feu]\ndomaine prive public\n\n[Question 2 — Le profil encore activé]\nprive\n\n[Question 3 — Commande netsh pour tous les profils]\nnetsh advfirewall set allprofiles state off\n\n[Question 4 — Cmdlet PowerShell équivalente]\nset-netfirewallprofile -profile domain,public,private -enabled false\n\n[Question 5 — État du pare-feu par défaut]\nactive",
    "takeaway": "1) Les trois profils du pare-feu : domaine, privé, public.\n2) Le tableau montre le profil privé encore activé : c'est lui qui bloque le partage selon le réseau de connexion — la panne intermittente du dirigeant en déplacement s'explique ainsi.\n3) La commande netsh : netsh advfirewall set allprofiles state off — elle traite les trois profils d'un seul coup.\n4) La cmdlet PowerShell : Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False.\n5) Par défaut, le pare-feu est activé — et l'on oublie généralement sa présence : le réflexe du cours est de vérifier si une panne ne vient pas de lui.\nContrôle : domaine et public sont déjà désactivés ; seul le profil privé restait activé — le traiter règle la panne intermittente."
  },
  {
    "id": "aw-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Une identité fixe pour le serveur de la scierie ForêtVert",
    "exampleTitle": "Exemple résolu — la carte réseau du serveur d'une école",
    "goal": "Renommer le serveur (netdom) et fixer son adresse IP statique (Get-NetAdapter, New-NetIPAddress, Remove-NetIPAddress, DNS) comme au TP du cours.",
    "brief": "<p><strong>Énoncé.</strong> La scierie <strong>ForêtVert</strong> vient d'installer Windows Server 2012 R2 sur un serveur livré sous le nom <strong>WIN-SRV1</strong>. L'administrateur doit lui donner une identité sérieuse avant d'y installer AD DS :</p><ul><li>nouveau nom du serveur : <code>SRV-BOIS</code> ;</li><li>carte réseau d'index <strong>ifIndex 12</strong>, repérée avec <code>Get-NetAdapter</code> ;</li><li>adresse IP fixe : <code>172.16.5.10</code>, préfixe <code>24</code>, passerelle <code>172.16.5.1</code> ;</li><li>l'ancienne adresse <code>10.10.10.10</code>, obtenue par DHCP, doit disparaître ;</li><li>serveur DNS à définir sur la même carte : <code>172.16.5.10</code>.</li></ul><p>Rappel du cours : <code>netdom renamecomputer NOMACTUEL /NewName:NOUVEAUNOM</code> puis <code>shutdown /r</code> ; <code>New-NetIPAddress -InterfaceIndex 12 -IPAddress … -PrefixLength 24 -DefaultGateway …</code> ; <code>Remove-NetIPAddress</code> pour supprimer l'ancienne adresse ; <code>Set-DnsClientServerAddress</code> pour le DNS ; l'<strong>ActiveStore</strong> applique l'adresse immédiatement, le <strong>PersistentStore</strong> la sauvegarde pour après redémarrage (au démarrage, le PersistentStore est recopié dans l'ActiveStore).</p><ol><li>Quelle cmdlet liste les cartes réseau et leur ifIndex ?</li><li>Écrivez la commande netdom complète qui renomme le serveur (sans le redémarrage).</li><li>Quelle cmdlet ajoute la nouvelle adresse IP fixe ?</li><li>Quelle cmdlet supprime l'ancienne adresse 10.10.10.10 ?</li><li>Quelle cmdlet définit le serveur DNS de la carte ?</li><li>Quel magasin sauvegarde l'adresse pour qu'elle survive au redémarrage : ActiveStore ou PersistentStore ?</li></ol>",
    "starter": "# Exercice — Une identité fixe pour le serveur de la scierie ForêtVert\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : noms de cmdlets ou commande netdom exacte. Question 6 : un seul nom.\n\n[Question 1 — Cmdlet qui liste les cartes et leur ifIndex]\nA_COMPLETER\n\n[Question 2 — Commande netdom de renommage]\nA_COMPLETER\n\n[Question 3 — Cmdlet qui ajoute l'adresse IP fixe]\nA_COMPLETER\n\n[Question 4 — Cmdlet qui supprime l'ancienne adresse]\nA_COMPLETER\n\n[Question 5 — Cmdlet qui définit le serveur DNS]\nA_COMPLETER\n\n[Question 6 — Magasin qui conserve l'adresse après redémarrage]\nA_COMPLETER\n",
    "hints": [
      "Le cours enchaîne les gestes dans l'ordre : repérer l'interface (ifIndex), renommer la machine, fixer la nouvelle IP, retirer l'ancienne, définir le DNS.",
      "Pour la question 2, la commande netdom attend l'ancien nom puis le paramètre du nouveau nom, séparés par un espace ; le redémarrage est une commande à part (shutdown /r).",
      "Contrôle final : ipconfig /all doit montrer le nouveau nom, l'adresse fixe et le DNS ; pour la question 6, relisez ce que fait chaque magasin au moment du redémarrage."
    ],
    "examples": [
      {
        "stdin": "Une école configure son serveur WIN-TST, à renommer SRV-TEST : carte d'ifIndex 14, IP fixe 192.168.50.5/24, ancienne IP 172.20.1.5.\n\n1) Repérer la carte : Get-NetAdapter.\n2) Renommer : netdom renamecomputer WIN-TST /NewName:SRV-TEST.\n3) Ajouter l'IP fixe : New-NetIPAddress -InterfaceIndex 14 -IPAddress 192.168.50.5 -PrefixLength 24.",
        "expected": "get-netadapter — netdom renamecomputer WIN-TST /NewName:SRV-TEST — new-netipaddress",
        "note": "L'ifIndex relie chaque cmdlet réseau à la bonne carte ; le renommage précède toujours la configuration IP."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Cmdlet qui liste les cartes et leur ifIndex",
        "stdin": "q:1",
        "expected": "get-netadapter||get-netipinterface"
      },
      {
        "label": "Question 2 — Commande netdom de renommage",
        "stdin": "q:2",
        "expected": "netdom renamecomputer WIN-SRV1 /NewName:SRV-BOIS||netdom renamecomputer WIN-SRV1/NewName:SRV-BOIS"
      },
      {
        "label": "Question 3 — Cmdlet qui ajoute l'adresse IP fixe",
        "stdin": "q:3",
        "expected": "new-netipaddress"
      },
      {
        "label": "Question 4 — Cmdlet qui supprime l'ancienne adresse",
        "stdin": "q:4",
        "expected": "remove-netipaddress"
      },
      {
        "label": "Question 5 — Cmdlet qui définit le serveur DNS",
        "stdin": "q:5",
        "expected": "set-dnsclientserveraddress"
      },
      {
        "label": "Question 6 — Magasin qui conserve l'adresse après redémarrage",
        "stdin": "q:6",
        "expected": "persistentstore||persistent store||le persistentstore||le persistent store"
      }
    ],
    "solution": "[Question 1 — Cmdlet qui liste les cartes et leur ifIndex]\nget-netadapter\n\n[Question 2 — Commande netdom de renommage]\nnetdom renamecomputer WIN-SRV1 /NewName:SRV-BOIS\n\n[Question 3 — Cmdlet qui ajoute l'adresse IP fixe]\nnew-netipaddress\n\n[Question 4 — Cmdlet qui supprime l'ancienne adresse]\nremove-netipaddress\n\n[Question 5 — Cmdlet qui définit le serveur DNS]\nset-dnsclientserveraddress\n\n[Question 6 — Magasin qui conserve l'adresse après redémarrage]\npersistentstore",
    "takeaway": "1) Get-NetAdapter (ou Get-NetIPInterface) liste les cartes et leur ifIndex — c'est l'index 12 qui servira à toutes les commandes suivantes.\n2) netdom renamecomputer WIN-SRV1 /NewName:SRV-BOIS — puis shutdown /r pour appliquer le nouveau nom après redémarrage.\n3) New-NetIPAddress -InterfaceIndex 12 -IPAddress 172.16.5.10 -PrefixLength 24 -DefaultGateway 172.16.5.1.\n4) Remove-NetIPAddress -InterfaceIndex 12 -IPAddress 10.10.10.10 : le cours impose de supprimer l'ancienne adresse obtenue par DHCP (ajouter une adresse sur une carte en DHCP désactive d'ailleurs le DHCP).\n5) Set-DnsClientServerAddress -InterfaceIndex 12 -ServerAddresses 172.16.5.10.\n6) Le PersistentStore : il sauvegarde l'adresse pour après le redémarrage ; au démarrage, son contenu est recopié dans l'ActiveStore qui l'applique immédiatement.\nContrôle : ipconfig /all doit ensuite montrer le nom SRV-BOIS, l'adresse 172.16.5.10 et le DNS — et plus aucune trace du DHCP."
  },
  {
    "id": "aw-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "L'annuaire de l'organisme de formation FormAction",
    "exampleTitle": "Exemple résolu — l'annuaire d'une maison d'édition",
    "goal": "Manier le vocabulaire Active Directory : domaine enfant, forêt, arbre, espace de nom contigu, unités d'organisation.",
    "brief": "<p><strong>Énoncé.</strong> L'organisme de formation <strong>FormAction</strong> a grandi : 200 stagiaires, deux sites (Nantes et Lyon). Plutôt que des comptes éparpillés sur chaque machine, la direction veut un annuaire Active Directory hiérarchique. Le domaine principal choisi est <code>formation.local</code> ; chaque site aura son sous-domaine. Le cours fournit le vocabulaire : un <strong>domaine</strong> est une entité logique (administrative) qui héberge des utilisateurs, des ordinateurs et des paramètres de stratégies ; un <strong>arbre</strong> regroupe des domaines partageant un espace de nom contigu et hiérarchique ; une <strong>forêt</strong> est un regroupement d'un ou plusieurs arbres ; un <strong>domaine enfant</strong> est un sous-domaine dépendant du domaine racine ; dans le domaine, les objets sont rangés dans des <strong>unités d'organisation</strong> (UO).</p><p>Répondez par un seul mot ou une expression très courte.</p><ol><li>Quel est le nom complet du domaine enfant créé pour le site de Nantes ?</li><li>Une forêt regroupe un ou plusieurs… ? (un mot)</li><li>Les domaines d'un même arbre partagent un espace de nom… ? (un mot)</li><li>Le domaine est une entité logique ou physique ?</li><li>Dans le domaine, les objets (utilisateurs, ordinateurs, groupes) sont rangés dans des unités de… ? (un mot)</li></ol>",
    "starter": "# Exercice — L'annuaire de l'organisme de formation FormAction\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un mot ou une expression très courte.\n\n[Question 1 — Nom du domaine enfant de Nantes]\nA_COMPLETER\n\n[Question 2 — Ce que regroupe une forêt]\nA_COMPLETER\n\n[Question 3 — Espace de nom partagé par un arbre]\nA_COMPLETER\n\n[Question 4 — Nature du domaine]\nA_COMPLETER\n\n[Question 5 — Les objets sont rangés dans des unités de…]\nA_COMPLETER\n",
    "hints": [
      "La hiérarchie du cours se lit par tailles croissantes : domaine, arbre, forêt.",
      "Le nom d'un domaine enfant s'écrit en préfixant le nom du parent : le nom du site devant le nom du domaine racine.",
      "Contrôle : le domaine racine et ses deux enfants forment un seul arbre — tous les noms se terminent par le nom de la racine."
    ],
    "examples": [
      {
        "stdin": "Une maison d'édition choisit le domaine racine editions.local et crée un sous-domaine pour son site de Dakar.\n\n1) Le domaine enfant de Dakar : dakar.editions.local.\n2) editions.local et dakar.editions.local forment : un arbre.\n3) Leurs noms partagent un espace de nom : contigu.",
        "expected": "dakar.editions.local — un arbre — contigu",
        "note": "Le nom d'un domaine enfant se construit par contiguïté : préfixe du site, puis nom du domaine parent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nom du domaine enfant de Nantes",
        "stdin": "q:1",
        "expected": "nantes.formation.local"
      },
      {
        "label": "Question 2 — Ce que regroupe une forêt",
        "stdin": "q:2",
        "expected": "arbres||des arbres||un arbre||arbre||un ou plusieurs arbres"
      },
      {
        "label": "Question 3 — Espace de nom partagé par un arbre",
        "stdin": "q:3",
        "expected": "contigu"
      },
      {
        "label": "Question 4 — Nature du domaine",
        "stdin": "q:4",
        "expected": "logique||entite logique"
      },
      {
        "label": "Question 5 — Les objets sont rangés dans des unités de…",
        "stdin": "q:5",
        "expected": "organisation||d'organisation||d’organisation"
      }
    ],
    "solution": "[Question 1 — Nom du domaine enfant de Nantes]\nnantes.formation.local\n\n[Question 2 — Ce que regroupe une forêt]\narbres\n\n[Question 3 — Espace de nom partagé par un arbre]\ncontigu\n\n[Question 4 — Nature du domaine]\nlogique\n\n[Question 5 — Les objets sont rangés dans des unités de…]\norganisation",
    "takeaway": "1) Le domaine enfant du site de Nantes s'appelle nantes.formation.local : le préfixe du site devant le nom du domaine racine.\n2) Une forêt est un regroupement d'un ou plusieurs arbres — indépendants et distincts.\n3) Les domaines d'un même arbre partagent un espace de nom contigu et hiérarchique.\n4) Le domaine est une entité logique (administrative) : il héberge utilisateurs, ordinateurs et paramètres de stratégies.\n5) Les objets du domaine sont rangés dans des unités d'organisation (UO) : utilisateurs, ordinateurs, groupes, contrôleurs de domaine.\nContrôle : formation.local (racine), nantes.formation.local et lyon.formation.local (enfants) — un seul arbre, à l'espace de nom contigu."
  },
  {
    "id": "aw-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le rachat qui fait grandir la forêt de Vernis-Sud",
    "exampleTitle": "Exemple résolu — la fusion de deux coopératives",
    "goal": "Construire arbres et forêts d'une entreprise qui grandit : contiguïté des noms, domaines enfants, arbres indépendants.",
    "brief": "<p><strong>Énoncé.</strong> La fabrique de vernis <strong>Vernis-Sud</strong> gère le domaine racine <code>vernis-sud.fr</code>, avec un sous-domaine par succursale : <code>bordeaux.vernis-sud.fr</code> et <code>nice.vernis-sud.fr</code>. Elle vient de racheter <strong>Peinture-Nord</strong>, une entreprise qui gère déjà son propre domaine racine <code>peinture-nord.local</code>, accompagné de <code>atelier.peinture-nord.local</code>. Les deux entreprises fusionnent leurs annuaires dans une même forêt Active Directory. Le cours précise : les domaines d'un même arbre partagent un espace de nom contigu et hiérarchique ; une forêt est un regroupement d'un ou plusieurs arbres, indépendants et distincts ; le renommage d'un domaine AD DS est possible, mais son impact technique est très conséquent (PC, utilisateurs, services, logiciels).</p><ol><li>Combien d'arbres compte la forêt après le rachat ?</li><li>Quel est le domaine racine du premier arbre ?</li><li>Que représente bordeaux.vernis-sud.fr par rapport à vernis-sud.fr ? (expression du cours)</li><li>Vernis-sud.fr et peinture-nord.local appartiennent-ils au même arbre ? (oui/non)</li><li>Justifiez : les domaines d'un même arbre doivent partager un espace de nom… ? (un mot)</li><li>Le renommage d'un domaine AD DS est-il une opération sans impact ? (oui/non)</li></ol>",
    "starter": "# Exercice — Le rachat qui fait grandir la forêt de Vernis-Sud\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : nombre ou nom de domaine. Question 3 : expression du cours. Questions 4 à 6 : réponses très courtes.\n\n[Question 1 — Nombre d'arbres après le rachat]\nA_COMPLETER\n\n[Question 2 — Racine du premier arbre]\nA_COMPLETER\n\n[Question 3 — Statut de bordeaux.vernis-sud.fr]\nA_COMPLETER\n\n[Question 4 — Même arbre pour les deux racines ?]\nA_COMPLETER\n\n[Question 5 — Espace de nom exigé dans un arbre]\nA_COMPLETER\n\n[Question 6 — Renommage sans impact ?]\nA_COMPLETER\n",
    "hints": [
      "Un arbre se reconnaît à la contiguïté des noms : tous les domaines d'un même arbre se terminent par le nom de leur racine.",
      "Comparez les suffixes des domaines : des espaces de nom différents forment des arbres distincts au sein de la même forêt.",
      "Contrôle : comptez les racines indépendantes — les noms qui ne sont le préfixe d'aucun autre domaine ; il y en a une par arbre."
    ],
    "examples": [
      {
        "stdin": "Deux coopératives fusionnent : la première gère cacao.tg avec ouest.cacao.tg ; la seconde gère karite.tg avec nord.karite.tg.\n\n1) Les deux racines : cacao.tg et karite.tg.\n2) Nombre d'arbres dans la forêt : 2.\n3) ouest.cacao.tg est un domaine enfant de : cacao.tg.",
        "expected": "cacao.tg et karite.tg — 2 — cacao.tg",
        "note": "Chaque racine indépendante fonde un arbre ; la forêt réunit des arbres aux espaces de nom distincts."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'arbres après le rachat",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Racine du premier arbre",
        "stdin": "q:2",
        "expected": "vernis-sud.fr"
      },
      {
        "label": "Question 3 — Statut de bordeaux.vernis-sud.fr",
        "stdin": "q:3",
        "expected": "domaine enfant||un domaine enfant||enfant||sous-domaine||un sous-domaine"
      },
      {
        "label": "Question 4 — Même arbre pour les deux racines ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Espace de nom exigé dans un arbre",
        "stdin": "q:5",
        "expected": "contigu"
      },
      {
        "label": "Question 6 — Renommage sans impact ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre d'arbres après le rachat]\n2\n\n[Question 2 — Racine du premier arbre]\nvernis-sud.fr\n\n[Question 3 — Statut de bordeaux.vernis-sud.fr]\ndomaine enfant\n\n[Question 4 — Même arbre pour les deux racines ?]\nnon\n\n[Question 5 — Espace de nom exigé dans un arbre]\ncontigu\n\n[Question 6 — Renommage sans impact ?]\nnon",
    "takeaway": "1) Après le rachat, la forêt compte 2 arbres : celui de vernis-sud.fr et celui de peinture-nord.local.\n2) Le domaine racine du premier arbre est vernis-sud.fr.\n3) bordeaux.vernis-sud.fr est un domaine enfant (sous-domaine) du domaine racine vernis-sud.fr — comme nice.vernis-sud.fr.\n4) Non : vernis-sud.fr et peinture-nord.local n'ont pas d'espace de nom commun.\n5) Les domaines d'un même arbre doivent partager un espace de nom contigu et hiérarchique — ce que les deux racines n'ont pas.\n6) Non : le renommage d'un domaine AD DS est possible mais d'un impact technique très conséquent — PC, utilisateurs, services et logiciels sont touchés ; c'est pourquoi le nom se choisit réel et réfléchi dès le départ.\nContrôle : deux racines indépendantes (vernis-sud.fr, peinture-nord.local) = deux arbres ; chaque arbre conserve ses domaines enfants contigus."
  },
  {
    "id": "aw-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Dessiner la forêt de ProtecSécurité",
    "exampleTitle": "Exemple résolu — l'arborescence d'un groupe scolaire",
    "goal": "Lire une arborescence de domaines (parents, enfants, racine) et prévoir l'effet d'un rachat sur le nombre d'arbres.",
    "brief": "<p><strong>Énoncé.</strong> <strong>ProtecSécurité</strong>, société de gardiennage, dessine son annuaire Active Directory. Le plan validé par la direction :</p><table><tr><th>Domaine</th><th>Domaine parent</th></tr><tr><td>protec.local</td><td>— (racine de l'arbre)</td></tr><tr><td>ouaga.protec.local</td><td>protec.local</td></tr><tr><td>bobo.protec.local</td><td>protec.local</td></tr><tr><td>labo.ouaga.protec.local</td><td>ouaga.protec.local</td></tr></table><p>Le cours : un domaine enfant dépend d'un domaine racine ; les domaines d'un même arbre partagent un espace de nom contigu ; une forêt regroupe un ou plusieurs arbres, indépendants et distincts.</p><p>Répondez par un nombre ou un nom de domaine.</p><ol><li>Combien de domaines compte cette forêt ?</li><li>Combien de domaines enfants directs a protec.local ?</li><li>Quel est le domaine parent de labo.ouaga.protec.local ?</li><li>Combien d'arbres forment ces quatre domaines ?</li><li>L'entreprise rachète un groupe qui gère déjà le domaine racine fabrik.local : combien d'arbres comptera la forêt ?</li><li>Combien de domaines enfants, tous niveaux confondus, l'arbre initial compte-t-il ?</li></ol>",
    "starter": "# Exercice — Dessiner la forêt de ProtecSécurité\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse est un nombre ou un nom de domaine.\n\n[Question 1 — Nombre de domaines de la forêt]\nA_COMPLETER\n\n[Question 2 — Enfants directs de protec.local]\nA_COMPLETER\n\n[Question 3 — Parent de labo.ouaga.protec.local]\nA_COMPLETER\n\n[Question 4 — Nombre d'arbres initiaux]\nA_COMPLETER\n\n[Question 5 — Arbres après le rachat de fabrik.local]\nA_COMPLETER\n\n[Question 6 — Domaines enfants tous niveaux confondus]\nA_COMPLETER\n",
    "hints": [
      "Dans le tableau, chaque ligne se lit : un domaine et son parent ; le tiret signale la racine, celle qui n'a pas de parent.",
      "« Enfants directs » compte les parents immédiats seulement ; « tous niveaux confondus » compte toute la descendance, petits-enfants compris.",
      "Contrôle : un arbre par racine indépendante ; quand une nouvelle racine entre dans la forêt, le nombre d'arbres augmente d'autant."
    ],
    "examples": [
      {
        "stdin": "Un groupe scolaire gère le domaine racine ecole.tg, avec primaire.ecole.tg et maternelle.primaire.ecole.tg.\n\n1) Domaines au total : 3.\n2) Enfants directs de ecole.tg : 1.\n3) Parent de maternelle.primaire.ecole.tg : primaire.ecole.tg.",
        "expected": "3 — 1 — primaire.ecole.tg",
        "note": "La descendance se compte par niveaux : enfants directs d'abord, puis petits-enfants — chaque niveau ajoute un préfixe au nom."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de domaines de la forêt",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Enfants directs de protec.local",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — Parent de labo.ouaga.protec.local",
        "stdin": "q:3",
        "expected": "ouaga.protec.local"
      },
      {
        "label": "Question 4 — Nombre d'arbres initiaux",
        "stdin": "q:4",
        "expected": "1||un"
      },
      {
        "label": "Question 5 — Arbres après le rachat de fabrik.local",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — Domaines enfants tous niveaux confondus",
        "stdin": "q:6",
        "expected": "3||trois"
      }
    ],
    "solution": "[Question 1 — Nombre de domaines de la forêt]\n4\n\n[Question 2 — Enfants directs de protec.local]\n2\n\n[Question 3 — Parent de labo.ouaga.protec.local]\nouaga.protec.local\n\n[Question 4 — Nombre d'arbres initiaux]\n1\n\n[Question 5 — Arbres après le rachat de fabrik.local]\n2\n\n[Question 6 — Domaines enfants tous niveaux confondus]\n3",
    "takeaway": "1) La forêt compte 4 domaines : protec.local, ouaga.protec.local, bobo.protec.local et labo.ouaga.protec.local.\n2) protec.local a 2 domaines enfants directs : ouaga.protec.local et bobo.protec.local.\n3) Le parent de labo.ouaga.protec.local est ouaga.protec.local — c'est un petit-enfant de la racine.\n4) Ces quatre domaines partagent l'espace de nom protec.local : ils forment 1 seul arbre.\n5) Avec fabrik.local (racine indépendante), la forêt comptera 2 arbres — indépendants et distincts.\n6) Tous niveaux confondus, l'arbre initial compte 3 domaines enfants : ouaga.protec.local, bobo.protec.local et labo.ouaga.protec.local.\nContrôle : 1 racine + 2 enfants directs + 1 petit-enfant = 4 domaines, un seul espace de nom, donc un seul arbre."
  },
  {
    "id": "aw-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le premier contrôleur de domaine de la Menuiserie Bois d'Or",
    "exampleTitle": "Exemple résolu — le contrôleur de domaine d'une librairie",
    "goal": "Dérouler les deux temps de l'installation : le rôle AD DS, puis la promotion du serveur en contrôleur de domaine d'une nouvelle forêt.",
    "brief": "<p><strong>Énoncé.</strong> La <strong>Menuiserie Bois d'Or</strong> a configuré son serveur <strong>SRV-OR</strong> (nom, adresse IP fixe, pare-feu, activation) : place maintenant à l'annuaire d'entreprise. L'administrateur veut créer le domaine <code>boisdor.local</code>. Le cours déroule l'installation en deux temps : d'abord le <strong>rôle AD DS</strong> (Gestionnaire de serveur, Gérer, Ajouter des rôles et des fonctionnalités : on coche « Services AD DS » et les fonctionnalités complémentaires) ; à la fin de cette installation, les <strong>binaires</strong> sont installés mais AD DS n'est <strong>pas encore configuré</strong> ; le Gestionnaire de serveur propose alors le lien « <strong>Promouvoir ce serveur en contrôleur de domaine</strong> ». Dans l'assistant, la création d'un premier domaine racine passe par « <strong>Ajouter une nouvelle forêt</strong> ». En PowerShell : <code>Install-WindowsFeature</code> pour le rôle, puis <code>Install-ADDSForest</code> pour la forêt. Après la vérification des prérequis, le serveur doit obligatoirement redémarrer.</p><p>Répondez par un sigle, un mot ou un nom de cmdlet.</p><ol><li>Quel rôle faut-il installer pour bâtir un contrôleur de domaine ? (sigle)</li><li>Après l'installation des binaires, le serveur est-il déjà un contrôleur de domaine ? (oui/non)</li><li>Comment s'appelle l'opération, proposée par le bandeau du Gestionnaire de serveur, qui achève la configuration ?</li><li>Pour créer un tout premier domaine racine, l'assistant propose d'ajouter une nouvelle… ? (un mot)</li><li>Quelle cmdlet PowerShell crée la nouvelle forêt ?</li></ol>",
    "starter": "# Exercice — Le premier contrôleur de domaine de la Menuiserie Bois d'Or\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses attendues : un sigle, oui/non, un mot, un nom de cmdlet.\n\n[Question 1 — Le rôle à installer]\nA_COMPLETER\n\n[Question 2 — Déjà contrôleur après les binaires ?]\nA_COMPLETER\n\n[Question 3 — L'opération qui achève la configuration]\nA_COMPLETER\n\n[Question 4 — Ajouter une nouvelle…]\nA_COMPLETER\n\n[Question 5 — La cmdlet qui crée la forêt]\nA_COMPLETER\n",
    "hints": [
      "Deux temps bien distincts : l'installation du rôle pose les binaires ; la configuration du serveur vient ensuite, par le lien du bandeau jaune.",
      "Tant que la configuration n'est pas faite, le domaine n'existe pas : un rôle à moitié configuré n'est pas un contrôleur.",
      "Pour la question 4, un premier domaine racine fonde une structure complète : le mot du cours désigne l'ensemble des arbres."
    ],
    "examples": [
      {
        "stdin": "Une librairie installe son premier contrôleur de domaine pour le domaine librairie.local.\n\n1) Le rôle à installer : AD DS.\n2) L'assistant propose : Ajouter une nouvelle forêt.\n3) La cmdlet PowerShell : Install-ADDSForest.",
        "expected": "ad ds — ajouter une nouvelle foret — install-addsforest",
        "note": "Le rôle ne suffit jamais : la promotion, puis la création de la forêt, transforment le serveur en contrôleur de domaine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le rôle à installer",
        "stdin": "q:1",
        "expected": "ad ds||ad-ds||adds||active directory domain services||services ad ds"
      },
      {
        "label": "Question 2 — Déjà contrôleur après les binaires ?",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — L'opération qui achève la configuration",
        "stdin": "q:3",
        "expected": "promotion||la promotion||promouvoir||promouvoir le serveur||promouvoir ce serveur en controleur de domaine"
      },
      {
        "label": "Question 4 — Ajouter une nouvelle…",
        "stdin": "q:4",
        "expected": "foret||une foret"
      },
      {
        "label": "Question 5 — La cmdlet qui crée la forêt",
        "stdin": "q:5",
        "expected": "install-addsforest"
      }
    ],
    "solution": "[Question 1 — Le rôle à installer]\nad ds\n\n[Question 2 — Déjà contrôleur après les binaires ?]\nnon\n\n[Question 3 — L'opération qui achève la configuration]\npromotion\n\n[Question 4 — Ajouter une nouvelle…]\nforet\n\n[Question 5 — La cmdlet qui crée la forêt]\ninstall-addsforest",
    "takeaway": "1) Il faut installer le rôle AD DS (Services de domaine Active Directory), avec ses fonctionnalités complémentaires automatiquement cochées.\n2) Non : à la fin de l'installation initiale, les binaires sont installés mais AD DS n'est pas encore configuré — le bandeau du Gestionnaire de serveur le rappelle.\n3) C'est la promotion : le lien « Promouvoir ce serveur en contrôleur de domaine » ouvre l'assistant de configuration, passage obligatoire.\n4) Pour un premier domaine racine, on choisit « Ajouter une nouvelle forêt ».\n5) En PowerShell, la forêt se crée avec Install-ADDSForest (après Install-WindowsFeature pour le rôle).\nContrôle : rôle installé puis promotion (nouvelle forêt), vérification des prérequis, et redémarrage obligatoire du serveur."
  },
  {
    "id": "aw-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La fiche de préparation d'ImprimaLocal",
    "exampleTitle": "Exemple résolu — la fiche d'un cabinet d'architectes",
    "goal": "Réunir avant l'assistant les informations exigées : nom DNS, nom NetBIOS, niveau fonctionnel, NTDS.DIT, SYSVOL et mot de passe DSRM.",
    "brief": "<p><strong>Énoncé.</strong> L'imprimerie <strong>ImprimaLocal</strong> (45 salariés) promeut son serveur <strong>SRV-IMP</strong> en contrôleur de domaine. Le cours exige de disposer, AVANT de lancer la configuration de l'AD DS, de : le <strong>nom DNS du domaine</strong>, le <strong>nom NetBIOS</strong>, la prise en charge (ou non) des versions antérieures, le fait que le contrôleur sera également <strong>DNS</strong>, et l'emplacement de la base <strong>NTDS.DIT</strong> et de <strong>SYSVOL</strong> (plus le mot de passe de restauration). La fiche de préparation validée par la direction :</p><table><tr><th>Rubrique</th><th>Valeur retenue</th></tr><tr><td>Nom DNS du domaine</td><td>imprimerie.local</td></tr><tr><td>Nom NetBIOS</td><td>IMPRIM</td></tr><tr><td>Niveau fonctionnel</td><td>le plus haut conseillé par le support</td></tr></table><p>Rappel du cours : le niveau fonctionnel d'un domaine correspond aux services disponibles pour ce domaine — plus il est élevé, plus les fonctionnalités sont nombreuses ; la base de données de l'Active Directory s'appelle NTDS.DIT ; SYSVOL contient les scripts de connexion des utilisateurs, les GPO (stratégies de groupe) et les fichiers nécessaires à la réplication ; le mot de passe de restauration (DSRM) sera utilisé uniquement si l'AD DS se retrouve corrompu et inaccessible.</p><p>Répondez par un nom, un sigle ou un niveau exact.</p><ol><li>Quel est le nom DNS complet du domaine à créer ?</li><li>Quel est le nom NetBIOS retenu ?</li><li>Quel niveau fonctionnel la direction retient-elle ? (le plus haut disponible)</li><li>Quel est le nom du fichier de la base de données de l'Active Directory ?</li><li>Dans quel dossier sont stockés les scripts de connexion et les GPO ?</li><li>Quel est le sigle du mot de passe de restauration ?</li></ol>",
    "starter": "# Exercice — La fiche de préparation d'ImprimaLocal\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses attendues : un nom de domaine, un nom court, un niveau, un fichier, un dossier, un sigle.\n\n[Question 1 — Nom DNS du domaine]\nA_COMPLETER\n\n[Question 2 — Nom NetBIOS]\nA_COMPLETER\n\n[Question 3 — Niveau fonctionnel retenu]\nA_COMPLETER\n\n[Question 4 — Fichier de la base de données]\nA_COMPLETER\n\n[Question 5 — Dossier des scripts et des GPO]\nA_COMPLETER\n\n[Question 6 — Sigle du mot de passe de restauration]\nA_COMPLETER\n",
    "hints": [
      "Cinq questions avant de cliquer : nom DNS, nom NetBIOS, compatibilité anciennes versions, DNS sur le contrôleur, emplacements de la base et de SYSVOL.",
      "Le nom NetBIOS est le préfixe court de la fiche ; le nom DNS porte le suffixe complet du domaine.",
      "Contrôle : la base est un fichier au nom bien connu ; le dossier des stratégies est un dossier système ; le mot de passe de secours s'abrège en quatre lettres."
    ],
    "examples": [
      {
        "stdin": "Un cabinet d'architectes prépare son contrôleur de domaine : domaine cabinets-archi.local, nom NetBIOS ARCHI, niveau fonctionnel le plus haut (Windows Server 2012 R2).\n\n1) Nom DNS : cabinets-archi.local.\n2) NetBIOS : ARCHI.\n3) Niveau fonctionnel : Windows Server 2012 R2.",
        "expected": "cabinets-archi.local — archi — windows server 2012 r2",
        "note": "Nom DNS complet pour le domaine, préfixe court pour NetBIOS, niveau le plus haut pour disposer de toutes les fonctionnalités."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nom DNS du domaine",
        "stdin": "q:1",
        "expected": "imprimerie.local"
      },
      {
        "label": "Question 2 — Nom NetBIOS",
        "stdin": "q:2",
        "expected": "imprim"
      },
      {
        "label": "Question 3 — Niveau fonctionnel retenu",
        "stdin": "q:3",
        "expected": "windows server 2012 r2||2012 r2"
      },
      {
        "label": "Question 4 — Fichier de la base de données",
        "stdin": "q:4",
        "expected": "ntds.dit||ntds"
      },
      {
        "label": "Question 5 — Dossier des scripts et des GPO",
        "stdin": "q:5",
        "expected": "sysvol"
      },
      {
        "label": "Question 6 — Sigle du mot de passe de restauration",
        "stdin": "q:6",
        "expected": "dsrm||mode de restauration des services d'annuaire||mode de restauration des services d’annuaire"
      }
    ],
    "solution": "[Question 1 — Nom DNS du domaine]\nimprimerie.local\n\n[Question 2 — Nom NetBIOS]\nimprim\n\n[Question 3 — Niveau fonctionnel retenu]\nwindows server 2012 r2\n\n[Question 4 — Fichier de la base de données]\nntds.dit\n\n[Question 5 — Dossier des scripts et des GPO]\nsysvol\n\n[Question 6 — Sigle du mot de passe de restauration]\ndsrm",
    "takeaway": "1) Le nom DNS complet du domaine à créer est imprimerie.local.\n2) Le nom NetBIOS retenu est IMPRIM : c'est le préfixe court saisi dans la fiche de préparation.\n3) Le support conseille le niveau fonctionnel le plus haut : Windows Server 2012 R2.\n4) La base de données de l'Active Directory est le fichier NTDS.DIT (fichiers du fonctionnement interne : base, fichiers temporaires, fichiers d'échanges).\n5) Les scripts de connexion des utilisateurs et les GPO vivent dans SYSVOL, avec les fichiers nécessaires à la réplication AD et aux partages publics.\n6) Le mot de passe de restauration porte le sigle DSRM : il ne sert que si l'AD DS se retrouve corrompu et inaccessible — d'où l'obligation de le choisir solide et mémorisé.\nContrôle : les cinq informations avant l'assistant sont réunies (DNS, NetBIOS, niveau, emplacements, DSRM) : installation sans retour en arrière."
  },
  {
    "id": "aw-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Remettre l'assistant AD DS en ordre chez VulcanMéca",
    "exampleTitle": "Exemple résolu — l'ordre des étapes chez un garagiste",
    "goal": "Ordonner les étapes de l'installation d'un contrôleur de domaine et situer le rôle DNS, les GPO et les dossiers par défaut.",
    "brief": "<p><strong>Énoncé.</strong> Chez <strong>VulcanMéca</strong> (mécanique industrielle), un stagiaire a mélangé ses notes sur l'installation du contrôleur de domaine du serveur <strong>SRV-VUL</strong>. Ses cinq étapes, dans le désordre :</p><table><tr><th>Lettre</th><th>Étape notée par le stagiaire</th></tr><tr><td>A</td><td>Promouvoir le serveur en contrôleur de domaine (nouvelle forêt, nom du domaine)</td></tr><tr><td>B</td><td>Installer le rôle AD DS avec ses fonctionnalités complémentaires</td></tr><tr><td>C</td><td>Redémarrer le serveur après la vérification des prérequis</td></tr><tr><td>D</td><td>Choisir le niveau fonctionnel et définir le mot de passe de restauration</td></tr><tr><td>E</td><td>Choisir les emplacements de la base NTDS.DIT, des journaux et de SYSVOL</td></tr></table><p>Rappel du cours : l'ordre de l'assistant est rôle, puis promotion (nouvelle forêt), puis niveau fonctionnel et mot de passe DSRM, puis DNS, puis dossiers, puis récapitulatif, vérification des prérequis et redémarrage obligatoire ; l'avertissement de l'assistant signale que le rôle AD DS nécessite le rôle DNS ; SYSVOL contient les scripts de connexion, les GPO et les fichiers nécessaires à la réplication ; par défaut, les dossiers de la base, des journaux et de SYSVOL vivent sous <code>C:\\Windows</code>.</p><p>Aux questions 1 à 3, répondez par la lettre seule de l'étape.</p><ol><li>Quelle étape vient en premier ?</li><li>Quelle étape suit immédiatement l'installation du rôle ?</li><li>Quelle étape clôt la procédure ?</li><li>L'avertissement de l'assistant rappelle que le rôle AD DS nécessite quel autre rôle ?</li><li>SYSVOL contient les scripts de connexion, les fichiers de réplication et quelles stratégies ? (sigle)</li><li>Par défaut, sous quel dossier de Windows les dossiers de l'AD sont-ils créés ?</li></ol>",
    "starter": "# Exercice — Remettre l'assistant AD DS en ordre chez VulcanMéca\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : la lettre seule. Questions 4 à 6 : un mot, un sigle ou un chemin.\n\n[Question 1 — La première étape]\nA_COMPLETER\n\n[Question 2 — L'étape qui suit l'installation du rôle]\nA_COMPLETER\n\n[Question 3 — La dernière étape]\nA_COMPLETER\n\n[Question 4 — L'autre rôle exigé par AD DS]\nA_COMPLETER\n\n[Question 5 — Les stratégies stockées dans SYSVOL]\nA_COMPLETER\n\n[Question 6 — Le dossier Windows par défaut]\nA_COMPLETER\n",
    "hints": [
      "L'ordre du cours : les binaires d'abord, la promotion ensuite, puis les choix de configuration — le redémarrage clôt toujours la vérification des prérequis.",
      "Repérez l'étape qui ne peut avoir aucun prérequis (la toute première) et celle qui n'a de sens qu'une fois tout vérifié (la toute dernière).",
      "Contrôle : votre ordre doit commencer par l'étape qui installe et finir par celle qui redémarre ; entre les deux, la configuration précède la vérification."
    ],
    "examples": [
      {
        "stdin": "Un garagiste note ses étapes en désordre : « X. définir le mot de passe DSRM », « Y. installer le rôle AD DS », « Z. promouvoir le serveur (nouvelle forêt) ».\n\n1) La première étape : Y.\n2) La deuxième : Z.\n3) La troisième : X.",
        "expected": "y — z — x",
        "note": "Le rôle précède toujours la promotion ; les choix de configuration (niveau, DSRM) viennent ensuite, le redémarrage en dernier."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La première étape",
        "stdin": "q:1",
        "expected": "b||b.||lettre b||etape b"
      },
      {
        "label": "Question 2 — L'étape qui suit l'installation du rôle",
        "stdin": "q:2",
        "expected": "a||a.||lettre a||etape a"
      },
      {
        "label": "Question 3 — La dernière étape",
        "stdin": "q:3",
        "expected": "c||c.||lettre c||etape c"
      },
      {
        "label": "Question 4 — L'autre rôle exigé par AD DS",
        "stdin": "q:4",
        "expected": "dns||le dns||le role dns"
      },
      {
        "label": "Question 5 — Les stratégies stockées dans SYSVOL",
        "stdin": "q:5",
        "expected": "gpo||les gpo||strategies de groupe"
      },
      {
        "label": "Question 6 — Le dossier Windows par défaut",
        "stdin": "q:6",
        "expected": "c:\\windows||c:/windows||windows"
      }
    ],
    "solution": "[Question 1 — La première étape]\nb\n\n[Question 2 — L'étape qui suit l'installation du rôle]\na\n\n[Question 3 — La dernière étape]\nc\n\n[Question 4 — L'autre rôle exigé par AD DS]\ndns\n\n[Question 5 — Les stratégies stockées dans SYSVOL]\ngpo\n\n[Question 6 — Le dossier Windows par défaut]\nc:\\windows",
    "takeaway": "1) La première étape est B : installer le rôle AD DS avec ses fonctionnalités complémentaires — sans les binaires, rien ne commence.\n2) L'étape A suit immédiatement : promouvoir le serveur en contrôleur de domaine (nouvelle forêt, nom du domaine) — les binaires seuls ne configurent rien.\n3) La dernière étape est C : le redémarrage obligatoire après la vérification des prérequis.\n4) L'avertissement de l'assistant signale que le rôle AD DS nécessite le rôle DNS : installé en même temps, il se configure quasi-automatiquement.\n5) SYSVOL contient les scripts de connexion, les fichiers nécessaires à la réplication et les GPO (stratégies de groupe).\n6) Par défaut, les dossiers de la base, des journaux et de SYSVOL vivent sous C:\\Windows — on peut les déplacer, simple question d'organisation interne.\nContrôle : B (rôle) → A (promotion, nouvelle forêt) → D (niveau + DSRM) → E (emplacements) → récapitulatif et vérification → C (redémarrage)."
  },
  {
    "id": "aw-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le domaine Transit-Ouaga se peuple",
    "exampleTitle": "Exemple résolu — le domaine d'une radio",
    "goal": "Peupler un domaine dans l'ordre : console Utilisateurs et ordinateurs Active Directory, unités d'organisation d'abord, puis objets.",
    "brief": "<p><strong>Énoncé.</strong> L'entreprise de transit <strong>Transit-Ouaga</strong> vient de promouvoir son serveur en contrôleur du domaine <code>transit-ouaga.local</code>. Le domaine est vide ; l'administrateur lance la console du cours, <strong>Utilisateurs et ordinateurs Active Directory</strong>, et dessine d'abord la structure d'unités d'organisation :</p><table><tr><th>Unité d'organisation (UO)</th><th>Objets à y ranger</th></tr><tr><td>Direction</td><td>directrice, secrétaire</td></tr><tr><td>Comptabilité</td><td>comptables</td></tr><tr><td>Logistique</td><td>agents de transit</td></tr><tr><td>Informatique</td><td>administrateur, techniciens</td></tr></table><p>Arrivent ensuite les créations : <strong>Karim Sawadogo</strong>, comptable, puis les postes de travail, puis les groupes de droits. Le cours : l'UO est le conteneur qui range les objets par service, site ou projet (on la crée par un clic droit, Nouveau, Unité d'organisation) ; on crée l'UO avant les comptes ; un poste rejoint au domaine devient un objet ordinateur ; les groupes servent à donner des droits.</p><p>Répondez par un mot ou une expression très courte.</p><ol><li>Quelle console graphique permet de créer les UO, les utilisateurs et les groupes ?</li><li>Dans quelle unité d'organisation créer le compte de Karim, comptable ?</li><li>Quel objet faut-il créer en premier pour ranger les comptes : l'UO ou l'utilisateur ?</li><li>Un poste de travail rejoint au domaine devient un objet de quelle classe ? (un mot)</li><li>Quel objet crée-t-on pour donner des droits à plusieurs utilisateurs d'un coup ? (un mot)</li></ol>",
    "starter": "# Exercice — Le domaine Transit-Ouaga se peuple\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un mot ou une expression très courte.\n\n[Question 1 — La console pour peupler le domaine]\nA_COMPLETER\n\n[Question 2 — L'UO du compte de Karim]\nA_COMPLETER\n\n[Question 3 — L'objet à créer en premier]\nA_COMPLETER\n\n[Question 4 — Classe de l'objet « poste de travail »]\nA_COMPLETER\n\n[Question 5 — L'objet qui porte les droits]\nA_COMPLETER\n",
    "hints": [
      "Le cours nomme la console par son nom complet : c'est elle qui affiche le domaine, ses UO, ses utilisateurs et ses ordinateurs.",
      "Chaque objet se range selon son rôle métier : relisez le tableau des UO avant de créer le compte de Karim.",
      "Contrôle : le premier geste du chapitre est le conteneur ; les comptes et les groupes viennent ensuite se ranger dedans."
    ],
    "examples": [
      {
        "stdin": "Une radio crée son domaine radio.local avec les UO « Animation » et « Technique ». L'animatrice Rokia rejoint l'équipe, et son poste est rejoint au domaine.\n\n1) La console : Utilisateurs et ordinateurs Active Directory.\n2) L'UO du compte de Rokia : Animation.\n3) On crée d'abord : l'UO.",
        "expected": "utilisateurs et ordinateurs active directory — animation — uo",
        "note": "La structure d'UO précède toujours les créations : le conteneur d'abord, les objets ensuite."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La console pour peupler le domaine",
        "stdin": "q:1",
        "expected": "utilisateurs et ordinateurs active directory||utilisateurs et ordinateurs ad||active directory utilisateurs et ordinateurs||utilisateurs et ordinateurs||dsa.msc||dsa msc"
      },
      {
        "label": "Question 2 — L'UO du compte de Karim",
        "stdin": "q:2",
        "expected": "comptabilite||la comptabilite||uo comptabilite"
      },
      {
        "label": "Question 3 — L'objet à créer en premier",
        "stdin": "q:3",
        "expected": "uo||l uo||l'uo||l’uo||unite d organisation||l unite d organisation"
      },
      {
        "label": "Question 4 — Classe de l'objet « poste de travail »",
        "stdin": "q:4",
        "expected": "ordinateur||ordinateurs||un ordinateur"
      },
      {
        "label": "Question 5 — L'objet qui porte les droits",
        "stdin": "q:5",
        "expected": "groupe||un groupe||groupe de securite"
      }
    ],
    "solution": "[Question 1 — La console pour peupler le domaine]\nutilisateurs et ordinateurs active directory\n\n[Question 2 — L'UO du compte de Karim]\ncomptabilite\n\n[Question 3 — L'objet à créer en premier]\nuo\n\n[Question 4 — Classe de l'objet « poste de travail »]\nordinateur\n\n[Question 5 — L'objet qui porte les droits]\ngroupe",
    "takeaway": "1) La console du cours est Utilisateurs et ordinateurs Active Directory (dsa.msc) : c'est elle qui crée UO, utilisateurs et groupes.\n2) Karim est comptable : son compte se crée dans l'UO Comptabilité.\n3) On crée l'UO en premier : le conteneur précède toujours les comptes, sinon rien pour les ranger et la structure est à refaire.\n4) Un poste de travail rejoint au domaine devient un objet de la classe ordinateur.\n5) Pour donner des droits à plusieurs utilisateurs d'un coup, on crée un groupe (de sécurité) et on y ajoute les membres.\nContrôle : UO d'abord, puis groupes et utilisateurs, puis jointure des postes — l'ordre du cours est respecté."
  },
  {
    "id": "aw-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Les comptes de CotonTchad : UPN et options",
    "exampleTitle": "Exemple résolu — les comptes d'une briqueterie",
    "goal": "Créer des comptes utilisateurs : écrire l'UPN et la forme NetBIOS, connaître l'onglet Compte, l'option de premier changement et les cmdlets New-ADUser / Get-ADUser.",
    "brief": "<p><strong>Énoncé.</strong> <strong>CotonTchad</strong> gère le domaine <code>cotontchad.local</code>, dont le nom NetBIOS est <strong>COTON</strong>. Trois comptes sont à créer ce matin, chacun dans l'UO de son service :</p><table><tr><th>Salarié</th><th>Service</th><th>Login</th></tr><tr><td>Mariam Diallo</td><td>Comptabilité</td><td>m.diallo</td></tr><tr><td>Idi Tandja</td><td>Logistique</td><td>i.tandja</td></tr><tr><td>Sara Youssouf</td><td>Direction</td><td>s.youssouf</td></tr></table><p>Rappel du cours : l'utilisateur se crée dans son UO (clic droit, Nouveau, Utilisateur) ; deux moyens d'ouvrir une session : l'<strong>UPN</strong>, forme d'adresse e-mail (<code>iziti@ntic.ma</code> dans le support), ou la forme <code>DOMAINE\\login</code> ; l'option « L'utilisateur doit changer le mot de passe à la prochaine ouverture de session » force le changement à la première connexion ; dans les propriétés du compte, l'onglet <strong>Compte</strong> regroupe l'ouverture de session et les <strong>horaires d'accès</strong> ; en PowerShell : <code>New-ADUser</code>, <code>Set-ADUser</code>, <code>Get-ADUser</code>.</p><ol><li>Écrivez l'UPN de Mariam Diallo.</li><li>Écrivez sa session sous la forme NetBIOS (DOMAINE\\login).</li><li>Dans quel onglet des propriétés du compte trouve-t-on les horaires d'accès ?</li><li>Vrai ou faux : l'option « L'utilisateur doit changer le mot de passe à la prochaine ouverture de session » force le changement à la première connexion ?</li><li>Quelle cmdlet PowerShell crée un utilisateur dans l'Active Directory ?</li><li>Quelle cmdlet affiche les propriétés d'un utilisateur ?</li></ol>",
    "starter": "# Exercice — Les comptes de CotonTchad : UPN et options\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : syntaxes exactes. Questions 3 à 6 : un mot, un onglet ou une cmdlet.\n\n[Question 1 — L'UPN de Mariam Diallo]\nA_COMPLETER\n\n[Question 2 — Sa session sous la forme NetBIOS]\nA_COMPLETER\n\n[Question 3 — L'onglet des horaires d'accès]\nA_COMPLETER\n\n[Question 4 — L'option du premier changement]\nA_COMPLETER\n\n[Question 5 — La cmdlet qui crée un utilisateur]\nA_COMPLETER\n\n[Question 6 — La cmdlet qui affiche un utilisateur]\nA_COMPLETER\n",
    "hints": [
      "L'UPN est la forme e-mail : login, arobase, nom DNS complet du domaine ; la forme NetBIOS utilise l'antislash et le préfixe court du domaine.",
      "Pour l'onglet, relisez les propriétés du compte : celui qui parle d'ouverture de session et d'horaires.",
      "Contrôle : les cmdlets AD se lisent comme des phrases — l'une crée, l'autre consulte ; Set-ADUser modifierait."
    ],
    "examples": [
      {
        "stdin": "Une briqueterie gère le domaine brique.tg (NetBIOS BRIQUE) et crée le compte de l'ouvrier a.kobi.\n\n1) UPN : a.kobi@brique.tg.\n2) Forme NetBIOS : BRIQUE\\a.kobi.\n3) La cmdlet de création : New-ADUser.",
        "expected": "a.kobi@brique.tg — brique\\a.kobi — new-aduser",
        "note": "Arobase pour l'UPN, antislash pour NetBIOS : les deux formes désignent le même compte du domaine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — L'UPN de Mariam Diallo",
        "stdin": "q:1",
        "expected": "m.diallo@cotontchad.local"
      },
      {
        "label": "Question 2 — Sa session sous la forme NetBIOS",
        "stdin": "q:2",
        "expected": "COTON\\m.diallo"
      },
      {
        "label": "Question 3 — L'onglet des horaires d'accès",
        "stdin": "q:3",
        "expected": "compte||l onglet compte||onglet compte"
      },
      {
        "label": "Question 4 — L'option du premier changement",
        "stdin": "q:4",
        "expected": "vrai||oui"
      },
      {
        "label": "Question 5 — La cmdlet qui crée un utilisateur",
        "stdin": "q:5",
        "expected": "new-aduser"
      },
      {
        "label": "Question 6 — La cmdlet qui affiche un utilisateur",
        "stdin": "q:6",
        "expected": "get-aduser"
      }
    ],
    "solution": "[Question 1 — L'UPN de Mariam Diallo]\nm.diallo@cotontchad.local\n\n[Question 2 — Sa session sous la forme NetBIOS]\nCOTON\\m.diallo\n\n[Question 3 — L'onglet des horaires d'accès]\ncompte\n\n[Question 4 — L'option du premier changement]\nvrai\n\n[Question 5 — La cmdlet qui crée un utilisateur]\nnew-aduser\n\n[Question 6 — La cmdlet qui affiche un utilisateur]\nget-aduser",
    "takeaway": "1) L'UPN de Mariam Diallo est m.diallo@cotontchad.local : la forme d'adresse e-mail, comme iziti@ntic.ma dans le support.\n2) La forme NetBIOS est COTON\\m.diallo : le préfixe court du domaine, l'antislash, puis le login.\n3) Les horaires d'accès (restriction des horaires de connexion) se règlent dans l'onglet Compte des propriétés de l'utilisateur, avec la partie ouverture de session.\n4) Vrai : cette option force le changement du mot de passe à la première connexion — le réflexe de sécurité pour tout compte neuf.\n5) New-ADUser crée un utilisateur de l'Active Directory en PowerShell.\n6) Get-ADUser affiche les propriétés d'un utilisateur (Set-ADUser, lui, modifie).\nContrôle : UPN et forme NetBIOS désignent le même compte ; le cycle d'un compte neuf se termine par le test de connexion."
  },
  {
    "id": "aw-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Groupes et jointure au domaine chez Assurances Baobab",
    "exampleTitle": "Exemple résolu — les groupes d'une pharmacie",
    "goal": "Choisir le type (sécurité ou distribution) et l'étendue d'un groupe, appliquer la règle des droits et préparer la jointure d'un poste au domaine.",
    "brief": "<p><strong>Énoncé.</strong> <strong>Assurances Baobab</strong> gère le domaine <code>baobab.local</code>. L'administrateur prépare trois groupes, puis la jointure des postes clients :</p><table><tr><th>Groupe prévu</th><th>But du groupe</th></tr><tr><td>GG-Compta</td><td>donner des droits sur le dossier partagé de la comptabilité</td></tr><tr><td>LISTE-INFO</td><td>diffuser les notes d'information à tout le personnel par courriel</td></tr><tr><td>GG-Sinistres</td><td>donner des droits sur l'application de gestion des sinistres</td></tr></table><p>Rappel du cours : les groupes sont créés pour donner des droits sur des fichiers, imprimantes, bases de données ; deux types : <strong>sécurité</strong> (reçoivent des droits) et <strong>distribution</strong> (listes de diffusion) ; pour un groupe d'utilisateurs du même domaine, le support choisit l'étendue <strong>Globale</strong> ; on donne les droits aux groupes, pas aux utilisateurs isolés ; avant de joindre un poste au domaine, le client doit recevoir en serveur DNS celui du domaine Active Directory ; le <strong>profil itinérant</strong> synchronise le profil sur le serveur pour suivre l'utilisateur de poste en poste.</p><p>Répondez par un seul mot ou une expression très courte.</p><ol><li>Quel type de groupe pour GG-Compta ? (un mot)</li><li>Quel type de groupe pour LISTE-INFO ? (un mot)</li><li>Quelle étendue choisir pour GG-Sinistres, groupe d'utilisateurs du même domaine ?</li><li>À qui accorder les droits sur le dossier comptabilité : à chaque utilisateur isolé ou au groupe ?</li><li>Avant de joindre un poste au domaine, quel paramètre du poste doit pointer vers le serveur DNS du domaine ?</li><li>Comment s'appelle le profil synchronisé sur le serveur qui suit l'utilisateur de poste en poste ? (profil …)</li></ol>",
    "starter": "# Exercice — Groupes et jointure au domaine chez Assurances Baobab\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse tient en un mot ou une expression très courte.\n\n[Question 1 — Type du groupe GG-Compta]\nA_COMPLETER\n\n[Question 2 — Type du groupe LISTE-INFO]\nA_COMPLETER\n\n[Question 3 — Étendue de GG-Sinistres]\nA_COMPLETER\n\n[Question 4 — À qui donner les droits ?]\nA_COMPLETER\n\n[Question 5 — Le paramètre à vérifier avant la jointure]\nA_COMPLETER\n\n[Question 6 — Le profil qui suit l'utilisateur]\nA_COMPLETER\n",
    "hints": [
      "Deux types, deux usages : celui qui reçoit des droits, celui qui ne sert qu'à diffuser des messages.",
      "Pour chaque groupe du tableau, demandez-vous si on lui accorde des permissions ou s'il ne sert qu'à envoyer des courriels.",
      "Contrôle : la règle d'or du cours pour les droits ; le paramètre réseau obligatoire avant toute jointure ; et le profil qui voyage de poste en poste."
    ],
    "examples": [
      {
        "stdin": "Une pharmacie crée le groupe PHARMA-STOCK pour les droits sur le logiciel de stock, et le groupe LISTE-EQUIPE pour la diffusion interne des consignes.\n\n1) PHARMA-STOCK : securite.\n2) LISTE-EQUIPE : distribution.\n3) L'étendue des groupes d'utilisateurs du même domaine : globale.",
        "expected": "securite — distribution — globale",
        "note": "Droits = sécurité ; diffusion = distribution ; l'étendue Globale est le choix courant pour regrouper les utilisateurs d'un même domaine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type du groupe GG-Compta",
        "stdin": "q:1",
        "expected": "securite||de securite||groupe de securite"
      },
      {
        "label": "Question 2 — Type du groupe LISTE-INFO",
        "stdin": "q:2",
        "expected": "distribution||de distribution||groupe de distribution"
      },
      {
        "label": "Question 3 — Étendue de GG-Sinistres",
        "stdin": "q:3",
        "expected": "globale||global||etendue globale"
      },
      {
        "label": "Question 4 — À qui donner les droits ?",
        "stdin": "q:4",
        "expected": "au groupe||groupe||aux groupes||au groupe de securite"
      },
      {
        "label": "Question 5 — Le paramètre à vérifier avant la jointure",
        "stdin": "q:5",
        "expected": "dns||le dns||serveur dns||le serveur dns"
      },
      {
        "label": "Question 6 — Le profil qui suit l'utilisateur",
        "stdin": "q:6",
        "expected": "itinerant||itinérant||profil itinerant"
      }
    ],
    "solution": "[Question 1 — Type du groupe GG-Compta]\nsecurite\n\n[Question 2 — Type du groupe LISTE-INFO]\ndistribution\n\n[Question 3 — Étendue de GG-Sinistres]\nglobale\n\n[Question 4 — À qui donner les droits ?]\nau groupe\n\n[Question 5 — Le paramètre à vérifier avant la jointure]\ndns\n\n[Question 6 — Le profil qui suit l'utilisateur]\nitinerant",
    "takeaway": "1) GG-Compta reçoit des droits sur le dossier partagé : c'est un groupe de sécurité.\n2) LISTE-INFO ne sert qu'à diffuser les notes d'information par courriel : c'est un groupe de distribution.\n3) Pour un groupe d'utilisateurs du même domaine, le support choisit l'étendue Globale.\n4) On accorde les droits au groupe (GG-Compta), jamais aux utilisateurs isolés : la règle d'or du cours — les comptes restent propres et les droits se retirent en une suppression de membre.\n5) Avant la jointure, le poste client doit recevoir en serveur DNS celui du domaine Active Directory : sans DNS, personne ne trouve le contrôleur.\n6) C'est le profil itinérant : synchronisé sur le serveur, il rend les données de l'utilisateur accessibles depuis n'importe quel poste du domaine.\nContrôle : deux groupes de sécurité (droits), un groupe de distribution (diffusion) ; jointure = DNS d'abord, appartenance au domaine ensuite, redémarrage enfin."
  }
];
