'use strict';

module.exports = [
  {
    "id": "na2-c1-e1",
    "chapter": 1,
    "title": "Décodeur d'en-tête Ethernet II",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les champs d'une trame Ethernet II : adresses MAC source et destination, EtherType et classification du trafic.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas. <code>01:00:5e:...</code> ou <code>33:33:...</code>, Unicast sinon)<br>\n- <code>SRC: &lt;MAC&gt;</code><br>\n- <code>TYPE: 0x&lt;HEX&gt; (&lt;IPv4|ARP|IPv6|Inconnu&gt;)</code> (0800=IPv4, 0806=ARP, 86dd=IPv6)<br>\n- <code>TAILLE: &lt;TOTAL&gt; octets</code> (Payload + 14 octets d'en-tête Ethernet)</p>",
    "starter": "# Grille d'analyse (na2-c1-e1) — Décodeur d'en-tête Ethernet II\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trame IPv4 unicast]\n# Données : 00:11:22:33:44:55 00:aa:bb:cc:dd:ee 0800 64\nA_COMPLETER\n\n[Cas 2 — Trame IPv6 multicast]\n# Données : 33:33:00:00:00:01 02:42:ac:11:00:02 86dd 120\nA_COMPLETER\n\n[Cas 3 — Trame protocole inconnu]\n# Données : 00:50:56:c0:00:08 00:0c:29:12:34:56 88cc 40\nA_COMPLETER\n\n[Cas 4 — Trame multicast IPv4 standard]\n# Données : 01:00:5e:00:00:05 00:10:94:ab:cd:ef 0800 80\nA_COMPLETER\n",
    "hints": [
      "L'en-tête Ethernet II standard fait 14 octets (6 octets MAC Dest + 6 octets MAC Src + 2 octets EtherType).",
      "Le premier octet d'une MAC s'obtient par int(l’extraction des champs[0], 16). Le bit 0 indique multicast/broadcast.",
      "La MAC ff:ff:ff:ff:ff:ff est spécifiquement BROADCAST."
    ],
    "examples": [
      {
        "stdin": "ff:ff:ff:ff:ff:ff 00:1a:2b:3c:4d:5e 0806 28",
        "expected": "DEST: ff:ff:ff:ff:ff:ff (BROADCAST)\nSRC: 00:1a:2b:3c:4d:5e\nTYPE: 0x0806 (ARP)\nTAILLE: 42 octets",
        "note": "Trame de requête ARP en diffusion."
      }
    ],
    "tests": [
      {
        "label": "Trame IPv4 unicast",
        "stdin": "cas:1",
        "expected": "DEST: 00:11:22:33:44:55 (UNICAST)\nSRC: 00:aa:bb:cc:dd:ee\nTYPE: 0x0800 (IPv4)\nTAILLE: 78 octets"
      },
      {
        "label": "Trame IPv6 multicast",
        "stdin": "cas:2",
        "expected": "DEST: 33:33:00:00:00:01 (MULTICAST)\nSRC: 02:42:ac:11:00:02\nTYPE: 0x86dd (IPv6)\nTAILLE: 134 octets"
      },
      {
        "label": "Trame protocole inconnu",
        "stdin": "cas:3",
        "expected": "DEST: 00:50:56:c0:00:08 (UNICAST)\nSRC: 00:0c:29:12:34:56\nTYPE: 0x88cc (Inconnu)\nTAILLE: 54 octets"
      },
      {
        "label": "Trame multicast IPv4 standard",
        "stdin": "cas:4",
        "expected": "DEST: 01:00:5e:00:00:05 (MULTICAST)\nSRC: 00:10:94:ab:cd:ef\nTYPE: 0x0800 (IPv4)\nTAILLE: 94 octets"
      }
    ],
    "solution": "[Exemple]\nDEST: ff:ff:ff:ff:ff:ff (BROADCAST)\nSRC: 00:1a:2b:3c:4d:5e\nTYPE: 0x0806 (ARP)\nTAILLE: 42 octets\n\n[Cas 1 — Trame IPv4 unicast]\nDEST: 00:11:22:33:44:55 (UNICAST)\nSRC: 00:aa:bb:cc:dd:ee\nTYPE: 0x0800 (IPv4)\nTAILLE: 78 octets\n\n[Cas 2 — Trame IPv6 multicast]\nDEST: 33:33:00:00:00:01 (MULTICAST)\nSRC: 02:42:ac:11:00:02\nTYPE: 0x86dd (IPv6)\nTAILLE: 134 octets\n\n[Cas 3 — Trame protocole inconnu]\nDEST: 00:50:56:c0:00:08 (UNICAST)\nSRC: 00:0c:29:12:34:56\nTYPE: 0x88cc (Inconnu)\nTAILLE: 54 octets\n\n[Cas 4 — Trame multicast IPv4 standard]\nDEST: 01:00:5e:00:00:05 (MULTICAST)\nSRC: 00:10:94:ab:cd:ef\nTYPE: 0x0800 (IPv4)\nTAILLE: 94 octets"
  },
  {
    "id": "na2-c1-e2",
    "chapter": 1,
    "title": "Simulateur d'encapsulation et désencapsulation PDU OSI",
    "level": "n2",
    "language": "analyse",
    "goal": "Modéliser la pile protocolaire OSI/TCP-IP en empilant (encapsulation) ou en retirant (désencapsulation) les en-têtes.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nPour <code>ENCAPSULER</code>, les 4 lignes suivantes fournissent :<br>\n- Ligne 2 : Donnée applicative (L7 Data)<br>\n- Ligne 3 : <code>&lt;PROTO_L4&gt; &lt;PORT_SRC&gt; &lt;PORT_DST&gt;</code> (ex: <code>TCP 54321 80</code>)<br>\n- Ligne 4 : <code>&lt;IP_SRC&gt; &lt;IP_DST&gt;</code> (ex: <code>192.168.1.10 93.184.216.34</code>)<br>\n- Ligne 5 : <code>&lt;MAC_SRC&gt; &lt;MAC_DST&gt;</code><br>\nIndiquez chaque étape avec son nom de PDU :<br>\n<code>[L7 Data] &lt;donnee&gt;</code><br>\n<code>[L4 Segment &lt;proto&gt;] Port &lt;src&gt;-&gt;&lt;dst&gt; | Payload: &lt;donnee&gt;</code><br>\n<code>[L3 Paquet IP] &lt;ip_src&gt;-&gt;&lt;ip_dst&gt; | Proto: &lt;proto&gt;</code><br>\n<code>[L2 Trame Eth] &lt;mac_src&gt;-&gt;&lt;mac_dst&gt; | EtherType: 0x0800</code></p>\n<p>Pour <code>DESENCAPSULER</code>, Analysez les données fournies pour chaque cas.</p>",
    "starter": "# Grille d'analyse (na2-c1-e2) — Simulateur d'encapsulation et désencapsulation PDU OSI\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Encapsulation requête UDP DNS]\n# Données : ENCAPSULER\n# Données : query:example.com\n# Données : UDP 53000 53\n# Données : 192.168.1.50 8.8.8.8\n# Données : 11:22:33:44:55:66 cc:dd:ee:ff:00:11\nA_COMPLETER\n\n[Cas 2 — Désencapsulation trame Web]\n# Données : DESENCAPSULER\n# Données : ETH[aa:11:bb:22:cc:33->dd:44:ee:55:ff:66]|IP[172.16.0.2->172.16.0.1]|TCP[5000->80]|DATA[PING]\nA_COMPLETER\n\n[Cas 3 — Désencapsulation paquet Syslog UDP]\n# Données : DESENCAPSULER\n# Données : ETH[00:aa:bb:cc:dd:ee->11:22:33:44:55:66]|IP[192.168.0.200->192.168.0.1]|UDP[514->514]|DATA[AUTH_FAIL]\nA_COMPLETER\n\n[Cas 4 — Encapsulation commande SSH]\n# Données : ENCAPSULER\n# Données : ls -la /var/log\n# Données : TCP 60100 22\n# Données : 10.20.30.40 10.20.30.1\n# Données : fa:16:3e:01:02:03 fa:16:3e:aa:bb:cc\nA_COMPLETER\n",
    "hints": [
      "En encapsulation, on descend de L7 vers L2 en ajoutant successivement les métadonnées de transport, réseau puis liaison.",
      "En désencapsulation, chaque couche analyse et retire son propre en-tête avant de passer la charge utile à la couche supérieure."
    ],
    "examples": [
      {
        "stdin": "ENCAPSULER\nGET /api/status\nTCP 49152 443\n10.0.0.5 10.0.0.1\n00:11:22:33:44:55 aa:bb:cc:dd:ee:ff",
        "expected": "[L7 Data] GET /api/status\n[L4 Segment TCP] Port 49152->443 | Payload: GET /api/status\n[L3 Paquet IP] 10.0.0.5->10.0.0.1 | Proto: TCP\n[L2 Trame Eth] 00:11:22:33:44:55->aa:bb:cc:dd:ee:ff | EtherType: 0x0800",
        "note": "Encapsulation complète du message HTTP GET."
      }
    ],
    "tests": [
      {
        "label": "Encapsulation requête UDP DNS",
        "stdin": "cas:1",
        "expected": "[L7 Data] query:example.com\n[L4 Segment UDP] Port 53000->53 | Payload: query:example.com\n[L3 Paquet IP] 192.168.1.50->8.8.8.8 | Proto: UDP\n[L2 Trame Eth] 11:22:33:44:55:66->cc:dd:ee:ff:00:11 | EtherType: 0x0800"
      },
      {
        "label": "Désencapsulation trame Web",
        "stdin": "cas:2",
        "expected": "L2 Decapsule: dd:44:ee:55:ff:66 -> Passe a L3 (EtherType 0x0800)\nL3 Decapsule: 172.16.0.1 -> Passe a L4 (Proto TCP)\nL4 Decapsule: Port 80 -> Delivre a Application (L7)\nL7 Recu: PING"
      },
      {
        "label": "Désencapsulation paquet Syslog UDP",
        "stdin": "cas:3",
        "expected": "L2 Decapsule: 11:22:33:44:55:66 -> Passe a L3 (EtherType 0x0800)\nL3 Decapsule: 192.168.0.1 -> Passe a L4 (Proto UDP)\nL4 Decapsule: Port 514 -> Delivre a Application (L7)\nL7 Recu: AUTH_FAIL"
      },
      {
        "label": "Encapsulation commande SSH",
        "stdin": "cas:4",
        "expected": "[L7 Data] ls -la /var/log\n[L4 Segment TCP] Port 60100->22 | Payload: ls -la /var/log\n[L3 Paquet IP] 10.20.30.40->10.20.30.1 | Proto: TCP\n[L2 Trame Eth] fa:16:3e:01:02:03->fa:16:3e:aa:bb:cc | EtherType: 0x0800"
      }
    ],
    "solution": "[Exemple]\n[L7 Data] GET /api/status\n[L4 Segment TCP] Port 49152->443 | Payload: GET /api/status\n[L3 Paquet IP] 10.0.0.5->10.0.0.1 | Proto: TCP\n[L2 Trame Eth] 00:11:22:33:44:55->aa:bb:cc:dd:ee:ff | EtherType: 0x0800\n\n[Cas 1 — Encapsulation requête UDP DNS]\n[L7 Data] query:example.com\n[L4 Segment UDP] Port 53000->53 | Payload: query:example.com\n[L3 Paquet IP] 192.168.1.50->8.8.8.8 | Proto: UDP\n[L2 Trame Eth] 11:22:33:44:55:66->cc:dd:ee:ff:00:11 | EtherType: 0x0800\n\n[Cas 2 — Désencapsulation trame Web]\nL2 Decapsule: dd:44:ee:55:ff:66 -> Passe a L3 (EtherType 0x0800)\nL3 Decapsule: 172.16.0.1 -> Passe a L4 (Proto TCP)\nL4 Decapsule: Port 80 -> Delivre a Application (L7)\nL7 Recu: PING\n\n[Cas 3 — Désencapsulation paquet Syslog UDP]\nL2 Decapsule: 11:22:33:44:55:66 -> Passe a L3 (EtherType 0x0800)\nL3 Decapsule: 192.168.0.1 -> Passe a L4 (Proto UDP)\nL4 Decapsule: Port 514 -> Delivre a Application (L7)\nL7 Recu: AUTH_FAIL\n\n[Cas 4 — Encapsulation commande SSH]\n[L7 Data] ls -la /var/log\n[L4 Segment TCP] Port 60100->22 | Payload: ls -la /var/log\n[L3 Paquet IP] 10.20.30.40->10.20.30.1 | Proto: TCP\n[L2 Trame Eth] fa:16:3e:01:02:03->fa:16:3e:aa:bb:cc | EtherType: 0x0800"
  },
  {
    "id": "na2-c1-e3",
    "chapter": 1,
    "title": "Simulateur de table et résolution ARP",
    "level": "n3",
    "language": "analyse",
    "goal": "Implémenter la table de correspondance IP vers MAC (cache ARP) avec gestion de requêtes, apprentissage et expiration TTL.",
    "brief": "<p>Le script gère une table ARP initialement vide. Il Analysez les paramètres du problème pour chaque cas. La table apprend immédiatement la correspondance <code>IP_EMETTEUR -> MAC_EMETTEUR</code> avec un TTL de 300s. Si l'IP demandée est connue dans le cache, afficher <code>REPLY: &lt;IP_DEMANDEE&gt; est a &lt;MAC_CONNUE&gt;</code>, sinon afficher <code>BROADCAST: Qui a &lt;IP_DEMANDEE&gt; ?</code>.<br>\n- <code>REPLY &lt;IP_CIBLE&gt; &lt;MAC_CIBLE&gt;</code> : réponse ARP reçue, enregistrée avec TTL de 300s.<br>\n- <code>TICK &lt;SECONDES&gt;</code> : fait avancer le temps de N secondes. Les entrées dont le TTL tombe à 0 ou moins sont purgées.<br>\n- <code>SHOW</code> : Indiquez les entrées du cache triées par IP croissante au format :<br>\n<code>&lt;IP&gt; -> &lt;MAC&gt; (TTL: &lt;ttl&gt;s)</code>. Si vide, Indiquez <code>CACHE VIDE</code>.</p>",
    "starter": "# Grille d'analyse (na2-c1-e3) — Simulateur de table et résolution ARP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Expiration de TTL par TICK]\n# Données : REPLY 10.0.0.1 00:aa:bb:cc:dd:01\n# Données : TICK 250\n# Données : SHOW\n# Données : TICK 60\n# Données : SHOW\nA_COMPLETER\n\n[Cas 2 — Rafraîchissement TTL sur nouvelle annonce]\n# Données : REPLY 172.16.0.5 aa:bb:cc:00:11:22\n# Données : TICK 200\n# Données : REQUEST 172.16.0.1 172.16.0.5 aa:bb:cc:00:11:22\n# Données : SHOW\nA_COMPLETER\n\n[Cas 3 — Résolution immédiate sans broadcast]\n# Données : REPLY 192.168.1.254 00:00:0c:07:ac:01\n# Données : REQUEST 192.168.1.254 192.168.1.50 11:11:11:11:11:11\nA_COMPLETER\n\n[Cas 4 — Tri numérique correct des adresses IP]\n# Données : REPLY 192.168.1.10 00:00:00:00:00:10\n# Données : REPLY 192.168.1.2 00:00:00:00:00:02\n# Données : REPLY 192.168.1.100 00:00:00:00:01:00\n# Données : SHOW\nA_COMPLETER\n",
    "hints": [
      "Toute requête ARP permet à la cible d'apprendre la MAC de l'émetteur (gratuitous ARP / learning).",
      "Le tri par adresse IP s'effectue idéalement sur les 4 entiers numériques du tuple pour éviter l'ordre alphabétique faux (ex: 192.168.1.2 avant 192.168.1.10)."
    ],
    "examples": [
      {
        "stdin": "REQUEST 192.168.1.1 192.168.1.10 00:11:22:33:44:55\nREPLY 192.168.1.1 aa:bb:cc:dd:ee:01\nREQUEST 192.168.1.1 192.168.1.20 00:22:33:44:55:66\nSHOW",
        "expected": "BROADCAST: Qui a 192.168.1.1 ?\nREPLY: 192.168.1.1 est a aa:bb:cc:dd:ee:01\n192.168.1.1 -> aa:bb:cc:dd:ee:01 (TTL: 300s)\n192.168.1.10 -> 00:11:22:33:44:55 (TTL: 300s)\n192.168.1.20 -> 00:22:33:44:55:66 (TTL: 300s)",
        "note": "Apprentissage des émetteurs et réponse au second demandeur."
      }
    ],
    "tests": [
      {
        "label": "Expiration de TTL par TICK",
        "stdin": "cas:1",
        "expected": "10.0.0.1 -> 00:aa:bb:cc:dd:01 (TTL: 50s)\nCACHE VIDE"
      },
      {
        "label": "Rafraîchissement TTL sur nouvelle annonce",
        "stdin": "cas:2",
        "expected": "BROADCAST: Qui a 172.16.0.1 ?\n172.16.0.5 -> aa:bb:cc:00:11:22 (TTL: 300s)"
      },
      {
        "label": "Résolution immédiate sans broadcast",
        "stdin": "cas:3",
        "expected": "REPLY: 192.168.1.254 est a 00:00:0c:07:ac:01"
      },
      {
        "label": "Tri numérique correct des adresses IP",
        "stdin": "cas:4",
        "expected": "192.168.1.2 -> 00:00:00:00:00:02 (TTL: 300s)\n192.168.1.10 -> 00:00:00:00:00:10 (TTL: 300s)\n192.168.1.100 -> 00:00:00:00:01:00 (TTL: 300s)"
      }
    ],
    "solution": "[Exemple]\nBROADCAST: Qui a 192.168.1.1 ?\nREPLY: 192.168.1.1 est a aa:bb:cc:dd:ee:01\n192.168.1.1 -> aa:bb:cc:dd:ee:01 (TTL: 300s)\n192.168.1.10 -> 00:11:22:33:44:55 (TTL: 300s)\n192.168.1.20 -> 00:22:33:44:55:66 (TTL: 300s)\n\n[Cas 1 — Expiration de TTL par TICK]\n10.0.0.1 -> 00:aa:bb:cc:dd:01 (TTL: 50s)\nCACHE VIDE\n\n[Cas 2 — Rafraîchissement TTL sur nouvelle annonce]\nBROADCAST: Qui a 172.16.0.1 ?\n172.16.0.5 -> aa:bb:cc:00:11:22 (TTL: 300s)\n\n[Cas 3 — Résolution immédiate sans broadcast]\nREPLY: 192.168.1.254 est a 00:00:0c:07:ac:01\n\n[Cas 4 — Tri numérique correct des adresses IP]\n192.168.1.2 -> 00:00:00:00:00:02 (TTL: 300s)\n192.168.1.10 -> 00:00:00:00:00:10 (TTL: 300s)\n192.168.1.100 -> 00:00:00:00:01:00 (TTL: 300s)"
  }
];
