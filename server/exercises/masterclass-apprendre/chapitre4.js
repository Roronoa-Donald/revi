/**
 * Exercices du chapitre 4 — Double Codage & Organisation de la Pensée.
 */
'use strict';

module.exports = [
  {
    id: 'mc2-c4-e1',
    chapter: 4,
    title: 'Théorie du double codage de Paivio',
    level: 'n1',
    language: 'python',
    goal: 'Évaluer la richesse mnémotechnique d’une fiche combinant texte et stimuli visuels.',
    brief:
      '<p>Allan Paivio a démontré que l’information encodée à la fois sous forme <strong>verbale</strong> (mots) ' +
      'et <strong>visuelle</strong> (schémas, icônes) double la probabilité de rappel grâce à deux canaux mnésiques indépendants.</p>' +
      '<p>Lit une ligne au format <code>mots_cles;schemas_visuels;liens_logiques</code> (entiers) sur l’entrée standard.<br>' +
      'Le score d’ancrage vaut : $Score = (1 \\times mots\\_cles) + (3 \\times schemas\\_visuels) + (2 \\times liens\\_logiques)$.<br>' +
      '- Si $schemas\\_visuels == 0$ : <code>Score: &lt;Score&gt; | Codage verbal pur (Risque d oubli eleve)</code>.<br>' +
      '- Si $schemas\\_visuels &gt; 0$ et $Score &ge; 15$ : <code>Score: &lt;Score&gt; | Double codage optimal (Trace renforcee)</code>.<br>' +
      '- Sinon : <code>Score: &lt;Score&gt; | Double codage partiel</code>.</p>',
    starter: `ligne = input().strip()\n\n# À compléter : calculer le score de double codage de Paivio\n`,
    hints: [
      'Multiplie les schémas par 3 et les liens par 2.',
      'Vérifie d abord si le nombre de schémas est nul pour alerter sur le codage purement verbal.'
    ],
    examples: [
      {
        stdin: '6;3;2',
        expected: 'Score: 19 | Double codage optimal (Trace renforcee)',
        note: '6 + 3*3 + 2*2 = 19 >= 15 avec présence de schémas visuels.'
      }
    ],
    tests: [
      {
        label: 'Codage purement textuel',
        stdin: '12;0;4',
        expected: 'Score: 20 | Codage verbal pur (Risque d oubli eleve)'
      },
      {
        label: 'Double codage partiel modeste',
        stdin: '4;1;2',
        expected: 'Score: 11 | Double codage partiel'
      },
      {
        label: 'Équilibre visuo-spatial parfait',
        stdin: '5;4;3',
        expected: 'Score: 23 | Double codage optimal (Trace renforcee)'
      }
    ],
    solution: `ligne = input().strip()
m_str, s_str, l_str = ligne.split(";")
m = int(m_str)
s = int(s_str)
l = int(l_str)

score = m + (3 * s) + (2 * l)

if s == 0:
    print(f"Score: {score} | Codage verbal pur (Risque d oubli eleve)")
elif score >= 15:
    print(f"Score: {score} | Double codage optimal (Trace renforcee)")
else:
    print(f"Score: {score} | Double codage partiel")
`
  },
  {
    id: 'mc2-c4-e2',
    chapter: 4,
    title: 'Aplatisseur de carte mentale (Mind Map)',
    level: 'n2',
    language: 'python',
    goal: 'Reconstituer les chemins hiérarchiques complets d’une carte conceptuelle à partir d’une liste indentée.',
    brief:
      '<p>Une carte mentale organise les concepts en arborescence depuis un nœud central (niveau 0) vers des branches ' +
      'principales (niveau 1) et des sous-branches (niveau 2). Le préfixe de tirets indique la profondeur (<code>- </code> = niv 0, <code>-- </code> = niv 1, <code>--- </code> = niv 2).</p>' +
      '<p>Lit plusieurs lignes sur l’entrée standard représentant une arborescence indentée.<br>' +
      'Pour chaque feuille de niveau le plus profond (niveau 2), affiche le chemin hiérarchique complet sous la forme :<br>' +
      '<code>[Niveau0] &gt; [Niveau1] &gt; [Niveau2]</code>.</p>',
    starter: `import sys\n\nlignes = sys.stdin.read().splitlines()\n\n# À compléter : traquer les niveaux courants et afficher les chemins complets\n`,
    hints: [
      'Garde une liste contextuelle des nœuds parents courants : parents[0], parents[1], parents[2].',
      'Quand tu rencontres un niveau 2, affiche " > ".join([parents[0], parents[1], parents[2]]).'
    ],
    examples: [
      {
        stdin: '- Cerveau\n-- Memoire\n--- Travail\n--- LongTerme\n-- Sommeil\n--- Paradoxal',
        expected: 'Cerveau > Memoire > Travail\nCerveau > Memoire > LongTerme\nCerveau > Sommeil > Paradoxal',
        note: 'Chaque feuille de niveau 3 tirets produit son chemin complet.'
      }
    ],
    tests: [
      {
        label: 'Arborescence à branche unique',
        stdin: '- Algorithme\n-- Tri\n--- TriFusion',
        expected: 'Algorithme > Tri > TriFusion'
      },
      {
        label: 'Branches multiples imbriquées',
        stdin: '- Sante\n-- Sport\n--- Cardio\n--- Renforcement\n-- Nutrition\n--- Proteines',
        expected: 'Sante > Sport > Cardio\nSante > Sport > Renforcement\nSante > Nutrition > Proteines'
      },
      {
        label: 'Arbre à sous-sections contrastées',
        stdin: '- Python\n-- Types\n--- Entiers\n--- Listes\n-- Outils\n--- Pip',
        expected: 'Python > Types > Entiers\nPython > Types > Listes\nPython > Outils > Pip'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

parents = {}
chemins = []

for l in lignes:
    if l.startswith("--- "):
        texte = l[4:].strip()
        parents[2] = texte
        if 0 in parents and 1 in parents:
            chemins.append(f"{parents[0]} > {parents[1]} > {parents[2]}")
    elif l.startswith("-- "):
        texte = l[3:].strip()
        parents[1] = texte
        if 2 in parents:
            del parents[2]
    elif l.startswith("- "):
        texte = l[2:].strip()
        parents[0] = texte
        parents.clear()
        parents[0] = texte

for c in chemins:
    print(c)
`
  },
  {
    id: 'mc2-c4-e3',
    chapter: 4,
    title: 'Le Palais de la mémoire (Méthode des Loci)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le placement et la restitution spatiale d’items mnémotechniques dans un itinéraire architectural.',
    brief:
      '<p>La <strong>méthode des Loci</strong> (attribuée à Simonide de Céos) ancre des informations abstraites ' +
      'dans des emplacements spatiaux familiers le long d’un itinéraire mental ordonné.</p>' +
      '<p>Lit deux lignes sur l’entrée standard :<br>' +
      '- Ligne 1 : catalogue des emplacements sous la forme <code>1:entree:clefs;2:salon:horloge;3:cuisine:pomme</code> (index:piece:objet).<br>' +
      '- Ligne 2 : une commande de recherche au format <code>OU_EST &lt;objet&gt;</code> ou <code>DANS &lt;piece&gt;</code>.<br>' +
      'Affiche :<br>' +
      '- Si <code>OU_EST &lt;objet&gt;</code> trouvé : <code>&lt;objet&gt; se trouve dans &lt;piece&gt; (Etape &lt;index&gt;)</code>.<br>' +
      '- Si <code>DANS &lt;piece&gt;</code> trouvée : <code>Dans &lt;piece&gt;, vous avez place : &lt;objet&gt; (Etape &lt;index&gt;)</code>.<br>' +
      '- Si l’élément recherché n’existe pas dans le palais : <code>Objet ou piece introuvable dans le palais</code>.</p>',
    starter: `palais_str = input().strip()\ncommande = input().strip()\n\n# À compléter : parser les loci et répondre à la requête de recherche\n`,
    hints: [
      'Découpe les loci avec split(";"), puis chaque bloc avec split(":").',
      'Stocke les données dans deux dictionnaires par objet et par pièce.'
    ],
    examples: [
      {
        stdin: '1:entree:clefs;2:salon:horloge;3:cuisine:pomme\nOU_EST horloge',
        expected: 'horloge se trouve dans salon (Etape 2)',
        note: 'L horloge est localisée au salon à l étape 2.'
      }
    ],
    tests: [
      {
        label: 'Recherche par pièce',
        stdin: '1:hall:valise;2:bureau:ordinateur;3:chambre:oreiller\nDANS bureau',
        expected: 'Dans bureau, vous avez place : ordinateur (Etape 2)'
      },
      {
        label: 'Recherche d un objet inconnu',
        stdin: '1:couloir:lampe;2:terrasse:plante\nOU_EST parapluie',
        expected: 'Objet ou piece introuvable dans le palais'
      },
      {
        label: 'Recherche première étape',
        stdin: '1:garage:velo;2:cave:bouteille\nOU_EST velo',
        expected: 'velo se trouve dans garage (Etape 1)'
      }
    ],
    solution: `palais_str = input().strip()
commande = input().strip()

loci = palais_str.split(";")
par_objet = {}
par_piece = {}

for loc in loci:
    if not loc.strip():
        continue
    idx, piece, obj = loc.split(":")
    par_objet[obj.lower()] = (piece, idx, obj)
    par_piece[piece.lower()] = (obj, idx, piece)

if commande.startswith("OU_EST "):
    cible = commande[7:].strip().lower()
    if cible in par_objet:
        piece, idx, orig_obj = par_objet[cible]
        print(f"{orig_obj} se trouve dans {piece} (Etape {idx})")
    else:
        print("Objet ou piece introuvable dans le palais")
elif commande.startswith("DANS "):
    cible = commande[5:].strip().lower()
    if cible in par_piece:
        obj, idx, orig_piece = par_piece[cible]
        print(f"Dans {orig_piece}, vous avez place : {obj} (Etape {idx})")
    else:
        print("Objet ou piece introuvable dans le palais")
else:
    print("Objet ou piece introuvable dans le palais")
`
  }
];
