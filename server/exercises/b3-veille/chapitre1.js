// server/exercises/b3-veille/chapitre1.js
// Exercices du Module 1 : Fondements & Typologie de la Veille Stratégique (idPrefix: vt3)

module.exports = [
  {
    id: 'vt3-c1-e1',
    chapter: 1,
    title: 'Classificateur de veille sectorielle et analyse de réactivité',
    level: 'n1',
    language: 'python',
    goal: 'Classifier des signaux d’information selon la typologie sectorielle de veille et déterminer la posture d’anticipation.',
    brief:
      'Dans une organisation, la veille stratégique se décline en cinq grands domaines sectoriels :\n' +
      '- `TECHNOLOGIQUE` : innovations matérielles/logicielles, brevets d’ingénierie, protocoles, IA, algorithmes, vulnérabilités.\n' +
      '- `CONCURRENTIELLE` : mouvements des rivaux, fusions-acquisitions, levées de fonds, tarifs, parts de marché.\n' +
      '- `JURIDIQUE` : réglementations, lois, conformité RGPD/CNIL, décrets, directives européennes, contentieux.\n' +
      '- `COMMERCIALE` : relations clients, prospects, fournisseurs, appels d’offres, partenariats de distribution.\n' +
      '- `SOCIETALE` : tendances de société, responsabilité sociétale (RSE), éthique, impact environnemental.\n\n' +
      'Chaque signal est également qualifié en posture :\n' +
      '- `PROACTIVE` si le texte mentionne l’anticipation ou l’avenir (mots: futur, anticiper, tendance, prevision, horizon).\n' +
      '- `REACTIVE` dans les autres cas (constat de fait présent ou passé).\n\n' +
      'Entrée :\n' +
      '`SIGNAL id=<ID> text=<TEXTE>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque signal :\n' +
      '  `CLASSIFIED id=<ID> type=<TYPE> posture=<POSTURE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total=<N> types=<TYPE1:N,TYPE2:N,...>` (types triés par ordre alphabétique)',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier chaque signal et générer le bilan
`,
    hints: [
      'Normaliser le texte en minuscules pour faciliter les correspondances par sous-chaînes ou mots-clés.',
      'Attribuer le type sectoriel selon le groupe lexical dominant.',
      'Vérifier la présence de termes anticipatifs pour statuer sur PROACTIVE ou REACTIVE.'
    ],
    examples: [
      {
        stdin:
          'SIGNAL id=1 text=La CNIL publie un nouveau décret de conformité RGPD pour le stockage cloud\n' +
          'SIGNAL id=2 text=Notre concurrent direct annonce une levée de fonds pour anticiper le marché américain\n' +
          'SIGNAL id=3 text=Un nouveau modèle de langage IA open source surpasse les benchmarks d ingénierie',
        expected:
          'CLASSIFIED id=1 type=JURIDIQUE posture=REACTIVE\n' +
          'CLASSIFIED id=2 type=CONCURRENTIELLE posture=PROACTIVE\n' +
          'CLASSIFIED id=3 type=TECHNOLOGIQUE posture=REACTIVE\n' +
          'SUMMARY total=3 types=CONCURRENTIELLE:1,JURIDIQUE:1,TECHNOLOGIQUE:1',
        note: 'Le signal 2 contient "anticiper" et est donc qualifié de PROACTIVE.'
      }
    ],
    tests: [
      {
        label: 'Cinq signaux couvrant l ensemble des 5 catégories',
        stdin:
          'SIGNAL id=10 text=Découverte d une vulnérabilité zero-day sur le protocole TLS\n' +
          'SIGNAL id=20 text=Un concurrent baisse ses tarifs d abonnement de 15%\n' +
          'SIGNAL id=30 text=Le tribunal européen inflige une sanction au titre du RGPD\n' +
          'SIGNAL id=40 text=Un appel d offres stratégique est lancé par un grand compte client\n' +
          'SIGNAL id=50 text=Une étude analyse l impact environnemental et l éthique des datacenters à l horizon 2030',
        expected:
          'CLASSIFIED id=10 type=TECHNOLOGIQUE posture=REACTIVE\n' +
          'CLASSIFIED id=20 type=CONCURRENTIELLE posture=REACTIVE\n' +
          'CLASSIFIED id=30 type=JURIDIQUE posture=REACTIVE\n' +
          'CLASSIFIED id=40 type=COMMERCIALE posture=REACTIVE\n' +
          'CLASSIFIED id=50 type=SOCIETALE posture=PROACTIVE\n' +
          'SUMMARY total=5 types=COMMERCIALE:1,CONCURRENTIELLE:1,JURIDIQUE:1,SOCIETALE:1,TECHNOLOGIQUE:1'
      },
      {
        label: 'Multiples signaux du même type avec détection proactive',
        stdin:
          'SIGNAL id=A1 text=Prevision des ventes de serveurs ARM pour le futur trimestre\n' +
          'SIGNAL id=A2 text=Analyse de la tendance des architectures micro-services\n' +
          'SIGNAL id=A3 text=Sortie officielle d un nouveau compilateur C++',
        expected:
          'CLASSIFIED id=A1 type=TECHNOLOGIQUE posture=PROACTIVE\n' +
          'CLASSIFIED id=A2 type=TECHNOLOGIQUE posture=PROACTIVE\n' +
          'CLASSIFIED id=A3 type=TECHNOLOGIQUE posture=REACTIVE\n' +
          'SUMMARY total=3 types=TECHNOLOGIQUE:3'
      },
      {
        label: 'Veille commerciale et concurrentielle croisée',
        stdin:
          'SIGNAL id=C1 text=Nouveau fournisseur de transit IP référencé pour nos clients\n' +
          'SIGNAL id=C2 text=Partenariat commercial avec un distributeur européen\n' +
          'SIGNAL id=K1 text=Rachat d une startup rivale par notre concurrent historique',
        expected:
          'CLASSIFIED id=C1 type=COMMERCIALE posture=REACTIVE\n' +
          'CLASSIFIED id=C2 type=COMMERCIALE posture=REACTIVE\n' +
          'CLASSIFIED id=K1 type=CONCURRENTIELLE posture=REACTIVE\n' +
          'SUMMARY total=3 types=COMMERCIALE:2,CONCURRENTIELLE:1'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

keywords = {
    'TECHNOLOGIQUE': ['brevet', 'api', 'framework', 'algorithme', 'vulnérabilité', 'vulnerabilite', 'tls', 'ia', 'benchmark', 'rfc', 'processeur', 'modele', 'modèle', 'serveur', 'compilateur', 'zero-day', 'architecture', 'micro-service'],
    'CONCURRENTIELLE': ['concurrent', 'rachat', 'fusion', 'levée de fonds', 'levee de fonds', 'tarif', 'part de marché', 'parts de marché', 'rival', 'stratégie'],
    'JURIDIQUE': ['loi', 'décret', 'decret', 'directive', 'rgpd', 'cnil', 'tribunal', 'sanction', 'réglementation', 'reglementation', 'conformité', 'conformite', 'contentieux'],
    'COMMERCIALE': ['client', 'prospect', 'fournisseur', 'appel d offres', 'appel d offres', 'partenariat', 'distributeur', 'devis', 'ventes'],
    'SOCIETALE': ['consommateur', 'écologie', 'ecologie', 'éthique', 'ethique', 'société', 'societe', 'environnemental', 'rse', 'mœurs', 'moeurs']
}

proactive_words = ['futur', 'anticiper', 'tendance', 'prevision', 'prévision', 'horizon']

results = []
counts = {}

for ligne in lignes:
    if not ligne.startswith('SIGNAL '):
        continue
    parts = ligne.split(' ', 2)
    sig_id = parts[1].split('=')[1]
    raw_text = parts[2].split('=', 1)[1] if len(parts) > 2 else ''
    text_lower = raw_text.lower()
    
    # Posture
    posture = 'REACTIVE'
    for pw in proactive_words:
        if pw in text_lower:
            posture = 'PROACTIVE'
            break
            
    # Type sectoriel
    matched_type = 'TECHNOLOGIQUE' # par défaut
    best_score = -1
    
    for ctype, kws in keywords.items():
        score = sum(1 for kw in kws if kw in text_lower)
        if score > best_score and score > 0:
            best_score = score
            matched_type = ctype
            
    counts[matched_type] = counts.get(matched_type, 0) + 1
    results.append(f"CLASSIFIED id={sig_id} type={matched_type} posture={posture}")

for r in results:
    print(r)

summary_types = ",".join(f"{k}:{counts[k]}" for k in sorted(counts.keys()))
print(f"SUMMARY total={len(results)} types={summary_types}")
`
  },
  {
    id: 'vt3-c1-e2',
    chapter: 1,
    title: 'Évaluateur de posture et temporalité de veille (Matrice AFNOR)',
    level: 'n2',
    language: 'python',
    goal: 'Calculer le score d’efficacité d’un dispositif de veille selon son mode de collecte et sa fréquence temporelle.',
    brief:
      'Dans le référentiel normatif de veille (AFNOR XP X50-053), la couverture de l’environnement dépend de la posture opérationnelle et de la régularité temporelle :\n' +
      '- Mode de collecte : `PASSIVE` (20 points) ou `ACTIVE` (50 points).\n' +
      '- Fréquence : `PONCTUELLE` (10 points), `PERIODIQUE` (25 points) ou `PERMANENTE` (40 points).\n' +
      '- Système d’alertes automatisé : `OUI` (10 points) ou `NON` (0 point).\n\n' +
      'Le score d’efficacité est la somme de ces composantes, plafonnée à 100 points :\n' +
      '$$\\text{Score} = \\min(100, \\text{Points}_{\\text{mode}} + \\text{Points}_{\\text{freq}} + \\text{Points}_{\\text{alerte}})$$\n\n' +
      'Le niveau de risque d’obsolescence informationnelle est établi ainsi :\n' +
      '- Si $\\text{Score} \\ge 80$ : `FAIBLE`\n' +
      '- Si $50 \\le \\text{Score} < 80$ : `MOYEN`\n' +
      '- Si $\\text{Score} < 50$ : `ELEVE`\n\n' +
      'Entrée :\n' +
      '`DISPOSITIF nom=<NOM> mode=<PASSIVE|ACTIVE> frequence=<PONCTUELLE|PERIODIQUE|PERMANENTE> alertes=<OUI|NON>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque dispositif :\n' +
      '  `EVAL nom=<NOM> score=<SCORE> risque=<RISQUE>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total=<N> avg_score=<MOY> risque_eleve_count=<C>` (moyenne arrondie à 1 décimale)',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer les dispositifs de veille
`,
    hints: [
      'Extraire les paramètres à l’aide d’un découpage par clés nom, mode, frequence, alertes.',
      'Appliquer les tables de points et borner le score à 100.',
      'Formater la moyenne avec f"{avg:.1f}".'
    ],
    examples: [
      {
        stdin:
          'DISPOSITIF nom=Veille_R&D mode=ACTIVE frequence=PERMANENTE alertes=OUI\n' +
          'DISPOSITIF nom=Revue_Presse mode=PASSIVE frequence=PERIODIQUE alertes=NON\n' +
          'DISPOSITIF nom=Audit_Annuel mode=PASSIVE frequence=PONCTUELLE alertes=NON',
        expected:
          'EVAL nom=Veille_R&D score=100 risque=FAIBLE\n' +
          'EVAL nom=Revue_Presse score=45 risque=ELEVE\n' +
          'EVAL nom=Audit_Annuel score=30 risque=ELEVE\n' +
          'SUMMARY total=3 avg_score=58.3 risque_eleve_count=2',
        note: 'Veille_R&D totalise 50 + 40 + 10 = 100 pts. Audit_Annuel totalise 20 + 10 + 0 = 30 pts.'
      }
    ],
    tests: [
      {
        label: 'Dispositifs avec score intermédiaire (risque moyen)',
        stdin:
          'DISPOSITIF nom=Veille_Securite mode=ACTIVE frequence=PERIODIQUE alertes=OUI\n' +
          'DISPOSITIF nom=Veille_Concurrence mode=ACTIVE frequence=PERIODIQUE alertes=NON',
        expected:
          'EVAL nom=Veille_Securite score=85 risque=FAIBLE\n' +
          'EVAL nom=Veille_Concurrence score=75 risque=MOYEN\n' +
          'SUMMARY total=2 avg_score=80.0 risque_eleve_count=0'
      },
      {
        label: 'Combinaison de dispositifs hétérogènes',
        stdin:
          'DISPOSITIF nom=Cellule_Brevets mode=ACTIVE frequence=PERMANENTE alertes=NON\n' +
          'DISPOSITIF nom=Veille_Normes mode=PASSIVE frequence=PERMANENTE alertes=OUI\n' +
          'DISPOSITIF nom=Sondage_Ponctuel mode=ACTIVE frequence=PONCTUELLE alertes=NON',
        expected:
          'EVAL nom=Cellule_Brevets score=90 risque=FAIBLE\n' +
          'EVAL nom=Veille_Normes score=70 risque=MOYEN\n' +
          'EVAL nom=Sondage_Ponctuel score=60 risque=MOYEN\n' +
          'SUMMARY total=3 avg_score=73.3 risque_eleve_count=0'
      },
      {
        label: 'Tous les dispositifs au risque maximal',
        stdin:
          'DISPOSITIF nom=D1 mode=PASSIVE frequence=PONCTUELLE alertes=NON\n' +
          'DISPOSITIF nom=D2 mode=PASSIVE frequence=PONCTUELLE alertes=OUI',
        expected:
          'EVAL nom=D1 score=30 risque=ELEVE\n' +
          'EVAL nom=D2 score=40 risque=ELEVE\n' +
          'SUMMARY total=2 avg_score=35.0 risque_eleve_count=2'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

pts_mode = {'PASSIVE': 20, 'ACTIVE': 50}
pts_freq = {'PONCTUELLE': 10, 'PERIODIQUE': 25, 'PERMANENTE': 40}

scores = []
risque_eleve = 0

for ligne in lignes:
    if not ligne.startswith('DISPOSITIF '):
        continue
    params = {}
    for token in ligne[len('DISPOSITIF '):].split(' '):
        if '=' in token:
            k, v = token.split('=', 1)
            params[k] = v
            
    nom = params.get('nom', 'Inconnu')
    mode = params.get('mode', 'PASSIVE')
    freq = params.get('frequence', 'PONCTUELLE')
    alerte = params.get('alertes', 'NON')
    
    score = min(100, pts_mode.get(mode, 20) + pts_freq.get(freq, 10) + (10 if alerte == 'OUI' else 0))
    scores.append(score)
    
    if score >= 80:
        risque = 'FAIBLE'
    elif score >= 50:
        risque = 'MOYEN'
    else:
        risque = 'ELEVE'
        risque_eleve += 1
        
    print(f"EVAL nom={nom} score={score} risque={risque}")

avg_score = sum(scores) / len(scores) if scores else 0.0
print(f"SUMMARY total={len(scores)} avg_score={avg_score:.1f} risque_eleve_count={risque_eleve}")
`
  },
  {
    id: 'vt3-c1-e3',
    chapter: 1,
    title: 'Calculateur de retour sur investissement (ROI) de la veille stratégique',
    level: 'n3',
    language: 'python',
    goal: 'Mesurer la rentabilité économique de la cellule de veille en chiffrant les risques prévenus et les opportunités captées.',
    brief:
      'Dans le management de l’innovation, justifier le budget d’une cellule de veille repose sur le calcul du retour sur investissement (ROI) et du Benefit-Cost Ratio (BCR) :\n' +
      '- $\\text{Bénéfice total} = \\text{Pertes évitées} + \\text{Gains opportunités}$\n' +
      '- $\\text{Gain net} = \\text{Bénéfice total} - \\text{Coût de veille}$\n' +
      '- $\\text{ROI (\\%)} = \\frac{\\text{Gain net}}{\\text{Coût de veille}} \\times 100$ (arrondi à 2 décimales)\n' +
      '- $\\text{BCR} = \\frac{\\text{Bénéfice total}}{\\text{Coût de veille}}$ (arrondi à 2 décimales)\n\n' +
      'Indice de criticité stratégique :\n' +
      '- Si $\\text{ROI} \\ge 200\\%$ : `INDISPENSABLE`\n' +
      '- Si $50\\% \\le \\text{ROI} < 200\\%$ : `RENTABLE`\n' +
      '- Si $\\text{ROI} < 50\\%$ : `A_OPTIMISER`\n\n' +
      'Entrée :\n' +
      '`PROJET nom=<N> cout_veille=<C> pertes_evitees=<P> gains_opportunites=<G>`\n\n' +
      'Sortie :\n' +
      '- Pour chaque projet :\n' +
      '  `ROI_METRIC nom=<N> roi=<ROI>% bcr=<BCR> criticite=<CRIT>`\n' +
      '- Bilan :\n' +
      '  `SUMMARY total_projets=<N> total_gain_net=<TOTAL> top_projet=<NOM>`',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le ROI et le bilan de rentabilité de la veille
`,
    hints: [
      'Convertir les valeurs financières en entiers ou flottants.',
      'Calculer le gain net et le ratio BCR pour chaque projet.',
      'Identifier le projet générant le plus grand gain net absolu.'
    ],
    examples: [
      {
        stdin:
          'PROJET nom=Cybersécurité cout_veille=20000 pertes_evitees=150000 gains_opportunites=0\n' +
          'PROJET nom=IA_Generative cout_veille=50000 pertes_evitees=20000 gains_opportunites=180000\n' +
          'PROJET nom=Norme_ISO cout_veille=15000 pertes_evitees=10000 gains_opportunites=8000',
        expected:
          'ROI_METRIC nom=Cybersécurité roi=650.00% bcr=7.50 criticite=INDISPENSABLE\n' +
          'ROI_METRIC nom=IA_Generative roi=300.00% bcr=4.00 criticite=INDISPENSABLE\n' +
          'ROI_METRIC nom=Norme_ISO roi=20.00% bcr=1.20 criticite=A_OPTIMISER\n' +
          'SUMMARY total_projets=3 total_gain_net=283000 top_projet=IA_Generative',
        note: 'Le projet IA_Generative génère un gain net de (200000 - 50000) = 150000 €, surpassant Cybersécurité (130000 €).'
      }
    ],
    tests: [
      {
        label: 'Projets avec rentabilité modérée et investissement équilibré',
        stdin:
          'PROJET nom=Cloud_FinOps cout_veille=30000 pertes_evitees=40000 gains_opportunites=20000\n' +
          'PROJET nom=DevSecOps cout_veille=25000 pertes_evitees=35000 gains_opportunites=10000',
        expected:
          'ROI_METRIC nom=Cloud_FinOps roi=100.00% bcr=2.00 criticite=RENTABLE\n' +
          'ROI_METRIC nom=DevSecOps roi=80.00% bcr=1.80 criticite=RENTABLE\n' +
          'SUMMARY total_projets=2 total_gain_net=50000 top_projet=Cloud_FinOps'
      },
      {
        label: 'Un seul projet ultra critique',
        stdin:
          'PROJET nom=Brevet_Quantique cout_veille=100000 pertes_evitees=500000 gains_opportunites=800000',
        expected:
          'ROI_METRIC nom=Brevet_Quantique roi=1200.00% bcr=13.00 criticite=INDISPENSABLE\n' +
          'SUMMARY total_projets=1 total_gain_net=1200000 top_projet=Brevet_Quantique'
      },
      {
        label: 'Projet déficitaire ou proche de zéro',
        stdin:
          'PROJET nom=Veille_Gadget cout_veille=10000 pertes_evitees=2000 gains_opportunites=1000\n' +
          'PROJET nom=Veille_Mobile cout_veille=20000 pertes_evitees=15000 gains_opportunites=12000',
        expected:
          'ROI_METRIC nom=Veille_Gadget roi=-70.00% bcr=0.30 criticite=A_OPTIMISER\n' +
          'ROI_METRIC nom=Veille_Mobile roi=35.00% bcr=1.35 criticite=A_OPTIMISER\n' +
          'SUMMARY total_projets=2 total_gain_net=0 top_projet=Veille_Mobile'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

total_net = 0
best_nom = ""
max_net = -float('inf')
count = 0

for ligne in lignes:
    if not ligne.startswith('PROJET '):
        continue
    params = {}
    for token in ligne[len('PROJET '):].split(' '):
        if '=' in token:
            k, v = token.split('=', 1)
            params[k] = v
            
    nom = params.get('nom', 'Projet')
    cout = float(params.get('cout_veille', 0))
    pertes = float(params.get('pertes_evitees', 0))
    gains = float(params.get('gains_opportunites', 0))
    
    benef = pertes + gains
    net = benef - cout
    roi = (net / cout) * 100.0 if cout > 0 else 0.0
    bcr = (benef / cout) if cout > 0 else 0.0
    
    if roi >= 200.0:
        crit = "INDISPENSABLE"
    elif roi >= 50.0:
        crit = "RENTABLE"
    else:
        crit = "A_OPTIMISER"
        
    print(f"ROI_METRIC nom={nom} roi={roi:.2f}% bcr={bcr:.2f} criticite={crit}")
    
    total_net += int(round(net))
    count += 1
    if net > max_net:
        max_net = net
        best_nom = nom

print(f"SUMMARY total_projets={count} total_gain_net={total_net} top_projet={best_nom}")
`
  }
];
