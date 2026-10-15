/**
 * Exercices du chapitre 3 — Cybersécurité B2.
 */
'use strict';

module.exports = [
  {
    "id": "cs2-c3-e1",
    "chapter": 3,
    "title": "Moteur de filtrage de paquets de pare-feu stateless (First-Match)",
    "level": "n1",
    "language": "python",
    "goal": "Moteur de filtrage de paquets de pare-feu stateless (First-Match)",
    "brief": "<p>Un pare-feu sans état (stateless firewall) inspecte chaque paquet individuellement en appliquant la première règle correspondante (politique <i>First-Match</i>).\n\nEntrée :\n- Ligne 1 : Liste de règles ordonnées séparées par des barres verticales <code>|</code>.\n  Format d’une règle : <code>ACTION PROTOCOL PORT</code> (ex. <code>DROP tcp 23|ACCEPT tcp 80|DROP all all</code>).\n- Ligne 2 : Paquet à tester sous la forme <code>PROTOCOL PORT</code> (ex. <code>tcp 80</code>).\n\nRègles de correspondance :\n- Si le protocole de la règle est <code>all</code> ou correspond au protocole du paquet,\n- ET si le port de la règle est <code>all</code> ou correspond au port du paquet,\n- ALORS la règle correspond et l’action s’applique immédiatement sans évaluer les règles suivantes.\n\nSortie : <code>Action: &lt;ACTION&gt; (regle: &lt;REGLE_MATCHEE&gt;)</code>.</p>",
    "starter": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\n\n# À compléter : parcourir les règles et appliquer la première qui correspond\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "DROP tcp 23|ACCEPT tcp 80|ACCEPT tcp 443|DROP all all\ntcp 80",
        "expected": "Action: ACCEPT (regle: ACCEPT tcp 80)",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "DROP tcp 23|ACCEPT tcp 80|ACCEPT tcp 443|DROP all all\ntcp 23",
        "expected": "Action: DROP (regle: DROP tcp 23)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "DROP tcp 23|ACCEPT tcp 80|ACCEPT tcp 443|DROP all all\nudp 53",
        "expected": "Action: DROP (regle: DROP all all)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "ACCEPT udp 53|ACCEPT tcp 22|DROP all all\ntcp 22",
        "expected": "Action: ACCEPT (regle: ACCEPT tcp 22)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "ACCEPT tcp all|DROP all all\ntcp 8080",
        "expected": "Action: ACCEPT (regle: ACCEPT tcp all)"
      }
    ],
    "solution": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif len(lignes) >= 2:\n    regles_raw = lignes[0].split(\"|\")\n    pkt_proto, pkt_port = lignes[1].split()\n    matched = None\n    for r in regles_raw:\n        parts = r.strip().split()\n        if len(parts) == 3:\n            act, proto, port = parts\n            if proto in (\"all\", pkt_proto) and port in (\"all\", pkt_port):\n                matched = (act, r.strip())\n                break\n    if matched:\n        print(f\"Action: {matched[0]} (regle: {matched[1]})\")\n    else:\n        print(\"Action: DROP (regle: default)\")\n"
  },
  {
    "id": "cs2-c3-e2",
    "chapter": 3,
    "title": "Audit de rapport de scan Nmap et détection de services en clair",
    "level": "n2",
    "language": "python",
    "goal": "Audit de rapport de scan Nmap et détection de services en clair",
    "brief": "<p>L’exposition de protocoles non chiffrés sur un réseau constitue une vulnérabilité critique. Votre programme analyse la liste des ports ouverts issus d’un scan Nmap :\nEntrée : <code>port1/service1,port2/service2,...</code> (ex. <code>21/ftp,22/ssh,80/http,23/telnet</code>).\n\nServices vulnérables à identifier impérativement :\n- Port 21 (ftp) : <code>ALERTE: port 21 (ftp) &rarr; authentification et donnees en clair</code>\n- Port 23 (telnet) : <code>ALERTE: port 23 (telnet) &rarr; console d administration non chiffree</code>\n- Port 80 (http) : <code>ALERTE: port 80 (http) &rarr; absence de chiffrement TLS</code>\n\nSortie : Afficher chaque alerte détectée (une par ligne dans l’ordre d’apparition).\nSi aucun service vulnérable n’est détecté, afficher : <code>AUCUNE VULNERABILITE CRITIQUE DETECTEE</code>.</p>",
    "starter": "import sys\n\nscan = sys.stdin.read().strip()\n\n# À compléter : identifier les services en clair dans le scan\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "21/ftp,22/ssh,80/http,23/telnet,443/https",
        "expected": "ALERTE: port 21 (ftp) -> authentification et donnees en clair\nALERTE: port 80 (http) -> absence de chiffrement TLS\nALERTE: port 23 (telnet) -> console d administration non chiffree",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "22/ssh,443/https,53/dns",
        "expected": "AUCUNE VULNERABILITE CRITIQUE DETECTEE"
      },
      {
        "label": "Test de validation 2",
        "stdin": "23/telnet",
        "expected": "ALERTE: port 23 (telnet) -> console d administration non chiffree"
      },
      {
        "label": "Test de validation 3",
        "stdin": "80/http,3306/mysql",
        "expected": "ALERTE: port 80 (http) -> absence de chiffrement TLS"
      },
      {
        "label": "Test de validation 4",
        "stdin": "21/ftp,80/http",
        "expected": "ALERTE: port 21 (ftp) -> authentification et donnees en clair\nALERTE: port 80 (http) -> absence de chiffrement TLS"
      }
    ],
    "solution": "import sys\n\nscan = sys.stdin.read().strip()\nif scan:\n    vulns = {\n        \"21\": (\"ftp\", \"authentification et donnees en clair\"),\n        \"23\": (\"telnet\", \"console d administration non chiffree\"),\n        \"80\": (\"http\", \"absence de chiffrement TLS\")\n    }\n    trouves = []\n    for item in scan.split(\",\"):\n        item = item.strip()\n        if \"/\" in item:\n            port, srv = item.split(\"/\", 1)\n            if port in vulns:\n                trouves.append(f\"ALERTE: port {port} ({vulns[port][0]}) -> {vulns[port][1]}\")\n    if trouves:\n        print(\"\\n\".join(trouves))\n    else:\n        print(\"AUCUNE VULNERABILITE CRITIQUE DETECTEE\")\n"
  },
  {
    "id": "cs2-c3-e3",
    "chapter": 3,
    "title": "Détecteur d’attaque par empoisonnement de table ARP (ARP Poisoning)",
    "level": "n3",
    "language": "python",
    "goal": "Détecteur d’attaque par empoisonnement de table ARP (ARP Poisoning)",
    "brief": "<p>L’attaque par empoisonnement ARP (ARP Spoofing) permet à un attaquant de s’interposer en Man-in-the-Middle en associant son adresse MAC à l’adresse IP légitime de la passerelle ou d’une autre cible.\n\nEntrée : <code>table_arp;reponse_arp</code> où :\n- <code>table_arp</code> est une liste de couples <code>IP:MAC</code> séparés par des virgules (adresses enregistrées de confiance).\n- <code>reponse_arp</code> est un paquet ARP reçu sous la forme <code>is-at IP MAC</code> (ex. <code>is-at 192.168.1.1 00:11:22:33:44:55</code>).\n\nTraitement :\n1. Si l’IP figure dans la table et que la MAC reçue est DIFFERENTE de la MAC enregistrée (insensible à la casse) :\n   Afficher : <code>ALERTE ARP SPOOFING: IP &lt;IP&gt; associee a &lt;ancienne_mac&gt; tente d etre detournee par &lt;nouvelle_mac&gt;</code>.\n2. Si l’IP figure dans la table et que la MAC reçue est identique, ou si l’IP est nouvelle :\n   Afficher : <code>PAQUET ARP LEGITIME</code>.</p>",
    "starter": "import sys\n\nligne = sys.stdin.read().strip()\n\n# À compléter : vérifier la concordance IP <-> MAC\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "192.168.1.1:aa:bb:cc:dd:ee:ff,192.168.1.10:11:22:33:44:55:66;is-at 192.168.1.1 00:11:22:33:44:55",
        "expected": "ALERTE ARP SPOOFING: IP 192.168.1.1 associee a aa:bb:cc:dd:ee:ff tente d etre detournee par 00:11:22:33:44:55",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "192.168.1.1:aa:bb:cc:dd:ee:ff;is-at 192.168.1.1 aa:bb:cc:dd:ee:ff",
        "expected": "PAQUET ARP LEGITIME"
      },
      {
        "label": "Test de validation 2",
        "stdin": "192.168.1.1:AA:BB:CC:DD:EE:FF;is-at 192.168.1.1 aa:bb:cc:dd:ee:ff",
        "expected": "PAQUET ARP LEGITIME"
      },
      {
        "label": "Test de validation 3",
        "stdin": "10.0.0.1:02:42:ac:11:00:02;is-at 10.0.0.1 de:ad:be:ef:00:01",
        "expected": "ALERTE ARP SPOOFING: IP 10.0.0.1 associee a 02:42:ac:11:00:02 tente d etre detournee par de:ad:be:ef:00:01"
      },
      {
        "label": "Test de validation 4",
        "stdin": "192.168.1.1:aa:bb:cc:dd:ee:ff;is-at 192.168.1.50 99:88:77:66:55:44",
        "expected": "PAQUET ARP LEGITIME"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.read().strip()\nif ligne:\n    table_s, pkt_s = ligne.split(\";\")\n    table = {}\n    for item in table_s.split(\",\"):\n        if \":\" in item:\n            ip, mac = item.split(\":\", 1)\n            table[ip.strip()] = mac.strip().lower()\n    parts = pkt_s.strip().split()\n    # format: is-at <ip> <mac>\n    if len(parts) >= 3 and parts[0] == \"is-at\":\n        ip, mac = parts[1].strip(), parts[2].strip().lower()\n        if ip in table:\n            if table[ip] != mac:\n                print(f\"ALERTE ARP SPOOFING: IP {ip} associee a {table[ip]} tente d etre detournee par {mac}\")\n            else:\n                print(\"PAQUET ARP LEGITIME\")\n        else:\n            print(\"PAQUET ARP LEGITIME\")\n"
  }
];
