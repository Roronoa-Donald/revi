'use strict';

module.exports = [
  {
    "id": "na2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le plan VLAN du bâtiment administratif de Val-de-Loire",
    "exampleTitle": "Exemple résolu — le plan VLAN du musée du Sel",
    "goal": "Lire un plan de VLANs et de ports : appartenance, domaines de diffusion et balise 802.1Q.",
    "brief": "<p><strong>Énoncé.</strong> La communauté de communes Val-de-Loire regroupe ses services dans un bâtiment administratif desservi par un commutateur Cisco Catalyst. Le plan de VLANs validé en réunion est le suivant :</p><table><tr><th>VLAN</th><th>Nom</th><th>Ports</th></tr><tr><th>10</th><td>Administration</td><td>Fa0/1 à Fa0/8</td></tr><tr><th>20</th><td>Comptabilité</td><td>Fa0/9 à Fa0/14</td></tr><tr><th>30</th><td>Invités (Wi-Fi)</td><td>Fa0/15 à Fa0/20</td></tr><tr><th>99</th><td>Management (natif)</td><td>Gi0/1 et Gi0/2 (trunks)</td></tr></table><p>Rappel du cours : un port d'accès appartient à un seul VLAN et émet des trames non balisées ; sur un trunk, la balise 802.1Q fait 4 octets ; chaque VLAN forme son propre domaine de diffusion. Répondez par le mot, le nombre ou le VLAN exact.</p><ol><li>À quel VLAN le port Fa0/10 appartient-il ?</li><li>Un port d'accès ajoute-t-il une balise 802.1Q aux trames qu'il envoie au poste raccordé ?</li><li>Combien de domaines de diffusion ce plan crée-t-il ?</li><li>Un poste branché sur Fa0/2 peut-il joindre, en couche 2, un poste branché sur Fa0/12 ?</li><li>Quelle est la taille, en octets, de la balise 802.1Q insérée sur le trunk ?</li></ol>",
    "starter": "# Exercice — Le plan VLAN du bâtiment administratif de Val-de-Loire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot, le nombre ou le VLAN exact.\n\n[Question 1 — VLAN du port Fa0/10]\nA_COMPLETER\n\n[Question 2 — Balise sur un port d'accès]\nA_COMPLETER\n\n[Question 3 — Domaines de diffusion créés]\nA_COMPLETER\n\n[Question 4 — Communication L2 entre Fa0/2 et Fa0/12]\nA_COMPLETER\n\n[Question 5 — Taille de la balise 802.1Q]\nA_COMPLETER\n",
    "hints": [
      "Lisez le plan ligne par ligne : Fa0/10 tombe dans la plage Fa0/9 à Fa0/14, affectée à la comptabilité.",
      "Le port d'accès dessert un équipement terminal : ses trames partent en clair, sans balise ; seul le trunk balise.",
      "Chaque VLAN du plan isole son propre domaine de diffusion ; deux VLANs différents ne communiquent jamais en couche 2, et la balise du trunk pèse 4 octets (TPID + PCP/DEI + VID)."
    ],
    "examples": [
      {
        "stdin": "Le musée du Sel déploie son commutateur avec le plan suivant : VLAN 40 (billetterie, Fa0/1 à Fa0/12), VLAN 50 (Wi-Fi des visiteurs, Fa0/13 à Fa0/24), VLAN 60 (réserve comptable, Fa0/25 à Fa0/30), VLAN 99 (natif, trunks Gi0/1-Gi0/2).\n\n1) Fa0/5 appartient au VLAN 40 (billetterie).\n2) Les ports d'accès émettent des trames non balisées.\n3) Le plan crée 4 domaines de diffusion.\n4) Un poste de la billetterie ne joint pas en couche 2 un poste de la réserve (Fa0/25, VLAN 60).\n5) La balise 802.1Q insérée sur le trunk fait 4 octets.",
        "expected": "Fa0/5 : VLAN 40 — accès non balisé — 4 domaines — pas de L2 entre VLANs — balise 4 octets",
        "note": "Un VLAN = un domaine de diffusion ; la balise ne circule que sur les liens trunk."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — VLAN du port Fa0/10",
        "stdin": "q:1",
        "expected": "VLAN 20||le VLAN 20||20||le VLAN 20 (Comptabilité)"
      },
      {
        "label": "Question 2 — Balise sur un port d'accès",
        "stdin": "q:2",
        "expected": "non||non, les trames partent non balisées||non, jamais balisée"
      },
      {
        "label": "Question 3 — Domaines de diffusion créés",
        "stdin": "q:3",
        "expected": "4||quatre"
      },
      {
        "label": "Question 4 — Communication L2 entre Fa0/2 et Fa0/12",
        "stdin": "q:4",
        "expected": "non||non, pas en couche 2||impossible en couche 2"
      },
      {
        "label": "Question 5 — Taille de la balise 802.1Q",
        "stdin": "q:5",
        "expected": "4||4 octets||quatre octets"
      }
    ],
    "solution": "[Question 1 — VLAN du port Fa0/10]\nVLAN 20\n\n[Question 2 — Balise sur un port d'accès]\nnon\n\n[Question 3 — Domaines de diffusion créés]\n4\n\n[Question 4 — Communication L2 entre Fa0/2 et Fa0/12]\nnon\n\n[Question 5 — Taille de la balise 802.1Q]\n4",
    "takeaway": "1) Fa0/10 est dans la plage Fa0/9 à Fa0/14 : le VLAN 20 (Comptabilité).\n2) Non : un port d'accès émet des trames non balisées — la balise n'apparaît que sur les trunks.\n3) Quatre VLANs (10, 20, 30, 99) : quatre domaines de diffusion distincts.\n4) Non : Fa0/2 est en VLAN 10 et Fa0/12 en VLAN 20 — deux VLANs ne communiquent jamais en couche 2, il faudrait un routeur.\n5) La balise 802.1Q pèse 4 octets (TPID 0x8100 sur 2 octets, puis PCP/DEI et VID sur 2 octets).\nContrôle : le nombre de domaines de diffusion égale le nombre de VLANs actifs du plan ; aucune balise ne quitte jamais un port d'accès."
  },
  {
    "id": "na2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le router-on-a-stick de la PME Novatek",
    "exampleTitle": "Exemple résolu — le ROAS du club Arcadia Sports",
    "goal": "Exploiter une configuration ROAS réelle : passerelles, sous-interfaces, VID sur le trunk et routage inter-VLAN.",
    "brief": "<p><strong>Énoncé.</strong> Novatek, PME de 90 salariés, cloisonne son bâtiment en trois VLANs et route l'inter-VLAN avec la méthode router-on-a-stick. Le commutateur et le routeur sont configurés ainsi :</p><pre>! --- Commutateur\ninterface Gi0/24\n switchport mode trunk\n switchport trunk allowed vlan 10,20,30\n switchport trunk native vlan 99\n!\n! --- Routeur\ninterface Gi0/0\n no shutdown\ninterface Gi0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.254 255.255.255.0\ninterface Gi0/0.20\n encapsulation dot1Q 20\n ip address 192.168.20.254 255.255.255.0\ninterface Gi0/0.30\n encapsulation dot1Q 30\n ip address 192.168.30.254 255.255.255.0</pre><p>Le poste du service technique (<code>192.168.10.7</code>, VLAN 10) doit joindre le serveur d'intranet (<code>192.168.30.9</code>, VLAN 30). Répondez par l'adresse, la commande ou le nombre exact.</p><ol><li>Quelle est la passerelle par défaut à paramétrer sur les hôtes du VLAN 10 ?</li><li>Quelle commande, sur la sous-interface, l'associe-t-elle au VLAN 20 ?</li><li>Combien de câbles physiques relient le routeur au commutateur ?</li><li>Quel équipement achemine le paquet du poste technique vers le serveur d'intranet ?</li><li>Quelle VID porte la trame sur le trunk, à l'aller, du commutateur vers le routeur ?</li></ol>",
    "starter": "# Exercice — Le router-on-a-stick de la PME Novatek\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par l'adresse, la commande ou le nombre exact, sans commentaire.\n\n[Question 1 — Passerelle des hôtes du VLAN 10]\nA_COMPLETER\n\n[Question 2 — Commande associant la sous-interface au VLAN 20]\nA_COMPLETER\n\n[Question 3 — Câbles physiques entre routeur et commutateur]\nA_COMPLETER\n\n[Question 4 — Équipement acheminant l'inter-VLAN]\nA_COMPLETER\n\n[Question 5 — VID portée par la trame sur le trunk à l'aller]\nA_COMPLETER\n",
    "hints": [
      "Dans un ROAS, la passerelle d'un VLAN est l'adresse IP de la sous-interface qui porte ce VLAN : lisez les ip address de chaque sous-interface.",
      "encapsulation dot1Q <vid> marque la sous-interface : le nombre qui suit est le VLAN servi.",
      "Un seul câble physique porte les trois VLANs balisés ; c'est le routeur qui route entre eux, et la trame de l'aller part du commutateur avec la VID du VLAN d'origine."
    ],
    "examples": [
      {
        "stdin": "Le club Arcadia Sports route trois VLANs en ROAS : sous-interfaces Gi0/0.110 (encapsulation dot1Q 110, ip 10.40.110.254/24), Gi0/0.120 (dot1Q 120, 10.40.120.254/24), Gi0/0.130 (dot1Q 130, 10.40.130.254/24).\n\n1) La passerelle du VLAN 110 est 10.40.110.254.\n2) La sous-interface du VLAN 120 est associée par encapsulation dot1Q 120.\n3) Un seul câble relie le routeur au commutateur.\n4) Le routeur achemine les paquets du VLAN 110 vers le VLAN 130.\n5) À l'aller, la trame porte la VID 110 sur le trunk.",
        "expected": "passerelle 10.40.110.254 — dot1Q 120 — un câble — routeur inter-VLAN — VID 110",
        "note": "Chaque sous-interface joue le rôle de passerelle d'un VLAN ; le trunk unique porte les trois VID."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Passerelle des hôtes du VLAN 10",
        "stdin": "q:1",
        "expected": "192.168.10.254||la passerelle 192.168.10.254"
      },
      {
        "label": "Question 2 — Commande associant la sous-interface au VLAN 20",
        "stdin": "q:2",
        "expected": "encapsulation dot1Q 20||encapsulation dot1q 20"
      },
      {
        "label": "Question 3 — Câbles physiques entre routeur et commutateur",
        "stdin": "q:3",
        "expected": "1||un||un seul"
      },
      {
        "label": "Question 4 — Équipement acheminant l'inter-VLAN",
        "stdin": "q:4",
        "expected": "le routeur||R1||le routeur R1||le routeur (R1)"
      },
      {
        "label": "Question 5 — VID portée par la trame sur le trunk à l'aller",
        "stdin": "q:5",
        "expected": "10||VID 10||la VID 10"
      }
    ],
    "solution": "[Question 1 — Passerelle des hôtes du VLAN 10]\n192.168.10.254\n\n[Question 2 — Commande associant la sous-interface au VLAN 20]\nencapsulation dot1Q 20\n\n[Question 3 — Câbles physiques entre routeur et commutateur]\n1\n\n[Question 4 — Équipement acheminant l'inter-VLAN]\nle routeur\n\n[Question 5 — VID portée par la trame sur le trunk à l'aller]\n10",
    "takeaway": "1) La sous-interface Gi0/0.10 porte 192.168.10.254 : c'est la passerelle des hôtes du VLAN 10.\n2) Sur Gi0/0.20, l'association au VLAN 20 se fait par encapsulation dot1Q 20.\n3) Un seul câble physique relie le routeur au commutateur : c'est le principe même du ROAS.\n4) Le poste (VLAN 10) et le serveur (VLAN 30) étant sur des VLANs différents, seul le routeur peut router le paquet entre eux.\n5) À l'aller, la trame quitte le commutateur sur le trunk avec la balise VID 10 — celle du VLAN d'origine ; le routeur la renverra balisée VID 30 vers le serveur.\nContrôle : aller et retour empruntent deux sous-interfaces distinctes (Gi0/0.10 puis Gi0/0.30), sur le même câble physique."
  },
  {
    "id": "na2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le trunk dysfonctionnel de l'hôtel BeauRivage",
    "exampleTitle": "Exemple résolu — le trunk du musée des Marées",
    "goal": "Diagnostiquer un trunk 802.1Q : VLANs autorisés, VLAN natif et risque de mismatch.",
    "brief": "<p><strong>Énoncé.</strong> L'hôtel BeauRivage, 120 chambres, vient de remplacer son commutateur d'étage. Depuis, la vidéosurveillance ne remonte plus. Les deux commutateurs sont reliés par le trunk <code>Gi0/2</code>. Voici la configuration exacte des deux extrémités :</p><table><tr><th></th><th>SW-RECEPTION (ancien châssis)</th><th>SW-ETAGE (nouveau châssis)</th></tr><tr><th>Mode</th><td>trunk</td><td>trunk</td></tr><tr><th>VLAN natif</th><td>1</td><td>1</td></tr><tr><th>VLANs autorisés</th><td>10, 20, 30</td><td>10, 20, 40</td></tr></table><p>Les VLANs en service à l'hôtel : 10 (réception), 20 (chambres), 30 (comptabilité), 40 (vidéosurveillance). Rappel du cours : un trunk ne transporte que les VLANs autorisés des deux côtés ; le VLAN natif circule sans balise et doit être identique aux deux extrémités. Répondez par le mot, le VLAN ou le nombre exact.</p><ol><li>Quel VLAN n'est autorisé que sur l'extrémité SW-ETAGE ?</li><li>Les trames du VLAN natif 1 circulent-elles balisées sur ce trunk ?</li><li>Le VLAN 30 n'est autorisé que sur l'extrémité SW-RECEPTION : son flux traverse-t-il le trunk ?</li><li>Une caméra du VLAN 40 côté SW-ETAGE peut-elle faire franchir le trunk à son flux ?</li><li>Si SW-RECEPTION passait seul son VLAN natif à 99, quel nom porte l'anomalie créée ?</li></ol>",
    "starter": "# Exercice — Le trunk dysfonctionnel de l'hôtel BeauRivage\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot, le VLAN ou le nombre exact.\n\n[Question 1 — VLAN autorisé seulement côté SW-ETAGE]\nA_COMPLETER\n\n[Question 2 — Balisage du VLAN natif]\nA_COMPLETER\n\n[Question 3 — Le flux du VLAN 30 traverse-t-il le trunk]\nA_COMPLETER\n\n[Question 4 — Flux de la caméra du VLAN 40]\nA_COMPLETER\n\n[Question 5 — Anomalie si un seul côté passe le natif à 99]\nA_COMPLETER\n",
    "hints": [
      "Comparez les listes autorisées colonne par colonne : un VLAN ne traverse que s'il figure des deux côtés.",
      "Le VLAN 40 n'apparaît que côté SW-ETAGE ; le VLAN 30 n'apparaît que côté SW-RECEPTION.",
      "Le VLAN natif part toujours sans balise : si les deux extrémités divergent, le trafic d'un VLAN fuit dans l'autre — l'anomalie porte un nom dédié dans le cours."
    ],
    "examples": [
      {
        "stdin": "Le musée des Marées relie deux commutateurs : SW-A (native vlan 99, allowed 10,20) et SW-B (native vlan 99, allowed 10,20,30).\n\n1) Le VLAN 30 n'est autorisé que côté SW-B : son flux ne traverse pas le trunk.\n2) Les VLANs 10 et 20, autorisés des deux côtés, passent normalement.\n3) Le VLAN natif 99, identique aux deux extrémités, circule sans balise.\n4) Si SW-B passait seul son natif à 1, un désaccord de VLAN natif apparaîtrait : alertes CDP, fuite de VLAN, boucles STP possibles.",
        "expected": "VLAN 30 bloqué — 10 et 20 passent — natif non balisé — changement unilatéral : désaccord de VLAN natif",
        "note": "Un trunk se durcit en deux temps : aligner les VLANs autorisés, puis déplacer le VLAN natif sur les deux extrémités d'un coup."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — VLAN autorisé seulement côté SW-ETAGE",
        "stdin": "q:1",
        "expected": "le VLAN 40||VLAN 40||40||le VLAN 40 (vidéosurveillance)"
      },
      {
        "label": "Question 2 — Balisage du VLAN natif",
        "stdin": "q:2",
        "expected": "non||non, sans balise||non, elles circulent non balisées"
      },
      {
        "label": "Question 3 — Le flux du VLAN 30 traverse-t-il le trunk",
        "stdin": "q:3",
        "expected": "non||non, il ne traverse pas||non, le VLAN 30 n'est pas autorisé côté SW-ETAGE"
      },
      {
        "label": "Question 4 — Flux de la caméra du VLAN 40",
        "stdin": "q:4",
        "expected": "non||non, il ne traverse pas||non, le VLAN 40 n'est pas autorisé côté SW-RECEPTION"
      },
      {
        "label": "Question 5 — Anomalie si un seul côté passe le natif à 99",
        "stdin": "q:5",
        "expected": "un désaccord de VLAN natif||désaccord de VLAN natif||native vlan mismatch||un native vlan mismatch||un mismatch de VLAN natif"
      }
    ],
    "solution": "[Question 1 — VLAN autorisé seulement côté SW-ETAGE]\nle VLAN 40\n\n[Question 2 — Balisage du VLAN natif]\nnon\n\n[Question 3 — Le flux du VLAN 30 traverse-t-il le trunk]\nnon\n\n[Question 4 — Flux de la caméra du VLAN 40]\nnon\n\n[Question 5 — Anomalie si un seul côté passe le natif à 99]\nun désaccord de VLAN natif",
    "takeaway": "1) Le VLAN 40 figure dans les autorisés de SW-ETAGE uniquement : la vidéosurveillance est l'unique VLAN autorisé sur une seule extrémité.\n2) Non : le VLAN natif circule toujours sans balise — c'est sa définition même sur un trunk 802.1Q.\n3) Oui : le VLAN 30 est autorisé des deux côtés (10, 20, 30 côté réception ; 10, 20, 40 côté étage contredit ? Non — relisez : côté SW-ETAGE, le VLAN 30 n'est PAS autorisé).\n4) Non : le VLAN 40 n'est pas autorisé côté SW-RECEPTION, le flux vidéo ne franchit pas le trunk.\n5) Changer le natif d'un seul côté crée un désaccord de VLAN natif (Native VLAN Mismatch) : alertes CDP permanentes, fuite de trafic d'un VLAN dans un autre, boucles STP possibles.\nContrôle : la panne initiale s'explique par la liste autorisée — ajouter 40 côté SW-RECEPTION (et 30 côté SW-ETAGE si la comptabilité doit passer) rétablit la remontée vidéo."
  }
];
