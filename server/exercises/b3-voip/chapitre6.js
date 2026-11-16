'use strict';

module.exports = [
  {
    "id": "vo3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "La file d'attente du support d'Informatique Plus",
    "exampleTitle": "Exemple résolu — la file comptabilité du groupe Soluris",
    "goal": "Appliquer les stratégies de distribution ACD d'Asterisk (leastrecent, ringall, roundrobin) à un appel entrant.",
    "brief": "<p><strong>Énoncé.</strong> La société de services Informatique Plus reçoit ses appels de support dans une file d'attente ACD configurée ainsi dans /etc/asterisk/queues.conf :</p><pre>[support]\nstrategy=leastrecent\ntimeout=15\nretry=2\nwrapuptime=10\nmaxlen=20\nmember => SIP/301\nmember => SIP/302\nmember => SIP/303\nmember => SIP/304</pre><p>Le supervisor relève l'heure de fin du dernier appel traité par chaque agent :</p><table><tr><th>Agent</th><th>301</th><th>302</th><th>303</th><th>304</th></tr><tr><th>Dernier appel terminé</th><td>09:00</td><td>09:20</td><td>09:40</td><td>09:10</td></tr></table><p>À <strong>09:50</strong>, un client appelle : les quatre agents sont disponibles.</p><ol><li>Quelle stratégie de distribution la file utilise-t-elle ?</li><li>Quel agent reçoit l'appel de 09:50 ?</li><li>Quelle stratégie ferait sonner les quatre postes en même temps ?</li><li>Quelle stratégie distribue les appels à tour de rôle, dans l'ordre des membres déclarés ?</li><li>Dans quel fichier cette file d'attente est-elle déclarée ?</li></ol><p>Répondez de façon courte (le nom d'une stratégie, un numéro de poste, un nom de fichier).</p>",
    "starter": "# Exercice — La file d'attente du support d'Informatique Plus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : une stratégie, un numéro de poste, un fichier.\n\n[Question 1 — Stratégie de distribution configurée]\nA_COMPLETER\n\n[Question 2 — Agent qui reçoit l'appel de 09:50]\nA_COMPLETER\n\n[Question 3 — Stratégie qui fait sonner tous les postes]\nA_COMPLETER\n\n[Question 4 — Stratégie de distribution à tour de rôle]\nA_COMPLETER\n\n[Question 5 — Fichier de déclaration de la file]\nA_COMPLETER\n",
    "hints": [
      "Relisez la directive strategy de la configuration : c'est elle qui fixe la règle de distribution.",
      "La stratégie configurée favorise l'agent dont le dernier appel terminé remonte au plus longtemps.",
      "1. Lisez la ligne strategy=. 2. Comparez les heures de fin d'appel : 09:00 est la plus ancienne. 3. La sonnerie générale s'appelle ringall. 4. Le tour de rôle séquentiel s'appelle roundrobin. 5. Les files vivent dans queues.conf."
    ],
    "examples": [
      {
        "stdin": "La file comptabilité du groupe Soluris : [compta] strategy=leastrecent,\nmembres 501, 502, 503. Derniers appels terminés : 501 à 10:00, 502 à 10:15, 503 à 10:30.\nUn appel arrive à 10:45, tous disponibles.\n\n1) Stratégie : leastrecent.\n2) L'agent 501 reçoit l'appel : son dernier appel (10:00) remonte au plus longtemps.\n3) Pour tout faire sonner : ringall.\n4) Pour le tour de rôle : roundrobin.\n5) Fichier : queues.conf.",
        "expected": "leastrecent — agent 501 — ringall pour tout sonner — roundrobin pour le tour de rôle — queues.conf",
        "note": "leastrecent équilibre la charge : l'agent qui n'a pas été sollicité depuis le plus longtemps est servi en premier."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Stratégie de distribution configurée",
        "stdin": "q:1",
        "expected": "leastrecent||la stratégie leastrecent"
      },
      {
        "label": "Question 2 — Agent qui reçoit l'appel de 09:50",
        "stdin": "q:2",
        "expected": "301||l'agent 301||agent 301||SIP/301"
      },
      {
        "label": "Question 3 — Stratégie qui fait sonner tous les postes",
        "stdin": "q:3",
        "expected": "ringall||la stratégie ringall"
      },
      {
        "label": "Question 4 — Stratégie de distribution à tour de rôle",
        "stdin": "q:4",
        "expected": "roundrobin||la stratégie roundrobin"
      },
      {
        "label": "Question 5 — Fichier de déclaration de la file",
        "stdin": "q:5",
        "expected": "queues.conf||le fichier queues.conf"
      }
    ],
    "solution": "[Question 1 — Stratégie de distribution configurée]\nleastrecent\n\n[Question 2 — Agent qui reçoit l'appel de 09:50]\n301\n\n[Question 3 — Stratégie qui fait sonner tous les postes]\nringall\n\n[Question 4 — Stratégie de distribution à tour de rôle]\nroundrobin\n\n[Question 5 — Fichier de déclaration de la file]\nqueues.conf",
    "takeaway": "1) La directive strategy=leastrecent fixe la distribution : l'appel part vers l'agent disponible dont le dernier appel terminé remonte au plus longtemps.\n2) À 09:50, l'agent 301 a terminé son dernier appel à 09:00, la période de repos la plus ancienne : c'est lui qui reçoit l'appel (301 est d'ailleurs le premier membre déclaré, mais c'est bien l'ancienneté qui décide).\n3) ringall fait sonner simultanément tous les postes des agents disponibles, le premier décroché gagne l'appel.\n4) roundrobin distribue les appels à tour de rôle dans l'ordre des membres déclarés.\n5) La file est déclarée dans /etc/asterisk/queues.conf.\nContrôle : l'ordre d'ancienneté à 09:50 est 301 (09:00), 304 (09:10), 302 (09:20), 303 (09:40) : le prochain appel échoirait à l'agent 304, la charge reste équitable."
  },
  {
    "id": "vo3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le choix du trunk SIP pour le traiteur Delicealim",
    "exampleTitle": "Exemple résolu — la ligne du cabinet d'avocats Lorelle & Fils",
    "goal": "Comparer le coût mensuel chiffré d'un trunk SIP et de lignes analogiques, puis citer le routage au moindre coût.",
    "brief": "<p><strong>Énoncé.</strong> Delicealim, traiteur industriel à Rennes, consomme <strong>6 000 minutes par mois</strong> d'appels vers les fixes. L'opérateur propose deux offres :</p><table><tr><th></th><th>Offre A : trunk SIP</th><th>Offre B : deux lignes analogiques</th></tr><tr><th>Abonnement mensuel</th><td>45 € (4 canaux simultanés inclus)</td><td>24 € par ligne, soit 2 × 24 €</td></tr><tr><th>Tarif vers les fixes</th><td>0,009 € par minute</td><td>0,014 € par minute</td></tr></table><p>Le coût mensuel total = abonnement(s) + (minutes × tarif par minute). Delicealim arbitre aussi sur le principe du LCR vu en cours : l'IPBX analyse le préfixe du numéro composé pour choisir l'opérateur le moins cher.</p><ol><li>Quel est le coût mensuel total de l'offre A (trunk SIP), en euros ?</li><li>Quel est le coût mensuel total de l'offre B (lignes analogiques), en euros ?</li><li>Quelle économie mensuelle, en euros, Delicealim réalise-t-elle en choisissant l'offre A ?</li><li>Cette économie représente quel pourcentage du coût de l'offre B ?</li><li>Quel mécanisme de l'IPBX choisit automatiquement l'opérateur le moins cher selon le préfixe composé ?</li></ol><p>Répondez par le nombre ou le libellé attendus.</p>",
    "starter": "# Exercice — Le choix du trunk SIP pour le traiteur Delicealim\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Question 5 : le libellé du mécanisme.\n\n[Question 1 — Coût mensuel de l'offre A (en euros)]\nA_COMPLETER\n\n[Question 2 — Coût mensuel de l'offre B (en euros)]\nA_COMPLETER\n\n[Question 3 — Économie mensuelle en choisissant l'offre A (en euros)]\nA_COMPLETER\n\n[Question 4 — Économie en pourcentage du coût de l'offre B]\nA_COMPLETER\n\n[Question 5 — Mécanisme de choix automatique de l'opérateur]\nA_COMPLETER\n",
    "hints": [
      "Le coût mensuel total additionne l'abonnement et la consommation : minutes × tarif à la minute.",
      "Pour l'offre B, n'oubliez pas les deux abonnements de ligne avant d'ajouter la consommation.",
      "1. Offre A : 45 + 6 000 × 0,009. 2. Offre B : 2 × 24 + 6 000 × 0,014. 3. Économie = coût B − coût A. 4. Économie / coût B × 100. 5. Le sigle du routage au moindre coût est LCR."
    ],
    "examples": [
      {
        "stdin": "Le cabinet d'avocats Lorelle & Fils consomme 4 000 minutes par mois vers les fixes.\nTrunk SIP : 60 € d'abonnement + 0,008 €/min. Offre RNIS : 30 € d'abonnement + 0,012 €/min.\n\n1) Trunk SIP : 60 + 4 000 × 0,008 = 60 + 32 = 92 €.\n2) RNIS : 30 + 4 000 × 0,012 = 30 + 48 = 78 €.\n3) Ici le RNIS est moins cher : économie de 92 − 78 = 14 € par mois.\n4) En pourcentage du trunk : 14 / 92 ≈ 15 %.\n5) Le LCR choisit l'opérateur selon le préfixe composé.",
        "expected": "trunk 92 € — RNIS 78 € — économie 14 € pour le RNIS — environ 15 % — LCR selon le préfixe",
        "note": "Le trunk SIP n'est pas toujours gagnant : tout dépend du volume de minutes et du prix de l'abonnement, d'où l'intérêt du calcul complet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coût mensuel de l'offre A (en euros)",
        "stdin": "q:1",
        "expected": "99||99 €||99 euros"
      },
      {
        "label": "Question 2 — Coût mensuel de l'offre B (en euros)",
        "stdin": "q:2",
        "expected": "132||132 €||132 euros"
      },
      {
        "label": "Question 3 — Économie mensuelle en choisissant l'offre A (en euros)",
        "stdin": "q:3",
        "expected": "33||33 €||33 euros"
      },
      {
        "label": "Question 4 — Économie en pourcentage du coût de l'offre B",
        "stdin": "q:4",
        "expected": "25||25 %||25%"
      },
      {
        "label": "Question 5 — Mécanisme de choix automatique de l'opérateur",
        "stdin": "q:5",
        "expected": "LCR||le LCR||least cost routing||routage au moindre coût||le routage au moindre coût"
      }
    ],
    "solution": "[Question 1 — Coût mensuel de l'offre A (en euros)]\n99\n\n[Question 2 — Coût mensuel de l'offre B (en euros)]\n132\n\n[Question 3 — Économie mensuelle en choisissant l'offre A (en euros)]\n33\n\n[Question 4 — Économie en pourcentage du coût de l'offre B]\n25\n\n[Question 5 — Mécanisme de choix automatique de l'opérateur]\nLCR",
    "takeaway": "1) Offre A : 6 000 × 0,009 = 54 € de consommation + 45 € d'abonnement = 99 € par mois.\n2) Offre B : 2 × 24 = 48 € d'abonnements + 6 000 × 0,014 = 84 € de consommation = 132 € par mois.\n3) Économie mensuelle : 132 − 99 = 33 €.\n4) Économie relative : 33 / 132 × 100 = 25 % du coût de l'offre B.\n5) C'est le routage au moindre coût (LCR, Least Cost Routing) : l'IPBX analyse le préfixe du numéro composé et sélectionne l'opérateur au tarif optimal.\nContrôle : l'écart de consommation seule vaut 6 000 × (0,014 − 0,009) = 30 € ; l'abonnement du trunk, moins cher que les deux lignes (45 € contre 48 €), ajoute 3 € d'économie : 30 + 3 = 33 €."
  },
  {
    "id": "vo3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "L'attaque brute-force sur l'IPBX de Delicealim",
    "exampleTitle": "Exemple résolu — le scan de l'IPBX du musée du Bord de Mer",
    "goal": "Analyser un journal d'authentification Asterisk, comprendre le déclenchement de fail2ban et connaître TLS et SRTP.",
    "brief": "<p><strong>Énoncé.</strong> Le serveur Asterisk du traiteur Delicealim est exposé sur Internet. Un matin, le journal /var/log/asterisk/messages contient :</p><pre>NOTICE[3124] chan_sip.c: Registration from 'sip:201@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password\nNOTICE[3125] chan_sip.c: Registration from 'sip:202@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password\nNOTICE[3126] chan_sip.c: Registration from 'sip:203@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password\nNOTICE[3127] chan_sip.c: Registration from 'sip:admin@ipbx.delicealim.fr' failed for '203.0.113.66' - Wrong password</pre><p>Le service fail2ban surveille ce journal avec les paramètres <strong>maxretry = 3</strong> et <strong>bantime = 3600 s</strong> : dès qu'une adresse IP cumule le seuil d'échecs, une règle pare-feu iptables bloque le port SIP pour cette adresse.</p><ol><li>Quelle adresse IP mène l'attaque ?</li><li>Combien d'échecs d'enregistrement cette adresse a-t-elle cumulés dans le journal ?</li><li>Au bout de combien d'échecs fail2ban déclenche-t-il le blocage (maxretry) ?</li><li>Comment nomme-t-on ce type d'attaque qui essaie les identifiants un à un ?</li><li>Quel port UDP, cible par défaut de ces requêtes SIP, fail2ban doit-il filtrer ?</li><li>Quel protocole du cours chiffre le flux audio RTP ?</li></ol><p>Répondez par l'adresse, le nombre ou le mot attendus.</p>",
    "starter": "# Exercice — L'attaque brute-force sur l'IPBX de Delicealim\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par l'adresse, le nombre ou le mot attendus.\n\n[Question 1 — Adresse IP de l'attaquant]\nA_COMPLETER\n\n[Question 2 — Nombre d'échecs cumulés dans le journal]\nA_COMPLETER\n\n[Question 3 — Seuil d'échecs déclenchant le blocage]\nA_COMPLETER\n\n[Question 4 — Nom du type d'attaque]\nA_COMPLETER\n\n[Question 5 — Port UDP ciblé par les requêtes SIP]\nA_COMPLETER\n\n[Question 6 — Protocole qui chiffre le flux audio RTP]\nA_COMPLETER\n",
    "hints": [
      "Le champ « failed for » du journal donne l'adresse source de chaque tentative.",
      "Comparez le nombre d'échecs cumulés au paramètre maxretry : le blocage part du seuil, pas du total du journal.",
      "1. L'adresse revient sur les quatre lignes. 2. Comptez les lignes NOTICE. 3. maxretry = 3. 4. Essayer mot après mot s'appelle une attaque par force brute. 5. Le SIP écoute par défaut sur 5060/UDP. 6. Le chiffrement du média passe par SRTP."
    ],
    "examples": [
      {
        "stdin": "Le musée du Bord de Mer détecte sur son IPBX cinq échecs consécutifs depuis 198.51.100.7\n(extensions 300, 301, 302, 303 et 304 tentées). fail2ban : maxretry = 4, bantime = 1800 s.\n\n1) Adresse attaquante : 198.51.100.7.\n2) 5 échecs cumulés.\n3) Blocage au 4e échec (maxretry = 4).\n4) Attaque par force brute.\n5) Port ciblé : 5060/UDP.\n6) Le média se chiffre avec SRTP.",
        "expected": "IP 198.51.100.7 — 5 échecs — bannissement au 4e échec — force brute — port 5060 — SRTP",
        "note": "Les adresses 203.0.113.0/24 et 198.51.100.0/24 sont réservées à la documentation (RFC 5737) : aucun vrai réseau n'est visé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Adresse IP de l'attaquant",
        "stdin": "q:1",
        "expected": "203.0.113.66||l'adresse 203.0.113.66"
      },
      {
        "label": "Question 2 — Nombre d'échecs cumulés dans le journal",
        "stdin": "q:2",
        "expected": "4||quatre"
      },
      {
        "label": "Question 3 — Seuil d'échecs déclenchant le blocage",
        "stdin": "q:3",
        "expected": "3||au bout de 3||3 échecs||trois"
      },
      {
        "label": "Question 4 — Nom du type d'attaque",
        "stdin": "q:4",
        "expected": "brute-force||brute force||force brute||attaque par force brute||l'attaque par force brute"
      },
      {
        "label": "Question 5 — Port UDP ciblé par les requêtes SIP",
        "stdin": "q:5",
        "expected": "5060||le port 5060||5060/UDP"
      },
      {
        "label": "Question 6 — Protocole qui chiffre le flux audio RTP",
        "stdin": "q:6",
        "expected": "SRTP||srtp||le protocole SRTP"
      }
    ],
    "solution": "[Question 1 — Adresse IP de l'attaquant]\n203.0.113.66\n\n[Question 2 — Nombre d'échecs cumulés dans le journal]\n4\n\n[Question 3 — Seuil d'échecs déclenchant le blocage]\n3\n\n[Question 4 — Nom du type d'attaque]\nbrute-force\n\n[Question 5 — Port UDP ciblé par les requêtes SIP]\n5060\n\n[Question 6 — Protocole qui chiffre le flux audio RTP]\nSRTP",
    "takeaway": "1) L'adresse 203.0.113.66 apparaît comme source des quatre tentatives : c'est elle qui mène l'attaque.\n2) Le journal cumule 4 échecs d'enregistrement (201, 202, 203, puis le compte admin).\n3) maxretry = 3 : le blocage iptables est déclenché au troisième échec, le quatrième n'arrive même pas à l'IPBX.\n4) C'est une attaque par force brute (brute-force) : les mots de passe sont essayés un à un.\n5) Les requêtes SIP ciblent par défaut le port 5060/UDP : c'est ce port que fail2ban filtre.\n6) Le flux audio RTP se chiffre avec SRTP (RFC 3711, AES) ; côté signalisation, SIP TLS (port 5061/TCP) protège les identifiants.\nContrôle : bantime = 3600 s signifie que l'adresse 203.0.113.66 reste bloquée une heure complète : le temps de réagir et d'en informer l'opérateur."
  }
];
