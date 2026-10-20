/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "re-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "LAN ou WAN",
    "goal": "Classer les réseaux selon leur portée : LAN à l'intérieur d'un immeuble, WAN au-delà de 100 km.",
    "brief": "<p>Analysez chaque ligne proposée « reseau portee » : portee vaut <code>local</code> (immeuble, campus, salle) ou <code>etendu</code> (villes, pays). Pour chaque ligne il Indiquez <code>reseau : LAN</code> ou <code>reseau : WAN</code>. Il termine par deux lignes de comptage : <code>lan : X</code> puis <code>wan : Y</code>.</p>",
    "starter": "# Grille d'analyse (re-c1-e1) — LAN ou WAN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul etendu]\n# Données : 1\n# Données : national etendu\nA_COMPLETER\n\n[Cas 2 — Deux locaux]\n# Données : 2\n# Données : pmi local\n# Données : campus local\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : salle local\n# Données : pays etendu\n# Données : ville etendu\n# Données : classe local\n# Données : continent etendu\nA_COMPLETER\n",
    "hints": [
      "Un if sur la portee suffit : local et etendu sont les deux seules valeurs.",
      "Les deux totaux sortent après la boucle, lan d'abord, wan ensuite."
    ],
    "examples": [
      {
        "stdin": "3\ncampus local\nfiliale etendu\nsalle local\n",
        "expected": "campus : LAN\nfiliale : WAN\nsalle : LAN\nlan : 2\nwan : 1"
      }
    ],
    "tests": [
      {
        "label": "Un seul etendu",
        "stdin": "cas:1",
        "expected": "national : WAN\nlan : 0\nwan : 1"
      },
      {
        "label": "Deux locaux",
        "stdin": "cas:2",
        "expected": "pmi : LAN\ncampus : LAN\nlan : 2\nwan : 0"
      },
      {
        "label": "Cinq reseaux",
        "stdin": "cas:3",
        "expected": "salle : LAN\npays : WAN\nville : WAN\nclasse : LAN\ncontinent : WAN\nlan : 2\nwan : 3"
      }
    ],
    "solution": "[Exemple]\ncampus : LAN\nfiliale : WAN\nsalle : LAN\nlan : 2\nwan : 1\n\n[Cas 1 — Un seul etendu]\nnational : WAN\nlan : 0\nwan : 1\n\n[Cas 2 — Deux locaux]\npmi : LAN\ncampus : LAN\nlan : 2\nwan : 0\n\n[Cas 3 — Cinq reseaux]\nsalle : LAN\npays : WAN\nville : WAN\nclasse : LAN\ncontinent : WAN\nlan : 2\nwan : 3"
  },
  {
    "id": "re-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Workgroup ou client-serveur",
    "goal": "Distinguer le groupe de travail (chaque poste est client et serveur) de l'architecture client-serveur (données centralisées).",
    "brief": "<p>Analysez chaque ligne proposée « reseau modele » : modele vaut <code>pairapair</code> (chaque poste met ses ressources à disposition, mots de passe partout) ou <code>centralise</code> (un serveur unique détient les comptes). Pour chaque ligne il Indiquez <code>reseau : workgroup</code> ou <code>reseau : client-serveur</code>. Il termine par <code>centralises : oui</code> si au moins un réseau est centralisé, <code>centralises : non</code> sinon.</p>",
    "starter": "# Grille d'analyse (re-c1-e2) — Workgroup ou client-serveur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul centralise]\n# Données : 1\n# Données : agence centralise\nA_COMPLETER\n\n[Cas 2 — Que du pairapair]\n# Données : 2\n# Données : tpe pairapair\n# Données : cabine pairapair\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a pairapair\n# Données : b centralise\n# Données : c pairapair\n# Données : d pairapair\n# Données : e centralise\nA_COMPLETER\n",
    "hints": [
      "Un case à deux modèles : pairapair donne workgroup, centralise donne client-serveur.",
      "Un drapeau passe à 1 au premier réseau centralisé ; le verdict le teste après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\natelier pairapair\nagence centralise\nsdb pairapair\n",
        "expected": "atelier : workgroup\nagence : client-serveur\nsdb : workgroup\ncentralises : oui"
      }
    ],
    "tests": [
      {
        "label": "Un seul centralise",
        "stdin": "cas:1",
        "expected": "agence : client-serveur\ncentralises : oui"
      },
      {
        "label": "Que du pairapair",
        "stdin": "cas:2",
        "expected": "tpe : workgroup\ncabine : workgroup\ncentralises : non"
      },
      {
        "label": "Cinq reseaux",
        "stdin": "cas:3",
        "expected": "a : workgroup\nb : client-serveur\nc : workgroup\nd : workgroup\ne : client-serveur\ncentralises : oui"
      }
    ],
    "solution": "[Exemple]\natelier : workgroup\nagence : client-serveur\nsdb : workgroup\ncentralises : oui\n\n[Cas 1 — Un seul centralise]\nagence : client-serveur\ncentralises : oui\n\n[Cas 2 — Que du pairapair]\ntpe : workgroup\ncabine : workgroup\ncentralises : non\n\n[Cas 3 — Cinq reseaux]\na : workgroup\nb : client-serveur\nc : workgroup\nd : workgroup\ne : client-serveur\ncentralises : oui"
  },
  {
    "id": "re-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Les cinq types de réseaux",
    "goal": "Ranger les réseaux dans les cinq familles du support : PAN, LAN, WLAN, MAN, WAN.",
    "brief": "<p>Analysez chaque ligne proposée « reseau code » : code vaut <code>p</code> (PAN : dessert une personne), <code>l</code> (LAN : réseau local filaire), <code>w</code> (WLAN : LAN sans fil), <code>m</code> (MAN : à l'échelle d'une ville) ou <code>g</code> (WAN : région, pays, continent). Pour chaque ligne il Indiquez <code>reseau : TYPE</code> avec le type en majuscules. Il termine par <code>sans fil : X/n</code> (les WLAN).</p>",
    "starter": "# Grille d'analyse (re-c1-e3) — Les cinq types de réseaux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul WLAN]\n# Données : 1\n# Données : lycee w\nA_COMPLETER\n\n[Cas 2 — Aucun sans fil]\n# Données : 2\n# Données : studio p\n# Données : campus m\nA_COMPLETER\n\n[Cas 3 — Six reseaux]\n# Données : 6\n# Données : a p\n# Données : b l\n# Données : c w\n# Données : d m\n# Données : e g\n# Données : f w\nA_COMPLETER\n",
    "hints": [
      "Un case à cinq codes : p, l, w, m, g — chacun donne son sigle en majuscules.",
      "Seul le code w compte comme réseau sans fil dans ce contrôle."
    ],
    "examples": [
      {
        "stdin": "5\niphone p\nbox l\nwifi w\nmairie m\noperateur g\n",
        "expected": "iphone : PAN\nbox : LAN\nwifi : WLAN\nmairie : MAN\noperateur : WAN\nsans fil : 1/5"
      }
    ],
    "tests": [
      {
        "label": "Un seul WLAN",
        "stdin": "cas:1",
        "expected": "lycee : WLAN\nsans fil : 1/1"
      },
      {
        "label": "Aucun sans fil",
        "stdin": "cas:2",
        "expected": "studio : PAN\ncampus : MAN\nsans fil : 0/2"
      },
      {
        "label": "Six reseaux",
        "stdin": "cas:3",
        "expected": "a : PAN\nb : LAN\nc : WLAN\nd : MAN\ne : WAN\nf : WLAN\nsans fil : 2/6"
      }
    ],
    "solution": "[Exemple]\niphone : PAN\nbox : LAN\nwifi : WLAN\nmairie : MAN\noperateur : WAN\nsans fil : 1/5\n\n[Cas 1 — Un seul WLAN]\nlycee : WLAN\nsans fil : 1/1\n\n[Cas 2 — Aucun sans fil]\nstudio : PAN\ncampus : MAN\nsans fil : 0/2\n\n[Cas 3 — Six reseaux]\na : PAN\nb : LAN\nc : WLAN\nd : MAN\ne : WAN\nf : WLAN\nsans fil : 2/6"
  },
  {
    "id": "re-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Bus, anneau, étoile",
    "goal": "Caractériser les trois topologies : bus fragile, anneau en boucle, étoile centralisée.",
    "brief": "<p>Analysez chaque ligne proposée « reseau topo » : topo vaut <code>bus</code> (un seul câble), <code>anneau</code> (boucle fermée à jeton) ou <code>etoile</code> (point central). Pour chaque ligne il Indiquez <code>reseau : fragile</code> (bus), <code>reseau : boucle</code> (anneau) ou <code>reseau : centralise</code> (étoile). Il termine par <code>etoiles : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c2-e1) — Bus, anneau, étoile\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule etoile]\n# Données : 1\n# Données : tour etoile\nA_COMPLETER\n\n[Cas 2 — Deux bus]\n# Données : 2\n# Données : usine bus\n# Données : labo bus\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a bus\n# Données : b etoile\n# Données : c anneau\n# Données : d etoile\n# Données : e bus\nA_COMPLETER\n",
    "hints": [
      "Un case à trois topologies, trois verdicts : fragile, boucle, centralise.",
      "Le compteur suit exactement les lignes « etoile »."
    ],
    "examples": [
      {
        "stdin": "3\nthinnet bus\ntokenring anneau\ncampus etoile\n",
        "expected": "thinnet : fragile\ntokenring : boucle\ncampus : centralise\netoiles : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Une seule etoile",
        "stdin": "cas:1",
        "expected": "tour : centralise\netoiles : 1/1"
      },
      {
        "label": "Deux bus",
        "stdin": "cas:2",
        "expected": "usine : fragile\nlabo : fragile\netoiles : 0/2"
      },
      {
        "label": "Cinq reseaux",
        "stdin": "cas:3",
        "expected": "a : fragile\nb : centralise\nc : boucle\nd : centralise\ne : fragile\netoiles : 2/5"
      }
    ],
    "solution": "[Exemple]\nthinnet : fragile\ntokenring : boucle\ncampus : centralise\netoiles : 1/3\n\n[Cas 1 — Une seule etoile]\ntour : centralise\netoiles : 1/1\n\n[Cas 2 — Deux bus]\nusine : fragile\nlabo : fragile\netoiles : 0/2\n\n[Cas 3 — Cinq reseaux]\na : fragile\nb : centralise\nc : boucle\nd : centralise\ne : fragile\netoiles : 2/5"
  },
  {
    "id": "re-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Choisir le support",
    "goal": "Conseiller le bon support de transmission : UTP 100 m, STP blindé, fibre longue distance, Wi-Fi sans fil.",
    "brief": "<p>Analysez chaque ligne proposée « reseau support » : support vaut <code>utp</code> (paire torsadée non blindée, 100 m max), <code>stp</code> (blindé contre les interférences), <code>fibre</code> (longue distance, haut débit) ou <code>wifi</code> (ondes radio 802.11). Pour chaque ligne il Indiquez <code>reseau : conseille</code> (utp, stp, fibre), <code>reseau : sans fil</code> (wifi) ou <code>reseau : support inconnu</code>. Il termine par <code>blindes : X/n</code> (les STP).</p>",
    "starter": "# Grille d'analyse (re-c2-e2) — Choisir le support\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul blindé]\n# Données : 1\n# Données : chaudiere stp\nA_COMPLETER\n\n[Cas 2 — Support inconnu]\n# Données : 2\n# Données : bureau coaxial\n# Données : salle utp\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a utp\n# Données : b wifi\n# Données : c stp\n# Données : d fibre\n# Données : e stp\nA_COMPLETER\n",
    "hints": [
      "Un case à quatre supports, plus le cas par défaut pour l'inconnu.",
      "Seul le support stp est blindé dans ce contrôle."
    ],
    "examples": [
      {
        "stdin": "4\nbureau utp\natelier stp\ncities fibre\nreunion wifi\n",
        "expected": "bureau : conseille\natelier : conseille\ncities : conseille\nreunion : sans fil\nblindes : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Un seul blindé",
        "stdin": "cas:1",
        "expected": "chaudiere : conseille\nblindes : 1/1"
      },
      {
        "label": "Support inconnu",
        "stdin": "cas:2",
        "expected": "bureau : support inconnu\nsalle : conseille\nblindes : 0/2"
      },
      {
        "label": "Cinq reseaux",
        "stdin": "cas:3",
        "expected": "a : conseille\nb : sans fil\nc : conseille\nd : conseille\ne : conseille\nblindes : 2/5"
      }
    ],
    "solution": "[Exemple]\nbureau : conseille\natelier : conseille\ncities : conseille\nreunion : sans fil\nblindes : 1/4\n\n[Cas 1 — Un seul blindé]\nchaudiere : conseille\nblindes : 1/1\n\n[Cas 2 — Support inconnu]\nbureau : support inconnu\nsalle : conseille\nblindes : 0/2\n\n[Cas 3 — Cinq reseaux]\na : conseille\nb : sans fil\nc : conseille\nd : conseille\ne : conseille\nblindes : 2/5"
  },
  {
    "id": "re-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La panne de câble",
    "goal": "Simuler l'effet d'une coupure selon la topologie : bus hors service, anneau bascule sur le secondaire, étoile isole un poste.",
    "brief": "<p>Analysez chaque ligne proposée « reseau topo panne » : topo vaut <code>bus</code>, <code>anneau</code> ou <code>etoile</code> ; panne vaut <code>ok</code> ou <code>coupe</code> (câble coupé). Pour chaque ligne il Indiquez : <code>reseau : liaison correcte</code> (ok) ; sinon <code>reseau : reseau hors service</code> (bus), <code>reseau : bascule anneau secondaire</code> (anneau) ou <code>reseau : un poste isole</code> (étoile). Il termine par <code>pannes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c2-e3) — La panne de câble\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Anneau double]\n# Données : 1\n# Données : r1 anneau coupe\nA_COMPLETER\n\n[Cas 2 — Rien ne casse]\n# Données : 2\n# Données : a etoile ok\n# Données : b anneau ok\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a bus coupe\n# Données : b etoile ok\n# Données : c bus ok\n# Données : d etoile coupe\n# Données : e anneau coupe\nA_COMPLETER\n",
    "hints": [
      "Un if sur panne, puis un case sur topo : ok court-circuite tout.",
      "Le compteur suit exactement les lignes « coupe », quelle que soit la topologie."
    ],
    "examples": [
      {
        "stdin": "4\na bus ok\nb bus coupe\nc anneau coupe\nd etoile coupe\n",
        "expected": "a : liaison correcte\nb : reseau hors service\nc : bascule anneau secondaire\nd : un poste isole\npannes : 3/4"
      }
    ],
    "tests": [
      {
        "label": "Anneau double",
        "stdin": "cas:1",
        "expected": "r1 : bascule anneau secondaire\npannes : 1/1"
      },
      {
        "label": "Rien ne casse",
        "stdin": "cas:2",
        "expected": "a : liaison correcte\nb : liaison correcte\npannes : 0/2"
      },
      {
        "label": "Cinq reseaux",
        "stdin": "cas:3",
        "expected": "a : reseau hors service\nb : liaison correcte\nc : liaison correcte\nd : un poste isole\ne : bascule anneau secondaire\npannes : 3/5"
      }
    ],
    "solution": "[Exemple]\na : liaison correcte\nb : reseau hors service\nc : bascule anneau secondaire\nd : un poste isole\npannes : 3/4\n\n[Cas 1 — Anneau double]\nr1 : bascule anneau secondaire\npannes : 1/1\n\n[Cas 2 — Rien ne casse]\na : liaison correcte\nb : liaison correcte\npannes : 0/2\n\n[Cas 3 — Cinq reseaux]\na : reseau hors service\nb : liaison correcte\nc : liaison correcte\nd : un poste isole\ne : bascule anneau secondaire\npannes : 3/5"
  },
  {
    "id": "re-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les sept couches OSI",
    "goal": "Ranger chaque élément dans sa couche OSI, de la couche 1 physique à la couche 7 application.",
    "brief": "<p>Analysez chaque ligne proposée « objet couche » : couche vaut <code>c1</code> à <code>c7</code>. Pour chaque ligne il Indiquez <code>objet : N-nom</code>, où N est le numéro et nom la couche : <code>1-physique</code>, <code>2-liaison</code>, <code>3-reseau</code>, <code>4-transport</code>, <code>5-session</code>, <code>6-presentation</code>, <code>7-application</code>. Il termine par <code>routeurs : X/n</code> (les objets de la couche 3).</p>",
    "starter": "# Grille d'analyse (re-c3-e1) — Les sept couches OSI\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul c3]\n# Données : 1\n# Données : paquet c3\nA_COMPLETER\n\n[Cas 2 — Couche 2]\n# Données : 2\n# Données : trame c1\n# Données : mac c2\nA_COMPLETER\n\n[Cas 3 — Cinq objets]\n# Données : 5\n# Données : a c7\n# Données : b c2\n# Données : c c3\n# Données : d c5\n# Données : e c6\nA_COMPLETER\n",
    "hints": [
      "Un case à sept valeurs, chaque valeur donnant « N-nom ».",
      "La couche 3 (reseau) est celle des routeurs : c'est elle qu'on compte."
    ],
    "examples": [
      {
        "stdin": "4\ncable c1\nadresse c3\nport c4\nnavigateur c7\n",
        "expected": "cable : 1-physique\nadresse : 3-reseau\nport : 4-transport\nnavigateur : 7-application\nrouteurs : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Un seul c3",
        "stdin": "cas:1",
        "expected": "paquet : 3-reseau\nrouteurs : 1/1"
      },
      {
        "label": "Couche 2",
        "stdin": "cas:2",
        "expected": "trame : 1-physique\nmac : 2-liaison\nrouteurs : 0/2"
      },
      {
        "label": "Cinq objets",
        "stdin": "cas:3",
        "expected": "a : 7-application\nb : 2-liaison\nc : 3-reseau\nd : 5-session\ne : 6-presentation\nrouteurs : 1/5"
      }
    ],
    "solution": "[Exemple]\ncable : 1-physique\nadresse : 3-reseau\nport : 4-transport\nnavigateur : 7-application\nrouteurs : 1/4\n\n[Cas 1 — Un seul c3]\npaquet : 3-reseau\nrouteurs : 1/1\n\n[Cas 2 — Couche 2]\ntrame : 1-physique\nmac : 2-liaison\nrouteurs : 0/2\n\n[Cas 3 — Cinq objets]\na : 7-application\nb : 2-liaison\nc : 3-reseau\nd : 5-session\ne : 6-presentation\nrouteurs : 1/5"
  },
  {
    "id": "re-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Où travaille l'équipement",
    "goal": "Placer les équipements dans leurs couches : câble (1), commutateur (2), routeur (3), application (7).",
    "brief": "<p>Analysez chaque ligne proposée « equipement couche » : couche vaut <code>c1</code> (câble, connecteur), <code>c2</code> (commutateur), <code>c3</code> (routeur) ou <code>c7</code> (navigateur, messagerie). Pour chaque ligne il Indiquez <code>equipement : couche N</code> si l'équipement correspond bien à cette couche, <code>equipement : hors couche</code> sinon. Il termine par <code>routeurs : X/n</code> (les équipements placés correctement en couche 3).</p>",
    "starter": "# Grille d'analyse (re-c3-e2) — Où travaille l'équipement\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un routeur bien placé]\n# Données : 1\n# Données : routeur c3\nA_COMPLETER\n\n[Cas 2 — Hors couche]\n# Données : 2\n# Données : switch c3\n# Données : navigateur c2\nA_COMPLETER\n\n[Cas 3 — Cinq equipements]\n# Données : 5\n# Données : routeur c3\n# Données : switch c2\n# Données : cable c1\n# Données : application c7\n# Données : switch c3\nA_COMPLETER\n",
    "hints": [
      "Un case sur la couche donne l'équipement attendu : c1 cable, c2 commutateur, c3 routeur, c7 application.",
      "La comparaison équipement reçu contre équipement attendu décide du verdict."
    ],
    "examples": [
      {
        "stdin": "4\nrouteur c3\nswitch c2\ncable c1\nrouteur c2\n",
        "expected": "routeur : couche 3\nswitch : couche 2\ncable : couche 1\nrouteur : hors couche\nrouteurs : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Un routeur bien placé",
        "stdin": "cas:1",
        "expected": "routeur : couche 3\nrouteurs : 1/1"
      },
      {
        "label": "Hors couche",
        "stdin": "cas:2",
        "expected": "switch : hors couche\nnavigateur : hors couche\nrouteurs : 0/2"
      },
      {
        "label": "Cinq equipements",
        "stdin": "cas:3",
        "expected": "routeur : couche 3\nswitch : couche 2\ncable : couche 1\napplication : couche 7\nswitch : hors couche\nrouteurs : 1/5"
      }
    ],
    "solution": "[Exemple]\nrouteur : couche 3\nswitch : couche 2\ncable : couche 1\nrouteur : hors couche\nrouteurs : 1/4\n\n[Cas 1 — Un routeur bien placé]\nrouteur : couche 3\nrouteurs : 1/1\n\n[Cas 2 — Hors couche]\nswitch : hors couche\nnavigateur : hors couche\nrouteurs : 0/2\n\n[Cas 3 — Cinq equipements]\nrouteur : couche 3\nswitch : couche 2\ncable : couche 1\napplication : couche 7\nswitch : hors couche\nrouteurs : 1/5"
  },
  {
    "id": "re-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Le dépannage par couches",
    "goal": "Appliquer la méthode du professionnel : en cas de panne, remonter les couches OSI depuis la couche physique.",
    "brief": "<p>Analysez chaque ligne proposée « incident couche » : couche est la couche où se situe la panne — <code>c1</code> (câble débranché), <code>c2</code> (carte réseau fautive), <code>c3</code> (routage absent) ou <code>c7</code> (application en cause). Pour chaque ligne il Indiquez : <code>incident : verifier les cables</code> (c1), <code>incident : verifier la carte</code> (c2), <code>incident : verifier le routage</code> (c3), <code>incident : verifier les applications</code> (c7). Il termine par <code>physiques : X/n</code> (les pannes de couche 1, les plus fréquentes).</p>",
    "starter": "# Grille d'analyse (re-c3-e3) — Le dépannage par couches\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cable debranche]\n# Données : 1\n# Données : imprimante c1\nA_COMPLETER\n\n[Cas 2 — Routage absent]\n# Données : 2\n# Données : vlan c3\n# Données : appli c7\nA_COMPLETER\n\n[Cas 3 — Cinq incidents]\n# Données : 5\n# Données : a c1\n# Données : b c3\n# Données : c c2\n# Données : d c1\n# Données : e c7\nA_COMPLETER\n",
    "hints": [
      "Un case à quatre couches, quatre gestes : cables, carte, routage, applications.",
      "Le compteur suit exactement les incidents de couche 1."
    ],
    "examples": [
      {
        "stdin": "4\npc1 c1\npc2 c2\nsrv c3\nweb c7\n",
        "expected": "pc1 : verifier les cables\npc2 : verifier la carte\nsrv : verifier le routage\nweb : verifier les applications\nphysiques : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Cable debranche",
        "stdin": "cas:1",
        "expected": "imprimante : verifier les cables\nphysiques : 1/1"
      },
      {
        "label": "Routage absent",
        "stdin": "cas:2",
        "expected": "vlan : verifier le routage\nappli : verifier les applications\nphysiques : 0/2"
      },
      {
        "label": "Cinq incidents",
        "stdin": "cas:3",
        "expected": "a : verifier les cables\nb : verifier le routage\nc : verifier la carte\nd : verifier les cables\ne : verifier les applications\nphysiques : 2/5"
      }
    ],
    "solution": "[Exemple]\npc1 : verifier les cables\npc2 : verifier la carte\nsrv : verifier le routage\nweb : verifier les applications\nphysiques : 1/4\n\n[Cas 1 — Cable debranche]\nimprimante : verifier les cables\nphysiques : 1/1\n\n[Cas 2 — Routage absent]\nvlan : verifier le routage\nappli : verifier les applications\nphysiques : 0/2\n\n[Cas 3 — Cinq incidents]\na : verifier les cables\nb : verifier le routage\nc : verifier la carte\nd : verifier les cables\ne : verifier les applications\nphysiques : 2/5"
  },
  {
    "id": "re-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Les quatre couches TCP/IP",
    "goal": "Ranger chaque élément dans les quatre couches du modèle TCP/IP : accès réseau, internet, transport, application.",
    "brief": "<p>Analysez chaque ligne proposée « objet couche » : couche vaut <code>ac</code> (accès réseau), <code>in</code> (internet), <code>tr</code> (transport) ou <code>ap</code> (application). Pour chaque ligne il Indiquez <code>objet : acces-reseau</code>, <code>objet : internet</code>, <code>objet : transport</code> ou <code>objet : application</code>. Il termine par <code>transport : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c4-e1) — Les quatre couches TCP/IP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul transport]\n# Données : 1\n# Données : udp tr\nA_COMPLETER\n\n[Cas 2 — Couche internet]\n# Données : 2\n# Données : icmp in\n# Données : arp in\nA_COMPLETER\n\n[Cas 3 — Cinq objets]\n# Données : 5\n# Données : a ac\n# Données : b ap\n# Données : c in\n# Données : d tr\n# Données : e ap\nA_COMPLETER\n",
    "hints": [
      "Un case à quatre codes : ac, in, tr, ap.",
      "Le compteur suit exactement les lignes « transport »."
    ],
    "examples": [
      {
        "stdin": "4\nethernet ac\nip in\ntcp tr\nhttp ap\n",
        "expected": "ethernet : acces-reseau\nip : internet\ntcp : transport\nhttp : application\ntransport : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Un seul transport",
        "stdin": "cas:1",
        "expected": "udp : transport\ntransport : 1/1"
      },
      {
        "label": "Couche internet",
        "stdin": "cas:2",
        "expected": "icmp : internet\narp : internet\ntransport : 0/2"
      },
      {
        "label": "Cinq objets",
        "stdin": "cas:3",
        "expected": "a : acces-reseau\nb : application\nc : internet\nd : transport\ne : application\ntransport : 1/5"
      }
    ],
    "solution": "[Exemple]\nethernet : acces-reseau\nip : internet\ntcp : transport\nhttp : application\ntransport : 1/4\n\n[Cas 1 — Un seul transport]\nudp : transport\ntransport : 1/1\n\n[Cas 2 — Couche internet]\nicmp : internet\narp : internet\ntransport : 0/2\n\n[Cas 3 — Cinq objets]\na : acces-reseau\nb : application\nc : internet\nd : transport\ne : application\ntransport : 1/5"
  },
  {
    "id": "re-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le three-way handshake",
    "goal": "Vérifier la séquence TCP : SYN, puis SYN-ACK, puis ACK — sinon la connexion échoue.",
    "brief": "<p>Analysez chaque ligne proposée « paquet etape » : etape vaut <code>syn</code>, <code>synack</code> ou <code>ack</code>. La connexion est correcte si les paquets arrivent dans l'ordre syn, puis synack, puis ack. Pour chaque ligne il Indiquez <code>paquet : etape N</code> (1, 2 ou 3) si le paquet est dans l'ordre, <code>paquet : hors sequence</code> sinon. Final : <code>connexion : etablie</code> si les trois étapes sont passées dans l'ordre, <code>connexion : echouee</code> sinon.</p>",
    "starter": "# Grille d'analyse (re-c4-e2) — Le three-way handshake\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ack sans syn]\n# Données : 1\n# Données : p1 ack\nA_COMPLETER\n\n[Cas 2 — Syn repete]\n# Données : 2\n# Données : p1 syn\n# Données : p2 syn\nA_COMPLETER\n\n[Cas 3 — Cinq paquets]\n# Données : 5\n# Données : p1 syn\n# Données : p2 synack\n# Données : p3 ack\n# Données : p4 syn\n# Données : p5 ack\nA_COMPLETER\n",
    "hints": [
      "Trois étapes numérotées : syn avance à 1, synack avance à 2 (seulement si on est à 1), ack avance à 3.",
      "Un drapeau rompu : toute sortie d'ordre casse la connexion pour la suite."
    ],
    "examples": [
      {
        "stdin": "3\np1 syn\np2 synack\np3 ack\n",
        "expected": "p1 : etape 1\np2 : etape 2\np3 : etape 3\nconnexion : etablie"
      }
    ],
    "tests": [
      {
        "label": "Ack sans syn",
        "stdin": "cas:1",
        "expected": "p1 : hors sequence\nconnexion : echouee"
      },
      {
        "label": "Syn repete",
        "stdin": "cas:2",
        "expected": "p1 : etape 1\np2 : hors sequence\nconnexion : echouee"
      },
      {
        "label": "Cinq paquets",
        "stdin": "cas:3",
        "expected": "p1 : etape 1\np2 : etape 2\np3 : etape 3\np4 : hors sequence\np5 : hors sequence\nconnexion : echouee"
      }
    ],
    "solution": "[Exemple]\np1 : etape 1\np2 : etape 2\np3 : etape 3\nconnexion : etablie\n\n[Cas 1 — Ack sans syn]\np1 : hors sequence\nconnexion : echouee\n\n[Cas 2 — Syn repete]\np1 : etape 1\np2 : hors sequence\nconnexion : echouee\n\n[Cas 3 — Cinq paquets]\np1 : etape 1\np2 : etape 2\np3 : etape 3\np4 : hors sequence\np5 : hors sequence\nconnexion : echouee"
  },
  {
    "id": "re-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "TCP contre UDP",
    "goal": "Choisir entre TCP (fiable, accusés de réception, full-duplex) et UDP (rapide, sans accusé).",
    "brief": "<p>Analysez chaque ligne proposée « flux protocole » : protocole vaut <code>tcp</code> (transferts exigeant la fiabilité) ou <code>udp</code> (flux temps réel tolérant aux pertes). Pour chaque ligne il Indiquez <code>flux : fiable</code> (tcp) ou <code>flux : rapide</code> (udp). Il termine par <code>fiables : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c4-e3) — TCP contre UDP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul UDP]\n# Données : 1\n# Données : voix udp\nA_COMPLETER\n\n[Cas 2 — Que du TCP]\n# Données : 2\n# Données : site tcp\n# Données : banque tcp\nA_COMPLETER\n\n[Cas 3 — Cinq flux]\n# Données : 5\n# Données : a tcp\n# Données : b udp\n# Données : c udp\n# Données : d tcp\n# Données : e tcp\nA_COMPLETER\n",
    "hints": [
      "Un if sur le protocole suffit : tcp et udp sont les deux seules valeurs.",
      "Le compteur suit exactement les flux « fiable »."
    ],
    "examples": [
      {
        "stdin": "3\ncourriel tcp\ndns udp\ntransfert tcp\n",
        "expected": "courriel : fiable\ndns : rapide\ntransfert : fiable\nfiables : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Un seul UDP",
        "stdin": "cas:1",
        "expected": "voix : rapide\nfiables : 0/1"
      },
      {
        "label": "Que du TCP",
        "stdin": "cas:2",
        "expected": "site : fiable\nbanque : fiable\nfiables : 2/2"
      },
      {
        "label": "Cinq flux",
        "stdin": "cas:3",
        "expected": "a : fiable\nb : rapide\nc : rapide\nd : fiable\ne : fiable\nfiables : 3/5"
      }
    ],
    "solution": "[Exemple]\ncourriel : fiable\ndns : rapide\ntransfert : fiable\nfiables : 2/3\n\n[Cas 1 — Un seul UDP]\nvoix : rapide\nfiables : 0/1\n\n[Cas 2 — Que du TCP]\nsite : fiable\nbanque : fiable\nfiables : 2/2\n\n[Cas 3 — Cinq flux]\na : fiable\nb : rapide\nc : rapide\nd : fiable\ne : fiable\nfiables : 3/5"
  },
  {
    "id": "re-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Lire une adresse MAC",
    "goal": "Valider une adresse MAC : 48 bits, soit exactement 12 chiffres hexadécimaux.",
    "brief": "<p>Analysez chaque ligne proposée « carte mac » : mac est une suite de caractères prétendant être une adresse MAC (sans séparateurs, par exemple <code>aabbccddeeff</code>). Une MAC valide compte <strong>exactement 12 chiffres hexadécimaux</strong> (0-9, a-f, A-F) : les 6 premiers forment l'OUI du fabricant, les 6 derniers le numéro de série. Pour chaque ligne il Indiquez <code>carte : mac valide</code> ou <code>carte : mac invalide</code>. Il termine par <code>invalides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c5-e1) — Lire une adresse MAC\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule valide]\n# Données : 1\n# Données : srv 001A2B3C4D5E\nA_COMPLETER\n\n[Cas 2 — Trop longue]\n# Données : 2\n# Données : pc1 aabbccddeeff1\n# Données : pc2 aabbccddeeff\nA_COMPLETER\n\n[Cas 3 — Cinq cartes]\n# Données : 5\n# Données : a aabbccddeeff\n# Données : b AABBCCDDEEFF\n# Données : c aabbccddeegf\n# Données : d aabbccddee\n# Données : e zzbccddeeff1\nA_COMPLETER\n",
    "hints": [
      "Un case avec douze classes [0-9a-fA-F] de suite valide la forme : le motif doit couvrir tout le mot.",
      "Trop courte, trop longue ou avec un caractère étranger : tout tombe dans le cas invalide."
    ],
    "examples": [
      {
        "stdin": "3\npc1 aabbccddeeff\npc2 aabbccdd\npc3 aabbccddeexf\n",
        "expected": "pc1 : mac valide\npc2 : mac invalide\npc3 : mac invalide\ninvalides : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Une seule valide",
        "stdin": "cas:1",
        "expected": "srv : mac valide\ninvalides : 0/1"
      },
      {
        "label": "Trop longue",
        "stdin": "cas:2",
        "expected": "pc1 : mac invalide\npc2 : mac valide\ninvalides : 1/2"
      },
      {
        "label": "Cinq cartes",
        "stdin": "cas:3",
        "expected": "a : mac valide\nb : mac valide\nc : mac invalide\nd : mac invalide\ne : mac invalide\ninvalides : 3/5"
      }
    ],
    "solution": "[Exemple]\npc1 : mac valide\npc2 : mac invalide\npc3 : mac invalide\ninvalides : 2/3\n\n[Cas 1 — Une seule valide]\nsrv : mac valide\ninvalides : 0/1\n\n[Cas 2 — Trop longue]\npc1 : mac invalide\npc2 : mac valide\ninvalides : 1/2\n\n[Cas 3 — Cinq cartes]\na : mac valide\nb : mac valide\nc : mac invalide\nd : mac invalide\ne : mac invalide\ninvalides : 3/5"
  },
  {
    "id": "re-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Réseau ou hôte",
    "goal": "Découper une adresse IP selon sa classe : quel octet appartient à la partie réseau, lequel à la partie hôte.",
    "brief": "<p>Analysez chaque ligne proposée « classe octet » : classe vaut <code>a</code> (1 octet réseau), <code>b</code> (2 octets réseau) ou <code>c</code> (3 octets réseau) ; octet vaut <code>o1</code>, <code>o2</code>, <code>o3</code> ou <code>o4</code>. Pour chaque ligne il Indiquez <code>octet : reseau</code> si l'octet appartient à la partie réseau de cette classe, <code>octet : hote</code> sinon. Il termine par <code>reseau : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c5-e2) — Réseau ou hôte\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Classe A, premier octet]\n# Données : 1\n# Données : a o1\nA_COMPLETER\n\n[Cas 2 — Classe C, tout le dernier]\n# Données : 2\n# Données : c o3\n# Données : c o4\nA_COMPLETER\n\n[Cas 3 — Six lignes]\n# Données : 6\n# Données : b o1\n# Données : b o3\n# Données : b o4\n# Données : a o4\n# Données : a o1\n# Données : c o2\nA_COMPLETER\n",
    "hints": [
      "Un case sur la classe fixe le nombre d'octets réseau : a 1, b 2, c 3.",
      "Un second case sur l'octet (o1 à o4) compare son rang à ce nombre."
    ],
    "examples": [
      {
        "stdin": "5\nc o1\nc o2\nc o4\na o2\nb o2\n",
        "expected": "o1 : reseau\no2 : reseau\no4 : hote\no2 : hote\no2 : reseau\nreseau : 3/5"
      }
    ],
    "tests": [
      {
        "label": "Classe A, premier octet",
        "stdin": "cas:1",
        "expected": "o1 : reseau\nreseau : 1/1"
      },
      {
        "label": "Classe C, tout le dernier",
        "stdin": "cas:2",
        "expected": "o3 : reseau\no4 : hote\nreseau : 1/2"
      },
      {
        "label": "Six lignes",
        "stdin": "cas:3",
        "expected": "o1 : reseau\no3 : hote\no4 : hote\no4 : hote\no1 : reseau\no2 : reseau\nreseau : 3/6"
      }
    ],
    "solution": "[Exemple]\no1 : reseau\no2 : reseau\no4 : hote\no2 : hote\no2 : reseau\nreseau : 3/5\n\n[Cas 1 — Classe A, premier octet]\no1 : reseau\nreseau : 1/1\n\n[Cas 2 — Classe C, tout le dernier]\no3 : reseau\no4 : hote\nreseau : 1/2\n\n[Cas 3 — Six lignes]\no1 : reseau\no3 : hote\no4 : hote\no4 : hote\no1 : reseau\no2 : reseau\nreseau : 3/6"
  },
  {
    "id": "re-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La classe de l'adresse",
    "goal": "Identifier la classe IPv4 par le premier octet : A (1-126), B (128-191), C (192-223), D et E réservées.",
    "brief": "<p>Analysez chaque ligne proposée « adresse premieroctet » : premieroctet est un entier (0 à 255). Pour chaque ligne il Indiquez : <code>adresse : classe A</code> (1-126), <code>adresse : classe B</code> (128-191), <code>adresse : classe C</code> (192-223), <code>adresse : classe D</code> (224-239, multicast), <code>adresse : classe E</code> (240-254, expérimentale), <code>adresse : boucle locale</code> (127) ou <code>adresse : reservee</code> (0 et 255). Il termine par <code>speciales : X/n</code> (boucle locale et réservées).</p>",
    "starter": "# Grille d'analyse (re-c5-e3) — La classe de l'adresse\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Boucle locale]\n# Données : 1\n# Données : localhost 127\nA_COMPLETER\n\n[Cas 2 — Classe E]\n# Données : 2\n# Données : labo 240\n# Données : pmi 193\nA_COMPLETER\n\n[Cas 3 — Six adresses]\n# Données : 6\n# Données : a 1\n# Données : b 126\n# Données : c 128\n# Données : d 191\n# Données : e 255\n# Données : f 0\nA_COMPLETER\n",
    "hints": [
      "Une suite de if/elif avec -le et -ge évite le case : les tranches sont numériques.",
      "Boucle locale (127), 0 et 255 sont les cas « speciales » à compter."
    ],
    "examples": [
      {
        "stdin": "4\nrc 10\nuni 172\npmi 192\ngroupe 224\n",
        "expected": "rc : classe A\nuni : classe B\npmi : classe C\ngroupe : classe D\nspeciales : 0/4"
      }
    ],
    "tests": [
      {
        "label": "Boucle locale",
        "stdin": "cas:1",
        "expected": "localhost : boucle locale\nspeciales : 1/1"
      },
      {
        "label": "Classe E",
        "stdin": "cas:2",
        "expected": "labo : classe E\npmi : classe C\nspeciales : 0/2"
      },
      {
        "label": "Six adresses",
        "stdin": "cas:3",
        "expected": "a : classe A\nb : classe A\nc : classe B\nd : classe B\ne : reservee\nf : reservee\nspeciales : 2/6"
      }
    ],
    "solution": "[Exemple]\nrc : classe A\nuni : classe B\npmi : classe C\ngroupe : classe D\nspeciales : 0/4\n\n[Cas 1 — Boucle locale]\nlocalhost : boucle locale\nspeciales : 1/1\n\n[Cas 2 — Classe E]\nlabo : classe E\npmi : classe C\nspeciales : 0/2\n\n[Cas 3 — Six adresses]\na : classe A\nb : classe A\nc : classe B\nd : classe B\ne : reservee\nf : reservee\nspeciales : 2/6"
  },
  {
    "id": "re-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Emprunter des bits",
    "goal": "Calculer l'effet de l'emprunt de bits d'hôte : combien de sous-réseaux créés, combien d'hôtes valides chacun.",
    "brief": "<p>Analysez chaque ligne proposée « reseau emprunt » : emprunt est le nombre de bits empruntés à la partie hôte d'un /24 (entier de 1 à 6). Pour chaque ligne il Indiquez <code>reseau : /C (S sous-reseaux, H hotes)</code>, où C = 24 + emprunt, S = 2^emprunt et H = 2^(8-emprunt) - 2. Si l'emprunt vaut 7 ou plus, afficher <code>reseau : emprunt trop grand</code>.</p>",
    "starter": "# Grille d'analyse (re-c6-e1) — Emprunter des bits\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Emprunt d un bit]\n# Données : 1\n# Données : res1 1\nA_COMPLETER\n\n[Cas 2 — Emprunt trop grand]\n# Données : 2\n# Données : res1 7\n# Données : res2 3\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a 1\n# Données : b 2\n# Données : c 3\n# Données : d 4\n# Données : e 5\nA_COMPLETER\n",
    "hints": [
      "Le nombre d’adresses IP d’un bloc CIDR de préfixe /p vaut 2^(32 - p).",
      "Le nombre d’adresses utilisables pour les hôtes retire l’adresse réseau (première) et l’adresse de diffusion (dernière) : N_hôtes = 2^k - 2."
    ],
    "examples": [
      {
        "stdin": "3\nagence 3\nagence2 2\nagence3 1\n",
        "expected": "agence : /27 (8 sous-reseaux, 30 hotes)\nagence2 : /26 (4 sous-reseaux, 62 hotes)\nagence3 : /25 (2 sous-reseaux, 126 hotes)"
      }
    ],
    "tests": [
      {
        "label": "Emprunt d un bit",
        "stdin": "cas:1",
        "expected": "res1 : /25 (2 sous-reseaux, 126 hotes)"
      },
      {
        "label": "Emprunt trop grand",
        "stdin": "cas:2",
        "expected": "res1 : emprunt trop grand\nres2 : /27 (8 sous-reseaux, 30 hotes)"
      },
      {
        "label": "Cinq reseaux",
        "stdin": "cas:3",
        "expected": "a : /25 (2 sous-reseaux, 126 hotes)\nb : /26 (4 sous-reseaux, 62 hotes)\nc : /27 (8 sous-reseaux, 30 hotes)\nd : /28 (16 sous-reseaux, 14 hotes)\ne : /29 (32 sous-reseaux, 6 hotes)"
      }
    ],
    "solution": "[Exemple]\nagence : /27 (8 sous-reseaux, 30 hotes)\nagence2 : /26 (4 sous-reseaux, 62 hotes)\nagence3 : /25 (2 sous-reseaux, 126 hotes)\n\n[Cas 1 — Emprunt d un bit]\nres1 : /25 (2 sous-reseaux, 126 hotes)\n\n[Cas 2 — Emprunt trop grand]\nres1 : emprunt trop grand\nres2 : /27 (8 sous-reseaux, 30 hotes)\n\n[Cas 3 — Cinq reseaux]\na : /25 (2 sous-reseaux, 126 hotes)\nb : /26 (4 sous-reseaux, 62 hotes)\nc : /27 (8 sous-reseaux, 30 hotes)\nd : /28 (16 sous-reseaux, 14 hotes)\ne : /29 (32 sous-reseaux, 6 hotes)"
  },
  {
    "id": "re-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le nouveau masque",
    "goal": "Convertir l'emprunt de bits en masque décimal : 3 bits empruntés sur le 4e octet donnent 255.255.255.224.",
    "brief": "<p>Analysez chaque ligne proposée « reseau emprunt » : emprunt est le nombre de bits mis à 1 dans le 4e octet du masque (entier de 1 à 6). Le 4e octet vaut 256 - 2^(8-emprunt) : 3 bits empruntés donnent 224, 2 bits donnent 192, etc. Pour chaque ligne il Indiquez <code>reseau : 255.255.255.X (/C)</code> où C = 24 + emprunt. Si l'emprunt vaut 7 ou plus, afficher <code>reseau : emprunt trop grand</code>. Il termine par <code>slash28 : X/n</code> (les emprunts de 4 bits).</p>",
    "starter": "# Grille d'analyse (re-c6-e2) — Le nouveau masque\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul bit]\n# Données : 1\n# Données : res1 1\nA_COMPLETER\n\n[Cas 2 — Emprunt trop grand]\n# Données : 2\n# Données : res1 8\n# Données : res2 2\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a 1\n# Données : b 2\n# Données : c 3\n# Données : d 4\n# Données : e 6\nA_COMPLETER\n",
    "hints": [
      "L'octet vaut 256 moins la puissance de deux restante : 256 - (1 << (8 - emprunt)).",
      "L'emprunt de 4 bits donne 240 : c'est le /28 à compter."
    ],
    "examples": [
      {
        "stdin": "3\nagence 3\nagence2 2\nagence3 4\n",
        "expected": "agence : 255.255.255.224 (/27)\nagence2 : 255.255.255.192 (/26)\nagence3 : 255.255.255.240 (/28)\nslash28 : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Un seul bit",
        "stdin": "cas:1",
        "expected": "res1 : 255.255.255.128 (/25)\nslash28 : 0/1"
      },
      {
        "label": "Emprunt trop grand",
        "stdin": "cas:2",
        "expected": "res1 : emprunt trop grand\nres2 : 255.255.255.192 (/26)\nslash28 : 0/2"
      },
      {
        "label": "Cinq reseaux",
        "stdin": "cas:3",
        "expected": "a : 255.255.255.128 (/25)\nb : 255.255.255.192 (/26)\nc : 255.255.255.224 (/27)\nd : 255.255.255.240 (/28)\ne : 255.255.255.252 (/30)\nslash28 : 1/5"
      }
    ],
    "solution": "[Exemple]\nagence : 255.255.255.224 (/27)\nagence2 : 255.255.255.192 (/26)\nagence3 : 255.255.255.240 (/28)\nslash28 : 1/3\n\n[Cas 1 — Un seul bit]\nres1 : 255.255.255.128 (/25)\nslash28 : 0/1\n\n[Cas 2 — Emprunt trop grand]\nres1 : emprunt trop grand\nres2 : 255.255.255.192 (/26)\nslash28 : 0/2\n\n[Cas 3 — Cinq reseaux]\na : 255.255.255.128 (/25)\nb : 255.255.255.192 (/26)\nc : 255.255.255.224 (/27)\nd : 255.255.255.240 (/28)\ne : 255.255.255.252 (/30)\nslash28 : 1/5"
  },
  {
    "id": "re-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan d'adressage VLSM",
    "goal": "Dimensionner les sous-réseaux de chaque site : le plus petit bloc dont la capacité couvre les hôtes demandés.",
    "brief": "<p>Analysez chaque ligne proposée « site hotes » : hotes est le nombre d'hôtes requis (entier de 1 à 254). Pour chaque site le script cherche le plus petit bloc valable : la capacité vaut 2^k - 2 hôtes pour k bits d'hôte, et le préfixe vaut 32 - k. Il Indiquez <code>site : /P (C hotes)</code> où P est le préfixe et C la capacité du bloc retenu. Si plus de 254 hôtes sont demandés, afficher <code>site : impossible</code>. Il termine par <code>liaisons : X/n</code> (les sites servis en /30, capacité 2 : liaisons point-à-point).</p>",
    "starter": "# Grille d'analyse (re-c6-e3) — Le plan d'adressage VLSM\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule liaison]\n# Données : 1\n# Données : routeurs 2\nA_COMPLETER\n\n[Cas 2 — Besoin impossible]\n# Données : 2\n# Données : datacenter 500\n# Données : bureau 10\nA_COMPLETER\n\n[Cas 3 — Cinq sites]\n# Données : 5\n# Données : a 2\n# Données : b 10\n# Données : c 50\n# Données : d 1\n# Données : e 200\nA_COMPLETER\n",
    "hints": [
      "Une boucle while augmente k tant que (2^k - 2) est inférieur au besoin ; le préfixe vaut 32 - k.",
      "Un /30 a une capacité de 2 hôtes : c'est la liaison point-à-point du plan."
    ],
    "examples": [
      {
        "stdin": "4\nbureau1 30\nbureau2 6\nliaison 2\nsiege 100\n",
        "expected": "bureau1 : /27 (30 hotes)\nbureau2 : /29 (6 hotes)\nliaison : /30 (2 hotes)\nsiege : /25 (126 hotes)\nliaisons : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Une seule liaison",
        "stdin": "cas:1",
        "expected": "routeurs : /30 (2 hotes)\nliaisons : 1/1"
      },
      {
        "label": "Besoin impossible",
        "stdin": "cas:2",
        "expected": "datacenter : impossible\nbureau : /28 (14 hotes)\nliaisons : 0/2"
      },
      {
        "label": "Cinq sites",
        "stdin": "cas:3",
        "expected": "a : /30 (2 hotes)\nb : /28 (14 hotes)\nc : /26 (62 hotes)\nd : /30 (2 hotes)\ne : /24 (254 hotes)\nliaisons : 2/5"
      }
    ],
    "solution": "[Exemple]\nbureau1 : /27 (30 hotes)\nbureau2 : /29 (6 hotes)\nliaison : /30 (2 hotes)\nsiege : /25 (126 hotes)\nliaisons : 1/4\n\n[Cas 1 — Une seule liaison]\nrouteurs : /30 (2 hotes)\nliaisons : 1/1\n\n[Cas 2 — Besoin impossible]\ndatacenter : impossible\nbureau : /28 (14 hotes)\nliaisons : 0/2\n\n[Cas 3 — Cinq sites]\na : /30 (2 hotes)\nb : /28 (14 hotes)\nc : /26 (62 hotes)\nd : /30 (2 hotes)\ne : /24 (254 hotes)\nliaisons : 2/5"
  }
];
