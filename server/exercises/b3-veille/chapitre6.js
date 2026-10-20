/**
 * chapitre6.js — Études de cas du cours « b3-veille ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "vt3-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Générateur de bulletin d’alerte de veille synthétique (Curated Digest)",
    goal: "Mettre en forme et prioriser un flux d’articles pour produire un bulletin de veille exécutif hiérarchisé.",
    brief: "Dans la restitution de veille, l’attention des décideurs impose une hiérarchisation stricte par criticité de l’information :\n- Ordre de priorité : `CRITIQUE` (priorité 1), `MOYENNE` (priorité 2), puis `FAIBLE` (priorité 3).\n- En cas d’égalité de criticité, ordonner les articles par identifiant `id` alphabétique croissant.\n\nFormat de chaque ligne du bulletin :\n`BULLETIN_ITEM [<CRITICITE>] (<SOURCE>) <TITRE> (id: <ID>)`\n\nEntrée :\n`ARTICLE id=<ID> source=<SRC> criticite=<FAIBLE|MOYENNE|CRITIQUE> title=<TITRE>`\n\nSortie :\n- Lignes ordonnées du bulletin :\n  `BULLETIN_ITEM [<CRITICITE>] (<SRC>) <TITRE> (id: <ID>)`\n- Bilan :\n  `SUMMARY total=<N> critiques=<C> moyennes=<M> faibles=<F>`",
    starter: "# Grille d'analyse (vt3-c6-e1) — Générateur de bulletin d’alerte de veille synthétique (Curated Digest)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Multiples articles critiques avec départage par identifiant]\n# Données : ARTICLE id=Z1 source=NVD criticite=CRITIQUE title=Vulnérabilité noyau Linux\n# Données : ARTICLE id=A9 source=ANSSI criticite=CRITIQUE title=Campagne de rançongiciel active\nA_COMPLETER\n\n[Cas 2 — Tous les articles de niveau faible]\n# Données : ARTICLE id=1 source=DevBlog criticite=FAIBLE title=Nouvelle syntaxe CSS\n# Données : ARTICLE id=2 source=Medium criticite=FAIBLE title=Astuces productivité VS Code\nA_COMPLETER\n\n[Cas 3 — Un seul article de criticité moyenne]\n# Données : ARTICLE id=Solo source=Reuters criticite=MOYENNE title=Rachat d un fournisseur de puces\nA_COMPLETER\n",
    hints: [
          "Attribuer un poids numérique à chaque niveau de criticité (ex: CRITIQUE=1, MOYENNE=2, FAIBLE=3).",
          "Trier la liste avec la clé (poids_criticite, id).",
          "Compter le nombre d’articles par palier pour le bilan final."
    ],
    examples: [
          {
                "stdin": "ARTICLE id=A1 source=CERT-FR criticite=CRITIQUE title=Faille d exécution de code dans OpenSSH\nARTICLE id=A2 source=TechCrunch criticite=FAIBLE title=Nouveau design pour l application Slack\nARTICLE id=A3 source=CloudBlog criticite=MOYENNE title=Augmentation des prix de l infrastructure AWS",
                "expected": "BULLETIN_ITEM [CRITIQUE] (CERT-FR) Faille d exécution de code dans OpenSSH (id: A1)\nBULLETIN_ITEM [MOYENNE] (CloudBlog) Augmentation des prix de l infrastructure AWS (id: A3)\nBULLETIN_ITEM [FAIBLE] (TechCrunch) Nouveau design pour l application Slack (id: A2)\nSUMMARY total=3 critiques=1 moyennes=1 faibles=1",
                "note": "L’article CRITIQUE est affiché en tête, suivi de MOYENNE puis FAIBLE."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nBULLETIN_ITEM [CRITIQUE] (CERT-FR) Faille d exécution de code dans OpenSSH (id: A1)\nBULLETIN_ITEM [MOYENNE] (CloudBlog) Augmentation des prix de l infrastructure AWS (id: A3)\nBULLETIN_ITEM [FAIBLE] (TechCrunch) Nouveau design pour l application Slack (id: A2)\nSUMMARY total=3 critiques=1 moyennes=1 faibles=1\n\n[Cas 1 — Multiples articles critiques avec départage par identifiant]\nBULLETIN_ITEM [CRITIQUE] (ANSSI) Campagne de rançongiciel active (id: A9)\nBULLETIN_ITEM [CRITIQUE] (NVD) Vulnérabilité noyau Linux (id: Z1)\nSUMMARY total=2 critiques=2 moyennes=0 faibles=0\n\n[Cas 2 — Tous les articles de niveau faible]\nBULLETIN_ITEM [FAIBLE] (DevBlog) Nouvelle syntaxe CSS (id: 1)\nBULLETIN_ITEM [FAIBLE] (Medium) Astuces productivité VS Code (id: 2)\nSUMMARY total=2 critiques=0 moyennes=0 faibles=2\n\n[Cas 3 — Un seul article de criticité moyenne]\nBULLETIN_ITEM [MOYENNE] (Reuters) Rachat d un fournisseur de puces (id: Solo)\nSUMMARY total=1 critiques=0 moyennes=1 faibles=0\n"
  },
  {
    id: "vt3-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Calculateur de radar technologique (Tech Radar ThoughtWorks)",
    goal: "Classer les technologies selon les quatre quadrants et les quatre anneaux d’adoption du Tech Radar.",
    brief: "Popularisé par Martin Fowler et ThoughtWorks, le **Tech Radar** projette les technologies émergentes sur quatre quadrants cartographiques et quatre anneaux d’action concentriques :\n- Quadrants : `TECHNIQUES`, `OUTILS`, `PLATEFORMES`, `LANGAGES`.\n- Anneaux d’action (avec scores de maturité associés) :\n  - `ADOPT` (score: 100) : technologie éprouvée, standard d’entreprise fortement recommandé.\n  - `TRIAL` (score: 75) : technologie prête pour des projets pilotes réels avec risques maîtrisés.\n  - `ASSESS` (score: 50) : technologie prometteuse à évaluer et prototyper en laboratoire.\n  - `HOLD` (score: 25) : technologie obsolète, à éviter ou en cours de décommissionnement.\n\nCalculs :\n- Score de chaque nœud = score associé à son anneau.\n- Calculer le score moyen global de toutes les technologies (arrondi à 1 décimale).\n- Identifier le quadrant cumulant le score total le plus élevé.\n\nEntrée :\n`TECH nom=<N> quadrant=<TECHNIQUES|OUTILS|PLATEFORMES|LANGAGES> anneau=<ADOPT|TRIAL|ASSESS|HOLD>`\n\nSortie :\n- Pour chaque technologie :\n  `RADAR_NODE nom=<N> quad=<Q> ring=<R> score=<SCORE>`\n- Bilan :\n  `SUMMARY total_nodes=<N> top_quadrant=<Q> avg_score=<MOY>`",
    starter: "# Grille d'analyse (vt3-c6-e2) — Calculateur de radar technologique (Tech Radar ThoughtWorks)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Technologies multiples avec égalité de score sur un quadrant]\n# Données : TECH nom=Docker quadrant=OUTILS anneau=ADOPT\n# Données : TECH nom=Terraform quadrant=OUTILS anneau=ADOPT\n# Données : TECH nom=Go quadrant=LANGAGES anneau=ADOPT\nA_COMPLETER\n\n[Cas 2 — Toutes les technologies en évaluation (ASSESS)]\n# Données : TECH nom=Quantum quadrant=TECHNIQUES anneau=ASSESS\n# Données : TECH nom=Zig quadrant=LANGAGES anneau=ASSESS\nA_COMPLETER\n\n[Cas 3 — Un seul nœud]\n# Données : TECH nom=Kafka quadrant=PLATEFORMES anneau=TRIAL\nA_COMPLETER\n",
    hints: [
          "Associer chaque anneau à sa valeur numérique (ADOPT:100, TRIAL:75, ASSESS:50, HOLD:25).",
          "Cumuler les scores par quadrant pour déterminer le top quadrant.",
          "Calculer la moyenne arithmétique globale."
    ],
    examples: [
          {
                "stdin": "TECH nom=Kubernetes quadrant=PLATEFORMES anneau=ADOPT\nTECH nom=Rust quadrant=LANGAGES anneau=TRIAL\nTECH nom=eBPF quadrant=TECHNIQUES anneau=ASSESS\nTECH nom=SVN quadrant=OUTILS anneau=HOLD",
                "expected": "RADAR_NODE nom=Kubernetes quad=PLATEFORMES ring=ADOPT score=100\nRADAR_NODE nom=Rust quad=LANGAGES ring=TRIAL score=75\nRADAR_NODE nom=eBPF quad=TECHNIQUES ring=ASSESS score=50\nRADAR_NODE nom=SVN quad=OUTILS ring=HOLD score=25\nSUMMARY total_nodes=4 top_quadrant=PLATEFORMES avg_score=62.5",
                "note": "Le quadrant PLATEFORMES cumule 100 points et devance les autres."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nRADAR_NODE nom=Kubernetes quad=PLATEFORMES ring=ADOPT score=100\nRADAR_NODE nom=Rust quad=LANGAGES ring=TRIAL score=75\nRADAR_NODE nom=eBPF quad=TECHNIQUES ring=ASSESS score=50\nRADAR_NODE nom=SVN quad=OUTILS ring=HOLD score=25\nSUMMARY total_nodes=4 top_quadrant=PLATEFORMES avg_score=62.5\n\n[Cas 1 — Technologies multiples avec égalité de score sur un quadrant]\nRADAR_NODE nom=Docker quad=OUTILS ring=ADOPT score=100\nRADAR_NODE nom=Terraform quad=OUTILS ring=ADOPT score=100\nRADAR_NODE nom=Go quad=LANGAGES ring=ADOPT score=100\nSUMMARY total_nodes=3 top_quadrant=OUTILS avg_score=100.0\n\n[Cas 2 — Toutes les technologies en évaluation (ASSESS)]\nRADAR_NODE nom=Quantum quad=TECHNIQUES ring=ASSESS score=50\nRADAR_NODE nom=Zig quad=LANGAGES ring=ASSESS score=50\nSUMMARY total_nodes=2 top_quadrant=LANGAGES avg_score=50.0\n\n[Cas 3 — Un seul nœud]\nRADAR_NODE nom=Kafka quad=PLATEFORMES ring=TRIAL score=75\nSUMMARY total_nodes=1 top_quadrant=PLATEFORMES avg_score=75.0\n"
  },
  {
    id: "vt3-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Simulateur de gouvernance d’équipe et workflow Kanban de veille",
    goal: "Mesurer la performance d’une cellule de veille en calculant le temps de cycle (Lead Time) et le taux d’approbation éditoriale.",
    brief: "Dans une cellule de veille collaborative, les articles cheminent à travers un workflow éditorial en quatre étapes horodatées (en heures) :\n- `COLLECTE` ($T_1$) : repérage initial par le veilleur.\n- `EVALUATION` ($T_2$) : qualification de fiabilité et scoring.\n- `VALIDATION` ($T_3$) : revue par le Lead Analyst.\n- `DIFFUSION` ($T_4$) : publication dans le livret ou dashboard.\n\nRègles de calcul du cycle de traitement (Lead Time) :\n- Si l’article est `DIFFUSE` : $\\text{cycle} = T_4 - T_1$ (heures).\n- Si l’article est `REJETE` : $\\text{cycle} = T_2 - T_1$ (heures, arrêt au stade évaluation).\n\nBilan d’équipe :\n- Taux d’approbation : $\\text{taux} = (\\frac{\\text{diffusés}}{\\text{total soumissions}}) \\times 100$ (en %, arrondi à 1 décimale).\n- Temps de cycle moyen des articles diffusés : $\\text{moyenne} = \\frac{\\sum \\text{cycles diffusés}}{\\text{diffusés}}$ (arrondi à 1 décimale).\n\nEntrée :\n`KANBAN_CARD id=<ID> veilleur=<V> t1=<T1> t2=<T2> t3=<T3> t4=<T4> decision=<DIFFUSE|REJETE>`\n\nSortie :\n- Pour chaque carte :\n  `CARD_RESULT id=<ID> veilleur=<V> statut=<DIFFUSE|REJETE> cycle_time=<T>h`\n- Bilan :\n  `SUMMARY total_soumissions=<N> diffuses=<D> taux_approbation=<T>% avg_cycle_time=<MOY>h`",
    starter: "# Grille d'analyse (vt3-c6-e3) — Simulateur de gouvernance d’équipe et workflow Kanban de veille\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les soumissions validées et diffusées]\n# Données : KANBAN_CARD id=1 veilleur=Claire t1=0 t2=1 t3=2 t4=4 decision=DIFFUSE\n# Données : KANBAN_CARD id=2 veilleur=David t1=5 t2=6 t3=7 t4=11 decision=DIFFUSE\nA_COMPLETER\n\n[Cas 2 — Toutes les soumissions rejetées au premier stade]\n# Données : KANBAN_CARD id=R1 veilleur=Emma t1=0 t2=1 t3=0 t4=0 decision=REJETE\n# Données : KANBAN_CARD id=R2 veilleur=Emma t1=2 t2=4 t3=0 t4=0 decision=REJETE\nA_COMPLETER\n\n[Cas 3 — Une seule soumission diffusée avec cycle long]\n# Données : KANBAN_CARD id=Solo veilleur=Hugo t1=0 t2=10 t3=20 t4=30 decision=DIFFUSE\nA_COMPLETER\n",
    hints: [
          "Convertir les temps T1, T2, T3, T4 en entiers ou flottants.",
          "Calculer cycle = T4 - T1 si DIFFUSE, sinon T2 - T1 si REJETE.",
          "Suivre la somme des temps de cycle des seuls articles diffusés pour calculer avg_cycle_time."
    ],
    examples: [
          {
                "stdin": "KANBAN_CARD id=C1 veilleur=Alice t1=0 t2=2 t3=5 t4=8 decision=DIFFUSE\nKANBAN_CARD id=C2 veilleur=Bob t1=1 t2=3 t3=0 t4=0 decision=REJETE\nKANBAN_CARD id=C3 veilleur=Alice t1=10 t2=12 t3=14 t4=16 decision=DIFFUSE",
                "expected": "CARD_RESULT id=C1 veilleur=Alice statut=DIFFUSE cycle_time=8h\nCARD_RESULT id=C2 veilleur=Bob statut=REJETE cycle_time=2h\nCARD_RESULT id=C3 veilleur=Alice statut=DIFFUSE cycle_time=6h\nSUMMARY total_soumissions=3 diffuses=2 taux_approbation=66.7% avg_cycle_time=7.0h",
                "note": "C1 met 8h, C2 est rejeté en 2h, C3 met 6h. Moyenne des diffusés = (8 + 6) / 2 = 7.0h."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nCARD_RESULT id=C1 veilleur=Alice statut=DIFFUSE cycle_time=8h\nCARD_RESULT id=C2 veilleur=Bob statut=REJETE cycle_time=2h\nCARD_RESULT id=C3 veilleur=Alice statut=DIFFUSE cycle_time=6h\nSUMMARY total_soumissions=3 diffuses=2 taux_approbation=66.7% avg_cycle_time=7.0h\n\n[Cas 1 — Toutes les soumissions validées et diffusées]\nCARD_RESULT id=1 veilleur=Claire statut=DIFFUSE cycle_time=4h\nCARD_RESULT id=2 veilleur=David statut=DIFFUSE cycle_time=6h\nSUMMARY total_soumissions=2 diffuses=2 taux_approbation=100.0% avg_cycle_time=5.0h\n\n[Cas 2 — Toutes les soumissions rejetées au premier stade]\nCARD_RESULT id=R1 veilleur=Emma statut=REJETE cycle_time=1h\nCARD_RESULT id=R2 veilleur=Emma statut=REJETE cycle_time=2h\nSUMMARY total_soumissions=2 diffuses=0 taux_approbation=0.0% avg_cycle_time=0.0h\n\n[Cas 3 — Une seule soumission diffusée avec cycle long]\nCARD_RESULT id=Solo veilleur=Hugo statut=DIFFUSE cycle_time=30h\nSUMMARY total_soumissions=1 diffuses=1 taux_approbation=100.0% avg_cycle_time=30.0h\n"
  }
];
