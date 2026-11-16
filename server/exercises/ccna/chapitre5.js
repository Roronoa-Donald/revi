'use strict';

module.exports = [
  {
    "id": "na2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "La table de routage du routeur du siège de Verger&Co",
    "exampleTitle": "Exemple résolu — la table du routeur de NordMob",
    "goal": "Lire une sortie show ip route : codes d'origine, prochain saut, distance administrative et route par défaut.",
    "brief": "<p><strong>Énoncé.</strong> Verger&Co, conserverie de 300 salariés, interconnecte ses services derrière le routeur du siège. L'administrateur saisit <code>show ip route</code> et obtient la sortie suivante :</p><pre>C    192.168.1.0/24 is directly connected, GigabitEthernet0/0\nL    192.168.1.254/32 is directly connected, GigabitEthernet0/0\nC    192.168.2.0/24 is directly connected, GigabitEthernet0/1\nS    10.0.0.0/8 [1/0] via 192.168.2.2\nO    172.16.0.0/16 [110/20] via 192.168.2.2\nS*   0.0.0.0/0 [1/0] via 203.0.113.254</pre><p>Rappel du cours : C = directement connectée, S = statique, O = OSPF, S* = route par défaut ; le premier nombre entre crochets est la distance administrative. Répondez par le mot, l'adresse ou le nombre exact.</p><ol><li>Combien de réseaux directement connectés (code C) la table contient-elle ?</li><li>Quelle est l'origine de la route 10.0.0.0/8, précédée du code S ?</li><li>Quel est le prochain saut (next-hop) de la route 10.0.0.0/8 ?</li><li>Quelle est la distance administrative d'une route statique ?</li><li>Que dessert la route S* 0.0.0.0/0 ?</li></ol>",
    "starter": "# Exercice — La table de routage du routeur du siège de Verger&Co\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot, l'adresse ou le nombre exact, sans commentaire.\n\n[Question 1 — Réseaux directement connectés]\nA_COMPLETER\n\n[Question 2 — Origine de la route 10.0.0.0/8]\nA_COMPLETER\n\n[Question 3 — Prochain saut de 10.0.0.0/8]\nA_COMPLETER\n\n[Question 4 — Distance administrative d'une route statique]\nA_COMPLETER\n\n[Question 5 — Rôle de la route S* 0.0.0.0/0]\nA_COMPLETER\n",
    "hints": [
      "Chaque ligne commence par une lettre : elle indique la famille de la route, pas sa destination.",
      "Le prochain saut se lit après « via » : c'est l'adresse à laquelle le paquet est remis pour atteindre le réseau annoncé.",
      "La distance administrative d'une statique vaut 1 ; l'étoile de S* signale la route candidate par défaut, celle qui attrape tout paquet sans route plus précise."
    ],
    "examples": [
      {
        "stdin": "Chez NordMob, show ip route renvoie :\nC 10.9.1.0/24 connected, Gi0/0 ; C 10.9.2.0/24 connected, Gi0/1 ; C 10.9.3.0/24 connected, Gi0/2 ;\nO 172.20.0.0/16 [110/20] via 10.9.2.2 ; S 192.168.5.0/24 [1/0] via 10.9.3.2 ; S* 0.0.0.0/0 [1/0] via 198.51.100.254.\n\n1) Trois réseaux directement connectés (C).\n2) 172.20.0.0/16 vient d'OSPF (O), distance administrative 110.\n3) La route statique 192.168.5.0/24 passe par le prochain saut 10.9.3.2.\n4) La route par défaut S* renvoie tout le reste vers 198.51.100.254.",
        "expected": "3 réseaux connectés — OSPF AD 110 — statique via 10.9.3.2 — défaut vers 198.51.100.254",
        "note": "La lettre en tête résume l'origine ; les crochets [AD/métrique] précisent la confiance accordée à la source."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Réseaux directement connectés",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Origine de la route 10.0.0.0/8",
        "stdin": "q:2",
        "expected": "une route statique||route statique||une route statique configurée manuellement||statique"
      },
      {
        "label": "Question 3 — Prochain saut de 10.0.0.0/8",
        "stdin": "q:3",
        "expected": "192.168.2.2||via 192.168.2.2"
      },
      {
        "label": "Question 4 — Distance administrative d'une route statique",
        "stdin": "q:4",
        "expected": "1||une distance administrative de 1"
      },
      {
        "label": "Question 5 — Rôle de la route S* 0.0.0.0/0",
        "stdin": "q:5",
        "expected": "la route par défaut||la route par défaut (passerelle de dernier recours)||la passerelle de dernier recours||le trafic sans route spécifique"
      }
    ],
    "solution": "[Question 1 — Réseaux directement connectés]\n2\n\n[Question 2 — Origine de la route 10.0.0.0/8]\nune route statique\n\n[Question 3 — Prochain saut de 10.0.0.0/8]\n192.168.2.2\n\n[Question 4 — Distance administrative d'une route statique]\n1\n\n[Question 5 — Rôle de la route S* 0.0.0.0/0]\nla route par défaut",
    "takeaway": "1) Deux lignes commencent par C : 192.168.1.0/24 et 192.168.2.0/24 (la ligne L est une route hôte local, pas un réseau connecté).\n2) Le code S désigne une route statique, configurée manuellement par l'administrateur.\n3) La route 10.0.0.0/8 passe « via 192.168.2.2 » : c'est le prochain saut.\n4) Une route statique a une distance administrative de 1 (premier nombre entre crochets : [1/0]).\n5) S* 0.0.0.0/0 est la route par défaut : la passerelle de dernier recours qui achemine tout paquet sans route plus spécifique, ici vers Internet.\nContrôle : AD lues dans les crochets — 1 pour S et S*, 110 pour O : plus la distance est petite, plus la source est jugée fiable."
  },
  {
    "id": "na2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "L'aiguillage des paquets par plus long préfixe chez BreizhNet",
    "exampleTitle": "Exemple résolu — l'aiguillage de l'aquarium municipal",
    "goal": "Appliquer le Longest Prefix Match à quatre paquets réels et justifier le choix face à la distance administrative.",
    "brief": "<p><strong>Énoncé.</strong> L'opérateur régional BreizhNet relaie le trafic de ses clients depuis le routeur <code>R-AGENCE</code>, dont voici la table de routage :</p><pre>C    10.1.1.0/24 is directly connected, GigabitEthernet0/0\nO    10.1.0.0/24 [110/20] via 192.168.2.1\nS    10.0.0.0/16 [1/0] via 192.168.1.1\nS*   0.0.0.0/0 [1/0] via 203.0.113.254</pre><p>Quatre paquets arrivent consécutivement sur R-AGENCE, avec les destinations suivantes :</p><table><tr><th>Paquet</th><th>Destination</th></tr><tr><th>1</th><td>10.1.1.50</td></tr><tr><th>2</th><td>10.1.0.200</td></tr><tr><th>3</th><td>10.2.0.10</td></tr><tr><th>4</th><td>8.8.8.8</td></tr></table><p>Rappel du cours : parmi toutes les routes qui englobent la destination, la route au préfixe le plus long est choisie, quelle que soit sa distance administrative. Répondez par la route, l'adresse ou le mot exact.</p><ol><li>Quelle route achemine le paquet 1 (destination 10.1.1.50) ?</li><li>Quelle route achemine le paquet 2 (destination 10.1.0.200) ?</li><li>Pourquoi la route OSPF est-elle préférée à la statique /16 pour le paquet 2 ?</li><li>Quel prochain saut achemine le paquet 3 (destination 10.2.0.10) ?</li><li>Quelle route achemine le paquet 4 (destination 8.8.8.8) ?</li></ol>",
    "starter": "# Exercice — L'aiguillage des paquets par plus long préfixe chez BreizhNet\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par la route, l'adresse ou le mot exact, sans commentaire.\n\n[Question 1 — Route du paquet 1 (10.1.1.50)]\nA_COMPLETER\n\n[Question 2 — Route du paquet 2 (10.1.0.200)]\nA_COMPLETER\n\n[Question 3 — Pourquoi l'OSPF est préférée à la statique /16]\nA_COMPLETER\n\n[Question 4 — Prochain saut du paquet 3 (10.2.0.10)]\nA_COMPLETER\n\n[Question 5 — Route du paquet 4 (8.8.8.8)]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque destination, listez d'abord toutes les routes dont le réseau englobe l'adresse, puis ne gardez que la plus spécifique.",
      "10.1.1.50 est couvert par trois routes (C /24, S /16, S* /0) : la plus longue est la /24 connectée ; 10.1.0.200 est couvert par la O /24 et la S /16.",
      "8.8.8.8 n'est couvert par aucune route spécifique : seul le /0 par défaut peut l'attraper ; 10.2.0.10 n'est couvert que par la /16."
    ],
    "examples": [
      {
        "stdin": "L'aquarium municipal aiguille ses paquets depuis la table suivante :\nC 172.16.1.0/24 connected, Gi0/0 ; O 172.16.2.0/24 [110/20] via 172.16.9.2 ; S 172.16.0.0/16 [1/0] via 172.16.9.3 ; S* 0.0.0.0/0 [1/0] via 198.51.100.254.\n\n1) 172.16.1.9 : couvert par C /24, O /24 ? non (bloc 172.16.2.x), S /16 et S* /0 — le /24 connecté gagne.\n2) 172.16.2.9 : couvert par O /24 et S /16 — le /24 OSPF gagne, via 172.16.9.2, bien que son AD soit 110 contre 1.\n3) 172.16.9.9 : couvert par S /16 seulement — prochain saut 172.16.9.3.\n4) 1.1.1.1 : aucune route spécifique — la route par défaut l'attrape.",
        "expected": "172.16.1.9 : route connectée — 172.16.2.9 : OSPF /24 (AD 110 > 1, mais préfixe plus long) — 172.16.9.9 : statique /16 — 1.1.1.1 : défaut",
        "note": "Le LPM l'emporte toujours sur la distance administrative ; l'AD ne départage que des préfixes de même longueur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Route du paquet 1 (10.1.1.50)",
        "stdin": "q:1",
        "expected": "la route connectée 10.1.1.0/24||C 10.1.1.0/24||la route connectée (Gi0/0)||10.1.1.0/24"
      },
      {
        "label": "Question 2 — Route du paquet 2 (10.1.0.200)",
        "stdin": "q:2",
        "expected": "la route OSPF 10.1.0.0/24||O 10.1.0.0/24||la route OSPF 10.1.0.0/24 via 192.168.2.1||O 10.1.0.0/24 via 192.168.2.1"
      },
      {
        "label": "Question 3 — Pourquoi l'OSPF est préférée à la statique /16",
        "stdin": "q:3",
        "expected": "son préfixe est plus long||parce que son préfixe /24 est plus long que /16||le préfixe est plus long||le masque est plus spécifique||le préfixe /24 est plus long"
      },
      {
        "label": "Question 4 — Prochain saut du paquet 3 (10.2.0.10)",
        "stdin": "q:4",
        "expected": "192.168.1.1||via 192.168.1.1"
      },
      {
        "label": "Question 5 — Route du paquet 4 (8.8.8.8)",
        "stdin": "q:5",
        "expected": "la route par défaut||S* 0.0.0.0/0||la route par défaut S*||0.0.0.0/0 via 203.0.113.254"
      }
    ],
    "solution": "[Question 1 — Route du paquet 1 (10.1.1.50)]\nla route connectée 10.1.1.0/24\n\n[Question 2 — Route du paquet 2 (10.1.0.200)]\nla route OSPF 10.1.0.0/24\n\n[Question 3 — Pourquoi l'OSPF est préférée à la statique /16]\nson préfixe est plus long\n\n[Question 4 — Prochain saut du paquet 3 (10.2.0.10)]\n192.168.1.1\n\n[Question 5 — Route du paquet 4 (8.8.8.8)]\nla route par défaut",
    "takeaway": "1) 10.1.1.50 est englobé par la C /24, la S /16 et la S* /0 : la plus longue est la route connectée 10.1.1.0/24 (Gi0/0).\n2) 10.1.0.200 est englobé par la O /24 et la S /16 : la plus longue est la route OSPF 10.1.0.0/24, via 192.168.2.1.\n3) Le préfixe /24 est plus long que le /16 : le Longest Prefix Match l'emporte sur la distance administrative (110 contre 1).\n4) 10.2.0.10 n'est couvert que par la statique 10.0.0.0/16 : prochain saut 192.168.1.1.\n5) 8.8.8.8 n'est couvert par aucune route spécifique : la route par défaut S* 0.0.0.0/0 l'achemine via 203.0.113.254.\nContrôle : chaque paquet a été couvert par au moins une route (sinon le routeur renverrait « unreachable ») ; dans chaque cas, le préfixe retenu est le plus long parmi les candidats."
  },
  {
    "id": "na2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Les routes statiques entre le siège et la succursale de MeublesDomus",
    "exampleTitle": "Exemple résolu — l'interconnexion de la maison de retraite Les-Tilleuls",
    "goal": "Écrire les routes statiques d'une interconnexion réelle, résumer deux LAN contigus et régler une route flottante.",
    "brief": "<p><strong>Énoncé.</strong> MeublesDomus, fabricant de cuisines, exploite un siège et une succursale récente. Le plan d'adressage validé est le suivant :</p><table><tr><th>Élément</th><th>Réseau</th><th>Détail</th></tr><tr><th>LAN du siège</th><td>192.168.16.0/24</td><td>derrière R1</td></tr><tr><th>LAN de la succursale</th><td>192.168.17.0/24</td><td>derrière R2</td></tr><tr><th>Liaison R1–R2</th><td>10.0.12.0/30</td><td>R1 = 10.0.12.1, R2 = 10.0.12.2</td></tr><tr><th>Lien FAI du siège</th><td>203.0.113.0/24</td><td>passerelle du FAI = 203.0.113.254</td></tr></table><p>Pour la haute disponibilité, un lien 4G de secours peut relayer la liaison R1–R2 via un routeur mobile ; la route du lien principal garde sa distance administrative par défaut. Répondez par la commande, l'adresse ou le mot exact.</p><ol><li>Écrivez la route statique à configurer sur R1 pour joindre le LAN de la succursale (format : ip route réseau masque prochain-saut).</li><li>Écrivez la route par défaut à configurer sur R2.</li><li>Quel prochain saut R1 utilise-t-il pour joindre 192.168.17.0/24 ?</li><li>Les deux LAN 192.168.16.0/24 et 192.168.17.0/24 sont contigus : quel préfixe unique les résume ?</li><li>Combien d'adresses utiles la liaison 10.0.12.0/30 offre-t-elle ?</li><li>La route statique flottante du lien 4G de secours doit-elle avoir une distance administrative inférieure ou supérieure à celle du lien principal ?</li></ol>",
    "starter": "# Exercice — Les routes statiques entre le siège et la succursale de MeublesDomus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : la commande IOS complète. Autres questions : l'adresse ou le mot exact.\n\n[Question 1 — Route statique de R1 vers le LAN de la succursale]\nA_COMPLETER\n\n[Question 2 — Route par défaut de R2]\nA_COMPLETER\n\n[Question 3 — Prochain saut utilisé par R1 vers 192.168.17.0/24]\nA_COMPLETER\n\n[Question 4 — Préfixe résumant les deux LAN]\nA_COMPLETER\n\n[Question 5 — Adresses utiles de la liaison 10.0.12.0/30]\nA_COMPLETER\n\n[Question 6 — Distance administrative de la route flottante 4G]\nA_COMPLETER\n",
    "hints": [
      "Syntaxe : ip route <réseau> <masque> <prochain saut>. Sur R1, le réseau visé est le LAN de la succursale et le prochain saut est l'adresse de R2 sur la liaison.",
      "Sur R2, tout trafic sortant (y compris vers Internet) passe par R1 : la route par défaut pointe vers l'adresse de R1 sur la liaison.",
      "192.168.16.0 et 192.168.17.0 partagent leurs 23 premiers bits (16 = 00010000, 17 = 00010001) : leur résumé est un /23 ; une /30 réserve 2 bits d'hôte ; une flottante doit rester dormante, donc avec une AD plus élevée que la principale."
    ],
    "examples": [
      {
        "stdin": "La maison de retraite Les-Tilleuls interconnecte son siège (172.24.30.0/24 derrière RA) et son annexe (172.24.31.0/24 derrière RB) via la liaison 10.20.0.0/30 (RA = 10.20.0.1, RB = 10.20.0.2).\n\n1) Sur RA, route vers l'annexe : ip route 172.24.31.0 255.255.255.0 10.20.0.2.\n2) Sur RB, route par défaut : ip route 0.0.0.0 0.0.0.0 10.20.0.1.\n3) Prochain saut de RA vers l'annexe : 10.20.0.2.\n4) Résumé des deux LAN : 172.24.30.0/23.\n5) La /30 offre 2 adresses utiles (2^2 − 2).",
        "expected": "ip route 172.24.31.0 255.255.255.0 10.20.0.2 — défaut vers 10.20.0.1 — résumé 172.24.30.0/23 — 2 adresses",
        "note": "Le résumé /23 n'est possible que parce que les deux /24 sont contigus et alignés sur leur frontière binaire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Route statique de R1 vers le LAN de la succursale",
        "stdin": "q:1",
        "expected": "ip route 192.168.17.0 255.255.255.0 10.0.12.2"
      },
      {
        "label": "Question 2 — Route par défaut de R2",
        "stdin": "q:2",
        "expected": "ip route 0.0.0.0 0.0.0.0 10.0.12.1"
      },
      {
        "label": "Question 3 — Prochain saut utilisé par R1 vers 192.168.17.0/24",
        "stdin": "q:3",
        "expected": "10.0.12.2||via 10.0.12.2"
      },
      {
        "label": "Question 4 — Préfixe résumant les deux LAN",
        "stdin": "q:4",
        "expected": "192.168.16.0/23||un /23 (192.168.16.0/23)"
      },
      {
        "label": "Question 5 — Adresses utiles de la liaison 10.0.12.0/30",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — Distance administrative de la route flottante 4G",
        "stdin": "q:6",
        "expected": "supérieure||plus élevée||supérieure à celle du lien principal||plus élevée que celle du lien principal"
      }
    ],
    "solution": "[Question 1 — Route statique de R1 vers le LAN de la succursale]\nip route 192.168.17.0 255.255.255.0 10.0.12.2\n\n[Question 2 — Route par défaut de R2]\nip route 0.0.0.0 0.0.0.0 10.0.12.1\n\n[Question 3 — Prochain saut utilisé par R1 vers 192.168.17.0/24]\n10.0.12.2\n\n[Question 4 — Préfixe résumant les deux LAN]\n192.168.16.0/23\n\n[Question 5 — Adresses utiles de la liaison 10.0.12.0/30]\n2\n\n[Question 6 — Distance administrative de la route flottante 4G]\nsupérieure",
    "takeaway": "1) Sur R1 : ip route 192.168.17.0 255.255.255.0 10.0.12.2 — le réseau visé est le LAN de la succursale, le prochain saut est l'adresse de R2 sur la liaison.\n2) Sur R2 : ip route 0.0.0.0 0.0.0.0 10.0.12.1 — tout trafic sans route plus précise remonte vers R1.\n3) R1 remet les paquets pour 192.168.17.0/24 à 10.0.12.2.\n4) 192.168.16.0 et 192.168.17.0 sont contigus et alignés : leur résumé est 192.168.16.0/23, de masque 255.255.254.0.\n5) Une /30 réserve 2 bits d'hôte : 2^2 − 2 = 2 adresses utiles, exactement R1 et R2.\n6) La flottante doit rester dormante tant que le lien principal est actif : son AD est rehaussée, donc supérieure à celle du lien principal.\nContrôle : 192.168.16.0/23 couvre 192.168.16.0 à 192.168.17.255, ni plus ni moins ; en cas de coupure du lien principal, la flottante s'injecte d'elle-même dans la table."
  }
];
