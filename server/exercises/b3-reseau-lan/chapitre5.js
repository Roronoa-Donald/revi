'use strict';

module.exports = [
  {
    "id": "lan3-c5-e1",
    "chapter": 5,
    "title": "Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le mécanisme Cisco Port Security et les modes de réaction face aux adresses MAC non autorisées.",
    "brief": "<p>La fonctionnalité <strong>Port Security</strong> limite les adresses MAC autorisées sur un port à celles qui sont configurées ou apprises, jusqu'au quota <code>max_mac</code>.<br><br>\nPour une trame non autorisée, ce modèle distingue trois modes :<br>\n- <strong>protect :</strong> la trame est détruite sans alerte ni incrément de compteur ; le port reste <code>UP</code> (<code>action=DROP_SILENT</code>).<br>\n- <strong>restrict :</strong> la trame est détruite, le compteur et l'alerte sont activés ; le port reste <code>UP</code> (<code>action=DROP_ALERT</code>).<br>\n- <strong>shutdown :</strong> le port passe en <code>ERR_DISABLE</code> (<code>action=PORT_SHUTDOWN</code>). Dans ce scénario sans rétablissement, les trames suivantes sont rejetées avec <code>action=DROP state=ERR_DISABLE</code>.<br><br>\nEn pratique, après diagnostic et correction de la cause, une réactivation manuelle (<code>shutdown</code> puis <code>no shutdown</code>) ou une récupération automatique configurée peut être possible selon la plateforme.<br><br>\nChaque cas commence par <code>PORT_SEC port=&lt;port&gt; max_mac=&lt;quota&gt; mode=&lt;protect|restrict|shutdown&gt; sticky_macs=&lt;adresses|NONE&gt;</code>, suivi des trames <code>FRAME id=&lt;nom&gt; src_mac=&lt;mac&gt;</code>.<br>\nPour chaque trame, afficher :<br>\n<code>PORT_SEC_REPORT id={id} port={port} mac={src_mac} status={PERMIT|VIOLATION|PORT_DOWN} action={action} state={state}</code></p>",
    "starter": "# Grille d'analyse (lan3-c5-e1) — Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\n# Données : PORT_SEC port=Gi0/1 max_mac=1 mode=restrict sticky_macs=00:00:00:00:00:01\n# Données : FRAME id=R1 src_mac=00:00:00:00:00:01\n# Données : FRAME id=R2 src_mac=00:00:00:00:00:99\n# Données : FRAME id=R3 src_mac=00:00:00:00:00:01\nA_COMPLETER\n\n[Cas 2 — Mode protect silencieux]\n# Données : PORT_SEC port=Fa0/5 max_mac=1 mode=protect sticky_macs=NONE\n# Données : FRAME id=P1 src_mac=00:50:56:00:00:01\n# Données : FRAME id=P2 src_mac=00:50:56:00:00:02\nA_COMPLETER\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\n# Données : PORT_SEC port=Eth1 max_mac=2 mode=shutdown sticky_macs=NONE\n# Données : FRAME id=D1 src_mac=00:01:02:03:04:01\n# Données : FRAME id=D2 src_mac=00:01:02:03:04:02\n# Données : FRAME id=D3 src_mac=00:01:02:03:04:03\nA_COMPLETER\n",
    "hints": [
      "Le mécanisme de sécurité Port Security surveille le nombre d’adresses MAC distinctes autorisées sur un port de commutateur.",
      "Si une adresse inconnue dépasse le quota, seul le mode shutdown du scénario place le port en err-disable.",
      "Vérifiez si le nombre d adresses MAC apprises dépasse max_mac : protect ignore sans log, restrict ignore avec compteur, shutdown désactive le port."
    ],
    "examples": [
      {
        "stdin": "PORT_SEC port=Fa0/1 max_mac=1 mode=shutdown sticky_macs=00:11:22:33:44:01\nFRAME id=F1 src_mac=00:11:22:33:44:01\nFRAME id=F2 src_mac=00:aa:bb:cc:dd:02\nFRAME id=F3 src_mac=00:11:22:33:44:01",
        "expected": "PORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE",
        "note": "F1 est autorisée ; F2 déclenche le shutdown du port ; F3 arrive sur un port désactivé."
      }
    ],
    "tests": [
      {
        "label": "Mode restrict conservant le port UP avec drop et alerte",
        "stdin": "cas:1",
        "expected": "PORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP"
      },
      {
        "label": "Mode protect silencieux",
        "stdin": "cas:2",
        "expected": "PORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP"
      },
      {
        "label": "Apprentissage dynamique jusqu'à max_mac=2",
        "stdin": "cas:3",
        "expected": "PORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE"
      }
    ],
    "solution": "[Exemple]\nPORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\nPORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\n\n[Cas 2 — Mode protect silencieux]\nPORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\nPORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE",
    "takeaway": "À retenir : Simuler le mécanisme Cisco Port Security et les modes de réaction face aux adresses MAC non autorisées.\nRepère : F1 est autorisée ; F2 déclenche le shutdown du port ; F3 arrive sur un port désactivé."
  },
  {
    "id": "lan3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La base de liaisons DHCP Snooping de la résidence Néolis",
    "exampleTitle": "Exemple résolu — le DHCP Snooping du siège de Fontenay",
    "goal": "Exploiter la base de liaisons DHCP Snooping (ports de confiance, entrées, expiration) pour protéger l'attribution des adresses.",
    "brief": "<p><strong>Énoncé.</strong> Néolis opère une résidence de 240 logements étudiants : chaque chambre dispose d'une prise RJ45 raccordée à un commutateur d'étage. Le VLAN 60 (logements) est protégé par DHCP Snooping : seules la liaison montante vers le serveur DHCP institutionnel (port Gi1/0/24) et la liaison vers le routeur sont déclarées de confiance ; toutes les prises chambres sont non approuvées. La base de liaisons contient :</p><table><tr><th>Adresse MAC</th><th>Adresse IP attribuée</th><th>VLAN</th><th>Port</th><th>Bail</th></tr><tr><th>00:1a:2b:3c:4d:01</th><td>10.60.0.11</td><td>60</td><td>Gi0/3</td><td>12 h</td></tr><tr><th>00:1a:2b:3c:4d:02</th><td>10.60.0.12</td><td>60</td><td>Gi0/4</td><td>12 h</td></tr><tr><th>00:1a:2b:3c:4d:03</th><td>10.60.0.13</td><td>60</td><td>Gi0/5</td><td>12 h</td></tr></table><p>Rappel du cours : DHCP Snooping distingue les messages clients (DISCOVER, REQUEST), acceptés sur les ports non approuvés avec une limitation de débit, des messages serveur (OFFER, ACK, NAK), rejetés sur tout port non approuvé. La base de liaisons enregistre le couple adresse MAC / adresse IP de chaque bail, avec le port et le VLAN ; l'entrée est retirée à l'expiration du bail.</p><p>Répondez par un court libellé, le nombre seul, ou « oui » / « non » (question 5).</p><ol><li>Sur quel type de port les messages émis par un serveur DHCP (OFFER, ACK) sont-ils acceptés ?</li><li>Un étudiant branche un routeur grand public (serveur DHCP pirate) sur sa prise : que fait le commutateur de ses DHCPOFFER ?</li><li>Combien d'entrées la base de liaisons contient-elle ?</li><li>Le bail de la machine 10.60.0.13 expire sans renouvellement : que devient l'entrée correspondante ?</li><li>Les messages DHCPDISCOVER d'un poste, envoyés sur sa prise non approuvée, sont-ils bloqués ?</li></ol>",
    "starter": "# Exercice — La base de liaisons DHCP Snooping de la résidence Néolis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 4 : un court libellé. Question 3 : le nombre seul.\n# Question 5 : oui ou non.\n\n[Question 1 — Type de port acceptant les messages serveur]\nA_COMPLETER\n\n[Question 2 — Sort réservé aux DHCPOFFER du routeur pirate]\nA_COMPLETER\n\n[Question 3 — Nombre d'entrées de la base]\nA_COMPLETER\n\n[Question 4 — Devenir de l'entrée à l'expiration du bail]\nA_COMPLETER\n\n[Question 5 — Les DHCPDISCOVER sont-ils bloqués ?]\nA_COMPLETER\n",
    "hints": [
      "Le filtrage ne vise que les messages de type serveur : OFFER, ACK et NAK ne peuvent venir que d'un port de confiance.",
      "La base de liaisons suit les baux : une ligne par adresse attribuée, retirée quand le bail meurt.",
      "1. Seuls les ports déclarés de confiance acceptent les messages serveur. 2. La prise de l'étudiant est non approuvée. 3. Comptez les lignes du tableau. 4. Le bail de 12 h expire sans renouvellement. 5. Les messages clients passent, avec limitation de débit."
    ],
    "examples": [
      {
        "stdin": "Le siège de Fontenay protège son VLAN 15 par DHCP Snooping.\nSeuls le port vers le serveur DHCP (Gi1/0/1) et le port vers le routeur (Gi1/0/2) sont de confiance.\nLa base contient : 00:2b:3c:4d:5e:01 → 10.15.0.21 (Gi0/1) et 00:2b:3c:4d:5e:02 → 10.15.0.22 (Gi0/2).\n\n1) Les OFFER d'un serveur pirate branché en Gi0/10 sont rejetées : port non approuvé.\n2) La base compte 2 entrées.\n3) À l'expiration d'un bail, l'entrée est retirée de la base.\n4) Les DISCOVER des clients passent sur les ports non approuvés (avec limitation de débit).",
        "expected": "OFFER rejetées sur port non approuvé — 2 entrées — bail expiré : entrée retirée — DISCOVER transmis",
        "note": "Le filtrage ne vise que les messages de type serveur : le client légitime continue d'obtenir ses bails via le port approuvé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type de port acceptant les messages serveur",
        "stdin": "q:1",
        "expected": "les ports de confiance||les ports approuvés||les ports approuves||ports de confiance||trusted||les ports trusted"
      },
      {
        "label": "Question 2 — Sort réservé aux DHCPOFFER du routeur pirate",
        "stdin": "q:2",
        "expected": "il les rejette||ils sont rejetés||rejetées||rejetes||bloquées||bloquees||supprimées||supprimees"
      },
      {
        "label": "Question 3 — Nombre d'entrées de la base",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Devenir de l'entrée à l'expiration du bail",
        "stdin": "q:4",
        "expected": "elle est supprimée||supprimée||supprimee||elle est retirée||retirée||elle est effacée||effacée"
      },
      {
        "label": "Question 5 — Les DHCPDISCOVER sont-ils bloqués ?",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Type de port acceptant les messages serveur]\nles ports de confiance\n\n[Question 2 — Sort réservé aux DHCPOFFER du routeur pirate]\nil les rejette\n\n[Question 3 — Nombre d'entrées de la base]\n3\n\n[Question 4 — Devenir de l'entrée à l'expiration du bail]\nelle est supprimée\n\n[Question 5 — Les DHCPDISCOVER sont-ils bloqués ?]\nnon",
    "takeaway": "1) Les messages serveur (OFFER, ACK, NAK) ne sont acceptés que sur les ports de confiance, ici Gi1/0/24 et la liaison vers le routeur.\n2) Le routeur pirate est branché sur une prise non approuvée : ses DHCPOFFER sont rejetées par le commutateur.\n3) La base de liaisons contient 3 entrées (10.60.0.11, 10.60.0.12 et 10.60.0.13).\n4) Le bail de 10.60.0.13 expire sans renouvellement : l'entrée est retirée de la base.\n5) Non : les messages clients (DISCOVER, REQUEST) sont transmis depuis les prises non approuvées, avec une limitation de débit.\nContrôle : la table reflète exactement les baux actifs du VLAN 60 ; un poste dont le bail expire disparaît de la base jusqu'à son prochain bail."
  },
  {
    "id": "lan3-c5-e3",
    "chapter": 5,
    "title": "Filtre anti-usurpation Dynamic ARP Inspection (DAI)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser des trames ARP en les comparant à des liaisons fournies, sans conclure à une attaque sur ce seul indice.",
    "brief": "<p>Un empoisonnement de cache ARP peut détourner certaines communications si un attaquant parvient à faire accepter une fausse liaison. <strong>Dynamic ARP Inspection (DAI)</strong> vérifie les messages ARP sur les ports non fiables selon les liaisons DHCP ou les ACL ARP configurées.<br><br>\nDans cette grille simplifiée, tous les messages proviennent de ports non fiables et seules les liaisons <code>BINDING</code> fournies sont utilisées ; aucune ACL ARP n'est modélisée. Une différence de liaison ne prouve pas une attaque : elle peut aussi résulter d'une configuration erronée ou périmée. Les actions et alertes ci-dessous sont celles du modèle, pas une garantie sur chaque commutateur.<br><br>\n1. Si <code>(sender_mac, sender_ip, vlan)</code> correspond à une liaison : <code>status=PERMIT action=FORWARD reason=BINDING_MATCH</code>.<br>\n2. Si <code>sender_ip</code> est enregistré pour ce VLAN avec une autre MAC : <code>status=DENY action=DROP_ALERT reason=BINDING_MISMATCH</code>.<br>\n3. Si <code>sender_ip</code> n'est pas enregistré pour ce VLAN : <code>status=DENY action=DROP reason=UNKNOWN_HOST_BINDING</code>.<br><br>\nPour chaque message, indiquez : <code>DAI_AUDIT id={id} vlan={vlan} sender_ip={sender_ip} sender_mac={sender_mac} status={status} action={action} reason={reason}</code>.</p>",
    "starter": "# Grille d'analyse (lan3-c5-e3) — Filtre anti-usurpation Dynamic ARP Inspection (DAI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\n# Données : BINDING mac=00:00:00:00:00:01 ip=10.0.0.1 vlan=10\n# Données : BINDING mac=00:00:00:00:00:02 ip=10.0.0.1 vlan=20\n# Données : ARP_FRAME id=A1 vlan=10 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\n# Données : ARP_FRAME id=A2 vlan=20 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\nA_COMPLETER\n\n[Cas 2 — Requête conforme à la liaison]\n# Données : BINDING mac=00:22:33:44:55:66 ip=172.16.10.5 vlan=5\n# Données : ARP_FRAME id=OK vlan=5 sender_mac=00:22:33:44:55:66 sender_ip=172.16.10.5 target_ip=172.16.10.1\nA_COMPLETER\n\n[Cas 3 — Hôte absent de la base de ce VLAN]\n# Données : BINDING mac=00:11:11:11:11:11 ip=192.168.1.5 vlan=1\n# Données : ARP_FRAME id=UNKNOWN vlan=1 sender_mac=00:99:99:99:99:99 sender_ip=192.168.1.200 target_ip=192.168.1.1\nA_COMPLETER\n",
    "hints": [
      "Normalisez les adresses MAC en minuscules.",
      "Comparez chaque couple (vlan, sender_ip) à la MAC enregistrée dans les liaisons fournies.",
      "Comparez exactement le triplet (MAC, IP, port) de la trame ARP avec la table de liaison DHCP Snooping fournie ; toute discordance reste un indice à corréler."
    ],
    "examples": [
      {
        "stdin": "BINDING mac=00:11:22:33:44:01 ip=192.168.1.10 vlan=10\nBINDING mac=00:11:22:33:44:02 ip=192.168.1.20 vlan=10\nARP_FRAME id=ARP1 vlan=10 sender_mac=00:11:22:33:44:01 sender_ip=192.168.1.10 target_ip=192.168.1.1\nARP_FRAME id=ARP2 vlan=10 sender_mac=00:aa:bb:cc:dd:ee sender_ip=192.168.1.10 target_ip=192.168.1.20\nARP_FRAME id=ARP3 vlan=10 sender_mac=00:11:22:33:44:99 sender_ip=192.168.1.99 target_ip=192.168.1.1",
        "expected": "DAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING",
        "note": "ARP1 correspond à la liaison ; ARP2 présente une MAC différente ; ARP3 n'a pas de liaison dans ce VLAN."
      }
    ],
    "tests": [
      {
        "label": "VLANs multiples avec la même IP privée dans des domaines isolés",
        "stdin": "cas:1",
        "expected": "DAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=BINDING_MISMATCH"
      },
      {
        "label": "Requête conforme à la liaison",
        "stdin": "cas:2",
        "expected": "DAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH"
      },
      {
        "label": "Hôte absent de la base de ce VLAN",
        "stdin": "cas:3",
        "expected": "DAI_AUDIT id=UNKNOWN vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING"
      }
    ],
    "solution": "[Exemple]\nDAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\nDAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\n\n[Cas 2 — Requête conforme à la liaison]\nDAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH\n\n[Cas 3 — Hôte absent de la base de ce VLAN]\nDAI_AUDIT id=UNKNOWN vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING",
    "takeaway": "À retenir : Analyser des trames ARP en les comparant à des liaisons fournies, sans conclure à une attaque sur ce seul indice.\nRepère : ARP1 correspond à la liaison ; ARP2 présente une MAC différente ; ARP3 n'a pas de liaison dans ce VLAN."
  }
];
