'use strict';

module.exports = [
  {
    "id": "vt3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Parseur de flux de syndication RSS 2.0 / Atom",
    "goal": "Extraire et structurer les métadonnées techniques (titre, lien, date, identifiant GUID) d’un flux XML de veille.",
    "brief": "Dans la collecte automatisée en mode Push/Pull, les flux RSS 2.0 et Atom constituent le standard d’interopérabilité pour agréger les nouveautés sans polluer les serveurs cibles.\n\nChaque élément `<item>` contient les balises :\n- `<title>` : titre de la dépêche ou publication\n- `<link>` : URL canonique de la source\n- `<pubDate>` : date de publication au format RFC 822 ou ISO (ex: `2025-10-15`)\n- `<guid>` : identifiant unique de l’élément\n\nEntrée :\nLignes contenant des balises XML au format standardisé :\n`<item><guid>G</guid><title>T</title><link>L</link><pubDate>D</pubDate></item>`\n\nRésultat d’analyse attendu :\n- Pour chaque article :\n  `ARTICLE id=<G> title=<T> link=<L> date=<D>`\n- Bilan :\n  `SUMMARY total_articles=<N> latest_date=<D>`",
    "starter": "# Grille d'analyse (vt3-c3-e1) — Parseur de flux de syndication RSS 2.0 / Atom\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois articles avec dates variées]\n# Données : <item><guid>cve-1</guid><title>Alerte CERT-FR sur routeurs</title><link>https://cert.ssi.gouv.fr/1</link><pubDate>2025-09-20</pubDate></item>\n# Données : <item><guid>cve-2</guid><title>Mise à jour noyau Linux 6.12</title><link>https://kernel.org/612</link><pubDate>2025-10-05</pubDate></item>\n# Données : <item><guid>cve-3</guid><title>Rapport Gartner Cloud 2025</title><link>https://gartner.com/cloud</link><pubDate>2025-10-12</pubDate></item>\nA_COMPLETER\n\n[Cas 2 — Un seul article]\n# Données : <item><guid>art-99</guid><title>Déploiement fibre 10G</title><link>https://telecom.fr/10g</link><pubDate>2025-11-01</pubDate></item>\nA_COMPLETER\n\n[Cas 3 — Ordre inversé des balises dans l item]\n# Données : <item><title>Brevet microprocesseur supraconducteur</title><guid>pat-888</guid><pubDate>2025-08-15</pubDate><link>https://epo.org/888</link></item>\nA_COMPLETER\n",
    "hints": [
      "Utiliser des expressions régulières (re.search) ou un découpage pour extraire le contenu entre balises <tag> et </tag>.",
      "Identifier la date la plus récente au format lexicographique YYYY-MM-DD.",
      "Gérer les espaces superflus autour du titre et des liens."
    ],
    "examples": [
      {
        "stdin": "<item><guid>art-101</guid><title>Sortie de Python 3.14</title><link>https://python.org/news/101</link><pubDate>2025-10-01</pubDate></item>\n<item><guid>art-102</guid><title>Vulnérabilité OpenSSL critique</title><link>https://cve.mitre.org/2025-02</link><pubDate>2025-10-14</pubDate></item>",
        "expected": "ARTICLE id=art-101 title=Sortie de Python 3.14 link=https://python.org/news/101 date=2025-10-01\nARTICLE id=art-102 title=Vulnérabilité OpenSSL critique link=https://cve.mitre.org/2025-02 date=2025-10-14\nSUMMARY total_articles=2 latest_date=2025-10-14",
        "note": "Le parseur extrait les 4 champs et repère la date la plus récente (2025-10-14)."
      }
    ],
    "tests": [
      {
        "label": "Trois articles avec dates variées",
        "stdin": "cas:1",
        "expected": "ARTICLE id=cve-1 title=Alerte CERT-FR sur routeurs link=https://cert.ssi.gouv.fr/1 date=2025-09-20\nARTICLE id=cve-2 title=Mise à jour noyau Linux 6.12 link=https://kernel.org/612 date=2025-10-05\nARTICLE id=cve-3 title=Rapport Gartner Cloud 2025 link=https://gartner.com/cloud date=2025-10-12\nSUMMARY total_articles=3 latest_date=2025-10-12"
      },
      {
        "label": "Un seul article",
        "stdin": "cas:2",
        "expected": "ARTICLE id=art-99 title=Déploiement fibre 10G link=https://telecom.fr/10g date=2025-11-01\nSUMMARY total_articles=1 latest_date=2025-11-01"
      },
      {
        "label": "Ordre inversé des balises dans l item",
        "stdin": "cas:3",
        "expected": "ARTICLE id=pat-888 title=Brevet microprocesseur supraconducteur link=https://epo.org/888 date=2025-08-15\nSUMMARY total_articles=1 latest_date=2025-08-15"
      }
    ],
    "solution": "[Exemple]\nARTICLE id=art-101 title=Sortie de Python 3.14 link=https://python.org/news/101 date=2025-10-01\nARTICLE id=art-102 title=Vulnérabilité OpenSSL critique link=https://cve.mitre.org/2025-02 date=2025-10-14\nSUMMARY total_articles=2 latest_date=2025-10-14\n\n[Cas 1 — Trois articles avec dates variées]\nARTICLE id=cve-1 title=Alerte CERT-FR sur routeurs link=https://cert.ssi.gouv.fr/1 date=2025-09-20\nARTICLE id=cve-2 title=Mise à jour noyau Linux 6.12 link=https://kernel.org/612 date=2025-10-05\nARTICLE id=cve-3 title=Rapport Gartner Cloud 2025 link=https://gartner.com/cloud date=2025-10-12\nSUMMARY total_articles=3 latest_date=2025-10-12\n\n[Cas 2 — Un seul article]\nARTICLE id=art-99 title=Déploiement fibre 10G link=https://telecom.fr/10g date=2025-11-01\nSUMMARY total_articles=1 latest_date=2025-11-01\n\n[Cas 3 — Ordre inversé des balises dans l item]\nARTICLE id=pat-888 title=Brevet microprocesseur supraconducteur link=https://epo.org/888 date=2025-08-15\nSUMMARY total_articles=1 latest_date=2025-08-15\n"
  },
  {
    "id": "vt3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Moteur de déduplication multi-sources et nettoyage de liens UTM",
    "goal": "Éliminer les doublons stricts et quasi-doublons de flux via normalisation d’URL et similarité lexicale de Jaccard.",
    "brief": "Lorsqu’un veilleur agrège des dizaines de flux RSS et lettres d’information, une même actualité apparaît sous plusieurs URLs avec des paramètres de pistage (UTM) ou des titres légèrement reformulés.\n\nRègles de traitement séquentiel pour chaque article entrant :\n1. **Nettoyage d’URL** : Supprimer tous les paramètres commençant par `utm_` ainsi que `ref` et `source` de la chaîne de requête (séparateurs `?` et `&`).\n   Si l’URL canonique nettoyée a déjà été vue : marquer `DOUBLON_URL` et rejeter.\n2. **Similarité de Jaccard sur les titres** : Comparer l’ensemble des mots minuscules du titre avec les titres des articles *déjà conservés* :\n   $$J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$$\n   Si pour un article conservé $J(A, B) \\ge 0.60$ : marquer `DOUBLON_TITRE` et rejeter.\n3. Sinon : marquer `CONSERVE` et enregistrer l’article.\n\nEntrée :\n`ITEM id=<ID> url=<URL> title=<TITRE>`\n\nRésultat d’analyse attendu :\n- Pour chaque élément :\n  `STATUS id=<ID> action=<CONSERVE|DOUBLON_URL|DOUBLON_TITRE>`\n- Bilan :\n  `SUMMARY recus=<N> conserves=<C> doublons=<D>`",
    "starter": "# Grille d'analyse (vt3-c3-e2) — Moteur de déduplication multi-sources et nettoyage de liens UTM\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois articles distincts conservés]\n# Données : ITEM id=A url=https://site1.fr/art1?id=10 title=Architecture micro-services cloud\n# Données : ITEM id=B url=https://site2.fr/art2?id=20 title=Sécurité des conteneurs docker\n# Données : ITEM id=C url=https://site3.fr/art3?id=30 title=Réseau 5G et antennes intelligentes\nA_COMPLETER\n\n[Cas 2 — Doublon strict d URL avec multiples paramètres de tracking]\n# Données : ITEM id=10 url=https://blog.com/post?ref=rss&utm_campaign=launch title=Nouvel algorithme IA\n# Données : ITEM id=11 url=https://blog.com/post?utm_source=feedly&ref=feed title=Titre tout à fait différent\nA_COMPLETER\n\n[Cas 3 — Doublon de titre quasi-identique avec mots permutés]\n# Données : ITEM id=X1 url=https://lemonde.fr/it1 title=Lancement de la fusée Ariane 6 en Guyane\n# Données : ITEM id=X2 url=https://lefigaro.fr/it2 title=Lancement réussi de la fusée Ariane 6 en Guyane\nA_COMPLETER\n",
    "hints": [
      "Normalisez les URLs collectées en supprimant les paramètres de traçage superflus et les ancres.",
      "L’indice de similarité de Jaccard mesure la proximité sémantique de deux sources par le quotient de l’intersection des mots par leur union."
    ],
    "examples": [
      {
        "stdin": "ITEM id=1 url=https://tech.com/news?utm_source=twitter&utm_medium=social title=Sortie officielle de Linux 6.12\nITEM id=2 url=https://tech.com/news?utm_source=newsletter title=Autre actu\nITEM id=3 url=https://autre.com/linux title=Sortie officielle et annonce de Linux 6.12",
        "expected": "STATUS id=1 action=CONSERVE\nSTATUS id=2 action=DOUBLON_URL\nSTATUS id=3 action=DOUBLON_TITRE\nSUMMARY recus=3 conserves=1 doublons=2",
        "note": "L’item 2 a la même URL nettoyée (https://tech.com/news). L’item 3 a un Jaccard de 5/7 = 0.71 avec l’item 1."
      }
    ],
    "tests": [
      {
        "label": "Trois articles distincts conservés",
        "stdin": "cas:1",
        "expected": "STATUS id=A action=CONSERVE\nSTATUS id=B action=CONSERVE\nSTATUS id=C action=CONSERVE\nSUMMARY recus=3 conserves=3 doublons=0"
      },
      {
        "label": "Doublon strict d URL avec multiples paramètres de tracking",
        "stdin": "cas:2",
        "expected": "STATUS id=10 action=CONSERVE\nSTATUS id=11 action=DOUBLON_URL\nSUMMARY recus=2 conserves=1 doublons=1"
      },
      {
        "label": "Doublon de titre quasi-identique avec mots permutés",
        "stdin": "cas:3",
        "expected": "STATUS id=X1 action=CONSERVE\nSTATUS id=X2 action=DOUBLON_TITRE\nSUMMARY recus=2 conserves=1 doublons=1"
      }
    ],
    "solution": "[Exemple]\nSTATUS id=1 action=CONSERVE\nSTATUS id=2 action=DOUBLON_URL\nSTATUS id=3 action=DOUBLON_TITRE\nSUMMARY recus=3 conserves=1 doublons=2\n\n[Cas 1 — Trois articles distincts conservés]\nSTATUS id=A action=CONSERVE\nSTATUS id=B action=CONSERVE\nSTATUS id=C action=CONSERVE\nSUMMARY recus=3 conserves=3 doublons=0\n\n[Cas 2 — Doublon strict d URL avec multiples paramètres de tracking]\nSTATUS id=10 action=CONSERVE\nSTATUS id=11 action=DOUBLON_URL\nSUMMARY recus=2 conserves=1 doublons=1\n\n[Cas 3 — Doublon de titre quasi-identique avec mots permutés]\nSTATUS id=X1 action=CONSERVE\nSTATUS id=X2 action=DOUBLON_TITRE\nSUMMARY recus=2 conserves=1 doublons=1\n"
  },
  {
    "id": "vt3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Simulateur d’ordonnanceur de collecte hybride Push/Pull avec Rate Limiter",
    "goal": "Simuler la charge de collecte sur un parc hétérogène de sources en appliquant les quotas de limitation de requêtes.",
    "brief": "Un robot de veille doit équilibrer ses requêtes sortantes pour respecter la bande passante et éviter d’être banni par les serveurs distants (Rate Limiting HTTP 429) :\n- `PUSH_WEBHOOK` : l’information est poussée par le serveur distant vers notre API. Le collecteur local émet 0 requête sortante (`requetes_emises = 0`, `statut = OPTIMAL`).\n- `PULL_RSS` ou `PULL_SCRAPING` : le collecteur interroge la source toutes les `periode_sec` secondes.\n\nSur une durée de simulation $S$ secondes :\n- Nombre de requêtes sollicitées : $R_{\\text{sollicitees}} = \\lfloor S / \\text{periode_sec} \\rfloor$\n- Quota maximal alloué par la limite : $Q_{\\text{max}} = \\lfloor \\text{rpm} \\times (S / 60) \\rfloor$\n- Requêtes effectives émises : $R_{\\text{emises}} = \\min(R_{\\text{sollicitees}}, Q_{\\text{max}})$\n- Si $R_{\\text{sollicitees}} > Q_{\\text{max}}$ : `statut = THROTTLED` (bridé par le rate limiter)\n- Sinon : `statut = OPTIMAL`\n\nEntrée :\n`DUREE_SIMU sec=<S>`\n`FLUX id=<ID> type=<PUSH_WEBHOOK|PULL_RSS|PULL_SCRAPING> periode_sec=<P> rpm=<RPM>`\n\nRésultat d’analyse attendu :\n- Pour chaque flux :\n  `COLLECT_JOB id=<ID> requetes_emises=<R> statut=<STATUT>`\n- Bilan :\n  `SUMMARY total_flux=<N> total_requetes=<R> flux_throttled=<T>`",
    "starter": "# Grille d'analyse (vt3-c3-e3) — Simulateur d’ordonnanceur de collecte hybride Push/Pull avec Rate Limiter\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Simulation courte de 10 minutes avec sources optimales]\n# Données : DUREE_SIMU sec=600\n# Données : FLUX id=f1 type=PULL_RSS periode_sec=120 rpm=5\n# Données : FLUX id=f2 type=PUSH_WEBHOOK periode_sec=0 rpm=20\nA_COMPLETER\n\n[Cas 2 — Toutes les sources en scraping bridé]\n# Données : DUREE_SIMU sec=1800\n# Données : FLUX id=s1 type=PULL_SCRAPING periode_sec=10 rpm=2\n# Données : FLUX id=s2 type=PULL_SCRAPING periode_sec=5 rpm=3\nA_COMPLETER\n\n[Cas 3 — Simulation d’une heure avec plusieurs webhooks]\n# Données : DUREE_SIMU sec=3600\n# Données : FLUX id=wh1 type=PUSH_WEBHOOK periode_sec=0 rpm=50\n# Données : FLUX id=wh2 type=PUSH_WEBHOOK periode_sec=0 rpm=50\n# Données : FLUX id=rss1 type=PULL_RSS periode_sec=1800 rpm=2\nA_COMPLETER\n",
    "hints": [
      "Lire d’abord la ligne DUREE_SIMU pour connaître le temps de simulation S.",
      "Pour les flux Push, les requêtes émises sont nulles.",
      "Comparer les requêtes théoriques avec le quota autorisé calculé sur S."
    ],
    "examples": [
      {
        "stdin": "DUREE_SIMU sec=3600\nFLUX id=cert_webhook type=PUSH_WEBHOOK periode_sec=0 rpm=100\nFLUX id=rss_github type=PULL_RSS periode_sec=600 rpm=10\nFLUX id=scrape_forum type=PULL_SCRAPING periode_sec=30 rpm=1",
        "expected": "COLLECT_JOB id=cert_webhook requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss_github requetes_emises=6 statut=OPTIMAL\nCOLLECT_JOB id=scrape_forum requetes_emises=60 statut=THROTTLED\nSUMMARY total_flux=3 total_requetes=66 flux_throttled=1",
        "note": "Le scrape_forum voulait 3600/30 = 120 requêtes, mais le RPM de 1 le bride à 60 requêtes (THROTTLED)."
      }
    ],
    "tests": [
      {
        "label": "Simulation courte de 10 minutes avec sources optimales",
        "stdin": "cas:1",
        "expected": "COLLECT_JOB id=f1 requetes_emises=5 statut=OPTIMAL\nCOLLECT_JOB id=f2 requetes_emises=0 statut=OPTIMAL\nSUMMARY total_flux=2 total_requetes=5 flux_throttled=0"
      },
      {
        "label": "Toutes les sources en scraping bridé",
        "stdin": "cas:2",
        "expected": "COLLECT_JOB id=s1 requetes_emises=60 statut=THROTTLED\nCOLLECT_JOB id=s2 requetes_emises=90 statut=THROTTLED\nSUMMARY total_flux=2 total_requetes=150 flux_throttled=2"
      },
      {
        "label": "Simulation d’une heure avec plusieurs webhooks",
        "stdin": "cas:3",
        "expected": "COLLECT_JOB id=wh1 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=wh2 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss1 requetes_emises=2 statut=OPTIMAL\nSUMMARY total_flux=3 total_requetes=2 flux_throttled=0"
      }
    ],
    "solution": "[Exemple]\nCOLLECT_JOB id=cert_webhook requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss_github requetes_emises=6 statut=OPTIMAL\nCOLLECT_JOB id=scrape_forum requetes_emises=60 statut=THROTTLED\nSUMMARY total_flux=3 total_requetes=66 flux_throttled=1\n\n[Cas 1 — Simulation courte de 10 minutes avec sources optimales]\nCOLLECT_JOB id=f1 requetes_emises=5 statut=OPTIMAL\nCOLLECT_JOB id=f2 requetes_emises=0 statut=OPTIMAL\nSUMMARY total_flux=2 total_requetes=5 flux_throttled=0\n\n[Cas 2 — Toutes les sources en scraping bridé]\nCOLLECT_JOB id=s1 requetes_emises=60 statut=THROTTLED\nCOLLECT_JOB id=s2 requetes_emises=90 statut=THROTTLED\nSUMMARY total_flux=2 total_requetes=150 flux_throttled=2\n\n[Cas 3 — Simulation d’une heure avec plusieurs webhooks]\nCOLLECT_JOB id=wh1 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=wh2 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss1 requetes_emises=2 statut=OPTIMAL\nSUMMARY total_flux=3 total_requetes=2 flux_throttled=0\n"
  }
];
