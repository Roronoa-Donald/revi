/**
 * chapitre1.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "vt3-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Classificateur de veille sectorielle et analyse de réactivité",
    goal: "Classifier des signaux d’information selon la typologie sectorielle de veille et déterminer la posture d’anticipation.",
    brief: "Dans une organisation, la veille stratégique se décline en cinq grands domaines sectoriels :\n- `TECHNOLOGIQUE` : innovations matérielles/logicielles, brevets d’ingénierie, protocoles, IA, algorithmes, vulnérabilités.\n- `CONCURRENTIELLE` : mouvements des rivaux, fusions-acquisitions, levées de fonds, tarifs, parts de marché.\n- `JURIDIQUE` : réglementations, lois, conformité RGPD/CNIL, décrets, directives européennes, contentieux.\n- `COMMERCIALE` : relations clients, prospects, fournisseurs, appels d’offres, partenariats de distribution.\n- `SOCIETALE` : tendances de société, responsabilité sociétale (RSE), éthique, impact environnemental.\n\nChaque signal est également qualifié en posture :\n- `PROACTIVE` si le texte mentionne l’anticipation ou l’avenir (mots: futur, anticiper, tendance, prevision, horizon).\n- `REACTIVE` dans les autres cas (constat de fait présent ou passé).\n\nEntrée :\n`SIGNAL id=<ID> text=<TEXTE>`\n\nSortie :\n- Pour chaque signal :\n  `CLASSIFIED id=<ID> type=<TYPE> posture=<POSTURE>`\n- Bilan :\n  `SUMMARY total=<N> types=<TYPE1:N,TYPE2:N,...>` (types triés par ordre alphabétique)",
    starter: "# Grille d'analyse (vt3-c1-e1) — Classificateur de veille sectorielle et analyse de réactivité\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq signaux couvrant l ensemble des 5 catégories]\n# Données : SIGNAL id=10 text=Découverte d une vulnérabilité zero-day sur le protocole TLS\n# Données : SIGNAL id=20 text=Un concurrent baisse ses tarifs d abonnement de 15%\n# Données : SIGNAL id=30 text=Le tribunal européen inflige une sanction au titre du RGPD\n# Données : SIGNAL id=40 text=Un appel d offres stratégique est lancé par un grand compte client\n# Données : SIGNAL id=50 text=Une étude analyse l impact environnemental et l éthique des datacenters à l horizon 2030\nA_COMPLETER\n\n[Cas 2 — Multiples signaux du même type avec détection proactive]\n# Données : SIGNAL id=A1 text=Prevision des ventes de serveurs ARM pour le futur trimestre\n# Données : SIGNAL id=A2 text=Analyse de la tendance des architectures micro-services\n# Données : SIGNAL id=A3 text=Sortie officielle d un nouveau compilateur C++\nA_COMPLETER\n\n[Cas 3 — Veille commerciale et concurrentielle croisée]\n# Données : SIGNAL id=C1 text=Nouveau fournisseur de transit IP référencé pour nos clients\n# Données : SIGNAL id=C2 text=Partenariat commercial avec un distributeur européen\n# Données : SIGNAL id=K1 text=Rachat d une startup rivale par notre concurrent historique\nA_COMPLETER\n",
    hints: [
          "Normaliser le texte en minuscules pour faciliter les correspondances par sous-chaînes ou mots-clés.",
          "Attribuer le type sectoriel selon le groupe lexical dominant.",
          "Vérifier la présence de termes anticipatifs pour statuer sur PROACTIVE ou REACTIVE."
    ],
    examples: [
          {
                "stdin": "SIGNAL id=1 text=La CNIL publie un nouveau décret de conformité RGPD pour le stockage cloud\nSIGNAL id=2 text=Notre concurrent direct annonce une levée de fonds pour anticiper le marché américain\nSIGNAL id=3 text=Un nouveau modèle de langage IA open source surpasse les benchmarks d ingénierie",
                "expected": "CLASSIFIED id=1 type=JURIDIQUE posture=REACTIVE\nCLASSIFIED id=2 type=CONCURRENTIELLE posture=PROACTIVE\nCLASSIFIED id=3 type=TECHNOLOGIQUE posture=REACTIVE\nSUMMARY total=3 types=CONCURRENTIELLE:1,JURIDIQUE:1,TECHNOLOGIQUE:1",
                "note": "Le signal 2 contient \"anticiper\" et est donc qualifié de PROACTIVE."
          }
    ],
    tests: [
          {
                "label": "Cinq signaux couvrant l ensemble des 5 catégories",
                "stdin": "cas:1",
                "expected": "CLASSIFIED id=10 type=TECHNOLOGIQUE posture=REACTIVE\nCLASSIFIED id=20 type=CONCURRENTIELLE posture=REACTIVE\nCLASSIFIED id=30 type=JURIDIQUE posture=REACTIVE\nCLASSIFIED id=40 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=50 type=SOCIETALE posture=PROACTIVE\nSUMMARY total=5 types=COMMERCIALE:1,CONCURRENTIELLE:1,JURIDIQUE:1,SOCIETALE:1,TECHNOLOGIQUE:1"
          },
          {
                "label": "Multiples signaux du même type avec détection proactive",
                "stdin": "cas:2",
                "expected": "CLASSIFIED id=A1 type=TECHNOLOGIQUE posture=PROACTIVE\nCLASSIFIED id=A2 type=TECHNOLOGIQUE posture=PROACTIVE\nCLASSIFIED id=A3 type=TECHNOLOGIQUE posture=REACTIVE\nSUMMARY total=3 types=TECHNOLOGIQUE:3"
          },
          {
                "label": "Veille commerciale et concurrentielle croisée",
                "stdin": "cas:3",
                "expected": "CLASSIFIED id=C1 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=C2 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=K1 type=CONCURRENTIELLE posture=REACTIVE\nSUMMARY total=3 types=COMMERCIALE:2,CONCURRENTIELLE:1"
          }
    ],
    solution: "[Exemple]\nCLASSIFIED id=1 type=JURIDIQUE posture=REACTIVE\nCLASSIFIED id=2 type=CONCURRENTIELLE posture=PROACTIVE\nCLASSIFIED id=3 type=TECHNOLOGIQUE posture=REACTIVE\nSUMMARY total=3 types=CONCURRENTIELLE:1,JURIDIQUE:1,TECHNOLOGIQUE:1\n\n[Cas 1 — Cinq signaux couvrant l ensemble des 5 catégories]\nCLASSIFIED id=10 type=TECHNOLOGIQUE posture=REACTIVE\nCLASSIFIED id=20 type=CONCURRENTIELLE posture=REACTIVE\nCLASSIFIED id=30 type=JURIDIQUE posture=REACTIVE\nCLASSIFIED id=40 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=50 type=SOCIETALE posture=PROACTIVE\nSUMMARY total=5 types=COMMERCIALE:1,CONCURRENTIELLE:1,JURIDIQUE:1,SOCIETALE:1,TECHNOLOGIQUE:1\n\n[Cas 2 — Multiples signaux du même type avec détection proactive]\nCLASSIFIED id=A1 type=TECHNOLOGIQUE posture=PROACTIVE\nCLASSIFIED id=A2 type=TECHNOLOGIQUE posture=PROACTIVE\nCLASSIFIED id=A3 type=TECHNOLOGIQUE posture=REACTIVE\nSUMMARY total=3 types=TECHNOLOGIQUE:3\n\n[Cas 3 — Veille commerciale et concurrentielle croisée]\nCLASSIFIED id=C1 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=C2 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=K1 type=CONCURRENTIELLE posture=REACTIVE\nSUMMARY total=3 types=COMMERCIALE:2,CONCURRENTIELLE:1\n"
  },
  {
    id: "vt3-c1-e2",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Évaluateur de posture et temporalité de veille (Matrice AFNOR)",
    goal: "Calculer le score d’efficacité d’un dispositif de veille selon son mode de collecte et sa fréquence temporelle.",
    brief: "Dans le référentiel normatif de veille (AFNOR XP X50-053), la couverture de l’environnement dépend de la posture opérationnelle et de la régularité temporelle :\n- Mode de collecte : `PASSIVE` (20 points) ou `ACTIVE` (50 points).\n- Fréquence : `PONCTUELLE` (10 points), `PERIODIQUE` (25 points) ou `PERMANENTE` (40 points).\n- Système d’alertes automatisé : `OUI` (10 points) ou `NON` (0 point).\n\nLe score d’efficacité est la somme de ces composantes, plafonnée à 100 points :\n$$\\text{Score} = \\min(100, \\text{Points}_{\\text{mode}} + \\text{Points}_{\\text{freq}} + \\text{Points}_{\\text{alerte}})$$\n\nLe niveau de risque d’obsolescence informationnelle est établi ainsi :\n- Si $\\text{Score} \\ge 80$ : `FAIBLE`\n- Si $50 \\le \\text{Score} < 80$ : `MOYEN`\n- Si $\\text{Score} < 50$ : `ELEVE`\n\nEntrée :\n`DISPOSITIF nom=<NOM> mode=<PASSIVE|ACTIVE> frequence=<PONCTUELLE|PERIODIQUE|PERMANENTE> alertes=<OUI|NON>`\n\nSortie :\n- Pour chaque dispositif :\n  `EVAL nom=<NOM> score=<SCORE> risque=<RISQUE>`\n- Bilan :\n  `SUMMARY total=<N> avg_score=<MOY> risque_eleve_count=<C>` (moyenne arrondie à 1 décimale)",
    starter: "# Grille d'analyse (vt3-c1-e2) — Évaluateur de posture et temporalité de veille (Matrice AFNOR)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Dispositifs avec score intermédiaire (risque moyen)]\n# Données : DISPOSITIF nom=Veille_Securite mode=ACTIVE frequence=PERIODIQUE alertes=OUI\n# Données : DISPOSITIF nom=Veille_Concurrence mode=ACTIVE frequence=PERIODIQUE alertes=NON\nA_COMPLETER\n\n[Cas 2 — Combinaison de dispositifs hétérogènes]\n# Données : DISPOSITIF nom=Cellule_Brevets mode=ACTIVE frequence=PERMANENTE alertes=NON\n# Données : DISPOSITIF nom=Veille_Normes mode=PASSIVE frequence=PERMANENTE alertes=OUI\n# Données : DISPOSITIF nom=Sondage_Ponctuel mode=ACTIVE frequence=PONCTUELLE alertes=NON\nA_COMPLETER\n\n[Cas 3 — Tous les dispositifs au risque maximal]\n# Données : DISPOSITIF nom=D1 mode=PASSIVE frequence=PONCTUELLE alertes=NON\n# Données : DISPOSITIF nom=D2 mode=PASSIVE frequence=PONCTUELLE alertes=OUI\nA_COMPLETER\n",
    hints: [
          "Extraire les paramètres à l’aide d’un découpage par clés nom, mode, frequence, alertes.",
          "Appliquer les tables de points et borner le score à 100.",
          "Formater la moyenne avec f\"{avg:.1f}\"."
    ],
    examples: [
          {
                "stdin": "DISPOSITIF nom=Veille_R&D mode=ACTIVE frequence=PERMANENTE alertes=OUI\nDISPOSITIF nom=Revue_Presse mode=PASSIVE frequence=PERIODIQUE alertes=NON\nDISPOSITIF nom=Audit_Annuel mode=PASSIVE frequence=PONCTUELLE alertes=NON",
                "expected": "EVAL nom=Veille_R&D score=100 risque=FAIBLE\nEVAL nom=Revue_Presse score=45 risque=ELEVE\nEVAL nom=Audit_Annuel score=30 risque=ELEVE\nSUMMARY total=3 avg_score=58.3 risque_eleve_count=2",
                "note": "Veille_R&D totalise 50 + 40 + 10 = 100 pts. Audit_Annuel totalise 20 + 10 + 0 = 30 pts."
          }
    ],
    tests: [
          {
                "label": "Dispositifs avec score intermédiaire (risque moyen)",
                "stdin": "cas:1",
                "expected": "EVAL nom=Veille_Securite score=85 risque=FAIBLE\nEVAL nom=Veille_Concurrence score=75 risque=MOYEN\nSUMMARY total=2 avg_score=80.0 risque_eleve_count=0"
          },
          {
                "label": "Combinaison de dispositifs hétérogènes",
                "stdin": "cas:2",
                "expected": "EVAL nom=Cellule_Brevets score=90 risque=FAIBLE\nEVAL nom=Veille_Normes score=70 risque=MOYEN\nEVAL nom=Sondage_Ponctuel score=60 risque=MOYEN\nSUMMARY total=3 avg_score=73.3 risque_eleve_count=0"
          },
          {
                "label": "Tous les dispositifs au risque maximal",
                "stdin": "cas:3",
                "expected": "EVAL nom=D1 score=30 risque=ELEVE\nEVAL nom=D2 score=40 risque=ELEVE\nSUMMARY total=2 avg_score=35.0 risque_eleve_count=2"
          }
    ],
    solution: "[Exemple]\nEVAL nom=Veille_R&D score=100 risque=FAIBLE\nEVAL nom=Revue_Presse score=45 risque=ELEVE\nEVAL nom=Audit_Annuel score=30 risque=ELEVE\nSUMMARY total=3 avg_score=58.3 risque_eleve_count=2\n\n[Cas 1 — Dispositifs avec score intermédiaire (risque moyen)]\nEVAL nom=Veille_Securite score=85 risque=FAIBLE\nEVAL nom=Veille_Concurrence score=75 risque=MOYEN\nSUMMARY total=2 avg_score=80.0 risque_eleve_count=0\n\n[Cas 2 — Combinaison de dispositifs hétérogènes]\nEVAL nom=Cellule_Brevets score=90 risque=FAIBLE\nEVAL nom=Veille_Normes score=70 risque=MOYEN\nEVAL nom=Sondage_Ponctuel score=60 risque=MOYEN\nSUMMARY total=3 avg_score=73.3 risque_eleve_count=0\n\n[Cas 3 — Tous les dispositifs au risque maximal]\nEVAL nom=D1 score=30 risque=ELEVE\nEVAL nom=D2 score=40 risque=ELEVE\nSUMMARY total=2 avg_score=35.0 risque_eleve_count=2\n"
  },
  {
    id: "vt3-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Calculateur de retour sur investissement (ROI) de la veille stratégique",
    goal: "Mesurer la rentabilité économique de la cellule de veille en chiffrant les risques prévenus et les opportunités captées.",
    brief: "Dans le management de l’innovation, justifier le budget d’une cellule de veille repose sur le calcul du retour sur investissement (ROI) et du Benefit-Cost Ratio (BCR) :\n- $\\text{Bénéfice total} = \\text{Pertes évitées} + \\text{Gains opportunités}$\n- $\\text{Gain net} = \\text{Bénéfice total} - \\text{Coût de veille}$\n- $\\text{ROI (\\%)} = \\frac{\\text{Gain net}}{\\text{Coût de veille}} \\times 100$ (arrondi à 2 décimales)\n- $\\text{BCR} = \\frac{\\text{Bénéfice total}}{\\text{Coût de veille}}$ (arrondi à 2 décimales)\n\nIndice de criticité stratégique :\n- Si $\\text{ROI} \\ge 200\\%$ : `INDISPENSABLE`\n- Si $50\\% \\le \\text{ROI} < 200\\%$ : `RENTABLE`\n- Si $\\text{ROI} < 50\\%$ : `A_OPTIMISER`\n\nEntrée :\n`PROJET nom=<N> cout_veille=<C> pertes_evitees=<P> gains_opportunites=<G>`\n\nSortie :\n- Pour chaque projet :\n  `ROI_METRIC nom=<N> roi=<ROI>% bcr=<BCR> criticite=<CRIT>`\n- Bilan :\n  `SUMMARY total_projets=<N> total_gain_net=<TOTAL> top_projet=<NOM>`",
    starter: "# Grille d'analyse (vt3-c1-e3) — Calculateur de retour sur investissement (ROI) de la veille stratégique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Projets avec rentabilité modérée et investissement équilibré]\n# Données : PROJET nom=Cloud_FinOps cout_veille=30000 pertes_evitees=40000 gains_opportunites=20000\n# Données : PROJET nom=DevSecOps cout_veille=25000 pertes_evitees=35000 gains_opportunites=10000\nA_COMPLETER\n\n[Cas 2 — Un seul projet ultra critique]\n# Données : PROJET nom=Brevet_Quantique cout_veille=100000 pertes_evitees=500000 gains_opportunites=800000\nA_COMPLETER\n\n[Cas 3 — Projet déficitaire ou proche de zéro]\n# Données : PROJET nom=Veille_Gadget cout_veille=10000 pertes_evitees=2000 gains_opportunites=1000\n# Données : PROJET nom=Veille_Mobile cout_veille=20000 pertes_evitees=15000 gains_opportunites=12000\nA_COMPLETER\n",
    hints: [
          "Convertir les valeurs financières en entiers ou flottants.",
          "Calculer le gain net et le ratio BCR pour chaque projet.",
          "Identifier le projet générant le plus grand gain net absolu."
    ],
    examples: [
          {
                "stdin": "PROJET nom=Cybersécurité cout_veille=20000 pertes_evitees=150000 gains_opportunites=0\nPROJET nom=IA_Generative cout_veille=50000 pertes_evitees=20000 gains_opportunites=180000\nPROJET nom=Norme_ISO cout_veille=15000 pertes_evitees=10000 gains_opportunites=8000",
                "expected": "ROI_METRIC nom=Cybersécurité roi=650.00% bcr=7.50 criticite=INDISPENSABLE\nROI_METRIC nom=IA_Generative roi=300.00% bcr=4.00 criticite=INDISPENSABLE\nROI_METRIC nom=Norme_ISO roi=20.00% bcr=1.20 criticite=A_OPTIMISER\nSUMMARY total_projets=3 total_gain_net=283000 top_projet=IA_Generative",
                "note": "Le projet IA_Generative génère un gain net de (200000 - 50000) = 150000 €, surpassant Cybersécurité (130000 €)."
          }
    ],
    tests: [
          {
                "label": "Projets avec rentabilité modérée et investissement équilibré",
                "stdin": "cas:1",
                "expected": "ROI_METRIC nom=Cloud_FinOps roi=100.00% bcr=2.00 criticite=RENTABLE\nROI_METRIC nom=DevSecOps roi=80.00% bcr=1.80 criticite=RENTABLE\nSUMMARY total_projets=2 total_gain_net=50000 top_projet=Cloud_FinOps"
          },
          {
                "label": "Un seul projet ultra critique",
                "stdin": "cas:2",
                "expected": "ROI_METRIC nom=Brevet_Quantique roi=1200.00% bcr=13.00 criticite=INDISPENSABLE\nSUMMARY total_projets=1 total_gain_net=1200000 top_projet=Brevet_Quantique"
          },
          {
                "label": "Projet déficitaire ou proche de zéro",
                "stdin": "cas:3",
                "expected": "ROI_METRIC nom=Veille_Gadget roi=-70.00% bcr=0.30 criticite=A_OPTIMISER\nROI_METRIC nom=Veille_Mobile roi=35.00% bcr=1.35 criticite=A_OPTIMISER\nSUMMARY total_projets=2 total_gain_net=0 top_projet=Veille_Mobile"
          }
    ],
    solution: "[Exemple]\nROI_METRIC nom=Cybersécurité roi=650.00% bcr=7.50 criticite=INDISPENSABLE\nROI_METRIC nom=IA_Generative roi=300.00% bcr=4.00 criticite=INDISPENSABLE\nROI_METRIC nom=Norme_ISO roi=20.00% bcr=1.20 criticite=A_OPTIMISER\nSUMMARY total_projets=3 total_gain_net=283000 top_projet=IA_Generative\n\n[Cas 1 — Projets avec rentabilité modérée et investissement équilibré]\nROI_METRIC nom=Cloud_FinOps roi=100.00% bcr=2.00 criticite=RENTABLE\nROI_METRIC nom=DevSecOps roi=80.00% bcr=1.80 criticite=RENTABLE\nSUMMARY total_projets=2 total_gain_net=50000 top_projet=Cloud_FinOps\n\n[Cas 2 — Un seul projet ultra critique]\nROI_METRIC nom=Brevet_Quantique roi=1200.00% bcr=13.00 criticite=INDISPENSABLE\nSUMMARY total_projets=1 total_gain_net=1200000 top_projet=Brevet_Quantique\n\n[Cas 3 — Projet déficitaire ou proche de zéro]\nROI_METRIC nom=Veille_Gadget roi=-70.00% bcr=0.30 criticite=A_OPTIMISER\nROI_METRIC nom=Veille_Mobile roi=35.00% bcr=1.35 criticite=A_OPTIMISER\nSUMMARY total_projets=2 total_gain_net=0 top_projet=Veille_Mobile\n"
  }
];
