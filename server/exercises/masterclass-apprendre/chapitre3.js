/**
 * chapitre3.js — Études de cas du cours « masterclass-apprendre ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "mc2-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Courbe de l’oubli d’Ebbinghaus",
    goal: "Calculer le pourcentage de rétention mnésique après un délai $t$ selon la formule exponentielle d’Hermann Ebbinghaus.",
    brief: "<p>La modélisation mathématique d’Ebbinghaus définit la probabilité de rétention $R$ après un temps $t$ (en jours) par :</p><div class=\"formule-box\">$$R = e^{-\\frac{t}{S}}$$</div><p>où $S$ représente la <strong>stabilité de la trace mnésique</strong> (en jours), qui augmente à chaque rappel réussi.</p><p>Lit une ligne au format <code>t;S</code> (entiers ou décimaux) sur l’entrée standard et affiche :<br><code>Retention: &lt;P&gt;%</code> (où $P = R \\times 100$, arrondi à 1 décimale).<br>- Si $P &lt; 50{,}0\\,\\%$, ajoute sur la ligne suivante : <code>Statut: Seuil critique (Reactivation urgente)</code>.<br>- Sinon : <code>Statut: Trace active</code>.</p>",
    starter: "# Grille d'analyse (mc2-c3-e1) — Courbe de l’oubli d’Ebbinghaus\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Oubli prononcé sous le seuil critique]\n# Données : 7;4\nA_COMPLETER\n\n[Cas 2 — Trace fraîche et stable]\n# Données : 1;10\nA_COMPLETER\n\n[Cas 3 — Échéance égale à la stabilité]\n# Données : 5;5\nA_COMPLETER\n",
    hints: [
          "Utilise math.exp(-t / s).",
          "Multiplie par 100 et arrondis avec round(p, 1)."
    ],
    examples: [
          {
                "stdin": "3;5",
                "expected": "Retention: 54.9%\nStatut: Trace active",
                "note": "Après 3 jours avec une stabilité de 5 jours, la rétention estimée est de 54.9%."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nRetention: 54.9%\nStatut: Trace active\n\n[Cas 1 — Oubli prononcé sous le seuil critique]\nRetention: 17.4%\nStatut: Seuil critique (Reactivation urgente)\n\n[Cas 2 — Trace fraîche et stable]\nRetention: 90.5%\nStatut: Trace active\n\n[Cas 3 — Échéance égale à la stabilité]\nRetention: 36.8%\nStatut: Seuil critique (Reactivation urgente)\n"
  },
  {
    id: "mc2-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Simulateur de boîtes de Leitner",
    goal: "Implémenter les règles de promotion et de rétrogradation de flashcards dans le système à 5 compartiments de Sebastian Leitner.",
    brief: "<p>Le système de Leitner organise les fiches en 5 boîtes de fréquences de révision croissantes (Boîte 1 = quotidien, Boîte 5 = mensuel) :</p><ul>  <li><strong>Succès (rappel réussi)</strong> : la carte monte dans la boîte immédiatement supérieure : $B_{nouv} = \\min(5, B_{actuel} + 1)$.</li>  <li><strong>Échec (rappel raté)</strong> : la carte retombe <strong>immédiatement en Boîte 1</strong>, quelle que soit sa boîte de départ.</li></ul><p>Lit une ligne au format <code>carte_id;boite_actuelle;resultat</code> (où résultat vaut <code>succes</code> ou <code>echec</code>).<br>Affiche : <code>Carte &lt;carte_id&gt; : Boite &lt;boite_actuelle&gt; -&gt; Boite &lt;nouvelle_boite&gt; (&lt;statut&gt;)</code><br>où statut vaut <code>Promotion</code> si la boîte a augmenté, <code>Maintien palier max</code> si elle était déjà à 5 et réussit, ou <code>Retrogradation</code> en cas d’échec.</p>",
    starter: "# Grille d'analyse (mc2-c3-e2) — Simulateur de boîtes de Leitner\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Échec cuisant depuis la boîte 4]\n# Données : CARD-105;4;echec\nA_COMPLETER\n\n[Cas 2 — Maintien au palier maximal]\n# Données : CARD-001;5;succes\nA_COMPLETER\n\n[Cas 3 — Promotion depuis la boîte 1]\n# Données : CARD-888;1;succes\nA_COMPLETER\n",
    hints: [
          "Parse avec split(\";\"). Convertis boite_actuelle en int.",
          "En cas d échec, la nouvelle boîte vaut 1."
    ],
    examples: [
          {
                "stdin": "CARD-042;3;succes",
                "expected": "Carte CARD-042 : Boite 3 -> Boite 4 (Promotion)",
                "note": "Succès en boîte 3 entraîne une promotion en boîte 4."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nCarte CARD-042 : Boite 3 -> Boite 4 (Promotion)\n\n[Cas 1 — Échec cuisant depuis la boîte 4]\nCarte CARD-105 : Boite 4 -> Boite 1 (Retrogradation)\n\n[Cas 2 — Maintien au palier maximal]\nCarte CARD-001 : Boite 5 -> Boite 5 (Maintien palier max)\n\n[Cas 3 — Promotion depuis la boîte 1]\nCarte CARD-888 : Boite 1 -> Boite 2 (Promotion)\n"
  },
  {
    id: "mc2-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Calculateur du facteur d’aisance SM-2",
    goal: "Calculer la mise à jour du facteur de facilité (Easiness Factor) selon l’algorithme de Piotr Wozniak (SuperMemo SM-2 / Anki).",
    brief: "<p>L’algorithme <strong>SM-2</strong> adapte l’espacement des révisions via le facteur de facilité $EF$ (initialement à 2.5). Après chaque test noté de 0 (oubli complet) à 5 (réponse parfaite sans hésitation), $EF$ est réévalué par :</p><div class=\"formule-box\">$$EF' = EF + \\left(0{,}1 - (5 - q) \\cdot (0{,}08 + (5 - q) \\cdot 0{,}02)\\right)$$</div><p>avec un plancher incompressible : $EF' \\ge 1{,}30$.</p><p>Lit une ligne au format <code>EF_actuel;q</code> sur l’entrée standard (ex. <code>2.5;4</code>).<br>Affiche : <code>Ancien EF: &lt;EF&gt; | Note: &lt;q&gt;/5 | Nouveau EF: &lt;EF_arrondi_2_decimales&gt;</code>.<br>- Si $EF' \\ge 2{,}50$ : ajoute à la ligne suivante <code>Difficulte: Facile</code>.<br>- Si $1{,}80 \\le EF' &lt; 2{,}50$ : <code>Difficulte: Moderee</code>.<br>- Si $EF' &lt; 1{,}80$ : <code>Difficulte: Difficile</code>.</p>",
    starter: "# Grille d'analyse (mc2-c3-e3) — Calculateur du facteur d’aisance SM-2\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Note maximale de 5]\n# Données : 2.5;5\nA_COMPLETER\n\n[Cas 2 — Note faible de 2 entraînant une baisse]\n# Données : 2.2;2\nA_COMPLETER\n\n[Cas 3 — Note de 0 atteignant le plancher de 1.30]\n# Données : 1.4;0\nA_COMPLETER\n",
    hints: [
          "Calcule le terme delta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02).",
          "Assure-toi que max(1.3, ef + delta) ne descende jamais sous 1.3."
    ],
    examples: [
          {
                "stdin": "2.5;4",
                "expected": "Ancien EF: 2.50 | Note: 4/5 | Nouveau EF: 2.50\nDifficulte: Facile",
                "note": "Une note de 4 maintient le facteur d aisance initial de 2.50."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nAncien EF: 2.50 | Note: 4/5 | Nouveau EF: 2.50\nDifficulte: Facile\n\n[Cas 1 — Note maximale de 5]\nAncien EF: 2.50 | Note: 5/5 | Nouveau EF: 2.60\nDifficulte: Facile\n\n[Cas 2 — Note faible de 2 entraînant une baisse]\nAncien EF: 2.20 | Note: 2/5 | Nouveau EF: 1.88\nDifficulte: Moderee\n\n[Cas 3 — Note de 0 atteignant le plancher de 1.30]\nAncien EF: 1.40 | Note: 0/5 | Nouveau EF: 1.30\nDifficulte: Difficile\n"
  }
];
