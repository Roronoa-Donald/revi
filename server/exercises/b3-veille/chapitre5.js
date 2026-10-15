// server/exercises/b3-veille/chapitre5.js
// Exercices du Module 5 : Analyse Prospective, Hype Cycle & Niveaux TRL (idPrefix: vt3)

module.exports = [
  {
    id: 'vt3-c5-e1',
    chapter: 5,
    title: 'Évaluateur d’échelle TRL (Technology Readiness Level de 1 à 9)',
    level: 'n1',
    language: 'python',
    goal: 'Qualifier le niveau de maturité technologique d’une innovation selon la grille standardisée TRL.',
    brief:
      'L’échelle TRL (Technology Readiness Level), standardisée par la NASA, le département de la Défense américain et la Commission Européenne (Horizon Europe), quantifie la maturité d’un projet technologique sur 9 niveaux :\n' +
      '- `TRL 1` : Principes fondamentaux observés et décrits.\n' +
      '- `TRL 2` : Concept technologique et applications potentielles formulés.\n' +
      '- `TRL 3` : Preuve de concept expérimentale (PoC critique) validée en laboratoire.\n' +
      '- `TRL 4` : Composants et maquette validés en laboratoire.\n' +
      '- `TRL 5` : Composants validés dans un environnement représentatif.\n' +
      '- `TRL 6` : Prototype de sous-système testé en environnement représentatif.\n' +
      '- `TRL 7` : Démonstrateur prototype testé en environnement opérationnel.\n' +
      '- `TRL 8` : Système réel achevé, qualifié et testé.\n' +
      '- `TRL 9` : Système opérationnel éprouvé en conditions réelles et en production commerciale.\n\n' +
      'Macro-phases d’industrialisation :\n' +
      '- TRL 1 à 3 : `RECHERCHE`\n' +
      '- TRL 4 à 6 : `DEVELOPPEMENT`\n' +
      '- TRL 7 à 9 : `INDUSTRIALISATION`\n\n' +
      'Entrée :\n' +
      '`TECH nom=<N> trl=<1-9> validation=<REUSSIE|EN_COURS|ECHEC>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque technologie :\n' +
      '  `TRL_EVAL nom=<N> trl=<X> macro_phase=<PHASE> statut=<VALIDE|NON_VALIDE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_techs=<N> maturite_moyenne=<MOY> pretes_production=<P>` (moyenne arrondie à 1 décimale, TRL 9 validé)',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier le TRL et la macro-phase
`,
    hints: [
      'Lire le niveau numérique de TRL.',
      'Assigner la macro-phase selon l’intervalle [1-3], [4-6] ou [7-9].',
      'Le statut est VALIDE si validation=REUSSIE, sinon NON_VALIDE.'
    ],
    examples: [
      {
        stdin:
          'TECH nom=Batterie_Solide trl=4 validation=REUSSIE\n' +
          'TECH nom=IA_Raisonnement trl=7 validation=EN_COURS\n' +
          'TECH nom=Serveur_ARM trl=9 validation=REUSSIE',
        expected:
          'TRL_EVAL nom=Batterie_Solide trl=4 macro_phase=DEVELOPPEMENT statut=VALIDE\n' +
          'TRL_EVAL nom=IA_Raisonnement trl=7 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\n' +
          'TRL_EVAL nom=Serveur_ARM trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\n' +
          'SUMMARY total_techs=3 maturite_moyenne=6.7 pretes_production=1',
        note: 'Seul Serveur_ARM atteint le TRL 9 avec validation réussie.'
      }
    ],
    tests: [
      {
        label: 'Technologies en phase amont de recherche fondamentale',
        stdin:
          'TECH nom=Fusion_Nucleaire trl=2 validation=REUSSIE\n' +
          'TECH nom=Calcul_Quantique_1000q trl=3 validation=REUSSIE',
        expected:
          'TRL_EVAL nom=Fusion_Nucleaire trl=2 macro_phase=RECHERCHE statut=VALIDE\n' +
          'TRL_EVAL nom=Calcul_Quantique_1000q trl=3 macro_phase=RECHERCHE statut=VALIDE\n' +
          'SUMMARY total_techs=2 maturite_moyenne=2.5 pretes_production=0'
      },
      {
        label: 'Technologies avec échecs et statuts non validés',
        stdin:
          'TECH nom=Projet_A trl=5 validation=ECHEC\n' +
          'TECH nom=Projet_B trl=9 validation=ECHEC\n' +
          'TECH nom=Projet_C trl=9 validation=REUSSIE',
        expected:
          'TRL_EVAL nom=Projet_A trl=5 macro_phase=DEVELOPPEMENT statut=NON_VALIDE\n' +
          'TRL_EVAL nom=Projet_B trl=9 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\n' +
          'TRL_EVAL nom=Projet_C trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\n' +
          'SUMMARY total_techs=3 maturite_moyenne=7.7 pretes_production=1'
      },
      {
        label: 'Un seul produit mûr déployé',
        stdin: 'TECH nom=PostgreSQL_16 trl=9 validation=REUSSIE',
        expected:
          'TRL_EVAL nom=PostgreSQL_16 trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\n' +
          'SUMMARY total_techs=1 maturite_moyenne=9.0 pretes_production=1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

techs = []
pretes = 0
total_trl = 0

for ligne in lignes:
    if not ligne.startswith('TECH '):
        continue
    params = {}
    for tok in ligne[len('TECH '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    nom = params.get('nom', 'Tech')
    trl = int(params.get('trl', 1))
    val = params.get('validation', 'EN_COURS')
    
    if trl <= 3:
        macro = 'RECHERCHE'
    elif trl <= 6:
        macro = 'DEVELOPPEMENT'
    else:
        macro = 'INDUSTRIALISATION'
        
    statut = 'VALIDE' if val == 'REUSSIE' else 'NON_VALIDE'
    if trl == 9 and statut == 'VALIDE':
        pretes += 1
        
    total_trl += trl
    techs.append((nom, trl, macro, statut))
    print(f"TRL_EVAL nom={nom} trl={trl} macro_phase={macro} statut={statut}")

moy = (total_trl / len(techs)) if techs else 0.0
print(f"SUMMARY total_techs={len(techs)} maturite_moyenne={moy:.1f} pretes_production={pretes}")
`
  },
  {
    id: 'vt3-c5-e2',
    chapter: 5,
    title: 'Positionneur de phase Gartner Hype Cycle et conseil d’investissement',
    level: 'n2',
    language: 'python',
    goal: 'Positionner une technologie émergente sur la courbe du Hype Cycle de Gartner et émettre une recommandation d’action.',
    brief:
      'Le Hype Cycle modélise l’évolution de la perception publique et de l’adoption réelle d’une technologie à travers cinq phases :\n' +
      '1. `INNOVATION_TRIGGER` (Déclenchement) : buzz < 50 et adoption < 20.\n' +
      '2. `PEAK_EXPECTATIONS` (Pic des attentes) : buzz >= 70 et adoption < 35.\n' +
      '3. `TROUGH_DISILLUSIONMENT` (Gouffre des désillusions) : buzz < 50 et 20 <= adoption < 50.\n' +
      '4. `SLOPE_ENLIGHTENMENT` (Pente de l’éclaircissement) : buzz entre 40 et 75 et 50 <= adoption < 75.\n' +
      '5. `PLATEAU_PRODUCTIVITY` (Plateau de productivité) : adoption >= 75 (quel que soit le buzz).\n' +
      '(Si aucune de ces conditions strictes n’est remplie, affecter la phase intermédiaire `SLOPE_ENLIGHTENMENT`).\n\n' +
      'Recommandations stratégiques associées :\n' +
      '- `INNOVATION_TRIGGER` -> `VEILLE_ACTIVE`\n' +
      '- `PEAK_EXPECTATIONS` -> `PRUDENCE_OBSERVATION`\n' +
      '- `TROUGH_DISILLUSIONMENT` -> `PILOTE_EXPERIMENTATION`\n' +
      '- `SLOPE_ENLIGHTENMENT` -> `ADOPTION_PROGRESSIVE`\n' +
      '- `PLATEAU_PRODUCTIVITY` -> `DEPLOIEMENT_STANDARD`\n\n' +
      'Entrée :\n' +
      '`HYPE nom=<N> buzz=<0-100> adoption=<0-100>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque technologie :\n' +
      '  `HYPE_POSITION nom=<N> phase=<PHASE> recommandation=<REC>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total=<N> repartition=<PHASE1:C,PHASE2:C,...>` (phases triées par ordre alphabétique)',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : déterminer la phase Gartner et la recommandation
`,
    hints: [
      'Évaluer les conditions de phase dans l’ordre : PLATEAU, PEAK, INNOVATION, TROUGH, SLOPE.',
      'Associer chaque phase à son mot-clé de recommandation.',
      'Comptabiliser le nombre d’occurrences de chaque phase pour le bilan final.'
    ],
    examples: [
      {
        stdin:
          'HYPE nom=Metaverse buzz=35 adoption=25\n' +
          'HYPE nom=IA_Generative buzz=85 adoption=20\n' +
          'HYPE nom=Cloud_Public buzz=50 adoption=85\n' +
          'HYPE nom=Ordinateur_Biologique buzz=25 adoption=5',
        expected:
          'HYPE_POSITION nom=Metaverse phase=TROUGH_DISILLUSIONMENT recommandation=PILOTE_EXPERIMENTATION\n' +
          'HYPE_POSITION nom=IA_Generative phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\n' +
          'HYPE_POSITION nom=Cloud_Public phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\n' +
          'HYPE_POSITION nom=Ordinateur_Biologique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\n' +
          'SUMMARY total=4 repartition=INNOVATION_TRIGGER:1,PEAK_EXPECTATIONS:1,PLATEAU_PRODUCTIVITY:1,TROUGH_DISILLUSIONMENT:1',
        note: 'Metaverse est entré dans le gouffre des désillusions, IA Générative au pic d’attentes.'
      }
    ],
    tests: [
      {
        label: 'Technologies en pente d’éclaircissement et plateau',
        stdin:
          'HYPE nom=DevSecOps buzz=60 adoption=65\n' +
          'HYPE nom=Conteneurs_Kubernetes buzz=55 adoption=80',
        expected:
          'HYPE_POSITION nom=DevSecOps phase=SLOPE_ENLIGHTENMENT recommandation=ADOPTION_PROGRESSIVE\n' +
          'HYPE_POSITION nom=Conteneurs_Kubernetes phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\n' +
          'SUMMARY total=2 repartition=PLATEAU_PRODUCTIVITY:1,SLOPE_ENLIGHTENMENT:1'
      },
      {
        label: 'Toutes les technologies en déclenchement initial',
        stdin:
          'HYPE nom=Optique_Photonique buzz=30 adoption=10\n' +
          'HYPE nom=Spintronique buzz=20 adoption=5',
        expected:
          'HYPE_POSITION nom=Optique_Photonique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\n' +
          'HYPE_POSITION nom=Spintronique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\n' +
          'SUMMARY total=2 repartition=INNOVATION_TRIGGER:2'
      },
      {
        label: 'Pic d’attente extrême',
        stdin: 'HYPE nom=AGI_Hyper_Hype buzz=99 adoption=5',
        expected:
          'HYPE_POSITION nom=AGI_Hyper_Hype phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\n' +
          'SUMMARY total=1 repartition=PEAK_EXPECTATIONS:1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

recomms = {
    'INNOVATION_TRIGGER': 'VEILLE_ACTIVE',
    'PEAK_EXPECTATIONS': 'PRUDENCE_OBSERVATION',
    'TROUGH_DISILLUSIONMENT': 'PILOTE_EXPERIMENTATION',
    'SLOPE_ENLIGHTENMENT': 'ADOPTION_PROGRESSIVE',
    'PLATEAU_PRODUCTIVITY': 'DEPLOIEMENT_STANDARD'
}

counts = {}
total = 0

for ligne in lignes:
    if not ligne.startswith('HYPE '):
        continue
    params = {}
    for tok in ligne[len('HYPE '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    nom = params.get('nom', 'Tech')
    buzz = float(params.get('buzz', 0))
    adopt = float(params.get('adoption', 0))
    
    if adopt >= 75:
        phase = 'PLATEAU_PRODUCTIVITY'
    elif buzz >= 70 and adopt < 35:
        phase = 'PEAK_EXPECTATIONS'
    elif buzz < 50 and adopt < 20:
        phase = 'INNOVATION_TRIGGER'
    elif buzz < 50 and (20 <= adopt < 50):
        phase = 'TROUGH_DISILLUSIONMENT'
    elif (40 <= buzz <= 75) and (50 <= adopt < 75):
        phase = 'SLOPE_ENLIGHTENMENT'
    else:
        phase = 'SLOPE_ENLIGHTENMENT'
        
    rec = recomms[phase]
    counts[phase] = counts.get(phase, 0) + 1
    total += 1
    print(f"HYPE_POSITION nom={nom} phase={phase} recommandation={rec}")

rep_str = ','.join(f"{k}:{counts[k]}" for k in sorted(counts.keys()))
print(f"SUMMARY total={total} repartition={rep_str}")
`
  },
  {
    id: 'vt3-c5-e3',
    chapter: 5,
    title: 'Analyseur d’impact technologique croisé SWOT / PESTEL',
    level: 'n3',
    language: 'python',
    goal: 'Agréger les facteurs externes PESTEL en opportunités et menaces pour calculer l’indice de résilience stratégique.',
    brief:
      'La méthode croisée SWOT / PESTEL structure l’analyse prospective d’une rupture technologique :\n' +
      '- Catégories PESTEL : `POLITIQUE`, `ECONOMIQUE`, `SOCIETAL`, `TECHNOLOGIQUE`, `ENVIRONNEMENTAL`, `LEGAL`.\n' +
      '- Nature du facteur : `OPPORTUNITE` (score positif) ou `MENACE` (score négatif).\n' +
      '- Pondération : entier de 1 à 5.\n\n' +
      'Métriques calculées :\n' +
      '- Somme des opportunités : $O = \\sum \\text{poids}_{\\text{OPPORTUNITE}}$\n' +
      '- Somme des menaces : $M = \\sum \\text{poids}_{\\text{MENACE}}$\n' +
      '- Score net : $\\text{Net} = O - M$\n' +
      '- Indice de résilience technologique : $\\text{Résilience} = \\frac{O}{\\max(1, O + M)} \\times 100$ (en %, arrondi à 1 décimale)\n\n' +
      'Position stratégique :\n' +
      '- Si $\\text{Net} \\ge 5$ et $\\text{Résilience} \\ge 60.0\\%$ : `OFFENSIVE`\n' +
      '- Si $\\text{Net} < 0$ et $\\text{Résilience} < 45.0\\%$ : `DEFENSIVE`\n' +
      '- Sinon : `ATTENTISTE`\n\n' +
      'Entrée :\n' +
      '`FACTEUR id=<ID> cat=<P|E|S|T|ENV|L> type=<OPPORTUNITE|MENACE> poids=<1-5>`\n\n' +
      'Sortie :\n' +
      '`SWOT_SCORE opp=<O> menaces=<M> net=<NET> resilience=<R>% position=<POS>`\n' +
      '`SUMMARY facteurs_traites=<N> categorie_dominante=<CAT>` (catégorie cumulant le plus de poids total)',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : agréger les facteurs PESTEL et dériver le score SWOT
`,
    hints: [
      'Cumuler séparément les poids des opportunités et des menaces.',
      'Suivre les poids cumulés par catégorie PESTEL pour identifier la dominante.',
      'Calculer la résilience et déterminer la posture stratégique.'
    ],
    examples: [
      {
        stdin:
          'FACTEUR id=F1 cat=T type=OPPORTUNITE poids=5\n' +
          'FACTEUR id=F2 cat=E type=OPPORTUNITE poids=4\n' +
          'FACTEUR id=F3 cat=L type=MENACE poids=3\n' +
          'FACTEUR id=F4 cat=T type=MENACE poids=1',
        expected:
          'SWOT_SCORE opp=9 menaces=4 net=5 resilience=69.2% position=OFFENSIVE\n' +
          'SUMMARY facteurs_traites=4 categorie_dominante=T',
        note: 'Opp=9, Menaces=4, Net=5, Résilience=9/13=69.2% -> OFFENSIVE. Catégorie T totalise 6 points.'
      }
    ],
    tests: [
      {
        label: 'Position défensive avec fortes menaces réglementaires',
        stdin:
          'FACTEUR id=1 cat=L type=MENACE poids=5\n' +
          'FACTEUR id=2 cat=L type=MENACE poids=4\n' +
          'FACTEUR id=3 cat=P type=MENACE poids=3\n' +
          'FACTEUR id=4 cat=T type=OPPORTUNITE poids=3',
        expected:
          'SWOT_SCORE opp=3 menaces=12 net=-9 resilience=20.0% position=DEFENSIVE\n' +
          'SUMMARY facteurs_traites=4 categorie_dominante=L'
      },
      {
        label: 'Position attentiste équilibrée',
        stdin:
          'FACTEUR id=A cat=S type=OPPORTUNITE poids=3\n' +
          'FACTEUR id=B cat=ENV type=MENACE poids=3',
        expected:
          'SWOT_SCORE opp=3 menaces=3 net=0 resilience=50.0% position=ATTENTISTE\n' +
          'SUMMARY facteurs_traites=2 categorie_dominante=ENV'
      },
      {
        label: 'Un seul facteur d opportunité',
        stdin: 'FACTEUR id=Solo cat=T type=OPPORTUNITE poids=4',
        expected:
          'SWOT_SCORE opp=4 menaces=0 net=4 resilience=100.0% position=ATTENTISTE\n' +
          'SUMMARY facteurs_traites=1 categorie_dominante=T'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

opp = 0
menaces = 0
cat_weights = {}
count = 0

for ligne in lignes:
    if not ligne.startswith('FACTEUR '):
        continue
    params = {}
    for tok in ligne[len('FACTEUR '):].split(' '):
        if '=' in tok:
            k, v = tok.split('=', 1)
            params[k] = v
            
    cat = params.get('cat', 'T')
    ftype = params.get('type', 'OPPORTUNITE')
    poids = int(params.get('poids', 1))
    
    if ftype == 'OPPORTUNITE':
        opp += poids
    else:
        menaces += poids
        
    cat_weights[cat] = cat_weights.get(cat, 0) + poids
    count += 1

net = opp - menaces
total_weights = max(1, opp + menaces)
resilience = (opp / total_weights) * 100.0

if net >= 5 and resilience >= 60.0:
    position = 'OFFENSIVE'
elif net < 0 and resilience < 45.0:
    position = 'DEFENSIVE'
else:
    position = 'ATTENTISTE'

print(f"SWOT_SCORE opp={opp} menaces={menaces} net={net} resilience={resilience:.1f}% position={position}")

# Categorie dominante (plus grand poids, ordre alphabétique en cas d'égalité)
best_cat = ""
max_w = -1
for c in sorted(cat_weights.keys()):
    if cat_weights[c] > max_w:
        max_w = cat_weights[c]
        best_cat = c

print(f"SUMMARY facteurs_traites={count} categorie_dominante={best_cat}")
`
  }
];
