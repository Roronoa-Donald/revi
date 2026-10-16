'use strict';

module.exports = [
  {
    "id": "vo3-c4-e1",
    "chapter": 4,
    "title": "Parseur & Routeur de Dialplan Asterisk (extensions.conf)",
    "level": "n1",
    "language": "analyse",
    "goal": "Évaluer la logique séquentielle des règles d'extensions et priorités dans le Dialplan extensions.conf d'Asterisk.",
    "brief": "<p>Dans Asterisk, le plan de numérotation (Dialplan) est décrit dans <code>extensions.conf</code>.<br>Chaque ligne d'instruction suit la syntaxe :<br><code>exten => <extension>,<priorite>,<application>(<arguments>)</code></p>\n<p>Exemples :<br><code>exten => 100,1,Answer()</code><br><code>exten => 100,2,Playback(bienvenue)</code><br><code>exten => 100,3,Dial(SIP/100,20)</code><br><code>exten => 100,4,VoiceMail(100@default,u)</code><br><code>exten => 100,5,Hangup()</code></p>\n<p>Les applications courantes sont :</p><ul><li><code>Answer</code> : décroche l'appel</li><li><code>Playback</code> : joue un fichier son</li><li><code>Dial</code> : tente de joindre une cible (technologie/cible, timeout)</li><li><code>VoiceMail</code> : redirige vers la messagerie</li><li><code>Hangup</code> : raccroche la ligne</li></ul>\n<p>Format d'entrée :<br>Lignes de dialplan d'une extension donnée sur STDIN.</p>\n<p>Format de sortie :<br>Pour chaque ligne :<br>1. Extraire : extension, numéro de priorité (ou 'n'), nom de l'application et arguments.<br>2. Déterminer la catégorie de l'application :<br>   - Answer -> CALL_CONTROL<br>   - Playback, Background -> MEDIA<br>   - Dial -> ROUTING<br>   - VoiceMail -> MESSAGING<br>   - Hangup -> TERMINATION<br>   - Autre -> MISC<br>3. Afficher :<br><code>EXT:<ext> | PRIO:<prio> | APP:<app> | ARGS:<args> | CATEGORIE:<cat></code></p>",
    "starter": "# Grille d'analyse (vo3-c4-e1) — Parseur & Routeur de Dialplan Asterisk (extensions.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : exten => 101,1,Dial(SIP/101,15)\n# Données : exten => 101,2,GotoIf($[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail)\n# Données : exten => 101,3,Hangup()\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : exten => s,1,Answer()\n# Données : exten => s,2,Background(menu-acceuil)\n# Données : exten => s,3,WaitExten(5)\n# Données : exten => s,4,Hangup()\nA_COMPLETER\n",
    "hints": [
      "Filtrez les règles appartenant au contexte de l'appelant.",
      "Exécutez séquentiellement les priorités 1, 2, n associées à l'extension composée."
    ],
    "examples": [
      {
        "stdin": "exten => 600,1,Answer()\nexten => 600,2,Playback(vm-intro)\nexten => 600,3,VoiceMailMain(${CALLERID(num)}@work)\nexten => 600,4,Hangup()",
        "expected": "EXT:600 | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:600 | PRIO:2 | APP:Playback | ARGS:vm-intro | CATEGORIE:MEDIA\nEXT:600 | PRIO:3 | APP:VoiceMailMain | ARGS:${CALLERID(num)}@work | CATEGORIE:MESSAGING\nEXT:600 | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "EXT:101 | PRIO:1 | APP:Dial | ARGS:SIP/101,15 | CATEGORIE:ROUTING\nEXT:101 | PRIO:2 | APP:GotoIf | ARGS:$[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail | CATEGORIE:MISC\nEXT:101 | PRIO:3 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "EXT:s | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:s | PRIO:2 | APP:Background | ARGS:menu-acceuil | CATEGORIE:MEDIA\nEXT:s | PRIO:3 | APP:WaitExten | ARGS:5 | CATEGORIE:MISC\nEXT:s | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n"
      }
    ],
    "solution": "[Exemple]\nEXT:600 | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:600 | PRIO:2 | APP:Playback | ARGS:vm-intro | CATEGORIE:MEDIA\nEXT:600 | PRIO:3 | APP:VoiceMailMain | ARGS:${CALLERID(num)}@work | CATEGORIE:MESSAGING\nEXT:600 | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n\n\n[Cas 1 — Cas de test 1]\nEXT:101 | PRIO:1 | APP:Dial | ARGS:SIP/101,15 | CATEGORIE:ROUTING\nEXT:101 | PRIO:2 | APP:GotoIf | ARGS:$[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail | CATEGORIE:MISC\nEXT:101 | PRIO:3 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n\n\n[Cas 2 — Cas de test 2]\nEXT:s | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:s | PRIO:2 | APP:Background | ARGS:menu-acceuil | CATEGORIE:MEDIA\nEXT:s | PRIO:3 | APP:WaitExten | ARGS:5 | CATEGORIE:MISC\nEXT:s | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION"
  },
  {
    "id": "vo3-c4-e2",
    "chapter": 4,
    "title": "Matcher de Masques de Numérotation Asterisk (Pattern Matching)",
    "level": "n2",
    "language": "analyse",
    "goal": "Implémenter le moteur de pattern matching d'Asterisk avec masques _X, _Z, _N et extraction de variables ${EXTEN}.",
    "brief": "<p>Dans Asterisk, les extensions peuvent être définies par des motifs (patterns) débutant par un souligné <code>_</code>. La syntaxe standard des motifs de numérotation Asterisk est :</p><ul><li><code>X</code> : correspond à n'importe quel chiffre de 0 à 9</li><li><code>Z</code> : correspond à n'importe quel chiffre de 1 à 9</li><li><code>N</code> : correspond à n'importe quel chiffre de 2 à 9</li><li><code>[1357]</code> : correspond à l'un des chiffres entre crochets</li><li><code>.</code> (point) : joker correspondant à un ou plusieurs caractères quelconques (en fin de motif)</li><li><code>!</code> (point d'exclamation) : joker correspondant à zéro ou plusieurs caractères</li></ul>\n<p>Exemples :</p><ul><li><code>_7XXXXXXXX</code> : correspond aux numéros sénégalais de 9 chiffres débutant par 7 (de 700000000 à 799999999).</li><li><code>_0[1-5]XXXXXXXX</code> : numéros géographiques français fixes (10 chiffres).</li><li><code>_9.</code> : tout appel sortant avec préfixe 9.</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>PATTERN=<motif_asterisk> NUM=<numero_compose></p>\n<p>Règles :<br>1. Convertir le motif Asterisk en expression régulière équivalente.<br>2. Si le motif ne commence pas par <code>_</code>, il s'agit d'une correspondance littérale exacte.<br>3. Vérifier si NUM correspond au motif.<br>4. Si correspondance : extraire la valeur qui serait affectée à la variable <code>${EXTEN}</code> (soit le numéro entier) et indiquer <code>MATCH:OUI</code>.<br>5. Sinon indiquer <code>MATCH:NON</code>.</p>\n<p>Format de sortie :<br>Pour chaque test :<br>PATTERN:<pattern> | NUM:<num> | REGEX:<regex> | RESULTAT:<MATCH:OUI|MATCH:NON></p>",
    "starter": "# Grille d'analyse (vo3-c4-e2) — Matcher de Masques de Numérotation Asterisk (Pattern Matching)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : PATTERN=_NXX NUM=250\n# Données : PATTERN=_NXX NUM=150\n# Données : PATTERN=_9. NUM=90123456789\n# Données : PATTERN=_9. NUM=9\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : PATTERN=_ZXXX NUM=1000\n# Données : PATTERN=_ZXXX NUM=0500\nA_COMPLETER\n",
    "hints": [
      "Les motifs de numérotation débutent obligatoirement par un caractère souligné _.",
      "Traduisez X en [0-9], Z en [1-9] et N en [2-9] pour tester la correspondance."
    ],
    "examples": [
      {
        "stdin": "PATTERN=_7XXXXXXXX NUM=706438029\nPATTERN=_7XXXXXXXX NUM=806438029\nPATTERN=_0[1-5]XXXXXXXX NUM=0140203040\nPATTERN=600 NUM=600",
        "expected": "PATTERN:_7XXXXXXXX | NUM:706438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:_7XXXXXXXX | NUM:806438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:NON\nPATTERN:_0[1-5]XXXXXXXX | NUM:0140203040 | REGEX:^0[1-5][0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:600 | NUM:600 | REGEX:^600$ | RESULTAT:MATCH:OUI\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "PATTERN:_NXX | NUM:250 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:OUI\nPATTERN:_NXX | NUM:150 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:NON\nPATTERN:_9. | NUM:90123456789 | REGEX:^9.+$ | RESULTAT:MATCH:OUI\nPATTERN:_9. | NUM:9 | REGEX:^9.+$ | RESULTAT:MATCH:NON\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "PATTERN:_ZXXX | NUM:1000 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:OUI\nPATTERN:_ZXXX | NUM:0500 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:NON\n"
      }
    ],
    "solution": "[Exemple]\nPATTERN:_7XXXXXXXX | NUM:706438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:_7XXXXXXXX | NUM:806438029 | REGEX:^7[0-9]{8}$ | RESULTAT:MATCH:NON\nPATTERN:_0[1-5]XXXXXXXX | NUM:0140203040 | REGEX:^0[1-5][0-9]{8}$ | RESULTAT:MATCH:OUI\nPATTERN:600 | NUM:600 | REGEX:^600$ | RESULTAT:MATCH:OUI\n\n\n[Cas 1 — Cas de test 1]\nPATTERN:_NXX | NUM:250 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:OUI\nPATTERN:_NXX | NUM:150 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:NON\nPATTERN:_9. | NUM:90123456789 | REGEX:^9.+$ | RESULTAT:MATCH:OUI\nPATTERN:_9. | NUM:9 | REGEX:^9.+$ | RESULTAT:MATCH:NON\n\n\n[Cas 2 — Cas de test 2]\nPATTERN:_ZXXX | NUM:1000 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:OUI\nPATTERN:_ZXXX | NUM:0500 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:NON"
  },
  {
    "id": "vo3-c4-e3",
    "chapter": 4,
    "title": "Simulateur de Serveur Vocal Interactif SVI / IVR",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la navigation dans un serveur vocal interactif (SVI/IVR) avec gestion des touches DTMF, timeouts (t) et erreurs (i).",
    "brief": "<p>Un Serveur Vocal Interactif (SVI ou IVR) oriente automatiquement les appelants selon les touches DTMF saisies. Dans Asterisk, le menu d'accueil joue un message audio avec l'application <code>Background()</code> puis attend une saisie avec <code>WaitExten()</code>. Si l'appelant appuie sur :</p><ul><li><code>1</code> : Service Commercial (routage vers <code>Queue(commercial)</code>)</li><li><code>2</code> : Support Technique (routage vers <code>Queue(support)</code>)</li><li><code>3</code> : Facturation / Comptabilité (routage vers <code>Dial(SIP/301)</code>)</li><li><code>9</code> : Répéter le menu (redirection vers <code>Goto(menu,s,1)</code>)</li><li><code>t</code> (Timeout, aucune touche après 5 secondes) : rejoue le menu ou raccroche après 2 tentatives.</li><li><code>i</code> (Touche invalide) : joue un message d'erreur <code>Playback(invalid)</code> et réinvite l'utilisateur.</li></ul>\n<p>Format d'entrée :<br>Lignes simulant des sessions d'appelants sous la forme :<br>SESSION=<id> DTMF_INPUT=<touche> ATTEMPTS=<nb_essais_deja_faits></p>\n<p>Règles de décision :   - Si ATTEMPTS >= 2 -> ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT   - Sinon -> ACTION:RELANCER | CIBLE:WaitExten(5) | SUITE:RETRY   - Si ATTEMPTS >= 2 -> ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID   - Sinon -> ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY</p><ul><li>DTMF '1' -> ACTION:ROUTER | CIBLE:Queue(commercial) | SUITE:SUCCES</li><li>DTMF '2' -> ACTION:ROUTER | CIBLE:Queue(support) | SUITE:SUCCES</li><li>DTMF '3' -> ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES</li><li>DTMF '9' -> ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER</li><li>DTMF 'TIMEOUT' ou 't' :</li><li>Toute autre touche (invalide) :</li></ul>\n<p>Format de sortie :<br>Pour chaque session :<br>SESSION:<id> | TOUCHE:<dtmf> | ESSAIS:<attempts> | ACTION:<action> | CIBLE:<cible> | SUITE:<suite></p>",
    "starter": "# Grille d'analyse (vo3-c4-e3) — Simulateur de Serveur Vocal Interactif SVI / IVR\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : SESSION=A10 DTMF_INPUT=3 ATTEMPTS=0\n# Données : SESSION=A11 DTMF_INPUT=9 ATTEMPTS=1\n# Données : SESSION=A12 DTMF_INPUT=t ATTEMPTS=3\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : SESSION=B20 DTMF_INPUT=* ATTEMPTS=2\n# Données : SESSION=B21 DTMF_INPUT=# ATTEMPTS=0\nA_COMPLETER\n",
    "hints": [
      "Aiguillez l'appelant vers l'extension correspondant au chiffre DTMF saisi.",
      "Exécutez l'extension t en cas de timeout et l'extension i si la touche est invalide."
    ],
    "examples": [
      {
        "stdin": "SESSION=S001 DTMF_INPUT=1 ATTEMPTS=0\nSESSION=S002 DTMF_INPUT=2 ATTEMPTS=0\nSESSION=S003 DTMF_INPUT=TIMEOUT ATTEMPTS=1\nSESSION=S004 DTMF_INPUT=TIMEOUT ATTEMPTS=2\nSESSION=S005 DTMF_INPUT=7 ATTEMPTS=0",
        "expected": "SESSION:S001 | TOUCHE:1 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(commercial) | SUITE:SUCCES\nSESSION:S002 | TOUCHE:2 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(support) | SUITE:SUCCES\nSESSION:S003 | TOUCHE:TIMEOUT | ESSAIS:1 | ACTION:RELANCER | CIBLE:WaitExten(5) | SUITE:RETRY\nSESSION:S004 | TOUCHE:TIMEOUT | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\nSESSION:S005 | TOUCHE:7 | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "SESSION:A10 | TOUCHE:3 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES\nSESSION:A11 | TOUCHE:9 | ESSAIS:1 | ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER\nSESSION:A12 | TOUCHE:t | ESSAIS:3 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "SESSION:B20 | TOUCHE:* | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID\nSESSION:B21 | TOUCHE:# | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY\n"
      }
    ],
    "solution": "[Exemple]\nSESSION:S001 | TOUCHE:1 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(commercial) | SUITE:SUCCES\nSESSION:S002 | TOUCHE:2 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Queue(support) | SUITE:SUCCES\nSESSION:S003 | TOUCHE:TIMEOUT | ESSAIS:1 | ACTION:RELANCER | CIBLE:WaitExten(5) | SUITE:RETRY\nSESSION:S004 | TOUCHE:TIMEOUT | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\nSESSION:S005 | TOUCHE:7 | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY\n\n\n[Cas 1 — Cas de test 1]\nSESSION:A10 | TOUCHE:3 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES\nSESSION:A11 | TOUCHE:9 | ESSAIS:1 | ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER\nSESSION:A12 | TOUCHE:t | ESSAIS:3 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\n\n\n[Cas 2 — Cas de test 2]\nSESSION:B20 | TOUCHE:* | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID\nSESSION:B21 | TOUCHE:# | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY"
  }
];
