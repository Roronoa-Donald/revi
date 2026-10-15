// server/exercises/b3-veille/chapitre2.js
// Exercices du Module 2 : Cycle du Renseignement, Requêtes Booléennes & Signaux Faibles (idPrefix: vt3)

module.exports = [
  {
    id: 'vt3-c2-e1',
    chapter: 2,
    title: 'Générateur et normalisateur de requêtes booléennes avancées',
    level: 'n1',
    language: 'python',
    goal: 'Construire une requête booléenne de recherche d’ingénierie conforme aux standards de documentation et de dorking.',
    brief:
      'Dans la phase de ciblage et de sourcing documentaire, la recherche d’information emploie des équations booléennes strictes et des opérateurs de filtrage :\n' +
      '- Terme principal entre guillemets stricts : `"<terme>"`\n' +
      '- Termes obligatoires inclus combinés en `OR` : `(<inc1> OR <inc2> ...)` (termes triés alphabétiquement)\n' +
      '- Termes exclus précédés du signe moins `-` : `-<exc1> -<exc2> ...` (termes triés alphabétiquement)\n' +
      '- Filtre de domaine : `site:<domaine>`\n' +
      '- Filtre de format de fichier : `filetype:<extension>`\n\n' +
      'Entrée :\n' +
      '`QUERY terme=<T> include=<I1,I2,...> exclude=<E1,E2,...> site=<DOM> filetype=<EXT>`\n' +
      '(les attributs `include`, `exclude`, `site` ou `filetype` peuvent être omis ou vides)\n\n' +
      'Sortie :\n' +
      '`NORMALIZED_QUERY raw=<REQUÊTE>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : générer la requête booléenne normalisée
`,
    hints: [
      'Extraire les paramètres via un dictionnaire clé/valeur.',
      'Trier les termes include et exclude par ordre alphabétique.',
      'Assembler les composants séparés par un espace uniquement s’ils sont présents et non vides.'
    ],
    examples: [
      {
        stdin: 'QUERY terme=quantum computing include=qubit,teleportation exclude=crypto,gaming site=arxiv.org filetype=pdf',
        expected: 'NORMALIZED_QUERY raw="quantum computing" (qubit OR teleportation) -crypto -gaming site:arxiv.org filetype:pdf',
        note: 'La requête contient le terme exact, les alternatives entre parenthèses, les exclusions et les filtres techniques.'
      }
    ],
    tests: [
      {
        label: 'Requête complète avec tous les opérateurs',
        stdin: 'QUERY terme=zero trust include=iam,microsegmentation exclude=vpn,legacy site=nist.gov filetype=pdf',
        expected: 'NORMALIZED_QUERY raw="zero trust" (iam OR microsegmentation) -legacy -vpn site:nist.gov filetype:pdf'
      },
      {
        label: 'Requête simple sans exclusions ni formats',
        stdin: 'QUERY terme=ebpf include=xdp,kernel site=kernel.org',
        expected: 'NORMALIZED_QUERY raw="ebpf" (kernel OR xdp) site:kernel.org'
      },
      {
        label: 'Requête avec terme seul et exclusion',
        stdin: 'QUERY terme=rag exclude=langchain,llamaindex',
        expected: 'NORMALIZED_QUERY raw="rag" -langchain -llamaindex'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for ligne in lignes:
    if not ligne.startswith('QUERY '):
        continue
    params = {}
    pattern = r'(terme|include|exclude|site|filetype)=(.*?)(?=\\s+(?:terme|include|exclude|site|filetype)=|$)'
    for k, v in re.findall(pattern, ligne):
        params[k] = v.strip()
            
    terme = params.get('terme', '')
    include_raw = params.get('include', '')
    exclude_raw = params.get('exclude', '')
    site = params.get('site', '')
    filetype = params.get('filetype', '')
    
    parts = []
    if terme:
        parts.append(f'"{terme}"')
        
    if include_raw:
        inc_list = sorted([x.strip() for x in include_raw.split(',') if x.strip()])
        if inc_list:
            parts.append(f"({' OR '.join(inc_list)})")
            
    if exclude_raw:
        exc_list = sorted([x.strip() for x in exclude_raw.split(',') if x.strip()])
        for e in exc_list:
            parts.append(f"-{e}")
            
    if site:
        parts.append(f"site:{site}")
        
    if filetype:
        parts.append(f"filetype:{filetype}")
        
    print(f"NORMALIZED_QUERY raw={' '.join(parts)}")
`
  },
  {
    id: 'vt3-c2-e2',
    chapter: 2,
    title: 'Auditeur de fiabilité des sources d’information (Score pondéré)',
    level: 'n2',
    language: 'python',
    goal: 'Évaluer la crédibilité d’une source d’information sur cinq axes méthodologiques pondérés.',
    brief:
      'Dans le processus de veille, chaque source est évaluée sur une échelle de 1 à 5 sur cinq critères avec pondération relative :\n' +
      '- `autorite` (compétence reconnue de l’auteur ou de l’organisme) : coefficient 30%\n' +
      '- `neutralite` (absence de conflit d’intérêts ou de biais publicitaire) : coefficient 25%\n' +
      '- `tracabilite` (présence de liens vers les sources primaires, brevets, code) : coefficient 20%\n' +
      '- `croisement` (validation des faits par d’autres sources indépendantes) : coefficient 15%\n' +
      '- `fraicheur` (date de révision et actualité du contenu) : coefficient 10%\n\n' +
      'Calcul du score global sur 100 :\n' +
      '$$\\text{Score} = (0.30 \\times A + 0.25 \\times N + 0.20 \\times T + 0.15 \\times C + 0.10 \\times F) \\times 20$$\n' +
      '(le score est arrondi à 1 décimale)\n\n' +
      'Palier de validation éditoriale :\n' +
      '- $\\text{Score} \\ge 80.0$ : `QUALIFIEE`\n' +
      '- $65.0 \\le \\text{Score} < 80.0$ : `SECONDAIRE`\n' +
      '- $50.0 \\le \\text{Score} < 65.0$ : `SUSPECTE`\n' +
      '- $\\text{Score} < 50.0$ : `REJETEE`\n\n' +
      'Entrée :\n' +
      '`SOURCE nom=<N> autorite=<A> neutralite=<N> tracabilite=<T> croisement=<C> fraicheur=<F>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque source :\n' +
      '  `AUDIT nom=<N> score=<SCORE> palier=<PALIER>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_sources=<N> qualifiees=<Q> rejetees=<R>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la fiabilité des sources d'information
`,
    hints: [
      'Calculer la somme pondérée des notes de 1 à 5.',
      'Multiplier par 20 pour ramener sur une échelle de 0 à 100.',
      'Appliquer les seuils stricts pour déterminer le palier.'
    ],
    examples: [
      {
        stdin:
          'SOURCE nom=ACM_Transactions autorite=5 neutralite=5 tracabilite=5 croisement=4 fraicheur=4\n' +
          'SOURCE nom=Blog_Tech_Indep autorite=3 neutralite=4 tracabilite=3 croisement=3 fraicheur=5\n' +
          'SOURCE nom=Forum_Non_Verifie autorite=1 neutralite=2 tracabilite=1 croisement=1 fraicheur=4',
        expected:
          'AUDIT nom=ACM_Transactions score=95.0 palier=QUALIFIEE\n' +
          'AUDIT nom=Blog_Tech_Indep score=69.0 palier=SECONDAIRE\n' +
          'AUDIT nom=Forum_Non_Verifie score=31.0 palier=REJETEE\n' +
          'SUMMARY total_sources=3 qualifiees=1 rejetees=1',
        note: 'ACM_Transactions atteint 95.0/100 (QUALIFIEE), Forum_Non_Verifie 31.0/100 (REJETEE).'
      }
    ],
    tests: [
      {
        label: 'Source avec score frontière suspecte',
        stdin:
          'SOURCE nom=Site_Marketing autorite=2 neutralite=2 tracabilite=3 croisement=3 fraicheur=4\n' +
          'SOURCE nom=Arxiv_Preprint autorite=4 neutralite=5 tracabilite=4 croisement=3 fraicheur=5',
        expected:
          'AUDIT nom=Site_Marketing score=51.0 palier=SUSPECTE\n' +
          'AUDIT nom=Arxiv_Preprint score=84.0 palier=QUALIFIEE\n' +
          'SUMMARY total_sources=2 qualifiees=1 rejetees=0'
      },
      {
        label: 'Toutes les sources qualifiées',
        stdin:
          'SOURCE nom=RFC_Editor autorite=5 neutralite=5 tracabilite=5 croisement=5 fraicheur=5\n' +
          'SOURCE nom=ANSSI_Bulletins autorite=5 neutralite=5 tracabilite=4 croisement=4 fraicheur=5',
        expected:
          'AUDIT nom=RFC_Editor score=100.0 palier=QUALIFIEE\n' +
          'AUDIT nom=ANSSI_Bulletins score=93.0 palier=QUALIFIEE\n' +
          'SUMMARY total_sources=2 qualifiees=2 rejetees=0'
      },
      {
        label: 'Source rejetée avec note minimale',
        stdin:
          'SOURCE nom=Rumeur_Twitter autorite=1 neutralite=1 tracabilite=1 croisement=1 fraicheur=5',
        expected:
          'AUDIT nom=Rumeur_Twitter score=28.0 palier=REJETEE\n' +
          'SUMMARY total_sources=1 qualifiees=0 rejetees=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

qualifiees = 0
rejetees = 0
total = 0

for ligne in lignes:
    if not ligne.startswith('SOURCE '):
        continue
    params = {}
    for token in ligne[len('SOURCE '):].split(' '):
        if '=' in token:
            k, v = token.split('=', 1)
            params[k] = v
            
    nom = params.get('nom', 'Source')
    a = float(params.get('autorite', 1))
    n = float(params.get('neutralite', 1))
    t = float(params.get('tracabilite', 1))
    c = float(params.get('croisement', 1))
    f = float(params.get('fraicheur', 1))
    
    score = (0.30 * a + 0.25 * n + 0.20 * t + 0.15 * c + 0.10 * f) * 20.0
    
    if score >= 80.0:
        palier = 'QUALIFIEE'
        qualifiees += 1
    elif score >= 65.0:
        palier = 'SECONDAIRE'
    elif score >= 50.0:
        palier = 'SUSPECTE'
    else:
        palier = 'REJETEE'
        rejetees += 1
        
    print(f"AUDIT nom={nom} score={score:.1f} palier={palier}")
    total += 1

print(f"SUMMARY total_sources={total} qualifiees={qualifiees} rejetees={rejetees}")
`
  },
  {
    id: 'vt3-c2-e3',
    chapter: 2,
    title: 'Détecteur de signaux faibles par accélération d’émergence lexicale',
    level: 'n3',
    language: 'python',
    goal: 'Analyser une série temporelle d’occurrences pour distinguer les signaux faibles émergents du bruit de fond et des tendances lourdes.',
    brief:
      'Dans la théorie du renseignement technologique (Igor Ansoff), un **signal faible** est caractérisé par une faible occurrence globale mais une forte dérivée d’accélération (taux d’augmentation exponentiel) entre périodes consécutives.\n\n' +
      'Pour une série de 4 trimestres $c_1, c_2, c_3, c_4$ :\n' +
      '- Total d’occurrences : $S = c_1 + c_2 + c_3 + c_4$\n' +
      '- Taux de croissance trimestriel récent : $\\text{croissance} = \\frac{c_4 - c_3}{\\max(1, c_3)} \\times 100$ (en %)\n\n' +
      'Typologie du signal :\n' +
      '1. Si $S < 20$ et $c_4 \\ge 2 \\times c_3$ et $c_4 \\ge 4$ : `SIGNAL_FAIBLE` (faible volume, doublement brusque au dernier trimestre)\n' +
      '2. Si $S \\ge 50$ et $c_4 > c_3$ : `TENDANCE_LOURDE` (fort volume continu et expansion)\n' +
      '3. Si $S \\ge 50$ et $c_4 \\le c_3$ : `TENDANCE_SATUREE` (fort volume mais stagnation/recul)\n' +
      '4. Si $c_4 \\le 2$ et $S < 10$ : `BRUIT_DE_FOND` (anecdote isolée non significative)\n' +
      '5. Dans les autres cas : `EMERGENCE_MODEREE`\n\n' +
      'Entrée :\n' +
      '`SERIE mot=<M> counts=<c1,c2,c3,c4>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque terme :\n' +
      '  `SIGNAL_STATUS mot=<M> total=<S> croissance=<C>% statut=<STATUT>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_termes=<N> signaux_faibles=<K> tendances_lourdes=<T>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les signaux temporels
`,
    hints: [
      'Découper la chaîne des comptes par virgule pour obtenir les entiers c1, c2, c3, c4.',
      'Appliquer les règles dans l’ordre strict de priorité 1 à 5.',
      'Formater la croissance avec un entier ou un arrondi clair : f"{croissance:.1f}".'
    ],
    examples: [
      {
        stdin:
          'SERIE mot=PostQuantum counts=0,1,2,6\n' +
          'SERIE mot=Kubernetes counts=20,25,30,35\n' +
          'SERIE mot=Metaverse counts=30,25,20,15\n' +
          'SERIE mot=LangageX counts=1,0,1,1',
        expected:
          'SIGNAL_STATUS mot=PostQuantum total=9 croissance=200.0% statut=SIGNAL_FAIBLE\n' +
          'SIGNAL_STATUS mot=Kubernetes total=110 croissance=16.7% statut=TENDANCE_LOURDE\n' +
          'SIGNAL_STATUS mot=Metaverse total=90 croissance=-25.0% statut=TENDANCE_SATUREE\n' +
          'SIGNAL_STATUS mot=LangageX total=3 croissance=0.0% statut=BRUIT_DE_FOND\n' +
          'SUMMARY total_termes=4 signaux_faibles=1 tendances_lourdes=1',
        note: 'PostQuantum totalise 9 mentions avec bond de 2 à 6 (+200%), c’est un signal faible typique.'
      }
    ],
    tests: [
      {
        label: 'Signal faible net et émergence modérée',
        stdin:
          'SERIE mot=Neuromorphic counts=1,1,2,5\n' +
          'SERIE mot=WebAssembly counts=8,10,12,15',
        expected:
          'SIGNAL_STATUS mot=Neuromorphic total=9 croissance=150.0% statut=SIGNAL_FAIBLE\n' +
          'SIGNAL_STATUS mot=WebAssembly total=45 croissance=25.0% statut=EMERGENCE_MODEREE\n' +
          'SUMMARY total_termes=2 signaux_faibles=1 tendances_lourdes=0'
      },
      {
        label: 'Tendances lourdes et saturées avec fort volume',
        stdin:
          'SERIE mot=GenerativeAI counts=15,20,30,45\n' +
          'SERIE mot=Blockchain counts=40,30,20,15',
        expected:
          'SIGNAL_STATUS mot=GenerativeAI total=110 croissance=50.0% statut=TENDANCE_LOURDE\n' +
          'SIGNAL_STATUS mot=Blockchain total=105 croissance=-25.0% statut=TENDANCE_SATUREE\n' +
          'SUMMARY total_termes=2 signaux_faibles=0 tendances_lourdes=1'
      },
      {
        label: 'Bruit de fond pur',
        stdin:
          'SERIE mot=OldFramework counts=1,1,0,1',
        expected:
          'SIGNAL_STATUS mot=OldFramework total=3 croissance=100.0% statut=BRUIT_DE_FOND\n' +
          'SUMMARY total_termes=1 signaux_faibles=0 tendances_lourdes=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

signaux_faibles = 0
tendances_lourdes = 0
total_termes = 0

for ligne in lignes:
    if not ligne.startswith('SERIE '):
        continue
    params = {}
    for token in ligne[len('SERIE '):].split(' '):
        if '=' in token:
            k, v = token.split('=', 1)
            params[k] = v
            
    mot = params.get('mot', 'Terme')
    counts_str = params.get('counts', '0,0,0,0')
    c = [int(x.strip()) for x in counts_str.split(',') if x.strip()]
    if len(c) < 4:
        c += [0] * (4 - len(c))
        
    c1, c2, c3, c4 = c[0], c[1], c[2], c[3]
    total = sum(c)
    denom = max(1, c3)
    croissance = ((c4 - c3) / denom) * 100.0
    
    if total < 20 and c4 >= 2 * c3 and c4 >= 4:
        statut = 'SIGNAL_FAIBLE'
        signaux_faibles += 1
    elif total >= 50 and c4 > c3:
        statut = 'TENDANCE_LOURDE'
        tendances_lourdes += 1
    elif total >= 50 and c4 <= c3:
        statut = 'TENDANCE_SATUREE'
    elif c4 <= 2 and total < 10:
        statut = 'BRUIT_DE_FOND'
    else:
        statut = 'EMERGENCE_MODEREE'
        
    print(f"SIGNAL_STATUS mot={mot} total={total} croissance={croissance:.1f}% statut={statut}")
    total_termes += 1

print(f"SUMMARY total_termes={total_termes} signaux_faibles={signaux_faibles} tendances_lourdes={tendances_lourdes}")
`
  }
];
