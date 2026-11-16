'use strict';

module.exports = [
  {
    "id": "sup3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Lire les plugins Nagios du serveur web d'Aquaparc",
    "exampleTitle": "Exemple résolu — les vérifications du serveur de messagerie MailRelais",
    "goal": "Interpréter les états OK, WARNING, CRITICAL et UNKNOWN d'un plugin Nagios et leurs codes de retour.",
    "brief": "<p><strong>Énoncé.</strong> Nagios Core supervise le serveur web du parc aquatique Aquaparc. Convention du cours : chaque plugin renvoie un code de retour, 0 pour OK, 1 pour WARNING, 2 pour CRITICAL et 3 pour UNKNOWN. Résultats du dernier passage de vérification :</p><table><tr><th>Vérification</th><th>Sortie du plugin</th></tr><tr><th>Charge système</th><td>OK — load average : 1.2, 1.8, 2.1</td></tr><tr><th>Espace disque /</th><td>DISK CRITICAL — espace libre : 2 % (420 Mo)</td></tr><tr><th>Service HTTP</th><td>HTTP WARNING : HTTP/1.1 200 OK — réponse en 1.8 seconde</td></tr><tr><th>Processus httpd</th><td>PROCS CRITICAL : 0 processus avec le nom httpd</td></tr><tr><th>Latence ping</th><td>PING OK — perte de paquets = 0 %, RTA = 12 ms</td></tr></table><ol><li>Quel code de retour un plugin Nagios renvoie-t-il pour un état WARNING ?</li><li>Quel code de retour correspond à l'état CRITICAL ?</li><li>Combien de vérifications sont en état critique ?</li><li>Quelle vérification est en état WARNING ?</li><li>Quel état Nagios affiche-t-il lorsque le plugin ne sait pas conclure, par exemple au terme d'un délai d'exécution dépassé (code 3) ?</li></ol>",
    "starter": "# Exercice — Lire les plugins Nagios du serveur web d'Aquaparc\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul. Question 4 : le nom de la vérification. Question 5 : un mot.\n\n[Question 1 — Code de retour de l'état WARNING]\nA_COMPLETER\n\n[Question 2 — Code de retour de l'état CRITICAL]\nA_COMPLETER\n\n[Question 3 — Nombre de vérifications critiques]\nA_COMPLETER\n\n[Question 4 — Vérification en état WARNING]\nA_COMPLETER\n\n[Question 5 — État d'un plugin qui ne sait pas conclure]\nA_COMPLETER\n",
    "hints": [
      "Les codes de retour suivent la gravité croissante : 0 pour OK, 1 pour WARNING, 2 pour CRITICAL, puis 3 pour l'indéterminé.",
      "Comptez les lignes marquées CRITICAL dans le tableau : deux vérifications y figurent, une seule porte WARNING.",
      "1. WARNING porte le code 1. 2. CRITICAL porte le code 2. 3. Disque et processus httpd sont critiques. 4. Le HTTP répond 200 mais lentement : c'est lui qui est en WARNING. 5. Le code 3 correspond à UNKNOWN."
    ],
    "examples": [
      {
        "stdin": "Le serveur de messagerie MailRelais est vérifié par Nagios.\ncheck_smtp répond en 2.5 secondes (WARNING), check_disk affiche 45 % d'espace libre (OK),\ncheck_procs trouve 0 processus smtpd (CRITICAL) et une sonde a dépassé son délai d'exécution.\n\n1) Codes : 0 OK, 1 WARNING, 2 CRITICAL, 3 UNKNOWN.\n2) Une seule vérification est critique (les processus smtpd).\n3) La sonde SMTP est en WARNING pour lenteur de réponse.\n4) La sonde en timeout remonte UNKNOWN : elle n'a pas pu conclure.",
        "expected": "une vérification critique — SMTP en WARNING pour lenteur — la sonde en timeout passe en UNKNOWN",
        "note": "Un plugin qui ne répond pas dans le délai imparti remonte UNKNOWN : c'est un état à part entière, pas un OK déguisé, et il doit être traité comme une panne de supervision."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Code de retour de l'état WARNING",
        "stdin": "q:1",
        "expected": "1||le code 1"
      },
      {
        "label": "Question 2 — Code de retour de l'état CRITICAL",
        "stdin": "q:2",
        "expected": "2||le code 2"
      },
      {
        "label": "Question 3 — Nombre de vérifications critiques",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Vérification en état WARNING",
        "stdin": "q:4",
        "expected": "le service http||http||le http||check_http||service http"
      },
      {
        "label": "Question 5 — État d'un plugin qui ne sait pas conclure",
        "stdin": "q:5",
        "expected": "unknown||inconnu||l'état unknown||l'état inconnu"
      }
    ],
    "solution": "[Question 1 — Code de retour de l'état WARNING]\n1\n\n[Question 2 — Code de retour de l'état CRITICAL]\n2\n\n[Question 3 — Nombre de vérifications critiques]\n2\n\n[Question 4 — Vérification en état WARNING]\nle service http\n\n[Question 5 — État d'un plugin qui ne sait pas conclure]\nunknown",
    "takeaway": "1) Le code de retour d'un plugin en état WARNING est 1.\n2) Le code de retour d'un plugin en état CRITICAL est 2.\n3) Deux vérifications sont critiques : l'espace disque (2 % libres) et les processus httpd (0 processus).\n4) Le service HTTP est en WARNING : il répond bien 200 OK, mais en 1,8 seconde, au-delà du seuil de latence configuré.\n5) Un plugin qui ne sait pas conclure, par exemple à cause d'un délai dépassé, renvoie le code 3 : l'état UNKNOWN.\nContrôle : sur cinq vérifications, deux sont OK (charge et ping), une WARNING (HTTP), deux CRITICAL (disque et processus) : chaque ligne du tableau est classée une seule fois."
  },
  {
    "id": "sup3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Le trigger Zabbix à hystérésis du serveur de calcul NovaGrid",
    "exampleTitle": "Exemple résolu — le trigger mémoire du serveur d'intégration ContinueCI",
    "goal": "Appliquer des seuils warning et critique avec durée de maintien et hystérésis sur une série de mesures CPU.",
    "brief": "<p><strong>Énoncé.</strong> Le serveur de calcul NovaGrid exécute des simulations pour un bureau d'études. L'équipe Zabbix configure le trigger d'utilisation CPU ainsi : alerte <strong>warning</strong> si la CPU reste à <strong>80 % ou plus pendant 5 minutes consécutives</strong> ; alerte <strong>critique</strong> si elle reste à <strong>90 % ou plus pendant 3 minutes consécutives</strong> ; avec hystérésis, l'alerte ne se résout que lorsque la CPU repasse <strong>sous 75 %</strong>. Mesures minute par minute :</p><table><tr><th>Minute</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th></tr><tr><th>CPU (%)</th><td>91</td><td>92</td><td>93</td><td>88</td><td>90</td><td>74</td><td>72</td><td>68</td><td>71</td><td>74</td><td>79</td><td>82</td></tr></table><ol><li>Quel est le seuil de déclenchement de l'alerte critique, en pourcentage ?</li><li>À quelle minute l'alerte critique se déclenche-t-elle ?</li><li>À la minute 4, la CPU retombe à 88 %, puis remonte à 90 % à la minute 5 : sans hystérésis, que produiraient ces allers-retours autour du seuil ?</li><li>Avec l'hystérésis (résolution sous 75 %), à quelle minute l'alerte critique se résout-elle ?</li><li>Combien de minutes consécutives à 80 % ou plus faut-il pour déclencher l'alerte warning ?</li></ol>",
    "starter": "# Exercice — Le trigger Zabbix à hystérésis du serveur de calcul NovaGrid\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2, 4 et 5 : le nombre seul. Question 3 : le nom du phénomène.\n\n[Question 1 — Seuil de l'alerte critique (en %)]\nA_COMPLETER\n\n[Question 2 — Minute de déclenchement de l'alerte critique]\nA_COMPLETER\n\n[Question 3 — Phénomène produit par les allers-retours autour du seuil]\nA_COMPLETER\n\n[Question 4 — Minute de résolution de l'alerte (hystérésis)]\nA_COMPLETER\n\n[Question 5 — Durée de maintien du seuil warning (en minutes)]\nA_COMPLETER\n",
    "hints": [
      "Parcourez la série en repérant les suites consécutives au-dessus de chaque seuil : les minutes 1, 2 et 3 forment trois relevés à 90 % ou plus.",
      "Sans hystérésis, un seuil résolu puis redépassé aussitôt allume et éteint l'alerte à chaque minute : c'est le flapping.",
      "1. Le seuil critique est donné dans l'énoncé. 2. Trois minutes consécutives à 90 % ou plus : comptez 91, 92, 93. 3. Nommez l'oscillation. 4. La résolution exige un relevé strictement sous 75 %. 5. Relisez la règle du warning."
    ],
    "examples": [
      {
        "stdin": "Le serveur d'intégration ContinueCI est supervisé sur la mémoire :\nwarning à 85 % pendant 4 minutes, critique à 95 % pendant 2 minutes, résolution sous 80 %.\nSérie RAM (%) : 96, 97, 94, 96, 74, 82.\n\n1) Seuil critique : 95 %.\n2) Les minutes 1 et 2 (96 et 97) déclenchent l'alerte critique à la minute 2.\n3) Sans hystérésis, la minute 3 (94 %) éteindrait l'alerte et la minute 4 (96 %) la rallumerait : du flapping.\n4) Avec hystérésis, la résolution n'arrive qu'à la minute 5 (74 % sous 80 %).\n5) Le warning exige 4 minutes consécutives à 85 % ou plus.",
        "expected": "critique déclenchée à la minute 2 — sans hystérésis, allumages et extinctions en série (flapping) — résolution effective à la minute 5 — warning après 4 minutes de dépassement",
        "note": "L'hystérésis élargit la zone neutre entre déclenchement et résolution : ici 95 % pour alerter, 80 % pour éteindre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Seuil de l'alerte critique (en %)",
        "stdin": "q:1",
        "expected": "90||90 %||90%"
      },
      {
        "label": "Question 2 — Minute de déclenchement de l'alerte critique",
        "stdin": "q:2",
        "expected": "3||minute 3||la minute 3"
      },
      {
        "label": "Question 3 — Phénomène produit par les allers-retours autour du seuil",
        "stdin": "q:3",
        "expected": "flapping||le flapping||du flapping"
      },
      {
        "label": "Question 4 — Minute de résolution de l'alerte (hystérésis)",
        "stdin": "q:4",
        "expected": "6||minute 6||la minute 6"
      },
      {
        "label": "Question 5 — Durée de maintien du seuil warning (en minutes)",
        "stdin": "q:5",
        "expected": "5||5 minutes||cinq minutes"
      }
    ],
    "solution": "[Question 1 — Seuil de l'alerte critique (en %)]\n90\n\n[Question 2 — Minute de déclenchement de l'alerte critique]\n3\n\n[Question 3 — Phénomène produit par les allers-retours autour du seuil]\nflapping\n\n[Question 4 — Minute de résolution de l'alerte (hystérésis)]\n6\n\n[Question 5 — Durée de maintien du seuil warning (en minutes)]\n5",
    "takeaway": "1) Le seuil de l'alerte critique est 90 %.\n2) Les minutes 1, 2 et 3 (91, 92 et 93 %) forment trois relevés consécutifs à 90 % ou plus : l'alerte critique se déclenche à la minute 3.\n3) Sans hystérésis, la baisse à 88 % (minute 4) résoudrait l'alerte et la remontée à 90 % (minute 5) la redéclencherait : cette oscillation rapide s'appelle le flapping.\n4) Avec hystérésis, l'alerte ne se résout qu'au premier relevé strictement sous 75 % : la minute 6 (74 %).\n5) L'alerte warning exige 5 minutes consécutives à 80 % ou plus.\nContrôle : les minutes 1 à 3 forment la seule suite de trois relevés à 90 % ou plus, et la minute 6 apporte le premier relevé sous 75 % : déclenchement à la minute 3, résolution à la minute 6."
  },
  {
    "id": "sup3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Escalade et acquittement : la nuit du NAS de StudioSon",
    "exampleTitle": "Exemple résolu — l'escalade du service d'impression PrintCenter",
    "goal": "Appliquer une politique d'escalade en escalier (prise en charge, résolution) et mesurer la durée d'un incident.",
    "brief": "<p><strong>Énoncé.</strong> Le dimanche 12 avril à <strong>02 h 10</strong>, Zabbix déclenche une alerte critique sur le NAS de StudioSon, le stockage des sessions audio. Politique d'escalade de l'entreprise : notification <strong>niveau 1</strong> (technicien d'astreinte) dès le déclenchement ; escalade <strong>niveau 2</strong> (chef d'astreinte) si l'alerte n'est pas acquittée dans les <strong>15 minutes</strong> ; escalade <strong>niveau 3</strong> (direction technique) si l'incident n'est pas résolu dans les <strong>45 minutes</strong> suivant le déclenchement. L'acquittement suspend les escalades de non-prise en charge, mais pas celles liées à la non-résolution. Journal de la nuit :</p><table><tr><th>Heure</th><th>Événement</th></tr><tr><th>02 h 10</th><td>alerte critique déclenchée, niveau 1 notifié</td></tr><tr><th>02 h 19</th><td>acquittement par le technicien d'astreinte</td></tr><tr><th>02 h 47</th><td>incident résolu, état OK rétabli</td></tr></table><ol><li>À quelle heure l'escalade niveau 2 aurait-elle été envoyée si personne n'avait acquitté l'alerte ?</li><li>Le niveau 2 a-t-il été notifié, compte tenu de l'acquittement à 02 h 19 ?</li><li>Le niveau 3 a-t-il été notifié ?</li><li>Combien de temps l'incident a-t-il duré, du déclenchement à la résolution ?</li><li>Comment se nomme le document rédigé après l'incident pour analyser les causes profondes sans rechercher de coupable ?</li></ol>",
    "starter": "# Exercice — Escalade et acquittement : la nuit du NAS de StudioSon\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : l'heure au format 02 h 25. Questions 2 et 3 : oui ou non.\n# Question 4 : le nombre de minutes. Question 5 : un court libellé.\n\n[Question 1 — Heure théorique de l'escalade niveau 2]\nA_COMPLETER\n\n[Question 2 — Le niveau 2 a-t-il été notifié ?]\nA_COMPLETER\n\n[Question 3 — Le niveau 3 a-t-il été notifié ?]\nA_COMPLETER\n\n[Question 4 — Durée de l'incident (en minutes)]\nA_COMPLETER\n\n[Question 5 — Document d'analyse rédigé après l'incident]\nA_COMPLETER\n",
    "hints": [
      "Datez chaque étape en ajoutant les délais de la politique au déclenchement de 02 h 10.",
      "Comparez l'heure d'acquittement (02 h 19) à l'heure théorique d'escalade (02 h 10 + 15 minutes) : l'acquittement arrive avant.",
      "1. Niveau 2 théorique = 02 h 10 + 15 min. 2. L'acquittement suspend cette escalade. 3. Le niveau 3 dépend de la résolution : comparez 37 minutes à 45 minutes. 4. De 02 h 10 à 02 h 47. 5. Le document sans blâme du SRE."
    ],
    "examples": [
      {
        "stdin": "Le service d'impression PrintCenter tombe en panne à 14 h 05.\nLe technicien acquitte à 14 h 12 ; l'incident n'est résolu qu'à 15 h 10.\nMême politique : niveau 2 à 15 minutes sans acquittement, niveau 3 à 45 minutes sans résolution.\n\n1) Niveau 2 théorique : 14 h 05 + 15 min = 14 h 20.\n2) Acquitté à 14 h 12, avant 14 h 20 : le niveau 2 n'est pas envoyé.\n3) À 14 h 50, l'incident dure déjà 45 minutes : le niveau 3 est notifié.\n4) Durée totale : de 14 h 05 à 15 h 10 = 65 minutes.\n5) Le lendemain, l'équipe rédige le post-mortem.",
        "expected": "niveau 2 prévu à 14 h 20, non envoyé — niveau 3 envoyé à 14 h 50 — incident de 65 minutes — post-mortem rédigé le lendemain",
        "note": "Acquitter vite protège l'équipe des relances de prise en charge ; résoudre vite est la seule protection contre les escalades de non-résolution."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Heure théorique de l'escalade niveau 2",
        "stdin": "q:1",
        "expected": "02:25||02h25||02 h 25||2h25||02 h 25."
      },
      {
        "label": "Question 2 — Le niveau 2 a-t-il été notifié ?",
        "stdin": "q:2",
        "expected": "non||pas notifié"
      },
      {
        "label": "Question 3 — Le niveau 3 a-t-il été notifié ?",
        "stdin": "q:3",
        "expected": "non||pas notifié"
      },
      {
        "label": "Question 4 — Durée de l'incident (en minutes)",
        "stdin": "q:4",
        "expected": "37||37 minutes||37 min"
      },
      {
        "label": "Question 5 — Document d'analyse rédigé après l'incident",
        "stdin": "q:5",
        "expected": "le post-mortem||post-mortem||postmortem||le post mortem||le rapport post-mortem"
      }
    ],
    "solution": "[Question 1 — Heure théorique de l'escalade niveau 2]\n02:25\n\n[Question 2 — Le niveau 2 a-t-il été notifié ?]\nnon\n\n[Question 3 — Le niveau 3 a-t-il été notifié ?]\nnon\n\n[Question 4 — Durée de l'incident (en minutes)]\n37\n\n[Question 5 — Document d'analyse rédigé après l'incident]\nle post-mortem",
    "takeaway": "1) Sans acquittement, l'escalade niveau 2 serait partie à 02 h 10 + 15 minutes = 02 h 25.\n2) Le technicien acquitte à 02 h 19, avant 02 h 25 : l'escalade de non-prise en charge est suspendue, le niveau 2 n'est pas notifié.\n3) L'incident est résolu à 02 h 47, soit 37 minutes après le déclenchement, avant l'échéance des 45 minutes : le niveau 3 n'est pas notifié.\n4) Durée de l'incident : de 02 h 10 à 02 h 47 = 37 minutes.\n5) Le document d'analyse sans recherche de coupable est le post-mortem.\nContrôle : 37 minutes de déclenchement à résolution contre 45 autorisées : huit minutes de marge ont évité l'escalade vers la direction technique."
  }
];
