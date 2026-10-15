/**
 * Exercices du chapitre 6 — Ordonnancement PERT / CPM & Flots de Réseaux.
 */
'use strict';

module.exports = [
  {
    id: 'ro2-c6-e1',
    chapter: 6,
    title: 'Dates au plus tôt (Forward Pass PERT/CPM)',
    level: 'n1',
    language: 'python',
    goal: 'Calculer la date de début au plus tôt de chaque tâche et la durée totale du projet.',
    brief:
      '<p>Dans un réseau d’ordonnancement sans cycle (DAG), la date de début au plus tôt $ES(i)$ d’une tâche $i$ ' +
      'est la date minimale à laquelle tous ses prédécesseurs immédiats sont achevés :<br>' +
      '$$ES(i) = \\max_{p \\in Pred(i)} (ES(p) + d_p)$$<br>' +
      '(avec $ES(racine) = 0$).</p>' +
      '<p>Lit sur l’entrée standard la liste des tâches au format :<br>' +
      '<code>nom:preds,duree | nom:preds,duree | ...</code><br>' +
      'où <code>preds</code> est une liste de noms séparés par des tirets (ex. <code>A-B</code>) ou <code>AUCUN</code>.<br>' +
      'Affiche :<br>' +
      '<code>DATES_ES: &lt;nom&gt;=&lt;ES&gt;,... DUREE_PROJET=&lt;Duree&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : calculer les dates au plus tôt (ES) de chaque tâche
`,
    hints: [
      'Parse chaque tâche dans un dictionnaire avec sa durée et ses prédécesseurs.',
      'Parcours les tâches dans l\'ordre de dépendance (ou itère jusqu\'à stabilisation des dates ES).'
    ],
    examples: [
      {
      stdin: 'A:AUCUN,3 | B:A,4 | C:A,2 | D:B-C,5',
      expected: 'DATES_ES: A=0,B=3,C=3,D=7 DUREE_PROJET=12',
      note: 'ES(A)=0. ES(B)=0+3=3. ES(C)=0+3=3. ES(D)=max(3+4, 3+2)=7. Fin D = 7+5=12.'
      }
    ],
    tests: [
      {
        label: 'Chaîne linéaire simple',
        stdin: 'A:AUCUN,4 | B:A,5 | C:B,6',
        expected: 'DATES_ES: A=0,B=4,C=9 DUREE_PROJET=15'
      },
      {
        label: 'Deux branches parallèles convergeant vers une tâche',
        stdin: 'A:AUCUN,5 | B:AUCUN,8 | C:A-B,3',
        expected: 'DATES_ES: A=0,B=0,C=8 DUREE_PROJET=11'
      },
      {
        label: 'Graphe à 5 nœuds',
        stdin: 'A:AUCUN,2 | B:A,3 | C:A,5 | D:B,4 | E:C-D,2',
        expected: 'DATES_ES: A=0,B=2,C=2,D=5,E=9 DUREE_PROJET=11'
      },
      {
        label: 'Tâche isolée en parallèle',
        stdin: 'A:AUCUN,10 | B:AUCUN,4',
        expected: 'DATES_ES: A=0,B=0 DUREE_PROJET=10'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = [p.strip() for p in ligne.split("|") if p.strip()]

taches = {}
ordre = []

for p in parts:
    nom, reste = p.split(":")
    preds_str, dur_str = reste.split(",")
    nom = nom.strip()
    duree = int(dur_str.strip())
    preds = []
    if preds_str.strip() != "AUCUN":
        preds = [pr.strip() for pr in preds_str.split("-") if pr.strip()]
    taches[nom] = {"duree": duree, "preds": preds}
    ordre.append(nom)

# Calcul des dates ES
es = {}
for _ in range(len(taches)):
    for nom in ordre:
        if not taches[nom]["preds"]:
            es[nom] = 0
        else:
            es[nom] = max(es[p] + taches[p]["duree"] for p in taches[nom]["preds"] if p in es)

fin_projet = max(es[nom] + taches[nom]["duree"] for nom in ordre)
es_str = ",".join(f"{nom}={es[nom]}" for nom in ordre)

print(f"DATES_ES: {es_str} DUREE_PROJET={fin_projet}")
`
  },
  {
    id: 'ro2-c6-e2',
    chapter: 6,
    title: 'Marges totales & Chemin critique',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la marge totale de chaque tâche et identifier le chemin critique du projet.',
    brief:
      '<p>La <strong>marge totale</strong> d’une tâche $i$ mesure le retard maximal qu’elle peut prendre ' +
      'sans retarder la date de fin globale du projet :<br>' +
      '$$MT(i) = LF(i) - ES(i) - d_i$$' +
      'où $ES$ est la date au plus tôt, $LF$ la date au plus tard d’achèvement, et $d_i$ la durée de la tâche.<br>' +
      'Une tâche est dite <strong>critique</strong> si sa marge totale est nulle ($MT = 0$).</p>' +
      '<p>Lit sur l’entrée standard une ligne au format :<br>' +
      '<code>nom:ES,LF,duree | nom:ES,LF,duree | ...</code>.<br>' +
      'Calcule la marge totale de chaque tâche.<br>' +
      'Affiche :<br>' +
      '<code>MARGES: nom=MT,... CRITIQUES: &lt;liste des tâches critiques séparées par des tirets&gt;</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : calculer MT = LF - ES - duree et lister les tâches critiques
`,
    hints: [
      'Pour chaque tâche, mt = lf - es - duree.',
      'Filtre les tâches avec mt == 0 pour former la chaîne critique.'
    ],
    examples: [
      {
      stdin: 'A:0,3,3 | B:3,7,4 | C:3,7,2 | D:7,12,5',
      expected: 'MARGES: A=0,B=0,C=2,D=0 CRITIQUES: A-B-D',
      note: 'MT(A)=3-0-3=0, MT(B)=7-3-4=0, MT(C)=7-3-2=2, MT(D)=12-7-5=0. Tâches critiques : A, B, D.'
      }
    ],
    tests: [
      {
        label: 'Toutes les tâches sont critiques (projet mono-branche)',
        stdin: 'A:0,4,4 | B:4,9,5 | C:9,12,3',
        expected: 'MARGES: A=0,B=0,C=0 CRITIQUES: A-B-C'
      },
      {
        label: 'Deux tâches avec marge positive',
        stdin: 'A:0,5,5 | B:0,5,2 | C:2,8,3 | D:5,10,5',
        expected: 'MARGES: A=0,B=3,C=3,D=0 CRITIQUES: A-D'
      },
      {
        label: 'Projet à 4 tâches avec bifurcation',
        stdin: 'X:0,2,2 | Y:2,6,4 | Z:2,6,1 | W:6,8,2',
        expected: 'MARGES: X=0,Y=0,Z=3,W=0 CRITIQUES: X-Y-W'
      },
      {
        label: 'Marges calculées sur des durées longues',
        stdin: 'T1:0,10,10 | T2:10,25,12 | T3:22,25,3',
        expected: 'MARGES: T1=0,T2=3,T3=0 CRITIQUES: T1-T3'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = [p.strip() for p in ligne.split("|") if p.strip()]

marges = []
critiques = []

for p in parts:
    nom, vals = p.split(":")
    nom = nom.strip()
    es_str, lf_str, dur_str = vals.split(",")
    es = int(es_str.strip())
    lf = int(lf_str.strip())
    dur = int(dur_str.strip())
    mt = lf - es - dur
    marges.append(f"{nom}={mt}")
    if mt == 0:
        critiques.append(nom)

print(f"MARGES: {','.join(marges)} CRITIQUES: {'-'.join(critiques)}")
`
  },
  {
    id: 'ro2-c6-e3',
    chapter: 6,
    title: 'Goulot d’étranglement de Ford-Fulkerson',
    level: 'n3',
    language: 'python',
    goal: 'Calculer la capacité résiduelle d’une chaîne augmentante et mettre à jour le flot dans un réseau.',
    brief:
      '<p>Dans l’algorithme de Ford-Fulkerson pour la recherche du <strong>flot maximal</strong>, ' +
      'chaque arc $(u, v)$ possède une capacité $c(u, v)$ et un flot actuel $f(u, v)$. ' +
      'La capacité résiduelle est $r(u, v) = c(u, v) - f(u, v)$.</p>' +
      '<p>Pour une chaîne augmentante $P = (s, v_1, v_2, \\dots, t)$, la valeur maximale de flot que l’on peut pousser ' +
      'est déterminée par le <strong>goulot d’étranglement</strong> (bottleneck capacity) :<br>' +
      '$$\\Delta = \\min_{(u, v) \\in P} r(u, v)$$</p>' +
      '<p>Lit sur l’entrée standard :<br>' +
      '<code>u1-v1:cap1,flot1 | u2-v2:cap2,flot2 | ... ; CHAINE: s-v1-v2-...-t</code>.<br>' +
      'Calcule $\\Delta$ et les nouvelles capacités résiduelles des arcs de la chaîne.<br>' +
      'Affiche :<br>' +
      '<code>DELTA=&lt;Delta&gt; ARCS_MAJ: u1-v1=&lt;nouveau_flot&gt;,...</code>.</p>',
    starter: `ligne = input().strip()

# À compléter : trouver la capacité résiduelle minimale de la chaîne et mettre à jour le flot
`,
    hints: [
      'Découpe par ";" pour séparer le réseau de la chaîne à augmenter.',
      'Pour chaque arc consécutif de la chaîne, calcule r = cap - flot et trouve min(r).'
    ],
    examples: [
      {
      stdin: 's-a:10,2 | a-t:8,1 | s-b:5,0 | b-t:5,0 ; CHAINE: s-a-t',
      expected: 'DELTA=7 ARCS_MAJ: s-a=9,a-t=8',
      note: 'Sur la chaîne s-a-t : r(s-a) = 10 - 2 = 8, r(a-t) = 8 - 1 = 7. Delta = min(8, 7) = 7. Nouveaux flots : s-a = 2+7 = 9, a-t = 1+7 = 8.'
      }
    ],
    tests: [
      {
        label: 'Chaîne à trois arcs avec saturation exacte',
        stdin: 's-1:15,5 | 1-2:10,2 | 2-t:8,4 ; CHAINE: s-1-2-t',
        expected: 'DELTA=4 ARCS_MAJ: s-1=9,1-2=6,2-t=8'
      },
      {
        label: 'Chaîne saturée dès le premier arc',
        stdin: 's-A:6,3 | A-t:12,1 ; CHAINE: s-A-t',
        expected: 'DELTA=3 ARCS_MAJ: s-A=6,A-t=4'
      },
      {
        label: 'Graphe avec réseau maillé',
        stdin: 's-u:20,10 | u-v:14,4 | v-t:18,12 ; CHAINE: s-u-v-t',
        expected: 'DELTA=6 ARCS_MAJ: s-u=16,u-v=10,v-t=18'
      },
      {
        label: 'Flot initialement nul sur toute la chaîne',
        stdin: 's-x:7,0 | x-t:5,0 ; CHAINE: s-x-t',
        expected: 'DELTA=5 ARCS_MAJ: s-x=5,x-t=5'
      }
    ],
    solution: `import sys

ligne = sys.stdin.readline().strip()
if not ligne:
    sys.exit(0)

parts = ligne.split(";")
arcs_raw = [a.strip() for a in parts[0].split("|") if a.strip()]
chaine_raw = parts[1].replace("CHAINE:", "").strip()
sommets_chaine = [s.strip() for s in chaine_raw.split("-") if s.strip()]

reseau = {}
for a in arcs_raw:
    arc_nom, vals = a.split(":")
    c_str, f_str = vals.split(",")
    reseau[arc_nom.strip()] = {
        "cap": int(c_str.strip()),
        "flot": int(f_str.strip())
    }

# Identifier les arcs de la chaîne
arcs_chaine = []
residuels = []

for i in range(len(sommets_chaine) - 1):
    u = sommets_chaine[i]
    v = sommets_chaine[i + 1]
    cle = f"{u}-{v}"
    if cle in reseau:
        r = reseau[cle]["cap"] - reseau[cle]["flot"]
        arcs_chaine.append(cle)
        residuels.append(r)

delta = min(residuels)

maj = []
for cle in arcs_chaine:
    nouveau_flot = reseau[cle]["flot"] + delta
    maj.append(f"{cle}={nouveau_flot}")

print(f"DELTA={delta} ARCS_MAJ: {','.join(maj)}")
`
  }
];
