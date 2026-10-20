'use strict';

module.exports = [
  {
    "id": "sql3-c4-e1",
    "chapter": 4,
    "title": "Simulateur de fonctions de classement (ROW_NUMBER vs RANK vs DENSE_RANK)",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer et comparer les trois fonctions de classement standardisées SQL sur une série de valeurs avec ex-æquo.",
    "brief": "Dans la norme SQL analytique, les fonctions de classement ordonnent les lignes au sein d’une fenêtre de partition :\n- `ROW_NUMBER()` : attribue un entier consécutif unique strict ($1, 2, 3, \\dots$) sans aucun doublon.\n- `RANK()` : attribue le même rang aux lignes ex-æquo, puis saute les rangs suivants ($1, 2, 2, 4, 5, \\dots$).\n- `DENSE_RANK()` : attribue le même rang aux lignes ex-æquo, sans sauter de rang ($1, 2, 2, 3, 4, \\dots$).\n\nEntrée :\n`SERIE vals=<v1,v2,...>` (les valeurs sont ordonnées de manière décroissante)\n\nSortie :\n- Pour chaque élément :\n  `RANK_ROW val=<V> row_num=<N> rank=<R> dense_rank=<D>`\n- Bilan : `SUMMARY total_rows=<N> max_rank=<R> max_dense_rank=<D>`",
    "starter": "# Grille d'analyse (sql3-c4-e1) — Simulateur de fonctions de classement (ROW_NUMBER vs RANK vs DENSE_RANK)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les valeurs identiques (ex-æquo parfait)]\n# Données : SERIE vals=50,50,50,50\nA_COMPLETER\n\n[Cas 2 — Toutes les valeurs strictement distinctes]\n# Données : SERIE vals=30,25,20,15,10\nA_COMPLETER\n\n[Cas 3 — Multiples groupes d ex-æquo consécutifs]\n# Données : SERIE vals=80,80,60,60,60,40\nA_COMPLETER\n",
    "hints": [
      "Itérer sur la liste triée avec l’indice courant i (1-based pour row_number).",
      "Pour RANK : si val == val_precedente, conserver le même rank que le premier ex-æquo ; sinon rank = i.",
      "Pour DENSE_RANK : n’incrémenter le rang que lorsque la valeur change."
    ],
    "examples": [
      {
        "stdin": "SERIE vals=100,90,90,80,70",
        "expected": "RANK_ROW val=100 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=90 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=90 row_num=3 rank=2 dense_rank=2\nRANK_ROW val=80 row_num=4 rank=4 dense_rank=3\nRANK_ROW val=70 row_num=5 rank=5 dense_rank=4\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=4",
        "note": "Les deux notes à 90 partagent le rang 2. RANK saute à 4, DENSE_RANK continue à 3."
      }
    ],
    "tests": [
      {
        "label": "Toutes les valeurs identiques (ex-æquo parfait)",
        "stdin": "cas:1",
        "expected": "RANK_ROW val=50 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=3 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=4 rank=1 dense_rank=1\nSUMMARY total_rows=4 max_rank=1 max_dense_rank=1"
      },
      {
        "label": "Toutes les valeurs strictement distinctes",
        "stdin": "cas:2",
        "expected": "RANK_ROW val=30 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=25 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=20 row_num=3 rank=3 dense_rank=3\nRANK_ROW val=15 row_num=4 rank=4 dense_rank=4\nRANK_ROW val=10 row_num=5 rank=5 dense_rank=5\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=5"
      },
      {
        "label": "Multiples groupes d ex-æquo consécutifs",
        "stdin": "cas:3",
        "expected": "RANK_ROW val=80 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=80 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=60 row_num=3 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=4 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=5 rank=3 dense_rank=2\nRANK_ROW val=40 row_num=6 rank=6 dense_rank=3\nSUMMARY total_rows=6 max_rank=6 max_dense_rank=3"
      }
    ],
    "solution": "[Exemple]\nRANK_ROW val=100 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=90 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=90 row_num=3 rank=2 dense_rank=2\nRANK_ROW val=80 row_num=4 rank=4 dense_rank=3\nRANK_ROW val=70 row_num=5 rank=5 dense_rank=4\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=4\n\n[Cas 1 — Toutes les valeurs identiques (ex-æquo parfait)]\nRANK_ROW val=50 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=3 rank=1 dense_rank=1\nRANK_ROW val=50 row_num=4 rank=1 dense_rank=1\nSUMMARY total_rows=4 max_rank=1 max_dense_rank=1\n\n[Cas 2 — Toutes les valeurs strictement distinctes]\nRANK_ROW val=30 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=25 row_num=2 rank=2 dense_rank=2\nRANK_ROW val=20 row_num=3 rank=3 dense_rank=3\nRANK_ROW val=15 row_num=4 rank=4 dense_rank=4\nRANK_ROW val=10 row_num=5 rank=5 dense_rank=5\nSUMMARY total_rows=5 max_rank=5 max_dense_rank=5\n\n[Cas 3 — Multiples groupes d ex-æquo consécutifs]\nRANK_ROW val=80 row_num=1 rank=1 dense_rank=1\nRANK_ROW val=80 row_num=2 rank=1 dense_rank=1\nRANK_ROW val=60 row_num=3 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=4 rank=3 dense_rank=2\nRANK_ROW val=60 row_num=5 rank=3 dense_rank=2\nRANK_ROW val=40 row_num=6 rank=6 dense_rank=3\nSUMMARY total_rows=6 max_rank=6 max_dense_rank=3"
  },
  {
    "id": "sql3-c4-e2",
    "chapter": 4,
    "title": "Calculateur de moyennes et sommes glissantes avec clause d’encadrement",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l’agrégation fenêtrée avec la clause de cadrage ROWS BETWEEN k PRECEDING AND CURRENT ROW.",
    "brief": "Dans la clause `OVER (ORDER BY date ROWS BETWEEN k PRECEDING AND CURRENT ROW)` :\n- Pour chaque ligne courante, la fenêtre d’agrégation englobe au maximum les $k$ lignes précédentes plus la ligne courante (soit jusqu’à $k+1$ éléments).\n- On calcule la somme cumulée de la fenêtre et la moyenne mobile arithmétique associée arrondie à 2 décimales.\n\nEntrée :\n- Une ligne définissant la taille de l’historique : `CONFIG preceding=<K>`\n- Des lignes de données : `ROW id=<step> val=<float_val>`\n\nSortie :\n- Pour chaque ligne : `WINDOW_AGG id=<step> val=<V.2f> sum=<SUM.2f> avg=<AVG.2f> window_size=<COUNT>`\n- En fin de série : `FINAL_METRIC total_rows=<N> last_avg=<LAST_AVG.2f>`",
    "starter": "# Grille d'analyse (sql3-c4-e2) — Calculateur de moyennes et sommes glissantes avec clause d’encadrement\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fenêtre cumulée depuis le début (preceding infini / très grand)]\n# Données : CONFIG preceding=100\n# Données : ROW id=1 val=5\n# Données : ROW id=2 val=15\n# Données : ROW id=3 val=25\nA_COMPLETER\n\n[Cas 2 — Fenêtre de 1 ligne précédente (preceding=1)]\n# Données : CONFIG preceding=1\n# Données : ROW id=1 val=100\n# Données : ROW id=2 val=200\n# Données : ROW id=3 val=50\nA_COMPLETER\n\n[Cas 3 — Fenêtre stricte preceding=0 (uniquement current row)]\n# Données : CONFIG preceding=0\n# Données : ROW id=1 val=12.5\n# Données : ROW id=2 val=25.0\nA_COMPLETER\n",
    "hints": [
      "Une fonction de fenêtrage (OVER (...)) applique un calcul d’agrégation sur une partition sans regrouper les lignes.",
      "Définissez la fenêtre glissante (ROWS BETWEEN ... PRECEDING AND CURRENT ROW) pour calculer la moyenne mobile."
    ],
    "examples": [
      {
        "stdin": "CONFIG preceding=2\nROW id=1 val=10\nROW id=2 val=20\nROW id=3 val=30\nROW id=4 val=40",
        "expected": "WINDOW_AGG id=1 val=10.00 sum=10.00 avg=10.00 window_size=1\nWINDOW_AGG id=2 val=20.00 sum=30.00 avg=15.00 window_size=2\nWINDOW_AGG id=3 val=30.00 sum=60.00 avg=20.00 window_size=3\nWINDOW_AGG id=4 val=40.00 sum=90.00 avg=30.00 window_size=3\nFINAL_METRIC total_rows=4 last_avg=30.00",
        "note": "Pour l’id=4 avec preceding=2, la fenêtre contient [20, 30, 40] : somme=90, moyenne=30."
      }
    ],
    "tests": [
      {
        "label": "Fenêtre cumulée depuis le début (preceding infini / très grand)",
        "stdin": "cas:1",
        "expected": "WINDOW_AGG id=1 val=5.00 sum=5.00 avg=5.00 window_size=1\nWINDOW_AGG id=2 val=15.00 sum=20.00 avg=10.00 window_size=2\nWINDOW_AGG id=3 val=25.00 sum=45.00 avg=15.00 window_size=3\nFINAL_METRIC total_rows=3 last_avg=15.00"
      },
      {
        "label": "Fenêtre de 1 ligne précédente (preceding=1)",
        "stdin": "cas:2",
        "expected": "WINDOW_AGG id=1 val=100.00 sum=100.00 avg=100.00 window_size=1\nWINDOW_AGG id=2 val=200.00 sum=300.00 avg=150.00 window_size=2\nWINDOW_AGG id=3 val=50.00 sum=250.00 avg=125.00 window_size=2\nFINAL_METRIC total_rows=3 last_avg=125.00"
      },
      {
        "label": "Fenêtre stricte preceding=0 (uniquement current row)",
        "stdin": "cas:3",
        "expected": "WINDOW_AGG id=1 val=12.50 sum=12.50 avg=12.50 window_size=1\nWINDOW_AGG id=2 val=25.00 sum=25.00 avg=25.00 window_size=1\nFINAL_METRIC total_rows=2 last_avg=25.00"
      }
    ],
    "solution": "[Exemple]\nWINDOW_AGG id=1 val=10.00 sum=10.00 avg=10.00 window_size=1\nWINDOW_AGG id=2 val=20.00 sum=30.00 avg=15.00 window_size=2\nWINDOW_AGG id=3 val=30.00 sum=60.00 avg=20.00 window_size=3\nWINDOW_AGG id=4 val=40.00 sum=90.00 avg=30.00 window_size=3\nFINAL_METRIC total_rows=4 last_avg=30.00\n\n[Cas 1 — Fenêtre cumulée depuis le début (preceding infini / très grand)]\nWINDOW_AGG id=1 val=5.00 sum=5.00 avg=5.00 window_size=1\nWINDOW_AGG id=2 val=15.00 sum=20.00 avg=10.00 window_size=2\nWINDOW_AGG id=3 val=25.00 sum=45.00 avg=15.00 window_size=3\nFINAL_METRIC total_rows=3 last_avg=15.00\n\n[Cas 2 — Fenêtre de 1 ligne précédente (preceding=1)]\nWINDOW_AGG id=1 val=100.00 sum=100.00 avg=100.00 window_size=1\nWINDOW_AGG id=2 val=200.00 sum=300.00 avg=150.00 window_size=2\nWINDOW_AGG id=3 val=50.00 sum=250.00 avg=125.00 window_size=2\nFINAL_METRIC total_rows=3 last_avg=125.00\n\n[Cas 3 — Fenêtre stricte preceding=0 (uniquement current row)]\nWINDOW_AGG id=1 val=12.50 sum=12.50 avg=12.50 window_size=1\nWINDOW_AGG id=2 val=25.00 sum=25.00 avg=25.00 window_size=1\nFINAL_METRIC total_rows=2 last_avg=25.00"
  },
  {
    "id": "sql3-c4-e3",
    "chapter": 4,
    "title": "Moteur de résolution de hiérarchie arborescente par CTE récursive",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la profondeur, le chemin absolu et le nombre total de subordonnés dans une structure hiérarchique via une CTE récursive simulée.",
    "brief": "Dans SQL standard, la syntaxe `WITH RECURSIVE` permet de parcourir des graphes et arbres hiérarchiques (ex: organigramme d’entreprise, nomenclature de pièces BOM) :\n- Nœud racine (Ancre récursive) : employé dont `manager_id=0` (niveau 1, chemin `/<nom>`).\n- Membre récursif : chaque subordonné direct d’un employé résolu hérite d’un `level = level_manager + 1` et d’un `path = path_manager / <nom>`.\n- Le moteur calcule également pour chaque nœud le nombre total de subordonnés (descendants directs et indirects).\n\nEntrée :\n`EMP id=<int> name=<nom> manager=<int>` (manager=0 pour le sommet de l’arbre)\n\nSortie :\n- Liste des employés triés par niveau puis par identifiant :\n  `HIERARCHY id=<id> name=<name> level=<L> path=<PATH> subordinates=<COUNT>`\n- Bilan de l’arbre : `TREE_REPORT max_depth=<D> total_nodes=<N>`",
    "starter": "# Grille d'analyse (sql3-c4-e3) — Moteur de résolution de hiérarchie arborescente par CTE récursive\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Organigramme avec plusieurs branches parallèles sous la racine]\n# Données : EMP id=1 name=CEO manager=0\n# Données : EMP id=2 name=VP_Sales manager=1\n# Données : EMP id=3 name=VP_Tech manager=1\n# Données : EMP id=4 name=Dev1 manager=3\n# Données : EMP id=5 name=Dev2 manager=3\nA_COMPLETER\n\n[Cas 2 — Nœud unique racine sans subordonné]\n# Données : EMP id=1 name=SoloConsultant manager=0\nA_COMPLETER\n\n[Cas 3 — Arbre de pièces industrielles (BOM)]\n# Données : EMP id=10 name=Voiture manager=0\n# Données : EMP id=20 name=Moteur manager=10\n# Données : EMP id=30 name=Piston manager=20\n# Données : EMP id=40 name=Chassis manager=10\nA_COMPLETER\n",
    "hints": [
      "Construire un dictionnaire des employés et un graphe direct manager -> [enfants].",
      "Identifier la racine (manager=0) pour initialiser la récursion (BFS ou DFS).",
      "Pour le compte des subordonnés, une fonction récursive d’exploration du sous-arbre permet de sommer tous les descendants."
    ],
    "examples": [
      {
        "stdin": "EMP id=1 name=CEO manager=0\nEMP id=2 name=CTO manager=1\nEMP id=3 name=DevLead manager=2\nEMP id=4 name=Dev1 manager=3",
        "expected": "HIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=3\nHIERARCHY id=2 name=CTO level=2 path=/CEO/CTO subordinates=2\nHIERARCHY id=3 name=DevLead level=3 path=/CEO/CTO/DevLead subordinates=1\nHIERARCHY id=4 name=Dev1 level=4 path=/CEO/CTO/DevLead/Dev1 subordinates=0\nTREE_REPORT max_depth=4 total_nodes=4",
        "note": "Arbre à 4 niveaux : le CEO a 3 subordonnés au total."
      }
    ],
    "tests": [
      {
        "label": "Organigramme avec plusieurs branches parallèles sous la racine",
        "stdin": "cas:1",
        "expected": "HIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=4\nHIERARCHY id=2 name=VP_Sales level=2 path=/CEO/VP_Sales subordinates=0\nHIERARCHY id=3 name=VP_Tech level=2 path=/CEO/VP_Tech subordinates=2\nHIERARCHY id=4 name=Dev1 level=3 path=/CEO/VP_Tech/Dev1 subordinates=0\nHIERARCHY id=5 name=Dev2 level=3 path=/CEO/VP_Tech/Dev2 subordinates=0\nTREE_REPORT max_depth=3 total_nodes=5"
      },
      {
        "label": "Nœud unique racine sans subordonné",
        "stdin": "cas:2",
        "expected": "HIERARCHY id=1 name=SoloConsultant level=1 path=/SoloConsultant subordinates=0\nTREE_REPORT max_depth=1 total_nodes=1"
      },
      {
        "label": "Arbre de pièces industrielles (BOM)",
        "stdin": "cas:3",
        "expected": "HIERARCHY id=10 name=Voiture level=1 path=/Voiture subordinates=3\nHIERARCHY id=20 name=Moteur level=2 path=/Voiture/Moteur subordinates=1\nHIERARCHY id=40 name=Chassis level=2 path=/Voiture/Chassis subordinates=0\nHIERARCHY id=30 name=Piston level=3 path=/Voiture/Moteur/Piston subordinates=0\nTREE_REPORT max_depth=3 total_nodes=4"
      }
    ],
    "solution": "[Exemple]\nHIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=3\nHIERARCHY id=2 name=CTO level=2 path=/CEO/CTO subordinates=2\nHIERARCHY id=3 name=DevLead level=3 path=/CEO/CTO/DevLead subordinates=1\nHIERARCHY id=4 name=Dev1 level=4 path=/CEO/CTO/DevLead/Dev1 subordinates=0\nTREE_REPORT max_depth=4 total_nodes=4\n\n[Cas 1 — Organigramme avec plusieurs branches parallèles sous la racine]\nHIERARCHY id=1 name=CEO level=1 path=/CEO subordinates=4\nHIERARCHY id=2 name=VP_Sales level=2 path=/CEO/VP_Sales subordinates=0\nHIERARCHY id=3 name=VP_Tech level=2 path=/CEO/VP_Tech subordinates=2\nHIERARCHY id=4 name=Dev1 level=3 path=/CEO/VP_Tech/Dev1 subordinates=0\nHIERARCHY id=5 name=Dev2 level=3 path=/CEO/VP_Tech/Dev2 subordinates=0\nTREE_REPORT max_depth=3 total_nodes=5\n\n[Cas 2 — Nœud unique racine sans subordonné]\nHIERARCHY id=1 name=SoloConsultant level=1 path=/SoloConsultant subordinates=0\nTREE_REPORT max_depth=1 total_nodes=1\n\n[Cas 3 — Arbre de pièces industrielles (BOM)]\nHIERARCHY id=10 name=Voiture level=1 path=/Voiture subordinates=3\nHIERARCHY id=20 name=Moteur level=2 path=/Voiture/Moteur subordinates=1\nHIERARCHY id=40 name=Chassis level=2 path=/Voiture/Chassis subordinates=0\nHIERARCHY id=30 name=Piston level=3 path=/Voiture/Moteur/Piston subordinates=0\nTREE_REPORT max_depth=3 total_nodes=4"
  }
];
