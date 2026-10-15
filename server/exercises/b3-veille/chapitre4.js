// server/exercises/b3-veille/chapitre4.js
// Exercices du Module 4 : Qualification, Indexation TF-IDF & Filtrage Algorithmique (idPrefix: vt3)

module.exports = [
  {
    id: 'vt3-c4-e1',
    chapter: 4,
    title: 'Tokeniseur et filtre de mots vides (Stopwords & Normalisation)',
    level: 'n1',
    language: 'python',
    goal: 'Nettoyer un corpus textuel de veille, supprimer la ponctuation, éliminer les mots vides (stopwords) et extraire le vocabulaire technique saillant.',
    brief:
      'Dans la chaîne de traitement NLP d’un système de veille, le texte brut doit être normalisé avant indexation :\n' +
      '1. Convertir l’ensemble des caractères en minuscules.\n' +
      '2. Remplacer la ponctuation et caractères spéciaux par des espaces : `.,;:!?\'"()[]{}<>-/\\\\_`\n' +
      '3. Extraire tous les tokens (mots) composés de caractères alphanumériques.\n' +
      '4. Filtrer les mots de longueur $\\le 2$ lettres ainsi que les mots vides (stopwords) de la liste de référence :\n' +
      '   `le, la, les, de, du, des, un, une, et, en, pour, sur, par, dans, avec, ce, qui, que, the, a, an, and, of, in, to, for, on, with, is, at, as`\n' +
      '5. Trier les tokens uniques conservés par ordre alphabétique.\n' +
      '6. Calculer le taux de réduction de taille : $\\text{reduction} = (1 - \\frac{\\text{tokens retenus}}{\\text{total tokens initiaux}}) \\times 100$ (en %, arrondi à 1 décimale).\n\n' +
      'Entrée :\n' +
      '`DOC id=<ID> text=<TEXTE>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque document :\n' +
      '  `TOKENS id=<ID> count=<N> words=<w1,w2,...> reduction=<R>%`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_docs=<N> total_tokens=<T>` (somme des tokens retenus)',
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : normaliser, filtrer les stopwords et calculer la réduction
`,
    hints: [
      'Utiliser re.sub pour nettoyer la ponctuation avant de faire split().',
      'Créer un ensemble (set) de stopwords pour une vérification en O(1).',
      'Attention : le taux de réduction se calcule sur le nombre de tokens retenus divisé par le total des tokens initiaux.'
    ],
    examples: [
      {
        stdin: 'DOC id=1 text=Le cloud et les micro-services dans le datacenter avec Docker.',
        expected:
          'TOKENS id=1 count=5 words=cloud,datacenter,docker,micro,services reduction=54.5%\n' +
          'SUMMARY total_docs=1 total_tokens=5',
        note: 'Tokens initiaux: 11 mots. Retenus: cloud, micro, services, datacenter, docker (5 mots). Réduction de 54.5%.'
      }
    ],
    tests: [
      {
        label: 'Deux documents bilingues avec ponctuation diverse',
        stdin:
          'DOC id=A text=Architecture of zero-trust networks with modern cryptography.\n' +
          'DOC id=B text=Déploiement d un cluster Kubernetes sur des serveurs Linux.',
        expected:
          'TOKENS id=A count=6 words=architecture,cryptography,modern,networks,trust,zero reduction=25.0%\n' +
          'TOKENS id=B count=5 words=cluster,déploiement,kubernetes,linux,serveurs reduction=44.4%\n' +
          'SUMMARY total_docs=2 total_tokens=11'
      },
      {
        label: 'Document très bruité avec presque uniquement des stopwords',
        stdin: 'DOC id=Z text=Dans ce que le pour et avec un...',
        expected:
          'TOKENS id=Z count=0 words= reduction=100.0%\n' +
          'SUMMARY total_docs=1 total_tokens=0'
      },
      {
        label: 'Termes techniques et acronymes',
        stdin: 'DOC id=T1 text=API REST GraphQL gRPC pour les échanges de données.',
        expected:
          'TOKENS id=T1 count=6 words=api,données,graphql,grpc,rest,échanges reduction=33.3%\n' +
          'SUMMARY total_docs=1 total_tokens=6'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

stopwords = {
    'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'en', 'pour', 'sur', 'par',
    'dans', 'avec', 'ce', 'qui', 'que', 'the', 'a', 'an', 'and', 'of', 'in', 'to', 'for',
    'on', 'with', 'is', 'at', 'as'
}

total_retained = 0
doc_count = 0

for ligne in lignes:
    if not ligne.startswith('DOC '):
        continue
    parts = ligne.split(' ', 2)
    doc_id = parts[1].split('=', 1)[1]
    raw_text = parts[2].split('=', 1)[1] if len(parts) > 2 else ''
    
    # Nettoyage ponctuation
    cleaned = ''.join(ch if (ch.isalnum() or ch in 'àâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ') else ' ' for ch in raw_text.lower())
    initial_tokens = [w for w in cleaned.split() if w]
    
    retained_list = [w for w in initial_tokens if len(w) > 2 and w not in stopwords]
    unique_sorted = sorted(set(retained_list))
    
    initial_len = len(initial_tokens)
    retained_len = len(retained_list)
    reduction = ((initial_len - retained_len) / initial_len * 100.0) if initial_len > 0 else 0.0
    
    words_str = ','.join(unique_sorted)
    print(f"TOKENS id={doc_id} count={len(unique_sorted)} words={words_str} reduction={reduction:.1f}%")
    
    total_retained += retained_len
    doc_count += 1

print(f"SUMMARY total_docs={doc_count} total_tokens={total_retained}")
`
  },
  {
    id: 'vt3-c4-e2',
    chapter: 4,
    title: 'Calculateur de score de pertinence TF-IDF sur un corpus de veille',
    level: 'n2',
    language: 'python',
    goal: 'Classer un corpus de documents selon leur score de pertinence TF-IDF pour une requête de veille ciblée.',
    brief:
      'L’algorithme TF-IDF (Term Frequency - Inverse Document Frequency) quantifie l’importance relative d’un mot par rapport à un corpus documentaire :\n' +
      '- Pour un document $d$ et un mot-clé $q$ :\n' +
      '  $$\\text{TF}(q, d) = \\frac{\\text{occurrences de } q \\text{ dans } d}{\\text{nombre total de mots dans } d}$$\n' +
      '- Fréquence inverse de document sur le corpus de $N$ documents :\n' +
      '  $$\\text{IDF}(q) = \\ln\\left(\\frac{N + 1}{\\text{DF}(q) + 1}\\right) + 1$$\n' +
      '  où $\\text{DF}(q)$ est le nombre de documents du corpus contenant au moins une fois le terme $q$.\n' +
      '- Score total d’un document $d$ pour la requête :\n' +
      '  $$\\text{Score}(d) = \\sum_{q \\in \\text{requête}} \\text{TF}(q, d) \\times \\text{IDF}(q)$$\n' +
      '(le score est arrondi à 4 décimales)\n\n' +
      'Entrée :\n' +
      '`QUERY words=<q1,q2,...>`\n' +
      '`CORPUS_DOC id=<ID> text=<mots séparés par des espaces>`\n\n' +
      'Sortie :\n' +
      '- Documents triés par score décroissant (en cas d’égalité de score, trier par id alphabétique croissant) :\n' +
      '  `RANK id=<ID> score=<SCORE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY top_doc=<ID> top_score=<SCORE>`',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer TF-IDF et ordonner les documents
`,
    hints: [
      'Extraire d’abord les termes de la requête en minuscules.',
      'Parcourir le corpus pour compter le nombre total de documents N et le DF de chaque terme de requête.',
      'Calculer pour chaque document la somme des TF * IDF pour les termes de la requête.',
      'Utiliser math.log() pour le logarithme népérien.'
    ],
    examples: [
      {
        stdin:
          'QUERY words=quantique,securite\n' +
          'CORPUS_DOC id=D1 text=ordinateur quantique et cryptographie quantique securite absolue\n' +
          'CORPUS_DOC id=D2 text=securite des serveurs cloud linux et pare-feu\n' +
          'CORPUS_DOC id=D3 text=intelligence artificielle et vision par ordinateur',
        expected:
          'RANK id=D1 score=0.6677\n' +
          'RANK id=D2 score=0.1840\n' +
          'RANK id=D3 score=0.0000\n' +
          'SUMMARY top_doc=D1 top_score=0.6677',
        note: 'D1 contient 2 fois "quantique" et 1 fois "securite", obtenant le score maximal.'
      }
    ],
    tests: [
      {
        label: 'Deux documents avec termes exclusifs',
        stdin:
          'QUERY words=blockchain,smart\n' +
          'CORPUS_DOC id=A text=blockchain et smart contracts pour la finance\n' +
          'CORPUS_DOC id=B text=developpement web et design moderne',
        expected:
          'RANK id=A score=0.4016\n' +
          'RANK id=B score=0.0000\n' +
          'SUMMARY top_doc=A top_score=0.4016'
      },
      {
        label: 'Égalité de score avec tri alphabétique par identifiant',
        stdin:
          'QUERY words=rust\n' +
          'CORPUS_DOC id=DOC_B text=langage rust performance\n' +
          'CORPUS_DOC id=DOC_A text=langage rust securite',
        expected:
          'RANK id=DOC_A score=0.3333\n' +
          'RANK id=DOC_B score=0.3333\n' +
          'SUMMARY top_doc=DOC_A top_score=0.3333'
      },
      {
        label: 'Aucun document ne contenant les termes de requête',
        stdin:
          'QUERY words=inexistant\n' +
          'CORPUS_DOC id=D1 text=article un\n' +
          'CORPUS_DOC id=D2 text=article deux',
        expected:
          'RANK id=D1 score=0.0000\n' +
          'RANK id=D2 score=0.0000\n' +
          'SUMMARY top_doc=D1 top_score=0.0000'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

query_words = []
docs = []

for ligne in lignes:
    if ligne.startswith('QUERY '):
        raw = ligne.split('=', 1)[1]
        query_words = [w.strip().lower() for w in raw.split(',') if w.strip()]
    elif ligne.startswith('CORPUS_DOC '):
        parts = ligne.split(' ', 2)
        doc_id = parts[1].split('=', 1)[1]
        text_raw = parts[2].split('=', 1)[1] if len(parts) > 2 else ''
        words = [w.lower() for w in text_raw.split() if w]
        docs.append((doc_id, words))

N = len(docs)
# Calcul de DF pour chaque terme de la requete
df = {}
for q in query_words:
    df[q] = sum(1 for (did, words) in docs if q in words)

# Calcul IDF pour chaque terme
idf = {}
for q in query_words:
    idf[q] = math.log((N + 1) / (df[q] + 1)) + 1.0

# Calcul du score pour chaque document
scores = []
for (did, words) in docs:
    total_words = len(words)
    doc_score = 0.0
    if total_words > 0:
        for q in query_words:
            count = words.count(q)
            tf = count / total_words
            doc_score += tf * idf[q]
    scores.append((did, doc_score))

# Tri : score decroissant, puis id croissant
scores.sort(key=lambda item: (-round(item[1], 4), item[0]))

for did, sc in scores:
    print(f"RANK id={did} score={sc:.4f}")

top_id = scores[0][0] if scores else "aucun"
top_sc = scores[0][1] if scores else 0.0
print(f"SUMMARY top_doc={top_id} top_score={top_sc:.4f}")
`
  },
  {
    id: 'vt3-c4-e3',
    chapter: 4,
    title: 'Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)',
    level: 'n3',
    language: 'python',
    goal: 'Appliquer le modèle probabiliste de Naive Bayes pour filtrer automatiquement les alertes entrantes en éliminant le bruit informationnel.',
    brief:
      'Dans la surveillance temps réel, les flux génèrent une surcharge cognitive de notifications parasites. Un filtre probabiliste Naive Bayes calcule la log-vraisemblance d’appartenance aux classes `PERTINENT` et `BRUIT` :\n\n' +
      'Pour une alerte composée des mots $w_1, w_2, \\dots, w_k$ :\n' +
      '$$\\ln P(\\text{Pertinent}|d) = \\ln P_0(\\text{pertinent}) + \\sum_{i=1}^k \\ln P(w_i | \\text{pertinent})$$\n' +
      '$$\\ln P(\\text{Bruit}|d) = \\ln P_0(\\text{bruit}) + \\sum_{i=1}^k \\ln P(w_i | \\text{bruit})$$\n' +
      '(les mots inconnus non présents dans la table de probabilités sont ignorés)\n\n' +
      'Règle de décision :\n' +
      '- Si $\\ln P(\\text{Pertinent}|d) \\ge \\ln P(\\text{Bruit}|d)$ : `decision = PERTINENT`\n' +
      '- Sinon : `decision = BRUIT`\n' +
      '- Différence logarithmique : $\\text{diff} = \\ln P(\\text{Pertinent}|d) - \\ln P(\\text{Bruit}|d)$ (arrondie à 2 décimales)\n\n' +
      'Entrée :\n' +
      '`PRIOR pertinent=<P1> bruit=<P2>`\n' +
      '`PROB word=<W> p_pert=<PP> p_bruit=<PB>`\n' +
      '`ALERT id=<ID> text=<mots séparés par des espaces>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque alerte :\n' +
      '  `CLASSIFICATION id=<ID> decision=<DECISION> diff=<DIFF>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_alertes=<N> retenues=<R> rejetees=<J>`',
    starter: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les log-vraisemblances Naive Bayes et classifier
`,
    hints: [
      'Convertir les probabilités P_pert et P_bruit avec math.log().',
      'Additionner les logs pour chaque mot de l’alerte présent dans la table.',
      'Comparer les sommes cumulées pour statuer sur la décision.'
    ],
    examples: [
      {
        stdin:
          'PRIOR pertinent=0.5 bruit=0.5\n' +
          'PROB word=faille p_pert=0.20 p_bruit=0.01\n' +
          'PROB word=zero-day p_pert=0.15 p_bruit=0.001\n' +
          'PROB word=promo p_pert=0.005 p_bruit=0.30\n' +
          'PROB word=gratuit p_pert=0.01 p_bruit=0.25\n' +
          'ALERT id=A1 text=decouverte d une faille critique zero-day\n' +
          'ALERT id=A2 text=super promo webinaire gratuit pour tous',
        expected:
          'CLASSIFICATION id=A1 decision=PERTINENT diff=8.01\n' +
          'CLASSIFICATION id=A2 decision=BRUIT diff=-7.31\n' +
          'SUMMARY total_alertes=2 retenues=1 rejetees=1',
        note: 'L’alerte A1 a une log-différence largement positive (+8.01) et est retenue.'
      }
    ],
    tests: [
      {
        label: 'Alerte avec mots mixtes départagée par le ratio de cotes',
        stdin:
          'PRIOR pertinent=0.6 bruit=0.4\n' +
          'PROB word=securite p_pert=0.10 p_bruit=0.05\n' +
          'PROB word=sponsorise p_pert=0.01 p_bruit=0.20\n' +
          'ALERT id=X1 text=article securite sponsorise par notre partenaire',
        expected:
          'CLASSIFICATION id=X1 decision=BRUIT diff=-1.90\n' +
          'SUMMARY total_alertes=1 retenues=0 rejetees=1'
      },
      {
        label: 'Toutes les alertes hautement pertinentes',
        stdin:
          'PRIOR pertinent=0.5 bruit=0.5\n' +
          'PROB word=vulnerabilite p_pert=0.25 p_bruit=0.01\n' +
          'ALERT id=K1 text=vulnerabilite linux\n' +
          'ALERT id=K2 text=nouvelle vulnerabilite windows',
        expected:
          'CLASSIFICATION id=K1 decision=PERTINENT diff=3.22\n' +
          'CLASSIFICATION id=K2 decision=PERTINENT diff=3.22\n' +
          'SUMMARY total_alertes=2 retenues=2 rejetees=0'
      },
      {
        label: 'Alerte sans aucun mot connu dans le dictionnaire',
        stdin:
          'PRIOR pertinent=0.7 bruit=0.3\n' +
          'PROB word=ia p_pert=0.10 p_bruit=0.02\n' +
          'ALERT id=EMPTY text=bonjour tout le monde',
        expected:
          'CLASSIFICATION id=EMPTY decision=PERTINENT diff=0.85\n' +
          'SUMMARY total_alertes=1 retenues=1 rejetees=0'
      }
    ],
    solution: `import sys
import math

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

prior_pert = 0.5
prior_bruit = 0.5

prob_dict = {} # word -> (p_pert, p_bruit)
alerts = []

for ligne in lignes:
    if ligne.startswith('PRIOR '):
        for tok in ligne[len('PRIOR '):].split(' '):
            if '=' in tok:
                k, v = tok.split('=', 1)
                if k == 'pertinent':
                    prior_pert = float(v)
                elif k == 'bruit':
                    prior_bruit = float(v)
    elif ligne.startswith('PROB '):
        params = {}
        for tok in ligne[len('PROB '):].split(' '):
            if '=' in tok:
                k, v = tok.split('=', 1)
                params[k] = v
        word = params.get('word', '').lower()
        pp = float(params.get('p_pert', 0.01))
        pb = float(params.get('p_bruit', 0.01))
        prob_dict[word] = (pp, pb)
    elif ligne.startswith('ALERT '):
        parts = ligne.split(' ', 2)
        aid = parts[1].split('=', 1)[1]
        text_raw = parts[2].split('=', 1)[1] if len(parts) > 2 else ''
        alerts.append((aid, text_raw))

log_prior_p = math.log(prior_pert)
log_prior_b = math.log(prior_bruit)

retenues = 0
rejetees = 0

for aid, text_raw in alerts:
    words = [w.lower() for w in text_raw.split() if w]
    
    score_p = log_prior_p
    score_b = log_prior_b
    
    for w in words:
        if w in prob_dict:
            pp, pb = prob_dict[w]
            score_p += math.log(pp)
            score_b += math.log(pb)
            
    diff = score_p - score_b
    if diff >= 0.0:
        decision = 'PERTINENT'
        retenues += 1
    else:
        decision = 'BRUIT'
        rejetees += 1
        
    print(f"CLASSIFICATION id={aid} decision={decision} diff={diff:.2f}")

print(f"SUMMARY total_alertes={len(alerts)} retenues={retenues} rejetees={rejetees}")
`
  }
];
