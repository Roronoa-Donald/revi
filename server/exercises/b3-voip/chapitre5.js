'use strict';

module.exports = [
  {
    "id": "vo3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le dimensionnement du standard de la clinique Saint-Roch",
    "exampleTitle": "Exemple résolu — le standard du garage AutoMillau",
    "goal": "Calculer un trafic en Erlangs et lire une table d'Erlang B pour dimensionner un trunk téléphonique.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Saint-Roch veut souscrire un trunk SIP pour son standard. À l'heure de pointe, le standard reçoit <strong>90 appels</strong>, d'une durée moyenne de <strong>2 minutes</strong>. Le trafic s'écrit A = (nombre d'appels à l'heure × durée moyenne en secondes) / 3600. La direction exige un taux de blocage (GoS) d'au plus 1 %. Le tableau d'Erlang B pour le trafic de la pointe est le suivant :</p><table><tr><th>Canaux N</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr><tr><th>Blocage B(N, A)</th><td>11,0 %</td><td>5,2 %</td><td>2,2 %</td><td>0,8 %</td><td>0,3 %</td></tr></table><p>Rappel du cours : en régime Erlang B, tout appel qui arrive alors que les N canaux sont occupés est immédiatement rejeté, sans file d'attente.</p><ol><li>Quel est le trafic de l'heure de pointe, en Erlangs ?</li><li>Que représente exactement un trafic de 1 Erlang ?</li><li>Combien de canaux la clinique doit-elle au minimum souscrire pour respecter le GoS de 1 % ?</li><li>Si la clinique ne souscrivait que 6 canaux, quel pourcentage d'appels serait refusé à l'heure de pointe ?</li><li>Dans le modèle d'Erlang B, que devient un appel qui arrive quand tous les canaux sont occupés ?</li></ol><p>Répondez par le nombre ou la phrase brève attendus.</p>",
    "starter": "# Exercice — Le dimensionnement du standard de la clinique Saint-Roch\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre ou la phrase brève attendus.\n\n[Question 1 — Trafic de l'heure de pointe (en Erlangs)]\nA_COMPLETER\n\n[Question 2 — Signification d'un trafic de 1 Erlang]\nA_COMPLETER\n\n[Question 3 — Nombre minimal de canaux pour un GoS de 1 %]\nA_COMPLETER\n\n[Question 4 — Pourcentage d'appels refusés avec 6 canaux]\nA_COMPLETER\n\n[Question 5 — Devenir d'un appel quand tous les canaux sont occupés]\nA_COMPLETER\n",
    "hints": [
      "Convertissez tout en secondes : 90 appels de 120 secondes, divisés par 3600, donnent le trafic en Erlangs.",
      "Dans la table, cherchez la première colonne où le blocage tombe à 1 % ou moins : c'est le nombre de canaux minimal.",
      "1. A = 90 × 120 / 3600. 2. Un Erlang, c'est un canal occupé sans interruption pendant une heure. 3. Parcourez la table jusqu'à un blocage inférieur ou égal à 1 %. 4. Lisez la colonne N = 6. 5. Erlang B ne met personne en attente : l'appel excédentaire est perdu."
    ],
    "examples": [
      {
        "stdin": "Le garage AutoMillau reçoit 60 appels à l'heure de pointe, d'une durée moyenne de 2 minutes.\nTrafic : A = 60 × 120 / 3600 = 2 Erlangs. Table d'Erlang B pour A = 2 :\nN = 4 : 9,5 % — N = 5 : 3,7 % — N = 6 : 1,2 % — N = 7 : 0,34 %.\nGoS visé : 1 %.\n\n1) Trafic : 2 Erlangs.\n2) 1 Erlang : un canal occupé à 100 % pendant une heure.\n3) 6 canaux donnent 1,2 % (trop) ; il faut 7 canaux (0,34 % ≤ 1 %).\n4) Avec 5 canaux : 3,7 % des appels refusés.",
        "expected": "2 Erlangs — 7 canaux nécessaires — 1 Erlang : un canal occupé une heure — avec 5 canaux : 3,7 % de refus",
        "note": "Erlang B suppose qu'aucun appel n'attend : chaque appel refusé est perdu, d'où le choix d'un GoS très faible."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Trafic de l'heure de pointe (en Erlangs)",
        "stdin": "q:1",
        "expected": "3||3 Erlangs"
      },
      {
        "label": "Question 2 — Signification d'un trafic de 1 Erlang",
        "stdin": "q:2",
        "expected": "un canal occupé à 100 % pendant une heure||un canal occupé à 100% pendant une heure||un canal occupé en continu pendant une heure||un canal occupé sans interruption pendant une heure"
      },
      {
        "label": "Question 3 — Nombre minimal de canaux pour un GoS de 1 %",
        "stdin": "q:3",
        "expected": "8||8 canaux"
      },
      {
        "label": "Question 4 — Pourcentage d'appels refusés avec 6 canaux",
        "stdin": "q:4",
        "expected": "5,2||5.2||5,2 %||5.2%"
      },
      {
        "label": "Question 5 — Devenir d'un appel quand tous les canaux sont occupés",
        "stdin": "q:5",
        "expected": "il est rejeté||il est refusé||rejeté||il est perdu||il entend la tonalité occupé"
      }
    ],
    "solution": "[Question 1 — Trafic de l'heure de pointe (en Erlangs)]\n3\n\n[Question 2 — Signification d'un trafic de 1 Erlang]\nun canal occupé à 100 % pendant une heure\n\n[Question 3 — Nombre minimal de canaux pour un GoS de 1 %]\n8\n\n[Question 4 — Pourcentage d'appels refusés avec 6 canaux]\n5,2\n\n[Question 5 — Devenir d'un appel quand tous les canaux sont occupés]\nil est rejeté",
    "takeaway": "1) Trafic : A = 90 × 120 / 3600 = 10 800 / 3600 = 3 Erlangs.\n2) Un Erlang représente un canal téléphonique occupé à 100 % pendant une heure entière (par exemple deux canaux occupés chacun 30 minutes).\n3) Dans la table : B(7, 3) = 2,2 % (supérieur à 1 %) et B(8, 3) = 0,8 % (inférieur ou égal à 1 %) : il faut souscrire au minimum 8 canaux.\n4) Avec 6 canaux, la table donne B(6, 3) = 5,2 % : environ un appel sur vingt serait refusé à l'heure de pointe.\n5) En régime Erlang B, sans file d'attente, l'appel arrivé quand tous les canaux sont occupés est immédiatement rejeté (tonalité occupé).\nContrôle : entre 7 et 8 canaux, le blocage passe de 2,2 % à 0,8 % : le canal supplémentaire divise presque par trois le taux de refus, c'est lui qui satisfait le GoS."
  },
  {
    "id": "vo3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit QoS du lycée technique Vercors",
    "exampleTitle": "Exemple résolu — l'audit du groupe hôtelier Les Pins",
    "goal": "Vérifier le marquage QoS d'un réseau ToIP (DSCP EF, CS3, CoS, Voice VLAN) et confronter les mesures aux seuils G.114.",
    "brief": "<p><strong>Énoncé.</strong> Le lycée technique Vercors bascule sa téléphonie sur IP. Le professeur réseau relève la configuration en production :</p><table><tr><th>Flux ou équipement</th><th>Configuration observée</th></tr><tr><th>Flux voix RTP</th><td>DSCP EF, valeur décimale 46</td></tr><tr><th>Signalisation SIP</th><td>DSCP CS3, valeur décimale 24</td></tr><tr><th>Trafic web et messagerie</th><td>DSCP 0 (best effort)</td></tr><tr><th>Ports des postes IP</th><td>Voice VLAN 20, CoS 802.1p = 5</td></tr><tr><th>Mesures sur la liaison</th><td>délai unidirectionnel 40 ms, gigue 9 ms, pertes 0,1 %</td></tr></table><p>Rappels du cours : la voix supporte au plus 150 ms de délai unidirectionnel, 30 ms de gigue et 1 % de pertes (ITU-T G.114) ; le champ ToS de l'en-tête IPv4 est réinterprété par DiffServ.</p><ol><li>Quel PHB DiffServ marque le flux voix RTP ?</li><li>Quelle valeur décimale du champ DSCP correspond à EF ?</li><li>Quel marquage DiffServ protège la signalisation SIP ?</li><li>Quelle valeur de CoS 802.1p les postes voix portent-ils dans le Voice VLAN ?</li><li>Quel est le seuil de délai unidirectionnel recommandé par la G.114, en ms ?</li><li>Les mesures de la liaison respectent-elles les trois seuils de la G.114 (oui ou non) ?</li></ol><p>Répondez par le nom, le nombre ou oui/non.</p>",
    "starter": "# Exercice — L'audit QoS du lycée technique Vercors\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom, le nombre ou oui/non.\n\n[Question 1 — PHB DiffServ du flux voix RTP]\nA_COMPLETER\n\n[Question 2 — Valeur décimale DSCP de EF]\nA_COMPLETER\n\n[Question 3 — Marquage DiffServ de la signalisation SIP]\nA_COMPLETER\n\n[Question 4 — Valeur de CoS 802.1p des postes voix]\nA_COMPLETER\n\n[Question 5 — Seuil de délai unidirectionnel G.114 (en ms)]\nA_COMPLETER\n\n[Question 6 — Les mesures respectent-elles les trois seuils]\nA_COMPLETER\n",
    "hints": [
      "Relisez le tableau : le flux RTP porte le marquage réservé à la priorité stricte, la signalisation un marquage de classe CS.",
      "Les seuils G.114 : 150 ms de délai unidirectionnel, 30 ms de gigue, 1 % de pertes.",
      "1. Le PHB de la voix est EF (Expedited Forwarding). 2. Sa valeur décimale figure dans le tableau. 3. La signalisation est marquée CS3. 4. La CoS voix vaut 5. 5. Le seuil de délai est 150 ms. 6. Comparez 40 ms, 9 ms et 0,1 % aux trois seuils."
    ],
    "examples": [
      {
        "stdin": "Le groupe hôtelier Les Pins audite son réseau ToIP.\nFlux RTP : DSCP EF 46 ; signalisation : AF31 26 ; bureautique : DSCP 0 ; Voice VLAN 60, CoS 5.\nMesures : délai unidirectionnel 190 ms, gigue 12 ms, pertes 0,2 %.\n\n1) Le PHB de la voix : EF.\n2) Valeur décimale : 46.\n3) La signalisation est marquée AF31 (26).\n4) CoS voix : 5.\n5) Seuil G.114 : 150 ms ; les 190 ms mesurés le dépassent : la voix est coupée malgré une gigue et des pertes conformes.",
        "expected": "PHB EF — 46 — AF31 pour le SIP — CoS 5 — seuil 150 ms, dépassé par les 190 ms mesurés",
        "note": "Le marquage n'accélère rien sans file de priorité : EF n'a d'effet que si le routeur applique une file prioritaire (LLQ) aux paquets marqués."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — PHB DiffServ du flux voix RTP",
        "stdin": "q:1",
        "expected": "EF||ef||expedited forwarding||le PHB EF"
      },
      {
        "label": "Question 2 — Valeur décimale DSCP de EF",
        "stdin": "q:2",
        "expected": "46||la valeur 46"
      },
      {
        "label": "Question 3 — Marquage DiffServ de la signalisation SIP",
        "stdin": "q:3",
        "expected": "CS3||cs3||le CS3||dscp cs3"
      },
      {
        "label": "Question 4 — Valeur de CoS 802.1p des postes voix",
        "stdin": "q:4",
        "expected": "5||la CoS 5"
      },
      {
        "label": "Question 5 — Seuil de délai unidirectionnel G.114 (en ms)",
        "stdin": "q:5",
        "expected": "150||150 ms"
      },
      {
        "label": "Question 6 — Les mesures respectent-elles les trois seuils",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — PHB DiffServ du flux voix RTP]\nEF\n\n[Question 2 — Valeur décimale DSCP de EF]\n46\n\n[Question 3 — Marquage DiffServ de la signalisation SIP]\nCS3\n\n[Question 4 — Valeur de CoS 802.1p des postes voix]\n5\n\n[Question 5 — Seuil de délai unidirectionnel G.114 (en ms)]\n150\n\n[Question 6 — Les mesures respectent-elles les trois seuils]\noui",
    "takeaway": "1) Le flux voix RTP porte le PHB EF (Expedited Forwarding), celui de la file de priorité stricte.\n2) EF correspond à la valeur décimale 46 du champ DSCP (soit 0xB8 dans le champ ToS d'origine).\n3) La signalisation SIP est marquée CS3 (24) — le cours admet aussi AF31 (26) selon les plateformes.\n4) Dans le Voice VLAN 20, les postes voix portent une CoS 802.1p de 5, la valeur réservée à la voix.\n5) La G.114 recommande au plus 150 ms de délai unidirectionnel.\n6) Oui : 40 ms de délai (≤ 150), 9 ms de gigue (≤ 30) et 0,1 % de pertes (≤ 1 %) : les trois seuils sont respectés.\nContrôle : le trafic web, lui, reste en best effort (DSCP 0) : sans ces marquages distincts, un transfert de fichier massif pourrait retarder les paquets voix et faire exploser la gigue."
  },
  {
    "id": "vo3-c5-e3",
    "chapter": 5,
    "title": "Observer les mappages STUN avant les vérifications ICE",
    "level": "n3",
    "language": "analyse",
    "goal": "Comparer deux mappages observés sans confondre cette observation avec une preuve de connectivité.",
    "brief": "<p>Deux serveurs STUN (RFC 8489) observent l'adresse et le port d'un même socket local. Comparez les deux couples observés : s'ils sont égaux, indiquez <code>MAPPAGES_IDENTIQUES</code>, sinon <code>MAPPAGES_DIFFERENTS</code>. Comparer ces deux observations ne permet pas de déterminer le filtrage ni de garantir qu'un pair sera joignable, même si les valeurs sont identiques à l'adresse locale.</p>\n<p>La suite est de procéder à des vérifications de connectivité ICE (RFC 8445), avec un relais TURN éventuel selon les résultats et la configuration. Cette grille n'établit ni le type exact de NAT ni le chemin choisi.</p>\n<p>Chaque ligne contient <code>CLIENT_LOCAL=&lt;adresse:port&gt; STUN1_MAPPED=&lt;adresse:port&gt; STUN2_MAPPED=&lt;adresse:port&gt;</code>. Recopiez les trois valeurs et indiquez l'observation selon ce format :</p>\n<p><code>LOCAL:&lt;local&gt; | MAPPED_S1:&lt;s1&gt; | MAPPED_S2:&lt;s2&gt; | OBSERVATION:&lt;MAPPAGES_IDENTIQUES ou MAPPAGES_DIFFERENTS&gt; | SUITE:VERIFIER_ICE</code></p>",
    "starter": "# Grille d'analyse (vo3-c5-e3) — Observer les mappages STUN avant les vérifications ICE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45000\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45002\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CLIENT_LOCAL=195.154.10.2:5060 STUN1_MAPPED=195.154.10.2:5060 STUN2_MAPPED=195.154.10.2:5060\nA_COMPLETER\n",
    "hints": [
      "Comparez les deux couples adresse et port observés par les serveurs.",
      "Les observations seules ne démontrent pas que le trafic entre les pairs est autorisé.",
      "Comparez l adresse IP et le port renvoyés par les deux serveurs STUN : un port différent trahit un NAT symétrique, sans prouver l établisssement de flux média."
    ],
    "examples": [
      {
        "stdin": "CLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10500\nCLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10501\nCLIENT_LOCAL=203.0.113.10:5060 STUN1_MAPPED=203.0.113.10:5060 STUN2_MAPPED=203.0.113.10:5060",
        "expected": "LOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "LOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "LOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n"
      }
    ],
    "solution": "[Exemple]\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n\n[Cas 1 — Cas de test 1]\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\n\n[Cas 2 — Cas de test 2]\nLOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE",
    "takeaway": "À retenir : Comparer deux mappages observés sans confondre cette observation avec une preuve de connectivité.\nRepère : Cas d'usage nominal."
  }
];
