'use strict';

module.exports = [
  {
    "id": "lan3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "L'élection du maître VRRP du site de production de Vellum",
    "exampleTitle": "Exemple résolu — le VRRP du siège de Papermühle",
    "goal": "Élire le routeur maître VRRP d'un site réel en appliquant la priorité, la préemption et le départage par adresse IP.",
    "brief": "<p><strong>Énoncé.</strong> Vellum Industries fabrique du papier technique sur un site isolé. Le VLAN 40 (production) sort vers le réseau d'entreprise via deux routeurs redondants configurés en VRRP (groupe 40). Les postes utilisent l'adresse virtuelle 10.40.0.1 comme passerelle :</p><table><tr><th>Routeur</th><th>Priorité VRRP</th><th>Adresse IP physique</th><th>Préemption</th></tr><tr><th>R-PRIM</th><td>150</td><td>10.40.0.2</td><td>activée</td></tr><tr><th>R-SEC</th><td>100</td><td>10.40.0.3</td><td>activée</td></tr></table><p>Rappel du cours : dans VRRP, le routeur de priorité la plus élevée devient maître (Master) et détient l'adresse IP virtuelle ; à priorités égales, l'adresse IP physique la plus élevée l'emporte ; avec la préemption activée, un routeur de priorité supérieure qui revient reprend le rôle de maître. La priorité appliquée par défaut, si aucune n'est configurée, est 100.</p><p>Répondez par le nom exact du routeur (questions 1, 3 et 5), le nombre seul (question 2), ou « oui » / « non » (question 4).</p><ol><li>Quel routeur est élu maître du groupe 40 au démarrage ?</li><li>Quelle priorité VRRP est appliquée quand aucune priorité n'est configurée ?</li><li>R-PRIM tombe en panne : quel routeur devient maître ?</li><li>R-PRIM revient à la normale : redevient-il maître ?</li><li>Le technicien aligne la priorité de R-SEC sur 150 : quel routeur devient maître après convergence ?</li></ol>",
    "starter": "# Exercice — L'élection du maître VRRP du site de production de Vellum\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 5 : le nom du routeur. Question 2 : le nombre seul.\n# Question 4 : oui ou non.\n\n[Question 1 — Maître VRRP au démarrage]\nA_COMPLETER\n\n[Question 2 — Priorité par défaut de VRRP]\nA_COMPLETER\n\n[Question 3 — Maître pendant la panne de R-PRIM]\nA_COMPLETER\n\n[Question 4 — R-PRIM redevient-il maître à son retour ?]\nA_COMPLETER\n\n[Question 5 — Maître après alignement des priorités à 150]\nA_COMPLETER\n",
    "hints": [
      "L'élection VRRP cherche la priorité la plus élevée, contrairement à STP qui cherche la plus petite valeur.",
      "La préemption permet à un routeur revenu avec une meilleure priorité de reprendre la main sans attendre l'expiration du maître actuel.",
      "1. Comparez 150 et 100. 2. La valeur par défaut est fixée par la norme. 3. Le routeur survivant devient maître. 4. La préemption est activée. 5. À priorités égales, l'adresse IP physique la plus élevée l'emporte."
    ],
    "examples": [
      {
        "stdin": "Le siège de Papermühle exploite deux routeurs VRRP sur le VLAN 25.\nR-P : priorité 120, IP 10.25.0.2 ; R-S : priorité 120, IP 10.25.0.3.\nLes postes utilisent la passerelle virtuelle 10.25.0.1.\n\n1) Priorités égales (120) : le départage se fait sur l'adresse IP physique.\n2) 10.25.0.3 > 10.25.0.2 : R-S devient maître.\n3) La priorité par défaut, sans configuration, est 100.\n4) Si R-P monte à 200 avec préemption, il redevient maître.",
        "expected": "maître : R-S (IP la plus élevée) — priorité par défaut : 100 — après passage à 200 : R-P maître",
        "note": "VRRP départage les égalités par l'adresse IP la plus élevée, contrairement à STP qui utilise la plus petite valeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Maître VRRP au démarrage",
        "stdin": "q:1",
        "expected": "R-PRIM||le routeur R-PRIM||RPRIM"
      },
      {
        "label": "Question 2 — Priorité par défaut de VRRP",
        "stdin": "q:2",
        "expected": "100"
      },
      {
        "label": "Question 3 — Maître pendant la panne de R-PRIM",
        "stdin": "q:3",
        "expected": "R-SEC||le routeur R-SEC||RSEC"
      },
      {
        "label": "Question 4 — R-PRIM redevient-il maître à son retour ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Maître après alignement des priorités à 150",
        "stdin": "q:5",
        "expected": "R-SEC||le routeur R-SEC||RSEC"
      }
    ],
    "solution": "[Question 1 — Maître VRRP au démarrage]\nR-PRIM\n\n[Question 2 — Priorité par défaut de VRRP]\n100\n\n[Question 3 — Maître pendant la panne de R-PRIM]\nR-SEC\n\n[Question 4 — R-PRIM redevient-il maître à son retour ?]\noui\n\n[Question 5 — Maître après alignement des priorités à 150]\nR-SEC",
    "takeaway": "1) R-PRIM affiche la priorité la plus élevée (150 contre 100) : il est élu maître du groupe 40 et détient l'adresse virtuelle 10.40.0.1.\n2) La priorité VRRP appliquée par défaut est 100.\n3) Pendant la panne de R-PRIM, R-SEC est le seul candidat : il devient maître.\n4) Oui : la préemption est activée et R-PRIM revient avec une priorité supérieure (150), il reprend le rôle de maître.\n5) Avec deux priorités égales à 150, le départage se fait sur l'adresse IP physique la plus élevée : 10.40.0.3 > 10.40.0.2, donc R-SEC devient maître.\nContrôle : dans les deux situations (départ et alignement à 150), un seul routeur détient l'adresse virtuelle 10.40.0.1."
  },
  {
    "id": "lan3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La bascule HSRP du siège de Transversale",
    "exampleTitle": "Exemple résolu — la bascule HSRP de l'agence de Port-Rolland",
    "goal": "Calculer l'effet du suivi d'interface (object tracking) sur la priorité HSRP et prévoir les bascules du routeur actif.",
    "brief": "<p><strong>Énoncé.</strong> Transversale, courtier en assurance de 600 salariés, concentre son trafic Internet au siège. Deux routeurs HSRP (groupe 1, VLAN 100) servent de passerelle : R-A (priorité 120) et R-B (priorité 100), tous deux avec la préemption activée. L'adresse virtuelle est 10.100.0.1. Pour réagir aux pannes de liens montants, R-A surveille d'abord son interface WAN Gi0/0 avec un décrément de 40, puis on lui ajoute le suivi du lien DMZ Gi0/1 avec un décrément de 15.</p><p>Rappel du cours : en HSRP, le routeur de priorité la plus élevée devient actif ; chaque interface suivie qui tombe retranche son décrément de la priorité du routeur ; avec la préemption, la bascule se produit dès que la priorité effective d'un routeur repasse au-dessus de celle de l'autre.</p><p>Répondez par le nombre seul (questions 1, 2 et 5) ou le nom du routeur (questions 3 et 4).</p><ol><li>Quelle est la priorité effective de R-A en fonctionnement normal ?</li><li>Le lien WAN Gi0/0 tombe : quelle est la priorité effective de R-A ?</li><li>Dans cette situation, quel routeur détient le rôle actif ?</li><li>Le lien WAN est rétabli : quel routeur redevient actif ?</li><li>WAN et DMZ tombent simultanément : quelle est la priorité effective de R-A ?</li></ol>",
    "starter": "# Exercice — La bascule HSRP du siège de Transversale\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 5 : le nombre seul. Questions 3 et 4 : le nom du routeur.\n\n[Question 1 — Priorité effective de R-A en fonctionnement normal]\nA_COMPLETER\n\n[Question 2 — Priorité de R-A après la panne du WAN]\nA_COMPLETER\n\n[Question 3 — Routeur actif pendant la panne du WAN]\nA_COMPLETER\n\n[Question 4 — Routeur actif après le rétablissement du WAN]\nA_COMPLETER\n\n[Question 5 — Priorité de R-A si WAN et DMZ tombent]\nA_COMPLETER\n",
    "hints": [
      "En fonctionnement normal, aucune interface suivie n'est tombée : la priorité effective est la priorité configurée.",
      "Chaque interface suivie tombée retranche son décrément : 120 − 40 pour le WAN seul, puis encore − 15 pour la DMZ.",
      "1. Priorité configurée. 2. 120 − 40. 3. Comparez le résultat à la priorité de R-B (100). 4. La préemption rend la main au routeur de priorité supérieure. 5. Les décréments s'additionnent."
    ],
    "examples": [
      {
        "stdin": "L'agence de Port-Rolland exploite deux routeurs HSRP.\nR-1 : priorité 130, préemption ; R-2 : priorité 110.\nR-1 surveille son lien WAN avec un décrément de 50, puis un lien SAV avec un décrément de 20.\n\n1) Fonctionnement normal : priorité effective de R-1 = 130.\n2) WAN tombé : 130 − 50 = 80, sous 110 → R-2 devient actif.\n3) WAN rétabli : R-1 revient à 130 et redevient actif (préemption).\n4) WAN + SAV tombés : 130 − 50 − 20 = 60.",
        "expected": "normal : 130 — WAN tombé : 80, R-2 actif — retour du WAN : R-1 actif — double panne : 60",
        "note": "Les décréments s'additionnent : chaque interface suivie tombée retranche sa propre valeur de la priorité de base."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Priorité effective de R-A en fonctionnement normal",
        "stdin": "q:1",
        "expected": "120"
      },
      {
        "label": "Question 2 — Priorité de R-A après la panne du WAN",
        "stdin": "q:2",
        "expected": "80"
      },
      {
        "label": "Question 3 — Routeur actif pendant la panne du WAN",
        "stdin": "q:3",
        "expected": "R-B||le routeur R-B||RB"
      },
      {
        "label": "Question 4 — Routeur actif après le rétablissement du WAN",
        "stdin": "q:4",
        "expected": "R-A||le routeur R-A||RA"
      },
      {
        "label": "Question 5 — Priorité de R-A si WAN et DMZ tombent",
        "stdin": "q:5",
        "expected": "65"
      }
    ],
    "solution": "[Question 1 — Priorité effective de R-A en fonctionnement normal]\n120\n\n[Question 2 — Priorité de R-A après la panne du WAN]\n80\n\n[Question 3 — Routeur actif pendant la panne du WAN]\nR-B\n\n[Question 4 — Routeur actif après le rétablissement du WAN]\nR-A\n\n[Question 5 — Priorité de R-A si WAN et DMZ tombent]\n65",
    "takeaway": "1) Aucune interface suivie n'est tombée : la priorité effective de R-A vaut 120.\n2) La chute du WAN retranche 40 : 120 − 40 = 80.\n3) R-A (80) passe sous la priorité de R-B (100) : R-B devient le routeur actif.\n4) Le WAN rétabli, R-A revient à 120 et, la préemption étant activée, il redevient actif.\n5) WAN et DMZ tombés : 120 − 40 − 15 = 65.\nContrôle : 80 < 100 explique la bascule ; 120 > 100 explique le retour ; 65 < 100 maintiendrait R-B actif."
  },
  {
    "id": "lan3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "L'équilibrage GLBP du campus d'Aurelia",
    "exampleTitle": "Exemple résolu — le GLBP du centre de recherche de Néovia",
    "goal": "Répartir la charge entre passerelles virtuelles GLBP : élection de l'AVG, nombre de MAC virtuelles, parts de trafic selon les poids et reprise après panne.",
    "brief": "<p><strong>Énoncé.</strong> Aurelia, école d'ingénieurs de 3 000 étudiants, dessert ses amphithéâtres via trois routeurs GLBP (groupe 10). Chaque hôte conserve une passerelle virtuelle unique (10.10.0.1), mais l'AVG distribue des adresses MAC virtuelles distinctes pour équilibrer les flux. La configuration est la suivante :</p><table><tr><th>Routeur</th><th>Priorité GLBP</th><th>Poids (weight)</th></tr><tr><th>R1</th><td>200</td><td>100</td></tr><tr><th>R2</th><td>150</td><td>100</td></tr><tr><th>R3</th><td>150</td><td>50</td></tr></table><p>Rappel du cours : GLBP élit une passerelle virtuelle active (AVG) parmi les priorités les plus élevées ; tous les routeurs du groupe servent de passerelle virtuelle (AVF) et reçoivent chacun une adresse MAC virtuelle. En équilibrage pondéré (weighted), la part de trafic d'un AVF est proportionnelle à son poids rapporté à la somme des poids des AVF actifs.</p><p>Répondez par le nom du routeur (questions 1) ou le nombre seul (questions 2 à 5, parts en pourcentage).</p><ol><li>Quel routeur est élu AVG du groupe 10 ?</li><li>Combien d'adresses MAC virtuelles le groupe expose-t-il aux hôtes ?</li><li>Quelle part du trafic (en %) R1 reçoit-il ?</li><li>Quelle part du trafic (en %) R3 reçoit-il ?</li><li>R3 tombe en panne : quelle part du trafic (en %) R1 reçoit-il désormais ?</li></ol>",
    "starter": "# Exercice — L'équilibrage GLBP du campus d'Aurelia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom du routeur. Questions 2 à 5 : le nombre seul (parts en %).\n\n[Question 1 — AVG du groupe 10]\nA_COMPLETER\n\n[Question 2 — Nombre d'adresses MAC virtuelles]\nA_COMPLETER\n\n[Question 3 — Part du trafic de R1 (en %)]\nA_COMPLETER\n\n[Question 4 — Part du trafic de R3 (en %)]\nA_COMPLETER\n\n[Question 5 — Part du trafic de R1 après la panne de R3 (en %)]\nA_COMPLETER\n",
    "hints": [
      "L'AVG est le routeur de priorité la plus élevée du groupe ; il attribue ensuite les adresses MAC virtuelles aux AVF.",
      "Chaque AVF actif reçoit une adresse MAC virtuelle : comptez les routeurs du groupe.",
      "1. Comparez 200, 150 et 150. 2. Un AVF = une MAC virtuelle. 3. Part = poids / somme des poids, soit 100 / 250. 4. 50 / 250. 5. Après la panne, la somme des poids ne compte plus que R1 et R2."
    ],
    "examples": [
      {
        "stdin": "Le centre de recherche de Néovia exploite trois routeurs GLBP (groupe 5).\nR-A : priorité 250, poids 60 ; R-B : priorité 200, poids 60 ; R-C : priorité 150, poids 30.\n\n1) L'AVG est le routeur de priorité la plus élevée : R-A.\n2) Chaque AVF reçoit une MAC virtuelle : 3 adresses.\n3) Somme des poids : 150 ; part de R-A : 60/150 = 40 % (R-B : 40 %, R-C : 20 %).\n4) R-C tombe : somme des poids 120 ; part de R-A : 60/120 = 50 %.",
        "expected": "AVG : R-A — 3 MAC virtuelles — part de R-A : 40 % — après panne de R-C : 50 %",
        "note": "Avec trois AVF actifs, chaque hôte reçoit l'une des trois MAC virtuelles : la charge suit les poids, pas le nombre d'hôtes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — AVG du groupe 10",
        "stdin": "q:1",
        "expected": "R1||le routeur R1||R 1"
      },
      {
        "label": "Question 2 — Nombre d'adresses MAC virtuelles",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Part du trafic de R1 (en %)",
        "stdin": "q:3",
        "expected": "40||40 %||40%"
      },
      {
        "label": "Question 4 — Part du trafic de R3 (en %)",
        "stdin": "q:4",
        "expected": "20||20 %||20%"
      },
      {
        "label": "Question 5 — Part du trafic de R1 après la panne de R3 (en %)",
        "stdin": "q:5",
        "expected": "50||50 %||50%"
      }
    ],
    "solution": "[Question 1 — AVG du groupe 10]\nR1\n\n[Question 2 — Nombre d'adresses MAC virtuelles]\n3\n\n[Question 3 — Part du trafic de R1 (en %)]\n40\n\n[Question 4 — Part du trafic de R3 (en %)]\n20\n\n[Question 5 — Part du trafic de R1 après la panne de R3 (en %)]\n50",
    "takeaway": "1) La priorité la plus élevée est 200 : R1 est élu AVG du groupe 10.\n2) Les trois routeurs sont des AVF : le groupe expose 3 adresses MAC virtuelles aux hôtes.\n3) Somme des poids : 100 + 100 + 50 = 250 ; part de R1 : 100/250 = 40 %.\n4) Part de R3 : 50/250 = 20 %.\n5) R3 tombé, la somme des poids actifs vaut 100 + 100 = 200 ; part de R1 : 100/200 = 50 %.\nContrôle : 40 % + 40 % + 20 % = 100 % avant la panne ; 50 % + 50 % = 100 % après la panne de R3."
  }
];
