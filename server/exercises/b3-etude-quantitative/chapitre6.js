/**
 * chapitre6.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "eq3-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Analyseur de contenu thématique et fréquences de codage",
    goal: "Compter les occurrences des unités de sens codées dans un corpus qualitatif, calculer les poids relatifs et identifier le thème prédominant.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>CODAGE corpus=&lt;nom&gt; codes=&lt;C1&gt;:&lt;N1&gt;,&lt;C2&gt;:&lt;N2&gt;,...</code>.<br><br>\nCalculs :<br>\n- Nombre total d'occurrences codées : $T = \\sum N_i$.<br>\n- Pour chaque code $i$ : part relative $pct_i = (N_i / T) \\times 100$ (1 décimale).<br>\n- Trier les codes par fréquence décroissante (et en cas d'égalité d'occurrences, par ordre alphabétique croissant du libellé).<br>\n- Identifier le thème prédominant (premier code du tri).<br><br>\nAfficher :<br>\n<code>ANALYSE_THEMATIQUE: {corpus} (TOTAL_CODES={T}, TOP_THEME={top_nom} {top_pct:.1f}%)</code><br>\nPuis pour chaque code selon le tri :<br>\n<code>  - {nom}: {N_i} occurrences ({pct_i:.1f}%)</code></p>",
    starter: "# Grille d'analyse (eq3-c6-e1) — Analyseur de contenu thématique et fréquences de codage\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Corpus équilibré avec égalité d’occurrences]\n# Données : CODAGE corpus=FeedbackProduit codes=DESIGN:20,PERF:20,PRIX:10\nA_COMPLETER\n\n[Cas 2 — Corpus avec 4 codes distincts]\n# Données : CODAGE corpus=AuditSecu codes=FIREWALL:10,PHISHING:40,PASSWORD:30,VPN:20\nA_COMPLETER\n\n[Cas 3 — Code unique ultra-dominant]\n# Données : CODAGE corpus=Urgence codes=BUG_BLOQUANT:90,ERGONOMIE:10\nA_COMPLETER\n",
    hints: [
          "Trier avec la clé (-occurrences, nom_code).",
          "Calculer la part relative en pourcentage de chaque thème."
    ],
    examples: [
          {
                "stdin": "CODAGE corpus=EntretiensRH codes=SECURITE:15,SALAIRE:10,AUTONOMIE:25",
                "expected": "ANALYSE_THEMATIQUE: EntretiensRH (TOTAL_CODES=50, TOP_THEME=AUTONOMIE 50.0%)\n  - AUTONOMIE: 25 occurrences (50.0%)\n  - SECURITE: 15 occurrences (30.0%)\n  - SALAIRE: 10 occurrences (20.0%)",
                "note": "Le thème AUTONOMIE domine à 50% le corpus d’entretiens."
          }
    ],
    tests: [
          {
                "label": "Corpus équilibré avec égalité d’occurrences",
                "stdin": "cas:1",
                "expected": "ANALYSE_THEMATIQUE: FeedbackProduit (TOTAL_CODES=50, TOP_THEME=DESIGN 40.0%)\n  - DESIGN: 20 occurrences (40.0%)\n  - PERF: 20 occurrences (40.0%)\n  - PRIX: 10 occurrences (20.0%)"
          },
          {
                "label": "Corpus avec 4 codes distincts",
                "stdin": "cas:2",
                "expected": "ANALYSE_THEMATIQUE: AuditSecu (TOTAL_CODES=100, TOP_THEME=PHISHING 40.0%)\n  - PHISHING: 40 occurrences (40.0%)\n  - PASSWORD: 30 occurrences (30.0%)\n  - VPN: 20 occurrences (20.0%)\n  - FIREWALL: 10 occurrences (10.0%)"
          },
          {
                "label": "Code unique ultra-dominant",
                "stdin": "cas:3",
                "expected": "ANALYSE_THEMATIQUE: Urgence (TOTAL_CODES=100, TOP_THEME=BUG_BLOQUANT 90.0%)\n  - BUG_BLOQUANT: 90 occurrences (90.0%)\n  - ERGONOMIE: 10 occurrences (10.0%)"
          }
    ],
    solution: "[Exemple]\nANALYSE_THEMATIQUE: EntretiensRH (TOTAL_CODES=50, TOP_THEME=AUTONOMIE 50.0%)\n  - AUTONOMIE: 25 occurrences (50.0%)\n  - SECURITE: 15 occurrences (30.0%)\n  - SALAIRE: 10 occurrences (20.0%)\n\n[Cas 1 — Corpus équilibré avec égalité d’occurrences]\nANALYSE_THEMATIQUE: FeedbackProduit (TOTAL_CODES=50, TOP_THEME=DESIGN 40.0%)\n  - DESIGN: 20 occurrences (40.0%)\n  - PERF: 20 occurrences (40.0%)\n  - PRIX: 10 occurrences (20.0%)\n\n[Cas 2 — Corpus avec 4 codes distincts]\nANALYSE_THEMATIQUE: AuditSecu (TOTAL_CODES=100, TOP_THEME=PHISHING 40.0%)\n  - PHISHING: 40 occurrences (40.0%)\n  - PASSWORD: 30 occurrences (30.0%)\n  - VPN: 20 occurrences (20.0%)\n  - FIREWALL: 10 occurrences (10.0%)\n\n[Cas 3 — Code unique ultra-dominant]\nANALYSE_THEMATIQUE: Urgence (TOTAL_CODES=100, TOP_THEME=BUG_BLOQUANT 90.0%)\n  - BUG_BLOQUANT: 90 occurrences (90.0%)\n  - ERGONOMIE: 10 occurrences (10.0%)\n"
  },
  {
    id: "eq3-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Matrice de co-occurrence de verbatims et proximité thématique",
    goal: "Mesurer la fréquence d’apparition conjointe de deux codes thématiques au sein des mêmes segments d’entretiens (Indice de Jaccard).",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>COOCCURRENCE doc=&lt;nom&gt; codes=&lt;CODE_A&gt;,&lt;CODE_B&gt; segments=&lt;S1&gt;,&lt;S2&gt;,...</code>.<br>\nOù chaque segment est une chaîne de codes séparés par des barres verticales <code>|</code> (ex: <code>CLOUD|DOCKER</code>).<br><br>\nCalculs :<br>\n- Nombre total de segments : $S$.<br>\n- Segments contenant $CODE\\_A$ : $N_A$.<br>\n- Segments contenant $CODE\\_B$ : $N_B$.<br>\n- Segments contenant simultanément $CODE\\_A$ ET $CODE\\_B$ : $N_{AB}$.<br>\n- Indice de similarité de Jaccard :<br>\n  $$J = \\frac{N_{AB}}{N_A + N_B - N_{AB}}$$<br>\n  (Si le dénominateur est nul, $J = 0.00$, arrondi à 2 décimales).<br><br>\nQualification de l'association thématique :<br>\n- Si $J \\ge 0.60$ : <code>ASSOCIATION=FORTE_SYNERGIE</code><br>\n- Sinon si $J \\ge 0.30$ : <code>ASSOCIATION=MODEREE_CONNEXION</code><br>\n- Sinon : <code>ASSOCIATION=FAIBLE_INDEPENDANTE</code><br><br>\nAfficher :<br>\n<code>CO_OCCURRENCE: {doc} ({CODE_A} &amp; {CODE_B}) -> CO_OCCURRENCES={N_AB}/{S} | JACCARD={J:.2f} | {ASSOCIATION}</code></p>",
    starter: "# Grille d'analyse (eq3-c6-e2) — Matrice de co-occurrence de verbatims et proximité thématique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Association modérée entre deux thèmes]\n# Données : COOCCURRENCE doc=EnqueteRH codes=SALAIRE,STRESS segments=SALAIRE|STRESS,SALAIRE,STRESS,SALAIRE,STRESS,AUTRE\nA_COMPLETER\n\n[Cas 2 — Connexion modérée à 0.50]\n# Données : COOCCURRENCE doc=Usabilite codes=RAPIDITE,ERGONOMIE segments=RAPIDITE|ERGONOMIE,RAPIDITE|ERGONOMIE,RAPIDITE,ERGONOMIE\nA_COMPLETER\n\n[Cas 3 — Synergie totale à 1.00]\n# Données : COOCCURRENCE doc=DuoParfait codes=API,JSON segments=API|JSON,API|JSON,API|JSON\nA_COMPLETER\n",
    hints: [
          "Découper chaque segment par le séparateur | pour obtenir les codes présents.",
          "Appliquer la formule d’intersection / union pour l’indice de Jaccard."
    ],
    examples: [
          {
                "stdin": "COOCCURRENCE doc=CorpusDev codes=CLOUD,DOCKER segments=CLOUD|DOCKER,CLOUD,DOCKER,CLOUD|DOCKER,AUTRE,CLOUD|DOCKER",
                "expected": "CO_OCCURRENCE: CorpusDev (CLOUD & DOCKER) -> CO_OCCURRENCES=3/6 | JACCARD=0.60 | ASSOCIATION=FORTE_SYNERGIE",
                "note": "Co-occurrence 3 fois sur 6 : Jaccard = 3 / (4 + 4 - 3) = 3/5 = 0.60."
          }
    ],
    tests: [
          {
                "label": "Association modérée entre deux thèmes",
                "stdin": "cas:1",
                "expected": "CO_OCCURRENCE: EnqueteRH (SALAIRE & STRESS) -> CO_OCCURRENCES=1/6 | JACCARD=0.20 | ASSOCIATION=FAIBLE_INDEPENDANTE"
          },
          {
                "label": "Connexion modérée à 0.50",
                "stdin": "cas:2",
                "expected": "CO_OCCURRENCE: Usabilite (RAPIDITE & ERGONOMIE) -> CO_OCCURRENCES=2/4 | JACCARD=0.50 | ASSOCIATION=MODEREE_CONNEXION"
          },
          {
                "label": "Synergie totale à 1.00",
                "stdin": "cas:3",
                "expected": "CO_OCCURRENCE: DuoParfait (API & JSON) -> CO_OCCURRENCES=3/3 | JACCARD=1.00 | ASSOCIATION=FORTE_SYNERGIE"
          }
    ],
    solution: "[Exemple]\nCO_OCCURRENCE: CorpusDev (CLOUD & DOCKER) -> CO_OCCURRENCES=3/6 | JACCARD=0.60 | ASSOCIATION=FORTE_SYNERGIE\n\n[Cas 1 — Association modérée entre deux thèmes]\nCO_OCCURRENCE: EnqueteRH (SALAIRE & STRESS) -> CO_OCCURRENCES=1/6 | JACCARD=0.20 | ASSOCIATION=FAIBLE_INDEPENDANTE\n\n[Cas 2 — Connexion modérée à 0.50]\nCO_OCCURRENCE: Usabilite (RAPIDITE & ERGONOMIE) -> CO_OCCURRENCES=2/4 | JACCARD=0.50 | ASSOCIATION=MODEREE_CONNEXION\n\n[Cas 3 — Synergie totale à 1.00]\nCO_OCCURRENCE: DuoParfait (API & JSON) -> CO_OCCURRENCES=3/3 | JACCARD=1.00 | ASSOCIATION=FORTE_SYNERGIE\n"
  },
  {
    id: "eq3-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Auditeur de structure académique de mémoire professionnel (CDP Sup)",
    goal: "Vérifier la conformité de l’armature formelle d’un mémoire de Bachelor 3 (6 sections obligatoires et volumétrie de pages).",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>MEMOIRE titre=&lt;titre&gt; sections=&lt;S1&gt;,&lt;S2&gt;,... pages=&lt;N_pages&gt;</code>.<br><br>\nLes 6 sections académiques canoniques obligatoires :<br>\n<code>PROBLEMATIQUE</code>, <code>REVUE_LITTERATURE</code>, <code>METHODOLOGIE</code>, <code>RESULTATS</code>, <code>DISCUSSION</code>, <code>RECOMMANDATIONS</code>.<br><br>\nRègles d'audit formel :<br>\n- Compter le nombre de sections canoniques présentes parmi les 6 requises ($Sc \\in [0..6]$).<br>\n- Identifier les sections manquantes (dans l'ordre officiel ci-dessus).<br>\n- Vérifier la volumétrie : le mémoire doit comporter entre 40 et 100 pages inclus ($40 \\le pages \\le 100$).<br><br>\nVerdict :<br>\n- Si $Sc == 6$ et $40 \\le pages \\le 100$ :<br>\n  <code>STATUT=CONFORME_MEMOIRE_EXCELLENT</code><br>\n- Sinon si $Sc == 6$ :<br>\n  <code>STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES={pages} HORS_BORNES_[40-100])</code><br>\n- Sinon :<br>\n  <code>STATUT=INCOMPLET_SECTIONS_MANQUANTES (MANQUES=[...])</code><br><br>\nAfficher :<br>\n<code>AUDIT_MEMOIRE: {titre} -> PAGES={pages} | SECTIONS={Sc}/6 | {STATUT}</code></p>",
    starter: "# Grille d'analyse (eq3-c6-e3) — Auditeur de structure académique de mémoire professionnel (CDP Sup)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Mémoire complet mais trop court (volumétrie insuffisante)]\n# Données : MEMOIRE titre=BrouillonPro sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS,DISCUSSION,RECOMMANDATIONS pages=25\nA_COMPLETER\n\n[Cas 2 — Mémoire manquant de discussion et recommandations]\n# Données : MEMOIRE titre=EtudeInachevee sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS pages=55\nA_COMPLETER\n\n[Cas 3 — Mémoire volumineux hors borne supérieure]\n# Données : MEMOIRE titre=TheseLongue sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS,DISCUSSION,RECOMMANDATIONS pages=120\nA_COMPLETER\n",
    hints: [
          "Garder l’ordre exact des 6 sections pour la liste des manques.",
          "Valider la condition de pagination (40 à 100 pages)."
    ],
    examples: [
          {
                "stdin": "MEMOIRE titre=ImpactDevOps sections=PROBLEMATIQUE,REVUE_LITTERATURE,METHODOLOGIE,RESULTATS,DISCUSSION,RECOMMANDATIONS pages=65",
                "expected": "AUDIT_MEMOIRE: ImpactDevOps -> PAGES=65 | SECTIONS=6/6 | STATUT=CONFORME_MEMOIRE_EXCELLENT",
                "note": "Toutes les 6 sections présentes et 65 pages : structure académique irréprochable."
          }
    ],
    tests: [
          {
                "label": "Mémoire complet mais trop court (volumétrie insuffisante)",
                "stdin": "cas:1",
                "expected": "AUDIT_MEMOIRE: BrouillonPro -> PAGES=25 | SECTIONS=6/6 | STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES=25 HORS_BORNES_[40-100])"
          },
          {
                "label": "Mémoire manquant de discussion et recommandations",
                "stdin": "cas:2",
                "expected": "AUDIT_MEMOIRE: EtudeInachevee -> PAGES=55 | SECTIONS=4/6 | STATUT=INCOMPLET_SECTIONS_MANQUANTES (MANQUES=[DISCUSSION, RECOMMANDATIONS])"
          },
          {
                "label": "Mémoire volumineux hors borne supérieure",
                "stdin": "cas:3",
                "expected": "AUDIT_MEMOIRE: TheseLongue -> PAGES=120 | SECTIONS=6/6 | STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES=120 HORS_BORNES_[40-100])"
          }
    ],
    solution: "[Exemple]\nAUDIT_MEMOIRE: ImpactDevOps -> PAGES=65 | SECTIONS=6/6 | STATUT=CONFORME_MEMOIRE_EXCELLENT\n\n[Cas 1 — Mémoire complet mais trop court (volumétrie insuffisante)]\nAUDIT_MEMOIRE: BrouillonPro -> PAGES=25 | SECTIONS=6/6 | STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES=25 HORS_BORNES_[40-100])\n\n[Cas 2 — Mémoire manquant de discussion et recommandations]\nAUDIT_MEMOIRE: EtudeInachevee -> PAGES=55 | SECTIONS=4/6 | STATUT=INCOMPLET_SECTIONS_MANQUANTES (MANQUES=[DISCUSSION, RECOMMANDATIONS])\n\n[Cas 3 — Mémoire volumineux hors borne supérieure]\nAUDIT_MEMOIRE: TheseLongue -> PAGES=120 | SECTIONS=6/6 | STATUT=SECTIONS_VALIDEES_VOLUMETRIE_A_AJUSTER (PAGES=120 HORS_BORNES_[40-100])\n"
  }
];
