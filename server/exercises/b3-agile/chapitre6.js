/**
 * Exercices Chapitre 6 — Méthodes Agiles B3.
 * Agilité à l'Échelle (Scaling), Approches Hybrides & Gouvernance.
 */
'use strict';

module.exports = [
  {
    id: 'ag3-c6-e1',
    chapter: 6,
    title: 'Matrice de Dépendances Inter-équipes en Program Increment (PI Planning)',
    level: 'n1',
    language: 'python',
    goal: 'Détecter les inversions et blocages de dépendances temporelles entre équipes lors d’un PI Planning SAFe.',
    brief: `<p>À l'échelle de l'entreprise (ex: framework <strong>SAFe</strong>), plusieurs équipes synchronisent leurs livraisons au cours d'un Program Increment (PI) composé de 5 Sprints.<br><br>
Une équipe consommatrice <code>client_squad</code> a besoin d'un composant de <code>supplier_squad</code> avant ou au même sprint que son besoin.<br><br>
Le script lit sur l'entrée standard des dépendances au format :<br>
<code>DEP_LINK id=&lt;nom&gt; supplier=&lt;nom&gt; supplier_sprint=&lt;1..5&gt; client=&lt;nom&gt; client_sprint=&lt;1..5&gt;</code>.<br><br>
Règles :<br>
- Si <code>supplier_sprint &gt; client_sprint</code> :<br>
  Le fournisseur livre après le besoin du client : <code>status=CRITICAL_INVERSION lag=+{supplier_sprint - client_sprint}sprints</code>.<br>
- Si <code>supplier_sprint == client_sprint</code> :<br>
  Livraison au même sprint (tendue) : <code>status=TIGHT_COUPLING lag=0sprints</code>.<br>
- Si <code>supplier_sprint &lt; client_sprint</code> :<br>
  Livraison anticipée : <code>status=FEASIBLE_BUFFER margin=+{client_sprint - supplier_sprint}sprints</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>DEP_AUDIT id={id} status={status} detail={lag ou margin}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser la faisabilité des dépendances inter-équipes
`,
    hints: [
      'Comparer les entiers supplier_sprint et client_sprint.',
      'Si supplier_sprint > client_sprint, c’est une inversion critique.'
    ],
    examples: [
      {
        stdin: 'DEP_LINK id=API_AUTH supplier=CoreTeam supplier_sprint=3 client=MobileTeam client_sprint=2',
        expected: 'DEP_AUDIT id=API_AUTH status=CRITICAL_INVERSION detail=lag=+1sprints',
        note: 'CoreTeam livre au sprint 3 alors que MobileTeam en a besoin au sprint 2 : blocage critique.'
      }
    ],
    tests: [
      {
        label: 'Couplage tendu au même sprint',
        stdin: 'DEP_LINK id=PAY_GATEWAY supplier=PayTeam supplier_sprint=2 client=CartTeam client_sprint=2',
        expected: 'DEP_AUDIT id=PAY_GATEWAY status=TIGHT_COUPLING detail=lag=0sprints'
      },
      {
        label: 'Marge confortable avec livraison anticipée',
        stdin: 'DEP_LINK id=DB_SCHEMA supplier=DataTeam supplier_sprint=1 client=PortalTeam client_sprint=4',
        expected: 'DEP_AUDIT id=DB_SCHEMA status=FEASIBLE_BUFFER detail=margin=+3sprints'
      },
      {
        label: 'Deux dépendances consécutives',
        stdin: 'DEP_LINK id=D1 supplier=S1 supplier_sprint=4 client=C1 client_sprint=2\nDEP_LINK id=D2 supplier=S2 supplier_sprint=1 client=C2 client_sprint=2',
        expected: 'DEP_AUDIT id=D1 status=CRITICAL_INVERSION detail=lag=+2sprints\nDEP_AUDIT id=D2 status=FEASIBLE_BUFFER detail=margin=+1sprints'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('DEP_LINK'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    did = params.get('id', 'DEP')
    s_sp = int(params.get('supplier_sprint', 1))
    c_sp = int(params.get('client_sprint', 1))
    
    if s_sp > c_sp:
        status = 'CRITICAL_INVERSION'
        detail = f"lag=+{s_sp - c_sp}sprints"
    elif s_sp == c_sp:
        status = 'TIGHT_COUPLING'
        detail = 'lag=0sprints'
    else:
        status = 'FEASIBLE_BUFFER'
        detail = f"margin=+{c_sp - s_sp}sprints"
        
    print(f"DEP_AUDIT id={did} status={status} detail={detail}")
`
  },
  {
    id: 'ag3-c6-e2',
    chapter: 6,
    title: 'Validateur d’Organisation Matricielle Spotify (Squads, Tribes, Chapters)',
    level: 'n2',
    language: 'python',
    goal: 'Contrôler la cohérence de l’affectation des ingénieurs au sein du modèle agile d’entreprise (Spotify Model).',
    brief: `<p>Dans le modèle agile popularisé par Henrik Kniberg (Spotify Model) :<br>
- <strong>Squad</strong> : Cellule autonome pluridisciplinaire (produit, dev, ops).<br>
- <strong>Tribe</strong> : Regroupement de Squads travaillant sur le même domaine métier.<br>
- <strong>Chapter</strong> : Ligne de compétence métier (ex: Chapitre QA, Chapitre Backend) transverse au sein d'une même Tribe.<br>
- <strong>Guild</strong> : Communauté d'intérêt informelle libre à l'échelle de toute l'entreprise.<br><br>
Le script lit sur l'entrée standard des profils au format :<br>
<code>MEMBER_CHECK name=&lt;nom&gt; squad=&lt;nom&gt; tribe=&lt;nom&gt; chapter=&lt;nom&gt; guilds=&lt;g1,g2|NONE&gt;</code>.<br><br>
Règles de validation :<br>
1. Chaque membre doit obligatoirement avoir une Squad non nulle (<code>squad != 'NONE'</code>).<br>
2. Chaque membre doit obligatoirement être rattaché à une Tribe (<code>tribe != 'NONE'</code>).<br>
3. Chaque membre doit avoir un Chapter de compétences (<code>chapter != 'NONE'</code>).<br><br>
Si valide : calculer le nombre de guildes rejointes (0 si <code>guilds == 'NONE'</code>, sinon le nombre d'éléments séparés par virgule).<br>
Afficher :<br>
<code>SPOTIFY_AUDIT name={name} status=VALID tribe={tribe} squad={squad} guild_count={count}</code><br>
Si un élément structurel manque :<br>
<code>SPOTIFY_AUDIT name={name} status=INVALID missing={élément_manquant}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier la cohérence matricielle Spotify
`,
    hints: [
      'Tester dans l’ordre : squad == "NONE", tribe == "NONE", chapter == "NONE".',
      'Si guilds != "NONE", compter les éléments séparés par virgule.'
    ],
    examples: [
      {
        stdin: 'MEMBER_CHECK name=Alice squad=SearchSquad tribe=MusicTribe chapter=Backend guilds=DevOps,CleanCode',
        expected: 'SPOTIFY_AUDIT name=Alice status=VALID tribe=MusicTribe squad=SearchSquad guild_count=2',
        note: 'Membre affecté à une Squad, Tribe, Chapter et 2 guildes : valide.'
      }
    ],
    tests: [
      {
        label: 'Membre sans Squad affectée (orphelin)',
        stdin: 'MEMBER_CHECK name=Bob squad=NONE tribe=MusicTribe chapter=Frontend guilds=NONE',
        expected: 'SPOTIFY_AUDIT name=Bob status=INVALID missing=squad'
      },
      {
        label: 'Membre sans Tribe',
        stdin: 'MEMBER_CHECK name=Charlie squad=CheckoutSquad tribe=NONE chapter=QA guilds=Security',
        expected: 'SPOTIFY_AUDIT name=Charlie status=INVALID missing=tribe'
      },
      {
        label: 'Membre valide sans aucune guilde',
        stdin: 'MEMBER_CHECK name=Diana squad=PlayerSquad tribe=MediaTribe chapter=Mobile guilds=NONE',
        expected: 'SPOTIFY_AUDIT name=Diana status=VALID tribe=MediaTribe squad=PlayerSquad guild_count=0'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('MEMBER_CHECK'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    name = params.get('name', 'USER')
    sq = params.get('squad', 'NONE')
    tr = params.get('tribe', 'NONE')
    ch = params.get('chapter', 'NONE')
    g_raw = params.get('guilds', 'NONE')
    
    if sq == 'NONE' or not sq:
        print(f"SPOTIFY_AUDIT name={name} status=INVALID missing=squad")
    elif tr == 'NONE' or not tr:
        print(f"SPOTIFY_AUDIT name={name} status=INVALID missing=tribe")
    elif ch == 'NONE' or not ch:
        print(f"SPOTIFY_AUDIT name={name} status=INVALID missing=chapter")
    else:
        if g_raw == 'NONE' or not g_raw:
            g_cnt = 0
        else:
            g_cnt = len([x for x in g_raw.split(',') if x.strip()])
        print(f"SPOTIFY_AUDIT name={name} status=VALID tribe={tr} squad={sq} guild_count={g_cnt}")
`
  },
  {
    id: 'ag3-c6-e3',
    chapter: 6,
    title: 'Radar de Maturité d’Équipe et Détecteur de Dette Méthodologique',
    level: 'n3',
    language: 'python',
    goal: 'Calculer l’indice global de maturité agile d’une équipe sur 5 dimensions clés et alerter sur les faiblesses critiques.',
    brief: `<p>L'amélioration continue s'appuie sur des diagnostics réguliers (Radar Agile) évaluant 5 dimensions sur une échelle de 1 à 5 :<br>
- <code>CULTURE</code> (Collaboration, psychologie de sécurité)<br>
- <code>CADENCE</code> (Régularité des livraisons, respect du timeboxing)<br>
- <code>QUALITY</code> (Tests automatisés, intégration continue, DoD)<br>
- <code>PRODUCT</code> (Vision PO, valeur utilisateur, découpage des US)<br>
- <code>FLOW</code> (Gestion du WIP, temps de cycle, autonomie).<br><br>
Le script lit sur l'entrée standard des évaluations au format :<br>
<code>RADAR_EVAL squad=&lt;nom&gt; culture=&lt;1..5&gt; cadence=&lt;1..5&gt; quality=&lt;1..5&gt; product=&lt;1..5&gt; flow=&lt;1..5&gt;</code>.<br><br>
Règles :<br>
- Calculer la moyenne globale <code>avg_score = round(sum_scores / 5.0, 2)</code>.<br>
- Identifier toutes les dimensions ayant un score <strong>strictement inférieur à 3</strong> (zones de vulnérabilité critique nécessitant un coaching).<br>
- Si aucune dimension &lt; 3 : <code>coaching_needed=NONE status=HIGH_MATURITY</code>.<br>
- Sinon : <code>coaching_needed=&lt;liste_dimensions_faibles_séparées_par_virgule&gt; status=COACHING_REQUIRED</code>.<br><br>
Pour chaque ligne, afficher :<br>
<code>RADAR_REPORT squad={squad} avg_score={avg_score}/5 status={status} alerts={coaching_needed}</code></p>`,
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer le radar de maturité agile et identifier les faiblesses
`,
    hints: [
      'Gérer un dictionnaire ordonné des 5 dimensions.',
      'Calculer avg_score = round(somme / 5.0, 2).',
      'Lister les dimensions dont le score est < 3.'
    ],
    examples: [
      {
        stdin: 'RADAR_EVAL squad=Alpha culture=4 cadence=4 quality=4 product=4 flow=4',
        expected: 'RADAR_REPORT squad=Alpha avg_score=4.0/5 status=HIGH_MATURITY alerts=NONE',
        note: 'Moyenne 4.0/5, aucune dimension en dessous de 3 : haute maturité.'
      }
    ],
    tests: [
      {
        label: 'Faiblesse critique sur la qualité et le flux',
        stdin: 'RADAR_EVAL squad=Beta culture=4 cadence=3 quality=2 product=4 flow=1',
        expected: 'RADAR_REPORT squad=Beta avg_score=2.8/5 status=COACHING_REQUIRED alerts=quality,flow'
      },
      {
        label: 'Équipe en démarrage avec toutes les dimensions à 2',
        stdin: 'RADAR_EVAL squad=Gamma culture=2 cadence=2 quality=2 product=2 flow=2',
        expected: 'RADAR_REPORT squad=Gamma avg_score=2.0/5 status=COACHING_REQUIRED alerts=culture,cadence,quality,product,flow'
      },
      {
        label: 'Moyenne acceptable avec une seule alerte sur le produit',
        stdin: 'RADAR_EVAL squad=Delta culture=5 cadence=4 quality=4 product=2 flow=4',
        expected: 'RADAR_REPORT squad=Delta avg_score=3.8/5 status=COACHING_REQUIRED alerts=product'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    if not lig.startswith('RADAR_EVAL'):
        continue
    tokens = lig.split()
    params = {}
    for tok in tokens[1:]:
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    sq = params.get('squad', 'SQUAD')
    dims = [
        ('culture', int(params.get('culture', 3))),
        ('cadence', int(params.get('cadence', 3))),
        ('quality', int(params.get('quality', 3))),
        ('product', int(params.get('product', 3))),
        ('flow', int(params.get('flow', 3)))
    ]
    
    tot = sum(val for _, val in dims)
    avg_s = round(tot / 5.0, 2)
    
    weak = [name for name, val in dims if val < 3]
    if weak:
        status = 'COACHING_REQUIRED'
        alerts = ','.join(weak)
    else:
        status = 'HIGH_MATURITY'
        alerts = 'NONE'
        
    print(f"RADAR_REPORT squad={sq} avg_score={avg_s}/5 status={status} alerts={alerts}")
`
  }
];
