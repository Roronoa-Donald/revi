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
    "goal": "Distinguer un réseau local d'une interconnexion de sites distants, sans seuil de distance imposé.",
    "brief": "<p>Analysez chaque ligne proposée « reseau portee » : portee vaut <code>local</code> (immeuble, campus, salle) ou <code>etendu</code> (villes, pays). Pour chaque ligne, indiquez <code>reseau : LAN</code> ou <code>reseau : WAN</code>. Terminez par deux lignes de comptage : <code>lan : X</code> puis <code>wan : Y</code>.</p>",
    "starter": "# Grille d'analyse (re-c1-e1) — LAN ou WAN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série A]\n# Données : 1\n# Données : national etendu\nA_COMPLETER\n\n[Cas 2 — Série B]\n# Données : 2\n# Données : pmi local\n# Données : campus local\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : salle local\n# Données : pays etendu\n# Données : ville etendu\n# Données : classe local\n# Données : continent etendu\nA_COMPLETER\n",
    "hints": [
      "Quel critère de portée permet de distinguer les deux types de réseau présentés ?",
      "Comptez les LAN et les WAN au fil des lignes ; les deux totaux s'écrivent à la fin, lan d'abord, wan ensuite.",
      "Ne vous fiez pas à une distance arbitraire en mètres : un réseau local sur un seul site reste LAN, l interconnexion inter-sites relève du WAN."
    ],
    "examples": [
      {
        "stdin": "3\natelier local\nfiliale etendu\nbureau local\n",
        "expected": "atelier : LAN\nfiliale : WAN\nbureau : LAN\nlan : 2\nwan : 1"
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
    "solution": "[Exemple]\natelier : LAN\nfiliale : WAN\nbureau : LAN\nlan : 2\nwan : 1\n\n[Cas 1 — Un seul etendu]\nnational : WAN\nlan : 0\nwan : 1\n\n[Cas 2 — Deux locaux]\npmi : LAN\ncampus : LAN\nlan : 2\nwan : 0\n\n[Cas 3 — Cinq reseaux]\nsalle : LAN\npays : WAN\nville : WAN\nclasse : LAN\ncontinent : WAN\nlan : 2\nwan : 3",
    "takeaway": "À retenir : Distinguer un réseau local d'une interconnexion de sites distants, sans seuil de distance imposé."
  },
  {
    "id": "re-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Poste-à-poste ou client-serveur",
    "goal": "Comparer le partage entre pairs et un service fourni par un serveur dans deux scénarios simplifiés.",
    "brief": "<p>Chaque ligne « reseau modele » décrit ici un scénario simplifié : <code>pairapair</code> indique des postes qui partagent entre eux ; <code>centralise</code> indique un service fourni par un serveur. Dans cette grille seulement, nommez le premier modèle <code>workgroup</code> et le second <code>client-serveur</code> ; le terme workgroup ne désigne pas tous les réseaux poste-à-poste.</p><p>Pour chaque ligne, indiquez <code>reseau : modèle</code>. Terminez par <code>centralises : &lt;oui ou non&gt;</code>, selon qu’au moins un scénario comporte le service centralisé.</p>",
    "starter": "# Grille d'analyse (re-c1-e2) — Poste-à-poste ou client-serveur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série A]\n# Données : 1\n# Données : agence centralise\nA_COMPLETER\n\n[Cas 2 — Série B]\n# Données : 2\n# Données : tpe pairapair\n# Données : cabine pairapair\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a pairapair\n# Données : b centralise\n# Données : c pairapair\n# Données : d pairapair\n# Données : e centralise\nA_COMPLETER\n",
    "hints": [
      "Le service est-il réparti entre les postes ou fourni par un serveur central ?",
      "Après avoir classé chaque ligne, que faut-il constater pour conclure sur l’ensemble ?",
      "Comparez la présence d un serveur centralisé d annuaire ou de fichiers (« client-serveur ») à l administration poste par poste (« workgroup »)."
    ],
    "examples": [
      {
        "stdin": "3\natelier pairapair\ncentre centralise\nsdb pairapair\n",
        "expected": "atelier : workgroup\ncentre : client-serveur\nsdb : workgroup\ncentralises : oui"
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
    "solution": "[Exemple]\natelier : workgroup\ncentre : client-serveur\nsdb : workgroup\ncentralises : oui\n\n[Cas 1 — Un seul centralise]\nagence : client-serveur\ncentralises : oui\n\n[Cas 2 — Que du pairapair]\ntpe : workgroup\ncabine : workgroup\ncentralises : non\n\n[Cas 3 — Cinq reseaux]\na : workgroup\nb : client-serveur\nc : workgroup\nd : workgroup\ne : client-serveur\ncentralises : oui",
    "takeaway": "À retenir : Comparer le partage entre pairs et un service fourni par un serveur dans deux scénarios simplifiés."
  },
  {
    "id": "re-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Les cinq types de réseaux",
    "goal": "Ranger les réseaux dans les cinq familles du support : PAN, LAN, WLAN, MAN, WAN.",
    "brief": "<p>Analysez chaque ligne « reseau code » : <code>p</code> désigne un PAN, <code>l</code> un LAN filaire dans cet exemple, <code>w</code> un WLAN, <code>m</code> un MAN et <code>g</code> un WAN. Pour chaque ligne, indiquez <code>reseau : TYPE</code> avec le type en majuscules.</p><p>Terminez par <code>wlan : &lt;nombre de WLAN&gt;/&lt;nombre de réseaux&gt;</code>. Ce décompte concerne uniquement les WLAN identifiés par le code w : un PAN peut lui aussi être sans fil.</p>",
    "starter": "# Grille d'analyse (re-c1-e3) — Les cinq types de réseaux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série A]\n# Données : 1\n# Données : lycee w\nA_COMPLETER\n\n[Cas 2 — Série B]\n# Données : 2\n# Données : studio p\n# Données : campus m\nA_COMPLETER\n\n[Cas 3 — Six reseaux]\n# Données : 6\n# Données : a p\n# Données : b l\n# Données : c w\n# Données : d m\n# Données : e g\n# Données : f w\nA_COMPLETER\n",
    "hints": [
      "Pour chaque code, quelle portée ou quelle technologie caractérise le réseau ?",
      "Quelle catégorie comptez-vous ici, et pourquoi ce nombre ne représente-t-il pas tous les réseaux sans fil possibles ?",
      "Distinguez Bluetooth/USB à courte portée (PAN), Wi-Fi sans fil local (WLAN), campus (LAN), métropole (MAN) et opérateur (WAN) avant le décompte WLAN."
    ],
    "examples": [
      {
        "stdin": "5\niphone p\nbox l\nwifi w\nmairie m\noperateur g\n",
        "expected": "iphone : PAN\nbox : LAN\nwifi : WLAN\nmairie : MAN\noperateur : WAN\nwlan : 1/5"
      }
    ],
    "tests": [
      {
        "label": "Un seul WLAN",
        "stdin": "cas:1",
        "expected": "lycee : WLAN\nwlan : 1/1"
      },
      {
        "label": "Aucun WLAN",
        "stdin": "cas:2",
        "expected": "studio : PAN\ncampus : MAN\nwlan : 0/2"
      },
      {
        "label": "Six reseaux",
        "stdin": "cas:3",
        "expected": "a : PAN\nb : LAN\nc : WLAN\nd : MAN\ne : WAN\nf : WLAN\nwlan : 2/6"
      }
    ],
    "solution": "[Exemple]\niphone : PAN\nbox : LAN\nwifi : WLAN\nmairie : MAN\noperateur : WAN\nwlan : 1/5\n\n[Cas 1 — Un seul WLAN]\nlycee : WLAN\nwlan : 1/1\n\n[Cas 2 — Aucun WLAN]\nstudio : PAN\ncampus : MAN\nwlan : 0/2\n\n[Cas 3 — Six reseaux]\na : PAN\nb : LAN\nc : WLAN\nd : MAN\ne : WAN\nf : WLAN\nwlan : 2/6",
    "takeaway": "À retenir : Ranger les réseaux dans les cinq familles du support : PAN, LAN, WLAN, MAN, WAN."
  },
  {
    "id": "re-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Bus, anneau, étoile",
    "goal": "Caractériser les trois topologies : bus fragile, anneau en boucle, étoile centralisée.",
    "brief": "<p>Analysez l'architecture physique décrite pour chaque site (point central / commutateur → étoile, segment partagé unique → bus, chaîne fermée à jeton → anneau). Pour chaque ligne, indiquez <code>reseau : fragile</code> (bus), <code>reseau : boucle</code> (anneau) ou <code>reseau : centralise</code> (étoile). Terminez par <code>etoiles : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c2-e1) — Bus, anneau, étoile\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un point central]\n# Données : 1\n# Données : tour (liaisons individuelles vers un commutateur central)\nA_COMPLETER\n\n[Cas 2 — Deux segments partagés]\n# Données : 2\n# Données : usine (câble coaxial unique sans switch central)\n# Données : labo (support partagé terminé par deux bouchons 50 ohms)\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a (backbone coaxial partagé entre tous les postes)\n# Données : b (câblage dédié de chaque PC vers le switch d'étage)\n# Données : c (postes chaînés en cercle fermé avec passage de jeton)\n# Données : d (liaisons point à point vers un concentrateur central)\n# Données : e (câble linéaire partagé sensible à toute coupure)\nA_COMPLETER\n",
    "hints": [
      "Identifiez la topologie décrite (bus linéaire partagé, anneau fermé, étoile autour d’un switch), puis traduisez en fragile, boucle ou centralise.",
      "Le compteur final compte exactement les architectures centralisées (en étoile).",
      "Si une rupture du média isole tous les postes, notez « fragile » ; si les postes forment une boucle à jeton, « boucle » ; sinon « centralise »."
    ],
    "examples": [
      {
        "stdin": "3\nthinnet (câble coaxial unique 10Base2)\ntokenring (cercle fermé à jeton)\ncampus (liaison dédiée vers un switch central)\n",
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
    "solution": "[Exemple]\nthinnet : fragile\ntokenring : boucle\ncampus : centralise\netoiles : 1/3\n\n[Cas 1 — Une seule etoile]\ntour : centralise\netoiles : 1/1\n\n[Cas 2 — Deux bus]\nusine : fragile\nlabo : fragile\netoiles : 0/2\n\n[Cas 3 — Cinq reseaux]\na : fragile\nb : centralise\nc : boucle\nd : centralise\ne : fragile\netoiles : 2/5",
    "takeaway": "À retenir : Caractériser les trois topologies : bus fragile, anneau en boucle, étoile centralisée."
  },
  {
    "id": "re-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Choisir le support",
    "goal": "Conseiller le bon support de transmission : UTP 100 m, STP blindé, fibre longue distance, Wi-Fi sans fil.",
    "brief": "<p>Analysez chaque contrainte de déploiement et indiquez <code>reseau : conseille</code> (paire torsadée UTP &le; 100 m, paire torsadée blindée STP anti-interférences, ou fibre optique longue distance), <code>reseau : sans fil</code> (radio 802.11 / mobilité) ou <code>reseau : support inconnu</code> (support hors référentiel, ex. coaxial obsolète). Terminez par <code>blindes : X/n</code> (nombre de liaisons nécessitant un câble blindé STP).</p>",
    "starter": "# Grille d'analyse (re-c2-e2) — Choisir le support\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul blindé]\n# Données : 1\n# Données : chaudiere (paires torsadées blindées anti-moteurs EM)\nA_COMPLETER\n\n[Cas 2 — Support hors référentiel]\n# Données : 2\n# Données : bureau (ancien câble coaxial BNC 10Base2)\n# Données : salle (câble RJ45 Cat6 non blindé sur 35 m)\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a (paire torsadée standard 50 m en open-space calme)\n# Données : b (couverture radio 802.11 pour tablettes mobiles)\n# Données : c (liaison cuivre blindée près d'armoires électriques)\n# Données : d (liaison inter-bâtiments 2 km très haut débit optique)\n# Données : e (paire torsadée avec écran métallique anti-bruit)\nA_COMPLETER\n",
    "hints": [
      "Distinguez les supports cuivre (UTP non blindé, STP blindé), la fibre optique, les ondes radio 802.11 (« sans fil ») et le coaxial hors référentiel (« support inconnu »).",
      "Seuls les déploiements nécessitant un blindage contre les perturbations électromagnétiques comptent dans « blindes : X/n ».",
      "Répondez strictement par « nom : conseille », « nom : sans fil » ou « nom : support inconnu », suivi du décompte des liens blindés."
    ],
    "examples": [
      {
        "stdin": "4\nbureau (RJ45 non blindé < 100 m)\natelier (paire torsadée avec blindage EM)\ncampus (fibre monomode 800 m)\nreunion (borne radio 802.11)\n",
        "expected": "bureau : conseille\natelier : conseille\ncampus : conseille\nreunion : sans fil\nblindes : 1/4"
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
    "solution": "[Exemple]\nbureau : conseille\natelier : conseille\ncities : conseille\nreunion : sans fil\nblindes : 1/4\n\n[Cas 1 — Un seul blindé]\nchaudiere : conseille\nblindes : 1/1\n\n[Cas 2 — Support inconnu]\nbureau : support inconnu\nsalle : conseille\nblindes : 0/2\n\n[Cas 3 — Cinq reseaux]\na : conseille\nb : sans fil\nc : conseille\nd : conseille\ne : conseille\nblindes : 2/5",
    "takeaway": "À retenir : Conseiller le bon support de transmission : UTP 100 m, STP blindé, fibre longue distance, Wi-Fi sans fil."
  },
  {
    "id": "re-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La panne de câble",
    "goal": "Simuler une coupure dans un bus, un double anneau redondant compatible et une étoile.",
    "brief": "<p>Analysez chaque ligne « reseau topo panne » : topo vaut <code>bus</code>, <code>anneau</code> ou <code>etoile</code>. Dans cette grille, le code anneau désigne un double anneau redondant compatible : une reconfiguration relie les portions intactes au moyen du secondaire après une seule coupure. Cette hypothèse ne vaut pas pour tous les anneaux. Le champ panne vaut <code>ok</code> ou <code>coupe</code>. Indiquez <code>reseau : liaison correcte</code> (ok), sinon <code>reseau : reseau hors service</code> (bus), <code>reseau : bascule anneau secondaire</code> (résultat abrégé de la reconfiguration du double anneau) ou <code>reseau : un poste isole</code> (étoile). Terminez par <code>pannes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c2-e3) — La panne de câble\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Anneau double]\n# Données : 1\n# Données : r1 anneau coupe\nA_COMPLETER\n\n[Cas 2 — Rien ne casse]\n# Données : 2\n# Données : a etoile ok\n# Données : b anneau ok\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a bus coupe\n# Données : b etoile ok\n# Données : c bus ok\n# Données : d etoile coupe\n# Données : e anneau coupe\nA_COMPLETER\n",
    "hints": [
      "Un if sur panne, puis un case sur topo : ok court-circuite tout.",
      "Le compteur suit exactement les lignes « coupe », quelle que soit la topologie.",
      "Testez d abord si la liaison est intacte (« liaison correcte ») ; en cas de coupure, appliquez l effet propre à bus, étoile ou double anneau redondant."
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
    "solution": "[Exemple]\na : liaison correcte\nb : reseau hors service\nc : bascule anneau secondaire\nd : un poste isole\npannes : 3/4\n\n[Cas 1 — Anneau double]\nr1 : bascule anneau secondaire\npannes : 1/1\n\n[Cas 2 — Rien ne casse]\na : liaison correcte\nb : liaison correcte\npannes : 0/2\n\n[Cas 3 — Cinq reseaux]\na : reseau hors service\nb : liaison correcte\nc : liaison correcte\nd : un poste isole\ne : bascule anneau secondaire\npannes : 3/5",
    "takeaway": "À retenir : Simuler une coupure dans un bus, un double anneau redondant compatible et une étoile."
  },
  {
    "id": "re-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les sept couches OSI",
    "goal": "Ranger chaque élément dans sa couche OSI, de la couche 1 physique à la couche 7 application.",
    "brief": "<p>Analysez chaque ligne proposée « objet couche » : couche vaut <code>c1</code> à <code>c7</code>. Pour chaque ligne, indiquez <code>objet : N-nom</code>, où N est le numéro et nom la couche : <code>1-physique</code>, <code>2-liaison</code>, <code>3-reseau</code>, <code>4-transport</code>, <code>5-session</code>, <code>6-presentation</code>, <code>7-application</code>. Terminez par <code>routeurs : X/n</code> (les objets de la couche 3).</p>",
    "starter": "# Grille d'analyse (re-c3-e1) — Les sept couches OSI\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul c3]\n# Données : 1\n# Données : paquet c3\nA_COMPLETER\n\n[Cas 2 — Couche 2]\n# Données : 2\n# Données : trame c1\n# Données : mac c2\nA_COMPLETER\n\n[Cas 3 — Cinq objets]\n# Données : 5\n# Données : a c7\n# Données : b c2\n# Données : c c3\n# Données : d c5\n# Données : e c6\nA_COMPLETER\n",
    "hints": [
      "Un case à sept valeurs, chaque valeur donnant « N-nom ».",
      "La couche 3 (reseau) est celle des routeurs : c'est elle qu'on compte.",
      "Reliez signal/câble à 1-physique, trame/MAC à 2-liaison, paquet/IP à 3-reseau, port/TCP à 4-transport et protocole métier à 7-application."
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
    "solution": "[Exemple]\ncable : 1-physique\nadresse : 3-reseau\nport : 4-transport\nnavigateur : 7-application\nrouteurs : 1/4\n\n[Cas 1 — Un seul c3]\npaquet : 3-reseau\nrouteurs : 1/1\n\n[Cas 2 — Couche 2]\ntrame : 1-physique\nmac : 2-liaison\nrouteurs : 0/2\n\n[Cas 3 — Cinq objets]\na : 7-application\nb : 2-liaison\nc : 3-reseau\nd : 5-session\ne : 6-presentation\nrouteurs : 1/5",
    "takeaway": "À retenir : Ranger chaque élément dans sa couche OSI, de la couche 1 physique à la couche 7 application."
  },
  {
    "id": "re-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'inventaire du local réseau de l'agence",
    "exampleTitle": "Exemple résolu — l'inventaire du CDI du collège",
    "goal": "Associer chaque équipement du local réseau à sa couche OSI.",
    "brief": "<p><strong>Énoncé.</strong> À l'agence bancaire du centre-ville, le technicien dresse l'inventaire du local technique et de ses logiciels :</p><table><tr><th>Élément inventorié</th><th>Rôle constaté</th></tr><tr><td>Câble RJ45 et connecteurs</td><td>relier physiquement les prises des guichets</td></tr><tr><td>Commutateur (switch)</td><td>acheminer les trames entre guichets</td></tr><tr><td>Routeur</td><td>acheminer les paquets vers le réseau de la banque</td></tr><tr><td>Serveur de messagerie et navigateurs</td><td>services utilisés par les conseillers</td></tr><tr><td>Logiciel de session à distance</td><td>ouvrir, coordonner et terminer les sessions des conseillers</td></tr></table><p>Répondez par le numéro de la couche (1 à 7), sauf la question 5 : les deux sigles séparés par un espace.</p><ol><li>À quelle couche OSI travaille le commutateur ?</li><li>À quelle couche OSI travaille le routeur ?</li><li>Le câble RJ45 et ses connecteurs appartiennent à quelle couche ?</li><li>Le serveur de messagerie et le navigateur appartiennent à quelle couche ?</li><li>Les adresses IP travaillent en couche 3 ; quels sont les deux protocoles de la couche 4, celle des ports ?</li><li>Le logiciel qui ouvre, coordonne et termine les sessions illustre quelle couche ?</li></ol>",
    "starter": "# Exercice — L'inventaire du local réseau de l'agence\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Numéro de la couche (1 à 7) ; question 5 : les deux sigles séparés par un espace.\n\n[Question 1 — Couche du commutateur]\nA_COMPLETER\n\n[Question 2 — Couche du routeur]\nA_COMPLETER\n\n[Question 3 — Couche du câble RJ45]\nA_COMPLETER\n\n[Question 4 — Couche de la messagerie et des navigateurs]\nA_COMPLETER\n\n[Question 5 — Les deux protocoles de la couche 4]\nA_COMPLETER\n\n[Question 6 — Couche des sessions]\nA_COMPLETER\n",
    "hints": [
      "Chaque couche héberge ses équipements : câble en 1, commutateur en 2, routeur en 3 ; les adresses IP accompagnent le routeur en 3, les ports vivent en 4.",
      "Les couches hautes se partagent les logiciels : la session synchronise le dialogue, la présentation met en forme, l'application sert directement l'utilisateur.",
      "Contrôle : le routeur et les adresses IP partagent la même couche, celle des chemins entre réseaux ; le commutateur reste en dessous, avec les trames."
    ],
    "examples": [
      {
        "stdin": "Au CDI d'un collège, on inventorie : le commutateur du CDI, le routeur du fournisseur d'accès, les prises câblées des salles, le serveur web du CDI.\n\n1) Commutateur : couche 2.\n2) Routeur : couche 3.\n3) Prises câblées : couche 1.\n4) Serveur web : couche 7.\n5) Les ports TCP et UDP vivent en couche 4.",
        "expected": "commutateur : 2 — routeur : 3 — prises : 1 — serveur web : 7 — ports : 4",
        "note": "Commutateur 2, routeur 3 : c'est l'inversion classique à éviter ; les adresses IP accompagnent le routeur en 3."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Couche du commutateur",
        "stdin": "q:1",
        "expected": "2||couche 2||liaison||liaison de donnees"
      },
      {
        "label": "Question 2 — Couche du routeur",
        "stdin": "q:2",
        "expected": "3||couche 3||reseau"
      },
      {
        "label": "Question 3 — Couche du câble RJ45",
        "stdin": "q:3",
        "expected": "1||couche 1||physique"
      },
      {
        "label": "Question 4 — Couche de la messagerie et des navigateurs",
        "stdin": "q:4",
        "expected": "7||couche 7||application"
      },
      {
        "label": "Question 5 — Les deux protocoles de la couche 4",
        "stdin": "q:5",
        "expected": "tcp udp||tcp et udp||udp tcp||udp et tcp"
      },
      {
        "label": "Question 6 — Couche des sessions",
        "stdin": "q:6",
        "expected": "5||couche 5||session"
      }
    ],
    "solution": "[Question 1 — Couche du commutateur]\n2\n\n[Question 2 — Couche du routeur]\n3\n\n[Question 3 — Couche du câble RJ45]\n1\n\n[Question 4 — Couche de la messagerie et des navigateurs]\n7\n\n[Question 5 — Les deux protocoles de la couche 4]\ntcp udp\n\n[Question 6 — Couche des sessions]\n5",
    "takeaway": "1) Le commutateur achemine les trames (sous-couches MAC et LLC) : couche 2, liaison de données.\n2) Le routeur achemine les paquets entre réseaux : couche 3, réseau.\n3) Le câble RJ45 et ses connecteurs décrivent le support : couche 1, physique.\n4) Le serveur de messagerie et le navigateur servent directement les conseillers : couche 7, application.\n5) Les deux protocoles de la couche 4 (transport), celle des ports : TCP et UDP.\n6) Le logiciel qui ouvre, coordonne et termine les sessions : couche 5, session.\nContrôle : câble (1), commutateur (2), routeur (3), TCP/UDP et ports (4), session (5), présentation (6), application (7) — six des sept couches de l'inventaire sont nommées, seule la présentation (6) n'y figure pas."
  },
  {
    "id": "re-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Le dépannage par couches",
    "goal": "Appliquer la méthode du professionnel : en cas de panne, remonter les couches OSI depuis la couche physique.",
    "brief": "<p>Analysez chaque ligne proposée « incident couche » : couche est la couche où se situe la panne — <code>c1</code> (câble débranché), <code>c2</code> (carte réseau fautive), <code>c3</code> (routage absent) ou <code>c7</code> (application en cause). Pour chaque ligne, indiquez : <code>incident : verifier les cables</code> (c1), <code>incident : verifier la carte</code> (c2), <code>incident : verifier le routage</code> (c3), <code>incident : verifier les applications</code> (c7). Terminez par <code>physiques : X/n</code> (les pannes de couche 1, les plus fréquentes).</p>",
    "starter": "# Grille d'analyse (re-c3-e3) — Le dépannage par couches\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cable debranche]\n# Données : 1\n# Données : imprimante c1\nA_COMPLETER\n\n[Cas 2 — Routage absent]\n# Données : 2\n# Données : vlan c3\n# Données : appli c7\nA_COMPLETER\n\n[Cas 3 — Cinq incidents]\n# Données : 5\n# Données : a c1\n# Données : b c3\n# Données : c c2\n# Données : d c1\n# Données : e c7\nA_COMPLETER\n",
    "hints": [
      "Un case à quatre couches, quatre gestes : cables, carte, routage, applications.",
      "Le compteur suit exactement les incidents de couche 1.",
      "Partez toujours du symptôme indiqué (c1 -> cables, c2 -> carte, c3 -> routage, c7 -> applications) sans oublier le décompte final « physiques : X/n »."
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
    "solution": "[Exemple]\npc1 : verifier les cables\npc2 : verifier la carte\nsrv : verifier le routage\nweb : verifier les applications\nphysiques : 1/4\n\n[Cas 1 — Cable debranche]\nimprimante : verifier les cables\nphysiques : 1/1\n\n[Cas 2 — Routage absent]\nvlan : verifier le routage\nappli : verifier les applications\nphysiques : 0/2\n\n[Cas 3 — Cinq incidents]\na : verifier les cables\nb : verifier le routage\nc : verifier la carte\nd : verifier les cables\ne : verifier les applications\nphysiques : 2/5",
    "takeaway": "À retenir : Appliquer la méthode du professionnel : en cas de panne, remonter les couches OSI depuis la couche physique."
  },
  {
    "id": "re-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Les quatre couches TCP/IP",
    "goal": "Ranger chaque élément dans les quatre couches du modèle TCP/IP : accès réseau, internet, transport, application.",
    "brief": "<p>Associez chaque protocole ou mécanisme réseau à sa couche du modèle TCP/IP : <code>objet : acces-reseau</code>, <code>objet : internet</code>, <code>objet : transport</code> ou <code>objet : application</code>. Terminez par <code>transport : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c4-e1) — Les quatre couches TCP/IP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un protocole sans connexion]\n# Données : 1\n# Données : udp (acheminement par numéros de port sans ACK)\nA_COMPLETER\n\n[Cas 2 — Diagnostics et résolution locale]\n# Données : 2\n# Données : icmp (paquets echo-request de commande ping)\n# Données : arp (correspondance adresse IP vers adresse MAC)\nA_COMPLETER\n\n[Cas 3 — Cinq objets]\n# Données : 5\n# Données : a (trames IEEE 802.3 et adresses MAC RJ45)\n# Données : b (requêtes web HTTP GET/POST)\n# Données : c (paquets IPv4 et tables de routage)\n# Données : d (segments TCP numérotés de bout en bout)\n# Données : e (requêtes DNS de résolution de noms)\nA_COMPLETER\n",
    "hints": [
      "Situez le rôle : média/MAC (acces-reseau), adressage/routage IP (internet), ports/fiabilité de bout en bout (transport) ou service utilisateur (application).",
      "Le compteur final ne retient que les éléments de couche transport.",
      "Écrivez exactement « objet : acces-reseau | internet | transport | application » puis « transport : X/n »."
    ],
    "examples": [
      {
        "stdin": "4\nethernet (trames MAC)\nip (adressage et routage)\ntcp (segments fiables sur port 443)\nhttp (pages Web)\n",
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
    "solution": "[Exemple]\nethernet : acces-reseau\nip : internet\ntcp : transport\nhttp : application\ntransport : 1/4\n\n[Cas 1 — Un seul transport]\nudp : transport\ntransport : 1/1\n\n[Cas 2 — Couche internet]\nicmp : internet\narp : internet\ntransport : 0/2\n\n[Cas 3 — Cinq objets]\na : acces-reseau\nb : application\nc : internet\nd : transport\ne : application\ntransport : 1/5",
    "takeaway": "À retenir : Ranger chaque élément dans les quatre couches du modèle TCP/IP : accès réseau, internet, transport, application."
  },
  {
    "id": "re-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le three-way handshake de la banque en ligne",
    "exampleTitle": "Exemple résolu — la connexion FTP du photographe",
    "goal": "Dérouler le three-way handshake de TCP avec les numéros de séquence et d'acquittement.",
    "brief": "<p><strong>Énoncé.</strong> Le navigateur de Marc ouvre une connexion TCP vers le serveur de sa banque en ligne. Le three-way handshake commence : le navigateur envoie un premier paquet portant le numéro de séquence aléatoire <strong>A = 500</strong>. Le serveur répond par un SYN-ACK : il accuse la séquence du client et propose la sienne, <strong>B = 800</strong>. Le navigateur conclut par un ACK.</p><p>Questions 1 et 5 : un seul mot. Questions 2, 3 et 4 : le nombre seul.</p><ol><li>Comment s'appelle le premier paquet envoyé par le navigateur ?</li><li>Dans son SYN-ACK, le serveur accuse la séquence du client : quel numéro envoie-t-il (A + 1) ?</li><li>Le navigateur conclut par un ACK : quel numéro envoie-t-il pour acquitter la séquence B du serveur ?</li><li>Combien d'étapes compte le three-way handshake ?</li><li>Une fois le handshake terminé, la communication établie est-elle half-duplex ou full-duplex ?</li></ol>",
    "starter": "# Exercice — Le three-way handshake de la banque en ligne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 5 : un seul mot. Questions 2, 3, 4 : le nombre seul.\n\n[Question 1 — Le premier paquet du navigateur]\nA_COMPLETER\n\n[Question 2 — L'acquittement du SYN-ACK]\nA_COMPLETER\n\n[Question 3 — L'acquittement de l'ACK final]\nA_COMPLETER\n\n[Question 4 — Le nombre d'étapes]\nA_COMPLETER\n\n[Question 5 — Le mode de la communication établie]\nA_COMPLETER\n",
    "hints": [
      "L'ouverture TCP se déroule en trois temps : SYN (séquence A), SYN-ACK (acquittement A + 1 et séquence B), ACK (B + 1).",
      "Chaque numéro d'acquittement vaut la séquence reçue augmentée de un : le serveur accuse la séquence du client, puis le client accuse celle du serveur.",
      "Les étapes 1 et 2 fixent la séquence dans un sens, les étapes 2 et 3 dans l'autre : une fois les trois échanges passés, le dialogue est établi dans les deux sens."
    ],
    "examples": [
      {
        "stdin": "Un photographe ouvre une connexion FTP vers son studio. Le client envoie SYN avec la séquence A = 2000 ; le serveur répond SYN-ACK avec sa séquence B = 300 ; le client conclut par ACK.\n\n1) Premier paquet : SYN.\n2) Acquittement du SYN-ACK : 2001.\n3) Acquittement de l'ACK final : 301.\n4) Le handshake compte 3 étapes.\n5) La communication est full-duplex.",
        "expected": "SYN — acquittement : 2001 — ACK final : 301 — 3 étapes — full-duplex",
        "note": "Le SYN-ACK porte deux numéros : l'acquittement de la séquence reçue et une nouvelle séquence ; l'ACK final la dépasse d'un."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le premier paquet du navigateur",
        "stdin": "q:1",
        "expected": "syn||le syn"
      },
      {
        "label": "Question 2 — L'acquittement du SYN-ACK",
        "stdin": "q:2",
        "expected": "501"
      },
      {
        "label": "Question 3 — L'acquittement de l'ACK final",
        "stdin": "q:3",
        "expected": "801"
      },
      {
        "label": "Question 4 — Le nombre d'étapes",
        "stdin": "q:4",
        "expected": "3||trois"
      },
      {
        "label": "Question 5 — Le mode de la communication établie",
        "stdin": "q:5",
        "expected": "full-duplex||full duplex||full-duplexe||full duplexe"
      }
    ],
    "solution": "[Question 1 — Le premier paquet du navigateur]\nsyn\n\n[Question 2 — L'acquittement du SYN-ACK]\n501\n\n[Question 3 — L'acquittement de l'ACK final]\n801\n\n[Question 4 — Le nombre d'étapes]\n3\n\n[Question 5 — Le mode de la communication établie]\nfull-duplex",
    "takeaway": "1) Le client ouvre la connexion par un paquet SYN portant la séquence aléatoire A = 500.\n2) Le SYN-ACK du serveur accuse la séquence reçue : ACK = A + 1 = 500 + 1 = 501, et propose sa propre séquence B = 800.\n3) L'ACK final du client acquitte la séquence du serveur : B + 1 = 800 + 1 = 801.\n4) Le three-way handshake compte 3 étapes : SYN, SYN-ACK, ACK — dans cet ordre.\n5) Les séquences sont fixées dans les deux sens (étapes 1-2 dans un sens, étapes 2-3 dans l'autre) : la communication établie est full-duplex.\nContrôle : chaque acquittement vaut la séquence reçue plus un — 500 donne 501, 800 donne 801."
  },
  {
    "id": "re-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "TCP contre UDP",
    "goal": "Choisir entre TCP (fiable, accusés de réception, full-duplex) et UDP (rapide, sans accusé).",
    "brief": "<p>Évaluez la priorité de chaque flux réseau : intégrité garantie avec accusés de réception (<code>flux : fiable</code>, via TCP) ou latence minimale en temps réel sans retransmission (<code>flux : rapide</code>, via UDP). Terminez par <code>fiables : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c4-e3) — TCP contre UDP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un flux temps réel]\n# Données : 1\n# Données : voix (appel audio temps réel tolérant de micro-pertes)\nA_COMPLETER\n\n[Cas 2 — Transactions critiques]\n# Données : 2\n# Données : site (page HTTPS exigeant intégrité complète)\n# Données : banque (virement bancaire à acquitter sans erreur)\nA_COMPLETER\n\n[Cas 3 — Cinq flux]\n# Données : 5\n# Données : a (téléchargement d'archive ZIP sans corruption)\n# Données : b (requête DNS en un datagramme minimal)\n# Données : c (flux vidéo conférencier temps réel)\n# Données : d (session SSH interactive chiffrée fiable)\n# Données : e (envoi de courriel SMTP avec acquittements)\nA_COMPLETER\n",
    "hints": [
      "Un transfert de fichier, une page web ou une transaction ne tolèrent aucune perte (« fiable ») ; la voix/vidéo directe ou un ping/DNS simple privilégient la vitesse (« rapide »).",
      "Le compteur « fiables : X/n » totalise les flux devant reposer sur TCP.",
      "Indiquez « flux : fiable » ou « flux : rapide » pour chaque ligne, puis « fiables : X/n »."
    ],
    "examples": [
      {
        "stdin": "3\ncourriel (pièce jointe SMTP complète)\ndns (résolution simple sans session)\ntransfert (sauvegarde binaire critique)\n",
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
    "solution": "[Exemple]\ncourriel : fiable\ndns : rapide\ntransfert : fiable\nfiables : 2/3\n\n[Cas 1 — Un seul UDP]\nvoix : rapide\nfiables : 0/1\n\n[Cas 2 — Que du TCP]\nsite : fiable\nbanque : fiable\nfiables : 2/2\n\n[Cas 3 — Cinq flux]\na : fiable\nb : rapide\nc : rapide\nd : fiable\ne : fiable\nfiables : 3/5",
    "takeaway": "À retenir : Choisir entre TCP (fiable, accusés de réception, full-duplex) et UDP (rapide, sans accusé)."
  },
  {
    "id": "re-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Lire une adresse MAC",
    "goal": "Valider une adresse MAC : 48 bits, soit exactement 12 chiffres hexadécimaux.",
    "brief": "<p>Analysez chaque ligne « carte mac » : mac est une suite de caractères sans séparateurs, par exemple <code>aabbccddeeff</code>. Dans cette grille, vérifiez seulement la forme d'une adresse Ethernet de 48 bits : <strong>exactement 12 chiffres hexadécimaux</strong> (0-9, a-f, A-F). Cette syntaxe ne prouve ni l'identité de l'appareil ni l'unicité de l'adresse : celle-ci peut être locale ou modifiée. Indiquez <code>carte : mac valide</code> ou <code>carte : mac invalide</code>, puis <code>invalides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (re-c5-e1) — Lire une adresse MAC\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule valide]\n# Données : 1\n# Données : srv 001A2B3C4D5E\nA_COMPLETER\n\n[Cas 2 — Trop longue]\n# Données : 2\n# Données : pc1 aabbccddeeff1\n# Données : pc2 aabbccddeeff\nA_COMPLETER\n\n[Cas 3 — Cinq cartes]\n# Données : 5\n# Données : a aabbccddeeff\n# Données : b AABBCCDDEEFF\n# Données : c aabbccddeegf\n# Données : d aabbccddee\n# Données : e zzbccddeeff1\nA_COMPLETER\n",
    "hints": [
      "Un case avec douze classes [0-9a-fA-F] de suite valide la forme : le motif doit couvrir tout le mot.",
      "Trop courte, trop longue ou avec un caractère étranger : tout tombe dans le cas invalide.",
      "Après retrait éventuel des séparateurs, vérifiez que l adresse compte strictement 12 chiffres hexadécimaux (0-9, a-f/A-F) soit 48 bits."
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
    "solution": "[Exemple]\npc1 : mac valide\npc2 : mac invalide\npc3 : mac invalide\ninvalides : 2/3\n\n[Cas 1 — Une seule valide]\nsrv : mac valide\ninvalides : 0/1\n\n[Cas 2 — Trop longue]\npc1 : mac invalide\npc2 : mac valide\ninvalides : 1/2\n\n[Cas 3 — Cinq cartes]\na : mac valide\nb : mac valide\nc : mac invalide\nd : mac invalide\ne : mac invalide\ninvalides : 3/5",
    "takeaway": "À retenir : Valider une adresse MAC : 48 bits, soit exactement 12 chiffres hexadécimaux."
  },
  {
    "id": "re-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Réseau ou hôte : le masque du bureau Nuit et Jour",
    "exampleTitle": "Exemple résolu — le réseau du gîte rural",
    "goal": "Décomposer une adresse IPv4 en partie réseau et partie hôte avec le masque, puis choisir ARP ou le routeur.",
    "brief": "<p><strong>Énoncé.</strong> Le bureau de la PME <strong>Nuit et Jour</strong> occupe le réseau <strong>192.168.10.0/24</strong>, de masque <strong>255.255.255.0</strong>. Le poste d'Inès porte l'adresse 192.168.10.25 ; le serveur de fichiers, 192.168.10.40 ; l'imprimante, 192.168.10.50. Inès travaille toute la journée avec le serveur et l'imprimante, puis consulte le site web d'un fournisseur, hébergé à distance.</p><p>Questions 1 et 2 : le nombre seul. Questions 3 à 5 : le terme ou le sigle exact.</p><ol><li>Avec le masque 255.255.255.0, combien d'octets de l'adresse identifient le réseau ?</li><li>Combien d'octets restent pour identifier les hôtes de ce réseau ?</li><li>Dans le masque, les bits à 0 marquent quelle partie de l'adresse : le réseau ou l'hôte ?</li><li>Pour joindre le serveur 192.168.10.40, situé sur le même réseau, quel protocole traduit son IP en adresse MAC (sigle) ?</li><li>Pour joindre le site web distant du fournisseur, le poste d'Inès encapsule le paquet vers l'adresse MAC de quel équipement (un mot) ?</li></ol>",
    "starter": "# Exercice — Réseau ou hôte : le masque du bureau Nuit et Jour\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 : le nombre seul. Questions 3 à 5 : le terme ou le sigle exact.\n\n[Question 1 — Les octets du réseau]\nA_COMPLETER\n\n[Question 2 — Les octets des hôtes]\nA_COMPLETER\n\n[Question 3 — Ce que marquent les bits à 0]\nA_COMPLETER\n\n[Question 4 — Le traducteur vers le serveur local]\nA_COMPLETER\n\n[Question 5 — L'équipement pour le site distant]\nA_COMPLETER\n",
    "hints": [
      "Le masque partage les 32 bits de l'adresse : bits à 1 = réseau, bits à 0 = hôte. Le masque 255.255.255.0 réserve trois octets complets à la partie réseau.",
      "Même réseau : la trame part directement, après la traduction de l'IP en MAC ; réseau distant : la trame s'adresse à l'équipement qui relaie d'un réseau à l'autre.",
      "Comparez chaque destination au réseau du bureau : si ses trois premiers octets coïncident, l'envoi reste local ; sinon le paquet prend la porte de sortie."
    ],
    "examples": [
      {
        "stdin": "Un gîte rural exploite le réseau 192.168.50.0/24 (masque 255.255.255.0). La réception (192.168.50.10) joint le disque multimédia (192.168.50.20), puis un site de météo distant.\n\n1) Octets du réseau : 3.\n2) Octets des hôtes : 1.\n3) Les bits à 0 marquent l'hôte.\n4) Vers le disque local : ARP.\n5) Vers le site distant : le routeur.",
        "expected": "réseau : 3 octets — hôte : 1 octet — bits à 0 : hôte — local : ARP — distant : routeur",
        "note": "Un masque n'est qu'une frontière : derrière elle, tout reste local (ARP) ; devant elle, tout passe par le routeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Les octets du réseau",
        "stdin": "q:1",
        "expected": "3||trois||3 octets"
      },
      {
        "label": "Question 2 — Les octets des hôtes",
        "stdin": "q:2",
        "expected": "1||un||1 octet"
      },
      {
        "label": "Question 3 — Ce que marquent les bits à 0",
        "stdin": "q:3",
        "expected": "hote||hotes||l'hote||l'hôte"
      },
      {
        "label": "Question 4 — Le traducteur vers le serveur local",
        "stdin": "q:4",
        "expected": "arp||le protocole arp||protocole arp"
      },
      {
        "label": "Question 5 — L'équipement pour le site distant",
        "stdin": "q:5",
        "expected": "routeur||le routeur||passerelle"
      }
    ],
    "solution": "[Question 1 — Les octets du réseau]\n3\n\n[Question 2 — Les octets des hôtes]\n1\n\n[Question 3 — Ce que marquent les bits à 0]\nhote\n\n[Question 4 — Le traducteur vers le serveur local]\narp\n\n[Question 5 — L'équipement pour le site distant]\nrouteur",
    "takeaway": "1) Le masque 255.255.255.0 met à 1 les 24 premiers bits : les trois premiers octets (192.168.10) identifient le réseau.\n2) Le dernier octet (8 bits) reste pour les hôtes : 1 octet.\n3) Bits à 1 = réseau, bits à 0 = hôte : les bits à 0 marquent la partie hôte.\n4) Le serveur 192.168.10.40 fait partie du réseau 192.168.10.0/24 : envoi local — ARP (Address Resolution Protocol) traduit son IP en adresse MAC.\n5) Le site du fournisseur est hors du réseau local : le paquet est encapsulé vers la MAC du routeur (la passerelle), qui consulte sa table de routage et relaie.\nContrôle : Inès (192.168.10.25), le serveur (.40) et l'imprimante (.50) partagent les trois mêmes octets réseau — tout échange entre eux reste local."
  },
  {
    "id": "re-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La classe de l'adresse",
    "goal": "Identifier la classe IPv4 par le premier octet : A (1-126), B (128-191), C (192-223), D et E réservées.",
    "brief": "<p>Analysez chaque ligne proposée « adresse premieroctet » : premieroctet est un entier (0 à 255). Pour chaque ligne, indiquez : <code>adresse : classe A</code> (1-126), <code>adresse : classe B</code> (128-191), <code>adresse : classe C</code> (192-223), <code>adresse : classe D</code> (224-239, multicast), <code>adresse : classe E</code> (240-254, expérimentale), <code>adresse : boucle locale</code> (127) ou <code>adresse : reservee</code> (0 et 255). Terminez par <code>speciales : X/n</code> (boucle locale et réservées).</p>",
    "starter": "# Grille d'analyse (re-c5-e3) — La classe de l'adresse\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Boucle locale]\n# Données : 1\n# Données : localhost 127\nA_COMPLETER\n\n[Cas 2 — Classe E]\n# Données : 2\n# Données : labo 240\n# Données : pmi 193\nA_COMPLETER\n\n[Cas 3 — Six adresses]\n# Données : 6\n# Données : a 1\n# Données : b 126\n# Données : c 128\n# Données : d 191\n# Données : e 255\n# Données : f 0\nA_COMPLETER\n",
    "hints": [
      "Une suite de if/elif avec -le et -ge évite le case : les tranches sont numériques.",
      "Boucle locale (127), 0 et 255 sont les cas « speciales » à compter.",
      "Lisez uniquement le premier octet : 1-126 -> classe A, 128-191 -> classe B, 192-223 -> classe C, >=224 ou 127 -> reservee."
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
    "solution": "[Exemple]\nrc : classe A\nuni : classe B\npmi : classe C\ngroupe : classe D\nspeciales : 0/4\n\n[Cas 1 — Boucle locale]\nlocalhost : boucle locale\nspeciales : 1/1\n\n[Cas 2 — Classe E]\nlabo : classe E\npmi : classe C\nspeciales : 0/2\n\n[Cas 3 — Six adresses]\na : classe A\nb : classe A\nc : classe B\nd : classe B\ne : reservee\nf : reservee\nspeciales : 2/6",
    "takeaway": "À retenir : Identifier la classe IPv4 par le premier octet : A (1-126), B (128-191), C (192-223), D et E réservées."
  },
  {
    "id": "re-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Emprunter des bits",
    "goal": "Calculer l'effet de l'emprunt de bits d'hôte : combien de sous-réseaux créés, combien d'hôtes valides chacun.",
    "brief": "<p>Cette simulation se limite aux sous-réseaux ordinaires /25 à /30 ; un /31 point-à-point compatible reste possible en réalité mais est hors de cette grille. Analysez chaque ligne « reseau emprunt » depuis un /24 : pour un entier de 1 à 6, indiquez <code>reseau : /C (S sous-reseaux, H hotes)</code>, avec C = 24 + emprunt, S = 2^emprunt et H = 2^(8-emprunt) - 2. Si l'emprunt vaut 7 ou plus, afficher <code>reseau : emprunt trop grand</code> selon cette convention.</p>",
    "starter": "# Grille d'analyse (re-c6-e1) — Emprunter des bits\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Emprunt d un bit]\n# Données : 1\n# Données : res1 1\nA_COMPLETER\n\n[Cas 2 — Emprunt trop grand]\n# Données : 2\n# Données : res1 7\n# Données : res2 3\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a 1\n# Données : b 2\n# Données : c 3\n# Données : d 4\n# Données : e 5\nA_COMPLETER\n",
    "hints": [
      "Le nombre d’adresses IP d’un bloc CIDR de préfixe /p vaut 2^(32 - p).",
      "Dans cette grille /25 à /30, retirer l’adresse réseau et l’adresse de diffusion : N_hôtes = 2^k - 2 ; le /31 point-à-point est hors grille.",
      "Calculez /24+k, le nombre de sous-réseaux 2^k et les hôtes utilisables 2^(8-k) - 2 en respectant le format exact « /XX (R sous-reseaux, H hotes) »."
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
    "solution": "[Exemple]\nagence : /27 (8 sous-reseaux, 30 hotes)\nagence2 : /26 (4 sous-reseaux, 62 hotes)\nagence3 : /25 (2 sous-reseaux, 126 hotes)\n\n[Cas 1 — Emprunt d un bit]\nres1 : /25 (2 sous-reseaux, 126 hotes)\n\n[Cas 2 — Emprunt trop grand]\nres1 : emprunt trop grand\nres2 : /27 (8 sous-reseaux, 30 hotes)\n\n[Cas 3 — Cinq reseaux]\na : /25 (2 sous-reseaux, 126 hotes)\nb : /26 (4 sous-reseaux, 62 hotes)\nc : /27 (8 sous-reseaux, 30 hotes)\nd : /28 (16 sous-reseaux, 14 hotes)\ne : /29 (32 sous-reseaux, 6 hotes)",
    "takeaway": "À retenir : Calculer l'effet de l'emprunt de bits d'hôte : combien de sous-réseaux créés, combien d'hôtes valides chacun."
  },
  {
    "id": "re-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le nouveau masque",
    "goal": "Convertir l'emprunt de bits en masque décimal : 3 bits empruntés sur le 4e octet donnent 255.255.255.224.",
    "brief": "<p>Analysez chaque ligne proposée « reseau emprunt » : emprunt est le nombre de bits mis à 1 dans le 4e octet du masque (entier de 1 à 6). Le 4e octet vaut 256 - 2^(8-emprunt) : 3 bits empruntés donnent 224, 2 bits donnent 192, etc. Pour chaque ligne, indiquez <code>reseau : 255.255.255.X (/C)</code> où C = 24 + emprunt. Si l'emprunt vaut 7 ou plus, afficher <code>reseau : emprunt trop grand</code>. Terminez par <code>slash28 : X/n</code> (les emprunts de 4 bits).</p>",
    "starter": "# Grille d'analyse (re-c6-e2) — Le nouveau masque\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul bit]\n# Données : 1\n# Données : res1 1\nA_COMPLETER\n\n[Cas 2 — Emprunt trop grand]\n# Données : 2\n# Données : res1 8\n# Données : res2 2\nA_COMPLETER\n\n[Cas 3 — Cinq reseaux]\n# Données : 5\n# Données : a 1\n# Données : b 2\n# Données : c 3\n# Données : d 4\n# Données : e 6\nA_COMPLETER\n",
    "hints": [
      "L'octet vaut 256 moins la puissance de deux restante : 256 - (1 << (8 - emprunt)).",
      "L'emprunt de 4 bits donne 240 : c'est le /28 à compter.",
      "Additionnez les k bits à 1 de poids fort sur le 4e octet (128, 192, 224, 240, 248, 252) et accolez le suffixe « (/prefix) »."
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
    "solution": "[Exemple]\nagence : 255.255.255.224 (/27)\nagence2 : 255.255.255.192 (/26)\nagence3 : 255.255.255.240 (/28)\nslash28 : 1/3\n\n[Cas 1 — Un seul bit]\nres1 : 255.255.255.128 (/25)\nslash28 : 0/1\n\n[Cas 2 — Emprunt trop grand]\nres1 : emprunt trop grand\nres2 : 255.255.255.192 (/26)\nslash28 : 0/2\n\n[Cas 3 — Cinq reseaux]\na : 255.255.255.128 (/25)\nb : 255.255.255.192 (/26)\nc : 255.255.255.224 (/27)\nd : 255.255.255.240 (/28)\ne : 255.255.255.252 (/30)\nslash28 : 1/5",
    "takeaway": "À retenir : Convertir l'emprunt de bits en masque décimal : 3 bits empruntés sur le 4e octet donnent 255.255.255.224."
  },
  {
    "id": "re-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan d'adressage VLSM",
    "goal": "Dimensionner les sous-réseaux de chaque site : le plus petit bloc dont la capacité couvre les hôtes demandés.",
    "brief": "<p>Analysez chaque ligne « site hotes » : hotes est le nombre entier positif d'hôtes demandés. Dans cette simulation limitée aux blocs /24 à /30, choisissez le plus petit bloc dont la capacité 2^k - 2 couvre le besoin, avec un préfixe de 32 - k. Un /31 point-à-point peut aussi utiliser deux adresses, mais reste hors de ce modèle. Indiquez <code>site : /P (C hotes)</code> ou, au-delà de 254 hôtes, <code>site : impossible</code>. Terminez par <code>liaisons : X/n</code> : ici, ce libellé compte les blocs /30, sans prouver que chaque site est une liaison réelle.</p>",
    "starter": "# Grille d'analyse (re-c6-e3) — Le plan d'adressage VLSM\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule liaison]\n# Données : 1\n# Données : routeurs 2\nA_COMPLETER\n\n[Cas 2 — Besoin impossible]\n# Données : 2\n# Données : datacenter 500\n# Données : bureau 10\nA_COMPLETER\n\n[Cas 3 — Cinq sites]\n# Données : 5\n# Données : a 2\n# Données : b 10\n# Données : c 50\n# Données : d 1\n# Données : e 200\nA_COMPLETER\n",
    "hints": [
      "Une boucle while augmente k tant que (2^k - 2) est inférieur au besoin ; le préfixe vaut 32 - k.",
      "Dans ce modèle, comptez comme « liaisons » les blocs /30 de capacité 2.",
      "Prenez la plus petite puissance de 2 telle que 2^h - 2 >= besoin (ex. 2 hôtes -> /30, 30 hôtes -> /27) et vérifiez le décompte des liaisons /30."
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
    "solution": "[Exemple]\nbureau1 : /27 (30 hotes)\nbureau2 : /29 (6 hotes)\nliaison : /30 (2 hotes)\nsiege : /25 (126 hotes)\nliaisons : 1/4\n\n[Cas 1 — Une seule liaison]\nrouteurs : /30 (2 hotes)\nliaisons : 1/1\n\n[Cas 2 — Besoin impossible]\ndatacenter : impossible\nbureau : /28 (14 hotes)\nliaisons : 0/2\n\n[Cas 3 — Cinq sites]\na : /30 (2 hotes)\nb : /28 (14 hotes)\nc : /26 (62 hotes)\nd : /30 (2 hotes)\ne : /24 (254 hotes)\nliaisons : 2/5",
    "takeaway": "À retenir : Dimensionner les sous-réseaux de chaque site : le plus petit bloc dont la capacité couvre les hôtes demandés."
  }
];
