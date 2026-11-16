'use strict';

module.exports = [
  {
    "id": "az3-c4-e1",
    "chapter": 4,
    "title": "Calculateur d'adressage Azure VNet & Adresses IP réservées",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la plage d’adresses IP d’un sous-réseau Azure en déduisant les 5 adresses réservées par le système SDN d’Azure.",
    "brief": "<p>Dans chaque sous-réseau IPv4 Azure, les quatre premières adresses et la dernière sont réservées : <strong>5 adresses IP</strong> ne peuvent pas être assignées aux ressources clientes. Les décalages partent de l'adresse réseau du sous-réseau :<br>\n- <code>+0</code> : adresse réseau (Network ID)<br>\n- <code>+1</code> : passerelle par défaut Azure<br>\n- <code>+2</code> et <code>+3</code> : adresses réservées pour la correspondance Azure DNS, et non deux résolveurs<br>\n- dernière adresse : réservée ; le broadcast n'est pas pris en charge dans le VNet<br><br>\nLe DNS fourni par Azure utilise <code>168.63.129.16</code> ; un DNS personnalisé configuré sur le VNet ou l'interface peut être conservé.<br>\nLa première IP assignable est l'adresse réseau + 4, la dernière précède l'adresse finale, et le nombre d'IPs exploitables vaut <code>Total - 5</code>.<br><br>\nFormat d'entrée :<br>\n<code>SUBNET name=&lt;nom&gt; cidr=&lt;adresse/préfixe&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>SUBNET &lt;nom&gt;: TOTAL=&lt;total&gt; USABLE=&lt;usable&gt; RESERVED=5 GATEWAY=&lt;gw_ip&gt; DNS_MAP_1=&lt;adresse_reseau_plus_2&gt; DNS_MAP_2=&lt;adresse_reseau_plus_3&gt; RANGE=&lt;first_usable&gt;-&lt;last_usable&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c4-e1) — Calculateur d'adressage Azure VNet & Adresses IP réservées\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\n# Données : SUBNET name=snet-db cidr=10.0.10.0/24\nA_COMPLETER\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\n# Données : SUBNET name=AzureBastionSubnet cidr=10.0.2.0/26\nA_COMPLETER\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\n# Données : SUBNET name=GatewaySubnet cidr=192.168.0.0/27\nA_COMPLETER\n\n[Cas 4 — Sous-réseau /28 dont le réseau ne se termine pas par .0]\n# Données : SUBNET name=snet-offset cidr=10.0.5.16/28\nA_COMPLETER\n",
    "hints": [
      "Déterminez d’abord l’adresse réseau du CIDR, puis calculez les décalages à partir de cette adresse.",
      "La passerelle est à réseau + 1, les correspondances DNS à + 2 et + 3, et la première adresse assignable à + 4.",
      "Déterminez réseau, broadcast et passerelle Azure (.1), puis soustrayez les 5 IP réservées par Azure (.0, .1, .2, .3 et dernière) pour compter les hôtes utilisables."
    ],
    "examples": [
      {
        "stdin": "SUBNET name=snet-web cidr=10.0.1.0/24",
        "expected": "SUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS_MAP_1=10.0.1.2 DNS_MAP_2=10.0.1.3 RANGE=10.0.1.4-10.0.1.254",
        "note": "Dans ce /24, 251 adresses sont exploitables ; DNS_MAP_1 et DNS_MAP_2 désignent les adresses réservées de correspondance."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau de base de données /24 distinct",
        "stdin": "cas:1",
        "expected": "SUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS_MAP_1=10.0.10.2 DNS_MAP_2=10.0.10.3 RANGE=10.0.10.4-10.0.10.254"
      },
      {
        "label": "Petit sous-réseau AzureBastionSubnet en /26",
        "stdin": "cas:2",
        "expected": "SUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS_MAP_1=10.0.2.2 DNS_MAP_2=10.0.2.3 RANGE=10.0.2.4-10.0.2.62"
      },
      {
        "label": "Sous-réseau GatewaySubnet minimal en /27",
        "stdin": "cas:3",
        "expected": "SUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS_MAP_1=192.168.0.2 DNS_MAP_2=192.168.0.3 RANGE=192.168.0.4-192.168.0.30"
      },
      {
        "label": "Sous-réseau /28 dont le réseau ne se termine pas par .0",
        "stdin": "cas:4",
        "expected": "SUBNET snet-offset: TOTAL=16 USABLE=11 RESERVED=5 GATEWAY=10.0.5.17 DNS_MAP_1=10.0.5.18 DNS_MAP_2=10.0.5.19 RANGE=10.0.5.20-10.0.5.30"
      }
    ],
    "solution": "[Exemple]\nSUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS_MAP_1=10.0.1.2 DNS_MAP_2=10.0.1.3 RANGE=10.0.1.4-10.0.1.254\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\nSUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS_MAP_1=10.0.10.2 DNS_MAP_2=10.0.10.3 RANGE=10.0.10.4-10.0.10.254\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\nSUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS_MAP_1=10.0.2.2 DNS_MAP_2=10.0.2.3 RANGE=10.0.2.4-10.0.2.62\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\nSUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS_MAP_1=192.168.0.2 DNS_MAP_2=192.168.0.3 RANGE=192.168.0.4-192.168.0.30\n\n[Cas 4 — Sous-réseau /28 dont le réseau ne se termine pas par .0]\nSUBNET snet-offset: TOTAL=16 USABLE=11 RESERVED=5 GATEWAY=10.0.5.17 DNS_MAP_1=10.0.5.18 DNS_MAP_2=10.0.5.19 RANGE=10.0.5.20-10.0.5.30",
    "takeaway": "À retenir : Calculer la plage d’adresses IP d’un sous-réseau Azure en déduisant les 5 adresses réservées par le système SDN d’Azure.\nRepère : Dans ce /24, 251 adresses sont exploitables ; DNS_MAP_1 et DNS_MAP_2 désignent les adresses réservées de correspondance."
  },
  {
    "id": "az3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le filtrage du portail des Ateliers Norvian",
    "exampleTitle": "Exemple résolu — le filtrage du site de l'imprimerie Rivoire",
    "goal": "Évaluer des règles de sécurité d'un groupe de sécurité réseau (NSG) selon leur priorité et connaître les règles par défaut.",
    "brief": "<p><strong>Énoncé.</strong> Ateliers Norvian, PME industrielle, publie son portail fournisseur sur une machine virtuelle protégée par un groupe de sécurité réseau (NSG). Rappel du cours : les règles sont évaluées de la priorité la plus basse à la plus haute (la règle de priorité 100 passe avant celle de priorité 200) ; la première règle qui correspond au paquet détermine l'action.</p><p>Règles personnalisées du NSG (trafic entrant) :</p><table><tr><th>Priorité</th><th>Nom</th><th>Port</th><th>Source</th><th>Action</th></tr><tr><th>100</th><td>Allow-HTTP</td><td>80</td><td>Internet</td><td>Autoriser</td></tr><tr><th>110</th><td>Allow-HTTPS</td><td>443</td><td>Internet</td><td>Autoriser</td></tr><tr><th>200</th><td>Allow-SSH-Bastion</td><td>22</td><td>AzureBastionSubnet</td><td>Autoriser</td></tr><tr><th>1000</th><td>Deny-All-Inbound</td><td>tous</td><td>quelconque</td><td>Refuser</td></tr></table><p>Le NSG conserve aussi ses règles par défaut : AllowVnetInBound (priorité 65000), AllowAzureLoadBalancerInBound (65001) et DenyAllInbound (65500).</p><ol><li>Un paquet TCP arrive d'Internet sur le port 443 : quelle règle s'applique ?</li><li>Un paquet TCP arrive d'Internet sur le port 3389 (RDP) : quelle action le NSG applique-t-il ?</li><li>Un paquet TCP arrive du sous-réseau AzureBastionSubnet sur le port 22 : est-il autorisé ou refusé ?</li><li>Deux règles correspondent à un même paquet, l'une de priorité 100, l'autre de priorité 200 : laquelle est évaluée en premier ?</li><li>Quel numéro de priorité porte la règle par défaut DenyAllInbound ?</li></ol>",
    "starter": "# Exercice — Le filtrage du portail des Ateliers Norvian\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom de la règle. Question 3 : autorisé ou refusé.\n\n[Question 1 — Règle appliquée à un paquet TCP 443 depuis Internet]\nA_COMPLETER\n\n[Question 2 — Action du NSG sur un paquet TCP 3389 depuis Internet]\nA_COMPLETER\n\n[Question 3 — Sort d'un paquet TCP 22 depuis AzureBastionSubnet]\nA_COMPLETER\n\n[Question 4 — Règle évaluée en premier entre les priorités 100 et 200]\nA_COMPLETER\n\n[Question 5 — Priorité de la règle par défaut DenyAllInbound]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque paquet, parcourez les règles par priorité croissante et arrêtez-vous à la première qui correspond au port et à la source.",
      "La priorité est un numéro : plus il est petit, plus la règle est évaluée tôt ; 100 passe avant 200, qui passe avant 1000.",
      "1. Port 443 : cherchez la règle dédiée. 2. Aucune règle d'autorisation ne couvre le port 3389 : la règle de refus générale s'applique. 3. La règle 200 couvre le port 22 depuis le sous-réseau Bastion. 4. Comparez les deux numéros. 5. Relisez les trois règles par défaut."
    ],
    "examples": [
      {
        "stdin": "L'imprimerie Rivoire filtre la machine virtuelle de son site avec un NSG :\n- priorité 150 : Allow-HTTPS, port 443, Internet, Autoriser ;\n- priorité 400 : Deny-All-Inbound, tous ports, quelconque, Refuser ;\n- règles par défaut : AllowVnetInBound (65000), DenyAllInbound (65500).\n\n1) Un paquet Internet sur 443 correspond à Allow-HTTPS (priorité 150) : autorisé.\n2) Un paquet Internet sur le port 8080 atteint Deny-All-Inbound (400) : refusé.\n3) La priorité 150 est évaluée avant la priorité 400.\n4) La règle par défaut DenyAllInbound porte le numéro 65500.",
        "expected": "443 : autorisé par Allow-HTTPS — 8080 : refusé par Deny-All-Inbound — la priorité 150 passe avant la 400 — DenyAllInbound : 65500",
        "note": "La règle personnalisée de refus explicite (priorité 400) s'applique avant les règles par défaut : inutile d'attendre la priorité 65500 pour bloquer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Règle appliquée à un paquet TCP 443 depuis Internet",
        "stdin": "q:1",
        "expected": "allow-https||allowhttps||allow https||la règle allow-https (priorité 110)"
      },
      {
        "label": "Question 2 — Action du NSG sur un paquet TCP 3389 depuis Internet",
        "stdin": "q:2",
        "expected": "refusé||refuse||bloqué||le paquet est refusé||refuser"
      },
      {
        "label": "Question 3 — Sort d'un paquet TCP 22 depuis AzureBastionSubnet",
        "stdin": "q:3",
        "expected": "autorise||autoriser||autorisé||le paquet est autorisé||allow"
      },
      {
        "label": "Question 4 — Règle évaluée en premier entre les priorités 100 et 200",
        "stdin": "q:4",
        "expected": "celle de priorité 100||la règle de priorité 100||100||la priorité 100"
      },
      {
        "label": "Question 5 — Priorité de la règle par défaut DenyAllInbound",
        "stdin": "q:5",
        "expected": "65500"
      }
    ],
    "solution": "[Question 1 — Règle appliquée à un paquet TCP 443 depuis Internet]\nallow-https\n\n[Question 2 — Action du NSG sur un paquet TCP 3389 depuis Internet]\nrefusé\n\n[Question 3 — Sort d'un paquet TCP 22 depuis AzureBastionSubnet]\nautorise\n\n[Question 4 — Règle évaluée en premier entre les priorités 100 et 200]\ncelle de priorité 100\n\n[Question 5 — Priorité de la règle par défaut DenyAllInbound]\n65500",
    "takeaway": "1) Le paquet TCP 443 depuis Internet correspond à la règle Allow-HTTPS (priorité 110) : il est autorisé.\n2) Aucune règle d'autorisation ne couvre le port 3389 : la première règle correspondante est Deny-All-Inbound (priorité 1000), le paquet est refusé.\n3) Le paquet SSH depuis AzureBastionSubnet correspond à Allow-SSH-Bastion (priorité 200) : il est autorisé.\n4) La règle de priorité 100 est évaluée avant celle de priorité 200 : le numéro le plus bas gagne.\n5) La règle par défaut DenyAllInbound porte la priorité 65500.\nContrôle : ordre d'évaluation du NSG : 100, 110, 200, 1000, puis les règles par défaut 65000, 65001 et 65500."
  },
  {
    "id": "az3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La topologie hub-and-spoke du groupe Palissy",
    "exampleTitle": "Exemple résolu — le hub-and-spoke du réseau de cliniques Axelys",
    "goal": "Concevoir un maillage de peerings entre réseaux virtuels Azure (hub-and-spoke) et vérifier la compatibilité des espaces d'adressage.",
    "brief": "<p><strong>Énoncé.</strong> Le groupe Palissy, distributeur disposant de quatre sites, déploie une topologie hub-and-spoke :</p><table><tr><th>Réseau virtuel</th><th>Rôle</th><th>Espace d'adressage</th></tr><tr><th>vnet-hub</th><td>hub (héberge le pare-feu)</td><td>10.10.0.0/16</td></tr><tr><th>vnet-entrepot-est</th><td>spoke</td><td>10.20.0.0/16</td></tr><tr><th>vnet-entrepot-ouest</th><td>spoke</td><td>10.30.0.0/16</td></tr><tr><th>vnet-bureaux</th><td>spoke</td><td>10.40.0.0/16</td></tr></table><p>Rappels du cours : un peering entre deux réseaux virtuels exige deux liaisons, une configurée dans chaque sens ; un peering est impossible entre deux réseaux dont les espaces d'adressage se chevauchent ; dans une topologie hub-and-spoke, le trafic entre deux spokes traverse le hub, qui le route.</p><ol><li>Combien de peerings (liaisons hub-spoke) la topologie établit-elle entre le hub et les trois spokes ?</li><li>Chaque peering exige une liaison par sens : combien de liaisons faut-il configurer au total ?</li><li>Les espaces 10.10.0.0/16 et 10.20.0.0/16 se chevauchent-ils ?</li><li>Par quel réseau virtuel transite le trafic entre vnet-entrepot-est et vnet-entrepot-ouest ?</li><li>Un nouveau site souhaite rejoindre la topologie avec l'espace 10.20.0.0/16 : le peering est-il possible ?</li></ol>",
    "starter": "# Exercice — La topologie hub-and-spoke du groupe Palissy\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 5 : oui ou non. Question 4 : le nom du réseau virtuel.\n\n[Question 1 — Nombre de peerings hub-spoke]\nA_COMPLETER\n\n[Question 2 — Nombre total de liaisons à configurer]\nA_COMPLETER\n\n[Question 3 — Chevauchement entre 10.10.0.0/16 et 10.20.0.0/16]\nA_COMPLETER\n\n[Question 4 — Réseau virtuel de transit entre les deux spokes]\nA_COMPLETER\n\n[Question 5 — Peering possible avec un espace 10.20.0.0/16 supplémentaire]\nA_COMPLETER\n",
    "hints": [
      "Comptez les paires hub-spoke : un peering relie le hub à un spoke, pas les spokes entre eux.",
      "Chaque paire demande deux liaisons : une déclarée depuis chaque réseau virtuel.",
      "1. Un peering par spoke. 2. Multipliez par deux. 3. Comparez les blocs /16 : le deuxième octet suffit à les distinguer. 4. En hub-and-spoke, les spokes ne se parlent pas directement. 5. Vérifiez si la plage demandée existe déjà dans la topologie."
    ],
    "examples": [
      {
        "stdin": "Le réseau de cliniques Axelys construit un hub vnet-hub-axelys (10.50.0.0/16) relié à\ndeux spokes : vnet-imagerie (10.60.0.0/16) et vnet-admin (10.70.0.0/16).\n\n1) La topologie compte 2 peerings hub-spoke.\n2) Il faut 2 liaisons par peering, soit 4 liaisons au total.\n3) 10.50.0.0/16 et 10.60.0.0/16 ne se chevauchent pas.\n4) Le trafic imagerie-admin transite par le hub.\n5) Un spoke supplémentaire en 10.60.0.0/16 serait refusé : chevauchement avec vnet-imagerie.",
        "expected": "2 peerings — 4 liaisons — pas de chevauchement — transit par le hub — chevauchement refusé",
        "note": "Chaque peering se configure par deux liaisons distinctes, une par sens : un sens oublié et le trafic ne passe que dans une seule direction."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de peerings hub-spoke",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Nombre total de liaisons à configurer",
        "stdin": "q:2",
        "expected": "6||six"
      },
      {
        "label": "Question 3 — Chevauchement entre 10.10.0.0/16 et 10.20.0.0/16",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Réseau virtuel de transit entre les deux spokes",
        "stdin": "q:4",
        "expected": "le hub||hub||vnet-hub||le hub (vnet-hub)||par vnet-hub"
      },
      {
        "label": "Question 5 — Peering possible avec un espace 10.20.0.0/16 supplémentaire",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre de peerings hub-spoke]\n3\n\n[Question 2 — Nombre total de liaisons à configurer]\n6\n\n[Question 3 — Chevauchement entre 10.10.0.0/16 et 10.20.0.0/16]\nnon\n\n[Question 4 — Réseau virtuel de transit entre les deux spokes]\nle hub\n\n[Question 5 — Peering possible avec un espace 10.20.0.0/16 supplémentaire]\nnon",
    "takeaway": "1) La topologie établit 3 peerings : hub-est, hub-ouest et hub-bureaux.\n2) Chaque peering exige 2 liaisons (une par sens) : 3 × 2 = 6 liaisons à configurer.\n3) Non : 10.10.0.0/16 couvre les adresses 10.10.x.x et 10.20.0.0/16 couvre les adresses 10.20.x.x ; aucune adresse commune.\n4) Le trafic entre les deux spokes transite par le hub (vnet-hub), qui le route — typiquement à travers le pare-feu.\n5) Non : l'espace 10.20.0.0/16 est déjà utilisé par vnet-entrepot-est ; le peering serait refusé pour chevauchement.\nContrôle : 3 pairings actifs, chacun configuré dans les deux sens, soit 6 liaisons — le hub route les flux entre spokes sans peering direct entre eux."
  }
];
