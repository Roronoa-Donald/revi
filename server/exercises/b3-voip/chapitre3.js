'use strict';

module.exports = [
  {
    "id": "vo3-c3-e1",
    "chapter": 3,
    "title": "Validateur & Générateur de Profils SIP Asterisk",
    "level": "n1",
    "language": "analyse",
    "goal": "Valider la conformité d'une déclaration de compte utilisateur Asterisk dans sip.conf et générer la configuration normalisée.",
    "brief": "<p>Dans Asterisk (fichiers sip.conf ou pjsip.conf), chaque utilisateur ou téléphone IP est modélisé par une section déclarative. Pour un compte SIP standard dans sip.conf, les directives clés sont :</p><ul><li><code>[numero_extension]</code> : en-tête identifiant le numéro (ex: [706438029])</li><li><code>type</code> : friend (émet et reçoit), peer (poste appelant ou trunk externe), user (uniquement entrant)</li><li><code>host</code> : dynamic (nécessite un enregistrement SIP REGISTER) ou IP statique</li><li><code>secret</code> : mot de passe d'authentification SIP (doit comporter au moins 6 caractères)</li><li><code>context</code> : contexte du dialplan dans lequel l'utilisateur évolue (ex: work, interne)</li><li><code>dtmfmode</code> : mode de transmission DTMF (rfc2833 obligatoire pour la ToIP moderne)</li><li><code>disallow</code> : all (désactive tous les codecs)</li><li><code>allow</code> : codecs autorisés (ex: ulaw, alaw, g729)</li></ul>\n<p>Format d'entrée :<br>Lignes décrivant un compte SIP sous forme :<br>NUM=<ext> TYPE=<friend|peer|user> HOST=<dynamic|ip> SECRET=<pass> CONTEXT=<nom> CODECS=<c1,c2,...></p>\n<p>Pour chaque compte, vérifier :<br>1. NUM doit être composé de 3 à 10 chiffres.<br>2. TYPE doit appartenir à {friend, peer, user}.<br>3. SECRET doit faire au moins 6 caractères.<br>4. CODECS ne doit pas être vide.<br>Si tout est valide, générer le bloc de configuration compact formaté pour Asterisk. Sinon afficher ERREUR avec le motif du refus.</p>\n<p>Format de sortie :<br>Si valide :<br>[<ext>] | type=<type> | host=<host> | secret=*** | context=<context> | dtmfmode=rfc2833 | disallow=all | allow=<codecs><br>Si invalide :<br>REJET:<ext> | MOTIF:<NUM_INVALIDE|SECRET_TROP_COURT|TYPE_INCONNU|CODECS_VIDES></p>",
    "starter": "# Grille d'analyse (vo3-c3-e1) — Validateur & Générateur de Profils SIP Asterisk\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : NUM=6001 TYPE=peer HOST=192.168.1.100 SECRET=TrunkSecure2026 CONTEXT=incoming CODECS=g729,alaw\n# Données : NUM=8002 TYPE=admin HOST=dynamic SECRET=PassAdmin99 CONTEXT=work CODECS=alaw\n# Données : NUM=9003 TYPE=friend HOST=dynamic SECRET=MySecretPass CONTEXT=interne CODECS=\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : NUM=1001 TYPE=user HOST=dynamic SECRET=Abcdef1 CONTEXT=default CODECS=opus,ulaw\n# Données : NUM=abcdef TYPE=friend HOST=dynamic SECRET=ValidPass123 CONTEXT=work CODECS=alaw\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "[6001] | type=peer | host=192.168.1.100 | secret=*** | context=incoming | dtmfmode=rfc2833 | disallow=all | allow=g729,alaw\nREJET:8002 | MOTIF:TYPE_INCONNU\nREJET:9003 | MOTIF:CODECS_VIDES\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "[1001] | type=user | host=dynamic | secret=*** | context=default | dtmfmode=rfc2833 | disallow=all | allow=opus,ulaw\nREJET:abcdef | MOTIF:NUM_INVALIDE\n"
      }
    ],
    "solution": "[Exemple]\n[706438029] | type=friend | host=dynamic | secret=*** | context=work | dtmfmode=rfc2833 | disallow=all | allow=ulaw,alaw\nREJET:10 | MOTIF:NUM_INVALIDE\nREJET:785446979 | MOTIF:SECRET_TROP_COURT\n\n\n[Cas 1 — Cas de test 1]\n[6001] | type=peer | host=192.168.1.100 | secret=*** | context=incoming | dtmfmode=rfc2833 | disallow=all | allow=g729,alaw\nREJET:8002 | MOTIF:TYPE_INCONNU\nREJET:9003 | MOTIF:CODECS_VIDES\n\n\n[Cas 2 — Cas de test 2]\n[1001] | type=user | host=dynamic | secret=*** | context=default | dtmfmode=rfc2833 | disallow=all | allow=opus,ulaw\nREJET:abcdef | MOTIF:NUM_INVALIDE"
  },
  {
    "id": "vo3-c3-e2",
    "chapter": 3,
    "title": "Gestionnaire de Boîtes Vocales Asterisk (voicemail.conf)",
    "level": "n2",
    "language": "analyse",
    "goal": "Parser la configuration des boîtes vocales voicemail.conf et calculer l'espace de stockage des messages audio.",
    "brief": "<p>Dans Asterisk, la messagerie vocale est configurée dans le fichier <code>voicemail.conf</code> sous des contextes dédiés.<br>Chaque boîte vocale est déclarée sur une ligne au format :<br><code><mailbox_num> => <pin_code>,<nom_utilisateur>,<email_notification>,<options></code></p>\n<p>Exemple :<br><code>706438029 => 8190,Pape Moussa SONKO,assoum1024@gmail.com,attach=yes</code></p>\n<p>Règles de validation :</p><ul><li><code>mailbox_num</code> : entier de 3 à 10 chiffres</li><li><code>pin_code</code> : code PIN secret à 4 chiffres (ex: 8190)</li><li><code>nom_utilisateur</code> : chaîne non vide</li><li><code>email_notification</code> : doit contenir un '@' et un '.' valide</li><li><code>quota_messages</code> : seuil maximal de messages (défaut 50)</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>BOX=<num> PIN=<pin> NAME=<nom> EMAIL=<email> MSG_COUNT=<nb_messages_actuels></p>\n<p>Format de sortie :<br>Pour chaque boîte vocale :<br>1. Valider le format (numéro, PIN à 4 chiffres, email).<br>2. Si invalide, afficher : <code>VOICEMAIL_REJET:<num> | MOTIF:<PIN_INVALIDE|EMAIL_INVALIDE|NUM_INVALIDE></code>.<br>3. Si valide :<br>   Calculer le statut :<br>   - Si <code>MSG_COUNT >= 50</code> : <code>STATUT:PLEINE</code><br>   - Si <code>MSG_COUNT >= 40</code> : <code>STATUT:AVERTISSEMENT</code><br>   - Sinon : <code>STATUT:OK</code><br>   Afficher :<br>   <code>VM:<num> | NOM:<nom> | PIN:**** | EMAIL:<email> | STOCKAGE:<msg>/50 | STATUT:<statut></code></p>",
    "starter": "# Grille d'analyse (vo3-c3-e2) — Gestionnaire de Boîtes Vocales Asterisk (voicemail.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : BOX=5001 PIN=9988 NAME=Support Technique EMAIL=support@voip.lan MSG_COUNT=50\n# Données : BOX=5002 PIN=1122 NAME=Direction Générale EMAIL=dir@voip.lan MSG_COUNT=42\n# Données : BOX=abc PIN=1234 NAME=Invalide EMAIL=inv@voip.lan MSG_COUNT=0\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : BOX=600 PIN=0000 NAME=Accueil Standard EMAIL=accueil@corp.com MSG_COUNT=55\n# Données : BOX=700 PIN=12345 NAME=Test EMAIL=test@test.com MSG_COUNT=1\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "VM:5001 | NOM:Support Technique | PIN:**** | EMAIL:support@voip.lan | STOCKAGE:50/50 | STATUT:PLEINE\nVM:5002 | NOM:Direction Générale | PIN:**** | EMAIL:dir@voip.lan | STOCKAGE:42/50 | STATUT:AVERTISSEMENT\nVOICEMAIL_REJET:abc | MOTIF:NUM_INVALIDE\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "VM:600 | NOM:Accueil Standard | PIN:**** | EMAIL:accueil@corp.com | STOCKAGE:55/50 | STATUT:PLEINE\nVOICEMAIL_REJET:700 | MOTIF:PIN_INVALIDE\n"
      }
    ],
    "solution": "[Exemple]\nVM:706438029 | NOM:Pape Moussa SONKO | PIN:**** | EMAIL:assoum1024@gmail.com | STOCKAGE:12/50 | STATUT:OK\nVOICEMAIL_REJET:101 | MOTIF:PIN_INVALIDE\nVOICEMAIL_REJET:2001 | MOTIF:EMAIL_INVALIDE\n\n\n[Cas 1 — Cas de test 1]\nVM:5001 | NOM:Support Technique | PIN:**** | EMAIL:support@voip.lan | STOCKAGE:50/50 | STATUT:PLEINE\nVM:5002 | NOM:Direction Générale | PIN:**** | EMAIL:dir@voip.lan | STOCKAGE:42/50 | STATUT:AVERTISSEMENT\nVOICEMAIL_REJET:abc | MOTIF:NUM_INVALIDE\n\n\n[Cas 2 — Cas de test 2]\nVM:600 | NOM:Accueil Standard | PIN:**** | EMAIL:accueil@corp.com | STOCKAGE:55/50 | STATUT:PLEINE\nVOICEMAIL_REJET:700 | MOTIF:PIN_INVALIDE"
  },
  {
    "id": "vo3-c3-e3",
    "chapter": 3,
    "title": "Analyseur de Télémétrie SIP Registrar & Expiration de Baux",
    "level": "n3",
    "language": "analyse",
    "goal": "Gérer les baux d'enregistrement SIP auprès du Registrar et détecter les expirations de contacts.",
    "brief": "<p>Le serveur SIP Registrar maintient la base des associations entre l'adresse logique (Address of Record, AOR: ex: sip:701@voip.lan) et l'adresse IP de contact réelle.<br>Chaque requête <code>REGISTER</code> comporte un en-tête <code>Expires: <secondes></code> (typiquement 3 600 s) renouvelant le bail de l'équipement.<br>Si aucun REGISTER n'est reçu avant expiration du délai (avec une tolérance de 60 s), le poste bascule en état <code>UNREACHABLE</code> (hors-ligne).<br>De plus, si la latence réseau (RTT en ms mesuré par paquets OPTIONS périodiques) dépasse 150 ms, le poste est qualifié de <code>LAGGED</code> (gigue/délai excessif).</p>\n<p>Format d'entrée :<br>Lignes au format :<br>EXTENSION=<num> IP_CONTACT=<ip:port> LAST_SEEN_SEC=<secondes_depuis_dernier_register> EXPIRES=<duree_bail> RTT_MS=<latence></p>\n<p>Règles de qualification :<br>1. Calculer le temps restant du bail : <code>REMAINING = EXPIRES - LAST_SEEN_SEC</code>.<br>2. Déterminer l'état de joignabilité :<br>   - Si <code>LAST_SEEN_SEC > EXPIRES + 60</code> : <code>STATUT = EXPIRED</code><br>   - Sinon si <code>RTT_MS < 0</code> ou <code>RTT_MS > 300</code> : <code>STATUT = UNREACHABLE</code><br>   - Sinon si <code>RTT_MS > 150</code> : <code>STATUT = LAGGED</code><br>   - Sinon : <code>STATUT = REACHABLE</code></p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>EXT:<num> | IP:<ip:port> | BAIL_RESTANT:<REMAINING>s | LATENCE:<RTT_MS>ms | STATUT:<statut></p>",
    "starter": "# Grille d'analyse (vo3-c3-e3) — Analyseur de Télémétrie SIP Registrar & Expiration de Baux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : EXTENSION=100 IP_CONTACT=10.0.4.12:5060 LAST_SEEN_SEC=500 EXPIRES=600 RTT_MS=450\n# Données : EXTENSION=101 IP_CONTACT=10.0.4.13:5060 LAST_SEEN_SEC=50 EXPIRES=3600 RTT_MS=8\n# Données : EXTENSION=102 IP_CONTACT=10.0.4.14:5060 LAST_SEEN_SEC=4000 EXPIRES=3600 RTT_MS=-1\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : EXTENSION=800 IP_CONTACT=172.20.1.1:5060 LAST_SEEN_SEC=1700 EXPIRES=1800 RTT_MS=160\n# Données : EXTENSION=801 IP_CONTACT=172.20.1.2:5060 LAST_SEEN_SEC=1850 EXPIRES=1800 RTT_MS=30\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "EXT:100 | IP:10.0.4.12:5060 | BAIL_RESTANT:100s | LATENCE:450ms | STATUT:UNREACHABLE\nEXT:101 | IP:10.0.4.13:5060 | BAIL_RESTANT:3550s | LATENCE:8ms | STATUT:REACHABLE\nEXT:102 | IP:10.0.4.14:5060 | BAIL_RESTANT:-400s | LATENCE:-1ms | STATUT:EXPIRED\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "EXT:800 | IP:172.20.1.1:5060 | BAIL_RESTANT:100s | LATENCE:160ms | STATUT:LAGGED\nEXT:801 | IP:172.20.1.2:5060 | BAIL_RESTANT:-50s | LATENCE:30ms | STATUT:REACHABLE\n"
      }
    ],
    "solution": "[Exemple]\nEXT:701 | IP:192.168.1.50:5060 | BAIL_RESTANT:3480s | LATENCE:15ms | STATUT:REACHABLE\nEXT:702 | IP:192.168.1.51:5060 | BAIL_RESTANT:-100s | LATENCE:20ms | STATUT:EXPIRED\nEXT:703 | IP:192.168.1.52:5060 | BAIL_RESTANT:1600s | LATENCE:195ms | STATUT:LAGGED\n\n\n[Cas 1 — Cas de test 1]\nEXT:100 | IP:10.0.4.12:5060 | BAIL_RESTANT:100s | LATENCE:450ms | STATUT:UNREACHABLE\nEXT:101 | IP:10.0.4.13:5060 | BAIL_RESTANT:3550s | LATENCE:8ms | STATUT:REACHABLE\nEXT:102 | IP:10.0.4.14:5060 | BAIL_RESTANT:-400s | LATENCE:-1ms | STATUT:EXPIRED\n\n\n[Cas 2 — Cas de test 2]\nEXT:800 | IP:172.20.1.1:5060 | BAIL_RESTANT:100s | LATENCE:160ms | STATUT:LAGGED\nEXT:801 | IP:172.20.1.2:5060 | BAIL_RESTANT:-50s | LATENCE:30ms | STATUT:REACHABLE"
  }
];
