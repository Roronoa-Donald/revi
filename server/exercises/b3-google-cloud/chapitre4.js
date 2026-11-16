'use strict';

module.exports = [
  {
    "id": "gcp3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le plan d'adressage VPC de Voltalys",
    "exampleTitle": "Exemple résolu — le VPC de RivieraSoft",
    "goal": "Découper un bloc CIDR en sous-réseaux et identifier les adresses réservées par Google Cloud.",
    "brief": "<p><strong>Énoncé.</strong> Voltalys, gestionnaire grenoblois de compteurs d'énergie connectés, crée son VPC en mode personnalisé avec le bloc <strong>10.40.0.0/22</strong>, à découper en sous-réseaux régionaux. Rappel du cours : Google Cloud réserve <strong>4 adresses par sous-réseau</strong> — la première (.0, adresse du réseau), la suivante (.1, passerelle), la troisième (.2, DNS interne) et la dernière (diffusion).</p><ol><li>Combien d'adresses IP contient le bloc 10.40.0.0/22 ?</li><li>Combien de sous-réseaux /24 peut-on découper dans ce bloc /22 ?</li><li>Combien d'adresses utilisables offre un sous-réseau /24, réservations déduites ?</li><li>Quelle est la première adresse utilisable du sous-réseau 10.40.1.0/24 ?</li><li>Quelle est la dernière adresse utilisable du sous-réseau 10.40.1.0/24 ?</li><li>Quelle est l'adresse de la passerelle du sous-réseau 10.40.2.0/24 ?</li></ol>",
    "starter": "# Exercice — Le plan d'adressage VPC de Voltalys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul. Questions 4 à 6 : l'adresse IP.\n\n[Question 1 — Nombre d'adresses du bloc /22]\nA_COMPLETER\n\n[Question 2 — Nombre de sous-réseaux /24]\nA_COMPLETER\n\n[Question 3 — Adresses utilisables d'un /24]\nA_COMPLETER\n\n[Question 4 — Première adresse utilisable de 10.40.1.0/24]\nA_COMPLETER\n\n[Question 5 — Dernière adresse utilisable de 10.40.1.0/24]\nA_COMPLETER\n\n[Question 6 — Passerelle de 10.40.2.0/24]\nA_COMPLETER\n",
    "hints": [
      "Un bloc /n contient 2 puissance (32 − n) adresses : un /22 en contient 2 puissance 10, un /24 en contient 2 puissance 8.",
      "Chaque sous-réseau perd 4 adresses réservées : retranchez-les du total pour obtenir les adresses utilisables.",
      "1. Le /22 couvre le troisième octet de 0 à 3. 2. Comparez les tailles : un /24 est quatre fois plus petit qu'un /22. 3. 256 − 4. 4. Les adresses .0, .1 et .2 sont réservées. 5. La dernière adresse est réservée pour la diffusion. 6. La passerelle est la deuxième adresse du sous-réseau."
    ],
    "examples": [
      {
        "stdin": "RivieraSoft, éditeur niçois de logiciels, crée son VPC en mode personnalisé avec le bloc\n10.70.0.0/23, découpé en sous-réseaux /24. Google Cloud réserve 4 adresses par sous-réseau.\n\n1) Le /23 contient 2 puissance 9 = 512 adresses.\n2) Il fournit 2 sous-réseaux /24 (256 adresses chacun).\n3) Un /24 offre 256 − 4 = 252 adresses utilisables.\n4) Première utilisable de 10.70.0.0/24 : 10.70.0.3 (.0 réseau, .1 passerelle, .2 DNS).\n5) Dernière utilisable : 10.70.0.254 (.255 réservée pour la diffusion).\n6) Passerelle de 10.70.1.0/24 : 10.70.1.1.",
        "expected": "512 adresses — 2 sous-réseaux /24 — 252 utilisables — première : 10.70.0.3 — dernière : 10.70.0.254 — passerelle : 10.70.1.1",
        "note": "La passerelle (.1) et le DNS interne (.2) sont imposés par Google : un plan d'adressage série réserve ces adresses avant d'attribuer des plages aux machines."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'adresses du bloc /22",
        "stdin": "q:1",
        "expected": "1024||1 024"
      },
      {
        "label": "Question 2 — Nombre de sous-réseaux /24",
        "stdin": "q:2",
        "expected": "4||quatre"
      },
      {
        "label": "Question 3 — Adresses utilisables d'un /24",
        "stdin": "q:3",
        "expected": "252"
      },
      {
        "label": "Question 4 — Première adresse utilisable de 10.40.1.0/24",
        "stdin": "q:4",
        "expected": "10.40.1.3"
      },
      {
        "label": "Question 5 — Dernière adresse utilisable de 10.40.1.0/24",
        "stdin": "q:5",
        "expected": "10.40.1.254"
      },
      {
        "label": "Question 6 — Passerelle de 10.40.2.0/24",
        "stdin": "q:6",
        "expected": "10.40.2.1"
      }
    ],
    "solution": "[Question 1 — Nombre d'adresses du bloc /22]\n1024\n\n[Question 2 — Nombre de sous-réseaux /24]\n4\n\n[Question 3 — Adresses utilisables d'un /24]\n252\n\n[Question 4 — Première adresse utilisable de 10.40.1.0/24]\n10.40.1.3\n\n[Question 5 — Dernière adresse utilisable de 10.40.1.0/24]\n10.40.1.254\n\n[Question 6 — Passerelle de 10.40.2.0/24]\n10.40.2.1",
    "takeaway": "1) Un /22 contient 2 puissance 10 = 1024 adresses (de 10.40.0.0 à 10.40.3.255).\n2) Un /22 se découpe en 4 sous-réseaux /24 : 10.40.0.0/24, 10.40.1.0/24, 10.40.2.0/24 et 10.40.3.0/24.\n3) Un /24 contient 256 adresses, moins les 4 réservées : 252 adresses utilisables.\n4) La première adresse utilisable est 10.40.1.3 : .0 est l'adresse du réseau, .1 la passerelle, .2 le DNS interne.\n5) La dernière adresse utilisable est 10.40.1.254 : .255 est réservée pour la diffusion.\n6) La passerelle est la deuxième adresse du sous-réseau : 10.40.2.1.\nContrôle : 252 utilisables × 4 sous-réseaux = 1008 adresses attribuables, et 1024 − 1008 = 16, soit 4 réservations × 4 sous-réseaux."
  },
  {
    "id": "gcp3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les règles de pare-feu du VPC de Claravue",
    "exampleTitle": "Exemple résolu — les règles de TransOcéan",
    "goal": "Appliquer les priorités et les tags réseau des règles de pare-feu VPC pour prévoir le sort d'un flux.",
    "brief": "<p><strong>Énoncé.</strong> Claravue, éditeur strasbourgeois de SaaS juridique, audite les règles de pare-feu de son VPC <code>claravue-vpc</code>. Quatre règles sont en place :</p><table><tr><th>Règle</th><th>Priorité</th><th>Sens</th><th>Action</th><th>Protocole/Port</th><th>Cible</th></tr><tr><th>allow-web</th><td>500</td><td>ingress</td><td>ALLOW</td><td>tcp:80</td><td>tag « web »</td></tr><tr><th>deny-web</th><td>1000</td><td>ingress</td><td>DENY</td><td>tcp:80</td><td>tag « web »</td></tr><tr><th>allow-ssh-bastion</th><td>100</td><td>ingress</td><td>ALLOW</td><td>tcp:22</td><td>tag « bastion »</td></tr><tr><th>allow-internal</th><td>65535</td><td>ingress</td><td>ALLOW</td><td>icmp</td><td>toutes les VM</td></tr></table><p>Rappel du cours : en cas de chevauchement, la règle à la priorité numérique la plus basse l'emporte ; le trafic entrant non couvert par une règle est refusé implicitement.</p><ol><li>Une requête HTTP (tcp:80) arrive d'Internet sur une VM taguée « web » : est-elle autorisée ?</li><li>Quel principe départage les deux règles contradictoires qui correspondent à cette requête ?</li><li>Une requête SSH (tcp:22) arrive d'Internet sur cette même VM « web » : est-elle autorisée ?</li><li>La règle allow-ssh-bastion s'applique-t-elle à une VM sans aucun tag ?</li><li>Quelle est la priorité par défaut d'une règle créée sans préciser l'option de priorité ?</li><li>Comment nomme-t-on les étiquettes appliquées aux VM pour cibler les règles de pare-feu (deux mots) ?</li></ol>",
    "starter": "# Exercice — Les règles de pare-feu du VPC de Claravue\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 4 : oui ou non. Questions 2, 5 et 6 : réponses courtes.\n\n[Question 1 — Requête HTTP autorisée sur la VM web ?]\nA_COMPLETER\n\n[Question 2 — Principe départageant deux règles contradictoires]\nA_COMPLETER\n\n[Question 3 — Requête SSH autorisée sur la VM web ?]\nA_COMPLETER\n\n[Question 4 — allow-ssh-bastion s'applique-t-elle à une VM sans tag ?]\nA_COMPLETER\n\n[Question 5 — Priorité par défaut d'une règle sans option de priorité]\nA_COMPLETER\n\n[Question 6 — Étiquettes ciblant les VM (deux mots)]\nA_COMPLETER\n",
    "hints": [
      "Listez les règles qui correspondent au flux (port, sens, cible) : si aucune ne correspond, le refus implicite s'applique.",
      "Entre deux règles applicables, celle qui a la valeur de priorité la plus petite est évaluée en premier et l'emporte.",
      "1. Deux règles couvrent tcp:80 sur le tag « web ». 2. Comparez 500 et 1000. 3. Aucune règle ne couvre tcp:22 pour le tag « web ». 4. La cible de allow-ssh-bastion est un tag précis. 5. Sans option de priorité, Google Cloud applique une valeur standard. 6. On les appelle des tags... réseau."
    ],
    "examples": [
      {
        "stdin": "TransOcéan, opérateur de ferries, audite son VPC :\n- allow-api : priorité 600, ingress, ALLOW, tcp:443, tag « api » ;\n- deny-api : priorité 1500, ingress, DENY, tcp:443, tag « api » ;\n- allow-ssh : priorité 250, ingress, ALLOW, tcp:22, tag « admin ».\n\n1) HTTPS sur une VM « api » : allow-api (600) l'emporte sur deny-api (1500) → autorisée.\n2) Le départage se fait par la priorité la plus basse.\n3) SSH sur une VM « api » : aucune règle ne correspond → bloquée (refus implicite).\n4) allow-ssh ne s'applique pas à une VM sans tag.\n5) Priorité par défaut : 1000.\n6) Les étiquettes de ciblage : les tags réseau.",
        "expected": "HTTPS autorisé (priorité 600) — départage : priorité la plus basse — SSH bloqué — règle non applicable sans tag — priorité par défaut : 1000 — tags réseau",
        "note": "Le refus implicite protège tout flux entrant oublié : en pare-feu VPC, ce qui n'est pas explicitement autorisé est refusé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Requête HTTP autorisée sur la VM web ?",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — Principe départageant deux règles contradictoires",
        "stdin": "q:2",
        "expected": "la priorité la plus basse||priorité la plus basse||la priorité numérique la plus basse||la valeur de priorité la plus petite||priorité la plus petite"
      },
      {
        "label": "Question 3 — Requête SSH autorisée sur la VM web ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — allow-ssh-bastion s'applique-t-elle à une VM sans tag ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Priorité par défaut d'une règle sans option de priorité",
        "stdin": "q:5",
        "expected": "1000||1 000"
      },
      {
        "label": "Question 6 — Étiquettes ciblant les VM (deux mots)",
        "stdin": "q:6",
        "expected": "tags réseau||tag réseau||les tags réseau||network tags"
      }
    ],
    "solution": "[Question 1 — Requête HTTP autorisée sur la VM web ?]\noui\n\n[Question 2 — Principe départageant deux règles contradictoires]\nla priorité la plus basse\n\n[Question 3 — Requête SSH autorisée sur la VM web ?]\nnon\n\n[Question 4 — allow-ssh-bastion s'applique-t-elle à une VM sans tag ?]\nnon\n\n[Question 5 — Priorité par défaut d'une règle sans option de priorité]\n1000\n\n[Question 6 — Étiquettes ciblant les VM (deux mots)]\ntags réseau",
    "takeaway": "1) Oui : allow-web (priorité 500) et deny-web (priorité 1000) correspondent toutes deux, mais 500 est inférieur à 1000, donc allow-web l'emporte.\n2) Le départage se fait par la priorité : la règle à la valeur numérique la plus basse est évaluée en premier.\n3) Non : aucune règle ne couvre tcp:22 pour le tag « web » ; le trafic entrant non autorisé est refusé implicitement.\n4) Non : allow-ssh-bastion cible le tag « bastion » ; une VM sans tag ne la déclenche pas.\n5) La priorité par défaut est 1000, appliquée quand l'option de priorité est absente.\n6) Les tags réseau : ces étiquettes posées sur les VM permettent aux règles de cibler précisément certaines machines.\nContrôle : allow-internal, priorité 65535, ne peut jamais prendre le pas sur une règle plus précise — c'est la valeur maximale, elle ne sert que de filet de secours."
  },
  {
    "id": "gcp3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Interconnexions et répartiteur global : HeliosPay",
    "exampleTitle": "Exemple résolu — la plateforme de NoctuaData",
    "goal": "Choisir l'interconnexion réseau selon le débit et les contraintes, et raisonner sur le répartiteur de charge mondial.",
    "brief": "<p><strong>Énoncé.</strong> HeliosPay, processeur de paiements basé au Luxembourg, exploite son VPC principal en europe-west3 et doit le relier à son datacenter sur site. Les trois options étudiées :</p><table><tr><th>Option</th><th>Débit</th><th>Mise en place</th><th>Coût</th></tr><tr><th>Cloud VPN</th><td>quelques Gbps par tunnel, sur Internet public chiffré</td><td>minutes</td><td>modeste</td></tr><tr><th>Dedicated Interconnect</th><td>10 à 200 Gbps, réseau privé</td><td>plusieurs semaines</td><td>élevé</td></tr><tr><th>VPC Peering</th><td>liaison entre deux VPC, sans transit</td><td>minutes</td><td>modeste</td></tr></table><p>Deux besoins se présentent : (a) une réplication continue de 1,5 Gbps chiffrée, à déployer cette semaine avec un budget serré ; (b) un flux de marché de 40 Gbps en continu, sur réseau privé avec engagement de haute disponibilité. Par ailleurs, le frontal public est servi par un répartiteur de charge HTTP(S) mondial, dont les health checks sondent le port 8080 des backends.</p><ol><li>Quelle option retenir pour le besoin (a) ?</li><li>Quelle option retenir pour le besoin (b) ?</li><li>Le trafic entre deux VPC appairés peut-il transiter vers un troisième VPC via le premier ?</li><li>Grâce à son adresse IP anycast unique, vers quoi le répartiteur mondial route-t-il chaque requête ?</li><li>La règle de pare-feu autorisant les plages de health checks a été supprimée : dans quel état passent les backends alors qu'ils fonctionnent parfaitement (mot anglais) ?</li><li>Quelle est la conséquence pour les utilisateurs si tous les backends passent dans cet état ?</li></ol>",
    "starter": "# Exercice — Interconnexions et répartiteur global : HeliosPay\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom de l'option. Question 3 : oui ou non. Questions 4 à 6 : réponses courtes.\n\n[Question 1 — Option pour le besoin (a)]\nA_COMPLETER\n\n[Question 2 — Option pour le besoin (b)]\nA_COMPLETER\n\n[Question 3 — Transit possible via un VPC appairé ?]\nA_COMPLETER\n\n[Question 4 — Destination du routage anycast]\nA_COMPLETER\n\n[Question 5 — État des backends sans règle de health checks (mot anglais)]\nA_COMPLETER\n\n[Question 6 — Conséquence pour les utilisateurs]\nA_COMPLETER\n",
    "hints": [
      "Classez les besoins sur trois axes : débit réellement requis, réseau privé ou Internet, et contrainte de délai de mise en place.",
      "Le peering relie deux VPC mais n'est pas transitif : il ne remplace ni un VPN ni une interconnexion avec un site externe.",
      "1. 1,5 Gbps chiffré, vite et pas cher. 2. 40 Gbps privé et garanti. 3. Un appariement est un lien direct entre deux réseaux. 4. L'anycast diffuse la même IP partout dans le monde. 5. Les sondes bloquées font croire les backends défaillants. 6. Un répartiteur sans backend sain ne peut plus servir."
    ],
    "examples": [
      {
        "stdin": "NoctuaData, hébergeur brestois, relie son VPC à son datacenter :\n(a) sauvegarde nocturne de 2 Gbps chiffrée, à déployer aujourd'hui → Cloud VPN ;\n(b) flux continu de 100 Gbps sur réseau privé avec engagement de disponibilité → Dedicated Interconnect ;\nle peering entre deux VPC ne transite pas vers un troisième ;\nle répartiteur mondial anycast route vers le point de présence le plus proche ;\nsans règle de health checks, les backends passent unhealthy ;\nles utilisateurs reçoivent alors des erreurs : le service est indisponible.\n\n1) (a) : Cloud VPN.\n2) (b) : Dedicated Interconnect.\n3) Non, le peering n'est pas transitif.\n4) Vers le point de présence (et le backend) le plus proche.\n5) Les backends passent unhealthy.\n6) Le service devient indisponible.",
        "expected": "(a) Cloud VPN — (b) Dedicated Interconnect — pas de transit — anycast : le plus proche — unhealthy — service indisponible",
        "note": "Les health checks du répartiteur mondial proviennent de plages précises (35.191.0.0/16 et 130.211.0.0/22) : les autoriser dans le pare-feu VPC fait partie du déploiement, sous peine de panne fantôme."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Option pour le besoin (a)",
        "stdin": "q:1",
        "expected": "Cloud VPN||un Cloud VPN||cloud vpn"
      },
      {
        "label": "Question 2 — Option pour le besoin (b)",
        "stdin": "q:2",
        "expected": "Dedicated Interconnect||un Dedicated Interconnect||Interconnect||dedicated interconnect"
      },
      {
        "label": "Question 3 — Transit possible via un VPC appairé ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Destination du routage anycast",
        "stdin": "q:4",
        "expected": "le point de présence le plus proche||point de présence le plus proche||le backend le plus proche||le point le plus proche||le plus proche"
      },
      {
        "label": "Question 5 — État des backends sans règle de health checks (mot anglais)",
        "stdin": "q:5",
        "expected": "unhealthy||non sains||défaillants"
      },
      {
        "label": "Question 6 — Conséquence pour les utilisateurs",
        "stdin": "q:6",
        "expected": "le service devient indisponible||service indisponible||le service est indisponible||indisponibilité du service||des erreurs||ils ne peuvent plus accéder au service"
      }
    ],
    "solution": "[Question 1 — Option pour le besoin (a)]\nCloud VPN\n\n[Question 2 — Option pour le besoin (b)]\nDedicated Interconnect\n\n[Question 3 — Transit possible via un VPC appairé ?]\nnon\n\n[Question 4 — Destination du routage anycast]\nle point de présence le plus proche\n\n[Question 5 — État des backends sans règle de health checks (mot anglais)]\nunhealthy\n\n[Question 6 — Conséquence pour les utilisateurs]\nle service devient indisponible",
    "takeaway": "1) Besoin (a) : Cloud VPN — 1,5 Gbps tient dans un tunnel chiffré sur Internet, la mise en place est quasi immédiate et le coût modeste.\n2) Besoin (b) : Dedicated Interconnect — 40 Gbps en continu sur réseau privé avec engagement de disponibilité dépasse ce qu'un VPN peut offrir ; l'Interconnect s'impose malgré son délai et son coût.\n3) Non : le peering est un lien direct entre deux VPC ; il n'offre pas de transit — le trafic ne peut pas traverser un VPC appairé pour atteindre un troisième.\n4) L'adresse anycast est annoncée depuis le monde entier : chaque requête est routée vers le point de présence — donc le backend — le plus proche de l'utilisateur.\n5) Sans la règle autorisant les plages de health checks, les sondes sont bloquées : tous les backends passent unhealthy.\n6) Le répartiteur retire alors tous les backends de la rotation : le service devient indisponible pour les utilisateurs, alors que les instances tournent parfaitement.\nContrôle : c'est la panne fantôme classique — la cause est une règle de pare-feu oubliée, pas une défaillance applicative."
  }
];
