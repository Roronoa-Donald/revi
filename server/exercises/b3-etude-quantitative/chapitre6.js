/**
 * Exercices Chapitre 6 — Étude Quantitative & Qualitative B3.
 * Analyse Qualitative de Contenu, Synthèse & Rédaction du Mémoire.
 */
'use strict';

module.exports = [
  {
    id: 'eq3-c6-e1',
    chapter: 6,
    title: 'Analyseur de contenu thématique et fréquences de codage',
    level: 'n1',
    language: 'python',
    goal: 'Compter les occurrences des unités de sens codées dans un corpus qualitatif, calculer les poids relatifs et identifier le thème prédominant.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>CODAGE corpus=&lt;nom&gt; codes=&lt;C1&gt;:&lt;N1&gt;,&lt;C2&gt;:&lt;N2&gt;,...</code>.<br><br>\nCalculs :<br>\n- Nombre total d\'occurrences codées : $T = \\sum N_i$.<br>\n- Pour chaque code $i$ : part relative $pct_i = (N_i / T) \\times 100$ (1 décimale).<br>\n- Trier les codes par fréquence décroissante (et en cas d\'égalité d\'occurrences, par ordre alphabétique croissant du libellé).<br>\n- Identifier le thème prédominant (premier code du tri).<br><br>\nAfficher :<br>\n<code>ANALYSE_THEMATIQUE: {corpus} (TOTAL_CODES={T}, TOP_THEME={top_nom} {top_pct:.1f}%)</code><br>\nPuis pour chaque code selon le tri :<br>\n<code>  - {nom}: {N_i} occurrences ({pct_i:.1f}%)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : trier et ventiler les codes thématiques qualitatifs
`,
    hints: [
      'Trier avec la clé (-occurrences, nom_code).',
      'Calculer la part relative en pourcentage de chaque thème.'
    ],
    examples: [
      {
        stdin: 'CODAGE corpus=EntretiensRH codes=SECURITE:15,SALAIRE:10,AUTONOMIE:25',
        expected: `ANALYSE_THEMATIQUE: EntretiensRH (TOTAL_CODES=50, TOP_THEME=AUTONOMIE 50.0%)
  - AUTONOMIE: 25 occurrences (50.0%)
  - SECURITE: 15 occurrences (30.0%)
  - SALAIRE: 10 occurrences (20.0%)`,
        note: 'Le thème AUTONOMIE domine à 50% le corpus d’entretiens.'
      }
    ],
    tests: [
      {
        label: 'Corpus équilibré avec égalité d’occurrences',
        stdin: 'CODAGE corpus=FeedbackProduit codes=DESIGN:20,PERF:20,PRIX:10',
        expected: `ANALYSE_THEMATIQUE: FeedbackProduit (TOTAL_CODES=50, TOP_THEME=DESIGN 40.0%)
  - DESIGN: 20 occurrences (40.0%)
  - PERF: 20 occurrences (40.0%)
  - PRIX: 10 occurrences (20.0%)`
      },
      {
        label: 'Corpus avec 4 codes distincts',
        stdin: 'CODAGE corpus=AuditSecu codes=FIREWALL:10,PHISHING:40,PASSWORD:30,VPN:20',
        expected: `ANALYSE_THEMATIQUE: AuditSecu (TOTAL_CODES=100, TOP_THEME=PHISHING 40.0%)
  - PHISHING: 40 occurrences (40.0%)
  - PASSWORD: 30 occurrences (30.0%)
  - VPN: 20 occurrences (20.0%)
  - FIREWALL: 10 occurrences (10.0%)`
      },
      {
        label: 'Code unique ultra-dominant',
        stdin: 'CODAGE corpus=Urgence codes=BUG_BLOQUANT:90,ERGONOMIE:10',
        expected: `ANALYSE_THEMATIQUE: Urgence (TOTAL_CODES=100, TOP_THEME=BUG_BLOQUANT 90.0%)
  - BUG_BLOQUANT: 90 occurrences (90.0%)
  - ERGONOMIE: 10 occurrences (10.0%)`
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'corpus=([^\\s]+)\\s+codes=([^\\s]+)', lig)
    if not m:
        continue
    corpus, codes_str = m.groups()
    
    codes = []
    for item in codes_str.split(','):
        if ':' in item:
            k, v = item.split(':')
            codes.append((k.strip(), int(v.strip())))
            
    total = sum(v for _, v in codes)
    if total == 0:
        continue
        
    s_codes = sorted(codes, key=lambda x: (-x[1], x[0]))
    top_nom, top_cnt = s_codes[0]
    top_pct = (top_cnt / total * 100.0)
    
    print(f"ANALYSE_THEMATIQUE: {corpus} (TOTAL_CODES={total}, TOP_THEME={top_nom} {top_pct:.1f}%)")
    for nom, cnt in s_codes:
        pct = (cnt / total * 100.0)
        print(f"  - {nom}: {cnt} occurrences ({pct:.1f}%)")
`
  },
  {
    id: 'eq3-c6-e2',
    chapter: 6,
    title: 'Matrice de co-occurrence de verbatims et proximité thématique',
    level: 'n2',
    language: 'python',
    goal: 'Mesurer la fréquence d’apparition conjointe de deux codes thématiques au sein des mêmes segments d’entretiens (Indice de Jaccard).',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>COOCCURRENCE doc=&lt;nom&gt; codes=&lt;CODE_A&gt;,&lt;CODE_B&gt; segments=&lt;S1&gt;,&lt;S2&gt;,...</code>.<br>\nOù chaque segment est une chaîne de codes séparés par des barres verticales <code>|</code> (ex: <code>CLOUD|DOCKER</code>).<br><br>\nCalculs :<br>\n- Nombre total de segments : $S$.<br>\n- Segments contenant $CODE\\_A$ : $N_A$.<br>\n- Segments contenant $CODE\\_B$ : $N_B$.<br>\n- Segments contenant simultanément $CODE\\_A$ ET $CODE\\_B$ : $N_{AB}$.<br>\n- Indice de similarité de Jaccard :<br>\n  $$J = \\frac{N_{AB}}{N_A + N_B - N_{AB}}$$<br>\n  (Si le dénominateur est nul, $J = 0.00$, arrondi à 2 décimales).<br><br>\nQualification de l\'association thématique :<br>\n- Si $J \\ge 0.60$ : <code>ASSOCIATION=FORTE_SYNERGIE</code><br>\n- Sinon si $J \\ge 0.30$ : <code>ASSOCIATION=MODEREE_CONNEXION</code><br>\n- Sinon : <code>ASSOCIATION=FAIBLE_INDEPENDANTE</code><br><br>\nAfficher :<br>\n<code>CO_OCCURRENCE: {doc} ({CODE_A} &amp; {CODE_B}) -> CO_OCCURRENCES={N_AB}/{S} | JACCARD={J:.2f} | {ASSOCIATION}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les co-occurrences et l'indice de Jaccard
`,
    hints: [
      'Découper chaque segment par le séparateur | pour obtenir les codes présents.',
      'Appliquer la formule d’intersection / union pour l’indice de Jaccard.'
    ],
    examples: [
      {
        stdin: 'COOCCURRENCE doc=CorpusDev codes=CLOUD,DOCKER segments=CLOUD|DOCKER,CLOUD,DOCKER,CLOUD|DOCKER,AUTRE,CLOUD|DOCKER',
        expected: 'CO_OCCURRENCE: CorpusDev (CLOUD & DOCKER) -> CO_OCCURRENCES=3/6 | JACCARD=0.60 | ASSOCIATION=FORTE_SYNERGIE',
        note: 'Co-occurrence 3 fois sur 6 : Jaccard = 3 / (4 + 4 - 3) = 3/5 = 0.60.'
      }
    ],
    tests: [
      {
        label: 'Association modérée entre deux thèmes',
        stdin: 'COOCCURRENCE doc=EnqueteRH codes=SALAIRE,STRESS segments=SALAIRE|STRESS,SALAIRE,STRESS,SALAIRE,STRESS,AUTRE',
        expected: 'CO_OCCURRENCE: EnqueteRH (SALAIRE & STRESS) -> CO_OCCURRENCES=1/6 | JACCARD=0.20 | ASSOCIATION=FAIBLE_INDEPENDANTE'
      },
      {
        label: 'Connexion modérée à 0.50',
        stdin: 'COOCCURRENCE doc=Usabilite codes=RAPIDITE,ERGONOMIE segments=RAPIDITE|ERGONOMIE,RAPIDITE|ERGONOMIE,RAPIDITE,ERGONOMIE',
        expected: 'CO_OCCURRENCE: Usabilite (RAPIDITE & ERGONOMIE) -> CO_OCCURRENCES=2/4 | JACCARD=0.50 | ASSOCIATION=MODEREE_CONNEXION'
      },
      {
        label: 'Synergie totale à 1.00',
        stdin: 'COOCCURRENCE doc=DuoParfait codes=API,JSON segments=API|JSON,API|JSON,API|JSON',
        expected: 'CO_OCCURRENCE: DuoParfait (API & JSON) -> CO_OCCURRENCES=3/3 | JACCARD=1.00 | ASSOCIATION=FORTE_SYNERGIE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'doc=([^\\s]+)\\s+codes=([^\\s]+)\\s+segments=([^\\s]+)', lig)
    if not m:
        continue
    doc, codes_str, segs_str = m.groups()
    
    cA, cB = [c.strip() for c in codes_str.split(',')][:2]
    raw_segs = segs_str.split(',')
    total_s = len(raw_segs)
    if total_s == 0:
        continue
        
    nA = 0
    nB = 0
    nAB = 0
    
    for s in raw_segs:
        tokens = set(t.strip() for t in s.split('|'))
        hasA = cA in tokens
        hasB = cB in tokens
        if hasA:
            nA += 1
        if hasB:
            nB += 1
        if hasA and hasB:
            nAB += 1
            
    union = nA + nB - nAB
    j = (nAB / union) if union > 0 else 0.0
    
    if j >= 0.60:
        assoc = 'ASSOCIATION=FORTE_SYNERGIE'
    elif j >= 0.30:
        assoc = 'ASSOCIATION=MODEREE_CONNEXION'
    else:
        assoc = 'ASSOCIATION=FAIBLE_INDEPENDANTE'
        
    print(f"CO_OCCURRENCE: {doc} ({cA} & {cB}) -> CO_OCCURRENCES={nAB}/{total_s} | JACCARD={j:.2f} | {assoc}")
`
  },
  {
    id: 'eq3-c6-e3',
    chapter: 6,
    title: 'Auditeur de structure académique de mémoire professionnel (CDP Sup)',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la conformité de l’armature formelle d’un mémoire de Bachelor 3 (6 sections obligatoires et volumétrie de pages).',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>MEMOIRE titre=&lt;titre&gt; sections=&lt;S1&gt;,&lt;S2&gt;,... pages=&lt;N_pages&gt;</code>.<br><br>\nLes 6 sections académiques canoniques obligatoires :<br>\n<code>PROBLEMATIQUE</code>, <code>REVUE_LITTERATURE</code>, <code>METHODOLOGIE</code>, <code>RESULTATS</code>, <code>DISCUSSION</code>, <code>RECOMMANDATIONS</code>.<br><br>\nRègles d\'audit formel :<br>\n- Compter le nombre de sections canoniques présentes parmi les 6 requises ($Sc \\in [0..6]$).<br>\n- Identifier les sections manquantes (dans l\'ordre officiel ci-dessus).<br>\n- Vérifier la volumétrie : le mémoire doit comporter entre 40 et 100 pages inclus ($40 \\le pages \\le 100$).<br><br>\nVerdict :<br>\n- Si $Sc == 6$ et $40 \\le pages \\le 100$ :<br>\n  <code>STATUT=CONFORME_MEMOIRE_EXCELLENT</code><br>\n- Sinon si $Sc == 6$ :<br>\n  <code>STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES={pages} HORS_BORNES_[40-100])</code><br>\n- Sinon :<br>\n  <code>STATUT=INCOMPLET_SECTIONS_MANQUANTES (MANQUES=[...])</code><br><br>\nAfficher :<br>\n<code>AUDIT_MEMOIRE: {titre} -> PAGES={pages} | SECTIONS={Sc}/6 | {STATUT}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier les 6 piliers canoniques du mémoire et la pagination
`,
    hints: [
      'Garder l’ordre exact des 6 sections pour la liste des manques.',
      'Valider la condition de pagination (40 à 100 pages).'
    ],
    examples: [
      {
        stdin: 'MEMOIRE titre=ImpactDevOps sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS,DISCUSSION,RECOMMANDATIONS pages=65',
        expected: 'AUDIT_MEMOIRE: ImpactDevOps -> PAGES=65 | SECTIONS=6/6 | STATUT=CONFORME_MEMOIRE_EXCELLENT',
        note: 'Toutes les 6 sections présentes et 65 pages : structure académique irréprochable.'
      }
    ],
    tests: [
      {
        label: 'Mémoire complet mais trop court (volumétrie insuffisante)',
        stdin: 'MEMOIRE titre=BrouillonPro sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS,DISCUSSION,RECOMMANDATIONS pages=25',
        expected: 'AUDIT_MEMOIRE: BrouillonPro -> PAGES=25 | SECTIONS=6/6 | STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES=25 HORS_BORNES_[40-100])'
      },
      {
        label: 'Mémoire manquant de discussion et recommandations',
        stdin: 'MEMOIRE titre=EtudeInachevee sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS pages=55',
        expected: 'AUDIT_MEMOIRE: EtudeInachevee -> PAGES=55 | SECTIONS=4/6 | STATUT=INCOMPLET_SECTIONS_MANQUANTES (MANQUES=[DISCUSSION, RECOMMANDATIONS])'
      },
      {
        label: 'Mémoire volumineux hors borne supérieure',
        stdin: 'MEMOIRE titre=TheseLongue sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS,DISCUSSION,RECOMMANDATIONS pages=120',
        expected: 'AUDIT_MEMOIRE: TheseLongue -> PAGES=120 | SECTIONS=6/6 | STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES=120 HORS_BORNES_[40-100])'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

SECTIONS_CANONIQUES = [
    'PROBLEMATIQUE',
    'REVUE_LITTERATURE',
    'METHODOLOGIE',
    'RESULTATS',
    'DISCUSSION',
    'RECOMMANDATIONS'
]

for lig in lignes:
    m = re.search(r'titre=([^\\s]+)\\s+sections=([^\\s]+)\\s+pages=(\\d+)', lig)
    if not m:
        continue
    titre, secs_str, pages_str = m.groups()
    pages = int(pages_str)
    
    secs_presentes = set(s.strip().upper() for s in secs_str.split(','))
    
    manques = [s for s in SECTIONS_CANONIQUES if s not in secs_presentes]
    sc = len(SECTIONS_CANONIQUES) - len(manques)
    
    if sc == 6 and 40 <= pages <= 100:
        statut = 'STATUT=CONFORME_MEMOIRE_EXCELLENT'
    elif sc == 6:
        statut = f"STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES={pages} HORS_BORNES_[40-100])"
    else:
        statut = f"STATUT=INCOMPLET_SECTIONS_MANQUANTES (MANQUES=[{', '.join(manques)}])"
        
    print(f"AUDIT_MEMOIRE: {titre} -> PAGES={pages} | SECTIONS={sc}/6 | {statut}")
`
  }
];
