/**
 * chapitre4.js — Études de cas du cours « masterclass-apprendre ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "mc2-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Théorie du double codage de Paivio",
    goal: "Évaluer la richesse mnémotechnique d’une fiche combinant texte et stimuli visuels.",
    brief: "<p>Allan Paivio a démontré que l’information encodée à la fois sous forme <strong>verbale</strong> (mots) et <strong>visuelle</strong> (schémas, icônes) double la probabilité de rappel grâce à deux canaux mnésiques indépendants.</p><p>Analyse une ligne au format <code>mots_cles;schemas_visuels;liens_logiques</code> (entiers) fourni(e) dans les données du cas.<br>Le score d’ancrage vaut : $Score = (1 \\times mots\\_cles) + (3 \\times schemas\\_visuels) + (2 \\times liens\\_logiques)$.<br>- Si $schemas\\_visuels == 0$ : <code>Score: &lt;Score&gt; | Codage verbal pur (Risque d oubli eleve)</code>.<br>- Si $schemas\\_visuels &gt; 0$ et $Score &ge; 15$ : <code>Score: &lt;Score&gt; | Double codage optimal (Trace renforcee)</code>.<br>- Sinon : <code>Score: &lt;Score&gt; | Double codage partiel</code>.</p>",
    starter: "# Grille d'analyse (mc2-c4-e1) — Théorie du double codage de Paivio\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Codage purement textuel]\n# Données : 12;0;4\nA_COMPLETER\n\n[Cas 2 — Double codage partiel modeste]\n# Données : 4;1;2\nA_COMPLETER\n\n[Cas 3 — Équilibre visuo-spatial parfait]\n# Données : 5;4;3\nA_COMPLETER\n",
    hints: [
          "Multiplie les schémas par 3 et les liens par 2.",
          "Vérifiez d abord si le nombre de schémas est nul pour alerter sur le codage purement verbal."
    ],
    examples: [
          {
                "stdin": "6;3;2",
                "expected": "Score: 19 | Double codage optimal (Trace renforcee)",
                "note": "6 + 3*3 + 2*2 = 19 >= 15 avec présence de schémas visuels."
          }
    ],
    tests: [
          {
                "label": "Codage purement textuel",
                "stdin": "cas:1",
                "expected": "Score: 20 | Codage verbal pur (Risque d oubli eleve)"
          },
          {
                "label": "Double codage partiel modeste",
                "stdin": "cas:2",
                "expected": "Score: 11 | Double codage partiel"
          },
          {
                "label": "Équilibre visuo-spatial parfait",
                "stdin": "cas:3",
                "expected": "Score: 23 | Double codage optimal (Trace renforcee)"
          }
    ],
    solution: "[Exemple]\nScore: 19 | Double codage optimal (Trace renforcee)\n\n[Cas 1 — Codage purement textuel]\nScore: 20 | Codage verbal pur (Risque d oubli eleve)\n\n[Cas 2 — Double codage partiel modeste]\nScore: 11 | Double codage partiel\n\n[Cas 3 — Équilibre visuo-spatial parfait]\nScore: 23 | Double codage optimal (Trace renforcee)\n"
  },
  {
    id: "mc2-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Aplatisseur de carte mentale (Mind Map)",
    goal: "Reconstituer les chemins hiérarchiques complets d’une carte conceptuelle à partir d’une liste indentée.",
    brief: "<p>Une carte mentale organise les concepts en arborescence depuis un nœud central (niveau 0) vers des branches principales (niveau 1) et des sous-branches (niveau 2). Le préfixe de tirets indique la profondeur (<code>- </code> = niv 0, <code>-- </code> = niv 1, <code>--- </code> = niv 2).</p><p>Analyse plusieurs lignes fournies dans les données du cas représentant une arborescence indentée.<br>Pour chaque feuille de niveau le plus profond (niveau 2), affiche le chemin hiérarchique complet sous la forme :<br><code>[Niveau0] &gt; [Niveau1] &gt; [Niveau2]</code>.</p>",
    starter: "# Grille d'analyse (mc2-c4-e2) — Aplatisseur de carte mentale (Mind Map)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Arborescence à branche unique]\n# Données : - Algorithme\n# Données : -- Tri\n# Données : --- TriFusion\nA_COMPLETER\n\n[Cas 2 — Branches multiples imbriquées]\n# Données : - Sante\n# Données : -- Sport\n# Données : --- Cardio\n# Données : --- Renforcement\n# Données : -- Nutrition\n# Données : --- Proteines\nA_COMPLETER\n\n[Cas 3 — Arbre à sous-sections contrastées]\n# Données : - Python\n# Données : -- Types\n# Données : --- Entiers\n# Données : --- Listes\n# Données : -- Outils\n# Données : --- Pip\nA_COMPLETER\n",
    hints: [
          "Gardez une liste contextuelle des nœuds parents courants : parents[0], parents[1], parents[2].",
          "Lorsqu’un niveau 2 est rencontré, affichez \" > \".join([parents[0], parents[1], parents[2]])."
    ],
    examples: [
          {
                "stdin": "- Cerveau\n-- Memoire\n--- Travail\n--- LongTerme\n-- Sommeil\n--- Paradoxal",
                "expected": "Cerveau > Memoire > Travail\nCerveau > Memoire > LongTerme\nCerveau > Sommeil > Paradoxal",
                "note": "Chaque feuille de niveau 3 tirets produit son chemin complet."
          }
    ],
    tests: [
          {
                "label": "Arborescence à branche unique",
                "stdin": "cas:1",
                "expected": "Algorithme > Tri > TriFusion"
          },
          {
                "label": "Branches multiples imbriquées",
                "stdin": "cas:2",
                "expected": "Sante > Sport > Cardio\nSante > Sport > Renforcement\nSante > Nutrition > Proteines"
          },
          {
                "label": "Arbre à sous-sections contrastées",
                "stdin": "cas:3",
                "expected": "Python > Types > Entiers\nPython > Types > Listes\nPython > Outils > Pip"
          }
    ],
    solution: "[Exemple]\nCerveau > Memoire > Travail\nCerveau > Memoire > LongTerme\nCerveau > Sommeil > Paradoxal\n\n[Cas 1 — Arborescence à branche unique]\nAlgorithme > Tri > TriFusion\n\n[Cas 2 — Branches multiples imbriquées]\nSante > Sport > Cardio\nSante > Sport > Renforcement\nSante > Nutrition > Proteines\n\n[Cas 3 — Arbre à sous-sections contrastées]\nPython > Types > Entiers\nPython > Types > Listes\nPython > Outils > Pip\n"
  },
  {
    id: "mc2-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Le Palais de la mémoire (Méthode des Loci)",
    goal: "Simuler le placement et la restitution spatiale d’items mnémotechniques dans un itinéraire architectural.",
    brief: "<p>La <strong>méthode des Loci</strong> (attribuée à Simonide de Céos) ancre des informations abstraites dans des emplacements spatiaux familiers le long d’un itinéraire mental ordonné.</p><p>Analyse deux lignes fournies dans les données du cas :<br>- Ligne 1 : catalogue des emplacements sous la forme <code>1:entree:clefs;2:salon:horloge;3:cuisine:pomme</code> (index:piece:objet).<br>- Ligne 2 : une commande de recherche au format <code>OU_EST &lt;objet&gt;</code> ou <code>DANS &lt;piece&gt;</code>.<br>Affiche :<br>- Si <code>OU_EST &lt;objet&gt;</code> trouvé : <code>&lt;objet&gt; se trouve dans &lt;piece&gt; (Etape &lt;index&gt;)</code>.<br>- Si <code>DANS &lt;piece&gt;</code> trouvée : <code>Dans &lt;piece&gt;, vous avez place : &lt;objet&gt; (Etape &lt;index&gt;)</code>.<br>- Si l’élément recherché n’existe pas dans le palais : <code>Objet ou piece introuvable dans le palais</code>.</p>",
    starter: "# Grille d'analyse (mc2-c4-e3) — Le Palais de la mémoire (Méthode des Loci)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Recherche par pièce]\n# Données : 1:hall:valise;2:bureau:ordinateur;3:chambre:oreiller\n# Données : DANS bureau\nA_COMPLETER\n\n[Cas 2 — Recherche d un objet inconnu]\n# Données : 1:couloir:lampe;2:terrasse:plante\n# Données : OU_EST parapluie\nA_COMPLETER\n\n[Cas 3 — Recherche première étape]\n# Données : 1:garage:velo;2:cave:bouteille\n# Données : OU_EST velo\nA_COMPLETER\n",
    hints: [
          "Découpez les loci avec l’extraction des champs, puis chaque bloc avec l’extraction des champs.",
          "Stocke les données dans deux dictionnaires par objet et par pièce."
    ],
    examples: [
          {
                "stdin": "1:entree:clefs;2:salon:horloge;3:cuisine:pomme\nOU_EST horloge",
                "expected": "horloge se trouve dans salon (Etape 2)",
                "note": "L horloge est localisée au salon à l étape 2."
          }
    ],
    tests: [
          {
                "label": "Recherche par pièce",
                "stdin": "cas:1",
                "expected": "Dans bureau, vous avez place : ordinateur (Etape 2)"
          },
          {
                "label": "Recherche d un objet inconnu",
                "stdin": "cas:2",
                "expected": "Objet ou piece introuvable dans le palais"
          },
          {
                "label": "Recherche première étape",
                "stdin": "cas:3",
                "expected": "velo se trouve dans garage (Etape 1)"
          }
    ],
    solution: "[Exemple]\nhorloge se trouve dans salon (Etape 2)\n\n[Cas 1 — Recherche par pièce]\nDans bureau, vous avez place : ordinateur (Etape 2)\n\n[Cas 2 — Recherche d un objet inconnu]\nObjet ou piece introuvable dans le palais\n\n[Cas 3 — Recherche première étape]\nvelo se trouve dans garage (Etape 1)\n"
  }
];
