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
    "brief": "<p>Le cerveau humain mobilise trois registres de mémoire distincts selon le modèle d’Atkinson et Shiffrin :</p><ul>  <li><strong>Sensorielle</strong> : persistance très brève (quelques centaines de millisecondes), automatique et non filtrée.</li>  <li><strong>Travail</strong> : mémoire à court terme manipulatrice, capacité limitée (30 secondes, empan de Miller).</li>  <li><strong>Long_Terme</strong> : stockage durable illimité (sémantique, épisodique ou procédurale).</li></ul><p>Analyse un identifiant de situation en minuscules fourni(e) dans les données du cas et affiche :<br>- <code>flash_visuel_200ms</code>, <code>echo_sonore_1s</code>, <code>image_retinienne</code> &rarr; <code>Memoire: Sensorielle</code><br>- <code>retenue_7_chiffres_30s</code>, <code>calcul_mental_intermediaire</code>, <code>phrase_en_cours_de_lecture</code> &rarr; <code>Memoire: Travail</code><br>- <code>souvenir_enfance_10_ans</code>, <code>syntaxe_langage_python</code>, <code>savoir_faire_du_velo</code> &rarr; <code>Memoire: Long_Terme</code><br>Pour toute autre valeur : <code>Memoire: Inconnu</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e1) — Typologie des mémoires\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Mémoire de travail]\n# Données : calcul_mental_intermediaire\nA_COMPLETER\n\n[Cas 2 — Mémoire à long terme sémantique]\n# Données : syntaxe_langage_python\nA_COMPLETER\n\n[Cas 3 — Entrée inconnue]\n# Données : telepathie_quantique\nA_COMPLETER\n",
    "hints": [
      "Associez chaque mot-clé à sa catégorie dans un la grille de critères.",
      "Utilisez table.get(item, \"Inconnu\") pour la valeur de repli."
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
    "title": "Simulation arithmétique d’un seuil fictif",
    "goal": "Appliquer un modèle arithmétique arbitraire sans diagnostiquer la mémoire de travail.",
    "brief": "<p>Cette simulation attribue trois nombres entiers entre 0 et 10 à I, E et G et fixe arbitrairement un seuil de 7. Ce barème n’est pas une mesure de charge cognitive et ne permet pas de diagnostiquer une personne.</p><p>Pour une ligne <code>I;E;G</code>, calculer <code>S = I + E</code>. Si S &gt; 7, afficher <code>HORS_SEUIL (Somme: &lt;S&gt;, Reste: 0)</code>. Sinon, calculer <code>R = min(G, 7 - S)</code> et afficher <code>DANS_SEUIL (Somme: &lt;S&gt;, Reste: &lt;R&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e2) — Simulation arithmétique d’un seuil fictif\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Somme supérieure au seuil fictif]\n# Données : 5;4;2\nA_COMPLETER\n\n[Cas 2 — Somme égale au seuil fictif]\n# Données : 4;3;5\nA_COMPLETER\n\n[Cas 3 — Somme inférieure au seuil fictif]\n# Données : 2;1;3\nA_COMPLETER\n",
    "hints": [
      "Les nombres et le seuil appartiennent uniquement au modèle fictif.",
      "Calculer la somme puis comparer au seuil de 7."
    ],
    "examples": [
      {
        "stdin": "3;2;4",
        "expected": "DANS_SEUIL (Somme: 5, Reste: 2)",
        "note": "Dans ce modèle, 7 − 5 laisse deux points fictifs."
      }
    ],
    "tests": [
      {
        "label": "Somme supérieure au seuil fictif",
        "stdin": "cas:1",
        "expected": "HORS_SEUIL (Somme: 9, Reste: 0)"
      },
      {
        "label": "Somme égale au seuil fictif",
        "stdin": "cas:2",
        "expected": "DANS_SEUIL (Somme: 7, Reste: 0)"
      },
      {
        "label": "Somme inférieure au seuil fictif",
        "stdin": "cas:3",
        "expected": "DANS_SEUIL (Somme: 3, Reste: 3)"
      }
    ],
    "solution": "[Exemple]\nDANS_SEUIL (Somme: 5, Reste: 2)\n\n[Cas 1 — Somme supérieure au seuil fictif]\nHORS_SEUIL (Somme: 9, Reste: 0)\n\n[Cas 2 — Somme égale au seuil fictif]\nDANS_SEUIL (Somme: 7, Reste: 0)\n\n[Cas 3 — Somme inférieure au seuil fictif]\nDANS_SEUIL (Somme: 3, Reste: 3)\n"
  },
  {
    "id": "mc2-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Regroupement de chiffres selon une règle fictive",
    "goal": "Appliquer une règle de découpage sans attribuer une capacité universelle à la mémoire.",
    "brief": "<p>Miller a discuté en 1956 des résultats de mémoire immédiate ; les capacités varient selon les tâches, les stratégies et les personnes. Cette grille utilise arbitrairement le nombre 7 et des groupes de trois chiffres : elle ne mesure pas la mémoire et ne garantit pas que ces groupes soient des unités significatives.</p><p>Pour une séquence de chiffres séparés par des espaces : si N &le; 7, afficher <code>COURTE (&lt;N&gt; elements): &lt;chiffres sans espace&gt;</code>. Sinon, regrouper les chiffres par trois avec un dernier groupe de un à trois chiffres, séparés par des tirets, et afficher <code>GROUPEMENT_MODELE (&lt;N&gt; elements -&gt; &lt;nombre&gt; groupes): &lt;groupes&gt;</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e3) — Regroupement de chiffres selon une règle fictive\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Séquence de cinq chiffres]\n# Données : 4 8 1 5 1\nA_COMPLETER\n\n[Cas 2 — Séquence de huit chiffres]\n# Données : 1 2 3 4 5 6 7 8\nA_COMPLETER\n\n[Cas 3 — Séquence de neuf chiffres]\n# Données : 9 8 7 6 5 4 3 2 1\nA_COMPLETER\n",
    "hints": [
      "Le seuil de 7 et les groupes de trois sont choisis pour cet exercice.",
      "Compter les chiffres puis conserver leur ordre."
    ],
    "examples": [
      {
        "stdin": "0 6 1 2 3 4 5 6 7 8",
        "expected": "GROUPEMENT_MODELE (10 elements -> 4 groupes): 061-234-567-8",
        "note": "Découpage selon la règle fictive, sans prédiction de mémorisation."
      }
    ],
    "tests": [
      {
        "label": "Séquence de cinq chiffres",
        "stdin": "cas:1",
        "expected": "COURTE (5 elements): 48151"
      },
      {
        "label": "Séquence de huit chiffres",
        "stdin": "cas:2",
        "expected": "GROUPEMENT_MODELE (8 elements -> 3 groupes): 123-456-78"
      },
      {
        "label": "Séquence de neuf chiffres",
        "stdin": "cas:3",
        "expected": "GROUPEMENT_MODELE (9 elements -> 3 groupes): 987-654-321"
      }
    ],
    "solution": "[Exemple]\nGROUPEMENT_MODELE (10 elements -> 4 groupes): 061-234-567-8\n\n[Cas 1 — Séquence de cinq chiffres]\nCOURTE (5 elements): 48151\n\n[Cas 2 — Séquence de huit chiffres]\nGROUPEMENT_MODELE (8 elements -> 3 groupes): 123-456-78\n\n[Cas 3 — Séquence de neuf chiffres]\nGROUPEMENT_MODELE (9 elements -> 3 groupes): 987-654-321\n"
  }
];
