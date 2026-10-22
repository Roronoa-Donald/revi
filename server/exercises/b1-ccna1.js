'use strict';

module.exports = [
  {
    "id": "cc-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Quel équipement pour quel rôle",
    "goal": "Classer les composantes du réseau : terminal, routeur, commutateurs L2/L3, concentrateur, pare-feu.",
    "brief": "<p>Analysez chaque ligne proposée « equipement role » : role est un code parmi <code>terminal</code>, <code>routeur</code>, <code>switchl2</code>, <code>switchl3</code>, <code>hub</code> ou <code>parefeu</code>. Pour chaque ligne il Indiquez <code>equipement : OK</code> quand le rôle annoncé correspond à l'équipement — PC et imprimante sont des <em>terminaux</em>, le routeur relie les réseaux, le switch L2 commute sur un LAN, le switch L3 route entre VLAN, le hub répéter bêtement, le pare-feu filtre — sinon <code>equipement : ERREUR</code>. Il termine par <code>roles corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c1-e1) — Quel équipement pour quel rôle\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les six équipements]\n# Données : 6\n# Données : pc terminal\n# Données : r1 routeur\n# Données : sw1 switchl2\n# Données : sw3 switchl3\n# Données : hub hub\n# Données : fw parefeu\nA_COMPLETER\n\n[Cas 2 — Deux confusions]\n# Données : 3\n# Données : hub routeur\n# Données : sw3 switchl2\n# Données : pc terminal\nA_COMPLETER\n\n[Cas 3 — Réseau complet]\n# Données : 5\n# Données : serveur terminal\n# Données : r1 routeur\n# Données : sw1 switchl2\n# Données : sw3 switchl3\n# Données : fw parefeu\nA_COMPLETER\n",
    "hints": [
      "Un case sur l'équipement donne le rôle attendu ; compare-le au rôle saisi.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\npc terminal\nsw1 switchl2\nhub switchl3\n",
        "expected": "pc : OK\nsw1 : OK\nhub : ERREUR\nroles corrects : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les six équipements",
        "stdin": "cas:1",
        "expected": "pc : OK\nr1 : OK\nsw1 : OK\nsw3 : OK\nhub : OK\nfw : OK\nroles corrects : 6/6"
      },
      {
        "label": "Deux confusions",
        "stdin": "cas:2",
        "expected": "hub : ERREUR\nsw3 : ERREUR\npc : OK\nroles corrects : 1/3"
      },
      {
        "label": "Réseau complet",
        "stdin": "cas:3",
        "expected": "serveur : OK\nr1 : OK\nsw1 : OK\nsw3 : OK\nfw : OK\nroles corrects : 5/5"
      }
    ],
    "solution": "[Exemple]\npc : OK\nsw1 : OK\nhub : ERREUR\nroles corrects : 2/3\n\n[Cas 1 — Les six équipements]\npc : OK\nr1 : OK\nsw1 : OK\nsw3 : OK\nhub : OK\nfw : OK\nroles corrects : 6/6\n\n[Cas 2 — Deux confusions]\nhub : ERREUR\nsw3 : ERREUR\npc : OK\nroles corrects : 1/3\n\n[Cas 3 — Réseau complet]\nserveur : OK\nr1 : OK\nsw1 : OK\nsw3 : OK\nfw : OK\nroles corrects : 5/5"
  },
  {
    "id": "cc-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Câble droit ou câble croisé",
    "goal": "Appliquer la règle du brochage : câble droit entre appareils différents, croisé entre appareils similaires.",
    "brief": "<p>Analysez chaque ligne proposée « liaisontype typeannonce » : liaisontype est un code parmi <code>pc-switch</code>, <code>pc-pc</code>, <code>switch-switch</code>, <code>pc-routeur</code> ou <code>routeur-routeur</code> et typeannonce un code parmi <code>droit</code> ou <code>croise</code>. Règle du support : un <strong>câble droit</strong> relie deux appareils <em>différents</em> (pc-switch, pc-routeur), un <strong>câble croisé</strong> relie deux appareils <em>similaires</em> (pc-pc, switch-switch, routeur-routeur). Pour chaque ligne il Indiquez <code>liaison : conforme</code> ou <code>liaison : a revoir</code>, puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c1-e2) — Câble droit ou câble croisé\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq liaisons]\n# Données : 5\n# Données : pc-switch droit\n# Données : pc-routeur droit\n# Données : pc-pc croise\n# Données : switch-switch croise\n# Données : routeur-routeur croise\nA_COMPLETER\n\n[Cas 2 — Inversions]\n# Données : 2\n# Données : pc-switch croise\n# Données : pc-pc droit\nA_COMPLETER\n\n[Cas 3 — Baie de brassage]\n# Données : 4\n# Données : pc-switch droit\n# Données : sw1-sw2 croise\n# Données : pc-routeur droit\n# Données : r1-r2 croise\nA_COMPLETER\n",
    "hints": [
      "Deux appareils différents → droit ; deux appareils similaires → croisé.",
      "Un case sur la liaison donne le brochage attendu."
    ],
    "examples": [
      {
        "stdin": "3\npc-switch droit\nswitch-switch droit\npc-pc croise\n",
        "expected": "pc-switch : conforme\nswitch-switch : a revoir\npc-pc : conforme\nconformes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq liaisons",
        "stdin": "cas:1",
        "expected": "pc-switch : conforme\npc-routeur : conforme\npc-pc : conforme\nswitch-switch : conforme\nrouteur-routeur : conforme\nconformes : 5/5"
      },
      {
        "label": "Inversions",
        "stdin": "cas:2",
        "expected": "pc-switch : a revoir\npc-pc : a revoir\nconformes : 0/2"
      },
      {
        "label": "Baie de brassage",
        "stdin": "cas:3",
        "expected": "pc-switch : conforme\nsw1-sw2 : conforme\npc-routeur : conforme\nr1-r2 : conforme\nconformes : 4/4"
      }
    ],
    "solution": "[Exemple]\npc-switch : conforme\nswitch-switch : a revoir\npc-pc : conforme\nconformes : 2/3\n\n[Cas 1 — Les cinq liaisons]\npc-switch : conforme\npc-routeur : conforme\npc-pc : conforme\nswitch-switch : conforme\nrouteur-routeur : conforme\nconformes : 5/5\n\n[Cas 2 — Inversions]\npc-switch : a revoir\npc-pc : a revoir\nconformes : 0/2\n\n[Cas 3 — Baie de brassage]\npc-switch : conforme\nsw1-sw2 : conforme\npc-routeur : conforme\nr1-r2 : conforme\nconformes : 4/4"
  },
  {
    "id": "cc-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Choisir la catégorie du câble",
    "goal": "Conseiller la catégorie de paires torsadées selon le débit visé.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Règle du support : la catégorie 5e porte le gigabit, la catégorie 6a porte le 10 Gigabit ; en dessous, la catégorie 3 couvre le Fast Ethernet 100 Mbit/s. Pour chaque site il Indiquez <code>site : cat5e</code>, <code>site : cat6a</code> ou <code>site : cat3</code>, puis <code>cat6a posees : X</code> (nombre de câbles 10G).</p>",
    "starter": "# Grille d'analyse (cc-c1-e3) — Choisir la catégorie du câble\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Que du gigabit]\n# Données : 2\n# Données : labo 1g\n# Données : bureau 1g\nA_COMPLETER\n\n[Cas 2 — Datacenter]\n# Données : 2\n# Données : rack1 10g\n# Données : rack2 10g\nA_COMPLETER\n\n[Cas 3 — Étage mixte]\n# Données : 4\n# Données : compta 1g\n# Données : cafe 100m\n# Données : reunion 10g\n# Données : accueil 100m\nA_COMPLETER\n",
    "hints": [
      "1g → cat5e ; 10g → cat6a ; 100m → cat3.",
      "Compte les cat6a posées pour le bilan."
    ],
    "examples": [
      {
        "stdin": "3\nbureau 1g\nsalle 10g\nreception 100m\n",
        "expected": "bureau : cat5e\nsalle : cat6a\nreception : cat3\ncat6a posees : 1"
      }
    ],
    "tests": [
      {
        "label": "Que du gigabit",
        "stdin": "cas:1",
        "expected": "labo : cat5e\nbureau : cat5e\ncat6a posees : 0"
      },
      {
        "label": "Datacenter",
        "stdin": "cas:2",
        "expected": "rack1 : cat6a\nrack2 : cat6a\ncat6a posees : 2"
      },
      {
        "label": "Étage mixte",
        "stdin": "cas:3",
        "expected": "compta : cat5e\ncafe : cat3\nreunion : cat6a\naccueil : cat3\ncat6a posees : 1"
      }
    ],
    "solution": "[Exemple]\nbureau : cat5e\nsalle : cat6a\nreception : cat3\ncat6a posees : 1\n\n[Cas 1 — Que du gigabit]\nlabo : cat5e\nbureau : cat5e\ncat6a posees : 0\n\n[Cas 2 — Datacenter]\nrack1 : cat6a\nrack2 : cat6a\ncat6a posees : 2\n\n[Cas 3 — Étage mixte]\ncompta : cat5e\ncafe : cat3\nreunion : cat6a\naccueil : cat3\ncat6a posees : 1"
  },
  {
    "id": "cc-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Couches TCP/IP à 4 ou 5",
    "goal": "Classer les éléments dans le modèle TCP/IP à 4 couches puis à 5 couches (modèle d'actualité).",
    "brief": "<p>Analysez chaque ligne proposée « element modele couche » : modele est un code parmi <code>tcp4</code> ou <code>tcp5</code>. Dans le modèle à 4 couches, les couches sont <code>acces</code>, <code>internet</code>, <code>transport</code> et <code>application</code> ; dans le modèle à 5 couches (d'actualité), la couche <code>physique</code> est séparée de l'accès réseau. Pour chaque ligne il Indiquez <code>element : OK</code> si la couche existe dans ce modèle, sinon <code>element : ABSENT</code> (physique est absent du modèle 4 couches). Il termine par <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c2-e1) — Couches TCP/IP à 4 ou 5\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Modèle 4]\n# Données : 4\n# Données : trame tcp4 acces\n# Données : segment tcp4 transport\n# Données : page tcp4 application\n# Données : bits tcp4 physique\nA_COMPLETER\n\n[Cas 2 — Modèle 5]\n# Données : 4\n# Données : bits tcp5 physique\n# Données : trame tcp5 acces\n# Données : segment tcp5 transport\n# Données : page tcp5 application\nA_COMPLETER\n\n[Cas 3 — Comparaison]\n# Données : 4\n# Données : bits tcp4 physique\n# Données : bits tcp5 physique\n# Données : internet tcp4 internet\n# Données : internet tcp5 internet\nA_COMPLETER\n",
    "hints": [
      "Le modèle 4 couches n'a pas de couche physique : seule la 5 couches l'a.",
      "Le verdict porte sur la couche, pas sur l'élément."
    ],
    "examples": [
      {
        "stdin": "3\ncable tcp5 physique\ncable tcp4 physique\nip tcp4 internet\n",
        "expected": "cable : OK\ncable : ABSENT\nip : OK\nconformes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Modèle 4",
        "stdin": "cas:1",
        "expected": "trame : OK\nsegment : OK\npage : OK\nbits : ABSENT\nconformes : 3/4"
      },
      {
        "label": "Modèle 5",
        "stdin": "cas:2",
        "expected": "bits : OK\ntrame : OK\nsegment : OK\npage : OK\nconformes : 4/4"
      },
      {
        "label": "Comparaison",
        "stdin": "cas:3",
        "expected": "bits : ABSENT\nbits : OK\ninternet : OK\ninternet : OK\nconformes : 3/4"
      }
    ],
    "solution": "[Exemple]\ncable : OK\ncable : ABSENT\nip : OK\nconformes : 2/3\n\n[Cas 1 — Modèle 4]\ntrame : OK\nsegment : OK\npage : OK\nbits : ABSENT\nconformes : 3/4\n\n[Cas 2 — Modèle 5]\nbits : OK\ntrame : OK\nsegment : OK\npage : OK\nconformes : 4/4\n\n[Cas 3 — Comparaison]\nbits : ABSENT\nbits : OK\ninternet : OK\ninternet : OK\nconformes : 3/4"
  },
  {
    "id": "cc-c2-e2",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Les sept couches OSI",
    "goal": "Placer chaque unité de données dans sa couche OSI, du bit (1) à la donnée applicative (7).",
    "brief": "<p>Analysez chaque ligne proposée « unite couche » : couche est un numéro de 1 à 7. Correspondances du support : bits (1), trame (2), paquet (3), segment (4), donnée de session (5), donnée codée (6), donnée applicative (7). Pour chaque ligne il Indiquez <code>unite : couche N</code> — ou <code>unite : NON</code> quand l'unité ne correspond pas à la couche annoncée — puis <code>justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c2-e2) — Les sept couches OSI\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les sept]\n# Données : 7\n# Données : bits 1\n# Données : trame 2\n# Données : paquet 3\n# Données : segment 4\n# Données : session 5\n# Données : codage 6\n# Données : appli 7\nA_COMPLETER\n\n[Cas 2 — Trois erreurs]\n# Données : 3\n# Données : trame 1\n# Données : paquet 2\n# Données : segment 3\nA_COMPLETER\n\n[Cas 3 — Basse et haute]\n# Données : 2\n# Données : bits 1\n# Données : appli 7\nA_COMPLETER\n",
    "hints": [
      "bits=1, trame=2, paquet=3, segment=4, session=5, codage=6, appli=7.",
      "Le numéro affiché est celui de la couche attendue."
    ],
    "examples": [
      {
        "stdin": "3\nbits 1\ntrame 3\npaquet 3\n",
        "expected": "bits : couche 1\ntrame : NON\npaquet : couche 3\njustes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les sept",
        "stdin": "cas:1",
        "expected": "bits : couche 1\ntrame : couche 2\npaquet : couche 3\nsegment : couche 4\nsession : couche 5\ncodage : couche 6\nappli : couche 7\njustes : 7/7"
      },
      {
        "label": "Trois erreurs",
        "stdin": "cas:2",
        "expected": "trame : NON\npaquet : NON\nsegment : NON\njustes : 0/3"
      },
      {
        "label": "Basse et haute",
        "stdin": "cas:3",
        "expected": "bits : couche 1\nappli : couche 7\njustes : 2/2"
      }
    ],
    "solution": "[Exemple]\nbits : couche 1\ntrame : NON\npaquet : couche 3\njustes : 2/3\n\n[Cas 1 — Les sept]\nbits : couche 1\ntrame : couche 2\npaquet : couche 3\nsegment : couche 4\nsession : couche 5\ncodage : couche 6\nappli : couche 7\njustes : 7/7\n\n[Cas 2 — Trois erreurs]\ntrame : NON\npaquet : NON\nsegment : NON\njustes : 0/3\n\n[Cas 3 — Basse et haute]\nbits : couche 1\nappli : couche 7\njustes : 2/2"
  },
  {
    "id": "cc-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Qui fait quoi entre OSI et TCP/IP",
    "goal": "Relier chaque tâche au modèle qui la porte : OSI 7 couches (référentiel) ou TCP/IP 5 couches (actualité).",
    "brief": "<p>Analysez chaque ligne proposée « tache modele » : modele est un code parmi <code>osi</code> ou <code>tcp5</code>. Tâches du référentiel OSI : <code>codage</code> (couche 6), <code>session</code> (couche 5). Tâches du modèle d'actualité TCP/IP 5 couches : <code>routage</code> (internet), <code>ports</code> (transport), <code>cables</code> (physique). Pour chaque ligne il Indiquez <code>tache : conforme</code> ou <code>tache : a revoir</code>, puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c2-e3) — Qui fait quoi entre OSI et TCP/IP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Le référentiel]\n# Données : 2\n# Données : codage osi\n# Données : session osi\nA_COMPLETER\n\n[Cas 2 — L'actualité]\n# Données : 3\n# Données : routage tcp5\n# Données : ports tcp5\n# Données : cables tcp5\nA_COMPLETER\n\n[Cas 3 — Tout inversé]\n# Données : 2\n# Données : ports osi\n# Données : session tcp5\nA_COMPLETER\n",
    "hints": [
      "codage et session → OSI ; routage, ports, cables → TCP/IP 5 couches.",
      "Le bilan sort après la boucle."
    ],
    "examples": [
      {
        "stdin": "2\ncodage osi\nroutage osi\n",
        "expected": "codage : conforme\nroutage : a revoir\nconformes : 1/2"
      }
    ],
    "tests": [
      {
        "label": "Le référentiel",
        "stdin": "cas:1",
        "expected": "codage : conforme\nsession : conforme\nconformes : 2/2"
      },
      {
        "label": "L'actualité",
        "stdin": "cas:2",
        "expected": "routage : conforme\nports : conforme\ncables : conforme\nconformes : 3/3"
      },
      {
        "label": "Tout inversé",
        "stdin": "cas:3",
        "expected": "ports : a revoir\nsession : a revoir\nconformes : 0/2"
      }
    ],
    "solution": "[Exemple]\ncodage : conforme\nroutage : a revoir\nconformes : 1/2\n\n[Cas 1 — Le référentiel]\ncodage : conforme\nsession : conforme\nconformes : 2/2\n\n[Cas 2 — L'actualité]\nroutage : conforme\nports : conforme\ncables : conforme\nconformes : 3/3\n\n[Cas 3 — Tout inversé]\nports : a revoir\nsession : a revoir\nconformes : 0/2"
  },
  {
    "id": "cc-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Trame Ethernet : compter les octets",
    "goal": "Valider la taille des champs d'une trame Ethernet 802.3 (en-tête, données, FCS).",
    "brief": "<p>Analysez les données fournies pour chaque cas. Champs du support : préambule 7, SFD 1, MAC destination 6, MAC source 6, type 2, données 46 à 1500, FCS 4. Pour chaque ligne il Indiquez <code>champ : OK</code> quand la taille annoncée est juste, sinon <code>champ : KO (attendu X)</code>. Il termine par <code>champs justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c3-e1) — Trame Ethernet : compter les octets\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — En-tête complet]\n# Données : 5\n# Données : preamble 7\n# Données : sfd 1\n# Données : destination 6\n# Données : source 6\n# Données : type 2\nA_COMPLETER\n\n[Cas 2 — Données bornées]\n# Données : 3\n# Données : donnees 46\n# Données : donnees 1500\n# Données : donnees 1501\nA_COMPLETER\n\n[Cas 3 — FCS faussé]\n# Données : 2\n# Données : fcs 2\n# Données : preamble 7\nA_COMPLETER\n",
    "hints": [
      "Préambule 7, SFD 1, destination 6, source 6, type 2, FCS 4 ; données entre 46 et 1500.",
      "En cas d'erreur, affiche la taille attendue entre parenthèses."
    ],
    "examples": [
      {
        "stdin": "3\ndestination 6\ntype 4\nfcs 4\n",
        "expected": "destination : OK\ntype : KO (attendu 2)\nfcs : OK\nchamps justes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "En-tête complet",
        "stdin": "cas:1",
        "expected": "preamble : OK\nsfd : OK\ndestination : OK\nsource : OK\ntype : OK\nchamps justes : 5/5"
      },
      {
        "label": "Données bornées",
        "stdin": "cas:2",
        "expected": "donnees : OK\ndonnees : OK\ndonnees : KO (attendu 46-1500)\nchamps justes : 2/3"
      },
      {
        "label": "FCS faussé",
        "stdin": "cas:3",
        "expected": "fcs : KO (attendu 4)\npreamble : OK\nchamps justes : 1/2"
      }
    ],
    "solution": "[Exemple]\ndestination : OK\ntype : KO (attendu 2)\nfcs : OK\nchamps justes : 2/3\n\n[Cas 1 — En-tête complet]\npreamble : OK\nsfd : OK\ndestination : OK\nsource : OK\ntype : OK\nchamps justes : 5/5\n\n[Cas 2 — Données bornées]\ndonnees : OK\ndonnees : OK\ndonnees : KO (attendu 46-1500)\nchamps justes : 2/3\n\n[Cas 3 — FCS faussé]\nfcs : KO (attendu 4)\npreamble : OK\nchamps justes : 1/2"
  },
  {
    "id": "cc-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "SOHO ou entreprise",
    "goal": "Distinguer le réseau local SOHO du réseau local d'entreprise selon l'équipement décrit.",
    "brief": "<p>Analysez chaque ligne proposée « reseau usage » : usage est un code parmi <code>soho</code> ou <code>entreprise</code>. Réseau <strong>SOHO</strong> : un seul commutateur pour tous les postes, ou un « routeur sans fil » unique qui fait tout. Réseau <strong>d'entreprise</strong> : un commutateur par étage dans la salle technique, point d'accès par étage. Pour chaque ligne il Indiquez <code>reseau : conforme</code> ou <code>reseau : a revoir</code>, puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c3-e2) — SOHO ou entreprise\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — La maison]\n# Données : 2\n# Données : domicile soho\n# Données : appartement soho\nA_COMPLETER\n\n[Cas 2 — La tour]\n# Données : 3\n# Données : etage1 entreprise\n# Données : etage2 entreprise\n# Données : etage3 entreprise\nA_COMPLETER\n\n[Cas 3 — Inversé]\n# Données : 2\n# Données : etage1 soho\n# Données : domicile entreprise\nA_COMPLETER\n",
    "hints": [
      "Un seul appareil qui fait tout → SOHO ; un commutateur par étage → entreprise.",
      "Un case par usage donne la famille attendue."
    ],
    "examples": [
      {
        "stdin": "2\ndomicile soho\netage1 soho\n",
        "expected": "domicile : conforme\netage1 : a revoir\nconformes : 1/2"
      }
    ],
    "tests": [
      {
        "label": "La maison",
        "stdin": "cas:1",
        "expected": "domicile : conforme\nappartement : conforme\nconformes : 2/2"
      },
      {
        "label": "La tour",
        "stdin": "cas:2",
        "expected": "etage1 : conforme\netage2 : conforme\netage3 : conforme\nconformes : 3/3"
      },
      {
        "label": "Inversé",
        "stdin": "cas:3",
        "expected": "etage1 : a revoir\ndomicile : a revoir\nconformes : 0/2"
      }
    ],
    "solution": "[Exemple]\ndomicile : conforme\netage1 : a revoir\nconformes : 1/2\n\n[Cas 1 — La maison]\ndomicile : conforme\nappartement : conforme\nconformes : 2/2\n\n[Cas 2 — La tour]\netage1 : conforme\netage2 : conforme\netage3 : conforme\nconformes : 3/3\n\n[Cas 3 — Inversé]\netage1 : a revoir\ndomicile : a revoir\nconformes : 0/2"
  },
  {
    "id": "cc-c3-e3",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Duplex intégral : le chemin de la trame",
    "goal": "Reproduire le chemin d'une trame Ethernet dans un LAN moderne à commutateurs (duplex intégral).",
    "brief": "<p>Analysez chaque ligne proposée « etape action » : etape est un code parmi <code>pc1</code>, <code>sw1</code>, <code>sw2</code> ou <code>pc2</code> et action un code parmi <code>construit</code>, <code>relais</code>, <code>livre</code> ou <code>reconnait</code>. Chemin du support : PC1 construit et envoie la trame, SW1 relaie de G0/1 vers SW2, SW2 livre de F0/2 vers PC2, PC2 reconnaît sa MAC et traite. Pour chaque ligne il Indiquez <code>etape : OUI</code> quand le couple est juste, sinon <code>etape : NON</code>, puis <code>justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c3-e3) — Duplex intégral : le chemin de la trame\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chemin complet]\n# Données : 4\n# Données : pc1 construit\n# Données : sw1 relais\n# Données : sw2 livre\n# Données : pc2 reconnait\nA_COMPLETER\n\n[Cas 2 — Trame perdue]\n# Données : 3\n# Données : sw1 construit\n# Données : pc1 relais\n# Données : pc2 reconnait\nA_COMPLETER\n\n[Cas 3 — Départ et arrivée]\n# Données : 2\n# Données : pc1 construit\n# Données : pc2 reconnait\nA_COMPLETER\n",
    "hints": [
      "Les quatre couples : pc1-construit, sw1-relais, sw2-livre, pc2-reconnait.",
      "Le bilan sort après la boucle."
    ],
    "examples": [
      {
        "stdin": "4\npc1 construit\nsw1 relais\nsw2 livre\npc2 livre\n",
        "expected": "pc1 : OUI\nsw1 : OUI\nsw2 : OUI\npc2 : NON\njustes : 3/4"
      }
    ],
    "tests": [
      {
        "label": "Chemin complet",
        "stdin": "cas:1",
        "expected": "pc1 : OUI\nsw1 : OUI\nsw2 : OUI\npc2 : OUI\njustes : 4/4"
      },
      {
        "label": "Trame perdue",
        "stdin": "cas:2",
        "expected": "sw1 : NON\npc1 : NON\npc2 : OUI\njustes : 1/3"
      },
      {
        "label": "Départ et arrivée",
        "stdin": "cas:3",
        "expected": "pc1 : OUI\npc2 : OUI\njustes : 2/2"
      }
    ],
    "solution": "[Exemple]\npc1 : OUI\nsw1 : OUI\nsw2 : OUI\npc2 : NON\njustes : 3/4\n\n[Cas 1 — Chemin complet]\npc1 : OUI\nsw1 : OUI\nsw2 : OUI\npc2 : OUI\njustes : 4/4\n\n[Cas 2 — Trame perdue]\nsw1 : NON\npc1 : NON\npc2 : OUI\njustes : 1/3\n\n[Cas 3 — Départ et arrivée]\npc1 : OUI\npc2 : OUI\njustes : 2/2"
  },
  {
    "id": "cc-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Même sous-réseau ou routé",
    "goal": "Appliquer les deux règles d'or du sous-réseautage : séparés par un routeur ou non.",
    "brief": "<p>Analysez chaque ligne proposée « couple verdict » : couple est un code de liaison et verdict un code parmi <code>memegroupe</code> ou <code>groupesdifferents</code>. Règles du support : deux adresses <strong>non séparées</strong> par un routeur appartiennent au <em>même groupe</em> (sous-réseau) ; deux adresses <strong>séparées</strong> par au moins un routeur appartiennent à des <em>groupes différents</em>. Couples du support : <code>mmelAN</code> et <code>mmelRouteur</code> (même LAN, avec ou sans routeur entre les deux). Pour chaque ligne il Indiquez <code>couple : conforme</code> ou <code>couple : a revoir</code>, puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c4-e1) — Même sous-réseau ou routé\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les deux règles]\n# Données : 2\n# Données : mmelAN memegroupe\n# Données : mmelRouteur groupesdifferents\nA_COMPLETER\n\n[Cas 2 — Inversées]\n# Données : 2\n# Données : mmelAN groupesdifferents\n# Données : mmelRouteur memegroupe\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : 3\n# Données : mmelRouteur groupesdifferents\n# Données : mmelAN memegroupe\n# Données : mmelRouteur memegroupe\nA_COMPLETER\n",
    "hints": [
      "mmelAN → memegroupe ; mmelRouteur → groupesdifferents.",
      "Un case par couple donne le verdict attendu."
    ],
    "examples": [
      {
        "stdin": "2\nmmelAN memegroupe\nmmelAN groupesdifferents\n",
        "expected": "mmelAN : conforme\nmmelAN : a revoir\nconformes : 1/2"
      }
    ],
    "tests": [
      {
        "label": "Les deux règles",
        "stdin": "cas:1",
        "expected": "mmelAN : conforme\nmmelRouteur : conforme\nconformes : 2/2"
      },
      {
        "label": "Inversées",
        "stdin": "cas:2",
        "expected": "mmelAN : a revoir\nmmelRouteur : a revoir\nconformes : 0/2"
      },
      {
        "label": "Série mixte",
        "stdin": "cas:3",
        "expected": "mmelRouteur : conforme\nmmelAN : conforme\nmmelRouteur : a revoir\nconformes : 2/3"
      }
    ],
    "solution": "[Exemple]\nmmelAN : conforme\nmmelAN : a revoir\nconformes : 1/2\n\n[Cas 1 — Les deux règles]\nmmelAN : conforme\nmmelRouteur : conforme\nconformes : 2/2\n\n[Cas 2 — Inversées]\nmmelAN : a revoir\nmmelRouteur : a revoir\nconformes : 0/2\n\n[Cas 3 — Série mixte]\nmmelRouteur : conforme\nmmelAN : conforme\nmmelRouteur : a revoir\nconformes : 2/3"
  },
  {
    "id": "cc-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les quatre étapes du routage",
    "goal": "Dérouler la logique interne du routeur : FCS, désencapsulation, table de routage, réencapsulation.",
    "brief": "<p>Analysez chaque ligne proposée « etape action » : etape est un numéro de 1 à 4 et action un code parmi <code>fcs</code>, <code>desencapsule</code>, <code>table</code> ou <code>encapsule</code>. Les quatre étapes du support : 1 vérifier le FCS (jeter si erreur), 2 supprimer l'ancien en-tête de liaison de données, 3 chercher la meilleure route pour l'IP de destination, 4 encapsuler dans un nouvel en-tête et transmettre. Pour chaque ligne il Indiquez <code>etape N : OUI</code> quand le couple est juste, sinon <code>etape N : NON</code>, puis <code>justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c4-e2) — Les quatre étapes du routage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ordre parfait]\n# Données : 4\n# Données : 1 fcs\n# Données : 2 desencapsule\n# Données : 3 table\n# Données : 4 encapsule\nA_COMPLETER\n\n[Cas 2 — Permutation]\n# Données : 3\n# Données : 1 table\n# Données : 2 desencapsule\n# Données : 3 fcs\nA_COMPLETER\n\n[Cas 3 — Milieu juste]\n# Données : 2\n# Données : 2 desencapsule\n# Données : 3 table\nA_COMPLETER\n",
    "hints": [
      "1-fcs, 2-desencapsule, 3-table, 4-encapsule : l'ordre du support.",
      "Le numéro affiché est celui de l'étape."
    ],
    "examples": [
      {
        "stdin": "3\n1 fcs\n2 desencapsule\n4 encapsule\n",
        "expected": "etape 1 : OUI\netape 2 : OUI\netape 4 : OUI\njustes : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Ordre parfait",
        "stdin": "cas:1",
        "expected": "etape 1 : OUI\netape 2 : OUI\netape 3 : OUI\netape 4 : OUI\njustes : 4/4"
      },
      {
        "label": "Permutation",
        "stdin": "cas:2",
        "expected": "etape 1 : NON\netape 2 : OUI\netape 3 : NON\njustes : 1/3"
      },
      {
        "label": "Milieu juste",
        "stdin": "cas:3",
        "expected": "etape 2 : OUI\netape 3 : OUI\njustes : 2/2"
      }
    ],
    "solution": "[Exemple]\netape 1 : OUI\netape 2 : OUI\netape 4 : OUI\njustes : 3/3\n\n[Cas 1 — Ordre parfait]\netape 1 : OUI\netape 2 : OUI\netape 3 : OUI\netape 4 : OUI\njustes : 4/4\n\n[Cas 2 — Permutation]\netape 1 : NON\netape 2 : OUI\netape 3 : NON\njustes : 1/3\n\n[Cas 3 — Milieu juste]\netape 2 : OUI\netape 3 : OUI\njustes : 2/2"
  },
  {
    "id": "cc-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les trois protocoles de routage apprennent",
    "goal": "Simuler l'apprentissage des routes par protocole de routage : connexes, annonces, métrique.",
    "brief": "<p>Analysez les données fournies pour chaque cas..Rn), puis <strong>n lignes</strong> « routeur sousreseau » annoncés dans l'ordre de propagation (le dernier routeur est connecté au sous-réseau, les annonces remontent vers le premier). Le protocole de routage suit trois étapes du support : chaque routeur ajoute d'abord ses routes <em>connectées</em>, les voisins s'annoncent leurs routes, la meilleure route (métrique) entre dans la table. Indiquez pour chaque routeur (du dernier vers le premier) <code>routeur : apprend sousreseau</code>, puis <code>routes apprises : n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c4-e3) — Les trois protocoles de routage apprennent\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux routeurs]\n# Données : 2\n# Données : R1 10.0.0.0\n# Données : R2 10.0.0.0\nA_COMPLETER\n\n[Cas 2 — Cinq routeurs]\n# Données : 5\n# Données : R1 172.16.0.0\n# Données : R2 172.16.0.0\n# Données : R3 172.16.0.0\n# Données : R4 172.16.0.0\n# Données : R5 172.16.0.0\nA_COMPLETER\n\n[Cas 3 — Un seul]\n# Données : 1\n# Données : R1 192.168.1.0\nA_COMPLETER\n",
    "hints": [
      "Les annonces remontent du routeur connecté (dernier lu) vers le premier.",
      "Chaque routeur du chemin apprend exactement une route."
    ],
    "examples": [
      {
        "stdin": "3\nR1 150.150.4.0\nR2 150.150.4.0\nR3 150.150.4.0\n",
        "expected": "R3 : apprend 150.150.4.0\nR2 : apprend 150.150.4.0\nR1 : apprend 150.150.4.0\nroutes apprises : 3"
      }
    ],
    "tests": [
      {
        "label": "Deux routeurs",
        "stdin": "cas:1",
        "expected": "R2 : apprend 10.0.0.0\nR1 : apprend 10.0.0.0\nroutes apprises : 2"
      },
      {
        "label": "Cinq routeurs",
        "stdin": "cas:2",
        "expected": "R5 : apprend 172.16.0.0\nR4 : apprend 172.16.0.0\nR3 : apprend 172.16.0.0\nR2 : apprend 172.16.0.0\nR1 : apprend 172.16.0.0\nroutes apprises : 5"
      },
      {
        "label": "Un seul",
        "stdin": "cas:3",
        "expected": "R1 : apprend 192.168.1.0\nroutes apprises : 1"
      }
    ],
    "solution": "[Exemple]\nR3 : apprend 150.150.4.0\nR2 : apprend 150.150.4.0\nR1 : apprend 150.150.4.0\nroutes apprises : 3\n\n[Cas 1 — Deux routeurs]\nR2 : apprend 10.0.0.0\nR1 : apprend 10.0.0.0\nroutes apprises : 2\n\n[Cas 2 — Cinq routeurs]\nR5 : apprend 172.16.0.0\nR4 : apprend 172.16.0.0\nR3 : apprend 172.16.0.0\nR2 : apprend 172.16.0.0\nR1 : apprend 172.16.0.0\nroutes apprises : 5\n\n[Cas 3 — Un seul]\nR1 : apprend 192.168.1.0\nroutes apprises : 1"
  },
  {
    "id": "cc-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les trois modes de la CLI",
    "goal": "Valider l'escalade des modes Cisco : user, enable, configuration — et le retour avec exit.",
    "brief": "<p>Analysez chaque ligne proposée « commande modeattendu » : commande est un code parmi <code>enable</code>, <code>configure</code>, <code>exit</code> ou <code>showversion</code> ; modeattendu est un code parmi <code>user</code>, <code>enable</code> ou <code>config</code>. Règles du support : <code>enable</code> fait passer de user à enable ; <code>configure</code> (terminal) fait passer d'enable à config ; <code>exit</code> redescend d'un mode ; <code>showversion</code> s'exécute en user (non perturbant). Pour chaque ligne il Indiquez <code>commande : OK</code> si le mode annoncé est cohérent, sinon <code>commande : REFUSE</code>, puis <code>valides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c5-e1) — Les trois modes de la CLI\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Escalade complète]\n# Données : 3\n# Données : enable enable\n# Données : configure config\n# Données : exit enable\nA_COMPLETER\n\n[Cas 2 — Commandes interdites]\n# Données : 2\n# Données : reload user\n# Données : configure user\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : 3\n# Données : showversion user\n# Données : enable user\n# Données : exit config\nA_COMPLETER\n",
    "hints": [
      "enable→enable (depuis user), configure→config, exit→tous les modes (redescend), showversion→user.",
      "Un case par commande donne le mode attendu."
    ],
    "examples": [
      {
        "stdin": "3\nenable enable\nconfigure config\nshowversion enable\n",
        "expected": "enable : OK\nconfigure : OK\nshowversion : REFUSE\nvalides : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Escalade complète",
        "stdin": "cas:1",
        "expected": "enable : OK\nconfigure : OK\nexit : OK\nvalides : 3/3"
      },
      {
        "label": "Commandes interdites",
        "stdin": "cas:2",
        "expected": "reload : REFUSE\nconfigure : REFUSE\nvalides : 0/2"
      },
      {
        "label": "Série mixte",
        "stdin": "cas:3",
        "expected": "showversion : OK\nenable : REFUSE\nexit : OK\nvalides : 2/3"
      }
    ],
    "solution": "[Exemple]\nenable : OK\nconfigure : OK\nshowversion : REFUSE\nvalides : 2/3\n\n[Cas 1 — Escalade complète]\nenable : OK\nconfigure : OK\nexit : OK\nvalides : 3/3\n\n[Cas 2 — Commandes interdites]\nreload : REFUSE\nconfigure : REFUSE\nvalides : 0/2\n\n[Cas 3 — Série mixte]\nshowversion : OK\nenable : REFUSE\nexit : OK\nvalides : 2/3"
  },
  {
    "id": "cc-c5-e2",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Console, Telnet ou SSH",
    "goal": "Comparer les trois accès à la CLI : câble console (physique), Telnet (clair), SSH (chiffré).",
    "brief": "<p>Analysez chaque ligne proposée « acces propriete » : acces est un code parmi <code>console</code>, <code>telnet</code> ou <code>ssh</code> et propriete un code parmi <code>physique</code>, <code>clair</code> ou <code>chiffre</code>. Couples du support : la console exige une connexion <em>physique</em> ; Telnet transmet en <em>clair</em> (y compris les mots de passe) ; SSH <em>chiffre</em> toutes les données. Pour chaque ligne il Indiquez <code>acces : OUI</code> quand le couple est juste, sinon <code>acces : NON</code>, puis <code>justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c5-e2) — Console, Telnet ou SSH\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les trois]\n# Données : 3\n# Données : console physique\n# Données : telnet clair\n# Données : ssh chiffre\nA_COMPLETER\n\n[Cas 2 — Confusions]\n# Données : 2\n# Données : ssh clair\n# Données : telnet chiffre\nA_COMPLETER\n\n[Cas 3 — Console seule]\n# Données : 2\n# Données : console physique\n# Données : console chiffre\nA_COMPLETER\n",
    "hints": [
      "Les trois couples : console-physique, telnet-clair, ssh-chiffre.",
      "SSH est le seul accès chiffré ; Telnet le seul en clair."
    ],
    "examples": [
      {
        "stdin": "3\nconsole physique\ntelnet clair\nssh clair\n",
        "expected": "console : OUI\ntelnet : OUI\nssh : NON\njustes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Les trois",
        "stdin": "cas:1",
        "expected": "console : OUI\ntelnet : OUI\nssh : OUI\njustes : 3/3"
      },
      {
        "label": "Confusions",
        "stdin": "cas:2",
        "expected": "ssh : NON\ntelnet : NON\njustes : 0/2"
      },
      {
        "label": "Console seule",
        "stdin": "cas:3",
        "expected": "console : OUI\nconsole : NON\njustes : 1/2"
      }
    ],
    "solution": "[Exemple]\nconsole : OUI\ntelnet : OUI\nssh : NON\njustes : 2/3\n\n[Cas 1 — Les trois]\nconsole : OUI\ntelnet : OUI\nssh : OUI\njustes : 3/3\n\n[Cas 2 — Confusions]\nssh : NON\ntelnet : NON\njustes : 0/2\n\n[Cas 3 — Console seule]\nconsole : OUI\nconsole : NON\njustes : 1/2"
  },
  {
    "id": "cc-c5-e3",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "RAM, NVRAM, flash et ROM",
    "goal": "Placer les fichiers et programmes du commutateur dans les quatre mémoires Cisco.",
    "brief": "<p>Analysez chaque ligne proposée « fichier memoire » : memoire est un code parmi <code>ram</code>, <code>nvram</code>, <code>flash</code> ou <code>rom</code>. Placements du support : <strong>running-config</strong> vit en RAM (perdue à l'extinction), <strong>startup-config</strong> en NVRAM (conservée), l'<strong>IOS</strong> en flash, le <strong>bootstrap</strong> (programme d'amorçage) en ROM. Pour chaque ligne il Indiquez <code>fichier : OK</code> quand le placement est juste, sinon <code>fichier : KO (attendu X)</code>, puis <code>placements justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c5-e3) — RAM, NVRAM, flash et ROM\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tout en place]\n# Données : 4\n# Données : running-config ram\n# Données : startup-config nvram\n# Données : ios flash\n# Données : bootstrap rom\nA_COMPLETER\n\n[Cas 2 — Confusions classiques]\n# Données : 2\n# Données : startup-config flash\n# Données : ios nvram\nA_COMPLETER\n\n[Cas 3 — RAM volatile]\n# Données : 2\n# Données : running-config ram\n# Données : running-config nvram\nA_COMPLETER\n",
    "hints": [
      "running-config → ram ; startup-config → nvram ; ios → flash ; bootstrap → rom.",
      "En cas d'erreur, affiche la mémoire attendue entre parenthèses."
    ],
    "examples": [
      {
        "stdin": "3\nrunning-config ram\nstartup-config ram\nios flash\n",
        "expected": "running-config : OK\nstartup-config : KO (attendu nvram)\nios : OK\nplacements justes : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Tout en place",
        "stdin": "cas:1",
        "expected": "running-config : OK\nstartup-config : OK\nios : OK\nbootstrap : OK\nplacements justes : 4/4"
      },
      {
        "label": "Confusions classiques",
        "stdin": "cas:2",
        "expected": "startup-config : KO (attendu nvram)\nios : KO (attendu flash)\nplacements justes : 0/2"
      },
      {
        "label": "RAM volatile",
        "stdin": "cas:3",
        "expected": "running-config : OK\nrunning-config : KO (attendu ram)\nplacements justes : 1/2"
      }
    ],
    "solution": "[Exemple]\nrunning-config : OK\nstartup-config : KO (attendu nvram)\nios : OK\nplacements justes : 2/3\n\n[Cas 1 — Tout en place]\nrunning-config : OK\nstartup-config : OK\nios : OK\nbootstrap : OK\nplacements justes : 4/4\n\n[Cas 2 — Confusions classiques]\nstartup-config : KO (attendu nvram)\nios : KO (attendu flash)\nplacements justes : 0/2\n\n[Cas 3 — RAM volatile]\nrunning-config : OK\nrunning-config : KO (attendu ram)\nplacements justes : 1/2"
  },
  {
    "id": "cc-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Sécuriser les accès",
    "goal": "Associer chaque protection de la CLI à sa commande de configuration.",
    "brief": "<p>Analysez chaque ligne proposée « protection commande » : commande est un code parmi <code>passwordlogin</code> (mot de passe simple + login), <code>loginlocal</code> (noms d'utilisateurs locaux), <code>enablesecret</code> ou <code>transportinput</code>. Protections du support : <code>passwordlogin</code> protège console et vty avec un mot de passe partagé ; <code>loginlocal</code> exige un couple utilisateur/mot de passe local ; <code>enablesecret</code> protège le mode enable ; <code>transportinput</code> choisit les protocoles vty (ssh, telnet, all). Pour chaque ligne il Indiquez <code>protection : OK</code> ou <code>protection : ERREUR</code>, puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c6-e1) — Sécuriser les accès\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre]\n# Données : 4\n# Données : passwordlogin passwordlogin\n# Données : loginlocal loginlocal\n# Données : enablesecret enablesecret\n# Données : transportinput transportinput\nA_COMPLETER\n\n[Cas 2 — Deux erreurs]\n# Données : 2\n# Données : loginlocal passwordlogin\n# Données : enablesecret transportinput\nA_COMPLETER\n\n[Cas 3 — Série mixte]\n# Données : 3\n# Données : enablesecret enablesecret\n# Données : passwordlogin transportinput\n# Données : transportinput transportinput\nA_COMPLETER\n",
    "hints": [
      "passwordlogin → password + login ; loginlocal → login local ; enablesecret → enable secret ; transportinput → transport input.",
      "Le bilan sort après la boucle."
    ],
    "examples": [
      {
        "stdin": "2\npasswordlogin passwordlogin\ntransportinput enablesecret\n",
        "expected": "passwordlogin : OK\ntransportinput : ERREUR\nconformes : 1/2"
      }
    ],
    "tests": [
      {
        "label": "Les quatre",
        "stdin": "cas:1",
        "expected": "passwordlogin : OK\nloginlocal : OK\nenablesecret : OK\ntransportinput : OK\nconformes : 4/4"
      },
      {
        "label": "Deux erreurs",
        "stdin": "cas:2",
        "expected": "loginlocal : ERREUR\nenablesecret : ERREUR\nconformes : 0/2"
      },
      {
        "label": "Série mixte",
        "stdin": "cas:3",
        "expected": "enablesecret : OK\npasswordlogin : ERREUR\ntransportinput : OK\nconformes : 2/3"
      }
    ],
    "solution": "[Exemple]\npasswordlogin : OK\ntransportinput : ERREUR\nconformes : 1/2\n\n[Cas 1 — Les quatre]\npasswordlogin : OK\nloginlocal : OK\nenablesecret : OK\ntransportinput : OK\nconformes : 4/4\n\n[Cas 2 — Deux erreurs]\nloginlocal : ERREUR\nenablesecret : ERREUR\nconformes : 0/2\n\n[Cas 3 — Série mixte]\nenablesecret : OK\npasswordlogin : ERREUR\ntransportinput : OK\nconformes : 2/3"
  },
  {
    "id": "cc-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "IPv4 sur le commutateur",
    "goal": "Dérouler la configuration IPv4 de gestion : SVI, adresse/masque, no shutdown, passerelle.",
    "brief": "<p>Analysez chaque ligne proposée « etape commande » : etape est un numéro de 1 à 5 et commande un code parmi <code>svi</code>, <code>ipaddress</code>, <code>noshutdown</code>, <code>gateway</code> ou <code>nameserver</code>. Étapes du support : 1 <code>interface vlan 1</code> (la SVI), 2 <code>ip address</code> (adresse + masque), 3 <code>no shutdown</code>, 4 <code>ip default-gateway</code> (obligatoire pour parler hors du sous-réseau), 5 <code>ip name-server</code> (facultatif, DNS). Pour chaque ligne il Indiquez <code>etape N : OK</code> ou <code>etape N : NON</code>, puis <code>justes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c6-e2) — IPv4 sur le commutateur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ordre parfait]\n# Données : 5\n# Données : 1 svi\n# Données : 2 ip-address\n# Données : 3 noshutdown\n# Données : 4 gateway\n# Données : 5 nameserver\nA_COMPLETER\n\n[Cas 2 — Deux inversions]\n# Données : 3\n# Données : 1 svi\n# Données : 2 gateway\n# Données : 3 ipaddress\nA_COMPLETER\n\n[Cas 3 — Cœur de config]\n# Données : 3\n# Données : 2 ip-address\n# Données : 3 noshutdown\n# Données : 4 gateway\nA_COMPLETER\n",
    "hints": [
      "1-svi, 2-ipaddress, 3-noshutdown, 4-gateway, 5-nameserver : l'ordre du support.",
      "L'étape 5 est facultative mais garde sa place dans l'ordre."
    ],
    "examples": [
      {
        "stdin": "3\n1 svi\n2 ip-address\n4 gateway\n",
        "expected": "etape 1 : OK\netape 2 : OK\netape 4 : OK\njustes : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Ordre parfait",
        "stdin": "cas:1",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netape 5 : OK\njustes : 5/5"
      },
      {
        "label": "Deux inversions",
        "stdin": "cas:2",
        "expected": "etape 1 : OK\netape 2 : NON\netape 3 : NON\njustes : 1/3"
      },
      {
        "label": "Cœur de config",
        "stdin": "cas:3",
        "expected": "etape 2 : OK\netape 3 : OK\netape 4 : OK\njustes : 3/3"
      }
    ],
    "solution": "[Exemple]\netape 1 : OK\netape 2 : OK\netape 4 : OK\njustes : 3/3\n\n[Cas 1 — Ordre parfait]\netape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netape 5 : OK\njustes : 5/5\n\n[Cas 2 — Deux inversions]\netape 1 : OK\netape 2 : NON\netape 3 : NON\njustes : 1/3\n\n[Cas 3 — Cœur de config]\netape 2 : OK\netape 3 : OK\netape 4 : OK\njustes : 3/3"
  },
  {
    "id": "cc-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le confort du laboratoire",
    "goal": "Simuler les trois commandes de confort : logging synchronous, exec-timeout, no ip domain-lookup.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Effets du support : sans <code>s</code>, les messages syslog s'invitent en pleine saisie ; sans <code>t</code>, la session expire après 5 minutes ; sans <code>d</code>, une commande mal tapée bloque une minute sur une résolution DNS. Pour chaque session il Indiquez <code>session : fluide</code> si les trois réglages sont présents, sinon <code>session : gene (motif X)</code> où X vaut <code>syslog</code>, <code>timeout</code> ou <code>dns</code> (premier motif manquant dans l'ordre s, t, d). Il termine par <code>sessions fluides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (cc-c6-e3) — Le confort du laboratoire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Parfaites]\n# Données : 2\n# Données : lab1 std\n# Données : lab2 std\nA_COMPLETER\n\n[Cas 2 — Sans timeout]\n# Données : 2\n# Données : lab1 sd\n# Données : lab2 std\nA_COMPLETER\n\n[Cas 3 — Aucun réglage]\n# Données : 3\n# Données : lab1 -\n# Données : lab2 d\n# Données : lab3 t\nA_COMPLETER\n",
    "hints": [
      "Parcourez la suite caractère par caractère : s, t, d dans cet ordre.",
      "Signale le PREMIER réglage manquant ; le tiret vaut absence de tout réglage."
    ],
    "examples": [
      {
        "stdin": "3\ns1 std\ns2 st\ns3 -\n",
        "expected": "s1 : fluide\ns2 : gene (motif dns)\ns3 : gene (motif syslog)\nsessions fluides : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Parfaites",
        "stdin": "cas:1",
        "expected": "lab1 : fluide\nlab2 : fluide\nsessions fluides : 2/2"
      },
      {
        "label": "Sans timeout",
        "stdin": "cas:2",
        "expected": "lab1 : gene (motif timeout)\nlab2 : fluide\nsessions fluides : 1/2"
      },
      {
        "label": "Aucun réglage",
        "stdin": "cas:3",
        "expected": "lab1 : gene (motif syslog)\nlab2 : gene (motif syslog)\nlab3 : gene (motif syslog)\nsessions fluides : 0/3"
      }
    ],
    "solution": "[Exemple]\ns1 : fluide\ns2 : gene (motif dns)\ns3 : gene (motif syslog)\nsessions fluides : 1/3\n\n[Cas 1 — Parfaites]\nlab1 : fluide\nlab2 : fluide\nsessions fluides : 2/2\n\n[Cas 2 — Sans timeout]\nlab1 : gene (motif timeout)\nlab2 : fluide\nsessions fluides : 1/2\n\n[Cas 3 — Aucun réglage]\nlab1 : gene (motif syslog)\nlab2 : gene (motif syslog)\nlab3 : gene (motif syslog)\nsessions fluides : 0/3"
  }
];
