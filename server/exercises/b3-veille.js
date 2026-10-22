'use strict';

module.exports = [
  {
    "id": "vt3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Classificateur de veille sectorielle et analyse de réactivité",
    "goal": "Classifier des signaux d’information selon la typologie sectorielle de veille et déterminer la posture d’anticipation.",
    "brief": "Dans une organisation, la veille stratégique se décline en cinq grands domaines sectoriels :\n- `TECHNOLOGIQUE` : innovations matérielles/logicielles, brevets d’ingénierie, protocoles, IA, algorithmes, vulnérabilités.\n- `CONCURRENTIELLE` : mouvements des rivaux, fusions-acquisitions, levées de fonds, tarifs, parts de marché.\n- `JURIDIQUE` : réglementations, lois, conformité RGPD/CNIL, décrets, directives européennes, contentieux.\n- `COMMERCIALE` : relations clients, prospects, fournisseurs, appels d’offres, partenariats de distribution.\n- `SOCIETALE` : tendances de société, responsabilité sociétale (RSE), éthique, impact environnemental.\n\nChaque signal est également qualifié en posture :\n- `PROACTIVE` si le texte mentionne l’anticipation ou l’avenir (mots: futur, anticiper, tendance, prevision, horizon).\n- `REACTIVE` dans les autres cas (constat de fait présent ou passé).\n\nEntrée :\n`SIGNAL id=<ID> text=<TEXTE>`\n\nRésultat d’analyse attendu :\n- Pour chaque signal :\n  `CLASSIFIED id=<ID> type=<TYPE> posture=<POSTURE>`\n- Bilan :\n  `SUMMARY total=<N> types=<TYPE1:N,TYPE2:N,...>` (types triés par ordre alphabétique)",
    "starter": "# Grille d'analyse (vt3-c1-e1) — Classificateur de veille sectorielle et analyse de réactivité\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq signaux couvrant l ensemble des 5 catégories]\n# Données : SIGNAL id=10 text=Découverte d une vulnérabilité zero-day sur le protocole TLS\n# Données : SIGNAL id=20 text=Un concurrent baisse ses tarifs d abonnement de 15%\n# Données : SIGNAL id=30 text=Le tribunal européen inflige une sanction au titre du RGPD\n# Données : SIGNAL id=40 text=Un appel d offres stratégique est lancé par un grand compte client\n# Données : SIGNAL id=50 text=Une étude analyse l impact environnemental et l éthique des datacenters à l horizon 2030\nA_COMPLETER\n\n[Cas 2 — Multiples signaux du même type avec détection proactive]\n# Données : SIGNAL id=A1 text=Prevision des ventes de serveurs ARM pour le futur trimestre\n# Données : SIGNAL id=A2 text=Analyse de la tendance des architectures micro-services\n# Données : SIGNAL id=A3 text=Sortie officielle d un nouveau compilateur C++\nA_COMPLETER\n\n[Cas 3 — Veille commerciale et concurrentielle croisée]\n# Données : SIGNAL id=C1 text=Nouveau fournisseur de transit IP référencé pour nos clients\n# Données : SIGNAL id=C2 text=Partenariat commercial avec un distributeur européen\n# Données : SIGNAL id=K1 text=Rachat d une startup rivale par notre concurrent historique\nA_COMPLETER\n",
    "hints": [
      "Normaliser le texte en minuscules pour faciliter les correspondances par sous-chaînes ou mots-clés.",
      "Attribuer le type sectoriel selon le groupe lexical dominant.",
      "Vérifier la présence de termes anticipatifs pour statuer sur PROACTIVE ou REACTIVE."
    ],
    "examples": [
      {
        "stdin": "SIGNAL id=1 text=La CNIL publie un nouveau décret de conformité RGPD pour le stockage cloud\nSIGNAL id=2 text=Notre concurrent direct annonce une levée de fonds pour anticiper le marché américain\nSIGNAL id=3 text=Un nouveau modèle de langage IA open source surpasse les benchmarks d ingénierie",
        "expected": "CLASSIFIED id=1 type=JURIDIQUE posture=REACTIVE\nCLASSIFIED id=2 type=CONCURRENTIELLE posture=PROACTIVE\nCLASSIFIED id=3 type=TECHNOLOGIQUE posture=REACTIVE\nSUMMARY total=3 types=CONCURRENTIELLE:1,JURIDIQUE:1,TECHNOLOGIQUE:1",
        "note": "Le signal 2 contient \"anticiper\" et est donc qualifié de PROACTIVE."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nCLASSIFIED id=1 type=JURIDIQUE posture=REACTIVE\nCLASSIFIED id=2 type=CONCURRENTIELLE posture=PROACTIVE\nCLASSIFIED id=3 type=TECHNOLOGIQUE posture=REACTIVE\nSUMMARY total=3 types=CONCURRENTIELLE:1,JURIDIQUE:1,TECHNOLOGIQUE:1\n\n[Cas 1 — Cinq signaux couvrant l ensemble des 5 catégories]\nCLASSIFIED id=10 type=TECHNOLOGIQUE posture=REACTIVE\nCLASSIFIED id=20 type=CONCURRENTIELLE posture=REACTIVE\nCLASSIFIED id=30 type=JURIDIQUE posture=REACTIVE\nCLASSIFIED id=40 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=50 type=SOCIETALE posture=PROACTIVE\nSUMMARY total=5 types=COMMERCIALE:1,CONCURRENTIELLE:1,JURIDIQUE:1,SOCIETALE:1,TECHNOLOGIQUE:1\n\n[Cas 2 — Multiples signaux du même type avec détection proactive]\nCLASSIFIED id=A1 type=TECHNOLOGIQUE posture=PROACTIVE\nCLASSIFIED id=A2 type=TECHNOLOGIQUE posture=PROACTIVE\nCLASSIFIED id=A3 type=TECHNOLOGIQUE posture=REACTIVE\nSUMMARY total=3 types=TECHNOLOGIQUE:3\n\n[Cas 3 — Veille commerciale et concurrentielle croisée]\nCLASSIFIED id=C1 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=C2 type=COMMERCIALE posture=REACTIVE\nCLASSIFIED id=K1 type=CONCURRENTIELLE posture=REACTIVE\nSUMMARY total=3 types=COMMERCIALE:2,CONCURRENTIELLE:1\n"
  },
  {
    "id": "vt3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Évaluateur de posture et temporalité de veille (Matrice AFNOR)",
    "goal": "Calculer le score d’efficacité d’un dispositif de veille selon son mode de collecte et sa fréquence temporelle.",
    "brief": "Dans le référentiel normatif de veille (AFNOR XP X50-053), la couverture de l’environnement dépend de la posture opérationnelle et de la régularité temporelle :\n- Mode de collecte : `PASSIVE` (20 points) ou `ACTIVE` (50 points).\n- Fréquence : `PONCTUELLE` (10 points), `PERIODIQUE` (25 points) ou `PERMANENTE` (40 points).\n- Système d’alertes automatisé : `OUI` (10 points) ou `NON` (0 point).\n\nLe score d’efficacité est la somme de ces composantes, plafonnée à 100 points :\n$$\\text{Score} = \\min(100, \\text{Points}_{\\text{mode}} + \\text{Points}_{\\text{freq}} + \\text{Points}_{\\text{alerte}})$$\n\nLe niveau de risque d’obsolescence informationnelle est établi ainsi :\n- Si $\\text{Score} \\ge 80$ : `FAIBLE`\n- Si $50 \\le \\text{Score} < 80$ : `MOYEN`\n- Si $\\text{Score} < 50$ : `ELEVE`\n\nEntrée :\n`DISPOSITIF nom=<NOM> mode=<PASSIVE|ACTIVE> frequence=<PONCTUELLE|PERIODIQUE|PERMANENTE> alertes=<OUI|NON>`\n\nRésultat d’analyse attendu :\n- Pour chaque dispositif :\n  `EVAL nom=<NOM> score=<SCORE> risque=<RISQUE>`\n- Bilan :\n  `SUMMARY total=<N> avg_score=<MOY> risque_eleve_count=<C>` (moyenne arrondie à 1 décimale)",
    "starter": "# Grille d'analyse (vt3-c1-e2) — Évaluateur de posture et temporalité de veille (Matrice AFNOR)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Dispositifs avec score intermédiaire (risque moyen)]\n# Données : DISPOSITIF nom=Veille_Securite mode=ACTIVE frequence=PERIODIQUE alertes=OUI\n# Données : DISPOSITIF nom=Veille_Concurrence mode=ACTIVE frequence=PERIODIQUE alertes=NON\nA_COMPLETER\n\n[Cas 2 — Combinaison de dispositifs hétérogènes]\n# Données : DISPOSITIF nom=Cellule_Brevets mode=ACTIVE frequence=PERMANENTE alertes=NON\n# Données : DISPOSITIF nom=Veille_Normes mode=PASSIVE frequence=PERMANENTE alertes=OUI\n# Données : DISPOSITIF nom=Sondage_Ponctuel mode=ACTIVE frequence=PONCTUELLE alertes=NON\nA_COMPLETER\n\n[Cas 3 — Tous les dispositifs au risque maximal]\n# Données : DISPOSITIF nom=D1 mode=PASSIVE frequence=PONCTUELLE alertes=NON\n# Données : DISPOSITIF nom=D2 mode=PASSIVE frequence=PONCTUELLE alertes=OUI\nA_COMPLETER\n",
    "hints": [
      "Extraire les paramètres à l’aide d’un découpage par clés nom, mode, frequence, alertes.",
      "Appliquer les tables de points et borner le score à 100.",
      "Formater la moyenne avec f\"{avg:.1f}\"."
    ],
    "examples": [
      {
        "stdin": "DISPOSITIF nom=Veille_R&D mode=ACTIVE frequence=PERMANENTE alertes=OUI\nDISPOSITIF nom=Revue_Presse mode=PASSIVE frequence=PERIODIQUE alertes=NON\nDISPOSITIF nom=Audit_Annuel mode=PASSIVE frequence=PONCTUELLE alertes=NON",
        "expected": "EVAL nom=Veille_R&D score=100 risque=FAIBLE\nEVAL nom=Revue_Presse score=45 risque=ELEVE\nEVAL nom=Audit_Annuel score=30 risque=ELEVE\nSUMMARY total=3 avg_score=58.3 risque_eleve_count=2",
        "note": "Veille_R&D totalise 50 + 40 + 10 = 100 pts. Audit_Annuel totalise 20 + 10 + 0 = 30 pts."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nEVAL nom=Veille_R&D score=100 risque=FAIBLE\nEVAL nom=Revue_Presse score=45 risque=ELEVE\nEVAL nom=Audit_Annuel score=30 risque=ELEVE\nSUMMARY total=3 avg_score=58.3 risque_eleve_count=2\n\n[Cas 1 — Dispositifs avec score intermédiaire (risque moyen)]\nEVAL nom=Veille_Securite score=85 risque=FAIBLE\nEVAL nom=Veille_Concurrence score=75 risque=MOYEN\nSUMMARY total=2 avg_score=80.0 risque_eleve_count=0\n\n[Cas 2 — Combinaison de dispositifs hétérogènes]\nEVAL nom=Cellule_Brevets score=90 risque=FAIBLE\nEVAL nom=Veille_Normes score=70 risque=MOYEN\nEVAL nom=Sondage_Ponctuel score=60 risque=MOYEN\nSUMMARY total=3 avg_score=73.3 risque_eleve_count=0\n\n[Cas 3 — Tous les dispositifs au risque maximal]\nEVAL nom=D1 score=30 risque=ELEVE\nEVAL nom=D2 score=40 risque=ELEVE\nSUMMARY total=2 avg_score=35.0 risque_eleve_count=2\n"
  },
  {
    "id": "vt3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Calculateur de retour sur investissement (ROI) de la veille stratégique",
    "goal": "Mesurer la rentabilité économique de la cellule de veille en chiffrant les risques prévenus et les opportunités captées.",
    "brief": "Dans le management de l’innovation, justifier le budget d’une cellule de veille repose sur le calcul du retour sur investissement (ROI) et du Benefit-Cost Ratio (BCR) :\n- $\\text{Bénéfice total} = \\text{Pertes évitées} + \\text{Gains opportunités}$\n- $\\text{Gain net} = \\text{Bénéfice total} - \\text{Coût de veille}$\n- $\\text{ROI (\\%)} = \\frac{\\text{Gain net}}{\\text{Coût de veille}} \\times 100$ (arrondi à 2 décimales)\n- $\\text{BCR} = \\frac{\\text{Bénéfice total}}{\\text{Coût de veille}}$ (arrondi à 2 décimales)\n\nIndice de criticité stratégique :\n- Si $\\text{ROI} \\ge 200\\%$ : `INDISPENSABLE`\n- Si $50\\% \\le \\text{ROI} < 200\\%$ : `RENTABLE`\n- Si $\\text{ROI} < 50\\%$ : `A_OPTIMISER`\n\nEntrée :\n`PROJET nom=<N> cout_veille=<C> pertes_evitees=<P> gains_opportunites=<G>`\n\nRésultat d’analyse attendu :\n- Pour chaque projet :\n  `ROI_METRIC nom=<N> roi=<ROI>% bcr=<BCR> criticite=<CRIT>`\n- Bilan :\n  `SUMMARY total_projets=<N> total_gain_net=<TOTAL> top_projet=<NOM>`",
    "starter": "# Grille d'analyse (vt3-c1-e3) — Calculateur de retour sur investissement (ROI) de la veille stratégique\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Projets avec rentabilité modérée et investissement équilibré]\n# Données : PROJET nom=Cloud_FinOps cout_veille=30000 pertes_evitees=40000 gains_opportunites=20000\n# Données : PROJET nom=DevSecOps cout_veille=25000 pertes_evitees=35000 gains_opportunites=10000\nA_COMPLETER\n\n[Cas 2 — Un seul projet ultra critique]\n# Données : PROJET nom=Brevet_Quantique cout_veille=100000 pertes_evitees=500000 gains_opportunites=800000\nA_COMPLETER\n\n[Cas 3 — Projet déficitaire ou proche de zéro]\n# Données : PROJET nom=Veille_Gadget cout_veille=10000 pertes_evitees=2000 gains_opportunites=1000\n# Données : PROJET nom=Veille_Mobile cout_veille=20000 pertes_evitees=15000 gains_opportunites=12000\nA_COMPLETER\n",
    "hints": [
      "Convertir les valeurs financières en entiers ou flottants.",
      "Calculer le gain net et le ratio BCR pour chaque projet.",
      "Identifier le projet générant le plus grand gain net absolu."
    ],
    "examples": [
      {
        "stdin": "PROJET nom=Cybersécurité cout_veille=20000 pertes_evitees=150000 gains_opportunites=0\nPROJET nom=IA_Generative cout_veille=50000 pertes_evitees=20000 gains_opportunites=180000\nPROJET nom=Norme_ISO cout_veille=15000 pertes_evitees=10000 gains_opportunites=8000",
        "expected": "ROI_METRIC nom=Cybersécurité roi=650.00% bcr=7.50 criticite=INDISPENSABLE\nROI_METRIC nom=IA_Generative roi=300.00% bcr=4.00 criticite=INDISPENSABLE\nROI_METRIC nom=Norme_ISO roi=20.00% bcr=1.20 criticite=A_OPTIMISER\nSUMMARY total_projets=3 total_gain_net=283000 top_projet=IA_Generative",
        "note": "Le projet IA_Generative génère un gain net de (200000 - 50000) = 150000 €, surpassant Cybersécurité (130000 €)."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nROI_METRIC nom=Cybersécurité roi=650.00% bcr=7.50 criticite=INDISPENSABLE\nROI_METRIC nom=IA_Generative roi=300.00% bcr=4.00 criticite=INDISPENSABLE\nROI_METRIC nom=Norme_ISO roi=20.00% bcr=1.20 criticite=A_OPTIMISER\nSUMMARY total_projets=3 total_gain_net=283000 top_projet=IA_Generative\n\n[Cas 1 — Projets avec rentabilité modérée et investissement équilibré]\nROI_METRIC nom=Cloud_FinOps roi=100.00% bcr=2.00 criticite=RENTABLE\nROI_METRIC nom=DevSecOps roi=80.00% bcr=1.80 criticite=RENTABLE\nSUMMARY total_projets=2 total_gain_net=50000 top_projet=Cloud_FinOps\n\n[Cas 2 — Un seul projet ultra critique]\nROI_METRIC nom=Brevet_Quantique roi=1200.00% bcr=13.00 criticite=INDISPENSABLE\nSUMMARY total_projets=1 total_gain_net=1200000 top_projet=Brevet_Quantique\n\n[Cas 3 — Projet déficitaire ou proche de zéro]\nROI_METRIC nom=Veille_Gadget roi=-70.00% bcr=0.30 criticite=A_OPTIMISER\nROI_METRIC nom=Veille_Mobile roi=35.00% bcr=1.35 criticite=A_OPTIMISER\nSUMMARY total_projets=2 total_gain_net=0 top_projet=Veille_Mobile\n"
  },
  {
    "id": "vt3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Générateur et normalisateur de requêtes booléennes avancées",
    "goal": "Construire une requête booléenne de recherche d’ingénierie conforme aux standards de documentation et de dorking.",
    "brief": "Dans la phase de ciblage et de sourcing documentaire, la recherche d’information emploie des équations booléennes strictes et des opérateurs de filtrage :\n- Terme principal entre guillemets stricts : `\"<terme>\"`\n- Termes obligatoires inclus combinés en `OR` : `(<inc1> OR <inc2> ...)` (termes triés alphabétiquement)\n- Termes exclus précédés du signe moins `-` : `-<exc1> -<exc2> ...` (termes triés alphabétiquement)\n- Filtre de domaine : `site:<domaine>`\n- Filtre de format de fichier : `filetype:<extension>`\n\nEntrée :\n`QUERY terme=<T> include=<I1,I2,...> exclude=<E1,E2,...> site=<DOM> filetype=<EXT>`\n(les attributs `include`, `exclude`, `site` ou `filetype` peuvent être omis ou vides)\n\nRésultat d’analyse attendu :\n`NORMALIZED_QUERY raw=<REQUÊTE>`",
    "starter": "# Grille d'analyse (vt3-c2-e1) — Générateur et normalisateur de requêtes booléennes avancées\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Requête complète avec tous les opérateurs]\n# Données : QUERY terme=zero trust include=iam,microsegmentation exclude=vpn,legacy site=nist.gov filetype=pdf\nA_COMPLETER\n\n[Cas 2 — Requête simple sans exclusions ni formats]\n# Données : QUERY terme=ebpf include=xdp,kernel site=kernel.org\nA_COMPLETER\n\n[Cas 3 — Requête avec terme seul et exclusion]\n# Données : QUERY terme=rag exclude=langchain,llamaindex\nA_COMPLETER\n",
    "hints": [
      "Extraire les paramètres via un dictionnaire clé/valeur.",
      "Trier les termes include et exclude par ordre alphabétique.",
      "Assembler les composants séparés par un espace uniquement s’ils sont présents et non vides."
    ],
    "examples": [
      {
        "stdin": "QUERY terme=quantum computing include=qubit,teleportation exclude=crypto,gaming site=arxiv.org filetype=pdf",
        "expected": "NORMALIZED_QUERY raw=\"quantum computing\" (qubit OR teleportation) -crypto -gaming site:arxiv.org filetype:pdf",
        "note": "La requête contient le terme exact, les alternatives entre parenthèses, les exclusions et les filtres techniques."
      }
    ],
    "tests": [
      {
        "label": "Requête complète avec tous les opérateurs",
        "stdin": "cas:1",
        "expected": "NORMALIZED_QUERY raw=\"zero trust\" (iam OR microsegmentation) -legacy -vpn site:nist.gov filetype:pdf"
      },
      {
        "label": "Requête simple sans exclusions ni formats",
        "stdin": "cas:2",
        "expected": "NORMALIZED_QUERY raw=\"ebpf\" (kernel OR xdp) site:kernel.org"
      },
      {
        "label": "Requête avec terme seul et exclusion",
        "stdin": "cas:3",
        "expected": "NORMALIZED_QUERY raw=\"rag\" -langchain -llamaindex"
      }
    ],
    "solution": "[Exemple]\nNORMALIZED_QUERY raw=\"quantum computing\" (qubit OR teleportation) -crypto -gaming site:arxiv.org filetype:pdf\n\n[Cas 1 — Requête complète avec tous les opérateurs]\nNORMALIZED_QUERY raw=\"zero trust\" (iam OR microsegmentation) -legacy -vpn site:nist.gov filetype:pdf\n\n[Cas 2 — Requête simple sans exclusions ni formats]\nNORMALIZED_QUERY raw=\"ebpf\" (kernel OR xdp) site:kernel.org\n\n[Cas 3 — Requête avec terme seul et exclusion]\nNORMALIZED_QUERY raw=\"rag\" -langchain -llamaindex\n"
  },
  {
    "id": "vt3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Auditeur de fiabilité des sources d’information (Score pondéré)",
    "goal": "Évaluer la crédibilité d’une source d’information sur cinq axes méthodologiques pondérés.",
    "brief": "Dans le processus de veille, chaque source est évaluée sur une échelle de 1 à 5 sur cinq critères avec pondération relative :\n- `autorite` (compétence reconnue de l’auteur ou de l’organisme) : coefficient 30%\n- `neutralite` (absence de conflit d’intérêts ou de biais publicitaire) : coefficient 25%\n- `tracabilite` (présence de liens vers les sources primaires, brevets, code) : coefficient 20%\n- `croisement` (validation des faits par d’autres sources indépendantes) : coefficient 15%\n- `fraicheur` (date de révision et actualité du contenu) : coefficient 10%\n\nCalcul du score global sur 100 :\n$$\\text{Score} = (0.30 \\times A + 0.25 \\times N + 0.20 \\times T + 0.15 \\times C + 0.10 \\times F) \\times 20$$\n(le score est arrondi à 1 décimale)\n\nPalier de validation éditoriale :\n- $\\text{Score} \\ge 80.0$ : `QUALIFIEE`\n- $65.0 \\le \\text{Score} < 80.0$ : `SECONDAIRE`\n- $50.0 \\le \\text{Score} < 65.0$ : `SUSPECTE`\n- $\\text{Score} < 50.0$ : `REJETEE`\n\nEntrée :\n`SOURCE nom=<N> autorite=<A> neutralite=<N> tracabilite=<T> croisement=<C> fraicheur=<F>`\n\nRésultat d’analyse attendu :\n- Pour chaque source :\n  `AUDIT nom=<N> score=<SCORE> palier=<PALIER>`\n- Bilan :\n  `SUMMARY total_sources=<N> qualifiees=<Q> rejetees=<R>`",
    "starter": "# Grille d'analyse (vt3-c2-e2) — Auditeur de fiabilité des sources d’information (Score pondéré)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Source avec score frontière suspecte]\n# Données : SOURCE nom=Site_Marketing autorite=2 neutralite=2 tracabilite=3 croisement=3 fraicheur=4\n# Données : SOURCE nom=Arxiv_Preprint autorite=4 neutralite=5 tracabilite=4 croisement=3 fraicheur=5\nA_COMPLETER\n\n[Cas 2 — Toutes les sources qualifiées]\n# Données : SOURCE nom=RFC_Editor autorite=5 neutralite=5 tracabilite=5 croisement=5 fraicheur=5\n# Données : SOURCE nom=ANSSI_Bulletins autorite=5 neutralite=5 tracabilite=4 croisement=4 fraicheur=5\nA_COMPLETER\n\n[Cas 3 — Source rejetée avec note minimale]\n# Données : SOURCE nom=Rumeur_Twitter autorite=1 neutralite=1 tracabilite=1 croisement=1 fraicheur=5\nA_COMPLETER\n",
    "hints": [
      "Calculer la somme pondérée des notes de 1 à 5.",
      "Multiplier par 20 pour ramener sur une échelle de 0 à 100.",
      "Appliquer les seuils stricts pour déterminer le palier."
    ],
    "examples": [
      {
        "stdin": "SOURCE nom=ACM_Transactions autorite=5 neutralite=5 tracabilite=5 croisement=4 fraicheur=4\nSOURCE nom=Blog_Tech_Indep autorite=3 neutralite=4 tracabilite=3 croisement=3 fraicheur=5\nSOURCE nom=Forum_Non_Verifie autorite=1 neutralite=2 tracabilite=1 croisement=1 fraicheur=4",
        "expected": "AUDIT nom=ACM_Transactions score=95.0 palier=QUALIFIEE\nAUDIT nom=Blog_Tech_Indep score=69.0 palier=SECONDAIRE\nAUDIT nom=Forum_Non_Verifie score=31.0 palier=REJETEE\nSUMMARY total_sources=3 qualifiees=1 rejetees=1",
        "note": "ACM_Transactions atteint 95.0/100 (QUALIFIEE), Forum_Non_Verifie 31.0/100 (REJETEE)."
      }
    ],
    "tests": [
      {
        "label": "Source avec score frontière suspecte",
        "stdin": "cas:1",
        "expected": "AUDIT nom=Site_Marketing score=51.0 palier=SUSPECTE\nAUDIT nom=Arxiv_Preprint score=84.0 palier=QUALIFIEE\nSUMMARY total_sources=2 qualifiees=1 rejetees=0"
      },
      {
        "label": "Toutes les sources qualifiées",
        "stdin": "cas:2",
        "expected": "AUDIT nom=RFC_Editor score=100.0 palier=QUALIFIEE\nAUDIT nom=ANSSI_Bulletins score=93.0 palier=QUALIFIEE\nSUMMARY total_sources=2 qualifiees=2 rejetees=0"
      },
      {
        "label": "Source rejetée avec note minimale",
        "stdin": "cas:3",
        "expected": "AUDIT nom=Rumeur_Twitter score=28.0 palier=REJETEE\nSUMMARY total_sources=1 qualifiees=0 rejetees=1"
      }
    ],
    "solution": "[Exemple]\nAUDIT nom=ACM_Transactions score=95.0 palier=QUALIFIEE\nAUDIT nom=Blog_Tech_Indep score=69.0 palier=SECONDAIRE\nAUDIT nom=Forum_Non_Verifie score=31.0 palier=REJETEE\nSUMMARY total_sources=3 qualifiees=1 rejetees=1\n\n[Cas 1 — Source avec score frontière suspecte]\nAUDIT nom=Site_Marketing score=51.0 palier=SUSPECTE\nAUDIT nom=Arxiv_Preprint score=84.0 palier=QUALIFIEE\nSUMMARY total_sources=2 qualifiees=1 rejetees=0\n\n[Cas 2 — Toutes les sources qualifiées]\nAUDIT nom=RFC_Editor score=100.0 palier=QUALIFIEE\nAUDIT nom=ANSSI_Bulletins score=93.0 palier=QUALIFIEE\nSUMMARY total_sources=2 qualifiees=2 rejetees=0\n\n[Cas 3 — Source rejetée avec note minimale]\nAUDIT nom=Rumeur_Twitter score=28.0 palier=REJETEE\nSUMMARY total_sources=1 qualifiees=0 rejetees=1\n"
  },
  {
    "id": "vt3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Détecteur de signaux faibles par accélération d’émergence lexicale",
    "goal": "Analyser une série temporelle d’occurrences pour distinguer les signaux faibles émergents du bruit de fond et des tendances lourdes.",
    "brief": "Dans la théorie du renseignement technologique (Igor Ansoff), un **signal faible** est caractérisé par une faible occurrence globale mais une forte dérivée d’accélération (taux d’augmentation exponentiel) entre périodes consécutives.\n\nPour une série de 4 trimestres $c_1, c_2, c_3, c_4$ :\n- Total d’occurrences : $S = c_1 + c_2 + c_3 + c_4$\n- Taux de croissance trimestriel récent : $\\text{croissance} = \\frac{c_4 - c_3}{\\max(1, c_3)} \\times 100$ (en %)\n\nTypologie du signal :\n1. Si $S < 20$ et $c_4 \\ge 2 \\times c_3$ et $c_4 \\ge 4$ : `SIGNAL_FAIBLE` (faible volume, doublement brusque au dernier trimestre)\n2. Si $S \\ge 50$ et $c_4 > c_3$ : `TENDANCE_LOURDE` (fort volume continu et expansion)\n3. Si $S \\ge 50$ et $c_4 \\le c_3$ : `TENDANCE_SATUREE` (fort volume mais stagnation/recul)\n4. Si $c_4 \\le 2$ et $S < 10$ : `BRUIT_DE_FOND` (anecdote isolée non significative)\n5. Dans les autres cas : `EMERGENCE_MODEREE`\n\nEntrée :\n`SERIE mot=<M> counts=<c1,c2,c3,c4>`\n\nRésultat d’analyse attendu :\n- Pour chaque terme :\n  `SIGNAL_STATUS mot=<M> total=<S> croissance=<C>% statut=<STATUT>`\n- Bilan :\n  `SUMMARY total_termes=<N> signaux_faibles=<K> tendances_lourdes=<T>`",
    "starter": "# Grille d'analyse (vt3-c2-e3) — Détecteur de signaux faibles par accélération d’émergence lexicale\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Signal faible net et émergence modérée]\n# Données : SERIE mot=Neuromorphic counts=1,1,2,5\n# Données : SERIE mot=WebAssembly counts=8,10,12,15\nA_COMPLETER\n\n[Cas 2 — Tendances lourdes et saturées avec fort volume]\n# Données : SERIE mot=GenerativeAI counts=15,20,30,45\n# Données : SERIE mot=Blockchain counts=40,30,20,15\nA_COMPLETER\n\n[Cas 3 — Bruit de fond pur]\n# Données : SERIE mot=OldFramework counts=1,1,0,1\nA_COMPLETER\n",
    "hints": [
      "Découper la chaîne des comptes par virgule pour obtenir les entiers c1, c2, c3, c4.",
      "Appliquer les règles dans l’ordre strict de priorité 1 à 5.",
      "Formater la croissance avec un entier ou un arrondi clair : f\"{croissance:.1f}\"."
    ],
    "examples": [
      {
        "stdin": "SERIE mot=PostQuantum counts=0,1,2,6\nSERIE mot=Kubernetes counts=20,25,30,35\nSERIE mot=Metaverse counts=30,25,20,15\nSERIE mot=LangageX counts=1,0,1,1",
        "expected": "SIGNAL_STATUS mot=PostQuantum total=9 croissance=200.0% statut=SIGNAL_FAIBLE\nSIGNAL_STATUS mot=Kubernetes total=110 croissance=16.7% statut=TENDANCE_LOURDE\nSIGNAL_STATUS mot=Metaverse total=90 croissance=-25.0% statut=TENDANCE_SATUREE\nSIGNAL_STATUS mot=LangageX total=3 croissance=0.0% statut=BRUIT_DE_FOND\nSUMMARY total_termes=4 signaux_faibles=1 tendances_lourdes=1",
        "note": "PostQuantum totalise 9 mentions avec bond de 2 à 6 (+200%), c’est un signal faible typique."
      }
    ],
    "tests": [
      {
        "label": "Signal faible net et émergence modérée",
        "stdin": "cas:1",
        "expected": "SIGNAL_STATUS mot=Neuromorphic total=9 croissance=150.0% statut=SIGNAL_FAIBLE\nSIGNAL_STATUS mot=WebAssembly total=45 croissance=25.0% statut=EMERGENCE_MODEREE\nSUMMARY total_termes=2 signaux_faibles=1 tendances_lourdes=0"
      },
      {
        "label": "Tendances lourdes et saturées avec fort volume",
        "stdin": "cas:2",
        "expected": "SIGNAL_STATUS mot=GenerativeAI total=110 croissance=50.0% statut=TENDANCE_LOURDE\nSIGNAL_STATUS mot=Blockchain total=105 croissance=-25.0% statut=TENDANCE_SATUREE\nSUMMARY total_termes=2 signaux_faibles=0 tendances_lourdes=1"
      },
      {
        "label": "Bruit de fond pur",
        "stdin": "cas:3",
        "expected": "SIGNAL_STATUS mot=OldFramework total=3 croissance=100.0% statut=BRUIT_DE_FOND\nSUMMARY total_termes=1 signaux_faibles=0 tendances_lourdes=0"
      }
    ],
    "solution": "[Exemple]\nSIGNAL_STATUS mot=PostQuantum total=9 croissance=200.0% statut=SIGNAL_FAIBLE\nSIGNAL_STATUS mot=Kubernetes total=110 croissance=16.7% statut=TENDANCE_LOURDE\nSIGNAL_STATUS mot=Metaverse total=90 croissance=-25.0% statut=TENDANCE_SATUREE\nSIGNAL_STATUS mot=LangageX total=3 croissance=0.0% statut=BRUIT_DE_FOND\nSUMMARY total_termes=4 signaux_faibles=1 tendances_lourdes=1\n\n[Cas 1 — Signal faible net et émergence modérée]\nSIGNAL_STATUS mot=Neuromorphic total=9 croissance=150.0% statut=SIGNAL_FAIBLE\nSIGNAL_STATUS mot=WebAssembly total=45 croissance=25.0% statut=EMERGENCE_MODEREE\nSUMMARY total_termes=2 signaux_faibles=1 tendances_lourdes=0\n\n[Cas 2 — Tendances lourdes et saturées avec fort volume]\nSIGNAL_STATUS mot=GenerativeAI total=110 croissance=50.0% statut=TENDANCE_LOURDE\nSIGNAL_STATUS mot=Blockchain total=105 croissance=-25.0% statut=TENDANCE_SATUREE\nSUMMARY total_termes=2 signaux_faibles=0 tendances_lourdes=1\n\n[Cas 3 — Bruit de fond pur]\nSIGNAL_STATUS mot=OldFramework total=3 croissance=100.0% statut=BRUIT_DE_FOND\nSUMMARY total_termes=1 signaux_faibles=0 tendances_lourdes=0\n"
  },
  {
    "id": "vt3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Parseur de flux de syndication RSS 2.0 / Atom",
    "goal": "Extraire et structurer les métadonnées techniques (titre, lien, date, identifiant GUID) d’un flux XML de veille.",
    "brief": "Dans la collecte automatisée en mode Push/Pull, les flux RSS 2.0 et Atom constituent le standard d’interopérabilité pour agréger les nouveautés sans polluer les serveurs cibles.\n\nChaque élément `<item>` contient les balises :\n- `<title>` : titre de la dépêche ou publication\n- `<link>` : URL canonique de la source\n- `<pubDate>` : date de publication au format RFC 822 ou ISO (ex: `2025-10-15`)\n- `<guid>` : identifiant unique de l’élément\n\nEntrée :\nLignes contenant des balises XML au format standardisé :\n`<item><guid>G</guid><title>T</title><link>L</link><pubDate>D</pubDate></item>`\n\nRésultat d’analyse attendu :\n- Pour chaque article :\n  `ARTICLE id=<G> title=<T> link=<L> date=<D>`\n- Bilan :\n  `SUMMARY total_articles=<N> latest_date=<D>`",
    "starter": "# Grille d'analyse (vt3-c3-e1) — Parseur de flux de syndication RSS 2.0 / Atom\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois articles avec dates variées]\n# Données : <item><guid>cve-1</guid><title>Alerte CERT-FR sur routeurs</title><link>https://cert.ssi.gouv.fr/1</link><pubDate>2025-09-20</pubDate></item>\n# Données : <item><guid>cve-2</guid><title>Mise à jour noyau Linux 6.12</title><link>https://kernel.org/612</link><pubDate>2025-10-05</pubDate></item>\n# Données : <item><guid>cve-3</guid><title>Rapport Gartner Cloud 2025</title><link>https://gartner.com/cloud</link><pubDate>2025-10-12</pubDate></item>\nA_COMPLETER\n\n[Cas 2 — Un seul article]\n# Données : <item><guid>art-99</guid><title>Déploiement fibre 10G</title><link>https://telecom.fr/10g</link><pubDate>2025-11-01</pubDate></item>\nA_COMPLETER\n\n[Cas 3 — Ordre inversé des balises dans l item]\n# Données : <item><title>Brevet microprocesseur supraconducteur</title><guid>pat-888</guid><pubDate>2025-08-15</pubDate><link>https://epo.org/888</link></item>\nA_COMPLETER\n",
    "hints": [
      "Utiliser des expressions régulières (re.search) ou un découpage pour extraire le contenu entre balises <tag> et </tag>.",
      "Identifier la date la plus récente au format lexicographique YYYY-MM-DD.",
      "Gérer les espaces superflus autour du titre et des liens."
    ],
    "examples": [
      {
        "stdin": "<item><guid>art-101</guid><title>Sortie de Python 3.14</title><link>https://python.org/news/101</link><pubDate>2025-10-01</pubDate></item>\n<item><guid>art-102</guid><title>Vulnérabilité OpenSSL critique</title><link>https://cve.mitre.org/2025-02</link><pubDate>2025-10-14</pubDate></item>",
        "expected": "ARTICLE id=art-101 title=Sortie de Python 3.14 link=https://python.org/news/101 date=2025-10-01\nARTICLE id=art-102 title=Vulnérabilité OpenSSL critique link=https://cve.mitre.org/2025-02 date=2025-10-14\nSUMMARY total_articles=2 latest_date=2025-10-14",
        "note": "Le parseur extrait les 4 champs et repère la date la plus récente (2025-10-14)."
      }
    ],
    "tests": [
      {
        "label": "Trois articles avec dates variées",
        "stdin": "cas:1",
        "expected": "ARTICLE id=cve-1 title=Alerte CERT-FR sur routeurs link=https://cert.ssi.gouv.fr/1 date=2025-09-20\nARTICLE id=cve-2 title=Mise à jour noyau Linux 6.12 link=https://kernel.org/612 date=2025-10-05\nARTICLE id=cve-3 title=Rapport Gartner Cloud 2025 link=https://gartner.com/cloud date=2025-10-12\nSUMMARY total_articles=3 latest_date=2025-10-12"
      },
      {
        "label": "Un seul article",
        "stdin": "cas:2",
        "expected": "ARTICLE id=art-99 title=Déploiement fibre 10G link=https://telecom.fr/10g date=2025-11-01\nSUMMARY total_articles=1 latest_date=2025-11-01"
      },
      {
        "label": "Ordre inversé des balises dans l item",
        "stdin": "cas:3",
        "expected": "ARTICLE id=pat-888 title=Brevet microprocesseur supraconducteur link=https://epo.org/888 date=2025-08-15\nSUMMARY total_articles=1 latest_date=2025-08-15"
      }
    ],
    "solution": "[Exemple]\nARTICLE id=art-101 title=Sortie de Python 3.14 link=https://python.org/news/101 date=2025-10-01\nARTICLE id=art-102 title=Vulnérabilité OpenSSL critique link=https://cve.mitre.org/2025-02 date=2025-10-14\nSUMMARY total_articles=2 latest_date=2025-10-14\n\n[Cas 1 — Trois articles avec dates variées]\nARTICLE id=cve-1 title=Alerte CERT-FR sur routeurs link=https://cert.ssi.gouv.fr/1 date=2025-09-20\nARTICLE id=cve-2 title=Mise à jour noyau Linux 6.12 link=https://kernel.org/612 date=2025-10-05\nARTICLE id=cve-3 title=Rapport Gartner Cloud 2025 link=https://gartner.com/cloud date=2025-10-12\nSUMMARY total_articles=3 latest_date=2025-10-12\n\n[Cas 2 — Un seul article]\nARTICLE id=art-99 title=Déploiement fibre 10G link=https://telecom.fr/10g date=2025-11-01\nSUMMARY total_articles=1 latest_date=2025-11-01\n\n[Cas 3 — Ordre inversé des balises dans l item]\nARTICLE id=pat-888 title=Brevet microprocesseur supraconducteur link=https://epo.org/888 date=2025-08-15\nSUMMARY total_articles=1 latest_date=2025-08-15\n"
  },
  {
    "id": "vt3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Moteur de déduplication multi-sources et nettoyage de liens UTM",
    "goal": "Éliminer les doublons stricts et quasi-doublons de flux via normalisation d’URL et similarité lexicale de Jaccard.",
    "brief": "Lorsqu’un veilleur agrège des dizaines de flux RSS et lettres d’information, une même actualité apparaît sous plusieurs URLs avec des paramètres de pistage (UTM) ou des titres légèrement reformulés.\n\nRègles de traitement séquentiel pour chaque article entrant :\n1. **Nettoyage d’URL** : Supprimer tous les paramètres commençant par `utm_` ainsi que `ref` et `source` de la chaîne de requête (séparateurs `?` et `&`).\n   Si l’URL canonique nettoyée a déjà été vue : marquer `DOUBLON_URL` et rejeter.\n2. **Similarité de Jaccard sur les titres** : Comparer l’ensemble des mots minuscules du titre avec les titres des articles *déjà conservés* :\n   $$J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$$\n   Si pour un article conservé $J(A, B) \\ge 0.60$ : marquer `DOUBLON_TITRE` et rejeter.\n3. Sinon : marquer `CONSERVE` et enregistrer l’article.\n\nEntrée :\n`ITEM id=<ID> url=<URL> title=<TITRE>`\n\nRésultat d’analyse attendu :\n- Pour chaque élément :\n  `STATUS id=<ID> action=<CONSERVE|DOUBLON_URL|DOUBLON_TITRE>`\n- Bilan :\n  `SUMMARY recus=<N> conserves=<C> doublons=<D>`",
    "starter": "# Grille d'analyse (vt3-c3-e2) — Moteur de déduplication multi-sources et nettoyage de liens UTM\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois articles distincts conservés]\n# Données : ITEM id=A url=https://site1.fr/art1?id=10 title=Architecture micro-services cloud\n# Données : ITEM id=B url=https://site2.fr/art2?id=20 title=Sécurité des conteneurs docker\n# Données : ITEM id=C url=https://site3.fr/art3?id=30 title=Réseau 5G et antennes intelligentes\nA_COMPLETER\n\n[Cas 2 — Doublon strict d URL avec multiples paramètres de tracking]\n# Données : ITEM id=10 url=https://blog.com/post?ref=rss&utm_campaign=launch title=Nouvel algorithme IA\n# Données : ITEM id=11 url=https://blog.com/post?utm_source=feedly&ref=feed title=Titre tout à fait différent\nA_COMPLETER\n\n[Cas 3 — Doublon de titre quasi-identique avec mots permutés]\n# Données : ITEM id=X1 url=https://lemonde.fr/it1 title=Lancement de la fusée Ariane 6 en Guyane\n# Données : ITEM id=X2 url=https://lefigaro.fr/it2 title=Lancement réussi de la fusée Ariane 6 en Guyane\nA_COMPLETER\n",
    "hints": [
      "Normalisez les URLs collectées en supprimant les paramètres de traçage superflus et les ancres.",
      "L’indice de similarité de Jaccard mesure la proximité sémantique de deux sources par le quotient de l’intersection des mots par leur union."
    ],
    "examples": [
      {
        "stdin": "ITEM id=1 url=https://tech.com/news?utm_source=twitter&utm_medium=social title=Sortie officielle de Linux 6.12\nITEM id=2 url=https://tech.com/news?utm_source=newsletter title=Autre actu\nITEM id=3 url=https://autre.com/linux title=Sortie officielle et annonce de Linux 6.12",
        "expected": "STATUS id=1 action=CONSERVE\nSTATUS id=2 action=DOUBLON_URL\nSTATUS id=3 action=DOUBLON_TITRE\nSUMMARY recus=3 conserves=1 doublons=2",
        "note": "L’item 2 a la même URL nettoyée (https://tech.com/news). L’item 3 a un Jaccard de 5/7 = 0.71 avec l’item 1."
      }
    ],
    "tests": [
      {
        "label": "Trois articles distincts conservés",
        "stdin": "cas:1",
        "expected": "STATUS id=A action=CONSERVE\nSTATUS id=B action=CONSERVE\nSTATUS id=C action=CONSERVE\nSUMMARY recus=3 conserves=3 doublons=0"
      },
      {
        "label": "Doublon strict d URL avec multiples paramètres de tracking",
        "stdin": "cas:2",
        "expected": "STATUS id=10 action=CONSERVE\nSTATUS id=11 action=DOUBLON_URL\nSUMMARY recus=2 conserves=1 doublons=1"
      },
      {
        "label": "Doublon de titre quasi-identique avec mots permutés",
        "stdin": "cas:3",
        "expected": "STATUS id=X1 action=CONSERVE\nSTATUS id=X2 action=DOUBLON_TITRE\nSUMMARY recus=2 conserves=1 doublons=1"
      }
    ],
    "solution": "[Exemple]\nSTATUS id=1 action=CONSERVE\nSTATUS id=2 action=DOUBLON_URL\nSTATUS id=3 action=DOUBLON_TITRE\nSUMMARY recus=3 conserves=1 doublons=2\n\n[Cas 1 — Trois articles distincts conservés]\nSTATUS id=A action=CONSERVE\nSTATUS id=B action=CONSERVE\nSTATUS id=C action=CONSERVE\nSUMMARY recus=3 conserves=3 doublons=0\n\n[Cas 2 — Doublon strict d URL avec multiples paramètres de tracking]\nSTATUS id=10 action=CONSERVE\nSTATUS id=11 action=DOUBLON_URL\nSUMMARY recus=2 conserves=1 doublons=1\n\n[Cas 3 — Doublon de titre quasi-identique avec mots permutés]\nSTATUS id=X1 action=CONSERVE\nSTATUS id=X2 action=DOUBLON_TITRE\nSUMMARY recus=2 conserves=1 doublons=1\n"
  },
  {
    "id": "vt3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Simulateur d’ordonnanceur de collecte hybride Push/Pull avec Rate Limiter",
    "goal": "Simuler la charge de collecte sur un parc hétérogène de sources en appliquant les quotas de limitation de requêtes.",
    "brief": "Un robot de veille doit équilibrer ses requêtes sortantes pour respecter la bande passante et éviter d’être banni par les serveurs distants (Rate Limiting HTTP 429) :\n- `PUSH_WEBHOOK` : l’information est poussée par le serveur distant vers notre API. Le collecteur local émet 0 requête sortante (`requetes_emises = 0`, `statut = OPTIMAL`).\n- `PULL_RSS` ou `PULL_SCRAPING` : le collecteur interroge la source toutes les `periode_sec` secondes.\n\nSur une durée de simulation $S$ secondes :\n- Nombre de requêtes sollicitées : $R_{\\text{sollicitees}} = \\lfloor S / \\text{periode_sec} \\rfloor$\n- Quota maximal alloué par la limite : $Q_{\\text{max}} = \\lfloor \\text{rpm} \\times (S / 60) \\rfloor$\n- Requêtes effectives émises : $R_{\\text{emises}} = \\min(R_{\\text{sollicitees}}, Q_{\\text{max}})$\n- Si $R_{\\text{sollicitees}} > Q_{\\text{max}}$ : `statut = THROTTLED` (bridé par le rate limiter)\n- Sinon : `statut = OPTIMAL`\n\nEntrée :\n`DUREE_SIMU sec=<S>`\n`FLUX id=<ID> type=<PUSH_WEBHOOK|PULL_RSS|PULL_SCRAPING> periode_sec=<P> rpm=<RPM>`\n\nRésultat d’analyse attendu :\n- Pour chaque flux :\n  `COLLECT_JOB id=<ID> requetes_emises=<R> statut=<STATUT>`\n- Bilan :\n  `SUMMARY total_flux=<N> total_requetes=<R> flux_throttled=<T>`",
    "starter": "# Grille d'analyse (vt3-c3-e3) — Simulateur d’ordonnanceur de collecte hybride Push/Pull avec Rate Limiter\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Simulation courte de 10 minutes avec sources optimales]\n# Données : DUREE_SIMU sec=600\n# Données : FLUX id=f1 type=PULL_RSS periode_sec=120 rpm=5\n# Données : FLUX id=f2 type=PUSH_WEBHOOK periode_sec=0 rpm=20\nA_COMPLETER\n\n[Cas 2 — Toutes les sources en scraping bridé]\n# Données : DUREE_SIMU sec=1800\n# Données : FLUX id=s1 type=PULL_SCRAPING periode_sec=10 rpm=2\n# Données : FLUX id=s2 type=PULL_SCRAPING periode_sec=5 rpm=3\nA_COMPLETER\n\n[Cas 3 — Simulation d’une heure avec plusieurs webhooks]\n# Données : DUREE_SIMU sec=3600\n# Données : FLUX id=wh1 type=PUSH_WEBHOOK periode_sec=0 rpm=50\n# Données : FLUX id=wh2 type=PUSH_WEBHOOK periode_sec=0 rpm=50\n# Données : FLUX id=rss1 type=PULL_RSS periode_sec=1800 rpm=2\nA_COMPLETER\n",
    "hints": [
      "Lire d’abord la ligne DUREE_SIMU pour connaître le temps de simulation S.",
      "Pour les flux Push, les requêtes émises sont nulles.",
      "Comparer les requêtes théoriques avec le quota autorisé calculé sur S."
    ],
    "examples": [
      {
        "stdin": "DUREE_SIMU sec=3600\nFLUX id=cert_webhook type=PUSH_WEBHOOK periode_sec=0 rpm=100\nFLUX id=rss_github type=PULL_RSS periode_sec=600 rpm=10\nFLUX id=scrape_forum type=PULL_SCRAPING periode_sec=30 rpm=1",
        "expected": "COLLECT_JOB id=cert_webhook requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss_github requetes_emises=6 statut=OPTIMAL\nCOLLECT_JOB id=scrape_forum requetes_emises=60 statut=THROTTLED\nSUMMARY total_flux=3 total_requetes=66 flux_throttled=1",
        "note": "Le scrape_forum voulait 3600/30 = 120 requêtes, mais le RPM de 1 le bride à 60 requêtes (THROTTLED)."
      }
    ],
    "tests": [
      {
        "label": "Simulation courte de 10 minutes avec sources optimales",
        "stdin": "cas:1",
        "expected": "COLLECT_JOB id=f1 requetes_emises=5 statut=OPTIMAL\nCOLLECT_JOB id=f2 requetes_emises=0 statut=OPTIMAL\nSUMMARY total_flux=2 total_requetes=5 flux_throttled=0"
      },
      {
        "label": "Toutes les sources en scraping bridé",
        "stdin": "cas:2",
        "expected": "COLLECT_JOB id=s1 requetes_emises=60 statut=THROTTLED\nCOLLECT_JOB id=s2 requetes_emises=90 statut=THROTTLED\nSUMMARY total_flux=2 total_requetes=150 flux_throttled=2"
      },
      {
        "label": "Simulation d’une heure avec plusieurs webhooks",
        "stdin": "cas:3",
        "expected": "COLLECT_JOB id=wh1 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=wh2 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss1 requetes_emises=2 statut=OPTIMAL\nSUMMARY total_flux=3 total_requetes=2 flux_throttled=0"
      }
    ],
    "solution": "[Exemple]\nCOLLECT_JOB id=cert_webhook requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss_github requetes_emises=6 statut=OPTIMAL\nCOLLECT_JOB id=scrape_forum requetes_emises=60 statut=THROTTLED\nSUMMARY total_flux=3 total_requetes=66 flux_throttled=1\n\n[Cas 1 — Simulation courte de 10 minutes avec sources optimales]\nCOLLECT_JOB id=f1 requetes_emises=5 statut=OPTIMAL\nCOLLECT_JOB id=f2 requetes_emises=0 statut=OPTIMAL\nSUMMARY total_flux=2 total_requetes=5 flux_throttled=0\n\n[Cas 2 — Toutes les sources en scraping bridé]\nCOLLECT_JOB id=s1 requetes_emises=60 statut=THROTTLED\nCOLLECT_JOB id=s2 requetes_emises=90 statut=THROTTLED\nSUMMARY total_flux=2 total_requetes=150 flux_throttled=2\n\n[Cas 3 — Simulation d’une heure avec plusieurs webhooks]\nCOLLECT_JOB id=wh1 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=wh2 requetes_emises=0 statut=OPTIMAL\nCOLLECT_JOB id=rss1 requetes_emises=2 statut=OPTIMAL\nSUMMARY total_flux=3 total_requetes=2 flux_throttled=0\n"
  },
  {
    "id": "vt3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Tokeniseur et filtre de mots vides (Stopwords & Normalisation)",
    "goal": "Nettoyer un corpus textuel de veille, supprimer la ponctuation, éliminer les mots vides (stopwords) et extraire le vocabulaire technique saillant.",
    "brief": "Dans la chaîne de traitement NLP d’un système de veille, le texte brut doit être normalisé avant indexation :\n1. Convertir l’ensemble des caractères en minuscules.\n2. Remplacer la ponctuation et caractères spéciaux par des espaces : `.,;:!?'\"()[]{}<>-/\\\\_`\n3. Extraire tous les tokens (mots) composés de caractères alphanumériques.\n4. Filtrer les mots de longueur $\\le 2$ lettres ainsi que les mots vides (stopwords) de la liste de référence :\n   `le, la, les, de, du, des, un, une, et, en, pour, sur, par, dans, avec, ce, qui, que, the, a, an, and, of, in, to, for, on, with, is, at, as`\n5. Trier les tokens uniques conservés par ordre alphabétique.\n6. Calculer le taux de réduction de taille : $\\text{reduction} = (1 - \\frac{\\text{tokens retenus}}{\\text{total tokens initiaux}}) \\times 100$ (en %, arrondi à 1 décimale).\n\nEntrée :\n`DOC id=<ID> text=<TEXTE>`\n\nRésultat d’analyse attendu :\n- Pour chaque document :\n  `TOKENS id=<ID> count=<N> words=<w1,w2,...> reduction=<R>%`\n- Bilan :\n  `SUMMARY total_docs=<N> total_tokens=<T>` (somme des tokens retenus)",
    "starter": "# Grille d'analyse (vt3-c4-e1) — Tokeniseur et filtre de mots vides (Stopwords & Normalisation)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux documents bilingues avec ponctuation diverse]\n# Données : DOC id=A text=Architecture of zero-trust networks with modern cryptography.\n# Données : DOC id=B text=Déploiement d un cluster Kubernetes sur des serveurs Linux.\nA_COMPLETER\n\n[Cas 2 — Document très bruité avec presque uniquement des stopwords]\n# Données : DOC id=Z text=Dans ce que le pour et avec un...\nA_COMPLETER\n\n[Cas 3 — Termes techniques et acronymes]\n# Données : DOC id=T1 text=API REST GraphQL gRPC pour les échanges de données.\nA_COMPLETER\n",
    "hints": [
      "Utiliser re.sub pour nettoyer la ponctuation avant de faire l’extraction des champs.",
      "Créer un ensemble (set) de stopwords pour une vérification en O(1).",
      "Attention : le taux de réduction se calcule sur le nombre de tokens retenus divisé par le total des tokens initiaux."
    ],
    "examples": [
      {
        "stdin": "DOC id=1 text=Le cloud et les micro-services dans le datacenter avec Docker.",
        "expected": "TOKENS id=1 count=5 words=cloud,datacenter,docker,micro,services reduction=54.5%\nSUMMARY total_docs=1 total_tokens=5",
        "note": "Tokens initiaux: 11 mots. Retenus: cloud, micro, services, datacenter, docker (5 mots). Réduction de 54.5%."
      }
    ],
    "tests": [
      {
        "label": "Deux documents bilingues avec ponctuation diverse",
        "stdin": "cas:1",
        "expected": "TOKENS id=A count=6 words=architecture,cryptography,modern,networks,trust,zero reduction=25.0%\nTOKENS id=B count=5 words=cluster,déploiement,kubernetes,linux,serveurs reduction=44.4%\nSUMMARY total_docs=2 total_tokens=11"
      },
      {
        "label": "Document très bruité avec presque uniquement des stopwords",
        "stdin": "cas:2",
        "expected": "TOKENS id=Z count=0 words= reduction=100.0%\nSUMMARY total_docs=1 total_tokens=0"
      },
      {
        "label": "Termes techniques et acronymes",
        "stdin": "cas:3",
        "expected": "TOKENS id=T1 count=6 words=api,données,graphql,grpc,rest,échanges reduction=33.3%\nSUMMARY total_docs=1 total_tokens=6"
      }
    ],
    "solution": "[Exemple]\nTOKENS id=1 count=5 words=cloud,datacenter,docker,micro,services reduction=54.5%\nSUMMARY total_docs=1 total_tokens=5\n\n[Cas 1 — Deux documents bilingues avec ponctuation diverse]\nTOKENS id=A count=6 words=architecture,cryptography,modern,networks,trust,zero reduction=25.0%\nTOKENS id=B count=5 words=cluster,déploiement,kubernetes,linux,serveurs reduction=44.4%\nSUMMARY total_docs=2 total_tokens=11\n\n[Cas 2 — Document très bruité avec presque uniquement des stopwords]\nTOKENS id=Z count=0 words= reduction=100.0%\nSUMMARY total_docs=1 total_tokens=0\n\n[Cas 3 — Termes techniques et acronymes]\nTOKENS id=T1 count=6 words=api,données,graphql,grpc,rest,échanges reduction=33.3%\nSUMMARY total_docs=1 total_tokens=6\n"
  },
  {
    "id": "vt3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Calculateur de score de pertinence TF-IDF sur un corpus de veille",
    "goal": "Classer un corpus de documents selon leur score de pertinence TF-IDF pour une requête de veille ciblée.",
    "brief": "L’algorithme TF-IDF (Term Frequency - Inverse Document Frequency) quantifie l’importance relative d’un mot par rapport à un corpus documentaire :\n- Pour un document $d$ et un mot-clé $q$ :\n  $$\\text{TF}(q, d) = \\frac{\\text{occurrences de } q \\text{ dans } d}{\\text{nombre total de mots dans } d}$$\n- Fréquence inverse de document sur le corpus de $N$ documents :\n  $$\\text{IDF}(q) = \\ln\\left(\\frac{N + 1}{\\text{DF}(q) + 1}\\right) + 1$$\n  où $\\text{DF}(q)$ est le nombre de documents du corpus contenant au moins une fois le terme $q$.\n- Score total d’un document $d$ pour la requête :\n  $$\\text{Score}(d) = \\sum_{q \\in \\text{requête}} \\text{TF}(q, d) \\times \\text{IDF}(q)$$\n(le score est arrondi à 4 décimales)\n\nEntrée :\n`QUERY words=<q1,q2,...>`\n`CORPUS_DOC id=<ID> text=<mots séparés par des espaces>`\n\nRésultat d’analyse attendu :\n- Documents triés par score décroissant (en cas d’égalité de score, trier par id alphabétique croissant) :\n  `RANK id=<ID> score=<SCORE>`\n- Bilan :\n  `SUMMARY top_doc=<ID> top_score=<SCORE>`",
    "starter": "# Grille d'analyse (vt3-c4-e2) — Calculateur de score de pertinence TF-IDF sur un corpus de veille\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux documents avec termes exclusifs]\n# Données : QUERY words=blockchain,smart\n# Données : CORPUS_DOC id=A text=blockchain et smart contracts pour la finance\n# Données : CORPUS_DOC id=B text=developpement web et design moderne\nA_COMPLETER\n\n[Cas 2 — Égalité de score avec tri alphabétique par identifiant]\n# Données : QUERY words=rust\n# Données : CORPUS_DOC id=DOC_B text=langage rust performance\n# Données : CORPUS_DOC id=DOC_A text=langage rust securite\nA_COMPLETER\n\n[Cas 3 — Aucun document ne contenant les termes de requête]\n# Données : QUERY words=inexistant\n# Données : CORPUS_DOC id=D1 text=article un\n# Données : CORPUS_DOC id=D2 text=article deux\nA_COMPLETER\n",
    "hints": [
      "Extraire d’abord les termes de la requête en minuscules.",
      "Parcourir le corpus pour compter le nombre total de documents N et le DF de chaque terme de requête.",
      "Calculer pour chaque document la somme des TF * IDF pour les termes de la requête.",
      "Utiliser math.log() pour le logarithme népérien."
    ],
    "examples": [
      {
        "stdin": "QUERY words=quantique,securite\nCORPUS_DOC id=D1 text=ordinateur quantique et cryptographie quantique securite absolue\nCORPUS_DOC id=D2 text=securite des serveurs cloud linux et pare-feu\nCORPUS_DOC id=D3 text=intelligence artificielle et vision par ordinateur",
        "expected": "RANK id=D1 score=0.6677\nRANK id=D2 score=0.1840\nRANK id=D3 score=0.0000\nSUMMARY top_doc=D1 top_score=0.6677",
        "note": "D1 contient 2 fois \"quantique\" et 1 fois \"securite\", obtenant le score maximal."
      }
    ],
    "tests": [
      {
        "label": "Deux documents avec termes exclusifs",
        "stdin": "cas:1",
        "expected": "RANK id=A score=0.4016\nRANK id=B score=0.0000\nSUMMARY top_doc=A top_score=0.4016"
      },
      {
        "label": "Égalité de score avec tri alphabétique par identifiant",
        "stdin": "cas:2",
        "expected": "RANK id=DOC_A score=0.3333\nRANK id=DOC_B score=0.3333\nSUMMARY top_doc=DOC_A top_score=0.3333"
      },
      {
        "label": "Aucun document ne contenant les termes de requête",
        "stdin": "cas:3",
        "expected": "RANK id=D1 score=0.0000\nRANK id=D2 score=0.0000\nSUMMARY top_doc=D1 top_score=0.0000"
      }
    ],
    "solution": "[Exemple]\nRANK id=D1 score=0.6677\nRANK id=D2 score=0.1840\nRANK id=D3 score=0.0000\nSUMMARY top_doc=D1 top_score=0.6677\n\n[Cas 1 — Deux documents avec termes exclusifs]\nRANK id=A score=0.4016\nRANK id=B score=0.0000\nSUMMARY top_doc=A top_score=0.4016\n\n[Cas 2 — Égalité de score avec tri alphabétique par identifiant]\nRANK id=DOC_A score=0.3333\nRANK id=DOC_B score=0.3333\nSUMMARY top_doc=DOC_A top_score=0.3333\n\n[Cas 3 — Aucun document ne contenant les termes de requête]\nRANK id=D1 score=0.0000\nRANK id=D2 score=0.0000\nSUMMARY top_doc=D1 top_score=0.0000\n"
  },
  {
    "id": "vt3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)",
    "goal": "Appliquer le modèle probabiliste de Naive Bayes pour filtrer automatiquement les alertes entrantes en éliminant le bruit informationnel.",
    "brief": "Dans la surveillance temps réel, les flux génèrent une surcharge cognitive de notifications parasites. Un filtre probabiliste Naive Bayes calcule la log-vraisemblance d’appartenance aux classes `PERTINENT` et `BRUIT` :\n\nPour une alerte composée des mots $w_1, w_2, \\dots, w_k$ :\n$$\\ln P(\\text{Pertinent}|d) = \\ln P_0(\\text{pertinent}) + \\sum_{i=1}^k \\ln P(w_i | \\text{pertinent})$$\n$$\\ln P(\\text{Bruit}|d) = \\ln P_0(\\text{bruit}) + \\sum_{i=1}^k \\ln P(w_i | \\text{bruit})$$\n(les mots inconnus non présents dans la table de probabilités sont ignorés)\n\nRègle de décision :\n- Si $\\ln P(\\text{Pertinent}|d) \\ge \\ln P(\\text{Bruit}|d)$ : `decision = PERTINENT`\n- Sinon : `decision = BRUIT`\n- Différence logarithmique : $\\text{diff} = \\ln P(\\text{Pertinent}|d) - \\ln P(\\text{Bruit}|d)$ (arrondie à 2 décimales)\n\nEntrée :\n`PRIOR pertinent=<P1> bruit=<P2>`\n`PROB word=<W> p_pert=<PP> p_bruit=<PB>`\n`ALERT id=<ID> text=<mots séparés par des espaces>`\n\nRésultat d’analyse attendu :\n- Pour chaque alerte :\n  `CLASSIFICATION id=<ID> decision=<DECISION> diff=<DIFF>`\n- Bilan :\n  `SUMMARY total_alertes=<N> retenues=<R> rejetees=<J>`",
    "starter": "# Grille d'analyse (vt3-c4-e3) — Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Alerte avec mots mixtes départagée par le ratio de cotes]\n# Données : PRIOR pertinent=0.6 bruit=0.4\n# Données : PROB word=securite p_pert=0.10 p_bruit=0.05\n# Données : PROB word=sponsorise p_pert=0.01 p_bruit=0.20\n# Données : ALERT id=X1 text=article securite sponsorise par notre partenaire\nA_COMPLETER\n\n[Cas 2 — Toutes les alertes hautement pertinentes]\n# Données : PRIOR pertinent=0.5 bruit=0.5\n# Données : PROB word=vulnerabilite p_pert=0.25 p_bruit=0.01\n# Données : ALERT id=K1 text=vulnerabilite linux\n# Données : ALERT id=K2 text=nouvelle vulnerabilite windows\nA_COMPLETER\n\n[Cas 3 — Alerte sans aucun mot connu dans le dictionnaire]\n# Données : PRIOR pertinent=0.7 bruit=0.3\n# Données : PROB word=ia p_pert=0.10 p_bruit=0.02\n# Données : ALERT id=EMPTY text=bonjour tout le monde\nA_COMPLETER\n",
    "hints": [
      "Convertir les probabilités P_pert et P_bruit avec math.log().",
      "Additionner les logs pour chaque mot de l’alerte présent dans la table.",
      "Comparer les sommes cumulées pour statuer sur la décision."
    ],
    "examples": [
      {
        "stdin": "PRIOR pertinent=0.5 bruit=0.5\nPROB word=faille p_pert=0.20 p_bruit=0.01\nPROB word=zero-day p_pert=0.15 p_bruit=0.001\nPROB word=promo p_pert=0.005 p_bruit=0.30\nPROB word=gratuit p_pert=0.01 p_bruit=0.25\nALERT id=A1 text=decouverte d une faille critique zero-day\nALERT id=A2 text=super promo webinaire gratuit pour tous",
        "expected": "CLASSIFICATION id=A1 decision=PERTINENT diff=8.01\nCLASSIFICATION id=A2 decision=BRUIT diff=-7.31\nSUMMARY total_alertes=2 retenues=1 rejetees=1",
        "note": "L’alerte A1 a une log-différence largement positive (+8.01) et est retenue."
      }
    ],
    "tests": [
      {
        "label": "Alerte avec mots mixtes départagée par le ratio de cotes",
        "stdin": "cas:1",
        "expected": "CLASSIFICATION id=X1 decision=BRUIT diff=-1.90\nSUMMARY total_alertes=1 retenues=0 rejetees=1"
      },
      {
        "label": "Toutes les alertes hautement pertinentes",
        "stdin": "cas:2",
        "expected": "CLASSIFICATION id=K1 decision=PERTINENT diff=3.22\nCLASSIFICATION id=K2 decision=PERTINENT diff=3.22\nSUMMARY total_alertes=2 retenues=2 rejetees=0"
      },
      {
        "label": "Alerte sans aucun mot connu dans le dictionnaire",
        "stdin": "cas:3",
        "expected": "CLASSIFICATION id=EMPTY decision=PERTINENT diff=0.85\nSUMMARY total_alertes=1 retenues=1 rejetees=0"
      }
    ],
    "solution": "[Exemple]\nCLASSIFICATION id=A1 decision=PERTINENT diff=8.01\nCLASSIFICATION id=A2 decision=BRUIT diff=-7.31\nSUMMARY total_alertes=2 retenues=1 rejetees=1\n\n[Cas 1 — Alerte avec mots mixtes départagée par le ratio de cotes]\nCLASSIFICATION id=X1 decision=BRUIT diff=-1.90\nSUMMARY total_alertes=1 retenues=0 rejetees=1\n\n[Cas 2 — Toutes les alertes hautement pertinentes]\nCLASSIFICATION id=K1 decision=PERTINENT diff=3.22\nCLASSIFICATION id=K2 decision=PERTINENT diff=3.22\nSUMMARY total_alertes=2 retenues=2 rejetees=0\n\n[Cas 3 — Alerte sans aucun mot connu dans le dictionnaire]\nCLASSIFICATION id=EMPTY decision=PERTINENT diff=0.85\nSUMMARY total_alertes=1 retenues=1 rejetees=0\n"
  },
  {
    "id": "vt3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Évaluateur d’échelle TRL (Technology Readiness Level de 1 à 9)",
    "goal": "Qualifier le niveau de maturité technologique d’une innovation selon la grille standardisée TRL.",
    "brief": "L’échelle TRL (Technology Readiness Level), standardisée par la NASA, le département de la Défense américain et la Commission Européenne (Horizon Europe), quantifie la maturité d’un projet technologique sur 9 niveaux :\n- `TRL 1` : Principes fondamentaux observés et décrits.\n- `TRL 2` : Concept technologique et applications potentielles formulés.\n- `TRL 3` : Preuve de concept expérimentale (PoC critique) validée en laboratoire.\n- `TRL 4` : Composants et maquette validés en laboratoire.\n- `TRL 5` : Composants validés dans un environnement représentatif.\n- `TRL 6` : Prototype de sous-système testé en environnement représentatif.\n- `TRL 7` : Démonstrateur prototype testé en environnement opérationnel.\n- `TRL 8` : Système réel achevé, qualifié et testé.\n- `TRL 9` : Système opérationnel éprouvé en conditions réelles et en production commerciale.\n\nMacro-phases d’industrialisation :\n- TRL 1 à 3 : `RECHERCHE`\n- TRL 4 à 6 : `DEVELOPPEMENT`\n- TRL 7 à 9 : `INDUSTRIALISATION`\n\nEntrée :\n`TECH nom=<N> trl=<1-9> validation=<REUSSIE|EN_COURS|ECHEC>`\n\nRésultat d’analyse attendu :\n- Pour chaque technologie :\n  `TRL_EVAL nom=<N> trl=<X> macro_phase=<PHASE> statut=<VALIDE|NON_VALIDE>`\n- Bilan :\n  `SUMMARY total_techs=<N> maturite_moyenne=<MOY> pretes_production=<P>` (moyenne arrondie à 1 décimale, TRL 9 validé)",
    "starter": "# Grille d'analyse (vt3-c5-e1) — Évaluateur d’échelle TRL (Technology Readiness Level de 1 à 9)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Technologies en phase amont de recherche fondamentale]\n# Données : TECH nom=Fusion_Nucleaire trl=2 validation=REUSSIE\n# Données : TECH nom=Calcul_Quantique_1000q trl=3 validation=REUSSIE\nA_COMPLETER\n\n[Cas 2 — Technologies avec échecs et statuts non validés]\n# Données : TECH nom=Projet_A trl=5 validation=ECHEC\n# Données : TECH nom=Projet_B trl=9 validation=ECHEC\n# Données : TECH nom=Projet_C trl=9 validation=REUSSIE\nA_COMPLETER\n\n[Cas 3 — Un seul produit mûr déployé]\n# Données : TECH nom=PostgreSQL_16 trl=9 validation=REUSSIE\nA_COMPLETER\n",
    "hints": [
      "Lire le niveau numérique de TRL.",
      "Assigner la macro-phase selon l’intervalle [1-3], [4-6] ou [7-9].",
      "Le statut est VALIDE si validation=REUSSIE, sinon NON_VALIDE."
    ],
    "examples": [
      {
        "stdin": "TECH nom=Batterie_Solide trl=4 validation=REUSSIE\nTECH nom=IA_Raisonnement trl=7 validation=EN_COURS\nTECH nom=Serveur_ARM trl=9 validation=REUSSIE",
        "expected": "TRL_EVAL nom=Batterie_Solide trl=4 macro_phase=DEVELOPPEMENT statut=VALIDE\nTRL_EVAL nom=IA_Raisonnement trl=7 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\nTRL_EVAL nom=Serveur_ARM trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=3 maturite_moyenne=6.7 pretes_production=1",
        "note": "Seul Serveur_ARM atteint le TRL 9 avec validation réussie."
      }
    ],
    "tests": [
      {
        "label": "Technologies en phase amont de recherche fondamentale",
        "stdin": "cas:1",
        "expected": "TRL_EVAL nom=Fusion_Nucleaire trl=2 macro_phase=RECHERCHE statut=VALIDE\nTRL_EVAL nom=Calcul_Quantique_1000q trl=3 macro_phase=RECHERCHE statut=VALIDE\nSUMMARY total_techs=2 maturite_moyenne=2.5 pretes_production=0"
      },
      {
        "label": "Technologies avec échecs et statuts non validés",
        "stdin": "cas:2",
        "expected": "TRL_EVAL nom=Projet_A trl=5 macro_phase=DEVELOPPEMENT statut=NON_VALIDE\nTRL_EVAL nom=Projet_B trl=9 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\nTRL_EVAL nom=Projet_C trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=3 maturite_moyenne=7.7 pretes_production=1"
      },
      {
        "label": "Un seul produit mûr déployé",
        "stdin": "cas:3",
        "expected": "TRL_EVAL nom=PostgreSQL_16 trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=1 maturite_moyenne=9.0 pretes_production=1"
      }
    ],
    "solution": "[Exemple]\nTRL_EVAL nom=Batterie_Solide trl=4 macro_phase=DEVELOPPEMENT statut=VALIDE\nTRL_EVAL nom=IA_Raisonnement trl=7 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\nTRL_EVAL nom=Serveur_ARM trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=3 maturite_moyenne=6.7 pretes_production=1\n\n[Cas 1 — Technologies en phase amont de recherche fondamentale]\nTRL_EVAL nom=Fusion_Nucleaire trl=2 macro_phase=RECHERCHE statut=VALIDE\nTRL_EVAL nom=Calcul_Quantique_1000q trl=3 macro_phase=RECHERCHE statut=VALIDE\nSUMMARY total_techs=2 maturite_moyenne=2.5 pretes_production=0\n\n[Cas 2 — Technologies avec échecs et statuts non validés]\nTRL_EVAL nom=Projet_A trl=5 macro_phase=DEVELOPPEMENT statut=NON_VALIDE\nTRL_EVAL nom=Projet_B trl=9 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\nTRL_EVAL nom=Projet_C trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=3 maturite_moyenne=7.7 pretes_production=1\n\n[Cas 3 — Un seul produit mûr déployé]\nTRL_EVAL nom=PostgreSQL_16 trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=1 maturite_moyenne=9.0 pretes_production=1\n"
  },
  {
    "id": "vt3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Positionneur de phase Gartner Hype Cycle et conseil d’investissement",
    "goal": "Positionner une technologie émergente sur la courbe du Hype Cycle de Gartner et émettre une recommandation d’action.",
    "brief": "Le Hype Cycle modélise l’évolution de la perception publique et de l’adoption réelle d’une technologie à travers cinq phases :\n1. `INNOVATION_TRIGGER` (Déclenchement) : buzz < 50 et adoption < 20.\n2. `PEAK_EXPECTATIONS` (Pic des attentes) : buzz >= 70 et adoption < 35.\n3. `TROUGH_DISILLUSIONMENT` (Gouffre des désillusions) : buzz < 50 et 20 <= adoption < 50.\n4. `SLOPE_ENLIGHTENMENT` (Pente de l’éclaircissement) : buzz entre 40 et 75 et 50 <= adoption < 75.\n5. `PLATEAU_PRODUCTIVITY` (Plateau de productivité) : adoption >= 75 (quel que soit le buzz).\n(Si aucune de ces conditions strictes n’est remplie, affecter la phase intermédiaire `SLOPE_ENLIGHTENMENT`).\n\nRecommandations stratégiques associées :\n- `INNOVATION_TRIGGER` -> `VEILLE_ACTIVE`\n- `PEAK_EXPECTATIONS` -> `PRUDENCE_OBSERVATION`\n- `TROUGH_DISILLUSIONMENT` -> `PILOTE_EXPERIMENTATION`\n- `SLOPE_ENLIGHTENMENT` -> `ADOPTION_PROGRESSIVE`\n- `PLATEAU_PRODUCTIVITY` -> `DEPLOIEMENT_STANDARD`\n\nEntrée :\n`HYPE nom=<N> buzz=<0-100> adoption=<0-100>`\n\nRésultat d’analyse attendu :\n- Pour chaque technologie :\n  `HYPE_POSITION nom=<N> phase=<PHASE> recommandation=<REC>`\n- Bilan :\n  `SUMMARY total=<N> repartition=<PHASE1:C,PHASE2:C,...>` (phases triées par ordre alphabétique)",
    "starter": "# Grille d'analyse (vt3-c5-e2) — Positionneur de phase Gartner Hype Cycle et conseil d’investissement\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Technologies en pente d’éclaircissement et plateau]\n# Données : HYPE nom=DevSecOps buzz=60 adoption=65\n# Données : HYPE nom=Conteneurs_Kubernetes buzz=55 adoption=80\nA_COMPLETER\n\n[Cas 2 — Toutes les technologies en déclenchement initial]\n# Données : HYPE nom=Optique_Photonique buzz=30 adoption=10\n# Données : HYPE nom=Spintronique buzz=20 adoption=5\nA_COMPLETER\n\n[Cas 3 — Pic d’attente extrême]\n# Données : HYPE nom=AGI_Hyper_Hype buzz=99 adoption=5\nA_COMPLETER\n",
    "hints": [
      "Évaluer les conditions de phase dans l’ordre : PLATEAU, PEAK, INNOVATION, TROUGH, SLOPE.",
      "Associer chaque phase à son mot-clé de recommandation.",
      "Comptabiliser le nombre d’occurrences de chaque phase pour le bilan final."
    ],
    "examples": [
      {
        "stdin": "HYPE nom=Metaverse buzz=35 adoption=25\nHYPE nom=IA_Generative buzz=85 adoption=20\nHYPE nom=Cloud_Public buzz=50 adoption=85\nHYPE nom=Ordinateur_Biologique buzz=25 adoption=5",
        "expected": "HYPE_POSITION nom=Metaverse phase=TROUGH_DISILLUSIONMENT recommandation=PILOTE_EXPERIMENTATION\nHYPE_POSITION nom=IA_Generative phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\nHYPE_POSITION nom=Cloud_Public phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\nHYPE_POSITION nom=Ordinateur_Biologique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nSUMMARY total=4 repartition=INNOVATION_TRIGGER:1,PEAK_EXPECTATIONS:1,PLATEAU_PRODUCTIVITY:1,TROUGH_DISILLUSIONMENT:1",
        "note": "Metaverse est entré dans le gouffre des désillusions, IA Générative au pic d’attentes."
      }
    ],
    "tests": [
      {
        "label": "Technologies en pente d’éclaircissement et plateau",
        "stdin": "cas:1",
        "expected": "HYPE_POSITION nom=DevSecOps phase=SLOPE_ENLIGHTENMENT recommandation=ADOPTION_PROGRESSIVE\nHYPE_POSITION nom=Conteneurs_Kubernetes phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\nSUMMARY total=2 repartition=PLATEAU_PRODUCTIVITY:1,SLOPE_ENLIGHTENMENT:1"
      },
      {
        "label": "Toutes les technologies en déclenchement initial",
        "stdin": "cas:2",
        "expected": "HYPE_POSITION nom=Optique_Photonique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nHYPE_POSITION nom=Spintronique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nSUMMARY total=2 repartition=INNOVATION_TRIGGER:2"
      },
      {
        "label": "Pic d’attente extrême",
        "stdin": "cas:3",
        "expected": "HYPE_POSITION nom=AGI_Hyper_Hype phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\nSUMMARY total=1 repartition=PEAK_EXPECTATIONS:1"
      }
    ],
    "solution": "[Exemple]\nHYPE_POSITION nom=Metaverse phase=TROUGH_DISILLUSIONMENT recommandation=PILOTE_EXPERIMENTATION\nHYPE_POSITION nom=IA_Generative phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\nHYPE_POSITION nom=Cloud_Public phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\nHYPE_POSITION nom=Ordinateur_Biologique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nSUMMARY total=4 repartition=INNOVATION_TRIGGER:1,PEAK_EXPECTATIONS:1,PLATEAU_PRODUCTIVITY:1,TROUGH_DISILLUSIONMENT:1\n\n[Cas 1 — Technologies en pente d’éclaircissement et plateau]\nHYPE_POSITION nom=DevSecOps phase=SLOPE_ENLIGHTENMENT recommandation=ADOPTION_PROGRESSIVE\nHYPE_POSITION nom=Conteneurs_Kubernetes phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\nSUMMARY total=2 repartition=PLATEAU_PRODUCTIVITY:1,SLOPE_ENLIGHTENMENT:1\n\n[Cas 2 — Toutes les technologies en déclenchement initial]\nHYPE_POSITION nom=Optique_Photonique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nHYPE_POSITION nom=Spintronique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nSUMMARY total=2 repartition=INNOVATION_TRIGGER:2\n\n[Cas 3 — Pic d’attente extrême]\nHYPE_POSITION nom=AGI_Hyper_Hype phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\nSUMMARY total=1 repartition=PEAK_EXPECTATIONS:1\n"
  },
  {
    "id": "vt3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Analyseur d’impact technologique croisé SWOT / PESTEL",
    "goal": "Agréger les facteurs externes PESTEL en opportunités et menaces pour calculer l’indice de résilience stratégique.",
    "brief": "La méthode croisée SWOT / PESTEL structure l’analyse prospective d’une rupture technologique :\n- Catégories PESTEL : `POLITIQUE`, `ECONOMIQUE`, `SOCIETAL`, `TECHNOLOGIQUE`, `ENVIRONNEMENTAL`, `LEGAL`.\n- Nature du facteur : `OPPORTUNITE` (score positif) ou `MENACE` (score négatif).\n- Pondération : entier de 1 à 5.\n\nMétriques calculées :\n- Somme des opportunités : $O = \\sum \\text{poids}_{\\text{OPPORTUNITE}}$\n- Somme des menaces : $M = \\sum \\text{poids}_{\\text{MENACE}}$\n- Score net : $\\text{Net} = O - M$\n- Indice de résilience technologique : $\\text{Résilience} = \\frac{O}{\\max(1, O + M)} \\times 100$ (en %, arrondi à 1 décimale)\n\nPosition stratégique :\n- Si $\\text{Net} \\ge 5$ et $\\text{Résilience} \\ge 60.0\\%$ : `OFFENSIVE`\n- Si $\\text{Net} < 0$ et $\\text{Résilience} < 45.0\\%$ : `DEFENSIVE`\n- Sinon : `ATTENTISTE`\n\nEntrée :\n`FACTEUR id=<ID> cat=<P|E|S|T|ENV|L> type=<OPPORTUNITE|MENACE> poids=<1-5>`\n\nRésultat d’analyse attendu :\n`SWOT_SCORE opp=<O> menaces=<M> net=<NET> resilience=<R>% position=<POS>`\n`SUMMARY facteurs_traites=<N> categorie_dominante=<CAT>` (catégorie cumulant le plus de poids total)",
    "starter": "# Grille d'analyse (vt3-c5-e3) — Analyseur d’impact technologique croisé SWOT / PESTEL\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Position défensive avec fortes menaces réglementaires]\n# Données : FACTEUR id=1 cat=L type=MENACE poids=5\n# Données : FACTEUR id=2 cat=L type=MENACE poids=4\n# Données : FACTEUR id=3 cat=P type=MENACE poids=3\n# Données : FACTEUR id=4 cat=T type=OPPORTUNITE poids=3\nA_COMPLETER\n\n[Cas 2 — Position attentiste équilibrée]\n# Données : FACTEUR id=A cat=S type=OPPORTUNITE poids=3\n# Données : FACTEUR id=B cat=ENV type=MENACE poids=3\nA_COMPLETER\n\n[Cas 3 — Un seul facteur d opportunité]\n# Données : FACTEUR id=Solo cat=T type=OPPORTUNITE poids=4\nA_COMPLETER\n",
    "hints": [
      "Cumuler séparément les poids des opportunités et des menaces.",
      "Suivre les poids cumulés par catégorie PESTEL pour identifier la dominante.",
      "Calculer la résilience et déterminer la posture stratégique."
    ],
    "examples": [
      {
        "stdin": "FACTEUR id=F1 cat=T type=OPPORTUNITE poids=5\nFACTEUR id=F2 cat=E type=OPPORTUNITE poids=4\nFACTEUR id=F3 cat=L type=MENACE poids=3\nFACTEUR id=F4 cat=T type=MENACE poids=1",
        "expected": "SWOT_SCORE opp=9 menaces=4 net=5 resilience=69.2% position=OFFENSIVE\nSUMMARY facteurs_traites=4 categorie_dominante=T",
        "note": "Opp=9, Menaces=4, Net=5, Résilience=9/13=69.2% -> OFFENSIVE. Catégorie T totalise 6 points."
      }
    ],
    "tests": [
      {
        "label": "Position défensive avec fortes menaces réglementaires",
        "stdin": "cas:1",
        "expected": "SWOT_SCORE opp=3 menaces=12 net=-9 resilience=20.0% position=DEFENSIVE\nSUMMARY facteurs_traites=4 categorie_dominante=L"
      },
      {
        "label": "Position attentiste équilibrée",
        "stdin": "cas:2",
        "expected": "SWOT_SCORE opp=3 menaces=3 net=0 resilience=50.0% position=ATTENTISTE\nSUMMARY facteurs_traites=2 categorie_dominante=ENV"
      },
      {
        "label": "Un seul facteur d opportunité",
        "stdin": "cas:3",
        "expected": "SWOT_SCORE opp=4 menaces=0 net=4 resilience=100.0% position=ATTENTISTE\nSUMMARY facteurs_traites=1 categorie_dominante=T"
      }
    ],
    "solution": "[Exemple]\nSWOT_SCORE opp=9 menaces=4 net=5 resilience=69.2% position=OFFENSIVE\nSUMMARY facteurs_traites=4 categorie_dominante=T\n\n[Cas 1 — Position défensive avec fortes menaces réglementaires]\nSWOT_SCORE opp=3 menaces=12 net=-9 resilience=20.0% position=DEFENSIVE\nSUMMARY facteurs_traites=4 categorie_dominante=L\n\n[Cas 2 — Position attentiste équilibrée]\nSWOT_SCORE opp=3 menaces=3 net=0 resilience=50.0% position=ATTENTISTE\nSUMMARY facteurs_traites=2 categorie_dominante=ENV\n\n[Cas 3 — Un seul facteur d opportunité]\nSWOT_SCORE opp=4 menaces=0 net=4 resilience=100.0% position=ATTENTISTE\nSUMMARY facteurs_traites=1 categorie_dominante=T\n"
  },
  {
    "id": "vt3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Générateur de bulletin d’alerte de veille synthétique (Curated Digest)",
    "goal": "Mettre en forme et prioriser un flux d’articles pour produire un bulletin de veille exécutif hiérarchisé.",
    "brief": "Dans la restitution de veille, l’attention des décideurs impose une hiérarchisation stricte par criticité de l’information :\n- Ordre de priorité : `CRITIQUE` (priorité 1), `MOYENNE` (priorité 2), puis `FAIBLE` (priorité 3).\n- En cas d’égalité de criticité, ordonner les articles par identifiant `id` alphabétique croissant.\n\nFormat de chaque ligne du bulletin :\n`BULLETIN_ITEM [<CRITICITE>] (<SOURCE>) <TITRE> (id: <ID>)`\n\nEntrée :\n`ARTICLE id=<ID> source=<SRC> criticite=<FAIBLE|MOYENNE|CRITIQUE> title=<TITRE>`\n\nRésultat d’analyse attendu :\n- Lignes ordonnées du bulletin :\n  `BULLETIN_ITEM [<CRITICITE>] (<SRC>) <TITRE> (id: <ID>)`\n- Bilan :\n  `SUMMARY total=<N> critiques=<C> moyennes=<M> faibles=<F>`",
    "starter": "# Grille d'analyse (vt3-c6-e1) — Générateur de bulletin d’alerte de veille synthétique (Curated Digest)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Multiples articles critiques avec départage par identifiant]\n# Données : ARTICLE id=Z1 source=NVD criticite=CRITIQUE title=Vulnérabilité noyau Linux\n# Données : ARTICLE id=A9 source=ANSSI criticite=CRITIQUE title=Campagne de rançongiciel active\nA_COMPLETER\n\n[Cas 2 — Tous les articles de niveau faible]\n# Données : ARTICLE id=1 source=DevBlog criticite=FAIBLE title=Nouvelle syntaxe CSS\n# Données : ARTICLE id=2 source=Medium criticite=FAIBLE title=Astuces productivité VS Code\nA_COMPLETER\n\n[Cas 3 — Un seul article de criticité moyenne]\n# Données : ARTICLE id=Solo source=Reuters criticite=MOYENNE title=Rachat d un fournisseur de puces\nA_COMPLETER\n",
    "hints": [
      "Attribuer un poids numérique à chaque niveau de criticité (ex: CRITIQUE=1, MOYENNE=2, FAIBLE=3).",
      "Trier la liste avec la clé (poids_criticite, id).",
      "Compter le nombre d’articles par palier pour le bilan final."
    ],
    "examples": [
      {
        "stdin": "ARTICLE id=A1 source=CERT-FR criticite=CRITIQUE title=Faille d exécution de code dans OpenSSH\nARTICLE id=A2 source=TechCrunch criticite=FAIBLE title=Nouveau design pour l application Slack\nARTICLE id=A3 source=CloudBlog criticite=MOYENNE title=Augmentation des prix de l infrastructure AWS",
        "expected": "BULLETIN_ITEM [CRITIQUE] (CERT-FR) Faille d exécution de code dans OpenSSH (id: A1)\nBULLETIN_ITEM [MOYENNE] (CloudBlog) Augmentation des prix de l infrastructure AWS (id: A3)\nBULLETIN_ITEM [FAIBLE] (TechCrunch) Nouveau design pour l application Slack (id: A2)\nSUMMARY total=3 critiques=1 moyennes=1 faibles=1",
        "note": "L’article CRITIQUE est affiché en tête, suivi de MOYENNE puis FAIBLE."
      }
    ],
    "tests": [
      {
        "label": "Multiples articles critiques avec départage par identifiant",
        "stdin": "cas:1",
        "expected": "BULLETIN_ITEM [CRITIQUE] (ANSSI) Campagne de rançongiciel active (id: A9)\nBULLETIN_ITEM [CRITIQUE] (NVD) Vulnérabilité noyau Linux (id: Z1)\nSUMMARY total=2 critiques=2 moyennes=0 faibles=0"
      },
      {
        "label": "Tous les articles de niveau faible",
        "stdin": "cas:2",
        "expected": "BULLETIN_ITEM [FAIBLE] (DevBlog) Nouvelle syntaxe CSS (id: 1)\nBULLETIN_ITEM [FAIBLE] (Medium) Astuces productivité VS Code (id: 2)\nSUMMARY total=2 critiques=0 moyennes=0 faibles=2"
      },
      {
        "label": "Un seul article de criticité moyenne",
        "stdin": "cas:3",
        "expected": "BULLETIN_ITEM [MOYENNE] (Reuters) Rachat d un fournisseur de puces (id: Solo)\nSUMMARY total=1 critiques=0 moyennes=1 faibles=0"
      }
    ],
    "solution": "[Exemple]\nBULLETIN_ITEM [CRITIQUE] (CERT-FR) Faille d exécution de code dans OpenSSH (id: A1)\nBULLETIN_ITEM [MOYENNE] (CloudBlog) Augmentation des prix de l infrastructure AWS (id: A3)\nBULLETIN_ITEM [FAIBLE] (TechCrunch) Nouveau design pour l application Slack (id: A2)\nSUMMARY total=3 critiques=1 moyennes=1 faibles=1\n\n[Cas 1 — Multiples articles critiques avec départage par identifiant]\nBULLETIN_ITEM [CRITIQUE] (ANSSI) Campagne de rançongiciel active (id: A9)\nBULLETIN_ITEM [CRITIQUE] (NVD) Vulnérabilité noyau Linux (id: Z1)\nSUMMARY total=2 critiques=2 moyennes=0 faibles=0\n\n[Cas 2 — Tous les articles de niveau faible]\nBULLETIN_ITEM [FAIBLE] (DevBlog) Nouvelle syntaxe CSS (id: 1)\nBULLETIN_ITEM [FAIBLE] (Medium) Astuces productivité VS Code (id: 2)\nSUMMARY total=2 critiques=0 moyennes=0 faibles=2\n\n[Cas 3 — Un seul article de criticité moyenne]\nBULLETIN_ITEM [MOYENNE] (Reuters) Rachat d un fournisseur de puces (id: Solo)\nSUMMARY total=1 critiques=0 moyennes=1 faibles=0\n"
  },
  {
    "id": "vt3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Calculateur de radar technologique (Tech Radar ThoughtWorks)",
    "goal": "Classer les technologies selon les quatre quadrants et les quatre anneaux d’adoption du Tech Radar.",
    "brief": "Popularisé par Martin Fowler et ThoughtWorks, le **Tech Radar** projette les technologies émergentes sur quatre quadrants cartographiques et quatre anneaux d’action concentriques :\n- Quadrants : `TECHNIQUES`, `OUTILS`, `PLATEFORMES`, `LANGAGES`.\n- Anneaux d’action (avec scores de maturité associés) :\n  - `ADOPT` (score: 100) : technologie éprouvée, standard d’entreprise fortement recommandé.\n  - `TRIAL` (score: 75) : technologie prête pour des projets pilotes réels avec risques maîtrisés.\n  - `ASSESS` (score: 50) : technologie prometteuse à évaluer et prototyper en laboratoire.\n  - `HOLD` (score: 25) : technologie obsolète, à éviter ou en cours de décommissionnement.\n\nCalculs :\n- Score de chaque nœud = score associé à son anneau.\n- Calculer le score moyen global de toutes les technologies (arrondi à 1 décimale).\n- Identifier le quadrant cumulant le score total le plus élevé.\n\nEntrée :\n`TECH nom=<N> quadrant=<TECHNIQUES|OUTILS|PLATEFORMES|LANGAGES> anneau=<ADOPT|TRIAL|ASSESS|HOLD>`\n\nRésultat d’analyse attendu :\n- Pour chaque technologie :\n  `RADAR_NODE nom=<N> quad=<Q> ring=<R> score=<SCORE>`\n- Bilan :\n  `SUMMARY total_nodes=<N> top_quadrant=<Q> avg_score=<MOY>`",
    "starter": "# Grille d'analyse (vt3-c6-e2) — Calculateur de radar technologique (Tech Radar ThoughtWorks)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Technologies multiples avec égalité de score sur un quadrant]\n# Données : TECH nom=Docker quadrant=OUTILS anneau=ADOPT\n# Données : TECH nom=Terraform quadrant=OUTILS anneau=ADOPT\n# Données : TECH nom=Go quadrant=LANGAGES anneau=ADOPT\nA_COMPLETER\n\n[Cas 2 — Toutes les technologies en évaluation (ASSESS)]\n# Données : TECH nom=Quantum quadrant=TECHNIQUES anneau=ASSESS\n# Données : TECH nom=Zig quadrant=LANGAGES anneau=ASSESS\nA_COMPLETER\n\n[Cas 3 — Un seul nœud]\n# Données : TECH nom=Kafka quadrant=PLATEFORMES anneau=TRIAL\nA_COMPLETER\n",
    "hints": [
      "Associer chaque anneau à sa valeur numérique (ADOPT:100, TRIAL:75, ASSESS:50, HOLD:25).",
      "Cumuler les scores par quadrant pour déterminer le top quadrant.",
      "Calculer la moyenne arithmétique globale."
    ],
    "examples": [
      {
        "stdin": "TECH nom=Kubernetes quadrant=PLATEFORMES anneau=ADOPT\nTECH nom=Rust quadrant=LANGAGES anneau=TRIAL\nTECH nom=eBPF quadrant=TECHNIQUES anneau=ASSESS\nTECH nom=SVN quadrant=OUTILS anneau=HOLD",
        "expected": "RADAR_NODE nom=Kubernetes quad=PLATEFORMES ring=ADOPT score=100\nRADAR_NODE nom=Rust quad=LANGAGES ring=TRIAL score=75\nRADAR_NODE nom=eBPF quad=TECHNIQUES ring=ASSESS score=50\nRADAR_NODE nom=SVN quad=OUTILS ring=HOLD score=25\nSUMMARY total_nodes=4 top_quadrant=PLATEFORMES avg_score=62.5",
        "note": "Le quadrant PLATEFORMES cumule 100 points et devance les autres."
      }
    ],
    "tests": [
      {
        "label": "Technologies multiples avec égalité de score sur un quadrant",
        "stdin": "cas:1",
        "expected": "RADAR_NODE nom=Docker quad=OUTILS ring=ADOPT score=100\nRADAR_NODE nom=Terraform quad=OUTILS ring=ADOPT score=100\nRADAR_NODE nom=Go quad=LANGAGES ring=ADOPT score=100\nSUMMARY total_nodes=3 top_quadrant=OUTILS avg_score=100.0"
      },
      {
        "label": "Toutes les technologies en évaluation (ASSESS)",
        "stdin": "cas:2",
        "expected": "RADAR_NODE nom=Quantum quad=TECHNIQUES ring=ASSESS score=50\nRADAR_NODE nom=Zig quad=LANGAGES ring=ASSESS score=50\nSUMMARY total_nodes=2 top_quadrant=LANGAGES avg_score=50.0"
      },
      {
        "label": "Un seul nœud",
        "stdin": "cas:3",
        "expected": "RADAR_NODE nom=Kafka quad=PLATEFORMES ring=TRIAL score=75\nSUMMARY total_nodes=1 top_quadrant=PLATEFORMES avg_score=75.0"
      }
    ],
    "solution": "[Exemple]\nRADAR_NODE nom=Kubernetes quad=PLATEFORMES ring=ADOPT score=100\nRADAR_NODE nom=Rust quad=LANGAGES ring=TRIAL score=75\nRADAR_NODE nom=eBPF quad=TECHNIQUES ring=ASSESS score=50\nRADAR_NODE nom=SVN quad=OUTILS ring=HOLD score=25\nSUMMARY total_nodes=4 top_quadrant=PLATEFORMES avg_score=62.5\n\n[Cas 1 — Technologies multiples avec égalité de score sur un quadrant]\nRADAR_NODE nom=Docker quad=OUTILS ring=ADOPT score=100\nRADAR_NODE nom=Terraform quad=OUTILS ring=ADOPT score=100\nRADAR_NODE nom=Go quad=LANGAGES ring=ADOPT score=100\nSUMMARY total_nodes=3 top_quadrant=OUTILS avg_score=100.0\n\n[Cas 2 — Toutes les technologies en évaluation (ASSESS)]\nRADAR_NODE nom=Quantum quad=TECHNIQUES ring=ASSESS score=50\nRADAR_NODE nom=Zig quad=LANGAGES ring=ASSESS score=50\nSUMMARY total_nodes=2 top_quadrant=LANGAGES avg_score=50.0\n\n[Cas 3 — Un seul nœud]\nRADAR_NODE nom=Kafka quad=PLATEFORMES ring=TRIAL score=75\nSUMMARY total_nodes=1 top_quadrant=PLATEFORMES avg_score=75.0\n"
  },
  {
    "id": "vt3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Simulateur de gouvernance d’équipe et workflow Kanban de veille",
    "goal": "Mesurer la performance d’une cellule de veille en calculant le temps de cycle (Lead Time) et le taux d’approbation éditoriale.",
    "brief": "Dans une cellule de veille collaborative, les articles cheminent à travers un workflow éditorial en quatre étapes horodatées (en heures) :\n- `COLLECTE` ($T_1$) : repérage initial par le veilleur.\n- `EVALUATION` ($T_2$) : qualification de fiabilité et scoring.\n- `VALIDATION` ($T_3$) : revue par le Lead Analyst.\n- `DIFFUSION` ($T_4$) : publication dans le livret ou dashboard.\n\nRègles de calcul du cycle de traitement (Lead Time) :\n- Si l’article est `DIFFUSE` : $\\text{cycle} = T_4 - T_1$ (heures).\n- Si l’article est `REJETE` : $\\text{cycle} = T_2 - T_1$ (heures, arrêt au stade évaluation).\n\nBilan d’équipe :\n- Taux d’approbation : $\\text{taux} = (\\frac{\\text{diffusés}}{\\text{total soumissions}}) \\times 100$ (en %, arrondi à 1 décimale).\n- Temps de cycle moyen des articles diffusés : $\\text{moyenne} = \\frac{\\sum \\text{cycles diffusés}}{\\text{diffusés}}$ (arrondi à 1 décimale).\n\nEntrée :\n`KANBAN_CARD id=<ID> veilleur=<V> t1=<T1> t2=<T2> t3=<T3> t4=<T4> decision=<DIFFUSE|REJETE>`\n\nRésultat d’analyse attendu :\n- Pour chaque carte :\n  `CARD_RESULT id=<ID> veilleur=<V> statut=<DIFFUSE|REJETE> cycle_time=<T>h`\n- Bilan :\n  `SUMMARY total_soumissions=<N> diffuses=<D> taux_approbation=<T>% avg_cycle_time=<MOY>h`",
    "starter": "# Grille d'analyse (vt3-c6-e3) — Simulateur de gouvernance d’équipe et workflow Kanban de veille\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les soumissions validées et diffusées]\n# Données : KANBAN_CARD id=1 veilleur=Claire t1=0 t2=1 t3=2 t4=4 decision=DIFFUSE\n# Données : KANBAN_CARD id=2 veilleur=David t1=5 t2=6 t3=7 t4=11 decision=DIFFUSE\nA_COMPLETER\n\n[Cas 2 — Toutes les soumissions rejetées au premier stade]\n# Données : KANBAN_CARD id=R1 veilleur=Emma t1=0 t2=1 t3=0 t4=0 decision=REJETE\n# Données : KANBAN_CARD id=R2 veilleur=Emma t1=2 t2=4 t3=0 t4=0 decision=REJETE\nA_COMPLETER\n\n[Cas 3 — Une seule soumission diffusée avec cycle long]\n# Données : KANBAN_CARD id=Solo veilleur=Hugo t1=0 t2=10 t3=20 t4=30 decision=DIFFUSE\nA_COMPLETER\n",
    "hints": [
      "Convertir les temps T1, T2, T3, T4 en entiers ou flottants.",
      "Calculer cycle = T4 - T1 si DIFFUSE, sinon T2 - T1 si REJETE.",
      "Suivre la somme des temps de cycle des seuls articles diffusés pour calculer avg_cycle_time."
    ],
    "examples": [
      {
        "stdin": "KANBAN_CARD id=C1 veilleur=Alice t1=0 t2=2 t3=5 t4=8 decision=DIFFUSE\nKANBAN_CARD id=C2 veilleur=Bob t1=1 t2=3 t3=0 t4=0 decision=REJETE\nKANBAN_CARD id=C3 veilleur=Alice t1=10 t2=12 t3=14 t4=16 decision=DIFFUSE",
        "expected": "CARD_RESULT id=C1 veilleur=Alice statut=DIFFUSE cycle_time=8h\nCARD_RESULT id=C2 veilleur=Bob statut=REJETE cycle_time=2h\nCARD_RESULT id=C3 veilleur=Alice statut=DIFFUSE cycle_time=6h\nSUMMARY total_soumissions=3 diffuses=2 taux_approbation=66.7% avg_cycle_time=7.0h",
        "note": "C1 met 8h, C2 est rejeté en 2h, C3 met 6h. Moyenne des diffusés = (8 + 6) / 2 = 7.0h."
      }
    ],
    "tests": [
      {
        "label": "Toutes les soumissions validées et diffusées",
        "stdin": "cas:1",
        "expected": "CARD_RESULT id=1 veilleur=Claire statut=DIFFUSE cycle_time=4h\nCARD_RESULT id=2 veilleur=David statut=DIFFUSE cycle_time=6h\nSUMMARY total_soumissions=2 diffuses=2 taux_approbation=100.0% avg_cycle_time=5.0h"
      },
      {
        "label": "Toutes les soumissions rejetées au premier stade",
        "stdin": "cas:2",
        "expected": "CARD_RESULT id=R1 veilleur=Emma statut=REJETE cycle_time=1h\nCARD_RESULT id=R2 veilleur=Emma statut=REJETE cycle_time=2h\nSUMMARY total_soumissions=2 diffuses=0 taux_approbation=0.0% avg_cycle_time=0.0h"
      },
      {
        "label": "Une seule soumission diffusée avec cycle long",
        "stdin": "cas:3",
        "expected": "CARD_RESULT id=Solo veilleur=Hugo statut=DIFFUSE cycle_time=30h\nSUMMARY total_soumissions=1 diffuses=1 taux_approbation=100.0% avg_cycle_time=30.0h"
      }
    ],
    "solution": "[Exemple]\nCARD_RESULT id=C1 veilleur=Alice statut=DIFFUSE cycle_time=8h\nCARD_RESULT id=C2 veilleur=Bob statut=REJETE cycle_time=2h\nCARD_RESULT id=C3 veilleur=Alice statut=DIFFUSE cycle_time=6h\nSUMMARY total_soumissions=3 diffuses=2 taux_approbation=66.7% avg_cycle_time=7.0h\n\n[Cas 1 — Toutes les soumissions validées et diffusées]\nCARD_RESULT id=1 veilleur=Claire statut=DIFFUSE cycle_time=4h\nCARD_RESULT id=2 veilleur=David statut=DIFFUSE cycle_time=6h\nSUMMARY total_soumissions=2 diffuses=2 taux_approbation=100.0% avg_cycle_time=5.0h\n\n[Cas 2 — Toutes les soumissions rejetées au premier stade]\nCARD_RESULT id=R1 veilleur=Emma statut=REJETE cycle_time=1h\nCARD_RESULT id=R2 veilleur=Emma statut=REJETE cycle_time=2h\nSUMMARY total_soumissions=2 diffuses=0 taux_approbation=0.0% avg_cycle_time=0.0h\n\n[Cas 3 — Une seule soumission diffusée avec cycle long]\nCARD_RESULT id=Solo veilleur=Hugo statut=DIFFUSE cycle_time=30h\nSUMMARY total_soumissions=1 diffuses=1 taux_approbation=100.0% avg_cycle_time=30.0h\n"
  }
];
