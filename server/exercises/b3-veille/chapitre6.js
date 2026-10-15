// server/exercises/b3-veille/chapitre6.js
// Exercices du Module 6 : Restitution Stratégique, Bulletins de Veille & Workflow Kanban (idPrefix: vt3)

module.exports = [
  {
    id: 'vt3-c6-e1',
    chapter: 6,
    title: 'Générateur de bulletin d’alerte de veille synthétique (Curated Digest)',
    level: 'n1',
    language: 'python',
    goal: 'Mettre en forme et prioriser un flux d’articles pour produire un bulletin de veille exécutif hiérarchisé.',
    brief:
      'Dans la restitution de veille, l’attention des décideurs impose une hiérarchisation stricte par criticité de l’information :\n' +
      '- Ordre de priorité : `CRITIQUE` (priorité 1), `MOYENNE` (priorité 2), puis `FAIBLE` (priorité 3).\n' +
      '- En cas d’égalité de criticité, ordonner les articles par identifiant `id` alphabétique croissant.\n\n' +
      'Format de chaque ligne du bulletin :\n' +
      '`BULLETIN_ITEM [<CRITICITE>] (<SOURCE>) <TITRE> (id: <ID>)`\n\n' +
      'Entrée :\n' +
      '`ARTICLE id=<ID> source=<SRC> criticite=<FAIBLE|MOYENNE|CRITIQUE> title=<TITRE>`\n\n' +
      'Sortie :\n' +
      '- Lignes ordonnées du bulletin :\n' +
      '  `BULLETIN_ITEM [<CRITICITE>] (<SRC>) <TITRE> (id: <ID>)`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total=<N> critiques=<C> moyennes=<M> faibles=<F>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : ordonner les articles par criticité et formater le bulletin
`,
    hints: [
      'Attribuer un poids numérique à chaque niveau de criticité (ex: CRITIQUE=1, MOYENNE=2, FAIBLE=3).',
      'Trier la liste avec la clé (poids_criticite, id).',
      'Compter le nombre d’articles par palier pour le bilan final.'
    ],
    examples: [
      {
        stdin:
          'ARTICLE id=A1 source=CERT-FR criticite=CRITIQUE title=Faille d exécution de code dans OpenSSH\n' +
          'ARTICLE id=A2 source=TechCrunch criticite=FAIBLE title=Nouveau design pour l application Slack\n' +
          'ARTICLE id=A3 source=CloudBlog criticite=MOYENNE title=Augmentation des prix de l infrastructure AWS',
        expected:
          'BULLETIN_ITEM [CRITIQUE] (CERT-FR) Faille d exécution de code dans OpenSSH (id: A1)\n' +
          'BULLETIN_ITEM [MOYENNE] (CloudBlog) Augmentation des prix de l infrastructure AWS (id: A3)\n' +
          'BULLETIN_ITEM [FAIBLE] (TechCrunch) Nouveau design pour l application Slack (id: A2)\n' +
          'SUMMARY total=3 critiques=1 moyennes=1 faibles=1',
        note: 'L’article CRITIQUE est affiché en tête, suivi de MOYENNE puis FAIBLE.'
      }
    ],
    tests: [
      {
        label: 'Multiples articles critiques avec départage par identifiant',
        stdin:
          'ARTICLE id=Z1 source=NVD criticite=CRITIQUE title=Vulnérabilité noyau Linux\n' +
          'ARTICLE id=A9 source=ANSSI criticite=CRITIQUE title=Campagne de rançongiciel active',
        expected:
          'BULLETIN_ITEM [CRITIQUE] (ANSSI) Campagne de rançongiciel active (id: A9)\n' +
          'BULLETIN_ITEM [CRITIQUE] (NVD) Vulnérabilité noyau Linux (id: Z1)\n' +
          'SUMMARY total=2 critiques=2 moyennes=0 faibles=0'
      },
      {
        label: 'Tous les articles de niveau faible',
        stdin:
          'ARTICLE id=1 source=DevBlog criticite=FAIBLE title=Nouvelle syntaxe CSS\n' +
          'ARTICLE id=2 source=Medium criticite=FAIBLE title=Astuces productivité VS Code',
        expected:
          'BULLETIN_ITEM [FAIBLE] (DevBlog) Nouvelle syntaxe CSS (id: 1)\n' +
          'BULLETIN_ITEM [FAIBLE] (Medium) Astuces productivité VS Code (id: 2)\n' +
          'SUMMARY total=2 critiques=0 moyennes=0 faibles=2'
      },
      {
        label: 'Un seul article de criticité moyenne',
        stdin: 'ARTICLE id=Solo source=Reuters criticite=MOYENNE title=Rachat d un fournisseur de puces',
        expected:
          'BULLETIN_ITEM [MOYENNE] (Reuters) Rachat d un fournisseur de puces (id: Solo)\n' +
          'SUMMARY total=1 critiques=0 moyennes=1 faibles=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

crit_order = {'CRITIQUE': 1, 'MOYENNE': 2, 'FAIBLE': 3}
articles = []
c_crit = 0
c_moy = 0
c_faible = 0

for ligne in lignes:
    if not ligne.startswith('ARTICLE '):
        continue
    tokens = ligne[len('ARTICLE '):].split(' ')
    aid = ""
    source = ""
    criticite = "FAIBLE"
    title_words = []
    
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if tok.startswith('id='):
            aid = tok.split('=', 1)[1]
        elif tok.startswith('source='):
            source = tok.split('=', 1)[1]
        elif tok.startswith('criticite='):
            criticite = tok.split('=', 1)[1]
        elif tok.startswith('title='):
            title_words = tokens[i:]
            title_words[0] = title_words[0].split('=', 1)[1]
            break
        i += 1
        
    title = ' '.join(title_words)
    articles.append((aid, source, criticite, title))
    
    if criticite == 'CRITIQUE':
        c_crit += 1
    elif criticite == 'MOYENNE':
        c_moy += 1
    elif criticite == 'FAIBLE':
        c_faible += 1

articles.sort(key=lambda x: (crit_order.get(x[2], 99), x[0]))

for aid, src, crit, title in articles:
    print(f"BULLETIN_ITEM [{crit}] ({src}) {title} (id: {aid})")

print(f"SUMMARY total={len(articles)} critiques={c_crit} moyennes={c_moy} faibles={c_faible}")
`
  },
  {
    id: 'vt3-c6-e2',
    chapter: 6,
    title: 'Calculateur de radar technologique (Tech Radar ThoughtWorks)',
    level: 'n2',
    language: 'python',
    goal: 'Classer les technologies selon les quatre quadrants et les quatre anneaux d’adoption du Tech Radar.',
    brief:
      'Popularisé par Martin Fowler et ThoughtWorks, le **Tech Radar** projette les technologies émergentes sur quatre quadrants cartographiques et quatre anneaux d’action concentriques :\n' +
      '- Quadrants : `TECHNIQUES`, `OUTILS`, `PLATEFORMES`, `LANGAGES`.\n' +
      '- Anneaux d’action (avec scores de maturité associés) :\n' +
      '  - `ADOPT` (score: 100) : technologie éprouvée, standard d’entreprise fortement recommandé.\n' +
      '  - `TRIAL` (score: 75) : technologie prête pour des projets pilotes réels avec risques maîtrisés.\n' +
      '  - `ASSESS` (score: 50) : technologie prometteuse à évaluer et prototyper en laboratoire.\n' +
      '  - `HOLD` (score: 25) : technologie obsolète, à éviter ou en cours de décommissionnement.\n\n' +
      'Calculs :\n' +
      '- Score de chaque nœud = score associé à son anneau.\n' +
      '- Calculer le score moyen global de toutes les technologies (arrondi à 1 décimale).\n' +
      '- Identifier le quadrant cumulant le score total le plus élevé.\n\n' +
      'Entrée :\n' +
      '`TECH nom=<N> quadrant=<TECHNIQUES|OUTILS|PLATEFORMES|LANGAGES> anneau=<ADOPT|TRIAL|ASSESS|HOLD>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque technologie :\n' +
      '  `RADAR_NODE nom=<N> quad=<Q> ring=<R> score=<SCORE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_nodes=<N> top_quadrant=<Q> avg_score=<MOY>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : projeter les technologies dans le radar
`,
    hints: [
      'Associer chaque anneau à sa valeur numérique (ADOPT:100, TRIAL:75, ASSESS:50, HOLD:25).',
      'Cumuler les scores par quadrant pour déterminer le top quadrant.',
      'Calculer la moyenne arithmétique globale.'
    ],
    examples: [
      {
        stdin:
          'TECH nom=Kubernetes quadrant=PLATEFORMES anneau=ADOPT\n' +
          'TECH nom=Rust quadrant=LANGAGES anneau=TRIAL\n' +
          'TECH nom=eBPF quadrant=TECHNIQUES anneau=ASSESS\n' +
          'TECH nom=SVN quadrant=OUTILS anneau=HOLD',
        expected:
          'RADAR_NODE nom=Kubernetes quad=PLATEFORMES ring=ADOPT score=100\n' +
          'RADAR_NODE nom=Rust quad=LANGAGES ring=TRIAL score=75\n' +
          'RADAR_NODE nom=eBPF quad=TECHNIQUES ring=ASSESS score=50\n' +
          'RADAR_NODE nom=SVN quad=OUTILS ring=HOLD score=25\n' +
          'SUMMARY total_nodes=4 top_quadrant=PLATEFORMES avg_score=62.5',
        note: 'Le quadrant PLATEFORMES cumule 100 points et devance les autres.'
      }
    ],
    tests: [
      {
        label: 'Technologies multiples avec égalité de score sur un quadrant',
        stdin:
          'TECH nom=Docker quadrant=OUTILS anneau=ADOPT\n' +
          'TECH nom=Terraform quadrant=OUTILS anneau=ADOPT\n' +
          'TECH nom=Go quadrant=LANGAGES anneau=ADOPT',
        expected:
          'RADAR_NODE nom=Docker quad=OUTILS ring=ADOPT score=100\n' +
          'RADAR_NODE nom=Terraform quad=OUTILS ring=ADOPT score=100\n' +
          'RADAR_NODE nom=Go quad=LANGAGES ring=ADOPT score=100\n' +
          'SUMMARY total_nodes=3 top_quadrant=OUTILS avg_score=100.0'
      },
      {
        label: 'Toutes les technologies en évaluation (ASSESS)',
        stdin:
          'TECH nom=Quantum quadrant=TECHNIQUES anneau=ASSESS\n' +
          'TECH nom=Zig quadrant=LANGAGES anneau=ASSESS',
        expected:
          'RADAR_NODE nom=Quantum quad=TECHNIQUES ring=ASSESS score=50\n' +
          'RADAR_NODE nom=Zig quad=LANGAGES ring=ASSESS score=50\n' +
          'SUMMARY total_nodes=2 top_quadrant=LANGAGES avg_score=50.0'
      },
      {
        label: 'Un seul nœud',
        stdin: 'TECH nom=Kafka quadrant=PLATEFORMES anneau=TRIAL',
        expected:
          'RADAR_NODE nom=Kafka quad=PLATEFORMES ring=TRIAL score=75\n' +
          'SUMMARY total_nodes=1 top_quadrant=PLATEFORMES avg_score=75.0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

ring_scores = {'ADOPT': 100, 'TRIAL': 75, 'ASSESS': 50, 'HOLD': 25}
quad_totals = {}
total_score = 0
count = 0

for ligne in lignes:
    if not ligne.startswith('TECH '):
        continue
    params = {}
    for tok in ligne[len('TECH '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    nom = params.get('nom', 'Tech')
    quad = params.get('quadrant', 'TECHNIQUES')
    ring = params.get('anneau', 'ASSESS')
    
    score = ring_scores.get(ring, 50)
    print(f"RADAR_NODE nom={nom} quad={quad} ring={ring} score={score}")
    
    quad_totals[quad] = quad_totals.get(quad, 0) + score
    total_score += score
    count += 1

top_q = ""
max_sc = -1
for q in sorted(quad_totals.keys()):
    if quad_totals[q] > max_sc:
        max_sc = quad_totals[q]
        top_q = q

avg_sc = (total_score / count) if count > 0 else 0.0
print(f"SUMMARY total_nodes={count} top_quadrant={top_q} avg_score={avg_sc:.1f}")
`
  },
  {
    id: 'vt3-c6-e3',
    chapter: 6,
    title: 'Simulateur de gouvernance d’équipe et workflow Kanban de veille',
    level: 'n3',
    language: 'python',
    goal: 'Mesurer la performance d’une cellule de veille en calculant le temps de cycle (Lead Time) et le taux d’approbation éditoriale.',
    brief:
      'Dans une cellule de veille collaborative, les articles cheminent à travers un workflow éditorial en quatre étapes horodatées (en heures) :\n' +
      '- `COLLECTE` ($T_1$) : repérage initial par le veilleur.\n' +
      '- `EVALUATION` ($T_2$) : qualification de fiabilité et scoring.\n' +
      '- `VALIDATION` ($T_3$) : revue par le Lead Analyst.\n' +
      '- `DIFFUSION` ($T_4$) : publication dans le livret ou dashboard.\n\n' +
      'Règles de calcul du cycle de traitement (Lead Time) :\n' +
      '- Si l’article est `DIFFUSE` : $\\text{cycle} = T_4 - T_1$ (heures).\n' +
      '- Si l’article est `REJETE` : $\\text{cycle} = T_2 - T_1$ (heures, arrêt au stade évaluation).\n\n' +
      'Bilan d’équipe :\n' +
      '- Taux d’approbation : $\\text{taux} = (\\frac{\\text{diffusés}}{\\text{total soumissions}}) \\times 100$ (en %, arrondi à 1 décimale).\n' +
      '- Temps de cycle moyen des articles diffusés : $\\text{moyenne} = \\frac{\\sum \\text{cycles diffusés}}{\\text{diffusés}}$ (arrondi à 1 décimale).\n\n' +
      'Entrée :\n' +
      '`KANBAN_CARD id=<ID> veilleur=<V> t1=<T1> t2=<T2> t3=<T3> t4=<T4> decision=<DIFFUSE|REJETE>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque carte :\n' +
      '  `CARD_RESULT id=<ID> veilleur=<V> statut=<DIFFUSE|REJETE> cycle_time=<T>h`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_soumissions=<N> diffuses=<D> taux_approbation=<T>% avg_cycle_time=<MOY>h`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les temps de cycle et le bilan éditorial
`,
    hints: [
      'Convertir les temps T1, T2, T3, T4 en entiers ou flottants.',
      'Calculer cycle = T4 - T1 si DIFFUSE, sinon T2 - T1 si REJETE.',
      'Suivre la somme des temps de cycle des seuls articles diffusés pour calculer avg_cycle_time.'
    ],
    examples: [
      {
        stdin:
          'KANBAN_CARD id=C1 veilleur=Alice t1=0 t2=2 t3=5 t4=8 decision=DIFFUSE\n' +
          'KANBAN_CARD id=C2 veilleur=Bob t1=1 t2=3 t3=0 t4=0 decision=REJETE\n' +
          'KANBAN_CARD id=C3 veilleur=Alice t1=10 t2=12 t3=14 t4=16 decision=DIFFUSE',
        expected:
          'CARD_RESULT id=C1 veilleur=Alice statut=DIFFUSE cycle_time=8h\n' +
          'CARD_RESULT id=C2 veilleur=Bob statut=REJETE cycle_time=2h\n' +
          'CARD_RESULT id=C3 veilleur=Alice statut=DIFFUSE cycle_time=6h\n' +
          'SUMMARY total_soumissions=3 diffuses=2 taux_approbation=66.7% avg_cycle_time=7.0h',
        note: 'C1 met 8h, C2 est rejeté en 2h, C3 met 6h. Moyenne des diffusés = (8 + 6) / 2 = 7.0h.'
      }
    ],
    tests: [
      {
        label: 'Toutes les soumissions validées et diffusées',
        stdin:
          'KANBAN_CARD id=1 veilleur=Claire t1=0 t2=1 t3=2 t4=4 decision=DIFFUSE\n' +
          'KANBAN_CARD id=2 veilleur=David t1=5 t2=6 t3=7 t4=11 decision=DIFFUSE',
        expected:
          'CARD_RESULT id=1 veilleur=Claire statut=DIFFUSE cycle_time=4h\n' +
          'CARD_RESULT id=2 veilleur=David statut=DIFFUSE cycle_time=6h\n' +
          'SUMMARY total_soumissions=2 diffuses=2 taux_approbation=100.0% avg_cycle_time=5.0h'
      },
      {
        label: 'Toutes les soumissions rejetées au premier stade',
        stdin:
          'KANBAN_CARD id=R1 veilleur=Emma t1=0 t2=1 t3=0 t4=0 decision=REJETE\n' +
          'KANBAN_CARD id=R2 veilleur=Emma t1=2 t2=4 t3=0 t4=0 decision=REJETE',
        expected:
          'CARD_RESULT id=R1 veilleur=Emma statut=REJETE cycle_time=1h\n' +
          'CARD_RESULT id=R2 veilleur=Emma statut=REJETE cycle_time=2h\n' +
          'SUMMARY total_soumissions=2 diffuses=0 taux_approbation=0.0% avg_cycle_time=0.0h'
      },
      {
        label: 'Une seule soumission diffusée avec cycle long',
        stdin: 'KANBAN_CARD id=Solo veilleur=Hugo t1=0 t2=10 t3=20 t4=30 decision=DIFFUSE',
        expected:
          'CARD_RESULT id=Solo veilleur=Hugo statut=DIFFUSE cycle_time=30h\n' +
          'SUMMARY total_soumissions=1 diffuses=1 taux_approbation=100.0% avg_cycle_time=30.0h'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

cards = []
diffuses = 0
sum_cycle_diff = 0.0

for ligne in lignes:
    if not ligne.startswith('KANBAN_CARD '):
        continue
    params = {}
    for tok in ligne[len('KANBAN_CARD '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    cid = params.get('id', 'Card')
    veilleur = params.get('veilleur', 'Inconnu')
    t1 = float(params.get('t1', 0))
    t2 = float(params.get('t2', 0))
    t3 = float(params.get('t3', 0))
    t4 = float(params.get('t4', 0))
    dec = params.get('decision', 'REJETE')
    
    if dec == 'DIFFUSE':
        cycle = int(round(t4 - t1))
        diffuses += 1
        sum_cycle_diff += cycle
    else:
        cycle = int(round(t2 - t1))
        
    print(f"CARD_RESULT id={cid} veilleur={veilleur} statut={dec} cycle_time={cycle}h")
    cards.append(cid)

total_cards = len(cards)
taux = (diffuses / total_cards * 100.0) if total_cards > 0 else 0.0
avg_cycle = (sum_cycle_diff / diffuses) if diffuses > 0 else 0.0

print(f"SUMMARY total_soumissions={total_cards} diffuses={diffuses} taux_approbation={taux:.1f}% avg_cycle_time={avg_cycle:.1f}h")
`
  }
];
