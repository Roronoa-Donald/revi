'use strict';

module.exports = [
  {
    "id": "na2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le plan d'adressage de l'imprimerie QuadriColor",
    "exampleTitle": "Exemple résolu — le plan du cabinet Axiome",
    "goal": "Convertir des préfixes CIDR en masques décimaux, compter les hôtes utiles et dériver les wildcards.",
    "brief": "<p><strong>Énoncé.</strong> L'imprimerie QuadriColor, 250 salariés, restructure son réseau autour d'un bloc <code>192.168.44.0/24</code>. La DSI transmet le plan d'adressage suivant, un préfixe par service :</p><table><tr><th>Service</th><th>Matériel à raccorder</th><th>Préfixe prévu</th></tr><tr><th>Atelier de production</th><td>55 postes et imprimantes</td><td>/26</td></tr><tr><th>Direction et comptabilité</th><td>12 postes</td><td>/28</td></tr><tr><th>Liaison WAN vers le second site</th><td>2 routeurs (point-à-point)</td><td>/30</td></tr><tr><th>Boutique en boutique</th><td>180 postes</td><td>/24</td></tr></table><p>Rappels du cours : un masque en notation CIDR compte les bits à 1 ; les hôtes utiles valent 2^n − 2 où n est le nombre de bits d'hôte (32 − préfixe) ; le wildcard d'un préfixe s'obtient en soustrayant chaque octet du masque à 255. Répondez par le nombre ou le masque exact.</p><ol><li>Écrivez le masque décimal du préfixe /26.</li><li>Combien d'hôtes utiles le sous-réseau /26 offre-t-il ?</li><li>Écrivez le masque décimal du préfixe /30.</li><li>Combien d'hôtes utiles la liaison WAN /30 offre-t-elle ?</li><li>Écrivez le masque générique (wildcard) du préfixe /26, utilisé dans les ACL.</li><li>Combien d'hôtes utiles le bloc historique /24 offre-t-il ?</li></ol>",
    "starter": "# Exercice — Le plan d'adressage de l'imprimerie QuadriColor\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre ou le masque exact, sans commentaire.\n\n[Question 1 — Masque décimal de /26]\nA_COMPLETER\n\n[Question 2 — Hôtes utiles du /26]\nA_COMPLETER\n\n[Question 3 — Masque décimal de /30]\nA_COMPLETER\n\n[Question 4 — Hôtes utiles du /30]\nA_COMPLETER\n\n[Question 5 — Wildcard du /26]\nA_COMPLETER\n\n[Question 6 — Hôtes utiles du /24]\nA_COMPLETER\n",
    "hints": [
      "Un /26 laisse 32 − 26 = 6 bits d'hôte : 2^6 = 64 adresses, dont deux réservées (réseau et diffusion).",
      "Le masque décimal se construit octet par octet : /26 = 255.255.255.192 car 26 bits à 1 se répartissent en 8 + 8 + 8 + 2 ; /30 = 255.255.255.252 (8 + 8 + 8 + 6).",
      "Le wildcard est le complément du masque : 255 − 192 = 63 sur le dernier octet du /26 ; pour le /24, 32 − 24 = 8 bits d'hôte."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Axiome planifie son réseau 10.60.0.0/24 : un pôle conseil en /27 (25 postes), une liaison transversale en /30 et le siège historique en /25.\n\n1) /27 : masque 255.255.255.224, soit 32 − 27 = 5 bits d'hôte.\n2) Hôtes utiles du /27 : 2^5 − 2 = 30.\n3) /30 : masque 255.255.255.252, 2 bits d'hôte.\n4) Hôtes utiles du /30 : 2^2 − 2 = 2.\n5) Wildcard du /27 : 255 − 224 = 31, donc 0.0.0.31.\n6) Hôtes utiles du /25 : 2^7 − 2 = 126.",
        "expected": "/27 : 255.255.255.224 — 30 hôtes — /30 : 255.255.255.252 — 2 hôtes — wildcard 0.0.0.31 — /25 : 126 hôtes",
        "note": "Le wildcard complète le masque octet par octet : c'est l'outil des ACL et des déclarations OSPF."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Masque décimal de /26",
        "stdin": "q:1",
        "expected": "255.255.255.192"
      },
      {
        "label": "Question 2 — Hôtes utiles du /26",
        "stdin": "q:2",
        "expected": "62"
      },
      {
        "label": "Question 3 — Masque décimal de /30",
        "stdin": "q:3",
        "expected": "255.255.255.252"
      },
      {
        "label": "Question 4 — Hôtes utiles du /30",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — Wildcard du /26",
        "stdin": "q:5",
        "expected": "0.0.0.63"
      },
      {
        "label": "Question 6 — Hôtes utiles du /24",
        "stdin": "q:6",
        "expected": "254"
      }
    ],
    "solution": "[Question 1 — Masque décimal de /26]\n255.255.255.192\n\n[Question 2 — Hôtes utiles du /26]\n62\n\n[Question 3 — Masque décimal de /30]\n255.255.255.252\n\n[Question 4 — Hôtes utiles du /30]\n2\n\n[Question 5 — Wildcard du /26]\n0.0.0.63\n\n[Question 6 — Hôtes utiles du /24]\n254",
    "takeaway": "1) /26 = 26 bits à 1 : 255.255.255.192.\n2) 32 − 26 = 6 bits d'hôte : 2^6 − 2 = 62 hôtes utiles (55 postes de l'atelier tiennent largement).\n3) /30 = 255.255.255.252.\n4) 32 − 30 = 2 bits d'hôte : 2^2 − 2 = 2 hôtes, exactement les deux routeurs de la liaison point-à-point.\n5) Wildcard du /26 : 255.255.255.255 − 255.255.255.192 = 0.0.0.63.\n6) /24 : 8 bits d'hôte, 2^8 − 2 = 254 hôtes pour la boutique.\nContrôle : les masques forment des suites de 1 sans trou — 255.255.255.192, .252 et .0 sont tous valides ; les hôtes utiles vérifient 62 + 2 = 64 = 2^6, 2 + 2 = 4 = 2^2, 254 + 2 = 256 = 2^8."
  },
  {
    "id": "na2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "L'analyse du sous-réseau commercial d'AutoVermeil",
    "exampleTitle": "Exemple résolu — le sous-réseau du service études",
    "goal": "Dériver d'une adresse hôte tout le sous-réseau : adresse réseau, diffusion, plage attribuable et appartenance.",
    "brief": "<p><strong>Énoncé.</strong> La concession AutoVermeil, distributeur automobile de la zone industrielle Nord, adresse son réseau commercial à partir du bloc privé <code>172.20.0.0/16</code>. Le service commercial reçoit la plage suivante : la borne Wi-Fi du showroom est configurée avec l'adresse <code>172.20.8.130/26</code>. L'administrateur veut vérifier d'un coup d'œil le sous-réseau qui en découle.</p><p>Rappel du cours : un /26 découpe le dernier octet en blocs de 2^6 = 64 adresses ; l'adresse réseau est le multiple de 64 immédiatement inférieur ou égal au dernier octet de l'hôte. Répondez par l'adresse ou le nombre exact.</p><ol><li>Quelle est l'adresse réseau du sous-réseau ?</li><li>Quelle est l'adresse de diffusion (broadcast) ?</li><li>Quelle est la première adresse attribuable à un hôte ?</li><li>Quelle est la dernière adresse attribuable à un hôte ?</li><li>Combien d'hôtes utiles ce sous-réseau compte-t-il ?</li><li>L'adresse 172.20.8.200 appartient-elle à ce même sous-réseau ?</li></ol>",
    "starter": "# Exercice — L'analyse du sous-réseau commercial d'AutoVermeil\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par l'adresse ou le nombre exact, sans commentaire.\n\n[Question 1 — Adresse réseau]\nA_COMPLETER\n\n[Question 2 — Adresse de diffusion]\nA_COMPLETER\n\n[Question 3 — Première adresse attribuable]\nA_COMPLETER\n\n[Question 4 — Dernière adresse attribuable]\nA_COMPLETER\n\n[Question 5 — Hôtes utiles]\nA_COMPLETER\n\n[Question 6 — Appartenance de 172.20.8.200]\nA_COMPLETER\n",
    "hints": [
      "Un /26 impose un pas de 64 sur le dernier octet : les frontières sont 0, 64, 128, 192. Le multiple de 64 immédiatement inférieur ou égal à 130 donne l'adresse réseau.",
      "L'adresse de diffusion est la dernière du bloc, juste avant la frontière suivante ; la plage attribuable exclut ces deux bornes.",
      "Pour la question 6, placez 200 dans le bon bloc de 64 : s'il tombe dans un autre bloc que celui de l'hôte, il n'appartient pas au même sous-réseau."
    ],
    "examples": [
      {
        "stdin": "Un bureau d'études adresse son réseau à partir de 10.40.0.0/16 ; la station du projeteur reçoit 10.40.6.77/27.\n\n1) Pas de 32 : les frontières sont 0, 32, 64, 96… Le multiple de 32 sous 77 est 64 : réseau 10.40.6.64.\n2) Diffusion : 64 + 32 − 1 = 10.40.6.95.\n3) Première adresse attribuable : 10.40.6.65.\n4) Dernière adresse attribuable : 10.40.6.94.\n5) Hôtes utiles : 2^5 − 2 = 30.\n6) 10.40.6.100 tombe dans le bloc [96 ; 128[ : autre sous-réseau, réponse non.",
        "expected": "réseau 10.40.6.64 — diffusion 10.40.6.95 — plage 10.40.6.65 à 10.40.6.94 — 30 hôtes — 10.40.6.100 : non",
        "note": "Le pas du bloc (32 pour un /27) suffit à placer n'importe quelle adresse sans binaire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Adresse réseau",
        "stdin": "q:1",
        "expected": "172.20.8.128"
      },
      {
        "label": "Question 2 — Adresse de diffusion",
        "stdin": "q:2",
        "expected": "172.20.8.191"
      },
      {
        "label": "Question 3 — Première adresse attribuable",
        "stdin": "q:3",
        "expected": "172.20.8.129"
      },
      {
        "label": "Question 4 — Dernière adresse attribuable",
        "stdin": "q:4",
        "expected": "172.20.8.190"
      },
      {
        "label": "Question 5 — Hôtes utiles",
        "stdin": "q:5",
        "expected": "62"
      },
      {
        "label": "Question 6 — Appartenance de 172.20.8.200",
        "stdin": "q:6",
        "expected": "non||non, autre sous-réseau"
      }
    ],
    "solution": "[Question 1 — Adresse réseau]\n172.20.8.128\n\n[Question 2 — Adresse de diffusion]\n172.20.8.191\n\n[Question 3 — Première adresse attribuable]\n172.20.8.129\n\n[Question 4 — Dernière adresse attribuable]\n172.20.8.190\n\n[Question 5 — Hôtes utiles]\n62\n\n[Question 6 — Appartenance de 172.20.8.200]\nnon",
    "takeaway": "1) /26 : pas de 64. Les frontières sont 0, 64, 128, 192. 130 est dans [128 ; 192[ : adresse réseau 172.20.8.128.\n2) Diffusion : 128 + 64 − 1 = 172.20.8.191.\n3) Première adresse attribuable : 172.20.8.129.\n4) Dernière adresse attribuable : 172.20.8.190.\n5) 32 − 26 = 6 bits d'hôte : 2^6 − 2 = 62 hôtes utiles.\n6) 200 appartient au bloc [192 ; 256[, différent du bloc [128 ; 192[ de l'hôte : ce n'est pas le même sous-réseau.\nContrôle : 62 hôtes + réseau + diffusion = 64 = 2^6, la taille exacte du bloc ; la plage attribuable 129-190 compte bien 62 adresses."
  },
  {
    "id": "na2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le découpage VLSM du siège de TransGaz",
    "exampleTitle": "Exemple résolu — le découpage du lycée Jean-Moulin",
    "goal": "Construire un plan VLSM complet : choisir chaque masque par ordre décroissant et aligner les blocs sans chevauchement.",
    "brief": "<p><strong>Énoncé.</strong> TransGaz, distributeur d'énergie, reçoit pour son siège le bloc <code>192.168.60.0/24</code>. Les services à adresser sont les suivants :</p><table><tr><th>Besoin</th><th>Hôtes à raccorder</th></tr><tr><th>Production (bâtiment A)</th><td>100</td></tr><tr><th>Comptabilité</th><td>50</td></tr><tr><th>Commercial</th><td>25</td></tr><tr><th>Serveurs internes</th><td>12</td></tr><tr><th>Trois liaisons WAN point-à-point</th><td>2 routeurs chacune</td></tr></table><p>Rappel du cours (règle d'or VLSM) : traiter les besoins par ordre décroissant ; pour chaque besoin, la plus petite puissance de 2 telle que 2^k − 2 soit supérieure ou égale au nombre d'hôtes ; chaque sous-réseau démarre à la frontière suivante du bloc précédent. Répondez par l'adresse ou le nombre exact.</p><ol><li>Quelle longueur de préfixe attribuer à Production (100 hôtes) ?</li><li>Quelle est l'adresse réseau du sous-réseau Comptabilité ?</li><li>Quelle est l'adresse de diffusion du sous-réseau Commercial ?</li><li>Combien d'hôtes utiles le sous-réseau Serveurs offre-t-il ?</li><li>Quelle est l'adresse réseau de la deuxième liaison WAN ?</li><li>Après la dernière liaison WAN, combien d'adresses du /24 restent inutilisées ?</li></ol>",
    "starter": "# Exercice — Le découpage VLSM du siège de TransGaz\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par l'adresse ou le nombre exact, sans commentaire.\n\n[Question 1 — Préfixe de Production (100 hôtes)]\nA_COMPLETER\n\n[Question 2 — Adresse réseau de Comptabilité]\nA_COMPLETER\n\n[Question 3 — Diffusion du sous-réseau Commercial]\nA_COMPLETER\n\n[Question 4 — Hôtes utiles du sous-réseau Serveurs]\nA_COMPLETER\n\n[Question 5 — Adresse réseau de la deuxième liaison WAN]\nA_COMPLETER\n\n[Question 6 — Adresses restant inutilisées]\nA_COMPLETER\n",
    "hints": [
      "Triez d'abord : 100, 50, 25, 12, puis les trois /30. Pour 100 hôtes, 2^6 − 2 = 62 est insuffisant : il faut 2^7 − 2 = 126, donc /25.",
      "Chaque bloc démarre à la frontière suivante : après le /25 (0-127), le /26 de Comptabilité occupe 128-191, le /27 de Commercial 192-223, le /28 des serveurs 224-239.",
      "Les liaisons /30 se partagent la fin du /24 par pas de 4 : première 240-243, deuxième 244-247, troisième 248-251 ; le reste du bloc est inutilisé."
    ],
    "examples": [
      {
        "stdin": "Le lycée Jean-Moulin découpe son bloc 172.31.8.0/24 pour trois besoins, puis deux liaisons WAN.\nSalle informatique : 60 postes ; CDI : 25 postes ; administration : 10 postes ; deux /30.\n\n1) Salle informatique, 60 postes : 2^6 − 2 = 62 suffit (2^5 − 2 = 30 serait insuffisant) : /26, bloc 0-63.\n2) CDI, 25 postes : /27 (30 ≥ 25), bloc 64-95, diffusion 172.31.8.95.\n3) Administration, 10 postes : /28 (14 ≥ 10), bloc 96-111.\n4) WAN 1 : 172.31.8.112/30 (112-115) ; WAN 2 : 172.31.8.116/30 (116-119).\n5) Reste inutilisé : de 120 à 255, soit 136 adresses.",
        "expected": "salle /26 — CDI /27 diffusion 172.31.8.95 — admin /28 — WAN 172.31.8.112 et .116 — reste 136 adresses",
        "note": "Chaque sous-réseau démarre à la frontière suivante du précédent : aucun chevauchement, aucune perte d'alignement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Préfixe de Production (100 hôtes)",
        "stdin": "q:1",
        "expected": "/25||25||255.255.255.128"
      },
      {
        "label": "Question 2 — Adresse réseau de Comptabilité",
        "stdin": "q:2",
        "expected": "192.168.60.128"
      },
      {
        "label": "Question 3 — Diffusion du sous-réseau Commercial",
        "stdin": "q:3",
        "expected": "192.168.60.223"
      },
      {
        "label": "Question 4 — Hôtes utiles du sous-réseau Serveurs",
        "stdin": "q:4",
        "expected": "14"
      },
      {
        "label": "Question 5 — Adresse réseau de la deuxième liaison WAN",
        "stdin": "q:5",
        "expected": "192.168.60.244"
      },
      {
        "label": "Question 6 — Adresses restant inutilisées",
        "stdin": "q:6",
        "expected": "4"
      }
    ],
    "solution": "[Question 1 — Préfixe de Production (100 hôtes)]\n/25\n\n[Question 2 — Adresse réseau de Comptabilité]\n192.168.60.128\n\n[Question 3 — Diffusion du sous-réseau Commercial]\n192.168.60.223\n\n[Question 4 — Hôtes utiles du sous-réseau Serveurs]\n14\n\n[Question 5 — Adresse réseau de la deuxième liaison WAN]\n192.168.60.244\n\n[Question 6 — Adresses restant inutilisées]\n4",
    "takeaway": "1) Production, 100 hôtes : 2^6 − 2 = 62 est insuffisant, 2^7 − 2 = 126 convient : /25 (192.168.60.0/25, bloc 0-127).\n2) Comptabilité, 50 hôtes : /26 (62 ≥ 50), bloc 128-191 : adresse réseau 192.168.60.128.\n3) Commercial, 25 hôtes : /27 (30 ≥ 25), bloc 192-223 : diffusion 192.168.60.223.\n4) Serveurs, 12 hôtes : /28 (14 ≥ 12), bloc 224-239 : 14 hôtes utiles.\n5) Les trois /30 se suivent : 240-243, 244-247, 248-251. La deuxième liaison WAN démarre à 192.168.60.244.\n6) La dernière adresse utilisée est 251 : il reste 252-255, soit 4 adresses inutilisées.\nContrôle : 128 + 64 + 32 + 16 + 4 + 4 + 4 = 252, et le /24 s'arrête à 255 : l'alignement des blocs est exact, sans chevauchement."
  }
];
