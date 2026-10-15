/**
 * Exercices du chapitre 1 — Neurobiologie & Mémoires.
 */
'use strict';

module.exports = [
  {
    id: 'mc2-c1-e1',
    chapter: 1,
    title: 'Typologie des mémoires',
    level: 'n1',
    language: 'python',
    goal: 'Identifier le registre mnésique selon la durée et les caractéristiques de rétention.',
    brief:
      '<p>Le cerveau humain mobilise trois registres de mémoire distincts selon le modèle d’Atkinson et Shiffrin :</p>' +
      '<ul>' +
      '  <li><strong>Sensorielle</strong> : persistance très brève (quelques centaines de millisecondes), automatique et non filtrée.</li>' +
      '  <li><strong>Travail</strong> : mémoire à court terme manipulatrice, capacité limitée (30 secondes, empan de Miller).</li>' +
      '  <li><strong>Long_Terme</strong> : stockage durable illimité (sémantique, épisodique ou procédurale).</li>' +
      '</ul>' +
      '<p>Lit un identifiant de situation en minuscules sur l’entrée standard et affiche :<br>' +
      '- <code>flash_visuel_200ms</code>, <code>echo_sonore_1s</code>, <code>image_retinienne</code> &rarr; <code>Memoire: Sensorielle</code><br>' +
      '- <code>retenue_7_chiffres_30s</code>, <code>calcul_mental_intermediaire</code>, <code>phrase_en_cours_de_lecture</code> &rarr; <code>Memoire: Travail</code><br>' +
      '- <code>souvenir_enfance_10_ans</code>, <code>syntaxe_langage_python</code>, <code>savoir_faire_du_velo</code> &rarr; <code>Memoire: Long_Terme</code><br>' +
      'Pour toute autre valeur : <code>Memoire: Inconnu</code>.</p>',
    starter: `item = input().strip().lower()\n\n# À compléter : classifier selon Sensorielle, Travail ou Long_Terme\n`,
    hints: [
      'Associe chaque mot-clé à sa catégorie dans un dictionnaire Python.',
      'Utilise table.get(item, "Inconnu") pour la valeur de repli.'
    ],
    examples: [
      {
        stdin: 'flash_visuel_200ms',
        expected: 'Memoire: Sensorielle',
        note: 'La trace visuelle brève est une mémoire sensorielle iconique.'
      }
    ],
    tests: [
      {
        label: 'Mémoire de travail',
        stdin: 'calcul_mental_intermediaire',
        expected: 'Memoire: Travail'
      },
      {
        label: 'Mémoire à long terme sémantique',
        stdin: 'syntaxe_langage_python',
        expected: 'Memoire: Long_Terme'
      },
      {
        label: 'Entrée inconnue',
        stdin: 'telepathie_quantique',
        expected: 'Memoire: Inconnu'
      }
    ],
    solution: `item = input().strip().lower()

table = {
    "flash_visuel_200ms": "Sensorielle",
    "echo_sonore_1s": "Sensorielle",
    "image_retinienne": "Sensorielle",
    "retenue_7_chiffres_30s": "Travail",
    "calcul_mental_intermediaire": "Travail",
    "phrase_en_cours_de_lecture": "Travail",
    "souvenir_enfance_10_ans": "Long_Terme",
    "syntaxe_langage_python": "Long_Terme",
    "savoir_faire_du_velo": "Long_Terme"
}

cat = table.get(item, "Inconnu")
print(f"Memoire: {cat}")
`
  },
  {
    id: 'mc2-c1-e2',
    chapter: 1,
    title: 'Théorie de la charge cognitive de Sweller',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la charge cognitive totale et vérifier la disponibilité pour les apprentissages structurants.',
    brief:
      '<p>Selon John Sweller, la charge cognitive en mémoire de travail se compose de trois charges :</p>' +
      '<ul>' +
      '  <li><strong>Intrinsèque (I)</strong> : complexité propre du concept (notée sur 10).</li>' +
      '  <li><strong>Extrinsèque (E)</strong> : bruit parasite, mauvaise présentation, distractions (notée sur 10).</li>' +
      '  <li><strong>Germane (G)</strong> : effort utile dédié à la construction de schémas mentaux durables (notée sur 10).</li>' +
      '</ul>' +
      '<p>La charge totale d’encombrement est $C = I + E$. La capacité maximale de la mémoire de travail est fixée à <strong>7</strong> points.</p>' +
      '<p>Lit une ligne au format <code>I;E;G</code> sur l’entrée standard et affiche :<br>' +
      '- Si $I + E &gt; 7$ : <code>SURCHARGE (Charge: &lt;C&gt;, Germane_possible: 0)</code><br>' +
      '- Si $I + E \\le 7$ : calcul de la capacité restante disponible pour l’effort germane $G_{dispo} = \\min(G, 7 - C)$. ' +
      'Affiche <code>OPTIMAL (Charge: &lt;C&gt;, Germane_utile: &lt;G_dispo&gt;)</code>.</p>',
    starter: `ligne = input().strip()\n\n# À compléter : calculer I + E et évaluer l'état de surcharge cognitive\n`,
    hints: [
      'Découpe avec split(";") et convertis les trois valeurs en entiers.',
      'Compare la somme I + E au seuil critique de 7.'
    ],
    examples: [
      {
        stdin: '3;2;4',
        expected: 'OPTIMAL (Charge: 5, Germane_utile: 2)',
        note: 'Charge de 5 <= 7, reste 2 points pour l effort germane.'
      }
    ],
    tests: [
      {
        label: 'Surcharge cognitive critique',
        stdin: '5;4;2',
        expected: 'SURCHARGE (Charge: 9, Germane_possible: 0)'
      },
      {
        label: 'Charge saturée exacte',
        stdin: '4;3;5',
        expected: 'OPTIMAL (Charge: 7, Germane_utile: 0)'
      },
      {
        label: 'Charge légère avec plein potentiel germane',
        stdin: '2;1;3',
        expected: 'OPTIMAL (Charge: 3, Germane_utile: 3)'
      }
    ],
    solution: `ligne = input().strip()
i_str, e_str, g_str = ligne.split(";")
i = int(i_str)
e = int(e_str)
g = int(g_str)

charge = i + e
if charge > 7:
    print(f"SURCHARGE (Charge: {charge}, Germane_possible: 0)")
else:
    g_utile = min(g, 7 - charge)
    print(f"OPTIMAL (Charge: {charge}, Germane_utile: {g_utile})")
`
  },
  {
    id: 'mc2-c1-e3',
    chapter: 1,
    title: 'Agrégation de Chunks (Loi de Miller)',
    level: 'n3',
    language: 'python',
    goal: 'Structurer une séquence linéaire d’éléments en blocs mnémotechniques pour contourner la limite de Miller.',
    brief:
      '<p>George A. Miller a démontré que la mémoire de travail ne peut retenir que $7 \\pm 2$ éléments isolés. ' +
      'Le <strong>chunking</strong> (morcellement) regroupe les symboles en paquets significatifs pour démultiplier la capacité de rétention.</p>' +
      '<p>Lit une séquence de chiffres séparés par des espaces sur l’entrée standard (ex. <code>0 6 1 2 3 4 5 6 7 8</code>).<br>' +
      '- Si le nombre d’éléments est $\\le 7$, affiche : <code>Empan respecte (&lt;N&gt; elements): &lt;elements sans espace&gt;</code>.<br>' +
      '- Si le nombre d’éléments est $&gt; 7$, regroupe les éléments par blocs successifs de <strong>3 chiffres</strong> ' +
      '(le dernier bloc contenant le reste de 1, 2 ou 3 chiffres), reliés par des tirets <code>-</code>. ' +
      'Affiche : <code>Chunking requis (&lt;N&gt; elements -&gt; &lt;nb_chunks&gt; chunks): &lt;blocs&gt;</code>.</p>',
    starter: `elements = input().strip().split()\n\n# À compléter : découper en chunks si la taille dépasse 7\n`,
    hints: [
      'Vérifie la longueur len(elements).',
      'Pour le découpage en blocs de 3, utilise une boucle par pas de 3 : elements[i:i+3].'
    ],
    examples: [
      {
        stdin: '0 6 1 2 3 4 5 6 7 8',
        expected: 'Chunking requis (10 elements -> 4 chunks): 061-234-567-8',
        note: '10 chiffres dépassent l empan de 7 et sont découpés en 4 chunks.'
      }
    ],
    tests: [
      {
        label: 'Séquence courte respectant l empan',
        stdin: '4 8 1 5 1',
        expected: 'Empan respecte (5 elements): 48151'
      },
      {
        label: 'Séquence de 8 éléments',
        stdin: '1 2 3 4 5 6 7 8',
        expected: 'Chunking requis (8 elements -> 3 chunks): 123-456-78'
      },
      {
        label: 'Séquence de 9 éléments',
        stdin: '9 8 7 6 5 4 3 2 1',
        expected: 'Chunking requis (9 elements -> 3 chunks): 987-654-321'
      }
    ],
    solution: `elements = input().strip().split()
n = len(elements)

if n <= 7:
    concat = "".join(elements)
    print(f"Empan respecte ({n} elements): {concat}")
else:
    chunks = []
    for i in range(0, n, 3):
        bloc = "".join(elements[i:i+3])
        chunks.append(bloc)
    nb_chunks = len(chunks)
    res = "-".join(chunks)
    print(f"Chunking requis ({n} elements -> {nb_chunks} chunks): {res}")
`
  }
];
