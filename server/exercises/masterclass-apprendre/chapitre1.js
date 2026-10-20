/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "mc2-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Typologie des mémoires",
    "goal": "Identifier le registre mnésique selon la durée et les caractéristiques de rétention.",
    "brief": "<p>Le cerveau humain mobilise trois registres de mémoire distincts selon le modèle d’Atkinson et Shiffrin :</p><ul>  <li><strong>Sensorielle</strong> : persistance très brève (quelques centaines de millisecondes), automatique et non filtrée.</li>  <li><strong>Travail</strong> : mémoire à court terme manipulatrice, capacité limitée (30 secondes, empan de Miller).</li>  <li><strong>Long_Terme</strong> : stockage durable illimité (sémantique, épisodique ou procédurale).</li></ul><p>Lit un identifiant de situation en minuscules sur l’entrée standard et affiche :<br>- <code>flash_visuel_200ms</code>, <code>echo_sonore_1s</code>, <code>image_retinienne</code> &rarr; <code>Memoire: Sensorielle</code><br>- <code>retenue_7_chiffres_30s</code>, <code>calcul_mental_intermediaire</code>, <code>phrase_en_cours_de_lecture</code> &rarr; <code>Memoire: Travail</code><br>- <code>souvenir_enfance_10_ans</code>, <code>syntaxe_langage_python</code>, <code>savoir_faire_du_velo</code> &rarr; <code>Memoire: Long_Terme</code><br>Pour toute autre valeur : <code>Memoire: Inconnu</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e1) — Typologie des mémoires\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Mémoire de travail]\n# Données : calcul_mental_intermediaire\nA_COMPLETER\n\n[Cas 2 — Mémoire à long terme sémantique]\n# Données : syntaxe_langage_python\nA_COMPLETER\n\n[Cas 3 — Entrée inconnue]\n# Données : telepathie_quantique\nA_COMPLETER\n",
    "hints": [
      "Associe chaque mot-clé à sa catégorie dans un la grille de critères.",
      "Utilise table.get(item, \"Inconnu\") pour la valeur de repli."
    ],
    "examples": [
      {
        "stdin": "flash_visuel_200ms",
        "expected": "Memoire: Sensorielle",
        "note": "La trace visuelle brève est une mémoire sensorielle iconique."
      }
    ],
    "tests": [
      {
        "label": "Mémoire de travail",
        "stdin": "cas:1",
        "expected": "Memoire: Travail"
      },
      {
        "label": "Mémoire à long terme sémantique",
        "stdin": "cas:2",
        "expected": "Memoire: Long_Terme"
      },
      {
        "label": "Entrée inconnue",
        "stdin": "cas:3",
        "expected": "Memoire: Inconnu"
      }
    ],
    "solution": "[Exemple]\nMemoire: Sensorielle\n\n[Cas 1 — Mémoire de travail]\nMemoire: Travail\n\n[Cas 2 — Mémoire à long terme sémantique]\nMemoire: Long_Terme\n\n[Cas 3 — Entrée inconnue]\nMemoire: Inconnu\n"
  },
  {
    "id": "mc2-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Théorie de la charge cognitive de Sweller",
    "goal": "Calculer la charge cognitive totale et vérifier la disponibilité pour les apprentissages structurants.",
    "brief": "<p>Selon John Sweller, la charge cognitive en mémoire de travail se compose de trois charges :</p><ul>  <li><strong>Intrinsèque (I)</strong> : complexité propre du concept (notée sur 10).</li>  <li><strong>Extrinsèque (E)</strong> : bruit parasite, mauvaise présentation, distractions (notée sur 10).</li>  <li><strong>Germane (G)</strong> : effort utile dédié à la construction de schémas mentaux durables (notée sur 10).</li></ul><p>La charge totale d’encombrement est $C = I + E$. La capacité maximale de la mémoire de travail est fixée à <strong>7</strong> points.</p><p>Lit une ligne au format <code>I;E;G</code> sur l’entrée standard et affiche :<br>- Si $I + E &gt; 7$ : <code>SURCHARGE (Charge: &lt;C&gt;, Germane_possible: 0)</code><br>- Si $I + E \\le 7$ : calcul de la capacité restante disponible pour l’effort germane $G_{dispo} = \\min(G, 7 - C)$. Affiche <code>OPTIMAL (Charge: &lt;C&gt;, Germane_utile: &lt;G_dispo&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e2) — Théorie de la charge cognitive de Sweller\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Surcharge cognitive critique]\n# Données : 5;4;2\nA_COMPLETER\n\n[Cas 2 — Charge saturée exacte]\n# Données : 4;3;5\nA_COMPLETER\n\n[Cas 3 — Charge légère avec plein potentiel germane]\n# Données : 2;1;3\nA_COMPLETER\n",
    "hints": [
      "Découpe avec split(\";\") et convertis les trois valeurs en entiers.",
      "Compare la somme I + E au seuil critique de 7."
    ],
    "examples": [
      {
        "stdin": "3;2;4",
        "expected": "OPTIMAL (Charge: 5, Germane_utile: 2)",
        "note": "Charge de 5 <= 7, reste 2 points pour l effort germane."
      }
    ],
    "tests": [
      {
        "label": "Surcharge cognitive critique",
        "stdin": "cas:1",
        "expected": "SURCHARGE (Charge: 9, Germane_possible: 0)"
      },
      {
        "label": "Charge saturée exacte",
        "stdin": "cas:2",
        "expected": "OPTIMAL (Charge: 7, Germane_utile: 0)"
      },
      {
        "label": "Charge légère avec plein potentiel germane",
        "stdin": "cas:3",
        "expected": "OPTIMAL (Charge: 3, Germane_utile: 3)"
      }
    ],
    "solution": "[Exemple]\nOPTIMAL (Charge: 5, Germane_utile: 2)\n\n[Cas 1 — Surcharge cognitive critique]\nSURCHARGE (Charge: 9, Germane_possible: 0)\n\n[Cas 2 — Charge saturée exacte]\nOPTIMAL (Charge: 7, Germane_utile: 0)\n\n[Cas 3 — Charge légère avec plein potentiel germane]\nOPTIMAL (Charge: 3, Germane_utile: 3)\n"
  },
  {
    "id": "mc2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Agrégation de Chunks (Loi de Miller)",
    "goal": "Structurer une séquence linéaire d’éléments en blocs mnémotechniques pour contourner la limite de Miller.",
    "brief": "<p>George A. Miller a démontré que la mémoire de travail ne peut retenir que $7 \\pm 2$ éléments isolés. Le <strong>chunking</strong> (morcellement) regroupe les symboles en paquets significatifs pour démultiplier la capacité de rétention.</p><p>Lit une séquence de chiffres séparés par des espaces sur l’entrée standard (ex. <code>0 6 1 2 3 4 5 6 7 8</code>).<br>- Si le nombre d’éléments est $\\le 7$, affiche : <code>Empan respecte (&lt;N&gt; elements): &lt;elements sans espace&gt;</code>.<br>- Si le nombre d’éléments est $&gt; 7$, regroupe les éléments par blocs successifs de <strong>3 chiffres</strong> (le dernier bloc contenant le reste de 1, 2 ou 3 chiffres), reliés par des tirets <code>-</code>. Affiche : <code>Chunking requis (&lt;N&gt; elements -&gt; &lt;nb_chunks&gt; chunks): &lt;blocs&gt;</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e3) — Agrégation de Chunks (Loi de Miller)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Séquence courte respectant l empan]\n# Données : 4 8 1 5 1\nA_COMPLETER\n\n[Cas 2 — Séquence de 8 éléments]\n# Données : 1 2 3 4 5 6 7 8\nA_COMPLETER\n\n[Cas 3 — Séquence de 9 éléments]\n# Données : 9 8 7 6 5 4 3 2 1\nA_COMPLETER\n",
    "hints": [
      "Appliquez la stratégie de chunking : regroupez les items mémorisables en blocs homogènes de 3 ou 4 éléments.",
      "Respectez la capacité limite de la mémoire de travail (loi de Miller : 7 ± 2 éléments)."
    ],
    "examples": [
      {
        "stdin": "0 6 1 2 3 4 5 6 7 8",
        "expected": "Chunking requis (10 elements -> 4 chunks): 061-234-567-8",
        "note": "10 chiffres dépassent l empan de 7 et sont découpés en 4 chunks."
      }
    ],
    "tests": [
      {
        "label": "Séquence courte respectant l empan",
        "stdin": "cas:1",
        "expected": "Empan respecte (5 elements): 48151"
      },
      {
        "label": "Séquence de 8 éléments",
        "stdin": "cas:2",
        "expected": "Chunking requis (8 elements -> 3 chunks): 123-456-78"
      },
      {
        "label": "Séquence de 9 éléments",
        "stdin": "cas:3",
        "expected": "Chunking requis (9 elements -> 3 chunks): 987-654-321"
      }
    ],
    "solution": "[Exemple]\nChunking requis (10 elements -> 4 chunks): 061-234-567-8\n\n[Cas 1 — Séquence courte respectant l empan]\nEmpan respecte (5 elements): 48151\n\n[Cas 2 — Séquence de 8 éléments]\nChunking requis (8 elements -> 3 chunks): 123-456-78\n\n[Cas 3 — Séquence de 9 éléments]\nChunking requis (9 elements -> 3 chunks): 987-654-321\n"
  }
];
