'use strict';

module.exports = [
  {
    "id": "vo3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les postes du cabinet Vergnet & Associés",
    "exampleTitle": "Exemple résolu — l'étude notariale Beau-Séjour",
    "goal": "Dresser la liste des comptes SIP d'une PME et citer les directives de sip.conf qui les définissent.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet d'expertise comptable Vergnet & Associés, quatre collaborateurs, remplace son standard analogique par un IPBX Asterisk. La responsable informatique dresse la table d'extensions suivante :</p><table><tr><th>Extension</th><th>Collaborateur</th><th>Service</th><th>Contexte</th><th>Matériel</th></tr><tr><th>201</th><td>Aïcha Ndiaye</td><td>Accueil</td><td>work</td><td>Poste IP PoE</td></tr><tr><th>202</th><td>Marc Leroux</td><td>Comptabilité</td><td>work</td><td>Softphone sur portable</td></tr><tr><th>203</th><td>Sofia Pereira</td><td>Comptabilité</td><td>work</td><td>Poste IP PoE</td></tr><tr><th>204</th><td>Yanis Amrani</td><td>Direction</td><td>direction</td><td>Softphone nomade</td></tr></table><p>Le cabinet ajoute une boîte vocale générale, la numéro 250, qui accueille les appelants en dehors des horaires d'ouverture. Cette boîte n'est rattachée à aucun poste physique.</p><p>Rappel du cours : chaque poste est déclaré dans sip.conf par une section [numéro] avec les directives type, host, secret et context.</p><ol><li>Combien de comptes SIP faut-il déclarer dans sip.conf ?</li><li>Quelle directive indique qu'un poste sans adresse IP fixe doit s'enregistrer auprès du serveur ?</li><li>Quelle directive rattache chaque poste à son contexte d'acheminement du Dialplan ?</li><li>Quelle valeur du paramètre type autorise un poste à la fois à émettre et à recevoir des appels ?</li><li>Dans quel fichier les boîtes vocales, comme la 250, sont-elles déclarées ?</li></ol><p>Répondez de façon courte (un nombre, une directive, un mot).</p>",
    "starter": "# Exercice — Les postes du cabinet Vergnet & Associés\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez de façon courte : un nombre, une directive ou un mot.\n\n[Question 1 — Nombre de comptes SIP à déclarer]\nA_COMPLETER\n\n[Question 2 — Directive d'enregistrement pour un poste sans IP fixe]\nA_COMPLETER\n\n[Question 3 — Directive de rattachement au contexte]\nA_COMPLETER\n\n[Question 4 — Valeur de type pour émettre et recevoir]\nA_COMPLETER\n\n[Question 5 — Fichier des boîtes vocales]\nA_COMPLETER\n",
    "hints": [
      "Seuls les postes qui émettent et reçoivent des appels ont besoin d'un compte SIP : la boîte vocale générale n'en est pas un.",
      "Relisez la fiche type du cours : [706438029] avec type=friend, host=dynamic, secret=… et context=work.",
      "1. Comptez les postes de la table, pas les boîtes vocales. 2. host=dynamic impose l'enregistrement REGISTER. 3. La directive context fixe le contexte du Dialplan. 4. type=friend combine peer et user. 5. Les boîtes vocales se déclarent dans voicemail.conf."
    ],
    "examples": [
      {
        "stdin": "L'étude notariale Beau-Séjour installe un IPBX Asterisk : extensions 101 à 105 (cinq collaborateurs,\npostes IP et softphones) et une boîte vocale générale 199.\n\n1) Il faut déclarer 5 comptes SIP (101 à 105) : la boîte 199 n'est pas un poste.\n2) Les softphones sans IP fixe utilisent host=dynamic.\n3) Chaque poste est rattaché à son contexte par la directive context.\n4) type=friend autorise l'émission et la réception.\n5) La boîte 199 se déclare dans voicemail.conf.",
        "expected": "5 comptes — host=dynamic — context — friend — voicemail.conf",
        "note": "Une boîte vocale n'est pas un compte SIP : elle vit dans voicemail.conf, pas dans sip.conf."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de comptes SIP à déclarer",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Directive d'enregistrement pour un poste sans IP fixe",
        "stdin": "q:2",
        "expected": "host=dynamic||dynamic||la directive host=dynamic"
      },
      {
        "label": "Question 3 — Directive de rattachement au contexte",
        "stdin": "q:3",
        "expected": "context||la directive context||context=work"
      },
      {
        "label": "Question 4 — Valeur de type pour émettre et recevoir",
        "stdin": "q:4",
        "expected": "friend||type=friend"
      },
      {
        "label": "Question 5 — Fichier des boîtes vocales",
        "stdin": "q:5",
        "expected": "voicemail.conf||le fichier voicemail.conf"
      }
    ],
    "solution": "[Question 1 — Nombre de comptes SIP à déclarer]\n4\n\n[Question 2 — Directive d'enregistrement pour un poste sans IP fixe]\nhost=dynamic\n\n[Question 3 — Directive de rattachement au contexte]\ncontext\n\n[Question 4 — Valeur de type pour émettre et recevoir]\nfriend\n\n[Question 5 — Fichier des boîtes vocales]\nvoicemail.conf",
    "takeaway": "1) Il faut 4 comptes SIP : les extensions 201, 202, 203 et 204. La boîte vocale 250 n'est pas un poste : aucun compte SIP pour elle.\n2) host=dynamic : le poste n'a pas d'adresse IP fixe, il doit s'enregistrer par une requête REGISTER.\n3) C'est la directive context (ex. context=work pour l'accueil et la comptabilité, context=direction pour la direction) qui rattache le poste à son contexte du Dialplan.\n4) type=friend : le poste est à la fois client (peer, il émet) et serveur (user, il reçoit).\n5) Les boîtes vocales se déclarent dans /etc/asterisk/voicemail.conf, par contexte ([work], [direction]).\nContrôle : la table compte 4 lignes de postes pour 5 numéros annoncés (201 à 204 plus la boîte 250) : la différence est précisément la boîte vocale, sans compte SIP."
  },
  {
    "id": "vo3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La messagerie vocale du cabinet Vergnet",
    "exampleTitle": "Exemple résolu — le standard du musée du Bord de Mer",
    "goal": "Lire une configuration voicemail.conf et chiffrer le stockage des messages vocaux en G.711.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet Vergnet & Associés active la messagerie vocale de son IPBX Asterisk. L'extrait de /etc/asterisk/voicemail.conf est le suivant :</p><pre>[work]\n201 => 4102,Aïcha Ndiaye,accueil@vergnet-associes.fr,,attach=yes\n202 => 8831,Marc Leroux,comptabilite@vergnet-associes.fr,,attach=no\n203 => 5150,Sofia Pereira,comptabilite@vergnet-associes.fr,,attach=no</pre><p>Le message d'accueil du cabinet invite les clients à « laisser un message de deux minutes maximum ». Les messages sont enregistrés en G.711, soit un débit de 64 kbps.</p><p>Rappel du cours : la consultation d'une boîte passe par l'application VoiceMailMain() ; le code PIN (4 chiffres) est le premier champ de la ligne de la boîte.</p><ol><li>Quel code PIN Marc Leroux compose-t-il pour consulter sa boîte vocale ?</li><li>Quelle application du Dialplan permet à un salarié de consulter sa boîte vocale ?</li><li>Pour quelle boîte le message audio est-il envoyé par courriel en pièce jointe ?</li><li>Combien d'octets par seconde occupe un message enregistré en G.711 (64 kbps) ?</li><li>Quelle taille, en octets, occupe au maximum un message de deux minutes ?</li></ol><p>Répondez par le nombre, le code ou le nom attendus.</p>",
    "starter": "# Exercice — La messagerie vocale du cabinet Vergnet\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre, le code ou le nom attendus.\n\n[Question 1 — Code PIN de la boîte de Marc Leroux]\nA_COMPLETER\n\n[Question 2 — Application de consultation de la boîte vocale]\nA_COMPLETER\n\n[Question 3 — Boîte qui reçoit le message par courriel]\nA_COMPLETER\n\n[Question 4 — Octets par seconde d'un message G.711]\nA_COMPLETER\n\n[Question 5 — Taille maximale d'un message de deux minutes (en octets)]\nA_COMPLETER\n",
    "hints": [
      "Le code PIN est le premier champ après le numéro de boîte, avant le nom du propriétaire.",
      "Un débit de 64 kbps équivaut à 64 000 bits par seconde, donc 8 000 octets par seconde.",
      "1. PIN de 202 : lisez la deuxième ligne. 2. La consultation passe par VoiceMailMain(). 3. attach=yes n'apparaît que sur une ligne. 4. 64 000 / 8 = 8 000 octets/s. 5. Deux minutes = 120 secondes : multipliez."
    ],
    "examples": [
      {
        "stdin": "Le musée du Bord de Mer configure sa messagerie : [accueil]\n300 => 2178,Perpetue Mendy,accueil@musee-bm.fr,,attach=yes\nLes messages sont limités à 90 secondes, enregistrés en G.711 (64 kbps).\n\n1) Code PIN : 2178.\n2) Consultation : VoiceMailMain().\n3) La pièce jointe part pour la boîte 300 (attach=yes).\n4) 64 000 / 8 = 8 000 octets par seconde.\n5) 90 secondes : 8 000 × 90 = 720 000 octets.",
        "expected": "PIN 2178 — VoiceMailMain() — pièce jointe pour la boîte 300 — 8 000 octets/s — 720 000 octets",
        "note": "attach=yes transmet le fichier WAV par courriel ; la boîte conserve néanmoins sa copie sur le serveur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Code PIN de la boîte de Marc Leroux",
        "stdin": "q:1",
        "expected": "8831||le code 8831"
      },
      {
        "label": "Question 2 — Application de consultation de la boîte vocale",
        "stdin": "q:2",
        "expected": "VoiceMailMain()||VoiceMailMain||voicemailmain()||voicemailmain"
      },
      {
        "label": "Question 3 — Boîte qui reçoit le message par courriel",
        "stdin": "q:3",
        "expected": "201||la boîte 201||la boite 201"
      },
      {
        "label": "Question 4 — Octets par seconde d'un message G.711",
        "stdin": "q:4",
        "expected": "8000||8 000||8000 octets"
      },
      {
        "label": "Question 5 — Taille maximale d'un message de deux minutes (en octets)",
        "stdin": "q:5",
        "expected": "960000||960 000||960000 octets"
      }
    ],
    "solution": "[Question 1 — Code PIN de la boîte de Marc Leroux]\n8831\n\n[Question 2 — Application de consultation de la boîte vocale]\nVoiceMailMain()\n\n[Question 3 — Boîte qui reçoit le message par courriel]\n201\n\n[Question 4 — Octets par seconde d'un message G.711]\n8000\n\n[Question 5 — Taille maximale d'un message de deux minutes (en octets)]\n960000",
    "takeaway": "1) Le code PIN de la boîte 202 (Marc Leroux) est 8831.\n2) La consultation passe par l'application VoiceMailMain() du Dialplan.\n3) attach=yes n'apparaît que sur la ligne de la boîte 201 : seul le message d'Aïcha Ndiaye part en pièce jointe vers accueil@vergnet-associes.fr.\n4) 64 kbps = 64 000 bits/s = 64 000 / 8 = 8 000 octets par seconde.\n5) Deux minutes = 120 secondes : 8 000 × 120 = 960 000 octets, soit environ 0,96 Mo par message.\nContrôle : une heure de messages en G.711 occuperait 8 000 × 3 600 = 28,8 Mo : la limite de deux minutes tient chaque boîte sous le méga-octet par message."
  },
  {
    "id": "vo3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Les enregistrements SIP du serveur de Vergnet & Associés",
    "exampleTitle": "Exemple résolu — les baux de l'agence immobilière Horizon",
    "goal": "Suivre les baux d'enregistrement REGISTER d'un IPBX et détecter les postes injoignables.",
    "brief": "<p><strong>Énoncé.</strong> Les postes du cabinet Vergnet & Associés sont déclarés avec host=dynamic : chacun s'enregistre périodiquement auprès du Registrar d'Asterisk. À <strong>08:45:00</strong>, la console du serveur affiche l'état des enregistrements :</p><table><tr><th>Poste</th><th>Dernier REGISTER reçu</th><th>Durée du bail (expires)</th></tr><tr><th>201</th><td>08:00:00</td><td>3600 s</td></tr><tr><th>202</th><td>08:20:00</td><td>1800 s</td></tr><tr><th>204</th><td>07:00:00</td><td>3600 s</td></tr></table><p>Rappel du cours : le bail expire à l'heure du dernier REGISTER + expires ; un poste non réenregistré devient injoignable en appel entrant ; l'enregistrement s'effectue par une requête REGISTER acquittée par un 200 OK.</p><ol><li>À 08:45:00, combien de minutes restent-ils avant l'expiration du bail du poste 201 ?</li><li>Combien de minutes restent-ils avant l'expiration du bail du poste 202 ?</li><li>Le poste 204 est-il encore enregistré à 08:45:00 (oui ou non) ?</li><li>Quelle méthode SIP un poste envoie-t-il pour renouveler son bail ?</li><li>Quel code de réponse finale confirme un enregistrement réussi ?</li><li>À quelle heure exacte le bail du poste 202 expire-t-il (format hh:mm) ?</li></ol><p>Répondez par le nombre, oui/non, la méthode ou le code attendus.</p>",
    "starter": "# Exercice — Les enregistrements SIP du serveur de Vergnet & Associés\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre, oui/non, la méthode ou le code attendus.\n\n[Question 1 — Minutes restantes au bail du poste 201]\nA_COMPLETER\n\n[Question 2 — Minutes restantes au bail du poste 202]\nA_COMPLETER\n\n[Question 3 — Le poste 204 est-il encore enregistré]\nA_COMPLETER\n\n[Question 4 — Méthode SIP de renouvellement du bail]\nA_COMPLETER\n\n[Question 5 — Code de réponse confirmant l'enregistrement]\nA_COMPLETER\n\n[Question 6 — Heure d'expiration du bail du poste 202 (hh:mm)]\nA_COMPLETER\n",
    "hints": [
      "Convertissez la durée du bail en minutes : 3600 s = 60 min, 1800 s = 30 min, puis ajoutez-la à l'heure du dernier REGISTER.",
      "Un bail déjà expiré à l'heure d'observation signifie que le poste n'a pas renouvelé son enregistrement.",
      "1. Poste 201 : dernier REGISTER 08:00 + 60 min = expiration 09:00 ; il reste 15 min à 08:45. 2. Poste 202 : 08:20 + 30 min = expiration 08:50. 3. Poste 204 : 07:00 + 60 min = 08:00, donc expiré depuis 08:45. 4. Le renouvellement passe par REGISTER. 5. La réponse finale de succès est le 200 OK."
    ],
    "examples": [
      {
        "stdin": "L'agence immobilière Horizon observe ses postes à 09:15:00 :\n101 : REGISTER à 09:00:00, expires 1200 s (20 min) ;\n102 : REGISTER à 08:30:00, expires 3600 s (60 min) ;\n103 : REGISTER à 08:00:00, expires 1800 s (30 min).\n\n1) Poste 101 : expiration à 09:20:00, il reste 5 minutes.\n2) Poste 102 : expiration à 09:30:00, il reste 15 minutes.\n3) Poste 103 : bail expiré depuis 08:30:00 : poste non enregistré.\n4) Le renouvellement se fait par REGISTER, acquitté 200 OK.",
        "expected": "101 : 5 minutes restantes — 102 : 15 minutes — 103 : expiré — REGISTER — 200 OK",
        "note": "Un bail expiré rend le poste injoignable : sans réenregistrement, l'IPBX ne sait plus où acheminer les appels entrants."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Minutes restantes au bail du poste 201",
        "stdin": "q:1",
        "expected": "15||15 minutes||15 min"
      },
      {
        "label": "Question 2 — Minutes restantes au bail du poste 202",
        "stdin": "q:2",
        "expected": "5||5 minutes||5 min"
      },
      {
        "label": "Question 3 — Le poste 204 est-il encore enregistré",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Méthode SIP de renouvellement du bail",
        "stdin": "q:4",
        "expected": "REGISTER||register||la méthode REGISTER"
      },
      {
        "label": "Question 5 — Code de réponse confirmant l'enregistrement",
        "stdin": "q:5",
        "expected": "200 OK||200 ok||le 200 OK||200"
      },
      {
        "label": "Question 6 — Heure d'expiration du bail du poste 202 (hh:mm)",
        "stdin": "q:6",
        "expected": "08:50||8:50||08h50"
      }
    ],
    "solution": "[Question 1 — Minutes restantes au bail du poste 201]\n15\n\n[Question 2 — Minutes restantes au bail du poste 202]\n5\n\n[Question 3 — Le poste 204 est-il encore enregistré]\nnon\n\n[Question 4 — Méthode SIP de renouvellement du bail]\nREGISTER\n\n[Question 5 — Code de réponse confirmant l'enregistrement]\n200 OK\n\n[Question 6 — Heure d'expiration du bail du poste 202 (hh:mm)]\n08:50",
    "takeaway": "1) Poste 201 : dernier REGISTER à 08:00:00 + 3600 s = expiration à 09:00:00 ; à 08:45:00, il reste 15 minutes.\n2) Poste 202 : 08:20:00 + 1800 s = expiration à 08:50:00 ; il reste 5 minutes.\n3) Poste 204 : 07:00:00 + 3600 s = expiration à 08:00:00 ; à 08:45:00 le bail est expiré depuis 45 minutes : le poste n'est plus enregistré (il n'a pas renouvelé son bail).\n4) Le poste renouvelle son bail par une requête REGISTER envoyée au Registrar.\n5) L'enregistrement réussi est confirmé par une réponse finale 200 OK.\n6) Le bail du poste 202 expire à 08:50.\nContrôle : le poste 203, lui, n'apparaît pas dans la console : il ne s'est jamais enregistré depuis le redémarrage du serveur, situation à distinguer d'un bail expiré."
  }
];
