/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "mc2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Rappel actif vs Révision passive",
    "goal": "Distinguer les techniques passives illusoires des pratiques de rappel actif démontrées par la recherche.",
    "brief": "<p>La recherche cognitive (Roediger, Karpicke) prouve que la simple relecture procure un sentiment trompeur de maîtrise sans ancrer l’information. Seul le <strong>rappel actif</strong> (l’effort d’extraction mnésique) renforce la trace synaptique.</p><p>Lit une decasion de méthode en minuscules sur l’entrée standard et affiche son efficacité :<br>- <code>relecture_surlignee</code>, <code>feuilletage_notes</code>, <code>recopie_de_cours</code>, <code>ecoute_passive_cours</code> &rarr; <code>Methode: Passive (Faible retention)</code><br>- <code>flashcard_recto_verso</code>, <code>feuille_blanche_feynman</code>, <code>qcm_sans_aide</code>, <code>restitution_a_voix_haute</code> &rarr; <code>Methode: Active (Forte retention)</code><br>Pour toute autre valeur : <code>Methode: Inconnue</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c2-e1) — Rappel actif vs Révision passive\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Relecture surlignée]\n# Données : relecture_surlignee\nA_COMPLETER\n\n[Cas 2 — Technique Feynman feuille blanche]\n# Données : feuille_blanche_feynman\nA_COMPLETER\n\n[Cas 3 — Pratique inconnue]\n# Données : dormir_sur_son_livre\nA_COMPLETER\n",
    "hints": [
      "Crée deux ensembles (sets) pour les méthodes passives et actives.",
      "Utilise les structures if/elif/else pour router la réponse."
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
      "Convertis les deux notes en float ou int avec split(\";\").",
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
    "brief": "<p>La <strong>technique de Richard Feynman</strong> stipule que l’on ne maîtrise un sujet que si l’on peut l’expliquer en termes simples à un novice de 12 ans. Un texte contenant plus de 20 % de mots complexes (définis comme des mots de <strong>strictement plus de 8 lettres</strong>) traduit souvent un jargon compensatoire.</p><p>Lit une phrase ou paragraphe sur l’entrée standard.<br>Nettoie la ponctuation (<code>, . ! ? ; : ' \" ( )</code>), découpe en mots et calcule le ratio de mots complexes.<br>- Affiche le ratio sous forme : <code>Mots complexes: &lt;pourcentage&gt;% (&lt;nb_complexes&gt;/&lt;total&gt;)</code> (arrondi à 1 décimale).<br>- Si le ratio $&gt; 20{,}0\\,\\%$, affiche à la ligne : <code>Verdict: A vulgariser (Jargon excessif)</code>.<br>- Sinon, affiche à la ligne : <code>Verdict: Feynman valide (Explication claire)</code>.</p>",
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
  }
];
