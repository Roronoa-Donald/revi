'use strict';

module.exports = [
  {
    "id": "lan3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de métrique de coût OSPF et sélection du meilleur chemin",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le coût OSPF cumulé de chemins concurrents à partir de la bande passante de référence.",
    "brief": "<p>Le protocole <strong>OSPFv2 (Open Shortest Path First - RFC 2328)</strong> calcule le coût d'une interface selon la formule standard :<br>\n<code>coût = max(1, ref_bandwidth // interface_bandwidth)</code> (en Mbps).<br>\nPar défaut, la bande passante de référence historique est 100 Mbps (ce qui donne un coût de 1 pour FastEthernet, Gigabit et 10G sans différenciation). En réseau de campus moderne, on configure <code>auto-cost reference-bandwidth</code> à 10000 (10 Gbps) ou 100000 (100 Gbps).<br><br>\nLe coût total d'un chemin vers une destination est la somme des coûts de chaque tronçon (interface de sortie le long du chemin). Le chemin au coût total le plus bas est injecté dans la table de routage (Best Path).<br><br>\nAnalysez les paramètres du problème pour chaque cas...&gt;</code> (vitesses des interfaces en Mbps).<br><br>\nPour chaque chemin (triés par id alphabétique), afficher :<br>\n<code>OSPF_PATH id={id} total_cost={total_cost} hops_count={len(hops)} status={BEST_PATH|BACKUP_PATH}</code><br>\nEt la ligne finale élisant le meilleur chemin :<br>\n<code>OSPF_ROUTE best_path={winner_id} metric={winner_cost}</code></p>",
    "starter": "# Grille d'analyse (lan3-c4-e1) — Calculateur de métrique de coût OSPF et sélection du meilleur chemin\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\n# Données : OSPF_CONFIG ref_bw=100\n# Données : PATH id=P1 hops=100,100\n# Données : PATH id=P2 hops=1000,1000\nA_COMPLETER\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\n# Données : OSPF_CONFIG ref_bw=100000\n# Données : PATH id=FIBRE hops=100000\n# Données : PATH id=CUIVRE hops=10000,10000\nA_COMPLETER\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\n# Données : OSPF_CONFIG ref_bw=1000\n# Données : PATH id=DIRECT_SLOW hops=2\n# Données : PATH id=DETOUR_FAST hops=100,100\nA_COMPLETER\n",
    "hints": [
      "Calculer pour chaque saut : max(1, ref_bw // bw).",
      "Sommer les coûts pour obtenir total_cost.",
      "Le chemin minimal (départage par id alphabétique) est BEST_PATH."
    ],
    "examples": [
      {
        "stdin": "OSPF_CONFIG ref_bw=10000\nPATH id=PATH_A hops=1000,1000,1000\nPATH id=PATH_B hops=10000,100\nPATH id=PATH_C hops=10000,10000",
        "expected": "OSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2",
        "note": "PATH_C traverse deux liens 10G (coût 1 + 1 = 2) et bat PATH_A (coût 10+10+10 = 30)."
      }
    ],
    "tests": [
      {
        "label": "Bande passante de référence par défaut 100 Mbps sans différenciation au-delà",
        "stdin": "cas:1",
        "expected": "OSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2"
      },
      {
        "label": "Chemin à saut unique très rapide surpassant un chemin multi-sauts",
        "stdin": "cas:2",
        "expected": "OSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1"
      },
      {
        "label": "Liaisons lentes pénalisées (T1/E1)",
        "stdin": "cas:3",
        "expected": "OSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20"
      }
    ],
    "solution": "[Exemple]\nOSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\nOSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\nOSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\nOSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20",
    "takeaway": "À retenir : Calculer le coût OSPF cumulé de chemins concurrents à partir de la bande passante de référence.\nRepère : PATH_C traverse deux liens 10G (coût 1 + 1 = 2) et bat PATH_A (coût 10+10+10 = 30)."
  },
  {
    "id": "lan3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "La lecture des LSAs du siège de Calorix",
    "exampleTitle": "Exemple résolu — les LSAs du réseau de la mairie de Tréville",
    "goal": "Classer les LSAs d'une base d'états de liens par type (1 à 5) à partir de leur contenu et de leur émetteur.",
    "brief": "<p><strong>Énoncé.</strong> Calorix, fabricant de matériel de chauffage, exploite un domaine OSPF à deux aires : l'aire 0 (cœur, siège) et l'aire 1 (usine). Le routeur interne R-INT1, situé dans l'aire 1, affiche sa base d'états de liens. L'ingénieur relève les cinq entrées suivantes :</p><table><tr><th>Entrée</th><th>Contenu</th><th>Émise par</th></tr><tr><th>LSA-a</th><td>Les liens de R-INT1 dans l'aire 1</td><td>R-INT1</td></tr><tr><th>LSA-b</th><td>Les routeurs raccordés au réseau multi-accès 10.1.1.0/24 (segment dont R-ABR1 est le DR)</td><td>R-ABR1</td></tr><tr><th>LSA-c</th><td>Le réseau 10.20.0.0/16 de l'aire 0, annoncé à l'aire 1</td><td>R-ABR1</td></tr><tr><th>LSA-d</th><td>La localisation de l'ASBR R-ASBR (situé dans l'aire 0) pour les routeurs de l'aire 1</td><td>R-ABR1</td></tr><tr><th>LSA-e</th><td>La route externe 0.0.0.0/0 vers le fournisseur Internet, redistribuée</td><td>R-ASBR</td></tr></table><p>Rappel du cours : type 1 (Router LSA, un routeur décrit ses liens dans son aire) ; type 2 (Network LSA, le DR décrit un segment multi-accès) ; type 3 (Network Summary, un ABR annonce un réseau d'une autre aire) ; type 4 (ASBR Summary, un ABR annonce la route vers un ASBR) ; type 5 (AS External, un ASBR annonce une route externe). Les types 1 et 2 ne quittent jamais leur aire de départ.</p><p>Répondez par le numéro du type (un chiffre entre 1 et 5).</p><ol><li>Quel est le type du LSA-a ?</li><li>Quel est le type du LSA-b ?</li><li>Quel est le type du LSA-c ?</li><li>Quel est le type du LSA-d ?</li><li>Quel est le type du LSA-e ?</li></ol>",
    "starter": "# Exercice — La lecture des LSAs du siège de Calorix\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse est le numéro du type de LSA (1 à 5).\n\n[Question 1 — Type du LSA-a]\nA_COMPLETER\n\n[Question 2 — Type du LSA-b]\nA_COMPLETER\n\n[Question 3 — Type du LSA-c]\nA_COMPLETER\n\n[Question 4 — Type du LSA-d]\nA_COMPLETER\n\n[Question 5 — Type du LSA-e]\nA_COMPLETER\n",
    "hints": [
      "Identifiez l'émetteur : un routeur ordinaire, un DR, un ABR ou un ASBR n'émettent pas les mêmes types.",
      "Un LSA dont le contenu est un réseau situé dans une autre aire est un résumé d'ABR ; s'il décrit un segment local multi-accès, c'est le DR qui parle.",
      "1. LSA-a : un routeur décrit ses propres liens dans son aire. 2. LSA-b : un DR décrit son segment. 3. LSA-c : un ABR résume un réseau d'une autre aire. 4. LSA-d : un ABR indique où trouver un ASBR. 5. LSA-e : un ASBR redistribue une route externe."
    ],
    "examples": [
      {
        "stdin": "La mairie de Tréville exploite un domaine OSPF à deux aires.\nLSA-x : les liens de R-Mairie dans l'aire 1.\nLSA-y : les routeurs du segment 10.9.9.0/24, émis par le DR.\nLSA-z : le réseau 10.8.0.0/16 de l'aire 0, annoncé dans l'aire 1 par R-ABR.\nLSA-w : la route vers l'ASBR du siège, annoncée dans l'aire 1 par R-ABR.\nLSA-v : la route externe du réseau des écoles, redistribuée par l'ASBR.\n\n1) LSA-x : type 1 (Router LSA).\n2) LSA-y : type 2 (Network LSA du DR).\n3) LSA-z : type 3 (résumé de réseau par l'ABR).\n4) LSA-w : type 4 (résumé vers l'ASBR).\n5) LSA-v : type 5 (route externe).",
        "expected": "x : type 1 — y : type 2 — z : type 3 — w : type 4 — v : type 5",
        "note": "Les types 1 et 2 restent confinés dans leur aire ; seuls les résumés (types 3 et 4) et les externes (type 5) traversent les frontières."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type du LSA-a",
        "stdin": "q:1",
        "expected": "1||type 1||LSA 1||le type 1"
      },
      {
        "label": "Question 2 — Type du LSA-b",
        "stdin": "q:2",
        "expected": "2||type 2||LSA 2||le type 2"
      },
      {
        "label": "Question 3 — Type du LSA-c",
        "stdin": "q:3",
        "expected": "3||type 3||LSA 3||le type 3"
      },
      {
        "label": "Question 4 — Type du LSA-d",
        "stdin": "q:4",
        "expected": "4||type 4||LSA 4||le type 4"
      },
      {
        "label": "Question 5 — Type du LSA-e",
        "stdin": "q:5",
        "expected": "5||type 5||LSA 5||le type 5"
      }
    ],
    "solution": "[Question 1 — Type du LSA-a]\n1\n\n[Question 2 — Type du LSA-b]\n2\n\n[Question 3 — Type du LSA-c]\n3\n\n[Question 4 — Type du LSA-d]\n4\n\n[Question 5 — Type du LSA-e]\n5",
    "takeaway": "1) LSA-a : un routeur décrit ses liens dans sa propre aire : Router LSA, type 1.\n2) LSA-b : le DR du segment multi-accès 10.1.1.0/24 décrit les routeurs raccordés : Network LSA, type 2.\n3) LSA-c : l'ABR annonce à l'aire 1 un réseau de l'aire 0 : Network Summary, type 3.\n4) LSA-d : l'ABR annonce la localisation d'un ASBR : ASBR Summary, type 4.\n5) LSA-e : l'ASBR redistribue une route externe (0.0.0.0/0 vers Internet) : AS External, type 5.\nContrôle : les cinq types majeurs sont présents une fois chacun ; les types 1 et 2 ne quittent pas l'aire 1, les types 3, 4 et 5 y arrivent par l'ABR ou l'ASBR."
  },
  {
    "id": "lan3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les aires spéciales de l'agence de Montferand",
    "exampleTitle": "Exemple résolu — les aires OSPF du groupement Verchant",
    "goal": "Choisir une aire OSPF spéciale (stub, totally stubby, NSSA) selon les besoins d'une agence et compter les LSAs restants.",
    "brief": "<p><strong>Énoncé.</strong> Montferand est une agence bancaire reliée au siège par un lien de 20 Mbit/s. Son aire OSPF 51 reçoit aujourd'hui : 12 LSAs de type 3 (réseaux des autres aires), 4 LSAs de type 4 (localisations d'ASBR) et 6 LSAs de type 5 (routes externes), en plus des LSAs internes de l'agence. Le responsable réseau veut alléger la table de routage des routeurs de l'agence, avec deux contraintes : les postes de l'agence ne consomment aucune route externe, mais l'agence doit pouvoir annoncer une route externe vers un partenaire de sauvegarde qui y est raccordé.</p><p>Rappel du cours : une aire stub supprime les LSAs de type 5 (routes externes) et conserve les types 3 ; une aire totalement stub (totally stubby) supprime aussi les types 3 et 4, ne laissant qu'une route par défaut injectée par l'ABR ; une aire NSSA autorise un ASBR interne : les routes externes y entrent sous forme de LSAs de type 7, que l'ABR convertit en type 5 vers le reste du domaine.</p><p>Répondez par le nom de l'aire (questions 1 à 3), le nombre seul (question 4) ou un court libellé (question 5).</p><ol><li>L'agence n'a besoin d'aucune route externe mais souhaite garder les routes inter-aires : quelle aire spéciale suffit ?</li><li>Pour supprimer aussi les LSAs de type 3 et 4, quel type d'aire l'administrateur configure-t-il ?</li><li>L'agence doit annoncer sa route externe vers le partenaire : quelle aire spéciale le permet ?</li><li>Après passage en aire totalement stub, combien de LSAs de type 3 décrivant les réseaux des autres aires restent-ils dans l'aire 51 ?</li><li>Quelle route l'ABR injecte-t-il dans une aire totalement stub pour assurer la sortie vers le reste du domaine ?</li></ol>",
    "starter": "# Exercice — Les aires spéciales de l'agence de Montferand\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nom de l'aire. Question 4 : le nombre seul.\n# Question 5 : un court libellé.\n\n[Question 1 — Aire spéciale supprimant les types 5 seulement]\nA_COMPLETER\n\n[Question 2 — Aire supprimant aussi les types 3 et 4]\nA_COMPLETER\n\n[Question 3 — Aire autorisant un ASBR interne]\nA_COMPLETER\n\n[Question 4 — LSAs de type 3 restants en aire totalement stub]\nA_COMPLETER\n\n[Question 5 — Route injectée par l'ABR dans une aire totalement stub]\nA_COMPLETER\n",
    "hints": [
      "Classez les besoins : supprimer les externes (stub), supprimer aussi les inter-aires (totally stubby), ou injecter des externes locales (NSSA).",
      "L'aire totalement stub remplace tous les résumés par une unique route vers l'ABR.",
      "1. L'agence garde les types 3 : l'aire stub suffit. 2. Totally stubby chasse aussi les types 3 et 4. 3. Le type 7 est propre aux NSSA. 4. Aucun résumé de réseau distant ne survit. 5. Une seule route suffit à sortir de l'aire."
    ],
    "examples": [
      {
        "stdin": "Le groupement Verchant exploite une aire distante 60.\nBesoins : supprimer les routes externes (LSA type 5) tout en gardant les réseaux\nintersites (type 3), puis annoncer une route externe d'un partenaire local.\n\n1) Supprimer les types 5 seulement : aire stub.\n2) Supprimer aussi les types 3 et 4 : aire totalement stub.\n3) Annoncer une externe locale : aire NSSA (LSA type 7 converti en type 5 par l'ABR).\n4) En aire totalement stub, aucun LSA de type 3 de réseau distant ne reste.\n5) L'ABR injecte une route par défaut (0.0.0.0/0).",
        "expected": "stub — totally stub — NSSA (type 7) — 0 LSA de type 3 restant — route par défaut",
        "note": "Le type 7 n'existe que dans les NSSA : c'est le véhicule local des routes externes, converti en type 5 au passage de l'ABR."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Aire spéciale supprimant les types 5 seulement",
        "stdin": "q:1",
        "expected": "stub||aire stub||une aire stub||stub area"
      },
      {
        "label": "Question 2 — Aire supprimant aussi les types 3 et 4",
        "stdin": "q:2",
        "expected": "totally stubby||totally stub||aire totalement stub||totalement stub||aire totally stubby||totally stubby area"
      },
      {
        "label": "Question 3 — Aire autorisant un ASBR interne",
        "stdin": "q:3",
        "expected": "NSSA||aire NSSA||une aire NSSA||not-so-stubby"
      },
      {
        "label": "Question 4 — LSAs de type 3 restants en aire totalement stub",
        "stdin": "q:4",
        "expected": "0||aucun||aucun LSA"
      },
      {
        "label": "Question 5 — Route injectée par l'ABR dans une aire totalement stub",
        "stdin": "q:5",
        "expected": "une route par défaut||la route par défaut||0.0.0.0/0||une route par defaut||route par défaut"
      }
    ],
    "solution": "[Question 1 — Aire spéciale supprimant les types 5 seulement]\nstub\n\n[Question 2 — Aire supprimant aussi les types 3 et 4]\ntotally stubby\n\n[Question 3 — Aire autorisant un ASBR interne]\nNSSA\n\n[Question 4 — LSAs de type 3 restants en aire totalement stub]\n0\n\n[Question 5 — Route injectée par l'ABR dans une aire totalement stub]\nune route par défaut",
    "takeaway": "1) L'aire stub supprime les LSAs de type 5 (routes externes) tout en conservant les types 3 : elle suffit au besoin décrit.\n2) Pour chasser aussi les types 3 et 4, il faut une aire totalement stub (totally stubby).\n3) L'agence doit annoncer une route externe locale : seule l'aire NSSA autorise un ASBR interne (routes portées en type 7, converties en type 5 par l'ABR).\n4) En aire totalement stub, aucun LSA de type 3 décrivant les réseaux d'autres aires n'est admis : il en reste 0.\n5) L'ABR injecte une route par défaut, qui dirige vers lui tout le trafic sortant de l'aire.\nContrôle : l'agence de Montferand combine les deux contraintes en choisissant une NSSA si la route du partenaire doit être annoncée ; sinon une aire totalement stub serait la plus légère."
  }
];
