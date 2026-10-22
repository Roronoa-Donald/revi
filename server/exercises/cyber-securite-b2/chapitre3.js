'use strict';

module.exports = [
  {
    "id": "cs2-c3-e1",
    "chapter": 3,
    "title": "Moteur de filtrage de paquets de pare-feu stateless (First-Match)",
    "level": "n1",
    "language": "analyse",
    "goal": "Moteur de filtrage de paquets de pare-feu stateless (First-Match)",
    "brief": "<p>Un pare-feu sans état (stateless firewall) inspecte chaque paquet individuellement en appliquant la première règle correspondante (politique <i>First-Match</i>).\n\nEntrée :\n- Ligne 1 : Liste de règles ordonnées séparées par des barres verticales <code>|</code>.\n  Format d’une règle : <code>ACTION PROTOCOL PORT</code> (ex. <code>DROP tcp 23|ACCEPT tcp 80|DROP all all</code>).\n- Ligne 2 : Paquet à tester sous la forme <code>PROTOCOL PORT</code> (ex. <code>tcp 80</code>).\n\nRègles de correspondance :\n- Si le protocole de la règle est <code>all</code> ou correspond au protocole du paquet,\n- ET si le port de la règle est <code>all</code> ou correspond au port du paquet,\n- ALORS la règle correspond et l’action s’applique immédiatement sans évaluer les règles suivantes.\n\nRésultat d’analyse attendu : <code>Action: &lt;ACTION&gt; (regle: &lt;REGLE_MATCHEE&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c3-e1) — Moteur de filtrage de paquets de pare-feu stateless (First-Match)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : DROP tcp 23|ACCEPT tcp 80|ACCEPT tcp 443|DROP all all\n# Données : tcp 23\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : DROP tcp 23|ACCEPT tcp 80|ACCEPT tcp 443|DROP all all\n# Données : udp 53\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : ACCEPT udp 53|ACCEPT tcp 22|DROP all all\n# Données : tcp 22\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : ACCEPT tcp all|DROP all all\n# Données : tcp 8080\nA_COMPLETER\n",
    "hints": [
      "Les règles de pare-feu sont ordonnées : la première règle correspondante (First-Match) détermine le sort du paquet.",
      "En l’absence de règle explicite correspondante, appliquez la politique par défaut de filtrage."
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
        "stdin": "cas:1",
        "expected": "Action: DROP (regle: DROP tcp 23)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "Action: DROP (regle: DROP all all)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "Action: ACCEPT (regle: ACCEPT tcp 22)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "Action: ACCEPT (regle: ACCEPT tcp all)"
      }
    ],
    "solution": "[Exemple]\nAction: ACCEPT (regle: ACCEPT tcp 80)\n\n[Cas 1 — Test de validation 1]\nAction: DROP (regle: DROP tcp 23)\n\n[Cas 2 — Test de validation 2]\nAction: DROP (regle: DROP all all)\n\n[Cas 3 — Test de validation 3]\nAction: ACCEPT (regle: ACCEPT tcp 22)\n\n[Cas 4 — Test de validation 4]\nAction: ACCEPT (regle: ACCEPT tcp all)"
  },
  {
    "id": "cs2-c3-e2",
    "chapter": 3,
    "title": "Audit de rapport de scan Nmap et détection de services en clair",
    "level": "n2",
    "language": "analyse",
    "goal": "Audit de rapport de scan Nmap et détection de services en clair",
    "brief": "<p>L’exposition de protocoles non chiffrés sur un réseau constitue une vulnérabilité critique. Votre programme analyse la liste des ports ouverts issus d’un scan Nmap :\nEntrée : <code>port1/service1,port2/service2,...</code> (ex. <code>21/ftp,22/ssh,80/http,23/telnet</code>).\n\nServices vulnérables à identifier impérativement :\n- Port 21 (ftp) : <code>ALERTE: port 21 (ftp) &rarr; authentification et donnees en clair</code>\n- Port 23 (telnet) : <code>ALERTE: port 23 (telnet) &rarr; console d administration non chiffree</code>\n- Port 80 (http) : <code>ALERTE: port 80 (http) &rarr; absence de chiffrement TLS</code>\n\nRésultat d’analyse attendu : Afficher chaque alerte détectée (une par ligne dans l’ordre d’apparition).\nSi aucun service vulnérable n’est détecté, afficher : <code>AUCUNE VULNERABILITE CRITIQUE DETECTEE</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c3-e2) — Audit de rapport de scan Nmap et détection de services en clair\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 22/ssh,443/https,53/dns\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 23/telnet\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 80/http,3306/mysql\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 21/ftp,80/http\nA_COMPLETER\n",
    "hints": [
      "Repérez les protocoles non chiffrés vulnérables à l’écoute réseau : Telnet (23), FTP (21) ou HTTP (80).",
      "Préconisez la migration systématique vers leurs alternatives chiffrées sécurisées (SSH, SFTP, HTTPS)."
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
        "stdin": "cas:1",
        "expected": "AUCUNE VULNERABILITE CRITIQUE DETECTEE"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "ALERTE: port 23 (telnet) -> console d administration non chiffree"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "ALERTE: port 80 (http) -> absence de chiffrement TLS"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "ALERTE: port 21 (ftp) -> authentification et donnees en clair\nALERTE: port 80 (http) -> absence de chiffrement TLS"
      }
    ],
    "solution": "[Exemple]\nALERTE: port 21 (ftp) -> authentification et donnees en clair\nALERTE: port 80 (http) -> absence de chiffrement TLS\nALERTE: port 23 (telnet) -> console d administration non chiffree\n\n[Cas 1 — Test de validation 1]\nAUCUNE VULNERABILITE CRITIQUE DETECTEE\n\n[Cas 2 — Test de validation 2]\nALERTE: port 23 (telnet) -> console d administration non chiffree\n\n[Cas 3 — Test de validation 3]\nALERTE: port 80 (http) -> absence de chiffrement TLS\n\n[Cas 4 — Test de validation 4]\nALERTE: port 21 (ftp) -> authentification et donnees en clair\nALERTE: port 80 (http) -> absence de chiffrement TLS"
  },
  {
    "id": "cs2-c3-e3",
    "chapter": 3,
    "title": "Détecteur d’attaque par empoisonnement de table ARP (ARP Poisoning)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecteur d’attaque par empoisonnement de table ARP (ARP Poisoning)",
    "brief": "<p>L’attaque par empoisonnement ARP (ARP Spoofing) permet à un attaquant de s’interposer en Man-in-the-Middle en associant son adresse MAC à l’adresse IP légitime de la passerelle ou d’une autre cible.\n\nEntrée : <code>table_arp;reponse_arp</code> où :\n- <code>table_arp</code> est une liste de couples <code>IP:MAC</code> séparés par des virgules (adresses enregistrées de confiance).\n- <code>reponse_arp</code> est un paquet ARP reçu sous la forme <code>is-at IP MAC</code> (ex. <code>is-at 192.168.1.1 00:11:22:33:44:55</code>).\n\nTraitement :\n1. Si l’IP figure dans la table et que la MAC reçue est DIFFERENTE de la MAC enregistrée (insensible à la casse) :\n   Afficher : <code>ALERTE ARP SPOOFING: IP &lt;IP&gt; associee a &lt;ancienne_mac&gt; tente d etre detournee par &lt;nouvelle_mac&gt;</code>.\n2. Si l’IP figure dans la table et que la MAC reçue est identique, ou si l’IP est nouvelle :\n   Afficher : <code>PAQUET ARP LEGITIME</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c3-e3) — Détecteur d’attaque par empoisonnement de table ARP (ARP Poisoning)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 192.168.1.1:aa:bb:cc:dd:ee:ff;is-at 192.168.1.1 aa:bb:cc:dd:ee:ff\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 192.168.1.1:AA:BB:CC:DD:EE:FF;is-at 192.168.1.1 aa:bb:cc:dd:ee:ff\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 10.0.0.1:02:42:ac:11:00:02;is-at 10.0.0.1 de:ad:be:ef:00:01\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 192.168.1.1:aa:bb:cc:dd:ee:ff;is-at 192.168.1.50 99:88:77:66:55:44\nA_COMPLETER\n",
    "hints": [
      "L’usurpation ARP (ARP Spoofing) détourne le trafic en associant frauduleusement une IP à une fausse adresse MAC.",
      "Détectez les réponses ARP incohérentes ou les conflits d’adresses MAC pour une même passerelle."
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
        "stdin": "cas:1",
        "expected": "PAQUET ARP LEGITIME"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "PAQUET ARP LEGITIME"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "ALERTE ARP SPOOFING: IP 10.0.0.1 associee a 02:42:ac:11:00:02 tente d etre detournee par de:ad:be:ef:00:01"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "PAQUET ARP LEGITIME"
      }
    ],
    "solution": "[Exemple]\nALERTE ARP SPOOFING: IP 192.168.1.1 associee a aa:bb:cc:dd:ee:ff tente d etre detournee par 00:11:22:33:44:55\n\n[Cas 1 — Test de validation 1]\nPAQUET ARP LEGITIME\n\n[Cas 2 — Test de validation 2]\nPAQUET ARP LEGITIME\n\n[Cas 3 — Test de validation 3]\nALERTE ARP SPOOFING: IP 10.0.0.1 associee a 02:42:ac:11:00:02 tente d etre detournee par de:ad:be:ef:00:01\n\n[Cas 4 — Test de validation 4]\nPAQUET ARP LEGITIME"
  }
];
