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
      "Associe chaque mot-clé à sa catégorie dans un la grille de critères.",
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
    "title": "Théorie de la charge cognitive de Sweller",
    "goal": "Calculer la charge cognitive totale et vérifier la disponibilité pour les apprentissages structurants.",
    "brief": "<p>Selon John Sweller, la charge cognitive en mémoire de travail se compose de trois charges :</p><ul>  <li><strong>Intrinsèque (I)</strong> : complexité propre du concept (notée sur 10).</li>  <li><strong>Extrinsèque (E)</strong> : bruit parasite, mauvaise présentation, distractions (notée sur 10).</li>  <li><strong>Germane (G)</strong> : effort utile dédié à la construction de schémas mentaux durables (notée sur 10).</li></ul><p>La charge totale d’encombrement est $C = I + E$. La capacité maximale de la mémoire de travail est fixée à <strong>7</strong> points.</p><p>Analyse une ligne au format <code>I;E;G</code> fourni(e) dans les données du cas et affiche :<br>- Si $I + E &gt; 7$ : <code>SURCHARGE (Charge: &lt;C&gt;, Germane_possible: 0)</code><br>- Si $I + E \\le 7$ : calcul de la capacité restante disponible pour l’effort germane $G_{dispo} = \\min(G, 7 - C)$. Affichez <code>OPTIMAL (Charge: &lt;C&gt;, Germane_utile: &lt;G_dispo&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c1-e2) — Théorie de la charge cognitive de Sweller\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Surcharge cognitive critique]\n# Données : 5;4;2\nA_COMPLETER\n\n[Cas 2 — Charge saturée exacte]\n# Données : 4;3;5\nA_COMPLETER\n\n[Cas 3 — Charge légère avec plein potentiel germane]\n# Données : 2;1;3\nA_COMPLETER\n",
    "hints": [
      "Découpez avec l’extraction des champs et convertis les trois valeurs en entiers.",
      "Comparez la somme I + E au seuil critique de 7."
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
    "brief": "<p>George A. Miller a démontré que la mémoire de travail ne peut retenir que $7 \\pm 2$ éléments isolés. Le <strong>chunking</strong> (morcellement) regroupe les symboles en paquets significatifs pour démultiplier la capacité de rétention.</p><p>Analyse une séquence de chiffres séparés par des espaces fourni(e) dans les données du cas (ex. <code>0 6 1 2 3 4 5 6 7 8</code>).<br>- Si le nombre d’éléments est $\\le 7$, affiche : <code>Empan respecte (&lt;N&gt; elements): &lt;elements sans espace&gt;</code>.<br>- Si le nombre d’éléments est $&gt; 7$, regroupe les éléments par blocs successifs de <strong>3 chiffres</strong> (le dernier bloc contenant le reste de 1, 2 ou 3 chiffres), reliés par des tirets <code>-</code>. Affiche : <code>Chunking requis (&lt;N&gt; elements -&gt; &lt;nb_chunks&gt; chunks): &lt;blocs&gt;</code>.</p>",
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
  },
  {
    "id": "mc2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Rappel actif vs Révision passive",
    "goal": "Distinguer les techniques passives illusoires des pratiques de rappel actif démontrées par la recherche.",
    "brief": "<p>La recherche cognitive (Roediger, Karpicke) prouve que la simple relecture procure un sentiment trompeur de maîtrise sans ancrer l’information. Seul le <strong>rappel actif</strong> (l’effort d’extraction mnésique) renforce la trace synaptique.</p><p>Examine un intitulé de méthode en minuscules dans les données du cas et affiche son efficacité :<br>- <code>relecture_surlignee</code>, <code>feuilletage_notes</code>, <code>recopie_de_cours</code>, <code>ecoute_passive_cours</code> &rarr; <code>Methode: Passive (Faible retention)</code><br>- <code>flashcard_recto_verso</code>, <code>feuille_blanche_feynman</code>, <code>qcm_sans_aide</code>, <code>restitution_a_voix_haute</code> &rarr; <code>Methode: Active (Forte retention)</code><br>Pour toute autre valeur : <code>Methode: Inconnue</code>.</p>",
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
    "brief": "<p>La <strong>technique de Richard Feynman</strong> stipule que l’on ne maîtrise un sujet que si l’on peut l’expliquer en termes simples à un novice de 12 ans. Un texte contenant plus de 20 % de mots complexes (définis comme des mots de <strong>strictement plus de 8 lettres</strong>) traduit souvent un jargon compensatoire.</p><p>Analyse une phrase ou paragraphe fourni(e) dans les données du cas.<br>Nettoie la ponctuation (<code>, . ! ? ; : ' \" ( )</code>), découpe en mots et calcule le ratio de mots complexes.<br>- Affiche le ratio sous forme : <code>Mots complexes: &lt;pourcentage&gt;% (&lt;nb_complexes&gt;/&lt;total&gt;)</code> (arrondi à 1 décimale).<br>- Si le ratio $&gt; 20{,}0\\,\\%$, affiche à la ligne : <code>Verdict: A vulgariser (Jargon excessif)</code>.<br>- Sinon, affichezz à la ligne : <code>Verdict: Feynman valide (Explication claire)</code>.</p>",
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
    "title": "Zone d’apprentissage optimal (Règle des 85 %)",
    "goal": "Calibrer la difficulté d’un entraînement selon la règle optimale d’apprentissage de Robert Wilson.",
    "brief": "<p>Une étude scientifique de Robert Wilson (Nature Communications, 2019) a démontré que le taux d’apprentissage est maximal lorsque l’apprenant réussit environ <strong>85 %</strong> des exercices (soit 15 % d’erreurs stimulantes).</p><p>Lit une ligne avec <code>exercices_reussis;exercices_totaux</code> (entiers positifs).<br>Calculez le taux de réussite $T = reussis / totaux$. Affichez le taux en pourcentage : <code>Taux: &lt;T_pct&gt;%</code> (1 décimale).<br>- Si $T &gt; 90{,}0\\,\\%$ : <code>Niveau: Trop facile (Risque de stagnation, augmenter la difficulte)</code>.<br>- Si $80{,}0\\,\\% \\le T \\le 90{,}0\\,\\%$ : <code>Niveau: Zone optimale des 85% (Progression maximale)</code>.<br>- Si $T &lt; 80{,}0\\,\\%$ : <code>Niveau: Trop difficile (Risque de decouragement, decomposer les etapes)</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c5-e3) — Zone d’apprentissage optimal (Règle des 85 %)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Exercices trop faciles avec 95 % de réussite]\n# Données : 19;20\nA_COMPLETER\n\n[Cas 2 — Exercices trop difficiles avec 60 % de réussite]\n# Données : 12;20\nA_COMPLETER\n\n[Cas 3 — Borne basse de la zone optimale]\n# Données : 8;10\nA_COMPLETER\n",
    "hints": [
      "Calculez round((reussis / totaux) * 100.0, 1).",
      "Comparez aux bornes 80.0 et 90.0."
    ],
    "examples": [
      {
        "stdin": "17;20",
        "expected": "Taux: 85.0%\nNiveau: Zone optimale des 85% (Progression maximale)",
        "note": "17/20 = 85.0% : le niveau de difficulté est parfait pour progresser."
      }
    ],
    "tests": [
      {
        "label": "Exercices trop faciles avec 95 % de réussite",
        "stdin": "cas:1",
        "expected": "Taux: 95.0%\nNiveau: Trop facile (Risque de stagnation, augmenter la difficulte)"
      },
      {
        "label": "Exercices trop difficiles avec 60 % de réussite",
        "stdin": "cas:2",
        "expected": "Taux: 60.0%\nNiveau: Trop difficile (Risque de decouragement, decomposer les etapes)"
      },
      {
        "label": "Borne basse de la zone optimale",
        "stdin": "cas:3",
        "expected": "Taux: 80.0%\nNiveau: Zone optimale des 85% (Progression maximale)"
      }
    ],
    "solution": "[Exemple]\nTaux: 85.0%\nNiveau: Zone optimale des 85% (Progression maximale)\n\n[Cas 1 — Exercices trop faciles avec 95 % de réussite]\nTaux: 95.0%\nNiveau: Trop facile (Risque de stagnation, augmenter la difficulte)\n\n[Cas 2 — Exercices trop difficiles avec 60 % de réussite]\nTaux: 60.0%\nNiveau: Trop difficile (Risque de decouragement, decomposer les etapes)\n\n[Cas 3 — Borne basse de la zone optimale]\nTaux: 80.0%\nNiveau: Zone optimale des 85% (Progression maximale)\n"
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
