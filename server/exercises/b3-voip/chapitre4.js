/**
 * server/exercises/b3-voip/chapitre4.js — Exercices du Chapitre 4
 * Téléphonie VoIP B3
 */
'use strict';

module.exports = [
  {
    "id": "vo3-c4-e1",
    "chapter": 4,
    "title": "Parseur & Routeur de Dialplan Asterisk (extensions.conf)",
    "level": "n1",
    "language": "python",
    "goal": "Évaluer la logique séquentielle des règles d'extensions et priorités dans le Dialplan extensions.conf d'Asterisk.",
    "brief": "<p>Dans Asterisk, le plan de numérotation (Dialplan) est décrit dans <code>extensions.conf</code>.<br>Chaque ligne d'instruction suit la syntaxe :<br><code>exten => <extension>,<priorite>,<application>(<arguments>)</code></p>\n<p>Exemples :<br><code>exten => 100,1,Answer()</code><br><code>exten => 100,2,Playback(bienvenue)</code><br><code>exten => 100,3,Dial(SIP/100,20)</code><br><code>exten => 100,4,VoiceMail(100@default,u)</code><br><code>exten => 100,5,Hangup()</code></p>\n<p>Les applications courantes sont :</p><ul><li><code>Answer</code> : décroche l'appel</li><li><code>Playback</code> : joue un fichier son</li><li><code>Dial</code> : tente de joindre une cible (technologie/cible, timeout)</li><li><code>VoiceMail</code> : redirige vers la messagerie</li><li><code>Hangup</code> : raccroche la ligne</li></ul>\n<p>Format d'entrée :<br>Lignes de dialplan d'une extension donnée sur STDIN.</p>\n<p>Format de sortie :<br>Pour chaque ligne :<br>1. Extraire : extension, numéro de priorité (ou 'n'), nom de l'application et arguments.<br>2. Déterminer la catégorie de l'application :<br>   - Answer -> CALL_CONTROL<br>   - Playback, Background -> MEDIA<br>   - Dial -> ROUTING<br>   - VoiceMail -> MESSAGING<br>   - Hangup -> TERMINATION<br>   - Autre -> MISC<br>3. Afficher :<br><code>EXT:<ext> | PRIO:<prio> | APP:<app> | ARGS:<args> | CATEGORIE:<cat></code></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : parser les instructions du dialplan Asterisk\n",
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
        "stdin": "exten => 101,1,Dial(SIP/101,15)\nexten => 101,2,GotoIf($[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail)\nexten => 101,3,Hangup()",
        "expected": "EXT:101 | PRIO:1 | APP:Dial | ARGS:SIP/101,15 | CATEGORIE:ROUTING\nEXT:101 | PRIO:2 | APP:GotoIf | ARGS:$[\"${DIALSTATUS}\" = \"BUSY\"]?busy:unavail | CATEGORIE:MISC\nEXT:101 | PRIO:3 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "exten => s,1,Answer()\nexten => s,2,Background(menu-acceuil)\nexten => s,3,WaitExten(5)\nexten => s,4,Hangup()",
        "expected": "EXT:s | PRIO:1 | APP:Answer | ARGS: | CATEGORIE:CALL_CONTROL\nEXT:s | PRIO:2 | APP:Background | ARGS:menu-acceuil | CATEGORIE:MEDIA\nEXT:s | PRIO:3 | APP:WaitExten | ARGS:5 | CATEGORIE:MISC\nEXT:s | PRIO:4 | APP:Hangup | ARGS: | CATEGORIE:TERMINATION\n"
      }
    ],
    "solution": "import sys, re\n\ndef get_category(app):\n    app_lower = app.lower()\n    if app_lower == \"answer\":\n        return \"CALL_CONTROL\"\n    elif app_lower in (\"playback\", \"background\"):\n        return \"MEDIA\"\n    elif app_lower == \"dial\":\n        return \"ROUTING\"\n    elif \"voicemail\" in app_lower:\n        return \"MESSAGING\"\n    elif app_lower == \"hangup\":\n        return \"TERMINATION\"\n    else:\n        return \"MISC\"\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line or not line.startswith(\"exten\") or \"=>\" not in line:\n        continue\n    left, right = line.split(\"=>\", 1)\n    parts = right.strip().split(\",\", 2)\n    if len(parts) < 3:\n        continue\n    ext = parts[0].strip()\n    prio = parts[1].strip()\n    rest = parts[2].strip()\n    if \"(\" in rest and rest.endswith(\")\"):\n        paren_idx = rest.find(\"(\")\n        app = rest[:paren_idx].strip()\n        args = rest[paren_idx + 1:-1].strip()\n    else:\n        app = rest\n        args = \"\"\n    cat = get_category(app)\n\n    print(f\"EXT:{ext} | PRIO:{prio} | APP:{app} | ARGS:{args} | CATEGORIE:{cat}\")\n"
  },
  {
    "id": "vo3-c4-e2",
    "chapter": 4,
    "title": "Matcher de Masques de Numérotation Asterisk (Pattern Matching)",
    "level": "n2",
    "language": "python",
    "goal": "Implémenter le moteur de pattern matching d'Asterisk avec masques _X, _Z, _N et extraction de variables ${EXTEN}.",
    "brief": "<p>Dans Asterisk, les extensions peuvent être définies par des motifs (patterns) débutant par un souligné <code>_</code>. La syntaxe standard des motifs de numérotation Asterisk est :</p><ul><li><code>X</code> : correspond à n'importe quel chiffre de 0 à 9</li><li><code>Z</code> : correspond à n'importe quel chiffre de 1 à 9</li><li><code>N</code> : correspond à n'importe quel chiffre de 2 à 9</li><li><code>[1357]</code> : correspond à l'un des chiffres entre crochets</li><li><code>.</code> (point) : joker correspondant à un ou plusieurs caractères quelconques (en fin de motif)</li><li><code>!</code> (point d'exclamation) : joker correspondant à zéro ou plusieurs caractères</li></ul>\n<p>Exemples :</p><ul><li><code>_7XXXXXXXX</code> : correspond aux numéros sénégalais de 9 chiffres débutant par 7 (de 700000000 à 799999999).</li><li><code>_0[1-5]XXXXXXXX</code> : numéros géographiques français fixes (10 chiffres).</li><li><code>_9.</code> : tout appel sortant avec préfixe 9.</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>PATTERN=<motif_asterisk> NUM=<numero_compose></p>\n<p>Règles :<br>1. Convertir le motif Asterisk en expression régulière équivalente.<br>2. Si le motif ne commence pas par <code>_</code>, il s'agit d'une correspondance littérale exacte.<br>3. Vérifier si NUM correspond au motif.<br>4. Si correspondance : extraire la valeur qui serait affectée à la variable <code>${EXTEN}</code> (soit le numéro entier) et indiquer <code>MATCH:OUI</code>.<br>5. Sinon indiquer <code>MATCH:NON</code>.</p>\n<p>Format de sortie :<br>Pour chaque test :<br>PATTERN:<pattern> | NUM:<num> | REGEX:<regex> | RESULTAT:<MATCH:OUI|MATCH:NON></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : convertir les motifs Asterisk en expressions régulières et tester la correspondance\n",
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
        "stdin": "PATTERN=_NXX NUM=250\nPATTERN=_NXX NUM=150\nPATTERN=_9. NUM=90123456789\nPATTERN=_9. NUM=9",
        "expected": "PATTERN:_NXX | NUM:250 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:OUI\nPATTERN:_NXX | NUM:150 | REGEX:^[2-9][0-9]{2}$ | RESULTAT:MATCH:NON\nPATTERN:_9. | NUM:90123456789 | REGEX:^9.+$ | RESULTAT:MATCH:OUI\nPATTERN:_9. | NUM:9 | REGEX:^9.+$ | RESULTAT:MATCH:NON\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "PATTERN=_ZXXX NUM=1000\nPATTERN=_ZXXX NUM=0500",
        "expected": "PATTERN:_ZXXX | NUM:1000 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:OUI\nPATTERN:_ZXXX | NUM:0500 | REGEX:^[1-9][0-9]{3}$ | RESULTAT:MATCH:NON\n"
      }
    ],
    "solution": "import sys, re\n\ndef pattern_to_regex(pat):\n    if not pat.startswith(\"_\"):\n        return f\"^{re.escape(pat)}$\"\n    body = pat[1:]\n    res = \"^\"\n    i = 0\n    n = len(body)\n    while i < n:\n        c = body[i]\n        if c == \"X\":\n            # Compter les X consécutifs\n            count = 1\n            while i + 1 < n and body[i+1] == \"X\":\n                count += 1\n                i += 1\n            if count == 1:\n                res += \"[0-9]\"\n            else:\n                res += f\"[0-9]{{{count}}}\"\n        elif c == \"Z\":\n            count = 1\n            while i + 1 < n and body[i+1] == \"Z\":\n                count += 1\n                i += 1\n            if count == 1:\n                res += \"[1-9]\"\n            else:\n                res += f\"[1-9]{{{count}}}\"\n        elif c == \"N\":\n            count = 1\n            while i + 1 < n and body[i+1] == \"N\":\n                count += 1\n                i += 1\n            if count == 1:\n                res += \"[2-9]\"\n            else:\n                res += f\"[2-9]{{{count}}}\"\n        elif c == \".\":\n            res += \".+\"\n        elif c == \"!\":\n            res += \".*\"\n        elif c == \"[\":\n            end_idx = body.find(\"]\", i)\n            if end_idx != -1:\n                res += body[i:end_idx+1]\n                i = end_idx\n            else:\n                res += \"\\[\"\n        else:\n            res += re.escape(c)\n        i += 1\n    res += \"$\"\n    return res\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    pattern = parts.get(\"PATTERN\", \"\")\n    num = parts.get(\"NUM\", \"\")\n\n    reg = pattern_to_regex(pattern)\n    matched = bool(re.match(reg, num))\n    status = \"MATCH:OUI\" if matched else \"MATCH:NON\"\n\n    print(f\"PATTERN:{pattern} | NUM:{num} | REGEX:{reg} | RESULTAT:{status}\")\n"
  },
  {
    "id": "vo3-c4-e3",
    "chapter": 4,
    "title": "Simulateur de Serveur Vocal Interactif SVI / IVR",
    "level": "n3",
    "language": "python",
    "goal": "Simuler la navigation dans un serveur vocal interactif (SVI/IVR) avec gestion des touches DTMF, timeouts (t) et erreurs (i).",
    "brief": "<p>Un Serveur Vocal Interactif (SVI ou IVR) oriente automatiquement les appelants selon les touches DTMF saisies. Dans Asterisk, le menu d'accueil joue un message audio avec l'application <code>Background()</code> puis attend une saisie avec <code>WaitExten()</code>. Si l'appelant appuie sur :</p><ul><li><code>1</code> : Service Commercial (routage vers <code>Queue(commercial)</code>)</li><li><code>2</code> : Support Technique (routage vers <code>Queue(support)</code>)</li><li><code>3</code> : Facturation / Comptabilité (routage vers <code>Dial(SIP/301)</code>)</li><li><code>9</code> : Répéter le menu (redirection vers <code>Goto(menu,s,1)</code>)</li><li><code>t</code> (Timeout, aucune touche après 5 secondes) : rejoue le menu ou raccroche après 2 tentatives.</li><li><code>i</code> (Touche invalide) : joue un message d'erreur <code>Playback(invalid)</code> et réinvite l'utilisateur.</li></ul>\n<p>Format d'entrée :<br>Lignes simulant des sessions d'appelants sous la forme :<br>SESSION=<id> DTMF_INPUT=<touche> ATTEMPTS=<nb_essais_deja_faits></p>\n<p>Règles de décision :   - Si ATTEMPTS >= 2 -> ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT   - Sinon -> ACTION:RELANCER | CIBLE:WaitExten(5) | SUITE:RETRY   - Si ATTEMPTS >= 2 -> ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID   - Sinon -> ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY</p><ul><li>DTMF '1' -> ACTION:ROUTER | CIBLE:Queue(commercial) | SUITE:SUCCES</li><li>DTMF '2' -> ACTION:ROUTER | CIBLE:Queue(support) | SUITE:SUCCES</li><li>DTMF '3' -> ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES</li><li>DTMF '9' -> ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER</li><li>DTMF 'TIMEOUT' ou 't' :</li><li>Toute autre touche (invalide) :</li></ul>\n<p>Format de sortie :<br>Pour chaque session :<br>SESSION:<id> | TOUCHE:<dtmf> | ESSAIS:<attempts> | ACTION:<action> | CIBLE:<cible> | SUITE:<suite></p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]\n\n# À compléter : simuler le routage du menu interactif SVI Asterisk\n",
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
        "stdin": "SESSION=A10 DTMF_INPUT=3 ATTEMPTS=0\nSESSION=A11 DTMF_INPUT=9 ATTEMPTS=1\nSESSION=A12 DTMF_INPUT=t ATTEMPTS=3",
        "expected": "SESSION:A10 | TOUCHE:3 | ESSAIS:0 | ACTION:ROUTER | CIBLE:Dial(SIP/301) | SUITE:SUCCES\nSESSION:A11 | TOUCHE:9 | ESSAIS:1 | ACTION:REPETER | CIBLE:Goto(menu,s,1) | SUITE:REJOUER\nSESSION:A12 | TOUCHE:t | ESSAIS:3 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_TIMEOUT\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "SESSION=B20 DTMF_INPUT=* ATTEMPTS=2\nSESSION=B21 DTMF_INPUT=# ATTEMPTS=0",
        "expected": "SESSION:B20 | TOUCHE:* | ESSAIS:2 | ACTION:RACCROCHER | CIBLE:Hangup() | SUITE:ECHEC_INVALID\nSESSION:B21 | TOUCHE:# | ESSAIS:0 | ACTION:MESSAGE_ERREUR | CIBLE:Playback(pm-invalid-option) | SUITE:RETRY\n"
      }
    ],
    "solution": "import sys\n\nfor line in sys.stdin:\n    line = line.strip()\n    if not line:\n        continue\n    parts = dict(p.split(\"=\", 1) for p in line.split())\n    sess = parts.get(\"SESSION\", \"\")\n    dtmf = parts.get(\"DTMF_INPUT\", \"\").strip()\n    attempts = int(parts.get(\"ATTEMPTS\", 0))\n\n    if dtmf == \"1\":\n        action = \"ROUTER\"\n        cible = \"Queue(commercial)\"\n        suite = \"SUCCES\"\n    elif dtmf == \"2\":\n        action = \"ROUTER\"\n        cible = \"Queue(support)\"\n        suite = \"SUCCES\"\n    elif dtmf == \"3\":\n        action = \"ROUTER\"\n        cible = \"Dial(SIP/301)\"\n        suite = \"SUCCES\"\n    elif dtmf == \"9\":\n        action = \"REPETER\"\n        cible = \"Goto(menu,s,1)\"\n        suite = \"REJOUER\"\n    elif dtmf in (\"TIMEOUT\", \"t\"):\n        if attempts >= 2:\n            action = \"RACCROCHER\"\n            cible = \"Hangup()\"\n            suite = \"ECHEC_TIMEOUT\"\n        else:\n            action = \"RELANCER\"\n            cible = \"WaitExten(5)\"\n            suite = \"RETRY\"\n    else:\n        if attempts >= 2:\n            action = \"RACCROCHER\"\n            cible = \"Hangup()\"\n            suite = \"ECHEC_INVALID\"\n        else:\n            action = \"MESSAGE_ERREUR\"\n            cible = \"Playback(pm-invalid-option)\"\n            suite = \"RETRY\"\n\n    print(f\"SESSION:{sess} | TOUCHE:{dtmf} | ESSAIS:{attempts} | ACTION:{action} | CIBLE:{cible} | SUITE:{suite}\")\n"
  }
];
