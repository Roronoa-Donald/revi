// server/exercises/b3-veille/chapitre3.js
// Exercices du Module 3 : Outils & Protocoles d’Acquisition Push/Pull & Parseur RSS (idPrefix: vt3)

module.exports = [
  {
    id: 'vt3-c3-e1',
    chapter: 3,
    title: 'Parseur de flux de syndication RSS 2.0 / Atom',
    level: 'n1',
    language: 'python',
    goal: 'Extraire et structurer les métadonnées techniques (titre, lien, date, identifiant GUID) d’un flux XML de veille.',
    brief:
      'Dans la collecte automatisée en mode Push/Pull, les flux RSS 2.0 et Atom constituent le standard d’interopérabilité pour agréger les nouveautés sans polluer les serveurs cibles.\n\n' +
      'Chaque élément `<item>` contient les balises :\n' +
      '- `<title>` : titre de la dépêche ou publication\n' +
      '- `<link>` : URL canonique de la source\n' +
      '- `<pubDate>` : date de publication au format RFC 822 ou ISO (ex: `2025-10-15`)\n' +
      '- `<guid>` : identifiant unique de l’élément\n\n' +
      'Entrée :\n' +
      'Lignes contenant des balises XML au format standardisé :\n' +
      '`<item><guid>G</guid><title>T</title><link>L</link><pubDate>D</pubDate></item>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque article :\n' +
      '  `ARTICLE id=<G> title=<T> link=<L> date=<D>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_articles=<N> latest_date=<D>`',
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : extraire les attributs de chaque item RSS
`,
    hints: [
      'Utiliser des expressions régulières (re.search) ou un découpage pour extraire le contenu entre balises <tag> et </tag>.',
      'Identifier la date la plus récente au format lexicographique YYYY-MM-DD.',
      'Gérer les espaces superflus autour du titre et des liens.'
    ],
    examples: [
      {
        stdin:
          '<item><guid>art-101</guid><title>Sortie de Python 3.14</title><link>https://python.org/news/101</link><pubDate>2025-10-01</pubDate></item>\n' +
          '<item><guid>art-102</guid><title>Vulnérabilité OpenSSL critique</title><link>https://cve.mitre.org/2025-02</link><pubDate>2025-10-14</pubDate></item>',
        expected:
          'ARTICLE id=art-101 title=Sortie de Python 3.14 link=https://python.org/news/101 date=2025-10-01\n' +
          'ARTICLE id=art-102 title=Vulnérabilité OpenSSL critique link=https://cve.mitre.org/2025-02 date=2025-10-14\n' +
          'SUMMARY total_articles=2 latest_date=2025-10-14',
        note: 'Le parseur extrait les 4 champs et repère la date la plus récente (2025-10-14).'
      }
    ],
    tests: [
      {
        label: 'Trois articles avec dates variées',
        stdin:
          '<item><guid>cve-1</guid><title>Alerte CERT-FR sur routeurs</title><link>https://cert.ssi.gouv.fr/1</link><pubDate>2025-09-20</pubDate></item>\n' +
          '<item><guid>cve-2</guid><title>Mise à jour noyau Linux 6.12</title><link>https://kernel.org/612</link><pubDate>2025-10-05</pubDate></item>\n' +
          '<item><guid>cve-3</guid><title>Rapport Gartner Cloud 2025</title><link>https://gartner.com/cloud</link><pubDate>2025-10-12</pubDate></item>',
        expected:
          'ARTICLE id=cve-1 title=Alerte CERT-FR sur routeurs link=https://cert.ssi.gouv.fr/1 date=2025-09-20\n' +
          'ARTICLE id=cve-2 title=Mise à jour noyau Linux 6.12 link=https://kernel.org/612 date=2025-10-05\n' +
          'ARTICLE id=cve-3 title=Rapport Gartner Cloud 2025 link=https://gartner.com/cloud date=2025-10-12\n' +
          'SUMMARY total_articles=3 latest_date=2025-10-12'
      },
      {
        label: 'Un seul article',
        stdin:
          '<item><guid>art-99</guid><title>Déploiement fibre 10G</title><link>https://telecom.fr/10g</link><pubDate>2025-11-01</pubDate></item>',
        expected:
          'ARTICLE id=art-99 title=Déploiement fibre 10G link=https://telecom.fr/10g date=2025-11-01\n' +
          'SUMMARY total_articles=1 latest_date=2025-11-01'
      },
      {
        label: 'Ordre inversé des balises dans l item',
        stdin:
          '<item><title>Brevet microprocesseur supraconducteur</title><guid>pat-888</guid><pubDate>2025-08-15</pubDate><link>https://epo.org/888</link></item>',
        expected:
          'ARTICLE id=pat-888 title=Brevet microprocesseur supraconducteur link=https://epo.org/888 date=2025-08-15\n' +
          'SUMMARY total_articles=1 latest_date=2025-08-15'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def get_tag(xml, tag):
    m = re.search(rf'<{tag}>(.*?)</{tag}>', xml, re.IGNORECASE)
    return m.group(1).strip() if m else ''

count = 0
latest_date = ""

for ligne in lignes:
    if '<item>' not in ligne:
        continue
    guid = get_tag(ligne, 'guid')
    title = get_tag(ligne, 'title')
    link = get_tag(ligne, 'link')
    date = get_tag(ligne, 'pubDate')
    
    print(f"ARTICLE id={guid} title={title} link={link} date={date}")
    count += 1
    if date > latest_date:
        latest_date = date

print(f"SUMMARY total_articles={count} latest_date={latest_date}")
`
  },
  {
    id: 'vt3-c3-e2',
    chapter: 3,
    title: 'Moteur de déduplication multi-sources et nettoyage de liens UTM',
    level: 'n2',
    language: 'python',
    goal: 'Éliminer les doublons stricts et quasi-doublons de flux via normalisation d’URL et similarité lexicale de Jaccard.',
    brief:
      'Lorsqu’un veilleur agrège des dizaines de flux RSS et lettres d’information, une même actualité apparaît sous plusieurs URLs avec des paramètres de pistage (UTM) ou des titres légèrement reformulés.\n\n' +
      'Règles de traitement séquentiel pour chaque article entrant :\n' +
      '1. **Nettoyage d’URL** : Supprimer tous les paramètres commençant par `utm_` ainsi que `ref` et `source` de la chaîne de requête (séparateurs `?` et `&`).\n' +
      '   Si l’URL canonique nettoyée a déjà été vue : marquer `DOUBLON_URL` et rejeter.\n' +
      '2. **Similarité de Jaccard sur les titres** : Comparer l’ensemble des mots minuscules du titre avec les titres des articles *déjà conservés* :\n' +
      '   $$J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$$\n' +
      '   Si pour un article conservé $J(A, B) \\ge 0.60$ : marquer `DOUBLON_TITRE` et rejeter.\n' +
      '3. Sinon : marquer `CONSERVE` et enregistrer l’article.\n\n' +
      'Entrée :\n' +
      '`ITEM id=<ID> url=<URL> title=<TITRE>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque élément :\n' +
      '  `STATUS id=<ID> action=<CONSERVE|DOUBLON_URL|DOUBLON_TITRE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY recus=<N> conserves=<C> doublons=<D>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : nettoyer l'URL, tester Jaccard et dédupliquer
`,
    hints: [
      'Pour nettoyer l’URL, séparer le chemin de la query string (?) et filtrer les paires clé=valeur.',
      'Tokeniser le titre en ensemble de mots minuscules.',
      'Calculer l’indice de Jaccard avec len(setA & setB) / len(setA | setB).'
    ],
    examples: [
      {
        stdin:
          'ITEM id=1 url=https://tech.com/news?utm_source=twitter&utm_medium=social title=Sortie officielle de Linux 6.12\n' +
          'ITEM id=2 url=https://tech.com/news?utm_source=newsletter title=Autre actu\n' +
          'ITEM id=3 url=https://autre.com/linux title=Sortie officielle et annonce de Linux 6.12',
        expected:
          'STATUS id=1 action=CONSERVE\n' +
          'STATUS id=2 action=DOUBLON_URL\n' +
          'STATUS id=3 action=DOUBLON_TITRE\n' +
          'SUMMARY recus=3 conserves=1 doublons=2',
        note: 'L’item 2 a la même URL nettoyée (https://tech.com/news). L’item 3 a un Jaccard de 5/7 = 0.71 avec l’item 1.'
      }
    ],
    tests: [
      {
        label: 'Trois articles distincts conservés',
        stdin:
          'ITEM id=A url=https://site1.fr/art1?id=10 title=Architecture micro-services cloud\n' +
          'ITEM id=B url=https://site2.fr/art2?id=20 title=Sécurité des conteneurs docker\n' +
          'ITEM id=C url=https://site3.fr/art3?id=30 title=Réseau 5G et antennes intelligentes',
        expected:
          'STATUS id=A action=CONSERVE\n' +
          'STATUS id=B action=CONSERVE\n' +
          'STATUS id=C action=CONSERVE\n' +
          'SUMMARY recus=3 conserves=3 doublons=0'
      },
      {
        label: 'Doublon strict d URL avec multiples paramètres de tracking',
        stdin:
          'ITEM id=10 url=https://blog.com/post?ref=rss&utm_campaign=launch title=Nouvel algorithme IA\n' +
          'ITEM id=11 url=https://blog.com/post?utm_source=feedly&ref=feed title=Titre tout à fait différent',
        expected:
          'STATUS id=10 action=CONSERVE\n' +
          'STATUS id=11 action=DOUBLON_URL\n' +
          'SUMMARY recus=2 conserves=1 doublons=1'
      },
      {
        label: 'Doublon de titre quasi-identique avec mots permutés',
        stdin:
          'ITEM id=X1 url=https://lemonde.fr/it1 title=Lancement de la fusée Ariane 6 en Guyane\n' +
          'ITEM id=X2 url=https://lefigaro.fr/it2 title=Lancement réussi de la fusée Ariane 6 en Guyane',
        expected:
          'STATUS id=X1 action=CONSERVE\n' +
          'STATUS id=X2 action=DOUBLON_TITRE\n' +
          'SUMMARY recus=2 conserves=1 doublons=1'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def clean_url(url):
    if '?' not in url:
        return url
    base, query = url.split('?', 1)
    params = []
    for pair in query.split('&'):
        if not pair:
            continue
        k = pair.split('=', 1)[0].lower()
        if not (k.startswith('utm_') or k in ('ref', 'source')):
            params.append(pair)
    if params:
        return base + '?' + '&'.join(sorted(params))
    return base

def words(text):
    return set(re.findall(r'\\w+', text.lower()))

seen_urls = set()
kept_articles = [] # list of (id, set_of_words)

recus = 0
conserves = 0
doublons = 0

for ligne in lignes:
    if not ligne.startswith('ITEM '):
        continue
    tokens = ligne[len('ITEM '):].split(' ')
    item_id = ""
    url = ""
    title_words = []
    
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if tok.startswith('id='):
            item_id = tok.split('=', 1)[1]
        elif tok.startswith('url='):
            url = tok.split('=', 1)[1]
        elif tok.startswith('title='):
            title_words = tokens[i:]
            title_words[0] = title_words[0].split('=', 1)[1]
            break
        i += 1
        
    title = ' '.join(title_words)
    c_url = clean_url(url)
    w_title = words(title)
    
    recus += 1
    
    # 1. Doublon URL
    if c_url in seen_urls:
        print(f"STATUS id={item_id} action=DOUBLON_URL")
        doublons += 1
        continue
        
    # 2. Doublon Titre Jaccard
    is_dupe_title = False
    for kid, kw in kept_articles:
        union = len(w_title | kw)
        inter = len(w_title & kw)
        if union > 0 and (inter / union) >= 0.60:
            is_dupe_title = True
            break
            
    if is_dupe_title:
        print(f"STATUS id={item_id} action=DOUBLON_TITRE")
        doublons += 1
        continue
        
    # Conserve
    seen_urls.add(c_url)
    kept_articles.append((item_id, w_title))
    conserves += 1
    print(f"STATUS id={item_id} action=CONSERVE")

print(f"SUMMARY recus={recus} conserves={conserves} doublons={doublons}")
`
  },
  {
    id: 'vt3-c3-e3',
    chapter: 3,
    title: 'Simulateur d’ordonnanceur de collecte hybride Push/Pull avec Rate Limiter',
    level: 'n3',
    language: 'python',
    goal: 'Simuler la charge de collecte sur un parc hétérogène de sources en appliquant les quotas de limitation de requêtes.',
    brief:
      'Un robot de veille doit équilibrer ses requêtes sortantes pour respecter la bande passante et éviter d’être banni par les serveurs distants (Rate Limiting HTTP 429) :\n' +
      '- `PUSH_WEBHOOK` : l’information est poussée par le serveur distant vers notre API. Le collecteur local émet 0 requête sortante (`requetes_emises = 0`, `statut = OPTIMAL`).\n' +
      '- `PULL_RSS` ou `PULL_SCRAPING` : le collecteur interroge la source toutes les `periode_sec` secondes.\n\n' +
      'Sur une durée de simulation $S$ secondes :\n' +
      '- Nombre de requêtes sollicitées : $R_{\\text{sollicitees}} = \\lfloor S / \\text{periode_sec} \\rfloor$\n' +
      '- Quota maximal alloué par la limite : $Q_{\\text{max}} = \\lfloor \\text{rpm} \\times (S / 60) \\rfloor$\n' +
      '- Requêtes effectives émises : $R_{\\text{emises}} = \\min(R_{\\text{sollicitees}}, Q_{\\text{max}})$\n' +
      '- Si $R_{\\text{sollicitees}} > Q_{\\text{max}}$ : `statut = THROTTLED` (bridé par le rate limiter)\n' +
      '- Sinon : `statut = OPTIMAL`\n\n' +
      'Entrée :\n' +
      '`DUREE_SIMU sec=<S>`\n' +
      '`FLUX id=<ID> type=<PUSH_WEBHOOK|PULL_RSS|PULL_SCRAPING> periode_sec=<P> rpm=<RPM>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque flux :\n' +
      '  `COLLECT_JOB id=<ID> requetes_emises=<R> statut=<STATUT>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_flux=<N> total_requetes=<R> flux_throttled=<T>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la collecte et le bridage de débit
`,
    hints: [
      'Lire d’abord la ligne DUREE_SIMU pour connaître le temps de simulation S.',
      'Pour les flux Push, les requêtes émises sont nulles.',
      'Comparer les requêtes théoriques avec le quota autorisé calculé sur S.'
    ],
    examples: [
      {
        stdin:
          'DUREE_SIMU sec=3600\n' +
          'FLUX id=cert_webhook type=PUSH_WEBHOOK periode_sec=0 rpm=100\n' +
          'FLUX id=rss_github type=PULL_RSS periode_sec=600 rpm=10\n' +
          'FLUX id=scrape_forum type=PULL_SCRAPING periode_sec=30 rpm=1',
        expected:
          'COLLECT_JOB id=cert_webhook requetes_emises=0 statut=OPTIMAL\n' +
          'COLLECT_JOB id=rss_github requetes_emises=6 statut=OPTIMAL\n' +
          'COLLECT_JOB id=scrape_forum requetes_emises=60 statut=THROTTLED\n' +
          'SUMMARY total_flux=3 total_requetes=66 flux_throttled=1',
        note: 'Le scrape_forum voulait 3600/30 = 120 requêtes, mais le RPM de 1 le bride à 60 requêtes (THROTTLED).'
      }
    ],
    tests: [
      {
        label: 'Simulation courte de 10 minutes avec sources optimales',
        stdin:
          'DUREE_SIMU sec=600\n' +
          'FLUX id=f1 type=PULL_RSS periode_sec=120 rpm=5\n' +
          'FLUX id=f2 type=PUSH_WEBHOOK periode_sec=0 rpm=20',
        expected:
          'COLLECT_JOB id=f1 requetes_emises=5 statut=OPTIMAL\n' +
          'COLLECT_JOB id=f2 requetes_emises=0 statut=OPTIMAL\n' +
          'SUMMARY total_flux=2 total_requetes=5 flux_throttled=0'
      },
      {
        label: 'Toutes les sources en scraping bridé',
        stdin:
          'DUREE_SIMU sec=1800\n' +
          'FLUX id=s1 type=PULL_SCRAPING periode_sec=10 rpm=2\n' +
          'FLUX id=s2 type=PULL_SCRAPING periode_sec=5 rpm=3',
        expected:
          'COLLECT_JOB id=s1 requetes_emises=60 statut=THROTTLED\n' +
          'COLLECT_JOB id=s2 requetes_emises=90 statut=THROTTLED\n' +
          'SUMMARY total_flux=2 total_requetes=150 flux_throttled=2'
      },
      {
        label: 'Simulation d’une heure avec plusieurs webhooks',
        stdin:
          'DUREE_SIMU sec=3600\n' +
          'FLUX id=wh1 type=PUSH_WEBHOOK periode_sec=0 rpm=50\n' +
          'FLUX id=wh2 type=PUSH_WEBHOOK periode_sec=0 rpm=50\n' +
          'FLUX id=rss1 type=PULL_RSS periode_sec=1800 rpm=2',
        expected:
          'COLLECT_JOB id=wh1 requetes_emises=0 statut=OPTIMAL\n' +
          'COLLECT_JOB id=wh2 requetes_emises=0 statut=OPTIMAL\n' +
          'COLLECT_JOB id=rss1 requetes_emises=2 statut=OPTIMAL\n' +
          'SUMMARY total_flux=3 total_requetes=2 flux_throttled=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

duree_simu = 3600
flux_list = []

for ligne in lignes:
    if ligne.startswith('DUREE_SIMU '):
        duree_simu = int(ligne.split('=', 1)[1])
    elif ligne.startswith('FLUX '):
        params = {}
        for tok in ligne[len('FLUX '):].split(' '):
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        flux_list.append(params)

total_req = 0
throttled_count = 0

for f in flux_list:
    fid = f.get('id', 'flux')
    ftype = f.get('type', 'PULL_RSS')
    periode = int(f.get('periode_sec', 60))
    rpm = float(f.get('rpm', 10))
    
    if ftype == 'PUSH_WEBHOOK':
        emises = 0
        statut = 'OPTIMAL'
    else:
        req_sollicitees = duree_simu // periode if periode > 0 else 0
        q_max = int(rpm * (duree_simu / 60.0))
        emises = min(req_sollicitees, q_max)
        if req_sollicitees > q_max:
            statut = 'THROTTLED'
            throttled_count += 1
        else:
            statut = 'OPTIMAL'
            
    print(f"COLLECT_JOB id={fid} requetes_emises={emises} statut={statut}")
    total_req += emises

print(f"SUMMARY total_flux={len(flux_list)} total_requetes={total_req} flux_throttled={throttled_count}")
`
  }
];
