/**
 * chapitre2.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "vt3-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Générateur et normalisateur de requêtes booléennes avancées",
    goal: "Construire une requête booléenne de recherche d’ingénierie conforme aux standards de documentation et de dorking.",
    brief: "Dans la phase de ciblage et de sourcing documentaire, la recherche d’information emploie des équations booléennes strictes et des opérateurs de filtrage :\n- Terme principal entre guillemets stricts : `\"<terme>\"`\n- Termes obligatoires inclus combinés en `OR` : `(<inc1> OR <inc2> ...)` (termes triés alphabétiquement)\n- Termes exclus précédés du signe moins `-` : `-<exc1> -<exc2> ...` (termes triés alphabétiquement)\n- Filtre de domaine : `site:<domaine>`\n- Filtre de format de fichier : `filetype:<extension>`\n\nEntrée :\n`QUERY terme=<T> include=<I1,I2,...> exclude=<E1,E2,...> site=<DOM> filetype=<EXT>`\n(les attributs `include`, `exclude`, `site` ou `filetype` peuvent être omis ou vides)\n\nRésultat d’analyse attendu :\n`NORMALIZED_QUERY raw=<REQUÊTE>`",
    starter: "# Grille d'analyse (vt3-c2-e1) — Générateur et normalisateur de requêtes booléennes avancées\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Requête complète avec tous les opérateurs]\n# Données : QUERY terme=zero trust include=iam,microsegmentation exclude=vpn,legacy site=nist.gov filetype=pdf\nA_COMPLETER\n\n[Cas 2 — Requête simple sans exclusions ni formats]\n# Données : QUERY terme=ebpf include=xdp,kernel site=kernel.org\nA_COMPLETER\n\n[Cas 3 — Requête avec terme seul et exclusion]\n# Données : QUERY terme=rag exclude=langchain,llamaindex\nA_COMPLETER\n",
    hints: [
          "Extraire les paramètres via un dictionnaire clé/valeur.",
          "Trier les termes include et exclude par ordre alphabétique.",
          "Assembler les composants séparés par un espace uniquement s’ils sont présents et non vides."
    ],
    examples: [
          {
                "stdin": "QUERY terme=quantum computing include=qubit,teleportation exclude=crypto,gaming site=arxiv.org filetype=pdf",
                "expected": "NORMALIZED_QUERY raw=\"quantum computing\" (qubit OR teleportation) -crypto -gaming site:arxiv.org filetype:pdf",
                "note": "La requête contient le terme exact, les alternatives entre parenthèses, les exclusions et les filtres techniques."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nNORMALIZED_QUERY raw=\"quantum computing\" (qubit OR teleportation) -crypto -gaming site:arxiv.org filetype:pdf\n\n[Cas 1 — Requête complète avec tous les opérateurs]\nNORMALIZED_QUERY raw=\"zero trust\" (iam OR microsegmentation) -legacy -vpn site:nist.gov filetype:pdf\n\n[Cas 2 — Requête simple sans exclusions ni formats]\nNORMALIZED_QUERY raw=\"ebpf\" (kernel OR xdp) site:kernel.org\n\n[Cas 3 — Requête avec terme seul et exclusion]\nNORMALIZED_QUERY raw=\"rag\" -langchain -llamaindex\n"
  },
  {
    id: "vt3-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Auditeur de fiabilité des sources d’information (Score pondéré)",
    goal: "Évaluer la crédibilité d’une source d’information sur cinq axes méthodologiques pondérés.",
    brief: "Dans le processus de veille, chaque source est évaluée sur une échelle de 1 à 5 sur cinq critères avec pondération relative :\n- `autorite` (compétence reconnue de l’auteur ou de l’organisme) : coefficient 30%\n- `neutralite` (absence de conflit d’intérêts ou de biais publicitaire) : coefficient 25%\n- `tracabilite` (présence de liens vers les sources primaires, brevets, code) : coefficient 20%\n- `croisement` (validation des faits par d’autres sources indépendantes) : coefficient 15%\n- `fraicheur` (date de révision et actualité du contenu) : coefficient 10%\n\nCalcul du score global sur 100 :\n$$\\text{Score} = (0.30 \\times A + 0.25 \\times N + 0.20 \\times T + 0.15 \\times C + 0.10 \\times F) \\times 20$$\n(le score est arrondi à 1 décimale)\n\nPalier de validation éditoriale :\n- $\\text{Score} \\ge 80.0$ : `QUALIFIEE`\n- $65.0 \\le \\text{Score} < 80.0$ : `SECONDAIRE`\n- $50.0 \\le \\text{Score} < 65.0$ : `SUSPECTE`\n- $\\text{Score} < 50.0$ : `REJETEE`\n\nEntrée :\n`SOURCE nom=<N> autorite=<A> neutralite=<N> tracabilite=<T> croisement=<C> fraicheur=<F>`\n\nRésultat d’analyse attendu :\n- Pour chaque source :\n  `AUDIT nom=<N> score=<SCORE> palier=<PALIER>`\n- Bilan :\n  `SUMMARY total_sources=<N> qualifiees=<Q> rejetees=<R>`",
    starter: "# Grille d'analyse (vt3-c2-e2) — Auditeur de fiabilité des sources d’information (Score pondéré)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Source avec score frontière suspecte]\n# Données : SOURCE nom=Site_Marketing autorite=2 neutralite=2 tracabilite=3 croisement=3 fraicheur=4\n# Données : SOURCE nom=Arxiv_Preprint autorite=4 neutralite=5 tracabilite=4 croisement=3 fraicheur=5\nA_COMPLETER\n\n[Cas 2 — Toutes les sources qualifiées]\n# Données : SOURCE nom=RFC_Editor autorite=5 neutralite=5 tracabilite=5 croisement=5 fraicheur=5\n# Données : SOURCE nom=ANSSI_Bulletins autorite=5 neutralite=5 tracabilite=4 croisement=4 fraicheur=5\nA_COMPLETER\n\n[Cas 3 — Source rejetée avec note minimale]\n# Données : SOURCE nom=Rumeur_Twitter autorite=1 neutralite=1 tracabilite=1 croisement=1 fraicheur=5\nA_COMPLETER\n",
    hints: [
          "Calculer la somme pondérée des notes de 1 à 5.",
          "Multiplier par 20 pour ramener sur une échelle de 0 à 100.",
          "Appliquer les seuils stricts pour déterminer le palier."
    ],
    examples: [
          {
                "stdin": "SOURCE nom=ACM_Transactions autorite=5 neutralite=5 tracabilite=5 croisement=4 fraicheur=4\nSOURCE nom=Blog_Tech_Indep autorite=3 neutralite=4 tracabilite=3 croisement=3 fraicheur=5\nSOURCE nom=Forum_Non_Verifie autorite=1 neutralite=2 tracabilite=1 croisement=1 fraicheur=4",
                "expected": "AUDIT nom=ACM_Transactions score=95.0 palier=QUALIFIEE\nAUDIT nom=Blog_Tech_Indep score=69.0 palier=SECONDAIRE\nAUDIT nom=Forum_Non_Verifie score=31.0 palier=REJETEE\nSUMMARY total_sources=3 qualifiees=1 rejetees=1",
                "note": "ACM_Transactions atteint 95.0/100 (QUALIFIEE), Forum_Non_Verifie 31.0/100 (REJETEE)."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nAUDIT nom=ACM_Transactions score=95.0 palier=QUALIFIEE\nAUDIT nom=Blog_Tech_Indep score=69.0 palier=SECONDAIRE\nAUDIT nom=Forum_Non_Verifie score=31.0 palier=REJETEE\nSUMMARY total_sources=3 qualifiees=1 rejetees=1\n\n[Cas 1 — Source avec score frontière suspecte]\nAUDIT nom=Site_Marketing score=51.0 palier=SUSPECTE\nAUDIT nom=Arxiv_Preprint score=84.0 palier=QUALIFIEE\nSUMMARY total_sources=2 qualifiees=1 rejetees=0\n\n[Cas 2 — Toutes les sources qualifiées]\nAUDIT nom=RFC_Editor score=100.0 palier=QUALIFIEE\nAUDIT nom=ANSSI_Bulletins score=93.0 palier=QUALIFIEE\nSUMMARY total_sources=2 qualifiees=2 rejetees=0\n\n[Cas 3 — Source rejetée avec note minimale]\nAUDIT nom=Rumeur_Twitter score=28.0 palier=REJETEE\nSUMMARY total_sources=1 qualifiees=0 rejetees=1\n"
  },
  {
    id: "vt3-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Détecteur de signaux faibles par accélération d’émergence lexicale",
    goal: "Analyser une série temporelle d’occurrences pour distinguer les signaux faibles émergents du bruit de fond et des tendances lourdes.",
    brief: "Dans la théorie du renseignement technologique (Igor Ansoff), un **signal faible** est caractérisé par une faible occurrence globale mais une forte dérivée d’accélération (taux d’augmentation exponentiel) entre périodes consécutives.\n\nPour une série de 4 trimestres $c_1, c_2, c_3, c_4$ :\n- Total d’occurrences : $S = c_1 + c_2 + c_3 + c_4$\n- Taux de croissance trimestriel récent : $\\text{croissance} = \\frac{c_4 - c_3}{\\max(1, c_3)} \\times 100$ (en %)\n\nTypologie du signal :\n1. Si $S < 20$ et $c_4 \\ge 2 \\times c_3$ et $c_4 \\ge 4$ : `SIGNAL_FAIBLE` (faible volume, doublement brusque au dernier trimestre)\n2. Si $S \\ge 50$ et $c_4 > c_3$ : `TENDANCE_LOURDE` (fort volume continu et expansion)\n3. Si $S \\ge 50$ et $c_4 \\le c_3$ : `TENDANCE_SATUREE` (fort volume mais stagnation/recul)\n4. Si $c_4 \\le 2$ et $S < 10$ : `BRUIT_DE_FOND` (anecdote isolée non significative)\n5. Dans les autres cas : `EMERGENCE_MODEREE`\n\nEntrée :\n`SERIE mot=<M> counts=<c1,c2,c3,c4>`\n\nRésultat d’analyse attendu :\n- Pour chaque terme :\n  `SIGNAL_STATUS mot=<M> total=<S> croissance=<C>% statut=<STATUT>`\n- Bilan :\n  `SUMMARY total_termes=<N> signaux_faibles=<K> tendances_lourdes=<T>`",
    starter: "# Grille d'analyse (vt3-c2-e3) — Détecteur de signaux faibles par accélération d’émergence lexicale\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Signal faible net et émergence modérée]\n# Données : SERIE mot=Neuromorphic counts=1,1,2,5\n# Données : SERIE mot=WebAssembly counts=8,10,12,15\nA_COMPLETER\n\n[Cas 2 — Tendances lourdes et saturées avec fort volume]\n# Données : SERIE mot=GenerativeAI counts=15,20,30,45\n# Données : SERIE mot=Blockchain counts=40,30,20,15\nA_COMPLETER\n\n[Cas 3 — Bruit de fond pur]\n# Données : SERIE mot=OldFramework counts=1,1,0,1\nA_COMPLETER\n",
    hints: [
          "Découper la chaîne des comptes par virgule pour obtenir les entiers c1, c2, c3, c4.",
          "Appliquer les règles dans l’ordre strict de priorité 1 à 5.",
          "Formater la croissance avec un entier ou un arrondi clair : f\"{croissance:.1f}\"."
    ],
    examples: [
          {
                "stdin": "SERIE mot=PostQuantum counts=0,1,2,6\nSERIE mot=Kubernetes counts=20,25,30,35\nSERIE mot=Metaverse counts=30,25,20,15\nSERIE mot=LangageX counts=1,0,1,1",
                "expected": "SIGNAL_STATUS mot=PostQuantum total=9 croissance=200.0% statut=SIGNAL_FAIBLE\nSIGNAL_STATUS mot=Kubernetes total=110 croissance=16.7% statut=TENDANCE_LOURDE\nSIGNAL_STATUS mot=Metaverse total=90 croissance=-25.0% statut=TENDANCE_SATUREE\nSIGNAL_STATUS mot=LangageX total=3 croissance=0.0% statut=BRUIT_DE_FOND\nSUMMARY total_termes=4 signaux_faibles=1 tendances_lourdes=1",
                "note": "PostQuantum totalise 9 mentions avec bond de 2 à 6 (+200%), c’est un signal faible typique."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nSIGNAL_STATUS mot=PostQuantum total=9 croissance=200.0% statut=SIGNAL_FAIBLE\nSIGNAL_STATUS mot=Kubernetes total=110 croissance=16.7% statut=TENDANCE_LOURDE\nSIGNAL_STATUS mot=Metaverse total=90 croissance=-25.0% statut=TENDANCE_SATUREE\nSIGNAL_STATUS mot=LangageX total=3 croissance=0.0% statut=BRUIT_DE_FOND\nSUMMARY total_termes=4 signaux_faibles=1 tendances_lourdes=1\n\n[Cas 1 — Signal faible net et émergence modérée]\nSIGNAL_STATUS mot=Neuromorphic total=9 croissance=150.0% statut=SIGNAL_FAIBLE\nSIGNAL_STATUS mot=WebAssembly total=45 croissance=25.0% statut=EMERGENCE_MODEREE\nSUMMARY total_termes=2 signaux_faibles=1 tendances_lourdes=0\n\n[Cas 2 — Tendances lourdes et saturées avec fort volume]\nSIGNAL_STATUS mot=GenerativeAI total=110 croissance=50.0% statut=TENDANCE_LOURDE\nSIGNAL_STATUS mot=Blockchain total=105 croissance=-25.0% statut=TENDANCE_SATUREE\nSUMMARY total_termes=2 signaux_faibles=0 tendances_lourdes=1\n\n[Cas 3 — Bruit de fond pur]\nSIGNAL_STATUS mot=OldFramework total=3 croissance=100.0% statut=BRUIT_DE_FOND\nSUMMARY total_termes=1 signaux_faibles=0 tendances_lourdes=0\n"
  }
];
