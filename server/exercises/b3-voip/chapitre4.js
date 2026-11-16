'use strict';

module.exports = [
  {
    "id": "vo3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le menu vocal du standard d'UrgenceFuite",
    "exampleTitle": "Exemple résolu — la hotline du loueur Vél'Océan",
    "goal": "Lire un Dialplan Asterisk simple : extensions spéciales, applications Answer, Background, WaitExten et renvoi vers la boîte vocale.",
    "brief": "<p><strong>Énoncé.</strong> La société de dépannage UrgenceFuite publie un numéro unique pour ses clients. Son IPBX Asterisk exécute le Dialplan suivant :</p><pre>[accueil]\nexten => s,1,Answer()\nexten => s,n,Background(bienvenue-urgencefuite)\nexten => s,n,WaitExten(6)\nexten => 1,1,Dial(SIP/301,15)\nexten => 1,n,VoiceMail(301@urgence)\nexten => 2,1,Queue(astreinte)\nexten => 2,n,Hangup()\nexten => t,1,Playback(merci-au-revoir)\nexten => t,n,Hangup()</pre><p>Rappel du cours : l'extension s (start) accueille un appel sans numéro composé ; l'extension t (timeout) est déclenchée quand aucune touche n'est pressée dans le délai imparti.</p><ol><li>Quelle extension spéciale sert de point d'entrée à l'appel entrant ?</li><li>Que fait l'application Answer() exécutée en priorité 1 ?</li><li>Quelle application diffuse le message d'accueil tout en restant à l'écoute des touches DTMF ?</li><li>Quelle extension spéciale est déclenchée si l'appelant ne presse aucune touche pendant les 6 secondes ?</li><li>Un client presse la touche 1 mais personne ne décroche au poste 301 pendant les 15 secondes : que devient l'appel ?</li></ol><p>Répondez de façon courte (une lettre, une application, une phrase brève pour la question 5).</p>",
    "starter": "# Exercice — Le menu vocal du standard d'UrgenceFuite\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : une lettre, une application ou une phrase brève.\n\n[Question 1 — Extension spéciale de point d'entrée]\nA_COMPLETER\n\n[Question 2 — Rôle de l'application Answer()]\nA_COMPLETER\n\n[Question 3 — Application qui joue le menu en écoutant les touches]\nA_COMPLETER\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nA_COMPLETER\n\n[Question 5 — Devenir de l'appel si le poste 301 ne répond pas]\nA_COMPLETER\n",
    "hints": [
      "Suivez l'exécution dans l'ordre des priorités : 1, puis n (next) : Answer, Background, WaitExten.",
      "Deux applications jouent des sons : Background écoute les touches pendant la diffusion, Playback ne les écoute pas.",
      "1. Un appel entrant sans numéro composé démarre sur l'extension s. 2. Answer() décroche la ligne. 3. Le menu est diffusé par Background(). 4. Sans touche pendant 6 s, l'extension t prend le relais. 5. Après Dial(SIP/301,15) sans réponse, la priorité suivante VoiceMail(301@urgence) prend l'appel."
    ],
    "examples": [
      {
        "stdin": "Le loueur Vél'Océan diffuse ce menu : [accueil]\nexten => s,1,Answer()\nexten => s,n,Background(bienvenue-velocean)\nexten => s,n,WaitExten(4)\nexten => 1,1,Dial(SIP/101,10)\nexten => 1,n,VoiceMail(101@velocean)\nexten => t,1,Playback(au-revoir)\nexten => t,n,Hangup()\n\n1) L'appel entre par l'extension s.\n2) Answer() décroche la ligne.\n3) Background(bienvenue-velocean) joue le menu en écoutant les touches.\n4) Sans touche pendant 4 s : extension t (Playback au-revoir puis Hangup).\n5) Poste 101 sans réponse pendant 10 s : l'appel part sur la boîte vocale 101.",
        "expected": "entrée par s — Answer() décroche — Background écoute les touches — t après 4 s — boîte vocale 101",
        "note": "Playback, lui, joue un son sans écouter les touches : on le réserve aux annonces finales."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Extension spéciale de point d'entrée",
        "stdin": "q:1",
        "expected": "s||l'extension s"
      },
      {
        "label": "Question 2 — Rôle de l'application Answer()",
        "stdin": "q:2",
        "expected": "elle décroche la ligne||elle décroche||décrocher la ligne||elle décroche l'appel||elle décroche le canal"
      },
      {
        "label": "Question 3 — Application qui joue le menu en écoutant les touches",
        "stdin": "q:3",
        "expected": "Background||Background()||background"
      },
      {
        "label": "Question 4 — Extension spéciale déclenchée sans aucune touche",
        "stdin": "q:4",
        "expected": "t||l'extension t"
      },
      {
        "label": "Question 5 — Devenir de l'appel si le poste 301 ne répond pas",
        "stdin": "q:5",
        "expected": "il part sur la boîte vocale 301||il est renvoyé vers la boîte vocale 301||vers la boîte vocale 301||la boîte vocale 301||il bascule sur la messagerie vocale 301"
      }
    ],
    "solution": "[Question 1 — Extension spéciale de point d'entrée]\ns\n\n[Question 2 — Rôle de l'application Answer()]\nelle décroche la ligne\n\n[Question 3 — Application qui joue le menu en écoutant les touches]\nBackground\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nt\n\n[Question 5 — Devenir de l'appel si le poste 301 ne répond pas]\nil part sur la boîte vocale 301",
    "takeaway": "1) L'appel entrant, sans numéro composé, démarre sur l'extension spéciale s (start).\n2) Answer() décroche la ligne : l'IPBX répond à l'appelant dès la priorité 1.\n3) C'est Background(bienvenue-urgencefuite) qui diffuse le message tout en collectant les touches DTMF.\n4) Sans aucune touche pendant les 6 secondes de WaitExten(6), l'extension t (timeout) est déclenchée : message de remerciement puis Hangup().\n5) Dial(SIP/301,15) sonne 15 secondes ; sans décrochage, l'exécution passe à la priorité suivante : VoiceMail(301@urgence), l'appel est renvoyé sur la boîte vocale du poste 301.\nContrôle : la touche 2 mène à la file astreinte (Queue) puis à un Hangup propre : chaque branche du menu se termine par une issue explicite."
  },
  {
    "id": "vo3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les masques de numérotation de la mutuelle Solidia",
    "exampleTitle": "Exemple résolu — le plan du centre de formation Confluences",
    "goal": "Faire correspondre des numéros composés aux motifs Asterisk _X, _Z, _N et extraire ${EXTEN}.",
    "brief": "<p><strong>Énoncé.</strong> La mutuelle Solidia regroupe 300 salariés derrière un IPBX Asterisk. Le Dialplan du contexte [work] ne contient que ces trois règles à motifs :</p><table><tr><th>Règle</th><th>Motif</th><th>Action</th></tr><tr><th>A</th><td>_4XXX</td><td>Dial(SIP/${EXTEN},15) — postes internes</td></tr><tr><th>B</th><td>_0Z.</td><td>Dial(SIP/trunk-solidia/${EXTEN},30) — réseau public</td></tr><tr><th>C</th><td>_99N</td><td>Queue(conseillers) — numéros courts du service conseil</td></tr></table><p>Rappel du cours : X correspond à un chiffre de 0 à 9 ; Z à un chiffre de 1 à 9 ; N à un chiffre de 2 à 9 ; le point correspond à un ou plusieurs caractères quelconques ; ${EXTEN} contient le numéro composé. La variable ${EXTEN} vaut exactement la chaîne composée.</p><ol><li>Un salarié compose 4271 : quelle règle (A, B ou C) s'applique ?</li><li>Un salarié compose 0698765432 : quelle règle s'applique ?</li><li>Dans le motif _4XXX, que représente le symbole X ?</li><li>Quelle est la plus grande extension interne interceptée par la règle A ?</li><li>Quelle est la plus petite extension interne interceptée par la règle A ?</li><li>Quel symbole de motif correspond uniquement aux chiffres de 2 à 9 ?</li></ol><p>Répondez par la lettre de la règle, le nombre ou le symbole attendus.</p>",
    "starter": "# Exercice — Les masques de numérotation de la mutuelle Solidia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par la lettre de la règle, le nombre ou le symbole attendus.\n\n[Question 1 — Règle appliquée au numéro 4271]\nA_COMPLETER\n\n[Question 2 — Règle appliquée au numéro 0698765432]\nA_COMPLETER\n\n[Question 3 — Signification du symbole X]\nA_COMPLETER\n\n[Question 4 — Plus grande extension interne de la règle A]\nA_COMPLETER\n\n[Question 5 — Plus petite extension interne de la règle A]\nA_COMPLETER\n\n[Question 6 — Symbole des chiffres de 2 à 9]\nA_COMPLETER\n",
    "hints": [
      "Un motif Asterisk commence par le souligné : chaque caractère du motif (X, Z, N, chiffre littéral, point) doit correspondre au numéro composé, chiffre par chiffre.",
      "La règle A _4XXX capture exactement quatre chiffres commençant par 4 ; la règle B _0Z. commence par 0 puis un chiffre non nul, suivi d'au moins un caractère.",
      "1. 4271 : quatre chiffres commençant par 4. 2. 0698765432 : 0 puis 6 (non nul) puis huit chiffres. 3. X couvre 0 à 9. 4. et 5. Balayez 4000 à 4999. 6. Le symbole réservé aux chiffres 2 à 9 est N."
    ],
    "examples": [
      {
        "stdin": "Le centre de formation Confluences utilise deux motifs :\n_3XXX pour les postes internes (Dial SIP) et _0[1-5]. pour le réseau public via le trunk.\n\n1) 3112 composé : quatre chiffres commençant par 3 : règle des postes internes (_3XXX).\n2) 0219876543 composé : 0 puis 2 (dans la liste 1 à 5) puis d'autres chiffres : règle du trunk (_0[1-5].).\n3) X représente un chiffre de 0 à 9.\n4) La plus grande extension interne interceptée : 3999.\n5) Le symbole [1-5] : un chiffre parmi 1, 2, 3, 4 ou 5.",
        "expected": "3112 → postes internes — 0219876543 → trunk — X : 0 à 9 — 3999 — [1-5] : un chiffre de 1 à 5",
        "note": "Les crochets énumèrent les chiffres admis : [1-5] accepte 1, 2, 3, 4 et 5, rien d'autre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Règle appliquée au numéro 4271",
        "stdin": "q:1",
        "expected": "A||la règle A||règle A"
      },
      {
        "label": "Question 2 — Règle appliquée au numéro 0698765432",
        "stdin": "q:2",
        "expected": "B||la règle B||règle B"
      },
      {
        "label": "Question 3 — Signification du symbole X",
        "stdin": "q:3",
        "expected": "un chiffre de 0 à 9||n'importe quel chiffre de 0 à 9||un chiffre entre 0 et 9||un chiffre compris entre 0 et 9||un chiffre de 0 a 9"
      },
      {
        "label": "Question 4 — Plus grande extension interne de la règle A",
        "stdin": "q:4",
        "expected": "4999||la 4999"
      },
      {
        "label": "Question 5 — Plus petite extension interne de la règle A",
        "stdin": "q:5",
        "expected": "4000||la 4000"
      },
      {
        "label": "Question 6 — Symbole des chiffres de 2 à 9",
        "stdin": "q:6",
        "expected": "N||le symbole N"
      }
    ],
    "solution": "[Question 1 — Règle appliquée au numéro 4271]\nA\n\n[Question 2 — Règle appliquée au numéro 0698765432]\nB\n\n[Question 3 — Signification du symbole X]\nun chiffre de 0 à 9\n\n[Question 4 — Plus grande extension interne de la règle A]\n4999\n\n[Question 5 — Plus petite extension interne de la règle A]\n4000\n\n[Question 6 — Symbole des chiffres de 2 à 9]\nN",
    "takeaway": "1) 4271 : le 4 littéral suivi de trois chiffres quelconques (271) : c'est la règle A (_4XXX), l'appel sonne au poste SIP/4271 pendant 15 secondes.\n2) 0698765432 : le 0 littéral, puis 6 (chiffre non nul, donc Z), puis huit caractères (le point) : règle B (_0Z.), l'appel sort par le trunk vers le réseau public.\n3) X représente n'importe quel chiffre de 0 à 9.\n4) La règle A capture les numéros de 4000 à 4999 : la plus grande extension est 4999.\n5) La plus petite est 4000.\n6) C'est le symbole N qui correspond uniquement aux chiffres de 2 à 9 (Z couvre 1 à 9, X couvre 0 à 9).\nContrôle : la règle C _99N intercepte les numéros courts 992 à 999 (trois chiffres, le dernier entre 2 et 9), tous dirigés vers la file conseillers."
  },
  {
    "id": "vo3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La navigation dans le SVI d'AssurPharma",
    "exampleTitle": "Exemple résolu — le serveur vocal du théâtre du Quartz",
    "goal": "Suivre un appelant dans un SVI : extensions i et t, Goto, files d'attente et durées d'attente.",
    "brief": "<p><strong>Énoncé.</strong> La mutuelle AssurPharma accueille ses adhérents par un serveur vocal interactif. Le Dialplan du contexte [menu] est le suivant :</p><pre>exten => s,1,Answer()\nexten => s,n,Background(menu-assurpharma)\nexten => s,n,WaitExten(8)\nexten => 1,1,Queue(ventes,rtt,,,60)\nexten => 1,n,Playback(repondeur-ventes)\nexten => 2,1,Queue(support,rtt,,,60)\nexten => 2,n,Playback(repondeur-support)\nexten => 3,1,Playback(horaires-agences)\nexten => 3,n,Goto(s,2)\nexten => t,1,Playback(merci-au-revoir)\nexten => t,n,Hangup()\nexten => i,1,Playback(touche-invalide)\nexten => i,n,Goto(s,2)</pre><p>Le menu diffusé annonce : « Tapez 1 pour les ventes, 2 pour le support, 3 pour les horaires des agences. »</p><p>Mme Costa appelle à 14:00. Elle écoute le menu, presse la touche 5 : un message lui signale que la touche est inconnue, puis le menu est rejoué. Elle presse alors la touche 2 à 14:02 et un conseiller du support décroche à 14:04.</p><ol><li>Quelle extension spéciale a intercepté la touche 5 ?</li><li>Quelle application rejoue le menu après le message « touche invalide » ?</li><li>Dans quelle file d'attente Mme Costa entre-t-elle en pressant la touche 2 ?</li><li>Quelle extension spéciale aurait été déclenchée si Mme Costa n'avait rien pressé pendant les 8 secondes ?</li><li>Combien de secondes Mme Costa a-t-elle attendu un conseiller, entre la pression sur la touche 2 et le décrochage ?</li><li>Que fait l'application Goto(s,2) ?</li></ol><p>Répondez de façon courte (une lettre, une application, un nom de file, un nombre, une phrase brève).</p>",
    "starter": "# Exercice — La navigation dans le SVI d'AssurPharma\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : une lettre, une application, un nom de file, un nombre.\n\n[Question 1 — Extension spéciale qui intercepte la touche 5]\nA_COMPLETER\n\n[Question 2 — Application qui rejoue le menu]\nA_COMPLETER\n\n[Question 3 — File d'attente choisie par la touche 2]\nA_COMPLETER\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nA_COMPLETER\n\n[Question 5 — Attente du conseiller (en secondes)]\nA_COMPLETER\n\n[Question 6 — Rôle de l'application Goto(s,2)]\nA_COMPLETER\n",
    "hints": [
      "Les deux extensions spéciales du SVI : i (invalid) pour une touche inconnue, t (timeout) pour l'absence de touche.",
      "Goto(s,2) ramène l'exécution à la priorité 2 de l'extension s : regardez ce que fait cette priorité.",
      "1. La touche 5 n'existe pas dans le contexte : extension i. 2. La priorité 2 de s diffuse le menu. 3. La touche 2 mène à Queue(support). 4. Sans touche pendant 8 s : extension t. 5. De 14:02 à 14:04. 6. Goto(s,2) renvoie au début du menu."
    ],
    "examples": [
      {
        "stdin": "Le théâtre du Quartz diffuse : [menu]\nexten => s,1,Answer()\nexten => s,n,Background(menu-quartz)\nexten => s,n,WaitExten(5)\nexten => 1,1,Queue(billetterie)\nexten => 2,1,Playback(programmation)\nexten => 2,n,Goto(s,2)\nexten => t,1,Playback(au-revoir)\nexten => t,n,Hangup()\nexten => i,1,Playback(touche-invalide)\nexten => i,n,Goto(s,2)\n\nM. Farid appelle à 18:00, presse 7 (message « touche invalide », menu rejoué),\npuis presse 2 à 18:01 : il entend la programmation puis le menu revient.\n\n1) La touche 7 est interceptée par l'extension i.\n2) Le menu est rejoué par Background (Goto(s,2) ramène à la priorité 2 de s).\n3) S'il n'avait rien pressé pendant 5 s : extension t (au-revoir puis Hangup).\n4) Goto(s,2) renvoie l'exécution au début du menu.",
        "expected": "touche 7 → extension i — menu rejoué par Background — aucune touche → t — Goto(s,2) renvoie au menu",
        "note": "Les extensions t (timeout) et i (invalid) sont les garde-fous d'un SVI : sans elles, un appelant perdu resterait bloqué."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Extension spéciale qui intercepte la touche 5",
        "stdin": "q:1",
        "expected": "i||l'extension i"
      },
      {
        "label": "Question 2 — Application qui rejoue le menu",
        "stdin": "q:2",
        "expected": "Background||Background()||background"
      },
      {
        "label": "Question 3 — File d'attente choisie par la touche 2",
        "stdin": "q:3",
        "expected": "support||la file support||la file d'attente support"
      },
      {
        "label": "Question 4 — Extension spéciale déclenchée sans aucune touche",
        "stdin": "q:4",
        "expected": "t||l'extension t"
      },
      {
        "label": "Question 5 — Attente du conseiller (en secondes)",
        "stdin": "q:5",
        "expected": "120||120 secondes||120 s"
      },
      {
        "label": "Question 6 — Rôle de l'application Goto(s,2)",
        "stdin": "q:6",
        "expected": "elle rejoue le menu||elle renvoie au menu||renvoie au menu||elle retourne au menu||revient au menu||elle ramène l'exécution au menu"
      }
    ],
    "solution": "[Question 1 — Extension spéciale qui intercepte la touche 5]\ni\n\n[Question 2 — Application qui rejoue le menu]\nBackground\n\n[Question 3 — File d'attente choisie par la touche 2]\nsupport\n\n[Question 4 — Extension spéciale déclenchée sans aucune touche]\nt\n\n[Question 5 — Attente du conseiller (en secondes)]\n120\n\n[Question 6 — Rôle de l'application Goto(s,2)]\nelle rejoue le menu",
    "takeaway": "1) La touche 5 n'est déclarée nulle part dans le contexte : c'est l'extension i (invalid) qui l'intercepte.\n2) Après le message « touche invalide », Goto(s,2) ramène l'exécution à la priorité 2 de s, qui est Background(menu-assurpharma) : le menu est rejoué.\n3) La touche 2 déclenche Queue(support) : Mme Costa entre dans la file support.\n4) Sans aucune touche pendant les 8 secondes de WaitExten(8), l'extension t aurait diffusé le message de remerciement puis raccroché.\n5) De 14:02 (pression sur 2) à 14:04 (décrochage) : 120 secondes d'attente, dans la limite des 60 secondes imparties au Queue avant le répondeur.\n6) Goto(s,2) renvoie l'exécution à la priorité 2 de l'extension s, c'est-à-dire au début du menu.\nContrôle : la touche 3 aurait joué les horaires puis, par le même Goto(s,2), ramené Mme Costa au menu : chaque branche du SVI se referme sur une issue connue."
  }
];
