'use strict';

module.exports = [
  {
    "id": "sup3-c2-e1",
    "chapter": 2,
    "title": "Décodeur d’OID SNMP et Résolution Symbolique MIB-2",
    "level": "n1",
    "language": "analyse",
    "goal": "Résoudre un identifiant d'objet SNMP (OID) vers son nom symbolique dans la MIB-2 standard et formater la valeur retournée.",
    "brief": "<p>SNMP structure ses informations dans une arborescence hiérarchique (*Management Information Base* ou MIB).<br><br>\nTable des préfixes MIB-2 standards à supporter :<br>\n- <code>1.3.6.1.2.1.1.1</code> : <code>sysDescr</code> (DisplayString)<br>\n- <code>1.3.6.1.2.1.1.3</code> : <code>sysUpTime</code> (TimeTicks)<br>\n- <code>1.3.6.1.2.1.1.5</code> : <code>sysName</code> (DisplayString)<br>\n- <code>1.3.6.1.2.1.2.2.1.2</code> : <code>ifDescr</code> (DisplayString)<br>\n- <code>1.3.6.1.2.1.2.2.1.8</code> : <code>ifOperStatus</code> (Integer : <code>1</code>='up', <code>2</code>='down')<br>\n- <code>1.3.6.1.2.1.2.2.1.10</code> : <code>ifInOctets</code> (Counter32)<br>\n- <code>1.3.6.1.2.1.2.2.1.16</code> : <code>ifOutOctets</code> (Counter32)<br><br>\nL'OID reçu commence par un préfixe MIB suivi d'un point et de l'index d'instance (ou <code>.0</code> pour les scalaires système).<br><br>\nDonnées du cas : <code>SNMP_DECODE OID=&lt;oid&gt; VALUE=&lt;val&gt;</code>.<br>\nRésultat d’analyse attendu : <code>SNMP_OBJ: symbol=&lt;name&gt; instance=&lt;idx&gt; type=&lt;type&gt; value=&lt;valeur_formatée&gt;</code>.<br>\n(Si le préfixe est inconnu : <code>SNMP_OBJ: symbol=UNKNOWN instance=NONE type=UNKNOWN value=&lt;val&gt;</code>).</p>",
    "starter": "# Grille d'analyse (sup3-c2-e1) — Décodeur d’OID SNMP et Résolution Symbolique MIB-2\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Statut opérationnel interface 1 (up)]\n# Données : SNMP_DECODE OID=1.3.6.1.2.1.2.2.1.8.1 VALUE=1\nA_COMPLETER\n\n[Cas 2 — Temps de fonctionnement sysUpTime scalaire 0]\n# Données : SNMP_DECODE OID=1.3.6.1.2.1.1.3.0 VALUE=8640000\nA_COMPLETER\n\n[Cas 3 — Nom de machine sysName]\n# Données : SNMP_DECODE OID=1.3.6.1.2.1.1.5.0 VALUE=gw-edge-core\nA_COMPLETER\n\n[Cas 4 — OID propriétaire entreprise inconnu]\n# Données : SNMP_DECODE OID=1.3.6.1.4.1.9.9.23.1 VALUE=proprietary_data\nA_COMPLETER\n",
    "hints": [
      "Isolez le préfixe MIB et le suffixe d'instance après le dernier point.",
      "Pour ifOperStatus, remplacez '1' par 'up' et '2' par 'down'."
    ],
    "examples": [
      {
        "stdin": "SNMP_DECODE OID=1.3.6.1.2.1.2.2.1.10.2 VALUE=45892100",
        "expected": "SNMP_OBJ: symbol=ifInOctets instance=2 type=Counter32 value=45892100",
        "note": "Résolution du compteur d'octets entrants sur l'interface 2."
      }
    ],
    "tests": [
      {
        "label": "Statut opérationnel interface 1 (up)",
        "stdin": "cas:1",
        "expected": "SNMP_OBJ: symbol=ifOperStatus instance=1 type=Integer value=up\n"
      },
      {
        "label": "Temps de fonctionnement sysUpTime scalaire 0",
        "stdin": "cas:2",
        "expected": "SNMP_OBJ: symbol=sysUpTime instance=0 type=TimeTicks value=8640000\n"
      },
      {
        "label": "Nom de machine sysName",
        "stdin": "cas:3",
        "expected": "SNMP_OBJ: symbol=sysName instance=0 type=DisplayString value=gw-edge-core\n"
      },
      {
        "label": "OID propriétaire entreprise inconnu",
        "stdin": "cas:4",
        "expected": "SNMP_OBJ: symbol=UNKNOWN instance=NONE type=UNKNOWN value=proprietary_data\n"
      }
    ],
    "solution": "[Exemple]\nSNMP_OBJ: symbol=ifInOctets instance=2 type=Counter32 value=45892100\n\n[Cas 1 — Statut opérationnel interface 1 (up)]\nSNMP_OBJ: symbol=ifOperStatus instance=1 type=Integer value=up\n\n\n[Cas 2 — Temps de fonctionnement sysUpTime scalaire 0]\nSNMP_OBJ: symbol=sysUpTime instance=0 type=TimeTicks value=8640000\n\n\n[Cas 3 — Nom de machine sysName]\nSNMP_OBJ: symbol=sysName instance=0 type=DisplayString value=gw-edge-core\n\n\n[Cas 4 — OID propriétaire entreprise inconnu]\nSNMP_OBJ: symbol=UNKNOWN instance=NONE type=UNKNOWN value=proprietary_data"
  },
  {
    "id": "sup3-c2-e2",
    "chapter": 2,
    "title": "Parseur de Trames Syslog RFC 5424 et Décodeur PRI",
    "level": "n2",
    "language": "analyse",
    "goal": "Extraire les composants structurés d'une trame Syslog et calculer la facilité et la sévérité à partir de la valeur de priorité PRI.",
    "brief": "<p>La RFC 5424 standardise le format des messages Syslog avec une priorité <code>&lt;PRI&gt;</code> initiale :<br><br>\nFormule :<br>\n- <code>Facility = PRI // 8</code><br>\n- <code>Severity = PRI % 8</code><br><br>\nTable des facilités :<br>\n<code>0: kernel, 1: user, 3: daemon, 4: auth, 16: local0, 17: local1, 18: local2, 19: local3, 20: local4, 21: local5, 22: local6, 23: local7</code>.<br><br>\nTable des sévérités :<br>\n<code>0: Emergency, 1: Alert, 2: Critical, 3: Error, 4: Warning, 5: Notice, 6: Informational, 7: Debug</code>.<br><br>\nFormat de la ligne à analyser :<br>\n<code>SYSLOG_PARSE &lt;PRI&gt;VERSION TIMESTAMP HOSTNAME APP-NAME PROCID MSGID STRUCTURED-DATA MSG</code><br>\nRésultat d’analyse attendu : <code>SYSLOG: pri=&lt;PRI&gt; facility=&lt;fac_name&gt; severity=&lt;sev_name&gt; host=&lt;hostname&gt; app=&lt;app_name&gt; msg=&lt;message&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c2-e2) — Parseur de Trames Syslog RFC 5424 et Décodeur PRI\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Erreur d authentification sshd]\n# Données : SYSLOG_PARSE <27>1 2026-10-11T04:12:00Z gw-edge sshd 8901 AUTH01 - Failed password for root from 192.168.1.50\nA_COMPLETER\n\n[Cas 2 — Panique critique noyau kernel]\n# Données : SYSLOG_PARSE <2>1 2026-10-11T05:00:00Z core-router kernel - - [sdid@123] Kernel panic - out of memory\nA_COMPLETER\n\n[Cas 3 — Alerte sécurité auth facility 4]\n# Données : SYSLOG_PARSE <33>1 2026-10-11T06:30:00Z srv-auth sudo 4567 AUDIT - User admin ran /bin/su\nA_COMPLETER\n",
    "hints": [
      "Extrayez l'entier entre chevrons <PRI>.",
      "Le message final contient tout le texte après les métadonnées et la section STRUCTURED-DATA (représentée par '-' ou entre crochets)."
    ],
    "examples": [
      {
        "stdin": "SYSLOG_PARSE <134>1 2026-10-11T02:00:00Z srv-web01 nginx 1234 ID47 - Service restarted successfully",
        "expected": "SYSLOG: pri=134 facility=local0 severity=Informational host=srv-web01 app=nginx msg=Service restarted successfully",
        "note": "PRI 134 correspond à local0 (16) et Informational (6)."
      }
    ],
    "tests": [
      {
        "label": "Erreur d authentification sshd",
        "stdin": "cas:1",
        "expected": "SYSLOG: pri=27 facility=daemon severity=Error host=gw-edge app=sshd msg=Failed password for root from 192.168.1.50\n"
      },
      {
        "label": "Panique critique noyau kernel",
        "stdin": "cas:2",
        "expected": "SYSLOG: pri=2 facility=kernel severity=Critical host=core-router app=kernel msg=Kernel panic - out of memory\n"
      },
      {
        "label": "Alerte sécurité auth facility 4",
        "stdin": "cas:3",
        "expected": "SYSLOG: pri=33 facility=auth severity=Alert host=srv-auth app=sudo msg=User admin ran /bin/su\n"
      }
    ],
    "solution": "[Exemple]\nSYSLOG: pri=134 facility=local0 severity=Informational host=srv-web01 app=nginx msg=Service restarted successfully\n\n[Cas 1 — Erreur d authentification sshd]\nSYSLOG: pri=27 facility=daemon severity=Error host=gw-edge app=sshd msg=Failed password for root from 192.168.1.50\n\n\n[Cas 2 — Panique critique noyau kernel]\nSYSLOG: pri=2 facility=kernel severity=Critical host=core-router app=kernel msg=Kernel panic - out of memory\n\n\n[Cas 3 — Alerte sécurité auth facility 4]\nSYSLOG: pri=33 facility=auth severity=Alert host=srv-auth app=sudo msg=User admin ran /bin/su"
  },
  {
    "id": "sup3-c2-e3",
    "chapter": 2,
    "title": "Validateur de Sécurité SNMPv3 USM",
    "level": "n3",
    "language": "analyse",
    "goal": "Auditer la conformité d'une requête SNMPv3 selon les trois niveaux de sécurité du User-based Security Model.",
    "brief": "<p>SNMPv3 remplace les chaînes de communauté en clair par le modèle USM (*User-based Security Model*) :<br><br>\nNiveaux de sécurité :<br>\n1. <code>noAuthNoPriv</code> : Pas d'authentification ni de chiffrement. Toujours autorisé.<br>\n2. <code>authNoPriv</code> : Authentification obligatoire (<code>AUTH_PROTO</code> dans <code>MD5, SHA</code> et mot de passe <code>AUTH_PASS</code> &gt;= 8 caractères). Trames non chiffrées.<br>\n3. <code>authPriv</code> : Authentification (MD5 ou SHA &gt;= 8 car.) ET chiffrement de la payload (<code>PRIV_PROTO</code> dans <code>DES, AES</code> et <code>PRIV_PASS</code> &gt;= 8 caractères).<br><br>\nDonnées du cas : <code>SNMPV3_AUTH LEVEL=&lt;lvl&gt; USER=&lt;user&gt; AUTH_PROTO=&lt;p&gt; PRIV_PROTO=&lt;p&gt; AUTH_PASS=&lt;pass&gt; PRIV_PASS=&lt;pass&gt;</code>.<br>\nRésultat d’analyse attendu : <code>SNMPV3: level=&lt;LEVEL&gt; user=&lt;USER&gt; status=&lt;AUTHORIZED|DENIED&gt; reason=&lt;REASON&gt;</code>.<br>\nRaisons possibles : <code>NO_AUTH_REQUIRED</code>, <code>AUTH_VALIDATED</code>, <code>SECURE_PRIVACY</code>, <code>INVALID_AUTH</code>, <code>INVALID_PRIVACY</code>.</p>",
    "starter": "# Grille d'analyse (sup3-c2-e3) — Validateur de Sécurité SNMPv3 USM\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Accès public sans auth noAuthNoPriv]\n# Données : SNMPV3_AUTH LEVEL=noAuthNoPriv USER=public AUTH_PROTO=NONE PRIV_PROTO=NONE AUTH_PASS=NONE PRIV_PASS=NONE\nA_COMPLETER\n\n[Cas 2 — Niveau authNoPriv valide avec SHA]\n# Données : SNMPV3_AUTH LEVEL=authNoPriv USER=operator AUTH_PROTO=SHA PRIV_PROTO=NONE AUTH_PASS=GoodPassword123 PRIV_PASS=NONE\nA_COMPLETER\n\n[Cas 3 — Niveau authNoPriv rejeté mot de passe trop court]\n# Données : SNMPV3_AUTH LEVEL=authNoPriv USER=baduser AUTH_PROTO=SHA PRIV_PROTO=NONE AUTH_PASS=short PRIV_PASS=NONE\nA_COMPLETER\n\n[Cas 4 — Niveau authPriv rejeté protocole de chiffrement invalide]\n# Données : SNMPV3_AUTH LEVEL=authPriv USER=admin AUTH_PROTO=SHA PRIV_PROTO=RC4 AUTH_PASS=GoodPassword123 PRIV_PASS=GoodPassword123\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d'abord si le niveau est noAuthNoPriv.",
      "Pour authPriv, l'authentification ET la confidentialité doivent être valides."
    ],
    "examples": [
      {
        "stdin": "SNMPV3_AUTH LEVEL=authPriv USER=secmon AUTH_PROTO=SHA PRIV_PROTO=AES AUTH_PASS=SecretAuth123 PRIV_PASS=SecretPriv456",
        "expected": "SNMPV3: level=authPriv user=secmon status=AUTHORIZED reason=SECURE_PRIVACY",
        "note": "Requête complète conforme au niveau maximal authPriv."
      }
    ],
    "tests": [
      {
        "label": "Accès public sans auth noAuthNoPriv",
        "stdin": "cas:1",
        "expected": "SNMPV3: level=noAuthNoPriv user=public status=AUTHORIZED reason=NO_AUTH_REQUIRED\n"
      },
      {
        "label": "Niveau authNoPriv valide avec SHA",
        "stdin": "cas:2",
        "expected": "SNMPV3: level=authNoPriv user=operator status=AUTHORIZED reason=AUTH_VALIDATED\n"
      },
      {
        "label": "Niveau authNoPriv rejeté mot de passe trop court",
        "stdin": "cas:3",
        "expected": "SNMPV3: level=authNoPriv user=baduser status=DENIED reason=INVALID_AUTH\n"
      },
      {
        "label": "Niveau authPriv rejeté protocole de chiffrement invalide",
        "stdin": "cas:4",
        "expected": "SNMPV3: level=authPriv user=admin status=DENIED reason=INVALID_PRIVACY\n"
      }
    ],
    "solution": "[Exemple]\nSNMPV3: level=authPriv user=secmon status=AUTHORIZED reason=SECURE_PRIVACY\n\n[Cas 1 — Accès public sans auth noAuthNoPriv]\nSNMPV3: level=noAuthNoPriv user=public status=AUTHORIZED reason=NO_AUTH_REQUIRED\n\n\n[Cas 2 — Niveau authNoPriv valide avec SHA]\nSNMPV3: level=authNoPriv user=operator status=AUTHORIZED reason=AUTH_VALIDATED\n\n\n[Cas 3 — Niveau authNoPriv rejeté mot de passe trop court]\nSNMPV3: level=authNoPriv user=baduser status=DENIED reason=INVALID_AUTH\n\n\n[Cas 4 — Niveau authPriv rejeté protocole de chiffrement invalide]\nSNMPV3: level=authPriv user=admin status=DENIED reason=INVALID_PRIVACY"
  }
];
