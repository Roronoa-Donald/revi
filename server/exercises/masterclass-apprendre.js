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
    "brief": "<p>Cette grille distingue une mémoire <strong>Sensorielle</strong> très brève, une mémoire de <strong>Travail</strong> qui maintient et manipule temporairement l’information, et une mémoire à <strong>Long_Terme</strong> qui conserve des connaissances et expériences.</p><p>Classez chaque situation dans les données du cas : <code>Sensorielle</code>, <code>Travail</code>, <code>Long_Terme</code> ou <code>Inconnu</code> si elle ne correspond pas à un registre étudié. Répondez au format <code>Memoire: &lt;registre&gt;</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e1) — Typologie des mémoires\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Situation 1]\n# Données : calcul_mental_intermediaire\nA_COMPLETER\n\n[Cas 2 — Situation 2]\n# Données : syntaxe_langage_python\nA_COMPLETER\n\n[Cas 3 — Situation 3]\n# Données : telepathie_quantique\nA_COMPLETER\n",
    "hints": [
      "Examinez la durée de rétention et le rôle de l’information dans la situation.",
      "Ne rattachez pas une situation non étudiée à une catégorie par défaut."
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
        "label": "Situation 1",
        "stdin": "cas:1",
        "expected": "Memoire: Travail"
      },
      {
        "label": "Situation 2",
        "stdin": "cas:2",
        "expected": "Memoire: Long_Terme"
      },
      {
        "label": "Situation 3",
        "stdin": "cas:3",
        "expected": "Memoire: Inconnu"
      }
    ],
    "solution": "[Exemple]\nMemoire: Sensorielle\n\n[Cas 1 — Situation 1]\nMemoire: Travail\n\n[Cas 2 — Situation 2]\nMemoire: Long_Terme\n\n[Cas 3 — Situation 3]\nMemoire: Inconnu\n"
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
  },
  {
    "id": "mc2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Rappel actif vs Révision passive",
    "goal": "Distinguer les techniques passives illusoires des pratiques de rappel actif démontrées par la recherche.",
    "brief": "<p>Le rappel actif sollicite l’extraction d’informations en mémoire ; une révision passive s’appuie surtout sur des informations déjà visibles.</p><p>Classez la méthode de chaque cas avec l’un des libellés <code>Passive (Faible retention)</code>, <code>Active (Forte retention)</code> ou <code>Inconnue</code> si la pratique n’est pas identifiable. Répondez au format <code>Methode: &lt;classification&gt;</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c2-e1) — Rappel actif vs Révision passive\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Relecture surlignée]\n# Données : relecture_surlignee\nA_COMPLETER\n\n[Cas 2 — Technique Feynman feuille blanche]\n# Données : feuille_blanche_feynman\nA_COMPLETER\n\n[Cas 3 — Pratique inconnue]\n# Données : dormir_sur_son_livre\nA_COMPLETER\n",
    "hints": [
      "Créez deux ensembles (sets) pour les méthodes passives et actives.",
      "Utilisez les structures if/elif/else pour router la réponse."
    ],
    "examples": [
      {
        "stdin": "flashcard_recto_verso",
        "expected": "Methode: Active (Forte retention)",
        "note": "La flashcard sollicite l extraction de l information sans indice visible."
      }
    ],
    "tests": [
      {
        "label": "Relecture surlignée",
        "stdin": "cas:1",
        "expected": "Methode: Passive (Faible retention)"
      },
      {
        "label": "Technique Feynman feuille blanche",
        "stdin": "cas:2",
        "expected": "Methode: Active (Forte retention)"
      },
      {
        "label": "Pratique inconnue",
        "stdin": "cas:3",
        "expected": "Methode: Inconnue"
      }
    ],
    "solution": "[Exemple]\nMethode: Active (Forte retention)\n\n[Cas 1 — Relecture surlignée]\nMethode: Passive (Faible retention)\n\n[Cas 2 — Technique Feynman feuille blanche]\nMethode: Active (Forte retention)\n\n[Cas 3 — Pratique inconnue]\nMethode: Inconnue\n"
  },
  {
    "id": "mc2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Mesure de l’illusion de compétence",
    "goal": "Calculer l’écart entre l’auto-évaluation d’un apprenant et ses résultats réels à l’examen.",
    "brief": "<p>L’illusion de compétence (effet Dunning-Kruger) conduit les étudiants à surestimer leur niveau de préparation après une simple relecture. L’écart de calibration se mesure par $\\Delta = \\text{Note\\_Prédite} - \\text{Note\\_Réelle}$ (notes sur 20).</p><p>Lit une ligne au format <code>Note_Predite;Note_Reelle</code> et affiche :<br>- Si $\\Delta \\ge 4$ : <code>Illusion forte (+&lt;delta&gt; pts) : risque eleve d echec</code><br>- Si $1 \\le \\Delta &lt; 4$ : <code>Sur-optimisme modere (+&lt;delta&gt; pts)</code><br>- Si $-1 \\le \\Delta \\le 0$ : <code>Calibration fidele (&lt;delta&gt; pts)</code><br>- Si $\\Delta &lt; -1$ : <code>Sous-estimation (&lt;delta&gt; pts) : manque d assurance</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c2-e2) — Mesure de l’illusion de compétence\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Sur-optimisme modéré]\n# Données : 14;12\nA_COMPLETER\n\n[Cas 2 — Calibration fidèle exacte]\n# Données : 15;15\nA_COMPLETER\n\n[Cas 3 — Sous-estimation de l apprenant]\n# Données : 10;14\nA_COMPLETER\n",
    "hints": [
      "Convertissez les deux notes en float ou int avec l’extraction des champs.",
      "Attention au formatage du signe + pour les deltas positifs."
    ],
    "examples": [
      {
        "stdin": "16;11",
        "expected": "Illusion forte (+5 pts) : risque eleve d echec",
        "note": "Un écart de 5 points révèle une illusion de maîtrise critique."
      }
    ],
    "tests": [
      {
        "label": "Sur-optimisme modéré",
        "stdin": "cas:1",
        "expected": "Sur-optimisme modere (+2 pts)"
      },
      {
        "label": "Calibration fidèle exacte",
        "stdin": "cas:2",
        "expected": "Calibration fidele (0 pts)"
      },
      {
        "label": "Sous-estimation de l apprenant",
        "stdin": "cas:3",
        "expected": "Sous-estimation (-4 pts) : manque d assurance"
      }
    ],
    "solution": "[Exemple]\nIllusion forte (+5 pts) : risque eleve d echec\n\n[Cas 1 — Sur-optimisme modéré]\nSur-optimisme modere (+2 pts)\n\n[Cas 2 — Calibration fidèle exacte]\nCalibration fidele (0 pts)\n\n[Cas 3 — Sous-estimation de l apprenant]\nSous-estimation (-4 pts) : manque d assurance\n"
  },
  {
    "id": "mc2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Audit de clarté Feynman",
    "goal": "Analyser une explication rédigée pour vérifier l’absence de jargon inutile selon la méthode Feynman.",
    "brief": "<p>La <strong>technique de Richard Feynman</strong> stipule que l’on ne maîtrise un sujet que si l’on peut l’expliquer en termes simples à un novice de 12 ans. Un texte contenant plus de 20 % de mots complexes (définis comme des mots de <strong>strictement plus de 8 lettres</strong>) traduit souvent un jargon compensatoire.</p><p>Analyse une phrase ou paragraphe fourni(e) dans les données du cas.<br>Nettoie la ponctuation (<code>, . ! ? ; : ' \" ( )</code>), découpe en mots et calcule le ratio de mots complexes.<br>- Affiche le ratio sous forme : <code>Mots complexes: &lt;pourcentage&gt;% (&lt;nb_complexes&gt;/&lt;total&gt;)</code> (arrondi à 1 décimale).<br>- Si le ratio $&gt; 20{,}0\\,\\%$, affiche à la ligne : <code>Verdict: A vulgariser (Jargon excessif)</code>.<br>- Sinon, affiche à la ligne : <code>Verdict: Feynman valide (Explication claire)</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c2-e3) — Audit de clarté Feynman\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Explication simple et claire]\n# Données : Le coeur pompe le sang pour nourrir tous les organes du corps humain.\nA_COMPLETER\n\n[Cas 2 — Texte équilibré sous le seuil]\n# Données : Un ordinateur utilise des bits binaires pour faire des calculs tres vite.\nA_COMPLETER\n\n[Cas 3 — Texte chargé de termes techniques]\n# Données : La neuroplasticite synaptique consolide durablement l information cerebrale.\nA_COMPLETER\n",
    "hints": [
      "Isolez les mots-clés conceptuels porteurs de sens dans le texte en écartant les mots de liaison.",
      "Qualifiez les termes techniques nécessitant un ancrage en mémoire à long terme."
    ],
    "examples": [
      {
        "stdin": "Cette implementation algorithmique requiert une synchronisation asynchrone complexe",
        "expected": "Mots complexes: 50.0% (4/8)\nVerdict: A vulgariser (Jargon excessif)",
        "note": "4 mots sur 8 dépassent 8 lettres : le texte est trop technique."
      }
    ],
    "tests": [
      {
        "label": "Explication simple et claire",
        "stdin": "cas:1",
        "expected": "Mots complexes: 0.0% (0/13)\nVerdict: Feynman valide (Explication claire)"
      },
      {
        "label": "Texte équilibré sous le seuil",
        "stdin": "cas:2",
        "expected": "Mots complexes: 8.3% (1/12)\nVerdict: Feynman valide (Explication claire)"
      },
      {
        "label": "Texte chargé de termes techniques",
        "stdin": "cas:3",
        "expected": "Mots complexes: 75.0% (6/8)\nVerdict: A vulgariser (Jargon excessif)"
      }
    ],
    "solution": "[Exemple]\nMots complexes: 50.0% (4/8)\nVerdict: A vulgariser (Jargon excessif)\n\n[Cas 1 — Explication simple et claire]\nMots complexes: 0.0% (0/13)\nVerdict: Feynman valide (Explication claire)\n\n[Cas 2 — Texte équilibré sous le seuil]\nMots complexes: 8.3% (1/12)\nVerdict: Feynman valide (Explication claire)\n\n[Cas 3 — Texte chargé de termes techniques]\nMots complexes: 75.0% (6/8)\nVerdict: A vulgariser (Jargon excessif)\n"
  },
  {
    "id": "mc2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Courbe de l’oubli d’Ebbinghaus",
    "goal": "Calculer le pourcentage de rétention mnésique après un délai $t$ selon la formule exponentielle d’Hermann Ebbinghaus.",
    "brief": "<p>La modélisation mathématique d’Ebbinghaus définit la probabilité de rétention $R$ après un temps $t$ (en jours) par :</p><div class=\"formule-box\">$$R = e^{-\\frac{t}{S}}$$</div><p>où $S$ représente la <strong>stabilité de la trace mnésique</strong> (en jours), qui augmente à chaque rappel réussi.</p><p>Analyse une ligne au format <code>t;S</code> (entiers ou décimaux) fourni(e) dans les données du cas et affiche :<br><code>Retention: &lt;P&gt;%</code> (où $P = R \\times 100$, arrondi à 1 décimale).<br>- Si $P &lt; 50{,}0\\,\\%$, ajoute sur la ligne suivante : <code>Statut: Seuil critique (Reactivation urgente)</code>.<br>- Sinon : <code>Statut: Trace active</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c3-e1) — Courbe de l’oubli d’Ebbinghaus\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Oubli prononcé sous le seuil critique]\n# Données : 7;4\nA_COMPLETER\n\n[Cas 2 — Trace fraîche et stable]\n# Données : 1;10\nA_COMPLETER\n\n[Cas 3 — Échéance égale à la stabilité]\n# Données : 5;5\nA_COMPLETER\n",
    "hints": [
      "Utilisez math.exp(-t / s).",
      "Multiplie par 100 et arrondis avec round(p, 1)."
    ],
    "examples": [
      {
        "stdin": "3;5",
        "expected": "Retention: 54.9%\nStatut: Trace active",
        "note": "Après 3 jours avec une stabilité de 5 jours, la rétention estimée est de 54.9%."
      }
    ],
    "tests": [
      {
        "label": "Oubli prononcé sous le seuil critique",
        "stdin": "cas:1",
        "expected": "Retention: 17.4%\nStatut: Seuil critique (Reactivation urgente)"
      },
      {
        "label": "Trace fraîche et stable",
        "stdin": "cas:2",
        "expected": "Retention: 90.5%\nStatut: Trace active"
      },
      {
        "label": "Échéance égale à la stabilité",
        "stdin": "cas:3",
        "expected": "Retention: 36.8%\nStatut: Seuil critique (Reactivation urgente)"
      }
    ],
    "solution": "[Exemple]\nRetention: 54.9%\nStatut: Trace active\n\n[Cas 1 — Oubli prononcé sous le seuil critique]\nRetention: 17.4%\nStatut: Seuil critique (Reactivation urgente)\n\n[Cas 2 — Trace fraîche et stable]\nRetention: 90.5%\nStatut: Trace active\n\n[Cas 3 — Échéance égale à la stabilité]\nRetention: 36.8%\nStatut: Seuil critique (Reactivation urgente)\n"
  },
  {
    "id": "mc2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Simulateur de boîtes de Leitner",
    "goal": "Implémenter les règles de promotion et de rétrogradation de flashcards dans le système à 5 compartiments de Sebastian Leitner.",
    "brief": "<p>Le système de Leitner organise les fiches en 5 boîtes de fréquences de révision croissantes (Boîte 1 = quotidien, Boîte 5 = mensuel) :</p><ul>  <li><strong>Succès (rappel réussi)</strong> : la carte monte dans la boîte immédiatement supérieure : $B_{nouv} = \\min(5, B_{actuel} + 1)$.</li>  <li><strong>Échec (rappel raté)</strong> : la carte retombe <strong>immédiatement en Boîte 1</strong>, quelle que soit sa boîte de départ.</li></ul><p>Lit une ligne au format <code>carte_id;boite_actuelle;resultat</code> (où résultat vaut <code>succes</code> ou <code>echec</code>).<br>Affiche : <code>Carte &lt;carte_id&gt; : Boite &lt;boite_actuelle&gt; -&gt; Boite &lt;nouvelle_boite&gt; (&lt;statut&gt;)</code><br>où statut vaut <code>Promotion</code> si la boîte a augmenté, <code>Maintien palier max</code> si elle était déjà à 5 et réussit, ou <code>Retrogradation</code> en cas d’échec.</p>",
    "starter": "# Grille d'analyse (mc2-c3-e2) — Simulateur de boîtes de Leitner\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Échec cuisant depuis la boîte 4]\n# Données : CARD-105;4;echec\nA_COMPLETER\n\n[Cas 2 — Maintien au palier maximal]\n# Données : CARD-001;5;succes\nA_COMPLETER\n\n[Cas 3 — Promotion depuis la boîte 1]\n# Données : CARD-888;1;succes\nA_COMPLETER\n",
    "hints": [
      "Parse avec l’extraction des champs. Convertissez boite_actuelle en int.",
      "En cas d échec, la nouvelle boîte vaut 1."
    ],
    "examples": [
      {
        "stdin": "CARD-042;3;succes",
        "expected": "Carte CARD-042 : Boite 3 -> Boite 4 (Promotion)",
        "note": "Succès en boîte 3 entraîne une promotion en boîte 4."
      }
    ],
    "tests": [
      {
        "label": "Échec cuisant depuis la boîte 4",
        "stdin": "cas:1",
        "expected": "Carte CARD-105 : Boite 4 -> Boite 1 (Retrogradation)"
      },
      {
        "label": "Maintien au palier maximal",
        "stdin": "cas:2",
        "expected": "Carte CARD-001 : Boite 5 -> Boite 5 (Maintien palier max)"
      },
      {
        "label": "Promotion depuis la boîte 1",
        "stdin": "cas:3",
        "expected": "Carte CARD-888 : Boite 1 -> Boite 2 (Promotion)"
      }
    ],
    "solution": "[Exemple]\nCarte CARD-042 : Boite 3 -> Boite 4 (Promotion)\n\n[Cas 1 — Échec cuisant depuis la boîte 4]\nCarte CARD-105 : Boite 4 -> Boite 1 (Retrogradation)\n\n[Cas 2 — Maintien au palier maximal]\nCarte CARD-001 : Boite 5 -> Boite 5 (Maintien palier max)\n\n[Cas 3 — Promotion depuis la boîte 1]\nCarte CARD-888 : Boite 1 -> Boite 2 (Promotion)\n"
  },
  {
    "id": "mc2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Calculateur du facteur d’aisance SM-2",
    "goal": "Calculer la mise à jour du facteur de facilité (Easiness Factor) selon l’algorithme de Piotr Wozniak (SuperMemo SM-2 / Anki).",
    "brief": "<p>L’algorithme <strong>SM-2</strong> adapte l’espacement des révisions via le facteur de facilité $EF$ (initialement à 2.5). Après chaque test noté de 0 (oubli complet) à 5 (réponse parfaite sans hésitation), $EF$ est réévalué par :</p><div class=\"formule-box\">$$EF' = EF + \\left(0{,}1 - (5 - q) \\cdot (0{,}08 + (5 - q) \\cdot 0{,}02)\\right)$$</div><p>avec un plancher incompressible : $EF' \\ge 1{,}30$.</p><p>Analyse une ligne au format <code>EF_actuel;q</code> fourni(e) dans les données du cas (ex. <code>2.5;4</code>).<br>Affiche : <code>Ancien EF: &lt;EF&gt; | Note: &lt;q&gt;/5 | Nouveau EF: &lt;EF_arrondi_2_decimales&gt;</code>.<br>- Si $EF' \\ge 2{,}50$ : ajoute à la ligne suivante <code>Difficulte: Facile</code>.<br>- Si $1{,}80 \\le EF' &lt; 2{,}50$ : <code>Difficulte: Moderee</code>.<br>- Si $EF' &lt; 1{,}80$ : <code>Difficulte: Difficile</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c3-e3) — Calculateur du facteur d’aisance SM-2\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Note maximale de 5]\n# Données : 2.5;5\nA_COMPLETER\n\n[Cas 2 — Note faible de 2 entraînant une baisse]\n# Données : 2.2;2\nA_COMPLETER\n\n[Cas 3 — Note de 0 atteignant le plancher de 1.30]\n# Données : 1.4;0\nA_COMPLETER\n",
    "hints": [
      "Calculez le terme delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02).",
      "Vérifier que max(1.3, ef + delta) ne descende jamais sous 1.3."
    ],
    "examples": [
      {
        "stdin": "2.5;4",
        "expected": "Ancien EF: 2.50 | Note: 4/5 | Nouveau EF: 2.50\nDifficulte: Facile",
        "note": "Une note de 4 maintient le facteur d aisance initial de 2.50."
      }
    ],
    "tests": [
      {
        "label": "Note maximale de 5",
        "stdin": "cas:1",
        "expected": "Ancien EF: 2.50 | Note: 5/5 | Nouveau EF: 2.60\nDifficulte: Facile"
      },
      {
        "label": "Note faible de 2 entraînant une baisse",
        "stdin": "cas:2",
        "expected": "Ancien EF: 2.20 | Note: 2/5 | Nouveau EF: 1.88\nDifficulte: Moderee"
      },
      {
        "label": "Note de 0 atteignant le plancher de 1.30",
        "stdin": "cas:3",
        "expected": "Ancien EF: 1.40 | Note: 0/5 | Nouveau EF: 1.30\nDifficulte: Difficile"
      }
    ],
    "solution": "[Exemple]\nAncien EF: 2.50 | Note: 4/5 | Nouveau EF: 2.50\nDifficulte: Facile\n\n[Cas 1 — Note maximale de 5]\nAncien EF: 2.50 | Note: 5/5 | Nouveau EF: 2.60\nDifficulte: Facile\n\n[Cas 2 — Note faible de 2 entraînant une baisse]\nAncien EF: 2.20 | Note: 2/5 | Nouveau EF: 1.88\nDifficulte: Moderee\n\n[Cas 3 — Note de 0 atteignant le plancher de 1.30]\nAncien EF: 1.40 | Note: 0/5 | Nouveau EF: 1.30\nDifficulte: Difficile\n"
  },
  {
    "id": "mc2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Théorie du double codage de Paivio",
    "goal": "Évaluer la richesse mnémotechnique d’une fiche combinant texte et stimuli visuels.",
    "brief": "<p>Allan Paivio a démontré que l’information encodée à la fois sous forme <strong>verbale</strong> (mots) et <strong>visuelle</strong> (schémas, icônes) double la probabilité de rappel grâce à deux canaux mnésiques indépendants.</p><p>Analyse une ligne au format <code>mots_cles;schemas_visuels;liens_logiques</code> (entiers) fourni(e) dans les données du cas.<br>Le score d’ancrage vaut : $Score = (1 \\times mots\\_cles) + (3 \\times schemas\\_visuels) + (2 \\times liens\\_logiques)$.<br>- Si $schemas\\_visuels == 0$ : <code>Score: &lt;Score&gt; | Codage verbal pur (Risque d oubli eleve)</code>.<br>- Si $schemas\\_visuels &gt; 0$ et $Score &ge; 15$ : <code>Score: &lt;Score&gt; | Double codage optimal (Trace renforcee)</code>.<br>- Sinon : <code>Score: &lt;Score&gt; | Double codage partiel</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c4-e1) — Théorie du double codage de Paivio\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Codage purement textuel]\n# Données : 12;0;4\nA_COMPLETER\n\n[Cas 2 — Double codage partiel modeste]\n# Données : 4;1;2\nA_COMPLETER\n\n[Cas 3 — Équilibre visuo-spatial parfait]\n# Données : 5;4;3\nA_COMPLETER\n",
    "hints": [
      "Multiplie les schémas par 3 et les liens par 2.",
      "Vérifiez d abord si le nombre de schémas est nul pour alerter sur le codage purement verbal."
    ],
    "examples": [
      {
        "stdin": "6;3;2",
        "expected": "Score: 19 | Double codage optimal (Trace renforcee)",
        "note": "6 + 3*3 + 2*2 = 19 >= 15 avec présence de schémas visuels."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nScore: 19 | Double codage optimal (Trace renforcee)\n\n[Cas 1 — Codage purement textuel]\nScore: 20 | Codage verbal pur (Risque d oubli eleve)\n\n[Cas 2 — Double codage partiel modeste]\nScore: 11 | Double codage partiel\n\n[Cas 3 — Équilibre visuo-spatial parfait]\nScore: 23 | Double codage optimal (Trace renforcee)\n"
  },
  {
    "id": "mc2-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Aplatisseur de carte mentale (Mind Map)",
    "goal": "Reconstituer les chemins hiérarchiques complets d’une carte conceptuelle à partir d’une liste indentée.",
    "brief": "<p>Une carte mentale organise les concepts en arborescence depuis un nœud central (niveau 0) vers des branches principales (niveau 1) et des sous-branches (niveau 2). Le préfixe de tirets indique la profondeur (<code>- </code> = niv 0, <code>-- </code> = niv 1, <code>--- </code> = niv 2).</p><p>Analyse plusieurs lignes fournies dans les données du cas représentant une arborescence indentée.<br>Pour chaque feuille de niveau le plus profond (niveau 2), affiche le chemin hiérarchique complet sous la forme :<br><code>[Niveau0] &gt; [Niveau1] &gt; [Niveau2]</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c4-e2) — Aplatisseur de carte mentale (Mind Map)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Arborescence à branche unique]\n# Données : - Algorithme\n# Données : -- Tri\n# Données : --- TriFusion\nA_COMPLETER\n\n[Cas 2 — Branches multiples imbriquées]\n# Données : - Sante\n# Données : -- Sport\n# Données : --- Cardio\n# Données : --- Renforcement\n# Données : -- Nutrition\n# Données : --- Proteines\nA_COMPLETER\n\n[Cas 3 — Arbre à sous-sections contrastées]\n# Données : - Python\n# Données : -- Types\n# Données : --- Entiers\n# Données : --- Listes\n# Données : -- Outils\n# Données : --- Pip\nA_COMPLETER\n",
    "hints": [
      "Gardez une liste contextuelle des nœuds parents courants : parents[0], parents[1], parents[2].",
      "Lorsqu’un niveau 2 est rencontré, afficher \" > \".join([parents[0], parents[1], parents[2]])."
    ],
    "examples": [
      {
        "stdin": "- Cerveau\n-- Memoire\n--- Travail\n--- LongTerme\n-- Sommeil\n--- Paradoxal",
        "expected": "Cerveau > Memoire > Travail\nCerveau > Memoire > LongTerme\nCerveau > Sommeil > Paradoxal",
        "note": "Chaque feuille de niveau 3 tirets produit son chemin complet."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nCerveau > Memoire > Travail\nCerveau > Memoire > LongTerme\nCerveau > Sommeil > Paradoxal\n\n[Cas 1 — Arborescence à branche unique]\nAlgorithme > Tri > TriFusion\n\n[Cas 2 — Branches multiples imbriquées]\nSante > Sport > Cardio\nSante > Sport > Renforcement\nSante > Nutrition > Proteines\n\n[Cas 3 — Arbre à sous-sections contrastées]\nPython > Types > Entiers\nPython > Types > Listes\nPython > Outils > Pip\n"
  },
  {
    "id": "mc2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le Palais de la mémoire (Méthode des Loci)",
    "goal": "Simuler le placement et la restitution spatiale d’items mnémotechniques dans un itinéraire architectural.",
    "brief": "<p>La <strong>méthode des Loci</strong> (attribuée à Simonide de Céos) ancre des informations abstraites dans des emplacements spatiaux familiers le long d’un itinéraire mental ordonné.</p><p>Analyse deux lignes fournies dans les données du cas :<br>- Ligne 1 : catalogue des emplacements sous la forme <code>1:entree:clefs;2:salon:horloge;3:cuisine:pomme</code> (index:piece:objet).<br>- Ligne 2 : une commande de recherche au format <code>OU_EST &lt;objet&gt;</code> ou <code>DANS &lt;piece&gt;</code>.<br>Affiche :<br>- Si <code>OU_EST &lt;objet&gt;</code> trouvé : <code>&lt;objet&gt; se trouve dans &lt;piece&gt; (Etape &lt;index&gt;)</code>.<br>- Si <code>DANS &lt;piece&gt;</code> trouvée : <code>Dans &lt;piece&gt;, vous avez place : &lt;objet&gt; (Etape &lt;index&gt;)</code>.<br>- Si l’élément recherché n’existe pas dans le palais : <code>Objet ou piece introuvable dans le palais</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c4-e3) — Le Palais de la mémoire (Méthode des Loci)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Recherche par pièce]\n# Données : 1:hall:valise;2:bureau:ordinateur;3:chambre:oreiller\n# Données : DANS bureau\nA_COMPLETER\n\n[Cas 2 — Recherche d un objet inconnu]\n# Données : 1:couloir:lampe;2:terrasse:plante\n# Données : OU_EST parapluie\nA_COMPLETER\n\n[Cas 3 — Recherche première étape]\n# Données : 1:garage:velo;2:cave:bouteille\n# Données : OU_EST velo\nA_COMPLETER\n",
    "hints": [
      "Découpez les loci avec l’extraction des champs, puis chaque bloc avec l’extraction des champs.",
      "Stocke les données dans deux dictionnaires par objet et par pièce."
    ],
    "examples": [
      {
        "stdin": "1:entree:clefs;2:salon:horloge;3:cuisine:pomme\nOU_EST horloge",
        "expected": "horloge se trouve dans salon (Etape 2)",
        "note": "L horloge est localisée au salon à l étape 2."
      }
    ],
    "tests": [
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
    "solution": "[Exemple]\nhorloge se trouve dans salon (Etape 2)\n\n[Cas 1 — Recherche par pièce]\nDans bureau, vous avez place : ordinateur (Etape 2)\n\n[Cas 2 — Recherche d un objet inconnu]\nObjet ou piece introuvable dans le palais\n\n[Cas 3 — Recherche première étape]\nvelo se trouve dans garage (Etape 1)\n"
  },
  {
    "id": "mc2-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Générateur de session entrelacée (Interleaving)",
    "goal": "Construire une séquence d’étude alternée pour déjouer le piège de la pratique bloquée.",
    "brief": "<p>La <strong>pratique bloquée</strong> (étudier le sujet A pendant 3 h, puis B pendant 3 h) crée une fausse aisance. L’<strong>entrelacement</strong> (alterner A, B, C par blocs de 45 minutes) force le cerveau à choisir la bonne stratégie de résolution et multiplie par deux la rétention à long terme (Rohrer &amp; Taylor).</p><p>Analyse une ligne fourni(e) dans les données du cas avec la liste des matières séparées par des virgules et le nombre total de blocs souhaités (ex. <code>Maths,Physique,Anglais;5</code>).<br>Génère la séquence entrelacée en alternant cycliquement les matières de façon à ce que deux blocs consécutifs ne traitent jamais de la même matière.<br>Affiche : <code>Sequence entrelacee : &lt;m1&gt; -&gt; &lt;m2&gt; -&gt; &lt;m3&gt; ...</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c5-e1) — Générateur de session entrelacée (Interleaving)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux matières en alternance stricte]\n# Données : Algorithme,BaseDeDonnees;4\nA_COMPLETER\n\n[Cas 2 — Trois matières sur 3 blocs]\n# Données : Droit,Reseau,Python;3\nA_COMPLETER\n\n[Cas 3 — Cycle étendu à 6 blocs]\n# Données : A,B,C;6\nA_COMPLETER\n",
    "hints": [
      "Organisez l’apprentissage distribué en intercalant les sessions de révision selon le modèle d’Ebbinghaus.",
      "Alternez les différentes matières de manière cyclique pour favoriser la consolidation synaptique."
    ],
    "examples": [
      {
        "stdin": "Maths,Physique,Anglais;5",
        "expected": "Sequence entrelacee : Maths -> Physique -> Anglais -> Maths -> Physique",
        "note": "Les 5 blocs alternent strictement les 3 matières disponibles."
      }
    ],
    "tests": [
      {
        "label": "Deux matières en alternance stricte",
        "stdin": "cas:1",
        "expected": "Sequence entrelacee : Algorithme -> BaseDeDonnees -> Algorithme -> BaseDeDonnees"
      },
      {
        "label": "Trois matières sur 3 blocs",
        "stdin": "cas:2",
        "expected": "Sequence entrelacee : Droit -> Reseau -> Python"
      },
      {
        "label": "Cycle étendu à 6 blocs",
        "stdin": "cas:3",
        "expected": "Sequence entrelacee : A -> B -> C -> A -> B -> C"
      }
    ],
    "solution": "[Exemple]\nSequence entrelacee : Maths -> Physique -> Anglais -> Maths -> Physique\n\n[Cas 1 — Deux matières en alternance stricte]\nSequence entrelacee : Algorithme -> BaseDeDonnees -> Algorithme -> BaseDeDonnees\n\n[Cas 2 — Trois matières sur 3 blocs]\nSequence entrelacee : Droit -> Reseau -> Python\n\n[Cas 3 — Cycle étendu à 6 blocs]\nSequence entrelacee : A -> B -> C -> A -> B -> C\n"
  },
  {
    "id": "mc2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Typologie des erreurs cognitives",
    "goal": "Diagnostiquer la cause profonde d’un échec pour prescrire le remède pédagogique adapté.",
    "brief": "<p>En métacognition, une erreur n’est pas une faute mais une information sur l’état du modèle mental. On distingue :</p><ul>  <li><code>ENC</code> (Erreur d’encodage) : information mal lue, comprise de travers ou fragmentaire. Remède : <em>Relire avec attention et reformuler avec ses propres mots</em>.</li>  <li><code>REC</code> (Erreur de récupération) : l’information est sue mais inaccessible au moment voulu. Remède : <em>Multiplier les flashcards et indices de rappel</em>.</li>  <li><code>TRA</code> (Erreur de transfert) : incapacité à appliquer la règle dans un contexte inhabituel. Remède : <em>Varier les exercices et pratiquer l’entrelacement</em>.</li></ul><p>Analyse une ligne au format <code>code;matiere</code> fourni(e) dans les données du cas.<br>Affiche : <code>Diagnostic [&lt;matiere&gt;] : &lt;Nom_Erreur&gt; -&gt; Remede : &lt;Action&gt;</code>.<br>Si le code est inconnu : <code>Erreur non repertoriee</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c5-e2) — Typologie des erreurs cognitives\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Erreur d encodage]\n# Données : ENC;Droit Informatique\nA_COMPLETER\n\n[Cas 2 — Erreur de transfert]\n# Données : TRA;Algorithmique\nA_COMPLETER\n\n[Cas 3 — Code d erreur inconnu]\n# Données : XYZ;Chimie\nA_COMPLETER\n",
    "hints": [
      "Utilisez un dictionnaire contenant les tuples (Nom_Erreur, Action).",
      "Attention à la casse des codes ENC, REC, TRA."
    ],
    "examples": [
      {
        "stdin": "REC;Probabilites",
        "expected": "Diagnostic [Probabilites] : Erreur de recuperation -> Remede : Multiplier les flashcards et indices de rappel",
        "note": "Le code REC correspond au défaut de récupération en mémoire."
      }
    ],
    "tests": [
      {
        "label": "Erreur d encodage",
        "stdin": "cas:1",
        "expected": "Diagnostic [Droit Informatique] : Erreur d encodage -> Remede : Relire avec attention et reformuler avec ses propres mots"
      },
      {
        "label": "Erreur de transfert",
        "stdin": "cas:2",
        "expected": "Diagnostic [Algorithmique] : Erreur de transfert -> Remede : Varier les exercices et pratiquer l entrelacement"
      },
      {
        "label": "Code d erreur inconnu",
        "stdin": "cas:3",
        "expected": "Erreur non repertoriee"
      }
    ],
    "solution": "[Exemple]\nDiagnostic [Probabilites] : Erreur de recuperation -> Remede : Multiplier les flashcards et indices de rappel\n\n[Cas 1 — Erreur d encodage]\nDiagnostic [Droit Informatique] : Erreur d encodage -> Remede : Relire avec attention et reformuler avec ses propres mots\n\n[Cas 2 — Erreur de transfert]\nDiagnostic [Algorithmique] : Erreur de transfert -> Remede : Varier les exercices et pratiquer l entrelacement\n\n[Cas 3 — Code d erreur inconnu]\nErreur non repertoriee\n"
  },
  {
    "id": "mc2-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Calcul d’un taux et classement dans des bandes fictives",
    "goal": "Calculer un pourcentage et appliquer des seuils fictifs sans conclure sur un apprentissage individuel.",
    "brief": "<p>Wilson et al. (2019) étudient des modèles de classification binaire sous certaines hypothèses. Leur résultat autour de 85 % ne constitue pas un optimum universel pour un étudiant. Les bandes de cette grille sont fictives : elles ne permettent ni de diagnostiquer la difficulté ni de prédire la progression.</p><p>Pour <code>reussis;total</code>, avec 0 &le; reussis &le; total et total &gt; 0, calculer le pourcentage exact T puis l’afficher à une décimale : <code>Taux: &lt;T&gt;%</code>. Comparer T avant arrondi : au-dessus de 90, afficher <code>BANDE: AU_DESSUS_90</code> ; de 80 à 90 inclus, <code>BANDE: DE_80_A_90</code> ; en dessous de 80, <code>BANDE: SOUS_80</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c5-e3) — Calcul d’un taux et classement dans des bandes fictives\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Taux de 95 pour cent]\n# Données : 19;20\nA_COMPLETER\n\n[Cas 2 — Taux de 60 pour cent]\n# Données : 12;20\nA_COMPLETER\n\n[Cas 3 — Borne basse de la bande fictive]\n# Données : 8;10\nA_COMPLETER\n",
    "hints": [
      "Calculer 100 × réussis / total.",
      "Comparer avant d’arrondir le taux affiché."
    ],
    "examples": [
      {
        "stdin": "17;20",
        "expected": "Taux: 85.0%\nBANDE: DE_80_A_90",
        "note": "Le taux est dans la bande fictive, sans conclusion sur la progression."
      }
    ],
    "tests": [
      {
        "label": "Taux de 95 pour cent",
        "stdin": "cas:1",
        "expected": "Taux: 95.0%\nBANDE: AU_DESSUS_90"
      },
      {
        "label": "Taux de 60 pour cent",
        "stdin": "cas:2",
        "expected": "Taux: 60.0%\nBANDE: SOUS_80"
      },
      {
        "label": "Borne basse de la bande fictive",
        "stdin": "cas:3",
        "expected": "Taux: 80.0%\nBANDE: DE_80_A_90"
      }
    ],
    "solution": "[Exemple]\nTaux: 85.0%\nBANDE: DE_80_A_90\n\n[Cas 1 — Taux de 95 pour cent]\nTaux: 95.0%\nBANDE: AU_DESSUS_90\n\n[Cas 2 — Taux de 60 pour cent]\nTaux: 60.0%\nBANDE: SOUS_80\n\n[Cas 3 — Borne basse de la bande fictive]\nTaux: 80.0%\nBANDE: DE_80_A_90\n"
  },
  {
    "id": "mc2-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Planificateur de cycles Pomodoro",
    "goal": "Déterminer le découpage optimal d’une séance d’étude en blocs de concentration et pauses régénératrices.",
    "brief": "<p>La technique Pomodoro (Francesco Cirillo) rythme le travail par cycles de <strong>25 minutes de focus</strong> suivis de <strong>5 minutes de pause courte</strong>. Après 4 cycles consécutifs, une <strong>pause longue de 20 minutes</strong> est obligatoire.</p><p>Analyse la durée totale disponible en minutes fourni(e) dans les données du cas (ex. <code>120</code>).<br>Calculez le nombre de cycles complets de 25 minutes possibles et le temps total de pause accordé.<br>Règle : chaque cycle réalisé donne droit à une pause de 5 minutes, sauf le 4e cycle qui donne droit à 20 minutes.<br>Affiche : <code>Cycles complets: &lt;N&gt; | Temps de travail: &lt;N*25&gt; min | Temps de pause: &lt;P&gt; min</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c6-e1) — Planificateur de cycles Pomodoro\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Séance courte d une demi-heure]\n# Données : 30\nA_COMPLETER\n\n[Cas 2 — Quatre cycles avec pause longue]\n# Données : 140\nA_COMPLETER\n\n[Cas 3 — Trois cycles]\n# Données : 90\nA_COMPLETER\n",
    "hints": [
      "Utilisez une boucle tant que le temps restant permet au moins un bloc de 25 min.",
      "Si c est le 4e cycle, la pause vaut 20 min au lieu de 5 min."
    ],
    "examples": [
      {
        "stdin": "60",
        "expected": "Cycles complets: 2 | Temps de travail: 50 min | Temps de pause: 10 min",
        "note": "En 60 min, on peut caler 2 cycles (25+5 + 25+5 = 60 min)."
      }
    ],
    "tests": [
      {
        "label": "Séance courte d une demi-heure",
        "stdin": "cas:1",
        "expected": "Cycles complets: 1 | Temps de travail: 25 min | Temps de pause: 5 min"
      },
      {
        "label": "Quatre cycles avec pause longue",
        "stdin": "cas:2",
        "expected": "Cycles complets: 4 | Temps de travail: 100 min | Temps de pause: 35 min"
      },
      {
        "label": "Trois cycles",
        "stdin": "cas:3",
        "expected": "Cycles complets: 3 | Temps de travail: 75 min | Temps de pause: 15 min"
      }
    ],
    "solution": "[Exemple]\nCycles complets: 2 | Temps de travail: 50 min | Temps de pause: 10 min\n\n[Cas 1 — Séance courte d une demi-heure]\nCycles complets: 1 | Temps de travail: 25 min | Temps de pause: 5 min\n\n[Cas 2 — Quatre cycles avec pause longue]\nCycles complets: 4 | Temps de travail: 100 min | Temps de pause: 35 min\n\n[Cas 3 — Trois cycles]\nCycles complets: 3 | Temps de travail: 75 min | Temps de pause: 15 min\n"
  },
  {
    "id": "mc2-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Indice de calibration métacognitive (Score de Brier)",
    "goal": "Quantifier la précision métacognitive d’un apprenant en mesurant l’écart quadratique moyen entre confiance et exactitude.",
    "brief": "<p>En psychologie cognitive, le <strong>score de Brier</strong> évalue l’étalonnage d’un individu : $$BS = \\frac{1}{N} \\sum_{i=1}^N (c_i - o_i)^2$$ où $c_i \\in [0, 1]$ est la probabilité de réussite estimée par l’élève et $o_i \\in \\{0, 1\\}$ est le résultat réel (1 si juste, 0 si faux).</p><p>Un score proche de 0 indique une calibration parfaite ; un score supérieur à 0.25 indique une métacognition défaillante.</p><p>Lit une ligne contenant une suite de paires <code>confiance,resultat</code> séparées par des points-virgules (ex. <code>0.9,1;0.8,0;0.6,1</code>).<br>Calculez le score de Brier moyen arrondi à 3 décimales.<br>Affiche : <code>Score Brier: &lt;BS&gt; | Metacognition: &lt;Qualite&gt;</code><br>avec Qualite : <code>Excellente</code> si $BS \\le 0{,}100$, <code>Correcte</code> si $0{,}100 &lt; BS \\le 0{,}250$, et <code>Médiocre (A réétalonner)</code> si $BS &gt; 0{,}250$.</p>",
    "starter": "# Grille d'analyse (mc2-c6-e2) — Indice de calibration métacognitive (Score de Brier)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Surconfiance massive avec échecs]\n# Données : 0.9,0;0.8,0;0.7,0\nA_COMPLETER\n\n[Cas 2 — Calibration modérée]\n# Données : 0.8,1;0.4,0;0.7,1;0.5,0\nA_COMPLETER\n\n[Cas 3 — Calibration parfaite 100%]\n# Données : 1.0,1;0.0,0\nA_COMPLETER\n",
    "hints": [
      "Découpez avec l’extraction des champs puis chaque élément avec l’extraction des champs.",
      "Somme (c - o)**2 et divise par le nombre total de paires."
    ],
    "examples": [
      {
        "stdin": "0.9,1;0.8,1;0.7,1",
        "expected": "Score Brier: 0.047 | Metacognition: Excellente",
        "note": "Écarts quadratiques très faibles : excellente lucidité métacognitive."
      }
    ],
    "tests": [
      {
        "label": "Surconfiance massive avec échecs",
        "stdin": "cas:1",
        "expected": "Score Brier: 0.647 | Metacognition: Médiocre (A réétalonner)"
      },
      {
        "label": "Calibration modérée",
        "stdin": "cas:2",
        "expected": "Score Brier: 0.135 | Metacognition: Correcte"
      },
      {
        "label": "Calibration parfaite 100%",
        "stdin": "cas:3",
        "expected": "Score Brier: 0.000 | Metacognition: Excellente"
      }
    ],
    "solution": "[Exemple]\nScore Brier: 0.047 | Metacognition: Excellente\n\n[Cas 1 — Surconfiance massive avec échecs]\nScore Brier: 0.647 | Metacognition: Médiocre (A réétalonner)\n\n[Cas 2 — Calibration modérée]\nScore Brier: 0.135 | Metacognition: Correcte\n\n[Cas 3 — Calibration parfaite 100%]\nScore Brier: 0.000 | Metacognition: Excellente\n"
  },
  {
    "id": "mc2-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Rétroplanning de révision espacée avant examen",
    "goal": "Construire un échéancier de rappels espacés pour un ensemble de chapitres jusqu’au jour de l’épreuve.",
    "brief": "<p>Pour mémoriser durablement sans bachotage de dernière minute, les révisions doivent suivre les jalons de rappel espacé standardisés : <strong>J+1</strong>, <strong>J+3</strong>, <strong>J+7</strong> et <strong>J+14</strong> après l’apprentissage initial (J0).</p><p>Lit une ligne au format <code>chapitre;jour_apprentissage_J0</code> (où jour_apprentissage est un entier, ex. <code>1</code>).<br>Affichez le calendrier des rappels programmés sous la forme :<br><code>Planning [&lt;chapitre&gt;] : J0=&lt;j0&gt; -&gt; R1=J&lt;j0+1&gt; -&gt; R2=J&lt;j0+3&gt; -&gt; R3=J&lt;j0+7&gt; -&gt; R4=J&lt;j0+14&gt;</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c6-e3) — Rétroplanning de révision espacée avant examen\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Chapitre appris au jour 5]\n# Données : Ebbinghaus;5\nA_COMPLETER\n\n[Cas 2 — Chapitre appris au jour 10]\n# Données : Metacognition;10\nA_COMPLETER\n\n[Cas 3 — Chapitre appris au jour 0]\n# Données : Feynman;0\nA_COMPLETER\n",
    "hints": [
      "Parse avec l’extraction des champs. Convertissez le jour J0 en entier.",
      "R1 = j0 + 1, R2 = j0 + 3, R3 = j0 + 7, R4 = j0 + 14."
    ],
    "examples": [
      {
        "stdin": "Neurobiologie;1",
        "expected": "Planning [Neurobiologie] : J0=1 -> R1=J2 -> R2=J4 -> R3=J8 -> R4=J15",
        "note": "Les 4 rappels sont programmés aux jours 2, 4, 8 et 15."
      }
    ],
    "tests": [
      {
        "label": "Chapitre appris au jour 5",
        "stdin": "cas:1",
        "expected": "Planning [Ebbinghaus] : J0=5 -> R1=J6 -> R2=J8 -> R3=J12 -> R4=J19"
      },
      {
        "label": "Chapitre appris au jour 10",
        "stdin": "cas:2",
        "expected": "Planning [Metacognition] : J0=10 -> R1=J11 -> R2=J13 -> R3=J17 -> R4=J24"
      },
      {
        "label": "Chapitre appris au jour 0",
        "stdin": "cas:3",
        "expected": "Planning [Feynman] : J0=0 -> R1=J1 -> R2=J3 -> R3=J7 -> R4=J14"
      }
    ],
    "solution": "[Exemple]\nPlanning [Neurobiologie] : J0=1 -> R1=J2 -> R2=J4 -> R3=J8 -> R4=J15\n\n[Cas 1 — Chapitre appris au jour 5]\nPlanning [Ebbinghaus] : J0=5 -> R1=J6 -> R2=J8 -> R3=J12 -> R4=J19\n\n[Cas 2 — Chapitre appris au jour 10]\nPlanning [Metacognition] : J0=10 -> R1=J11 -> R2=J13 -> R3=J17 -> R4=J24\n\n[Cas 3 — Chapitre appris au jour 0]\nPlanning [Feynman] : J0=0 -> R1=J1 -> R2=J3 -> R3=J7 -> R4=J14\n"
  }
];
