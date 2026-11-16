'use strict';

module.exports = [
  {
    "id": "aws3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de Sous-réseaux CIDR & Adresses Réservées AWS",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer les adresses réservées d'un sous-réseau IPv4 VPC hors BYOIP et le nombre d'adresses assignables.",
    "brief": "<p>Pour cet exercice, les sous-réseaux IPv4 du <strong>VPC AWS</strong> sont dans le cas usuel <strong>hors BYOIP</strong>. Les quatre premières adresses du CIDR (base, base + 1, base + 2 et base + 3) et sa dernière adresse sont réservées. La base + 1 est réservée au routeur ; la base + 2 est réservée mais n'est pas nécessairement celle du résolveur DNS, qui dépend du bloc principal du VPC. La dernière est l'adresse de diffusion théorique ; AWS ne prend pas en charge la diffusion dans un VPC.<br><br>\nTotal : <code>2 ** (32 - masque)</code> ; adresses assignables dans ce cadre : <code>total - 5</code>. AWS documente une exception pour les plages IPv4 BYOIP : ne généralisez pas cette formule à ces plages.<br><br>\nDonnées : <code>VPC_SUBNET CIDR=&lt;ip/masque&gt;</code> (exemple : <code>10.0.1.0/24</code>).<br>\nRésultat d’analyse attendu : <code>SUBNET_CALC: total_ips=&lt;t&gt; usable_ips=&lt;u&gt; net_ip=&lt;net&gt; router_ip=&lt;r&gt; reserved2_ip=&lt;adresse réservée base+2&gt; last_ip=&lt;dernière adresse&gt;</code>.</p>",
    "starter": "# Grille d'analyse (aws3-c4-e1) — Calculateur de Sous-réseaux CIDR & Adresses Réservées AWS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau /28 (le plus petit autorisé par AWS VPC)]\n# Données : VPC_SUBNET CIDR=172.16.0.16/28\nA_COMPLETER\n\n[Cas 2 — Sous-réseau étendu /20 (4096 adresses)]\n# Données : VPC_SUBNET CIDR=192.168.16.0/20\nA_COMPLETER\n\n[Cas 3 — Sous-réseau moyen /26 (64 adresses)]\n# Données : VPC_SUBNET CIDR=10.10.5.128/26\nA_COMPLETER\n",
    "hints": [
      "Analysez scrupuleusement le format d'entrée les données d’entrée.",
      "Respectez la casse et les séparateurs attendus en sortie.",
      "Sur un sous-réseau VPC AWS IPv4 hors BYOIP, déduisez exactement 5 adresses réservées (réseau, routeur VPC .1, DNS .2, usage futur .3 et broadcast) de 2^(32-prefixe)."
    ],
    "examples": [
      {
        "stdin": "VPC_SUBNET CIDR=10.0.1.0/24",
        "expected": "SUBNET_CALC: total_ips=256 usable_ips=251 net_ip=10.0.1.0 router_ip=10.0.1.1 reserved2_ip=10.0.1.2 last_ip=10.0.1.255",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau /28 (le plus petit autorisé par AWS VPC)",
        "stdin": "cas:1",
        "expected": "SUBNET_CALC: total_ips=16 usable_ips=11 net_ip=172.16.0.16 router_ip=172.16.0.17 reserved2_ip=172.16.0.18 last_ip=172.16.0.31\n"
      },
      {
        "label": "Sous-réseau étendu /20 (4096 adresses)",
        "stdin": "cas:2",
        "expected": "SUBNET_CALC: total_ips=4096 usable_ips=4091 net_ip=192.168.16.0 router_ip=192.168.16.1 reserved2_ip=192.168.16.2 last_ip=192.168.31.255\n"
      },
      {
        "label": "Sous-réseau moyen /26 (64 adresses)",
        "stdin": "cas:3",
        "expected": "SUBNET_CALC: total_ips=64 usable_ips=59 net_ip=10.10.5.128 router_ip=10.10.5.129 reserved2_ip=10.10.5.130 last_ip=10.10.5.191\n"
      }
    ],
    "solution": "[Exemple]\nSUBNET_CALC: total_ips=256 usable_ips=251 net_ip=10.0.1.0 router_ip=10.0.1.1 reserved2_ip=10.0.1.2 last_ip=10.0.1.255\n\n[Cas 1 — Sous-réseau /28 (le plus petit autorisé par AWS VPC)]\nSUBNET_CALC: total_ips=16 usable_ips=11 net_ip=172.16.0.16 router_ip=172.16.0.17 reserved2_ip=172.16.0.18 last_ip=172.16.0.31\n\n\n[Cas 2 — Sous-réseau étendu /20 (4096 adresses)]\nSUBNET_CALC: total_ips=4096 usable_ips=4091 net_ip=192.168.16.0 router_ip=192.168.16.1 reserved2_ip=192.168.16.2 last_ip=192.168.31.255\n\n\n[Cas 3 — Sous-réseau moyen /26 (64 adresses)]\nSUBNET_CALC: total_ips=64 usable_ips=59 net_ip=10.10.5.128 router_ip=10.10.5.129 reserved2_ip=10.10.5.130 last_ip=10.10.5.191",
    "takeaway": "À retenir : Calculer les adresses réservées d'un sous-réseau IPv4 VPC hors BYOIP et le nombre d'adresses assignables.\nRepère : Cas d'usage nominal."
  },
  {
    "id": "aws3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les tables de routage du VPC de l'agence Pixeline",
    "exampleTitle": "Exemple résolu — le routage du VPC du média VilleInfo",
    "goal": "Lire les tables de routage d'un VPC (IGW, NAT) et raisonner sur sous-réseaux publics, privés et endpoints.",
    "brief": "<p><strong>Énoncé.</strong> Pixeline, agence événementielle, construit son VPC 10.20.0.0/16 : une <strong>Internet Gateway</strong> est attachée au VPC ; les sous-réseaux publics (qui hébergent le répartiteur de charge) ont pour table de routage : <code>10.20.0.0/16 → local</code> et <code>0.0.0.0/0 → igw-0f3a</code> ; les sous-réseaux privés (qui hébergent les instances EC2) ont pour table : <code>10.20.0.0/16 → local</code> et <code>0.0.0.0/0 → nat-0c7b</code> (passerelle NAT). La base de données relationnelle est installée dans les sous-réseaux privés.</p><p>Rappels du cours : une instance d'un sous-réseau public reçoit une adresse IPv4 publique et sort par l'Internet Gateway ; une instance d'un sous-réseau privé n'a pas d'adresse IPv4 publique et sort via la passerelle NAT ; la passerelle NAT facture les données traitées, ici <strong>0,045 € par Go</strong>.</p><p>Les questions 3 attend « oui » ou « non » ; la question 5 attend un nombre.</p><ol><li>Quelle est la cible de la route par défaut (0.0.0.0/0) de la table de routage d'un sous-réseau public ?</li><li>Quelle passerelle permet à une instance d'un sous-réseau privé de télécharger des correctifs vers Internet sans être exposée en entrée ?</li><li>Une instance EC2 d'un sous-réseau privé reçoit-elle par défaut une adresse IPv4 publique ?</li><li>Dans quels sous-réseaux le groupe de sous-réseaux (subnet group) de la base de données doit-il être placé : publics ou privés ?</li><li>La passerelle NAT facture 0,045 € par Go traité : quel est le coût de traitement pour 100 Go sortis vers Internet ce mois-ci, en euros ?</li><li>Pour joindre un bucket S3 depuis un sous-réseau privé sans traverser Internet, quel type de VPC endpoint S3 faut-il créer ?</li></ol>",
    "starter": "# Exercice — Les tables de routage du VPC de l'agence Pixeline\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 3 : oui ou non. Question 5 : le nombre seul.\n\n[Question 1 — Cible de la route par défaut d'un sous-réseau public]\nA_COMPLETER\n\n[Question 2 — Passerelle de sortie d'un sous-réseau privé]\nA_COMPLETER\n\n[Question 3 — Adresse IPv4 publique par défaut en sous-réseau privé]\nA_COMPLETER\n\n[Question 4 — Placement du subnet group de la base]\nA_COMPLETER\n\n[Question 5 — Coût de traitement de la NAT pour 100 Go (en €)]\nA_COMPLETER\n\n[Question 6 — Type de VPC endpoint pour S3]\nA_COMPLETER\n",
    "hints": [
      "La route 0.0.0.0/0 dit où part tout le trafic destiné à Internet : igw pour le public, nat pour le privé.",
      "Une base de données ne doit jamais être exposée : son subnet group vit dans les sous-réseaux privés.",
      "1. Lisez la table publique. 2. Cherchez la passerelle qui sort sans exposer. 3. Qui reçoit une IPv4 publique ? 4. Public ou privé pour une base ? 5. 100 × 0,045. 6. Deux types d'endpoint existent : interface et gateway ; S3 utilise le second."
    ],
    "examples": [
      {
        "stdin": "Le média VilleInfo construit son VPC : sous-réseaux publics (route 0.0.0.0/0 vers l'Internet Gateway),\nsous-réseaux privés (route 0.0.0.0/0 vers la passerelle NAT, 0,045 €/Go traité), base en sous-réseaux privés.\n\n1) Route par défaut publique : 0.0.0.0/0 → Internet Gateway.\n2) Sortie Internet des instances privées : la passerelle NAT.\n3) Coût NAT du mois pour 200 Go traités : 200 × 0,045 = 9,00 €.\n4) La base relationnelle est placée dans les sous-réseaux privés.",
        "expected": "0.0.0.0/0 vers l'IGW en public — NAT pour la sortie privée — 9,00 € pour 200 Go — base en sous-réseaux privés",
        "note": "L'Internet Gateway sert les sous-réseaux publics ; la passerelle NAT paie la sortie Internet des sous-réseaux privés sans jamais les exposer en entrée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Cible de la route par défaut d'un sous-réseau public",
        "stdin": "q:1",
        "expected": "l internet gateway||l'igw||internet gateway||l'igw (internet gateway)||igw||l internet gateway (igw)"
      },
      {
        "label": "Question 2 — Passerelle de sortie d'un sous-réseau privé",
        "stdin": "q:2",
        "expected": "la nat gateway||nat gateway||la passerelle nat||nat||la nat"
      },
      {
        "label": "Question 3 — Adresse IPv4 publique par défaut en sous-réseau privé",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Placement du subnet group de la base",
        "stdin": "q:4",
        "expected": "privés||prives||les sous-réseaux privés||dans les sous-réseaux privés||privé"
      },
      {
        "label": "Question 5 — Coût de traitement de la NAT pour 100 Go (en €)",
        "stdin": "q:5",
        "expected": "4,5||4.5||4,50||4.50||4,5 €||4,50 €"
      },
      {
        "label": "Question 6 — Type de VPC endpoint pour S3",
        "stdin": "q:6",
        "expected": "gateway||une gateway endpoint||un gateway endpoint||le gateway endpoint||gateway endpoint||une passerelle (gateway endpoint)"
      }
    ],
    "solution": "[Question 1 — Cible de la route par défaut d'un sous-réseau public]\nl internet gateway\n\n[Question 2 — Passerelle de sortie d'un sous-réseau privé]\nla nat gateway\n\n[Question 3 — Adresse IPv4 publique par défaut en sous-réseau privé]\nnon\n\n[Question 4 — Placement du subnet group de la base]\nprivés\n\n[Question 5 — Coût de traitement de la NAT pour 100 Go (en €)]\n4,5\n\n[Question 6 — Type de VPC endpoint pour S3]\ngateway",
    "takeaway": "1) Dans un sous-réseau public, la route 0.0.0.0/0 pointe vers l'Internet Gateway (igw-0f3a) : c'est elle qui porte le trafic vers et depuis Internet.\n2) La passerelle NAT : elle initie la sortie vers Internet pour les instances privées sans autoriser de connexions entrantes.\n3) Non : seules les instances des sous-réseaux publics reçoivent une adresse IPv4 publique ; en privé, on sort par la NAT.\n4) La base de données est placée dans les sous-réseaux privés : aucune exposition directe à Internet.\n5) 100 Go × 0,045 € = 4,50 € de traitement pour le mois.\n6) S3 s'utilise depuis un sous-réseau privé via un VPC endpoint de type gateway : le trafic reste sur le réseau AWS sans traverser Internet.\nContrôle : public = IGW, privé = NAT, base = privé, S3 = endpoint gateway : aucune donnée de production ne traverse l'Internet public."
  },
  {
    "id": "aws3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le pare-feu du VPC de la fintech Palladium",
    "exampleTitle": "Exemple résolu — le pare-feu du VPC du jeu Kaléido",
    "goal": "Distinguer Security Groups (avec état) et Network ACLs (sans état) sur une architecture web réelle.",
    "brief": "<p><strong>Énoncé.</strong> Palladium, fintech réglementée, durcit le réseau de son VPC. Architecture : un répartiteur de charge dans les sous-réseaux publics, des instances applicatives dans les sous-réseaux privés. Le Security Group « sg-alb » du répartiteur autorise en entrée le port 443 depuis 0.0.0.0/0 ; le Security Group « sg-app » des instances autorise en entrée le port 443 depuis sg-alb uniquement. La Network ACL des sous-réseaux autorise en entrée le port 443 et en sortie la plage 1024-65535.</p><p>Rappels du cours : un Security Group est <strong>avec état</strong> (stateful) — les réponses au trafic autorisé repartent automatiquement — et ne contient que des règles d'autorisation ; une Network ACL est <strong>sans état</strong> (stateless) — chaque paquet, aller comme retour, est évalué par les règles d'entrée et de sortie, par ordre de numéro de règle.</p><p>Les questions 1, 5 et 6 attendent « oui » ou « non ».</p><ol><li>Un client envoie une requête HTTPS au port 443 du répartiteur : la réponse sortante doit-elle être explicitement autorisée par une règle sortante du Security Group ?</li><li>Quelle plage de ports la règle sortante de la NACL ouvre-t-elle pour laisser revenir les réponses vers les clients ?</li><li>Un Security Group s'applique-t-il au sous-réseau ou à l'instance (interface réseau) ?</li><li>Une NACL s'applique-t-elle au sous-réseau ou à l'instance ?</li><li>Un Security Group peut-il contenir une règle de refus explicite (Deny) ?</li><li>Les règles d'une NACL sont-elles évaluées par ordre de numéro, la première correspondance l'emportant ?</li></ol>",
    "starter": "# Exercice — Le pare-feu du VPC de la fintech Palladium\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 5 et 6 : oui ou non. Question 2 : la plage de ports.\n\n[Question 1 — La réponse sortante exige-t-elle une règle sortante du SG ?]\nA_COMPLETER\n\n[Question 2 — Plage de ports ouverte en sortie par la NACL]\nA_COMPLETER\n\n[Question 3 — Niveau d'application d'un Security Group]\nA_COMPLETER\n\n[Question 4 — Niveau d'application d'une NACL]\nA_COMPLETER\n\n[Question 5 — Un SG peut-il contenir un Deny explicite ?]\nA_COMPLETER\n\n[Question 6 — Évaluation des règles de NACL par numéro]\nA_COMPLETER\n",
    "hints": [
      "Avec état : le pare-feu se souvient de la connexion autorisée et laisse repartir la réponse ; sans état : il évalue chaque paquet indépendamment.",
      "Les clients répondent depuis des ports éphémères : la NACL doit donc les ouvrir en sortie.",
      "1. Rappelez ce que « avec état » impose côté règles sortantes. 2. Relisez la règle sortante de la NACL. 3. et 4. SG = niveau instance, NACL = niveau sous-réseau. 5. Un SG n'écrit que des Allow. 6. Le plus petit numéro de règle est évalué en premier."
    ],
    "examples": [
      {
        "stdin": "Le jeu en ligne Kaléido filtre son VPC : SG du frontal (entrée 8080 depuis tout Internet),\nSG des serveurs (entrée 8080 depuis le SG du frontal uniquement), NACL sans état.\n\n1) Le SG est avec état : la réponse au client 8080 repart sans règle sortante, non.\n2) La NACL doit ouvrir en sortie les ports éphémères 1024-65535 pour les retours clients.\n3) Le SG s'applique à l'instance (interface réseau).\n4) La NACL s'applique au sous-réseau.\n5) Un SG ne peut pas écrire de règle Deny : Allow uniquement.",
        "expected": "pas de règle sortante nécessaire — NACL : 1024-65535 en sortie — SG à l'instance — NACL au sous-réseau — SG sans Deny",
        "note": "Le Security Group protège l'instance en suivant l'état des connexions ; la NACL filtre le sous-réseau paquet par paquet, d'où l'ouverture des ports éphémères."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — La réponse sortante exige-t-elle une règle sortante du SG ?",
        "stdin": "q:1",
        "expected": "non"
      },
      {
        "label": "Question 2 — Plage de ports ouverte en sortie par la NACL",
        "stdin": "q:2",
        "expected": "1024-65535||1024 à 65535||1024 a 65535||les ports éphémères 1024-65535||1024 - 65535"
      },
      {
        "label": "Question 3 — Niveau d'application d'un Security Group",
        "stdin": "q:3",
        "expected": "l instance||l'instance||a l instance||à l'instance||l'instance (interface réseau)||l instance (interface reseau)"
      },
      {
        "label": "Question 4 — Niveau d'application d'une NACL",
        "stdin": "q:4",
        "expected": "le sous-réseau||le sous-reseau||au sous-réseau||au sous-reseau||sous-réseau"
      },
      {
        "label": "Question 5 — Un SG peut-il contenir un Deny explicite ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Évaluation des règles de NACL par numéro",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — La réponse sortante exige-t-elle une règle sortante du SG ?]\nnon\n\n[Question 2 — Plage de ports ouverte en sortie par la NACL]\n1024-65535\n\n[Question 3 — Niveau d'application d'un Security Group]\nl instance\n\n[Question 4 — Niveau d'application d'une NACL]\nle sous-réseau\n\n[Question 5 — Un SG peut-il contenir un Deny explicite ?]\nnon\n\n[Question 6 — Évaluation des règles de NACL par numéro]\noui",
    "takeaway": "1) Non : le Security Group est avec état, la réponse à une requête entrante autorisée repart automatiquement, sans règle sortante explicite.\n2) La NACL ouvre en sortie la plage 1024-65535 : les ports éphémères d'où écrivent les clients, pour laisser revenir les réponses.\n3) Le Security Group s'applique au niveau de l'instance, sur son interface réseau (ENI).\n4) La NACL s'applique au niveau du sous-réseau : elle filtre tout ce qui entre et sort du sous-réseau.\n5) Non : un Security Group ne contient que des règles d'autorisation (Allow) ; aucun refus explicite n'y est possible.\n6) Oui : les règles d'une NACL sont évaluées par ordre de numéro croissant et la première correspondance l'emporte.\nContrôle : sg-alb → sg-app en 443, NACL 443 en entrée et 1024-65535 en sortie : le SG suit l'état, la NACL filtre chaque paquet."
  }
];
