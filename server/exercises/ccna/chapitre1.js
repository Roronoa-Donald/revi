'use strict';

module.exports = [
  {
    "id": "na2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La capture Wireshark du poste de comptabilité",
    "exampleTitle": "Exemple résolu — la capture de l'imprimimerie CopyPrint",
    "goal": "Lire une trame Ethernet II : classer l'adressage MAC, identifier le protocole par l'EtherType et calculer la taille totale.",
    "brief": "<p><strong>Énoncé.</strong> La menuiserie AluPlus, 45 salariés, occupe un atelier et un étage administratif reliés par le même réseau local <code>192.168.8.0/24</code>. Le serveur de fichiers, à l'adresse <code>192.168.8.60</code> (MAC <code>00:1b:44:66:77:88</code>), est installé à l'étage. Le poste de la comptable (<code>192.168.8.12</code>, MAC <code>00:1b:44:11:22:33</code>) vient d'être réimageré. Pour vérifier qu'il dialogue correctement, l'administrateur y installe Wireshark et capture les quatre premières trames sortant du poste :</p><table><tr><th>#</th><th>Description</th><th>MAC destination</th><th>MAC source</th><th>EtherType</th><th>Payload (octets)</th></tr><tr><th>1</th><td>Requête de résolution d'adresse</td><td>ff:ff:ff:ff:ff:ff</td><td>00:1b:44:11:22:33</td><td>0x0806</td><td>28</td></tr><tr><th>2</th><td>Réponse du serveur de fichiers</td><td>00:1b:44:11:22:33</td><td>00:1b:44:66:77:88</td><td>0x0806</td><td>28</td></tr><tr><th>3</th><td>Transfert du fichier de paie</td><td>00:1b:44:66:77:88</td><td>00:1b:44:11:22:33</td><td>0x0800</td><td>64</td></tr><tr><th>4</th><td>Flux de supervision</td><td>01:00:5e:00:00:0d</td><td>00:1b:44:11:22:33</td><td>0x0800</td><td>80</td></tr></table><p>Rappels du cours : l'en-tête Ethernet II fait 14 octets (6 + 6 + 2) ; <code>0x0800</code> désigne IPv4, <code>0x0806</code> désigne ARP et <code>0x86DD</code> désigne IPv6. La taille totale d'une trame s'obtient en ajoutant les 14 octets d'en-tête au payload. Répondez par le mot ou le nombre exact.</p><ol><li>Quel type d'adressage la MAC destination de la trame 1 représente-t-elle : unicast, multicast ou diffusion ?</li><li>Quel protocole les trames 1 et 2 mettent-elles en œuvre ?</li><li>Quel protocole de niveau 3 est encapsulé dans la trame 3 ?</li><li>Quelle est la taille totale de la trame 3, en-tête Ethernet de 14 octets inclus ?</li><li>La trame 4 est-elle unicast ou multicast ?</li></ol>",
    "starter": "# Exercice — La capture Wireshark du poste de comptabilité\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot ou le nombre exact attendu.\n\n[Question 1 — Type d'adressage de la trame 1]\nA_COMPLETER\n\n[Question 2 — Protocole des trames 1 et 2]\nA_COMPLETER\n\n[Question 3 — Protocole de niveau 3 de la trame 3]\nA_COMPLETER\n\n[Question 4 — Taille totale de la trame 3 (en octets)]\nA_COMPLETER\n\n[Question 5 — Type d'adressage de la trame 4]\nA_COMPLETER\n",
    "hints": [
      "Dans une trame Ethernet II, les 6 premiers octets sont la MAC destination, les 6 suivants la MAC source, puis l'EtherType sur 2 octets : la lecture se fait toujours dans cet ordre.",
      "ff:ff:ff:ff:ff:ff (tous les bits à 1) est la diffusion ; les préfixes 01:00:5e:... et 33:33:... sont réservés au multicast ; toute autre MAC est unicast.",
      "EtherType : 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6. Taille totale = payload + 14 octets : pour la trame 3, 64 + 14 = 78 octets."
    ],
    "examples": [
      {
        "stdin": "L'imprimimerie CopyPrint surveille son réseau 192.168.4.0/24. Trois trames sortent du poste de facturation (192.168.4.21) : une requête de résolution vers ff:ff:ff:ff:ff:ff (EtherType 0x0806, payload 28), puis la réponse du serveur de devis en unicast (0x0800, payload 120), enfin une annonce IPv6 vers 33:33:00:00:00:01 (0x86dd, payload 64).\n\n1) La requête part en diffusion (broadcast) : le poste ignore encore la MAC du serveur. Taille : 28 + 14 = 42 octets.\n2) La réponse est un unicast IPv4 : 120 + 14 = 134 octets.\n3) L'annonce vers 33:33:00:00:00:01 est un multicast IPv6 : 64 + 14 = 78 octets.",
        "expected": "trame 1 : broadcast ARP, 42 octets — trame 2 : unicast IPv4, 134 octets — trame 3 : multicast IPv6, 78 octets",
        "note": "Le bit I/G du premier octet tranche : 01:00:5e et 33:33 sont des préfixes multicast, ff:ff:ff:ff:ff:ff est la diffusion, le reste est unicast."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type d'adressage de la trame 1",
        "stdin": "q:1",
        "expected": "broadcast||diffusion||la diffusion||broadcast (diffusion)||la diffusion (broadcast)"
      },
      {
        "label": "Question 2 — Protocole des trames 1 et 2",
        "stdin": "q:2",
        "expected": "ARP||le protocole ARP||protocole ARP"
      },
      {
        "label": "Question 3 — Protocole de niveau 3 de la trame 3",
        "stdin": "q:3",
        "expected": "IPv4||l'IPv4||ipv4||le protocole IPv4"
      },
      {
        "label": "Question 4 — Taille totale de la trame 3",
        "stdin": "q:4",
        "expected": "78||78 octets"
      },
      {
        "label": "Question 5 — Type d'adressage de la trame 4",
        "stdin": "q:5",
        "expected": "multicast||du multicast||multicast (diffusion groupée)"
      }
    ],
    "solution": "[Question 1 — Type d'adressage de la trame 1]\nbroadcast\n\n[Question 2 — Protocole des trames 1 et 2]\nARP\n\n[Question 3 — Protocole de niveau 3 de la trame 3]\nIPv4\n\n[Question 4 — Taille totale de la trame 3 (en octets)]\n78\n\n[Question 5 — Type d'adressage de la trame 4]\nmulticast",
    "takeaway": "1) La trame 1 vise ff:ff:ff:ff:ff:ff, les 48 bits à 1 : c'est la diffusion (broadcast), seule façon de joindre tout le segment quand la MAC du destinataire est inconnue.\n2) L'EtherType 0x0806 des trames 1 et 2 désigne ARP : résolution puis réponse d'adresse.\n3) La trame 3 porte l'EtherType 0x0800 : le protocole de niveau 3 encapsulé est IPv4.\n4) Taille de la trame 3 : payload 64 + en-tête 14 = 78 octets.\n5) La MAC 01:00:5e:00:00:0d commence par 01:00:5e, préfixe multicast IPv4 : la trame 4 est un multicast.\nContrôle : les deux trames ARP font 28 + 14 = 42 octets, valeur exacte d'une trame ARP minimale sur Ethernet."
  },
  {
    "id": "na2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "L'encapsulation de la session SSH du technicien",
    "exampleTitle": "Exemple résolu — la requête DNS du lycée Carnot",
    "goal": "Suivre une commande d'administration dans la pile TCP/IP et nommer la PDU construite à chaque couche.",
    "brief": "<p><strong>Énoncé.</strong> L'agence de voyages VelaTravel administre son unique routeur depuis le siège. Le réseau local est <code>192.168.20.0/24</code> : le poste de la technicienne réseau est <code>192.168.20.10</code> (MAC <code>00:2c:54:0a:0b:10</code>), le routeur est <code>192.168.20.254</code> (MAC <code>00:2c:54:0a:0b:fe</code>). Depuis son poste, elle ouvre une session SSH d'administration vers le routeur et envoie la commande <code>show ip interface brief</code>. On relève, couche par couche, ce que la pile construit :</p><table><tr><th>Couche</th><th>Contenu ajouté</th></tr><tr><th>7 — Application</th><td>Donnée : « show ip interface brief »</td></tr><tr><th>4 — Transport</th><td>TCP, port source 51234, port destination 22</td></tr><tr><th>3 — Réseau</th><td>IP source 192.168.20.10, IP destination 192.168.20.254</td></tr><tr><th>2 — Liaison</th><td>MAC source 00:2c:54:0a:0b:10, MAC destination 00:2c:54:0a:0b:fe</td></tr></table><p>Répondez par le mot ou le nombre exact attendu.</p><ol><li>Quel protocole de transport SSH utilise-t-il ?</li><li>Quel est le port destination du segment ?</li><li>Quel est le port source du segment ?</li><li>Comment se nomme la PDU construite à la couche 4 ?</li><li>Comment se nomme la PDU construite à la couche 3 ?</li><li>Comment se nomme la PDU construite à la couche 2 ?</li></ol>",
    "starter": "# Exercice — L'encapsulation de la session SSH du technicien\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot ou le nombre exact attendu.\n\n[Question 1 — Protocole de transport utilisé par SSH]\nA_COMPLETER\n\n[Question 2 — Port destination]\nA_COMPLETER\n\n[Question 3 — Port source]\nA_COMPLETER\n\n[Question 4 — Nom de la PDU de la couche 4]\nA_COMPLETER\n\n[Question 5 — Nom de la PDU de la couche 3]\nA_COMPLETER\n\n[Question 6 — Nom de la PDU de la couche 2]\nA_COMPLETER\n",
    "hints": [
      "SSH est une application interactive fiable : elle s'appuie sur le protocole de transport orienté connexion de la pile TCP/IP.",
      "Les ports se lisent dans le tableau de l'énoncé : le port destination est celui du service joint, le port source celui choisi par l'émetteur dans la plage éphémère.",
      "En descendant la pile, la PDU change de nom : donnée (couche 7), segment (couche 4), paquet (couche 3), trame (couche 2)."
    ],
    "examples": [
      {
        "stdin": "Au lycée Carnot, un poste de documentation (10.20.0.15) interroge le serveur DNS du lycée (10.20.0.1) en émettant la requête « RESOLV www.onisep.fr ». La résolution passe par UDP, port source 49152, port destination 53.\n\n1) Protocole de transport : UDP.\n2) Port destination : 53.\n3) Port source : 49152.\n4) PDU de la couche 4 : le segment (datagramme UDP).\n5) PDU de la couche 3 : le paquet IP (10.20.0.15 vers 10.20.0.1).\n6) PDU de la couche 2 : la trame Ethernet vers la MAC du serveur DNS.",
        "expected": "UDP — port destination 53 — port source 49152 — segment — paquet — trame",
        "note": "DNS en UDP reste léger : pas de connexion préalable, un seul échange requête/réponse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Protocole de transport utilisé par SSH",
        "stdin": "q:1",
        "expected": "TCP||le protocole TCP||le tcp"
      },
      {
        "label": "Question 2 — Port destination",
        "stdin": "q:2",
        "expected": "22||le port 22"
      },
      {
        "label": "Question 3 — Port source",
        "stdin": "q:3",
        "expected": "51234||le port 51234"
      },
      {
        "label": "Question 4 — Nom de la PDU de la couche 4",
        "stdin": "q:4",
        "expected": "un segment||segment||le segment||un segment TCP||le segment TCP"
      },
      {
        "label": "Question 5 — Nom de la PDU de la couche 3",
        "stdin": "q:5",
        "expected": "un paquet||paquet||le paquet||un paquet IP||le paquet IP"
      },
      {
        "label": "Question 6 — Nom de la PDU de la couche 2",
        "stdin": "q:6",
        "expected": "une trame||trame||la trame||la trame Ethernet||une trame Ethernet"
      }
    ],
    "solution": "[Question 1 — Protocole de transport utilisé par SSH]\nTCP\n\n[Question 2 — Port destination]\n22\n\n[Question 3 — Port source]\n51234\n\n[Question 4 — Nom de la PDU de la couche 4]\nun segment\n\n[Question 5 — Nom de la PDU de la couche 3]\nun paquet\n\n[Question 6 — Nom de la PDU de la couche 2]\nune trame",
    "takeaway": "1) SSH exige une livraison fiable et ordonnée : il utilise TCP.\n2) Le port destination du segment est 22, port bien connu de SSH.\n3) Le port source est 51234, choisi par le poste émetteur dans la plage éphémère.\n4) À la couche 4, la PDU de TCP est le segment.\n5) À la couche 3, la PDU est le paquet (IP source 192.168.20.10, IP destination 192.168.20.254).\n6) À la couche 2, la PDU est la trame Ethernet (MAC du poste vers MAC du routeur).\nContrôle : le récepteur répond en inversant les rôles — port destination 51234, port source 22 — et les PDU remontent la pile par désencapsulation."
  },
  {
    "id": "na2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Le diagnostic ARP du lundi matin chez BatiPlus",
    "exampleTitle": "Exemple résolu — le terminal du garage MécaSwift",
    "goal": "Interpréter une séquence ARP réelle : diffusion, réponse unicast, mise en cache et économie de requêtes.",
    "brief": "<p><strong>Énoncé.</strong> BatiPlus, entreprise de construction de 60 salariés, a installé vendredi le poste de la dessinatrice principale (<code>192.168.15.50</code>, MAC <code>a4:bb:6d:12:34:56</code>) sur le réseau <code>192.168.15.0/24</code>. Lundi à 8 heures, le cache ARP du poste est vide. L'administrateur observe avec un analyseur les événements suivants :</p><table><tr><th>Heure</th><th>Événement observé sur le segment</th></tr><tr><th>08:01</th><td>Le poste émet en diffusion : « Qui a 192.168.15.60 ? Répondez à a4:bb:6d:12:34:56 »</td></tr><tr><th>08:01</th><td>Le serveur de fichiers (192.168.15.60) répond en unicast : « 192.168.15.60 est à 00:50:56:aa:bb:cc »</td></tr><tr><th>08:02</th><td>Le poste transmet le plan directement au serveur, en unicast</td></tr><tr><th>08:05</th><td>Le poste émet en diffusion : « Qui a 192.168.15.1 ? Répondez à a4:bb:6d:12:34:56 »</td></tr><tr><th>08:06</th><td>La passerelle (192.168.15.1) répond en unicast : « 192.168.15.1 est à 00:1c:57:dd:00:01 »</td></tr></table><p>À 08:10, le poste joint pour la première fois l'imprimante 3D (<code>192.168.15.99</code>), jamais contactée depuis son démarrage. À 08:12, il relance le même transfert vers le serveur de fichiers. Répondez par le mot, l'adresse ou le nombre exact attendu.</p><ol><li>Quelle est l'adresse MAC destination des requêtes de 08:01 et de 08:05 ?</li><li>Sous quelle forme le serveur de fichiers répond-il : unicast ou diffusion ?</li><li>Quelle adresse MAC le poste enregistre-t-il dans son cache pour 192.168.15.60 ?</li><li>Combien de requêtes ARP en diffusion le poste a-t-il émises entre 08:01 et 08:06 ?</li><li>Entre 08:10 et 08:12, combien de nouvelles requêtes ARP sont-elles nécessaires ?</li><li>Quelle est la durée de vie typique d'une entrée du cache ARP, en secondes ?</li></ol>",
    "starter": "# Exercice — Le diagnostic ARP du lundi matin chez BatiPlus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot, l'adresse ou le nombre exact attendu.\n\n[Question 1 — MAC destination des requêtes en diffusion]\nA_COMPLETER\n\n[Question 2 — Forme de la réponse du serveur]\nA_COMPLETER\n\n[Question 3 — MAC enregistrée pour 192.168.15.60]\nA_COMPLETER\n\n[Question 4 — Nombre de requêtes diffusées entre 08:01 et 08:06]\nA_COMPLETER\n\n[Question 5 — Nouvelles requêtes entre 08:10 et 08:12]\nA_COMPLETER\n\n[Question 6 — Durée de vie typique d'une entrée ARP (en secondes)]\nA_COMPLETER\n",
    "hints": [
      "Une requête ARP part toujours en diffusion car l'émetteur ignore l'adresse MAC du détenteur de l'IP ; seule la réponse revient en unicast.",
      "Le poste qui a appris une correspondance la conserve dans son cache pendant toute la durée de vie de l'entrée : pas de nouvelle requête tant qu'elle est valide.",
      "À 08:10 l'imprimante n'a jamais été résolue (une requête), mais à 08:12 le serveur est encore en cache depuis 08:01 : la TTL de 300 secondes n'est pas écoulée."
    ],
    "examples": [
      {
        "stdin": "Au garage MécaSwift (172.16.9.0/24), le terminal de réception (172.16.9.30) vient de démarrer, cache ARP vide.\n1) Il ping le serveur d'atelier 172.16.9.5 : requête ARP en diffusion (« Qui a 172.16.9.5 ? »).\n2) Le serveur répond en unicast ; le terminal met l'entrée en cache pour 300 secondes.\n3) Il ping ensuite la passerelle 172.16.9.1 : nouvelle requête en diffusion, puis réponse unicast.\n4) À 08:30, il repinge le serveur d'atelier : aucune requête émise, l'entrée est encore valide (moins de 300 s depuis 08:01).\n\nBilan : 2 requêtes en diffusion, réponses en unicast, TTL de 300 s.",
        "expected": "2 requêtes en diffusion — réponses en unicast — entrée mise en cache 300 s",
        "note": "Chaque réponse unicast enrichit le cache de l'émetteur de la requête ; c'est ce cache qui évite les requêtes suivantes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — MAC destination des requêtes en diffusion",
        "stdin": "q:1",
        "expected": "ff:ff:ff:ff:ff:ff||FF:FF:FF:FF:FF:FF"
      },
      {
        "label": "Question 2 — Forme de la réponse du serveur",
        "stdin": "q:2",
        "expected": "unicast||en unicast||l'unicast"
      },
      {
        "label": "Question 3 — MAC enregistrée pour 192.168.15.60",
        "stdin": "q:3",
        "expected": "00:50:56:aa:bb:cc"
      },
      {
        "label": "Question 4 — Nombre de requêtes diffusées entre 08:01 et 08:06",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Nouvelles requêtes entre 08:10 et 08:12",
        "stdin": "q:5",
        "expected": "1||une||une seule"
      },
      {
        "label": "Question 6 — Durée de vie typique d'une entrée ARP",
        "stdin": "q:6",
        "expected": "300||300 secondes"
      }
    ],
    "solution": "[Question 1 — MAC destination des requêtes en diffusion]\nff:ff:ff:ff:ff:ff\n\n[Question 2 — Forme de la réponse du serveur]\nunicast\n\n[Question 3 — MAC enregistrée pour 192.168.15.60]\n00:50:56:aa:bb:cc\n\n[Question 4 — Nombre de requêtes diffusées entre 08:01 et 08:06]\n2\n\n[Question 5 — Nouvelles requêtes entre 08:10 et 08:12]\n1\n\n[Question 6 — Durée de vie typique d'une entrée ARP (en secondes)]\n300",
    "takeaway": "1) Une requête ARP est envoyée en diffusion : la MAC destination est ff:ff:ff:ff:ff:ff.\n2) Seul le détenteur de l'IP répond, directement à l'émetteur : la réponse est unicast.\n3) La réponse du serveur annonce « 192.168.15.60 est à 00:50:56:aa:bb:cc » : c'est cette MAC qui est mise en cache.\n4) Entre 08:01 et 08:06, le poste a émis deux requêtes : une pour le serveur (192.168.15.60), une pour la passerelle (192.168.15.1).\n5) À 08:10 l'imprimante 192.168.15.99 n'a jamais été résolue : une requête. À 08:12 le serveur est en cache depuis 08:01 (11 minutes < 300 s) : aucune requête. Total : 1 nouvelle requête.\n6) Une entrée ARP vit typiquement 300 secondes avant expiration.\nContrôle : à 08:12, 11 minutes se sont écoulées depuis 08:01, en deçà de la TTL de 300 s : le transfert vers le serveur part directement en unicast."
  }
];
