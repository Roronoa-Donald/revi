/**
 * server/exercises/b3-supervision/chapitre2.js — Exercices du Chapitre 2
 * Chapitre 2 : Architecture & Protocoles de Supervision (SNMP & Syslog)
 */

module.exports = [
  {
    id: 'sup3-c2-e1',
    chapter: 2,
    title: 'Décodeur d’OID SNMP et Résolution Symbolique MIB-2',
    level: 'n1',
    language: 'python',
    goal: 'Résoudre un identifiant d\'objet SNMP (OID) vers son nom symbolique dans la MIB-2 standard et formater la valeur retournée.',
    brief: `<p>SNMP structure ses informations dans une arborescence hiérarchique (*Management Information Base* ou MIB).<br><br>
Table des préfixes MIB-2 standards à supporter :<br>
- <code>1.3.6.1.2.1.1.1</code> : <code>sysDescr</code> (DisplayString)<br>
- <code>1.3.6.1.2.1.1.3</code> : <code>sysUpTime</code> (TimeTicks)<br>
- <code>1.3.6.1.2.1.1.5</code> : <code>sysName</code> (DisplayString)<br>
- <code>1.3.6.1.2.1.2.2.1.2</code> : <code>ifDescr</code> (DisplayString)<br>
- <code>1.3.6.1.2.1.2.2.1.8</code> : <code>ifOperStatus</code> (Integer : <code>1</code>='up', <code>2</code>='down')<br>
- <code>1.3.6.1.2.1.2.2.1.10</code> : <code>ifInOctets</code> (Counter32)<br>
- <code>1.3.6.1.2.1.2.2.1.16</code> : <code>ifOutOctets</code> (Counter32)<br><br>
L'OID reçu commence par un préfixe MIB suivi d'un point et de l'index d'instance (ou <code>.0</code> pour les scalaires système).<br><br>
Entrée STDIN : <code>SNMP_DECODE OID=&lt;oid&gt; VALUE=&lt;val&gt;</code>.<br>
Sortie : <code>SNMP_OBJ: symbol=&lt;name&gt; instance=&lt;idx&gt; type=&lt;type&gt; value=&lt;valeur_formatée&gt;</code>.<br>
(Si le préfixe est inconnu : <code>SNMP_OBJ: symbol=UNKNOWN instance=NONE type=UNKNOWN value=&lt;val&gt;</code>).</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser l'OID, identifier le symbole MIB et formater la valeur
`,
    hints: [
      "Isolez le préfixe MIB et le suffixe d'instance après le dernier point.",
      "Pour ifOperStatus, remplacez '1' par 'up' et '2' par 'down'."
    ],
    examples: [
      {
        stdin: 'SNMP_DECODE OID=1.3.6.1.2.1.2.2.1.10.2 VALUE=45892100',
        expected: 'SNMP_OBJ: symbol=ifInOctets instance=2 type=Counter32 value=45892100',
        note: "Résolution du compteur d'octets entrants sur l'interface 2."
      }
    ],
    tests: [
      {
        label: 'Statut opérationnel interface 1 (up)',
        stdin: 'SNMP_DECODE OID=1.3.6.1.2.1.2.2.1.8.1 VALUE=1',
        expected: 'SNMP_OBJ: symbol=ifOperStatus instance=1 type=Integer value=up\n'
      },
      {
        label: 'Temps de fonctionnement sysUpTime scalaire 0',
        stdin: 'SNMP_DECODE OID=1.3.6.1.2.1.1.3.0 VALUE=8640000',
        expected: 'SNMP_OBJ: symbol=sysUpTime instance=0 type=TimeTicks value=8640000\n'
      },
      {
        label: 'Nom de machine sysName',
        stdin: 'SNMP_DECODE OID=1.3.6.1.2.1.1.5.0 VALUE=gw-edge-core',
        expected: 'SNMP_OBJ: symbol=sysName instance=0 type=DisplayString value=gw-edge-core\n'
      },
      {
        label: 'OID propriétaire entreprise inconnu',
        stdin: 'SNMP_DECODE OID=1.3.6.1.4.1.9.9.23.1 VALUE=proprietary_data',
        expected: 'SNMP_OBJ: symbol=UNKNOWN instance=NONE type=UNKNOWN value=proprietary_data\n'
      }
    ],
    solution: `import sys

MIB_MAP = {
    "1.3.6.1.2.1.1.1": ("sysDescr", "DisplayString"),
    "1.3.6.1.2.1.1.3": ("sysUpTime", "TimeTicks"),
    "1.3.6.1.2.1.1.5": ("sysName", "DisplayString"),
    "1.3.6.1.2.1.2.2.1.2": ("ifDescr", "DisplayString"),
    "1.3.6.1.2.1.2.2.1.8": ("ifOperStatus", "Integer"),
    "1.3.6.1.2.1.2.2.1.10": ("ifInOctets", "Counter32"),
    "1.3.6.1.2.1.2.2.1.16": ("ifOutOctets", "Counter32")
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("SNMP_DECODE "):
        continue
    parts = ligne.split("SNMP_DECODE ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    oid = params.get("OID", "")
    raw_val = params.get("VALUE", "")

    matched = False
    for prefix, (sym_name, sym_type) in MIB_MAP.items():
        if oid == prefix:
            instance = "0"
            matched = True
        elif oid.startswith(prefix + "."):
            instance = oid[len(prefix) + 1:]
            matched = True
        if matched:
            formatted_val = raw_val
            if sym_name == "ifOperStatus":
                if raw_val == "1":
                    formatted_val = "up"
                elif raw_val == "2":
                    formatted_val = "down"
            print(f"SNMP_OBJ: symbol={sym_name} instance={instance} type={sym_type} value={formatted_val}")
            break

    if not matched:
        print(f"SNMP_OBJ: symbol=UNKNOWN instance=NONE type=UNKNOWN value={raw_val}")
`
  },
  {
    id: 'sup3-c2-e2',
    chapter: 2,
    title: 'Parseur de Trames Syslog RFC 5424 et Décodeur PRI',
    level: 'n2',
    language: 'python',
    goal: 'Extraire les composants structurés d\'une trame Syslog et calculer la facilité et la sévérité à partir de la valeur de priorité PRI.',
    brief: `<p>La RFC 5424 standardise le format des messages Syslog avec une priorité <code>&lt;PRI&gt;</code> initiale :<br><br>
Formule :<br>
- <code>Facility = PRI // 8</code><br>
- <code>Severity = PRI % 8</code><br><br>
Table des facilités :<br>
<code>0: kernel, 1: user, 3: daemon, 4: auth, 16: local0, 17: local1, 18: local2, 19: local3, 20: local4, 21: local5, 22: local6, 23: local7</code>.<br><br>
Table des sévérités :<br>
<code>0: Emergency, 1: Alert, 2: Critical, 3: Error, 4: Warning, 5: Notice, 6: Informational, 7: Debug</code>.<br><br>
Format de la ligne STDIN :<br>
<code>SYSLOG_PARSE &lt;PRI&gt;VERSION TIMESTAMP HOSTNAME APP-NAME PROCID MSGID STRUCTURED-DATA MSG</code><br>
Sortie : <code>SYSLOG: pri=&lt;PRI&gt; facility=&lt;fac_name&gt; severity=&lt;sev_name&gt; host=&lt;hostname&gt; app=&lt;app_name&gt; msg=&lt;message&gt;</code>.</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : décoder la priorité PRI et extraire les champs RFC 5424
`,
    hints: [
      "Extrayez l'entier entre chevrons <PRI>.",
      "Le message final contient tout le texte après les métadonnées et la section STRUCTURED-DATA (représentée par '-' ou entre crochets)."
    ],
    examples: [
      {
        stdin: 'SYSLOG_PARSE <134>1 2026-10-11T02:00:00Z srv-web01 nginx 1234 ID47 - Service restarted successfully',
        expected: 'SYSLOG: pri=134 facility=local0 severity=Informational host=srv-web01 app=nginx msg=Service restarted successfully',
        note: "PRI 134 correspond à local0 (16) et Informational (6)."
      }
    ],
    tests: [
      {
        label: 'Erreur d authentification sshd',
        stdin: 'SYSLOG_PARSE <27>1 2026-10-11T04:12:00Z gw-edge sshd 8901 AUTH01 - Failed password for root from 192.168.1.50',
        expected: 'SYSLOG: pri=27 facility=daemon severity=Error host=gw-edge app=sshd msg=Failed password for root from 192.168.1.50\n'
      },
      {
        label: 'Panique critique noyau kernel',
        stdin: 'SYSLOG_PARSE <2>1 2026-10-11T05:00:00Z core-router kernel - - [sdid@123] Kernel panic - out of memory',
        expected: 'SYSLOG: pri=2 facility=kernel severity=Critical host=core-router app=kernel msg=Kernel panic - out of memory\n'
      },
      {
        label: 'Alerte sécurité auth facility 4',
        stdin: 'SYSLOG_PARSE <33>1 2026-10-11T06:30:00Z srv-auth sudo 4567 AUDIT - User admin ran /bin/su',
        expected: 'SYSLOG: pri=33 facility=auth severity=Alert host=srv-auth app=sudo msg=User admin ran /bin/su\n'
      }
    ],
    solution: `import sys
import re

FACILITIES = {
    0: "kernel", 1: "user", 3: "daemon", 4: "auth",
    16: "local0", 17: "local1", 18: "local2", 19: "local3",
    20: "local4", 21: "local5", 22: "local6", 23: "local7"
}

SEVERITIES = {
    0: "Emergency", 1: "Alert", 2: "Critical", 3: "Error",
    4: "Warning", 5: "Notice", 6: "Informational", 7: "Debug"
}

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("SYSLOG_PARSE "):
        continue
    raw_log = ligne.split("SYSLOG_PARSE ", 1)[1].strip()

    m = re.match(r'^<(\\d+)>(\\d+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(?:\\[.*?\\]|-)\\s*(.*)$', raw_log)
    if not m:
        continue

    pri = int(m.group(1))
    host = m.group(4)
    app = m.group(5)
    msg = m.group(8)

    fac_num = pri // 8
    sev_num = pri % 8

    fac_name = FACILITIES.get(fac_num, f"facility_{fac_num}")
    sev_name = SEVERITIES.get(sev_num, f"severity_{sev_num}")

    print(f"SYSLOG: pri={pri} facility={fac_name} severity={sev_name} host={host} app={app} msg={msg}")
`
  },
  {
    id: 'sup3-c2-e3',
    chapter: 2,
    title: 'Validateur de Sécurité SNMPv3 USM',
    level: 'n3',
    language: 'python',
    goal: 'Auditer la conformité d\'une requête SNMPv3 selon les trois niveaux de sécurité du User-based Security Model.',
    brief: `<p>SNMPv3 remplace les chaînes de communauté en clair par le modèle USM (*User-based Security Model*) :<br><br>
Niveaux de sécurité :<br>
1. <code>noAuthNoPriv</code> : Pas d'authentification ni de chiffrement. Toujours autorisé.<br>
2. <code>authNoPriv</code> : Authentification obligatoire (<code>AUTH_PROTO</code> dans <code>MD5, SHA</code> et mot de passe <code>AUTH_PASS</code> &gt;= 8 caractères). Trames non chiffrées.<br>
3. <code>authPriv</code> : Authentification (MD5 ou SHA &gt;= 8 car.) ET chiffrement de la payload (<code>PRIV_PROTO</code> dans <code>DES, AES</code> et <code>PRIV_PASS</code> &gt;= 8 caractères).<br><br>
Entrée STDIN : <code>SNMPV3_AUTH LEVEL=&lt;lvl&gt; USER=&lt;user&gt; AUTH_PROTO=&lt;p&gt; PRIV_PROTO=&lt;p&gt; AUTH_PASS=&lt;pass&gt; PRIV_PASS=&lt;pass&gt;</code>.<br>
Sortie : <code>SNMPV3: level=&lt;LEVEL&gt; user=&lt;USER&gt; status=&lt;AUTHORIZED|DENIED&gt; reason=&lt;REASON&gt;</code>.<br>
Raisons possibles : <code>NO_AUTH_REQUIRED</code>, <code>AUTH_VALIDATED</code>, <code>SECURE_PRIVACY</code>, <code>INVALID_AUTH</code>, <code>INVALID_PRIVACY</code>.</p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : contrôler la conformité de la requête SNMPv3 USM
`,
    hints: [
      "Vérifiez d'abord si le niveau est noAuthNoPriv.",
      "Pour authPriv, l'authentification ET la confidentialité doivent être valides."
    ],
    examples: [
      {
        stdin: 'SNMPV3_AUTH LEVEL=authPriv USER=secmon AUTH_PROTO=SHA PRIV_PROTO=AES AUTH_PASS=SecretAuth123 PRIV_PASS=SecretPriv456',
        expected: 'SNMPV3: level=authPriv user=secmon status=AUTHORIZED reason=SECURE_PRIVACY',
        note: "Requête complète conforme au niveau maximal authPriv."
      }
    ],
    tests: [
      {
        label: 'Accès public sans auth noAuthNoPriv',
        stdin: 'SNMPV3_AUTH LEVEL=noAuthNoPriv USER=public AUTH_PROTO=NONE PRIV_PROTO=NONE AUTH_PASS=NONE PRIV_PASS=NONE',
        expected: 'SNMPV3: level=noAuthNoPriv user=public status=AUTHORIZED reason=NO_AUTH_REQUIRED\n'
      },
      {
        label: 'Niveau authNoPriv valide avec SHA',
        stdin: 'SNMPV3_AUTH LEVEL=authNoPriv USER=operator AUTH_PROTO=SHA PRIV_PROTO=NONE AUTH_PASS=GoodPassword123 PRIV_PASS=NONE',
        expected: 'SNMPV3: level=authNoPriv user=operator status=AUTHORIZED reason=AUTH_VALIDATED\n'
      },
      {
        label: 'Niveau authNoPriv rejeté mot de passe trop court',
        stdin: 'SNMPV3_AUTH LEVEL=authNoPriv USER=baduser AUTH_PROTO=SHA PRIV_PROTO=NONE AUTH_PASS=short PRIV_PASS=NONE',
        expected: 'SNMPV3: level=authNoPriv user=baduser status=DENIED reason=INVALID_AUTH\n'
      },
      {
        label: 'Niveau authPriv rejeté protocole de chiffrement invalide',
        stdin: 'SNMPV3_AUTH LEVEL=authPriv USER=admin AUTH_PROTO=SHA PRIV_PROTO=RC4 AUTH_PASS=GoodPassword123 PRIV_PASS=GoodPassword123',
        expected: 'SNMPV3: level=authPriv user=admin status=DENIED reason=INVALID_PRIVACY\n'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith("SNMPV3_AUTH "):
        continue
    parts = ligne.split("SNMPV3_AUTH ", 1)[1].strip().split()
    params = {}
    for p in parts:
        if "=" in p:
            k, v = p.split("=", 1)
            params[k] = v

    level = params.get("LEVEL", "noAuthNoPriv")
    user = params.get("USER", "unknown")
    auth_proto = params.get("AUTH_PROTO", "NONE")
    priv_proto = params.get("PRIV_PROTO", "NONE")
    auth_pass = params.get("AUTH_PASS", "")
    priv_pass = params.get("PRIV_PASS", "")

    if level == "noAuthNoPriv":
        status = "AUTHORIZED"
        reason = "NO_AUTH_REQUIRED"
    elif level == "authNoPriv":
        if auth_proto in ("MD5", "SHA") and len(auth_pass) >= 8:
            status = "AUTHORIZED"
            reason = "AUTH_VALIDATED"
        else:
            status = "DENIED"
            reason = "INVALID_AUTH"
    elif level == "authPriv":
        auth_ok = (auth_proto in ("MD5", "SHA") and len(auth_pass) >= 8)
        priv_ok = (priv_proto in ("DES", "AES") and len(priv_pass) >= 8)
        if not auth_ok:
            status = "DENIED"
            reason = "INVALID_AUTH"
        elif not priv_ok:
            status = "DENIED"
            reason = "INVALID_PRIVACY"
        else:
            status = "AUTHORIZED"
            reason = "SECURE_PRIVACY"
    else:
        status = "DENIED"
        reason = "UNKNOWN_LEVEL"

    print(f"SNMPV3: level={level} user={user} status={status} reason={reason}")
`
  }
];
