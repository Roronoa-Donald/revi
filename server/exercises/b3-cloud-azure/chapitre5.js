'use strict';

module.exports = [
  {
    "id": "az3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les paliers d'accès des archives de l'étude Daubrun",
    "exampleTitle": "Exemple résolu — l'archivage des plans du cabinet Tympan",
    "goal": "Choisir le palier d'accès d'un stockage Blob (chaud, froid, archive) selon la fréquence de consultation et calculer le coût de stockage.",
    "brief": "<p><strong>Énoncé.</strong> L'étude notariale Daubrun, forte de 12 collaborateurs, archive ses actes scannés dans le stockage Blob Azure. Le tarif mensuel de l'énoncé distingue trois paliers d'accès :</p><table><tr><th>Palier</th><th>Prix au Go / mois</th><th>Usage prévu</th><th>Rétention minimale</th></tr><tr><th>Chaud (Hot)</th><td>0,018 €</td><td>accès fréquent</td><td>aucune</td></tr><tr><th>Froid (Cool)</th><td>0,010 €</td><td>accès occasionnel</td><td>30 jours</td></tr><tr><th>Archive</th><td>0,001 €</td><td>accès rare, récupération lente</td><td>180 jours</td></tr></table><p>L'étude stocke <strong>500 Go</strong> d'actes de l'année en cours, consultés chaque semaine par les notaires, et <strong>2 000 Go</strong> d'actes de plus de dix ans, consultés environ une fois par an.</p><ol><li>Quel palier convient aux 500 Go d'actes de l'année en cours ?</li><li>Quel palier propose le prix au Go le plus bas ?</li><li>Quel est le coût mensuel de stockage des 500 Go en palier chaud, en euros ?</li><li>Quel est le coût mensuel de stockage des 2 000 Go en palier Archive, en euros ?</li><li>Combien de jours de rétention minimale le palier Archive impose-t-il ?</li></ol>",
    "starter": "# Exercice — Les paliers d'accès des archives de l'étude Daubrun\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom du palier. Questions 3 à 5 : le nombre seul.\n\n[Question 1 — Palier adapté aux actes de l'année en cours]\nA_COMPLETER\n\n[Question 2 — Palier au prix au Go le plus bas]\nA_COMPLETER\n\n[Question 3 — Coût mensuel des 500 Go en palier chaud (en €)]\nA_COMPLETER\n\n[Question 4 — Coût mensuel des 2 000 Go en palier Archive (en €)]\nA_COMPLETER\n\n[Question 5 — Rétention minimale du palier Archive (en jours)]\nA_COMPLETER\n",
    "hints": [
      "Le palier se choisit selon la fréquence d'accès : chaque semaine, c'est un accès fréquent ; une fois par an, c'est un accès rare.",
      "Le coût d'un volume se calcule en multipliant les Go par le prix au Go du palier concerné.",
      "1. Les actes de l'année sont consultés chaque semaine. 2. Comparez les trois prix au Go. 3. Multipliez 500 par 0,018. 4. Multipliez 2 000 par 0,001. 5. Lisez la colonne rétention minimale."
    ],
    "examples": [
      {
        "stdin": "Le cabinet d'architectes Tympan archive ses plans : 800 Go de projets en cours\nconsultés chaque jour, 4 000 Go de projets livrés consultés une fois par trimestre.\n\n1) Les 800 Go de projets en cours vont en palier chaud (accès fréquent).\n2) Les 4 000 Go livrés vont en palier froid (accès occasionnel).\n3) Coût du chaud : 800 × 0,018 = 14,40 € par mois.\n4) Coût du froid : 4 000 × 0,010 = 40 € par mois.\n5) Le palier archive impose 180 jours de rétention minimale.",
        "expected": "projets en cours : palier chaud — projets livrés : palier froid — 14,40 € — 40 € — 180 jours de rétention",
        "note": "Le palier archive n'est pas un disque dur : la récupération y prend des heures et la rétention minimale de 180 jours dissuade d'y stocker des données réactivables."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Palier adapté aux actes de l'année en cours",
        "stdin": "q:1",
        "expected": "chaud||hot||le palier chaud||palier chaud"
      },
      {
        "label": "Question 2 — Palier au prix au Go le plus bas",
        "stdin": "q:2",
        "expected": "archive||l'archive||le palier archive"
      },
      {
        "label": "Question 3 — Coût mensuel des 500 Go en palier chaud (en €)",
        "stdin": "q:3",
        "expected": "9||9,00||9.00||9 €"
      },
      {
        "label": "Question 4 — Coût mensuel des 2 000 Go en palier Archive (en €)",
        "stdin": "q:4",
        "expected": "2||2,00||2.00||2 €"
      },
      {
        "label": "Question 5 — Rétention minimale du palier Archive (en jours)",
        "stdin": "q:5",
        "expected": "180||180 jours"
      }
    ],
    "solution": "[Question 1 — Palier adapté aux actes de l'année en cours]\nchaud\n\n[Question 2 — Palier au prix au Go le plus bas]\narchive\n\n[Question 3 — Coût mensuel des 500 Go en palier chaud (en €)]\n9\n\n[Question 4 — Coût mensuel des 2 000 Go en palier Archive (en €)]\n2\n\n[Question 5 — Rétention minimale du palier Archive (en jours)]\n180",
    "takeaway": "1) Les actes de l'année sont consultés chaque semaine : un accès fréquent, qui appelle le palier chaud.\n2) Le palier Archive propose le prix au Go le plus bas (0,001 €/Go/mois).\n3) Coût du palier chaud : 500 × 0,018 = 9 € par mois.\n4) Coût du palier Archive : 2 000 × 0,001 = 2 € par mois.\n5) Le palier Archive impose 180 jours de rétention minimale.\nContrôle : les 2 000 Go d'actes anciens en palier Archive coûtent moins que les 500 Go récents en palier chaud (2 € contre 9 €) : l'écart de prix au Go compense largement le volume."
  },
  {
    "id": "az3-c5-e2",
    "chapter": 5,
    "title": "Validateur de requêtes avec jetons SAS",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser un modèle fictif de permissions, dates et protocoles, sans valider une signature SAS réelle.",
    "brief": "<p>Ce modèle fictif examine seulement des permissions, des horaires et un protocole : il ne vérifie pas la signature et ne valide pas un vrai jeton SAS. Un SAS de compte réel requiert sv, ss, srt, sp, se et sig ; st et spr sont optionnels, même si les deux sont fournis dans tous les cas de cet exercice. Sans spr, le SAS de compte autorise par défaut https,http, sous réserve des règles du compte.<br><br>\nFormat d'entrée :<br>\nLigne 1 : Configuration du jeton SAS :<br>\n<code>SAS_CONFIG sp=&lt;perms&gt; st=&lt;int&gt; se=&lt;int&gt; spr=&lt;protocol&gt;</code><br>\n- <code>sp</code> : permissions autorisées (sous-chaîne contenant <code>r</code>, <code>w</code>, <code>d</code>, <code>l</code>)<br>\n- <code>st</code> : horodatage début de validité (entier)<br>\n- <code>se</code> : horodatage fin de validité (entier)<br>\n- <code>spr</code> : protocole imposé (<code>https</code> ou <code>https,http</code>)<br><br>\nLignes suivantes : opérations clientes fictives (LIST est ici une étiquette, pas une méthode HTTP) :<br>\n<code>REQUEST method=&lt;GET|PUT|DELETE|LIST&gt; time=&lt;int&gt; proto=&lt;http|https&gt;</code><br><br>\nCorrespondance des opérations fictives avec les permissions du modèle :<br>\n- <code>GET</code> requiert <code>r</code><br>\n- <code>PUT</code> requiert <code>w</code><br>\n- <code>DELETE</code> requiert <code>d</code><br>\n- <code>LIST</code> requiert <code>l</code><br><br>\nOrdre strict d'évaluation de la requête :<br>\n1. Si <code>spr=https</code> et que la requête utilise <code>proto=http</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=PROTOCOL_VIOLATION)</code><br>\n2. Si <code>time &lt; st</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=NOT_YET_VALID)</code><br>\n3. Si <code>time &gt; se</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=EXPIRED)</code><br>\n4. Si la permission requise n'est pas présente dans <code>sp</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=INSUFFICIENT_PERMISSIONS)</code><br>\n5. Si tous les contrôles réussissent :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: ALLOWED</code></p>",
    "starter": "# Grille d'analyse (az3-c5-e2) — Validateur de requêtes avec jetons SAS (modèle fictif)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\n# Données : SAS_CONFIG sp=rwd st=50 se=150 spr=https\n# Données : REQUEST method=PUT time=100 proto=https\n# Données : REQUEST method=LIST time=100 proto=https\nA_COMPLETER\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\n# Données : SAS_CONFIG sp=r st=100 se=200 spr=https\n# Données : REQUEST method=GET time=150 proto=http\n# Données : REQUEST method=GET time=80 proto=https\n# Données : REQUEST method=GET time=250 proto=https\nA_COMPLETER\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\n# Données : SAS_CONFIG sp=rl st=50 se=150 spr=https,http\n# Données : REQUEST method=LIST time=100 proto=http\n# Données : REQUEST method=PUT time=100 proto=http\nA_COMPLETER\n",
    "hints": [
      "Associez chaque opération fictive à sa lettre de permission : GET à r, PUT à w, DELETE à d et LIST à l.",
      "Respecter l'ordre prescrit des contrôles d'erreur : protocole, puis anticipé, puis expiré, puis permissions.",
      "Vérifiez successivement les trois conditions : fenêtre temporelle validée (start <= t <= end), protocole autorisé (HTTPS) et permission requise présente dans sp="
    ],
    "examples": [
      {
        "stdin": "SAS_CONFIG sp=rw st=100 se=200 spr=https\nREQUEST method=GET time=150 proto=https\nREQUEST method=DELETE time=150 proto=https",
        "expected": "REQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)",
        "note": "Dans ce modèle fictif, la lecture est autorisée et la suppression refusée par les permissions rw."
      }
    ],
    "tests": [
      {
        "label": "Vérification normale des permissions PUT et LIST",
        "stdin": "cas:1",
        "expected": "REQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      },
      {
        "label": "Violations de protocole et fenêtres temporelles expirées ou anticipées",
        "stdin": "cas:2",
        "expected": "REQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)"
      },
      {
        "label": "Jeton avec protocole dual https et http et permission list",
        "stdin": "cas:3",
        "expected": "REQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      }
    ],
    "solution": "[Exemple]\nREQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\nREQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\nREQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\nREQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)",
    "takeaway": "À retenir : Analyser un modèle fictif de permissions, dates et protocoles, sans valider une signature SAS réelle.\nRepère : Dans ce modèle fictif, la lecture est autorisée et la suppression refusée par les permissions rw."
  },
  {
    "id": "az3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La politique de cycle de vie du cabinet Ombrelys",
    "exampleTitle": "Exemple résolu — la purge des mémos du cabinet Vigie",
    "goal": "Appliquer une politique de cycle de vie du stockage Blob (paliers, suppression) et chiffrer le coût d'un volume par palier.",
    "brief": "<p><strong>Énoncé.</strong> Ombrelys, cabinet d'expertise comptable à Lille, applique au conteneur <code>factures</code> la politique de cycle de vie suivante :</p><ul><li>règle 1 : les blobs versés depuis plus de <strong>30 jours</strong> passent en palier Froid ;</li><li>règle 2 : les blobs versés depuis plus de <strong>90 jours</strong> passent en palier Archive ;</li><li>règle 3 : les blobs versés depuis plus de <strong>2 550 jours</strong> (7 ans) sont supprimés.</li></ul><p>Tarifs mensuels de l'énoncé : Chaud 0,018 €/Go, Froid 0,010 €/Go, Archive 0,001 €/Go. Situation au <strong>30 avril 2025</strong> :</p><table><tr><th>Fichier</th><th>Date de versement</th><th>Ancienneté au 30 avril 2025</th></tr><tr><th>facture-2025-03-04.pdf</th><td>4 mars 2025</td><td>57 jours</td></tr><tr><th>facture-2024-09-12.pdf</th><td>12 septembre 2024</td><td>230 jours</td></tr><tr><th>facture-2018-02-01.pdf</th><td>1er février 2018</td><td>plus de 7 ans</td></tr></table><ol><li>Dans quel palier se trouve facture-2025-03-04.pdf au 30 avril 2025 ?</li><li>Dans quel palier se trouve facture-2024-09-12.pdf ?</li><li>Que devient facture-2018-02-01.pdf ?</li><li>Quel est le coût mensuel de stockage de 1 000 Go en palier Froid, en euros ?</li><li>Une facture versée le 15 mars 2025 est-elle déjà passée en palier Froid au 30 avril 2025 ?</li></ol>",
    "starter": "# Exercice — La politique de cycle de vie du cabinet Ombrelys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom du palier. Question 5 : oui ou non.\n\n[Question 1 — Palier de facture-2025-03-04.pdf]\nA_COMPLETER\n\n[Question 2 — Palier de facture-2024-09-12.pdf]\nA_COMPLETER\n\n[Question 3 — Sort de facture-2018-02-01.pdf]\nA_COMPLETER\n\n[Question 4 — Coût mensuel de 1 000 Go en palier Froid (en €)]\nA_COMPLETER\n\n[Question 5 — Une facture versée le 15 mars 2025 est-elle déjà en palier Froid]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque fichier, comparez son ancienneté aux seuils 30, 90 et 2 550 jours, en commençant par le seuil le plus long.",
      "Le coût d'un volume se calcule en multipliant les Go par le prix au Go du palier concerné.",
      "1. 57 jours se situent entre 30 et 90. 2. 230 jours dépassent 90. 3. Comparez 7 ans au seuil de suppression. 4. Multipliez 1 000 par 0,010. 5. Comptez les jours écoulés depuis le 15 mars (mars compte 31 jours)."
    ],
    "examples": [
      {
        "stdin": "Le cabinet d'avocats Vigie applique : palier Froid après 60 jours, Archive après\n180 jours, suppression après 10 ans. Audit au 1er juin 2025 :\n- memo-2025-04-20.pdf : versé depuis 42 jours ;\n- memo-2024-06-15.pdf : versé depuis 351 jours ;\n- memo-2013-01-10.pdf : plus de 10 ans.\n\n1) 42 jours : moins de 60, le mémo reste en palier Chaud.\n2) 351 jours : au-delà de 180, il est en palier Archive.\n3) Le mémo de 2013 est supprimé.\n4) 2 000 Go en Froid coûtent 2 000 × 0,010 = 20 € par mois.\n5) Un versement du 20 avril 2025 (42 jours) n'est pas encore passé en Froid.",
        "expected": "42 jours : palier chaud — 351 jours : palier archive — plus de 10 ans : supprimé — 2 000 Go en froid : 20 € — pas de bascule avant 60 jours",
        "note": "Les seuils de cycle de vie se comptent depuis la date de versement du blob : chaque règle s'applique au franchissement du seuil, la plus longue durée l'emportant."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Palier de facture-2025-03-04.pdf",
        "stdin": "q:1",
        "expected": "froid||cool||le palier froid"
      },
      {
        "label": "Question 2 — Palier de facture-2024-09-12.pdf",
        "stdin": "q:2",
        "expected": "archive||le palier archive"
      },
      {
        "label": "Question 3 — Sort de facture-2018-02-01.pdf",
        "stdin": "q:3",
        "expected": "supprimée||supprime||elle est supprimée||suppression"
      },
      {
        "label": "Question 4 — Coût mensuel de 1 000 Go en palier Froid (en €)",
        "stdin": "q:4",
        "expected": "10||10,00||10.00||10 €"
      },
      {
        "label": "Question 5 — Une facture versée le 15 mars 2025 est-elle déjà en palier Froid",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Palier de facture-2025-03-04.pdf]\nfroid\n\n[Question 2 — Palier de facture-2024-09-12.pdf]\narchive\n\n[Question 3 — Sort de facture-2018-02-01.pdf]\nsupprimée\n\n[Question 4 — Coût mensuel de 1 000 Go en palier Froid (en €)]\n10\n\n[Question 5 — Une facture versée le 15 mars 2025 est-elle déjà en palier Froid]\noui",
    "takeaway": "1) facture-2025-03-04.pdf a 57 jours d'ancienneté : au-delà du seuil de 30 jours, elle est passée en palier Froid.\n2) facture-2024-09-12.pdf a 230 jours d'ancienneté : au-delà du seuil de 90 jours, elle est passée en palier Archive.\n3) facture-2018-02-01.pdf dépasse 2 550 jours (7 ans) : elle a été supprimée par la règle 3.\n4) 1 000 Go en palier Froid coûtent 1 000 × 0,010 = 10 € par mois.\n5) Oui : versée le 15 mars 2025, la facture a 46 jours d'ancienneté au 30 avril (16 jours restants en mars + 30 jours en avril), au-delà du seuil de 30 jours : elle est en palier Froid.\nContrôle : 4 mars + 30 jours = 3 avril (bascule en Froid) et 15 mars + 30 jours = 14 avril (bascule en Froid) ; les deux dates précèdent le 30 avril 2025."
  }
];
