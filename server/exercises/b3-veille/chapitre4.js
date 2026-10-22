/**
 * chapitre4.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "vt3-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Tokeniseur et filtre de mots vides (Stopwords & Normalisation)",
    goal: "Nettoyer un corpus textuel de veille, supprimer la ponctuation, éliminer les mots vides (stopwords) et extraire le vocabulaire technique saillant.",
    brief: "Dans la chaîne de traitement NLP d’un système de veille, le texte brut doit être normalisé avant indexation :\n1. Convertir l’ensemble des caractères en minuscules.\n2. Remplacer la ponctuation et caractères spéciaux par des espaces : `.,;:!?'\"()[]{}<>-/\\\\_`\n3. Extraire tous les tokens (mots) composés de caractères alphanumériques.\n4. Filtrer les mots de longueur $\\le 2$ lettres ainsi que les mots vides (stopwords) de la liste de référence :\n   `le, la, les, de, du, des, un, une, et, en, pour, sur, par, dans, avec, ce, qui, que, the, a, an, and, of, in, to, for, on, with, is, at, as`\n5. Trier les tokens uniques conservés par ordre alphabétique.\n6. Calculer le taux de réduction de taille : $\\text{reduction} = (1 - \\frac{\\text{tokens retenus}}{\\text{total tokens initiaux}}) \\times 100$ (en %, arrondi à 1 décimale).\n\nEntrée :\n`DOC id=<ID> text=<TEXTE>`\n\nRésultat d’analyse attendu :\n- Pour chaque document :\n  `TOKENS id=<ID> count=<N> words=<w1,w2,...> reduction=<R>%`\n- Bilan :\n  `SUMMARY total_docs=<N> total_tokens=<T>` (somme des tokens retenus)",
    starter: "# Grille d'analyse (vt3-c4-e1) — Tokeniseur et filtre de mots vides (Stopwords & Normalisation)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux documents bilingues avec ponctuation diverse]\n# Données : DOC id=A text=Architecture of zero-trust networks with modern cryptography.\n# Données : DOC id=B text=Déploiement d un cluster Kubernetes sur des serveurs Linux.\nA_COMPLETER\n\n[Cas 2 — Document très bruité avec presque uniquement des stopwords]\n# Données : DOC id=Z text=Dans ce que le pour et avec un...\nA_COMPLETER\n\n[Cas 3 — Termes techniques et acronymes]\n# Données : DOC id=T1 text=API REST GraphQL gRPC pour les échanges de données.\nA_COMPLETER\n",
    hints: [
          "Utiliser re.sub pour nettoyer la ponctuation avant de faire l’extraction des champs.",
          "Créer un ensemble (set) de stopwords pour une vérification en O(1).",
          "Attention : le taux de réduction se calcule sur le nombre de tokens retenus divisé par le total des tokens initiaux."
    ],
    examples: [
          {
                "stdin": "DOC id=1 text=Le cloud et les micro-services dans le datacenter avec Docker.",
                "expected": "TOKENS id=1 count=5 words=cloud,datacenter,docker,micro,services reduction=54.5%\nSUMMARY total_docs=1 total_tokens=5",
                "note": "Tokens initiaux: 11 mots. Retenus: cloud, micro, services, datacenter, docker (5 mots). Réduction de 54.5%."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nTOKENS id=1 count=5 words=cloud,datacenter,docker,micro,services reduction=54.5%\nSUMMARY total_docs=1 total_tokens=5\n\n[Cas 1 — Deux documents bilingues avec ponctuation diverse]\nTOKENS id=A count=6 words=architecture,cryptography,modern,networks,trust,zero reduction=25.0%\nTOKENS id=B count=5 words=cluster,déploiement,kubernetes,linux,serveurs reduction=44.4%\nSUMMARY total_docs=2 total_tokens=11\n\n[Cas 2 — Document très bruité avec presque uniquement des stopwords]\nTOKENS id=Z count=0 words= reduction=100.0%\nSUMMARY total_docs=1 total_tokens=0\n\n[Cas 3 — Termes techniques et acronymes]\nTOKENS id=T1 count=6 words=api,données,graphql,grpc,rest,échanges reduction=33.3%\nSUMMARY total_docs=1 total_tokens=6\n"
  },
  {
    id: "vt3-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Calculateur de score de pertinence TF-IDF sur un corpus de veille",
    goal: "Classer un corpus de documents selon leur score de pertinence TF-IDF pour une requête de veille ciblée.",
    brief: "L’algorithme TF-IDF (Term Frequency - Inverse Document Frequency) quantifie l’importance relative d’un mot par rapport à un corpus documentaire :\n- Pour un document $d$ et un mot-clé $q$ :\n  $$\\text{TF}(q, d) = \\frac{\\text{occurrences de } q \\text{ dans } d}{\\text{nombre total de mots dans } d}$$\n- Fréquence inverse de document sur le corpus de $N$ documents :\n  $$\\text{IDF}(q) = \\ln\\left(\\frac{N + 1}{\\text{DF}(q) + 1}\\right) + 1$$\n  où $\\text{DF}(q)$ est le nombre de documents du corpus contenant au moins une fois le terme $q$.\n- Score total d’un document $d$ pour la requête :\n  $$\\text{Score}(d) = \\sum_{q \\in \\text{requête}} \\text{TF}(q, d) \\times \\text{IDF}(q)$$\n(le score est arrondi à 4 décimales)\n\nEntrée :\n`QUERY words=<q1,q2,...>`\n`CORPUS_DOC id=<ID> text=<mots séparés par des espaces>`\n\nRésultat d’analyse attendu :\n- Documents triés par score décroissant (en cas d’égalité de score, trier par id alphabétique croissant) :\n  `RANK id=<ID> score=<SCORE>`\n- Bilan :\n  `SUMMARY top_doc=<ID> top_score=<SCORE>`",
    starter: "# Grille d'analyse (vt3-c4-e2) — Calculateur de score de pertinence TF-IDF sur un corpus de veille\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux documents avec termes exclusifs]\n# Données : QUERY words=blockchain,smart\n# Données : CORPUS_DOC id=A text=blockchain et smart contracts pour la finance\n# Données : CORPUS_DOC id=B text=developpement web et design moderne\nA_COMPLETER\n\n[Cas 2 — Égalité de score avec tri alphabétique par identifiant]\n# Données : QUERY words=rust\n# Données : CORPUS_DOC id=DOC_B text=langage rust performance\n# Données : CORPUS_DOC id=DOC_A text=langage rust securite\nA_COMPLETER\n\n[Cas 3 — Aucun document ne contenant les termes de requête]\n# Données : QUERY words=inexistant\n# Données : CORPUS_DOC id=D1 text=article un\n# Données : CORPUS_DOC id=D2 text=article deux\nA_COMPLETER\n",
    hints: [
          "Extraire d’abord les termes de la requête en minuscules.",
          "Parcourir le corpus pour compter le nombre total de documents N et le DF de chaque terme de requête.",
          "Calculer pour chaque document la somme des TF * IDF pour les termes de la requête.",
          "Utiliser math.log() pour le logarithme népérien."
    ],
    examples: [
          {
                "stdin": "QUERY words=quantique,securite\nCORPUS_DOC id=D1 text=ordinateur quantique et cryptographie quantique securite absolue\nCORPUS_DOC id=D2 text=securite des serveurs cloud linux et pare-feu\nCORPUS_DOC id=D3 text=intelligence artificielle et vision par ordinateur",
                "expected": "RANK id=D1 score=0.6677\nRANK id=D2 score=0.1840\nRANK id=D3 score=0.0000\nSUMMARY top_doc=D1 top_score=0.6677",
                "note": "D1 contient 2 fois \"quantique\" et 1 fois \"securite\", obtenant le score maximal."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nRANK id=D1 score=0.6677\nRANK id=D2 score=0.1840\nRANK id=D3 score=0.0000\nSUMMARY top_doc=D1 top_score=0.6677\n\n[Cas 1 — Deux documents avec termes exclusifs]\nRANK id=A score=0.4016\nRANK id=B score=0.0000\nSUMMARY top_doc=A top_score=0.4016\n\n[Cas 2 — Égalité de score avec tri alphabétique par identifiant]\nRANK id=DOC_A score=0.3333\nRANK id=DOC_B score=0.3333\nSUMMARY top_doc=DOC_A top_score=0.3333\n\n[Cas 3 — Aucun document ne contenant les termes de requête]\nRANK id=D1 score=0.0000\nRANK id=D2 score=0.0000\nSUMMARY top_doc=D1 top_score=0.0000\n"
  },
  {
    id: "vt3-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)",
    goal: "Appliquer le modèle probabiliste de Naive Bayes pour filtrer automatiquement les alertes entrantes en éliminant le bruit informationnel.",
    brief: "Dans la surveillance temps réel, les flux génèrent une surcharge cognitive de notifications parasites. Un filtre probabiliste Naive Bayes calcule la log-vraisemblance d’appartenance aux classes `PERTINENT` et `BRUIT` :\n\nPour une alerte composée des mots $w_1, w_2, \\dots, w_k$ :\n$$\\ln P(\\text{Pertinent}|d) = \\ln P_0(\\text{pertinent}) + \\sum_{i=1}^k \\ln P(w_i | \\text{pertinent})$$\n$$\\ln P(\\text{Bruit}|d) = \\ln P_0(\\text{bruit}) + \\sum_{i=1}^k \\ln P(w_i | \\text{bruit})$$\n(les mots inconnus non présents dans la table de probabilités sont ignorés)\n\nRègle de décision :\n- Si $\\ln P(\\text{Pertinent}|d) \\ge \\ln P(\\text{Bruit}|d)$ : `decision = PERTINENT`\n- Sinon : `decision = BRUIT`\n- Différence logarithmique : $\\text{diff} = \\ln P(\\text{Pertinent}|d) - \\ln P(\\text{Bruit}|d)$ (arrondie à 2 décimales)\n\nEntrée :\n`PRIOR pertinent=<P1> bruit=<P2>`\n`PROB word=<W> p_pert=<PP> p_bruit=<PB>`\n`ALERT id=<ID> text=<mots séparés par des espaces>`\n\nRésultat d’analyse attendu :\n- Pour chaque alerte :\n  `CLASSIFICATION id=<ID> decision=<DECISION> diff=<DIFF>`\n- Bilan :\n  `SUMMARY total_alertes=<N> retenues=<R> rejetees=<J>`",
    starter: "# Grille d'analyse (vt3-c4-e3) — Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Alerte avec mots mixtes départagée par le ratio de cotes]\n# Données : PRIOR pertinent=0.6 bruit=0.4\n# Données : PROB word=securite p_pert=0.10 p_bruit=0.05\n# Données : PROB word=sponsorise p_pert=0.01 p_bruit=0.20\n# Données : ALERT id=X1 text=article securite sponsorise par notre partenaire\nA_COMPLETER\n\n[Cas 2 — Toutes les alertes hautement pertinentes]\n# Données : PRIOR pertinent=0.5 bruit=0.5\n# Données : PROB word=vulnerabilite p_pert=0.25 p_bruit=0.01\n# Données : ALERT id=K1 text=vulnerabilite linux\n# Données : ALERT id=K2 text=nouvelle vulnerabilite windows\nA_COMPLETER\n\n[Cas 3 — Alerte sans aucun mot connu dans le dictionnaire]\n# Données : PRIOR pertinent=0.7 bruit=0.3\n# Données : PROB word=ia p_pert=0.10 p_bruit=0.02\n# Données : ALERT id=EMPTY text=bonjour tout le monde\nA_COMPLETER\n",
    hints: [
          "Convertir les probabilités P_pert et P_bruit avec math.log().",
          "Additionner les logs pour chaque mot de l’alerte présent dans la table.",
          "Comparer les sommes cumulées pour statuer sur la décision."
    ],
    examples: [
          {
                "stdin": "PRIOR pertinent=0.5 bruit=0.5\nPROB word=faille p_pert=0.20 p_bruit=0.01\nPROB word=zero-day p_pert=0.15 p_bruit=0.001\nPROB word=promo p_pert=0.005 p_bruit=0.30\nPROB word=gratuit p_pert=0.01 p_bruit=0.25\nALERT id=A1 text=decouverte d une faille critique zero-day\nALERT id=A2 text=super promo webinaire gratuit pour tous",
                "expected": "CLASSIFICATION id=A1 decision=PERTINENT diff=8.01\nCLASSIFICATION id=A2 decision=BRUIT diff=-7.31\nSUMMARY total_alertes=2 retenues=1 rejetees=1",
                "note": "L’alerte A1 a une log-différence largement positive (+8.01) et est retenue."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nCLASSIFICATION id=A1 decision=PERTINENT diff=8.01\nCLASSIFICATION id=A2 decision=BRUIT diff=-7.31\nSUMMARY total_alertes=2 retenues=1 rejetees=1\n\n[Cas 1 — Alerte avec mots mixtes départagée par le ratio de cotes]\nCLASSIFICATION id=X1 decision=BRUIT diff=-1.90\nSUMMARY total_alertes=1 retenues=0 rejetees=1\n\n[Cas 2 — Toutes les alertes hautement pertinentes]\nCLASSIFICATION id=K1 decision=PERTINENT diff=3.22\nCLASSIFICATION id=K2 decision=PERTINENT diff=3.22\nSUMMARY total_alertes=2 retenues=2 rejetees=0\n\n[Cas 3 — Alerte sans aucun mot connu dans le dictionnaire]\nCLASSIFICATION id=EMPTY decision=PERTINENT diff=0.85\nSUMMARY total_alertes=1 retenues=1 rejetees=0\n"
  }
];
