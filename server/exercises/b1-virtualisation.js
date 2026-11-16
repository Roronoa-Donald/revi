/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "vt-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La journée de M. Fainéant",
    "exampleTitle": "Exemple résolu — le week-end du serveur de sauvegarde",
    "goal": "Appliquer le seuil des 48 minutes pour classer les heures d'un serveur et calculer son taux d'inactivité.",
    "brief": "<p><strong>Énoncé.</strong> Dans l'histoire, M. Fainéant, le serveur du service informatique, héberge un seul service et « passait 80 % de son temps à ne rien faire ». L'ingénieur décide de le vérifier : sur une journée de travail de <strong>8 heures</strong>, il relève, heure par heure, les minutes d'inactivité du serveur.</p><table><tr><th>Heure</th><th>9h</th><th>10h</th><th>11h</th><th>12h</th><th>14h</th><th>15h</th><th>16h</th><th>17h</th></tr><tr><th>Minutes d'inactivité</th><td>55</td><td>48</td><td>60</td><td>25</td><td>48</td><td>60</td><td>40</td><td>48</td></tr></table><p>Rappel du cours : une heure est dite <strong>perdue</strong> si elle compte <strong>au moins 48 minutes</strong> d'inactivité (80 % d'une heure de 60 minutes) ; sinon elle est <strong>utile</strong>.</p><ol><li>Combien de minutes d'inactivité représentent 80 % d'une heure ?</li><li>Combien d'heures perdues compte cette journée ?</li><li>Quelle est la durée totale d'inactivité de la journée, en minutes ?</li><li>Quel est le taux d'inactivité de la journée (durée totale d'inactivité sur les 480 minutes travaillées), en pourcentage ?</li><li>L'heure de 12h, avec ses 25 minutes d'inactivité, est-elle perdue ou utile ? Répondez par un seul mot.</li></ol>",
    "starter": "# Exercice — La journée de M. Fainéant\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — 80 % d'une heure, en minutes]\nA_COMPLETER\n\n[Question 2 — Nombre d'heures perdues]\nA_COMPLETER\n\n[Question 3 — Durée totale d'inactivité (minutes)]\nA_COMPLETER\n\n[Question 4 — Taux d'inactivité de la journée (%)]\nA_COMPLETER\n\n[Question 5 — Verdict de l'heure de 12h (perdue ou utile)]\nA_COMPLETER\n",
    "hints": [
      "Le seuil du cours se calcule à partir d'une heure de 60 minutes : 80 % de 60 minutes donnent la limite d'une heure perdue.",
      "Comptez comme perdues les heures dont l'inactivité atteint ou dépasse le seuil, puis additionnez toutes les minutes d'inactivité, heures utiles comprises.",
      "Le taux final s'obtient en divisant la durée totale d'inactivité par la durée travaillée totale (8 heures = 480 minutes), multiplié par 100."
    ],
    "examples": [
      {
        "stdin": "Le week-end, l'ingénieur mesure le serveur de sauvegarde sur 4 heures :\n60 — 20 — 48 — 52 minutes d'inactivité.\n\n1) Le seuil est 48 minutes.\n2) Heures perdues : 60 (oui), 20 (non), 48 (oui, atteint), 52 (oui) : 3 heures perdues.\n3) Durée totale d'inactivité : 60 + 20 + 48 + 52 = 180 minutes.\n4) Taux d'inactivité : 180/240 x 100 = 75 %.",
        "expected": "seuil : 48 min — 3 heures perdues — 180 minutes — taux : 75 %",
        "note": "Le seuil de 48 minutes est atteint OU dépassé : une heure avec exactement 48 minutes d'inactivité est déjà perdue."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — 80 % d'une heure, en minutes",
        "stdin": "q:1",
        "expected": "48"
      },
      {
        "label": "Question 2 — Nombre d'heures perdues",
        "stdin": "q:2",
        "expected": "6"
      },
      {
        "label": "Question 3 — Durée totale d'inactivité (minutes)",
        "stdin": "q:3",
        "expected": "384"
      },
      {
        "label": "Question 4 — Taux d'inactivité de la journée (%)",
        "stdin": "q:4",
        "expected": "80"
      },
      {
        "label": "Question 5 — Verdict de l'heure de 12h",
        "stdin": "q:5",
        "expected": "utile"
      }
    ],
    "solution": "[Question 1 — 80 % d'une heure, en minutes]\n48\n\n[Question 2 — Nombre d'heures perdues]\n6\n\n[Question 3 — Durée totale d'inactivité (minutes)]\n384\n\n[Question 4 — Taux d'inactivité de la journée (%)]\n80\n\n[Question 5 — Verdict de l'heure de 12h (perdue ou utile)]\nutile",
    "takeaway": "1) 80 % d'une heure : 60 x 0,80 = 48 minutes. C'est le seuil du cours : une heure avec au moins 48 minutes d'inactivité est perdue.\n2) Heures perdues (au moins 48 minutes) : 9h (55), 10h (48), 11h (60), 14h (48), 15h (60), 17h (48) : 6 heures perdues. Les heures de 12h (25) et 16h (40) sont utiles.\n3) Durée totale d'inactivité : 55 + 48 + 60 + 25 + 48 + 60 + 40 + 48 = 384 minutes.\n4) Taux d'inactivité : 384/480 x 100 = 80 %. La fable est confirmée par la mesure : M. Fainéant est inactif 80 % de son temps.\n5) L'heure de 12h compte 25 minutes d'inactivité, moins que le seuil de 48 : elle est utile.\nContrôle : la somme des heures perdues (55+48+60+48+60+48 = 319 minutes) et celle des heures utiles (25+40 = 65 minutes) redonnent 319 + 65 = 384 minutes, le total de la journée."
  },
  {
    "id": "vt-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Un service par serveur : la semaine du parc",
    "exampleTitle": "Exemple résolu — le parc de la petite entreprise",
    "goal": "Calculer des taux d'utilisation à partir de minutes occupées et découvrir le principe de la consolidation.",
    "brief": "<p><strong>Énoncé.</strong> Avant la virtualisation, le responsable informatique impose sa règle : <strong>un seul service par serveur physique</strong>. Son parc compte des serveurs mono-service. Sur la semaine ouvrée de <strong>4 800 minutes</strong>, l'ingénieur relève les minutes réellement occupées par le service de chaque serveur :</p><table><tr><th>Serveur</th><th>Service hébergé</th><th>Minutes occupées (sur 4 800)</th></tr><tr><td>srv-intranet</td><td>intranet</td><td>480</td></tr><tr><td>srv-messagerie</td><td>messagerie</td><td>1 440</td></tr><tr><td>srv-sauvegarde</td><td>sauvegarde</td><td>720</td></tr><tr><td>srv-fichiers</td><td>fichiers</td><td>1 200</td></tr></table><ol><li>Combien de serveurs physiques composent le parc ?</li><li>Quel est le taux d'utilisation de srv-intranet sur la semaine, en pourcentage ?</li><li>Quel est le taux d'utilisation de srv-messagerie, en pourcentage ?</li><li>Quel est le taux d'utilisation moyen du parc, en pourcentage ?</li><li>Si l'on regroupait les quatre services sur un seul serveur consolidé, quel taux d'utilisation cumulé obtiendrait-on, en pourcentage ?</li><li>Quel est le service le plus occupé de la semaine ? (répondez par le nom du service)</li></ol>",
    "starter": "# Exercice — Un service par serveur : la semaine du parc\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de serveurs physiques]\nA_COMPLETER\n\n[Question 2 — Taux d'utilisation de srv-intranet (%)]\nA_COMPLETER\n\n[Question 3 — Taux d'utilisation de srv-messagerie (%)]\nA_COMPLETER\n\n[Question 4 — Taux d'utilisation moyen du parc (%)]\nA_COMPLETER\n\n[Question 5 — Taux cumulé si tout sur un seul serveur (%)]\nA_COMPLETER\n\n[Question 6 — Service le plus occupé]\nA_COMPLETER\n",
    "hints": [
      "Le taux d'utilisation d'un serveur s'obtient en divisant ses minutes occupées par les 4 800 minutes de la semaine, multiplié par 100.",
      "Le taux moyen du parc est la moyenne des quatre taux ; le taux cumulé de la consolidation est la somme des quatre taux.",
      "Le service le plus occupé est celui dont le serveur a compté le plus de minutes occupées dans le tableau."
    ],
    "examples": [
      {
        "stdin": "Une petite entreprise exploite 3 serveurs mono-service sur une semaine de 2 400 minutes :\ncomptabilité : 120 minutes — courriel : 960 minutes — wiki : 360 minutes.\n\n1) Taux de la comptabilité : 120/2400 x 100 = 5 %.\n2) Taux du courriel : 960/2400 x 100 = 40 %.\n3) Taux moyen : (5 + 40 + 15)/3 = 20 %.\n4) Taux cumulé sur un seul serveur : 5 + 40 + 15 = 60 %.\n5) Service le plus occupé : le courriel.",
        "expected": "comptabilité : 5 % — courriel : 40 % — wiki : 15 % — moyenne : 20 % — cumulé : 60 %",
        "note": "Trois services à 5, 40 et 15 % tiennent ensemble à 60 % sur une seule machine : c'est tout le principe de la consolidation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de serveurs physiques",
        "stdin": "q:1",
        "expected": "4"
      },
      {
        "label": "Question 2 — Taux d'utilisation de srv-intranet (%)",
        "stdin": "q:2",
        "expected": "10"
      },
      {
        "label": "Question 3 — Taux d'utilisation de srv-messagerie (%)",
        "stdin": "q:3",
        "expected": "30"
      },
      {
        "label": "Question 4 — Taux d'utilisation moyen du parc (%)",
        "stdin": "q:4",
        "expected": "20"
      },
      {
        "label": "Question 5 — Taux cumulé sur un seul serveur (%)",
        "stdin": "q:5",
        "expected": "80"
      },
      {
        "label": "Question 6 — Service le plus occupé",
        "stdin": "q:6",
        "expected": "messagerie||la messagerie||srv-messagerie||le service messagerie"
      }
    ],
    "solution": "[Question 1 — Nombre de serveurs physiques]\n4\n\n[Question 2 — Taux d'utilisation de srv-intranet (%)]\n10\n\n[Question 3 — Taux d'utilisation de srv-messagerie (%)]\n30\n\n[Question 4 — Taux d'utilisation moyen du parc (%)]\n20\n\n[Question 5 — Taux cumulé si tout sur un seul serveur (%)]\n80\n\n[Question 6 — Service le plus occupé]\nmessagerie",
    "takeaway": "1) Le parc compte 4 serveurs physiques (srv-intranet, srv-messagerie, srv-sauvegarde, srv-fichiers), chacun avec un seul service : ce sont des serveurs mono-service.\n2) Taux de srv-intranet : 480/4800 x 100 = 10 %.\n3) Taux de srv-messagerie : 1440/4800 x 100 = 30 %.\n4) Taux moyens : intranet 10 %, messagerie 30 %, sauvegarde 720/4800 = 15 %, fichiers 1200/4800 = 25 %. Moyenne : (10 + 30 + 15 + 25)/4 = 80/4 = 20 %.\n5) Taux cumulé sur un seul serveur : 10 + 30 + 15 + 25 = 80 %. Les quatre services tiendraient ensemble sur une seule machine à 80 % d'utilisation : c'est le principe de la consolidation que la virtualisation permettra.\n6) Le service le plus occupé est la messagerie (1 440 minutes, 30 % de la semaine).\nContrôle : la moyenne (20 %) x 4 serveurs = 80 % = le taux cumulé : les deux résultats se recoupent."
  },
  {
    "id": "vt-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "La facture d'électricité du serveur fainéant",
    "exampleTitle": "Exemple résolu — le serveur de test du week-end",
    "goal": "Convertir une puissance en énergie (kWh), chiffrer la facture et le gaspillage d'un serveur sous-utilisé.",
    "brief": "<p><strong>Énoncé.</strong> Le responsable informatique, sceptique, demande de chiffrer le problème « dans un langage que les responsables comprennent » : la facture. M. Fainéant consomme <strong>800 W</strong> en continu, jour et nuit, même quand il ne fait rien. Le mois étudié compte <strong>720 heures</strong> et le kWh coûte <strong>100 FCFA</strong>. Les nouvelles mesures de l'ingénieur montrent que M. Fainéant est inactif <strong>75 %</strong> du temps.</p><p>Rappel du cours : Énergie (kWh) = Puissance (W) x Temps (h) / 1000.</p><ol><li>Quelle énergie M. Fainéant consomme-t-il sur le mois, en kWh ?</li><li>Quel est le montant de sa facture mensuelle d'électricité, en FCFA ?</li><li>Quelle part de cette énergie est gaspillée par l'inactivité (75 % du temps), en kWh ?</li><li>Quel est le coût annuel total de l'électricité de M. Fainéant, en FCFA (12 mois) ?</li><li>Quelle est l'unité de l'énergie consommée : le watt ou le kilowattheure ? (un seul mot)</li></ol><p>Pour les montants, écrivez le nombre sans espace (par exemple 12000).</p>",
    "starter": "# Exercice — La facture d'électricité du serveur fainéant\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Énergie consommée sur le mois (kWh)]\nA_COMPLETER\n\n[Question 2 — Facture mensuelle (FCFA)]\nA_COMPLETER\n\n[Question 3 — Énergie gaspillée par l'inactivité (kWh)]\nA_COMPLETER\n\n[Question 4 — Coût annuel de l'électricité (FCFA)]\nA_COMPLETER\n\n[Question 5 — Unité de l'énergie (watt ou kilowattheure)]\nA_COMPLETER\n",
    "hints": [
      "L'énergie se calcule avec la puissance et la durée : multipliez les watts par les heures, puis divisez par 1000 pour des kWh.",
      "La facture mensuelle s'obtient en multipliant l'énergie mensuelle par le prix du kWh ; l'énergie gaspillée vaut 75 % de l'énergie totale.",
      "Le coût annuel multiplie la facture mensuelle par 12 ; pour l'unité, distinguez la puissance instantanée (watt) de l'énergie consommée dans la durée (kilowattheure)."
    ],
    "examples": [
      {
        "stdin": "Un serveur de test consomme 1000 W pendant 24 heures ; le kWh coûte 50 FCFA ; il est inactif 50 % du temps.\n\n1) Énergie : 1000 x 24/1000 = 24 kWh.\n2) Facture : 24 x 50 = 1200 FCFA.\n3) Énergie gaspillée (50 %) : 24 x 0,5 = 12 kWh.\n4) Coût sur 30 jours : 1200 x 30 = 36000 FCFA.\n5) L'énergie se mesure en kilowattheures.",
        "expected": "24 kWh — 1200 FCFA — 12 kWh gaspillés — 36000 FCFA par mois — unité : kilowattheure",
        "note": "Le watt mesure la puissance appelée à un instant donné ; seul le kilowattheure mesure l'énergie facturée dans la durée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Énergie consommée sur le mois (kWh)",
        "stdin": "q:1",
        "expected": "576"
      },
      {
        "label": "Question 2 — Facture mensuelle (FCFA)",
        "stdin": "q:2",
        "expected": "57600||57 600||57600 fcfa||57 600 fcfa"
      },
      {
        "label": "Question 3 — Énergie gaspillée par l'inactivité (kWh)",
        "stdin": "q:3",
        "expected": "432"
      },
      {
        "label": "Question 4 — Coût annuel de l'électricité (FCFA)",
        "stdin": "q:4",
        "expected": "691200||691 200||691200 fcfa||691 200 fcfa"
      },
      {
        "label": "Question 5 — Unité de l'énergie",
        "stdin": "q:5",
        "expected": "kilowattheure||le kilowattheure||kwh||le kwh"
      }
    ],
    "solution": "[Question 1 — Énergie consommée sur le mois (kWh)]\n576\n\n[Question 2 — Facture mensuelle (FCFA)]\n57600\n\n[Question 3 — Énergie gaspillée par l'inactivité (kWh)]\n432\n\n[Question 4 — Coût annuel de l'électricité (FCFA)]\n691200\n\n[Question 5 — Unité de l'énergie (watt ou kilowattheure)]\nkilowattheure",
    "takeaway": "1) Énergie mensuelle : 800 x 720/1000 = 576000/1000 = 576 kWh.\n2) Facture mensuelle : 576 x 100 = 57600 FCFA.\n3) Énergie gaspillée par l'inactivité : 576 x 0,75 = 432 kWh. M. Fainéant « mange de l'électricité pour rien » les trois quarts du temps.\n4) Coût annuel : 57600 x 12 = 691200 FCFA.\n5) L'énergie consommée se mesure en kilowattheures (kWh) : le watt (W) mesure la puissance instantanée, pas ce qui est facturé.\nContrôle : énergie utile 576 x 0,25 = 144 kWh, énergie gaspillée 432 kWh ; 144 + 432 = 576 kWh, on retrouve le total."
  },
  {
    "id": "vt-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "L'idée de l'ingénieur et les deux familles d'hyperviseurs",
    "exampleTitle": "Exemple résolu — le portable du technicien",
    "goal": "Nommer l'hyperviseur, citer les trois ressources partagées et distinguer hyperviseur de type 1 et de type 2.",
    "brief": "<p><strong>Énoncé.</strong> Un jour, un ingénieur IT a une idée : faire croire à M. Fainéant qu'il héberge plusieurs machines, alors qu'en réalité ce sont des <strong>machines virtuelles (VM)</strong> qui partagent ses ressources. Les VM ambitieuses promettent : « On va se partager votre <strong>mémoire</strong>, votre <strong>processeur</strong> et même votre <strong>disque dur</strong>. Et on ne prendra chacun que ce dont on a besoin. » Pour tenir la promesse, l'ingénieur installe la couche logicielle qui crée et fait tourner les VM : l'<strong>hyperviseur</strong>. Il explique au responsable informatique qu'il existe deux familles : les hyperviseurs de <strong>type 1</strong> (dits « bare-metal » : ESXi, Proxmox VE, KVM), installés directement sur le matériel sans système d'exploitation hôte, et les hyperviseurs de <strong>type 2</strong> (dits « hébergés » : VirtualBox, VMware Workstation), installés au-dessus d'un système d'exploitation hôte.</p><ol><li>Comment s'appelle la couche logicielle qui crée et fait tourner les machines virtuelles sur le serveur physique ? (un mot)</li><li>Quelle est la première ressource partagée citée par les VM dans leur promesse ?</li><li>Quelle est la deuxième ressource partagée de la promesse ?</li><li>Quelle est la troisième ressource partagée (« et même votre... ») ?</li><li>Un hyperviseur de type 1 s'installe-t-il directement sur le matériel, sans système d'exploitation hôte ? (oui ou non)</li><li>VirtualBox s'installe sur un PC déjà doté de Windows : de quel type d'hyperviseur s'agit-il ? (répondez par le chiffre seul : 1 ou 2)</li></ol>",
    "starter": "# Exercice — L'idée de l'ingénieur et les deux familles d'hyperviseurs\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — La couche logicielle qui crée les VM]\nA_COMPLETER\n\n[Question 2 — Première ressource partagée]\nA_COMPLETER\n\n[Question 3 — Deuxième ressource partagée]\nA_COMPLETER\n\n[Question 4 — Troisième ressource partagée]\nA_COMPLETER\n\n[Question 5 — Le type 1 s'installe-t-il directement sur le matériel ?]\nA_COMPLETER\n\n[Question 6 — Type de VirtualBox (1 ou 2)]\nA_COMPLETER\n",
    "hints": [
      "Dans l'histoire, la couche qui sépare le matériel des VM porte un nom précis : c'est elle qui « fait croire » au serveur qu'il héberge plusieurs machines.",
      "La promesse des VM cite les ressources dans un ordre exact : relisez la citation de l'énoncé, entre la mémoire et le disque dur.",
      "Le type 1 (bare-metal : ESXi, Proxmox VE, KVM) se pose sur le matériel nu ; le type 2 (hébergé : VirtualBox, VMware Workstation) a besoin d'un système d'exploitation hôte."
    ],
    "examples": [
      {
        "stdin": "Un technicien veut s'exercer chez lui : sur son portable Windows, il installe VirtualBox et y crée deux VM. Au bureau, le serveur ESXi, lui, tourne seul sur sa machine, sans Windows ni Linux dessous.\n\n1) La couche qui crée les VM s'appelle l'hyperviseur.\n2) VirtualBox est installé au-dessus de Windows : hyperviseur de type 2.\n3) ESXi tourne directement sur le matériel : hyperviseur de type 1.\n4) Les VM de son labo partagent la mémoire, le processeur et le disque du portable.",
        "expected": "hyperviseur — VirtualBox : type 2 — ESXi : type 1 — partage : mémoire, processeur, disque",
        "note": "Type 1 = bare-metal, directement sur le matériel ; type 2 = hébergé, au-dessus d'un système d'exploitation hôte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La couche logicielle qui crée les VM",
        "stdin": "q:1",
        "expected": "hyperviseur||l'hyperviseur||un hyperviseur"
      },
      {
        "label": "Question 2 — Première ressource partagée",
        "stdin": "q:2",
        "expected": "mémoire||la mémoire"
      },
      {
        "label": "Question 3 — Deuxième ressource partagée",
        "stdin": "q:3",
        "expected": "processeur||le processeur"
      },
      {
        "label": "Question 4 — Troisième ressource partagée",
        "stdin": "q:4",
        "expected": "disque||le disque||disque dur||le disque dur"
      },
      {
        "label": "Question 5 — Le type 1 s'installe-t-il directement sur le matériel ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Type de VirtualBox (1 ou 2)",
        "stdin": "q:6",
        "expected": "2||type 2||type2"
      }
    ],
    "solution": "[Question 1 — La couche logicielle qui crée les VM]\nhyperviseur\n\n[Question 2 — Première ressource partagée]\nmémoire\n\n[Question 3 — Deuxième ressource partagée]\nprocesseur\n\n[Question 4 — Troisième ressource partagée]\ndisque\n\n[Question 5 — Le type 1 s'installe-t-il directement sur le matériel ?]\noui\n\n[Question 6 — Type de VirtualBox (1 ou 2)]\n2",
    "takeaway": "1) La couche logicielle qui crée et fait tourner les machines virtuelles s'appelle l'hyperviseur : c'est lui qui « fait croire » à M. Fainéant qu'il héberge plusieurs machines.\n2) La première ressource partagée citée par les VM est la mémoire (« votre mémoire »).\n3) La deuxième est le processeur (« votre processeur »).\n4) La troisième est le disque (« et même votre disque dur »). Mémoire, processeur, disque : les trois ressources de la promesse, dans cet ordre.\n5) Oui : un hyperviseur de type 1 (bare-metal, comme ESXi, Proxmox VE ou KVM) s'installe directement sur le matériel, sans système d'exploitation hôte.\n6) VirtualBox, qui s'installe au-dessus de Windows, est un hyperviseur de type 2 (hébergé).\nContrôle : le type 1 est fait pour les serveurs (performances optimales), le type 2 pour les postes de travail et les labos."
  },
  {
    "id": "vt-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "« On ne prendra que ce dont on a besoin »",
    "exampleTitle": "Exemple résolu — l'allocation du serveur de recette",
    "goal": "Appliquer la règle d'allocation : contrôler mémoire ET disque avant d'allouer, refuser sans rien consommer.",
    "brief": "<p><strong>Énoncé.</strong> La promesse devient règle d'allocation : chaque VM demande ce dont elle a besoin, et une demande n'est acceptée que si la mémoire <strong>ET</strong> le disque demandés tiennent <strong>tous les deux</strong> dans les capacités restantes du serveur. Une VM refusée ne consomme rien. M. Fainéant offre <strong>32 Go de RAM</strong> et <strong>800 Go de disque</strong>. Les VM ambitieuses se présentent dans l'ordre :</p><table><tr><th>VM</th><th>RAM demandée</th><th>Disque demandé</th></tr><tr><td>vm-web</td><td>8 Go</td><td>200 Go</td></tr><tr><td>vm-base</td><td>16 Go</td><td>300 Go</td></tr><tr><td>vm-test</td><td>12 Go</td><td>200 Go</td></tr><tr><td>vm-fichiers</td><td>8 Go</td><td>150 Go</td></tr></table><ol><li>Après l'allocation de vm-web et de vm-base, combien de RAM reste-t-il, en Go ?</li><li>La VM vm-test (12 Go, 200 Go) est-elle acceptée ? (oui ou non)</li><li>Quelle ressource lui manque-t-il : la mémoire ou le disque ? (un mot)</li><li>La VM vm-fichiers (8 Go, 150 Go) est-elle acceptée ? (oui ou non)</li><li>Après l'allocation de vm-fichiers, combien de disque reste-t-il, en Go ?</li><li>La VM refusée a-t-elle consommé des ressources ? (oui ou non)</li></ol>",
    "starter": "# Exercice — « On ne prendra que ce dont on a besoin »\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — RAM restante après vm-web et vm-base (Go)]\nA_COMPLETER\n\n[Question 2 — vm-test est-elle acceptée ?]\nA_COMPLETER\n\n[Question 3 — Ressource manquante pour vm-test]\nA_COMPLETER\n\n[Question 4 — vm-fichiers est-elle acceptée ?]\nA_COMPLETER\n\n[Question 5 — Disque restant après vm-fichiers (Go)]\nA_COMPLETER\n\n[Question 6 — La VM refusée a-t-elle consommé ?]\nA_COMPLETER\n",
    "hints": [
      "Suivez les allocations dans l'ordre : décomptez la RAM et le disque de chaque VM acceptée, jamais celles des VM refusées.",
      "Pour chaque demande, comparez les DEUX restes en même temps : il suffit qu'une seule ressource manque pour que la VM soit refusée.",
      "Après chaque allocation acceptée, recalculez les deux restes ; comparez-y la demande suivante : une seule ressource qui dépasse suffit à refuser."
    ],
    "examples": [
      {
        "stdin": "Un serveur de recette offre 16 Go de RAM et 400 Go de disque. Demandes dans l'ordre :\nvm-a (4 Go, 100 Go) — vm-b (8 Go, 200 Go) — vm-c (6 Go, 50 Go).\n\n1) vm-a acceptée : restes 12 Go et 300 Go.\n2) vm-b acceptée : restes 4 Go et 100 Go.\n3) vm-c : il reste 4 Go de RAM, elle en demande 6 : refusée pour la mémoire (le disque, lui, tenait).\n4) vm-c ne consomme rien : les restes restent 4 Go et 100 Go.",
        "expected": "après vm-b : 4 Go et 100 Go — vm-c refusée pour la mémoire — restes inchangés",
        "note": "Le contrôle porte sur les deux ressources en même temps : une seule qui manque, et la demande est refusée sans rien consommer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — RAM restante après vm-web et vm-base (Go)",
        "stdin": "q:1",
        "expected": "8"
      },
      {
        "label": "Question 2 — vm-test est-elle acceptée ?",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — Ressource manquante pour vm-test",
        "stdin": "q:3",
        "expected": "mémoire||la mémoire"
      },
      {
        "label": "Question 4 — vm-fichiers est-elle acceptée ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Disque restant après vm-fichiers (Go)",
        "stdin": "q:5",
        "expected": "150"
      },
      {
        "label": "Question 6 — La VM refusée a-t-elle consommé ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — RAM restante après vm-web et vm-base (Go)]\n8\n\n[Question 2 — vm-test est-elle acceptée ?]\nnon\n\n[Question 3 — Ressource manquante pour vm-test]\nmémoire\n\n[Question 4 — vm-fichiers est-elle acceptée ?]\noui\n\n[Question 5 — Disque restant après vm-fichiers (Go)]\n150\n\n[Question 6 — La VM refusée a-t-elle consommé ?]\nnon",
    "takeaway": "Déroulé des allocations :\n- vm-web (8 Go, 200 Go) : 8 <= 32 et 200 <= 800 : acceptée. Restes : 32 - 8 = 24 Go de RAM, 800 - 200 = 600 Go de disque.\n- vm-base (16 Go, 300 Go) : 16 <= 24 et 300 <= 600 : acceptée. Restes : 24 - 16 = 8 Go de RAM, 600 - 300 = 300 Go de disque.\n1) Il reste 8 Go de RAM après vm-web et vm-base.\n2) vm-test (12 Go, 200 Go) : 12 > 8 en RAM : refusée, même si le disque (200 <= 300) tenait.\n3) C'est la mémoire qui manque.\n4) vm-fichiers (8 Go, 150 Go) : 8 <= 8 en RAM (égalité : la demande tient) et 150 <= 300 en disque : acceptée.\n5) Disque restant : 300 - 150 = 150 Go.\n6) Non : vm-test, refusée, n'a rien consommé — le refus ne touche jamais aux restes.\nContrôle final : RAM allouée 8 + 16 + 8 = 32 Go, reste 0 ; disque alloué 200 + 300 + 150 = 650 Go, reste 150 ; vm-test n'apparaît dans aucun total."
  },
  {
    "id": "vt-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La conversation et le premier partage",
    "exampleTitle": "Exemple résolu — l'accord sur le serveur de secours",
    "goal": "Rejouer la conversation de l'histoire dans l'ordre et dimensionner le premier partage de M. Fainéant (RAM et vCPU).",
    "brief": "<p><strong>Énoncé.</strong> L'histoire se joue en quatre temps : l'<strong>ingénieur</strong> propose l'idée de la virtualisation ; M. Fainéant se réveille en sursaut et se met en <strong>colère</strong> (« Faire le travail de plusieurs serveurs ? C'est de la folie ! ») ; les <strong>machines virtuelles</strong> répondent en proposant le partage des ressources ; le serveur <strong>accepte</strong> enfin. Pour sceller l'accord, les trois premières VM ambitieuses s'installent sur M. Fainéant, qui dispose de <strong>16 Go de RAM</strong>, de <strong>8 cœurs</strong> de processeur et de <strong>500 Go</strong> de disque. Chaque VM demande <strong>4 Go de RAM</strong>, <strong>2 vCPU</strong> et <strong>100 Go</strong> de disque.</p><ol><li>Qui a l'idée de la virtualisation dans l'histoire ? (répondez par le métier du personnage, un mot)</li><li>Quelle est la réaction immédiate de M. Fainéant quand il entend l'idée ? (un mot)</li><li>Qui propose de partager la mémoire, le processeur et le disque ? (réponse courte)</li><li>Quelle quantité totale de RAM les trois VM demandent-elles, en Go ?</li><li>Combien de RAM reste-t-il à M. Fainéant après les trois VM, en Go ?</li><li>Combien de cœurs restent disponibles, si chaque VM reçoit 2 vCPU ?</li></ol>",
    "starter": "# Exercice — La conversation et le premier partage\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Qui a l'idée de la virtualisation]\nA_COMPLETER\n\n[Question 2 — Réaction immédiate du serveur]\nA_COMPLETER\n\n[Question 3 — Qui propose le partage]\nA_COMPLETER\n\n[Question 4 — RAM totale demandée par les trois VM (Go)]\nA_COMPLETER\n\n[Question 5 — RAM restante après les trois VM (Go)]\nA_COMPLETER\n\n[Question 6 — Cœurs restants après les trois VM]\nA_COMPLETER\n",
    "hints": [
      "La conversation suit un ordre exact : celui qui propose l'idée n'est pas celui qui propose le partage, et le serveur passe par la colère avant l'acceptation.",
      "Pour la RAM : multipliez la demande d'une VM par le nombre de VM, puis soustrayez ce total de la capacité de M. Fainéant.",
      "Même raisonnement pour les cœurs : chaque VM consomme des vCPU pris sur les cœurs physiques ; ce qui n'est pas pris reste disponible."
    ],
    "examples": [
      {
        "stdin": "Même scène sur un serveur de secours plus petit : 8 Go de RAM, 4 cœurs.\nDeux VM s'y installent, chacune avec 3 Go de RAM et 1 vCPU.\n\n1) L'ingénieur propose l'idée, le serveur se met en colère, les VM proposent le partage, le serveur accepte.\n2) RAM totale demandée : 2 x 3 = 6 Go.\n3) RAM restante : 8 - 6 = 2 Go.\n4) vCPU utilisés : 2 x 1 = 2 ; cœurs restants : 4 - 2 = 2.",
        "expected": "ordre : idée, colère, partage, acceptation — RAM restante : 2 Go — cœurs restants : 2",
        "note": "La conversation a un ordre immuable (idée, colère, partage, acceptation) ; le partage se chiffre toujours en demandant moins que la capacité."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Qui a l'idée de la virtualisation",
        "stdin": "q:1",
        "expected": "ingénieur||l'ingénieur||un ingénieur||ingenieur"
      },
      {
        "label": "Question 2 — Réaction immédiate du serveur",
        "stdin": "q:2",
        "expected": "colère||la colère||colere||la colere"
      },
      {
        "label": "Question 3 — Qui propose le partage",
        "stdin": "q:3",
        "expected": "les machines virtuelles||machines virtuelles||les vm||les VM||vm||les machines virtuelles ambitieuses||les vm ambitieuses"
      },
      {
        "label": "Question 4 — RAM totale demandée par les trois VM (Go)",
        "stdin": "q:4",
        "expected": "12"
      },
      {
        "label": "Question 5 — RAM restante après les trois VM (Go)",
        "stdin": "q:5",
        "expected": "4"
      },
      {
        "label": "Question 6 — Cœurs restants après les trois VM",
        "stdin": "q:6",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — Qui a l'idée de la virtualisation]\ningénieur\n\n[Question 2 — Réaction immédiate du serveur]\ncolère\n\n[Question 3 — Qui propose le partage]\nles machines virtuelles\n\n[Question 4 — RAM totale demandée par les trois VM (Go)]\n12\n\n[Question 5 — RAM restante après les trois VM (Go)]\n4\n\n[Question 6 — Cœurs restants après les trois VM]\n2",
    "takeaway": "1) C'est l'ingénieur IT qui a l'idée de la virtualisation : « et si on utilisait la virtualisation ? ».\n2) La réaction immédiate de M. Fainéant est la colère : il se réveille en sursaut et crie « C'est de la folie ! ».\n3) Ce sont les machines virtuelles qui proposent le partage : « On va se partager votre mémoire, votre processeur et même votre disque dur. »\n4) RAM totale demandée : 3 VM x 4 Go = 12 Go.\n5) RAM restante : 16 - 12 = 4 Go. La promesse est tenue : les VM ne prennent que ce dont elles ont besoin.\n6) vCPU utilisés : 3 x 2 = 6 ; cœurs restants : 8 - 6 = 2.\nContrôle : disque consommé 3 x 100 = 300 Go sur 500, il en reste 200 : chaque ressource reste sous la capacité, l'accord tient."
  },
  {
    "id": "vt-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Quatre services, quatre rôles",
    "exampleTitle": "Exemple résolu — le parc de l'école",
    "goal": "Associer chaque service virtualisé de l'histoire à son rôle : données, publication, protection, recette.",
    "brief": "<p><strong>Énoncé.</strong> À la fin de l'histoire, M. Fainéant « hébergeait maintenant une base de données, un site web, un pare-feu virtuel et même un serveur de test. Et pour une fois, il ne s'ennuyait plus ! » Chaque service a un rôle précis : la base de données porte les <strong>données</strong> de l'entreprise ; le site web assure la <strong>publication</strong> vers les utilisateurs ; le pare-feu virtuel assure la <strong>protection</strong> du parc ; le serveur de test sert de <strong>recette</strong> : essayer sans casser la production. Et pour créer ces VM rapidement, l'ingénieur ne réinstalle pas tout à chaque fois : il part d'un modèle de VM préconfiguré, appelé <strong>image</strong>.</p><ol><li>Combien de services M. Fainéant héberge-t-il désormais ?</li><li>Quel service porte les données de l'entreprise ?</li><li>Quel service assure la publication vers les utilisateurs ?</li><li>Quel service assure la protection du parc ?</li><li>Quel service sert de recette, pour essayer sans casser la production ?</li><li>Comment s'appelle le modèle de VM préconfiguré qui sert à créer une nouvelle VM rapidement ? (un mot)</li></ol>",
    "starter": "# Exercice — Quatre services, quatre rôles\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de services hébergés]\nA_COMPLETER\n\n[Question 2 — Le service des données]\nA_COMPLETER\n\n[Question 3 — Le service de la publication]\nA_COMPLETER\n\n[Question 4 — Le service de la protection]\nA_COMPLETER\n\n[Question 5 — Le service de la recette]\nA_COMPLETER\n\n[Question 6 — Le modèle de VM préconfiguré]\nA_COMPLETER\n",
    "hints": [
      "L'inventaire de fin d'histoire cite les quatre services dans un ordre précis : base, site, pare-feu, test.",
      "Associez chaque service à sa catégorie : données (base), publication (site), protection (pare-feu), recette (test).",
      "Pour la dernière question, pensez à ce que l'ingénieur duplique au lieu de réinstaller : un modèle tout prêt, que l'on nomme comme une copie exacte d'un système."
    ],
    "examples": [
      {
        "stdin": "Une école virtualise quatre services sur son serveur : un serveur de fichiers, un site de l'école, un pare-feu et une VM de travaux pratiques.\n\n1) Le serveur de fichiers porte les données.\n2) Le site de l'école assure la publication.\n3) Le pare-feu assure la protection.\n4) La VM de travaux pratiques sert de recette : on y essaie sans casser la production.\n5) Pour recréer une VM de TP, le technicien clone une image déjà configurée.",
        "expected": "fichiers : données — site : publication — pare-feu : protection — TP : recette — modèle : image",
        "note": "Quatre rôles, quatre services : données, publication, protection, recette — l'ordre de l'histoire est aussi celui des rôles."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de services hébergés",
        "stdin": "q:1",
        "expected": "4"
      },
      {
        "label": "Question 2 — Le service des données",
        "stdin": "q:2",
        "expected": "base de données||la base de données||base||la base"
      },
      {
        "label": "Question 3 — Le service de la publication",
        "stdin": "q:3",
        "expected": "site web||le site web||site||le site"
      },
      {
        "label": "Question 4 — Le service de la protection",
        "stdin": "q:4",
        "expected": "pare-feu||le pare-feu||parefeu||le parefeu||pare-feu virtuel||le pare-feu virtuel"
      },
      {
        "label": "Question 5 — Le service de la recette",
        "stdin": "q:5",
        "expected": "serveur de test||le serveur de test||test||le test"
      },
      {
        "label": "Question 6 — Le modèle de VM préconfiguré",
        "stdin": "q:6",
        "expected": "image||une image"
      }
    ],
    "solution": "[Question 1 — Nombre de services hébergés]\n4\n\n[Question 2 — Le service des données]\nbase de données\n\n[Question 3 — Le service de la publication]\nsite web\n\n[Question 4 — Le service de la protection]\npare-feu\n\n[Question 5 — Le service de la recette]\nserveur de test\n\n[Question 6 — Le modèle de VM préconfiguré]\nimage",
    "takeaway": "1) M. Fainéant héberge désormais 4 services : une base de données, un site web, un pare-feu virtuel et un serveur de test.\n2) Les données de l'entreprise sont portées par la base de données.\n3) La publication vers les utilisateurs est assurée par le site web.\n4) La protection du parc est assurée par le pare-feu virtuel.\n5) La recette — essayer sans casser la production — est le rôle du serveur de test : avant la virtualisation, il fallait une machine physique dédiée pour tester ; maintenant une VM s'allume, essuie les plâtres, s'éteint.\n6) Le modèle de VM préconfiguré s'appelle une image : on la duplique pour créer une VM prête à l'emploi sans tout réinstaller.\nContrôle : données, publication, protection, recette — chaque rôle est tenu par un seul service, et l'ordre de l'histoire (base, site, pare-feu, test) est respecté."
  },
  {
    "id": "vt-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'inventaire du parc et le snapshot du serveur de test",
    "exampleTitle": "Exemple résolu — l'inventaire du parc de démonstration",
    "goal": "Dresser un inventaire de VM par service dans l'ordre d'apparition et connaître le rôle d'un snapshot.",
    "brief": "<p><strong>Énoncé.</strong> Un mois après le réveil de M. Fainéant, l'ingénieur dresse l'inventaire des machines virtuelles, <strong>dans leur ordre de première apparition</strong> (l'ordre dans lequel le parc a grandi, pas l'ordre alphabétique) :</p><table><tr><th>Ordre</th><th>VM</th><th>Service</th></tr><tr><td>1</td><td>vm-01</td><td>base</td></tr><tr><td>2</td><td>vm-02</td><td>site</td></tr><tr><td>3</td><td>vm-03</td><td>base</td></tr><tr><td>4</td><td>vm-04</td><td>test</td></tr><tr><td>5</td><td>vm-05</td><td>site</td></tr><tr><td>6</td><td>vm-06</td><td>pare-feu</td></tr><tr><td>7</td><td>vm-07</td><td>site</td></tr><tr><td>8</td><td>vm-08</td><td>test</td></tr></table><p>Avant de tester une mise à jour risquée sur vm-04, l'ingénieur crée un <strong>snapshot</strong> (instantané) de la VM : si le test tourne mal, il pourra ramener la machine à l'état du moment de la copie. Mais il garde en tête la règle du cours : un snapshot ne remplace pas une sauvegarde indépendante.</p><ol><li>Combien de machines virtuelles compte le parc ?</li><li>Combien de services distincts tournent sur M. Fainéant ?</li><li>Combien de VM servent le service « site » ?</li><li>Quel service est apparu en premier dans l'inventaire ?</li><li>Comment appelle-t-on l'instantané créé avant le test de mise à jour ? (un mot, en anglais)</li><li>Un snapshot peut-il remplacer une sauvegarde indépendante ? (oui ou non)</li></ol>",
    "starter": "# Exercice — L'inventaire du parc et le snapshot du serveur de test\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre total de VM]\nA_COMPLETER\n\n[Question 2 — Nombre de services distincts]\nA_COMPLETER\n\n[Question 3 — VM du service site]\nA_COMPLETER\n\n[Question 4 — Premier service apparu dans l'inventaire]\nA_COMPLETER\n\n[Question 5 — Nom de l'instantané (un mot)]\nA_COMPLETER\n\n[Question 6 — Un snapshot remplace-t-il une sauvegarde ?]\nA_COMPLETER\n",
    "hints": [
      "Lisez le tableau ligne par ligne : chaque ligne est une VM avec son service ; l'ordre du tableau est l'ordre d'apparition.",
      "Comptez les VM par service (base, site, pare-feu, test) et listez les services rencontrés pour la première fois.",
      "L'instantané porte un nom anglais bien connu des administrateurs ; souvenez-vous aussi qu'il fige un état mais ne protège pas d'une panne de disque."
    ],
    "examples": [
      {
        "stdin": "Inventaire d'un parc de démonstration, dans l'ordre d'apparition :\nvm-a (site) — vm-b (base) — vm-c (site).\n\n1) Total : 3 VM.\n2) Services distincts : site et base, soit 2.\n3) VM du service site : vm-a et vm-c, soit 2.\n4) Premier service apparu : le site.\n5) Avant une manipulation risquée sur vm-b, le technicien crée un snapshot — qui ne remplace pas une sauvegarde.",
        "expected": "3 VM — 2 services distincts — site : 2 VM — premier apparu : site — snapshot : pas une sauvegarde",
        "note": "L'inventaire compte les VM par service dans l'ordre de première apparition : jamais par ordre alphabétique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre total de VM",
        "stdin": "q:1",
        "expected": "8"
      },
      {
        "label": "Question 2 — Nombre de services distincts",
        "stdin": "q:2",
        "expected": "4"
      },
      {
        "label": "Question 3 — VM du service site",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Premier service apparu dans l'inventaire",
        "stdin": "q:4",
        "expected": "base||la base||base de données||la base de données"
      },
      {
        "label": "Question 5 — Nom de l'instantané",
        "stdin": "q:5",
        "expected": "snapshot||un snapshot"
      },
      {
        "label": "Question 6 — Un snapshot remplace-t-il une sauvegarde ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre total de VM]\n8\n\n[Question 2 — Nombre de services distincts]\n4\n\n[Question 3 — VM du service site]\n3\n\n[Question 4 — Premier service apparu dans l'inventaire]\nbase\n\n[Question 5 — Nom de l'instantané (un mot)]\nsnapshot\n\n[Question 6 — Un snapshot remplace-t-il une sauvegarde ?]\nnon",
    "takeaway": "1) Le parc compte 8 VM : de vm-01 à vm-08.\n2) Les services distincts sont la base, le site, le pare-feu et le test : 4 services.\n3) Le service « site » est servi par vm-02, vm-05 et vm-07 : 3 VM.\n4) Le premier service apparu dans l'inventaire est la base (vm-01) : l'ordre d'apparition est celui du tableau, pas l'ordre alphabétique.\n5) L'instantané créé avant le test s'appelle un snapshot : il fige l'état de la VM au moment de la copie et permet d'y revenir si la mise à jour tourne mal.\n6) Non : un snapshot ne remplace pas une sauvegarde indépendante — il vit avec le disque de la VM et ne protège pas d'une panne matérielle.\nContrôle de l'inventaire : base 2 VM (vm-01, vm-03), site 3 VM (vm-02, vm-05, vm-07), pare-feu 1 VM (vm-06), test 2 VM (vm-04, vm-08) : 2 + 3 + 1 + 2 = 8, on retrouve le total."
  },
  {
    "id": "vt-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La charge de chaque service : le seuil des 70 %",
    "exampleTitle": "Exemple résolu — le relevé du parc satellite",
    "goal": "Cumuler la charge par service, appliquer le seuil « à surveiller » de 70 % et la règle du maximum strict.",
    "brief": "<p><strong>Énoncé.</strong> « On ne prendra que ce dont on a besoin » suppose de <strong>mesurer</strong> ce que chacun prend. Chaque VM déclare son pourcentage de processeur ; la <strong>charge d'un service est la somme des charges de ses VM</strong>. Au-delà de <strong>70 % cumulés</strong>, un service entre en zone « à surveiller ». Règle du <strong>maximum strict</strong> : le service le plus chargé ne change que si un autre le dépasse strictement ; à égalité, le premier arrivé dans l'inventaire garde la couronne. Relevé du jour, dans l'ordre d'apparition de l'inventaire :</p><table><tr><th>Service</th><th>VM</th><th>Charge CPU de la VM</th></tr><tr><td>base</td><td>vm-01</td><td>40 %</td></tr><tr><td>site</td><td>vm-02</td><td>20 %</td></tr><tr><td>base</td><td>vm-03</td><td>30 %</td></tr><tr><td>test</td><td>vm-04</td><td>10 %</td></tr><tr><td>site</td><td>vm-05</td><td>15 %</td></tr><tr><td>pare-feu</td><td>vm-06</td><td>50 %</td></tr><tr><td>site</td><td>vm-07</td><td>15 %</td></tr><tr><td>test</td><td>vm-08</td><td>20 %</td></tr></table><ol><li>Quelle est la charge cumulée du service base, en pourcentage ?</li><li>Quelle est la charge cumulée du service site, en pourcentage ?</li><li>Le service base, à 70 % cumulés exactement, est-il strictement au-delà du seuil « à surveiller » de 70 % ? (oui ou non)</li><li>Quel est le service le plus chargé du parc ?</li><li>Quelle est la charge totale du parc (somme des charges de tous les services), en pourcentage ?</li><li>À égalité de charge entre deux services, qui garde le titre du plus chargé : le premier arrivé ou le dernier arrivé ?</li></ol>",
    "starter": "# Exercice — La charge de chaque service : le seuil des 70 %\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Charge cumulée du service base (%)]\nA_COMPLETER\n\n[Question 2 — Charge cumulée du service site (%)]\nA_COMPLETER\n\n[Question 3 — base à 70 % : strictement au-delà du seuil ?]\nA_COMPLETER\n\n[Question 4 — Service le plus chargé]\nA_COMPLETER\n\n[Question 5 — Charge totale du parc (%)]\nA_COMPLETER\n\n[Question 6 — À égalité, qui garde la couronne ?]\nA_COMPLETER\n",
    "hints": [
      "Regroupez le tableau par service : chaque service additionne les charges de toutes ses VM, quel que soit leur rang dans le tableau.",
      "La zone « à surveiller » commence STRICTEMENT au-delà de 70 % : un service qui atteint exactement 70 % ne la franchit pas.",
      "Pour le maximum strict, comparez les charges cumulées : le champion ne change que si un concurrent le dépasse strictement ; à égalité, l'ordre du tableau tranche."
    ],
    "examples": [
      {
        "stdin": "Relevé d'un parc satellite :\nservice a : 25 % + 25 % — service b : 60 % — service c : 5 %.\n\n1) Charge de a : 25 + 25 = 50 %.\n2) Charge de b : 60 %.\n3) Aucun service ne dépasse 70 % : personne en zone « à surveiller ».\n4) Le plus chargé : b (60 %), strictement supérieur à 50 %.\n5) Charge totale : 50 + 60 + 5 = 115 %.\n6) Si un jour a et b atteignaient le même total, le premier arrivé (a) garderait la couronne.",
        "expected": "a : 50 % — b : 60 % — personne à surveiller — plus chargé : b — total : 115 % — à égalité : le premier arrivé",
        "note": "La charge d'un service est une somme ; le seuil des 70 % et le maximum se lisent en strictement supérieur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Charge cumulée du service base (%)",
        "stdin": "q:1",
        "expected": "70"
      },
      {
        "label": "Question 2 — Charge cumulée du service site (%)",
        "stdin": "q:2",
        "expected": "50"
      },
      {
        "label": "Question 3 — base à 70 % : strictement au-delà du seuil ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Service le plus chargé",
        "stdin": "q:4",
        "expected": "base||la base||le service base||base de données||la base de données"
      },
      {
        "label": "Question 5 — Charge totale du parc (%)",
        "stdin": "q:5",
        "expected": "200"
      },
      {
        "label": "Question 6 — À égalité, qui garde la couronne ?",
        "stdin": "q:6",
        "expected": "le premier arrivé||premier arrivé||le premier||premier"
      }
    ],
    "solution": "[Question 1 — Charge cumulée du service base (%)]\n70\n\n[Question 2 — Charge cumulée du service site (%)]\n50\n\n[Question 3 — base à 70 % : strictement au-delà du seuil ?]\nnon\n\n[Question 4 — Service le plus chargé]\nbase\n\n[Question 5 — Charge totale du parc (%)]\n200\n\n[Question 6 — À égalité, qui garde la couronne ?]\nle premier arrivé",
    "takeaway": "Charges cumulées par service :\n- base : vm-01 (40 %) + vm-03 (30 %) = 70 % ;\n- site : vm-02 (20 %) + vm-05 (15 %) + vm-07 (15 %) = 50 % ;\n- pare-feu : vm-06 (50 %) ;\n- test : vm-04 (10 %) + vm-08 (20 %) = 30 %.\n1) Le service base cumule 70 %.\n2) Le service site cumule 50 %.\n3) Non : la zone « à surveiller » commence strictement au-delà de 70 % ; à 70 % exactement, le service base reste sous le seuil — la marge s'amincit mais l'alerte n'est pas déclenchée.\n4) Le service le plus chargé est la base : 70 %, strictement supérieur aux 50 % du site et du pare-feu et aux 30 % du test.\n5) Charge totale du parc : 70 + 50 + 50 + 30 = 200 %.\n6) À égalité, le premier arrivé garde la couronne : le maximum ne se met à jour qu'en strictement supérieur.\nContrôle : 70 + 50 + 50 + 30 = 200 %, et la somme des VM donne aussi 40+20+30+10+15+50+15+20 = 200 % : les deux chemins se recoupent."
  },
  {
    "id": "vt-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le réveil du parc : taux avant, taux après",
    "exampleTitle": "Exemple résolu — la salle de formation",
    "goal": "Lire un tableau de taux avant/après, calculer les moyennes et compter les serveurs réveillés.",
    "brief": "<p><strong>Énoncé.</strong> Six mois après la virtualisation, l'ingénieur présente ses mesures au responsable informatique. La grille du cours classe chaque serveur : <strong>« réveillé »</strong> si son taux d'utilisation passe de <strong>moins de 30 %</strong> à <strong>80 % ou plus</strong> ; « en progrès » si son taux monte sans atteindre cette barre ; « insuffisant » s'il ne bouge pas.</p><table><tr><th>Serveur</th><th>Taux avant</th><th>Taux après</th></tr><tr><td>fainéant</td><td>20 %</td><td>85 %</td></tr><tr><td>intranet</td><td>25 %</td><td>40 %</td></tr><tr><td>messagerie</td><td>15 %</td><td>60 %</td></tr><tr><td>sauvegarde</td><td>20 %</td><td>55 %</td></tr></table><ol><li>Quel est le taux d'utilisation de M. Fainéant après la virtualisation, en pourcentage ?</li><li>Quelle est la moyenne des taux avant la virtualisation, en pourcentage ?</li><li>Quelle est la moyenne des taux après la virtualisation, en pourcentage ?</li><li>De combien de points la moyenne du parc a-t-elle monté ?</li><li>Combien de serveurs sont « réveillés » au sens de la grille ?</li><li>Le serveur intranet, passé de 25 % à 40 %, est-il réveillé au sens de la grille ? (oui ou non)</li></ol>",
    "starter": "# Exercice — Le réveil du parc : taux avant, taux après\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Taux après de M. Fainéant (%)]\nA_COMPLETER\n\n[Question 2 — Moyenne des taux avant (%)]\nA_COMPLETER\n\n[Question 3 — Moyenne des taux après (%)]\nA_COMPLETER\n\n[Question 4 — Hausse de la moyenne (points)]\nA_COMPLETER\n\n[Question 5 — Nombre de serveurs réveillés]\nA_COMPLETER\n\n[Question 6 — Le serveur intranet est-il réveillé ?]\nA_COMPLETER\n",
    "hints": [
      "Les moyennes se calculent colonne par colonne : somme des taux avant divisée par 4, puis somme des taux après divisée par 4.",
      "La hausse de la moyenne est la différence entre les deux moyennes ; le matériel n'a pas changé, seul son usage a changé.",
      "Pour la grille du réveil, vérifiez les DEUX conditions : un taux avant strictement sous 30 % ET un taux après au moins égal à 80 %."
    ],
    "examples": [
      {
        "stdin": "Une salle de formation virtualise 2 serveurs :\nx : 10 % avant, 85 % après — y : 45 % avant, 70 % après.\n\n1) Moyenne avant : (10 + 45)/2 = 27,5 %.\n2) Moyenne après : (85 + 70)/2 = 77,5 %.\n3) Hausse : 77,5 - 27,5 = 50 points.\n4) x : avant 10 < 30 et après 85 >= 80 : réveillé.\n5) y : avant 45 >= 30 : pas réveillé (en progrès seulement).",
        "expected": "moyennes : 27,5 % puis 77,5 % — hausse : 50 points — réveillés : 1 (x) — y : en progrès",
        "note": "Le réveil exige les deux conditions : avant sous 30 % ET après à 80 % ou plus — monter ne suffit pas."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taux après de M. Fainéant (%)",
        "stdin": "q:1",
        "expected": "85"
      },
      {
        "label": "Question 2 — Moyenne des taux avant (%)",
        "stdin": "q:2",
        "expected": "20"
      },
      {
        "label": "Question 3 — Moyenne des taux après (%)",
        "stdin": "q:3",
        "expected": "60"
      },
      {
        "label": "Question 4 — Hausse de la moyenne (points)",
        "stdin": "q:4",
        "expected": "40"
      },
      {
        "label": "Question 5 — Nombre de serveurs réveillés",
        "stdin": "q:5",
        "expected": "1"
      },
      {
        "label": "Question 6 — Le serveur intranet est-il réveillé ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Taux après de M. Fainéant (%)]\n85\n\n[Question 2 — Moyenne des taux avant (%)]\n20\n\n[Question 3 — Moyenne des taux après (%)]\n60\n\n[Question 4 — Hausse de la moyenne (points)]\n40\n\n[Question 5 — Nombre de serveurs réveillés]\n1\n\n[Question 6 — Le serveur intranet est-il réveillé ?]\nnon",
    "takeaway": "1) M. Fainéant est passé à 85 % d'utilisation après la virtualisation.\n2) Moyenne avant : (20 + 25 + 15 + 20)/4 = 80/4 = 20 %.\n3) Moyenne après : (85 + 40 + 60 + 55)/4 = 240/4 = 60 %.\n4) Hausse de la moyenne : 60 - 20 = 40 points. Le matériel n'a pas changé, son usage a changé : c'est l'argument massue du bilan.\n5) Serveurs réveillés (avant < 30 % et après >= 80 %) : seul M. Fainéant (20 % puis 85 %). Intranet s'arrête à 40 %, messagerie à 60 %, sauvegarde à 55 % : ils sont « en progrès », pas réveillés. Réponse : 1.\n6) Non : intranet monte bien de 25 % à 40 %, mais son taux après reste sous 80 % — il est en progrès, pas réveillé.\nContrôle : les trois serveurs en progrès (25, 15 et 20 % avant) étaient tous sous 30 % ; c'est la barre des 80 % après qui leur manque."
  },
  {
    "id": "vt-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le plafond de la division : combien de VM ?",
    "exampleTitle": "Exemple résolu — le dossier du parc satellite",
    "goal": "Appliquer l'arrondi au plafond pour compter les VM d'un parc et interpréter une économie négative.",
    "brief": "<p><strong>Énoncé.</strong> Pour le dossier de consolidation, le responsable veut un ordre de grandeur du parc virtualisé. Le modèle fictif du cours définit le nombre de VM comme le <strong>coût total du parc divisé par le coût d'une VM, arrondi à l'entier supérieur</strong> (le plafond). Règle d'or du cours : 2,5 VM, ça n'existe pas — on arrondit toujours au-dessus. Le parc physique coûte <strong>500 000 FCFA par mois</strong>. Une VM coûte <strong>60 000 FCFA par mois</strong>. Le responsable propose aussi un second scénario avec des VM à <strong>50 000 FCFA</strong>.</p><ol><li>Combien de VM donne la division 500 000 / 60 000, arrondie au plafond ?</li><li>Quel est le coût mensuel total de ces VM, en FCFA ?</li><li>Quelle est l'économie mensuelle du premier scénario (coût du parc moins coût des VM), en FCFA ? Donnez la valeur signée (avec le signe moins si elle est négative).</li><li>Cette économie est-elle positive ? (oui ou non)</li><li>Dans le second scénario (VM à 50 000 FCFA), combien de VM la division donne-t-elle ?</li><li>Dans ce second scénario, quelle est l'économie mensuelle, en FCFA ?</li></ol><p>Pour les montants, écrivez le nombre sans espace (par exemple 12000).</p>",
    "starter": "# Exercice — Le plafond de la division : combien de VM ?\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de VM au plafond (scénario 1)]\nA_COMPLETER\n\n[Question 2 — Coût mensuel des VM (scénario 1, FCFA)]\nA_COMPLETER\n\n[Question 3 — Économie mensuelle signée (scénario 1, FCFA)]\nA_COMPLETER\n\n[Question 4 — L'économie est-elle positive ?]\nA_COMPLETER\n\n[Question 5 — Nombre de VM (scénario 2)]\nA_COMPLETER\n\n[Question 6 — Économie mensuelle (scénario 2, FCFA)]\nA_COMPLETER\n",
    "hints": [
      "Posez d'abord la division du coût du parc par le coût d'une VM ; le résultat n'est pas forcément entier.",
      "Le plafond arrondit à l'entier SUPÉRIEUR, jamais au plus proche : un parc sous-dimensionné ne tiendrait pas ses VM. Multipliez ensuite ce nombre par le coût d'une VM.",
      "L'économie s'obtient par coût du parc moins coût des VM ; elle peut être négative — l'arithmétique tranche sans complaisance, la consolidation a un coût."
    ],
    "examples": [
      {
        "stdin": "Dossier d'un parc satellite : parc physique à 300 000 FCFA, VM à 80 000 FCFA.\n\n1) 300 000/80 000 = 3,75 : au plafond, 4 VM.\n2) Coût des VM : 4 x 80 000 = 320 000 FCFA.\n3) Économie : 300 000 - 320 000 = -20 000 FCFA (négative : la consolidation coûte plus cher).\nAutre cas : parc à 240 000 FCFA, VM à 80 000 : 240/80 = 3 exact, coût 240 000, économie nulle.",
        "expected": "3,75 → 4 VM — 320 000 FCFA — économie : -20 000 — second cas : 3 VM, économie 0",
        "note": "Arrondir 3,75 à 3 au lieu de 4 donnerait un parc sous-dimensionné : le plafond n'est pas un détail."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de VM au plafond (scénario 1)",
        "stdin": "q:1",
        "expected": "9"
      },
      {
        "label": "Question 2 — Coût mensuel des VM (scénario 1, FCFA)",
        "stdin": "q:2",
        "expected": "540000||540 000||540000 fcfa||540 000 fcfa"
      },
      {
        "label": "Question 3 — Économie mensuelle signée (scénario 1, FCFA)",
        "stdin": "q:3",
        "expected": "-40000||-40 000||-40000 fcfa||-40 000 fcfa"
      },
      {
        "label": "Question 4 — L'économie est-elle positive ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Nombre de VM (scénario 2)",
        "stdin": "q:5",
        "expected": "10"
      },
      {
        "label": "Question 6 — Économie mensuelle (scénario 2, FCFA)",
        "stdin": "q:6",
        "expected": "0"
      }
    ],
    "solution": "[Question 1 — Nombre de VM au plafond (scénario 1)]\n9\n\n[Question 2 — Coût mensuel des VM (scénario 1, FCFA)]\n540000\n\n[Question 3 — Économie mensuelle signée (scénario 1, FCFA)]\n-40000\n\n[Question 4 — L'économie est-elle positive ?]\nnon\n\n[Question 5 — Nombre de VM (scénario 2)]\n10\n\n[Question 6 — Économie mensuelle (scénario 2, FCFA)]\n0",
    "takeaway": "1) 500 000/60 000 = 8,33... : une fraction de VM n'existe pas, le plafond donne 9 VM.\n2) Coût mensuel des VM : 9 x 60 000 = 540 000 FCFA.\n3) Économie mensuelle : 500 000 - 540 000 = -40 000 FCFA. L'économie est négative : dans ce modèle fictif, la consolidation coûte plus cher qu'elle ne rapporte.\n4) Non : l'économie est négative — le calcul ne cache rien, la consolidation a un coût.\n5) Second scénario : 500 000/50 000 = 10 exactement : 10 VM (division juste, pas d'arrondi à faire).\n6) Économie : 500 000 - 10 x 50 000 = 500 000 - 500 000 = 0 FCFA : l'économie est nulle.\nContrôle : 8 VM x 60 000 = 480 000 ne suffirait pas à couvrir le coût du parc (il manquerait 20 000 FCFA) : c'est bien 9 le plafond ; et 10 x 50 000 = 500 000 retombe exactement sur le coût du parc."
  },
  {
    "id": "vt-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de consolidation : premier hôte suffisant",
    "exampleTitle": "Exemple résolu — le plan de la salle B",
    "goal": "Placer des VM sur des hôtes au premier hôte suffisant et reporter les capacités restantes.",
    "brief": "<p><strong>Énoncé.</strong> Dernier calcul avant d'agir : placer les VM sur les hôtes. La règle du cours est le <strong>premier hôte suffisant</strong> : les serveurs physiques sont listés dans un ordre (les fainéants d'abord — ce sont eux qu'on veut réveiller), et chaque VM prend le <strong>premier hôte</strong> dont la capacité restante couvre son besoin. Si aucun hôte ne suffit, la VM reste <strong>sans place</strong> et <strong>rien n'est décompté</strong>. Le plan prévoit deux hôtes à réveiller, dans cet ordre : <strong>alpha</strong> (32 Go de RAM) puis <strong>beta</strong> (24 Go). Les VM à placer, dans l'ordre :</p><table><tr><th>VM</th><th>Besoin en RAM</th></tr><tr><td>vm-web</td><td>12 Go</td></tr><tr><td>vm-base</td><td>16 Go</td></tr><tr><td>vm-test</td><td>8 Go</td></tr><tr><td>vm-fichiers</td><td>10 Go</td></tr><tr><td>vm-intranet</td><td>14 Go</td></tr></table><ol><li>Après le placement de vm-web et de vm-base sur alpha, combien de RAM reste-t-il sur alpha, en Go ?</li><li>Sur quel hôte la VM vm-test est-elle placée ?</li><li>Combien de RAM reste-t-il sur beta après le placement de vm-test et de vm-fichiers, en Go ?</li><li>Quelle VM reste sans place ?</li><li>La VM sans place a-t-elle décompté de la capacité d'un hôte ? (oui ou non)</li><li>Quelle est la capacité RAM totale restante du parc à la fin du plan, en Go ?</li></ol>",
    "starter": "# Exercice — Le plan de consolidation : premier hôte suffisant\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — RAM restante sur alpha après vm-web et vm-base (Go)]\nA_COMPLETER\n\n[Question 2 — Hôte de vm-test]\nA_COMPLETER\n\n[Question 3 — RAM restante sur beta après vm-test et vm-fichiers (Go)]\nA_COMPLETER\n\n[Question 4 — VM restée sans place]\nA_COMPLETER\n\n[Question 5 — La VM sans place a-t-elle décompté ?]\nA_COMPLETER\n\n[Question 6 — Capacité RAM totale restante (Go)]\nA_COMPLETER\n",
    "hints": [
      "Suivez l'ordre des VM : pour chacune, essayez alpha d'abord ; si sa capacité restante ne suffit pas, essayez beta.",
      "Une VM sans place ne touche à rien : les capacités restantes ne bougent que pour les VM réellement placées.",
      "En fin de plan, additionnez les capacités restantes de tous les hôtes : c'est le bilan du plan, à comparer au total de départ moins les besoins placés."
    ],
    "examples": [
      {
        "stdin": "Plan de la salle B : deux hôtes h1 (20 Go) puis h2 (10 Go).\nVM dans l'ordre : a (8 Go), b (6 Go), c (5 Go), d (9 Go).\n\n1) a : 8 <= 20 : sur h1, reste 12 Go.\n2) b : 6 <= 12 : sur h1, reste 6 Go.\n3) c : 5 <= 6 : sur h1, reste 1 Go.\n4) d : 9 > 1 sur h1 ; 9 <= 10 sur h2 : sur h2, reste 1 Go.\nBilan : h1 reste 1 Go, h2 reste 1 Go, aucune VM sans place.",
        "expected": "a, b, c sur h1 — d sur h2 — restes : 1 Go et 1 Go — total restant : 2 Go",
        "note": "Le premier hôte suffisant respecte l'ordre du fichier : on ne saute un hôte que si sa capacité restante ne couvre pas le besoin."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — RAM restante sur alpha après vm-web et vm-base (Go)",
        "stdin": "q:1",
        "expected": "4"
      },
      {
        "label": "Question 2 — Hôte de vm-test",
        "stdin": "q:2",
        "expected": "beta||bêta||sur beta||hote beta||l'hote beta"
      },
      {
        "label": "Question 3 — RAM restante sur beta après vm-test et vm-fichiers (Go)",
        "stdin": "q:3",
        "expected": "6"
      },
      {
        "label": "Question 4 — VM restée sans place",
        "stdin": "q:4",
        "expected": "vm-intranet||intranet||l'intranet"
      },
      {
        "label": "Question 5 — La VM sans place a-t-elle décompté ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Capacité RAM totale restante (Go)",
        "stdin": "q:6",
        "expected": "10"
      }
    ],
    "solution": "[Question 1 — RAM restante sur alpha après vm-web et vm-base (Go)]\n4\n\n[Question 2 — Hôte de vm-test]\nbeta\n\n[Question 3 — RAM restante sur beta après vm-test et vm-fichiers (Go)]\n6\n\n[Question 4 — VM restée sans place]\nvm-intranet\n\n[Question 5 — La VM sans place a-t-elle décompté ?]\nnon\n\n[Question 6 — Capacité RAM totale restante (Go)]\n10",
    "takeaway": "Déroulé du placement (alpha : 32 Go, beta : 24 Go) :\n- vm-web (12 Go) : 12 <= 32 : sur alpha. Reste alpha : 32 - 12 = 20 Go.\n- vm-base (16 Go) : 16 <= 20 : sur alpha. Reste alpha : 20 - 16 = 4 Go.\n1) Il reste 4 Go sur alpha.\n- vm-test (8 Go) : 8 > 4 sur alpha : refusée d'alpha ; 8 <= 24 sur beta : placée sur beta. Reste beta : 24 - 8 = 16 Go.\n2) vm-test est placée sur beta.\n- vm-fichiers (10 Go) : 10 > 4 sur alpha ; 10 <= 16 sur beta : placée sur beta. Reste beta : 16 - 10 = 6 Go.\n3) Il reste 6 Go sur beta.\n- vm-intranet (14 Go) : 14 > 4 sur alpha ; 14 > 6 sur beta : sans place.\n4) vm-intranet reste sans place.\n5) Non : une VM sans place ne décompte rien — aucune capacité n'a bougé pour elle.\n6) Capacité totale restante : 4 (alpha) + 6 (beta) = 10 Go.\nContrôle : capacité de départ 32 + 24 = 56 Go ; besoins placés 12 + 16 + 8 + 10 = 46 Go ; 56 - 46 = 10 Go : le bilan se vérifie."
  },
  {
    "id": "vt-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "La question finale de l'histoire : la surcharge",
    "exampleTitle": "Exemple résolu — la soirée des inventaires",
    "goal": "Nommer le concept de mutualisation, le risque de surcharge, les seuils d'alerte 90/90/500 et l'action de secours.",
    "brief": "<p><strong>Énoncé.</strong> Le soir, M. Fainéant pose la question qui l'inquiète : « Que se passerait-il si trop de machines ambitieuses étaient créées sur un seul serveur ? » La réponse du cours tient en un mot : la <strong>surcharge</strong>. La promesse du partage suppose que le total des besoins tient dans la capacité ; si les besoins s'additionnent trop, le processeur sature, la mémoire s'épuise, les temps de réponse s'effondrent pour tout le monde — et quand toutes les VM écrivent en même temps, le disque sature à son tour. Le cours fixe trois seuils d'alerte : <strong>CPU au-delà de 90 %</strong>, <strong>RAM au-delà de 90 %</strong>, <strong>temps de réponse au-delà de 500 ms</strong>. L'action de secours est le privilège de la virtualisation : <strong>déplacer une VM</strong> vers un hôte moins chargé.</p><ol><li>Quel concept la virtualisation illustre-t-elle : la mutualisation ou le chiffrement ?</li><li>Quel est le risque principal si l'on crée trop de VM sur un seul serveur ? (un mot)</li><li>Au-delà de quel pourcentage d'utilisation du processeur le seuil d'alerte est-il franchi ?</li><li>Au-delà de quel temps de réponse, en millisecondes, les utilisateurs commencent-ils à souffrir ?</li><li>Quand toutes les VM lisent et écrivent en même temps, quelle ressource sature en plus du processeur et de la mémoire ? (un mot)</li><li>Quelle action de secours le cours conseille-t-il ? (deux mots : « ... une VM »)</li></ol>",
    "starter": "# Exercice — La question finale de l'histoire : la surcharge\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Le concept illustré par la virtualisation]\nA_COMPLETER\n\n[Question 2 — Le risque principal (un mot)]\nA_COMPLETER\n\n[Question 3 — Seuil d'alerte du processeur (%)]\nA_COMPLETER\n\n[Question 4 — Seuil d'alerte du temps de réponse (ms)]\nA_COMPLETER\n\n[Question 5 — La ressource qui sature en plus (un mot)]\nA_COMPLETER\n\n[Question 6 — L'action de secours (deux mots)]\nA_COMPLETER\n",
    "hints": [
      "Le concept est celui du partage : plusieurs VM sur un même serveur, des ressources communes — un seul mot du cours.",
      "Les trois seuils forment le repère mnémotechnique du cours : deux fois la même valeur en pourcentage, et une valeur en millisecondes.",
      "Quand tout le monde écrit en même temps, c'est l'organe de stockage qui sature ; et le secours tient au privilège de la virtualisation : changer une VM d'hôte."
    ],
    "examples": [
      {
        "stdin": "La soirée des inventaires : un serveur héberge trop de VM.\nRelevé : CPU 95 % — RAM 93 % — temps de réponse 800 ms.\n\n1) CPU 95 > 90 : seuil franchi.\n2) RAM 93 > 90 : seuil franchi.\n3) 800 ms > 500 ms : seuil franchi.\n4) Trois seuils à la fois : cas « multiple », priorité renforcée.\n5) L'action conseillée : déplacer une VM vers un hôte moins chargé.",
        "expected": "CPU : alerte — RAM : alerte — 800 ms : alerte — cas multiple — action : déplacer une VM",
        "note": "Un seul seuil franchi suffit à alerter ; plusieurs à la fois, c'est le cas « multiple » du cours."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le concept illustré par la virtualisation",
        "stdin": "q:1",
        "expected": "mutualisation||la mutualisation"
      },
      {
        "label": "Question 2 — Le risque principal (un mot)",
        "stdin": "q:2",
        "expected": "surcharge||la surcharge"
      },
      {
        "label": "Question 3 — Seuil d'alerte du processeur (%)",
        "stdin": "q:3",
        "expected": "90"
      },
      {
        "label": "Question 4 — Seuil d'alerte du temps de réponse (ms)",
        "stdin": "q:4",
        "expected": "500"
      },
      {
        "label": "Question 5 — La ressource qui sature en plus (un mot)",
        "stdin": "q:5",
        "expected": "disque||le disque||disque dur||le disque dur"
      },
      {
        "label": "Question 6 — L'action de secours (deux mots)",
        "stdin": "q:6",
        "expected": "déplacer une vm||déplacer une machine virtuelle||deplacer une vm||migrer une vm"
      }
    ],
    "solution": "[Question 1 — Le concept illustré par la virtualisation]\nmutualisation\n\n[Question 2 — Le risque principal (un mot)]\nsurcharge\n\n[Question 3 — Seuil d'alerte du processeur (%)]\n90\n\n[Question 4 — Seuil d'alerte du temps de réponse (ms)]\n500\n\n[Question 5 — La ressource qui sature en plus (un mot)]\ndisque\n\n[Question 6 — L'action de secours (deux mots)]\ndéplacer une vm",
    "takeaway": "1) La virtualisation illustre la mutualisation des ressources : plusieurs VM sur un même serveur physique, des ressources partagées.\n2) Le risque principal est la surcharge : mémoire épuisée, processeur saturé, temps de réponse qui s'effondrent pour tout le monde.\n3) Le seuil d'alerte du processeur est franchi au-delà de 90 %.\n4) Le seuil d'alerte du temps de réponse est franchi au-delà de 500 ms : au-delà, les utilisateurs le sentent déjà.\n5) La ressource qui sature en plus est le disque : quand toutes les VM lisent et écrivent en même temps, les entrées-sorties s'engorgent.\n6) L'action de secours conseillée par le cours : déplacer une VM vers un hôte moins chargé — le privilège de la virtualisation (une migration peut réduire la charge, avec une courte pause possible).\nContrôle : les trois seuils 90, 90 et 500 forment le repère « 90/90/500 » du cours ; un seul suffit à alerter."
  },
  {
    "id": "vt-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le seuil de saturation : une VM refusée plutôt qu'un serveur noyé",
    "exampleTitle": "Exemple résolu — l'hôte de secours",
    "goal": "Appliquer le contrôle avant ajout, reconnaître le serveur plein (égalité exacte) et refuser sans consommer.",
    "brief": "<p><strong>Énoncé.</strong> Pour respecter la promesse, le contrôle se fait <strong>AVANT l'ajout</strong> : si la capacité déjà allouée, augmentée de la demande, dépasse la capacité de l'hôte, la VM est <strong>refusée</strong> — et <strong>rien n'est consommé</strong>. Un hôte neuf de <strong>64 Go de RAM</strong> reçoit les demandes dans l'ordre : vm-1 (16 Go), vm-2 (16 Go), vm-3 (16 Go), vm-4 (16 Go), puis vm-5 (8 Go).</p><ol><li>Quelle capacité de RAM est allouée après les quatre premières VM, en Go ?</li><li>Combien de RAM reste-t-il après les quatre premières VM, en Go ?</li><li>Après vm-4, la capacité allouée égale exactement la capacité disponible : le serveur est-il plein ? (oui ou non)</li><li>La VM vm-5 (8 Go) est-elle acceptée ? (oui ou non)</li><li>vm-5 a-t-elle consommé de la capacité ? (oui ou non)</li><li>Dans ce modèle, un serveur plein (capacité allouée égale capacité disponible) est-il forcément en panne ? (oui ou non)</li></ol>",
    "starter": "# Exercice — Le seuil de saturation : une VM refusée plutôt qu'un serveur noyé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Capacité allouée après les quatre VM (Go)]\nA_COMPLETER\n\n[Question 2 — Capacité restante après les quatre VM (Go)]\nA_COMPLETER\n\n[Question 3 — Le serveur est-il plein ?]\nA_COMPLETER\n\n[Question 4 — vm-5 est-elle acceptée ?]\nA_COMPLETER\n\n[Question 5 — vm-5 a-t-elle consommé ?]\nA_COMPLETER\n\n[Question 6 — Un serveur plein est-il forcément en panne ?]\nA_COMPLETER\n",
    "hints": [
      "Additionnez les demandes acceptées au fur et à mesure : chacune doit tenir dans ce qui reste avant d'être allouée.",
      "Le serveur est « plein » quand la capacité allouée atteint EXACTEMENT la capacité disponible : plus aucune réservation ne peut s'ajouter.",
      "Pour les deux dernières questions, rappelez-vous la règle du cours : le refus ne consomme rien, et « plein » parle de réservation — l'utilisation réelle se mesure séparément."
    ],
    "examples": [
      {
        "stdin": "Un hôte de secours de 30 Go reçoit : vm-a (10 Go), vm-b (10 Go), vm-c (10 Go), puis vm-d (5 Go).\n\n1) vm-a acceptée : alloué 10, reste 20.\n2) vm-b acceptée : alloué 20, reste 10.\n3) vm-c acceptée : alloué 30, reste 0 : le serveur est plein (égalité exacte).\n4) vm-d : 30 + 5 > 30 : refusée, et sa demande n'est pas comptée.",
        "expected": "après vm-c : 30 Go alloués, 0 restant, serveur plein — vm-d refusée sans consommation",
        "note": "Le contrôle précède l'ajout : ajouter d'abord puis retirer, c'est promettre puis décevoir — le chemin de la panne."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Capacité allouée après les quatre VM (Go)",
        "stdin": "q:1",
        "expected": "64"
      },
      {
        "label": "Question 2 — Capacité restante après les quatre VM (Go)",
        "stdin": "q:2",
        "expected": "0"
      },
      {
        "label": "Question 3 — Le serveur est-il plein ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — vm-5 est-elle acceptée ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — vm-5 a-t-elle consommé ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Un serveur plein est-il forcément en panne ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Capacité allouée après les quatre VM (Go)]\n64\n\n[Question 2 — Capacité restante après les quatre VM (Go)]\n0\n\n[Question 3 — Le serveur est-il plein ?]\noui\n\n[Question 4 — vm-5 est-elle acceptée ?]\nnon\n\n[Question 5 — vm-5 a-t-elle consommé ?]\nnon\n\n[Question 6 — Un serveur plein est-il forcément en panne ?]\nnon",
    "takeaway": "Déroulé des demandes (hôte de 64 Go) :\n- vm-1 (16 Go) : 16 <= 64 : acceptée. Alloué : 16, reste 48.\n- vm-2 (16 Go) : 16 + 16 = 32 <= 64 : acceptée. Alloué : 32, reste 32.\n- vm-3 (16 Go) : 48 <= 64 : acceptée. Alloué : 48, reste 16.\n- vm-4 (16 Go) : 64 <= 64 : acceptée. Alloué : 64, reste 0.\n1) Après les quatre VM, 64 Go sont alloués.\n2) Il reste 64 - 64 = 0 Go.\n3) Oui : la capacité allouée atteint exactement la capacité disponible, le serveur est plein — plus aucune réservation ne peut s'ajouter.\n4) vm-5 (8 Go) : 64 + 8 = 72 > 64 : refusée. Le contrôle a été fait AVANT l'ajout.\n5) Non : la VM refusée n'a rien consommé, la capacité allouée reste 64 Go.\n6) Non : « plein » signifie entièrement alloué dans le modèle ; cela ne prouve ni une utilisation réelle de 100 %, ni une panne en cours — l'utilisation se mesure séparément.\nContrôle : 4 x 16 = 64 Go alloués, et la somme des refus (8 Go) ne figure dans aucun total."
  },
  {
    "id": "vt-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Surallocation et symptômes : la grille 90/90/500",
    "exampleTitle": "Exemple résolu — la plate-forme du labo",
    "goal": "Calculer un ratio de surallocation (overcommitment) et compter les seuils d'alerte franchis d'un relevé de supervision.",
    "brief": "<p><strong>Énoncé.</strong> Le responsable informatique veut savoir si M. Fainéant peut porter trois VM gourmandes. M. Fainéant dispose de <strong>16 cœurs</strong> de processeur et de <strong>64 Go de RAM</strong>. Les VM demandent :</p><table><tr><th>VM</th><th>vCPU</th><th>RAM</th></tr><tr><td>vm-base</td><td>10 vCPU</td><td>32 Go</td></tr><tr><td>vm-site</td><td>8 vCPU</td><td>24 Go</td></tr><tr><td>vm-test</td><td>6 vCPU</td><td>8 Go</td></tr></table><p>On appelle <strong>ratio de surallocation (overcommitment) CPU</strong> le nombre total de vCPU demandés divisé par le nombre de cœurs physiques. Le même jour, la supervision relève : <strong>CPU 92 %</strong>, <strong>RAM 88 %</strong>, <strong>temps de réponse 620 ms</strong>. Rappel des seuils d'alerte du cours : CPU au-delà de 90 %, RAM au-delà de 90 %, temps de réponse au-delà de 500 ms. Plusieurs seuils franchis à la fois : c'est le cas <strong>« multiple »</strong> de la grille.</p><ol><li>Combien de vCPU les trois VM demandent-elles en tout ?</li><li>Quel est le ratio de surallocation CPU (vCPU demandés divisés par cœurs physiques) ?</li><li>Combien de RAM les trois VM demandent-elles en tout, en Go ?</li><li>Le seuil d'alerte de la RAM est-il franchi (relevé : 88 %) ? (oui ou non)</li><li>Combien de seuils d'alerte sont franchis au total (CPU, RAM, temps de réponse) ?</li><li>Quel cas de la grille correspond à plusieurs seuils franchis à la fois ? (un mot)</li></ol><p>Pour le ratio, écrivez le nombre décimal (par exemple 1,5).</p>",
    "starter": "# Exercice — Surallocation et symptômes : la grille 90/90/500\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Total des vCPU demandés]\nA_COMPLETER\n\n[Question 2 — Ratio de surallocation CPU]\nA_COMPLETER\n\n[Question 3 — Total de RAM demandée (Go)]\nA_COMPLETER\n\n[Question 4 — Le seuil RAM est-il franchi (88 %) ?]\nA_COMPLETER\n\n[Question 5 — Nombre de seuils franchis]\nA_COMPLETER\n\n[Question 6 — Le cas de la grille (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Additionnez d'abord les vCPU demandés, puis les Go de RAM demandés : ce sont les deux totaux du dimensionnement.",
      "Le ratio de surallocation CPU divise le total des vCPU par le nombre de cœurs physiques ; un ratio de 1 signifie « exactement la capacité ».",
      "Pour les seuils, comparez chaque relevé à sa limite : 92 contre 90, 88 contre 90, 620 contre 500 ; franchi signifie strictement au-delà."
    ],
    "examples": [
      {
        "stdin": "La plate-forme du labo : 8 cœurs, 32 Go de RAM.\nTrois VM : 4 + 4 + 4 = 12 vCPU et 8 + 8 + 8 = 24 Go.\n\n1) Ratio de surallocation CPU : 12/8 = 1,5.\n2) Ratio de RAM : 24/32 = 0,75 : pas de surallocation mémoire.\n3) Relevé du jour : CPU 91 % (franchi), RAM 85 % (non), 400 ms (non).\n4) Un seul seuil franchi : ce n'est pas le cas « multiple ».",
        "expected": "ratio CPU : 1,5 — ratio RAM : 0,75 — un seul seuil franchi (CPU) — pas le cas multiple",
        "note": "Surallouer le CPU (demander plus de vCPU que de cœurs) est courant : les VM ne consomment pas tout en même temps ; la RAM, elle, ne doit pas dépasser la capacité physique en production."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Total des vCPU demandés",
        "stdin": "q:1",
        "expected": "24"
      },
      {
        "label": "Question 2 — Ratio de surallocation CPU",
        "stdin": "q:2",
        "expected": "1,5"
      },
      {
        "label": "Question 3 — Total de RAM demandée (Go)",
        "stdin": "q:3",
        "expected": "64"
      },
      {
        "label": "Question 4 — Le seuil RAM est-il franchi (88 %) ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Nombre de seuils franchis",
        "stdin": "q:5",
        "expected": "2"
      },
      {
        "label": "Question 6 — Le cas de la grille (un mot)",
        "stdin": "q:6",
        "expected": "multiple||le cas multiple||cas multiple"
      }
    ],
    "solution": "[Question 1 — Total des vCPU demandés]\n24\n\n[Question 2 — Ratio de surallocation CPU]\n1,5\n\n[Question 3 — Total de RAM demandée (Go)]\n64\n\n[Question 4 — Le seuil RAM est-il franchi (88 %) ?]\nnon\n\n[Question 5 — Nombre de seuils franchis]\n2\n\n[Question 6 — Le cas de la grille (un mot)]\nmultiple",
    "takeaway": "1) Total des vCPU demandés : 10 + 8 + 6 = 24 vCPU.\n2) Ratio de surallocation CPU : 24/16 = 1,5. On promet une fois et demie la capacité : cela ne tient que si les VM n'atteignent pas leur maximum en même temps.\n3) Total de RAM demandée : 32 + 24 + 8 = 64 Go — exactement la capacité physique : pas de surallocation mémoire (ratio de 1).\n4) Non : le relevé RAM est à 88 %, sous le seuil de 90 % — l'alerte n'est pas déclenchée sur la mémoire.\n5) Seuils franchis : CPU 92 % > 90 % (oui) ; RAM 88 % <= 90 % (non) ; temps de réponse 620 ms > 500 ms (oui) : 2 seuils franchis.\n6) Plusieurs seuils franchis à la fois : c'est le cas « multiple » de la grille — une saturation globale est en cours, l'investigation est prioritaire.\nContrôle : les trois VM demandent 64 Go sur 64 disponibles : la moindre VM supplémentaire devra être refusée ou une VM réduite — et l'action du cours reste disponible : déplacer une VM."
  },
  {
    "id": "vt-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le pitch en quatre étapes",
    "exampleTitle": "Exemple résolu — le pitch du stage de fin d'année",
    "goal": "Restituer l'ordre exact du pitch (constat, idée, preuve, verdict) et le sens de chaque étape.",
    "brief": "<p><strong>Énoncé.</strong> Le responsable informatique reste sceptique : « Pourquoi réveillerais-je mes vieux serveurs ? » L'ingénieur prépare son argumentaire : un pitch qui suit exactement l'ordre de l'histoire. <strong>Étape 1, le constat</strong> : le gaspillage mesuré — 80 % d'inactivité, de l'électricité pour rien. <strong>Étape 2, l'idée</strong> : la virtualisation, plusieurs machines sur un seul serveur. <strong>Étape 3, la preuve</strong> : la rentabilisation, avec des taux avant/après et des économies chiffrées. <strong>Étape 4, le verdict</strong> : comparer les ressources allouées aux usages réellement mesurés. Chaque étape sans la précédente sonne creux : le verdict sans preuve est une promesse, la preuve sans constat ne concerne personne, le constat sans idée laisse le responsable sans réponse.</p><ol><li>Par quelle étape ouvre-t-on le pitch ? (un mot)</li><li>Quelle est la deuxième étape du pitch ? (un mot)</li><li>Quelle étape présente les taux avant/après et les économies chiffrées ? (un mot)</li><li>Quelle est la quatrième et dernière étape ? (un mot)</li><li>Le constat du pitch, c'est le gaspillage : « 80 % d'inactivité, de l'électricité pour... » ? (un mot)</li><li>L'ordre du pitch est l'ordre de l'histoire : le verdict peut-il venir avant la preuve ? (oui ou non)</li></ol>",
    "starter": "# Exercice — Le pitch en quatre étapes\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Première étape du pitch]\nA_COMPLETER\n\n[Question 2 — Deuxième étape du pitch]\nA_COMPLETER\n\n[Question 3 — L'étape des taux avant/après]\nA_COMPLETER\n\n[Question 4 — Quatrième et dernière étape]\nA_COMPLETER\n\n[Question 5 — « De l'électricité pour... » (un mot)]\nA_COMPLETER\n\n[Question 6 — Le verdict peut-il venir avant la preuve ?]\nA_COMPLETER\n",
    "hints": [
      "Le pitch suit le récit : d'abord la situation douloureuse chiffrée, puis la réponse technique, puis les chiffres qui prouvent, enfin la décision.",
      "Les taux avant/après et les économies appartiennent au moment où l'on démontre, pas à celui où l'on annonce.",
      "Pour l'ordre des étapes, rappelez-vous qu'aucune étape ne peut sonner creux : une décision sans démonstration n'est qu'une promesse."
    ],
    "examples": [
      {
        "stdin": "Un stagiaire prépare le pitch du stage de fin d'année pour la direction.\n\n1) Il ouvre par le constat : 12 serveurs, facture annuelle de 4 millions, taux moyen de 18 %.\n2) Il enchaîne sur l'idée : virtualiser, plusieurs machines sur un seul serveur.\n3) Il prouve : moyennes avant/après (18 % puis 72 %), 4 serveurs réveillés, économies chiffrées.\n4) Il conclut par le verdict : comparer ressources allouées et usages mesurés.\nL'ordre est celui de l'histoire — il ne l'inverse jamais.",
        "expected": "constat — idée — preuve (18 % puis 72 %) — verdict — ordre de l'histoire respecté",
        "note": "Un pitch qui commence par la technique perd son auditoire : le gaspillage chiffré ouvre toujours."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Première étape du pitch",
        "stdin": "q:1",
        "expected": "constat||le constat"
      },
      {
        "label": "Question 2 — Deuxième étape du pitch",
        "stdin": "q:2",
        "expected": "idée||l'idée||idee||l'idee||une idee"
      },
      {
        "label": "Question 3 — L'étape des taux avant/après",
        "stdin": "q:3",
        "expected": "preuve||la preuve"
      },
      {
        "label": "Question 4 — Quatrième et dernière étape",
        "stdin": "q:4",
        "expected": "verdict||le verdict"
      },
      {
        "label": "Question 5 — « De l'électricité pour... »",
        "stdin": "q:5",
        "expected": "rien||pour rien"
      },
      {
        "label": "Question 6 — Le verdict peut-il venir avant la preuve ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Première étape du pitch]\nconstat\n\n[Question 2 — Deuxième étape du pitch]\nidée\n\n[Question 3 — L'étape des taux avant/après]\npreuve\n\n[Question 4 — Quatrième et dernière étape]\nverdict\n\n[Question 5 — « De l'électricité pour... » (un mot)]\nrien\n\n[Question 6 — Le verdict peut-il venir avant la preuve ?]\nnon",
    "takeaway": "1) On ouvre par le constat : le gaspillage mesuré — 80 % d'inactivité, de l'électricité pour rien. Sans constat chiffré, rien ne justifie le changement.\n2) La deuxième étape est l'idée : la virtualisation, plusieurs machines sur un seul serveur.\n3) Les taux avant/après et les économies chiffrées appartiennent à la preuve : la rentabilisation démontrée.\n4) La quatrième étape est le verdict : comparer les ressources allouées aux usages réellement mesurés.\n5) « De l'électricité pour rien » : c'est la phrase du constat, celle que tout responsable comprend.\n6) Non : l'ordre du pitch est l'ordre de l'histoire ; le verdict sans preuve n'est qu'une promesse — chaque étape appuie la suivante.\nContrôle : constat, idée, preuve, verdict — le même déroulé que l'histoire elle-même (le fainéant, l'ingénieur, les VM, le serveur rentabilisé)."
  },
  {
    "id": "vt-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le bilan avant/après du parc",
    "exampleTitle": "Exemple résolu — le bilan de l'agence",
    "goal": "Produire les trois lignes du bilan (réveillés, moyenne avant, moyenne après) et éprouver les conditions du réveil.",
    "brief": "<p><strong>Énoncé.</strong> La preuve du pitch tient en trois lignes : le nombre de <strong>réveillés</strong>, la <strong>moyenne avant</strong> et la <strong>moyenne après</strong>. Un serveur est « réveillé » quand son taux passe de <strong>moins de 30 %</strong> à <strong>80 % ou plus</strong>. Le parc du responsable compte cinq serveurs :</p><table><tr><th>Serveur</th><th>Taux avant</th><th>Taux après</th></tr><tr><td>srv-compta</td><td>25 %</td><td>85 %</td></tr><tr><td>srv-rh</td><td>10 %</td><td>80 %</td></tr><tr><td>srv-prod</td><td>40 %</td><td>75 %</td></tr><tr><td>srv-log</td><td>20 %</td><td>65 %</td></tr><tr><td>srv-arch</td><td>15 %</td><td>90 %</td></tr></table><ol><li>Combien de serveurs sont réveillés au sens de la grille ?</li><li>Quelle est la moyenne des taux avant, en pourcentage ?</li><li>Quelle est la moyenne des taux après, en pourcentage ?</li><li>De combien de points la moyenne du parc a-t-elle monté ?</li><li>srv-rh passe de 10 % à 80 % : est-il réveillé ? (oui ou non)</li><li>srv-prod passe de 40 % à 75 % : est-il réveillé ? (oui ou non)</li></ol>",
    "starter": "# Exercice — Le bilan avant/après du parc\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de serveurs réveillés]\nA_COMPLETER\n\n[Question 2 — Moyenne des taux avant (%)]\nA_COMPLETER\n\n[Question 3 — Moyenne des taux après (%)]\nA_COMPLETER\n\n[Question 4 — Hausse de la moyenne (points)]\nA_COMPLETER\n\n[Question 5 — srv-rh est-il réveillé ?]\nA_COMPLETER\n\n[Question 6 — srv-prod est-il réveillé ?]\nA_COMPLETER\n",
    "hints": [
      "Les moyennes s'obtiennent en additionnant chaque colonne puis en divisant par le nombre de serveurs.",
      "Pour le réveil, vérifiez les deux conditions séparément : le taux avant doit être strictement inférieur à 30 %, le taux après au moins égal à 80 %.",
      "Les cas limites se tranchent avec la règle : 80 % après compte (c'est « 80 ou plus »), et un serveur déjà chargé avant ne peut pas être réveillé."
    ],
    "examples": [
      {
        "stdin": "Le bilan de l'agence compte 2 serveurs :\nx : 5 % avant, 82 % après — y : 35 % avant, 85 % après.\n\n1) Moyenne avant : (5 + 35)/2 = 20 %.\n2) Moyenne après : (82 + 85)/2 = 83,5 %.\n3) Hausse : 83,5 - 20 = 63,5 points.\n4) x : avant 5 < 30 et après 82 >= 80 : réveillé.\n5) y : avant 35 >= 30 : pas réveillé, même s'il finit à 85 %.",
        "expected": "moyennes : 20 % puis 83,5 % — hausse : 63,5 points — réveillés : 1 (x) — y : non réveillé",
        "note": "Un serveur déjà utilisé avant 30 % ne peut pas être « réveillé » : il n'était pas un fainéant."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de serveurs réveillés",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Moyenne des taux avant (%)",
        "stdin": "q:2",
        "expected": "22"
      },
      {
        "label": "Question 3 — Moyenne des taux après (%)",
        "stdin": "q:3",
        "expected": "79"
      },
      {
        "label": "Question 4 — Hausse de la moyenne (points)",
        "stdin": "q:4",
        "expected": "57"
      },
      {
        "label": "Question 5 — srv-rh est-il réveillé ?",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — srv-prod est-il réveillé ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre de serveurs réveillés]\n3\n\n[Question 2 — Moyenne des taux avant (%)]\n22\n\n[Question 3 — Moyenne des taux après (%)]\n79\n\n[Question 4 — Hausse de la moyenne (points)]\n57\n\n[Question 5 — srv-rh est-il réveillé ?]\noui\n\n[Question 6 — srv-prod est-il réveillé ?]\nnon",
    "takeaway": "1) Serveurs réveillés (avant < 30 % et après >= 80 %) : srv-compta (25 puis 85), srv-rh (10 puis 80), srv-arch (15 puis 90) : 3 réveillés. srv-prod échoue sur l'avant (40 % >= 30 %) et srv-log sur l'après (65 % < 80 %).\n2) Moyenne avant : (25 + 10 + 40 + 20 + 15)/5 = 110/5 = 22 %.\n3) Moyenne après : (85 + 80 + 75 + 65 + 90)/5 = 395/5 = 79 %.\n4) Hausse de la moyenne : 79 - 22 = 57 points. Le matériel n'a pas changé, son usage a changé — pas d'investissement, seulement une réorganisation.\n5) Oui : srv-rh part de 10 % (sous 30 %) et atteint exactement 80 %, qui compte (« 80 % ou plus »).\n6) Non : srv-prod finit certes à 75 %, mais il partait de 40 %, déjà au-dessus de la barre des 30 % — il n'était pas un fainéant, il ne peut pas être réveillé.\nContrôle : 3 réveillés + 2 non réveillés = 5 serveurs ; et 22 % + 57 points = 79 % : les trois lignes du bilan se recoupent."
  },
  {
    "id": "vt-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de réveil v/e/s et le verdict",
    "exampleTitle": "Exemple résolu — le plan de l'annexe",
    "goal": "Classer des serveurs avec les lettres v, e, s, sommer la charge des VM prévues et rendre le verdict en trois états.",
    "brief": "<p><strong>Énoncé.</strong> Dernière étape : le plan d'action. Le plan classe chaque vieux serveur avec trois lettres : <strong>v</strong> (virtualisable : matériel compatible), <strong>e</strong> (économe : moins de 30 % d'utilisation), <strong>s</strong> (sûr : sauvegardes existantes). Les trois lettres présentes : « à virtualiser ». Il en manque une : « à étudier », et la <strong>première lettre manquante dans l'ordre v, e, s</strong> est la prochaine action concrète. Le verdict final a trois états : <strong>plan prêt</strong> (tous les serveurs à virtualiser et la charge totale des VM prévues ne dépasse pas la capacité de <strong>200</strong>) ; <strong>plan à ajuster</strong> (serveurs prêts mais charge qui dépasse) ; <strong>plan impossible</strong> (au moins un serveur reste bloqué). Voici le parc :</p><table><tr><th>Serveur</th><th>v</th><th>e</th><th>s</th><th>Charge des VM prévues</th></tr><tr><td>srv-compta</td><td>oui</td><td>oui (18 %)</td><td>oui</td><td>50</td></tr><tr><td>srv-rh</td><td>oui</td><td>oui (22 %)</td><td>non</td><td>40</td></tr><tr><td>srv-log</td><td>oui</td><td>non (55 %)</td><td>oui</td><td>60</td></tr><tr><td>srv-arch</td><td>oui</td><td>oui (12 %)</td><td>oui</td><td>50</td></tr></table><ol><li>Combien de serveurs sont « à virtualiser » (les trois lettres v, e, s présentes) ?</li><li>Quelle lettre manque-t-il à srv-rh ? (une lettre)</li><li>Quelle lettre manque-t-il à srv-log ? (une lettre)</li><li>Quelle est la charge totale des VM prévues du plan ?</li><li>Cette charge dépasse-t-elle la capacité de 200 ? (oui ou non)</li><li>Sachant qu'au moins un serveur reste bloqué, quel est le verdict du plan ? (deux mots)</li></ol>",
    "starter": "# Exercice — Le plan de réveil v/e/s et le verdict\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Serveurs « à virtualiser »]\nA_COMPLETER\n\n[Question 2 — Lettre manquante de srv-rh]\nA_COMPLETER\n\n[Question 3 — Lettre manquante de srv-log]\nA_COMPLETER\n\n[Question 4 — Charge totale des VM prévues]\nA_COMPLETER\n\n[Question 5 — La charge dépasse-t-elle 200 ?]\nA_COMPLETER\n\n[Question 6 — Le verdict du plan (deux mots)]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque serveur, lisez les trois colonnes v, e, s : seuls ceux qui cochent les trois sont « à virtualiser ».",
      "La lettre manquante se lit dans l'ordre v, puis e, puis s : c'est la première colonne non remplie qui devient la prochaine action.",
      "Additionnez la charge des VM prévues de tous les serveurs, comparez à la capacité ; mais souvenez-vous qu'un seul serveur bloqué change le verdict, même si la charge tient."
    ],
    "examples": [
      {
        "stdin": "Le plan de l'annexe porte sur 2 serveurs (capacité 200) :\na (v, e, s — charge 60) — b (v, e, sans sauvegarde — charge 50).\n\n1) a : les trois lettres : à virtualiser.\n2) b : il manque s (les sauvegardes) : à étudier, prochaine action = mettre en place les sauvegardes.\n3) Charge totale : 60 + 50 = 110, qui ne dépasse pas 200.\n4) Mais b reste bloqué : le verdict est « plan impossible ».",
        "expected": "a : à virtualiser — b : à étudier (s manquant) — charge 110 ≤ 200 — verdict : plan impossible",
        "note": "La charge peut très bien tenir : dès qu'un serveur reste bloqué, le verdict tombe — plan impossible."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Serveurs « à virtualiser »",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Lettre manquante de srv-rh",
        "stdin": "q:2",
        "expected": "s||lettre s||la lettre s||sûr||sur"
      },
      {
        "label": "Question 3 — Lettre manquante de srv-log",
        "stdin": "q:3",
        "expected": "e||lettre e||la lettre e||économe||econome"
      },
      {
        "label": "Question 4 — Charge totale des VM prévues",
        "stdin": "q:4",
        "expected": "200"
      },
      {
        "label": "Question 5 — La charge dépasse-t-elle 200 ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Le verdict du plan (deux mots)",
        "stdin": "q:6",
        "expected": "plan impossible||impossible"
      }
    ],
    "solution": "[Question 1 — Serveurs « à virtualiser »]\n2\n\n[Question 2 — Lettre manquante de srv-rh]\ns\n\n[Question 3 — Lettre manquante de srv-log]\ne\n\n[Question 4 — Charge totale des VM prévues]\n200\n\n[Question 5 — La charge dépasse-t-elle 200 ?]\nnon\n\n[Question 6 — Le verdict du plan (deux mots)]\nplan impossible",
    "takeaway": "1) Serveurs à virtualiser (v, e et s tous présents) : srv-compta (18 % d'utilisation, sauvegardes en place) et srv-arch (12 %) : 2 serveurs.\n2) srv-rh a v (compatible) et e (22 % d'utilisation), mais pas de sauvegarde : il manque la lettre s — prochaine action : mettre en place les sauvegardes.\n3) srv-log a v et s, mais 55 % d'utilisation : il manque la lettre e — ce n'est pas un fainéant, il n'y a rien à gagner à le virtualiser.\n4) Charge totale des VM prévues : 50 + 40 + 60 + 50 = 200.\n5) Non : 200 n'excède pas la capacité de 200 — la charge tient tout juste dans le modèle.\n6) Le verdict est « plan impossible » : srv-rh (lettre s manquante) et srv-log (lettre e manquante) restent bloqués — un seul serveur bloqué suffit, même quand la charge tient.\nContrôle : 2 serveurs prêts + 2 à étudier = 4 serveurs ; la charge de 200 égale exactement la capacité : elle ne la dépasse pas, c'est le blocage des lettres qui tranche le verdict."
  }
];
