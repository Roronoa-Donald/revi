'use strict';

module.exports = [
  {
    "id": "vt3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le flux RSS de la compagnie aérienne TransAéro",
    "exampleTitle": "Exemple résolu — le flux RSS de l'éditeur de logiciels Néoware",
    "goal": "Lire un flux de syndication RSS, repérer l'item le plus récent et distinguer collecte Push et Pull.",
    "brief": "<p><strong>Énoncé.</strong> L'agence de voyages Escapade, 12 salariés, revend les billets de la compagnie régionale TransAéro. L'assistante de l'agence s'est abonnée au flux RSS des communiqués de TransAéro. Ce matin, le flux contenait exactement :</p><p><code>&lt;item&gt;&lt;guid&gt;ta-101&lt;/guid&gt;&lt;title&gt;TransAéro ouvre une liaison directe vers Funchal&lt;/title&gt;&lt;link&gt;https://transaero.example/communiques/101&lt;/link&gt;&lt;pubDate&gt;2025-11-03&lt;/pubDate&gt;&lt;/item&gt;</code><br><code>&lt;item&gt;&lt;guid&gt;ta-102&lt;/guid&gt;&lt;title&gt;TransAéro baisse ses tarifs dernière minute de 12 %&lt;/title&gt;&lt;link&gt;https://transaero.example/communiques/102&lt;/link&gt;&lt;pubDate&gt;2025-11-18&lt;/pubDate&gt;&lt;/item&gt;</code><br><code>&lt;item&gt;&lt;guid&gt;ta-103&lt;/guid&gt;&lt;title&gt;TransAéro remplace ses Boeing par des Airbus A320neo&lt;/title&gt;&lt;link&gt;https://transaero.example/communiques/103&lt;/link&gt;&lt;pubDate&gt;2025-11-10&lt;/pubDate&gt;&lt;/item&gt;</code></p><p>Consignes : les dates s'écrivent au format AAAA-MM-JJ ; les questions 4 et 5 se répondent par un seul mot.</p><ol><li>Combien d'items compte le flux ?</li><li>Quel est le guid de l'item le plus récent ?</li><li>Quelle est la date de publication de l'item ta-103 ?</li><li>S'abonner à ce flux plutôt que de consulter le site chaque matin relève-t-il d'une collecte PUSH ou PULL ?</li><li>La surveillance des tarifs du partenaire aérien relève de quel domaine sectoriel de veille ?</li></ol>",
    "starter": "# Exercice — Le flux RSS de la compagnie aérienne TransAéro\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre d'items du flux]\nA_COMPLETER\n\n[Question 2 — Guid de l'item le plus récent]\nA_COMPLETER\n\n[Question 3 — Date de publication de l'item ta-103]\nA_COMPLETER\n\n[Question 4 — Mode de collecte PUSH ou PULL]\nA_COMPLETER\n\n[Question 5 — Domaine sectoriel concerné]\nA_COMPLETER\n",
    "hints": [
      "Comptez les balises <item> : chacune décrit un communiqué, avec son guid, son titre et sa date.",
      "L'ordre d'apparition dans un flux ne dit rien de la fraîcheur : comparez les pubDate entre elles.",
      "Dans une collecte Push, l'information vient vers le veilleur (alertes, flux) ; en Pull, le veilleur va la chercher. Un partenaire commercial se surveille côté relation clients et fournisseurs."
    ],
    "examples": [
      {
        "stdin": "L'éditeur de logiciels Néoware publie un flux RSS :\n<item><guid>sw-11</guid><title>Néoware publie la version 4.0 de sa suite</title><pubDate>2026-01-05</pubDate></item>\n<item><guid>sw-12</guid><title>Correctif de sécurité critique sur la suite 4.0</title><pubDate>2026-01-12</pubDate></item>\n\nRésolution :\n1) Le flux compte 2 items.\n2) Le plus récent est sw-12 (publié le 2026-01-12, après le 2026-01-05).\n3) La date de sw-11 est le 2026-01-05.\n4) L'abonnement au flux est une collecte PUSH.\n5) Le correctif de sécurité relève de la veille TECHNOLOGIQUE.",
        "expected": "2 items — plus récent sw-12 — PUSH — TECHNOLOGIQUE",
        "note": "Le premier item du flux n'est pas forcément le plus ancien ni le plus récent : la balise pubDate tranche toujours."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'items du flux",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Guid de l'item le plus récent",
        "stdin": "q:2",
        "expected": "ta-102"
      },
      {
        "label": "Question 3 — Date de publication de l'item ta-103",
        "stdin": "q:3",
        "expected": "2025-11-10"
      },
      {
        "label": "Question 4 — Mode de collecte PUSH ou PULL",
        "stdin": "q:4",
        "expected": "PUSH||push"
      },
      {
        "label": "Question 5 — Domaine sectoriel concerné",
        "stdin": "q:5",
        "expected": "COMMERCIALE||commerciale||COMMERCIALE ET FOURNISSEURS||commerciale et fournisseurs"
      }
    ],
    "solution": "[Question 1 — Nombre d'items du flux]\n3\n\n[Question 2 — Guid de l'item le plus récent]\nta-102\n\n[Question 3 — Date de publication de l'item ta-103]\n2025-11-10\n\n[Question 4 — Mode de collecte PUSH ou PULL]\nPUSH\n\n[Question 5 — Domaine sectoriel concerné]\nCOMMERCIALE",
    "takeaway": "1) Le flux contient 3 items : ta-101, ta-102 et ta-103.\n2) Dates : ta-101 le 2025-11-03, ta-102 le 2025-11-18, ta-103 le 2025-11-10. Le plus récent est ta-102.\n3) L'item ta-103 est publié le 2025-11-10.\n4) L'abonnement au flux pousse l'information vers l'agence : collecte PUSH.\n5) TransAéro est un partenaire fournisseur dont Escapade revend les billets : la surveillance de ses tarifs relève de la veille COMMERCIALE.\nContrôle : les trois dates sont distinctes ; 2025-11-18 (ta-102) est postérieure à 2025-11-10 (ta-103), donc le guid le plus récent n'est pas le dernier de la liste."
  },
  {
    "id": "vt3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Le dédoublonnage du portail Villes & Mobilités",
    "exampleTitle": "Exemple résolu — le dédoublonnage du portail Mer & Littoral",
    "goal": "Appliquer l'indice de Jaccard pour détecter des quasi-doublons de titres et nettoyer une URL de ses paramètres de suivi.",
    "brief": "<p><strong>Énoncé.</strong> Le portail d'actualité Villes & Mobilités agrège des flux RSS et des newsletters. Ce matin, trois articles sont arrivés :</p><table><tr><th>Article</th><th>Titre</th></tr><tr><td>A1</td><td>« Lille installe 80 bornes de recharge en centre-ville »</td></tr><tr><td>A2</td><td>« Lille installe 80 bornes de recharge »</td></tr><tr><td>A3</td><td>« Le gouvernement accélère le déploiement des bornes de recharge »</td></tr></table><p>Règles : l'indice de Jaccard compare les ensembles de mots des titres, en minuscules, ponctuation retirée, chaque mot compté une seule fois : J(A, B) = |A ∩ B| / |A ∪ B|. À partir de 0,60, les deux articles sont des quasi-doublons (DOUBLON_TITRE). Par ailleurs, l'URL canonique d'un article supprime les paramètres de suivi utm_*, ref et source, mais conserve les autres paramètres.</p><p>Consignes : les indices s'écrivent avec une virgule, arrondis à deux décimales (par exemple 0,67) ; la question 4 attend le code exact ; la question 6 est une URL exacte.</p><ol><li>Combien de mots distincts compte le titre A1 ?</li><li>Quel est l'indice de Jaccard J(A1, A2) ?</li><li>Quel est l'indice de Jaccard J(A1, A3) ?</li><li>A1 et A2 sont-ils DOUBLON_TITRE ou des articles distincts ?</li><li>Combien d'articles le portail publiera-t-il au final ?</li><li>Écrivez l'URL canonique de « https://villes-mobilites.example/bornes?utm_source=rss&amp;id=41 ».</li></ol>",
    "starter": "# Exercice — Le dédoublonnage du portail Villes & Mobilités\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Nombre de mots distincts du titre A1]\nA_COMPLETER\n\n[Question 2 — Indice de Jaccard J(A1, A2)]\nA_COMPLETER\n\n[Question 3 — Indice de Jaccard J(A1, A3)]\nA_COMPLETER\n\n[Question 4 — Verdict sur A1 et A2]\nA_COMPLETER\n\n[Question 5 — Nombre d'articles publiés]\nA_COMPLETER\n\n[Question 6 — URL canonique nettoyée]\nA_COMPLETER\n",
    "hints": [
      "Listez d'abord les ensembles de mots : A1 = {lille, installe, 80, bornes, de, recharge, en, centre, ville} ; A2 = {lille, installe, 80, bornes, de, recharge}.",
      "J(A1, A2) = 6 / 9 : l'ensemble de A2 est entièrement contenu dans celui de A1. Pour A1 et A3, seuls bornes, de et recharge sont communs.",
      "Un indice au moins égal à 0,60 entraîne la suppression d'un des deux titres ; dans l'URL, seul id=41 est un paramètre métier, utm_source est un paramètre de suivi."
    ],
    "examples": [
      {
        "stdin": "Le portail Mer & Littoral compare deux titres :\n— M1 : « Brest teste un ferry électrique sur la rade »\n— M2 : « Brest teste un ferry électrique »\n\nRésolution :\n1) M1 : 8 mots distincts {brest, teste, un, ferry, électrique, sur, la, rade}.\n2) M2 : 5 mots. J(M1, M2) = 5 / 8 = 0,63, au moins égal à 0,60 → DOUBLON_TITRE.\n3) L'article M1 est arrivé avec l'URL « https://mer-littoral.example/ferry?utm_campaign=nl&rubrique=5 » ; URL canonique : https://mer-littoral.example/ferry?rubrique=5.",
        "expected": "J = 0,63 → DOUBLON_TITRE — URL canonique https://mer-littoral.example/ferry?rubrique=5",
        "note": "Les paramètres de suivi disparaissent de l'URL canonique ; les paramètres métier, comme une rubrique, restent."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de mots distincts du titre A1",
        "stdin": "q:1",
        "expected": "9||neuf"
      },
      {
        "label": "Question 2 — Indice de Jaccard J(A1, A2)",
        "stdin": "q:2",
        "expected": "0,67||0.67||0,7"
      },
      {
        "label": "Question 3 — Indice de Jaccard J(A1, A3)",
        "stdin": "q:3",
        "expected": "0,21||0.21||0,214||0.214"
      },
      {
        "label": "Question 4 — Verdict sur A1 et A2",
        "stdin": "q:4",
        "expected": "DOUBLON_TITRE||doublon titre||DOUBLON||doublon"
      },
      {
        "label": "Question 5 — Nombre d'articles publiés",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — URL canonique nettoyée",
        "stdin": "q:6",
        "expected": "https://villes-mobilites.example/bornes?id=41"
      }
    ],
    "solution": "[Question 1 — Nombre de mots distincts du titre A1]\n9\n\n[Question 2 — Indice de Jaccard J(A1, A2)]\n0,67\n\n[Question 3 — Indice de Jaccard J(A1, A3)]\n0,21\n\n[Question 4 — Verdict sur A1 et A2]\nDOUBLON_TITRE\n\n[Question 5 — Nombre d'articles publiés]\n2\n\n[Question 6 — URL canonique nettoyée]\nhttps://villes-mobilites.example/bornes?id=41",
    "takeaway": "1) A1 = {lille, installe, 80, bornes, de, recharge, en, centre, ville} : 9 mots distincts.\n2) A2 = 6 mots, tous présents dans A1 : J(A1, A2) = 6 / 9 = 0,67.\n3) A3 = 8 mots ; mots communs avec A1 : {bornes, de, recharge} ; union = 9 + 8 − 3 = 14 ; J(A1, A3) = 3 / 14 = 0,21.\n4) J(A1, A2) = 0,67, au moins égal à 0,60 : DOUBLON_TITRE.\n5) A2 est écarté comme doublon ; le portail publie A1 et A3 : 2 articles.\n6) utm_source est un paramètre de suivi, id=41 est un paramètre métier : URL canonique https://villes-mobilites.example/bornes?id=41.\nContrôle : 6 / 9 = 0,667 et 3 / 14 = 0,214 ; seul le premier dépasse le seuil de 0,60."
  },
  {
    "id": "vt3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de collecte du robot de l'association Aurevie",
    "exampleTitle": "Exemple résolu — le plan de collecte de la bibliothèque numérique Liréa",
    "goal": "Planifier une collecte multi-sources, calculer la charge horaire et vérifier la conformité d'un pic sous plafond.",
    "brief": "<p><strong>Énoncé.</strong> L'association Aurevie, observatoire des mobilités urbaines, programme son robot de collecte. Sources et périodes de relevé :</p><table><tr><th>Groupe</th><th>Nombre de sources</th><th>Période de relevé</th></tr><tr><td>A — presse quotidienne</td><td>30 flux</td><td>toutes les 30 minutes</td></tr><tr><td>B — blogs spécialisés</td><td>20 flux</td><td>toutes les heures</td></tr><tr><td>C — alertes hebdomadaires</td><td>10 flux</td><td>le lundi à 8 h 00</td></tr></table><p>Le serveur de l'association plafonne le robot à 100 requêtes par heure. Le lundi, le groupe C est déclenché à 8 h 00 en une seule salve.</p><p>Consignes : les réponses numériques s'écrivent en nombres seuls ; la question 4 attend OUI ou NON en majuscules.</p><ol><li>Combien de requêtes par heure le groupe A génère-t-il ?</li><li>Combien de requêtes par heure le groupe B génère-t-il ?</li><li>Combien de requêtes le robot adresse-t-il entre 8 h et 9 h le lundi ?</li><li>Le pic du lundi respecte-t-il le plafond de 100 requêtes par heure ?</li><li>Combien de requêtes par heure reçoit chaque source du groupe A ?</li><li>Si le groupe A passait à un relevé toutes les 15 minutes, combien de requêtes le pic du lundi 8 h–9 h atteindrait-il ?</li></ol>",
    "starter": "# Exercice — Le plan de collecte du robot de l'association Aurevie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Requêtes par heure du groupe A]\nA_COMPLETER\n\n[Question 2 — Requêtes par heure du groupe B]\nA_COMPLETER\n\n[Question 3 — Requêtes sur le créneau du lundi 8 h-9 h]\nA_COMPLETER\n\n[Question 4 — Respect du plafond de 100 requêtes/heure]\nA_COMPLETER\n\n[Question 5 — Requêtes par heure reçues par une source du groupe A]\nA_COMPLETER\n\n[Question 6 — Pic du lundi avec un relevé toutes les 15 minutes]\nA_COMPLETER\n",
    "hints": [
      "Un relevé toutes les 30 minutes, c'est 2 relevés par heure ; toutes les heures, c'est 1 ; toutes les 15 minutes, c'est 4.",
      "Le pic du lundi cumule les trois groupes sur la même fenêtre d'une heure : additionnez les requêtes horaires de A et B, plus la salve de C.",
      "Pour la question 6, recalculez uniquement le groupe A (30 flux × 4 relevés), puis recomposez le pic complet avant de conclure."
    ],
    "examples": [
      {
        "stdin": "La bibliothèque numérique Liréa programme son robot :\n— Groupe X : 8 flux, relevés toutes les 20 minutes.\n— Groupe Y : 15 flux, relevés une fois par heure.\n— Hebdomadaire : 5 flux, déclenchés le lundi à 8 h.\nPlafond du serveur : 50 requêtes par heure.\n\nRésolution :\n1) Groupe X : 8 × 3 = 24 requêtes par heure.\n2) Groupe Y : 15 × 1 = 15 requêtes par heure.\n3) Pic du lundi : 24 + 15 + 5 = 44 requêtes.\n4) 44 ≤ 50 : le plafond est respecté.",
        "expected": "X : 24 requêtes/heure — Y : 15 requêtes/heure — pic lundi 44 ≤ 50, conforme",
        "note": "Le pic se calcule toujours sur la fenêtre horaire la plus chargée : le lundi matin cumule les trois groupes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Requêtes par heure du groupe A",
        "stdin": "q:1",
        "expected": "60"
      },
      {
        "label": "Question 2 — Requêtes par heure du groupe B",
        "stdin": "q:2",
        "expected": "20"
      },
      {
        "label": "Question 3 — Requêtes sur le créneau du lundi 8 h-9 h",
        "stdin": "q:3",
        "expected": "90"
      },
      {
        "label": "Question 4 — Respect du plafond de 100 requêtes/heure",
        "stdin": "q:4",
        "expected": "OUI||oui"
      },
      {
        "label": "Question 5 — Requêtes par heure reçues par une source du groupe A",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — Pic du lundi avec un relevé toutes les 15 minutes",
        "stdin": "q:6",
        "expected": "150"
      }
    ],
    "solution": "[Question 1 — Requêtes par heure du groupe A]\n60\n\n[Question 2 — Requêtes par heure du groupe B]\n20\n\n[Question 3 — Requêtes sur le créneau du lundi 8 h-9 h]\n90\n\n[Question 4 — Respect du plafond de 100 requêtes/heure]\nOUI\n\n[Question 5 — Requêtes par heure reçues par une source du groupe A]\n2\n\n[Question 6 — Pic du lundi avec un relevé toutes les 15 minutes]\n150",
    "takeaway": "1) Groupe A : 30 flux × 2 relevés par heure = 60 requêtes par heure.\n2) Groupe B : 20 flux × 1 = 20 requêtes par heure.\n3) Pic du lundi : 60 + 20 + 10 = 90 requêtes entre 8 h et 9 h.\n4) 90 ≤ 100 : le plafond est respecté, réponse OUI.\n5) Chaque source du groupe A est relevée 2 fois par heure (toutes les 30 minutes).\n6) Groupe A à 15 minutes : 30 × 4 = 120 requêtes par heure ; pic = 120 + 20 + 10 = 150.\nContrôle : à 15 minutes, 120 + 20 = 140 dépasse déjà le plafond avant même la salve hebdomadaire ; il faudrait décaler le groupe C ou espacer les relevés."
  }
];
