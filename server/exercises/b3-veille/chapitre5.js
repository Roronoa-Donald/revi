/**
 * chapitre5.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "vt3-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Évaluateur d’échelle TRL (Technology Readiness Level de 1 à 9)",
    goal: "Qualifier le niveau de maturité technologique d’une innovation selon la grille standardisée TRL.",
    brief: "L’échelle TRL (Technology Readiness Level), standardisée par la NASA, le département de la Défense américain et la Commission Européenne (Horizon Europe), quantifie la maturité d’un projet technologique sur 9 niveaux :\n- `TRL 1` : Principes fondamentaux observés et décrits.\n- `TRL 2` : Concept technologique et applications potentielles formulés.\n- `TRL 3` : Preuve de concept expérimentale (PoC critique) validée en laboratoire.\n- `TRL 4` : Composants et maquette validés en laboratoire.\n- `TRL 5` : Composants validés dans un environnement représentatif.\n- `TRL 6` : Prototype de sous-système testé en environnement représentatif.\n- `TRL 7` : Démonstrateur prototype testé en environnement opérationnel.\n- `TRL 8` : Système réel achevé, qualifié et testé.\n- `TRL 9` : Système opérationnel éprouvé en conditions réelles et en production commerciale.\n\nMacro-phases d’industrialisation :\n- TRL 1 à 3 : `RECHERCHE`\n- TRL 4 à 6 : `DEVELOPPEMENT`\n- TRL 7 à 9 : `INDUSTRIALISATION`\n\nEntrée :\n`TECH nom=<N> trl=<1-9> validation=<REUSSIE|EN_COURS|ECHEC>`\n\nRésultat d’analyse attendu :\n- Pour chaque technologie :\n  `TRL_EVAL nom=<N> trl=<X> macro_phase=<PHASE> statut=<VALIDE|NON_VALIDE>`\n- Bilan :\n  `SUMMARY total_techs=<N> maturite_moyenne=<MOY> pretes_production=<P>` (moyenne arrondie à 1 décimale, TRL 9 validé)",
    starter: "# Grille d'analyse (vt3-c5-e1) — Évaluateur d’échelle TRL (Technology Readiness Level de 1 à 9)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Technologies en phase amont de recherche fondamentale]\n# Données : TECH nom=Fusion_Nucleaire trl=2 validation=REUSSIE\n# Données : TECH nom=Calcul_Quantique_1000q trl=3 validation=REUSSIE\nA_COMPLETER\n\n[Cas 2 — Technologies avec échecs et statuts non validés]\n# Données : TECH nom=Projet_A trl=5 validation=ECHEC\n# Données : TECH nom=Projet_B trl=9 validation=ECHEC\n# Données : TECH nom=Projet_C trl=9 validation=REUSSIE\nA_COMPLETER\n\n[Cas 3 — Un seul produit mûr déployé]\n# Données : TECH nom=PostgreSQL_16 trl=9 validation=REUSSIE\nA_COMPLETER\n",
    hints: [
          "Lire le niveau numérique de TRL.",
          "Assigner la macro-phase selon l’intervalle [1-3], [4-6] ou [7-9].",
          "Le statut est VALIDE si validation=REUSSIE, sinon NON_VALIDE."
    ],
    examples: [
          {
                "stdin": "TECH nom=Batterie_Solide trl=4 validation=REUSSIE\nTECH nom=IA_Raisonnement trl=7 validation=EN_COURS\nTECH nom=Serveur_ARM trl=9 validation=REUSSIE",
                "expected": "TRL_EVAL nom=Batterie_Solide trl=4 macro_phase=DEVELOPPEMENT statut=VALIDE\nTRL_EVAL nom=IA_Raisonnement trl=7 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\nTRL_EVAL nom=Serveur_ARM trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=3 maturite_moyenne=6.7 pretes_production=1",
                "note": "Seul Serveur_ARM atteint le TRL 9 avec validation réussie."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nTRL_EVAL nom=Batterie_Solide trl=4 macro_phase=DEVELOPPEMENT statut=VALIDE\nTRL_EVAL nom=IA_Raisonnement trl=7 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\nTRL_EVAL nom=Serveur_ARM trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=3 maturite_moyenne=6.7 pretes_production=1\n\n[Cas 1 — Technologies en phase amont de recherche fondamentale]\nTRL_EVAL nom=Fusion_Nucleaire trl=2 macro_phase=RECHERCHE statut=VALIDE\nTRL_EVAL nom=Calcul_Quantique_1000q trl=3 macro_phase=RECHERCHE statut=VALIDE\nSUMMARY total_techs=2 maturite_moyenne=2.5 pretes_production=0\n\n[Cas 2 — Technologies avec échecs et statuts non validés]\nTRL_EVAL nom=Projet_A trl=5 macro_phase=DEVELOPPEMENT statut=NON_VALIDE\nTRL_EVAL nom=Projet_B trl=9 macro_phase=INDUSTRIALISATION statut=NON_VALIDE\nTRL_EVAL nom=Projet_C trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=3 maturite_moyenne=7.7 pretes_production=1\n\n[Cas 3 — Un seul produit mûr déployé]\nTRL_EVAL nom=PostgreSQL_16 trl=9 macro_phase=INDUSTRIALISATION statut=VALIDE\nSUMMARY total_techs=1 maturite_moyenne=9.0 pretes_production=1\n"
  },
  {
    id: "vt3-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Positionneur de phase Gartner Hype Cycle et conseil d’investissement",
    goal: "Positionner une technologie émergente sur la courbe du Hype Cycle de Gartner et émettre une recommandation d’action.",
    brief: "Le Hype Cycle modélise l’évolution de la perception publique et de l’adoption réelle d’une technologie à travers cinq phases :\n1. `INNOVATION_TRIGGER` (Déclenchement) : buzz < 50 et adoption < 20.\n2. `PEAK_EXPECTATIONS` (Pic des attentes) : buzz >= 70 et adoption < 35.\n3. `TROUGH_DISILLUSIONMENT` (Gouffre des désillusions) : buzz < 50 et 20 <= adoption < 50.\n4. `SLOPE_ENLIGHTENMENT` (Pente de l’éclaircissement) : buzz entre 40 et 75 et 50 <= adoption < 75.\n5. `PLATEAU_PRODUCTIVITY` (Plateau de productivité) : adoption >= 75 (quel que soit le buzz).\n(Si aucune de ces conditions strictes n’est remplie, affecter la phase intermédiaire `SLOPE_ENLIGHTENMENT`).\n\nRecommandations stratégiques associées :\n- `INNOVATION_TRIGGER` -> `VEILLE_ACTIVE`\n- `PEAK_EXPECTATIONS` -> `PRUDENCE_OBSERVATION`\n- `TROUGH_DISILLUSIONMENT` -> `PILOTE_EXPERIMENTATION`\n- `SLOPE_ENLIGHTENMENT` -> `ADOPTION_PROGRESSIVE`\n- `PLATEAU_PRODUCTIVITY` -> `DEPLOIEMENT_STANDARD`\n\nEntrée :\n`HYPE nom=<N> buzz=<0-100> adoption=<0-100>`\n\nRésultat d’analyse attendu :\n- Pour chaque technologie :\n  `HYPE_POSITION nom=<N> phase=<PHASE> recommandation=<REC>`\n- Bilan :\n  `SUMMARY total=<N> repartition=<PHASE1:C,PHASE2:C,...>` (phases triées par ordre alphabétique)",
    starter: "# Grille d'analyse (vt3-c5-e2) — Positionneur de phase Gartner Hype Cycle et conseil d’investissement\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Technologies en pente d’éclaircissement et plateau]\n# Données : HYPE nom=DevSecOps buzz=60 adoption=65\n# Données : HYPE nom=Conteneurs_Kubernetes buzz=55 adoption=80\nA_COMPLETER\n\n[Cas 2 — Toutes les technologies en déclenchement initial]\n# Données : HYPE nom=Optique_Photonique buzz=30 adoption=10\n# Données : HYPE nom=Spintronique buzz=20 adoption=5\nA_COMPLETER\n\n[Cas 3 — Pic d’attente extrême]\n# Données : HYPE nom=AGI_Hyper_Hype buzz=99 adoption=5\nA_COMPLETER\n",
    hints: [
          "Évaluer les conditions de phase dans l’ordre : PLATEAU, PEAK, INNOVATION, TROUGH, SLOPE.",
          "Associer chaque phase à son mot-clé de recommandation.",
          "Comptabiliser le nombre d’occurrences de chaque phase pour le bilan final."
    ],
    examples: [
          {
                "stdin": "HYPE nom=Metaverse buzz=35 adoption=25\nHYPE nom=IA_Generative buzz=85 adoption=20\nHYPE nom=Cloud_Public buzz=50 adoption=85\nHYPE nom=Ordinateur_Biologique buzz=25 adoption=5",
                "expected": "HYPE_POSITION nom=Metaverse phase=TROUGH_DISILLUSIONMENT recommandation=PILOTE_EXPERIMENTATION\nHYPE_POSITION nom=IA_Generative phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\nHYPE_POSITION nom=Cloud_Public phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\nHYPE_POSITION nom=Ordinateur_Biologique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nSUMMARY total=4 repartition=INNOVATION_TRIGGER:1,PEAK_EXPECTATIONS:1,PLATEAU_PRODUCTIVITY:1,TROUGH_DISILLUSIONMENT:1",
                "note": "Metaverse est entré dans le gouffre des désillusions, IA Générative au pic d’attentes."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nHYPE_POSITION nom=Metaverse phase=TROUGH_DISILLUSIONMENT recommandation=PILOTE_EXPERIMENTATION\nHYPE_POSITION nom=IA_Generative phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\nHYPE_POSITION nom=Cloud_Public phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\nHYPE_POSITION nom=Ordinateur_Biologique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nSUMMARY total=4 repartition=INNOVATION_TRIGGER:1,PEAK_EXPECTATIONS:1,PLATEAU_PRODUCTIVITY:1,TROUGH_DISILLUSIONMENT:1\n\n[Cas 1 — Technologies en pente d’éclaircissement et plateau]\nHYPE_POSITION nom=DevSecOps phase=SLOPE_ENLIGHTENMENT recommandation=ADOPTION_PROGRESSIVE\nHYPE_POSITION nom=Conteneurs_Kubernetes phase=PLATEAU_PRODUCTIVITY recommandation=DEPLOIEMENT_STANDARD\nSUMMARY total=2 repartition=PLATEAU_PRODUCTIVITY:1,SLOPE_ENLIGHTENMENT:1\n\n[Cas 2 — Toutes les technologies en déclenchement initial]\nHYPE_POSITION nom=Optique_Photonique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nHYPE_POSITION nom=Spintronique phase=INNOVATION_TRIGGER recommandation=VEILLE_ACTIVE\nSUMMARY total=2 repartition=INNOVATION_TRIGGER:2\n\n[Cas 3 — Pic d’attente extrême]\nHYPE_POSITION nom=AGI_Hyper_Hype phase=PEAK_EXPECTATIONS recommandation=PRUDENCE_OBSERVATION\nSUMMARY total=1 repartition=PEAK_EXPECTATIONS:1\n"
  },
  {
    id: "vt3-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Analyseur d’impact technologique croisé SWOT / PESTEL",
    goal: "Agréger les facteurs externes PESTEL en opportunités et menaces pour calculer l’indice de résilience stratégique.",
    brief: "La méthode croisée SWOT / PESTEL structure l’analyse prospective d’une rupture technologique :\n- Catégories PESTEL : `POLITIQUE`, `ECONOMIQUE`, `SOCIETAL`, `TECHNOLOGIQUE`, `ENVIRONNEMENTAL`, `LEGAL`.\n- Nature du facteur : `OPPORTUNITE` (score positif) ou `MENACE` (score négatif).\n- Pondération : entier de 1 à 5.\n\nMétriques calculées :\n- Somme des opportunités : $O = \\sum \\text{poids}_{\\text{OPPORTUNITE}}$\n- Somme des menaces : $M = \\sum \\text{poids}_{\\text{MENACE}}$\n- Score net : $\\text{Net} = O - M$\n- Indice de résilience technologique : $\\text{Résilience} = \\frac{O}{\\max(1, O + M)} \\times 100$ (en %, arrondi à 1 décimale)\n\nPosition stratégique :\n- Si $\\text{Net} \\ge 5$ et $\\text{Résilience} \\ge 60.0\\%$ : `OFFENSIVE`\n- Si $\\text{Net} < 0$ et $\\text{Résilience} < 45.0\\%$ : `DEFENSIVE`\n- Sinon : `ATTENTISTE`\n\nEntrée :\n`FACTEUR id=<ID> cat=<P|E|S|T|ENV|L> type=<OPPORTUNITE|MENACE> poids=<1-5>`\n\nRésultat d’analyse attendu :\n`SWOT_SCORE opp=<O> menaces=<M> net=<NET> resilience=<R>% position=<POS>`\n`SUMMARY facteurs_traites=<N> categorie_dominante=<CAT>` (catégorie cumulant le plus de poids total)",
    starter: "# Grille d'analyse (vt3-c5-e3) — Analyseur d’impact technologique croisé SWOT / PESTEL\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Position défensive avec fortes menaces réglementaires]\n# Données : FACTEUR id=1 cat=L type=MENACE poids=5\n# Données : FACTEUR id=2 cat=L type=MENACE poids=4\n# Données : FACTEUR id=3 cat=P type=MENACE poids=3\n# Données : FACTEUR id=4 cat=T type=OPPORTUNITE poids=3\nA_COMPLETER\n\n[Cas 2 — Position attentiste équilibrée]\n# Données : FACTEUR id=A cat=S type=OPPORTUNITE poids=3\n# Données : FACTEUR id=B cat=ENV type=MENACE poids=3\nA_COMPLETER\n\n[Cas 3 — Un seul facteur d opportunité]\n# Données : FACTEUR id=Solo cat=T type=OPPORTUNITE poids=4\nA_COMPLETER\n",
    hints: [
          "Cumuler séparément les poids des opportunités et des menaces.",
          "Suivre les poids cumulés par catégorie PESTEL pour identifier la dominante.",
          "Calculer la résilience et déterminer la posture stratégique."
    ],
    examples: [
          {
                "stdin": "FACTEUR id=F1 cat=T type=OPPORTUNITE poids=5\nFACTEUR id=F2 cat=E type=OPPORTUNITE poids=4\nFACTEUR id=F3 cat=L type=MENACE poids=3\nFACTEUR id=F4 cat=T type=MENACE poids=1",
                "expected": "SWOT_SCORE opp=9 menaces=4 net=5 resilience=69.2% position=OFFENSIVE\nSUMMARY facteurs_traites=4 categorie_dominante=T",
                "note": "Opp=9, Menaces=4, Net=5, Résilience=9/13=69.2% -> OFFENSIVE. Catégorie T totalise 6 points."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nSWOT_SCORE opp=9 menaces=4 net=5 resilience=69.2% position=OFFENSIVE\nSUMMARY facteurs_traites=4 categorie_dominante=T\n\n[Cas 1 — Position défensive avec fortes menaces réglementaires]\nSWOT_SCORE opp=3 menaces=12 net=-9 resilience=20.0% position=DEFENSIVE\nSUMMARY facteurs_traites=4 categorie_dominante=L\n\n[Cas 2 — Position attentiste équilibrée]\nSWOT_SCORE opp=3 menaces=3 net=0 resilience=50.0% position=ATTENTISTE\nSUMMARY facteurs_traites=2 categorie_dominante=ENV\n\n[Cas 3 — Un seul facteur d opportunité]\nSWOT_SCORE opp=4 menaces=0 net=4 resilience=100.0% position=ATTENTISTE\nSUMMARY facteurs_traites=1 categorie_dominante=T\n"
  }
];
