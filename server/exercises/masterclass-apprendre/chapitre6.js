/**
 * chapitre6.js — Études de cas du cours « masterclass-apprendre ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "mc2-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Planificateur de cycles Pomodoro",
    goal: "Déterminer le découpage optimal d’une séance d’étude en blocs de concentration et pauses régénératrices.",
    brief: "<p>La technique Pomodoro (Francesco Cirillo) rythme le travail par cycles de <strong>25 minutes de focus</strong> suivis de <strong>5 minutes de pause courte</strong>. Après 4 cycles consécutifs, une <strong>pause longue de 20 minutes</strong> est obligatoire.</p><p>Analyse la durée totale disponible en minutes fourni(e) dans les données du cas (ex. <code>120</code>).<br>Calcule le nombre de cycles complets de 25 minutes possibles et le temps total de pause accordé.<br>Règle : chaque cycle réalisé donne droit à une pause de 5 minutes, sauf le 4e cycle qui donne droit à 20 minutes.<br>Affiche : <code>Cycles complets: &lt;N&gt; | Temps de travail: &lt;N*25&gt; min | Temps de pause: &lt;P&gt; min</code>.</p>",
    starter: "# Grille d'analyse (mc2-c6-e1) — Planificateur de cycles Pomodoro\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Séance courte d une demi-heure]\n# Données : 30\nA_COMPLETER\n\n[Cas 2 — Quatre cycles avec pause longue]\n# Données : 140\nA_COMPLETER\n\n[Cas 3 — Trois cycles]\n# Données : 90\nA_COMPLETER\n",
    hints: [
          "Utilisez une boucle tant que le temps restant permet au moins un bloc de 25 min.",
          "Si c est le 4e cycle, la pause vaut 20 min au lieu de 5 min."
    ],
    examples: [
          {
                "stdin": "60",
                "expected": "Cycles complets: 2 | Temps de travail: 50 min | Temps de pause: 10 min",
                "note": "En 60 min, on peut caler 2 cycles (25+5 + 25+5 = 60 min)."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nCycles complets: 2 | Temps de travail: 50 min | Temps de pause: 10 min\n\n[Cas 1 — Séance courte d une demi-heure]\nCycles complets: 1 | Temps de travail: 25 min | Temps de pause: 5 min\n\n[Cas 2 — Quatre cycles avec pause longue]\nCycles complets: 4 | Temps de travail: 100 min | Temps de pause: 35 min\n\n[Cas 3 — Trois cycles]\nCycles complets: 3 | Temps de travail: 75 min | Temps de pause: 15 min\n"
  },
  {
    id: "mc2-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Indice de calibration métacognitive (Score de Brier)",
    goal: "Quantifier la précision métacognitive d’un apprenant en mesurant l’écart quadratique moyen entre confiance et exactitude.",
    brief: "<p>En psychologie cognitive, le <strong>score de Brier</strong> évalue l’étalonnage d’un individu : $$BS = \\frac{1}{N} \\sum_{i=1}^N (c_i - o_i)^2$$ où $c_i \\in [0, 1]$ est la probabilité de réussite estimée par l’élève et $o_i \\in \\{0, 1\\}$ est le résultat réel (1 si juste, 0 si faux).</p><p>Un score proche de 0 indique une calibration parfaite ; un score supérieur à 0.25 indique une métacognition défaillante.</p><p>Lit une ligne contenant une suite de paires <code>confiance,resultat</code> séparées par des points-virgules (ex. <code>0.9,1;0.8,0;0.6,1</code>).<br>Calcule le score de Brier moyen arrondi à 3 décimales.<br>Affiche : <code>Score Brier: &lt;BS&gt; | Metacognition: &lt;Qualite&gt;</code><br>avec Qualite : <code>Excellente</code> si $BS \\le 0{,}100$, <code>Correcte</code> si $0{,}100 &lt; BS \\le 0{,}250$, et <code>Médiocre (A réétalonner)</code> si $BS &gt; 0{,}250$.</p>",
    starter: "# Grille d'analyse (mc2-c6-e2) — Indice de calibration métacognitive (Score de Brier)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Surconfiance massive avec échecs]\n# Données : 0.9,0;0.8,0;0.7,0\nA_COMPLETER\n\n[Cas 2 — Calibration modérée]\n# Données : 0.8,1;0.4,0;0.7,1;0.5,0\nA_COMPLETER\n\n[Cas 3 — Calibration parfaite 100%]\n# Données : 1.0,1;0.0,0\nA_COMPLETER\n",
    hints: [
          "Découpez avec l’extraction des champs puis chaque élément avec l’extraction des champs.",
          "Somme (c - o)**2 et divise par le nombre total de paires."
    ],
    examples: [
          {
                "stdin": "0.9,1;0.8,1;0.7,1",
                "expected": "Score Brier: 0.047 | Metacognition: Excellente",
                "note": "Écarts quadratiques très faibles : excellente lucidité métacognitive."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nScore Brier: 0.047 | Metacognition: Excellente\n\n[Cas 1 — Surconfiance massive avec échecs]\nScore Brier: 0.647 | Metacognition: Médiocre (A réétalonner)\n\n[Cas 2 — Calibration modérée]\nScore Brier: 0.135 | Metacognition: Correcte\n\n[Cas 3 — Calibration parfaite 100%]\nScore Brier: 0.000 | Metacognition: Excellente\n"
  },
  {
    id: "mc2-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Rétroplanning de révision espacée avant examen",
    goal: "Construire un échéancier de rappels espacés pour un ensemble de chapitres jusqu’au jour de l’épreuve.",
    brief: "<p>Pour mémoriser durablement sans bachotage de dernière minute, les révisions doivent suivre les jalons de rappel espacé standardisés : <strong>J+1</strong>, <strong>J+3</strong>, <strong>J+7</strong> et <strong>J+14</strong> après l’apprentissage initial (J0).</p><p>Lit une ligne au format <code>chapitre;jour_apprentissage_J0</code> (où jour_apprentissage est un entier, ex. <code>1</code>).<br>Affiche le calendrier des rappels programmés sous la forme :<br><code>Planning [&lt;chapitre&gt;] : J0=&lt;j0&gt; -&gt; R1=J&lt;j0+1&gt; -&gt; R2=J&lt;j0+3&gt; -&gt; R3=J&lt;j0+7&gt; -&gt; R4=J&lt;j0+14&gt;</code>.</p>",
    starter: "# Grille d'analyse (mc2-c6-e3) — Rétroplanning de révision espacée avant examen\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Chapitre appris au jour 5]\n# Données : Ebbinghaus;5\nA_COMPLETER\n\n[Cas 2 — Chapitre appris au jour 10]\n# Données : Metacognition;10\nA_COMPLETER\n\n[Cas 3 — Chapitre appris au jour 0]\n# Données : Feynman;0\nA_COMPLETER\n",
    hints: [
          "Parse avec l’extraction des champs. Convertissez le jour J0 en entier.",
          "R1 = j0 + 1, R2 = j0 + 3, R3 = j0 + 7, R4 = j0 + 14."
    ],
    examples: [
          {
                "stdin": "Neurobiologie;1",
                "expected": "Planning [Neurobiologie] : J0=1 -> R1=J2 -> R2=J4 -> R3=J8 -> R4=J15",
                "note": "Les 4 rappels sont programmés aux jours 2, 4, 8 et 15."
          }
    ],
    tests: [
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
    solution: "[Exemple]\nPlanning [Neurobiologie] : J0=1 -> R1=J2 -> R2=J4 -> R3=J8 -> R4=J15\n\n[Cas 1 — Chapitre appris au jour 5]\nPlanning [Ebbinghaus] : J0=5 -> R1=J6 -> R2=J8 -> R3=J12 -> R4=J19\n\n[Cas 2 — Chapitre appris au jour 10]\nPlanning [Metacognition] : J0=10 -> R1=J11 -> R2=J13 -> R3=J17 -> R4=J24\n\n[Cas 3 — Chapitre appris au jour 0]\nPlanning [Feynman] : J0=0 -> R1=J1 -> R2=J3 -> R3=J7 -> R4=J14\n"
  }
];
