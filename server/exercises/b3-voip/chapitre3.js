/**
 * server/exercises/b3-voip/chapitre3.js — Exercices du Chapitre 3
 * Téléphonie VoIP B3
 */
'use strict';

module.exports = [
  {
    "id": "vo3-c3-e1",
    "chapter": 3,
    "title": "Validateur & Générateur de Profils SIP Asterisk",
    "level": "n1",
    "language": "python",
    "goal": "Valider la conformité d'une déclaration de compte utilisateur Asterisk dans sip.conf et générer la configuration normalisée.",
    "brief": "<p>Dans Asterisk (fichiers sip.conf ou pjsip.conf), chaque utilisateur ou téléphone IP est modélisé par une section déclarative. Pour un compte SIP standard dans sip.conf, les directives clés sont :</p><ul><li><code>[numero_extension]</code> : en-tête identifiant le numéro (ex: [706438029])</li><li><code>type</code> : friend (émet et reçoit), peer (poste appelant ou trunk externe), user (uniquement entrant)</li><li><code>host</code> : dynamic (nécessite un enregistrement SIP REGISTER) ou IP statique</li><li><code>secret</code> : mot de passe d'authentification SIP (doit comporter au moins 6 caractères)</li><li><code>context</code> : contexte du dialplan dans lequel l'utilisateur évolue (ex: work, interne)</li><li><code>dtmfmode</code> : mode de transmission DTMF (rfc2833 obligatoire pour la ToIP moderne)</li><li><code>disallow</code> : all (désactive tous les codecs)</li><li><code>allow</code> : codecs autorisés (ex: ulaw, alaw, g729)</li></ul>\n<p>Format d'entrée :<br>Lignes décrivant un compte SIP sous forme :<br>NUM=<ext> TYPE=<friend|peer|user> HOST=<dynamic|ip> SECRET=<pass> CONTEXT=<nom> CODECS=<c1,c2,...></p>\n<p>Pour chaque compte, vérifier :<br>1. NUM doit être composé de 3 à 10 chiffres.<br>2. TYPE doit appartenir à {friend, peer, user}.<br>3. SECRET doit faire au moins 6 caractères.<br>4. CODECS ne doit pas être vide.<br>Si tout est valide, générer le bloc de configuration compact formaté pour Asterisk. Sinon afficher ERREUR avec le motif du refus.</p>\n<p>Format de sortie :<br>Si valide :<br>[<ext>] | type=<type> | host=<host> | secret=*** | context=<context> | dtmfmode=rfc2833 | disallow=all | allow=<codecs><br>Si invalide :<br>REJET:<ext> | MOTIF:<NUM_INVALIDE|SECRET_TROP_COURT|TYPE_INCONNU|CODECS_VIDES></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : valider les paramètres du compte SIP et générer le profil sip.conf\n",
    "hints": [
      "Vérifiez que toutes les directives obligatoires (type, host, secret, context) sont présentes.",
      "Assurez-vous que disallow=all précède les directives allow autorisant les codecs."
    ],
    "examples": [
      {
        "stdin": "NUM=706438029 TYPE=friend HOST=dynamic SECRET=PassSecret8190 CONTEXT=work CODECS=ulaw,alaw\nNUM=10 TYPE=friend HOST=dynamic SECRET=secret CONTEXT=work CODECS=alaw\nNUM=785446979 TYPE=friend HOST=dynamic SECRET=123 CONTEXT=work CODECS=ulaw",
        "expected": "[706438029] | type=friend | host=dynamic | secret=*** | context=work | dtmfmode=rfc2833 | disallow=all | allow=ulaw,alaw\nREJET:10 | MOTIF:NUM_INVALIDE\nREJET:785446979 | MOTIF:SECRET_TROP_COURT\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "NUM=6001 TYPE=peer HOST=192.168.1.100 SECRET=TrunkSecure2026 CONTEXT=incoming CODECS=g729,alaw\nNUM=8002 TYPE=admin HOST=dynamic SECRET=PassAdmin99 CONTEXT=work CODECS=alaw\nNUM=9003 TYPE=friend HOST=dynamic SECRET=MySecretPass CONTEXT=interne CODECS=",
        "expected": "[6001] | type=peer | host=192.168.1.100 | secret=*** | context=incoming | dtmfmode=rfc2833 | disallow=all | allow=g729,alaw\nREJET:8002 | MOTIF:TYPE_INCONNU\nREJET:9003 | MOTIF:CODECS_VIDES\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "NUM=1001 TYPE=user HOST=dynamic SECRET=Abcdef1 CONTEXT=default CODECS=opus,ulaw\nNUM=abcdef TYPE=friend HOST=dynamic SECRET=ValidPass123 CONTEXT=work CODECS=alaw",
        "expected": "[1001] | type=user | host=dynamic | secret=*** | context=default | dtmfmode=rfc2833 | disallow=all | allow=opus,ulaw\nREJET:abcdef | MOTIF:NUM_INVALIDE\n"
      }
    ],
    "solution": "import sys, re\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    num = parts.get(\"NUM\", \"\")\n    type_ = parts.get(\"TYPE\", \"\")\n    host = parts.get(\"HOST\", \"dynamic\")\n    secret = parts.get(\"SECRET\", \"\")\n    context = parts.get(\"CONTEXT\", \"default\")\n    codecs = parts.get(\"CODECS\", \"\")\n\n    if not re.match(r'^\\d{3,10}$', num):\n        print(f\"REJET:{num} | MOTIF:NUM_INVALIDE\")\n        continue\n    if type_ not in (\"friend\", \"peer\", \"user\"):\n        print(f\"REJET:{num} | MOTIF:TYPE_INCONNU\")\n        continue\n    if len(secret) < 6:\n        print(f\"REJET:{num} | MOTIF:SECRET_TROP_COURT\")\n        continue\n    if not codecs.strip():\n        print(f\"REJET:{num} | MOTIF:CODECS_VIDES\")\n        continue\n\n    print(f\"[{num}] | type={type_} | host={host} | secret=*** | context={context} | dtmfmode=rfc2833 | disallow=all | allow={codecs}\")\n"
  },
  {
    "id": "vo3-c3-e2",
    "chapter": 3,
    "title": "Gestionnaire de Boîtes Vocales Asterisk (voicemail.conf)",
    "level": "n2",
    "language": "python",
    "goal": "Parser la configuration des boîtes vocales voicemail.conf et calculer l'espace de stockage des messages audio.",
    "brief": "<p>Dans Asterisk, la messagerie vocale est configurée dans le fichier <code>voicemail.conf</code> sous des contextes dédiés.<br>Chaque boîte vocale est déclarée sur une ligne au format :<br><code><mailbox_num> => <pin_code>,<nom_utilisateur>,<email_notification>,<options></code></p>\n<p>Exemple :<br><code>706438029 => 8190,Pape Moussa SONKO,assoum1024@gmail.com,attach=yes</code></p>\n<p>Règles de validation :</p><ul><li><code>mailbox_num</code> : entier de 3 à 10 chiffres</li><li><code>pin_code</code> : code PIN secret à 4 chiffres (ex: 8190)</li><li><code>nom_utilisateur</code> : chaîne non vide</li><li><code>email_notification</code> : doit contenir un '@' et un '.' valide</li><li><code>quota_messages</code> : seuil maximal de messages (défaut 50)</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>BOX=<num> PIN=<pin> NAME=<nom> EMAIL=<email> MSG_COUNT=<nb_messages_actuels></p>\n<p>Format de sortie :<br>Pour chaque boîte vocale :<br>1. Valider le format (numéro, PIN à 4 chiffres, email).<br>2. Si invalide, afficher : <code>VOICEMAIL_REJET:<num> | MOTIF:<PIN_INVALIDE|EMAIL_INVALIDE|NUM_INVALIDE></code>.<br>3. Si valide :<br>   Calculer le statut :<br>   - Si <code>MSG_COUNT >= 50</code> : <code>STATUT:PLEINE</code><br>   - Si <code>MSG_COUNT >= 40</code> : <code>STATUT:AVERTISSEMENT</code><br>   - Sinon : <code>STATUT:OK</code><br>   Afficher :<br>   <code>VM:<num> | NOM:<nom> | PIN:**** | EMAIL:<email> | STOCKAGE:<msg>/50 | STATUT:<statut></code></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : parser et valider les boîtes vocales Asterisk\n",
    "hints": [
      "Découpez chaque ligne de boîte vocale par les séparateurs => et les virgules.",
      "Calculez le volume audio en multipliant la durée par le débit G.711 de 8 000 octets/seconde."
    ],
    "examples": [
      {
        "stdin": "BOX=706438029 PIN=8190 NAME=Pape Moussa SONKO EMAIL=assoum1024@gmail.com MSG_COUNT=12\nBOX=101 PIN=12 EMAIL=test@corp.fr NAME=Alice MSG_COUNT=5\nBOX=2001 PIN=4321 NAME=Bob Smith EMAIL=bob.smith MSG_COUNT=45",
        "expected": "VM:706438029 | NOM:Pape Moussa SONKO | PIN:**** | EMAIL:assoum1024@gmail.com | STOCKAGE:12/50 | STATUT:OK\nVOICEMAIL_REJET:101 | MOTIF:PIN_INVALIDE\nVOICEMAIL_REJET:2001 | MOTIF:EMAIL_INVALIDE\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "BOX=5001 PIN=9988 NAME=Support Technique EMAIL=support@voip.lan MSG_COUNT=50\nBOX=5002 PIN=1122 NAME=Direction Générale EMAIL=dir@voip.lan MSG_COUNT=42\nBOX=abc PIN=1234 NAME=Invalide EMAIL=inv@voip.lan MSG_COUNT=0",
        "expected": "VM:5001 | NOM:Support Technique | PIN:**** | EMAIL:support@voip.lan | STOCKAGE:50/50 | STATUT:PLEINE\nVM:5002 | NOM:Direction Générale | PIN:**** | EMAIL:dir@voip.lan | STOCKAGE:42/50 | STATUT:AVERTISSEMENT\nVOICEMAIL_REJET:abc | MOTIF:NUM_INVALIDE\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "BOX=600 PIN=0000 NAME=Accueil Standard EMAIL=accueil@corp.com MSG_COUNT=55\nBOX=700 PIN=12345 NAME=Test EMAIL=test@test.com MSG_COUNT=1",
        "expected": "VM:600 | NOM:Accueil Standard | PIN:**** | EMAIL:accueil@corp.com | STOCKAGE:55/50 | STATUT:PLEINE\nVOICEMAIL_REJET:700 | MOTIF:PIN_INVALIDE\n"
      }
    ],
    "solution": "import sys, re\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    # Extraction souple pour gérer les espaces dans NAME\n    # BOX=... PIN=... NAME=... EMAIL=... MSG_COUNT=...\n    m = re.search(r'BOX=(\\S+)\\s+PIN=(\\S+)\\s+NAME=(.+?)\\s+EMAIL=(\\S+)\\s+MSG_COUNT=(\\d+)', line)\n    if not m:\n        # Essayer avec d'autres ordres\n        parts = line.split()\n        d = {}\n        for p in parts:\n            if \"=\" in p:\n                k, v = p.split(\"=\", 1)\n                d[k] = v\n        box = d.get(\"BOX\", \"\")\n        pin = d.get(\"PIN\", \"\")\n        name = d.get(\"NAME\", \"\")\n        email = d.get(\"EMAIL\", \"\")\n        msg_count = int(d.get(\"MSG_COUNT\", 0))\n    else:\n        box, pin, name, email, msg_str = m.groups()\n        msg_count = int(msg_str)\n\n    if not re.match(r'^\\d{3,10}$', box):\n        print(f\"VOICEMAIL_REJET:{box} | MOTIF:NUM_INVALIDE\")\n        continue\n    if not re.match(r'^\\d{4}$', pin):\n        print(f\"VOICEMAIL_REJET:{box} | MOTIF:PIN_INVALIDE\")\n        continue\n    if not re.match(r'^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$', email):\n        print(f\"VOICEMAIL_REJET:{box} | MOTIF:EMAIL_INVALIDE\")\n        continue\n\n    if msg_count >= 50:\n        statut = \"PLEINE\"\n    elif msg_count >= 40:\n        statut = \"AVERTISSEMENT\"\n    else:\n        statut = \"OK\"\n\n    print(f\"VM:{box} | NOM:{name} | PIN:**** | EMAIL:{email} | STOCKAGE:{msg_count}/50 | STATUT:{statut}\")\n"
  },
  {
    "id": "vo3-c3-e3",
    "chapter": 3,
    "title": "Analyseur de Télémétrie SIP Registrar & Expiration de Baux",
    "level": "n3",
    "language": "python",
    "goal": "Gérer les baux d'enregistrement SIP auprès du Registrar et détecter les expirations de contacts.",
    "brief": "<p>Le serveur SIP Registrar maintient la base des associations entre l'adresse logique (Address of Record, AOR: ex: sip:701@voip.lan) et l'adresse IP de contact réelle.<br>Chaque requête <code>REGISTER</code> comporte un en-tête <code>Expires: <secondes></code> (typiquement 3 600 s) renouvelant le bail de l'équipement.<br>Si aucun REGISTER n'est reçu avant expiration du délai (avec une tolérance de 60 s), le poste bascule en état <code>UNREACHABLE</code> (hors-ligne).<br>De plus, si la latence réseau (RTT en ms mesuré par paquets OPTIONS périodiques) dépasse 150 ms, le poste est qualifié de <code>LAGGED</code> (gigue/délai excessif).</p>\n<p>Format d'entrée :<br>Lignes au format :<br>EXTENSION=<num> IP_CONTACT=<ip:port> LAST_SEEN_SEC=<secondes_depuis_dernier_register> EXPIRES=<duree_bail> RTT_MS=<latence></p>\n<p>Règles de qualification :<br>1. Calculer le temps restant du bail : <code>REMAINING = EXPIRES - LAST_SEEN_SEC</code>.<br>2. Déterminer l'état de joignabilité :<br>   - Si <code>LAST_SEEN_SEC > EXPIRES + 60</code> : <code>STATUT = EXPIRED</code><br>   - Sinon si <code>RTT_MS < 0</code> ou <code>RTT_MS > 300</code> : <code>STATUT = UNREACHABLE</code><br>   - Sinon si <code>RTT_MS > 150</code> : <code>STATUT = LAGGED</code><br>   - Sinon : <code>STATUT = REACHABLE</code></p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>EXT:<num> | IP:<ip:port> | BAIL_RESTANT:<REMAINING>s | LATENCE:<RTT_MS>ms | STATUT:<statut></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : analyser l'état des enregistrements SIP et leur joignabilité\n",
    "hints": [
      "Comparez le temps écoulé depuis le dernier contact avec le paramètre expires.",
      "Marquez le statut comme ACTIF si le bail est valide, sinon EXPIRE."
    ],
    "examples": [
      {
        "stdin": "EXTENSION=701 IP_CONTACT=192.168.1.50:5060 LAST_SEEN_SEC=120 EXPIRES=3600 RTT_MS=15\nEXTENSION=702 IP_CONTACT=192.168.1.51:5060 LAST_SEEN_SEC=3700 EXPIRES=3600 RTT_MS=20\nEXTENSION=703 IP_CONTACT=192.168.1.52:5060 LAST_SEEN_SEC=200 EXPIRES=1800 RTT_MS=195",
        "expected": "EXT:701 | IP:192.168.1.50:5060 | BAIL_RESTANT:3480s | LATENCE:15ms | STATUT:REACHABLE\nEXT:702 | IP:192.168.1.51:5060 | BAIL_RESTANT:-100s | LATENCE:20ms | STATUT:EXPIRED\nEXT:703 | IP:192.168.1.52:5060 | BAIL_RESTANT:1600s | LATENCE:195ms | STATUT:LAGGED\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "EXTENSION=100 IP_CONTACT=10.0.4.12:5060 LAST_SEEN_SEC=500 EXPIRES=600 RTT_MS=450\nEXTENSION=101 IP_CONTACT=10.0.4.13:5060 LAST_SEEN_SEC=50 EXPIRES=3600 RTT_MS=8\nEXTENSION=102 IP_CONTACT=10.0.4.14:5060 LAST_SEEN_SEC=4000 EXPIRES=3600 RTT_MS=-1",
        "expected": "EXT:100 | IP:10.0.4.12:5060 | BAIL_RESTANT:100s | LATENCE:450ms | STATUT:UNREACHABLE\nEXT:101 | IP:10.0.4.13:5060 | BAIL_RESTANT:3550s | LATENCE:8ms | STATUT:REACHABLE\nEXT:102 | IP:10.0.4.14:5060 | BAIL_RESTANT:-400s | LATENCE:-1ms | STATUT:EXPIRED\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "EXTENSION=800 IP_CONTACT=172.20.1.1:5060 LAST_SEEN_SEC=1700 EXPIRES=1800 RTT_MS=160\nEXTENSION=801 IP_CONTACT=172.20.1.2:5060 LAST_SEEN_SEC=1850 EXPIRES=1800 RTT_MS=30",
        "expected": "EXT:800 | IP:172.20.1.1:5060 | BAIL_RESTANT:100s | LATENCE:160ms | STATUT:LAGGED\nEXT:801 | IP:172.20.1.2:5060 | BAIL_RESTANT:-50s | LATENCE:30ms | STATUT:REACHABLE\n"
      }
    ],
    "solution": "import sys\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    ext = parts.get(\"EXTENSION\", \"\")\n    ip = parts.get(\"IP_CONTACT\", \"\")\n    last_seen = int(parts.get(\"LAST_SEEN_SEC\", 0))\n    expires = int(parts.get(\"EXPIRES\", 3600))\n    rtt = int(parts.get(\"RTT_MS\", 0))\n\n    remaining = expires - last_seen\n\n    if last_seen > expires + 60:\n        statut = \"EXPIRED\"\n    elif rtt < 0 or rtt > 300:\n        statut = \"UNREACHABLE\"\n    elif rtt > 150:\n        statut = \"LAGGED\"\n    else:\n        statut = \"REACHABLE\"\n\n    print(f\"EXT:{ext} | IP:{ip} | BAIL_RESTANT:{remaining}s | LATENCE:{rtt}ms | STATUT:{statut}\")\n"
  }
];
